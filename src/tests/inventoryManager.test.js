import { describe, it, expect } from 'vitest';
import {
    inferSlot,
    checkProficiency,
    toggleEquipItem,
    computeConsumeEffect,
    buildItemSharePayload,
} from '../managers/inventoryManager';

// ─── inferSlot ──────────────────────────────────────────────────────────────

describe('inferSlot', () => {
    it('returns "neck" for amulette type', () => {
        expect(inferSlot('Amulette magique')).toBe('neck');
    });
    it('returns "body" for armure type', () => {
        expect(inferSlot('Armure de mithril')).toBe('body');
    });
    it('returns "offhand" for bouclier', () => {
        expect(inferSlot('Grand Bouclier')).toBe('offhand');
    });
    it('returns "head" for casque', () => {
        expect(inferSlot('Casque de fer')).toBe('head');
    });
    it('returns null for unknown type', () => {
        expect(inferSlot('Potion de vie')).toBeNull();
    });
    it('returns null for undefined', () => {
        expect(inferSlot(undefined)).toBeNull();
    });
});

// ─── checkProficiency ───────────────────────────────────────────────────────

describe('checkProficiency', () => {
    it('allows Guerrier to equip heavy armor', () => {
        const result = checkProficiency('Guerrier', { type: 'armor', category: 'heavy' });
        expect(result.canEquip).toBe(true);
    });
    it('blocks Mage from heavy armor', () => {
        const result = checkProficiency('Mage Élémentaire', { type: 'armor', category: 'heavy' });
        expect(result.canEquip).toBe(false);
        expect(result.reason).toContain('Mage');
    });
    it('allows equip when class has no proficiency rules', () => {
        const result = checkProficiency('UnknownClass', { type: 'weapon', category: 'exotic' });
        expect(result.canEquip).toBe(true);
    });
});

// ─── toggleEquipItem ────────────────────────────────────────────────────────

describe('toggleEquipItem', () => {
    it('equips an unequipped item', () => {
        const inv = [{ name: 'Épée', equipped: false, type: 'weapon' }];
        const result = toggleEquipItem(inv, 0);
        expect(result[0].equipped).toBe(true);
    });

    it('unequips an equipped item', () => {
        const inv = [{ name: 'Épée', equipped: true, type: 'weapon' }];
        const result = toggleEquipItem(inv, 0);
        expect(result[0].equipped).toBe(false);
    });

    it('unequips conflicting slot when equipping', () => {
        const inv = [
            { name: 'Amulette A', equipped: true, type: 'Amulette', slot: 'neck' },
            { name: 'Amulette B', equipped: false, type: 'Amulette' },
        ];
        const result = toggleEquipItem(inv, 1);
        expect(result[0].equipped).toBe(false); // old unequipped
        expect(result[1].equipped).toBe(true);   // new equipped
    });

    it('returns same array for invalid index', () => {
        const inv = [{ name: 'Potion', equipped: false }];
        const result = toggleEquipItem(inv, 5);
        expect(result).toEqual(inv);
    });
});

// ─── computeConsumeEffect ───────────────────────────────────────────────────

describe('computeConsumeEffect', () => {
    const baseChar = {
        hp: 50, max_hp: 100, resource: 20, max_resource: 50,
        inventory: [
            { name: 'Potion de soin', stats: { heal: 30 } },
            { name: 'Élixir de mana', stats: { resource: 15 } },
            { name: 'Pain', stats: {} },
        ],
    };

    it('heals correctly and caps at max_hp', () => {
        const result = computeConsumeEffect(baseChar.inventory[0], 0, baseChar);
        expect(result.newHp).toBe(80);
        expect(result.newInventory).toHaveLength(2);
        expect(result.message).toContain('30 PV');
    });

    it('restores resource correctly', () => {
        const result = computeConsumeEffect(baseChar.inventory[1], 1, baseChar);
        expect(result.newResource).toBe(35);
        expect(result.message).toContain('15');
    });

    it('returns null for non-consumable', () => {
        expect(computeConsumeEffect(baseChar.inventory[2], 2, baseChar)).toBeNull();
    });

    it('returns null when item has no stats', () => {
        expect(computeConsumeEffect({ name: 'Rock' }, 0, baseChar)).toBeNull();
    });
});

// ─── buildItemSharePayload ──────────────────────────────────────────────────

describe('buildItemSharePayload', () => {
    it('formats rarity and stats correctly', () => {
        const itemData = {
            name: 'Lame Ardente',
            itemType: 'weapon',
            rarity: 'legendary',
            description: 'Brûle les ennemis',
            stats: { atk: 12, fire: 5 },
            effects: [{ description: 'Inflige brûlure' }],
            equipped: true,
        };
        const char = { name: 'Aldric' };
        const result = buildItemSharePayload(itemData, char, 'session-123');

        expect(result.player).toBe('Aldric');
        expect(result.session_id).toBe('session-123');
        expect(result.item.rarityLabel).toBe('LEGENDARY');
        expect(result.item.rarityColor).toBe('#f39c12');
        expect(result.item.stats).toContain('atk: +12');
        expect(result.item.effects).toContain('brûlure');
        expect(result.id).toBeDefined();
    });
});
