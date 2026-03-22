-- Fix overly permissive RLS policies
-- Scope data access to session membership

-- === MESSAGES ===
DROP POLICY IF EXISTS "Messages are viewable by everyone in the session." ON messages;
DROP POLICY IF EXISTS "Participants can insert messages." ON messages;
DROP POLICY IF EXISTS "messages_select_authenticated" ON messages;
DROP POLICY IF EXISTS "messages_insert_authenticated" ON messages;
DROP POLICY IF EXISTS "messages_delete_authenticated" ON messages;

CREATE POLICY "messages_select_session_members" ON messages
    FOR SELECT TO authenticated
    USING (
        session_id IN (SELECT session_id FROM players WHERE user_id = auth.uid())
        OR session_id IN (SELECT id FROM sessions WHERE host_id = auth.uid())
    );

CREATE POLICY "messages_insert_session_members" ON messages
    FOR INSERT TO authenticated
    WITH CHECK (
        session_id IN (SELECT session_id FROM players WHERE user_id = auth.uid())
        OR session_id IN (SELECT id FROM sessions WHERE host_id = auth.uid())
    );

CREATE POLICY "messages_delete_own_or_host" ON messages
    FOR DELETE TO authenticated
    USING (
        player_id = auth.uid()
        OR session_id IN (SELECT id FROM sessions WHERE host_id = auth.uid())
    );

-- === PLAYERS ===
DROP POLICY IF EXISTS "Authenticated users can join sessions." ON players;
DROP POLICY IF EXISTS "players_insert_own" ON players;

CREATE POLICY "players_insert_own" ON players
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- === MESSAGES UPDATE (for host only) ===
CREATE POLICY "messages_update_host" ON messages
    FOR UPDATE TO authenticated
    USING (
        session_id IN (SELECT id FROM sessions WHERE host_id = auth.uid())
    );
