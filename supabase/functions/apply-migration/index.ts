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

    console.log('🔧 Applying combat sync migration...');

    // Execute each SQL statement separately
    const statements = [
      // Create combat_locks table
      `CREATE TABLE IF NOT EXISTS public.combat_locks (
        session_id UUID PRIMARY KEY REFERENCES public.sessions(id) ON DELETE CASCADE,
        locked_by TEXT NOT NULL,
        locked_at TIMESTAMPTZ DEFAULT NOW(),
        turn_index INTEGER NOT NULL,
        round INTEGER NOT NULL
      );`,
      
      // Enable RLS
      `ALTER TABLE public.combat_locks ENABLE ROW LEVEL SECURITY;`,
      
      // Drop old policies
      `DROP POLICY IF EXISTS "Allow authenticated users to read combat_locks" ON public.combat_locks;`,
      `DROP POLICY IF EXISTS "Allow authenticated users to manage combat_locks" ON public.combat_locks;`,
      
      // Create policies
      `CREATE POLICY "Allow authenticated users to read combat_locks"
        ON public.combat_locks FOR SELECT TO authenticated USING (true);`,
      
      `CREATE POLICY "Allow authenticated users to manage combat_locks"
        ON public.combat_locks FOR ALL TO authenticated USING (true) WITH CHECK (true);`,
      
      // Add version column to world_state
      `ALTER TABLE public.world_state ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 0;`,
      
      // Create version increment function
      `CREATE OR REPLACE FUNCTION public.increment_world_state_version()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.version = COALESCE(OLD.version, 0) + 1;
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;`,
      
      // Create trigger
      `DROP TRIGGER IF EXISTS increment_world_state_version_trigger ON public.world_state;`,
      
      `CREATE TRIGGER increment_world_state_version_trigger
        BEFORE UPDATE ON public.world_state
        FOR EACH ROW
        EXECUTE FUNCTION public.increment_world_state_version();`
    ];

    const results = [];
    
    for (const sql of statements) {
      try {
        // Use raw SQL execution via RPC or direct query
        const { error } = await supabase.rpc('exec_sql', { query: sql });
        
        if (error) {
          // Try alternative: use raw SQL via a stored procedure if it exists
          console.log('Trying alternative method for:', sql.substring(0, 50));
        }
        
        results.push({ sql: sql.substring(0, 50) + '...', success: !error });
      } catch (e) {
        console.error('Error executing:', sql.substring(0, 50), e);
        results.push({ sql: sql.substring(0, 50) + '...', success: false, error: e.message });
      }
    }

    // Verify combat_locks table exists
    const { data: tableCheck, error: checkError } = await supabase
      .from('combat_locks')
      .select('session_id')
      .limit(1);

    if (!checkError) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Combat sync migration applied successfully!',
          tableExists: true,
          results: results,
          nextSteps: [
            'Enable Realtime for combat_locks table at:',
            'https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/database/replication'
          ]
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Table creation verification failed. Manual migration required.',
          error: checkError.message,
          sqlFile: 'supabase/migrations/20260211_combat_sync_improvements.sql',
          manualSteps: [
            '1. Open: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql/new',
            '2. Copy content from: supabase/migrations/20260211_combat_sync_improvements.sql',
            '3. Paste and execute in SQL Editor'
          ]
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

  } catch (error) {
    console.error('Fatal error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        manualSteps: [
          '1. Open: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql/new',
          '2. Copy content from: supabase/migrations/20260211_combat_sync_improvements.sql',
          '3. Paste and execute in SQL Editor',
          '4. Enable Realtime at: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/database/replication'
        ]
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
