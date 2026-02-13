// ═══════════════════════════════════════════════════════════════════════
// 🔓 SYSTÈME DE DÉBLOCAGE PROGRESSIF DU CODEX
// ═══════════════════════════════════════════════════════════════════════
// Le Codex se remplit au fur et à mesure que le joueur explore, combat et progresse

export interface UnlockCondition {
    type: 'level' | 'quest' | 'location' | 'kill' | 'craft' | 'discover' | 'profession_tier';
    value: number | string;
    description: string;
}

export interface CodexEntry {
    id: string;
    category: 'creature' | 'location' | 'item' | 'profession' | 'quest' | 'class' | 'faction';
    unlockConditions: UnlockCondition[];
    isUnlockedByDefault?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════
// 🗺️ CONDITIONS DE DÉBLOCAGE DES LIEUX
// ═══════════════════════════════════════════════════════════════════════

export const LOCATION_UNLOCK_CONDITIONS: Record<string, UnlockCondition[]> = {
    // Lieux de départ (toujours débloqués)
    'aethelgard': [],
    'combrelac': [],
    'point_de_depart': [],
    
    // Villes majeures (débloquées par exploration)
    'port_azure': [
        { type: 'discover', value: 'port_azure', description: 'Visiter Port d\'Azur' }
    ],
    'forgefer': [
        { type: 'discover', value: 'forgefer', description: 'Découvrir Forgefer (capitale naine)' }
    ],
    'sol_aureus': [
        { type: 'level', value: 3, description: 'Atteindre le niveau 3' },
        { type: 'discover', value: 'sol_aureus', description: 'Entendre parler de Sol-Aureus' }
    ],
    
    // Donjons (débloqués par niveau + découverte)
    'forteresse_ombre': [
        { type: 'level', value: 5, description: 'Atteindre le niveau 5' },
        { type: 'quest', value: 'q_ombres_solitaires', description: 'Accepter la quête des Ombres Solitaires' }
    ],
    'crypte_ancienne': [
        { type: 'level', value: 3, description: 'Atteindre le niveau 3' },
        { type: 'discover', value: 'crypte_ancienne', description: 'Trouver l\'entrée de la Crypte' }
    ],
    'grottes_cristal': [
        { type: 'level', value: 7, description: 'Atteindre le niveau 7' },
        { type: 'kill', value: 'dragon_mineur', description: 'Tuer un dragon mineur' }
    ],
    
    // Zones dangereuses (niveau élevé requis)
    'terre_devastee': [
        { type: 'level', value: 10, description: 'Atteindre le niveau 10' },
        { type: 'quest', value: 'q_scelles', description: 'Quête principale "Les Scellés"' }
    ],
    'ruines_elfiques': [
        { type: 'level', value: 8, description: 'Atteindre le niveau 8' },
        { type: 'discover', value: 'ruines_elfiques', description: 'Découvrir les Ruines Elfiques' }
    ]
};

// ═══════════════════════════════════════════════════════════════════════
// 👹 CONDITIONS DE DÉBLOCAGE DES CRÉATURES
// ═══════════════════════════════════════════════════════════════════════

export const CREATURE_UNLOCK_CONDITIONS: Record<string, UnlockCondition[]> = {
    // Créatures communes (toujours visibles)
    'goblin': [],
    'loup': [],
    'squelette': [],
    'bandit': [],
    'rat_geant': [],
    
    // Créatures intermédiaires (débloquées par rencontre)
    'orc': [
        { type: 'kill', value: 'orc', description: 'Tuer ou observer un Orc' }
    ],
    'ogre': [
        { type: 'level', value: 4, description: 'Atteindre le niveau 4' },
        { type: 'kill', value: 'ogre', description: 'Rencontrer un Ogre' }
    ],
    'troll': [
        { type: 'level', value: 5, description: 'Atteindre le niveau 5' },
        { type: 'kill', value: 'troll', description: 'Combattre un Troll' }
    ],
    
    // Morts-vivants (débloqués par quêtes)
    'vampire': [
        { type: 'level', value: 7, description: 'Atteindre le niveau 7' },
        { type: 'quest', value: 'q_undead', description: 'Quête liée aux morts-vivants' }
    ],
    'liche': [
        { type: 'level', value: 10, description: 'Atteindre le niveau 10' },
        { type: 'kill', value: 'liche', description: 'Affronter une Liche' }
    ],
    
    // Dragons (très haut niveau)
    'dragon_mineur': [
        { type: 'level', value: 8, description: 'Atteindre le niveau 8' },
        { type: 'discover', value: 'grottes_cristal', description: 'Découvrir les Grottes de Cristal' }
    ],
    'dragon_ancien': [
        { type: 'level', value: 15, description: 'Atteindre le niveau 15' },
        { type: 'quest', value: 'q_dragon_hunt', description: 'Quête de chasse au dragon' }
    ],
    
    // Boss et créatures légendaires
    'seigneur_liche': [
        { type: 'level', value: 12, description: 'Atteindre le niveau 12' },
        { type: 'quest', value: 'q_scelles', description: 'Arc principal "Les Scellés"' }
    ],
    'phenix_sombre': [
        { type: 'level', value: 15, description: 'Atteindre le niveau 15' },
        { type: 'quest', value: 'q_phoenix', description: 'Quête du Phénix Sombre' }
    ]
};

// ═══════════════════════════════════════════════════════════════════════
// ⚒️ CONDITIONS DE DÉBLOCAGE DES MÉTIERS (PALIERS)
// ═══════════════════════════════════════════════════════════════════════

export const PROFESSION_TIER_UNLOCK_CONDITIONS: Record<string, Record<number, UnlockCondition[]>> = {
    blacksmithing: {
        1: [], // Apprenti (toujours accessible)
        2: [ // Compagnon
            { type: 'profession_tier', value: 1, description: 'Maîtriser le palier Apprenti (20 objets forgés)' },
            { type: 'craft', value: 'épée_acier', description: 'Forger une épée en acier' }
        ],
        3: [ // Maître
            { type: 'profession_tier', value: 2, description: 'Maîtriser le palier Compagnon (50 objets forgés)' },
            { type: 'craft', value: 'armure_plaques', description: 'Forger une armure de plaques complète' },
            { type: 'level', value: 8, description: 'Atteindre le niveau 8' }
        ],
        4: [ // Grand Maître
            { type: 'profession_tier', value: 3, description: 'Maîtriser le palier Maître (100 objets forgés)' },
            { type: 'craft', value: 'épée_mithril', description: 'Forger une arme en mithril' },
            { type: 'level', value: 12, description: 'Atteindre le niveau 12' },
            { type: 'quest', value: 'q_master_smith', description: 'Quête du Maître Forgeron' }
        ]
    },
    
    alchemy: {
        1: [],
        2: [
            { type: 'profession_tier', value: 1, description: 'Brasser 20 potions' },
            { type: 'craft', value: 'potion_soin_superieure', description: 'Créer une Potion de Soin Supérieure' }
        ],
        3: [
            { type: 'profession_tier', value: 2, description: 'Brasser 50 potions' },
            { type: 'craft', value: 'elixir_force', description: 'Créer un Élixir de Force' },
            { type: 'level', value: 7, description: 'Atteindre le niveau 7' }
        ],
        4: [
            { type: 'profession_tier', value: 3, description: 'Brasser 100 potions' },
            { type: 'craft', value: 'philtre_immortalite', description: 'Créer un Philtre d\'Immortalité' },
            { type: 'level', value: 15, description: 'Atteindre le niveau 15' },
            { type: 'quest', value: 'q_grand_alchimiste', description: 'Quête du Grand Alchimiste' }
        ]
    },
    
    mining: {
        1: [],
        2: [
            { type: 'profession_tier', value: 1, description: 'Miner 50 minerais' },
            { type: 'craft', value: 'lingot_acier', description: 'Raffiner de l\'acier' }
        ],
        3: [
            { type: 'profession_tier', value: 2, description: 'Miner 100 minerais' },
            { type: 'discover', value: 'forgefer', description: 'Découvrir les mines de Forgefer' },
            { type: 'level', value: 6, description: 'Atteindre le niveau 6' }
        ],
        4: [
            { type: 'profession_tier', value: 3, description: 'Miner 200 minerais' },
            { type: 'craft', value: 'lingot_mithril', description: 'Extraire et raffiner du mithril' },
            { type: 'level', value: 10, description: 'Atteindre le niveau 10' }
        ]
    },
    
    enchanting: {
        1: [],
        2: [
            { type: 'profession_tier', value: 1, description: 'Enchanter 10 objets' },
            { type: 'craft', value: 'enchantement_feu', description: 'Créer un Enchantement de Feu' }
        ],
        3: [
            { type: 'profession_tier', value: 2, description: 'Enchanter 30 objets' },
            { type: 'craft', value: 'rune_protection', description: 'Créer une Rune de Protection' },
            { type: 'level', value: 9, description: 'Atteindre le niveau 9' }
        ],
        4: [
            { type: 'profession_tier', value: 3, description: 'Enchanter 60 objets' },
            { type: 'craft', value: 'artefact_legendaire', description: 'Créer un Artefact Légendaire' },
            { type: 'level', value: 14, description: 'Atteindre le niveau 14' }
        ]
    },
    
    herbalism: {
        1: [],
        2: [
            { type: 'profession_tier', value: 1, description: 'Récolter 40 herbes' }
        ],
        3: [
            { type: 'profession_tier', value: 2, description: 'Récolter 80 herbes' },
            { type: 'discover', value: 'foret_emeraude', description: 'Découvrir la Forêt d\'Émeraude' },
            { type: 'level', value: 5, description: 'Atteindre le niveau 5' }
        ],
        4: [
            { type: 'profession_tier', value: 3, description: 'Récolter 150 herbes rares' },
            { type: 'level', value: 11, description: 'Atteindre le niveau 11' }
        ]
    }
};

// ═══════════════════════════════════════════════════════════════════════
// 🎯 FONCTIONS DE VÉRIFICATION
// ═══════════════════════════════════════════════════════════════════════

export interface PlayerProgress {
    level: number;
    completedQuests: string[];
    discoveredLocations: string[];
    killedCreatures: Record<string, number>; // creature_id -> count
    craftedItems: Record<string, number>; // item_id -> count
    professionTiers: Record<string, number>; // profession_id -> tier (1-4)
    codexUnlocked: {
        creatures: string[];
        locations: string[];
        professionTiers: Record<string, number[]>; // profession_id -> [unlocked tiers]
    };
}

/**
 * Vérifie si une condition est remplie
 */
export function checkUnlockCondition(condition: UnlockCondition, progress: PlayerProgress): boolean {
    switch (condition.type) {
        case 'level':
            return progress.level >= (condition.value as number);
            
        case 'quest':
            return progress.completedQuests.includes(condition.value as string);
            
        case 'location':
        case 'discover':
            return progress.discoveredLocations.includes(condition.value as string);
            
        case 'kill':
            const creatureId = condition.value as string;
            return (progress.killedCreatures[creatureId] || 0) > 0;
            
        case 'craft':
            const itemId = condition.value as string;
            return (progress.craftedItems[itemId] || 0) > 0;
            
        case 'profession_tier':
            // Cette condition est vérifiée différemment (voir checkProfessionTierUnlock)
            return true;
            
        default:
            return false;
    }
}

/**
 * Vérifie si toutes les conditions sont remplies
 */
export function checkAllConditions(conditions: UnlockCondition[], progress: PlayerProgress): boolean {
    if (!conditions || conditions.length === 0) return true;
    return conditions.every(cond => checkUnlockCondition(cond, progress));
}

/**
 * Vérifie si un lieu est débloqué
 */
export function isLocationUnlocked(locationId: string, progress: PlayerProgress): boolean {
    const conditions = LOCATION_UNLOCK_CONDITIONS[locationId];
    if (!conditions) return true; // Si pas de conditions définies, débloqué par défaut
    return checkAllConditions(conditions, progress);
}

/**
 * Vérifie si une créature est débloquée dans le codex
 */
export function isCreatureUnlocked(creatureId: string, progress: PlayerProgress): boolean {
    // Si déjà débloqué manuellement
    if (progress.codexUnlocked.creatures.includes(creatureId)) return true;
    
    const conditions = CREATURE_UNLOCK_CONDITIONS[creatureId];
    if (!conditions) return true;
    return checkAllConditions(conditions, progress);
}

/**
 * Vérifie si un palier de métier est débloqué
 */
export function isProfessionTierUnlocked(professionId: string, tier: number, progress: PlayerProgress): boolean {
    // Palier 1 toujours débloqué
    if (tier === 1) return true;
    
    // Si déjà débloqué manuellement
    if (progress.codexUnlocked.professionTiers[professionId]?.includes(tier)) return true;
    
    const conditions = PROFESSION_TIER_UNLOCK_CONDITIONS[professionId]?.[tier];
    if (!conditions) return false;
    
    // Vérifier toutes les conditions sauf profession_tier
    const otherConditions = conditions.filter(c => c.type !== 'profession_tier');
    if (!checkAllConditions(otherConditions, progress)) return false;
    
    // Vérifier le palier précédent
    const tierCondition = conditions.find(c => c.type === 'profession_tier');
    if (tierCondition) {
        const requiredTier = tierCondition.value as number;
        const currentTier = progress.professionTiers[professionId] || 0;
        return currentTier >= requiredTier;
    }
    
    return true;
}

/**
 * Obtient toutes les créatures débloquées
 */
export function getUnlockedCreatures(progress: PlayerProgress, allCreatures: any[]): any[] {
    return allCreatures.filter(creature => 
        isCreatureUnlocked(creature.id, progress)
    );
}

/**
 * Obtient tous les lieux débloqués
 */
export function getUnlockedLocations(progress: PlayerProgress, allLocations: any[]): any[] {
    return allLocations.filter(location => 
        isLocationUnlocked(location.id, progress)
    );
}

/**
 * Obtient les paliers débloqués d'un métier
 */
export function getUnlockedProfessionTiers(professionId: string, progress: PlayerProgress): number[] {
    const tiers = [1, 2, 3, 4];
    return tiers.filter(tier => isProfessionTierUnlocked(professionId, tier, progress));
}

/**
 * Calcule le pourcentage de complétion du codex
 */
export function calculateCodexCompletion(progress: PlayerProgress, totalEntries: {
    creatures: number;
    locations: number;
    professions: number;
}): {
    creatures: number;
    locations: number;
    professions: number;
    overall: number;
} {
    const creaturesPercent = (progress.codexUnlocked.creatures.length / totalEntries.creatures) * 100;
    const locationsPercent = (progress.codexUnlocked.locations.length / totalEntries.locations) * 100;
    
    const totalProfessionTiers = Object.values(progress.codexUnlocked.professionTiers)
        .reduce((sum, tiers) => sum + tiers.length, 0);
    const maxProfessionTiers = totalEntries.professions * 4; // 4 paliers par métier
    const professionsPercent = (totalProfessionTiers / maxProfessionTiers) * 100;
    
    const overall = (creaturesPercent + locationsPercent + professionsPercent) / 3;
    
    return {
        creatures: Math.round(creaturesPercent),
        locations: Math.round(locationsPercent),
        professions: Math.round(professionsPercent),
        overall: Math.round(overall)
    };
}
