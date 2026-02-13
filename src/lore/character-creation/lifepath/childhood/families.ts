// ============================================================
// STRUCTURES FAMILIALES
// Type de famille et dynamique relationnelle
// ============================================================

import type { LifeChoice } from '../../../../types/lore';

export const FAMILIES: LifeChoice[] = [
  {
    id: 'childhood_family_nuclear_loving',
    stage: 'childhood',
    category: 'family',
    label: 'Famille Unie et Aimante',
    desc: 'Parents présents, fratrie solidaire.',
    detailed_lore: {
      backstory: 'Votre enfance fut rythmée par les rires partagés et le soutien inconditionnel.',
      defining_moment: 'Une maladie d\'enfance a soudé vos liens.',
      worldview_shaped: 'La famille est le roc sur lequel tout se construit.'
    },
    effects: {
      stats: { charisma: 1, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Liens Familiaux Forts',
          desc: '+2 Persuasion avec alliés',
          game_effect: 'Bonus social'
        }
      ],
      reputation: [],
      items: [
        { itemId: 'family_heirloom', quantity: 1, reason: 'Bijou transmis' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 2, reason: 'Empathie' }
      ],
      tags: ['stable', 'loved', 'supportive', 'emotional_strength']
    },
    subCategory: 'Familles Stables',
    social_impacts: {
      npc_reactions: {
        'familles': 'Reconnaissance'
      },
      first_impression: '« Tu as cet air serein. »'
    },
    tags: ['stable', 'loved', 'supportive'],
    incompatible_with: ['childhood_family_orphan', 'childhood_family_abusive']
  },
  {
    id: 'childhood_family_single_parent',
    stage: 'childhood',
    category: 'family',
    label: 'Parent Unique Dévoué',
    desc: 'Élevé par un seul parent qui a sacrifié tout pour vous.',
    detailed_lore: {
      backstory: 'Votre parent a porté seul le poids de votre éducation.',
      defining_moment: 'Un soir d\'épuisement de votre parent vous a marqué.',
      worldview_shaped: 'Le sacrifice pour ceux qu\'on aime est noble.'
    },
    effects: {
      stats: { constitution: 1, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Résilience Forgée',
          desc: '+1 tous jets quand PV < 50%',
          game_effect: 'Endurance mentale'
        }
      ],
      reputation: [],
      items: [
        { itemId: 'parents_tool', quantity: 1, reason: 'Outil hérité' }
      ],
      skills: [
        { skillId: 'insight', bonus: 2, reason: 'Lecture des non-dits' }
      ],
      tags: ['resilient', 'devoted', 'hardworking', 'mature']
    },
    subCategory: 'Familles Stables',
    social_impacts: {
      npc_reactions: {
        'travailleurs': 'Respect'
      },
      first_impression: '« Tu as l\'air d\'avoir grandi vite. »'
    },
    tags: ['resilient', 'devoted', 'hardworking'],
    incompatible_with: ['childhood_family_orphan']
  },
  {
    id: 'childhood_family_noble_dynasty',
    stage: 'childhood',
    category: 'family',
    label: 'Dynastie Noble Exigeante',
    desc: 'Famille aristocratique où le devoir prime sur l\'affection.',
    detailed_lore: {
      backstory: 'Vous êtes héritier d\'une lignée prestigieuse sous haute pression.',
      defining_moment: 'Une victoire en tournoi ne vous a valu qu\'un hochement de tête.',
      worldview_shaped: 'Les émotions sont des faiblesses.'
    },
    effects: {
      stats: { intelligence: 1, charisma: 1 },
      stats_penalty: { wisdom: 1 },
      mechanical_traits: [
        {
          name: 'Sang Froid Aristocratique',
          desc: '+3 Persuasion avec nobles',
          game_effect: 'Maîtrise sociale froide'
        }
      ],
      reputation: [
        { factionId: 'noblesse', delta: 5, reason: 'Héritier' }
      ],
      items: [
        { itemId: 'signet_ring', quantity: 1, reason: 'Sceau familial' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 3, reason: 'Rhétorique' }
      ],
      languages: ['Langue Noble'],
      tags: ['noble', 'disciplined', 'cold', 'prestigious']
    },
    subCategory: 'Haut Rang',
    social_impacts: {
      npc_reactions: {
        'nobles': 'Respect'
      },
      first_impression: '« Votre maintien trahit votre éducation. »'
    },
    tags: ['noble', 'disciplined', 'cold'],
    incompatible_with: ['childhood_family_orphan', 'childhood_family_criminal']
  },
  {
    id: 'childhood_family_merchant_caravan',
    stage: 'childhood',
    category: 'family',
    label: 'Famille Marchande Itinérante',
    desc: 'Élevé sur les routes commerciales.',
    detailed_lore: {
      backstory: 'Votre famille ne s\'est jamais fixée.',
      defining_moment: 'À dix ans, vous avez négocié votre libération face à des bandits.',
      worldview_shaped: 'Le monde est un marché.'
    },
    effects: {
      stats: { charisma: 1, intelligence: 1 },
      mechanical_traits: [
        {
          name: 'Nomade Né',
          desc: '+2 Survie (route)',
          game_effect: 'Adaptabilité culturelle'
        }
      ],
      reputation: [
        { factionId: 'guildes_marchandes', delta: 3, reason: 'Famille connue' }
      ],
      items: [
        { itemId: 'trade_map', quantity: 1, reason: 'Carnet de routes' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 2, reason: 'Marchandage' }
      ],
      languages: ['2 langues étrangères'],
      tags: ['nomadic', 'adaptable', 'mercantile', 'worldly']
    },
    subCategory: 'Voyageurs',
    social_impacts: {
      npc_reactions: {
        'voyageurs': 'Camaraderie'
      },
      first_impression: '« Tu as l\'accent de partout. »'
    },
    tags: ['nomadic', 'adaptable', 'mercantile'],
    incompatible_with: []
  },
  {
    id: 'childhood_family_criminal_gang',
    stage: 'childhood',
    category: 'family',
    label: 'Clan Criminel Soudé',
    desc: 'Famille de voleurs ou contrebandiers.',
    detailed_lore: {
      backstory: 'Votre famille opère dans l\'ombre depuis trois générations.',
      defining_moment: 'À onze ans, vous avez fait votre premier travail réussi.',
      worldview_shaped: 'La famille avant tout.'
    },
    effects: {
      stats: { dexterity: 2 },
      stats_penalty: { charisma: 1 },
      mechanical_traits: [
        {
          name: 'Enfant des Ombres',
          desc: '+3 Discrétion, contacts criminels',
          game_effect: 'Maîtrise vol'
        }
      ],
      reputation: [
        { factionId: 'guilde_voleurs', delta: 5, reason: 'Famille célèbre' }
      ],
      items: [
        { itemId: 'lockpicks', quantity: 1, reason: 'Initiation' }
      ],
      skills: [
        { skillId: 'stealth', bonus: 3, reason: 'Entraînement' }
      ],
      languages: ['Cant des Voleurs'],
      tags: ['criminal', 'stealthy', 'loyal', 'outlaw']
    },
    subCategory: 'Marginaux',
    social_impacts: {
      npc_reactions: {
        'voleurs': 'Respect'
      },
      first_impression: '« Celui-là a les mains trop agiles. »'
    },
    tags: ['criminal', 'stealthy', 'loyal'],
    incompatible_with: ['childhood_family_noble_dynasty']
  },
  {
    id: 'childhood_family_orphan',
    stage: 'childhood',
    category: 'family',
    label: 'Orphelin',
    desc: 'Pas de famille. Élevé dans la rue ou en orphelinat.',
    detailed_lore: {
      backstory: 'Vous n\'avez jamais connu la chaleur d\'un foyer.',
      defining_moment: 'Vous avez compris que personne ne viendrait vous sauver.',
      worldview_shaped: 'Je suis seul. La faiblesse tue.'
    },
    effects: {
      stats: { willpower: 2, dexterity: 1 },
      stats_penalty: { charisma: 2 },
      mechanical_traits: [
        {
          name: 'Indépendance Forcée',
          desc: '+3 Survie seul',
          game_effect: 'Solitaire compétent'
        }
      ],
      reputation: [],
      items: [],
      skills: [
        { skillId: 'survival', bonus: 3, reason: 'Survie' }
      ],
      tags: ['orphan', 'isolated', 'survivor', 'distrustful']
    },
    subCategory: 'Marginaux',
    social_impacts: {
      npc_reactions: {
        'autres_orphelins': 'Solidarité'
      },
      first_impression: '« Tu as ce regard de ceux qui sont seuls. »'
    },
    tags: ['orphan', 'isolated', 'survivor'],
    incompatible_with: ['childhood_family_nuclear_loving', 'childhood_family_noble_dynasty']
  }
];
