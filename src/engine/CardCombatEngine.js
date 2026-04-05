/**
 * CARD COMBAT ENGINE — Slay the Spire style, MULTIPLAYER COOP
 * Pure JS, no TypeScript. Immutable state transitions.
 */

import { getStarterDeck, getRewardCards, inventoryToCards } from '../data/cards.js';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rollDie(die) {
  return die === 'd20' ? Math.floor(Math.random() * 20) + 1 : Math.floor(Math.random() * 100) + 1;
}

function computeEquipmentBonus(player, stat) {
  return (player.inventory || []).reduce((sum, item) =>
    sum + (item.equipped && item.stats ? (item.stats[stat] || 0) : 0), 0);
}

function computeEquipmentAC(player) {
  return (player.inventory || []).reduce((sum, item) =>
    sum + (item.equipped && item.stats?.armor ? item.stats.armor : 0), 0);
}

function generatePattern(enemy, playerIds) {
  const atk = enemy.atk || enemy.stats?.str || 8;
  const cr = enemy.level || enemy.cr || 1;
  const baseDmg = Math.max(4, Math.min(Math.floor(atk * (1 + cr * 0.12)), atk * 3));
  const baseBlock = Math.max(3, Math.floor(baseDmg * 0.5));
  const rndTarget = () => playerIds[Math.floor(Math.random() * playerIds.length)];

  if (cr >= 10) {
    return [
      { type: 'attack', value: Math.floor(baseDmg * 1.2), icon: '💥', targetPlayerId: rndTarget() },
      { type: 'block', value: baseBlock * 2, icon: '🛡️' },
      { type: 'attack', value: baseDmg, icon: '⚔️', targetPlayerId: rndTarget() },
      { type: 'debuff', value: 1, icon: '😵', targetPlayerId: rndTarget() },
      { type: 'attack', value: Math.floor(baseDmg * 1.5), icon: '💥', targetPlayerId: rndTarget() },
    ];
  }
  if (cr >= 5) {
    return [
      { type: 'attack', value: baseDmg, icon: '⚔️', targetPlayerId: playerIds[0] },
      { type: 'attack', value: Math.floor(baseDmg * 0.8), icon: '⚔️', targetPlayerId: rndTarget() },
      { type: 'block', value: baseBlock, icon: '🛡️' },
      { type: 'attack', value: Math.floor(baseDmg * 1.3), icon: '💥', targetPlayerId: rndTarget() },
    ];
  }
  return [
    { type: 'attack', value: baseDmg, icon: '⚔️', targetPlayerId: playerIds[0] },
    { type: 'block', value: baseBlock, icon: '🛡️' },
    { type: 'attack', value: Math.floor(baseDmg * 0.7), icon: '⚔️', targetPlayerId: rndTarget() },
  ];
}

function drawCardsForPlayer(p, count) {
  let deck = [...p.deck];
  let hand = [...p.hand];
  let discard = [...p.discard];
  for (let i = 0; i < count; i++) {
    if (deck.length === 0) {
      if (discard.length === 0) break;
      deck = shuffle(discard);
      discard = [];
    }
    hand.push(deck.shift());
  }
  return { ...p, deck, hand, discard };
}

function checkCombatEnd(state) {
  if (state.players.every(p => p.dead)) {
    return { ...state, phase: 'defeat', log: [...state.log, '💀 Défaite...'] };
  }
  if (state.enemies.every(e => e.dead)) {
    return { ...state, phase: 'victory', rewardCards: getRewardCards(3), log: [...state.log, '🏆 Victoire !'] };
  }
  return state;
}

function executeEnemyPhase(state) {
  let players = state.players.map(p => ({ ...p }));
  let enemies = state.enemies.map(e => ({ ...e }));
  const log = [...state.log, '--- Tour des ennemis ---'];

  for (const enemy of enemies) {
    if (enemy.dead) continue;
    if (enemy.poison > 0) {
      const poisonDmg = enemy.poison * 2;
      enemy.hp -= poisonDmg;
      log.push(`☠️ ${enemy.name}: -${poisonDmg} Poison (${enemy.poison} stacks)`);
      enemy.poison = Math.max(0, enemy.poison - 1);
      if (enemy.hp <= 0) { enemy.hp = 0; enemy.dead = true; continue; }
    }
    enemy.block = 0;
    const intention = enemy.pattern[enemy.patternIndex % enemy.pattern.length];
    const alivePlayers = players.filter(p => !p.dead);
    if (alivePlayers.length === 0) break;
    const targetPlayer = alivePlayers.find(p => p.id === intention.targetPlayerId) || alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
    const tIdx = players.findIndex(p => p.id === targetPlayer.id);

    switch (intention.type) {
      case 'attack': {
        let dmg = intention.value;
        if (enemy.weak > 0) dmg = Math.floor(dmg * 0.75);
        if (players[tIdx].vulnerable > 0) dmg = Math.floor(dmg * 1.5);
        const bl = Math.min(players[tIdx].block, dmg);
        players[tIdx].block -= bl;
        players[tIdx].hp -= (dmg - bl);
        if (players[tIdx].hp <= 0) { players[tIdx].hp = 0; players[tIdx].dead = true; }
        log.push(`${intention.icon} ${enemy.name} → ${players[tIdx].name}: ${dmg} dmg${bl > 0 ? ` (${bl} bloqué)` : ''}`);
        break;
      }
      case 'block':
        enemy.block += intention.value;
        log.push(`🛡️ ${enemy.name}: +${intention.value} Block`);
        break;
      case 'buff':
        log.push(`💪 ${enemy.name} se renforce !`);
        break;
      case 'debuff':
        if (tIdx >= 0) { players[tIdx].weak += 1; log.push(`😵 ${enemy.name} affaiblit ${players[tIdx].name} !`); }
        break;
    }
    if (enemy.weak > 0) enemy.weak--;
    if (enemy.vulnerable > 0) enemy.vulnerable--;
    enemy.patternIndex++;
  }

  const newTurn = state.turn + 1;
  players = players.map(p => {
    if (p.dead) return p;
    let updated = { ...p, hasEndedTurn: false, block: 0 };
    return drawCardsForPlayer(updated, 5);
  });
  const firstAlive = players.findIndex(p => !p.dead);

  return checkCombatEnd({
    ...state, players, enemies, turn: newTurn,
    currentPlayerIndex: firstAlive >= 0 ? firstAlive : 0,
    phase: 'enemy_animating',
    log: [...log, `--- Round ${newTurn} ---`],
    selectedCardIndex: null, diceRoll: null, rewardCards: state.rewardCards,
  });
}

// ============================================================
// PUBLIC API
// ============================================================

export function initCombat(rawPlayers, rawEnemies) {
  const playerIds = rawPlayers.map(p => p.user_id || p.id || `p_${Math.random()}`);

  const players = rawPlayers.map((p, i) => {
    const abilities = p.abilities || p.unlockables || p.spells || [];
    const abilityCards = getStarterDeck(p.class || p.className || '', abilities, p.level || 1, p.classData || null, p.subclass || '');
    const itemCards = inventoryToCards(p.inventory || []);
    const fullDeck = shuffle([...abilityCards, ...itemCards]);
    return {
      id: playerIds[i],
      name: p.name || `Joueur ${i + 1}`,
      hp: p.hp || p.stats?.hp || 50,
      maxHp: p.maxHp || p.max_hp || p.stats?.maxHp || 50,
      block: computeEquipmentAC(p),
      energy: p.resource || p.max_resource || 100,
      maxEnergy: p.max_resource || 100,
      resourceName: p.resource_name || 'Mana',
      strength: computeEquipmentBonus(p, 'strength') + computeEquipmentBonus(p, 'attackBonus'),
      dexterity: computeEquipmentBonus(p, 'dexterity'),
      poison: 0, weak: 0, vulnerable: 0,
      deck: fullDeck.slice(5), hand: fullDeck.slice(0, 5),
      discard: [], exhaust: [],
      hasEndedTurn: false,
      portrait_url: p.portrait_url || p.portrait,
      dead: false,
    };
  });

  const enemies = rawEnemies.map((e, i) => ({
    id: e.id || `enemy_${i}`,
    name: e.name || `Ennemi ${i + 1}`,
    hp: e.hp || e.maxHp || 20, maxHp: e.maxHp || e.hp || 20,
    block: 0, poison: 0, weak: 0, vulnerable: 0,
    pattern: generatePattern(e, playerIds), patternIndex: 0,
    portrait_url: e.portrait_url || e.portrait, dead: false,
  }));

  return {
    players, enemies, currentPlayerIndex: 0, turn: 1, phase: 'player',
    log: ['⚔️ Le combat commence !'], selectedCardIndex: null, rewardCards: [], diceRoll: null,
  };
}

export function drawCards(state, count) {
  const idx = state.currentPlayerIndex;
  const players = state.players.map((p, i) => i === idx ? drawCardsForPlayer(p, count) : p);
  return { ...state, players };
}

export function playCard(state, cardIndex, targetIndex = 0) {
  if (state.phase !== 'player') return state;
  const pIdx = state.currentPlayerIndex;
  let player = { ...state.players[pIdx] };
  const card = player.hand[cardIndex];
  if (!card || card.cost < 0 || card.cost > player.energy) return state;

  if (card.diceRoll && !state.diceRoll) {
    return { ...state, diceRoll: { active: true, die: card.diceRoll.die, result: rollDie(card.diceRoll.die), cardIndex, targetIndex } };
  }

  let enemies = state.enemies.map(e => ({ ...e }));
  const log = [...state.log];
  let extraDraw = 0;
  player.energy -= card.cost;

  let diceDamage = 0;
  if (state.diceRoll && card.diceRoll) {
    const roll = state.diceRoll.result;
    if (card.id === 'roulette_arcane') {
      diceDamage = roll < 50 ? 8 : 20;
      if (roll >= 50) { enemies[targetIndex].poison += 4; log.push(`🎲 d100=${roll} → 20 dmg + 4 Poison !`); }
      else log.push(`🎲 d100=${roll} → 8 dmg`);
    } else {
      diceDamage = roll * (card.diceRoll.multiplier || 1) + (card.diceRoll.bonus || 0);
      log.push(`🎲 ${card.diceRoll.die}=${roll} → ${diceDamage} dmg`);
    }
  }

  for (const effect of card.effects) {
    const target = effect.target || 'enemy';
    switch (effect.type) {
      case 'damage': {
        const baseDmg = diceDamage > 0 ? diceDamage : effect.value;
        let dmg = baseDmg + player.strength;
        if (player.weak > 0) dmg = Math.floor(dmg * 0.75);
        if (target === 'all_enemies') {
          enemies.forEach(e => {
            if (!e.dead) {
              let fd = dmg; if (e.vulnerable > 0) fd = Math.floor(fd * 1.5);
              const bl = Math.min(e.block, fd); e.block -= bl; e.hp -= (fd - bl);
              if (e.hp <= 0) { e.hp = 0; e.dead = true; }
              log.push(`💥 ${player.name}: ${card.name} → ${e.name} -${fd - bl} PV`);
            }
          });
        } else {
          const e = enemies[targetIndex];
          if (e && !e.dead) {
            let fd = dmg; if (e.vulnerable > 0) fd = Math.floor(fd * 1.5);
            const bl = Math.min(e.block, fd); e.block -= bl; e.hp -= (fd - bl);
            if (e.hp <= 0) { e.hp = 0; e.dead = true; }
            log.push(`⚔️ ${player.name}: ${card.name} → ${e.name} -${fd - bl} PV`);
          }
        }
        break;
      }
      case 'block': { const blk = effect.value + player.dexterity; player.block += blk; log.push(`🛡️ ${player.name}: +${blk} Block`); break; }
      case 'heal': { const h = Math.min(effect.value, player.maxHp - player.hp); player.hp += h; log.push(`💖 ${player.name}: +${h} PV`); break; }
      case 'draw': extraDraw += effect.value; break;
      case 'energy': player.energy += effect.value; break;
      case 'poison': if (enemies[targetIndex]) { enemies[targetIndex].poison += effect.value; log.push(`☠️ +${effect.value} Poison → ${enemies[targetIndex].name}`); } break;
      case 'weak': if (enemies[targetIndex]) { enemies[targetIndex].weak += effect.value; } break;
      case 'vulnerable': if (enemies[targetIndex]) { enemies[targetIndex].vulnerable += effect.value; } break;
      case 'strength': player.strength += effect.value; log.push(`💪 ${player.name}: +${effect.value} Force`); break;
      case 'dexterity': player.dexterity += effect.value; log.push(`🏃 ${player.name}: +${effect.value} Dextérité`); break;
    }
  }

  player.hand = player.hand.filter((_, i) => i !== cardIndex);
  if (card.exhaust) player.exhaust = [...player.exhaust, card];
  else player.discard = [...player.discard, card];

  const players = state.players.map((p, i) => i === pIdx ? player : p);
  let newState = { ...state, players, enemies, log, selectedCardIndex: null, diceRoll: null };
  if (extraDraw > 0) { newState = drawCards(newState, extraDraw); }
  return checkCombatEnd(newState);
}

export function restTurn(state) {
  if (state.phase !== 'player') return state;
  const pIdx = state.currentPlayerIndex;
  let player = { ...state.players[pIdx] };
  const recovery = Math.floor(player.maxEnergy * 0.30);
  player.energy = Math.min(player.maxEnergy, player.energy + recovery);
  const log = [...state.log, `😴 ${player.name} se repose — +${recovery} ${player.resourceName}`];
  const players = state.players.map((p, i) => i === pIdx ? player : p);
  return endPlayerTurn({ ...state, players, log });
}

export function endPlayerTurn(state) {
  if (state.phase !== 'player') return state;
  const pIdx = state.currentPlayerIndex;
  let players = state.players.map((p, i) => {
    if (i !== pIdx) return p;
    return { ...p, hasEndedTurn: true, discard: [...p.discard, ...p.hand], hand: [], block: 0 };
  });
  let cp = { ...players[pIdx] };
  if (cp.poison > 0) { cp.hp -= cp.poison; cp.poison--; }
  if (cp.weak > 0) cp.weak--;
  if (cp.vulnerable > 0) cp.vulnerable--;
  if (cp.hp <= 0) { cp.hp = 0; cp.dead = true; }
  players = players.map((p, i) => i === pIdx ? cp : p);

  let nextIdx = -1;
  for (let i = 1; i <= players.length; i++) {
    const c = (pIdx + i) % players.length;
    if (!players[c].dead && !players[c].hasEndedTurn) { nextIdx = c; break; }
  }

  if (nextIdx >= 0) {
    return checkCombatEnd({
      ...state, players, currentPlayerIndex: nextIdx, selectedCardIndex: null, diceRoll: null,
      log: [...state.log, `--- Tour de ${players[nextIdx].name} ---`],
    });
  }
  return executeEnemyPhase({ ...state, players, phase: 'enemy_animating' });
}

export function startNewPlayerTurn(state) {
  return { ...state, phase: 'player' };
}

export function getEnemyIntention(enemy) {
  return enemy.pattern[enemy.patternIndex % enemy.pattern.length];
}

export function getCurrentPlayer(state) {
  return state.players[state.currentPlayerIndex] || null;
}

export function getPlayer(state, userId) {
  if (userId) return state.players.find(p => p.id === userId) || null;
  return state.players[0] || null;
}
