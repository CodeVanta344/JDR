/**
 * Level-based combat dice progression and enemy scaling.
 */

const LEVEL_TIERS = [
  {
    key: 'novice',
    minLevel: 1,
    maxLevel: 4,
    attackDice: { normal: '1d4', prioritized: '1d6' },
    damageDice: { normal: '1d4', prioritized: '1d6' },
    enemyScaling: { hpMultiplier: 0.85, atkMultiplier: 0.9, acBonus: -2 },
    damageCap: 35
  },
  {
    key: 'adept',
    minLevel: 5,
    maxLevel: 9,
    attackDice: { normal: '1d10', prioritized: '1d20' },
    damageDice: { normal: '1d10', prioritized: '1d20' },
    enemyScaling: { hpMultiplier: 1, atkMultiplier: 1, acBonus: 0 },
    damageCap: 60
  },
  {
    key: 'veteran',
    minLevel: 10,
    maxLevel: 14,
    attackDice: { normal: '1d30', prioritized: '1d40' },
    damageDice: { normal: '1d20', prioritized: '1d30' },
    enemyScaling: { hpMultiplier: 1.35, atkMultiplier: 1.2, acBonus: 3 },
    damageCap: 95
  },
  {
    key: 'expert',
    minLevel: 15,
    maxLevel: 19,
    attackDice: { normal: '1d50', prioritized: '1d60' },
    damageDice: { normal: '1d30', prioritized: '1d40' },
    enemyScaling: { hpMultiplier: 1.7, atkMultiplier: 1.4, acBonus: 6 },
    damageCap: 140
  },
  {
    key: 'master',
    minLevel: 20,
    maxLevel: 24,
    attackDice: { normal: '1d70', prioritized: '1d80' },
    damageDice: { normal: '1d40', prioritized: '1d60' },
    enemyScaling: { hpMultiplier: 2.1, atkMultiplier: 1.65, acBonus: 10 },
    damageCap: 200
  },
  {
    key: 'legend',
    minLevel: 25,
    maxLevel: 30,
    attackDice: { normal: '1d100', prioritized: '1d100' },
    damageDice: { normal: '1d80', prioritized: '1d100' },
    enemyScaling: { hpMultiplier: 2.6, atkMultiplier: 1.95, acBonus: 14 },
    damageCap: 280
  }
];

const clampLevel = (level) => Math.max(1, Math.min(30, Number(level) || 1));

export const getDiceTierForLevel = (level) => {
  const safeLevel = clampLevel(level);
  return LEVEL_TIERS.find((tier) => safeLevel >= tier.minLevel && safeLevel <= tier.maxLevel) || LEVEL_TIERS[0];
};

const normalize = (value) => (value || '').toString().trim().toLowerCase();

const getDominantStat = (attacker = {}) => {
  const entries = [
    ['str', Number(attacker?.str) || 0],
    ['dex', Number(attacker?.dex) || 0],
    ['con', Number(attacker?.con) || 0],
    ['int', Number(attacker?.int) || 0],
    ['wis', Number(attacker?.wis) || 0],
    ['cha', Number(attacker?.cha) || 0]
  ];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0]?.[0] || 'str';
};

const actionIsPrioritized = (action = {}, attacker = {}) => {
  if (!action) return false;

  if (action.isPrioritized || action.prioritized || action.priority === 'high' || action.scaling === 'prioritized') {
    return true;
  }

  const scalingKey = normalize(action.scaling);
  if (scalingKey) {
    const dominantStat = getDominantStat(attacker);
    if (scalingKey === dominantStat || scalingKey.includes(dominantStat)) {
      return true;
    }
  }

  const actionName = normalize(action.name);
  if (!actionName) return false;

  const prioritizedSkills = attacker.prioritizedSkills || attacker.prioritized_skills || [];
  if (Array.isArray(prioritizedSkills)) {
    if (prioritizedSkills.some((skill) => normalize(skill) === actionName)) {
      return true;
    }
  }

  const skillBonuses = attacker.skill_bonuses || [];
  if (Array.isArray(skillBonuses)) {
    return skillBonuses.some((bonus) => normalize(bonus?.name || bonus?.skill) === actionName);
  }

  return false;
};

export const resolveAttackDice = ({ level = 1, action = null, attacker = null } = {}) => {
  const tier = getDiceTierForLevel(level);
  const prioritized = actionIsPrioritized(action, attacker || {});
  return {
    dice: prioritized ? tier.attackDice.prioritized : tier.attackDice.normal,
    tier,
    prioritized
  };
};

export const resolveDamageCap = (level = 1) => {
  const tier = getDiceTierForLevel(level);
  return { cap: tier.damageCap || 9999, tier };
};

export const resolveDamageDice = ({ level = 1, action = null, attacker = null } = {}) => {
  const tier = getDiceTierForLevel(level);
  const prioritized = actionIsPrioritized(action, attacker || {});
  return {
    dice: prioritized ? tier.damageDice.prioritized : tier.damageDice.normal,
    tier,
    prioritized
  };
};

const roundAtLeastOne = (value) => Math.max(1, Math.round(value));

const normalizeEnemyAc = (ac = 12) => {
  if (ac >= 20) return ac;
  return Math.round((ac * 2.5) + 10);
};

const normalizeEnemyAtk = (atk = 5) => {
  if (atk >= 10) return atk;
  return Math.round(atk * 2.5);
};

const normalizeEnemyHp = (hp = 20) => {
  if (hp >= 100) return hp;
  return hp * 5;
};

export const scaleEnemyForPartyLevel = (enemy, partyLevel = 1) => {
  const tier = getDiceTierForLevel(partyLevel);
  const baseHp = normalizeEnemyHp(enemy.hp || enemy.maxHp || 20);
  const baseAtk = normalizeEnemyAtk(enemy.atk || 5);
  const baseAc = normalizeEnemyAc(enemy.ac || 12);

  const hp = roundAtLeastOne(baseHp * tier.enemyScaling.hpMultiplier);
  const atk = roundAtLeastOne(baseAtk * tier.enemyScaling.atkMultiplier);
  const ac = roundAtLeastOne(baseAc + tier.enemyScaling.acBonus);

  return {
    ...enemy,
    hp,
    maxHp: hp,
    atk,
    ac,
    scalingTier: tier.key
  };
};

export const getPartyAverageLevel = (players = []) => {
  if (!Array.isArray(players) || players.length === 0) return 1;
  const total = players.reduce((sum, p) => sum + (Number(p?.level) || 1), 0);
  return Math.max(1, Math.round(total / players.length));
};
