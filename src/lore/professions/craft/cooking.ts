// ═══════════════════════════════════════════════════════════════════════
// 🍲 COOKING (CUISINE) - Créer des plats et breuvages qui fortifient
// ═══════════════════════════════════════════════════════════════════════

import { Profession } from '../index';

export const COOKING: Profession = {
    id: 'cooking',
    name: 'Cuisine',
    category: 'craft',
    description: 'Prépare des plats et breuvages qui fortifient le corps et l\'esprit des aventuriers.',
    lore_background: `Les Cuisiniers d'Aethelgard sont bien plus que de simples préparateurs de nourriture. 
    Ils maîtrisent l'art ancestral de combiner ingrédients ordinaires et extraordinaires pour créer des mets 
    aux propriétés remarquables. Les plus grands chefs peuvent concocter des festins qui confèrent force, 
    endurance et même résistance magique à ceux qui les consomment.`,
    
    primary_stat: 'wisdom',
    secondary_stat: 'intelligence',
    
    starting_tools: [
        { itemId: 'knife_cooking', quantity: 1 },
        { itemId: 'pot_iron', quantity: 1 },
        { itemId: 'spices_basic', quantity: 5 }
    ],
    
    ranks: [
        {
            level: 1,
            title: 'Apprenti Cuisinier',
            xp_required: 0,
            recipes_unlocked: ['bread_fresh', 'stew_basic', 'tea_herbal'],
            passive_bonuses: [
                '+5% efficacité des plats créés',
                'Peut identifier les ingrédients comestibles'
            ]
        },
        {
            level: 2,
            title: 'Cuisinier',
            xp_required: 1000,
            recipes_unlocked: ['stew_hearty', 'pie_meat', 'potion_stamina', 'bread_elven'],
            passive_bonuses: [
                '+10% efficacité des plats',
                '+30 minutes de durée des buffs alimentaires',
                'Peut purifier de la nourriture avariée'
            ]
        },
        {
            level: 3,
            title: 'Maître Cuisinier',
            xp_required: 5000,
            recipes_unlocked: ['feast_warrior', 'elixir_strength', 'cake_royal', 'soup_mana', 'roast_dragon'],
            passive_bonuses: [
                '+15% efficacité des plats',
                '+1 heure de durée des buffs',
                'Peut créer des variations de recettes',
                'Les plats restaurent 50% de points de vie supplémentaires'
            ],
            special_ability: 'Cuisine Inspirée : Une fois par jour, peut improviser un plat unique avec les ingrédients disponibles'
        },
        {
            level: 4,
            title: 'Grand Maître Cuisinier',
            xp_required: 15000,
            recipes_unlocked: ['feast_legendary', 'elixir_immortality', 'ambrosia_divine', 'banquet_heroes'],
            passive_bonuses: [
                '+25% efficacité des plats',
                '+2 heures de durée des buffs',
                'Les plats confèrent résistance aux poisons et maladies',
                'Restauration complète de points de vie et mana',
                '10% de chance de créer un plat de qualité LÉGENDAIRE'
            ],
            special_ability: 'Banquet du Conquérant : Peut préparer un festin qui affecte jusqu\'à 40 personnes simultanément'
        }
    ],
    
    recipes: [
        // ─── PALIER 1 : APPRENTI ───
        {
            id: 'bread_fresh',
            name: 'Pain Frais',
            level_required: 1,
            ingredients: [
                { itemId: 'flour', quantity: 3 },
                { itemId: 'water_clean', quantity: 1 },
                { itemId: 'yeast', quantity: 1 }
            ],
            result: {
                itemId: 'bread_fresh',
                quantity: 4,
                quality_range: [1, 3]
            },
            crafting_time_minutes: 45,
            tools_required: ['pot_iron', 'oven'],
            success_rate_formula: 'base_70 + (level * 2) + wisdom_mod',
            critical_success_bonus: '+2 pains supplémentaires',
            fail_consequence: 'Pain brûlé (immangeable)'
        },
        {
            id: 'stew_basic',
            name: 'Ragoût Basique',
            level_required: 1,
            ingredients: [
                { itemId: 'meat_raw', quantity: 2 },
                { itemId: 'vegetable_mixed', quantity: 3 },
                { itemId: 'water_clean', quantity: 2 }
            ],
            result: {
                itemId: 'stew_basic',
                quantity: 3,
                quality_range: [5, 15]
            },
            crafting_time_minutes: 30,
            tools_required: ['pot_iron', 'knife_cooking'],
            success_rate_formula: 'base_65 + (level * 2) + wisdom_mod',
            critical_success_bonus: '+5 HP regen pendant 1 heure',
            fail_consequence: 'Goût désagréable (effet réduit de 50%)'
        },
        {
            id: 'tea_herbal',
            name: 'Thé aux Herbes',
            level_required: 1,
            ingredients: [
                { itemId: 'herb_mixed', quantity: 2 },
                { itemId: 'water_clean', quantity: 1 }
            ],
            result: {
                itemId: 'tea_herbal',
                quantity: 2,
                quality_range: [10, 20]
            },
            crafting_time_minutes: 10,
            tools_required: ['pot_iron'],
            success_rate_formula: 'base_70 + (level * 2) + wisdom_mod',
            critical_success_bonus: '+10 mana regen pendant 30 minutes',
            fail_consequence: 'Thé amer (aucun effet)'
        },
        
        // ─── PALIER 2 : CUISINIER ───
        {
            id: 'stew_hearty',
            name: 'Ragoût Consistant',
            level_required: 2,
            ingredients: [
                { itemId: 'meat_quality', quantity: 3 },
                { itemId: 'potato', quantity: 4 },
                { itemId: 'spices_basic', quantity: 2 },
                { itemId: 'butter', quantity: 1 }
            ],
            result: {
                itemId: 'stew_hearty',
                quantity: 4,
                quality_range: [20, 40]
            },
            crafting_time_minutes: 60,
            tools_required: ['pot_iron', 'knife_cooking'],
            success_rate_formula: 'base_60 + (level * 3) + wisdom_mod',
            critical_success_bonus: '+2 STR pendant 2 heures',
            fail_consequence: 'Ragoût fade (bonus réduit de 50%)'
        },
        {
            id: 'pie_meat',
            name: 'Tourte à la Viande',
            level_required: 2,
            ingredients: [
                { itemId: 'meat_quality', quantity: 3 },
                { itemId: 'flour', quantity: 4 },
                { itemId: 'butter', quantity: 2 },
                { itemId: 'egg', quantity: 1 }
            ],
            result: {
                itemId: 'pie_meat',
                quantity: 2,
                quality_range: [30, 50]
            },
            crafting_time_minutes: 90,
            tools_required: ['oven', 'knife_cooking'],
            success_rate_formula: 'base_55 + (level * 3) + wisdom_mod',
            critical_success_bonus: '+50 HP max pendant 3 heures',
            fail_consequence: 'Pâte cramée (produit 1 seul)'
        },
        {
            id: 'potion_stamina',
            name: 'Élixir d\'Endurance',
            level_required: 2,
            ingredients: [
                { itemId: 'herb_energizing', quantity: 3 },
                { itemId: 'honey', quantity: 2 },
                { itemId: 'water_spring', quantity: 1 }
            ],
            result: {
                itemId: 'potion_stamina',
                quantity: 2,
                quality_range: [25, 45]
            },
            crafting_time_minutes: 45,
            tools_required: ['pot_iron', 'vial_glass'],
            success_rate_formula: 'base_60 + (level * 3) + intelligence_mod',
            critical_success_bonus: '+3 CON pendant 2 heures',
            fail_consequence: 'Élixir amer (durée réduite à 30 min)'
        },
        {
            id: 'bread_elven',
            name: 'Pain Elfique',
            level_required: 2,
            ingredients: [
                { itemId: 'flour_elven', quantity: 2 },
                { itemId: 'honey', quantity: 1 },
                { itemId: 'herb_moonleaf', quantity: 1 }
            ],
            result: {
                itemId: 'bread_elven',
                quantity: 3,
                quality_range: [40, 60]
            },
            crafting_time_minutes: 120,
            tools_required: ['oven', 'knife_cooking'],
            success_rate_formula: 'base_55 + (level * 3) + wisdom_mod',
            critical_success_bonus: '+1 DEX pendant 4 heures',
            fail_consequence: 'Pain ordinaire (perd propriétés elfiques)'
        },
        
        // ─── PALIER 3 : MAÎTRE ───
        {
            id: 'feast_warrior',
            name: 'Festin du Guerrier',
            level_required: 3,
            ingredients: [
                { itemId: 'meat_boar', quantity: 5 },
                { itemId: 'vegetable_roasted', quantity: 4 },
                { itemId: 'spices_exotic', quantity: 3 },
                { itemId: 'wine_red', quantity: 1 }
            ],
            result: {
                itemId: 'feast_warrior',
                quantity: 6,
                quality_range: [60, 80]
            },
            crafting_time_minutes: 150,
            tools_required: ['oven', 'knife_cooking', 'pot_iron'],
            success_rate_formula: 'base_50 + (level * 4) + wisdom_mod',
            critical_success_bonus: '+3 STR, +2 CON pendant 4 heures',
            fail_consequence: 'Viande trop cuite (bonus réduit de 30%)'
        },
        {
            id: 'elixir_strength',
            name: 'Élixir de Force',
            level_required: 3,
            ingredients: [
                { itemId: 'herb_ogre_root', quantity: 2 },
                { itemId: 'blood_troll', quantity: 1 },
                { itemId: 'honey_giant', quantity: 2 },
                { itemId: 'water_blessed', quantity: 1 }
            ],
            result: {
                itemId: 'elixir_strength',
                quantity: 2,
                quality_range: [70, 90]
            },
            crafting_time_minutes: 90,
            tools_required: ['pot_iron', 'vial_crystal'],
            success_rate_formula: 'base_45 + (level * 4) + intelligence_mod',
            critical_success_bonus: '+5 STR pendant 6 heures',
            fail_consequence: 'Élixir instable (effet aléatoire)'
        },
        {
            id: 'cake_royal',
            name: 'Gâteau Royal',
            level_required: 3,
            ingredients: [
                { itemId: 'flour_refined', quantity: 5 },
                { itemId: 'sugar', quantity: 4 },
                { itemId: 'cream_fresh', quantity: 3 },
                { itemId: 'fruit_exotic', quantity: 3 },
                { itemId: 'egg', quantity: 4 }
            ],
            result: {
                itemId: 'cake_royal',
                quantity: 8,
                quality_range: [80, 100]
            },
            crafting_time_minutes: 180,
            tools_required: ['oven', 'mixer', 'knife_cooking'],
            success_rate_formula: 'base_40 + (level * 4) + (wisdom_mod + intelligence_mod)',
            critical_success_bonus: '+2 CHA, +1 tous les autres stats pendant 6 heures',
            fail_consequence: 'Gâteau affaissé (apparence et goût médiocres)'
        },
        {
            id: 'soup_mana',
            name: 'Soupe de Mana',
            level_required: 3,
            ingredients: [
                { itemId: 'herb_mana_thistle', quantity: 4 },
                { itemId: 'mushroom_arcane', quantity: 3 },
                { itemId: 'water_spring', quantity: 2 },
                { itemId: 'crystal_dust', quantity: 1 }
            ],
            result: {
                itemId: 'soup_mana',
                quantity: 4,
                quality_range: [65, 85]
            },
            crafting_time_minutes: 120,
            tools_required: ['pot_iron', 'knife_cooking'],
            success_rate_formula: 'base_45 + (level * 4) + intelligence_mod',
            critical_success_bonus: 'Restaure 100% mana + +20% mana regen pendant 4 heures',
            fail_consequence: 'Soupe sans magie (simple soupe aux champignons)'
        },
        {
            id: 'roast_dragon',
            name: 'Rôti de Dragon',
            level_required: 3,
            ingredients: [
                { itemId: 'meat_dragon', quantity: 3 },
                { itemId: 'spices_fire', quantity: 4 },
                { itemId: 'vegetable_roasted', quantity: 5 },
                { itemId: 'oil_essence', quantity: 1 }
            ],
            result: {
                itemId: 'roast_dragon',
                quantity: 5,
                quality_range: [85, 100]
            },
            crafting_time_minutes: 240,
            tools_required: ['oven_master', 'knife_cooking'],
            success_rate_formula: 'base_35 + (level * 5) + wisdom_mod',
            critical_success_bonus: 'Résistance au feu +50% pendant 8 heures',
            fail_consequence: 'Viande trop épicée (2d6 dégâts de feu en mangeant)'
        },
        
        // ─── PALIER 4 : GRAND MAÎTRE ───
        {
            id: 'feast_legendary',
            name: 'Festin Légendaire',
            level_required: 4,
            ingredients: [
                { itemId: 'meat_phoenix', quantity: 2 },
                { itemId: 'vegetable_celestial', quantity: 5 },
                { itemId: 'spices_divine', quantity: 5 },
                { itemId: 'wine_ancient', quantity: 2 },
                { itemId: 'truffle_golden', quantity: 3 }
            ],
            result: {
                itemId: 'feast_legendary',
                quantity: 10,
                quality_range: [95, 100]
            },
            crafting_time_minutes: 480,
            tools_required: ['oven_master', 'knife_cooking', 'pot_iron', 'kitchen_legendary'],
            success_rate_formula: 'base_25 + (level * 6) + (wisdom_mod * 2) + (intelligence_mod * 2)',
            critical_success_bonus: '+4 à toutes les stats pendant 24 heures',
            fail_consequence: 'Ingrédients gaspillés (perte de 75% des matériaux)'
        },
        {
            id: 'elixir_immortality',
            name: 'Élixir d\'Immortalité',
            level_required: 4,
            ingredients: [
                { itemId: 'herb_lifeleaf', quantity: 10 },
                { itemId: 'blood_phoenix', quantity: 1 },
                { itemId: 'water_eternal', quantity: 1 },
                { itemId: 'essence_life', quantity: 5 }
            ],
            result: {
                itemId: 'elixir_immortality',
                quantity: 1,
                quality_range: [100, 100]
            },
            crafting_time_minutes: 360,
            tools_required: ['pot_iron', 'vial_crystal', 'altar_cooking'],
            success_rate_formula: 'base_20 + (level * 6) + intelligence_mod + wisdom_mod',
            critical_success_bonus: 'Immunité à la mort pendant 1 heure',
            fail_consequence: 'Poison mortel (CON save DC 20 ou mort instantanée)'
        },
        {
            id: 'ambrosia_divine',
            name: 'Ambroisie Divine',
            level_required: 4,
            ingredients: [
                { itemId: 'nectar_celestial', quantity: 5 },
                { itemId: 'fruit_eden', quantity: 3 },
                { itemId: 'honey_angel', quantity: 3 },
                { itemId: 'crystal_light', quantity: 2 }
            ],
            result: {
                itemId: 'ambrosia_divine',
                quantity: 3,
                quality_range: [98, 100]
            },
            crafting_time_minutes: 300,
            tools_required: ['vial_crystal', 'altar_cooking'],
            success_rate_formula: 'base_30 + (level * 5) + wisdom_mod + intelligence_mod',
            critical_success_bonus: 'Guérison complète + suppression de toutes malédictions',
            fail_consequence: 'Ambroisie corrompue (malédiction mineure)'
        },
        {
            id: 'banquet_heroes',
            name: 'Banquet des Héros',
            level_required: 4,
            ingredients: [
                { itemId: 'meat_legendary', quantity: 10 },
                { itemId: 'vegetable_celestial', quantity: 10 },
                { itemId: 'bread_elven', quantity: 8 },
                { itemId: 'wine_ancient', quantity: 5 },
                { itemId: 'spices_divine', quantity: 8 }
            ],
            result: {
                itemId: 'banquet_heroes',
                quantity: 40,
                quality_range: [90, 100]
            },
            crafting_time_minutes: 420,
            tools_required: ['oven_master', 'kitchen_legendary', 'knife_cooking', 'pot_iron'],
            success_rate_formula: 'base_25 + (level * 6) + (wisdom_mod * 3)',
            critical_success_bonus: 'Tous les convives gagnent un niveau temporaire pendant 12 heures',
            fail_consequence: 'Banquet raté (produit nourriture basique pour 20 personnes)'
        }
    ],
    
    specializations: [
        {
            id: 'war_chef',
            name: 'Chef de Guerre',
            description: 'Spécialiste des plats qui augmentent la force et l\'endurance au combat.',
            unlock_level: 2,
            bonus_effects: [
                '+20% efficacité des buffs de combat (STR, CON)',
                '+1 heure de durée des plats de combat',
                'Peut préparer des rations de combat qui ne se périment pas'
            ]
        },
        {
            id: 'royal_pastry_chef',
            name: 'Pâtissier Royal',
            description: 'Maître de la pâtisserie fine et des desserts enchantés.',
            unlock_level: 2,
            bonus_effects: [
                '+15% efficacité des desserts et pâtisseries',
                'Les gâteaux confèrent +2 CHA pendant leur durée',
                'Peut créer des sculptures en sucre animées'
            ]
        },
        {
            id: 'culinary_alchemist',
            name: 'Alchimiste Culinaire',
            description: 'Combine cuisine et alchimie pour créer des élixirs et potions comestibles.',
            unlock_level: 3,
            bonus_effects: [
                '+25% efficacité des élixirs culinaires',
                'Peut transformer des potions en plats et vice-versa',
                '+2 slots d\'effets sur les élixirs créés',
                'Les élixirs culinaires ont meilleur goût que les potions d\'alchimiste'
            ]
        },
        {
            id: 'divine_chef',
            name: 'Chef Divin',
            description: 'Cuisinier légendaire capable de créer des plats aux propriétés miraculeuses.',
            unlock_level: 4,
            bonus_effects: [
                '+30% chance de succès sur recettes légendaires',
                'Les festins peuvent affecter jusqu\'à 100 personnes',
                '15% chance qu\'un plat confère un effet UNIQUE permanent',
                'Peut bénir la nourriture pour la rendre sacrée'
            ]
        }
    ],
    
    synergies_with: ['alchemy', 'herbalism', 'hunting'],
    
    faction_reputation: [
        {
            factionId: 'royal_court',
            bonus_per_rank: 40
        },
        {
            factionId: 'adventurers_guild',
            bonus_per_rank: 30
        },
        {
            factionId: 'tavern_keepers',
            bonus_per_rank: 50
        }
    ]
};
