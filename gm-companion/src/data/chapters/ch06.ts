/**
 * CHAPITRE 6 : LA BATAILLE D'ASHKA (Niveau 7-8)
 * 8 scènes — Approche, reconnaissance, choix de plan, assaut (3 variantes),
 *             boss Gorvan, conséquences émotionnelles, quête du Rameau
 *
 * THÈME CENTRAL : Première vraie défaite. Les joueurs gagnent le combat
 * mais perdent le Sceau. C'est un tournant émotionnel.
 */
import type { NarrativeScene, NarrativeChapter, SideQuest, RandomEncounter } from './types';

// ============================================================================
// SCÈNES PRINCIPALES
// ============================================================================

const CH6_SCENES: NarrativeScene[] = [
  // ────────────────────────────────────────────
  // SCÈNE 1 — L'APPROCHE DES TERRES MORTES
  // ────────────────────────────────────────────
  {
    id: 'ch6_s1_approach', chapterId: 'ch6', sceneNumber: 1,
    title: 'Les Terres Grises', type: 'exploration',
    readAloud: `Le convoi nain quitte les contreforts des Montagnes du Marteau à l'aube. Vingt guerriers, trois chariots de ravitaillement, et vous. Lysandra chevauche un cerf elfique à l'avant — éclaireur silencieuse.

À mesure que vous progressez vers l'est, le monde change. L'herbe jaunit, puis disparaît. Les arbres se tordent, noircis, comme figés en pleine agonie. L'air lui-même a un goût — métallique, comme du sang séché.

Grundar, le vétéran nain qui commande l'escouade, crache par terre. "La terre se souvient," gronde-t-il. "On approche des Plaines Mortes."

Au troisième jour de marche, la dernière colline s'efface — et vous les voyez. Les Plaines Mortes. Un océan de cendre grise qui s'étend jusqu'à l'horizon. Et au loin, près du lac dont l'eau est noire comme de l'encre, les ruines d'Ashka.`,
    gmNotes: `VOYAGE (3 jours) — Utilisez cette section de voyage pour établir les relations entre PJ et PNJ de soutien.

JOUR 1 : Contreforts → Plaines. Temps clair, moral haut. Grundar raconte des histoires de la Guerre de l'Ombre si on lui offre de la bière. Lysandra repère des traces de loups normaux — rien d'alarmant.

JOUR 2 : Plaines tranquilles → Plaines Mortes (lisière). La végétation meurt graduellement. Ambiance qui change. Boussoles qui commencent à dérailler (Arcanes DC 12 pour comprendre : nécromancie résiduelle dans le sol). 1 jet de Constitution DC 10 par personnage (la poussière de cendre irrite les voies respiratoires — échec : 1 niveau d'épuisement temporaire jusqu'au prochain repos long).

JOUR 3 : Traversée des Plaines Mortes. Ambiance d'horreur silencieuse. Feux follets d'ombre la nuit (pas dangereux mais terrifiants). Grundar est tendu — il a combattu ici il y a 80 ans. Si on lui demande, il raconte :

"J'avais 30 ans. Mon premier camp. Les ombres arrivaient par vagues — comme la marée. On les tuait et elles se reformaient. On a perdu 200 nains en une nuit. Le matin, le soleil ne se levait pas — il n'y avait plus de soleil. Juste... du gris."

RENCONTRE OPTIONNELLE : La nuit du jour 2, des morts-vivants (3x Zombies CR 1/4, 1x Spectre CR 1) — vestiges de la Guerre de l'Ombre. Ils n'attaquent pas : ils marchent en formation militaire, répétant éternellement leur dernière patrouille. Si les joueurs les laissent passer, ils disparaissent à l'aube. Si les joueurs attaquent, les spectres se réveillent et combattent.

RP MOMENT : Chaque soir de camp, demandez aux joueurs ce que leur personnage fait. Grundar taille du bois (il sculpte des figurines de ses camarades tombés). Lysandra chante une berceuse elfique à voix basse. Un guerrier nain nommé Pip joue du pipeau (mal).`,
    dialogues: [
      {
        npcId: 'npc_grundar', npcName: 'Grundar le Vétéran',
        lines: [
          { trigger: 'Début de voyage', text: `Trois jours de marche. Gardez vos haches prêtes et vos bouches fermées — dans les Plaines Mortes, le bruit attire les choses qui dorment.`, tone: 'grave-commandant' },
          { trigger: 'Question sur la Guerre', text: `*Il regarde ses mains.* J'avais 30 ans. Mon premier camp. J'ai perdu mon frère jumeau le deuxième jour. On ne l'a jamais retrouvé. Juste... son bouclier, dans la cendre, avec des griffures dessus. *Longue pause.* Buvons à sa mémoire.`, tone: 'deuil-nostalgique' },
          { trigger: 'Nuit — feux follets visibles', text: `*Il se signe.* Les Feux du Regret. Les nains disent que ce sont les âmes de ceux qui n'ont pas eu de funérailles. *Il détourne le regard.* Ne les regardez pas trop longtemps.`, tone: 'superstitieux' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Éclaireuse — rapport', text: `*Elle revient au galop.* Traces fraîches. Deux jours, peut-être trois. Bottes humaines, sabots de cheval, et... quelque chose qui n'a pas de pieds. Des marques de traînée. *Son expression se durcit.* Ils transportent quelque chose.`, tone: 'professionnelle' },
          { trigger: 'Soir au camp', text: `*Elle regarde les étoiles.* Chez les elfes, les terres mortes n'existent pas. La Sylve se régénère toujours. Voir un endroit où la terre a CESSÉ de vivre... *Elle frissonne.* C'est comme regarder dans un miroir qui ne reflète rien.`, tone: 'mélancolique' }
        ]
      }
    ],
    objectives: [
      { description: 'Traverser les Plaines Mortes jusqu\'aux ruines d\'Ashka', type: 'explore', optional: false },
      { description: 'Recueillir les informations de reconnaissance de Lysandra', type: 'social', optional: false },
      { description: 'Survivre au voyage (Constitution DC 10)', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Arrivée en vue d\'Ashka', nextScene: 'ch6_s2_recon', label: '→ Reconnaissance' }
    ],
    encounters: ['3x Zombie (CR 1/4) + 1x Spectre (CR 1) — rencontre optionnelle nocturne'],
    skillChecks: [
      { skill: 'Constitution', dc: 10, success: 'Vous résistez à la poussière de cendre.', failure: 'La poussière irrite vos poumons — 1 niveau d\'épuisement (temporaire).' },
      { skill: 'Arcanes', dc: 12, success: 'La nécromancie résiduelle dans le sol affecte les instruments magnétiques.', failure: '' },
      { skill: 'Survie', dc: 13, success: 'Vous trouvez un abri rocheux qui bloque le vent de cendre pour le camp.', failure: 'Le camp est exposé — repos agité, pas d\'avantage de repos long.' }
    ],
    estimatedMinutes: 25, mood: 'voyage-désolation',
    music: 'Voyage sombre — vent, cordes graves, silence', location: 'Plaines Mortes — en route vers Ashka'
  },

  // ────────────────────────────────────────────
  // SCÈNE 2 — RECONNAISSANCE
  // ────────────────────────────────────────────
  {
    id: 'ch6_s2_recon', chapterId: 'ch6', sceneNumber: 2,
    title: 'Les Yeux Avant la Tempête', type: 'exploration',
    readAloud: `Du sommet d'une colline de cendre, vous observez les ruines d'Ashka à travers la brume. Le campement du Culte est visible — des tentes noires disposées en cercle autour du Grand Temple, des feux de garde, des patrouilles régulières.

Lysandra tend sa longue-vue elfique. "Comptez avec moi," murmure-t-elle. "Soixante à quatre-vingts cultistes. Des morts-vivants aussi — peut-être vingt. Et au centre..." Elle pâlit. "Le lac. L'eau est noire. Complètement noire. Le rituel est déjà en cours."

Grundar s'accroupit à côté de vous, traçant des lignes dans la cendre avec son doigt. "Voilà ce que je vois. Trois accès. Le sud — large, découvert, c'est par là qu'ils attendent une attaque. L'est — par le port en ruines, on peut arriver par le lac. Le nord — étroit, entre les bâtiments effondrés. Quel est le plan ?"`,
    gmNotes: `SCÈNE DE PLANIFICATION — Laissez les joueurs analyser et choisir.

INTELLIGENCE DISPONIBLE (Lysandra + Grundar) :
• 60-80 cultistes (CR 1/8 à CR 2)
• ~20 zombies / squelettes (chair à canon)
• 1 boss : Gorvan le Seigneur de Guerre (CR 10) — demi-orc, hache noire, armure lourde
• 1 ritualiste : Neroth (CR 5) — maintient l'incantation de corruption du Sceau
• 2 seconds : Kapras (CR 3, mage de soutien) et Brenn (CR 3, guerrier fanatique)
• Le rituel est à environ 70% d'avancement. Estimation : 24h avant brisure complète du Sceau.

TROIS PLANS POSSIBLES (chacun a une scène dédiée) :
1. ASSAUT FRONTAL (Sud) — Grundar préfère : "Simple, brutal, efficace. On frappe comme un marteau." Avantage : supériorité naine en combat ouvert. Inconvénient : Gorvan les attend, pertes naines élevées.
2. INFILTRATION (Nord) — Lysandra préfère : "On se glisse comme des ombres. On atteint le Temple sans alerter le gros des forces." Avantage : surprise, peu de combats. Inconvénient : si découverts, ils sont encerclés.
3. DIVERSION + FRAPPE CHIRURGICALE — Combiné : les nains attaquent au sud (diversion), les joueurs s'infiltrent par le nord. Avantage : le meilleur des deux. Inconvénient : divise les forces.

NOTE MJ : Le plan 3 est "optimal" narrativement. Si les joueurs choisissent 1 ou 2, adaptez — les deux sont viables mais avec des conséquences différentes :
• Plan 1 : +4 nains tués, mais Gorvan est déjà blessé quand les joueurs arrivent (il a combattu les nains).
• Plan 2 : Moins de morts naines, mais si Discrétion échoue (DC 15), Gorvan a des renforts.
• Plan 3 : Pertes normales, scène d'infiltration classique.

TEMPS LIMITÉ : Rappelez aux joueurs que le rituel avance. S'ils prennent trop de temps à planifier (IRL > 20 min), Lysandra signale que "des lumières noires se sont allumées au-dessus du lac — le rituel accélère."`,
    dialogues: [
      {
        npcId: 'npc_grundar', npcName: 'Grundar',
        lines: [
          { trigger: 'Plan frontal', text: `*Il frappe du poing dans sa paume.* Le marteau ne se faufile pas. Il frappe. Mes nains peuvent enfoncer ce camp en vingt minutes — et s'il reste des morceaux, on ramasse.`, tone: 'confiant-bourru' },
          { trigger: 'Plan infiltration', text: `*Moue sceptique.* Se faufiler, c'est pour les elfes et les voleurs. Mais... si vous pensez atteindre Gorvan sans alerter le camp... je couvre votre retraite. Juste — ne mourez pas. Ce serait impoli.`, tone: 'réticent-loyal' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Plan infiltration', text: `*Elle hoche la tête.* Le nord. Les bâtiments effondrés créent un labyrinthe naturel. On peut se faufiler de couverture en couverture. *Elle trace le chemin avec un bâton dans la cendre.* Ici, ici, puis ici. Le Temple en quinze minutes si tout va bien.`, tone: 'professionnelle-concentrée' },
          { trigger: 'Plan combiné', text: `*Sourire.* Grundar attaque au sud, on file au nord pendant que Gorvan est distrait. C'est le plan le plus risqué — mais si ça marche, c'est le plus efficace. *Elle regarde Grundar.* Tu peux nous donner quinze minutes ?`, tone: 'stratège' }
        ]
      }
    ],
    objectives: [
      { description: 'Observer le camp ennemi et recueillir le renseignement', type: 'explore', optional: false },
      { description: 'Choisir un plan d\'attaque (3 options)', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Plan frontal (sud)', nextScene: 'ch6_s3a_frontal', label: '→ Assaut frontal' },
      { condition: 'Plan infiltration (nord)', nextScene: 'ch6_s3b_stealth', label: '→ Infiltration' },
      { condition: 'Plan combiné (diversion + frappe)', nextScene: 'ch6_s3c_combined', label: '→ Diversion + frappe chirurgicale' }
    ],
    skillChecks: [
      { skill: 'Perception', dc: 14, success: 'Vous repérez un passage secret dans les ruines côté est — un tunnel de drainage ancien.', failure: '' },
      { skill: 'Arcanes', dc: 15, success: 'Le halo noir au-dessus du lac est un rituel de corruption active. Il reste environ 24h avant la brisure complète.', failure: 'Vous sentez une magie puissante, mais ne pouvez pas estimer le temps restant.' },
      { skill: 'Nature', dc: 12, success: 'Les feux follets d\'ombre sont plus nombreux ici — signe que le voile entre les plans s\'amincit.', failure: '' }
    ],
    estimatedMinutes: 20, mood: 'tension-planification',
    music: 'Calme avant la tempête — suspense, cordes tendues', location: 'Colline surplombant Ashka'
  },

  // ────────────────────────────────────────────
  // SCÈNE 3A — ASSAUT FRONTAL    (variante)
  // ────────────────────────────────────────────
  {
    id: 'ch6_s3a_frontal', chapterId: 'ch6', sceneNumber: 3,
    title: 'La Charge du Marteau', type: 'combat',
    readAloud: `Grundar lève sa hache. "POUR HAMMERDEEP !" Le cri est repris par vingt voix naines — et la charge commence.

Les bottes de fer frappent la cendre. Les haches reflètent la lumière malade. Vingt nains en formation de coin foncent vers le campement comme un bélier vivant.

Vous êtes au centre. L'adrénaline brûle dans vos veines. Devant vous, les cultistes sortent des tentes en courant, certains à moitié armés. Les zombies se mettent en marche — lents, mécaniques. Et derrière les lignes, vous entendez un rire guttural.

Gorvan est là. Debout sur les marches du Grand Temple, hache sur l'épaule. Il vous attend.`,
    gmNotes: `COMBAT OUVERT EN 3 PHASES :
Phase 1 (3 rounds) : Les nains percent le périmètre. 4x Cultistes CR 1/8 + 6x Zombies CR 1/4 engagent le groupe. Les nains prennent en charge la majorité — les joueurs combattent ceux qui passent. FACILE.

Phase 2 (4 rounds) : Progression vers le Temple. Brenn (Guerrier Fanatique CR 3) avec 2x Fanatiques CR 2 bloquent le chemin. Kapras (Mage CR 3) lance des sorts de zone depuis une tour. Combat moyen.

Phase 3 : Gorvan. Voir scène 4 (le Temple).

CONSÉQUENCES DU PLAN FRONTAL :
• 4 nains supplémentaires morts (Grundar est touché — blessé mais vivant)
• Gorvan a eu le temps de préparer le terrain — 2 pièges mécaniques dans l'escalier du Temple (Investigation DC 13, 2d8 perçant)
• MAIS : Gorvan a perdu Brenn et la moitié de ses forces, il est "seul" avec Neroth dans le Temple

LOOT SUPPLÉMENTAIRE (Plan frontal uniquement) : Armure de Brenn (demi-plate +1), 200 pièces d'or du trésor de guerre cultiste.`,
    dialogues: [
      {
        npcId: 'npc_grundar', npcName: 'Grundar',
        lines: [
          { trigger: 'Pendant la charge', text: `*Hurlant par-dessus le bruit.* GARDEZ LA FORMATION ! PAS DE HÉROS INDIVIDUELS ! ON POUSSE ENSEMBLE ! *Il abat un cultiste d'un seul coup.* Comme ça !`, tone: 'commandement-bataille' },
          { trigger: 'S\'il est blessé', text: `*Une lance cultiste lui a entaillé le flanc.* C'est rien. *Il crache du sang.* La pierre ne brise pas. Continuez — le Temple est devant.`, tone: 'stoïque-blessé' }
        ]
      }
    ],
    objectives: [
      { description: 'Percer les lignes cultistes avec les nains', type: 'combat', optional: false },
      { description: 'Éliminer Brenn et Kapras', type: 'combat', optional: false },
      { description: 'Atteindre le Grand Temple', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Arrivée au Temple', nextScene: 'ch6_s4_temple', label: '→ Le Grand Temple' }
    ],
    encounters: ['4x Cultiste (CR 1/8) + 6x Zombie (CR 1/4)', 'Brenn (Guerrier Fanatique CR 3) + 2x Fanatique (CR 2)', 'Kapras (Mage CR 3) — combat à distance depuis une tour'],
    estimatedMinutes: 30, mood: 'assaut-chaos',
    music: 'Charge de bataille — cors, percussions, clash d\'armes', location: 'Ruines d\'Ashka — Périmètre sud'
  },

  // ────────────────────────────────────────────
  // SCÈNE 3B — INFILTRATION (variante)
  // ────────────────────────────────────────────
  {
    id: 'ch6_s3b_stealth', chapterId: 'ch6', sceneNumber: 3,
    title: 'Les Ombres qui Chassent', type: 'exploration',
    readAloud: `Le nord des ruines est un labyrinthe de pierre brisée. Des murs à mi-hauteur, des arches effondrées, des rues envahies par la cendre. La lune est cachée derrière un voile de nuages noirs — la nuit vous protège.

Lysandra en tête, vous progressez de couverture en couverture. Pas un bruit — même la cendre semble retenir son souffle. Les patrouilles cultistes passent à dix mètres de vous sans vous voir.

Mais plus vous approchez du Temple, plus l'air change. Plus lourd, plus froid. Les ombres bougent même quand rien ne les projette. Et le murmure — ce chant bas et monotone — s'intensifie.

Le Temple est devant vous. Une seule sentinelle à l'entrée nord. Au-delà, Gorvan.`,
    gmNotes: `INFILTRATION EN 3 ÉTAPES :
1. RUINES NORD (3 jets de Discrétion DC 13, mode groupe) : Chaque échec → 1 patrouille alertée (2x Cultiste + 1x Zombie). Si les 3 échouent → Gorvan est alerté et prépare une embuscade.

2. SENTINELLE (1 jet) : Peut être neutralisée silencieusement (Discrétion DC 15 + attaque avec avantage) ou distraite (Tromperie DC 14 — Lysandra peut l'attirer). Si elle crie, Phase 3 commence en combat.

3. ENTRÉE DU TEMPLE (aucun jet si propre) : Si les joueurs arrivent sans alerte, ils surprennent Gorvan — Round de surprise. Si une Alerte a été déclenchée, pas de surprise.

AIDE DE LYSANDRA : Lysandra a Discrétion +9 — elle réussit automatiquement les jets < DC 15. Elle peut scanner en éclaireur (+2 au jet de groupe). Elle peut aussi éliminer 1 sentinelle silencieusement si les joueurs le demandent.

L'AMBIANCE EST CRUCIALE : Décrivez chaque recoin — la cendre qui craque sous les pieds, un rat squelette qui les regarde passer, un mur avec des griffures d'ombres anciennes. Tension maximale.`,
    dialogues: [
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Progression', text: `*Murmure, presque inaudible.* Patrouille — deux heures, trois heures. Le trou dans leur rotation est ici — on a quatre minutes. Allez.`, tone: 'murmure-focus' },
          { trigger: 'Sentinelle repérée', text: `*Elle lève le poing — stop.* Un seul. Poste nord. *Elle touche son arc.* Je peux le neutraliser proprement. Ou on le contourne par la fenêtre de ce bâtiment.`, tone: 'tactique' }
        ]
      }
    ],
    objectives: [
      { description: 'Se faufiler à travers les ruines nord (3 jets de Discrétion)', type: 'explore', optional: false },
      { description: 'Neutraliser ou éviter la sentinelle du Temple', type: 'social', optional: false }
    ],
    transitions: [
      { condition: 'Entrée dans le Temple', nextScene: 'ch6_s4_temple', label: '→ Le Grand Temple' }
    ],
    skillChecks: [
      { skill: 'Discrétion (Groupe)', dc: 13, success: 'Vous passez comme des ombres.', failure: 'Un cultiste vous entrevoit — combat !' },
      { skill: 'Discrétion', dc: 15, success: 'La sentinelle est neutralisée en silence.', failure: 'La sentinelle hurle — Gorvan est alerté !' },
      { skill: 'Tromperie', dc: 14, success: 'Lysandra attire la sentinelle hors de son poste.', failure: 'La sentinelle ne quitte pas son poste — plan B?' }
    ],
    encounters: ['Patrouille contingente : 2x Cultiste + 1x Zombie (si échec discrétion)'],
    estimatedMinutes: 20, mood: 'infiltration-tension',
    music: 'Infiltration — silence, heartbeat, cordes en sourdine', location: 'Ruines d\'Ashka — Quartier Nord'
  },

  // ────────────────────────────────────────────
  // SCÈNE 3C — DIVERSION + FRAPPE (variante)
  // ────────────────────────────────────────────
  {
    id: 'ch6_s3c_combined', chapterId: 'ch6', sceneNumber: 3,
    title: 'Le Marteau et la Dague', type: 'combat',
    readAloud: `Le plan est simple. Grundar prend ses vingt nains et attaque au sud — le bruit, la fureur, le chaos. Pendant que Gorvan se tourne pour répondre à la charge, vous filez par le nord.

Le cor de guerre retentit dans l'aube pâle. Les cris nains explosent — "POUR HAMMERDEEP ! POUR LE THANE !" — et le campement s'embrase.

Du nord, vous voyez les cultistes courir vers le sud, abandonnant leurs postes. Les tentes se vident. C'est votre ouverture.

Lysandra lance : "Maintenant. Vite. On a dix minutes avant que Gorvan comprenne."`,
    gmNotes: `VARIANTE COMBINÉE — Le "meilleur" plan narrativement.
Phase 1 : INFILTRATION FACILITÉE. Les jets de Discrétion sont DC 11 (la diversion absorbe l'attention). 2 jets de groupe au lieu de 3. Même si les joueurs échouent, les cultistes alertés courent vers le sud en pensant que l'attaque vient de là — les joueurs ont 1 round pour se cacher.

Phase 2 : Arrivée au Temple SANS les sous-officiers (Brenn et Kapras sont au sud, combattant les nains). Gorvan est SEUL avec Neroth et 2 gardes d'élite (Cultiste Vétéran CR 2).

Phase 3 : Pendant le combat avec Gorvan (scène 4), les joueurs entendent le combat au sud — parfois des cris nains, parfois des explosions magiques. Si le combat dure trop (> 8 rounds), Brenn arrive en renfort (s'il n'est pas mort).

COÛT : 2 nains morts dans la diversion (standard). Grundar est épuisé mais vivant.`,
    dialogues: [
      {
        npcId: 'npc_grundar', npcName: 'Grundar',
        lines: [
          { trigger: 'Avant la séparation', text: `*Il serre l'avant-bras de chaque joueur — salut nain.* Dix minutes. Peut-être quinze. Après ça, Gorvan comprend et revient. *Sourire de loup.* Faites ce qu'il faut. On tient.`, tone: 'frère-d\'armes' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Pendant l\'approche', text: `*Courant entre les ruines.* Le plan marche — regardez, ils partent tous vers le sud. *Elle pointe le Temple.* Porte nord — deux gardes restants. On peut les prendre.`, tone: 'adrénaline-excitation' }
        ]
      }
    ],
    objectives: [
      { description: 'Se faufiler pendant la diversion (Discrétion DC 11, 2 jets)', type: 'explore', optional: false },
      { description: 'Atteindre le Temple avant que Gorvan comprenne', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Arrivée au Temple', nextScene: 'ch6_s4_temple', label: '→ Le Grand Temple' }
    ],
    skillChecks: [
      { skill: 'Discrétion (Groupe)', dc: 11, success: 'La diversion fonctionne — le chemin est libre.', failure: 'Un cultiste vous repère, mais court vers le sud en pensant que vous êtes un renfort.' }
    ],
    encounters: ['2x Cultiste Vétéran (CR 2) — gardes restants du Temple'],
    estimatedMinutes: 15, mood: 'infiltration-chaos-combiné',
    music: 'Cors de guerre au loin + infiltration en premier plan', location: 'Ruines d\'Ashka — du Nord au Temple'
  },

  // ────────────────────────────────────────────
  // SCÈNE 4 — LE GRAND TEMPLE (BOSS)
  // ────────────────────────────────────────────
  {
    id: 'ch6_s4_temple', chapterId: 'ch6', sceneNumber: 4,
    title: 'Le Grand Temple d\'Ashka', type: 'combat',
    readAloud: `Le Grand Temple est un squelette de marbre. Les colonnes qui soutenaient autrefois un dôme magnifique se dressent comme des os brisés vers le ciel. Au centre, un bassin circulaire de dix mètres — l'ancien lac sacré — bouillonne d'une eau noire et épaisse.

Le Sceau du Lac est au fond de ce bassin. Brisé. Les morceaux de pierre gravée flottent à la surface comme des débris de naufrage, et une lumière mourante pulse entre les fragments — le dernier souffle du Sceau.

Gorvan est là. Debout devant le bassin, sa hache noire reposant sur son épaule massive. À ses pieds, le ritualiste Neroth psalmodie l'incantation finale, les mains levées vers l'eau noire.

Le demi-orc sourit.

"Ah. Les héros. Le Maître savait que vous viendriez. Il dit de vous saluer." Il lève sa hache. "Et de vous montrer ce que vous ne pouvez pas empêcher."`,
    gmNotes: `BOSS FIGHT — Gorvan le Seigneur de Guerre
═══════════════════════════════════════

GORVAN (CR 10 — adapté au groupe niv. 7-8 avec alliée Lysandra)
• Humain, 40 ans, ancien capitaine mercenaire
• AC 19 (Armure lourde enchantée)
• HP 136 (18d10+36)
• Vitesse 30ft
• FOR 20 DEX 12 CON 14 INT 10 SAG 12 CHA 14
• Sauvegardes : FOR +9, CON +6
• Compétences : Athlétisme +9, Intimidation +6
• Attaques (multiattaque : 2/round) :
  - Hache Noire : +9, portée 5ft, 2d12+5 tranchant + 1d6 nécrotique
  - Coup de Bouclier : +9, portée 5ft, 1d6+5 contondant, cible Jet de sauvegarde FOR DC 17 ou renversée
• Traits spéciaux :
  - RAGE DE L'OMBRE (Recharge 5-6) : Action bonus. +2 dégâts, résistance aux dégâts non-magiques. Dure 3 rounds.
  - CRIS DE GUERRE : Action bonus, 1/combat. Tous les alliés à 30ft gagnent +5 HP temporaires et avantage au prochain jet d'attaque.
  - DERNIER SOUFFLE (1/combat) : Quand HP < 30, Gorvan peut faire une attaque gratuite avec avantage.

NEROTH LE RITUALISTE (CR 5)
• Humain, 55 ans, ancien érudit de l'Académie Arcane
• AC 14 (Armure de Mage)
• HP 52 (8d8+16)
• INT 16, sorts de niveau 1-3
• Sorts préparés : Lenteur (concentration), Immobilisation de Personne, Bouclier, Contre-sort (3ème), Rayon Affaiblissant, Projectile Magique
• RITUEL EN COURS : Neroth maintient le rituel de brisure. S'il est interrompu (perdre concentration ou être incapacité), le rituel s'arrête — mais le Sceau est DÉJÀ à 95% brisé. Une interruption retarde la brisure de 1d4 heures (pas de sauvetage permanent).

TACTIQUES :
• Gorvan CHARGE le personnage le plus menaçant (celui qui a le plus de HP ou qui a une arme magique).
• Neroth essaie de rester hors portée de mêlée. Il lance Lenteur au round 1, puis soutient Gorvan avec Immobilisation de Personne sur les casters.
• Si Neroth est tué en premier, Gorvan entre en RAGE DE L'OMBRE et combat avec +2 dégâts et résistance.
• Si Gorvan tombe à 0 HP, Neroth tente de fuir par un portail d'ombre (Arcanes DC 15 pour le bloquer).

TERRAIN :
• Le bassin central (10m diamètre) : créature qui tombe dedans → 2d6 nécrotique/round, Force DC 15 pour en sortir (l'eau est comme du goudron). ON PEUT POUSSER GORVAN DEDANS (Athlétisme DC 17).
• 4 colonnes brisées : couverture partielle. Peuvent être renversées sur les ennemis (Athlétisme DC 16, 3d10 contondant).
• L'escalier sud est piégé (si plan frontal : Investigation DC 13, 2d8 perçant).

LYSANDRA EN COMBAT : Lysandra (Rôdeuse niveau 7) combat avec les joueurs. Elle cible Neroth en priorité. Stat simplifiées : Arc +7, 1d8+4, 2 attaques. AC 15, HP 52.

MOMENT NARRATIF CLEF : Au round 3, que les joueurs le veuillent ou non, le Sceau se brise complètement. L'eau noire EXPLOSE vers le haut en un geyser de 30m. Tous dans 20ft : Constitution DC 14 ou repoussés et 2d8 nécrotique. C'est IRRÉVERSIBLE. Le Sceau est perdu.`,
    dialogues: [
      {
        npcId: 'npc_gorvan', npcName: 'Gorvan',
        lines: [
          { trigger: 'Avant combat', text: `*Il fait tourner sa hache lentement.* Le Maître m'a dit de vous laisser vivre — pour que vous puissiez raconter ce que vous avez vu ici. Mais moi... *Le sourire s'élargit.* Je n'ai jamais été bon pour suivre les ordres. *Il charge.*`, tone: 'brutal-joueur' },
          { trigger: 'HP < 50%', text: `*Crachant du sang.* Ha ! Enfin un vrai combat ! *Ses yeux deviennent noirs.* RAGE DE L'OMBRE ! *Son corps pulse d'énergie sombre.*`, tone: 'exalté' },
          { trigger: 'Sceau brisé (round 3)', text: `*Riant sous le geyser noir.* TROP TARD ! REGARDEZ ! LE SCEAU EST EN POUSSIÈRE ! Quatre de moins ! Plus que trois ! LE MIROIR SERA OUVERT !`, tone: 'triomphe-fou' },
          { trigger: 'Vaincu', text: `*À genoux, la hache tombée.* Heh. Pas mal. *Il crache.* Mais vous perdez quand même. Le Maître... vous attend à Sombrelune. Si vous avez le courage. *Il s'effondre.*`, tone: 'mourant-moqueur' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Sceau brisé', text: `*Le geyser noir retombe. Le silence. L'eau se calme.* Non... Non. On est arrivés trop tard. *Ses mains tremblent sur son arc.* Le Sceau... les morceaux... *Elle regarde les joueurs.* On peut encore les récupérer. Il y a peut-être un moyen de le reconstruire.`, tone: 'choc-espoir-fragile' }
        ]
      }
    ],
    objectives: [
      { description: 'Vaincre Gorvan et le ritualiste Neroth', type: 'combat', optional: false },
      { description: 'Récupérer les fragments du Sceau du Lac', type: 'collect', optional: false },
      { description: '(Optionnel) Capturer Gorvan vivant pour interrogatoire', type: 'social', optional: true }
    ],
    transitions: [
      { condition: 'Combat terminé', nextScene: 'ch6_s5_aftermath', label: '→ Les Cendres de la Victoire' }
    ],
    encounters: ['Gorvan le Seigneur de Guerre (CR 10)', 'Neroth le Ritualiste (CR 5)'],
    loot: [
      'Hache Noire de Gorvan (+1, 2d12+1 + 1d6 nécrotique — maudite : cauchemars)',
      'Robe de Neroth (focaliseur arcanique +1)',
      'Fragment de Cristal Noir (objet de quête — relié au Plan Ombre)',
      '6 fragments du Sceau du Lac (objet de quête — réparation future)',
      '350 pièces d\'or (trésor de guerre cultiste)',
      'Carte de Sombrelune (parchemin trouvé sur Neroth — localisation du Miroir)'
    ],
    estimatedMinutes: 35, mood: 'combat-boss-épique-tragique',
    music: 'Boss — percussion tribale, chœurs sombres, crescendo lors de la brisure du Sceau', location: 'Ruines d\'Ashka — Grand Temple'
  },

  // ────────────────────────────────────────────
  // SCÈNE 5 — CONSÉQUENCES
  // ────────────────────────────────────────────
  {
    id: 'ch6_s5_aftermath', chapterId: 'ch6', sceneNumber: 5,
    title: 'Les Cendres de la Victoire', type: 'narration',
    readAloud: `Le silence revient sur Ashka. Un silence différent — plus lourd, plus vide. L'eau du lac est définitivement noire maintenant. Elle suinte hors du bassin, s'infiltre dans le sol, empoisonnant la terre déjà morte.

Les guerriers nains arrivent par le sud, couverts de suie et de sang. Grundar est là — blessé au flanc, appuyé sur sa hache. Derrière lui, des nains portent des civières.

"Douze des nôtres sont tombés," dit-il d'une voix rauque. "Six au sud, deux dans les tunnels, quatre... les ombres qui sortaient du lac." Il regarde le bassin. "On peut réparer ça ?"

Lysandra s'agenouille près des fragments du Sceau. Ses doigts tracent les runes brisées — certaines brillent encore faiblement, comme des braises de cheminée. "Pas ici. Pas maintenant. Il faudra un forgeron comme Korgan — quelqu'un qui comprend la magie des Sceaux. Et les connaissances elfiques sur la construction originale." Elle lève les yeux. "On a besoin de la Sylve d'Émeraude."

Plus tard, quand le camp est monté et que les blessés sont soignés, Grundar s'assied à côté de vous. Il ne dit rien pendant longtemps. Puis :

"La dernière fois que j'ai été ici... j'avais 30 ans. Aujourd'hui j'en ai 110. Et ça n'a pas changé. La terre est toujours morte. Les ombres sont toujours là. On se bat, on gagne des batailles, et rien ne change."

Il regarde le feu. "Dites-moi que cette fois c'est différent."`,
    gmNotes: `SCÈNE ÉMOTIONNELLE — PAS DE COMBAT.
C'est le moment le plus important du chapitre. Les joueurs ont GAGNÉ le combat mais PERDU le Sceau. C'est la première vraie défaite narrative.

CE QUE LES JOUEURS APPRENNENT :
• Le Sceau du Lac est le 4ème Sceau brisé/affaibli (après Forêt [stabilisé], Montagne [protégé], et maintenant Lac [brisé]).
• Malachi a 4 lieutenants : Voss (mort, Ch2), Gorvan (mort/capturé), Syrana (active, Ch7), Alorn (actif, Ch10).
• La carte trouvée sur Neroth montre l'emplacement de Sombrelune — première preuve concrète de la cible finale.
• Le plan de Malachi nécessite de briser au moins 5 des 7 Sceaux pour activer le Miroir. 3 sont intacts, 1 est stabilisé (Forêt), 1 est protégé (Montagne), et maintenant 2 sont brisés (Lac + un autre, non précisé).

RP MOMENTS :
• Chaque joueur devrait avoir un moment seul avec un PNJ ou une réaction personnelle.
• Si un joueur a un lien avec l'eau, la nature ou la guérison → le Sceau brisé résonne émotionnellement.
• Si quelqu'un a une foi religieuse → le Grand Prêtre Alduin (via amulette de Sentinelle) envoie un message de soutien : "Solarius voit votre sacrifice. Le Sceau est perdu, mais pas l'espoir."

GORVAN EN VIE (si capturé) :
Si les joueurs ont épargné Gorvan, il peut être interrogé (Intimidation DC 18 ou Persuasion DC 20) :
• Il connaît 3 infos : Le nom de Syrana ("une elfe, dans leur Conseil"), la localisation approximative de Sombrelune ("un volcan mort au centre des Plaines Mortes"), et le délai de Malachi ("il dit qu'il aura besoin de la prochaine nouvelle lune — dans 3 semaines").
• Il ne connaît PAS : L'identité d'Alorn, la nature exacte du Miroir, le plan de secours de Malachi.`,
    dialogues: [
      {
        npcId: 'npc_grundar', npcName: 'Grundar',
        lines: [
          { trigger: 'Rapport des pertes', text: `*Voix rauque.* Douze braves. Douze familles. *Il essuie sa hache.* Mais on a tenu. Et Gorvan sait maintenant — les cultistes, TOUS — que la pierre naine ne brise pas facilement.`, tone: 'deuil-fierté' },
          { trigger: 'Soir au camp', text: `*Regardant le feu.* La dernière fois que j'ai été ici... j'avais 30 ans. Aujourd'hui j'en ai 110. Et ça n'a pas changé. *Longue pause.* Dites-moi que cette fois c'est différent.`, tone: 'fatigué-espoir' },
          { trigger: 'Plan pour la suite', text: `Je laisse vingt guerriers ici pour tenir les ruines. Le reste rentre à Hammerdeep avec le rapport. *Il vous regarde.* Vous — vous continuez. La Sylve, c'est ça ? Que Moradin vous protège. Les elfes ne sont pas faciles.`, tone: 'pragmatique' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Fragments du Sceau', text: `*Examinant les morceaux.* Les runes sont encore actives — faiblement. Comme un cœur qui bat ses derniers coups. *Elle serre les fragments.* On peut le sauver. Korgan pour la forge, Faelorn pour les enchantements. Mais il faut les deux — nains ET elfes.`, tone: 'déterminée' },
          { trigger: 'Soir, à l\'écart', text: `*Assise seule, regardant le lac noir.* Quatre Sceaux touchés sur sept. Ça fait combien de temps, entre les fissures et les brisures ? Un an ? Moins ? *Elle se tourne vers vous.* On ne peut plus se permettre de perdre. Plus jamais.`, tone: 'vulnérable' }
        ]
      }
    ],
    objectives: [
      { description: 'Évaluer les pertes et sécuriser les ruines', type: 'explore', optional: false },
      { description: 'Interroger Gorvan (si capturé vivant)', type: 'social', optional: true },
      { description: 'Décider de la prochaine étape — direction la Sylve d\'Émeraude', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 6 — Direction la Sylve', nextScene: 'ch7_s1_arrival', label: '→ Ch.7 : La Sylve d\'Émeraude' }
    ],
    loot: ['Garnison naine alliée établie à Ashka (ressource stratégique)'],
    estimatedMinutes: 20, mood: 'victoire-amère-deuil',
    music: 'Deuil — cordes graves, silence, un cor nain solitaire au loin', location: 'Ruines d\'Ashka — Camp après-bataille'
  }
];

// ============================================================================
// QUÊTES SECONDAIRES DU CHAPITRE 6
// ============================================================================

const CH6_SIDE_QUESTS: SideQuest[] = [
  {
    id: 'sq_ch6_rameau',
    title: 'Le Rameau de Vie',
    description: 'Le spectre de Liora guide les joueurs vers le Temple Submergé pour récupérer le Rameau de Vie — un artefact capable de restaurer un Sceau brisé. Trigger : un joueur prie près du bassin OU un clerc/druide touche les fragments du Sceau.',
    giver: 'Liora (spectre)',
    hookText: 'Un spectre bleuté se matérialise au-dessus du bassin. Il ne parle pas — il pointe le lac, puis disparaît sous la surface.',
    objectives: [
      'Trouver le tunnel de drainage sous le Temple (Investigation DC 15)',
      'Nager dans l\'eau noire (Constitution DC 14/round, 1d6 nécrotique) ou utiliser Respiration Aquatique',
      'Atteindre le Temple Submergé et ouvrir le sarcophage de Liora',
      'Récupérer le Rameau de Vie'
    ],
    reward: 'Le Rameau de Vie (artefact — peut restaurer UN Sceau brisé, au prix de 50% HP max permanents)',
    consequenceIfIgnored: 'Le fragment du Sceau du Lac s\'éteint définitivement — réparation impossible sans le Rameau.',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    activeChapters: ['ch6']
  },
  {
    id: 'sq_ch6_deserteur',
    title: 'Le Cultiste Repenti',
    description: 'Un cultiste blessé est trouvé dans les ruines après le combat (Perception DC 13). Edrik, 22 ans, recrue récente sans tatouage, supplie pour de l\'aide — sa sœur est retenue en otage.',
    giver: 'Edrik le Repenti',
    hookText: '"Je ne voulais pas — ils ont pris ma sœur. Ils disent que si je sers, elle sera relâchée."',
    objectives: [
      'Trouver Edrik sous les décombres (Perception DC 13)',
      'Décider du sort d\'Edrik : le tuer / le capturer / l\'aider',
      'Si aidé : obtenir les noms des sous-officiers du Culte à Sol-Aureus'
    ],
    reward: '3 noms de sous-officiers du Culte (avantage aux jets Investigation dans les Bas-Fonds), allié potentiel. Quête de suivi Ch9 : libérer la sœur d\'Edrik.',
    estimatedMinutes: 10,
    difficulty: 'facile',
    activeChapters: ['ch6', 'ch9']
  },
  {
    id: 'sq_ch6_portlac',
    title: 'Les Survivants de Portlac',
    description: 'Le village de pêcheurs de Portlac est partiellement évacué, mais 50 habitants sur 200 sont restés — piégés par les créatures du lac. Trigger : en route vers Ashka (Jour 3) ou après le combat.',
    giver: 'Maire Hilda',
    hookText: '"Des choses sortent du lac la nuit. Depuis 3 semaines. Deux pêcheurs sont morts."',
    objectives: [
      'Trouver le village de Portlac (20 maisons, rive sud du lac)',
      'Parler à la Maire Hilda et comprendre la situation',
      'SOLUTION A : Tuer les Ombres Lacustres chaque nuit (temporaire)',
      'SOLUTION B : Trouver et détruire le Cristal Noir dans le temple submergé (permanent)'
    ],
    reward: 'Bateau de Portlac, bénédiction de Hilda (+1 aux sauvegardes pendant le chapitre), réputation héroïque.',
    consequenceIfIgnored: 'Portlac est abandonné. Les créatures du lac se multiplient et hantent les rives.',
    estimatedMinutes: 20,
    difficulty: 'moyen',
    activeChapters: ['ch6']
  }
];

// ============================================================================
// RENCONTRES ALÉATOIRES (Zone : Plaines Mortes / Ashka)
// ============================================================================

const CH6_RANDOM_ENCOUNTERS: RandomEncounter[] = [
  {
    d20Range: '1-4',
    description: 'La Patrouille Fantôme — Un groupe de 6 soldats squelettiques en formation de marche passe à 30m. Ils portent des bannières des deux armées de la Guerre de l\'Ombre — le doré et le noir, mêlés. Ils ne sont pas hostiles sauf si attaqués.',
    difficulty: 'facile',
    creatures: ['6x Squelette (CR 1/4) — en formation, ne combattent que si attaqués'],
    gmNotes: 'Si les joueurs les laissent passer, ils disparaissent à l\'aube. Si attaqués, les spectres se réveillent.'
  },
  {
    d20Range: '5-8',
    description: 'Tempête de Cendre — Mur de cendre grise qui balaie les plaines. Visibilité 0, dégâts d\'abrasion, désorientation. Constitution DC 12 chaque 10 min ou 1d4 dégâts. Survie DC 14 pour trouver un abri. Dure 1d4 heures.',
    difficulty: 'moyen',
    gmNotes: 'Danger environnemental. Les joueurs doivent trouver un abri ou subir des dégâts répétés.'
  },
  {
    d20Range: '9-12',
    description: 'Ombres Lacustres — Créatures d\'ombre amphibies qui émergent du lac noir la nuit. Corps translucides, yeux blancs, mains griffues.',
    difficulty: 'moyen',
    creatures: ['4x Ombre Lacustre (comme Ombre CR 1/2, natation 40ft, résistance au froid)'],
    gmNotes: 'Apparaissent uniquement la nuit, près du lac.'
  },
  {
    d20Range: '13-16',
    description: 'Pillards Opportunistes — Un groupe de 3 humains en haillons fouille les ruines pour des trésors. Pas des cultistes — juste des désespérés. Fuient si confrontés, combattent si acculés.',
    difficulty: 'facile',
    creatures: ['3x Bandit (CR 1/8) — préfèrent fuir'],
    loot: ['Passage secret révélé (si aidés)'],
    gmNotes: 'Si on leur parle, ils décrivent les mouvements des patrouilles cultistes (+1 au jet de Discrétion des joueurs).'
  },
  {
    d20Range: '17-20',
    description: 'L\'Éclaireur Blessé — Un éclaireur nain envoyé par Grundar en avance est blessé et caché sous des rochers. Il a des infos fraîches sur les patrouilles ennemies.',
    gmNotes: 'PNJ allié blessé. Si soigné : +2 au jet d\'Initiative pour la première scène de combat grâce à ses infos.'
  }
];

// ============================================================================
// EXPORT
// ============================================================================

export const CHAPTER_6: NarrativeChapter = {
  id: 'ch6', number: 6, title: 'La Bataille d\'Ashka',
  subtitle: 'Assaut sur les ruines et le Sceau brisé — la première défaite',
  summary: `Voyage à travers les Plaines Mortes avec un détachement nain. Reconnaissance des ruines d'Ashka et planification de l'assaut (3 variantes). Boss fight contre Gorvan le Seigneur de Guerre dans le Grand Temple. Le Sceau du Lac se brise — première vraie défaite narrative. Conséquences émotionnelles et choix de direction vers la Sylve. Quêtes secondaires : le Rameau de Vie, le Cultiste Repenti, les Survivants de Portlac.`,
  suggestedLevel: 7, region: 'Plaines Mortes / Ruines d\'Ashka / Lac d\'Ashka',
  themes: ['Guerre', 'Première défaite', 'Sacrifice', 'Choix tactiques', 'Deuil', 'Espoir fragile'],
  scenes: CH6_SCENES,
  chapterSideQuests: CH6_SIDE_QUESTS,
  previousChapter: 'ch5', nextChapter: 'ch7'
};
