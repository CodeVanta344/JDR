/**
 * COMBAT ENGINE - Aethelgard d100
 * Moteur de combat pur (sans React/UI) - toute la logique combat centralisée
 *
 * Phase 0: Extraction depuis CombatManager.jsx
 * Phase 1: Item stats, skills, level-gating, proficiency, résistances, cooldowns
 * Phase 2: Intégration stats complète + effets de statut
 */

import { getModifier, rollDice, calculateAC, getProficiencyBonus } from '../lore/rules';
import { resolveAttackDice, resolveDamageDice, resolveDamageCap, getDiceTierForLevel } from '../utils/combat-progression';
import { getSneakAttackDice, getIntimidationBonus } from './SkillResolver';
import type {
  Combatant, CombatAbility, CombatContext, CombatModifier,
  AttackResult, DamageResult, DamageBreakdown, ValidationResult,
  InitiativeResult, SaveResult, StatusEffect, StatusEffectType,
  DamageType, TerrainTile, ItemEffect
} from './types';

// ============================================================
// CONSTANTS
// ============================================================

const CRITICAL_THRESHOLD = 95;
const FUMBLE_THRESHOLD = 5;
const NON_PROFICIENT_PENALTY = -2;
const FLANKING_BONUS = 2;
const BACK_ATTACK_BONUS = 4;
const ENCIRCLEMENT_BONUS = 2;
const DODGE_BASE_PERCENT = 2; // % per DEX modifier point
const LEADERSHIP_BONUS = 1;   // CHA bonus to adjacent allies

/** Classes qui peuvent porter armure lourde */
const HEAVY_ARMOR_CLASSES = ['guerrier', 'paladin'];
/** Classes qui peuvent lancer des sorts */
const SPELLCASTER_CLASSES = ['mage', 'clerc', 'druide', 'barde', 'paladin'];
/** Proficiency d'armes par classe */
const CLASS_WEAPON_PROFICIENCY: Record<string, string[]> = {
  guerrier: ['simple', 'martial', 'exotic'],
  paladin: ['simple', 'martial'],
  rodeur: ['simple', 'martial'],
  voleur: ['simple', 'finesse', 'light'],
  mage: ['simple', 'staff', 'wand'],
  clerc: ['simple', 'mace', 'flail'],
  druide: ['simple', 'staff', 'scimitar'],
  barde: ['simple', 'light', 'finesse', 'rapier'],
};

/** Mapping ressource par classe */
const CLASS_RESOURCE_STAT: Record<string, string> = {
  guerrier: 'con',
  mage: 'int',
  voleur: 'dex',
  clerc: 'wis',
  paladin: 'cha',
  barde: 'cha',
  druide: 'wis',
  rodeur: 'dex',
};

// ============================================================
// SKILL COMBAT BONUSES (parsed from skills-mechanics.ts definitions)
// ============================================================

const SKILL_COMBAT_MODIFIERS: Record<string, Partial<Record<string, number>>> = {
  melee:         { attackBonus: 5 },
  ranged:        { attackBonus: 5 },
  tactics:       { initiativeBonus: 3 },
  defense:       { acBonus: 3 },
  magic:         { spellDamageBonus: 5 },
  perception:    { initiativeBonus: 2, detectHidden: 10 },
  stealth:       { sneakAttackDice: 1 }, // +1d6 per level of skill
  athletics:     { grappleBonus: 5 },
  acrobatics:    { dodgeBonus: 3 },
  intimidation:  { moraleCheckBonus: 5 },
  survival:      { terrainBonus: 3 },
};

// ============================================================
// INITIATIVE
// ============================================================

/**
 * Résoudre l'initiative pour tous les combattants
 * DEX + PER/2 (ambush awareness) + d100 + skill bonuses
 */
export function resolveInitiative(combatants: Combatant[]): InitiativeResult[] {
  return combatants
    .filter(c => c.isAlive)
    .map(c => {
      const { total: roll } = rollDice('1d100');
      const dexMod = getModifier(c.dex || 10);
      const perMod = Math.floor(getModifier(c.per || 10) / 2); // PER contribue à l'initiative (ambush awareness)
      const skillBonus = getSkillModifier(c, 'tactics', 'initiativeBonus')
                       + getSkillModifier(c, 'perception', 'initiativeBonus');
      const total = roll + dexMod + perMod + skillBonus;
      return { combatantId: c.id, roll, dexMod, perMod, total };
    })
    .sort((a, b) => b.total - a.total);
}

// ============================================================
// ACTION VALIDATION
// ============================================================

/**
 * Valider si une action peut être effectuée
 */
export function validateAction(
  actor: Combatant,
  action: CombatAbility,
  target: Combatant | null,
  context?: CombatContext
): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    hasResources: true,
    isOffCooldown: true,
    isInRange: true,
    meetsLevelRequirement: true,
    isProficient: true,
    canCastSpells: true,
    isValidTarget: true,
  };

  // 1. Level-gating
  if (action.level && action.level > actor.level) {
    result.valid = false;
    result.meetsLevelRequirement = false;
    result.reason = `Niveau ${action.level} requis (vous êtes niveau ${actor.level})`;
    return result;
  }

  // 2. Resource cost
  if (action.cost > 0 && actor.resource < action.cost) {
    result.valid = false;
    result.hasResources = false;
    result.reason = `Ressource insuffisante: ${actor.resource}/${action.cost}`;
    return result;
  }

  // 3. Cooldown
  const cd = actor.cooldowns?.[action.name] || 0;
  if (cd > 0) {
    result.valid = false;
    result.isOffCooldown = false;
    result.reason = `En recharge: ${cd} tour(s) restant(s)`;
    return result;
  }

  // 4. Silence check (can't cast spells if silenced)
  const isSilenced = actor.statusEffects?.some(e => e.type === 'silenced');
  const isSpell = isSpellAbility(action);
  if (isSilenced && isSpell) {
    result.valid = false;
    result.canCastSpells = false;
    result.reason = `Réduit au silence - impossible de lancer des sorts`;
    return result;
  }

  // 5. Heavy armor blocks spellcasting for non-heavy classes
  if (isSpell && actor.armor_category === 'heavy') {
    const className = normalizeClassName(actor.class);
    if (!HEAVY_ARMOR_CLASSES.includes(className)) {
      result.valid = false;
      result.canCastSpells = false;
      result.reason = `Armure lourde empêche l'incantation`;
      return result;
    }
  }

  // 6. Range check
  if (target && action.target !== 'self') {
    const dist = getDistance(actor, target);
    const range = action.range || 1;
    if (dist > range) {
      result.valid = false;
      result.isInRange = false;
      result.reason = `Hors de portée: distance ${dist.toFixed(1)}, portée ${range}`;
      return result;
    }
  }

  // 7. Target validation
  if (action.target === 'enemy' && target?.isPlayer === actor.isPlayer) {
    result.valid = false;
    result.isValidTarget = false;
    result.reason = `Cible invalide: doit être un ennemi`;
    return result;
  }
  if (action.target === 'ally' && target?.isPlayer !== actor.isPlayer) {
    result.valid = false;
    result.isValidTarget = false;
    result.reason = `Cible invalide: doit être un allié`;
    return result;
  }

  // 8. Charm check - can't attack charmer
  const charm = actor.statusEffects?.find(e => e.type === 'charmed');
  if (charm && target && target.id === charm.sourceId && action.target === 'enemy') {
    result.valid = false;
    result.reason = `Charmé: impossible d'attaquer la source du charme`;
    return result;
  }

  return result;
}

// ============================================================
// ATTACK RESOLUTION
// ============================================================

/**
 * Résoudre un jet d'attaque complet avec tous les modificateurs
 */
export function resolveAttack(
  attacker: Combatant,
  target: Combatant,
  action: CombatAbility,
  context?: CombatContext
): AttackResult & { perceptionLog?: string } {
  const log: string[] = [];
  const level = attacker.level || 1;
  const modifiers: CombatModifier[] = [];

  // 0. PER Perception check: defender tries to detect hidden/stealthed attacker
  if (attacker.isHidden || action.isFromStealth) {
    const perMod = getModifier(target.per || 10);
    const detectDC = 50 - perMod;
    const detectRoll = Math.floor(Math.random() * 100) + 1;
    if (detectRoll <= detectDC) {
      // Detected! No surprise bonus
      attacker.isHidden = false;
      log.push(`${target.name} détecte ${attacker.name} ! (Perception PER: ${detectRoll}/${detectDC})`);
    }
  }

  // 1. Dé d'attaque de base (progression par niveau)
  const { dice: attackDice, tier, prioritized } = resolveAttackDice({ level, action, attacker });
  const rollResult = rollDice(attackDice);
  const roll = rollResult.total;
  const rawRoll = rollResult.rolls?.[0] ?? roll;

  // 2. Custom crit threshold from weapon + PER bonus (-1% threshold per PER modifier)
  const perCritBonus = Math.max(0, getModifier(attacker.per || 10)); // PER lowers crit threshold
  const critThreshold = (attacker.equipped_weapon?.critChance || CRITICAL_THRESHOLD) - perCritBonus;
  const isCritical = rawRoll >= critThreshold;
  const isFumble = rawRoll <= FUMBLE_THRESHOLD;

  // 3. Stat modifier (STR for melee, DEX for ranged, scaling stat for spells)
  const primaryStat = resolvePrimaryStat(attacker, action);
  const statMod = getModifier(primaryStat);
  modifiers.push({ source: 'stat', type: 'attack', value: statMod });

  // 4. Proficiency bonus
  const profBonus = getProficiencyBonus(level);
  modifiers.push({ source: 'proficiency', type: 'attack', value: profBonus });

  // 5. Weapon attack bonus (from items)
  const weaponBonus = attacker.equipped_weapon?.attackBonus || 0;
  if (weaponBonus !== 0) {
    modifiers.push({ source: `item:${attacker.equipped_weapon?.name}`, type: 'attack', value: weaponBonus });
  }

  // 6. Non-proficiency penalty
  if (attacker.equipped_weapon && !attacker.equipped_weapon.isProficient) {
    modifiers.push({ source: 'non_proficient', type: 'attack', value: NON_PROFICIENT_PENALTY });
  }

  // 7. Skill bonuses
  const meleeSkillBonus = isRangedAction(action)
    ? getSkillModifier(attacker, 'ranged', 'attackBonus')
    : getSkillModifier(attacker, 'melee', 'attackBonus');
  if (meleeSkillBonus > 0) {
    modifiers.push({ source: `skill:${isRangedAction(action) ? 'ranged' : 'melee'}`, type: 'attack', value: meleeSkillBonus });
  }

  // 8. Tactical bonuses (flanking, back attack, encirclement)
  const tacticalBonus = getTacticalModifier(attacker, target, context);
  if (tacticalBonus > 0) {
    modifiers.push({ source: 'tactical', type: 'attack', value: tacticalBonus });
  }

  // 9. Status effect penalties
  const blindPenalty = attacker.statusEffects?.find(e => e.type === 'blinded');
  if (blindPenalty) {
    modifiers.push({ source: 'status:blinded', type: 'attack', value: -20 });
  }
  const poisonPenalty = attacker.statusEffects?.find(e => e.type === 'poisoned');
  if (poisonPenalty) {
    modifiers.push({ source: 'status:poisoned', type: 'attack', value: -5 });
  }
  const fearPenalty = attacker.statusEffects?.find(e => e.type === 'feared');
  if (fearPenalty) {
    modifiers.push({ source: 'status:feared', type: 'attack', value: -5 });
  }

  // 10. CHA leadership bonus (tempAttackBonus applied via applyLeadershipBonus at round start)
  if (attacker.tempAttackBonus && attacker.tempAttackBonus > 0) {
    modifiers.push({ source: 'leadership:cha', type: 'attack', value: attacker.tempAttackBonus });
  }

  // 11. Terrain bonus (elevated = +2 ranged)
  if (context?.terrain && isRangedAction(action)) {
    const attackerTile = getTile(context.terrain, attacker.posX, attacker.posY);
    const targetTile = getTile(context.terrain, target.posX, target.posY);
    if (attackerTile && targetTile && attackerTile.elevation > targetTile.elevation) {
      modifiers.push({ source: 'terrain:elevated', type: 'attack', value: 2 });
    }
  }

  // 12. Cover (target behind cover gets AC bonus, applied to target AC below)
  let coverBonus = 0;
  if (context?.terrain) {
    const targetTile = getTile(context.terrain, target.posX, target.posY);
    if (targetTile?.type === 'cover_half') coverBonus = 5;
    if (targetTile?.type === 'cover_full') coverBonus = 10;
  }

  // Calculate total modifier
  const totalModifier = modifiers
    .filter(m => m.type === 'attack')
    .reduce((sum, m) => sum + m.value, 0);

  const total = roll + totalModifier;
  const effectiveAC = target.ac + coverBonus;

  // Dodge chance (DEX-based passive)
  const targetDexMod = getModifier(target.dex || 10);
  const dodgeChance = Math.max(0, targetDexMod * DODGE_BASE_PERCENT + getSkillModifier(target, 'acrobatics', 'dodgeBonus'));
  const dodgeRoll = Math.random() * 100;
  const dodged = !isCritical && dodgeRoll < dodgeChance;

  // Success determination
  const success = !dodged && (total >= effectiveAC || isCritical) && !isFumble;

  return {
    roll: rawRoll,
    modifier: totalModifier,
    total,
    success,
    isCritical,
    isFumble,
    targetAC: effectiveAC,
    attackDice,
    tier: tier.key,
    isPrioritized: prioritized,
    modifierBreakdown: modifiers,
    dodged,
    perceptionLog: log.length > 0 ? log.join('\n') : undefined,
  };
}

// ============================================================
// DAMAGE RESOLUTION
// ============================================================

/**
 * Résoudre les dégâts complets avec résistances, effets d'items, skills
 */
export function resolveDamage(
  attacker: Combatant,
  target: Combatant,
  action: CombatAbility,
  attackResult: AttackResult
): DamageResult {
  const level = attacker.level || 1;
  const { dice: progressionDamageDice, tier, prioritized } = resolveDamageDice({ level, action, attacker });
  const { cap: damageCap } = resolveDamageCap(level);

  // 1. Base weapon/ability dice
  const weaponDice = action.damage_dice || attacker.equipped_weapon?.damage || progressionDamageDice;
  const weaponRoll = rollDice(weaponDice);

  // 2. Stat modifier
  const primaryStat = resolvePrimaryStat(attacker, action);
  const statMod = getModifier(primaryStat);

  // 3. Trait bonus (lifepath)
  const traitBonus = attacker.bonus_damage || 0;

  // 4. Bonus dice (sneak attack etc.)
  let bonusDiceTotal = 0;
  if (attacker.bonus_dice_damage) {
    bonusDiceTotal = rollDice(attacker.bonus_dice_damage).total;
  }

  // 4b. Sneak attack dice from Stealth skill (SkillResolver)
  let sneakDamage = 0;
  const sneakDice = getSneakAttackDice(attacker);
  if (sneakDice && (attacker.isHidden || action.isFromStealth)) {
    sneakDamage = rollDice(sneakDice).total;
    bonusDiceTotal += sneakDamage;
    // Log handled by caller: `Attaque sournoise ! +${sneakDamage} dégâts (${sneakDice})`
  }

  // 5. Action bonus
  const actionBonus = action.damage_bonus || 0;

  // 6. Skill bonus to damage
  let skillBonus = 0;
  if (isSpellAbility(action)) {
    skillBonus = getSkillModifier(attacker, 'magic', 'spellDamageBonus');
  }

  // 7. Status effect bonuses
  const strengthened = attacker.statusEffects?.find(e => e.type === 'strengthened');
  const strengthBonus = strengthened?.bonusDamage || 0;

  // 8. Item on-hit effects
  let itemEffectDamage = 0;
  if (attacker.equipped_weapon?.effects) {
    for (const effect of attacker.equipped_weapon.effects) {
      if (effect.type === 'elemental_damage' && effect.dice) {
        itemEffectDamage += rollDice(effect.dice).total;
      } else if (effect.type === 'damage_bonus' && effect.value) {
        itemEffectDamage += effect.value;
      }
    }
  }

  // 9. Critical bonus (double weapon dice + bonus dice)
  let criticalBonus = 0;
  if (attackResult.isCritical) {
    criticalBonus = rollDice(weaponDice).total;
    if (attacker.bonus_dice_damage) {
      criticalBonus += rollDice(attacker.bonus_dice_damage).total;
    }
  }

  // 10. Frozen shatter bonus (+50% if target frozen)
  const targetFrozen = target.statusEffects?.find(e => e.type === 'frozen');
  let shatterMultiplier = 1;
  if (targetFrozen) {
    shatterMultiplier = 1.5;
  }

  // Raw damage before resistances
  const rawDamage = Math.floor(
    (weaponRoll.total + statMod + traitBonus + bonusDiceTotal + actionBonus +
     skillBonus + strengthBonus + itemEffectDamage + criticalBonus) * shatterMultiplier
  );

  // 11. Resistance/Vulnerability check
  const damageType = resolveDamageType(action, attacker);
  const resistanceMod = getResistanceMultiplier(target, damageType);
  let resistanceApplied: 'resistant' | 'immune' | 'vulnerable' | null = null;
  if (resistanceMod === 0) resistanceApplied = 'immune';
  else if (resistanceMod === 0.5) resistanceApplied = 'resistant';
  else if (resistanceMod === 2) resistanceApplied = 'vulnerable';

  // Apply resistance then cap
  const afterResist = Math.floor(rawDamage * resistanceMod);
  const finalDamage = Math.max(1, Math.min(afterResist, damageCap));

  const breakdown: DamageBreakdown = {
    tier: tier.key,
    isPrioritized: prioritized,
    selectedDice: weaponDice,
    damageCap,
    wasCapped: afterResist > damageCap,
    weaponDice: weaponRoll.total,
    statMod,
    traitBonus,
    bonusDice: bonusDiceTotal,
    actionBonus,
    critical: criticalBonus,
    skillBonus: skillBonus + strengthBonus,
    itemEffects: itemEffectDamage,
    resistanceMod,
    total: rawDamage,
    finalDamage,
  };

  return {
    damage: finalDamage,
    rawDamage,
    damageType,
    isCritical: attackResult.isCritical,
    resistanceApplied,
    breakdown,
    sneakAttackLog: sneakDamage > 0 ? `Attaque sournoise ! +${sneakDamage} dégâts (${sneakDice})` : undefined,
  };
}

// ============================================================
// DAMAGE APPLICATION
// ============================================================

/**
 * Appliquer les dégâts à une cible et gérer les effets secondaires
 */
export function applyDamage(
  target: Combatant,
  damageResult: DamageResult,
  attacker?: Combatant,
  action?: CombatAbility
): {
  updatedTarget: Combatant;
  concentrationBroken: boolean;
  statusApplied: StatusEffect | null;
  isDead: boolean;
  combatLog: string[];
} {
  const updatedTarget = { ...target };
  updatedTarget.hp = Math.max(0, updatedTarget.hp - damageResult.damage);
  const isDead = updatedTarget.hp <= 0;
  if (isDead) updatedTarget.isAlive = false;

  // Concentration check (WIL save, DC adjusted by WIL modifier)
  let concentrationBroken = false;
  let concentrationLog: string | undefined;
  if (updatedTarget.concentratingOn && damageResult.damage > 0) {
    const wilMod = getModifier(updatedTarget.wil || 10);
    const concentrationDC = Math.max(30, Math.floor(damageResult.damage / 2));
    const saveRoll = Math.floor(Math.random() * 100) + 1;
    const adjustedDC = concentrationDC - (wilMod * 5);
    if (saveRoll > adjustedDC) {
      // Lost concentration
      concentrationBroken = true;
      updatedTarget.concentratingOn = undefined;
      // Also remove concentration-tagged active effects
      if (updatedTarget.statusEffects) {
        updatedTarget.statusEffects = updatedTarget.statusEffects.filter(e => !e.type.includes('shielded') && !e.type.includes('regenerating'));
      }
      concentrationLog = `${updatedTarget.name} perd sa concentration ! (WIL: ${saveRoll}/${adjustedDC})`;
    } else {
      concentrationLog = `${updatedTarget.name} maintient sa concentration (WIL: ${saveRoll}/${adjustedDC})`;
    }
  }

  // Apply status effect from ability
  let statusApplied: StatusEffect | null = null;
  if (action?.statusEffect && !isDead) {
    // Target gets a save if specified
    let applyStatus = true;
    if (action.statusEffect.saveStat && action.statusEffect.saveDC) {
      const save = rollSave(updatedTarget, action.statusEffect.saveDC, action.statusEffect.saveStat);
      if (save.success) applyStatus = false;
    }
    // WIL willpower save vs mental effects (fear/charm/confusion/domination)
    if (applyStatus && ['feared', 'charmed', 'confused', 'dominated'].includes(action.statusEffect.type)) {
      const saveDC = action.statusEffect.saveDC || 50;
      const wilMod = getModifier(updatedTarget.wil || 10);
      const saveRoll = Math.floor(Math.random() * 100) + 1;
      const adjustedDC = saveDC - (wilMod * 5); // WIL reduces DC
      if (saveRoll <= adjustedDC) {
        applyStatus = false;
        // Log stored in wilResistLog for caller
        (updatedTarget as Record<string, unknown>)._wilResistLog =
          `${updatedTarget.name} résiste à ${action.statusEffect.type} ! (Volonté WIL: ${saveRoll}/${adjustedDC})`;
      }
    }
    if (applyStatus) {
      statusApplied = createStatusEffect(
        action.statusEffect.type,
        action.statusEffect.duration,
        attacker?.id || 'unknown'
      );
      updatedTarget.statusEffects = [...(updatedTarget.statusEffects || []), statusApplied];
    }
  }

  // Apply item on-hit status effects
  if (attacker?.equipped_weapon?.effects && !isDead) {
    for (const effect of attacker.equipped_weapon.effects) {
      if (effect.type === 'on_hit' && effect.statusEffect) {
        const statusFromItem = createStatusEffect(
          effect.statusEffect,
          effect.statusDuration || 2,
          attacker.id
        );
        updatedTarget.statusEffects = [...(updatedTarget.statusEffects || []), statusFromItem];
      }
    }
  }

  // CON Poison resistance: reduce poison damage
  const combatLog: string[] = [];
  if (damageResult.damageType === 'poison') {
    const conMod = getModifier(updatedTarget.con || 10);
    const reduction = Math.max(0, conMod * 2);
    if (reduction > 0) {
      // Retroactively heal some of the poison damage (already applied above)
      const restored = Math.min(reduction, damageResult.damage);
      updatedTarget.hp = Math.min(updatedTarget.maxHp, updatedTarget.hp + restored);
      if (updatedTarget.hp > 0 && !updatedTarget.isAlive) updatedTarget.isAlive = true;
      combatLog.push(`${updatedTarget.name} résiste au poison (-${restored} dégâts, CON)`);
    }
  }

  // WIL Mental damage reduction: reduce psychic damage
  if (damageResult.damageType === 'psychic') {
    const wilMod = getModifier(updatedTarget.wil || 10);
    const reduction = Math.max(0, wilMod * 2);
    if (reduction > 0) {
      const restored = Math.min(reduction, damageResult.damage);
      updatedTarget.hp = Math.min(updatedTarget.maxHp, updatedTarget.hp + restored);
      if (updatedTarget.hp > 0 && !updatedTarget.isAlive) updatedTarget.isAlive = true;
      combatLog.push(`${updatedTarget.name} résiste aux dégâts psychiques (-${restored} dégâts, WIL)`);
    }
  }

  // Concentration log
  if (concentrationLog) {
    combatLog.push(concentrationLog);
  }

  // WIL resist log
  const wilLog = (updatedTarget as Record<string, unknown>)._wilResistLog as string | undefined;
  if (wilLog) {
    combatLog.push(wilLog);
    delete (updatedTarget as Record<string, unknown>)._wilResistLog;
  }

  // CHA Surrender check: when enemy drops below 25% HP
  if (updatedTarget.hp > 0 && updatedTarget.hp <= updatedTarget.maxHp * 0.25 && !updatedTarget.isPlayer && !updatedTarget.surrendered && attacker) {
    const chaMod = getModifier(attacker.cha || 10);
    const intimidBonus = getIntimidationBonus(attacker);
    const surrenderDC = 70 - (chaMod * 5) - intimidBonus;
    const roll = Math.floor(Math.random() * 100) + 1;
    if (roll <= surrenderDC) {
      updatedTarget.surrendered = true;
      combatLog.push(`${updatedTarget.name} supplie pour sa vie ! (Intimidation CHA: ${roll}/${surrenderDC})`);
    }
  }

  return { updatedTarget, concentrationBroken, statusApplied, isDead, combatLog };
}

// ============================================================
// HEALING
// ============================================================

export function resolveHealing(actor: Combatant, action: CombatAbility, target: Combatant): number {
  if (!action.heal) return 0;
  const healRoll = rollDice(action.heal);
  const scalingStat = action.scaling ? (actor[action.scaling as keyof Combatant] as number || 10) : (actor.wis || 10);
  const statMod = getModifier(scalingStat);
  return Math.min(healRoll.total + statMod, target.maxHp - target.hp);
}

// ============================================================
// STATUS EFFECTS PROCESSING
// ============================================================

/**
 * Traiter les effets de statut au début du tour d'un combattant
 */
export function processStatusEffects(combatant: Combatant): {
  updatedCombatant: Combatant;
  tickDamage: number;
  tickHealing: number;
  expiredEffects: StatusEffect[];
  skipTurn: boolean;
  mustFlee: boolean;
} {
  const updated = { ...combatant };
  let tickDamage = 0;
  let tickHealing = 0;
  const expiredEffects: StatusEffect[] = [];
  let skipTurn = false;
  let mustFlee = false;

  const activeEffects: StatusEffect[] = [];

  for (const effect of (updated.statusEffects || [])) {
    // Check for save to end early
    if (effect.saveStat && effect.saveDC && effect.duration < effect.maxDuration) {
      const save = rollSave(updated, effect.saveDC, effect.saveStat);
      if (save.success) {
        expiredEffects.push(effect);
        continue;
      }
    }

    // Tick damage
    if (effect.tickDice) {
      tickDamage += rollDice(effect.tickDice).total;
    } else if (effect.tickDamage) {
      tickDamage += effect.tickDamage;
    }

    // Tick healing
    if (effect.healPerTurn) {
      tickHealing += rollDice(effect.healPerTurn).total;
    }

    // Skip turn
    if (effect.skipTurn) skipTurn = true;

    // Must flee
    if (effect.mustFlee) mustFlee = true;

    // Decrement duration
    const remaining = effect.duration - 1;
    if (remaining <= 0) {
      expiredEffects.push(effect);
    } else {
      activeEffects.push({ ...effect, duration: remaining });
    }
  }

  // Apply tick damage/healing
  updated.hp = Math.max(0, updated.hp - tickDamage);
  updated.hp = Math.min(updated.maxHp, updated.hp + tickHealing);
  if (updated.hp <= 0) updated.isAlive = false;
  updated.statusEffects = activeEffects;

  return { updatedCombatant: updated, tickDamage, tickHealing, expiredEffects, skipTurn, mustFlee };
}

/**
 * Créer un effet de statut avec les paramètres par défaut du type
 */
export function createStatusEffect(type: StatusEffectType, duration: number, sourceId: string): StatusEffect {
  const defaults = STATUS_EFFECT_DEFAULTS[type] || {};
  return {
    id: `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    type,
    name: defaults.name || type,
    duration,
    maxDuration: duration,
    sourceId,
    ...defaults,
  };
}

const STATUS_EFFECT_DEFAULTS: Record<string, Partial<StatusEffect>> = {
  stunned:       { name: 'Étourdi', skipTurn: true },
  poisoned:      { name: 'Empoisonné', tickDice: '1d10', tickDamageType: 'poison', attackPenalty: -5, saveStat: 'con', saveDC: 30 },
  burning:       { name: 'En feu', tickDice: '1d20', tickDamageType: 'fire', saveStat: 'con', saveDC: 40 },
  frozen:        { name: 'Gelé', speedPenalty: 99, acPenalty: -10, saveStat: 'con', saveDC: 35 },
  bleeding:      { name: 'Saignement', tickDamage: 5, saveStat: 'con', saveDC: 30 },
  charmed:       { name: 'Charmé', preventAttackSource: true, saveStat: 'wil', saveDC: 40 },
  feared:        { name: 'Apeuré', mustFlee: true, attackPenalty: -5, saveStat: 'wil', saveDC: 40 },
  blinded:       { name: 'Aveuglé', attackPenalty: -20 },
  silenced:      { name: 'Réduit au silence', preventSpells: true },
  slowed:        { name: 'Ralenti', speedPenalty: 3 },
  strengthened:  { name: 'Renforcé', bonusDamage: 5 },
  shielded:      { name: 'Protégé', bonusAC: 10 },
  regenerating:  { name: 'Régénération', healPerTurn: '1d10' },
  invisible:     { name: 'Invisible' },
  prone:         { name: 'À terre', attackPenalty: -5, acPenalty: -5 },
  grappled:      { name: 'Agrippé', speedPenalty: 99 },
  confused:      { name: 'Confus', skipTurn: true, saveStat: 'wil', saveDC: 40 },
  dominated:     { name: 'Dominé', preventAttackSource: true, saveStat: 'wil', saveDC: 50 },
};

// ============================================================
// SAVES
// ============================================================

export function rollSave(combatant: Combatant, dc: number, stat: string = 'dex'): SaveResult {
  const { total: roll, rolls, isCritical } = rollDice('1d100');
  const statValue = (combatant as unknown as Record<string, number>)[stat] || 10;
  const statMod = getModifier(statValue);
  const profBonus = getProficiencyBonus(combatant.level || 1);
  const total = roll + statMod + profBonus;

  return {
    roll: rolls?.[0] ?? roll,
    total,
    success: total >= dc || isCritical,
    isCritical: isCritical || false,
    dc,
    stat,
  };
}

// ============================================================
// RESOURCE MANAGEMENT
// ============================================================

/**
 * Consommer la ressource et appliquer le cooldown
 */
export function consumeResource(actor: Combatant, action: CombatAbility): Combatant {
  const updated = { ...actor };
  if (action.cost > 0) {
    updated.resource = Math.max(0, updated.resource - action.cost);
  }
  if (action.cooldown > 0) {
    updated.cooldowns = { ...updated.cooldowns, [action.name]: action.cooldown };
  }
  // Concentration tracking
  if (action.concentration) {
    updated.concentratingOn = action.name;
  }
  return updated;
}

/**
 * Régénération de ressource en fin de tour
 */
export function regenerateResource(combatant: Combatant, amount: number = 10): Combatant {
  const updated = { ...combatant };
  updated.resource = Math.min(updated.maxResource, updated.resource + amount);
  return updated;
}

/**
 * Décrémenter tous les cooldowns d'un combattant
 */
export function decrementCooldowns(combatant: Combatant): Combatant {
  const updated = { ...combatant };
  const newCooldowns: Record<string, number> = {};
  for (const [name, turns] of Object.entries(updated.cooldowns || {})) {
    if (turns > 1) newCooldowns[name] = turns - 1;
  }
  updated.cooldowns = newCooldowns;
  return updated;
}

// ============================================================
// EQUIPMENT PROFICIENCY
// ============================================================

/**
 * Vérifier si un combattant est proficient avec son arme
 */
export function checkWeaponProficiency(className: string | undefined, weaponCategory: string): boolean {
  const normalized = normalizeClassName(className);
  const allowed = CLASS_WEAPON_PROFICIENCY[normalized];
  if (!allowed) return true; // Unknown class = proficient
  return allowed.includes(weaponCategory.toLowerCase());
}

/**
 * Vérifier si un combattant peut porter son armure
 */
export function checkArmorProficiency(className: string | undefined, armorCategory: string): boolean {
  const normalized = normalizeClassName(className);
  if (armorCategory === 'heavy') return HEAVY_ARMOR_CLASSES.includes(normalized);
  if (armorCategory === 'medium') return !['mage', 'barde'].includes(normalized);
  return true; // Light armor OK for all
}

// ============================================================
// CHA LEADERSHIP
// ============================================================

/**
 * Calculer le bonus de leadership CHA pour les alliés adjacents
 */
export function getLeadershipBonus(leader: Combatant, ally: Combatant): number {
  if (leader.id === ally.id) return 0;
  if (leader.isPlayer !== ally.isPlayer) return 0;
  const dist = getDistance(leader, ally);
  if (dist > 1.5) return 0; // Adjacent only
  const chaMod = getModifier(leader.cha || 10);
  if (chaMod <= 0) return 0;
  return LEADERSHIP_BONUS;
}

/**
 * Appliquer le bonus de leadership CHA au début d'un round
 * Un allié avec CHA >= 14 inspire les autres (+ATK)
 */
export function applyLeadershipBonus(allies: Combatant[]): string[] {
  const log: string[] = [];
  const charismaLeader = allies.find(a => a.isAlive && (a.cha || 10) >= 14);
  if (charismaLeader) {
    const leadershipBonus = Math.max(1, Math.floor(getModifier(charismaLeader.cha || 10) / 2));
    allies.forEach(a => {
      if (a.id !== charismaLeader.id && a.isAlive) {
        a.tempAttackBonus = (a.tempAttackBonus || 0) + leadershipBonus;
      }
    });
    log.push(`${charismaLeader.name} inspire ses alliés ! (+${leadershipBonus} ATK, Leadership CHA)`);
  }
  return log;
}

// ============================================================
// MERCHANT PRICING (CHA impact)
// ============================================================

/**
 * Calculer le modificateur de prix marchand basé sur CHA
 */
export function getMerchantPriceModifier(charisma: number): number {
  const chaMod = getModifier(charisma || 10);
  return 1 - (chaMod * 0.03); // -3% per CHA modifier point
}

// ============================================================
// MORALE CHECK
// ============================================================

/**
 * Vérifier si un ennemi panique et veut fuir
 */
export function checkMorale(enemy: Combatant, intimidationBonus: number = 0): { flees: boolean; save: SaveResult | null } {
  if (enemy.isBoss) return { flees: false, save: null };
  if (enemy.isPlayer) return { flees: false, save: null };

  const threshold = enemy.moraleThreshold || 30;
  const hpPercent = (enemy.hp / enemy.maxHp) * 100;

  if (hpPercent > threshold) return { flees: false, save: null };

  // Morale save (WIL-based, DC 50 + intimidation bonus)
  const dc = 50 + intimidationBonus;
  const save = rollSave(enemy, dc, 'wil');
  return { flees: !save.success, save };
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getDistance(a: Combatant, b: Combatant): number {
  return Math.sqrt(Math.pow(a.posX - b.posX, 2) + Math.pow(a.posY - b.posY, 2));
}

function normalizeClassName(cls: string | undefined): string {
  return (cls || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function isSpellAbility(action: CombatAbility): boolean {
  const type = (action.type || '').toLowerCase();
  return ['arcane', 'divin', 'divine', 'nature', 'psychic', 'necrotic'].some(t => type.includes(t))
    || (action.scaling === 'int' || action.scaling === 'wis' || action.scaling === 'cha');
}

function isRangedAction(action: CombatAbility): boolean {
  return (action.range || 1) > 1;
}

function resolvePrimaryStat(attacker: Combatant, action: CombatAbility): number {
  // Use ability's scaling stat if defined
  if (action.scaling) {
    const stat = (attacker as unknown as Record<string, number>)[action.scaling];
    if (stat) return stat;
  }
  // Ranged = DEX, melee = STR
  if (isRangedAction(action)) return attacker.dex || 10;
  return attacker.str || attacker.dex || 15;
}

function resolveDamageType(action: CombatAbility, attacker: Combatant): DamageType {
  if (action.damageType) return action.damageType;
  if (attacker.equipped_weapon?.damageType) return attacker.equipped_weapon.damageType;
  const type = (action.type || '').toLowerCase();
  if (type.includes('feu') || type.includes('fire')) return 'fire';
  if (type.includes('froid') || type.includes('ice') || type.includes('cold')) return 'cold';
  if (type.includes('foudre') || type.includes('lightning')) return 'lightning';
  if (type.includes('arcane') || type.includes('arcanique')) return 'arcane';
  if (type.includes('divin') || type.includes('divine')) return 'divine';
  if (type.includes('necro')) return 'necrotic';
  if (type.includes('psychi')) return 'psychic';
  if (type.includes('poison')) return 'poison';
  return 'physical';
}

function getResistanceMultiplier(target: Combatant, damageType: DamageType): number {
  if (target.immunities?.includes(damageType)) return 0;
  if (target.resistances?.includes(damageType)) return 0.5;
  if (target.vulnerabilities?.includes(damageType)) return 2;

  // Check item-based elemental resistances (fireResist etc.)
  // These provide flat reduction, not multiplicative - handled separately
  return 1;
}

function getTacticalModifier(attacker: Combatant, target: Combatant, context?: CombatContext): number {
  let bonus = 0;

  // Facing-based bonuses
  if (target.facing) {
    const dx = attacker.posX - target.posX;
    const dy = attacker.posY - target.posY;

    const isRear = (
      (target.facing === 'north' && dy > 0) ||
      (target.facing === 'south' && dy < 0) ||
      (target.facing === 'east' && dx < 0) ||
      (target.facing === 'west' && dx > 0)
    );
    const isFlank = (
      (target.facing === 'north' && Math.abs(dx) > Math.abs(dy)) ||
      (target.facing === 'south' && Math.abs(dx) > Math.abs(dy)) ||
      (target.facing === 'east' && Math.abs(dy) > Math.abs(dx)) ||
      (target.facing === 'west' && Math.abs(dy) > Math.abs(dx))
    );

    if (isRear) bonus += BACK_ATTACK_BONUS;
    else if (isFlank) bonus += FLANKING_BONUS;
  }

  return bonus;
}

function getSkillModifier(combatant: Combatant, skillName: string, bonusType: string): number {
  // Check skill_bonuses array
  const skills = combatant.skill_bonuses || [];
  const skill = skills.find(
    s => (s.name || s.skill || '').toLowerCase() === skillName.toLowerCase()
  );
  if (!skill) return 0;

  // Look up the bonus value from our table
  const modifiers = SKILL_COMBAT_MODIFIERS[skillName];
  if (!modifiers) return 0;
  return (modifiers as Record<string, number>)[bonusType] || 0;
}

function getTile(terrain: TerrainTile[][], x: number, y: number): TerrainTile | null {
  if (!terrain || !terrain[y] || !terrain[y][x]) return null;
  return terrain[y][x];
}

// ============================================================
// COMBAT LOG FORMATTING
// ============================================================

export function formatCombatLog(
  attacker: Combatant,
  target: Combatant,
  attackResult: AttackResult,
  damageResult?: DamageResult
): string {
  let msg = `⚔️ **${attacker.name}** attaque **${target.name}**\n`;
  msg += `📈 Palier: **${attackResult.tier}** | Style: **${attackResult.isPrioritized ? 'priorisée' : 'standard'}**\n`;
  msg += `🎲 Jet: **${attackResult.roll}** + ${attackResult.modifier} = **${attackResult.total}** vs CA ${attackResult.targetAC}`;

  if (attackResult.dodged) {
    msg += ` 💨 **ESQUIVÉ !**`;
    return msg;
  }

  if (attackResult.isFumble) {
    msg += ` 💀 **ÉCHEC CRITIQUE !**`;
    return msg;
  }

  if (attackResult.isCritical && damageResult) {
    msg += ` 💥 **CRITIQUE !**\n`;
    msg += `💀 Dégâts: **${damageResult.damage}** (${damageResult.damageType})`;
  } else if (attackResult.success && damageResult) {
    msg += ` ✅\n`;
    msg += `💥 Dégâts: **${damageResult.damage}** (${damageResult.damageType})`;
    if (damageResult.resistanceApplied === 'resistant') msg += ` 🛡️ Résistance!`;
    if (damageResult.resistanceApplied === 'vulnerable') msg += ` ⚡ Vulnérable!`;
    if (damageResult.resistanceApplied === 'immune') msg += ` 🚫 Immunité!`;
    if (damageResult.breakdown.wasCapped) msg += `\n🛡️ Cap: **${damageResult.breakdown.damageCap}**`;
  } else {
    msg += ` ❌ **RATÉ !**`;
  }

  return msg;
}
