// Script to configure RLS policies using Supabase REST API
const supabaseUrl = 'https://okanuafsmkuzyuyqibpu.supabase.co';
const supabaseServiceKey = 'process.env.SUPABASE_SERVICE_KEY';

async function configureRLS() {
  console.log('🔧 Configuration des policies RLS...\n');

  // 1. Enable RLS on bug_reports table
  console.log('1️⃣ Activation RLS sur bug_reports...');
  try {
    const enableRLS = await fetch(`${supabaseUrl}/rest/v1/rpc/enable_rls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({ table_name: 'bug_reports' })
    });
    console.log('   Response:', enableRLS.status);
  } catch (e) {
    console.log('   ⚠️', e.message);
  }

  // 2. Create INSERT policy for anon
  console.log('2️⃣ Création policy INSERT pour anon...');
  try {
    const createPolicy = await fetch(`${supabaseUrl}/rest/v1/rpc/create_policy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({
        policy_name: 'allow_anon_insert',
        table_name: 'bug_reports',
        action: 'INSERT',
        role: 'anon',
        using_clause: null,
        check_clause: 'true'
      })
    });
    console.log('   Response:', createPolicy.status);
  } catch (e) {
    console.log('   ⚠️', e.message);
  }

  // 3. Create INSERT policy for authenticated
  console.log('3️⃣ Création policy INSERT pour authenticated...');
  try {
    const createPolicy = await fetch(`${supabaseUrl}/rest/v1/rpc/create_policy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({
        policy_name: 'allow_auth_insert',
        table_name: 'bug_reports',
        action: 'INSERT',
        role: 'authenticated',
        using_clause: null,
        check_clause: 'true'
      })
    });
    console.log('   Response:', createPolicy.status);
  } catch (e) {
    console.log('   ⚠️', e.message);
  }

  // 4. Create SELECT policy for authenticated
  console.log('4️⃣ Création policy SELECT pour authenticated...');
  try {
    const createPolicy = await fetch(`${supabaseUrl}/rest/v1/rpc/create_policy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({
        policy_name: 'allow_auth_select',
        table_name: 'bug_reports',
        action: 'SELECT',
        role: 'authenticated',
        using_clause: 'true',
        check_clause: null
      })
    });
    console.log('   Response:', createPolicy.status);
  } catch (e) {
    console.log('   ⚠️', e.message);
  }

  // 5. Check current policies
  console.log('\n5️⃣ Vérification des policies existantes...');
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/pg_policies?table_name=eq.bug_reports`, {
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      }
    });
    if (res.ok) {
      const policies = await res.json();
      console.log(`   ✅ ${policies.length} policy(s) trouvée(s):`);
      policies.forEach(p => console.log(`      - ${p.policyname}`));
    }
  } catch (e) {
    console.log('   ⚠️', e.message);
  }

  console.log('\n✅ Configuration terminée!');
  console.log('\n⚠️ Si ça ne fonctionne pas, désactivez RLS manuellement dans le dashboard:');
  console.log('   https://app.supabase.com/project/_/database/tables');
}

configureRLS();
