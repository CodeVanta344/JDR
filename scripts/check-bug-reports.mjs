import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://okanuafsmkuzyuyqibpu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rYW51YWZzbWt1enl1eXFpYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODQyMjgsImV4cCI6MjA4NjA2MDIyOH0.w93viTCCxc48GNw2n_HFKGq2yQRUvwZSt6lq-FqJb9E';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBugReports() {
    const { data, error } = await supabase
        .from('bug_reports')
        .select('*')
        .order('timestamp', { ascending: false });
    
    if (error) {
        console.error('Erreur:', error.message);
        process.exit(1);
    }
    
    if (!data || data.length === 0) {
        console.log('📭 Aucun rapport de bug reçu.');
        return;
    }
    
    console.log(`📨 ${data.length} rapport(s) de bug trouvé(s):\n`);
    
    data.forEach((report, i) => {
        console.log(`--- Rapport #${i + 1} ---`);
        console.log(`🕐 Date: ${new Date(report.timestamp).toLocaleString('fr-FR')}`);
        console.log(`👤 Joueur: ${report.player_name || 'Anonyme'}`);
        console.log(`📝 Description: ${report.description?.substring(0, 200) || 'Aucune description'}...`);
        console.log(`📸 Screenshots: ${report.screenshots?.length || 0}`);
        console.log(`📊 Status: ${report.status}`);
        console.log(`🔗 URL: ${report.url}`);
        console.log('');
    });
}

checkBugReports();
