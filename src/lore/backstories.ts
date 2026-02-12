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

export interface MechanicalTrait {
  name: string;
  type: 'bonus' | 'penalty' | 'neutral';
  desc: string;
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
  mechanical_traits: MechanicalTrait[];
  personal_secrets: string[];
  known_npcs: string[];
  starting_reputation: Record<string, number>;
  roleplay_hooks: string[];
  gm_notes: string[];
  lore: string;
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
    lore: "Le poids de l'armure n'est rien comparé à celui des souvenirs. Vous entendez encore le cri de ceux que vous n'avez pas pu sauver.",
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
    mechanical_traits: [
      { name: "Discipline de Fer", type: "bonus", desc: "Avantage sur les jets de sauvegarde contre la peur." },
      { name: "Blessure de Guerre", type: "penalty", desc: "-1 sur les tests de Dextérité (Acrobaties)." }
    ],
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
    lore: "La terre elle-même se souvient du feu. Et vous aussi. Vos cauchemars ont le goût de la cendre froide.",
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
    mechanical_traits: [
      { name: "Résonance Arcanique", type: "bonus", desc: "Vous détectez naturellement les sources de magie à 10 pas." },
      { name: "Instabilité Mentale", type: "penalty", desc: "Les sorts psychiques infligent 2 dégâts supplémentaires." }
    ],
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
    lore: "Le sang bleu ne tache pas moins que le rouge. Mais il coûte beaucoup plus cher à nettoyer.",
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
    mechanical_traits: [
      { name: "Éducation de Cour", type: "bonus", desc: "Avantage sur les tests de Persuasion contre la noblesse." },
      { name: "Fierté Blessée", type: "penalty", desc: "-2 sur les tests d'Intimidation (vous paraissez trop raffiné)." }
    ],
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
    lore: "Les racines les plus profondes poussent souvent dans les sols les plus amers.",
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
    mechanical_traits: [
      { name: "Ami des Bois", type: "bonus", desc: "Vous trouvez toujours de quoi manger et boire en forêt." },
      { name: "Mal social", type: "penalty", desc: "Désavantage sur les jets de Persuasion en milieu urbain dense." }
    ],
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
    lore: "Une ombre qui bouge est une ombre qui vit. Une ombre immobile est déjà morte.",
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
    mechanical_traits: [
      { name: "Connaissance des egouts", type: "bonus", desc: "Vous connaissez les passages secrets de toutes les grandes cités." },
      { name: "Marqué par la Main", type: "penalty", desc: "Les agents de la Main Noire vous reconnaissent à 30 pas." }
    ],
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
    lore: "La lumière la plus aveuglante est celle que l'on croit infaillible.",
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
    mechanical_traits: [
      { name: "Aura de Compassion", type: "bonus", desc: "+2 sur les jets de Soins." },
      { name: "Doute Hérétique", type: "penalty", desc: "Désavantage sur les jets de Volonté contre les serviteurs de Solarius." }
    ],
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
    lore: "L'acier se souvient du marteau. La chair se souvient du feu.",
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
    mechanical_traits: [
      { name: "Maître de l'Acier", type: "bonus", desc: "Vos armes et armures de départ sont de qualité supérieure (+1 CA ou +1 Atk)." },
      { name: "Claustrophobie", type: "penalty", desc: "Désavantage sur les jets de Perception dans les espaces très confinés." }
    ],
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
    lore: "Le froid ne tue pas. Il ne fait que trier ceux qui méritent de vivre.",
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
    mechanical_traits: [
      { name: "Sang du Nord", type: "bonus", desc: "Résistance innée au froid (dégâts de glace réduits de 10%)." },
      { name: "Rage Impulsive", type: "penalty", desc: "-2 sur les tests d'Initiative quand vous êtes surpris." }
    ],
    personal_secrets: ["Vous avez vu le dragon dans vos rêves", "Une prophétie vous concerne"],
    known_npcs: ["Jarl Ragnar", "Chamane Ylva", "Éclaireur Bjorn"],
    starting_reputation: { "Jarls du Nord": 20, "Peuple de Sol-Aureus": -10, "Marchands": -5 },
    roleplay_hooks: [
      "Le clan vous rappelle pour une menace",
      "La prophétie de l'Éclipse se réalise",
      "Un enemy ancestral réapparaît"
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
    lore: "Les rats mangent les miettes des rois. Je mange les rats. Qui est le roi, alors ?",
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
    mechanical_traits: [
      { name: "Instinct de Survie", type: "bonus", desc: "+2 sur les jets de sauvegarde contre la mort." },
      { name: "Malnutri", type: "penalty", desc: "-5 PV max permanents." }
    ],
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
    lore: "L'or fond. Les soies brûlent. Seule la dette est éternelle.",
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
    mechanical_traits: [
      { name: "Négociateur Agréé", type: "bonus", desc: "+2 sur les tests de Diplomatie commerciale." },
      { name: "Dette de Sang", type: "penalty", desc: "-5 Or au début de chaque session." }
    ],
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
    lore: "Ils appellent cela 'hérésie'. J'appelle cela 'progrès indispensable'.",
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
    mechanical_traits: [
      { name: "Savoir Théorique", type: "bonus", desc: "+2 sur les tests d'Histoire (Magie)." },
      { name: "Banni de l'Académie", type: "penalty", desc: "-3 sur les jets de Persuasion contre les mages officiels." }
    ],
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
    lore: "Les étoiles ne se soucient pas de nos petits problèmes. Mais elles nous regardent quand même.",
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
    mechanical_traits: [
      { name: "Lueur Astrale", type: "bonus", desc: "Vous émettez une faible lumière (5 pas) à volonté." },
      { name: "Sang d'Étoile", type: "penalty", desc: "Les dégâts de feu sont augmentés de 1." }
    ],
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
    lore: "Ce n'est pas ce que vous entendez qui vous tuera. C'est ce que vous n'entendez plus.",
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
    mechanical_traits: [
      { name: "Sens de la Proie", type: "bonus", desc: "Avantage sur les jets de Perception (Pistage)." },
      { name: "Cicatrices de l'Ombre", type: "penalty", desc: "-1 sur les tests de Charisme (sauf Intimidation)." }
    ],
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
    lore: "Le sang lave les péchés, disaient-ils. Mais qui lave le sang ?",
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
    mechanical_traits: [
      { name: "Méthodes d'Interrogatoire", type: "bonus", desc: "Avantage sur les jets d'Intimidation pour obtenir des informations." },
      { name: "Marque de Caïn", type: "penalty", desc: "-10 Or au départ (dîme de rédemption)." }
    ],
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
    lore: "Une chaîne brisée est une arme. Un homme brisé est un danger.",
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
    mechanical_traits: [
      { name: "Insoumis", type: "bonus", desc: "Avantage sur les jets pour se libérer de liens physiques." },
      { name: "Analphabète", type: "penalty", desc: "Ne peut pas lire les textes complexes sans test d'Intelligence." }
    ],
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
    lore: "L'histoire est écrite par les vainqueurs. La vérité est murmurée par les survivants.",
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
    mechanical_traits: [
      { name: "Savoir Ashkan", type: "bonus", desc: "Avantage sur les jets de connaissance concernant l'histoire ancienne." },
      { name: "Cible de la Main", type: "penalty", desc: "Les prix au marché noir sont augmentés de 20% pour vous." }
    ],
    personal_secrets: ["Vous avez découvert la véritable cause de la Chute", "Vous avez un fragment du Trône d'Ashka"],
    known_npcs: ["Prophète Sans Nom", "Kaelith la Tisseuse"],
    starting_reputation: { "Main Noire": -15, "Académies": 5 },
    roleplay_hooks: [
      "Vous trouvez une écriture que vous seul pouvez lire",
      "La Main Noire essaie de vous kidnapper pour votre savoir",
      "Un portail Ashkan commence à vibrer en votre présence"
    ],
    gm_notes: ["Savoir encyclopédique", "Capacité unique de traduction", "Lien direct avec l'intrigue principale"]
  },
  {
    id: "touche_miroir",
    label: "Touché par le Miroir",
    category: "arcane",
    compatible_classes: ["Mage", "Barde", "Voleur"],
    desc: "Vous avez survécu à une exposition directe au Miroir des Ombres. Votre reflet ne vous ressemble plus tout à fait, et vous entendez parfois des voix venant des surfaces réfléchissantes. Cette malédiction est aussi votre plus grande force.",
    lore: "Ne regardez jamais trop longtemps votre propre reflet. Il pourrait cligner des yeux avant vous.",
    stats: { int: 1, cha: 1, wis: -1 },
    origin: {
      id: "miroir_faille",
      region: "Terres Brûlées",
      settlement: "La Faille Vive",
      climate_bonus: ["Zones de distorsion", "Ténèbres"],
      regional_knowledge: ["Géographie du Miroir", "Entités de l'Ombre"]
    },
    social_class: {
      id: "errant_maudit",
      label: "Errant Maudit",
      wealth: "poor",
      starting_gold_modifier: 0.6,
      social_perks: ["Instinct pour le surnaturel", "Reconnaissance des autres touchés"],
      social_penalties: ["Effraye les animaux", "Méfiance instinctive des gens"]
    },
    faction_ties: [
      {
        id: "miroir_ombres",
        name: "Entités du Miroir",
        role: "Vaisseau",
        standing: "ally",
        reputation: 10,
        secrets_known: ["Le Miroir cherche à se stabiliser", "Certains reflets sont des espions"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["eclipse_kuldahar"]],
    mechanical_traits: [
      { name: "Vision Reflétée", type: "bonus", desc: "Vous pouvez voir dans les zones de ténèbres magiques (portée 10 pas)." },
      { name: "Reflet Instable", type: "penalty", desc: "Désavantage sur les jets de Discrétion face aux créatures de l'Ombre." }
    ],
    personal_secrets: ["Votre reflet a sa propre volonté", "Vous pouvez voir à travers les yeux d'un autre reflet"],
    known_npcs: ["Silène la Voilée", "Le Prophète Sans Nom"],
    starting_reputation: { "Entités du Miroir": 10, "Inquisition": -50 },
    roleplay_hooks: [
      "Votre reflet vous parle d'un danger imminent",
      "Une surface réfléchissante devient un portail temporaire",
      "L'Inquisition détecte votre signature éthérée"
    ],
    gm_notes: ["Phénomènes paranormaux fréquents", "Lien avec le Miroir des Ombres", "Peut servir de relais pour le MJ"]
  },
  {
    id: "chirurgien_guerre",
    label: "Chirurgien de Campagne",
    category: "military",
    compatible_classes: ["Clerc", "Guerrier", "Mage"],
    desc: "Vous avez passé des années à recoudre des soldats au milieu de la boue et du sang. Pour vous, un corps est une machine complexe. Vous avez sauvé d'innombrables vies, mais le cri des blessés hante encore vos nuits.",
    lore: "La mort est patiente. Le chirurgien doit être plus rapide.",
    stats: { int: 1, con: 1, cha: -1 },
    origin: {
      id: "frontiere_sud",
      region: "Le Val Doré",
      settlement: "Hôpitaux Militaires",
      climate_bonus: ["Zones urbaines", "Champs de bataille"],
      regional_knowledge: ["Anatomie", "Premier secours", "Logistique militaire"]
    },
    social_class: {
      id: "medecin_militaire",
      label: "Médecin Militaire",
      wealth: "modest",
      starting_gold_modifier: 1.1,
      social_perks: ["Respect des soldats", "Priorité de soins", "Connaissance médicale"],
      social_penalties: ["Cynisme désabusé", "Mains tachées (stigmate)"]
    },
    faction_ties: [
      {
        id: "bouclier_argent",
        name: "Bouclier d'Argent",
        role: "Ancien Praticien",
        standing: "member",
        reputation: 20,
        secrets_known: ["Vrais bilans des pertes sacrifiés", "Usage de drogues expérimentales sur les recrues"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["siege_sol_aureus"]],
    mechanical_traits: [
      { name: "Médecin de Bataille", type: "bonus", desc: "Avantage sur les jets de Médecine sous pression (combat)." },
      { name: "Cauchemars de Campagne", type: "penalty", desc: "-1 sur les tests de Volonté après de longues sessions sans repos." }
    ],
    personal_secrets: ["Vous avez pratiqué une euthanasie interdite sur un noble", "Vous connaissez la faiblesse anatomique d'un général"],
    known_npcs: ["Capitaine Aldric", "Goruk Dent-de-Fer"],
    starting_reputation: { "Bouclier d'Argent": 20, "Peuple": 30 },
    roleplay_hooks: [
      "Un ancien patient vous demande une opération impossible",
      "On vous accuse de faute médicale intentionnelle",
      "Une épidémie mystérieuse frappe une ville"
    ],
    gm_notes: ["Expert en survie et santé", "Peut identifier des causes de mort", "Liens avec les vétérans"]
  },
  {
    id: "diplomate_sol_aureus",
    label: "Diplomate de Sol-Aureus",
    category: "noble",
    compatible_classes: ["Barde", "Paladin", "Mage"],
    desc: "Vous étiez la voix de Sol-Aureus, négociant des traités entre les cités-états et les factions elfiques. Vous savez que les mots sont bien plus tranchants que n'importe quelle lame de mithril.",
    lore: "Une guerre évitée est une victoire invisible. Mais personne ne chante de ballades pour les invisibles.",
    stats: { cha: 2, wis: 1, str: -2 },
    origin: {
      id: "sol_aureus_palais",
      region: "Val Doré",
      settlement: "Quartier des Ambassades",
      climate_bonus: ["Salles de conseil", "Villes"],
      regional_knowledge: ["Droit international", "Héraldique", "Langues de cour"]
    },
    social_class: {
      id: "emissaire",
      label: "Émissaire Royal",
      wealth: "wealthy",
      starting_gold_modifier: 1.8,
      social_perks: ["Immunité diplomatique partielle", "Accès aux hautes sphères", "Négociateur né"],
      social_penalties: ["Cible des assassins", "Détesté par les opprimés"]
    },
    faction_ties: [
      {
        id: "cour_royale",
        name: "Conseil des Ministres",
        role: "Ancien Attaché",
        standing: "ally",
        reputation: 40,
        secrets_known: ["Alliance secrète avec Kuldahar", "Détournement de fonds de la Guilde"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["revelation_reine"]],
    mechanical_traits: [
      { name: "Immunité Diplomatique", type: "bonus", desc: "Vous ne pouvez pas être arrêté pour des délits mineurs sans preuve flagrante." },
      { name: "Cible Politique", type: "penalty", desc: "+10% de chances d'être pris comme cible prioritaire par des assassins." }
    ],
    personal_secrets: ["Vous avez signé un traité sous la contrainte", "Vous parlez couramment la langue des démons"],
    known_npcs: ["Reine Elara", "Chancelier Malaric"],
    starting_reputation: { "Cour Royale": 40, "Guilde des Marchands": 25, "Main Noire": -20 },
    roleplay_hooks: [
      "Vous devez négocier une trêve urgente",
      "Un scandale menace de révéler vos anciens mensonges",
      "Une faction cherche à vous acheter pour influencer un vote"
    ],
    gm_notes: ["Expert social", "A de l'or et des contacts", "Cible de la Main Noire"]
  },
  {
    id: "pilleur_epaves",
    label: "Pilleur d'Épaves de la Côte",
    category: "wilderness",
    compatible_classes: ["Voleur", "Rôdeur", "Guerrier"],
    desc: "Les tempêtes de la Côte des Orages rejettent souvent des treasures et des secrets. Vous avez survécu en récupérant ce que l'Océan des Murmures ne voulait plus. Vous avez appris à lire les vagues et à craindre ce qui rampe sous l'écume.",
    lore: "L'océan rend toujours ce qu'il prend. Mais jamais sous la même forme.",
    stats: { dex: 1, wis: 1, int: 1 },
    origin: {
      id: "cote_orages_plages",
      region: "Côte des Orages",
      settlement: "Épaves de la Baie Perdue",
      climate_bonus: ["Zones côtières", "Brouillard marin"],
      regional_knowledge: ["Navigation côtière", "Créatures marines", "Légendes sombres"]
    },
    social_class: {
      id: "recupeerateur",
      label: "Récupérateur",
      wealth: "modest",
      starting_gold_modifier: 1.0,
      social_perks: ["Trouve des objets insolites", "Résistance à l'humidité", "Agilité"],
      social_penalties: ["Considéré comme un charognard", "Méfiance des marins"]
    },
    faction_ties: [
      {
        id: "pirates_murmures",
        name: "Libres-Marins",
        role: "Recycleur",
        standing: "former",
        reputation: 15,
        secrets_known: ["Position de l'épave de l'Espérance", "Code des signaux lumineux"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["eclipse_kuldahar"]],
    mechanical_traits: [
      { name: "Pied Marin", type: "bonus", desc: "Immunité au mal de mer et avantage sur les tests d'équilibre sur terrain instable." },
      { name: "Odeur de Marée", type: "penalty", desc: "-1 sur les tests de Discrétion face aux créatures à l'odorat fin." }
    ],
    personal_secrets: ["Vous avez trouvé un objet qui ne devrait pas exister", "Vous avez laissé un survivant se noyer"],
    known_npcs: ["Lysandre Murmure-d'Étoile", "Bram Tonnelier"],
    starting_reputation: { "Libres-Marins": 15, "Garde Côtière": -10 },
    roleplay_hooks: [
      "Une épave légendaire est signalée",
      "Un habitant de l'océan vous réclame un objet volé",
      "Une tempête rejette un portail à la dérive"
    ],
    gm_notes: ["Familiarisé avec l'océan", "Inventaire souvent rempli de 'camelote' utile", "Lien avec le Marcheur Blanc"]
  },
  {
    id: "bibliothecaire_profond",
    label: "Bibliothécaire des Profondeurs",
    category: "common",
    compatible_classes: ["Mage", "Clerc", "Barde"],
    desc: "Dans les niveaux les plus calmes de Hammerdeep se trouvent les Grands Archives de Pierre. Vous étiez chargé de cataloguer les généalogies naines et les découvertes minières. Vous connaissez les secrets enterrés sous des tonnes de granit.",
    lore: "La pierre n'oublie jamais. C'est pour cela qu'il faut faire attention à ce qu'on lui confie.",
    stats: { int: 2, wis: 1, str: -1 },
    origin: {
      id: "hammerdeep_archives",
      region: "Monts Cœur-de-Fer",
      settlement: "Hammerdeep (Cité de Pierre)",
      climate_bonus: ["Lieux confinés", "Souterrain"],
      regional_knowledge: ["Généalogie naine", "Histoire des mines", "Langue de pierre"]
    },
    social_class: {
      id: "archiviste",
      label: "Archiviste Nain",
      wealth: "comfortable",
      starting_gold_modifier: 1.2,
      social_perks: ["Accès aux bibliothèques", "Savoir encyclopédique", "Respect des aînés"],
      social_penalties: ["Sensible à la lumière vive", "Physique fragile"]
    },
    faction_ties: [
      {
        id: "guilde_erudits",
        name: "Consilium du Granit",
        role: "Scribre de Pierre",
        standing: "member",
        reputation: 45,
        secrets_known: ["Le Niveau Perdu contient des archives vivantes", "Thundrak avait un deuxième marteau"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["effondrement_niveau_12"]],
    mechanical_traits: [
      { name: "Scribre de Pierre", type: "bonus", desc: "+2 sur les tests de recherche d'informations en bibliothèque." },
      { name: "Yeux Sensibles", type: "penalty", desc: "Désavantage sur les jets de Perception en plein soleil ou lumière éclatante." }
    ],
    personal_secrets: ["Vous avez effacé une branche généalogique entière", "Vous avez trouvé un texte Ashkan prédisant l'effondrement"],
    known_npcs: ["Goruk Dent-de-Fer", "Archiviste Kaelith"],
    starting_reputation: { "Consilium du Granit": 45, "Guilde des Forgerons": 20 },
    roleplay_hooks: [
      "Un fragment de tablette volé doit être retrouvé",
      "Une famille noble naine conteste vos archives",
      "Le Niveau Perdu vous appelle par son nom"
    ],
    gm_notes: ["Source d'informations historiques", "Expert en recherche", "Lien avec les secrets de Hammerdeep"]
  },
  {
    id: "espion_murmures",
    label: "Espion des Murmures",
    category: "criminal",
    compatible_classes: ["Voleur", "Barde", "Mage"],
    desc: "Vous étiez l'un des 'Murmures' de Sol-Aureus, un espion de haut vol spécialisé dans l'interception de secrets politiques. Votre couverture a été grillée lors d'une mission délicate à la Cour Royale, et vous avez dû fuir les bas-fonds que vous connaissiez si bien.",
    lore: "Un secret est une arme à un coup. Une fois révélé, il ne sert plus qu'à se faire tuer.",
    stats: { int: 1, cha: 1, str: -1 },
    origin: {
      id: "sol_aureus_ombre",
      region: "Val Doré",
      settlement: "Sol-Aureus (Quartier des Plaisirs)",
      climate_bonus: ["Urbain", "Brouillard"],
      regional_knowledge: ["Cryptographie", "Réseaux d'information", "Politique locale"]
    },
    social_class: {
      id: "informateur_dechu",
      label: "Informateur Déchu",
      wealth: "modest",
      starting_gold_modifier: 1.1,
      social_perks: ["Sait obtenir des informations", "Lit les intentions"],
      social_penalties: ["Considéré comme un traître", "Visage recherché"]
    },
    faction_ties: [
      {
        id: "cour_royale",
        name: "Cour Royale",
        role: "Ancien infiltré",
        standing: "enemy",
        reputation: -30,
        secrets_known: ["La liste des agents dormants de la Main Noire", "Le secret de polichinelle du Chancelier"]
      },
      {
        id: "main_noire",
        name: "Main Noire",
        role: "Cible de nettoyage",
        standing: "enemy",
        reputation: -25,
        secrets_known: ["Emplacement du Rats-Bazar"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["revelation_reine"], HISTORICAL_EVENTS["guerre_guildes"]],
    mechanical_traits: [
      { name: "Lecture des Lèvres", type: "bonus", desc: "Vous pouvez comprendre une conversation silencieuse à 20 pas." },
      { name: "Paria Politique", type: "penalty", desc: "-4 sur les jets de Persuasion contre les membres de la Cour Royale." }
    ],
    personal_secrets: ["Vous avez gardé une lettre compromettante de la Reine", "Votre propre frère est un Inquisiteur"],
    known_npcs: ["Chancelier Malaric", "Matriarche des Ombres", "Garde corrompu Harlan"],
    starting_reputation: { "Cour Royale": -30, "Main Noire": -25, "Bourse de l'Ombre": 15 },
    roleplay_hooks: [
      "Un ancien contact vous demande une dernière fuite",
      "La Main Noire met votre tête à prix",
      "Votre identité est sur le point d'être révélée par un rival"
    ],
    gm_notes: ["Maître de l'infiltration", "Peut servir de lien pour des intrigues politiques", "Le Chancelier le veut mort"]
  },
  {
    id: "garde_corps_guilde",
    label: "Garde du Corps de la Guilde",
    category: "military",
    compatible_classes: ["Guerrier", "Rôdeur", "Paladin"],
    desc: "Vous avez passé cinq ans à protéger les caravanes les plus précieuses de la Guilde des Marchands à travers les Terres Brûlées. Vous avez survécu à des embuscades de Wyverns et à des pilleurs de tombes, mais un échec récent vous a laissé sans emploi et avec une dette de vie envers un marchand influent.",
    lore: "Mon épée est à louer, mais ma loyauté ne s'achète pas. Elle se mérite.",
    stats: { str: 1, con: 1, wis: -1 },
    origin: {
      id: "caravanes_routes",
      region: "Terres Brûlées",
      settlement: "Routes des Caravanes",
      climate_bonus: ["Désert", "Grandes routes"],
      regional_knowledge: ["Logistique de voyage", "Points d'embuscade", "Marché du mercenariat"]
    },
    social_class: {
      id: "mercenaire_guilde",
      label: "Mercenaire de la Guilde",
      wealth: "comfortable",
      starting_gold_modifier: 1.4,
      social_perks: ["Respect des marchands", "Priorité aux péages"],
      social_penalties: ["Cible des bandits", "Considéré comme un pion des riches"]
    },
    faction_ties: [
      {
        id: "guilde_marchands",
        name: "Guilde des Marchands",
        role: "Protecteur de convoi",
        standing: "member",
        reputation: 30,
        secrets_known: ["L'emplacement d'une cache de marchandises interdites", "Certains marchands paient tribut aux Wyverns"]
      },
      {
        id: "garde_cendres",
        name: "Garde des Cendres",
        role: "Allié externe",
        standing: "ally",
        reputation: 15,
        secrets_known: ["Points faibles des Wyverns"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["chute_ashka_echo"], HISTORICAL_EVENTS["guerre_guildes"]],
    mechanical_traits: [
      { name: "Rempart Humain", type: "bonus", desc: "Vous pouvez prendre un coup à la place d'un allié adjacent (1/combat)." },
      { name: "Dette de Vie", type: "penalty", desc: "Le marchand Cornelius peut vous appeler pour une mission obligatoire à tout moment." }
    ],
    personal_secrets: ["Vous avez laissé brûler une caravane pour sauver un enfant", "Le marchand Cornelius vous en veut personnellement"],
    known_npcs: ["Cornelius (négociant)", "Zara la Rouge", "Bram Tonnelier"],
    starting_reputation: { "Guilde des Marchands": 30, "Pilleurs": -20, "Garde des Cendres": 15 },
    roleplay_hooks: [
      "Le marchand que vous avez sauvé demande un service périlleux",
      "Une caravane n'est pas arrivée, vous êtes le seul capable de la retrouver",
      "Le secret de votre dette de vie refait surface"
    ],
    gm_notes: ["Expert en combat défensif", "Connaît bien les dangers des routes", "Lien avec Cornelius pour des quêtes économiques"]
  },
  {
    id: "ermite_faille",
    label: "Ermite de la Faille Vive",
    category: "wilderness",
    compatible_classes: ["Mage", "Druide", "Clerc"],
    desc: "Vivant en isolation près de la Faille Vive dans les Terres Brûlées, vous avez passé des décennies à observer les vibrations du Miroir des Ombres. Le silence vous a parlé plus que n'importe quel traité d'alchimie. Vous êtes sorti de votre retraite car la Faille a commencé à 'saigner'.",
    lore: "Le silence est le langage de l'univers. Nous ne faisons que du bruit pour ne pas avoir à l'écouter.",
    stats: { wis: 1, int: 1, con: -1 },
    origin: {
      id: "faille_vive_isolé",
      region: "Terres Brûlées",
      settlement: "Cabane de la Faille Vive",
      climate_bonus: ["Zones de distorsion", "Silence absolu"],
      regional_knowledge: ["Botanique ésotérique", "Entités spectrales", "Survie extrême"]
    },
    social_class: {
      id: "ermite",
      label: "Ermite",
      wealth: "poor",
      starting_gold_modifier: 0.5,
      social_perks: ["Impassible face à la peur", "Communie avec la nature"],
      social_penalties: ["Maladresse sociale extrême", "Apparence inquiétante"]
    },
    faction_ties: [
      {
        id: "miroir_ombres",
        name: "Entités du Miroir",
        role: "Observateur",
        standing: "ally",
        reputation: 20,
        secrets_known: ["La Faille se nourrit des regrets", "Le Marcheur Blanc approche"]
      },
      {
        id: "conseil_chenes",
        name: "Conseil des Chênes",
        role: "Ancien Druide",
        standing: "former",
        reputation: 10,
        secrets_known: ["Une corruption ronge le cœur de la forêt"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["eclipse_kuldahar"], HISTORICAL_EVENTS["chute_ashka_echo"]],
    mechanical_traits: [
      { name: "Communion du Silence", type: "bonus", desc: "Vous n'avez pas besoin de dormir (méditation profonde de 2h suffit)." },
      { name: "Déséquilibre Éthéré", type: "penalty", desc: "Les sorts soignant des PV ont 10% de chances d'échouer sur vous." }
    ],
    personal_secrets: ["Vous n'avez pas vieilli depuis 20 ans", "Une voix dans la Faille vous appelle par votre vrai nom"],
    known_npcs: ["Archidruide Sylvanus", "Le Prophète Sans Nom", "Silène la Voilée"],
    starting_reputation: { "Conseil des Chênes": 10, "Entités du Miroir": 20, "Inquisition": -30 },
    roleplay_hooks: [
      "La Faille vous envoie une vision d'un village en flammes",
      "Les druides du Conseil cherchent à vous rapatrier",
      "Le Marcheur Blanc vous a marqué durant votre sommeil"
    ],
    gm_notes: ["Très utile pour donner des avertissements mystiques", "Connaissances arcaniques très spécifiques", "Peut être perçu comme fou par les autres PJ"]
  },
  {
    id: "reliquaire_orphelinat",
    label: "Reliquaire de l'Orphelinat",
    category: "religious",
    compatible_classes: ["Clerc", "Paladin", "Barde"],
    desc: "Fidèle serviteur d'un orphelinat tenu par le Clergé de Solarius, vous avez découvert une relique oubliée dans les fondations du temple. Pour la protéger de l'Inquisition, vous l'avez 'fusionnée' avec votre propre essence. Vous portez désormais le fardeau de la lumière et la responsabilité de ces enfants.",
    lore: "La lumière pèse plus lourd que l'obscurité, car on doit la porter sans jamais la laisser tomber.",
    stats: { wis: 1, con: 1, dex: -1 },
    origin: {
      id: "orphelinat_temple",
      region: "Val Doré",
      settlement: "Orphelinat de Sainte-Claire",
      climate_bonus: ["Temples", "Lieux sacrés"],
      regional_knowledge: ["Théologie de Solarius", "Soins des démunis", "Histoire des reliques"]
    },
    social_class: {
      id: "gardien_foi",
      label: "Gardien de la Foi",
      wealth: "modest",
      starting_gold_modifier: 0.9,
      social_perks: ["Béni par les humbles", "Pureté apparente"],
      social_penalties: ["Cible de l'Inquisition", "Lumière difficile à cacher"]
    },
    faction_ties: [
      {
        id: "clerge_solarius",
        name: "Clergé de Solarius",
        role: "Dévot",
        standing: "member",
        reputation: 35,
        secrets_known: ["L'Inquisition a exécuté des innocents", "Une prophétie parle d'un porteur de lumière"]
      },
      {
        id: "inquisition",
        name: "Inquisition du Soleil",
        role: "Sujet d'enquête",
        standing: "enemy",
        reputation: -20,
        secrets_known: ["L'Inquisition cache un fragment du Maillon d'Or"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["purge_cercle_cendres"], HISTORICAL_EVENTS["siege_sol_aureus"]],
    mechanical_traits: [
      { name: "Phare dans la Nuit", type: "bonus", desc: "Vous pouvez soigner un allié de 1D6 PV une fois par jour par simple contact." },
      { name: "Éclat Révélateur", type: "penalty", desc: "Impossible de se cacher dans l'obscurité totale (vous brillez)." }
    ],
    personal_secrets: ["La relique se nourrit de votre force vitale", "Les enfants de l'orphelinat sont en danger à cause de vous"],
    known_npcs: ["Mère Greta", "Grand Prêtre Aldous", "Inquisiteur Malthus"],
    starting_reputation: { "Clergé de Solarius": 35, "Peuple": 25, "Inquisition": -20 },
    roleplay_hooks: [
      "Un inquisiteur commence à poser des questions à l'orphelinat",
      "La relique en vous commence à briller à l'approche du mal",
      "Un ancien orphelin devenu puissant cherche à vous protéger"
    ],
    gm_notes: ["Porteur d'un objet sacré puissant (potentiel narratif)", "Dévouement moral total", "Lien fort avec l'Inquisition comme antagoniste"]
  },
  {
    id: "cultiste_repenti",
    label: "Cultiste Repenti du Cercle",
    category: "criminal",
    compatible_classes: ["Voleur", "Mage", "Clerc"],
    desc: "Vous faisiez partie du Cercle des Cendres, séduit par leurs promesses de pouvoir sur le Miroir des Ombres. Mais après avoir été témoin d'un rituel de sacrifice particulièrement atroce lors de l'Arrivée de l'Ombre, vous avez trahi vos frères. Vous êtes en fuite, avec leurs secrets et leur marque sur votre peau.",
    lore: "J'ai vu ce qui se cache derrière le miroir. Et croyez-moi, vous ne voulez pas qu'il vous voie.",
    stats: { int: 1, dex: 1, cha: -1 },
    origin: {
      id: "repaire_cercle",
      region: "Terres Brûlées",
      settlement: "Repaire des Cendres (Clandestin)",
      climate_bonus: ["Ténèbres", "Sites rituels"],
      regional_knowledge: ["Occultisme", "Rites du Cercle", "Langage des ombres"]
    },
    social_class: {
      id: "fugitif_occulte",
      label: "Fugitif Occulte",
      wealth: "modest",
      starting_gold_modifier: 0.8,
      social_perks: ["Identifie les rituels", "Sait se cacher dans l'ombre"],
      social_penalties: ["Marqué physiquement par le mal", "Hanté par ses crimes"]
    },
    faction_ties: [
      {
        id: "cercle_cendres",
        name: "Cercle des Cendres",
        role: "Traître",
        standing: "enemy",
        reputation: -60,
        secrets_known: ["L'emplacement des Cinq Scellés", "L'identité de plusieurs infiltrés dans Sol-Aureus"]
      },
      {
        id: "inquisition",
        name: "Inquisition du Soleil",
        role: "Cible prioritaire",
        standing: "enemy",
        reputation: -40,
        secrets_known: ["L'Inquisition a exécuté des innocents"]
      }
    ],
    historical_events: [HISTORICAL_EVENTS["purge_cercle_cendres"], HISTORICAL_EVENTS["eclipse_kuldahar"]],
    mechanical_traits: [
      { name: "Initié du Cercle", type: "bonus", desc: "Avantage sur les jets de Volonté contre les possessions démoniaques." },
      { name: "Cicatrices de l'Ombre", type: "penalty", desc: "Les prêtres de Solarius vous détestent à vue (-10 en réputation initiale)." }
    ],
    personal_secrets: ["Vous avez le nom d'un Grand Maître du Cercle", "La marque sur votre bras vous brûle quand ils sont proches"],
    known_npcs: ["Le Prophète Sans Nom", "Inquisiteur Malthus", "Matriarche des Ombres"],
    starting_reputation: { "Cercle des Cendres": -60, "Inquisition": -40, "Victimes du Cercle": 10 },
    roleplay_hooks: [
      "Vos anciens frères rituels vous ont retrouvé",
      "L'Inquisition vous propose un marché pour votre tête",
      "Un rituel commencé par vous doit être stoppé"
    ],
    gm_notes: ["Héros tragique", "Connaissance approfondie des antagonistes", "Dilemme constant entre fuite et rédemption"]
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
  const factions = backstory.faction_ties.map(f => {
    let factStr = `${f.name} (${f.standing}, rep: ${f.reputation})`;
    if (f.secrets_known && f.secrets_known.length > 0) {
      factStr += ` [Secrets connus: ${f.secrets_known.join(', ')}]`;
    }
    return factStr;
  }).join('\n');
  const npcs = backstory.known_npcs.join(', ');
  const secrets = backstory.personal_secrets.join(' | ');
  const hooks = backstory.roleplay_hooks.join(' | ');
  const perks = backstory.social_class.social_perks.join(', ');
  const penalties = backstory.social_class.social_penalties.join(', ');

  return `
## BACKSTORY DE ${playerName.toUpperCase()}
**Origine**: ${backstory.label} (${backstory.category})
**Région**: ${backstory.origin.region} - ${backstory.origin.settlement}
**Classe Sociale**: ${backstory.social_class.label} (${backstory.social_class.wealth})

### Avantages & Pénalités Sociaux (REACTION PNJ)
- **Avantages**: ${perks || 'Aucun'}
- **Pénalités**: ${penalties || 'Aucune'}

### Événements Historiques Vécus
${events || 'Aucun événement majeur'}

### Traits Mécaniques (IMPACT JEU)
${backstory.mechanical_traits.map(t => `- **${t.name}** (${t.type}): ${t.desc}`).join('\n')}

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
