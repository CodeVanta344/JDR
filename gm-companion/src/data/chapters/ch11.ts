/**
 * CHAPITRE 11 : LA BATAILLE DE SOMBRELUNE (Niveau 12-13)
 * 5 scènes — Bataille épique, infiltration, confrontation Malachi
 */
import type { NarrativeScene, NarrativeChapter } from './types';

const CH11_SCENES: NarrativeScene[] = [
  {
    id: 'ch11_s1_bataille', chapterId: 'ch11', sceneNumber: 1,
    title: 'La Charge de l\'Alliance', type: 'narration',
    readAloud: `L'aube ne se lève pas — elle est volée par les nuages noirs qui entourent Sombrelune. Mais trois cors de guerre résonnent en même temps : humain, nain, elfique. L'armée de l'Alliance charge.

Le spectacle est terrible et magnifique. Les fantasins humains forment un mur de boucliers qui avance comme une marée. Les nains frappent la terre de leurs marteaux en rythme, faisant trembler le sol. Les archers elfiques lancent des nuées de flèches enchantées qui tracent des arcs de lumière dans l'air noir.

Et les ombres répondent. Des vagues de créatures déferlent depuis la base de la Tour — un océan de griffes, de crocs, et de ténèbres. Le choc est assourdissant. Le monde entier semble retenir son souffle.

Pendant ce temps, sous la colline, le tunnel nain s'ouvre. C'est votre moment. Vous disparaissez sous terre pendant que le monde brûle en surface.`,
    gmNotes: `Scène narrative — pas de mécanique de combat pour les joueurs. C'est le spectacle de la bataille qui fait diversion. Décrivez l'ampleur : des centaines meurent de chaque côté, du feu magique, des charges héroïques, des sacrifices. Les joueurs voient ça depuis l'entrée du tunnel puis disparaissent. Atmosphère : épique mais anxiogène.

Le tunnel nain est stable (grâce à l'ingénierie naine) et débouche dans le sous-sol de la Tour de Sombrelune. Un ingénieur nain, Torvak, les guide et dit : "De là, vous êtes seuls. Trouvez le Miroir. Trouvez Malachi. Finissez-en." Puis il scelle le tunnel.`,
    dialogues: [
      {
        npcId: 'npc_torvak', npcName: 'Ingénieur Torvak',
        lines: [
          { trigger: 'Le tunnel', text: `*Un nain nerveux, couvert de poussière de roche.* Le tunnel débouche dans une cave sous la Tour. Au-delà... je sais pas. On a creusé basé sur les vieilles cartes. Elles datent de 200 ans. *Il tient une torche.* Bon courage. Et rappelez-vous — si ça tourne mal, le tunnel sera scellé. On ne peut pas risquer que les ombres l'utilisent pour contourner l'armée.`, tone: 'nerveux-pragmatique' }
        ]
      }
    ],
    objectives: [
      { description: 'Assister au lancement de la bataille', type: 'special', optional: false },
      { description: 'Entrer dans le tunnel nain', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Entrée dans la Tour', nextScene: 'ch11_s2_tour_base', label: '→ Le Sous-sol de la Tour' }
    ],
    estimatedMinutes: 10, mood: 'bataille-épique',
    music: 'Bataille — orchestre complet, cuivres, percussions massives', location: 'Plaines de Sombrelune → Tunnel nain'
  },
  {
    id: 'ch11_s2_tour_base', chapterId: 'ch11', sceneNumber: 2,
    title: 'L\'Ascension de la Tour', type: 'exploration',
    readAloud: `L'intérieur de la Tour de Sombrelune est un cauchemar d'architecture. L'espace semble impossible — les escaliers montent, descendent, et parfois montent en descendant. Les murs sont faits de miroirs noirs qui reflètent des versions déformées de vous-mêmes. Les reflets bougent une fraction de seconde après vous.

Le sol vibre sous vos pieds — la bataille fait rage au-dessus. Des cris étouffés, des explosions de magie, des tremblements.

Lysandra touche un mur et retire sa main : "C'est... tiède. Comme de la peau. Cette Tour n'est pas un bâtiment. C'est un organisme. Elle est VIVANTE."`,
    gmNotes: `Donjon de la Tour : trois niveaux, chacun avec un obstacle.

Niveau 1 (Sous-sol) : Salle des Miroirs — piège d'illusion. Les reflets des joueurs dans les miroirs noirs tentent de les attaquer (des "clones d'ombre"). Chaque joueur doit affronter son reflet (mêmes stats mais 50% PV et vulnérable à la lumière radieuse). Intelligence DC 14 pour comprendre que briser les miroirs tue les reflets — pas besoin de combattre.

Niveau 2 (Étage) : Gardien — un Golem de Miroir Noir (CR 8, réfléchit les sorts — tout sort lancé contre lui a 50% de chance de rebondir sur le lanceur). Résistance à tout sauf dégâts contondants.

Niveau 3 (Sommet) : La Salle du Miroir — Malachi attend.`,
    dialogues: [],
    objectives: [
      { description: 'Traverser la Salle des Miroirs (Niveau 1)', type: 'combat', optional: false },
      { description: 'Vaincre le Golem de Miroir (Niveau 2)', type: 'combat', optional: false },
      { description: 'Atteindre le sommet de la Tour', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Arrivée au sommet', nextScene: 'ch11_s3_malachi', label: '→ Malachi en personne' }
    ],
    encounters: ['Clones d\'Ombre (1 par joueur — 50% PV)', 'Golem de Miroir Noir (CR 8)'],
    skillChecks: [
      { skill: 'Intelligence', dc: 14, success: 'Vous comprenez que les reflets sont liés aux miroirs — briser le miroir detruit le clone.', failure: 'Vous devez combattre votre clone directement.' }
    ],
    estimatedMinutes: 25, mood: 'donjon-horreur',
    music: 'Tour — dissonances, échos, miroirs', location: 'Tour de Sombrelune — Intérieur'
  },
  {
    id: 'ch11_s3_malachi', chapterId: 'ch11', sceneNumber: 3,
    title: 'Le Maître du Miroir', type: 'combat',
    readAloud: `Le sommet de la Tour est une plateforme circulaire ouverte au ciel noir. Au centre, le Miroir Brisé — un cadre de fer noir d'argent de trois mètres de haut, sans surface réfléchissante. À la place du verre, un tourbillon de ténèbres qui palpite comme un cœur.

Devant le Miroir, un homme. Grand, mince, vêtu de robes noires brodées de miroirs miniatures. Ses cheveux blancs flottent dans un vent qui ne souffle que pour lui. Ses yeux sont des éclats de miroir — littéralement — qui reflètent votre propre peur.

Malachi.

"Enfin." Sa voix est douce, presque tendre. "J'ai tellement attendu ce moment. Pas pour vous vaincre — pour vous convaincre."`,
    gmNotes: `BOSS FINAL PHASE 1 : Malachi, l'Héritier du Miroir (CR 13).
Stats : CA 18 (armure de miroir), PV 180. Immunité aux sorts de 3e niveau et moins (les miroirs les absorbent). Attaques : Rayon de Miroir (120 pieds, +10, 3d10 radieux + aveuglement DC 16 Con) et Éclat de Ténèbres (cône 30 pieds, DC 17 Dex, 8d6 nécrotique). Réactions : Réflexion (1/round, renvoie un sort attaquant vers le lanceur).

MAIS — Malachi essaie d'abord de PARLER. Il a un vrai argumentaire. Il croit sincèrement que le Miroir libérera le monde de la souffrance. Il offre aux joueurs la possibilité de "voir" le Miroir — un test de Sagesse DC 18 pour résister. Échec : le joueur est charmé pour 1 round et voit une "vision de paradis" (c'est une illusion). Réussite : le joueur voit la vérité — le Miroir est une prison, et Malachor à l'intérieur est un monstre.

Si les joueurs refusent de parler ou attaquent, Malachi combat. Il est puissant mais pas imbattable — surtout si les joueurs utilisent le Marteau de Thogrund (qui désactive son immunité aux sorts) et l'Éclat de Lumière (qui le stun pour 1 round).

TWIST : Quand Malachi est réduit à 30 PV, il se jette dans le Miroir. Le tourbillon l'absorbe. Et le Miroir commence à pulser plus fort. Le sol tremble. La Tour craque. Et la voix de MALACHOR résonne...`,
    dialogues: [
      {
        npcId: 'npc_malachi', npcName: 'Malachi',
        lines: [
          { trigger: 'Dialogue', text: `*Il ne fait pas un geste hostile.* Je ne suis pas votre ennemi. Pas vraiment. Je suis le messager d'un monde meilleur. Malachor — le Septième Héros — n'a pas trahi par ambition. Il a trahi parce qu'il avait VU. Le Miroir lui a montré un monde sans guerre, sans maladie, sans mort. Les Six autres ont eu peur. Ils l'ont emprisonné. Et le monde a continué de souffrir.`, tone: 'convaincu' },
          { trigger: 'Refus', text: `*Son visage se durcit.* Dommage. J'espérais que vous comprendriez. Les Six Héros ont scellé un SAUVEUR par lâcheté. Et vous défendez leur héritage de peur. *Ses mains crépitent de magie-miroir.* Si la raison ne vous touche pas, la force le fera. Pour Malachor. Pour le Miroir. Pour un monde libéré.`, tone: 'résolu' },
          { trigger: 'Vaincu', text: `*Chancelant, ensanglanté.* Vous... ne pouvez pas arrêter... ce qui a déjà commencé... *Il se jette dans le Miroir.* MALACHOR ! JE T'AI AMENÉ LES CLÉS ! OUVRE ! OUVRE-TOI !`, tone: 'fanatique-désespéré' }
        ]
      }
    ],
    objectives: [
      { description: 'Affronter Malachi au sommet de la Tour', type: 'combat', optional: false },
      { description: 'Résister à la tentation du Miroir', type: 'special', optional: false },
      { description: 'Vaincre Malachi', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Malachi absorbé par le Miroir', nextScene: 'ch11_s4_miroir', label: '→ Le Miroir s\'ouvre' }
    ],
    encounters: ['Malachi, l\'Héritier du Miroir (CR 13)'],
    skillChecks: [
      { skill: 'Sagesse (JDS)', dc: 18, success: 'Vous voyez la vérité dans le Miroir — la prison de Malachor, pas un paradis. Vous résistez au charme.', failure: 'Le Miroir vous montre un monde parfait — vous êtes charmé pour 1 round.' }
    ],
    loot: ['Robes de Malachi (armure CA 16, résistance nécrotique)'],
    estimatedMinutes: 30, mood: 'boss-final-phase-1',
    music: 'Malachi — orgue, miroirs brisés, crescendo', location: 'Tour de Sombrelune — Sommet, Salle du Miroir'
  },
  {
    id: 'ch11_s4_miroir', chapterId: 'ch11', sceneNumber: 4,
    title: 'Le Miroir S\'ouvre', type: 'narration',
    readAloud: `Le Miroir Brisé pulse une fois. Deux fois. Trois fois — chaque pulsion plus forte que la précédente. Le cadre de fer noir tremble, grince, et se fissure. Le tourbillon de ténèbres s'élargit, dévorant la lumière.

Et une main émerge du tourbillon. Une main immense, d'une pâleur cadavérique, les doigts terminés par des griffes de cristal noir.

Puis un visage. Beau et terrible. Le visage d'un ange déchu — des traits parfaits, des yeux qui contiennent des galaxies de noirceur, un sourire qui promet tout et ne tient rien.

Malachor, le Septième Héros, le Premier Traître, le Seigneur des Ombres, commence à émerger du Miroir.

La Tour tremble. Le ciel se déchire. En bas, la bataille s'arrête — les deux armées regardent vers le haut, frappées d'horreur.

Lysandra hurle : "LE MIROIR ! DÉTRUISEZ LE CADRE ! NE LE LAISSEZ PAS SORTIR !"`,
    gmNotes: `MOMENT CLIMACTIQUE. Les joueurs ont un choix : 
1) Attaquer le CADRE du Miroir pour le refermer (CA 20, 100 PV, immunité aux sorts non-radiants). Le Marteau de Thogrund fait double dégâts contre le cadre.
2) Attaquer MALACHOR directement (futile à ce stade — il a CR 20+ en pleine puissance).
3) Utiliser l'Éclat de Lumière de Théodore pour sceller le Miroir d'un coup.

La bonne réponse est une combinaison : l'Éclat de Lumière affaiblit le cadre (50 PV instantanés), puis le Marteau de Thogrund finit le travail. Si les joueurs n'ont plus l'Éclat (utilisé avant), le combat est plus long mais faisable — chaque joueur frappe le cadre pendant 3 rounds.

Malachor résiste et attaque DEPUIS le Miroir (Rayon d'Ombre, +15, 4d10 nécrotique) mais il n'est pas encore sorti complètement — il est vulnérable. Quand le cadre est détruit, Malachor est aspiré DANS le Miroir avec un hurlement qui fait trembler le continent. Le Miroir implose.

FIN DU CHAPITRE 11.`,
    dialogues: [
      {
        npcId: 'npc_malachor', npcName: 'Malachor (émergent)',
        lines: [
          { trigger: 'Émergence', text: `*Sa voix résonne comme un tremblement de terre.* ENFIN. 120 ans dans le néant. 120 ans à regarder un monde qui aurait dû être MIEN. *Sa main s'étend.* Vous êtes les héritiers des Six Lâches qui m'ont emprisonné. Vous portez leurs outils. Leurs armes. Leurs PEURS. *Rire.* Mais vous n'avez pas leur pouvoir. Vous n'êtes que des ENFANTS jouant avec le feu des dieux.`, tone: 'divin-menaçant' }
        ]
      }
    ],
    objectives: [
      { description: 'Empêcher Malachor d\'émerger du Miroir', type: 'combat', optional: false },
      { description: 'Détruire le cadre du Miroir Brisé', type: 'special', optional: false },
      { description: 'Sceller Malachor dans la dimension miroir', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Miroir détruit — FIN DU CHAPITRE 11', nextScene: 'ch12_s1_apres', label: '→ Ch.12 : Épilogue' }
    ],
    encounters: ['Malachor (partiel — CR impossible, attaques depuis le Miroir)', 'Cadre du Miroir (CA 20, 100 PV)'],
    loot: ['Fragment du Miroir Brisé (souvenir, objet de quête épilogue)', 'Victoire'],
    estimatedMinutes: 25, mood: 'climax-apocalyptique',
    music: 'Apocalypse — orgue, chœurs, tonnerre, silence', location: 'Tour de Sombrelune — Sommet, devant le Miroir'
  }
];
// ── Stat Blocks ──────────────────────────────────────────────────────
const CH11_STAT_BLOCKS: Record<string, import('./types').StatBlock> = {
  malachi: {
    name: 'Malachi le Miroir — Boss Final', cr: '12', ac: 18, hp: 210,
    speed: '30 ft., vol 60 ft. (lévitation)',
    abilities: { str: 14, dex: 16, con: 18, int: 20, wis: 15, cha: 22 },
    attacks: [
      { name: 'Rayon du Miroir (×2)', bonus: '+10', damage: '3d8+5 force', notes: 'Portée 120 ft.' },
      { name: 'Toucher de l\'Oubli', bonus: '+8', damage: '2d10+5 nécrotique', notes: 'JDS Sagesse DC 17 ou perte d\'un sort préparé aléatoire.' },
      { name: 'Fragment de Réalité (recharge 5-6)', bonus: '', damage: '8d6 force', notes: 'Sphère 30 pieds. JDS Dextérité DC 18. La zone devient "terrain miroir" : chaque créature y voit son double hostile (illusion, CA 10, 1 PV, attaque +5, 1d6 psychique).' }
    ],
    specialAbilities: [
      'Bouclier miroir : renvoie le premier sort de niveau 3 ou moins par round (comme Renvoi des sorts).',
      'Lévitation permanente.',
      'Vue du Miroir : ne peut pas être surpris, immunité aveuglé.',
      'Absorption de vie : quand il réduit une créature à 0 PV, regagne 20 PV.',
      'Résistance légendaire (3/jour) : réussit automatiquement un JDS raté.'
    ],
    legendary: [
      'Déplacement miroir (1 action) : se téléporte à 30 pieds dans un reflet.',
      'Éclat aveuglant (2 actions) : flash de lumière, toutes les créatures à 30 pieds, JDS Constitution DC 16 ou aveuglées 1 round.',
      'Invocation de double (3 actions) : crée un clone illusoire avec la moitié de ses PV. Le clone disparaît après 3 rounds.'
    ],
    lairActions: [
      'Le Miroir Brisé pulse — toutes les créatures dans la salle font JDS Sagesse DC 15 ou sont charmées 1 round (marchent vers le Miroir).',
      'Fragments de miroir volants — 2d6 tranchant à toutes les créatures, JDS Dextérité DC 14.',
      'Écho temporel — Malachi répète l\'action d\'un PJ avec les mêmes stats.'
    ],
    weakness: 'Le Miroir Brisé est sa source de pouvoir. Si les PJ le frappent (CA 20, 50 PV), Malachi perd ses actions légendaires et son bouclier miroir. Dégâts radiants : ignore sa résistance.'
  },
  garde_ombre_elite: {
    name: 'Garde d\'Ombre Élite', cr: '5', ac: 16, hp: 78,
    speed: '30 ft.',
    abilities: { str: 16, dex: 16, con: 14, int: 10, wis: 12, cha: 8 },
    attacks: [
      { name: 'Épée d\'ombre (×2)', bonus: '+6', damage: '1d8+3 tranchant + 1d8 nécrotique', notes: '' },
      { name: 'Javelot d\'ombre', bonus: '+6', damage: '1d6+3 perforant + 1d6 nécrotique', notes: 'Se désintègre après l\'impact.' }
    ],
    specialAbilities: [
      'Vision dans le noir 120 pieds.',
      'Fusion dans l\'ombre : avantage Discrétion dans la pénombre.',
      'Fanatisme : immunité charme, peur.',
      'Lien de mort : quand un autre garde d\'ombre meurt à 30 pieds, gagne 10 PV temporaires et avantage à sa prochaine attaque.'
    ]
  }
};

// ── Room Descriptions ────────────────────────────────────────────────
const CH11_ROOMS: import('./types').RoomDescription[] = [
  {
    id: 'tour_entree', name: 'Entrée de la Tour de Sombrelune',
    readAloud: 'Des portes de fer noir hautes de 10 mètres, gravées de symboles qui pulsent d\'une lumière violette. Le sol est en obsidienne polie — chaque pas résonne. De part et d\'autre, des statues de guerriers enchaînés, visages tordus de douleur. L\'air est glacial, chargé de magie noire.',
    gmNotes: '4 Gardes d\'ombre élites patrouillent. Les statues sont des vrais guerriers pétrifiés (si dispel magic niveau 5, libère un allié NPC guerrier vétéran). Piège sur la 3ème dalle : Perception DC 15, 4d6 nécrotique si déclenché.',
    exits: [
      { direction: 'Escalier', targetRoomId: 'tour_salle_miroir', description: 'Escalier en spirale montant (300 marches)' },
      { direction: 'Sous-sol', targetRoomId: 'tour_cachots', description: 'Escalier descendant vers les cachots' }
    ],
    dimensions: '15m × 10m, plafond 12m', lighting: 'magique',
    creatures: ['4× Gardes d\'ombre élite'],
    traps: [{ name: 'Dalle maudite', detectionDC: 15, disarmDC: 13, effect: 'Explosion nécrotique', damage: '4d6 nécrotique, JDS Dextérité DC 14' }]
  },
  {
    id: 'tour_salle_miroir', name: 'Salle du Miroir Brisé — Sommet',
    readAloud: 'Une salle circulaire au sommet de la tour. Au centre, suspendu dans les airs, un miroir brisé de 3 mètres dont les fragments flottent en orbite lente, liés par des filaments d\'énergie violette. Chaque fragment reflète un monde différent — certains montrent des paysages morts, d\'autres des armées de morts-vivants prêtes à traverser.',
    gmNotes: 'Le Miroir Brisé : CA 20, 50 PV. Le détruire affaiblit Malachi. 5 rounds après le début du combat, le Miroir tente d\'ouvrir un portail : les PJ ont 3 rounds pour finir Malachi ou le Miroir s\'ouvre et des renforts morts-vivants surgissent (2d4 zombies/round).',
    exits: [{ direction: 'Bas', targetRoomId: 'tour_entree', description: 'Escalier en spirale descendant' }],
    dimensions: '12m diamètre, plafond ouvert sur le ciel', lighting: 'magique',
    creatures: ['Malachi le Miroir', '2× Gardes d\'ombre élite'],
    interactables: [
      { name: 'Miroir Brisé', description: 'Artefact central, source du pouvoir de Malachi', skill: 'Arcanes', dc: 15, result: 'Comprend que détruire le Miroir affaiblit Malachi' },
      { name: 'Fragments orbitaux', description: 'Fragments flottants reflétant d\'autres mondes', skill: 'Perception', dc: 14, result: 'Identifie un fragment clé — le frapper en premier réduit la CA du Miroir de 5' }
    ]
  }
];

// ── Side Quests ──────────────────────────────────────────────────────
const CH11_SIDE_QUESTS: import('./types').SideQuest[] = [
  {
    id: 'sq_prisonniers_tour',
    title: 'Libérer les Prisonniers de la Tour',
    description: 'Les cachots de la Tour contiennent des prisonniers de guerre — soldats, espions, et un ancien compagnon des Sept Héros. Les libérer offre des renforts pour le combat final.',
    giver: 'Information obtenue par un éclaireur allié',
    reward: '5 soldats vétérans alliés + ancien héros Kael le Brisé (combattant niveau 8 blessé mais déterminé)',
    objectives: [
      'Descendre dans les cachots pendant l\'infiltration de la Tour',
      'Éliminer les 2 geôliers (Gardes d\'ombre)',
      'Briser les chaînes enchantées (Force DC 16 ou Arcanes DC 14 pour dispel)',
      'Soigner les prisonniers (Médecine DC 11 pour les plus gravement blessés)',
      'Les guider vers une sortie sûre ou les positionner pour l\'assaut final'
    ],
    consequenceIfIgnored: 'Les prisonniers sont sacrifiés par Malachi — +30 PV au boss et 1 action légendaire supplémentaire.',
    estimatedMinutes: 30, difficulty: 'difficile'
  },
  {
    id: 'sq_sabotage_cristaux',
    title: 'Sabotage des Cristaux de Pouvoir',
    description: 'La Tour est alimentée par 3 cristaux nécrotiques dans ses murs. Les détruire affaiblit les défenses et les pièges de la Tour.',
    giver: 'Connaissance découverte dans les notes de Lyara (ch10)',
    reward: 'Tous les pièges de la Tour sont désactivés + Malachi perd sa résistance légendaire 1/3 (passe de 3 à 2)',
    objectives: [
      'Localiser les 3 cristaux dans la Tour (Perception DC 13 chaque, 1 par étage)',
      'Détruire chaque cristal (CA 13, 20 PV, mais explose en 2d6 nécrotique à 10 pieds à la destruction)',
      'Détruire les 3 avant d\'atteindre le sommet'
    ],
    consequenceIfIgnored: 'Pièges actifs dans la Tour. Malachi conserve toute sa puissance.',
    estimatedMinutes: 20, difficulty: 'moyen'
  }
];

// ── Random Encounters (dans la Tour) ─────────────────────────────────
const CH11_RANDOM_ENCOUNTERS: import('./types').RandomEncounter[] = [
  { d20Range: '1-5', description: 'Patrouille de gardes d\'ombre (3) — CR 5 chacun. Se coordonnent par sifflement. Si un s\'enfuit, renfort en 2 rounds.', difficulty: 'difficile', creatures: ['Garde d\'ombre élite', 'Garde d\'ombre élite', 'Garde d\'ombre élite'], loot: ['Clé de cellule', 'Potion de soins'] },
  { d20Range: '6-10', description: 'Piège nécrotique — runes au sol, Perception DC 14 pour voir. 3d8 nécrotique, JDS Dextérité DC 15. Désarmer: Arcanes DC 14.', difficulty: 'moyen', loot: ['Gemme nécrotique (50 PO, composant)'] },
  { d20Range: '11-14', description: 'Apparition d\'un ancien héros — esprit bienveillant qui offre un conseil tactique. Avantage au prochain jet de combat du groupe.', difficulty: 'facile', loot: ['Conseil tactique (avantage)'] },
  { d20Range: '15-17', description: 'Salle de trésors piégée — 500 PO visibles sur un piédestal. Toucher déclenche 4d6 force + téléportation dans les cachots. Performance DC 14 pour désarmer.', difficulty: 'difficile', loot: ['500 PO si piège désamorcé'] },
  { d20Range: '18-20', description: 'Faille miroir — un fragment du Miroir Brisé est encastré dans le mur. Le toucher montre une vision du plan de Malachi. Intelligence DC 13 pour comprendre son point faible.', difficulty: 'facile', loot: ['Information tactique sur Malachi'] }
];

export const CHAPTER_11: NarrativeChapter = {
  id: 'ch11', number: 11, title: 'La Bataille de Sombrelune',
  subtitle: 'L\'assaut final, Malachi, et le Miroir',
  summary: 'Bataille massive des armées alliées, infiltration de la Tour, confrontation avec Malachi, et destruction du Miroir Brisé pour empêcher le retour de Malachor.',
  suggestedLevel: 12, region: 'Tour de Sombrelune',
  themes: ['Bataille finale', 'Boss', 'Climax', 'Sacrifice'],
  scenes: CH11_SCENES, previousChapter: 'ch10', nextChapter: 'ch12',
  sideQuests: CH11_SIDE_QUESTS,
  randomEncounters: CH11_RANDOM_ENCOUNTERS,
  statBlocks: CH11_STAT_BLOCKS,
  roomDescriptions: CH11_ROOMS
};
