/**
 * COMBAT ENGINE - TYPES & INTERFACES
 * Système d100 Aethelgard - Types centraux pour le moteur de combat
 */

// ============================================================
// DAMAGE TYPES
// ============================================================

export type DamageType =
  | 'physical' | 'slashing' | 'piercing' | 'bludgeoning'
  | 'fire' | 'cold' | 'lightning' | 'poison'
  | 'arcane' | 'divine' | 'necrotic' | 'psychic'
  | 'radiant' | 'thunder' | 'acid' | 'force';

export type ArmorCategory = 'none' | 'light' | 'medium' | 'heavy';

export type AbilityTarget = 'self' | 'ally' | 'enemy' | 'area';

export type AoEShape = 'circle' | 'cone' | 'line' | 'square';

export type StatusEffectType =
  | 'stunned' | 'poisoned' | 'burning' | 'frozen'
  | 'bleeding' | 'charmed' | 'feared' | 'blinded'
  | 'silenced' | 'slowed' | 'strengthened' | 'shielded'
  | 'regenerating' | 'invisible' | 'prone' | 'grappled';

export type EnemyAIProfile = 'brute' | 'ranged' | 'caster' | 'support' | 'boss' | 'minion';

export type CombatPhase = 'initiative' | 'active' | 'finished';

export type TerrainType = 'normal' | 'difficult' | 'cover_half' | 'cover_full' | 'elevated' | 'hazard_fire' | 'hazard_poison' | 'water' | 'pit' | 'ice';

// ============================================================
// COMBAT MODIFIERS
// ============================================================

export interface CombatModifier {
  source: string;        // Ex: 'skill:melee', 'item:flamesword', 'status:strengthened'
  type: 'attack' | 'damage' | 'ac' | 'initiative' | 'save' | 'healing';
  value: number;         // Flat bonus/malus
  dice?: string;         // Bonus dice (ex: '1d6')
  damageType?: DamageType;
  condition?: string;    // Condition d'application (ex: 'melee_only', 'ranged_only')
}

// ============================================================
// STATUS EFFECTS
// ============================================================

export interface StatusEffect {
  id: string;
  type: StatusEffectType;
  name: string;
  duration: number;        // Tours restants
  maxDuration: number;
  sourceId: string;        // ID du combattant source
  tickDamage?: number;     // Dégâts par tour
  tickDice?: string;       // Dés de dégâts par tour (ex: '1d10')
  tickDamageType?: DamageType;
  attackPenalty?: number;
  acPenalty?: number;
  speedPenalty?: number;   // Réduction PM
  saveStat?: string;       // Stat pour jet de sauvegarde
  saveDC?: number;         // DC pour terminer l'effet
  skipTurn?: boolean;      // L'affecté perd son tour
  preventSpells?: boolean; // Empêche les sorts
  preventAttackSource?: boolean; // Ne peut pas attaquer la source (charm)
  mustFlee?: boolean;      // Doit fuir la source (fear)
  bonusDamage?: number;    // Bonus dégâts (strengthened)
  bonusAC?: number;        // Bonus AC (shielded)
  healPerTurn?: string;    // Dés de soin par tour (ex: '1d10')
}

// ============================================================
// COMBAT CONTEXT
// ============================================================

export interface CombatContext {
  terrain: TerrainTile[][];    // Grille de terrain
  weather: string;
  timeOfDay: 'day' | 'night' | 'dawn' | 'dusk';
  isAmbush: boolean;
  isSurprise: boolean;
  environmentalEffects: string[];
  round: number;
  turnIndex: number;
}

export interface TerrainTile {
  type: TerrainType;
  elevation: number;  // 0 = sol, 1+ = élevé
}

// ============================================================
// COMBATANT
// ============================================================

export interface Combatant {
  id: string;
  name: string;
  isPlayer: boolean;
  isAlive: boolean;

  // Core stats
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;

  // Combat stats
  level: number;
  hp: number;
  maxHp: number;
  ac: number;
  initiative: number;

  // Resource
  resource: number;
  maxResource: number;
  resourceType?: string; // 'adrenaline', 'mana', 'energy', 'faith', 'conviction', 'inspiration'

  // Position
  posX: number;
  posY: number;
  facing: 'north' | 'south' | 'east' | 'west';
  currentPM: number;
  maxPM: number;

  // Equipment
  class?: string;
  equipped_weapon?: EquippedWeapon;
  equipped_armor?: EquippedArmor;
  equipped_shield?: boolean;
  armor_category?: ArmorCategory;

  // Abilities
  abilities: CombatAbility[];
  cooldowns: Record<string, number>; // ability name -> tours restants

  // Skills
  skills?: Record<string, number>;     // skill name -> level
  skill_bonuses?: SkillBonus[];

  // Status
  statusEffects: StatusEffect[];
  hasActed: boolean;
  hasMoved: boolean;
  reactionsRemaining: number;
  concentratingOn?: string;  // Ability name

  // Resistances
  resistances?: DamageType[];
  immunities?: DamageType[];
  vulnerabilities?: DamageType[];

  // Enemy-specific
  aiProfile?: EnemyAIProfile;
  moraleThreshold?: number;  // HP% to start fleeing
  isBoss?: boolean;
  bossPhase?: number;
  bossPhases?: BossPhase[];

  // Traits
  bonus_damage?: number;
  bonus_dice_damage?: string;
  bonus_attack?: number;
}

export interface EquippedWeapon {
  name: string;
  damage: string;          // Dice string (ex: '1d8', '2d6')
  attackBonus: number;
  critChance?: number;     // Seuil critique custom (ex: 90 au lieu de 95)
  damageType: DamageType;
  range: number;           // 1 = melee, 2+ = ranged
  category: string;        // 'martial', 'simple', 'exotic'
  effects?: ItemEffect[];
  isProficient: boolean;   // Calculé à l'init
}

export interface EquippedArmor {
  name: string;
  ac: number;
  category: ArmorCategory;
  effects?: ItemEffect[];
  isProficient: boolean;
}

export interface ItemEffect {
  type: 'damage_bonus' | 'elemental_damage' | 'on_hit' | 'passive' | 'buff';
  value?: number;
  dice?: string;
  damageType?: DamageType;
  statusEffect?: StatusEffectType;
  statusDuration?: number;
  description: string;
}

export interface SkillBonus {
  name: string;
  skill: string;
  bonus: number;
}

// ============================================================
// ABILITIES
// ============================================================

export interface CombatAbility {
  name: string;
  cost: number;
  cooldown: number;
  level: number;
  dice?: string;
  scaling?: string;        // 'str', 'dex', 'int', 'wis', 'cha', 'level'
  range: number;
  target: AbilityTarget;
  type?: string;           // Damage type label
  damageType?: DamageType;
  description?: string;
  flavor?: string;

  // Advanced
  concentration?: boolean;
  isReaction?: boolean;
  aoe?: { shape: AoEShape; radius?: number; length?: number; width?: number };
  statusEffect?: { type: StatusEffectType; duration: number; saveStat?: string; saveDC?: number };
  heal?: string;           // Heal dice
  damage_bonus?: number;
  damage_dice?: string;    // Override damage dice
  canTargetSelf?: boolean;
  vfx?: string;
}

export interface BossPhase {
  hpThreshold: number;     // % HP pour déclencher (ex: 75, 50, 25)
  name: string;
  abilities: CombatAbility[];
  statModifiers: Partial<Pick<Combatant, 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha' | 'ac'>>;
  aiProfile: EnemyAIProfile;
  description: string;
}

// ============================================================
// RESULTS
// ============================================================

export interface AttackResult {
  roll: number;             // Valeur brute du dé
  modifier: number;         // Total des modificateurs
  total: number;            // roll + modifier
  success: boolean;
  isCritical: boolean;
  isFumble: boolean;
  targetAC: number;
  attackDice: string;
  tier: string;
  isPrioritized: boolean;
  modifierBreakdown: CombatModifier[];  // Détail de chaque bonus
  dodged?: boolean;         // Si esquivé par DEX
}

export interface DamageResult {
  damage: number;           // Dégâts finaux après caps/resistances
  rawDamage: number;        // Dégâts avant résistances
  damageType: DamageType;
  isCritical: boolean;
  resistanceApplied?: 'resistant' | 'immune' | 'vulnerable' | null;
  breakdown: DamageBreakdown;
}

export interface DamageBreakdown {
  tier: string;
  isPrioritized: boolean;
  selectedDice: string;
  damageCap: number;
  wasCapped: boolean;
  weaponDice: number;
  statMod: number;
  traitBonus: number;
  bonusDice: number;
  actionBonus: number;
  critical: number;
  skillBonus: number;
  itemEffects: number;
  resistanceMod: number;    // Multiplicateur (0.5, 1, 2)
  total: number;
  finalDamage: number;
}

export interface ValidationResult {
  valid: boolean;
  reason?: string;
  // Détails
  hasResources: boolean;
  isOffCooldown: boolean;
  isInRange: boolean;
  meetsLevelRequirement: boolean;
  isProficient: boolean;
  canCastSpells: boolean;     // Non-silenced, pas d'armure lourde si mage
  isValidTarget: boolean;
}

export interface InitiativeResult {
  combatantId: string;
  roll: number;
  dexMod: number;
  wisMod: number;
  total: number;
}

// ============================================================
// SAVE RESULTS
// ============================================================

export interface SaveResult {
  roll: number;
  total: number;
  success: boolean;
  isCritical: boolean;
  dc: number;
  stat: string;
}

// ============================================================
// COMBO SYSTEM
// ============================================================

export interface ComboDefinition {
  id: string;
  name: string;
  description: string;
  trigger: ComboTrigger[];
  effect: ComboEffect;
}

export interface ComboTrigger {
  abilityName: string;
  className?: string;
  withinTurns: number;  // Nombre de tours pour compléter le combo
}

export interface ComboEffect {
  damageMultiplier?: number;
  bonusDamage?: number;
  bonusDice?: string;
  statusEffect?: { type: StatusEffectType; duration: number };
  healAllies?: string;
  description: string;
}

// ============================================================
// REACTION SYSTEM
// ============================================================

export interface ReactionTrigger {
  type: 'opportunity_attack' | 'counterspell' | 'shield' | 'deflect';
  triggeredBy: string;     // ID du combattant déclencheur
  targetId: string;        // ID du combattant qui peut réagir
  context: Record<string, unknown>;
}

export interface ReactionResult {
  used: boolean;
  type: string;
  effect: string;
  damage?: number;
  acBonus?: number;
  interrupted?: boolean;
}
