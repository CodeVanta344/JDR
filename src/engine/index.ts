/**
 * AETHELGARD COMBAT ENGINE
 * Point d'entrée unique pour toute la logique combat
 */

// Core engine
export {
  resolveInitiative,
  validateAction,
  resolveAttack,
  resolveDamage,
  applyDamage,
  resolveHealing,
  processStatusEffects,
  createStatusEffect,
  rollSave,
  consumeResource,
  regenerateResource,
  decrementCooldowns,
  checkWeaponProficiency,
  checkArmorProficiency,
  getLeadershipBonus,
  getMerchantPriceModifier,
  checkMorale,
  formatCombatLog,
} from './CombatEngine';

// Skill resolver
export {
  getSkillCombatModifiers,
  getSneakAttackDice,
  getIntimidationBonus,
  getGrappleBonus,
} from './SkillResolver';

// Stat resolver
export {
  getStrengthImpact,
  getDexterityImpact,
  getConstitutionImpact,
  getIntelligenceImpact,
  getWisdomImpact,
  getCharismaImpact,
  getResourceStat,
  calculateMaxResource,
  getAllStatBonuses,
} from './StatResolver';

// Enemy AI
export { decideEnemyTurn } from './EnemyAIController';
export type { AIDecision } from './EnemyAIController';

// Types
export type {
  Combatant,
  CombatAbility,
  CombatContext,
  CombatModifier,
  AttackResult,
  DamageResult,
  DamageBreakdown,
  ValidationResult,
  InitiativeResult,
  SaveResult,
  StatusEffect,
  StatusEffectType,
  DamageType,
  ArmorCategory,
  AbilityTarget,
  AoEShape,
  TerrainType,
  TerrainTile,
  EquippedWeapon,
  EquippedArmor,
  ItemEffect,
  SkillBonus,
  BossPhase,
  EnemyAIProfile,
  ComboDefinition,
  ComboTrigger,
  ComboEffect,
  ReactionTrigger,
  ReactionResult,
} from './types';
