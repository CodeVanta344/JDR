-- =====================================================
-- MIGRATION: Améliorer la synchronisation du combat
-- =====================================================
-- Ajoute un système de verrouillage pour éviter les conflits

-- Create combat_locks table for turn-based locking
CREATE TABLE IF NOT EXISTS public.combat_locks (
    session_id UUID PRIMARY KEY REFERENCES public.sessions(id) ON DELETE CASCADE,
    locked_by TEXT NOT NULL,
    locked_at TIMESTAMPTZ DEFAULT NOW(),
    turn_index INTEGER NOT NULL,
    round INTEGER NOT NULL
);

-- Enable RLS
ALTER TABLE public.combat_locks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Allow authenticated users to read combat_locks" ON public.combat_locks;
DROP POLICY IF EXISTS "Allow authenticated users to manage combat_locks" ON public.combat_locks;

CREATE POLICY "Allow authenticated users to read combat_locks"
    ON public.combat_locks
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to manage combat_locks"
    ON public.combat_locks
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS public.combat_locks;

-- Add version field to world_state for optimistic locking
ALTER TABLE public.world_state ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 0;

-- Create function to auto-increment version
CREATE OR REPLACE FUNCTION public.increment_world_state_version()
RETURNS TRIGGER AS $$
BEGIN
    NEW.version = COALESCE(OLD.version, 0) + 1;
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for version increment
DROP TRIGGER IF EXISTS increment_world_state_version_trigger ON public.world_state;
CREATE TRIGGER increment_world_state_version_trigger
    BEFORE UPDATE ON public.world_state
    FOR EACH ROW
    EXECUTE FUNCTION public.increment_world_state_version();
