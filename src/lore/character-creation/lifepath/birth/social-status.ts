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
      stats: { charisma: 2, intelligence: 1 },
      mechanical_traits: [
        {
          name: 'Privilège Aristocratique',
          desc: '+3 Persuasion avec nobles/autorités, accès privilégié cour royale',
          game_effect: 'Avantage social politique'
        },
        {
          name: 'Héritage Prestigieux',
          desc: 'Commence avec 500 PO supplémentaires',
          game_effect: 'Richesse de départ'
        }
      ],
      reputation: [
        { factionId: 'noblesse', delta: 8, reason: 'Membre de l\'aristocratie' },
        { factionId: 'peuple', delta: -3, reason: 'Perçu comme privilégié' }
      ],
      items: [
        { itemId: 'signet_ring', quantity: 1, reason: 'Sceau familial' },
        { itemId: 'fine_clothes', quantity: 1, reason: 'Garde-robe noble' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 3, reason: 'Éducation courtisane' },
        { skillId: 'knowledge_nobility', bonus: 2, reason: 'Généalogie et héraldique' }
      ],
      languages: ['Commun', 'Langue Noble'],
      tags: ['noble', 'wealthy', 'privileged', 'political']
    },
    social_impacts: {
      npc_reactions: {
        'nobles': 'Respect immédiat (ou rivalité)',
        'paysans': 'Déférence forcée',
        'marchands': 'Opportunisme',
        'bandits': 'Cible prioritaire'
      },
      first_impression: '« Seigneur/Dame, votre présence nous honore. » (courbette)'
    },
    tags: ['noble', 'wealthy', 'privileged'],
    incompatible_with: ['birth_status_esclave', 'birth_status_orphelin']
  },

  {
    id: 'birth_status_merchant',
    stage: 'birth',
    category: 'status',
    label: 'Famille Marchande Prospère',
    desc: 'Né dans une famille de commerçants fortunés, entouré de caravanes et de comptes de ledger.',
    detailed_lore: {
      backstory: 'Votre famille a bâti sa fortune sur trois générations de commerce : épices, textiles, armes... L\'argent coule, mais la noblesse vous méprise toujours. Vous avez appris très jeune que chaque conversation est une négociation.',
      defining_moment: 'À quinze ans, votre père vous a envoyé négocier seul un contrat avec la Guilde des Forgerons. Vous avez rapporté 20% de profit en plus que prévu.',
      worldview_shaped: 'Tout est question de valeur et de timing. L\'honneur ne nourrit pas les familles. L\'or achète liberté et respect.'
    },
    effects: {
      stats: { intelligence: 1, charisma: 1 },
      mechanical_traits: [
        {
          name: 'Sens du Commerce',
          desc: '+3 Persuasion (marchandage), prix d\'achat réduits de 10%',
          game_effect: 'Avantage économique'
        }
      ],
      reputation: [
        { factionId: 'guildes_marchandes', delta: 6, reason: 'Famille connue' },
        { factionId: 'noblesse', delta: -2, reason: 'Nouveaux riches' }
      ],
      items: [
        { itemId: 'merchant_ledger', quantity: 1, reason: 'Registre familial' },
        { itemId: 'gold_coins', quantity: 200, reason: 'Avance sur héritage' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 3, reason: 'Négociations quotidiennes' },
        { skillId: 'insight', bonus: 2, reason: 'Détecter les menteurs' }
      ],
      languages: ['Commun', 'Langue Marchande'],
      tags: ['merchant', 'wealthy', 'pragmatic', 'urban']
    },
    social_impacts: {
      npc_reactions: {
        'marchands': 'Confiance professionnelle',
        'nobles': 'Dédain poli',
        'paysans': 'Envie',
        'voleurs': 'Intérêt'
      },
      first_impression: '« Ah, un négociant ! Voyons si nous pouvons trouver un arrangement mutuellement profitable. »'
    },
    tags: ['merchant', 'wealthy', 'pragmatic'],
    incompatible_with: ['birth_status_esclave', 'birth_status_paria']
  },

  {
    id: 'birth_status_artisan',
    stage: 'birth',
    category: 'status',
    label: 'Lignée Artisanale Respectée',
    desc: 'Issu d\'une famille de maîtres artisans dont le savoir-faire se transmet depuis quatre générations.',
    detailed_lore: {
      backstory: 'Votre grand-père était Maître Forgeron/Charpentier/Tailleur (selon métier). Votre père a perfectionné l\'art. Vous avez grandi avec l\'odeur du métal chaud, du bois fraîchement scié ou de la teinture. Chaque objet créé porte la marque familiale.',
      defining_moment: 'À treize ans, vous avez fabriqué votre première pièce digne de la marque familiale. Votre père l\'a montrée à toute la guilde avec fierté.',
      worldview_shaped: 'Un travail bien fait est sa propre récompense. Les mains créent ce que l\'esprit conçoit. Le talent se gagne, pas par la naissance, mais par la sueur.'
    },
    effects: {
      stats: { dexterity: 1, intelligence: 1 },
      mechanical_traits: [
        {
          name: 'Maître Héritier',
          desc: '+2 à un métier d\'artisanat au choix, outils de maître offerts',
          game_effect: 'Bonus crafting spécialisé'
        }
      ],
      reputation: [
        { factionId: 'guilde_artisans', delta: 5, reason: 'Fils/Fille de Maître' }
      ],
      items: [
        { itemId: 'masterwork_tools', quantity: 1, reason: 'Héritage familial' },
        { itemId: 'crafting_manual', quantity: 1, reason: 'Recueil de techniques' }
      ],
      skills: [
        { skillId: 'crafting_choice', bonus: 2, reason: 'Apprentissage familial' },
        { skillId: 'appraisal', bonus: 1, reason: 'Évaluation matériaux' }
      ],
      languages: ['Commun'],
      tags: ['artisan', 'skilled', 'urban', 'practical']
    },
    social_impacts: {
      npc_reactions: {
        'artisans': 'Respect professionnel',
        'nobles': 'Indifférence',
        'aventuriers': 'Intérêt (équipement)'
      },
      first_impression: '« Votre famille fait du beau travail. Pourriez-vous réparer ça ? »'
    },
    tags: ['artisan', 'skilled', 'urban'],
    incompatible_with: []
  },

  {
    id: 'birth_status_paysan',
    stage: 'birth',
    category: 'status',
    label: 'Humble Paysannerie',
    desc: 'Né dans les champs, où chaque repas est une victoire et chaque hiver une épreuve.',
    detailed_lore: {
      backstory: 'Votre famille cultive la même terre depuis six générations. Vous n\'avez jamais connu l\'abondance, mais jamais manqué du nécessaire non plus. Les saisons rythment votre vie : semailles, moissons, repos hivernal.',
      defining_moment: 'Une année de sécheresse a détruit la récolte. Votre village a survécu grâce à l\'entraide. Vous avez appris que la communauté vaut plus que l\'or.',
      worldview_shaped: 'La terre ne ment pas. Le travail honnête nourrit le corps et l\'âme. Les nobles parlent, les paysans font.'
    },
    effects: {
      stats: { constitution: 2 },
      mechanical_traits: [
        {
          name: 'Robustesse Paysanne',
          desc: '+1 PV par niveau, résistance faim/soif',
          game_effect: 'Endurance accrue'
        }
      ],
      reputation: [
        { factionId: 'peuple', delta: 5, reason: 'Issu du peuple' }
      ],
      items: [
        { itemId: 'wooden_tool', quantity: 1, reason: 'Outil agricole' }
      ],
      skills: [
        { skillId: 'survival', bonus: 2, reason: 'Vie rurale dure' },
        { skillId: 'animal_handling', bonus: 1, reason: 'Bétail familial' }
      ],
      languages: ['Commun'],
      tags: ['rural', 'humble', 'resilient', 'commoner']
    },
    social_impacts: {
      npc_reactions: {
        'paysans': 'Fraternité immédiate',
        'nobles': 'Mépris ou pitié',
        'citadins': 'Condescendance'
      },
      first_impression: '« Un paysan ? Au moins, tu connais la valeur du travail. »'
    },
    tags: ['rural', 'humble', 'resilient'],
    incompatible_with: ['birth_status_nobility']
  },

  {
    id: 'birth_status_clerc',
    stage: 'birth',
    category: 'status',
    label: 'Famille Cléricale Dévouée',
    desc: 'Élevé dans l\'ombre d\'un temple, baigné de prières et de rituels sacrés.',
    detailed_lore: {
      backstory: 'Votre mère/père était prêtre/prêtresse d\'un dieu majeur. Vous avez grandi entre encens et psaumes, assistant aux rites dès l\'enfance. La foi imprègne chaque instant de votre vie.',
      defining_moment: 'Lors d\'une cérémonie, une lumière divine a touché votre front. Le Grand Prêtre a murmuré : "Les dieux ont des plans pour toi."',
      worldview_shaped: 'La foi guide, la raison suit. Le divin transcende le mortel. Servir les dieux, c\'est servir l\'humanité.'
    },
    effects: {
      stats: { wisdom: 2 },
      mechanical_traits: [
        {
          name: 'Béni des Dieux',
          desc: '+2 Religion et Médecine, bonus lancer sorts divins',
          game_effect: 'Synergie cléric/paladin'
        }
      ],
      reputation: [
        { factionId: 'eglises', delta: 6, reason: 'Famille sacerdotale' },
        { factionId: 'cultes_interdits', delta: -5, reason: 'Ennemi doctrinaire' }
      ],
      items: [
        { itemId: 'holy_symbol', quantity: 1, reason: 'Symbole familial' },
        { itemId: 'prayer_book', quantity: 1, reason: 'Livre de prières' }
      ],
      skills: [
        { skillId: 'religion', bonus: 2, reason: 'Éducation théologique' },
        { skillId: 'medicine', bonus: 1, reason: 'Soins aux fidèles' }
      ],
      languages: ['Commun', 'Langue Sacrée'],
      tags: ['religious', 'devout', 'educated', 'spiritual']
    },
    social_impacts: {
      npc_reactions: {
        'croyants': 'Respect pieux',
        'athées': 'Méfiance',
        'hérétiques': 'Hostilité'
      },
      first_impression: '« Que les dieux vous gardent, enfant de la foi. »'
    },
    tags: ['religious', 'devout', 'educated'],
    incompatible_with: ['birth_status_paria', 'birth_status_criminel']
  },

  {
    id: 'birth_status_orphelin',
    stage: 'birth',
    category: 'status',
    label: 'Orphelin des Rues',
    desc: 'Abandonné ou orphelin très jeune, élevé par les rues impitoyables de la ville.',
    detailed_lore: {
      backstory: 'Vous ne connaissez pas vos parents. Peut-être sont-ils morts de peste, peut-être vous ont-ils abandonnés. Vous avez survécu en mendiant, volant et dormant sous les ponts. La guilde des voleurs ou une bande de gamins des rues sont votre seule famille.',
      defining_moment: 'À dix ans, vous avez volé un pain. Le boulanger vous a attrapé... puis nourri. "Personne ne devrait voler pour manger", a-t-il dit.',
      worldview_shaped: 'Personne ne te fait de cadeaux. La loi protège les riches, pas les faibles. La survie justifie tout.'
    },
    effects: {
      stats: { dexterity: 2 },
      stats_penalty: { charisma: 1 },
      mechanical_traits: [
        {
          name: 'Instinct de Survie',
          desc: '+3 Discrétion et Escamotage, sens du danger',
          game_effect: 'Bonus roublard'
        }
      ],
      reputation: [
        { factionId: 'guilde_voleurs', delta: 3, reason: 'Reconnu comme ancien des rues' },
        { factionId: 'autorites', delta: -2, reason: 'Suspect par défaut' }
      ],
      items: [
        { itemId: 'lockpicks', quantity: 1, reason: 'Outils de survie' }
      ],
      skills: [
        { skillId: 'stealth', bonus: 3, reason: 'Éviter les gardes' },
        { skillId: 'sleight_of_hand', bonus: 2, reason: 'Vol à la tire' }
      ],
      languages: ['Commun', 'Argot des Rues'],
      tags: ['orphan', 'street', 'survivor', 'outcast']
    },
    social_impacts: {
      npc_reactions: {
        'gardes': 'Suspicion',
        'nobles': 'Dégoût',
        'autres_orphelins': 'Solidarité',
        'voleurs': 'Reconnaissance'
      },
      first_impression: '« Un orphelin ? Garde tes poches, il pourrait les délester. »'
    },
    tags: ['orphan', 'street', 'survivor'],
    incompatible_with: ['birth_status_nobility', 'birth_status_merchant']
  },

  {
    id: 'birth_status_esclave',
    stage: 'birth',
    category: 'status',
    label: 'Né en Esclavage (Libéré)',
    desc: 'Esclave de naissance, vous avez connu les chaînes avant de goûter la liberté.',
    detailed_lore: {
      backstory: 'Vous êtes né dans les chaînes, propriété légale d\'un maître. Fouets, travaux forcés et humiliations rythmaient vos jours. Un événement (révolte, maître clément mourant, fuite) vous a libéré, mais les cicatrices demeurent.',
      defining_moment: 'Le jour où vos chaînes ont été brisées, vous avez juré : "Plus jamais je ne m\'agenouillerai devant personne."',
      worldview_shaped: 'La liberté est le plus précieux des trésors. Aucune vie n\'appartient à une autre. Les puissants méritent la défiance.'
    },
    effects: {
      stats: { willpower: 2, constitution: 1 },
      stats_penalty: { charisma: 1 },
      mechanical_traits: [
        {
          name: 'Volonté Indomptable',
          desc: 'Avantage contre charme/terreur, +2 Athlétisme',
          game_effect: 'Résistance mentale'
        },
        {
          name: 'Marqué par les Chaînes',
          desc: 'Cicatrices visibles, -2 interactions nobles',
          game_effect: 'Malus social aristocratie'
        }
      ],
      reputation: [
        { factionId: 'abolitionnistes', delta: 7, reason: 'Ancien esclave' },
        { factionId: 'esclavagistes', delta: -10, reason: 'Fugitif/Libéré' }
      ],
      items: [
        { itemId: 'broken_shackle', quantity: 1, reason: 'Trophée de liberté' }
      ],
      skills: [
        { skillId: 'athletics', bonus: 2, reason: 'Travaux forcés' },
        { skillId: 'intimidation', bonus: 1, reason: 'Rage contenue' }
      ],
      languages: ['Commun'],
      tags: ['former_slave', 'survivor', 'vengeful', 'scarred']
    },
    social_impacts: {
      npc_reactions: {
        'abolitionnistes': 'Compassion',
        'nobles': 'Mépris ou gêne',
        'esclaves': 'Espoir',
        'esclavagistes': 'Hostilité'
      },
      first_impression: '« Ces marques... Tu étais esclave ? Les dieux te protègent maintenant. »'
    },
    tags: ['former_slave', 'survivor', 'vengeful'],
    incompatible_with: ['birth_status_nobility', 'birth_status_merchant']
  },

  {
    id: 'birth_status_batard',
    stage: 'birth',
    category: 'status',
    label: 'Bâtard Noble (Non Reconnu)',
    desc: 'Fruit d\'une union illégitime, vous portez le sang noble mais pas le nom.',
    detailed_lore: {
      backstory: 'Votre mère/père était noble, mais vous êtes né hors mariage. Vous avez grandi dans l\'ombre d\'un château, sachant qui vous êtes vraiment, mais jamais reconnu. Peut-être votre parent noble vous a-t-il aidé discrètement, ou au contraire nié votre existence.',
      defining_moment: 'Lors d\'un banquet, vous avez vu votre parent géniteur noble vous regarder... puis détourner les yeux et rire avec ses enfants légitimes.',
      worldview_shaped: 'Le sang ne suffit pas, le nom fait tout. Je dois prouver ma valeur par mes actes, pas par ma lignée.'
    },
    effects: {
      stats: { charisma: 1, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Héritage Contesté',
          desc: '+1 Persuasion/Intimidation avec nobles, mais désavantage héritages',
          game_effect: 'Ambiguïté sociale'
        }
      ],
      reputation: [
        { factionId: 'noblesse', delta: -3, reason: 'Bâtard connu' },
        { factionId: 'peuple', delta: 2, reason: 'Perçu comme victime injustice' }
      ],
      items: [
        { itemId: 'mothers_locket', quantity: 1, reason: 'Seul lien avec parent' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 1, reason: 'Besoin constant de prouver sa valeur' },
        { skillId: 'insight', bonus: 2, reason: 'Détecter mensonges et hypocrisie' }
      ],
      languages: ['Commun', 'Langue Noble (partiel)'],
      tags: ['bastard', 'noble_blood', 'outcast', 'ambitious']
    },
    social_impacts: {
      npc_reactions: {
        'nobles': 'Gêne ou mépris',
        'roturiers': 'Sympathie',
        'bâtards': 'Solidarité'
      },
      first_impression: '« Un bâtard noble ? Le sang pur, mais pas le nom. Dommage. »'
    },
    tags: ['bastard', 'noble_blood', 'outcast'],
    incompatible_with: ['birth_status_nobility']
  },

  {
    id: 'birth_status_criminel',
    stage: 'birth',
    category: 'status',
    label: 'Famille Criminelle Notoire',
    desc: 'Né dans une famille de hors-la-loi célèbres : bandits, contrebandiers ou assassins.',
    detailed_lore: {
      backstory: 'Votre famille n\'est pas de celles qu\'on présente. Père voleur de grand chemin, mère empoisonneuse, oncle contrebandier... Vous avez grandi dans des cach Vous avez grandi entre coups fourrés, marchandages avec la pègre et fuites nocturnes devant les milices.',
      defining_moment: 'À douze ans, vous avez participé à votre premier "coup". Votre père a dit : "Tu es des nôtres maintenant. Bienvenue dans la famille."',
      worldview_shaped: 'Les lois protègent les riches, pas nous. La loyauté familiale prime sur tout. L\'honneur des voleurs existe.'
    },
    effects: {
      stats: { dexterity: 1, intelligence: 1 },
      mechanical_traits: [
        {
          name: 'Contacts Obscurs',
          desc: 'Accès réseau criminel, +2 Investigation (monde souterrain)',
          game_effect: 'Avantage informations illicites'
        }
      ],
      reputation: [
        { factionId: 'guilde_voleurs', delta: 5, reason: 'Nom connu' },
        { factionId: 'autorites', delta: -8, reason: 'Famille recherchée' }
      ],
      items: [
        { itemId: 'fathers_dagger', quantity: 1, reason: 'Héritage paternel' }
      ],
      skills: [
        { skillId: 'stealth', bonus: 2, reason: 'Éviter les patrouilles' },
        { skillId: 'deception', bonus: 2, reason: 'Mensonge vital' }
      ],
      languages: ['Commun', 'Cant des Voleurs'],
      tags: ['criminal', 'outlaw', 'connections', 'hunted']
    },
    social_impacts: {
      npc_reactions: {
        'gardes': 'Arrestation immédiate',
        'voleurs': 'Respect ou rivalité',
        'citoyens': 'Peur',
        'nobles': 'Dégoût'
      },
      first_impression: '« Ton nom... J\'ai entendu parler de ta famille. Fais attention à toi. »'
    },
    tags: ['criminal', 'outlaw', 'connections'],
    incompatible_with: ['birth_status_nobility', 'birth_status_clerc']
  },

  {
    id: 'birth_status_paria',
    stage: 'birth',
    category: 'status',
    label: 'Paria Maudit',
    desc: 'Né sous une malédiction ou dans une famille rejetée, vous êtes un intouchable social.',
    detailed_lore: {
      backstory: 'Votre famille porte une malédiction ancestrale, ou votre naissance fut marquée par un mauvais présage. Villages entiers vous chassent. Même les mendiants vous évitent. Vous survivez aux marges de la civilisation.',
      defining_moment: 'Enfant, vous avez tenté de jouer avec d\'autres enfants. Leurs parents les ont rappelés en criant : "Ne touche pas le maudit !"',
      worldview_shaped: 'Le monde me rejette. Je ne lui dois rien. Ma seule allégeance va à ceux qui me voient comme humain.'
    },
    effects: {
      stats: { willpower: 2 },
      stats_penalty: { charisma: 2 },
      mechanical_traits: [
        {
          name: 'Esprit Endurci',
          desc: 'Immunité effets psychologiques basés sur opinion sociale, +3 Volonté',
          game_effect: 'Résistance mentale extrême'
        },
        {
          name: 'Aura de Malédiction',
          desc: '-3 tous jets sociaux sauf Intimidation',
          game_effect: 'Pénalité sociale massive'
        }
      ],
      reputation: [
        { factionId: 'tous', delta: -5, reason: 'Paria universel' }
      ],
      items: [],
      skills: [
        { skillId: 'intimidation', bonus: 3, reason: 'Seul moyen d\'interaction' },
        { skillId: 'survival', bonus: 2, reason: 'Vie aux marges' }
      ],
      languages: ['Commun'],
      tags: ['outcast', 'cursed', 'isolated', 'feared']
    },
    social_impacts: {
      npc_reactions: {
        'tous': 'Peur, rejet, hostilité',
        'autres_parias': 'Solidarité rare'
      },
      first_impression: '« Recule ! Ne le touche pas, il porte malheur ! »'
    },
    tags: ['outcast', 'cursed', 'isolated'],
    incompatible_with: ['birth_status_nobility', 'birth_status_clerc', 'birth_status_merchant']
  }
];
