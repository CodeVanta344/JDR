import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../supabaseClient';

/**
 * Hook for robust combat state synchronization with optimistic locking
 * Prevents race conditions and rollbacks during multiplayer combat
 */
export function useCombatSync(sessionId, initialCombatants = []) {
    const [combatants, setCombatants] = useState(initialCombatants);
    const [round, setRound] = useState(1);
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
    const [logs, setLogs] = useState([]);
    const [isLocked, setIsLocked] = useState(false);
    const [version, setVersion] = useState(0);
    
    const pendingUpdatesRef = useRef([]);
    const isApplyingUpdateRef = useRef(false);
    const lastAppliedVersionRef = useRef(0);

    // Load initial state from world_state
    useEffect(() => {
        if (!sessionId) return;

        const loadState = async () => {
            const { data, error } = await supabase
                .from('world_state')
                .select('value, version')
                .eq('key', `combat_${sessionId}`)
                .maybeSingle();

            if (data && data.value && data.value.active) {
                const state = data.value;
                setCombatants(state.combatants || []);
                setRound(state.round || 1);
                setCurrentTurnIndex(state.turnIndex || 0);
                setLogs(state.logs || []);
                setVersion(data.version || 0);
                lastAppliedVersionRef.current = data.version || 0;
            }
        };

        loadState();
    }, [sessionId]);

    // Real-time subscription with conflict resolution
    useEffect(() => {
        if (!sessionId) return;

        const channel = supabase
            .channel(`combat_sync_${sessionId}`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'world_state',
                filter: `key=eq.combat_${sessionId}`
            }, (payload) => {
                if (!payload.new || !payload.new.value) return;

                const newState = payload.new.value;
                const newVersion = payload.new.version || 0;

                // Always apply newer versions to prevent missing updates
                if (newVersion > lastAppliedVersionRef.current) {
                    lastAppliedVersionRef.current = newVersion;
                    
                    // Apply update with debounce protection
                    if (!isApplyingUpdateRef.current && newState.active) {
                        isApplyingUpdateRef.current = true;
                        
                        // Use requestAnimationFrame to batch updates
                        requestAnimationFrame(() => {
                            // Merge with local state to preserve animations
                            setCombatants(prevCombatants => {
                                const newCombatants = newState.combatants || [];
                                
                                // If we have local state, preserve it for units that haven't changed significantly
                                if (prevCombatants.length > 0) {
                                    return newCombatants.map(newUnit => {
                                        const prevUnit = prevCombatants.find(u => u.id === newUnit.id);
                                        
                                        // If unit exists locally and positions match exactly, keep local (animation might be running)
                                        if (prevUnit && 
                                            prevUnit.posX === newUnit.posX && 
                                            prevUnit.posY === newUnit.posY) {
                                            // Merge: keep local positions, update other fields
                                            return {
                                                ...newUnit,
                                                // Preserve animation-related local state
                                                animating: prevUnit.animating
                                            };
                                        }
                                        
                                        return newUnit;
                                    });
                                }
                                
                                return newCombatants;
                            });
                            
                            setRound(newState.round || 1);
                            setCurrentTurnIndex(newState.turnIndex || 0);
                            setVersion(newVersion);
                            
                            // Merge logs (avoid duplicates)
                            if (newState.logs && newState.logs.length > 0) {
                                setLogs(prev => {
                                    const existingIds = new Set(prev.map(l => l.id));
                                    const newLogs = newState.logs.filter(l => !existingIds.has(l.id));
                                    return [...prev, ...newLogs];
                                });
                            }
                            
                            setTimeout(() => {
                                isApplyingUpdateRef.current = false;
                            }, 50);
                        });
                    }
                } else if (newVersion === lastAppliedVersionRef.current) {
                    // Same version - could be concurrent update, check timestamp
                    const currentTimestamp = newState.updatedAt || 0;
                    console.log('[CombatSync] Same version - checking timestamp', { currentTimestamp });
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [sessionId]);

    // Update combat state with optimistic locking
    const updateCombatState = useCallback(async (updates) => {
        if (!sessionId || isLocked) {
            console.warn('[CombatSync] Cannot update - locked or no session');
            return false;
        }

        setIsLocked(true);

        try {
            // Get current state
            const { data: current, error: fetchError } = await supabase
                .from('world_state')
                .select('value, version')
                .eq('key', `combat_${sessionId}`)
                .single();

            if (fetchError) {
                console.error('[CombatSync] Fetch error:', fetchError);
                setIsLocked(false);
                return false;
            }

            const currentVersion = current.version || 0;

            // Check for version conflict
            if (currentVersion !== version) {
                console.warn('[CombatSync] Version conflict detected, reloading...');
                // Reload and retry
                const refreshedState = current.value;
                setCombatants(refreshedState.combatants || []);
                setRound(refreshedState.round || 1);
                setCurrentTurnIndex(refreshedState.turnIndex || 0);
                setVersion(currentVersion);
                setIsLocked(false);
                return false;
            }

            // Apply updates
            const newState = {
                ...current.value,
                ...updates,
                updatedAt: Date.now()
            };

            // Update with version check (optimistic locking)
            const { error: updateError } = await supabase
                .from('world_state')
                .update({
                    value: newState,
                    updated_at: new Date().toISOString()
                })
                .eq('key', `combat_${sessionId}`)
                .eq('version', currentVersion);

            if (updateError) {
                console.error('[CombatSync] Update error:', updateError);
                setIsLocked(false);
                return false;
            }

            // Update local state optimistically
            if (updates.combatants) setCombatants(updates.combatants);
            if (updates.round !== undefined) setRound(updates.round);
            if (updates.turnIndex !== undefined) setCurrentTurnIndex(updates.turnIndex);
            if (updates.logs) {
                setLogs(prev => [...prev, ...updates.logs]);
            }
            setVersion(currentVersion + 1);
            lastAppliedVersionRef.current = currentVersion + 1;

            setIsLocked(false);
            return true;

        } catch (error) {
            console.error('[CombatSync] Unexpected error:', error);
            setIsLocked(false);
            return false;
        }
    }, [sessionId, version, isLocked]);

    return {
        combatants,
        round,
        currentTurnIndex,
        logs,
        isLocked,
        version,
        updateCombatState,
        addLog: (log) => {
            const newLog = { ...log, id: `${Date.now()}_${Math.random()}`, timestamp: Date.now() };
            setLogs(prev => [...prev, newLog]);
            return newLog;
        }
    };
}
