import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── CORS ────────────────────────────────────────────────────────────
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, prefer',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};

// ─── HELPERS ─────────────────────────────────────────────────────────

/** Safe JSON response */
function jsonResponse(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
}

/** Summarize a lore section into a compact string */
function summarizeLore(lore: any): string {
    if (!lore || typeof lore === 'string') return lore || "";
    const parts: string[] = [];
    if (lore.context) parts.push("=== MONDE AETHELGARD ===\n" + lore.context);
    if (lore.history) parts.push("\n=== HISTOIRE DU MONDE ===\n" + (typeof lore.history === 'string' ? lore.history : JSON.stringify(lore.history).substring(0, 1000)));
    if (lore.factions) parts.push("\n=== FACTIONS ===\n" + (typeof lore.factions === 'string' ? lore.factions : JSON.stringify(lore.factions).substring(0, 1000)));
    
    // Ajouter GUIDE DES LIEUX avec services disponibles
    parts.push(`
=== 🗺️ GUIDE DES PRINCIPALES CITÉS (pour orienter le joueur) ===

🏰 AETHELGARD (Capitale, Royaume du Nord)
   Services: Marchands ✓ | Forgerons ✓ | Auberges ✓ | Temples ✓ | Guildes ✓ | Banques ✓
   Description: Capitale majestueuse. Tout y est disponible.
   
🏙️ PORT D'AZUR (Cité Portuaire, Côte Ouest)
   Services: Marchands ✓ | Forgerons ✓ | Auberges ✓ | Banques ✓
   Description: Port maritime. Commerce international.
   
⛰️ FORGEFER (Cité Naine, Montagnes Centrales)
   Services: Marchands ✓ | Forgerons ✓✓✓ (MEILLEURS) | Auberges ✓ | Banques ✓
   Description: Capitale naine. Forges légendaires.
   
🏘️ COMBRELAC (Village, près d'Aethelgard)
   Services: Marchands ✓ | Forgerons ✓ | Auberge ✓ | Écuries ✓
   Description: Village paisible au bord du lac. Petit mais accueillant.
   
🏘️ CARREFOUR (Ville Commerciale)
   Services: Marchands ✓ | Forgerons ✓ | Auberges ✓ | Temples ✓ | Guildes ✓ | Banques ✓
   Description: Carrefour commercial animé.
   
🌲 HAVRE-DU-BOIS (Village Forestier)
   Services: Marchands ✓ | Auberge ✓
   Description: Petit village de bûcherons. Services limités.
   
⚠️ ZONES SAUVAGES (Bois Murmurants, Forêt d'Émeraude, Déserts, etc.)
   Services: AUCUN - Dangereux, créatures hostiles
   
⚠️ DONJONS ET RUINES (Forteresse d'Ombre, Grottes de Cristal, etc.)
   Services: AUCUN - Mortellement dangereux
   
📍 SI LE JOUEUR CHERCHE UN SERVICE:
- Vérifie d'abord sa position actuelle
- Si le service n'existe pas ici, suggère le lieu le plus proche avec ce service
- Donne une indication de distance et direction approximative
`);

    // Ajouter CATALOGUE COMPLET DES ITEMS
    parts.push(`
=== 📦 CATALOGUE OFFICIEL DES ITEMS (OBLIGATOIRE) ===

⚠️ RÈGLE ABSOLUE : TU NE PEUX UTILISER QUE LES ITEMS DE CETTE LISTE.
- Si le joueur demande un item qui N'EXISTE PAS dans ce catalogue, tu DOIS répondre: "Je ne connais pas cet objet."
- NE JAMAIS inventer des items/ingrédients fictifs (ex: "bave d'elfe", "poudre de licorne")
- Si un marchand ne vend pas un item existant, c'est OK de dire "Je n'ai pas ça en stock"

📋 ARMES COMMUNES:
- Dague (10po)
- Épée courte (25po)
- Épée longue (50po)
- Grande hache (75po)
- Arc court (30po)
- Arc long (50po)
- Bâton (10po)

📋 ARMES RARES/LÉGENDAIRES:
- Flamebrand (arme épique, 5000po)
- Dragonbane (légendaire, 50000po)
- Shadowfang (artefact, inestimable)

📋 ARMURES:
- Armure de cuir (50po)
- Cotte de mailles (100po)
- Armure de plaques (500po)
- Armure d'écailles de dragon (25000po, épique)

📋 POTIONS:
- Potion de soin mineure (50po, +25 PV)
- Potion de soin normale (100po, +50 PV)
- Potion de soin supérieure (250po, +100 PV)
- Potion de soin suprême (500po, restauration complète)
- Potion de résistance au feu (150po, 1h)
- Potion d'invisibilité (300po, 10min)
- Potion de force (200po, +5 FOR, 1h)

📋 NOURRITURE:
- Pain (1po)
- Viande rôtie (5po)
- Pain de voyage elfique (50po, sustente 3 jours)

📋 MATÉRIAUX DE CRAFT:
- Minerai de fer (5po)
- Lingot de fer (10po)
- Lingot d'acier (25po)
- Minerai de mithril (500po)
- Os de dragon (2000po)

📋 ARTEFACTS (EXTRÊMEMENT RARES):
- Bâton de l'Archimage (prix inconnu)
- Anneau de Pouvoir (prix inconnu)
- Couronne des Rois (prix inconnu)

💡 EXEMPLES D'ERREURS À ÉVITER:
❌ "Je peux te vendre de la bave d'elfe" → INTERDIT (n'existe pas)
❌ "Voici de la poudre de licorne" → INTERDIT (n'existe pas)
❌ "J'ai des écailles de phénix" → INTERDIT (n'existe pas)
✅ "Je n'ai pas d'ingrédient magique aussi rare. Tu pourrais chercher dans la Forêt d'Émeraude"
✅ "Les seuls ingrédients magiques que je connais sont listés ci-dessus"
`);
    
    return parts.join('\n');
}

// ─── GAME CONSTANTS ──────────────────────────────────────────────────

const RULES = [
    "❌ NE PARLE JAMAIS À LA PLACE DU JOUEUR. N'écris jamais ses dialogues ou pensées.",
    "❌ LE JOUEUR NE PEUT PAS DICTER L'HISTOIRE. Si le joueur dit 'j'enchante mon épée', vérifie d'abord s'il possède la compétence 'Enchantement' dans sa fiche.",
    "❌ AUCUNE ACTION AUTOMATIQUE. Tout nécessite un jet de dés selon la difficulté (DC 10-100).",
    "❌ LE JOUEUR NE PEUT PAS CRÉER DES OBJETS/SORTS DE NULLE PART. Seuls les sorts et items de sa fiche sont utilisables.",
    "❌ AUCUNE MÉTA-CONNAISSANCE AUTORISÉE. Si le joueur mentionne un lieu/PNJ/quête qu'il n'a pas découvert dans l'histoire, REFUSE poliment et demande: 'Comment as-tu entendu parler de cet endroit? Personne ne te l'a mentionné.' Ensuite, propose-lui de chercher des informations en ville (tavernes, panneaux d'affichage, rumeurs).",
    "❌ Le joueur NE PEUT PAS voyager vers une destination non découverte. S'il dit 'je vais à [LIEU_INCONNU]', réponds: '❌ Tu ne connais pas cet endroit. Tu devrais d'abord te renseigner auprès des locaux, consulter une carte, ou suivre des panneaux indicateurs.'",
    "❌ MARCHANDS ET SERVICES: Si le joueur demande 'je cherche un marchand/forgeron/alchimiste' et qu'il n'y en a PAS dans sa position actuelle, tu DOIS lui dire: 'Tu te trouves à [LIEU]. Il n'y a pas de [SERVICE] ici. [SUGGESTION_LIEU_PROCHE avec distance approximative].'",
    "❌ CATALOGUE D'ITEMS OBLIGATOIRE: Tu NE PEUX utiliser QUE les items listés dans le CATALOGUE OFFICIEL DES ITEMS. Si le joueur demande un item inexistant (ex: 'bave d'elfe', 'poudre de licorne'), tu DOIS répondre: 'Je ne connais pas cet objet.' NE JAMAIS inventer d'items fictifs.",
    "✅ SI LE JOUEUR TENTE UNE ACTION IMPOSSIBLE (enchanter sans compétence, invoquer sans sort), REFUSE et explique pourquoi.",
    "✅ Reste dans ton rôle de MJ Dark Fantasy strict mais juste.",
    "✅ Utilise le D100 pour TOUTES les actions incertaines (combat, persuasion, exploration, craft).",
    "✅ En combat, lance les dés et décris les dégâts avec précision.",
    "✅ Consulte le backstory et les compétences du joueur AVANT d'autoriser une action spéciale.",
    "✅ Si le joueur mentionne une action hostile, DÉCLENCHE le mode combat.",
    "✅ AIDE LE JOUEUR À DÉCOUVRIR LE MONDE: S'il ne sait pas où aller, guide-le vers des sources d'informations (PNJ, tavernes, bibliothèques, panneaux de quêtes).",
    "✅ CONNAIS LA GÉOGRAPHIE: Consulte le GUIDE DES PRINCIPALES CITÉS dans le lore pour savoir où diriger le joueur selon ses besoins.",
    "⚖️ ÉQUILIBRAGE : Les actions héroïques nécessitent des jets difficiles (DC 60-80). Les actions légendaires nécessitent DC 90-100.",
    "⚖️ PROGRESSION : Un débutant niveau 1 ne peut pas enchanter une épée, invoquer un dragon, ou séduire un roi. Adapte les possibilités au niveau.",
];

const PHASE_DIRECTIVES: Record<string, string> = {
    "INTRO": "Introduis l'aventure de maniere dramatique.",
    "EXPLORATION": "Decris l'environnement et propose des pistes.",
    "COMBAT": "Gere les tours de combat.",
    "MERCHANT": "Gere les transactions.",
};

const RESPONSE_FORMAT = "REPONDS TOUJOURS EN JSON VALIDE : { \"narrative\": \"...\", \"combat\": { \"trigger\": bool, \"enemies\": [] }, \"codex_update\": {} }";

// ─── MERCHANT ITEM TABLES (SUMMARY) ──────────────────────────────────

function generateMerchantItems(avgLevel: number): any[] {
    // Basic implementation for stability, can be expanded later
    return [
        { name: "Potion de soin", price: 50, type: "consumable", stats: { healing: 10 } },
        { name: "Epee longue", price: 100, type: "weapon", stats: { atk: 1 } }
    ];
}

// ─── PROMPT BUILDER ──────────────────────────────────────────────────

/** Extrait infos détaillées d'un lieu depuis le lore */
function getLocationDetails(locationName: string, loreStr: string): any {
    // Parse basique pour extraire les données de structure du lore
    // Si le lore contient des données JSON, on les extrait
    try {
        // Le lore devrait contenir les définitions de locations
        const locationMatch = loreStr.match(new RegExp(`"name":\\s*"${locationName}"[^}]+services[^}]+}`, 'i'));
        if (locationMatch) {
            const servicesMatch = locationMatch[0].match(/"services":\s*({[^}]+})/);
            if (servicesMatch) {
                return JSON.parse(servicesMatch[1]);
            }
        }
    } catch (e) {
        // Fallback silencieux
    }
    return null;
}

function buildSystemPrompt(opts: any): string {
    // Informations sur le lieu actuel
    let locationInfo = `📍 POSITION ACTUELLE: ${opts.currentLocation}`;
    
    // Essayer d'extraire les services disponibles depuis le lore
    const locationServices = getLocationDetails(opts.currentLocation, opts.lore || '');
    
    if (locationServices) {
        const availableServices = [];
        if (locationServices.merchant) availableServices.push('🏪 Marchand disponible');
        if (locationServices.blacksmith) availableServices.push('⚒️ Forgeron disponible');
        if (locationServices.inn) availableServices.push('🛏️ Auberge disponible');
        if (locationServices.temple) availableServices.push('⛪ Temple disponible');
        if (locationServices.guild) availableServices.push('🏛️ Guilde disponible');
        if (locationServices.bank) availableServices.push('🏦 Banque disponible');
        if (locationServices.stables) availableServices.push('🐴 Écuries disponibles');
        
        if (availableServices.length > 0) {
            locationInfo += '\n🛠️ SERVICES DISPONIBLES ICI:\n' + availableServices.join('\n');
        } else {
            locationInfo += '\n⚠️ AUCUN SERVICE DISPONIBLE dans ce lieu isolé.';
        }
    } else {
        locationInfo += '\n⚠️ Lieu non répertorié - probablement une zone sauvage sans services.';
    }
    
    return `TU ES LE MAITRE DU JEU (MJ) d'un RPG Dark Fantasy strict et immersif.
PHASE: ${opts.gamePhase} | HEURE: ${opts.timeLabel} | MÉTÉO: ${opts.weather}

═══════════════════════════════════════════════════════════════
GROUPE D'AVENTURIERS
═══════════════════════════════════════════════════════════════
${opts.partyList}

JOUEUR ACTIF: ${opts.playerInfo}

═══════════════════════════════════════════════════════════════
FICHE DU JOUEUR (À CONSULTER OBLIGATOIREMENT)
═══════════════════════════════════════════════════════════════
NIVEAU: ${opts.playerProfile?.level || 1}
CLASSE: ${opts.playerProfile?.class || 'Inconnu'}
STATISTIQUES: ${JSON.stringify(opts.playerProfile?.stats || {})}

INVENTAIRE ACTUEL:
${opts.playerProfile?.inventory?.map((item: any) => `- ${item.name || item.item_name} (${item.quantity || 1}x)`).join('\n') || '(Vide)'}

COMPÉTENCES & SORTS MAÎTRISÉS:
${opts.playerProfile?.abilities?.map((ab: any) => `- ${ab.name}: ${ab.description || ab.desc || ''}`).join('\n') || '(Aucune compétence spéciale)'}

BACKSTORY: ${opts.playerProfile?.backstory || 'Inconnu'}

═══════════════════════════════════════════════════════════════
🗺️ GÉOGRAPHIE ET POSITION
═══════════════════════════════════════════════════════════════
${locationInfo}

⚠️ SI LE JOUEUR CHERCHE UN SERVICE NON DISPONIBLE:
1. Indique clairement qu'il n'y a pas ce service ici
2. Suggère-lui un lieu proche où il peut trouver ce service (consulte le lore pour les villes/villages avec services)
3. Guide-le gentiment: "Tu pourrais chercher à [NOM_VILLE], à environ [DISTANCE] d'ici. Pour y aller, tu pourrais [SUGGESTION_CHEMIN]."

═══════════════════════════════════════════════════════════════
🗺️ LIEUX DÉCOUVERTS PAR LE JOUEUR
═══════════════════════════════════════════════════════════════
${opts.discoveredLocations?.length > 0 ? opts.discoveredLocations.join(', ') : '(Aucun lieu découvert pour le moment)'}

⚠️ RÈGLE CRITIQUE: Le joueur NE PEUT PAS voyager vers un lieu qui n'apparaît PAS dans cette liste.
Si le joueur mentionne un lieu non découvert, tu DOIS REFUSER et lui suggérer de chercher des informations (tavernes, PNJ, panneaux).

═══════════════════════════════════════════════════════════════
LORE DU MONDE
═══════════════════════════════════════════════════════════════
${summarizeLore(opts.lore)}

═══════════════════════════════════════════════════════════════
HISTORIQUE RÉCENT
═══════════════════════════════════════════════════════════════
${opts.historyStr}

═══════════════════════════════════════════════════════════════
FORMAT DE RÉPONSE (JSON OBLIGATOIRE)
═══════════════════════════════════════════════════════════════
${RESPONSE_FORMAT}

═══════════════════════════════════════════════════════════════
⚠️ RÈGLES FONDAMENTALES DU MJ ⚠️
═══════════════════════════════════════════════════════════════
${RULES.map((r, i) => `${i + 1}. ${r}`).join('\n')}

═══════════════════════════════════════════════════════════════
💡 DIRECTIVE DE PHASE
═══════════════════════════════════════════════════════════════
${PHASE_DIRECTIVES[opts.gamePhase] || 'Gère la situation.'}

═══════════════════════════════════════════════════════════════
🎲 SYSTÈME DE JETS DE DÉS
═══════════════════════════════════════════════════════════════
Niv 1-5: d20 (×5) = 5-100
Niv 6-10: d50 (×2) = 2-100
Niv 11-15: d75 (×1.33) = 1-100
Niv 16+: d100 = 1-100

DIFFICULTÉ (DC):
• Trivial: DC 10-20
• Facile: DC 25-35
• Moyen: DC 40-55
• Difficile: DC 60-75
• Très difficile: DC 80-90
• Quasi-impossible: DC 95-100

⚠️ IMPORTANT: Si le joueur tente une action qui n'est PAS dans sa fiche (enchantement, invocation, etc.), tu DOIS REFUSER et expliquer qu'il n'a pas cette capacité. Ne laisse JAMAIS le joueur inventer des pouvoirs.`;
}

// ─── MAIN HANDLER ────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
    // ── Preflight CORS ──────────────────────────────────────────
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const body = await req.json();
        const action = body.action || "";
        const sessionId = body.sessionId || "";
        const playerId = body.playerId || "";
        const history = body.history || [];
        const lore = body.lore || "";
        const context = body.context || "";
        const gamePhase = body.gamePhase || "INTRO";
        const timeLabel = body.timeLabel || "Inconnu";
        const weather = body.weather || "clear";

        const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
        const openaiKey = Deno.env.get('OPENAI_API_KEY') || '';

        const supabase = createClient(supabaseUrl, supabaseKey);

        // Fetch player/party info
        const { data: party } = await supabase.from('players').select('*').eq('session_id', sessionId);
        const partyList = party?.map((p: any) => `${p.name} (${p.class})`).join(' | ') || "Aucun";
        const activePlayer = party?.find((p: any) => p.id === playerId);
        const playerInfo = activePlayer ? `${activePlayer.name} (${activePlayer.class})` : "Inconnu";

        // Récupérer les lieux découverts et position actuelle depuis le Codex
        const { data: codexData } = await supabase
            .from('game_sessions')
            .select('codex_discovered_locations, current_location')
            .eq('id', sessionId)
            .single();
        
        const discoveredLocations = codexData?.codex_discovered_locations || [];
        const currentLocation = codexData?.current_location || "Inconnu";
        
        // Par défaut, le joueur connaît son lieu de départ
        if (discoveredLocations.length === 0 && activePlayer?.backstory) {
            discoveredLocations.push("Lieu de départ (selon ton origine)");
        }

        const historyStr = history.map((m: any) => `${m.role}: ${m.content}`).join('\n');

        const prompt = buildSystemPrompt({
            gamePhase, 
            timeLabel, 
            weather, 
            partyList, 
            playerInfo, 
            lore, 
            historyStr,
            playerProfile: activePlayer,
            discoveredLocations,
            currentLocation // Position actuelle du joueur
        });

        // Call OpenAI
        const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: prompt },
                    { role: 'user', content: action },
                ],
                temperature: 0.7,
            }),
        });

        const aiData = await aiRes.json();
        const raw = aiData.choices?.[0]?.message?.content || "";

        let result;
        try {
            const clean = raw.replace(/```json/g, '').replace(/```/g, '').trim();
            result = JSON.parse(clean);
        } catch (_e) {
            result = { narrative: raw };
        }

        // Failsafe combat detection
        const combatKeywords = ['attaque', 'frappe', 'combat', 'charge'];
        if (combatKeywords.some(kw => action.toLowerCase().includes(kw)) && !result.combat?.trigger) {
            result.combat = { trigger: true, enemies: [{ name: "Ennemi", hp: 20, max_hp: 20, atk: 5, ac: 10, id: "e1" }] };
        }

        // Save to DB
        if (context !== 'GAME_ASSISTANT') {
            await supabase.from('messages').insert([{
                session_id: sessionId,
                role: 'system',
                content: result.narrative || JSON.stringify(result),
            }]);
        }

        return jsonResponse(result);

    } catch (error: any) {
        return jsonResponse({ narrative: "Erreur serveur.", error: error.message }, 500);
    }
});
