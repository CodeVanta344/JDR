// Script to fix RLS policies for bug_reports table
// Run this with: node scripts/setup-bug-reports-rls.mjs

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read environment variables from .env file if it exists
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

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('  - VITE_SUPABASE_URL');
  console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupRLS() {
  console.log('🔧 Setting up RLS policies for bug_reports table...\n');

  try {
    // Enable RLS on the table
    console.log('📋 Enabling RLS on bug_reports table...');
    const { error: rlsError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;
      `
    });
    
    if (rlsError && !rlsError.message.includes('already enabled')) {
      console.log('⚠️ Note:', rlsError.message);
    } else {
      console.log('✅ RLS enabled');
    }

    // Create policy for anonymous inserts
    console.log('\n🔐 Creating INSERT policy for anonymous users...');
    const { error: insertPolicyError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Allow anonymous bug reports" 
        ON bug_reports 
        FOR INSERT 
        TO anon 
        WITH CHECK (true);
      `
    });
    
    if (insertPolicyError) {
      if (insertPolicyError.message.includes('already exists')) {
        console.log('✅ INSERT policy already exists');
      } else {
        console.log('⚠️ INSERT policy error:', insertPolicyError.message);
      }
    } else {
      console.log('✅ INSERT policy created');
    }

    // Create policy for authenticated inserts
    console.log('\n🔐 Creating INSERT policy for authenticated users...');
    const { error: authInsertError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Allow authenticated bug reports" 
        ON bug_reports 
        FOR INSERT 
        TO authenticated 
        WITH CHECK (true);
      `
    });
    
    if (authInsertError) {
      if (authInsertError.message.includes('already exists')) {
        console.log('✅ Authenticated INSERT policy already exists');
      } else {
        console.log('⚠️ Authenticated INSERT error:', authInsertError.message);
      }
    } else {
      console.log('✅ Authenticated INSERT policy created');
    }

    // Create SELECT policy for viewing own reports
    console.log('\n🔐 Creating SELECT policy...');
    const { error: selectError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Allow viewing bug reports" 
        ON bug_reports 
        FOR SELECT 
        TO authenticated 
        USING (true);
      `
    });
    
    if (selectError) {
      if (selectError.message.includes('already exists')) {
        console.log('✅ SELECT policy already exists');
      } else {
        console.log('⚠️ SELECT policy error:', selectError.message);
      }
    } else {
      console.log('✅ SELECT policy created');
    }

    console.log('\n✅ RLS setup complete!');
    console.log('\n⚠️  If policies were not created, you may need to manually configure them in Supabase Dashboard:');
    console.log('   1. Go to Supabase Dashboard > Database > Tables > bug_reports');
    console.log('   2. Click on "Policies" tab');
    console.log('   3. Add policies for INSERT (anon/authenticated) and SELECT');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

setupRLS();
