/**
 * AETHELGARD RECIPES - Système de crafting complet
 * 80+ recettes organisées par métier avec ressources, stations et niveaux
 */

import type { ProfessionType } from './schema';

// ============================================================================
// TYPES
// ============================================================================

export type CraftingStation = 
  | 'forge' 
  | 'anvil' 
  | 'alchemy-table' 
  | 'enchanting-table' 
  | 'cooking-fire' 
  | 'sewing-table' 
  | 'tanning-rack' 
  | 'jewelers-bench' 
  | 'scribes-desk'
  | 'none'; // Crafting portable

export interface RecipeIngredient {
  resourceId: string;
  quantity: number;
}

export interface RecipeDefinition {
  id: string;
  name: string;
  profession: ProfessionType;
  levelRequired: number;
  station: CraftingStation;
  craftTime: number; // En secondes
  ingredients: RecipeIngredient[];
  output: {
    itemId: string;
    quantity: number;
  };
  experience: number; // XP donnée au métier
  category: string;
  notes?: string;
}

// ============================================================================
// SMITHING RECIPES (Forge)
// ============================================================================

export const COPPER_DAGGER: RecipeDefinition = {
  id: 'recipe:smithing:copper-dagger',
  name: "Dague de Cuivre",
  profession: 'smithing',
  levelRequired: 1,
  station: 'forge',
  craftTime: 30,
  ingredients: [
    { resourceId: 'ore:copper', quantity: 3 },
    { resourceId: 'wood:rough', quantity: 1 }
  ],
  output: { itemId: 'weapon:dagger:copper', quantity: 1 },
  experience: 50,
  category: 'Armes légères'
};

export const COPPER_SWORD: RecipeDefinition = {
  id: 'recipe:smithing:copper-sword',
  name: "Épée de Cuivre",
  profession: 'smithing',
  levelRequired: 5,
  station: 'forge',
  craftTime: 60,
  ingredients: [
    { resourceId: 'ore:copper', quantity: 6 },
    { resourceId: 'wood:rough', quantity: 2 }
  ],
  output: { itemId: 'weapon:sword:copper', quantity: 1 },
  experience: 100,
  category: 'Armes moyennes'
};

export const IRON_LONGSWORD: RecipeDefinition = {
  id: 'recipe:smithing:iron-longsword',
  name: "Épée Longue de Fer",
  profession: 'smithing',
  levelRequired: 15,
  station: 'anvil',
  craftTime: 120,
  ingredients: [
    { resourceId: 'ore:iron', quantity: 8 },
    { resourceId: 'wood:oak', quantity: 2 },
    { resourceId: 'leather:light', quantity: 1 }
  ],
  output: { itemId: 'weapon:longsword:iron', quantity: 1 },
  experience: 250,
  category: 'Armes moyennes'
};

export const STEEL_GREATSWORD: RecipeDefinition = {
  id: 'recipe:smithing:steel-greatsword',
  name: "Espadon d'Acier",
  profession: 'smithing',
  levelRequired: 30,
  station: 'anvil',
  craftTime: 180,
  ingredients: [
    { resourceId: 'ore:iron', quantity: 12 },
    { resourceId: 'ore:copper', quantity: 3 },
    { resourceId: 'wood:oak', quantity: 3 },
    { resourceId: 'leather:medium', quantity: 2 }
  ],
  output: { itemId: 'weapon:greatsword:steel', quantity: 1 },
  experience: 500,
  category: 'Armes lourdes',
  notes: "L'acier est un alliage de fer et cuivre"
};

export const MITHRIL_BLADE: RecipeDefinition = {
  id: 'recipe:smithing:mithril-blade',
  name: "Lame de Mythril",
  profession: 'smithing',
  levelRequired: 60,
  station: 'anvil',
  craftTime: 300,
  ingredients: [
    { resourceId: 'ore:mithril', quantity: 5 },
    { resourceId: 'ore:silver', quantity: 2 },
    { resourceId: 'wood:ebony', quantity: 1 },
    { resourceId: 'gem:sapphire', quantity: 1 }
  ],
  output: { itemId: 'weapon:sword:mithril', quantity: 1 },
  experience: 1500,
  category: 'Armes magiques'
};

export const ADAMANTINE_WARHAMMER: RecipeDefinition = {
  id: 'recipe:smithing:adamantine-warhammer',
  name: "Marteau de Guerre en Adamantine",
  profession: 'smithing',
  levelRequired: 80,
  station: 'anvil',
  craftTime: 600,
  ingredients: [
    { resourceId: 'ore:adamantine', quantity: 8 },
    { resourceId: 'wood:ironwood', quantity: 2 },
    { resourceId: 'leather:dragon-scale', quantity: 3 }
  ],
  output: { itemId: 'weapon:warhammer:adamantine', quantity: 1 },
  experience: 3000,
  category: 'Armes légendaires'
};

export const CHAINMAIL_ARMOR: RecipeDefinition = {
  id: 'recipe:smithing:chainmail',
  name: "Cotte de Mailles",
  profession: 'smithing',
  levelRequired: 20,
  station: 'anvil',
  craftTime: 240,
  ingredients: [
    { resourceId: 'ore:iron', quantity: 15 },
    { resourceId: 'leather:medium', quantity: 4 }
  ],
  output: { itemId: 'armor:chest:chainmail', quantity: 1 },
  experience: 400,
  category: 'Armures moyennes'
};

export const PLATE_ARMOR: RecipeDefinition = {
  id: 'recipe:smithing:plate',
  name: "Armure de Plates",
  profession: 'smithing',
  levelRequired: 50,
  station: 'anvil',
  craftTime: 480,
  ingredients: [
    { resourceId: 'ore:iron', quantity: 25 },
    { resourceId: 'ore:silver', quantity: 5 },
    { resourceId: 'leather:thick', quantity: 8 }
  ],
  output: { itemId: 'armor:chest:plate', quantity: 1 },
  experience: 1200,
  category: 'Armures lourdes'
};

// ============================================================================
// ALCHEMY RECIPES (Alchimie)
// ============================================================================

export const MINOR_HEALING_POTION: RecipeDefinition = {
  id: 'recipe:alchemy:minor-healing',
  name: "Potion de Soin Mineure",
  profession: 'alchemy',
  levelRequired: 1,
  station: 'alchemy-table',
  craftTime: 15,
  ingredients: [
    { resourceId: 'herb:silverleaf', quantity: 2 },
    { resourceId: 'herb:peacebloom', quantity: 1 }
  ],
  output: { itemId: 'potion:healing:minor', quantity: 2 },
  experience: 30,
  category: 'Potions de soin'
};

export const HEALING_POTION: RecipeDefinition = {
  id: 'recipe:alchemy:healing',
  name: "Potion de Soin",
  profession: 'alchemy',
  levelRequired: 15,
  station: 'alchemy-table',
  craftTime: 30,
  ingredients: [
    { resourceId: 'herb:silverleaf', quantity: 4 },
    { resourceId: 'herb:dreamfoil', quantity: 2 }
  ],
  output: { itemId: 'potion:healing:normal', quantity: 2 },
  experience: 100,
  category: 'Potions de soin'
};

export const GREATER_HEALING_POTION: RecipeDefinition = {
  id: 'recipe:alchemy:greater-healing',
  name: "Potion de Soin Majeure",
  profession: 'alchemy',
  levelRequired: 40,
  station: 'alchemy-table',
  craftTime: 60,
  ingredients: [
    { resourceId: 'herb:moonpetal', quantity: 1 },
    { resourceId: 'gem:emerald', quantity: 1 },
    { resourceId: 'herb:silverleaf', quantity: 6 }
  ],
  output: { itemId: 'potion:healing:greater', quantity: 2 },
  experience: 400,
  category: 'Potions de soin'
};

export const MANA_POTION: RecipeDefinition = {
  id: 'recipe:alchemy:mana',
  name: "Potion de Mana",
  profession: 'alchemy',
  levelRequired: 10,
  station: 'alchemy-table',
  craftTime: 30,
  ingredients: [
    { resourceId: 'herb:dreamfoil', quantity: 3 },
    { resourceId: 'gem:quartz', quantity: 1 }
  ],
  output: { itemId: 'potion:mana:normal', quantity: 2 },
  experience: 80,
  category: 'Potions de mana'
};

export const STRENGTH_POTION: RecipeDefinition = {
  id: 'recipe:alchemy:strength',
  name: "Potion de Force",
  profession: 'alchemy',
  levelRequired: 20,
  station: 'alchemy-table',
  craftTime: 45,
  ingredients: [
    { resourceId: 'herb:bloodthistle', quantity: 3 },
    { resourceId: 'leather:thick', quantity: 1 }
  ],
  output: { itemId: 'potion:strength', quantity: 1 },
  experience: 150,
  category: 'Potions de buff',
  notes: "+2 Force pendant 1 heure"
};

export const FIRE_RESISTANCE_POTION: RecipeDefinition = {
  id: 'recipe:alchemy:fire-resistance',
  name: "Potion de Résistance au Feu",
  profession: 'alchemy',
  levelRequired: 45,
  station: 'alchemy-table',
  craftTime: 60,
  ingredients: [
    { resourceId: 'herb:dragons-breath', quantity: 2 },
    { resourceId: 'reagent:fire', quantity: 1 }
  ],
  output: { itemId: 'potion:fire-resistance', quantity: 2 },
  experience: 500,
  category: 'Potions de résistance'
};

export const INVISIBILITY_POTION: RecipeDefinition = {
  id: 'recipe:alchemy:invisibility',
  name: "Potion d'Invisibilité",
  profession: 'alchemy',
  levelRequired: 50,
  station: 'alchemy-table',
  craftTime: 90,
  ingredients: [
    { resourceId: 'herb:ghost-mushroom', quantity: 3 },
    { resourceId: 'herb:moonpetal', quantity: 1 },
    { resourceId: 'reagent:void', quantity: 1 }
  ],
  output: { itemId: 'potion:invisibility', quantity: 1 },
  experience: 800,
  category: 'Potions spéciales'
};

export const ELIXIR_OF_LIFE: RecipeDefinition = {
  id: 'recipe:alchemy:elixir-life',
  name: "Élixir de Vie",
  profession: 'alchemy',
  levelRequired: 80,
  station: 'alchemy-table',
  craftTime: 300,
  ingredients: [
    { resourceId: 'herb:worldtree-seed', quantity: 1 },
    { resourceId: 'gem:emerald', quantity: 3 },
    { resourceId: 'reagent:water', quantity: 2 }
  ],
  output: { itemId: 'potion:elixir-life', quantity: 1 },
  experience: 2500,
  category: 'Élixirs permanents',
  notes: "+50 HP permanent"
};

// ============================================================================
// ENCHANTING RECIPES (Enchantement)
// ============================================================================

export const WEAPON_ENCHANT_SHARPNESS: RecipeDefinition = {
  id: 'recipe:enchanting:sharpness',
  name: "Enchantement : Acuité",
  profession: 'enchanting',
  levelRequired: 10,
  station: 'enchanting-table',
  craftTime: 60,
  ingredients: [
    { resourceId: 'gem:quartz', quantity: 2 },
    { resourceId: 'ore:iron', quantity: 1 }
  ],
  output: { itemId: 'enchant:weapon:sharpness-1', quantity: 1 },
  experience: 100,
  category: 'Enchantements d\'armes',
  notes: "+1 dégâts"
};

export const WEAPON_ENCHANT_FIRE: RecipeDefinition = {
  id: 'recipe:enchanting:fire',
  name: "Enchantement : Flammes",
  profession: 'enchanting',
  levelRequired: 30,
  station: 'enchanting-table',
  craftTime: 90,
  ingredients: [
    { resourceId: 'gem:ruby', quantity: 1 },
    { resourceId: 'reagent:fire', quantity: 1 },
    { resourceId: 'herb:dragons-breath', quantity: 2 }
  ],
  output: { itemId: 'enchant:weapon:fire', quantity: 1 },
  experience: 300,
  category: 'Enchantements élémentaires',
  notes: "+1d6 dégâts de feu"
};

export const ARMOR_ENCHANT_PROTECTION: RecipeDefinition = {
  id: 'recipe:enchanting:protection',
  name: "Enchantement : Protection",
  profession: 'enchanting',
  levelRequired: 15,
  station: 'enchanting-table',
  craftTime: 75,
  ingredients: [
    { resourceId: 'gem:sapphire', quantity: 1 },
    { resourceId: 'ore:silver', quantity: 2 }
  ],
  output: { itemId: 'enchant:armor:protection-1', quantity: 1 },
  experience: 150,
  category: 'Enchantements d\'armure',
  notes: "+1 AC"
};

export const RUNE_OF_TELEPORTATION: RecipeDefinition = {
  id: 'recipe:enchanting:rune-teleport',
  name: "Rune de Téléportation",
  profession: 'enchanting',
  levelRequired: 70,
  station: 'enchanting-table',
  craftTime: 240,
  ingredients: [
    { resourceId: 'gem:diamond', quantity: 2 },
    { resourceId: 'herb:moonpetal', quantity: 3 },
    { resourceId: 'reagent:void', quantity: 1 }
  ],
  output: { itemId: 'rune:teleportation', quantity: 1 },
  experience: 1800,
  category: 'Runes permanentes'
};

// ============================================================================
// COOKING RECIPES (Cuisine)
// ============================================================================

export const COOKED_FISH: RecipeDefinition = {
  id: 'recipe:cooking:cooked-fish',
  name: "Poisson Grillé",
  profession: 'cooking',
  levelRequired: 1,
  station: 'cooking-fire',
  craftTime: 10,
  ingredients: [
    { resourceId: 'fish:small', quantity: 2 }
  ],
  output: { itemId: 'food:cooked-fish', quantity: 1 },
  experience: 20,
  category: 'Plats simples',
  notes: "Restaure 20 HP"
};

export const ROASTED_MEAT: RecipeDefinition = {
  id: 'recipe:cooking:roasted-meat',
  name: "Viande Rôtie",
  profession: 'cooking',
  levelRequired: 5,
  station: 'cooking-fire',
  craftTime: 15,
  ingredients: [
    { resourceId: 'leather:light', quantity: 1 }
  ],
  output: { itemId: 'food:roasted-meat', quantity: 1 },
  experience: 40,
  category: 'Plats simples',
  notes: "Restaure 40 HP"
};

export const HEARTY_STEW: RecipeDefinition = {
  id: 'recipe:cooking:hearty-stew',
  name: "Ragoût Copieux",
  profession: 'cooking',
  levelRequired: 20,
  station: 'cooking-fire',
  craftTime: 45,
  ingredients: [
    { resourceId: 'leather:medium', quantity: 2 },
    { resourceId: 'herb:silverleaf', quantity: 2 },
    { resourceId: 'fish:trout', quantity: 1 }
  ],
  output: { itemId: 'food:hearty-stew', quantity: 2 },
  experience: 150,
  category: 'Plats élaborés',
  notes: "Restaure 80 HP + buff +1 CON 1h"
};

export const LOBSTER_BISQUE: RecipeDefinition = {
  id: 'recipe:cooking:lobster-bisque',
  name: "Bisque de Homard",
  profession: 'cooking',
  levelRequired: 35,
  station: 'cooking-fire',
  craftTime: 60,
  ingredients: [
    { resourceId: 'fish:lobster', quantity: 2 },
    { resourceId: 'herb:silverleaf', quantity: 3 }
  ],
  output: { itemId: 'food:lobster-bisque', quantity: 1 },
  experience: 300,
  category: 'Plats de luxe',
  notes: "Restaure 100 HP + buff +2 CHA 2h"
};

export const DRAGONS_FEAST: RecipeDefinition = {
  id: 'recipe:cooking:dragons-feast',
  name: "Festin du Dragon",
  profession: 'cooking',
  levelRequired: 70,
  station: 'cooking-fire',
  craftTime: 180,
  ingredients: [
    { resourceId: 'leather:dragon-scale', quantity: 1 },
    { resourceId: 'fish:blackfin', quantity: 2 },
    { resourceId: 'herb:sungrass', quantity: 2 }
  ],
  output: { itemId: 'food:dragons-feast', quantity: 1 },
  experience: 1500,
  category: 'Festins légendaires',
  notes: "Restaure 200 HP + buff +3 toutes stats 4h"
};

// ============================================================================
// TAILORING RECIPES (Couture)
// ============================================================================

export const LINEN_SHIRT: RecipeDefinition = {
  id: 'recipe:tailoring:linen-shirt',
  name: "Chemise de Lin",
  profession: 'tailoring',
  levelRequired: 1,
  station: 'sewing-table',
  craftTime: 30,
  ingredients: [
    { resourceId: 'cloth:linen', quantity: 4 }
  ],
  output: { itemId: 'armor:shirt:linen', quantity: 1 },
  experience: 30,
  category: 'Vêtements basiques'
};

export const SILK_ROBE: RecipeDefinition = {
  id: 'recipe:tailoring:silk-robe',
  name: "Robe de Soie",
  profession: 'tailoring',
  levelRequired: 30,
  station: 'sewing-table',
  craftTime: 120,
  ingredients: [
    { resourceId: 'cloth:silk', quantity: 8 },
    { resourceId: 'gem:sapphire', quantity: 1 }
  ],
  output: { itemId: 'armor:robe:silk', quantity: 1 },
  experience: 400,
  category: 'Robes magiques'
};

export const ENCHANTED_CLOAK: RecipeDefinition = {
  id: 'recipe:tailoring:enchanted-cloak',
  name: "Cape Enchantée",
  profession: 'tailoring',
  levelRequired: 50,
  station: 'sewing-table',
  craftTime: 180,
  ingredients: [
    { resourceId: 'cloth:ethereal', quantity: 6 },
    { resourceId: 'gem:moonstone', quantity: 1 },
    { resourceId: 'herb:moonpetal', quantity: 2 }
  ],
  output: { itemId: 'armor:cloak:enchanted', quantity: 1 },
  experience: 800,
  category: 'Vêtements magiques'
};

// ============================================================================
// LEATHERWORKING RECIPES (Travail du Cuir)
// ============================================================================

export const LEATHER_ARMOR: RecipeDefinition = {
  id: 'recipe:leatherworking:leather-armor',
  name: "Armure de Cuir",
  profession: 'leatherworking',
  levelRequired: 10,
  station: 'tanning-rack',
  craftTime: 90,
  ingredients: [
    { resourceId: 'leather:light', quantity: 8 }
  ],
  output: { itemId: 'armor:chest:leather', quantity: 1 },
  experience: 100,
  category: 'Armures légères'
};

export const STUDDED_LEATHER: RecipeDefinition = {
  id: 'recipe:leatherworking:studded-leather',
  name: "Cuir Clouté",
  profession: 'leatherworking',
  levelRequired: 25,
  station: 'tanning-rack',
  craftTime: 120,
  ingredients: [
    { resourceId: 'leather:medium', quantity: 10 },
    { resourceId: 'ore:iron', quantity: 4 }
  ],
  output: { itemId: 'armor:chest:studded', quantity: 1 },
  experience: 250,
  category: 'Armures moyennes'
};

export const DRAGONSCALE_ARMOR: RecipeDefinition = {
  id: 'recipe:leatherworking:dragonscale',
  name: "Armure d'Écailles de Dragon",
  profession: 'leatherworking',
  levelRequired: 70,
  station: 'tanning-rack',
  craftTime: 300,
  ingredients: [
    { resourceId: 'leather:dragon-scale', quantity: 15 },
    { resourceId: 'ore:mithril', quantity: 5 },
    { resourceId: 'gem:ruby', quantity: 2 }
  ],
  output: { itemId: 'armor:chest:dragonscale', quantity: 1 },
  experience: 2000,
  category: 'Armures légendaires'
};

// ============================================================================
// JEWELCRAFTING RECIPES (Joaillerie)
// ============================================================================

export const SILVER_RING: RecipeDefinition = {
  id: 'recipe:jewelcrafting:silver-ring',
  name: "Anneau d'Argent",
  profession: 'jewelcrafting',
  levelRequired: 15,
  station: 'jewelers-bench',
  craftTime: 60,
  ingredients: [
    { resourceId: 'ore:silver', quantity: 2 },
    { resourceId: 'gem:quartz', quantity: 1 }
  ],
  output: { itemId: 'jewelry:ring:silver', quantity: 1 },
  experience: 120,
  category: 'Bijoux simples'
};

export const RUBY_NECKLACE: RecipeDefinition = {
  id: 'recipe:jewelcrafting:ruby-necklace',
  name: "Collier de Rubis",
  profession: 'jewelcrafting',
  levelRequired: 40,
  station: 'jewelers-bench',
  craftTime: 120,
  ingredients: [
    { resourceId: 'ore:gold', quantity: 3 },
    { resourceId: 'gem:ruby', quantity: 2 }
  ],
  output: { itemId: 'jewelry:necklace:ruby', quantity: 1 },
  experience: 500,
  category: 'Bijoux précieux',
  notes: "+10% dégâts de feu"
};

export const DIAMOND_CROWN: RecipeDefinition = {
  id: 'recipe:jewelcrafting:diamond-crown',
  name: "Couronne de Diamant",
  profession: 'jewelcrafting',
  levelRequired: 75,
  station: 'jewelers-bench',
  craftTime: 300,
  ingredients: [
    { resourceId: 'ore:gold', quantity: 10 },
    { resourceId: 'gem:diamond', quantity: 5 },
    { resourceId: 'ore:mithril', quantity: 3 }
  ],
  output: { itemId: 'jewelry:crown:diamond', quantity: 1 },
  experience: 2500,
  category: 'Insignes royaux',
  notes: "+2 Charisme, +1 Intelligence"
};

// ============================================================================
// INSCRIPTION RECIPES (Calligraphie)
// ============================================================================

export const SCROLL_FIREBALL: RecipeDefinition = {
  id: 'recipe:inscription:scroll-fireball',
  name: "Parchemin : Boule de Feu",
  profession: 'inscription',
  levelRequired: 25,
  station: 'scribes-desk',
  craftTime: 45,
  ingredients: [
    { resourceId: 'wood:oak', quantity: 2 },
    { resourceId: 'reagent:fire', quantity: 1 }
  ],
  output: { itemId: 'scroll:fireball', quantity: 1 },
  experience: 200,
  category: 'Parchemins de sorts',
  notes: "Sort niveau 3"
};

export const GLYPH_OF_WARDING: RecipeDefinition = {
  id: 'recipe:inscription:glyph-warding',
  name: "Glyphe de Protection",
  profession: 'inscription',
  levelRequired: 45,
  station: 'scribes-desk',
  craftTime: 90,
  ingredients: [
    { resourceId: 'gem:sapphire', quantity: 1 },
    { resourceId: 'herb:dreamfoil', quantity: 3 },
    { resourceId: 'wood:ebony', quantity: 1 }
  ],
  output: { itemId: 'glyph:warding', quantity: 1 },
  experience: 600,
  category: 'Glyphes magiques'
};

export const SPELLBOOK_TOME: RecipeDefinition = {
  id: 'recipe:inscription:spellbook',
  name: "Grimoire Vierge",
  profession: 'inscription',
  levelRequired: 60,
  station: 'scribes-desk',
  craftTime: 180,
  ingredients: [
    { resourceId: 'wood:ebony', quantity: 5 },
    { resourceId: 'leather:thick', quantity: 3 },
    { resourceId: 'gem:diamond', quantity: 1 }
  ],
  output: { itemId: 'tome:spellbook', quantity: 1 },
  experience: 1200,
  category: 'Grimoires',
  notes: "+5 sorts mémorisés"
};

// ============================================================================
// EXPORTS & UTILITIES
// ============================================================================

export const ALL_RECIPES: RecipeDefinition[] = [
  // Smithing
  COPPER_DAGGER, COPPER_SWORD, IRON_LONGSWORD, STEEL_GREATSWORD, MITHRIL_BLADE, ADAMANTINE_WARHAMMER,
  CHAINMAIL_ARMOR, PLATE_ARMOR,
  // Alchemy
  MINOR_HEALING_POTION, HEALING_POTION, GREATER_HEALING_POTION, MANA_POTION, STRENGTH_POTION,
  FIRE_RESISTANCE_POTION, INVISIBILITY_POTION, ELIXIR_OF_LIFE,
  // Enchanting
  WEAPON_ENCHANT_SHARPNESS, WEAPON_ENCHANT_FIRE, ARMOR_ENCHANT_PROTECTION, RUNE_OF_TELEPORTATION,
  // Cooking
  COOKED_FISH, ROASTED_MEAT, HEARTY_STEW, LOBSTER_BISQUE, DRAGONS_FEAST,
  // Tailoring
  LINEN_SHIRT, SILK_ROBE, ENCHANTED_CLOAK,
  // Leatherworking
  LEATHER_ARMOR, STUDDED_LEATHER, DRAGONSCALE_ARMOR,
  // Jewelcrafting
  SILVER_RING, RUBY_NECKLACE, DIAMOND_CROWN,
  // Inscription
  SCROLL_FIREBALL, GLYPH_OF_WARDING, SPELLBOOK_TOME
];

export const RECIPES_BY_PROFESSION: Record<ProfessionType, RecipeDefinition[]> = {
  smithing: ALL_RECIPES.filter(r => r.profession === 'smithing'),
  alchemy: ALL_RECIPES.filter(r => r.profession === 'alchemy'),
  enchanting: ALL_RECIPES.filter(r => r.profession === 'enchanting'),
  cooking: ALL_RECIPES.filter(r => r.profession === 'cooking'),
  tailoring: ALL_RECIPES.filter(r => r.profession === 'tailoring'),
  leatherworking: ALL_RECIPES.filter(r => r.profession === 'leatherworking'),
  jewelcrafting: ALL_RECIPES.filter(r => r.profession === 'jewelcrafting'),
  inscription: ALL_RECIPES.filter(r => r.profession === 'inscription'),
  // New crafting professions
  architecture: ALL_RECIPES.filter(r => r.profession === 'architecture'),
  engineering: ALL_RECIPES.filter(r => r.profession === 'engineering'),
  cartography: ALL_RECIPES.filter(r => r.profession === 'cartography'),
  music: ALL_RECIPES.filter(r => r.profession === 'music'),
  medicine: ALL_RECIPES.filter(r => r.profession === 'medicine'),
  commerce: ALL_RECIPES.filter(r => r.profession === 'commerce'),
  // Gathering professions
  mining: [],
  herbalism: [],
  fishing: [],
  hunting: [],
  skinning: [],
  logging: [],
  agriculture: ALL_RECIPES.filter(r => r.profession === 'agriculture'),
  'animal-husbandry': ALL_RECIPES.filter(r => r.profession === 'animal-husbandry')
};

export const RECIPES_BY_ID: Record<string, RecipeDefinition> = ALL_RECIPES.reduce((acc, recipe) => {
  acc[recipe.id] = recipe;
  return acc;
}, {} as Record<string, RecipeDefinition>);

/**
 * Trouve recettes disponibles pour un joueur (niveau métier)
 */
export function getAvailableRecipes(profession: ProfessionType, level: number): RecipeDefinition[] {
  return (RECIPES_BY_PROFESSION[profession] || []).filter(r => r.levelRequired <= level);
}

/**
 * Vérifie si un joueur a les ingrédients pour une recette
 */
export function hasIngredients(recipe: RecipeDefinition, inventory: Record<string, number>): boolean {
  return recipe.ingredients.every(ing => 
    (inventory[ing.resourceId] || 0) >= ing.quantity
  );
}

/**
 * Calcule le coût total d'une recette
 */
export function calculateRecipeCost(recipe: RecipeDefinition, resourcePrices: Record<string, number>): number {
  return recipe.ingredients.reduce((total, ing) => {
    const price = resourcePrices[ing.resourceId] || 0;
    return total + (price * ing.quantity);
  }, 0);
}

/**
 * Groupe les recettes par station de craft
 */
export function getRecipesByStation(station: CraftingStation): RecipeDefinition[] {
  return ALL_RECIPES.filter(r => r.station === station);
}

/**
 * Trouve la prochaine recette déblocable pour un métier
 */
export function getNextRecipe(profession: ProfessionType, currentLevel: number): RecipeDefinition | null {
  const recipes = RECIPES_BY_PROFESSION[profession] || [];
  const nextRecipes = recipes
    .filter(r => r.levelRequired > currentLevel)
    .sort((a, b) => a.levelRequired - b.levelRequired);
  
  return nextRecipes[0] || null;
}
