// ============================================================
// OMENS / PRÉSAGES À LA NAISSANCE
// Événements surnaturels ou signes marquant la venue au monde
// ============================================================

import type { LifeChoice } from '../../../../types/lore';

export const OMENS: LifeChoice[] = [
  {
    id: 'birth_omen_comet',
    stage: 'birth',
    category: 'omen',
    label: 'Comète Dorée',
    desc: 'Une comète brillante traversa le ciel la nuit de votre naissance, présage de grandeur.',
    detailed_lore: {
      backstory: 'Les anciens disent que les comètes annoncent la venue de héros ou de tyrans. Celle qui brilla lors de votre naissance était d\'un or lumineux, visible pendant trois nuits.',
      defining_moment: 'Les sages-femmes racontent que vous êtes né exactement au zénith de la comète, enveloppé de lumière dorée.',
      worldview_shaped: 'Je suis marqué par les astres. Ma vie a un but.'
    },
    effects: {
      stats: { charisma: 1, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Destinée Stellaire',
          desc: '+2 Persuasion (leadership)',
          game_effect: 'Charisme naturel'
        }
      ],
      reputation: [
        { factionId: 'sages_astrologues', delta: 5, reason: 'Né sous la comète' }
      ],
      items: [],
      skills: [
        { skillId: 'persuasion', bonus: 2, reason: 'Confiance innée' }
      ],
      tags: ['omen', 'comet', 'luck', 'divine', 'destiny', 'celestial']
    },
    subCategory: 'Présages Cométaires',
    social_impacts: {
      npc_reactions: {
        'sages': 'Fascination'
      },
      first_impression: '« Cette aura... On dirait que tu as été touché par quelque chose de plus grand. »'
    },
    tags: ['destined', 'heroic', 'celestial'],
    incompatible_with: ['birth_omen_eclipse']
  },
  {
    id: 'birth_omen_eclipse',
    stage: 'birth',
    category: 'omen',
    label: 'Éclipse Sanglante',
    desc: 'Le soleil s\'est voilé de rouge sang à votre venue.',
    detailed_lore: {
      backstory: 'Les éclipses rouges sont craintes depuis l\'aube des temps. Les prêtres voulaient vous sacrifier.',
      defining_moment: 'Un culte obscur vous a traqué pendant votre enfance.',
      worldview_shaped: 'Le monde me craint sans me connaître.'
    },
    effects: {
      stats: { willpower: 2 },
      stats_penalty: { charisma: 1 },
      mechanical_traits: [
        {
          name: 'Aura Sinistre',
          desc: '+3 Intimidation, mais -2 Persuasion',
          game_effect: 'Présence inquiétante'
        }
      ],
      reputation: [
        { factionId: 'cultes_obscurs', delta: 6, reason: 'Élu potentiel' }
      ],
      items: [],
      skills: [
        { skillId: 'intimidation', bonus: 3, reason: 'Aura effrayante' }
      ],
      tags: ['omen', 'eclipse', 'darkness', 'mystery', 'magic', 'mystical']
    },
    subCategory: 'Présages Célestes',
    social_impacts: {
      npc_reactions: {
        'prêtres': 'Méfiance'
      },
      first_impression: '« Il y a quelque chose de troublant en toi. »'
    },
    tags: ['ominous', 'feared', 'dark'],
    incompatible_with: ['birth_omen_comet']
  },
  {
    id: 'birth_omen_storm',
    stage: 'birth',
    category: 'omen',
    label: 'Né dans la Tempête',
    desc: 'La pire tempête du siècle a frappé la nuit de votre naissance.',
    detailed_lore: {
      backstory: 'La pire tempête du siècle a frappé la nuit de votre naissance. Les vieux racontent encore comment le ciel s\'est déchiré, comme si les dieux annonçaient votre venue.',
      defining_moment: 'Votre mère a accouché sous les éclairs. La foudre a frappé le toit à l\'instant exact où vous poussiez votre premier cri.',
      worldview_shaped: 'Le chaos est ma nature.'
    },
    effects: {
      stats: { constitution: 1, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Touché par la Foudre',
          desc: 'Résistance électricité (5), +2 Survie (tempêtes)',
          game_effect: 'Affinité élémentaire'
        }
      ],
      reputation: [],
      items: [],
      skills: [
        { skillId: 'survival', bonus: 2, reason: 'Affinité conditions extrêmes' }
      ],
      tags: ['omen', 'storm', 'power', 'chaos', 'strength', 'elemental']
    },
    subCategory: 'Présages Célestes',
    social_impacts: {
      npc_reactions: {
        'marins': 'Respect superstitieux'
      },
      first_impression: '« Tu as l\'odeur de l\'orage sur toi. »'
    },
    tags: ['elemental', 'chaotic', 'resilient'],
    incompatible_with: []
  },
  {
    id: 'birth_omen_flower_bloom',
    stage: 'birth',
    category: 'omen',
    label: 'Floraison Hivernale',
    desc: 'Des fleurs ont éclos en plein hiver autour de la maison de votre naissance.',
    detailed_lore: {
      backstory: 'Un cercle de roses rouges a fleuri dans la neige autour du lieu de votre naissance, défiant les lois de la nature.',
      defining_moment: 'Les sages-femmes ont trouvé les fleurs intactes, leurs pétales réchauffant l\'air glacial comme un printemps miraculeusement né.',
      worldview_shaped: 'Même dans les ténèbres, l\'espoir peut fleurir.'
    },
    effects: {
      stats: { charisma: 1, wisdom: 1 },
      mechanical_traits: [
        {
          name: 'Bénédiction Florale',
          desc: '+2 Médecine (herboristerie)',
          game_effect: 'Affinité nature/guérison'
        }
      ],
      reputation: [
        { factionId: 'eglises', delta: 3, reason: 'Miracle reconnu' }
      ],
      items: [
        { itemId: 'dried_rose', quantity: 1, reason: 'Fleur de naissance' }
      ],
      skills: [
        { skillId: 'medicine', bonus: 2, reason: 'Don naturel' }
      ],
      tags: ['omen', 'nature', 'life', 'blessing', 'beauty', 'peace']
    },
    subCategory: 'Présages Terrestres',
    social_impacts: {
      npc_reactions: {
        'guérisseurs': 'Admiration'
      },
      first_impression: '« Il émane de toi une aura apaisante. »'
    },
    tags: ['blessed', 'healing', 'nature'],
    incompatible_with: ['birth_omen_eclipse']
  },
  {
    id: 'birth_omen_white_raven',
    stage: 'birth',
    category: 'omen',
    label: 'Corbeau Blanc',
    desc: 'Un corbeau albinos s\'est posé sur le toit de votre maison.',
    detailed_lore: {
      backstory: 'Un corbeau blanc comme neige – signe rarissime du monde des esprits – s\'est posé sur le toit à l\'instant de votre premier cri.',
      defining_moment: 'Selon les témoins, le corbeau a observé longuement le nouveau-né avant de disparaître dans une plume de lumière.',
      worldview_shaped: 'Je marche entre deux mondes.'
    },
    effects: {
      stats: { wisdom: 1, perception: 1 },
      mechanical_traits: [
        {
          name: 'Messager des Esprits',
          desc: 'Communication limitée avec animaux',
          game_effect: 'Capacité druidique mineure'
        }
      ],
      reputation: [
        { factionId: 'cercle_druides', delta: 4, reason: 'Marqué par la nature' }
      ],
      items: [
        { itemId: 'white_feather', quantity: 1, reason: 'Plume du corbeau' }
      ],
      skills: [
        { skillId: 'animal_handling', bonus: 2, reason: 'Affinité naturelle' }
      ],
      tags: ['omen', 'spirit', 'death', 'prophecy', 'warning', 'spiritual']
    },
    subCategory: 'Présages Sombres',
    social_impacts: {
      npc_reactions: {
        'druides': 'Respect'
      },
      first_impression: '« Les animaux te suivent du regard... »'
    },
    tags: ['spiritual', 'druidic', 'rare'],
    incompatible_with: []
  },
  {
    id: 'birth_omen_twin_death',
    stage: 'birth',
    category: 'omen',
    label: 'Jumeau Mort-Né',
    desc: 'Vous aviez un jumeau qui n\'a pas survécu à la naissance.',
    detailed_lore: {
      backstory: 'Vous aviez un jumeau qui n\'a pas survécu à la naissance. Les sages-femmes racontent que vous avez pleuré comme si vous sentiez déjà l\'absence.',
      defining_moment: 'Votre main cherchait instinctivement celle de votre jumeau disparu. Un lien invisible semblait persister au-delà de la mort.',
      worldview_shaped: 'Je vis pour deux.'
    },
    effects: {
      stats: { perception: 1, wisdom: 1 },
      mechanical_traits: [
        {
          name: 'Lien Spectral',
          desc: '+2 Perception (esprits)',
          game_effect: 'Sixième sens'
        }
      ],
      reputation: [],
      items: [],
      skills: [
        { skillId: 'perception', bonus: 2, reason: 'Sensibilité au surnaturel' }
      ],
      tags: ['omen', 'death', 'tragedy', 'resilience', 'survival', 'grim']
    },
    subCategory: 'Présages Sombres',
    social_impacts: {
      npc_reactions: {
        'médiums': 'Intérêt'
      },
      first_impression: '« Parfois, on dirait que tu regardes quelqu\'un d\'autre. »'
    },
    tags: ['spiritual', 'haunted', 'perceptive'],
    incompatible_with: []
  }
];
