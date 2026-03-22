/**
 * SKILL RESOLVER - Aethelgard d100
 * Parse les compétences et retourne les modificateurs de combat applicables
 */

import type { Combatant, CombatModifier } from './types';

/**
 * Table de référence : skill → modificateurs combat
 * Basée sur skills-mechanics.ts (les 52 compétences)
 */
const SKILL_COMBAT_MAP: Record<string, {
  attackBonus?: number;
  damageBonus?: number;
  acBonus?: number;
  initiativeBonus?: number;
  dodgeBonus?: number;
  sneakDice?: string;       // Bonus dice pour sneak attack
  healingBonus?: number;
  moraleBonus?: number;      // Bonus aux checks de moral
  grappleBonus?: number;
  condition?: string;        // Quand le bonus s'applique
}> = {
  // === COMBAT ===
  melee:       { attackBonus: 5, condition: 'melee' },
  ranged:      { attackBonus: 5, condition: 'ranged' },
  tactics:     { initiativeBonus: 3, damageBonus: 2 },
  defense:     { acBonus: 3 },
  magic:       { damageBonus: 5, condition: 'spell' },

  // === SOCIAL (combat impacts) ===
  intimidation: { moraleBonus: 5 },
  persuasion:   {}, // No direct combat impact but used for surrender
  deception:    { attackBonus: 3, condition: 'surprise_round' },

  // === EXPLORATION (combat impacts) ===
  perception:  { initiativeBonus: 2 },
  stealth:     { sneakDice: '1d6' },
  athletics:   { grappleBonus: 5, damageBonus: 1, condition: 'melee' },
  acrobatics:  { dodgeBonus: 3, acBonus: 1 },
  survival:    { damageBonus: 2, condition: 'outdoors' },

  // === KNOWLEDGE (combat impacts) ===
  arcana:      { damageBonus: 2, condition: 'spell' },
  medicine:    { healingBonus: 5 },
  nature:      { damageBonus: 2, condition: 'nature_spell' },
  religion:    { damageBonus: 2, condition: 'divine_spell' },
};

/**
 * Obtenir tous les modificateurs de combat d'un combattant basés sur ses skills
 */
export function getSkillCombatModifiers(combatant: Combatant, actionType: 'melee' | 'ranged' | 'spell' | 'heal'): CombatModifier[] {
  const modifiers: CombatModifier[] = [];
  const skills = combatant.skill_bonuses || [];

  for (const skillBonus of skills) {
    const skillName = (skillBonus.name || skillBonus.skill || '').toLowerCase();
    const mapping = SKILL_COMBAT_MAP[skillName];
    if (!mapping) continue;

    // Check condition
    if (mapping.condition) {
      if (mapping.condition === 'melee' && actionType !== 'melee') continue;
      if (mapping.condition === 'ranged' && actionType !== 'ranged') continue;
      if (mapping.condition === 'spell' && actionType !== 'spell') continue;
      if (mapping.condition === 'surprise_round') continue; // TODO: track surprise
    }

    if (mapping.attackBonus) {
      modifiers.push({
        source: `skill:${skillName}`,
        type: 'attack',
        value: mapping.attackBonus,
      });
    }

    if (mapping.damageBonus) {
      modifiers.push({
        source: `skill:${skillName}`,
        type: 'damage',
        value: mapping.damageBonus,
      });
    }

    if (mapping.acBonus) {
      modifiers.push({
        source: `skill:${skillName}`,
        type: 'ac',
        value: mapping.acBonus,
      });
    }

    if (mapping.initiativeBonus) {
      modifiers.push({
        source: `skill:${skillName}`,
        type: 'initiative',
        value: mapping.initiativeBonus,
      });
    }

    if (mapping.healingBonus && actionType === 'heal') {
      modifiers.push({
        source: `skill:${skillName}`,
        type: 'healing',
        value: mapping.healingBonus,
      });
    }
  }

  return modifiers;
}

/**
 * Obtenir le bonus de sneak attack si le combattant a la compétence stealth
 */
export function getSneakAttackDice(combatant: Combatant): string | null {
  const skills = combatant.skill_bonuses || [];
  const stealth = skills.find(s =>
    (s.name || s.skill || '').toLowerCase() === 'stealth'
  );
  if (!stealth) return null;
  return SKILL_COMBAT_MAP.stealth?.sneakDice || null;
}

/**
 * Obtenir le bonus d'intimidation pour les checks de moral
 */
export function getIntimidationBonus(combatant: Combatant): number {
  const skills = combatant.skill_bonuses || [];
  const intimidation = skills.find(s =>
    (s.name || s.skill || '').toLowerCase() === 'intimidation'
  );
  if (!intimidation) return 0;
  return SKILL_COMBAT_MAP.intimidation?.moraleBonus || 0;
}

/**
 * Obtenir le bonus de grapple
 */
export function getGrappleBonus(combatant: Combatant): number {
  const skills = combatant.skill_bonuses || [];
  const athletics = skills.find(s =>
    (s.name || s.skill || '').toLowerCase() === 'athletics'
  );
  if (!athletics) return 0;
  return SKILL_COMBAT_MAP.athletics?.grappleBonus || 0;
}
