import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkTableExists(tableName) {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);
    
    if (error && error.code === '42P01') {
        return false; // Table does not exist
    }
    return true; // Table exists
}

async function verifyWorldState() {
    console.log('🔍 Checking world_state table...\n');
    
    try {
        const exists = await checkTableExists('world_state');
        
        if (!exists) {
            console.log('❌ Table world_state does NOT exist');
            console.log('\n📋 Please run the SQL migration manually:');
            console.log('1. Open Supabase Dashboard SQL Editor:');
            console.log('   https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql');
            console.log('2. Copy the content of MANUAL_MIGRATION_WORLD_STATE.sql');
            console.log('3. Paste and execute it in the SQL Editor\n');
            return false;
        }
        
        console.log('✅ Table world_state exists');
        
        // Test insert/update (merchant sync)
        console.log('\n🧪 Testing merchant sync functionality...');
        const testKey = `test_merchant_${Date.now()}`;
        const testValue = {
            npcName: 'Test Merchant',
            inventory: [{ name: 'Test Item', price: 100 }],
            active: true
        };
        
        const { error: insertError } = await supabase
            .from('world_state')
            .upsert({ key: testKey, value: testValue });
        
        if (insertError) {
            console.log('❌ Insert test failed:', insertError.message);
            return false;
        }
        
        console.log('✅ Insert/Update test passed');
        
        // Test read
        const { data: readData, error: readError } = await supabase
            .from('world_state')
            .select('*')
            .eq('key', testKey)
            .single();
        
        if (readError) {
            console.log('❌ Read test failed:', readError.message);
            return false;
        }
        
        console.log('✅ Read test passed');
        console.log('   Retrieved:', JSON.stringify(readData.value, null, 2));
        
        // Test delete
        const { error: deleteError } = await supabase
            .from('world_state')
            .delete()
            .eq('key', testKey);
        
        if (deleteError) {
            console.log('❌ Delete test failed:', deleteError.message);
            return false;
        }
        
        console.log('✅ Delete test passed');
        
        console.log('\n✨ All tests passed! Merchant sync is ready to use.');
        return true;
        
    } catch (err) {
        console.error('❌ Error during verification:', err.message);
        return false;
    }
}

// Run verification
verifyWorldState().then(success => {
    process.exit(success ? 0 : 1);
});
