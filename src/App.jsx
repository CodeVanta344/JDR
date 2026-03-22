import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { supabase } from './supabaseClient';
import { WORLD_CONTEXT, BESTIARY, LEVEL_THRESHOLDS, CLASSES, ENVIRONMENTAL_RULES, EQUIPMENT_RULES, NPC_TEMPLATES, IMPORTANT_NPCS, QUEST_HOOKS, TAVERNS_AND_LOCATIONS, RUMORS_AND_GOSSIP, RANDOM_ENCOUNTERS, BESTIARY_EXTENDED, WORLD_MYTHS_EXTENDED, LEGENDARY_ITEMS, WORLD_HISTORY, FACTION_LORE, WORLD_MYTHS_AND_LEGENDS, CULTURAL_LORE, LOCATION_BACKGROUNDS } from './lore';
import { initializeLoreSystem } from './lore';
import { preloadCommonData } from './lore/optimization';
import {
    LazyCombatManager as CombatManager,
    LazyCharacterSheet as CharacterSheet,
    LazyCodexPanel as CodexPanel,
    LazyDMPanel as DMPanel,
    LazyCharacterCreation as CharacterCreation,
    LazySessionLobby as SessionLobby,
    LazyMerchantModal as MerchantModal,
    LazyTradeModal as TradeModal,
    LazyDebugPanel as DebugPanel,
    LazyVoiceChatPanel as VoiceChatPanel,
} from './components/LazyComponents';
import { SessionHub } from './components/SessionHub';
import { GameModalProvider, alert as gameAlert } from './components/GameModals';
import { PartyHUD } from './components/PartyHUD';
import { PartyInfoPanel } from './components/PartyInfoPanel';
import { LootModal } from './components/LootModal';
import { NPCDialogueModal } from './components/NPCDialogueModal';
import { DiceChallengeModal } from './components/DiceChallengeModal';
import { CombatDistanceModal } from './components/CombatDistanceModal';
import { formatAIContent, calculateTotalStats, calculateMaxResource, resolvePlayerAbilities, generateArenaDecor, generateRandomCharacter, getArenaConfig } from './utils/gameUtils';
import { AudioManager } from './components/AudioManager';
import { GameHelperModal } from './components/GameHelperModal';
import { LevelUpModal } from './components/LevelUpModal';
import { TransactionPrompt } from './components/TransactionPrompt';
import { HUDHeader } from './components/HUD/HUDHeader';
import { NarrationPanel } from './components/HUD/NarrationPanel';
import { ItemSharePanel } from './components/HUD/ItemSharePanel';
import { useVoiceChat } from './hooks/useVoiceChat';
import WaitingRoom from './components/WaitingRoom';
import { WeatherOverlay } from './components/WeatherOverlay';
import { SceneBackground } from './components/SceneBackground';
import { ParticleSystem } from './components/ParticleSystem';
import { useGameState } from './hooks/useGameState';
import { useGameStore } from './store/gameStore';
import { useViewportScale } from './hooks/useViewportScale';
import { getPartyAverageLevel, scaleEnemyForPartyLevel } from './utils/combat-progression';
import { distanceToTurns, resolveJoinStatus, isImmediateJoin, buildDistancePrompt } from './managers/combatInit';
import * as sessionManager from './managers/sessionManager';
import { buildGameMasterPayload, isTrivialChallenge, isValidChallengeInput, resolveNextPhase } from './managers/messageManager';
import { checkProficiency, toggleEquipItem, computeConsumeEffect, buildItemSharePayload } from './managers/inventoryManager';
import { computeExperienceGain, applyStatBoosts, deduplicateAbilities } from './managers/progressionManager';
import { processAIResponse } from './managers/aiResponseProcessor';
import { isDuplicateNarrative } from './managers/narrativeDedup';
import { buildCombatEndHandler, buildMerchantCloseHandler, buildSaveGameHandler } from './managers/gameCallbacks';
import { generateLoot, calculateCombatXP } from './lore/loot-tables';
import { PWAUpdateNotification } from './components/PWAUpdateNotification';
import { useGMEngine } from './hooks/useGMEngine';

const LAZY_FALLBACK = <div style={{color:'#d4af37',textAlign:'center',padding:'2rem'}}>Chargement...</div>;

const STARTING_LOCKS = new Set();

// Route AI calls via Supabase ai_requests broker (VPS with Claude CLI)
// Falls back to edge function if broker fails
async function invokeGM(supabaseClient, body) {
    try {
        // 1. Insert request into ai_requests table
        const { data: request, error: insertError } = await supabaseClient
            .from('ai_requests')
            .insert({
                request_type: 'game-master',
                request_payload: body,
                status: 'pending',
            })
            .select()
            .single();

        if (insertError || !request) throw new Error(insertError?.message || 'Insert failed');

        // 2. Poll for response (max 30s)
        const startTime = Date.now();
        while (Date.now() - startTime < 30000) {
            await new Promise(r => setTimeout(r, 1500));
            const { data: updated } = await supabaseClient
                .from('ai_requests')
                .select('status, response_payload, error_message')
                .eq('id', request.id)
                .single();

            if (updated?.status === 'completed' && updated.response_payload) {
                return { data: updated.response_payload };
            }
            if (updated?.status === 'error') {
                throw new Error(updated.error_message || 'AI error');
            }
        }
        throw new Error('Timeout waiting for GM response');
    } catch (brokerError) {
        console.warn('[invokeGM] Broker failed, trying edge function:', brokerError.message);
        // Fallback to edge function
        return await supabaseClient.functions.invoke('game-master', { body });
    }
}

export default function App({ user }) {
    // Real-time viewport scaling
    const viewport = useViewportScale();

    // GM Engine - AI systems v2/v3/v4 (events, karma, economy, storytelling, world sim)
    const gmEngine = useGMEngine();
    
    // Profile derived from Supabase Auth user
    const profile = user ? { id: user.id, name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'Traveler' } : null;

    // === Zustand Store State ===
    const messages = useGameStore(state => state.messages);
    const setMessages = useGameStore(state => state.setMessages);
    const loading = useGameStore(state => state.loading);
    const setLoading = useGameStore(state => state.setLoading);
    const sceneImage = useGameStore(state => state.sceneImage);
    const setSceneImage = useGameStore(state => state.setSceneImage);
    const showSettings = useGameStore(state => state.showSettings);
    const setShowSettings = useGameStore(state => state.setShowSettings);
    const combatMode = useGameStore(state => state.combatMode);
    const setCombatMode = useGameStore(state => state.setCombatMode);
    const combatEnemies = useGameStore(state => state.combatEnemies);
    const setCombatEnemies = useGameStore(state => state.setCombatEnemies);
    const activeNPC = useGameStore(state => state.activeNPC);
    const setActiveNPC = useGameStore(state => state.setActiveNPC);
    const activeMerchant = useGameStore(state => state.activeMerchant);
    const setActiveMerchant = useGameStore(state => state.setActiveMerchant);
    const activeLoot = useGameStore(state => state.activeLoot);
    const setActiveLoot = useGameStore(state => state.setActiveLoot);
    const pendingCombat = useGameStore(state => state.pendingCombat);
    const setPendingCombat = useGameStore(state => state.setPendingCombat);
    const pendingTransaction = useGameStore(state => state.pendingTransaction);
    const setPendingTransaction = useGameStore(state => state.setPendingTransaction);
    const activeChallenge = useGameStore(state => state.activeChallenge);
    const setActiveChallenge = useGameStore(state => state.setActiveChallenge);
    const showLevelUp = useGameStore(state => state.showLevelUp);
    const setShowLevelUp = useGameStore(state => state.setShowLevelUp);
    const npcConversations = useGameStore(state => state.npcConversations);
    const setNpcConversations = useGameStore(state => state.setNpcConversations);
    const audioEnabled = useGameStore(state => state.audioEnabled);
    const setAudioEnabled = useGameStore(state => state.setAudioEnabled);
    const audioVolume = useGameStore(state => state.audioVolume);
    const setAudioVolume = useGameStore(state => state.setAudioVolume);
    const showCodex = useGameStore(state => state.showCodex);
    const setShowCodex = useGameStore(state => state.setShowCodex);
    const showDMPanel = useGameStore(state => state.showDMPanel);
    const setShowDMPanel = useGameStore(state => state.setShowDMPanel);
    const showHelper = useGameStore(state => state.showHelper);
    const setShowHelper = useGameStore(state => state.setShowHelper);
    const helperMessages = useGameStore(state => state.helperMessages);
    const setHelperMessages = useGameStore(state => state.setHelperMessages);
    const typingUsers = useGameStore(state => state.typingUsers);
    const setTypingUsers = useGameStore(state => state.setTypingUsers);
    const gamePhase = useGameStore(state => state.gamePhase);
    const setGamePhase = useGameStore(state => state.setGamePhase);
    const showTradeModal = useGameStore(state => state.showTradeModal);
    const setShowTradeModal = useGameStore(state => state.setShowTradeModal);
    const incomingTrade = useGameStore(state => state.incomingTrade);
    const setIncomingTrade = useGameStore(state => state.setIncomingTrade);
    const pendingTradeResponse = useGameStore(state => state.pendingTradeResponse);
    const setPendingTradeResponse = useGameStore(state => state.setPendingTradeResponse);
    const itemShares = useGameStore(state => state.itemShares);
    const setItemShares = useGameStore(state => state.setItemShares);
    const showItemSharePanel = useGameStore(state => state.showItemSharePanel);
    const setShowItemSharePanel = useGameStore(state => state.setShowItemSharePanel);

    // Local state (not prop-drilled, only used in App.jsx)
    const [userMsg, setUserMsg] = useState('');
    const [availableSessions, setAvailableSessions] = useState([]);

    // Memoize the close handler to prevent unnecessary re-renders
    const handleCloseItemSharePanel = useCallback(() => {
        console.log('[App] Closing ItemSharePanel');
        setShowItemSharePanel(false);
        // Vider les itemShares pour que le bouton disparaisse aussi
        setItemShares([]);
    }, []);

    const [savedGames, setSavedGames] = useState([]);

    // Fetch saved games on mount - FILTERED BY HOST (only show user's own saves)
    useEffect(() => {
        const fetchSavedGames = async () => {
            if (!profile?.id) return;
            
            const { data } = await supabase
                .from('world_state')
                .select('*')
                .like('key', 'save_%')
                .order('updated_at', { ascending: false })
                .limit(10);
            
            if (data) {
                // Filter to only show saves where current user is the host
                const games = data
                    .filter(save => save.value?.hostId === profile.id || save.value?.players?.[0]?.user_id === profile.id)
                    .map(save => ({
                        id: save.id,
                        sessionId: save.value?.sessionId || save.key.replace('save_', ''),
                        host_name: save.value?.players?.[0]?.name || 'MJ',
                        timestamp: save.value?.timestamp || save.updated_at,
                        playerCount: save.value?.players?.length || 0,
                        saveData: save.value
                    }));
                setSavedGames(games);
            }
        };
        fetchSavedGames();
    }, [profile?.id]);

    const handleLoadGame = async (sessionId) => {
        setLoading(true);
        try {
            const result = await sessionManager.loadGame(sessionId, profile, fetchSession);
            if (result) {
                setSession(result.session);
                if (result.savedPlayer) {
                    setCharacter(result.savedPlayer);
                    setPlayers(result.players);
                }
                setAdventureStarted(false);

                if (result.isSolo && result.session?.host_id === profile?.id) {
                    setTimeout(() => handleStartAdventure(true, result.session, result.players), 2000);
                }
                gameAlert('✅ Partie chargée ! En attente des coéquipiers...', 'Succès');
            } else {
                gameAlert('❌ Aucune sauvegarde trouvée', 'Erreur');
            }
        } catch (err) {
            console.error('Load error:', err);
            gameAlert('❌ Erreur lors du chargement', 'Erreur');
        } finally {
            setLoading(false);
        }
    };

    const handleJoinSession = async (sessionId) => {
        if (!profile?.id) return;
        setLoading(true);
        try {
            const { session: s } = await sessionManager.joinSession(sessionId);
            if (s) {
                setSession(s);
                gameAlert('Rejoint la session avec succès !', 'Succès');
            } else {
                gameAlert('Session non trouvée', 'Erreur');
            }
        } catch (err) {
            console.error('Join error:', err);
            gameAlert('Erreur lors de la connexion à la session', 'Erreur');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSession = async () => {
        if (!profile?.id) return;
        setLoading(true);
        try {
            const { session: s } = await sessionManager.createSession(profile);
            if (s) {
                setSession(s);
                gameAlert('Session créée avec succès !', 'Succès');
            }
        } catch (err) {
            console.error('Create error:', err);
            gameAlert('Erreur lors de la création de la session', 'Erreur');
        } finally {
            setLoading(false);
        }
    };

    const handleQuickStart = async () => {
        if (!profile?.id) return;
        setLoading(true);
        try {
            const { session: s, player } = await sessionManager.quickStartSession(profile);
            if (s) {
                setSession(s);
                setAdventureStarted(true);
                if (player) setCharacter(player);
                gameAlert('Partie rapide lancée !', 'Succès');
            }
        } catch (err) {
            console.error('Quick start error:', err);
            gameAlert('Erreur lors du démarrage rapide', 'Erreur');
        } finally {
            setLoading(false);
        }
    };

    const handleSoloAdventure = async () => {
        if (!profile?.id) return;
        setLoading(true);
        try {
            const { session: s, player } = await sessionManager.soloAdventure(profile);
            if (s) {
                setSession(s);
                if (player) setCharacter(player);
                gameAlert('Aventure solo créée !', 'Succès');
            }
        } catch (err) {
            console.error('Solo adventure error:', err);
            gameAlert('Erreur lors de la création de l\'aventure solo', 'Erreur');
        } finally {
            setLoading(false);
        }
    };

    const handleSoloCustom = async () => {
        if (!profile?.id) return;
        setLoading(true);
        try {
            const { session: s } = await sessionManager.soloCustomSession(profile);
            if (s) {
                setSession(s);
                gameAlert('Session solo créée ! Créez votre personnage.', 'Succès');
            }
        } catch (err) {
            console.error('Solo custom error:', err);
            gameAlert('Erreur lors de la création de la session', 'Erreur');
        } finally {
            setLoading(false);
        }
    };

    const handleJoinQuickStart = async () => {
        if (!profile?.id || availableSessions.length === 0) return;
        // Join the first available session
        const targetSession = availableSessions[0];
        await handleJoinSession(targetSession.id);
    };

    const handleLeaveSession = async () => {
        if (!session?.id) return;
        await sessionManager.leaveSession(session, profile);
        setSession(null);
        setCharacter(null);
        setMessages([]);
        setPlayers([]);
        setCombatMode(false);
        setAdventureStarted(false);
        setSavedGames([]);
        gameAlert('Vous avez quitté la session', 'Information');
    };

    const handleCharacterCreate = async (charData) => {
        if (!session?.id || !profile?.id || !character?.id) return;
        try {
            const { data, error } = await supabase.from('players').update({
                ...charData,
                is_ready: true
            }).eq('id', character.id).select().single();
            if (error) throw error;
            if (data) setCharacter(data);
        } catch (err) {
            console.error('Character create error:', err);
            gameAlert('Erreur lors de la création du personnage', 'Erreur');
        }
    };

    const handleCharacterQuickStart = async () => {
        if (!session?.id || !profile?.id || !character?.id) return;
        try {
            const randomChar = generateRandomCharacter(session.id, profile.id);
            const { data, error } = await supabase.from('players').update({
                ...randomChar,
                id: character.id,
                session_id: session.id,
                user_id: profile.id,
                is_ready: true
            }).eq('id', character.id).select().single();
            if (error) throw error;
            if (data) setCharacter(data);
        } catch (err) {
            console.error('Quick start character error:', err);
            gameAlert('Erreur lors de la création rapide', 'Erreur');
        }
    };

    const handleKickPlayer = async (playerId) => {
        if (!session?.id) return;
        try {
            await supabase.from('players').delete().eq('id', playerId).eq('session_id', session.id);
            setPlayers(prev => prev.filter(p => p.id !== playerId));
            gameAlert('Joueur expulsé', 'Information');
        } catch (err) {
            console.error('Kick error:', err);
        }
    };

    const handleToggleReady = async () => {
        if (!character?.id) return;
        const { is_ready } = await sessionManager.toggleReady(character);
        setCharacter(prev => ({ ...prev, is_ready }));
    };

    const handleStartAdventure = async (force = false, customSession = null, customPlayers = null) => {
        const currentSession = customSession || session;
        const currentPlayers = customPlayers || players;
        
        if (!currentSession?.id) return;
        if (currentSession.host_id !== profile?.id && !force) {
            gameAlert('Seul le Maître du Jeu peut démarrer l\'aventure', 'Erreur');
            return;
        }
        
        // Check if all players are ready
        const allReady = currentPlayers.every(p => p.is_ready);
        if (!allReady && !force) {
            gameAlert('Tous les joueurs doivent être prêts', 'Information');
            return;
        }
        
        setLoading(true);
        try {
            // Mark session as started
            await supabase.from('sessions').update({ is_started: true }).eq('id', currentSession.id);
            
            // Insert start marker message (ignore errors for duplicates)
            try {
                await supabase.from('messages').insert({
                    session_id: currentSession.id,
                    role: 'system',
                    content: "(MEMOIRE:SYSTEM) START_ADVENTURE_TRIGGERED"
                });
            } catch (_) { /* ignore duplicate */ }
            
            setAdventureStarted(true);
            
            // Trigger GM intro if host
            if (currentSession.host_id === profile?.id || !customSession) {
                try {
                    const playerNames = currentPlayers.map(p => `${p.name} (${p.class || 'Aventurier'})`).join(', ');
                    const introPrompt = `(SYSTEM) La partie commence. Présente-toi en tant que Maître du Jeu des Chroniques d'Aethelgard. Décris l'ambiance de la scène d'ouverture au Sanglier Doré, une taverne chaleureuse de Sol-Aureus. Le personnage du joueur (${playerNames}) vient d'arriver en ville. Sois immersif, atmosphérique, et termine par une question ou une situation qui invite le joueur à agir. Maximum 3 paragraphes.`;
                    const { data: aiResponse } = await invokeGM(supabase, {
                            action: introPrompt,
                            history: [],
                            sessionId: currentSession.id,
                            playerId: character?.id,
                            context: "GAME_START",
                            gamePhase: "INTRO",
                            playerProfile: character ? {
                                name: character.name,
                                class: character.class,
                                level: character.level,
                                stats: character.stats,
                                backstory: character.backstory_gm_context
                            } : null,
                            playerGroup: currentPlayers.map(p => ({
                                name: p.name,
                                class: p.class || 'Aventurier'
                            })),
                            lore: {
                                context: `${WORLD_CONTEXT}\n\n${ENVIRONMENTAL_RULES}`,
                                locations: TAVERNS_AND_LOCATIONS,
                                npcs: NPC_TEMPLATES,
                                rumors: RUMORS_AND_GOSSIP
                            }
                        }
                    });

                    const narrativeText = aiResponse?.narrative || formatAIContent(aiResponse);
                    if (narrativeText && typeof narrativeText === 'string' && narrativeText.trim()) {
                        const gmMsg = {
                            id: crypto.randomUUID(),
                            session_id: currentSession.id,
                            role: 'assistant',
                            content: narrativeText,
                            created_at: new Date().toISOString()
                        };
                        await supabase.from('messages').insert(gmMsg);
                        setMessages(prev => [...prev, gmMsg]);
                    }
                } catch (e) {
                    console.error('GM intro error:', e);
                }
            }
        } catch (err) {
            console.error('Start error:', err);
            gameAlert('Erreur lors du démarrage de l\'aventure', 'Erreur');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSession = async (sessionId) => {
        if (!profile?.id) return;
        try {
            await sessionManager.deleteSession(sessionId);
            setAvailableSessions(prev => prev.filter(s => s.id !== sessionId));
            gameAlert('Session supprimée avec succès', 'Succès');
        } catch (err) {
            console.error('Delete session error:', err);
            gameAlert('Erreur lors de la suppression de la session', 'Erreur');
        }
    };

    const handleDeleteSave = async (saveId) => {
        if (!profile?.id) return;
        try {
            await sessionManager.deleteSave(saveId);
            setSavedGames(prev => prev.filter(s => s.id !== saveId));
            gameAlert('Sauvegarde supprimée avec succès', 'Succès');
        } catch (err) {
            console.error('Delete save error:', err);
            gameAlert('Erreur lors de la suppression de la sauvegarde', 'Erreur');
        }
    };


    const _pollInterval = useRef(null);
    const typingTimeoutRef = useRef(null);
    const creatingPlayerRef = useRef(false);
    const chatRef = useRef(null);
    const characterIdRef = useRef(null);
    const lastActivityRef = useRef(Date.now());
    const hasFledRef = useRef(false);

    const lastSFX = useGameStore(state => state.lastSFX);
    const setLastSFX = useGameStore(state => state.setLastSFX);
    const activeVFX = useGameStore(state => state.activeVFX);
    const setActiveVFX = useGameStore(state => state.setActiveVFX);
    const adventureStarted = useGameStore(state => state.adventureStarted);
    const setAdventureStarted = useGameStore(state => state.setAdventureStarted);

    // Integrated Game State Hook - DOIT être avant useVoiceChat
    const {
        session, setSession,
        character, setCharacter,
        players, setPlayers,
        setOnlineUsers,
        connStatus, setConnStatus,
        affinities, setAffinities,
        titles, setTitles,
        gameTime,
        syncedCombatState, setSyncedCombatState,
        fetchSession,
        fetchWorldState,
        fetchPlayerExtras: _fetchPlayerExtras,
        handleHPChange,
        handleResourceChange,
        handleConsumeItem: _handleConsumeItem,
        chronicle,
        addToChronicle,
        resetChronicle,
        resetGameTime,
        weather, setWeather,
        fetchAvailableSessions
    } = useGameState(profile);

    const getTimeLabel = useCallback(() => {
        const h = gameTime?.hour ?? 12;
        if (h >= 5 && h < 7) return 'Aube';
        if (h >= 7 && h < 12) return 'Matin';
        if (h >= 12 && h < 14) return 'Midi';
        if (h >= 14 && h < 17) return 'Après-midi';
        if (h >= 17 && h < 20) return 'Crépuscule';
        if (h >= 20 && h < 23) return 'Soir';
        return 'Nuit';
    }, [gameTime?.hour]);

    // Voice Chat Hook - doit être après useGameState pour avoir accès à session
    const {
        isMuted: voiceMuted,
        isTalking: voiceTalking,
        isPushToTalk,
        pushToTalkKey,
        speakers,
        toggleMute: toggleVoiceMute,
        togglePushToTalk,
        changePushToTalkKey
    } = useVoiceChat(
        session?.id,
        profile?.id,
        character?.name
    );

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
                } catch {
                    void 0;
                }
            }

            const npcKey = `jdr_npcs_${session.id}_${character.id}`;
            const npcSaved = localStorage.getItem(npcKey);
            if (npcSaved) {
                try {
                    const parsed = JSON.parse(npcSaved);
                    if (typeof parsed === 'object') setNpcConversations(parsed);
                } catch {
                    void 0;
                }
            }
        }
    }, [session?.id, character?.id, fetchSession]);

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

    const isFetchingRef = useRef(false);
    const lastMessageIdsRef = useRef(new Set());
    
    const fetchData = React.useCallback(async () => {
        if (!session?.id || isFetchingRef.current) return;
        isFetchingRef.current = true;
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
            
            // Merge with existing messages to prevent losing optimistic updates
            setMessages(prev => {
                const existingIds = new Set(prev.map(m => m.id));
                const dbIds = new Set(filteredMsgs.map(m => m.id));
                
                // Keep messages from DB that we don't have
                const newFromDb = filteredMsgs.filter(m => !existingIds.has(m.id));
                
                // Keep local messages that aren't in DB yet (optimistic updates)
                const localOnly = prev.filter(m => !dbIds.has(m.id) && m.role !== 'temp');
                
                // Merge and sort by created_at
                const merged = [...filteredMsgs, ...localOnly];
                
                // Deduplicate by content similarity (for MJ messages that might have different IDs)
                const uniqueMsgs = [];
                const seenContents = new Set();
                
                for (const msg of merged) {
                    // For assistant/system messages, check content similarity
                    if (msg.role === 'assistant' || msg.role === 'system') {
                        const normalized = msg.content?.toLowerCase().trim().substring(0, 100);
                        if (normalized && seenContents.has(normalized)) {
                            console.log('[DEDUP] Skipping duplicate message by content:', normalized.substring(0, 50));
                            continue;
                        }
                        if (normalized) seenContents.add(normalized);
                    }
                    uniqueMsgs.push(msg);
                }
                
                return uniqueMsgs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            });
            
            const lastImg = [...(msgData || [])].reverse().find(m => m.role === 'image');
            if (lastImg) setSceneImage(lastImg.content);

            const { data: pData } = await supabase.from('players').select('*').eq('session_id', session.id);
            setPlayers(pData || []);
            const pc = pData?.find(p => p.user_id === profile?.id);
            if (pc) {
                // Only update if data actually changed to prevent render loops
                const hasChanged = JSON.stringify(pc) !== JSON.stringify(character);
                if (hasChanged) {
                    console.log("[fetchData] Player data changed, updating state.");
                    setCharacter(pc);
                }
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            isFetchingRef.current = false;
        }
    }, [session?.id, profile?.id, character, setWeather, setSession, setAdventureStarted, setMessages, setSceneImage, setPlayers, setCharacter]);

    // Re-fetch everything when adventure officially starts
    useEffect(() => {
        if (adventureStarted) {
            console.log("[App] Adventure started, performing initial fetch...");
            fetchData();
        }
    }, [adventureStarted, fetchData]); // Run only when starting

    // --- TRADE CHANNEL (broadcast) ---
    useEffect(() => {
        if (!session?.id || !adventureStarted || !character?.id) return;

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
    }, [session?.id, character?.id, fetchSession]);

    // --- REALTIME: messages, players, sessions via postgres_changes ---
    useEffect(() => {
        if (!session?.id) return;

        const channel = supabase.channel(`realtime-session-${session.id}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'messages',
                filter: `session_id=eq.${session.id}`
            }, (payload) => {
                console.log('[Realtime] messages event:', payload.eventType);
                if (payload.eventType === 'INSERT') {
                    const msg = payload.new;
                    // Skip memory-only messages (same filter as fetchData)
                    if (msg.content?.startsWith('(MÉMOIRE:') && !msg.content.includes("START_ADVENTURE_TRIGGERED")) return;
                    // Check for adventure start marker
                    if (msg.content?.includes("START_ADVENTURE_TRIGGERED")) {
                        setAdventureStarted(true);
                    }
                    setMessages(prev => {
                        if (prev.some(m => m.id === msg.id)) return prev;
                        // Deduplicate by content similarity for assistant/system messages
                        if (msg.role === 'assistant' || msg.role === 'system') {
                            const normalized = msg.content?.toLowerCase().trim().substring(0, 100);
                            if (normalized && prev.some(m =>
                                (m.role === 'assistant' || m.role === 'system') &&
                                m.content?.toLowerCase().trim().substring(0, 100) === normalized
                            )) {
                                console.log('[Realtime DEDUP] Skipping duplicate message');
                                return prev;
                            }
                        }
                        return [...prev, msg].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                    });
                    // Update scene image if it's an image message
                    if (msg.role === 'image') {
                        setSceneImage(msg.content);
                    }
                } else if (payload.eventType === 'DELETE') {
                    setMessages(prev => prev.filter(m => m.id !== payload.old.id));
                }
            })
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'players',
                filter: `session_id=eq.${session.id}`
            }, (payload) => {
                console.log('[Realtime] players event:', payload.eventType);
                if (payload.eventType === 'INSERT') {
                    setPlayers(prev => {
                        if (prev.some(p => p.id === payload.new.id)) return prev;
                        return [...prev, payload.new];
                    });
                    if (payload.new.user_id === profile?.id) {
                        setCharacter(payload.new);
                    }
                } else if (payload.eventType === 'UPDATE') {
                    setPlayers(prev => prev.map(p => p.id === payload.new.id ? payload.new : p));
                    if (payload.new.user_id === profile?.id) {
                        setCharacter(prev => {
                            if (JSON.stringify(prev) !== JSON.stringify(payload.new)) return payload.new;
                            return prev;
                        });
                    }
                } else if (payload.eventType === 'DELETE') {
                    setPlayers(prev => prev.filter(p => p.id !== payload.old.id));
                }
            })
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'sessions',
                filter: `id=eq.${session.id}`
            }, (payload) => {
                console.log('[Realtime] session updated');
                setSession(prev => {
                    if (!prev) return payload.new;
                    if (JSON.stringify(prev) !== JSON.stringify(payload.new)) return payload.new;
                    return prev;
                });
            })
            .subscribe((status, err) => {
                if (status === 'SUBSCRIBED') {
                    console.log('[Realtime] Subscribed to session channel');
                } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                    console.error('[Realtime] Subscription error:', status, err);
                }
            });

        // Initial fetch to populate state
        fetchData();

        // Fallback polling: if Realtime fails, poll players every 3s
        const pollInterval = setInterval(async () => {
            if (!session?.id) return;
            const { data: freshPlayers } = await supabase
                .from('players')
                .select('*')
                .eq('session_id', session.id);
            if (freshPlayers && freshPlayers.length > 0) {
                setPlayers(prev => {
                    if (JSON.stringify(prev) === JSON.stringify(freshPlayers)) return prev;
                    return freshPlayers;
                });
                // Update own character
                const me = freshPlayers.find(p => p.user_id === profile?.id);
                if (me) {
                    setCharacter(prev => {
                        if (JSON.stringify(prev) === JSON.stringify(me)) return prev;
                        return me;
                    });
                }
            }
        }, 3000);

        return () => {
            supabase.removeChannel(channel);
            clearInterval(pollInterval);
        };
    }, [session?.id, profile?.id, fetchData, setSession, setAdventureStarted]);

    // --- TYPING STATUS (light poll every 5s) ---
    const lastTypingUpdateRef = useRef(0);
    
    // Update typing status in DB when user types
    const updateTypingStatus = async (isTyping) => {
        if (!session?.id || !character?.id) return;
        
        const now = Date.now();
        // Throttle updates to every 500ms
        if (now - lastTypingUpdateRef.current < 500) return;
        lastTypingUpdateRef.current = now;
        
        const key = `typing_${session.id}_${character.id}`;
        const value = isTyping ? {
            name: character.name,
            timestamp: now
        } : null;
        
        await supabase.from('world_state').upsert({
            key,
            value,
            updated_at: new Date().toISOString()
        });
    };
    
    // Poll for other players' typing status (light poll - 5s)
    useEffect(() => {
        if (!session?.id || !players?.length) return;
        
        const pollTypingStatus = async () => {
            const now = Date.now();
            const activeTypers = [];
            
            for (const player of players) {
                if (player.id === character?.id) continue; // Skip self
                
                const { data } = await supabase
                    .from('world_state')
                    .select('value, updated_at')
                    .eq('key', `typing_${session.id}_${player.id}`)
                    .maybeSingle();
                
                if (data?.value && data.value.name) {
                    const timestamp = data.value.timestamp || new Date(data.updated_at).getTime();
                    // Consider typing if updated in last 6 seconds (wider window for 5s poll)
                    if (now - timestamp < 6000) {
                        activeTypers.push(data.value.name);
                    }
                }
            }
            
            setTypingUsers(activeTypers);
        };
        
        const interval = setInterval(pollTypingStatus, 5000);
        return () => clearInterval(interval);
    }, [session?.id, players, character?.id]);

    // --- ITEM SHARES (light poll - 5s) ---
    useEffect(() => {
        if (!session?.id) return;
        
        const pollItemShares = async () => {
            const { data } = await supabase
                .from('world_state')
                .select('value')
                .eq('key', `item_shares_${session.id}`)
                .maybeSingle();
            
            if (data?.value && Array.isArray(data.value)) {
                setItemShares(data.value);
            }
        };
        
        // Poll immediately and then every 5 seconds
        pollItemShares();
        const interval = setInterval(pollItemShares, 5000);
        return () => clearInterval(interval);
    }, [session?.id]);

    // --- AUTO-CREATE LOBBY PLAYER ---
    useEffect(() => {
        if (session && profile && !character && !loading && !creatingPlayerRef.current) {
            creatingPlayerRef.current = true;
            
            // CRITICAL FIX: Check if we're currently loading a saved game
            // In that case, the players are being restored via upsert in handleLoadGame
            // and we should wait for that to complete instead of creating a new player
            const isLoadingSave = sessionStorage.getItem('loading_save_' + session.id);
            if (isLoadingSave) {
                // Wait a bit for the save to be fully loaded, then check DB
                setTimeout(() => {
                    supabase.from('players').select('*').eq('session_id', session.id).eq('user_id', profile.id).maybeSingle()
                        .then(({ data: existing }) => {
                            if (existing) {
                                setCharacter(existing);
                            }
                            creatingPlayerRef.current = false;
                            sessionStorage.removeItem('loading_save_' + session.id);
                        }).catch(() => {
                            creatingPlayerRef.current = false;
                            sessionStorage.removeItem('loading_save_' + session.id);
                        });
                }, 500);
                return;
            }
            
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
    }, [session, profile, character, loading, setCharacter]);

    // --- AUTO-RANDOMIZE FOR QUICK JOIN ---
    useEffect(() => {
        if (character && window.pendingQuickStart && !loading) {
            window.pendingQuickStart = false; // Consume flag
            handleCharacterQuickStart();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        PETITE_CHAMBRE: { blocksX: 20, blocksY: 20, shapeType: 'HALL' },
        GRANDE_SALLE: { blocksX: 20, blocksY: 20, shapeType: 'HALL' },
        HALL_MAJESTUEUX: { blocksX: 20, blocksY: 20, shapeType: 'HALL' },
        COULOIR_ETROIT: { blocksX: 20, blocksY: 20, shapeType: 'CORRIDOR' },
        TUNNEL_LONG: { blocksX: 20, blocksY: 20, shapeType: 'CORRIDOR' },
        PONT_PIERRE: { blocksX: 20, blocksY: 20, shapeType: 'BRIDGE' },
        PASSERELLE: { blocksX: 20, blocksY: 20, shapeType: 'BRIDGE' },
        ARENE_CIRCULAIRE: { blocksX: 20, blocksY: 20, shapeType: 'CIRCULAR' },
        PUITS: { blocksX: 20, blocksY: 20, shapeType: 'CIRCULAR' },
        SALLE_TRONE: { blocksX: 20, blocksY: 20, shapeType: 'HALL' },
        CRYPTE: { blocksX: 20, blocksY: 20, shapeType: 'HALL' },
        BALCON: { blocksX: 20, blocksY: 20, shapeType: 'BRIDGE_H' },
        FALAISE: { blocksX: 20, blocksY: 20, shapeType: 'BRIDGE_H' },
        RUE: { blocksX: 20, blocksY: 20, shapeType: 'STANDARD' },
        PLACE: { blocksX: 20, blocksY: 20, shapeType: 'CIRCULAR' },
        CACHOT: { blocksX: 20, blocksY: 20, shapeType: 'HALL' },
        LABORATOIRE: { blocksX: 20, blocksY: 20, shapeType: 'STANDARD' },
        TEMPLE: { blocksX: 20, blocksY: 20, shapeType: 'STANDARD' },
        CARREFOUR: { blocksX: 20, blocksY: 20, shapeType: 'STANDARD' },
        VESTIBULE: { blocksX: 20, blocksY: 20, shapeType: 'STANDARD' }
    };

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
    }, [session, adventureStarted, setSession]);

    // Effect: Listen for session deactivation/deletion (host left) and disconnect clients
    useEffect(() => {
        if (!session?.id) return;

        const channel = supabase.channel('session_active_sync')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'sessions', filter: `id=eq.${session.id}` },
                (payload) => {
                    if (payload.new && payload.new.active === false) {
                        console.log("SESSION DEACTIVATED - Host left, disconnecting...");
                        gameAlert("Le Maître du Jeu a quitté la partie. La session se termine.", 'Information');
                        // Force disconnect - clear all session state
                        setSession(null);
                        setCharacter(null);
                        setMessages([]);
                        setPlayers([]);
                        setCombatMode(false);
                        setAdventureStarted(false);
                        window.history.pushState({}, '', window.location.pathname);
                    }
                }
            )
            .on(
                'postgres_changes',
                { event: 'DELETE', schema: 'public', table: 'sessions', filter: `id=eq.${session.id}` },
                (payload) => {
                    console.log("SESSION DELETED - Host left, disconnecting...");
                    gameAlert("Le Maître du Jeu a quitté la partie. La session se termine.", 'Information');
                    // Force disconnect - clear all session state
                    setSession(null);
                    setCharacter(null);
                    setMessages([]);
                    setPlayers([]);
                    setCombatMode(false);
                    setAdventureStarted(false);
                    window.history.pushState({}, '', window.location.pathname);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [session?.id]);

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

    const handleUpdateMaterialInventory = async (newMaterialInventory) => {
        console.log('[MaterialInventory] Updating:', newMaterialInventory);
        if (!character?.id) {
            console.log('[MaterialInventory] No character ID');
            return;
        }
        const { data, error } = await supabase.from('players').update({
            material_inventory: newMaterialInventory
        }).eq('id', character.id).select().single();
        
        if (error) {
            console.error('[MaterialInventory] Error:', error);
        }
        if (data) {
            console.log('[MaterialInventory] Success:', data);
            setCharacter(data);
        }
    };

    const handleEquipItem = async (index) => {
        if (!character?.inventory) return;
        const item = character.inventory[index];
        if (!item) return;

        // Proficiency gate (only when equipping)
        if (!item.equipped) {
            const { canEquip, reason } = checkProficiency(character.class, item);
            if (!canEquip) { gameAlert(reason, 'Information'); return; }
        }

        const newInventory = toggleEquipItem(character.inventory, index);
        handleUpdateInventory(newInventory);
    };

    const handleExperienceGain = async (amount, reason) => {
        if (!character?.id || !amount) return;
        const result = computeExperienceGain(character, amount, reason);

        // System messages
        result.systemMessages.forEach(content => {
            setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'system', content }]);
        });

        if (result.leveledUp) {
            await supabase.from('players').update({
                xp: result.newXp,
                level: result.newLevel,
                max_hp: result.newMaxHp,
                hp: result.newHp,
                spells: result.newSpells,
                attribute_points: result.attributePoints
            }).eq('id', character.id);
            setShowLevelUp(true);
        } else {
            await supabase.from('players').update({ xp: result.newXp }).eq('id', character.id);
            setCharacter(prev => ({ ...prev, xp: result.newXp }));
        }
    };

    // ─── Combat Rewards (loot tables + XP) ────────────────────────────────
    const handleCombatRewards = useCallback(async (defeatedEnemies) => {
        if (!character?.id || !defeatedEnemies?.length) return;

        // Generate loot from deterministic tables
        const enemies = defeatedEnemies.map(e => ({
            cr: e.cr || e.challenge_rating || 1,
            name: e.name || 'Ennemi'
        }));
        const loot = generateLoot(enemies);

        // Add gold via Supabase
        const newGold = (character.gold || 0) + loot.gold;
        await supabase.from('players').update({ gold: newGold }).eq('id', character.id);
        setCharacter(prev => ({ ...prev, gold: newGold }));

        // Calculate and award XP (CR x 50 per enemy)
        const xpGained = calculateCombatXP(enemies);
        if (xpGained > 0) {
            await handleExperienceGain(xpGained, `Victoire contre ${enemies.map(e => e.name).join(', ')}`);
        }

        // Show loot modal if there are items or gold
        if (loot.gold > 0 || loot.items.length > 0) {
            setActiveLoot({
                gold: loot.gold,
                items: loot.items,
                source: enemies.map(e => e.name).join(', ')
            });
        }
    }, [character, handleExperienceGain, setActiveLoot]);

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
        }
    };

    const _handleGMInitiative = async (isStagnation = false) => {
        if (!session || !character || loading || combatMode) return;
        setLoading(true);

        try {
            const { data: aiResponse } = await invokeGM(supabase, {
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
                // Process all side-effects (weather, events, rewards, combat, etc.)
                processAIResponse(aiResponse, {
                    setWeather,
                    addToChronicle,
                    addSystemMessage: (text) => setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'system', content: text, created_at: new Date().toISOString() }]),
                    handleExperienceGain,
                    initializeHostCombat,
                    isHost: session?.host_id === profile?.id,
                    syncWeather: async (w) => { await supabase.from('world_state').upsert({ key: 'weather', value: w }); },
                });

                // Add the narrative to the chat
                const narrative = aiResponse.narrative || formatAIContent(aiResponse);
                if (isDuplicateNarrative(messages, narrative, { count: 3, threshold: 0.7 })) return;
                
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

    const handleTestCombat = () => {
        // Test combat function for DebugPanel
        console.log('[Test Combat] Initializing test combat...');
        const testEnemies = [
            { name: 'Gobelin Test', hp: 30, maxHp: 30, level: 1, stats: { str: 10, dex: 12, con: 10 } }
        ];
        setCombatEnemies(testEnemies);
        setCombatMode(true);
    };

    const handleChallengeResult = async (result) => {
        const challengeToRef = activeChallenge;
        setActiveChallenge(null);

        if (!challengeToRef) return;

        // Marquer les anciens messages de preview comme complétés
        setMessages(prev => prev.map(m => {
            if (m.role === 'system' && m.content?.includes('Cliquez sur le bouton ci-dessus pour lancer les dés')) {
                return { ...m, completed: true };
            }
            return m;
        }));

        // Créer message avec animation 3D du dé
        const diceRollData = {
            type: 'dice_roll',
            diceType: result.dice,
            result: result.natural,
            modifier: result.modifier,
            total: result.total,
            target: result.dc,
            action: challengeToRef.label || 'Test de compétence',
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
                id: diceMessage.id,
                session_id: session.id,
                role: 'system',
                content: diceMessage.content
            });
            if (error) console.error('Error saving dice roll message:', error);
        }

        // Continue story immediately with consequence narration based on the roll outcome.
        try {
            const outcomeLabel =
                result.outcome === 'CRITICAL_SUCCESS' ? 'réussite critique' :
                    result.outcome === 'CRITICAL_FAILURE' ? 'échec critique' :
                        result.outcome === 'SUCCESS' ? 'succès' : 'échec';

            const { data: aiResponse } = await invokeGM(supabase, {
                    action: `Résous la conséquence narrative de ce test et fais avancer l'histoire.
Action tentée: ${challengeToRef.label}
Stat: ${result.stat}
DC: ${result.dc}
Jet brut: ${result.natural}
Jet converti d100: ${result.naturalConverted ?? result.natural}
Modificateur: ${result.modifier}
Total: ${result.total}
Issue: ${outcomeLabel}

Consigne: décris le résultat concret dans la fiction et propose la suite immédiate. N'écris pas une remontrance générique répétée.`,
                    history: [...messages.slice(-12), diceMessage]
                        .filter(m => !m.content?.startsWith?.('(MÉMOIRE:'))
                        .map(m => ({ role: m.role, content: m.content })),
                    sessionId: session?.id,
                    playerId: character?.id,
                    gamePhase,
                    context: 'CHALLENGE_RESOLUTION',
                    gameTime,
                    timeLabel: getTimeLabel(),
                    weather,
                    playerProfile: {
                        name: character?.name,
                        class: character?.class,
                        level: character?.level,
                        stats: character?.stats,
                        inventory: character?.inventory,
                        backstory: character?.backstory_gm_context
                    },
                    codex_data: {
                        visited_npcs: character?.visited_npcs || [],
                        discovered_locations: character?.discovered_locations || [],
                        active_quests: character?.active_quests || [],
                        discovered_secrets: character?.discovered_secrets || [],
                        important_events: character?.important_events || [],
                        discovered_visuals: character?.discovered_visuals || []
                    },
                    lore: {
                        context: `${WORLD_CONTEXT}\n\n${ENVIRONMENTAL_RULES}`,
                        bestiary: { ...BESTIARY, ...BESTIARY_EXTENDED },
                        classes: CLASSES,
                        chronicle,
                        npcs: NPC_TEMPLATES,
                        quests: QUEST_HOOKS,
                        locations: TAVERNS_AND_LOCATIONS,
                        rumors: RUMORS_AND_GOSSIP,
                        encounters: RANDOM_ENCOUNTERS,
                        myths: WORLD_MYTHS_EXTENDED,
                        legendaryItems: LEGENDARY_ITEMS,
                        factions: FACTION_LORE
                    }
                }
            });

            if (aiResponse) {
                const narrative = aiResponse.narrative || formatAIContent(aiResponse);
                if (isDuplicateNarrative(messages, narrative)) return;
                
                const gmMsg = {
                    id: crypto.randomUUID(),
                    session_id: session?.id,
                    role: 'assistant',
                    content: narrative,
                    created_at: new Date().toISOString()
                };

                setMessages(prev => [...prev, gmMsg]);

                if (session?.id) {
                    await supabase.from('messages').insert({
                        id: gmMsg.id,
                        session_id: session.id,
                        role: 'assistant',
                        content: gmMsg.content,
                        player_id: character?.id
                    });
                }

                // Process side-effects (rewards, combat, etc.)
                processAIResponse(aiResponse, {
                    setWeather,
                    addToChronicle,
                    addSystemMessage: (text) => setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'system', content: text, created_at: new Date().toISOString() }]),
                    handleExperienceGain,
                    initializeHostCombat,
                    isHost: session?.host_id === profile?.id,
                    syncWeather: async (w) => { await supabase.from('world_state').upsert({ key: 'weather', value: w }); },
                });

                if (aiResponse.challenge) {
                    // Vérifier que ce n'est pas le même challenge qui revient (doublon)
                    const newChallenge = aiResponse.challenge;
                    const isDup = challengeToRef && 
                        newChallenge.label === challengeToRef.label && 
                        newChallenge.stat === challengeToRef.stat &&
                        newChallenge.dc === challengeToRef.dc;
                    
                    if (!isDup) {
                        setActiveChallenge(newChallenge);
                    } else {
                        console.log('[Challenge] Doublon détecté, ignoré:', newChallenge.label);
                    }
                }
            }
        } catch (err) {
            console.error('Error resolving challenge consequence:', err);
        }
    };

    const handleUnlockAbility = async (abilities) => {
        if (!character || !abilities?.length) return;
        const { updatedSpells, newAbilities } = deduplicateAbilities(character.spells, abilities);
        if (newAbilities.length === 0) return;

        const { data } = await supabase.from('players').update({ spells: updatedSpells }).eq('id', character.id).select().single();
        if (data) setCharacter(data);

        newAbilities.forEach(name => {
            setMessages(prev => [...prev, {
                id: crypto.randomUUID(), role: 'system',
                content: `🔓 **NOUVELLE APTITUDE !**\nVous avez appris : **${name}**\n*Retrouvez-la dans votre onglet Aptitudes.*`
            }]);
        });
    };

    const handleUpdateStats = async (statBoosts) => {
        if (!character || !statBoosts) return;
        const { changed, newStats, message } = applyStatBoosts(character.stats, statBoosts);
        if (!changed) return;

        // Recalculate derived values
        const tempChar = { ...character, stats: newStats };
        const totalStats = calculateTotalStats(tempChar);
        const newMaxRes = calculateMaxResource(character.class, character.level, totalStats);

        const { data } = await supabase.from('players').update({
            stats: newStats, max_resource: newMaxRes
        }).eq('id', character.id).select().single();
        if (data) setCharacter(data);

        setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'system', content: message }]);
    };

    // Bridge: AI response triggers combat with enemies
    const initializeHostCombat = (enemies) => {
        if (!enemies || enemies.length === 0) return;
        // Normalize enemy data (ensure all required fields)
        const normalizedEnemies = enemies.map((e, i) => ({
            name: e.name || `Ennemi ${i + 1}`,
            hp: e.hp || 20,
            max_hp: e.max_hp || e.hp || 20,
            atk: e.atk || 5,
            ac: e.ac || 10,
            id: e.id || `enemy-${i}-${Date.now()}`,
            cr: e.cr || 1,
            abilities: e.abilities || [],
        }));
        setCombatEnemies(normalizedEnemies);
        setCombatMode(true);
        setMessages(prev => [...prev, {
            id: crypto.randomUUID(),
            role: 'system',
            content: `⚔️ Combat déclenché ! ${normalizedEnemies.map(e => e.name).join(', ')} attaquent !`,
            created_at: new Date().toISOString()
        }]);
    };

    const _handleCombatDistanceCheck = async (combatData) => {
        if (!character) return;
        setLoading(true);

        try {
            // Ask GM to determine distance based on recent history
            const { data: aiResponse } = await invokeGM(supabase, {
                    action: "DETERMINE_COMBAT_DISTANCE",
                    history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
                    sessionId: session.id,
                    playerId: character.id,
                    playerProfile: { name: character.name, class: character.class },
                    context: buildDistancePrompt(combatData.enemies)
                }
            });

            const distance = aiResponse?.distance || 'medium'; // Default to medium if AI fails
            const reason = aiResponse?.reason || "Vous entendez le combat au loin.";

            if (isImmediateJoin(distance, aiResponse?.turns)) {
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
            turns = distanceToTurns(distanceStr);
        }

        // If turns is 0, they are arrived immediately
        const newStatus = resolveJoinStatus(turns);

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
                .ilike('content', `%(MÉMOIRE:${npcName.replace(/[%_]/g, '')})%`)
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

            const { data: aiResponse } = await invokeGM(supabase, {
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
                // NPC-specific: sync merchant to world_state if present
                if (aiResponse.merchant) {
                    await supabase.from('world_state').upsert({
                        key: `merchant_${session.id}`,
                        value: {
                            ...aiResponse.merchant,
                            active: true,
                            visitors: players.map(p => p.id)
                        }
                    });
                }

                // Process all standard side-effects
                const { earlyReturn } = processAIResponse(aiResponse, {
                    setWeather,
                    setActiveLoot,
                    setPendingTransaction,
                    addToChronicle,
                    addSystemMessage: (text) => setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'system', content: text, created_at: new Date().toISOString() }]),
                    handleExperienceGain,
                    handleUnlockAbility,
                    handleUpdateStats,
                    handleCodexUpdate,
                    handleTitleUnlock,
                    handleAffinityChange,
                    initializeHostCombat,
                    addItems: (items) => handleUpdateInventory([...(character.inventory || []), ...items]),
                    isHost: session?.host_id === profile?.id,
                    syncWeather: async (w) => { await supabase.from('world_state').upsert({ key: 'weather', value: w }); },
                    npcName,
                    transactionMeta: { context: "NPC", npcName },
                });

                if (earlyReturn) {
                    setLoading(false);
                    return;
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
                    await invokeGM(supabase, {
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
        const nextPhase = resolveNextPhase(gamePhase, messages.length);
        if (nextPhase) setGamePhase(nextPhase);

        setMessages(prev => [...prev, optimisticMsg]);

        try {
            await supabase.from('messages').insert({ id: tempId, session_id: session.id, role: 'user', content, player_id: character?.id });

            // === GM ENGINE PRE-PROCESS (local AI enrichment) ===
            let gmPreResult = { events: [], context: {} };
            try {
                gmPreResult = gmEngine.preProcess(content, {
                    character,
                    currentLocation: null,
                    combatMode,
                    gameTime,
                    weather,
                    activeQuests: [],
                });
            } catch (e) { console.warn('[GMEngine] preProcess skipped:', e); }

            // Build payload with GM context hints
            const gmContextHints = gmPreResult.context || {};
            const { data: aiResponse } = await invokeGM(supabase, buildGameMasterPayload({
                    content,
                    messages,
                    tempId,
                    sessionId: session.id,
                    playerId: character?.id,
                    gamePhase,
                    gameTime,
                    timeLabel: getTimeLabel(),
                    weather,
                    character,
                    chronicle,
                    loreModules: { WORLD_CONTEXT, ENVIRONMENTAL_RULES, BESTIARY, BESTIARY_EXTENDED, CLASSES, NPC_TEMPLATES, QUEST_HOOKS, TAVERNS_AND_LOCATIONS, RUMORS_AND_GOSSIP, RANDOM_ENCOUNTERS, WORLD_MYTHS_EXTENDED, LEGENDARY_ITEMS, FACTION_LORE },
                    // GM Engine enrichment
                    ...(gmContextHints.difficultyModifier ? { difficultyModifier: gmContextHints.difficultyModifier } : {}),
                    ...(gmContextHints.storyHint ? { storyHint: gmContextHints.storyHint } : {}),
                }));

            if (aiResponse) {
                // handleSubmit-specific: sync merchant to world_state (without visitors)
                if (aiResponse.merchant) {
                    await supabase.from('world_state').upsert({
                        key: `merchant_${session.id}`,
                        value: { ...aiResponse.merchant, active: true }
                    });
                }

                // Process all standard side-effects
                const { earlyReturn } = processAIResponse(aiResponse, {
                    setWeather,
                    setActiveLoot,
                    setPendingTransaction,
                    addToChronicle,
                    addSystemMessage: (text) => setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'system', content: text, created_at: new Date().toISOString() }]),
                    handleExperienceGain,
                    handleUnlockAbility,
                    handleUpdateStats,
                    handleCodexUpdate,
                    initializeHostCombat,
                    addItems: (items) => handleUpdateInventory([...(character.inventory || []), ...items]),
                    isHost: session?.host_id === profile?.id,
                    syncWeather: async (w) => { await supabase.from('world_state').upsert({ key: 'weather', value: w }); },
                    transactionMeta: { context: "WORLD", npcName: null },
                });

                if (earlyReturn) {
                    setLoading(false);
                    return;
                }

                // Check for trivial challenges and auto-resolve them
                if (aiResponse.challenge) {
                    const challenge = aiResponse.challenge;
                    const label = challenge.label?.toLowerCase() || '';
                    const stat = challenge.stat?.toLowerCase() || '';
                    
                    // Validate player input - ignore challenges for gibberish/invalid text
                    const isValidInput = isValidChallengeInput(content);
                    
                    if (!isValidInput) {
                        console.log('[Challenge] Ignoring challenge for invalid input:', content);
                        // Just show narrative without challenge
                        if (aiResponse.narrative && !isDuplicateNarrative(messages, aiResponse.narrative, { count: 3 })) {
                                const gmMsg = {
                                    id: crypto.randomUUID(),
                                    session_id: session?.id,
                                    role: 'assistant',
                                    content: aiResponse.narrative,
                                    created_at: new Date().toISOString()
                                };
                                setMessages(prev => [...prev, gmMsg]);
                                await supabase.from('messages').insert({ ...gmMsg, session_id: session.id });
                        }
                    } else {
                        const isTrivial = isTrivialChallenge(challenge, content);
                        
                        if (isTrivial) {
                            // Auto-résoudre le challenge trivial avec succès
                            console.log('[Challenge] Action triviale détectée, résolution automatique:', challenge.label);
                            
                            // Créer un résultat de succès automatique
                            const autoResult = {
                                natural: 50,
                                naturalConverted: 50,
                                modifier: (character?.stats?.[stat] || 10) * 2,
                                total: 50 + (character?.stats?.[stat] || 10) * 2,
                                outcome: 'SUCCESS',
                                dice: 'd100',
                                dc: challenge.dc || 25,
                                stat: challenge.stat || 'PERCEPTION'
                            };
                            
                            // Appeler handleChallengeResult directement
                            setTimeout(() => handleChallengeResult(autoResult), 100);
                        } else {
                            // Challenge normal - afficher le modal
                            // Ajouter un message système pour prévenir le joueur
                            const previewMsg = {
                                id: crypto.randomUUID(),
                                role: 'system',
                                content: `🎲 **Test de ${challenge.stat?.toUpperCase() || 'compétence'}** - "${challenge.label || 'Test de compétence'}"\n\nObjectif : ${challenge.dc || 50} | Modificateur : ${(character?.stats?.[challenge.stat?.toLowerCase()] || 10) * 2 >= 0 ? '+' : ''}${(character?.stats?.[challenge.stat?.toLowerCase()] || 10) * 2}\n\n*Cliquez sur le bouton ci-dessus pour lancer les dés...*`,
                                created_at: new Date().toISOString()
                            };
                            setMessages(prev => [...prev, previewMsg]);
                            
                            // Sauvegarder en DB
                            if (session) {
                                await supabase.from('messages').insert({
                                    session_id: session.id,
                                    role: 'system',
                                    content: previewMsg.content
                                });
                            }
                            
                            setActiveChallenge(challenge);
                        }
                    }
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
                } else {
                    // Default: display GM narrative in chat
                    const narrative = aiResponse.narrative || formatAIContent(aiResponse);
                    if (narrative && typeof narrative === 'string' && narrative.length > 0) {
                        const gmMsg = {
                            id: crypto.randomUUID(),
                            session_id: session.id,
                            role: 'assistant',
                            content: narrative,
                            created_at: new Date().toISOString()
                        };
                        setMessages(prev => [...prev, gmMsg]);
                        supabase.from('messages').insert({ session_id: session.id, role: 'assistant', content: narrative }).then(() => {});
                    }
                }
            }

            // === GM ENGINE POST-PROCESS (karma, economy, NPC personality, memory) ===
            try {
                const gmPostResult = gmEngine.postProcess(content, aiResponse || {}, {
                    character,
                    currentLocation: null,
                    combatMode,
                    activeQuests: [],
                });
                // Inject random events from pre-process as system messages
                if (gmPreResult.events?.length > 0) {
                    for (const evt of gmPreResult.events) {
                        if (evt.narrative || evt.text) {
                            const evtMsg = {
                                id: crypto.randomUUID(),
                                role: 'system',
                                content: `[Monde] ${evt.narrative || evt.text}`,
                                created_at: new Date().toISOString(),
                            };
                            setMessages(prev => [...prev, evtMsg]);
                        }
                    }
                }
                // Inject faction war updates
                if (gmPostResult.narrativeAddons?.length > 0) {
                    for (const addon of gmPostResult.narrativeAddons) {
                        if (addon) {
                            setMessages(prev => [...prev, {
                                id: crypto.randomUUID(),
                                role: 'system',
                                content: `[Monde] ${addon}`,
                                created_at: new Date().toISOString(),
                            }]);
                        }
                    }
                }
            } catch (e) { console.warn('[GMEngine] postProcess skipped:', e); }

            // FORCED SYNC: Always reload after AI interaction to handle complex system states
            await fetchData();
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleConsumeItem = async (item, index) => {
        if (!character || !item) return;
        const effect = computeConsumeEffect(item, index, character);
        if (!effect) return;

        if (effect.newHp !== null) {
            await handleHPChange(character.id, effect.newHp);
            setCharacter(prev => ({ ...prev, hp: effect.newHp }));
        }
        if (effect.newResource !== null) {
            await handleResourceChange(character.id, effect.newResource);
            setCharacter(prev => ({ ...prev, resource: effect.newResource }));
        }
        await handleUpdateInventory(effect.newInventory);
        setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'system', content: effect.message }]);
    };

    const handleShareItemToChat = async (itemData) => {
        if (!character || !itemData) return;
        const shareMsg = buildItemSharePayload(itemData, character, session?.id);
        setItemShares(prev => [...prev.slice(-9), shareMsg]);

        if (session?.id) {
            await supabase.from('world_state').upsert({
                key: `item_shares_${session.id}`,
                value: [...itemShares.slice(-9), shareMsg],
                updated_at: new Date().toISOString()
            });
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
            const { data: aiResponse } = await invokeGM(supabase, {
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

        if (!session?.id || !character?.id) return;

        // Set typing status via DB (not WebSocket)
        updateTypingStatus(true);

        // Debounce to clear
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            updateTypingStatus(false);
        }, 2000);
    };

    // Safety: Auto-exit combat if no enemies
    useEffect(() => {
        if (combatMode && (!combatEnemies || combatEnemies.length === 0)) {
            setCombatMode(false);
        }
    }, [combatEnemies, combatMode]);


    return (
        <GameModalProvider>
        <div className="app-container">
            <div className="vignette-overlay" />

            {/* MULTI-STEP FLOW: LOBBY -> HUB -> CREATION -> GAME */}
            {!session ? (
                <Suspense fallback={LAZY_FALLBACK}>
                <SessionLobby
                    onJoin={handleJoinSession}
                    onCreate={handleCreateSession}
                    onQuickStart={handleQuickStart}
                    onSoloAdventure={handleSoloAdventure}
                    onSoloCustom={handleSoloCustom}
                    onJoinQuickStart={handleJoinQuickStart}
                    availableSessions={availableSessions}
                    loading={loading}
                    savedGames={savedGames}
                    onLoadGame={handleLoadGame}
                    onDeleteSession={handleDeleteSession}
                    onDeleteSave={handleDeleteSave}
                    profile={profile}
                    onOpenDMPanel={() => setShowDMPanel(true)}
                    onOpenCodex={() => setShowCodex(true)}
                />
                </Suspense>
            ) : !session.is_started ? (
                <SessionHub
                    players={players}
                    character={character}
                    session={session}
                    onToggleReady={handleToggleReady}
                    onStart={handleStartAdventure}
                    onLeave={handleLeaveSession}
                    onCreateRandomCharacter={handleCharacterCreate}
                    onKickPlayer={handleKickPlayer}
                    loading={loading}
                />
            ) : !character?.class ? (
                <Suspense fallback={LAZY_FALLBACK}>
                <CharacterCreation
                    onCreate={handleCharacterCreate}
                    onBack={handleLeaveSession}
                    onQuickStart={handleCharacterQuickStart}
                    sessionId={session.id}
                />
                </Suspense>
            ) : !adventureStarted ? (
                /* WAITING ROOM: Player has created character, waiting for all to be ready */
                <WaitingRoom
                    players={players}
                    character={character}
                    onToggleReady={handleToggleReady}
                    onStart={() => {
                        console.log("Forcing start adventure...");
                        handleStartAdventure(true);
                    }}
                    onInvite={() => {
                        const url = window.location.origin + window.location.pathname + '?s=' + session.id;
                        navigator.clipboard.writeText(url);
                        setMessages(prev => [...prev, {
                            id: crypto.randomUUID(),
                            role: 'system',
                            content: "✅ Lien d'invitation copié !",
                            created_at: new Date().toISOString()
                        }]);
                    }}
                    loading={loading}
                    sessionId={session.id}
                    profile={profile}
                    sessionHostId={session.host_id}
                />
            ) : null}

            {character?.class && (
                <main className="hud-layout">
                    <SceneBackground currentImage={sceneImage} />

                    <Suspense fallback={LAZY_FALLBACK}>
                    <CharacterSheet
                        character={character}
                        onUpdateInventory={handleUpdateInventory}
                        onUpdateMaterialInventory={handleUpdateMaterialInventory}
                        onEquipItem={handleEquipItem}
                        onToggleSettings={() => setShowSettings(!showSettings)}
                        onConsume={handleConsumeItem}
                        onLevelUpClick={() => setShowLevelUp(true)}
                        onTradeClick={() => setShowTradeModal(true)}
                        onShareItem={handleShareItemToChat}
                    />
                    </Suspense>

                    <PartyInfoPanel 
                        players={players} 
                        currentCharacter={character} 
                        onKickPlayer={handleKickPlayer}
                        isHost={session?.host_id === profile?.id}
                    />

                    <Suspense fallback={LAZY_FALLBACK}>
                    <VoiceChatPanel
                        isMuted={voiceMuted}
                        isTalking={voiceTalking}
                        isPushToTalk={isPushToTalk}
                        pushToTalkKey={pushToTalkKey}
                        speakers={speakers}
                        toggleMute={toggleVoiceMute}
                        togglePushToTalk={togglePushToTalk}
                        changePushToTalkKey={changePushToTalkKey}
                        character={character}
                    />
                    </Suspense>

                    {showItemSharePanel && <ItemSharePanel itemShares={itemShares} onClose={handleCloseItemSharePanel} />}

                    <section className="hud-bottom glass-panel animate-fade-in">
                        <HUDHeader
                            gameTime={gameTime}
                            getTimeLabel={getTimeLabel}
                            onInvite={() => {
                                const url = window.location.origin + window.location.pathname + '?s=' + session.id;
                                navigator.clipboard.writeText(url);
                                setMessages(prev => [...prev, {
                                    id: crypto.randomUUID(),
                                    role: 'system',
                                    content: "✅ Lien d'invitation copié !",
                                    created_at: new Date().toISOString()
                                }]);
                            }}
                            onToggleHelper={() => setShowHelper(!showHelper)}
                            showHelper={showHelper}
                            onToggleCodex={() => setShowCodex(!showCodex)}
                            onToggleDMPanel={() => setShowDMPanel(!showDMPanel)}
                            onDebugCombat={handleTestCombat}
                            connStatus={connStatus}
                            isGM={session && profile && (session.gm_id === profile.id || session.host_id === profile.id)}
                            audioEnabled={audioEnabled}
                            onToggleAudio={() => setAudioEnabled(!audioEnabled)}
                            audioVolume={audioVolume}
                            onVolumeChange={setAudioVolume}
                            onToggleItemSharePanel={() => setShowItemSharePanel(!showItemSharePanel)}
                            itemShareCount={itemShares.length}
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
                    <Suspense fallback={LAZY_FALLBACK}>
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
                            // 1. Clear state locally IMMEDIATELY to prevent sync-induced re-entry
                            setCombatMode(false);
                            setCombatEnemies([]);
                            setSyncedCombatState({ active: false });
                            setPendingCombat(null);
                            setActiveChallenge(null);
                            if (result?.flight) {
                                hasFledRef.current = true;
                            }

                            // 2. Perform DB cleanup for other players if Host
                            if (session.host_id === profile.id) {
                                supabase.from('world_state').upsert({ key: `combat_${session.id}`, value: { active: false } });
                            }

                            // 3. Ask the GM to narrate the combat outcome
                            const defeatedNames = (result?.defeatedEnemies || combatEnemies || []).map(e => e.name).join(', ');
                            let outcome = result?.victory ? 'VICTOIRE' : 'DEFAITE';
                            if (result?.flight) outcome = 'FUITE';
                            if (result?.cancelled) return; // Silent close

                            const postCombatAction = '[SYSTEM] COMBAT TERMINE. Issue: ' + outcome
                                + (defeatedNames ? '. Ennemis vaincus: ' + defeatedNames : '')
                                + '. Decris l\'issue du combat et attribue les recompenses (XP, Loot) si victoire.';

                            try {
                                const { data: aiResponse } = await invokeGM(supabase, {
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
                                });

                                // 4. Process GM response for rewards and world changes
                                if (aiResponse) {
                                    if (aiResponse.reward?.xp) handleExperienceGain(aiResponse.reward.xp, aiResponse.reward.reason);
                                    if (aiResponse.loot) setActiveLoot(aiResponse.loot);
                                    if (aiResponse.item) {
                                        const items = Array.isArray(aiResponse.item) ? aiResponse.item : [aiResponse.item];
                                        handleUpdateInventory([...(character.inventory || []), ...items]);
                                    }
                                    if (aiResponse.codex_update) handleCodexUpdate(aiResponse.codex_update);
                                    if (aiResponse.stats) handleUpdateStats(aiResponse.stats);

                                    // Narrative feedback
                                    if (aiResponse.narrative) {
                                        const gmMsg = {
                                            id: crypto.randomUUID(),
                                            session_id: session.id,
                                            role: 'assistant',
                                            content: aiResponse.narrative,
                                            created_at: new Date().toISOString()
                                        };
                                        setMessages(prev => [...prev, gmMsg]);
                                        await supabase.from('messages').insert({ ...gmMsg, session_id: session.id });
                                    }
                                }
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
                    </Suspense>
                )
            }

            <ParticleSystem vfx={activeVFX} />

            <div className={`vignette-layer vignette-combat ${combatMode && combatEnemies.length > 0 ? 'active' : ''}`} />
            <div className={`vignette-layer vignette-danger ${!combatMode && character?.hp && character?.max_hp > 0 && (character.hp / character.max_hp) < 0.3 ? 'active' : ''}`} />

            {
                activeMerchant && (
                    <Suspense fallback={LAZY_FALLBACK}>
                    <MerchantModal
                        merchant={activeMerchant}
                        affinity={affinities[activeMerchant?.npcName] || 0}
                        playerGold={character?.gold || 0}
                        playerInventory={character?.inventory || []}
                        playerCha={character?.stats?.cha || 10}
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
                            // CHA discount: better sell prices with high Charisma
                            const chaMod = Math.floor(((character?.stats?.cha || 10) - 10) * 1.25);
                            const chaDiscount = chaMod * 0.03;
                            const aff = affinities[activeMerchant?.npcName] || 0;
                            const sellMult = Math.max(0.1, Math.min(0.9, (0.5 + (aff * 0.002)) * (1 + chaDiscount * 0.5)));
                            const sellPrice = Math.floor((item.price || 50) * sellMult);
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
                        onClose={buildMerchantCloseHandler({
                            session, character, activeMerchant,
                            setActiveMerchant, addMessage, handleSubmit,
                        })}
                    />
                    </Suspense>
                )
            }

            {
                activeLoot && (
                    <LootModal
                        loot={activeLoot}
                        playerInt={character?.stats?.int || 10}
                        onCollect={(items, goldAmount) => {
                            triggerSFX('gold');
                            const newInventory = [...(character.inventory || []), ...items.map(i => ({ ...i, equipped: false }))];
                            const newGold = (character.gold || 0) + (goldAmount || activeLoot.gold || 0);
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
                    <Suspense fallback={LAZY_FALLBACK}>
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
                        onTradeComplete={() => {
                            triggerSFX('gold');
                            fetchSession();
                            addMessage({
                                role: 'system',
                                content: `[ÉCHANGE] Un échange a été effectué entre joueurs.`,
                                timestamp: Date.now()
                            });
                        }}
                    />
                    </Suspense>
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
                            if (res.outcome === 'SUCCESS' || res.outcome === 'CRITICAL_SUCCESS') triggerSFX('levelUp'); // Use levelUp as a success sound
                            handleChallengeResult(res);
                        }}
                        onRollStart={() => triggerSFX('dice')}
                        onClose={() => setActiveChallenge(null)}
                    />
                )
            }

            {
                showSettings && (
                    <div className="settings-overlay animate-fade-in"
                        onClick={() => setShowSettings(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 10000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <div className="settings-modal"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: 'rgba(10, 11, 14, 0.95)',
                                padding: '2.5rem',
                                border: '1px solid var(--gold-primary)',
                                borderRadius: '8px',
                                minWidth: '400px',
                                boxShadow: '0 0 50px rgba(0,0,0,0.8)',
                                position: 'relative'
                            }}
                        >
                            <h3 style={{ color: 'var(--gold-primary)', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '3px', fontFamily: 'var(--font-display)' }}>SANCTUAIRE</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' }}>MUSIQUE & AMBIANCE</span>
                                    <button
                                        className={`btn-secondary ${audioEnabled ? 'active' : ''}`}
                                        onClick={() => {
                                            setAudioEnabled(!audioEnabled);
                                        }}
                                        style={{ minWidth: '60px', borderColor: audioEnabled ? 'var(--gold-primary)' : 'var(--text-muted)', color: audioEnabled ? 'var(--gold-primary)' : 'var(--text-muted)' }}
                                    >
                                        {audioEnabled ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                                {/* Save Game button - only for host */}
                                {session?.host_id === profile?.id && (
                                    <button
                                        className="btn-gold"
                                        style={{ 
                                            background: 'rgba(50, 150, 50, 0.3)', 
                                            marginTop: '1rem', 
                                            border: '2px solid #4dff88', 
                                            padding: '1rem',
                                            color: '#4dff88',
                                            fontWeight: 'bold',
                                            letterSpacing: '2px',
                                            fontSize: '1rem',
                                            boxShadow: '0 0 15px rgba(77, 255, 136, 0.3)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onClick={async () => {
                                            try {
                                                setLoading(true);
                                                const saveData = {
                                                    sessionId: session.id,
                                                    hostId: profile.id, // Store host ID to identify ownership
                                                    timestamp: new Date().toISOString(),
                                                    players: players,
                                                    messages: messages,
                                                    gameTime: gameTime,
                                                    weather: weather,
                                                    adventureStarted: adventureStarted
                                                };
                                                await supabase.from('world_state').upsert({
                                                    key: `save_${session.id}`,
                                                    value: saveData,
                                                    updated_at: new Date().toISOString()
                                                });
                                                // Ajouter immédiatement aux savedGames pour affichage
                                                const newSave = {
                                                    id: `save_${session.id}`,
                                                    sessionId: session.id,
                                                    host_name: players?.[0]?.name || 'MJ',
                                                    timestamp: new Date().toISOString(),
                                                    playerCount: players?.length || 0,
                                                    saveData: saveData
                                                };
                                                setSavedGames(prev => [newSave, ...prev.filter(s => s.sessionId !== session.id)]);
                                                gameAlert('💾 Partie sauvegardée avec succès !', 'Succès');
                                            } catch (err) {
                                                console.error('Save error:', err);
                                                gameAlert('❌ Erreur lors de la sauvegarde', 'Erreur');
                                            } finally {
                                                setLoading(false);
                                            }
                                        }}
                                    >
                                        💾 SAUVEGARDER LA PARTIE
                                    </button>
                                )}
                                <button
                                    className="btn-gold"
                                    style={{ 
                                        background: 'rgba(220, 50, 50, 0.3)', 
                                        marginTop: '1rem', 
                                        border: '2px solid #ff4444', 
                                        padding: '1rem',
                                        color: '#ff6666',
                                        fontWeight: 'bold',
                                        letterSpacing: '2px',
                                        fontSize: '1rem',
                                        boxShadow: '0 0 15px rgba(255, 68, 68, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onClick={() => {
                                        setShowSettings(false);
                                        handleLeaveSession();
                                    }}
                                >
                                    QUITTER LA SESSION
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={async () => {
                                        setShowSettings(false);
                                        handleLeaveSession();
                                        await supabase.auth.signOut();
                                    }}
                                    style={{
                                        padding: '0.8rem',
                                        marginTop: '0.5rem',
                                        background: 'rgba(100, 100, 255, 0.1)',
                                        border: '1px solid rgba(100, 100, 255, 0.3)',
                                        color: '#aaaaff',
                                        fontSize: '0.85rem',
                                        letterSpacing: '2px'
                                    }}
                                >
                                    🚪 DÉCONNEXION
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => setShowSettings(false)}
                                    style={{ padding: '0.8rem', marginTop: '0.5rem' }}
                                >
                                    RETOUR AU JEU
                                </button>
                            </div>
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

            <Suspense fallback={LAZY_FALLBACK}>
            <CodexPanel
                isOpen={showCodex}
                onClose={() => setShowCodex(false)}
            />
            </Suspense>

            <Suspense fallback={LAZY_FALLBACK}>
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
            </Suspense>

            <AudioManager
                mood={getMood()}
                enabled={audioEnabled}
                volume={audioVolume}
                hour={gameTime.hour}
                sfx={lastSFX}
            />

            {/* Debug Panel for Combat Logs */}
            <Suspense fallback={LAZY_FALLBACK}>
            <DebugPanel
                onTestCombat={handleTestCombat}
                session={session}
                character={character}
                profile={profile}
            />
            </Suspense>

            {/* Aethelgard Side Flags */}
            <div className="side-flag left" style={{ backgroundImage: 'url("/aethelgard_flag_royal.png")' }}></div>
            <div className="side-flag right" style={{ backgroundImage: 'url("/aethelgard_flag_royal.png")' }}></div>

            {/* PWA Update Notification */}
            <PWAUpdateNotification />
        </div>
        </GameModalProvider>
    );
}

