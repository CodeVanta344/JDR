/**
 * AETHELGARD WORLD MAP - Carte du monde complète
 * 100+ lieux : villes, donjons, points d'intérêt
 */

// ============================================================================
// TYPES
// ============================================================================

export type LocationType = 
  | 'city' 
  | 'town' 
  | 'village' 
  | 'dungeon' 
  | 'ruin' 
  | 'landmark' 
  | 'wilderness' 
  | 'cave' 
  | 'fortress';

export type BiomeType = 
  | 'plains' 
  | 'forest' 
  | 'mountains' 
  | 'desert' 
  | 'swamp' 
  | 'tundra' 
  | 'coast' 
  | 'underground' 
  | 'volcanic';

export type DangerLevel = 
  | 'safe' 
  | 'low' 
  | 'medium' 
  | 'high' 
  | 'extreme' 
  | 'deadly';

export interface LocationDefinition {
  id: string;
  name: string;
  type: LocationType;
  region: string;
  
  // Description
  description: string;
  lore?: string;
  
  // Géographie
  biome: BiomeType;
  coordinates?: { x: number; y: number };
  
  // Danger
  dangerLevel: DangerLevel;
  suggestedLevel: number;
  
  // Population
  population?: number;
  ruler?: string; // ID du NPC dirigeant
  
  // Services disponibles
  services?: {
    inn?: boolean;
    blacksmith?: boolean;
    merchant?: boolean;
    temple?: boolean;
    guild?: boolean;
    stables?: boolean;
    bank?: boolean;
  };
  
  // NPCs notables présents
  npcs?: string[]; // IDs des NPCs
  
  // Créatures communes
  creatures?: string[]; // IDs des créatures
  
  // Quêtes disponibles
  quests?: string[]; // IDs des quêtes
  
  // Connexions
  connectedTo?: {
    locationId: string;
    distance: number; // En km
    travelTime: number; // En heures
    difficulty: 'easy' | 'medium' | 'hard';
    description?: string;
  }[];
  
  // Points d'intérêt dans le lieu
  pointsOfInterest?: {
    name: string;
    description: string;
  }[];
  
  // Économie
  economy?: {
    wealth: 'poor' | 'modest' | 'prosperous' | 'wealthy';
    mainExports?: string[];
    mainImports?: string[];
  };
  
  // Faction dominante
  controlledBy?: string; // ID de faction
}

// ============================================================================
// RÉGIONS
// ============================================================================

export const REGIONS = {
  NORTHERN_KINGDOMS: 'northern-kingdoms',
  SOUTHERN_SWAMPS: 'southern-swamps',
  EASTERN_DESERT: 'eastern-desert',
  WESTERN_COAST: 'western-coast',
  CENTRAL_HIGHLANDS: 'central-highlands',
  FROZEN_NORTH: 'frozen-north',
  EMERALD_FOREST: 'emerald-forest',
  VOLCANIC_WASTES: 'volcanic-wastes'
} as const;

// ============================================================================
// VILLES MAJEURES
// ============================================================================

export const CITY_AETHELGARD: LocationDefinition = {
  id: 'location:city:aethelgard',
  name: 'Aethelgard',
  type: 'city',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Capitale du royaume, joyau du nord. Murailles blanches, tours élancées, cité de culture et de pouvoir.',
  lore: 'Fondée il y a huit siècles par les Sept Rois lors de l\'Unification. Le Palais Royal domine la cité haute, symbole de pouvoir et stabilité. Centre culturel, commercial et militaire du royaume.',
  biome: 'plains',
  coordinates: { x: 500, y: 300 },
  dangerLevel: 'safe',
  suggestedLevel: 1,
  population: 150000,
  ruler: 'npc:king:aldric',
  
  services: {
    inn: true,
    blacksmith: true,
    merchant: true,
    temple: true,
    guild: true,
    stables: true,
    bank: true
  },
  
  npcs: [
    'npc:king:aldric',
    'npc:quest:elena',
    'npc:merchant:theodore',
    'npc:blacksmith:brom',
    'npc:trainer:thalion',
    'npc:innkeeper:rosie'
  ],
  
  quests: [
    'quest:main:dragon-awakens',
    'quest:faction:arcane-initiation',
    'quest:side:missing-daughter'
  ],
  
  connectedTo: [
    {
      locationId: 'location:town:riverside',
      distance: 15,
      travelTime: 3,
      difficulty: 'easy',
      description: 'Route pavée sécurisée'
    },
    {
      locationId: 'location:town:crossroads',
      distance: 40,
      travelTime: 8,
      difficulty: 'easy',
      description: 'Route commerciale principale'
    },
    {
      locationId: 'location:landmark:emerald-forest',
      distance: 60,
      travelTime: 12,
      difficulty: 'medium',
      description: 'Chemin forestier'
    }
  ],
  
  pointsOfInterest: [
    {
      name: 'Palais Royal',
      description: 'Résidence du Roi Aldric III. Architecture grandiose, salles du trône dorées.'
    },
    {
      name: 'Académie Arcane',
      description: 'Tour d\'ivoire des mages. Bibliothèque immense, laboratoires enchantés.'
    },
    {
      name: 'Quartier Marchand',
      description: 'Bazars colorés, marchands du monde entier. On y trouve tout.'
    },
    {
      name: 'Temple de la Lumière',
      description: 'Cathédrale majestueuse vouée aux dieux. Vitraux sacrés, cryptes anciennes.'
    },
    {
      name: 'Arène du Champion',
      description: 'Colisée où gladiateurs et aventuriers prouvent leur valeur.'
    },
    {
      name: 'Quartier des Ombres',
      description: 'Ruelles sombres contrôlées par Guilde des Voleurs. Tavernes louches, marché noir.'
    }
  ],
  
  economy: {
    wealth: 'wealthy',
    mainExports: ['armes', 'armures', 'textiles de luxe', 'livres'],
    mainImports: ['nourriture', 'bois', 'minerais']
  },
  
  controlledBy: 'faction:royal-crown'
};

export const CITY_PORT_AZURE: LocationDefinition = {
  id: 'location:city:port-azure',
  name: 'Port d\'Azur',
  type: 'city',
  region: REGIONS.WESTERN_COAST,
  description: 'Cité portuaire majeure. Flottes marchandes, marins, commerce international.',
  lore: 'Fondée par explorateurs il y a cinq siècles. Devient rapidement hub commercial maritime. Contrôle routes maritimes vers continents lointains.',
  biome: 'coast',
  coordinates: { x: 100, y: 400 },
  dangerLevel: 'low',
  suggestedLevel: 3,
  population: 80000,
  ruler: 'npc:admiral:seaworth',
  
  services: {
    inn: true,
    blacksmith: true,
    merchant: true,
    temple: true,
    guild: true,
    stables: false,
    bank: true
  },
  
  npcs: [
    'npc:admiral:seaworth',
    'npc:merchant:salt',
    'npc:shipwright:oakbeard'
  ],
  
  connectedTo: [
    {
      locationId: 'location:city:aethelgard',
      distance: 200,
      travelTime: 40,
      difficulty: 'easy',
      description: 'Route côtière'
    }
  ],
  
  pointsOfInterest: [
    {
      name: 'Grand Marché Portuaire',
      description: 'Épices exotiques, soies, trésors des mers.'
    },
    {
      name: 'Chantier Naval',
      description: 'Construction de galions et vaisseaux de guerre.'
    },
    {
      name: 'Taverne du Kraken',
      description: 'Repère de marins et pirates. Rumeurs de trésors.'
    }
  ],
  
  economy: {
    wealth: 'prosperous',
    mainExports: ['poissons', 'sel', 'épices', 'soie'],
    mainImports: ['bois', 'métaux', 'grain']
  }
};

export const CITY_IRONFORGE: LocationDefinition = {
  id: 'location:city:ironforge',
  name: 'Forgefer',
  type: 'city',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Cité-forteresse naine creusée dans la montagne. Forges éternelles, halls de pierre.',
  lore: 'Capitale naine depuis l\'Âge de Pierre. Forges les plus célèbres du monde. Légendes racontent que la montagne elle-même est vivante.',
  biome: 'mountains',
  coordinates: { x: 600, y: 200 },
  dangerLevel: 'safe',
  suggestedLevel: 5,
  population: 50000,
  ruler: 'npc:king:thorin-ironfist',
  
  services: {
    inn: true,
    blacksmith: true,
    merchant: true,
    temple: true,
    guild: true,
    stables: false,
    bank: true
  },
  
  npcs: [
    'npc:king:thorin-ironfist',
    'npc:blacksmith:durnok',
    'npc:merchant:gemma'
  ],
  
  pointsOfInterest: [
    {
      name: 'Grande Forge',
      description: 'Forge ancestrale alimentée par lave. Crée armes légendaires.'
    },
    {
      name: 'Halls des Rois',
      description: 'Trône de pierre, statues géantes des anciens rois nains.'
    },
    {
      name: 'Mines Profondes',
      description: 'Kilomètres de tunnels. Mithril, or, gemmes précieuses.'
    },
    {
      name: 'Taverne du Marteau Fendu',
      description: 'Bière naine la plus forte du royaume. Concours de beuverie légendaires.'
    }
  ],
  
  economy: {
    wealth: 'wealthy',
    mainExports: ['armes', 'armures', 'mithril', 'gemmes'],
    mainImports: ['nourriture', 'bois', 'textiles']
  }
};

// ============================================================================
// VILLES MOYENNES
// ============================================================================

export const TOWN_RIVERSIDE: LocationDefinition = {
  id: 'location:town:riverside',
  name: 'Combrelac',
  type: 'town',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Village paisible au bord du lac. Fermes, moulins, pêcheurs.',
  lore: 'Village ancestral existant depuis avant l\'Unification. Communauté simple et accueillante.',
  biome: 'plains',
  coordinates: { x: 485, y: 320 },
  dangerLevel: 'safe',
  suggestedLevel: 1,
  population: 2000,
  
  services: {
    inn: true,
    blacksmith: true,
    merchant: true,
    temple: false,
    guild: false,
    stables: true,
    bank: false
  },
  
  npcs: [
    'npc:quest:marcus',
    'npc:innkeeper:rosie'
  ],
  
  quests: [
    'quest:side:wolf-problem'
  ],
  
  creatures: [
    'beast:wolf',
    'beast:wolf:dire'
  ],
  
  connectedTo: [
    {
      locationId: 'location:city:aethelgard',
      distance: 15,
      travelTime: 3,
      difficulty: 'easy',
      description: 'Route sécurisée'
    },
    {
      locationId: 'location:wilderness:whispering-woods',
      distance: 5,
      travelTime: 1,
      difficulty: 'easy',
      description: 'Sentier forestier'
    }
  ],
  
  pointsOfInterest: [
    {
      name: 'Auberge du Poney Cabreur',
      description: 'Auberge chaleureuse tenue par Rosie. Bonne nourriture, lits confortables.'
    },
    {
      name: 'Ferme de Marcus',
      description: 'Grande ferme d\'élevage. Problèmes récents avec loups.'
    },
    {
      name: 'Lac Tranquille',
      description: 'Lac cristallin. Excellente pêche, ambiance paisible.'
    }
  ],
  
  economy: {
    wealth: 'modest',
    mainExports: ['poissons', 'laine', 'grain'],
    mainImports: ['outils', 'sel']
  }
};

export const TOWN_CROSSROADS: LocationDefinition = {
  id: 'location:town:crossroads',
  name: 'Carrefour',
  type: 'town',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Ville commerciale à l\'intersection des routes principales. Caravanes, marchands ambulants.',
  lore: 'Née comme simple relais il y a deux siècles. Croissance rapide grâce au commerce.',
  biome: 'plains',
  coordinates: { x: 520, y: 340 },
  dangerLevel: 'safe',
  suggestedLevel: 2,
  population: 8000,
  
  services: {
    inn: true,
    blacksmith: true,
    merchant: true,
    temple: true,
    guild: true,
    stables: true,
    bank: true
  },
  
  npcs: [
    'npc:merchant:caravan-master',
    'npc:innkeeper:tobias'
  ],
  
  connectedTo: [
    {
      locationId: 'location:city:aethelgard',
      distance: 40,
      travelTime: 8,
      difficulty: 'easy'
    },
    {
      locationId: 'location:town:mining-camp',
      distance: 60,
      travelTime: 12,
      difficulty: 'medium'
    }
  ],
  
  pointsOfInterest: [
    {
      name: 'Marché Central',
      description: 'Marché animé. Caravanes de toutes les régions.'
    },
    {
      name: 'Auberge des Quatre Vents',
      description: 'Grande auberge populaire. Centre des rumeurs et informations.'
    }
  ],
  
  economy: {
    wealth: 'prosperous',
    mainExports: ['commerce de transit'],
    mainImports: ['tout']
  }
};

export const TOWN_MINING_CAMP: LocationDefinition = {
  id: 'location:town:mining-camp',
  name: 'Camp des Mineurs',
  type: 'town',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Camp minier robuste au pied des montagnes. Mineurs, prospecteurs.',
  biome: 'mountains',
  coordinates: { x: 580, y: 230 },
  dangerLevel: 'low',
  suggestedLevel: 3,
  population: 3000,
  
  services: {
    inn: true,
    blacksmith: true,
    merchant: true,
    temple: false,
    guild: false,
    stables: true,
    bank: false
  },
  
  creatures: [
    'humanoid:kobold',
    'beast:giant-spider'
  ],
  
  pointsOfInterest: [
    {
      name: 'Mines d\'Or',
      description: 'Réseau de mines produisant or et fer.'
    },
    {
      name: 'Taverne du Pic Rouillé',
      description: 'Taverne bruyante fréquentée par mineurs après journée travail.'
    }
  ],
  
  economy: {
    wealth: 'modest',
    mainExports: ['or', 'fer', 'cuivre'],
    mainImports: ['nourriture', 'outils']
  }
};

// ============================================================================
// VILLAGES
// ============================================================================

export const VILLAGE_WOODHAVEN: LocationDefinition = {
  id: 'location:village:woodhaven',
  name: 'Havre-du-Bois',
  type: 'village',
  region: REGIONS.EMERALD_FOREST,
  description: 'Petit village forestier. Bûcherons, chasseurs, druides.',
  lore: 'Village vivant en harmonie avec la forêt. Druides gardent équilibre naturel.',
  biome: 'forest',
  coordinates: { x: 450, y: 280 },
  dangerLevel: 'low',
  suggestedLevel: 2,
  population: 500,
  
  services: {
    inn: true,
    blacksmith: false,
    merchant: true,
    temple: false,
    guild: false,
    stables: false,
    bank: false
  },
  
  npcs: [
    'npc:druid:elder-oak'
  ],
  
  creatures: [
    'beast:wolf',
    'beast:bear',
    'fey:dryad'
  ],
  
  pointsOfInterest: [
    {
      name: 'Cercle Druidique',
      description: 'Clairière sacrée où druides pratiquent rituels.'
    },
    {
      name: 'Scierie',
      description: 'Moulin à scie respectueux de la forêt.'
    }
  ],
  
  economy: {
    wealth: 'poor',
    mainExports: ['bois', 'herbes médicinales', 'fourrures'],
    mainImports: ['outils', 'nourriture']
  },
  
  controlledBy: 'faction:emerald-wardens'
};

export const VILLAGE_SALTMARSH: LocationDefinition = {
  id: 'location:village:saltmarsh',
  name: 'Marais-Salé',
  type: 'village',
  region: REGIONS.SOUTHERN_SWAMPS,
  description: 'Village sur pilotis dans les marais. Pêcheurs, récolteurs de sel.',
  lore: 'Fondé par réfugiés il y a cent ans. Adaptation remarquable à environnement hostile.',
  biome: 'swamp',
  coordinates: { x: 400, y: 600 },
  dangerLevel: 'medium',
  suggestedLevel: 4,
  population: 800,
  
  services: {
    inn: true,
    blacksmith: false,
    merchant: true,
    temple: false,
    guild: false,
    stables: false,
    bank: false
  },
  
  creatures: [
    'beast:giant-crocodile',
    'undead:zombie',
    'humanoid:lizardfolk'
  ],
  
  pointsOfInterest: [
    {
      name: 'Puits de Sel',
      description: 'Bassins d\'évaporation produisant sel précieux.'
    },
    {
      name: 'Taverne des Nénuphars',
      description: 'Établissement humide mais accueillant.'
    }
  ],
  
  economy: {
    wealth: 'poor',
    mainExports: ['sel', 'poisson', 'sangsues médicinales'],
    mainImports: ['grain', 'bois']
  }
};

// ============================================================================
// DONJONS ET RUINES
// ============================================================================

export const DUNGEON_SHADOWKEEP: LocationDefinition = {
  id: 'location:dungeon:shadowkeep',
  name: 'Forteresse d\'Ombre',
  type: 'dungeon',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Forteresse abandonnée infestée de morts-vivants. Halls sombres, cryptes maudites.',
  lore: 'Ancienne forteresse du Seigneur Noir Zarkoth avant sa défaite il y a trois siècles. Corruption persiste. Aventuriers téméraires cherchent trésors maudits.',
  biome: 'plains',
  coordinates: { x: 550, y: 250 },
  dangerLevel: 'high',
  suggestedLevel: 8,
  population: 0,
  
  creatures: [
    'undead:skeleton',
    'undead:zombie',
    'undead:wraith',
    'undead:lich'
  ],
  
  connectedTo: [
    {
      locationId: 'location:city:aethelgard',
      distance: 80,
      travelTime: 16,
      difficulty: 'hard',
      description: 'Route dangereuse, bandits fréquents'
    }
  ],
  
  pointsOfInterest: [
    {
      name: 'Grande Salle du Trône',
      description: 'Trône noir où Zarkoth régnait. Aura maléfique persistante.'
    },
    {
      name: 'Cryptes Profondes',
      description: 'Réseau de catacombes. Trésors gardés par spectres.'
    },
    {
      name: 'Salle du Rituel',
      description: 'Cercle rituel intact. Symboles nécromantiques.'
    }
  ],
  
  quests: [
    'quest:epic:purge-shadowkeep'
  ]
};

export const DUNGEON_CRYSTAL_CAVES: LocationDefinition = {
  id: 'location:dungeon:crystal-caves',
  name: 'Grottes de Cristal',
  type: 'cave',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Réseau de grottes scintillantes remplies de cristaux magiques. Magnifique mais dangereux.',
  lore: 'Découvertes il y a cinquante ans. Cristaux possèdent propriétés magiques. Élémentaires de terre gardent jalousement.',
  biome: 'underground',
  coordinates: { x: 590, y: 210 },
  dangerLevel: 'medium',
  suggestedLevel: 6,
  
  creatures: [
    'elemental:earth',
    'elemental:crystal',
    'beast:giant-bat'
  ],
  
  pointsOfInterest: [
    {
      name: 'Chambre du Géode',
      description: 'Caverne centrale avec géode titanesque. Cristaux purs.'
    },
    {
      name: 'Lac Souterrain',
      description: 'Lac cristallin reflétant cristaux. Poissons aveugles.'
    }
  ],
  
  economy: {
    wealth: 'wealthy',
    mainExports: ['cristaux arcanes', 'gemmes']
  }
};

export const RUIN_ANCIENT_TEMPLE: LocationDefinition = {
  id: 'location:ruin:ancient-temple',
  name: 'Temple Ancien',
  type: 'ruin',
  region: REGIONS.EASTERN_DESERT,
  description: 'Ruines d\'un temple millénaire enfoui dans sables. Architecture mystérieuse.',
  lore: 'Temple dédié à dieux oubliés de civilisation disparue. Hiéroglyphes indéchiffrables, pièges mortels. Archéologues et pilleurs se disputent artefacts.',
  biome: 'desert',
  coordinates: { x: 800, y: 400 },
  dangerLevel: 'high',
  suggestedLevel: 10,
  
  creatures: [
    'undead:mummy',
    'construct:golem',
    'beast:giant-scorpion'
  ],
  
  pointsOfInterest: [
    {
      name: 'Sanctuaire Intérieur',
      description: 'Salle sacrée avec autel intact. Hiéroglyphes brillent faiblement.'
    },
    {
      name: 'Salle des Pièges',
      description: 'Couloirs piégés. Lames, flèches, fosses. Pièges encore fonctionnels après millénaires.'
    },
    {
      name: 'Trésorerie',
      description: 'Chambre forte protégée par golems. Or, artefacts anciens.'
    }
  ]
};

export const DUNGEON_BLACKWOOD_MANOR: LocationDefinition = {
  id: 'location:dungeon:blackwood-manor',
  name: 'Manoir Blackwood',
  type: 'dungeon',
  region: REGIONS.SOUTHERN_SWAMPS,
  description: 'Manoir hanté isolé dans marais. Phénomènes paranormaux, esprit vengeur.',
  lore: 'Demeure ancestrale de famille Blackwood. Lord Blackwood sacrifia sa femme à démon. Esprit hante maintenant les lieux.',
  biome: 'swamp',
  coordinates: { x: 420, y: 580 },
  dangerLevel: 'medium',
  suggestedLevel: 7,
  
  creatures: [
    'undead:ghost',
    'undead:poltergeist',
    'demon:shadow'
  ],
  
  quests: [
    'quest:side:haunted-manor'
  ],
  
  pointsOfInterest: [
    {
      name: 'Chambre Secrète',
      description: 'Derrière bibliothèque. Cercle démoniaque, grimoires interdits.'
    },
    {
      name: 'Chambre de Lady Blackwood',
      description: 'Lieu du sacrifice. Taches de sang indélébiles.'
    }
  ]
};

// ============================================================================
// POINTS D'INTÉRÊT NATURELS
// ============================================================================

export const LANDMARK_EMERALD_FOREST: LocationDefinition = {
  id: 'location:landmark:emerald-forest',
  name: 'Forêt d\'Émeraude',
  type: 'wilderness',
  region: REGIONS.EMERALD_FOREST,
  description: 'Vaste forêt ancestrale. Arbres millénaires, créatures féeriques, magie primordiale.',
  lore: 'Forêt existant depuis l\'aube du monde. Elfes sylvains y vivent en harmonie. Cœur de la forêt abrite Arbre-Monde, nexus de magie naturelle.',
  biome: 'forest',
  coordinates: { x: 450, y: 260 },
  dangerLevel: 'medium',
  suggestedLevel: 5,
  
  creatures: [
    'beast:wolf',
    'beast:bear',
    'beast:dire-wolf',
    'fey:dryad',
    'fey:sprite',
    'fey:treant'
  ],
  
  npcs: [
    'npc:elf-queen:silvermoon'
  ],
  
  connectedTo: [
    {
      locationId: 'location:city:aethelgard',
      distance: 60,
      travelTime: 12,
      difficulty: 'medium'
    },
    {
      locationId: 'location:village:woodhaven',
      distance: 10,
      travelTime: 2,
      difficulty: 'easy'
    }
  ],
  
  pointsOfInterest: [
    {
      name: 'Arbre-Monde',
      description: 'Chêne titanesque au centre forêt. Haut de 200m, vieux de 10000 ans. Pulse d\'énergie vitale.'
    },
    {
      name: 'Village Elfique',
      description: 'Cité elfique dans les arbres. Ponts de lianes, maisons de branches vivantes.'
    },
    {
      name: 'Clairière des Fées',
      description: 'Lieu magique où voile entre mondes est mince. Sprites dansent la nuit.'
    }
  ],
  
  controlledBy: 'faction:emerald-wardens'
};

export const WILDERNESS_WHISPERING_WOODS: LocationDefinition = {
  id: 'location:wilderness:whispering-woods',
  name: 'Bois Murmurants',
  type: 'wilderness',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Forêt dense où le vent semble murmurer. Créatures sauvages, bandits occasionnels.',
  biome: 'forest',
  coordinates: { x: 480, y: 315 },
  dangerLevel: 'low',
  suggestedLevel: 2,
  
  creatures: [
    'beast:wolf',
    'humanoid:goblin',
    'humanoid:bandit'
  ],
  
  quests: [
    'quest:side:missing-daughter'
  ],
  
  connectedTo: [
    {
      locationId: 'location:town:riverside',
      distance: 5,
      travelTime: 1,
      difficulty: 'easy'
    }
  ],
  
  pointsOfInterest: [
    {
      name: 'Grottes Gobelin',
      description: 'Réseau de grottes occupées par tribu gobelin. Prisonniers parfois détenus.'
    },
    {
      name: 'Camp de Bandits',
      description: 'Campement temporaire de bandits. Change régulièrement d\'emplacement.'
    }
  ]
};

export const LANDMARK_DRAGONSPINE_MOUNTAINS: LocationDefinition = {
  id: 'location:landmark:dragonspine-mountains',
  name: 'Montagnes de l\'Échine du Dragon',
  type: 'wilderness',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Chaîne montagneuse titanesque. Pics enneigés, cols dangereux, dragons.',
  lore: 'Légende raconte que montagnes sont échine d\'un dragon primordial pétrifié. Plusieurs dragons y font leur repaire.',
  biome: 'mountains',
  coordinates: { x: 600, y: 180 },
  dangerLevel: 'extreme',
  suggestedLevel: 15,
  
  creatures: [
    'dragon:red:wyrmling',
    'dragon:red:ancient',
    'beast:wyvern',
    'humanoid:giant',
    'elemental:air'
  ],
  
  pointsOfInterest: [
    {
      name: 'Mont Ignis',
      description: 'Volcan actif. Repaire du dragon rouge Infernus.'
    },
    {
      name: 'Col du Vent Hurlant',
      description: 'Passage périlleux balayé par vents violents. Seule route praticable.'
    },
    {
      name: 'Forteresse Naine Abandonnée',
      description: 'Ancienne forteresse naine tombée aux mains des géants.'
    }
  ],
  
  quests: [
    'quest:main:dragon-awakens'
  ]
};

export const LANDMARK_ENDLESS_DESERT: LocationDefinition = {
  id: 'location:landmark:endless-desert',
  name: 'Désert Sans Fin',
  type: 'wilderness',
  region: REGIONS.EASTERN_DESERT,
  description: 'Océan de sable à perte de vue. Chaleur accablante, tempêtes de sable, nomades.',
  lore: 'Ancien empire prospère avant cataclysme magique transforma tout en désert. Ruines enfouies recèlent trésors et dangers.',
  biome: 'desert',
  coordinates: { x: 850, y: 420 },
  dangerLevel: 'high',
  suggestedLevel: 12,
  
  creatures: [
    'beast:giant-scorpion',
    'beast:sand-wurm',
    'undead:mummy',
    'elemental:fire'
  ],
  
  pointsOfInterest: [
    {
      name: 'Oasis Mirage',
      description: 'Oasis réelle au milieu désert. Palmiers, eau fraîche. Tribus nomades.'
    },
    {
      name: 'Cité Ensevelie',
      description: 'Ruines d\'ancienne cité enfouie sous sables. Architecture grandiose encore visible.'
    },
    {
      name: 'Tombeau du Pharaon',
      description: 'Pyramide colossale. Pharaon momifié et trésor gardés par malédictions.'
    }
  ]
};

export const LANDMARK_FROZEN_WASTES: LocationDefinition = {
  id: 'location:landmark:frozen-wastes',
  name: 'Terres Gelées',
  type: 'wilderness',
  region: REGIONS.FROZEN_NORTH,
  description: 'Toundra glaciale au nord du monde. Blizzards éternels, glace millénaire.',
  lore: 'Terres maudites depuis Guerre du Gel. Magie noire a gelé région entière. Créatures des glaces rôdent.',
  biome: 'tundra',
  coordinates: { x: 500, y: 50 },
  dangerLevel: 'deadly',
  suggestedLevel: 18,
  
  creatures: [
    'beast:white-dragon',
    'beast:frost-giant',
    'beast:yeti',
    'elemental:ice',
    'undead:ice-wraith'
  ],
  
  pointsOfInterest: [
    {
      name: 'Forteresse de Glace',
      description: 'Citadelle entière sculptée dans iceberg. Repaire du Seigneur du Gel.'
    },
    {
      name: 'Tombe des Rois du Nord',
      description: 'Crypte gelée des anciens rois. Gardée par spectres glacés.'
    }
  ]
};

// ============================================================================
// FORTERESSES ET AVANT-POSTES
// ============================================================================

export const FORTRESS_BORDERWATCH: LocationDefinition = {
  id: 'location:fortress:borderwatch',
  name: 'Guet-Frontière',
  type: 'fortress',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Forteresse militaire gardant frontière nord. Murailles épaisses, garnison permanente.',
  lore: 'Construite après Guerre des Gobelins pour prévenir invasions. Symbole de vigilance royale.',
  biome: 'plains',
  coordinates: { x: 520, y: 200 },
  dangerLevel: 'safe',
  suggestedLevel: 5,
  population: 1500,
  ruler: 'npc:commander:stone',
  
  services: {
    inn: true,
    blacksmith: true,
    merchant: true,
    temple: true,
    guild: false,
    stables: true,
    bank: false
  },
  
  npcs: [
    'npc:commander:stone',
    'npc:sergeant:iron'
  ],
  
  pointsOfInterest: [
    {
      name: 'Murs d\'enceinte',
      description: '15m de haut, 3m d\'épaisseur. Patrouilles 24/7.'
    },
    {
      name: 'Caserne',
      description: 'Logements pour 1000 soldats. Salle d\'entraînement, armurerie.'
    },
    {
      name: 'Tour de Guet',
      description: 'Tour culminant à 40m. Vue panoramique sur plaines.'
    }
  ],
  
  controlledBy: 'faction:royal-crown'
};

export const FORTRESS_SKYHOLD: LocationDefinition = {
  id: 'location:fortress:skyhold',
  name: 'Forteresse Céleste',
  type: 'fortress',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Forteresse perchée au sommet d\'un pic. Accessible uniquement par chemin escarpé ou vol.',
  lore: 'Construit par ordre de mages il y a quatre siècles. Sanctuaire pour études magiques avancées.',
  biome: 'mountains',
  coordinates: { x: 610, y: 190 },
  dangerLevel: 'medium',
  suggestedLevel: 10,
  population: 300,
  ruler: 'npc:archmage:aeris',
  
  services: {
    inn: true,
    blacksmith: false,
    merchant: true,
    temple: false,
    guild: true,
    stables: false,
    bank: false
  },
  
  npcs: [
    'npc:archmage:aeris',
    'npc:apprentice:various'
  ],
  
  pointsOfInterest: [
    {
      name: 'Bibliothèque Arcane',
      description: 'Collection de grimoires et parchemins ancestraux.'
    },
    {
      name: 'Laboratoire d\'Invocation',
      description: 'Cercles rituels pour invoquer créatures planaires.'
    },
    {
      name: 'Volière de Griffons',
      description: 'Griffons dressés pour transport aérien.'
    }
  ],
  
  controlledBy: 'faction:arcane-guild'
};

// ============================================================================
// LIEUX SPÉCIAUX
// ============================================================================

export const SPECIAL_WORLDTREE: LocationDefinition = {
  id: 'location:special:world-tree',
  name: 'Arbre-Monde Yggdrasil',
  type: 'landmark',
  region: REGIONS.EMERALD_FOREST,
  description: 'Arbre colossal au centre du monde. Racines touchent enfers, branches atteignent cieux.',
  lore: 'Nexus de toute magie naturelle. Planté par dieux à création du monde. Si Arbre-Monde meurt, monde meurt avec.',
  biome: 'forest',
  coordinates: { x: 450, y: 250 },
  dangerLevel: 'safe',
  suggestedLevel: 20,
  population: 0,
  
  pointsOfInterest: [
    {
      name: 'Racines Profondes',
      description: 'Descendent vers plan élémentaire de terre. Gardées par élémentaires anciens.'
    },
    {
      name: 'Canopée Céleste',
      description: 'Branches touchent nuages. Oiseaux magiques, esprits de l\'air.'
    },
    {
      name: 'Cœur de l\'Arbre',
      description: 'Chambre sacrée au centre tronc. Pulse comme un cœur vivant.'
    }
  ],
  
  controlledBy: 'faction:emerald-wardens'
};

export const SPECIAL_PORTAL_NEXUS: LocationDefinition = {
  id: 'location:special:portal-nexus',
  name: 'Nexus des Portails',
  type: 'landmark',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Lieu où ley lines se croisent. Portails naturels vers autres plans.',
  lore: 'Découvert par archimage Azeron. Portails instables mènent vers plans élémentaires, royaumes démoniaques, dimensions étranges.',
  biome: 'mountains',
  coordinates: { x: 590, y: 195 },
  dangerLevel: 'extreme',
  suggestedLevel: 18,
  
  creatures: [
    'demon:various',
    'elemental:all-types',
    'aberration:mind-flayer'
  ],
  
  pointsOfInterest: [
    {
      name: 'Portail de Feu',
      description: 'Mène au plan élémentaire du feu. Chaleur intense.'
    },
    {
      name: 'Portail Démoniaque',
      description: 'Fissure vers les Abysses. Scellé partiellement. Démons tentent de percer.'
    },
    {
      name: 'Portail Temporel',
      description: 'Instable. Parfois montre passé ou futurs possibles.'
    }
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const ALL_CITIES: LocationDefinition[] = [
  CITY_AETHELGARD,
  CITY_PORT_AZURE,
  CITY_IRONFORGE
];

export const ALL_TOWNS: LocationDefinition[] = [
  TOWN_RIVERSIDE,
  TOWN_CROSSROADS,
  TOWN_MINING_CAMP
];

export const ALL_VILLAGES: LocationDefinition[] = [
  VILLAGE_WOODHAVEN,
  VILLAGE_SALTMARSH
];

export const ALL_DUNGEONS: LocationDefinition[] = [
  DUNGEON_SHADOWKEEP,
  DUNGEON_CRYSTAL_CAVES,
  RUIN_ANCIENT_TEMPLE,
  DUNGEON_BLACKWOOD_MANOR
];

export const ALL_LANDMARKS: LocationDefinition[] = [
  LANDMARK_EMERALD_FOREST,
  WILDERNESS_WHISPERING_WOODS,
  LANDMARK_DRAGONSPINE_MOUNTAINS,
  LANDMARK_ENDLESS_DESERT,
  LANDMARK_FROZEN_WASTES
];

export const ALL_FORTRESSES: LocationDefinition[] = [
  FORTRESS_BORDERWATCH,
  FORTRESS_SKYHOLD
];

export const ALL_SPECIAL: LocationDefinition[] = [
  SPECIAL_WORLDTREE,
  SPECIAL_PORTAL_NEXUS
];

// Import expansion
import {
  EXPANSION_TOWNS,
  EXPANSION_VILLAGES,
  EXPANSION_DUNGEONS,
  EXPANSION_LANDMARKS
} from './world-map-expansion';

export const ALL_LOCATIONS: LocationDefinition[] = [
  ...ALL_CITIES,
  ...ALL_TOWNS,
  ...ALL_VILLAGES,
  ...ALL_DUNGEONS,
  ...ALL_LANDMARKS,
  ...ALL_FORTRESSES,
  ...ALL_SPECIAL,
  // Expansion (40+ lieux)
  ...EXPANSION_TOWNS,
  ...EXPANSION_VILLAGES,
  ...EXPANSION_DUNGEONS,
  ...EXPANSION_LANDMARKS
];

export const LOCATIONS_BY_ID: Record<string, LocationDefinition> = ALL_LOCATIONS.reduce((acc, loc) => {
  acc[loc.id] = loc;
  return acc;
}, {} as Record<string, LocationDefinition>);

export const LOCATIONS_BY_REGION: Record<string, LocationDefinition[]> = ALL_LOCATIONS.reduce((acc, loc) => {
  if (!acc[loc.region]) acc[loc.region] = [];
  acc[loc.region].push(loc);
  return acc;
}, {} as Record<string, LocationDefinition[]>);

export const LOCATIONS_BY_TYPE: Record<LocationType, LocationDefinition[]> = ALL_LOCATIONS.reduce((acc, loc) => {
  if (!acc[loc.type]) acc[loc.type] = [];
  acc[loc.type].push(loc);
  return acc;
}, {} as Record<LocationType, LocationDefinition[]>);

/**
 * Trouve locations dans rayon autour d'un point
 */
export function getLocationsInRadius(
  centerX: number,
  centerY: number,
  radius: number
): LocationDefinition[] {
  return ALL_LOCATIONS.filter(loc => {
    if (!loc.coordinates) return false;
    const dx = loc.coordinates.x - centerX;
    const dy = loc.coordinates.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= radius;
  });
}

/**
 * Calcule distance entre deux locations
 */
export function getDistanceBetween(loc1: LocationDefinition, loc2: LocationDefinition): number {
  if (!loc1.coordinates || !loc2.coordinates) return Infinity;
  const dx = loc2.coordinates.x - loc1.coordinates.x;
  const dy = loc2.coordinates.y - loc1.coordinates.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Trouve locations par niveau suggéré
 */
export function getLocationsByLevel(minLevel: number, maxLevel: number): LocationDefinition[] {
  return ALL_LOCATIONS.filter(
    loc => loc.suggestedLevel >= minLevel && loc.suggestedLevel <= maxLevel
  );
}

/**
 * Trouve locations avec service spécifique
 */
export function getLocationsWithService(service: keyof LocationDefinition['services']): LocationDefinition[] {
  return ALL_LOCATIONS.filter(loc => loc.services?.[service]);
}
