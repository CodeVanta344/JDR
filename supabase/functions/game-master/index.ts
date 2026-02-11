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
    `ANTI GOD-MODE (REGLE CRITIQUE - TOUJOURS APPLIQUER):\n` +
    `  LE JOUEUR NE DECIDE JAMAIS DU RESULTAT, SEULEMENT DE SON INTENTION.\n` +
    `  \n` +
    `  EXEMPLES DE GOD-MODE (INTERDITS):\n` +
    `  ✗ "Je le tue" -> Le joueur decide du resultat. TOI seul decides si l'ennemi meurt.\n` +
    `  ✗ "Je rentre dans l'arene" -> Le joueur decide qu'il reussit. TOI decides s'il peut entrer.\n` +
    `  ✗ "Je convaincs le marchand" -> Le joueur decide du succes. TOI demands un jet de des.\n` +
    `  ✗ "Je trouve la sortie" -> Le joueur decide de la reussite. TOI demands un jet de Perception.\n` +
    `  ✗ "Je l'assomme" -> Le joueur decide du resultat. TOI decris si ca marche ou non.\n` +
    `  \n` +
    `  REPONSES CORRECTES A CES TENTATIVES:\n` +
    `  ✓ "Je le tue" -> "Vous tentez de frapper pour achever l'ennemi. Lancez un jet d'Attaque DD 15."\n` +
    `  ✓ "Je rentre dans l'arene" -> "Vous tentez d'entrer, mais un garde vous barre le chemin: 'L'inscription est fermee.'"\n` +
    `  ✓ "Je convaincs le marchand" -> "Vous tentez de le persuader. Lancez un jet de Charisme DD 14."\n` +
    `  ✓ "Je trouve la sortie" -> "Vous cherchez une sortie. Lancez un jet de Perception DD 12."\n` +
    `  ✓ "Je l'assomme" -> "Vous tentez de l'assommer par surprise. Le succes depend de votre discretion. [lance un combat ou un jet]"\n` +
    `  \n` +
    `  REGLE ABSOLUE: Si le joueur utilise un verbe d'action qui implique un RESULTAT (tuer, convaincre, trouver, reussir, entrer, etc.),\n` +
    `  TU DOIS le transformer en TENTATIVE et demander un jet de des OU decider du resultat toi-meme en fonction de la logique du monde.`,

    // 4. Time & dynamism
    `TEMPS & DYNAMISME: Le monde AVANCE. Si les joueurs attendent/dorment, quelque chose DOIT se passer (embuscade, reve, meteo, decouverte). NE BOUCLE PAS SUR LA MEME DESCRIPTION.`,

    // 4b. NO REPETITION (CRITICAL)
    `INTERDICTION DE REPETITION (REGLE CRITIQUE):\n` +
    `  Si tu viens de decrire une scene ou situation, NE LA REDIS PAS.\n` +
    `  EXEMPLES D'ERREURS A EVITER:\n` +
    `  ✗ Decrire 2 fois la meme attaque du joueur\n` +
    `  ✗ Repeter la reaction d'un PNJ deja decrite\n` +
    `  ✗ Re-expliquer une situation deja claire\n` +
    `  \n` +
    `  REGLE: Chaque narration doit FAIRE AVANCER la scene.\n` +
    `  - Si le joueur a declare une action, decris le RESULTAT, pas l'action elle-meme\n` +
    `  - Si le combat est initie, DECLENCHE-LE immediatement avec "combat", ne le re-decris pas\n` +
    `  - Si une question a ete posee, REPONDS directement, ne re-contextualise pas`,

    // 5. Language
    `LANGUE: TOUJOURS repondre en FRANCAIS.`,

    // 5b. PARTY AWARENESS (CRITICAL - ALWAYS APPLY)
    `CONSCIENCE DU GROUPE (REGLE CRITIQUE - OBLIGATOIRE):\n` +
    `  TU DOIS TOUJOURS te souvenir que c'est un JEU DE GROUPE avec PLUSIEURS JOUEURS.\n` +
    `  REGLES ABSOLUES:\n` +
    `  1. UTILISE LE PLURIEL: "Vous vous elancez", "Vos epees brillent", "Vous entendez" (JAMAIS "Tu")\n` +
    `  2. NOMME LES JOUEURS: Quand un joueur agit, CITE SON NOM: "Jacquille s'elance vers la cible"\n` +
    `  3. INCLUS TOUT LE GROUPE: Apres l'action d'un joueur, mentionne les autres: "Pendant que Jacquille attaque, le reste du groupe observe"\n` +
    `  4. REPARTIS L'ATTENTION: Ne te concentre pas QUE sur celui qui parle. Les autres existent aussi.\n` +
    `  5. QUESTIONS COLLECTIVES: "Que faites-vous TOUS ?", "Comment le groupe reagit-il ?"\n` +
    `  \n` +
    `  EXEMPLES CORRECTS:\n` +
    `  ✓ "Jacquille bondit vers l'avant, son epee levee. Le reste du groupe se tient pret, armes degainees. Que faites-vous ?"\n` +
    `  ✓ "Pendant que Loic examine la porte, Jacquille surveille les ombres. Vous entendez un bruit..."\n` +
    `  ✓ "Vos regards se croisent. L'ennemi est encercle. Qui frappe en premier ?"\n` +
    `  \n` +
    `  EXEMPLES INCORRECTS:\n` +
    `  ✗ "Tu t'elances vers la cible" (utilise le singulier)\n` +
    `  ✗ "Vous vous elancez" sans nommer qui (ne precise pas qui agit)\n` +
    `  ✗ "Que fais-tu ?" (ignore les autres joueurs)\n` +
    `  \n` +
    `  CONTEXTE: Tu as acces a playerGroup qui contient TOUS les joueurs et leurs classes. UTILISE CETTE INFO.`,

    // 6. Immersion
    `IMMERSION: Termine TOUJOURS ta narration par une question ou une proposition d'action pour engager les joueurs.`,

    // 7. Progression
    `PROGRESSION: Si les joueurs tournent en rond, donne un INDICE EVIDENT ou DECLENCHE UN EVENEMENT (bruit, lueur, PNJ).`,

    // 8. Stagnation recovery
    `RECUPERATION DE STAGNATION (Context: GM_STAGNATION_RECOVERY): Si ce contexte est actif, DECLENCHE UN INCIDENT immediat (cri, attaque, PNJ). Force les joueurs a REAGIR.`,

    // 9. COMBAT TRIGGER (CRITICAL - ALWAYS APPLY)
    `🚨🚨🚨 DECLENCHEMENT DE COMBAT - REGLE ABSOLUE - NE JAMAIS IGNORER 🚨🚨🚨\n` +
    `  \n` +
    `  EXEMPLE CONCRET (CE QUI DOIT SE PASSER):\n` +
    `  Joueur dit: "nous attaquons"\n` +
    `  TON OBLIGATION IMMEDIATE: Inclure "combat": { "enemies": [...], "trigger": true } dans ta reponse JSON\n` +
    `  \n` +
    `  Joueur dit: "j'engage le combat"\n` +
    `  TON OBLIGATION IMMEDIATE: Inclure "combat": { "enemies": [...], "trigger": true } dans ta reponse JSON\n` +
    `  \n` +
    `  Joueur dit: "je veux me battre"\n` +
    `  TON OBLIGATION IMMEDIATE: Inclure "combat": { "enemies": [...], "trigger": true } dans ta reponse JSON\n` +
    `  \n` +
    `  SI TU DECRIS UNE SCENE DE TENSION/VIOLENCE SANS ENVOYER "combat", TU AS ECHOUE.\n` +
    `  \n` +
    `  ⚠️ MOTS-CLES DE DECLENCHEMENT INSTANTANE ⚠️\n` +
    `  CES MOTS SEULS OU DANS UNE PHRASE = COMBAT OBLIGATOIRE IMMEDIATEMENT:\n` +
    `  \n` +
    `  VARIANTES "ATTAQUER":\n` +
    `  - "attaque" / "attaquer" / "attaquons" / "j'attaque" / "nous attaquons" / "on attaque"\n` +
    `  \n` +
    `  VARIANTES "COMBAT":\n` +
    `  - "combat" / "le combat" / "un combat" / "en combat" / "au combat"\n` +
    `  - "engager le combat" / "engage le combat" / "engagement" / "j'engage le combat"\n` +
    `  - "initier le combat" / "initie le combat" / "on initie le combat"\n` +
    `  - "commencer le combat" / "commence le combat" / "lancer le combat"\n` +
    `  \n` +
    `  AUTRES DECLENCHEURS:\n` +
    `  - "frapper" / "frapons" / "je frappe" / "nous frappons"\n` +
    `  - "degainer" / "sortir mon arme" / "degaine"\n` +
    `  - "lancer un sort offensif" / "sort d'attaque"\n` +
    `  - "charger" / "foncer sur" / "charge"\n` +
    `  - "se battre" / "me battre" / "battre" / "nous battre"\n` +
    `  - "entrer dans l'arene" / "rentrer dans l'arene" / "aller dans l'arene" / "arene"\n` +
    `  - "participer au tournoi" / "tournoi" / "s'inscrire au combat"\n` +
    `  - "accepter le duel" / "duel"\n` +
    `  \n` +
    `  ⚠️⚠️⚠️ REGLE ABSOLUE ⚠️⚠️⚠️\n` +
    `  Si tu detectes UN SEUL de ces mots dans le message du joueur, tu DOIS inclure "combat" dans ta reponse JSON.\n` +
    `  PAS D'EXCEPTION. PAS DE NARRATION SANS "combat".\n` +
    `  \n` +
    `  🏛️ EXCEPTION ARENES/TOURNOIS/DUELS (TRES IMPORTANT):\n` +
    `  Si le joueur demande a entrer dans une ARENE, un TOURNOI, ou accepte un DUEL,\n` +
    `  TU NE DOIS PAS JUSTE DECRIRE LA SCENE. TU DOIS DECLENCHER LE COMBAT IMMEDIATEMENT.\n` +
    `  Exemple: "Je rentre dans l'arene" -> Cree 1-3 ennemis (gladiateurs/combattants niveau approprie) et envoie "combat": { "trigger": true }.\n` +
    `  NE DEMANDE PAS de jet de des pour entrer. LANCE DIRECTEMENT LE COMBAT.\n` +
    `  \n` +
    `  COMMENT CREER LES ENNEMIS:\n` +
    `  1. LIS L'HISTORIQUE: Qui est present dans la scene ?\n` +
    `  2. ANALYSE LA NARRATION: As-tu mentionne "tavernier", "clients", "gardes", "voyageurs" ?\n` +
    `  3. CREE DES ENNEMIS CORRESPONDANTS:\n` +
    `     - Si tu as dit "Le tavernier se prepare a se defendre" -> Ennemi: "Tavernier Robuste"\n` +
    `     - Si tu as dit "Les clients se figent" -> Ennemis: "Client de taverne 1", "Client de taverne 2"\n` +
    `     - Si tu as dit "Des hommes armés les entourent" -> Ennemis: "Bandit 1", "Bandit 2", "Bandit 3"\n` +
    `  4. SCALE LA DIFFICULTE: Niveau moyen des joueurs = difficulte des ennemis\n` +
    `  \n` +
    `  TU DOIS TOUJOURS inclure le champ "combat" dans ta reponse JSON dans ces situations:\n` +
    `  1. ENNEMIS HOSTILES APPARAISSENT (monstres, bandits, creatures)\n` +
    `  2. JOUEURS INITIENT L'HOSTILITE (menaces, attaques, intimidation aggressive)\n` +
    `  3. PNJ DEVIENNENT HOSTILES (marchands attaques, gardes provoques, civils menaces)\n` +
    `  \n` +
    `  DETECTION D'HOSTILITE JOUEUR:\n` +
    `  - Phrases comme "J'attaque", "Je le menace", "Je degaine mon arme", "Je frappe"\n` +
    `  - Tentatives d'intimidation avec arme/violence\n` +
    `  - Vol avec confrontation\n` +
    `  - Toute action provocant une riposte physique\n` +
    `  - TOUTE phrase contenant les mots-cles ci-dessus\n` +
    `  \n` +
    `  STRUCTURE OBLIGATOIRE:\n` +
    `  "combat": {\n` +
    `    "enemies": [\n` +
    `      { "name": "Gobelin Eclaireur", "hp": 15, "max_hp": 15, "atk": 4, "ac": 12, "id": "e1", "cr": 1 },\n` +
    `      { "name": "Marchand Effraie", "hp": 22, "max_hp": 22, "atk": 3, "ac": 11, "id": "e2", "cr": 0.125 }\n` +
    `    ],\n` +
    `    "reason": "Le marchand degaine un couteau et appelle les gardes!",\n` +
    `    "trigger": true\n` +
    `  }\n` +
    `  \n` +
    `  COHERENCE DES ENNEMIS:\n` +
    `  - Analyse le CONTEXTE de la conversation pour determiner qui/combien d'ennemis\n` +
    `  - Si le joueur parle a UN marchand seul, cree 1 ennemi "Marchand"\n` +
    `  - Si les joueurs sont dans une taverne, ajoute "Clients de la taverne" (2-3 ennemis)\n` +
    `  - Si c'est une embuscade decrite plus tot, utilise le nombre mentionne\n` +
    `  - Si un PNJ a ete decrit comme "entoure de gardes", ajoute 2-4 Gardes\n` +
    `  \n` +
    `  EXEMPLES DE STATS PAR TYPE:\n` +
    `  MONSTRES:\n` +
    `  - Gobelin (HP: 7-15, ATK: 3-5, AC: 13-15, CR: 0.25-1)\n` +
    `  - Loup (HP: 11, ATK: 5, AC: 13, CR: 0.25)\n` +
    `  - Squelette (HP: 13, ATK: 5, AC: 13, CR: 0.25)\n` +
    `  - Ogre (HP: 59, ATK: 8, AC: 11, CR: 2)\n` +
    `  \n` +
    `  HUMANOIDES:\n` +
    `  - Bandit (HP: 11, ATK: 5, AC: 12, CR: 0.125)\n` +
    `  - Garde (HP: 16, ATK: 6, AC: 16, CR: 0.5)\n` +
    `  - Marchand (HP: 18-22, ATK: 3, AC: 10-11, CR: 0.125)\n` +
    `  - Civil Enrage (HP: 8-10, ATK: 2, AC: 10, CR: 0)\n` +
    `  \n` +
    `  IMPORTANT:\n` +
    `  - Utilise le BESTIAIRE fourni dans le lore pour les stats exactes\n` +
    `  - Adapte le nombre d'ennemis au niveau du groupe ET au contexte narratif\n` +
    `  - TOUJOURS mettre "trigger": true pour lancer le combat\n` +
    `  - Si tu decris un combat dans la narrative, TU DOIS envoyer "combat"\n` +
    `  - Les PNJ non-combattants (marchands, civils) ont des stats FAIBLES\n` +
    `  - LE JOUEUR PEUT SE BATTRE AVEC N'IMPORTE QUI: marchand, tavernier, voyageur, garde, animal, etc.\n` +
    `  - SI LE JOUEUR VEUT COMBATTRE, CREE IMMEDIATEMENT DES ENNEMIS a partir de qui est present dans ta narration\n` +
    `  \n` +
    `  EXEMPLE COMPLET D'UNE REPONSE DE COMBAT CORRECTE:\n` +
    `  Joueur: "nous attaquons"\n` +
    `  Ta reponse JSON DOIT contenir:\n` +
    `  {\n` +
    `    "narrative": "Vous degainez vos armes ! Le tavernier hurle et degaine un gourdin. Les clients paniques se levent, certains fuient, d'autres sortent des couteaux. Le combat eclate !",\n` +
    `    "combat": {\n` +
    `      "enemies": [\n` +
    `        { "name": "Tavernier en Colere", "hp": 28, "max_hp": 28, "atk": 6, "ac": 13, "id": "e1", "cr": 0.5 },\n` +
    `        { "name": "Client Arme 1", "hp": 12, "max_hp": 12, "atk": 4, "ac": 11, "id": "e2", "cr": 0.125 },\n` +
    `        { "name": "Client Arme 2", "hp": 10, "max_hp": 10, "atk": 3, "ac": 10, "id": "e3", "cr": 0.125 }\n` +
    `      ],\n` +
    `      "reason": "Vous avez provoque une bagarre generale dans la taverne !",\n` +
    `      "trigger": true\n` +
    `    },\n` +
    `    "new_context": "Combat dans la taverne"\n` +
    `  }`,

    // 10. Equipment affinity
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

    // 17. LIVING WORLD - DYNAMIC EVENTS
    `MONDE VIVANT - EVENEMENTS DYNAMIQUES (IMPORTANT):\n` +
    `  Le monde VIT autour des joueurs. Ils ne sont PAS le centre de l'univers.\n` +
    `  \n` +
    `  INTERRUPTIONS CONTEXTUELLES (utiliser avec PARCIMONIE - 1 fois toutes les 3-5 interactions max):\n` +
    `  - Un PNJ peut etre interrompu par un autre client, un cri dehors, un accident\n` +
    `  - Une conversation peut etre coupee par l'arrivee d'une patrouille de gardes\n` +
    `  - Un marchand peut avoir une urgence (livraison, vol, client difficile)\n` +
    `  - Le temps change (orage soudain, nuit qui tombe, brouillard)\n` +
    `  \n` +
    `  EVENEMENTS DE FOND (a decrire regulierement):\n` +
    `  - Autres clients dans la taverne qui discutent, rient, se disputent\n` +
    `  - Passants dans la rue, charrettes, animaux, enfants\n` +
    `  - Bruits ambiants: cloches d'eglise, marteau de forgeron, cris de marche\n` +
    `  - Reactions des PNJ aux actions des joueurs (regards curieux, murmures)\n` +
    `  \n` +
    `  CONDITIONS POUR DECLENCHER UNE INTERRUPTION:\n` +
    `  1. Le contexte le justifie (lieu public, moment tendu)\n` +
    `  2. Ca n'empeche pas les joueurs d'agir (ils peuvent reagir ou ignorer)\n` +
    `  3. Ca ajoute de l'immersion sans frustrer\n` +
    `  \n` +
    `  EXEMPLES D'INTERRUPTIONS PAR LIEU:\n` +
    `  - TAVERNE: Bagarre entre ivrognes, barde qui commence a jouer, garde qui cherche quelqu'un\n` +
    `  - MARCHE: Vol a la tire devant les joueurs, marchand qui crie au voleur, chariot qui renverse des caisses\n` +
    `  - RUE: Procession religieuse qui bloque le passage, mendiant insistant, noble arrogant qui bouscule\n` +
    `  - FORET: Animal qui traverse, bruit de combat au loin, decouverte d'un campement abandonne\n` +
    `  - NUIT: Patrouille de gardes, cri dans une ruelle, lumiere mysterieuse\n` +
    `  \n` +
    `  REGLE D'OR: Les interruptions doivent etre des OPPORTUNITES, pas des OBSTACLES. Elles peuvent mener a des quetes, des infos, ou juste de l'ambiance.`,

    // 18. WORLD ACTIVITY BASED ON TIME
    `ACTIVITE DU MONDE SELON L'HEURE (timeOfDay):\n` +
    `  AUBE (05h-08h): Marchands qui ouvrent, odeur de pain frais, peu de monde\n` +
    `  MATIN (08h-12h): Activite croissante, marche anime, gardes vigilants\n` +
    `  REPAS (12h-14h): Pause repas, tavernes pleines, moins de gardes\n` +
    `  APRES-MIDI (14h-18h): Commerce intense, artisans au travail, enfants dans les rues\n` +
    `  SOIR (18h-21h): Retour des travailleurs, tavernes qui se remplissent, eclairage des lanternes\n` +
    `  NUIT (21h-05h): Rues desertes, gardes patrouillent, activites illicites, danger accru\n` +
    `  \n` +
    `  INTEGRE ces elements dans CHAQUE description de scene.`,

    // 19. ORIGIN & BACKSTORY REACTIVITY (NON-NEGOTIABLE)
    `REACTIVITE DES ORIGINES (IMPORTANT):\n` +
    `  L'origine de CHAQUE personnage DOIT avoir une incidence visible sur le jeu.\n` +
    `  - INTERACTIONS PNJ: Les PNJ reagissent Differemment selon l'origine du joueur (ex: mepris pour un Paria, respect pour un Noble, fraternite pour un ancien soldat).\n` +
    `  - AVANTAGES/PENALITES: Applique STRICTEMENT les avantages/penalites sociaux (ex: un Noble a des contacts, un Criminel est surveille). Verifie le champ backstory.social_class.social_perks/penalties.\n` +
    `  - SECRETS: Les joueurs peuvent connaitre des secrets lies a leur faction (backstory.faction_ties.secrets_known). Utilise ces secrets pour donner des options de dialogue uniques.\n` +
    `  - LIEUX: Si un joueur visite sa region d'origine, il connait les lieux, les raccourcis et les gens. Les PNJ peuvent le reconnaitre.\n` +
    `  - ECONOMIE: Ajuste les prix des marchands selon la reputation et la classe sociale du joueur.\n` +
    `  - NARRATION: Utilise les 'Hooks de Roleplay' pour personnaliser les quetes et les rencontres.`,
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

STRUCTURE TRANSACTION (pour paiements/recompenses - APRES validation):
"transaction": {
  "amount": 50,
  "type": "loss",
  "reason": "Achat d'une epee longue",
  "itemName": "Epee longue",
  "originalPrice": 60,
  "negotiated": true
}
REGLES TRANSACTION (CRITIQUES):
1. NE PAS envoyer de transaction si le joueur NEGOCIE - d'abord challenge, puis transaction apres resultat.
2. "amount" DOIT TOUJOURS etre un NOMBRE (jamais vide, null, ou string).
3. "type": "loss" = le joueur PAIE, "gain" = le joueur RECOIT.
4. Si negociation REUSSIE: "originalPrice" = prix initial, "amount" = prix reduit, "negotiated": true.
5. Si negociation ECHOUEE: "amount" = prix initial (ou double si echec critique), "negotiated": false.
6. TOUJOURS inclure "reason" pour expliquer la transaction.
7. TOUJOURS inclure "itemName" si c'est un achat.

STRUCTURE CODEX_UPDATE (pour enrichir le journal du joueur - UTILISE SOUVENT):
"codex_update": {
  "new_npc": { "name": "Eldric le Forgeron", "role": "Forgeron de Hammerdeep" },
  "new_location": { "name": "La Forge de Givre", "region": "Cote des Orages" },
  "new_quest": { "name": "L'Epee Perdue", "description": "Retrouver l'epee du Commandeur" },
  "new_secret": "Le forgeron cache un passage secret vers les mines",
  "new_event": "Vous avez survecu a l'embuscade des gobelins"
}
REGLES CODEX_UPDATE (IMPORTANT - GUIDE LE JOUEUR):
1. AJOUTER "new_npc" a CHAQUE nouveau PNJ important rencontre (nom + role)
2. AJOUTER "new_location" a CHAQUE nouveau lieu decouvert (nom + region)
3. AJOUTER "new_quest" quand le joueur recoit une mission ou objectif
4. AJOUTER "new_secret" quand le joueur decouvre une information importante
5. AJOUTER "new_event" pour les moments marquants (combats epiques, trahisons, decouvertes)
6. Le codex GUIDE le joueur - il doit savoir ou aller et quoi faire
7. NE PAS ajouter d'entrees triviales (ex: "garde lambda" ou "ruelle quelconque")

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

        // --- IDEMPOTENCY CHECK FOR ADVENTURE START ---
        if (action === "START_ADVENTURE") {
            const { data: existingMsgs } = await supabase
                .from('messages')
                .select('content')
                .eq('session_id', sessionId)
                .in('role', ['system', 'assistant'])
                .order('created_at', { ascending: false })
                .limit(10);

            // Filter for large narratives that look like intros
            const actualIntro = (existingMsgs || []).find((m: any) =>
                m.content && m.content.length > 200 && !m.content.includes('(MÉMOIRE:')
            );

            if (actualIntro) {
                console.log("Adventure already started for this session. Returning existing intro.");
                return jsonResponse({ narrative: actualIntro.content, skipped: true });
            }
        }

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

        // ── FORCE COMBAT DETECTION (failsafe if GM ignores rules) ──
        const combatKeywords = [
            'attaque', 'attaquer', 'attaquons', 'j\'attaque', 'nous attaquons', 'on attaque',
            'combat', 'le combat', 'engager le combat', 'initier le combat', 'lancer le combat',
            'frapper', 'frappe', 'frappons',
            'battre', 'se battre', 'me battre', 'nous battre',
            'arene', 'arène', 'tournoi', 'duel',
            'charger', 'charge', 'foncer'
        ];
        const actionLower = action.toLowerCase();
        const hasCombatKeyword = combatKeywords.some(kw => actionLower.includes(kw));

        // If player used combat keyword but GM didn't send combat, FORCE IT
        if (hasCombatKeyword && (!result.combat || !result.combat.trigger)) {
            const avgLevel = partyDetails.length > 0
                ? Math.round(partyDetails.reduce((sum: number, p: any) => sum + (p.level || 1), 0) / partyDetails.length)
                : 1;

            // Generate appropriate enemies based on context
            const isArena = actionLower.includes('arene') || actionLower.includes('arène') || actionLower.includes('tournoi');
            const isTavern = (result.narrative || '').toLowerCase().includes('tavern') ||
                (result.narrative || '').toLowerCase().includes('auberge') ||
                historyStr.toLowerCase().includes('tavern') ||
                historyStr.toLowerCase().includes('auberge');

            let enemies = [];
            if (isArena) {
                enemies = [
                    { name: "Gladiateur Veteran", hp: 25 + avgLevel * 5, max_hp: 25 + avgLevel * 5, atk: 5 + avgLevel, ac: 14, id: "e1", cr: avgLevel },
                    { name: "Combattant de l'Arene", hp: 18 + avgLevel * 3, max_hp: 18 + avgLevel * 3, atk: 4 + avgLevel, ac: 13, id: "e2", cr: avgLevel * 0.5 }
                ];
            } else if (isTavern) {
                enemies = [
                    { name: "Tavernier en Colere", hp: 22, max_hp: 22, atk: 5, ac: 12, id: "e1", cr: 0.5 },
                    { name: "Client Arme 1", hp: 11, max_hp: 11, atk: 4, ac: 11, id: "e2", cr: 0.125 },
                    { name: "Client Arme 2", hp: 11, max_hp: 11, atk: 4, ac: 11, id: "e3", cr: 0.125 }
                ];
            } else {
                enemies = [
                    { name: "Adversaire Hostile", hp: 15 + avgLevel * 4, max_hp: 15 + avgLevel * 4, atk: 4 + avgLevel, ac: 12, id: "e1", cr: avgLevel * 0.5 },
                    { name: "Ennemi", hp: 12 + avgLevel * 3, max_hp: 12 + avgLevel * 3, atk: 3 + avgLevel, ac: 11, id: "e2", cr: avgLevel * 0.25 }
                ];
            }

            result.combat = {
                enemies: enemies,
                reason: "Le combat est inévitable !",
                trigger: true
            };

            // Append combat notice to narrative if not already mentioning combat
            if (result.narrative && !result.narrative.toLowerCase().includes('combat')) {
                result.narrative += " Le combat s'engage !";
            }
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
            // Extract narrative from result for clean display
            const displayContent = typeof result === 'object' && result.narrative
                ? result.narrative
                : typeof result === 'string'
                    ? result
                    : JSON.stringify(result);

            await supabase.from('messages').insert([{
                session_id: sessionId,
                role: 'system',
                content: displayContent,
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
