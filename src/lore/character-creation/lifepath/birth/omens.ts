// ============================================================
// OMENS / PRÉSAGES À LA NAISSANCE - 25 OPTIONS
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
      backstory: 'Les anciens disent que les comètes annoncent la venue de héros ou de tyrans. Celle qui brilla lors de votre naissance était d\'un or lumineux, visible pendant trois nuits. Les devins murmurent que vous êtes destiné à de grandes choses.',
      defining_moment: 'À l\'âge de sept ans, un vieux sage vous a montré des manuscrits anciens : "Chaque comète porte le destin d\'un héros. La tienne ne revient que tous les mille ans."',
      worldview_shaped: 'Je suis marqué par les astres. Ma vie a un but que je ne comprends pas encore, mais que je dois découvrir.'
    },
    effects: {
      stats: { charisma: 1, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Destinée Stellaire',
          desc: '+2 Persuasion (leadership), PNJ sentent une "aura de grandeur"',
          game_effect: 'Charisme naturel'
        }
      ],
      reputation: [
        { factionId: 'sages_astrologues', delta: 5, reason: 'Né sous la comète' }
      ],
      items: [],
      skills: [
        { skillId: 'persuasion', bonus: 2, reason: 'Confiance innée dans sa destinée' }
      ],
      languages: [],
      tags: ['destined', 'heroic', 'celestial', 'prophesied']
    },
    social_impacts: {
      npc_reactions: {
        'sages': 'Fascination',
        'superstitieux': 'Crainte révérencielle',
        'sceptiques': 'Moquerie'
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
    desc: 'Le soleil s\'est voilé de rouge sang à votre venue, présage de destruction ou de changement radical.',
    detailed_lore: {
      backstory: 'Les éclipses rouges sont craintes depuis l\'aube des temps. Elles annoncent guerres, famines ou catastrophes. Les prêtres voulaient vous sacrifier, mais votre famille a fui. Vous portez ce stigmate invisible.',
      defining_moment: 'Un culte obscur vous a traqué pendant votre enfance, convaincu que vous étiez l\'instrument de leur dieu sombre.',
      worldview_shaped: 'Le monde me craint sans me connaître. Peut-être suis-je maudit, ou peut-être suis-je le changement dont ce monde a besoin.'
    },
    effects: {
      stats: { willpower: 2 },
      stats_penalty: { charisma: 1 },
      mechanical_traits: [
        {
          name: 'Aura Sinistre',
          desc: '+3 Intimidation, mais -2 Persuasion. Animaux nerveux autour de vous',
          game_effect: 'Présence inquiétante'
        }
      ],
      reputation: [
        { factionId: 'cultes_obscurs', delta: 6, reason: 'Élu potentiel' },
        { factionId: 'eglises', delta: -4, reason: 'Présage néfaste' }
      ],
      items: [],
      skills: [
        { skillId: 'intimidation', bonus: 3, reason: 'Aura naturellement effrayante' }
      ],
      languages: [],
      tags: ['ominous', 'feared', 'dark', 'cursed']
    },
    social_impacts: {
      npc_reactions: {
        'prêtres': 'Méfiance',
        'cultistes': 'Adoration',
        'villageois': 'Peur superstitieuse'
      },
      first_impression: '« Il y a quelque chose... de troublant en toi. Comme une ombre. »'
    },
    tags: ['ominous', 'feared', 'dark'],
    incompatible_with: ['birth_omen_comet']
  },

  {
    id: 'birth_omen_twin_death',
    stage: 'birth',
    category: 'omen',
    label: 'Jumeau Mort-Né',
    desc: 'Vous aviez un jumeau qui n\'a pas survécu à la naissance. Vous portez son souvenir comme une ombre.',
    detailed_lore: {
      backstory: 'Les sages-femmes racontent que vous avez pleuré pendant trois jours après la naissance, comme si vous sentiez l\'absence de votre frère/sœur. Certains disent que vous portez deux âmes en vous.',
      defining_moment: 'Enfant, vous parliez seul et juriez voir une silhouette translucide vous accompagnant.',
      worldview_shaped: 'Je vis pour deux. Chaque jour est un privilège que mon jumeau n\'a jamais eu.'
    },
    effects: {
      stats: { perception: 1, wisdom: 1 },
      mechanical_traits: [
        {
          name: 'Lien Spectral',
          desc: '+2 Perception (esprits), intuition face au danger',
          game_effect: 'Sixième sens'
        }
      ],
      reputation: [],
      items: [],
      skills: [
        { skillId: 'perception', bonus: 2, reason: 'Sensibilité au surnaturel' },
        { skillId: 'insight', bonus: 1, reason: 'Conscience de la mortalité' }
      ],
      languages: [],
      tags: ['spiritual', 'haunted', 'perceptive', 'melancholic']
    },
    social_impacts: {
      npc_reactions: {
        'médiums': 'Intérêt',
        'superstitieux': 'Malaise'
      },
      first_impression: '« Parfois, on dirait que tu regardes quelqu\'un que personne d\'autre ne voit. »'
    },
    tags: ['spiritual', 'haunted', 'perceptive'],
    incompatible_with: []
  },

  {
    id: 'birth_omen_storm',
    stage: 'birth',
    category: 'omen',
    label: 'Né dans la Tempête',
    desc: 'La pire tempête du siècle a frappé la nuit de votre naissance. Foudre et déluge déchaînés.',
    detailed_lore: {
      backstory: 'Les vieux racontent encore la nuit où le ciel s\'est déchiré. La foudre a frappé votre maison trois fois sans la brûler. Vous êtes né entre deux éclairs, et votre premier cri a sonné comme le tonnerre.',
      defining_moment: 'À douze ans, vous avez survécu à une seconde tempête apocalyptique qui a tué vingt personnes. Vous étiez debout sous la pluie, bras écartés, riant.',
      worldview_shaped: 'Le chaos est ma nature. Je ne crains ni vent ni foudre. Les éléments me reconnaissent.'
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
      languages: [],
      tags: ['elemental', 'chaotic', 'resilient', 'wild']
    },
    social_impacts: {
      npc_reactions: {
        'druides': 'Fascination',
        'marins': 'Respect superstitieux'
      },
      first_impression: '« Tu as l\'odeur de l\'orage sur toi. »'
    },
    tags: ['elemental', 'chaotic', 'resilient'],
    incompatible_with: []
  },

  // ... 21 autres omens à créer :
  // - 5 positifs : Fleur miraculeuse, Bénédiction divine, Animal protecteur, Source guérisseuse, Chant d'oiseau rare
  // - 5 négatifs : Corbeau noir, Lait caillé, Miroir brisé, Mort proche, Hurlement de loup
  // - 5 mystiques : Vision prophétique, Rêve lucide maternel, Marque runique, Plante morte/ressuscitée, Cristal vibrant
  // - 5 cosmiques : Alignement planétaire, Aurore boréale, Météorite, Constellation nouvelle, Lune double
  // - 1 neutre rare : Né au Nouvel An exact (minuit pile, 1er jour de l'an)

  // PLACEHOLDER pour développement futur - Ajout des 21 omens restants
  {
    id: 'birth_omen_white_raven',
    stage: 'birth',
    category: 'omen',
    label: 'Corbeau Blanc',
    desc: 'Un corbeau albinos s\'est posé sur le toit de votre maison et y est resté sept jours.',
    detailed_lore: {
      backstory: 'Les corbeaux blancs n\'existent pas dans la nature, disent les sages. Pourtant, toute votre famille témoigne de sa présence. Les druides y voient le signe d\'un lien avec le monde des esprits.',
      defining_moment: 'Le septième jour, le corbeau est entré dans votre chambre, s\'est posé près de votre berceau, et a disparu dans une plume de lumière.',
      worldview_shaped: 'Je marche entre deux mondes : celui des vivants et celui des esprits.'
    },
    effects: {
      stats: { wisdom: 1, perception: 1 },
      mechanical_traits: [
        {
          name: 'Messager des Esprits',
          desc: 'Communication limitée avec animaux, +2 Perception (êtres invisibles)',
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
        { skillId: 'animal_handling', bonus: 2, reason: 'Affinité naturelle' },
        { skillId: 'perception', bonus: 1, reason: 'Sens spirituels aiguisés' }
      ],
      languages: [],
      tags: ['spiritual', 'druidic', 'rare', 'blessed']
    },
    social_impacts: {
      npc_reactions: {
        'druides': 'Respect',
        'chasseurs': 'Curiosité',
        'citadins': 'Incompréhension'
      },
      first_impression: '« Les animaux te suivent du regard... Intéressant. »'
    },
    tags: ['spiritual', 'druidic', 'rare'],
    incompatible_with: []
  },

  {
    id: 'birth_omen_flower_bloom',
    stage: 'birth',
    category: 'omen',
    label: 'Floraison Hivernale',
    desc: 'Des fleurs ont éclos en plein hiver autour de la maison de votre naissance.',
    detailed_lore: {
      backstory: 'Au cœur de l\'hiver le plus glacé, un cercle de roses rouges a fleuri dans la neige autour de votre berceau. Les prêtres y ont vu un miracle divin.',
      defining_moment: 'Les fleurs ont survécu tout l\'hiver et ne sont mortes que le jour de votre premier anniversaire.',
      worldview_shaped: 'Je porte en moi la vie et la beauté. Même dans les ténèbres, l\'espoir peut fleurir.'
    },
    effects: {
      stats: { charisma: 1, wisdom: 1 },
      mechanical_traits: [
        {
          name: 'Bénédiction Florale',
          desc: '+2 Médecine (herboristerie), plantes poussent mieux près de vous',
          game_effect: 'Affinité nature/guérison'
        }
      ],
      reputation: [
        { factionId: 'eglises', delta: 3, reason: 'Miracle reconnu' },
        { factionId: 'alchimistes', delta: 2, reason: 'Curiosité scientifique' }
      ],
      items: [
        { itemId: 'dried_rose', quantity: 1, reason: 'Fleur de naissance préservée' }
      ],
      skills: [
        { skillId: 'medicine', bonus: 2, reason: 'Don naturel pour la guérison' },
        { skillId: 'nature', bonus: 1, reason: 'Affinité végétale' }
      ],
      languages: [],
      tags: ['blessed', 'healing', 'nature', 'hopeful']
    },
    social_impacts: {
      npc_reactions: {
        'guérisseurs': 'Admiration',
        'malades': 'Espoir',
        'sceptiques': 'Doute poli'
      },
      first_impression: '« Il émane de toi une aura apaisante, comme un jardin au printemps. »'
    },
    tags: ['blessed', 'healing', 'nature'],
    incompatible_with: ['birth_omen_eclipse']
  },

  // ... Continuer avec 19 omens supplémentaires

];

// NOTE DÉVELOPPEMENT FUTUR :
// Compléter avec 19 omens additionnels couvrant :
// - Omens divins : Statue pleure, Cloche sonne seule, Relique brille
// - Omens naturels : Arc-en-ciel nocturne, Arbre centenaire tombe, Rivière change de cours
// - Omens animaliers : Louve allaitrice, Aigle roi, Serpent à deux têtes
// - Omens célestes : Étoile filante qui ne tombe jamais, Soleil et Lune visibles simultanément
// - Omens mystérieux : Enfant ne pleure pas pendant 1 mois, Né avec yeux ouverts, Silence total 1 heure
