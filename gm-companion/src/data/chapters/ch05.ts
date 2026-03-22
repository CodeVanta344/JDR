/**
 * CHAPITRE 5 : LE COL DES TEMPÊTES (Niveau 6-7)
 * 6 scènes — Embuscade, boss intermédiaire, révélations
 */
import type { NarrativeScene, NarrativeChapter } from './types';

const CH5_SCENES: NarrativeScene[] = [
  {
    id: 'ch5_s1_col', chapterId: 'ch5', sceneNumber: 1,
    title: 'L\'Ascension', type: 'exploration',
    readAloud: `Le Col des Tempêtes porte bien son nom. À trois mille mètres d'altitude, le vent hurle en permanence entre les pics déchiquetés, charriant des rafales de neige et de grêle. La route est un sentier étroit taillé dans la falaise, large de deux mètres à peine, avec un précipice vertigineux d'un côté et une paroi de roche nue de l'autre.

Votre convoi — les guerriers nains du Thane Durinn forment l'arrière-garde — progresse lentement. Lysandra, en éclaireur, grimpe comme un chat, insensible au vertige. Mais même elle semble inquiète : "Les traces... il y a beaucoup de traces. Et pas seulement des créatures d'ombre. Des bottes. Des dizaines de paires de bottes. Le culte est passé ici en nombre."`,
    gmNotes: `Ascension difficile avec des obstacles naturels et des éléments de survie. Constitution DC 12 pour résister au froid et à l'altitude (échec : un niveau d'Épuisement). Athlétisme DC 13 pour les passages les plus difficiles. La tension monte avec les traces du culte — c'est la première fois que les joueurs réalisent que Malachi a une armée, pas seulement des sbires isolés. Lysandra repère un campement abandonné du culte (Investigation DC 11) : feux éteints depuis deux jours, restes de repas, et un symbole du Miroir Brisé gravé dans un rocher avec les mots "Le Septième s'éveille" — une prophétie du culte.`,
    dialogues: [
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Les traces', text: `*Accroupie dans la neige.* Trente paires de bottes au minimum. Des humains, deux ou trois demi-orcs, peut-être un ogre d'après la profondeur des empreintes. Ils sont passés il y a deux jours. *Elle se relève.* Et ils ne cachaient pas leurs traces. Ils sont sûrs d'eux. Ou ils veulent qu'on les suive.`, tone: 'analytique-inquiète' },
          { trigger: 'Le campement', text: `*Examinant les restes.* Pas de laisser-aller — c'est une troupe organisée. Tentes, gardes, patrouilles. *Elle ramasse un parchemin froissé.* "Le Septième s'éveille." Le Septième Sceau ? Ou le Septième Héros — le traître ? *Fronce les sourcils.* Plus on avance, moins je comprends le plan de Malachi.`, tone: 'frustrée' }
        ]
      }
    ],
    objectives: [
      { description: 'Traverser le Col des Tempêtes', type: 'travel', optional: false },
      { description: 'Examiner le campement abandonné du culte', type: 'investigate', optional: true }
    ],
    transitions: [
      { condition: 'Approche du sommet du col', nextScene: 'ch5_s2_embuscade', label: '→ Embuscade !' }
    ],
    skillChecks: [
      { skill: 'Constitution (JDS)', dc: 12, success: 'Vous résistez au froid et à l\'altitude sans difficulté.', failure: 'Le froid et l\'altitude vous épuisent — un niveau d\'Épuisement.' },
      { skill: 'Athlétisme', dc: 13, success: 'Vous franchissez les passages difficiles avec assurance.', failure: 'Vous glissez et manquez de tomber — Dextérité DC 12 pour vous rattraper ou 2d6 dégâts de chute.' }
    ],
    estimatedMinutes: 12, mood: 'ascension-survie',
    music: 'Montagne — vent, isolement, tension croissante', location: 'Col des Tempêtes — Sentier d\'ascension'
  },
  {
    id: 'ch5_s2_embuscade', chapterId: 'ch5', sceneNumber: 2,
    title: 'Le Piège du Col', type: 'combat',
    readAloud: `Au sommet du col, la route s'élargit en un plateau battu par les vents. Des blocs de pierre offrent un couvert naturel. C'est un endroit parfait pour une embuscade — et le culte le sait.

Le premier signe est une flèche noire qui se plante dans la neige à vos pieds. Puis un cri de guerre retentit de toutes les directions. Des silhouettes en cape noire surgissent de derrière les rochers — cultistes armés, une vingtaine au moins, avec à leur tête une femme en armure sombre, un fouet d'ombre enroulé autour de son poing.

"Le Maître vous salue, Sentinelles des Sceaux ! Il admire votre persévérance. Mais cette route vous est fermée. Par la force ou par la mort — à vous de choisir."`,
    gmNotes: `COMBAT D'EMBUSCADE : Capitaine Cultiste Zara (CR 4, spécialiste du fouet d'ombre — 15 pieds de portée, 2d6+3 nécrotique) + 12 Cultistes (CR 1/8) + 2 Berserkers d'Ombre (CR 2 — humains augmentés par la magie d'ombre). Les guerriers nains combattent une partie des cultistes, mais les joueurs doivent affronter Zara et les Berserkers. Si les joueurs capturent Zara, elle révèle (sous Intimidation DC 14) que Malachi a déjà brisé un Sceau supplémentaire — le Sceau du Lac, dans les ruines d'Ashka. Zara est fanatique mais pas suicidaire — elle se rend si réduite à 10 PV ou moins.

Après le combat : un des guerriers nains est blessé grièvement. Moment de roleplay : les joueurs doivent décider de ralentir pour le soigner ou le confier aux nains restants.`,
    dialogues: [
      {
        npcId: 'npc_zara', npcName: 'Capitaine Zara',
        lines: [
          { trigger: 'Combat', text: `*Elle fait claquer son fouet d'ombre — un tentacule noir qui déchire l'air.* Le Maître m'a dit de ne pas vous sous-estimer. Je ne ferai pas cette erreur. *Elle attaque.* Pour le Miroir !`, tone: 'agressive' },
          { trigger: 'Vaincue', text: `*Crachant du sang.* Tuez-moi. Je ne parlerai pas. *Pause.* ...D'accord. Le Maître m'abandonnera de toute façon — j'ai échoué. *Son regard se durcit.* Le Sceau du Lac est DÉJÀ brisé. Ashka est tombée. Vous courez après des cendres.`, tone: 'amère' },
          { trigger: 'Malachi', text: `Vous ne comprenez pas ce qu'il est. Malachi n'est pas un sorcier ordinaire. Il a... vu le Miroir. Il a regardé dedans. Ce qu'il a vu l'a changé. Lui a donné un pouvoir que vous ne pouvez pas imaginer. Et un plan vieux de plus d'un siècle. Vous êtes des pions sur son échiquier.`, tone: 'fanatique-résignée' }
        ]
      }
    ],
    objectives: [
      { description: 'Survivre à l\'embuscade du culte', type: 'combat', optional: false },
      { description: 'Vaincre la Capitaine Zara', type: 'combat', optional: false },
      { description: 'Extraire des informations de Zara (optionnel)', type: 'talk', optional: true }
    ],
    transitions: [
      { condition: 'Embuscade repoussée', nextScene: 'ch5_s3_descent', label: '→ Descente vers les plaines' }
    ],
    encounters: ['Capitaine Zara (CR 4)', '12x Cultiste (CR 1/8)', '2x Berserker d\'Ombre (CR 2)'],
    skillChecks: [
      { skill: 'Intimidation', dc: 14, success: 'Zara révèle que le Sceau du Lac à Ashka est déjà brisé — Malachi a frappé pendant que les joueurs étaient à Hammerdeep.', failure: 'Zara se tait obstinément.' }
    ],
    loot: ['Fouet d\'Ombre de Zara (arme, 2d6 nécrotique, portée 15 pieds)', 'Ordres de mission de Malachi (carte des Sceaux restants)', '350 PO'],
    estimatedMinutes: 25, mood: 'combat-montagne',
    music: 'Embuscade — cuivres, percussion, chaos', location: 'Col des Tempêtes — Plateau sommital'
  },
  // Nouvelle scène : Descente et décision
  {
    id: 'ch5_s3_descent', chapterId: 'ch5', sceneNumber: 3,
    title: 'Le Choix du Carrefour', type: 'dialogue',
    readAloud: `Après le combat, la descente vers les plaines orientales offre un panorama saisissant. D'un côté, la Sylve d'Émeraude — le royaume elfique — s'étend comme un tapis de verdure sous le soleil. De l'autre, au nord-est, les ruines d'Ashka — une cité antique détruite pendant l'Ère des Cendres — se découpent comme des os de géant dans un désert de pierre.

Les ordres de Malachi, trouvés sur Zara, confirment : le culte a frappé à Ashka. Mais les ordres mentionnent aussi "l'Agent dans la Sylve" — un espion au sein du royaume elfique.

Lysandra est face à un dilemme : "Mon peuple doit être prévenu. Mais si Ashka est tombée..." Elle vous regarde. "Nous devons nous séparer, ou choisir."`,
    gmNotes: `Moment de décision stratégique pour les joueurs. Trois options :
1) Aller à Ashka d'abord (Ch6) — affronter les conséquences d'un Sceau brisé et tenter de le restaurer.
2) Aller à la Sylve d'Émeraude d'abord (Ch7) — prévenir les elfes et démasquer l'espion.
3) Se séparer — un groupe va à Ashka, l'autre à la Sylve (le MJ gérera les deux threads en alternance).

Recommandation pour le MJ : guider vers Ashka d'abord (plus urgent), Sylve ensuite. Mais laisser le choix aux joueurs. Quel que soit le choix, l'autre destination sera le chapitre suivant.`,
    dialogues: [
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Le dilemme', text: `*Elle serre les mâchoires.* Mon cœur dit la Sylve — mon peuple est en danger. Mais ma raison dit Ashka — un Sceau brisé libère des horreurs chaque seconde qui passe. *Elle vous regarde.* C'est votre choix aussi. Je suivrai la majorité.`, tone: 'déchirée' },
          { trigger: 'Ashka', text: `Si nous allons à Ashka, nous trouverons les ruines du Sceau brisé et peut-être un moyen de le réparer. Mais le voyage est dangereux — les plaines autour d'Ashka sont un désert empoisonné par la magie des Cendres. Et les créatures d'ombre y sont plus fortes.`, tone: 'analytique' },
          { trigger: 'La Sylve', text: `Si nous allons à la Sylve, nous prévenons les elfes et nous démasquons l'espion. Mais pendant ce temps, Ashka se détériore. Et si les créatures d'ombre traversent les plaines et atteignent les villes humaines...`, tone: 'inquiète' }
        ]
      }
    ],
    objectives: [
      { description: 'Analyser les ordres de Malachi', type: 'investigate', optional: false },
      { description: 'Choisir la prochaine destination : Ashka ou la Sylve', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Choix : Ashka', nextScene: 'ch5_s4_plaines', label: '→ Route vers Ashka (recommandé)' },
      { condition: 'Choix : La Sylve d\'Émeraude', nextScene: 'ch7_s1_sylve', label: '→ Route vers la Sylve (ch7 en avance)' }
    ],
    estimatedMinutes: 10, mood: 'décision-stratégique',
    music: 'Carrefour — silence, vent, gravité', location: 'Contrefort est du Col des Tempêtes'
  },
  {
    id: 'ch5_s4_plaines', chapterId: 'ch5', sceneNumber: 4,
    title: 'Les Plaines de Cendres', type: 'exploration',
    readAloud: `Les Plaines de Cendres sont un cauchemar géologique. Le sol est gris, craquelé, couvert d'une poussière fine qui s'envole au moindre souffle de vent. Rien ne pousse ici — pas un brin d'herbe, pas un arbuste. L'horizon est une ligne droite de néant gris, interrompue seulement par les ruines distantes d'Ashka.

L'air est lourd, chargé de particules magiques résiduelles. La magie qui a détruit cette terre il y a 120 ans est encore palpable — vos sorts se comportent étrangement, les flammes tirent vers le bleu, et les ombres sont trop longues pour l'heure de la journée.

Au milieu des plaines, des ossements gigantesques émergent de la cendre — les restes pétrifiés d'un dragon, ou de quelque chose de plus grand encore.`,
    gmNotes: `Les Plaines de Cendres sont un environnement hostile. Effets :
- Sorts de feu : imprévisibles (+1d4 dégâts OU -1d4 dégâts, pile ou face).
- Repos long : récupération de PV réduite de 25% (la magie résiduelle interfère).
- Perception : -2 malus constant (la poussière et les distorsions visuelles).
Les joueurs peuvent trouver des artefacts dans les cendres (Survie DC 14) : un morceau d'armure pré-impériale (valeur historique 200 PO) ou une gemme de feu enchantée (utilisable comme composant de sort). Les ossements de dragon sont en fait ceux d'un Wyrm d'Ombre — la créature que les Sept Héros ont tuée lors de la bataille finale de l'Ère des Cendres.`,
    dialogues: [],
    objectives: [
      { description: 'Traverser les Plaines de Cendres', type: 'travel', optional: false },
      { description: 'Fouiller les vestiges de la grande bataille (optionnel)', type: 'investigate', optional: true }
    ],
    transitions: [
      { condition: 'Approche d\'Ashka', nextScene: 'ch5_s5_ashka_approche', label: '→ Aux portes d\'Ashka' }
    ],
    skillChecks: [
      { skill: 'Survie', dc: 14, success: 'Vous trouvez un artefact dans les cendres — un morceau d\'armure gravée ou une gemme de feu enchantée.', failure: 'Les plaines sont stériles — rien d\'utile ne subsiste.' },
      { skill: 'Arcanes', dc: 13, success: 'La magie résiduelle est le résultat d\'un sort de destruction massive — niveau 9 au minimum. Quelque chose d\'incroyablement puissant a été libéré ici il y a 120 ans.', failure: 'La magie est chaotique et illisible.' }
    ],
    estimatedMinutes: 10, mood: 'désolation-post-apocalyptique',
    music: 'Désert de cendres — vent, silence, grésillements magiques', location: 'Plaines de Cendres'
  },
  {
    id: 'ch5_s5_ashka_approche', chapterId: 'ch5', sceneNumber: 5,
    title: 'Les Portes d\'Ashka', type: 'narration',
    readAloud: `Ashka était autrefois la plus grande ville du continent — une cité de marbre et de cristal, centre du savoir et de la magie. Aujourd'hui, ce ne sont que des ruines colossales : des colonnes brisées hautes comme des tours, des arches effondrées, des rues de mosaïques craquelées couvertes de cendre.

Mais quelque chose a changé récemment. Là où il n'y avait que du silence et de la mort, il y a maintenant... du mouvement. Des ombres glissent entre les ruines. Des lumières verdâtres pulsent dans les bâtiments les plus profonds. Et au centre de la ville, là où se dressait autrefois le Grand Temple, une colonne de fumée noire monte vers le ciel comme un doigt accusateur.

Le Sceau du Lac d'Ashka est au centre de cette colonne. Et autour de lui, un campement du culte — des tentes, des gardes, des rituels en cours. C'est une opération militaire, pas une simple profanation.`,
    gmNotes: `Vue d'ensemble d'Ashka — les joueurs planifient leur approche. Le campement du culte compte environ 50 cultistes, un lieutenant nommé Gorvan (demi-orc berserker, CR 5), et un ritualiste (mage cultiste, CR 3). Le Sceau du Lac est un bassin de marbre au centre du Grand Temple — maintenant rempli d'eau noire et de fumée. Les options d'approche : 1) Assaut frontal (difficile, avec l'aide des nains). 2) Infiltration de nuit (Discrétion DC 14 par groupe). 3) Diversion (les nains attaquent d'un côté, les joueurs infiltrent de l'autre).

C'est un setup pour le combat du chapitre 6 — cette scène est la reconnaissance.`,
    dialogues: [
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Reconnaissance', text: `*À plat ventre sur un rebord de ruine, observant le campement.* Cinquante cultistes, peut-être plus. Gardes régulières, patrouilles organisées. Un demi-orc massif qui semble diriger les opérations. Et au centre... le rituel. Le Sceau est déjà brisé — la colonne de fumée le prouve. Mais ils continuent quelque chose. Un rituel secondaire ?`, tone: 'analytique' },
          { trigger: 'Plan', text: `Trois options. Assaut frontal — les nains sont bons pour ça, mais on perdra des gens. Infiltration de nuit — plus sûr, mais si on se fait repérer, on est encerclés. Ou diversion — les nains attaquent les portes Sud, on se faufile par les ruines Nord. *Elle vous regarde.* Votre choix, capitaine.`, tone: 'militaire' }
        ]
      }
    ],
    objectives: [
      { description: 'Reconnaître le campement du culte à Ashka', type: 'investigate', optional: false },
      { description: 'Choisir une stratégie d\'approche', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Plan choisi — FIN DU CHAPITRE 5', nextScene: 'ch6_s1_assaut', label: '→ Ch.6 : La Bataille d\'Ashka' }
    ],
    estimatedMinutes: 10, mood: 'planification-guerre',
    music: 'Ruines — vent entre les colonnes, rumeur lointaine', location: 'Ruines d\'Ashka — Point d\'observation'
  }
];
// ── Stat Blocks ──────────────────────────────────────────────────────
const CH5_STAT_BLOCKS: Record<string, import('./types').StatBlock> = {
  wyverne_givre: {
    name: 'Wyverne de Givre', cr: '4', ac: 14, hp: 75,
    speed: '20 ft., vol 80 ft.',
    abilities: { str: 17, dex: 12, con: 16, int: 5, wis: 12, cha: 6 },
    attacks: [
      { name: 'Morsure', bonus: '+5', damage: '2d6+3 perforant + 1d6 froid', notes: '' },
      { name: 'Griffes', bonus: '+5', damage: '2d4+3 tranchant', notes: '' },
      { name: 'Queue empoisonnée', bonus: '+5', damage: '1d6+3 perforant', notes: 'JDS Con DC 14 ou 3d6 poison et empoisonné 1 minute.' }
    ],
    specialAbilities: [
      'Résistance au froid.',
      'Vol plongeant : si la wyverne vole au moins 30 pieds en ligne droite, sa prochaine attaque de morsure inflige 2d6 perforant supplémentaires.',
      'Territorial : n\'attaque que les intrus dans son nid au sommet du col.'
    ],
    weakness: 'Feu — désavantage à ses jets d\'attaque pendant 1 round après avoir subi des dégâts de feu.'
  },
  chef_embuscade: {
    name: 'Chef Cultiste Varuk', cr: '3', ac: 15, hp: 52,
    speed: '30 ft.',
    abilities: { str: 16, dex: 14, con: 14, int: 10, wis: 11, cha: 13 },
    attacks: [
      { name: 'Épée longue', bonus: '+5', damage: '1d8+3 tranchant + 1d4 nécrotique', notes: '' },
      { name: 'Commandement ténébreux (recharge 5-6)', bonus: '', damage: '', notes: 'Tous les cultistes dans un rayon de 30 pieds gagnent avantage à leur prochaine attaque.' }
    ],
    specialAbilities: [
      'Armure occulte : CA inclut un bonus de +2 d\'une protection nécrotique.',
      'Fanatique : avantage aux JDS contre Charme et Peur.',
      'Dernier souffle : en tombant à 0 PV, émet une explosion nécrotique (2d6 nécrotique, 10 pieds, JDS Constitution DC 12).'
    ],
    weakness: 'Radiant — les dégâts radiants annulent son armure occulte pendant 1 round (CA 13 au lieu de 15).'
  }
};

// ── Side Quests ──────────────────────────────────────────────────────
const CH5_SIDE_QUESTS: import('./types').SideQuest[] = [
  {
    id: 'sq_messager_prisonnier',
    title: 'Le Messager Prisonnier',
    description: 'Un messager de Sol-Aureus est retenu captif par les cultistes dans une grotte en contrebas du col. Il porte des informations cruciales sur les défenses de la ville.',
    giver: 'Découverte pendant l\'exploration (Perception DC 13 : cris étouffés)',
    reward: 'Informations tactiques (+2 au jet de stratégie au ch6) + 100 PO de gratitude royale',
    objectives: [
      'Détecter les cris du prisonnier (Perception DC 13)',
      'Infiltrer la grotte gardée par 4 cultistes (Discrétion DC 12 ou combat)',
      'Libérer le messager Aldric et soigner ses blessures (Médecine DC 10)',
      'Escorter Aldric en sécurité jusqu\'au camp'
    ],
    consequenceIfIgnored: 'Aldric est exécuté. Les PJ perdent les infos tactiques (-2 au lieu de +2 au ch6).',
    estimatedMinutes: 30, difficulty: 'moyen'
  },
  {
    id: 'sq_cache_armes',
    title: 'La Cache d\'Armes du Col',
    description: 'Un vieux berger (rencontré en chemin) mentionne une cache d\'armes naines abandonnée lors de la Guerre de l\'Ombre, quelque part dans le col.',
    giver: 'Berger Joslan (croisé sur la route)',
    hookText: '"Mes grands-parents parlaient d\'un arsenal nain, scellé dans la falaise par magie runique. Cherchez les trois marques de marteau."',
    reward: '6 arbalètes lourdes naines + 100 carreaux + 2 potions de soins supérieures',
    objectives: [
      'Trouver les trois marques de marteau sur la falaise (Perception DC 14 chacune)',
      'Résoudre le mécanisme runique (Investigation DC 13 ou Force DC 16 pour forcer)',
      'Récupérer les armes de la cache'
    ],
    consequenceIfIgnored: 'La cache reste perdue. Pas de bonus d\'équipement avant la bataille d\'Ashka.',
    estimatedMinutes: 20, difficulty: 'facile'
  }
];

// ── Random Encounters ────────────────────────────────────────────────
const CH5_RANDOM_ENCOUNTERS: import('./types').RandomEncounter[] = [
  { d20Range: '1-4', description: 'Tempête de neige — visibilité réduite à 10 pieds pendant 1d4 heures. Survie DC 12 ou le groupe se perd.', difficulty: 'facile', loot: ['Aucun'] },
  { d20Range: '5-8', description: 'Meute de loups des neiges (4) — CR 1/4. Affamés et désespérés. Fuite si 2 sont tués.', difficulty: 'facile', creatures: ['Loup', 'Loup', 'Loup', 'Loup'], loot: ['Fourrures de loup (20 PO chacune)'] },
  { d20Range: '9-12', description: 'Éclaireur cultiste solitaire — observe le groupe depuis un rocher. S\'enfuit si repéré (Perception DC 14). Si non détecté, l\'embuscade du ch5_s3 gagne avantage surprise.', difficulty: 'moyen', creatures: ['Éclaireur cultiste'], loot: ['Carte de l\'embuscade (avantage Perception pour la scène 3)'] },
  { d20Range: '13-16', description: 'Chèvres géantes (2) — non hostiles sauf si menacées. Peuvent être apprivoisées (Dressage DC 14) comme montures temporaires (vitesse 40 ft. en montagne).', difficulty: 'facile', loot: ['Monture temporaire si apprivoisées'] },
  { d20Range: '17-20', description: 'Nid de wyverne abandonné — un œuf de wyverne intact. Vend 500 PO à un collectionneur, ou peut éclore en familier si couvé 30 jours.', difficulty: 'facile', loot: ['Œuf de wyverne (500 PO ou familier potentiel)'] }
];

export const CHAPTER_5: NarrativeChapter = {
  id: 'ch5', number: 5, title: 'Le Col des Tempêtes',
  subtitle: 'Embuscade en montagne et route vers Ashka',
  summary: 'Traversée périlleuse du Col des Tempêtes, embuscade du culte, choix stratégique, et approche des ruines d\'Ashka.',
  suggestedLevel: 6, region: 'Col des Tempêtes → Plaines de Cendres',
  themes: ['Survie', 'Embuscade', 'Choix stratégique', 'Désolation'],
  scenes: CH5_SCENES, previousChapter: 'ch4', nextChapter: 'ch6',
  sideQuests: CH5_SIDE_QUESTS,
  randomEncounters: CH5_RANDOM_ENCOUNTERS,
  statBlocks: CH5_STAT_BLOCKS
};
