// ============================================================
// STRUCTURES FAMILIALES - 15 OPTIONS
// Type de famille et dynamique relationnelle
// ============================================================

import type { LifeChoice } from '../../../../types/lore';

export const FAMILIES: LifeChoice[] = [
  {
    id: 'childhood_family_nuclear_loving',
    stage: 'childhood',
    category: 'family',
    label: 'Famille Unie et Aimante',
    desc: 'Parents présents, fratrie solidaire. Un foyer stable où l\'amour et le soutien ne manquent jamais.',
    detailed_lore: {
      backstory: 'Votre enfance fut rythmée par les repas en famille, les rires partagés et le soutien inconditionnel de vos proches. Vos parents, bien que modestes, ont toujours placé votre bien-être avant tout. Vos frères et sœurs sont vos meilleurs alliés.',
      defining_moment: 'Quand vous êtes tombé gravement malade à huit ans, toute la famille a veillé à votre chevet pendant trois jours. Vous avez compris ce jour-là la force du lien familial.',
      worldview_shaped: 'La famille est le roc sur lequel tout se construit. L\'amour et la loyauté sont les plus grandes forces.'
    },
    effects: {
      stats: { charisma: 1, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Liens Familiaux Forts',
          desc: '+2 Persuasion avec alliés, résistance à la peur quand proches menacés',
          game_effect: 'Bonus social et défense émotionnelle'
        }
      ],
      reputation: [],
      items: [
        { itemId: 'family_heirloom', quantity: 1, reason: 'Bijou transmis avec amour' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 2, reason: 'Empathie développée en famille' },
        { skillId: 'insight', bonus: 1, reason: 'Lecture des émotions' }
      ],
      languages: [],
      tags: ['stable', 'loved', 'supportive', 'emotional_strength']
    },
    social_impacts: {
      npc_reactions: {
        'orphelins': 'Envie',
        'familles': 'Reconnaissance mutuelle',
        'solitaires': 'Incompréhension'
      },
      first_impression: '« Tu as cet air serein des gens qui ont connu l\'amour inconditionnel. »'
    },
    tags: ['stable', 'loved', 'supportive'],
    incompatible_with: ['childhood_family_orphan', 'childhood_family_abusive']
  },

  {
    id: 'childhood_family_single_parent',
    stage: 'childhood',
    category: 'family',
    label: 'Parent Unique Dévoué',
    desc: 'Élevé par un seul parent (veuf/veuve ou abandonné) qui a sacrifié tout pour vous.',
    detailed_lore: {
      backstory: 'Votre mère/père a porté seul(e) le poids de votre éducation après la mort ou le départ de l\'autre parent. Vous l\'avez vu(e) travailler jusqu\'à l\'épuisement, pleurer en silence, mais jamais renoncer. Votre lien est d\'acier.',
      defining_moment: 'Un soir, vous avez trouvé votre parent endormi(e) à table, épuisé(e) après une double journée de travail. Vous avez juré de réussir pour honorer ce sacrifice.',
      worldview_shaped: 'Le sacrifice pour ceux qu\'on aime est la plus noble des vertus. Je dois être fort(e) pour deux.'
    },
    effects: {
      stats: { constitution: 1, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Résilience Forgée',
          desc: '+1 tous jets quand PV < 50%, +2 Volonté contre désespoir',
          game_effect: 'Endurance mentale extrême'
        }
      ],
      reputation: [],
      items: [
        { itemId: 'parents_tool', quantity: 1, reason: 'Outil de travail hérité' }
      ],
      skills: [
        { skillId: 'athletics', bonus: 1, reason: 'Aidé parent depuis jeune âge' },
        { skillId: 'insight', bonus: 2, reason: 'Lecture des non-dits' }
      ],
      languages: [],
      tags: ['resilient', 'devoted', 'hardworking', 'mature']
    },
    social_impacts: {
      npc_reactions: {
        'travailleurs': 'Respect',
        'privilégiés': 'Admiration ou mépris',
        'autres_enfants_uniques': 'Fraternité'
      },
      first_impression: '« Tu as l\'air de quelqu\'un qui a grandi vite. »'
    },
    tags: ['resilient', 'devoted', 'hardworking'],
    incompatible_with: ['childhood_family_orphan']
  },

  {
    id: 'childhood_family_noble_dynasty',
    stage: 'childhood',
    category: 'family',
    label: 'Dynastie Noble Exigeante',
    desc: 'Famille aristocratique où le devoir prime sur l\'affection. Excellence attendue, émotions réprimées.',
    detailed_lore: {
      backstory: 'Vous êtes héritier d\'une lignée prestigieuse. Vos parents vous ont élevé avec rigueur : tuteurs sévères, étiquette stricte, pression constante pour exceller. L\'amour, s\'il existe, ne se montre jamais ouvertement.',
      defining_moment: 'À douze ans, vous avez gagné un tournoi d\'escrime. Votre père a hoché la tête en silence. C\'était sa seule marque d\'approbation.',
      worldview_shaped: 'Les émotions sont des faiblesses. Le devoir et l\'honneur guident les grands destins.'
    },
    effects: {
      stats: { intelligence: 1, charisma: 1 },
      stats_penalty: { wisdom: 1 },
      mechanical_traits: [
        {
          name: 'Sang Froid Aristocratique',
          desc: '+3 Persuasion/Intimidation avec nobles, -2 Empathie',
          game_effect: 'Maîtrise sociale froide'
        }
      ],
      reputation: [
        { factionId: 'noblesse', delta: 5, reason: 'Héritier reconnu' }
      ],
      items: [
        { itemId: 'signet_ring', quantity: 1, reason: 'Sceau familial' },
        { itemId: 'fine_clothes', quantity: 2, reason: 'Garde-robe noble' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 3, reason: 'Rhétorique aristocratique' },
        { skillId: 'knowledge_nobility', bonus: 2, reason: 'Éducation héraldique' }
      ],
      languages: ['Langue Noble', 'Étiquette Courtisane'],
      tags: ['noble', 'disciplined', 'cold', 'prestigious']
    },
    social_impacts: {
      npc_reactions: {
        'nobles': 'Respect ou rivalité',
        'roturiers': 'Déférence forcée',
        'rebelles': 'Hostilité'
      },
      first_impression: '« Votre maintien trahit une éducation... rigoureuse. »'
    },
    tags: ['noble', 'disciplined', 'cold'],
    incompatible_with: ['childhood_family_orphan', 'childhood_family_criminal']
  },

  {
    id: 'childhood_family_merchant_caravan',
    stage: 'childhood',
    category: 'family',
    label: 'Famille Marchande Itinérante',
    desc: 'Élevé sur les routes commerciales, entre caravanes et marchés exotiques.',
    detailed_lore: {
      backstory: 'Votre famille ne s\'est jamais fixée. Chaque saison apportait une nouvelle ville, de nouveaux visages, de nouvelles langues. Vous avez appris à négocier avant de savoir écrire, et à repérer les menteurs dans les bazars orientaux.',
      defining_moment: 'À dix ans, des bandits ont attaqué votre caravane. Vous avez négocié votre libération en offrant une "carte au trésor" que vous aviez dessinée la veille.',
      worldview_shaped: 'Le monde est un marché. Tout s\'achète, tout se vend. L\'adaptabilité est survie.'
    },
    effects: {
      stats: { charisma: 1, intelligence: 1 },
      mechanical_traits: [
        {
          name: 'Nomade Né',
          desc: '+2 Survie (route), langues supplémentaires apprises 50% plus vite',
          game_effect: 'Adaptabilité culturelle'
        }
      ],
      reputation: [
        { factionId: 'guildes_marchandes', delta: 3, reason: 'Famille connue' }
      ],
      items: [
        { itemId: 'exotic_spice', quantity: 3, reason: 'Stock familial' },
        { itemId: 'trade_map', quantity: 1, reason: 'Carnet routes commerciales' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 2, reason: 'Marchandage constant' },
        { skillId: 'survival', bonus: 1, reason: 'Vie sur les routes' }
      ],
      languages: ['2 langues étrangères au choix'],
      tags: ['nomadic', 'adaptable', 'mercantile', 'worldly']
    },
    social_impacts: {
      npc_reactions: {
        'marchands': 'Reconnaissance professionnelle',
        'sédentaires': 'Fascination ou méfiance',
        'voyageurs': 'Camaraderie'
      },
      first_impression: '« Tu as l\'accent de partout et de nulle part. Marchand ? »'
    },
    tags: ['nomadic', 'adaptable', 'mercantile'],
    incompatible_with: []
  },

  {
    id: 'childhood_family_criminal_gang',
    stage: 'childhood',
    category: 'family',
    label: 'Clan Criminel Soudé',
    desc: 'Famille de voleurs, contrebandiers ou assassins. Loyauté absolue, loi du silence.',
    detailed_lore: {
      backstory: 'Votre famille opère dans l\'ombre depuis trois générations. Vous avez appris le code de l\'honneur des voleurs avant l\'alphabet. Les cicatrices de votre père racontent une vie de coups audacieux. Votre mère sait trente façons de tuer sans bruit.',
      defining_moment: 'À onze ans, vous avez fait votre premier "travail" : voler la bourse d\'un noble. Votre oncle vous a serré dans ses bras : "Bienvenue dans la famille, gamin."',
      worldview_shaped: 'La loi protège les riches. Nous prenons ce qui nous est dû. La famille avant tout.'
    },
    effects: {
      stats: { dexterity: 2 },
      stats_penalty: { charisma: 1 },
      mechanical_traits: [
        {
          name: 'Enfant des Ombres',
          desc: '+3 Discrétion/Escamotage, contacts réseau criminel',
          game_effect: 'Maîtrise vol et infiltration'
        }
      ],
      reputation: [
        { factionId: 'guilde_voleurs', delta: 5, reason: 'Famille célèbre' },
        { factionId: 'autorites', delta: -7, reason: 'Recherché' }
      ],
      items: [
        { itemId: 'lockpicks_quality', quantity: 1, reason: 'Cadeau d\'initiation' },
        { itemId: 'thieves_cant_manual', quantity: 1, reason: 'Code familial' }
      ],
      skills: [
        { skillId: 'stealth', bonus: 3, reason: 'Entraînement précoce' },
        { skillId: 'sleight_of_hand', bonus: 2, reason: 'Pickpocket depuis l\'enfance' }
      ],
      languages: ['Cant des Voleurs'],
      tags: ['criminal', 'stealthy', 'loyal', 'outlaw']
    },
    social_impacts: {
      npc_reactions: {
        'gardes': 'Suspicion extrême',
        'voleurs': 'Respect',
        'citoyens': 'Peur',
        'nobles': 'Mépris'
      },
      first_impression: '« Garde tes poches, celui-là a les mains trop agiles. »'
    },
    tags: ['criminal', 'stealthy', 'loyal'],
    incompatible_with: ['childhood_family_noble_dynasty', 'childhood_family_clerical']
  },

  // ... 10 autres familles à compléter :
  // - Famille militaire disciplinée
  // - Famille artisanale traditionnelle
  // - Orphelinat strict
  // - Famille toxique/abusive
  // - Communauté tribale
  // - Famille religieuse dévote
  // - Famille d'érudits/sages
  // - Famille paysanne nombreuse
  // - Foyer d'accueil temporaire
  // - Élevé par créature non-humaine (elfe, nain, druide)

  {
    id: 'childhood_family_orphan',
    stage: 'childhood',
    category: 'family',
    label: 'Orphelin - Aucune Famille',
    desc: 'Pas de famille. Élevé en orphelinat, par charité ou dans la rue.',
    detailed_lore: {
      backstory: 'Vous n\'avez jamais connu la chaleur d\'un foyer. Orphelinat surpeuplé, rues froides ou succession de foyers temporaires. Vous avez appris très tôt que personne ne viendra vous sauver.',
      defining_moment: 'Vous avez regardé les autres enfants retrouver leurs parents à la fin de la journée. Personne n\'est venu pour vous. Plus jamais vous ne pleurerez.',
      worldview_shaped: 'Je suis seul(e). Je n\'ai besoin de personne. La faiblesse tue.'
    },
    effects: {
      stats: { willpower: 2, dexterity: 1 },
      stats_penalty: { charisma: 2 },
      mechanical_traits: [
        {
          name: 'Indépendance Forcée',
          desc: '+3 Survie seul, -3 jets travail d\'équipe',
          game_effect: 'Solitaire compétent'
        }
      ],
      reputation: [],
      items: [],
      skills: [
        { skillId: 'survival', bonus: 3, reason: 'Survie sans aide' },
        { skillId: 'stealth', bonus: 2, reason: 'Éviter les dangers' }
      ],
      languages: [],
      tags: ['orphan', 'isolated', 'survivor', 'distrustful']
    },
    social_impacts: {
      npc_reactions: {
        'familles': 'Pitié ou malaise',
        'autres_orphelins': 'Solidarité silencieuse',
        'tous': 'Méfiance réciproque'
      },
      first_impression: '« Tu as ce regard... celui de ceux qui n\'ont jamais pu compter sur personne. »'
    },
    tags: ['orphan', 'isolated', 'survivor'],
    incompatible_with: ['childhood_family_nuclear_loving', 'childhood_family_single_parent', 'childhood_family_noble_dynasty']
  }
];
