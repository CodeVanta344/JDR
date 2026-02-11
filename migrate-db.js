import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://okanuafsmkuzyuyqibpu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rYW51YWZzbWt1enl1eXFpYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxODAwNzEsImV4cCI6MjA1MTc1NjA3MX0.qWcJMpDXxnXwBhLGRCHTxWlV6xpDXZxXxAKRSiLqDqk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('🔄 Checking database schema...');
  
  try {
    const { data, error } = await supabase
      .from('players')
      .select('visited_npcs')
      .limit(1);
    
    if (!error) {
      console.log('✅ Migration already applied! Columns exist.');
      return;
    }
    
    if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
      console.log('\n⚠️  MIGRATION REQUIRED\n');
      console.log('The codex columns do not exist in the database.');
      console.log('\n📋 Manual steps required:');
      console.log('1. Open: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/editor');
      console.log('2. Click "SQL Editor" in left sidebar');
      console.log('3. Click "+ New query"');
      console.log('4. Paste the SQL below and click RUN:\n');
      console.log('---SQL START---');
      console.log(`
ALTER TABLE players 
ADD COLUMN IF NOT EXISTS visited_npcs JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS discovered_locations JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS active_quests JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS discovered_secrets JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS important_events JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS backstory_gm_context TEXT,
ADD COLUMN IF NOT EXISTS starting_reputation JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS known_npcs JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS faction_ties JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS personal_secrets JSONB DEFAULT '[]'::jsonb;
      `);
      console.log('---SQL END---\n');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

migrate();
