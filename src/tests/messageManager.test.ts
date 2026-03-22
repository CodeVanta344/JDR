import { describe, it, expect } from 'vitest';
import {
    buildGameMasterPayload,
    isTrivialChallenge,
    isValidChallengeInput,
    resolveNextPhase,
} from '../managers/messageManager';

// ─── resolveNextPhase ───────────────────────────────────────────────────────

describe('resolveNextPhase', () => {
    it('transitions INTRO → EXPLORATION at >10 messages', () => {
        expect(resolveNextPhase('INTRO', 11)).toBe('EXPLORATION');
        expect(resolveNextPhase('INTRO', 50)).toBe('EXPLORATION');
    });

    it('stays INTRO at ≤10 messages', () => {
        expect(resolveNextPhase('INTRO', 10)).toBeNull();
        expect(resolveNextPhase('INTRO', 0)).toBeNull();
    });

    it('transitions EXPLORATION → DRAMA at >35 messages', () => {
        expect(resolveNextPhase('EXPLORATION', 36)).toBe('DRAMA');
        expect(resolveNextPhase('EXPLORATION', 100)).toBe('DRAMA');
    });

    it('stays EXPLORATION at ≤35 messages', () => {
        expect(resolveNextPhase('EXPLORATION', 35)).toBeNull();
        expect(resolveNextPhase('EXPLORATION', 20)).toBeNull();
    });

    it('returns null for DRAMA (no further phase)', () => {
        expect(resolveNextPhase('DRAMA', 999)).toBeNull();
    });
});

// ─── isValidChallengeInput ──────────────────────────────────────────────────

describe('isValidChallengeInput', () => {
    it('accepts normal text', () => {
        expect(isValidChallengeInput('Je lis le panneau')).toBe(true);
        expect(isValidChallengeInput('abc')).toBe(true);
    });

    it('rejects empty / short / no-alpha input', () => {
        expect(isValidChallengeInput('')).toBe(false);
        expect(isValidChallengeInput('ab')).toBe(false);
        expect(isValidChallengeInput('!!!!')).toBe(false);
        expect(isValidChallengeInput('123')).toBe(false);
        expect(isValidChallengeInput(null)).toBe(false);
        expect(isValidChallengeInput(undefined)).toBe(false);
    });
});

// ─── isTrivialChallenge ─────────────────────────────────────────────────────

describe('isTrivialChallenge', () => {
    it('detects trivial perception checks (reading a sign)', () => {
        expect(isTrivialChallenge(
            { label: 'Lire le panneau indicateur', stat: 'perception', dc: 20 },
            'je lis le panneau',
        )).toBe(true);
    });

    it('detects trivial intelligence checks (observing)', () => {
        expect(isTrivialChallenge(
            { label: 'Observer la salle', stat: 'intelligence', dc: 15 },
            'je regarde autour de moi',
        )).toBe(true);
    });

    it('returns false for non-trivial stat checks', () => {
        expect(isTrivialChallenge(
            { label: 'Crocheter la serrure', stat: 'dexterity', dc: 40 },
            'je crochète la porte',
        )).toBe(false);
    });

    it('returns false for perception checks with non-trivial labels', () => {
        expect(isTrivialChallenge(
            { label: 'Détecter le piège caché', stat: 'perception', dc: 50 },
            'je cherche des pièges',
        )).toBe(false);
    });

    it('handles missing fields gracefully', () => {
        expect(isTrivialChallenge({}, '')).toBe(false);
        expect(isTrivialChallenge({ label: null, stat: null }, 'test')).toBe(false);
    });
});

// ─── buildGameMasterPayload ─────────────────────────────────────────────────

describe('buildGameMasterPayload', () => {
    const baseParams = {
        content: 'Je parle au marchand',
        messages: [
            { id: '1', role: 'user', content: 'Bonjour' },
            { id: '2', role: 'assistant', content: 'Bienvenue !' },
            { id: 'temp-intro', role: 'system', content: 'Intro' },
        ],
        tempId: 'temp-123',
        sessionId: 'sess-1',
        playerId: 'player-1',
        gamePhase: 'EXPLORATION',
        gameTime: 14,
        timeLabel: 'Après-midi',
        weather: { condition: 'clear', temp: 20 },
        character: {
            name: 'Aldric',
            class: 'Guerrier',
            level: 3,
            stats: { strength: 16, perception: 12 },
            inventory: [],
            backstory_gm_context: 'A former soldier',
            visited_npcs: ['Eldara'],
            discovered_locations: ['Taverne'],
            active_quests: [],
            discovered_secrets: [],
            important_events: [],
            discovered_visuals: [],
        },
        chronicle: [],
        loreModules: {
            WORLD_CONTEXT: 'Aethelgard world',
            ENVIRONMENTAL_RULES: 'Medieval fantasy',
            BESTIARY: { goblin: {} },
            BESTIARY_EXTENDED: { dragon: {} },
            CLASSES: { guerrier: {} },
            NPC_TEMPLATES: {},
            QUEST_HOOKS: {},
            TAVERNS_AND_LOCATIONS: {},
            RUMORS_AND_GOSSIP: {},
            RANDOM_ENCOUNTERS: {},
            WORLD_MYTHS_EXTENDED: {},
            LEGENDARY_ITEMS: {},
            FACTION_LORE: {},
        },
    };

    it('builds correct top-level fields', () => {
        const payload = buildGameMasterPayload(baseParams);
        expect(payload.action).toBe('Je parle au marchand');
        expect(payload.sessionId).toBe('sess-1');
        expect(payload.playerId).toBe('player-1');
        expect(payload.gamePhase).toBe('EXPLORATION');
        expect(payload.context).toBe('WORLD_INTERACTION');
        expect(payload.gameTime).toBe(14);
        expect(payload.timeLabel).toBe('Après-midi');
    });

    it('filters out temp-intro and tempId from history', () => {
        const payload = buildGameMasterPayload(baseParams);
        const ids = payload.history.map((m) => m.content);
        expect(ids).not.toContain('Intro');
        expect(payload.history.length).toBe(2); // only Bonjour + Bienvenue
    });

    it('caps history to 15 messages', () => {
        const manyMessages = Array.from({ length: 30 }, (_, i) => ({
            id: `msg-${i}`,
            role: 'user',
            content: `Message ${i}`,
        }));
        const payload = buildGameMasterPayload({ ...baseParams, messages: manyMessages });
        expect(payload.history.length).toBeLessThanOrEqual(15);
    });

    it('builds playerProfile from character', () => {
        const payload = buildGameMasterPayload(baseParams);
        expect(payload.playerProfile.name).toBe('Aldric');
        expect(payload.playerProfile.class).toBe('Guerrier');
        expect(payload.playerProfile.level).toBe(3);
    });

    it('includes codex_data', () => {
        const payload = buildGameMasterPayload(baseParams);
        expect(payload.codex_data.visited_npcs).toEqual(['Eldara']);
        expect(payload.codex_data.discovered_locations).toEqual(['Taverne']);
    });

    it('includes challenge_guidance with both arrays', () => {
        const payload = buildGameMasterPayload(baseParams);
        expect(payload.challenge_guidance.require_roll_for.length).toBeGreaterThan(0);
        expect(payload.challenge_guidance.no_roll_for.length).toBeGreaterThan(0);
    });

    it('merges bestiary into lore', () => {
        const payload = buildGameMasterPayload(baseParams);
        expect(payload.lore.bestiary).toHaveProperty('goblin');
        expect(payload.lore.bestiary).toHaveProperty('dragon');
    });
});
