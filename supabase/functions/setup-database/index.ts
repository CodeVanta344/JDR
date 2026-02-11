import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🚀 Starting database setup...');

    // SQL to create world_state table
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

    // Execute SQL using RPC
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      console.error('❌ Error executing SQL:', error);
      
      // Try alternative: Check if table exists
      const { data: tableCheck, error: checkError } = await supabase
        .from('world_state')
        .select('key')
        .limit(1);

      if (checkError && checkError.code === '42P01') {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Cannot create table via Edge Function. Manual setup required.',
            message: 'Please follow the setup guide in setup-database.html',
            instructions: [
              '1. Open: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql/new',
              '2. Copy content from MANUAL_MIGRATION_WORLD_STATE.sql',
              '3. Paste and execute in SQL Editor',
              '4. Enable Realtime at: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/database/replication'
            ]
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        );
      }

      if (!checkError) {
        // Table exists!
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Table world_state already exists!',
            reminder: 'Make sure Realtime is enabled at: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/database/replication'
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        );
      }

      throw error;
    }

    console.log('✅ Database setup completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Table world_state created successfully!',
        data: data,
        reminder: 'Make sure to enable Realtime at: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/database/replication'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('❌ Fatal error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: 'Manual setup required. Please follow the guide in setup-database.html'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
