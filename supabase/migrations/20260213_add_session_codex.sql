-- Add codex tracking columns to game_sessions table
ALTER TABLE game_sessions 
ADD COLUMN IF NOT EXISTS codex_discovered_locations JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS codex_visited_npcs JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS codex_completed_quests JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS codex_important_events JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS current_location TEXT DEFAULT 'Point de départ';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_sessions_discovered_locations ON game_sessions USING GIN (codex_discovered_locations);
CREATE INDEX IF NOT EXISTS idx_sessions_visited_npcs ON game_sessions USING GIN (codex_visited_npcs);
CREATE INDEX IF NOT EXISTS idx_sessions_completed_quests ON game_sessions USING GIN (codex_completed_quests);
CREATE INDEX IF NOT EXISTS idx_sessions_current_location ON game_sessions (current_location);

-- Set default starting location based on existing sessions
UPDATE game_sessions 
SET codex_discovered_locations = '["Point de départ"]'::jsonb
WHERE codex_discovered_locations IS NULL OR codex_discovered_locations = '[]'::jsonb;

-- Set default current location for existing sessions
UPDATE game_sessions 
SET current_location = 'Point de départ'
WHERE current_location IS NULL;
