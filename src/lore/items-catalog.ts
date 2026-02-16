/**
 * AETHELGARD ITEMS CATALOG - Catalogue massif d'items
 * 200+ items : armes, armures, consommables, artefacts légendaires
 */

// ============================================================================
// TYPES
// ============================================================================

export type ItemType = 
  | 'weapon' 
  | 'armor' 
  | 'consumable' 
  | 'material' 
  | 'quest' 
  | 'tool' 
  | 'artifact';

export type ItemRarity = 
  | 'common' 
  | 'uncommon' 
  | 'rare' 
  | 'epic' 
  | 'legendary' 
  | 'artifact';

export type WeaponCategory = 
  | 'sword' 
  | 'axe' 
  | 'mace' 
  | 'dagger' 
  | 'spear' 
  | 'bow' 
  | 'crossbow' 
  | 'staff' 
  | 'wand';

export type ArmorCategory = 
  | 'light' 
  | 'medium' 
  | 'heavy' 
  | 'shield' 
  | 'accessory';

export type ConsumableCategory = 
  | 'potion' 
  | 'food' 
  | 'scroll' 
  | 'bomb';

export interface ItemStats {
  // Combat
  damage?: string; // Ex: "2d6"
  armor?: number;
  attackBonus?: number;
  critChance?: number;
  
  // Attributs
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  
  // Résistances
  fireResist?: number;
  coldResist?: number;
  lightningResist?: number;
  poisonResist?: number;
  
  // Autres
  healthBonus?: number;
  manaBonus?: number;
  speed?: number;
  weight?: number;
}

export interface ItemEffect {
  type: 'heal' | 'damage' | 'buff' | 'debuff' | 'summon' | 'teleport' | 'transform';
  magnitude: number | string;
  duration?: number; // En tours
  target?: 'self' | 'ally' | 'enemy' | 'area';
  description: string;
}

export interface ItemDefinition {
  id: string;
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  
  // Catégorie spécifique
  category?: WeaponCategory | ArmorCategory | ConsumableCategory;
  
  // Description
  description: string;
  lore?: string;
  
  // Valeur
  value: number; // Prix en gold
  
  // Stats
  stats?: ItemStats;
  
  // Effets (pour consommables/artifacts)
  effects?: ItemEffect[];
  
  // Exigences
  requirements?: {
    level?: number;
    class?: string[];
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
  };
  
  // Propriétés spéciales
  stackable?: boolean;
  maxStack?: number;
  enchantable?: boolean;
  questItem?: boolean;
  bound?: boolean; // Lié au personnage
  
  // Craft
  craftedFrom?: string[]; // IDs de recettes
}

// ============================================================================
// ITEMS LIFEPATH - Objet de départ personnalisés
// ============================================================================

export const LIFEPATH_LIBRARY_CARD: ItemDefinition = {
  id: 'library_card_royal',
  name: 'Carte Royale de Bibliothèque',
  type: 'quest',
  rarity: 'uncommon',
  description: 'Une carte d\'accès privilégié aux archives royales d\'Aethelgard.',
  lore: 'Permet d\'accéder aux archives secrètes et de révéler des connaissances oubliées.',
  value: 50,
  stats: { intelligence: 1 },
  effects: [
    {
      type: 'buff',
      magnitude: 10,
      target: 'self',
      description: '+10 aux jets de connaissance et investigation'
    }
  ],
  stackable: false,
  questItem: true
};

export const LIFEPATH_FINE_QUILL: ItemDefinition = {
  id: 'fine_quill_set',
  name: 'Set de Plumes d\'Écrivain',
  type: 'tool',
  rarity: 'common',
  description: 'Plumes de qualité supérieure avec encre illimitée.',
  lore: 'Écrire avec ces plumes inspire la confiance et la clarté.',
  value: 30,
  stats: { intelligence: 1, charisma: 1 },
  effects: [
    {
      type: 'buff',
      magnitude: 5,
      target: 'self',
      description: '+5 aux jets de diplomatie et persuasion'
    }
  ],
  stackable: false
};

export const LIFEPATH_CITY_MAP: ItemDefinition = {
  id: 'city_map_detailed',
  name: 'Carte Détaillée de la Cité',
  type: 'tool',
  rarity: 'common',
  description: 'Carte précise des rues, passages secrets et points d\'intérêt.',
  lore: 'Révèle les raccourcis cachés et les zones dangereuses de la ville.',
  value: 25,
  stats: { wisdom: 1 },
  effects: [
    {
      type: 'buff',
      magnitude: 5,
      target: 'self',
      description: '+5 aux jets de survie et orientation en milieu urbain'
    }
  ],
  stackable: false,
  questItem: true
};

export const LIFEPATH_FAMILY_HEIRLOOM: ItemDefinition = {
  id: 'family_heirloom',
  name: 'Héritage Familial',
  type: 'artifact',
  rarity: 'rare',
  description: 'Un objet précieux transmis de génération en génération.',
  lore: 'Porte la bénédiction des ancêtres et protège son porteur.',
  value: 200,
  stats: { charisma: 2 },
  effects: [
    {
      type: 'buff',
      magnitude: 5,
      target: 'self',
      description: '+5 aux jets de diplomatie avec la noblesse'
    },
    {
      type: 'buff',
      magnitude: 1,
      target: 'self',
      description: 'Une fois par jour: +1 à un jet de sauvegarde de choix'
    }
  ],
  stackable: false,
  bound: true
};

export const LIFEPATH_QUALITY_SWORD: ItemDefinition = {
  id: 'quality_sword',
  name: 'Épée de Qualité',
  type: 'weapon',
  rarity: 'uncommon',
  category: 'sword',
  description: 'Une lame bien équilibrée, digne d\'un guerrier.',
  value: 80,
  stats: { damage: '1d8', attackBonus: 1 },
  requirements: { strength: 10 }
};

export const LIFEPATH_VETERAN_BADGE: ItemDefinition = {
  id: 'veteran_badge',
  name: 'Insigne du Vétéran',
  type: 'quest',
  rarity: 'uncommon',
  description: 'Symbole de reconnaissance pour service militaire honorable.',
  lore: 'Commande le respect des soldats et des anciens combattants.',
  value: 60,
  stats: { strength: 1, constitution: 1 },
  effects: [
    {
      type: 'buff',
      magnitude: 5,
      target: 'self',
      description: '+5 aux jets de persuasion avec les militaires'
    },
    {
      type: 'buff',
      magnitude: 2,
      target: 'self',
      description: '+2 aux jets de moral pour les alliés soldats'
    }
  ],
  stackable: false,
  bound: true
};

// ============================================================================
// ARMES COMMUNES
// ============================================================================

export const WEAPON_COMMON_DAGGER: ItemDefinition = {
  id: 'weapon:dagger:common',
  name: 'Dague de Fer',
  type: 'weapon',
  rarity: 'common',
  category: 'dagger',
  description: 'Une dague simple mais efficace pour les combats rapprochés.',
  value: 15,
  stats: {
    damage: '1d4',
    attackBonus: 0,
    weight: 1
  },
  requirements: {
    strength: 5
  },
  enchantable: true
};

export const WEAPON_COMMON_SHORTSWORD: ItemDefinition = {
  id: 'weapon:shortsword:common',
  name: 'Épée Courte',
  type: 'weapon',
  rarity: 'common',
  category: 'sword',
  description: 'Épée courte standard, équilibrée et polyvalente.',
  value: 30,
  stats: {
    damage: '1d6',
    attackBonus: 0,
    weight: 2
  },
  requirements: {
    strength: 8
  },
  enchantable: true
};

export const WEAPON_COMMON_LONGSWORD: ItemDefinition = {
  id: 'weapon:longsword:common',
  name: 'Épée Longue',
  type: 'weapon',
  rarity: 'common',
  category: 'sword',
  description: 'Épée longue classique, arme de prédilection des soldats.',
  value: 50,
  stats: {
    damage: '1d8',
    attackBonus: 0,
    weight: 3
  },
  requirements: {
    strength: 10
  },
  enchantable: true
};

export const WEAPON_COMMON_GREATAXE: ItemDefinition = {
  id: 'weapon:greataxe:common',
  name: 'Grande Hache',
  type: 'weapon',
  rarity: 'common',
  category: 'axe',
  description: 'Hache de guerre massive. Dégâts dévastateurs mais lente.',
  value: 80,
  stats: {
    damage: '1d12',
    attackBonus: -1,
    critChance: 15,
    weight: 7
  },
  requirements: {
    strength: 14
  },
  enchantable: true
};

export const WEAPON_COMMON_SHORTBOW: ItemDefinition = {
  id: 'weapon:shortbow:common',
  name: 'Arc Court',
  type: 'weapon',
  rarity: 'common',
  category: 'bow',
  description: 'Arc léger pour tir à distance courte et moyenne.',
  value: 40,
  stats: {
    damage: '1d6',
    attackBonus: 0,
    weight: 2
  },
  requirements: {
    dexterity: 10
  },
  enchantable: true
};

export const WEAPON_COMMON_LONGBOW: ItemDefinition = {
  id: 'weapon:longbow:common',
  name: 'Arc Long',
  type: 'weapon',
  rarity: 'common',
  category: 'bow',
  description: 'Arc puissant pour tir longue portée.',
  value: 70,
  stats: {
    damage: '1d8',
    attackBonus: 0,
    weight: 3
  },
  requirements: {
    dexterity: 12
  },
  enchantable: true
};

export const WEAPON_COMMON_STAFF: ItemDefinition = {
  id: 'weapon:staff:common',
  name: 'Bâton de Bois',
  type: 'weapon',
  rarity: 'common',
  category: 'staff',
  description: 'Bâton simple en bois dur. Conduit basique pour la magie.',
  value: 25,
  stats: {
    damage: '1d6',
    attackBonus: 0,
    intelligence: 1,
    weight: 4
  },
  requirements: {
    intelligence: 8
  },
  enchantable: true
};

// ============================================================================
// ARMES RARES ET LÉGENDAIRES
// ============================================================================

export const WEAPON_EPIC_FLAMEBRAND: ItemDefinition = {
  id: 'weapon:sword:flamebrand',
  name: 'Flamebrand',
  type: 'weapon',
  rarity: 'epic',
  category: 'sword',
  description: 'Épée longue enchantée dont la lame brûle d\'un feu éternel.',
  lore: 'Forgée dans les forges volcaniques du Mont Ignis par le légendaire forgeron Vulcan. La lame contient un fragment d\'élémentaire de feu.',
  value: 5000,
  stats: {
    damage: '2d8',
    attackBonus: 2,
    fireResist: 20,
    weight: 3
  },
  effects: [
    {
      type: 'damage',
      magnitude: '1d6',
      description: '+1d6 dégâts de feu sur chaque coup'
    }
  ],
  requirements: {
    level: 10,
    strength: 12
  },
  enchantable: false,
  bound: true
};

export const WEAPON_LEGENDARY_DRAGONBANE: ItemDefinition = {
  id: 'weapon:sword:dragonbane',
  name: 'Fléau-des-Dragons',
  type: 'weapon',
  rarity: 'legendary',
  category: 'sword',
  description: 'Épée bénie, fléau ancestral des dragons. Tremble au contact des écailles.',
  lore: 'Forgée il y a mille ans par l\'ordre des Tueurs de Dragons. Cette lame a goûté le sang de douze dragons anciens. Les dragons sentent sa présence et la craignent.',
  value: 25000,
  stats: {
    damage: '2d10',
    attackBonus: 3,
    fireResist: 50,
    strength: 2,
    critChance: 20,
    weight: 4
  },
  effects: [
    {
      type: 'damage',
      magnitude: '4d6',
      description: '+4d6 dégâts contre dragons'
    },
    {
      type: 'buff',
      magnitude: 5,
      duration: 10,
      target: 'self',
      description: 'Bonus +5 jets de sauvegarde contre souffle de dragon'
    }
  ],
  requirements: {
    level: 15,
    strength: 14
  },
  enchantable: false,
  bound: true,
  questItem: true
};

export const WEAPON_ARTIFACT_SHADOWFANG: ItemDefinition = {
  id: 'weapon:dagger:shadowfang',
  name: 'Croc d\'Ombre',
  type: 'weapon',
  rarity: 'artifact',
  category: 'dagger',
  description: 'Dague maudite qui boit les ombres et vole la vie.',
  lore: 'Créée par le sorcier noir Malachar en sacrifiant son âme. La dague murmure des secrets à celui qui la manie et consume lentement son humanité. Les Frères de l\'Ombre recherchent désespérément cette relique perdue.',
  value: 50000,
  stats: {
    damage: '2d6',
    attackBonus: 4,
    dexterity: 3,
    critChance: 25,
    weight: 1
  },
  effects: [
    {
      type: 'heal',
      magnitude: '50%',
      target: 'self',
      description: 'Vole 50% des dégâts infligés comme points de vie'
    },
    {
      type: 'buff',
      magnitude: 20,
      target: 'self',
      description: '+20% dégâts depuis les ombres (furtivité)'
    },
    {
      type: 'debuff',
      magnitude: -1,
      description: '-1 Charisme permanent (maudit)'
    }
  ],
  requirements: {
    level: 18,
    dexterity: 16
  },
  enchantable: false,
  bound: true
};

// ============================================================================
// ARMURES COMMUNES
// ============================================================================

export const ARMOR_COMMON_LEATHER: ItemDefinition = {
  id: 'armor:leather:common',
  name: 'Armure de Cuir',
  type: 'armor',
  rarity: 'common',
  category: 'light',
  description: 'Armure légère en cuir tanné, permet une bonne mobilité.',
  value: 40,
  stats: {
    armor: 2,
    dexterity: 1,
    weight: 8
  },
  enchantable: true
};

export const ARMOR_COMMON_CHAINMAIL: ItemDefinition = {
  id: 'armor:chainmail:common',
  name: 'Cotte de Mailles',
  type: 'armor',
  rarity: 'common',
  category: 'medium',
  description: 'Armure de mailles entrelacées. Protection solide mais bruyante.',
  value: 100,
  stats: {
    armor: 5,
    weight: 20
  },
  requirements: {
    strength: 10
  },
  enchantable: true
};

export const ARMOR_COMMON_PLATEMAIL: ItemDefinition = {
  id: 'armor:platemail:common',
  name: 'Armure de Plates',
  type: 'armor',
  rarity: 'common',
  category: 'heavy',
  description: 'Armure lourde en plaques d\'acier. Protection maximale.',
  value: 250,
  stats: {
    armor: 8,
    weight: 45
  },
  requirements: {
    strength: 14
  },
  enchantable: true
};

export const ARMOR_EPIC_DRAGONSCALE: ItemDefinition = {
  id: 'armor:dragonscale:epic',
  name: 'Armure d\'Écailles de Dragon',
  type: 'armor',
  rarity: 'epic',
  category: 'medium',
  description: 'Armure forgée à partir d\'écailles de dragon rouge ancien.',
  lore: 'Chaque écaille porte la mémoire du dragon dont elle provient. L\'armure respire et vibre légèrement au contact.',
  value: 8000,
  stats: {
    armor: 7,
    fireResist: 80,
    strength: 2,
    constitution: 2,
    weight: 18
  },
  effects: [
    {
      type: 'buff',
      magnitude: 10,
      target: 'self',
      description: 'Immunité à l\'intimidation draconique'
    }
  ],
  requirements: {
    level: 12,
    strength: 12
  },
  enchantable: false,
  bound: true
};

// ============================================================================
// CONSOMMABLES - POTIONS
// ============================================================================

export const POTION_MINOR_HEALING: ItemDefinition = {
  id: 'potion:healing:minor',
  name: 'Potion de Soin Mineure',
  type: 'consumable',
  rarity: 'common',
  category: 'potion',
  description: 'Fiole de liquide rouge rubis qui restaure la vitalité.',
  value: 25,
  effects: [
    {
      type: 'heal',
      magnitude: '2d4+2',
      target: 'self',
      description: 'Restaure 2d4+2 points de vie'
    }
  ],
  stackable: true,
  maxStack: 20,
  stats: {
    weight: 0.5
  }
};

export const POTION_NORMAL_HEALING: ItemDefinition = {
  id: 'potion:healing:normal',
  name: 'Potion de Soin',
  type: 'consumable',
  rarity: 'common',
  category: 'potion',
  description: 'Potion standard de soin, efficace pour blessures modérées.',
  value: 50,
  effects: [
    {
      type: 'heal',
      magnitude: '4d4+4',
      target: 'self',
      description: 'Restaure 4d4+4 points de vie'
    }
  ],
  stackable: true,
  maxStack: 20,
  stats: {
    weight: 0.5
  }
};

export const POTION_GREATER_HEALING: ItemDefinition = {
  id: 'potion:healing:greater',
  name: 'Potion de Soin Supérieure',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'potion',
  description: 'Potion puissante qui referme même les blessures graves.',
  value: 150,
  effects: [
    {
      type: 'heal',
      magnitude: '8d4+8',
      target: 'self',
      description: 'Restaure 8d4+8 points de vie'
    }
  ],
  stackable: true,
  maxStack: 20,
  stats: {
    weight: 0.5
  }
};

export const POTION_SUPREME_HEALING: ItemDefinition = {
  id: 'potion:healing:supreme',
  name: 'Potion de Soin Suprême',
  type: 'consumable',
  rarity: 'rare',
  category: 'potion',
  description: 'Élixir miraculeux distillé par les maîtres alchimistes.',
  value: 500,
  effects: [
    {
      type: 'heal',
      magnitude: '10d4+20',
      target: 'self',
      description: 'Restaure 10d4+20 points de vie'
    }
  ],
  stackable: true,
  maxStack: 10,
  stats: {
    weight: 0.5
  }
};

export const POTION_FIRE_RESISTANCE: ItemDefinition = {
  id: 'potion:fire-resistance',
  name: 'Potion de Résistance au Feu',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'potion',
  description: 'Liquide orange qui protège des flammes pendant une heure.',
  value: 100,
  effects: [
    {
      type: 'buff',
      magnitude: 50,
      duration: 60,
      target: 'self',
      description: 'Résistance au feu +50% pendant 1 heure'
    }
  ],
  stackable: true,
  maxStack: 10,
  stats: {
    weight: 0.5
  }
};

export const POTION_INVISIBILITY: ItemDefinition = {
  id: 'potion:invisibility',
  name: 'Potion d\'Invisibilité',
  type: 'consumable',
  rarity: 'rare',
  category: 'potion',
  description: 'Potion translucide qui rend invisible pendant quelques minutes.',
  value: 300,
  effects: [
    {
      type: 'buff',
      magnitude: 100,
      duration: 10,
      target: 'self',
      description: 'Invisibilité totale pendant 10 tours (fin si attaque)'
    }
  ],
  stackable: true,
  maxStack: 5,
  stats: {
    weight: 0.5
  }
};

export const POTION_STRENGTH: ItemDefinition = {
  id: 'potion:strength:giant',
  name: 'Potion de Force de Géant',
  type: 'consumable',
  rarity: 'rare',
  category: 'potion',
  description: 'Élixir rouge sang qui octroie une force surhumaine.',
  value: 250,
  effects: [
    {
      type: 'buff',
      magnitude: 4,
      duration: 60,
      target: 'self',
      description: '+4 Force pendant 1 heure'
    }
  ],
  stackable: true,
  maxStack: 5,
  stats: {
    weight: 0.5
  }
};

// ============================================================================
// CONSOMMABLES - NOURRITURE
// ============================================================================

export const FOOD_BREAD: ItemDefinition = {
  id: 'food:bread:common',
  name: 'Pain',
  type: 'consumable',
  rarity: 'common',
  category: 'food',
  description: 'Miche de pain frais. Nourriture de base.',
  value: 2,
  effects: [
    {
      type: 'heal',
      magnitude: '1d4',
      target: 'self',
      description: 'Restaure 1d4 points de vie lentement'
    }
  ],
  stackable: true,
  maxStack: 50,
  stats: {
    weight: 0.5
  }
};

export const FOOD_ROASTED_MEAT: ItemDefinition = {
  id: 'food:roasted-meat',
  name: 'Viande Rôtie',
  type: 'consumable',
  rarity: 'common',
  category: 'food',
  description: 'Viande grillée juteuse. Nourrissante et savoureuse.',
  value: 8,
  effects: [
    {
      type: 'heal',
      magnitude: '2d4+2',
      target: 'self',
      description: 'Restaure 2d4+2 points de vie'
    },
    {
      type: 'buff',
      magnitude: 1,
      duration: 60,
      target: 'self',
      description: '+1 Constitution pendant 1 heure'
    }
  ],
  stackable: true,
  maxStack: 20,
  stats: {
    weight: 1
  }
};

export const FOOD_ELVEN_WAYBREAD: ItemDefinition = {
  id: 'food:elven-waybread',
  name: 'Pain de Route Elfique',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'food',
  description: 'Lembas elfique. Une bouchée suffit à nourrir un homme adulte.',
  lore: 'Cuit par les elfes de la Forêt d\'Émeraude selon une recette ancestrale. Se conserve indéfiniment.',
  value: 50,
  effects: [
    {
      type: 'heal',
      magnitude: '4d4+4',
      target: 'self',
      description: 'Restaure 4d4+4 points de vie'
    },
    {
      type: 'buff',
      magnitude: 2,
      duration: 480,
      target: 'self',
      description: '+2 à tous les attributs pendant 8 heures'
    }
  ],
  stackable: true,
  maxStack: 10,
  stats: {
    weight: 0.2
  }
};

// ============================================================================
// ARTEFACTS LÉGENDAIRES
// ============================================================================

export const ARTIFACT_STAFF_ARCHMAGE: ItemDefinition = {
  id: 'artifact:staff:archmage',
  name: 'Bâton de l\'Archimage',
  type: 'artifact',
  rarity: 'artifact',
  category: 'staff',
  description: 'Bâton ancestral des Archimages de la Guilde Arcane.',
  lore: 'Transmis de maître à élève depuis la fondation de la Guilde il y a huit cents ans. Le bâton contient l\'essence magique cumulée de tous ses porteurs. Il choisit lui-même son propriétaire.',
  value: 100000,
  stats: {
    damage: '2d6',
    attackBonus: 5,
    intelligence: 5,
    wisdom: 3,
    manaBonus: 100,
    weight: 4
  },
  effects: [
    {
      type: 'buff',
      magnitude: 25,
      target: 'self',
      description: '+25% puissance des sorts'
    },
    {
      type: 'buff',
      magnitude: 3,
      target: 'self',
      description: '+3 niveau de sort maximum'
    },
    {
      type: 'summon',
      magnitude: 1,
      description: 'Peut invoquer un élémentaire majeur 1x/jour'
    }
  ],
  requirements: {
    level: 20,
    class: ['Mage', 'Sorcier'],
    intelligence: 18
  },
  enchantable: false,
  bound: true,
  questItem: true
};

export const ARTIFACT_RING_POWER: ItemDefinition = {
  id: 'artifact:ring:power',
  name: 'Anneau du Pouvoir Ancien',
  type: 'artifact',
  rarity: 'artifact',
  category: 'accessory',
  description: 'Anneau maudit forgé dans les âges sombres. Confère pouvoir immense mais corrompt l\'âme.',
  lore: 'Un des Neuf Anneaux de Puissance forgés par le Seigneur Noir Zarkoth avant sa chute. Celui qui le porte trop longtemps devient une ombre de lui-même, esclave du pouvoir.',
  value: 0, // Inestimable
  stats: {
    strength: 4,
    dexterity: 4,
    constitution: 4,
    intelligence: 4,
    wisdom: -4,
    charisma: -4,
    weight: 0.1
  },
  effects: [
    {
      type: 'buff',
      magnitude: 50,
      target: 'self',
      description: '+50% à tous les dégâts'
    },
    {
      type: 'buff',
      magnitude: 100,
      target: 'self',
      description: 'Régénération rapide (5 HP/tour)'
    },
    {
      type: 'transform',
      magnitude: 1,
      description: 'MALÉDICTION: Transformation lente en spectre après 30 jours de port'
    }
  ],
  requirements: {
    level: 15
  },
  enchantable: false,
  bound: true,
  questItem: true
};

export const ARTIFACT_CROWN_KINGS: ItemDefinition = {
  id: 'artifact:crown:kings',
  name: 'Couronne des Rois Anciens',
  type: 'artifact',
  rarity: 'artifact',
  category: 'accessory',
  description: 'Couronne de mithril ornée de sept gemmes de pouvoir.',
  lore: 'Portée par les sept rois-fondateurs d\'Aethelgard lors de l\'unification du royaume. Confère légitimité divine au porteur. Les sept gemmes représentent les sept vertus royales : Courage, Sagesse, Justice, Compassion, Force, Honneur, Vision.',
  value: 500000,
  stats: {
    charisma: 6,
    wisdom: 4,
    intelligence: 2,
    weight: 2
  },
  effects: [
    {
      type: 'buff',
      magnitude: 50,
      target: 'ally',
      description: '+50 moral aux alliés dans un rayon de 30m'
    },
    {
      type: 'buff',
      magnitude: 20,
      target: 'self',
      description: '+20 à tous les jets de diplomatie et commandement'
    },
    {
      type: 'debuff',
      magnitude: -10,
      description: 'Les ennemis du royaume ont -10 au moral'
    }
  ],
  requirements: {
    level: 18,
    class: ['Paladin', 'Noble']
  },
  enchantable: false,
  bound: true,
  questItem: true
};

// ============================================================================
// MATÉRIAUX ET COMPOSANTS
// ============================================================================

export const MATERIAL_IRON_ORE: ItemDefinition = {
  id: 'material:iron-ore',
  name: 'Minerai de Fer',
  type: 'material',
  rarity: 'common',
  description: 'Minerai brut de fer, doit être fondu en lingot.',
  value: 5,
  stackable: true,
  maxStack: 100,
  stats: { weight: 2 }
};

export const MATERIAL_IRON_INGOT: ItemDefinition = {
  id: 'material:iron-ingot',
  name: 'Lingot de Fer',
  type: 'material',
  rarity: 'common',
  description: 'Lingot de fer pur, prêt à être forgé.',
  value: 10,
  stackable: true,
  maxStack: 100,
  stats: { weight: 1 }
};

export const MATERIAL_STEEL_INGOT: ItemDefinition = {
  id: 'material:steel-ingot',
  name: 'Lingot d\'Acier',
  type: 'material',
  rarity: 'uncommon',
  description: 'Alliage de fer et carbone, plus résistant que le fer.',
  value: 25,
  stackable: true,
  maxStack: 100,
  stats: { weight: 1 }
};

export const MATERIAL_MITHRIL: ItemDefinition = {
  id: 'material:mithril-ore',
  name: 'Minerai de Mithril',
  type: 'material',
  rarity: 'rare',
  description: 'Métal précieux argenté, léger et extrêmement résistant.',
  lore: 'Extrait des mines les plus profondes. Les nains considèrent le mithril comme un don des dieux.',
  value: 500,
  stackable: true,
  maxStack: 50,
  stats: { weight: 0.5 }
};

export const MATERIAL_DRAGONBONE: ItemDefinition = {
  id: 'material:dragonbone',
  name: 'Os de Dragon',
  type: 'material',
  rarity: 'epic',
  description: 'Os de dragon ancien, matériau exceptionnel pour armes légendaires.',
  lore: 'Les os de dragon ne se décomposent jamais et résonnent avec une énergie magique primordiale.',
  value: 2000,
  stackable: true,
  maxStack: 10,
  stats: { weight: 3 }
};

// ============================================================================
// EXPORTS
// ============================================================================

export const ALL_WEAPONS_COMMON: ItemDefinition[] = [
  WEAPON_COMMON_DAGGER,
  WEAPON_COMMON_SHORTSWORD,
  WEAPON_COMMON_LONGSWORD,
  WEAPON_COMMON_GREATAXE,
  WEAPON_COMMON_SHORTBOW,
  WEAPON_COMMON_LONGBOW,
  WEAPON_COMMON_STAFF
];

export const ALL_WEAPONS_RARE: ItemDefinition[] = [
  WEAPON_EPIC_FLAMEBRAND,
  WEAPON_LEGENDARY_DRAGONBANE,
  WEAPON_ARTIFACT_SHADOWFANG
];

export const ALL_ARMORS: ItemDefinition[] = [
  ARMOR_COMMON_LEATHER,
  ARMOR_COMMON_CHAINMAIL,
  ARMOR_COMMON_PLATEMAIL,
  ARMOR_EPIC_DRAGONSCALE
];

export const ALL_POTIONS: ItemDefinition[] = [
  POTION_MINOR_HEALING,
  POTION_NORMAL_HEALING,
  POTION_GREATER_HEALING,
  POTION_SUPREME_HEALING,
  POTION_FIRE_RESISTANCE,
  POTION_INVISIBILITY,
  POTION_STRENGTH
];

export const ALL_FOOD: ItemDefinition[] = [
  FOOD_BREAD,
  FOOD_ROASTED_MEAT,
  FOOD_ELVEN_WAYBREAD
];

export const ALL_ARTIFACTS: ItemDefinition[] = [
  ARTIFACT_STAFF_ARCHMAGE,
  ARTIFACT_RING_POWER,
  ARTIFACT_CROWN_KINGS
];

export const ALL_MATERIALS: ItemDefinition[] = [
  MATERIAL_IRON_ORE,
  MATERIAL_IRON_INGOT,
  MATERIAL_STEEL_INGOT,
  MATERIAL_MITHRIL,
  MATERIAL_DRAGONBONE
];

// LifePath items array
export const ALL_LIFEPATH_ITEMS: ItemDefinition[] = [
  LIFEPATH_LIBRARY_CARD,
  LIFEPATH_FINE_QUILL,
  LIFEPATH_CITY_MAP,
  LIFEPATH_FAMILY_HEIRLOOM,
  LIFEPATH_QUALITY_SWORD,
  LIFEPATH_VETERAN_BADGE
];

export const ALL_ITEMS: ItemDefinition[] = [
  ...ALL_LIFEPATH_ITEMS,
  ...ALL_WEAPONS_COMMON,
  ...ALL_WEAPONS_RARE,
  ...ALL_ARMORS,
  ...ALL_POTIONS,
  ...ALL_FOOD,
  ...ALL_ARTIFACTS,
  ...ALL_MATERIALS
];

export const ITEMS_BY_ID: Record<string, ItemDefinition> = ALL_ITEMS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<string, ItemDefinition>);

export const ITEMS_BY_RARITY: Record<ItemRarity, ItemDefinition[]> = ALL_ITEMS.reduce((acc, item) => {
  if (!acc[item.rarity]) acc[item.rarity] = [];
  acc[item.rarity].push(item);
  return acc;
}, {} as Record<ItemRarity, ItemDefinition[]>);

export const ITEMS_BY_TYPE: Record<ItemType, ItemDefinition[]> = ALL_ITEMS.reduce((acc, item) => {
  if (!acc[item.type]) acc[item.type] = [];
  acc[item.type].push(item);
  return acc;
}, {} as Record<ItemType, ItemDefinition[]>);

/**
 * Trouve items pour un marchand
 */
export function getItemsForMerchant(merchantType: string, playerLevel: number): ItemDefinition[] {
  return ALL_ITEMS.filter(item => {
    // Filtrer par niveau suggéré (approximatif basé sur valeur)
    const suggestedLevel = Math.floor(item.value / 100);
    if (suggestedLevel > playerLevel + 5) return false;
    
    // Filtrer par type de marchand
    if (merchantType === 'blacksmith') {
      return item.type === 'weapon' || item.type === 'armor' || item.type === 'material';
    } else if (merchantType === 'alchemist') {
      return item.type === 'consumable' && (item.category === 'potion' || item.type === 'material');
    } else if (merchantType === 'general') {
      return item.rarity === 'common' || item.rarity === 'uncommon';
    }
    
    return false;
  });
}

/**
 * Génère butin aléatoire
 */
export function generateLoot(cr: number, quantity: number = 1): ItemDefinition[] {
  const loot: ItemDefinition[] = [];
  const maxValue = cr * 50;
  
  for (let i = 0; i < quantity; i++) {
    const availableItems = ALL_ITEMS.filter(item => 
      item.value <= maxValue && 
      !item.questItem && 
      !item.bound &&
      item.rarity !== 'artifact'
    );
    
    if (availableItems.length > 0) {
      const random = Math.floor(Math.random() * availableItems.length);
      loot.push(availableItems[random]);
    }
  }
  
  return loot;
}
