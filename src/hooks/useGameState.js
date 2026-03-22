import { useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useGameStore } from '../store/gameStore';

export const useGameState = (profile) => {
    // All state now comes from the Zustand store
    const session = useGameStore(state => state.session);
    const setSession = useGameStore(state => state.setSession);
    const character = useGameStore(state => state.character);
    const setCharacter = useGameStore(state => state.setCharacter);
    const players = useGameStore(state => state.players);
    const setPlayers = useGameStore(state => state.setPlayers);
    const setOnlineUsers = useGameStore(state => state.setOnlineUsers);
    const connStatus = useGameStore(state => state.connStatus);
    const setConnStatus = useGameStore(state => state.setConnStatus);
    const affinities = useGameStore(state => state.affinities);
    const setAffinities = useGameStore(state => state.setAffinities);
    const titles = useGameStore(state => state.titles);
    const setTitles = useGameStore(state => state.setTitles);
    const gameTime = useGameStore(state => state.gameTime);
    const setGameTime = useGameStore(state => state.setGameTime);
    const realTimeSync = useGameStore(state => state.realTimeSync);
    const setRealTimeSync = useGameStore(state => state.setRealTimeSync);
    const weather = useGameStore(state => state.weather);
    const setWeather = useGameStore(state => state.setWeather);
    const chronicle = useGameStore(state => state.chronicle);
    const setChronicle = useGameStore(state => state.setChronicle);
    const syncedCombatState = useGameStore(state => state.syncedCombatState);
    const setSyncedCombatState = useGameStore(state => state.setSyncedCombatState);

    // Memoized Fetchers
    const fetchWorldState = useCallback(async () => {
        const { data: ws } = await supabase.from('world_state').select('*');
        if (ws) {
            const time = ws.find(i => i.key === 'game_time');
            if (time) {
                let val = time.value;
                // SANITIZATION: If day is a huge number (Unix Epoch), reset it to 1
                if (val.day > 5000) {
                    val.day = 1;
                    if (session?.host_id === profile?.id) {
                        supabase.from('world_state').upsert({ key: 'game_time', value: val });
                    }
                }
                setGameTime({ ...val, minute: val.minute || 0 });
            }
            const rt = ws.find(i => i.key === 'realtime_sync');
            if (rt) setRealTimeSync(rt.value);
            const ch = ws.find(i => i.key === 'chronicle');
            if (ch) setChronicle(ch.value || []);
            const w = ws.find(i => i.key === 'weather');
            if (w) setWeather(w.value || 'clear');
        }
    }, []);

    const fetchSession = useCallback(async (id) => {
        const sid = id || session?.id;
        if (!sid) return null;
        const { data, error: _error } = await supabase.from('sessions').select('*').eq('id', sid).maybeSingle();
        if (_error) return null;
        setSession(data);
        return data;
    }, [session?.id]);

    const fetchPlayerExtras = useCallback(async (pid) => {
        if (!pid) return;
        const { data: t } = await supabase.from('player_titles').select('title').eq('player_id', pid);
        if (t) setTitles(t.map(i => i.title));
        const { data: a } = await supabase.from('npc_affinities').select('npc_name, score').eq('player_id', pid);
        if (a) {
            const affMap = {};
            a.forEach(i => affMap[i.npc_name] = i.score);
            setAffinities(affMap);
        }
    }, []);

    // World state sync disabled - using polling only to prevent WebSocket errors
    useEffect(() => {
        if (!session) return;

        // Initial fetch only
        supabase.from('world_state').select('value').eq('key', `combat_${session.id}`).limit(1)
            .then(({ data }) => {
                const combatData = data?.[0];
                if (combatData?.value?.active) {
                    setSyncedCombatState(combatData.value);
                    window.latestCombatState = combatData.value;
                }
            });
    }, [session]);

    // Progression Logic (Simulation or Real-Life Sync)
    useEffect(() => {
        if (!session || !profile) return;

        const interval = setInterval(async () => {
            if (realTimeSync) {
                const now = new Date();
                // Relative Epoch: Feb 1, 2026. This prevents massive day numbers (20000+)
                const gameEpoch = new Date('2026-02-01').getTime();
                const dayDiff = Math.floor((now.getTime() - gameEpoch) / (1000 * 60 * 60 * 24));

                const nextTime = {
                    hour: now.getHours(),
                    minute: now.getMinutes(),
                    day: Math.max(1, dayDiff + 1) // Day 1 is the start date
                };
                setGameTime(nextTime);
                if (session.host_id === profile.id) {
                    supabase.from('world_state').upsert({ key: 'game_time', value: nextTime });
                }
            } else {
                // For non-realtime, read current state from store and compute next
                const currentTime = useGameStore.getState().gameTime;
                const nextMinute = (currentTime.minute || 0) + 1;
                let h = currentTime.hour;
                let d = currentTime.day;
                let m = nextMinute;

                if (m >= 60) {
                    m = 0;
                    h = (h + 1) % 24;
                    if (h === 0) d += 1;
                }

                const nextTime = { hour: h, minute: m, day: d };
                setGameTime(nextTime);
                if (session.host_id === profile.id) {
                    supabase.from('world_state').upsert({ key: 'game_time', value: nextTime });
                }
            }
        }, realTimeSync ? 5000 : 12000);

        return () => clearInterval(interval);
    }, [session, profile, realTimeSync]);

    // HP / Resource change handlers
    const handleHPChange = async (playerId, newHp) => {
        const currentPlayers = useGameStore.getState().players;
        const currentCharacter = useGameStore.getState().character;
        setPlayers(currentPlayers.map(p => p.id === playerId ? { ...p, hp: newHp } : p));
        if (currentCharacter && playerId === currentCharacter.id) {
            setCharacter({ ...currentCharacter, hp: newHp });
            await supabase.from('players').update({ hp: newHp }).eq('id', playerId);
        }
    };

    const handleResourceChange = async (playerId, newResource) => {
        const currentPlayers = useGameStore.getState().players;
        const currentCharacter = useGameStore.getState().character;
        setPlayers(currentPlayers.map(p => p.id === playerId ? { ...p, resource: newResource } : p));
        if (currentCharacter && playerId === currentCharacter.id) {
            setCharacter({ ...currentCharacter, resource: newResource });
            await supabase.from('players').update({ resource: newResource }).eq('id', playerId);
        }
    };

    const handleConsumeItem = async (item) => {
        const currentCharacter = useGameStore.getState().character;
        if (!currentCharacter) return;
        // Identify item by name and description if ID is missing
        const itemIndex = currentCharacter.inventory.findIndex(i =>
            (item.id && i.id === item.id) || (i.name === item.name && i.desc === item.desc)
        );

        if (itemIndex > -1) {
            const updatedInventory = [...currentCharacter.inventory];
            updatedInventory.splice(itemIndex, 1);
            setCharacter({ ...currentCharacter, inventory: updatedInventory });
            const currentPlayers = useGameStore.getState().players;
            setPlayers(currentPlayers.map(p => p.id === currentCharacter.id ? { ...p, inventory: updatedInventory } : p));
            await supabase.from('players').update({ inventory: updatedInventory }).eq('id', currentCharacter.id);
        }
    };

    const resetGameTime = async () => {
        const initialTime = { hour: 12, minute: 0, day: 1 };
        setGameTime(initialTime);
        if (session?.host_id === profile?.id) {
            await supabase.from('world_state').upsert({ key: 'game_time', value: initialTime });
        }
    };

    const resetChronicle = async () => {
        setChronicle([]);
        if (session?.host_id === profile?.id) {
            await supabase.from('world_state').upsert({ key: 'chronicle', value: [] });
        }
    };

    return {
        session, setSession,
        character, setCharacter,
        players, setPlayers,
        setOnlineUsers,
        connStatus, setConnStatus,
        affinities, setAffinities,
        titles, setTitles,
        gameTime, setGameTime,
        syncedCombatState, setSyncedCombatState,
        realTimeSync, setRealTimeSync,
        weather, setWeather,

        fetchSession,
        fetchWorldState,
        fetchPlayerExtras,
        handleHPChange,
        handleResourceChange,
        handleConsumeItem,
        resetChronicle,
        resetGameTime,
        chronicle,
        addToChronicle: async (event) => {
            const currentChronicle = useGameStore.getState().chronicle;
            const currentGameTime = useGameStore.getState().gameTime;
            const currentSession = useGameStore.getState().session;
            const newChronicle = [...currentChronicle, { ...event, date: currentGameTime, id: crypto.randomUUID() }];
            setChronicle(newChronicle);
            if (currentSession?.host_id === profile?.id) {
                await supabase.from('world_state').upsert({ key: 'chronicle', value: newChronicle });
            }
        },
        fetchAvailableSessions: async () => {
            const { data, error } = await supabase
                .from('sessions')
                .select(`
                    id,
                    created_at,
                    host_id,
                    players!inner(id, name, user_id, is_host)
                `)
                .eq('active', true)
                .eq('is_started', false)
                .eq('players.is_host', true);

            if (error) {
                console.error("Discovery error:", error);
                return [];
            }

            // Filtrer pour ne garder que les sessions avec au moins un joueur (le host)
            const validSessions = data?.filter(s =>
                s.players && s.players.length > 0 && s.players.some(p => p.is_host)
            ) || [];

            return validSessions.map(s => ({
                id: s.id,
                created_at: s.created_at,
                host_name: s.players.find(p => p.is_host)?.name || "Inconnu",
                host_id: s.host_id
            }));
        }
    };
};
