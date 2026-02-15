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
    const loc = pick(BIRTH_LOCATIONS);
    const status = pick(SOCIAL_STATUSES);
    const omen = pick(OMENS);
    const family = pick(FAMILIES);
    const education = pick(EDUCATIONS);
    const trauma = pick(TRAUMAS);
    const training = pick(TRAININGS);
    const exploit = pick(EXPLOITS);
    const encounter = pick(ENCOUNTERS);
    const profession = pick(PROFESSIONS);
    const motivation = pick(MOTIVATIONS);
    const connection = pick(CONNECTIONS);

    const lifepathSelection = {
        location: loc,
        status: status,
        omen: omen,
        family: family,
        education: education,
        trauma: trauma,
        training: training,
        exploit: exploit,
        encounter: encounter,
        profession: profession,
        motivation: motivation,
        connection: connection
    };

    // 4. Accumulate Lifepath Effects
    const lifepathEffects = accumulateEffects(lifepathSelection);

    // 4b. Filter traits to keep only 1 per life phase (birth, childhood, adolescence, young-adult)
    const phaseKeys = ['birth', 'childhood', 'adolescence', 'youngAdult'];
    const phaseCategories = {
        birth: ['location', 'status', 'omen'],
        childhood: ['family', 'education', 'trauma'],
        adolescence: ['training', 'exploit', 'encounter'],
        youngAdult: ['profession', 'motivation', 'connection']
    };
    
    // Group traits by phase and keep only one random trait per phase
    const filteredTraits = [];
    const filteredSkills = [];
    for (const phase of phaseKeys) {
        const categories = phaseCategories[phase];
        // Get choices for this phase
        const phaseChoices = categories
            .map(cat => lifepathSelection[cat])
            .filter(Boolean);
        
        // Collect all traits from this phase's choices
        const phaseTraits = [];
        const phaseSkills = [];
        for (const choice of phaseChoices) {
            if (choice.effects?.mechanical_traits) {
                phaseTraits.push(...choice.effects.mechanical_traits.map(t => ({
                    ...t,
                    _phase: phase,
                    _source: choice.label
                })));
            }
            if (choice.effects?.skills) {
                phaseSkills.push(...choice.effects.skills.map(s => ({
                    ...s,
                    _phase: phase,
                    _source: choice.label
                })));
            }
        }
        
        // Keep only one random trait from this phase
        if (phaseTraits.length > 0) {
            const randomTrait = phaseTraits[Math.floor(Math.random() * phaseTraits.length)];
            filteredTraits.push(randomTrait);
        }
        // Keep only one random skill from this phase
        if (phaseSkills.length > 0) {
            const randomSkill = phaseSkills[Math.floor(Math.random() * phaseSkills.length)];
            filteredSkills.push(randomSkill);
        }
    }
    
    // Replace accumulated traits and skills with filtered ones
    lifepathEffects.all_traits = filteredTraits;
    lifepathEffects.skills = filteredSkills;

    // 5. Roll Base Attributes
    const baseStats = {
        str: roll4d6(),
        dex: roll4d6(),
        con: roll4d6(),
        int: roll4d6(),
        wis: roll4d6(),
        cha: roll4d6()
    };

    // 6. Apply Lifepath Bonuses (Mapping long keys to short keys)
    const finalStats = {
        str: baseStats.str + (lifepathEffects.final_stats.strength || 0),
        dex: baseStats.dex + (lifepathEffects.final_stats.dexterity || 0),
        con: baseStats.con + (lifepathEffects.final_stats.constitution || 0),
        int: baseStats.int + (lifepathEffects.final_stats.intelligence || 0),
        wis: baseStats.wis + (lifepathEffects.final_stats.wisdom || 0),
        cha: baseStats.cha + (lifepathEffects.final_stats.charisma || 0),
        per: lifepathEffects.final_stats.perception || 0,
        wil: lifepathEffects.final_stats.willpower || 0
    };

    // 7. Random Abilities (3 from class)
    const availableAbilities = classData.initial_ability_options || [];
    const chosenAbilities = [];
    const shuffledAbilities = [...availableAbilities].sort(() => Math.random() - 0.5);
    const abilityCount = Math.min(3, shuffledAbilities.length);
    for (let i = 0; i < abilityCount; i++) {
        chosenAbilities.push(shuffledAbilities[i]);
    }

    // 8. Random Equipment (Pick a random starting equipment option and RESOLVE items)
    const equipmentOption = classData.starting_equipment_options ? pick(classData.starting_equipment_options) : null;
    const rawEquipment = equipmentOption ? equipmentOption.items : [];

    // Resolve equipment items from catalog to get full stats/desc
    const equipment = rawEquipment.map(stub => {
        const fullItem = ITEMS_BY_ID[stub.itemId];
        if (fullItem) {
            return { ...fullItem, quantity: stub.quantity || 1, equipped: true }; // Auto-equip starting gear
        }
        return { ...stub, equipped: true }; // Fallback to stub if not in catalog
    });

    // 9. Resolve Lifepath Items
    const lifepathItems = resolveItems(lifepathEffects.items);

    // 10. Random Name
    const names = ['Aragorn', 'Legolas', 'Gimli', 'Gandalf', 'Frodo', 'Sam', 'Boromir', 'Faramir', 'Eowyn', 'Arwen', 'Galadriel'];
    const randomName = `${pick(names)}_${Math.floor(Math.random() * 900) + 100}`;

    // 11. Calculate HP
    const conMod = Math.floor((finalStats.con - 10) / 2);
    const hpRoll = classData.hitDie || 8;
    const maxHp = hpRoll + 10 + (conMod * 2);

    // 12. Sum Gold from Lifepath Choices
    let totalGold = 0;
    Object.values(lifepathSelection).forEach(choice => {
        if (choice?.effects?.gold) {
            totalGold += choice.effects.gold;
        }
    });
    if (totalGold === 0) totalGold = 100 + (Math.floor(Math.random() * 50)); // Random starting gold if none from lifepath

    return {
        session_id: sessionId,
        user_id: userId,
        name: randomName,
        class: `${randomClass} (${randomSubclass?.label || 'Voie Standard'})`,
        stats: finalStats,
        gold: totalGold,
        abilities: chosenAbilities,
        hp: maxHp,
        max_hp: maxHp,
        resource: 100,
        max_resource: 100,
        inventory: [...equipment, ...lifepathItems],
        portrait_url: classData.portrait || '',
        backstory: lifepathEffects.narrative_summary,
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

    const keyMap = {
        strength: 'str',
        dexterity: 'dex',
        constitution: 'con',
        intelligence: 'int',
        wisdom: 'wis',
        charisma: 'cha',
        perception: 'per',
        willpower: 'wil'
    };

    inv.filter(i => i.equipped && i.stats).forEach(item => {
        Object.entries(item.stats).forEach(([k, v]) => {
            // Apply bonus to short key if it exists in map, or use the key directly
            const targetKey = keyMap[k] || k;
            if (baseStats[targetKey] !== undefined) {
                baseStats[targetKey] += v;
            } else if (keyMap[k] && baseStats[keyMap[k]] !== undefined) {
                // Redundant safety check
                baseStats[keyMap[k]] += v;
            }
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
    if (!player?.class) return [];

    const fullClassName = player.class.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const actualKey = Object.keys(CLASSES).find(key => {
        const normalizedKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return fullClassName.includes(normalizedKey);
    });

    const classData = actualKey ? CLASSES[actualKey] : null;
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
export const getArenaConfig = () => ({
    blocksX: 20,
    blocksY: 20,
    cellSize: 40
});
