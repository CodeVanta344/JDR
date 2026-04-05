/**
 * AETHELGARD CARD CATALOG — Slay the Spire style
 * Types: attack (red), skill (green), power (blue), curse (purple)
 */

export interface CardEffect {
  type: 'damage' | 'block' | 'heal' | 'draw' | 'energy' | 'poison' | 'weak' | 'vulnerable' | 'strength' | 'dexterity' | 'exhaust_card';
  value: number;
  target?: 'enemy' | 'self' | 'all_enemies' | 'random';
}

export interface Card {
  id: string;
  name: string;
  type: 'attack' | 'skill' | 'power' | 'curse';
  cost: number; // energy cost, -1 = unplayable
  rarity: 'starter' | 'common' | 'uncommon' | 'rare';
  description: string;
  effects: CardEffect[];
  diceRoll?: { die: 'd20' | 'd100'; multiplier?: number; bonus?: number }; // optional dice
  needsTarget?: boolean; // requires clicking an enemy
  exhaust?: boolean; // removed from deck after play
  tags?: string[]; // for class filtering
}

// ============================================================
// STARTER CARDS (every class gets these)
// ============================================================

export const CARD_FRAPPE: Card = {
  id: 'frappe',
  name: 'Frappe',
  type: 'attack',
  cost: 0, // Basic attack = free
  rarity: 'starter',
  description: 'Inflige 6 dégâts.',
  effects: [{ type: 'damage', value: 6, target: 'enemy' }],
  needsTarget: true,
  tags: ['basic'],
};

export const CARD_DEFENSE: Card = {
  id: 'defense',
  name: 'Défense',
  type: 'skill',
  cost: 0, // Basic defense = free
  rarity: 'starter',
  description: 'Gagne 5 de Blocage.',
  effects: [{ type: 'block', value: 5, target: 'self' }],
  tags: ['basic'],
};

// ============================================================
// CLASS-SPECIFIC STARTERS
// ============================================================

// --- GUERRIER ---
export const CARD_COUP_PUISSANT: Card = {
  id: 'coup_puissant',
  name: 'Coup Puissant',
  type: 'attack',
  cost: 2,
  rarity: 'starter',
  description: 'Inflige 12 dégâts.',
  effects: [{ type: 'damage', value: 12, target: 'enemy' }],
  needsTarget: true,
  tags: ['warrior'],
};

// --- MAGE ---
export const CARD_ECLAIR: Card = {
  id: 'eclair',
  name: 'Éclair',
  type: 'attack',
  cost: 1,
  rarity: 'starter',
  description: 'Inflige 8 dégâts.',
  effects: [{ type: 'damage', value: 8, target: 'enemy' }],
  needsTarget: true,
  tags: ['mage'],
};

export const CARD_BOUCLIER_ARCANE: Card = {
  id: 'bouclier_arcane',
  name: 'Bouclier Arcane',
  type: 'skill',
  cost: 1,
  rarity: 'starter',
  description: 'Gagne 8 de Blocage.',
  effects: [{ type: 'block', value: 8, target: 'self' }],
  tags: ['mage'],
};

// --- RODEUR ---
export const CARD_TIR_PRECIS: Card = {
  id: 'tir_precis',
  name: 'Tir Précis',
  type: 'attack',
  cost: 1,
  rarity: 'starter',
  description: 'Lance 1d20 dégâts.',
  effects: [{ type: 'damage', value: 0, target: 'enemy' }],
  diceRoll: { die: 'd20', multiplier: 1, bonus: 0 },
  needsTarget: true,
  tags: ['ranger'],
};

export const CARD_ESQUIVE: Card = {
  id: 'esquive',
  name: 'Esquive',
  type: 'skill',
  cost: 0,
  rarity: 'starter',
  description: 'Gagne 4 Blocage. Pioche 1 carte.',
  effects: [
    { type: 'block', value: 4, target: 'self' },
    { type: 'draw', value: 1 },
  ],
  tags: ['ranger'],
};

// --- CLERC ---
export const CARD_LUMIERE: Card = {
  id: 'lumiere',
  name: 'Lumière Sacrée',
  type: 'skill',
  cost: 1,
  rarity: 'starter',
  description: 'Restaure 6 PV.',
  effects: [{ type: 'heal', value: 6, target: 'self' }],
  tags: ['cleric'],
};

// ============================================================
// REWARD CARDS — COMMON
// ============================================================

export const CARD_CHARGE: Card = {
  id: 'charge',
  name: 'Charge',
  type: 'attack',
  cost: 1,
  rarity: 'common',
  description: 'Inflige 9 dégâts.',
  effects: [{ type: 'damage', value: 9, target: 'enemy' }],
  needsTarget: true,
};

export const CARD_RIPOSTE: Card = {
  id: 'riposte',
  name: 'Riposte',
  type: 'skill',
  cost: 1,
  rarity: 'common',
  description: 'Gagne 4 Blocage. Inflige 4 dégâts.',
  effects: [
    { type: 'block', value: 4, target: 'self' },
    { type: 'damage', value: 4, target: 'enemy' },
  ],
  needsTarget: true,
};

export const CARD_CONCENTRATION: Card = {
  id: 'concentration',
  name: 'Concentration',
  type: 'skill',
  cost: 0,
  rarity: 'common',
  description: 'Pioche 2 cartes.',
  effects: [{ type: 'draw', value: 2 }],
};

export const CARD_POISON_LAME: Card = {
  id: 'poison_lame',
  name: 'Lame Empoisonnée',
  type: 'attack',
  cost: 1,
  rarity: 'common',
  description: 'Inflige 4 dégâts. Applique 3 Poison.',
  effects: [
    { type: 'damage', value: 4, target: 'enemy' },
    { type: 'poison', value: 3, target: 'enemy' },
  ],
  needsTarget: true,
};

export const CARD_FORTIFICATION: Card = {
  id: 'fortification',
  name: 'Fortification',
  type: 'skill',
  cost: 2,
  rarity: 'common',
  description: 'Gagne 12 Blocage.',
  effects: [{ type: 'block', value: 12, target: 'self' }],
};

// ============================================================
// REWARD CARDS — UNCOMMON
// ============================================================

export const CARD_COUP_DESTIN: Card = {
  id: 'coup_destin',
  name: 'Coup du Destin',
  type: 'attack',
  cost: 2,
  rarity: 'uncommon',
  description: 'Lance 1d20 × 2 dégâts.',
  effects: [{ type: 'damage', value: 0, target: 'enemy' }],
  diceRoll: { die: 'd20', multiplier: 2, bonus: 0 },
  needsTarget: true,
};

export const CARD_TOURBILLON: Card = {
  id: 'tourbillon',
  name: 'Tourbillon',
  type: 'attack',
  cost: 2,
  rarity: 'uncommon',
  description: 'Inflige 8 dégâts à TOUS les ennemis.',
  effects: [{ type: 'damage', value: 8, target: 'all_enemies' }],
};

export const CARD_SECOND_SOUFFLE: Card = {
  id: 'second_souffle',
  name: 'Second Souffle',
  type: 'skill',
  cost: 1,
  rarity: 'uncommon',
  description: 'Restaure 8 PV. Gagne 4 Blocage.',
  effects: [
    { type: 'heal', value: 8, target: 'self' },
    { type: 'block', value: 4, target: 'self' },
  ],
};

export const CARD_AFFAIBLIR: Card = {
  id: 'affaiblir',
  name: 'Affaiblir',
  type: 'skill',
  cost: 1,
  rarity: 'uncommon',
  description: 'Applique 2 Faiblesse à un ennemi.',
  effects: [{ type: 'weak', value: 2, target: 'enemy' }],
  needsTarget: true,
};

export const CARD_VULNERABILITE: Card = {
  id: 'vulnerabilite',
  name: 'Point Faible',
  type: 'skill',
  cost: 1,
  rarity: 'uncommon',
  description: 'Applique 2 Vulnérabilité.',
  effects: [{ type: 'vulnerable', value: 2, target: 'enemy' }],
  needsTarget: true,
};

// ============================================================
// REWARD CARDS — RARE
// ============================================================

export const CARD_ROULETTE: Card = {
  id: 'roulette_arcane',
  name: 'Roulette Arcane',
  type: 'attack',
  cost: 2,
  rarity: 'rare',
  description: 'd100 < 50 : 8 dégâts. ≥ 50 : 20 dégâts + 4 Poison.',
  effects: [{ type: 'damage', value: 0, target: 'enemy' }],
  diceRoll: { die: 'd100', multiplier: 1, bonus: 0 },
  needsTarget: true,
};

export const CARD_RAGE: Card = {
  id: 'rage',
  name: 'Rage',
  type: 'power',
  cost: 1,
  rarity: 'rare',
  description: 'Gagne 2 Force (permanent).',
  effects: [{ type: 'strength', value: 2, target: 'self' }],
  exhaust: true,
};

export const CARD_AGILITE: Card = {
  id: 'agilite',
  name: 'Agilité',
  type: 'power',
  cost: 1,
  rarity: 'rare',
  description: 'Gagne 2 Dextérité (permanent).',
  effects: [{ type: 'dexterity', value: 2, target: 'self' }],
  exhaust: true,
};

export const CARD_EXECUTION: Card = {
  id: 'execution',
  name: 'Exécution',
  type: 'attack',
  cost: 2,
  rarity: 'rare',
  description: 'Inflige 15 dégâts. Si la cible meurt, gagne 1 énergie.',
  effects: [
    { type: 'damage', value: 15, target: 'enemy' },
    { type: 'energy', value: 1 },
  ],
  needsTarget: true,
};

export const CARD_MALEDICTION: Card = {
  id: 'malediction',
  name: 'Malédiction',
  type: 'curse',
  cost: -1,
  rarity: 'common',
  description: 'Injouable. Encombre votre main.',
  effects: [],
};

// ============================================================
// DECK BUILDERS
// ============================================================

export const ALL_REWARD_CARDS: Card[] = [
  CARD_CHARGE, CARD_RIPOSTE, CARD_CONCENTRATION, CARD_POISON_LAME, CARD_FORTIFICATION,
  CARD_COUP_DESTIN, CARD_TOURBILLON, CARD_SECOND_SOUFFLE, CARD_AFFAIBLIR, CARD_VULNERABILITE,
  CARD_ROULETTE, CARD_RAGE, CARD_AGILITE, CARD_EXECUTION,
];

// ============================================================
// AUTO-CONVERT ABILITY → CARD
// Maps any ability from classes.ts into a playable card
// ============================================================

function parseDice(dice: string): number {
  if (!dice) return 0;
  const match = dice.match(/(\d+)d(\d+)(?:\+(\d+))?/);
  if (!match) return 0;
  const [, count, sides, bonus] = match;
  return Math.floor(parseInt(count) * (parseInt(sides) + 1) / 2) + (parseInt(bonus) || 0);
}

export function abilityToCard(ability: any, index: number = 0): Card {
  const id = `ability_${(ability.name || 'unknown').toLowerCase().replace(/\s+/g, '_')}_${index}`;
  const isPassive = ability.actionType === 'Passif' || ability.type === 'Passif';
  const isHeal = !!(ability.heal || ability.target === 'ally' && ability.friendly);
  const isAoE = !!(ability.aoe);
  const hasDamage = !!(ability.dice || ability.damage_dice);
  const hasStatus = !!(ability.statusEffect);

  // Determine card type
  let type: Card['type'] = 'skill';
  if (isPassive && !hasDamage && !isHeal) type = 'power';
  else if (hasDamage && !isHeal) type = 'attack';
  else if (isHeal) type = 'skill';

  // Use the actual resource cost from the ability (Mana/Endurance/Arcane)
  let cost = ability.cost || 0;

  // Determine rarity from level
  let rarity: Card['rarity'] = 'common';
  if (ability.level >= 20) rarity = 'rare';
  else if (ability.level >= 8) rarity = 'uncommon';
  else if (ability.level >= 5) rarity = 'common';
  else rarity = 'starter';

  // Build effects
  const effects: CardEffect[] = [];

  if (hasDamage) {
    const dmg = parseDice(ability.damage_dice || ability.dice);
    const effectTarget = isAoE ? 'all_enemies' : 'enemy';
    effects.push({ type: 'damage', value: Math.max(4, dmg), target: effectTarget as any });
  }

  if (isHeal) {
    const healAmount = parseDice(ability.heal || ability.dice || '1d8');
    effects.push({ type: 'heal', value: Math.max(4, healAmount), target: 'self' });
  }

  if (hasStatus) {
    const st = ability.statusEffect;
    if (st.type === 'stunned' || st.type === 'prone') {
      effects.push({ type: 'weak', value: st.duration || 1, target: 'enemy' });
    } else if (st.type === 'poisoned') {
      effects.push({ type: 'poison', value: 3, target: 'enemy' });
    } else if (st.type === 'shielded') {
      effects.push({ type: 'block', value: 8, target: 'self' });
    } else if (st.type === 'strengthened') {
      effects.push({ type: 'strength', value: 1, target: 'self' });
    } else if (st.type === 'invisible') {
      effects.push({ type: 'block', value: 15, target: 'self' });
    } else if (st.type === 'charmed') {
      effects.push({ type: 'weak', value: 2, target: 'enemy' });
    }
  }

  // Passive powers: convert to meaningful permanent effects based on description
  if (type === 'power' && effects.length === 0) {
    const desc = (ability.desc || ability.description || '').toLowerCase();
    if (desc.includes('critique') || desc.includes('crit')) {
      effects.push({ type: 'strength', value: 3, target: 'self' });
    } else if (desc.includes('attaque supp') || desc.includes('deux fois')) {
      effects.push({ type: 'energy', value: 1 });
      effects.push({ type: 'draw', value: 1 });
    } else if (desc.includes('indomptable') || desc.includes('0 pv') || desc.includes('résilience')) {
      effects.push({ type: 'block', value: 20, target: 'self' });
    } else if (desc.includes('régénèr') || desc.includes('regen') || desc.includes('pv par tour')) {
      effects.push({ type: 'heal', value: 8, target: 'self' });
    } else if (desc.includes('immunité') || desc.includes('résistance') || desc.includes('immune')) {
      effects.push({ type: 'block', value: 15, target: 'self' });
    } else if (desc.includes('avantage') || desc.includes('bonus')) {
      effects.push({ type: 'strength', value: 2, target: 'self' });
    } else if (desc.includes('discrétion') || desc.includes('caché') || desc.includes('invisible')) {
      effects.push({ type: 'block', value: 12, target: 'self' });
      effects.push({ type: 'draw', value: 1 });
    } else if (desc.includes('terrain') || desc.includes('vitesse')) {
      effects.push({ type: 'dexterity', value: 2, target: 'self' });
    } else if (desc.includes('mana') || desc.includes('ressource')) {
      effects.push({ type: 'energy', value: 1 });
    } else {
      effects.push({ type: 'strength', value: 1, target: 'self' });
      effects.push({ type: 'dexterity', value: 1, target: 'self' });
    }
  }

  // If no effects generated, give a basic damage
  if (effects.length === 0) {
    effects.push({ type: 'damage', value: 6, target: 'enemy' });
  }

  // Dice roll for abilities with large dice
  let diceRoll: Card['diceRoll'] = undefined;
  if (ability.dice && parseDice(ability.dice) >= 15) {
    diceRoll = { die: 'd20', multiplier: 2, bonus: 0 };
  }

  return {
    id,
    name: ability.name,
    type,
    cost,
    rarity,
    description: ability.desc || ability.description || ability.name,
    effects,
    diceRoll,
    needsTarget: type === 'attack' && !isAoE,
    exhaust: type === 'power' || rarity === 'rare',
    tags: [],
  };
}

/**
 * Build a deck from class data, subclass feature, and player level.
 *
 * @param playerClass - class name (e.g. "Guerrier")
 * @param classData - full class object from classes.ts (initial_ability_options, unlockables, subclasses)
 * @param playerSubclass - subclass key (e.g. "berserker")
 * @param playerLevel - current player level
 * @param playerAbilities - player's resolved abilities array (fallback)
 */
export function getStarterDeck(
  playerClass: string,
  playerAbilities?: any[],
  playerLevel: number = 1,
  classData?: any,
  playerSubclass?: string
): Card[] {
  // Base cards: Frappe + Défense
  const frappes = Array(5).fill(null).map((_, i) => ({ ...CARD_FRAPPE, id: `frappe_${i}` }));
  const defenses = Array(3).fill(null).map((_, i) => ({ ...CARD_DEFENSE, id: `defense_${i}` }));
  const abilityCards: Card[] = [];

  // 1. ALL initial class abilities (level 1)
  if (classData?.initial_ability_options) {
    classData.initial_ability_options.forEach((ab: any, i: number) => {
      abilityCards.push(abilityToCard(ab, i));
    });
  }

  // 2. Subclass feature → unique card
  if (classData?.subclasses && playerSubclass) {
    const sub = classData.subclasses[playerSubclass];
    if (sub?.details?.feature) {
      const featureName = sub.label || playerSubclass;
      const featureDesc = sub.details.feature;
      // Create a power card from the subclass feature
      abilityCards.push({
        id: `subclass_${playerSubclass}`,
        name: featureName,
        type: 'power',
        cost: 1,
        rarity: 'uncommon',
        description: featureDesc.length > 80 ? featureDesc.slice(0, 77) + '...' : featureDesc,
        effects: [
          sub.details.style === 'Dégâts' ? { type: 'strength', value: 2, target: 'self' as const } :
          sub.details.style === 'Défenseur' ? { type: 'block', value: 15, target: 'self' as const } :
          sub.details.style === 'Soutien' ? { type: 'heal', value: 8, target: 'self' as const } :
          { type: 'strength', value: 1, target: 'self' as const }
        ],
        exhaust: true,
        tags: [playerSubclass],
      });
    }
  }

  // 3. ALL unlockable abilities filtered by level (including passives)
  if (classData?.unlockables) {
    const unlocked = classData.unlockables.filter((a: any) =>
      (a.level || 99) <= playerLevel
    );
    unlocked.forEach((ab: any, i: number) => {
      abilityCards.push(abilityToCard(ab, 100 + i));
    });
  }

  // 4. Fallback: use playerAbilities directly if no classData
  if (abilityCards.length === 0 && playerAbilities && playerAbilities.length > 0) {
    const unlocked = playerAbilities.filter((a: any) =>
      (a.level || 1) <= playerLevel
    );
    unlocked.forEach((ab: any, i: number) => {
      abilityCards.push(abilityToCard(ab, i));
    });
  }

  // 5. Last resort fallback: class-specific default cards
  if (abilityCards.length === 0) {
    const cls = (playerClass || '').toLowerCase();
    if (cls.includes('guerrier') || cls.includes('warrior') || cls.includes('paladin')) {
      abilityCards.push({ ...CARD_COUP_PUISSANT, id: 'coup_puissant_0' });
    } else if (cls.includes('mage') || cls.includes('sorcier')) {
      abilityCards.push({ ...CARD_ECLAIR, id: 'eclair_0' }, { ...CARD_BOUCLIER_ARCANE, id: 'bouclier_0' });
    } else if (cls.includes('rôdeur') || cls.includes('rodeur') || cls.includes('ranger')) {
      abilityCards.push({ ...CARD_TIR_PRECIS, id: 'tir_precis_0' }, { ...CARD_ESQUIVE, id: 'esquive_0' });
    } else if (cls.includes('clerc') || cls.includes('cleric')) {
      abilityCards.push({ ...CARD_LUMIERE, id: 'lumiere_0' });
    } else if (cls.includes('voleur') || cls.includes('rogue')) {
      abilityCards.push({ ...CARD_POISON_LAME, id: 'poison_0' });
    } else if (cls.includes('barde') || cls.includes('bard')) {
      abilityCards.push({ ...CARD_LUMIERE, id: 'heal_barde_0' }, { ...CARD_AFFAIBLIR, id: 'mock_0' });
    } else if (cls.includes('druide') || cls.includes('druid')) {
      abilityCards.push({ ...CARD_LUMIERE, id: 'heal_druide_0' });
    } else {
      abilityCards.push({ ...CARD_COUP_PUISSANT, id: 'default_0' });
    }
  }

  return [...frappes, ...defenses, ...abilityCards];
}

export function getRewardCards(count: number = 3): Card[] {
  const shuffled = [...ALL_REWARD_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((c, i) => ({ ...c, id: `reward_${c.id}_${Date.now()}_${i}` }));
}

// ============================================================
// ITEM → CARD CONVERSION (potions, scrolls, food, bombs)
// Items consume a full turn when used in combat
// ============================================================

const ITEM_ICONS: Record<string, string> = {
  potion: '🧪', scroll: '📜', food: '🍖', bomb: '💣',
  consumable: '🧪', weapon: '🗡️', armor: '🛡️', default: '📦',
};

const RARITY_COLORS: Record<string, string> = {
  common: '#888888', uncommon: '#4cd137', rare: '#54a0ff',
  epic: '#9b59b6', legendary: '#f39c12', artifact: '#e74c3c',
};

export function itemToCard(item: any, index: number = 0): Card | null {
  // Only convert usable/consumable items
  const type = (item.type || '').toLowerCase();
  const isConsumable = ['potion', 'scroll', 'food', 'bomb', 'consumable'].includes(type);
  const hasEffect = item.stats?.heal || item.stats?.resource || item.stats?.damage ||
    item.effects?.length > 0;

  if (!isConsumable && !hasEffect) return null;

  const effects: CardEffect[] = [];

  // Parse item effects
  if (item.stats?.heal) {
    effects.push({ type: 'heal', value: item.stats.heal, target: 'self' });
  }
  if (item.stats?.resource) {
    effects.push({ type: 'energy', value: item.stats.resource });
  }
  if (item.stats?.damage) {
    const dmg = typeof item.stats.damage === 'string' ? parseDice(item.stats.damage) : item.stats.damage;
    effects.push({ type: 'damage', value: dmg || 5, target: 'enemy' });
  }
  if (item.stats?.hp) {
    effects.push({ type: 'heal', value: item.stats.hp, target: 'self' });
  }

  // Parse item.effects array
  if (item.effects) {
    for (const eff of item.effects) {
      if (eff.type === 'heal') effects.push({ type: 'heal', value: eff.magnitude || 10, target: 'self' });
      if (eff.type === 'damage') effects.push({ type: 'damage', value: eff.magnitude || 8, target: 'enemy' });
      if (eff.type === 'buff') effects.push({ type: 'strength', value: eff.magnitude || 2, target: 'self' });
    }
  }

  if (effects.length === 0) {
    effects.push({ type: 'heal', value: 10, target: 'self' }); // fallback
  }

  const icon = ITEM_ICONS[type] || ITEM_ICONS.default;
  const hasDamageEffect = effects.some(e => e.type === 'damage');

  return {
    id: `item_${(item.name || 'item').toLowerCase().replace(/\s+/g, '_')}_${index}`,
    name: item.name || 'Objet',
    type: hasDamageEffect ? 'attack' : 'skill',
    cost: 0, // Items are free to use but consume the turn
    rarity: (item.rarity as any) || 'common',
    description: item.description || item.name || 'Utilise cet objet.',
    effects,
    needsTarget: hasDamageEffect,
    exhaust: true, // Items are consumed after use
    tags: ['item', type, icon],
    isItem: true, // Flag to identify item cards
    itemIcon: icon,
    itemRarityColor: RARITY_COLORS[item.rarity || 'common'] || '#888',
  } as Card & { isItem?: boolean; itemIcon?: string; itemRarityColor?: string };
}

export function inventoryToCards(inventory: any[]): Card[] {
  if (!inventory || !Array.isArray(inventory)) return [];

  const cards: Card[] = [];
  inventory.forEach((item, i) => {
    const card = itemToCard(item, i);
    if (card) cards.push(card);
  });
  return cards;
}
