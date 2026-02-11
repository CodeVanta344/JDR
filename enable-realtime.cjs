const https = require('https');

console.log('🔔 Activation de Realtime pour world_state...\n');

// Method 1: Try via Edge Function
const url = 'https://okanuafsmkuzyuyqibpu.supabase.co/functions/v1/enable-realtime';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rYW51YWZzbWt1enl1eXFpYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MDE5NzMsImV4cCI6MjA1MTA3Nzk3M30.EzChL7g43s1KW8v8yx7L2eKk_sJiHvFMkBdWUVKElp0';

const options = {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
};

const req = https.request(url, options, (res) => {
    let data = '';
    
    res.on('data', chunk => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            
            if (response.success) {
                console.log('SUCCES!\n');
                console.log(response.message);
                console.log('');
                console.log('La synchronisation des marchands est maintenant active en temps reel!');
            } else {
                console.log('La fonction Edge n a pas pu activer Realtime.');
                console.log('');
                showManualInstructions();
            }
        } catch (e) {
            console.log('Reponse inattendue:', data);
            console.log('');
            showManualInstructions();
        }
    });
});

req.on('error', (error) => {
    console.log('Erreur lors de l appel:', error.message);
    console.log('');
    showManualInstructions();
});

req.end();

function showManualInstructions() {
    console.log('=================================================================');
    console.log('  ACTIVATION MANUELLE DE REALTIME (1 minute)');
    console.log('=================================================================');
    console.log('');
    console.log('ETAPE 1: Ouvrir le SQL Editor');
    console.log('  https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql/new');
    console.log('');
    console.log('ETAPE 2: Copier et coller cette commande:');
    console.log('');
    console.log('  ALTER PUBLICATION supabase_realtime ADD TABLE public.world_state;');
    console.log('');
    console.log('ETAPE 3: Cliquer sur RUN');
    console.log('');
    console.log('RESULTAT ATTENDU:');
    console.log('  - Si vous voyez "Success": Realtime est active!');
    console.log('  - Si erreur "already exists": Realtime etait deja active!');
    console.log('');
    console.log('=================================================================');
}
