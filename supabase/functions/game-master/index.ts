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
    "NE PARLE PAS A LA PLACE DU JOUEUR.",
    "Reste dans ton role de MJ Dark Fantasy.",
    "Utilise le D100 pour les actions incertaines.",
    "En combat, lance les des et decris les degats.",
    "Sois reactif selon le backstory du joueur.",
    "Si le joueur mentionne une action hostile ou de combat, DECLENCHE le mode combat.",
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
    return `TU ES LE MAITRE DU JEU (MJ) d'un RPG Dark Fantasy.
PHASE: ${opts.gamePhase} | HEURE: ${opts.timeLabel} | METEO: ${opts.weather}

JOUEURS: ${opts.partyList}
JOUEUR ACTIF: ${opts.playerInfo}

LORE: ${summarizeLore(opts.lore)}

HISTORIQUE: ${opts.historyStr}

${RESPONSE_FORMAT}

REGLÉS:
${RULES.join('\n')}`;
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
            gamePhase, timeLabel, weather, partyList, playerInfo, lore, historyStr
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
