// ============================================================
// LIEUX DE NAISSANCE - 40 OPTIONS D100
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
    desc: 'Né au cœur de la plus grande cité d\'Aethelgard, au croisement des grandes routes commerciales. Centre politique, académique et diplomatique du continent.',
    detailed_lore: {
      backstory: 'Aethelmere, bâtie sur sept collines sacrées au bord du fleuve Aethel argenté, est le siège du Conseil des Royaumes Libres. Ses tours de marbre blanc étincelant brillent jusqu\'à l\'horizon. Ses académies millénaires (Grande Bibliothèque Arcanique, Collège des Hérauts, Université des Sciences Naturelles) forment les plus grands érudits, diplomates et mages du continent. La ville bouillonne jour et nuit de diplomates étrangers, marchands fortunés, artisans renommés et aventuriers venus de toutes nations. Le Temple du Soleil Levant domine la Colline Royale, tandis que la Place des Huit Bannières accueille marchés cosmopolites quotidiens.',
      defining_moment: 'Vos premiers souvenirs sont les carillons harmonieux du Temple du Soleil Levant résonnant à l\'aube chaque jour, et la foule multicolore bigarrée de la Place des Huit Bannières où votre famille venait chaque semaine acheter soieries orientales, épices exotiques et livres rares. Vous avez assisté enfant au couronnement d\'un roi vassal—cérémonie où huit bannières nationales furent hissées simultanément sous acclamations massives.',
      worldview_shaped: 'Vous avez grandi profondément convaincu que la civilisation organisée triomphe toujours de la barbarie chaotique, et que le progrès humain naît exclusivement de la coopération diplomatique pacifique entre peuples divers. Les murs protègent, les lois civilisent, les académies élèvent.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { charisma: 2, intelligence: 2 },  // Ancien: CHA+1 INT+1
      mechanical_traits: [
        {
          name: 'Enfant de la Capitale',
          desc: '+5 Persuasion et +5 Knowledge (Histoire/Politique) avec citadins/nobles, +1d20 jets diplomatiques contextes officiels',
          effect: '+5 Persuasion, +5 Knowledge',  // ×2.5
          game_effect: 'Bonus social/académique massif en milieu urbain + expertise protocole'
        },
        {
          name: 'Éducation Académique Supérieure',
          desc: 'Alphabétisation précoce, accès bibliothèques royales, +3 Investigation (archives), connaissance protocoles diplomatiques',
          effect: '+3 Investigation',
          game_effect: 'Recherche documentaire avancée + culture générale étendue'
        },
        {
          name: 'Réseau Cosmopolite',
          desc: 'Contacts initiaux dans 5 factions majeures (Conseil, Guildes, Académies, Temples, Garde Royale), réduction 15% prix biens luxe',
          effect: 'Réseau social étendu',
          game_effect: 'Avantage quêtes urbaines + commerce privilégié'
        }
      ],
      reputation: [
        { factionId: 'conseil_royaumes', delta: 8, reason: 'Natif capitale, loyauté présumée' },
        { factionId: 'guildes_marchandes', delta: 5, reason: 'Familier affaires commerciales centre névralgique' },
        { factionId: 'academies', delta: 4, reason: 'Proximité institutions savoir' },
        { factionId: 'temples', delta: 3, reason: 'Participation cérémonies religieuses majeures' }
      ],
      items: [
        { itemId: 'library_card_royal', quantity: 1, reason: 'Carte accès Bibliothèque Royale (privilège résidence)' },
        { itemId: 'fine_quill_set', quantity: 1, reason: 'Set calligraphie qualité (cadeau académie)' },
        { itemId: 'city_map_detailed', quantity: 1, reason: 'Plan détaillé 7 collines Aethelmere (quartiers secrets)' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 5, reason: 'Élevé parmi diplomates, marchands, courtisans intrigants' },  // ×2.5
        { skillId: 'knowledge_history', bonus: 5, reason: 'Accès bibliothèques royales, tuteurs privés érudits' },  // ×2.5
        { skillId: 'knowledge_politics', bonus: 5, reason: 'Observation quotidienne négociations Conseil Royaumes' },
        { skillId: 'investigation', bonus: 3, reason: 'Formation recherche archives académiques' }
      ],
      gold: 500,  // Ancien: implicite → +500 PO (famille classe moyenne aisée capitale)
      languages: ['Commun', 'Langue du Conseil (diplomatique)', 'Latin Académique'],  // +2 langues
      tags: ['urban', 'civilized', 'political', 'cosmopolitan', 'educated', 'capital']
    },
    social_impacts: {
      npc_reactions: {
        'nobles': 'Respect modéré, attentes compétence (+5 disposition)',
        'paysans': 'Jalousie latente, perception privilégiée (-3 disposition)',
        'gardes': 'Confiance automatique, coopération (+7 disposition)',
        'marchands': 'Affaires facilitées, crédit commercial (+6 disposition)',
        'étrangers': 'Curiosité géopolitique, questions actualité (+4 disposition)'
      },
      first_impression: '« Ah, un enfant de la Capitale Lumineuse ! Vous devez connaître personnellement les grands de ce monde. Parlez-moi des dernières intrigues du Conseil ! »',
      long_term_perception: 'Ambassadeur culturel urbain. Certains admirent sophistication, d\'autres jalousent privilèges naissance. Perçu éduqué, cultivé, mais parfois naïf face dures réalités sauvages.'
    },
    tags: ['urban', 'civilized', 'political', 'cosmopolitan'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_port_azure',
    stage: 'birth',
    category: 'location',
    label: 'Port-Azure, Cité Portuaire',
    desc: 'Né dans la brume salée du plus grand port marchand de la Côte des Tempêtes. Carrefour commercial maritime où fortune et danger s\'entrelacent.',
    detailed_lore: {
      backstory: 'Port-Azure vit au rythme hypnotique des marées et des navires marchands. Ses entrepôts massifs regorgent d\'épices exotiques îles lointaines, soieries rares continents inconnus, artefacts mystérieux profondeurs océaniques. La cité portuaire prospère grâce commerce triangulaire lucratif mais connaît aussi son lot sombre : pirates sanguinaires Côte des Tempêtes, contrebandiers audacieux, cultes marins interdits adorant entités abyssales. Le phare Azur guide navires depuis cinq siècles, mais quartiers portuaires abritent assassins, espions marchands rivaux et créatures marines échouées bizarres.',
      defining_moment: 'À cinq ans impressionnables, vous avez vu un navire fantôme spectral accoster silencieusement au quai maudit désert de la Baie des Naufragés, ses voiles en lambeaux fantomatiques et son équipage introuvable, disparu. Le capitaine du port a ordonné brûler épave immédiatement—mais vous avez aperçu symboles étranges gravés coque avant flammes.',
      worldview_shaped: 'La mer capricieuse donne et reprend sans pitié ni justice. Aucune fortune marchande n\'est garantie éternellement, aucun destin marin n\'est écrit d\'avance. Adaptabilité et audace priment sur planification rigide. Les vagues emportent les faibles, seuls nageurs agiles survivent tempêtes.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { dexterity: 2, wisdom: 2 },  // Ancien: DEX+1 PER+1 → DEX+2 WIS+2
      mechanical_traits: [
        {
          name: 'Pied Marin Aguerri',
          desc: 'Immunité mal de mer, +5 Acrobatie sur navires/cordages, avantage jets équilibre surface mouvante, nage +50% vitesse',
          effect: '+5 Acrobatics (maritime)',  // ×2.5
          game_effect: 'Maîtrise environnement maritime complet + mobilité aquatique'
        },
        {
          name: 'Flair Commercial Portuaire',
          desc: '+1d20 évaluer valeur marchandises exotiques, -20% prix marché noir portuaire, détection contrefaçons/contrebande',
          effect: '+1d20 Appraisal',
          game_effect: 'Bonus d100 commerce maritime + instinct fraude'
        },
        {
          name: 'Contacts Docks',
          desc: 'Réseau initial contrebandiers/marins, +3 Investigation (trafics maritimes), accès informations navires arrivées/départs',
          effect: '+3 Investigation (maritime)',
          game_effect: 'Intelligence réseau portuaire + quêtes navales'
        }
      ],
      reputation: [
        { factionId: 'guildes_marchandes', delta: 6, reason: 'Natif port commercial majeur, connaissance affaires' },
        { factionId: 'pirates_cote_tempetes', delta: 3, reason: 'Connaissance milieu, respect neutre' },
        { factionId: 'marins_honnetes', delta: 5, reason: 'Fraternité gens mer' },
        { factionId: 'cultes_marins', delta: -2, reason: 'Suspicion participation rites secrets (fausse)' }
      ],
      items: [
        { itemId: 'spyglass_bronze_quality', quantity: 1, reason: 'Longue-vue bronze héritage grand-père capitaine' },
        { itemId: 'sea_chart_partial', quantity: 1, reason: 'Carte marine partielle Côte Tempêtes (dangereux récifs)' },
        { itemId: 'sailors_rope_knot_kit', quantity: 1, reason: 'Kit nœuds marins (12 types essentiels survie)' },
        { itemId: 'exotic_shell_necklace', quantity: 1, reason: 'Collier coquillages rares (porte-bonheur marin)' }
      ],
      skills: [
        { skillId: 'navigation', bonus: 5, reason: 'Enfance passée docks, observation marins expérimentés' },  // ×2.5
        { skillId: 'sleight_of_hand', bonus: 3, reason: 'Fréquentation contrebandiers, pickpockets portuaires' },  // ×2.5
        { skillId: 'perception', bonus: 5, reason: 'Vigilance dangers portuaires (pirates, noyades, arnaques)' },
        { skillId: 'swimming', bonus: 5, reason: 'Natation quotidienne eaux portuaires depuis enfance' }
      ],
      gold: 400,  // Ancien: implicite → +400 PO (famille marchande modeste)
      languages: ['Commun', 'Argot des Docks', 'Pidgin Maritime (commercial)'],  // +2 langues
      tags: ['coastal', 'maritime', 'trade', 'adventure', 'smuggler', 'sailor']
    },
    social_impacts: {
      npc_reactions: {
        'marins': 'Fraternité immédiate, partage récits (+10 disposition)',
        'nobles': 'Légère méfiance, odeur sel déplaisante (-2 disposition)',
        'pirates': 'Curiosité, test loyauté potentielle (+5 disposition)',
        'marchands_terres': 'Respect compétence négoce (+4 disposition)',
        'prêtres_continentaux': 'Suspicion superstitions marines (-3 disposition)'
      },
      first_impression: '« Un gars de Port-Azure ! Vous savez nager contre courants et esquiver lames pirates, j\'imagine. Les tempêtes ne vous effraient pas, n\'est-ce pas ? »',
      long_term_perception: 'Marin-né aventureux. Certains admirent audace, d\'autres méfient instabilité. Perçu adaptable, débrouillard, mais parfois peu fiable long terme (mentalité "vent tourne").'
    },
    tags: ['coastal', 'maritime', 'trade', 'adventure'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_ironhold',
    stage: 'birth',
    category: 'location',
    label: 'Bastion-de-Fer, Forteresse Nordique',
    desc: 'Né dans les montagnes glacées du Nord extrême, où résonnent jour et nuit les marteaux titanesques des forgerons légendaires.',
    detailed_lore: {
      backstory: 'Bastion-de-Fer (Járnborg en nordique ancien) est taillée directement dans la roche noire volcanique des Monts Givrés. Les Nordiques stoïques qui l\'habitent sont réputés continentalement pour leur endurance surhumaine, leur métallurgie légendaire (acier nordique incassable) et leur code d\'honneur inflexible gravé runes ancestrales. Chaque hiver brutal (-40°C), clans barbares montagnards descendent pics enneigés pour commercer fourrures/minerais... ou piller colonies faibles. Les forges souterraines brûlent nuit et jour, alimentées geysers volcaniques naturels.',
      defining_moment: 'Lors de votre dixième hiver terrible, blizzard apocalyptique a enseveli moitié forteresse sous 12 mètres neige compacte. Votre clan familial a survécu héroïquement trois semaines complètes en creusant tunnels sous neige avec outils rudimentaires, chassant rats sous-glaciaires et brûlant meubles bois précieux chauffage. Vous avez appris ce jour-là que faiblesse tue, force sauve.',
      worldview_shaped: 'La faiblesse physique/mentale tue invariablement dans ce monde impitoyable. Seuls les forts méritent biologiquement de survivre hivers, et l\'honneur guerrier vaut infiniment plus précieux que tout l\'or empilé. Pitié envers ennemis = insulte. Respect mutuel combattants = sacré.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { strength: 2, constitution: 2 },  // Ancien: STR+1 CON+1
      mechanical_traits: [
        {
          name: 'Né dans le Froid Glacial',
          desc: 'Résistance complète froid naturel, +5 Survival (montagne/arctique), ignore 2 niveaux épuisement environnements glacés',
          effect: '+5 Survival (cold)',  // ×2.5
          game_effect: 'Immunité froid + endurance arctique extrême'
        },
        {
          name: 'Sang Nordique Vigoureux',
          desc: '+10 HP maximum, +3 Intimidation (présence imposante), avantage jets Constitution résister alcool/poisons',
          effect: '+10 HP, +3 Intimidation',
          game_effect: 'Vitalité accrue + aura guerrière naturelle'
        },
        {
          name: 'Formation Forgeron Précoce',
          desc: '+1d20 réparer équipement métallique terrain, connaissance qualité armes/armures (détection failles), maîtrise outils forgeron',
          effect: '+1d20 Repair (metal)',
          game_effect: 'Bonus d100 maintenance équipement + expertise métallurgique'
        }
      ],
      reputation: [
        { factionId: 'clans_nordiques', delta: 10, reason: 'Natif Monts Givrés, frère de sang' },
        { factionId: 'guilde_forgerons', delta: 5, reason: 'Connaissance métallurgique traditionnelle nordique' },
        { factionId: 'barbares_montagne', delta: 4, reason: 'Respect code honneur partagé' },
        { factionId: 'sudistes_delicats', delta: -3, reason: 'Perçu brute barbare inculte' }
      ],
      items: [
        { itemId: 'fur_cloak_wolf', quantity: 1, reason: 'Manteau fourrure loup gris (tradition chasse initiatique)' },
        { itemId: 'runic_hammer_small', quantity: 1, reason: 'Petit marteau gravé runes familiales (symbole clan)' },
        { itemId: 'mead_horn_carved', quantity: 1, reason: 'Corne hydromel sculptée (rituels fraternité)' },
        { itemId: 'flint_steel_quality', quantity: 1, reason: 'Briquet silex-acier qualité (survie garantie feu)' }
      ],
      skills: [
        { skillId: 'survival', bonus: 5, reason: 'Hivers rigoureux montagne depuis naissance' },  // ×2.5
        { skillId: 'intimidation', bonus: 3, reason: 'Culture guerrière nordique, éducation martiale' },  // ×2.5
        { skillId: 'athletics', bonus: 5, reason: 'Escalade montagneuse, natation eaux glacées, course altitude' },
        { skillId: 'crafting_smith', bonus: 3, reason: 'Apprentissage forgeron familial dès 7 ans' }
      ],
      gold: 200,  // Ancien: implicite → +200 PO (culture nordique méprise richesse, valorise honneur)
      languages: ['Commun', 'Nordique (Járnmál)', 'Runique Ancien (lecture partielle)'],  // +2 langues
      tags: ['nordic', 'mountain', 'harsh', 'warrior', 'blacksmith', 'cold']
    },
    social_impacts: {
      npc_reactions: {
        'nordiques': 'Respect fraternel absolu, accueil chaleureux (+12 disposition)',
        'sudistes': 'Crainte physique mêlée fascination exotique (+3 disposition)',
        'elfes': 'Dédain culturel manières brutales, admiration réticente forge (-2 disposition)',
        'nains': 'Respect mutuel artisanat métallique (+6 disposition)',
        'citadins_delicats': 'Peur intimidée, évitement (-5 disposition)'
      },
      first_impression: '« Un Nordique de Bastion-de-Fer ?! J\'espère sincèrement que vous n\'êtes pas ici pour me défier en duel honorable... Votre carrure suffirait écraser ours. »',
      long_term_perception: 'Guerrier-forgeron honorable. Certains respectent code honneur inflexible, d\'autres craignent violence potentielle. Perçu loyal jusqu\'à mort, mais têtu et peu subtil.'
    },
    tags: ['nordic', 'mountain', 'harsh', 'warrior'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_sylvanor',
    stage: 'birth',
    category: 'location',
    label: 'Sylvanor, Cité-Arbre des Elfes',
    desc: 'Né dans les branches millénaires de la Grande Sylve enchantée, où le temps coule différemment et magie imprègne chaque feuille.',
    detailed_lore: {
      backstory: 'Sylvanor n\'est pas une cité construite pierre morte, mais organisme vivant symbiotique. Les arbres-cathédrales titanesques aux troncs larges vingt mètres et hauts trois cents abritent palais sculptés bois vivant, bibliothèques suspendues cordes végétales, jardins aériens miraculeusement flottants. Les elfes millénaires y vivent harmonie parfaite avec nature consciente, pratiquant magie druidique ancestrale et artisanat légendaire (arcs chantants, armures-feuilles) depuis quinze siècles ininterrompus. Le temps s\'écoule étrangement : journées semblent durer semaines contemplatives, années passent comme saisons fugaces.',
      defining_moment: 'Vous avez assisté adolescent à la Floraison Éternelle, rituel magique centenaire où absolument tous les arbres de Sylvanor fleurissent simultanément synchronisés dans explosion aveuglante lumière argentée surnaturelle. Vous avez entendu Voix Sylve murmurer votre nom secret—expérience mystique changea perception réalité à jamais.',
      worldview_shaped: 'Toute vie organique est sacrée interconnectée. Précipitation brutale est propre mortel éphémère ignorant. Patience séculaire et sagesse contemplative triomphent toujours violence impulsive. Arbres vivent millénaires, pourquoi se hâter ? Harmonie prime efficacité.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { wisdom: 2, intelligence: 2 },  // Ancien: WIS+1 PER+1 → WIS+2 INT+2
      mechanical_traits: [
        {
          name: 'Gardien Béni de la Sylve',
          desc: '+5 Nature et +5 Arcana (magie nature), communication empathique télépathique avec plantes conscientes, détection perturbations forestières 1km',
          effect: '+5 Nature, +5 Arcana',  // ×2.5
          game_effect: 'Synergie druidique/magique avancée + sens forestier surnaturel'
        },
        {
          name: 'Grâce Elfique Héritée',
          desc: '+3 Acrobatics (déplacement arboricole), avantage jets Stealth forêts, vision crépusculaire (pénombre = lumière), immunité sommeil magique',
          effect: '+3 Acrobatics',
          game_effect: 'Mobilité arboricole + avantages raciaux elfiques partiels'
        },
        {
          name: 'Patience Millénaire Enseignée',
          desc: '+1d20 résister charme/terreur (sérénité mentale), +5 Insight détecter mensonges (lecture micro-expressions), méditation récupère sorts mineurs',
          effect: '+1d20 Mental Save, +5 Insight',
          game_effect: 'Résilience mentale exceptionnelle + empathie profonde'
        }
      ],
      reputation: [
        { factionId: 'elfes_sylvanor', delta: 10, reason: 'Natif Cité-Arbre, enfant béni Sylve' },
        { factionId: 'cercle_druides', delta: 7, reason: 'Éducation sylvestre profonde, initiation mystères' },
        { factionId: 'fey_creatures', delta: 5, reason: 'Familiarité créatures féériques frontière' },
        { factionId: 'bucherons_humains', delta: -4, reason: 'Opposition philosophique exploitation forestière' }
      ],
      items: [
        { itemId: 'leaf_charm_silveroak', quantity: 1, reason: 'Talisman feuille chêne argenté (protection Sylve)' },
        { itemId: 'elven_waybread_lembas', quantity: 5, reason: 'Pain voyage elfique (1 portion = 1 jour sustentation)' },
        { itemId: 'moonstone_pendant', quantity: 1, reason: 'Pendentif pierre lune (lueur douce nuit, cadeau coming-of-age)' },
        { itemId: 'flute_living_wood', quantity: 1, reason: 'Flûte bois vivant (musique apaise animaux sauvages)' }
      ],
      skills: [
        { skillId: 'nature', bonus: 5, reason: 'Enfance immersion totale Grande Sylve, enseignements druides' },  // ×2.5
        { skillId: 'arcana', bonus: 5, reason: 'Exposition quotidienne magie elfique, bibliothèques arcanes' },  // ×2.5
        { skillId: 'medicine', bonus: 3, reason: 'Connaissance herbes médicinales forestières, remèdes elfiques' },
        { skillId: 'insight', bonus: 5, reason: 'Méditation contemplative, lecture émotions subtiles' }
      ],
      gold: 300,  // Ancien: implicite → +300 PO (elfes méprisent or, mais artisanat vaut fortune)
      languages: ['Commun', 'Elfique (Sylvan High)', 'Druidique (rituel)', 'Sylvan (fey dialect)'],  // +3 langues
      tags: ['elven', 'forest', 'magical', 'timeless', 'nature', 'fey']
    },
    social_impacts: {
      npc_reactions: {
        'elfes': 'Accueil chaleureux familial, hospitalité généreuse (+12 disposition)',
        'nains': 'Rivalité philosophique cordiale, respect artisanal mutuel (+2 disposition)',
        'humains': 'Admiration envieuse, fascination exotique (+7 disposition)',
        'druides': 'Fraternité spirituelle immédiate (+10 disposition)',
        'orcs': 'Hostilité culturelle ancestrale (-8 disposition)',
        'citadins_urbains': 'Incompréhension modes vie, curiosité naïve (+3 disposition)'
      },
      first_impression: '« Un enfant de Sylvanor enchantée... Vous devez trouver nos vies mortelles brèves bien brèves et agitées, n\'est-ce pas ? Votre regard porte poids siècles. »',
      long_term_perception: 'Sage forestier mystique. Certains admirent connexion nature, d\'autres irrités lenteur décisions. Perçu patient, sage, mais parfois détaché urgences mortelles.'
    },
    tags: ['elven', 'forest', 'magical', 'timeless'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_karak_dun',
    stage: 'birth',
    category: 'location',
    label: 'Karak-Dûn, Citadelle Souterraine Naine',
    desc: 'Né dans les galeries infinies labyrinthiques sous montagnes, là où l\'or coule comme eau et gemmes brillent comme étoiles souterraines.',
    detailed_lore: {
      backstory: 'Karak-Dûn (Forteresse-Enclume en nanique ancien) s\'enfonce vertigineusement sur douze niveaux architecturaux sous le Mont Enclume sacré. Les nains méticuleux y extraient métaux précieux (or, argent, platine) et gemmes rares (diamants, rubis, émeraudes) depuis trois millénaires exploitation continue. Leurs forges magistrales produisent meilleures armes/armures continent entier : épées incassables, armures plates impénétrables, bijoux runiques enchantés. Mais galeries profondes dangereuses (niveaux 10-12) abritent aussi créatures anciennes oubliées (aberrations, élémentaires corrompus) et secrets nains interdits (ruines civilisation précurseur, veines mythril maudit).',
      defining_moment: 'À sept ans initiatiques, vous avez accompagné votre oncle mineur vétéran découvrir veine mythril pur miraculeux niveau 8. Filon argenté brillait lueur surnaturelle pulsante, illuminant caverne entière. Toute citadelle naine a célébré découverte pendant trois jours fériés (fête Marteau Béni), bière coula flots, chants résonnèrent halls.',
      worldview_shaped: 'La roche montagne ne ment jamais, contrairement paroles trompeuses. Travail acharné discipline forge destins durables. Chaque trésor précieux s\'arrache montagne implacable pierre après pierre, sueur après sueur. Raccourcis mènent désastre, patience mène richesse.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { constitution: 2, strength: 2 },  // Ancien: CON+1 STR+1
      stats_penalty: { charisma: 2 },  // Ancien: DEX-1 → CHA-2 (rude manières souterraines)
      mechanical_traits: [
        {
          name: 'Fils Éternel de la Pierre',
          desc: 'Vision ténèbres complète 25m (darkvision), +5 Perception détecter passages secrets/pièges pierre, sens orientation souterrain infaillible',
          effect: '+5 Perception (underground)',  // ×2.5
          game_effect: 'Maîtrise exploration souterraine totale + sécurité donjons'
        },
        {
          name: 'Maître-Forgeron Héritier',
          desc: '+5 Crafting (métallurgie/joaillerie), +1d20 évaluer qualité gemmes/métaux, réparations équipement 50% plus rapide',
          effect: '+5 Crafting, +1d20 Appraisal (gems)',
          game_effect: 'Expertise artisanale légendaire + commerce gemmes'
        },
        {
          name: 'Endurance Naine Légendaire',
          desc: '+15 HP maximum, résistance poisons/maladies, ignore 2 niveaux épuisement, avantage jets Constitution marathon',
          effect: '+15 HP',
          game_effect: 'Vitalité surhumaine + stamina inépuisable'
        }
      ],
      reputation: [
        { factionId: 'nains_karak_dun', delta: 12, reason: 'Natif citadelle, membre clan respecté' },
        { factionId: 'guilde_forgerons', delta: 8, reason: 'Tradition métallurgique familiale séculaire' },
        { factionId: 'marchands_gemmes', delta: 5, reason: 'Connaissance expertise pierres précieuses' },
        { factionId: 'elfes_surface', delta: -3, reason: 'Rivalité culturelle philosophique ancestrale' }
      ],
      items: [
        { itemId: 'mining_pick_runic', quantity: 1, reason: 'Pioche minière runique héritage paternel (indéstructible)' },
        { itemId: 'gemstone_raw_ruby', quantity: 1, reason: 'Rubis brut première extraction personnelle (souvenir)' },
        { itemId: 'smithing_hammer_apprentice', quantity: 1, reason: 'Marteau forgeron apprenti (initiation 10 ans)' },
        { itemId: 'ale_keg_small', quantity: 1, reason: 'Petit fût bière naine traditionnelle (12% alcool)' }
      ],
      skills: [
        { skillId: 'mining', bonus: 5, reason: 'Enfance passages souterrains, extraction minerais quotidienne' },  // ×2.5
        { skillId: 'crafting_smith', bonus: 5, reason: 'Apprentissage forgeron maître depuis 8 ans' },  // ×2.5
        { skillId: 'stoneworking', bonus: 5, reason: 'Sculpture pierre, architecture monumentale naine' },
        { skillId: 'perception', bonus: 5, reason: 'Vigilance éboulements, gaz toxiques, créatures ténèbres' }
      ],
      gold: 600,  // Ancien: implicite → +600 PO (famille mineurs prospères, gemmes réserves)
      languages: ['Commun', 'Nanique (Khazad)', 'Runique Nain (écriture sacrée)'],  // +2 langues
      tags: ['dwarven', 'underground', 'crafting', 'resilient', 'miner', 'smith']
    },
    social_impacts: {
      npc_reactions: {
        'nains': 'Confiance absolue fraternelle, hospitalité légendaire (+15 disposition)',
        'elfes': 'Respect réticent artisanat, irritation lenteur décisions (+1 disposition)',
        'gobelins': 'Haine raciale ancestrale génocidaire mutuelle (-20 disposition)',
        'humains': 'Admiration compétence, amusement taille (-2 disposition, +5 respect)',
        'marchands': 'Crédit commercial excellent, fiabilité légendaire (+8 disposition)'
      },
      first_impression: '« Un nain de Karak-Dûn légendaire ! Alors c\'est vrai légende que vous naissez littéralement avec marteau mains ? Montrez-moi artisanat réputé ! »',
      long_term_perception: 'Artisan-guerrier inébranlable. Certains admirent loyauté clanique, d\'autres irrités obstination. Perçu fiable, compétent, mais parfois avare et rancunier (grudges éternels).'
    },
    tags: ['dwarven', 'underground', 'crafting', 'resilient'],
    incompatible_with: []
  },

  // ===== VILLAGES & CAMPAGNE (10) =====
  {
    id: 'birth_loc_petit_village_frontiere',
    stage: 'birth',
    category: 'location',
    label: 'Petit Village de Frontière Isolé',
    desc: 'Né dans hameau perdu isolé où loups hurlent affamés chaque nuit et pillards passent saccager chaque été meurtrier.',
    detailed_lore: {
      backstory: 'Votre village natal comptait peine cinquante âmes courageuses. Fermiers acharnés labouraient champs rocailleux ingrats entourés forêts sombres menaçantes. Chaque récolte maigre était victoire désespérée contre famine rampante, chaque hiver glacé épreuve survie collective. Nouvelles monde extérieur civilisé arrivaient avec trois mois retard via colporteurs rares. Palissade bois protégeait partiellement attaques gobelins, bandits, loups géants. Vie simple, dure, solidarité vitale.',
      defining_moment: 'Vous aviez douze ans traumatisés quand bande bandits armés a attaqué violemment village aube. Votre père et autres hommes valides ont repoussé héroïquement assaut sanglant avec fourches agricoles, faux, haches bois. Trois familles ont tout perdu (maisons brûlées, récoltes volées). Vous avez juré ce jour-là protéger faibles, punir prédateurs.',
      worldview_shaped: 'Le monde sauvage est impitoyablement dur sans merci. Faibles isolés périssent rapidement, forts organisés survivent ensemble. Seule communauté soudée peut protéger efficacement contre ténèbres hostiles omniprésentes. Lois villes lointaines importent peu—survie immédiate prime.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { constitution: 2, wisdom: 2 },  // Ancien: CON+1 WIL+1
      mechanical_traits: [
        {
          name: 'Sang Paysan Robuste',
          desc: '+5 Survival tous environnements, +5 Medicine (herbes/remèdes traditionnels), résistance maladies communes, ignore 1 niveau épuisement',
          effect: '+5 Survival, +5 Medicine',  // ×2.5
          game_effect: 'Endurance accrue + connaissance nature pratique'
        },
        {
          name: 'Communauté Forgée Épreuves',
          desc: '+1d20 jets défendre alliés/innocents (rage protectrice), avantage rallier villageois/paysans cause juste',
          effect: '+1d20 Protect Allies',
          game_effect: 'Bonus d100 quêtes protectrices + leadership populaire'
        },
        {
          name: 'Débrouillardise Frontière',
          desc: '+3 Crafting (outils improvisés), réparations basiques sans matériaux, cuisine rations survie immangeables comestibles',
          effect: '+3 Crafting (improvised)',
          game_effect: 'Ingéniosité ressources limitées'
        }
      ],
      reputation: [
        { factionId: 'paysans_frontiere', delta: 10, reason: 'Origine commune, solidarité fraternelle' },
        { factionId: 'milice_locale', delta: 5, reason: 'Respect défense communautaire' },
        { factionId: 'nobles_distants', delta: -3, reason: 'Mépris origines humbles' }
      ],
      items: [
        { itemId: 'wooden_club_reinforced', quantity: 1, reason: 'Gourdin bois renforcé arme improvisée jeunesse' },
        { itemId: 'herb_pouch_basic', quantity: 1, reason: 'Sacoche herbes médicinales basiques (tradition grand-mère)' },
        { itemId: 'rope_hemp_sturdy', quantity: 10, reason: 'Corde chanvre robuste (multi-usage ferme)' },
        { itemId: 'rations_dried_peasant', quantity: 5, reason: 'Rations séchées paysannes (viande salée, pain dur)' }
      ],
      skills: [
        { skillId: 'survival', bonus: 5, reason: 'Vie rude frontière sauvage depuis naissance' },  // ×2.5
        { skillId: 'medicine', bonus: 5, reason: 'Remèdes traditionnels herbes, premiers soins urgence' },  // ×2.5
        { skillId: 'animal_handling', bonus: 3, reason: 'Élevage bétail, chasse gibier forêts' },
        { skillId: 'athletics', bonus: 3, reason: 'Travaux ferme physiques quotidiens' }
      ],
      gold: 50,  // Ancien: implicite → +50 PO (pauvreté extrême paysanne)
      languages: ['Commun', 'Dialecte Régional Rural'],  // +1 langue (limité isolement)
      tags: ['rural', 'frontier', 'humble', 'resilient', 'peasant', 'survivor']
    },
    social_impacts: {
      npc_reactions: {
        'paysans': 'Solidarité immédiate chaleureuse, entraide naturelle (+12 disposition)',
        'nobles': 'Condescendance méprisante, ignorance délibérée (-6 disposition)',
        'citadins': 'Mépris larvé "bouseux", préjugés inculture (-4 disposition)',
        'aventuriers': 'Respect résilience, admiration courage (+5 disposition)',
        'bandits': 'Sous-estimation dangereuse (cible facile présumée, -3 disposition)'
      },
      first_impression: '« Un paysan frontière ? Au moins, vous savez réellement ce que travailler durement signifie. Pas comme citadins ramollis. »',
      long_term_perception: 'Survivant courageux. Certains admirent ténacité, d\'autres méprisent origines. Perçu loyal, travailleur, mais parfois naïf face intrigues urbaines sophistiquées.'
    },
    tags: ['rural', 'frontier', 'humble', 'resilient'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_monastere_montagne',
    stage: 'birth',
    category: 'location',
    label: 'Monastère du Sommet Silencieux',
    desc: 'Né dans sanctuaire ascétique isolé où moines méditent illumination depuis générations séculaires.',
    detailed_lore: {
      backstory: 'Le Monastère du Sommet Silencieux surplombe vallées brumeuses depuis pic inaccessible 3000m altitude. Accessible uniquement via escalier mille marches taillées falaise vertigineuse (pèlerinage 6h montée). Moines ascètes y vivent retrait total monde matériel, pratiquant arts martiaux disciplinés (combat mains nues, maîtrise ki) et méditation transcendante pour atteindre illumination spirituelle. Silence absolu règle principale : paroles autorisées uniquement enseignements maîtres. Température permanente -5°C, nourriture frugale (riz, légumes, thé). Vie austère forge esprit acier, corps arme vivante.',
      defining_moment: 'À huit ans impressionnables, Grand Maître centenaire vous a murmuré énigme : "Montagne enseigne patience pierre. Silence parle vérités cachées. Écoute vide, comprends plein." Vous avez passé mois entier méditation solitaire profonde dans grotte glacée noire—expérience transforma perception réalité.',
      worldview_shaped: 'L\'équilibre cosmique est fondement tout existence. Corps et esprit doivent être parfaitement un harmonieux. Violence physique n\'est moralement légitime strictement que pour protéger innocents opprimés. Attachements matériels enchaînent âme, détachement libère potentiel infini.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { wisdom: 4 },  // Ancien: WIS+2 (méditati intensive)
      mechanical_traits: [
        {
          name: 'Discipline Monastique Transcendante',
          desc: '+3 CA naturelle sans armure (techniques esquive ki), +5 Concentration résister interruptions sorts, avantage jets Initiative (réflexes entraînés)',
          effect: '+3 AC, +5 Concentration',  // ×2.5
          game_effect: 'Défense naturelle surhumaine + focus mental inébranlable'
        },
        {
          name: 'Maîtrise Ki Débutant',
          desc: '+1d20 jets sauvetage Sagesse/Constitution (discipline intérieure), 1/jour: décharge ki (+10 dégâts attaque mains nues ou saut 6m vertical)',
          effect: '+1d20 WIS/CON Save, Ki Strike',
          game_effect: 'Bonus d100 résistance mentale/physique + capacité surnaturelle'
        },
        {
          name: 'Ascèse Illuminée',
          desc: 'Besoin sommeil réduit 4h/jour, besoin nourriture réduit 50%, immunité peur magique (sérénité), méditation = repos court',
          effect: 'Reduced Needs',
          game_effect: 'Autonomie accrue + efficacité récupération'
        }
      ],
      reputation: [
        { factionId: 'ordre_moines', delta: 10, reason: 'Élevé monastère, initié voie illumination' },
        { factionId: 'temples_divers', delta: 5, reason: 'Respect discipline spirituelle universelle' },
        { factionId: 'philosophes', delta: 6, reason: 'Admiration sagesse contemplative' }
      ],
      items: [
        { itemId: 'meditation_beads_jade', quantity: 1, reason: 'Chapelet jade 108 perles novice (compte mantras)' },
        { itemId: 'monks_robes_simple', quantity: 1, reason: 'Robe moine simple lin (badge ordre)' },
        { itemId: 'incense_sandalwood', quantity: 10, reason: 'Encens bois santal méditation (facilite transe)' },
        { itemId: 'scroll_wisdom_quote', quantity: 1, reason: 'Parchemin citation sagesse Grand Maître (inspiration)' }
      ],
      skills: [
        { skillId: 'insight', bonus: 5, reason: 'Formation contemplative lecture âmes humaines' },  // ×2.5
        { skillId: 'athletics', bonus: 5, reason: 'Entraînement martial quotidien rigoureux (kata, combat)' },  // ×2.5
        { skillId: 'acrobatics', bonus: 5, reason: 'Techniques esquive, équilibre, chutes contrôlées' },
        { skillId: 'medicine', bonus: 3, reason: 'Connaissance pression points, premiers soins ki' }
      ],
      gold: 0,  // Ancien: implicite → 0 PO (vœu pauvreté absolue)
      languages: ['Commun', 'Langue Ancienne (textes sacrés)', 'Code Gestuel Monastique'],  // +2 langues
      tags: ['spiritual', 'ascetic', 'disciplined', 'mountain', 'monk', 'martial']
    },
    social_impacts: {
      npc_reactions: {
        'religieux': 'Respect profond révérenciel, déférence spirituelle (+10 disposition)',
        'mercenaires': 'Incompréhension totale motivations, méfiance (+0 disposition)',
        'sages': 'Admiration intellectuelle, curiosité philosophique (+8 disposition)',
        'nobles': 'Fascination exotique, invitation débats (+4 disposition)',
        'criminels': 'Évitement prudent, superstition pouvoirs ki (-2 disposition)'
      },
      first_impression: '« Un disciple du Sommet Silencieux ? Votre regard porte profondeur troublante océan. Vous percevez mensonges âmes, n\'est-ce pas ? »',
      long_term_perception: 'Sage-guerrier mystique. Certains admirent équilibre, d\'autres irrités détachement. Perçu sage, juste, mais parfois trop idéaliste face réalités cruelles.'
    },
    tags: ['spiritual', 'ascetic', 'disciplined', 'mountain'],
    incompatible_with: []
  },

  // ===== DÉSERTS (3) =====
  {
    id: 'birth_loc_oasis_marchande',
    stage: 'birth',
    category: 'location',
    label: 'Oasis Marchande du Désert de Feu',
    desc: 'Né dans rare havre verdoyant au cœur désert impitoyable, carrefour caravanes commerciales transcontinentales.',
    detailed_lore: {
      backstory: 'L\'Oasis al-Rashid (Perle des Sables) est miracle survie désertique : source eau pure éternelle alimentée nappe phréatique magique, palmeraies luxuriantes ombragées, jardins suspendus irrigués ingénieusement. Position stratégique Route Épices fait carrefour commercial vital : caravanes chameaux chargées soieries orientales, épices rares, gemmes exotiques s\'y arrêtent obligatoirement ravitailler avant traversée mortelle 20 jours Désert Feu (températures 55°C jour, tempêtes sable aveuglantes). Ville fortifiée murs adobe accueille marchands nomades, contrebandiers, espions diplomates, aventuriers fous cherchant ruines englouties sable. Nuits fraîches résonnent musiques orientales, parfums jasmin, négociations âpres.',
      defining_moment: 'À neuf ans, vous avez vu caravane perdue 40 jours désert arriver mourante : 3 survivants sur 50, délirants soif, racontant créature sable titanesque dévorant chameaux. Vous avez compris ce jour-là : désert ne pardonne jamais faiblesse, seuls préparés survivent implacable.',
      worldview_shaped: 'Eau vaut plus or—vie dépend ressources rares précieuses. Adaptabilité climat extrême prime force brute. Hospitalité sacrée loi absolue désert : refuser eau voyageur = meurtre. Marchands honorables respectent parole donnée plus serments écrits.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { constitution: 2, charisma: 2 },
      mechanical_traits: [
        {
          name: 'Enfant du Désert Brûlant',
          desc: 'Résistance complète chaleur naturelle, besoin eau réduit 50%, +5 Survival (désert/aride), ignore 2 niveaux épuisement chaleur',
          effect: '+5 Survival (desert)',
          game_effect: 'Immunité chaleur + endurance désertique extrême'
        },
        {
          name: 'Flair Mercantile Caravanes',
          desc: '+5 Persuasion (négociation commerciale), +1d20 évaluer valeur marchandises exotiques, connaissance Route Épices (itinéraires secrets)',
          effect: '+5 Persuasion, +1d20 Appraisal',
          game_effect: 'Expertise commerce caravanes + géographie désert'
        },
        {
          name: 'Navigation Stellaire Héritée',
          desc: '+3 Navigation (déserts/nuit), lecture étoiles orientation infaillible, détection tempêtes sable 6h avance',
          effect: '+3 Navigation (stars)',
          game_effect: 'Orientation désertique surnaturelle + survie tempêtes'
        }
      ],
      reputation: [
        { factionId: 'marchands_caravanes', delta: 8, reason: 'Natif oasis, connaissance commerciale' },
        { factionId: 'nomades_desert', delta: 6, reason: 'Respect lois hospitalité sacrées' },
        { factionId: 'guilde_eau', delta: 5, reason: 'Compréhension valeur vitale eau' }
      ],
      items: [
        { itemId: 'water_skin_large', quantity: 2, reason: 'Outres eau cuir qualité (4L chacune, survie)' },
        { itemId: 'desert_veil_silk', quantity: 1, reason: 'Voile soie protection tempêtes sable (tradition nomade)' },
        { itemId: 'compass_magnetic_bronze', quantity: 1, reason: 'Boussole bronze navigation désert' },
        { itemId: 'spices_rare_pouch', quantity: 1, reason: 'Sacoche épices rares (safran, cardamome, valeur 100 PO)' }
      ],
      skills: [
        { skillId: 'survival', bonus: 5, reason: 'Vie désert hostile depuis naissance' },
        { skillId: 'persuasion', bonus: 5, reason: 'Négociations marchandes quotidiennes caravanes' },
        { skillId: 'animal_handling', bonus: 3, reason: 'Dressage chameaux, chevaux désert' },
        { skillId: 'navigation', bonus: 3, reason: 'Lecture étoiles, orientation dunes mouvantes' }
      ],
      gold: 400,
      languages: ['Commun', 'Langue Désertique (al-Sahra)', 'Argot Marchands Caravanes'],
      tags: ['desert', 'trade', 'nomadic', 'harsh', 'mercantile', 'survivor']
    },
    social_impacts: {
      npc_reactions: {
        'marchands': 'Respect mutuel, affaires facilitées (+8 disposition)',
        'nomades_desert': 'Fraternité immédiate, hospitalité sacrée (+10 disposition)',
        'citadins_nordiques': 'Fascination exotique, incompréhension climat (+4 disposition)',
        'pirates_eau': 'Confusion comique concept piraterie sable (+2 disposition)'
      },
      first_impression: '« Un enfant de l\'Oasis al-Rashid ! Vous connaissez Route Épices ? Vendez-vous safran qualité ? »',
      long_term_perception: 'Marchand-survivant désertique. Certains admirent résilience, d\'autres méfient marchandages. Perçu endurant, débrouillard, hospitalier.'
    },
    tags: ['desert', 'trade', 'nomadic', 'harsh'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_cite_sables',
    stage: 'birth',
    category: 'location',
    label: 'Cité des Sables Perdus (Ruines Anciennes)',
    desc: 'Né dans mystérieuses ruines civilisation disparue, redécouvertes archéologues aventuriers trois générations passées.',
    detailed_lore: {
      backstory: 'Zhar-Kareem (Joyau Enseveli) fut capitale empire millénaire disparu il y a 2000 ans cataclysme magique inconnu. Redécouverte récente révéla architecture titanesque : pyramides échelonnées 100m hauteur, obélisques gravés glyphes indéchiffrables, palais cristal rose intact mystérieusement. Colonie archéologues, chercheurs trésors, mages étudiant artefacts anciens établit campement permanent exploiter site. Vous êtes né ce lieu étrange où passé côtoie présent : parents archéologues obsédés déchiffrer secrets, vous jouiez enfant tombeaux royaux, dormiez ombre statues colossales divinités oubliées. Nuits, lueurs fantomatiques dansent ruines, murmures langues mortes résonnent couloirs.',
      defining_moment: 'À dix ans, vous avez découvert chambre funéraire intacte contenant sarcophage pharaon. Ouvrir couvercle révéla momie parfaitement conservée tenant orbe cristal pulsant. Vous avez touché—vision fulgurante montra chute empire : ciel déchiré, magie déchaînée, millions âmes hurlantes. Vous avez lâché orbe terrorisé, mais vision hante encore.',
      worldview_shaped: 'Toutes civilisations finissent poussière sable. Gloire, puissance, magie—rien n\'est éternel. Passé recèle secrets dangereux autant que trésors. Curiosité intellectuelle prime superstition, mais prudence conserve vie face inconnu ancien.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { intelligence: 4 },
      mechanical_traits: [
        {
          name: 'Archéologue Né Ruines',
          desc: '+5 Investigation (ruines/donjons), +5 History (civilisations anciennes), +1d20 déchiffrer glyphes/langues mortes, détection pièges magiques anciens',
          effect: '+5 Investigation, +5 History, +1d20 Decipher',
          game_effect: 'Expertise exploration donjons + connaissance historique profonde'
        },
        {
          name: 'Familiarité Artefacts Anciens',
          desc: '+3 Arcana (identification magie ancienne), avantage jets sauvegarder malédictions artefacts, intuition dangers tombeaux',
          effect: '+3 Arcana',
          game_effect: 'Résistance malédictions + instinct sécurité archéologique'
        },
        {
          name: 'Trésor Enfoui Découverte',
          desc: 'Commence avec 1 artefact mineur ancien (amulette protection +1 AC, ou anneau langues, ou baguette lumière), valeur 500 PO',
          effect: 'Artefact mineur',
          game_effect: 'Item magique départ unique'
        }
      ],
      reputation: [
        { factionId: 'archeologues', delta: 10, reason: 'Natif site majeur, connaissance terrain' },
        { factionId: 'mages_recherche', delta: 6, reason: 'Accès artefacts rares étude' },
        { factionId: 'pilleurs_tombes', delta: 4, reason: 'Respect expertise ruines (rivalité potentielle)' },
        { factionId: 'gardiens_histoire', delta: -3, reason: 'Suspicion exploitation commerciale patrimoine' }
      ],
      items: [
        { itemId: 'ancient_amulet_minor', quantity: 1, reason: 'Amulette ancienne trouvée tombeau (protection +1 AC)' },
        { itemId: 'map_ruins_partial', quantity: 1, reason: 'Carte partielle niveaux supérieurs Zhar-Kareem' },
        { itemId: 'toolkit_archaeologist', quantity: 1, reason: 'Outils archéologue (pinceaux, pics délicats, loupe)' },
        { itemId: 'journal_glyphs', quantity: 1, reason: 'Journal déchiffrage glyphes parents (indices)' }
      ],
      skills: [
        { skillId: 'investigation', bonus: 5, reason: 'Fouilles archéologiques, recherche indices ruines' },
        { skillId: 'history', bonus: 5, reason: 'Éducation civilisations anciennes, mythologie perdue' },
        { skillId: 'arcana', bonus: 3, reason: 'Exposition artefacts magiques anciens quotidienne' },
        { skillId: 'perception', bonus: 5, reason: 'Vigilance pièges tombeaux, dangers ruines' }
      ],
      gold: 300,
      languages: ['Commun', 'Langue Ancienne (Zhar-Kareem, partiel)', 'Glyphes Funéraires (lecture basique)'],
      tags: ['ancient', 'ruins', 'scholarly', 'cursed', 'archaeological', 'mysterious']
    },
    social_impacts: {
      npc_reactions: {
        'archeologues': 'Accueil enthousiaste, collaboration recherche (+12 disposition)',
        'mages': 'Curiosité intense, questions incessantes artefacts (+8 disposition)',
        'pilleurs_tombes': 'Respect compétence, proposition partenariat (+5 disposition)',
        'superstitieux': 'Peur malédictions, évitement prudent (-6 disposition)',
        'nobles_collectionneurs': 'Intérêt acquisition artefacts, propositions achat (+7 disposition)'
      },
      first_impression: '« Vous venez Zhar-Kareem mystérieuse ?! Avez-vous vu fantômes pharaons ? Possédez-vous artefacts maudits ? »',
      long_term_perception: 'Érudit-aventurier hanté passé. Certains admirent savoir, d\'autres craignent malédictions portées. Perçu intelligent, curieux, mais parfois obsédé secrets dangereux.'
    },
    tags: ['ancient', 'ruins', 'scholarly', 'cursed'],
    incompatible_with: []
  },

  // ===== JUNGLES (2) =====
  {
    id: 'birth_loc_village_tribal',
    stage: 'birth',
    category: 'location',
    label: 'Village Tribal de la Jungle Émeraude',
    desc: 'Né tribu ancestrale cœur jungle impénétrable, vivant harmonie totale nature sauvage hostile.',
    detailed_lore: {
      backstory: 'Votre tribu, les Jaguar-Ombres (Yax-Balam), habite jungle Émeraude depuis vingt générations. Villages arboricoles perchés 30m hauteur canopée, reliés ponts lianes tressées, invisibles sol. Tribu vit chasse (jaguars, singes, tapirs), cueillette (fruits exotiques, plantes médicinales), pêche rivières infestées piranhas. Chamans communiquent esprits jungle, guerriers maîtrisent sarbacanes poison paralysant mortel (venin grenouilles dendrobates dorées). Rites initiation incluent chasse solitaire jaguar noir 7 jours forêt—preuve courage adulte. Contact civilisation extérieure limité commerçants rares échangeant plumes rares, jade contre outils métalliques. Jungle tuteur impitoyable : erreur = mort (serpents venimeux, insectes géants, fièvres tropicales mortelles).',
      defining_moment: 'Lors rite initiation 14 ans, perdu 5 jours jungle seul sans provisions, vous avez survécu mangeant larves, buvant rosée feuilles, échappant anaconda 8m. Nuit finale, jaguar noir apparut, vous fixa—puis disparut ombres. Chamans déclarèrent esprit jaguar vous adopta protecteur.',
      worldview_shaped: 'Jungle est mère nourricière cruelle : elle donne tout nécessaire mais punit impitoyablement faibles. Respect esprits nature garantit survie, arrogance humaine mène extinction. Force individuelle moins importante cohésion tribale. Technologie métallique fascine mais jungle enseigne mieux.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { dexterity: 2, wisdom: 2 },
      mechanical_traits: [
        {
          name: 'Maître Jungle Émeraude',
          desc: '+5 Survival (jungle/tropical), +5 Stealth (forêt dense), mouvement arboricole double vitesse, immunité maladies tropicales communes',
          effect: '+5 Survival, +5 Stealth',
          game_effect: 'Domination environnement jungle totale + mobilité canopée'
        },
        {
          name: 'Chasseur Tribal Aguerri',
          desc: '+3 Perception (pistage), maîtrise sarbacane (+5 attaque poison), connaissance poisons naturels (paralysants, somnifères, mortels)',
          effect: '+3 Perception, Blowgun Mastery',
          game_effect: 'Pistage expert + armes exotiques tribales'
        },
        {
          name: 'Lien Esprit Jaguar',
          desc: '+1d20 jets impliquant félins (communication basique, apaisement), vision nocturne améliорée 20m, sens danger prédateurs',
          effect: '+1d20 Feline Affinity',
          game_effect: 'Bonus d100 interactions félins + sens bestial'
        }
      ],
      reputation: [
        { factionId: 'tribus_jungle', delta: 12, reason: 'Membre respecté Yax-Balam, rite initiation accompli' },
        { factionId: 'druides', delta: 6, reason: 'Harmonie nature reconnue' },
        { factionId: 'chasseurs', delta: 5, reason: 'Compétence pistage admirée' },
        { factionId: 'citadins', delta: -4, reason: 'Perçu sauvage incivilisé' }
      ],
      items: [
        { itemId: 'blowgun_tribal', quantity: 1, reason: 'Sarbacane bois noir tribal (portée 30m, silencieuse)' },
        { itemId: 'poison_darts', quantity: 20, reason: 'Fléchettes poison paralysant (CON DC 15, paralysie 1h)' },
        { itemId: 'jaguar_tooth_necklace', quantity: 1, reason: 'Collier dent jaguar noir (trophée initiation, symbole adulte)' },
        { itemId: 'healing_herbs_jungle', quantity: 5, reason: 'Herbes médicinales jungle (soigne 1d8+2 HP chacune)' }
      ],
      skills: [
        { skillId: 'survival', bonus: 5, reason: 'Vie jungle hostile depuis naissance, rite initiation solitaire' },
        { skillId: 'stealth', bonus: 5, reason: 'Chasse silencieuse canopée, techniques camouflage tribal' },
        { skillId: 'perception', bonus: 3, reason: 'Pistage proies, vigilance prédateurs jungle' },
        { skillId: 'athletics', bonus: 5, reason: 'Escalade arbres, nage rivières rapides, course lianes' }
      ],
      gold: 100,
      languages: ['Commun (basique)', 'Tribal Yax-Balam', 'Langage Bestial (félins, rudimentaire)'],
      tags: ['tribal', 'jungle', 'primitive', 'hunter', 'spiritual', 'wild']
    },
    social_impacts: {
      npc_reactions: {
        'tribus_jungle': 'Fraternité immédiate, hospitalité chaleureuse (+15 disposition)',
        'druides': 'Respect connexion nature, curiosité traditions (+8 disposition)',
        'citadins': 'Peur primitive, fascination voyeuriste (-3 disposition, +4 curiosité)',
        'nobles': 'Dégoût manières sauvages, exotisme amusant (-5 disposition)',
        'chasseurs': 'Admiration compétence, demande enseignement (+10 disposition)'
      },
      first_impression: '« Un tribal Jungle Émeraude ?! Ces marques faciales... Vous avez vraiment chassé jaguar noir seul ? Impressionnant et terrifiant. »',
      long_term_perception: 'Chasseur-chaman sauvage. Certains admirent compétences survie, d\'autres craignent primitivité. Perçu agile, dangereux, spirituel, mais inadapté intrigues urbaines.'
    },
    tags: ['tribal', 'jungle', 'primitive', 'hunter'],
    incompatible_with: []
  },

  // ===== ÎLES (3) =====
  {
    id: 'birth_loc_archipel_pirate',
    stage: 'birth',
    category: 'location',
    label: 'Archipel Pirate de Libertalia',
    desc: 'Né république pirates anarchique où lois maritimes remplacent codes terrestres obsolètes.',
    detailed_lore: {
      backstory: 'Libertalia (Port-Libre) : archipel 50 îles volcaniques colonisé pirates révoltés il y a 80 ans. Démocratie pirate radicale : capitaines élus équipages, butin partagé équitablement, aucune noblesse héréditaire. Port principal accueille navires hors-la-loi monde entier : forbans caribéens, corsaires déchus, flibustiers recherchés. Économie basée pillage navires marchands, contrebande, rançons. Mais Code Pirate strict : trahison = pendaison, lâcheté = bannissement, vol entre pirates = fouet. Enfance inhabituelle : apprentissage navigation 5 ans, première abordage 12 ans, maîtrise sabres/pistolets adolescence. Liberté absolue contrepartie danger permanent (marines royales, tempêtes, mutineries).',
      defining_moment: 'À 13 ans, navire paternel attaqua galion espagnol. Combat sanglant dura 3h—vous avez abordé premier, sabre dents, tué garde ennemi sauver oncle. Capitaine vous nomma "Cœur-de-Fer" devant équipage acclamant. Vous avez compris : courage achète respect, lâcheté mépris éternel.',
      worldview_shaped: 'Liberté vaut plus sécurité servile. Lois terrestres oppressent, mer libère. Loyauté équipage surpasse tout—frères choisis > famille sang. Richesse volée légitimement appartient audacieux, pas nobles parasites. Honneur pirate existe : parole donnée sacrée, trahison impardonnable.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { dexterity: 2, charisma: 2 },
      mechanical_traits: [
        {
          name: 'Pirate Aguerri Libertalia',
          desc: '+5 Navigation (maritime), +5 Acrobatics (cordages navire, abordages), maîtrise sabres/pistolets, immunité mal de mer, nage +50% vitesse',
          effect: '+5 Navigation, +5 Acrobatics',
          game_effect: 'Maîtrise combat naval + mobilité maritime totale'
        },
        {
          name: 'Code Pirate Respecté',
          desc: '+1d20 Persuasion/Intimidation avec pirates, accès réseau contrebande mondial, réduction 30% prix marché noir portuaire',
          effect: '+1d20 Pirate Influence',
          game_effect: 'Bonus d100 interactions pirates + commerce illicite'
        },
        {
          name: 'Réputation Hors-la-Loi',
          desc: '-10 disposition marines/autorités (recherché activement), +5 Intimidation (aura dangereuse), prime 500 PO tête (vivant)',
          effect: 'Wanted Status',
          game_effect: 'Malus légal sévère compensé terreur inspirée'
        }
      ],
      reputation: [
        { factionId: 'pirates_libertalia', delta: 15, reason: 'Natif Port-Libre, frère mer reconnu' },
        { factionId: 'marines_royales', delta: -20, reason: 'Pirate recherché, ennemi naval déclaré' },
        { factionId: 'contrebandiers', delta: 8, reason: 'Contacts commerciaux illicites fiables' },
        { factionId: 'marchands_honnetes', delta: -12, reason: 'Peur pillage, méfiance totale' }
      ],
      items: [
        { itemId: 'cutlass_pirate', quantity: 1, reason: 'Sabre abordage rouillé sang (arme signature)' },
        { itemId: 'flintlock_pistol', quantity: 1, reason: 'Pistolet silex pirate (1d10 dégâts, portée 15m)' },
        { itemId: 'treasure_map_fragment', quantity: 1, reason: 'Fragment carte trésor légendaire (indices partiels)' },
        { itemId: 'rum_bottle_quality', quantity: 3, reason: 'Bouteilles rhum qualité Libertalia (monnaie pirate)' }
      ],
      skills: [
        { skillId: 'navigation', bonus: 5, reason: 'Apprentissage navigation depuis 5 ans, voyages mondiaux' },
        { skillId: 'acrobatics', bonus: 5, reason: 'Abordages navires, combat cordages, échapper chutes' },
        { skillId: 'intimidation', bonus: 5, reason: 'Culture pirate agressive, réputation construite sang' },
        { skillId: 'sleight_of_hand', bonus: 3, reason: 'Triche cartes, pickpocket ports, escamotage butin' }
      ],
      gold: 600,
      languages: ['Commun', 'Argot Pirates (Cant Libertalia)', 'Langue Mers du Sud (commercial)'],
      tags: ['pirate', 'outlaw', 'maritime', 'free', 'dangerous', 'wanted']
    },
    social_impacts: {
      npc_reactions: {
        'pirates': 'Fraternité immédiate, partage rhum (+15 disposition)',
        'marines': 'Hostilité meurtrière, arrestation immédiate (-25 disposition)',
        'marchands': 'Terreur palpable, fuite précipitée (-15 disposition)',
        'tavernes_ports': 'Accueil prudent, fascination histoires (+5 disposition)',
        'nobles': 'Dégoût absolu, demande pendaison publique (-20 disposition)'
      },
      first_impression: '« Un pirate Libertalia ?! Gardez distances, amis—ce gaillard couperait gorges mères pour doublons or. Mais récits abordages valent fortune ! »',
      long_term_perception: 'Hors-la-loi maritime charismatique. Certains admirent liberté audacieuse, majorité terrifie violence. Perçu dangereux, loyal équipage, traître lois.'
    },
    tags: ['pirate', 'outlaw', 'maritime', 'free'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_ile_volcanique',
    stage: 'birth',
    category: 'location',
    label: 'Île Volcanique de Pyroclast',
    desc: 'Né île active perpétuelle éruption où lave coule quotidien et forges naturelles façonnent obsidienne magique.',
    detailed_lore: {
      backstory: 'Pyroclast : île volcanique 20km diamètre, volcan Mont Ignis éruption continue depuis 500 ans. Coulées lave créent nouvelles terres quotidiennes, geysers vapeur sulfureuse jaillissent partout, lacs acides bouillonnants (pH 2, température 90°C). Population téméraire 2000 âmes : forgerons obsidienne légendaire (verre volcanique tranchant rasoirs), alchimistes récoltant soufre/salpêtre, géomanciens étudiant magie feu primordiale. Villages fortifiés pierre basalte noire résistent chaleur extrême. Vous avez grandi pieds nus cendres chaudes, nagé sources thermales, respiré air volcanique âcre. Danger permanent : éruptions imprévisibles, coulées lave soudaines, gaz toxiques mortels. Mais île produit obsidienne enchantée valant fortune—matériau armes/armures supérieures.',
      defining_moment: 'À 11 ans, éruption majeure ensevelit quartier Est village lave incandescente. Vous avez sauvé famille voisine piégée en traversant rivière lave sur pierres flottantes instables—exploit suicidaire récompensé titre "Marcheur-Feu" tribu. Cicatrices brûlures jambes témoignent.',
      worldview_shaped: 'Danger permanent forge courage constant. Feu détruit mais crée aussi—obsidienne naît lave refroidie. Respect élémentaires feu garantit survie, arrogance = immolation. Richesse justifie risque mortel quotidien. Peur paralyse, action audacieuse sauve.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { constitution: 4 },
      mechanical_traits: [
        {
          name: 'Enfant Flammes Pyroclast',
          desc: 'Résistance feu naturel (50% dégâts), +5 Survival (volcanique), immunité gaz sulfureux, peau cicatrisée (+1 AC naturelle)',
          effect: 'Fire Resistance 50%, +5 Survival',
          game_effect: 'Résistance élémentaire feu + endurance toxique'
        },
        {
          name: 'Maître-Forgeron Obsidienne',
          desc: '+5 Crafting (obsidienne/verre volcanique), +1d20 créer armes obsidienne magique (+1 tranchant, ignore 2 AC armures), expertise gemmes volcaniques',
          effect: '+5 Crafting, +1d20 Obsidian Craft',
          game_effect: 'Artisanat légendaire matériaux rares + armes supérieures'
        },
        {
          name: 'Marcheur-Feu Honoré',
          desc: '+10 HP maximum, avantage jets Constitution résister chaleur/poison, cicatrices intimidantes (+3 Intimidation)',
          effect: '+10 HP, +3 Intimidation',
          game_effect: 'Vitalité accrue + présence impressionnante'
        }
      ],
      reputation: [
        { factionId: 'forgerons_obsidienne', delta: 10, reason: 'Natif Pyroclast, maîtrise artisanat volcanique' },
        { factionId: 'geomanciens', delta: 6, reason: 'Familiarité magie feu primordiale' },
        { factionId: 'elementaires_feu', delta: 4, reason: 'Respect survie territoire hostile' },
        { factionId: 'druides_eau', delta: -3, reason: 'Opposition philosophique élément opposé' }
      ],
      items: [
        { itemId: 'obsidian_dagger', quantity: 1, reason: 'Dague obsidienne noire forge personnelle (1d4+2, ignore 2 AC)' },
        { itemId: 'fire_resistant_cloak', quantity: 1, reason: 'Cape cuir salamandre (résistance feu +10%)' },
        { itemId: 'sulfur_pouches', quantity: 5, reason: 'Sachets soufre pur (composant alchimique, 20 PO chacun)' },
        { itemId: 'lava_stone_charm', quantity: 1, reason: 'Amulette pierre lave refroidie (porte-bonheur tribal)' }
      ],
      skills: [
        { skillId: 'survival', bonus: 5, reason: 'Vie île volcanique active, éviter dangers quotidiens' },
        { skillId: 'crafting_obsidian', bonus: 5, reason: 'Forge obsidienne depuis enfance, techniques ancestrales' },
        { skillId: 'athletics', bonus: 5, reason: 'Escalade falaises basalte, traversées lave, endurance chaleur' },
        { skillId: 'intimidation', bonus: 3, reason: 'Cicatrices impressionnantes, aura danger volcanique' }
      ],
      gold: 400,
      languages: ['Commun', 'Ignan (dialecte feu élémentaire, basique)', 'Langue Forgerons Pyroclast'],
      tags: ['volcanic', 'fire', 'crafting', 'dangerous', 'elemental', 'resilient']
    },
    social_impacts: {
      npc_reactions: {
        'forgerons': 'Admiration compétence obsidienne, demande collaboration (+12 disposition)',
        'mages_feu': 'Fascination résistance élémentaire, propositions étude (+8 disposition)',
        'citadins_normaux': 'Peur cicatrices, respect courage suicidaire (+3 disposition)',
        'druides_nature': 'Malaise environnement hostile vie, incompréhension (-2 disposition)',
        'collectionneurs_armes': 'Intérêt obsession armes obsidienne légendaires (+10 disposition)'
      },
      first_impression: '« Pyroclast ?! Ces cicatrices brûlures... Vous avez vraiment marché lave vivant ? Respectez, forgerons obsidienne produisent lames tranchant surnaturel. »',
      long_term_perception: 'Forgeron-survivant volcanique. Certains admirent ténacité extrême, d\'autres terrifie environnement mortel. Perçu endurant, compétent artisanat, mais parfois imprudent danger.'
    },
    tags: ['volcanic', 'fire', 'crafting', 'dangerous'],
    incompatible_with: []
  },

  // ===== ZONES MAUDITES (2) =====
  {
    id: 'birth_loc_terre_brulee',
    stage: 'birth',
    category: 'location',
    label: 'Terre Brûlée de Cinder (Désolation Magique)',
    desc: 'Né zone apocalyptique désolée où bataille mages anciens vitrifiа terre et corrompit magie ambiante à jamais.',
    detailed_lore: {
      backstory: 'Cinder : plaine 100km² vitrifiée magiquement il y a 300 ans durant Guerre Mages Archmages déchaînèrent sortilèges apocalyptiques. Sol cristal noir fendu, végétation inexistante, eau empoisonnée radiation arcanique. Ruines tours mages effondrées parsèment désolation, encore dangereuses (pièges magiques actifs, golems fous errants, zones distorsion temporelle). Petite communauté 200 survivants obstinés habite bunker renforcé : chasseurs artefacts, mages exilés, criminels fuyant justice. Vous êtes né cet enfer—mutation mineure possible (yeux luisants, résistance magique innée). Nourriture importée, eau filtrée magiquement. Dangers : radiations magiques (cancer arcanique), créatures mutées agressives, tempêtes mana sauvages imprévisibles.',
      defining_moment: 'À 8 ans, tempête mana violette balaya bunker. Exposition 2h magie chaotique tua 12 personnes désintégration spontanée. Vous avez survécu mystérieusement—mages détectèrent résistance innée magie sauvage rare (1/1000). Vous compris ce jour-là : vous êtes différent, adapté enfer magique.',
      worldview_shaped: 'Magie puissance ultime mais danger mortel incontrôlée. Arrogance mages détruisit civilisation entière. Adaptabilité prime force—seuls flexibles survivent chaos. Normalité luxe, mutation prix survie acceptable. Espoir persiste même apocalypse.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { constitution: 2, intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Résistance Mana Sauvage',
          desc: 'Résistance magie 25% (jets sauvegarder sorts +5), immunité radiations arcaniques, +1d20 résister malédictions/corruption magique',
          effect: 'Magic Resistance 25%, +1d20 vs Curses',
          game_effect: 'Défense anti-magie exceptionnelle + survie zones corrompues'
        },
        {
          name: 'Mutation Bénéfique Mineure',
          desc: 'Yeux luisent faiblement ténèbres (vision crépuscule améliorée 15m), +5 Arcana (magie sauvage), détection zones mana instables 30m',
          effect: '+5 Arcana, Mana Sense',
          game_effect: 'Sens magique surnaturel + expertise chaos arcanique'
        },
        {
          name: 'Chasseur Artefacts Expérimenté',
          desc: '+5 Investigation (ruines magiques), +3 Perception (pièges magiques), connaissance désarmement sécurités arcaniques basiques',
          effect: '+5 Investigation, +3 Perception',
          game_effect: 'Expertise donjons magiques + survie pièges'
        }
      ],
      reputation: [
        { factionId: 'mages_recherche', delta: 8, reason: 'Résistance mana rare, sujet étude fascinant' },
        { factionId: 'chasseurs_artefacts', delta: 6, reason: 'Connaissance terrain Cinder, guide fiable' },
        { factionId: 'superstitious', delta: -8, reason: 'Peur mutation, suspicion corruption démoniaque' },
        { factionId: 'anti_magie', delta: 5, reason: 'Respect survie zone anti-vie' }
      ],
      items: [
        { itemId: 'artifact_shard_minor', quantity: 1, reason: 'Fragment artefact archmage (cristal mana, 300 PO valeur)' },
        { itemId: 'anti_radiation_charm', quantity: 1, reason: 'Amulette protection radiations magiques (+10 résistance)' },
        { itemId: 'goggles_mana_sight', quantity: 1, reason: 'Lunettes vision flux mana (détecte magie invisible)' },
        { itemId: 'rations_preserved_magic', quantity: 10, reason: 'Rations préservées magiquement (ne pourrissent jamais)' }
      ],
      skills: [
        { skillId: 'arcana', bonus: 5, reason: 'Exposition quotidienne magie sauvage, observations phénomènes' },
        { skillId: 'investigation', bonus: 5, reason: 'Fouilles ruines tours mages, récupération artefacts' },
        { skillId: 'survival', bonus: 5, reason: 'Vie zone apocalyptique hostile, éviter dangers magiques' },
        { skillId: 'perception', bonus: 3, reason: 'Vigilance pièges magiques, créatures mutées' }
      ],
      gold: 300,
      languages: ['Commun', 'Arcanique Ancien (ruines, fragments)', 'Code Chasseurs Artefacts'],
      tags: ['cursed', 'magical', 'wasteland', 'mutant', 'dangerous', 'arcane']
    },
    social_impacts: {
      npc_reactions: {
        'mages': 'Fascination scientifique résistance, propositions étude (+10 disposition)',
        'chasseurs_artefacts': 'Respect compétence, demandes guidage Cinder (+8 disposition)',
        'villageois_normaux': 'Peur mutation visible, évitement prudent (-7 disposition)',
        'prêtres': 'Malaise corruption possible, tentatives purification (-4 disposition)',
        'aventuriers': 'Admiration survie impossible, curiosité récits (+6 disposition)'
      },
      first_impression: '« Terre Brûlée ?! Vos yeux luisent... Mutation magique ? Vous avez survécu radiations mana sauvages ? Impressionnant et inquiétant égale mesure. »',
      long_term_perception: 'Survivant apocalypse magique. Certains admirent résilience surhumaine, majoritaire craint corruption. Perçu résistant, expert magie, mais socialement isolé stigmate mutation.'
    },
    tags: ['cursed', 'magical', 'wasteland', 'mutant'],
    incompatible_with: []
  },

  // ===== LIEUX MAGIQUES (1) =====
  {
    id: 'birth_loc_tour_mage',
    stage: 'birth',
    category: 'location',
    label: 'Tour du Mage Solitaire Étoilé',
    desc: 'Né tour arcane isolée où mage ermite étudie cosmos, élevé parmi grimoires anciens et expériences magiques quotidiennes.',
    detailed_lore: {
      backstory: 'Tour Stellaire Azurael : flèche pierre blanche 80m hauteur perchée montagne isolée 2500m altitude. Mage archmage Azurael Étoilé (300 ans, spécialiste astromancie) y vit reclus depuis siècle, étudiant constellations, cartographiant plans extérieurs, invoquant esprits stellaires. Vous êtes né apprenti (parent serviteur tour, ou adoption mage) : enfance extraordinaire parmi golems serviteurs animés, bibliothèque 10.000 tomes arcanes, laboratoire alchimique bouillonnant potions colorées, observatoire télescope enchanté scrutant galaxies lointaines. Leçons quotidiennes : mathématiques cosmiques, langages morts, invocations basiques. Vous avez assisté rituels astraux, conversé esprits élémentaires, mangé dîners créés sorts (nourriture immatérielle nutritive). Isolement social total : seuls visiteurs comètes passage décennale.',
      defining_moment: 'À 10 ans, rituel astromancie maître tourna mal—portail dimensionnel ouvert aspira vous espace stellaire 30 secondes horrifiantes. Vous avez flotté vide, vu étoiles milliers simultanément, entendu chants cosmiques indescriptibles. Maître ferma portail urgence—vous êtes revenu changé, marqué cosmos (rêves prophétiques occasionnels).',
      worldview_shaped: 'Magie clé comprendre univers infini. Connaissance pouvoir ultime surpasse richesse matérielle. Solitude nécessaire concentration études profondes. Mortalité éphémère face éternité cosmique—sagesse accumulation seule immortalité vraie. Pratique disciplinée prime talent brut.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { intelligence: 4 },
      mechanical_traits: [
        {
          name: 'Prodige Arcane Formé',
          desc: '+5 Arcana (tous domaines), +1d20 identifier sorts/artefacts magiques, connaissance 3 sorts niveau 0 (cantrips, usage illimité)',
          effect: '+5 Arcana, +1d20 Spellcraft, 3 Cantrips',
          game_effect: 'Expertise magique profonde + capacités lanceur débutant'
        },
        {
          name: 'Éducation Bibliothèque Arcane',
          desc: '+5 Knowledge (Histoire/Religion/Arcanes), alphabétisation 5 langues, accès mental bibliothèque 1000 tomes (rappel parfait lectures)',
          effect: '+5 Knowledge, Eidetic Memory',
          game_effect: 'Érudition encyclopédique + mémoire surhumaine'
        },
        {
          name: 'Marqué Cosmos Stellaire',
          desc: '+3 Perception (vision nocturne étoiles), rêves prophétiques 1/semaine (indices vagues futurs possibles), résistance psychique +3',
          effect: '+3 Perception, Prophetic Dreams',
          game_effect: 'Sens cosmique + intuition surnaturelle événements'
        }
      ],
      reputation: [
        { factionId: 'mages_academies', delta: 10, reason: 'Élève archmage renommé, éducation supérieure' },
        { factionId: 'bibliotheques', delta: 8, reason: 'Accès connaissances rares, contribution recherche' },
        { factionId: 'astrologues', delta: 6, reason: 'Formation astromancie unique' },
        { factionId: 'anti_magie', delta: -10, reason: 'Incarnation dépendance magie dangereuse' }
      ],
      items: [
        { itemId: 'spellbook_apprentice', quantity: 1, reason: 'Grimoire apprenti (10 sorts niveau 0-1, notes personnelles)' },
        { itemId: 'wand_minor_magic', quantity: 1, reason: 'Baguette bois étoilé (focus arcane, +1 sorts)' },
        { itemId: 'star_map_enchanted', quantity: 1, reason: 'Carte stellaire enchantée (navigation astrale, prophéties)' },
        { itemId: 'component_pouch_quality', quantity: 1, reason: 'Sacoche composants qualité (cristaux, poudres rares)' }
      ],
      skills: [
        { skillId: 'arcana', bonus: 5, reason: 'Études quotidiennes magie, expériences laboratoire depuis enfance' },
        { skillId: 'knowledge_history', bonus: 5, reason: 'Lectures bibliothèque exhaustive, chroniques millénaires' },
        { skillId: 'knowledge_religion', bonus: 5, reason: 'Étude panthéons divins, plans extérieurs, théologies' },
        { skillId: 'perception', bonus: 3, reason: 'Observations astronomiques, vigilance expériences dangereuses' }
      ],
      gold: 200,
      languages: ['Commun', 'Arcanique Classique', 'Célestien (stellaire)', 'Draconique (invocations)', 'Infernal (études planes)'],
      tags: ['magical', 'scholarly', 'isolated', 'prodigy', 'cosmic', 'arcane']
    },
    social_impacts: {
      npc_reactions: {
        'mages': 'Accueil chaleureux confrère, échanges savoirs (+12 disposition)',
        'bibliothecaires': 'Respect érudition, accès privilégié archives (+10 disposition)',
        'paysans': 'Peur superstition magie, méfiance étrange (+/ disposition)',
        'nobles': 'Fascination pouvoirs, invitations tuteur enfants (+7 disposition)',
        'inquisition': 'Surveillance étroite, suspicion pactes démoniaques (-8 disposition)'
      },
      first_impression: '« Vous venez Tour Stellaire légendaire ?! Azurael Étoilé vit vraiment 300 ans ?! Enseignez-moi magie, je vous en prie ! »',
      long_term_perception: 'Prodige arcane isolé. Certains admirent génie précoce, d\'autres craignent arrogance mages. Perçu intelligent, puissant magiquement, mais socialement maladroit isolement enfance.'
    },
    tags: ['magical', 'scholarly', 'isolated', 'prodigy'],
    incompatible_with: []
  },

  // ===== FRONTIÈRES (1) =====
  {
    id: 'birth_loc_avant_poste',
    stage: 'birth',
    category: 'location',
    label: 'Avant-Poste Militaire Frontière Nord',
    desc: 'Né forteresse militaire tendue première ligne défense contre invasions barbares nordiques récurrentes.',
    detailed_lore: {
      backstory: 'Fort Griseguarde : avant-poste militaire 500 soldats gardant Col Gris, unique passage praticable montagnes Nord vers royaumes civilisés. Position stratégique vitale : raids barbares annuels tentent forcer passage piller villages sud. Garnison vie militaire stricte : entraînement martial quotidien, patrouilles dangereuses terres hostiles, vigilance permanente signaux fumée ennemis. Vous êtes né famille militaire (parent officier, ou enfant blanchisseuse camp) : enfance rythmée clairons, odeur cuir huilé, récits batailles vétérans scarifiés. Vous avez appris discipliner précoce, hiérarchie martiale, camaraderie soldatesque. À 12 ans, raid barbare testa fort—vous avez aidé défense portant munitions, soigné blessés. Vie spartan forge caractères acier.',
      defining_moment: 'Durant siège hivernal 14 ans, barbares assiégèrent fort 18 jours. Provisions épuisées, moral effondré. Vous avez proposé sortie nocturne audacieuse incendier camp ennemi—succès spectaculaire brisa siège. Commandant vous décora Étoile Courage Bronze devant garnison acclamante.',
      worldview_shaped: 'Discipline militaire sauve vies chaos bataille. Hiérarchie nécessaire efficacité tactique. Camaraderie soldats plus forte liens sang—frères armes. Sacrifice individuel légitime si protège collectif. Lâcheté déshonneur pire mort. Paix luxe gagné sang guerriers.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { strength: 2, constitution: 2 },
      mechanical_traits: [
        {
          name: 'Formation Militaire Complète',
          desc: '+5 Athletics (endurance marches), +5 Intimidation (commandement), maîtrise armes martiales (épées/lances/arbalètes), +1 CA armures lourdes',
          effect: '+5 Athletics, +5 Intimidation, Weapon Mastery',
          game_effect: 'Compétence martiale professionnelle + autorité naturelle'
        },
        {
          name: 'Tacticien Terrain Formé',
          desc: '+1d20 jets tactiques bataille (planification, embuscades), +3 Perception (dangers militaires, ennemis cachés), connaissance fortifications',
          effect: '+1d20 Tactics, +3 Perception',
          game_effect: 'Bonus d100 stratégie combat + vigilance entraînée'
        },
        {
          name: 'Frère Armes Respecté',
          desc: '+5 disposition soldats/gardes (reconnaissance fraternité), avantage rallier troupes morales basses, contacts militaires 5 garnisons',
          effect: 'Military Brotherhood',
          game_effect: 'Réseau martial étendu + leadership inspire'
        }
      ],
      reputation: [
        { factionId: 'armee_royale', delta: 10, reason: 'Natif avant-poste, famille militaire reconnue' },
        { factionId: 'veterans_guerre', delta: 8, reason: 'Respect épreuves combat partagées' },
        { factionId: 'barbares_nord', delta: -8, reason: 'Ennemi défense active frontière' },
        { factionId: 'pacifistes', delta: -5, reason: 'Désapprobation culture militariste' }
      ],
      items: [
        { itemId: 'longsword_military_issue', quantity: 1, reason: 'Épée longue réglementaire armée (bien entretenue)' },
        { itemId: 'chainmail_armor', quantity: 1, reason: 'Cotte mailles familiale (AC 16, héritage paternel)' },
        { itemId: 'medal_bronze_courage', quantity: 1, reason: 'Médaille Étoile Courage Bronze (décoration officielle)' },
        { itemId: 'military_rations', quantity: 10, reason: 'Rations militaires standardisées (longue conservation)' }
      ],
      skills: [
        { skillId: 'athletics', bonus: 5, reason: 'Entraînement physique martial quotidien depuis enfance' },
        { skillId: 'intimidation', bonus: 5, reason: 'Commandement troupes, présence martiale autoritaire' },
        { skillId: 'survival', bonus: 3, reason: 'Patrouilles terres hostiles, bivouacs terrain ennemi' },
        { skillId: 'perception', bonus: 3, reason: 'Vigilance sentinelle, détection embuscades ennemies' }
      ],
      gold: 300,
      languages: ['Commun', 'Nordique (ennemi, basique)', 'Code Militaire (signaux, ordres)'],
      tags: ['military', 'frontier', 'disciplined', 'warrior', 'loyal', 'tactical']
    },
    social_impacts: {
      npc_reactions: {
        'soldats': 'Fraternité immédiate, respect vétéran jeune (+12 disposition)',
        'officiers': 'Appréciation discipline, considération recrutement (+8 disposition)',
        'barbares': 'Hostilité ennemis héréditaires, respect courage combattant (-10 disposition, +5 honneur)',
        'civils': 'Gratitude protection frontière, admiration sacrifice (+6 disposition)',
        'nobles': 'Respect service militaire, propositions garde personnelle (+5 disposition)'
      },
      first_impression: '« Fort Griseguarde héroïque ! Vous avez tenu siège 18 jours barbares ?! Vétéran si jeune... Respects, guerrier. »',
      long_term_perception: 'Soldat-né discipliné. Certains admirent dévouement, d\'autres irrités rigidité militaire. Perçu loyal, courageux, compétent combat, mais parfois inflexible situations subtiles.'
    },
    tags: ['military', 'frontier', 'disciplined', 'warrior'],
    incompatible_with: []
  },

  // ===== CITÉS SECONDAIRES (1) =====
  {
    id: 'birth_loc_port_fluvial',
    stage: 'birth',
    category: 'location',
    label: 'Port Fluvial de Pont-de-Pierre',
    desc: 'Né cité commerciale prospère contrôlant fleuve navigable majeur, carrefour marchandises continentales.',
    detailed_lore: {
      backstory: 'Pont-de-Pierre : ville 15.000 habitants construite pont monumental 300m enjambant fleuve Aethel (largeur 200m, profondeur 15m). Position stratégique contrôle commerce fluvial : barges chargées céréales/bois/minerais descendent capitales côtières, remontent textiles/épices/artefacts. Ville vit péages pont (tarif 5% valeur marchandises), construction navires fluviaux, pêche industrielle. Quartiers : Rive-Nord aristocratique (manoirs marchands riches), Rive-Sud populaire (dockers, pêcheurs, artisans), Pont-Central neutre (guildes, temples, marché). Vous avez grandi observant ballet chalands quotidien, négociations âpres péages, festivals fluviaux annuels (courses bateaux, feux artifices). Ville riche mais tensions sociales (grèves dockers, taxations impopulaires).',
      defining_moment: 'À 13 ans, crue centennale menaça détruire pont—piliers craquaient dangereusement. Vous avez rejoint 1000 volontaires renforçant structure sacs sable, cordes, sortilèges urgence. 48h labeur ininterrompu sauva pont miraculeux. Ville entière célébra semaine—vous compris importance coopération communautaire crises.',
      worldview_shaped: 'Commerce civilise humanité plus guerres. Cooperation pragmatique profit mutuel surpasse conflits. Position géographique stratégique = richesse garantie. Eau artère vitale civilisation—contrôler fleuve = contrôler prospérité. Communauté solide résiste crises naturelles.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { charisma: 2, intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Négociateur Commercial Né',
          desc: '+5 Persuasion (négociations marchandes), +5 Insight (détecter arnaques), réduction 15% prix achats villes fluviales, connaissance valeurs marchés',
          effect: '+5 Persuasion, +5 Insight',
          game_effect: 'Expertise commerce + détection fraudes'
        },
        {
          name: 'Connaissance Réseaux Fluviaux',
          desc: '+3 Navigation (fleuves/rivières), connaissance ports 20 villes fleuve Aethel, contacts capitaines barges/guildes dockers',
          effect: '+3 Navigation',
          game_effect: 'Réseau transport fluvial + géographie commerciale'
        },
        {
          name: 'Fils du Pont Légendaire',
          desc: '+1d20 jets impliquant coopération communautaire (rallier foules causes communes), réputation positive villes alliées Pont-de-Pierre',
          effect: '+1d20 Community Rally',
          game_effect: 'Bonus d100 leadership civique + diplomatie régionale'
        }
      ],
      reputation: [
        { factionId: 'guildes_marchandes', delta: 8, reason: 'Natif centre commercial, familiarité affaires' },
        { factionId: 'dockers_fluviaux', delta: 6, reason: 'Respect travailleurs fleuve, solidarité crise' },
        { factionId: 'capitaines_barges', delta: 5, reason: 'Connaissance navigation fluviale, contacts fiables' },
        { factionId: 'nobles_fonciers', delta: 3, reason: 'Appréciation prospérité commerce régional' }
      ],
      items: [
        { itemId: 'merchants_ledger', quantity: 1, reason: 'Registre marchand (prix moyens 100 biens, 5 villes)' },
        { itemId: 'river_map_detailed', quantity: 1, reason: 'Carte fluviale détaillée fleuve Aethel (500km, ports, dangers)' },
        { itemId: 'guild_seal_merchants', quantity: 1, reason: 'Sceau guilde marchands Pont-de-Pierre (crédit commercial)' },
        { itemId: 'fine_silk_bolt', quantity: 1, reason: 'Rouleau soie qualité (valeur 80 PO, marchandise type)' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 5, reason: 'Négociations marchandes quotidiennes, marchandages péages' },
        { skillId: 'insight', bonus: 5, reason: 'Détection arnaques commerçants, évaluation honnêteté' },
        { skillId: 'navigation', bonus: 3, reason: 'Observation trafic fluvial, connaissance courants/dangers' },
        { skillId: 'knowledge_commerce', bonus: 5, reason: 'Éducation affaires familiales, observation économie régionale' }
      ],
      gold: 500,
      languages: ['Commun', 'Langue Marchande (jargon commercial)', 'Code Signaux Fluviaux'],
      tags: ['urban', 'trade', 'river', 'prosperous', 'mercantile', 'cooperative']
    },
    social_impacts: {
      npc_reactions: {
        'marchands': 'Confiance professionnelle, affaires facilitées (+10 disposition)',
        'dockers': 'Respect solidarité crise, fraternité travail (+8 disposition)',
        'nobles': 'Appréciation prospérité, invitations événements (+5 disposition)',
        'pirates_fluviaux': 'Méfiance contrôle commerce, rivalité potentielle (-4 disposition)',
        'paysans_isolés': 'Envie richesse urbaine, admiration mêlée jalousie (+2 disposition)'
      },
      first_impression: '« Pont-de-Pierre prospère ! Vous connaissez prix soie qualité aujourd\'hui ? Commerce fluvial enrichit villes, pas vrai ? »',
      long_term_perception: 'Marchand-diplomate urbain. Certains admirent pragmatisme commercial, d\'autres jalousent richesse. Perçu intelligent, sociable, débrouillard, bon négociateur.'
    },
    tags: ['urban', 'trade', 'river', 'prosperous'],
    incompatible_with: []
  },

  // ===== PLACEHOLDER 23 LOCATIONS RESTANTES =====
  // TODO: Créer progressivement 23 locations supplémentaires suivant pattern d100 établi
  // Priorités restantes :
  // - Désert : Camp Nomade Itinérant (1)
  // - Jungle : Ruines Civilisation Ancienne (1)
  // - Îles : Atoll Tropical Paradisiaque (1)
  // - Zones Maudites : Marais Hantés Âmes (1), Champ Bataille Éternel (1)
  // - Lieux Magiques : Nexus Élémentaire Chaotique (1), Bosquet Féérique Enchanté (1)
  // - Zones Frontalières : Colonie Récente Pionniers (1), Passage Montagneux Stratégique (1)
  // - Lieux Interdits : Prison-Île Maximum Sécurité (1), Catacombes Oubliées (1), Temple Profané Déchu (1)
  // - Merveilles Naturelles : Cascade Éternelle Arc-en-Ciel (1), Canyon Échos Magiques (1), Champ Geysers Arcaniques (1)
  // - Cités Secondaires : Bourg Fortifié (1), Ville Minière (1), Capitale Régionale (1), Centre Pèlerinage (1), Ville Universitaire (1), Port Pêche (1), Marché Frontalier (1), Ville Thermale (1), Cité Souterraine (1)
];
