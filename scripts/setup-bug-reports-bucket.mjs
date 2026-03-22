// Script to set up bug-reports storage bucket
// Run this with: node scripts/setup-bug-reports-bucket.mjs

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
  console.error('  - SUPABASE_SERVICE_ROLE_KEY (get this from Supabase Dashboard > Settings > API > service_role key)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupBugReportsBucket() {
  console.log('🔧 Setting up bug-reports storage bucket...\n');

  try {
    // Check if bucket exists
    console.log('📋 Checking if bucket exists...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError.message);
      return;
    }

    const bucketExists = buckets.some(b => b.name === 'bug-reports');

    if (bucketExists) {
      console.log('✅ Bucket "bug-reports" already exists');
    } else {
      // Create the bucket
      console.log('📦 Creating bucket "bug-reports"...');
      const { data, error: createError } = await supabase.storage.createBucket('bug-reports', {
        public: true,
        fileSizeLimit: 5242880, // 5MB limit
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
      });

      if (createError) {
        console.error('❌ Error creating bucket:', createError.message);
        return;
      }

      console.log('✅ Bucket "bug-reports" created successfully');
    }

    // Set up bucket policies for public uploads
    console.log('\n🔐 Setting up bucket policies...');
    
    // Policy for public uploads (anonymous bug reports)
    const { error: policyError } = await supabase.storage.from('bug-reports').createSignedUrl('test.txt', 60);
    if (policyError && !policyError.message.includes('not found')) {
      console.log('ℹ️  Note: Bucket policies may need manual configuration in Supabase Dashboard');
    }

    console.log('\n✅ Setup complete!');
    console.log('\n⚠️  IMPORTANT: You may need to manually configure RLS policies in Supabase Dashboard:');
    console.log('   1. Go to Supabase Dashboard > Storage > bug-reports > Policies');
    console.log('   2. Add a policy to allow INSERT for anon/authenticated users');
    console.log('   3. Add a policy to allow SELECT for the bucket owner');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

setupBugReportsBucket();
