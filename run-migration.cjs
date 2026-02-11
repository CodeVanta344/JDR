const https = require('https');

const url = 'https://okanuafsmkuzyuyqibpu.supabase.co/functions/v1/apply-migration';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rYW51YWZzbWt1enl1eXFpYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MDE5NzMsImV4cCI6MjA1MTA3Nzk3M30.EzChL7g43s1KW8v8yx7L2eKk_sJiHvFMkBdWUVKElp0';

console.log('🔧 Application automatique de la migration combat sync...\n');

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
                
                if (response.nextSteps) {
                    console.log('PROCHAINE ETAPE:');
                    response.nextSteps.forEach(step => {
                        console.log('  ' + step);
                    });
                }
                
                console.log('');
                console.log('La synchronisation combat est maintenant optimisee!');
                console.log('Zéro rollback garantis en combat multijoueur.');
            } else {
                console.log('ATTENTION: La migration n a pas pu etre appliquee automatiquement.\n');
                console.log('Raison:', response.message || response.error);
                console.log('');
                
                if (response.manualSteps) {
                    console.log('ETAPES MANUELLES REQUISES:');
                    response.manualSteps.forEach(step => {
                        console.log('  ' + step);
                    });
                }
            }
        } catch (e) {
            console.log('Reponse recue:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('Erreur lors de l appel:', error.message);
});

req.end();
