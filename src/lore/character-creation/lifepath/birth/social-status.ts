// ============================================================
// STATUTS SOCIAUX À LA NAISSANCE - 10 OPTIONS
// Détermine position sociale de la famille
// ============================================================

import type { LifeChoice } from '../../../../types/lore';

export const SOCIAL_STATUSES: LifeChoice[] = [
  {
    id: 'birth_status_nobility',
    stage: 'birth',
    category: 'status',
    label: 'Sang Noble',
    desc: 'Héritier d\'une lignée aristocratique ancienne, élevé dans l\'opulence et les devoirs dynastiques.',
    detailed_lore: {
      backstory: 'Votre famille porte un nom connu depuis des générations. Terres, titres et alliances matrimoniales tissent votre destinée avant même votre naissance. Vous avez grandi entouré de domestiques, tuteurs privés et courtisans calculateurs.',
      defining_moment: 'À votre majorité, votre père vous a remis l\'anneau sigillaire familial en disant : "Ce sceau ouvre plus de portes que cent épées. Ne le déshonore jamais."',
      worldview_shaped: 'Le pouvoir vient du sang et du devoir. Les roturiers méritent protection, mais ne peuvent comprendre le poids des responsabilités nobles.'
    },
    effects: {
      stats: { charisma: 4, intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Privilège Aristocratique',
          desc: '+5 Persuasion avec nobles/autorités, avantage jets sociaux cour royale',
          game_effect: 'Avantage social politique, accès privilégié décisions royales'
        },
        {
          name: 'Héritage Prestigieux',
          desc: 'Commence avec 1000 PO supplémentaires + obligations familiales (quêtes dynastiques)',
          game_effect: 'Richesse substantielle mais attentes familiales élevées'
        },
        {
          name: 'Éducation Supérieure',
          desc: '+1d20 aux jets Connaissance (Histoire/Noblesse/Étiquette)',
          game_effect: 'Bonus d100 culture aristocratique et protocole'
        }
      ],
      reputation: [
        { factionId: 'noblesse', delta: 8, reason: 'Membre de l\'aristocratie' },
        { factionId: 'peuple', delta: -3, reason: 'Perçu comme privilégié' }
      ],
      items: [
        { itemId: 'signet_ring', quantity: 1, reason: 'Sceau familial' },
        { itemId: 'fine_clothes', quantity: 3, reason: 'Garde-robe noble' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 5, reason: 'Éducation courtisane' },
        { skillId: 'knowledge_nobility', bonus: 5, reason: 'Héraldique et protocole' }
      ],
      languages: ['Commun', 'Langue Noble'],
      gold: 1000,
      tags: ['noble', 'wealthy', 'privileged', 'respected', 'political', 'leadership']
    },
    subCategory: 'Privilégiés',
    social_impacts: {
      npc_reactions: {
        'nobles': 'Respect immédiat',
        'paysans': 'Déférence forcée'
      },
      first_impression: '« Seigneur/Dame, votre présence nous honore. »'
    },
    tags: ['noble', 'wealthy', 'privileged'],
    incompatible_with: ['birth_status_esclave', 'birth_status_orphelin', 'birth_status_paria']
  },
  {
    id: 'birth_status_merchant',
    stage: 'birth',
    category: 'status',
    label: 'Famille Marchande Prospère',
    desc: 'Né dans une famille de commerçants fortunés, entouré de caravanes et de comptes.',
    detailed_lore: {
      backstory: 'Votre famille a bâti sa fortune sur le commerce. Dès vos premiers mots, vous avez entendu parler de profits, marges et contrats.',
      defining_moment: 'Votre berceau était entouré de registres comptables et de tissus précieux. Les marchands saluaient votre naissance comme signe de prospérité.',
      worldview_shaped: 'L\'or achète liberté et respect.'
    },
    effects: {
      stats: { intelligence: 2, charisma: 2 },
      mechanical_traits: [
        {
          name: 'Sens du Commerce',
          desc: '+8 Persuasion (marchandage), prix d\'achat réduits',
          game_effect: 'Avantage économique'
        }
      ],
      reputation: [
        { factionId: 'guildes_marchandes', delta: 6, reason: 'Famille marchande' }
      ],
      items: [
        { itemId: 'merchant_ledger', quantity: 1, reason: 'Registre familial' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 8, reason: 'Négociations constantes' }
      ],
      languages: ['Commun', 'Langue Marchande'],
      gold: 1000,
      tags: ['merchant', 'wealthy', 'pragmatic', 'negotiator', 'mercantile', 'worldly']
    },
    subCategory: 'Privilégiés',
    social_impacts: {
      npc_reactions: {
        'marchands': 'Confiance professionnelle'
      },
      first_impression: '« Ah, un négociant ! Voyons si nous pouvons trouver un arrangement. »'
    },
    tags: ['merchant', 'wealthy', 'pragmatic'],
    incompatible_with: ['birth_status_esclave', 'birth_status_paria']
  },
  {
    id: 'birth_status_artisan',
    stage: 'birth',
    category: 'status',
    label: 'Lignée Artisanale Respectée',
    desc: 'Issu d\'une famille de maîtres artisans.',
    detailed_lore: {
      backstory: 'Votre famille transmet son savoir-faire depuis des générations. Les outils sonnent comme berceuses dans l\'atelier familial.',
      defining_moment: 'Votre père a forgé votre premier hochet en acier parfaitement équilibré, symbole de la maîtrise qui coulera bientôt dans vos veines.',
      worldview_shaped: 'Le talent se gagne par la sueur.'
    },
    effects: {
      stats: { dexterity: 2, intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Maître Héritier',
          desc: '+5 Artisanat, outils de maître offerts',
          game_effect: 'Bonus crafting'
        }
      ],
      reputation: [
        { factionId: 'guilde_artisans', delta: 5, reason: 'Fils de Maître' }
      ],
      items: [
        { itemId: 'masterwork_tools', quantity: 1, reason: 'Héritage familial' }
      ],
      skills: [
        { skillId: 'crafting', bonus: 5, reason: 'Apprentissage familial' }
      ],
      languages: ['Commun'],
      gold: 200,
      tags: ['artisan', 'crafting', 'skilled', 'humble', 'traditional', 'creative']
    },
    subCategory: 'Travailleurs',
    social_impacts: {
      npc_reactions: {
        'artisans': 'Respect professionnel'
      },
      first_impression: '« Votre famille fait du magnifique travail. »'
    },
    tags: ['artisan', 'skilled', 'urban'],
    incompatible_with: ['birth_status_nobility']
  },
  {
    id: 'birth_status_paysan',
    stage: 'birth',
    category: 'status',
    label: 'Humble Paysannerie',
    desc: 'Né dans les champs, où le travail honnête nourrit le corps.',
    detailed_lore: {
      backstory: 'Votre famille cultive la terre depuis six générations.',
      defining_moment: 'Une année de sécheresse a soudé votre communauté.',
      worldview_shaped: 'La terre ne ment pas.'
    },
    effects: {
      stats: { constitution: 4 },
      mechanical_traits: [
        {
          name: 'Robustesse Paysanne',
          desc: '+25 PV maximum, endurance marathonienne',
          game_effect: 'Endurance exceptionnelle'
        }
      ],
      reputation: [
        { factionId: 'peuple', delta: 5, reason: 'Issu du peuple' }
      ],
      items: [
        { itemId: 'wooden_tool', quantity: 1, reason: 'Outil agricole' }
      ],
      skills: [
        { skillId: 'survival', bonus: 5, reason: 'Vie rurale' }
      ],
      languages: ['Commun'],
      gold: 50,
      tags: ['peasant', 'rural', 'humble', 'resilient', 'poor', 'traditional']
    },
    subCategory: 'Travailleurs',
    social_impacts: {
      npc_reactions: {
        'paysans': 'Fraternité immédiate'
      },
      first_impression: '« Un paysan ? Tu connais la valeur du travail. »'
    },
    tags: ['rural', 'humble', 'resilient'],
    incompatible_with: ['birth_status_nobility']
  },
  {
    id: 'birth_status_clerc',
    stage: 'birth',
    category: 'status',
    label: 'Famille Cléricale Dévouée',
    desc: 'Élevé dans l\'ombre d\'un temple.',
    detailed_lore: {
      backstory: 'Vous avez grandi entre encens et psaumes.',
      defining_moment: 'Une lumière divine a touché votre front.',
      worldview_shaped: 'La foi guide, la raison suit.'
    },
    effects: {
      stats: { wisdom: 4, charisma: 2 },
      mechanical_traits: [
        {
          name: 'Béni des Dieux',
          desc: '+5 Religion, +3 Médecine',
          game_effect: 'Affinité divine'
        }
      ],
      reputation: [
        { factionId: 'eglises', delta: 6, reason: 'Famille sacerdotale' }
      ],
      items: [
        { itemId: 'holy_symbol', quantity: 1, reason: 'Symbole familial' }
      ],
      skills: [
        { skillId: 'religion', bonus: 5, reason: 'Théologie' }
      ],
      languages: ['Commun', 'Langue Sacrée'],
      gold: 100,
      tags: ['clerical', 'educated', 'religious', 'spiritual', 'tempted', 'faithful']
    },
    subCategory: 'Privilégiés',
    social_impacts: {
      npc_reactions: {
        'croyants': 'Respect pieux'
      },
      first_impression: '« Que les dieux vous gardent, enfant de la foi. »'
    },
    tags: ['religious', 'devout', 'educated'],
    incompatible_with: ['birth_status_criminel']
  },
  {
    id: 'birth_status_orphelin',
    stage: 'birth',
    category: 'status',
    label: 'Orphelin des Rues',
    desc: 'Élevé par les rues impitoyables.',
    detailed_lore: {
      backstory: 'Abandonné à la naissance, vous avez été trouvé dans une ruelle par des mendiants qui vous ont élevé dans la survie quotidienne.',
      defining_moment: 'Personne ne sait qui étaient vos parents. Les rues froides ont été votre premier berceau.',
      worldview_shaped: 'La survie justifie tout.'
    },
    effects: {
      stats: { dexterity: 4, constitution: 2 },
      stats_penalty: { charisma: 2 },
      mechanical_traits: [
        {
          name: 'Instinct de Survie Urbaine',
          desc: '+8 Discrétion, +5 Escamotage',
          game_effect: 'Maître infiltration'
        }
      ],
      reputation: [
        { factionId: 'guilde_voleurs', delta: 3, reason: 'Ancien des rues' }
      ],
      items: [
        { itemId: 'lockpicks', quantity: 1, reason: 'Outils de survie' }
      ],
      skills: [
        { skillId: 'stealth', bonus: 8, reason: 'Éviter les gardes' }
      ],
      languages: ['Commun', 'Argot des Rues'],
      gold: 10,
      tags: ['orphan', 'poor', 'urban', 'survivor', 'tough', 'street_wise']
    },
    subCategory: 'Marginaux',
    social_impacts: {
      npc_reactions: {
        'gardes': 'Suspicion'
      },
      first_impression: '« Garde tes poches, un rat de rue. »'
    },
    tags: ['orphan', 'street', 'survivor'],
    incompatible_with: ['birth_status_nobility']
  },
  {
    id: 'birth_status_esclave',
    stage: 'birth',
    category: 'status',
    label: 'Esclave Affranchi',
    desc: 'Né dans les chaînes puis libéré.',
    detailed_lore: {
      backstory: 'Vous êtes né propriété légale d\'un maître.',
      defining_moment: 'Le jour où vos chaînes ont été brisées.',
      worldview_shaped: 'La liberté est le plus précieux des trésors.'
    },
    effects: {
      stats: { wisdom: 4, constitution: 2 },
      stats_penalty: { charisma: 2 },
      mechanical_traits: [
        {
          name: 'Volonté Indomptable',
          desc: '+5 Athlétisme, résistance mentale',
          game_effect: 'Résistance légendaire'
        }
      ],
      reputation: [
        { factionId: 'abolitionnistes', delta: 10, reason: 'Symbole de liberté' }
      ],
      items: [
        { itemId: 'broken_shackle', quantity: 1, reason: 'Symbole de liberté' }
      ],
      skills: [
        { skillId: 'athletics', bonus: 5, reason: 'Travaux forcés' }
      ],
      languages: ['Commun'],
      gold: 0,
      tags: ['ex_slave', 'traumatized', 'resilient', 'free', 'stigma', 'survivor']
    },
    subCategory: 'Marginaux',
    social_impacts: {
      npc_reactions: {
        'esclavagistes': 'Hostilité'
      },
      first_impression: '« Ces marques... Tu étais esclave ? »'
    },
    tags: ['former_slave', 'survivor', 'vengeful'],
    incompatible_with: ['birth_status_nobility']
  },
  {
    id: 'birth_status_batard',
    stage: 'birth',
    category: 'status',
    label: 'Bâtard Noble',
    desc: 'Sang noble mais nom refusé.',
    detailed_lore: {
      backstory: 'Fruit d\'une liaison illégitime, vivant dans l\'ombre du château.',
      defining_moment: 'Le jour où votre parent noble a détourné les yeux.',
      worldview_shaped: 'Je prouverai ma valeur par mes actes.'
    },
    effects: {
      stats: { charisma: 2, wisdom: 2 },
      mechanical_traits: [
        {
          name: 'Héritage Contesté',
          desc: '+3 Persuasion/Intimidation avec nobles',
          game_effect: 'Ambiguïté sociale'
        }
      ],
      reputation: [
        { factionId: 'noblesse', delta: -5, reason: 'Scandale familial' }
      ],
      items: [
        { itemId: 'mother_locket', quantity: 1, reason: 'Seul lien tangible' }
      ],
      skills: [
        { skillId: 'insight', bonus: 5, reason: 'Détecter l\'hypocrisie' }
      ],
      languages: ['Commun', 'Langue Noble'],
      gold: 500,
      tags: ['noble_bastard', 'political', 'rejected', 'privileged', 'ambitious', 'tainted']
    },
    subCategory: 'Privilégiés',
    social_impacts: {
      npc_reactions: {
        'nobles': 'Gêne palpable'
      },
      first_impression: '« Un bâtard noble ? Quel dommage. »'
    },
    tags: ['bastard', 'noble_blood', 'outcast'],
    incompatible_with: ['birth_status_nobility']
  },
  {
    id: 'birth_status_criminel',
    stage: 'birth',
    category: 'status',
    label: 'Famille Criminelle',
    desc: 'Né dans une lignée de hors-la-loi.',
    detailed_lore: {
      backstory: 'Votre famille contrôle le monde souterrain depuis trois générations. Vous êtes né dans l\'ombre, entouré de codes secrets et signaux.',
      defining_moment: 'Les voleurs influents ont rendu hommage à votre naissance, signe que vous étiez destiné à perpétuer l\'empire criminel familial.',
      worldview_shaped: 'La loyauté familiale avant tout.'
    },
    effects: {
      stats: { dexterity: 2, intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Contacts Obscurs',
          desc: 'Accès réseau criminel, +5 Investigation',
          game_effect: 'Info illicites'
        }
      ],
      reputation: [
        { factionId: 'guilde_voleurs', delta: 8, reason: 'Nom respecté pègre' }
      ],
      items: [
        { itemId: 'family_dagger', quantity: 1, reason: 'Arme de famille' }
      ],
      skills: [
        { skillId: 'stealth', bonus: 5, reason: 'Éviter les patrouilles' }
      ],
      languages: ['Commun', 'Cant des Voleurs'],
      gold: 750,
      tags: ['criminal', 'outlaw', 'loyal', 'dangerous', 'stealthy', 'underworld']
    },
    subCategory: 'Marginaux',
    social_impacts: {
      npc_reactions: {
        'gardes': 'Surveillance constante'
      },
      first_impression: '« Ton nom... ta famille est recherchée. »'
    },
    tags: ['criminal', 'outlaw', 'connections'],
    incompatible_with: ['birth_status_nobility']
  },
  {
    id: 'birth_status_paria',
    stage: 'birth',
    category: 'status',
    label: 'Paria Maudit',
    desc: 'Né sous une malédiction ancestrale.',
    detailed_lore: {
      backstory: 'Votre naissance fut marquée d\'un mauvais présage.',
      defining_moment: 'Le jour où les autres enfants ont fui votre ombre.',
      worldview_shaped: 'Le monde me rejette, je ne lui dois rien.'
    },
    effects: {
      stats: { wisdom: 4 },
      stats_penalty: { charisma: 4 },
      mechanical_traits: [
        {
          name: 'Esprit Endurci',
          desc: 'Immunité effets psychologiques, +8 Perception',
          game_effect: 'Résilience mentale'
        }
      ],
      reputation: [
        { factionId: 'tous', delta: -10, reason: 'Superstition' }
      ],
      items: [
        { itemId: 'cursed_fragment', quantity: 1, reason: 'Origine du malheur' }
      ],
      skills: [
        { skillId: 'survival', bonus: 5, reason: 'Vie marginale' }
      ],
      languages: ['Commun'],
      gold: 0,
      tags: ['pariah', 'cursed', 'rejected', 'isolated', 'mysterious', 'scorned']
    },
    subCategory: 'Marginaux',
    social_impacts: {
      npc_reactions: {
        'tous': 'Peur viscérale'
      },
      first_impression: '« Recule ! Il porte le malheur incarné ! »'
    },
    tags: ['outcast', 'cursed', 'isolated'],
    incompatible_with: ['birth_status_nobility']
  }
];
