// ═══════════════════════════════════════════════════════════════════════
// 💎 JEWELCRAFTING (JOAILLERIE) - Tailler les gemmes et forger des bijoux précieux
// ═══════════════════════════════════════════════════════════════════════

import { Profession } from '../index';

export const JEWELCRAFTING: Profession = {
    id: 'jewelcrafting',
    name: 'Joaillerie',
    category: 'craft',
    description: 'Taille des gemmes précieuses et forge des bijoux enchantés aux pouvoirs extraordinaires.',
    lore_background: `Les Joailliers d'Aethelgard sont des artisans d'une précision extrême qui travaillent 
    les gemmes et métaux précieux pour créer des bijoux d'une beauté éblouissante. Mais au-delà de l'esthétique, 
    ils peuvent capturer la magie dans les cristaux, créer des amulettes de protection et forger des couronnes 
    royales aux pouvoirs légendaires. Les grands maîtres peuvent même créer des joyaux sensibles.`,
    
    primary_stat: 'dexterity',
    secondary_stat: 'wisdom',
    
    starting_tools: [
        { itemId: 'hammer_jeweler', quantity: 1 },
        { itemId: 'file_jeweler', quantity: 1 },
        { itemId: 'loupe_magnifying', quantity: 1 }
    ],
    
    ranks: [
        {
            level: 1,
            title: 'Apprenti Joaillier',
            xp_required: 0,
            recipes_unlocked: ['ring_copper', 'necklace_simple', 'gem_cut_basic'],
            passive_bonuses: [
                '+5% qualité des bijoux créés',
                'Peut identifier les gemmes basiques'
            ]
        },
        {
            level: 2,
            title: 'Joaillier',
            xp_required: 1000,
            recipes_unlocked: ['ring_silver', 'amulet_protection', 'gem_cut_quality', 'earring_enchanted'],
            passive_bonuses: [
                '+10% qualité',
                '+1 effet magique sur bijoux enchantés',
                'Peut évaluer la vraie valeur des gemmes'
            ]
        },
        {
            level: 3,
            title: 'Maître Joaillier',
            xp_required: 5000,
            recipes_unlocked: ['ring_gold_enchanted', 'crown_minor', 'amulet_power', 'gem_prismatic', 'brooch_noble'],
            passive_bonuses: [
                '+15% qualité',
                '+2 effets magiques',
                'Peut fusionner des gemmes',
                'Les bijoux créés ne se ternissent jamais'
            ],
            special_ability: 'Lapidaire Expert : Peut tailler une gemme pour maximiser ses propriétés magiques (x2 puissance)'
        },
        {
            level: 4,
            title: 'Grand Maître Joaillier',
            xp_required: 15000,
            recipes_unlocked: ['crown_legendary', 'amulet_immortality', 'ring_omnipotence', 'gem_philosophers_stone'],
            passive_bonuses: [
                '+25% qualité',
                '+3 effets magiques',
                'Peut créer des gemmes artificielles parfaites',
                'Les bijoux confèrent immunité aux malédictions',
                '10% chance de créer un bijou SENSIBLE (volonté propre)'
            ],
            special_ability: 'Orfèvre Divin : Peut enchâsser des fragments d\'âme dans les bijoux, leur conférant conscience et pouvoirs uniques'
        }
    ],
    
    recipes: [
        // ─── PALIER 1 : APPRENTI ───
        {
            id: 'ring_copper',
            name: 'Anneau de Cuivre',
            level_required: 1,
            ingredients: [
                { itemId: 'bar_copper', quantity: 1 }
            ],
            result: {
                itemId: 'ring_copper',
                quantity: 1,
                quality_range: [1, 3]
            },
            crafting_time_minutes: 20,
            tools_required: ['hammer_jeweler', 'file_jeweler'],
            success_rate_formula: 'base_70 + (level * 2) + dexterity_mod',
            critical_success_bonus: '+1 CHA',
            fail_consequence: 'Anneau déformé (invendable)'
        },
        {
            id: 'necklace_simple',
            name: 'Collier Simple',
            level_required: 1,
            ingredients: [
                { itemId: 'chain_copper', quantity: 1 },
                { itemId: 'gem_quartz', quantity: 1 }
            ],
            result: {
                itemId: 'necklace_simple',
                quantity: 1,
                quality_range: [2, 5]
            },
            crafting_time_minutes: 30,
            tools_required: ['hammer_jeweler', 'file_jeweler'],
            success_rate_formula: 'base_65 + (level * 2) + dexterity_mod',
            critical_success_bonus: '+1 WIS',
            fail_consequence: 'Gemme terne (effet réduit de 50%)'
        },
        {
            id: 'gem_cut_basic',
            name: 'Taille de Gemme Basique',
            level_required: 1,
            ingredients: [
                { itemId: 'gem_rough', quantity: 1 }
            ],
            result: {
                itemId: 'gem_cut',
                quantity: 1,
                quality_range: [5, 15]
            },
            crafting_time_minutes: 45,
            tools_required: ['file_jeweler', 'loupe_magnifying'],
            success_rate_formula: 'base_65 + (level * 2) + dexterity_mod',
            critical_success_bonus: 'Taille parfaite (+50% valeur)',
            fail_consequence: 'Gemme brisée (perte totale)'
        },
        
        // ─── PALIER 2 : JOAILLIER ───
        {
            id: 'ring_silver',
            name: 'Anneau d\'Argent',
            level_required: 2,
            ingredients: [
                { itemId: 'bar_silver', quantity: 1 },
                { itemId: 'gem_moonstone', quantity: 1 }
            ],
            result: {
                itemId: 'ring_silver',
                quantity: 1,
                quality_range: [3, 6]
            },
            crafting_time_minutes: 60,
            tools_required: ['hammer_jeweler', 'file_jeweler', 'crucible'],
            success_rate_formula: 'base_60 + (level * 3) + dexterity_mod',
            critical_success_bonus: '+1 INT, +1 WIS',
            fail_consequence: 'Argent terni (apparence médiocre)'
        },
        {
            id: 'amulet_protection',
            name: 'Amulette de Protection',
            level_required: 2,
            ingredients: [
                { itemId: 'chain_silver', quantity: 1 },
                { itemId: 'gem_sapphire', quantity: 1 },
                { itemId: 'essence_protection', quantity: 2 }
            ],
            result: {
                itemId: 'amulet_protection',
                quantity: 1,
                quality_range: [5, 10]
            },
            crafting_time_minutes: 90,
            tools_required: ['hammer_jeweler', 'file_jeweler', 'crucible'],
            success_rate_formula: 'base_55 + (level * 3) + dexterity_mod',
            critical_success_bonus: '+2 AC',
            fail_consequence: 'Enchantement instable (effet aléatoire)'
        },
        {
            id: 'gem_cut_quality',
            name: 'Taille de Gemme de Qualité',
            level_required: 2,
            ingredients: [
                { itemId: 'gem_rough_quality', quantity: 1 },
                { itemId: 'oil_polishing', quantity: 1 }
            ],
            result: {
                itemId: 'gem_cut_quality',
                quantity: 1,
                quality_range: [20, 40]
            },
            crafting_time_minutes: 120,
            tools_required: ['file_jeweler', 'loupe_magnifying', 'wheel_cutting'],
            success_rate_formula: 'base_55 + (level * 3) + dexterity_mod',
            critical_success_bonus: 'Taille exceptionnelle (+100% valeur)',
            fail_consequence: 'Gemme fissurée (valeur -70%)'
        },
        {
            id: 'earring_enchanted',
            name: 'Boucles d\'Oreilles Enchantées',
            level_required: 2,
            ingredients: [
                { itemId: 'wire_silver', quantity: 2 },
                { itemId: 'gem_pearl', quantity: 2 },
                { itemId: 'dust_arcane', quantity: 1 }
            ],
            result: {
                itemId: 'earring_enchanted',
                quantity: 1,
                quality_range: [8, 15]
            },
            crafting_time_minutes: 75,
            tools_required: ['hammer_jeweler', 'file_jeweler'],
            success_rate_formula: 'base_60 + (level * 3) + dexterity_mod',
            critical_success_bonus: '+2 CHA, +5 Perception',
            fail_consequence: 'Enchantement raté (boucles ordinaires)'
        },
        
        // ─── PALIER 3 : MAÎTRE ───
        {
            id: 'ring_gold_enchanted',
            name: 'Anneau d\'Or Enchanté',
            level_required: 3,
            ingredients: [
                { itemId: 'bar_gold', quantity: 1 },
                { itemId: 'gem_diamond', quantity: 1 },
                { itemId: 'essence_arcane', quantity: 5 },
                { itemId: 'rune_power', quantity: 1 }
            ],
            result: {
                itemId: 'ring_gold_enchanted',
                quantity: 1,
                quality_range: [10, 15]
            },
            crafting_time_minutes: 180,
            tools_required: ['hammer_jeweler', 'file_jeweler', 'crucible', 'forge_jeweler'],
            success_rate_formula: 'base_50 + (level * 4) + (dexterity_mod + wisdom_mod)',
            critical_success_bonus: '+2 à deux stats au choix',
            fail_consequence: 'Anneau maudit (malus permanent -1 à une stat)'
        },
        {
            id: 'crown_minor',
            name: 'Couronne Mineure',
            level_required: 3,
            ingredients: [
                { itemId: 'bar_gold', quantity: 5 },
                { itemId: 'gem_ruby', quantity: 3 },
                { itemId: 'gem_sapphire', quantity: 3 },
                { itemId: 'gem_emerald', quantity: 3 }
            ],
            result: {
                itemId: 'crown_minor',
                quantity: 1,
                quality_range: [50, 100]
            },
            crafting_time_minutes: 300,
            tools_required: ['hammer_jeweler', 'file_jeweler', 'crucible', 'forge_jeweler', 'anvil_jeweler'],
            success_rate_formula: 'base_45 + (level * 4) + dexterity_mod',
            critical_success_bonus: '+3 CHA, +10 autorité (Persuasion/Intimidation)',
            fail_consequence: 'Couronne ostentatoire (effet réduit de 50%)'
        },
        {
            id: 'amulet_power',
            name: 'Amulette de Pouvoir',
            level_required: 3,
            ingredients: [
                { itemId: 'chain_gold', quantity: 1 },
                { itemId: 'gem_star_ruby', quantity: 1 },
                { itemId: 'essence_arcane', quantity: 8 },
                { itemId: 'crystal_power', quantity: 1 }
            ],
            result: {
                itemId: 'amulet_power',
                quantity: 1,
                quality_range: [15, 25]
            },
            crafting_time_minutes: 240,
            tools_required: ['hammer_jeweler', 'file_jeweler', 'crucible', 'altar_enchanting'],
            success_rate_formula: 'base_45 + (level * 4) + (dexterity_mod + wisdom_mod)',
            critical_success_bonus: '+50% puissance des sorts, +20 mana max',
            fail_consequence: 'Amulette instable (1d6 dégâts aléatoires par jour)'
        },
        {
            id: 'gem_prismatic',
            name: 'Gemme Prismatique',
            level_required: 3,
            ingredients: [
                { itemId: 'gem_diamond', quantity: 1 },
                { itemId: 'gem_ruby', quantity: 1 },
                { itemId: 'gem_sapphire', quantity: 1 },
                { itemId: 'gem_emerald', quantity: 1 },
                { itemId: 'essence_light', quantity: 5 }
            ],
            result: {
                itemId: 'gem_prismatic',
                quantity: 1,
                quality_range: [80, 100]
            },
            crafting_time_minutes: 270,
            tools_required: ['file_jeweler', 'loupe_magnifying', 'wheel_cutting', 'prism_crystal'],
            success_rate_formula: 'base_40 + (level * 5) + dexterity_mod',
            critical_success_bonus: 'Résistance à tous les éléments +20%',
            fail_consequence: 'Explosion prismatique (3d10 dégâts radiants, gemmes détruites)'
        },
        {
            id: 'brooch_noble',
            name: 'Broche Nobiliaire',
            level_required: 3,
            ingredients: [
                { itemId: 'plate_mithril', quantity: 1 },
                { itemId: 'gem_diamond', quantity: 2 },
                { itemId: 'enamel_colored', quantity: 3 },
                { itemId: 'essence_charm', quantity: 3 }
            ],
            result: {
                itemId: 'brooch_noble',
                quantity: 1,
                quality_range: [30, 50]
            },
            crafting_time_minutes: 200,
            tools_required: ['hammer_jeweler', 'file_jeweler', 'enamel_kiln'],
            success_rate_formula: 'base_45 + (level * 4) + dexterity_mod',
            critical_success_bonus: '+4 CHA, +15 réputation avec la noblesse',
            fail_consequence: 'Broche terne (bonus CHA seulement +1)'
        },
        
        // ─── PALIER 4 : GRAND MAÎTRE ───
        {
            id: 'crown_legendary',
            name: 'Couronne Légendaire',
            level_required: 4,
            ingredients: [
                { itemId: 'bar_orichalcum', quantity: 10 },
                { itemId: 'gem_star_sapphire', quantity: 5 },
                { itemId: 'gem_black_diamond', quantity: 3 },
                { itemId: 'essence_sovereignty', quantity: 15 },
                { itemId: 'blessing_deity', quantity: 1 }
            ],
            result: {
                itemId: 'crown_legendary',
                quantity: 1,
                quality_range: [100, 150]
            },
            crafting_time_minutes: 480,
            tools_required: ['hammer_jeweler', 'file_jeweler', 'forge_jeweler', 'anvil_masterwork', 'altar_enchanting'],
            success_rate_formula: 'base_25 + (level * 6) + (dexterity_mod * 2) + (wisdom_mod * 2)',
            critical_success_bonus: '+5 à toutes les stats, autorité absolue, immunité aux charmes/peurs',
            fail_consequence: 'Couronne maudite (porteur devient tyran corrompu)'
        },
        {
            id: 'amulet_immortality',
            name: 'Amulette d\'Immortalité',
            level_required: 4,
            ingredients: [
                { itemId: 'chain_adamantine', quantity: 1 },
                { itemId: 'gem_philosophers_stone', quantity: 1 },
                { itemId: 'essence_life', quantity: 20 },
                { itemId: 'soul_fragment', quantity: 1 }
            ],
            result: {
                itemId: 'amulet_immortality',
                quantity: 1,
                quality_range: [100, 100]
            },
            crafting_time_minutes: 420,
            tools_required: ['hammer_jeweler', 'crucible', 'altar_life', 'sanctum_immortality'],
            success_rate_formula: 'base_20 + (level * 6) + (dexterity_mod + wisdom_mod) * 2',
            critical_success_bonus: 'Immortalité véritable (ne peut mourir tant que l\'amulette existe)',
            fail_consequence: 'Phylactère raté (porteur devient liche corrompue)'
        },
        {
            id: 'ring_omnipotence',
            name: 'Anneau d\'Omnipotence',
            level_required: 4,
            ingredients: [
                { itemId: 'band_mithril_pure', quantity: 1 },
                { itemId: 'gem_star_diamond', quantity: 1 },
                { itemId: 'essence_primordial', quantity: 25 },
                { itemId: 'rune_transcendence', quantity: 3 },
                { itemId: 'fragment_god', quantity: 1 }
            ],
            result: {
                itemId: 'ring_omnipotence',
                quantity: 1,
                quality_range: [100, 100]
            },
            crafting_time_minutes: 480,
            tools_required: ['hammer_jeweler', 'file_jeweler', 'forge_divine', 'anvil_creation', 'altar_gods'],
            success_rate_formula: 'base_20 + (level * 6) + (dexterity_mod * 3)',
            critical_success_bonus: '+10 à toutes les stats, peut lancer n\'importe quel sort à volonté',
            fail_consequence: 'Anneau du Tyran (corrompt le porteur, asservit sa volonté)'
        },
        {
            id: 'gem_philosophers_stone',
            name: 'Pierre Philosophale',
            level_required: 4,
            ingredients: [
                { itemId: 'gem_perfect_diamond', quantity: 1 },
                { itemId: 'essence_transmutation', quantity: 50 },
                { itemId: 'essence_life', quantity: 30 },
                { itemId: 'essence_primordial', quantity: 20 },
                { itemId: 'blood_dragon_ancient', quantity: 5 }
            ],
            result: {
                itemId: 'gem_philosophers_stone',
                quantity: 1,
                quality_range: [100, 100]
            },
            crafting_time_minutes: 480,
            tools_required: ['crucible', 'forge_alchemical', 'altar_transmutation', 'sanctum_creation'],
            success_rate_formula: 'base_25 + (level * 6) + (dexterity_mod + wisdom_mod) * 3',
            critical_success_bonus: 'Peut transmuter n\'importe quoi en or, guérit toutes maladies, prolonge la vie',
            fail_consequence: 'Explosion alchimique (8d20 dégâts force, rayon 15m)'
        }
    ],
    
    specializations: [
        {
            id: 'master_gemcutter',
            name: 'Lapidaire',
            description: 'Expert absolu de la taille et de la fusion des gemmes.',
            unlock_level: 2,
            bonus_effects: [
                '+25% valeur des gemmes taillées',
                'Peut fusionner 2 gemmes en une super-gemme',
                '0% risque de briser une gemme lors de la taille',
                '+50% puissance magique des gemmes'
            ]
        },
        {
            id: 'master_goldsmith',
            name: 'Orfèvre',
            description: 'Maître du travail des métaux précieux et des alliages rares.',
            unlock_level: 2,
            bonus_effects: [
                '+20% qualité des bijoux en métaux précieux',
                'Peut purifier les métaux (enlever impuretés)',
                'Peut créer des alliages uniques',
                'Les bijoux en or ne se ternissent JAMAIS'
            ]
        },
        {
            id: 'enchanted_jeweler',
            name: 'Joaillier Enchanté',
            description: 'Spécialiste de l\'enchâssement de magie dans les bijoux.',
            unlock_level: 3,
            bonus_effects: [
                '+30% puissance des enchantements sur bijoux',
                '+2 effets magiques supplémentaires',
                'Peut enchâsser des sorts dans les gemmes',
                'Les bijoux peuvent stocker des charges de sorts'
            ]
        },
        {
            id: 'crown_maker',
            name: 'Forgeur de Couronnes',
            description: 'Artisan légendaire capable de forger des couronnes aux pouvoirs divins.',
            unlock_level: 4,
            bonus_effects: [
                '+40% efficacité des couronnes',
                'Les couronnes confèrent autorité absolue',
                'Peut créer des couronnes liées à des lignées (héritage magique)',
                '15% chance de créer une couronne VIVANTE (choisit son porteur)'
            ]
        }
    ],
    
    synergies_with: ['mining', 'enchanting', 'alchemy'],
    
    faction_reputation: [
        {
            factionId: 'royal_court',
            bonus_per_rank: 50
        },
        {
            factionId: 'jewelers_guild',
            bonus_per_rank: 60
        },
        {
            factionId: 'noble_houses',
            bonus_per_rank: 40
        }
    ]
};
