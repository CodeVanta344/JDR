import { CLASSES } from '../lore';
import { accumulateEffects } from '../lore/character-creation/lifepath';
import { BIRTH_LOCATIONS } from '../lore/character-creation/lifepath/birth/locations';
import { SOCIAL_STATUSES } from '../lore/character-creation/lifepath/birth/social-status';
import { OMENS } from '../lore/character-creation/lifepath/birth/omens';
import { FAMILIES } from '../lore/character-creation/lifepath/childhood/families';
import { EDUCATIONS } from '../lore/character-creation/lifepath/childhood/education';
import { TRAUMAS } from '../lore/character-creation/lifepath/childhood/traumas';
import { TRAININGS } from '../lore/character-creation/lifepath/adolescence/training';
import { EXPLOITS } from '../lore/character-creation/lifepath/adolescence/exploits';
import { ENCOUNTERS } from '../lore/character-creation/lifepath/adolescence/encounters';
import { PROFESSIONS } from '../lore/character-creation/lifepath/young-adult/professions';
import { MOTIVATIONS } from '../lore/character-creation/lifepath/young-adult/motivations';
import { CONNECTIONS } from '../lore/character-creation/lifepath/young-adult/connections';
import { ITEMS_BY_ID } from '../lore/items-catalog';

/**
 * Generates a completely random character with FULL LIFEPATH (12 subcategories).
 * @param {string} sessionId - The current session ID.
 * @param {string} userId - The user's ID.
 * @returns {object} A fully formed character object.
 */
export const generateRandomCharacter = (sessionId, userId) => {
    // Helper: Pick random from array
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // Helper: Roll 4d6 drop lowest
    const roll4d6 = () => {
        const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
        rolls.sort((a, b) => a - b);
        return rolls.slice(1).reduce((a, b) => a + b, 0);
    };
    
    // Helper: Resolve item IDs to full objects
    const resolveItems = (items) => {
        if (!items) return [];
        return items.map(({ itemId, quantity, reason }) => {
            const item = ITEMS_BY_ID[itemId];
            if (!item) return null;
            return { ...item, quantity: quantity || 1, equipped: false, lifepathReason: reason };
        }).filter(Boolean);
    };
    
    // 1. Random Class
    const classNames = Object.keys(CLASSES);
    const randomClass = pick(classNames);
    const classData = CLASSES[randomClass];
    
    // 2. Random Subclass
    const randomSubclass = classData.subclasses ? pick(classData.subclasses) : null;
    
    // 3. Random Lifepath Choices (12 subcategories)
    const lifepathSelection = {
        birth: {
            location: pick(BIRTH_LOCATIONS),
            status: pick(SOCIAL_STATUSES),
            omen: pick(OMENS)
        },
        childhood: {
            family: pick(FAMILIES),
            education: pick(EDUCATIONS),
            trauma: pick(TRAUMAS)
        },
        adolescence: {
            training: pick(TRAININGS),
            exploit: pick(EXPLOITS),
            encounter: pick(ENCOUNTERS)
        },
        youngAdult: {
            profession: pick(PROFESSIONS),
            motivation: pick(MOTIVATIONS),
            connection: pick(CONNECTIONS)
        }
    };
    
    // 4. Accumulate Lifepath Effects
    const lifepathEffects = accumulateEffects(lifepathSelection);
    
    // 5. Roll Base Attributes
    const baseStats = {
        str: roll4d6(),
        dex: roll4d6(),
        con: roll4d6(),
        int: roll4d6(),
        wis: roll4d6(),
        cha: roll4d6()
    };
    
    // 6. Apply Lifepath Bonuses
    const finalStats = {
        str: baseStats.str + (lifepathEffects.final_stats.strength || 0),
        dex: baseStats.dex + (lifepathEffects.final_stats.dexterity || 0),
        con: baseStats.con + (lifepathEffects.final_stats.constitution || 0),
        int: baseStats.int + (lifepathEffects.final_stats.intelligence || 0),
        wis: baseStats.wis + (lifepathEffects.final_stats.wisdom || 0),
        cha: baseStats.cha + (lifepathEffects.final_stats.charisma || 0)
    };
    
    // 7. Random Abilities (3 from class)
    const availableAbilities = classData.initial_ability_options || [];
    const chosenAbilities = [];
    const abilityCount = Math.min(3, availableAbilities.length);
    const shuffled = [...availableAbilities].sort(() => Math.random() - 0.5);
    for (let i = 0; i < abilityCount; i++) {
        chosenAbilities.push(shuffled[i]);
    }
    
    // 8. Random Equipment (first equipment pack)
    const equipment = classData.equipment_packs ? classData.equipment_packs[0] || [] : [];
    
    // 9. Resolve Lifepath Items
    const lifepathItems = resolveItems(lifepathEffects.items);
    
    // 10. Random Name
    const names = ['Aragorn', 'Legolas', 'Gimli', 'Gandalf', 'Frodo', 'Sam', 'Boromir', 'Faramir'];
    const randomName = `${pick(names)}_${Math.floor(Math.random() * 1000)}`;
    
    // 11. Calculate HP
    const conMod = Math.floor((finalStats.con - 10) / 2);
    const maxHp = (classData.hitDie || 8) + 10 + (conMod * 2);
    
    return {
        session_id: sessionId,
        user_id: userId,
        name: randomName,
        class: `${randomClass} (${randomSubclass?.label || 'Voie Standard'})`,
        mechanic: classData.mechanic,
        stats: finalStats,
        gold: Math.floor(100 * (lifepathSelection.birth.status.effects.gold_modifier || 1.0)),
        abilities: chosenAbilities,
        hp: maxHp,
        maxHp: maxHp,
        resource: 100,
        max_resource: 100,
        inventory: [...equipment, ...lifepathItems],
        portrait_url: classData.portrait || '',
        backstory: lifepathEffects.narrative_summary,
        life_path: {
            birth: lifepathSelection.birth.location.label,
            childhood: lifepathSelection.childhood.trauma.label,
            adolescence: lifepathSelection.adolescence.training.label,
            adult: lifepathSelection.youngAdult.profession.label
        },
        mechanical_traits: lifepathEffects.all_traits,
        skill_bonuses: lifepathEffects.skills || [],
        backstory_gm_context: lifepathEffects.narrative_summary,
        starting_reputation: Object.fromEntries(lifepathEffects.reputation_map),
        visited_npcs: [],
        faction_ties: [],
        discovered_secrets: [],
        discovered_locations: [],
        active_quests: [],
        important_events: [],
        languages: lifepathEffects.languages || ['Commun'],
        is_ready: true,
        level: 1,
        xp: 0
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
