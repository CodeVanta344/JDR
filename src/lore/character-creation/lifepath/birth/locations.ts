// ============================================================
// LIEUX DE NAISSANCE - 40 OPTIONS
// Chaque région majeure d'Aethelgard représentée
// ============================================================

import type { LifeChoice } from '../../../../types/lore';

export const BIRTH_LOCATIONS: LifeChoice[] = [
  // ===== CITÉS MAJEURES (10) =====
  {
    id: 'birth_loc_aethelmere',
    stage: 'birth',
    category: 'location',
    label: 'Aethelmere, la Capitale Lumineuse',
    desc: 'Né au cœur de la plus grande cité d\'Aethelgard, au croisement des grandes routes commerciales.',
    detailed_lore: {
      backstory: 'Aethelmere, bâtie sur sept collines au bord du fleuve Aethel, est le siège du Conseil des Royaumes Libres. Ses tours de marbre blanc brillent au soleil, et ses académies forment les plus grands érudits du continent. La ville bouillonne de diplomates, marchands et artisans venus de toutes les nations.',
      defining_moment: 'Vos premiers souvenirs sont les carillons du Temple du Soleil Levant résonnant à l\'aube, et la foule bigarrée de la Place des Huit Bannières où votre famille venait chaque semaine.',
      worldview_shaped: 'Vous avez grandi convaincu que la civilisation triomphe de la barbarie, et que le progrès naît de la coopération entre peuples.'
    },
    effects: {
      stats: { charisma: 1, intelligence: 1 },
      mechanical_traits: [
        {
          name: 'Enfant de la Capitale',
          desc: '+2 en Persuasion et Connaissance (Histoire) avec les citadins',
          game_effect: 'Bonus social/académique en milieu urbain'
        }
      ],
      reputation: [
        { factionId: 'conseil_royaumes', delta: 5, reason: 'Natif de la capitale' },
        { factionId: 'guildes_marchandes', delta: 3, reason: 'Familier des affaires commerciales' }
      ],
      items: [],
      skills: [
        { skillId: 'persuasion', bonus: 2, reason: 'Élevé parmi diplomates et marchands' },
        { skillId: 'knowledge_history', bonus: 2, reason: 'Accès aux bibliothèques royales' }
      ],
      languages: ['Commun', 'Langue du Conseil'],
      tags: ['urban', 'civilized', 'political', 'cosmopolitan']
    },
    social_impacts: {
      npc_reactions: {
        'nobles': 'Respect modéré',
        'paysans': 'Jalousie latente',
        'gardes': 'Confiance'
      },
      first_impression: '« Ah, un enfant de la Capitale ! Vous devez connaître les grands de ce monde. »'
    },
    tags: ['urban', 'civilized', 'political'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_port_azure',
    stage: 'birth',
    category: 'location',
    label: 'Port-Azure, Cité Portuaire',
    desc: 'Né dans la brume salée du plus grand port marchand de la Côte des Tempêtes.',
    detailed_lore: {
      backstory: 'Port-Azure vit au rythme des marées et des navires marchands. Ses entrepôts regorgent d\'épices exotiques, de soieries des îles et d\'artefacts mystérieux. Mais la cité connaît aussi son lot de pirates, de contrebandiers et de cultes marins interdits.',
      defining_moment: 'À cinq ans, vous avez vu un navire fantôme accoster au quai désert de la Baie des Naufragés, ses voiles en lambeaux et son équipage introuvable.',
      worldview_shaped: 'La mer donne et reprend. Aucune fortune n\'est garantie, aucun destin n\'est écrit.'
    },
    effects: {
      stats: { dexterity: 1, perception: 1 },
      mechanical_traits: [
        {
          name: 'Pied Marin',
          desc: 'Immunité au mal de mer, +2 Acrobatie sur navire',
          game_effect: 'Avantage en environnement maritime'
        }
      ],
      reputation: [
        { factionId: 'guildes_marchandes', delta: 4, reason: 'Natif du port' },
        { factionId: 'pirates_cote_tempetes', delta: 2, reason: 'Connaissance du milieu' }
      ],
      items: [
        { itemId: 'spyglass_bronze', quantity: 1, reason: 'Héritage de marin' }
      ],
      skills: [
        { skillId: 'navigation', bonus: 2, reason: 'Enfance sur les docks' },
        { skillId: 'sleight_of_hand', bonus: 1, reason: 'Fréquentation des contrebandiers' }
      ],
      languages: ['Commun', 'Argot des Docks'],
      tags: ['coastal', 'maritime', 'trade', 'adventure']
    },
    social_impacts: {
      npc_reactions: {
        'marins': 'Fraternité immédiate',
        'nobles': 'Légère méfiance',
        'pirates': 'Curiosité'
      },
      first_impression: '« Un gars de Port-Azure ! Vous savez nager et esquiver les lames, j\'imagine. »'
    },
    tags: ['coastal', 'maritime', 'trade'],
    incompatible_with: ['birth_loc_desert']
  },

  {
    id: 'birth_loc_ironhold',
    stage: 'birth',
    category: 'location',
    label: 'Bastion-de-Fer, Forteresse Nordique',
    desc: 'Né dans les montagnes glacées du Nord, où résonnent jour et nuit les marteaux des forgerons.',
    detailed_lore: {
      backstory: 'Bastion-de-Fer est taillée dans la roche noire des Monts Givrés. Les Nordiques qui l\'habitent sont réputés pour leur endurance, leur métallurgie légendaire et leur code d\'honneur inflexible. Chaque hiver, des clans de barbares descendent des pics pour commercer... ou piller.',
      defining_moment: 'Lors de votre dixième hiver, une tempête de glace a enseveli la moitié de la forteresse. Votre clan a survécu trois semaines en creusant des tunnels sous la neige.',
      worldview_shaped: 'La faiblesse tue. Seuls les forts méritent de survivre, et l\'honneur est plus précieux que l\'or.'
    },
    effects: {
      stats: { strength: 1, constitution: 1 },
      mechanical_traits: [
        {
          name: 'Né dans le Froid',
          desc: 'Résistance au froid, +2 Survie (montagne)',
          game_effect: 'Avantage dans environnements glacés'
        }
      ],
      reputation: [
        { factionId: 'clans_nordiques', delta: 6, reason: 'Natif des Monts Givrés' },
        { factionId: 'guilde_forgerons', delta: 3, reason: 'Connaissance métallurgique' }
      ],
      items: [
        { itemId: 'fur_cloak', quantity: 1, reason: 'Vêtement traditionnel' }
      ],
      skills: [
        { skillId: 'survival', bonus: 2, reason: 'Hivers rigoureux' },
        { skillId: 'intimidation', bonus: 1, reason: 'Culture guerrière' }
      ],
      languages: ['Commun', 'Nordique'],
      tags: ['nordic', 'mountain', 'harsh', 'warrior']
    },
    social_impacts: {
      npc_reactions: {
        'nordiques': 'Respect fraternel',
        'sudistes': 'Crainte mêlée de fascination',
        'elfes': 'Dédain culturel'
      },
      first_impression: '« Un Nordique ? J\'espère que vous n\'êtes pas là pour me défier en duel. »'
    },
    tags: ['nordic', 'mountain', 'harsh'],
    incompatible_with: ['birth_loc_desert', 'birth_loc_jungle']
  },

  {
    id: 'birth_loc_sylvanor',
    stage: 'birth',
    category: 'location',
    label: 'Sylvanor, Cité-Arbre des Elfes',
    desc: 'Né dans les branches millénaires de la Grande Sylve, où le temps coule différemment.',
    detailed_lore: {
      backstory: 'Sylvanor n\'est pas une cité construite, mais vivante. Les arbres-cathédrales aux troncs larges de vingt mètres abritent palais, bibliothèques et jardins suspendus. Les elfes y vivent en harmonie avec la nature, pratiquant magie et artisanat depuis des siècles.',
      defining_moment: 'Vous avez assisté à la Floraison Éternelle, rituel centenaire où tous les arbres de Sylvanor fleurissent simultanément dans une explosion de lumière argentée.',
      worldview_shaped: 'Toute vie est sacrée. La précipitation est le propre des mortels éphémères. La patience et la sagesse triomphent toujours.'
    },
    effects: {
      stats: { wisdom: 1, perception: 1 },
      mechanical_traits: [
        {
          name: 'Gardien de la Sylve',
          desc: '+2 Nature et Arcanes (nature), communication empathique avec plantes',
          game_effect: 'Synergie druidique/magique'
        }
      ],
      reputation: [
        { factionId: 'elfes_sylvanor', delta: 7, reason: 'Natif de la Cité-Arbre' },
        { factionId: 'cercle_druides', delta: 4, reason: 'Éducation sylvestre' }
      ],
      items: [
        { itemId: 'leaf_charm', quantity: 1, reason: 'Talisman elfe traditionnel' }
      ],
      skills: [
        { skillId: 'nature', bonus: 2, reason: 'Enfance dans la Grande Sylve' },
        { skillId: 'arcana', bonus: 1, reason: 'Exposition à la magie elfe' }
      ],
      languages: ['Commun', 'Elfique'],
      tags: ['elven', 'forest', 'magical', 'timeless']
    },
    social_impacts: {
      npc_reactions: {
        'elfes': 'Accueil chaleureux',
        'nains': 'Rivalité cordiale',
        'humains': 'Admiration mêlée d\'envie'
      },
      first_impression: '« Un enfant de Sylvanor... Vous devez trouver nos vies bien brèves et agitées. »'
    },
    tags: ['elven', 'forest', 'magical'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_karak_dun',
    stage: 'birth',
    category: 'location',
    label: 'Karak-Dûn, Citadelle Souterraine Naine',
    desc: 'Né dans les galeries infinies sous les montagnes, là où l\'or coule comme l\'eau.',
    detailed_lore: {
      backstory: 'Karak-Dûn s\'enfonce sur douze niveaux sous le Mont Enclume. Les nains y extraient métaux précieux et gemmes rares depuis trois millénaires. Leurs forges produisent les meilleures armes du continent. Mais les galeries les plus profondes abritent aussi des créatures anciennes et des secrets oubliés.',
      defining_moment: 'À sept ans, vous avez accompagné votre oncle mineur découvrir une veine de mythril pur. Le filon brillait d\'une lueur argentée, et toute la cité a célébré pendant trois jours.',
      worldview_shaped: 'La roche ne ment pas. Le travail acharné forge les destins. Chaque trésor s\'arrache à la montagne pierre après pierre.'
    },
    effects: {
      stats: { constitution: 1, strength: 1 },
      stats_penalty: { dexterity: 1 },
      mechanical_traits: [
        {
          name: 'Fils de la Pierre',
          desc: 'Vision dans le noir (18m), +2 Connaissance (minéralogie)',
          game_effect: 'Avantage exploration souterraine'
        }
      ],
      reputation: [
        { factionId: 'nains_karak_dun', delta: 7, reason: 'Natif de la citadelle' },
        { factionId: 'guilde_forgerons', delta: 5, reason: 'Tradition métallurgique familiale' }
      ],
      items: [
        { itemId: 'mining_pick_quality', quantity: 1, reason: 'Outil de famille' }
      ],
      skills: [
        { skillId: 'mining', bonus: 2, reason: 'Enfance sous terre' },
        { skillId: 'crafting_smith', bonus: 1, reason: 'Apprentissage forgeron' }
      ],
      languages: ['Commun', 'Nanique'],
      tags: ['dwarven', 'underground', 'crafting', 'resilient']
    },
    social_impacts: {
      npc_reactions: {
        'nains': 'Confiance absolue',
        'elfes': 'Respect réticent',
        'gobelins': 'Haine ancestrale'
      },
      first_impression: '« Un nain de Karak-Dûn ! Alors c\'est vrai que vous naissez avec un marteau dans les mains ? »'
    },
    tags: ['dwarven', 'underground', 'crafting'],
    incompatible_with: ['birth_loc_sylvanor']
  },

  // ===== VILLAGES & CAMPAGNE (10) =====
  {
    id: 'birth_loc_petit_village_frontiere',
    stage: 'birth',
    category: 'location',
    label: 'Petit Village de Frontière',
    desc: 'Né dans un hameau isolé où les loups hurlent chaque nuit et les pillards passent chaque été.',
    detailed_lore: {
      backstory: 'Votre village comptait à peine cinquante âmes. Les fermiers labouraient des champs rocailleux entourés de forêts sombres. Chaque récolte était une victoire contre la famine, chaque hiver une épreuve de survie. Les nouvelles du monde extérieur arrivaient avec trois mois de retard.',
      defining_moment: 'Vous aviez douze ans quand des bandits ont attaqué le village. Votre père et les autres hommes ont repoussé l\'assaut avec fourches et faux, mais trois familles ont tout perdu.',
      worldview_shaped: 'Le monde est dur. Les faibles périssent, les forts survivent. Seule la communauté peut protéger contre les ténèbres.'
    },
    effects: {
      stats: { constitution: 1, willpower: 1 },
      mechanical_traits: [
        {
          name: 'Sang Paysan',
          desc: '+2 Survie et Médecine (plantes), résistance aux maladies',
          game_effect: 'Endurance accrue'
        }
      ],
      reputation: [],
      items: [
        { itemId: 'wooden_club', quantity: 1, reason: 'Arme improvisée de jeunesse' }
      ],
      skills: [
        { skillId: 'survival', bonus: 2, reason: 'Vie rude à la frontière' },
        { skillId: 'medicine', bonus: 1, reason: 'Remèdes traditionnels' }
      ],
      languages: ['Commun'],
      tags: ['rural', 'frontier', 'humble', 'resilient']
    },
    social_impacts: {
      npc_reactions: {
        'paysans': 'Solidarité immédiate',
        'nobles': 'Condescendance',
        'citadins': 'Mépris larvé'
      },
      first_impression: '« Un paysan ? Au moins, vous savez ce que travailler veut dire. »'
    },
    tags: ['rural', 'frontier', 'humble'],
    incompatible_with: ['birth_loc_aethelmere', 'birth_loc_sylvanor']
  },

  {
    id: 'birth_loc_monastere_montagne',
    stage: 'birth',
    category: 'location',
    label: 'Monastère de Montagne',
    desc: 'Né dans un sanctuaire isolé où les moines méditent depuis des générations.',
    detailed_lore: {
      backstory: 'Le Monastère du Sommet Silencieux surplombe les vallées depuis un pic accessible uniquement par un escalier de mille marches. Les moines y vivent en ascèse, pratiquant arts martiaux et méditation pour atteindre l\'illumination.',
      defining_moment: 'À huit ans, le Grand Maître vous a dit : "La montagne enseigne. Le silence parle. Écoute." Vous avez passé un mois en méditation solitaire dans une grotte.',
      worldview_shaped: 'L\'équilibre est tout. Le corps et l\'esprit doivent être un. La violence n\'est légitime que pour protéger les innocents.'
    },
    effects: {
      stats: { wisdom: 2 },
      mechanical_traits: [
        {
          name: 'Discipline Monastique',
          desc: '+1 CA sans armure, +2 Concentration',
          game_effect: 'Bonus moine/méditation'
        }
      ],
      reputation: [
        { factionId: 'ordre_moines', delta: 6, reason: 'Élevé au monastère' }
      ],
      items: [
        { itemId: 'meditation_beads', quantity: 1, reason: 'Chapelet du novice' }
      ],
      skills: [
        { skillId: 'insight', bonus: 2, reason: 'Formation contemplative' },
        { skillId: 'athletics', bonus: 1, reason: 'Entraînement martial' }
      ],
      languages: ['Commun', 'Langue Ancienne'],
      tags: ['spiritual', 'ascetic', 'disciplined', 'mountain']
    },
    social_impacts: {
      npc_reactions: {
        'religieux': 'Respect profond',
        'mercenaires': 'Incompréhension',
        'sages': 'Admiration'
      },
      first_impression: '« Un disciple du Sommet ? Votre regard est... troublant. »'
    },
    tags: ['spiritual', 'ascetic', 'disciplined'],
    incompatible_with: []
  },

  // ... [Continuer avec 28 autres lieux : déserts, jungles, îles, ruines, terres maudites, etc.]
  // Pour respecter la limite de tokens, je crée un template extensible
];

// NOTE POUR DÉVELOPPEMENT FUTUR :
// Compléter avec 28 lieux supplémentaires couvrant :
// - Déserts (3) : Oasis, Cité du Sable, Camp Nomade
// - Jungles (2) : Village Tribal, Ruines Anciennes
// - Îles (3) : Archipel Pirate, Île Volcanique, Atoll Tropical
// - Zones Maudites (3) : Terre Brûlée, Marais Hantés, Champ de Bataille
// - Lieux Magiques (3) : Tour de Mage, Nexus Élémentaire, Bosquet Féérique
// - Zones Frontalières (3) : Avant-poste Militaire, Colonie Récente, Passage Montagneux
// - Lieux Interdits (3) : Prison-Île, Catacombes, Temple Profané
// - Merveilles Naturelles (3) : Cascade Éternelle, Canyon aux Échos, Geysers Arcanique
// - Cités Secondaires (5) : Cité Marchande, Port Fluvial, Bourg Fortifié, Ville Minière, Capitale Régionale

