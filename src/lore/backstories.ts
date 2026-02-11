export interface BackstoryEvent {
  id: string;
  name: string;
  year: string;
  epoch: string;
  desc: string;
  consequences: string[];
}

export interface BackstoryFaction {
  id: string;
  name: string;
  role: string;
  standing: 'member' | 'former' | 'enemy' | 'ally';
  reputation: number;
  secrets_known: string[];
}

export interface BackstorySocialClass {
  id: string;
  label: string;
  wealth: 'poor' | 'modest' | 'comfortable' | 'wealthy' | 'noble';
  starting_gold_modifier: number;
  social_perks: string[];
  social_penalties: string[];
}

export interface BackstoryOrigin {
  id: string;
  region: string;
  settlement: string;
  climate_bonus: string[];
  regional_knowledge: string[];
}

export interface EnrichedBackstory {
  id: string;
  label: string;
  category: 'military' | 'arcane' | 'criminal' | 'noble' | 'common' | 'religious' | 'wilderness';
  compatible_classes: string[];
  desc: string;
  stats: Partial<{ str: number; dex: number; con: number; int: number; wis: number; cha: number }>;
  origin: BackstoryOrigin;
  social_class: BackstorySocialClass;
  faction_ties: BackstoryFaction[];
  historical_events: BackstoryEvent[];
  personal_secrets: string[];
  known_npcs: string[];
  starting_reputation: Record<string, number>;
  roleplay_hooks: string[];
  gm_notes: string[];
}

export const HISTORICAL_EVENTS: Record<string, BackstoryEvent> = {
  "siege_sol_aureus": {
    id: "siege_sol_aureus",
    name: "Le Siège de Sol-Aureus",
    year: "Il y a 15 ans",
    epoch: "Ère de la Reconstruction",
    desc: "Une armée de gobelins menée par un seigneur de guerre orc a assiégé la capitale pendant trois mois. Le Bouclier d'Argent a repoussé l'envahisseur au prix de lourdes pertes.",
    consequences: ["Cicatrices de guerre", "Connaissance des tactiques gobelines", "Respect du Bouclier d'Argent"]
  },
  "purge_cercle_cendres": {
    id: "purge_cercle_cendres",
    name: "La Purge du Cercle",
    year: "Il y a 8 ans",
    epoch: "Ère de la Reconstruction",
    desc: "L'Inquisition du Soleil a mené une chasse aux sorcières contre les suspectés d'appartenir au Cercle des Cendres. Beaucoup d'innocents ont péri.",
    consequences: ["Méfiance envers l'Inquisition", "Connaissance des signes du Cercle", "Traumatisme"]
  },
  "effondrement_niveau_12": {
    id: "effondrement_niveau_12",
    name: "L'Effondrement du Niveau 12",
    year: "Il y a 5 ans",
    epoch: "Ère de la Reconstruction",
    desc: "Une catastrophe minière à Hammerdeep a enseveli des centaines de nains. Les rumeurs parlent d'une entité réveillée dans les profondeurs.",
    consequences: ["Claustrophobie possible", "Connaissance des mines", "Dette envers les survivants"]
  },
  "eclipse_kuldahar": {
    id: "eclipse_kuldahar",
    name: "L'Éclipse de Kuldahar",
    year: "Il y a 3 ans",
    epoch: "Ère de la Reconstruction",
    desc: "Une éclipse anormale a plongé le Nord dans les ténèbres pendant une semaine. Les chamans disent que le dragon de cristal a ouvert un œil.",
    consequences: ["Visions prophétiques", "Marque de l'Ombre", "Connaissance des signes célestes"]
  },
  "massacre_sylve": {
    id: "massacre_sylve",
    name: "Le Massacre de la Lisière",
    year: "Il y a 10 ans",
    epoch: "Ère de la Reconstruction",
    desc: "Des braconniers humains ont massacré un village elfe à la frontière de la Sylve. Les relations entre elfes et humains restent tendues.",
    consequences: ["Haine des braconniers", "Méfiance des elfes", "Connaissance de la Sylve"]
  },
  "chute_ashka_echo": {
    id: "chute_ashka_echo",
    name: "L'Écho de la Chute",
    year: "Il y a 50 ans",
    epoch: "Post-Ère des Cendres",
    desc: "Une expédition dans les Terres Brûlées a découvert des survivants de l'Hégémonie d'Ashka, préservés par magie. Leur intégration a été difficile.",
    consequences: ["Connaissance de l'ancien empire", "Objets anciens", "Méfiance des traditionalistes"]
  },
  "guerre_guildes": {
    id: "guerre_guildes",
    name: "La Guerre des Guildes",
    year: "Il y a 7 ans",
    epoch: "Ère de la Reconstruction",
    desc: "Un conflit sanglant entre la Guilde des Marchands et la Main Noire pour le contrôle du commerce à Sol-Aureus.",
    consequences: ["Contacts dans le milieu", "Dettes", "Ennemis des deux côtés"]
  },
  "revelation_reine": {
    id: "revelation_reine",
    name: "Le Scandale de la Cour",
    year: "Il y a 2 ans",
    epoch: "Ère de la Reconstruction",
    desc: "Des rumeurs ont circulé sur la santé mentale de la Reine Elara. L'Inquisition a fait taire les voix dissidentes.",
    consequences: ["Suspicions sur la couronne", "Surveillance accrue", "Contacts à la cour"]
  }
};

export const ENRICHED_BACKSTORIES: EnrichedBackstory[] = [
  {
    id: "veteran_bouclier",
    label: "Vétéran du Bouclier d'Argent",
    category: "military",
    compatible_classes: ["Guerrier", "Paladin"],
    desc: "Vous avez servi dans l'Ordre du Bouclier d'Argent pendant dix ans. Vous avez vu les horreurs de la guerre et les compromis moraux de vos supérieurs. Votre départ n'était pas volontaire.",
    stats: { str: 2, cha: -1 },
    origin: {
      id: "val_dore",
      region: "Le Val Doré",
      settlement: "Sol-Aureus",
      climate_bonus: ["Tempéré"],
      regional_knowledge: ["Politique du Val", "Structure militaire", "Protocole de cour"]
    },
    social_class: {
      id: "soldat",
      label: "Ancien Soldat",
      wealth: "modest",
      starting_gold_modifier: 1.0,
      social_perks: ["Respect des gardes", "Accès aux casernes"],
      social_penalties: ["Mépris des nobles", "Méfiance des criminels"]
    },
    faction_ties: [
      {
        id: "bouclier_argent",
        name: "Bouclier d'Argent",
        role: "Chevalier-Errant",
        standing: "former",
        reputation: 25,
        secrets_known: ["Existence de l'Inquisition du Soleil", "Corruption de certains Sénéchaux"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["siege_sol_aureus"]],
    personal_secrets: ["Vous avez vu un Sénéchal accepter un pot-de-vin de la Main Noire", "Votre mentor est mort en vous protégeant"],
    known_npcs: ["Commandeur Aldric", "Sénéchal Vorn (ennemi)", "Forgeron Durnan"],
    starting_reputation: { "Bouclier d'Argent": 25, "Main Noire": -10, "Gardes de Sol-Aureus": 15 },
    roleplay_hooks: [
      "Un ancien frère d'armes vous demande de l'aide",
      "Le Sénéchal que vous avez dénoncé vous cherche",
      "Votre ancienne unité est accusée d'un crime"
    ],
    gm_notes: [
      "Le joueur peut être reconnu par d'anciens collègues",
      "La Main Noire sait qu'il détient des informations compromettantes",
      "L'Inquisition du Soleil pourrait le surveiller"
    ]
  },
  {
    id: "survivant_cendres",
    label: "Survivant de l'Ère des Cendres",
    category: "arcane",
    compatible_classes: ["Mage", "Clerc", "Druide"],
    desc: "Vous êtes né des derniers jours de l'Ère des Cendres, ou êtes descendant direct d'un survivant. La marque de cette époque est sur vous - visions, cicatrices magiques, ou simple malédiction héréditaire.",
    stats: { int: 2, con: -1 },
    origin: {
      id: "terres_brulees",
      region: "Les Terres Brûlées",
      settlement: "Ruines d'Ashka (nomade)",
      climate_bonus: ["Désert", "Chaleur extrême"],
      regional_knowledge: ["Histoire de l'Empire Ashka", "Géographie des ruines", "Signes de corruption"]
    },
    social_class: {
      id: "paria",
      label: "Paria",
      wealth: "poor",
      starting_gold_modifier: 0.5,
      social_perks: ["Respect des érudits", "Fascination des curieux"],
      social_penalties: ["Méfiance du peuple", "Suspicion des religieux"]
    },
    faction_ties: [
      {
        id: "cercle_cendres",
        name: "Cercle des Cendres",
        role: "Cible d'intérêt",
        standing: "enemy",
        reputation: -50,
        secrets_known: ["L'Œil d'Ashka existe", "Les Cinq Scellés cherchent des descendants"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["chute_ashka_echo"], HISTORICAL_EVENTS["purge_cercle_cendres"]],
    personal_secrets: ["Vous avez des visions de la chute d'Ashka", "Un fragment de l'Œil d'Ashka est caché dans votre sang"],
    known_npcs: ["Archiviste Maelis", "Chasseur d'héritage Karn"],
    starting_reputation: { "Cercle des Cendres": -50, "Guilde des Arcanes": 20, "Inquisition du Soleil": -30 },
    roleplay_hooks: [
      "Le Cercle des Cendres vous traque pour votre héritage",
      "Un artefact Ashka réagit à votre présence",
      "Vos visions révèlent l'emplacement d'une ruine oubliée"
    ],
    gm_notes: [
      "Les visions peuvent être utilisées pour des indices de quête",
      "Le Cercle des Cendres est un antagoniste naturel",
      "Potentiel de corruption ou de rédemption"
    ]
  },
  {
    id: "noble_dechu",
    label: "Noble Déchu de Sol-Aureus",
    category: "noble",
    compatible_classes: ["Guerrier", "Paladin", "Mage", "Barde"],
    desc: "Votre famille était l'une des plus respectées du Val Doré jusqu'au scandale. Accusés de trahison, vos parents ont été exécutés et vos terres confisquées. Vous savez que vous êtes innocents.",
    stats: { cha: 2, str: -1 },
    origin: {
      id: "val_dore_noble",
      region: "Le Val Doré",
      settlement: "Ancien Domaine Valorien (confisqué)",
      climate_bonus: ["Tempéré"],
      regional_knowledge: ["Étiquette de cour", "Intrigues politiques", "Histoire des familles nobles"]
    },
    social_class: {
      id: "noble_dechu",
      label: "Noble Déchu",
      wealth: "poor",
      starting_gold_modifier: 0.75,
      social_perks: ["Éducation raffinée", "Contacts dans la noblesse", "Connaissance des protocoles"],
      social_penalties: ["Recherché par certains", "Mépris des nouveaux nobles", "Dettes familiales"]
    },
    faction_ties: [
      {
        id: "cour_royale",
        name: "Cour Royale",
        role: "Ancien membre",
        standing: "enemy",
        reputation: -40,
        secrets_known: ["Le Chancelier a orchestré la chute de votre famille", "La Reine n'était pas au courant"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["revelation_reine"]],
    personal_secrets: ["Votre père détenait des preuves contre le Cercle des Cendres", "Un serviteur loyal cache encore vos armoiries"],
    known_npcs: ["Chancelier Malaric (ennemi juré)", "Dame Isadora (ancienne amie)", "Valet Gregor (allié secret)"],
    starting_reputation: { "Cour Royale": -40, "Peuple de Sol-Aureus": 10, "Marchands": 5 },
    roleplay_hooks: [
      "Une preuve de votre innocence existe quelque part",
      "Un ancien rival propose une alliance",
      "Votre domaine familial cache un secret"
    ],
    gm_notes: [
      "Intrigue politique naturelle",
      "Le Chancelier est lié au Cercle des Cendres",
      "Potentiel de restauration du titre"
    ]
  },
  {
    id: "enfant_sylve",
    label: "Enfant de la Sylve d'Émeraude",
    category: "wilderness",
    compatible_classes: ["Druide", "Rôdeur", "Voleur"],
    desc: "Élevé par les druides de la Sylve ou orphelin recueilli par les elfes, vous avez grandi entre deux mondes. La forêt est votre foyer, mais vous êtes appelé vers le monde extérieur.",
    stats: { wis: 2, cha: -1 },
    origin: {
      id: "sylve_emeraude",
      region: "La Sylve d'Émeraude",
      settlement: "Sylmanir (périphérie)",
      climate_bonus: ["Forêt", "Humidité"],
      regional_knowledge: ["Plantes médicinales", "Sentiers cachés", "Langage des druides"]
    },
    social_class: {
      id: "forestier",
      label: "Forestier",
      wealth: "modest",
      starting_gold_modifier: 0.8,
      social_perks: ["Respect des druides", "Passage libre en forêt", "Connaissance des herbes"],
      social_penalties: ["Maladresse en ville", "Méfiance des citadins"]
    },
    faction_ties: [
      {
        id: "conseil_chenes",
        name: "Conseil des Chênes",
        role: "Protégé",
        standing: "ally",
        reputation: 30,
        secrets_known: ["Le Mur de Ronces s'affaiblit", "Une corruption ronge le cœur de la forêt"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["massacre_sylve"]],
    personal_secrets: ["Vous avez vu quelque chose dans la Source d'Émeraude", "Un esprit de la forêt vous a marqué"],
    known_npcs: ["Archidruide Sylvanus", "Éclaireur Thandril", "Dryade Elenwë"],
    starting_reputation: { "Conseil des Chênes": 30, "Elfes Sylvains": 20, "Humains du Val": -10 },
    roleplay_hooks: [
      "La forêt vous appelle pour une mission",
      "Un ancien massacre doit être vengé",
      "Quelque chose corrompt votre lieu sacré"
    ],
    gm_notes: [
      "Connexion naturelle avec la nature",
      "Tension entre monde civilisé et sauvage",
      "Quêtes liées à la protection de la Sylve"
    ]
  },
  {
    id: "doigt_main_noire",
    label: "Ancien Doigt de la Main Noire",
    category: "criminal",
    compatible_classes: ["Voleur", "Barde", "Rôdeur"],
    desc: "Vous étiez un espion et voleur au service du plus grand syndicat criminel d'Aethelgard. Vous avez quitté l'organisation - chose que la Main Noire ne pardonne jamais.",
    stats: { dex: 2, str: -1 },
    origin: {
      id: "bas_fonds",
      region: "Le Val Doré",
      settlement: "Bas-fonds de Sol-Aureus",
      climate_bonus: ["Urbain"],
      regional_knowledge: ["Passages secrets", "Contacts criminels", "Marché noir"]
    },
    social_class: {
      id: "criminel",
      label: "Criminel en fuite",
      wealth: "modest",
      starting_gold_modifier: 1.2,
      social_perks: ["Contacts dans le milieu", "Connaissance des receleurs", "Talent pour disparaître"],
      social_penalties: ["Recherché par la Main Noire", "Méfiance des autorités", "Prime sur votre tête"]
    },
    faction_ties: [
      {
        id: "main_noire",
        name: "Main Noire",
        role: "Doigt (espion)",
        standing: "enemy",
        reputation: -75,
        secrets_known: ["Emplacement du Rats-Bazar", "Identité de trois Lieutenants de Fer", "La Matriarche prépare quelque chose"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["guerre_guildes"]],
    personal_secrets: ["Vous avez volé quelque chose d'important à la Matriarche", "Vous connaissez l'identité d'un traître au Bouclier d'Argent"],
    known_npcs: ["Matriarche des Ombres (ennemie)", "Receleur Pics", "Garde corrompu Harlan"],
    starting_reputation: { "Main Noire": -75, "Bouclier d'Argent": -20, "Marchands": 10 },
    roleplay_hooks: [
      "Un ancien contact demande votre aide",
      "La Main Noire envoie des assassins",
      "L'objet que vous avez volé a une importance cruciale"
    ],
    gm_notes: [
      "Tension constante avec la Main Noire",
      "Peut révéler des secrets compromettants",
      "Possibilité de rédemption ou de plonger plus profond"
    ]
  },
  {
    id: "pretre_solarius",
    label: "Ancien Prêtre de Solarius",
    category: "religious",
    compatible_classes: ["Clerc", "Paladin"],
    desc: "Vous avez servi dans le clergé de Solarius, le dieu du Soleil et de la Justice. Mais vous avez vu les abus de l'Inquisition du Soleil et remis en question votre foi.",
    stats: { wis: 2, dex: -1 },
    origin: {
      id: "temple_solarius",
      region: "Le Val Doré",
      settlement: "Grand Temple de Sol-Aureus",
      climate_bonus: ["Tempéré"],
      regional_knowledge: ["Rites religieux", "Hiérarchie cléricale", "Lieux saints"]
    },
    social_class: {
      id: "clerge",
      label: "Ancien Membre du Clergé",
      wealth: "modest",
      starting_gold_modifier: 0.9,
      social_perks: ["Respect du peuple", "Accès aux temples", "Éducation théologique"],
      social_penalties: ["Surveillé par l'Inquisition", "Attentes morales élevées"]
    },
    faction_ties: [
      {
        id: "clerge_solarius",
        name: "Clergé de Solarius",
        role: "Prêtre défroqué",
        standing: "former",
        reputation: -10,
        secrets_known: ["L'Inquisition a exécuté des innocents", "Certains hauts prêtres doutent eux-mêmes"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["purge_cercle_cendres"]],
    personal_secrets: ["Vous avez refusé d'exécuter un innocent", "Un miracle s'est produit devant vous, mais pas de Solarius"],
    known_npcs: ["Grand Prêtre Aldous", "Inquisiteur Malthus (ennemi)", "Sœur Elara (alliée secrète)"],
    starting_reputation: { "Clergé de Solarius": -10, "Peuple": 25, "Inquisition du Soleil": -40 },
    roleplay_hooks: [
      "Un innocent que vous avez sauvé réapparaît",
      "L'Inquisition vous traque",
      "Une vision divine remet tout en question"
    ],
    gm_notes: [
      "Conflit moral central",
      "Accès à des informations sur la corruption religieuse",
      "Potentiel de réforme ou d'hérésie"
    ]
  },
  {
    id: "forgeron_hammerdeep",
    label: "Forgeron de Hammerdeep",
    category: "common",
    compatible_classes: ["Guerrier", "Paladin", "Clerc"],
    desc: "Vous avez grandi dans les forges éternelles de Hammerdeep, apprenant l'art sacré du métal. L'Effondrement du Niveau 12 a tout changé - vous avez perdu des proches et vu quelque chose dans les ténèbres.",
    stats: { con: 2, wis: -1 },
    origin: {
      id: "hammerdeep",
      region: "Les Monts Cœur-de-Fer",
      settlement: "Hammerdeep, Niveau 5",
      climate_bonus: ["Souterrain", "Chaleur des forges"],
      regional_knowledge: ["Métallurgie", "Architecture naine", "Guildes minières"]
    },
    social_class: {
      id: "artisan",
      label: "Artisan",
      wealth: "comfortable",
      starting_gold_modifier: 1.3,
      social_perks: ["Respect des nains", "Connaissance des métaux", "Accès aux forges"],
      social_penalties: ["Peu à l'aise en surface", "Méfiance des elfes"]
    },
    faction_ties: [
      {
        id: "guilde_forgerons",
        name: "Guilde des Forgerons",
        role: "Compagnon",
        standing: "member",
        reputation: 35,
        secrets_known: ["Une veine d'adamantine a été découverte", "Le niveau 15 cache quelque chose"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["effondrement_niveau_12"]],
    personal_secrets: ["Vous avez vu une créature dans les décombres", "Votre marteau familial est fait d'un métal inconnu"],
    known_npcs: ["Maître Forgeron Thorin", "Mineur Bram", "Veuve Helga"],
    starting_reputation: { "Guilde des Forgerons": 35, "Nains de Hammerdeep": 25, "Marchands de surface": 10 },
    roleplay_hooks: [
      "Quelque chose remue dans les niveaux inférieurs",
      "Un artefact nain perdu dans l'effondrement",
      "Votre ancien maître a disparu"
    ],
    gm_notes: [
      "Connexion avec les mystères souterrains",
      "Accès aux forges et équipements",
      "Quêtes liées aux profondeurs"
    ]
  },
  {
    id: "barbare_nord",
    label: "Barbare de la Côte des Orages",
    category: "military",
    compatible_classes: ["Guerrier", "Druide", "Rôdeur"],
    desc: "Né sous les aurores boréales de Kuldahar, vous avez été élevé dans la tradition des Jarls. Le froid a forgé votre corps, et les sagas ont nourri votre esprit. L'Éclipse vous a marqué.",
    stats: { str: 2, int: -1 },
    origin: {
      id: "kuldahar",
      region: "La Côte des Orages",
      settlement: "Clan du Corbeau Blanc",
      climate_bonus: ["Froid extrême", "Tempêtes"],
      regional_knowledge: ["Survie en toundra", "Traditions des Jarls", "Mythes nordiques"]
    },
    social_class: {
      id: "guerrier_clan",
      label: "Guerrier de Clan",
      wealth: "modest",
      starting_gold_modifier: 0.7,
      social_perks: ["Respect des barbares", "Résistance au froid", "Hospitalité du Nord"],
      social_penalties: ["Considéré comme sauvage au Sud", "Difficulté avec l'étiquette"]
    },
    faction_ties: [
      {
        id: "jarls_nord",
        name: "Conseil des Jarls",
        role: "Guerrier juré",
        standing: "member",
        reputation: 20,
        secrets_known: ["Le dragon de cristal a bougé", "Les chamans préparent un rituel"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["eclipse_kuldahar"]],
    personal_secrets: ["Vous avez vu le dragon dans vos rêves", "Une prophétie vous concerne"],
    known_npcs: ["Jarl Ragnar", "Chamane Ylva", "Éclaireur Bjorn"],
    starting_reputation: { "Jarls du Nord": 20, "Peuple de Sol-Aureus": -10, "Marchands": -5 },
    roleplay_hooks: [
      "Le clan vous rappelle pour une menace",
      "La prophétie de l'Éclipse se réalise",
      "Un ennemi ancestral réapparaît"
    ],
    gm_notes: [
      "Connexion avec les mystères du Nord",
      "Culture étrangère pour créer des contrastes",
      "Prophétie comme fil rouge potentiel"
    ]
  },
  {
    id: "orphelin_guerre",
    label: "Orphelin de Guerre",
    category: "common",
    compatible_classes: ["Voleur", "Guerrier", "Rôdeur", "Barde"],
    desc: "Vous ne savez pas qui étaient vos parents. La guerre, une peste, ou simplement l'abandon - les rues ont été votre école. Vous avez survécu là où d'autres ont péri.",
    stats: { dex: 1, con: 1, cha: -1 },
    origin: {
      id: "rues",
      region: "Variable",
      settlement: "Les rues de Sol-Aureus",
      climate_bonus: ["Urbain"],
      regional_knowledge: ["Survie urbaine", "Mendicité", "Cachettes"]
    },
    social_class: {
      id: "sans_classe",
      label: "Sans Classe",
      wealth: "poor",
      starting_gold_modifier: 0.4,
      social_perks: ["Invisibilité sociale", "Réseau d'orphelins", "Aucune attente"],
      social_penalties: ["Mépris des nobles", "Méfiance des marchands", "Pas d'héritage"]
    },
    faction_ties: [],
    historical_events: [HISTORICAL_EVENTS["siege_sol_aureus"]],
    personal_secrets: ["Vous possédez un médaillon avec un blason inconnu", "Un étranger vous a sauvé la vie et a disparu"],
    known_npcs: ["Mère Greta (orphelinat)", "Chef des gamins Pip", "Mendiant aveugle Orel"],
    starting_reputation: { "Peuple commun": 15, "Nobles": -30, "Gardes": -10 },
    roleplay_hooks: [
      "Le médaillon révèle vos origines",
      "Un autre orphelin devenu puissant vous contacte",
      "Votre sauveur mystérieux réapparaît"
    ],
    gm_notes: [
      "Origines mystérieuses à révéler",
      "Sympathie naturelle du joueur pour les démunis",
      "Potentiel de révélation noble ou importante"
    ]
  },
  {
    id: "marchand_ruine",
    label: "Marchand Ruiné",
    category: "common",
    compatible_classes: ["Voleur", "Barde", "Rôdeur"],
    desc: "Vous aviez une caravane prospère jusqu'à ce que la Guerre des Guildes détruise tout. Trahison, embuscade, ou simplement malchance - vous avez tout perdu sauf votre esprit affûté.",
    stats: { cha: 1, int: 1, str: -1 },
    origin: {
      id: "routes_commerciales",
      region: "Le Val Doré",
      settlement: "Caravanes (nomade)",
      climate_bonus: ["Tempéré", "Routes"],
      regional_knowledge: ["Routes commerciales", "Prix du marché", "Négociation"]
    },
    social_class: {
      id: "marchand_dechu",
      label: "Marchand Déchu",
      wealth: "poor",
      starting_gold_modifier: 0.6,
      social_perks: ["Connaissance du commerce", "Contacts marchands", "Talent pour marchander"],
      social_penalties: ["Dettes", "Ennemis commerciaux", "Réputation ternie"]
    },
    faction_ties: [
      {
        id: "guilde_marchands",
        name: "Guilde des Marchands",
        role: "Ancien membre",
        standing: "former",
        reputation: -15,
        secrets_known: ["La Guilde est infiltrée par la Main Noire", "Certains marchands vendent des artefacts interdits"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["guerre_guildes"]],
    personal_secrets: ["Vous savez qui a orchestré votre ruine", "Vous avez caché un objet de valeur avant la faillite"],
    known_npcs: ["Rival Cornelius", "Ancien partenaire Mira", "Créancier Baldric"],
    starting_reputation: { "Guilde des Marchands": -15, "Main Noire": -20, "Clients fidèles": 20 },
    roleplay_hooks: [
      "Une chance de vengeance sur votre rival",
      "L'objet caché refait surface",
      "Un ancien client a besoin de vos services"
    ],
    gm_notes: [
      "Motivé par la vengeance ou la reconstruction",
      "Connaissance du commerce utile en jeu",
      "Liens avec l'intrigue de la Guerre des Guildes"
    ]
  },
  {
    id: "apprenti_exile",
    label: "Apprenti Arcanique Exilé",
    category: "arcane",
    compatible_classes: ["Mage", "Barde"],
    desc: "Vos recherches sur les harmoniques de l'Aether ont été jugées 'déviantes' par l'Académie de Sol-Aureus. Vous avez été banni avant d'avoir pu terminer votre thèse, emportant vos notes et une soif de prouver que vos théories étaient justes.",
    stats: { int: 2, cha: 1, wis: -1 },
    origin: {
      id: "val_dore_academie",
      region: "Val Doré",
      settlement: "Sol-Aureus (Quartier Arcanique)",
      climate_bonus: ["Bibliothèques", "Zones à forte résonance"],
      regional_knowledge: ["Théorie de la magie", "Hiérarchie de l'Académie"]
    },
    social_class: {
      id: "intellectuel_dechu",
      label: "Intellectuel Déchu",
      wealth: "poor",
      starting_gold_modifier: 0.8,
      social_perks: ["Savoir académique", "Reconnaissance d'autres mages"],
      social_penalties: ["Persona non grata à l'Académie", "Méfiance des autorités"]
    },
    faction_ties: [
      {
        id: "guilde_arcanes",
        name: "Guilde des Arcanes",
        role: "Étudiant expulsé",
        standing: "enemy",
        reputation: -20,
        secrets_known: ["Emplacement d'un laboratoire secret", "Usage d'une faille dans le Voile"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["purge_cercle_cendres"]],
    personal_secrets: ["Vous avez volé un tome interdit avant de partir", "Votre recherche portait sur le Miroir des Ombres"],
    known_npcs: ["Kaelith la Tisseuse", "Maître Malchor"],
    starting_reputation: { "Guilde des Arcanes": -20, "Bibliothécaires": 10 },
    roleplay_hooks: [
      "Un ancien camarade vous contacte en secret",
      "Un agent de l'Académie vous suit pour récupérer vos notes",
      "Vous trouvez un indice confirmant votre théorie bannie"
    ],
    gm_notes: ["Fasciné par la théorie magique", "Peut identifier des objets étranges", "Lien possible avec Malakor"]
  },
  {
    id: "heritier_astral",
    label: "Héritier de la Lignée Astrale",
    category: "noble",
    compatible_classes: ["Mage", "Clerc", "Paladin"],
    desc: "Votre famille prétend descendre directement des Gardiens de la Lumière. Que ce soit vrai ou non, vous possédez une affinité innée avec le cosmos. Vos parents ont tout sacrifié pour cacher votre existence aux yeux de l'Inquisition.",
    stats: { wis: 2, int: 1, str: -1 },
    origin: {
      id: "cote_orages_astral",
      region: "Côte des Orages",
      settlement: "Kuldahar (Hauts quartiers)",
      climate_bonus: ["Clair de lune", "Sommets élevés"],
      regional_knowledge: ["Astronomie", "Légendes des Primordiaux"]
    },
    social_class: {
      id: "aristocrate_caché",
      label: "Aristocrate Caché",
      wealth: "comfortable",
      starting_gold_modifier: 1.5,
      social_perks: ["Éducation de haute volée", "Insigne de famille"],
      social_penalties: ["Traqué par l'Inquisition", "Responsabilités lourdes"]
    },
    faction_ties: [
      {
        id: "inquisition",
        name: "Inquisition du Soleil",
        role: "Cible prioritaire",
        standing: "enemy",
        reputation: -30,
        secrets_known: ["L'Inquisition cache un fragment du Maillon d'Or"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["eclipse_kuldahar"]],
    personal_secrets: ["Vous avez des visions de l'Archipel Astrale", "Votre sang brille d'une lueur bleutée sous la lune"],
    known_npcs: ["Lysandre Murmure-d'Étoile", "Reine Elara"],
    starting_reputation: { "Inquisition": -30, "Gardiens de la Lumière": 15 },
    roleplay_hooks: [
      "Vos visions deviennent de plus en plus précises",
      "Un chasseur de l'Inquisition vous retrouve",
      "Un héritage familial vous attend dans l'Archipel Astrale"
    ],
    gm_notes: ["Nature mystique", "Fort potentiel pour des quêtes épiques", "Lien avec Ignis Rex"]
  },
  {
    id: "sentinelle_frontieres",
    label: "Sentinelle des Frontières Sauvages",
    category: "wilderness",
    compatible_classes: ["Rôdeur", "Guerrier", "Druide"],
    desc: "Vous avez passé la majeure partie de votre vie à la lisière des Terres Brûlées, empêchant les créatures de l'ombre d'attaquer les colonies frontalières. Le silence de la forêt est votre langue natale, et la traque est votre religion.",
    stats: { dex: 2, con: 1, int: -1 },
    origin: {
      id: "terres_brulees_frontiere",
      region: "Terres Brûlées",
      settlement: "Avant-poste de Cendre",
      climate_bonus: ["Forêts denses", "Zones de désolation"],
      regional_knowledge: ["Pistes de monstres", "Plantes de survie"]
    },
    social_class: {
      id: "survivant",
      label: "Survivant des Frontières",
      wealth: "modest",
      starting_gold_modifier: 0.9,
      social_perks: ["Instinct de survie", "Respect des locaux"],
      social_penalties: ["Manque de manières sociales", "Méfiance des citadins"]
    },
    faction_ties: [
      {
        id: "garde_frontiere",
        name: "Garde des Cendres",
        role: "Récluseur",
        standing: "ally",
        reputation: 20,
        secrets_known: ["Points faibles des Wyverns", "Chemins secrets vers le sud"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["chute_ashka_echo"]],
    personal_secrets: ["Vous avez été marqué par une abomination de l'Abysse", "Vous parlez une langue animale oubliée"],
    known_npcs: ["Zara la Rouge", "Bram Tonnelier"],
    starting_reputation: { "Garde des Cendres": 20, "Pilleurs de Tombes": -15 },
    roleplay_hooks: [
      "Une vague de créatures anormales arrive du sud",
      "Un ancien compagnon a disparu en mission",
      "L'ombre dans votre sang commence à s'éveiller"
    ],
    gm_notes: ["Expert en pistage", "Utile pour la navigation en extérieur", "Lien avec le Seigneur de la Cendre"]
  },
  {
    id: "inquisiteur_repenti",
    label: "Inquisiteur Repenti",
    category: "religious",
    compatible_classes: ["Clerc", "Paladin", "Guerrier"],
    desc: "Vous étiez un bras armé de l'Inquisition du Soleil, mais après avoir participé à un massacre d'innocents sous prétexte d'hérésie, votre foi s'est brisée. Vous cherchez maintenant la rédemption, tout en utilisant les compétences et les secrets de votre ancienne vie.",
    stats: { wis: 2, str: 1, dex: -1 },
    origin: {
      id: "val_dore_cathedrale",
      region: "Val Doré",
      settlement: "Sol-Aureus (Grand Temple)",
      climate_bonus: ["Temples", "Lieux de mémoire"],
      regional_knowledge: ["Droit canonique", "Protocoles de torture/interrogatoire"]
    },
    social_class: {
      id: "clergé_militaire",
      label: "Ancien Clergé Militaire",
      wealth: "modest",
      starting_gold_modifier: 1.1,
      social_perks: ["Connaissance des dogmes", "Autorité naturelle"],
      social_penalties: ["Excommunié", "Trahi par ses anciens frères"]
    },
    faction_ties: [
      {
        id: "inquisition",
        name: "Inquisition du Soleil",
        role: "Déserteur",
        standing: "enemy",
        reputation: -40,
        secrets_known: ["Identité des mouchards", "Les vrais objectifs de l'Archinquisiteur"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["purge_cercle_cendres"]],
    personal_secrets: ["Vous avez sauvé l'un des 'hérétiques' que vous deviez tuer", "Vous avez gardé un reliquaire sacré maudit"],
    known_npcs: ["Capitaine Aldric", "Silène la Voilée"],
    starting_reputation: { "Inquisition": -40, "Victimes de la Purge": 15 },
    roleplay_hooks: [
      "La personne que vous avez sauvée vous retrouve",
      "Un inquisiteur fanatique est envoyé pour vous exécuter",
      "Le reliquaire maudit commence à murmurer"
    ],
    gm_notes: ["En quête de rédemption", "Connaît les ficelles de l'Inquisition", "Dilemme moral constant"]
  },
  {
    id: "briseur_chaines",
    label: "Briseur de Chaînes",
    category: "criminal",
    compatible_classes: ["Guerrier", "Voleur"],
    desc: "Ancien esclave des fonderies clandestines sous Hammerdeep, vous avez mené une révolte sanglante pour gagner votre liberté. Vos muscles sont forgés par le travail forcé et votre volonté est plus dure que l'acier que vous frappiez.",
    stats: { con: 2, str: 1, int: -1 },
    origin: {
      id: "monts_coeur_fer_mines",
      region: "Monts Cœur-de-Fer",
      settlement: "Hammerdeep (Niveaux inférieurs)",
      climate_bonus: ["Souterrains", "Zones de chaleur intense"],
      regional_knowledge: ["Géologie des mines", "Réseaux criminels souterrains"]
    },
    social_class: {
      id: "esclave_évadé",
      label: "Esclave Évadé",
      wealth: "poor",
      starting_gold_modifier: 0.5,
      social_perks: ["Solidarité des parias", "Force de travail"],
      social_penalties: ["Recherché par les propriétaires de mines", "Cicatrices visibles"]
    },
    faction_ties: [
      {
        id: "guilde_minière",
        name: "Oligarchie des Guildes",
        role: "Main d'œuvre en fuite",
        standing: "enemy",
        reputation: -25,
        secrets_known: ["Passages secrets entre les niveaux", "L'emplacement du Niveau 16"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["effondrement_level_12"]],
    personal_secrets: ["Vous avez tué votre ancien contremaître", "Vous avez gardé la clé de vos chaînes"],
    known_npcs: ["Goruk Dent-de-Fer", "Helga Poing-de-Pierre"],
    starting_reputation: { "Guilde Minière": -25, "Ouvriers Rebelles": 30 },
    roleplay_hooks: [
      "Un avis de recherche est placardé en ville",
      "Des nouvelles d'autres captifs arrivent",
      "L'entrée du Niveau 16 est découverte"
    ],
    gm_notes: ["Motivé par la liberté", "Solide physiquement", "Se méfie des autorités"]
  },
  {
    id: "savant_ashkan",
    label: "Savant de l'Hégémonie d'Ashka",
    category: "arcane",
    compatible_classes: ["Mage", "Clerc", "Barde"],
    desc: "Vous êtes l'un des rares rescapés (ou descendant direct) des expéditions ayant réveillé les savoirs d'Ashka. Vous portez en vous une version de l'histoire que les livres officiels ont tenté d'occulter, et vous maîtrisez des bribes d'une langue qui peut changer la réalité.",
    stats: { int: 2, wis: 1, con: -1 },
    origin: {
      id: "terres_brulees_archives",
      region: "Terres Brûlées",
      settlement: "Ruines d'Ashka",
      climate_bonus: ["Lieux antiques", "Tempêtes de cendres"],
      regional_knowledge: ["Ashkan Archaïque", "Cartographie pré-Cendres"]
    },
    social_class: {
      id: "chercheur_interdit",
      label: "Chercheur Interdit",
      wealth: "modest",
      starting_gold_modifier: 1.2,
      social_perks: ["Déchiffrement de langues anciennes", "Instinct arcanique"],
      social_penalties: ["Craint par les superstitieux", "Cible de la Main Noire"]
    },
    faction_ties: [
      {
        id: "main_noire",
        name: "La Main Noire",
        role: "Cible de chantage",
        standing: "enemy",
        reputation: -15,
        secrets_known: ["Code de décryptage des stèles", "La Main Noire cherche à recréer l'Hégémonie"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["chute_ashka_echo"]],
    personal_secrets: ["Vous avez découvert la véritable cause de la Chute", "Vous avez un fragment du Trône d'Ashka"],
    known_npcs: ["Prophète Sans Nom", "Kaelith la Tisseuse"],
    starting_reputation: { "Main Noire": -15, "Académies": 5 },
    roleplay_hooks: [
      "Vous trouvez une écriture que vous seul pouvez lire",
      "La Main Noire essaie de vous kidnapper pour votre savoir",
      "Un portail Ashkan commence à vibrer en votre présence"
    ],
    gm_notes: ["Savoir encyclopédique", "Capacité unique de traduction", "Lien direct avec l'intrigue principale"]
  }
];

export function getBackstoriesForClass(className: string): EnrichedBackstory[] {
  return ENRICHED_BACKSTORIES.filter(b =>
    b.compatible_classes.includes(className) || b.compatible_classes.length === 0
  );
}

export function getBackstoryById(id: string): EnrichedBackstory | undefined {
  return ENRICHED_BACKSTORIES.find(b => b.id === id);
}

export function formatBackstoryForGM(backstory: EnrichedBackstory, playerName: string): string {
  const events = backstory.historical_events.map(e => `${e.name} (${e.year})`).join(', ');
  const factions = backstory.faction_ties.map(f => `${f.name} (${f.standing}, rep: ${f.reputation})`).join(', ');
  const npcs = backstory.known_npcs.join(', ');
  const secrets = backstory.personal_secrets.join(' | ');
  const hooks = backstory.roleplay_hooks.join(' | ');

  return `
## BACKSTORY DE ${playerName.toUpperCase()}
**Origine**: ${backstory.label} (${backstory.category})
**Région**: ${backstory.origin.region} - ${backstory.origin.settlement}
**Classe Sociale**: ${backstory.social_class.label} (${backstory.social_class.wealth})

### Événements Historiques Vécus
${events || 'Aucun événement majeur'}

### Affiliations & Factions
${factions || 'Aucune affiliation'}

### PNJ Connus
${npcs || 'Aucun PNJ connu'}

### Secrets Personnels (à révéler progressivement)
${secrets}

### Hooks de Roleplay (utiliser pour créer des quêtes)
${hooks}

### Connaissances Régionales
${backstory.origin.regional_knowledge.join(', ')}

### Notes pour le MJ
${backstory.gm_notes.join('\n')}
`;
}
