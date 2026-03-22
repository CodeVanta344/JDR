/**
 * ProgressionManager — pure character progression logic extracted from App.jsx.
 *
 * Handles XP computation, level-up calculations, stat boost application,
 * and ability unlock deduplication.  All functions return data;
 * React state mutations stay in App.jsx.
 */

/** @typedef {import('./types').Player}      Player      */
/** @typedef {import('./types').PlayerStats} PlayerStats */

import { LEVEL_THRESHOLDS, CLASSES } from '../lore';

// ─── XP & Level Up ──────────────────────────────────────────────────────────

/**
 * @typedef {object} LevelUpResult
 * @property {number}   newXp
 * @property {number}   newLevel
 * @property {boolean}  leveledUp
 * @property {number}   newMaxHp
 * @property {number}   newHp
 * @property {string[]} newSpells
 * @property {number}   attributePoints  — total attribute points after level-up
 * @property {string[]} systemMessages   — chat messages to display
 */

/**
 * Compute the result of gaining XP — may trigger one or more level-ups.
 *
 * @param {Player} character
 * @param {number} amount
 * @param {string} [reason]
 * @returns {LevelUpResult}
 */
export function computeExperienceGain(character, amount, reason) {
    const newXp = (character.xp || 0) + amount;
    let newLevel = character.level || 1;
    let leveledUp = false;
    let currentMaxHp = character.max_hp;
    let currentHp = character.hp;
    let currentSpells = [...(character.spells || [])];
    const systemMessages = [];

    while (newLevel < 10 && newXp >= LEVEL_THRESHOLDS[newLevel + 1]) {
        newLevel++;
        leveledUp = true;

        const charClassKey = (character.class || '').split(' ')[0];
        const classData = CLASSES[charClassKey];
        if (classData) {
            const conMod = Math.floor(((character.stats?.con || 10) - 10) / 2);
            const hpGain = Math.max(1, Math.floor(classData.hitDie / 2) + 1 + conMod);
            currentMaxHp += hpGain;
            currentHp += hpGain;

            const unlocked = classData.unlockables?.find((u) => u.level === newLevel);
            let msgContent = `🎉 **NIVEAU SUPÉRIEUR !**\nVous passez **Niveau ${newLevel}** !\n\n💪 **PV Max +${hpGain}**\n✨ **+2 POINTS D'ATTRIBUTS**`;

            if (unlocked) {
                currentSpells.push(unlocked.name);
                msgContent += `\n **Débloqué : ${unlocked.name}**\n*${unlocked.desc}*`;
            }

            systemMessages.push(msgContent);
        }
    }

    if (!leveledUp) {
        systemMessages.push(
            `✨ Gain d'XP : +${amount} ${reason ? `(${reason})` : ''} [Total: ${newXp}/${LEVEL_THRESHOLDS[newLevel + 1] || 'MAX'}]`,
        );
    }

    return {
        newXp,
        newLevel,
        leveledUp,
        newMaxHp: currentMaxHp,
        newHp: currentHp,
        newSpells: currentSpells,
        attributePoints: (character.attribute_points || 0) + (leveledUp ? 2 : 0),
        systemMessages,
    };
}

// ─── Stat Boosts ────────────────────────────────────────────────────────────

/**
 * @typedef {object} StatBoostResult
 * @property {boolean}     changed
 * @property {PlayerStats} newStats
 * @property {string}      message — formatted stat change message
 */

/**
 * Apply stat boosts and produce a system message.
 *
 * @param {PlayerStats}               currentStats
 * @param {Record<string, number>}    statBoosts
 * @returns {StatBoostResult}
 */
export function applyStatBoosts(currentStats, statBoosts) {
    const newStats = { ...currentStats };
    let changed = false;

    Object.entries(statBoosts).forEach(([stat, boost]) => {
        if (newStats[stat] !== undefined && boost !== 0) {
            newStats[stat] += boost;
            changed = true;
        }
    });

    const boostList = Object.entries(statBoosts)
        .filter(([, b]) => b !== 0)
        .map(([s, b]) => `${s.toUpperCase()} ${b > 0 ? '+' : ''}${b}`)
        .join(', ');

    return {
        changed,
        newStats,
        message: `📈 **AMÉLIORATION DES ATTRIBUTS !**\n${boostList}`,
    };
}

// ─── Ability Unlocks ────────────────────────────────────────────────────────

/**
 * Deduplicate new abilities against the character's existing spell list.
 *
 * @param {string[]} currentSpells
 * @param {string[]} abilities
 * @returns {{ updatedSpells: string[], newAbilities: string[] }}
 */
export function deduplicateAbilities(currentSpells, abilities) {
    const existing = new Set(currentSpells || []);
    const newAbilities = (abilities || []).filter((a) => !existing.has(a));
    return {
        updatedSpells: [...(currentSpells || []), ...newAbilities],
        newAbilities,
    };
}
