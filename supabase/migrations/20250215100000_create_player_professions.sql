-- Migration pour créer la table player_professions
-- Cette table stocke les métiers appris par chaque joueur

CREATE TABLE IF NOT EXISTS player_professions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    profession_id TEXT NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    xp INTEGER NOT NULL DEFAULT 0,
    learned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Empêcher les doublons (un joueur ne peut avoir qu'une fois le même métier)
    UNIQUE(player_id, profession_id)
);

-- Index pour accélérer les recherches
CREATE INDEX IF NOT EXISTS idx_player_professions_player_id ON player_professions(player_id);
CREATE INDEX IF NOT EXISTS idx_player_professions_profession_id ON player_professions(profession_id);

-- Commentaires
COMMENT ON TABLE player_professions IS 'Stores the professions learned by each player character';
COMMENT ON COLUMN player_professions.profession_id IS 'ID of the profession from the game lore (e.g., mining, herbalism, blacksmithing)';
COMMENT ON COLUMN player_professions.level IS 'Current level in this profession';
COMMENT ON COLUMN player_professions.xp IS 'Current XP in this profession';
