/**
 * STAT RESOLVER - Aethelgard d100
 * Donne un impact gameplay à CHAQUE stat (STR, DEX, CON, INT, WIS, CHA)
 */

import { getModifier } from '../lore/rules';
import type { Combatant } from './types';

// Re-export getModifier for convenience (used by other engine modules)
export { getModifier };

// ============================================================
// STAT IMPACTS
// ============================================================

/**
 * STR - Force
 * - Melee attack modifier
 * - Melee damage modifier
 * - Grapple DC = 30 + STR modifier
 * - Carrying capacity = STR * 15
 */
export function getStrengthImpact(combatant: Combatant) {
  const mod = getModifier(combatant.str || 10);
  return {
    meleeAttackBonus: mod,
    meleeDamageBonus: mod,
    grappleDC: 30 + mod,
    carryingCapacity: (combatant.str || 10) * 15,
  };
}

/**
 * DEX - Dextérité
 * - AC bonus (already in calculateAC)
 * - Initiative bonus
 * - Ranged attack modifier
 * - Dodge chance = DEX mod * 2%
 */
export function getDexterityImpact(combatant: Combatant) {
  const mod = getModifier(combatant.dex || 10);
  return {
    acBonus: mod,
    initiativeBonus: mod,
    rangedAttackBonus: mod,
    dodgeChance: Math.max(0, mod * 2), // % chance to dodge
  };
}

/**
 * CON - Constitution
 * - HP bonus (already in character creation)
 * - Concentration save bonus
 * - Poison resistance bonus
 * - Stamina (movement points bonus)
 */
export function getConstitutionImpact(combatant: Combatant) {
  const mod = getModifier(combatant.con || 10);
  return {
    hpBonus: mod * 2, // Per level
    poisonResistBonus: mod,
    staminaBonus: Math.max(0, Math.floor(mod / 3)), // Extra PM
  };
}

/**
 * INT - Intelligence
 * - Spell damage modifier (arcane casters)
 * - Mana pool scaling
 * - Identify items DC bonus
 * - Crafting success bonus
 */
export function getIntelligenceImpact(combatant: Combatant) {
  const mod = getModifier(combatant.int || 10);
  return {
    spellDamageBonus: mod,
    manaScaling: mod * 3, // Extra mana
    identifyBonus: mod,
    craftingBonus: mod * 3, // % bonus to crafting success
  };
}

/**
 * WIS - Sagesse
 * - Healing bonus (divine/natural healing)
 * - Insight: voir à travers la déception
 * - Clerc/Druide resource stat
 * - Divine magic scaling
 */
export function getWisdomImpact(combatant: Combatant) {
  const mod = getModifier(combatant.wis || 10);
  return {
    healingBonus: mod,
    faithScaling: mod * 3, // Clerc/Druide resource
    insightBonus: mod,
    divineMagicBonus: mod,
  };
}

/**
 * PER - Perception
 * - Trap detection bonus
 * - Treasure finding bonus
 * - Ambush awareness (initiative bonus from PER)
 * - Critical hit chance bonus (+1% per PER modifier)
 * - Detect hidden/invisible enemies
 */
export function getPerceptionImpact(combatant: Combatant) {
  const mod = getModifier(combatant.per || 10);
  return {
    trapDetectionBonus: mod * 5, // % bonus to detect traps
    treasureFindingBonus: mod * 3, // % bonus to find hidden treasure
    initiativeBonus: Math.floor(mod / 2), // Ambush awareness
    critChanceBonus: mod, // +1% crit chance per PER modifier
    detectHiddenDC: 50 - mod, // Lower DC = easier detection
    perceptionBonus: mod,
  };
}

/**
 * WIL - Volonté (Willpower)
 * - ALL mental saves (fear/charm/confusion/domination)
 * - Concentration saves (replaces CON for concentration)
 * - Resistance to fear/charm/domination effects
 * - Mental damage reduction (psychic)
 */
export function getWillpowerImpact(combatant: Combatant) {
  const mod = getModifier(combatant.wil || 10);
  return {
    mentalSaveBonus: mod,
    concentrationBonus: mod, // Replaces CON for concentration
    fearResistBonus: mod * 5, // % DC reduction vs fear
    charmResistBonus: mod * 5, // % DC reduction vs charm
    dominationResistBonus: mod * 5, // % DC reduction vs domination
    mentalDamageReduction: Math.max(0, mod * 2), // Flat reduction to psychic damage
  };
}

/**
 * CHA - Charisme (NOUVEAU - avait ZERO impact avant)
 * - Prix marchands: -3% par point de modificateur
 * - Intimidation en combat: force morale check
 * - Paladin/Barde resource stat
 * - Leadership: +1 ATK aux alliés adjacents
 * - Persuasion: chance de reddition ennemi
 */
export function getCharismaImpact(combatant: Combatant) {
  const mod = getModifier(combatant.cha || 10);
  return {
    merchantDiscount: mod * 3, // % de réduction
    intimidationBonus: mod,
    convictionScaling: mod * 3, // Paladin/Barde resource
    leadershipBonus: mod > 0 ? 1 : 0, // +1 ATK to adjacent allies
    surrenderDCBonus: mod * 2, // Bonus to force surrender
  };
}

/**
 * Obtenir le stat de ressource pour une classe
 */
export function getResourceStat(className: string | undefined): string {
  const CLASS_RESOURCE: Record<string, string> = {
    guerrier: 'con',
    mage: 'int',
    voleur: 'dex',
    clerc: 'wis',
    paladin: 'cha',
    barde: 'cha',
    druide: 'wis',
    rodeur: 'dex',
  };
  const normalized = (className || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  return CLASS_RESOURCE[normalized] || 'con';
}

/**
 * Calculer le max resource d'un combattant basé sur sa classe et son stat
 */
export function calculateMaxResource(combatant: Combatant): number {
  const statName = getResourceStat(combatant.class);
  const statValue = (combatant as unknown as Record<string, number>)[statName] || 10;
  const mod = getModifier(statValue);
  const base = 50; // Base resource
  return base + (mod * 3) + (combatant.level || 1) * 2;
}

/**
 * Obtenir tous les bonus de combat d'un combattant basés sur ses stats
 */
export function getAllStatBonuses(combatant: Combatant) {
  return {
    str: getStrengthImpact(combatant),
    dex: getDexterityImpact(combatant),
    con: getConstitutionImpact(combatant),
    int: getIntelligenceImpact(combatant),
    wis: getWisdomImpact(combatant),
    cha: getCharismaImpact(combatant),
    per: getPerceptionImpact(combatant),
    wil: getWillpowerImpact(combatant),
  };
}
