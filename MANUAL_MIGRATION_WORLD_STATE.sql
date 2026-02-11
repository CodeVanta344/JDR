-- =====================================================
-- MANUAL MIGRATION: Create world_state table
-- =====================================================
-- Instructions: Copy this entire content and paste it into the Supabase SQL Editor
-- Dashboard URL: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql

-- Create world_state table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.world_state (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on key for faster lookups
CREATE INDEX IF NOT EXISTS world_state_key_idx ON public.world_state(key);

-- Enable RLS
ALTER TABLE public.world_state ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to read world_state" ON public.world_state;
DROP POLICY IF EXISTS "Allow authenticated users to insert world_state" ON public.world_state;
DROP POLICY IF EXISTS "Allow authenticated users to update world_state" ON public.world_state;
DROP POLICY IF EXISTS "Allow authenticated users to delete world_state" ON public.world_state;

-- RLS Policies: Allow all authenticated users to manage world_state
CREATE POLICY "Allow authenticated users to read world_state"
    ON public.world_state
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to insert world_state"
    ON public.world_state
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update world_state"
    ON public.world_state
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete world_state"
    ON public.world_state
    FOR DELETE
    TO authenticated
    USING (true);

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_world_state_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_world_state_updated_at_trigger ON public.world_state;
CREATE TRIGGER update_world_state_updated_at_trigger
    BEFORE UPDATE ON public.world_state
    FOR EACH ROW
    EXECUTE FUNCTION public.update_world_state_updated_at();

-- Enable Realtime for world_state table
ALTER PUBLICATION supabase_realtime ADD TABLE public.world_state;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these queries after the migration to verify everything is correct:

-- 1. Check if table exists
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'world_state';

-- 2. Check columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'world_state';

-- 3. Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'world_state';

-- 4. Check if Realtime is enabled
SELECT schemaname, tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime' AND tablename = 'world_state';

-- =====================================================
-- TEST DATA (Optional - for testing)
-- =====================================================
-- Uncomment to insert test data:

-- INSERT INTO public.world_state (key, value) 
-- VALUES ('test_merchant_session123', '{"npcName": "Test Merchant", "inventory": [], "active": true}'::jsonb)
-- ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- SELECT * FROM public.world_state WHERE key LIKE 'test_%';
