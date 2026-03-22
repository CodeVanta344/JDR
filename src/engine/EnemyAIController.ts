/**
 * ENEMY AI CONTROLLER - Aethelgard d100
 * Remplace l'IA basique (walk toward nearest, pick first action) par un système tactique
 *
 * Profils: brute, ranged, caster, support, boss, minion
 * Features: threat assessment, target priority, self-preservation, formation awareness
 */

import type { Combatant, CombatAbility, EnemyAIProfile } from './types';
import { validateAction } from './CombatEngine';

// ============================================================
// TYPES
// ============================================================

export interface AIDecision {
  moves: { x: number; y: number }[];
  action: CombatAbility | null;
  target: Combatant | null;
  reasoning: string;
}

interface ThreatEntry {
  combatant: Combatant;
  threatScore: number;
  distance: number;
  isHealer: boolean;
  isCaster: boolean;
  hpPercent: number;
}

// ============================================================
// AI PROFILES - Comportements par type d'ennemi
// ============================================================

const AI_PROFILES: Record<EnemyAIProfile, {
  preferredRange: 'melee' | 'ranged' | 'any';
  targetPriority: 'closest' | 'lowest_hp' | 'highest_threat' | 'healer_first' | 'caster_first';
  selfPreservation: number;   // 0-1: chance de fuir/heal quand HP faible
  abilityPreference: number;  // 0-1: chance d'utiliser ability vs attaque basique
  clusterAversion: number;    // 0-1: éviter les regroupements (vs AoE)
  description: string;
}> = {
  brute: {
    preferredRange: 'melee',
    targetPriority: 'closest',
    selfPreservation: 0.1,
    abilityPreference: 0.3,
    clusterAversion: 0.1,
    description: 'Rush and smash - prioritize melee, low self-preservation',
  },
  ranged: {
    preferredRange: 'ranged',
    targetPriority: 'lowest_hp',
    selfPreservation: 0.5,
    abilityPreference: 0.5,
    clusterAversion: 0.7,
    description: 'Maintain distance, target weak enemies, kite melee',
  },
  caster: {
    preferredRange: 'ranged',
    targetPriority: 'caster_first',
    selfPreservation: 0.7,
    abilityPreference: 0.9,
    clusterAversion: 0.8,
    description: 'Stay back, use AoE on clusters, prioritize enemy casters',
  },
  support: {
    preferredRange: 'any',
    targetPriority: 'healer_first',
    selfPreservation: 0.6,
    abilityPreference: 0.8,
    clusterAversion: 0.5,
    description: 'Heal injured allies, buff strongest ally',
  },
  boss: {
    preferredRange: 'any',
    targetPriority: 'highest_threat',
    selfPreservation: 0.3,
    abilityPreference: 0.7,
    clusterAversion: 0.2,
    description: 'Target highest threat, use powerful abilities, multi-phase',
  },
  minion: {
    preferredRange: 'melee',
    targetPriority: 'closest',
    selfPreservation: 0,
    abilityPreference: 0.1,
    clusterAversion: 0,
    description: 'Swarm nearest target, expendable',
  },
};

// ============================================================
// MAIN DECISION FUNCTION
// ============================================================

/**
 * Décider le tour d'un ennemi: mouvement + action + cible
 */
export function decideEnemyTurn(
  enemy: Combatant,
  allCombatants: Combatant[],
  gridSize: { width: number; height: number } = { width: 10, height: 10 },
  isTileValidFn?: (x: number, y: number) => boolean,
  isTileOccupiedFn?: (x: number, y: number, excludeId: string) => boolean
): AIDecision {
  const profile = AI_PROFILES[enemy.aiProfile || 'brute'];
  const players = allCombatants.filter(c => c.isPlayer && c.isAlive);
  const allies = allCombatants.filter(c => !c.isPlayer && c.isAlive && c.id !== enemy.id);

  if (players.length === 0) {
    return { moves: [], action: null, target: null, reasoning: 'No targets alive' };
  }

  // 1. Assess threats
  const threats = assessThreats(enemy, players);

  // 2. Check self-preservation
  const hpPercent = (enemy.hp / enemy.maxHp) * 100;
  if (hpPercent < 25 && Math.random() < profile.selfPreservation) {
    // Try to heal or flee
    const healAction = findHealAction(enemy);
    if (healAction) {
      return {
        moves: [],
        action: healAction,
        target: enemy,
        reasoning: `Self-preservation: HP at ${hpPercent.toFixed(0)}%, using ${healAction.name}`,
      };
    }
    // Flee: move away from nearest player
    if (profile.selfPreservation > 0.5) {
      const fleeMoves = computeFleeMoves(enemy, threats[0]?.combatant, gridSize, isTileValidFn, isTileOccupiedFn);
      return {
        moves: fleeMoves,
        action: null,
        target: null,
        reasoning: `Fleeing: HP at ${hpPercent.toFixed(0)}%`,
      };
    }
  }

  // 3. Support behavior: heal injured allies
  if (profile.targetPriority === 'healer_first' || enemy.aiProfile === 'support') {
    const injuredAlly = findMostInjuredAlly(enemy, allies);
    if (injuredAlly && injuredAlly.hp / injuredAlly.maxHp < 0.5) {
      const healAction = findHealAction(enemy);
      if (healAction) {
        const movesToAlly = computeMovesToTarget(enemy, injuredAlly, gridSize, isTileValidFn, isTileOccupiedFn, healAction.range || 1);
        return {
          moves: movesToAlly,
          action: healAction,
          target: injuredAlly,
          reasoning: `Support: healing ${injuredAlly.name} (${(injuredAlly.hp / injuredAlly.maxHp * 100).toFixed(0)}% HP)`,
        };
      }
    }
  }

  // 4. Select target based on profile
  const selectedTarget = selectTarget(enemy, threats, profile);
  if (!selectedTarget) {
    return { moves: [], action: null, target: null, reasoning: 'No valid target found' };
  }

  // 5. Select action
  const selectedAction = selectAction(enemy, selectedTarget, profile);

  // 6. Compute movement
  const actionRange = selectedAction?.range || 1.5;
  let moves: { x: number; y: number }[] = [];

  if (profile.preferredRange === 'ranged') {
    // Ranged: maintain optimal distance (range - 1 tiles away)
    const dist = getDistance(enemy, selectedTarget);
    if (dist < 2 && actionRange > 2) {
      // Too close, kite away
      moves = computeFleeMoves(enemy, selectedTarget, gridSize, isTileValidFn, isTileOccupiedFn, Math.min(enemy.currentPM || 3, 2));
    } else if (dist > actionRange) {
      // Too far, close in slightly
      moves = computeMovesToTarget(enemy, selectedTarget, gridSize, isTileValidFn, isTileOccupiedFn, actionRange);
    }
    // Otherwise stay put (good range)
  } else {
    // Melee: close distance to target
    moves = computeMovesToTarget(enemy, selectedTarget, gridSize, isTileValidFn, isTileOccupiedFn, actionRange);
  }

  // 7. Check if AoE would hit multiple targets
  if (selectedAction?.aoe && selectedAction.target === 'area') {
    const aoeTarget = findBestAoETarget(enemy, players, selectedAction);
    if (aoeTarget) {
      return {
        moves,
        action: selectedAction,
        target: aoeTarget,
        reasoning: `AoE: ${selectedAction.name} targeting cluster near ${aoeTarget.name}`,
      };
    }
  }

  // 8. Final validation
  if (selectedAction) {
    const validation = validateAction(enemy, selectedAction, selectedTarget);
    if (!validation.valid) {
      // Fallback to basic attack
      const basicAttack = { name: 'Attaque', cost: 0, cooldown: 0, level: 1, range: 1.5, target: 'enemy' as const } as CombatAbility;
      return {
        moves,
        action: basicAttack,
        target: selectedTarget,
        reasoning: `Fallback: ${selectedAction.name} invalid (${validation.reason}), using basic attack`,
      };
    }
  }

  return {
    moves,
    action: selectedAction || { name: 'Attaque', cost: 0, cooldown: 0, level: 1, range: 1.5, target: 'enemy' as const } as CombatAbility,
    target: selectedTarget,
    reasoning: `${profile.description}: ${selectedAction?.name || 'Attaque'} on ${selectedTarget.name}`,
  };
}

// ============================================================
// THREAT ASSESSMENT
// ============================================================

function assessThreats(enemy: Combatant, players: Combatant[]): ThreatEntry[] {
  return players.map(p => {
    let threatScore = 0;

    // Damage potential (high STR/DEX/INT = higher threat)
    const maxOffStat = Math.max(p.str || 10, p.dex || 10, p.int || 10);
    threatScore += maxOffStat * 2;

    // Level threat
    threatScore += (p.level || 1) * 5;

    // Healer bonus threat (healers are priority targets)
    const isHealer = (p.class || '').toLowerCase().includes('clerc') ||
                     (p.class || '').toLowerCase().includes('druide') ||
                     p.abilities?.some(a => a.heal);
    if (isHealer) threatScore += 30;

    // Caster bonus
    const isCaster = (p.class || '').toLowerCase().includes('mage') ||
                     (p.class || '').toLowerCase().includes('barde');
    if (isCaster) threatScore += 20;

    // Low HP = easier kill (finisher targets)
    const hpPercent = p.hp / p.maxHp;
    if (hpPercent < 0.3) threatScore += 25;

    // Distance penalty (closer = easier)
    const dist = getDistance(enemy, p);
    threatScore -= dist * 3;

    return {
      combatant: p,
      threatScore,
      distance: dist,
      isHealer,
      isCaster,
      hpPercent,
    };
  }).sort((a, b) => b.threatScore - a.threatScore);
}

// ============================================================
// TARGET SELECTION
// ============================================================

function selectTarget(
  enemy: Combatant,
  threats: ThreatEntry[],
  profile: typeof AI_PROFILES[keyof typeof AI_PROFILES]
): Combatant {
  switch (profile.targetPriority) {
    case 'healer_first': {
      const healer = threats.find(t => t.isHealer);
      return healer?.combatant || threats[0]?.combatant;
    }
    case 'caster_first': {
      const caster = threats.find(t => t.isCaster);
      return caster?.combatant || threats[0]?.combatant;
    }
    case 'lowest_hp': {
      const sorted = [...threats].sort((a, b) => a.hpPercent - b.hpPercent);
      return sorted[0]?.combatant;
    }
    case 'highest_threat': {
      return threats[0]?.combatant; // Already sorted by threat
    }
    case 'closest':
    default: {
      const sorted = [...threats].sort((a, b) => a.distance - b.distance);
      return sorted[0]?.combatant;
    }
  }
}

// ============================================================
// ACTION SELECTION
// ============================================================

function selectAction(
  enemy: Combatant,
  target: Combatant,
  profile: typeof AI_PROFILES[keyof typeof AI_PROFILES]
): CombatAbility | null {
  const actions = enemy.abilities || [];
  const dist = getDistance(enemy, target);

  // Filter available actions (resource + cooldown + level + range feasible)
  const available = actions.filter(a => {
    if (a.cost > (enemy.resource || 0)) return false;
    if ((enemy.cooldowns?.[a.name] || 0) > 0) return false;
    if (a.level && a.level > (enemy.level || 1)) return false;
    if (a.target === 'self') return false; // Self-buffs handled separately
    return true;
  });

  if (available.length === 0) {
    return { name: 'Attaque', cost: 0, cooldown: 0, level: 1, range: 1.5, target: 'enemy' } as CombatAbility;
  }

  // Decide: use ability or basic attack
  const useAbility = Math.random() < profile.abilityPreference;

  if (!useAbility) {
    return { name: 'Attaque', cost: 0, cooldown: 0, level: 1, range: 1.5, target: 'enemy' } as CombatAbility;
  }

  // Score each action
  const scored = available.map(a => {
    let score = 0;
    const range = a.range || 1.5;

    // In range bonus
    if (dist <= range) score += 20;

    // AoE bonus if multiple targets nearby
    if (a.aoe) score += 15;

    // Status effect bonus
    if (a.statusEffect) score += 10;

    // Damage dice bonus (higher = better)
    if (a.damage_dice || a.dice) {
      const diceStr = a.damage_dice || a.dice || '1d4';
      const match = diceStr.match(/(\d+)d(\d+)/);
      if (match) score += parseInt(match[1]) * parseInt(match[2]) / 5;
    }

    // Cooldown penalty (long cooldown = save for important moments)
    score -= (a.cooldown || 0) * 2;

    // Cost efficiency
    score -= (a.cost || 0) / 5;

    return { action: a, score };
  }).sort((a, b) => b.score - a.score);

  // Pick best action (with slight randomness for unpredictability)
  const topActions = scored.slice(0, 3);
  const idx = Math.random() < 0.7 ? 0 : Math.floor(Math.random() * topActions.length);
  return topActions[idx]?.action || available[0];
}

// ============================================================
// MOVEMENT
// ============================================================

function computeMovesToTarget(
  actor: Combatant,
  target: Combatant,
  gridSize: { width: number; height: number },
  isTileValidFn?: (x: number, y: number) => boolean,
  isTileOccupiedFn?: (x: number, y: number, excludeId: string) => boolean,
  desiredRange: number = 1.5
): { x: number; y: number }[] {
  const moves: { x: number; y: number }[] = [];
  let curX = actor.posX;
  let curY = actor.posY;
  let stepsLeft = actor.currentPM || 5;

  while (stepsLeft > 0) {
    const dist = Math.sqrt((curX - target.posX) ** 2 + (curY - target.posY) ** 2);
    if (dist <= desiredRange) break;

    const dx = Math.sign(target.posX - curX);
    const dy = Math.sign(target.posY - curY);

    let moved = false;
    // Try primary direction first
    if (Math.abs(target.posX - curX) >= Math.abs(target.posY - curY)) {
      if (dx !== 0 && isValidMove(curX + dx, curY, actor.id, gridSize, isTileValidFn, isTileOccupiedFn)) {
        curX += dx; moved = true;
      } else if (dy !== 0 && isValidMove(curX, curY + dy, actor.id, gridSize, isTileValidFn, isTileOccupiedFn)) {
        curY += dy; moved = true;
      }
    } else {
      if (dy !== 0 && isValidMove(curX, curY + dy, actor.id, gridSize, isTileValidFn, isTileOccupiedFn)) {
        curY += dy; moved = true;
      } else if (dx !== 0 && isValidMove(curX + dx, curY, actor.id, gridSize, isTileValidFn, isTileOccupiedFn)) {
        curX += dx; moved = true;
      }
    }

    if (!moved) break;
    moves.push({ x: curX, y: curY });
    stepsLeft--;
  }

  return moves;
}

function computeFleeMoves(
  actor: Combatant,
  threat: Combatant | undefined,
  gridSize: { width: number; height: number },
  isTileValidFn?: (x: number, y: number) => boolean,
  isTileOccupiedFn?: (x: number, y: number, excludeId: string) => boolean,
  maxSteps?: number
): { x: number; y: number }[] {
  if (!threat) return [];
  const moves: { x: number; y: number }[] = [];
  let curX = actor.posX;
  let curY = actor.posY;
  let stepsLeft = maxSteps ?? (actor.currentPM || 5);

  while (stepsLeft > 0) {
    // Move away from threat
    const dx = Math.sign(curX - threat.posX) || 1;
    const dy = Math.sign(curY - threat.posY) || 1;

    let moved = false;
    if (isValidMove(curX + dx, curY, actor.id, gridSize, isTileValidFn, isTileOccupiedFn)) {
      curX += dx; moved = true;
    } else if (isValidMove(curX, curY + dy, actor.id, gridSize, isTileValidFn, isTileOccupiedFn)) {
      curY += dy; moved = true;
    }

    if (!moved) break;
    moves.push({ x: curX, y: curY });
    stepsLeft--;
  }

  return moves;
}

// ============================================================
// HELPERS
// ============================================================

function getDistance(a: Combatant, b: Combatant): number {
  return Math.sqrt((a.posX - b.posX) ** 2 + (a.posY - b.posY) ** 2);
}

function findHealAction(enemy: Combatant): CombatAbility | null {
  return (enemy.abilities || []).find(a =>
    a.heal && a.cost <= (enemy.resource || 0) && !(enemy.cooldowns?.[a.name])
  ) || null;
}

function findMostInjuredAlly(self: Combatant, allies: Combatant[]): Combatant | null {
  const injured = allies
    .filter(a => a.hp < a.maxHp && a.isAlive)
    .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
  return injured[0] || null;
}

function findBestAoETarget(
  caster: Combatant,
  targets: Combatant[],
  action: CombatAbility
): Combatant | null {
  if (!action.aoe) return null;
  const radius = action.aoe.radius || 2;

  let bestTarget: Combatant | null = null;
  let bestCount = 0;

  for (const t of targets) {
    const inRange = targets.filter(other =>
      Math.sqrt((t.posX - other.posX) ** 2 + (t.posY - other.posY) ** 2) <= radius
    ).length;
    if (inRange > bestCount) {
      bestCount = inRange;
      bestTarget = t;
    }
  }

  return bestCount >= 2 ? bestTarget : null;
}

function isValidMove(
  x: number, y: number,
  actorId: string,
  gridSize: { width: number; height: number },
  isTileValidFn?: (x: number, y: number) => boolean,
  isTileOccupiedFn?: (x: number, y: number, excludeId: string) => boolean
): boolean {
  if (x < 0 || y < 0 || x >= gridSize.width || y >= gridSize.height) return false;
  if (isTileValidFn && !isTileValidFn(x, y)) return false;
  if (isTileOccupiedFn && isTileOccupiedFn(x, y, actorId)) return false;
  return true;
}
