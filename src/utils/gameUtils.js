import { CLASSES } from '../lore';

// Helper to convert structured data/JSON into immersive narrative text
export const formatAIContent = (data) => {
    if (typeof data === 'string') return data;
    if (Array.isArray(data)) {
        return data.map(item => formatAIContent(item)).join('\n\n');
    }
    if (typeof data === 'object' && data !== null) {
        const translations = {
            name: 'Nom',
            description: 'Description',
            traits: 'Traits',
            details: 'Détails',
            mood: 'Humeur',
            lighting: 'Éclairage',
            color: 'Couleur',
            effect: 'Effet',
            world: 'Monde',
            enemies: 'Ennemis',
            hp: 'PV',
            maxHp: 'PV Max',
            atk: 'ATK',
            portrait: 'Portrait',
            races: 'Races',
            items: 'Objets',
            inventory: 'Inventaire',
            spells: 'Sorts',
            abilities: 'Capacités'
        };

        if (data.name && (data.description || data.traits || data.details)) {
            const val = data.description || data.traits || data.details;
            return `### ${data.name}\n${formatAIContent(val)}`;
        }

        return Object.entries(data)
            .filter(([key]) => !['id', 'created_at', 'session_id', 'role', 'interactive_points', 'image_prompt', 'atmosphere', 'combat', 'challenge'].includes(key))
            .map(([key, val]) => {
                const label = translations[key] || (key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '));
                if (typeof val === 'object') return `**${label}**:\n${formatAIContent(val)}`;
                return `**${label}**: ${val}`;
            })
            .join('\n');
    }
    return String(data);
};

// Helper to calculate total stats including equipment
export const calculateTotalStats = (char, inventoryOverride = null) => {
    if (!char) return {};
    const baseStats = { ...char.stats };
    const inv = inventoryOverride || char.inventory || [];

    inv.filter(i => i.equipped && i.stats).forEach(item => {
        Object.entries(item.stats).forEach(([k, v]) => {
            if (baseStats[k] !== undefined) baseStats[k] += v;
        });
    });
    return baseStats;
};

// Helper to calculate Max Resource based on Class, Level, and Stats
export const calculateMaxResource = (className, level, stats) => {
    const classKey = className.split(' ')[0];
    const classData = CLASSES[classKey];
    if (!classData) return 100;

    const statKey = classData.resourceStat || 'con';
    const statValue = stats[statKey] || 10;
    const statMod = Math.floor((statValue - 10) / 2);

    // Formula: Base 20 + (Level * 5) + (Stat Mod * 5) + (Stat Value)
    return 20 + (level * 5) + (statMod * 5) + statValue;
};
