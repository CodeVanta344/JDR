// ═══════════════════════════════════════════════════════════════════════
// ⚗️ ENCHANTING (ENCHANTEMENT) - Infuser la magie dans les objets
// ═══════════════════════════════════════════════════════════════════════

import { Profession } from '../index';

export const ENCHANTING: Profession = {
    id: 'enchanting',
    name: 'Enchantement',
    category: 'craft',
    description: 'Infuse les objets avec des énergies magiques pour créer des artefacts enchantés.',
    lore_background: `Les Enchanteurs d'Aethelgard sont les héritiers d'une tradition millénaire. 
    Ils canalisent les flux d'énergie magique pour imprégner armes, armures et objets du quotidien 
    de propriétés extraordinaires. Les plus grands enchanteurs peuvent créer des artefacts légendaires 
    dont on parle encore des siècles après leur création.`,
    
    primary_stat: 'intelligence',
    secondary_stat: 'wisdom',
    
    starting_tools: [
        { itemId: 'wand_apprentice', quantity: 1 },
        { itemId: 'essence_minor', quantity: 5 },
        { itemId: 'grimoire_basic', quantity: 1 }
    ],
    
    ranks: [
        {
            level: 1,
            title: 'Apprenti Enchanteur',
            xp_required: 0,
            recipes_unlocked: ['enchant_weapon_minor', 'enchant_armor_minor', 'rune_light'],
            passive_bonuses: [
                '+5% chance de succès critique en enchantement',
                'Peut identifier les objets magiques basiques'
            ]
        },
        {
            level: 2,
            title: 'Enchanteur',
            xp_required: 1000,
            recipes_unlocked: ['enchant_weapon_fire', 'enchant_armor_protection', 'rune_strength', 'amulet_minor'],
            passive_bonuses: [
                '+10% chance de succès critique',
                '+1 slot d\'enchantement sur les objets créés',
                'Peut désenchanter des objets mineurs'
            ]
        },
        {
            level: 3,
            title: 'Maître Enchanteur',
            xp_required: 5000,
            recipes_unlocked: ['enchant_weapon_lightning', 'enchant_armor_elemental', 'rune_mastery', 'ring_power', 'staff_arcane'],
            passive_bonuses: [
                '+15% chance de succès critique',
                '+2 slots d\'enchantement',
                'Peut désenchanter des objets rares',
                'Les enchantements durent 50% plus longtemps'
            ],
            special_ability: 'Extraction d\'Essence : Peut extraire l\'essence magique d\'objets enchantés pour créer de nouvelles essences'
        },
        {
            level: 4,
            title: 'Grand Maître Enchanteur',
            xp_required: 15000,
            recipes_unlocked: ['artifact_legendary', 'enchant_weapon_holy', 'enchant_armor_invulnerability', 'rune_transcendence'],
            passive_bonuses: [
                '+25% chance de succès critique',
                '+3 slots d\'enchantement',
                'Peut désenchanter des objets légendaires',
                'Les enchantements ne se dégradent jamais',
                '10% de chance de créer un enchantement DOUBLE puissance'
            ],
            special_ability: 'Maître Arcaniste : Peut combiner 2 enchantements en un seul enchantement fusionné unique'
        }
    ],
    
    recipes: [
        // ─── PALIER 1 : APPRENTI ───
        {
            id: 'enchant_weapon_minor',
            name: 'Enchantement d\'Arme Mineur',
            level_required: 1,
            ingredients: [
                { itemId: 'essence_minor', quantity: 2 },
                { itemId: 'dust_arcane', quantity: 3 }
            ],
            result: {
                itemId: 'scroll_weapon_minor',
                quantity: 1,
                quality_range: [1, 3]
            },
            crafting_time_minutes: 15,
            tools_required: ['wand_apprentice', 'grimoire_basic'],
            success_rate_formula: 'base_60 + (level * 3) + intelligence_mod',
            critical_success_bonus: '+2 puissance enchantement',
            fail_consequence: 'Perte de 50% des essences'
        },
        {
            id: 'enchant_armor_minor',
            name: 'Enchantement d\'Armure Mineur',
            level_required: 1,
            ingredients: [
                { itemId: 'essence_minor', quantity: 2 },
                { itemId: 'thread_silver', quantity: 2 }
            ],
            result: {
                itemId: 'scroll_armor_minor',
                quantity: 1,
                quality_range: [1, 3]
            },
            crafting_time_minutes: 15,
            tools_required: ['wand_apprentice', 'grimoire_basic'],
            success_rate_formula: 'base_60 + (level * 3) + intelligence_mod',
            critical_success_bonus: '+1 AC supplémentaire',
            fail_consequence: 'Perte de 50% des matériaux'
        },
        {
            id: 'rune_light',
            name: 'Rune de Lumière',
            level_required: 1,
            ingredients: [
                { itemId: 'essence_light', quantity: 1 },
                { itemId: 'stone_smooth', quantity: 1 }
            ],
            result: {
                itemId: 'rune_light',
                quantity: 1,
                quality_range: [30, 60]
            },
            crafting_time_minutes: 10,
            tools_required: ['wand_apprentice'],
            success_rate_formula: 'base_70 + (level * 2) + wisdom_mod',
            critical_success_bonus: 'Durée 2x plus longue',
            fail_consequence: 'Pierre détruite'
        },
        
        // ─── PALIER 2 : ENCHANTEUR ───
        {
            id: 'enchant_weapon_fire',
            name: 'Enchantement de Feu',
            level_required: 2,
            ingredients: [
                { itemId: 'essence_fire', quantity: 3 },
                { itemId: 'dust_arcane', quantity: 5 },
                { itemId: 'crystal_ruby', quantity: 1 }
            ],
            result: {
                itemId: 'scroll_weapon_fire',
                quantity: 1,
                quality_range: [5, 10]
            },
            crafting_time_minutes: 30,
            tools_required: ['wand_journeyman', 'grimoire_advanced'],
            success_rate_formula: 'base_55 + (level * 3) + intelligence_mod',
            critical_success_bonus: '+3d6 dégâts de feu supplémentaires',
            fail_consequence: 'Explosion mineure (1d6 dégâts de feu)'
        },
        {
            id: 'enchant_armor_protection',
            name: 'Enchantement de Protection',
            level_required: 2,
            ingredients: [
                { itemId: 'essence_protection', quantity: 3 },
                { itemId: 'thread_silver', quantity: 5 },
                { itemId: 'crystal_diamond', quantity: 1 }
            ],
            result: {
                itemId: 'scroll_armor_protection',
                quantity: 1,
                quality_range: [3, 5]
            },
            crafting_time_minutes: 30,
            tools_required: ['wand_journeyman', 'grimoire_advanced'],
            success_rate_formula: 'base_55 + (level * 3) + wisdom_mod',
            critical_success_bonus: '+2 AC bonus',
            fail_consequence: 'Matériaux perdus'
        },
        {
            id: 'amulet_minor',
            name: 'Amulette Mineure',
            level_required: 2,
            ingredients: [
                { itemId: 'chain_silver', quantity: 1 },
                { itemId: 'essence_minor', quantity: 4 },
                { itemId: 'gem_topaz', quantity: 1 }
            ],
            result: {
                itemId: 'amulet_protection_minor',
                quantity: 1,
                quality_range: [2, 4]
            },
            crafting_time_minutes: 45,
            tools_required: ['wand_journeyman', 'anvil_enchanting'],
            success_rate_formula: 'base_50 + (level * 3) + intelligence_mod',
            critical_success_bonus: 'Effet supplémentaire aléatoire',
            fail_consequence: 'Gemme brisée, chaîne récupérable'
        },
        
        // ─── PALIER 3 : MAÎTRE ───
        {
            id: 'enchant_weapon_lightning',
            name: 'Enchantement de Foudre',
            level_required: 3,
            ingredients: [
                { itemId: 'essence_lightning', quantity: 5 },
                { itemId: 'dust_arcane', quantity: 10 },
                { itemId: 'crystal_sapphire', quantity: 2 },
                { itemId: 'core_storm', quantity: 1 }
            ],
            result: {
                itemId: 'scroll_weapon_lightning',
                quantity: 1,
                quality_range: [10, 15]
            },
            crafting_time_minutes: 60,
            tools_required: ['wand_master', 'grimoire_expert', 'chamber_enchanting'],
            success_rate_formula: 'base_45 + (level * 4) + intelligence_mod',
            critical_success_bonus: 'Effet de chaîne (3 cibles)',
            fail_consequence: 'Décharge électrique (2d10 dégâts foudre)'
        },
        {
            id: 'ring_power',
            name: 'Anneau de Pouvoir',
            level_required: 3,
            ingredients: [
                { itemId: 'band_gold', quantity: 1 },
                { itemId: 'essence_arcane', quantity: 8 },
                { itemId: 'gem_diamond', quantity: 1 },
                { itemId: 'rune_power', quantity: 1 }
            ],
            result: {
                itemId: 'ring_arcane_power',
                quantity: 1,
                quality_range: [5, 8]
            },
            crafting_time_minutes: 90,
            tools_required: ['wand_master', 'anvil_enchanting', 'chamber_enchanting'],
            success_rate_formula: 'base_40 + (level * 4) + (intelligence_mod + wisdom_mod)',
            critical_success_bonus: '+50% puissance magique',
            fail_consequence: 'Anneau maudit (effet négatif permanent)'
        },
        {
            id: 'staff_arcane',
            name: 'Bâton Arcanique',
            level_required: 3,
            ingredients: [
                { itemId: 'wood_ancient', quantity: 1 },
                { itemId: 'essence_arcane', quantity: 10 },
                { itemId: 'crystal_amethyst', quantity: 3 },
                { itemId: 'core_elemental', quantity: 1 }
            ],
            result: {
                itemId: 'staff_arcane_master',
                quantity: 1,
                quality_range: [15, 25]
            },
            crafting_time_minutes: 120,
            tools_required: ['wand_master', 'grimoire_expert', 'chamber_enchanting'],
            success_rate_formula: 'base_35 + (level * 5) + intelligence_mod',
            critical_success_bonus: 'Sort bonus permanent intégré',
            fail_consequence: 'Explosion magique (3d10 dégâts force, rayon 3m)'
        },
        
        // ─── PALIER 4 : GRAND MAÎTRE ───
        {
            id: 'artifact_legendary',
            name: 'Artefact Légendaire',
            level_required: 4,
            ingredients: [
                { itemId: 'essence_primordial', quantity: 20 },
                { itemId: 'soul_fragment', quantity: 1 },
                { itemId: 'crystal_astral', quantity: 5 },
                { itemId: 'rune_transcendence', quantity: 3 },
                { itemId: 'base_item_legendary', quantity: 1 }
            ],
            result: {
                itemId: 'artifact_unique',
                quantity: 1,
                quality_range: [50, 100]
            },
            crafting_time_minutes: 480,
            tools_required: ['wand_grandmaster', 'grimoire_legendary', 'sanctum_enchanting', 'altar_creation'],
            success_rate_formula: 'base_20 + (level * 6) + (intelligence_mod * 2) + (wisdom_mod * 2)',
            critical_success_bonus: 'Artefact devient conscient (intelligence propre)',
            fail_consequence: 'Implosion magique (6d20 dégâts force, rayon 10m, objet détruit)'
        },
        {
            id: 'enchant_weapon_holy',
            name: 'Enchantement Sacré',
            level_required: 4,
            ingredients: [
                { itemId: 'essence_divine', quantity: 10 },
                { itemId: 'water_blessed', quantity: 5 },
                { itemId: 'crystal_celestial', quantity: 3 },
                { itemId: 'prayer_scroll', quantity: 1 }
            ],
            result: {
                itemId: 'scroll_weapon_holy',
                quantity: 1,
                quality_range: [20, 30]
            },
            crafting_time_minutes: 180,
            tools_required: ['wand_grandmaster', 'altar_holy'],
            success_rate_formula: 'base_30 + (level * 5) + intelligence_mod + wisdom_mod',
            critical_success_bonus: '+6d6 dégâts radiants contre morts-vivants et démons',
            fail_consequence: 'Bannissement (téléportation aléatoire 1km)'
        },
        {
            id: 'rune_transcendence',
            name: 'Rune de Transcendance',
            level_required: 4,
            ingredients: [
                { itemId: 'essence_primordial', quantity: 15 },
                { itemId: 'stone_philosopher', quantity: 1 },
                { itemId: 'ink_eternal', quantity: 3 }
            ],
            result: {
                itemId: 'rune_transcendence',
                quantity: 1,
                quality_range: [90, 100]
            },
            crafting_time_minutes: 240,
            tools_required: ['wand_grandmaster', 'grimoire_legendary', 'sanctum_enchanting'],
            success_rate_formula: 'base_25 + (level * 6) + (intelligence_mod * 3)',
            critical_success_bonus: 'Rune peut fusionner avec l\'âme du porteur',
            fail_consequence: 'Déchirure planaire (portail instable vers plan élémentaire)'
        }
    ],
    
    specializations: [
        {
            id: 'weaponsmith_enchanter',
            name: 'Enchanteur d\'Armes',
            description: 'Spécialiste des enchantements offensifs sur armes.',
            unlock_level: 2,
            bonus_effects: [
                '+10% puissance des enchantements d\'armes',
                '+15% chance de succès critique sur enchantements offensifs',
                'Peut enchanter 2 armes simultanément'
            ]
        },
        {
            id: 'armorsmith_enchanter',
            name: 'Enchanteur d\'Armures',
            description: 'Spécialiste des enchantements défensifs et protecteurs.',
            unlock_level: 2,
            bonus_effects: [
                '+10% puissance des enchantements d\'armures',
                '+2 AC bonus sur armures enchantées personnellement',
                'Les enchantements défensifs durent 100% plus longtemps'
            ]
        },
        {
            id: 'jewelcrafter_enchanter',
            name: 'Enchanteur de Bijoux',
            description: 'Maître de la création d\'anneaux, amulettes et objets précieux enchantés.',
            unlock_level: 3,
            bonus_effects: [
                '+20% puissance des bijoux enchantés',
                'Peut combiner 3 gemmes en une super-gemme',
                '+1 effet magique supplémentaire sur tous les bijoux créés'
            ]
        },
        {
            id: 'artifact_creator',
            name: 'Créateur d\'Artefacts',
            description: 'Seuls les plus grands maîtres peuvent créer de véritables artefacts légendaires.',
            unlock_level: 4,
            bonus_effects: [
                '+30% chance de succès sur création d\'artefacts',
                'Réduit le coût en essences de 25%',
                '10% chance qu\'un artefact devienne UNIQUE (effet jamais vu)',
                'Peut restaurer des artefacts brisés'
            ]
        }
    ],
    
    synergies_with: ['alchemy', 'jewelcrafting', 'blacksmithing'],
    
    faction_reputation: [
        {
            factionId: 'arcane_circle',
            bonus_per_rank: 50
        },
        {
            factionId: 'mages_guild',
            bonus_per_rank: 30
        }
    ]
};
