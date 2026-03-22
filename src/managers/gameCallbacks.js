/**
 * GameCallbacks — factory functions for large inline JSX callbacks.
 *
 * Extracts the 3 biggest inline callbacks from App.jsx's render tree:
 *   - CombatManager  onCombatEnd (~72 lines)
 *   - MerchantModal  onClose     (~42 lines)
 *   - Settings modal Save Game   (~35 lines)
 */

import { supabase } from '../supabaseClient';
import { formatAIContent } from '../utils/gameUtils';
import { processAIResponse } from './aiResponseProcessor';

// ─── Combat End Handler ──────────────────────────────────────────────────────

/**
 * Build the onCombatEnd callback for CombatManager.
 *
 * @param {object} deps — React state, setters, and refs
 * @returns {(result: object) => Promise<void>}
 */
export function buildCombatEndHandler(deps) {
    const {
        session, character, profile, players, messages, combatEnemies,
        setCombatMode, setCombatEnemies, setSyncedCombatState,
        setPendingCombat, setActiveChallenge,
        hasFledRef, setMessages,
        handleExperienceGain, setActiveLoot, handleUpdateInventory,
        handleCodexUpdate, handleUpdateStats,
        loreModules,
    } = deps;

    return async (result) => {
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
            supabase.from('world_state').upsert({
                key: `combat_${session.id}`,
                value: { active: false },
            });
        }

        // 3. Ask the GM to narrate the combat outcome
        const defeatedNames = (result?.defeatedEnemies || combatEnemies || [])
            .map(e => e.name)
            .join(', ');
        let outcome = result?.victory ? 'VICTOIRE' : 'DEFAITE';
        if (result?.flight) outcome = 'FUITE';
        if (result?.cancelled) return; // Silent close

        const postCombatAction =
            '[SYSTEM] COMBAT TERMINE. Issue: ' + outcome +
            (defeatedNames ? '. Ennemis vaincus: ' + defeatedNames : '') +
            ". Decris l'issue du combat et attribue les recompenses (XP, Loot) si victoire.";

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
                    lore: loreModules,
                    playerGroup: players.map(p => ({ name: p.name, class: p.class })),
                },
            });

            // 4. Process GM response for rewards and world changes
            if (aiResponse) {
                processAIResponse(aiResponse, {
                    setWeather: deps.setWeather,
                    handleExperienceGain,
                    setActiveLoot,
                    handleCodexUpdate,
                    handleUpdateStats,
                    addItems: (items) => handleUpdateInventory([...(character.inventory || []), ...items]),
                    isHost: session.host_id === profile.id,
                });

                // Narrative feedback
                if (aiResponse.narrative) {
                    const gmMsg = {
                        id: crypto.randomUUID(),
                        session_id: session.id,
                        role: 'assistant',
                        content: aiResponse.narrative,
                        created_at: new Date().toISOString(),
                    };
                    setMessages(prev => [...prev, gmMsg]);
                    await supabase.from('messages').insert({ ...gmMsg, session_id: session.id });
                }
            }
        } catch (e) {
            console.error('Post-combat narrative error:', e);
        }
    };
}

// ─── Merchant Close Handler ──────────────────────────────────────────────────

/**
 * Build the onClose callback for MerchantModal.
 *
 * @param {object} deps
 * @returns {() => Promise<void>}
 */
export function buildMerchantCloseHandler(deps) {
    const {
        session, character, activeMerchant,
        setActiveMerchant, addMessage, handleSubmit,
    } = deps;

    return async () => {
        const merchantName = activeMerchant?.npcName || 'le marchand';

        // 1. Close locally first to prevent UI flicker
        setActiveMerchant(null);

        try {
            // 2. Fetch current state to handle synchronization
            const { data } = await supabase
                .from('world_state')
                .select('value')
                .eq('key', `merchant_${session.id}`)
                .single();
            const currentMerchant = data?.value;

            if (currentMerchant && currentMerchant.active) {
                // 3. Remove self from visitors
                const currentVisitors = currentMerchant.visitors || [];
                const newVisitors = currentVisitors.filter(id => id !== character.id);

                if (newVisitors.length > 0) {
                    // Others remain — just update the list
                    await supabase.from('world_state').upsert({
                        key: `merchant_${session.id}`,
                        value: { ...currentMerchant, visitors: newVisitors },
                    });
                    addMessage({
                        role: 'system',
                        content: `🚪 **${character.name}** quitte la boutique.`,
                        timestamp: Date.now(),
                    });
                } else {
                    // Last one out — close shop and trigger narrative
                    await supabase.from('world_state').upsert({
                        key: `merchant_${session.id}`,
                        value: { ...currentMerchant, active: false, visitors: [] },
                    });
                    handleSubmit(null, `[FIN DE COMMERCE] Le groupe quitte ${merchantName}. Décris notre sortie.`);
                }
            }
        } catch (e) {
            console.error('Merchant Close Error', e);
        }
    };
}

// ─── Save Game Handler ───────────────────────────────────────────────────────

/**
 * Build the onClick callback for the Save Game button.
 *
 * @param {object} deps
 * @returns {() => Promise<void>}
 */
export function buildSaveGameHandler(deps) {
    const {
        session, profile, players, messages, gameTime, weather, adventureStarted,
        setLoading, setSavedGames, gameAlert,
    } = deps;

    return async () => {
        try {
            setLoading(true);
            const saveData = {
                sessionId: session.id,
                hostId: profile.id,
                timestamp: new Date().toISOString(),
                players,
                messages,
                gameTime,
                weather,
                adventureStarted,
            };
            await supabase.from('world_state').upsert({
                key: `save_${session.id}`,
                value: saveData,
                updated_at: new Date().toISOString(),
            });
            const newSave = {
                id: `save_${session.id}`,
                sessionId: session.id,
                host_name: players?.[0]?.name || 'MJ',
                timestamp: new Date().toISOString(),
                playerCount: players?.length || 0,
                saveData,
            };
            setSavedGames(prev => [newSave, ...prev.filter(s => s.sessionId !== session.id)]);
            gameAlert('💾 Partie sauvegardée avec succès !', 'Succès');
        } catch (err) {
            console.error('Save error:', err);
            gameAlert('❌ Erreur lors de la sauvegarde', 'Erreur');
        } finally {
            setLoading(false);
        }
    };
}
