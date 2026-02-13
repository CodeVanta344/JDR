import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import { WORLD_CONTEXT, BESTIARY, LEVEL_THRESHOLDS, CLASSES, ENVIRONMENTAL_RULES, EQUIPMENT_RULES, NPC_TEMPLATES, IMPORTANT_NPCS, QUEST_HOOKS, TAVERNS_AND_LOCATIONS, RUMORS_AND_GOSSIP, RANDOM_ENCOUNTERS, BESTIARY_EXTENDED, WORLD_MYTHS_EXTENDED, LEGENDARY_ITEMS, WORLD_HISTORY, FACTION_LORE, WORLD_MYTHS_AND_LEGENDS, CULTURAL_LORE, LOCATION_BACKGROUNDS } from './lore';
import { initializeLoreSystem } from './lore';
import { preloadCommonData } from './lore/optimization';
import { CharacterCreation } from './components/CharacterCreation';
import { CharacterSheet } from './components/CharacterSheet';
import { SessionLobby } from './components/SessionLobby';
import { SessionHub } from './components/SessionHub';
import { CombatManager } from './components/CombatManager';
import { DebugPanel } from './components/DebugPanel';
import { PartyHUD } from './components/PartyHUD';
import { MerchantModal } from './components/MerchantModal';
import { LootModal } from './components/LootModal';
import { NPCDialogueModal } from './components/NPCDialogueModal';
import { DiceChallengeModal } from './components/DiceChallengeModal';
import { CombatDistanceModal } from './components/CombatDistanceModal';
import { formatAIContent, calculateTotalStats, calculateMaxResource, resolvePlayerAbilities, generateArenaDecor, generateRandomCharacter } from './utils/gameUtils';
import { AudioManager } from './components/AudioManager';
import { GameHelperModal } from './components/GameHelperModal';
import { LevelUpModal } from './components/LevelUpModal';
import { TransactionPrompt } from './components/TransactionPrompt';
import { TradeModal } from './components/TradeModal';
import { HUDHeader } from './components/HUD/HUDHeader';
import { NarrationPanel } from './components/HUD/NarrationPanel';
import { CodexPanel } from './components/CodexPanel';
import { DMPanel } from './components/DMPanel';
import WaitingRoom from './components/WaitingRoom';
import { WeatherOverlay } from './components/WeatherOverlay';
import { SceneBackground } from './components/SceneBackground';
import { ParticleSystem } from './components/ParticleSystem';
import { useGameState } from './hooks/useGameState';
import { extractSpokenText, speakText, initSpeech } from './utils/speechUtils';
const STARTING_LOCKS = new Set();


export default function App() {
    const [profile, setProfile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userMsg, setUserMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [sceneImage, setSceneImage] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [combatMode, setCombatMode] = useState(false);
    const [combatEnemies, setCombatEnemies] = useState([]);
    const [activeNPC, setActiveNPC] = useState(null);
    const [activeMerchant, setActiveMerchant] = useState(null);
    const [activeLoot, setActiveLoot] = useState(null);
    const [pendingCombat, setPendingCombat] = useState(null);
    const [pendingTransaction, setPendingTransaction] = useState(null);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [npcConversations, setNpcConversations] = useState({});
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [audioVolume, setAudioVolume] = useState(0.5);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [showCodex, setShowCodex] = useState(false);
    const [showDMPanel, setShowDMPanel] = useState(false);
    const [showHelper, setShowHelper] = useState(false);
    const [helperMessages, setHelperMessages] = useState([]);
    const [typingUsers, setTypingUsers] = useState([]);
    // Weather moved to useGameState
    const [availableSessions, setAvailableSessions] = useState([]);
    const [gamePhase, setGamePhase] = useState('INTRO'); // INTRO, EXPLORATION, DRAMA
    const [showTradeModal, setShowTradeModal] = useState(false);
    const [incomingTrade, setIncomingTrade] = useState(null);
    const [pendingTradeResponse, setPendingTradeResponse] = useState(null);

    // ... (rest of state)


    const pollInterval = useRef(null);
    const typingTimeoutRef = useRef(null);
    const creatingPlayerRef = useRef(false);
    const chatRef = useRef(null);
    const lastActivityRef = useRef(Date.now());

    const [lastSFX, setLastSFX] = useState(null);
    const [activeVFX, setActiveVFX] = useState(null);
    const [tension, setTension] = useState(0); // 0-100 scale
    const [adventureStarted, setAdventureStarted] = useState(false);

    // Integrated Game State Hook
    const {
        session, setSession,
        character, setCharacter,
        players, setPlayers,
        onlineUsers, setOnlineUsers,
        connStatus, setConnStatus,
        affinities, setAffinities,
        titles, setTitles,
        gameTime, setGameTime,
        syncedCombatState, setSyncedCombatState,
        realTimeSync, setRealTimeSync,
        fetchSession,
        fetchWorldState,
        fetchPlayerExtras,
        handleHPChange,
        chronicle,
        addToChronicle,
        resetChronicle,
        resetGameTime,
        weather, setWeather,
        fetchAvailableSessions
    } = useGameState(profile);

    // --- LORE SYSTEM INITIALIZATION ---
    useEffect(() => {
        const startTime = performance.now();
        console.log('[App] Initializing Lore System...');

        initializeLoreSystem();

        // Preload common data in background
        preloadCommonData().then(() => {
            const duration = performance.now() - startTime;
            console.log(`[App] Lore System ready in ${duration.toFixed(2)}ms`);
        });
    }, []);

    // --- PRIVATE HUD PERSISTENCE (GRIMOIRE & NPC) ---
    useEffect(() => {
        if (session?.id && character?.id) {
            const helperKey = `jdr_helper_${session.id}_${character.id}`;
            const helperSaved = localStorage.getItem(helperKey);
            if (helperSaved) {
                try {
                    const parsed = JSON.parse(helperSaved);
                    if (Array.isArray(parsed)) setHelperMessages(parsed);
                } catch (e) { }
            }

            const npcKey = `jdr_npcs_${session.id}_${character.id}`;
            const npcSaved = localStorage.getItem(npcKey);
            if (npcSaved) {
                try {
                    const parsed = JSON.parse(npcSaved);
                    if (typeof parsed === 'object') setNpcConversations(parsed);
                } catch (e) { }
            }
        }
    }, [session?.id, character?.id]);

    // --- GLOBAL VOICE NARRATION ---
    useEffect(() => {
        if (!voiceEnabled || messages.length === 0) return;
        const lastMsg = messages[messages.length - 1];

        // Only speak for GM (npc/narrative roles) and not system messages
        if (lastMsg.role === 'narrage' || lastMsg.role === 'npc' || (lastMsg.role === 'assistant' && !showHelper)) {
            // Check if it's already in the private modal (avoid double speech)
            if (activeNPC) return;

            const spokenText = extractSpokenText(lastMsg.content);
            speakText(spokenText);
        }
    }, [messages, voiceEnabled, activeNPC]);

    // --- DATA FETCHING ---
    const addMessage = async (msg) => {
        if (!session?.id) return;
        const { error } = await supabase.from('messages').insert({
            session_id: session.id,
            role: msg.role,
            content: msg.content,
            player_id: character?.id
        });
        if (error) console.error("addMessage error:", error);
    };

    const fetchData = React.useCallback(async () => {
        if (!session?.id) return;
        try {
            // Fetch initial weather
            const { data: wData } = await supabase.from('world_state').select('value').eq('key', `weather_${session.id}`).maybeSingle();
            if (wData) setWeather(wData.value);

            // Fetch initial merchant state (for sync)
            const { data: mData } = await supabase.from('world_state').select('value').eq('key', `merchant_${session.id}`).maybeSingle();
            if (mData && mData.value && mData.value.active !== false) {
                setActiveMerchant(mData.value);
            }

            const { data: sData } = await supabase.from('sessions').select('*').eq('id', session.id).maybeSingle();
            if (sData) setSession(sData);

            const { data: msgData } = await supabase.from('messages').select('*').eq('session_id', session.id).order('created_at', { ascending: true });

            // Check for start marker in RAW data before filtering
            const hasStarted = msgData?.some(m => m.content.includes("START_ADVENTURE_TRIGGERED"));
            setAdventureStarted(hasStarted);

            const filteredMsgs = (msgData || []).filter(m =>
                (!m.content?.startsWith('(MÉMOIRE:') || m.content.includes("START_ADVENTURE_TRIGGERED"))
            );
            setMessages(filteredMsgs);
            const lastImg = [...(msgData || [])].reverse().find(m => m.role === 'image');
            if (lastImg) setSceneImage(lastImg.content);

            const { data: pData } = await supabase.from('players').select('*').eq('session_id', session.id);
            setPlayers(pData || []);
            const pc = pData?.find(p => p.user_id === profile?.id);
            if (pc) setCharacter(pc);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    }, [session?.id, profile?.id, setWeather, setSession, setAdventureStarted, setMessages, setSceneImage, setPlayers, setCharacter]);

    // Re-fetch everything when adventure officially starts
    useEffect(() => {
        if (adventureStarted) {
            fetchData();
        }
    }, [adventureStarted, fetchData]);

    // --- REAL-TIME MESSAGE SUBSCRIPTION ---
    useEffect(() => {
        if (!session?.id) return;

        const channel = supabase
            .channel(`messages_${session.id}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `session_id=eq.${session.id}`
            }, (payload) => {
                const newMsg = payload.new;
                // Skip memory markers (except START trigger) and duplicates
                if ((newMsg.content?.startsWith('(MEMOIRE:') || newMsg.content?.startsWith('(MÉMOIRE:')) && !newMsg.content.includes("START_ADVENTURE_TRIGGERED")) return;

                setMessages(prev => {
                    // Check if message already exists
                    if (prev.some(m => m.id === newMsg.id)) return prev;
                    return [...prev, newMsg];
                });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [session?.id]);

    // --- TRADE CHANNEL LISTENER (global - not tied to modal) ---
    useEffect(() => {
        if (!session?.id || !character?.id) return;

        const tradeChannel = supabase
            .channel(`trade_${session.id}`)
            .on('broadcast', { event: 'trade_offer' }, (payload) => {
                if (payload.payload.targetId === character.id) {
                    setIncomingTrade(payload.payload);
                    triggerSFX('notification');
                }
            })
            .on('broadcast', { event: 'trade_response' }, (payload) => {
                if (payload.payload.fromId === character.id) {
                    setPendingTradeResponse(payload.payload);
                    if (payload.payload.accepted) {
                        triggerSFX('gold');
                        fetchSession();
                    }
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(tradeChannel);
        };
    }, [session?.id, character?.id]);

    // --- AUTO-CREATE LOBBY PLAYER ---
    useEffect(() => {
        if (session && profile && !character && !loading && !creatingPlayerRef.current) {
            creatingPlayerRef.current = true;
            // Check directly in DB to avoid race conditions with empty `players` state
            supabase.from('players').select('*').eq('session_id', session.id).eq('user_id', profile.id).maybeSingle()
                .then(({ data: existing }) => {
                    if (existing) {
                        setCharacter(existing);
                        creatingPlayerRef.current = false;
                    } else {
                        supabase.from('players').upsert({
                            session_id: session.id,
                            user_id: profile.id,
                            name: profile.name || 'Voyageur',
                            is_host: session.host_id === profile.id,
                            is_ready: false
                        }, { onConflict: 'session_id,user_id' }).select().single().then(({ data }) => {
                            if (data) setCharacter(data);
                            creatingPlayerRef.current = false;
                        }).catch(() => {
                            creatingPlayerRef.current = false;
                        });
                    }
                }).catch(() => {
                    creatingPlayerRef.current = false;
                });
        }
    }, [session, profile, character, loading]);

    // --- AUTO-RANDOMIZE FOR QUICK JOIN ---
    useEffect(() => {
        if (character && window.pendingQuickStart && !loading) {
            window.pendingQuickStart = false; // Consume flag
            handleCharacterQuickStart();
        }
    }, [character, loading]);

    // --- SESSION DISCOVERY POLLING ---
    useEffect(() => {
        if (!session && profile) {
            const refreshDiscovery = async () => {
                const data = await fetchAvailableSessions();
                setAvailableSessions(data || []);
            };
            refreshDiscovery();
            const interval = setInterval(refreshDiscovery, 10000);
            return () => clearInterval(interval);
        }
    }, [session, profile, fetchAvailableSessions]);

    useEffect(() => {
        if (session?.id && character?.id) {
            if (helperMessages.length > 0) {
                localStorage.setItem(`jdr_helper_${session.id}_${character.id}`, JSON.stringify(helperMessages));
            }
            if (Object.keys(npcConversations).length > 0) {
                localStorage.setItem(`jdr_npcs_${session.id}_${character.id}`, JSON.stringify(npcConversations));
            }
        }
    }, [helperMessages, npcConversations, session?.id, character?.id]);

    useEffect(() => {
        const storedProfile = localStorage.getItem('profile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        } else {
            const newProfile = { id: crypto.randomUUID(), name: 'Traveler' };
            localStorage.setItem('profile', JSON.stringify(newProfile));
            setProfile(newProfile);
        }

        const query = new URLSearchParams(window.location.search);
        const sid = query.get('s');
        if (sid) {
            console.log("Auto-joining session:", sid);
            fetchSession(sid).then(s => {
                if (s) fetchWorldState();
            });
        }
    }, [fetchSession, fetchWorldState]);

    const triggerSFX = (type) => {
        setLastSFX({ type, t: Date.now() });
    };

    const triggerVFX = (type, x, y, color = 'white') => {
        setActiveVFX({ type, x, y, color, t: Date.now() });
    };

    const ARENA_TEMPLATES = {
        PETITE_CHAMBRE: { blocksX: 10, blocksY: 10, shapeType: 'HALL' },
        GRANDE_SALLE: { blocksX: 10, blocksY: 10, shapeType: 'HALL' },
        HALL_MAJESTUEUX: { blocksX: 10, blocksY: 10, shapeType: 'HALL' },
        COULOIR_ETROIT: { blocksX: 10, blocksY: 10, shapeType: 'CORRIDOR' },
        TUNNEL_LONG: { blocksX: 10, blocksY: 10, shapeType: 'CORRIDOR' },
        PONT_PIERRE: { blocksX: 10, blocksY: 10, shapeType: 'BRIDGE' },
        PASSERELLE: { blocksX: 10, blocksY: 10, shapeType: 'BRIDGE' },
        ARENE_CIRCULAIRE: { blocksX: 10, blocksY: 10, shapeType: 'CIRCULAR' },
        PUITS: { blocksX: 10, blocksY: 10, shapeType: 'CIRCULAR' },
        SALLE_TRONE: { blocksX: 10, blocksY: 10, shapeType: 'HALL' },
        CRYPTE: { blocksX: 10, blocksY: 10, shapeType: 'HALL' },
        BALCON: { blocksX: 10, blocksY: 10, shapeType: 'BRIDGE_H' },
        FALAISE: { blocksX: 10, blocksY: 10, shapeType: 'BRIDGE_H' },
        RUE: { blocksX: 10, blocksY: 10, shapeType: 'STANDARD' },
        PLACE: { blocksX: 10, blocksY: 10, shapeType: 'CIRCULAR' },
        CACHOT: { blocksX: 10, blocksY: 10, shapeType: 'HALL' },
        LABORATOIRE: { blocksX: 10, blocksY: 10, shapeType: 'STANDARD' },
        TEMPLE: { blocksX: 10, blocksY: 10, shapeType: 'STANDARD' },
        CARREFOUR: { blocksX: 10, blocksY: 10, shapeType: 'STANDARD' },
        VESTIBULE: { blocksX: 10, blocksY: 10, shapeType: 'STANDARD' }
    };

    const getArenaConfig = () => {
        const lastNarrative = [...messages].reverse().find(m => (m.role === 'assistant' || m.role === 'system') && !m.content.includes('(MÉMOIRE:'))?.content || '';
        const content = lastNarrative.toLowerCase();

        // Heuristic Mapping
        if (content.includes('pont') || content.includes('passerelle')) return ARENA_TEMPLATES.PONT_PIERRE;
        if (content.includes('balcon') || content.includes('corniche') || content.includes('falaise')) return ARENA_TEMPLATES.FALAISE;
        if (content.includes('couloir') || content.includes('étroit') || content.includes('tunnel')) return ARENA_TEMPLATES.TUNNEL_LONG;
        if (content.includes('trône') || content.includes('audience')) return ARENA_TEMPLATES.SALLE_TRONE;
        if (content.includes('crypte') || content.includes('tombeau') || content.includes('caveau')) return ARENA_TEMPLATES.CRYPTE;
        if (content.includes('cercle') || content.includes('arène') || content.includes('rond') || content.includes('place')) return ARENA_TEMPLATES.PLACE;
        if (content.includes('puits') || content.includes('dôme')) return ARENA_TEMPLATES.PUITS;
        if (content.includes('cachot') || content.includes('cellule')) return ARENA_TEMPLATES.CACHOT;
        if (content.includes('rue') || content.includes('quartier') || content.includes('chemin')) return ARENA_TEMPLATES.RUE;
        if (content.includes('temple') || content.includes('sanctuaire')) return ARENA_TEMPLATES.TEMPLE;
        if (content.includes('laboratoire') || content.includes('atelier')) return ARENA_TEMPLATES.LABORATOIRE;
        if (content.includes('majestueux') || content.includes('immense') || content.includes('basilique')) return ARENA_TEMPLATES.HALL_MAJESTUEUX;
        if (content.includes('salle') || content.includes('chambre')) return content.length > 500 ? ARENA_TEMPLATES.GRANDE_SALLE : ARENA_TEMPLATES.PETITE_CHAMBRE;

        return ARENA_TEMPLATES.VESTIBULE;
    };



    // Initialize Combat and broadcast to all players via world_state
    const initializeHostCombat = async (enemiesData) => {

        // 1. Define Arena & Positions (Simple Logic for now, can be expanded)
        // Enemies East, Players West
        const playersList = players || [];
        const arenaConfig = getArenaConfig(); // Use current context

        // Helper to check validity
        const isTileValid = (x, y) => {
            const boundsX = Math.floor(arenaConfig.blocksX / 2);
            const boundsY = Math.floor(arenaConfig.blocksY / 2);
            return x >= -boundsX && x < boundsX && y >= -boundsY && y < boundsY;
        };

        const generatePositions = (count, isEnemy) => {
            const positions = [];
            const maxX = Math.floor(arenaConfig.blocksX / 2);
            for (let i = 0; i < count; i++) {
                let x, y, attempts = 0;
                do {
                    if (isEnemy) x = Math.floor(Math.random() * 3) + (maxX - 4); // East side
                    else x = -Math.floor(Math.random() * 3) - 2; // West side
                    y = Math.floor(Math.random() * (arenaConfig.blocksY - 2)) - Math.floor(arenaConfig.blocksY / 2) + 1;
                    attempts++;
                } while (positions.some(p => p.x === x && p.y === y) && attempts < 100);
                positions.push({ x, y });
            }
            return positions;
        };

        const playerPositions = generatePositions(playersList.length, false);
        const enemyPositions = generatePositions(enemiesData.length, true);

        const combatants = [
            ...playersList.map((p, i) => ({
                id: p.id, user_id: p.user_id, name: p.name, class: p.class,
                hp: p.hp, maxHp: p.max_hp, resource: p.resource, maxResource: p.max_resource,
                initiative: Math.floor(Math.random() * 20) + 1, // Reset initiative
                isEnemy: false, portrait_url: p.portrait_url,
                posX: playerPositions[i].x, posY: playerPositions[i].y,
                maxPM: Math.floor(((p.stats?.dex || 10) + (p.stats?.con || 10) - 20) / 4) + 5,
                currentPM: Math.floor(((p.stats?.dex || 10) + (p.stats?.con || 10) - 20) / 4) + 5,
                hasActed: false, facing: 'EAST',
                spells: resolvePlayerAbilities(p)
            })),
            ...enemiesData.map((e, i) => {
                const baseEnemy = BESTIARY[e.name.split(' ')[0]] || BESTIARY[e.class] || {};
                return {
                    id: e.id || `enemy-${i}`, name: e.name, class: e.class || 'Monstre',
                    hp: e.hp || baseEnemy.stats?.hp || 20,
                    maxHp: e.hp || baseEnemy.stats?.hp || 20,
                    resource: e.resource || 20, maxResource: e.resource || 20,
                    initiative: e.initiative || Math.floor(Math.random() * 20) + 1,
                    isEnemy: true, portrait_url: e.portrait || baseEnemy.portrait_url,
                    posX: enemyPositions[i].x, posY: enemyPositions[i].y,
                    maxPM: baseEnemy.stats?.maxPM || 5, currentPM: baseEnemy.stats?.maxPM || 5,
                    behavior_type: e.behavior_type || baseEnemy.behavior_type || "MELEE",
                    actions: e.actions || baseEnemy.actions || [{ name: 'Attaque', range: 1.5 }],
                    hasActed: false, facing: 'WEST',
                    atk: e.atk || baseEnemy.stats?.atk || 5,
                    ac: e.ac || baseEnemy.stats?.ac || 12
                };
            })
        ].sort((a, b) => b.initiative - a.initiative);

        const initialState = {
            active: true,
            round: 1,
            turnIndex: 0,
            combatants: combatants,
            arenaConfig: arenaConfig,
            decor: generateArenaDecor(arenaConfig),
            logs: [],
            updatedAt: Date.now()
        };

        await supabase.from('world_state').upsert({ key: `combat_${session.id}`, value: initialState });
    };

    const handleDebugCombat = () => {
        if (!session || !character) return;
        const mockEnemies = [
            { id: 'debug-1', name: 'Gobelin d\'Entrainement', hp: 20, max_hp: 20, atk: 4, ac: 11, cr: 0.25 },
            { id: 'debug-2', name: 'Squelette Cible', hp: 15, max_hp: 15, atk: 3, ac: 12, cr: 0.5 }
        ];
        initializeHostCombat(mockEnemies);
        // We don't strictly need to set mode/enemies here if the sync effect works, 
        // but it provides immediate feedback (optimistic update)
        setCombatEnemies(mockEnemies);
        setCombatMode(true);
    };

    // SYNC: Auto-enter combat when shared state is active (Multiplayer Sync)
    useEffect(() => {
        if (syncedCombatState?.active) {
            setCombatMode(true);
            const enemies = syncedCombatState.combatants?.filter(c => c.isEnemy) || [];
            if (enemies.length > 0) setCombatEnemies(enemies);
        } else if (syncedCombatState && syncedCombatState.active === false) {
            setCombatMode(false);
        }
    }, [syncedCombatState]);

    const updateSyncedCombat = async (newState) => {
        // Any client can request an update (e.g. they attacked), but ideally we check validity
        // For simplicity, we trust the client logic from CombatManager for now, but we push the result to DB
        const timestampedState = { ...newState, updatedAt: Date.now() };
        await supabase.from('world_state').upsert({ key: `combat_${session.id}`, value: timestampedState });
    };





    const handleAffinityChange = async (npcName, change) => {
        const current = affinities[npcName] || 0;
        const next = Math.max(-100, Math.min(100, current + change));

        setAffinities(prev => ({ ...prev, [npcName]: next }));

        await supabase.from('npc_affinities').upsert({
            player_id: character.id,
            npc_name: npcName,
            score: next,
            updated_at: new Date().toISOString()
        }, { onConflict: 'player_id,npc_name' });
    };

    const handleTitleUnlock = async (title) => {
        if (titles.includes(title)) return;
        setTitles(prev => [...prev, title]);
        await supabase.from('player_titles').insert({ player_id: character.id, title });

        setMessages(prev => [...prev, {
            id: crypto.randomUUID(),
            role: 'system',
            content: `TITRE DÉBLOQUÉ : ${title}`,
            created_at: new Date().toISOString()
        }]);
    };

    const handleCodexUpdate = async (codexUpdate) => {
        if (!character?.id || !codexUpdate) return;

        const updates = {};

        if (codexUpdate.new_npc) {
            const currentNpcs = character.visited_npcs || [];
            const npcEntry = typeof codexUpdate.new_npc === 'string'
                ? codexUpdate.new_npc
                : codexUpdate.new_npc;
            const exists = currentNpcs.some(n =>
                (typeof n === 'object' ? n.name : n) === (typeof npcEntry === 'object' ? npcEntry.name : npcEntry)
            );
            if (!exists) {
                updates.visited_npcs = [...currentNpcs, npcEntry];
            }
        }

        if (codexUpdate.new_location) {
            const currentLocs = character.discovered_locations || [];
            const locEntry = typeof codexUpdate.new_location === 'string'
                ? codexUpdate.new_location
                : codexUpdate.new_location;
            const exists = currentLocs.some(l =>
                (typeof l === 'object' ? l.name : l) === (typeof locEntry === 'object' ? locEntry.name : locEntry)
            );
            if (!exists) {
                updates.discovered_locations = [...currentLocs, locEntry];
            }
        }

        if (codexUpdate.new_quest) {
            const currentQuests = character.active_quests || [];
            const questEntry = typeof codexUpdate.new_quest === 'string'
                ? { name: codexUpdate.new_quest }
                : codexUpdate.new_quest;
            const exists = currentQuests.some(q =>
                (typeof q === 'object' ? q.name : q) === questEntry.name
            );
            if (!exists) {
                updates.active_quests = [...currentQuests, questEntry];
            }
        }

        if (codexUpdate.new_secret) {
            const currentSecrets = character.discovered_secrets || [];
            if (!currentSecrets.includes(codexUpdate.new_secret)) {
                updates.discovered_secrets = [...currentSecrets, codexUpdate.new_secret];
            }
        }

        if (codexUpdate.new_event) {
            const currentEvents = character.important_events || [];
            if (!currentEvents.includes(codexUpdate.new_event)) {
                updates.important_events = [...currentEvents, codexUpdate.new_event];
            }
        }

        if (codexUpdate.new_visual) {
            const currentVisuals = character.discovered_visuals || [];
            const exists = currentVisuals.some(v => v.name === codexUpdate.new_visual.name);
            if (!exists) {
                let visualEntry = { ...codexUpdate.new_visual };
                // Generate image if missing
                if (!visualEntry.url) {
                    try {
                        const prompt = `A highly detailed fantasy ${visualEntry.type || 'document'}: ${visualEntry.name}. ${visualEntry.description || ''}. Aged parchment, hand-drawn ink, mystical atmosphere, lore-accurate.`;
                        const url = await generateImage(prompt);
                        if (url) visualEntry.url = url;
                    } catch (e) {
                        console.error("Failed to generate visual codex image:", e);
                    }
                }

                if (visualEntry.url) {
                    updates.discovered_visuals = [...currentVisuals, visualEntry];
                }
            }
        }

        if (Object.keys(updates).length > 0) {
            await supabase.from('players').update(updates).eq('id', character.id);
            setCharacter(prev => ({ ...prev, ...updates }));
        }
    };

    const getTimeLabel = () => {
        const { hour, minute } = gameTime;
        if (hour >= 5 && hour < 8) return `Aube (${hour}h${minute.toString().padStart(2, '0')})`;
        if (hour >= 8 && hour < 12) return `Matin (${hour}h${minute.toString().padStart(2, '0')})`;
        if (hour >= 12 && hour < 14) return `Midi (${hour}h${minute.toString().padStart(2, '0')})`;
        if (hour >= 14 && hour < 18) return `Après-midi (${hour}h${minute.toString().padStart(2, '0')})`;
        if (hour >= 18 && hour < 21) return `Crépuscule (${hour}h${minute.toString().padStart(2, '0')})`;
        return `Nuit (${hour}h${minute.toString().padStart(2, '0')})`;
    };

    const getOverlayColor = () => {
        const { hour } = gameTime;
        if (hour >= 21 || hour < 5) return 'var(--night-color)';
        if (hour >= 5 && hour < 8) return 'var(--dawn-color)';
        if (hour >= 18 && hour < 21) return 'var(--dusk-color)';
        return 'var(--day-color)';
    };

    const handleJoinSession = async (id) => {
        setLoading(true);
        // ... (existing logic might be here, adding fetchPlayerExtras after character is set)
        const data = await fetchSession(id);
        if (data) {
            setSession(data);
            window.history.pushState({}, '', `?s=${data.id}`);
        } else {
            alert("Session introuvable. Vérifiez le code.");
        }
        setLoading(false);
    };

    // --- HOST CLEANUP: beforeunload + visibilitychange ---
    useEffect(() => {
        if (!session || !profile || session.host_id !== profile.id) return;

        const deactivateSession = () => {
            if (!session?.id) return;
            const url = `https://okanuafsmkuzyuyqibpu.supabase.co/rest/v1/sessions?id=eq.${session.id}`;
            const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rYW51YWZzbWt1enl1eXFpYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODQyMjgsImV4cCI6MjA4NjA2MDIyOH0.w93viTCCxc48GNw2n_HFKGq2yQRUvwZSt6lq-FqJb9E';
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': anonKey,
                    'Authorization': `Bearer ${anonKey}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({ active: false }),
                keepalive: true
            });
        };

        window.addEventListener('beforeunload', deactivateSession);
        return () => window.removeEventListener('beforeunload', deactivateSession);
    }, [session?.id, session?.host_id, profile?.id]);

    useEffect(() => {
        if (!session?.id || !profile?.id) return;

        let channel;
        const setupRealtime = () => {
            setConnStatus('connecting');
            channel = supabase
                .channel(`session_${session.id}`)
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `session_id=eq.${session.id}`
                }, () => {
                    // Optimized sync: just fetch everything to ensure consistency
                    fetchData();
                })
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'world_state',
                    filter: `key=eq.weather_${session.id}`
                }, (payload) => {
                    if (payload.new && payload.new.value) {
                        setWeather(payload.new.value);
                    }
                })
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'world_state',
                    filter: `key=eq.merchant_${session.id}`
                }, (payload) => {
                    if (payload.new && payload.new.value) {
                        const val = payload.new.value;
                        if (val.active === false) {
                            setActiveMerchant(null);
                        } else {
                            // Only open/update if I am in the visitors list (or if list doesn't exist for legacy compatibility)
                            if (!val.visitors || (character?.id && val.visitors.includes(character.id))) {
                                setActiveMerchant(val);
                            } else {
                                // If the shop is active but I am NOT in the visitors list, close it for me.
                                setActiveMerchant(null);
                            }
                        }
                    }
                })
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'players',
                    filter: `session_id=eq.${session.id}`
                }, () => {
                    fetchData();
                })
                .on('presence', { event: 'sync' }, () => {
                    const state = channel.presenceState();
                    const presences = [];
                    const typers = [];
                    for (const key in state) {
                        state[key].forEach(p => {
                            presences.push(p.user_id);
                            if (p.is_typing && p.user_id !== profile?.id) {
                                typers.push(p.name || 'Un aventurier');
                            }
                        });
                    }
                    setOnlineUsers([...new Set(presences)]);
                    setTypingUsers([...new Set(typers)]);
                })
                .on('postgres_changes', {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'sessions',
                    filter: `id=eq.${session.id}`
                }, (payload) => {
                    if (payload.new.active === false) {
                        setSession(null);
                        setCharacter(null);
                        setMessages([]);
                        setPlayers([]);
                        setCombatMode(false);
                        window.history.pushState({}, '', window.location.pathname);
                    } else {
                        setSession(prev => ({ ...prev, ...payload.new }));
                    }
                })
                .subscribe(async (status) => {
                    if (status === 'SUBSCRIBED') {
                        setConnStatus('connected');
                        await channel.track({
                            user_id: profile.id,
                            name: character?.name || profile.name,
                            online_at: new Date().toISOString(),
                            is_typing: false
                        });
                    } else if (status === 'TIMED_OUT' || status === 'CLOSED') {
                        setConnStatus('polling');
                    }
                });

            window.activeChannel = channel;
        };

        setupRealtime();
        fetchData();

        return () => {
            if (channel) supabase.removeChannel(channel);
        };
    }, [session?.id, profile?.id, fetchData]);

    // --- PLAYER LIST POLLING FALLBACK (Hub phase only) ---
    useEffect(() => {
        if (!session?.id || adventureStarted) return;
        const refreshPlayers = async () => {
            const { data: pData } = await supabase.from('players').select('*').eq('session_id', session.id);
            if (pData) {
                setPlayers(pData);
                const pc = pData.find(p => p.user_id === profile?.id);
                if (pc) setCharacter(prev => prev?.id === pc.id && prev?.is_ready === pc.is_ready ? prev : pc);
            }
            // Also poll session state to ensure is_started sync
            const { data: sData } = await supabase.from('sessions').select('*').eq('id', session.id).maybeSingle();
            if (sData) {
                setSession(prev => prev?.is_started === sData.is_started && prev?.active === sData.active ? prev : sData);
            }
        };
        const interval = setInterval(refreshPlayers, 5000);
        return () => clearInterval(interval);
    }, [session?.id, profile?.id, adventureStarted]);

    useEffect(() => {
        chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    }, [messages]);

    // --- AUTOMATIC LOCATION BACKGROUND SWITCHING ---
    useEffect(() => {
        if (messages.length === 0) return;
        const lastMsg = messages[messages.length - 1];

        // Only trigger on GM/Narrator messages
        if (lastMsg.role === 'narrage' || lastMsg.role === 'assistant') {
            const content = lastMsg.content.toLowerCase();

            // Check for location mentions
            for (const [locName, imgPath] of Object.entries(LOCATION_BACKGROUNDS)) {
                if (content.includes(locName.toLowerCase())) {
                    setSceneImage(imgPath);
                    break;
                }
            }
        }
    }, [messages]);

    const handleCreateSession = async () => {
        if (!profile) return;
        setLoading(true);
        const { data } = await supabase.from('sessions').insert({ host_id: profile.id }).select().single();
        if (data) {
            setSession(data);
            window.history.pushState({}, '', `?s=${data.id}`);
        }
        setLoading(false);
    };

    const handleCharacterQuickStart = async () => {
        if (!character || !session) return;
        setLoading(true);
        try {
            const randomData = generateRandomCharacter(session.id, profile.id);
            const finalChar = {
                ...randomData,
                id: character.id,
                is_ready: true
            };
            const { data, error } = await supabase
                .from('players')
                .update(finalChar)
                .eq('id', character.id)
                .select()
                .single();

            if (error) throw error;
            setCharacter(data);

            if (session.is_started) {
                const catchupMsg = `[SYSTEM] ${data.name} (un ${data.class}) rejoint l'aventure en cours. Intègre-le narrativement à la scène actuelle.`;
                await supabase.functions.invoke('game-master', {
                    body: {
                        action: catchupMsg,
                        sessionId: session.id,
                        playerId: data.id,
                        lore: { context: WORLD_CONTEXT, bestiary: { ...BESTIARY, ...BESTIARY_EXTENDED }, classes: CLASSES }
                    }
                });
            }
        } catch (e) {
            console.error("Character Quick Start Error:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleJoinQuickStart = async (id) => {
        setLoading(true);
        try {
            const data = await fetchSession(id);
            if (data) {
                setSession(data);
                window.history.pushState({}, '', `?s=${data.id}`);

                // The useEffect for auto-creating player will trigger.
                // We need to wait for character to be set, then trigger randomization.
                // We'll use a one-time interval to check for character record.
                const checkInterval = setInterval(() => {
                    const charRef = window.tempCharacter; // Leak character to window for this sync check if needed, or better use a state effect
                    // Use character state from component if possible
                }, 500);
                setTimeout(() => clearInterval(checkInterval), 5000);

                // Better: set a "pendingQuickStart" flag
                window.pendingQuickStart = true;
            } else {
                alert("Session introuvable.");
            }
        } catch (e) {
            console.error("Join Quick Start Error:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleSoloAdventure = async () => {
        if (!profile) return;
        setLoading(true);
        try {
            // 1. Create Session already marked as started
            const { data: sessionData, error: sessionError } = await supabase
                .from('sessions')
                .insert({
                    host_id: profile.id,
                    is_started: true,
                    active: true
                })
                .select()
                .single();

            if (sessionError || !sessionData) throw sessionError;

            setSession(sessionData);
            window.history.pushState({}, '', `?s=${sessionData.id}`);

            // 2. Create Host Player Record
            const { data: playerData, error: playerError } = await supabase
                .from('players')
                .insert({
                    session_id: sessionData.id,
                    user_id: profile.id,
                    name: profile.name || 'Hero',
                    is_host: true
                })
                .select()
                .single();

            if (playerError || !playerData) throw playerError;

            // 3. Generate Random Character Data
            const randomData = generateRandomCharacter(sessionData.id, profile.id);

            // 4. Apply Random Data & Ready Status
            const finalChar = {
                ...randomData,
                id: playerData.id,
                is_ready: true
            };

            const { data: charData, error: charError } = await supabase
                .from('players')
                .update(finalChar)
                .eq('id', playerData.id)
                .select()
                .single();

            if (charError || !charData) throw charError;

            setCharacter(charData);
            setPlayers([charData]);

            // 5. Trigger Adventure Start (AI Intro)
            // Force start to bypass locks and checks
            setTimeout(() => {
                handleStartAdventure(true);
            }, 500);

        } catch (e) {
            console.error("Solo Adventure Error:", e);
            alert("Erreur lors du Solo Adventure : " + e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSoloCustom = async () => {
        if (!profile) return;
        setLoading(true);
        try {
            // 1. Create Session marked as started (to skip SessionHub/Lobby)
            const { data: sessionData, error: sessionError } = await supabase
                .from('sessions')
                .insert({
                    host_id: profile.id,
                    is_started: true,
                    active: true
                })
                .select()
                .single();

            if (sessionError || !sessionData) throw sessionError;

            setSession(sessionData);
            window.history.pushState({}, '', `?s=${sessionData.id}`);

            // 2. Create Host Player Record (Empty/Skeleton)
            const { data: playerData, error: playerError } = await supabase
                .from('players')
                .insert({
                    session_id: sessionData.id,
                    user_id: profile.id,
                    name: profile.name || 'Hero',
                    is_host: true
                    // No class/stats yet -> Trigger CharacterCreation
                })
                .select()
                .single();

            if (playerError || !playerData) throw playerError;

            setCharacter(playerData);
            setPlayers([playerData]);

            // Flow will naturally go to CharacterCreation because character.class is undefined

        } catch (e) {
            console.error("Solo Custom Error:", e);
            alert("Erreur lors de la création Solo : " + e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickStart = async () => {
        if (!profile) return;
        setLoading(true);
        try {
            // 1. Create Session
            const { data: sessionData, error: sessionError } = await supabase
                .from('sessions')
                .insert({ host_id: profile.id, is_started: false })
                .select()
                .single();

            if (sessionError || !sessionData) throw sessionError;

            setSession(sessionData);
            window.history.pushState({}, '', `?s=${sessionData.id}`);

            // 2. Create Host Player Record
            const { data: playerData, error: playerError } = await supabase
                .from('players')
                .insert({
                    session_id: sessionData.id,
                    user_id: profile.id,
                    name: profile.name || 'DebugHero',
                    is_host: true
                })
                .select()
                .single();

            if (playerError || !playerData) throw playerError;
            setCharacter(playerData);

            // 3. Generate Random Character Data
            const randomData = generateRandomCharacter(sessionData.id, profile.id);

            // 4. Finalize Character
            const finalChar = {
                ...randomData,
                id: playerData.id,
                is_ready: true // Ensure ready
            };

            const { data: charData, error: charError } = await supabase
                .from('players')
                .update(finalChar)
                .eq('id', playerData.id)
                .select()
                .single();

            if (charError || !charData) throw charError;
            setCharacter(charData);
            setPlayers([charData]);

            // 5. Force Start Adventure (Wait slightly for state sync if needed, but we pass true)
            setTimeout(() => {
                handleStartAdventure(true);
            }, 500);

        } catch (e) {
            console.error("Quick Start Error:", e);
            alert("Erreur lors du Quick Start : " + e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLeaveSession = async () => {
        // If the host leaves, deactivate the session so it disappears for everyone
        if (session && profile && session.host_id === profile.id) {
            await supabase.from('sessions').update({ active: false }).eq('id', session.id);
        }
        setSession(null);
        setCharacter(null);
        setMessages([]);
        setPlayers([]);
        setCombatMode(false);
        window.history.pushState({}, '', window.location.pathname);
    };


    const handleResourceChange = async (playerId, newResource) => {
        await supabase.from('players').update({ resource: newResource }).eq('id', playerId);
    };

    const handleGameOver = async () => {
        if (!session || !character) return;
        setLoading(true);
        try {
            // 1. Delete all messages for this session
            await supabase.from('messages').delete().eq('session_id', session.id);
            setMessages([]);

            // 2. Delete the player character and related records
            // We explicitly delete from player_titles and npc_affinities to avoid 409 Conflict
            await supabase.from('player_titles').delete().eq('player_id', character.id);
            await supabase.from('npc_affinities').delete().eq('player_id', character.id);
            await supabase.from('players').delete().eq('id', character.id);

            setCharacter(null);
            setCombatMode(false);

            // 2b. Reset narrative state & world data
            setAdventureStarted(false);
            setTitles([]);
            setAffinities({});
            await resetChronicle();
            await resetGameTime();

            // 3. Inform the world is ready for a new story
            const startMsg = "✨ **Une nouvelle légende s'apprête à être écrite.** Le destin vous attend.";
            setMessages([{
                id: crypto.randomUUID(),
                role: 'system',
                content: startMsg,
                created_at: new Date().toISOString()
            }]);

            // Re-invoke intro
            await supabase.functions.invoke('game-master', { body: { action: 'intro', sessionId: session.id } });

        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleCombatRewards = async (defeatedEnemies) => {
        if (!character) return;

        // Calculate XP & Gold
        let totalXp = 0;
        let totalGold = 0;
        const rewardsItems = [];

        defeatedEnemies.forEach(enemy => {
            // XP: 50 base per enemy + something for HP/ATK
            totalXp += 50 + (enemy.maxHp || 0);
            // Gold: 10-30 base
            totalGold += Math.floor(Math.random() * 20) + 10;

            // Chance for item (20%)
            if (Math.random() < 0.2) {
                // Generate a random simple item
                const itemTypes = ['weapon', 'armor', 'shield', 'consumable'];
                const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];

                if (type === 'consumable') {
                    rewardsItems.push({
                        name: "Potion de Soin mineure",
                        type: "consumable",
                        stats: { heal: 10 },
                        rarity: "common",
                        desc: "Une petite fiole d'un liquide rouge scintillant.",
                        price: 50
                    });
                } else {
                    rewardsItems.push({
                        name: "Objet de récupération",
                        type,
                        stats: { [type === 'weapon' ? 'atk' : 'ac']: 1 },
                        rarity: "common",
                        desc: "Un équipement récupéré sur le champ de bataille.",
                        price: 25
                    });
                }
            }
        });

        // Award XP
        handleExperienceGain(totalXp, "Victoire au combat");

        // Open Loot Modal
        setActiveLoot({
            gold: totalGold,
            items: rewardsItems
        });
    };

    const generateImage = async (prompt) => {
        if (!session?.id) return null;
        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('generate-image', {
                body: { prompt, sessionId: session.id }
            });
            if (error) throw error;
            return data?.url;
        } catch (e) {
            console.error("Image generation error:", e);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleCharacterCreate = async (charData) => {
        setLoading(true);
        try {
            // CATCH-UP LOGIC: Calculate average party level/stats
            const otherPlayers = players.filter(p => p.id !== character?.id && p.class);
            let bonusXp = 0;
            let bonusGold = 0;

            if (otherPlayers.length > 0 && session.is_started) {
                const avgXp = Math.floor(otherPlayers.reduce((acc, p) => acc + (p.xp || 0), 0) / otherPlayers.length);
                const avgGold = Math.floor(otherPlayers.reduce((acc, p) => acc + (p.gold || 0), 0) / otherPlayers.length);

                // Give 80% of average to stay slightly behind but relevant
                bonusXp = Math.floor(avgXp * 0.8);
                bonusGold = Math.floor(avgGold * 0.5);

                console.log("Applying catch-up bonuses:", { bonusXp, bonusGold });
            }

            const finalChar = {
                name: charData.name,
                class: charData.subclass ? `${charData.class} (${charData.subclass})` : charData.class,
                hp: charData.hp,
                max_hp: charData.maxHp,
                inventory: charData.inventory || [],
                stats: { ...charData.stats, mechanic: charData.mechanic },
                abilities: charData.abilities || [],
                spells: charData.spells || [],
                portrait_url: charData.portrait_url,
                resource: charData.resource,
                max_resource: charData.max_resource,
                level: 1,
                xp: (charData.xp || 0) + bonusXp,
                gold: (charData.gold || 100) + bonusGold,
                backstory: charData.backstory,
                backstory_gm_context: charData.backstory_gm_context || '',
                starting_reputation: charData.starting_reputation || {},
                visited_npcs: charData.visited_npcs || [],
                faction_ties: charData.faction_ties || [],
                discovered_secrets: charData.discovered_secrets || [],
                discovered_locations: charData.discovered_locations || [],
                active_quests: charData.active_quests || [],
                important_events: charData.important_events || [],
                session_id: session.id,
                user_id: profile.id,
                is_ready: false
            };

            const { data, error } = await supabase
                .from('players')
                .update(finalChar)
                .eq('id', character.id)
                .select()
                .single();

            if (error) {
                console.error("DEBUG - Character Create Error:", error);
                alert(`Erreur Supabase (400?): ${error.message}\nDetails: ${error.details}`);
            }

            if (!error && data) {
                setCharacter(data);

                if (session.is_started) {
                    const catchupMsg = `[SYSTEM] ${data.name} (un ${data.class}) rejoint l'aventure en cours. Intègre-le narrativement à la scène actuelle.`;
                    await supabase.functions.invoke('game-master', {
                        body: {
                            action: catchupMsg,
                            sessionId: session.id,
                            playerId: data.id,
                            lore: { context: WORLD_CONTEXT, bestiary: { ...BESTIARY, ...BESTIARY_EXTENDED }, classes: CLASSES }
                        }
                    });
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleReady = async () => {
        if (!character) return;
        const newReadyState = !character.is_ready;
        // Optimistic update for instant UI feedback
        setCharacter(prev => ({ ...prev, is_ready: newReadyState }));
        setPlayers(prev => prev.map(p => p.id === character.id ? { ...p, is_ready: newReadyState } : p));

        const { data } = await supabase
            .from('players')
            .update({ is_ready: newReadyState })
            .eq('id', character.id)
            .select()
            .single();

        if (data) {
            setCharacter(data);
            setPlayers(prev => prev.map(p => p.id === data.id ? data : p));
        }
    };

    // Effect: When all players are ready in SessionHub, advance to character creation
    useEffect(() => {
        if (!session || session.is_started || players.length < 2) return;
        if (!profile || session.host_id !== profile.id) return;

        const allReady = players.every(p => p.is_ready);
        if (allReady) {
            // Small delay to show "LANCEMENT EN COURS"
            const timer = setTimeout(async () => {
                await supabase.from('sessions').update({ is_started: true }).eq('id', session.id);
                setSession(prev => ({ ...prev, is_started: true }));
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [session, players, profile]);

    const handleStartAdventure = async (force = false) => {
        if (!session || players.length < 1) return;
        if (!force && STARTING_LOCKS.has(session.id)) return;

        const lastStartAttempt = sessionStorage.getItem(`start_attempt_${session.id}`);
        const now = Date.now();
        if (!force && lastStartAttempt && (now - parseInt(lastStartAttempt) < 10000)) {
            console.log("Start attempt debounced");
            return;
        }
        if (!force) sessionStorage.setItem(`start_attempt_${session.id}`, now.toString());

        // Additional safety: check if GM intro already exists (role is 'system' or 'assistant')
        // We look for a message that is sufficiently long to be an intro, excluding the trigger marker itself
        const existingIntro = messages.find(m =>
            (m.role === 'system' || m.role === 'assistant') &&
            m.content &&
            m.content.length > 100 &&
            !m.content.includes("START_ADVENTURE") &&
            !m.content.includes('(MÉMOIRE:')
        );
        if (existingIntro && !force) {
            console.log("GM intro already exists, skipping START_ADVENTURE call");
            setAdventureStarted(true);
            return;
        }

        STARTING_LOCKS.add(session.id);
        setLoading(true);

        // Forced Start: Immediate UI feedback
        if (force) {
            setAdventureStarted(true);
            // Ensure session is marked as started
            await supabase.from('sessions').update({ is_started: true }).eq('id', session.id);
            setSession(prev => ({ ...prev, is_started: true }));
            // Inject start marker if missing
            const hasMarker = messages.some(m => m.content && m.content.includes("START_ADVENTURE_TRIGGERED"));
            if (!hasMarker) {
                const { error } = await supabase.from('messages').insert({
                    id: session.id,
                    session_id: session.id,
                    role: 'system',
                    content: "(MEMOIRE:SYSTEM) START_ADVENTURE_TRIGGERED"
                });
                // Ignore error if exists (duplicate key)
            }
        }

        try {
            // Mark session as started in DB (redundant if forced but safe)
            if (!session.is_started) {
                await supabase.from('sessions').update({ is_started: true }).eq('id', session.id);
                setSession(prev => ({ ...prev, is_started: true }));
            }

            // Trigger AI Intro
            const { data: aiResponse } = await supabase.functions.invoke('game-master', {
                body: {
                    action: "START_ADVENTURE",
                    history: messages.map(m => ({ role: m.role, content: m.content })),
                    sessionId: session.id,
                    playerId: character?.id,
                    gameTime: gameTime,
                    timeLabel: getTimeLabel(),
                    weather: weather,
                    playerProfile: {
                        name: character.name,
                        class: character.class,
                        level: character.level,
                        stats: character.stats,
                        backstory: character.backstory
                    },
                    gamePhase: gamePhase,
                    lore: { context: WORLD_CONTEXT, bestiary: { ...BESTIARY, ...BESTIARY_EXTENDED }, classes: CLASSES, npcs: NPC_TEMPLATES, quests: QUEST_HOOKS, locations: TAVERNS_AND_LOCATIONS, rumors: RUMORS_AND_GOSSIP, encounters: RANDOM_ENCOUNTERS, myths: WORLD_MYTHS_EXTENDED, legendaryItems: LEGENDARY_ITEMS, history: WORLD_HISTORY, factions: FACTION_LORE, calendar: CULTURAL_LORE },
                    playerGroup: players.map(p => ({
                        name: p.name,
                        class: p.class,
                        backstory: p.backstory
                    }))
                }
            });

            if (aiResponse) {
                // Force a final sync to ensure the intro is visible immediately
                await fetchData();
            }
        } catch (e) {
            console.error("Start Adventure Error:", e);
            // Unlock on error to allow retry
            STARTING_LOCKS.delete(session.id);
            if (!force) alert("Erreur lors du lancement. Le Maître du Jeu est peut-être indisponible.");
        } finally {
            setLoading(false);
            // We usually don't release the lock here as starting is a terminal transition
        }
    };

    // Effect: Launch adventure when all players with class are ready
    useEffect(() => {
        if (!session || !profile || players.length === 0) return;
        if (!character?.class) return;

        const playersWithClass = players.filter(p => p.class);
        const allPlayersReady = playersWithClass.length === players.length && players.every(p => p.class && p.is_ready);
        const hasMarker = messages.some(m => m.content && m.content.includes("START_ADVENTURE_TRIGGERED"));
        const hasGMIntro = messages.some(m => m.role === 'gm' && m.content && m.content.length > 100 && !m.content.includes("START_ADVENTURE"));

        // If adventure already started (marker exists), sync ALL players
        if (hasMarker && !adventureStarted) {
            setAdventureStarted(true);
            return;
        }

        // Already started locally, don't re-trigger
        if (adventureStarted) return;

        // NON-HOST PLAYERS: Check if all are ready and wait for marker
        if (session.host_id !== profile.id) {
            // If all players with class are ready, poll messages more frequently to catch marker
            if (allPlayersReady) {
                const pollInterval = setInterval(async () => {
                    const { data } = await supabase
                        .from('messages')
                        .select('content')
                        .eq('session_id', session.id)
                        .ilike('content', '%START_ADVENTURE_TRIGGERED%')
                        .limit(1);

                    if (data && data.length > 0) {
                        setAdventureStarted(true);
                        clearInterval(pollInterval);
                    }
                }, 1000);

                return () => clearInterval(pollInterval);
            }
            return;
        }

        // HOST: Trigger the actual start when all are ready (ONLY ONCE)
        if (allPlayersReady && character?.is_ready && players.length >= 2 && !hasMarker && !hasGMIntro && !STARTING_LOCKS.has(session.id)) {
            // Immediately set local and module locks
            STARTING_LOCKS.add(session.id);
            setAdventureStarted(true);

            // Attempt to insert the singleton marker using the session UUID as the message ID.
            // This leverages the database's unique constraint to prevent race conditions.
            supabase.from('messages').insert({
                id: session.id, // Deterministic ID
                session_id: session.id,
                role: 'system',
                content: "(MEMOIRE:SYSTEM) START_ADVENTURE_TRIGGERED"
            }).then(({ error }) => {
                // ONLY the one who successfully inserted the marker (no error) should trigger the AI.
                // If error.code === '23505', someone else already won and is handling it.
                if (!error) {
                    handleStartAdventure();
                } else if (error.code === '23505') {
                    console.log("Start marker already exists (race won by another instance). Waiting for sync.");
                    // Ensure local state reflects adventure started
                    setAdventureStarted(true);
                } else {
                    console.error("Failed to insert start marker:", error);
                    STARTING_LOCKS.delete(session.id);
                    setAdventureStarted(false);
                }
            });
        }
    }, [players, session, profile, adventureStarted, messages, character]);

    // START ADVENTURE SYNC FIX
    useEffect(() => {
        if (!session || adventureStarted) return;

        const channel = supabase.channel('session_status_sync')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'sessions', filter: `id=eq.${session.id}` },
                (payload) => {
                    if (payload.new && payload.new.is_started === true) {
                        console.log("SESSION STARTED DETECTED VIA REALTIME!");
                        setSession(prev => ({ ...prev, is_started: true }));
                        setAdventureStarted(true);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [session, adventureStarted]);

    const handleUpdateInventory = async (newInventory, newGold = null) => {
        if (!character?.id) return;
        const updates = { inventory: newInventory };
        if (newGold !== null) updates.gold = newGold;

        // Recalculate Max Resource in case equipment changed stats
        const totalStats = calculateTotalStats(character, newInventory);
        const newMaxRes = calculateMaxResource(character.class, character.level, totalStats);

        if (newMaxRes !== character.max_resource) {
            updates.max_resource = newMaxRes;
            // Adjust current resource if it exceeds max
            if (character.resource > newMaxRes) updates.resource = newMaxRes;
        }

        const { data } = await supabase.from('players').update(updates).eq('id', character.id).select().single();
        if (data) setCharacter(data);
    };

    const handleEquipItem = async (index) => {
        if (!character || !character.inventory) return;
        const item = character.inventory[index];
        if (!item) return;

        const isEquipping = !item.equipped;

        if (isEquipping) {
            // Proficiency Check
            const charClass = character.class.split(' ')[0];
            const rules = EQUIPMENT_RULES.class_proficiency[charClass];

            if (rules) {
                const type = item.type; // weapon, armor, shield, offhand, etc.
                const category = item.category; // light, medium, heavy, martial, simple, etc.

                let canEquip = true;
                let reason = "";

                if (type === 'armor' && !rules.armor.includes(category)) {
                    canEquip = false;
                    reason = `Votre classe (${charClass}) ne peut pas porter d'armure de type ${category}.`;
                }

                if (type === 'weapon' && !rules.weapons.includes(category)) {
                    canEquip = false;
                    reason = `Votre classe (${charClass}) ne peut pas manier d'armes de type ${category}.`;
                }

                // Mage specific restriction for heavy armor (narrative & logic)
                if (charClass === "Mage" && type === 'armor' && category === 'heavy') {
                    canEquip = false;
                    reason = "Un Mage ne peut pas canaliser la magie en armure lourde.";
                }

                if (!canEquip) {
                    alert(reason);
                    return;
                }
            }

            // Slot Conflict Resolution
            // INFERS SLOT FROM TYPE IF NOT DEFINED to prevent "double amulet" etc.
            let slot = item.slot;
            if (!slot && item.type) {
                const lowerType = item.type.toLowerCase();
                if (lowerType.includes('amulette') || lowerType.includes('collier') || lowerType.includes('medal')) slot = 'neck';
                else if (lowerType.includes('anneau') || lowerType.includes('bague')) slot = 'finger'; // Note: Only 1 ring for now with this logic
                else if (lowerType.includes('cape') || lowerType.includes('manteau')) slot = 'back';
                else if (lowerType.includes('botte') || lowerType.includes('chaussure')) slot = 'feet';
                else if (lowerType.includes('gant') || lowerType.includes('moufle')) slot = 'hands';
                else if (lowerType.includes('casque') || lowerType.includes('coiffe') || lowerType.includes('chapeau')) slot = 'head';
                else if (lowerType.includes('ceinture')) slot = 'waist';
                else if (lowerType.includes('armure') || lowerType.includes('plastron') || lowerType.includes('robe') || lowerType.includes('tunique')) slot = 'body';
                else if (lowerType.includes('bouclier')) slot = 'offhand';
            }

            if (slot) {
                const newInventory = character.inventory.map((invItem, i) => {
                    if (i === index) return { ...invItem, equipped: true, slot: slot }; // Assign inferred slot
                    // If same slot, unequip
                    // Check explicit slot OR inferred slot of the other item
                    let otherSlot = invItem.slot;
                    if (!otherSlot && invItem.type) {
                        const ot = invItem.type.toLowerCase();
                        if (ot.includes('amulette') || ot.includes('collier')) otherSlot = 'neck';
                        else if (ot.includes('anneau') || ot.includes('bague')) otherSlot = 'finger';
                        else if (ot.includes('cape') || ot.includes('manteau')) otherSlot = 'back';
                        else if (ot.includes('botte') || ot.includes('chaussure')) otherSlot = 'feet';
                        else if (ot.includes('gant')) otherSlot = 'hands';
                        else if (ot.includes('casque') || ot.includes('coiffe') || ot.includes('chapeau')) otherSlot = 'head';
                        else if (ot.includes('ceinture')) otherSlot = 'waist';
                        else if (ot.includes('armure') || ot.includes('plastron') || ot.includes('robe')) otherSlot = 'body';
                        else if (ot.includes('bouclier')) otherSlot = 'offhand';
                    }

                    if (invItem.equipped && otherSlot === slot) {
                        return { ...invItem, equipped: false };
                    }
                    return invItem;
                });
                handleUpdateInventory(newInventory);
            } else {
                // No slot defined/inferred (e.g. general item), allow simple toggle
                const newInventory = character.inventory.map((invItem, i) => i === index ? { ...invItem, equipped: true } : invItem);
                handleUpdateInventory(newInventory);
            }
        } else {
            // Unequipping is always allowed
            const newInventory = character.inventory.map((invItem, i) => i === index ? { ...invItem, equipped: false } : invItem);
            handleUpdateInventory(newInventory);
        }
    };

    const handleExperienceGain = async (amount, reason) => {
        if (!character?.id || !amount) return;
        const newXp = (character.xp || 0) + amount;
        let newLevel = character.level || 1;
        let leveledUp = false;
        let currentMaxHp = character.max_hp;
        let currentHp = character.hp;
        let currentSpells = [...(character.spells || [])];

        while (newLevel < 10 && newXp >= LEVEL_THRESHOLDS[newLevel + 1]) {
            newLevel++;
            leveledUp = true;

            // Level Up logic
            const charClassKey = character.class.split(' ')[0];
            const classData = CLASSES[charClassKey];
            if (classData) {
                // HP
                const conMod = Math.floor(((character.stats.con || 10) - 10) / 2);
                const hpGain = Math.max(1, Math.floor(classData.hitDie / 2) + 1 + conMod); // Fixed HP gain rule (Avg rounded up)
                currentMaxHp += hpGain;
                currentHp += hpGain;

                // Unlock
                const unlocked = classData.unlockables.find(u => u.level === newLevel);
                let msgContent = `🎉 **NIVEAU SUPÉRIEUR !**\nVous passez **Niveau ${newLevel}** !\n\n💪 **PV Max +${hpGain}**\n✨ **+2 POINTS D'ATTRIBUTS**`;

                if (unlocked) {
                    currentSpells.push(unlocked.name);
                    msgContent += `\n **Débloqué : ${unlocked.name}**\n*${unlocked.desc}*`;
                }

                setMessages(prev => [...prev, {
                    id: crypto.randomUUID(),
                    role: 'system',
                    content: msgContent
                }]);
            }
        }

        if (leveledUp) {
            await supabase.from('players').update({
                xp: newXp,
                level: newLevel,
                max_hp: currentMaxHp,
                hp: currentHp,
                spells: currentSpells,
                attribute_points: (character.attribute_points || 0) + 2
            }).eq('id', character.id);

            // We need to re-fetch or calc resource after state update, 
            // but we can do it optimistically here if we assume stats haven't changed YET (user spends points later).
            // However, level changed, so Max Resource increases.
            const statsNow = calculateTotalStats(character);
            const newMaxRes = calculateMaxResource(character.class, newLevel, statsNow);

            await supabase.from('players').update({
                max_resource: newMaxRes,
                resource: newMaxRes // Restore resource on level up? Usually yes.
            }).eq('id', character.id);

            setCharacter(prev => ({
                ...prev,
                xp: newXp,
                level: newLevel,
                max_hp: currentMaxHp,
                hp: currentHp,
                spells: currentSpells,
                attribute_points: (prev.attribute_points || 0) + 2,
                max_resource: newMaxRes,
                resource: newMaxRes
            }));
            // Trigger Level Up Modal
            setShowLevelUp(true);
        } else {
            await supabase.from('players').update({ xp: newXp }).eq('id', character.id);
            setCharacter(prev => ({ ...prev, xp: newXp }));
            setMessages(prev => [...prev, {
                id: crypto.randomUUID(),
                role: 'system',
                content: `✨ Gain d'XP : +${amount} ${reason ? `(${reason})` : ''} [Total: ${newXp}/${LEVEL_THRESHOLDS[newLevel + 1] || 'MAX'}]`
            }]);
        }
    };

    const handleConfirmTransaction = async (approved) => {
        if (!pendingTransaction || !character) return;

        const { amount, type, context, npcName, reason } = pendingTransaction;
        setPendingTransaction(null);

        if (!approved) {
            const refusalMsg = `[REFUS] Le joueur refuse de payer ${amount} Or${reason ? ` pour : ${reason}` : ''}.`;
            if (context === "NPC" && npcName) {
                handleNPCMessage(refusalMsg, npcName);
            } else {
                handleSubmit(null, refusalMsg);
            }
            return;
        }

        // Apply gold change
        if (type === 'loss' && (character.gold || 0) < amount) {
            setMessages(prev => [...prev, {
                id: crypto.randomUUID(),
                role: 'system',
                content: "⚠️ Vous n'avez pas assez d'or pour cette transaction.",
                created_at: new Date().toISOString()
            }]);
            return;
        }

        const modGold = type === 'gain' ? (character.gold || 0) + amount : Math.max(0, (character.gold || 0) - amount);
        await handleUpdateInventory(character.inventory || [], modGold);

        // Notify AI of success
        const successMsg = `[PAIEMENT_CONFIRMÉ] Le joueur a payé ${amount} Or${reason ? ` pour : ${reason}` : ''}. Procède à la suite.`;
        if (context === "NPC" && npcName) {
            handleNPCMessage(successMsg, npcName);
        } else {
        }
    };

    const handleGMInitiative = async (isStagnation = false) => {
        if (!session || !character || loading || combatMode) return;
        setLoading(true);

        try {
            const { data: aiResponse } = await supabase.functions.invoke('game-master', {
                body: {
                    action: isStagnation ? "Le silence s'installe, les joueurs attendent. Fais avancer l'histoire avec un événement imprévu." : "AUTO_INITIATIVE",
                    history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
                    sessionId: session.id,
                    playerId: character?.id,
                    context: isStagnation ? "GM_STAGNATION_RECOVERY" : "GM_PROACTIVE_INITIATIVE",
                    gameTime: gameTime,
                    timeLabel: getTimeLabel(),
                    weather: weather,
                    tension: 100, // Trigger happened at max tension
                    gamePhase: gamePhase,
                    playerProfile: {
                        name: character.name,
                        class: character.class,
                        level: character.level,
                        stats: character.stats
                    },
                    lore: { context: WORLD_CONTEXT, bestiary: { ...BESTIARY, ...BESTIARY_EXTENDED }, classes: CLASSES, chronicle, npcs: NPC_TEMPLATES, quests: QUEST_HOOKS, locations: TAVERNS_AND_LOCATIONS, rumors: RUMORS_AND_GOSSIP, encounters: RANDOM_ENCOUNTERS, myths: WORLD_MYTHS_EXTENDED, legendaryItems: LEGENDARY_ITEMS, factions: FACTION_LORE }
                }
            });

            if (aiResponse) {
                // Handle world updates (weather, time)
                if (aiResponse.worldUpdate) {
                    if (aiResponse.worldUpdate.weather) {
                        console.log('[Proactive GM] Weather update:', aiResponse.worldUpdate.weather);
                        setWeather(aiResponse.worldUpdate.weather);
                        // Sync to world_state
                        if (session?.host_id === profile?.id) {
                            await supabase.from('world_state').upsert({ 
                                key: 'weather', 
                                value: aiResponse.worldUpdate.weather 
                            });
                        }
                    }
                }
                
                if (aiResponse.world_event) {
                    addToChronicle(aiResponse.world_event);
                    setMessages(prev => [...prev, {
                        id: crypto.randomUUID(),
                        role: 'system',
                        content: `📜 **Chronique :** ${aiResponse.world_event.description}`,
                        created_at: new Date().toISOString()
                    }]);
                }
                // Similar logic to handleSubmit for processing GM response
                if (aiResponse.reward?.xp) handleExperienceGain(aiResponse.reward.xp, aiResponse.reward.reason);
                if (aiResponse.combat?.trigger) {
                    initializeHostCombat(aiResponse.combat.enemies || []);
                }
                if (aiResponse.weather) setWeather(aiResponse.weather);

                // Add the narrative to the chat
                const narrative = aiResponse.narrative || formatAIContent(aiResponse);
                const gmMsg = {
                    id: crypto.randomUUID(),
                    session_id: session.id,
                    role: 'assistant',
                    content: `🎲 [Événement] ${narrative}`,
                    created_at: new Date().toISOString()
                };
                setMessages(prev => [...prev, gmMsg]);
                await supabase.from('messages').insert({ ...gmMsg, session_id: session.id });
            }
        } catch (e) { console.error("GM Initiative failed", e); }
        finally { setLoading(false); }
    };

    const handleChallengeResult = async (result) => {
        const challengeToRef = activeChallenge;
        setActiveChallenge(null);

        // Créer message avec animation 3D du dé
        const diceRollData = {
            type: 'dice_roll',
            diceType: result.dice,
            result: result.natural,
            modifier: result.modifier,
            total: result.total,
            target: result.dc,
            action: challengeToRef.label,
            stat: result.stat.toUpperCase(),
            outcome: result.outcome
        };

        // Ajouter le message avec metadata
        const diceMessage = {
            id: crypto.randomUUID(),
            role: 'system',
            content: `[DICE_ROLL]${JSON.stringify(diceRollData)}`,
            created_at: new Date().toISOString()
        };

        setMessages(prev => [...prev, diceMessage]);

        // Envoyer aussi en DB pour synchro
        if (session) {
            const { error } = await supabase.from('messages').insert({
                session_id: session.id,
                sender: 'SYSTEM',
                content: diceMessage.content,
                role: 'system'
            });
            if (error) console.error('Error saving dice roll message:', error);
        }
    };

    const handleUnlockAbility = async (abilities) => {
        if (!character || !abilities || !abilities.length) return;
        const currentSpells = [...(character.spells || [])];
        const newAbilities = abilities.filter(a => !currentSpells.includes(a));

        if (newAbilities.length > 0) {
            const updatedSpells = [...currentSpells, ...newAbilities];
            const { data } = await supabase.from('players').update({ spells: updatedSpells }).eq('id', character.id).select().single();
            if (data) setCharacter(data);

            newAbilities.forEach(name => {
                setMessages(prev => [...prev, {
                    id: crypto.randomUUID(),
                    role: 'system',
                    content: `🔓 **NOUVELLE APTITUDE !**\nVous avez appris : **${name}**\n*Retrouvez-la dans votre onglet Aptitudes.*`
                }]);
            });
        }
    };

    const handleUpdateStats = async (statBoosts) => {
        if (!character || !statBoosts) return;
        const currentStats = { ...character.stats };
        let changed = false;

        Object.entries(statBoosts).forEach(([stat, boost]) => {
            if (currentStats[stat] !== undefined && boost !== 0) {
                currentStats[stat] += boost;
                changed = true;
            }
        });

        if (changed) {
            // Update Stats First
            await supabase.from('players').update({ stats: currentStats }).eq('id', character.id);

            // Then Recalculate derived
            const tempChar = { ...character, stats: currentStats };
            const totalStats = calculateTotalStats(tempChar);
            const newMaxRes = calculateMaxResource(character.class, character.level, totalStats);

            const { data } = await supabase.from('players').update({
                stats: currentStats,
                max_resource: newMaxRes
            }).eq('id', character.id).select().single();

            if (data) setCharacter(data);

            const boostList = Object.entries(statBoosts)
                .filter(([_, b]) => b !== 0)
                .map(([s, b]) => `${s.toUpperCase()} ${b > 0 ? '+' : ''}${b}`)
                .join(', ');

            setMessages(prev => [...prev, {
                id: crypto.randomUUID(),
                role: 'system',
                content: `📈 **AMÉLIORATION DES ATTRIBUTS !**\n${boostList}`
            }]);
        }
    };

    const handleCombatDistanceCheck = async (combatData) => {
        if (!character) return;
        setLoading(true);

        try {
            // Ask GM to determine distance based on recent history
            const { data: aiResponse } = await supabase.functions.invoke('game-master', {
                body: {
                    action: "DETERMINE_COMBAT_DISTANCE",
                    history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
                    sessionId: session.id,
                    playerId: character.id,
                    playerProfile: { name: character.name, class: character.class },
                    context: `Un combat a commencé (ennemis: ${JSON.stringify(combatData.enemies)}). Le joueur est-il au même endroit que le déclencheur ? Si oui, distance=IMMEDIATE. Sinon, estime la distance (CLOSE=1 tour, MEDIUM=3 tours, FAR=5 tours).`
                }
            });

            const distance = aiResponse?.distance || 'medium'; // Default to medium if AI fails
            const reason = aiResponse?.reason || "Vous entendez le combat au loin.";

            if (typeof distance === 'string' && (distance.toUpperCase() === 'IMMEDIATE' || distance.toUpperCase() === 'CLOSE' && aiResponse?.turns === 0)) {
                // Auto-join without prompt if immediate
                handleJoinCombat('close', 0, combatData);
                setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'system', content: `⚔️ **EMBUSCADE !** Vous êtes jeté dans le combat !` }]);
            } else {
                // Show modal with imposed distance
                setPendingCombat({ ...combatData, imposedDistance: distance.toLowerCase(), reason });
            }
        } catch (e) {
            console.error("Distance check failed", e);
            // Fallback: Show manual choice or default to medium
            setPendingCombat({ ...combatData, imposedDistance: 'medium', reason: "Impossible de déterminer votre position exacte." });
        } finally {
            setLoading(false);
        }
    };

    const handleLevelUpSave = async (result) => {
        if (!character) return;

        // Optimistic update
        setCharacter(prev => ({
            ...prev,
            stats: result.stats,
            attribute_points: result.attribute_points
        }));

        await supabase.from('players').update({
            stats: result.stats,
            attribute_points: result.attribute_points
        }).eq('id', character.id);

        setShowLevelUp(false);
        setMessages(prev => [...prev, {
            id: crypto.randomUUID(),
            role: 'system',
            content: `💪 **STATS MISES À JOUR !**\nVos attributs ont été améliorés.`
        }]);
    };

    const handleJoinCombat = async (distanceStr, turnsOverride = null, combatDataOverride = null) => {
        if (!character) return;

        const combatData = combatDataOverride || pendingCombat;
        if (!combatData) return;

        let turns = turnsOverride;
        if (turns === null) {
            const d = distanceStr.toLowerCase();
            turns = d === 'close' ? 1 : (d === 'medium' ? 3 : 5);
        }

        // If turns is 0, they are arrived immediately
        const newStatus = turns === 0 ? 'arrived' : `traveling:${turns}`;

        // Optimistic update locally to ensure CombatManager sees it immediately
        setPlayers(prev => prev.map(p => p.id === character.id ? { ...p, status: newStatus } : p));

        await supabase.from('players').update({ status: newStatus }).eq('id', character.id);

        setCombatEnemies(combatData.enemies);
        setCombatMode(true);
        setPendingCombat(null);
    };

    const handleNPCMessage = async (content, npcName) => {
        if (!npcName || !content || loading) return;
        setLoading(true);

        const updatedHistory = npcConversations[npcName] || [];
        lastActivityRef.current = Date.now();
        setNpcConversations(prev => ({
            ...prev,
            [npcName]: [...(prev[npcName] || []), { role: 'user', content }]
        }));

        try {
            // Get memories related to this NPC
            const { data: memories } = await supabase
                .from('messages')
                .select('content')
                .eq('session_id', session.id)
                .ilike('content', `%(MÉMOIRE:${npcName})%`)
                .limit(10);

            const memoryContext = memories?.map(m => m.content.replace(`(MÉMOIRE:${npcName})`, '')).join('\n') || "Aucun souvenir particulier.";

            // --- NPC INTELLIGENCE & CONTEXT ENHANCEMENT ---
            // 1. Identify specific NPC traits from lore
            const npcIdentity = IMPORTANT_NPCS[npcName] || IMPORTANT_NPCS[Object.keys(IMPORTANT_NPCS).find(k => npcName.includes(k))] || { role: "Citoyen d'Aethelgard", traits: ["Neutre"], goal: "Vivre sa vie." };

            // 2. Summarize the entire party
            const partySummary = players.map(p => `- ${p.name} (${p.class}, Niv. ${p.level}${p.status.includes('traveling') ? ', En chemin' : ''})`).join('\n');

            // 3. Extract major session events (World Events)
            // 3. Extract major session events (World Events)
            const worldEvents = chronicle.length > 0
                ? chronicle.slice(-5).map(e => `[Jour ${e.date?.day || '?'}] ${e.description}`).join('\n')
                : messages
                    .filter(m => m.role === 'system' && (m.content.includes('🎉') || m.content.includes('⚔️') || m.content.includes('💰') || m.content.includes('🏆')))
                    .slice(-5)
                    .map(m => m.content)
                    .join('\n---\n');

            // 4. Search for mentions of the NPC in the entire session history
            const npcMentions = messages
                .filter(m => !m.content?.includes(`(MÉMOIRE:`) && m.content?.toLowerCase().includes(npcName.toLowerCase()))
                .slice(-10) // Limit to 10 most recent mentions to avoid token bloat
                .map(m => `[${m.role === 'user' ? (players.find(p => p.id === m.player_id)?.name || 'Inconnu') : 'GM'}]: ${m.content}`)
                .join('\n');

            const { data: aiResponse } = await supabase.functions.invoke('game-master', {
                body: {
                    action: `(Privé à ${npcName}) ${content}`,
                    history: updatedHistory.map(m => ({ role: m.role, content: m.content })),
                    sessionId: session.id,
                    playerId: character?.id,
                    gamePhase: gamePhase,
                    playerProfile: {
                        name: character.name,
                        class: character.class,
                        level: character.level,
                        stats: character.stats,
                        gold: character.gold,
                        equippedItems: character.inventory?.filter(i => i.equipped).map(i => i.name) || [],
                        titles: titles,
                        backstory: character.backstory_gm_context
                    },
                    currentAffinity: affinities[npcName] || 0,
                    gameContext: {
                        timeOfDay: getTimeLabel(),
                        currentHour: gameTime.hour
                    },
                    context: "PRIVATE_NPC_CONVERSATION",
                    targetNpc: npcName,
                    npcIdentity: npcIdentity, // New specialized identity
                    partySummary: partySummary, // Awareness of other players
                    worldEvents: worldEvents, // Awareness of loot/victories/combats
                    npcMemory: memoryContext,
                    npcMentions: npcMentions,
                    recentGlobalHistory: messages
                        .filter(m => !m.content?.startsWith('(MÉMOIRE:'))
                        .slice(-30)
                        .map(m => `[${m.role === 'user' ? (players.find(p => p.id === m.player_id)?.name || 'Inconnu') : 'GM'}]: ${m.content}`)
                        .join('\n'),
                    lore: { context: WORLD_CONTEXT, bestiary: { ...BESTIARY, ...BESTIARY_EXTENDED }, classes: CLASSES, chronicle, npcs: NPC_TEMPLATES, quests: QUEST_HOOKS, locations: TAVERNS_AND_LOCATIONS, rumors: RUMORS_AND_GOSSIP, encounters: RANDOM_ENCOUNTERS, myths: WORLD_MYTHS_EXTENDED, legendaryItems: LEGENDARY_ITEMS, factions: FACTION_LORE }
                }
            });

            if (aiResponse) {
                // Handle world updates (weather, time)
                if (aiResponse.worldUpdate) {
                    if (aiResponse.worldUpdate.weather) {
                        console.log('[NPC] Weather update:', aiResponse.worldUpdate.weather);
                        setWeather(aiResponse.worldUpdate.weather);
                        // Sync to world_state
                        if (session?.host_id === profile?.id) {
                            await supabase.from('world_state').upsert({ 
                                key: 'weather', 
                                value: aiResponse.worldUpdate.weather 
                            });
                        }
                    }
                }
                
                // Trigger handling synced with handleSubmit
                if (aiResponse.reward && aiResponse.reward.xp) {
                    handleExperienceGain(aiResponse.reward.xp, aiResponse.reward.reason);
                }
                if (aiResponse.combat?.trigger) {
                    initializeHostCombat(aiResponse.combat.enemies || []);
                }
                if (aiResponse.merchant) {
                    await supabase.from('world_state').upsert({
                        key: `merchant_${session.id}`,
                        value: {
                            ...aiResponse.merchant,
                            active: true,
                            visitors: players.map(p => p.id) // Initialize with all current players
                        }
                    });
                }
                if (aiResponse.loot) setActiveLoot(aiResponse.loot);
                if (aiResponse.transaction) {
                    setPendingTransaction({
                        ...aiResponse.transaction,
                        context: "NPC",
                        npcName: npcName
                    });
                    setLoading(false);
                    return;
                }
                if (aiResponse.unlock) handleUnlockAbility(aiResponse.unlock);
                if (aiResponse.stats) handleUpdateStats(aiResponse.stats);
                if (aiResponse.item) {
                    const items = Array.isArray(aiResponse.item) ? aiResponse.item : [aiResponse.item];
                    const updatedInv = [...(character.inventory || []), ...items];
                    handleUpdateInventory(updatedInv);
                }
                if (aiResponse.affinity_change) {
                    handleAffinityChange(npcName, aiResponse.affinity_change);
                }
                if (aiResponse.title_unlock) {
                    handleTitleUnlock(aiResponse.title_unlock);
                }
                if (aiResponse.codex_update) {
                    handleCodexUpdate(aiResponse.codex_update);
                }

                const responseText = aiResponse.narrative || formatAIContent(aiResponse);
                setNpcConversations(prev => {
                    const updated = {
                        ...prev,
                        [npcName]: [...(prev[npcName] || []), { role: 'npc', content: responseText }]
                    };
                    return updated;
                });

                // Check for closure and summarize
                const lower = content.toLowerCase() + " " + responseText.toLowerCase();
                if (lower.includes("au revoir") || lower.includes("sort de la pièce") || lower.includes("quitte la conversation")) {

                    // Trigger memory summary
                    await supabase.functions.invoke('game-master', {
                        body: {
                            action: `Résume brièvement ce que ${npcName} a appris sur le joueur lors de cet échange. Commence par (MÉMOIRE:${npcName}).`,
                            history: [...updatedHistory, { role: 'npc', content: responseText }].map(m => ({ role: m.role, content: m.content })),
                            sessionId: session.id,
                            playerId: character?.id
                        }
                    }).then(({ data }) => {
                        if (data?.narrative) {
                            supabase.from('messages').insert({
                                session_id: session.id,
                                role: 'system',
                                content: `(MÉMOIRE:${npcName}) ${data.narrative}`,
                                player_id: character.id
                            });
                        }
                    });

                    setTimeout(() => setActiveNPC(null), 2000);
                }
            }
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e, manualContent = null) => {
        if (e) e.preventDefault();
        // Prevent narrative actions during combat
        if (combatMode) return;

        const content = manualContent || userMsg;
        if (!content || !content.trim() || loading) return;

        const tempId = crypto.randomUUID();
        const optimisticMsg = { id: tempId, session_id: session.id, role: 'user', content, player_id: character?.id, created_at: new Date().toISOString() };

        setUserMsg('');
        setLoading(true);
        lastActivityRef.current = Date.now();

        // Dynamic Phase Progression
        if (gamePhase === 'INTRO' && (messages.length > 10)) {
            setGamePhase('EXPLORATION');
        } else if (gamePhase === 'EXPLORATION' && messages.length > 35) {
            setGamePhase('DRAMA');
        }

        setMessages(prev => [...prev, optimisticMsg]);

        try {
            await supabase.from('messages').insert({ id: tempId, session_id: session.id, role: 'user', content, player_id: character?.id });
            const { data: aiResponse } = await supabase.functions.invoke('game-master', {
                body: {
                    action: content,
                    history: messages.filter(m => m.id !== 'temp-intro' && m.id !== tempId).map(m => ({ role: m.role, content: m.content })),
                    sessionId: session.id,
                    playerId: character?.id,
                    gamePhase: gamePhase,
                    context: "WORLD_INTERACTION",
                    gameTime: gameTime,
                    timeLabel: getTimeLabel(),
                    weather: weather,
                    playerProfile: {
                        name: character.name,
                        class: character.class,
                        level: character.level,
                        stats: character.stats,
                        inventory: character.inventory,
                        backstory: character.backstory_gm_context
                    },
                    codex_data: {
                        visited_npcs: character.visited_npcs || [],
                        discovered_locations: character.discovered_locations || [],
                        active_quests: character.active_quests || [],
                        discovered_secrets: character.discovered_secrets || [],
                        important_events: character.important_events || [],
                        discovered_visuals: character.discovered_visuals || []
                    },
                    lore: { context: `${WORLD_CONTEXT}\n\n${ENVIRONMENTAL_RULES}`, bestiary: { ...BESTIARY, ...BESTIARY_EXTENDED }, classes: CLASSES, chronicle, npcs: NPC_TEMPLATES, quests: QUEST_HOOKS, locations: TAVERNS_AND_LOCATIONS, rumors: RUMORS_AND_GOSSIP, encounters: RANDOM_ENCOUNTERS, myths: WORLD_MYTHS_EXTENDED, legendaryItems: LEGENDARY_ITEMS, factions: FACTION_LORE }
                }
            });

            if (aiResponse) {
                // Handle world updates (weather, time)
                if (aiResponse.worldUpdate) {
                    if (aiResponse.worldUpdate.weather) {
                        console.log('[GM] Weather update:', aiResponse.worldUpdate.weather);
                        setWeather(aiResponse.worldUpdate.weather);
                        // Sync to world_state
                        if (session?.host_id === profile?.id) {
                            await supabase.from('world_state').upsert({ 
                                key: 'weather', 
                                value: aiResponse.worldUpdate.weather 
                            });
                        }
                    }
                }
                
                if (aiResponse.world_event) {
                    addToChronicle(aiResponse.world_event);
                    setMessages(prev => [...prev, {
                        id: crypto.randomUUID(),
                        role: 'system',
                        content: `📜 **Chronique :** ${aiResponse.world_event.description}`,
                        created_at: new Date().toISOString()
                    }]);
                }
                if (aiResponse.reward && aiResponse.reward.xp) {
                    handleExperienceGain(aiResponse.reward.xp, aiResponse.reward.reason);
                }
                if (aiResponse.combat?.trigger) {
                    initializeHostCombat(aiResponse.combat.enemies || []);
                }
                if (aiResponse.merchant) {
                    await supabase.from('world_state').upsert({
                        key: `merchant_${session.id}`,
                        value: { ...aiResponse.merchant, active: true }
                    });
                }
                if (aiResponse.loot) setActiveLoot(aiResponse.loot);
                if (aiResponse.transaction) {
                    setPendingTransaction({
                        ...aiResponse.transaction,
                        context: "WORLD",
                        npcName: null
                    });
                    setLoading(false);
                    return;
                }
                if (aiResponse.unlock) handleUnlockAbility(aiResponse.unlock);
                if (aiResponse.stats) handleUpdateStats(aiResponse.stats);
                if (aiResponse.item) {
                    const items = Array.isArray(aiResponse.item) ? aiResponse.item : [aiResponse.item];
                    const updatedInv = [...(character.inventory || []), ...items];
                    handleUpdateInventory(updatedInv);
                }

                if (aiResponse.codex_update) {
                    handleCodexUpdate(aiResponse.codex_update);
                }

                if (aiResponse.combat) {
                    initializeHostCombat(aiResponse.combat.enemies || []);
                }

                if (aiResponse.challenge) {
                    setActiveChallenge(aiResponse.challenge);
                }

                if (aiResponse.npc) {
                    const npcName = aiResponse.npc.name;
                    const responseText = aiResponse.narrative || formatAIContent(aiResponse);

                    // 1. Remove from global state
                    setMessages(prev => prev.filter(m => m.id !== tempId));

                    // 2. Remove from global DB
                    await supabase.from('messages').delete().eq('id', tempId);

                    // 3. Move to private state
                    setNpcConversations(prev => ({
                        ...prev,
                        [npcName]: [
                            ...(prev[npcName] || []),
                            { role: 'user', content: content },
                            { role: 'npc', content: responseText }
                        ]
                    }));

                    // 4. Open the modal
                    setActiveNPC(aiResponse.npc);
                }
            }

            // FORCED SYNC: Always reload after AI interaction to handle complex system states
            await fetchData();
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleConsumeItem = async (item, index) => {
        if (!character || !item) return;

        let used = false;
        let msg = "";

        // Handle Effects
        if (item.stats) {
            if (item.stats.heal) {
                const healAmount = item.stats.heal;
                const newHp = Math.min(character.max_hp, character.hp + healAmount);
                await handleHPChange(character.id, newHp);
                setCharacter(prev => ({ ...prev, hp: newHp }));
                msg = `🧪 Vous buvez **${item.name}** et récupérez **${healAmount} PV** (${newHp}/${character.max_hp}).`;
                used = true;
            }
            if (item.stats.resource) {
                const resAmount = item.stats.resource;
                const newRes = Math.min(character.max_resource, (character.resource || 0) + resAmount);
                await handleResourceChange(character.id, newRes);
                setCharacter(prev => ({ ...prev, resource: newRes }));
                msg = `🧪 Vous utilisez **${item.name}** et récupérez **${resAmount}** points de ressource.`;
                used = true;
            }
        }

        if (used) {
            // Remove 1 unit from inventory
            const newInv = [...character.inventory];
            newInv.splice(index, 1);
            await handleUpdateInventory(newInv);

            setMessages(prev => [...prev, {
                id: crypto.randomUUID(),
                role: 'system',
                content: msg
            }]);
        }
    };


    // Derive Music Mood
    const getMood = () => {
        if (combatMode) return 'combat';
        if (activeNPC) return 'dialogue';

        const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
        if (lastMsg.includes("sombre") || lastMsg.includes("étrange") || lastMsg.includes("danger")) return 'mystery';

        return 'exploration';
    };

    const handleHelperMessage = async (content) => {
        if (loading || !content.trim()) return;
        const newUserMsg = { role: 'user', content };
        const updatedMessages = [...helperMessages, newUserMsg];
        setHelperMessages(updatedMessages);
        setLoading(true);

        try {
            const { data: aiResponse } = await supabase.functions.invoke('game-master', {
                body: {
                    action: content,
                    history: helperMessages.slice(-10).map(m => ({ role: m.role, content: m.content })),
                    sessionId: session.id,
                    playerId: character?.id,
                    context: "GAME_ASSISTANT",
                    playerProfile: {
                        name: character.name,
                        class: character.class,
                        level: character.level
                    }
                }
            });

            if (aiResponse) {
                const responseText = aiResponse.narrative || (typeof aiResponse === 'string' ? aiResponse : "Désolé, je n'ai pas pu trouver l'information.");
                setHelperMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
            }
        } catch (e) {
            console.error("Grimoire AI Error:", e);
            setHelperMessages(prev => [...prev, { role: 'assistant', content: "Une erreur est survenue lors de la consultation du grimoire." }]);
        }
        finally { setLoading(false); }
    };

    const handleInputTyping = (e) => {
        setUserMsg(e.target.value);

        if (!window.activeChannel || !profile) return;

        // Set typing status
        window.activeChannel.track({
            user_id: profile.id,
            name: character?.name || profile.name,
            online_at: new Date().toISOString(),
            is_typing: true
        });

        // Debounce to clear
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            if (window.activeChannel) {
                window.activeChannel.track({
                    user_id: profile.id,
                    name: character?.name || profile.name,
                    online_at: new Date().toISOString(),
                    is_typing: false
                });
            }
        }, 2000);
    };

    // Safety: Auto-exit combat if no enemies
    useEffect(() => {
        if (combatMode && (!combatEnemies || combatEnemies.length === 0)) {
            setCombatMode(false);
        }
    }, [combatEnemies, combatMode]);

    const handleTestCombat = () => {
        const dummyEnemies = [
            { id: 'gob1', name: 'Gobelin', hp: 20, maxHp: 20, ac: 12, x: 3, y: 3, type: 'enemy' },
            { id: 'gob2', name: 'Chef Gobelin', hp: 45, maxHp: 45, ac: 14, x: 6, y: 4, type: 'enemy' }
        ];
        setSceneImage('/maps/test_map.jpg');
        setCombatEnemies(dummyEnemies);
        setCombatMode(true);
        addMessage({
            role: 'system',
            content: "⚔️ **MODE DEBUG:** Combat de test lancé avec la carte personnalisée.",
            id: crypto.randomUUID()
        });
    };


    return (
        <div className="app-container">
            <div className="vignette-overlay" />

            {/* MULTI-STEP FLOW: LOBBY -> HUB -> CREATION -> GAME */}
            {!session ? (
                <SessionLobby
                    onJoin={handleJoinSession}
                    onCreate={handleCreateSession}
                    onQuickStart={handleQuickStart}
                    onSoloAdventure={handleSoloAdventure}
                    onSoloCustom={handleSoloCustom}
                    onJoinQuickStart={handleJoinQuickStart}
                    availableSessions={availableSessions}
                    loading={loading}
                />
            ) : !session.is_started ? (
                <SessionHub
                    players={players}
                    character={character}
                    session={session}
                    onToggleReady={handleToggleReady}
                    onStart={handleStartAdventure}
                    onLeave={handleLeaveSession}
                    loading={loading}
                />
            ) : !character?.class ? (
                <CharacterCreation
                    onCreate={handleCharacterCreate}
                    onBack={handleLeaveSession}
                    onQuickStart={handleCharacterQuickStart}
                    generateImage={generateImage}
                    sessionId={session.id}
                />
            ) : !adventureStarted ? (
                /* WAITING ROOM: Player has created character, waiting for all to be ready */
                <WaitingRoom
                    players={players}
                    character={character}
                    onToggleReady={handleToggleReady}
                    onStart={() => {
                        if (confirm("Forcer le lancement de l'aventure ?")) {
                            handleStartAdventure(true);
                        }
                    }}
                    onInvite={() => {
                        const url = window.location.origin + window.location.pathname + '?s=' + session.id;
                        navigator.clipboard.writeText(url);
                        showNotification("Lien d'invitation copié ! Partagez-le avec vos amis.", "success");
                    }}
                    loading={loading}
                    sessionId={session.id}
                    profile={profile}
                    sessionHostId={session.host_id}
                />
            ) : null}

            {character?.class && adventureStarted && (
                <main className="hud-layout">
                    <SceneBackground currentImage={sceneImage} />

                    <CharacterSheet
                        character={character}
                        onUpdateInventory={handleUpdateInventory}
                        onEquipItem={handleEquipItem}
                        onToggleSettings={() => setShowSettings(!showSettings)}
                        onConsume={handleConsumeItem}
                        onLevelUpClick={() => setShowLevelUp(true)}
                        onTradeClick={() => setShowTradeModal(true)}
                    />

                    <section className="hud-bottom glass-panel animate-fade-in">
                        <HUDHeader
                            gameTime={gameTime}
                            getTimeLabel={getTimeLabel}
                            tension={tension}
                            realTimeSync={realTimeSync}
                            onToggleRealTime={() => setRealTimeSync(!realTimeSync)}
                            onInvite={() => {
                                const url = window.location.origin + window.location.pathname + '?s=' + session.id;
                                navigator.clipboard.writeText(url);
                                showNotification("Lien d'invitation copief ! Partagez-le avec vos amis.", "success");
                            }}
                            onToggleHelper={() => setShowHelper(!showHelper)}
                            showHelper={showHelper}
                            onToggleCodex={() => setShowCodex(!showCodex)}
                            onToggleDMPanel={() => setShowDMPanel(!showDMPanel)}
                            onDebugCombat={handleDebugCombat}
                            connStatus={connStatus}
                            isGM={session && profile && session.gm_id === profile.id}
                            audioEnabled={audioEnabled}
                            onToggleAudio={() => setAudioEnabled(!audioEnabled)}
                            audioVolume={audioVolume}
                            onVolumeChange={setAudioVolume}
                        />

                        <NarrationPanel
                            messages={messages}
                            loading={loading}
                            chatRef={chatRef}
                            players={players}
                            character={character}
                            onSubmit={handleSubmit}
                            userMsg={userMsg}
                            handleInputTyping={handleInputTyping}
                            typingUsers={typingUsers}
                            onToggleReady={handleToggleReady}
                            combatMode={combatMode}
                        />
                    </section>
                </main>
            )}

            {
                combatMode && (
                    <CombatManager
                        arenaConfig={syncedCombatState?.arenaConfig || getArenaConfig()}
                        players={players}
                        currentUserId={character?.user_id || profile?.id}
                        initialEnemies={combatEnemies}
                        syncedCombatState={syncedCombatState}
                        onUpdateCombatState={updateSyncedCombat}
                        sessionId={session?.id}
                        onHPChange={handleHPChange}
                        onResourceChange={handleResourceChange}
                        onConsumeItem={handleConsumeItem}
                        onCombatEnd={async (result) => {
                            setCombatMode(false);
                            if (session.host_id === profile.id) {
                                supabase.from('world_state').upsert({ key: `combat_${session.id}`, value: { active: false } });
                            }

                            // Ask the GM to narrate the combat outcome
                            const defeatedNames = (result?.defeatedEnemies || combatEnemies || []).map(e => e.name).join(', ');
                            let outcome = result?.victory ? 'VICTOIRE' : 'DEFAITE';
                            if (result?.flight) outcome = 'FUITE';
                            if (result?.cancelled) return; // Silent close

                            const postCombatAction = '[SYSTEM] COMBAT TERMINE. Issue: ' + outcome
                                + (defeatedNames ? '. Ennemis vaincus: ' + defeatedNames : '')
                                + '. Decris l\'issue du combat et attribue les recompenses (XP, Loot) si victoire.';

                            try {
                                const { data: aiResponse } = await supabase.functions.invoke('game-master', {
                                    body: {
                                        action: postCombatAction,
                                        history: messages.slice(-5).map(m => ({ role: m.role, content: m.content })),
                                        sessionId: session.id,
                                        playerId: character?.id,
                                        playerProfile: {
                                            name: character.name,
                                            class: character.class,
                                            level: character.level,
                                            stats: character.stats,
                                            equippedItems: character.inventory?.filter(i => i.equipped).map(i => i.name) || [],
                                            backstory: character.backstory_gm_context,
                                        },
                                        lore: { context: WORLD_CONTEXT, bestiary: { ...BESTIARY, ...BESTIARY_EXTENDED }, classes: CLASSES, npcs: NPC_TEMPLATES, quests: QUEST_HOOKS, locations: TAVERNS_AND_LOCATIONS, rumors: RUMORS_AND_GOSSIP, encounters: RANDOM_ENCOUNTERS, factions: FACTION_LORE },
                                        playerGroup: players.map(p => ({ name: p.name, class: p.class }))
                                    }
                                });
                            } catch (e) { console.error('Post-combat narrative error:', e); }
                        }}
                        onGameOver={handleGameOver}
                        onRewards={handleCombatRewards}
                        onSFX={triggerSFX}
                        onLogAction={(m) => {
                            console.log("Combat Log:", m.content);
                        }}
                        onVFX={triggerVFX}
                    />
                )
            }

            <ParticleSystem vfx={activeVFX} />

            <div className={`vignette-layer vignette-combat ${combatMode && combatEnemies.length > 0 ? 'active' : ''}`} />
            <div className={`vignette-layer vignette-danger ${!combatMode && character?.hp && character?.max_hp > 0 && (character.hp / character.max_hp) < 0.3 ? 'active' : ''}`} />

            {
                activeMerchant && (
                    <MerchantModal
                        merchant={activeMerchant}
                        affinity={affinities[activeMerchant?.npcName] || 0}
                        playerGold={character?.gold || 0}
                        playerInventory={character?.inventory || []}
                        onBuy={(item) => {
                            triggerSFX('gold');
                            const newInventory = [...(character.inventory || []), { ...item, equipped: false }];
                            handleUpdateInventory(newInventory, (character.gold || 0) - item.price);
                            addMessage({
                                role: 'system',
                                content: `[ACHAT] ${character.name} a acheté ${item.name} pour ${item.price} Or.`,
                                timestamp: Date.now()
                            });
                        }}
                        onSell={(item, idx) => {
                            triggerSFX('gold');
                            const sellPrice = Math.floor((item.price || 50) * 0.5);
                            handleUpdateInventory(character.inventory.filter((_, i) => i !== idx), (character.gold || 0) + sellPrice);
                            addMessage({
                                role: 'system',
                                content: `[VENTE] ${character.name} a vendu ${item.name} pour ${sellPrice} Or.`,
                                timestamp: Date.now()
                            });
                        }}
                        onChat={(message, npcName) => {
                            handleNPCMessage(message, npcName);
                        }}
                        messages={npcConversations[activeMerchant?.npcName] || []}
                        loading={loading}
                        onClose={async () => {
                            const merchantName = activeMerchant?.npcName || 'le marchand';

                            // 1. Close locally first to prevent UI flicker
                            setActiveMerchant(null);

                            try {
                                // 2. Fetch current state to handle synchronization
                                const { data } = await supabase.from('world_state').select('value').eq('key', `merchant_${session.id}`).single();
                                const currentMerchant = data?.value;

                                if (currentMerchant && currentMerchant.active) {
                                    // 3. Remove self from visitors
                                    const currentVisitors = currentMerchant.visitors || [];
                                    const newVisitors = currentVisitors.filter(id => id !== character.id);

                                    if (newVisitors.length > 0) {
                                        // Others remain - just update the list
                                        await supabase.from('world_state').upsert({
                                            key: `merchant_${session.id}`,
                                            value: { ...currentMerchant, visitors: newVisitors }
                                        });
                                        // Optional: System message for leaving
                                        addMessage({
                                            role: 'system',
                                            content: `🚪 **${character.name}** quitte la boutique.`,
                                            timestamp: Date.now()
                                        });
                                    } else {
                                        // Last one out - Close shop and Trigger Narrative
                                        await supabase.from('world_state').upsert({
                                            key: `merchant_${session.id}`,
                                            value: { ...currentMerchant, active: false, visitors: [] }
                                        });

                                        // Trigger GM Narrative
                                        handleSubmit(null, `[FIN DE COMMERCE] Le groupe quitte ${merchantName}. Décris notre sortie.`);
                                    }
                                }
                            } catch (e) {
                                console.error("Merchant Close Error", e);
                            }
                        }}
                    />
                )
            }

            {
                activeLoot && (
                    <LootModal
                        loot={activeLoot}
                        onCollect={(items) => {
                            triggerSFX('gold');
                            const newInventory = [...(character.inventory || []), ...items.map(i => ({ ...i, equipped: false }))];
                            const newGold = (character.gold || 0) + (activeLoot.gold || 0);
                            handleUpdateInventory(newInventory, newGold);
                            setActiveLoot(null);
                        }}
                        onClose={() => setActiveLoot(null)}
                    />
                )
            }

            {
                activeNPC && (
                    <NPCDialogueModal
                        npc={activeNPC}
                        messages={npcConversations[activeNPC.name] || []}
                        onSendMessage={handleNPCMessage}
                        onClose={() => setActiveNPC(null)}
                        loading={loading}
                        voiceEnabled={voiceEnabled}
                        setVoiceEnabled={setVoiceEnabled}
                    />
                )
            }

            {
                showLevelUp && character && (
                    <LevelUpModal
                        character={character}
                        onSave={handleLevelUpSave}
                        onClose={() => setShowLevelUp(false)}
                    />
                )
            }

            {
                pendingTransaction && (
                    <TransactionPrompt
                        transaction={pendingTransaction}
                        playerGold={character?.gold || 0}
                        onConfirm={() => handleConfirmTransaction(true)}
                        onRefuse={() => handleConfirmTransaction(false)}
                    />
                )
            }

            {
                (showTradeModal || incomingTrade) && (
                    <TradeModal
                        isOpen={showTradeModal}
                        onClose={() => setShowTradeModal(false)}
                        currentPlayer={character}
                        players={players}
                        sessionId={session?.id}
                        incomingTrade={incomingTrade}
                        onIncomingTradeHandled={() => setIncomingTrade(null)}
                        pendingTradeResponse={pendingTradeResponse}
                        onPendingResponseHandled={() => setPendingTradeResponse(null)}
                        onTradeComplete={(trade) => {
                            triggerSFX('gold');
                            fetchSession();
                            addMessage({
                                role: 'system',
                                content: `[ÉCHANGE] Un échange a été effectué entre joueurs.`,
                                timestamp: Date.now()
                            });
                        }}
                    />
                )
            }

            <CombatDistanceModal
                pendingCombat={pendingCombat}
                onJoin={handleJoinCombat}
                onIgnore={() => setPendingCombat(null)}
            />

            {
                activeChallenge && (
                    <DiceChallengeModal
                        challenge={activeChallenge}
                        playerStats={character?.stats}
                        onResult={(res) => {
                            if (res.success) triggerSFX('levelUp'); // Use levelUp as a success sound
                            handleChallengeResult(res);
                        }}
                        onRollStart={() => triggerSFX('dice')}
                        onClose={() => setActiveChallenge(null)}
                    />
                )
            }

            {
                showSettings && (
                    <div className="settings-modal animate-fade-in" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--void-panel)', padding: '2rem', border: '1px solid var(--gold-primary)', zIndex: 2000 }}>
                        <h3 style={{ color: 'var(--gold-primary)', marginBottom: '1.5rem' }}>SANCTUAIRE</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '4px' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>MUSIQUE & AMBIANCE</span>
                                <button className="btn-secondary" onClick={() => {
                                    setAudioEnabled(!audioEnabled);
                                    if (!audioEnabled) initSpeech();
                                }}>{audioEnabled ? 'ON' : 'OFF'}</button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '4px' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>NARRATEUR VOCAL (PNJ)</span>
                                <button className="btn-secondary" onClick={() => {
                                    setVoiceEnabled(!voiceEnabled);
                                    if (!voiceEnabled) initSpeech();
                                }}>{voiceEnabled ? 'ON' : 'OFF'}</button>
                            </div>
                            <button className="btn-gold" style={{ background: 'rgba(255,255,255,0.1)', marginTop: '1rem' }} onClick={handleLeaveSession}>Quitter la Session</button>
                            <button className="btn-secondary" onClick={() => setShowSettings(false)}>Fermer</button>
                        </div>
                    </div>
                )
            }

            {
                showHelper && (
                    <GameHelperModal
                        messages={helperMessages}
                        onSendMessage={handleHelperMessage}
                        onClose={() => setShowHelper(false)}
                        loading={loading}
                    />
                )
            }

            <CodexPanel
                isOpen={showCodex}
                onClose={() => setShowCodex(false)}
            />

            <DMPanel
                isOpen={showDMPanel}
                onClose={() => setShowDMPanel(false)}
                gameState={{
                    location: session?.current_location || 'Zone Inconnue',
                    players: players.map(p => ({
                        class: p.class || 'Aventurier',
                        level: p.level || 1,
                        name: p.name,
                        user_id: p.user_id
                    })),
                    history: messages.filter(m => m.role === 'assistant' || m.role === 'narrage').slice(-10).map(m => m.content),
                    lore: {
                        context: WORLD_CONTEXT,
                        factions: FACTION_LORE,
                        npcs: NPC_TEMPLATES,
                        quests: QUEST_HOOKS,
                        locations: LOCATION_BACKGROUNDS,
                        rumors: RUMORS_AND_GOSSIP,
                        encounters: RANDOM_ENCOUNTERS,
                        bestiary: { ...BESTIARY, ...BESTIARY_EXTENDED },
                        legendaryItems: LEGENDARY_ITEMS,
                        myths: [...WORLD_MYTHS_AND_LEGENDS, ...WORLD_MYTHS_EXTENDED],
                        chronicle: chronicle,
                        classes: CLASSES
                    }
                }}
                onSpawnNPC={(npc) => {
                    // Ajouter NPC dans le chat narratif
                    addMessage({
                        role: 'narrage',
                        content: `**[NPC SPAWNED]** ${npc.name} apparaît.\n\n*${npc.appearance}*\n\n${npc.dialogue_samples[0]}`,
                        timestamp: Date.now()
                    });
                }}
                onTriggerCombat={(encounter) => {
                    // Déclencher combat généré
                    setCombatEnemies(encounter.enemies);
                    setCombatMode(true);
                    addMessage({
                        role: 'narrage',
                        content: `**[COMBAT IMPROVISÉ]**\n\n${encounter.terrain.ambient}\n\n${encounter.enemies.map(e => `- ${e.name} (HP ${e.hp}, AC ${e.ac})`).join('\n')}`,
                        timestamp: Date.now()
                    });
                }}
            />

            <AudioManager
                mood={getMood()}
                enabled={audioEnabled}
                volume={audioVolume}
                hour={gameTime.hour}
                sfx={lastSFX}
            />

            {/* Debug Panel for Combat Logs */}
            <DebugPanel onTestCombat={handleTestCombat} />
        </div>
    );
}

