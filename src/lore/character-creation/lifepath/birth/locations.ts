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

  // ===== DÉSERT NOMADE (1) =====
  {
    id: 'birth_loc_camp_nomade',
    stage: 'birth',
    category: 'location',
    label: 'Camp Nomade Itinérant du Désert',
    desc: 'Né caravane nomade perpétuelle mouvement, vivant selon rythmes ancestraux transhumance désertique millénaire.',
    detailed_lore: {
      backstory: 'Tribu Bani-Sahra (Fils des Sables) : 500 nomades parcourant désert selon cycles immuables 18 mois. Jamais ville, jamais murs—seules tentes cuir chameau démontables 2h. Vie pastorale : élevage chameaux/chèvres, commerce sel/dattes oasis, navigation stellaire héritée génération. Vous êtes né sous tente nomade tempête sable—sage-femme coupa cordon ombilical couteau ancestral famille. Enfance unique : apprentissage équitation chameau 4 ans, première caravane solo 12 ans traversée 300km désert (rite passage adulte), maîtrise astronomie navigation sans instruments. Richesse mesurée têtes bétail, pas or. Honneur tribal sacré : hospitalité 3 jours/nuits obligatoire voyageurs, vengeance sang impérative insultes. Liberté absolue contrepartie précarité totale (tempêtes, pillards, famines).',
      defining_moment: 'À 11 ans, tempête sable titanesque sépara vous tribu 4 jours. Seul désert hostile, vous avez survécu buvant sang chameau, suivant étoiles nuit, creusant abri sable jour. Retrouver tribu provoqua célébration—patriarche tatoua étoile polaire poignet (symbole navigateur confirmé).',
      worldview_shaped: 'Liberté nomade vaut mille palais dorés. Sédentarité = prison volontaire. Désert enseigne humilité face immensité cosmique. Tribu = famille sang choisie. Étoiles guides infaillibles, jamais menteuses. Hospitalité sacrée transcende conflits—ennemi hébergé 3 jours devient frère temporaire.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { wisdom: 2, constitution: 2 },
      mechanical_traits: [
        {
          name: 'Nomade Désertique Aguerri',
          desc: '+5 Survival (déserts), +5 Animal Handling (chameaux/chevaux), résistance chaleur/soif (besoin eau -40%), navigation stellaire infaillible',
          effect: '+5 Survival, +5 Animal Handling',
          game_effect: 'Maîtrise désert totale + symbiose animaux caravanes'
        },
        {
          name: 'Navigateur Stellaire Héritier',
          desc: '+1d20 Navigation (déserts nuit, lecture étoiles), orientation instinctive parfaite, prédiction météo 48h avance (observation nuages/vents)',
          effect: '+1d20 Navigation',
          game_effect: 'Bonus d100 orientation + intuition climatique'
        },
        {
          name: 'Hospitalité Sacrée Nomade',
          desc: '+3 Persuasion (traditions hospitalité respectées), avantage négociations tribus nomades, réseau contacts 12 tribus désertiques',
          effect: '+3 Persuasion',
          game_effect: 'Diplomatie tribale + réseau caravanes étendu'
        }
      ],
      reputation: [
        { factionId: 'tribus_nomades', delta: 12, reason: 'Membre Bani-Sahra respecté, rite passage accompli' },
        { factionId: 'marchands_caravanes', delta: 6, reason: 'Connaissance routes commerciales désertiques' },
        { factionId: 'citadins_sedentaires', delta: -3, reason: 'Incompréhension mutuelle modes vie opposés' }
      ],
      items: [
        { itemId: 'camel_purebred', quantity: 1, reason: 'Chameau pur-sang héritage familial (vitesse +50%, endurance légendaire)' },
        { itemId: 'nomad_tent_leather', quantity: 1, reason: 'Tente cuir chameau familiale (abri 4 personnes, démontable 10min)' },
        { itemId: 'star_navigation_tool', quantity: 1, reason: 'Astrolabe rudimentaire bois (navigation stellaire précise)' },
        { itemId: 'salt_blocks_trade', quantity: 5, reason: 'Blocs sel gemme (monnaie nomade, 20 PO chacun)' }
      ],
      skills: [
        { skillId: 'survival', bonus: 5, reason: 'Vie nomade désertique depuis naissance, autonomie totale' },
        { skillId: 'animal_handling', bonus: 5, reason: 'Élevage chameaux/chèvres, équitation depuis 4 ans' },
        { skillId: 'navigation', bonus: 5, reason: 'Navigation stellaire héritée, traversées désert solo' },
        { skillId: 'perception', bonus: 3, reason: 'Vigilance tempêtes sable, prédateurs, pillards' }
      ],
      gold: 200,
      languages: ['Commun', 'Dialecte Nomade Bani-Sahra', 'Langue Signes Caravanes (silencieux)'],
      tags: ['nomadic', 'desert', 'free', 'tribal', 'pastoral', 'wanderer']
    },
    social_impacts: {
      npc_reactions: {
        'nomades_desert': 'Fraternité immédiate, hospitalité chaleureuse (+15 disposition)',
        'citadins': 'Fascination exotique, incompréhension profonde (+2 disposition)',
        'marchands': 'Respect connaissance routes, affaires facilitées (+6 disposition)',
        'sedentaires': 'Méfiance instabilité, perception bohème (-3 disposition)'
      },
      first_impression: '« Nomade Bani-Sahra ! Vous connaissez vraiment étoiles par cœur ? Jamais dormi murs ville ? Liberté enviable et terrifiante. »',
      long_term_perception: 'Voyageur libre éternel. Certains admirent indépendance totale, d\'autres irrités refus sédentarité. Perçu sage, autonome, hospitalier, mais inadapté contraintes urbaines.'
    },
    tags: ['nomadic', 'desert', 'free', 'tribal'],
    incompatible_with: []
  },

  // ===== JUNGLE RUINES (1) =====
  {
    id: 'birth_loc_ruines_jungle',
    stage: 'birth',
    category: 'location',
    label: 'Ruines Englouties Civilisation Jungle',
    desc: 'Né cité temple millénaire engloutie jungle, redécouverte explorateurs générations passées, abritant secrets perdus.',
    detailed_lore: {
      backstory: 'Xal-Kotep (Cité Serpent Jade) : métropole 100.000 habitants abandonnée mystérieusement il y a 800 ans. Pyramides échelonnées 50m hauteur envahies lianes titanesques, palais sculptés effondrement partiel, fresques murales dévoilant mythologie inconnue. Petite communauté 300 habitants : archéologues obsédés déchiffrer glyphes serpentins, aventuriers chercheurs trésors jade, chamans étudiant magie nature ancienne. Vous êtes né ce lieu étrange où civilisation morte rencontre jungle vivante conquérante : parents explorateurs cartographiant niveaux souterrains, vous jouiez temples ruinés, dormiez ombre statues serpents ailés colossaux. Dangers quotidiens : serpents venimeux géants, insectes toxiques, pièges temples actifs, malédictions idoles profanées. Mais cité recèle jade vert impérial valant fortune.',
      defining_moment: 'À 9 ans, explorant crypte interdite seul, vous avez déclenché piège ancien : murs claquèrent, eau montante noyade imminente. Vous avez résolu énigme glyphes porte (séquence constellation serpent) sous pression mortelle—porte ouvrit 10 secondes avant noyade. Vous compris : intelligence sauve là où force échoue.',
      worldview_shaped: 'Civilisations brillantes finissent ruines oubliées. Nature reconquiert toujours œuvres humaines. Passé contient sagesses perdues valant redécouverte. Pièges anciens respectent logique—comprendre concepteurs = survie. Jade vert impérial plus précieux or vulgaire.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { intelligence: 2, dexterity: 2 },
      mechanical_traits: [
        {
          name: 'Explorateur Ruines Jungle Né',
          desc: '+5 Investigation (temples anciens), +5 Survival (jungle tropicale), +1d20 désactiver pièges mécaniques anciens, connaissance glyphes serpentins basique',
          effect: '+5 Investigation, +5 Survival, +1d20 Disarm Traps',
          game_effect: 'Expertise donjons jungle + sécurité pièges archéologiques'
        },
        {
          name: 'Familiarité Serpents Sacrés',
          desc: '+3 Animal Handling (serpents), immunité venin serpents jungle communs (résistance 75%), communication empathique reptiles',
          effect: '+3 Animal Handling, Venom Resist',
          game_effect: 'Affinité reptilienne + survie morsures'
        },
        {
          name: 'Trésor Jade Découvert',
          desc: 'Commence 1 idole jade vert impérial (valeur 400 PO, +1 WIS si portée, mais malédiction mineure : cauchemars anciens 1/semaine)',
          effect: 'Jade Idol (+1 WIS, Cursed Dreams)',
          game_effect: 'Artefact précieux pouvoir/malédiction'
        }
      ],
      reputation: [
        { factionId: 'archeologues', delta: 10, reason: 'Natif Xal-Kotep, connaissance site unique' },
        { factionId: 'aventuriers', delta: 6, reason: 'Respect survie dangers jungle/ruines' },
        { factionId: 'marchands_jade', delta: 8, reason: 'Accès jade impérial rare' },
        { factionId: 'chamans_nature', delta: 5, reason: 'Familiarité esprits jungle anciens' }
      ],
      items: [
        { itemId: 'jade_idol_serpent', quantity: 1, reason: 'Idole jade serpent ailé (+1 WIS, cauchemars hebdomadaires)' },
        { itemId: 'rope_vine_reinforced', quantity: 20, reason: 'Corde lianes renforcées (charge 500kg, jungle-proof)' },
        { itemId: 'antivenom_jungle', quantity: 3, reason: 'Antivenin jungle (neutralise poisons reptiles, 50 PO chacun)' },
        { itemId: 'map_ruins_partial', quantity: 1, reason: 'Carte partielle niveaux Xal-Kotep (3/7 étages)' }
      ],
      skills: [
        { skillId: 'investigation', bonus: 5, reason: 'Exploration temples, déchiffrage glyphes depuis enfance' },
        { skillId: 'survival', bonus: 5, reason: 'Vie jungle tropicale hostile, dangers quotidiens' },
        { skillId: 'animal_handling', bonus: 3, reason: 'Interaction serpents sacrés, reptiles jungle' },
        { skillId: 'acrobatics', bonus: 3, reason: 'Escalade ruines, échapper pièges, passages étroits' }
      ],
      gold: 400,
      languages: ['Commun', 'Glyphes Xal-Kotep (basique)', 'Langage Reptilien (empathique)'],
      tags: ['ruins', 'jungle', 'ancient', 'cursed', 'archaeological', 'dangerous']
    },
    social_impacts: {
      npc_reactions: {
        'archeologues': 'Enthousiasme collaboration, questions incessantes (+12 disposition)',
        'aventuriers': 'Respect compétence, demande guidage (+8 disposition)',
        'superstitieux': 'Peur malédictions portées, évitement (-6 disposition)',
        'marchands_jade': 'Intérêt commercial intense, propositions achat (+10 disposition)',
        'chamans': 'Curiosité spirituelle, détection malédiction idole (+5 disposition)'
      },
      first_impression: '« Ruines Xal-Kotep maudites ?! Cette idole jade... Elle pulse énergie étrange. Cauchemars serpents ailés ? Prix pouvoir ancien. »',
      long_term_perception: 'Explorateur maudit bénéficié. Certains admirent bravoure, majoritaire craint malédiction contagieuse. Perçu intelligent, agile, riche jade, mais hanté.'
    },
    tags: ['ruins', 'jungle', 'ancient', 'cursed'],
    incompatible_with: []
  },

  // ===== ÎLE TROPICALE (1) =====
  {
    id: 'birth_loc_atoll_tropical',
    stage: 'birth',
    category: 'location',
    label: 'Atoll Tropical Paradisiaque',
    desc: 'Né île corallienne isolée océan turquoise, paradis naturel préservé civilisation moderne.',
    detailed_lore: {
      backstory: 'Atoll Maui-Lani (Perle Céleste) : anneau corallien 5km diamètre entourant lagon cristallin turquoise. Population 200 insulaires : pêcheurs récifs coralliens, cueilleurs cocos/mangues, artisans colliers coquillages nacre. Vie paradisiaque simple : pêche quotidienne abondante (thons, marlins, pieuvres), fruits tropicaux surabondants gratuits, climat éternel 28°C. Mais isolement total : navire marchand passage 6 mois apportant sel/métaux contre perles/nacre. Vous êtes né cabane bambou pilotis lagon—première baignade 6 mois, première plongée apnée 5 ans récifs peu profonds. Enfance idyllique : natation dauphins curieux, grimper cocotiers 20m, tisser filets pêche. Dangers rares : requins tigres, cyclones tropicaux décennaux, pirates sporadiques.',
      defining_moment: 'À 10 ans, cyclone catégorie 4 dévasta atoll—vagues 8m détruisirent moitié village. Vous avez sauvé enfants piégés cabane effondrée plongeant eaux déchaînées 12 fois consécutives. Communauté vous tatoua vague sacrée épaule (symbole courage marin héroïque).',
      worldview_shaped: 'Nature pourvoit généreusement si respectée humblement. Océan mère nourricière capricieuse—donne poissons mais reprend imprudents. Communauté insulaire solidarité vitale face isolement. Richesse matérielle illusion—bonheur simple suffit. Technologie superflue face sagesse ancestrale.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { dexterity: 2, constitution: 2 },
      mechanical_traits: [
        {
          name: 'Enfant Océan Tropical',
          desc: '+5 Swimming (vitesse nage ×2), +5 Athletics (escalade, plongée apnée 5min), résistance noyade (flottabilité naturelle), vision sous-marine claire 15m',
          effect: '+5 Swimming, +5 Athletics',
          game_effect: 'Maîtrise aquatique totale + endurance plongée'
        },
        {
          name: 'Pêcheur Récifs Coralliens',
          desc: '+1d20 Survival (océanique, pêche récifs), connaissance faune marine 200+ espèces, détection requins 50m (sixième sens vibrations)',
          effect: '+1d20 Survival (ocean)',
          game_effect: 'Bonus d100 pêche + instinct prédateurs marins'
        },
        {
          name: 'Artisan Nacre Insulaire',
          desc: '+3 Crafting (bijoux nacre/coquillages), commerce perles/colliers (+20% prix vente), réputation artisan insulaire reconnue',
          effect: '+3 Crafting',
          game_effect: 'Artisanat précieux + commerce maritime'
        }
      ],
      reputation: [
        { factionId: 'insulaires_pacifique', delta: 12, reason: 'Natif Maui-Lani, héros cyclone reconnu' },
        { factionId: 'pecheurs', delta: 8, reason: 'Maîtrise techniques récifs coralliens' },
        { factionId: 'marchands_perles', delta: 6, reason: 'Accès perles/nacre qualité supérieure' }
      ],
      items: [
        { itemId: 'fishing_spear_bone', quantity: 1, reason: 'Harpon os baleine artisanal (1d6+2, portée 10m sous-marin)' },
        { itemId: 'pearl_necklace_rare', quantity: 1, reason: 'Collier perles noires rares (valeur 150 PO, beauté +1 CHA si porté)' },
        { itemId: 'coconut_water_skin', quantity: 3, reason: 'Noix coco pleines eau fraîche (hydratation parfaite)' },
        { itemId: 'wave_tattoo_sacred', quantity: 1, reason: 'Tatouage vague sacrée épaule (symbole courage, +2 disp insulaires)' }
      ],
      skills: [
        { skillId: 'swimming', bonus: 5, reason: 'Natation quotidienne lagon/océan depuis 6 mois' },
        { skillId: 'athletics', bonus: 5, reason: 'Plongée apnée, escalade cocotiers, endurance aquatique' },
        { skillId: 'survival', bonus: 5, reason: 'Pêche récifs, cueillette fruits, prévision tempêtes' },
        { skillId: 'crafting', bonus: 3, reason: 'Artisanat colliers nacre, filets pêche, pirogues' }
      ],
      gold: 250,
      languages: ['Commun', 'Dialecte Insulaire Maui-Lani', 'Langage Dauphins (rudimentaire)'],
      tags: ['tropical', 'island', 'paradise', 'aquatic', 'peaceful', 'isolated']
    },
    social_impacts: {
      npc_reactions: {
        'insulaires': 'Fraternité immédiate océanique (+15 disposition)',
        'marins': 'Respect compétence aquatique (+8 disposition)',
        'citadins_continentaux': 'Fascination exotique, envie mode vie (+6 disposition)',
        'pirates': 'Sous-estimation dangereuse (cible facile présumée, -3 disposition)',
        'marchands': 'Intérêt perles rares, négociations privilégiées (+7 disposition)'
      },
      first_impression: '« Atoll Maui-Lani paradis légendaire ! Vous nagez vraiment avec dauphins ?! Tatouage vague... Héros cyclone. Respectez. »',
      long_term_perception: 'Insulaire pacifique compétent. Certains admirent harmonie nature, d\'autres jalousent insouciance. Perçu agile, paisible, artisan talentueux, mais naïf intrigues continentales.'
    },
    tags: ['tropical', 'island', 'paradise', 'aquatic'],
    incompatible_with: []
  },

  // ===== ZONES MAUDITES (2) =====
  {
    id: 'birth_loc_marais_hantes',
    stage: 'birth',
    category: 'location',
    label: 'Marais Hantés des Âmes Perdues',
    desc: 'Né marécages maudits où morts-vivants errent éternellement, frontière fragile entre vivants et défunts.',
    detailed_lore: {
      backstory: 'Marais Lamentations : zone 50km² marécages putrides où bataille sanglante il y a 200 ans tua 10.000 soldats. Cadavres mal enterrés, rites funéraires négligés, malédiction nécromantique corrompent terre eau air. Morts-vivants errent brumes nocturnes : squelettes désorientés, zombies pourrissants, spectres hurlant regrets éternels. Petite communauté 150 survivants obstinés : exorcistes combattant malédiction, herboristes récoltant plantes rares marais, criminels fuyant justice (personne cherche ici). Vous êtes né cabane pilotis isolée—enfance terrifiante normalisée : spectres fenêtres nuit, odeur chair putride permanente, brumes toxiques asphyxiantes. Mais marais produit lotus noir (composant alchimique 100 PO), racines mandragore vivantes.',
      defining_moment: 'À 12 ans, spectre guerrier attaqua vous nuit hurlant vengeance. Vous avez récité exorcisme improvisé appris prêtre—spectre se dissipa lumière argentée. Prêtre déclara vous "Touché Lumière"—résistance innée ténèbres morts-vivants.',
      worldview_shaped: 'Mort pas fin absolue—âmes torturées hantent monde. Respect défunts prévient malédictions horribles. Vivants doivent honorer morts ou payer prix spectres vengeurs. Courage face ténèbres acquis exposition quotidienne terreurs. Isolement prix survie marais maudits.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { wisdom: 2, constitution: 2 },
      mechanical_traits: [
        {
          name: 'Touché Lumière Exorciste',
          desc: '+5 Religion (exorcismes), +1d20 repousser morts-vivants, résistance nécromancie 50% (jets sauvegarder +5), détection morts-vivants 30m',
          effect: '+5 Religion, +1d20 Turn Undead',
          game_effect: 'Pouvoir exorciste inné + défense nécromantique'
        },
        {
          name: 'Survivant Marais Maudits',
          desc: '+5 Survival (marécages), +5 Stealth (brumes), immunité maladies marais (fièvres, parasites), résistance toxines naturelles',
          effect: '+5 Survival, +5 Stealth',
          game_effect: 'Maîtrise marécages + santé renforcée'
        },
        {
          name: 'Herboriste Plantes Maudites',
          desc: '+3 Medicine (herbes rares), connaissance lotus noir/mandragore, commerce composants alchimiques 200+ PO valeur',
          effect: '+3 Medicine',
          game_effect: 'Expertise botanique obscure + commerce lucratif'
        }
      ],
      reputation: [
        { factionId: 'exorcistes', delta: 10, reason: 'Touché Lumière reconnu, résistance innée' },
        { factionId: 'morts_vivants', delta: -15, reason: 'Ennemi naturel, pouvoir repousser redouté' },
        { factionId: 'alchimistes', delta: 8, reason: 'Accès lotus noir, mandragore vivante' },
        { factionId: 'superstitious', delta: -6, reason: 'Peur contamination malédiction, évitement' }
      ],
      items: [
        { itemId: 'holy_symbol_silver', quantity: 1, reason: 'Symbole sacré argent béni (focus exorcismes, +2 repousser)' },
        { itemId: 'black_lotus_flowers', quantity: 3, reason: 'Fleurs lotus noir (composant alchimique, 100 PO chacune)' },
        { itemId: 'mandrake_root_living', quantity: 1, reason: 'Racine mandragore vivante (potion résurrection partielle, 200 PO)' },
        { itemId: 'spectral_ward_charm', quantity: 1, reason: 'Amulette protection spectres (résistance possession +3)' }
      ],
      skills: [
        { skillId: 'religion', bonus: 5, reason: 'Exorcismes quotidiens, rites funéraires, prières protection' },
        { skillId: 'survival', bonus: 5, reason: 'Vie marais toxiques, navigation brumes, éviter morts-vivants' },
        { skillId: 'stealth', bonus: 5, reason: 'Déplacement silencieux marais, éviter patrouilles spectres' },
        { skillId: 'medicine', bonus: 3, reason: 'Herboristerie marais, antidotes toxines, soins maladies' }
      ],
      gold: 300,
      languages: ['Commun', 'Latin Exorciste (prières)', 'Murmures Spectraux (compréhension partielle)'],
      tags: ['cursed', 'swamp', 'undead', 'haunted', 'dangerous', 'holy']
    },
    social_impacts: {
      npc_reactions: {
        'exorcistes': 'Accueil fraternel, collaboration spirituelle (+12 disposition)',
        'morts_vivants': 'Hostilité terrifiée, fuite instinctive (-20 disposition)',
        'villageois_normaux': 'Peur contamination, maintien distance (+2 disposition, -5 contact)',
        'alchimistes': 'Intérêt commercial intense, propositions partenariat (+10 disposition)',
        'prêtres': 'Respect pouvoir divin, bénédictions offertes (+8 disposition)'
      },
      first_impression: '« Marais Lamentations horrifiants ?! Vous repoussez vraiment spectres ?! Touché Lumière rare... Béni ou maudit ? »',
      long_term_perception: 'Exorciste-survivant hanteur. Certains admirent courage surnaturel, majoritaire terrifie aura ténèbres. Perçu saint, endurant, lugubre, socialement isolé.'
    },
    tags: ['cursed', 'swamp', 'undead', 'haunted'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_champ_bataille',
    stage: 'birth',
    category: 'location',
    label: 'Champ de Bataille Éternel Maudit',
    desc: 'Né terre maudite où armées fantômes rejouent bataille perdue éternellement chaque nuit.',
    detailed_lore: {
      backstory: 'Plaine Lames Brisées : champ bataille 10km² où Dernière Bataille Royaumes décida sort continent il y a 150 ans. 50.000 morts 1 journée sanglante, serments vengeance derniers souffles, malédiction guerre éternelle. Chaque nuit minuit-aube, armées fantômes transparentes rejouent bataille : charges cavalerie spectrale, sortilèges arcanes bleus, cris agonie éternels. Jour, plaine apparence normale mais sol cendres noires, herbe poussée tordue, air goût métallique sang. Communauté 100 habitants : vétérans hantés recherchant camarades morts, nécromanciens étudiant malédiction, pilleurs équipements anciens. Vous êtes né baraque bois vétéran traumatisé—enfance bercée cris bataille nocturnes, réveil quotidien cadavres spectraux dissipés aube.',
      defining_moment: 'À 13 ans, fantôme général ennemi apparut jour (rarissime) vous suppliant briser malédiction. Vous avez trouvé épée brisée cachée 150 ans, réparé forge village, planté tombe symbolique. Général se dissipa paix lumière dorée—malédiction affaiblie 10%. Vous compris : paix défunts libère vivants.',
      worldview_shaped: 'Guerre atrocité absolue—gloire mensongère masque horreur. Morts méritent repos honorable indépendamment camp. Vengeance perpétue souffrance éternelle cycles. Courage affronter passé traumatique nécessaire guérison. Vivre champ bataille forge résilience inhumaine.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { constitution: 2, wisdom: 2 },
      mechanical_traits: [
        {
          name: 'Né Guerre Éternelle',
          desc: '+5 Intimidation (présence martiale spectrale), +1d20 résister terreur/désespoir, immunité peur magique (exposition quotidienne horreurs), aura lugubre (+3 Intimidation)',
          effect: '+5 Intimidation, +1d20 Fear Resist',
          game_effect: 'Résistance mentale légendaire + terreur inspirée'
        },
        {
          name: 'Connaissance Tactiques Anciennes',
          desc: '+5 History (guerres anciennes), +3 Tactics (stratégies bataille classiques), détection embuscades militaires (+5 Perception contexte martial)',
          effect: '+5 History, +3 Tactics',
          game_effect: 'Expertise militaire historique + sens tactique'
        },
        {
          name: 'Apaiseur Âmes Guerrières',
          desc: '+3 Religion (rites funéraires militaires), avantage négociations spectres guerriers, +1d20 briser malédictions mineures liées guerre',
          effect: '+3 Religion, +1d20 Break War Curses',
          game_effect: 'Pacification spectres + exorcisme spécialisé'
        }
      ],
      reputation: [
        { factionId: 'veterans_guerre', delta: 10, reason: 'Comprend traumatisme guerre intimement' },
        { factionId: 'fantomes_guerriers', delta: 8, reason: 'Apaiseur reconnu, libérateur âmes' },
        { factionId: 'pacifistes', delta: 6, reason: 'Respect opposition guerre héritée horreur' },
        { factionId: 'militaristes', delta: -4, reason: 'Perception défaitiste, mémoire honteuse' }
      ],
      items: [
        { itemId: 'broken_sword_repaired', quantity: 1, reason: 'Épée brisée réparée général (1d8+1, +2 vs spectres)' },
        { itemId: 'dog_tags_ancient', quantity: 5, reason: 'Plaques identité soldats anciens (libérer 5 âmes si rendues familles)' },
        { itemId: 'war_medal_tarnished', quantity: 1, reason: 'Médaille militaire ternie 150 ans (symbole sacrifice)' },
        { itemId: 'field_journal_soldier', quantity: 1, reason: 'Journal soldat derniers jours (récit poignant bataille)' }
      ],
      skills: [
        { skillId: 'intimidation', bonus: 5, reason: 'Aura guerre traumatisante, présence lugubre' },
        { skillId: 'history', bonus: 5, reason: 'Connaissance intime Dernière Bataille, tactiques anciennes' },
        { skillId: 'religion', bonus: 3, reason: 'Rites funéraires militaires, apaisement spectres' },
        { skillId: 'perception', bonus: 5, reason: 'Vigilance dangers champ bataille, pièges oubliés' }
      ],
      gold: 250,
      languages: ['Commun', 'Cant Militaire Ancien', 'Murmures Spectres Guerriers (compréhension)'],
      tags: ['cursed', 'battlefield', 'haunted', 'war', 'traumatic', 'undead']
    },
    social_impacts: {
      npc_reactions: {
        'veterans': 'Solidarité profonde traumatisme partagé (+12 disposition)',
        'spectres_guerriers': 'Reconnaissance libérateur, coopération rare (+10 disposition)',
        'pacifistes': 'Respect témoignage horreur guerre (+8 disposition)',
        'militaristes_glorieux': 'Malaise réalité sombre guerre, irritation (-5 disposition)',
        'villageois_normaux': 'Peur aura lugubre, évitement prudent (-4 disposition)'
      },
      first_impression: '« Champ Bataille Éternel ?! Vous entendez cris fantômes chaque nuit ?! Comment santé mentale survivre ? Respectez courage. »',
      long_term_perception: 'Survivant guerre éternelle. Certains admirent résilience surhumaine, d\'autres terrifie lugubre hanteur. Perçu sage, traumatisé, pacificateur, socialement isolé.'
    },
    tags: ['cursed', 'battlefield', 'haunted', 'war'],
    incompatible_with: []
  },

  // ===== LIEUX MAGIQUES (2) =====
  {
    id: 'birth_loc_nexus_elementaire',
    stage: 'birth',
    category: 'location',
    label: 'Nexus Élémentaire Chaotique',
    desc: 'Né convergence plans élémentaires où feu eau air terre fusionnent chaos magique permanent.',
    detailed_lore: {
      backstory: 'Vortex Éléments : zone 5km diamètre où barrières plans élémentaires fracturées magiquement accident arcan il y a 400 ans. Quartiers différents éléments coexistent : Nord flammes éternelles (température 100°C), Sud océan flottant gravité inversée, Est tornades permanentes, Ouest falaises terre vivante mouvante. Centre point neutre fragile où 50 mages/élémentalistes habitent forteresse cristal. Vous êtes né ce chaos—enfance surréaliste : jouer fontaines feu liquide, nager airs (gravité variable), converser salamandres feu conscientes, esquiver éclairs spontanés. Mutations mineures courantes : yeux bicolores (feu/eau), peau teinte élémentaire, affinité magique innée.',
      defining_moment: 'À 11 ans, vortex instabilité critique menaça explosion planaire. Vous avez canalisé instinctivement quatre éléments simultanément (talent rarissime) stabilisant temporairement. Archimage baptisa vous "Enfant Nexus"—destiné équilibrer éléments.',
      worldview_shaped: 'Éléments forces fondamentales réalité, pas outils. Équilibre quatre éléments maintient existence cosmos. Chaos apparent cache ordre profond harmonieux. Magie élémentaire respiration naturelle, pas sortilèges artificiels. Mutation prix pouvoir cosmique acceptable.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { intelligence: 2, constitution: 2 },
      mechanical_traits: [
        {
          name: 'Enfant Nexus Élémentaire',
          desc: 'Résistance 25% quatre éléments (feu/froid/électricité/acide), +5 Arcana (magie élémentaire), connaissance 2 cantrips élémentaires (usage illimité), détection déséquilibre élémentaire 50m',
          effect: 'Elemental Resist 25%, +5 Arcana, 2 Cantrips',
          game_effect: 'Défense multi-élémentaire + magie innée'
        },
        {
          name: 'Canalisation Éléments Instinctive',
          desc: '+1d20 lancer sorts élémentaires (feu/eau/air/terre), +3 dégâts sorts élémentaires, 1/jour : invoquer élémentaire mineur (4h service)',
          effect: '+1d20 Elemental Spells, Summon Minor Elemental',
          game_effect: 'Bonus d100 magie élémentaire + invocation'
        },
        {
          name: 'Mutation Élémentaire Bénéfique',
          desc: 'Yeux bicolores feu/eau (vision ténèbres 20m, détection magie élémentaire), peau teinte bleutée (CHA -1 mais +3 Intimidation contexte magique)',
          effect: 'Darkvision, Detect Elemental Magic',
          game_effect: 'Sens magique + apparence imposante'
        }
      ],
      reputation: [
        { factionId: 'elementalistes', delta: 12, reason: 'Enfant Nexus rare, destinée prophétisée' },
        { factionId: 'elementaires', delta: 8, reason: 'Reconnaissance affinité naturelle' },
        { factionId: 'mages_academies', delta: 6, reason: 'Fascination talent élémentaire inné' },
        { factionId: 'anti_magie', delta: -10, reason: 'Incarnation dépendance magique dangereuse' }
      ],
      items: [
        { itemId: 'elemental_focus_crystal', quantity: 1, reason: 'Cristal focus quatre couleurs (amplifie sorts élémentaires +2)' },
        { itemId: 'salamander_scale', quantity: 1, reason: 'Écaille salamandre feu (composant invocations, 80 PO)' },
        { itemId: 'water_breathing_potion', quantity: 2, reason: 'Potion respiration aquatique (1h chacune, gravité inversée Sud)' },
        { itemId: 'robe_elemental_weave', quantity: 1, reason: 'Robe tissage élémentaire (résistance +5% quatre éléments)' }
      ],
      skills: [
        { skillId: 'arcana', bonus: 5, reason: 'Immersion quotidienne magie élémentaire, observations phénomènes' },
        { skillId: 'survival', bonus: 3, reason: 'Vie environnements élémentaires extrêmes hostiles' },
        { skillId: 'knowledge_planes', bonus: 5, reason: 'Familiarité plans élémentaires, créatures natives' },
        { skillId: 'perception', bonus: 3, reason: 'Détection instabilités magiques, dangers élémentaires' }
      ],
      gold: 300,
      languages: ['Commun', 'Ignan (feu)', 'Aquan (eau)', 'Auran (air)', 'Terran (terre)'],
      tags: ['magical', 'elemental', 'chaotic', 'mutant', 'powerful', 'destined']
    },
    social_impacts: {
      npc_reactions: {
        'elementalistes': 'Accueil enthousiaste, mentorat offert (+15 disposition)',
        'elementaires': 'Respect naturel affinité, coopération facilitée (+10 disposition)',
        'mages': 'Fascination talent, propositions étude (+8 disposition)',
        'villageois_normaux': 'Peur mutation visible, superstition (+0 disposition)',
        'anti_magie': 'Hostilité idéologique, méfiance totale (-12 disposition)'
      },
      first_impression: '« Nexus Élémentaire ?! Yeux bicolores fascinants... Vous canalisez vraiment quatre éléments simultanément ?! Enfant Nexus prophétisé ! »',
      long_term_perception: 'Prodige élémentaire destiné. Certains admirent pouvoir surnaturel, d\'autres terrifie mutation. Perçu puissant, sage éléments, mais socialement inadapté chaos vécu.'
    },
    tags: ['magical', 'elemental', 'chaotic', 'mutant'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_bosquet_feerique',
    stage: 'birth',
    category: 'location',
    label: 'Bosquet Féérique Enchanté',
    desc: 'Né clairière magique frontière monde mortel et royaume féérique, baigné enchantements millénaires.',
    detailed_lore: {
      backstory: 'Bosquet Lune-Argent : clairière 1km² forêt ancestrale où voile réalités aminci permet passage créatures féeriques. Arbres phosphorescents argentés brillent nuit, champignons géants parlants, ruisseau chantant mélodies hypnotiques, papillons translucides porteurs rêves. Population 80 habitants : druides protégeant frontière, fées exilées cour Reine Été, mortels adoptés peuple fée enfance. Vous êtes né sous arbre millénaire bénédiction fée marraine—sang mortel mais touche féerique marquée. Enfance féérique : jouer pixies espiègles, apprendre danse cercle champignons, converser arbres sages conscients, boire rosée étoilée (nectar fée). Dangers : perte notion temps (1 nuit = 1 an mortel), pactes fées dangereux, satyre ivres violents.',
      defining_moment: 'À 10 ans, chasseur mortel poursuivit biche blanche sacrée dans bosquet. Vous avez supplié fée marraine sauver biche—elle transforma chasseur chêne 100 ans. Vous compris pouvoir fées terrible capricieux, ne jamais offenser.',
      worldview_shaped: 'Monde féérique réel coexiste mortel invisiblement. Nature consciente mérite respect absolu—arbres écoutent, rivières jugent. Pactes paroles contraignants magiquement—jamais promettre légèrement. Beauté féérique cache dangers mortels. Temps relatif illusion, éternité possible.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { charisma: 2, dexterity: 2 },
      mechanical_traits: [
        {
          name: 'Touche Féérique Héritée',
          desc: '+5 Persuasion (charme naturel fée), +5 Performance (danse/chant enchanteur), avantage résister charme/sommeil magique, +1d20 négociations créatures féeriques',
          effect: '+5 Persuasion, +5 Performance, +1d20 Fey Influence',
          game_effect: 'Charisme surnaturel + diplomatie féérique'
        },
        {
          name: 'Ami Nature Consciente',
          desc: '+3 Nature (communication plantes/animaux basique), +3 Animal Handling (créatures forestières), détection présences féeriques 30m',
          effect: '+3 Nature, +3 Animal Handling',
          game_effect: 'Empathie naturelle + sens féérique'
        },
        {
          name: 'Bénédiction Fée Marraine',
          desc: '1/jour : invoquer fée marraine aide mineure (conseil, petite magie, distraction ennemis 1 round), mais dette accumulée nécessite service futur',
          effect: 'Fey Patron Boon (Debt Accrued)',
          game_effect: 'Assistance surnaturelle coût obligations'
        }
      ],
      reputation: [
        { factionId: 'fey_court', delta: 10, reason: 'Protégé fée marraine, touche féérique reconnue' },
        { factionId: 'druides', delta: 8, reason: 'Respect harmonie nature, bénédiction féerique' },
        { factionId: 'chasseurs', delta: -5, reason: 'Protection animaux sacrés, opposition chasse' },
        { factionId: 'eglise', delta: -4, reason: 'Suspicion pactes démoniaques (confusion fées)' }
      ],
      items: [
        { itemId: 'moonsilver_acorn', quantity: 1, reason: 'Gland argenté bosquet (planter = arbre parlant 10 ans, 200 PO valeur)' },
        { itemId: 'fey_flower_crown', quantity: 1, reason: 'Couronne fleurs éternelles (CHA +1 si portée, fane si retirée)' },
        { itemId: 'pixie_dust_pouch', quantity: 3, reason: 'Poussière pixie (lévitation 10min chacune, ou invisibilité 1min)' },
        { itemId: 'singing_stream_vial', quantity: 1, reason: 'Fiole eau ruisseau chantant (apaise colère, soigne 1d6 HP)' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 5, reason: 'Charme féérique naturel, négociations enchantées' },
        { skillId: 'performance', bonus: 5, reason: 'Danse cercles fées, chant mélodies hypnotiques' },
        { skillId: 'nature', bonus: 3, reason: 'Communication arbres/plantes, connaissance écosystème magique' },
        { skillId: 'animal_handling', bonus: 3, reason: 'Affinité créatures forestières, familiers féeriques' }
      ],
      gold: 250,
      languages: ['Commun', 'Sylvan (féérique)', 'Langage Arbres (empathique)', 'Chants Oiseaux (compréhension)'],
      tags: ['fey', 'magical', 'forest', 'enchanted', 'charming', 'mysterious']
    },
    social_impacts: {
      npc_reactions: {
        'fey_creatures': 'Accueil chaleureux familial, protection offerte (+15 disposition)',
        'druides': 'Respect connexion nature profonde, mentorat spirituel (+10 disposition)',
        'villageois_superstitieux': 'Peur pactes féeriques, évitement prudent (-5 disposition)',
        'chasseurs': 'Irritation protection gibier, conflits potentiels (-6 disposition)',
        'nobles_romantiques': 'Fascination beauté éthérée, propositions cour (+8 disposition)'
      },
      first_impression: '« Bosquet Lune-Argent enchanté ?! Couronne fleurs éternelles... Touche féérique visible. Beauté surnaturelle troublante. Quel prix payé ? »',
      long_term_perception: 'Protégé fées mystérieux. Certains admirent grâce enchantée, majoritaire méfie pactes obscurs. Perçu charmant, sage nature, mais obligations féeriques inquiétantes.'
    },
    tags: ['fey', 'magical', 'forest', 'enchanted'],
    incompatible_with: []
  },

  // ===== FRONTIÈRE COLONIE (1) =====
  {
    id: 'birth_loc_colonie_pionniers',
    stage: 'birth',
    category: 'location',
    label: 'Colonie Récente Pionniers Frontière',
    desc: 'Né établissement pionnier 10 ans âge, première génération coloniser terres sauvages inexplorées.',
    detailed_lore: {
      backstory: 'Nouvelle Espérance : colonie fondée il y a 12 ans par 200 pionniers courageux cherchant terres vierges prospérité nouvelle. Construite défriche forêt dense frontière Nord, entourée palissade bois renforcée contre ours/loups/barbares. Population actuelle 350 habitants : fermiers défrichant champs, bûcherons abattant arbres titanesques, chasseurs trappeurs fourrures, milice volontaire 30 hommes. Vous êtes né cabane rondin première année établissement—vie pionnière rude : hivers -20°C, récoltes incertaines sol vierge, attaques animaux sauvages, maladies sans médecin. Mais communauté solidarité farouche : construction collective, partage récoltes disettes, défense mutuelle dangers. Expansion progressive : +50 habitants/an, nouvelles fermes défriche.',
      defining_moment: 'À 12 ans, meute loups affamés attaqua colonie hiver brutal. Vous avez rallié enfants défense palissade pendant adultes combattaient—ingéniosité torches enflammées effraya loups. Fondateurs vous nommèrent "Gardien Nouvelle Espérance".',
      worldview_shaped: 'Pionniers bâtissent avenir courage audace. Terres vierges opportunités infinies risques mortels. Communauté solidaire survit, individualistes périssent. Civilisation avance défrichant sauvage progressivement. Première génération forge destin descendants.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { strength: 2, wisdom: 2 },
      mechanical_traits: [
        {
          name: 'Pionnier Frontière Aguerri',
          desc: '+5 Survival (forêts/frontières), +5 Athletics (défrichage, construction), maîtrise haches/scies (outils = armes 1d8), +10 HP (endurance pionnière)',
          effect: '+5 Survival, +5 Athletics, +10 HP',
          game_effect: 'Polyvalence frontière + vitalité accrue'
        },
        {
          name: 'Bâtisseur Communauté Né',
          desc: '+1d20 jets construction (bâtiments, palissades, ponts), +3 Persuasion (rallier colons causes communes), réduction 30% coûts constructions (ingéniosité)',
          effect: '+1d20 Construction, +3 Persuasion',
          game_effect: 'Bonus d100 génie civil + leadership civique'
        },
        {
          name: 'Première Génération Fierté',
          desc: '+3 inspiration alliés colons (moral +1 combat défense colonie), réseau contacts 5 colonies pionnières frontières',
          effect: 'Inspire Settlers',
          game_effect: 'Buff moral + réseau pionnier'
        }
      ],
      reputation: [
        { factionId: 'pionniers_colonies', delta: 12, reason: 'Gardien Nouvelle Espérance, héros défense' },
        { factionId: 'fermiers_frontiere', delta: 8, reason: 'Solidarité travail terre dur partagé' },
        { factionId: 'natifs_autochtones', delta: -5, reason: 'Expansion colonie empiète territoires ancestraux' },
        { factionId: 'nobles_anciens', delta: 3, reason: 'Admiration courage pionnier, soutien expansion' }
      ],
      items: [
        { itemId: 'axe_logging_quality', quantity: 1, reason: 'Hache abattage qualité (1d8+1, outil/arme double usage)' },
        { itemId: 'bear_pelt_winter', quantity: 1, reason: 'Peau ours chasse personnelle (chaleur extrême, valeur 60 PO)' },
        { itemId: 'cabin_deed', quantity: 1, reason: 'Titre propriété cabane familiale Nouvelle Espérance (patrimoine)' },
        { itemId: 'militia_badge', quantity: 1, reason: 'Insigne milice colonie (badge Gardien, autorité locale)' }
      ],
      skills: [
        { skillId: 'survival', bonus: 5, reason: 'Vie frontière sauvage depuis naissance, autonomie totale' },
        { skillId: 'athletics', bonus: 5, reason: 'Travaux défrichage, construction, chasse quotidiens' },
        { skillId: 'animal_handling', bonus: 3, reason: 'Élevage bétail, chevaux, défense contre prédateurs' },
        { skillId: 'persuasion', bonus: 3, reason: 'Rallier colons projets communs, leadership jeune' }
      ],
      gold: 250,
      languages: ['Commun', 'Dialecte Pionniers Frontière', 'Signes Natifs (rudimentaire)'],
      tags: ['frontier', 'pioneer', 'settler', 'builder', 'hardy', 'community']
    },
    social_impacts: {
      npc_reactions: {
        'pionniers': 'Fraternité profonde épreuves partagées (+15 disposition)',
        'fermiers': 'Respect travail terre, solidarité agricole (+10 disposition)',
        'natifs': 'Méfiance expansion, respect courage individuel (-4 disposition, +3 honneur)',
        'citadins_confortables': 'Admiration courage, incompréhension choix vie (+4 disposition)',
        'nobles': 'Soutien expansion civilisation, offres financement (+6 disposition)'
      },
      first_impression: '« Nouvelle Espérance pionnière ! Première génération colonie... Gardien 12 ans défense loups ?! Courage exceptionnel jeunesse. »',
      long_term_perception: 'Bâtisseur pionnier courageux. Certains admirent audace fondatrice, d\'autres compatissent dureté vie. Perçu travailleur, solidaire, optimiste, leader naturel.'
    },
    tags: ['frontier', 'pioneer', 'settler', 'builder'],
    incompatible_with: []
  },

  // ===== CITÉS SECONDAIRES (2) =====
  {
    id: 'birth_loc_bourg_fortifie',
    stage: 'birth',
    category: 'location',
    label: 'Bourg Fortifié Médiéval',
    desc: 'Né ville fortifiée 5000 habitants, centre régional commerce artisanat protégé murailles imposantes.',
    detailed_lore: {
      backstory: 'Rochefort : bourg médiéval construit colline rocheuse, murailles pierre 8m hauteur 2m épaisseur ceinturent ville. Quatre tours guet 20m surveillent campagnes alentours. Population 5000 habitants : artisans guildes (forgerons, tanneurs, tisserands), marchands boutiques, milice 200 soldats, noble local château citadelle. Marché hebdomadaire attire fermiers 50 villages alentours. Vous avez grandi rue pavées étroites, observant patrouilles gardes, festivals saisonniers, crieur public annonçant décrets seigneuriaux. Vie urbaine structurée : couvre-feu nocturne, taxes marchandes, justice sévère place publique (pilori, pendaisons). Mais sécurité murailles, commerce prospère, guildes formation apprentis.',
      defining_moment: 'À 14 ans, bandits assiégèrent ville 5 jours. Vous avez aidé défense portant munitions remparts, soignant blessés. Siège levé, seigneur récompensa vous exemption taxe commerciale 10 ans (privilège rare).',
      worldview_shaped: 'Murailles protègent civilisation chaos extérieur. Lois strictes maintiennent ordre paix. Guildes transmettent savoir-faire générations. Commerce enrichit communautés, autarcie appauvrit. Noblesse dirigeante légitime si protège peuple efficacement.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { constitution: 2, intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Bourgeois Fortifié Expérimenté',
          desc: '+5 Persuasion (négociations guildes), +3 Knowledge (lois/commerce), familiarité milice urbaine (+2 Tactics défense murailles), réseau guildes artisanales 8 métiers',
          effect: '+5 Persuasion, +3 Knowledge',
          game_effect: 'Expertise commerce urbain + connaissance défense'
        },
        {
          name: 'Privilège Seigneurial Accordé',
          desc: 'Exemption taxe commerciale Rochefort 10 ans (économies 15% achats locaux), accès archives château (recherches historiques), audience seigneur 1/an garantie',
          effect: 'Tax Exemption, Archive Access',
          game_effect: 'Avantages économiques + accès politique'
        },
        {
          name: 'Défenseur Siège Vétéran',
          desc: '+1d20 jets défense fortifications (sièges, embuscades urbaines), +3 Intimidation (présence martiale civique), connaissance ingénierie militaire basique',
          effect: '+1d20 Siege Defense',
          game_effect: 'Bonus d100 défense urbaine + autorité'
        }
      ],
      reputation: [
        { factionId: 'guildes_artisanales', delta: 8, reason: 'Membre familles guilde, réseau établi' },
        { factionId: 'noblesse_locale', delta: 6, reason: 'Reconnaissance seigneur, privilège accordé' },
        { factionId: 'milice_urbaine', delta: 5, reason: 'Respect défense siège, camaraderie' },
        { factionId: 'paysans_ruraux', delta: 3, reason: 'Relations commerciales marché hebdomadaire' }
      ],
      items: [
        { itemId: 'guild_seal_rochefort', quantity: 1, reason: 'Sceau guilde artisan (crédit commercial, accès ateliers)' },
        { itemId: 'tax_exemption_charter', quantity: 1, reason: 'Charte exemption taxe signée seigneur (document légal)' },
        { itemId: 'city_map_detailed', quantity: 1, reason: 'Plan détaillé Rochefort (passages secrets, caches)' },
        { itemId: 'quality_tools_trade', quantity: 1, reason: 'Outils métier qualité (forgeron ou tanneur ou tisserand)' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 5, reason: 'Négociations guildes, marchandages marché quotidiens' },
        { skillId: 'knowledge_commerce', bonus: 5, reason: 'Éducation commerciale, observation économie régionale' },
        { skillId: 'crafting', bonus: 3, reason: 'Apprentissage guilde métier familial' },
        { skillId: 'perception', bonus: 3, reason: 'Vigilance urbaine, détection pickpockets, dangers rues' }
      ],
      gold: 400,
      languages: ['Commun', 'Jargon Guildes Artisanales', 'Latin Légal (contrats)'],
      tags: ['urban', 'fortified', 'trade', 'guild', 'secure', 'prosperous']
    },
    social_impacts: {
      npc_reactions: {
        'artisans': 'Confiance professionnelle, collaboration facilitée (+10 disposition)',
        'milice': 'Respect vétéran siège, camaraderie (+8 disposition)',
        'nobles': 'Reconnaissance privilège, considération (+6 disposition)',
        'paysans': 'Relations commerciales positives (+5 disposition)',
        'bandits': 'Méfiance défenseur compétent, évitement (-4 disposition)'
      },
      first_impression: '« Rochefort fortifiée ! Défense siège 14 ans... Privilège seigneurial rare. Bourgeois respecté compétent. »',
      long_term_perception: 'Bourgeois artisan prospère. Certains admirent réussite commerciale, d\'autres jalousent privilèges. Perçu travailleur, loyal cité, défenseur efficace.'
    },
    tags: ['urban', 'fortified', 'trade', 'guild'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_ville_miniere',
    stage: 'birth',
    category: 'location',
    label: 'Ville Minière des Montagnes',
    desc: 'Né cité minière 3000 habitants exploitant filon or/argent, richesse rapide vie dangereuse.',
    detailed_lore: {
      backstory: 'Val-d\'Argent : ville minière boomtown fondée il y a 25 ans découverte filon argent pur massif. Population 3000 habitants fluctuante : mineurs travaillant galeries 12h/jour salaires élevés, prospecteurs cherchant fortune claims, marchands équipements, prostituées tavernes, joueurs saloons. Ville bruyante sale : dynamite explosant quotidien, chariots minerai bruyants, poussière argentée omniprésente. Dangers permanents : éboulements galeries, grisou explosif, accidents mortels fréquents (10 morts/mois), criminalité violente (vols, meurtres argent). Mais richesse rapide possible : mineur chanceux trouve pépite valant 5000 PO vie changée. Vous avez grandi taverne parentale observant fortunes faites/perdues quotidien, écoutant récits mineurs cicatrisés.',
      defining_moment: 'À 13 ans, éboulement piégea père oncle galerie 48h. Vous avez organisé sauvetage bénévole 20 mineurs—creusé 30h consécutives, extraits vivants miraculeux. Ville vous surnomma "Ange Galeries".',
      worldview_shaped: 'Richesse rapide corrompt autant libère. Argent physique vaut sueur sang versés extraction. Solidarité mineurs fraternité forgée dangers partagés. Vie précieuse éphémère—profiter aujourd\'hui car demain incertain. Tavernes lieux vérité alcool déliant langues.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { strength: 2, constitution: 2 },
      mechanical_traits: [
        {
          name: 'Enfant Mines Argent',
          desc: '+5 Athletics (minage, tunnels), +3 Survival (souterrain), vision pénombre 15m (yeux adaptés ténèbres galeries), résistance poussières toxiques',
          effect: '+5 Athletics, +3 Survival, Lowlight Vision',
          game_effect: 'Endurance minière + adaptation souterraine'
        },
        {
          name: 'Sauveteur Galeries Héros',
          desc: '+1d20 jets sauvetage (effondrements, noyades, incendies), +5 Medicine (premiers soins urgence), avantage rallier mineurs causes urgentes',
          effect: '+1d20 Rescue, +5 Medicine',
          game_effect: 'Bonus d100 sauvetages + soins traumatiques'
        },
        {
          name: 'Fortune Minière Héritée',
          desc: 'Commence 800 PO économies familiales (taverne prospère + pépites trouvées), réseau contacts mineurs 50+ galeries, accès claims miniers familiaux',
          effect: '800 Gold, Mining Network',
          game_effect: 'Richesse départ + opportunités exploitation'
        }
      ],
      reputation: [
        { factionId: 'mineurs', delta: 15, reason: 'Ange Galeries vénéré, sauveteur héroïque' },
        { factionId: 'prospecteurs', delta: 6, reason: 'Respect connaissance terrains miniers' },
        { factionId: 'tavernes', delta: 8, reason: 'Famille tenanciers respectés, hospitalité connue' },
        { factionId: 'criminels', delta: -4, reason: 'Morale élevée gêne activités illicites' }
      ],
      items: [
        { itemId: 'mining_pick_reinforced', quantity: 1, reason: 'Pioche renforcée paternelle (1d6+2, outil/arme, incassable)' },
        { itemId: 'silver_nuggets', quantity: 5, reason: 'Pépites argent pur (80 PO chacune, 400 PO total)' },
        { itemId: 'miners_lamp_quality', quantity: 1, reason: 'Lampe mineur huile qualité (lumière 30m, 12h autonomie)' },
        { itemId: 'claim_deed_family', quantity: 1, reason: 'Titre claim minier familial (galerie productive, revenu passif 50 PO/mois)' }
      ],
      skills: [
        { skillId: 'athletics', bonus: 5, reason: 'Travaux minage, creusage tunnels, endurance physique' },
        { skillId: 'survival', bonus: 3, reason: 'Orientation galeries, détection gaz, éviter effondrements' },
        { skillId: 'medicine', bonus: 5, reason: 'Premiers soins accidents miniers quotidiens urgence' },
        { skillId: 'persuasion', bonus: 3, reason: 'Négociations taverne, rallier mineurs causes' }
      ],
      gold: 800,
      languages: ['Commun', 'Cant Mineurs (jargon technique)', 'Signes Main Silencieux (galeries)'],
      tags: ['mining', 'mountain', 'prosperous', 'dangerous', 'hardworking', 'heroic']
    },
    social_impacts: {
      npc_reactions: {
        'mineurs': 'Vénération héros sauveteur, loyauté absolue (+20 disposition)',
        'prospecteurs': 'Respect expertise, demandes partenariat (+8 disposition)',
        'tavernes': 'Accueil chaleureux famille, crédit illimité (+10 disposition)',
        'criminels': 'Irritation morale élevée, évitement prudent (-6 disposition)',
        'marchands': 'Intérêt richesse familiale, propositions affaires (+7 disposition)'
      },
      first_impression: '« Val-d\'Argent ! Ange Galeries légendaire... Sauvetage 48h héroïque. Respect profond courage. »',
      long_term_perception: 'Héros mineur prospère. Certains admirent bravoure altruiste, d\'autres jalousent richesse. Perçu courageux, généreux, fort, leader naturel ouvriers.'
    },
    tags: ['mining', 'mountain', 'prosperous', 'dangerous'],
    incompatible_with: []
  },

  // ===== FRONTIÈRE MONTAGNE (1) =====
  {
    id: 'birth_loc_passage_montagne',
    stage: 'birth',
    category: 'location',
    label: 'Passage Montagneux Stratégique',
    desc: 'Né forteresse col montagne contrôlant seule route commerciale traversant chaîne titanesque.',
    detailed_lore: {
      backstory: 'Fort Aiguillon : forteresse militaire 800 habitants perchée col 2800m altitude, unique passage traversant Montagnes Crocs Dragon. Hiver 8 mois/an, températures -30°C, avalanches quotidiennes, air raréfié. Mais contrôle route commerciale reliant deux royaumes ennemis—droits passage génèrent 50.000 PO/an taxes. Population : 300 soldats garnison permanente, 200 civils (aubergistes, forgerons, guide montagne), 300 caravaniers temporaires. Vous êtes né caserne militaire haute altitude—enfance spartiates : entraînement milice 8 ans, corvées neige quotidiennes, rations militaires strictes, exercices survie blizzard. Mais discipline forge caractère acier. Dangers : brigands attaquant caravanes, avalanches ensevelissant passages, engelures mortelles, altitude provoquant mal aigu montagnes.',
      defining_moment: 'À 13 ans, avalanche massive coupa passage 12 jours—caravanes bloquées, vivres épuisés, émeute imminente. Vous avez guidé expédition 20 volontaires creusant tunnel neige compacte 3 jours consécutifs—passage rouvert juste avant famine. Commandant fort vous promut caporal honoraire 13 ans (record historique).',
      worldview_shaped: 'Positions stratégiques valent armées entières. Montagnes respectent force volonté, punissent faiblesse. Discipline militaire survie civilisation face chaos nature. Commerce enrichit nations mais génère conflits territoriaux. Altitude enseigne humilité face immensité cosmique.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { constitution: 2, strength: 2 },
      mechanical_traits: [
        {
          name: 'Enfant Haute Altitude Aguerri',
          desc: '+5 Survival (montagnes), +5 Athletics (escalade, alpinisme), immunité mal altitude (acclimatation permanente), résistance froid extrême (besoin chaleur -50%)',
          effect: '+5 Survival, +5 Athletics',
          game_effect: 'Maîtrise montagne totale + endurance climatique'
        },
        {
          name: 'Formation Milice Précoce',
          desc: '+1d20 Tactics (défense positions fortifiées), +3 Intimidation (présence militaire), maîtrise arbalètes/piques (armes garnison standard), +10 HP (endurance spartiate)',
          effect: '+1d20 Tactics, +3 Intimidation, +10 HP',
          game_effect: 'Bonus d100 stratégie défensive + vitalité militaire'
        },
        {
          name: 'Guide Passage Certifié',
          desc: '+3 Navigation (cols montagneux), détection avalanches 80% précision (lecture neige), connaissance 12 routes alternatives secrètes, réseau guides montagne 30+ professionnels',
          effect: '+3 Navigation, Avalanche Sense',
          game_effect: 'Guidage expert + instinct dangers montagne'
        }
      ],
      reputation: [
        { factionId: 'garnison_militaire', delta: 12, reason: 'Caporal honoraire 13 ans, héros avalanche' },
        { factionId: 'caravanes_commerciales', delta: 10, reason: 'Sauveteur passage, guide fiable' },
        { factionId: 'guides_montagne', delta: 8, reason: 'Respect compétence alpinisme précoce' },
        { factionId: 'brigands_cols', delta: -8, reason: 'Défenseur caravanes, ennemi raids' }
      ],
      items: [
        { itemId: 'crossbow_heavy_military', quantity: 1, reason: 'Arbalète lourde garnison (2d6, portée 100m, perce armure)' },
        { itemId: 'ice_climbing_gear', quantity: 1, reason: 'Équipement escalade glace complet (crampons, piolets, cordes)' },
        { itemId: 'avalanche_beacon', quantity: 1, reason: 'Balise avalanche magique (localisation sous neige 50m)' },
        { itemId: 'military_rank_insignia', quantity: 1, reason: 'Insigne caporal honoraire (autorité garnisons, respect soldats)' }
      ],
      skills: [
        { skillId: 'survival', bonus: 5, reason: 'Vie haute altitude hostile depuis naissance, autonomie montagne' },
        { skillId: 'athletics', bonus: 5, reason: 'Escalade quotidienne, alpinisme, corvées militaires' },
        { skillId: 'tactics', bonus: 5, reason: 'Formation défense fortifications, observation stratégie garnison' },
        { skillId: 'intimidation', bonus: 3, reason: 'Discipline militaire, présence martiale, rang caporal' }
      ],
      gold: 350,
      languages: ['Commun', 'Cant Militaire Garnison', 'Dialecte Guides Montagne', 'Signes Main Avalanche (urgence)'],
      tags: ['mountain', 'military', 'strategic', 'fortress', 'hardy', 'tactical']
    },
    social_impacts: {
      npc_reactions: {
        'militaires': 'Respect rang honoraire, camaraderie fraternelle (+15 disposition)',
        'caravanes': 'Gratitude sauvetage, confiance guidage (+12 disposition)',
        'guides': 'Reconnaissance compétence, collaboration offerte (+10 disposition)',
        'brigands': 'Méfiance défenseur redoutable, évitement prudent (-10 disposition)',
        'citadins_plaine': 'Admiration endurance extrême, incompréhension choix (+4 disposition)'
      },
      first_impression: '« Fort Aiguillon 2800m altitude ?! Caporal honoraire 13 ans... Tunnel avalanche héroïque. Discipline montagnarde impressionnante. »',
      long_term_perception: 'Gardien passage stratégique. Certains admirent courage militaire, d\'autres compatissent vie spartiate. Perçu discipliné, endurant, protecteur, leader tactique.'
    },
    tags: ['mountain', 'military', 'strategic', 'fortress'],
    incompatible_with: []
  },

  // ===== LIEUX INTERDITS (3) =====
  {
    id: 'birth_loc_prison_ile',
    stage: 'birth',
    category: 'location',
    label: 'Prison-Île Maximum Sécurité',
    desc: 'Né île pénitentiaire isolée océan où royaume exile criminels dangereux, gardiens naissent prison.',
    detailed_lore: {
      backstory: 'Île Fers : prison maximum sécurité 2000 détenus située île rocheuse 50km côtes, courants marins mortels empêchent évasion. 500 gardiens familles vivent forteresse centrale—vous fils/fille gardien-chef, né cellule réaménagée appartement. Enfance paradoxale : jouer cours exercice prisonniers, apprendre lecture bibliothèque pénitentiaire, observer interrogatoires, assister exécutions publiques place centrale (pédagogie justice). Détenus : meurtriers, traîtres, mages renégats, cultistes démoniaques. Sécurité draconienne : patrouilles 24h, magie anti-évasion, rations minimales, travaux forcés carrières. Mais exposition quotidienne criminalité enseigne nature humaine sombre. Dangers : émeutes prisonniers, tentatives assassinat gardiens, contrebande armes/drogues, corruption intérieure.',
      defining_moment: 'À 14 ans, émeute sanglante 300 détenus tua 40 gardiens—vous avez rallié survivants défense ultime arsenal, résisté 8h jusqu\'arrivée renforts navals. Répression brutale exécuta 80 meneurs. Vous compris : ordre maintenu prix sang constant.',
      worldview_shaped: 'Justice nécessite violence légitime contrôler chaos. Criminalité nature humaine inévitable, pas anomalie sociale. Pitié excessive dangereuse—clémence invite trahison. Ordre civilisé fragile murailles invisibles discipline. Pardon luxe impossibles sociétés imparfaites.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { wisdom: 2, constitution: 2 },
      mechanical_traits: [
        {
          name: 'Psychologie Criminelle Experte',
          desc: '+5 Insight (détection mensonges), +5 Investigation (interrogatoires), +1d20 résister intimidation/manipulation, immunité charme/coercition mentale (exposition quotidienne manipulation)',
          effect: '+5 Insight, +5 Investigation, +1d20 Mental Resist',
          game_effect: 'Lecture humaine légendaire + défense psychologique'
        },
        {
          name: 'Défenseur Ordre Aguerri',
          desc: '+3 Intimidation (présence autoritaire pénitentiaire), +3 Athletics (maîtrise prisonniers), connaissance protocoles sécurité maximum, réseau gardiens 12 prisons royaume',
          effect: '+3 Intimidation, +3 Athletics',
          game_effect: 'Autorité carcérale + force physique contrôle'
        },
        {
          name: 'Survivant Émeute Héroïque',
          desc: '+10 HP (endurance combats brutaux), avantage jets sauvegarder contexte foules hostiles, +2 initiative (réflexes survie aiguisés)',
          effect: '+10 HP, +2 Initiative',
          game_effect: 'Vitalité renforcée + réactivité combat'
        }
      ],
      reputation: [
        { factionId: 'gardiens_prisons', delta: 15, reason: 'Héros émeute Île Fers, fils gardien-chef' },
        { factionId: 'forces_ordre', delta: 10, reason: 'Respect maintien ordre, compétence sécuritaire' },
        { factionId: 'criminels_liberes', delta: -12, reason: 'Haine gardiens, souvenir brutalité répression' },
        { factionId: 'reformistes_sociaux', delta: -6, reason: 'Opposition philosophie justice punitive dure' }
      ],
      items: [
        { itemId: 'baton_reinforced_steel', quantity: 1, reason: 'Bâton acier renforcé gardien (1d8, non-létal option, incassable)' },
        { itemId: 'shackles_magic_binding', quantity: 2, reason: 'Menottes liaison magique (bloquent sorts niveau 1-3, 120 PO chacune)' },
        { itemId: 'warden_badge_authority', quantity: 1, reason: 'Insigne gardien-fils chef (autorité carcérale, accès prisons royaume)' },
        { itemId: 'interrogation_manual', quantity: 1, reason: 'Manuel interrogatoire pénitentiaire (techniques psychologiques avancées)' }
      ],
      skills: [
        { skillId: 'insight', bonus: 5, reason: 'Observation détenus quotidienne, détection mensonges, manipulation' },
        { skillId: 'investigation', bonus: 5, reason: 'Interrogatoires assistés, fouilles cellules, enquêtes internes' },
        { skillId: 'intimidation', bonus: 3, reason: 'Maintien ordre autoritaire, présence pénitentiaire' },
        { skillId: 'athletics', bonus: 3, reason: 'Maîtrise physique prisonniers, patrouilles, défense' }
      ],
      gold: 400,
      languages: ['Commun', 'Cant Criminels (compréhension)', 'Codes Gardiens Prisons', 'Signes Main Silencieux (surveillance)'],
      tags: ['prison', 'law', 'dark', 'brutal', 'authoritarian', 'isolated']
    },
    social_impacts: {
      npc_reactions: {
        'gardiens': 'Fraternité profonde, loyauté inconditionnelle (+18 disposition)',
        'forces_ordre': 'Respect compétence, collaboration facilitée (+12 disposition)',
        'ex_criminels': 'Haine viscérale, hostilité automatique (-15 disposition)',
        'reformistes': 'Désapprobation morale méthodes dures (-8 disposition)',
        'villageois': 'Malaise passé prison, crainte brutalité (+1 disposition, distance)'
      },
      first_impression: '« Île Fers maximum sécurité... Émeute 300 détenus survécue ?! Regardez ces yeux—ont vu noirceurs profondes. Respectez distance. »',
      long_term_perception: 'Gardien-né ordre brutal. Certains admirent dévouement justice, majorité terrifie dureté morale. Perçu compétent, impitoyable, traumatisé, socialement isolé.'
    },
    tags: ['prison', 'law', 'dark', 'brutal'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_catacombes',
    stage: 'birth',
    category: 'location',
    label: 'Catacombes Oubliées Millénaires',
    desc: 'Né réseau souterrain 200km tunnels ossements où communauté isolée vit ténèbres permanentes générations.',
    detailed_lore: {
      backstory: 'Catacombes Éternelles : labyrinthe souterrain 8 niveaux profondeur 150m abritant ossements 2 millions défunts 600 ans accumulation. Niveau inférieur habité 300 habitants : descendants gardiens catacombes anciens, réfugiés persécutions oubliés, mages ténèbres cherchant isolation. Aucune lumière naturelle jamais—torchères champignons phosphorescents, cristaux luisants faibles. Vous avez grandi alcôve creusée mur ossements—jamais vu soleil avant 16 ans, peau albinos pâle, yeux surdéveloppés vision ténèbres. Nourriture : champignons cultivés, rats souterrains chassés, eau suintement roche filtrée. Dangers : effondrements tunnels, morts-vivants niveaux profonds, folie isolation prolongée, cannibalisme désespoir famines. Mais catacombes recèlent trésors enterrés morts riches.',
      defining_moment: 'À 12 ans, perdu niveau 6 inconnu 3 jours ténèbres absolues (torche consumée). Vous avez développé écholocalisation spontanée (cris/échos navigation) survécu mangeant champignons toxiques (résistance acquise). Retrouver communauté provoqua révérence—Ancien nomma vous \"Enfant Ténèbres Béni\".',
      worldview_shaped: 'Lumière luxe superflu—ténèbres environnement naturel adapté. Surface monde étranger terrifiant (espace infini angoissant). Morts compagnons silencieux respectables, pas menaces. Isolation protège persécutions cruelles surface. Champignons nourriture sacrée sustentation souterraine.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { dexterity: 2, intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Enfant Ténèbres Absolues',
          desc: 'Vision ténèbres parfaite 40m (écholocalisation + yeux adaptés), +5 Stealth (ténèbres), +1d20 Navigation (souterrain total), désavantage lumière vive (sensibilité solaire douloureuse)',
          effect: 'Darkvision 40m, +5 Stealth, +1d20 Underground Nav',
          game_effect: 'Maîtrise ténèbres totale mais faiblesse lumière'
        },
        {
          name: 'Survivant Souterrain Extrême',
          desc: '+5 Survival (souterrain), immunité maladies fongiques (exposition générationnelle), +3 Athletics (escalade tunnels verticaux), résistance toxines champignons 75%',
          effect: '+5 Survival, +3 Athletics, Fungal Immunity',
          game_effect: 'Endurance souterraine + santé adaptée'
        },
        {
          name: 'Connaissance Ossuaires Anciens',
          desc: '+3 Religion (rites funéraires obscurs), +3 History (secrets enterrés), détection passages secrets catacombes (+5 Investigation contexte souterrain), réseau contacts 5 niveaux catacombes',
          effect: '+3 Religion, +3 History',
          game_effect: 'Sagesse mortuaire + archéologie souterraine'
        }
      ],
      reputation: [
        { factionId: 'habitants_catacombes', delta: 12, reason: 'Enfant Ténèbres Béni, survie légendaire' },
        { factionId: 'mages_tenebres', delta: 8, reason: 'Affinité obscurité naturelle, respect adaptation' },
        { factionId: 'surface_dwellers', delta: -6, reason: 'Malaise apparence albinos, peur souterrain' },
        { factionId: 'archeologues', delta: 10, reason: 'Connaissance catacombes inestimable, guidage sites' }
      ],
      items: [
        { itemId: 'fungal_torch_perpetual', quantity: 2, reason: 'Torche champignon perpétuelle (lumière faible 10m, pousse indéfiniment)' },
        { itemId: 'bone_dagger_ancient', quantity: 1, reason: 'Dague os humain ancienne (1d4+1, légère, canal nécromancie +1)' },
        { itemId: 'echolocation_whistle', quantity: 1, reason: 'Sifflet écholocalisation (navigation ténèbres 30m précision)' },
        { itemId: 'catacomb_map_partial', quantity: 1, reason: 'Carte partielle 5 niveaux supérieurs (passages secrets marqués)' }
      ],
      skills: [
        { skillId: 'stealth', bonus: 5, reason: 'Déplacement silencieux ténèbres absolues quotidien' },
        { skillId: 'survival', bonus: 5, reason: 'Vie souterraine hostile, chasse rats, cueillette champignons' },
        { skillId: 'athletics', bonus: 3, reason: 'Escalade tunnels verticaux, passages étroits' },
        { skillId: 'religion', bonus: 3, reason: 'Rites funéraires catacombes, respect ossements anciens' }
      ],
      gold: 200,
      languages: ['Commun', 'Dialecte Catacombes (chuchotements)', 'Écholocalisation (clics/échos)', 'Latin Funéraire (inscriptions anciennes)'],
      tags: ['underground', 'dark', 'isolated', 'cursed', 'albino', 'eerie']
    },
    social_impacts: {
      npc_reactions: {
        'habitants_souterrains': 'Fraternité profonde ténèbres partagées (+15 disposition)',
        'archeologues': 'Enthousiasme guidage, questions incessantes (+12 disposition)',
        'villageois_surface': 'Peur albinisme, superstition malédiction (-8 disposition)',
        'mages_tenebres': 'Fascination adaptation, propositions mentorat (+10 disposition)',
        'prêtres_lumière': 'Pitié compassion, offres rédemption (+4 disposition)'
      },
      first_impression: '« Catacombes Éternelles ?! Peau albinos, yeux immenses... Jamais vu soleil 16 ans ?! Écholocalisation humaine possible ? Fascinant terrifiant. »',
      long_term_perception: 'Enfant ténèbres énigmatique. Certains admirent adaptation extrême, majoritaire terrifie apparence spectrale. Perçu étrange, silencieux, sage souterrain, socialement inadapté surface.'
    },
    tags: ['underground', 'dark', 'isolated', 'cursed'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_temple_profane',
    stage: 'birth',
    category: 'location',
    label: 'Temple Profané Déchu',
    desc: 'Né sanctuaire sacré corrompu culte démoniaque générations passées, ruines maudites abritant hérétiques.',
    detailed_lore: {
      backstory: 'Temple Sept Vertus Profanées : cathédrale grandiose 300 ans âge, jadis dédiée panthéon divin, corrompue rituel démoniaque catastrophique il y a 80 ans. Prêtres-traîtres invoquèrent seigneur démon—bataille céleste/infernale ravagea temple, anges déchus statues brisées, autels souillés sang innocent, vitraux saints fracassés. Ruine abandonnée officiellement mais 120 habitants marginaux : cultistes démoniaques continuant rites interdits, hérétiques théologiques réfugiés, mages nécromanciens exploitant énergies ténèbres résiduelles. Vous avez grandi crypte sous-temple converti dortoir—enfance blasphématoire : assister sacrifices rituels animaux (parfois humains), apprendre théologie inversée (vice = vertu), observer invocations mineures démons familiers. Architecture corrompue : gargouilles animées hostiles, portes scellées magie noire, présence oppressante mal palpable.',
      defining_moment: 'À 13 ans, paladin Ordre Lumière attaqua temple exorcisme—10 paladins massacrèrent cultistes. Vous avez caché 15 enfants crypte secrète, négocié reddition évitant massacre total. Paladin-commandant épargna innocents mais marqua vous symbole pénitence front (stigmate visible permanent).',
      worldview_shaped: 'Bien/mal constructions subjectives dominants. Dieux abandonnent fidèles—démons offrent pouvoir réel tangible. Église hypocrite persécute différence théologique violemment. Innocence enfantine corrompue environnement—responsabilité adultes éduquant. Rédemption possible mais stigmate social permanent.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { charisma: 2, intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Théologien Hérétique Éduqué',
          desc: '+5 Religion (théologie orthodoxe/hérétique), +5 Arcana (magie démoniaque), +1d20 résister détection/bannissement divin (aura corrompue masquée), connaissance 3 invocations démons mineurs',
          effect: '+5 Religion, +5 Arcana, +1d20 Divine Resist',
          game_effect: 'Érudition blasphématoire + défense céleste'
        },
        {
          name: 'Survivant Massacre Exorcisme',
          desc: '+3 Persuasion (négociation désespérée), +3 Deception (cacher nature hérétique), stigmate pénitence visible (CHA -1 interactions cléricales, +2 Intimidation contexte démoniaque)',
          effect: '+3 Persuasion, +3 Deception',
          game_effect: 'Diplomatie salvatrice + dissimulation identité'
        },
        {
          name: 'Résilience Ténèbres Corrompues',
          desc: 'Résistance nécromancie/démonologie 25% (exposition générationnelle), immunité possession démons mineurs (âme marquée démoniaque), détection présences infernales 20m',
          effect: 'Dark Resist 25%, Possession Immunity',
          game_effect: 'Défense ténèbres + sens infernal'
        }
      ],
      reputation: [
        { factionId: 'cultistes_demoniaques', delta: 8, reason: 'Enfant temple, éducation hérétique, survie massacre' },
        { factionId: 'eglise_orthodoxe', delta: -15, reason: 'Stigmate pénitence, origine blasphématoire, hérésie' },
        { factionId: 'mages_noirs', delta: 10, reason: 'Connaissance démoniaque rare, affinité ténèbres' },
        { factionId: 'paladins_redemption', delta: 4, reason: 'Reconnaissance innocence enfantine, potentiel rédempteur' }
      ],
      items: [
        { itemId: 'unholy_symbol_defaced', quantity: 1, reason: 'Symbole impie défiguré (focus démoniaque, +2 invocations)' },
        { itemId: 'demon_summoning_tome', quantity: 1, reason: 'Tome invocations démons mineurs (3 rituels niveau 1-2, interdit)' },
        { itemId: 'penance_scar_visible', quantity: 1, reason: 'Stigmate pénitence front (marque permanente, CHA -1 prêtres)' },
        { itemId: 'sanctuary_key_corrupted', quantity: 1, reason: 'Clé sanctuaire corrompu (accès cryptes secrètes temple)' }
      ],
      skills: [
        { skillId: 'religion', bonus: 5, reason: 'Éducation théologique hérétique/orthodoxe comparative intensive' },
        { skillId: 'arcana', bonus: 5, reason: 'Observation rituels démoniaques, magie noire quotidienne' },
        { skillId: 'persuasion', bonus: 3, reason: 'Négociation survie massacre, diplomatie désespérée' },
        { skillId: 'deception', bonus: 3, reason: 'Cacher origines hérétiques, éviter persécution cléricale' }
      ],
      gold: 250,
      languages: ['Commun', 'Infernal (démonique)', 'Latin Ecclésiastique (prières corrompues)', 'Cant Cultistes (rituel)'],
      tags: ['cursed', 'heretical', 'demonic', 'dark', 'stigmatized', 'blasphemous']
    },
    social_impacts: {
      npc_reactions: {
        'cultistes': 'Solidarité marginalisés, fraternité hérétique (+10 disposition)',
        'clergé_orthodoxe': 'Hostilité automatique stigmate, évangélisation forcée (-18 disposition)',
        'mages_noirs': 'Fascination connaissance démoniaque, propositions enseignement (+12 disposition)',
        'paladins': 'Suspicion méfiante, surveillance constante (-8 disposition, +6 si repenti)',
        'villageois': 'Peur stigmate visible, superstition malédiction (-10 disposition)'
      },
      first_impression: '« Temple Profané ?! Stigmate pénitence front... Vous connaissez vraiment invocations démoniaques ?! Dangereux mais survivant massacre innocent. »',
      long_term_perception: 'Hérétique stigmatisé pénitent. Certains compatissent innocence corrompue, majorité terrifie blasphème. Perçu érudit, dangereux, marqué, quête rédemption impossible.'
    },
    tags: ['cursed', 'heretical', 'demonic', 'dark'],
    incompatible_with: []
  },

  // ===== MERVEILLES NATURELLES (3) =====
  {
    id: 'birth_loc_cascade_eternelle',
    stage: 'birth',
    category: 'location',
    label: 'Cascade Éternelle Arc-en-Ciel',
    desc: 'Né merveille naturelle cascade 500m hauteur générant arc-en-ciel permanent, site sacré pèlerinage.',
    detailed_lore: {
      backstory: 'Chutes Prisme Céleste : cascade titanesque 500m chute verticale, volume eau 10.000 litres/seconde, brume permanente créant arc-en-ciel visible 10km. Légende locale : larmes déesse Joie pleurant beauté monde mortel. Site sacré : 300 pèlerins permanents campant amphithéâtre naturel base, druides vénérant esprits eau, artistes capturant beauté sublime, couples célébrant mariages symboliques. Vous êtes né grotte derrière cascade (passage secret rideau eau)—enfance féérique : baigner bassins arc-en-ciel, écouter tonnerres eau constants, observer double/triple arcs-en-ciel jours ensoleillés, méditer brume apaisante. Eau cascade possède propriétés curatives mineures (folklore confirmé guérisons miraculeuses). Dangers : glissades rochers mouillés mortelles, inondations saisonnières, hypothermie brume froide.',
      defining_moment: 'À 9 ans, enfant pèlerin tomba cascade—vous avez plongé torrent déchaîné, nagé contre-courant titanique, saisi enfant 50m chute. Druides déclarèrent vous \"Béni Déesse Joie\"—immunité noyade, respiration aquatique 10min.',
      worldview_shaped: 'Beauté naturelle manifestation divine tangible. Eau source vie sacrée méritant vénération. Joie émotion spirituelle légitime, pas frivolité. Nature généreuse offre miracles quotidiens observateurs attentifs. Sacrifice altruiste récompensé bénédictions divines.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { wisdom: 2, charisma: 2 },
      mechanical_traits: [
        {
          name: 'Béni Déesse Joie',
          desc: 'Respiration aquatique 10min, +5 Swimming (torrents), immunité noyade (flottabilité divine), +1d20 jets sauvegarder joie/désespoir (équilibre émotionnel béni)',
          effect: 'Water Breathing, +5 Swimming, +1d20 Emotion Saves',
          game_effect: 'Affinité aquatique divine + sérénité mentale'
        },
        {
          name: 'Enfant Arc-en-Ciel Sacré',
          desc: '+5 Performance (chant harmonie cascade), +3 Medicine (eaux curatives), aura apaisante (+3 Persuasion contextes conflits), connaissance prières eau 12 traditions',
          effect: '+5 Performance, +3 Medicine',
          game_effect: 'Charisme harmonieux + guérison aquatique'
        },
        {
          name: 'Sauveteur Héroïque Cascade',
          desc: '+3 Athletics (natation torrents), +10 HP (endurance noyade survécue), avantage secourir personnes eaux dangereuses, réseau pèlerins 200+ fidèles reconnaissants',
          effect: '+3 Athletics, +10 HP',
          game_effect: 'Force sauvetage + vitalité aquatique'
        }
      ],
      reputation: [
        { factionId: 'pelerins_cascade', delta: 15, reason: 'Béni Déesse Joie, sauveteur miraculeux' },
        { factionId: 'druides_eau', delta: 12, reason: 'Affinité esprits eau, bénédiction divine reconnue' },
        { factionId: 'artistes', delta: 8, reason: 'Inspiration beauté vécue, muse cascade' },
        { factionId: 'pretres_joie', delta: 10, reason: 'Incarnation vivante doctrine joie sacrée' }
      ],
      items: [
        { itemId: 'rainbow_water_vial', quantity: 5, reason: 'Fioles eau arc-en-ciel (soigne 1d6 HP chacune, bénédiction +1 jets 1h)' },
        { itemId: 'waterfall_crystal', quantity: 1, reason: 'Cristal cascade (focus prières eau, amplifie sorts aquatiques +2)' },
        { itemId: 'pilgrims_blessing_token', quantity: 1, reason: 'Médaillon bénédiction pèlerins (symbole sacré reconnu universellement)' },
        { itemId: 'silk_rope_waterproof', quantity: 20, reason: 'Corde soie imperméable (sauvetages aquatiques, 300kg charge)' }
      ],
      skills: [
        { skillId: 'swimming', bonus: 5, reason: 'Natation torrents cascade quotidienne depuis enfance' },
        { skillId: 'performance', bonus: 5, reason: 'Chant harmonie eau, cérémonies pèlerins' },
        { skillId: 'medicine', bonus: 3, reason: 'Connaissance propriétés curatives eaux sacrées' },
        { skillId: 'athletics', bonus: 3, reason: 'Escalade rochers mouillés, sauvetages aquatiques' }
      ],
      gold: 300,
      languages: ['Commun', 'Aquan (esprits eau)', 'Chants Cascade (mélodies sacrées)', 'Prières Joie (12 traditions)'],
      tags: ['natural', 'sacred', 'aquatic', 'blessed', 'beautiful', 'healing']
    },
    social_impacts: {
      npc_reactions: {
        'pelerins': 'Vénération béni vivant, hospitalité infinie (+18 disposition)',
        'druides': 'Respect profond affinité eau, collaboration spirituelle (+15 disposition)',
        'artistes': 'Fascination beauté incarnée, demandes modèle (+10 disposition)',
        'cyniques': 'Scepticisme miracles, irritation piété naïve (-4 disposition)',
        'prêtres_joie': 'Accueil fraternel doctrine partagée, bénédictions offertes (+12 disposition)'
      },
      first_impression: '« Cascade Éternelle 500m ?! Béni Déesse Joie... Sauvetage torrent 9 ans miraculeux. Aura sérénité palpable. Respectez grandement. »',
      long_term_perception: 'Enfant miracle cascade sacrée. Certains admirent sainteté naturelle, d\'autres jalousent bénédictions divines. Perçu serein, altruiste, guérisseur, inspirant.'
    },
    tags: ['natural', 'sacred', 'aquatic', 'blessed'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_canyon_echos',
    stage: 'birth',
    category: 'location',
    label: 'Canyon Échos Magiques',
    desc: 'Né gorge profonde où sons résonnent éternellement, créant symphonie naturelle perpétuelle.',
    detailed_lore: {
      backstory: 'Canyon Voix Immortelles : faille géologique 10km longueur 300m profondeur, parois rocheuses cristallines amplifient/prolongent sons indéfiniment. Acoustique surnaturelle : murmure devient tonnerre 30 secondes plus tard, chanson simple résonne harmoniques complexes 5min. Légende : canyon créé cri agonie titan enchaîné sous-terre. Population 200 habitants : bardes étudiant acoustique parfaite, moines silence vœu mutisme permanent, acousticiens cartographiant phénomènes sonores. Vous avez grandi cabane paroi canyon accessible échelles—enfance sonore unique : chaque mot prononcé revient transformé, composer mélodies architecture sonore, communiquer échos lointains (messages 5km instantanés). Dangers : avalanches déclenchées sons forts, désorientation échos contradictoires, folie cacophonie involontaire.',
      defining_moment: 'À 11 ans, avalanche piégea 30 personnes caverne effondrée. Vous avez utilisé échos canyon localiser précisément survivants (cartographie sonore mentale 3D), guidé sauveteurs excavation ciblée—tous sauvés. Moines silence vous enseignèrent langage signes complet reconnaissance maîtrise son.',
      worldview_shaped: 'Son force physique tangible, pas phénomène abstrait. Silence vertu spirituelle face bruit oppressant monde. Architecture acoustique forme art légitime négligée. Communication non-verbale supérieure paroles souvent trompeuses. Écoute attentive révèle vérités cachées bavardages.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { intelligence: 2, wisdom: 2 },
      mechanical_traits: [
        {
          name: 'Maître Échos Canyon',
          desc: '+5 Perception (auditive), +1d20 Navigation (écholocalisation canyon), détection créatures invisibles sons 50m, cartographie mentale 3D environnements acoustiques',
          effect: '+5 Perception, +1d20 Echo Navigation',
          game_effect: 'Ouïe légendaire + orientation sonore'
        },
        {
          name: 'Acousticien Prodige',
          desc: '+5 Performance (chant harmoniques), connaissance théorie musicale avancée, amplifier sons ×10 volume (architecture acoustique), +3 Arcana (magie sonore/thunder)',
          effect: '+5 Performance, +3 Arcana',
          game_effect: 'Expertise son + magie tonnerre'
        },
        {
          name: 'Langage Silence Moines',
          desc: 'Communication signes parfaite (100 mots/min silencieux), +3 Stealth (déplacement silencieux absolu), avantage résister sorts thunder/sonic (acclimatation quotidienne)',
          effect: 'Sign Language, +3 Stealth',
          game_effect: 'Communication muette + défense sonique'
        }
      ],
      reputation: [
        { factionId: 'bardes_canyon', delta: 12, reason: 'Prodige acoustique, sauveteur échos' },
        { factionId: 'moines_silence', delta: 10, reason: 'Maîtrise langage signes, respect discipline sonore' },
        { factionId: 'acousticiens', delta: 8, reason: 'Cartographie mentale 3D unique, collaboration scientifique' },
        { factionId: 'mages_thunder', delta: 6, reason: 'Affinité magie sonore naturelle' }
      ],
      items: [
        { itemId: 'tuning_fork_crystal', quantity: 1, reason: 'Diapason cristal canyon (focus sorts thunder +2, navigation 100m)' },
        { itemId: 'echo_mapping_journal', quantity: 1, reason: 'Journal cartographie échos (cartes acoustiques 20 sites)' },
        { itemId: 'silent_boots_monk', quantity: 1, reason: 'Bottes silence moines (Stealth +5, déplacement totalement muet)' },
        { itemId: 'voice_amplifier_horn', quantity: 1, reason: 'Corne amplification voix (porte son 5km canyon, communication longue distance)' }
      ],
      skills: [
        { skillId: 'perception', bonus: 5, reason: 'Écoute attentive quotidienne échos, détection sons subtils' },
        { skillId: 'performance', bonus: 5, reason: 'Chant acoustique canyon, composition harmoniques' },
        { skillId: 'stealth', bonus: 3, reason: 'Déplacement silencieux absolu, discipline moines' },
        { skillId: 'arcana', bonus: 3, reason: 'Étude magie sonore, sorts thunder observés' }
      ],
      gold: 300,
      languages: ['Commun', 'Langage Signes Canyon (complet)', 'Harmoniques Musicales (notation)', 'Écholocalisation (clics)'],
      tags: ['natural', 'acoustic', 'silent', 'unique', 'scholarly', 'mysterious']
    },
    social_impacts: {
      npc_reactions: {
        'bardes': 'Admiration maîtrise acoustique, collaboration musicale (+12 disposition)',
        'moines': 'Respect discipline silence, fraternité spirituelle (+10 disposition)',
        'acousticiens': 'Fascination cartographie mentale, demandes étude (+8 disposition)',
        'villageois_bruyants': 'Irritation préférence silence, incompréhension (+2 disposition)',
        'mages': 'Intérêt affinité thunder, propositions enseignement (+6 disposition)'
      },
      first_impression: '« Canyon Voix Immortelles ?! Cartographie mentale 3D sons... Sauvetage écholocalisation extraordinaire. Communication signes fluide impressionnante. »',
      long_term_perception: 'Maître échos énigmatique. Certains admirent expertise sonore unique, d\'autres déconcertés préférence silence. Perçu intelligent, contemplatif, artistique, socialement réservé.'
    },
    tags: ['natural', 'acoustic', 'silent', 'unique'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_geysers_arcaniques',
    stage: 'birth',
    category: 'location',
    label: 'Champ Geysers Arcaniques',
    desc: 'Né zone géothermique où geysers crachent eau magique saturée énergie arcan brute.',
    detailed_lore: {
      backstory: 'Plaine Fontaines Mana : champ 20km² abritant 300 geysers actifs crachant eau bouillante infusée magie arcan 5-120min intervalles réguliers. Origine : faille plan Magie percée terre il y a 400 ans, saturation permanente énergie élémentaire. Eau geysers possède propriétés alchimiques extraordinaires (composants potions, catalyseurs sorts). Population 250 habitants : alchimistes récoltant eau magique, mages étudiant phénomènes arcaniques, marchands exportant fioles précieuses. Vous avez grandi cabane pilotis (sol instable/chaud)—enfance magique dangereuse : esquiver geysers éruptions surprise, baigner bassins tièdes chargés mana, absorber énergie arcan quotidienne (métabolisme modifié). Dangers : ébouillures eau 95°C, explosions mana incontrôlées, mutations mineures exposition prolongée.',
      defining_moment: 'À 10 ans, geyser majeur éruption catastrophique menaça inonder alchimie district—vous avez canalisé instinctivement énergie arcan torrent stabilisant pression magique. Archimage identifié vous \"Conduit Mana Vivant\"—capacité absorber/libérer mana ×3 normal.',
      worldview_shaped: 'Magie force naturelle élémentaire, pas discipline académique artificielle. Danger omniprésent prix progrès scientifique acceptable. Mutations mineures évolution adaptative bénéfique. Alchimie plus lucrative épée—savoir vaut or. Énergie arcan respiration invisible environnement.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { intelligence: 2, constitution: 2 },
      mechanical_traits: [
        {
          name: 'Conduit Mana Vivant',
          desc: 'Slots sorts +3 niveau 1 (réserve mana accrue), +1d20 Arcana (magie arcan brute), récupération repos court restaure 50% slots (métabolisme magique), absorption énergie arcan environnement',
          effect: '+3 Level 1 Slots, +1d20 Arcana',
          game_effect: 'Réserve magique titanesque + affinité arcan'
        },
        {
          name: 'Alchimiste Geysers Expérimenté',
          desc: '+5 Alchemy (potions eau magique), connaissance 20 formules rares, +30% efficacité potions créées (eau geysers supérieure), réseau alchimistes 15 guildes',
          effect: '+5 Alchemy, Potion Boost 30%',
          game_effect: 'Maîtrise alchimique + commerce lucratif'
        },
        {
          name: 'Résistance Mutation Arcan',
          desc: 'Résistance dégâts magie arcan 25%, immunité mutations magiques involontaires (stabilité génétique), détection pics mana 50m (instinct survie)',
          effect: 'Arcane Resist 25%, Mutation Immunity',
          game_effect: 'Défense magie + santé protégée'
        }
      ],
      reputation: [
        { factionId: 'alchimistes', delta: 12, reason: 'Accès eau geysers qualité suprême, expertise formules' },
        { factionId: 'mages_academies', delta: 10, reason: 'Conduit Mana Vivant rare, étude phénomène' },
        { factionId: 'marchands_composants', delta: 8, reason: 'Commerce fioles eau magique lucratif' },
        { factionId: 'anti_magie', delta: -8, reason: 'Incarnation dépendance arcan excessive' }
      ],
      items: [
        { itemId: 'geyser_water_vials', quantity: 10, reason: 'Fioles eau geyser magique (composant alchimique, 50 PO chacune)' },
        { itemId: 'mana_crystal_charged', quantity: 1, reason: 'Cristal mana chargé geysers (stocke 5 slots niveau 1, rechargeable)' },
        { itemId: 'heat_resistant_gloves', quantity: 1, reason: 'Gants résistance chaleur alchimique (manipulation eau bouillante sûre)' },
        { itemId: 'alchemy_portable_lab', quantity: 1, reason: 'Laboratoire alchimie portable (créer potions terrain, 200 PO valeur)' }
      ],
      skills: [
        { skillId: 'arcana', bonus: 5, reason: 'Immersion quotidienne énergie arcan, observations phénomènes' },
        { skillId: 'alchemy', bonus: 5, reason: 'Apprentissage alchimie geysers, formules eau magique' },
        { skillId: 'survival', bonus: 3, reason: 'Vie zone géothermique dangereuse, esquive geysers' },
        { skillId: 'perception', bonus: 3, reason: 'Détection éruptions imminentes, instinct survie mana' }
      ],
      gold: 500,
      languages: ['Commun', 'Draconic (notation alchimique)', 'Formules Arcaniques (symbolique)', 'Cant Alchimistes (jargon)'],
      tags: ['magical', 'alchemical', 'geothermal', 'prosperous', 'dangerous', 'scholarly']
    },
    social_impacts: {
      npc_reactions: {
        'alchimistes': 'Enthousiasme collaboration, demandes partenariat (+15 disposition)',
        'mages': 'Fascination capacité conduit, propositions étude (+12 disposition)',
        'marchands': 'Intérêt commercial intense, offres exclusivité (+10 disposition)',
        'anti_magie': 'Hostilité idéologique, méfiance corruption (+(-10) disposition)',
        'villageois': 'Admiration richesse alchimique, envie prospérité (+6 disposition)'
      },
      first_impression: '« Champ Geysers Arcaniques ?! Conduit Mana Vivant... Slots sorts +3 niveau 1 extraordinaire. Alchimie eau magique fortune. Respectez puissance. »',
      long_term_perception: 'Prodige alchimique prospère. Certains admirent maîtrise arcan, d\'autres jalousent richesse. Perçu intelligent, riche, puissant magiquement, obsédé commerce.'
    },
    tags: ['magical', 'alchemical', 'geothermal', 'prosperous'],
    incompatible_with: []
  },

  // ===== CITÉS SECONDAIRES (4) =====
  {
    id: 'birth_loc_capitale_regionale',
    stage: 'birth',
    category: 'location',
    label: 'Capitale Régionale Politique',
    desc: 'Né grande cité 80.000 habitants siège pouvoir politique régional, intrigue noblesse concentrée.',
    detailed_lore: {
      backstory: 'Valcour : capitale province 80.000 habitants, résidence duc régional palais marbre blanc 300 pièces. Centre pouvoir : parlement provincial 200 nobles, ambassades 12 nations étrangères, cours justice suprême régionale, académie diplomatie prestigieuse. Vous avez grandi quartier noblesse mineure—famille courtisans influents mais non-titrés. Enfance politique : assister bals masqués intrigue, observer négociations traités, apprendre étiquette aristocratique stricte, jouer échecs nobles vieillissants (métaphore politique). Vie urbaine raffinée : théâtres 5 salles opéra, bibliothèque ducale 100.000 volumes, jardins suspendus botaniques exotiques. Mais intrigues constantes : assassinats politiques discrets, scandales ruinant familles, corruption omniprésente.',
      defining_moment: 'À 15 ans, découvert complot assassinat duc rival factions. Vous avez alerté garde ducale codes secrets famille—complot déjoué, 8 conspirateurs exécutés. Duc récompensa vous titre noblesse mineure héréditaire + fief 500 hectares (fortune instantanée).',
      worldview_shaped: 'Politique guerre civilisée mots remplacent épées. Pouvoir réel concentré capitales, pas champs bataille. Alliances fragiles trahisons quotidiennes inévitables. Étiquette arme sociale redoutable. Information monnaie plus précieuse or physique.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { charisma: 2, intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Courtisan Politique Élevé',
          desc: '+5 Persuasion (intrigue noblesse), +5 Insight (détection mensonges politiques), +1d20 Diplomacy (négociations traités), connaissance protocoles 20 nations, réseau 50+ nobles influents',
          effect: '+5 Persuasion, +5 Insight, +1d20 Diplomacy',
          game_effect: 'Maîtrise intrigue + réseau pouvoir étendu'
        },
        {
          name: 'Noble Mineur Titré',
          desc: 'Titre noblesse héréditaire (Chevalier/Dame), fief 500 hectares (revenu passif 100 PO/mois), accès exclusif palais ducal, audiences duc garanties trimestrielles',
          effect: 'Noble Title, Estate Income',
          game_effect: 'Statut social + richesse passive'
        },
        {
          name: 'Héros Complot Déjoué',
          desc: '+3 Investigation (conspirations), +3 Deception (contre-espionnage), avantage résister intimidation/charme politique (exposition quotidienne manipulation), faveur duc utilisable 1×',
          effect: '+3 Investigation, +3 Deception',
          game_effect: 'Expertise sécurité + capital politique'
        }
      ],
      reputation: [
        { factionId: 'noblesse_regionale', delta: 12, reason: 'Titre héréditaire, héros complot, famille établie' },
        { factionId: 'garde_ducale', delta: 10, reason: 'Alerte complot sauvé duc, confiance sécurité' },
        { factionId: 'diplomates', delta: 8, reason: 'Formation académie diplomatie, protocoles maîtrisés' },
        { factionId: 'conspirateurs', delta: -15, reason: 'Déjoué complot, responsable 8 exécutions' }
      ],
      items: [
        { itemId: 'noble_signet_ring', quantity: 1, reason: 'Chevalière noblesse armoiries familiales (authentification documents)' },
        { itemId: 'estate_deed', quantity: 1, reason: 'Titre fief 500 hectares (revenu 100 PO/mois, patrimoine)' },
        { itemId: 'palace_access_token', quantity: 1, reason: 'Jeton accès palais ducal permanent (sécurité, privilège)' },
        { itemId: 'diplomatic_protocols_manual', quantity: 1, reason: 'Manuel protocoles 20 nations (référence négociations)' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 5, reason: 'Éducation courtisan, intrigue noblesse quotidienne' },
        { skillId: 'insight', bonus: 5, reason: 'Détection mensonges politiques, observation comportements' },
        { skillId: 'investigation', bonus: 3, reason: 'Recherche complot, enquêtes discrètes' },
        { skillId: 'deception', bonus: 3, reason: 'Dissimulation intentions, contre-espionnage' }
      ],
      gold: 800,
      languages: ['Commun', 'Langues Diplomatiques (4 nations)', 'Latin Légal (droit)', 'Cant Courtisans (intrigue)'],
      tags: ['urban', 'noble', 'political', 'wealthy', 'intrigue', 'influential']
    },
    social_impacts: {
      npc_reactions: {
        'nobles': 'Respect titre héréditaire, acceptation cercles (+12 disposition)',
        'diplomates': 'Collaboration professionnelle, propositions missions (+10 disposition)',
        'garde': 'Confiance sécuritaire, coopération facilitée (+10 disposition)',
        'roturiers': 'Déférence statutaire, distance sociale (+4 disposition, -2 familiarité)',
        'conspirateurs': 'Haine viscérale, danger assassinat permanent (-18 disposition)'
      },
      first_impression: '« Capitale Valcour ! Chevalier/Dame titré 15 ans... Complot déjoué héroïque. Fief 500 hectares fortune. Respectez noblesse méritée. »',
      long_term_perception: 'Noble politique influent. Certains admirent héroïsme récompensé, d\'autres jalousent ascension rapide. Perçu intelligent, charmant, riche, cible dangereuse.'
    },
    tags: ['urban', 'noble', 'political', 'wealthy'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_centre_pelerinage',
    stage: 'birth',
    category: 'location',
    label: 'Centre Pèlerinage Sacré',
    desc: 'Né cité sainte 30.000 habitants destination pèlerinage 500.000 fidèles/an, piété concentrée.',
    detailed_lore: {
      backstory: 'Luminaëlle : cité sainte construite site miracle saint Aurélien il y a 600 ans (résurrection 100 morts simultanée témoignée). Cathédrale Lumière Éternelle 150m hauteur domine cité, reliquaires saint attirent pèlerins 50 nations. Population permanente 30.000 habitants : prêtres/moines 8000, artisans souvenirs religieux, aubergistes hébergement pèlerins, guérisseurs miraculeux. Vous avez grandi orphelinat cathédrale (parents décédés fièvre)—enfance pieuse : chorales quotidiennes 5h matin, études théologiques intensives, service charité soupe populaire, observation guérisons miraculeuses hebdomadaires. Pèlerins apportent 2 millions PO/an dons—richesse ecclésiastique colossale mais vœu pauvreté personnel. Atmosphère spirituelle intense : processions quotidiennes, flagellants pénitents, extases mystiques publiques.',
      defining_moment: 'À 12 ans, épidémie peste noire ravagea quartier pauvre—vous avez soigné malades 60 jours consécutifs sans contracter maladie (immunité miraculeuse). Archevêque déclara vous \"Béni Saint Aurélien\"—pouvoir guérison mineures mains (1/jour, 2d8 HP).',
      worldview_shaped: 'Foi pouvoir tangible opérant miracles réels. Charité devoir sacré non-négociable. Richesse matérielle corruption spirituelle dangereuse. Souffrance épreuve purificatrice rapprochant divin. Communauté fidèles famille choisie transcendant sang.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { wisdom: 2, charisma: 2 },
      mechanical_traits: [
        {
          name: 'Béni Saint Aurélien',
          desc: '1/jour : Lay on Hands (2d8 HP restaurés toucher), +5 Religion (théologie approfondie), +1d20 résister maladies/poisons (immunité miraculeuse), détection alignements maléfiques 20m',
          effect: 'Lay on Hands 2d8, +5 Religion, +1d20 Disease Resist',
          game_effect: 'Pouvoir guérison divin + piété protectrice'
        },
        {
          name: 'Orphelin Cathédrale Élevé',
          desc: '+5 Persuasion (prédication foi), +3 Medicine (soins malades), vœu pauvreté (richesse max 100 PO possédées, surplus donné charité obligatoire), réseau ecclésiastique 30 diocèses',
          effect: '+5 Persuasion, +3 Medicine',
          game_effect: 'Charisme spirituel + contrainte pauvreté'
        },
        {
          name: 'Témoin Miracles Quotidiens',
          desc: '+3 Insight (discerner foi sincère/hypocrite), avantage jets Inspiration (foi inébranlable), +2 jets sauvegarder désespoir/peur (espoir béni)',
          effect: '+3 Insight, Inspiration Advantage',
          game_effect: 'Discernement spirituel + moral renforcé'
        }
      ],
      reputation: [
        { factionId: 'eglise_lumiere', delta: 18, reason: 'Béni Saint Aurélien reconnu, orphelin cathédrale vénéré' },
        { factionId: 'pelerins', delta: 12, reason: 'Guérisseur miraculeux, espoir fidèles' },
        { factionId: 'ordres_caritatifs', delta: 10, reason: 'Service charité héroïque, vœu pauvreté respecté' },
        { factionId: 'cyniques_athees', delta: -8, reason: 'Irritation piété ostentatoire, rejet miracles' }
      ],
      items: [
        { itemId: 'holy_symbol_blessed', quantity: 1, reason: 'Symbole sacré béni archevêque (focus sorts divins +2)' },
        { itemId: 'relic_fragment_saint', quantity: 1, reason: 'Fragment relique saint Aurélien (1× guérison maladie mortelle)' },
        { itemId: 'pilgrims_robe_simple', quantity: 1, reason: 'Robe pèlerin simple (vœu pauvreté, reconnaissance universelle)' },
        { itemId: 'prayer_book_illuminated', quantity: 1, reason: 'Livre prières enluminé (théologie 200 pages, valeur sentimentale)' }
      ],
      skills: [
        { skillId: 'religion', bonus: 5, reason: 'Éducation théologique intensive cathédrale depuis enfance' },
        { skillId: 'persuasion', bonus: 5, reason: 'Prédication foi, inspiration fidèles, charité quotidienne' },
        { skillId: 'medicine', bonus: 3, reason: 'Soins malades orphelinat/épidémie, premiers soins' },
        { skillId: 'insight', bonus: 3, reason: 'Observation fidèles, discernement foi sincère' }
      ],
      gold: 100,
      languages: ['Commun', 'Latin Ecclésiastique', 'Langues Pèlerins (4 dialectes)', 'Chants Liturgiques'],
      tags: ['sacred', 'urban', 'blessed', 'charitable', 'poor', 'healing']
    },
    social_impacts: {
      npc_reactions: {
        'fideles': 'Vénération béni vivant, hospitalité absolue (+20 disposition)',
        'pretres': 'Respect fraternel, collaboration spirituelle (+15 disposition)',
        'malades': 'Espoir guérison, gratitude anticipée (+12 disposition)',
        'cyniques': 'Scepticisme miracles, irritation piété (-10 disposition)',
        'marchands': 'Admiration vœu pauvreté, dons charité offerts (+6 disposition)'
      },
      first_impression: '« Luminaëlle Centre Pèlerinage ! Béni Saint Aurélien... Guérison miraculeuse 2d8 HP ?! Vœu pauvreté robe simple respectée. Saint vivant. »',
      long_term_perception: 'Guérisseur saint pauvre. Certains vénèrent piété authentique, d\'autres irrités renoncement richesse. Perçu charitable, humble, miraculeux, socialement admiré.'
    },
    tags: ['sacred', 'urban', 'blessed', 'charitable'],
    incompatible_with: []
  },

  // ===== CITÉS SECONDAIRES FINALES (3) =====
  {
    id: 'birth_loc_ville_universitaire',
    stage: 'birth',
    category: 'location',
    label: 'Ville Universitaire Académique',
    desc: 'Né cité 40.000 habitants dominée université millénaire, savoir concentré bibliothèques infinies.',
    detailed_lore: {
      backstory: 'Érudis : ville universitaire 40.000 habitants (15.000 étudiants permanents) construite autour Université Arcanes Lumière fondée il y a 1200 ans. Campus 200 hectares : bibliothèque centrale 500.000 volumes anciens, 12 facultés spécialisées (magie arcan, théologie, droit, médecine, astronomie, alchimie, histoire, langues, philosophie, ingénierie, arts, musique), observatoire astronomique dôme 50m, laboratoires alchimiques sécurisés. Vous avez grandi quartier professeurs—parents érudits bibliothécaires archives secrètes. Enfance intellectuelle intense : lectures quotidiennes 4h, débats philosophiques dîners familiaux, accès bibliothèque restreinte 10 ans (privilège rarissime), observations télescope astronomique nuits claires, cours magistraux amphithéâtres 500 places. Vie urbaine studieuse : tavernes débats passionnés, duels intellectuels publics, examens finaux stressants suicides étudiants. Dangers : sectes académiques rivalités mortelles, expériences magiques catastrophiques, espionnage industriel grimoires, burn-out intellectuel fréquent.',
      defining_moment: 'À 14 ans, découvert erreur mathématique théorème fondamental enseigné 300 ans. Vous avez présenté preuve correction congrès académique—professeurs débattent 8h, validation finale unanime. Recteur nomma vous "Prodige Érudis"—admission université 14 ans (record absolu), bourse complète 10 ans.',
      worldview_shaped: 'Savoir pouvoir absolu transcendant richesse/noblesse. Erreurs intellectuelles corrigibles humblement, ignorance volontaire impardonnable. Débat contradictoire forge vérité—consensus paresseux stérilise pensée. Livres anciens trésors inestimables valant cathédrales. Éducation universelle droit fondamental, pas privilège élitiste.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { intelligence: 2, wisdom: 2 },
      mechanical_traits: [
        {
          name: 'Prodige Académique Reconnu',
          desc: '+5 Arcana/History/Religion (au choix, expertise faculté), +5 Investigation (recherches académiques), +1d20 jets apprentissage compétences nouvelles (méthodologie universitaire), accès bibliothèque 500.000 volumes',
          effect: '+5 Academic Skill, +5 Investigation, +1d20 Learning',
          game_effect: 'Érudition légendaire + apprentissage accéléré'
        },
        {
          name: 'Bourse Universitaire Complète',
          desc: 'Admission université 14 ans (record), bourse 10 ans couvrant scolarité/logement/livres (valeur 10.000 PO totale), réseau professeurs 50+ érudits influents, accès archives secrètes niveau 3/5',
          effect: 'University Scholarship, Archive Access',
          game_effect: 'Éducation gratuite + réseau académique étendu'
        },
        {
          name: 'Correcteur Théorème Historique',
          desc: '+3 Logic (mathématiques/philosophie), +3 Persuasion (débats intellectuels), célébrité académique (reconnaissance universités 20 nations), +2 jets Intelligence (confiance intellectuelle)',
          effect: '+3 Logic, +3 Persuasion, Fame',
          game_effect: 'Réputation savant + raisonnement supérieur'
        }
      ],
      reputation: [
        { factionId: 'universite_erudis', delta: 18, reason: 'Prodige record, correcteur théorème, fils bibliothécaires' },
        { factionId: 'academies_royaume', delta: 12, reason: 'Célébrité intellectuelle, correction historique' },
        { factionId: 'bibliothecaires', delta: 10, reason: 'Famille établie, respect archives sacrées' },
        { factionId: 'anti_intellectuels', delta: -6, reason: 'Irritation élitisme perçu, jalousie éducation' }
      ],
      items: [
        { itemId: 'university_badge_scholar', quantity: 1, reason: 'Insigne étudiant prodige (accès campus illimité, réductions 50% librairies)' },
        { itemId: 'rare_books_collection', quantity: 5, reason: 'Collection 5 livres rares (valeur 200 PO chacun, sujets variés)' },
        { itemId: 'research_notes_theorem', quantity: 1, reason: 'Notes recherche correction théorème (preuve originale, patrimoine intellectuel)' },
        { itemId: 'archive_key_level3', quantity: 1, reason: 'Clé archives secrètes niveau 3 (accès manuscrits anciens restreints)' }
      ],
      skills: [
        { skillId: 'arcana', bonus: 5, reason: 'Études faculté magie arcan, observations expériences quotidiennes' },
        { skillId: 'investigation', bonus: 5, reason: 'Méthodologie recherche universitaire, bibliothèque explorations' },
        { skillId: 'history', bonus: 3, reason: 'Lectures massives archives, correction théorème historique' },
        { skillId: 'persuasion', bonus: 3, reason: 'Débats académiques, présentation congrès, défense thèses' }
      ],
      gold: 400,
      languages: ['Commun', 'Latin Académique', 'Langues Anciennes (3 dialectes)', 'Notation Mathématique Universelle'],
      tags: ['urban', 'scholarly', 'intellectual', 'prestigious', 'bookish', 'prodigy']
    },
    social_impacts: {
      npc_reactions: {
        'academiciens': 'Admiration profonde prodige, mentorat offert (+18 disposition)',
        'etudiants': 'Fascination envieuse, demandes tutorat (+10 disposition, -3 jalousie)',
        'bibliothecaires': 'Respect familial, accès privilégié facilité (+12 disposition)',
        'anti_intellectuels': 'Irritation élitisme, moqueries "tête trop grosse" (-8 disposition)',
        'nobles': 'Respect mérite intellectuel, propositions patronage (+8 disposition)'
      },
      first_impression: '« Université Érudis millénaire ?! Prodige 14 ans admission record... Correction théorème 300 ans enseigné ?! Génie certifié. »',
      long_term_perception: 'Savant prodige célèbre. Certains admirent intellect supérieur, d\'autres jalousent succès précoce. Perçu brillant, studieux, humble corrections, socialement maladroit.'
    },
    tags: ['urban', 'scholarly', 'intellectual', 'prestigious'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_port_peche',
    stage: 'birth',
    category: 'location',
    label: 'Port de Pêche Côtier',
    desc: 'Né ville portuaire 12.000 habitants vivant pêche hauturière océan impitoyable, vie rude fertile.',
    detailed_lore: {
      backstory: 'Havre-Flots : port pêche 12.000 habitants côte Nord océan Tempêtes, 800 bateaux pêche (chalutiers 20m, barques 6m). Économie pêche 100% : thons, morues, harengs, crabes géants, pieuvres, parfois léviathans mineurs accidentels. Vous avez grandi cabane quais puant poisson—parents armateurs chalutier familial "Écume Salée". Enfance maritime dure : embarquements pêche 8 ans (mousse nettoyage ponts), tempêtes océaniques terrifiantes vagues 15m, nuits 3 jours haute mer, apprentissage navigation étoiles/courants, découpe poissons dès 6 ans. Communauté solidaire : partage prises disettes, sauvetages mer fraternels, fêtes retour pêche miraculeuse, superstitions marins (jamais siffler bord, femmes portent malheur ancienne croyance abolie). Dangers : naufrages tempêtes (50 morts/an), pirates côtiers, créatures marines hostiles, hypothermie eaux glacées, dettes usuriers armateurs ruinés.',
      defining_moment: 'À 13 ans, tempête cataclysmique coula 30 bateaux—chalutier familial survécut grâce votre navigation instinctive (lecture nuages/vents héritée grand-père). Vous avez guidé 8 bateaux port dans brouillard zéro-visibilité phare éteint. Guilde Pêcheurs nomma vous "Étoile Havre"—navigateur prodige, capitaine certifié 13 ans.',
      worldview_shaped: 'Océan mère nourricière cruelle—donne poissons mais noie imprudents quotidien. Solidarité marins survie absolue—jamais abandonner naufragés. Superstitions marins sagesses ancestrales déguisées, pas ignorances. Tempêtes enseignent humilité face forces nature titanesques. Travail manuel honnête vaut diplômes dorés inutiles.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { strength: 2, constitution: 2 },
      mechanical_traits: [
        {
          name: 'Étoile Havre Navigateur',
          desc: '+5 Navigation (maritime), +5 Survival (océan), +1d20 prédire météo marine 48h avance (lecture nuages/vents/marées), capitaine certifié jeune (commande équipages 20+ marins)',
          effect: '+5 Navigation, +5 Survival, +1d20 Weather Predict',
          game_effect: 'Maîtrise mer totale + instinct tempêtes'
        },
        {
          name: 'Pêcheur Hauturier Aguerri',
          desc: '+5 Athletics (manœuvres navales), +3 Animal Handling (poissons/dauphins), résistance mal mer immunité, endurance froid marin (hypothermie résistance 75%), maîtrise filets/harpons',
          effect: '+5 Athletics, +3 Animal Handling',
          game_effect: 'Endurance maritime + techniques pêche'
        },
        {
          name: 'Héritier Chalutier Familial',
          desc: 'Propriété chalutier "Écume Salée" 20m (valeur 2000 PO, revenu pêche 80 PO/mois), équipage 6 marins loyaux famille, réseau guilde pêcheurs 40 ports côtiers',
          effect: 'Ship Ownership, Crew',
          game_effect: 'Patrimoine naval + revenu passif'
        }
      ],
      reputation: [
        { factionId: 'pecheurs_cote', delta: 15, reason: 'Étoile Havre héros, sauveteur tempête, famille établie' },
        { factionId: 'guilde_marins', delta: 12, reason: 'Capitaine certifié record, compétence navigation' },
        { factionId: 'marchands_poisson', delta: 8, reason: 'Commerce prises régulier, partenariat familial' },
        { factionId: 'pirates_cote', delta: -6, reason: 'Défense bateaux pêche, opposition piraterie' }
      ],
      items: [
        { itemId: 'fishing_boat_chalutier', quantity: 1, reason: 'Chalutier "Écume Salée" 20m (6 marins, 50 tonnes capacité, 2000 PO valeur)' },
        { itemId: 'navigation_sextant_quality', quantity: 1, reason: 'Sextant navigation qualité (précision ±1km, laiton gravé familial)' },
        { itemId: 'fishing_nets_reinforced', quantity: 10, reason: 'Filets pêche renforcés (charge 500kg chacun, réparation facile)' },
        { itemId: 'sailors_lucky_charm', quantity: 1, reason: 'Porte-bonheur marin grand-père (dent requin, +1 jets sauvegarder mer)' }
      ],
      skills: [
        { skillId: 'navigation', bonus: 5, reason: 'Navigation océanique quotidienne depuis 8 ans, instinct météo' },
        { skillId: 'survival', bonus: 5, reason: 'Vie haute mer hostile, tempêtes, autonomie alimentaire poisson' },
        { skillId: 'athletics', bonus: 5, reason: 'Manœuvres navales physiques, hissage voiles, combat vagues' },
        { skillId: 'animal_handling', bonus: 3, reason: 'Pêche techniques diverses, interaction faune marine' }
      ],
      gold: 500,
      languages: ['Commun', 'Cant Marins (jargon maritime)', 'Signes Main Navires (communication distance)', 'Superstitions Océan (folklore)'],
      tags: ['coastal', 'maritime', 'hardworking', 'seafaring', 'prosperous', 'communal']
    },
    social_impacts: {
      npc_reactions: {
        'pecheurs': 'Fraternité profonde maritime, loyauté inconditionnelle (+18 disposition)',
        'marins': 'Respect compétence navigation, demandes équipage (+12 disposition)',
        'marchands': 'Intérêt commercial prises, partenariats proposés (+10 disposition)',
        'pirates': 'Méfiance défenseur, évitement prudent raids (-8 disposition)',
        'citadins_continentaux': 'Admiration courage océanique, incompréhension vie (+6 disposition)'
      },
      first_impression: '« Port Havre-Flots ! Étoile Havre navigateur 13 ans... Sauvetage tempête 8 bateaux héroïque. Propriétaire chalutier jeune impressionnant. »',
      long_term_perception: 'Capitaine pêcheur héroïque. Certains admirent courage maritime, d\'autres envient prospérité familiale. Perçu travailleur, solidaire, instinctif, rude manières.'
    },
    tags: ['coastal', 'maritime', 'hardworking', 'seafaring'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_marche_frontiere',
    stage: 'birth',
    category: 'location',
    label: 'Marché Frontalier Cosmopolite',
    desc: 'Né ville frontière 18.000 habitants carrefour commercial 5 nations, mélange cultures intense.',
    detailed_lore: {
      backstory: 'Pont-Cinq-Rois : ville frontière exactement intersection 5 royaumes (traité 200 ans zone neutre commerciale). Population 18.000 habitants cosmopolite : 30% humains, 20% elfes, 15% nains, 10% halfelins, 25% races diverses. Langues 12+ parlées rues quotidien. Marché permanent 500 étals : épices Orient exotiques, fourrures Nord arctiques, soieries Sud précieuses, métaux nains légendaires, gemmes elfes enchantées, herbes rares, esclaves (légal zone grise), mercenaires, informations espionnage. Vous avez grandi échoppe parents marchands textiles multiculturels—mère elfe Sud, père humain Nord. Enfance cosmopolite unique : apprentissage 6 langues simultanément, négociations commerciales dès 7 ans, exposition 20 cultures culinaires/religieuses/vestimentaires, festivals 5 nations célébrés, mais tensions raciales sporadiques émeutes. Économie 100% commerce : taxes passage 5% génèrent 100.000 PO/an ville. Dangers : espionnage 5 nations constant, assassinats politiques discrets, contrebande armes/drogues/artefacts, gangs territoriaux violents.',
      defining_moment: 'À 14 ans, crise diplomatique menaça fermeture marché (guerre imminente 2 royaumes). Vous avez négocié compromis audacieux assemblée 5 ambassadeurs (bilinguisme parfait, connaissance protocoles culturels, proposition économique équitable)—guerre évitée, marché sauvé. Conseil Ville nomma vous "Médiateur Prodige"—citoyenneté honoraire 5 nations simultanée (privilège unique historique).',
      worldview_shaped: 'Diversité culturelle richesse inestimable, pas menace. Commerce unit nations mieux traités militaires fragiles. Langues multiples ouvrent mondes invisibles monolingues. Compromis intelligent vaut victoires pyrrhiques. Identité multiculturelle force, pas confusion loyauté.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { charisma: 2, intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Médiateur Cinq Nations',
          desc: '+5 Persuasion (négociations interculturelles), +5 Insight (lecture cultures diverses), +1d20 Diplomacy (conflits internationaux), citoyenneté honoraire 5 nations (libre passage frontières, protection diplomatique)',
          effect: '+5 Persuasion, +5 Insight, +1d20 Diplomacy',
          game_effect: 'Expertise diplomatique + statut unique'
        },
        {
          name: 'Polyglotte Naturel',
          desc: '+6 langues parlées couramment (total 8+), +3 Deception (mensonges multiculturels crédibles), avantage jets compréhension langues inconnues (racines communes identifiées), réseau contacts 5 nations 200+ marchands',
          effect: '+6 Languages, +3 Deception',
          game_effect: 'Communication universelle + réseau international'
        },
        {
          name: 'Héritier Commerce Multiculturel',
          desc: 'Propriété échoppe textiles familiale (valeur 1500 PO, revenu 70 PO/mois), +20% profits commerce interculturel (connaissance marchés 5 nations), accès contrebande légale zone grise',
          effect: 'Shop Ownership, Trade Bonus',
          game_effect: 'Patrimoine commercial + avantage économique'
        }
      ],
      reputation: [
        { factionId: 'marchands_pont_cinq', delta: 15, reason: 'Médiateur Prodige, héros crise diplomatique, famille établie' },
        { factionId: 'ambassades_5_nations', delta: 12, reason: 'Citoyenneté honoraire unique, respect diplomatie' },
        { factionId: 'guildes_commerce', delta: 10, reason: 'Expertise négoce interculturel, réseaux étendus' },
        { factionId: 'nationalistes_puristes', delta: -8, reason: 'Irritation mélange culturel, suspicion loyautés multiples' }
      ],
      items: [
        { itemId: 'citizenship_papers_5nations', quantity: 5, reason: 'Papiers citoyenneté 5 nations (passage libre frontières, protection diplomatique unique)' },
        { itemId: 'trade_ledger_multicultural', quantity: 1, reason: 'Registre commerce contacts 200+ marchands 5 nations (réseau précieux)' },
        { itemId: 'exotic_goods_samples', quantity: 10, reason: 'Échantillons marchandises exotiques (épices, soieries, gemmes, 500 PO valeur totale)' },
        { itemId: 'translation_dictionary_12languages', quantity: 1, reason: 'Dictionnaire 12 langues polyglotte (référence commerciale, 80 PO valeur)' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 5, reason: 'Négociations commerciales quotidiennes depuis 7 ans, médiation' },
        { skillId: 'insight', bonus: 5, reason: 'Lecture comportements 20 cultures, détection mensonges interculturels' },
        { skillId: 'deception', bonus: 3, reason: 'Commerce zone grise, dissimulation origines marchandises' },
        { skillId: 'history', bonus: 3, reason: 'Connaissance 5 nations histoires/cultures, traités diplomatiques' }
      ],
      gold: 600,
      languages: ['Commun', 'Elfique', 'Nain', 'Halfelin', 'Langue Orientale', 'Dialecte Nordique', 'Cant Marchands (universel)', 'Signes Commerce (international)'],
      tags: ['urban', 'cosmopolitan', 'diplomatic', 'multilingual', 'prosperous', 'neutral']
    },
    social_impacts: {
      npc_reactions: {
        'marchands_internationaux': 'Respect compétence, partenariats privilégiés (+15 disposition)',
        'diplomates': 'Admiration médiation unique, demandes consultations (+12 disposition)',
        'voyageurs': 'Gratitude guidage culturel, traductions offertes (+10 disposition)',
        'nationalistes': 'Méfiance loyauté floue, hostilité identitaire (-10 disposition)',
        'espions': 'Intérêt contacts multiples, propositions recrutement (+8 disposition)'
      },
      first_impression: '« Pont-Cinq-Rois cosmopolite ! Médiateur 14 ans guerre évitée... Citoyenneté 5 nations simultanée ?! Polyglotte 8 langues incroyable. »',
      long_term_perception: 'Diplomate marchand multiculturel. Certains admirent ouverture cosmopolite, d\'autres suspectent loyautés divisées. Perçu charmant, intelligent, riche, apatride identitaire.'
    },
    tags: ['urban', 'cosmopolitan', 'diplomatic', 'multilingual'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_ville_thermale',
    stage: 'birth',
    category: 'location',
    label: 'Ville Thermale Curative',
    desc: 'Né station thermale 8.000 habitants sources chaudes curatives miraculeuses, tourisme santé prospère.',
    detailed_lore: {
      backstory: 'Thermes Auréliane : ville thermale construite sources géothermiques naturelles jaillissant 45°C, composition minérale unique (soufre, magnésium, calcium) guérissant maladies chroniques. Fondée il y a 400 ans découverte sources, devenue destination santé aristocratie 30 nations. Population 8.000 habitants : médecins hydrothérapeutes 300, masseurs/soigneurs 500, hôteliers luxe, artisans souvenirs, guides touristiques. Vous avez grandi hôtel thermal familial "Vapeurs Bienfaisantes"—parents propriétaires établissement 50 chambres. Enfance unique : baignades quotidiennes bassins thermaux (peau parfaite impuretés nulles), observation guérisons miraculeuses (paralysés remarchant, lépreux guéris, aveugles recouvraient vue partielle), apprentissage hydrothérapie 10 ans, massage thérapeutique, diététique curative. Clientèle riche : nobles, marchands prospères, vétérans guerre, malades désespérés. Atmosphère paisible relaxante : jardins zen méditation, musiques douces permanentes, interdiction violences stricte.',
      defining_moment: 'À 12 ans, enfant noble mourant fièvre incurable médecins abandonnèrent. Vous avez préparé traitement thermal expérimental (bains alternés chaud/froid, infusion herbes locales, massage drainage lymphatique)—enfant guérit miraculeusement 5 jours. Duc père récompensa vous bourse 1000 PO + titre "Thaumaturge Thermes Auréliane".',
      worldview_shaped: 'Guérison naturelle supérieure potions chimiques artificielles. Eau chaude minérale cadeau divin humanité souffrante. Repos relaxation partie intégrante santé, pas luxe paresseux. Richesse justifiée si finance santé publique accessible. Beauté extérieure reflète santé intérieure harmonieuse.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { wisdom: 2, charisma: 2 },
      mechanical_traits: [
        {
          name: 'Thaumaturge Thermal Certifié',
          desc: '+5 Medicine (hydrothérapie), +1d20 soigner maladies chroniques (traitement thermal 7 jours requis), connaissance 30 pathologies curables sources, réseau médecins 20 nations',
          effect: '+5 Medicine, +1d20 Chronic Disease Cure',
          game_effect: 'Expertise curative thermale + guérisons rares'
        },
        {
          name: 'Héritier Hôtel Thermal',
          desc: 'Propriété hôtel "Vapeurs Bienfaisantes" 50 chambres (valeur 5000 PO, revenu 150 PO/mois), personnel 12 employés loyaux, accès sources privées illimité, clientèle aristocratique établie',
          effect: 'Hotel Ownership, Passive Income',
          game_effect: 'Patrimoine thermal + richesse passive'
        },
        {
          name: 'Peau Parfaite Thermale',
          desc: '+2 CHA (beauté naturelle bains quotidiens), résistance maladies peau 90% (immunité acné/eczéma/psoriasis), guérison blessures ×1.5 vitesse (régénération thermale), aura santé rayonnante',
          effect: '+2 CHA, Disease Resist, Fast Healing',
          game_effect: 'Beauté surnaturelle + santé visible'
        }
      ],
      reputation: [
        { factionId: 'medecins_thermaux', delta: 15, reason: 'Thaumaturge certifié, guérison noble miraculeuse' },
        { factionId: 'aristocratie', delta: 12, reason: 'Service thermal famille respectée, clientèle fidèle' },
        { factionId: 'malades_chroniques', delta: 18, reason: 'Espoir guérison, réputation thaumaturge' },
        { factionId: 'medecins_traditionnels', delta: -4, reason: 'Rivalité méthodes alternatives, jalousie succès' }
      ],
      items: [
        { itemId: 'thermal_water_vials', quantity: 20, reason: 'Fioles eau thermale Auréliane (soigne 1d4 HP + maladie mineure chacune, 30 PO)' },
        { itemId: 'massage_oils_medicinal', quantity: 10, reason: 'Huiles massage médicinales (relaxation musculaire, 20 PO chacune)' },
        { itemId: 'hotel_deed_thermal', quantity: 1, reason: 'Titre propriété hôtel 50 chambres (patrimoine familial, revenu passif)' },
        { itemId: 'duke_reward_medal', quantity: 1, reason: 'Médaille duc reconnaissance (symbole prestige, +5 disp nobles)' }
      ],
      skills: [
        { skillId: 'medicine', bonus: 5, reason: 'Hydrothérapie quotidienne, observation guérisons, formation soigneurs' },
        { skillId: 'persuasion', bonus: 5, reason: 'Service clientèle aristocratique, négociations tarifs, diplomatie' },
        { skillId: 'insight', bonus: 3, reason: 'Diagnostic pathologies observation, empathie malades' },
        { skillId: 'nature', bonus: 3, reason: 'Connaissance herbes médicinales locales, propriétés minérales' }
      ],
      gold: 700,
      languages: ['Commun', 'Latin Médical', 'Protocoles Aristocratiques (4 nations)', 'Terminologie Hydrothérapie'],
      tags: ['urban', 'healing', 'prosperous', 'peaceful', 'beautiful', 'aristocratic']
    },
    social_impacts: {
      npc_reactions: {
        'malades': 'Espoir désespéré, vénération thaumaturge (+20 disposition)',
        'medecins': 'Respect compétence alternative, collaboration offerte (+10 disposition, -4 rivaux)',
        'nobles': 'Gratitude services famille, fidélité clientèle (+12 disposition)',
        'pauvres': 'Envie soins inaccessibles, amertume inégalités (-6 disposition)',
        'beautés': 'Jalousie peau parfaite, demandes secrets beauté (+8 disposition, -5 envie)'
      },
      first_impression: '« Thermes Auréliane curatives ! Peau parfaite rayonnante... Thaumaturge 12 ans guérison noble miraculeuse ?! Beauté santé incarnée. »',
      long_term_perception: 'Guérisseur thermal prospère. Certains admirent talents curatifs, d\'autres jalousent richesse/beauté. Perçu charitable malades, élégant, serein, privilégié.'
    },
    tags: ['urban', 'healing', 'prosperous', 'peaceful'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_cite_souterraine',
    stage: 'birth',
    category: 'location',
    label: 'Cité Souterraine Naine',
    desc: 'Né métropole souterraine 25.000 habitants creusée roche vivante, merveille ingénierie millénaire.',
    detailed_lore: {
      backstory: 'Karak-Azur (Forteresse Saphir) : cité souterraine naine 25.000 habitants creusée montagne 12 niveaux profondeur 800m. Fondée il y a 2000 ans clan Barbe-Pierre, capitale minière saphirs/mithril. Architecture titanesque : halls colonnades 50m hauteur plafond, ponts suspendus gouffres 200m, forges géantes 24h/24, aqueducs gravitaires ingénieux, éclairage cristaux luminescents bleutés. Population 90% nains, 10% humains/gnomes tolérés. Vous avez grandi quartier forgerons—famille armuriers réputés 15 générations. Enfance souterraine totale : jamais vu ciel avant 18 ans, apprentissage forge 6 ans (marteaux 5kg quotidien), lecture pierre instinctive (détection failles/minerais), éducation histoire clan 2000 ans mémoire orale, consommation bière naine quotidienne dès 10 ans (tradition). Société rigide : castes hiérarchisées strictes (nobles-forgerons-mineurs-marchands), honneur ancestral sacré, rancunes clan duraient siècles, femmes barbes respectées guerrières. Dangers : effondrements tunnels, créatures Profond (gobelins, trolls), gaz toxiques méthane, isolement claustrophobie.',
      defining_moment: 'À 15 ans, séisme magnitude 7 effondra niveau 8—300 nains piégés ténèbres. Vous avez conçu système étaiement innovant bois/acier (génie précoce), dirigé sauvetage 120h continus—tous sauvés miraculeux. Roi Barbe-Pierre accorda vous titre "Maître-Ingénieur" 15 ans (plus jeune historique) + hache runique ancestrale.',
      worldview_shaped: 'Pierre éternelle fiable, surface éphémère dangereuse. Honneur ancestral dépasse vie individuelle insignifiante. Forge art sacré transformant minerai brut beauté fonctionnelle. Isolement souterrain protège décadence surface. Bière naine lubrifiant social civilisation.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { constitution: 2, intelligence: 2 },
      mechanical_traits: [
        {
          name: 'Maître-Ingénieur Karak-Azur',
          desc: '+5 Engineering (architecture/mécanique), +1d20 construire structures souterraines (tunnels, ponts, forteresses), vision ténèbres parfaite 60m (yeux adaptés), détection failles pierre 95% précision',
          effect: '+5 Engineering, +1d20 Underground Build, Darkvision 60m',
          game_effect: 'Génie architectural + sens pierre légendaire'
        },
        {
          name: 'Forgeron Armurier Lignée',
          desc: '+5 Smithing (armes/armures), maîtrise forge runique basique, créer équipement qualité supérieure (+1 dégâts/AC), réseau guildes forgerons 30 cités naines',
          effect: '+5 Smithing, Runic Basics, Quality Gear',
          game_effect: 'Artisanat légendaire + équipement supérieur'
        },
        {
          name: 'Hache Runique Ancestrale',
          desc: 'Hache guerre runique "Fend-Roc" (2d8+2, +3 vs créatures souterraines, indestructible, héritage royal Barbe-Pierre), +10 HP (endurance forge quotidienne), résistance poison/alcool 75%',
          effect: 'Runic Axe 2d8+2, +10 HP',
          game_effect: 'Arme légendaire + vitalité naine'
        }
      ],
      reputation: [
        { factionId: 'nains_karak_azur', delta: 18, reason: 'Maître-Ingénieur record, sauveteur séisme, lignée réputée' },
        { factionId: 'guildes_forgerons', delta: 15, reason: 'Artisan prodige, hache runique royale portée' },
        { factionId: 'roi_barbe_pierre', delta: 12, reason: 'Faveur royale accordée, titre honorifique jeune' },
        { factionId: 'elfes_surface', delta: -8, reason: 'Mépris réciproque ancestral nains/elfes millénaire' }
      ],
      items: [
        { itemId: 'runic_axe_fend_roc', quantity: 1, reason: 'Hache runique "Fend-Roc" (2d8+2, +3 vs souterrain, royale)' },
        { itemId: 'master_engineer_badge', quantity: 1, reason: 'Insigne Maître-Ingénieur (autorité chantiers, respect universel nains)' },
        { itemId: 'smithing_tools_masterwork', quantity: 1, reason: 'Outils forge chef-d\'œuvre (qualité supérieure garantie, 300 PO valeur)' },
        { itemId: 'clan_genealogy_scroll', quantity: 1, reason: 'Parchemin généalogie clan 15 générations (honneur ancestral, 200 PO)' }
      ],
      skills: [
        { skillId: 'engineering', bonus: 5, reason: 'Conception étaiement innovant, architecture souterraine quotidienne' },
        { skillId: 'smithing', bonus: 5, reason: 'Forge armurier familiale 15 générations, apprentissage intensif' },
        { skillId: 'history', bonus: 3, reason: 'Mémoire orale clan 2000 ans, culture naine approfondie' },
        { skillId: 'survival', bonus: 3, reason: 'Vie souterraine hostile, navigation tunnels, dangers Profond' }
      ],
      gold: 800,
      languages: ['Commun', 'Nain (dialecte Karak-Azur)', 'Khuzdul Ancien (runes)', 'Cant Forgerons (technique)'],
      tags: ['underground', 'dwarven', 'engineering', 'smithing', 'legendary', 'honored']
    },
    social_impacts: {
      npc_reactions: {
        'nains': 'Respect profond maître jeune, fraternité clan (+20 disposition)',
        'forgerons': 'Admiration artisanat, demandes apprentissage (+15 disposition)',
        'humains_surface': 'Fascination cité souterraine, incompréhension culture (+6 disposition)',
        'elfes': 'Mépris ancestral réciproque, hostilité culturelle (-12 disposition)',
        'créatures_profond': 'Haine nains, attaques instinctives (-20 disposition)'
      },
      first_impression: '« Karak-Azur légendaire ! Maître-Ingénieur 15 ans record... Hache runique royale Fend-Roc ?! Sauvetage 300 nains héroïque. Honneur clan. »',
      long_term_perception: 'Ingénieur-forgeron légendaire. Certains admirent génie précoce, d\'autres intimident stature naine. Perçu honorable, têtu, artisan parfait, isolé culturellement surface.'
    },
    tags: ['underground', 'dwarven', 'engineering', 'smithing'],
    incompatible_with: []
  }
];
