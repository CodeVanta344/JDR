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

  // ===== PLACEHOLDER POUR 33 LOCATIONS RESTANTES =====
  // NOTE DÉVELOPPEMENT : Créer progressivement 33 locations supplémentaires suivant pattern d100 établi
  // Catégories prioritaires :
  // - Déserts (3) : Oasis Commerciale, Cité Sable Perdue, Camp Nomade Itinérant
  // - Jungles (2) : Village Tribal Ancestral, Ruines Civilisation Ancienne
  // - Îles (3) : Archipel Pirate Anarchique, Île Volcanique Active, Atoll Tropical Paradisiaque
  // - Zones Maudites (3) : Terre Brûlée Désolation, Marais Hantés Âmes, Champ Bataille Éternel
  // - Lieux Magiques (3) : Tour Mage Solitaire, Nexus Élémentaire Chaotique, Bosquet Féérique Enchanté
  // - Zones Frontalières (3) : Avant-poste Militaire Tendu, Colonie Récente Pionniers, Passage Montagneux Stratégique
  // - Lieux Interdits (3) : Prison-Île Maximum Sécurité, Catacombes Oubliées, Temple Profané Déchu
  // - Merveilles Naturelles (3) : Cascade Éternelle Arc-en-Ciel, Canyon Échos Magiques, Champ Geysers Arcaniques
  // - Cités Secondaires (10) : Port Fluvial, Bourg Fortifié, Ville Minière, Capitale Régionale, Centre Pèlerinage, etc.
];
