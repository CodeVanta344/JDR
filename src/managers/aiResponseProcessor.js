/**
 * AIResponseProcessor — centralised side-effect handler for AI responses.
 *
 * Every handler that calls the game-master edge function needs to process the
 * same set of optional fields: weather, world_event, reward, combat, merchant,
 * loot, transaction, unlock, stats, item, codex_update, affinity, title, etc.
 *
 * This module replaces the duplicated processing blocks found in:
 *   - handleSubmit
 *   - handleNPCMessage
 *   - handleChallengeResult
 *   - _handleGMInitiative
 *   - onCombatEnd (inline callback)
 */

import { supabase } from '../supabaseClient';

/**
 * @typedef {object} ProcessorContext
 *
 * All the setters/handlers that the processor needs. Each caller builds this
 * from its React state/refs — avoids any hook refactoring.
 *
 * @property {Function} setWeather
 * @property {Function} setActiveLoot
 * @property {Function} setActiveMerchant
 * @property {Function} setPendingTransaction
 * @property {Function} addToChronicle
 * @property {Function} handleExperienceGain
 * @property {Function} handleUnlockAbility
 * @property {Function} handleUpdateStats
 * @property {Function} handleCodexUpdate
 * @property {Function} handleTitleUnlock
 * @property {Function} handleAffinityChange
 * @property {Function} initializeHostCombat
 * @property {Function} addItems            — (items[]) add to inventory
 * @property {Function} addSystemMessage    — (text) append system chat msg
 * @property {Function} syncWeather         — (weather) push to world_state
 * @property {boolean}  isHost
 * @property {string}   [npcName]           — set when in NPC conversation
 * @property {object}   [transactionMeta]   — extra fields for transaction
 */

/**
 * Process all side-effects from an AI response.
 *
 * @param {object} aiResponse — the parsed response from game-master
 * @param {ProcessorContext} ctx — callbacks and meta from the calling handler
 * @returns {{ earlyReturn: boolean }} — if true, the caller should stop further processing
 */
export function processAIResponse(aiResponse, ctx) {
    if (!aiResponse) return { earlyReturn: false };

    // ── Weather ──────────────────────────────────────────────────────────
    if (aiResponse.worldUpdate?.weather) {
        ctx.setWeather(aiResponse.worldUpdate.weather);
        if (ctx.isHost && ctx.syncWeather) {
            ctx.syncWeather(aiResponse.worldUpdate.weather);
        }
    }
    // Shorthand weather (used by _handleGMInitiative and some older responses)
    if (aiResponse.weather && !aiResponse.worldUpdate?.weather) {
        ctx.setWeather(aiResponse.weather);
    }

    // ── World chronicle events ───────────────────────────────────────────
    if (aiResponse.world_event && ctx.addToChronicle) {
        ctx.addToChronicle(aiResponse.world_event);
        ctx.addSystemMessage(`📜 **Chronique :** ${aiResponse.world_event.description}`);
    }

    // ── XP rewards ───────────────────────────────────────────────────────
    if (aiResponse.reward?.xp && ctx.handleExperienceGain) {
        ctx.handleExperienceGain(aiResponse.reward.xp, aiResponse.reward.reason);
    }

    // ── Combat trigger ───────────────────────────────────────────────────
    if (aiResponse.combat?.trigger && ctx.initializeHostCombat) {
        ctx.initializeHostCombat(aiResponse.combat.enemies || []);
    }

    // ── Merchant ─────────────────────────────────────────────────────────
    if (aiResponse.merchant && ctx.setActiveMerchant) {
        ctx.setActiveMerchant(aiResponse.merchant);
    }

    // ── Loot ─────────────────────────────────────────────────────────────
    if (aiResponse.loot && ctx.setActiveLoot) {
        ctx.setActiveLoot(aiResponse.loot);
    }

    // ── Transaction (early-return!) ──────────────────────────────────────
    if (aiResponse.transaction && ctx.setPendingTransaction) {
        ctx.setPendingTransaction({
            ...aiResponse.transaction,
            ...(ctx.transactionMeta || {}),
        });
        return { earlyReturn: true };
    }

    // ── Abilities ────────────────────────────────────────────────────────
    if (aiResponse.unlock && ctx.handleUnlockAbility) {
        ctx.handleUnlockAbility(aiResponse.unlock);
    }

    // ── Stats ────────────────────────────────────────────────────────────
    if (aiResponse.stats && ctx.handleUpdateStats) {
        ctx.handleUpdateStats(aiResponse.stats);
    }

    // ── Items ────────────────────────────────────────────────────────────
    if (aiResponse.item && ctx.addItems) {
        const items = Array.isArray(aiResponse.item) ? aiResponse.item : [aiResponse.item];
        ctx.addItems(items);
    }

    // ── Codex ────────────────────────────────────────────────────────────
    if (aiResponse.codex_update && ctx.handleCodexUpdate) {
        ctx.handleCodexUpdate(aiResponse.codex_update);
    }

    // ── NPC affinity ─────────────────────────────────────────────────────
    if (aiResponse.affinity_change && ctx.npcName && ctx.handleAffinityChange) {
        ctx.handleAffinityChange(ctx.npcName, aiResponse.affinity_change);
    }

    // ── Title unlock ─────────────────────────────────────────────────────
    if (aiResponse.title_unlock && ctx.handleTitleUnlock) {
        ctx.handleTitleUnlock(aiResponse.title_unlock);
    }

    // ── Quest progression ────────────────────────────────────────────────
    if (aiResponse.quest_update && ctx.handleCodexUpdate) {
        const qu = aiResponse.quest_update;
        ctx.handleCodexUpdate({
            type: 'quest',
            id: qu.id || qu.name,
            name: qu.name,
            status: qu.status || 'in_progress', // offered, accepted, in_progress, completed, failed
            description: qu.description,
        });
        if (qu.status === 'completed' && ctx.addSystemMessage) {
            ctx.addSystemMessage(`🏆 Quête terminée : **${qu.name}** !`);
        }
        if (qu.reward && ctx.handleExperienceGain) {
            ctx.handleExperienceGain(qu.reward.xp || 0, `Quête: ${qu.name}`);
        }
    }

    // ── NPC memory ───────────────────────────────────────────────────────
    if (aiResponse.npc_memory && ctx.npcName && ctx.addSystemMessage) {
        // Store NPC memory as a codex entry for future reference
        if (ctx.handleCodexUpdate) {
            ctx.handleCodexUpdate({
                type: 'npc_memory',
                id: `npc_${ctx.npcName}_${Date.now()}`,
                name: ctx.npcName,
                description: aiResponse.npc_memory,
            });
        }
    }

    return { earlyReturn: false };
}
