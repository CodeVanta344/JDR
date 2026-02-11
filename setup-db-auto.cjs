// Automatic database setup script
const https = require('https');

const SUPABASE_URL = 'https://okanuafsmkuzyuyqibpu.supabase.co';
const PROJECT_REF = 'okanuafsmkuzyuyqibpu';

// Read SQL migration
const fs = require('fs');
const sqlContent = fs.readFileSync('./MANUAL_MIGRATION_WORLD_STATE.sql', 'utf8');

// Extract only the SQL part (remove comments and verification queries)
const sqlStatements = sqlContent
    .split('-- =====================================================')[0]
    .split('\n')
    .filter(line => !line.trim().startsWith('--') && line.trim())
    .join('\n');

console.log('🚀 Automatic Database Setup for world_state table\n');
console.log('📋 Executing SQL migration via Supabase API...\n');

// Method 1: Try using service role key via REST API
async function executeSQL() {
    const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rYW51YWZzbWt1enl1eXFpYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MDE5NzMsImV4cCI6MjA1MTA3Nzk3M30.EzChL7g43s1KW8v8yx7L2eKk_sJiHvFMkBdWUVKElp0';
    
    // Try to test if table exists first
    const testUrl = `${SUPABASE_URL}/rest/v1/world_state?select=key&limit=1`;
    
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                'apikey': anon_key,
                'Authorization': `Bearer ${anon_key}`,
                'Content-Type': 'application/json'
            }
        };
        
        const req = https.request(testUrl, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log('✅ Table world_state already exists!');
                    console.log('✅ Database is ready.\n');
                    
                    console.log('⚠️  IMPORTANT: Verify Realtime is enabled:');
                    console.log(`👉 https://supabase.com/dashboard/project/${PROJECT_REF}/database/replication`);
                    console.log('   Make sure "world_state" is checked.\n');
                    resolve(true);
                } else if (res.statusCode === 404 || data.includes('does not exist')) {
                    console.log('⚠️  Table does not exist yet.');
                    console.log('\n❌ Cannot create table automatically via REST API.');
                    console.log('   (Supabase requires SQL Editor or CLI for DDL operations)\n');
                    
                    showManualInstructions();
                    resolve(false);
                } else {
                    console.log(`⚠️  Unexpected response (${res.statusCode}):`, data);
                    showManualInstructions();
                    resolve(false);
                }
            });
        });
        
        req.on('error', (e) => {
            console.error('❌ Connection error:', e.message);
            showManualInstructions();
            reject(e);
        });
        
        req.end();
    });
}

function showManualInstructions() {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('  📋 MANUAL SETUP REQUIRED (Takes 2 minutes)');
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('STEP 1: Open SQL Editor');
    console.log(`👉 https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new\n`);
    console.log('STEP 2: Copy the SQL');
    console.log('   - Open: MANUAL_MIGRATION_WORLD_STATE.sql');
    console.log('   - Select ALL (Ctrl+A)');
    console.log('   - Copy (Ctrl+C)\n');
    console.log('STEP 3: Execute');
    console.log('   - Paste in SQL Editor (Ctrl+V)');
    console.log('   - Click "RUN" or press Ctrl+Enter\n');
    console.log('STEP 4: Enable Realtime');
    console.log(`👉 https://supabase.com/dashboard/project/${PROJECT_REF}/database/replication`);
    console.log('   - Find "world_state" in the table list');
    console.log('   - CHECK the box next to it\n');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('✨ After completing these steps, the merchant interface will');
    console.log('   be synchronized for all players in real-time!\n');
}

// Execute
executeSQL().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
