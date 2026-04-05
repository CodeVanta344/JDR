/**
 * CARD COMBAT ENGINE — Slay the Spire style
 * Pure functions, no React. Immutable state transitions.
 */

import { Card, getStarterDeck, getRewardCards } from '../data/cards';

// ============================================================
// TYPES
// ============================================================

export interface EnemyIntention {
  type: 'attack' | 'block' | 'buff' | 'debuff';
  value: number;
  icon: string; // emoji
}

export interface CombatEnemy {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  block: number;
  poison: number;
  weak: number;       // turns of weakness (deal 25% less damage)
  vulnerable: number; // turns of vulnerability (take 50% more damage)
  pattern: EnemyIntention[];
  patternIndex: number;
  portrait_url?: string;
  dead: boolean;
}

export interface PlayerState {
  hp: number;
  maxHp: number;
  block: number;
  energy: number;
  maxEnergy: number;
  strength: number;   // bonus damage per attack
  dexterity: number;  // bonus block per skill
  poison: number;
  weak: number;
  vulnerable: number;
}

export interface CombatState {
  player: PlayerState;
  enemies: CombatEnemy[];
  deck: Card[];
  hand: Card[];
  discard: Card[];
  exhaust: Card[];
  turn: number;
  phase: 'player' | 'enemy_animating' | 'reward' | 'victory' | 'defeat';
  log: string[];
  selectedCardIndex: number | null;
  rewardCards: Card[];
  diceRoll: { active: boolean; die: 'd20' | 'd100'; result: number; cardIndex: number; targetIndex: number } | null;
}

// ============================================================
// HELPERS
// ============================================================

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rollDie(die: 'd20' | 'd100'): number {
  return die === 'd20'
    ? Math.floor(Math.random() * 20) + 1
    : Math.floor(Math.random() * 100) + 1;
}

// ============================================================
// ENEMY PATTERNS
// ============================================================

function generatePattern(enemy: any): EnemyIntention[] {
  const atk = enemy.atk || enemy.stats?.str || 8;
  const level = enemy.level || enemy.cr || 1;
  const baseDmg = Math.max(4, Math.floor(atk * (1 + level * 0.1)));

  // Simple alternating pattern — attack, attack, block, repeat
  return [
    { type: 'attack', value: baseDmg, icon: '⚔️' },
    { type: 'attack', value: Math.floor(baseDmg * 0.8), icon: '⚔️' },
    { type: 'block', value: Math.floor(baseDmg * 0.6), icon: '🛡️' },
    { type: 'attack', value: Math.floor(baseDmg * 1.3), icon: '💥' },
    { type: 'buff', value: 1, icon: '💪' },
  ];
}

// ============================================================
// INIT
// ============================================================

export function initCombat(player: any, rawEnemies: any[]): CombatState {
  const deck = shuffle(getStarterDeck(player.class || player.className || ''));

  const hand = deck.slice(0, 5);
  const remaining = deck.slice(5);

  const enemies: CombatEnemy[] = rawEnemies.map((e, i) => ({
    id: e.id || `enemy_${i}`,
    name: e.name || `Ennemi ${i + 1}`,
    hp: e.hp || e.maxHp || 20,
    maxHp: e.maxHp || e.hp || 20,
    block: 0,
    poison: 0,
    weak: 0,
    vulnerable: 0,
    pattern: generatePattern(e),
    patternIndex: 0,
    portrait_url: e.portrait_url || e.portrait,
    dead: false,
  }));

  return {
    player: {
      hp: player.hp || player.stats?.hp || 50,
      maxHp: player.maxHp || player.max_hp || player.stats?.maxHp || 50,
      block: 0,
      energy: 3,
      maxEnergy: 3,
      strength: 0,
      dexterity: 0,
      poison: 0,
      weak: 0,
      vulnerable: 0,
    },
    enemies,
    deck: remaining,
    hand,
    discard: [],
    exhaust: [],
    turn: 1,
    phase: 'player',
    log: ['⚔️ Le combat commence !'],
    selectedCardIndex: null,
    rewardCards: [],
    diceRoll: null,
  };
}

// ============================================================
// DRAW CARDS
// ============================================================

export function drawCards(state: CombatState, count: number): CombatState {
  let { deck, hand, discard } = state;
  deck = [...deck];
  hand = [...hand];
  discard = [...discard];

  for (let i = 0; i < count; i++) {
    if (deck.length === 0) {
      if (discard.length === 0) break;
      deck = shuffle(discard);
      discard = [];
    }
    hand.push(deck.shift()!);
  }

  return { ...state, deck, hand, discard };
}

// ============================================================
// PLAY CARD
// ============================================================

export function playCard(state: CombatState, cardIndex: number, targetIndex: number = 0): CombatState {
  if (state.phase !== 'player') return state;

  const card = state.hand[cardIndex];
  if (!card || card.cost < 0) return state; // curse = unplayable
  if (card.cost > state.player.energy) return state;

  // Check if dice roll is needed
  if (card.diceRoll && !state.diceRoll) {
    return {
      ...state,
      diceRoll: {
        active: true,
        die: card.diceRoll.die,
        result: rollDie(card.diceRoll.die),
        cardIndex,
        targetIndex,
      },
    };
  }

  let newState = { ...state };
  let player = { ...newState.player };
  let enemies = newState.enemies.map(e => ({ ...e }));
  const log = [...newState.log];
  let extraDraw = 0;

  // Consume energy
  player.energy -= card.cost;

  // Dice damage override
  let diceDamage = 0;
  if (state.diceRoll && card.diceRoll) {
    const roll = state.diceRoll.result;
    if (card.id === 'roulette_arcane') {
      // Special: d100 threshold
      diceDamage = roll < 50 ? 8 : 20;
      if (roll >= 50) {
        enemies[targetIndex].poison += 4;
        log.push(`🎲 d100 = ${roll} → 20 dégâts + 4 Poison !`);
      } else {
        log.push(`🎲 d100 = ${roll} → 8 dégâts`);
      }
    } else {
      diceDamage = roll * (card.diceRoll.multiplier || 1) + (card.diceRoll.bonus || 0);
      log.push(`🎲 ${card.diceRoll.die} = ${roll} → ${diceDamage} dégâts`);
    }
  }

  // Apply effects
  for (const effect of card.effects) {
    const target = effect.target || 'enemy';

    switch (effect.type) {
      case 'damage': {
        const baseDmg = diceDamage > 0 ? diceDamage : effect.value;
        let dmg = baseDmg + player.strength;
        if (player.weak > 0) dmg = Math.floor(dmg * 0.75);

        if (target === 'all_enemies') {
          enemies.forEach((e, i) => {
            if (!e.dead) {
              let finalDmg = dmg;
              if (e.vulnerable > 0) finalDmg = Math.floor(finalDmg * 1.5);
              const blocked = Math.min(e.block, finalDmg);
              e.block -= blocked;
              e.hp -= (finalDmg - blocked);
              if (e.hp <= 0) { e.hp = 0; e.dead = true; }
              log.push(`💥 ${card.name} → ${e.name} : -${finalDmg - blocked} PV`);
            }
          });
        } else {
          const e = enemies[targetIndex];
          if (e && !e.dead) {
            let finalDmg = dmg;
            if (e.vulnerable > 0) finalDmg = Math.floor(finalDmg * 1.5);
            const blocked = Math.min(e.block, finalDmg);
            e.block -= blocked;
            e.hp -= (finalDmg - blocked);
            if (e.hp <= 0) { e.hp = 0; e.dead = true; }
            log.push(`⚔️ ${card.name} → ${e.name} : -${finalDmg - blocked} PV${blocked > 0 ? ` (${blocked} bloqué)` : ''}`);
          }
        }
        break;
      }
      case 'block': {
        const blk = effect.value + player.dexterity;
        player.block += blk;
        log.push(`🛡️ ${card.name} : +${blk} Blocage`);
        break;
      }
      case 'heal': {
        const heal = Math.min(effect.value, player.maxHp - player.hp);
        player.hp += heal;
        log.push(`💖 ${card.name} : +${heal} PV`);
        break;
      }
      case 'draw':
        extraDraw += effect.value;
        break;
      case 'energy':
        player.energy += effect.value;
        break;
      case 'poison':
        if (target === 'enemy') {
          enemies[targetIndex].poison += effect.value;
          log.push(`☠️ ${card.name} : +${effect.value} Poison sur ${enemies[targetIndex].name}`);
        }
        break;
      case 'weak':
        if (target === 'enemy') {
          enemies[targetIndex].weak += effect.value;
          log.push(`😵 +${effect.value} Faiblesse sur ${enemies[targetIndex].name}`);
        }
        break;
      case 'vulnerable':
        if (target === 'enemy') {
          enemies[targetIndex].vulnerable += effect.value;
          log.push(`🎯 +${effect.value} Vulnérabilité sur ${enemies[targetIndex].name}`);
        }
        break;
      case 'strength':
        player.strength += effect.value;
        log.push(`💪 +${effect.value} Force (permanent)`);
        break;
      case 'dexterity':
        player.dexterity += effect.value;
        log.push(`🏃 +${effect.value} Dextérité (permanent)`);
        break;
    }
  }

  // Move card to discard or exhaust
  const newHand = newState.hand.filter((_, i) => i !== cardIndex);
  const newDiscard = card.exhaust ? [...newState.discard] : [...newState.discard, card];
  const newExhaust = card.exhaust ? [...newState.exhaust, card] : [...newState.exhaust];

  newState = {
    ...newState,
    player,
    enemies,
    hand: newHand,
    discard: newDiscard,
    exhaust: newExhaust,
    log,
    selectedCardIndex: null,
    diceRoll: null,
  };

  // Draw extra cards
  if (extraDraw > 0) {
    newState = drawCards(newState, extraDraw);
    log.push(`🃏 Pioche ${extraDraw} carte(s)`);
  }

  // Check enemy kills
  if (card.id === 'execution' && enemies[targetIndex]?.dead) {
    player.energy = Math.min(player.maxEnergy, player.energy + 1);
    log.push(`⚡ Exécution réussie : +1 Énergie !`);
  }

  return checkCombatEnd(newState);
}

// ============================================================
// END PLAYER TURN → ENEMY TURN
// ============================================================

export function endPlayerTurn(state: CombatState): CombatState {
  if (state.phase !== 'player') return state;

  let player = { ...state.player };
  let enemies = state.enemies.map(e => ({ ...e }));
  const log = [...state.log];

  // Discard remaining hand
  const newDiscard = [...state.discard, ...state.hand];

  // Reset player block
  player.block = 0;

  // Apply poison to player
  if (player.poison > 0) {
    player.hp -= player.poison;
    log.push(`☠️ Poison : -${player.poison} PV`);
    player.poison--;
  }

  // Decrement player debuffs
  if (player.weak > 0) player.weak--;
  if (player.vulnerable > 0) player.vulnerable--;

  // Enemy turns
  log.push(`--- Tour ennemi ---`);
  for (const enemy of enemies) {
    if (enemy.dead) continue;

    // Apply poison to enemy
    if (enemy.poison > 0) {
      enemy.hp -= enemy.poison;
      log.push(`☠️ ${enemy.name} : -${enemy.poison} Poison`);
      enemy.poison--;
      if (enemy.hp <= 0) { enemy.hp = 0; enemy.dead = true; continue; }
    }

    // Reset enemy block
    enemy.block = 0;

    // Execute intention
    const intention = enemy.pattern[enemy.patternIndex % enemy.pattern.length];
    switch (intention.type) {
      case 'attack': {
        let dmg = intention.value;
        if (enemy.weak > 0) dmg = Math.floor(dmg * 0.75);
        if (player.vulnerable > 0) dmg = Math.floor(dmg * 1.5);

        const blocked = Math.min(player.block, dmg);
        player.block -= blocked;
        player.hp -= (dmg - blocked);
        log.push(`${intention.icon} ${enemy.name} attaque : ${dmg} dégâts${blocked > 0 ? ` (${blocked} bloqué)` : ''}`);
        break;
      }
      case 'block':
        enemy.block += intention.value;
        log.push(`🛡️ ${enemy.name} se défend : +${intention.value} Blocage`);
        break;
      case 'buff':
        // Simple: next attack deals more
        log.push(`💪 ${enemy.name} se renforce !`);
        break;
      case 'debuff':
        player.weak += 1;
        log.push(`😵 ${enemy.name} vous affaiblit !`);
        break;
    }

    // Decrement debuffs
    if (enemy.weak > 0) enemy.weak--;
    if (enemy.vulnerable > 0) enemy.vulnerable--;

    // Advance pattern
    enemy.patternIndex++;
  }

  // New turn: draw 5, reset energy
  let newState: CombatState = {
    ...state,
    player,
    enemies,
    hand: [],
    discard: newDiscard,
    turn: state.turn + 1,
    phase: 'enemy_animating', // briefly show enemy actions
    log,
    selectedCardIndex: null,
    diceRoll: null,
  };

  return checkCombatEnd(newState);
}

export function startNewPlayerTurn(state: CombatState): CombatState {
  let newState = {
    ...state,
    player: { ...state.player, energy: state.player.maxEnergy, block: 0 },
    phase: 'player' as const,
    log: [...state.log, `--- Tour ${state.turn} ---`],
  };

  // Reset player block was already done in endPlayerTurn
  // Draw 5 cards
  newState = drawCards(newState, 5);
  return newState;
}

// ============================================================
// CHECK COMBAT END
// ============================================================

function checkCombatEnd(state: CombatState): CombatState {
  if (state.player.hp <= 0) {
    return { ...state, phase: 'defeat', log: [...state.log, '💀 Défaite...'] };
  }

  const allDead = state.enemies.every(e => e.dead);
  if (allDead) {
    return {
      ...state,
      phase: 'victory',
      rewardCards: getRewardCards(3),
      log: [...state.log, '🏆 Victoire !'],
    };
  }

  return state;
}

// ============================================================
// GET NEXT ENEMY INTENTION (for display)
// ============================================================

export function getEnemyIntention(enemy: CombatEnemy): EnemyIntention {
  return enemy.pattern[enemy.patternIndex % enemy.pattern.length];
}
