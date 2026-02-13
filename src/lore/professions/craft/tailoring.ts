// ═══════════════════════════════════════════════════════════════════════
// 🧵 TAILORING (COUTURE) - Tisser la magie dans les étoffes
// ═══════════════════════════════════════════════════════════════════════

import { Profession } from '../index';

export const TAILORING: Profession = {
    id: 'tailoring',
    name: 'Couture',
    category: 'craft',
    description: 'Crée des robes, vêtements et tissus enchantés, souvent imprégnés de magie.',
    lore_background: `Les Couturiers d'Aethelgard sont des artisans d'élite qui tissent non seulement 
    des fils, mais aussi des enchantements dans chaque couture. Leurs créations vont des simples tuniques 
    aux robes majestueuses des archimages, en passant par les bannières de guerre enchantées. Les maîtres 
    couturiers peuvent tisser des sorts directement dans l'étoffe, créant des vêtements vivants de magie.`,
    
    primary_stat: 'dexterity',
    secondary_stat: 'intelligence',
    
    starting_tools: [
        { itemId: 'needle_sewing', quantity: 2 },
        { itemId: 'scissors', quantity: 1 },
        { itemId: 'thread_cotton', quantity: 10 }
    ],
    
    ranks: [
        {
            level: 1,
            title: 'Apprenti Couturier',
            xp_required: 0,
            recipes_unlocked: ['shirt_linen', 'robe_simple', 'bandage_cloth'],
            passive_bonuses: [
                '+5% qualité des vêtements créés',
                'Peut réparer des vêtements endommagés'
            ]
        },
        {
            level: 2,
            title: 'Couturier',
            xp_required: 1000,
            recipes_unlocked: ['robe_mage', 'cloak_traveler', 'bag_spell', 'tunic_silk'],
            passive_bonuses: [
                '+10% qualité des vêtements',
                '+1 slot de sort sur robes magiques',
                'Peut tisser des motifs enchantés basiques'
            ]
        },
        {
            level: 3,
            title: 'Maître Couturier',
            xp_required: 5000,
            recipes_unlocked: ['robe_archmage', 'cloak_resistance', 'banner_war', 'carpet_flying', 'vestments_priest'],
            passive_bonuses: [
                '+15% qualité',
                '+2 slots de sort',
                'Peut tisser des sorts dans l\'étoffe',
                'Les vêtements créés confèrent +10% résistance magique'
            ],
            special_ability: 'Tisserand Runique : Peut broder des runes magiques qui activent des sorts à la demande'
        },
        {
            level: 4,
            title: 'Grand Maître Couturier',
            xp_required: 15000,
            recipes_unlocked: ['robe_timeless', 'cloak_invisibility', 'tapestry_living', 'vestments_divine'],
            passive_bonuses: [
                '+25% qualité',
                '+3 slots de sort',
                'Les vêtements sont immunisés aux dégâts non-magiques',
                'Confèrent absorption des sorts niveau 1-3',
                '10% chance de créer un vêtement SENSIBLE (intelligence propre)'
            ],
            special_ability: 'Archevêque du Fil : Peut tisser des sorts de niveau 9 dans les robes, créant des artefacts textiles'
        }
    ],
    
    recipes: [
        // ─── PALIER 1 : APPRENTI ───
        {
            id: 'shirt_linen',
            name: 'Chemise de Lin',
            level_required: 1,
            ingredients: [
                { itemId: 'cloth_linen', quantity: 3 },
                { itemId: 'thread_cotton', quantity: 2 }
            ],
            result: {
                itemId: 'shirt_linen',
                quantity: 1,
                quality_range: [1, 3]
            },
            crafting_time_minutes: 30,
            tools_required: ['needle_sewing', 'scissors'],
            success_rate_formula: 'base_70 + (level * 2) + dexterity_mod',
            critical_success_bonus: '+1 CHA (vêtement bien coupé)',
            fail_consequence: 'Tissu gaspillé (perte de 50%)'
        },
        {
            id: 'robe_simple',
            name: 'Robe Simple',
            level_required: 1,
            ingredients: [
                { itemId: 'cloth_wool', quantity: 4 },
                { itemId: 'thread_cotton', quantity: 3 }
            ],
            result: {
                itemId: 'robe_simple',
                quantity: 1,
                quality_range: [1, 2]
            },
            crafting_time_minutes: 60,
            tools_required: ['needle_sewing', 'scissors'],
            success_rate_formula: 'base_65 + (level * 2) + dexterity_mod',
            critical_success_bonus: '+1 AC',
            fail_consequence: 'Robe mal cousue (malus -1 CHA)'
        },
        {
            id: 'bandage_cloth',
            name: 'Bandages de Tissu',
            level_required: 1,
            ingredients: [
                { itemId: 'cloth_linen', quantity: 2 }
            ],
            result: {
                itemId: 'bandage_cloth',
                quantity: 10,
                quality_range: [5, 10]
            },
            crafting_time_minutes: 15,
            tools_required: ['scissors'],
            success_rate_formula: 'base_70 + (level * 2) + dexterity_mod',
            critical_success_bonus: 'Bandages stériles (+50% soins)',
            fail_consequence: 'Bandages sales (efficacité -30%)'
        },
        
        // ─── PALIER 2 : COUTURIER ───
        {
            id: 'robe_mage',
            name: 'Robe de Mage',
            level_required: 2,
            ingredients: [
                { itemId: 'cloth_silk', quantity: 6 },
                { itemId: 'thread_silver', quantity: 5 },
                { itemId: 'dust_arcane', quantity: 2 }
            ],
            result: {
                itemId: 'robe_mage',
                quantity: 1,
                quality_range: [3, 6]
            },
            crafting_time_minutes: 120,
            tools_required: ['needle_sewing', 'scissors', 'loom'],
            success_rate_formula: 'base_60 + (level * 3) + dexterity_mod',
            critical_success_bonus: '+10% puissance des sorts',
            fail_consequence: 'Enchantement raté (robe ordinaire)'
        },
        {
            id: 'cloak_traveler',
            name: 'Cape de Voyageur',
            level_required: 2,
            ingredients: [
                { itemId: 'cloth_wool', quantity: 5 },
                { itemId: 'thread_reinforced', quantity: 3 },
                { itemId: 'clasp_bronze', quantity: 1 }
            ],
            result: {
                itemId: 'cloak_traveler',
                quantity: 1,
                quality_range: [2, 5]
            },
            crafting_time_minutes: 90,
            tools_required: ['needle_sewing', 'scissors'],
            success_rate_formula: 'base_60 + (level * 3) + dexterity_mod',
            critical_success_bonus: 'Résistance aux intempéries',
            fail_consequence: 'Cape perméable (inutile sous la pluie)'
        },
        {
            id: 'bag_spell',
            name: 'Sac à Composantes',
            level_required: 2,
            ingredients: [
                { itemId: 'cloth_silk', quantity: 3 },
                { itemId: 'thread_silver', quantity: 4 },
                { itemId: 'rune_storage', quantity: 1 }
            ],
            result: {
                itemId: 'bag_spell',
                quantity: 1,
                quality_range: [10, 20]
            },
            crafting_time_minutes: 75,
            tools_required: ['needle_sewing', 'scissors'],
            success_rate_formula: 'base_65 + (level * 3) + intelligence_mod',
            critical_success_bonus: 'Préserve les composantes fragiles',
            fail_consequence: 'Sac ordinaire (pas de protection magique)'
        },
        {
            id: 'tunic_silk',
            name: 'Tunique de Soie',
            level_required: 2,
            ingredients: [
                { itemId: 'cloth_silk', quantity: 4 },
                { itemId: 'thread_silk', quantity: 3 },
                { itemId: 'dye_quality', quantity: 1 }
            ],
            result: {
                itemId: 'tunic_silk',
                quantity: 1,
                quality_range: [4, 7]
            },
            crafting_time_minutes: 100,
            tools_required: ['needle_sewing', 'scissors', 'loom'],
            success_rate_formula: 'base_55 + (level * 3) + dexterity_mod',
            critical_success_bonus: '+2 CHA (élégance remarquable)',
            fail_consequence: 'Soie froissée (qualité médiocre)'
        },
        
        // ─── PALIER 3 : MAÎTRE ───
        {
            id: 'robe_archmage',
            name: 'Robe d\'Archimage',
            level_required: 3,
            ingredients: [
                { itemId: 'cloth_moonweave', quantity: 8 },
                { itemId: 'thread_mithril', quantity: 10 },
                { itemId: 'essence_arcane', quantity: 5 },
                { itemId: 'gem_sapphire', quantity: 3 }
            ],
            result: {
                itemId: 'robe_archmage',
                quantity: 1,
                quality_range: [8, 12]
            },
            crafting_time_minutes: 240,
            tools_required: ['needle_enchanted', 'scissors', 'loom_master', 'altar_weaving'],
            success_rate_formula: 'base_50 + (level * 4) + (dexterity_mod + intelligence_mod)',
            critical_success_bonus: '+20% puissance des sorts, +2 AC',
            fail_consequence: 'Tissu instable (dégâts aléatoires 1d6 par jour)'
        },
        {
            id: 'cloak_resistance',
            name: 'Cape de Résistance',
            level_required: 3,
            ingredients: [
                { itemId: 'cloth_dragonweave', quantity: 6 },
                { itemId: 'thread_mithril', quantity: 8 },
                { itemId: 'scale_dragon', quantity: 10 },
                { itemId: 'essence_protection', quantity: 3 }
            ],
            result: {
                itemId: 'cloak_resistance',
                quantity: 1,
                quality_range: [10, 15]
            },
            crafting_time_minutes: 200,
            tools_required: ['needle_enchanted', 'scissors', 'loom_master'],
            success_rate_formula: 'base_45 + (level * 4) + dexterity_mod',
            critical_success_bonus: '+3 aux jets de sauvegarde',
            fail_consequence: 'Cape lourde (vitesse -5)'
        },
        {
            id: 'banner_war',
            name: 'Bannière de Guerre',
            level_required: 3,
            ingredients: [
                { itemId: 'cloth_quality', quantity: 10 },
                { itemId: 'thread_gold', quantity: 12 },
                { itemId: 'dye_royal', quantity: 3 },
                { itemId: 'essence_courage', quantity: 2 }
            ],
            result: {
                itemId: 'banner_war',
                quantity: 1,
                quality_range: [15, 25]
            },
            crafting_time_minutes: 180,
            tools_required: ['needle_sewing', 'scissors', 'loom_master'],
            success_rate_formula: 'base_50 + (level * 4) + intelligence_mod',
            critical_success_bonus: '+2 moral à tous les alliés dans un rayon de 30m',
            fail_consequence: 'Bannière fade (bonus réduit de 50%)'
        },
        {
            id: 'carpet_flying',
            name: 'Tapis Volant',
            level_required: 3,
            ingredients: [
                { itemId: 'cloth_cloudweave', quantity: 12 },
                { itemId: 'thread_silver', quantity: 20 },
                { itemId: 'essence_air', quantity: 8 },
                { itemId: 'feather_phoenix', quantity: 5 }
            ],
            result: {
                itemId: 'carpet_flying',
                quantity: 1,
                quality_range: [20, 30]
            },
            crafting_time_minutes: 300,
            tools_required: ['needle_enchanted', 'loom_master', 'altar_weaving'],
            success_rate_formula: 'base_40 + (level * 5) + (dexterity_mod + intelligence_mod)',
            critical_success_bonus: 'Vitesse de vol 2x, peut transporter 4 personnes',
            fail_consequence: 'Tapis instable (chute après 1d10 minutes)'
        },
        {
            id: 'vestments_priest',
            name: 'Vêtements Sacerdotaux',
            level_required: 3,
            ingredients: [
                { itemId: 'cloth_holy', quantity: 8 },
                { itemId: 'thread_gold', quantity: 10 },
                { itemId: 'water_blessed', quantity: 3 },
                { itemId: 'symbol_holy', quantity: 1 }
            ],
            result: {
                itemId: 'vestments_priest',
                quantity: 1,
                quality_range: [12, 18]
            },
            crafting_time_minutes: 220,
            tools_required: ['needle_sewing', 'scissors', 'altar_holy'],
            success_rate_formula: 'base_45 + (level * 4) + wisdom_mod',
            critical_success_bonus: '+2 aux jets de canalisation divine',
            fail_consequence: 'Vêtements non consacrés (aucun bonus)'
        },
        
        // ─── PALIER 4 : GRAND MAÎTRE ───
        {
            id: 'robe_timeless',
            name: 'Robe Hors du Temps',
            level_required: 4,
            ingredients: [
                { itemId: 'cloth_voidweave', quantity: 15 },
                { itemId: 'thread_chronos', quantity: 20 },
                { itemId: 'essence_time', quantity: 10 },
                { itemId: 'crystal_temporal', quantity: 5 },
                { itemId: 'sand_hourglass_eternal', quantity: 3 }
            ],
            result: {
                itemId: 'robe_timeless',
                quantity: 1,
                quality_range: [18, 25]
            },
            crafting_time_minutes: 480,
            tools_required: ['needle_enchanted', 'loom_legendary', 'altar_weaving', 'sanctum_time'],
            success_rate_formula: 'base_25 + (level * 6) + (dexterity_mod * 2) + (intelligence_mod * 2)',
            critical_success_bonus: 'Le porteur ne vieillit pas, immunité aux effets temporels',
            fail_consequence: 'Paradoxe temporel (vieillissement instantané 2d10 ans)'
        },
        {
            id: 'cloak_invisibility',
            name: 'Cape d\'Invisibilité',
            level_required: 4,
            ingredients: [
                { itemId: 'cloth_ethereal', quantity: 10 },
                { itemId: 'thread_phase_spider', quantity: 15 },
                { itemId: 'essence_illusion', quantity: 12 },
                { itemId: 'dust_displacer_beast', quantity: 8 }
            ],
            result: {
                itemId: 'cloak_invisibility',
                quantity: 1,
                quality_range: [20, 25]
            },
            crafting_time_minutes: 420,
            tools_required: ['needle_enchanted', 'loom_legendary', 'altar_weaving'],
            success_rate_formula: 'base_30 + (level * 5) + dexterity_mod + intelligence_mod',
            critical_success_bonus: 'Invisibilité parfaite (même contre vision vraie)',
            fail_consequence: 'Cape défectueuse (invisibilité partielle seulement)'
        },
        {
            id: 'tapestry_living',
            name: 'Tapisserie Vivante',
            level_required: 4,
            ingredients: [
                { itemId: 'cloth_dreamweave', quantity: 20 },
                { itemId: 'thread_rainbow', quantity: 30 },
                { itemId: 'essence_life', quantity: 15 },
                { itemId: 'paint_enchanted', quantity: 10 }
            ],
            result: {
                itemId: 'tapestry_living',
                quantity: 1,
                quality_range: [50, 100]
            },
            crafting_time_minutes: 480,
            tools_required: ['needle_enchanted', 'loom_legendary', 'altar_weaving'],
            success_rate_formula: 'base_20 + (level * 6) + (dexterity_mod + intelligence_mod) * 2',
            critical_success_bonus: 'Tapisserie crée un portail vers le lieu représenté',
            fail_consequence: 'Tapisserie cauchemardesque (crée des monstres 1/jour)'
        },
        {
            id: 'vestments_divine',
            name: 'Vêtements Divins',
            level_required: 4,
            ingredients: [
                { itemId: 'cloth_celestial', quantity: 12 },
                { itemId: 'thread_angel_hair', quantity: 20 },
                { itemId: 'essence_divine', quantity: 10 },
                { itemId: 'feather_angel', quantity: 8 },
                { itemId: 'blessing_deity', quantity: 1 }
            ],
            result: {
                itemId: 'vestments_divine',
                quantity: 1,
                quality_range: [22, 28]
            },
            crafting_time_minutes: 450,
            tools_required: ['needle_enchanted', 'altar_holy', 'sanctum_divine'],
            success_rate_formula: 'base_25 + (level * 6) + (wisdom_mod * 3)',
            critical_success_bonus: '+5 aux jets de canalisation, peut lancer un sort de niveau 9/jour',
            fail_consequence: 'Colère divine (porteur maudit pendant 7 jours)'
        }
    ],
    
    specializations: [
        {
            id: 'royal_tailor',
            name: 'Couturier Royal',
            description: 'Crée des vêtements somptueux pour la noblesse et la royauté.',
            unlock_level: 2,
            bonus_effects: [
                '+15% qualité des vêtements de luxe',
                '+3 CHA pour qui porte les créations',
                'Les vêtements royaux confèrent autorité (+10 Persuasion)',
                'Prix de vente 2x plus élevé'
            ]
        },
        {
            id: 'rune_weaver',
            name: 'Tisserand Runique',
            description: 'Intègre des runes et symboles magiques dans chaque tissu.',
            unlock_level: 3,
            bonus_effects: [
                '+20% puissance des enchantements tissés',
                'Peut tisser 3 sorts différents dans un même vêtement',
                '+2 slots de sort sur robes',
                'Les runes tissées ne se dégradent jamais'
            ]
        },
        {
            id: 'battle_weaver',
            name: 'Tisserand de Bataille',
            description: 'Spécialiste des bannières et vêtements de guerre enchantés.',
            unlock_level: 3,
            bonus_effects: [
                '+30% bonus des bannières de guerre',
                'Peut créer des tabards qui augmentent AC de +2',
                'Les bannières affectent un rayon de 50m au lieu de 30m',
                '+1 moral permanent aux troupes équipées'
            ]
        },
        {
            id: 'ethereal_tailor',
            name: 'Couturier Éthéré',
            description: 'Maître des tissus dimensionnels et des vêtements impossibles.',
            unlock_level: 4,
            bonus_effects: [
                '+25% efficacité des vêtements dimensionnels',
                'Peut tisser des vêtements avec plusieurs couches dimensionnelles',
                'Les capes d\'invisibilité ont durée illimitée',
                '10% chance de créer un vêtement TRANS-DIMENSIONNEL (existe dans plusieurs plans simultanément)'
            ]
        }
    ],
    
    synergies_with: ['enchanting', 'alchemy', 'herbalism'],
    
    faction_reputation: [
        {
            factionId: 'mages_guild',
            bonus_per_rank: 40
        },
        {
            factionId: 'royal_court',
            bonus_per_rank: 45
        },
        {
            factionId: 'fashion_guild',
            bonus_per_rank: 50
        }
    ]
};
