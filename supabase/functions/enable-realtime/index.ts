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

    console.log('🔔 Activating Realtime for world_state...');

    // SQL to enable Realtime
    const sql = `
      -- Add world_state to Realtime publication
      ALTER PUBLICATION supabase_realtime ADD TABLE public.world_state;
      
      -- Verify it's enabled
      SELECT schemaname, tablename
      FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND tablename = 'world_state';
    `;

    // Execute via RPC
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      console.error('Error:', error);
      
      // Return instructions if RPC fails
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          instructions: [
            '1. Open: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql/new',
            '2. Copy content from ENABLE_REALTIME.sql',
            '3. Paste and execute in SQL Editor'
          ]
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    console.log('✅ Realtime enabled successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Realtime enabled for world_state!',
        data: data
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Fatal error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        instructions: [
          '1. Open: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql/new',
          '2. Execute: ALTER PUBLICATION supabase_realtime ADD TABLE public.world_state;'
        ]
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
