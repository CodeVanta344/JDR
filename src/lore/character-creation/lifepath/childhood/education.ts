// ============================================================
// ÉDUCATIONS - 20 OPTIONS
// Formation intellectuelle et compétences acquises
// ============================================================

import type { LifeChoice } from '../../../../types/lore';

export const EDUCATIONS: LifeChoice[] = [
  {
    id: 'childhood_edu_formal_academy',
    stage: 'childhood',
    category: 'education',
    label: 'Académie Prestigieuse',
    desc: 'Éducation formelle dans une institution renommée. Maîtres exigeants, curriculum rigoureux.',
    detailed_lore: {
      backstory: 'Vous avez fréquenté l\'une des grandes académies d\'Aethelgard. Philosophie, mathématiques, histoire, rhétorique... Vos journées étaient rythmées par les cours magistraux et les examens impitoyables.',
      defining_moment: 'Vous avez remporté le Tournoi Dialectique annuel en réfutant brillamment les arguments du champion en titre.',
      worldview_shaped: 'La connaissance est pouvoir. La raison triomphe de l\'ignorance. L\'éducation distingue les civilisés des barbares.'
    },
    effects: {
      stats: { intelligence: 2, wisdom: 1 },
      mechanical_traits: [
        {
          name: 'Esprit Érudit',
          desc: '+2 tous jets Connaissance, apprentissage sorts 25% plus rapide',
          game_effect: 'Bonus académique universel'
        }
      ],
      reputation: [
        { factionId: 'academies', delta: 5, reason: 'Ancien élève distingué' }
      ],
      items: [
        { itemId: 'academic_robes', quantity: 1, reason: 'Tenue cérémoniale' },
        { itemId: 'diploma', quantity: 1, reason: 'Parchemin diplôme' }
      ],
      skills: [
        { skillId: 'arcana', bonus: 2, reason: 'Cours théoriques magie' },
        { skillId: 'history', bonus: 2, reason: 'Curriculum obligatoire' },
        { skillId: 'persuasion', bonus: 1, reason: 'Débats académiques' }
      ],
      languages: ['Langue Ancienne', 'Latin Érudit'],
      tags: ['educated', 'intellectual', 'prestigious', 'theoretical']
    },
    social_impacts: {
      npc_reactions: {
        'érudits': 'Respect immédiat',
        'illettrés': 'Intimidation',
        'pragmatiques': 'Moquerie ("théoricien")'
      },
      first_impression: '« Académie royale ? Impressionnant. Vous devez connaître des choses que j\'ignore. »'
    },
    tags: ['educated', 'intellectual', 'prestigious'],
    incompatible_with: ['childhood_edu_street', 'childhood_edu_illiterate']
  },

  {
    id: 'childhood_edu_apprentice_master',
    stage: 'childhood',
    category: 'education',
    label: 'Apprentissage chez un Maître',
    desc: 'Formation pratique intensive auprès d\'un artisan/mage/guerrier légendaire.',
    detailed_lore: {
      backstory: 'Un maître renommé vous a pris sous son aile. Pendant sept ans, vous avez appris son art : chaque geste, chaque secret, chaque technique. L\'apprentissage était brutal mais transformateur.',
      defining_moment: 'Le jour où votre maître vous a dit : "Tu n\'as plus rien à apprendre de moi. Va créer ton propre chemin."',
      worldview_shaped: 'La pratique vaut mille théories. Un maître véritable transmet son âme, pas juste sa technique.'
    },
    effects: {
      stats: { dexterity: 1, wisdom: 1 },
      mechanical_traits: [
        {
          name: 'Héritage du Maître',
          desc: '+3 à une compétence au choix (craft/combat/magie), outils de maître offerts',
          game_effect: 'Spécialisation profonde'
        }
      ],
      reputation: [
        { factionId: 'guilde_concernee', delta: 4, reason: 'Élève de [Nom Maître]' }
      ],
      items: [
        { itemId: 'masters_tool', quantity: 1, reason: 'Cadeau d\'adieu du maître' },
        { itemId: 'technique_manual', quantity: 1, reason: 'Notes manuscrites' }
      ],
      skills: [
        { skillId: 'chosen_skill', bonus: 3, reason: 'Apprentissage intensif 7 ans' }
      ],
      languages: [],
      tags: ['apprentice', 'skilled', 'dedicated', 'practical']
    },
    social_impacts: {
      npc_reactions: {
        'pairs': 'Respect ou jalousie',
        'maîtres': 'Intérêt',
        'amateurs': 'Admiration'
      },
      first_impression: '« Tes gestes trahissent un enseignement de qualité. Qui fut ton maître ? »'
    },
    tags: ['apprentice', 'skilled', 'dedicated'],
    incompatible_with: []
  },

  {
    id: 'childhood_edu_street_survivor',
    stage: 'childhood',
    category: 'education',
    label: 'École de la Rue',
    desc: 'Aucune éducation formelle. Tout appris en survivant dans les bas-fonds urbains.',
    detailed_lore: {
      backstory: 'Les rues furent vos salles de classe. Vous avez appris à lire les intentions dans les regards, à compter en volant des pièces, à négocier avec les gangs. Chaque erreur se payait en sang.',
      defining_moment: 'À neuf ans, vous avez déjoué un piège tendu par une bande rivale. Le chef vous a dit : "T\'es malin, gamin. Reste avec nous ou crève seul."',
      worldview_shaped: 'Les livres n\'enseignent pas la survie. La rue forge les plus futés ou enterre les faibles.'
    },
    effects: {
      stats: { dexterity: 2, perception: 1 },
      stats_penalty: { intelligence: 1 },
      mechanical_traits: [
        {
          name: 'Instinct des Rues',
          desc: '+3 Discrétion/Intuition en milieu urbain, détection pièges/embuscades',
          game_effect: 'Survie urbaine experte'
        }
      ],
      reputation: [
        { factionId: 'bas_fonds', delta: 4, reason: 'Reconnu comme vétéran des rues' }
      ],
      items: [
        { itemId: 'street_knife', quantity: 1, reason: 'Arme improvisée fidèle' }
      ],
      skills: [
        { skillId: 'stealth', bonus: 3, reason: 'Éviter patrouilles depuis enfance' },
        { skillId: 'sleight_of_hand', bonus: 2, reason: 'Pickpocket nécessaire' },
        { skillId: 'insight', bonus: 2, reason: 'Lire intentions pour survivre' }
      ],
      languages: ['Argot des Rues'],
      tags: ['street', 'survivor', 'pragmatic', 'illiterate']
    },
    social_impacts: {
      npc_reactions: {
        'gardes': 'Suspicion',
        'criminels': 'Respect',
        'érudits': 'Condescendance',
        'autres_survivants': 'Fraternité'
      },
      first_impression: '« T\'as l\'œil de ceux qui ont grandi dur. Les rues, c\'est ça ? »'
    },
    tags: ['street', 'survivor', 'pragmatic'],
    incompatible_with: ['childhood_edu_formal_academy', 'childhood_edu_noble_tutor']
  },

  {
    id: 'childhood_edu_temple_monastery',
    stage: 'childhood',
    category: 'education',
    label: 'Temple/Monastère',
    desc: 'Élevé par des moines ou prêtres. Éducation spirituelle, méditation, discipline ascétique.',
    detailed_lore: {
      backstory: 'Dès cinq ans, vous avez intégré un monastère isolé. Prières à l\'aube, méditation, entraînement martial, étude des textes sacrés. Le silence et la discipline rythmaient vos journées.',
      defining_moment: 'Après trois mois de méditation solitaire dans une grotte, vous avez atteint l\'illumination temporaire. Le monde vous a semblé transparent.',
      worldview_shaped: 'Le corps et l\'esprit sont un. La discipline intérieure triomphe du chaos extérieur.'
    },
    effects: {
      stats: { wisdom: 2, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Discipline Monastique',
          desc: '+1 CA sans armure, +2 Concentration, méditation récupère 2× PV',
          game_effect: 'Capacités de moine'
        }
      ],
      reputation: [
        { factionId: 'ordres_monastiques', delta: 6, reason: 'Novice formé' },
        { factionId: 'eglises', delta: 3, reason: 'Éducation religieuse' }
      ],
      items: [
        { itemId: 'prayer_beads', quantity: 1, reason: 'Chapelet consacré' },
        { itemId: 'meditation_mat', quantity: 1, reason: 'Tapis de prière' }
      ],
      skills: [
        { skillId: 'religion', bonus: 2, reason: 'Études théologiques' },
        { skillId: 'insight', bonus: 2, reason: 'Contemplation spirituelle' },
        { skillId: 'athletics', bonus: 1, reason: 'Entraînement martial' }
      ],
      languages: ['Langue Sacrée'],
      tags: ['spiritual', 'disciplined', 'ascetic', 'contemplative']
    },
    social_impacts: {
      npc_reactions: {
        'religieux': 'Respect fraternel',
        'athées': 'Curiosité',
        'hédonistes': 'Incompréhension',
        'sages': 'Admiration'
      },
      first_impression: '« Votre sérénité est... troublante. Monastère ? »'
    },
    tags: ['spiritual', 'disciplined', 'ascetic'],
    incompatible_with: []
  },

  {
    id: 'childhood_edu_military_training',
    stage: 'childhood',
    category: 'education',
    label: 'École Militaire',
    desc: 'Formation martiale précoce dans une académie de guerre ou camp d\'entraînement.',
    detailed_lore: {
      backstory: 'Dès huit ans, vous avez rejoint une académie militaire. Réveil à l\'aube, entraînement au combat, tactiques, discipline de fer. Vos instructeurs étaient des vétérans impitoyables.',
      defining_moment: 'Lors d\'un exercice, votre unité s\'est retrouvée encerclée. Vous avez pris le commandement et mené une retraite ordonnée. Le général vous a salué.',
      worldview_shaped: 'La discipline sauve des vies. Un soldat obéit, un officier inspire. L\'honneur est tout.'
    },
    effects: {
      stats: { strength: 1, constitution: 1, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Cadre Militaire',
          desc: '+2 Initiative, +1 attaque quand allié à 3m, commandement tactique',
          game_effect: 'Bonus combat de groupe'
        }
      ],
      reputation: [
        { factionId: 'armee', delta: 5, reason: 'Ancien cadet' }
      ],
      items: [
        { itemId: 'training_sword', quantity: 1, reason: 'Arme d\'entraînement' },
        { itemId: 'military_insignia', quantity: 1, reason: 'Insigne de promotion' }
      ],
      skills: [
        { skillId: 'athletics', bonus: 2, reason: 'Entraînement physique intensif' },
        { skillId: 'intimidation', bonus: 1, reason: 'Voix de commandement' },
        { skillId: 'tactics', bonus: 2, reason: 'Études stratégiques' }
      ],
      languages: ['Code militaire'],
      tags: ['military', 'disciplined', 'tactical', 'martial']
    },
    social_impacts: {
      npc_reactions: {
        'soldats': 'Respect immédiat',
        'civils': 'Crainte ou admiration',
        'pacifistes': 'Méfiance',
        'officiers': 'Évaluation'
      },
      first_impression: '« Votre posture... École militaire ? »'
    },
    tags: ['military', 'disciplined', 'tactical'],
    incompatible_with: []
  },

  // ... 15 autres éducations à ajouter :
  // - Tutorat noble privé
  // - Bibliothèque autodidacte
  // - Formation druide (nature)
  // - Troupe théâtrale itinérante
  // - Guilde artisanale
  // - Chasse/survie forestière
  // - Navigation maritime
  // - Alchimie/sciences
  // - Espionnage/assassinat
  // - Ménestrel/barde
  // - Médecine/herboriste
  // - Aucune éducation (illettrisme total)
  // - Éducation magique précoce
  // - Courtisanerie/diplomatie
  // - Architecture/ingénierie

  {
    id: 'childhood_edu_illiterate',
    stage: 'childhood',
    category: 'education',
    label: 'Aucune Éducation (Illettré)',
    desc: 'Jamais appris à lire ni écrire. Éducation purement orale et pratique.',
    detailed_lore: {
      backstory: 'Vous avez grandi sans accès à l\'éducation. Pas d\'école, pas de livres, personne pour enseigner. Vous savez compter jusqu\'à cent, mais les lettres restent des gribouillis mystérieux.',
      defining_moment: 'Vous avez signé un contrat d\'une croix, incapable de le lire. Vous avez juré ce jour-là d\'apprendre, un jour.',
      worldview_shaped: 'Les livres sont pour les riches. Moi, j\'ai mes mains et mon instinct.'
    },
    effects: {
      stats: { strength: 1, constitution: 1 },
      stats_penalty: { intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Instinct Primaire',
          desc: '+2 Perception (danger), -5 tous jets nécessitant lecture/écriture',
          game_effect: 'Illettré mais instinctif'
        }
      ],
      reputation: [],
      items: [],
      skills: [
        { skillId: 'survival', bonus: 2, reason: 'Apprentissage pratique' },
        { skillId: 'animal_handling', bonus: 1, reason: 'Communication non-verbale' }
      ],
      languages: [],
      tags: ['illiterate', 'practical', 'instinctive', 'disadvantaged']
    },
    social_impacts: {
      npc_reactions: {
        'érudits': 'Pitié condescendante',
        'autres_illettrés': 'Solidarité',
        'employeurs': 'Méfiance (contrats)'
      },
      first_impression: '« Tu sais lire ? ... Ah. Bon, ce n\'est pas grave. »'
    },
    tags: ['illiterate', 'practical', 'instinctive'],
    incompatible_with: ['childhood_edu_formal_academy', 'childhood_edu_noble_tutor']
  }
];
