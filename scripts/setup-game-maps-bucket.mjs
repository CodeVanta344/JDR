// Script to set up game-maps storage bucket
// Run this with: node scripts/setup-game-maps-bucket.mjs

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

async function setupGameMapsBucket() {
  console.log('🔧 Setting up game-maps storage bucket...\n');

  try {
    // Check if bucket exists
    console.log('📋 Checking if bucket exists...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError.message);
      return;
    }

    const bucketExists = buckets.some(b => b.name === 'game-maps');

    if (bucketExists) {
      console.log('✅ Bucket "game-maps" already exists');
    } else {
      // Create the bucket
      console.log('📦 Creating bucket "game-maps"...');
      const { data, error: createError } = await supabase.storage.createBucket('game-maps', {
        public: true,
        fileSizeLimit: 10485760, // 10MB limit for maps
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
      });

      if (createError) {
        console.error('❌ Error creating bucket:', createError.message);
        return;
      }

      console.log('✅ Bucket "game-maps" created successfully');
    }

    console.log('\n✅ Setup complete!');
    console.log('\n⚠️  IMPORTANT: You may need to manually configure RLS policies in Supabase Dashboard:');
    console.log('   1. Go to Supabase Dashboard > Storage > game-maps > Policies');
    console.log('   2. Add a policy to allow INSERT for authenticated users (level designer)');
    console.log('   3. Add a policy to allow SELECT for all users (players need to see maps)');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

setupGameMapsBucket();
