-- Add codex tracking columns on session table (supports both game_sessions and sessions)
DO $$
DECLARE
    target_table TEXT;
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'game_sessions'
    ) THEN
        target_table := 'game_sessions';
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'sessions'
    ) THEN
        target_table := 'sessions';
    ELSE
        RAISE NOTICE 'Skipping codex migration: no sessions table found';
        RETURN;
    END IF;

    EXECUTE format(
        'ALTER TABLE public.%I
         ADD COLUMN IF NOT EXISTS codex_discovered_locations JSONB DEFAULT ''[]''::jsonb,
         ADD COLUMN IF NOT EXISTS codex_visited_npcs JSONB DEFAULT ''[]''::jsonb,
         ADD COLUMN IF NOT EXISTS codex_completed_quests JSONB DEFAULT ''[]''::jsonb,
         ADD COLUMN IF NOT EXISTS codex_important_events JSONB DEFAULT ''[]''::jsonb,
         ADD COLUMN IF NOT EXISTS current_location TEXT DEFAULT ''Point de départ''',
        target_table
    );

    EXECUTE format('CREATE INDEX IF NOT EXISTS idx_sessions_discovered_locations ON public.%I USING GIN (codex_discovered_locations)', target_table);
    EXECUTE format('CREATE INDEX IF NOT EXISTS idx_sessions_visited_npcs ON public.%I USING GIN (codex_visited_npcs)', target_table);
    EXECUTE format('CREATE INDEX IF NOT EXISTS idx_sessions_completed_quests ON public.%I USING GIN (codex_completed_quests)', target_table);
    EXECUTE format('CREATE INDEX IF NOT EXISTS idx_sessions_current_location ON public.%I (current_location)', target_table);

    EXECUTE format(
        'UPDATE public.%I
         SET codex_discovered_locations = ''["Point de départ"]''::jsonb
         WHERE codex_discovered_locations IS NULL OR codex_discovered_locations = ''[]''::jsonb',
        target_table
    );

    EXECUTE format(
        'UPDATE public.%I
         SET current_location = ''Point de départ''
         WHERE current_location IS NULL',
        target_table
    );
END $$;
