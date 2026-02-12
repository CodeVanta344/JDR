// ============================================================
// SYSTÈME DE FACTIONS - Guildes, Ordres, Cultes
// Progression par réputation, rangs, récompenses
// ============================================================

export interface FactionRank {
  level: number;
  title: string;
  reputation_required: number;
  privileges: string[];
  rewards: Array<{
    type: 'item' | 'skill' | 'spell' | 'ability' | 'discount' | 'access';
    description: string;
    game_effect: string;
  }>;
  quests_unlocked: string[];
  restrictions?: string[];
}

export interface Faction {
  id: string;
  name: string;
  category: 'guild' | 'military' | 'religious' | 'secret' | 'criminal' | 'political';
  alignment: 'lawful_good' | 'neutral_good' | 'chaotic_good' | 'lawful_neutral' | 'true_neutral' | 'chaotic_neutral' | 'lawful_evil' | 'neutral_evil' | 'chaotic_evil';
  
  headquarters: string;
  leader: string;
  symbol: string;
  motto: string;
  
  lore: {
    founding_story: string;
    current_goals: string[];
    enemies: string[];
    allies: string[];
    secret_history?: string;
  };
  
  ranks: FactionRank[];
  
  reputation_system: {
    actions: Array<{
      action: string;
      reputation_change: number;
      repeatable: boolean;
    }>;
    taboos: Array<{
      action: string;
      reputation_penalty: number;
      potential_exile: boolean;
    }>;
  };
  
  incompatible_factions: string[]; // Ne peut rejoindre simultanément
  synergy_factions: string[]; // Bonus si membre des deux
}

// ============================================================
// GUILDES MAJEURES
// ============================================================

export const GUILDES: Faction[] = [
  {
    id: 'guilde_forgerons',
    name: 'La Guilde des Marteaux Éternels',
    category: 'guild',
    alignment: 'lawful_neutral',
    headquarters: 'Bastion-de-Fer, Forge Centrale',
    leader: 'Grandmaître Thorin Pierre-de-Feu',
    symbol: 'Marteau croisé avec enclume, sur fond de flammes',
    motto: 'Le Métal ne Ment Jamais',
    
    lore: {
      founding_story: 'Fondée il y a 800 ans par le légendaire forgeron nain Gorim Marteau-Sacré après qu\'il ait forgé l\'épée qui tua le Dragon-Tyran Ignaroth. La Guilde unifie tous les forgerons d\'Aethelgard sous un code d\'honneur strict : jamais forger pour le mal, toujours payer ses dettes, et protéger les secrets de la forge.',
      current_goals: [
        'Retrouver les 7 Marteaux Runiques perdus de l\'Ère Ancienne',
        'Former une nouvelle génération de Maîtres-Forgerons',
        'Empêcher la diffusion des secrets de forge noire (armes maudites)',
        'Reconstruire la Grande Forge de Karak-Dum, détruite il y a 300 ans'
      ],
      enemies: ['Culte de la Lame Noire (forgerons hérétiques)', 'Contrebandiers d\'armes illégales'],
      allies: ['Guilde des Mineurs', 'Clans Nordiques', 'Armée Royale'],
      secret_history: 'La Guilde garde le secret de la "Flamme Première", un feu éternel volé aux dieux qui brûle au cœur de Bastion-de-Fer. Ce feu peut forger des objets légendaires... ou détruire le monde s\'il s\'éteint.'
    },
    
    ranks: [
      {
        level: 1,
        title: 'Apprenti Forgeron',
        reputation_required: 0,
        privileges: [
          'Accès aux forges de la Guilde (tarif réduit -20%)',
          'Apprendre recettes basiques (Niveau 1-3)',
          'Acheter matériaux communs sans majoration'
        ],
        rewards: [
          {
            type: 'item',
            description: 'Tablier de Forgeron Renforcé',
            game_effect: 'Résistance +2 dégâts feu, +1 CA vs projectiles'
          },
          {
            type: 'skill',
            description: 'Entraînement Forge Basique',
            game_effect: '+2 en Craft (Armes/Armures)'
          }
        ],
        quests_unlocked: ['Le Premier Marteau', 'Livraison à la Garnison']
      },
      {
        level: 2,
        title: 'Compagnon Forgeron',
        reputation_required: 500,
        privileges: [
          'Vendre créations à la Guilde (90% valeur marché)',
          'Emprunter outils avancés (24h)',
          'Voter aux assemblées de la Guilde',
          'Recettes intermédiaires (Niveau 4-7)'
        ],
        rewards: [
          {
            type: 'item',
            description: 'Marteau de Maître (+1)',
            game_effect: '+1 jets craft forge, +1d4 dégâts comme arme'
          },
          {
            type: 'discount',
            description: 'Réduction marchands (-15% métaux/gemmes)',
            game_effect: 'Économie significative sur matériaux'
          },
          {
            type: 'ability',
            description: 'Réparation Rapide',
            game_effect: 'Réparer équipement endommagé en 10 min au lieu de 1h'
          }
        ],
        quests_unlocked: ['L\'Acier Volé', 'Duel de Forgerons', 'Le Client Mystérieux']
      },
      {
        level: 3,
        title: 'Maître-Forgeron',
        reputation_required: 2000,
        privileges: [
          'Enseigner des apprentis (XP passif +50/jour)',
          'Accès bibliothèque de plans anciens',
          'Forge privée dans le quartier de la Guilde',
          'Recettes avancées (Niveau 8-12)',
          'Commandes nobles/armée (contrats lucratifs)'
        ],
        rewards: [
          {
            type: 'item',
            description: 'Enclume Runique',
            game_effect: '+2 jets craft, 10% chance effet magique aléatoire sur arme craftée'
          },
          {
            type: 'spell',
            description: 'Bénédiction du Forgeron (1/jour)',
            game_effect: 'Imbue arme touchée : +1d6 feu pendant 1 heure'
          },
          {
            type: 'access',
            description: 'Grande Forge de Bastion-de-Fer',
            game_effect: 'Craft items légendaires (+3 jets, réduit temps craft 30%)'
          }
        ],
        quests_unlocked: ['Retrouver le Marteau de Gorim', 'Infiltrer le Culte de la Lame Noire', 'Forger pour le Roi']
      },
      {
        level: 4,
        title: 'Grandmaître Forgeron',
        reputation_required: 5000,
        privileges: [
          'Siège au Conseil de la Guilde (influence politique)',
          'Accès "Flamme Première" (forge légendaire)',
          'Tous les secrets de forge connus',
          'Peut former Maîtres-Forgerons (réputation)',
          'Commandement détachement Gardes de la Forge'
        ],
        rewards: [
          {
            type: 'item',
            description: 'Couronne de Mithril du Grandmaître',
            game_effect: '+2 Intelligence, +2 Charisme, Résistance Feu/Foudre'
          },
          {
            type: 'ability',
            description: 'Forge Légendaire',
            game_effect: '1/an : Forger objet Artefact (propriétés magiques majeures personnalisées)'
          },
          {
            type: 'access',
            description: 'Trésor de la Guilde',
            game_effect: 'Emprunter armes/armures légendaires pour quêtes (caution 50k PO)'
          }
        ],
        quests_unlocked: ['Rallumer la Forge de Karak-Dum', 'Le Marteau Perdu des Dieux', 'La Menace du Dragon-Forge']
      }
    ],
    
    reputation_system: {
      actions: [
        { action: 'Forger arme/armure de qualité Excellente+', reputation_change: 10, repeatable: true },
        { action: 'Vendre création à la Guilde', reputation_change: 5, repeatable: true },
        { action: 'Enseigner apprenti (1 semaine)', reputation_change: 25, repeatable: true },
        { action: 'Compléter quête de la Guilde', reputation_change: 50-200, repeatable: true },
        { action: 'Donner recette rare', reputation_change: 100, repeatable: true },
        { action: 'Sauver un membre en danger', reputation_change: 150, repeatable: true }
      ],
      taboos: [
        { action: 'Forger arme pour criminels connus', reputation_penalty: -200, potential_exile: true },
        { action: 'Révéler secrets de forge', reputation_penalty: -500, potential_exile: true },
        { action: 'Utiliser Forge Noire (magie corrompue)', reputation_penalty: -1000, potential_exile: true },
        { action: 'Trahir autre membre', reputation_penalty: -300, potential_exile: true },
        { action: 'Voler dans ateliers de la Guilde', reputation_penalty: -400, potential_exile: true }
      ]
    },
    
    incompatible_factions: ['culte_lame_noire', 'pirates_cote_tempetes'],
    synergy_factions: ['guilde_mineurs', 'clans_nordiques']
  },
  
  {
    id: 'ordre_gardiens_aube',
    name: 'Ordre des Gardiens de l\'Aube',
    category: 'religious',
    alignment: 'lawful_good',
    headquarters: 'Temple du Soleil Levant, Aethelmere',
    leader: 'Haut-Paladin Seraphina Lumière-d\'Or',
    symbol: 'Soleil levant sur épée dressée',
    motto: 'La Lumière Chasse les Ténèbres',
    
    lore: {
      founding_story: 'Fondé il y a 600 ans par Sainte Elenora après qu\'elle ait repoussé l\'invasion démoniaque de la Porte du Néant. L\'Ordre jure de protéger Aethelgard contre les forces obscures : morts-vivants, démons, cultistes. Chaque Gardien prête serment de sacrifice : donner sa vie pour sauver innocents.',
      current_goals: [
        'Détruire toutes les Portes du Néant restantes',
        'Purifier les Terres Maudites du Sud',
        'Retrouver l\'Épée Sacrée d\'Elenora (perdue 200 ans)',
        'Convertir ou éliminer le Culte du Crépuscule'
      ],
      enemies: ['Culte du Crépuscule', 'Seigneurs Liches', 'Démonistes', 'Morts-Vivants Intelligents'],
      allies: ['Église de la Lumière', 'Conseil des Royaumes', 'Guilde des Clercs'],
      secret_history: 'Certains Gardiens anciens ont succombé à la tentation du pouvoir. Les "Paladins Déchus" forment maintenant le noyau du Culte du Crépuscule, cherchant vengeance contre l\'Ordre qui les a bannis.'
    },
    
    ranks: [
      {
        level: 1,
        title: 'Écuyer de l\'Aube',
        reputation_required: 0,
        privileges: [
          'Hébergement gratuit dans temples de l\'Ordre',
          'Soins mineurs gratuits (3/jour)',
          'Entraînement combat/prière basique'
        ],
        rewards: [
          {
            type: 'item',
            description: 'Tabbard aux couleurs de l\'Ordre',
            game_effect: '+1 Charisme vs créatures bonnes/neutres'
          },
          {
            type: 'spell',
            description: 'Bénédiction Mineure (cantrip)',
            game_effect: 'Cible +1d4 à un jet (1/jour)'
          }
        ],
        quests_unlocked: ['Patrouille Nocturne', 'Bénir le Village']
      },
      {
        level: 2,
        title: 'Paladin Initié',
        reputation_required: 500,
        privileges: [
          'Armure/armes de l\'Ordre (prêt gratuit)',
          'Autorité : Arrêter suspects morts-vivance/démonisme',
          'Formation sorts divins (Niveau 1-2)',
          'Cheval de guerre entraîné (prêt)'
        ],
        rewards: [
          {
            type: 'item',
            description: 'Épée Longue Bénie (+1)',
            game_effect: '+1d6 radiant vs morts-vivants/fiélons'
          },
          {
            type: 'ability',
            description: 'Détection du Mal (3/jour)',
            game_effect: 'Sentir présence morts-vivants/fiélons 18m, 1 min'
          },
          {
            type: 'spell',
            description: 'Imposition des Mains',
            game_effect: 'Soigner 2d8+modificateur Sagesse PV (recharge repos long)'
          }
        ],
        quests_unlocked: ['Purifier le Cimetière Maudit', 'Escorter le Prêtre', 'Investigation Démoniaque']
      },
      {
        level: 3,
        title: 'Paladin Chevalier',
        reputation_required: 2000,
        privileges: [
          'Commandement escouade (5 écuyers)',
          'Quartiers privés dans forteresse',
          'Accès Armurerie Sacrée (armes/armures +2)',
          'Monture céleste (Destrier Argenté)',
          'Peut consacrer lieux saints'
        ],
        rewards: [
          {
            type: 'item',
            description: 'Armure de Plates Sacrée (+2)',
            game_effect: 'CA +2, Avantage JdS vs nécrotique/poison'
          },
          {
            type: 'spell',
            description: 'Châtiment Divin (Niveau 3)',
            game_effect: '+4d8 radiant à l\'attaque, +6d8 vs morts-vivants/fiélons'
          },
          {
            type: 'ability',
            description: 'Aura de Protection (3m)',
            game_effect: 'Alliés dans aura : +2 tous jets sauvegarde'
          }
        ],
        quests_unlocked: ['Détruire le Liche des Ruines', 'Fermer la Porte du Néant', 'Sauver le Village Assiégé']
      },
      {
        level: 4,
        title: 'Haut-Paladin',
        reputation_required: 5000,
        privileges: [
          'Siège au Conseil de l\'Ordre',
          'Commandement légion (50 paladins)',
          'Accès Reliquaire Sacré (artefacts)',
          'Peut ordonner nouveaux paladins',
          'Invoquer aide céleste (ange gardien, 1/semaine)'
        ],
        rewards: [
          {
            type: 'item',
            description: 'Couronne Radieuse du Haut-Paladin',
            game_effect: '+2 Sagesse, +2 Charisme, Aura 9m (alliés immunité peur)'
          },
          {
            type: 'spell',
            description: 'Résurrection des Justes (1/semaine)',
            game_effect: 'Ramener mort à la vie si décédé <7 jours et cause juste'
          },
          {
            type: 'ability',
            description: 'Avatar de Lumière (1/jour, 10 min)',
            game_effect: 'Ailes lumineuses (vol 18m), +4d6 radiant attaques, Résistance tous dégâts'
          }
        ],
        quests_unlocked: ['Récupérer l\'Épée d\'Elenora', 'Assaut sur la Citadelle du Crépuscule', 'Sceller le Roi Démon']
      }
    ],
    
    reputation_system: {
      actions: [
        { action: 'Détruire mort-vivant majeur', reputation_change: 25, repeatable: true },
        { action: 'Purifier lieu corrompu', reputation_change: 50, repeatable: true },
        { action: 'Sauver innocent en danger mortel', reputation_change: 30, repeatable: true },
        { action: 'Convertir malfaiteur au bien', reputation_change: 75, repeatable: true },
        { action: 'Compléter quête de l\'Ordre', reputation_change: 100-500, repeatable: true },
        { action: 'Sacrifier pour sauver autres', reputation_change: 200, repeatable: true }
      ],
      taboos: [
        { action: 'Mentir/trahir serment', reputation_penalty: -300, potential_exile: true },
        { action: 'Tuer innocent', reputation_penalty: -1000, potential_exile: true },
        { action: 'Utiliser magie nécrotique', reputation_penalty: -500, potential_exile: true },
        { action: 'Fuir combat vs Mal', reputation_penalty: -200, potential_exile: false },
        { action: 'Pactiser avec fiélons/morts-vivants', reputation_penalty: -800, potential_exile: true }
      ]
    },
    
    incompatible_factions: ['culte_crepuscule', 'guilde_assassins', 'necromanciens'],
    synergy_factions: ['eglise_lumiere', 'conseil_royaumes', 'ordre_roses_argent']
  }
];
