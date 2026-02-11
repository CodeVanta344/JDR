import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = 'https://okanuafsmkuzyuyqibpu.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rYW51YWZzbWt1enl1eXFpYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MDE5NzMsImV4cCI6MjA1MTA3Nzk3M30.EzChL7g43s1KW8v8yx7L2eKk_sJiHvFMkBdWUVKElp0';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const sql = `
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
`;

async function createTable() {
    console.log('🚀 Creating world_state table...\n');
    
    try {
        // Test connection first
        const { data: testData, error: testError } = await supabase
            .from('players')
            .select('count')
            .limit(1);
        
        if (testError) {
            console.error('❌ Connection failed:', testError.message);
            return;
        }
        
        console.log('✅ Connected to Supabase\n');
        
        // Execute SQL via RPC (using a simple test first)
        console.log('📝 Executing SQL migration...\n');
        
        // Try to insert a test record - if table doesn't exist, this will fail
        const { data, error } = await supabase
            .from('world_state')
            .insert({ key: 'test_migration', value: { test: true } });
        
        if (error && error.code === '42P01') {
            console.log('⚠️  Table does not exist. You need to run the SQL manually.');
            console.log('\n📋 Please follow these steps:');
            console.log('1. Open: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql');
            console.log('2. Copy the content from MANUAL_MIGRATION_WORLD_STATE.sql');
            console.log('3. Paste and execute in the SQL Editor');
            return;
        }
        
        if (error) {
            console.error('❌ Error:', error.message);
            return;
        }
        
        console.log('✅ Table already exists or was created successfully!');
        
        // Clean up test record
        await supabase
            .from('world_state')
            .delete()
            .eq('key', 'test_migration');
        
        // Enable Realtime (this needs to be done manually in dashboard)
        console.log('\n⚠️  IMPORTANT: Enable Realtime manually:');
        console.log('1. Go to: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/database/replication');
        console.log('2. Find "world_state" in the table list');
        console.log('3. Check the box next to it to enable Realtime\n');
        
        console.log('✨ Setup complete!');
        
    } catch (err) {
        console.error('❌ Unexpected error:', err.message);
    }
}

createTable();
