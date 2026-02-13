import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export const useGameState = (profile) => {
    const [session, setSession] = useState(null);
    const [character, setCharacter] = useState(null);
    const [players, setPlayers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [connStatus, setConnStatus] = useState('connecting');
    const [affinities, setAffinities] = useState({});
    const [titles, setTitles] = useState([]);
    const [gameTime, setGameTime] = useState({ hour: 12, minute: 0, day: 1 });
    const [realTimeSync, setRealTimeSync] = useState(false);
    const [weather, setWeather] = useState('clear');
    const [chronicle, setChronicle] = useState([]); // World Events
    const [syncedCombatState, setSyncedCombatState] = useState(null);

    // Memoized Fetchers
    const fetchWorldState = useCallback(async () => {
        const { data: ws } = await supabase.from('world_state').select('*');
        if (ws) {
            const time = ws.find(i => i.key === 'game_time');
            const rt = ws.find(i => i.key === 'real_time_sync');
            if (time) setGameTime({ ...time.value, minute: time.value.minute || 0 });
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
        const { data, error } = await supabase.from('sessions').select('*').eq('id', sid).maybeSingle();
        if (error) return null;
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

    // Real-time world state sync (Game Time & Combat)
    useEffect(() => {
        if (!session) return;
        const channel = supabase
            .channel('world_state_sync')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'world_state' }, payload => {
                if (payload.new.key === 'game_time') {
                    setGameTime(payload.new.value);
                }
                if (payload.new.key === `combat_${session.id}`) {
                    const sharedState = payload.new.value;
                    setSyncedCombatState(sharedState);
                    window.latestCombatState = sharedState;
                }
            })
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'world_state' }, payload => {
                if (payload.new.key === `combat_${session.id}`) {
                    const sharedState = payload.new.value;
                    setSyncedCombatState(sharedState);
                    window.latestCombatState = sharedState;
                }
            })
            .subscribe();

        // Initial fetch of combat state
        supabase.from('world_state').select('value').eq('key', `combat_${session.id}`).limit(1)
            .then(({ data }) => {
                const combatData = data?.[0];
                if (combatData?.value?.active) {
                    setSyncedCombatState(combatData.value);
                }
            });

        return () => supabase.removeChannel(channel);
    }, [session]);

    // Progression Logic (Simulation or Real-Life Sync)
    useEffect(() => {
        if (!session || !profile) return;

        const interval = setInterval(async () => {
            if (realTimeSync) {
                const now = new Date();
                const nextTime = {
                    hour: now.getHours(),
                    minute: now.getMinutes(),
                    day: Math.floor(now.getTime() / (1000 * 60 * 60 * 24))
                };
                setGameTime(nextTime);
                if (session.host_id === profile.id) {
                    supabase.from('world_state').upsert({ key: 'game_time', value: nextTime });
                }
            } else {
                setGameTime(prev => {
                    const nextMinute = (prev.minute || 0) + 1;
                    let h = prev.hour;
                    let d = prev.day;
                    let m = nextMinute;

                    if (m >= 60) {
                        m = 0;
                        h = (h + 1) % 24;
                        if (h === 0) d += 1;
                    }

                    const nextTime = { hour: h, minute: m, day: d };
                    if (session.host_id === profile.id) {
                        supabase.from('world_state').upsert({ key: 'game_time', value: nextTime });
                    }
                    return nextTime;
                });
            }
        }, realTimeSync ? 5000 : 12000);

        return () => clearInterval(interval);
    }, [session, profile, realTimeSync]);

    // HP / Resource change handlers
    const handleHPChange = async (playerId, newHp) => {
        setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, hp: newHp } : p));
        if (character && playerId === character.id) {
            setCharacter(prev => ({ ...prev, hp: newHp }));
            await supabase.from('players').update({ hp: newHp }).eq('id', playerId);
        }
    };

    const handleResourceChange = async (playerId, newResource) => {
        setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, resource: newResource } : p));
        if (character && playerId === character.id) {
            setCharacter(prev => ({ ...prev, resource: newResource }));
            await supabase.from('players').update({ resource: newResource }).eq('id', playerId);
        }
    };

    const handleConsumeItem = async (item) => {
        if (!character) return;
        // Identify item by name and description if ID is missing
        const itemIndex = character.inventory.findIndex(i =>
            (item.id && i.id === item.id) || (i.name === item.name && i.desc === item.desc)
        );

        if (itemIndex > -1) {
            const updatedInventory = [...character.inventory];
            updatedInventory.splice(itemIndex, 1);
            setCharacter(prev => ({ ...prev, inventory: updatedInventory }));
            setPlayers(prev => prev.map(p => p.id === character.id ? { ...p, inventory: updatedInventory } : p));
            await supabase.from('players').update({ inventory: updatedInventory }).eq('id', character.id);
        }
    };

    return {
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
        weather, setWeather,
        resetChronicle,
        resetGameTime,

        fetchSession,
        fetchWorldState,
        fetchPlayerExtras,
        handleHPChange,
        handleResourceChange,
        handleConsumeItem,
        chronicle,
        addToChronicle: async (event) => {
            const newChronicle = [...chronicle, { ...event, date: gameTime, id: crypto.randomUUID() }];
            setChronicle(newChronicle);
            if (session?.host_id === profile?.id) {
                await supabase.from('world_state').upsert({ key: 'chronicle', value: newChronicle });
            }
        },
        resetGameTime: async () => {
            const initialTime = { hour: 12, minute: 0, day: 1 };
            setGameTime(initialTime);
            if (session?.host_id === profile?.id) {
                await supabase.from('world_state').upsert({ key: 'game_time', value: initialTime });
            }
        },
        resetChronicle: async () => {
            setChronicle([]);
            if (session?.host_id === profile?.id) {
                await supabase.from('world_state').upsert({ key: 'chronicle', value: [] });
            }
        },
        fetchAvailableSessions: async () => {
            const { data, error } = await supabase
                .from('sessions')
                .select(`
                    id, 
                    created_at, 
                    host_id,
                    players!inner(name, user_id)
                `)
                .eq('active', true)
                .eq('is_started', false)
                .eq('players.is_host', true);

            if (error) {
                console.error("Discovery error:", error);
                return [];
            }
            return data.map(s => ({
                id: s.id,
                created_at: s.created_at,
                host_name: s.players[0]?.name || "Inconnu",
                host_id: s.host_id
            }));
        }
    };
};
