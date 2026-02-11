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

    // 13. SOCIAL DICE ROLLS (CRITICAL - ALWAYS APPLY)
    `LANCERS DE DES SOCIAUX (OBLIGATOIRE):\n` +
    `  Quand un joueur tente une action sociale, tu DOIS demander un jet de des via le champ "challenge".\n` +
    `  ACTIONS NECESSITANT UN JET:\n` +
    `  - NEGOCIATION/MARCHANDAGE: Jet de Charisme (CHA), DD selon difficulte (10=facile, 15=moyen, 20=difficile)\n` +
    `  - INTIMIDATION: Jet de Force (FOR) ou Charisme (CHA), DD selon puissance du PNJ\n` +
    `  - PERSUASION: Jet de Charisme (CHA), DD selon disposition du PNJ\n` +
    `  - TROMPERIE/MENSONGE: Jet de Charisme (CHA) contre Sagesse du PNJ\n` +
    `  - PERSPICACITE (detecter mensonge): Jet de Sagesse (SAG), DD = Charisme du menteur\n` +
    `  - INVESTIGATION (trouver indices): Jet d'Intelligence (INT), DD selon difficulte\n` +
    `  - DISCRÉTION: Jet de Dexterite (DEX), DD selon vigilance des ennemis\n` +
    `  IMPORTANT: NE DECIDE PAS le resultat toi-meme. Demande le jet et ATTENDS le resultat.`,

    // 14. CRITICAL SUCCESS/FAILURE
    `CRITIQUES (1 ET 20 NATURELS):\n` +
    `  REUSSITE CRITIQUE (20): Succes spectaculaire avec bonus.\n` +
    `  - Negociation: Prix reduit de 50%, le marchand offre un item bonus\n` +
    `  - Intimidation: La cible est terrorisee, fuit ou revele tout\n` +
    `  - Persuasion: La cible devient un allie loyal temporairement\n` +
    `  - Perspicacite: Revele un secret cache en plus du mensonge\n` +
    `  ECHEC CRITIQUE (1): Echec desastreux avec consequences.\n` +
    `  - Negociation: Le marchand est offense, prix doubles ou refuse de vendre\n` +
    `  - Intimidation: La cible appelle des renforts ou attaque\n` +
    `  - Persuasion: La cible devient hostile, reputation endommagee\n` +
    `  - Tromperie: Le mensonge est decouvert, consequences graves\n` +
    `  TOUJOURS decrire les consequences dans la narration.`,

    // 15. STRICT LORE CONSISTENCY - NO INVENTION
    `COHERENCE DU LORE (REGLE ABSOLUE - TRES IMPORTANT):\n` +
    `  Les PNJ ne peuvent PAS inventer de lore, d'evenements historiques, de batailles, ou d'histoires personnelles qui ne sont PAS dans le LORE fourni.\n` +
    `  SI un joueur pose une question sur quelque chose qui N'EST PAS dans le lore:\n` +
    `  - Le PNJ dit qu'il ne sait pas: "Je n'ai jamais entendu parler de ca..." ou "Cette histoire m'est inconnue."\n` +
    `  - Le PNJ peut specul mais en le disant clairement: "On raconte que... mais je ne sais pas si c'est vrai."\n` +
    `  - Le PNJ peut rediriger: "Vous devriez demander a [autre PNJ] qui connait mieux ces choses."\n` +
    `  INTERDIT:\n` +
    `  - Inventer des batailles (ex: "Bataille du Gouffre de X")\n` +
    `  - Inventer des royaumes ou villes non documentes\n` +
    `  - Creer des backstories de PNJ qui ne sont pas dans leur fiche\n` +
    `  - Ajouter des evenements historiques non mentionnes dans WORLD_HISTORY\n` +
    `  UTILISE UNIQUEMENT: WORLD_HISTORY, FACTION_LORE, WORLD_MYTHS, NPC_TEMPLATES (secrets, motivations) fournis.`,

    // 16. NPC KNOWLEDGE LIMITS
    `LIMITES DE CONNAISSANCE DES PNJ:\n` +
    `  Chaque PNJ ne connait QUE ce qui est logique pour son role:\n` +
    `  - TAVERNIER: Rumeurs locales, clients reguliers, prix des boissons. PAS de secrets militaires.\n` +
    `  - MARCHAND: Son commerce, prix, fournisseurs. PAS d'histoire ancienne detaillee.\n` +
    `  - NOBLE: Politique, lignees, intrigues de cour. PAS de magie profonde.\n` +
    `  - ERUDIT/MAGE: Histoire, magie, artefacts. PAS de potins de rue.\n` +
    `  - PAYSAN: Sa region immediate, saisons, recoltes. PAS de grands evenements lointains.\n` +
    `  - CRIMINEL: Bas-fonds, contrebande, contacts. PAS de theologie.\n` +
    `  Si un joueur pose une question hors du champ de competence du PNJ:\n` +
    `  Reponse: "Ca me depasse" / "Demandez a quelqu'un de plus savant" / "J'suis [metier], pas erudit."`,
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
  "challenge": null,
  "unlock": [],
  "stats": {},
  "item": null,
  "merchant": null,
  "loot": null,
  "transaction": null,
  "world_event": null
}

STRUCTURE COMBAT (si hostile):
"combat": { "enemies": [{ "name": "Gobelin", "hp": 15, "atk": 4, "ac": 12, "id": "e1" }], "reason": "...", "trigger": true }

STRUCTURE CHALLENGE (pour jets de des sociaux - UTILISE SOUVENT):
"challenge": {
  "type": "negotiation/intimidation/persuasion/deception/insight/investigation/stealth",
  "stat": "cha/str/wis/int/dex",
  "dc": 12,
  "description": "Jet de Charisme DD 12 pour negocier un meilleur prix",
  "success_hint": "Le marchand baisse ses prix de 20%",
  "failure_hint": "Le marchand refuse de negocier",
  "critical_success": "Prix -50%, item bonus offert",
  "critical_failure": "Le marchand est offense et double ses prix"
}
UTILISE "challenge" quand le joueur tente: negocier, intimider, convaincre, mentir, detecter un mensonge, chercher des indices, se cacher.

STRUCTURE MARCHAND (si interaction commerciale):
"merchant": {
  "npcName": "Nom du marchand",
  "greeting": "Phrase d'accueil roleplay",
  "inventory": [
    { "id": "item1", "name": "Nom", "desc": "Description", "price": 50, "type": "weapon/armor/consumable/misc", "category": "simple/martial/light/medium/heavy", "slot": "mainhand/chest/head/ring/none", "rarity": "commun/peu commun/rare", "stats": { "atk": 2 } }
  ]
}

EQUILIBRAGE MARCHAND (OBLIGATOIRE):
- Niveau 1-3: Items communs, prix 10-100 or. Stats: +1 a +2 max. Potions basiques.
- Niveau 4-6: Items peu communs, prix 50-300 or. Stats: +2 a +3.
- Niveau 7-10: Items rares, prix 200-800 or. Stats: +3 a +5.
- Niveau 11+: Items tres rares, prix 500-2000 or. Stats: +4 a +6.
- TOUJOURS inclure: 2-3 armes, 1-2 armures, 2-4 consommables (potions de soin, antidotes).
- Les prix doivent etre ACCESSIBLES au niveau du joueur (gold moyen = niveau * 100).`;

// ─── MERCHANT ITEM TABLES ────────────────────────────────────────────

function generateMerchantItems(avgLevel: number): any[] {
    const items: any[] = [];
    
    // Base items scaled to level
    const tier = avgLevel <= 3 ? 1 : avgLevel <= 6 ? 2 : avgLevel <= 10 ? 3 : 4;
    const priceMultiplier = tier;
    
    // Weapons
    const weapons = [
        { tier: 1, name: "Dague en fer", desc: "Une dague simple mais efficace.", price: 15, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 1 } },
        { tier: 1, name: "Epee courte", desc: "Une lame equilibree pour les debutants.", price: 35, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2 } },
        { tier: 1, name: "Baton de marche", desc: "Un baton robuste, utile en combat.", price: 10, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 1, wis: 1 } },
        { tier: 2, name: "Epee longue", desc: "Une lame de qualite, forgee par un artisan.", price: 120, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3 } },
        { tier: 2, name: "Arc de chasse", desc: "Un arc fiable pour la chasse et le combat.", price: 80, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2, dex: 1 } },
        { tier: 3, name: "Lame d'acier elfique", desc: "Une epee fine aux reflets argentes.", price: 350, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 4, dex: 1 } },
        { tier: 3, name: "Marteau de guerre", desc: "Une arme devastatrice pour les guerriers.", price: 400, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 5 } },
        { tier: 4, name: "Lame runique", desc: "Gravee de runes anciennes qui luisent faiblement.", price: 800, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 6, int: 2 } },
    ];
    
    // Armors
    const armors = [
        { tier: 1, name: "Tunique renforcee", desc: "Une tunique avec des plaques de cuir.", price: 25, type: "armor", category: "light", slot: "chest", stats: { ac: 1 } },
        { tier: 1, name: "Armure de cuir", desc: "Protection basique mais fiable.", price: 45, type: "armor", category: "light", slot: "chest", stats: { ac: 2 } },
        { tier: 2, name: "Cotte de mailles legere", desc: "Mailles fines offrant bonne protection.", price: 150, type: "armor", category: "medium", slot: "chest", stats: { ac: 3 } },
        { tier: 2, name: "Plastron de cuir cloute", desc: "Cuir renforce de clous metalliques.", price: 180, type: "armor", category: "medium", slot: "chest", stats: { ac: 3, con: 1 } },
        { tier: 3, name: "Harnois leger", desc: "Armure de plates bien ajustee.", price: 450, type: "armor", category: "heavy", slot: "chest", stats: { ac: 5 } },
        { tier: 4, name: "Armure de plates ouvragee", desc: "Chef-d'oeuvre de forgerons nains.", price: 1200, type: "armor", category: "heavy", slot: "chest", stats: { ac: 6, con: 2 } },
    ];
    
    // Shields
    const shields = [
        { tier: 1, name: "Bouclier en bois", desc: "Un bouclier simple mais solide.", price: 20, type: "shield", category: "shield", slot: "offhand", stats: { ac: 1 } },
        { tier: 2, name: "Bouclier cercle de fer", desc: "Bouclier renforce de metal.", price: 80, type: "shield", category: "shield", slot: "offhand", stats: { ac: 2 } },
        { tier: 3, name: "Ecu de chevalier", desc: "Un bouclier orne d'armoiries.", price: 250, type: "shield", category: "shield", slot: "offhand", stats: { ac: 3 } },
    ];
    
    // Consumables
    const consumables = [
        { tier: 1, name: "Potion de soin mineure", desc: "Restaure 2d4+2 PV.", price: 25, type: "consumable", slot: "none", stats: {}, effect: "heal", healDice: "2d4+2" },
        { tier: 1, name: "Antidote", desc: "Guerit les poisons mineurs.", price: 30, type: "consumable", slot: "none", stats: {}, effect: "cure_poison" },
        { tier: 1, name: "Ration de voyage", desc: "Nourriture pour une journee.", price: 5, type: "consumable", slot: "none", stats: {} },
        { tier: 2, name: "Potion de soin", desc: "Restaure 4d4+4 PV.", price: 75, type: "consumable", slot: "none", stats: {}, effect: "heal", healDice: "4d4+4" },
        { tier: 2, name: "Potion d'energie", desc: "Restaure 20 points de ressource.", price: 60, type: "consumable", slot: "none", stats: {}, effect: "restore_resource" },
        { tier: 3, name: "Potion de soin superieure", desc: "Restaure 8d4+8 PV.", price: 200, type: "consumable", slot: "none", stats: {}, effect: "heal", healDice: "8d4+8" },
        { tier: 3, name: "Elixir de force", desc: "+2 FOR pendant 1 heure.", price: 150, type: "consumable", slot: "none", stats: { str: 2 }, effect: "buff_temp" },
        { tier: 4, name: "Potion de soin supreme", desc: "Restaure 10d4+20 PV.", price: 500, type: "consumable", slot: "none", stats: {}, effect: "heal", healDice: "10d4+20" },
    ];
    
    // Accessories
    const accessories = [
        { tier: 2, name: "Anneau de protection", desc: "Un anneau qui renforce les defenses.", price: 100, type: "ring", slot: "ring", stats: { ac: 1 } },
        { tier: 2, name: "Amulette de vitalite", desc: "Augmente la resistance.", price: 120, type: "amulet", slot: "neck", stats: { con: 1 } },
        { tier: 3, name: "Cape de l'ombre", desc: "Aide a se fondre dans l'obscurite.", price: 300, type: "cloak", slot: "back", stats: { dex: 2 } },
        { tier: 4, name: "Anneau de puissance", desc: "Renforce les attaques magiques.", price: 600, type: "ring", slot: "ring", stats: { int: 3 } },
    ];
    
    // Select items based on tier
    const selectItems = (arr: any[], count: number) => {
        const available = arr.filter(i => i.tier <= tier);
        const selected: any[] = [];
        for (let i = 0; i < count && available.length > 0; i++) {
            const idx = Math.floor(Math.random() * available.length);
            const item = { ...available[idx], id: `item_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 5)}`, rarity: available[idx].tier <= 1 ? "commun" : available[idx].tier <= 2 ? "peu commun" : "rare" };
            selected.push(item);
            available.splice(idx, 1);
        }
        return selected;
    };
    
    items.push(...selectItems(weapons, 2 + Math.floor(Math.random() * 2)));
    items.push(...selectItems(armors, 1 + Math.floor(Math.random() * 2)));
    items.push(...selectItems(shields, 1));
    items.push(...selectItems(consumables, 3 + Math.floor(Math.random() * 2)));
    if (tier >= 2) items.push(...selectItems(accessories, 1 + Math.floor(Math.random() * 2)));
    
    return items;
}

// ─── PROMPT BUILDER ──────────────────────────────────────────────────

function buildSystemPrompt(opts: {
    gamePhase: string;
    timeLabel: string;
    partyList: string;
    playerInfo: string;
    context: string;
    lore: any;
    historyStr: string;
    partyDetails?: any[];
    playerBackstoryContext?: string;
}): string {
    const { gamePhase, timeLabel, partyList, playerInfo, context, lore, historyStr, partyDetails, playerBackstoryContext } = opts;

    const sections: string[] = [];

    // Identity
    sections.push(
        `TU ES LE MAITRE DU JEU (MJ) d'un RPG Dark Fantasy "Miroir des Ombres".`,
        `TON BUT: Simuler un monde coherent, dangereux et reactif. NE SOIS PAS COMPLAISANT.`,
        `PHASE ACTUELLE: ${gamePhase} | HEURE: ${timeLabel}`,
    );

    // CRITICAL: Clear distinction between Players and NPCs
    sections.push(`\n=== JOUEURS REELS (PAS DES PNJ) ===`);
    sections.push(`IMPORTANT: Les personnages suivants sont des JOUEURS HUMAINS REELS qui jouent ensemble en EQUIPE.`);
    sections.push(`Ils ne sont PAS des PNJ. Tu dois les traiter comme une equipe cooperative.`);
    sections.push(`Quand tu t'adresses au groupe, utilise VOUS (pluriel) et inclus TOUS les joueurs.`);
    
    if (partyDetails && partyDetails.length > 0) {
        partyDetails.forEach((p: any, idx: number) => {
            const spellList = (p.spells || []).map((s: any) => typeof s === 'string' ? s : s.name).join(', ');
            sections.push(`  JOUEUR ${idx + 1}: ${p.name} | Classe: ${p.class} | Niveau: ${p.level || 1} | Aptitudes: [${spellList || 'Aucune'}]`);
        });
    } else {
        sections.push(`GROUPE: ${partyList}`);
    }
    
    sections.push(`\nREGLE EQUIPE: Ces joueurs COOPERENT. En combat, ils combattent ENSEMBLE contre les ennemis.`);
    sections.push(`Si un joueur attaque, les autres peuvent aussi participer. Ne les mets JAMAIS en opposition.`);

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

    // Player backstory context (enriched)
    if (playerBackstoryContext) {
        sections.push(`\n=== BACKSTORY DU JOUEUR ACTIF (A EXPLOITER EN JEU) ===`);
        sections.push(playerBackstoryContext);
        sections.push(`\nUTILISATION BACKSTORY:`);
        sections.push(`- Les PNJ connus peuvent reconnaitre le joueur et reagir a son passe`);
        sections.push(`- Les factions ennemies peuvent envoyer des agents ou creer des obstacles`);
        sections.push(`- Les hooks de roleplay sont des opportunites de quetes secondaires`);
        sections.push(`- Les secrets personnels peuvent etre reveles progressivement`);
        sections.push(`- La reputation de depart influence les interactions sociales`);
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
        let playerBackstoryContext = "";
        if (playerId) {
            const { data: p } = await supabase
                .from('players')
                .select('name, class, level, gold, spells, inventory, backstory, backstory_gm_context, starting_reputation, known_npcs, faction_ties')
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
                    `ORIGIN: ${p.backstory?.label || "Inconnu"}`,
                ].join(' | ');
                
                if (p.backstory_gm_context) {
                    playerBackstoryContext = p.backstory_gm_context;
                }
            }
        }

        // ── Fetch party with full details including spells ──
        const { data: party } = await supabase
            .from('players')
            .select('name, class, backstory, level, spells, abilities')
            .eq('session_id', sessionId);

        const partyList = (party || [])
            .map((p: any) => `${p.name} (${p.class}) [${p.backstory?.label || "?"}]`)
            .join(' | ') || "Aucun";

        // Detailed party info for proper player recognition
        const partyDetails = (party || []).map((p: any) => ({
            name: p.name,
            class: p.class,
            level: p.level || 1,
            spells: p.spells || [],
            abilities: p.abilities || []
        }));

        // ── Build history string ──
        const historyStr = history.length > 0
            ? history.map((m: any) => `${m.role}: ${m.content}`).join('\n')
            : "Aucun";

        // ── Build system prompt ──
        const prompt = buildSystemPrompt({
            gamePhase, timeLabel, partyList, playerInfo, context, lore, historyStr, partyDetails, playerBackstoryContext,
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

        // ── Inject balanced merchant inventory if merchant is present ──
        if (result.merchant && (!result.merchant.inventory || result.merchant.inventory.length === 0)) {
            const avgLevel = partyDetails.length > 0 
                ? Math.round(partyDetails.reduce((sum: number, p: any) => sum + (p.level || 1), 0) / partyDetails.length)
                : 1;
            result.merchant.inventory = generateMerchantItems(avgLevel);
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
