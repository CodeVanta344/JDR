// Direct SQL execution via Supabase REST
const supabaseUrl = 'https://okanuafsmkuzyuyqibpu.supabase.co';
const supabaseServiceKey = 'process.env.SUPABASE_SERVICE_KEY';

async function executeSQL() {
  console.log('🔧 Exécution SQL directe...\n');

  const sqlCommands = [
    // Enable RLS
    `ALTER TABLE IF EXISTS bug_reports ENABLE ROW LEVEL SECURITY;`,

    // Drop existing policies
    `DROP POLICY IF EXISTS "Allow anonymous bug reports" ON bug_reports;`,
    `DROP POLICY IF EXISTS "Allow authenticated bug reports" ON bug_reports;`,
    `DROP POLICY IF EXISTS "Allow viewing bug reports" ON bug_reports;`,

    // Create INSERT policy for anon
    `CREATE POLICY "Allow anonymous bug reports" 
     ON bug_reports 
     FOR INSERT 
     TO anon 
     WITH CHECK (true);`,

    // Create INSERT policy for authenticated
    `CREATE POLICY "Allow authenticated bug reports" 
     ON bug_reports 
     FOR INSERT 
     TO authenticated 
     WITH CHECK (true);`,

    // Create SELECT policy
    `CREATE POLICY "Allow viewing bug reports" 
     ON bug_reports 
     FOR SELECT 
     TO authenticated 
     USING (true);`
  ];

  // Try to use Supabase SQL API
  for (let i = 0; i < sqlCommands.length; i++) {
    const sql = sqlCommands[i];
    console.log(`\n${i + 1}/${sqlCommands.length}: ${sql.substring(0, 60)}...`);

    try {
      // Try using pg_net or direct SQL via REST
      const res = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey,
          'Prefer': 'tx=commit'
        },
        body: JSON.stringify({ query: sql })
      });

      console.log('   Status:', res.status);
      if (!res.ok) {
        const text = await res.text();
        console.log('   Erreur:', text.substring(0, 100));
      } else {
        console.log('   ✅ OK');
      }
    } catch (e) {
      console.log('   ⚠️ Exception:', e.message);
    }
  }

  console.log('\n\n✅ Tentative terminée!');
  console.log('\n⚠️  Alternative : Vous devez exécuter ce SQL dans le SQL Editor de Supabase:');
  console.log('   https://app.supabase.com/project/_/sql');
  console.log('\n   Copiez-collez ce SQL:\n');
  console.log('---');
  sqlCommands.forEach(sql => console.log(sql));
  console.log('---\n');
}

executeSQL();
