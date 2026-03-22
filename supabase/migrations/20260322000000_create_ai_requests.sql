-- AI Request Broker: allows game clients to request AI responses
-- The GM's local server picks up pending requests and responds via Claude Code CLI

CREATE TABLE IF NOT EXISTS ai_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE SET NULL,

  -- Request
  request_type TEXT NOT NULL DEFAULT 'game-master', -- 'game-master', 'npc-gen', 'combat-gen', 'plot-twist', 'chat'
  request_payload JSONB NOT NULL DEFAULT '{}',

  -- Response (filled by GM's local server)
  response_payload JSONB,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'error'
  error_message TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ,

  -- Rate limiting
  player_ip TEXT
);

-- Index for the GM server to poll pending requests efficiently
CREATE INDEX idx_ai_requests_pending ON ai_requests(status, created_at) WHERE status = 'pending';
CREATE INDEX idx_ai_requests_session ON ai_requests(session_id, created_at);

-- Enable realtime so clients get instant responses
ALTER PUBLICATION supabase_realtime ADD TABLE ai_requests;

-- RLS: players can insert requests and read their own responses
ALTER TABLE ai_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Players can create AI requests" ON ai_requests
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Players can read their own requests" ON ai_requests
  FOR SELECT USING (
    player_id IN (SELECT id FROM players WHERE user_id = auth.uid())
    OR session_id IN (SELECT id FROM game_sessions WHERE host_id = auth.uid() OR gm_id = auth.uid())
  );

-- GM (host) can update responses
CREATE POLICY "GM can update AI responses" ON ai_requests
  FOR UPDATE USING (
    session_id IN (SELECT id FROM game_sessions WHERE host_id = auth.uid() OR gm_id = auth.uid())
  );

-- Auto-cleanup: delete requests older than 24h
CREATE OR REPLACE FUNCTION cleanup_old_ai_requests() RETURNS void AS $$
BEGIN
  DELETE FROM ai_requests WHERE created_at < now() - interval '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Rate limit: max 10 requests per minute per player
CREATE OR REPLACE FUNCTION check_ai_rate_limit() RETURNS TRIGGER AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO recent_count
  FROM ai_requests
  WHERE player_id = NEW.player_id
    AND created_at > now() - interval '1 minute';

  IF recent_count >= 10 THEN
    RAISE EXCEPTION 'Rate limit exceeded: max 10 AI requests per minute';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ai_request_rate_limit
  BEFORE INSERT ON ai_requests
  FOR EACH ROW
  EXECUTE FUNCTION check_ai_rate_limit();
