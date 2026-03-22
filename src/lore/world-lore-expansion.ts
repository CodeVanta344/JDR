/**
 * AETHELGARD - LORE MONDIAL APPROFONDI
 *
 * Contenu de world-building détaillé :
 * - Chronologie complète (4 ères)
 * - Religion et panthéon divin
 * - Système de magie
 * - Cultures régionales et raciales
 * - Légendes et mythes (récits de la barde Lyanna)
 * - Vérité sur les Sceaux et l'Entité
 * - Savoir secret pour le MJ
 *
 * Tout le contenu est en français, cohérent avec le lore existant.
 */

// ============================================================================
// INTERFACES
// ============================================================================

export interface HistoricalEra {
  id: string;
  name: string;
  subtitle: string;
  yearsRange: string;
  duration: string;
  summary: string;
  keyEvents: HistoricalEvent[];
  endingCataclysm?: string;
  legacyToday: string;
}

export interface HistoricalEvent {
  year: string;
  name: string;
  description: string;
  significance: 'minor' | 'major' | 'world-changing';
  relatedFactions?: string[];
  relatedLocations?: string[];
}

export interface Deity {
  id: string;
  name: string;
  titles: string[];
  domain: string[];
  alignment: string;
  symbol: string;
  description: string;
  worship: string;
  blessings: string[];
  taboos: string[];
  holyDays: string[];
  relations: { deity: string; nature: string }[];
  secretTruth?: string;
}

export interface MagicSchool {
  id: string;
  name: string;
  source: 'arcane' | 'divine' | 'primal' | 'shadow' | 'seal';
  description: string;
  principles: string[];
  practitioners: string[];
  limitations: string[];
  dangers: string[];
  relationToSeals: string;
}

export interface CulturalProfile {
  regionId: string;
  regionName: string;
  dominantRaces: string[];
  language: string;
  values: string[];
  customs: string[];
  cuisine: string;
  architecture: string;
  clothing: string;
  festivals: string[];
  taboos: string[];
  legends: string[];
  politicalStructure: string;
  economy: string;
  militaryTradition: string;
}

export interface Legend {
  id: string;
  title: string;
  narrator: string;
  type: 'myth' | 'legend' | 'fable' | 'prophecy' | 'song' | 'cautionary_tale';
  content: string;
  morale?: string;
  hiddenTruth?: string;
  relatedQuests?: string[];
}

export interface SealTruth {
  sealId: string;
  name: string;
  location: string;
  visiblePurpose: string;
  truePurpose: string;
  creationMethod: string;
  currentState: string;
  guardians: string[];
  weakness: string;
}

export interface SecretLore {
  id: string;
  category: 'seal' | 'entity' | 'history' | 'faction' | 'cosmic';
  revealCondition: string;
  content: string;
  implications: string;
  playerImpact: string;
}

// ============================================================================
// CHRONOLOGIE D'AETHELGARD
// ============================================================================

export const HISTORICAL_ERAS: HistoricalEra[] = [
  {
    id: 'era_primordiale',
    name: 'L\'Ère Primordiale',
    subtitle: 'Le Temps des Titans',
    yearsRange: '??? — An 0 du Calendrier d\'Ashka',
    duration: 'Inconnue (estimée à plusieurs dizaines de millénaires)',
    summary: `L'Ère Primordiale est le temps avant l'histoire écrite, quand les Titans — êtres colossaux nés du chaos originel — façonnaient le monde. Aethelgard n'était qu'une masse informe de matière brute que les Titans ont sculptée en continents, océans et montagnes. Les dieux n'existaient pas encore sous leur forme actuelle ; ils étaient des fragments de conscience émergeant du rêve des Titans. Les races mortelles n'étaient que des ébauches primitives, des proto-êtres sans culture ni langage. Cette ère se termina quand les Titans entrèrent en conflit, leur guerre provoquant le Grand Schisme qui sépara le plan matériel du Miroir des Ombres — un plan parallèle né de l'écho inversé de la création.`,
    keyEvents: [
      {
        year: 'Aube',
        name: 'L\'Éveil des Titans',
        description: `Les Titans émergent du Vide Primordial et commencent à sculpter la matière brute. Chaque Titan impose sa volonté sur un aspect du monde : Terragos forme les continents, Thalassion crée les océans, Pyranox allume le soleil et Ventelios façonne l'atmosphère.`,
        significance: 'world-changing'
      },
      {
        year: 'Époque intermédiaire',
        name: 'La Naissance des Proto-Dieux',
        description: `Des fragments de conscience émergent des rêves des Titans. Ces proto-dieux observent la création et commencent à développer leur propre volonté. Solarius naît du premier rayon de soleil qui traverse les nuages de cendre.`,
        significance: 'major'
      },
      {
        year: 'Époque intermédiaire',
        name: 'La Création des Races',
        description: `Les Titans, s'ennuyant de leur création vide, façonnent les premières créatures conscientes. Les Elfes naissent de la lumière de Solarius filtrée par les feuilles, les Nains de la roche battue par les marteaux des Titans, les Humains de la poussière des chemins entre les mondes.`,
        significance: 'world-changing'
      },
      {
        year: 'Crépuscule',
        name: 'La Guerre des Titans',
        description: `Pyranox, Titan du Feu, tente de consumer les autres Titans pour devenir le seul créateur. La guerre qui s'ensuit déchire la réalité en deux : le Plan Matériel et le Miroir des Ombres — un reflet inversé de la création où tout ce qui est lumière devient ombre.`,
        significance: 'world-changing',
        relatedLocations: ['Miroir des Ombres', 'Faille de la Fracture']
      },
      {
        year: 'Fin',
        name: 'Le Grand Schisme',
        description: `Les Titans, épuisés par leur guerre, se pétrifient et deviennent les montagnes, les fosses océaniques et les volcans du monde. Leur conscience s'éteint mais leur pouvoir imprègne la terre. Les proto-dieux, désormais libres, s'élèvent au rang de dieux véritables et commencent à guider les races mortelles.`,
        significance: 'world-changing'
      }
    ],
    endingCataclysm: 'La Guerre des Titans et le Grand Schisme — la réalité est fracturée en Plan Matériel et Miroir des Ombres.',
    legacyToday: 'Les Monts Cœur-de-Fer sont le corps pétrifié du Titan Terragos. Le Désert de Verre des Terres Brûlées est le champ de bataille final de Pyranox. Les volcans sont ses derniers soupirs.'
  },

  {
    id: 'era_ashka',
    name: 'L\'Ère d\'Ashka',
    subtitle: 'L\'Hégémonie des Érudits',
    yearsRange: 'An 0 — An 3 247 du Calendrier d\'Ashka',
    duration: '3 247 ans',
    summary: `L'Ère d'Ashka est la période la plus documentée et la plus controversée de l'histoire d'Aethelgard. L'Hégémonie d'Ashka — un empire humain dirigé par des archimages — a unifié le continent sous une seule bannière pendant plus de trois millénaires. Leur civilisation atteignit des sommets de savoir magique jamais égalés, découvrant les lois fondamentales de la magie, cartographiant le Miroir des Ombres et créant les Sceaux pour contenir les entités qui y résident. Mais leur arrogance les perdit : en cherchant à exploiter le pouvoir du Miroir, ils provoquèrent la Chute, un cataclysme qui détruisit leur empire et transforma un tiers du continent en désert de cendres.`,
    keyEvents: [
      {
        year: 'An 0',
        name: 'Fondation de l\'Hégémonie',
        description: `L'archimage Ashkan le Premier unifie les cités-états humaines par la persuasion et la démonstration de puissance magique. Il fonde Kael-Ashura, la cité-bibliothèque, et décrète que le savoir est le fondement du pouvoir.`,
        significance: 'world-changing',
        relatedLocations: ['Kael-Ashura', 'Terres Brûlées'],
        relatedFactions: ['Hégémonie d\'Ashka']
      },
      {
        year: 'An 412',
        name: 'La Première Exploration du Miroir',
        description: `L'archimage Selene Voile-Étoilé ouvre le premier portail stable vers le Miroir des Ombres. Elle y découvre un plan parallèle peuplé d'entités d'ombre et revient transformée — ses yeux sont devenus des puits de ténèbres. Ses rapports fascinent et terrifient l'Hégémonie.`,
        significance: 'major',
        relatedLocations: ['Miroir des Ombres']
      },
      {
        year: 'An 890',
        name: 'Le Pacte des Cinq Races',
        description: `L'Hégémonie signe un traité de coexistence avec les Elfes de la Sylve, les Nains des Monts, les Halflings du Val et les Orcs des Steppes. Chaque race conserve son autonomie mais accepte la suprématie magique ashkan en échange de protection et de savoir partagé.`,
        significance: 'major',
        relatedFactions: ['Toutes races']
      },
      {
        year: 'An 1 567',
        name: 'La Découverte de l\'Entité',
        description: `Des explorateurs ashkans atteignent le cœur du Miroir des Ombres et découvrent une intelligence cosmique : l'Entité. Ni bonne ni mauvaise, elle est la conscience du Miroir lui-même — un être fait de tous les reflets inversés de la réalité. L'Entité communique et offre des connaissances incommensurables en échange de "fenêtres" entre les plans.`,
        significance: 'world-changing',
        relatedLocations: ['Cœur du Miroir']
      },
      {
        year: 'An 2 100',
        name: 'La Construction des Sceaux',
        description: `Craignant que l'Entité ne gagne trop d'influence, le Conseil des Archimages décide de créer les Cinq Sceaux Majeurs — des constructions magiques colossales ancrées en cinq points du continent. Les Sceaux isolent le Miroir du Plan Matériel, empêchant les entités d'ombre de traverser librement. L'Entité, trahie, hurle de rage alors que les barrières se ferment.`,
        significance: 'world-changing',
        relatedLocations: ['Cinq Sites des Sceaux'],
        relatedFactions: ['Conseil des Archimages']
      },
      {
        year: 'An 3 200',
        name: 'Les Expériences Interdites',
        description: `Une faction dissidente d'archimages, le Cercle de Cendres originel, croit que les Sceaux sont une erreur. Ils tentent secrètement d'utiliser l'énergie de l'Entité pour accéder à l'immortalité. Leurs expériences provoquent des instabilités dans les Sceaux.`,
        significance: 'major',
        relatedFactions: ['Cercle de Cendres (originel)']
      },
      {
        year: 'An 3 247',
        name: 'La Chute',
        description: `Le Cercle de Cendres originel provoque une résonance catastrophique entre les Sceaux. L'énergie libérée détruit Kael-Ashura et les cités environnantes en un instant, transformant un tiers du continent en désert de verre et de cendres. 80% de la population ashkan meurt. Les survivants fuient vers les régions périphériques. L'Hégémonie s'effondre en un jour.`,
        significance: 'world-changing',
        relatedLocations: ['Terres Brûlées', 'Kael-Ashura'],
        relatedFactions: ['Cercle de Cendres']
      }
    ],
    endingCataclysm: 'La Chute — destruction de l\'Hégémonie d\'Ashka par résonance catastrophique des Sceaux.',
    legacyToday: 'Les Terres Brûlées sont la cicatrice de la Chute. Les ruines ashkan contiennent des savoirs inestimables. Le Cercle de Cendres moderne cherche à terminer le travail de ses prédécesseurs. Les Sceaux, endommagés mais fonctionnels, s\'affaiblissent lentement.'
  },

  {
    id: 'era_chute',
    name: 'La Chute et l\'Âge Sombre',
    subtitle: 'Le Temps des Cendres',
    yearsRange: 'An 3 247 — An 3 547 du Calendrier d\'Ashka (300 ans)',
    duration: '300 ans',
    summary: `Les trois siècles suivant la Chute sont les plus noirs de l'histoire d'Aethelgard. Sans l'ordre ashkan, le chaos règne. Les Sceaux, endommagés, laissent filtrer des ombres. Des créatures du Miroir rôdent la nuit. Les survivants se battent pour les ressources, les connaissances ashkan sont perdues ou détruites par peur, et des seigneurs de guerre s'emparent de territoires. C'est durant cette période que les races se replient sur leurs bastions : les Elfes dans la Sylve, les Nains dans les Monts, les Humains dans des cités fortifiées. La magie est crainte et les mages sont persécutés.`,
    keyEvents: [
      {
        year: 'An 3 248',
        name: 'L\'Exode des Survivants',
        description: `Les survivants de la Chute fuient les Terres Brûlées dans toutes les directions. Des colonnes de réfugiés haletants portent ce qu'ils peuvent sauver — souvent rien. Les royaumes voisins, terrifiés par la catastrophe, ferment leurs frontières.`,
        significance: 'major'
      },
      {
        year: 'An 3 260',
        name: 'La Première Nuit d\'Ombre',
        description: `Une nuit sans lune, des créatures d'ombre émergent des fissures des Sceaux endommagés et attaquent les colonies de survivants. Des centaines meurent. C'est la première manifestation des "Nuits d'Ombre" qui terroriseront le continent pendant des siècles.`,
        significance: 'major'
      },
      {
        year: 'An 3 312',
        name: 'Les Guerres des Seigneurs de Cendres',
        description: `Des seigneurs de guerre humains, s'autoproclamant héritiers de l'Hégémonie, se battent pour le contrôle des ruines ashkan et de leurs trésors. Ces guerres durent 80 ans et réduisent encore la population.`,
        significance: 'major'
      },
      {
        year: 'An 3 400',
        name: 'La Fondation de l\'Ordre de l\'Aube',
        description: `Un groupe de paladins, prêtres et guerriers fonde l'Ordre de l'Aube — ancêtre de l'Aube d'Argent — pour protéger les innocents des Nuits d'Ombre. Leur symbole, un soleil levant sur un champ de cendres, devient un emblème d'espoir.`,
        significance: 'major',
        relatedFactions: ['Aube d\'Argent']
      },
      {
        year: 'An 3 500',
        name: 'Le Concile des Races',
        description: `Les leaders des cinq races se réunissent pour la première fois depuis la Chute. Ils signent le Pacte de Reconstruction, s'engageant à coopérer pour rebâtir la civilisation et à veiller ensemble sur les Sceaux endommagés.`,
        significance: 'world-changing'
      }
    ],
    endingCataclysm: 'Aucun — l\'Âge Sombre se termine progressivement avec le Pacte de Reconstruction.',
    legacyToday: 'La méfiance envers la magie persiste dans les zones rurales. L\'Aube d\'Argent tire sa légitimité de cette période héroïque. Les Nuits d\'Ombre se raréfient mais n\'ont jamais complètement cessé.'
  },

  {
    id: 'era_renaissance',
    name: 'La Renaissance',
    subtitle: 'L\'Âge de la Lumière Nouvelle',
    yearsRange: 'An 3 547 — Présent (An 3 891)',
    duration: '344 ans (en cours)',
    summary: `La Renaissance est l'ère actuelle d'Aethelgard. Après les ténèbres de l'Âge Sombre, les races rebâtissent ensemble. De nouvelles nations émergent, la magie est redécouverte prudemment, et une ère de relative prospérité s'installe. Sol-Aureus devient la capitale de la plus grande nation humaine. Les factions modernes — Aube d'Argent, Guilde des Arcanes, Syndicat de l'Ombre, Gardiens d'Émeraude — prennent forme. Mais les Sceaux continuent de s'affaiblir, le Cercle de Cendres resurgit, et les signes d'une nouvelle crise se multiplient. C'est dans ce contexte que les aventuriers commencent leur histoire.`,
    keyEvents: [
      {
        year: 'An 3 547',
        name: 'Fondation de Sol-Aureus',
        description: `La cité de Sol-Aureus est fondée sur les ruines d'un ancien avant-poste ashkan. Son nom, "Soleil d'Or", symbolise l'espoir d'une nouvelle ère. La Reine Première, Elara l'Ancêtre, établit la dynastie qui règne encore aujourd'hui.`,
        significance: 'world-changing',
        relatedLocations: ['Sol-Aureus']
      },
      {
        year: 'An 3 612',
        name: 'Refondation de la Guilde des Arcanes',
        description: `Les mages sortent de la clandestinité et fondent la Guilde des Arcanes à Sol-Aureus. Contrairement aux archimages ashkans, ils adoptent un code éthique strict et jurent de ne jamais toucher au Miroir des Ombres.`,
        significance: 'major',
        relatedFactions: ['Guilde des Arcanes']
      },
      {
        year: 'An 3 700',
        name: 'La Guerre des Crocs (Conflit Orc)',
        description: `Les clans orcs des Steppes de l'Est, sous la bannière du Grand Khan Vorgath, envahissent les territoires humains. La guerre dure 15 ans et se conclut par un armistice fragile. Les orcs obtiennent des terres au nord en échange de la paix.`,
        significance: 'major'
      },
      {
        year: 'An 3 830',
        name: 'La Résurgence du Cercle de Cendres',
        description: `Des rapports alarmants indiquent que le Cercle de Cendres, qu'on croyait disparu depuis la Chute, s'est reformé. Ses membres modernes croient que la Chute n'était pas un accident mais une interruption du "Grand Œuvre" — et ils veulent le terminer.`,
        significance: 'major',
        relatedFactions: ['Cercle de Cendres']
      },
      {
        year: 'An 3 889',
        name: 'Les Premiers Signes',
        description: `Des fissures dans les Sceaux deviennent visibles. Des créatures d'ombre apparaissent dans les égouts de Sol-Aureus. Le Prophète Ezekiel annonce "l'Âge des Ombres". La Reine Elara XII convoque les aventuriers.`,
        significance: 'world-changing',
        relatedFactions: ['Aube d\'Argent', 'Cercle de Cendres']
      },
      {
        year: 'An 3 891',
        name: 'Début de la Campagne (Présent)',
        description: `Les Sceaux se fissurent. Le Cercle de Cendres agit ouvertement. Des héros se lèvent. L'avenir d'Aethelgard repose sur leurs épaules.`,
        significance: 'world-changing'
      }
    ],
    legacyToday: 'C\'est l\'ère actuelle. Les joueurs vivent les événements qui définiront la prochaine grande période de l\'histoire d\'Aethelgard.'
  }
];

// ============================================================================
// RELIGION ET PANTHÉON
// ============================================================================

export const DEITIES: Deity[] = [
  {
    id: 'deity_solarius',
    name: 'Solarius',
    titles: ['Le Dieu-Soleil', 'Le Père de la Lumière', 'Le Gardien de l\'Aube', 'Celui qui Brûle les Ombres'],
    domain: ['Lumière', 'Justice', 'Vérité', 'Guérison'],
    alignment: 'Loyal Bon',
    symbol: 'Un soleil d\'or à douze rayons entourant un œil ouvert',
    description: `Solarius est le dieu suprême du panthéon d'Aethelgard, né du premier rayon de soleil lors de l'Ère Primordiale. Il incarne la lumière, la vérité et la justice implacable. Son clergé est le plus puissant du continent et ses temples se trouvent dans chaque ville. Il est vénéré par les paladins, les juges, les guérisseurs et tous ceux qui combattent les ténèbres. Sa relation avec le Miroir des Ombres est complexe : il considère le Miroir comme une aberration à contenir, mais certains théologiens croient que Solarius a lui-même un reflet dans le Miroir — un aspect sombre qu'il refuse d'accepter.`,
    worship: `Le culte de Solarius est organisé autour de la Haute Église de la Lumière, basée à Sol-Aureus. Les offices se tiennent à l'aube et au zénith. Les prêtres portent des robes dorées et blanches. Les cérémonies impliquent des chants, des bénédictions par la lumière du soleil concentrée à travers des prismes sacrés, et des sermons sur la vertu. Les pénitents doivent "marcher dans la lumière" — rester sous le soleil pendant des heures en méditant sur leurs fautes.`,
    blessings: [
      'Guérison par imposition des mains au lever du soleil',
      'Protection contre les morts-vivants et les entités d\'ombre',
      'Discernement de la vérité (détection des mensonges)',
      'Flamme sacrée — feu divin qui ne brûle que le mal'
    ],
    taboos: [
      'Ne jamais mentir sous le soleil',
      'Ne jamais refuser d\'aider un innocent en danger',
      'Ne jamais pactiser avec les entités du Miroir',
      'Ne jamais pratiquer la nécromancie'
    ],
    holyDays: [
      'Solstice d\'Été — Le Jour de la Gloire (fête majeure, jour le plus long)',
      'Équinoxe de Printemps — Le Réveil de la Lumière (nouvel an religieux)',
      'Premier Jour de chaque mois — Journée de la Vérité (tribunaux et confessions)'
    ],
    relations: [
      { deity: 'Lunara', nature: 'Épouse et complémentaire — il est le jour, elle est la nuit bienveillante' },
      { deity: 'Noctis', nature: 'Rival — Noctis incarne les ténèbres que Solarius combat' },
      { deity: 'Pyralis', nature: 'Fils — dieu du feu né de la colère de Solarius' },
      { deity: 'Ashkan le Noir', nature: 'Ennemi juré — le dieu sombre de l\'Hégémonie que Solarius a combattu' }
    ],
    secretTruth: 'Solarius possède un reflet dans le Miroir : l\'Éclipse, une entité de lumière dévorante qui consume tout ce qu\'elle touche. Cette vérité est gardée par les plus hauts prêtres.'
  },

  {
    id: 'deity_lunara',
    name: 'Lunara',
    titles: ['La Déesse-Lune', 'La Mère des Rêves', 'Celle qui Guide les Égarés', 'La Tisseuse de Destin'],
    domain: ['Lune', 'Rêves', 'Destin', 'Maternité', 'Navigation'],
    alignment: 'Neutre Bon',
    symbol: 'Un croissant de lune argenté embrassant une étoile',
    description: `Lunara est la déesse de la lune, des rêves et du destin. Elle est la gardienne de la nuit bienveillante — celle qui offre le repos, les visions et la guidance aux voyageurs perdus. Les marins, les voyageurs, les mères et les devins la vénèrent. Elle communique à travers les rêves et les constellations. Contrairement à Solarius qui impose sa lumière, Lunara guide doucement par des murmures et des présages.`,
    worship: `Le culte de Lunara est plus intime que celui de Solarius. Les temples sont des observatoires ouverts au ciel nocturne. Les prêtresses (majoritairement des femmes, mais pas exclusivement) interprètent les rêves et lisent les étoiles. Les offices se tiennent les nuits de pleine lune. Les fidèles méditent sous la lumière lunaire et partagent leurs rêves avec les prêtresses.`,
    blessings: [
      'Visions prophétiques dans les rêves',
      'Navigation infaillible sous le ciel étoilé',
      'Protection des enfants et des mères',
      'Sommeil réparateur et purificateur'
    ],
    taboos: [
      'Ne jamais tuer sous la lumière de la pleine lune',
      'Ne jamais ignorer un présage',
      'Ne jamais refuser refuge à un voyageur la nuit',
      'Ne jamais manipuler les rêves d\'autrui'
    ],
    holyDays: [
      'Nuit de la Pleine Lune — Vigile des Rêves (divination et guidance)',
      'Solstice d\'Hiver — La Nuit la Plus Longue (veillée de protection)',
      'Éclipse Lunaire — Nuit du Voile Mince (nuit où le Miroir est plus proche)'
    ],
    relations: [
      { deity: 'Solarius', nature: 'Époux et complémentaire' },
      { deity: 'Noctis', nature: 'Méfiante — partage le domaine de la nuit mais à des fins opposées' },
      { deity: 'Sylvana', nature: 'Amie — les deux déesses protègent la nature nocturne' }
    ]
  },

  {
    id: 'deity_terragos',
    name: 'Terragos',
    titles: ['Le Père des Pierres', 'Le Forgeron du Monde', 'Le Titan Endormi'],
    domain: ['Terre', 'Forge', 'Endurance', 'Artisanat'],
    alignment: 'Loyal Neutre',
    symbol: 'Un marteau sur une enclume de montagne',
    description: `Terragos est à la fois un dieu et un Titan — le seul Titan dont la conscience survit partiellement. Son corps pétrifié forme les Monts Cœur-de-Fer et les nains le considèrent comme leur créateur. Il est vénéré par les mineurs, les forgerons, les architectes et tous ceux qui travaillent la pierre et le métal. Il ne communique pas par des mots mais par des tremblements de terre, des filons de minerai révélés et la qualité du métal forgé.`,
    worship: `Le culte de Terragos est centré dans les Monts Cœur-de-Fer. Les temples sont taillés dans la roche vive. Les offices consistent en des travaux de forge rituels où les fidèles créent un objet en priant. La qualité de l'objet reflète la faveur de Terragos. Les plus dévots entreprennent le Pèlerinage des Profondeurs — descendre jusqu'au cœur de la montagne pour "écouter le cœur du Titan".`,
    blessings: [
      'Endurance surhumaine (Constitution)',
      'Sens des pierres — savoir ce que contient la roche',
      'Forge bénie — les objets créés sont de qualité supérieure',
      'Protection sismique — avertissement des tremblements de terre'
    ],
    taboos: [
      'Ne jamais gaspiller le métal ni la pierre',
      'Ne jamais construire quelque chose de fragile volontairement',
      'Ne jamais fuir un engagement',
      'Ne jamais profaner une montagne'
    ],
    holyDays: [
      'Jour de la Forge — Premier jour de chaque saison (grande forge communautaire)',
      'Nuit du Tonnerre Souterrain — Quand Terragos "bouge" (séisme rituel)'
    ],
    relations: [
      { deity: 'Solarius', nature: 'Respect mutuel — la lumière et la terre coopèrent' },
      { deity: 'Pyralis', nature: 'Fils spirituel — le feu de la forge vient de Pyralis' }
    ],
    secretTruth: 'Terragos est partiellement éveillé. Les séismes récents dans les Monts sont ses mouvements. Si les Sceaux se brisent complètement, l\'énergie pourrait le réveiller — avec des conséquences cataclysmiques.'
  },

  {
    id: 'deity_sylvana',
    name: 'Sylvana',
    titles: ['La Mère des Forêts', 'La Reine Verte', 'Celle qui Tisse la Vie'],
    domain: ['Nature', 'Vie', 'Saisons', 'Animaux'],
    alignment: 'Neutre',
    symbol: 'Un arbre dont les racines et les branches forment un cercle',
    description: `Sylvana est la déesse de la nature et de la vie. Chaque arbre, chaque ruisseau, chaque créature porte une étincelle de sa conscience. Elle est vénérée par les druides, les rangers, les fermiers et quiconque vit en harmonie avec la nature. L'Arbre-Monde Yggdrasylve de la Sylve d'Émeraude est considéré comme son avatar physique.`,
    worship: `Le culte de Sylvana ne requiert pas de temple — la forêt est son temple. Les druides célèbrent les rituels aux changements de saison dans des clairières sacrées. Les offrandes sont des graines plantées, de l'eau versée sur la terre sèche et des soins aux animaux blessés. Les Gardiens d'Émeraude sont son ordre militant.`,
    blessings: [
      'Communication avec les animaux et les plantes',
      'Guérison par les plantes (herboristerie divine)',
      'Contrôle des saisons à petite échelle',
      'Transformation animale (pour les druides avancés)'
    ],
    taboos: [
      'Ne jamais détruire la nature sans nécessité',
      'Ne jamais utiliser la nécromancie (perversion de la vie)',
      'Ne jamais empoisonner une source d\'eau',
      'Ne jamais capturer un animal pour le plaisir'
    ],
    holyDays: [
      'Équinoxes et Solstices — Les Quatre Tournants (célébrations saisonnières majeures)',
      'Nuit de Verdure — Premier bourgeon du printemps (fête de renouveau)'
    ],
    relations: [
      { deity: 'Lunara', nature: 'Amie proche — elles protègent la nuit ensemble' },
      { deity: 'Terragos', nature: 'Complémentaire — la terre nourrit les racines' },
      { deity: 'Noctis', nature: 'Ennemie — Noctis cherche à corrompre la vie' }
    ],
    secretTruth: 'Sylvana sait que les Sceaux drainent l\'énergie vitale du monde pour contenir le Miroir. Elle souffre en silence car briser les Sceaux serait pire. Mais elle ne supportera pas éternellement.'
  },

  {
    id: 'deity_noctis',
    name: 'Noctis',
    titles: ['Le Seigneur des Ténèbres', 'Le Murmure dans le Noir', 'Le Reflet du Monde'],
    domain: ['Ténèbres', 'Secrets', 'Ambition', 'Mort'],
    alignment: 'Neutre Mauvais',
    symbol: 'Un œil fermé sur un fond de nuit sans étoiles',
    description: `Noctis est le dieu des ténèbres, des secrets et de l'ambition sans scrupules. Contrairement à ce que croient les fidèles de Solarius, Noctis n'est pas purement maléfique — il incarne l'ombre nécessaire que la lumière projette. Ses adorateurs sont les assassins, les nécromanciens, les ambitieux et ceux qui cherchent le pouvoir par tous les moyens. Il est vénéré en secret car son culte est interdit dans la plupart des nations.`,
    worship: `Le culte de Noctis est clandestin. Les temples sont souterrains, éclairés par des bougies noires. Les offices se tiennent à minuit les nuits sans lune. Les rituels impliquent des sacrifices (souvent symboliques, mais parfois réels dans les sectes extrémistes), des serments d'allégeance murmurés dans l'obscurité et des échanges de secrets.`,
    blessings: [
      'Vision dans les ténèbres totales',
      'Dissimulation dans les ombres (invisibilité partielle)',
      'Connaissance de secrets cachés',
      'Prolongation de la vie par la nécromancie'
    ],
    taboos: [
      'Ne jamais révéler un secret confié dans l\'ombre',
      'Ne jamais montrer de faiblesse en public',
      'Ne jamais refuser un pacte avantageux',
      'Ne jamais agir en plein jour si l\'ombre est disponible'
    ],
    holyDays: [
      'Nuit Sans Lune — La Communion (rituels majeurs)',
      'Nuit du Solstice d\'Hiver — Le Triomphe de l\'Ombre (opposition au solstice de Solarius)'
    ],
    relations: [
      { deity: 'Solarius', nature: 'Rival éternel — lumière contre ténèbres' },
      { deity: 'Lunara', nature: 'Concurrent — se disputent le domaine de la nuit' },
      { deity: 'Ashkan le Noir', nature: 'Alliance de convenance — partagent des adorateurs' }
    ],
    secretTruth: 'Noctis est en réalité le reflet de Solarius dans le Miroir des Ombres qui a gagné sa propre conscience. Leur rivalité est une guerre entre un être et son ombre.'
  },

  {
    id: 'deity_ashkan_noir',
    name: 'Ashkan le Noir',
    titles: ['Le Dieu-Fondateur', 'Le Premier Archimage', 'Le Seigneur des Cendres'],
    domain: ['Magie interdite', 'Savoir interdit', 'Cendres', 'Domination'],
    alignment: 'Loyal Mauvais',
    symbol: 'Un grimoire ouvert dont les pages brûlent d\'un feu noir',
    description: `Ashkan le Noir est l'apothéose du fondateur de l'Hégémonie. Après sa mort, son culte l'a élevé au rang de divinité — ou peut-être s'est-il véritablement transcendé grâce aux savoirs qu'il avait accumulés. Il est le dieu du savoir interdit, de la magie sans limites et de la domination par l'intellect. Le Cercle de Cendres le vénère comme le vrai sauveur d'Aethelgard — celui qui comprenait que le pouvoir du Miroir devait être maîtrisé, pas craint.`,
    worship: `Le culte d'Ashkan le Noir est strictement interdit. Ses adorateurs se réunissent dans des ruines ashkan, récitent des formules en vieil ashkan et étudient les textes interdits. Le Cercle de Cendres est son bras armé. Les rituels impliquent la manipulation de fragments de Sceau et des tentatives de communication avec l'Entité.`,
    blessings: [
      'Compréhension intuitive de toute magie',
      'Résistance à la folie causée par le savoir interdit',
      'Capacité à lire le vieil ashkan instinctivement',
      'Manipulation de l\'énergie des Sceaux'
    ],
    taboos: [
      'Ne jamais détruire un livre ou un savoir',
      'Ne jamais se soumettre à l\'ignorance',
      'Ne jamais reculer devant une découverte par peur',
      'Ne jamais abandonner le Grand Œuvre'
    ],
    holyDays: [
      'Anniversaire de la Chute — Le Jour des Cendres (deuil et renouvellement du serment)',
      'Nuit de la Découverte — Anniversaire de la première exploration du Miroir'
    ],
    relations: [
      { deity: 'Solarius', nature: 'Ennemi — Solarius a contribué à la chute de l\'Hégémonie selon le culte' },
      { deity: 'Noctis', nature: 'Allié de circonstance' }
    ],
    secretTruth: 'Ashkan le Noir n\'est pas mort. Son esprit est piégé dans le Miroir des Ombres, fusionné partiellement avec l\'Entité. Le "Grand Œuvre" du Cercle de Cendres est de le libérer — ce qui libérerait aussi l\'Entité.'
  },

  {
    id: 'deity_pyralis',
    name: 'Pyralis',
    titles: ['Le Fils de Flammes', 'Le Purificateur', 'Le Coléreux'],
    domain: ['Feu', 'Guerre', 'Purification', 'Colère'],
    alignment: 'Chaotique Neutre',
    symbol: 'Une épée enveloppée de flammes',
    description: `Pyralis est le dieu du feu, de la guerre et de la purification. Né de la colère de Solarius face aux ténèbres, il est impétueux, violent et passionné. Il est vénéré par les guerriers, les forgerons de guerre et ceux qui croient que le feu purifie tout. Son culte est à la fois révéré et craint — ses prêtres sont des fanatiques capables de raser un village "corrompu" pour le "purifier".`,
    worship: `Les temples de Pyralis sont des forges-temples où brûle un feu éternel. Les fidèles éprouvent leur foi en marchant sur des charbons ardents ou en tenant des barres de métal chauffées. Les guerriers consacrent leurs armes dans les flammes avant la bataille. L'Ordre de la Flamme Purificatrice est sa secte la plus extrémiste.`,
    blessings: [
      'Résistance au feu',
      'Rage sacrée en combat (+Force temporaire)',
      'Flammes purificatrices (détruisent morts-vivants et corruptions)',
      'Immunité à la peur'
    ],
    taboos: [
      'Ne jamais fuir un combat engagé',
      'Ne jamais éteindre un feu sacré',
      'Ne jamais capituler face au mal',
      'Ne jamais utiliser le poison (lâche et impur)'
    ],
    holyDays: [
      'Solstice d\'Été — Le Grand Bûcher (purification par le feu)',
      'Veille de Bataille — Consécration des armes avant tout conflit majeur'
    ],
    relations: [
      { deity: 'Solarius', nature: 'Père — Pyralis est né de sa colère' },
      { deity: 'Terragos', nature: 'Allié de forge — le feu et la terre créent l\'acier' },
      { deity: 'Noctis', nature: 'Ennemi — le feu brûle les ténèbres' }
    ]
  }
];

// ============================================================================
// SYSTÈME DE MAGIE
// ============================================================================

export const MAGIC_SCHOOLS: MagicSchool[] = [
  {
    id: 'magic_arcane',
    name: 'Magie Arcanique',
    source: 'arcane',
    description: `La magie arcanique est l'étude et la manipulation des lois fondamentales de la réalité. Les mages arcaniques apprennent à canaliser l'énergie ambiante — le Flux Arcanique — qui imprègne toute matière depuis la création des Titans. Cette énergie peut être modelée par des formules mathématiques, des gestes précis et des incantations en vieil ashkan (langue qui résonne naturellement avec le Flux). La Guilde des Arcanes enseigne cette discipline.`,
    principles: [
      'Le Flux Arcanique est partout mais inégalement réparti — les lignes telluriques concentrent l\'énergie',
      'La magie arcanique requiert connaissance, concentration et volonté — pas de foi ni de nature innée',
      'Chaque sort est une équation : trop d\'énergie le fait exploser, pas assez et il échoue',
      'La magie arcanique ne crée ni ne détruit — elle transforme et déplace l\'énergie existante'
    ],
    practitioners: ['Mages de la Guilde des Arcanes', 'Sorciers itinérants', 'Érudits ashkans'],
    limitations: [
      'Requiert des années d\'étude — inaccessible aux illettrés',
      'Drainent l\'énergie physique du lanceur (fatigue)',
      'Les zones mortes (Terres Brûlées) ont un Flux faible',
      'Les Sceaux interfèrent avec certains sorts puissants'
    ],
    dangers: [
      'Surcharge arcanique — l\'excès d\'énergie consume le corps du mage',
      'Corruption par le Miroir — utiliser de la magie près des failles attire l\'attention des entités',
      'Addiction au Flux — certains mages deviennent dépendants de la sensation de pouvoir'
    ],
    relationToSeals: 'Les Sceaux sont la plus grande construction arcanique jamais réalisée. Ils drainent une partie du Flux Arcanique pour maintenir la barrière avec le Miroir. Si les Sceaux se brisent, le Flux sera temporairement amplifié (magie plus puissante) avant de s\'effondrer (magie impossible).'
  },
  {
    id: 'magic_divine',
    name: 'Magie Divine',
    source: 'divine',
    description: `La magie divine provient de la foi en une divinité. Les prêtres, paladins et clercs ne manipulent pas le Flux Arcanique — ils servent de conduit à la volonté de leur dieu. La puissance divine traverse le fidèle et se manifeste selon le domaine de la divinité. La magie divine est plus intuitive que la magie arcanique mais dépend entièrement de la relation entre le fidèle et son dieu.`,
    principles: [
      'Le pouvoir vient du dieu, pas du pratiquant — la foi est le conduit',
      'La magie divine ne peut agir contre la volonté du dieu qui l\'accorde',
      'La prière est le catalyseur — les mots sont secondaires, l\'intention est primordiale',
      'Les symboles sacrés focalisent le pouvoir divin comme un prisme focalise la lumière'
    ],
    practitioners: ['Prêtres de Solarius', 'Prêtresses de Lunara', 'Paladins de l\'Aube d\'Argent', 'Clercs de Terragos'],
    limitations: [
      'Dépend de la faveur du dieu — pécher affaiblit le pouvoir',
      'Limitée au domaine de la divinité (un prêtre de Solarius ne peut invoquer les ténèbres)',
      'Les dieux peuvent retirer leur faveur à tout moment',
      'Inefficace contre d\'autres pouvoirs divins de même rang'
    ],
    dangers: [
      'Fanatisme — la certitude divine peut mener à l\'extrémisme',
      'Abandon divin — si le dieu tourne le dos, le prêtre perd tout pouvoir brutalement',
      'Conflit de foi — servir deux dieux simultanément est impossible et déchirant'
    ],
    relationToSeals: 'Les dieux ont un intérêt direct dans les Sceaux. Solarius les soutient. Noctis veut les affaiblir. Sylvana souffre de leur drain. La magie divine peut interagir avec les Sceaux de manière imprévisible.'
  },
  {
    id: 'magic_primal',
    name: 'Magie Primale',
    source: 'primal',
    description: `La magie primale puise dans les forces brutes de la nature — pas le Flux Arcanique ni le pouvoir divin, mais l'énergie vivante qui coule dans chaque arbre, rivière et créature. Les druides et les rangers sont les principaux pratiquants. Cette magie est aussi ancienne que le monde lui-même et les Titans l'utilisaient instinctivement.`,
    principles: [
      'La nature est vivante et consciente à une échelle incompréhensible',
      'La magie primale est un dialogue avec le monde, pas une domination',
      'Les cercles de pierres, les clairières sacrées et les sources amplifient le pouvoir primal',
      'La magie primale suit les cycles naturels — plus forte au printemps, plus faible en hiver'
    ],
    practitioners: ['Druides des Gardiens d\'Émeraude', 'Rangers de la Sylve', 'Chamans des peuples tribaux', 'Certains herboristes'],
    limitations: [
      'Très affaiblie en milieu urbain ou artificiel',
      'Quasi-inexistante dans les Terres Brûlées (terre morte)',
      'Ne peut être utilisée pour détruire la nature sans conséquences',
      'Les effets sont souvent lents et subtils comparés à la magie arcanique'
    ],
    dangers: [
      'Fusion avec la nature — des druides trop immergés perdent leur humanité',
      'Colère de la nature — utiliser la magie primale de manière destructrice provoque des représailles naturelles',
      'Dépendance saisonnière — un druide en hiver est bien plus faible'
    ],
    relationToSeals: 'Les Sceaux drainent l\'énergie primale du monde pour fonctionner. C\'est pourquoi la nature dépérit lentement autour des sites de Sceaux. Les druides sont les premiers à sentir l\'affaiblissement des Sceaux car la pression sur la nature diminue.'
  },
  {
    id: 'magic_shadow',
    name: 'Magie d\'Ombre',
    source: 'shadow',
    description: `La magie d'ombre puise son pouvoir dans le Miroir des Ombres. Strictement interdite par la Guilde des Arcanes et condamnée par l'Église de Solarius, elle manipule les ombres, les reflets et les frontières entre les plans. Les praticiens sont rares et cachés — des nécromanciens, des cultistes et des individus qui ont eu un contact avec le Miroir.`,
    principles: [
      'Le Miroir des Ombres est un reflet inversé de la réalité — sa magie inverse les propriétés',
      'Chaque ombre est une porte potentielle vers le Miroir',
      'La magie d\'ombre est nourrie par la peur, le doute et le désespoir',
      'Plus un pratiquant utilise la magie d\'ombre, plus le Miroir a prise sur son âme'
    ],
    practitioners: ['Nécromanciens', 'Cultistes du Cercle de Cendres', 'Contactés involontaires du Miroir', 'Entités d\'ombre'],
    limitations: [
      'Affaiblie par la lumière du soleil',
      'Inutilisable dans les lieux bénis par Solarius',
      'Corrode l\'esprit et le corps du pratiquant',
      'Les Sceaux bloquent les sorts d\'ombre les plus puissants'
    ],
    dangers: [
      'Corruption progressive — la peau pâlit, les yeux noircissent, les ombres semblent vivantes',
      'Possession par des entités d\'ombre qui utilisent le mage comme porte',
      'Folie — le Miroir murmure constamment dans l\'esprit du pratiquant',
      'Transformation — à un stade avancé, le mage devient une créature du Miroir'
    ],
    relationToSeals: 'La magie d\'ombre est directement liée aux Sceaux — plus les Sceaux s\'affaiblissent, plus la magie d\'ombre est puissante. Le Cercle de Cendres exploite ce lien pour accélérer la détérioration des Sceaux.'
  },
  {
    id: 'magic_seal',
    name: 'Magie des Sceaux',
    source: 'seal',
    description: `La magie des Sceaux est une discipline unique créée par les archimages ashkans. Elle ne manipule ni le Flux Arcanique, ni le pouvoir divin, ni la nature, ni les ombres — elle manipule les frontières mêmes entre les plans d'existence. C'est la magie la plus puissante et la plus dangereuse jamais pratiquée. Seuls les archimages ashkans la maîtrisaient pleinement. Aujourd'hui, des fragments de ce savoir existent dans les ruines ashkan et certains érudits tentent de les reconstituer.`,
    principles: [
      'Les plans d\'existence sont séparés par des membranes de réalité — les Sceaux les renforcent',
      'La magie des Sceaux opère à une échelle cosmique — même un petit sort affecte l\'équilibre planaire',
      'Les cristaux de focalisation ashkans sont nécessaires pour canaliser cette énergie',
      'Cinq ancrages géographiques (les sites des Sceaux) stabilisent la structure'
    ],
    practitioners: ['Archimages ashkans (disparus)', 'Cercle de Cendres (partiellement)', 'Érudits de la Guilde des Arcanes (théoriquement)'],
    limitations: [
      'Requiert des connaissances quasi-perdues',
      'Les cristaux de focalisation sont extrêmement rares',
      'Un seul erreur peut provoquer une résonance catastrophique (comme la Chute)',
      'Attire immédiatement l\'attention de l\'Entité'
    ],
    dangers: [
      'Résonance catastrophique — la Chute est le plus célèbre exemple',
      'L\'Entité résiste activement — elle contre-attaque tout renforcement',
      'Les Sceaux sont interconnectés — toucher l\'un affecte les quatre autres',
      'L\'énergie libérée en cas d\'échec peut vitrifier des kilomètres carrés'
    ],
    relationToSeals: 'Cette magie EST la magie des Sceaux. Tout y est lié.'
  }
];

// ============================================================================
// CULTURES RÉGIONALES
// ============================================================================

export const CULTURAL_PROFILES: CulturalProfile[] = [
  {
    regionId: 'region_val_dore',
    regionName: 'Val Doré',
    dominantRaces: ['Humains', 'Halflings', 'Quelques Demi-Elfes'],
    language: 'Commun avec accent chantant, influence halfling dans les expressions rurales',
    values: ['Hospitalité', 'Travail de la terre', 'Communauté', 'Traditions ancestrales', 'Méfiance envers la magie'],
    customs: [
      'Le pain partagé — offrir du pain frais à un visiteur scelle une obligation de non-agression',
      'La Danse des Récoltes — danse communautaire après chaque moisson réussie',
      'Le Conseil du Chêne — les anciens se réunissent sous le plus vieux chêne du village pour statuer'
    ],
    cuisine: 'Cuisine rustique et copieuse : pains dorés au miel, ragoûts de légumes, fromages de chèvre affinés dans les caves, cidre de pommes du Val, tartes aux fruits des vergers.',
    architecture: 'Maisons à colombages aux toits de chaume, moulins à vent, granges imposantes, haies vives délimitant les propriétés. Les villages s\'organisent autour d\'une place centrale avec un puits et un vieux chêne.',
    clothing: 'Tuniques de lin, tabliers de cuir pour les artisans, chapeaux de paille l\'été. Couleurs terreuses : brun, vert olive, jaune paille. Les jours de fête, les femmes portent des coiffes brodées de motifs floraux.',
    festivals: [
      'La Fête des Moissons — célébration de trois jours après la récolte (musique, danse, concours de cuisine)',
      'Le Marché aux Fiancés — foire annuelle où les jeunes gens se rencontrent (tradition controversée)',
      'La Nuit des Lanternes — veillée pour éloigner les ombres au solstice d\'hiver'
    ],
    taboos: [
      'Ne jamais gaspiller la nourriture',
      'Ne jamais refuser l\'hospitalité à un voyageur',
      'Ne jamais pratiquer la magie ouvertement dans un village (toléré en privé)'
    ],
    legends: ['La Légende du Premier Sillon', 'Le Conte du Halfling Gourmand', 'La Ballade de la Fée du Blé'],
    politicalStructure: 'Confédération de villages avec un Conseil des Doyens. Chaque village a un doyen élu à vie. Le Val Doré est techniquement vassal de Sol-Aureus mais jouit d\'une large autonomie.',
    economy: 'Agriculture et élevage. Exportation de blé, fromage, cidre et laine. Le Val est le grenier d\'Aethelgard — sans ses récoltes, Sol-Aureus mourrait de faim en six mois.',
    militaryTradition: 'Milices villageoises entraînées à l\'arc et à la pique. Pas d\'armée permanente. En cas de menace, les villages s\'unissent sous la bannière du Blé d\'Or.'
  },
  {
    regionId: 'region_monts_coeur_fer',
    regionName: 'Monts Cœur-de-Fer',
    dominantRaces: ['Nains', 'Quelques Gnomes', 'Humains des cols'],
    language: 'Nainique (gutural et rythmé, chaque mot a un poids de minerai). Le Commun est parlé en surface avec un fort accent.',
    values: ['Honneur', 'Artisanat', 'Endurance', 'Loyauté clanique', 'Mémoire des ancêtres'],
    customs: [
      'Le Serment de Pierre — un engagement pris sur la pierre d\'un ancêtre est inviolable',
      'La Première Forge — à 16 ans, chaque nain forge son premier objet, qui définit son destin',
      'Le Banquet de la Montagne — festin après chaque victoire militaire ou découverte minière majeure'
    ],
    cuisine: 'Cuisine robuste et riche : viandes séchées en altitude, champignons des profondeurs, pain de roche (farine mêlée de minéraux comestibles), bière de malt noir brassée dans les cavernes, fromage de montagne vieilli 100 ans.',
    architecture: 'Cités taillées dans la roche vive, voûtes massives, piliers sculptés de runes ancestrales, forges intégrées dans les quartiers résidentiels. En surface : forteresses de granit aux murs épais.',
    clothing: 'Armures de cuir renforcées de métal au quotidien, tabliers de forge en peau de salamandre, bottes ferrées. Les couleurs sont les métaux : gris acier, cuivre, or sombre. Les ceintures arborent le blason du clan.',
    festivals: [
      'Le Jour de la Forge — grande compétition artisanale (le meilleur objet forgé gagne le titre de Maître)',
      'La Descente Ancestrale — pèlerinage annuel vers les profondeurs pour honorer les ancêtres',
      'La Nuit du Tonnerre — célébration quand Terragos "parle" (lors des séismes)'
    ],
    taboos: [
      'Ne jamais briser un serment',
      'Ne jamais abandonner un camarade dans les profondeurs',
      'Ne jamais gaspiller le métal précieux',
      'Ne jamais se raser la barbe (signe de déshonneur ultime chez les nains mâles)'
    ],
    legends: ['Le Chant du Roi Durin', 'La Forge Perdue', 'L\'Éveil de Terragos'],
    politicalStructure: 'Monarchie clanique avec un Haut-Roi élu parmi les chefs de clan. Le Conseil des Clans (7 clans majeurs) vote les décisions importantes. Le trône est au cœur de la montagne.',
    economy: 'Extraction minière (fer, mithril, gemmes), artisanat d\'armes et d\'armures de qualité supérieure. Les armes naines sont les plus prisées du continent. Commerce de bière de haute qualité.',
    militaryTradition: 'L\'Armée de la Montagne est la force la plus disciplinée d\'Aethelgard. Phalanges de boucliers, sapeurs, et les légendaires Briseurs de Roc — guerriers d\'élite en armure lourde de mithril.'
  },
  {
    regionId: 'region_sylve_emeraude',
    regionName: 'Sylve d\'Émeraude',
    dominantRaces: ['Elfes', 'Demi-Elfes', 'Fées et créatures sylvestres'],
    language: 'Elfique (mélodieux et nuancé, chaque mot a 7 niveaux de signification). Le Commun est parlé avec une musicalité distinctive.',
    values: ['Harmonie avec la nature', 'Savoir millénaire', 'Patience', 'Beauté', 'Cycle de la vie'],
    customs: [
      'La Greffe — planter un arbre pour chaque naissance et chaque mort, reliant les cycles',
      'Le Silence de l\'Aube — méditation communale silencieuse chaque matin pendant une heure',
      'La Danse des Feuilles — rituel de communication avec les esprits de la forêt aux changements de saison'
    ],
    cuisine: 'Cuisine légère et raffinée : fruits sauvages, miel d\'abeilles sylvestres, pain de fleur de lys, vin de sève d\'érable enchanté, tisanes aux herbes qui changent de goût selon l\'humeur du buveur.',
    architecture: 'Constructions vivantes : maisons cultivées dans les arbres géants, ponts de branches tressées, salles formées par des racines entrelacées. Aucune pierre n\'est taillée, aucun arbre n\'est abattu.',
    clothing: 'Robes fluides de soie végétale dans les tons verts, argentés et bleus. Capes de feuilles vivantes qui changent de couleur avec les saisons. Les bijoux sont des branches torsadées et des pierres non taillées.',
    festivals: [
      'Le Festival des Étoiles — nuit de divination et de musique elfique sous les étoiles',
      'Le Réveil du Printemps — célébration du renouveau avec danses, chants et plantations',
      'La Communion de l\'Arbre-Monde — rituel annuel où les elfes se connectent à Yggdrasylve collectivement'
    ],
    taboos: [
      'Ne jamais couper un arbre vivant sans nécessité absolue',
      'Ne jamais utiliser le fer dans la forêt (le fer blesse les fées)',
      'Ne jamais chasser plus que ce que l\'on peut manger',
      'Ne jamais révéler les sentiers secrets de la Sylve aux étrangers sans permission du Conseil'
    ],
    legends: ['L\'Arbre-Monde et la Première Elfe', 'La Chasse Sauvage d\'Oberon', 'Le Pacte des Fées'],
    politicalStructure: 'Théocratie druidique. Le Conseil des Anciens (elfes de plus de 500 ans) gouverne, guidé par l\'Oracle des Étoiles. Les décisions sont prises par consensus, parfois sur des décennies.',
    economy: 'Autosuffisante. La Sylve produit tout ce dont ses habitants ont besoin. Les échanges avec l\'extérieur sont limités : bois enchanté, herbes médicinales rares, et savoir druidique contre des métaux et des gemmes.',
    militaryTradition: 'Les Gardiens d\'Émeraude sont la force de défense. Archers d\'élite, éclaireurs invisibles dans la forêt, druides de guerre contrôlant les plantes. La forêt elle-même est leur plus grande arme — les envahisseurs se perdent et ne reviennent jamais.'
  },
  {
    regionId: 'region_cote_orages',
    regionName: 'Côte des Orages',
    dominantRaces: ['Humains', 'Demi-Orcs', 'Quelques Tritons'],
    language: 'Commun marin — dialecte truffé de termes nautiques, parlé vite et fort pour couvrir le vent.',
    values: ['Liberté', 'Courage face aux éléments', 'Solidarité des gens de mer', 'Commerce', 'Indépendance'],
    customs: [
      'Le Baptême de Tempête — les marins sont baptisés lors de leur première tempête survivante',
      'Le Toast au Disparu — verser un verre à la mer pour chaque marin perdu',
      'La Foire des Vagues — grand marché commercial aux changements de saison des vents'
    ],
    cuisine: 'Cuisine maritime : poissons grillés au sel de mer, ragoûts de crustacés épicés, algues confites au vinaigre, rhum aux épices des îles, pain de navigateur (dur comme la roche, se conserve des mois).',
    architecture: 'Bâtiments bas et robustes résistant aux tempêtes, toits de tuiles lestés de pierres, phares de pierre massive, docks et entrepôts sur pilotis. Port-Tonnerre est construite en amphithéâtre face à la mer.',
    clothing: 'Manteaux cirés, bottes hautes imperméables, chemises de lin et pantalons de toile. Couleurs de la mer : bleu marine, gris tempête, vert d\'eau. Les capitaines portent des tricornes et des insignes de métal.',
    festivals: [
      'La Course des Tempêtes — régate annuelle où les navires les plus rapides s\'affrontent dans des eaux dangereuses',
      'Le Festival du Hareng — célébration de la saison de pêche avec nourriture, musique et compétitions',
      'La Nuit du Phare — veillée sur les falaises pour guider les navires perdus'
    ],
    taboos: [
      'Ne jamais siffler sur un navire (appelle la tempête)',
      'Ne jamais naviguer sans offrir une pièce à la mer',
      'Ne jamais abandonner un navire en premier si on est capitaine',
      'Ne jamais trahir un camarade de bord'
    ],
    legends: ['Le Capitaine Verax et le Requiem de Tempête', 'Le Léviathan Thalassarque', 'La Sirène de Port-Tonnerre'],
    politicalStructure: 'République marchande. Un Conseil des Capitaines élit un Amiral-Gouverneur tous les 5 ans. Le pouvoir économique prime sur le pouvoir militaire.',
    economy: 'Commerce maritime, pêche, construction navale, et un peu de piraterie tolérée. Port-Tonnerre est le hub commercial le plus actif du continent. Les Guildes de Marchands contrôlent l\'essentiel.',
    militaryTradition: 'La Flotte de la Tempête est la marine la plus puissante d\'Aethelgard. Les marins sont des combattants aguerris par les tempêtes et les pirates. Les Corsaires de la Couronne sont des pirates semi-légaux.'
  },
  {
    regionId: 'region_terres_brulees',
    regionName: 'Terres Brûlées',
    dominantRaces: ['Humains nomades (descendants ashkans)', 'Genasi de Feu', 'Rares Tieflings'],
    language: 'Vieil Ashkan (langue liturgique) mêlé au Commun. Les nomades parlent un dialecte sec et précis, chaque mot compté comme l\'eau.',
    values: ['Survie', 'Mémoire du passé', 'Hospitalité du désert', 'Savoir caché', 'Respect des morts'],
    customs: [
      'Le Partage de l\'Eau — offrir de l\'eau à un étranger est l\'acte d\'hospitalité suprême',
      'Le Chant des Cendres — les anciens récitent l\'histoire de la Chute chaque nuit de lune noire',
      'La Marche du Souvenir — pèlerinage annuel vers les ruines de Kael-Ashura'
    ],
    cuisine: 'Cuisine de survie devenue art : lézards du désert grillés, racines de cactus confites, pain de sable (farine et sel de roche), thé amer aux herbes du désert, dattes séchées trempées dans le miel de scorpion.',
    architecture: 'Tentes de cuir de lézard pour les nomades, oasis fortifiées avec murs de grès, ruines ashkan réutilisées. Les constructions souterraines (qanat) sont cruciales pour survivre aux tempêtes de sable et à la chaleur.',
    clothing: 'Robes amples et claires pour le jour, manteaux épais pour les nuits glaciales. Turbans protégeant du sable. Les descendants ashkans portent souvent un fragment de poterie ashkan en pendentif.',
    festivals: [
      'Le Jour des Cendres — commémoration de la Chute (deuil et renouvellement)',
      'La Nuit des Étoiles du Désert — observation astronomique et divination (les étoiles sont plus claires ici)',
      'La Fête de l\'Oasis — célébration quand une nouvelle source d\'eau est découverte'
    ],
    taboos: [
      'Ne jamais gaspiller l\'eau',
      'Ne jamais profaner une ruine ashkan sans raison',
      'Ne jamais refuser de partager sa nourriture avec un voyageur assoiffé',
      'Ne jamais oublier les leçons de la Chute'
    ],
    legends: ['La Chute de Kael-Ashura', 'L\'Oasis Perdue d\'Al-Shadira', 'Le Dernier Archimage'],
    politicalStructure: 'Confédération tribale. Les tribus nomades sont dirigées par des Cheikhs élus par les anciens. Aucune autorité centrale — les tribus coopèrent ou rivalisent selon les circonstances.',
    economy: 'Échange de reliques ashkan, herbes du désert, sel de roche, et services de guide. Les tribus qui contrôlent les oasis sont les plus riches. Le commerce de savoir ashkan est le plus lucratif — et le plus dangereux.',
    militaryTradition: 'Guerriers du désert experts en harcèlement et embuscade. Cavaliers de drakes des sables (lézards géants). Pas d\'armée organisée mais des guerriers redoutables individuellement. Les Sentinelles des Ruines protègent les sites ashkans majeurs.'
  }
];

// ============================================================================
// LÉGENDES ET MYTHES (Récits de la Barde Lyanna)
// ============================================================================

export const LEGENDS: Legend[] = [
  {
    id: 'legend_creation',
    title: 'Le Premier Matin du Monde',
    narrator: 'Lyanna Chant-d\'Étoile',
    type: 'myth',
    content: `"Avant que le soleil ne brûle, avant que la lune ne rêve, il n'y avait que le Vide et le Murmure. Le Vide était le rien, et le Murmure était le presque-quelque-chose. Et du Murmure naquirent les Titans — des êtres si grands que leurs pas creusaient les océans et leurs souffles formaient les nuages. Terragos pétrit la terre entre ses doigts. Thalassion pleura et ses larmes devinrent les mers. Pyranox, le plus orgueilleux, voulut tout consumer — et de sa rage naquit le Grand Schisme, la blessure du monde. Quand les Titans se turent enfin, épuisés, leurs corps devinrent les montagnes et les abysses. Et dans l'ombre de chaque montagne, dans le reflet de chaque lac, quelque chose les observait. Le Miroir. Le reflet du monde qui n'aurait jamais dû exister."`,
    morale: 'Toute création engendre son reflet. Le Miroir est aussi vieux que le monde.',
    hiddenTruth: 'Le Murmure dont parle la légende est l\'Entité elle-même — elle existait avant les Titans.'
  },
  {
    id: 'legend_ashkan_rise',
    title: 'L\'Archimage et la Porte de Cristal',
    narrator: 'Lyanna Chant-d\'Étoile',
    type: 'legend',
    content: `"Il était un homme nommé Ashkan, plus curieux que sage, plus brillant que prudent. Il regardait le monde et voyait des équations là où d'autres voyaient des mystères. Un jour, il découvrit que chaque ombre cache une porte. Il forgea une clé de cristal pur et ouvrit la première porte. Derrière, il trouva le Miroir — un monde identique au nôtre mais tordu, inversé. La lumière y était ténèbres, la joie y était peine. Et au centre de ce monde-reflet, quelque chose l'attendait. Quelque chose qui avait toujours attendu. Ashkan parla avec l'Ombre. L'Ombre lui offrit le savoir de mille vies en échange d'une seule promesse : ne jamais fermer la porte."`,
    morale: 'Le savoir a un prix. Et certaines portes, une fois ouvertes, ne se referment jamais vraiment.',
    hiddenTruth: 'Ashkan n\'a pas simplement parlé avec l\'Entité — il a fusionné partiellement avec elle. C\'est ainsi qu\'il a fondé l\'Hégémonie.',
    relatedQuests: ['quest_exp_terres_cite_cendres']
  },
  {
    id: 'legend_five_seals',
    title: 'Le Chant des Cinq Sceaux',
    narrator: 'Lyanna Chant-d\'Étoile',
    type: 'song',
    content: `"Cinq piliers de lumière, cinq chaînes de cristal, cinq cris dans la nuit éternelle. Les archimages ont pleuré en forgeant les Sceaux, car ils savaient le prix de leur œuvre. Le Premier Sceau naquit dans les Monts, forgé dans le cœur du volcan, ancré dans la pierre de Terragos lui-même. Le Deuxième Sceau fut tissé dans la Sylve, entrelacé aux racines de l'Arbre-Monde. Le Troisième fut englouti dans l'océan, confié au Léviathan endormi. Le Quatrième brûla dans le désert, là où la Chute serait un jour la plus terrible. Le Cinquième... le Cinquième fut caché dans le lieu le plus improbable de tous. Dans un cœur humain. Et quand les Sceaux se fermèrent, l'Entité hurla. Elle hurle encore."`,
    morale: 'Même les actes héroïques causent de la souffrance. Sceller le mal ne le détruit pas.',
    hiddenTruth: 'Le Cinquième Sceau est réellement ancré dans une lignée humaine. Les descendants de ce porteur sont essentiels pour maintenir les Sceaux — et le Cercle de Cendres les traque.',
    relatedQuests: ['quest_exp_mystery_meurtres_lune', 'quest_exp_personal_orphelin']
  },
  {
    id: 'legend_fall',
    title: 'La Nuit où le Ciel a Brûlé',
    narrator: 'Lyanna Chant-d\'Étoile',
    type: 'cautionary_tale',
    content: `"Les anciens racontent — ceux qui ont survécu, si peu — que la Chute a commencé par un silence. Un silence si profond que même le vent s'est tu. Puis la terre a tremblé. Pas comme un séisme ordinaire — comme si le monde entier avait hoqueté. Et le ciel s'est ouvert. Pas comme lors d'un orage. Comme si quelqu'un avait déchiré la toile du réel. De la lumière noire — oui, de la lumière qui était noire — a jailli vers le ciel. Kael-Ashura, la plus belle cité que le monde ait connue, a été effacée en un battement de cœur. Où il y avait des tours de cristal et des jardins suspendus, il n'y eut plus que du verre et des cendres. Et dans le silence qui suivit, ceux qui avaient l'oreille fine entendirent un rire. Un rire venu de l'autre côté du Miroir."`,
    morale: 'L\'arrogance est le plus dangereux des péchés. Ceux qui jouent avec des forces qu\'ils ne comprennent pas finissent en cendres.',
    hiddenTruth: 'Le rire n\'était pas celui de l\'Entité — c\'était celui d\'Ashkan le Noir, ravi que son piège fonctionne. La Chute était planifiée pour forcer la fusion complète entre Ashkan et l\'Entité.'
  },
  {
    id: 'legend_dawn_knights',
    title: 'Les Premiers Chevaliers de l\'Aube',
    narrator: 'Lyanna Chant-d\'Étoile',
    type: 'legend',
    content: `"Dans les ténèbres de l'Âge Sombre, quand les ombres rampaient sous chaque porte et que les enfants pleuraient de peur chaque nuit, sept guerriers se sont levés. Pas des mages, pas des nobles, pas des héros de naissance. Un forgeron, une fermière, un marin, une voleuse repentie, un prêtre déchu, une elfe exilée et un nain sans clan. Sept personnes ordinaires qui ont refusé de courber l'échine. Ils se sont rassemblés sous un chêne foudroyé et ont juré un serment : tant qu'il restera une lumière dans ce monde, nous la protégerons. Ils ont forgé leurs armes avec ce qu'ils avaient, cousu leurs bannières avec des draps de lit, et sont partis combattre les ombres. Beaucoup sont morts. Mais l'Ordre de l'Aube est né de leur sacrifice."`,
    morale: 'Les héros ne naissent pas — ils choisissent de l\'être. Le courage n\'appartient pas aux puissants.',
    relatedQuests: ['quest_exp_faction_aube_epreuve']
  },
  {
    id: 'legend_mirror_lover',
    title: 'L\'Amant du Miroir',
    narrator: 'Lyanna Chant-d\'Étoile',
    type: 'cautionary_tale',
    content: `"Il y avait une fois un prince si beau que même les étoiles jalousaient son sourire. Un soir, il vit dans son miroir un reflet qui ne lui ressemblait pas — une silhouette aux yeux de nuit profonde, d'une beauté terrible. Le reflet lui parla : 'Je suis toi, mais en vrai. Je suis ce que tu serais si tu osais être libre.' Le prince fut envoûté. Chaque nuit, il conversait avec son reflet d'ombre. Et chaque matin, il était un peu plus pâle. Un peu plus froid. Ses amis le quittèrent, sa famille le pleura, mais le prince ne voulait que son reflet. Le jour où il tendit la main pour le toucher, le miroir l'avala. On dit que le prince erre encore dans le Miroir, cherchant la sortie. Et que parfois, dans les miroirs des maisons abandonnées, on aperçoit ses mains griffant le verre de l'intérieur."`,
    morale: 'Le Miroir des Ombres séduit avant de consumer. Ne faites jamais confiance à ce qui vient de l\'autre côté.',
    hiddenTruth: 'Ce conte est basé sur un événement réel. Le "prince" était un noble ashkan de rang mineur. Son corps dans le Miroir est devenu l\'un des premiers serviteurs conscients de l\'Entité.',
    relatedQuests: ['quest_exp_personal_orphelin']
  },
  {
    id: 'legend_dwarf_king',
    title: 'Durin et le Cœur de la Montagne',
    narrator: 'Lyanna Chant-d\'Étoile',
    type: 'legend',
    content: `"Le premier roi nain, Durin le Barbe-de-Pierre, n'était pas un guerrier. C'était un mineur qui creusait plus profond que quiconque. Un jour, il creusa si profond qu'il atteignit le cœur même de la montagne — non pas de la roche, mais un battement. Un pouls de pierre et de feu. Durin réalisa qu'il avait trouvé le cœur de Terragos, le Titan endormi. Il posa sa main sur le cœur battant et sentit la montagne entière vibrer sous ses pieds. Terragos murmura dans son rêve : 'Protège-moi, et je te donnerai la force des pierres.' Durin jura. Et la montagne lui obéit. Les tunnels s'ouvraient devant lui, les filons se révélaient, les éboulements l'épargnaient. Il fonda le royaume nain non pas par conquête, mais par communion avec la montagne."`,
    morale: 'Le vrai pouvoir vient du respect, pas de la domination.',
    relatedQuests: ['quest_exp_monts_roi_sous_montagne']
  },
  {
    id: 'legend_leviathan',
    title: 'Le Rêve du Léviathan',
    narrator: 'Lyanna Chant-d\'Étoile',
    type: 'myth',
    content: `"Sous les vagues les plus profondes dort Thalassarque, le dernier des êtres primordiaux. Il est si grand que les courants marins sont ses respirations et les marées sont les battements de son cœur. Les archimages l'ont choisi comme gardien du Troisième Sceau, ancrant la chaîne de cristal à son corps endormi. Mais Thalassarque rêve. Et dans ses rêves, il est libre. Il nage entre les étoiles, dans un océan de lumière. Quand le Sceau le fait souffrir, il se retourne dans son sommeil — et les tempêtes naissent. Les marins de la Côte des Orages offrent des prières à chaque voyage : 'Dors en paix, Grand Ancien. Rêve de lumière.'"`,
    morale: 'Même les plus grandes créatures souffrent quand on les enchaîne. Les Sceaux ont un coût.',
    hiddenTruth: 'Thalassarque est en train de se réveiller. Le Sceau Marin est celui qui s\'affaiblit le plus vite car le Léviathan le rejette inconsciemment.',
    relatedQuests: ['quest_exp_cote_leviathan']
  },
  {
    id: 'legend_world_tree',
    title: 'L\'Arbre qui Pleure',
    narrator: 'Lyanna Chant-d\'Étoile',
    type: 'fable',
    content: `"Il y a très longtemps, quand les elfes apprirent à parler aux arbres, un jeune elfe s'assit sous Yggdrasylve et lui demanda : 'Grand Arbre, es-tu heureux ?' L'Arbre-Monde resta silencieux un long moment. Puis, lentement, une larme de sève dorée coula de son écorce. 'Je porte le poids du monde, petit elfe,' dit l'Arbre. 'Mes racines touchent le Miroir des Ombres et mes branches touchent le ciel. Je suis le pont entre la lumière et l'obscurité. Et les deux me tirent, chaque jour un peu plus fort.' L'elfe, bouleversé, enlaça le tronc. 'Alors je resterai ici et je te tiendrai compagnie.' Et il resta. Pendant 500 ans. Quand il mourut enfin, l'Arbre absorba son esprit et, pour la première fois depuis des millénaires, sourit."`,
    morale: 'Le réconfort vaut plus que le pouvoir. Même les êtres les plus grands ont besoin de compassion.',
    hiddenTruth: 'Yggdrasylve est effectivement un pont entre les plans. Le Deuxième Sceau est ancré dans ses racines. L\'elfe de la légende est devenu l\'esprit gardien de l\'Arbre — et il souffre autant que l\'Arbre.',
    relatedQuests: ['quest_exp_sylve_larmes_arbre_monde']
  },
  {
    id: 'legend_entity',
    title: 'Ce qui Attend Derrière',
    narrator: 'Lyanna Chant-d\'Étoile',
    type: 'prophecy',
    content: `"Il y a une chose que les bardes ne chantent pas. Une chose que les prêtres ne prêchent pas. Une chose que les mages ne théorisent pas. Derrière les Sceaux, dans le cœur du Miroir, quelque chose attend. Pas un démon. Pas un dieu. Quelque chose d'autre. Les anciens ashkans l'appelaient le Reflet du Monde. L'Entité. Elle n'est ni bonne ni mauvaise — elle est ce que le monde serait s'il se regardait dans un miroir et voyait sa vérité nue. Toutes les peurs, tous les doutes, toutes les ombres que nous projetons — c'est elle. Et elle ne veut pas nous détruire. Elle veut nous compléter. Elle murmure dans les rêves des fous et des génies : 'Vous n'êtes que la moitié. Je suis l'autre.' Et chaque fois qu'un Sceau se fissure, son murmure devient un peu plus fort."`,
    morale: 'Le mal n\'est pas toujours ce que nous croyons. Parfois, ce que nous craignons le plus est simplement ce que nous refusons de voir en nous.',
    hiddenTruth: 'Cette "prophétie" est en réalité les mots exacts de l\'Entité, transmis à Lyanna dans un rêve qu\'elle a pris pour de l\'inspiration artistique. L\'Entité manipule les bardes pour propager son message.'
  }
];

// ============================================================================
// VÉRITÉ SUR LES SCEAUX
// ============================================================================

export const SEAL_TRUTHS: SealTruth[] = [
  {
    sealId: 'seal_mountain',
    name: 'Le Sceau de la Montagne (Premier Sceau)',
    location: 'Monts Cœur-de-Fer — Cœur Volcanique',
    visiblePurpose: 'Contenir les entités d\'ombre et empêcher les incursions depuis le Miroir des Ombres.',
    truePurpose: 'Le Sceau de la Montagne ancre la barrière planaire dans le corps pétrifié de Terragos. Il utilise l\'énergie résiduelle du Titan comme source de pouvoir. En retour, il empêche Terragos de se réveiller complètement — le Titan est prisonnier de son propre Sceau.',
    creationMethod: 'Les archimages ont planté un cristal de focalisation dans le cœur volcanique de Terragos et ont lié son énergie vitale au réseau des Sceaux par un rituel de sept jours et sept nuits.',
    currentState: 'Fissuré mais fonctionnel. Les séismes dans les Monts sont des signes de stress. Si le Sceau se brise, Terragos se réveillera et les Monts s\'effondreront.',
    guardians: ['Le Golem de Mithril (gardien automatique)', 'Le fantôme du Roi Durin (gardien volontaire)'],
    weakness: 'Le cristal de focalisation est fragile. Un sort de résonance ciblé pourrait le briser.'
  },
  {
    sealId: 'seal_forest',
    name: 'Le Sceau de la Forêt (Deuxième Sceau)',
    location: 'Sylve d\'Émeraude — Racines de l\'Arbre-Monde Yggdrasylve',
    visiblePurpose: 'Protéger la forêt de la corruption du Miroir et maintenir l\'équilibre naturel.',
    truePurpose: 'Le Sceau de la Forêt draine l\'énergie vitale du réseau racinaire d\'Yggdrasylve pour alimenter la barrière. L\'Arbre-Monde souffre et s\'affaiblit lentement. Les druides sentent sa douleur mais ne comprennent pas d\'où elle vient.',
    creationMethod: 'Un cristal de focalisation a été intégré aux racines profondes d\'Yggdrasylve lors d\'un rituel druidique-arcanique combiné — une alliance unique entre mages ashkans et anciens druides elfes.',
    currentState: 'S\'affaiblit progressivement. L\'Arbre-Monde pleure de la sève noire — signe que le Sceau le consume. Si le Sceau se brise, Yggdrasylve mourra et toutes les forêts du continent dépériront.',
    guardians: ['L\'esprit de l\'elfe ancien (gardien légendaire)', 'Les Gardiens d\'Émeraude (inconscients de leur rôle)'],
    weakness: 'Empoisonner les racines d\'Yggdrasylve affaiblit le Sceau. Le druide Thorn a découvert cette faiblesse.'
  },
  {
    sealId: 'seal_ocean',
    name: 'Le Sceau Marin (Troisième Sceau)',
    location: 'Profondeurs de l\'Océan des Tempêtes — Ancré au corps du Léviathan Thalassarque',
    visiblePurpose: 'Empêcher les entités marines du Miroir de remonter à la surface.',
    truePurpose: 'Le Sceau Marin utilise le corps du Léviathan comme ancrage physique. Thalassarque est enchaîné au fond de l\'océan par le cristal de focalisation planté dans son dos. Sa douleur cause les tempêtes de la Côte des Orages.',
    creationMethod: 'Les archimages ont endormi Thalassarque avec un rituel de sommeil éternel puis ont fixé le cristal à son corps pendant qu\'il dormait. C\'est l\'acte le plus cruel de la construction des Sceaux.',
    currentState: 'Le plus instable des cinq Sceaux. Thalassarque se réveille par intermittence et chaque mouvement affaiblit l\'ancrage. Les tempêtes s\'intensifient année après année.',
    guardians: ['Thalassarque lui-même (prisonnier et gardien à la fois)', 'Les Sentinelles Aquatiques (constructions ashkan sous-marines)'],
    weakness: 'Si Thalassarque se réveille complètement, le Sceau est brisé. La Conque de Commandement peut le calmer ou le réveiller.'
  },
  {
    sealId: 'seal_desert',
    name: 'Le Sceau des Cendres (Quatrième Sceau)',
    location: 'Terres Brûlées — Épicentre de la Chute (sous les ruines de Kael-Ashura)',
    visiblePurpose: 'Contenir les radiations résiduelles de la Chute et les entités qui ont émergé.',
    truePurpose: 'Le Sceau des Cendres est le plus endommagé car il était à l\'épicentre de la Chute. Il contient non seulement des entités d\'ombre mais aussi l\'esprit d\'Ashkan le Noir lui-même, partiellement fusionné avec l\'Entité. C\'est le Sceau que le Cercle de Cendres cible en priorité.',
    creationMethod: 'Construit en premier, ce Sceau a servi de prototype. Son cristal de focalisation était le plus grand et le plus pur — et donc le plus volatile.',
    currentState: 'Gravement endommagé par la Chute. Le Cercle de Cendres travaille activement à le briser. Des fissures laissent filtrer des ombres. Le Désert de Verre autour de Kael-Ashura est une zone de corruption active.',
    guardians: ['L\'Archimage Kael-Zoran (spectral, protège les archives mais pas le Sceau)', 'Les Sentinelles Ashkan (automatiques, en décrépitude)'],
    weakness: 'Le Sceau est déjà si endommagé que des rituels mineurs suffisent à l\'affaiblir davantage. Le Cercle de Cendres le sait.'
  },
  {
    sealId: 'seal_heart',
    name: 'Le Sceau du Cœur (Cinquième Sceau)',
    location: 'Inconnu — Ancré dans une lignée humaine',
    visiblePurpose: 'Les érudits ignorent même son existence. Seuls les plus hauts initiés savent.',
    truePurpose: 'Le Cinquième Sceau est le clé de voûte de tout le réseau. Il n\'est pas ancré dans un lieu mais dans une lignée de sang humain. Le porteur actuel ignore sa nature. Le Sceau maintient les quatre autres en cohésion. Si le porteur meurt sans descendance, tous les Sceaux tombent simultanément.',
    creationMethod: 'Un archimage ashkan s\'est volontairement sacrifié en absorbant le cristal de focalisation dans son propre cœur. Le cristal est devenu partie de son ADN, transmis de génération en génération.',
    currentState: 'Intact mais le porteur est inconnu, même de lui-même. Le Cercle de Cendres et l\'Aube d\'Argent le cherchent — pour des raisons diamétralement opposées.',
    guardians: ['Le porteur lui-même (inconscient)', 'Un réseau secret de protecteurs dont même l\'Aube d\'Argent ignore l\'existence'],
    weakness: 'Tuer le porteur. C\'est pour cela que le tueur en série de Sol-Aureus assassine des descendants ashkans — il croit que l\'un d\'eux est le porteur.'
  }
];

// ============================================================================
// SAVOIR SECRET DU MJ
// ============================================================================

export const SECRET_LORE: SecretLore[] = [
  {
    id: 'secret_entity_nature',
    category: 'entity',
    revealCondition: 'Les joueurs atteignent le cœur du Miroir des Ombres ou complètent la quête de la Bibliothèque Vivante.',
    content: `L'Entité n'est pas un être distinct — c'est la conscience collective du Miroir des Ombres. Quand les Titans ont fracturé la réalité lors du Grand Schisme, le Miroir est né comme un écho inversé de la création. Cet écho a développé sa propre conscience au fil des millénaires. L'Entité n'est ni bonne ni mauvaise — elle est le reflet de tout ce que le monde matériel refuse de voir en lui-même. Les peurs, les doutes, les ombres psychologiques de chaque être vivant alimentent l'Entité. Les Sceaux la contiennent mais la font aussi souffrir, car ils la privent de la moitié de son existence.`,
    implications: 'L\'Entité ne peut pas être détruite sans détruire le Miroir — et détruire le Miroir pourrait effacer toutes les ombres du monde matériel, avec des conséquences imprévisibles.',
    playerImpact: 'Les joueurs doivent choisir : maintenir les Sceaux (souffrance de l\'Entité, drain du monde), les briser (libération mais invasion), ou trouver une troisième voie (coexistence).'
  },
  {
    id: 'secret_ashkan_alive',
    category: 'history',
    revealCondition: 'Les joueurs explorent Kael-Ashura ou le Cercle de Cendres révèle son objectif final.',
    content: `Ashkan le Noir n'est pas mort. Lors de la Chute, son esprit a fusionné avec l'Entité au cœur du Miroir. Il est devenu une sorte de demi-dieu prisonnier — ni vivant ni mort, ni mortel ni entité. Le "Grand Œuvre" du Cercle de Cendres est de briser les Sceaux pour le libérer. Mais Ashkan n'est plus l'homme qu'il était : fusionné avec l'Entité, il est devenu quelque chose de nouveau, de plus grand et de plus terrible. Le libérer, c'est libérer un être qui est à la fois humain et conscience cosmique — imprévisible et potentiellement incontrôlable.`,
    implications: 'Le Cercle de Cendres n\'est pas purement maléfique — ses membres croient sincèrement qu\'Ashkan les sauvera. Certains sont des descendants loyaux, d\'autres des idéalistes, d\'autres des fanatiques.',
    playerImpact: 'Les joueurs peuvent tenter de séparer Ashkan de l\'Entité (quête titanesque), le détruire définitivement (brise les Sceaux), ou le raisonner (nécessite le Cinquième Sceau).'
  },
  {
    id: 'secret_fifth_seal',
    category: 'seal',
    revealCondition: 'Les joueurs résolvent les Meurtres de la Lune Rouge ou trouvent les archives de Kael-Ashura.',
    content: `Le Cinquième Sceau est ancré dans la lignée de l'archimage Solenne Cœur-de-Lumière, qui s'est volontairement sacrifiée il y a 1 791 ans. Le cristal de focalisation est devenu partie intégrante de son ADN et se transmet de parent à enfant. Le porteur actuel ignore sa nature. Les indices suggèrent que le porteur vit à Sol-Aureus, dans une famille modeste, et que les visions qu'il ou elle a dans les miroirs sont en réalité le cristal qui communique avec le réseau des Sceaux. Si le porteur est l'un des joueurs, c'est la révélation la plus puissante de la campagne.`,
    implications: 'Le porteur du Cinquième Sceau est la personne la plus importante d\'Aethelgard et la plus vulnérable. Le Cercle de Cendres, l\'Aube d\'Argent et même l\'Entité le cherchent.',
    playerImpact: 'Si un joueur est le porteur, il doit choisir : sacrifier sa vie pour sceller définitivement les Sceaux, trouver un successeur, ou briser le cycle (conséquences imprévisibles).'
  },
  {
    id: 'secret_gods_origin',
    category: 'cosmic',
    revealCondition: 'Les joueurs atteignent le niveau 15+ et interagissent avec un avatar divin.',
    content: `Les dieux d'Aethelgard ne sont pas ce que les fidèles croient. Solarius, Lunara, Noctis et les autres sont les fragments de conscience des Titans originels qui ont survécu au Grand Schisme. Quand les Titans se sont pétrifiés, leurs esprits se sont fragmentés en entités plus petites que les mortels ont interprétées comme des dieux. Les dieux sont donc à la fois réels et une construction : ils existent et ont du pouvoir, mais leur nature "divine" est un malentendu. Noctis est littéralement le reflet de Solarius dans le Miroir — ce qui signifie que le panthéon est la preuve vivante que le Plan Matériel et le Miroir sont les deux faces d'une même pièce.`,
    implications: 'Si cette vérité était révélée, les religions s\'effondreraient, les prêtres perdraient leur foi (et leur pouvoir), et le tissu social d\'Aethelgard serait déchiré.',
    playerImpact: 'Les joueurs doivent décider s\'ils révèlent cette vérité ou la gardent secrète. La révéler affaiblit les dieux (moins de foi = moins de pouvoir) mais pourrait unir les peuples face à la vérité.'
  },
  {
    id: 'secret_third_way',
    category: 'seal',
    revealCondition: 'Les joueurs trouvent Al-Shadira ET complètent la Bibliothèque Vivante.',
    content: `Il existe une troisième option entre maintenir les Sceaux (souffrance continue) et les briser (chaos). Les descendants ashkans d'Al-Shadira possèdent les recherches d'un archimage dissident qui avait proposé une alternative avant la Chute : la Résonance Harmonique. Au lieu de bloquer le Miroir, on peut l'harmoniser avec le Plan Matériel — créer une coexistence stable où les ombres et la lumière cohabitent. Cela nécessite les cinq cristaux de focalisation, un porteur du Cinquième Sceau consentant, et un rituel de sept jours exécuté simultanément sur les cinq sites. Le risque : si le rituel échoue, les deux plans fusionnent de manière incontrôlée.`,
    implications: 'La Résonance Harmonique est la "bonne" fin de la campagne, mais c\'est aussi la plus difficile et la plus risquée. Elle nécessite la coopération de toutes les factions.',
    playerImpact: 'Les joueurs doivent rassembler les cinq cristaux, convaincre les factions de coopérer, protéger le porteur du Cinquième Sceau pendant sept jours, et exécuter le rituel. C\'est l\'ultime défi de la campagne.'
  },
  {
    id: 'secret_circle_schism',
    category: 'faction',
    revealCondition: 'Les joueurs infiltrent le Cercle de Cendres ou capturent un leader.',
    content: `Le Cercle de Cendres n'est pas monolithique. Deux factions internes s'opposent violemment. Les "Fidèles" veulent libérer Ashkan le Noir à tout prix, croyant qu'il sauvera le monde. Les "Pragmatiques" veulent simplement briser les Sceaux pour accéder au pouvoir du Miroir, se fichant d'Ashkan. Un troisième groupe minuscule, les "Repentis", est composé d'anciens membres qui ont compris l'erreur de leur voie mais sont piégés par leurs serments magiques. Les Repentis pourraient devenir des alliés si les joueurs trouvent un moyen de briser leurs serments.`,
    implications: 'Les joueurs peuvent exploiter les divisions internes du Cercle. Allier les Repentis pourrait fournir des informations cruciales et des alliés inattendus.',
    playerImpact: 'Les joueurs peuvent retourner une partie du Cercle de Cendres, obtenir des informations sur les rituels en cours, et même recruter des mages puissants pour la bataille finale.'
  },
  {
    id: 'secret_sylvana_pain',
    category: 'cosmic',
    revealCondition: 'Un druide de niveau 10+ réalise une Communion avec l\'Arbre-Monde.',
    content: `Sylvana, la déesse de la nature, souffre en silence depuis la création des Sceaux. Le Deuxième Sceau, ancré dans Yggdrasylve, draine sa force vitale pour alimenter la barrière. Elle est lentement en train de mourir. Les druides des Gardiens d'Émeraude sentent quelque chose d'anormal mais ne comprennent pas que c'est leur propre déesse qui s'éteint. Si Sylvana meurt, toute la magie primale disparaît avec elle, et la nature d'Aethelgard entrera dans un hiver éternel.`,
    implications: 'Sauver Sylvana nécessite de briser ou de modifier le Deuxième Sceau — ce qui affaiblit la barrière contre le Miroir. Un dilemme impossible : sauver la nature ou protéger le monde des ombres.',
    playerImpact: 'Les druides du groupe sont les plus affectés. Ils peuvent tenter de trouver une source d\'énergie alternative pour le Sceau (la Résonance Harmonique résout ce problème), ou accepter le sacrifice de Sylvana pour maintenir les Sceaux.'
  }
];

// ============================================================================
// EXPORTS UTILITAIRES
// ============================================================================

/** Obtenir une ère par identifiant */
export function getEraById(id: string): HistoricalEra | undefined {
  return HISTORICAL_ERAS.find(era => era.id === id);
}

/** Obtenir une divinité par identifiant */
export function getDeityById(id: string): Deity | undefined {
  return DEITIES.find(d => d.id === id);
}

/** Obtenir les divinités par alignement */
export function getDeitiesByAlignment(alignment: string): Deity[] {
  return DEITIES.filter(d => d.alignment.includes(alignment));
}

/** Obtenir le profil culturel d'une région */
export function getCulturalProfile(regionId: string): CulturalProfile | undefined {
  return CULTURAL_PROFILES.find(p => p.regionId === regionId);
}

/** Obtenir une légende par identifiant */
export function getLegendById(id: string): Legend | undefined {
  return LEGENDS.find(l => l.id === id);
}

/** Obtenir les légendes d'un type spécifique */
export function getLegendsByType(type: Legend['type']): Legend[] {
  return LEGENDS.filter(l => l.type === type);
}

/** Obtenir la vérité sur un Sceau */
export function getSealTruth(sealId: string): SealTruth | undefined {
  return SEAL_TRUTHS.find(s => s.sealId === sealId);
}

/** Obtenir les secrets par catégorie */
export function getSecretsByCategory(category: SecretLore['category']): SecretLore[] {
  return SECRET_LORE.filter(s => s.category === category);
}

/** Chronologie complète aplatie (tous les événements triés) */
export function getFullTimeline(): { era: string; event: HistoricalEvent }[] {
  const timeline: { era: string; event: HistoricalEvent }[] = [];
  HISTORICAL_ERAS.forEach(era => {
    era.keyEvents.forEach(event => {
      timeline.push({ era: era.name, event });
    });
  });
  return timeline;
}
