import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import type { Combatant, ArenaConfig, CombatState } from '../types';
import { rollDice, getModifier } from '../lore/rules';
import { BESTIARY, BESTIARY_EXTENDED } from '../lore/bestiary';

interface UseCombatOptions {
  onCombatEnd?: (victory: boolean, rewards?: { gold: number; xp: number }) => void;
  onLogAction?: (log: { type: string; msg: string }) => void;
  onHPChange?: (playerId: string, newHP: number) => void;
  onVFX?: (vfx: { type: string; x: number; y: number }) => void;
  onSFX?: (sfx: string) => void;
}

export const useCombat = ({
  onCombatEnd,
  onLogAction,
  onHPChange,
  onVFX,
  onSFX,
}: UseCombatOptions = {}) => {
  const {
    combatMode,
    setCombatMode,
    combatEnemies,
    setCombatEnemies,
    syncedCombatState,
    setSyncedCombatState,
    character,
    players,
  } = useGameStore();

  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [combatPhase, setCombatPhase] = useState<'initiative' | 'active' | 'finished'>('initiative');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [cooldowns, setCooldowns] = useState<Record<string, Record<string, number>>>({});
  const [logs, setLogs] = useState<Array<{ type: string; msg: string; id: number }>>([]);

  const addLog = useCallback((type: string, msg: string) => {
    const logEntry = { type, msg, id: Date.now() + Math.random() };
    setLogs(prev => [...prev, logEntry]);
    onLogAction?.({ type, msg });
  }, [onLogAction]);

  const initializeCombat = useCallback((
    enemies: Array<{ type: string; count?: number }>,
    arenaConfig: ArenaConfig = { blocksX: 10, blocksY: 10, shapeType: 'STANDARD' }
  ) => {
    const allCreatures = { ...BESTIARY, ...BESTIARY_EXTENDED };
    const occupiedPositions = new Set<string>();
    
    const getUniquePosition = (isEnemy: boolean): { x: number; y: number } => {
      const maxX = Math.floor(arenaConfig.blocksX / 2);
      const maxY = Math.floor(arenaConfig.blocksY / 2);
      let x: number, y: number, key: string;
      let attempts = 0;

      do {
        if (isEnemy) {
          x = Math.floor(Math.random() * Math.min(4, maxX)) + (maxX - 2);
        } else {
          x = -Math.floor(Math.random() * Math.min(4, maxX)) - 1;
        }
        y = Math.floor(Math.random() * (arenaConfig.blocksY - 2)) - maxY + 1;
        key = `${x},${y}`;
        attempts++;
      } while (occupiedPositions.has(key) && attempts < 100);

      occupiedPositions.add(key);
      return { x, y };
    };

    const playerCombatants: Combatant[] = players.map(p => {
      const stats = p.stats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
      const dexMod = getModifier(stats.dex);
      const pos = getUniquePosition(false);
      
      return {
        id: p.id,
        user_id: p.user_id,
        name: p.name,
        class: p.class,
        hp: p.hp,
        maxHp: p.max_hp,
        resource: p.resource,
        maxResource: p.max_resource,
        initiative: rollDice('1d20').total + dexMod,
        isEnemy: false,
        portrait_url: p.portrait_url,
        posX: pos.x,
        posY: pos.y,
        maxPM: 5,
        currentPM: 5,
        hasActed: false,
        facing: 'EAST',
        spells: p.abilities || [],
        ac: 10 + dexMod,
      };
    });

    const enemyCombatants: Combatant[] = [];
    enemies.forEach(enemy => {
      const creatureData = allCreatures[enemy.type];
      if (!creatureData) return;

      const count = enemy.count || 1;
      for (let i = 0; i < count; i++) {
        const pos = getUniquePosition(true);
        enemyCombatants.push({
          id: `enemy_${enemy.type}_${i}_${Date.now()}`,
          name: creatureData.name,
          hp: creatureData.stats.hp,
          maxHp: creatureData.stats.hp,
          initiative: rollDice('1d20').total,
          isEnemy: true,
          portrait_url: `/monsters/${enemy.type.toLowerCase()}.png`,
          posX: pos.x,
          posY: pos.y,
          maxPM: 3,
          currentPM: 3,
          hasActed: false,
          facing: 'WEST',
          behavior_type: creatureData.behavior_type,
          actions: creatureData.actions,
          atk: creatureData.stats.atk,
          ac: creatureData.stats.ac,
        });
      }
    });

    const allCombatants = [...playerCombatants, ...enemyCombatants]
      .sort((a, b) => b.initiative - a.initiative);

    setCombatants(allCombatants);
    setCombatMode(true);
    setCombatPhase('active');
    setRound(1);
    setCurrentTurnIndex(0);
    setCooldowns({});
    setLogs([]);
    addLog('system', `Combat initié ! Round 1`);
    onSFX?.('combat_start');
  }, [players, setCombatMode, addLog, onSFX]);

  const getCurrentCombatant = useCallback(() => {
    return combatants[currentTurnIndex];
  }, [combatants, currentTurnIndex]);

  const isPlayerTurn = useCallback(() => {
    const current = getCurrentCombatant();
    return current && !current.isEnemy && current.user_id === character?.user_id;
  }, [getCurrentCombatant, character]);

  const nextTurn = useCallback(() => {
    let nextIndex = (currentTurnIndex + 1) % combatants.length;
    
    while (combatants[nextIndex]?.hp <= 0) {
      nextIndex = (nextIndex + 1) % combatants.length;
      if (nextIndex === currentTurnIndex) break;
    }

    if (nextIndex <= currentTurnIndex) {
      setRound(prev => {
        addLog('system', `Round ${prev + 1}`);
        return prev + 1;
      });
      
      setCooldowns(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(combatantId => {
          Object.keys(updated[combatantId]).forEach(ability => {
            if (updated[combatantId][ability] > 0) {
              updated[combatantId][ability]--;
            }
          });
        });
        return updated;
      });
    }

    setCombatants(prev => prev.map((c, i) => ({
      ...c,
      hasActed: i === nextIndex ? false : c.hasActed,
      currentPM: i === nextIndex ? c.maxPM : c.currentPM,
    })));

    setCurrentTurnIndex(nextIndex);
    setSelectedAction(null);
  }, [currentTurnIndex, combatants, addLog]);

  const moveCombatant = useCallback((combatantId: string, newX: number, newY: number) => {
    setCombatants(prev => prev.map(c => {
      if (c.id !== combatantId) return c;
      
      const distance = Math.abs(newX - c.posX) + Math.abs(newY - c.posY);
      if (distance > c.currentPM) return c;

      const facing = newX > c.posX ? 'EAST' : newX < c.posX ? 'WEST' : 
                    newY > c.posY ? 'SOUTH' : 'NORTH';

      return {
        ...c,
        posX: newX,
        posY: newY,
        currentPM: c.currentPM - distance,
        facing: facing as Combatant['facing'],
      };
    }));
  }, []);

  const attack = useCallback((attackerId: string, targetId: string, abilityName?: string) => {
    const attacker = combatants.find(c => c.id === attackerId);
    const target = combatants.find(c => c.id === targetId);
    if (!attacker || !target) return;

    const atkBonus = attacker.atk || getModifier(10);
    const { total: attackRoll, rolls } = rollDice('1d20');
    const totalAttack = attackRoll + atkBonus;
    const isCrit = rolls[0] === 20;
    const isMiss = rolls[0] === 1;

    addLog('combat', `${attacker.name} attaque ${target.name} (${attackRoll}+${atkBonus}=${totalAttack} vs CA ${target.ac})`);

    if (isMiss || (!isCrit && totalAttack < (target.ac || 10))) {
      addLog('combat', `${attacker.name} rate son attaque !`);
      onSFX?.('miss');
      return;
    }

    let damage = rollDice('1d8').total + atkBonus;
    if (isCrit) {
      damage *= 2;
      addLog('combat', `COUP CRITIQUE !`);
      onSFX?.('critical');
    }

    const newHP = Math.max(0, target.hp - damage);
    setCombatants(prev => prev.map(c => 
      c.id === targetId ? { ...c, hp: newHP } : c
    ));

    addLog('combat', `${target.name} subit ${damage} dégâts (${target.hp} -> ${newHP} PV)`);
    onVFX?.({ type: 'slash', x: target.posX, y: target.posY });
    onSFX?.('hit');

    if (!target.isEnemy) {
      onHPChange?.(target.id, newHP);
    }

    if (newHP <= 0) {
      addLog('combat', `${target.name} est vaincu !`);
      onSFX?.('death');
      checkCombatEnd();
    }
  }, [combatants, addLog, onSFX, onVFX, onHPChange]);

  const checkCombatEnd = useCallback(() => {
    const playersAlive = combatants.filter(c => !c.isEnemy && c.hp > 0);
    const enemiesAlive = combatants.filter(c => c.isEnemy && c.hp > 0);

    if (enemiesAlive.length === 0) {
      setCombatPhase('finished');
      const totalXP = combatants
        .filter(c => c.isEnemy && c.hp <= 0)
        .length * 50;
      const totalGold = Math.floor(Math.random() * 50) + 20;
      
      addLog('system', `Victoire ! Récompenses : ${totalXP} XP, ${totalGold} Or`);
      onSFX?.('victory');
      onCombatEnd?.(true, { gold: totalGold, xp: totalXP });
      return;
    }

    if (playersAlive.length === 0) {
      setCombatPhase('finished');
      addLog('system', `Défaite...`);
      onSFX?.('defeat');
      onCombatEnd?.(false);
    }
  }, [combatants, addLog, onSFX, onCombatEnd]);

  const endCombat = useCallback(() => {
    setCombatMode(false);
    setCombatants([]);
    setCombatPhase('initiative');
    setRound(1);
    setCurrentTurnIndex(0);
    setLogs([]);
  }, [setCombatMode]);

  const useAbility = useCallback((combatantId: string, abilityName: string, targetId?: string) => {
    const combatant = combatants.find(c => c.id === combatantId);
    if (!combatant) return;

    const cd = cooldowns[combatantId]?.[abilityName] || 0;
    if (cd > 0) {
      addLog('combat', `${abilityName} est en recharge (${cd} tours restants)`);
      return;
    }

    if (targetId) {
      attack(combatantId, targetId, abilityName);
    }

    setCooldowns(prev => ({
      ...prev,
      [combatantId]: {
        ...(prev[combatantId] || {}),
        [abilityName]: 3,
      }
    }));

    setCombatants(prev => prev.map(c =>
      c.id === combatantId ? { ...c, hasActed: true } : c
    ));
  }, [combatants, cooldowns, attack, addLog]);

  return {
    combatants,
    currentTurnIndex,
    round,
    combatPhase,
    selectedAction,
    cooldowns,
    logs,
    isActive: combatMode,
    initializeCombat,
    getCurrentCombatant,
    isPlayerTurn,
    nextTurn,
    moveCombatant,
    attack,
    useAbility,
    endCombat,
    setSelectedAction,
  };
};
