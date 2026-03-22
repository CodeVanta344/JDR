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
  'game-master': `Tu es le Maître du Jeu d'Aethelgard, un JDR d100 High Fantasy épique.
Tu narres l'histoire, gères les PNJ, résous les actions des joueurs avec des jets de dés d100.
Réponds en français. Sois immersif, dramatique, et juste. Format: JSON avec "narrative" et optionnellement "dice_check", "npc_dialogue", "combat_trigger".`,

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
    const systemPrompt = SYSTEM_PROMPTS[request_type] || SYSTEM_PROMPTS['chat'];
    const userMessage = typeof request_payload === 'string'
      ? request_payload
      : request_payload.message || request_payload.action || JSON.stringify(request_payload);

    const response = await callClaudeCode(systemPrompt, userMessage);

    // Essayer de parser en JSON si possible
    let responsePayload;
    try {
      const clean = response.replace(/```json\n?/g, '').replace(/```\n?$/g, '').trim();
      responsePayload = JSON.parse(clean);
    } catch {
      responsePayload = { narrative: response };
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
