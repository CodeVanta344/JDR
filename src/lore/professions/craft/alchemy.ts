// ============================================================
// ALCHIMIE - Création de Potions, Poisons et Élixirs
// ============================================================

import type { Profession } from '../index';

export const ALCHEMY: Profession = {
  id: 'alchemy',
  name: 'Alchimie',
  category: 'craft',
  description: 'La science mystique de transmuter les plantes, minéraux et essences en potions aux effets miraculeux.',
  lore_background: `Les Alchimistes d'Aethelgard marchent sur la frontière entre science et magie. L'Académie Émeraude de la capitale enseigne les méthodes rigoureuses, tandis que les Sorcières des Marais pratiquent un art plus instinctif et dangereux. Certaines potions légendaires peuvent ressusciter les morts, d'autres peuvent détruire des royaumes entiers. Le Grand Incendie de Port-Azure, il y a 200 ans, serait dû à une expérience alchimique ratée...`,
  
  primary_stat: 'intelligence',
  secondary_stat: 'wisdom',
  
  starting_tools: [
    { itemId: 'alchemy_kit', quantity: 1 },
    { itemId: 'mortar_pestle', quantity: 1 },
    { itemId: 'glass_vials', quantity: 20 },
    { itemId: 'distillation_flask', quantity: 3 }
  ],
  
  ranks: [
    {
      level: 1,
      title: 'Apprenti Alchimiste',
      xp_required: 0,
      recipes_unlocked: ['healing_potion_minor', 'antidote_common', 'oil_blade'],
      passive_bonuses: ['Identifier plantes communes', 'Résistance +2 vs poison']
    },
    {
      level: 5,
      title: 'Alchimiste Confirmé',
      xp_required: 500,
      recipes_unlocked: ['healing_potion_moderate', 'potion_invisibility', 'acid_flask'],
      passive_bonuses: ['Identifier ingrédients rares', 'Résistance +4 vs poison', 'Durée potions +25%']
    },
    {
      level: 10,
      title: 'Maître Alchimiste',
      xp_required: 2000,
      recipes_unlocked: ['healing_potion_greater', 'elixir_giant_strength', 'smoke_bomb_hallucinogenic'],
      passive_bonuses: ['Immunité poison naturel', 'Durée potions +50%', 'Potions critiques (10% double effet)'],
      special_ability: 'Transmutation Mineure : Convertir 1 ingrédient commun en rare (1/jour)'
    },
    {
      level: 15,
      title: 'Grand Alchimiste',
      xp_required: 5000,
      recipes_unlocked: ['panacea_universal', 'potion_dragon_breath', 'philosophers_stone_fragment'],
      passive_bonuses: ['Immunité poison/maladie', 'Durée potions +100%', '20% critique', 'Brasser 2 potions simultanément'],
      special_ability: 'Pierre Philosophale : Une fois/arc, transmuter plomb en or ou créer élixir d\'immortalité (24h)'
    }
  ],
  
  recipes: [
    // Niveau 1
    {
      id: 'healing_potion_minor',
      name: 'Potion de Soins Mineure',
      level_required: 1,
      ingredients: [
        { itemId: 'bloodleaf', quantity: 2 },
        { itemId: 'honey', quantity: 1 },
        { itemId: 'spring_water', quantity: 1 }
      ],
      result: {
        itemId: 'potion_healing_minor',
        quantity: 1,
        quality_range: [2, 8] // 2d4 PV restaurés
      },
      crafting_time_minutes: 10,
      tools_required: ['alchemy_kit', 'heat_source'],
      success_rate_formula: '70 + (level * 3) + int_mod',
      critical_success_bonus: 'Double quantité (2 potions)',
      fail_consequence: 'Potion instable (50% soins, 50% nausée 1 tour)'
    },
    {
      id: 'antidote_common',
      name: 'Antidote aux Poisons Communs',
      level_required: 1,
      ingredients: [
        { itemId: 'charcoal_activated', quantity: 1 },
        { itemId: 'ginger_root', quantity: 2 },
        { itemId: 'milk_goat', quantity: 1 }
      ],
      result: {
        itemId: 'antidote',
        quantity: 1,
        quality_range: [50, 90] // % efficacité
      },
      crafting_time_minutes: 15,
      tools_required: ['mortar_pestle'],
      success_rate_formula: '65 + (level * 3) + wis_mod',
      critical_success_bonus: 'Antidote Universel (+20% efficacité)',
      fail_consequence: 'Antidote inefficace (aucun effet)'
    },
    
    // Niveau 5
    {
      id: 'potion_invisibility',
      name: 'Potion d\'Invisibilité',
      level_required: 5,
      ingredients: [
        { itemId: 'shadowcap_mushroom', quantity: 3 },
        { itemId: 'ghost_essence', quantity: 1 },
        { itemId: 'moonwater', quantity: 2 },
        { itemId: 'silver_dust', quantity: 1 }
      ],
      result: {
        itemId: 'potion_invisibility',
        quantity: 1,
        quality_range: [30, 120] // Secondes d'invisibilité
      },
      crafting_time_minutes: 45,
      tools_required: ['alchemy_kit', 'distillation_flask'],
      success_rate_formula: '50 + (level * 2) + int_mod',
      critical_success_bonus: 'Invisibilité Supérieure (2 minutes + ne se rompt pas si attaque)',
      fail_consequence: 'Potion ratée : Rend translucide (désavantage discrétion)'
    },
    {
      id: 'acid_flask',
      name: 'Fiole d\'Acide',
      level_required: 5,
      ingredients: [
        { itemId: 'bile_basilisk', quantity: 2 },
        { itemId: 'vitriol_crystals', quantity: 3 },
        { itemId: 'reinforced_glass_vial', quantity: 1 }
      ],
      result: {
        itemId: 'acid_vial',
        quantity: 1,
        quality_range: [2, 12] // 2d6 dégâts acide
      },
      crafting_time_minutes: 30,
      tools_required: ['alchemy_kit', 'protective_gloves'],
      success_rate_formula: '55 + (level * 2) + int_mod',
      critical_success_bonus: 'Acide Corrosif (ignore résistance acide)',
      fail_consequence: 'Explosion (1d6 acide à l\'alchimiste, 50% matériaux perdus)'
    },
    
    // Niveau 10
    {
      id: 'elixir_giant_strength',
      name: 'Élixir de Force de Géant',
      level_required: 10,
      ingredients: [
        { itemId: 'giant_blood', quantity: 1 },
        { itemId: 'dragon_root', quantity: 2 },
        { itemId: 'essence_earth_elemental', quantity: 1 },
        { itemId: 'aged_spirits', quantity: 3 }
      ],
      result: {
        itemId: 'elixir_giant_strength',
        quantity: 1,
        quality_range: [21, 27] // Force devient 21-27 pendant 1h
      },
      crafting_time_minutes: 120,
      tools_required: ['master_alchemy_kit', 'alembic', 'enchanted_cauldron'],
      success_rate_formula: '40 + (level * 2) + int_mod + wis_mod',
      critical_success_bonus: 'Force Titanesque (Force 29, durée 2h)',
      fail_consequence: 'Élixir instable : Force +4 mais Constitution -2 (1h)'
    },
    {
      id: 'smoke_bomb_hallucinogenic',
      name: 'Bombe Fumigène Hallucinogène',
      level_required: 10,
      ingredients: [
        { itemId: 'dreamshade_spores', quantity: 5 },
        { itemId: 'sulfur_powder', quantity: 3 },
        { itemId: 'voidmist_extract', quantity: 2 },
        { itemId: 'clay_sphere', quantity: 1 }
      ],
      result: {
        itemId: 'smoke_bomb_hallucino',
        quantity: 1,
        quality_range: [1, 6] // Rounds de confusion
      },
      crafting_time_minutes: 60,
      tools_required: ['alchemy_kit', 'gas_mask'],
      success_rate_formula: '45 + (level * 2) + int_mod',
      critical_success_bonus: 'Cauchemar Éveillé (Confusion + Peur, JdS désavantage)',
      fail_consequence: 'Fumée inoffensive (juste obscurcissement)'
    },
    
    // Niveau 15 - Légendaire
    {
      id: 'panacea_universal',
      name: 'Panacée Universelle',
      level_required: 15,
      ingredients: [
        { itemId: 'phoenix_tears', quantity: 1 },
        { itemId: 'unicorn_horn_powder', quantity: 2 },
        { itemId: 'ambrosia_nectar', quantity: 1 },
        { itemId: 'dragon_heartblood', quantity: 1 },
        { itemId: 'essence_life_itself', quantity: 1 }
      ],
      result: {
        itemId: 'panacea',
        quantity: 1,
        quality_range: [100, 100] // Toujours parfaite
      },
      crafting_time_minutes: 480,
      tools_required: ['legendary_alchemy_lab', 'divine_cauldron', 'philosophers_stone_fragment'],
      success_rate_formula: '20 + (level * 1.5) + int_mod + wis_mod',
      critical_success_bonus: 'Panacée Éternelle : Guérit TOUT (mort-vivance, malédictions, vieillesse) + régénération 5PV/round 1h',
      fail_consequence: 'Poison Mortel : 10d10 dégâts nécrotiques, JdS Con DD 20 ou mort'
    },
    {
      id: 'potion_dragon_breath',
      name: 'Potion de Souffle Draconique',
      level_required: 15,
      ingredients: [
        { itemId: 'dragon_lung_tissue', quantity: 1 },
        { itemId: 'elemental_essence', quantity: 3 },
        { itemId: 'dragonfire_whiskey', quantity: 2 },
        { itemId: 'obsidian_dust', quantity: 5 }
      ],
      result: {
        itemId: 'potion_dragon_breath',
        quantity: 1,
        quality_range: [8, 48] // 8d6 dégâts souffle
      },
      crafting_time_minutes: 360,
      tools_required: ['dragon_scale_cauldron', 'fireproof_tools'],
      success_rate_formula: '25 + (level * 1.5) + int_mod',
      critical_success_bonus: 'Souffle Ancien : Choix type dégâts (feu/froid/foudre/acide/poison), 3 charges au lieu d\'1',
      fail_consequence: 'Embrasement spontané : 6d6 feu à l\'alchimiste, labo détruit'
    }
  ],
  
  specializations: [
    {
      id: 'potioneer',
      name: 'Maître des Potions',
      description: 'Spécialisé en potions de soin et buffs. +50% efficacité potions, durées doublées.',
      unlock_level: 8,
      bonus_effects: [
        '+50% PV restaurés par potions de soin',
        'Durée buffs/élixirs doublée',
        'Brasser potions en 50% temps normal',
        'Une fois/jour : Boire 2 potions en 1 action'
      ]
    },
    {
      id: 'poisoner',
      name: 'Empoisonneur',
      description: 'Expert en poisons et acides. Poisons ignorent résistances, dégâts acides doublés.',
      unlock_level: 8,
      bonus_effects: [
        'Poisons ignorent immunités (cibles ont désavantage JdS)',
        'Dégâts acides +100%',
        'Enduire arme de poison (action bonus, dure 1 heure)',
        'Recettes exclusives : Poison de Wyverne, Sérum de Vérité'
      ]
    },
    {
      id: 'transmuter',
      name: 'Transmuteur',
      description: 'Maître de la transmutation. Peut altérer matière et créer or/gemmes alchimiques.',
      unlock_level: 12,
      bonus_effects: [
        'Transmuter métaux communs en argent (ratio 10:1)',
        'Créer gemmes synthétiques (valeur 50% gemme réelle)',
        'Polymorphie Alchimique : Boire potion pour changer forme (1h, 1/jour)',
        'Philosopher\'s Stone : Fragment permanent (+25% or transmutation)'
      ]
    }
  ],
  
  synergies_with: ['herbalism', 'enchanting', 'hunting'],
  
  faction_reputation: [
    { factionId: 'academie_emeraude', bonus_per_rank: 10 },
    { factionId: 'guilde_apothicaires', bonus_per_rank: 8 },
    { factionId: 'sorcieres_marais', bonus_per_rank: 5 }
  ]
};
