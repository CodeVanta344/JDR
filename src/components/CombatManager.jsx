import React, { useState, useEffect, useRef } from 'react';
import { CLASSES, BESTIARY } from '../lore';
import { supabase } from '../supabaseClient';
import { DieVisual } from './DieVisual';

const DamagePopup = ({ amount, onDone }) => {
    useEffect(() => {
        const timer = setTimeout(onDone, 1000);
        return () => clearTimeout(timer);
    }, [onDone]);

    return (
        <div className="damage-popup" style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#ff4444',
            fontSize: '1.5rem',
            fontWeight: '900',
            textShadow: '0 0 10px rgba(0,0,0,0.8)',
            zIndex: 100,
            animation: 'damageFloat 1s ease-out forwards'
        }}>
            -{amount}
        </div>
    );
};

const TurnTracker = ({ combatants, currentTurnIndex }) => {
    // Show current and next 7 combatants
    const sequence = [];
    for (let i = 0; i < 8; i++) {
        const idx = (currentTurnIndex + i) % combatants.length;
        if (combatants[idx].hp > 0) sequence.push(combatants[idx]);
    }

    return (
        <div style={{
            display: 'flex', gap: '8px', padding: '10px',
            background: 'rgba(0,0,0,0.6)', borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)',
            marginBottom: '10px', width: 'fit-content'
        }}>
            {sequence.map((u, i) => (
                <div key={`${u.id}-${i}`} style={{
                    width: i === 0 ? '60px' : '45px',
                    height: i === 0 ? '60px' : '45px',
                    borderRadius: '50%',
                    border: i === 0 ? '3px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.3)',
                    position: 'relative',
                    transition: 'all 0.3s',
                    opacity: 1 - (i * 0.1),
                    transform: i === 0 ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: i === 0 ? '0 0 15px var(--gold-primary)' : 'none'
                }}>
                    <img src={u.portrait_url} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="" />
                    {i === 0 && <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold-primary)', color: 'black', fontSize: '0.6rem', fontWeight: 'bold', padding: '1px 4px', borderRadius: '4px' }}>TOUR</div>}
                </div>
            ))}
        </div>
    );
};



const RemoteActionOverlay = ({ action, onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!action) return null;

    return (
        <div style={{
            position: 'absolute', inset: 0, zIndex: 1900,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <div style={{
                marginBottom: '20px', fontSize: '1.5rem', fontFamily: 'var(--font-display)',
                color: 'var(--gold-light)', textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}>
                {action.attackerName} utilise <span style={{ color: 'white' }}>{action.abilityName}</span>
            </div>

            <DieVisual
                type="d20"
                value={action.roll}
                onComplete={() => { }} // Static display or purely visual
                isResult={true}
            />

            <div style={{
                marginTop: '20px', textAlign: 'center',
                background: 'rgba(0,0,0,0.8)', padding: '10px 20px', borderRadius: '8px',
                border: '1px solid var(--gold-dim)'
            }}>
                <div style={{ fontSize: '1.2rem', color: 'white' }}>
                    {action.roll} + {action.modifier} = <span style={{ color: action.success ? '#00ff00' : '#ff4444', fontWeight: 'bold' }}>{action.roll + action.modifier}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '4px' }}>
                    vs {action.targetName} ({action.threshold} AC)
                </div>
                {action.success && (
                    <div style={{
                        marginTop: '8px', fontSize: '1.1rem', color: '#ff4444', fontWeight: 'bold',
                        animation: 'pulse 1s infinite'
                    }}>
                        💥 {action.damage} DÉGÂTS !
                    </div>
                )}
            </div>
        </div>
    );
};

export const CombatManager = ({ arenaConfig = { blocksX: 10, blocksY: 10, shapeType: 'STANDARD' }, players, currentUserId, initialEnemies, syncedCombatState, onUpdateCombatState, onCombatEnd, onLogAction, onHPChange, onResourceChange, onGameOver, onRewards, onVFX, onSFX, sessionId }) => {
    const [combatants, setCombatants] = useState([]);
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
    const [round, setRound] = useState(1);
    const [combatState, setCombatState] = useState('initiative'); // initiative, active, finished
    const [selectedAction, setSelectedAction] = useState(null);
    const [shake, setShake] = useState(false);
    const [flash, setFlash] = useState(false);
    const [animatingId, setAnimatingId] = useState(null);
    const [shakingId, setShakingId] = useState(null);
    const [damagePopups, setDamagePopups] = useState([]);
    const [rollOverlay, setRollOverlay] = useState(null);
    const [cooldowns, setCooldowns] = useState({});
    const [logs, setLogs] = useState([]);
    const [decor, setDecor] = useState([]);
    const [remoteAction, setRemoteAction] = useState(null); // { attackerName, abilityName, roll, modifier, targetName, threshold, success, damage, id }
    const logEndRef = useRef(null);
    const lastSyncRef = useRef(0);
    const lastActionIdRef = useRef(null);
    const combatantsRef = useRef(combatants);

    useEffect(() => {
        combatantsRef.current = combatants;
    }, [combatants]);

    // Real-time combat sync subscription
    useEffect(() => {
        if (!sessionId) return;

        const channel = supabase
            .channel(`combat_sync_${sessionId}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'world_state',
                filter: `key=eq.combat_${sessionId}`
            }, (payload) => {
                if (payload.new && payload.new.value && payload.new.value.active) {
                    const newState = payload.new.value;
                    // Avoid applying our own updates (check timestamp)
                    if (newState.updatedAt && newState.updatedAt > lastSyncRef.current) {
                        lastSyncRef.current = newState.updatedAt;
                        setCombatants(newState.combatants || []);
                        setRound(newState.round || 1);
                        setCurrentTurnIndex(newState.turnIndex || 0);
                        if (newState.logs && newState.logs.length > logs.length) {
                            setLogs(newState.logs);
                        }
                        if (newState.decor) {
                            setDecor(newState.decor);
                        }
                        if (combatState === 'initiative') {
                            setCombatState('active');
                        }
                    }
                } else if (payload.new && payload.new.value && !payload.new.value.active) {
                    setCombatState('finished');
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [sessionId, combatState, logs.length]);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const addLog = (msg) => {
        setLogs(prev => [...prev, { ...msg, id: Math.random() }]);
        if (onLogAction) onLogAction(msg);
    };

    // SYNC: Update local state from Shared State
    useEffect(() => {
        if (syncedCombatState && syncedCombatState.active) {
            setCombatants(syncedCombatState.combatants || []);
            setRound(syncedCombatState.round || 1);
            setCurrentTurnIndex(syncedCombatState.turnIndex || 0);
            setCombatState('active');
            if (syncedCombatState.decor) setDecor(syncedCombatState.decor);

            // Check for new actions to verify
            if (syncedCombatState.lastAction && syncedCombatState.lastAction.id !== lastActionIdRef.current) {
                const action = syncedCombatState.lastAction;
                lastActionIdRef.current = action.id;

                // Only show overlay if we didn't do it ourselves (optional, maybe we want to see it too?)
                // For now, let's show it to everyone for consistency, or skip if it's the local player who JUST acted
                // But checking user_id might be loop-prone. Let's compare timestamp or just show it.
                // If it's the local player, they already saw the "RollOverlay". 
                // We should add a flag 'sourceUserId' to action to filter.

                if (action.sourceUserId !== currentUserId) {
                    setRemoteAction(action);

                    // Also trigger SFX/VFX
                    if (action.success) {
                        if (onSFX) setTimeout(() => onSFX('damage'), 800);
                        if (onVFX) onVFX('blood',
                            window.innerWidth / 2, // Rough fallback - ideally we'd find the target element
                            window.innerHeight / 2,
                            '#ff0000'
                        );
                    } else {
                        if (onVFX) onVFX('spark', window.innerWidth / 2, window.innerHeight / 2, '#ffff00');
                    }
                }
            }
        }
    }, [syncedCombatState, currentUserId, onSFX, onVFX]);

    const getPosPercent = (pos, isY = false) => {
        const blocks = isY ? arenaConfig.blocksY : arenaConfig.blocksX;
        const offset = Math.floor(blocks / 2);
        return ((pos + 0.5 + offset) / blocks) * 100;
    };

    // SYNC: Only initialize locally if NO synced state is provided (Fallback/SinglePlayer)
    useEffect(() => {
        if (syncedCombatState) return; // Skip local init if synced

        if (combatState === 'initiative') {
            // ... (Original Local Initialization Logic) ...
            // Track occupied positions to prevent overlap
            const occupiedPositions = new Set();
            const getUniquePos = (isEnemy) => {
                let x, y, key;
                let attempts = 0;
                const maxX = Math.floor(arenaConfig.blocksX / 2);
                const maxY = Math.floor(arenaConfig.blocksY / 2);

                do {
                    if (isEnemy) {
                        // Enemies spawn on the EAST side (positive X)
                        x = Math.floor(Math.random() * Math.min(4, maxX)) + (maxX - 2);
                    } else {
                        // Players spawn on the WEST side (negative X)
                        x = -Math.floor(Math.random() * Math.min(4, maxX)) - 1;
                    }
                    y = Math.floor(Math.random() * (arenaConfig.blocksY - 2)) - Math.floor(arenaConfig.blocksY / 2) + 1;

                    x = Math.max(-maxX, Math.min(maxX - 1, x));
                    y = Math.max(-maxY, Math.min(maxY - 1, y));

                    key = `${x},${y}`;
                    attempts++;
                } while ((!isTileValid(x, y) || occupiedPositions.has(key)) && attempts < 100);

                occupiedPositions.add(key);
                return { x, y };
            };

            const playerCombatants = players.map(p => {
                const stats = p.stats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
                const dexMod = Math.floor((stats.dex - 10) / 2);
                const charClass = p.class?.split(' ')[0] || "Guerrier";
                const classData = CLASSES[charClass];
                const baseAbilities = classData?.initial_ability_options || classData?.abilities || [];
                const classUnlockables = classData?.unlockables || [];

                // Merge player's chosen spells with their base abilities
                // Player spells take priority - these are their actual chosen abilities
                let playerSpells = [...(p.spells || [])];
                let playerAbilities = [...(p.abilities || [])];

                // Build final ability list with full data from class definitions
                let combinedAbilities = [...playerAbilities, ...playerSpells].map(spell => {
                    const spellName = typeof spell === 'string' ? spell : spell.name;
                    // Find full ability data from class definition
                    const fromInitial = baseAbilities.find(a => a.name === spellName);
                    const fromUnlockables = classUnlockables.find(u => u.name === spellName);
                    const fullAbility = fromInitial || fromUnlockables;

                    if (fullAbility) {
                        return { ...fullAbility, range: fullAbility.range || 2 };
                    }
                    // If spell is already an object with data, use it
                    if (typeof spell === 'object' && spell.name) {
                        return { ...spell, range: spell.range || 2 };
                    }
                    // Fallback for unknown spells
                    return { name: spellName, desc: "Capacite", cost: 10, range: 2 };
                });

                // If no abilities, use base class abilities
                if (combinedAbilities.length === 0) {
                    combinedAbilities = baseAbilities.map(a => ({ ...a, range: a.range || 2 }));
                }

                let arrivalTurns = 0;
                let status = 'arrived';
                if (p.status?.startsWith('traveling:')) {
                    arrivalTurns = parseInt(p.status.split(':')[1]) || 0;
                    status = 'traveling';
                }

                const pos = getUniquePos(false);

                return {
                    id: p.id,
                    user_id: p.user_id,
                    name: p.name,
                    class: charClass,
                    atk: Math.floor(((stats.str || 10) - 10) / 2) + 2,
                    ac: 10 + dexMod + (p.equipment?.reduce((acc, item) => acc + (item.stats?.ac || 0), 0) || 0),
                    hp: p.hp,
                    maxHp: p.max_hp,
                    resource: p.resource ?? 100,
                    maxResource: p.max_resource ?? 100,
                    resourceName: "Energie",
                    initiative: Math.floor(Math.random() * 20) + 1 + dexMod,
                    isEnemy: false,
                    portrait_url: p.portrait_url,
                    spells: combinedAbilities,
                    arrivalTurns,
                    travelStatus: status,
                    posX: pos.x,
                    posY: pos.y,
                    maxPM: Math.floor((stats.dex + stats.con - 20) / 4) + 5,
                    currentPM: Math.floor((stats.dex + stats.con - 20) / 4) + 5,
                    facing: 'EAST',
                    hasMoved: false,
                    hasActed: false
                };
            });

            const enemiesToUse = (initialEnemies && initialEnemies.length > 0) ? initialEnemies.map((e, idx) => {
                const pos = getUniquePos(true);
                const baseEnemy = BESTIARY[e.name.split(' ')[0]] || BESTIARY[e.class] || {};
                return {
                    id: e.id || `ai-enemy-${idx}`,
                    name: e.name || "Ennemi Inconnu",
                    class: e.class || "Monstre",
                    hp: e.hp || baseEnemy.stats?.hp || 20,
                    maxHp: e.maxHp || e.hp || baseEnemy.stats?.hp || 20,
                    atk: e.atk || baseEnemy.stats?.atk || 5,
                    ac: e.ac || baseEnemy.stats?.ac || 12,
                    resource: 50,
                    maxResource: 50,
                    resourceName: "Mana",
                    initiative: e.initiative || (Math.floor(Math.random() * 10) + 5),
                    isEnemy: true,
                    posX: pos.x,
                    posY: pos.y,
                    maxPM: baseEnemy.stats?.maxPM || 5,
                    currentPM: baseEnemy.stats?.maxPM || 5,
                    behavior_type: e.behavior_type || baseEnemy.behavior_type || "MELEE",
                    actions: e.actions || baseEnemy.actions || [{ name: 'Attaque', range: 1.5 }],
                    facing: 'WEST',
                    hasMoved: false,
                    hasActed: false,
                    portrait_url: (e.portrait && e.portrait.startsWith('http')) ? e.portrait : (baseEnemy.portrait_url || `https://loremflickr.com/320/450/fantasy,monster,${e.name?.split(' ')[0] || 'creature'}/all`)
                };
            }) : [
                { id: 'e1', name: "Scouteur Gobelin", class: "Guerrier", hp: 15, maxHp: 15, atk: 3, ac: 13, resource: 20, maxResource: 20, resourceName: "Rage", initiative: 12, isEnemy: true, posX: 5, posY: 0, hasMoved: false, hasActed: false, portrait_url: "https://images.squarespace-cdn.com/content/v1/55ef483ce4b08053a4798e69/1472502693766-U9JOPM87W9PDKMOK99E6/goblinknight.jpg", maxPM: 5, currentPM: 5, behavior_type: "RANGED", actions: [{ name: 'Arc court', range: 12 }, { name: 'Cimeterre', range: 1.5 }] }
            ];

            const all = [...playerCombatants, ...enemiesToUse];
            const sorted = all.sort((a, b) => b.initiative - a.initiative);

            setCombatants(sorted);
            setCombatState('active');

            // Generate some lore-based decor
            const decorTypes = [
                { name: 'Éclat de Vide', color: 'var(--aether-blue)', size: 40 },
                { name: 'Pilier d\'Obsidienne', color: '#111', size: 60 },
                { name: 'Rune Ancienne', color: 'var(--gold-dim)', size: 30 }
            ];
            const newDecor = Array.from({ length: 5 }).map((_, i) => {
                const pos = getUniquePos(Math.random() > 0.5);
                return {
                    id: `decor-${i}`,
                    ...decorTypes[Math.floor(Math.random() * decorTypes.length)],
                    posX: pos.x,
                    posY: pos.y
                };
            });
            setDecor(newDecor);

            onLogAction({ role: 'system', content: `⚔️ **LE COMBAT COMMENCE !** L'échiquier du destin est en place.` });
            addLog({ role: 'system', content: `⚔️ **LE COMBAT COMMENCE !** L'échiquier du destin est en place.` });
        }
    }, [combatState, players, initialEnemies, onLogAction, syncedCombatState]);

    // CHECK VICTORY / DEFEAT
    useEffect(() => {
        if (combatState === 'active' && combatants.length > 0) {
            const enemiesAlive = combatants.filter(u => u.isEnemy && u.hp > 0);
            const playersAlive = combatants.filter(u => !u.isEnemy && u.hp > 0);

            if (enemiesAlive.length === 0) {
                setCombatState('finished');
                const defeatedEnemies = combatants.filter(u => u.isEnemy);
                if (onRewards) onRewards(defeatedEnemies);
                onLogAction({ role: 'system', content: '🏆 **VICTOIRE !** Tous les ennemis ont été terrassés.' });

                // Auto-close after short delay to return to narrative
                const timer = setTimeout(() => {
                    onCombatEnd({ victory: true, defeatedEnemies });
                }, 5000);
                return () => clearTimeout(timer);
            } else if (playersAlive.length === 0) {
                setCombatState('finished');
                onGameOver();
            }
        }
    }, [combatants, combatState, onRewards, onCombatEnd, onGameOver, onLogAction]);

    const currentActor = combatants[currentTurnIndex];
    const isLocalPlayerTurn = currentActor && currentActor.user_id === currentUserId;

    useEffect(() => {
        if (currentActor && currentActor.user_id) {
            console.log(`[Combat] Current actor: ${currentActor.name} (user_id: ${currentActor.user_id}), Current local user: ${currentUserId}, Match: ${isLocalPlayerTurn}`);
        }
    }, [currentActor, currentUserId, isLocalPlayerTurn]);

    const canMove = isLocalPlayerTurn && currentActor && currentActor.currentPM > 0 && combatState === 'active';
    const canAct = isLocalPlayerTurn && currentActor && !currentActor.hasActed && combatState === 'active';

    const isTileValid = (x, y) => {
        const boundsX = Math.floor(arenaConfig.blocksX / 2);
        const boundsY = Math.floor(arenaConfig.blocksY / 2);

        // Base bounds
        if (x < -boundsX || x >= boundsX || y < -boundsY || y >= boundsY) return false;

        return true;
    };

    const isTileOccupied = (x, y, excludeId) => {
        return combatantsRef.current.some(u => u.id !== excludeId && u.hp > 0 && u.posX === x && u.posY === y);
    };

    const executeMove = (direction) => {
        const currentCombatants = combatantsRef.current;
        const freshActor = currentCombatants.find(u => u.id === currentActor.id);
        if (!freshActor) return;

        const authorized = freshActor.isEnemy || canMove;
        if (!authorized || freshActor.currentPM <= 0) return;
        const moveAmount = 1; // One tile at a time
        let dx = 0, dy = 0;
        switch (direction) {
            case 'up': dy = -moveAmount; break;
            case 'down': dy = moveAmount; break;
            case 'left': dx = -moveAmount; break;
            case 'right': dx = moveAmount; break;
            case 'forward': dx = freshActor.isEnemy ? -moveAmount : moveAmount; break;
            case 'backward': dx = freshActor.isEnemy ? moveAmount : -moveAmount; break;
        }

        let newFacing = freshActor.facing;
        if (dx > 0) newFacing = 'EAST';
        else if (dx < 0) newFacing = 'WEST';
        else if (dy > 0) newFacing = 'SOUTH';
        else if (dy < 0) newFacing = 'NORTH';

        const boundsX = Math.floor(arenaConfig.blocksX / 2);
        const boundsY = Math.floor(arenaConfig.blocksY / 2);
        const newX = Math.max(-boundsX, Math.min(boundsX - 1, freshActor.posX + dx));
        const newY = Math.max(-boundsY, Math.min(boundsY - 1, freshActor.posY + dy));

        // Boundary & Validity Check
        if (!isTileValid(newX, newY) || isTileOccupied(newX, newY, freshActor.id)) {
            if (onSFX && !freshActor.isEnemy) onSFX('error');
            return;
        }

        // Only consume PM if position actually changed
        const actualMove = (newX !== freshActor.posX || newY !== freshActor.posY);
        if (actualMove) {
            const newCombatants = currentCombatants.map(u => u.id === freshActor.id ? { ...u, posX: newX, posY: newY, currentPM: u.currentPM - 1, facing: newFacing, hasMoved: true } : u);
            setCombatants(newCombatants);
            lastSyncRef.current = Date.now();
            if (onUpdateCombatState) onUpdateCombatState({ combatants: newCombatants, turnIndex: currentTurnIndex, round, active: true, logs, updatedAt: lastSyncRef.current });
            if (onSFX) onSFX('footstep');
        }
    };


    const getTacticalModifier = (attacker, target) => {
        const dx = attacker.posX - target.posX;
        const dy = attacker.posY - target.posY;
        let bonus = 0;
        let reason = '';

        // Simplistic cardinal rear/side check
        if (target.facing === 'NORTH') {
            if (dy > 0 && Math.abs(dx) <= 1) { bonus = 4; reason = 'DOS'; }
            else if (Math.abs(dx) > Math.abs(dy)) { bonus = 2; reason = 'FLANC'; }
        } else if (target.facing === 'SOUTH') {
            if (dy < 0 && Math.abs(dx) <= 1) { bonus = 4; reason = 'DOS'; }
            else if (Math.abs(dx) > Math.abs(dy)) { bonus = 2; reason = 'FLANC'; }
        } else if (target.facing === 'EAST') {
            if (dx < 0 && Math.abs(dy) <= 1) { bonus = 4; reason = 'DOS'; }
            else if (Math.abs(dy) > Math.abs(dx)) { bonus = 2; reason = 'FLANC'; }
        } else if (target.facing === 'WEST') {
            if (dx > 0 && Math.abs(dy) <= 1) { bonus = 4; reason = 'DOS'; }
            else if (Math.abs(dy) > Math.abs(dx)) { bonus = 2; reason = 'FLANC'; }
        }

        // Encirclement Check (Surrounded by 2+ enemies of the target)
        const adjacentEnemies = combatantsRef.current.filter(u =>
            u.id !== target.id &&
            u.hp > 0 &&
            u.isEnemy !== target.isEnemy &&
            Math.abs(u.posX - target.posX) <= 1 &&
            Math.abs(u.posY - target.posY) <= 1
        ).length;

        if (adjacentEnemies >= 2) {
            bonus += 2; // Attacking an encircled target is easier (+2)
            if (reason) reason += ' + ENCERCLÉ';
            else reason = 'ENCERCLÉ';
        }

        return { bonus, reason, isEncircled: adjacentEnemies >= 2 };
    };

    const executeAttack = async (target, actionOverride = null) => {
        const action = actionOverride || selectedAction;
        const currentCombatants = combatantsRef.current;
        const freshActor = currentCombatants.find(u => u.id === currentActor.id);

        if (!action || !freshActor) return;
        const authorized = freshActor.isEnemy || canAct;
        if (!authorized) return;

        const dx = freshActor.posX - target.posX;
        const dy = freshActor.posY - target.posY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const range = action.range || 2;
        if (distance > range) {
            addLog({ role: 'system', content: `❌ **${target.name}** est trop loin (${distance.toFixed(1)}m) pour **${action.name}** (Portée: ${range}m) !` });
            if (freshActor.isEnemy) setTimeout(finishTurn, 1000);
            return;
        }

        const cost = action.cost !== undefined ? action.cost : (action.name === 'Attaque' ? 0 : 20);
        if (freshActor.resource < cost) {
            addLog({ role: 'system', content: `❌ **${freshActor.name}** n'a pas assez de ressources !` });
            if (freshActor.isEnemy) setTimeout(finishTurn, 1000);
            return;
        }

        const newResource = Math.max(0, freshActor.resource - cost);
        setCombatants(prev => prev.map(u => u.id === freshActor.id ? { ...u, resource: newResource, hasActed: true } : u));
        if (!freshActor.isEnemy && onResourceChange) onResourceChange(freshActor.id, newResource);

        const roll = Math.floor(Math.random() * 20) + 1;
        const baseModifier = freshActor.atk >= 5 ? 5 : 2;
        const { bonus: tacticalBonus, reason: tacticalReason } = getTacticalModifier(freshActor, target);
        const totalModifier = baseModifier + tacticalBonus;
        const success = (roll + totalModifier) >= target.ac;

        setRollOverlay({ roll, modifier: totalModifier, tacticalReason, threshold: target.ac, success, type: 'hit', targetId: target.id, action });
        if (onSFX) onSFX('dice');
    };

    const handleRollComplete = (rollData) => {
        const { roll, modifier, threshold, success, targetId, action } = rollData;
        const target = combatants.find(u => u.id === targetId);
        const el = document.getElementById(`unit-${targetId}`);
        const rect = el ? el.getBoundingClientRect() : { x: window.innerWidth / 2, y: window.innerHeight / 2, width: 0, height: 0 };
        const cx = rect.x + rect.width / 2;
        const cy = rect.y + rect.height / 2;

        setTimeout(() => {
            setRollOverlay(null);
            if (success && target) {
                const damage = currentActor.atk + (action.name !== 'Attaque' ? 5 : 0);
                setAnimatingId(currentActor.id);
                if (onVFX) onVFX(action.name === 'Attaque' ? 'blood' : 'magic', cx, cy, action.name === 'Attaque' ? '#ff0000' : 'var(--aether-blue)');

                setTimeout(() => {
                    setShake(true); setFlash(true);
                    if (onSFX) onSFX('damage');
                    setTimeout(() => { setShake(false); setFlash(false); }, 500);
                    setShakingId(target.id);
                    setDamagePopups(prev => [...prev, { id: Math.random(), amount: damage, targetId: target.id }]);

                    const newHp = Math.max(0, target.hp - damage);
                    if (!target.isEnemy && onHPChange) onHPChange(target.id, newHp);
                    if (newHp === 0 && target.hp > 0) addLog({ role: 'system', content: `💀 **${target.name}** s'effondre, terrassé !` });

                    const newCombatants = combatants.map(u => u.id === target.id ? { ...u, hp: newHp } : u);
                    setCombatants(newCombatants);

                    // PREPARE SYNCED ACTION
                    const actionEvent = {
                        id: crypto.randomUUID(),
                        sourceUserId: currentUserId,
                        attackerName: currentActor.name,
                        targetName: target.name,
                        abilityName: action.name,
                        roll,
                        modifier,
                        threshold,
                        success: true,
                        damage,
                        timestamp: Date.now()
                    };

                    lastSyncRef.current = Date.now();
                    if (onUpdateCombatState) onUpdateCombatState({
                        combatants: newCombatants,
                        turnIndex: currentTurnIndex,
                        round,
                        active: true,
                        logs,
                        updatedAt: lastSyncRef.current,
                        lastAction: actionEvent
                    });

                    if (action.cooldown > 0) {
                        setCooldowns(prev => ({ ...prev, [currentActor.id]: { ...(prev[currentActor.id] || {}), [action.name]: action.cooldown } }));
                    }

                    addLog({ role: 'system', content: `🎲 **${roll}**(+${modifier}) vs **${threshold}** AC | 💥 **${currentActor.name}** touche **${target.name}** pour ${damage} dégâts !` });
                    setTimeout(() => {
                        setAnimatingId(null); setShakingId(null);
                        if (currentActor?.isEnemy) finishTurn();
                    }, 600);
                }, 250);
            } else {
                if (onVFX) onVFX('spark', cx, cy, '#ffff00');

                // SYNC MISS ACTION
                const actionEvent = {
                    id: crypto.randomUUID(),
                    sourceUserId: currentUserId,
                    attackerName: currentActor.name,
                    targetName: target.name,
                    abilityName: action.name,
                    roll,
                    modifier,
                    threshold,
                    success: false,
                    damage: 0,
                    timestamp: Date.now()
                };

                addLog({ role: 'system', content: `🎲 **${roll}**(+${modifier}) vs **${threshold}** AC | 💨 **${currentActor.name}** rate son attaque !` });

                // Sync the miss
                lastSyncRef.current = Date.now();
                if (onUpdateCombatState) onUpdateCombatState({
                    combatants, // No HP change
                    turnIndex: currentTurnIndex,
                    round,
                    active: true,
                    logs,
                    updatedAt: lastSyncRef.current,
                    lastAction: actionEvent
                });

                setTimeout(() => { if (currentActor?.isEnemy) finishTurn(); }, 1000);
            }
        }, 1000);
    };

    const finishTurn = () => {
        setAnimatingId(null); setShakingId(null);
        const playersAlive = combatants.some(u => !u.isEnemy && u.hp > 0);
        const enemiesAlive = combatants.some(u => u.isEnemy && u.hp > 0);

        if (!enemiesAlive) {
            setCombatState('finished');
            addLog({ role: 'system', content: `🏆 **VICTOIRE !** Les ennemis ont été terrassés.` });
            if (onRewards) onRewards(combatants.filter(u => u.isEnemy));
        } else if (!playersAlive) {
            setCombatState('finished');
            addLog({ role: 'system', content: `💀 **DÉFAITE...** La compagnie a succombé.` });
        }
        nextTurn();
    };

    const nextTurn = () => {
        if (combatState === 'finished') return;
        let nextIndex = (currentTurnIndex + 1) % combatants.length;
        let loops = 0;
        while (combatants[nextIndex].hp <= 0 && loops < combatants.length) {
            nextIndex = (nextIndex + 1) % combatants.length;
            loops++;
        }
        if (nextIndex < currentTurnIndex) {
            setRound(r => r + 1);
            addLog({ role: 'system', content: `🕒 --- **DEBUT DU ROUND ${round + 1}** ---` });
        }
        setCurrentTurnIndex(nextIndex);
        setSelectedAction(null);

        const nextActor = combatants[nextIndex];
        let newCombatants = [...combatants];

        if (nextActor) {
            // Update PM and Status
            newCombatants = newCombatants.map(u => u.id === nextActor.id ? { ...u, hasActed: false, currentPM: u.maxPM } : u);

            if (nextActor.travelStatus === 'traveling') {
                const newTurns = Math.max(0, nextActor.arrivalTurns - 1);
                const arrivedNow = newTurns === 0;
                newCombatants = newCombatants.map(u => u.id === nextActor.id ? { ...u, arrivalTurns: newTurns, travelStatus: arrivedNow ? 'arrived' : 'traveling' } : u);

                if (arrivedNow) addLog({ role: 'system', content: `✨ **${nextActor.name}** arrive sur le champ de bataille !` });
                else {
                    addLog({ role: 'system', content: `🕓 **${nextActor.name}** approche... (${newTurns} tours restants)` });
                    // If traveling, we set state and skip to next
                    setCombatants(newCombatants);
                    lastSyncRef.current = Date.now();
                    if (onUpdateCombatState) onUpdateCombatState({ combatants: newCombatants, turnIndex: nextIndex, round: (nextIndex < currentTurnIndex ? round + 1 : round), active: true, logs, updatedAt: lastSyncRef.current });
                    setTimeout(nextTurn, 1000);
                    return;
                }
            }
            addLog({ role: 'system', content: `${nextActor.isEnemy ? "👹" : "👤"} C'est au tour de **${nextActor.name}** !` });
            setCooldowns(prev => {
                const actorCooldowns = prev[nextActor.id];
                if (!actorCooldowns) return prev;
                const newActorCooldowns = {};
                let changed = false;
                for (const [ability, cd] of Object.entries(actorCooldowns)) {
                    if (cd > 0) { newActorCooldowns[ability] = cd - 1; changed = true; }
                }
                return changed ? { ...prev, [nextActor.id]: newActorCooldowns } : prev;
            });
            const regenAmount = 10;
            const newResource = Math.min(nextActor.maxResource, nextActor.resource + regenAmount);
            if (!nextActor.isEnemy && onResourceChange) onResourceChange(nextActor.id, newResource);

            newCombatants = newCombatants.map(u => u.id === nextActor.id ? { ...u, resource: newResource } : u);
            setCombatants(newCombatants);

            // SYNC TURN CHANGE
            lastSyncRef.current = Date.now();
            if (onUpdateCombatState) onUpdateCombatState({
                combatants: newCombatants,
                turnIndex: nextIndex,
                round: (nextIndex < currentTurnIndex ? round + 1 : round),
                active: true,
                logs,
                updatedAt: lastSyncRef.current
            });
        }
    };

    useEffect(() => {
        if (combatState === 'active' && currentActor && currentActor.isEnemy && !currentActor.hasActed) {
            const timer = setTimeout(async () => {
                const currentCombatants = combatantsRef.current;
                const freshActor = currentCombatants.find(u => u.id === currentActor.id);
                if (!freshActor) {
                    nextTurn();
                    return;
                }

                const playerTargets = currentCombatants.filter(u => !u.isEnemy && u.hp > 0);
                if (playerTargets.length === 0) {
                    nextTurn();
                    return;
                }

                // AI Always knows player position: target the closest one
                const targetsWithDist = playerTargets.map(p => ({
                    unit: p,
                    dist: Math.max(Math.abs(freshActor.posX - p.posX), Math.abs(freshActor.posY - p.posY))
                })).sort((a, b) => a.dist - b.dist);

                const primaryTarget = targetsWithDist[0].unit;

                // --- STRATEGY: MOVEMENT ---
                let enemyCanMove = freshActor.currentPM > 0;
                if (enemyCanMove) {
                    // Decide target destination
                    let targetX = primaryTarget.posX;
                    let targetY = primaryTarget.posY;

                    // If RANGED, try to stay away but in range
                    if (freshActor.behavior_type === 'RANGED') {
                        const preferredRange = 6;
                        const dist = targetsWithDist[0].dist;
                        if (dist < preferredRange) {
                            // Too close! Try to move away from primary target
                            const dx = freshActor.posX - primaryTarget.posX;
                            const dy = freshActor.posY - primaryTarget.posY;
                            const norm = Math.max(Math.abs(dx), Math.abs(dy)) || 1;
                            targetX = freshActor.posX + Math.round((dx / norm) * 3);
                            targetY = freshActor.posY + Math.round((dy / norm) * 3);
                        } else if (dist > 8) {
                            // Too far, close in slightly
                            const dx = primaryTarget.posX - freshActor.posX;
                            const dy = primaryTarget.posY - freshActor.posY;
                            const norm = Math.max(Math.abs(dx), Math.abs(dy)) || 1;
                            targetX = freshActor.posX + Math.round((dx / norm) * 2);
                            targetY = freshActor.posY + Math.round((dy / norm) * 2);
                        } else {
                            // In sweet spot
                            targetX = freshActor.posX;
                            targetY = freshActor.posY;
                        }
                    }

                    // Move step by step towards target destination
                    let movesRemaining = freshActor.currentPM;
                    while (movesRemaining > 0) {
                        // Refresh actor state in each loop iteration because executeMove updates it async
                        const loopActor = combatantsRef.current.find(u => u.id === currentActor.id);
                        if (!loopActor || loopActor.currentPM <= 0) break;

                        const dx = Math.sign(targetX - loopActor.posX);
                        const dy = Math.sign(targetY - loopActor.posY);
                        if (dx === 0 && dy === 0) break;

                        // Try to move closer
                        let moveX = 0, moveY = 0;
                        if (dx !== 0 && isTileValid(loopActor.posX + dx, loopActor.posY) && !isTileOccupied(loopActor.posX + dx, loopActor.posY, loopActor.id)) {
                            moveX = dx;
                        } else if (dy !== 0 && isTileValid(loopActor.posX, loopActor.posY + dy) && !isTileOccupied(loopActor.posX, loopActor.posY + dy, loopActor.id)) {
                            moveY = dy;
                        } else {
                            // Obstacle or reached target axis? Stop moving
                            break;
                        }

                        if (moveX !== 0 || moveY !== 0) {
                            executeMove(moveX > 0 ? 'right' : moveX < 0 ? 'left' : moveY > 0 ? 'down' : 'up');
                            movesRemaining--;
                            // Small delay for animation feel and state update
                            await new Promise(r => setTimeout(r, 300));
                        } else break;
                    }
                }

                // --- STRATEGY: ACTION ---
                // Re-evaluate targets after move - using FRESH STATE
                const postMoveActor = combatantsRef.current.find(u => u.id === currentActor.id) || freshActor;
                const updatedTargets = combatantsRef.current.filter(u => !u.isEnemy && u.hp > 0).map(p => ({
                    unit: p,
                    dist: Math.max(Math.abs(postMoveActor.posX - p.posX), Math.abs(postMoveActor.posY - p.posY))
                })).sort((a, b) => a.dist - b.dist);

                if (updatedTargets.length > 0) {
                    const bestTarget = updatedTargets[0];
                    // Pick best action
                    const actions = postMoveActor.actions || [{ name: 'Attaque', range: 1.5, cost: 0 }];
                    const availableActions = actions.filter(a => (a.cost || 0) <= postMoveActor.resource);

                    // Simple AI: use longest range if ranged, or highest damage if melee
                    let chosenAction = availableActions.find(a => bestTarget.dist <= (a.range || 1.5));

                    if (chosenAction) {
                        executeAttack(bestTarget.unit, chosenAction);
                    } else {
                        // Could not attack, finish turn
                        finishTurn();
                    }
                } else {
                    finishTurn();
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [currentTurnIndex, combatState, currentActor?.id]);

    const UnitCard = ({ unit, style = {} }) => {
        const isCurrent = unit.id === currentActor?.id;
        const isTargetable = selectedAction && (unit.isEnemy !== currentActor?.isEnemy) && unit.hp > 0;
        const isDamaged = shakingId === unit.id;
        const isJumping = animatingId === unit.id;

        return (
            <div id={`unit-${unit.id}`}
                onClick={() => isTargetable && isLocalPlayerTurn && executeAttack(unit, selectedAction)}
                style={{
                    width: '100px', height: '100px', borderRadius: '50%', background: '#111',
                    border: isCurrent ? '4px solid var(--gold-primary)' : (isTargetable ? '4px solid #ff4444' : '2px solid rgba(255,255,255,0.2)'),
                    boxShadow: isCurrent ? '0 0 20px var(--gold-primary)' : '0 10px 20px rgba(0,0,0,0.5)',
                    position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: isTargetable ? 'crosshair' : (isCurrent ? 'pointer' : 'default'),
                    transition: 'left 0.7s cubic-bezier(0.4, 0, 0.2, 1), top 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s',
                    zIndex: isCurrent ? 20 : (isJumping ? 100 : 10), opacity: unit.hp <= 0 ? 0 : 1,
                    pointerEvents: unit.hp <= 0 ? 'none' : 'auto',
                    transform: 'translate(-50%, -50%)',
                    ...style
                }}>
                {/* Facing Indicator (Orbital) */}
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: '20px', height: '20px',
                    transform: `translate(-50%, -50%) rotate(${unit.facing === 'NORTH' ? 0 : (unit.facing === 'EAST' ? 90 : (unit.facing === 'SOUTH' ? 180 : 270))}deg) translateY(-60px)`,
                    zIndex: 30,
                    pointerEvents: 'none',
                    transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}>
                    <div style={{
                        width: '0', height: '0',
                        borderLeft: '10px solid transparent',
                        borderRight: '10px solid transparent',
                        borderBottom: '20px solid var(--gold-primary)',
                        filter: 'drop-shadow(0 0 10px var(--gold-primary))'
                    }} />
                </div>

                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
                    <img src={unit.portrait_url || 'https://placehold.co/150'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={unit.name} />
                    {/* Ring bars */}
                    <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="transparent" stroke="rgba(0,0,0,0.5)" strokeWidth="4" />
                        <circle cx="50" cy="50" r="48" fill="transparent" stroke={unit.isEnemy ? "#ff4444" : "#00ff00"} strokeWidth="4" strokeDasharray="301" strokeDashoffset={301 - (301 * (unit.hp / unit.maxHp))} style={{ transition: 'stroke-dashoffset 0.5s ease-out' }} />
                        <circle cx="50" cy="50" r="44" fill="transparent" stroke="var(--aether-blue)" strokeWidth="2" strokeDasharray="276" strokeDashoffset={276 - (276 * (unit.resource / unit.maxResource))} style={{ transition: 'stroke-dashoffset 0.5s ease-out' }} />
                    </svg>
                </div>

                {/* Info Panel below */}
                <div style={{
                    position: 'absolute', bottom: '-45px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px'
                }}>
                    <div style={{ background: 'rgba(0,0,0,0.85)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: 'white', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 'bold' }}>{unit.name}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ fontSize: '0.6rem', color: '#ff4444', fontWeight: 'bold' }}>{unit.hp}/{unit.maxHp} HP</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--aether-light)', fontWeight: 'bold' }}>{unit.resource} AP</div>
                    </div>
                </div>

                {/* Initiative Label */}
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '28px', height: '28px', background: '#222', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.75rem', border: '2px solid var(--gold-dim)', zIndex: 30 }}>{unit.initiative}</div>

                {/* Movement Points */}
                <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '28px', height: '28px', background: 'var(--aether-blue)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.75rem', border: '2px solid white', boxShadow: '0 0 10px rgba(0,180,255,0.5)', zIndex: 30 }}>{unit.currentPM}</div>

                {/* Status Badges */}
                <div style={{ position: 'absolute', right: '-35px', top: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {unit.hasMoved && <div style={{ width: '20px', height: '20px', background: '#444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', border: '1px solid #777' }} title="A déjà bougé">👟</div>}
                    {unit.hasActed && <div style={{ width: '20px', height: '20px', background: '#444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', border: '1px solid #777' }} title="A déjà agi">⚔️</div>}
                    {unit.behavior_type === 'RANGED' && unit.isEnemy && <div style={{ width: '20px', height: '20px', background: '#111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', border: '1px solid var(--gold-dim)' }} title="Archer">🏹</div>}
                </div>

                {damagePopups.filter(p => p.targetId === unit.id).map(p => (
                    <DamagePopup key={p.id} amount={p.amount} onDone={() => setDamagePopups(prev => prev.filter(x => x.id !== p.id))} />
                ))}
            </div>
        );
    };

    const AbilityCard = ({ ability }) => {
        const cost = ability.cost !== undefined ? ability.cost : (ability.name === 'Attaque' ? 0 : 20);
        const currentCooldown = cooldowns[currentActor?.id]?.[ability.name] || 0;
        const onCooldown = currentCooldown > 0;
        const canAfford = currentActor.resource >= cost && !onCooldown;
        const isSelected = selectedAction?.name === ability.name;
        return (
            <div onClick={() => canAfford && isLocalPlayerTurn && setSelectedAction(ability)}
                style={{
                    width: '120px', height: '160px', background: isSelected ? 'var(--gold-dim)' : (canAfford ? 'rgba(20,20,30,0.9)' : 'rgba(40,20,20,0.5)'),
                    border: isSelected ? '2px solid var(--gold-primary)' : '1px solid var(--gold-dim)', borderRadius: '8px', padding: '10px',
                    cursor: canAfford ? 'pointer' : 'not-allowed', transform: isSelected ? 'translateY(-20px)' : 'none', transition: 'all 0.3s',
                    opacity: canAfford ? 1 : 0.5, display: 'flex', flexDirection: 'column', position: 'relative'
                }}>
                {onCooldown && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white', zIndex: 10 }}>{currentCooldown}</div>}
                <div style={{ fontSize: '0.65rem', fontWeight: 'bold', color: isSelected ? 'black' : 'var(--gold-light)', textTransform: 'uppercase', marginBottom: '4px' }}>{ability.name}</div>
                <div style={{ flex: 1, fontSize: '0.6rem', color: isSelected ? '#111' : '#ccc' }}>{ability.desc}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4px' }}>
                    <span style={{ fontSize: '0.65rem' }}>{ability.range}m</span>
                    <div style={{ width: '20px', height: '20px', background: 'var(--aether-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'black' }}>{cost}</div>
                </div>
            </div>
        );
    };

    const RollOverlay = ({ roll, modifier, tacticalReason, threshold, success, action }) => (
        <div style={{ position: 'absolute', inset: 0, zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
            <DieVisual type="d20" value={roll} onComplete={() => handleRollComplete({ roll, modifier, threshold, success, targetId: rollOverlay.targetId, action })} />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <div style={{ fontSize: '1.2rem', color: 'white' }}>{roll} + {modifier} {tacticalReason && <span style={{ color: 'var(--gold-primary)', fontSize: '0.9rem' }}>({tacticalReason})</span>} = <span style={{ color: success ? '#00ff00' : '#ff4444' }}>{roll + modifier}</span></div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Cible: {threshold} AC</div>
            </div>
        </div>
    );

    const GameOverScreen = () => (
        <div style={{ position: 'absolute', inset: 0, zIndex: 3000, background: 'radial-gradient(circle at center, #2a0505 0%, #000 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '3rem', color: '#ff1111', fontFamily: 'var(--font-display)' }}>MORT DÉFINITIVE</h1>
            <button onClick={onGameOver} style={{ padding: '1rem 3rem', background: 'black', border: '2px solid #ff4444', color: '#ff4444', cursor: 'pointer' }}>RECOMMENCER</button>
        </div>
    );

    return (
        <div className={`modal-overlay ${shake ? 'shake' : ''} ${flash ? 'flash-red' : ''}`} style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'black', display: 'flex', flexDirection: 'column' }}>
            {combatState === 'finished' && !combatants.some(u => !u.isEnemy && u.hp > 0) && <GameOverScreen />}
            <div style={{ height: '80px', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.7)', borderBottom: '1px solid var(--gold-dim)' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: 'var(--gold-primary)', letterSpacing: '2px', fontSize: '1.1rem', fontWeight: 'bold' }}>COMBAT : ROUND {round}</span>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>{combatants.filter(u => u.hp > 0).length} combattants en lice</span>
                </div>
                {combatants.length > 0 && <TurnTracker combatants={combatants} currentTurnIndex={currentTurnIndex} />}
                <button onClick={() => onCombatEnd({ victory: false, flight: true })} style={{ color: '#ff4444', background: 'transparent', border: '1px solid #ff4444', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer' }}>FUIR</button>
            </div>
            <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>
                <div style={{
                    flex: 1, position: 'relative',
                    overflow: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px'
                }}>
                    <div style={{
                        position: 'relative',
                        width: `${arenaConfig.blocksX * 100}px`,
                        height: `${arenaConfig.blocksY * 100}px`,
                        background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0a 100%)',
                        backgroundSize: 'cover',
                        boxShadow: '0 0 100px #000',
                        border: '4px solid var(--gold-dim)',
                        borderRadius: '8px'
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            pointerEvents: 'none',
                            zIndex: 1
                        }}>
                            {/* Vertical Lines */}
                            {Array.from({ length: arenaConfig.blocksX + 1 }).map((_, i) => {
                                const tiles = i - Math.floor(arenaConfig.blocksX / 2);
                                const isMajor = tiles % 5 === 0;
                                const edgePercent = (i / arenaConfig.blocksX) * 100;
                                return (
                                    <div key={`v-${i}`} style={{ position: 'absolute', left: `${edgePercent}%`, top: 0, bottom: 0, width: isMajor ? '2px' : '1px', background: isMajor ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)' }}>
                                        {isMajor && <div style={{ position: 'absolute', bottom: '15px', padding: '2px 8px', background: 'rgba(0,0,0,0.85)', borderRadius: '12px', fontSize: '0.7rem', color: 'var(--gold-primary)', border: '1px solid var(--gold-dim)', transform: 'translateX(-50%)', zIndex: 10 }}>{tiles}</div>}
                                    </div>
                                );
                            })}
                            {/* Horizontal Lines */}
                            {Array.from({ length: arenaConfig.blocksY + 1 }).map((_, i) => {
                                const tiles = i - Math.floor(arenaConfig.blocksY / 2);
                                const isMajor = tiles % 5 === 0;
                                const edgePercent = (i / arenaConfig.blocksY) * 100;
                                return (
                                    <div key={`h-${i}`} style={{ position: 'absolute', top: `${edgePercent}%`, left: 0, right: 0, height: isMajor ? '2px' : '1px', background: isMajor ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)' }}>
                                        {isMajor && tiles !== 0 && <div style={{ position: 'absolute', left: '15px', padding: '2px 6px', background: 'rgba(0,0,0,0.85)', borderRadius: '8px', fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', transform: 'translateY(-50%)', zIndex: 10 }}>{tiles}</div>}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Range Illumination (Tactical Squares) */}
                        {(selectedAction || canMove) && isLocalPlayerTurn && currentActor && (
                            <>
                                {Array.from({ length: arenaConfig.blocksY }).map((_, yIdx) => {
                                    const y = yIdx - Math.floor(arenaConfig.blocksY / 2);
                                    return Array.from({ length: arenaConfig.blocksX }).map((_, xIdx) => {
                                        const x = xIdx - Math.floor(arenaConfig.blocksX / 2);
                                        const dx = x - currentActor.posX;
                                        const dy = y - currentActor.posY;
                                        // Chebyshev distance for "tactical squares"
                                        const dist = Math.max(Math.abs(dx), Math.abs(dy));

                                        let highlight = null;
                                        if (selectedAction) {
                                            if (dist <= (selectedAction.range || 1) && dist > 0) {
                                                highlight = { color: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.3)', glow: 'rgba(212, 175, 55, 0.2)' };
                                            }
                                        } else if (canMove && dist <= currentActor.currentPM && dist > 0) {
                                            highlight = { color: 'rgba(0, 150, 255, 0.08)', border: '1px dashed rgba(0, 150, 255, 0.4)', glow: 'rgba(0, 150, 255, 0.1)' };
                                        }

                                        if (highlight) {
                                            const pX = getPosPercent(x);
                                            const pY = getPosPercent(y, true);
                                            return (
                                                <div
                                                    key={`highlight-${x}-${y}`}
                                                    style={{
                                                        position: 'absolute',
                                                        left: `${pX}%`,
                                                        top: `${pY}%`,
                                                        width: `${100 / arenaConfig.blocksX}%`,
                                                        height: `${100 / arenaConfig.blocksY}%`,
                                                        background: highlight.color,
                                                        border: highlight.border,
                                                        boxShadow: `inset 0 0 15px ${highlight.glow}`,
                                                        transform: 'translate(-50%, -50%)',
                                                        zIndex: 1,
                                                        pointerEvents: 'none',
                                                        transition: 'all 0.4s'
                                                    }}
                                                />
                                            );
                                        }
                                        return null;
                                    });
                                })}
                            </>
                        )}

                        {/* Arena Decor */}
                        {decor.map(d => (
                            <div key={d.id} style={{
                                position: 'absolute',
                                left: `${getPosPercent(d.posX)}%`,
                                top: `${getPosPercent(d.posY, true)}%`,
                                width: `${d.size}px`,
                                height: `${d.size}px`,
                                background: d.color,
                                boxShadow: `0 0 30px ${d.color}`,
                                opacity: 0.5,
                                borderRadius: d.name === 'Éclat de Vide' ? '20% 80%' : '8px',
                                transform: 'translate(-50%, -50%) rotate(45deg)',
                                pointerEvents: 'none',
                                border: '2px solid rgba(255,255,255,0.15)',
                                zIndex: 4
                            }}>
                                <div style={{ position: 'absolute', bottom: '-20px', width: '100%', textAlign: 'center', fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', fontWeight: 'bold', transform: 'rotate(-45deg)' }}>{d.name}</div>
                            </div>
                        ))}

                        {/* Arena Units (2D Positioning) */}
                        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
                            {combatants.map((u, index) => {
                                const x = getPosPercent(u.posX);
                                const y = getPosPercent(u.posY, true);
                                return <UnitCard key={u.id} unit={u} style={{ left: `${x}%`, top: `${y}%` }} />;
                            })}
                        </div>
                    </div>
                </div>
                <div style={{ width: '320px', background: 'rgba(0,0,0,0.9)', padding: '1.5rem', overflowY: 'auto', borderLeft: '2px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                    {logs.map((l, i) => {
                        const isImpact = l.content.includes('💥') || l.content.includes('💀');
                        const isVictory = l.content.includes('🏆');
                        return (
                            <div key={i} style={{
                                marginBottom: '0.8rem',
                                fontSize: isVictory ? '1.1rem' : (isImpact ? '0.95rem' : '0.9rem'),
                                color: isVictory ? 'var(--gold-primary)' : (isImpact ? '#fff' : 'rgba(255,255,255,0.8)'),
                                borderLeft: isVictory ? '4px solid var(--gold-primary)' : '2px solid var(--gold-dim)',
                                paddingLeft: '10px',
                                background: isImpact ? 'rgba(255,0,0,0.1)' : 'transparent',
                                borderRadius: '0 4px 4px 0'
                            }}>
                                {l.content}
                            </div>
                        );
                    })}
                    <div ref={logEndRef} />
                </div>
                {rollOverlay && <RollOverlay {...rollOverlay} />}
                {remoteAction && <RemoteActionOverlay action={remoteAction} onComplete={() => setRemoteAction(null)} />}
            </div>
            <div style={{ height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'linear-gradient(to top, #000, transparent)' }}>
                {isLocalPlayerTurn ? (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                            <div /> <button onClick={() => executeMove('up')} disabled={!canMove} className="btn-action" style={{ width: '40px', height: '40px' }}>⬆️</button> <div />
                            <button onClick={() => executeMove('left')} disabled={!canMove} className="btn-action" style={{ width: '40px', height: '40px' }}>⬅️</button>
                            <button onClick={() => executeMove('down')} disabled={!canMove} className="btn-action" style={{ width: '40px', height: '40px' }}>⬇️</button>
                            <button onClick={() => executeMove('right')} disabled={!canMove} className="btn-action" style={{ width: '40px', height: '40px' }}>➡️</button>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            {[{ name: 'Attaque', desc: 'Attaque de base', range: 2 }, ...(currentActor.spells || currentActor.abilities || [])].map((s, i) => <AbilityCard key={i} ability={typeof s === 'string' ? { name: s, range: 2 } : s} />)}
                            <button onClick={nextTurn} style={{ padding: '1rem 2rem', background: 'rgba(255,0,0,0.1)', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>FINIR LE TOUR</button>
                        </div>
                    </>
                ) : <div style={{ color: 'var(--gold-dim)', fontSize: '1.2rem', letterSpacing: '1px' }}>{currentActor?.isEnemy ? "L'ennemi réfléchit..." : `Attente de ${currentActor?.name}...`}</div>}
                {combatState === 'finished' && <button onClick={onCombatEnd} className="btn-gold" style={{ padding: '1rem 3rem' }}>RETOUR</button>}
            </div>
        </div>
    );
};
