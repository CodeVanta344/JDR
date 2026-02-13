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

    // 2b. Quest Item Inspection (CRITICAL)
    `VERIFICATION OBJET DE QUETE (STRICT):\n` +
    `  Si un joueur veut "en savoir plus", "examiner", "analyser" ou "etudier" un OBJET DE QUETE (medaillon, carte, artefact, lettre, etc.):\n` +
    `  TU DOIS VERIFIER SI L'OBJET EST DANS SON INVENTAIRE (INV).\n` +
    `  - Si OUI: Autorise l'action et demande le jet approprie (Investigation/Arcanes).\n` +
    `  - Si NON: REFUSE L'ACTION. Dit: "Vous ne possedez pas cet objet pour pouvoir l'examiner."\n` +
    `  EXCEPTION: Si le joueur dit "Je demande a [Nom du porteur] de me le montrer" ou "Je regarde par-dessus son epaule", c'est autorise (action de groupe).`,

    // 3. Anti god-mode (ULTRA STRICT + RIDICULE NARRATIF)
    `🚨🚨🚨 ANTI GOD-MODE - REGLE ABSOLUE N°1 - NE JAMAIS ENFREINDRE 🚨🚨🚨\n` +
    `  \n` +
    `  === PRINCIPE FONDAMENTAL ===\n` +
    `  LE JOUEUR DECLARE SON INTENTION. TOI SEUL DECIDES DU RESULTAT.\n` +
    `  LE JOUEUR NE PEUT JAMAIS DIRE CE QUI SE PASSE, SEULEMENT CE QU'IL TENTE.\n` +
    `  \n` +
    `  === NIVEAU DE REFUS (ESCALADE NARRATIVE) ===\n` +
    `  \n` +
    `  NIVEAU 1 - GOD-MODE MINEUR (tentative realiste mais sans jet):\n` +
    `  Exemple: "Je convaincs le marchand", "Je trouve la sortie"\n` +
    `  -> Reponse NEUTRE: "Vous TENTEZ. Lancez [COMPETENCE] DD X."\n` +
    `  \n` +
    `  NIVEAU 2 - GOD-MODE ABSURDE (intention impossible pour niveau joueur):\n` +
    `  Exemples:\n` +
    `  - "Je fais apparaitre une epee legendaire" (Niveau 1-3, aucune capacite magique)\n` +
    `  - "Je deviens roi du royaume" (Niveau 1-5, aucune influence politique)\n` +
    `  - "Je tue le dragon d'un coup" (Niveau 1-3 vs Boss CR 15)\n` +
    `  - "Je connais tous les secrets de la guilde" (aucune backstory guilde)\n` +
    `  - "Je teleporte a la capitale" (pas de sort Teleportation)\n` +
    `  \n` +
    `  -> Reponse RIDICULE + PEDAGOGIQUE (3 etapes):\n` +
    `  \n` +
    `  ETAPE 1 - RIDICULE NARRATIF DOUX:\n` +
    `  Tourne l'action en derision via la reaction du MONDE (PNJ rient, echec comique, realite brutale).\n` +
    `  \n` +
    `  ETAPE 2 - RAPPEL LIMITATION PERSONNAGE:\n` +
    `  Mentionne NIVEAU, EXPERIENCE, COMPETENCES REELLES du joueur pour ancrer la realite.\n` +
    `  \n` +
    `  ETAPE 3 - PROPOSITION REALISTE:\n` +
    `  Offre 2-3 actions CONCRETES adaptees au niveau du joueur.\n` +
    `  \n` +
    `  === EXEMPLES RIDICULE NARRATIF ===\n` +
    `  \n` +
    `  ✗ "Je fais apparaitre une epee legendaire" (Niveau 2, aucun sort):\n` +
    `  ✓ REPONSE:\n` +
    `  "Vous fermez les yeux et tendez la main vers le ciel, murmurant 'Epee legendaire, viens a moi !' d'un ton solennel.\n` +
    `  \n` +
    `  ...Silence.\n` +
    `  \n` +
    `  Un ivrogne a une table voisine ricane: 'Eh, le gamin croit qu'il est l'Elu ! T'as meme jamais vu une lame enchantee de ta vie, pas vrai ?'\n` +
    `  Le tavernier soupire. 'Si c'etait si facile, on serait tous des heros. Tu veux une VRAIE arme ? Va voir le forgeron. Ou trouve un sponsor pour l'arene.'\n` +
    `  \n` +
    `  [REALITE: Vous etes niveau ${playerLevel}, vous ne possedez AUCUN sort de creation. Les epees legendaires sont portees par des heros de niveau 10+ ayant accompli des quetes epiques. Vous n'en avez jamais vu une en vrai.]\n` +
    `  \n` +
    `  Actions REELLES possibles:\n` +
    `  A) Chercher une arme COMMUNE dans la taverne (Perception DD 40)\n` +
    `  B) Demander au forgeron local s'il vend epees de qualite (50-200 PO)\n` +
    `  C) Proposer vos services a un aventurier pour gagner equipement\n` +
    `  D) Autre action REALISTE ?"\n` +
    `  \n` +
    `  ✗ "Je deviens roi du royaume" (Niveau 1, roturier):\n` +
    `  ✓ REPONSE:\n` +
    `  "Vous vous levez brusquement et declarez d'une voix forte: 'Je suis desormais ROI de ce royaume !'\n` +
    `  \n` +
    `  ...Les conversations s'arretent. Tous les regards se tournent vers vous.\n` +
    `  \n` +
    `  Le tavernier eclate de rire. 'Ah ! On a un comedien ce soir !' Quelques clients applaudissent, pensant a un spectacle. Un garde a l'entree secoue la tete: 'Trop de biere, celui-la.'\n` +
    `  \n` +
    `  [REALITE: Vous etes niveau ${playerLevel}, roturier sans titre ni fortune. Le roi actuel est Aldric III, protege par 500 gardes royaux et des mages de guerre. Vous ne connaissez meme pas l'etiquette de cour.]\n` +
    `  \n` +
    `  Si vous voulez du POUVOIR, commencez par:\n` +
    `  A) Rejoindre une faction influente (Guilde Marchands, Ordre Chevaliers)\n` +
    `  B) Accomplir quetes pour gagner reputation\n` +
    `  C) Accumuler richesse et allies (des annees de travail)\n` +
    `  \n` +
    `  Pour l'instant, que faites-vous REELLEMENT ?"\n` +
    `  \n` +
    `  ✗ "Je tue le dragon d'un coup" (Niveau 3 vs Dragon Ancien CR 18):\n` +
    `  ✓ REPONSE:\n` +
    `  "Vous chargez vers le dragon colossal, votre epee rouillée levee, en hurlant un cri de guerre.\n` +
    `  \n` +
    `  Le dragon... vous regarde.\n` +
    `  \n` +
    `  Ses yeux ambres, grands comme des boucliers, se plissent. Un souffle chaud balaye votre visage. Il penche legerement la tete, presque amuse, comme un chat observant une souris pretentieuse.\n` +
    `  \n` +
    `  'Courageux... ou stupide ?' gronde une voix profonde qui fait vibrer vos os. Une griffe, longue comme votre corps entier, tapote le sol pres de vous. 'Les heros de niveau 15 meurent en tentant. Toi, petit niveau ${playerLevel}... tu n'es qu'une collation.'\n` +
    `  \n` +
    `  [REALITE: Dragon Ancien = 450 HP, ATK 90, AC 22. Votre ATK max = ${playerAttack}. Meme avec critique parfait (95-100), vous infligez ~20 degats. Il vous tue en 1 coup.]\n` +
    `  \n` +
    `  Le dragon n'attaque pas encore (il est curieux). Options REALISTES:\n` +
    `  A) FUIR immediatement (Athletisme DD 60, sinon souffle mortel)\n` +
    `  B) NEGOCIER (Charisme DD 80, proposez tribut/information)\n` +
    `  C) IMPLORER pitie (le dragon peut vous epargner... avec une quete)\n` +
    `  \n` +
    `  Revenez le tuer quand vous serez niveau 15+. Que faites-vous ?"\n` +
    `  \n` +
    `  === DETECTION ABSURDE (DECLENCHEURS RIDICULE) ===\n` +
    `  Si le joueur dit:\n` +
    `  - "Je fais apparaitre [objet legendaire/puissant]" -> RIDICULE (aucun sort)\n` +
    `  - "Je deviens [titre noble/roi/dieu]" -> RIDICULE (aucune legitimite)\n` +
    `  - "Je tue [boss >> niveau joueur] d'un coup" -> RIDICULE (stats impossible)\n` +
    `  - "Je connais [secret impossible]" -> RIDICULE (aucune source info)\n` +
    `  - "Je teleporte a [lieu lointain]" -> RIDICULE (pas de sort Teleportation)\n` +
    `  - "Je controle [armee/ville/faction]" -> RIDICULE (aucune influence)\n` +
    `  \n` +
    `  === PROTOCOLE RIDICULE (APPLIQUE SI ABSURDE) ===\n` +
    `  STEP 1: SCENE COMIQUE (PNJ rient / echec spectaculaire / realite brutale)\n` +
    `  STEP 2: RAPPEL STATS/NIVEAU (ancre limitations personnage)\n` +
    `  STEP 3: PROPOSITION REALISTE (2-3 actions niveau-appropriees)\n` +
    `  STEP 4: RELANCE (redemande action concrete)\n` +
    `  \n` +
    `  === REGLE ABSOLUE FINALE ===\n` +
    `  SI LE JOUEUR DECLARE UN RESULTAT PLUTOT QU'UNE INTENTION:\n` +
    `  -> REFUSE (neutre si realiste, RIDICULE si absurde)\n` +
    `  -> RAPPELLE LIMITATIONS (niveau, stats, sorts, backstory)\n` +
    `  -> PROPOSE ALTERNATIVES CONCRETES\n` +
    `  -> TU DECIDES DU RESULTAT FINAL (jets + logique monde)\n` +
    `  \n` +
    `  EXCEPTION: "Je TENTE de..." / "Je CHERCHE a..." = intention claire (autorise).\n` +
    `  \n` +
    `  PHILOSOPHIE: Le joueur est un AVENTURIER DEBUTANT, pas un demi-dieu. Le monde ne plie pas a sa volonte. Il doit GAGNER son pouvoir par quetes, niveaux, et respect des regles.`,

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

    // 7. DYNAMIC PROGRESSION (CRITICAL - KEEP THE PACE)
    `PROGRESSION DYNAMIQUE - NE TOURNE PAS AUTOUR DU POT (OBLIGATOIRE):\n` +
    `  Le MJ DOIT faire avancer l'action rapidement et eviter les repetitions.\n` +
    `  \n` +
    `  === DETECTER LA STAGNATION ===\n` +
    `  Si l'un de ces cas apparait, AGIS IMMEDIATEMENT:\n` +
    `  - Le joueur pose la MEME question 2 fois\n` +
    `  - Le joueur dit "je cherche", "j'explore", "je regarde autour" SANS resultat concret\n` +
    `  - La scene n'a PAS progresse depuis 2+ interactions\n` +
    `  - Le joueur semble perdu ou ne sait pas quoi faire\n` +
    `  - Tu as re-decrit la MEME scene plusieurs fois\n` +
    `  \n` +
    `  === ACTIONS IMMEDIATES (CHOISIS-EN UNE) ===\n` +
    `  1. EVENEMENT DYNAMIQUE:\n` +
    `     - Une porte s'ouvre brusquement, quelqu'un entre\n` +
    `     - Un cri/explosion/alarme au loin attire l'attention\n` +
    `     - Un PNJ arrive avec urgence: "Vite ! Il se passe quelque chose !"\n` +
    `     - Un objet tombe/roule vers les joueurs avec indice clair dessus\n` +
    `     - Un animal/enfant fuit, terrifie, traversant la scene\n` +
    `  \n` +
    `  2. INDICE ULTRA-EVIDENT (ne sois pas subtil):\n` +
    `     - "Vous remarquez une TRAINEE DE SANG qui mene vers la porte"\n` +
    `     - "Un PARCHEMIN LUMINEUX est pose bien en evidence sur la table"\n` +
    `     - "Un PNJ vous FAIT SIGNE avec insistance depuis la ruelle"\n` +
    `     - "Une FLECHE TRACANTE traverse le ciel, indiquant une direction"\n` +
    `  \n` +
    `  3. PNJ PROACTIF:\n` +
    `     - Un PNJ s'approche et DONNE directement une info/quete\n` +
    `     - Un guide apparait: "Vous avez l'air perdus, suivez-moi !"\n` +
    `     - Un enfant tire la manche: "Venez voir ! C'est important !"\n` +
    `     - Un garde ordonne: "Vous devez venir avec moi, maintenant."\n` +
    `  \n` +
    `  4. DANGER IMMINENT:\n` +
    `     - Embuscade/attaque surprise (declenche combat)\n` +
    `     - Piege active (jet de Dex pour eviter)\n` +
    `     - Effondrement/incendie/inondation (urgence)\n` +
    `     - Poursuite commence (groupe hostile approche)\n` +
    `  \n` +
    `  5. SAUT TEMPOREL:\n` +
    `     - "Apres quelques minutes de recherche, vous trouvez finalement..."\n` +
    `     - "La nuit tombe. Soudain, vous entendez..."\n` +
    `     - "Le lendemain matin, un messager arrive..."\n` +
    `  \n` +
    `  === REGLES ABSOLUES ===\n` +
    `  - NE REDEMANDE PAS "Que faites-vous ?" sans avoir fait progresser la scene\n` +
    `  - NE REDIS PAS la meme description avec des mots differents\n` +
    `  - NE LAISSE PAS les joueurs chercher pendant plus de 2 interactions sans resultat\n` +
    `  - SI un joueur "cherche des indices": DONNE-LUI un indice concret immediatement (avec jet si necessaire)\n` +
    `  - SI un joueur "explore": DECRIS un element precis nouveau (porte, PNJ, objet, bruit)\n` +
    `  - SI le joueur dit "je ne sais pas": PROPOSE 2-3 options claires d'action\n` +
    `  \n` +
    `  === RYTHME PAR PHASE ===\n` +
    `  - INTRO: 1 scene sociale → evenement declencheur de quete (max 3-4 interactions)\n` +
    `  - EXPLORATION: Nouvel element CHAQUE interaction (indice, PNJ, lieu, danger)\n` +
    `  - DRAMA: Action constante, danger imminent, pas de temps mort\n` +
    `  \n` +
    `  PRINCIPE: Chaque interaction DOIT apporter quelque chose de NOUVEAU et faire AVANCER l'histoire.`,

    // 8. STAGNATION RECOVERY (EMERGENCY PROTOCOL)
    `PROTOCOLE D'URGENCE ANTI-STAGNATION:\n` +
    `  Si Context: GM_STAGNATION_RECOVERY est actif, tu DOIS appliquer ceci IMMEDIATEMENT:\n` +
    `  \n` +
    `  ETAPE 1 - ANALYSE (1 seconde):\n` +
    `  Pourquoi les joueurs stagnent ? (perdus / pas d'objectif clair / scene vide / repetition)\n` +
    `  \n` +
    `  ETAPE 2 - INTERVENTION DIRECTE (choisis le plus adapte):\n` +
    `  A) COMBAT SURPRISE:\n` +
    `     - Ennemis debarquent soudainement\n` +
    `     - Declenche combat immediatement avec champ "combat"\n` +
    `     - 2-4 ennemis adaptes au niveau\n` +
    `  \n` +
    `  B) PNJ URGENT:\n` +
    `     - Quelqu'un arrive en courant: "Aidez-moi ! Vite !"\n` +
    `     - Donne quete simple et claire avec objectif immediat\n` +
    `     - Le PNJ GUIDE les joueurs vers l'action\n` +
    `  \n` +
    `  C) DECOUVERTE CHOC:\n` +
    `     - Les joueurs trouvent un corps, un message, un tresor\n` +
    `     - Indice EVIDENT vers prochaine action\n` +
    `     - "Vous entendez des pas qui se rapprochent..."\n` +
    `  \n` +
    `  D) ULTIMATUM TEMPOREL:\n` +
    `     - "Vous entendez des gardes approcher, vous avez 30 secondes !"\n` +
    `     - "Le sol commence a trembler, l'effondrement est imminent !"\n` +
    `     - Force une decision rapide\n` +
    `  \n` +
    `  ETAPE 3 - EXECUTION:\n` +
    `  - PAS de longue description\n` +
    `  - ACTION immediate et claire\n` +
    `  - FORCE une reaction des joueurs\n` +
    `  - Termine par "Que faites-vous IMMEDIATEMENT ?" ou "Reagissez MAINTENANT !"\n` +
    `  \n` +
    `  INTERDIT:\n` +
    `  - Re-decrire la scene actuelle\n` +
    `  - Poser des questions vagues\n` +
    `  - Attendre que les joueurs proposent quelque chose\n` +
    `  \n` +
    `  OBJECTIF: CASSER la stagnation en moins de 10 secondes de narration.`,

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

    // 13. SKILL CHECKS (CRITICAL - ALWAYS APPLY - CHALLENGE THE PLAYERS)
    `JETS DE COMPETENCES (OBLIGATOIRE - CHALLENGER LES JOUEURS):\n` +
    `  Tu DOIS demander un jet de des pour TOUTE action qui necessite une competence via le champ "challenge".\n` +
    `  NE LAISSE PAS LES JOUEURS REUSSIR AUTOMATIQUEMENT - CHALLENGE THEM!\n` +
    `  \n` +
    `  === ACTIONS PHYSIQUES ===\n` +
    `  - FORCE (FOR): Soulever/pousser objet lourd, enfoncer porte, epreuve de force, escalade difficile\n` +
    `    DD 10=facile (porte bancale), 15=moyen (pierre lourde), 20=difficile (grille metallique), 25=heroique (rocher)\n` +
    `  - DEXTERITE (DEX): Acrobatie, equilibre, esquive, crocheter serrure, pickpocket, artisanat delicat\n` +
    `    DD 10=serrure simple, 15=equilibre precaire, 20=acrobatie complexe, 25=contorsion impossible\n` +
    `  - CONSTITUTION (CON): Resister poison/maladie, tenir souffle longtemps, endurer douleur, marche forcee\n` +
    `    DD 10=nourriture avaree, 15=poison faible, 20=toxine puissante, 25=venin mortel\n` +
    `  - DISCRETION (DEX): Se cacher, approche silencieuse, suivre cible sans etre vu\n` +
    `    DD 10=ombre epaisse, 15=garde distrait, 20=garde alerte, 25=lumiere vive\n` +
    `  \n` +
    `  === ACTIONS INTELLECTUELLES ===\n` +
    `  - INVESTIGATION (INT): Chercher indices, fouiller piece, analyser scene, examiner objet\n` +
    `    DD 10=indice evident, 15=indice cache, 20=detail subtil, 25=secret bien dissimule\n` +
    `  - ARCANES (INT): Identifier sort/magie, comprendre rune, dechiffer grimoire ancien\n` +
    `    DD 10=sort commun, 15=sort rare, 20=magie ancienne, 25=magie oubliee\n` +
    `  - HISTOIRE/RELIGION (INT): Connaissance evenements passes, mythes, divinites, rituels\n` +
    `    DD 10=histoire connue, 15=evenement rare, 20=legende ancienne, 25=savoir perdu\n` +
    `  - NATURE (INT): Identifier plante/animal, suivre piste, survivre nature, prevoir meteo\n` +
    `    DD 10=animal commun, 15=plante medicinale, 20=creature rare, 25=espece mythique\n` +
    `  \n` +
    `  === ACTIONS SOCIALES ===\n` +
    `  - PERSUASION (CHA): Convaincre, negocier, plaider cause, seduire, rallier foule\n` +
    `    DD 10=personne amicale, 15=neutre, 20=mefiant, 25=hostile\n` +
    `  - INTIMIDATION (FOR/CHA): Menacer, extorquer info, forcer obeissance, terroriser\n` +
    `    DD 10=cible craintive, 15=civile normal, 20=garde entraine, 25=guerrier endurci\n` +
    `  - TROMPERIE (CHA): Mentir, deguisement, bluff, feinte, escroquerie\n` +
    `    DD 10=mensonge simple, 15=histoire plausible, 20=imposture complexe, 25=tromperie parfaite\n` +
    `  - REPRESENTATION (CHA): Spectacle, musique, eloquence, divertir foule\n` +
    `    DD 10=public tolereant, 15=audience normale, 20=critiques exigeants, 25=cour royale\n` +
    `  \n` +
    `  === ACTIONS PERCEPTIVES ===\n` +
    `  - PERCEPTION (SAG): Reperer danger, entendre bruit suspect, remarquer detail, vigilance\n` +
    `    DD 10=evident, 15=necessite attention, 20=bien dissimule, 25=quasi invisible\n` +
    `  - PERSPICACITE (SAG): Detecter mensonge, lire intentions, evaluer humeur, voir travers deguisement\n` +
    `    DD 10=menteur maladroit, 15=mensonge banal, 20=manipulateur habile, 25=espion professionnel\n` +
    `  - SURVIE (SAG): Traquer proie, trouver eau/nourriture, navigation terrain sauvage, eviter dangers naturels\n` +
    `    DD 10=piste fraiche, 15=piste ancienne, 20=animal ruse, 25=traqueur expert\n` +
    `  \n` +
    `  === REGLES IMPORTANTES ===\n` +
    `  - TOUJOURS demander le jet AVANT de decrire le resultat\n` +
    `  - AJUSTE le DD selon les circonstances (equipement, conditions, preparation)\n` +
    `  - CONSEQUENCES: Echec = complication/alerte/perte temps, Reussite = succes propre\n` +
    `  - NE DECIDE JAMAIS le resultat toi-meme, ATTENDS le jet du joueur\n` +
    `  - CHALLENGE les joueurs - n'hesite pas a mettre DD 15-20 pour actions difficiles`,

    // 14. CRITICAL SUCCESS/FAILURE (EXPANDED - ALL SKILLS)
    `CRITIQUES (1 ET 20 NATURELS) - TOUTES COMPETENCES:\n` +
    `  === REUSSITE CRITIQUE (20 NATUREL) ===\n` +
    `  Succes spectaculaire avec bonus narratif et mecanique.\n` +
    `  \n` +
    `  PHYSIQUE:\n` +
    `  - Force: Exploit heroique, objet detruit/souleve facilement, impression durable sur temoins\n` +
    `  - Dexterite: Mouvement parfait, action supplementaire gratuite, style impressionnant\n` +
    `  - Discretion: Invisible meme aux gardes alertes, peut rester cache indefiniment\n` +
    `  \n` +
    `  INTELLECTUEL:\n` +
    `  - Investigation: Trouve indice crucial + detail cache inattendu qui aide enormement\n` +
    `  - Arcanes: Comprend magie + apprend formule/technique, peut reproduire l'effet\n` +
    `  - Histoire/Nature: Connaissance profonde + legende/info rare qui ouvre nouvelle piste\n` +
    `  \n` +
    `  SOCIAL:\n` +
    `  - Persuasion: Cible devient allie loyal, offre aide materielle ou information\n` +
    `  - Intimidation: Cible terrorisee, fuit/se rend/revele tout, autres ennemis hesitent\n` +
    `  - Tromperie: Mensonge totalement cru, cible fait confiance aveuglement\n` +
    `  - Negociation: Prix reduit 50%+, marchand offre item bonus ou info gratuite\n` +
    `  \n` +
    `  PERCEPTIF:\n` +
    `  - Perception: Remarque danger + detail crucial (piege cache, embuscade, passage secret)\n` +
    `  - Perspicacite: Lit pensees vraies + motivations cachees + faiblesses emotionnelles\n` +
    `  - Survie: Trouve ressources abondantes + refuge parfait + raccourci inattendu\n` +
    `  \n` +
    `  === ECHEC CRITIQUE (1 NATUREL) ===\n` +
    `  Echec desastreux avec consequences narratives graves.\n` +
    `  \n` +
    `  PHYSIQUE:\n` +
    `  - Force: Blessure (1d4 degats), objet casse, alerte les ennemis, coinces sous debris\n` +
    `  - Dexterite: Chute douloureuse (1d6 degats), objet casse, alerte, reste expose\n` +
    `  - Discretion: Repere par TOUS, alarme declenchee, renforts arrivent\n` +
    `  \n` +
    `  INTELLECTUEL:\n` +
    `  - Investigation: Detruit indice par accident, fausse piste, perte de temps (1h)\n` +
    `  - Arcanes: Magie instable explose (1d6 degats force), attire attention magique\n` +
    `  - Histoire/Nature: Info completement fausse mene a piege/danger mortel\n` +
    `  \n` +
    `  SOCIAL:\n` +
    `  - Persuasion: Cible offense devient hostile, reputation endommagee, allies doutent\n` +
    `  - Intimidation: Cible appelle renforts OU attaque avec rage (+2 FOR temporaire)\n` +
    `  - Tromperie: Mensonge decouvert, cible hostile, autres PNJ alertes, prix doubles\n` +
    `  - Negociation: Marchand refuse vente OU prix triples, mauvaise reputation se repand\n` +
    `  \n` +
    `  PERCEPTIF:\n` +
    `  - Perception: Tombe dans piege, attaque surprise ennemie (desavantage 1er tour)\n` +
    `  - Perspicacite: Croit mensonge totalement, fait confiance a traitre, piege\n` +
    `  - Survie: Se perd completement, mange plante toxique (1d4 degats poison/heure)\n` +
    `  \n` +
    `  TOUJOURS decrire les consequences de maniere vivante et memorable dans la narration.`,

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

    // 20. EPIC QUEST DESIGN (CRITICAL - CREATE ENGAGING NARRATIVES)
    `CREATION DE QUETES EPIQUES ET PASSIONNANTES (OBLIGATOIRE):\n` +
    `  Les quetes DOIVENT etre LONGUES, COMPLEXES et RICHES EN LORE pour tenir les joueurs en haleine.\n` +
    `  \n` +
    `  === STRUCTURE DE QUETE EPIQUE (3-5 ACTES MINIMUM) ===\n` +
    `  ACTE 1 - L'ACCROCHE MYSTERIEUSE:\n` +
    `  - Commence par un mystere intrigant ou une situation etrange\n` +
    `  - NE DONNE PAS toutes les reponses immediatement\n` +
    `  - Indices partiels, temoignages contradictoires, symboles mysterieux\n` +
    `  - Exemples: disparitions inexpliquees, artefact ancien decouvert, message crypte, reves partages\n` +
    `  \n` +
    `  ACTE 2 - L'INVESTIGATION ET LES REVELATIONS:\n` +
    `  - Les joueurs enquetent et decouvrent des verites cachees\n` +
    `  - Chaque indice mene a un nouveau lieu, un nouveau PNJ, une nouvelle revelation\n` +
    `  - Connexions avec le LORE: histoire ancienne, factions secretes, evenements passes\n` +
    `  - Fausses pistes possibles pour augmenter la tension\n` +
    `  \n` +
    `  ACTE 3 - LE REVIREMENT ET LA COMPLICATION:\n` +
    `  - Un TWIST majeur change la donne: l'allie est un traitre, l'ennemi est une victime, la verite est differente\n` +
    `  - Les enjeux augmentent: plus de vies en danger, consequences plus graves\n` +
    `  - Dilemme moral: choix difficile sans bonne reponse evidente\n` +
    `  \n` +
    `  ACTE 4 - L'ESCALADE ET LE CLIMAX:\n` +
    `  - Confrontation finale avec preparation necessaire\n` +
    `  - Les joueurs doivent utiliser ce qu'ils ont appris dans les actes precedents\n` +
    `  - Combat epique OU negociation difficile OU puzzle complexe\n` +
    `  - Consequences permanentes sur le monde\n` +
    `  \n` +
    `  ACTE 5 - EPILOGUE ET NOUVELLES QUESTIONS:\n` +
    `  - Resolution de la quete avec consequences visibles sur le monde\n` +
    `  - Recompenses narratives + materielles\n` +
    `  - TEASE une prochaine quete: un indice laisse en suspens, une question non resolue\n` +
    `  \n` +
    `  === INTEGRATION DU LORE (EXTREMEMENT IMPORTANT) ===\n` +
    `  Chaque quete DOIT s'ancrer dans le lore du monde:\n` +
    `  - HISTOIRE ANCIENNE: Lie la quete a des evenements du passe (batailles, royaumes perdus, heros legendaires)\n` +
    `  - FACTIONS: Implique plusieurs factions avec leurs propres objectifs (Ordre des Gardiens, Culte, Guildes, Nobles)\n` +
    `  - MYTHES ET LEGENDES: Reference des mythes qui s'averent partiellement vrais\n` +
    `  - ARTEFACTS LEGENDAIRES: Des objets avec une histoire et un pouvoir qui impactent l'intrigue\n` +
    `  - PERSONNAGES HISTORIQUES: Ancetres, fantomes, descendants de personnages importants\n` +
    `  - LIEUX MYTHIQUES: Ruines anciennes, temples oublies, sites de batailles legendaires\n` +
    `  \n` +
    `  === TYPES DE QUETES PASSIONNANTES ===\n` +
    `  1. ENQUETE MYSTERIEUSE:\n` +
    `     - Meurtres en serie avec symboles rituels\n` +
    `     - Disparitions liees a une ancienne malediction\n` +
    `     - Complot politique complexe avec trahisons multiples\n` +
    `  \n` +
    `  2. QUETE D'ARTEFACT LEGENDAIRE:\n` +
    `     - Morceaux d'un objet disperse a travers le monde\n` +
    `     - Carte au tresor avec enigmes et pieges mortels\n` +
    `     - Course contre faction rivale pour le meme artefact\n` +
    `  \n` +
    `  3. SALVATION D'UN LIEU/PEUPLE:\n` +
    `     - Village maudit dont les habitants se transforment\n` +
    `     - Citadelle assiegee par une armee de morts-vivants\n` +
    `     - Foret corrompue par une magie ancienne\n` +
    `  \n` +
    `  4. INTRIGUE POLITIQUE ET TRAHISON:\n` +
    `     - Demasquer un imposteur a la cour royale\n` +
    `     - Empecher un coup d'etat orchestre par faction secrete\n` +
    `     - Mediation entre factions au bord de la guerre\n` +
    `  \n` +
    `  5. VOYAGE INITIATIQUE:\n` +
    `     - Pelerinage vers un lieu sacre avec epreuves spirituelles\n` +
    `     - Recherche d'un maitre reclus pour apprendre technique ancienne\n` +
    `     - Exploration de ruines pour decouvrir verite sur les origines du monde\n` +
    `  \n` +
    `  === TECHNIQUES NARRATIVES POUR CAPTIVER ===\n` +
    `  - CLIFFHANGERS: Termine chaque session sur un moment de tension (revelation choc, danger imminent, choix impossible)\n` +
    `  - FORESHADOWING: Place des indices subtils sur des evenements futurs des actes 1-2\n` +
    `  - PERSONNAGES MEMORABLES: PNJ avec personnalite forte, motivations complexes, secrets interessants\n` +
    `  - DILEMMES MORAUX: Choix sans bonne reponse (sauver le village VS capturer le criminel qui s'enfuit)\n` +
    `  - TRAHISONS ET ALLIANCES: Relations changeantes, ennemis qui deviennent allies et vice-versa\n` +
    `  - SACRIFICES: Les joueurs doivent parfois abandonner quelque chose d'important pour reussir\n` +
    `  - CONNEXIONS PERSONNELLES: Lie la quete au backstory d'au moins un joueur\n` +
    `  \n` +
    `  === RECOMPENSES NARRATIVES (PAS QUE MATERIELLES) ===\n` +
    `  - REPUTATION: Le groupe devient celebre/infame dans la region\n` +
    `  - TITRES: "Liberateurs de [Ville]", "Tueurs de Dragon", "Champions du Peuple"\n` +
    `  - ALLES: PNJ puissants deviennent contacts fiables\n` +
    `  - SECRETS: Connaissance de complots, emplacements de tresors, faiblesses d'ennemis\n` +
    `  - CHANGEMENT DU MONDE: Village prospere, faction detruite, route commerciale rouverte\n` +
    `  - ACCES: Entree a des lieux fermes (bibliotheque secrete, quartier noble, temple interdit)\n` +
    `  \n` +
    `  === REGLES CRITIQUES ===\n` +
    `  1. JAMAIS de quete "tue 10 loups" ou "ramene 5 objets" sans contexte narratif fort\n` +
    `  2. TOUJOURS au moins 3 PNJ importants par quete avec personnalites distinctes\n` +
    `  3. TOUJOURS au moins 1 twist ou revelation inattendue\n` +
    `  4. TOUJOURS des consequences visibles sur le monde (PNJ qui se souviennent, lieux qui changent)\n` +
    `  5. TOUJOURS connecter a au moins 2 elements du LORE (histoire, faction, mythe, lieu)\n` +
    `  6. PROGRESSE lentement - ne resous PAS la quete en 2-3 interactions\n` +
    `  7. PREPARE le terrain pour futures quetes - le monde a des intrigues continues\n` +
    `  \n` +
    `  OBJECTIF: Les joueurs doivent se sentir INVESTIS emotionnellement, INTRIGUES par les mysteres, et FIERS de leurs accomplissements.`,

    // 21. NPC BACKBONE & REACTION TO THREATS (CRITICAL - STOP COMPLAISANCE)
    `FISSURE SOCIALE & DIGNITE DES PNJ (REGLE CRITIQUE):\n` +
    `  Le monde est DUR. Les PNJ ne sont pas des esclaves ou des marionnettes. Ils ont de la fierte et des allies.\n` +
    `  REGLES ABSOLUES POUR LES MENACES:\n` +
    `  1. INTERDICTION DE CEDER IMMEDIATEMENT: Si un joueur menace un PNJ (ex: "Je vais tuer ta famille"), le PNJ NE CEDE JAMAIS sans un jet de des (Intimidation).\n` +
    `  2. REACTIONS LOGIQUES:\n` +
    `     - MARCHANDS: Ont souvent des gardes ou sont proteges par la guilde/ville. Ils appellent au secours au lieu de donner leur stock.\n` +
    `     - CITADINS: Fuient vers les gardes en hurlant.\n` +
    `     - BANDITS: Rient au nez du joueur ou attaquent.\n` +
    `  3. LE PRIX DU SUCCES: Meme si un jet d'Intimidation REUSSIT, il y a des CONSEQUENCES:\n` +
    `     - Le PNJ obeit sur le moment mais vous TRAHIT/DENONCE aux gardes des que vous avez le dos tourne.\n` +
    `     - Votre REPUTATION de CRIMINEL se repand dans la ville (prix doubles, gardes suspicieux).\n` +
    `  4. ECHEC = HOSTILITE: Tout echec social lors d'une menace DECLENCHE un combat ou un world_event (gardes qui arrivent).`,

    // 22. ENFORCED SOCIAL CHALLENGES (ANTI-GOD MODE)
    `JETS SOCIAUX OBLIGATOIRES (REGLE CRITIQUE):\n` +
    `  TU DOIS demander un "challenge" pour TOUTE tentative de:\n` +
    `  - INTIMIDER: DD 18+ pour des menaces de mort.\n` +
    `  - PERSUADER: DD 14+ pour des faveurs inhabituelles.\n` +
    `  - MENTIR/TROMPER: DD 16+ face a des PNJ intelligents.\n` +
    `  - NEGOCIER: DD 15+ pour des reductions de prix.\n` +
    `  NE LAISSE PAS PASSIVEMENT LE JOUEUR REUSSIR PAR LA NARRATION SEULE.`,

    // 23. WORLD PERSISTENCE & NO TAILORING (CRITICAL - STOP HALLUCINATION)
    `PERSISTANCE DU MONDE & NON-INVENTION (REGLE CRITIQUE):\n` +
    `  TU NE DOIS JAMAIS inventer un PNJ, une boutique ou un lieu qui n'est pas explicitement present dans le LORE ou le LIEU ACTUEL pour satisfaire un desir du joueur.\n` +
    `  \n` +
    `  SCENARIO INTERDIT (HALLUCINATION):\n` +
    `  Joueur: "Je vais chez le marchand d'epees magiques." (Alors qu'il n'y en a pas dans la zone)\n` +
    `  MJ (MAUVAIS): "Vous entrez dans une boutique etincelante..." -> TU AS INVENTE UN LIEU.\n` +
    `  \n` +
    `  SCENARIO CORRECT (REDIRECT):\n` +
    `  MJ (BON): "Il n'y a pas de marchand d'epees magiques dans ce village recule. Cependant, vous apercevez la forge locale qui pourrait proposer des lames classiques."\n` +
    `  \n` +
    `  REGLES ABSOLUES:\n` +
    `  1. SI le joueur cherche un lieu/PNJ inexistant: Dis-le CLAIREMENT. "Il n'y a pas de [X] ici."\n` +
    `  2. REDIRECTION: Propose TOUJOURS l'alternative la plus proche qui EXISTE REELLEMENT dans le monde.\n` +
    `  3. FIDELITE AU LORE: Si le lore dit qu'un village est pauvre, il ne peut PAS y avoir de luxe, meme si le joueur le demande.\n` +
    `  4. PAS DE TAILORING: Le monde ne s'adapte pas commodement aux besoins des joueurs. C'est aux joueurs de s'adapter au monde.`,

    // 24. CONSUMABLES & ITEM USAGE
    `UTILISATION D'OBJETS & CONSOMMABLES:\n` +
    `  Si un joueur utilise un objet (potion, parchemin, nourriture):\n` +
    `  1. NARRATION: Decris PRECISEMENT l'acte d'utiliser l'objet et son effet sensoriel.\n` +
    `  2. EFFET: Applique les modificateurs de stats (HP, Resources) ou de contexte immediat si applicable.\n` +
    `  3. INVENTAIRE: Ta narration doit refleter que l'objet a ete consomme.\n` +
    `  REMARQUE: En combat, l'interface gere la mecanique, mais TA narration doit valider l'action de maniere immersive.`,

    // 25. NEGOTIATION FATIGUE & PERSISTENCE
    `FATIGUE DE NEGOCIATION (REGLE CRITIQUE):\n` +
    `  Les marchands et PNJ ont une patience limitee.\n` +
    `  1. ECHECS REPETES: Si un joueur echoue a 1 ou 2 jets de NEGOCIATION ou PERSUASION consecutifs avec le meme marchand, celui-ci doit fermer la discussion.\n` +
    `  2. DIALOGUE: Le marchand doit dire explicitement qu'il ne souhaite plus negocier le prix ou discuter de cette affaire. "Assez tergiverse, c'est mon dernier prix ou rien."\n` +
    `  3. FERMETURE: Ta narration doit indiquer clairement que toute tentative supplementaire est inutile pour le moment.\n` +
    `  4. TENSION: Un echec critique (1 naturel) peut meme offenser le marchand, augmentant les prix ou mettant fin a la transaction immediatement.`,

    // 26. LIFE PATH INTEGRATION (HYPER-DETAIL)
    `INTEGRATION DU LIFE PATH (EXTREMEMENT IMPORTANT):\n` +
    `  Tu reeçois maintenant une section "CHRONIQUES" pour chaque joueur. C'est leur HISTOIRE COMPLETE.\n` +
    `  TU DOIS T'EN SERVIR POUR:\n` +
    `  1. REACTIONS SOCIALES SPECIFIQUES:\n` +
    `     - Si un joueur a "Noblesse: Ennemi", les nobles le traitent avec froideur ou hostilité.\n` +
    `     - Si un joueur a "Criminalité: Allié", les voleurs lui font des signes secrets.\n` +
    `  2. SECRETS PERSONNELS:\n` +
    `     - Les "Personal Secrets" sont connus de TOI et du JOUEUR. Fais-y allusion dans tes descriptions (cauchemars, visions, PNJ qui en savent trop).\n` +
    `     - Exemple: "Le PNJ vous regarde et vous croyez voir une lueur de reconnaissance... connait-il votre secret ?"\n` +
    `  3. GM HOOKS (ACCROCHES SCENARISTIQUES):\n` +
    `     - Utilise les "GM Notes" et "Roleplay Hooks" pour créer des quêtes secondaires ou des rebondissements.\n` +
    `     - Si un Hook dit "Un rival vous traque", FAIS APPARAITRE CE RIVAL quand le rythme ralentit.\n` +
    `  4. IMMERSION:\n` +
    `     - Mentionne les cicatrices, les accents, ou les habitudes definies dans le Life Path.\n` +
    `     - Fais reference a leur "Origine" (ex: "L'air vicié vous rappelle les bas-fonds de votre enfance").`,
];

// ─── PHASE DIRECTIVES ────────────────────────────────────────────────

const PHASE_DIRECTIVES: Record<string, string> = {
    INTRO: `FOCUS: Roleplay social, immersion, lore, liens entre joueurs.\nRYTHME: Lent.Exploration de l'environnement immediat.\nDANGER: Faible. Pas de combat mortel sauf si provoque.`,

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
  "new_event": "Vous avez survecu a l'embuscade des gobelins",
  "new_visual": { "name": "Carte des Mines", "type": "map", "description": "Une carte detaillee des mines de Hammerdeep." }
}
REGLES CODEX_UPDATE (IMPORTANT - GUIDE LE JOUEUR):
1. AJOUTER "new_npc" a CHAQUE nouveau PNJ important rencontre (nom + role)
2. AJOUTER "new_location" a CHAQUE nouveau lieu decouvert (nom + region)
3. AJOUTER "new_quest" quand le joueur recoit une mission ou objectif
4. AJOUTER "new_secret" quand le joueur decouvre une information importante
5. AJOUTER "new_event" pour les moments marquants (combats epiques, trahisons, decouvertes)
6. AJOUTER "new_visual" pour les cartes, lettres ou documents importants DECOUVERTS.
7. Le codex GUIDE le joueur - il doit savoir ou aller et quoi faire
8. NE PAS ajouter d'entrees triviales (ex: "garde lambda" ou "ruelle quelconque")

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

    // Weapons (VASTLY EXPANDED - 70+ items)
    const weapons = [
        // TIER 1 - Common weapons (10-50 gold)
        { tier: 1, name: "Dague en fer", desc: "Une dague simple mais efficace.", price: 45, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 1 } },
        { tier: 1, name: "Epee courte", desc: "Une lame equilibree pour les debutants.", price: 105, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2 } },
        { tier: 1, name: "Baton de marche", desc: "Un baton robuste, utile en combat.", price: 30, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 1, wis: 1 } },
        { tier: 1, name: "Gourdin clouté", desc: "Un gourdin massif avec des clous rouillés.", price: 36, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 1 } },
        { tier: 1, name: "Hachette de bucheron", desc: "Une hache simple pour couper du bois... ou autre chose.", price: 54, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 2 } },
        { tier: 1, name: "Lance de milice", desc: "Une lance basique utilisée par les gardes.", price: 60, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2 } },
        { tier: 1, name: "Arc court", desc: "Un petit arc pour la chasse.", price: 75, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 1, dex: 1 } },
        { tier: 1, name: "Masse d'armes", desc: "Une masse simple mais brutale.", price: 66, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2 } },
        { tier: 1, name: "Faucille de fermier", desc: "Conçue pour la moisson, efficace en combat.", price: 42, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 1 } },
        { tier: 1, name: "Fronde", desc: "Une fronde simple avec des projectiles.", price: 24, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 1 } },
        { tier: 1, name: "Épieu de chasse", desc: "Un épieu pointu pour chasser le gibier.", price: 48, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 2 } },
        { tier: 1, name: "Cimeterre rouillé", desc: "Une lame incurvée, bien qu'ancienne.", price: 90, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2 } },
        { tier: 1, name: "Marteau de forgeron", desc: "Lourd et solide, parfait pour marteler.", price: 54, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 2 } },
        { tier: 1, name: "Serpe", desc: "Une petite faux pour couper les broussailles.", price: 36, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 1 } },
        { tier: 1, name: "Bâton ferré", desc: "Un bâton renforcé de fer aux extrémités.", price: 60, type: "weapon", category: "simple", slot: "mainhand", stats: { atk: 2 } },

        // TIER 2 - Uncommon weapons (60-180 gold)
        { tier: 2, name: "Epee longue", desc: "Une lame de qualité, forgée par un artisan.", price: 360, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3 } },
        { tier: 2, name: "Arc de chasse", desc: "Un arc fiable pour la chasse et le combat.", price: 240, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2, dex: 1 } },
        { tier: 2, name: "Hache de bataille", desc: "Une hache lourde à double tranchant.", price: 330, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3 } },
        { tier: 2, name: "Rapière élégante", desc: "Une lame fine pour l'escrime.", price: 285, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2, dex: 2 } },
        { tier: 2, name: "Arbalète lourde", desc: "Puissante mais lente à recharger.", price: 390, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 4 } },
        { tier: 2, name: "Fléau d'armes", desc: "Une chaîne avec une boule cloutée.", price: 300, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3 } },
        { tier: 2, name: "Cimeterre forgé", desc: "Lame incurvée bien entretenue.", price: 315, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3 } },
        { tier: 2, name: "Hallebarde", desc: "Une arme d'hast polyvalente.", price: 345, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3 } },
        { tier: 2, name: "Morgenstern", desc: "Une masse avec des pointes acérées.", price: 375, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3 } },
        { tier: 2, name: "Arc long", desc: "Un grand arc pour tir à longue portée.", price: 420, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3, dex: 1 } },
        { tier: 2, name: "Trident de pêcheur", desc: "Un trident aux dents acérées.", price: 270, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2, dex: 1 } },
        { tier: 2, name: "Masse étoilée", desc: "Boule hérissée de pointes sur un manche.", price: 330, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3 } },
        { tier: 2, name: "Épée bâtarde", desc: "Peut être maniée à une ou deux mains.", price: 450, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 4 } },
        { tier: 2, name: "Katana", desc: "Lame incurvée de tradition orientale.", price: 435, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3, dex: 1 } },
        { tier: 2, name: "Dague empoisonnée", desc: "Lame fine avec réservoir de poison.", price: 405, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2, dex: 1 } },
        { tier: 2, name: "Lance de cavalerie", desc: "Longue lance pour charge montée.", price: 300, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3 } },
        { tier: 2, name: "Bâton de combat", desc: "Bâton renforcé pour les moines.", price: 255, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2, wis: 2 } },
        { tier: 2, name: "Coutelas de pirate", desc: "Lame courbe pour combat rapproché.", price: 285, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2, dex: 1 } },
        { tier: 2, name: "Marteau de guerre léger", desc: "Marteau à une main bien équilibré.", price: 360, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3 } },
        { tier: 2, name: "Javeline", desc: "Lance de jet avec bon équilibre.", price: 225, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2, dex: 1 } },
        { tier: 2, name: "Sceptre de mage", desc: "Sceptre canalisant l'énergie magique.", price: 480, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2, int: 2 } },
        { tier: 2, name: "Fouet à pointes", desc: "Fouet garni de lames acérées.", price: 315, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2, dex: 2 } },
        { tier: 2, name: "Pic de guerre", desc: "Pic lourd pour percer les armures.", price: 345, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3 } },
        { tier: 2, name: "Kukri jumeau", desc: "Paire de lames incurvées.", price: 420, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 2, dex: 2 } },

        // TIER 3 - Rare weapons (250-500 gold)
        { tier: 3, name: "Lame d'acier elfique", desc: "Une épée fine aux reflets argentés.", price: 1050, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 4, dex: 1 } },
        { tier: 3, name: "Marteau de guerre", desc: "Une arme dévastatrice pour les guerriers.", price: 1200, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 5 } },
        { tier: 3, name: "Arc composite elfique", desc: "Arc renforcé par magie elfique.", price: 1260, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 4, dex: 2 } },
        { tier: 3, name: "Claymore", desc: "Grande épée à deux mains des highlands.", price: 1140, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 5 } },
        { tier: 3, name: "Hache double", desc: "Hache à deux lames pour guerriers expérimentés.", price: 1170, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 5 } },
        { tier: 3, name: "Katana forgé par maître", desc: "Lame parfaitement équilibrée.", price: 1350, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 4, dex: 2 } },
        { tier: 3, name: "Bâton du sage", desc: "Bâton gravé de runes anciennes.", price: 1230, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3, int: 3 } },
        { tier: 3, name: "Rapière enchantée", desc: "Lame légère chargée de magie.", price: 1290, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 3, dex: 3 } },
        { tier: 3, name: "Arbalète mécanique", desc: "Arbalète à rechargement automatique.", price: 1380, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 5, dex: 1 } },
        { tier: 3, name: "Morgenstern enchanté", desc: "Masse magique aux pointes brillantes.", price: 1200, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 5 } },
        { tier: 3, name: "Lance de dragon", desc: "Lance forgée dans des écailles de dragon.", price: 1440, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 5, str: 1 } },
        { tier: 3, name: "Trident de Neptune", desc: "Trident argenté canalisant l'eau.", price: 1320, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 4, wis: 2 } },
        { tier: 3, name: "Épée flamboyante", desc: "Lame ondulée aux reflets de feu.", price: 1410, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 4, cha: 2 } },
        { tier: 3, name: "Arc de glace", desc: "Arc magique tirant des flèches de givre.", price: 1365, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 4, int: 2 } },
        { tier: 3, name: "Faux de la mort", desc: "Grande faux à la lame sombre.", price: 1305, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 5 } },

        // TIER 4 - Legendary weapons (600-1500 gold)
        { tier: 4, name: "Lame runique", desc: "Gravée de runes anciennes qui luisent faiblement.", price: 2400, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 6, int: 2 } },
        { tier: 4, name: "Excalibur", desc: "Épée légendaire des rois.", price: 3600, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 7, cha: 3 } },
        { tier: 4, name: "Marteau de Thor", desc: "Marteau divin frappant comme la foudre.", price: 3300, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 8 } },
        { tier: 4, name: "Arc d'Artémis", desc: "Arc béni par la déesse de la chasse.", price: 2850, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 6, dex: 3 } },
        { tier: 4, name: "Lame des ombres", desc: "Épée noire absorbant la lumière.", price: 3150, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 6, dex: 2, int: 1 } },
        { tier: 4, name: "Sceptre suprême", desc: "Sceptre pulsant de puissance arcanique.", price: 3900, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 5, int: 4 } },
        { tier: 4, name: "Hache du berserker", desc: "Hache maudite augmentant la rage.", price: 2700, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 7, str: 2 } },
        { tier: 4, name: "Épée sainte", desc: "Lame bénite repoussant le mal.", price: 3450, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 6, wis: 3 } },
        { tier: 4, name: "Trident de Poséidon", desc: "Arme du dieu des mers.", price: 3750, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 7, wis: 2 } },
        { tier: 4, name: "Arc du phénix", desc: "Arc tirant des flèches enflammées.", price: 3000, type: "weapon", category: "martial", slot: "mainhand", stats: { atk: 6, dex: 2, int: 2 } },
    ];

    // Armors (VASTLY EXPANDED - 45+ items)
    const armors = [
        // TIER 1 - Light armors (15-60 gold)
        { tier: 1, name: "Tunique renforcee", desc: "Une tunique avec des plaques de cuir.", price: 75, type: "armor", category: "light", slot: "chest", stats: { ac: 1 } },
        { tier: 1, name: "Armure de cuir", desc: "Protection basique mais fiable.", price: 135, type: "armor", category: "light", slot: "chest", stats: { ac: 2 } },
        { tier: 1, name: "Veste en toile épaisse", desc: "Tissu résistant offrant protection minimale.", price: 54, type: "armor", category: "light", slot: "chest", stats: { ac: 1 } },
        { tier: 1, name: "Cuir souple", desc: "Armure légère pour voyageurs.", price: 105, type: "armor", category: "light", slot: "chest", stats: { ac: 1, dex: 1 } },
        { tier: 1, name: "Brigandine simple", desc: "Lamelles de métal sous tissu.", price: 150, type: "armor", category: "light", slot: "chest", stats: { ac: 2 } },
        { tier: 1, name: "Gambison", desc: "Vêtement matelassé absorbant les coups.", price: 90, type: "armor", category: "light", slot: "chest", stats: { ac: 1 } },
        { tier: 1, name: "Cuir tanné", desc: "Cuir traité résistant à l'eau.", price: 120, type: "armor", category: "light", slot: "chest", stats: { ac: 1 } },
        { tier: 1, name: "Manteau renforcé", desc: "Long manteau avec protections cachées.", price: 126, type: "armor", category: "light", slot: "chest", stats: { ac: 1, dex: 1 } },

        // TIER 2 - Medium armors (100-250 gold)
        { tier: 2, name: "Cotte de mailles legere", desc: "Mailles fines offrant bonne protection.", price: 450, type: "armor", category: "medium", slot: "chest", stats: { ac: 3 } },
        { tier: 2, name: "Plastron de cuir cloute", desc: "Cuir renforce de clous metalliques.", price: 540, type: "armor", category: "medium", slot: "chest", stats: { ac: 3, con: 1 } },
        { tier: 2, name: "Armure d'écailles", desc: "Écailles métalliques sur cuir.", price: 495, type: "armor", category: "medium", slot: "chest", stats: { ac: 3 } },
        { tier: 2, name: "Brigandine renforcée", desc: "Plaques d'acier rivetées sur tissu.", price: 570, type: "armor", category: "medium", slot: "chest", stats: { ac: 3 } },
        { tier: 2, name: "Cotte de mailles", desc: "Armure de mailles traditionnelle.", price: 600, type: "armor", category: "medium", slot: "chest", stats: { ac: 4 } },
        { tier: 2, name: "Plastron de bronze", desc: "Armure de métal poli.", price: 660, type: "armor", category: "medium", slot: "chest", stats: { ac: 4 } },
        { tier: 2, name: "Cuir de dragon jeune", desc: "Écailles souples mais résistantes.", price: 720, type: "armor", category: "medium", slot: "chest", stats: { ac: 4, dex: 1 } },
        { tier: 2, name: "Armure lamellaire", desc: "Lamelles de métal laquées.", price: 525, type: "armor", category: "medium", slot: "chest", stats: { ac: 3 } },
        { tier: 2, name: "Cuirasse de guerre", desc: "Torse renforcé de plaques.", price: 630, type: "armor", category: "medium", slot: "chest", stats: { ac: 4 } },
        { tier: 2, name: "Harnois partiel", desc: "Plaques sur zones vitales.", price: 690, type: "armor", category: "medium", slot: "chest", stats: { ac: 4 } },

        // TIER 3 - Heavy & Rare armors (350-650 gold)
        { tier: 3, name: "Harnois leger", desc: "Armure de plates bien ajustee.", price: 1350, type: "armor", category: "heavy", slot: "chest", stats: { ac: 5 } },
        { tier: 3, name: "Armure de plates complète", desc: "Protection totale articulée.", price: 1650, type: "armor", category: "heavy", slot: "chest", stats: { ac: 6 } },
        { tier: 3, name: "Cotte de mailles elfique", desc: "Mailles fines comme de la soie.", price: 1440, type: "armor", category: "medium", slot: "chest", stats: { ac: 5, dex: 2 } },
        { tier: 3, name: "Armure de mithril", desc: "Métal léger et ultra-résistant.", price: 1860, type: "armor", category: "light", slot: "chest", stats: { ac: 5, dex: 2 } },
        { tier: 3, name: "Cuirasse du chevalier", desc: "Armure ornée d'armoiries.", price: 1500, type: "armor", category: "heavy", slot: "chest", stats: { ac: 5, cha: 1 } },
        { tier: 3, name: "Armure de plates naines", desc: "Forgée par maîtres nains.", price: 1740, type: "armor", category: "heavy", slot: "chest", stats: { ac: 6, con: 1 } },
        { tier: 3, name: "Cuir de dragon adulte", desc: "Écailles quasi-impénétrables.", price: 1800, type: "armor", category: "medium", slot: "chest", stats: { ac: 5, dex: 1 } },
        { tier: 3, name: "Harnois gothique", desc: "Armure à cannelures protectrices.", price: 1590, type: "armor", category: "heavy", slot: "chest", stats: { ac: 6 } },
        { tier: 3, name: "Armure adamantine", desc: "Métal noir extrêmement dur.", price: 1920, type: "armor", category: "heavy", slot: "chest", stats: { ac: 6, str: 1 } },
        { tier: 3, name: "Robe de l'archimage", desc: "Tissus magiques protecteurs.", price: 1560, type: "armor", category: "light", slot: "chest", stats: { ac: 4, int: 3 } },

        // TIER 4 - Legendary armors (900-1800 gold)
        { tier: 4, name: "Armure de plates ouvragee", desc: "Chef-d'oeuvre de forgerons nains.", price: 3600, type: "armor", category: "heavy", slot: "chest", stats: { ac: 6, con: 2 } },
        { tier: 4, name: "Armure céleste", desc: "Armure bénie par les dieux.", price: 4500, type: "armor", category: "heavy", slot: "chest", stats: { ac: 7, wis: 2, cha: 2 } },
        { tier: 4, name: "Écailles de dragon ancien", desc: "Armure quasi-indestructible.", price: 4050, type: "armor", category: "medium", slot: "chest", stats: { ac: 7, con: 2, dex: 1 } },
        { tier: 4, name: "Mithril enchanté", desc: "Métal magique ultra-léger.", price: 4350, type: "armor", category: "light", slot: "chest", stats: { ac: 6, dex: 3, int: 2 } },
        { tier: 4, name: "Armure du héros", desc: "Forgée pour les champions.", price: 4800, type: "armor", category: "heavy", slot: "chest", stats: { ac: 8, str: 2 } },
        { tier: 4, name: "Robe de l'oracle", desc: "Vêtements divins protégeant l'esprit.", price: 3900, type: "armor", category: "light", slot: "chest", stats: { ac: 5, wis: 4 } },
        { tier: 4, name: "Armure dimensionnelle", desc: "Phasage entre dimensions.", price: 4650, type: "armor", category: "medium", slot: "chest", stats: { ac: 7, dex: 2, int: 2 } },
        { tier: 4, name: "Harnois runique", desc: "Runes de protection gravées.", price: 4200, type: "armor", category: "heavy", slot: "chest", stats: { ac: 7, con: 2, int: 1 } },
        { tier: 4, name: "Armure vivante", desc: "Armure organique s'adaptant au porteur.", price: 4950, type: "armor", category: "medium", slot: "chest", stats: { ac: 7, con: 3 } },
        { tier: 4, name: "Peau de titan", desc: "Cuir d'un être légendaire.", price: 5100, type: "armor", category: "light", slot: "chest", stats: { ac: 6, str: 2, dex: 2 } },
    ];

    // Shields (EXPANDED - 18+ items)
    const shields = [
        // TIER 1 - Common shields (15-50 gold)
        { tier: 1, name: "Bouclier en bois", desc: "Un bouclier simple mais solide.", price: 60, type: "shield", category: "shield", slot: "offhand", stats: { ac: 1 } },
        { tier: 1, name: "Targe", desc: "Petit bouclier rond pour parer.", price: 75, type: "shield", category: "shield", slot: "offhand", stats: { ac: 1, dex: 1 } },
        { tier: 1, name: "Rondache", desc: "Bouclier circulaire en fer.", price: 90, type: "shield", category: "shield", slot: "offhand", stats: { ac: 1 } },
        { tier: 1, name: "Écu de milice", desc: "Bouclier standard des gardes.", price: 105, type: "shield", category: "shield", slot: "offhand", stats: { ac: 1 } },
        { tier: 1, name: "Buckler", desc: "Très petit bouclier pour duellistes.", price: 66, type: "shield", category: "shield", slot: "offhand", stats: { dex: 1 } },

        // TIER 2 - Uncommon shields (80-180 gold)
        { tier: 2, name: "Bouclier cercle de fer", desc: "Bouclier renforce de metal.", price: 240, type: "shield", category: "shield", slot: "offhand", stats: { ac: 2 } },
        { tier: 2, name: "Pavois", desc: "Grand bouclier protégeant tout le corps.", price: 420, type: "shield", category: "shield", slot: "offhand", stats: { ac: 3 } },
        { tier: 2, name: "Écu armorié", desc: "Bouclier portant des armoiries nobles.", price: 450, type: "shield", category: "shield", slot: "offhand", stats: { ac: 2, cha: 1 } },
        { tier: 2, name: "Bouclier à pointes", desc: "Bordé de pointes acérées.", price: 405, type: "shield", category: "shield", slot: "offhand", stats: { ac: 2, atk: 1 } },
        { tier: 2, name: "Heaume de fer", desc: "Bouclier lourd en fer forgé.", price: 375, type: "shield", category: "shield", slot: "offhand", stats: { ac: 2 } },

        // TIER 3 - Rare shields (250-600 gold)
        { tier: 3, name: "Ecu de chevalier", desc: "Un bouclier orne d'armoiries.", price: 750, type: "shield", category: "shield", slot: "offhand", stats: { ac: 3 } },
        { tier: 3, name: "Bouclier en acier elfique", desc: "Léger mais très résistant.", price: 1350, type: "shield", category: "shield", slot: "offhand", stats: { ac: 3, dex: 1 } },
        { tier: 3, name: "Écu de mithril", desc: "Bouclier en métal magique.", price: 1560, type: "shield", category: "shield", slot: "offhand", stats: { ac: 3, dex: 2 } },
        { tier: 3, name: "Pavois enchanté", desc: "Grand bouclier magiquement renforcé.", price: 1440, type: "shield", category: "shield", slot: "offhand", stats: { ac: 4 } },
        { tier: 3, name: "Bouclier de dragon", desc: "Forgé dans une écaille de dragon.", price: 1650, type: "shield", category: "shield", slot: "offhand", stats: { ac: 3, con: 2 } },

        // TIER 4 - Legendary shields (800-1500 gold)
        { tier: 4, name: "Aegis", desc: "Bouclier légendaire des héros.", price: 3600, type: "shield", category: "shield", slot: "offhand", stats: { ac: 4, con: 2 } },
        { tier: 4, name: "Bouclier de lumière", desc: "Émettant une aura protectrice.", price: 3300, type: "shield", category: "shield", slot: "offhand", stats: { ac: 4, wis: 2 } },
        { tier: 4, name: "Bouclier miroir", desc: "Réfléchit les sorts ennemis.", price: 4050, type: "shield", category: "shield", slot: "offhand", stats: { ac: 3, int: 3 } },
        { tier: 4, name: "Égide divine", desc: "Bouclier béni par les dieux.", price: 4350, type: "shield", category: "shield", slot: "offhand", stats: { ac: 5, wis: 2 } },
    ];

    // Consumables (MASSIVELY EXPANDED - 60+ items)
    const consumables = [
        // TIER 1 - Basic consumables (5-50 gold)
        { tier: 1, name: "Potion de soin mineure", desc: "Restaure 2d4+2 PV.", price: 75, type: "consumable", slot: "none", stats: {}, effect: "heal", healDice: "2d4+2" },
        { tier: 1, name: "Antidote", desc: "Guerit les poisons mineurs.", price: 90, type: "consumable", slot: "none", stats: {}, effect: "cure_poison" },
        { tier: 1, name: "Ration de voyage", desc: "Nourriture pour une journee.", price: 15, type: "consumable", slot: "none", stats: {} },
        { tier: 1, name: "Eau bénite", desc: "Nuit aux morts-vivants.", price: 105, type: "consumable", slot: "none", stats: {}, effect: "holy_water" },
        { tier: 1, name: "Huile de torche", desc: "Brûle pendant des heures.", price: 24, type: "consumable", slot: "none", stats: {} },
        { tier: 1, name: "Corde (15m)", desc: "Solide et résistante.", price: 30, type: "consumable", slot: "none", stats: {} },
        { tier: 1, name: "Bandages", desc: "Pour soigner les blessures légères.", price: 36, type: "consumable", slot: "none", stats: {}, effect: "heal", healDice: "1d4+1" },
        { tier: 1, name: "Kit de premiers soins", desc: "Matériel médical basique.", price: 120, type: "consumable", slot: "none", stats: {}, effect: "heal", healDice: "1d6+2" },
        { tier: 1, name: "Gourde d'eau", desc: "Eau fraîche et potable.", price: 18, type: "consumable", slot: "none", stats: {} },
        { tier: 1, name: "Pierre à aiguiser", desc: "Pour entretenir les lames.", price: 45, type: "consumable", slot: "none", stats: {} },
        { tier: 1, name: "Savon", desc: "Pour l'hygiène quotidienne.", price: 9, type: "consumable", slot: "none", stats: {} },
        { tier: 1, name: "Sel (sachet)", desc: "Pour conserver la nourriture.", price: 12, type: "consumable", slot: "none", stats: {} },
        { tier: 1, name: "Herbes médicinales", desc: "Plantes aux propriétés curatives.", price: 54, type: "consumable", slot: "none", stats: {}, effect: "heal", healDice: "1d4" },
        { tier: 1, name: "Potion de courage", desc: "Réduit la peur temporairement.", price: 84, type: "consumable", slot: "none", stats: {}, effect: "resist_fear" },
        { tier: 1, name: "Torche x5", desc: "Lot de 5 torches.", price: 30, type: "consumable", slot: "none", stats: {} },

        // TIER 2 - Improved consumables (60-200 gold)
        { tier: 2, name: "Potion de soin", desc: "Restaure 4d4+4 PV.", price: 225, type: "consumable", slot: "none", stats: {}, effect: "heal", healDice: "4d4+4" },
        { tier: 2, name: "Potion d'energie", desc: "Restaure 20 points de ressource.", price: 180, type: "consumable", slot: "none", stats: {}, effect: "restore_resource" },
        { tier: 2, name: "Antidote majeur", desc: "Guérit les poisons graves.", price: 270, type: "consumable", slot: "none", stats: {}, effect: "cure_strong_poison" },
        { tier: 2, name: "Potion d'agilité", desc: "+2 DEX pendant 1 heure.", price: 330, type: "consumable", slot: "none", stats: { dex: 2 }, effect: "buff_temp" },
        { tier: 2, name: "Potion de résistance", desc: "Résistance aux éléments (1h).", price: 375, type: "consumable", slot: "none", stats: {}, effect: "resist_elements" },
        { tier: 2, name: "Onguent de guérison", desc: "Soigne sur la durée (3d6 PV/heure x 3h).", price: 285, type: "consumable", slot: "none", stats: {}, effect: "heal_over_time" },
        { tier: 2, name: "Parchemin de Projectile magique", desc: "Lance 3 projectiles (1d4+1 chacun).", price: 255, type: "consumable", slot: "none", stats: {}, effect: "magic_missile" },
        { tier: 2, name: "Parchemin de Bouclier", desc: "+4 CA pendant 10 minutes.", price: 300, type: "consumable", slot: "none", stats: {}, effect: "temp_ac" },
        { tier: 2, name: "Potion d'invisibilité mineure", desc: "Invisibilité pendant 1 minute.", price: 540, type: "consumable", slot: "none", stats: {}, effect: "invisibility" },
        { tier: 2, name: "Élixir de vision", desc: "Vision dans le noir (2h).", price: 315, type: "consumable", slot: "none", stats: {}, effect: "darkvision" },
        { tier: 2, name: "Potion de respiration aquatique", desc: "Respirez sous l'eau (1h).", price: 345, type: "consumable", slot: "none", stats: {}, effect: "water_breathing" },
        { tier: 2, name: "Baume régénérant", desc: "Régénération de 1 PV/tour pendant 10 tours.", price: 360, type: "consumable", slot: "none", stats: {}, effect: "regen" },
        { tier: 2, name: "Potion de lévitation", desc: "Flottez dans les airs (10 min).", price: 405, type: "consumable", slot: "none", stats: {}, effect: "levitation" },
        { tier: 2, name: "Huile magique", desc: "Arme +1 pendant 1 heure.", price: 420, type: "consumable", slot: "none", stats: {}, effect: "weapon_oil" },
        { tier: 2, name: "Poudre de disparition", desc: "Crée un nuage de fumée opaque.", price: 225, type: "consumable", slot: "none", stats: {}, effect: "smoke_cloud" },
        { tier: 2, name: "Pierre lumineuse", desc: "Émet de la lumière pendant 12h.", price: 195, type: "consumable", slot: "none", stats: {} },
        { tier: 2, name: "Potion de rapidité", desc: "+10 vitesse pendant 1 minute.", price: 450, type: "consumable", slot: "none", stats: {}, effect: "speed_boost" },
        { tier: 2, name: "Élixir d'endurance", desc: "+2 CON pendant 8 heures.", price: 330, type: "consumable", slot: "none", stats: { con: 2 }, effect: "buff_temp" },

        // TIER 3 - Rare consumables (250-600 gold)
        { tier: 3, name: "Potion de soin superieure", desc: "Restaure 8d4+8 PV.", price: 600, type: "consumable", slot: "none", stats: {}, effect: "heal", healDice: "8d4+8" },
        { tier: 3, name: "Elixir de force", desc: "+2 FOR pendant 1 heure.", price: 450, type: "consumable", slot: "none", stats: { str: 2 }, effect: "buff_temp" },
        { tier: 3, name: "Potion d'héroïsme", desc: "+4 FOR, +4 DEX, +4 CON (10 min).", price: 1200, type: "consumable", slot: "none", stats: { str: 4, dex: 4, con: 4 }, effect: "buff_temp" },
        { tier: 3, name: "Parchemin de Boule de feu", desc: "8d6 dégâts de feu dans une zone.", price: 1050, type: "consumable", slot: "none", stats: {}, effect: "fireball" },
        { tier: 3, name: "Parchemin de Téléportation", desc: "Téléportation jusqu'à 100m.", price: 1350, type: "consumable", slot: "none", stats: {}, effect: "teleport" },
        { tier: 3, name: "Potion de vol", desc: "Vitesse de vol 60 pieds (1h).", price: 1140, type: "consumable", slot: "none", stats: {}, effect: "fly" },
        { tier: 3, name: "Élixir de géant", desc: "Taille et force de géant (10 min).", price: 1260, type: "consumable", slot: "none", stats: { str: 6 }, effect: "giant_strength" },
        { tier: 3, name: "Potion de résurrection partielle", desc: "Stabilise un mourant à 1 PV.", price: 1500, type: "consumable", slot: "none", stats: {}, effect: "revive" },
        { tier: 3, name: "Antidote universel", desc: "Guérit tous poisons et maladies.", price: 960, type: "consumable", slot: "none", stats: {}, effect: "cure_all" },
        { tier: 3, name: "Potion de clairvoyance", desc: "Vision d'un lieu éloigné (10 min).", price: 1080, type: "consumable", slot: "none", stats: {}, effect: "clairvoyance" },
        { tier: 3, name: "Élixir d'invulnérabilité mineure", desc: "Résistance à tous dégâts (1 min).", price: 1650, type: "consumable", slot: "none", stats: {}, effect: "damage_resist" },
        { tier: 3, name: "Potion de forme gazeuse", desc: "Transforme en brume (1h).", price: 1020, type: "consumable", slot: "none", stats: {}, effect: "gaseous_form" },
        { tier: 3, name: "Parchemin de Foudre", desc: "10d8 dégâts électriques en ligne.", price: 1170, type: "consumable", slot: "none", stats: {}, effect: "lightning" },
        { tier: 3, name: "Pierre de rappel", desc: "Retour instantané à un point marqué.", price: 1320, type: "consumable", slot: "none", stats: {}, effect: "recall" },

        // TIER 4 - Legendary consumables (700-2000 gold)
        { tier: 4, name: "Potion de soin supreme", desc: "Restaure 10d4+20 PV.", price: 1500, type: "consumable", slot: "none", stats: {}, effect: "heal", healDice: "10d4+20" },
        { tier: 4, name: "Élixir d'immortalité temporaire", desc: "Impossible de mourir pendant 1 minute.", price: 5400, type: "consumable", slot: "none", stats: {}, effect: "death_ward" },
        { tier: 4, name: "Potion de guérison complète", desc: "PV maximum restaurés.", price: 2850, type: "consumable", slot: "none", stats: {}, effect: "full_heal" },
        { tier: 4, name: "Parchemin de Résurrection", desc: "Ramène un mort à la vie.", price: 4500, type: "consumable", slot: "none", stats: {}, effect: "resurrect" },
        { tier: 4, name: "Philtre d'invincibilité", desc: "+5 à toutes caractéristiques (10 min).", price: 3600, type: "consumable", slot: "none", stats: { str: 5, dex: 5, con: 5, int: 5, wis: 5, cha: 5 }, effect: "buff_temp" },
        { tier: 4, name: "Parchemin de Souhait mineur", desc: "Exauce un souhait limité.", price: 6000, type: "consumable", slot: "none", stats: {}, effect: "wish_minor" },
        { tier: 4, name: "Potion de transcendance", desc: "Forme éthérée (10 min).", price: 4050, type: "consumable", slot: "none", stats: {}, effect: "ethereal" },
        { tier: 4, name: "Élixir du titan", desc: "Force 25 pendant 1 minute.", price: 4350, type: "consumable", slot: "none", stats: { str: 10 }, effect: "titan_strength" },
        { tier: 4, name: "Parchemin d'Arrêt du temps", desc: "Fige le temps pendant 1d4+1 tours.", price: 5250, type: "consumable", slot: "none", stats: {}, effect: "time_stop" },
        { tier: 4, name: "Potion de régénération suprême", desc: "Régénère 10 PV/tour pendant 10 tours.", price: 3300, type: "consumable", slot: "none", stats: {}, effect: "supreme_regen" },
    ];

    // Accessories (MASSIVELY EXPANDED - 50+ items)
    const accessories = [
        // TIER 1 - Common accessories (15-60 gold)
        { tier: 1, name: "Anneau simple", desc: "Un anneau de bronze basique.", price: 60, type: "ring", slot: "ring", stats: {} },
        { tier: 1, name: "Collier de cuir", desc: "Simple collier avec pendentif.", price: 54, type: "amulet", slot: "neck", stats: {} },
        { tier: 1, name: "Gants de travail", desc: "Gants robustes pour les tâches.", price: 45, type: "gloves", slot: "hands", stats: {} },
        { tier: 1, name: "Ceinture en cuir", desc: "Ceinture fonctionnelle.", price: 36, type: "belt", slot: "waist", stats: {} },
        { tier: 1, name: "Bottes de marche", desc: "Bottes confortables pour voyager.", price: 75, type: "boots", slot: "feet", stats: {} },
        { tier: 1, name: "Cape de voyageur", desc: "Cape protégeant de la pluie.", price: 66, type: "cloak", slot: "back", stats: {} },
        { tier: 1, name: "Bracelet de fer", desc: "Simple bracelet métallique.", price: 48, type: "bracers", slot: "wrists", stats: {} },

        // TIER 2 - Uncommon accessories (80-250 gold)
        { tier: 2, name: "Anneau de protection", desc: "Un anneau qui renforce les defenses.", price: 300, type: "ring", slot: "ring", stats: { ac: 1 } },
        { tier: 2, name: "Amulette de vitalite", desc: "Augmente la resistance.", price: 360, type: "amulet", slot: "neck", stats: { con: 1 } },
        { tier: 2, name: "Gants du guerrier", desc: "Améliore la prise d'arme.", price: 330, type: "gloves", slot: "hands", stats: { str: 1 } },
        { tier: 2, name: "Ceinture de force", desc: "Renforce le porteur.", price: 390, type: "belt", slot: "waist", stats: { str: 1, con: 1 } },
        { tier: 2, name: "Bottes de l'éclaireur", desc: "Augmente la vitesse de déplacement.", price: 420, type: "boots", slot: "feet", stats: { dex: 1 } },
        { tier: 2, name: "Cape de résistance", desc: "Protège des éléments.", price: 450, type: "cloak", slot: "back", stats: { con: 1 } },
        { tier: 2, name: "Bracelet de dextérité", desc: "Assouplit les mouvements.", price: 345, type: "bracers", slot: "wrists", stats: { dex: 1 } },
        { tier: 2, name: "Anneau de sagesse", desc: "Clarifie l'esprit.", price: 375, type: "ring", slot: "ring", stats: { wis: 1 } },
        { tier: 2, name: "Pendentif du voyant", desc: "Améliore la perception.", price: 405, type: "amulet", slot: "neck", stats: { wis: 1 } },
        { tier: 2, name: "Gants de pickpocket", desc: "Doigts plus agiles.", price: 435, type: "gloves", slot: "hands", stats: { dex: 2 } },
        { tier: 2, name: "Ceinture d'aventurier", desc: "Nombreuses poches utiles.", price: 315, type: "belt", slot: "waist", stats: {} },
        { tier: 2, name: "Bottes elfiques", desc: "Pas silencieux.", price: 465, type: "boots", slot: "feet", stats: { dex: 2 } },
        { tier: 2, name: "Cape du diplomate", desc: "Facilite les négociations.", price: 420, type: "cloak", slot: "back", stats: { cha: 1 } },
        { tier: 2, name: "Bracelet de mage", desc: "Canalise la magie.", price: 480, type: "bracers", slot: "wrists", stats: { int: 1 } },
        { tier: 2, name: "Anneau de charme", desc: "Rend plus charismatique.", price: 384, type: "ring", slot: "ring", stats: { cha: 1 } },
        { tier: 2, name: "Médaillon de foi", desc: "Renforce la conviction.", price: 414, type: "amulet", slot: "neck", stats: { wis: 1, cha: 1 } },

        // TIER 3 - Rare accessories (300-700 gold)
        { tier: 3, name: "Cape de l'ombre", desc: "Aide a se fondre dans l'obscurite.", price: 900, type: "cloak", slot: "back", stats: { dex: 2 } },
        { tier: 3, name: "Anneau de puissance elfique", desc: "Renforce les capacités martiales.", price: 1350, type: "ring", slot: "ring", stats: { str: 2, dex: 2 } },
        { tier: 3, name: "Amulette du dragon", desc: "Écaille de dragon protectrice.", price: 1560, type: "amulet", slot: "neck", stats: { ac: 2, con: 2 } },
        { tier: 3, name: "Gants des arcanes", desc: "Amplifie les sorts.", price: 1440, type: "gloves", slot: "hands", stats: { int: 2 } },
        { tier: 3, name: "Ceinture du titan", desc: "Force surhumaine.", price: 1650, type: "belt", slot: "waist", stats: { str: 3 } },
        { tier: 3, name: "Bottes de rapidité", desc: "Vitesse accrue.", price: 1260, type: "boots", slot: "feet", stats: { dex: 3 } },
        { tier: 3, name: "Cape du mage", desc: "Résistance magique.", price: 1470, type: "cloak", slot: "back", stats: { int: 2, wis: 1 } },
        { tier: 3, name: "Bracelet de protection", desc: "Barrière magique.", price: 1230, type: "bracers", slot: "wrists", stats: { ac: 2 } },
        { tier: 3, name: "Anneau de télékinésie", desc: "Déplace les objets par la pensée.", price: 1740, type: "ring", slot: "ring", stats: { int: 2 } },
        { tier: 3, name: "Médaillon d'invisibilité", desc: "Invisibilité 1x/jour (1 min).", price: 1950, type: "amulet", slot: "neck", stats: {} },
        { tier: 3, name: "Gants de force de géant", desc: "Force prodigieuse.", price: 1680, type: "gloves", slot: "hands", stats: { str: 3 } },
        { tier: 3, name: "Ceinture de régénération", desc: "Guérison accélérée.", price: 1860, type: "belt", slot: "waist", stats: { con: 3 } },
        { tier: 3, name: "Bottes de lévitation", desc: "Marche sur l'air.", price: 1620, type: "boots", slot: "feet", stats: {} },
        { tier: 3, name: "Cape de déplacement", desc: "Images illusoires.", price: 1410, type: "cloak", slot: "back", stats: { ac: 2, dex: 1 } },
        { tier: 3, name: "Bracelet de stockage", desc: "Espace dimensionnel pour objets.", price: 1500, type: "bracers", slot: "wrists", stats: {} },

        // TIER 4 - Legendary accessories (800-1800 gold)
        { tier: 4, name: "Anneau de puissance", desc: "Renforce les attaques magiques.", price: 1800, type: "ring", slot: "ring", stats: { int: 3 } },
        { tier: 4, name: "Anneau du pouvoir suprême", desc: "Maîtrise absolue de la magie.", price: 4500, type: "ring", slot: "ring", stats: { int: 4, wis: 3 } },
        { tier: 4, name: "Amulette du phénix", desc: "Résurrection automatique 1x.", price: 4800, type: "amulet", slot: "neck", stats: { con: 3 } },
        { tier: 4, name: "Gants de l'archimage", desc: "Sorts plus puissants (+2 niveaux).", price: 4200, type: "gloves", slot: "hands", stats: { int: 4 } },
        { tier: 4, name: "Ceinture du colosse", desc: "Force de titan.", price: 3900, type: "belt", slot: "waist", stats: { str: 5 } },
        { tier: 4, name: "Bottes ailées", desc: "Vol illimité.", price: 4350, type: "boots", slot: "feet", stats: { dex: 3 } },
        { tier: 4, name: "Cape d'invincibilité", desc: "Immunité aux dégâts 1x/jour (1 tour).", price: 5100, type: "cloak", slot: "back", stats: { ac: 3 } },
        { tier: 4, name: "Bracelet des éléments", desc: "Contrôle sur tous les éléments.", price: 4050, type: "bracers", slot: "wrists", stats: { int: 3, wis: 2 } },
        { tier: 4, name: "Anneau de souhait", desc: "1 souhait accordé.", price: 5400, type: "ring", slot: "ring", stats: {} },
        { tier: 4, name: "Médaillon de l'immortel", desc: "Immunité vieillissement et maladies.", price: 3750, type: "amulet", slot: "neck", stats: { con: 4 } },
        { tier: 4, name: "Gants du voleur légendaire", desc: "Dextérité surhumaine.", price: 3600, type: "gloves", slot: "hands", stats: { dex: 5 } },
        { tier: 4, name: "Ceinture de dimension", desc: "Stockage dimensionnel illimité.", price: 3300, type: "belt", slot: "waist", stats: {} },
        { tier: 4, name: "Bottes de téléportation", desc: "Téléportation à volonté.", price: 4650, type: "boots", slot: "feet", stats: { dex: 2 } },
        { tier: 4, name: "Cape du temps", desc: "Ralentit le temps autour de vous.", price: 4950, type: "cloak", slot: "back", stats: { dex: 3, int: 3 } },
        { tier: 4, name: "Bracelet divin", desc: "Lien avec les dieux.", price: 4440, type: "bracers", slot: "wrists", stats: { wis: 4, cha: 3 } },
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

    items.push(...selectItems(weapons, 5 + Math.floor(Math.random() * 4)));
    items.push(...selectItems(armors, 5 + Math.floor(Math.random() * 3)));
    items.push(...selectItems(shields, 3 + Math.floor(Math.random() * 2)));
    items.push(...selectItems(consumables, 6 + Math.floor(Math.random() * 3)));
    if (tier >= 2) items.push(...selectItems(accessories, 5 + Math.floor(Math.random() * 4)));

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
            // 1. Check for the specific START trigger marker
            const { data: triggerMsg } = await supabase
                .from('messages')
                .select('created_at')
                .eq('session_id', sessionId)
                .ilike('content', '%START_ADVENTURE_TRIGGERED%')
                .single();

            // 2. Check for any recent large system message (potential duplicate intro)
            const { data: existingMsgs } = await supabase
                .from('messages')
                .select('content, created_at')
                .eq('session_id', sessionId)
                .in('role', ['system', 'assistant'])
                .order('created_at', { ascending: false })
                .limit(5);

            const actualIntro = (existingMsgs || []).find((m: any) =>
                m.content && m.content.length > 200 && !m.content.includes('(MÉMOIRE:')
            );

            // If we have an intro, OR if the trigger is very old (meaning this is a re-run but we already have an intro? no, wait. if trigger exists, we might still need intro if it failed effectively. But if intro exists, STOP.)
            if (actualIntro) {
                console.log("Adventure already started (intro found). Returning existing intro.");
                return jsonResponse({
                    narrative: actualIntro.content,
                    skipped: true
                });
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

        // ── IDEMPOTENCY CHECK (START_ADVENTURE) ──
        if (action === 'START_ADVENTURE') {
            const { data: existingIntro } = await supabase
                .from('messages')
                .select('content')
                .eq('session_id', sessionId)
                .eq('role', 'system')
                .not('content', 'ilike', '%START_ADVENTURE_TRIGGERED%')
                .limit(1);

            if (existingIntro && existingIntro.length > 0) {
                return jsonResponse({ narrative: existingIntro[0].content });
            }
        }

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
