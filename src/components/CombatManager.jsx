import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CLASSES, BESTIARY } from '../lore';
import { CombatLogger } from '../utils/logger';
import { supabase } from '../supabaseClient';
import { DieVisual } from './DieVisual';
import { DiceOverlay2D } from './Dice2D';
import {
    rollAttackD100,
    calculateDamageD100,
    calculateCombatantAC,
    formatCombatLogD100
} from '../utils/combat-d100';
import { getModifier, getProficiencyBonus } from '../lore/rules';
import { getPartyAverageLevel, scaleEnemyForPartyLevel } from '../utils/combat-progression';
import TurnTracker from './TurnTracker';
import { resolveCharacterAbilities } from '../utils/characterUtils';
import './CombatManager.css';

const COMBAT_DEBUG = typeof window !== 'undefined' && window.localStorage?.getItem('combat_debug') === '1';
const debugLog = (...args) => {
    if (COMBAT_DEBUG) console.log(...args);
};
const debugWarn = (...args) => {
    if (COMBAT_DEBUG) console.warn(...args);
};

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



const RemoteActionOverlay = ({ action, onComplete }) => {
    const remoteDiceRolls = useMemo(() => [{ type: 'd100', value: action?.roll }], [action?.roll]);

    useEffect(() => {
        const timer = setTimeout(onComplete, 4500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!action) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 12000,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.1)', // Very subtle dimming
            pointerEvents: 'none'
        }}>
            {/* Multi-Dice 2D Overlay */}
            <DiceOverlay2D
                diceRolls={remoteDiceRolls}
                onAllComplete={() => { }}
            />

                <div style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 12001,
                pointerEvents: 'none'
            }}>
                <div style={{
                    marginBottom: '40px', fontSize: '2.5rem', fontFamily: 'var(--font-display)',
                    color: 'var(--gold-light)', textShadow: '0 0 20px rgba(0,0,0,1)',
                    textAlign: 'center', animation: 'scaleUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                    <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '10px' }}>Action Ennemie</div>
                    {action.attackerName} : <span style={{ color: 'white' }}>{action.abilityName.toUpperCase()}</span>
                </div>

                <div style={{ minHeight: '30vh' }} />

                <div style={{
                    marginTop: '20px', textAlign: 'center',
                    padding: '30px 50px', borderRadius: '20px',
                    animation: 'slideUpFade 0.5s 0.8s both',
                    textShadow: '0 2px 10px #000'
                }}>
                    <div style={{ fontSize: '3rem', color: 'white', fontWeight: '900' }}>
                        {action.roll} <span style={{ color: 'var(--gold-primary)', fontSize: '1.5rem' }}>+ {action.modifier}</span> =
                        <span style={{
                            marginLeft: '20px',
                            color: action.success ? '#00ff00' : '#ff4444',
                            textShadow: action.success ? '0 0 20px rgba(0,255,0,0.8)' : '0 0 20px rgba(255,0,0,0.8)'
                        }}>
                            {action.roll + action.modifier}
                        </span>
                    </div>
                    <div style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginTop: '10px', fontWeight: 'bold' }}>
                        Cible : <span style={{ color: 'white' }}>{action.threshold} AC</span>
                    </div>
                    {action.success && (
                        <div style={{
                            marginTop: '20px', fontSize: '2.5rem', color: '#ff4444', fontWeight: '900',
                            textShadow: '0 0 15px rgba(255,0,0,1)',
                            animation: 'shockwave 0.5s ease-out'
                        }}>
                            💥 -{action.damage} HP !
                        </div>
                    )}
                </div>
                </div>
            </div>
        );
};

export const CombatManager = ({ arenaConfig = { blocksX: 40, blocksY: 40, shapeType: 'STANDARD' }, players, currentUserId, initialEnemies, syncedCombatState, onUpdateCombatState, onCombatEnd, onLogAction, onHPChange, onResourceChange, onConsumeItem, onGameOver, onRewards, onVFX, onSFX, sessionId }) => {
    // ROBUST USER ID MATCHING - Try multiple methods (MEMOIZED with stable comparison)
    const myPlayer = useMemo(() => {
        if (!players || !currentUserId) return null;
        // Method 1: Direct user_id match
        let found = players.find(p => p.user_id === currentUserId);
        if (found) return found;
        // Method 2: Check if currentUserId matches any player's id
        found = players.find(p => p.id === currentUserId);
        return found;
    }, [players, currentUserId]); // Track full players array for deep state updates

    // Track if already logged to prevent duplicate logs
    const hasLoggedInitRef = useRef(false);

    // Log only once on first mount
    useEffect(() => {
        if (hasLoggedInitRef.current) return;
        hasLoggedInitRef.current = true;

        debugLog(`[CombatManager] ====== COMBAT INIT ======`);
        debugLog(`[CombatManager] currentUserId: ${currentUserId}`);
        debugLog(`[CombatManager] players (${players?.length}):`, players?.map(p => ({ name: p.name, user_id: p.user_id, id: p.id })));
        debugLog(`[CombatManager] myPlayer found: ${myPlayer?.name} (user_id: ${myPlayer?.user_id}, id: ${myPlayer?.id})`);

        if (COMBAT_DEBUG) {
            CombatLogger.log('INIT', 'Combat Manager Initialized', {
                currentUserId,
                playersCount: players?.length,
                players: players?.map(p => ({ name: p.name, user_id: p.user_id, id: p.id })),
                myPlayer: myPlayer ? { name: myPlayer.name, user_id: myPlayer.user_id, id: myPlayer.id } : null
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty deps = run once on mount

    const [combatants, setCombatants] = useState([]);
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
    const [round, setRound] = useState(1);
    const [combatState, setCombatState] = useState('initiative'); // initiative, active, finished
    const [selectedAction, setSelectedAction] = useState(null);
    const [shake, setShake] = useState(false);
    const [flash, setFlash] = useState(false);

    // Track if AI has already played this turn to prevent duplicate actions
    const aiTurnExecutedRef = useRef({ turnIndex: -1, actorId: null });
    const resolvedRollsRef = useRef(new Set());

    // Track last attack to prevent rapid duplicates
    const lastAttackRef = useRef({ timestamp: 0, actorId: null, targetId: null });

    // CLEANUP FIX: Centralized timeout management
    const timeoutsRef = useRef([]);
    const addTimeout = useCallback((timeoutId) => {
        timeoutsRef.current.push(timeoutId);
    }, []);

    const [animatingId, setAnimatingId] = useState(null);
    const [, setShakingId] = useState(null);
    const [damagePopups, setDamagePopups] = useState([]);
    const [rollOverlay, setRollOverlay] = useState(null);
    const [cooldowns, setCooldowns] = useState({});
    const [logs, setLogs] = useState([]);
    const [decor, setDecor] = useState([]);
    const [remoteAction, setRemoteAction] = useState(null); // { attackerName, abilityName, roll, modifier, targetName, threshold, success, damage, id }
    const [movingUnit, setMovingUnit] = useState(null); // { id, animX, animY }

    // NEW UI & PLANNING STATE
    const [arenaScale, setArenaScale] = useState(1);
    const [isPathPlanning, setIsPathPlanning] = useState(false);
    const [plannedPath, setPlannedPath] = useState([]); // Array of [x, y] coordinates
    const [hoveredTile, setHoveredTile] = useState(null);
    const [characterMenuOpen, setCharacterMenuOpen] = useState(false); // Toggle diegetic UI on character click
    const [hoveredAbility, setHoveredAbility] = useState(null); // Track hovered ability for tooltip
    const logEndRef = useRef(null);
    const lastSyncRef = useRef(0);
    const lastActionIdRef = useRef(null);
    const combatantsRef = useRef(combatants);
    const animationFrameRef = useRef(null);

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
                    if (movingUnit) {
                        // Ignore external snapshots while a local movement animation is running.
                        return;
                    }

                    if (!newState.combatants || newState.combatants.length === 0) {
                        return;
                    }

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
    }, [sessionId, combatState, logs.length, movingUnit]);

    // Real-time ACTION broadcast subscription - REPLICATE ALL PLAYER ACTIONS
    useEffect(() => {
        if (!sessionId) return;

        const actionChannel = supabase
            .channel(`combat_actions_${sessionId}`)
            .on('broadcast', { event: 'player_action' }, (payload) => {
                const action = payload.payload;
                if (!action || action.sourceUserId === currentUserId) return;

                debugLog('[Action Broadcast] Received action from other player:', action);

                // Replicate the action locally
                switch (action.type) {
                    case 'attack':
                        // Show remote attack animation
                        setRemoteAction({
                            attackerName: action.attackerName,
                            abilityName: action.abilityName,
                            roll: action.roll,
                            modifier: action.modifier,
                            targetName: action.targetName,
                            threshold: action.threshold,
                            success: action.success,
                            damage: action.damage,
                            id: action.id
                        });
                        break;
                    case 'movement':
                        // Animate remote player movement
                        if (action.path && action.path.length > 0) {
                            animateRemoteMovement(action.actorId, action.path);
                        }
                        break;
                    case 'vfx':
                        // Trigger visual effects
                        if (onVFX && action.vfxType) {
                            onVFX(action.vfxType, action.x, action.y, action.color);
                        }
                        break;
                    case 'sfx':
                        // Trigger sound effects
                        if (onSFX && action.sfxType) {
                            onSFX(action.sfxType);
                        }
                        break;
                    case 'dice_roll':
                        // Show dice roll for other players
                        setRollOverlay({
                            rollId: action.rollId,
                            roll: action.roll,
                            modifier: action.modifier,
                            tacticalReason: action.tacticalReason,
                            threshold: action.threshold,
                            success: action.success,
                            isCritical: action.isCritical,
                            type: action.rollType,
                            targetId: action.targetId,
                            action: action.actionData
                        });
                        break;
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(actionChannel);
        };
    }, [sessionId, currentUserId]);

    // Helper to animate remote player movement
    const animateRemoteMovement = async (actorId, path) => {
        if (!path || path.length === 0) return;

        for (let i = 0; i < path.length; i++) {
            const [x, y] = path[i];
            setMovingUnit({ id: actorId, animX: x, animY: y });
            await new Promise(r => setTimeout(r, 300));
        }
        setMovingUnit(null);
    };

    // Broadcast action to all other players
    const broadcastAction = useCallback(async (actionType, actionData) => {
        if (!sessionId) return;

        const channel = supabase.channel(`combat_actions_${sessionId}`);
        // Use send() with explicit HTTP fallback (new Supabase API)
        await channel.send({
            type: 'broadcast',
            event: 'player_action',
            payload: {
                type: actionType,
                sourceUserId: currentUserId,
                timestamp: Date.now(),
                ...actionData
            }
        });
        debugLog('[Action Broadcast] Sent:', actionType, actionData);
    }, [sessionId, currentUserId]);

    // CLEANUP FIX: Clear all timeouts on unmount
    useEffect(() => {
        return () => {
            debugLog('[CombatManager] Cleanup: Clearing all pending timeouts');
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const addLog = (msg) => {
        setLogs(prev => [...prev, { ...msg, id: Math.random() }]);
        if (onLogAction) onLogAction(msg);
    };

    // SYNC: Update local state from Shared State
    useEffect(() => {
        // CRITICAL FIX: Ignore synced state if we are in local Debug Mode (initialEnemies set)
        if (initialEnemies && initialEnemies.length > 0) return;

        debugLog('[SYNC] useEffect triggered', {
            updatedAt: syncedCombatState?.updatedAt,
            lastSync: lastSyncRef.current,
            shouldSkip: syncedCombatState?.updatedAt && syncedCombatState?.updatedAt <= lastSyncRef.current,
            active: syncedCombatState?.active,
            movingUnit: movingUnit // Log if animation is active
        });

        if (syncedCombatState && syncedCombatState.active) {
            // CRITICAL FIX: Only apply if this is a newer update than what we already have
            if (syncedCombatState.updatedAt && syncedCombatState.updatedAt <= lastSyncRef.current) {
                debugLog('[SYNC] Skipping - already have this update');
                return; // Skip - we already have this or a newer update
            }

            // CRITICAL FIX: Block DB sync during active animations to prevent position rollback
            if (movingUnit) {
                debugLog('[SYNC] BLOCKED - Animation in progress, will sync after completion');
                return; // Skip sync while unit is animating to avoid overwriting intermediate positions
            }

            // CRITICAL PROTECTION: If we receive an empty combatants list, IGNORE it (it's likely a blink during update)
            if (!syncedCombatState.combatants || syncedCombatState.combatants.length === 0) {
                debugWarn('[SYNC] Received empty combatants list - IGNORING to prevent turn skip/crash');
                return;
            }

            debugLog(`[Combat Sync] ====== RECEIVING SYNCED STATE ======`);
            debugLog(`[Combat Sync] Combatants count: ${syncedCombatState.combatants?.length}`);

            lastSyncRef.current = syncedCombatState.updatedAt || Date.now();

            setCombatants(prev => {
                const syncedCombatants = syncedCombatState.combatants || [];

                // 1. Identify our local player (critical to preserve)
                let localPlayer = prev.find(p => !p.isEnemy && p.user_id === currentUserId);

                if (!localPlayer && myPlayer) {
                    localPlayer = {
                        ...myPlayer,
                        isEnemy: false,
                        hp: myPlayer.hp ?? myPlayer.stats?.hp ?? 100,
                        maxHp: myPlayer.maxHp ?? myPlayer.stats?.maxHp ?? 100,
                        resource: myPlayer.resource ?? myPlayer.stats?.resource ?? 100,
                        maxResource: myPlayer.maxResource ?? myPlayer.stats?.maxResource ?? 100,
                        posX: myPlayer.posX ?? 0,
                        posY: myPlayer.posY ?? 0,
                        facing: myPlayer.facing || 'SOUTH',
                        currentPM: myPlayer.currentPM ?? myPlayer.pm ?? 5,
                        maxPM: myPlayer.maxPM ?? myPlayer.pm ?? 5,
                        hasMoved: myPlayer.hasMoved ?? false,
                        hasActed: myPlayer.hasActed ?? false,
                        initiative: myPlayer.initiative ?? (Math.floor(Math.random() * 20) + (myPlayer.stats?.dexterity || 10))
                    };
                }

                // 2. Merge logic: preservation is key
                const updatedCombatants = syncedCombatants.map(syncedP => {
                    const localP = prev.find(p => p.id === syncedP.id);
                    if (!localP) return syncedP;
                    return {
                        ...localP,
                        ...syncedP,
                        hp: syncedP.hp ?? localP.hp,
                        maxHp: syncedP.maxHp ?? localP.maxHp,
                    };
                });

                // 3. Ensure the local player is ALWAYS present even if missing from sync
                if (localPlayer && !updatedCombatants.some(p => p.id === localPlayer.id)) {
                    debugWarn('[SYNC] Local player missing from sync! Re-inserting.');
                    updatedCombatants.push(localPlayer);
                }

                return updatedCombatants.sort((a, b) => (b.initiative || 0) - (a.initiative || 0));
            });

            setRound(syncedCombatState.round || 1);

            // Only update turn index if it changed - prevents UI flickers
            setCurrentTurnIndex(prev => {
                if (syncedCombatState.turnIndex !== undefined && syncedCombatState.turnIndex !== prev) {
                    debugLog(`[Combat Sync] Turn changing: ${prev} -> ${syncedCombatState.turnIndex}`);
                    return syncedCombatState.turnIndex;
                }
                return prev;
            });

            setCombatState('active');
            if (syncedCombatState.decor) setDecor(syncedCombatState.decor);

            // Check for new actions to verify
            if (syncedCombatState.lastAction && syncedCombatState.lastAction.id !== lastActionIdRef.current) {
                const action = syncedCombatState.lastAction;
                lastActionIdRef.current = action.id;

                if (action.sourceUserId !== currentUserId) {
                    setRemoteAction(action);

                    // Also trigger SFX/VFX
                    if (action.success) {
                        if (onSFX) setTimeout(() => onSFX('damage'), 800);
                        if (onVFX) onVFX('blood',
                            window.innerWidth / 2,
                            window.innerHeight / 2,
                            '#ff0000'
                        );
                    } else {
                        if (onVFX) onVFX('spark', window.innerWidth / 2, window.innerHeight / 2, '#ffff00');
                    }
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [syncedCombatState?.updatedAt, currentUserId, movingUnit]); // Re-check sync when animation completes

    // ARENA CENTERING & SCALE EFFECT
    useEffect(() => {
        const updateScale = () => {
            const container = document.querySelector('.combat-arena-container');
            const arena = document.querySelector('.combat-arena');
            if (container && arena) {
                const padding = 120;
                const vh = window.innerHeight * 0.9;
                const vw = window.innerWidth * 0.95;

                const scaleX = (vw - padding) / arena.offsetWidth;
                const scaleY = (vh - padding) / arena.offsetHeight;
                const scale = Math.min(scaleX, scaleY, 1.0);
                setArenaScale(scale);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        const timer = setTimeout(updateScale, 500); // Initial delay to ensure DOM is ready
        return () => {
            window.removeEventListener('resize', updateScale);
            clearTimeout(timer);
        };
    }, []);

    const getPosPercent = (pos, isY = false) => {
        const blocks = isY ? arenaConfig.blocksY : arenaConfig.blocksX;
        const offset = Math.floor(blocks / 2);
        return ((pos + 0.5 + offset) / blocks) * 100;
    };

    // Handle ESC key to cancel selected action
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedAction) {
                setSelectedAction(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedAction]);

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
                debugLog(`[Combat Init] Loading player for combat: ${p.name}, user_id: ${p.user_id}, id: ${p.id}`);
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

                // Appliquer les bonus de traits LifePath
                const mechanicalTraits = p.mechanical_traits || [];
                const skillBonuses = p.skill_bonuses || [];

                // Calculer les bonus passifs des traits
                let bonusAC = 0;
                let bonusAtk = 0;
                let bonusDamage = 0;
                let bonusDiceDamage = ''; // Format: "1d6" ou "2d6"
                let resistances = {}; // Ex: { fire: 5, cold: 10 }
                let passiveTraits = [];

                mechanicalTraits.forEach(trait => {
                    if (trait.name) {
                        passiveTraits.push(trait);
                        // Parser les effets mécaniques (ex: "+2 AC", "+1 ATK", "+1d6 Sneak Attack")
                        const acMatch = trait.effect?.match(/\+(\d+)\s*AC/i);
                        const atkMatch = trait.effect?.match(/\+(\d+)\s*(ATK|Attaque)/i);
                        const dmgMatch = trait.effect?.match(/\+(\d+)\s*(DMG|dégâts)/i);
                        const diceMatch = trait.effect?.match(/\+(\d+)d(\d+)/i); // +1d6, +2d8, etc.

                        // Parser résistances (ex: "Fire 5", "Résistance Feu 10")
                        const fireResist = trait.effect?.match(/(?:Fire|Feu)\s+(\d+)/i);
                        const coldResist = trait.effect?.match(/(?:Cold|Froid)\s+(\d+)/i);
                        const poisonResist = trait.effect?.match(/(?:Poison)\s+(\d+)/i);

                        if (acMatch) bonusAC += parseInt(acMatch[1]);
                        if (atkMatch) bonusAtk += parseInt(atkMatch[1]);
                        if (dmgMatch) bonusDamage += parseInt(dmgMatch[1]);
                        if (diceMatch) bonusDiceDamage = `${diceMatch[1]}d${diceMatch[2]}`;

                        if (fireResist) resistances.fire = parseInt(fireResist[1]);
                        if (coldResist) resistances.cold = parseInt(coldResist[1]);
                        if (poisonResist) resistances.poison = parseInt(poisonResist[1]);
                    }
                });

                // ========== STATS D100 ==========
                // STR, DEX, CON etc. restent 1-30 (déjà dans p.stats)
                const level = p.level || 1;

                // CA d100 : calculer depuis armure + DEX
                const armorAC = p.equipment?.reduce((acc, item) => acc + (item.stats?.ac || 0), 0) || 0;
                const combatantData = {
                    ...stats,
                    armor_ac: armorAC,
                    armor_category: p.armor_category || 'light', // Devrait être défini dans équipement
                    has_shield: p.has_shield || false,
                    level
                };
                const calculatedAC = calculateCombatantAC(combatantData) + (bonusAC * 3); // bonusAC traits × 3 pour d100

                // ATK d100 : mod attribut + bonus maîtrise + bonus traits
                const strMod = getModifier(stats.str || 15);
                const profBonus = getProficiencyBonus(level);
                const calculatedATK = strMod + profBonus + (bonusAtk * 3); // bonusAtk traits × 3

                return {
                    id: p.id,
                    user_id: p.user_id,
                    name: p.name,
                    class: charClass,
                    level,
                    // Stats d100
                    str: stats.str || 15,
                    dex: stats.dex || 15,
                    con: stats.con || 15,
                    int: stats.int || 12,
                    wis: stats.wis || 12,
                    cha: stats.cha || 10,
                    atk: calculatedATK,
                    ac: calculatedAC,
                    hp: p.hp,
                    maxHp: p.max_hp,
                    resource: p.resource ?? 100,
                    maxResource: p.max_resource ?? 100,
                    resourceName: "Energie",
                    initiative: Math.floor(Math.random() * 20) + 1 + dexMod, // TODO: Initiative d100 (d100 + DEX)
                    isEnemy: false,
                    portrait_url: p.portrait_url,
                    spells: combinedAbilities,
                    inventory: p.inventory || [],
                    arrivalTurns,
                    travelStatus: status,
                    posX: pos.x,
                    posY: pos.y,
                    maxPM: Math.floor((stats.dex + stats.con - 20) / 4) + 5,
                    currentPM: Math.floor((stats.dex + stats.con - 20) / 4) + 5,
                    facing: 'EAST',
                    hasMoved: false,
                    hasActed: false,
                    lifepath_traits: passiveTraits,
                    skill_bonuses: skillBonuses,
                    bonus_damage: bonusDamage,
                    bonus_dice_damage: bonusDiceDamage,
                    resistances: resistances
                };
            });

            const partyLevel = getPartyAverageLevel(playerCombatants);

            const enemiesToUse = (initialEnemies && initialEnemies.length > 0) ? initialEnemies.map((e, idx) => {
                const pos = getUniquePos(true);
                const baseEnemy = BESTIARY[e.name.split(' ')[0]] || BESTIARY[e.class] || {};

                const baseEnemyCombatant = {
                    id: e.id || `ai-enemy-${idx}`,
                    name: e.name || "Ennemi Inconnu",
                    class: e.class || "Monstre",
                    hp: e.hp || baseEnemy.stats?.hp || 20,
                    maxHp: e.maxHp || e.max_hp || e.hp || baseEnemy.stats?.hp || 20,
                    atk: e.atk || baseEnemy.stats?.atk || 5,
                    ac: e.ac || baseEnemy.stats?.ac || 12,
                    // Stats par défaut (si bestiaire pas encore converti)
                    str: e.str || baseEnemy.stats?.str || 14,
                    dex: e.dex || baseEnemy.stats?.dex || 12,
                    con: e.con || baseEnemy.stats?.con || 14,
                    int: e.int || 8,
                    wis: e.wis || 10,
                    cha: e.cha || 8,
                    level: e.level || baseEnemy.cr || 1,
                    resource: 50,
                    maxResource: 50,
                    resourceName: "Mana",
                    initiative: e.initiative || (Math.floor(Math.random() * 10) + 5),
                    isEnemy: true,
                    user_id: null, // CRITICAL: Enemies have no user_id
                    posX: pos.x,
                    posY: pos.y,
                    maxPM: baseEnemy.stats?.maxPM || 5,
                    currentPM: baseEnemy.stats?.maxPM || 5,
                    behavior_type: e.behavior_type || baseEnemy.behavior_type || "MELEE",
                    actions: e.actions || baseEnemy.actions || [{ name: 'Attaque', range: 1.5, damage_dice: '1d30' }],
                    facing: 'WEST',
                    hasMoved: false,
                    hasActed: false,
                    portrait_url: (e.portrait && e.portrait.startsWith('http')) ? e.portrait : (baseEnemy.portrait_url || `https://loremflickr.com/320/450/fantasy,monster,${e.name?.split(' ')[0] || 'creature'}/all`)
                };

                return scaleEnemyForPartyLevel(baseEnemyCombatant, partyLevel);
            }) : [
                // Ennemis par défaut (DÉJÀ CONVERTIS D100)
                {
                    id: 'e1',
                    name: "Scouteur Gobelin",
                    class: "Guerrier",
                    hp: 75,          // Ancien 15 × 5
                    maxHp: 75,
                    atk: 8,          // Ancien 3 × 2.5 arrondi
                    ac: 33,          // Ancien 13 converti
                    str: 10, dex: 16, con: 12, int: 8, wis: 10, cha: 6,
                    level: 1,
                    resource: 20,
                    maxResource: 20,
                    resourceName: "Rage",
                    initiative: 12,
                    isEnemy: true,
                    posX: 5,
                    posY: 0,
                    hasMoved: false,
                    hasActed: false,
                    portrait_url: "https://images.squarespace-cdn.com/content/v1/55ef483ce4b08053a4798e69/1472502693766-U9JOPM87W9PDKMOK99E6/goblinknight.jpg",
                    maxPM: 5,
                    currentPM: 5,
                    behavior_type: "RANGED",
                    actions: [
                        { name: 'Arc court', range: 12, damage_dice: '1d30' },
                        { name: 'Cimeterre', range: 1.5, damage_dice: '1d30' }
                    ]
                }
            ];

            const all = [...playerCombatants, ...enemiesToUse];
            const sorted = all.sort((a, b) => b.initiative - a.initiative);

            debugLog(`[Combat Init] ====== LOCAL INITIALIZATION (HOST) ======`);
            debugLog(`[Combat Init] Total combatants: ${sorted.length}`);
            sorted.forEach((c, i) => {
                debugLog(`[Combat Init] [${i}] name: ${c.name}, isEnemy: ${c.isEnemy}, user_id: ${c.user_id}, initiative: ${c.initiative}`);
            });

            setCombatants(sorted);
            setCombatState('active');

            // CRITICAL: Sync initial state to other players
            if (onUpdateCombatState) {
                debugLog(`[Combat Init] SENDING initial sync to other players`);
                sorted.forEach((c, i) => {
                    debugLog(`[Combat Init SEND] [${i}] name: ${c.name}, isEnemy: ${c.isEnemy}, user_id: ${c.user_id}`);
                });
                onUpdateCombatState({
                    combatants: sorted,
                    turnIndex: 0,
                    round: 1,
                    active: true,
                    logs: [],
                    decor: [],
                    updatedAt: Date.now()
                });
            }

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [combatState, players?.length, initialEnemies?.length, syncedCombatState]); // Use lengths instead of arrays to avoid unnecessary re-inits

    const [isInitializing, setIsInitializing] = useState(true);

    // Initialisation grace period
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitializing(false);
            debugLog('[CombatManager] Initialization period ended.');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // CHECK VICTORY / DEFEAT
    useEffect(() => {
        if (isInitializing) return;

        if (combatState === 'active' && combatants.length > 0) {
            const enemiesAlive = combatants.filter(u => u.isEnemy && u.hp > 0);
            const playersAlive = combatants.filter(u => !u.isEnemy && u.hp > 0);

            debugLog(`[Combat Check] Enemies alive: ${enemiesAlive.length}, Players alive: ${playersAlive.length}`);
            if (COMBAT_DEBUG) {
                combatants.forEach(c => {
                    debugLog(` - Combatant: ${c.name} (isEnemy: ${c.isEnemy}, hp: ${c.hp}/${c.maxHp}, user_id: ${c.user_id})`);
                });
            }

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
                debugWarn('[CombatManager] GAME OVER TRIGGERED: No players alive.');
                setCombatState('finished');
                onGameOver();
            }
        }
    }, [combatants, combatState, onRewards, onCombatEnd, onGameOver, onLogAction, isInitializing]);

    const currentActor = combatants[currentTurnIndex];

    // ROBUST TURN DETECTION - Check multiple ways if it's my turn (MEMOIZED to prevent re-renders)
    const isLocalPlayerTurn = useMemo(() => {
        if (!currentActor || currentActor.isEnemy) return false;
        // Method 1: Direct user_id match
        if (currentActor.user_id && currentActor.user_id === currentUserId) return true;
        // Method 2: Match by player id
        if (currentActor.id && myPlayer && currentActor.id === myPlayer.id) return true;
        // Method 3: Match by name as last resort
        if (myPlayer && currentActor.name === myPlayer.name) return true;
        return false;
    }, [currentActor, currentUserId, myPlayer]);

    // Log only when turn actually changes (not on every render)
    useEffect(() => {
        if (currentActor) {
            debugLog(`[Combat Turn] ====== TURN CHECK ======`);
            debugLog(`[Combat Turn] currentActor: ${currentActor.name}, user_id: ${currentActor.user_id}, id: ${currentActor.id}, isEnemy: ${currentActor.isEnemy}`);
            debugLog(`[Combat Turn] currentUserId: ${currentUserId}`);
            debugLog(`[Combat Turn] myPlayer: ${myPlayer?.name}, user_id: ${myPlayer?.user_id}, id: ${myPlayer?.id}`);
            debugLog(`[Combat Turn] isLocalPlayerTurn: ${isLocalPlayerTurn}`);

            if (COMBAT_DEBUG) {
                CombatLogger.log('TURN', 'Turn Check', {
                    currentActor: { name: currentActor.name, user_id: currentActor.user_id, id: currentActor.id, isEnemy: currentActor.isEnemy },
                    currentUserId,
                    myPlayer: myPlayer ? { name: myPlayer.name, user_id: myPlayer.user_id, id: myPlayer.id } : null,
                    isLocalPlayerTurn
                });
            }
        }
    }, [currentTurnIndex, isLocalPlayerTurn, currentActor, currentUserId, myPlayer]); // Only log when turn index or decision changes

    // MEMOIZED to prevent unnecessary re-calculations
    const canMove = useMemo(() =>
        isLocalPlayerTurn && currentActor && currentActor.currentPM > 0 && currentActor.resource > 0 && combatState === 'active',
        [isLocalPlayerTurn, currentActor, combatState]
    );

    const canAct = useMemo(() =>
        isLocalPlayerTurn && currentActor && !currentActor.hasActed && currentActor.resource > 0 && combatState === 'active',
        [isLocalPlayerTurn, currentActor, combatState]
    );

    const resourceDisplayName = useMemo(() => {
        const rawName = (currentActor?.resourceName || '').toLowerCase();
        if (rawName.includes('mana')) return 'Mana';
        if (rawName.includes('endu') || rawName.includes('energ') || rawName.includes('rage') || rawName.includes('stamina')) {
            return 'Endurance';
        }
        const className = (currentActor?.class || '').toLowerCase();
        if (className.includes('mage') || className.includes('sorcier') || className.includes('prêtre')) return 'Mana';
        return 'Endurance';
    }, [currentActor?.resourceName, currentActor?.class]);

    const selectedActionCost = useMemo(() => {
        if (!selectedAction) return 0;
        return selectedAction.cost !== undefined ? selectedAction.cost : (selectedAction.name === 'Attaque' ? 0 : 20);
    }, [selectedAction]);

    const actorAbilities = useMemo(() => {
        if (!currentActor) return [];
        return [
            { name: 'Attaque', desc: 'Attaque de base rapide', range: 2 },
            { name: 'Se déplacer', desc: `Se déplacer de ${currentActor.currentPM} cases maximum`, range: currentActor.currentPM, isMovement: true },
            ...resolveCharacterAbilities(currentActor)
        ];
    }, [currentActor]);

    const projectedResourceAfterCast = useMemo(() => {
        if (!currentActor) return 0;
        return Math.max(0, currentActor.resource - selectedActionCost);
    }, [currentActor, selectedActionCost]);

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

    // Animation helper for smooth step-by-step movement
    const animateMovement = (unitId, fromX, fromY, toX, toY, onComplete) => {
        const ANIMATION_DURATION = 300; // ms per step
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

            // Easing function (ease-out-cubic)
            const eased = 1 - Math.pow(1 - progress, 3);

            // Interpolate position
            const currentX = fromX + (toX - fromX) * eased;
            const currentY = fromY + (toY - fromY) * eased;

            // Update unit's visual position (temporary animation state)
            setMovingUnit({ id: unitId, animX: currentX, animY: currentY, progress: eased });

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                setMovingUnit(null);
                // CRITICAL FIX: Delay callback to ensure state update completes
                if (onComplete) {
                    setTimeout(onComplete, 50);
                }
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
    };

    const findPath = (startX, startY, targetX, targetY, maxDist) => {
        const queue = [[startX, startY, []]];
        const visited = new Set([`${startX},${startY}`]);

        while (queue.length > 0) {
            const [x, y, path] = queue.shift();

            if (x === targetX && y === targetY) return path;
            if (path.length >= maxDist) continue;

            // Cardinal neighbors only for movement (Dofus-style)
            const neighbors = [
                [x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]
            ];

            for (const [nx, ny] of neighbors) {
                const key = `${nx},${ny}`;
                if (!visited.has(key) && isTileValid(nx, ny) && !isTileOccupied(nx, ny, currentActor.id)) {
                    visited.add(key);
                    queue.push([nx, ny, [...path, [nx, ny]]]);
                }
            }
        }
        return null; // No path found within range
    };

    const executePathMovement = async (destX, destY, providedPath = null) => {
        if (!isLocalPlayerTurn || !canMove || !currentActor) return;

        // Ensure we target a valid, unoccupied tile (only if not using provided path)
        if (!providedPath) {
            if (!isTileValid(destX, destY) || isTileOccupied(destX, destY, currentActor.id)) return;
        }

        const path = providedPath || findPath(currentActor.posX, currentActor.posY, destX, destY, currentActor.currentPM || 0);
        if (!path || path.length === 0) return;

        // Clear planning state
        setIsPathPlanning(false);
        setPlannedPath([]);

        // Sequence movement steps
        let currentX = currentActor.posX;
        let currentY = currentActor.posY;

        for (let i = 0; i < path.length; i++) {
            const [nextX, nextY] = path[i];

            // Determine facing
            let nextFacing = currentActor.facing;
            if (nextX > currentX) nextFacing = 'EAST';
            else if (nextX < currentX) nextFacing = 'WEST';
            else if (nextY > currentY) nextFacing = 'SOUTH';
            else if (nextY < currentY) nextFacing = 'NORTH';

            // Update state for one step
            const currentCombatants = combatantsRef.current;
            const updatedCombatants = currentCombatants.map(u =>
                u.id === currentActor.id
                    ? { ...u, posX: nextX, posY: nextY, currentPM: u.currentPM - 1, facing: nextFacing, hasMoved: true }
                    : u
            );

            setCombatants(updatedCombatants);

            // Sync step
            if (onUpdateCombatState) {
                onUpdateCombatState({
                    combatants: updatedCombatants,
                    turnIndex: currentTurnIndex,
                    round,
                    active: true,
                    logs,
                    updatedAt: Date.now()
                });
            }

            // Animate step
            await new Promise(resolve => {
                animateMovement(currentActor.id, currentX, currentY, nextX, nextY, resolve);
            });

            if (onSFX) onSFX('footstep');
            
            // BROADCAST movement step to other players
            broadcastAction('movement', {
                actorId: currentActor.id,
                actorName: currentActor.name,
                path: [[nextX, nextY]],
                stepIndex: i,
                totalSteps: path.length
            });

            currentX = nextX;
            currentY = nextY;
        }
        
        // Déplacement terminé - désélectionner l'action "Se déplacer"
        // Le joueur devra recliquer s'il veut bouger à nouveau
        setSelectedAction(null);
    };

    const executeMove = (direction, actorOverride = null) => {
        // Used by AI single-step movement (legacy keyboard path for player can also use this safely)
        const currentCombatants = combatantsRef.current;
        const actorId = actorOverride?.id || currentActor?.id;
        if (!actorId) return false;

        const freshActor = currentCombatants.find(u => u.id === actorId);
        if (!freshActor || freshActor.currentPM <= 0 || freshActor.hp <= 0) return false;

        const deltas = {
            right: { x: 1, y: 0, facing: 'EAST' },
            left: { x: -1, y: 0, facing: 'WEST' },
            down: { x: 0, y: 1, facing: 'SOUTH' },
            up: { x: 0, y: -1, facing: 'NORTH' }
        };

        const delta = deltas[direction];
        if (!delta) return false;

        const nextX = freshActor.posX + delta.x;
        const nextY = freshActor.posY + delta.y;

        if (!isTileValid(nextX, nextY) || isTileOccupied(nextX, nextY, freshActor.id)) {
            return false;
        }

        const updatedCombatants = currentCombatants.map(u =>
            u.id === freshActor.id
                ? {
                    ...u,
                    posX: nextX,
                    posY: nextY,
                    facing: delta.facing,
                    currentPM: Math.max(0, (u.currentPM || 0) - 1),
                    hasMoved: true
                }
                : u
        );

        setCombatants(updatedCombatants);

        if (onUpdateCombatState) {
            const syncTs = Date.now();
            lastSyncRef.current = syncTs;
            onUpdateCombatState({
                combatants: updatedCombatants,
                turnIndex: currentTurnIndex,
                round,
                active: true,
                logs,
                updatedAt: syncTs
            });
        }

        animateMovement(freshActor.id, freshActor.posX, freshActor.posY, nextX, nextY);
        
        // BROADCAST AI/player movement to other players
        broadcastAction('movement', {
            actorId: freshActor.id,
            actorName: freshActor.name,
            path: [[nextX, nextY]],
            stepIndex: 0,
            totalSteps: 1,
            direction
        });
        
        return true;
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

        // PROTECTION : Empêcher les attaques multiples rapides (< 500ms)
        const now = Date.now();
        if (freshActor.isEnemy &&
            lastAttackRef.current.actorId === freshActor.id &&
            lastAttackRef.current.targetId === target.id &&
            now - lastAttackRef.current.timestamp < 500) {
            debugLog('[executeAttack] Blocked duplicate attack from', freshActor.name, 'to', target.name);
            return;
        }
        lastAttackRef.current = { timestamp: now, actorId: freshActor.id, targetId: target.id };

        // PROTECTION CRITIQUE : Empêcher un nouvel overlay si un est déjà actif (pour éviter les doubles animations)
        if (rollOverlay) {
            debugLog('[executeAttack] Blocked: dice roll already in progress');
            return;
        }

        // SÉCURITÉ : Empêcher de s'attaquer soi-même avec des attaques offensives
        if (!action.friendly && target.id === freshActor.id) {
            addLog({ role: 'system', content: `❌ **${freshActor.name}** ne peut pas s'attaquer soi-même !` });
            return;
        }

        // SÉCURITÉ : Les attaques offensives ciblent uniquement les ennemis
        if (!action.friendly && (target.isEnemy === freshActor.isEnemy)) {
            addLog({ role: 'system', content: `❌ **${freshActor.name}** ne peut pas attaquer un allié !` });
            return;
        }

        // SÉCURITÉ : Les sorts friendly ciblent uniquement les alliés
        if (action.friendly && (target.isEnemy !== freshActor.isEnemy)) {
            addLog({ role: 'system', content: `❌ **${action.name}** ne peut cibler que des alliés !` });
            return;
        }

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

        // ========== SYSTÈME D100 - JET D'ATTAQUE ==========
        const actorLevel = freshActor.level || 1;
        const { bonus: tacticalBonus, reason: tacticalReason } = getTacticalModifier(freshActor, target);

        // Jet d'attaque d100
        const rollData = rollAttackD100(freshActor, target, actorLevel, tacticalBonus, action);
        const { roll, modifier, success, isCritical } = rollData;

        // Afficher overlay avec résultat
        const rollId = crypto.randomUUID();
        setRollOverlay({
            rollId,
            roll,
            modifier,
            tacticalReason,
            threshold: target.ac,
            success,
            isCritical,
            type: 'hit',
            targetId: target.id,
            action
        });
        
        // BROADCAST dice roll to other players
        broadcastAction('dice_roll', {
            rollId,
            roll,
            modifier,
            tacticalReason,
            threshold: target.ac,
            success,
            isCritical,
            rollType: 'hit',
            targetId: target.id,
            actionData: action,
            attackerName: freshActor.name,
            targetName: target.name
        });
        
        if (onSFX) onSFX('dice');
    };

    const executeUseItem = (item) => {
        const freshActor = combatantsRef.current.find(u => u.id === currentActor.id);
        if (!canAct || !freshActor || freshActor.hasActed) return;

        // Apply effects
        let newHP = freshActor.hp;
        let newResource = freshActor.resource;
        let effectMsg = "";

        if (item.stats?.heal) {
            newHP = Math.min(freshActor.maxHp || 100, freshActor.hp + item.stats.heal);
            effectMsg += `💖 +${item.stats.heal} PV`;
        }
        if (item.stats?.resource) {
            newResource = Math.min(freshActor.maxResource || 100, freshActor.resource + item.stats.resource);
            effectMsg += ` ✨ +${item.stats.resource} RES`;
        }
        if (item.stats?.hp) {
            newHP = Math.min(freshActor.maxHp || 100, freshActor.hp + item.stats.hp);
            effectMsg += ` 💖 +${item.stats.hp} PV`;
        }

        if (!effectMsg) effectMsg = "Aucun effet immédiat.";

        // Add log
        addLog({ role: 'system', content: `🧪 **${freshActor.name}** utilise **${item.name}**. ${effectMsg}` });

        // Update combatants
        const newCombatants = combatants.map(u => u.id === freshActor.id ? { ...u, hp: newHP, resource: newResource, hasActed: true } : u);
        setCombatants(newCombatants);

        // Sync to App (Stats)
        if (onHPChange) onHPChange(freshActor.id, newHP);
        if (onResourceChange) onResourceChange(freshActor.id, newResource);

        // Sync to App (Inventory removal)
        if (onConsumeItem) {
            onConsumeItem(item);
        }

        // Sync combat state
        lastSyncRef.current = Date.now();
        if (onUpdateCombatState) onUpdateCombatState({
            combatants: newCombatants,
            turnIndex: currentTurnIndex,
            round,
            active: true,
            logs: [...logs, { role: 'system', content: `🧪 **${freshActor.name}** utilise **${item.name}**. ${effectMsg}` }],
            updatedAt: lastSyncRef.current
        });

        if (onSFX) onSFX('magic');

        // CRITICAL FIX: Finish turn after using item
        setTimeout(() => finishTurn(), 800);
    };

    // NEW: Execute self-buff spells (like Disparition/Invisibility)
    const executeSelfBuff = (action) => {
        const freshActor = combatantsRef.current.find(u => u.id === currentActor.id);
        // CRITICAL FIX: Check fresh state directly instead of stale canAct memo
        const canActFresh = isLocalPlayerTurn && freshActor && !freshActor.hasActed && freshActor.resource > 0 && combatState === 'active';
        
        if (!canActFresh) {
            console.log('[SelfBuff] Blocked - cannot act:', { isLocalPlayerTurn, hasActed: freshActor?.hasActed, resource: freshActor?.resource, combatState });
            return;
        }
        if (!action) {
            console.log('[SelfBuff] Blocked - no action');
            return;
        }
        if (action.target !== 'self') {
            console.log('[SelfBuff] Blocked - target is not self:', action.target);
            return;
        }

        const cost = action.cost !== undefined ? action.cost : 20;
        if (freshActor.resource < cost) {
            addLog({ role: 'system', content: `❌ **${freshActor.name}** n'a pas assez de ressources !` });
            return;
        }

        console.log('[SelfBuff] Executing:', action.name, 'on', freshActor.name);

        // Consume resources
        const newResource = Math.max(0, freshActor.resource - cost);
        setCombatants(prev => prev.map(u => u.id === freshActor.id ? { ...u, resource: newResource, hasActed: true } : u));
        if (!freshActor.isEnemy && onResourceChange) onResourceChange(freshActor.id, newResource);

        // Apply buff effects based on action name/type
        let effectMsg = '';
        let buffEffect = null;
        
        switch (action.name) {
            case 'Disparition':
            case 'Invisibilité':
                buffEffect = { type: 'invisible', duration: action.duration || 3, name: 'Invisibilité' };
                effectMsg = '👻 **Invisibilité** activée (3 tours)';
                break;
            case 'Bouclier':
            case 'Barrière':
                buffEffect = { type: 'shield', duration: action.duration || 2, name: 'Bouclier magique' };
                effectMsg = '🛡️ **Bouclier** activé';
                break;
            case 'Hâte':
            case 'Célérité':
                buffEffect = { type: 'haste', duration: action.duration || 2, name: 'Hâte' };
                effectMsg = '⚡ **Hâte** activée';
                break;
            case 'Régénération':
                buffEffect = { type: 'regen', duration: action.duration || 3, name: 'Régénération' };
                effectMsg = '💚 **Régénération** activée';
                break;
            default:
                effectMsg = `✨ **${action.name}** activé`;
        }

        // Add buff to combatant
        const newCombatants = combatantsRef.current.map(u => {
            if (u.id === freshActor.id) {
                const buffs = u.buffs || [];
                return { ...u, buffs: [...buffs, buffEffect].filter(Boolean) };
            }
            return u;
        });
        setCombatants(newCombatants);

        // VFX/SFX - Utiliser des SFX spécifiques à la compétence (style League of Legends)
        const el = document.getElementById(`unit-${freshActor.id}`);
        const rect = el ? el.getBoundingClientRect() : { x: window.innerWidth / 2, y: window.innerHeight / 2, width: 0, height: 0 };
        const cx = rect.x + rect.width / 2;
        const cy = rect.y + rect.height / 2;
        
        // Import dynamique pour éviter les dépendances circulaires
        const { getSkillSFXType } = await import('../audio/skillSfx');
        const skillSfxType = getSkillSFXType(action.name);
        
        if (onVFX) onVFX('magic', cx, cy, '#5eead4');
        if (onSFX) onSFX(skillSfxType); // SFX spécifique à la compétence

        // Log
        addLog({ role: 'system', content: `✨ **${freshActor.name}** utilise **${action.name}** ! ${effectMsg}` });

        // Sync state
        const actionEvent = {
            id: crypto.randomUUID(),
            sourceUserId: currentUserId,
            attackerName: freshActor.name,
            targetName: freshActor.name,
            abilityName: action.name,
            roll: 0,
            modifier: 0,
            threshold: 0,
            success: true,
            damage: 0,
            isBuff: true,
            buffEffect,
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

        // Cooldown
        if (action.cooldown > 0) {
            setCooldowns(prev => ({ ...prev, [currentActor.id]: { ...(prev[currentActor.id] || {}), [action.name]: action.cooldown } }));
        }

        // Broadcast
        broadcastAction('buff', {
            actorName: freshActor.name,
            abilityName: action.name,
            effect: buffEffect,
            id: actionEvent.id
        });
        broadcastAction('vfx', { vfxType: 'magic', x: cx, y: cy, color: '#5eead4' });
        broadcastAction('sfx', { sfxType: skillSfxType });

        // Finish turn
        setTimeout(() => finishTurn(), 600);
    };

    const handleRollComplete = (rollData) => {
        const { rollId, roll, modifier, threshold, success, targetId, action } = rollData;
        if (rollId && resolvedRollsRef.current.has(rollId)) {
            return;
        }
        if (rollId) {
            resolvedRollsRef.current.add(rollId);
        }

        const liveCombatants = combatantsRef.current;
        const target = liveCombatants.find(u => u.id === targetId);
        const liveActor = liveCombatants.find(u => u.id === currentActor?.id) || currentActor;
        const el = document.getElementById(`unit-${targetId}`);
        const rect = el ? el.getBoundingClientRect() : { x: window.innerWidth / 2, y: window.innerHeight / 2, width: 0, height: 0 };
        const cx = rect.x + rect.width / 2;
        const cy = rect.y + rect.height / 2;

        setTimeout(() => {
            setRollOverlay(null);
            if (success && target) {
                // ========== SYSTÈME D100 - CALCUL DÉGÂTS ==========
                const damageData = calculateDamageD100(liveActor, action, rollData.isCritical);
                const damage = damageData.damage;

                // Log formaté d100
                const combatLog = formatCombatLogD100(liveActor, target, rollData, damageData);
                addLog({ role: 'system', content: combatLog });

                setAnimatingId(liveActor.id);
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

                    const freshCombatants = combatantsRef.current;
                    const newCombatants = freshCombatants.map(u => u.id === target.id ? { ...u, hp: newHp } : u);
                    setCombatants(newCombatants);

                    // PREPARE SYNCED ACTION
                    const actionEvent = {
                        id: crypto.randomUUID(),
                        sourceUserId: currentUserId,
                        attackerName: liveActor.name,
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

                    // BROADCAST attack success with damage
                    broadcastAction('attack', {
                        attackerName: liveActor.name,
                        targetName: target.name,
                        abilityName: action.name,
                        roll,
                        modifier,
                        threshold,
                        success: true,
                        damage,
                        id: actionEvent.id
                    });
                    
                    // BROADCAST VFX/SFX
                    broadcastAction('vfx', {
                        vfxType: action.name === 'Attaque' ? 'blood' : 'magic',
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2,
                        color: action.name === 'Attaque' ? '#ff0000' : 'var(--aether-blue)'
                    });
                    broadcastAction('sfx', { sfxType: 'damage' });
                    const timeoutId = setTimeout(() => {
                        setAnimatingId(null); setShakingId(null);
                        // CRITICAL FIX: Finish turn for ALL actors after attack, not just enemies
                        finishTurn();
                    }, 600);
                    addTimeout(timeoutId);
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

                addLog({ role: 'system', content: `🎲 **${roll}**(+${modifier}) vs **${threshold}** AC | 💨 **${liveActor.name}** rate son attaque !` });

                // BROADCAST miss action
                broadcastAction('attack', {
                    attackerName: currentActor.name,
                    targetName: target.name,
                    abilityName: action.name,
                    roll,
                    modifier,
                    threshold,
                    success: false,
                    damage: 0,
                    id: actionEvent.id
                });
                
                // BROADCAST VFX for miss
                broadcastAction('vfx', {
                    vfxType: 'spark',
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    color: '#ffff00'
                });

                // Sync the miss
                lastSyncRef.current = Date.now();
                if (onUpdateCombatState) onUpdateCombatState({
                    combatants: combatantsRef.current, // No HP change
                    turnIndex: currentTurnIndex,
                    round,
                    active: true,
                    logs,
                    updatedAt: lastSyncRef.current,
                    lastAction: actionEvent
                });

                // CRITICAL FIX: Finish turn for ALL actors after attack, not just enemies
                setTimeout(() => { finishTurn(); }, 1000);
            }
        }, 1000);
    };

    const finishTurn = () => {
        setAnimatingId(null); setShakingId(null);

        // CRITICAL FIX: Mark current actor as having acted to prevent infinite replay
        const currentCombatants = combatantsRef.current;
        const updatedCombatants = currentCombatants.map(u =>
            u.id === currentActor?.id ? { ...u, hasActed: true } : u
        );
        setCombatants(updatedCombatants);

        const playersAlive = updatedCombatants.some(u => !u.isEnemy && u.hp > 0);
        const enemiesAlive = updatedCombatants.some(u => u.isEnemy && u.hp > 0);

        if (!enemiesAlive) {
            setCombatState('finished');
            addLog({ role: 'system', content: `🏆 **VICTOIRE !** Les ennemis ont été terrassés.` });
            if (onRewards) onRewards(updatedCombatants.filter(u => u.isEnemy));
            return;
        } else if (!playersAlive) {
            setCombatState('finished');
            addLog({ role: 'system', content: `💀 **DÉFAITE...** La compagnie a succombé.` });
            return;
        }

        // Slight delay before next turn to ensure state propagation
        setTimeout(nextTurn, 100);
    };

    const nextTurn = () => {
        if (combatState === 'finished') return;

        // CRITICAL FIX: Use combatantsRef to get latest state (not stale closure)
        const currentCombatants = combatantsRef.current;

        let nextIndex = (currentTurnIndex + 1) % currentCombatants.length;
        let loops = 0;
        while (currentCombatants[nextIndex].hp <= 0 && loops < currentCombatants.length) {
            nextIndex = (nextIndex + 1) % currentCombatants.length;
            loops++;
        }

        // Check if we completed a full round (wrapped back to start)
        const newRound = nextIndex < currentTurnIndex ? round + 1 : round;
        if (nextIndex < currentTurnIndex) {
            setRound(newRound);
            addLog({ role: 'system', content: `🕒 --- **DEBUT DU ROUND ${newRound}** ---` });
        }

        setCurrentTurnIndex(nextIndex);
        setSelectedAction(null);

        const nextActor = currentCombatants[nextIndex];
        let newCombatants = [...currentCombatants];

        if (nextActor) {
            // Check if actor has 0 resources - they must skip turn to recover
            const isExhausted = nextActor.resource <= 0;
            
            // Update PM and Status - ONLY for the new actor
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
                    if (onUpdateCombatState) onUpdateCombatState({ combatants: newCombatants, turnIndex: nextIndex, round: newRound, active: true, logs, updatedAt: Date.now() });
                    setTimeout(nextTurn, 1000);
                    return;
                }
            }
            
            // If exhausted (0 resources), skip turn but recover 25% of max resource
            if (isExhausted) {
                const recoveryAmount = Math.floor(nextActor.maxResource * 0.25); // 25% recovery
                const recoveredResource = Math.min(nextActor.maxResource, nextActor.resource + recoveryAmount);
                
                newCombatants = newCombatants.map(u => u.id === nextActor.id ? { ...u, resource: recoveredResource, hasActed: true } : u);
                setCombatants(newCombatants);
                
                addLog({ role: 'system', content: `😰 **${nextActor.name}** est épuisé ! Tour de récupération... (+${recoveryAmount} ${resourceDisplayName})` });
                
                // Sync and skip to next turn
                if (onUpdateCombatState) onUpdateCombatState({
                    combatants: newCombatants,
                    turnIndex: nextIndex,
                    round: newRound,
                    active: true,
                    logs,
                    updatedAt: Date.now()
                });
                
                // Auto-skip to next after delay
                setTimeout(nextTurn, 1500);
                return;
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
            if (onUpdateCombatState) onUpdateCombatState({
                combatants: newCombatants,
                turnIndex: nextIndex,
                round: newRound,
                active: true,
                logs,
                updatedAt: Date.now()
            });
        }
    };

    useEffect(() => {
        if (combatState === 'active' && currentActor && currentActor.isEnemy && !currentActor.hasActed) {
            // PROTECTION: Empêcher l'IA de rejouer si elle a déjà joué ce tour
            if (aiTurnExecutedRef.current.turnIndex === currentTurnIndex &&
                aiTurnExecutedRef.current.actorId === currentActor.id) {
                debugLog('[AI] Already executed turn for', currentActor.name, 'at turn', currentTurnIndex);
                return;
            }

            // Marquer immédiatement pour éviter les doubles exécutions
            aiTurnExecutedRef.current = { turnIndex: currentTurnIndex, actorId: currentActor.id };

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

                // --- STRATEGY: MOVEMENT ---
                // Both ranged and melee close distance until at least one action is in range.
                if (freshActor.currentPM > 0) {
                    const baseActions = freshActor.actions || [{ name: 'Attaque', range: 1.5, cost: 0 }];
                    const affordableActions = baseActions.filter(a => (a.cost || 0) <= freshActor.resource);
                    const maxAttackRange = (affordableActions.length > 0
                        ? Math.max(...affordableActions.map(a => a.range || 1.5))
                        : 1.5);

                    let stepsLeft = freshActor.currentPM;
                    while (stepsLeft > 0) {
                        const actorNow = combatantsRef.current.find(u => u.id === freshActor.id);
                        if (!actorNow) break;

                        const targetsNow = combatantsRef.current
                            .filter(u => !u.isEnemy && u.hp > 0)
                            .map(p => ({
                                unit: p,
                                dist: Math.max(Math.abs(actorNow.posX - p.posX), Math.abs(actorNow.posY - p.posY))
                            }))
                            .sort((a, b) => a.dist - b.dist);

                        if (targetsNow.length === 0) break;

                        const nearest = targetsNow[0];
                        if (nearest.dist <= maxAttackRange) break; // Already in range to attack

                        const targetX = nearest.unit.posX;
                        const targetY = nearest.unit.posY;
                        const dx = Math.sign(targetX - actorNow.posX);
                        const dy = Math.sign(targetY - actorNow.posY);

                        let moveX = 0;
                        let moveY = 0;

                        if (Math.abs(targetX - actorNow.posX) >= Math.abs(targetY - actorNow.posY)) {
                            if (dx !== 0 && isTileValid(actorNow.posX + dx, actorNow.posY) && !isTileOccupied(actorNow.posX + dx, actorNow.posY, actorNow.id)) {
                                moveX = dx;
                            } else if (dy !== 0 && isTileValid(actorNow.posX, actorNow.posY + dy) && !isTileOccupied(actorNow.posX, actorNow.posY + dy, actorNow.id)) {
                                moveY = dy;
                            }
                        } else {
                            if (dy !== 0 && isTileValid(actorNow.posX, actorNow.posY + dy) && !isTileOccupied(actorNow.posX, actorNow.posY + dy, actorNow.id)) {
                                moveY = dy;
                            } else if (dx !== 0 && isTileValid(actorNow.posX + dx, actorNow.posY) && !isTileOccupied(actorNow.posX + dx, actorNow.posY, actorNow.id)) {
                                moveX = dx;
                            }
                        }

                        if (moveX === 0 && moveY === 0) break; // Blocked

                        const direction = moveX > 0 ? 'right' : moveX < 0 ? 'left' : moveY > 0 ? 'down' : 'up';
                        const moved = executeMove(direction, actorNow);
                        if (!moved) break;

                        stepsLeft -= 1;
                        await new Promise(r => setTimeout(r, 420));
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
                        // Ne pas forcer finishTurn ici : executeAttack -> résolution du jet gère déjà la fin de tour.
                    } else {
                        // Could not attack, ensure movingUnit cleared before finish
                        setMovingUnit(null);
                        setTimeout(() => finishTurn(), 100);
                    }
                } else {
                    finishTurn();
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTurnIndex, combatState, currentActor?.id]);

    const UnitCard = ({ unit, style = {} }) => {
        const isCurrent = unit.id === currentActor?.id;

        // Déterminer si l'unité est ciblable selon le type de cible de l'ability
        let isTargetable = false;
        let targetType = 'enemy'; // Default
        
        if (selectedAction && unit.hp > 0) {
            const actionTarget = selectedAction.target || (selectedAction.friendly ? 'ally' : 'enemy');
            const canTargetSelf = selectedAction.canTargetSelf !== false; // Par défaut true pour ally
            const isSameSide = unit.isEnemy === currentActor?.isEnemy;
            const isSelf = unit.id === currentActor?.id;
            
            switch (actionTarget) {
                case 'self':
                    // Cible soi-même uniquement
                    isTargetable = isSelf;
                    targetType = 'self';
                    break;
                case 'ally':
                    // Cible alliés (et potentiellement soi-même)
                    isTargetable = isSameSide && (canTargetSelf || !isSelf);
                    targetType = 'ally';
                    break;
                case 'area':
                    // Zone - cible les ennemis par défaut
                    isTargetable = !isSameSide;
                    targetType = 'area';
                    break;
                case 'enemy':
                default:
                    // Cible ennemis (jamais soi-même)
                    isTargetable = !isSameSide && !isSelf;
                    targetType = 'enemy';
                    break;
            }
        }

        const isJumping = animatingId === unit.id;
        
        // Déterminer la classe CSS de ciblage
        let targetClass = '';
        if (isTargetable) {
            switch (targetType) {
                case 'self':
                    targetClass = 'targetable-self';
                    break;
                case 'ally':
                    targetClass = 'targetable-friendly';
                    break;
                case 'area':
                    targetClass = 'targetable-area';
                    break;
                default:
                    targetClass = 'targetable';
            }
        }

        return (
            <div id={`unit-${unit.id}`}
                onClick={() => {
                    if (isTargetable && isLocalPlayerTurn) {
                        executeAttack(unit, selectedAction);
                    } else if (isCurrent && isLocalPlayerTurn && !selectedAction) {
                        // Toggle character menu on click when it's player's turn
                        setCharacterMenuOpen(prev => !prev);
                    }
                }}
                className={`unit-card ${isCurrent ? 'active-turn' : ''} ${targetClass}`}
                style={{
                    left: style.left,
                    top: style.top,
                    width: style.width,
                    height: style.height,
                    opacity: unit.hp <= 0 ? 0.4 : 1,
                    filter: unit.hp <= 0 ? 'grayscale(1) brightness(0.6)' : 'none',
                    pointerEvents: unit.hp <= 0 ? 'none' : (isTargetable || isCurrent ? 'auto' : 'none'),
                    zIndex: isCurrent ? 100 : (isJumping ? 200 : 10),
                    cursor: isCurrent && isLocalPlayerTurn && !selectedAction ? 'pointer' : (isTargetable ? (targetType === 'self' ? 'pointer' : targetType === 'ally' ? 'help' : 'crosshair') : 'default')
                }}>

                {/* Isometric Shadow (Ground level) */}
                <div className="unit-card-shadow" />

                {/* Physical Base (Ground level) */}
                <div className="unit-base" />

                {/* Tactical Selection Ring (pulsing) */}
                {isCurrent && <div className="unit-selection-ring" />}

                {/* Range Indicator Ring - visible when action selected */}
                {isCurrent && selectedAction && (
                    <>
                        <div className="range-indicator-ring" />
                        <div className="range-badge">
                            {selectedAction.range || 1}m
                        </div>
                    </>
                )}

                {/* Facing Indicator */}
                <div className="unit-facing-indicator" style={{
                    transform: `translate(-50%, -50%) rotate(${unit.facing === 'NORTH' ? 0 : (unit.facing === 'EAST' ? 90 : (unit.facing === 'SOUTH' ? 180 : 270))}deg) translateY(-55px)`,
                }}>
                    <div className="facing-arrow" />
                </div>

                <div className="unit-portrait-wrapper">
                    <img src={unit.portrait_url || 'https://placehold.co/150'}
                        className="unit-portrait"
                        style={{ filter: unit.hp <= (unit.maxHp * 0.3) ? 'grayscale(0.5) contrast(1.2)' : 'none' }}
                        alt={unit.name}
                    />

                    {/* Orbital bars (Modernized) */}
                    <div className="orbital-bars">
                        <svg className="bar-svg" viewBox="0 0 100 100">
                            {/* HP Bar */}
                            <circle cx="50" cy="50" r="47" className="bar-circle-bg" />
                            <circle cx="50" cy="50" r="47"
                                className={`bar-circle hp-bar ${unit.isEnemy ? 'enemy' : ''}`}
                                strokeDasharray="295"
                                strokeDashoffset={295 - (295 * (unit.hp / unit.maxHp))}
                            />

                            {/* Resource Bar */}
                            <circle cx="50" cy="50" r="41" className="bar-circle-bg" />
                            <circle cx="50" cy="50" r="41"
                                className="bar-circle resource-bar"
                                strokeDasharray="257"
                                strokeDashoffset={257 - (257 * (unit.resource / unit.maxResource))}
                            />
                        </svg>
                    </div>
                </div>

                {/* Nameplate */}
                <div className="unit-name-plate">
                    {unit.name.toUpperCase()}
                </div>

                {/* Side Badges */}
                <div className="unit-badges-container">
                    {unit.hasMoved && <div className="unit-badge" title="A déjà bougé">👟</div>}
                    {unit.hasActed && <div className="unit-badge" title="A déjà agi">⚔️</div>}
                    {unit.behavior_type === 'RANGED' && unit.isEnemy && <div className="unit-badge" title="Archer">🏹</div>}
                </div>

                {damagePopups.filter(p => p.targetId === unit.id).map(p => (
                    <DamagePopup key={p.id} amount={p.amount} onDone={() => setDamagePopups(prev => prev.filter(x => x.id !== p.id))} />
                ))}
            </div>
        );
    };

// --- ROLLOVERLAY COMPONENT (moved outside to prevent re-mounts) ---
const RollOverlay = ({ rollId, roll, modifier, tacticalReason, threshold, success, action, targetId, onRollComplete }) => {
    const hasCompletedRef = useRef(false);
    const rollDiceValues = useMemo(() => [{ type: 'd100', value: roll }], [roll]);

    useEffect(() => {
        hasCompletedRef.current = false;
    }, [rollId]);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 12000,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.2)',
            pointerEvents: 'none'
        }}>
            {/* Dice 2D Overlay - gère tout l'affichage visuel */}
            <DiceOverlay2D
                diceRolls={rollDiceValues}
                onAllComplete={() => {
                    if (hasCompletedRef.current) return;
                    hasCompletedRef.current = true;
                    setTimeout(() => {
                        onRollComplete({ rollId, roll, modifier, threshold, success, targetId, action });
                    }, 1000);
                }}
            />
        </div>
    );
};

    const GameOverScreen = () => (
        <div style={{ position: 'absolute', inset: 0, zIndex: 3000, background: 'radial-gradient(circle at center, #2a0505 0%, #000 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '3rem', color: '#ff1111', fontFamily: 'var(--font-display)' }}>MORT DÉFINITIVE</h1>
            <button onClick={onGameOver} style={{ padding: '1rem 3rem', background: 'black', border: '2px solid #ff4444', color: '#ff4444', cursor: 'pointer' }}>RECOMMENCER</button>
        </div>
    );

    return (
        <div className="combat-manager-viewport">
            {/* --- RIGHT MAIN VIEW (Arena + Overlays) --- */}
            <div className="combat-viewer-container">
                {/* Global Overlay Elements */}
                <div className={`modal-overlay ${shake ? 'shake' : ''} ${flash ? 'flash-red' : ''}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1200 }}>
                    {combatState === 'finished' && !combatants.some(u => !u.isEnemy && u.hp > 0) && <GameOverScreen />}
                </div>

                {/* Top Bar Overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60px', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)', zIndex: 1100 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'var(--gold-primary)', letterSpacing: '2px', fontSize: '1rem', fontWeight: 'bold' }}>ROUND {round}</span>
                    </div>
                    {combatants.length > 0 && <TurnTracker combatants={combatants} currentTurnIndex={currentTurnIndex} />}
                    <button onClick={() => onCombatEnd({ victory: false, flight: true })} style={{ color: '#ff4444', background: 'rgba(0,0,0,0.5)', border: '1px solid #ff4444', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', pointerEvents: 'auto' }}>FUIR</button>
                </div>

                {/* The Arena */}
                <div className="combat-arena" style={{ transform: `scale(${arenaScale})`, transformOrigin: 'center center' }}>
                    <div className="arena-background-plane" />

                    <div className="arena-grid-container">
                        {/* Vertical Lines */}
                        {Array.from({ length: arenaConfig.blocksX + 1 }).map((_, i) => {
                            const tiles = i - Math.floor(arenaConfig.blocksX / 2);
                            const isMajor = tiles % 5 === 0;
                            const isCenter = tiles === 0;
                            const edgePercent = (i / arenaConfig.blocksX) * 100;
                            return (
                                <div key={`v-${i}`} className={`grid-line-y ${isCenter ? 'center' : (isMajor ? 'major' : '')}`} style={{ left: `${edgePercent}%` }}>
                                    {isMajor && (
                                        <div className="grid-coord-label x-axis">
                                            {tiles}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Horizontal Lines */}
                        {Array.from({ length: arenaConfig.blocksY + 1 }).map((_, i) => {
                            const tiles = i - Math.floor(arenaConfig.blocksY / 2);
                            const isMajor = tiles % 5 === 0;
                            const isCenter = tiles === 0;
                            const edgePercent = (i / arenaConfig.blocksY) * 100;
                            return (
                                <div key={`h-${i}`} className={`grid-line-x ${isCenter ? 'center' : (isMajor ? 'major' : '')}`} style={{ top: `${edgePercent}%` }}>
                                    {isMajor && tiles !== 0 && (
                                        <div className="grid-coord-label y-axis">
                                            {tiles}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Range Illumination (Tactical Squares) - Only show for selected actions, NOT for default movement */}
                    {selectedAction && isLocalPlayerTurn && currentActor && (
                        <>
                            {Array.from({ length: arenaConfig.blocksY }).map((_, yIdx) => {
                                const y = yIdx - Math.floor(arenaConfig.blocksY / 2);
                                return Array.from({ length: arenaConfig.blocksX }).map((_, xIdx) => {
                                    const x = xIdx - Math.floor(arenaConfig.blocksX / 2);
                                    const dx = x - currentActor.posX;
                                    const dy = y - currentActor.posY;
                                    
                                    let highlight = null;
                                    const chebyshevDist = Math.max(Math.abs(dx), Math.abs(dy));
                                    
                                    // Check if this is movement action
                                    if (selectedAction.isMovement) {
                                        // Use Manhattan distance for movement
                                        // Calculate remaining PM based on planned path
                                        const pmLeft = currentActor.currentPM - plannedPath.length;
                                        const manhattanDist = Math.abs(dx) + Math.abs(dy);
                                        if (manhattanDist <= (selectedAction.range || pmLeft) && manhattanDist > 0 && pmLeft > 0) {
                                            highlight = { color: 'rgba(0, 150, 255, 0.35)', border: '2px dashed rgba(0, 200, 255, 0.8)', glow: 'rgba(0, 180, 255, 0.5)' };
                                        }
                                    } else {
                                        // Regular attack/ability range - check target type for color
                                        if (chebyshevDist <= (selectedAction.range || 1) && chebyshevDist > 0) {
                                            const actionTarget = selectedAction.target || (selectedAction.friendly ? 'ally' : 'enemy');
                                            if (actionTarget === 'self') {
                                                // Self-target abilities don't show range highlights
                                                highlight = null;
                                            } else if (actionTarget === 'ally') {
                                                highlight = { color: 'rgba(74, 222, 128, 0.35)', border: '2px solid rgba(74, 222, 128, 0.7)', glow: 'rgba(74, 222, 128, 0.5)' };
                                            } else if (actionTarget === 'area') {
                                                highlight = { color: 'rgba(168, 85, 247, 0.4)', border: '2px solid rgba(168, 85, 247, 0.8)', glow: 'rgba(168, 85, 247, 0.6)' };
                                            } else {
                                                highlight = { color: 'rgba(255, 100, 100, 0.35)', border: '2px solid rgba(255, 80, 80, 0.8)', glow: 'rgba(255, 100, 100, 0.5)' };
                                            }
                                        }
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

                            {/* Interaction Layer for Movement - Only when 'Se déplacer' is selected, with dynamic range reduction */}
                            {isLocalPlayerTurn && canMove && selectedAction?.isMovement && (
                                <div className="interaction-layer-container" style={{ position: 'absolute', inset: 0, zIndex: 1000, pointerEvents: 'none' }}>
                                    {Array.from({ length: arenaConfig.blocksY }).map((_, yIdx) => {
                                        const y = yIdx - Math.floor(arenaConfig.blocksY / 2);
                                        return Array.from({ length: arenaConfig.blocksX }).map((_, xIdx) => {
                                            const x = xIdx - Math.floor(arenaConfig.blocksX / 2);
                                            const dx = x - currentActor.posX;
                                            const dy = y - currentActor.posY;

                                            // Character tile click to open menu or confirm movement
                                            if (dx === 0 && dy === 0) {
                                                const pX = getPosPercent(x);
                                                const pY = getPosPercent(y, true);
                                                return (
                                                    <div
                                                        key={`char-interactive-${x}-${y}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            debugLog('[DEBUG] Character Click - characterMenuOpen:', characterMenuOpen, 'plannedPath:', plannedPath.length);
                                                            if (plannedPath.length > 0) {
                                                                executePathMovement(plannedPath[plannedPath.length - 1][0], plannedPath[plannedPath.length - 1][1], plannedPath);
                                                            } else {
                                                                // Toggle character menu on click
                                                                setCharacterMenuOpen(!characterMenuOpen);
                                                            }
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            left: `${pX}%`,
                                                            top: `${pY}%`,
                                                            width: `${100 / arenaConfig.blocksX}%`,
                                                            height: `${100 / arenaConfig.blocksY}%`,
                                                            transform: 'translate(-50%, -50%)',
                                                            cursor: 'pointer',
                                                            zIndex: 1002,
                                                            pointerEvents: 'auto'
                                                        }}
                                                    >
                                                        {/* Clickable indicator ring */}
                                                        {!characterMenuOpen && plannedPath.length === 0 && (
                                                            <div className="character-clickable-indicator">
                                                                <div className="clickable-ring" />
                                                                <div className="clickable-icon">⚡</div>
                                                            </div>
                                                        )}
                                                        {plannedPath.length > 0 && (
                                                            <div
                                                                className="confirm-move-badge"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    debugLog('[DEBUG] Confirm Badge Clicked via inner handler');
                                                                    if (plannedPath.length > 0) {
                                                                        executePathMovement(plannedPath[plannedPath.length - 1][0], plannedPath[plannedPath.length - 1][1], plannedPath);
                                                                    }
                                                                }}
                                                            >
                                                                CONFIRMER
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }

                                            // Calculate PM left based on planned path
                                            const pmLeft = currentActor.currentPM - plannedPath.length;
                                            const dist = Math.abs(dx) + Math.abs(dy);
                                            
                                            // Only show tiles within remaining PM range
                                            if (dist > pmLeft || pmLeft <= 0) return null;

                                            const pX = getPosPercent(x);
                                            const pY = getPosPercent(y, true);
                                            const isHovered = hoveredTile?.x === x && hoveredTile?.y === y;

                                            // Calculate path from current actor position or from last planned step
                                            const startPoint = plannedPath.length > 0 ? { x: plannedPath[plannedPath.length - 1][0], y: plannedPath[plannedPath.length - 1][1] } : { x: currentActor.posX, y: currentActor.posY };
                                            const segmentPmLeft = currentActor.currentPM - plannedPath.length;

                                            const segmentPath = isHovered && segmentPmLeft > 0 ? findPath(startPoint.x, startPoint.y, x, y, segmentPmLeft) : null;

                                            return (
                                                <div
                                                    key={`interactive-${x}-${y}`}
                                                    onMouseEnter={() => setHoveredTile({ x, y })}
                                                    onMouseLeave={() => setHoveredTile(null)}
                                                    onClick={() => {
                                                        debugLog('[DEBUG] Tile Click:', x, y, 'isPathPlanning:', isPathPlanning);
                                                        if (isPathPlanning && segmentPath) {
                                                            setPlannedPath(prev => [...prev, ...segmentPath]);
                                                        }
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        left: `${pX}%`,
                                                        top: `${pY}%`,
                                                        width: `${100 / arenaConfig.blocksX}%`,
                                                        height: `${100 / arenaConfig.blocksY}%`,
                                                        transform: 'translate(-50%, -50%)',
                                                        cursor: 'pointer',
                                                        zIndex: 1001,
                                                        pointerEvents: 'auto',
                                                        background: plannedPath.some(p => p[0] === x && p[1] === y) ? 'rgba(212, 175, 55, 0.3)' : 'transparent',
                                                        border: isHovered ? '2px solid rgba(212, 175, 55, 0.6)' : 'none'
                                                    }}
                                                />
                                            );
                                        });
                                    })}

                                </div>
                            )}
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

                    {/* Arena Units (2D Positioning with smooth animation) */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
                        {combatants.map((u) => {
                            // Check if this unit is currently animating
                            const isAnimating = movingUnit && movingUnit.id === u.id;
                            const displayX = isAnimating ? movingUnit.animX : u.posX;
                            const displayY = isAnimating ? movingUnit.animY : u.posY;

                            const x = getPosPercent(displayX);
                            const y = getPosPercent(displayY, true);
                            return <UnitCard key={u.id} unit={u} style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                width: `${100 / arenaConfig.blocksX}%`,
                                height: `${100 / arenaConfig.blocksY}%`,
                                transition: isAnimating ? 'none' : 'left 0.8s cubic-bezier(0.4, 0, 0.2, 1), top 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                            }} />;
                        })}
                    </div>

                    {/* Floating Diegetic UI - Only visible when character menu is open and no action selected */}
                    {isLocalPlayerTurn && currentActor && characterMenuOpen && !selectedAction && (
                        <>
                            {/* Floating Stats Panel - Positioned adaptively based on character position */}
                            {(() => {
                                const charYPercent = getPosPercent(currentActor.posY, true);
                                const isNearBottom = charYPercent > 75;
                                const statsTop = isNearBottom 
                                    ? `${charYPercent - 35}%`  // Plus haut si en bas de l'arène
                                    : `${charYPercent - 22}%`;
                                
                                return (
                                    <div
                                        className="diegetic-stats-panel"
                                        style={{
                                            position: 'absolute',
                                            left: `${getPosPercent(currentActor.posX)}%`,
                                            top: statsTop,
                                            transform: 'translateX(-50%)',
                                            zIndex: 100,
                                            pointerEvents: 'auto'
                                        }}
                                    >
                                        <div className="stats-panel-content">
                                            <div className="stat-row hp">
                                                <span className="stat-icon">❤️</span>
                                                <span className="stat-value-large">{currentActor.hp}</span>
                                                <span className="stat-max">/{currentActor.maxHp}</span>
                                            </div>
                                            <div className="stat-row resource">
                                                <span className="stat-icon">⚡</span>
                                                <span className="stat-value-large">{currentActor.resource}</span>
                                                <span className="stat-max">/{currentActor.maxResource}</span>
                                            </div>
                                            <div className="stat-row pm">
                                                <span className="stat-icon">👟</span>
                                                <span className="stat-value-large">{currentActor.currentPM}</span>
                                                <span className="stat-label">PM</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Floating Abilities Panel - Positioned below character */}
                            <div
                                className="diegetic-abilities-float"
                                style={{
                                    position: 'absolute',
                                    left: `${getPosPercent(currentActor.posX)}%`,
                                    top: `${getPosPercent(currentActor.posY, true) + 8}%`,
                                    transform: 'translateX(-50%)',
                                    zIndex: 100,
                                    pointerEvents: 'auto'
                                }}
                            >
                                <div className="abilities-float-content">
                                    {actorAbilities.slice(0, 4).map((ability, idx) => {
                                        const cost = ability.cost !== undefined ? ability.cost : (ability.name === 'Attaque' ? 0 : 20);
                                        const currentCooldown = cooldowns[currentActor?.id]?.[ability.name] || 0;
                                        const onCooldown = currentCooldown > 0;
                                        const canAfford = currentActor.resource >= cost;
                                        const canUseNow = isLocalPlayerTurn && canAct && canAfford && !onCooldown;
                                        const isSelected = selectedAction?.name === ability.name;
                                        const isMagical = ability.name !== 'Attaque' && ability.name !== 'Se déplacer';
                                        const isMovement = ability.name === 'Se déplacer';
                                        
                                        return (
                                            <div
                                                key={idx}
                                                className={`ability-float-slot ${isSelected ? 'selected' : ''} ${!canUseNow ? 'disabled' : ''}`}
                                                onClick={() => {
                                                    if (!canUseNow) return;
                                                    const isCurrentlySelected = selectedAction?.name === ability.name;
                                                    if (isCurrentlySelected) {
                                                        // Annuler l'action
                                                        setSelectedAction(null);
                                                        setIsPathPlanning(false);
                                                        setPlannedPath([]);
                                                    } else {
                                                        // Sélectionner l'action
                                                        setSelectedAction(ability);
                                                        
                                                        // Réinitialiser le path planning si ce n'est PAS un déplacement
                                                        if (!ability.isMovement && ability.name !== 'Se déplacer') {
                                                            setIsPathPlanning(false);
                                                            setPlannedPath([]);
                                                            setHoveredTile(null);
                                                        }
                                                        
                                                        // Auto-cast pour les sorts sur soi-même
                                                        if (ability.target === 'self') {
                                                            // Utiliser executeSelfBuff pour les sorts sur soi
                                                            setTimeout(() => executeSelfBuff(ability), 100);
                                                        } else if (ability.target === 'ally' && ability.canTargetSelf === false) {
                                                            // Cibler automatiquement soi-même pour les sorts ally exclusifs
                                                            const selfTarget = combatants.find(c => c.id === currentActor?.id);
                                                            if (selfTarget) {
                                                                setTimeout(() => executeAttack(selfTarget, ability), 100);
                                                            }
                                                        }
                                                        
                                                        // Activer le path planning si c'est un déplacement
                                                        if (ability.isMovement || ability.name === 'Se déplacer') {
                                                            setIsPathPlanning(true);
                                                        }
                                                    }
                                                }}
                                                onMouseEnter={() => setHoveredAbility(ability)}
                                                onMouseLeave={() => setHoveredAbility(null)}
                                                style={{ animationDelay: `${idx * 0.1}s` }}
                                            >
                                                <div className={`ability-float-glow ${isMagical ? 'magical' : isMovement ? 'movement' : 'physical'}`} />
                                                <span className="ability-float-name">{ability.name}</span>
                                                {/* Target type indicator */}
                                                {ability.target === 'self' && <span className="ability-float-target" title="Cible: Soi-même">🛡️</span>}
                                                {ability.target === 'ally' && <span className="ability-float-target" title="Cible: Allié">✨</span>}
                                                {ability.target === 'area' && <span className="ability-float-target" title="Cible: Zone">💥</span>}
                                                {!ability.target && !ability.friendly && <span className="ability-float-target" title="Cible: Ennemi">⚔️</span>}
                                                {!isMovement && <span className="ability-float-cost">{cost}</span>}
                                                {isMovement && <span className="ability-float-movement">👟</span>}
                                                {onCooldown && <span className="ability-float-cd">{currentCooldown}</span>}
                                                {isSelected && <div className="ability-float-active-indicator" />}
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                {/* Ability Detail Tooltip */}
                                {hoveredAbility && (
                                    <div className="ability-detail-tooltip">
                                        <div className="ability-detail-header">
                                            <span className={`ability-detail-type ${hoveredAbility.name === 'Attaque' ? 'physical' : hoveredAbility.name === 'Se déplacer' ? 'movement' : 'magical'}`}>
                                                {hoveredAbility.name === 'Attaque' ? 'PHYSIQUE' : hoveredAbility.name === 'Se déplacer' ? 'MOUVEMENT' : 'MAGIQUE'}
                                            </span>
                                            {hoveredAbility.name !== 'Se déplacer' && (
                                                <span className="ability-detail-cost">
                                                    {hoveredAbility.cost !== undefined ? hoveredAbility.cost : (hoveredAbility.name === 'Attaque' ? 0 : 20)} {resourceDisplayName.toUpperCase()}
                                                </span>
                                            )}
                                            {hoveredAbility.name === 'Se déplacer' && (
                                                <span className="ability-detail-cost movement-cost">
                                                    👟 Gratuit (PM)
                                                </span>
                                            )}
                                        </div>
                                        <div className="ability-detail-name">{hoveredAbility.name}</div>
                                        <div className="ability-detail-target">
                                            {hoveredAbility.name === 'Se déplacer' && <span className="target-tag target-self">👤 Soi-même</span>}
                                            {hoveredAbility.target === 'self' && hoveredAbility.name !== 'Se déplacer' && <span className="target-tag target-self">🛡️ Soi-même</span>}
                                            {hoveredAbility.target === 'ally' && <span className="target-tag target-ally">✨ Allié {hoveredAbility.canTargetSelf !== false ? '(+Soi)' : ''}</span>}
                                            {hoveredAbility.target === 'area' && <span className="target-tag target-area">💥 Zone</span>}
                                            {hoveredAbility.target === 'enemy' && <span className="target-tag target-enemy">⚔️ Ennemi</span>}
                                            {!hoveredAbility.target && hoveredAbility.friendly && <span className="target-tag target-ally">✨ Allié</span>}
                                            {!hoveredAbility.target && !hoveredAbility.friendly && hoveredAbility.name !== 'Se déplacer' && <span className="target-tag target-enemy">⚔️ Ennemi</span>}
                                        </div>
                                        <div className="ability-detail-desc">{hoveredAbility.desc}</div>
                                        <div className="ability-detail-footer">
                                            <span className="ability-detail-range">
                                                {hoveredAbility.name === 'Se déplacer' ? '👟' : '🏹'} 
                                                Portée: {hoveredAbility.range || 2}m
                                            </span>
                                            {hoveredAbility.cooldown > 0 && (
                                                <span className="ability-detail-cooldown">⏱️ Recharge: {hoveredAbility.cooldown} tours</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                {/* End Turn Button */}
                                <button 
                                    className="diegetic-end-turn"
                                    onClick={nextTurn}
                                    style={{ marginTop: '8px' }}
                                >
                                    <span>⌛</span>
                                </button>
                            </div>
                        </>
                    )}

                    {/* Selected Action Indicator - Always visible when action selected */}
                    {isLocalPlayerTurn && currentActor && selectedAction && (
                        <div
                            className="diegetic-selected-action"
                            style={{
                                position: 'absolute',
                                left: plannedPath.length > 0 
                                    ? `${getPosPercent(currentActor.posX) + 12}%`  // Décalé à droite si chemin planifié
                                    : `${getPosPercent(currentActor.posX)}%`,
                                top: plannedPath.length > 0
                                    ? `${getPosPercent(currentActor.posY, true)}%`  // Aligné avec le personnage si chemin
                                    : `${getPosPercent(currentActor.posY, true) - 20}%`,
                                transform: 'translateX(-50%)',
                                zIndex: 101,
                                pointerEvents: 'auto'
                            }}
                        >
                            <div className="selected-action-diegetic">
                                <span className="selected-diegetic-name">{selectedAction.name}</span>
                                <button 
                                    className="selected-diegetic-clear"
                                    onClick={() => {
                                        setSelectedAction(null);
                                        setIsPathPlanning(false);
                                        setPlannedPath([]);
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Path Preview & Ghost (Centralized to avoid per-tile duplication) */}
                    {selectedAction?.isMovement && isPathPlanning && (hoveredTile || plannedPath.length > 0) && (() => {
                        const startPoint = plannedPath.length > 0
                            ? { x: plannedPath[plannedPath.length - 1][0], y: plannedPath[plannedPath.length - 1][1] }
                            : { x: currentActor.posX, y: currentActor.posY };

                        const pmLeft = currentActor.currentPM - plannedPath.length;
                        const segmentPath = hoveredTile && pmLeft > 0
                            ? findPath(startPoint.x, startPoint.y, hoveredTile.x, hoveredTile.y, pmLeft)
                            : null;

                        const fullPreviewPath = [...plannedPath, ...(segmentPath || [])];

                        return fullPreviewPath.map((step, sIdx) => {
                            const isLastStep = sIdx === fullPreviewPath.length - 1;
                            return (
                                <React.Fragment key={`path-preview-${sIdx}`}>
                                    <div
                                        className="path-dot-animated"
                                        style={{
                                            position: 'absolute',
                                            left: `${getPosPercent(step[0])}%`,
                                            top: `${getPosPercent(step[1], true)}%`,
                                            width: '8px',
                                            height: '8px',
                                            background: sIdx < plannedPath.length ? 'var(--combat-gold)' : 'rgba(212, 175, 55, 0.8)',
                                            borderRadius: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            boxShadow: '0 0 10px var(--combat-gold)',
                                            zIndex: 1005,
                                            pointerEvents: 'none'
                                        }}
                                    />
                                    <div className="path-cost-label" style={{
                                        left: `${getPosPercent(step[0])}%`,
                                        top: `${getPosPercent(step[1], true)}%`,
                                        width: `${100 / arenaConfig.blocksX}%`,
                                        textAlign: 'center'
                                    }}>
                                        -{sIdx + 1} PM
                                    </div>

                                    {isLastStep && (
                                        <div className="character-ghost" style={{
                                            left: `${getPosPercent(step[0])}%`,
                                            top: `${getPosPercent(step[1], true)}%`,
                                            width: `${100 / arenaConfig.blocksX}%`,
                                            height: `${100 / arenaConfig.blocksY}%`,
                                            transform: 'translate(-50%, -50%)',
                                            pointerEvents: 'none'
                                        }}>
                                            <div className="unit-portrait-wrapper" style={{ opacity: 0.5, filter: 'grayscale(0.5) brightness(1.5)' }}>
                                                <img src={currentActor.portrait_url} className="unit-portrait" alt="" />
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        });
                    })()}
                </div>

                {/* Overlays that shouldn't be covered by Arena */}
                {rollOverlay && <RollOverlay {...rollOverlay} onRollComplete={handleRollComplete} />}
                {remoteAction && <RemoteActionOverlay action={remoteAction} onComplete={() => setRemoteAction(null)} />}

                {combatState === 'finished' && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', zIndex: 20000 }}>
                        <button onClick={onCombatEnd} className="btn-gold" style={{ padding: '1.5rem 5rem', fontSize: '1.5rem', boxShadow: '0 0 50px var(--combat-gold)', borderRadius: '12px' }}>RETOUR AU MONDE</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CombatManager;
