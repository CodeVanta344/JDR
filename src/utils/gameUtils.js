import { CLASSES, ENRICHED_BACKSTORIES } from '../lore';

/**
 * Generates a completely random character for debug/testing purposes.
 * @param {string} sessionId - The current session ID.
 * @param {string} userId - The user's ID.
 * @returns {object} A fully formed character object.
 */
export const generateRandomCharacter = (sessionId, userId) => {
    const classKeys = Object.keys(CLASSES);
    const charClassKey = classKeys[Math.floor(Math.random() * classKeys.length)];
    const classData = CLASSES[charClassKey];

    const subclassKeys = Object.keys(classData.subclasses);
    const subclassName = subclassKeys[Math.floor(Math.random() * subclassKeys.length)];

    // Roll Stats (4d6 drop lowest)
    const rollStat = () => {
        const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
        rolls.sort((a, b) => b - a);
        return rolls[0] + rolls[1] + rolls[2];
    };

    const stats = {
        str: rollStat(),
        dex: rollStat(),
        con: rollStat(),
        int: rollStat(),
        wis: rollStat(),
        cha: rollStat()
    };

    // Pick compatible backstory
    const compatibleBackstories = ENRICHED_BACKSTORIES.filter(b => b.compatible_classes.includes(charClassKey));
    const backstory = compatibleBackstories[Math.floor(Math.random() * compatibleBackstories.length)] || ENRICHED_BACKSTORIES[0];

    // Pick a random starting equipment set
    const equipmentOption = classData.starting_equipment_options[Math.floor(Math.random() * classData.starting_equipment_options.length)];
    const inventory = equipmentOption.items.map(item => ({ ...item, id: crypto.randomUUID() }));

    // Pick 2 random abilities from options
    const abilities = [];
    const options = [...classData.initial_ability_options];
    for (let i = 0; i < 2; i++) {
        if (options.length > 0) {
            const idx = Math.floor(Math.random() * options.length);
            abilities.push(options[idx].name);
            options.splice(idx, 1);
        }
    }

    const maxHp = classData.hitDie + Math.floor((stats.con - 10) / 2);
    const maxRes = 20 + 5 + Math.floor((stats[classData.resourceStat || 'con'] - 10) / 2) * 5 + stats[classData.resourceStat || 'con'];

    return {
        name: `Héros_${Math.floor(Math.random() * 1000)}`,
        class: `${charClassKey} (${classData.subclasses[subclassName].label})`,
        hp: maxHp,
        max_hp: maxHp,
        inventory: inventory,
        stats: { ...stats, mechanic: classData.mechanic },
        abilities: abilities,
        spells: [], // Some classes might have separate spells but initial_ability_options covers them for now
        portrait_url: classData.portrait,
        resource: maxRes,
        max_resource: maxRes,
        level: 1,
        xp: 0,
        gold: 100,
        backstory: backstory.label,
        backstory_gm_context: backstory.desc,
        starting_reputation: backstory.starting_reputation || {},
        session_id: sessionId,
        user_id: userId,
        is_ready: true
    };
};

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
// Helper to get fully resolved ability objects from class lore
export const resolvePlayerAbilities = (player) => {
    const charClass = player.class?.split(' ')[0] || "Guerrier";
    const classData = CLASSES[charClass];
    if (!classData) return [];

    const baseAbilities = classData.initial_ability_options || classData.abilities || [];
    const classUnlockables = classData.unlockables || [];

    const playerSpells = Array.isArray(player.spells) ? player.spells : [];
    const playerAbilities = Array.isArray(player.abilities) ? player.abilities : [];

    let combinedAbilities = [...playerAbilities, ...playerSpells].map(spell => {
        const spellName = typeof spell === 'string' ? spell : (spell?.name || "Attaque");
        const fromInitial = baseAbilities.find(a => a.name === spellName);
        const fromUnlockables = classUnlockables.find(u => u.name === spellName);
        const fullAbility = fromInitial || fromUnlockables;

        if (fullAbility) {
            return { ...fullAbility, range: fullAbility.range || 2 };
        }
        if (typeof spell === 'object' && spell.name) {
            return { ...spell, range: spell.range || 2 };
        }
        return { name: spellName, desc: "Capacité", cost: 10, range: 2 };
    });

    if (combinedAbilities.length === 0) {
        combinedAbilities = baseAbilities.map(a => ({ ...a, range: a.range || 2 }));
    }
    return combinedAbilities;
};
// Helper to generate decor for the combat arena
export const generateArenaDecor = (arenaConfig) => {
    const decorTypes = [
        { name: 'Éclat de Vide', color: 'var(--aether-blue)', size: 40 },
        { name: 'Pilier d\'Obsidienne', color: '#111', size: 60 },
        { name: 'Rune Ancienne', color: 'var(--gold-dim)', size: 30 }
    ];

    const maxX = Math.floor(arenaConfig.blocksX / 2);
    const maxY = Math.floor(arenaConfig.blocksY / 2);

    return Array.from({ length: 5 }).map((_, i) => {
        const x = Math.floor(Math.random() * (arenaConfig.blocksX - 2)) - Math.floor(arenaConfig.blocksX / 2) + 1;
        const y = Math.floor(Math.random() * (arenaConfig.blocksY - 2)) - Math.floor(arenaConfig.blocksY / 2) + 1;

        return {
            id: `decor-${i}`,
            ...decorTypes[Math.floor(Math.random() * decorTypes.length)],
            posX: x,
            posY: y
        };
    });
};
