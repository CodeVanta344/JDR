-- Add codex columns to players table
ALTER TABLE players 
ADD COLUMN IF NOT EXISTS visited_npcs JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS discovered_locations JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS active_quests JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS discovered_secrets JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS important_events JSONB DEFAULT '[]'::jsonb;

-- Add backstory columns if not exists
ALTER TABLE players
ADD COLUMN IF NOT EXISTS backstory_gm_context TEXT,
ADD COLUMN IF NOT EXISTS starting_reputation JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS known_npcs JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS faction_ties JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS personal_secrets JSONB DEFAULT '[]'::jsonb;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_players_visited_npcs ON players USING GIN (visited_npcs);
CREATE INDEX IF NOT EXISTS idx_players_discovered_locations ON players USING GIN (discovered_locations);
CREATE INDEX IF NOT EXISTS idx_players_active_quests ON players USING GIN (active_quests);
