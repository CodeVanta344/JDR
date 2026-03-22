// ═══════════════════════════════════════════════════════════════════════
// LOOT TABLES - Deterministic loot generation by enemy Challenge Rating
// ═══════════════════════════════════════════════════════════════════════

export interface LootItem {
  itemId: string;
  name: string;
  chance: number; // 0-100 percentage
  quantity?: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface LootDrop {
  gold: { min: number; max: number };
  items: LootItem[];
}

export interface GeneratedLoot {
  gold: number;
  items: Array<{
    itemId: string;
    name: string;
    quantity: number;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  }>;
}

// ─── Loot Tables by CR Range ────────────────────────────────────────────────

const LOOT_TABLES: Record<string, LootDrop> = {
  // CR 1-2: Basic supplies, common gear
  'cr_1_2': {
    gold: { min: 5, max: 15 },
    items: [
      { itemId: 'potion_healing_minor', name: 'Potion de soin mineure', chance: 40, rarity: 'common' },
      { itemId: 'bandage', name: 'Bandages', chance: 50, quantity: 2, rarity: 'common' },
      { itemId: 'rations', name: 'Rations de voyage', chance: 45, quantity: 3, rarity: 'common' },
      { itemId: 'potion_antidote', name: 'Antidote', chance: 20, rarity: 'common' },
      { itemId: 'torch', name: 'Torche', chance: 35, quantity: 2, rarity: 'common' },
      { itemId: 'herb_common', name: 'Herbes communes', chance: 30, quantity: 2, rarity: 'common' },
      // Rare drops (30% bracket)
      { itemId: 'dagger_iron', name: 'Dague en fer', chance: 15, rarity: 'uncommon' },
      { itemId: 'scroll_identify', name: 'Parchemin d\'Identification', chance: 10, rarity: 'rare' },
      { itemId: 'gem_quartz', name: 'Quartz brut', chance: 8, rarity: 'rare' },
    ]
  },

  // CR 3-5: Better equipment, uncommon materials
  'cr_3_5': {
    gold: { min: 15, max: 40 },
    items: [
      { itemId: 'potion_healing', name: 'Potion de soin', chance: 45, rarity: 'common' },
      { itemId: 'potion_mana_minor', name: 'Potion de mana mineure', chance: 30, rarity: 'common' },
      { itemId: 'sword_iron', name: 'Epee en fer', chance: 20, rarity: 'uncommon' },
      { itemId: 'axe_iron', name: 'Hache en fer', chance: 18, rarity: 'uncommon' },
      { itemId: 'bow_short', name: 'Arc court', chance: 15, rarity: 'uncommon' },
      { itemId: 'leather_armor', name: 'Armure de cuir', chance: 15, rarity: 'uncommon' },
      { itemId: 'shield_wooden', name: 'Bouclier en bois', chance: 12, rarity: 'uncommon' },
      { itemId: 'crafting_leather', name: 'Cuir de qualite', chance: 25, quantity: 2, rarity: 'uncommon' },
      { itemId: 'crafting_iron_ingot', name: 'Lingot de fer', chance: 20, rarity: 'uncommon' },
      // Rare drops (20% bracket)
      { itemId: 'scroll_fireball', name: 'Parchemin de Boule de feu', chance: 8, rarity: 'rare' },
      { itemId: 'gem_amethyst', name: 'Amethyste', chance: 10, rarity: 'rare' },
      { itemId: 'ring_minor_protection', name: 'Anneau de protection mineure', chance: 5, rarity: 'rare' },
    ]
  },

  // CR 6-8: Uncommon/rare gear, crafting materials
  'cr_6_8': {
    gold: { min: 40, max: 80 },
    items: [
      { itemId: 'potion_healing_greater', name: 'Potion de soin superieure', chance: 40, rarity: 'uncommon' },
      { itemId: 'potion_mana', name: 'Potion de mana', chance: 35, rarity: 'uncommon' },
      { itemId: 'potion_antidote_greater', name: 'Antidote superieur', chance: 20, rarity: 'uncommon' },
      { itemId: 'sword_steel', name: 'Epee en acier', chance: 18, rarity: 'uncommon' },
      { itemId: 'axe_steel', name: 'Hache en acier', chance: 15, rarity: 'uncommon' },
      { itemId: 'bow_long', name: 'Arc long', chance: 12, rarity: 'uncommon' },
      { itemId: 'chainmail', name: 'Cotte de mailles', chance: 12, rarity: 'uncommon' },
      { itemId: 'crafting_steel_ingot', name: 'Lingot d\'acier', chance: 22, quantity: 2, rarity: 'uncommon' },
      { itemId: 'crafting_enchanted_dust', name: 'Poudre enchantee', chance: 15, rarity: 'rare' },
      // Rare drops
      { itemId: 'sword_enchanted', name: 'Lame enchantee', chance: 8, rarity: 'rare' },
      { itemId: 'scroll_teleport', name: 'Parchemin de Teleportation', chance: 6, rarity: 'rare' },
      { itemId: 'gem_sapphire', name: 'Saphir', chance: 10, rarity: 'rare' },
      { itemId: 'key_dungeon', name: 'Cle ancienne', chance: 5, rarity: 'rare' },
      // Epic drops (15% bracket)
      { itemId: 'armor_mithril_piece', name: 'Fragment d\'armure en mithril', chance: 5, rarity: 'epic' },
      { itemId: 'scroll_resurrection', name: 'Parchemin de Resurrection', chance: 3, rarity: 'epic' },
    ]
  },

  // CR 9-12: Rare items, strong equipment
  'cr_9_12': {
    gold: { min: 80, max: 150 },
    items: [
      { itemId: 'potion_healing_supreme', name: 'Potion de soin supreme', chance: 40, rarity: 'uncommon' },
      { itemId: 'potion_mana_greater', name: 'Potion de mana superieure', chance: 35, rarity: 'uncommon' },
      { itemId: 'elixir_strength', name: 'Elixir de force', chance: 15, rarity: 'rare' },
      { itemId: 'sword_mithril', name: 'Epee en mithril', chance: 12, rarity: 'rare' },
      { itemId: 'bow_composite', name: 'Arc composite', chance: 10, rarity: 'rare' },
      { itemId: 'plate_armor', name: 'Armure de plates', chance: 10, rarity: 'rare' },
      { itemId: 'shield_steel', name: 'Bouclier en acier renforce', chance: 12, rarity: 'rare' },
      { itemId: 'crafting_mithril_ingot', name: 'Lingot de mithril', chance: 15, rarity: 'rare' },
      { itemId: 'crafting_dragon_scale', name: 'Ecaille de dragon', chance: 8, rarity: 'rare' },
      { itemId: 'gem_ruby', name: 'Rubis', chance: 12, rarity: 'rare' },
      { itemId: 'scroll_greater_ward', name: 'Parchemin de Protection majeure', chance: 8, rarity: 'rare' },
      // Epic drops (10% bracket)
      { itemId: 'sword_dragonbane', name: 'Lame tueuse de dragons', chance: 4, rarity: 'epic' },
      { itemId: 'amulet_arcane', name: 'Amulette arcanique', chance: 5, rarity: 'epic' },
      { itemId: 'gem_diamond', name: 'Diamant', chance: 6, rarity: 'epic' },
    ]
  },

  // CR 13-16: Rare/epic gear, legendary chance
  'cr_13_16': {
    gold: { min: 150, max: 300 },
    items: [
      { itemId: 'potion_healing_divine', name: 'Potion de soin divine', chance: 35, rarity: 'rare' },
      { itemId: 'potion_mana_supreme', name: 'Potion de mana supreme', chance: 30, rarity: 'rare' },
      { itemId: 'elixir_vitality', name: 'Elixir de vitalite', chance: 20, rarity: 'rare' },
      { itemId: 'sword_adamantine', name: 'Epee en adamantine', chance: 12, rarity: 'rare' },
      { itemId: 'bow_elven', name: 'Arc elfique', chance: 10, rarity: 'rare' },
      { itemId: 'armor_dragonscale', name: 'Armure en ecailles de dragon', chance: 8, rarity: 'epic' },
      { itemId: 'shield_enchanted', name: 'Bouclier enchante', chance: 10, rarity: 'epic' },
      { itemId: 'crafting_adamantine_ingot', name: 'Lingot d\'adamantine', chance: 12, rarity: 'epic' },
      { itemId: 'crafting_phoenix_feather', name: 'Plume de phenix', chance: 6, rarity: 'epic' },
      { itemId: 'scroll_mass_heal', name: 'Parchemin de Soin de masse', chance: 8, rarity: 'epic' },
      { itemId: 'gem_star_sapphire', name: 'Saphir etoile', chance: 8, rarity: 'epic' },
      // Legendary drops (5% bracket)
      { itemId: 'ring_elemental_mastery', name: 'Anneau de maitrise elementaire', chance: 2, rarity: 'legendary' },
      { itemId: 'scroll_wish', name: 'Parchemin de Souhait', chance: 1, rarity: 'legendary' },
      { itemId: 'gem_prismatic', name: 'Gemme prismatique', chance: 3, rarity: 'legendary' },
    ]
  },

  // CR 17-20: Epic items, higher legendary chance
  'cr_17_20': {
    gold: { min: 300, max: 500 },
    items: [
      { itemId: 'potion_immortality', name: 'Elixir d\'immortalite temporaire', chance: 25, rarity: 'epic' },
      { itemId: 'potion_mana_divine', name: 'Potion de mana divine', chance: 30, rarity: 'epic' },
      { itemId: 'elixir_godblood', name: 'Elixir de sang divin', chance: 15, rarity: 'epic' },
      { itemId: 'sword_celestial', name: 'Lame celeste', chance: 12, rarity: 'epic' },
      { itemId: 'bow_astral', name: 'Arc astral', chance: 10, rarity: 'epic' },
      { itemId: 'armor_celestial', name: 'Armure celeste', chance: 8, rarity: 'epic' },
      { itemId: 'shield_divine', name: 'Bouclier divin', chance: 10, rarity: 'epic' },
      { itemId: 'crafting_celestial_essence', name: 'Essence celeste', chance: 12, rarity: 'epic' },
      { itemId: 'crafting_void_crystal', name: 'Cristal du vide', chance: 8, rarity: 'epic' },
      { itemId: 'scroll_divine_intervention', name: 'Parchemin d\'Intervention divine', chance: 6, rarity: 'epic' },
      { itemId: 'gem_void_diamond', name: 'Diamant du vide', chance: 8, rarity: 'epic' },
      // Legendary drops (10% bracket)
      { itemId: 'crown_ancient_king', name: 'Couronne du roi ancien', chance: 3, rarity: 'legendary' },
      { itemId: 'blade_sealed_ones', name: 'Lame des Scelles', chance: 2, rarity: 'legendary' },
      { itemId: 'amulet_world_tree', name: 'Amulette de l\'Arbre-Monde', chance: 3, rarity: 'legendary' },
      { itemId: 'gem_soul', name: 'Gemme d\'ame', chance: 4, rarity: 'legendary' },
      { itemId: 'key_sealed_gate', name: 'Cle du Portail Scelle', chance: 2, rarity: 'legendary' },
    ]
  },
};

// ─── CR to Table Key Mapping ────────────────────────────────────────────────

function getCRTableKey(cr: number): string {
  if (cr <= 2) return 'cr_1_2';
  if (cr <= 5) return 'cr_3_5';
  if (cr <= 8) return 'cr_6_8';
  if (cr <= 12) return 'cr_9_12';
  if (cr <= 16) return 'cr_13_16';
  return 'cr_17_20';
}

// ─── Random Helpers ─────────────────────────────────────────────────────────

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollChance(percent: number): boolean {
  return Math.random() * 100 < percent;
}

// ─── Main Loot Generation Function ──────────────────────────────────────────

export function generateLoot(
  enemies: Array<{ cr: number; name: string }>
): GeneratedLoot {
  let totalGold = 0;
  const droppedItems: Map<string, { itemId: string; name: string; quantity: number; rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' }> = new Map();

  for (const enemy of enemies) {
    const tableKey = getCRTableKey(enemy.cr || 1);
    const table = LOOT_TABLES[tableKey];
    if (!table) continue;

    // Roll gold for this enemy
    totalGold += randomInt(table.gold.min, table.gold.max);

    // Roll for each item drop
    for (const item of table.items) {
      if (rollChance(item.chance)) {
        const qty = item.quantity || 1;
        const existing = droppedItems.get(item.itemId);
        if (existing) {
          existing.quantity += qty;
        } else {
          droppedItems.set(item.itemId, {
            itemId: item.itemId,
            name: item.name,
            quantity: qty,
            rarity: item.rarity,
          });
        }
      }
    }
  }

  return {
    gold: totalGold,
    items: Array.from(droppedItems.values()),
  };
}

// ─── XP Calculation ─────────────────────────────────────────────────────────

export function calculateCombatXP(enemies: Array<{ cr: number }>): number {
  return enemies.reduce((sum, e) => sum + (e.cr || 1) * 50, 0);
}

export { LOOT_TABLES };
