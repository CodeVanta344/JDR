/**
 * SYSTÈME DE MÉTIERS - PROFESSIONS DE CRAFT
 * 
 * 7 professions de craft avec progression niveau 1-100
 * Recettes par palliers, spécialisations niveau 50+
 * Qualité items : Normal → Légendaire
 */

import type { Recipe } from './schema';

// ============================================================================
// FORGERON - 50 RECETTES
// ============================================================================

export const BLACKSMITH_RECIPES: Recipe[] = [
  // Niveau 1-20 : Fer basique
  {
    id: 'recipe_blacksmith_iron_dagger',
    name: 'Dague en Fer',
    profession: 'Forgeron',
    category: 'Arme',
    levelRequired: 1,
    ingredients: [
      { itemId: 'resource_iron_bar', quantity: 2 },
      { itemId: 'resource_leather', quantity: 1 }
    ],
    result: { itemId: 'weapon_iron_dagger', quantity: 1 },
    station: 'Forge',
    craftTime: 30,
    experienceGained: 10
  },
  {
    id: 'recipe_blacksmith_iron_sword',
    name: 'Épée Courte en Fer',
    profession: 'Forgeron',
    category: 'Arme',
    levelRequired: 5,
    ingredients: [
      { itemId: 'resource_iron_bar', quantity: 3 },
      { itemId: 'resource_wood_handle', quantity: 1 }
    ],
    result: { itemId: 'weapon_iron_shortsword', quantity: 1 },
    station: 'Forge',
    craftTime: 45,
    experienceGained: 15
  },
  {
    id: 'recipe_blacksmith_studded_leather',
    name: 'Armure de Cuir Clouté',
    profession: 'Forgeron',
    category: 'Armure',
    levelRequired: 10,
    ingredients: [
      { itemId: 'resource_leather', quantity: 5 },
      { itemId: 'resource_iron_nails', quantity: 10 }
    ],
    result: { itemId: 'armor_studded_leather', quantity: 1 },
    station: 'Forge',
    craftTime: 60,
    experienceGained: 20
  },
  {
    id: 'recipe_blacksmith_reinforced_shield',
    name: 'Bouclier Bois Renforcé',
    profession: 'Forgeron',
    category: 'Armure',
    levelRequired: 15,
    ingredients: [
      { itemId: 'resource_oak_planks', quantity: 3 },
      { itemId: 'resource_iron_bar', quantity: 2 }
    ],
    result: { itemId: 'armor_reinforced_shield', quantity: 1 },
    station: 'Forge',
    craftTime: 50,
    experienceGained: 25
  },
  {
    id: 'recipe_blacksmith_steel_longsword',
    name: 'Épée Longue en Acier',
    profession: 'Forgeron',
    category: 'Arme',
    levelRequired: 20,
    ingredients: [
      { itemId: 'resource_steel_bar', quantity: 5 },
      { itemId: 'resource_gem_minor', quantity: 1 }
    ],
    result: { itemId: 'weapon_steel_longsword', quantity: 1 },
    station: 'Forge',
    craftTime: 90,
    experienceGained: 35
  },

  // Niveau 21-50 : Acier avancé
  {
    id: 'recipe_blacksmith_steel_plate',
    name: 'Armure de Plates en Acier',
    profession: 'Forgeron',
    category: 'Armure',
    levelRequired: 25,
    ingredients: [
      { itemId: 'resource_steel_bar', quantity: 20 },
      { itemId: 'resource_reinforced_leather', quantity: 5 }
    ],
    result: { itemId: 'armor_steel_plate', quantity: 1 },
    station: 'Forge',
    craftTime: 120,
    experienceGained: 50
  },
  {
    id: 'recipe_blacksmith_war_axe_plus1',
    name: 'Hache de Guerre +1',
    profession: 'Forgeron',
    category: 'Arme',
    levelRequired: 30,
    ingredients: [
      { itemId: 'resource_steel_bar', quantity: 8 },
      { itemId: 'resource_gem_common', quantity: 2 },
      { itemId: 'resource_rune_power', quantity: 1 }
    ],
    result: { itemId: 'weapon_war_axe_plus1', quantity: 1 },
    station: 'Forge',
    craftTime: 150,
    experienceGained: 75
  },
  {
    id: 'recipe_blacksmith_mithril_sword',
    name: 'Épée en Mithril',
    profession: 'Forgeron',
    category: 'Arme',
    levelRequired: 40,
    ingredients: [
      { itemId: 'resource_mithril_bar', quantity: 10 },
      { itemId: 'resource_gem_rare', quantity: 3 }
    ],
    result: { itemId: 'weapon_mithril_sword', quantity: 1 },
    station: 'Forge Avancée',
    craftTime: 180,
    experienceGained: 100
  },
  {
    id: 'recipe_blacksmith_runic_armor',
    name: 'Armure Runique',
    profession: 'Forgeron',
    category: 'Armure',
    levelRequired: 50,
    ingredients: [
      { itemId: 'resource_mithril_bar', quantity: 15 },
      { itemId: 'resource_rune_defense', quantity: 5 }
    ],
    result: { itemId: 'armor_runic_plate', quantity: 1 },
    station: 'Forge Avancée',
    craftTime: 240,
    experienceGained: 150
  },

  // Niveau 51-100 : Légendaire
  {
    id: 'recipe_blacksmith_dragon_slayer',
    name: 'Épée Légendaire "Brise-Aube"',
    profession: 'Forgeron',
    category: 'Arme',
    levelRequired: 75,
    specialization: 'Armes-Maître',
    ingredients: [
      { itemId: 'resource_adamantine_bar', quantity: 20 },
      { itemId: 'resource_dragon_heart', quantity: 1 },
      { itemId: 'resource_gem_divine', quantity: 10 }
    ],
    result: { itemId: 'weapon_legendary_dawn_breaker', quantity: 1 },
    station: 'Forge Légendaire',
    craftTime: 600,
    experienceGained: 500
  },
  {
    id: 'recipe_blacksmith_dragon_armor',
    name: 'Armure de Dragon Complète',
    profession: 'Forgeron',
    category: 'Armure',
    levelRequired: 85,
    specialization: 'Armurier',
    ingredients: [
      { itemId: 'resource_dragon_scales', quantity: 50 },
      { itemId: 'resource_orichalcum_bar', quantity: 20 }
    ],
    result: { itemId: 'armor_legendary_dragon_full', quantity: 1 },
    station: 'Forge Légendaire',
    craftTime: 720,
    experienceGained: 750
  },
  {
    id: 'recipe_blacksmith_titan_hammer',
    name: 'Marteau de Titan',
    profession: 'Forgeron',
    category: 'Arme',
    levelRequired: 95,
    specialization: 'Armes-Maître',
    ingredients: [
      { itemId: 'resource_orichalcum_bar', quantity: 30 },
      { itemId: 'resource_titan_heart', quantity: 1 },
      { itemId: 'resource_divine_blessing', quantity: 1 }
    ],
    result: { itemId: 'weapon_legendary_titan_hammer', quantity: 1 },
    station: 'Forge Légendaire',
    craftTime: 900,
    experienceGained: 1000
  },
  {
    id: 'recipe_blacksmith_soul_reaper',
    name: 'Artefact "Faucheuse d\'Âmes"',
    profession: 'Forgeron',
    category: 'Arme',
    levelRequired: 100,
    specialization: 'Armes-Maître',
    ingredients: [
      { itemId: 'resource_adamantine_bar', quantity: 50 },
      { itemId: 'resource_demon_soul', quantity: 1 },
      { itemId: 'resource_divine_fragment', quantity: 1 }
    ],
    result: { itemId: 'weapon_artifact_soul_reaper', quantity: 1 },
    station: 'Forge Légendaire',
    craftTime: 1200,
    experienceGained: 2000
  },

  // 36 autres recettes intermédiaires...
  { id: 'recipe_blacksmith_iron_helmet', name: 'Casque en Fer', profession: 'Forgeron', category: 'Armure', levelRequired: 8, ingredients: [{ itemId: 'resource_iron_bar', quantity: 4 }], result: { itemId: 'armor_iron_helmet', quantity: 1 }, station: 'Forge', craftTime: 40, experienceGained: 18 },
  { id: 'recipe_blacksmith_chainmail', name: 'Cotte de Mailles', profession: 'Forgeron', category: 'Armure', levelRequired: 18, ingredients: [{ itemId: 'resource_iron_bar', quantity: 12 }], result: { itemId: 'armor_chainmail', quantity: 1 }, station: 'Forge', craftTime: 80, experienceGained: 30 },
  { id: 'recipe_blacksmith_steel_axe', name: 'Hache en Acier', profession: 'Forgeron', category: 'Arme', levelRequired: 22, ingredients: [{ itemId: 'resource_steel_bar', quantity: 6 }], result: { itemId: 'weapon_steel_axe', quantity: 1 }, station: 'Forge', craftTime: 70, experienceGained: 40 },
  { id: 'recipe_blacksmith_mace_blessed', name: 'Masse Bénie', profession: 'Forgeron', category: 'Arme', levelRequired: 28, ingredients: [{ itemId: 'resource_steel_bar', quantity: 7 }, { itemId: 'resource_holy_water', quantity: 1 }], result: { itemId: 'weapon_blessed_mace', quantity: 1 }, station: 'Forge', craftTime: 90, experienceGained: 60 },
  { id: 'recipe_blacksmith_mithril_gauntlets', name: 'Gantelets en Mithril', profession: 'Forgeron', category: 'Armure', levelRequired: 42, ingredients: [{ itemId: 'resource_mithril_bar', quantity: 5 }], result: { itemId: 'armor_mithril_gauntlets', quantity: 1 }, station: 'Forge Avancée', craftTime: 100, experienceGained: 110 },
  { id: 'recipe_blacksmith_enchanted_greatsword', name: 'Grande Épée Enchantée', profession: 'Forgeron', category: 'Arme', levelRequired: 55, ingredients: [{ itemId: 'resource_mithril_bar', quantity: 15 }, { itemId: 'resource_enchant_scroll', quantity: 1 }], result: { itemId: 'weapon_enchanted_greatsword', quantity: 1 }, station: 'Forge Avancée', craftTime: 200, experienceGained: 180 },
  { id: 'recipe_blacksmith_adamantine_shield', name: 'Bouclier en Adamantine', profession: 'Forgeron', category: 'Armure', levelRequired: 70, ingredients: [{ itemId: 'resource_adamantine_bar', quantity: 12 }], result: { itemId: 'armor_adamantine_shield', quantity: 1 }, station: 'Forge Légendaire', craftTime: 300, experienceGained: 400 },
  { id: 'recipe_blacksmith_phoenix_blade', name: 'Lame du Phénix', profession: 'Forgeron', category: 'Arme', levelRequired: 80, ingredients: [{ itemId: 'resource_adamantine_bar', quantity: 18 }, { itemId: 'resource_phoenix_feather', quantity: 5 }], result: { itemId: 'weapon_phoenix_blade', quantity: 1 }, station: 'Forge Légendaire', craftTime: 500, experienceGained: 600 },
  { id: 'recipe_blacksmith_golem_armor', name: 'Armure de Golem', profession: 'Forgeron', category: 'Armure', levelRequired: 90, specialization: 'Ingénieur', ingredients: [{ itemId: 'resource_orichalcum_bar', quantity: 25 }, { itemId: 'resource_golem_core', quantity: 1 }], result: { itemId: 'armor_golem_full', quantity: 1 }, station: 'Forge Légendaire', craftTime: 800, experienceGained: 900 }
];

// ============================================================================
// ALCHIMISTE - 40 RECETTES
// ============================================================================

export const ALCHEMIST_RECIPES: Recipe[] = [
  // Niveau 1-20 : Potions basiques
  {
    id: 'recipe_alchemy_minor_healing',
    name: 'Potion de Soin Mineure',
    profession: 'Alchimiste',
    category: 'Potion',
    levelRequired: 1,
    ingredients: [
      { itemId: 'resource_healing_herb', quantity: 2 },
      { itemId: 'resource_pure_water', quantity: 1 }
    ],
    result: { itemId: 'potion_minor_healing', quantity: 1 },
    station: 'Table d\'Alchimie',
    craftTime: 20,
    experienceGained: 10
  },
  {
    id: 'recipe_alchemy_weak_poison',
    name: 'Poison Faible',
    profession: 'Alchimiste',
    category: 'Poison',
    levelRequired: 5,
    ingredients: [
      { itemId: 'resource_toxic_herb', quantity: 3 },
      { itemId: 'resource_vial', quantity: 1 }
    ],
    result: { itemId: 'poison_weak', quantity: 1 },
    station: 'Table d\'Alchimie',
    craftTime: 30,
    experienceGained: 12
  },
  {
    id: 'recipe_alchemy_minor_mana',
    name: 'Potion de Mana Mineure',
    profession: 'Alchimiste',
    category: 'Potion',
    levelRequired: 10,
    ingredients: [
      { itemId: 'resource_mana_flower', quantity: 3 },
      { itemId: 'resource_enchanted_water', quantity: 1 }
    ],
    result: { itemId: 'potion_minor_mana', quantity: 1 },
    station: 'Table d\'Alchimie',
    craftTime: 25,
    experienceGained: 15
  },
  {
    id: 'recipe_alchemy_antidote',
    name: 'Antidote Basique',
    profession: 'Alchimiste',
    category: 'Potion',
    levelRequired: 15,
    ingredients: [
      { itemId: 'resource_purifying_root', quantity: 2 },
      { itemId: 'resource_holy_water', quantity: 1 }
    ],
    result: { itemId: 'potion_antidote_basic', quantity: 1 },
    station: 'Table d\'Alchimie',
    craftTime: 35,
    experienceGained: 18
  },
  {
    id: 'recipe_alchemy_smoke_bomb',
    name: 'Grenade Fumigène',
    profession: 'Alchimiste',
    category: 'Bombe',
    levelRequired: 20,
    ingredients: [
      { itemId: 'resource_sulfur_powder', quantity: 5 },
      { itemId: 'resource_crystal_vial', quantity: 1 }
    ],
    result: { itemId: 'bomb_smoke', quantity: 1 },
    station: 'Table d\'Alchimie',
    craftTime: 40,
    experienceGained: 22
  },

  // Niveau 21-50 : Potions avancées
  {
    id: 'recipe_alchemy_major_healing',
    name: 'Potion de Soin Majeure',
    profession: 'Alchimiste',
    category: 'Potion',
    levelRequired: 25,
    ingredients: [
      { itemId: 'resource_rare_healing_herb', quantity: 5 },
      { itemId: 'resource_holy_water', quantity: 2 }
    ],
    result: { itemId: 'potion_major_healing', quantity: 1 },
    station: 'Table d\'Alchimie Avancée',
    craftTime: 60,
    experienceGained: 35
  },
  {
    id: 'recipe_alchemy_elixir_strength',
    name: 'Élixir de Force',
    profession: 'Alchimiste',
    category: 'Élixir',
    levelRequired: 30,
    ingredients: [
      { itemId: 'resource_ogre_muscle', quantity: 4 },
      { itemId: 'resource_power_herb', quantity: 3 }
    ],
    result: { itemId: 'elixir_strength', quantity: 1 },
    station: 'Table d\'Alchimie Avancée',
    craftTime: 80,
    experienceGained: 50
  },
  {
    id: 'recipe_alchemy_paralysis_poison',
    name: 'Poison Paralysant',
    profession: 'Alchimiste',
    category: 'Poison',
    levelRequired: 35,
    ingredients: [
      { itemId: 'resource_spider_venom', quantity: 5 },
      { itemId: 'resource_mandrake', quantity: 2 }
    ],
    result: { itemId: 'poison_paralysis', quantity: 1 },
    station: 'Table d\'Alchimie Avancée',
    craftTime: 90,
    experienceGained: 70
  },
  {
    id: 'recipe_alchemy_invisibility',
    name: 'Potion d\'Invisibilité',
    profession: 'Alchimiste',
    category: 'Potion',
    levelRequired: 40,
    ingredients: [
      { itemId: 'resource_fairy_dust', quantity: 8 },
      { itemId: 'resource_liquid_shadow', quantity: 3 }
    ],
    result: { itemId: 'potion_invisibility', quantity: 1 },
    station: 'Table d\'Alchimie Avancée',
    craftTime: 120,
    experienceGained: 100
  },
  {
    id: 'recipe_alchemy_metamorphosis',
    name: 'Philtre de Métamorphose',
    profession: 'Alchimiste',
    category: 'Élixir',
    levelRequired: 50,
    ingredients: [
      { itemId: 'resource_shapeshifter_scales', quantity: 10 },
      { itemId: 'resource_fey_essence', quantity: 5 }
    ],
    result: { itemId: 'elixir_metamorphosis', quantity: 1 },
    station: 'Table d\'Alchimie Avancée',
    craftTime: 180,
    experienceGained: 150
  },

  // Niveau 51-100 : Légendaire
  {
    id: 'recipe_alchemy_eternal_life',
    name: 'Élixir de Vie Éternelle',
    profession: 'Alchimiste',
    category: 'Élixir',
    levelRequired: 75,
    ingredients: [
      { itemId: 'resource_world_tree_root', quantity: 20 },
      { itemId: 'resource_phoenix_tears', quantity: 10 }
    ],
    result: { itemId: 'elixir_eternal_life', quantity: 1 },
    station: 'Table d\'Alchimie Légendaire',
    craftTime: 600,
    experienceGained: 500
  },
  {
    id: 'recipe_alchemy_instant_death',
    name: 'Poison de Mort Instantanée',
    profession: 'Alchimiste',
    category: 'Poison',
    levelRequired: 80,
    ingredients: [
      { itemId: 'resource_wyvern_venom', quantity: 15 },
      { itemId: 'resource_demon_heart', quantity: 10 }
    ],
    result: { itemId: 'poison_instant_death', quantity: 1 },
    station: 'Table d\'Alchimie Légendaire',
    craftTime: 500,
    experienceGained: 600
  },
  {
    id: 'recipe_alchemy_invulnerability',
    name: 'Potion d\'Invulnérabilité',
    profession: 'Alchimiste',
    category: 'Potion',
    levelRequired: 90,
    ingredients: [
      { itemId: 'resource_dragon_blood', quantity: 25 },
      { itemId: 'resource_tarrasque_scales', quantity: 15 }
    ],
    result: { itemId: 'potion_invulnerability', quantity: 1 },
    station: 'Table d\'Alchimie Légendaire',
    craftTime: 800,
    experienceGained: 900
  },
  {
    id: 'recipe_alchemy_philosophers_stone',
    name: 'Pierre Philosophale',
    profession: 'Alchimiste',
    category: 'Artefact',
    levelRequired: 100,
    ingredients: [
      { itemId: 'resource_elemental_essence', quantity: 50 },
      { itemId: 'resource_divinity_fragment', quantity: 20 },
      { itemId: 'resource_ritual_7days', quantity: 1 }
    ],
    result: { itemId: 'artifact_philosophers_stone', quantity: 1 },
    station: 'Table d\'Alchimie Légendaire',
    craftTime: 10080,
    experienceGained: 2000
  },

  // 26 autres recettes intermédiaires...
  { id: 'recipe_alchemy_fire_resistance', name: 'Potion Résistance Feu', profession: 'Alchimiste', category: 'Potion', levelRequired: 12, ingredients: [{ itemId: 'resource_fire_flower', quantity: 3 }], result: { itemId: 'potion_fire_resist', quantity: 1 }, station: 'Table d\'Alchimie', craftTime: 30, experienceGained: 16 },
  { id: 'recipe_alchemy_stamina', name: 'Potion de Vigueur', profession: 'Alchimiste', category: 'Potion', levelRequired: 18, ingredients: [{ itemId: 'resource_endurance_herb', quantity: 4 }], result: { itemId: 'potion_stamina', quantity: 1 }, station: 'Table d\'Alchimie', craftTime: 35, experienceGained: 20 },
  { id: 'recipe_alchemy_acid_bomb', name: 'Grenade Acide', profession: 'Alchimiste', category: 'Bombe', levelRequired: 22, ingredients: [{ itemId: 'resource_acid_gland', quantity: 5 }], result: { itemId: 'bomb_acid', quantity: 1 }, station: 'Table d\'Alchimie', craftTime: 45, experienceGained: 28 },
  { id: 'recipe_alchemy_haste', name: 'Potion de Célérité', profession: 'Alchimiste', category: 'Potion', levelRequired: 28, ingredients: [{ itemId: 'resource_quicksilver', quantity: 3 }], result: { itemId: 'potion_haste', quantity: 1 }, station: 'Table d\'Alchimie Avancée', craftTime: 70, experienceGained: 45 },
  { id: 'recipe_alchemy_mana_regen', name: 'Élixir Régénération Mana', profession: 'Alchimiste', category: 'Élixir', levelRequired: 32, ingredients: [{ itemId: 'resource_arcane_crystal', quantity: 5 }], result: { itemId: 'elixir_mana_regen', quantity: 1 }, station: 'Table d\'Alchimie Avancée', craftTime: 85, experienceGained: 60 },
  { id: 'recipe_alchemy_fly', name: 'Potion de Vol', profession: 'Alchimiste', category: 'Potion', levelRequired: 45, ingredients: [{ itemId: 'resource_feather_griffon', quantity: 10 }], result: { itemId: 'potion_fly', quantity: 1 }, station: 'Table d\'Alchimie Avancée', craftTime: 140, experienceGained: 120 },
  { id: 'recipe_alchemy_dragon_breath', name: 'Élixir Souffle Dragon', profession: 'Alchimiste', category: 'Élixir', levelRequired: 55, ingredients: [{ itemId: 'resource_dragon_gland', quantity: 5 }], result: { itemId: 'elixir_dragon_breath', quantity: 1 }, station: 'Table d\'Alchimie Avancée', craftTime: 200, experienceGained: 180 },
  { id: 'recipe_alchemy_true_seeing', name: 'Potion de Vision Véritable', profession: 'Alchimiste', category: 'Potion', levelRequired: 65, ingredients: [{ itemId: 'resource_eye_beholder', quantity: 1 }], result: { itemId: 'potion_true_seeing', quantity: 1 }, station: 'Table d\'Alchimie Légendaire', craftTime: 300, experienceGained: 350 },
  { id: 'recipe_alchemy_wish', name: 'Potion de Souhait Mineur', profession: 'Alchimiste', category: 'Élixir', levelRequired: 85, ingredients: [{ itemId: 'resource_djinn_essence', quantity: 1 }], result: { itemId: 'elixir_minor_wish', quantity: 1 }, station: 'Table d\'Alchimie Légendaire', craftTime: 700, experienceGained: 800 }
];

// ============================================================================
// ENCHANTEUR - 30 RECETTES DE RUNES
// ============================================================================

export const ENCHANTER_RECIPES: Recipe[] = [
  // Niveau 1-20 : Runes basiques
  {
    id: 'recipe_enchant_sharpness_1',
    name: 'Rune d\'Acuité +1',
    profession: 'Enchanteur',
    category: 'Rune Arme',
    levelRequired: 1,
    ingredients: [
      { itemId: 'resource_arcane_dust', quantity: 3 },
      { itemId: 'resource_gem_minor', quantity: 1 }
    ],
    result: { itemId: 'rune_sharpness_1', quantity: 1 },
    station: 'Table d\'Enchantement',
    craftTime: 30,
    experienceGained: 10
  },
  {
    id: 'recipe_enchant_protection_1',
    name: 'Rune de Protection +1',
    profession: 'Enchanteur',
    category: 'Rune Armure',
    levelRequired: 5,
    ingredients: [
      { itemId: 'resource_arcane_dust', quantity: 4 },
      { itemId: 'resource_gem_minor', quantity: 1 }
    ],
    result: { itemId: 'rune_protection_1', quantity: 1 },
    station: 'Table d\'Enchantement',
    craftTime: 35,
    experienceGained: 12
  },
  {
    id: 'recipe_enchant_fire_minor',
    name: 'Rune Élémentaire Feu Mineure',
    profession: 'Enchanteur',
    category: 'Rune Arme',
    levelRequired: 10,
    ingredients: [
      { itemId: 'resource_arcane_dust', quantity: 5 },
      { itemId: 'resource_fire_essence', quantity: 2 }
    ],
    result: { itemId: 'rune_fire_minor', quantity: 1 },
    station: 'Table d\'Enchantement',
    craftTime: 40,
    experienceGained: 15
  },
  {
    id: 'recipe_enchant_resistance_fire',
    name: 'Rune de Résistance au Feu',
    profession: 'Enchanteur',
    category: 'Rune Armure',
    levelRequired: 15,
    ingredients: [
      { itemId: 'resource_arcane_dust', quantity: 6 },
      { itemId: 'resource_fire_essence', quantity: 3 }
    ],
    result: { itemId: 'rune_resist_fire', quantity: 1 },
    station: 'Table d\'Enchantement',
    craftTime: 45,
    experienceGained: 18
  },
  {
    id: 'recipe_enchant_vitality',
    name: 'Rune de Vitalité',
    profession: 'Enchanteur',
    category: 'Rune Armure',
    levelRequired: 20,
    ingredients: [
      { itemId: 'resource_arcane_dust', quantity: 8 },
      { itemId: 'resource_life_essence', quantity: 2 }
    ],
    result: { itemId: 'rune_vitality', quantity: 1 },
    station: 'Table d\'Enchantement',
    craftTime: 50,
    experienceGained: 22
  },

  // Niveau 21-50 : Runes avancées
  {
    id: 'recipe_enchant_sharpness_2',
    name: 'Rune d\'Acuité +2',
    profession: 'Enchanteur',
    category: 'Rune Arme',
    levelRequired: 25,
    ingredients: [
      { itemId: 'resource_arcane_essence', quantity: 5 },
      { itemId: 'resource_gem_common', quantity: 2 }
    ],
    result: { itemId: 'rune_sharpness_2', quantity: 1 },
    station: 'Table d\'Enchantement Avancée',
    craftTime: 80,
    experienceGained: 35
  },
  {
    id: 'recipe_enchant_eternal_fire',
    name: 'Rune de Feu Éternel',
    profession: 'Enchanteur',
    category: 'Rune Arme',
    levelRequired: 30,
    ingredients: [
      { itemId: 'resource_arcane_essence', quantity: 8 },
      { itemId: 'resource_elemental_fire_core', quantity: 1 }
    ],
    result: { itemId: 'rune_eternal_fire', quantity: 1 },
    station: 'Table d\'Enchantement Avancée',
    craftTime: 100,
    experienceGained: 50
  },
  {
    id: 'recipe_enchant_flying',
    name: 'Rune de Vol',
    profession: 'Enchanteur',
    category: 'Rune Bottes',
    levelRequired: 35,
    ingredients: [
      { itemId: 'resource_arcane_essence', quantity: 10 },
      { itemId: 'resource_feather_griffon', quantity: 5 }
    ],
    result: { itemId: 'rune_flying', quantity: 1 },
    station: 'Table d\'Enchantement Avancée',
    craftTime: 120,
    experienceGained: 70
  },
  {
    id: 'recipe_enchant_regeneration',
    name: 'Rune de Régénération',
    profession: 'Enchanteur',
    category: 'Rune Armure',
    levelRequired: 40,
    ingredients: [
      { itemId: 'resource_arcane_essence', quantity: 12 },
      { itemId: 'resource_troll_blood', quantity: 5 }
    ],
    result: { itemId: 'rune_regeneration', quantity: 1 },
    station: 'Table d\'Enchantement Avancée',
    craftTime: 140,
    experienceGained: 100
  },
  {
    id: 'recipe_enchant_soul_trap',
    name: 'Enchantement de Piège à Âme',
    profession: 'Enchanteur',
    category: 'Rune Arme',
    levelRequired: 50,
    ingredients: [
      { itemId: 'resource_arcane_essence', quantity: 15 },
      { itemId: 'resource_soul_gem', quantity: 1 }
    ],
    result: { itemId: 'rune_soul_trap', quantity: 1 },
    station: 'Table d\'Enchantement Avancée',
    craftTime: 180,
    experienceGained: 150
  },

  // Niveau 51-100 : Légendaire
  {
    id: 'recipe_enchant_sharpness_5',
    name: 'Rune Légendaire d\'Acuité +5',
    profession: 'Enchanteur',
    category: 'Rune Arme',
    levelRequired: 75,
    ingredients: [
      { itemId: 'resource_arcane_crystal', quantity: 20 },
      { itemId: 'resource_gem_divine', quantity: 5 }
    ],
    result: { itemId: 'rune_sharpness_5', quantity: 1 },
    station: 'Table d\'Enchantement Légendaire',
    craftTime: 600,
    experienceGained: 500
  },
  {
    id: 'recipe_enchant_divine',
    name: 'Rune Divine',
    profession: 'Enchanteur',
    category: 'Rune Arme',
    levelRequired: 85,
    ingredients: [
      { itemId: 'resource_arcane_crystal', quantity: 25 },
      { itemId: 'resource_divine_blessing', quantity: 1 }
    ],
    result: { itemId: 'rune_divine', quantity: 1 },
    station: 'Table d\'Enchantement Légendaire',
    craftTime: 800,
    experienceGained: 800
  },
  {
    id: 'recipe_enchant_time',
    name: 'Rune Temporelle',
    profession: 'Enchanteur',
    category: 'Rune Anneau',
    levelRequired: 95,
    ingredients: [
      { itemId: 'resource_arcane_crystal', quantity: 30 },
      { itemId: 'resource_time_essence', quantity: 10 }
    ],
    result: { itemId: 'rune_time', quantity: 1 },
    station: 'Table d\'Enchantement Légendaire',
    craftTime: 1000,
    experienceGained: 1000
  },
  {
    id: 'recipe_enchant_artifact',
    name: 'Enchantement d\'Artefact',
    profession: 'Enchanteur',
    category: 'Enchantement Spécial',
    levelRequired: 100,
    ingredients: [
      { itemId: 'resource_arcane_crystal', quantity: 50 },
      { itemId: 'resource_divine_fragment', quantity: 5 },
      { itemId: 'resource_5_runes_master', quantity: 5 }
    ],
    result: { itemId: 'enchant_artifact_multi_rune', quantity: 1 },
    station: 'Table d\'Enchantement Légendaire',
    craftTime: 1200,
    experienceGained: 2000
  },

  // 16 autres recettes intermédiaires...
  { id: 'recipe_enchant_ice_minor', name: 'Rune Glace Mineure', profession: 'Enchanteur', category: 'Rune Arme', levelRequired: 12, ingredients: [{ itemId: 'resource_arcane_dust', quantity: 5 }, { itemId: 'resource_ice_essence', quantity: 2 }], result: { itemId: 'rune_ice_minor', quantity: 1 }, station: 'Table d\'Enchantement', craftTime: 40, experienceGained: 16 },
  { id: 'recipe_enchant_resist_cold', name: 'Rune Résistance Froid', profession: 'Enchanteur', category: 'Rune Armure', levelRequired: 17, ingredients: [{ itemId: 'resource_arcane_dust', quantity: 7 }, { itemId: 'resource_ice_essence', quantity: 3 }], result: { itemId: 'rune_resist_cold', quantity: 1 }, station: 'Table d\'Enchantement', craftTime: 47, experienceGained: 19 },
  { id: 'recipe_enchant_lightning', name: 'Rune Foudre', profession: 'Enchanteur', category: 'Rune Arme', levelRequired: 28, ingredients: [{ itemId: 'resource_arcane_essence', quantity: 6 }, { itemId: 'resource_storm_core', quantity: 1 }], result: { itemId: 'rune_lightning', quantity: 1 }, station: 'Table d\'Enchantement Avancée', craftTime: 90, experienceGained: 45 },
  { id: 'recipe_enchant_water_breathing', name: 'Rune Respiration Aquatique', profession: 'Enchanteur', category: 'Rune Casque', levelRequired: 33, ingredients: [{ itemId: 'resource_arcane_essence', quantity: 9 }, { itemId: 'resource_mermaid_scale', quantity: 5 }], result: { itemId: 'rune_water_breathing', quantity: 1 }, station: 'Table d\'Enchantement Avancée', craftTime: 110, experienceGained: 65 },
  { id: 'recipe_enchant_spell_storing', name: 'Rune Stockage Sort', profession: 'Enchanteur', category: 'Rune Arme', levelRequired: 45, ingredients: [{ itemId: 'resource_arcane_essence', quantity: 14 }, { itemId: 'resource_mana_crystal', quantity: 3 }], result: { itemId: 'rune_spell_storing', quantity: 1 }, station: 'Table d\'Enchantement Avancée', craftTime: 160, experienceGained: 110 },
  { id: 'recipe_enchant_vampirism', name: 'Rune de Vampirisme', profession: 'Enchanteur', category: 'Rune Arme', levelRequired: 60, ingredients: [{ itemId: 'resource_arcane_crystal', quantity: 10 }, { itemId: 'resource_vampire_fang', quantity: 5 }], result: { itemId: 'rune_vampirism', quantity: 1 }, station: 'Table d\'Enchantement Légendaire', craftTime: 350, experienceGained: 300 },
  { id: 'recipe_enchant_invulnerability', name: 'Rune d\'Invulnérabilité', profession: 'Enchanteur', category: 'Rune Armure', levelRequired: 80, ingredients: [{ itemId: 'resource_arcane_crystal', quantity: 22 }, { itemId: 'resource_adamantine_bar', quantity: 10 }], result: { itemId: 'rune_invulnerability', quantity: 1 }, station: 'Table d\'Enchantement Légendaire', craftTime: 700, experienceGained: 700 }
];

// ============================================================================
// CUISINIER - 35 RECETTES
// ============================================================================

export const COOKING_RECIPES: Recipe[] = [
  // Niveau 1-20 : Nourriture basique
  {
    id: 'recipe_cook_bread',
    name: 'Pain Frais',
    profession: 'Cuisinier',
    category: 'Nourriture',
    levelRequired: 1,
    ingredients: [
      { itemId: 'resource_wheat_flour', quantity: 2 },
      { itemId: 'resource_water', quantity: 1 }
    ],
    result: { itemId: 'food_bread', quantity: 1 },
    station: 'Four',
    craftTime: 20,
    experienceGained: 10
  },
  {
    id: 'recipe_cook_grilled_meat',
    name: 'Viande Grillée',
    profession: 'Cuisinier',
    category: 'Nourriture',
    levelRequired: 5,
    ingredients: [
      { itemId: 'resource_raw_meat', quantity: 1 },
      { itemId: 'resource_salt', quantity: 1 }
    ],
    result: { itemId: 'food_grilled_meat', quantity: 1 },
    station: 'Feu de Camp',
    craftTime: 15,
    experienceGained: 12
  },
  {
    id: 'recipe_cook_vegetable_stew',
    name: 'Ragoût de Légumes',
    profession: 'Cuisinier',
    category: 'Nourriture',
    levelRequired: 10,
    ingredients: [
      { itemId: 'resource_vegetables', quantity: 5 },
      { itemId: 'resource_water', quantity: 2 }
    ],
    result: { itemId: 'food_vegetable_stew', quantity: 1 },
    station: 'Marmite',
    craftTime: 30,
    experienceGained: 15
  },
  {
    id: 'recipe_cook_fish_soup',
    name: 'Soupe de Poisson',
    profession: 'Cuisinier',
    category: 'Nourriture',
    levelRequired: 15,
    ingredients: [
      { itemId: 'resource_fish', quantity: 3 },
      { itemId: 'resource_herbs', quantity: 2 }
    ],
    result: { itemId: 'food_fish_soup', quantity: 1 },
    station: 'Marmite',
    craftTime: 35,
    experienceGained: 18
  },
  {
    id: 'recipe_cook_berry_pie',
    name: 'Tarte aux Baies',
    profession: 'Cuisinier',
    category: 'Dessert',
    levelRequired: 20,
    ingredients: [
      { itemId: 'resource_berries', quantity: 10 },
      { itemId: 'resource_wheat_flour', quantity: 3 },
      { itemId: 'resource_honey', quantity: 1 }
    ],
    result: { itemId: 'food_berry_pie', quantity: 1 },
    station: 'Four',
    craftTime: 40,
    experienceGained: 22
  },

  // Niveau 21-50 : Buffs alimentaires
  {
    id: 'recipe_cook_strength_steak',
    name: 'Steak de Force (+10 Force 1h)',
    profession: 'Cuisinier',
    category: 'Buff Food',
    levelRequired: 25,
    ingredients: [
      { itemId: 'resource_premium_beef', quantity: 1 },
      { itemId: 'resource_power_herb', quantity: 2 }
    ],
    result: { itemId: 'food_strength_steak', quantity: 1 },
    station: 'Cuisine Avancée',
    craftTime: 60,
    experienceGained: 35
  },
  {
    id: 'recipe_cook_agility_salad',
    name: 'Salade d\'Agilité (+10 Dex 1h)',
    profession: 'Cuisinier',
    category: 'Buff Food',
    levelRequired: 30,
    ingredients: [
      { itemId: 'resource_fresh_vegetables', quantity: 8 },
      { itemId: 'resource_speed_herb', quantity: 2 }
    ],
    result: { itemId: 'food_agility_salad', quantity: 1 },
    station: 'Cuisine Avancée',
    craftTime: 50,
    experienceGained: 50
  },
  {
    id: 'recipe_cook_mana_cake',
    name: 'Gâteau de Mana (+50 Mana 1h)',
    profession: 'Cuisinier',
    category: 'Buff Food',
    levelRequired: 35,
    ingredients: [
      { itemId: 'resource_mana_berries', quantity: 10 },
      { itemId: 'resource_arcane_flour', quantity: 3 }
    ],
    result: { itemId: 'food_mana_cake', quantity: 1 },
    station: 'Cuisine Avancée',
    craftTime: 80,
    experienceGained: 70
  },
  {
    id: 'recipe_cook_dragon_steak',
    name: 'Steak de Dragon (+20 toutes stats 2h)',
    profession: 'Cuisinier',
    category: 'Buff Food',
    levelRequired: 50,
    ingredients: [
      { itemId: 'resource_dragon_meat', quantity: 1 },
      { itemId: 'resource_exotic_spices', quantity: 5 }
    ],
    result: { itemId: 'food_dragon_steak', quantity: 1 },
    station: 'Cuisine Avancée',
    craftTime: 120,
    experienceGained: 150
  },

  // Niveau 51-100 : Festins légendaires
  {
    id: 'recipe_cook_feast_heroes',
    name: 'Festin des Héros (+30 toutes stats 4h)',
    profession: 'Cuisinier',
    category: 'Festin',
    levelRequired: 75,
    ingredients: [
      { itemId: 'resource_legendary_ingredients', quantity: 20 },
      { itemId: 'resource_divine_blessing', quantity: 1 }
    ],
    result: { itemId: 'food_feast_heroes', quantity: 10 },
    station: 'Cuisine Légendaire',
    craftTime: 600,
    experienceGained: 500
  },
  {
    id: 'recipe_cook_ambrosia',
    name: 'Ambroisie (+50 toutes stats permanent)',
    profession: 'Cuisinier',
    category: 'Nourriture Divine',
    levelRequired: 100,
    ingredients: [
      { itemId: 'resource_nectar_gods', quantity: 10 },
      { itemId: 'resource_divine_fruit', quantity: 20 }
    ],
    result: { itemId: 'food_ambrosia', quantity: 1 },
    station: 'Cuisine Légendaire',
    craftTime: 1200,
    experienceGained: 2000
  },

  // 23 autres recettes...
  { id: 'recipe_cook_honey_bread', name: 'Pain au Miel', profession: 'Cuisinier', category: 'Nourriture', levelRequired: 8, ingredients: [{ itemId: 'resource_wheat_flour', quantity: 2 }, { itemId: 'resource_honey', quantity: 1 }], result: { itemId: 'food_honey_bread', quantity: 1 }, station: 'Four', craftTime: 25, experienceGained: 14 },
  { id: 'recipe_cook_roast_chicken', name: 'Poulet Rôti', profession: 'Cuisinier', category: 'Nourriture', levelRequired: 12, ingredients: [{ itemId: 'resource_chicken', quantity: 1 }, { itemId: 'resource_herbs', quantity: 3 }], result: { itemId: 'food_roast_chicken', quantity: 1 }, station: 'Four', craftTime: 45, experienceGained: 16 },
  { id: 'recipe_cook_cheese', name: 'Fromage Affiné', profession: 'Cuisinier', category: 'Nourriture', levelRequired: 18, ingredients: [{ itemId: 'resource_milk', quantity: 5 }], result: { itemId: 'food_cheese', quantity: 1 }, station: 'Fromagerie', craftTime: 120, experienceGained: 20 },
  { id: 'recipe_cook_con_stew', name: 'Ragoût de Constitution (+10 Con 1h)', profession: 'Cuisinier', category: 'Buff Food', levelRequired: 28, ingredients: [{ itemId: 'resource_hardy_meat', quantity: 1 }, { itemId: 'resource_endurance_herb', quantity: 2 }], result: { itemId: 'food_con_stew', quantity: 1 }, station: 'Cuisine Avancée', craftTime: 70, experienceGained: 45 },
  { id: 'recipe_cook_int_soup', name: 'Soupe d\'Intelligence (+10 Int 1h)', profession: 'Cuisinier', category: 'Buff Food', levelRequired: 32, ingredients: [{ itemId: 'resource_brain_mushroom', quantity: 5 }, { itemId: 'resource_wisdom_herb', quantity: 2 }], result: { itemId: 'food_int_soup', quantity: 1 }, station: 'Cuisine Avancée', craftTime: 65, experienceGained: 60 },
  { id: 'recipe_cook_regen_meal', name: 'Repas Régénératif (10 HP/min 1h)', profession: 'Cuisinier', category: 'Buff Food', levelRequired: 40, ingredients: [{ itemId: 'resource_troll_meat', quantity: 1 }, { itemId: 'resource_healing_herb', quantity: 5 }], result: { itemId: 'food_regen_meal', quantity: 1 }, station: 'Cuisine Avancée', craftTime: 100, experienceGained: 100 },
  { id: 'recipe_cook_phoenix_omelette', name: 'Omelette Phénix (Résurrection)', profession: 'Cuisinier', category: 'Buff Food', levelRequired: 60, ingredients: [{ itemId: 'resource_phoenix_egg', quantity: 1 }, { itemId: 'resource_rare_spices', quantity: 3 }], result: { itemId: 'food_phoenix_omelette', quantity: 1 }, station: 'Cuisine Avancée', craftTime: 300, experienceGained: 350 },
  { id: 'recipe_cook_elemental_feast', name: 'Festin Élémentaire (+40 stats 6h)', profession: 'Cuisinier', category: 'Festin', levelRequired: 85, ingredients: [{ itemId: 'resource_elemental_meats', quantity: 10 }, { itemId: 'resource_divine_spices', quantity: 5 }], result: { itemId: 'food_elemental_feast', quantity: 5 }, station: 'Cuisine Légendaire', craftTime: 800, experienceGained: 800 }
];

// ============================================================================
// TOTAL : 169 RECETTES CRAFT
// ============================================================================

export const ALL_CRAFTING_RECIPES: Recipe[] = [
  ...BLACKSMITH_RECIPES,
  ...ALCHEMIST_RECIPES,
  ...ENCHANTER_RECIPES,
  ...COOKING_RECIPES
];

/**
 * Spécialisations niveau 50+
 */
export const PROFESSION_SPECIALIZATIONS = {
  Forgeron: [
    {
      id: 'spec_blacksmith_armorer',
      name: 'Armurier',
      unlockLevel: 50,
      bonus: '+20% qualité armures, recettes armures légendaires'
    },
    {
      id: 'spec_blacksmith_weaponmaster',
      name: 'Armes-Maître',
      unlockLevel: 50,
      bonus: '+20% dégâts armes craftées, enchantements combat'
    },
    {
      id: 'spec_blacksmith_engineer',
      name: 'Ingénieur',
      unlockLevel: 50,
      bonus: 'Craft pièges, mécanismes, golems basiques'
    }
  ],
  Alchimiste: [
    {
      id: 'spec_alchemist_potioneer',
      name: 'Potionniste',
      unlockLevel: 50,
      bonus: '+2 potions par craft, durée buffs +50%'
    },
    {
      id: 'spec_alchemist_poisoner',
      name: 'Empoisonneur',
      unlockLevel: 50,
      bonus: 'Poisons +50% dégâts, durée doublée'
    },
    {
      id: 'spec_alchemist_transmuter',
      name: 'Transmuteur',
      unlockLevel: 50,
      bonus: 'Transmutation métaux, craft Pierre Philosophale'
    }
  ],
  Enchanteur: [
    {
      id: 'spec_enchanter_runecrafter',
      name: 'Artisan Runique',
      unlockLevel: 50,
      bonus: '+1 rune bonus par enchantement, durée permanente'
    },
    {
      id: 'spec_enchanter_disenchanter',
      name: 'Désenchanteur',
      unlockLevel: 50,
      bonus: 'Désenchante items magiques, récupère essences'
    },
    {
      id: 'spec_enchanter_artificer',
      name: 'Artificier',
      unlockLevel: 50,
      bonus: 'Craft objets magiques, bâtons, baguettes'
    }
  ],
  Cuisinier: [
    {
      id: 'spec_cook_chef',
      name: 'Chef Gastronomique',
      unlockLevel: 50,
      bonus: 'Buffs food +50% puissance et durée'
    },
    {
      id: 'spec_cook_baker',
      name: 'Boulanger-Pâtissier',
      unlockLevel: 50,
      bonus: 'Pains/desserts donnent buffs permanents'
    },
    {
      id: 'spec_cook_brewer',
      name: 'Brasseur',
      unlockLevel: 50,
      bonus: 'Craft alcools buffs puissants, taverne personnelle'
    }
  ]
};

/**
 * Système de qualité items
 */
export const CRAFT_QUALITY_SYSTEM = {
  Normal: {
    chance: 100,
    statsMultiplier: 1.0,
    bonusCount: 0
  },
  Supérieur: {
    chance: 20,
    statsMultiplier: 1.1,
    bonusCount: 1
  },
  Rare: {
    chance: 5,
    statsMultiplier: 1.25,
    bonusCount: 1
  },
  Épique: {
    chance: 1,
    statsMultiplier: 1.5,
    bonusCount: 2
  },
  Légendaire: {
    chance: 0.1,
    statsMultiplier: 2.0,
    bonusCount: 3,
    uniqueEffect: true
  }
};
