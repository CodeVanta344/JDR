/**
 * InventoryManager — pure inventory logic extracted from App.jsx.
 *
 * Contains equipment slot inference, class proficiency checks,
 * and consumable item application.  All functions are pure or
 * return data — React state mutations stay in App.jsx.
 */

/** @typedef {import('./types').Player}        Player        */
/** @typedef {import('./types').InventoryItem}  InventoryItem */

import { EQUIPMENT_RULES } from '../lore';

// ─── Slot Inference ─────────────────────────────────────────────────────────

/** @type {Array<[string[], string]>} keyword→slot mapping */
const SLOT_KEYWORDS = [
    [['amulette', 'collier', 'medal'], 'neck'],
    [['anneau', 'bague'], 'finger'],
    [['cape', 'manteau'], 'back'],
    [['botte', 'chaussure'], 'feet'],
    [['gant', 'moufle'], 'hands'],
    [['casque', 'coiffe', 'chapeau'], 'head'],
    [['ceinture'], 'waist'],
    [['armure', 'plastron', 'robe', 'tunique'], 'body'],
    [['bouclier'], 'offhand'],
];

/**
 * Infer the equipment slot from an item's `type` string.
 * @param {string|undefined} type
 * @returns {string|null}
 */
export function inferSlot(type) {
    if (!type) return null;
    const lower = type.toLowerCase();
    for (const [keywords, slot] of SLOT_KEYWORDS) {
        if (keywords.some((kw) => lower.includes(kw))) return slot;
    }
    return null;
}

// ─── Proficiency Check ──────────────────────────────────────────────────────

/**
 * Check whether a character class can equip a given item.
 * @param {string}        className — e.g. "Guerrier", "Mage Élémentaire"
 * @param {InventoryItem} item
 * @returns {{ canEquip: boolean, reason: string }}
 */
export function checkProficiency(className, item) {
    const charClass = (className || '').split(' ')[0];
    const rules = EQUIPMENT_RULES?.class_proficiency?.[charClass];
    if (!rules) return { canEquip: true, reason: '' };

    const { type, category } = item;

    if (type === 'armor' && !rules.armor.includes(category)) {
        return {
            canEquip: false,
            reason: `Votre classe (${charClass}) ne peut pas porter d'armure de type ${category}.`,
        };
    }

    if (type === 'weapon' && !rules.weapons.includes(category)) {
        return {
            canEquip: false,
            reason: `Votre classe (${charClass}) ne peut pas manier d'armes de type ${category}.`,
        };
    }

    // Mage-specific heavy armor restriction
    if (charClass === 'Mage' && type === 'armor' && category === 'heavy') {
        return {
            canEquip: false,
            reason: "Un Mage ne peut pas canaliser la magie en armure lourde.",
        };
    }

    return { canEquip: true, reason: '' };
}

// ─── Equip / Unequip ────────────────────────────────────────────────────────

/**
 * Produce a new inventory array with the item at `index` toggled.
 * When equipping, items in the same slot are automatically unequipped.
 *
 * @param {InventoryItem[]} inventory
 * @param {number}          index
 * @returns {InventoryItem[]}
 */
export function toggleEquipItem(inventory, index) {
    const item = inventory[index];
    if (!item) return inventory;

    // Unequipping is always allowed
    if (item.equipped) {
        return inventory.map((it, i) =>
            i === index ? { ...it, equipped: false } : it,
        );
    }

    // Equipping — resolve slot
    const slot = item.slot || inferSlot(item.type);

    if (!slot) {
        // No slot — simple toggle
        return inventory.map((it, i) =>
            i === index ? { ...it, equipped: true } : it,
        );
    }

    // Equip + unequip conflicting slot
    return inventory.map((it, i) => {
        if (i === index) return { ...it, equipped: true, slot };

        if (!it.equipped) return it;

        // Check if existing equipped item occupies the same slot
        const otherSlot = it.slot || inferSlot(it.type);
        if (otherSlot === slot) return { ...it, equipped: false };

        return it;
    });
}

// ─── Consumable Application ─────────────────────────────────────────────────

/**
 * Compute the effects of consuming an item.
 * Returns updated hp / resource values and a chat message, or null if not consumable.
 *
 * @param {InventoryItem} item
 * @param {number}        index
 * @param {Player}        character
 * @returns {{ newHp: number|null, newResource: number|null, message: string, newInventory: InventoryItem[] } | null}
 */
export function computeConsumeEffect(item, index, character) {
    if (!item?.stats) return null;

    let newHp = null;
    let newResource = null;
    let msg = '';
    let used = false;

    if (item.stats.heal) {
        newHp = Math.min(character.max_hp, character.hp + item.stats.heal);
        msg = `🧪 Vous buvez **${item.name}** et récupérez **${item.stats.heal} PV** (${newHp}/${character.max_hp}).`;
        used = true;
    }

    if (item.stats.resource) {
        newResource = Math.min(
            character.max_resource,
            (character.resource || 0) + item.stats.resource,
        );
        msg = `🧪 Vous utilisez **${item.name}** et récupérez **${item.stats.resource}** points de ressource.`;
        used = true;
    }

    if (!used) return null;

    const newInventory = [...character.inventory];
    newInventory.splice(index, 1);

    return { newHp, newResource, message: msg, newInventory };
}

// ─── Item Share Formatting ──────────────────────────────────────────────────

const RARITY_COLORS = {
    common: '#888',
    uncommon: '#4cd137',
    rare: '#54a0ff',
    epic: '#9b59b6',
    legendary: '#f39c12',
    artifact: '#e74c3c',
};

/**
 * Build a share-to-chat payload for an item.
 * @param {object} itemData — item detail object from the UI
 * @param {Player} character
 * @param {string} sessionId
 * @returns {object} shareMsg ready for state / DB
 */
export function buildItemSharePayload(itemData, character, sessionId) {
    const rarityColor = RARITY_COLORS[itemData.rarity?.toLowerCase()] || '#aaa';
    const rarityLabel = itemData.rarity?.toUpperCase() || 'COMMON';

    let statsText = '';
    if (itemData.stats && Object.keys(itemData.stats).length > 0) {
        statsText = Object.entries(itemData.stats)
            .map(([key, val]) => `${key}: ${typeof val === 'number' && val > 0 ? '+' : ''}${val}`)
            .join(' | ');
    }

    let effectsText = '';
    if (itemData.effects?.length > 0) {
        effectsText = itemData.effects.map((e) => e.description).join('\n');
    }

    return {
        id: crypto.randomUUID(),
        session_id: sessionId,
        player: character.name,
        item: {
            name: itemData.name,
            type: itemData.itemType,
            rarity: itemData.rarity,
            description: itemData.description,
            stats: statsText,
            effects: effectsText,
            equipped: itemData.equipped,
            rarityColor,
            rarityLabel,
        },
        created_at: new Date().toISOString(),
    };
}
