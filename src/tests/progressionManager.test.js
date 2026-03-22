import { describe, it, expect } from 'vitest';
import {
    computeExperienceGain,
    applyStatBoosts,
    deduplicateAbilities,
} from '../managers/progressionManager';

// ─── computeExperienceGain ──────────────────────────────────────────────────

describe('computeExperienceGain', () => {
    const baseChar = {
        xp: 0, level: 1, max_hp: 50, hp: 50,
        spells: ['Frappe Héroïque'],
        attribute_points: 0,
        class: 'Guerrier',
        stats: { str: 14, dex: 12, con: 14, int: 10, wis: 10, cha: 10 },
    };

    it('adds XP without leveling up', () => {
        const result = computeExperienceGain(baseChar, 50, 'quête mineure');
        expect(result.newXp).toBe(50);
        expect(result.leveledUp).toBe(false);
        expect(result.newLevel).toBe(1);
        expect(result.systemMessages).toHaveLength(1);
        expect(result.systemMessages[0]).toContain('+50');
        expect(result.systemMessages[0]).toContain('quête mineure');
    });

    it('levels up when XP threshold is reached', () => {
        const char = { ...baseChar, xp: 290 }; // threshold for level 2 is ~300
        const result = computeExperienceGain(char, 100);
        // Should at least hit level 2
        expect(result.leveledUp).toBe(true);
        expect(result.newLevel).toBeGreaterThanOrEqual(2);
        expect(result.newMaxHp).toBeGreaterThan(50);
        expect(result.newHp).toBeGreaterThan(50);
        expect(result.attributePoints).toBe(2);
        expect(result.systemMessages.some(m => m.includes('NIVEAU SUPÉRIEUR'))).toBe(true);
    });

    it('preserves existing spells on level-up', () => {
        const char = { ...baseChar, xp: 290 };
        const result = computeExperienceGain(char, 100);
        expect(result.newSpells).toContain('Frappe Héroïque');
    });

    it('handles zero XP gracefully (returns base state)', () => {
        const result = computeExperienceGain(baseChar, 0);
        // amount is 0, so in App.jsx the guard would fire, but the function still works
        expect(result.newXp).toBe(0);
        expect(result.leveledUp).toBe(false);
    });
});

// ─── applyStatBoosts ────────────────────────────────────────────────────────

describe('applyStatBoosts', () => {
    const baseStats = { str: 10, dex: 12, con: 14, int: 8, wis: 10, cha: 10 };

    it('applies positive boosts correctly', () => {
        const { changed, newStats, message } = applyStatBoosts(baseStats, { str: 2, dex: 1 });
        expect(changed).toBe(true);
        expect(newStats.str).toBe(12);
        expect(newStats.dex).toBe(13);
        expect(message).toContain('STR +2');
        expect(message).toContain('DEX +1');
    });

    it('ignores boosts to non-existent stats', () => {
        const { changed, newStats } = applyStatBoosts(baseStats, { luck: 5 });
        expect(changed).toBe(false);
        expect(newStats).toEqual(baseStats);
    });

    it('ignores zero boosts', () => {
        const { changed } = applyStatBoosts(baseStats, { str: 0, dex: 0 });
        expect(changed).toBe(false);
    });

    it('does not mutate original stats', () => {
        const original = { ...baseStats };
        applyStatBoosts(baseStats, { str: 3 });
        expect(baseStats).toEqual(original);
    });
});

// ─── deduplicateAbilities ───────────────────────────────────────────────────

describe('deduplicateAbilities', () => {
    it('filters out already-known abilities', () => {
        const { updatedSpells, newAbilities } = deduplicateAbilities(
            ['Fireball', 'Shield'],
            ['Shield', 'Heal'],
        );
        expect(newAbilities).toEqual(['Heal']);
        expect(updatedSpells).toEqual(['Fireball', 'Shield', 'Heal']);
    });

    it('returns all when none exist', () => {
        const { newAbilities } = deduplicateAbilities([], ['A', 'B']);
        expect(newAbilities).toEqual(['A', 'B']);
    });

    it('returns empty when all already known', () => {
        const { newAbilities } = deduplicateAbilities(['A', 'B'], ['A', 'B']);
        expect(newAbilities).toEqual([]);
    });

    it('handles null/undefined inputs', () => {
        const { newAbilities } = deduplicateAbilities(null, ['X']);
        expect(newAbilities).toEqual(['X']);
    });
});
