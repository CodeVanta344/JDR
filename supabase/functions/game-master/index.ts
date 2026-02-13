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
    return parts.join('\n');
}

// ─── GAME CONSTANTS ──────────────────────────────────────────────────

const RULES = [
    "❌ NE PARLE JAMAIS À LA PLACE DU JOUEUR. N'écris jamais ses dialogues ou pensées.",
    "❌ LE JOUEUR NE PEUT PAS DICTER L'HISTOIRE. Si le joueur dit 'j'enchante mon épée', vérifie d'abord s'il possède la compétence 'Enchantement' dans sa fiche.",
    "❌ AUCUNE ACTION AUTOMATIQUE. Tout nécessite un jet de dés selon la difficulté (DC 10-100).",
    "❌ LE JOUEUR NE PEUT PAS CRÉER DES OBJETS/SORTS DE NULLE PART. Seuls les sorts et items de sa fiche sont utilisables.",
    "✅ SI LE JOUEUR TENTE UNE ACTION IMPOSSIBLE (enchanter sans compétence, invoquer sans sort), REFUSE et explique pourquoi.",
    "✅ Reste dans ton rôle de MJ Dark Fantasy strict mais juste.",
    "✅ Utilise le D100 pour TOUTES les actions incertaines (combat, persuasion, exploration, craft).",
    "✅ En combat, lance les dés et décris les dégâts avec précision.",
    "✅ Consulte le backstory et les compétences du joueur AVANT d'autoriser une action spéciale.",
    "✅ Si le joueur mentionne une action hostile, DÉCLENCHE le mode combat.",
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

function buildSystemPrompt(opts: any): string {
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

        const historyStr = history.map((m: any) => `${m.role}: ${m.content}`).join('\n');

        const prompt = buildSystemPrompt({
            gamePhase, 
            timeLabel, 
            weather, 
            partyList, 
            playerInfo, 
            lore, 
            historyStr,
            playerProfile: activePlayer // Inclure TOUTE la fiche du joueur
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
