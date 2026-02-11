import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── CORS ────────────────────────────────────────────────────────────
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ─── HELPERS ─────────────────────────────────────────────────────────

/** Safe JSON response */
function jsonResponse(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
}

/** Summarize a lore section (array or object) into a compact string */
function summarizeLore(lore: any): string {
    if (!lore || typeof lore === 'string') return lore || "";

    const parts: string[] = [];

    // World context (always first, full text)
    if (lore.context) parts.push("MONDE:\n" + lore.context);

    // Factions
    if (lore.factions) {
        const factionStr = typeof lore.factions === 'string'
            ? lore.factions
            : JSON.stringify(lore.factions);
        parts.push("FACTIONS: " + factionStr.substring(0, 800));
    }

    // NPC Templates — extract names and greetings for quick reference
    if (lore.npcs) {
        const npcLines: string[] = [];
        for (const [role, list] of Object.entries(lore.npcs)) {
            if (Array.isArray(list)) {
                (list as any[]).forEach((n: any) => {
                    npcLines.push(`[${role}] ${n.name} (${n.region || '?'}): "${n.greeting || ''}" Secret: ${n.secret || 'aucun'}`);
                });
            }
        }
        if (npcLines.length) parts.push("PNJ DISPONIBLES:\n" + npcLines.join('\n'));
    }

    // Quest Hooks — titles + desc per region
    if (lore.quests) {
        const questLines: string[] = [];
        for (const [region, list] of Object.entries(lore.quests)) {
            if (Array.isArray(list)) {
                (list as any[]).forEach((q: any) => {
                    questLines.push(`[${region}] Niv.${q.level} "${q.title}" (${q.type}): ${q.desc}`);
                });
            }
        }
        if (questLines.length) parts.push("QUETES:\n" + questLines.join('\n'));
    }

    // Locations — taverns, shops, landmarks
    if (lore.locations) {
        const locLines: string[] = [];
        for (const [type, list] of Object.entries(lore.locations)) {
            if (Array.isArray(list)) {
                (list as any[]).forEach((l: any) => {
                    locLines.push(`[${type}] ${l.name} (${l.region}): ${l.desc}`);
                });
            }
        }
        if (locLines.length) parts.push("LIEUX:\n" + locLines.join('\n'));
    }

    // Rumors
    if (lore.rumors) {
        const rumorLines: string[] = [];
        for (const [region, list] of Object.entries(lore.rumors)) {
            if (Array.isArray(list)) {
                (list as any[]).slice(0, 3).forEach((r: any) => {
                    rumorLines.push(`[${region}] "${r.rumor}" (${r.truth ? 'vrai' : 'faux'})`);
                });
            }
        }
        if (rumorLines.length) parts.push("RUMEURS:\n" + rumorLines.join('\n'));
    }

    // Encounters — one per category for flavor
    if (lore.encounters) {
        const encLines: string[] = [];
        for (const [cat, list] of Object.entries(lore.encounters)) {
            if (Array.isArray(list) && list.length > 0) {
                const sample = list[Math.floor(Math.random() * list.length)];
                encLines.push(`[${cat}] ${typeof sample === 'string' ? sample : sample.desc || JSON.stringify(sample)}`);
            }
        }
        if (encLines.length) parts.push("RENCONTRES (exemples):\n" + encLines.join('\n'));
    }

    // Bestiary — compact list
    if (lore.bestiary) {
        const beastLines = Object.entries(lore.bestiary).map(([key, b]: [string, any]) =>
            `${b.name || key} (CR ${b.cr || '?'}): ${b.desc || ''}`
        );
        if (beastLines.length) parts.push("BESTIAIRE:\n" + beastLines.join('\n'));
    }

    // Legendary Items
    if (lore.legendaryItems && Array.isArray(lore.legendaryItems)) {
        const itemLines = lore.legendaryItems.map((i: any) =>
            `${i.name} (${i.rarity}): ${i.lore?.substring(0, 80) || ''}...`
        );
        if (itemLines.length) parts.push("ARTEFACTS LEGENDAIRES:\n" + itemLines.join('\n'));
    }

    // Myths
    if (lore.myths && Array.isArray(lore.myths)) {
        const mythLines = lore.myths.map((m: any) =>
            `"${m.title}": ${m.story?.substring(0, 100) || ''}...`
        );
        if (mythLines.length) parts.push("MYTHES:\n" + mythLines.join('\n'));
    }

    // Chronicle (session-specific events)
    if (lore.chronicle && Array.isArray(lore.chronicle) && lore.chronicle.length > 0) {
        const chronicleLines = lore.chronicle.slice(-5).map((c: any) =>
            `[${c.type || 'event'}] ${c.description || JSON.stringify(c)}`
        );
        parts.push("CHRONIQUE RECENTE:\n" + chronicleLines.join('\n'));
    }

    // Classes — compact
    if (lore.classes) {
        parts.push("CLASSES: " + JSON.stringify(lore.classes).substring(0, 600));
    }

    return parts.join('\n\n');
}

// ─── RULES (easily extensible — just add a new entry) ────────────────

const RULES: string[] = [
    // 1. Inventory verification
    `VERIFICATION INVENTAIRE: Regarde le champ INV du joueur. Si le joueur veut utiliser un objet qui N'EST PAS dans INV, REFUSE. Dit: "Vous cherchez cet objet dans votre sac, mais vous n'en trouvez pas."`,

    // 2. Spell verification
    `VERIFICATION SORTS: Regarde le champ SPELLS. Si le joueur veut lancer un sort qui N'EST PAS dans SPELLS, REFUSE. Dit: "Vous tentez de canaliser cette energie, mais vous ne maitrisez pas ce sort."`,

    // 3. Anti god-mode
    `ANTI GOD-MODE: Si le joueur decrit le RESULTAT de son action (ex: "Je le tue"), considere cela comme une INTENTION, pas un fait. Si l'ennemi est puissant, decris un echec ou un combat.`,

    // 4. Time & dynamism
    `TEMPS & DYNAMISME: Le monde AVANCE. Si les joueurs attendent/dorment, quelque chose DOIT se passer (embuscade, reve, meteo, decouverte). NE BOUCLE PAS SUR LA MEME DESCRIPTION.`,

    // 5. Language
    `LANGUE: TOUJOURS repondre en FRANCAIS.`,

    // 6. Immersion
    `IMMERSION: Termine TOUJOURS ta narration par une question ou une proposition d'action pour engager les joueurs.`,

    // 7. Progression
    `PROGRESSION: Si les joueurs tournent en rond, donne un INDICE EVIDENT ou DECLENCHE UN EVENEMENT (bruit, lueur, PNJ).`,

    // 8. Stagnation recovery
    `RECUPERATION DE STAGNATION (Context: GM_STAGNATION_RECOVERY): Si ce contexte est actif, DECLENCHE UN INCIDENT immediat (cri, attaque, PNJ). Force les joueurs a REAGIR.`,

    // 9. Equipment affinity
    `AFFINITE EQUIPEMENT:\n` +
    `  ARMURES: LEGERE=toutes classes, INTERMEDIAIRE=Guerrier/Clerc/Paladin/Rodeur/Druide, LOURDE=Guerrier/Clerc/Paladin uniquement.\n` +
    `  ARMES: SIMPLE=toutes, MARTIALE=Guerrier/Paladin/Rodeur, FINESSE=Voleur/Barde/Rodeur, ARCANIQUE=Mage/Barde/Druide, SACREE=Clerc/Paladin.\n` +
    `  PENALITE: MAGE/VOLEUR/BARDE en armure lourde = pas de sorts, -2 a tous les jets. DRUIDE refuse le metal.`,

    // 10. Class archetypes & magic
    `ARCHETYPES & MAGIE (STRICT):\n` +
    `  - PHYSIQUES (Guerrier, Voleur): AUCUNE MAGIE.\n` +
    `  - HYBRIDES (Paladin, Clerc, Druide, Rodeur, Barde): MAGIE SIMPLE & PHYSIQUE.\n` +
    `  - MAGIQUES (Mage): MAGIE PUISSANTE & FRAGILITE.`,

    // 11. Extended lore usage
    `UTILISATION DU LORE ETENDU (IMPORTANT):\n` +
    `  - RENCONTRES: Utilise les encounters (road/wilderness/social/supernatural/combat/mystery) pour peupler les voyages.\n` +
    `  - PNJ: Cite les PNJ par leurs NOMS, apparences, repliques et secrets.\n` +
    `  - QUETES: Propose des quetes selon la region et le niveau du groupe.\n` +
    `  - RUMEURS: En taverne, partage les rumeurs de la region. Certaines sont vraies, d'autres fausses.\n` +
    `  - LIEUX: Utilise les lieux nommes (tavernes/boutiques/landmarks) pour ancrer les scenes.\n` +
    `  - MYTHES: Raconte les mythes lors de repos ou checks de lore reussis.\n` +
    `  - ARTEFACTS: Reference les items legendaires comme objectifs ou indices narratifs.\n` +
    `  - FACTIONS: Utilise les factions pour les tensions politiques et allegiances PNJ.`,

    // 12. Start adventure
    `START_ADVENTURE: Si cette action est declenchee, les joueurs viennent de se reunir. Decris l'arrivee de CHAQUE personnage en te basant sur son BACKSTORY. Force une rencontre concrete (taverne, clairiere, prison). Decris les odeurs, les sons et l'atmosphere.`,
];

// ─── PHASE DIRECTIVES ────────────────────────────────────────────────

const PHASE_DIRECTIVES: Record<string, string> = {
    INTRO: `FOCUS: Roleplay social, immersion, lore, liens entre joueurs.\nRYTHME: Lent. Exploration de l'environnement immediat.\nDANGER: Faible. Pas de combat mortel sauf si provoque.`,

    EXPLORATION: `FOCUS: Exploration du monde, decouvertes, interactions PNJ.\nRYTHME: Modere. Obstacles legers et quetes secondaires.\nDANGER: Modere. Les erreurs coutent cher.`,

    DRAMA: `FOCUS: Tension dramatique, enjeux eleves, combats de boss, choix moraux.\nRYTHME: Rapide. Le monde est hostile, les ennemis sont proactifs.\nDANGER: Eleve. La mort est une possibilite reelle.`,
};

// ─── RESPONSE FORMAT ─────────────────────────────────────────────────

const RESPONSE_FORMAT = `FORMAT DE REPONSE (JSON STRICT, pas de texte autour):
{
  "narrative": "Description immersive, sensorielle, au present. Termine par une question.",
  "new_context": "Mise a jour courte du contexte.",
  "consequences": { "hp_change": 0, "xp_gain": 0, "item_update": null },
  "weather": "clear",
  "combat": null,
  "unlock": [],
  "stats": {},
  "item": null,
  "merchant": null,
  "loot": null,
  "transaction": null,
  "world_event": null
}

STRUCTURE COMBAT (si hostile):
"combat": { "enemies": [{ "name": "Gobelin", "hp": 15, "atk": 4, "ac": 12, "id": "e1" }], "reason": "...", "trigger": true }`;

// ─── PROMPT BUILDER ──────────────────────────────────────────────────

function buildSystemPrompt(opts: {
    gamePhase: string;
    timeLabel: string;
    partyList: string;
    playerInfo: string;
    context: string;
    lore: any;
    historyStr: string;
}): string {
    const { gamePhase, timeLabel, partyList, playerInfo, context, lore, historyStr } = opts;

    const sections: string[] = [];

    // Identity
    sections.push(
        `TU ES LE MAITRE DU JEU (MJ) d'un RPG Dark Fantasy "Miroir des Ombres".`,
        `TON BUT: Simuler un monde coherent, dangereux et reactif. NE SOIS PAS COMPLAISANT.`,
        `PHASE ACTUELLE: ${gamePhase} | HEURE: ${timeLabel}`,
    );

    // Group awareness
    sections.push(`GROUPE: Tu t'adresses a un GROUPE (${partyList}). Utilise VOUS (pluriel).`);

    // Rules (auto-numbered)
    sections.push("\nREGLES ABSOLUES:");
    RULES.forEach((rule, i) => sections.push(`${i + 1}. ${rule}`));

    // Phase directives
    const directive = PHASE_DIRECTIVES[gamePhase] || PHASE_DIRECTIVES.EXPLORATION;
    sections.push(`\nDIRECTIVES DE PHASE (${gamePhase}):\n${directive}`);

    // Response format
    sections.push(`\n${RESPONSE_FORMAT}`);

    // Dynamic context
    sections.push(
        `\nCONTEXTE ACTUEL: ${context || "Debut de l'aventure"}`,
        `JOUEUR ACTIF: ${playerInfo}`,
        `EQUIPE COMPLETE: ${partyList}`,
    );

    // Lore (intelligently summarized)
    const loreSummary = summarizeLore(lore);
    if (loreSummary) {
        sections.push(`\nLORE DU MONDE:\n${loreSummary.substring(0, 8000)}`);
    }

    // History
    sections.push(`\nHISTORIQUE RECENT:\n${historyStr}`);

    return sections.join('\n');
}

// ─── MAIN HANDLER ────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
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

        // ── Env check ──
        const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
        const openaiKey = Deno.env.get('OPENAI_API_KEY') || '';

        if (!supabaseUrl || !supabaseKey || !openaiKey) {
            return jsonResponse({ narrative: "Config serveur manquante." });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // ── Fetch player info ──
        let playerInfo = "";
        if (playerId) {
            const { data: p } = await supabase
                .from('players')
                .select('name, class, level, gold, spells, inventory, backstory')
                .eq('id', playerId)
                .single();

            if (p) {
                playerInfo = [
                    `CHAR: ${p.name}`,
                    `CLASS: ${p.class}`,
                    `LVL: ${p.level || 1}`,
                    `GOLD: ${p.gold || 0}`,
                    `INV: ${JSON.stringify(p.inventory || [])}`,
                    `SPELLS: ${JSON.stringify(p.spells || [])}`,
                    `BACKSTORY: ${JSON.stringify(p.backstory || "Inconnu")}`,
                ].join(' | ');
            }
        }

        // ── Fetch party ──
        const { data: party } = await supabase
            .from('players')
            .select('name, class, backstory')
            .eq('session_id', sessionId);

        const partyList = (party || [])
            .map((p: any) => `${p.name} (${p.class}) [${p.backstory?.label || "?"}]`)
            .join(' | ') || "Aucun";

        // ── Build history string ──
        const historyStr = history.length > 0
            ? history.map((m: any) => `${m.role}: ${m.content}`).join('\n')
            : "Aucun";

        // ── Build system prompt ──
        const prompt = buildSystemPrompt({
            gamePhase, timeLabel, partyList, playerInfo, context, lore, historyStr,
        });

        // ── Determine user message ──
        let userMsg = action;
        if (action !== 'intro' && !action.startsWith('[SYSTEM]') && !action.startsWith('START_ADVENTURE')) {
            userMsg = "[TENTATIVE DU JOUEUR]: " + action;
        }

        // ── Call OpenAI ──
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
                    { role: 'user', content: userMsg },
                ],
                temperature: 0.7,
                max_tokens: 600,
            }),
        });

        if (!aiRes.ok) {
            const errTxt = await aiRes.text();
            return jsonResponse({ narrative: `Erreur OpenAI: ${aiRes.status}`, error: errTxt });
        }

        const aiData = await aiRes.json();
        const raw = aiData.choices?.[0]?.message?.content || "";

        // ── Parse response ──
        let result;
        try {
            const clean = raw.replace(/```json/g, '').replace(/```/g, '').trim();
            result = JSON.parse(clean);
        } catch (_e) {
            result = { narrative: raw, new_context: "parse error" };
        }

        // ── Save to DB (skip private contexts) ──
        if (context !== 'GAME_ASSISTANT' && context !== 'PRIVATE_NPC_CONVERSATION') {
            await supabase.from('messages').insert([{
                session_id: sessionId,
                role: 'system',
                content: JSON.stringify(result),
            }]);
        }

        return jsonResponse(result);

    } catch (error: any) {
        return jsonResponse(
            { narrative: `Erreur: ${error.message || String(error)}`, error: String(error) },
            500
        );
    }
});
