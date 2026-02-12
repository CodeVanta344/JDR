// ============================================================
// TRAUMAS & BÉNÉDICTIONS - 25 OPTIONS
// Événements marquants de l'enfance (positifs ou négatifs)
// ============================================================

import type { LifeChoice } from '../../../../types/lore';

export const TRAUMAS: LifeChoice[] = [
  // ===== TRAUMAS NÉGATIFS (12) =====
  {
    id: 'childhood_trauma_death_witnessed',
    stage: 'childhood',
    category: 'trauma',
    label: 'Témoin de Mort Violente',
    desc: 'Vous avez vu quelqu\'un mourir de manière brutale. Cette image vous hante encore.',
    detailed_lore: {
      backstory: 'À sept ans, vous avez assisté au meurtre d\'un proche (parent, ami, étranger). Le sang, les cris, l\'odeur... Tout est gravé dans votre mémoire. Les cauchemars ont duré des années.',
      defining_moment: 'Des années plus tard, vous avez retrouvé l\'assassin. Vous avez dû choisir entre vengeance et justice.',
      worldview_shaped: 'La vie est fragile. La mort est toujours proche. Je dois être fort pour protéger ceux que j\'aime.'
    },
    effects: {
      stats: { willpower: 2 },
      stats_penalty: { charisma: 1 },
      mechanical_traits: [
        {
          name: 'Hanté par la Mort',
          desc: '+3 Volonté contre terreur, -2 jets sociaux (regard hanté)',
          game_effect: 'Résistance trauma mais isolement social'
        }
      ],
      reputation: [],
      items: [],
      skills: [
        { skillId: 'intimidation', bonus: 2, reason: 'Regard qui a vu la mort' },
        { skillId: 'perception', bonus: 1, reason: 'Hyper-vigilance développée' }
      ],
      languages: [],
      tags: ['traumatized', 'haunted', 'vigilant', 'scarred']
    },
    social_impacts: {
      npc_reactions: {
        'empathiques': 'Compassion',
        'insensibles': 'Faiblesse perçue',
        'autres_traumatisés': 'Reconnaissance mutuelle'
      },
      first_impression: '« Tes yeux... Tu as vu des choses qu\'un enfant ne devrait jamais voir. »'
    },
    tags: ['traumatized', 'haunted', 'vigilant'],
    incompatible_with: []
  },

  {
    id: 'childhood_trauma_betrayal',
    stage: 'childhood',
    category: 'trauma',
    label: 'Trahison d\'un Proche',
    desc: 'Quelqu\'un en qui vous aviez une confiance absolue vous a trahi de manière dévastatrice.',
    detailed_lore: {
      backstory: 'Votre meilleur ami, mentor ou membre de la famille vous a vendu, abandonné ou menti cruellement. La douleur ne fut pas physique, mais émotionnelle. Vous avez appris que la confiance est dangereuse.',
      defining_moment: 'Le jour où vous avez découvert la vérité, quelque chose en vous s\'est brisé. Depuis, vous gardez vos distances.',
      worldview_shaped: 'Ne fais confiance à personne. Les gens te décevront toujours. Compter sur soi seul.'
    },
    effects: {
      stats: { perception: 2, willpower: 1 },
      stats_penalty: { charisma: 2 },
      mechanical_traits: [
        {
          name: 'Méfiance Pathologique',
          desc: '+3 Intuition (détecter mensonges), -3 jets Confiance envers autrui',
          game_effect: 'Paranoïa protectrice'
        }
      ],
      reputation: [],
      items: [],
      skills: [
        { skillId: 'insight', bonus: 3, reason: 'Scrute chaque intention' },
        { skillId: 'deception', bonus: 1, reason: 'Cache ses émotions' }
      ],
      languages: [],
      tags: ['distrustful', 'paranoid', 'isolated', 'hurt']
    },
    social_impacts: {
      npc_reactions: {
        'tous': 'Difficulté à nouer liens',
        'autres_trahis': 'Compréhension rare',
        'loyaux': 'Frustration face à méfiance'
      },
      first_impression: '« Tu sembles toujours chercher le piège caché. »'
    },
    tags: ['distrustful', 'paranoid', 'isolated'],
    incompatible_with: ['childhood_blessing_loyal_friend']
  },

  {
    id: 'childhood_trauma_fire',
    stage: 'childhood',
    category: 'trauma',
    label: 'Incendie Traumatisant',
    desc: 'Votre maison/village a brûlé. Vous portez des cicatrices physiques ou émotionnelles.',
    detailed_lore: {
      backstory: 'Les flammes ont dévoré votre foyer. Peut-être étiez-vous pris au piège, peut-être avez-vous vu d\'autres périr. Le feu vous terrorise depuis, mais vous fascine aussi.',
      defining_moment: 'Des années après, vous vous êtes retrouvé face à un brasier. Vous avez dû choisir : fuir ou sauver quelqu\'un à l\'intérieur.',
      worldview_shaped: 'Le feu détruit tout. Mais de la destruction naît la renaissance.'
    },
    effects: {
      stats: { constitution: 1, willpower: 1 },
      stats_penalty: {},
      mechanical_traits: [
        {
          name: 'Marqué par les Flammes',
          desc: 'Résistance feu (5), mais désavantage jets Volonté face au feu (phobie)',
          game_effect: 'Dualité feu : résistance physique, faiblesse mentale'
        }
      ],
      reputation: [],
      items: [
        { itemId: 'burn_scar_salve', quantity: 1, reason: 'Onguent cicatrisant' }
      ],
      skills: [
        { skillId: 'survival', bonus: 1, reason: 'Précautions extrêmes feu' }
      ],
      languages: [],
      tags: ['scarred', 'phobic', 'survivor', 'marked']
    },
    social_impacts: {
      npc_reactions: {
        'pyromages': 'Malaise mutuel',
        'autres_survivants': 'Empathie',
        'curieux': 'Questions indiscrètes'
      },
      first_impression: '« Ces cicatrices... Incendie ? Je suis désolé. »'
    },
    tags: ['scarred', 'phobic', 'survivor'],
    incompatible_with: []
  },

  // ===== BÉNÉDICTIONS POSITIVES (13) =====
  {
    id: 'childhood_blessing_mentor',
    stage: 'childhood',
    category: 'trauma',
    label: 'Mentor Inspirant',
    desc: 'Une figure exceptionnelle a cru en vous et guidé votre développement.',
    detailed_lore: {
      backstory: 'Un héros local, sage ou artisan légendaire a vu votre potentiel et pris le temps de vous enseigner. Ses leçons ont façonné qui vous êtes aujourd\'hui.',
      defining_moment: 'Avant de mourir/partir, votre mentor vous a dit : "Tu as tout ce qu\'il faut pour être meilleur que moi. Ne l\'oublie jamais."',
      worldview_shaped: 'Je porte l\'héritage de mon mentor. Je dois être digne de sa confiance.'
    },
    effects: {
      stats: { wisdom: 1, charisma: 1, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Héritage du Mentor',
          desc: '+2 à une compétence enseignée, inspiration 1×/jour (+1d6 jet)',
          game_effect: 'Boost spécialisé + capacité héroïque'
        }
      ],
      reputation: [
        { factionId: 'disciples_mentor', delta: 4, reason: 'Protégé reconnu' }
      ],
      items: [
        { itemId: 'mentors_gift', quantity: 1, reason: 'Cadeau d\'adieu précieux' }
      ],
      skills: [
        { skillId: 'chosen_skill', bonus: 2, reason: 'Enseignement dédié' },
        { skillId: 'insight', bonus: 1, reason: 'Sagesse transmise' }
      ],
      languages: [],
      tags: ['mentored', 'inspired', 'legacy', 'hopeful']
    },
    social_impacts: {
      npc_reactions: {
        'disciples': 'Respect fraternel',
        'rivaux_mentor': 'Hostilité',
        'sages': 'Intérêt pédagogique'
      },
      first_impression: '« Tu as cette aura... Quelqu\'un de grand t\'a guidé, n\'est-ce pas ? »'
    },
    tags: ['mentored', 'inspired', 'legacy'],
    incompatible_with: []
  },

  {
    id: 'childhood_blessing_heroic_act',
    stage: 'childhood',
    category: 'trauma',
    label: 'Acte Héroïque Précoce',
    desc: 'Enfant, vous avez sauvé quelqu\'un au péril de votre vie. On vous considère comme un héros local.',
    detailed_lore: {
      backstory: 'À dix ans, vous avez plongé dans une rivière en crue pour sauver un enfant qui se noyait. Ou affronté un loup pour protéger votre sœur. Votre courage a marqué les esprits.',
      defining_moment: 'Les villageois ont célébré votre bravoure. Le maire vous a remis une médaille en disant : "Vous êtes un exemple pour nous tous."',
      worldview_shaped: 'Je suis capable de grandeur. Le courage n\'attend pas l\'âge adulte.'
    },
    effects: {
      stats: { charisma: 2, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Courage Reconnu',
          desc: '+2 Persuasion (inspiration), immunité peur quand allié en danger',
          game_effect: 'Leader naturel protecteur'
        }
      ],
      reputation: [
        { factionId: 'village_origine', delta: 8, reason: 'Héros local' }
      ],
      items: [
        { itemId: 'heroism_medal', quantity: 1, reason: 'Médaille du courage' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 2, reason: 'Charisme héroïque' },
        { skillId: 'athletics', bonus: 1, reason: 'Exploit physique mémorable' }
      ],
      languages: [],
      tags: ['heroic', 'brave', 'celebrated', 'inspiring']
    },
    social_impacts: {
      npc_reactions: {
        'témoins': 'Admiration durable',
        'cyniques': 'Scepticisme ("chance")',
        'enfants': 'Idolâtrie'
      },
      first_impression: '« Attendez... Vous êtes [Nom] ? Celui qui a sauvé... ? Incroyable ! »'
    },
    tags: ['heroic', 'brave', 'celebrated'],
    incompatible_with: []
  },

  {
    id: 'childhood_blessing_loyal_friend',
    stage: 'childhood',
    category: 'trauma',
    label: 'Ami(e) d\'Enfance Indéfectible',
    desc: 'Vous avez un ami d\'enfance avec qui vous partagez un lien incassable.',
    detailed_lore: {
      backstory: 'Depuis vos cinq ans, vous et [Nom] êtes inséparables. Vous avez partagé joies, peines, secrets et rêves. Cet ami vous connaît mieux que quiconque.',
      defining_moment: 'Quand tout le monde vous a tourné le dos, cet ami est resté. "Je serai toujours là", a-t-il/elle juré.',
      worldview_shaped: 'L\'amitié véritable est plus forte que le sang. Un ami loyal vaut tous les trésors.'
    },
    effects: {
      stats: { charisma: 1, wisdom: 1 },
      mechanical_traits: [
        {
          name: 'Lien Fraternel',
          desc: '+2 tous jets quand ami proche présent, ami apparaît en PNJ allié',
          game_effect: 'Synergie émotionnelle + allié narratif'
        }
      ],
      reputation: [],
      items: [
        { itemId: 'friendship_token', quantity: 1, reason: 'Gage d\'amitié partagé' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 1, reason: 'Empathie développée' },
        { skillId: 'insight', bonus: 1, reason: 'Compréhension mutuelle profonde' }
      ],
      languages: [],
      tags: ['bonded', 'loyal', 'supported', 'hopeful']
    },
    social_impacts: {
      npc_reactions: {
        'l_ami': 'Confiance absolue',
        'jaloux': 'Envie du lien',
        'solitaires': 'Incompréhension'
      },
      first_impression: '« Vous avez cette aura de quelqu\'un qui n\'a jamais été vraiment seul. »'
    },
    tags: ['bonded', 'loyal', 'supported'],
    incompatible_with: ['childhood_trauma_betrayal', 'childhood_family_orphan']
  },

  {
    id: 'childhood_blessing_magic_awakening',
    stage: 'childhood',
    category: 'trauma',
    label: 'Éveil Magique Spontané',
    desc: 'Vos pouvoirs magiques se sont manifestés de manière spectaculaire dans votre enfance.',
    detailed_lore: {
      backstory: 'À neuf ans, lors d\'un moment de peur ou colère intense, votre magie a explosé. Flammes jaillissant de vos mains, objets lévitant, tempête invoquée... Vous avez compris que vous étiez différent.',
      defining_moment: 'Un mage errant a senti votre pouvoir et déclaré : "Cet enfant a un don rare. Il doit être formé, ou il deviendra dangereux."',
      worldview_shaped: 'Je porte un pouvoir immense. C\'est un don et une malédiction. Je dois le maîtriser.'
    },
    effects: {
      stats: { intelligence: 2, willpower: 1 },
      stats_penalty: {},
      mechanical_traits: [
        {
          name: 'Prodige Magique',
          desc: '+2 Arcanes, 1 sort bonus connu (niveau 1), apprentissage sorts 30% plus rapide',
          game_effect: 'Potentiel magique inné'
        }
      ],
      reputation: [
        { factionId: 'mages', delta: 4, reason: 'Prodige identifié' },
        { factionId: 'inquisition', delta: -3, reason: 'Magie non contrôlée suspecte' }
      ],
      items: [
        { itemId: 'basic_spellbook', quantity: 1, reason: 'Premier grimoire offert' }
      ],
      skills: [
        { skillId: 'arcana', bonus: 2, reason: 'Affinité naturelle' }
      ],
      languages: [],
      tags: ['gifted', 'magical', 'prodigy', 'marked']
    },
    social_impacts: {
      npc_reactions: {
        'mages': 'Intérêt ou jalousie',
        'superstitieux': 'Crainte',
        'anti-mages': 'Hostilité',
        'autres_prodiges': 'Rivalité'
      },
      first_impression: '« Il y a... quelque chose autour de toi. De la magie brute. Tu es un naturel ? »'
    },
    tags: ['gifted', 'magical', 'prodigy'],
    incompatible_with: []
  },

  // ... 21 autres traumas/bénédictions à compléter :
  // TRAUMAS : Maladie grave, Kidnapping, Perte d'un frère/sœur, Pauvreté extrême, Humiliation publique, 
  //           Torture, Famine, Abandon, Malédiction, Possession démoniaque, Échec catastrophique
  // BÉNÉDICTIONS : Don naturel (chant/art), Animal compagnon loyal, Rêve prophétique, Découverte trésor,
  //                Sauvé par un étranger, Vision divine, Rencontre créature légendaire, Talent exceptionnel,
  //                Chance insolente

  {
    id: 'childhood_trauma_poverty',
    stage: 'childhood',
    category: 'trauma',
    label: 'Pauvreté Extrême',
    desc: 'Vous avez connu la faim quotidienne et dormi dans le froid. La survie était un combat de chaque instant.',
    detailed_lore: {
      backstory: 'Certains jours, il n\'y avait rien à manger. Vos vêtements étaient des haillons. Vous avez vu votre famille se sacrifier pour que vous surviviez.',
      defining_moment: 'Un hiver particulièrement rude, vous avez partagé votre dernière croûte de pain avec un mendiant encore plus démuni. Il vous a béni en pleurant.',
      worldview_shaped: 'L\'argent n\'est pas tout, mais son absence est torture. Je n\'oublierai jamais d\'où je viens.'
    },
    effects: {
      stats: { constitution: 2, willpower: 1 },
      stats_penalty: { charisma: 1 },
      mechanical_traits: [
        {
          name: 'Endurance de la Faim',
          desc: 'Résistance faim/soif doublée, +2 Survie (milieu urbain pauvre)',
          game_effect: 'Survie extrême'
        }
      ],
      reputation: [
        { factionId: 'pauvres', delta: 5, reason: 'Un des leurs' }
      ],
      items: [],
      skills: [
        { skillId: 'survival', bonus: 2, reason: 'Survie quotidienne' },
        { skillId: 'sleight_of_hand', bonus: 1, reason: 'Vol nécessaire' }
      ],
      languages: [],
      tags: ['impoverished', 'resilient', 'scarred', 'empathetic']
    },
    social_impacts: {
      npc_reactions: {
        'pauvres': 'Solidarité immédiate',
        'riches': 'Malaise ou dédain',
        'charitables': 'Compassion'
      },
      first_impression: '« Tes mains... Tu as connu la vraie faim, n\'est-ce pas ? »'
    },
    tags: ['impoverished', 'resilient', 'scarred'],
    incompatible_with: ['childhood_family_noble_dynasty', 'birth_status_nobility']
  },

  {
    id: 'childhood_blessing_animal_companion',
    stage: 'childhood',
    category: 'trauma',
    label: 'Compagnon Animal Loyal',
    desc: 'Un animal (chien, loup, corbeau, chat) vous a adopté et ne vous a jamais quitté.',
    detailed_lore: {
      backstory: 'Alors que vous étiez perdu dans les bois/seul dans la rue, une créature est apparue. Au lieu de fuir, elle s\'est approchée. Depuis, elle vous suit partout, vous protège, vous comprend.',
      defining_moment: 'Quand des bandits vous ont attaqué, votre compagnon s\'est jeté entre vous et les lames. Il a survécu, et vous avez juré de toujours le protéger en retour.',
      worldview_shaped: 'Les animaux sont souvent plus loyaux que les humains. Ce lien est sacré.'
    },
    effects: {
      stats: { wisdom: 1, perception: 1 },
      mechanical_traits: [
        {
          name: 'Lien Bestial',
          desc: 'Compagnon animal (stats niveau-dépendantes), +2 Dressage, communication empathique',
          game_effect: 'Allié permanent + capacité ranger'
        }
      ],
      reputation: [],
      items: [
        { itemId: 'animal_companion', quantity: 1, reason: 'Compagnon fidèle' }
      ],
      skills: [
        { skillId: 'animal_handling', bonus: 2, reason: 'Lien naturel fort' },
        { skillId: 'survival', bonus: 1, reason: 'Chasse en duo' }
      ],
      languages: [],
      tags: ['bonded', 'nature', 'protected', 'ranger']
    },
    social_impacts: {
      npc_reactions: {
        'rangers': 'Respect',
        'citadins': 'Curiosité',
        'chasseurs': 'Intérêt',
        'cruels': 'Moquerie'
      },
      first_impression: '« Ce... Ce loup/corbeau/chien te suit vraiment partout ? Fascinant. »'
    },
    tags: ['bonded', 'nature', 'protected'],
    incompatible_with: []
  }
];

// NOTE DÉVELOPPEMENT : Compléter avec 19 traumas/bénédictions supplémentaires
// pour atteindre les 25 options prévues dans le plan
