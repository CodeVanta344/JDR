-- ============================================================
-- Aethelgard RLS Migration
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE world_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_titles ENABLE ROW LEVEL SECURITY;
ALTER TABLE npc_affinities ENABLE ROW LEVEL SECURITY;
ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- SESSIONS: host controls create/update/delete, anyone auth can read
-- ============================================================
CREATE POLICY "sessions_select_authenticated"
    ON sessions FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "sessions_insert_host"
    ON sessions FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = host_id::uuid);

CREATE POLICY "sessions_update_host"
    ON sessions FOR UPDATE
    TO authenticated
    USING (auth.uid() = host_id::uuid);

CREATE POLICY "sessions_delete_host"
    ON sessions FOR DELETE
    TO authenticated
    USING (auth.uid() = host_id::uuid);

-- ============================================================
-- PLAYERS: own records, anyone auth can read (needed for party HUD)
-- ============================================================
CREATE POLICY "players_select_authenticated"
    ON players FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "players_insert_own"
    ON players FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id::uuid);

CREATE POLICY "players_update_own"
    ON players FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id::uuid);

CREATE POLICY "players_delete_own"
    ON players FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id::uuid);

-- ============================================================
-- MESSAGES: anyone auth can read and write (game chat)
-- ============================================================
CREATE POLICY "messages_select_authenticated"
    ON messages FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "messages_insert_authenticated"
    ON messages FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "messages_delete_authenticated"
    ON messages FOR DELETE
    TO authenticated
    USING (true);

-- ============================================================
-- WORLD_STATE: shared game state, anyone auth can CRUD
-- ============================================================
CREATE POLICY "world_state_all_authenticated"
    ON world_state FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================================
-- PLAYER_TITLES: read all, write own
-- ============================================================
CREATE POLICY "player_titles_select_authenticated"
    ON player_titles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "player_titles_insert_own"
    ON player_titles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = player_id::uuid);

CREATE POLICY "player_titles_update_own"
    ON player_titles FOR UPDATE
    TO authenticated
    USING (auth.uid() = player_id::uuid);

-- ============================================================
-- NPC_AFFINITIES: read all, write own
-- ============================================================
CREATE POLICY "npc_affinities_select_authenticated"
    ON npc_affinities FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "npc_affinities_insert_own"
    ON npc_affinities FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = player_id::uuid);

CREATE POLICY "npc_affinities_update_own"
    ON npc_affinities FOR UPDATE
    TO authenticated
    USING (auth.uid() = player_id::uuid);

-- ============================================================
-- BUG_REPORTS: anyone auth can insert, no reads
-- ============================================================
CREATE POLICY "bug_reports_insert_authenticated"
    ON bug_reports FOR INSERT
    TO authenticated
    WITH CHECK (true);
