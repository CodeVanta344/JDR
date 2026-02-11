const https = require('https');

const url = 'https://okanuafsmkuzyuyqibpu.supabase.co/functions/v1/setup-database';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rYW51YWZzbWt1enl1eXFpYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MDE5NzMsImV4cCI6MjA1MTA3Nzk3M30.EzChL7g43s1KW8v8yx7L2eKk_sJiHvFMkBdWUVKElp0';

console.log('🚀 Tentative de création automatique de la table world_state...\n');

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
                console.log('✅ SUCCÈS!\n');
                console.log(response.message);
                console.log('');
                
                if (response.reminder) {
                    console.log('⚠️  IMPORTANT:');
                    console.log(response.reminder);
                    console.log('');
                }
                
                console.log('🎉 La synchronisation des marchands est maintenant active!');
            } else {
                console.log('⚠️  La fonction a retourné une erreur:');
                console.log(response.message);
                console.log('');
                
                if (response.instructions) {
                    console.log('📋 Instructions manuelles:');
                    response.instructions.forEach(inst => {
                        console.log(`   ${inst}`);
                    });
                }
            }
        } catch (e) {
            console.error('❌ Erreur lors du parsing de la réponse:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('Erreur lors de l appel a la fonction:', error.message);
    console.log('');
    console.log('Solution alternative:');
    console.log('   Ouvrez le fichier: setup-database.html');
    console.log('   Il contient un guide visuel pas-a-pas.');
});

req.end();
