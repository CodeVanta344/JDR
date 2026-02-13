/**
 * SYSTÈME ÉCONOMIQUE AETHELGARD - Équilibrage Strict
 * 
 * PHILOSOPHIE:
 * - Les joueurs débutants sont PAUVRES (200-800 PO départ)
 * - Les équipements décents sont CHERS (progression lente)
 * - Niveaux requis pour équiper items puissants
 * - Quêtes et exploration nécessaires pour richesse
 */

// ============================================================================
// CONSTANTES ÉCONOMIQUES
// ============================================================================

export const ECONOMY_CONSTANTS = {
  // Or de départ (création personnage)
  STARTING_GOLD: {
    MIN: 200,
    MAX: 800,
    AVERAGE: 500
  },

  // Multiplicateurs de prix par rareté
  PRICE_MULTIPLIERS: {
    common: 1,
    uncommon: 5,
    rare: 25,
    epic: 125,
    legendary: 625,
    artifact: 3125
  },

  // Prix BASE par catégorie (en PO)
  BASE_PRICES: {
    // Armes
    weapon_dagger: 80,
    weapon_sword_short: 150,
    weapon_sword_long: 300,
    weapon_sword_great: 600,
    weapon_axe: 250,
    weapon_mace: 200,
    weapon_spear: 180,
    weapon_bow: 350,
    weapon_crossbow: 500,
    weapon_staff: 400,

    // Armures
    armor_cloth: 100,
    armor_leather: 300,
    armor_chainmail: 800,
    armor_plate: 2000,
    armor_shield_light: 200,
    armor_shield_heavy: 500,

    // Consommables
    potion_health_minor: 50,
    potion_health_major: 250,
    potion_mana_minor: 60,
    potion_mana_major: 300,
    food_basic: 5,
    food_quality: 25,
    scroll_spell_1: 100,
    scroll_spell_3: 500,
    scroll_spell_5: 2000,

    // Matériaux craft
    material_common: 10,
    material_uncommon: 50,
    material_rare: 250,
    material_epic: 1250
  },

  // Revenus moyens par niveau
  INCOME_PER_LEVEL: {
    1: 50,      // Quêtes triviales
    2: 100,
    3: 200,
    4: 400,
    5: 800,     // Quêtes majeures
    6: 1500,
    7: 2500,
    8: 4000,
    9: 6500,
    10: 10000   // Quêtes épiques
  },

  // Taxes marchands (markup sur prix de vente)
  MERCHANT_MARKUP: {
    city_major: 1.5,      // +50% en ville majeure
    city_minor: 1.8,      // +80% petite ville
    village: 2.2,         // +120% village
    dungeon_merchant: 3.0 // +200% marchand donjon (rare)
  }
};

// ============================================================================
// EXIGENCES D'ÉQUIPEMENT
// ============================================================================

export interface EquipmentRequirements {
  level: number;
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  class?: string[]; // Classes autorisées
}

export const LEVEL_REQUIREMENTS_BY_RARITY: Record<string, number> = {
  common: 1,
  uncommon: 3,
  rare: 6,
  epic: 10,
  legendary: 15,
  artifact: 20
};

// ============================================================================
// CATALOGUE ÉQUIPEMENTS ÉQUILIBRÉS
// ============================================================================

export interface BalancedItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'consumable' | 'material' | 'quest';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact';
  basePrice: number;
  requirements: EquipmentRequirements;
  stats: {
    damage?: string;
    armor?: number;
    attackBonus?: number;
    [key: string]: any;
  };
  description: string;
  lore?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// ARMES (PROGRESSION STRICTE)
// ═══════════════════════════════════════════════════════════════════════════

export const BALANCED_WEAPONS: BalancedItem[] = [
  // NIVEAU 1-2 (COMMUNE) - Armes de débutant
  {
    id: 'weapon:dagger:rusty',
    name: 'Dague Rouillée',
    type: 'weapon',
    rarity: 'common',
    basePrice: 50,
    requirements: { level: 1, strength: 5 },
    stats: { damage: '1d4', attackBonus: 0 },
    description: 'Lame ébréchée, à peine tranchante. Mieux que rien.'
  },
  {
    id: 'weapon:sword:short:basic',
    name: 'Épée Courte de Milicien',
    type: 'weapon',
    rarity: 'common',
    basePrice: 120,
    requirements: { level: 1, strength: 8 },
    stats: { damage: '1d6', attackBonus: 0 },
    description: 'Épée standard des gardes de ville. Fonctionnelle mais sans éclat.'
  },
  {
    id: 'weapon:mace:wooden',
    name: 'Gourdin Ferré',
    type: 'weapon',
    rarity: 'common',
    basePrice: 80,
    requirements: { level: 1, strength: 10 },
    stats: { damage: '1d6', attackBonus: 0 },
    description: 'Bâton de bois renforcé avec ferraille. Efficace contre crânes.'
  },

  // NIVEAU 3-5 (NON-COMMUNE) - Équipement décent
  {
    id: 'weapon:sword:long:quality',
    name: 'Épée Longue Forgée',
    type: 'weapon',
    rarity: 'uncommon',
    basePrice: 750,
    requirements: { level: 3, strength: 12 },
    stats: { damage: '1d8+1', attackBonus: 1 },
    description: 'Lame équilibrée, forgée par un artisan compétent. Tranchant fiable.'
  },
  {
    id: 'weapon:axe:battle',
    name: 'Hache de Bataille Naine',
    type: 'weapon',
    rarity: 'uncommon',
    basePrice: 900,
    requirements: { level: 4, strength: 14 },
    stats: { damage: '1d10+1', attackBonus: 0, critChance: 5 },
    description: 'Forgée dans les mines de Hammerdeep. Lourde mais dévastatrice.',
    lore: 'Les nains n\'offrent leurs haches qu\'aux guerriers dignes de confiance.'
  },
  {
    id: 'weapon:bow:composite',
    name: 'Arc Composite Elfique',
    type: 'weapon',
    rarity: 'uncommon',
    basePrice: 1200,
    requirements: { level: 4, dexterity: 14 },
    stats: { damage: '1d8+2', attackBonus: 1, range: 150 },
    description: 'Bois élastique de Sylmanir. Portée et précision supérieures.'
  },

  // NIVEAU 6-9 (RARE) - Armes puissantes
  {
    id: 'weapon:sword:enchanted:flame',
    name: 'Lame Enflammée',
    type: 'weapon',
    rarity: 'rare',
    basePrice: 6500,
    requirements: { level: 6, strength: 14 },
    stats: { damage: '1d10+3', attackBonus: 2, fireBonus: '1d6' },
    description: 'Épée enchantée par un mage de guerre. Lame crépite de flammes.',
    lore: 'Forgée durant la Guerre des Cendres. Chaque coup brûle la chair.'
  },
  {
    id: 'weapon:crossbow:heavy:precision',
    name: 'Arbalète Lourde de Précision',
    type: 'weapon',
    rarity: 'rare',
    basePrice: 7000,
    requirements: { level: 7, strength: 12, dexterity: 16 },
    stats: { damage: '2d8+2', attackBonus: 3, critChance: 10 },
    description: 'Mécanisme complexe, viseur magique. Perce armures lourdes.',
    lore: 'Chef-d\'œuvre des ingénieurs de la Guilde des Artificiers.'
  },
  {
    id: 'weapon:staff:arcane:mastery',
    name: 'Bâton de Maîtrise Arcanique',
    type: 'weapon',
    rarity: 'rare',
    basePrice: 8500,
    requirements: { level: 8, intelligence: 16 },
    stats: { damage: '1d6', attackBonus: 0, spellPower: 15, manaRegen: 5 },
    description: 'Bois ancien imprégné d\'énergie magique. Amplifie les sorts.',
    lore: 'Seuls les archimages confirment leur puissance avec un tel bâton.'
  },

  // NIVEAU 10-14 (ÉPIQUE) - Armes héroïques
  {
    id: 'weapon:sword:dragonbone',
    name: 'Épée en Os de Dragon',
    type: 'weapon',
    rarity: 'epic',
    basePrice: 35000,
    requirements: { level: 10, strength: 16 },
    stats: { damage: '2d8+5', attackBonus: 4, dragonSlayer: true },
    description: 'Forgée à partir d\'os de dragon ancien. Légère mais indestructible.',
    lore: 'Seul un héros ayant tué un dragon peut en posséder une. Le reste est illégal.'
  },
  {
    id: 'weapon:bow:starfall',
    name: 'Arc de Chute Stellaire',
    type: 'weapon',
    rarity: 'epic',
    basePrice: 42000,
    requirements: { level: 12, dexterity: 18 },
    stats: { damage: '2d10+4', attackBonus: 5, radiantBonus: '2d6', autoAim: true },
    description: 'Arc elfique légendaire. Flèches ne ratent jamais leur cible.',
    lore: 'Forgé sous les étoiles de Sylmanir. Un seul existe dans tout Aethelgard.'
  },

  // NIVEAU 15+ (LÉGENDAIRE) - Armes de légende
  {
    id: 'weapon:sword:solaris',
    name: 'Lame de l\'Aube (Solaris)',
    type: 'weapon',
    rarity: 'legendary',
    basePrice: 180000,
    requirements: { level: 15, strength: 18, charisma: 14 },
    stats: { damage: '3d8+8', attackBonus: 6, radiantBonus: '3d8', undeadBane: true },
    description: 'Épée sacrée de Sir Valerius. Brille d\'une lumière divine éternelle.',
    lore: 'Ne peut être maniée que par un cœur pur. Brûle les mains corrompues (4d6 radiant).'
  },
  {
    id: 'weapon:hammer:thundrak',
    name: 'Marteau de Thundrak',
    type: 'weapon',
    rarity: 'legendary',
    basePrice: 250000,
    requirements: { level: 18, strength: 20, class: ['Guerrier', 'Paladin', 'Forgeron'] },
    stats: { damage: '4d10+10', attackBonus: 7, lightningBonus: '4d6', forgeAnywhere: true },
    description: 'Marteau ancestral des nains. Forge le métal à volonté.',
    lore: 'Premier marteau forgé. Seuls les descendants de Thundrak peuvent le soulever.'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// ARMURES (PROGRESSION STRICTE)
// ═══════════════════════════════════════════════════════════════════════════

export const BALANCED_ARMORS: BalancedItem[] = [
  // NIVEAU 1-2 (COMMUNE)
  {
    id: 'armor:cloth:tattered',
    name: 'Robe de Tissu Rapiécée',
    type: 'armor',
    rarity: 'common',
    basePrice: 60,
    requirements: { level: 1 },
    stats: { armor: 1, weight: 2 },
    description: 'Tissu épais mais usé. Protection minimale.'
  },
  {
    id: 'armor:leather:basic',
    name: 'Armure de Cuir Basique',
    type: 'armor',
    rarity: 'common',
    basePrice: 200,
    requirements: { level: 1, dexterity: 10 },
    stats: { armor: 3, weight: 8 },
    description: 'Cuir tanné standard. Flexible et abordable.'
  },

  // NIVEAU 3-5 (NON-COMMUNE)
  {
    id: 'armor:chainmail:quality',
    name: 'Cotte de Mailles Forgée',
    type: 'armor',
    rarity: 'uncommon',
    basePrice: 1500,
    requirements: { level: 3, strength: 12 },
    stats: { armor: 6, weight: 20 },
    description: 'Mailles entrelacées avec soin. Protection solide contre lames.'
  },
  {
    id: 'armor:plate:partial',
    name: 'Harnois Partiel',
    type: 'armor',
    rarity: 'uncommon',
    basePrice: 3000,
    requirements: { level: 5, strength: 14, constitution: 12 },
    stats: { armor: 8, weight: 35 },
    description: 'Plastron, jambières et épaulières en acier. Lourd mais efficace.'
  },

  // NIVEAU 6-9 (RARE)
  {
    id: 'armor:plate:enchanted',
    name: 'Plate Enchantée du Gardien',
    type: 'armor',
    rarity: 'rare',
    basePrice: 12000,
    requirements: { level: 7, strength: 16, constitution: 14 },
    stats: { armor: 12, weight: 30, magicResist: 10 },
    description: 'Armure complète avec runes de protection. Résiste à la magie.',
    lore: 'Portée par les Chevaliers Jurés de la Couronne.'
  },

  // NIVEAU 10+ (ÉPIQUE/LÉGENDAIRE)
  {
    id: 'armor:plate:dragonscale',
    name: 'Armure d\'Écailles de Dragon',
    type: 'armor',
    rarity: 'epic',
    basePrice: 50000,
    requirements: { level: 10, strength: 16 },
    stats: { armor: 15, weight: 25, fireResist: 50, coldResist: 50 },
    description: 'Écailles de dragon assemblées. Légère et quasi-indestructible.',
    lore: 'Nécessite écailles d\'un dragon vaincu en combat honorable.'
  },
  {
    id: 'armor:plate:bastion',
    name: 'Bouclier du Bastion',
    type: 'armor',
    rarity: 'legendary',
    basePrice: 200000,
    requirements: { level: 15, strength: 18, constitution: 16 },
    stats: { armor: 20, weight: 15, reflectMagic: 50, indestructible: true },
    description: 'Bouclier légendaire. Réfléchit 50% magie reçue. Indestructible.',
    lore: 'Forgé avec fragment golem Ashkan. Protège contre dieux eux-mêmes.'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// CONSOMMABLES (PRIX ÉLEVÉS POUR ÉVITER SPAM)
// ═══════════════════════════════════════════════════════════════════════════

export const BALANCED_CONSUMABLES: BalancedItem[] = [
  // Potions santé
  {
    id: 'potion:health:minor',
    name: 'Petite Potion de Soin',
    type: 'consumable',
    rarity: 'common',
    basePrice: 50,
    requirements: { level: 1 },
    stats: { heal: '1d8+5' },
    description: 'Soigne 1d8+5 PV. Goût amer mais efficace.'
  },
  {
    id: 'potion:health:moderate',
    name: 'Potion de Soin Moyenne',
    type: 'consumable',
    rarity: 'uncommon',
    basePrice: 250,
    requirements: { level: 3 },
    stats: { heal: '3d8+15' },
    description: 'Soigne 3d8+15 PV. Qualité supérieure.'
  },
  {
    id: 'potion:health:major',
    name: 'Grande Potion de Soin',
    type: 'consumable',
    rarity: 'rare',
    basePrice: 1200,
    requirements: { level: 6 },
    stats: { heal: '6d8+30' },
    description: 'Soigne 6d8+30 PV. Recette alchimique complexe.'
  },
  {
    id: 'potion:health:supreme',
    name: 'Potion de Soin Suprême',
    type: 'consumable',
    rarity: 'epic',
    basePrice: 5000,
    requirements: { level: 10 },
    stats: { heal: '10d8+50' },
    description: 'Soigne 10d8+50 PV. Ingrédients rarissimes.'
  },

  // Potions mana
  {
    id: 'potion:mana:minor',
    name: 'Petite Potion de Mana',
    type: 'consumable',
    rarity: 'common',
    basePrice: 60,
    requirements: { level: 1 },
    stats: { manaRestore: 20 },
    description: 'Restaure 20 points de mana.'
  },
  {
    id: 'potion:mana:major',
    name: 'Grande Potion de Mana',
    type: 'consumable',
    rarity: 'rare',
    basePrice: 1500,
    requirements: { level: 6 },
    stats: { manaRestore: 100 },
    description: 'Restaure 100 points de mana.'
  },

  // Nourriture
  {
    id: 'food:bread',
    name: 'Pain Rassis',
    type: 'consumable',
    rarity: 'common',
    basePrice: 3,
    requirements: { level: 1 },
    stats: { heal: '1d4' },
    description: 'Pain dur. Rassasie mais sans plaisir.'
  },
  {
    id: 'food:meal:quality',
    name: 'Repas de Taverne',
    type: 'consumable',
    rarity: 'common',
    basePrice: 20,
    requirements: { level: 1 },
    stats: { heal: '2d6', buff: '+1 Constitution 1h' },
    description: 'Ragoût chaud, pain frais, bière. Restaure moral.'
  },
  {
    id: 'food:feast',
    name: 'Festin Royal',
    type: 'consumable',
    rarity: 'uncommon',
    basePrice: 150,
    requirements: { level: 3 },
    stats: { heal: '4d8', buff: '+2 tous attributs 3h' },
    description: 'Viandes rares, vins fins. Bonus prolongé.'
  }
];

// ============================================================================
// UTILITAIRES CALCUL PRIX
// ============================================================================

/**
 * Calcule le prix final avec markup marchand
 */
export function calculateMerchantPrice(
  basePrice: number,
  rarity: string,
  merchantType: keyof typeof ECONOMY_CONSTANTS.MERCHANT_MARKUP = 'city_major'
): number {
  const multiplier = ECONOMY_CONSTANTS.PRICE_MULTIPLIERS[rarity as keyof typeof ECONOMY_CONSTANTS.PRICE_MULTIPLIERS] || 1;
  const markup = ECONOMY_CONSTANTS.MERCHANT_MARKUP[merchantType];
  return Math.floor(basePrice * multiplier * markup);
}

/**
 * Vérifie si joueur peut équiper item
 */
export function canEquipItem(
  item: BalancedItem,
  playerLevel: number,
  playerStats: { [key: string]: number },
  playerClass?: string
): { canEquip: boolean; missingRequirements: string[] } {
  const missing: string[] = [];

  // Niveau
  if (playerLevel < item.requirements.level) {
    missing.push(`Niveau ${item.requirements.level} requis (vous: ${playerLevel})`);
  }

  // Stats
  const statReqs = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
  statReqs.forEach(stat => {
    const required = item.requirements[stat as keyof EquipmentRequirements] as number;
    if (required && (!playerStats[stat] || playerStats[stat] < required)) {
      missing.push(`${stat.charAt(0).toUpperCase() + stat.slice(1)} ${required} requis (vous: ${playerStats[stat] || 0})`);
    }
  });

  // Classe
  if (item.requirements.class && playerClass && !item.requirements.class.includes(playerClass)) {
    missing.push(`Classes autorisées: ${item.requirements.class.join(', ')}`);
  }

  return {
    canEquip: missing.length === 0,
    missingRequirements: missing
  };
}

/**
 * Estime or nécessaire pour atteindre niveau
 */
export function estimateGoldForLevel(targetLevel: number): number {
  let total = ECONOMY_CONSTANTS.STARTING_GOLD.AVERAGE;
  for (let lvl = 1; lvl < targetLevel; lvl++) {
    total += (ECONOMY_CONSTANTS.INCOME_PER_LEVEL[lvl as keyof typeof ECONOMY_CONSTANTS.INCOME_PER_LEVEL] || 0) * 2;
  }
  return total;
}
