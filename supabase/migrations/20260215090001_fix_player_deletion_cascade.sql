-- 1. Fix Messages table references
-- First check if player_id exists and adds the reference with CASCADE
DO $$ 
BEGIN 
    -- Add player_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'messages' AND column_name = 'player_id') THEN
        ALTER TABLE public.messages ADD COLUMN player_id UUID REFERENCES public.players(id) ON DELETE CASCADE;
    ELSE
        -- If it exists, ensure it has ON DELETE CASCADE
        -- We drop and recreate the constraint to be sure
        DECLARE
            cons_name TEXT;
        BEGIN
            SELECT tc.constraint_name INTO cons_name
            FROM information_schema.table_constraints AS tc 
            JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
            WHERE tc.table_name = 'messages' 
              AND kcu.column_name = 'player_id'
              AND tc.constraint_type = 'FOREIGN KEY';
            
            IF cons_name IS NOT NULL THEN
                EXECUTE 'ALTER TABLE public.messages DROP CONSTRAINT ' || cons_name;
            END IF;
            
            ALTER TABLE public.messages ADD CONSTRAINT messages_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id) ON DELETE CASCADE;
        END;
    END IF;
END $$;

-- 2. Fix player_titles and npc_affinities (Ensuring they exist and have cascade)
CREATE TABLE IF NOT EXISTS public.player_titles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.npc_affinities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
    npc_name TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, npc_name)
);

-- 3. Add RLS DELETE policies
-- Players
DROP POLICY IF EXISTS "Users can delete their own players." ON public.players;
CREATE POLICY "Users can delete their own players." ON public.players
    FOR DELETE USING (auth.uid() = user_id);

-- Messages
DROP POLICY IF EXISTS "Users can delete messages in their sessions." ON public.messages;
CREATE POLICY "Users can delete messages in their sessions." ON public.messages
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.players 
            WHERE players.session_id = messages.session_id 
              AND players.user_id = auth.uid()
        )
    );

-- Player Titles
ALTER TABLE public.player_titles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own titles." ON public.player_titles;
CREATE POLICY "Users can manage their own titles." ON public.player_titles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.players 
            WHERE players.id = player_titles.player_id 
              AND players.user_id = auth.uid()
        )
    );

-- NPC Affinities
ALTER TABLE public.npc_affinities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own affinities." ON public.npc_affinities;
CREATE POLICY "Users can manage their own affinities." ON public.npc_affinities
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.players 
            WHERE players.id = npc_affinities.player_id 
              AND players.user_id = auth.uid()
        )
    );
