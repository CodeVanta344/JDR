// ═══════════════════════════════════════════════════════════════════════
// 🦌 LEATHERWORKING (TANNERIE) - Transformer les peaux en armures robustes
// ═══════════════════════════════════════════════════════════════════════

import { Profession } from '../index';

export const LEATHERWORKING: Profession = {
    id: 'leatherworking',
    name: 'Tannerie',
    category: 'craft',
    description: 'Transforme les peaux brutes en armures de cuir robustes, sacs et équipement pratique.',
    lore_background: `Les Tanneurs d'Aethelgard travaillent depuis des générations à perfectionner l'art 
    de transformer peaux et cuirs en équipements durables. Des simples tuniques de cuir aux armures 
    renforcées d'écailles de dragon, ils protègent les aventuriers tout en leur assurant mobilité et agilité. 
    Les maîtres tanneurs peuvent même travailler les cuirs magiques et créer des armures légendaires.`,
    
    primary_stat: 'dexterity',
    secondary_stat: 'strength',
    
    starting_tools: [
        { itemId: 'knife_skinning', quantity: 1 },
        { itemId: 'needle_leather', quantity: 2 },
        { itemId: 'thread_waxed', quantity: 10 }
    ],
    
    ranks: [
        {
            level: 1,
            title: 'Apprenti Tanneur',
            xp_required: 0,
            recipes_unlocked: ['tunic_leather_light', 'boots_leather', 'belt_simple'],
            passive_bonuses: [
                '+5% durabilité des objets en cuir créés',
                'Peut tanner des peaux basiques'
            ]
        },
        {
            level: 2,
            title: 'Tanneur',
            xp_required: 1000,
            recipes_unlocked: ['armor_leather_studded', 'gloves_leather', 'bag_medium', 'saddle_basic'],
            passive_bonuses: [
                '+10% durabilité des objets',
                '+1 AC sur armures légères créées',
                'Peut tanner des peaux exotiques'
            ]
        },
        {
            level: 3,
            title: 'Maître Tanneur',
            xp_required: 5000,
            recipes_unlocked: ['armor_dragonscale', 'cloak_shadow', 'bag_enchanted', 'saddle_war', 'armor_leather_reinforced'],
            passive_bonuses: [
                '+15% durabilité',
                '+2 AC sur armures',
                'Peut travailler les cuirs magiques',
                'Les armures créées réduisent les malus de poids de 30%'
            ],
            special_ability: 'Maître du Cuir : Peut renforcer une armure existante avec des écailles ou plaques sans augmenter le poids'
        },
        {
            level: 4,
            title: 'Grand Maître Tanneur',
            xp_required: 15000,
            recipes_unlocked: ['armor_wyrmhide', 'cloak_displacement', 'bag_holding', 'armor_legendary'],
            passive_bonuses: [
                '+25% durabilité',
                '+3 AC sur armures',
                'Les armures confèrent résistance à un type de dégâts',
                'Durabilité infinie sur objets de qualité légendaire',
                '10% chance de créer un objet AUTO-RÉPARANT'
            ],
            special_ability: 'Artisan Draconique : Peut fusionner plusieurs types d\'écailles de dragons pour créer des armures aux résistances multiples'
        }
    ],
    
    recipes: [
        // ─── PALIER 1 : APPRENTI ───
        {
            id: 'tunic_leather_light',
            name: 'Tunique de Cuir Léger',
            level_required: 1,
            ingredients: [
                { itemId: 'leather_light', quantity: 4 },
                { itemId: 'thread_waxed', quantity: 2 }
            ],
            result: {
                itemId: 'tunic_leather_light',
                quantity: 1,
                quality_range: [1, 3]
            },
            crafting_time_minutes: 60,
            tools_required: ['knife_skinning', 'needle_leather'],
            success_rate_formula: 'base_65 + (level * 2) + dexterity_mod',
            critical_success_bonus: '+1 AC supplémentaire',
            fail_consequence: 'Cuir gaspillé (perte de 50%)'
        },
        {
            id: 'boots_leather',
            name: 'Bottes de Cuir',
            level_required: 1,
            ingredients: [
                { itemId: 'leather_light', quantity: 2 },
                { itemId: 'thread_waxed', quantity: 1 }
            ],
            result: {
                itemId: 'boots_leather',
                quantity: 1,
                quality_range: [1, 2]
            },
            crafting_time_minutes: 45,
            tools_required: ['knife_skinning', 'needle_leather'],
            success_rate_formula: 'base_70 + (level * 2) + dexterity_mod',
            critical_success_bonus: '+5 vitesse de déplacement',
            fail_consequence: 'Bottes inconfortables (malus -1 DEX)'
        },
        {
            id: 'belt_simple',
            name: 'Ceinture Simple',
            level_required: 1,
            ingredients: [
                { itemId: 'leather_strip', quantity: 2 },
                { itemId: 'buckle_iron', quantity: 1 }
            ],
            result: {
                itemId: 'belt_simple',
                quantity: 1,
                quality_range: [1, 2]
            },
            crafting_time_minutes: 20,
            tools_required: ['knife_skinning', 'needle_leather'],
            success_rate_formula: 'base_70 + (level * 2) + dexterity_mod',
            critical_success_bonus: '+2 slots d\'inventaire',
            fail_consequence: 'Ceinture fragile (durabilité réduite)'
        },
        
        // ─── PALIER 2 : TANNEUR ───
        {
            id: 'armor_leather_studded',
            name: 'Armure de Cuir Clouté',
            level_required: 2,
            ingredients: [
                { itemId: 'leather_thick', quantity: 6 },
                { itemId: 'stud_metal', quantity: 20 },
                { itemId: 'thread_reinforced', quantity: 4 }
            ],
            result: {
                itemId: 'armor_leather_studded',
                quantity: 1,
                quality_range: [3, 6]
            },
            crafting_time_minutes: 120,
            tools_required: ['knife_skinning', 'needle_leather', 'hammer_small'],
            success_rate_formula: 'base_60 + (level * 3) + dexterity_mod',
            critical_success_bonus: '+2 AC et résistance aux dégâts perforants',
            fail_consequence: 'Clous mal placés (AC réduit de 1)'
        },
        {
            id: 'gloves_leather',
            name: 'Gants de Cuir',
            level_required: 2,
            ingredients: [
                { itemId: 'leather_supple', quantity: 2 },
                { itemId: 'thread_waxed', quantity: 2 }
            ],
            result: {
                itemId: 'gloves_leather',
                quantity: 1,
                quality_range: [2, 4]
            },
            crafting_time_minutes: 60,
            tools_required: ['knife_skinning', 'needle_leather'],
            success_rate_formula: 'base_60 + (level * 3) + dexterity_mod',
            critical_success_bonus: '+1 DEX pour actions de manipulation',
            fail_consequence: 'Gants rigides (malus -1 DEX)'
        },
        {
            id: 'bag_medium',
            name: 'Sac Moyen',
            level_required: 2,
            ingredients: [
                { itemId: 'leather_thick', quantity: 4 },
                { itemId: 'thread_reinforced', quantity: 3 },
                { itemId: 'buckle_iron', quantity: 2 }
            ],
            result: {
                itemId: 'bag_medium',
                quantity: 1,
                quality_range: [10, 20]
            },
            crafting_time_minutes: 90,
            tools_required: ['knife_skinning', 'needle_leather'],
            success_rate_formula: 'base_65 + (level * 3) + dexterity_mod',
            critical_success_bonus: '+5 slots d\'inventaire supplémentaires',
            fail_consequence: 'Sac avec trous (capacité réduite de 30%)'
        },
        {
            id: 'saddle_basic',
            name: 'Selle Basique',
            level_required: 2,
            ingredients: [
                { itemId: 'leather_thick', quantity: 8 },
                { itemId: 'padding_wool', quantity: 3 },
                { itemId: 'buckle_iron', quantity: 4 }
            ],
            result: {
                itemId: 'saddle_basic',
                quantity: 1,
                quality_range: [5, 10]
            },
            crafting_time_minutes: 150,
            tools_required: ['knife_skinning', 'needle_leather', 'hammer_small'],
            success_rate_formula: 'base_55 + (level * 3) + strength_mod',
            critical_success_bonus: '+10% vitesse de monture',
            fail_consequence: 'Selle inconfortable (monture fatiguée plus vite)'
        },
        
        // ─── PALIER 3 : MAÎTRE ───
        {
            id: 'armor_dragonscale',
            name: 'Armure d\'Écailles de Dragon',
            level_required: 3,
            ingredients: [
                { itemId: 'scale_dragon', quantity: 20 },
                { itemId: 'leather_thick', quantity: 8 },
                { itemId: 'thread_reinforced', quantity: 8 },
                { itemId: 'oil_fire_resistant', quantity: 2 }
            ],
            result: {
                itemId: 'armor_dragonscale',
                quantity: 1,
                quality_range: [8, 12]
            },
            crafting_time_minutes: 240,
            tools_required: ['knife_skinning', 'needle_leather', 'hammer_small', 'anvil_small'],
            success_rate_formula: 'base_50 + (level * 4) + dexterity_mod',
            critical_success_bonus: 'Résistance au feu +50%',
            fail_consequence: 'Écailles mal alignées (AC réduit de 2)'
        },
        {
            id: 'cloak_shadow',
            name: 'Cape d\'Ombre',
            level_required: 3,
            ingredients: [
                { itemId: 'leather_shadowbeast', quantity: 4 },
                { itemId: 'thread_silk_spider', quantity: 5 },
                { itemId: 'essence_shadow', quantity: 2 }
            ],
            result: {
                itemId: 'cloak_shadow',
                quantity: 1,
                quality_range: [10, 15]
            },
            crafting_time_minutes: 180,
            tools_required: ['knife_skinning', 'needle_enchanted'],
            success_rate_formula: 'base_45 + (level * 4) + dexterity_mod',
            critical_success_bonus: '+10 Furtivité dans l\'ombre',
            fail_consequence: 'Cape ordinaire (perd propriétés magiques)'
        },
        {
            id: 'bag_enchanted',
            name: 'Sac Enchanté',
            level_required: 3,
            ingredients: [
                { itemId: 'leather_thick', quantity: 6 },
                { itemId: 'thread_arcane', quantity: 8 },
                { itemId: 'essence_space', quantity: 3 },
                { itemId: 'buckle_mithril', quantity: 2 }
            ],
            result: {
                itemId: 'bag_enchanted',
                quantity: 1,
                quality_range: [30, 50]
            },
            crafting_time_minutes: 210,
            tools_required: ['knife_skinning', 'needle_enchanted'],
            success_rate_formula: 'base_40 + (level * 4) + (dexterity_mod + intelligence_mod)',
            critical_success_bonus: '+20 slots d\'inventaire au lieu de +15',
            fail_consequence: 'Enchantement raté (sac ordinaire)'
        },
        {
            id: 'saddle_war',
            name: 'Selle de Guerre',
            level_required: 3,
            ingredients: [
                { itemId: 'leather_thick', quantity: 10 },
                { itemId: 'plate_steel', quantity: 4 },
                { itemId: 'padding_quality', quantity: 5 },
                { itemId: 'buckle_steel', quantity: 6 }
            ],
            result: {
                itemId: 'saddle_war',
                quantity: 1,
                quality_range: [15, 25]
            },
            crafting_time_minutes: 240,
            tools_required: ['knife_skinning', 'needle_leather', 'hammer_small', 'anvil_small'],
            success_rate_formula: 'base_45 + (level * 4) + strength_mod',
            critical_success_bonus: '+2 AC au cavalier, +15% vitesse de monture',
            fail_consequence: 'Selle lourde (vitesse de monture -10%)'
        },
        {
            id: 'armor_leather_reinforced',
            name: 'Armure de Cuir Renforcé',
            level_required: 3,
            ingredients: [
                { itemId: 'leather_thick', quantity: 10 },
                { itemId: 'plate_steel', quantity: 8 },
                { itemId: 'thread_reinforced', quantity: 10 },
                { itemId: 'oil_hardening', quantity: 2 }
            ],
            result: {
                itemId: 'armor_leather_reinforced',
                quantity: 1,
                quality_range: [7, 11]
            },
            crafting_time_minutes: 200,
            tools_required: ['knife_skinning', 'needle_leather', 'hammer_small', 'anvil_small'],
            success_rate_formula: 'base_50 + (level * 4) + dexterity_mod',
            critical_success_bonus: '+3 AC et résistance aux dégâts tranchants',
            fail_consequence: 'Armure rigide (malus -2 DEX)'
        },
        
        // ─── PALIER 4 : GRAND MAÎTRE ───
        {
            id: 'armor_wyrmhide',
            name: 'Armure de Peau de Wyrm',
            level_required: 4,
            ingredients: [
                { itemId: 'hide_ancient_wyrm', quantity: 1 },
                { itemId: 'scale_dragon_elder', quantity: 30 },
                { itemId: 'thread_mithril', quantity: 15 },
                { itemId: 'essence_elemental', quantity: 5 },
                { itemId: 'oil_legendary', quantity: 2 }
            ],
            result: {
                itemId: 'armor_wyrmhide',
                quantity: 1,
                quality_range: [15, 20]
            },
            crafting_time_minutes: 480,
            tools_required: ['knife_skinning', 'needle_enchanted', 'anvil_masterwork', 'forge_dragonfire'],
            success_rate_formula: 'base_25 + (level * 6) + (dexterity_mod * 2) + (strength_mod * 2)',
            critical_success_bonus: 'Résistance à tous les éléments +30%',
            fail_consequence: 'Peau de wyrm ruinée (matériaux détruits)'
        },
        {
            id: 'cloak_displacement',
            name: 'Cape de Déplacement',
            level_required: 4,
            ingredients: [
                { itemId: 'leather_ethereal', quantity: 5 },
                { itemId: 'thread_phase_spider', quantity: 10 },
                { itemId: 'essence_illusion', quantity: 8 },
                { itemId: 'gem_amethyst', quantity: 3 }
            ],
            result: {
                itemId: 'cloak_displacement',
                quantity: 1,
                quality_range: [18, 25]
            },
            crafting_time_minutes: 360,
            tools_required: ['knife_skinning', 'needle_enchanted', 'altar_enchanting'],
            success_rate_formula: 'base_30 + (level * 5) + dexterity_mod + intelligence_mod',
            critical_success_bonus: 'Crée des images miroirs du porteur (3 copies)',
            fail_consequence: 'Cape instable (téléportation aléatoire 1d100 mètres)'
        },
        {
            id: 'bag_holding',
            name: 'Sac Sans Fond',
            level_required: 4,
            ingredients: [
                { itemId: 'leather_ethereal', quantity: 8 },
                { itemId: 'thread_arcane', quantity: 20 },
                { itemId: 'essence_void', quantity: 10 },
                { itemId: 'crystal_dimensional', quantity: 1 }
            ],
            result: {
                itemId: 'bag_holding',
                quantity: 1,
                quality_range: [100, 200]
            },
            crafting_time_minutes: 420,
            tools_required: ['knife_skinning', 'needle_enchanted', 'altar_enchanting'],
            success_rate_formula: 'base_20 + (level * 6) + (dexterity_mod + intelligence_mod) * 2',
            critical_success_bonus: 'Capacité ILLIMITÉE (espace extra-dimensionnel stable)',
            fail_consequence: 'Trou noir portable (aspire tout dans un rayon de 3m)'
        },
        {
            id: 'armor_legendary',
            name: 'Armure Légendaire du Maître Tanneur',
            level_required: 4,
            ingredients: [
                { itemId: 'hide_ancient_wyrm', quantity: 2 },
                { itemId: 'scale_prismatic_dragon', quantity: 50 },
                { itemId: 'thread_adamantine', quantity: 20 },
                { itemId: 'essence_primordial', quantity: 10 },
                { itemId: 'rune_protection', quantity: 5 }
            ],
            result: {
                itemId: 'armor_legendary_leatherworker',
                quantity: 1,
                quality_range: [20, 25]
            },
            crafting_time_minutes: 480,
            tools_required: ['knife_skinning', 'needle_enchanted', 'anvil_masterwork', 'forge_dragonfire', 'altar_enchanting'],
            success_rate_formula: 'base_25 + (level * 6) + (dexterity_mod * 3)',
            critical_success_bonus: 'Armure vivante (auto-réparation + adaptation aux dangers)',
            fail_consequence: 'Explosion dimensionnelle (6d20 dégâts force, rayon 10m)'
        }
    ],
    
    specializations: [
        {
            id: 'master_tanner',
            name: 'Maître Tanneur',
            description: 'Expert du tannage et de la préparation des cuirs de qualité supérieure.',
            unlock_level: 2,
            bonus_effects: [
                '+20% qualité des cuirs tannés',
                'Peut récupérer 2x plus de cuir des peaux brutes',
                'Les cuirs tannés se vendent 50% plus cher'
            ]
        },
        {
            id: 'dragonscale_artisan',
            name: 'Artisan Draconique',
            description: 'Spécialiste du travail des écailles et cuirs de dragons.',
            unlock_level: 3,
            bonus_effects: [
                '+15% efficacité des armures d\'écailles',
                'Peut extraire les écailles sans abîmer la peau',
                '+1 résistance élémentaire supplémentaire sur armures draconiques',
                'Les armures d\'écailles pèsent 40% moins lourd'
            ]
        },
        {
            id: 'shadow_crafter',
            name: 'Artisan des Ombres',
            description: 'Maître de la création d\'équipement furtif et discret.',
            unlock_level: 3,
            bonus_effects: [
                '+20% bonus de furtivité sur équipement créé',
                'Les armures ne font aucun bruit',
                'Peut intégrer des poches secrètes indétectables',
                '+10 Discrétion pour le porteur'
            ]
        },
        {
            id: 'dimensional_leatherworker',
            name: 'Tanneur Dimensionnel',
            description: 'Crée des objets qui défient l\'espace et la physique normale.',
            unlock_level: 4,
            bonus_effects: [
                '+30% capacité des sacs enchantés',
                'Peut créer des poches dimensionnelles dans n\'importe quel objet',
                'Les sacs créés sont immunisés aux déchirures et perforations',
                '5% chance de créer un sac avec ESPACE INFINI'
            ]
        }
    ],
    
    synergies_with: ['skinning', 'hunting', 'blacksmithing', 'enchanting'],
    
    faction_reputation: [
        {
            factionId: 'hunters_lodge',
            bonus_per_rank: 40
        },
        {
            factionId: 'adventurers_guild',
            bonus_per_rank: 35
        },
        {
            factionId: 'cavalry_order',
            bonus_per_rank: 30
        }
    ]
};
