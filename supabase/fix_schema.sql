-- SQL for Supabase SQL Editor to fix 'players' table schema

-- Add missing columns to the players table if they don't exist
ALTER TABLE players 
ADD COLUMN IF NOT EXISTS is_host BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_ready BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS gold INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS portrait_url TEXT,
ADD COLUMN IF NOT EXISTS resource INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS max_resource INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS backstory JSONB,
ADD COLUMN IF NOT EXISTS backstory_gm_context TEXT,
ADD COLUMN IF NOT EXISTS starting_reputation JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS known_npcs JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS faction_ties JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS personal_secrets JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS abilities JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS spells JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS mechanical_traits JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS skill_bonuses JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS visited_npcs JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS discovered_secrets JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS discovered_locations JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS active_quests JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS important_events JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS languages JSONB DEFAULT '["Commun"]',
ADD COLUMN IF NOT EXISTS life_path JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS mechanic TEXT,
ADD COLUMN IF NOT EXISTS description TEXT;

-- Ensure a unique constraint exists for session_id and user_id to support upsert
-- Check if it exists first to avoid error
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'players_session_id_user_id_key'
    ) THEN 
        ALTER TABLE players ADD CONSTRAINT players_session_id_user_id_key UNIQUE (session_id, user_id);
    END IF;
END $$;
