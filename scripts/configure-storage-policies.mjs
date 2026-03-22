// Script to configure storage bucket policies
const supabaseUrl = 'https://okanuafsmkuzyuyqibpu.supabase.co';
const supabaseServiceKey = 'process.env.SUPABASE_SERVICE_KEY';

async function configureStoragePolicies() {
  console.log('🔧 Configuration des policies Storage pour bug-reports...\n');

  // SQL pour créer les policies storage
  const storagePoliciesSQL = `
-- Storage policies for bug-reports bucket
BEGIN;

-- Policy for anonymous uploads
INSERT INTO storage.policies (name, definition, bucket_id)
SELECT 
  'allow_anon_upload',
  '(role() = ''anon''::text)',
  id
FROM storage.buckets
WHERE name = 'bug-reports'
ON CONFLICT DO NOTHING;

-- Policy for authenticated uploads  
INSERT INTO storage.policies (name, definition, bucket_id)
SELECT 
  'allow_auth_upload',
  '(role() = ''authenticated''::text)',
  id
FROM storage.buckets
WHERE name = 'bug-reports'
ON CONFLICT DO NOTHING;

COMMIT;
`;

  console.log('📋 SQL à exécuter dans Supabase Dashboard:');
  console.log('   https://app.supabase.com/project/_/sql');
  console.log('\n--- SQL ---');
  console.log(storagePoliciesSQL);
  console.log('---\n');

  // Alternative: try to make bucket public and set policies via API
  console.log('🔄 Tentative configuration via API...');

  try {
    // Update bucket to be public
    const updateRes = await fetch(`${supabaseUrl}/storage/v1/bucket/bug-reports`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        public: true,
        file_size_limit: 5242880,
        allowed_mime_types: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
      })
    });
    console.log('   Update bucket:', updateRes.status);
  } catch (e) {
    console.log('   ⚠️', e.message);
  }

  console.log('\n✅ Configuration storage terminée!');
  console.log('\n⚠️  IMPORTANT: Vous devez aussi configurer les policies dans:');
  console.log('   https://app.supabase.com/project/_/storage/policies');
  console.log('   Ou exécuter le SQL ci-dessus dans le SQL Editor');
}

configureStoragePolicies();
