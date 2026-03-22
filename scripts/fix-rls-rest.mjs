// Script to fix RLS policies using REST API
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    for (const line of lines) {
      const [key, value] = line.split('=');
      if (key && value && !process.env[key.trim()]) {
        process.env[key.trim()] = value.trim();
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function setupRLS() {
  console.log('🔧 Configuring RLS for bug_reports...\n');

  try {
    // Use REST API to execute SQL
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'X-Client-Info': 'supabase-js/2.x',
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({
        query: `
          ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;
          
          DROP POLICY IF EXISTS "Allow anonymous bug reports" ON bug_reports;
          CREATE POLICY "Allow anonymous bug reports" 
          ON bug_reports FOR INSERT TO anon WITH CHECK (true);
          
          DROP POLICY IF EXISTS "Allow authenticated bug reports" ON bug_reports;
          CREATE POLICY "Allow authenticated bug reports" 
          ON bug_reports FOR INSERT TO authenticated WITH CHECK (true);
          
          DROP POLICY IF EXISTS "Allow viewing bug reports" ON bug_reports;
          CREATE POLICY "Allow viewing bug reports" 
          ON bug_reports FOR SELECT TO authenticated USING (true);
        `
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.log('⚠️ API response:', error);
    }

    // Alternative: Check current policies
    console.log('📋 Checking current policies via Supabase...');
    
    const checkRes = await fetch(`${supabaseUrl}/rest/v1/pg_policies?table_name=eq.bug_reports`, {
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      }
    });
    
    if (checkRes.ok) {
      const policies = await checkRes.json();
      console.log(`✅ Found ${policies.length} policy(ies) on bug_reports`);
      policies.forEach(p => console.log(`   - ${p.policyname}`));
    }

    console.log('\n⚠️  IMPORTANT: You must manually configure RLS in Supabase Dashboard:');
    console.log('   1. https://app.supabase.com/project/_/database/tables');
    console.log('   2. Find "bug_reports" table → Policies');
    console.log('   3. Disable RLS temporarily OR add these policies:');
    console.log('      • INSERT: WITH CHECK (true) for anon, authenticated');
    console.log('      • SELECT: USING (true) for authenticated');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

setupRLS();
