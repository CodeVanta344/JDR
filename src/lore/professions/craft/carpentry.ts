// ═══════════════════════════════════════════════════════════════════════
// 🪓 CARPENTRY (MENUISERIE) - Façonner le bois en outils et structures
// ═══════════════════════════════════════════════════════════════════════

import { Profession } from '../index';

export const CARPENTRY: Profession = {
    id: 'carpentry',
    name: 'Menuiserie',
    category: 'craft',
    description: 'Façonne le bois pour créer armes, outils, structures et objets du quotidien.',
    lore_background: `Les Menuisiers d'Aethelgard perpétuent une tradition ancestrale de travail du bois. 
    De l'humble chaise à la porte fortifiée, des arcs de chasse aux bâtons magiques, leur maîtrise est 
    essentielle à toute civilisation. Les maîtres menuisiers peuvent façonner le bois vivant sans le tuer, 
    et créer des structures qui fusionnent avec la nature elle-même.`,
    
    primary_stat: 'strength',
    secondary_stat: 'dexterity',
    
    starting_tools: [
        { itemId: 'saw_hand', quantity: 1 },
        { itemId: 'hammer_carpenter', quantity: 1 },
        { itemId: 'nails_iron', quantity: 20 }
    ],
    
    ranks: [
        {
            level: 1,
            title: 'Apprenti Menuisier',
            xp_required: 0,
            recipes_unlocked: ['staff_simple', 'shield_wooden', 'bow_short'],
            passive_bonuses: [
                '+5% qualité des objets en bois',
                'Peut identifier les essences de bois'
            ]
        },
        {
            level: 2,
            title: 'Menuisier',
            xp_required: 1000,
            recipes_unlocked: ['bow_longbow', 'shield_reinforced', 'staff_quarterstaff', 'door_reinforced'],
            passive_bonuses: [
                '+10% qualité',
                '+1 dégâts sur armes en bois créées',
                'Peut réparer des structures en bois'
            ]
        },
        {
            level: 3,
            title: 'Maître Menuisier',
            xp_required: 5000,
            recipes_unlocked: ['bow_composite', 'shield_tower', 'staff_battle', 'siege_equipment', 'chest_reinforced'],
            passive_bonuses: [
                '+15% qualité',
                '+2 dégâts sur armes',
                'Peut travailler le bois vivant',
                'Les structures créées ont +50% durabilité'
            ],
            special_ability: 'Maître Archer : Les arcs créés ont portée +50% et précision +2'
        },
        {
            level: 4,
            title: 'Grand Maître Menuisier',
            xp_required: 15000,
            recipes_unlocked: ['bow_legendary', 'staff_archdruid', 'gate_fortress', 'ship_component'],
            passive_bonuses: [
                '+25% qualité',
                '+3 dégâts sur armes',
                'Peut animer le bois (golems de bois)',
                'Les objets deviennent pratiquement indestructibles',
                '10% chance de créer un objet VIVANT (croissance continue)'
            ],
            special_ability: 'Charpentier Légendaire : Peut construire des structures qui fusionnent avec la nature et se régénèrent'
        }
    ],
    
    recipes: [
        // ─── PALIER 1 : APPRENTI ───
        {
            id: 'staff_simple',
            name: 'Bâton Simple',
            level_required: 1,
            ingredients: [
                { itemId: 'wood_oak', quantity: 1 }
            ],
            result: {
                itemId: 'staff_simple',
                quantity: 1,
                quality_range: [4, 8]
            },
            crafting_time_minutes: 30,
            tools_required: ['saw_hand', 'knife_carving'],
            success_rate_formula: 'base_70 + (level * 2) + strength_mod',
            critical_success_bonus: '+1d6 dégâts',
            fail_consequence: 'Bâton tordu (malus -1 attaque)'
        },
        {
            id: 'shield_wooden',
            name: 'Bouclier de Bois',
            level_required: 1,
            ingredients: [
                { itemId: 'wood_oak', quantity: 2 },
                { itemId: 'handle_leather', quantity: 1 },
                { itemId: 'nails_iron', quantity: 5 }
            ],
            result: {
                itemId: 'shield_wooden',
                quantity: 1,
                quality_range: [1, 2]
            },
            crafting_time_minutes: 60,
            tools_required: ['saw_hand', 'hammer_carpenter'],
            success_rate_formula: 'base_65 + (level * 2) + strength_mod',
            critical_success_bonus: '+1 AC supplémentaire',
            fail_consequence: 'Bouclier fragile (casse au premier coup critique)'
        },
        {
            id: 'bow_short',
            name: 'Arc Court',
            level_required: 1,
            ingredients: [
                { itemId: 'wood_ash', quantity: 1 },
                { itemId: 'string_bow', quantity: 1 }
            ],
            result: {
                itemId: 'bow_short',
                quantity: 1,
                quality_range: [6, 10]
            },
            crafting_time_minutes: 90,
            tools_required: ['knife_carving', 'saw_hand'],
            success_rate_formula: 'base_65 + (level * 2) + dexterity_mod',
            critical_success_bonus: '+10% précision',
            fail_consequence: 'Arc asymétrique (précision -2)'
        },
        
        // ─── PALIER 2 : MENUISIER ───
        {
            id: 'bow_longbow',
            name: 'Arc Long',
            level_required: 2,
            ingredients: [
                { itemId: 'wood_yew', quantity: 1 },
                { itemId: 'string_bow_quality', quantity: 1 },
                { itemId: 'oil_wood', quantity: 1 }
            ],
            result: {
                itemId: 'bow_longbow',
                quantity: 1,
                quality_range: [8, 12]
            },
            crafting_time_minutes: 150,
            tools_required: ['knife_carving', 'saw_hand', 'vice'],
            success_rate_formula: 'base_60 + (level * 3) + dexterity_mod',
            critical_success_bonus: '+20 portée, +1d8 dégâts',
            fail_consequence: 'Arc tordu (portée réduite de 30%)'
        },
        {
            id: 'shield_reinforced',
            name: 'Bouclier Renforcé',
            level_required: 2,
            ingredients: [
                { itemId: 'wood_ironwood', quantity: 3 },
                { itemId: 'plate_iron', quantity: 2 },
                { itemId: 'handle_leather', quantity: 1 },
                { itemId: 'nails_iron', quantity: 10 }
            ],
            result: {
                itemId: 'shield_reinforced',
                quantity: 1,
                quality_range: [3, 5]
            },
            crafting_time_minutes: 120,
            tools_required: ['saw_hand', 'hammer_carpenter', 'anvil_small'],
            success_rate_formula: 'base_60 + (level * 3) + strength_mod',
            critical_success_bonus: '+2 AC, résistance aux coups critiques',
            fail_consequence: 'Bouclier lourd (malus -1 DEX)'
        },
        {
            id: 'staff_quarterstaff',
            name: 'Bâton de Combat',
            level_required: 2,
            ingredients: [
                { itemId: 'wood_oak', quantity: 1 },
                { itemId: 'oil_wood', quantity: 1 },
                { itemId: 'cap_metal', quantity: 2 }
            ],
            result: {
                itemId: 'staff_quarterstaff',
                quantity: 1,
                quality_range: [6, 10]
            },
            crafting_time_minutes: 90,
            tools_required: ['saw_hand', 'knife_carving', 'hammer_carpenter'],
            success_rate_formula: 'base_60 + (level * 3) + strength_mod',
            critical_success_bonus: '+1d8 dégâts, arme polyvalente',
            fail_consequence: 'Bâton déséquilibré (malus -1 attaque)'
        },
        {
            id: 'door_reinforced',
            name: 'Porte Renforcée',
            level_required: 2,
            ingredients: [
                { itemId: 'wood_oak', quantity: 8 },
                { itemId: 'plate_iron', quantity: 4 },
                { itemId: 'hinge_iron', quantity: 3 },
                { itemId: 'nails_iron', quantity: 30 }
            ],
            result: {
                itemId: 'door_reinforced',
                quantity: 1,
                quality_range: [50, 100]
            },
            crafting_time_minutes: 240,
            tools_required: ['saw_hand', 'hammer_carpenter', 'plane'],
            success_rate_formula: 'base_55 + (level * 3) + strength_mod',
            critical_success_bonus: '+10 AC pour la porte, +20 HP',
            fail_consequence: 'Porte mal ajustée (ne ferme pas hermétiquement)'
        },
        
        // ─── PALIER 3 : MAÎTRE ───
        {
            id: 'bow_composite',
            name: 'Arc Composite',
            level_required: 3,
            ingredients: [
                { itemId: 'wood_yew', quantity: 1 },
                { itemId: 'horn_ram', quantity: 2 },
                { itemId: 'sinew_beast', quantity: 3 },
                { itemId: 'glue_hide', quantity: 2 },
                { itemId: 'string_bow_masterwork', quantity: 1 }
            ],
            result: {
                itemId: 'bow_composite',
                quantity: 1,
                quality_range: [12, 18]
            },
            crafting_time_minutes: 300,
            tools_required: ['knife_carving', 'vice', 'heat_source'],
            success_rate_formula: 'base_50 + (level * 4) + (strength_mod + dexterity_mod)',
            critical_success_bonus: '+2d8 dégâts, +30 portée, +3 précision',
            fail_consequence: 'Arc déformé (perte totale des matériaux)'
        },
        {
            id: 'shield_tower',
            name: 'Bouclier Tour',
            level_required: 3,
            ingredients: [
                { itemId: 'wood_ironwood', quantity: 8 },
                { itemId: 'plate_steel', quantity: 4 },
                { itemId: 'handle_reinforced', quantity: 2 },
                { itemId: 'bolt_steel', quantity: 20 }
            ],
            result: {
                itemId: 'shield_tower',
                quantity: 1,
                quality_range: [5, 8]
            },
            crafting_time_minutes: 240,
            tools_required: ['saw_hand', 'hammer_carpenter', 'anvil_small', 'plane'],
            success_rate_formula: 'base_45 + (level * 4) + strength_mod',
            critical_success_bonus: '+3 AC, couverture totale',
            fail_consequence: 'Bouclier trop lourd (vitesse -10)'
        },
        {
            id: 'staff_battle',
            name: 'Bâton de Guerre',
            level_required: 3,
            ingredients: [
                { itemId: 'wood_ironwood', quantity: 1 },
                { itemId: 'metal_core', quantity: 1 },
                { itemId: 'grip_leather_quality', quantity: 1 },
                { itemId: 'cap_steel', quantity: 2 }
            ],
            result: {
                itemId: 'staff_battle',
                quantity: 1,
                quality_range: [10, 15]
            },
            crafting_time_minutes: 180,
            tools_required: ['saw_hand', 'knife_carving', 'hammer_carpenter'],
            success_rate_formula: 'base_50 + (level * 4) + strength_mod',
            critical_success_bonus: '+2d8 dégâts, peut briser les armes ennemies',
            fail_consequence: 'Bâton trop rigide (risque de casser au critique raté)'
        },
        {
            id: 'siege_equipment',
            name: 'Équipement de Siège',
            level_required: 3,
            ingredients: [
                { itemId: 'wood_oak', quantity: 30 },
                { itemId: 'rope_thick', quantity: 10 },
                { itemId: 'wheel_wooden', quantity: 4 },
                { itemId: 'bolt_iron', quantity: 50 }
            ],
            result: {
                itemId: 'catapult_light',
                quantity: 1,
                quality_range: [100, 200]
            },
            crafting_time_minutes: 480,
            tools_required: ['saw_hand', 'hammer_carpenter', 'plane', 'chisel'],
            success_rate_formula: 'base_40 + (level * 5) + strength_mod',
            critical_success_bonus: '+50% portée et dégâts',
            fail_consequence: 'Équipement instable (risque d\'explosion)'
        },
        {
            id: 'chest_reinforced',
            name: 'Coffre Renforcé',
            level_required: 3,
            ingredients: [
                { itemId: 'wood_ironwood', quantity: 10 },
                { itemId: 'plate_iron', quantity: 6 },
                { itemId: 'lock_quality', quantity: 1 },
                { itemId: 'hinge_steel', quantity: 3 }
            ],
            result: {
                itemId: 'chest_reinforced',
                quantity: 1,
                quality_range: [100, 150]
            },
            crafting_time_minutes: 180,
            tools_required: ['saw_hand', 'hammer_carpenter', 'plane', 'chisel'],
            success_rate_formula: 'base_45 + (level * 4) + strength_mod',
            critical_success_bonus: 'Piège intégré, +50 slots de stockage',
            fail_consequence: 'Coffre mal équilibré (risque d\'effondrement)'
        },
        
        // ─── PALIER 4 : GRAND MAÎTRE ───
        {
            id: 'bow_legendary',
            name: 'Arc Légendaire',
            level_required: 4,
            ingredients: [
                { itemId: 'wood_world_tree', quantity: 1 },
                { itemId: 'horn_unicorn', quantity: 2 },
                { itemId: 'sinew_dragon', quantity: 5 },
                { itemId: 'string_angel_hair', quantity: 1 },
                { itemId: 'essence_precision', quantity: 5 }
            ],
            result: {
                itemId: 'bow_legendary',
                quantity: 1,
                quality_range: [20, 30]
            },
            crafting_time_minutes: 480,
            tools_required: ['knife_carving', 'vice', 'heat_source', 'altar_crafting'],
            success_rate_formula: 'base_25 + (level * 6) + (strength_mod + dexterity_mod) * 2',
            critical_success_bonus: '+3d10 dégâts, portée illimitée, flèches qui ne manquent jamais',
            fail_consequence: 'Arc maudit (attaque le porteur)'
        },
        {
            id: 'staff_archdruid',
            name: 'Bâton d\'Archidruide',
            level_required: 4,
            ingredients: [
                { itemId: 'wood_ancient_oak', quantity: 1 },
                { itemId: 'essence_nature', quantity: 10 },
                { itemId: 'seed_world_tree', quantity: 1 },
                { itemId: 'crystal_emerald', quantity: 5 }
            ],
            result: {
                itemId: 'staff_archdruid',
                quantity: 1,
                quality_range: [18, 25]
            },
            crafting_time_minutes: 420,
            tools_required: ['knife_carving', 'altar_nature', 'grove_sacred'],
            success_rate_formula: 'base_30 + (level * 5) + strength_mod + wisdom_mod',
            critical_success_bonus: 'Bâton vivant (régénère 1 HP/heure, peut lancer sorts de druide niveau 9)',
            fail_consequence: 'Bâton corrompu (attire les aberrations végétales)'
        },
        {
            id: 'gate_fortress',
            name: 'Porte de Forteresse',
            level_required: 4,
            ingredients: [
                { itemId: 'wood_ironwood', quantity: 50 },
                { itemId: 'plate_adamantine', quantity: 20 },
                { itemId: 'hinge_mithril', quantity: 6 },
                { itemId: 'rune_protection', quantity: 10 },
                { itemId: 'essence_barrier', quantity: 8 }
            ],
            result: {
                itemId: 'gate_fortress',
                quantity: 1,
                quality_range: [500, 1000]
            },
            crafting_time_minutes: 480,
            tools_required: ['saw_hand', 'hammer_carpenter', 'plane', 'chisel', 'forge', 'altar_crafting'],
            success_rate_formula: 'base_20 + (level * 6) + (strength_mod * 3)',
            critical_success_bonus: 'Porte indestructible, barrière magique intégrée',
            fail_consequence: 'Porte défectueuse (s\'ouvre de manière aléatoire)'
        },
        {
            id: 'ship_component',
            name: 'Composant de Navire Légendaire',
            level_required: 4,
            ingredients: [
                { itemId: 'wood_ancient_oak', quantity: 100 },
                { itemId: 'wood_ironwood', quantity: 50 },
                { itemId: 'pitch_quality', quantity: 30 },
                { itemId: 'sail_enchanted', quantity: 5 },
                { itemId: 'essence_water', quantity: 20 }
            ],
            result: {
                itemId: 'ship_hull_legendary',
                quantity: 1,
                quality_range: [1000, 2000]
            },
            crafting_time_minutes: 480,
            tools_required: ['saw_hand', 'hammer_carpenter', 'plane', 'chisel', 'shipyard'],
            success_rate_formula: 'base_25 + (level * 6) + (strength_mod * 2)',
            critical_success_bonus: 'Navire insubmersible, vitesse 2x normale',
            fail_consequence: 'Coque fragile (risque de naufrage)'
        }
    ],
    
    specializations: [
        {
            id: 'master_bowyer',
            name: 'Maître Archer',
            description: 'Spécialiste de la fabrication d\'arcs et d\'arbalètes de précision.',
            unlock_level: 2,
            bonus_effects: [
                '+20% dégâts sur arcs créés',
                '+30 portée sur tous les arcs',
                '+3 précision',
                'Peut créer des arcs à pouvoir spécial (feu, glace, foudre)'
            ]
        },
        {
            id: 'master_carpenter',
            name: 'Charpentier',
            description: 'Expert en construction de structures, bâtiments et fortifications.',
            unlock_level: 2,
            bonus_effects: [
                '+30% durabilité des structures',
                'Peut construire 2x plus vite',
                'Les structures résistent aux catastrophes naturelles',
                'Réduit les coûts de matériaux de 25%'
            ]
        },
        {
            id: 'living_wood_shaper',
            name: 'Sculpteur de Bois Vivant',
            description: 'Façonne le bois sans le tuer, créant des objets qui continuent de croître.',
            unlock_level: 3,
            bonus_effects: [
                'Les objets se régénèrent (1 HP/jour)',
                'Peut créer des golems de bois',
                '+25% puissance sur objets vivants',
                'Les arbres façonnés deviennent des alliés permanents'
            ]
        },
        {
            id: 'legendary_shipwright',
            name: 'Constructeur Naval Légendaire',
            description: 'Maître absolu de la construction navale et des vaisseaux impossibles.',
            unlock_level: 4,
            bonus_effects: [
                '+50% vitesse des navires construits',
                'Les navires peuvent naviguer sur terre, mer et air',
                'Peut intégrer des canons magiques dans la structure',
                '10% chance de créer un navire VIVANT (conscience propre)'
            ]
        }
    ],
    
    synergies_with: ['blacksmithing', 'enchanting', 'herbalism'],
    
    faction_reputation: [
        {
            factionId: 'rangers_guild',
            bonus_per_rank: 40
        },
        {
            factionId: 'builders_guild',
            bonus_per_rank: 45
        },
        {
            factionId: 'druids_circle',
            bonus_per_rank: 35
        }
    ]
};
