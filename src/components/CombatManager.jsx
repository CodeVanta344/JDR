import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CLASSES, BESTIARY } from '../lore';
import { CombatLogger } from '../utils/logger';
import { supabase } from '../supabaseClient';
import { DieVisual } from './DieVisual';
import { DiceRollScene } from './Dice3D';
import {
    rollAttackD100,
    calculateDamageD100,
    calculateCombatantAC,
    convertACtoD100,
    formatCombatLogD100
} from '../utils/combat-d100';
import { getModifier, getProficiencyBonus } from '../lore/rules';
import './CombatManager.css';

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
        <div className="turn-tracker">
            {sequence.map((u, i) => {
                const isCurrent = i === 0;
                return (
                    <div
                        key={`${u.id}-${i}`}
                        className={`turn-actor-card ${isCurrent ? 'current' : ''} ${u.isEnemy ? 'enemy' : ''}`}
                    >
                        <img src={u.portrait_url} className="turn-actor-portrait" alt="" />
                        {isCurrent && (
                            <div className="turn-focus-badge">
                                TOUR
                            </div>
                        )}
                        {u.isEnemy && !isCurrent && (
                            <div className="turn-enemy-pip" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};



const RemoteActionOverlay = ({ action, onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 4000); // Slightly longer for ceremony
        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!action) return null;

    return (
        <div style={{
            position: 'absolute', inset: 0, zIndex: 2500,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <div style={{
                marginBottom: '40px', fontSize: '2.5rem', fontFamily: 'var(--font-display)',
                color: 'var(--gold-light)', textShadow: '0 0 20px rgba(212, 175, 55, 0.8)',
                textAlign: 'center', animation: 'scaleUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}>
                <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '10px' }}>Action de l'adversaire</div>
                {action.attackerName} utilise <br />
                <span style={{ color: 'white', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}>{action.abilityName.toUpperCase()}</span>
            </div>

            <div style={{ transform: 'scale(1.5)', marginBottom: '40px' }}>
                <DieVisual
                    type="d20"
                    value={action.roll}
                    onComplete={() => { }}
                    isResult={true}
                />
            </div>

            <div style={{
                marginTop: '20px', textAlign: 'center',
                background: 'rgba(0,0,0,0.85)', padding: '20px 40px', borderRadius: '15px',
                border: '2px solid var(--gold-dim)',
                boxShadow: '0 0 50px rgba(0,0,0,1)',
                animation: 'slideUpFade 0.5s 0.3s both'
            }}>
                <div style={{ fontSize: '2rem', color: 'white', fontWeight: '900' }}>
                    {action.roll} <span style={{ color: 'var(--gold-primary)', fontSize: '1.2rem' }}>+ {action.modifier}</span> =
                    <span style={{
                        marginLeft: '15px',
                        color: action.success ? '#00ff00' : '#ff4444',
                        textShadow: action.success ? '0 0 15px rgba(0,255,0,0.6)' : '0 0 15px rgba(255,0,0,0.6)'
                    }}>
                        {action.roll + action.modifier}
                    </span>
                </div>
                <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', marginTop: '8px', letterSpacing: '1px' }}>
                    Seuil de réussite : <span style={{ color: 'white' }}>{action.threshold} AC</span>
                </div>
                {action.success && (
                    <div style={{
                        marginTop: '15px', fontSize: '1.8rem', color: '#ff4444', fontWeight: '900',
                        textShadow: '0 0 10px rgba(255,0,0,0.8)',
                        animation: 'shockwave 0.5s ease-out'
                    }}>
                        💥 {action.damage} DÉGÂTS !
                    </div>
                )}
            </div>
        </div>
    );
};

export const CombatManager = ({ arenaConfig = { blocksX: 10, blocksY: 10, shapeType: 'STANDARD' }, players, currentUserId, initialEnemies, syncedCombatState, onUpdateCombatState, onCombatEnd, onLogAction, onHPChange, onResourceChange, onConsumeItem, onGameOver, onRewards, onVFX, onSFX, sessionId }) => {
    // ROBUST USER ID MATCHING - Try multiple methods (MEMOIZED with stable comparison)
    const myPlayer = useMemo(() => {
        if (!players || !currentUserId) return null;
        // Method 1: Direct user_id match
        let found = players.find(p => p.user_id === currentUserId);
        if (found) return found;
        // Method 2: Check if currentUserId matches any player's id
        found = players.find(p => p.id === currentUserId);
        return found;
    }, [players?.length, currentUserId]); // Only recompute when player count or userId changes

    // Track if already logged to prevent duplicate logs
    const hasLoggedInitRef = useRef(false);

    // Log only once on first mount
    useEffect(() => {
        if (hasLoggedInitRef.current) return;
        hasLoggedInitRef.current = true;

        console.log(`[CombatManager] ====== COMBAT INIT ======`);
        console.log(`[CombatManager] currentUserId: ${currentUserId}`);
        console.log(`[CombatManager] players (${players?.length}):`, players?.map(p => ({ name: p.name, user_id: p.user_id, id: p.id })));
        console.log(`[CombatManager] myPlayer found: ${myPlayer?.name} (user_id: ${myPlayer?.user_id}, id: ${myPlayer?.id})`);

        CombatLogger.log('INIT', 'Combat Manager Initialized', {
            currentUserId,
            playersCount: players?.length,
            players: players?.map(p => ({ name: p.name, user_id: p.user_id, id: p.id })),
            myPlayer: myPlayer ? { name: myPlayer.name, user_id: myPlayer.user_id, id: myPlayer.id } : null
        });
    }, []); // Empty deps = run once on mount

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
    const [movingUnit, setMovingUnit] = useState(null); // { id, path: [{x, y}], currentStep: 0 }
    const [attackAnimation, setAttackAnimation] = useState(null); // { attackerId, targetId, type, diceRoll }
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
        console.log('[SYNC] useEffect triggered', {
            updatedAt: syncedCombatState?.updatedAt,
            lastSync: lastSyncRef.current,
            shouldSkip: syncedCombatState?.updatedAt && syncedCombatState?.updatedAt <= lastSyncRef.current,
            active: syncedCombatState?.active,
            movingUnit: movingUnit // Log if animation is active
        });

        if (syncedCombatState && syncedCombatState.active) {
            // CRITICAL FIX: Only apply if this is a newer update than what we already have
            if (syncedCombatState.updatedAt && syncedCombatState.updatedAt <= lastSyncRef.current) {
                console.log('[SYNC] Skipping - already have this update');
                return; // Skip - we already have this or a newer update
            }

            // CRITICAL FIX: Block DB sync during active animations to prevent position rollback
            if (movingUnit) {
                console.log('[SYNC] BLOCKED - Animation in progress, will sync after completion');
                return; // Skip sync while unit is animating to avoid overwriting intermediate positions
            }

            console.log(`[Combat Sync] ====== RECEIVING SYNCED STATE ======`);
            console.log(`[Combat Sync] Combatants count: ${syncedCombatState.combatants?.length}`);
            syncedCombatState.combatants?.forEach((c, i) => {
                console.log(`[Combat Sync] [${i}] name: ${c.name}, isEnemy: ${c.isEnemy}, user_id: ${c.user_id}`);
            });

            lastSyncRef.current = syncedCombatState.updatedAt || Date.now();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [syncedCombatState?.updatedAt, currentUserId, movingUnit]); // Re-check sync when animation completes

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
                console.log(`[Combat Init] Loading player for combat: ${p.name}, user_id: ${p.user_id}, id: ${p.id}`);
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

            const enemiesToUse = (initialEnemies && initialEnemies.length > 0) ? initialEnemies.map((e, idx) => {
                const pos = getUniquePos(true);
                const baseEnemy = BESTIARY[e.name.split(' ')[0]] || BESTIARY[e.class] || {};

                // ========== CONVERSION D100 ENNEMIS ==========
                // Si AC ancien (10-22), convertir en d100 (20-60)
                let enemyAC = e.ac || baseEnemy.stats?.ac || 12;
                if (enemyAC < 20) {
                    enemyAC = convertACtoD100(enemyAC);
                }

                // ATK : si ancien (+2-6), multiplier ×2.5
                let enemyATK = e.atk || baseEnemy.stats?.atk || 5;
                if (enemyATK < 10) {
                    enemyATK = Math.round(enemyATK * 2.5);
                }

                // HP : si ancien (10-50), multiplier ×5
                let enemyHP = e.hp || baseEnemy.stats?.hp || 20;
                if (enemyHP < 100) {
                    enemyHP = enemyHP * 5;
                }

                return {
                    id: e.id || `ai-enemy-${idx}`,
                    name: e.name || "Ennemi Inconnu",
                    class: e.class || "Monstre",
                    hp: enemyHP,
                    maxHp: e.maxHp ? (e.maxHp < 100 ? e.maxHp * 5 : e.maxHp) : enemyHP,
                    atk: enemyATK,
                    ac: enemyAC,
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

            console.log(`[Combat Init] ====== LOCAL INITIALIZATION (HOST) ======`);
            console.log(`[Combat Init] Total combatants: ${sorted.length}`);
            sorted.forEach((c, i) => {
                console.log(`[Combat Init] [${i}] name: ${c.name}, isEnemy: ${c.isEnemy}, user_id: ${c.user_id}, initiative: ${c.initiative}`);
            });

            setCombatants(sorted);
            setCombatState('active');

            // CRITICAL: Sync initial state to other players
            if (onUpdateCombatState) {
                console.log(`[Combat Init] SENDING initial sync to other players`);
                sorted.forEach((c, i) => {
                    console.log(`[Combat Init SEND] [${i}] name: ${c.name}, isEnemy: ${c.isEnemy}, user_id: ${c.user_id}`);
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
            console.log(`[Combat Turn] ====== TURN CHECK ======`);
            console.log(`[Combat Turn] currentActor: ${currentActor.name}, user_id: ${currentActor.user_id}, id: ${currentActor.id}, isEnemy: ${currentActor.isEnemy}`);
            console.log(`[Combat Turn] currentUserId: ${currentUserId}`);
            console.log(`[Combat Turn] myPlayer: ${myPlayer?.name}, user_id: ${myPlayer?.user_id}, id: ${myPlayer?.id}`);
            console.log(`[Combat Turn] isLocalPlayerTurn: ${isLocalPlayerTurn}`);

            CombatLogger.log('TURN', 'Turn Check', {
                currentActor: { name: currentActor.name, user_id: currentActor.user_id, id: currentActor.id, isEnemy: currentActor.isEnemy },
                currentUserId,
                myPlayer: myPlayer ? { name: myPlayer.name, user_id: myPlayer.user_id, id: myPlayer.id } : null,
                isLocalPlayerTurn
            });
        }
    }, [currentTurnIndex, isLocalPlayerTurn]); // Only log when turn index or decision changes

    // MEMOIZED to prevent unnecessary re-calculations
    const canMove = useMemo(() =>
        isLocalPlayerTurn && currentActor && currentActor.currentPM > 0 && combatState === 'active',
        [isLocalPlayerTurn, currentActor?.currentPM, combatState]
    );

    const canAct = useMemo(() =>
        isLocalPlayerTurn && currentActor && !currentActor.hasActed && combatState === 'active',
        [isLocalPlayerTurn, currentActor?.hasActed, combatState]
    );

    console.log(`[Combat UI] canMove: ${canMove}, canAct: ${canAct}, currentPM: ${currentActor?.currentPM}, combatState: ${combatState}`);

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
                if (onComplete) onComplete();
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
    };

    const executeMove = (direction) => {
        console.log(`[executeMove] Called with direction: ${direction}, canMove: ${canMove}`);
        const currentCombatants = combatantsRef.current;
        const freshActor = currentCombatants.find(u => u.id === currentActor.id);
        if (!freshActor) {
            console.log(`[executeMove] ABORT: freshActor not found`);
            return;
        }

        const authorized = freshActor.isEnemy || canMove;
        console.log(`[executeMove] freshActor: ${freshActor.name}, isEnemy: ${freshActor.isEnemy}, authorized: ${authorized}, currentPM: ${freshActor.currentPM}`);
        if (!authorized || freshActor.currentPM <= 0) {
            console.log(`[executeMove] ABORT: not authorized (${authorized}) or no PM (${freshActor.currentPM})`);
            return;
        }
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
            // Update state IMMEDIATELY (don't wait for animation)
            const latestCombatants = combatantsRef.current;
            const newCombatants = latestCombatants.map(u => u.id === freshActor.id ? { ...u, posX: newX, posY: newY, currentPM: u.currentPM - 1, facing: newFacing, hasMoved: true } : u);
            setCombatants(newCombatants);

            // Sync immediately to all clients
            if (onUpdateCombatState) {
                onUpdateCombatState({
                    combatants: newCombatants,
                    turnIndex: currentTurnIndex,
                    round,
                    active: true,
                    logs,
                    updatedAt: Date.now()
                });
            }

            // Start smooth animation AFTER state update
            animateMovement(freshActor.id, freshActor.posX, freshActor.posY, newX, newY, () => {
                console.log(`[executeMove] Animation complete for ${freshActor.name} at (${newX}, ${newY})`);
            });

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
        const rollData = rollAttackD100(freshActor, target, actorLevel, tacticalBonus);
        const { roll, modifier, total, success, isCritical } = rollData;

        // Afficher overlay avec résultat
        setRollOverlay({
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
                // ========== SYSTÈME D100 - CALCUL DÉGÂTS ==========
                const damageData = calculateDamageD100(currentActor, action, rollData.isCritical);
                const damage = damageData.damage;

                // Log formaté d100
                const combatLog = formatCombatLogD100(currentActor, target, rollData, damageData);
                addLog({ role: 'system', content: combatLog });

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
                        // CRITICAL FIX: Finish turn for ALL actors after attack, not just enemies
                        finishTurn();
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

                // CRITICAL FIX: Finish turn for ALL actors after attack, not just enemies
                setTimeout(() => { finishTurn(); }, 1000);
            }
        }, 1000);
    };

    const finishTurn = () => {
        setAnimatingId(null); setShakingId(null);

        // CRITICAL FIX: Mark current actor as having acted to prevent infinite replay
        const updatedCombatants = combatants.map(u =>
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
                // AI moves ONE tile per turn towards target (more tactical & visible)
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

                    // Move ONE step towards target (not full path)
                    const dx = Math.sign(targetX - freshActor.posX);
                    const dy = Math.sign(targetY - freshActor.posY);

                    if (dx !== 0 || dy !== 0) {
                        // Prioritize primary axis (horizontal or vertical)
                        let moveX = 0, moveY = 0;
                        if (Math.abs(targetX - freshActor.posX) >= Math.abs(targetY - freshActor.posY)) {
                            // Horizontal priority
                            if (dx !== 0 && isTileValid(freshActor.posX + dx, freshActor.posY) && !isTileOccupied(freshActor.posX + dx, freshActor.posY, freshActor.id)) {
                                moveX = dx;
                            } else if (dy !== 0 && isTileValid(freshActor.posX, freshActor.posY + dy) && !isTileOccupied(freshActor.posX, freshActor.posY + dy, freshActor.id)) {
                                moveY = dy;
                            }
                        } else {
                            // Vertical priority
                            if (dy !== 0 && isTileValid(freshActor.posX, freshActor.posY + dy) && !isTileOccupied(freshActor.posX, freshActor.posY + dy, freshActor.id)) {
                                moveY = dy;
                            } else if (dx !== 0 && isTileValid(freshActor.posX + dx, freshActor.posY) && !isTileOccupied(freshActor.posX + dx, freshActor.posY, freshActor.id)) {
                                moveX = dx;
                            }
                        }

                        if (moveX !== 0 || moveY !== 0) {
                            const direction = moveX > 0 ? 'right' : moveX < 0 ? 'left' : moveY > 0 ? 'down' : 'up';
                            executeMove(direction);
                            // Wait for move to sync (reduced delay for smoother combat)
                            await new Promise(r => setTimeout(r, 350));
                        }
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
                        // CRITICAL: Wait for attack animation, then end IA turn
                        setTimeout(() => finishTurn(), 1500);
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
        
        // Déterminer si l'unité est ciblable selon le type de sort
        let isTargetable = false;
        if (selectedAction && unit.hp > 0) {
            const isOffensive = !selectedAction.friendly; // Par défaut les sorts sont offensifs
            const isFriendly = selectedAction.friendly === true; // Sorts de soin/buff explicitement marqués
            
            if (isFriendly) {
                // Sort allié : cibler son propre camp (et potentiellement soi-même)
                isTargetable = (unit.isEnemy === currentActor?.isEnemy);
            } else {
                // Sort offensif : cibler le camp opposé UNIQUEMENT (jamais soi-même)
                isTargetable = (unit.isEnemy !== currentActor?.isEnemy) && (unit.id !== currentActor?.id);
            }
        }
        
        const isJumping = animatingId === unit.id;

        return (
            <div id={`unit-${unit.id}`}
                onClick={() => isTargetable && isLocalPlayerTurn && executeAttack(unit, selectedAction)}
                className={`unit-card ${isCurrent ? 'active-turn' : ''} ${isTargetable ? (selectedAction.friendly ? 'targetable-friendly' : 'targetable') : ''}`}
                style={{
                    left: style.left,
                    top: style.top,
                    opacity: unit.hp <= 0 ? 0 : 1,
                    pointerEvents: unit.hp <= 0 ? 'none' : 'auto',
                    zIndex: isCurrent ? 100 : (isJumping ? 200 : 10),
                }}>

                {/* Tactical Selection Ring (pulsing) */}
                {isCurrent && <div className="unit-selection-ring" />}

                {/* Facing Indicator */}
                <div className="unit-facing-indicator" style={{
                    transform: `translate(-50%, -50%) rotate(${unit.facing === 'NORTH' ? 0 : (unit.facing === 'EAST' ? 90 : (unit.facing === 'SOUTH' ? 180 : 270))}deg) translateY(-65px)`,
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

                {/* Stats Orbs */}
                <div className="stat-orb initiative">{unit.initiative}</div>
                <div className="stat-orb pm">{unit.currentPM}</div>

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

    const AbilityCard = ({ ability }) => {
        const cost = ability.cost !== undefined ? ability.cost : (ability.name === 'Attaque' ? 0 : 20);
        const currentCooldown = cooldowns[currentActor?.id]?.[ability.name] || 0;
        const onCooldown = currentCooldown > 0;
        const canAfford = currentActor.resource >= cost && !onCooldown;
        const isSelected = selectedAction?.name === ability.name;

        return (
            <div
                onClick={() => canAfford && isLocalPlayerTurn && setSelectedAction(ability)}
                className={`ability-card-premium ${isSelected ? 'selected' : ''} ${!canAfford ? 'disabled' : ''}`}
            >
                {/* Visual Accent */}
                <div className="ability-accent" />

                {onCooldown && (
                    <div className="ability-cooldown-overlay">
                        <span className="cooldown-value">{currentCooldown}</span>
                        <span className="cooldown-label">Tours</span>
                    </div>
                )}

                <div className="ability-title">
                    {ability.name}
                </div>

                <div className="ability-desc">
                    {ability.desc}
                </div>

                <div className="ability-footer">
                    <span className="ability-range">{ability.range}m</span>
                    <div className="ability-cost-orb">
                        {cost}
                    </div>
                </div>
            </div>
        );
    };

    const RollOverlay = ({ roll, modifier, tacticalReason, threshold, success, action }) => (
        <div style={{ position: 'absolute', inset: 0, zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
            {/* 3D Dice Animation */}
            <div style={{ marginBottom: '2rem' }}>
                <DiceRollScene
                    diceType="d20"
                    value={roll}
                    onComplete={() => handleRollComplete({ roll, modifier, threshold, success, targetId: rollOverlay.targetId, action })}
                />
            </div>
            {/* Result Display */}
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'rgba(10, 10, 20, 0.9)',
                borderRadius: '16px',
                border: '2px solid var(--gold-dim)',
                animation: 'slideUpFade 0.5s ease-out'
            }}>
                <div style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem', fontWeight: 'bold' }}>
                    {roll} <span style={{ color: 'var(--gold-primary)', fontSize: '1.5rem' }}>+{modifier}</span>
                    {tacticalReason && <span style={{ display: 'block', color: 'var(--gold-primary)', fontSize: '1rem', marginTop: '0.5rem' }}>({tacticalReason})</span>}
                    <span style={{ display: 'block', fontSize: '2.5rem', marginTop: '0.5rem', color: success ? '#00ff00' : '#ff4444', textShadow: success ? '0 0 20px #00ff00' : '0 0 20px #ff4444' }}>
                        = {roll + modifier}
                    </span>
                </div>
                <div style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)' }}>
                    Seuil de réussite: <span style={{ color: 'white', fontWeight: 'bold' }}>{threshold} AC</span>
                </div>
                {success && (
                    <div style={{
                        marginTop: '1rem',
                        fontSize: '2rem',
                        color: '#ff4444',
                        fontWeight: '900',
                        textShadow: '0 0 20px rgba(255,0,0,0.8)',
                        animation: 'shockwave 0.5s ease-out'
                    }}>
                        💥 TOUCHÉ !
                    </div>
                )}
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
                    flex: 1,
                    overflow: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px'
                }}>
                    <div className="combat-arena" style={{
                        width: `${arenaConfig.blocksX * 100}px`,
                        height: `${arenaConfig.blocksY * 100}px`,
                    }}>
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
                                                // Vert pour sorts alliés (soin/buff), doré pour sorts offensifs
                                                if (selectedAction.friendly) {
                                                    highlight = { color: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', glow: 'rgba(74, 222, 128, 0.2)' };
                                                } else {
                                                    highlight = { color: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.3)', glow: 'rgba(212, 175, 55, 0.2)' };
                                                }
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

                        {/* Arena Units (2D Positioning with smooth animation) */}
                        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
                            {combatants.map((u, index) => {
                                // Check if this unit is currently animating
                                const isAnimating = movingUnit && movingUnit.id === u.id;
                                const displayX = isAnimating ? movingUnit.animX : u.posX;
                                const displayY = isAnimating ? movingUnit.animY : u.posY;

                                const x = getPosPercent(displayX);
                                const y = getPosPercent(displayY, true);
                                return <UnitCard key={u.id} unit={u} style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    transition: isAnimating ? 'none' : 'left 0.8s cubic-bezier(0.4, 0, 0.2, 1), top 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                                }} />;
                            })}
                        </div>
                    </div>
                </div>
                <div style={{
                    width: '350px',
                    background: 'linear-gradient(to right, rgba(0,0,0,0.95), rgba(15,15,25,0.95))',
                    padding: '2rem 1.5rem',
                    overflowY: 'auto',
                    borderLeft: '1px solid rgba(212, 175, 55, 0.2)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                    display: 'flex', flexDirection: 'column', gap: '15px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--gold-dark) transparent'
                }}>
                    <div style={{ color: 'var(--gold-light)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 'bold', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '5px' }}>Journal de Combat</div>
                    {logs.map((l, i) => {
                        const isImpact = l.content.includes('💥') || l.content.includes('💀');
                        const isVictory = l.content.includes('🏆');
                        const isSystem = l.role === 'system';
                        return (
                            <div key={i} style={{
                                marginBottom: '0.8rem',
                                fontSize: isVictory ? '1.2rem' : (isImpact ? '0.98rem' : '0.92rem'),
                                color: isVictory ? 'var(--gold-primary)' : (isImpact ? '#fff' : 'rgba(255,255,255,0.7)'),
                                borderLeft: isVictory ? '4px solid var(--gold-primary)' : (isImpact ? '3px solid #ff4444' : '2px solid rgba(255,255,255,0.2)'),
                                padding: '8px 12px',
                                background: isImpact ? 'linear-gradient(to right, rgba(255,0,0,0.15), transparent)' : (isVictory ? 'linear-gradient(to right, rgba(212, 175, 55, 0.1), transparent)' : 'transparent'),
                                borderRadius: '0 8px 8px 0',
                                animation: 'slideRight 0.3s ease-out',
                                fontFamily: isSystem ? 'monospace' : 'inherit',
                                lineHeight: '1.4'
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

            <div className="combat-footer">
                {isLocalPlayerTurn ? (
                    <div style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '1400px', justifyContent: 'center', alignItems: 'flex-end' }}>
                        {/* Movement Cluster */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--combat-gold-dim)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Déplacement</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div />
                                <button onClick={() => executeMove('up')} disabled={!canMove} className="btn-medieval" style={{ width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>▲</button>
                                <div />
                                <button onClick={() => executeMove('left')} disabled={!canMove} className="btn-medieval" style={{ width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>◀</button>
                                <button onClick={() => executeMove('down')} disabled={!canMove} className="btn-medieval" style={{ width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>▼</button>
                                <button onClick={() => executeMove('right')} disabled={!canMove} className="btn-medieval" style={{ width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>▶</button>
                            </div>
                        </div>

                        {/* Abilities Scroll */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--combat-gold-dim)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Capacités & Sorts</div>
                            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '10px 5px 30px 5px', scrollbarWidth: 'none' }}>
                                {[{ name: 'Attaque', desc: 'Attaque de base', range: 2 }, ...(currentActor.spells || currentActor.abilities || [])].map((s, i) => (
                                    <AbilityCard key={i} ability={typeof s === 'string' ? { name: s, range: 2 } : s} />
                                ))}
                            </div>
                        </div>

                        {/* Items Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '0.6rem', color: 'var(--combat-cyan)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Consommables</div>
                            <div style={{ display: 'flex', gap: '10px', background: 'rgba(75, 207, 250, 0.05)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(75, 207, 250, 0.2)', minHeight: '130px' }}>
                                {currentActor.inventory?.filter(item => (item.stats && (item.stats.heal || item.stats.resource || item.stats.hp)) || ['consumable', 'potion', 'scroll'].includes(item.type?.toLowerCase())).length > 0 ? (
                                    currentActor.inventory
                                        .filter(item => (item.stats && (item.stats.heal || item.stats.resource || item.stats.hp)) || ['consumable', 'potion', 'scroll'].includes(item.type?.toLowerCase()))
                                        .map((item, idx) => (
                                            <div
                                                key={`item-${idx}`}
                                                onClick={() => !currentActor.hasActed && executeUseItem(item)}
                                                className={`ability-card-premium ${currentActor.hasActed ? 'disabled' : ''}`}
                                                style={{ width: '90px', height: '120px' }}
                                            >
                                                <div className="ability-title" style={{ fontSize: '0.6rem' }}>{item.name}</div>
                                                <div style={{ background: 'var(--combat-cyan)', color: 'black', textAlign: 'center', borderRadius: '4px', padding: '2px', fontWeight: '900', fontSize: '0.55rem', marginTop: 'auto' }}>OBJET</div>
                                            </div>
                                        ))
                                ) : (
                                    <div style={{ width: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', fontStyle: 'italic', textAlign: 'center' }}>Aucun objet</div>
                                )}
                            </div>
                        </div>

                        {/* End Turn Button */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '20px' }}>
                            <div style={{ height: '14px' }} />
                            <button
                                onClick={nextTurn}
                                className="btn-end-turn"
                                style={{
                                    padding: '1.5rem 2.5rem',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    minWidth: '180px',
                                    height: '140px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>⌛️</span>
                                <span>Finir le Tour</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="waiting-turn-aura">
                        {currentActor?.isEnemy ? "L'ennemi réfléchit..." : `Attente de ${currentActor?.name || 'Joueur'}...`}
                    </div>
                )}
                {combatState === 'finished' && (
                    <button onClick={onCombatEnd} className="btn-gold" style={{ padding: '1rem 4rem', fontSize: '1.2rem', boxShadow: '0 0 30px var(--combat-gold)' }}>RETOUR AU MONDE</button>
                )}
            </div>
        </div>
    );
};
