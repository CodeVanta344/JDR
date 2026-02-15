import { CLASSES } from '../lore/classes';

/**
 * Resolves the full list of abilities for a character based on their class and level.
 * @param {Object} character - The character object with class, level, abilities, spells.
 * @returns {Array} - Array of resolved ability objects.
 */
export const resolveCharacterAbilities = (character) => {
    if (!character) return [];
    if (!character.class && !character.abilities && !character.spells) return [];

    // 1. Try to find the class data matching the character's class string
    let classData = null;
    if (character.class) {
        const fullClassName = character.class.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const actualKey = Object.keys(CLASSES).find(key => {
            const normalizedKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return fullClassName.includes(normalizedKey);
        });
        if (actualKey) {
            classData = CLASSES[actualKey];
        }
    }

    // 2. Gather raw existing abilities/spells on the character object
    const rawAbilities = character.abilities || [];
    const rawSpells = character.spells || [];
    const playerAbilitiesList = [...rawAbilities, ...rawSpells].filter(Boolean);

    // 3. If no class data found, return what we have (best effort)
    if (!classData) {
        return playerAbilitiesList.map(s => {
            if (typeof s === 'string') {
                return { name: s, desc: "Aptitude apprise", level: 1, cost: 0, range: 2 };
            }
            return s;
        });
    }

    // 4. Resolve abilities against class definitions
    let baseAbilities = [];
    if (playerAbilitiesList.length > 0) {
        // Hydrate strings to full objects from class data
        baseAbilities = playerAbilitiesList.map(s => {
            if (typeof s === 'string') {
                const fromInitial = (classData.initial_ability_options || []).find(a => a.name === s);
                const fromUnlockables = (classData.unlockables || []).find(u => u.name === s);
                // Fallback object if not found in class data
                return fromInitial || fromUnlockables || { name: s, desc: "Aptitude apprise", level: 1, cost: 0, range: 2 };
            }
            // If it's an object, merge with class data to get new fields like 'target'
            const fromInitial = (classData.initial_ability_options || []).find(a => a.name === s.name);
            const fromUnlockables = (classData.unlockables || []).find(u => u.name === s.name);
            const classAbility = fromInitial || fromUnlockables;
            if (classAbility) {
                // Merge: class data provides defaults, player data overrides, but ensure target is set
                const merged = {
                    ...classAbility,
                    ...s,
                    target: s.target || classAbility.target || (classAbility.friendly ? 'ally' : 'enemy'),
                    friendly: s.friendly !== undefined ? s.friendly : classAbility.friendly
                };
                return merged;
            }
            return s;
        }).filter(Boolean);
    } else {
        // Fallback: If no abilities recorded, give initial class options
        baseAbilities = classData.initial_ability_options || classData.abilities || [];
    }

    // 5. Add unlocked abilities based on level
    const currentLevel = character.level || 1;
    const unlocked = (classData.unlockables || []).filter(u => u && u.level <= currentLevel);

    // 6. Combine and Deduplicate
    const all = [...baseAbilities, ...unlocked].filter(i => i && i.name);
    const uniqueAbilities = Array.from(new Map(all.map(item => [item.name, item])).values());

    return uniqueAbilities;
};
