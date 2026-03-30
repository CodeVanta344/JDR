import 'dotenv/config';

/**
 * AETHELGARD GM SERVER
 * =====================
 * Tourne sur le PC du MJ. Écoute les requêtes AI des joueurs via Supabase Realtime,
 * les traite avec Claude Code CLI (ton forfait), et renvoie les réponses.
 *
 * Usage: npm start (ou npm run dev pour auto-reload)
 *
 * Sécurité:
 * - Aucune clé API exposée aux joueurs
 * - Rate limit côté Supabase (10 req/min/joueur)
 * - Le MJ contrôle quand le serveur tourne
 * - Seules les sessions du MJ sont traitées
 */

import { createClient } from '@supabase/supabase-js';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

// ============================================================================
// CONFIG
// ============================================================================

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
console.log(`🔑 Supabase key: ${SUPABASE_KEY ? SUPABASE_KEY.slice(0, 20) + '...' : '❌ MISSING'}`);
const MAX_CONCURRENT = 2; // Max 2 requêtes Claude en parallèle
const POLL_INTERVAL = 2000; // Poll toutes les 2s si realtime échoue

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Configurez SUPABASE_URL et SUPABASE_KEY (ou VITE_SUPABASE_ANON_KEY)');
  console.error('   Exemple: SUPABASE_URL=https://xxx.supabase.co SUPABASE_ANON_KEY=xxx node index.mjs');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

let processing = 0;
let totalProcessed = 0;

// ============================================================================
// CLAUDE CODE CLI INTEGRATION
// ============================================================================

/**
 * Appelle Claude Code CLI avec un prompt et retourne la réponse
 */
async function callClaudeCode(systemPrompt, userMessage, maxTokens = 2048) {
  const fullPrompt = systemPrompt
    ? `[System: ${systemPrompt}]\n\n${userMessage}`
    : userMessage;

  try {
    // Utilise le CLI claude avec --print pour output direct (pas de session interactive)
    const { stdout } = await execFileAsync('claude', [
      '--print',          // Mode non-interactif, affiche la réponse et quitte
      '--no-input',       // Pas d'input stdin
      '--model', 'sonnet', // Utilise Claude Sonnet (le plus rapide/efficace)
      fullPrompt
    ], {
      timeout: 120000, // 2 minutes max
      maxBuffer: 1024 * 1024, // 1MB
      env: { ...process.env, TERM: 'dumb' }, // Évite les codes ANSI
    });

    return stdout.trim();
  } catch (err) {
    // Fallback: essayer avec -p (alias court)
    try {
      const { stdout } = await execFileAsync('claude', [
        '-p', fullPrompt
      ], {
        timeout: 120000,
        maxBuffer: 1024 * 1024,
        env: { ...process.env, TERM: 'dumb' },
      });
      return stdout.trim();
    } catch (err2) {
      console.error('❌ Claude CLI error:', err2.message);
      throw new Error(`Claude CLI failed: ${err2.message}`);
    }
  }
}

// ============================================================================
// REQUEST HANDLERS
// ============================================================================

const SYSTEM_PROMPTS = {
  'game-master': `Tu es le Maître du Jeu des Chroniques d'Aethelgard, un JDR d100 High Fantasy épique.

REGLES:
- Système d100: jet SOUS le CD = succès. CD varie: Trivial 90, Facile 70, Normal 50, Difficile 30, Très difficile 15, Quasi-impossible 5
- Modificateur de stat: (stat - 10) / 2 × 5 ajouté au CD
- Critique: 96-100. Fumble: 1-5
- CHAQUE action non-triviale nécessite un jet de d100

FORMAT DE RÉPONSE (JSON strict):
{
  "narrative": "texte narratif immersif en français, 2-4 paragraphes",
  "challenge": { "label": "nom du jet", "stat": "str/dex/con/int/wis/cha/per/wil", "dc": 50, "type": "combat/social/exploration" } (optionnel),
  "combat": { "trigger": true, "enemies": [{ "name": "...", "hp": 20, "max_hp": 20, "atk": 5, "ac": 12, "id": "e1", "cr": 2 }] } (optionnel),
  "npc": { "name": "Nom", "attitude": "friendly/neutral/hostile" } (optionnel)
}

MONDE: Aethelgard - 5 régions (Val Doré, Monts Cœur-de-Fer, Sylve d'Émeraude, Côte des Orages, Terres Brûlées). 5 Sceaux magiques se brisent. Le Cercle des Cendres menace le monde. L'Aube d'Argent protège.

SOIS STRICT: refuse les actions impossibles, vérifie les compétences de classe, le combat est mortel. Sois immersif, dramatique, et juste. Réponds TOUJOURS en français.`,

  'npc-gen': `Tu es un expert Game Master pour Aethelgard. Génère un PNJ détaillé en JSON strict avec: name, age, appearance, backstory, secrets[], dialogue_samples[], quest_hooks[], stats{hp,atk,ac}. Tout en français.`,

  'combat-gen': `Tu es Game Master expert système d100 Aethelgard. Génère un combat équilibré en JSON strict avec: enemies[], terrain{features[], ambient}, plot_twist, loot[]. Tout en français.`,

  'plot-twist': `Tu es Game Master créatif Aethelgard. Suggère un plot twist impactant en 2-3 phrases. En français.`,

  'chat': `Tu es un assistant Game Master pour Aethelgard (JDR d100 High Fantasy). Aide le MJ en temps réel: narration, improvisation, PNJ, règles, combats, lore. Réponds en français, concis et utile.`,
};

async function processRequest(request) {
  const { id, request_type, request_payload } = request;

  console.log(`🎲 [${request_type}] Traitement de la requête ${id.slice(0, 8)}...`);

  // Marquer comme "processing"
  await supabase.from('ai_requests').update({
    status: 'processing',
  }).eq('id', id);

  try {
    let systemPrompt = SYSTEM_PROMPTS[request_type] || SYSTEM_PROMPTS['chat'];
    let userMessage;

    if (typeof request_payload === 'string') {
      userMessage = request_payload;
    } else if (request_type === 'game-master') {
      // Build rich context from the game-master payload
      const p = request_payload;
      const parts = [];
      if (p.player) parts.push(`JOUEUR: ${p.player.name} (${p.player.class || '?'}) Niv.${p.player.level || 1}`);
      if (p.history?.length) parts.push(`HISTORIQUE:\n${p.history.slice(-8).map(m => `${m.role}: ${m.content}`).join('\n')}`);
      if (p.gamePhase) parts.push(`PHASE: ${p.gamePhase}`);
      if (p.currentLocation) parts.push(`LIEU: ${p.currentLocation}`);
      parts.push(`ACTION DU JOUEUR: ${p.action || p.message || '(aucune)'}`);
      userMessage = parts.join('\n\n');
    } else {
      userMessage = request_payload.message || request_payload.action || JSON.stringify(request_payload);
    }

    const response = await callClaudeCode(systemPrompt, userMessage);

    // Essayer de parser en JSON si possible
    let responsePayload;
    try {
      const clean = response.replace(/```json\n?/g, '').replace(/```\n?$/g, '').trim();
      responsePayload = JSON.parse(clean);
    } catch {
      responsePayload = { narrative: response };
    }

    // === AUTO-DETECT COMBAT ===
    if (request_type === 'game-master' && !responsePayload.combat?.trigger) {
      const narrative = (responsePayload.narrative || '').toLowerCase();
      const action = (request_payload?.action || '').toLowerCase();

      // Player wants combat
      const playerCombatWords = ['attaque', 'frappe', 'combat', 'charge', 'tire sur', 'dégaine', 'agresse', 'lance un sort sur', 'se bat'];
      const playerWantsCombat = playerCombatWords.some(w => action.includes(w));

      // Narrative describes combat
      const narrativeCombatWords = ['surgit', 'surgissent', 'attaquent', 'embuscade', 'vous assaillent', 'bondit sur', 'se jette sur', 'combat', 'dégainent', 'épée', 'lame', 'frappez', 'votre cible', 'les dés décident', 'tentez votre attaque', 'vous êtes attaqué'];
      const narrativeIndicatesCombat = narrativeCombatWords.some(w => narrative.includes(w));

      if (playerWantsCombat || narrativeIndicatesCombat) {
        const playerLevel = request_payload?.player?.level || 1;
        const location = (request_payload?.currentLocation || '').toLowerCase();

        // Generate level-appropriate enemies based on context
        const enemyTemplates = {
          tavern: [
            { name: 'Voyou de Taverne', hp: 15, max_hp: 15, atk: 4, ac: 10, cr: 1 },
            { name: 'Brute Ivre', hp: 20, max_hp: 20, atk: 5, ac: 11, cr: 1 },
            { name: 'Videur', hp: 25, max_hp: 25, atk: 6, ac: 12, cr: 2 },
          ],
          city: [
            { name: 'Soldat de la Garde', hp: 22, max_hp: 22, atk: 6, ac: 14, cr: 2 },
            { name: 'Mercenaire', hp: 28, max_hp: 28, atk: 7, ac: 13, cr: 3 },
          ],
          forest: [
            { name: 'Loup Sauvage', hp: 12, max_hp: 12, atk: 5, ac: 11, cr: 1 },
            { name: 'Gobelin Éclaireur', hp: 10, max_hp: 10, atk: 4, ac: 12, cr: 1 },
            { name: 'Treant Corrompu', hp: 45, max_hp: 45, atk: 8, ac: 14, cr: 4 },
          ],
          mountain: [
            { name: 'Golem de Pierre', hp: 40, max_hp: 40, atk: 8, ac: 16, cr: 4 },
            { name: 'Troll des Montagnes', hp: 50, max_hp: 50, atk: 9, ac: 13, cr: 5 },
          ],
          sewer: [
            { name: 'Rat Géant', hp: 8, max_hp: 8, atk: 3, ac: 10, cr: 0.5 },
            { name: 'Ombre Mineure', hp: 18, max_hp: 18, atk: 5, ac: 12, cr: 2 },
          ],
          default: [
            { name: 'Bandit', hp: 15, max_hp: 15, atk: 5, ac: 12, cr: 1 },
            { name: 'Éclaireur Ennemi', hp: 20, max_hp: 20, atk: 6, ac: 13, cr: 2 },
            { name: 'Guerrier du Cercle', hp: 30, max_hp: 30, atk: 7, ac: 14, cr: 3 },
          ],
        };

        // Pick template based on location/narrative context
        let templateKey = 'default';
        if (narrative.includes('taverne') || narrative.includes('auberge') || narrative.includes('sanglier')) templateKey = 'tavern';
        else if (narrative.includes('forêt') || narrative.includes('sylve') || narrative.includes('bois')) templateKey = 'forest';
        else if (narrative.includes('mont') || narrative.includes('mine') || narrative.includes('forge')) templateKey = 'mountain';
        else if (narrative.includes('égout') || narrative.includes('souterrain')) templateKey = 'sewer';
        else if (narrative.includes('ville') || narrative.includes('garde') || narrative.includes('soldat') || narrative.includes('garnison')) templateKey = 'city';
        else if (location.includes('sol-aureus') || location.includes('val')) templateKey = 'city';
        else if (location.includes('sylve') || location.includes('forêt')) templateKey = 'forest';
        else if (location.includes('mont') || location.includes('karak')) templateKey = 'mountain';

        const templates = enemyTemplates[templateKey];

        // Scale enemies to player level
        const numEnemies = Math.min(1 + Math.floor(playerLevel / 3), 4);
        const enemies = [];
        for (let i = 0; i < numEnemies; i++) {
          const template = templates[Math.min(i, templates.length - 1)];
          const levelScale = Math.min(3, 1 + (playerLevel - 1) * 0.15); // cap at 3× (level ~21)
          enemies.push({
            ...template,
            id: `e${i + 1}`,
            hp: Math.round(template.hp * levelScale),
            max_hp: Math.round(template.max_hp * levelScale),
            atk: Math.round(template.atk * levelScale),
            cr: Math.max(1, Math.round(template.cr * levelScale)),
          });
        }

        // Also try to extract enemy names from the narrative
        const nameMatches = narrative.match(/\*\*([^*]+)\*\*/g);
        if (nameMatches) {
          nameMatches.forEach((match, i) => {
            const name = match.replace(/\*\*/g, '').trim();
            if (i < enemies.length && name.length > 2 && name.length < 40) {
              enemies[i].name = name;
            }
          });
        }

        responsePayload.combat = { trigger: true, enemies };
        console.log(`⚔️  Combat auto-détecté! ${enemies.length} ennemis (${templateKey})`);
      }
    }

    // Sauvegarder la réponse
    await supabase.from('ai_requests').update({
      status: 'completed',
      response_payload: responsePayload,
      processed_at: new Date().toISOString(),
    }).eq('id', id);

    totalProcessed++;
    console.log(`✅ [${request_type}] Requête ${id.slice(0, 8)} traitée (total: ${totalProcessed})`);

  } catch (err) {
    console.error(`❌ [${request_type}] Erreur:`, err.message);

    await supabase.from('ai_requests').update({
      status: 'error',
      error_message: err.message,
      processed_at: new Date().toISOString(),
    }).eq('id', id);
  } finally {
    processing--;
  }
}

// ============================================================================
// POLLING (fiable, fonctionne même sans Realtime)
// ============================================================================

async function pollPendingRequests() {
  if (processing >= MAX_CONCURRENT) return;

  const { data: requests, error } = await supabase
    .from('ai_requests')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(MAX_CONCURRENT - processing);

  if (error) {
    console.error('❌ Polling error:', error.message);
    return;
  }

  for (const req of (requests || [])) {
    processing++;
    processRequest(req).catch(console.error);
  }
}

// ============================================================================
// REALTIME SUBSCRIPTION (instant, si disponible)
// ============================================================================

function setupRealtime() {
  const channel = supabase
    .channel('ai-requests')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'ai_requests',
      filter: 'status=eq.pending',
    }, (payload) => {
      if (processing < MAX_CONCURRENT) {
        processing++;
        processRequest(payload.new).catch(console.error);
      }
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('📡 Realtime connecté — réponses instantanées activées');
      }
    });

  return channel;
}

// ============================================================================
// STARTUP
// ============================================================================

console.log('');
console.log('╔═══════════════════════════════════════════════════╗');
console.log('║     🎭 AETHELGARD GM SERVER — Claude Code CLI     ║');
console.log('╠═══════════════════════════════════════════════════╣');
console.log('║  Les requêtes AI des joueurs passent par ton      ║');
console.log('║  forfait Claude Code. Aucune clé API exposée.     ║');
console.log('║                                                   ║');
console.log('║  Ctrl+C pour arrêter                              ║');
console.log('╚═══════════════════════════════════════════════════╝');
console.log('');
console.log(`📡 Supabase: ${SUPABASE_URL}`);
console.log(`⚡ Max concurrent: ${MAX_CONCURRENT}`);
console.log(`🔄 Poll interval: ${POLL_INTERVAL}ms`);
console.log('');

// Vérifier que Claude CLI est disponible
try {
  await execFileAsync('claude', ['--version'], { timeout: 5000 });
  console.log('✅ Claude Code CLI détecté');
} catch {
  console.error('❌ Claude Code CLI non trouvé. Installez-le: npm install -g @anthropic-ai/claude-code');
  process.exit(1);
}

// Démarrer
setupRealtime();
setInterval(pollPendingRequests, POLL_INTERVAL);
pollPendingRequests(); // Premier poll immédiat

console.log('');
console.log('🟢 GM Server actif — en attente de requêtes des joueurs...');
console.log('');
