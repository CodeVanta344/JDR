// ============================================================
// FORGE (BLACKSMITHING) - Craft d'Armes et Armures
// ============================================================

import type { Profession } from '../index';

export const BLACKSMITHING: Profession = {
  id: 'blacksmithing',
  name: 'Forge',
  category: 'craft',
  description: 'L\'art ancestral de dompter le feu et le métal pour créer armes, armures et outils.',
  lore_background: `Les Maîtres-Forgerons d'Aethelgard sont vénérés comme des artistes autant que des artisans. La Guilde des Marteaux de Bastion-de-Fer détient les secrets des alliages nordiques, capables de trancher la glace comme du beurre. Certains murmurent que les plus grands forgerons peuvent infuser leurs créations avec leur propre essence vitale, donnant naissance à des armes semi-conscientes.`,
  
  primary_stat: 'strength',
  secondary_stat: 'intelligence',
  
  starting_tools: [
    { itemId: 'blacksmith_hammer', quantity: 1 },
    { itemId: 'tongs', quantity: 1 },
    { itemId: 'anvil_portable', quantity: 1 },
    { itemId: 'whetstone', quantity: 1 }
  ],
  
  ranks: [
    {
      level: 1,
      title: 'Apprenti Forgeron',
      xp_required: 0,
      recipes_unlocked: ['iron_dagger', 'iron_shortsword', 'leather_cap'],
      passive_bonuses: ['Réparation armes/armures endommagées (50% durabilité max)']
    },
    {
      level: 5,
      title: 'Forgeron Compagnon',
      xp_required: 500,
      recipes_unlocked: ['steel_longsword', 'chainmail_shirt', 'iron_shield'],
      passive_bonuses: ['Réparation (75% durabilité max)', '+5% qualité items craftés']
    },
    {
      level: 10,
      title: 'Maître-Forgeron',
      xp_required: 2000,
      recipes_unlocked: ['mithril_blade', 'plate_armor', 'tower_shield'],
      passive_bonuses: ['Réparation (100% durabilité)', '+10% qualité', 'Chance critique craft (5%)'],
      special_ability: 'Signature du Forgeron : Graver votre marque sur une arme (bonus +1 dégâts permanents)'
    },
    {
      level: 15,
      title: 'Forgeron Légendaire',
      xp_required: 5000,
      recipes_unlocked: ['adamantine_greatsword', 'dragonscale_armor', 'legendary_weapon_reforge'],
      passive_bonuses: ['Réparation instantanée', '+20% qualité', '10% critique', 'Armes créées peuvent recevoir enchantements'],
      special_ability: 'Forger l\'Impossible : Une fois par arc narratif, créer un objet légendaire unique avec propriétés magiques'
    }
  ],
  
  recipes: [
    // Niveau 1
    {
      id: 'iron_dagger',
      name: 'Dague en Fer',
      level_required: 1,
      ingredients: [
        { itemId: 'iron_ingot', quantity: 2 },
        { itemId: 'leather_strip', quantity: 1 }
      ],
      result: {
        itemId: 'dagger',
        quantity: 1,
        quality_range: [40, 70]
      },
      crafting_time_minutes: 15,
      tools_required: ['forge', 'anvil', 'hammer'],
      success_rate_formula: '60 + (level * 3) + str_mod',
      critical_success_bonus: 'Qualité Supérieure (+10 dégâts)',
      fail_consequence: 'Perte de 50% des matériaux'
    },
    {
      id: 'iron_shortsword',
      name: 'Épée Courte en Fer',
      level_required: 1,
      ingredients: [
        { itemId: 'iron_ingot', quantity: 3 },
        { itemId: 'wood_plank', quantity: 1 },
        { itemId: 'leather_strip', quantity: 2 }
      ],
      result: {
        itemId: 'shortsword',
        quantity: 1,
        quality_range: [45, 75]
      },
      crafting_time_minutes: 30,
      tools_required: ['forge', 'anvil', 'hammer'],
      success_rate_formula: '55 + (level * 3) + str_mod',
      critical_success_bonus: 'Lame Équilibrée (+1 précision)',
      fail_consequence: 'Lame fêlée (arme inutilisable)'
    },
    
    // Niveau 5
    {
      id: 'steel_longsword',
      name: 'Épée Longue en Acier',
      level_required: 5,
      ingredients: [
        { itemId: 'steel_ingot', quantity: 4 },
        { itemId: 'hardwood_plank', quantity: 1 },
        { itemId: 'leather_fine', quantity: 2 },
        { itemId: 'silver_wire', quantity: 1 }
      ],
      result: {
        itemId: 'longsword',
        quantity: 1,
        quality_range: [60, 90]
      },
      crafting_time_minutes: 60,
      tools_required: ['master_forge', 'anvil', 'hammer'],
      success_rate_formula: '50 + (level * 2) + str_mod + int_mod',
      critical_success_bonus: 'Lame Aiguisée (Critique sur 19-20)',
      fail_consequence: 'Trempe ratée (arme fragile, -50% durabilité)'
    },
    {
      id: 'chainmail_shirt',
      name: 'Cotte de Mailles',
      level_required: 5,
      ingredients: [
        { itemId: 'steel_ring', quantity: 200 },
        { itemId: 'leather_backing', quantity: 3 }
      ],
      result: {
        itemId: 'chainmail',
        quantity: 1,
        quality_range: [55, 85]
      },
      crafting_time_minutes: 180,
      tools_required: ['anvil', 'pliers', 'hammer'],
      success_rate_formula: '60 + (level * 2) + dex_mod',
      critical_success_bonus: 'Mailles Renforcées (+2 CA)',
      fail_consequence: 'Anneaux défectueux (zones faibles, -1 CA)'
    },
    
    // Niveau 10
    {
      id: 'mithril_blade',
      name: 'Lame de Mithril',
      level_required: 10,
      ingredients: [
        { itemId: 'mithril_ingot', quantity: 5 },
        { itemId: 'ancient_wood', quantity: 1 },
        { itemId: 'moonstone_shard', quantity: 2 },
        { itemId: 'enchanted_oil', quantity: 1 }
      ],
      result: {
        itemId: 'mithril_sword',
        quantity: 1,
        quality_range: [75, 100]
      },
      crafting_time_minutes: 240,
      tools_required: ['legendary_forge', 'master_anvil', 'runic_hammer'],
      success_rate_formula: '40 + (level * 2) + str_mod + int_mod',
      critical_success_bonus: 'Éclat Lunaire (Lumière argentée, +2d6 vs morts-vivants)',
      fail_consequence: 'Mithril corrompu (arme maudite, -1 tous jets)'
    },
    {
      id: 'plate_armor',
      name: 'Armure de Plates Complète',
      level_required: 10,
      ingredients: [
        { itemId: 'steel_plate', quantity: 12 },
        { itemId: 'leather_padding', quantity: 8 },
        { itemId: 'steel_rivet', quantity: 100 },
        { itemId: 'oil_rust_protection', quantity: 2 }
      ],
      result: {
        itemId: 'full_plate',
        quantity: 1,
        quality_range: [70, 95]
      },
      crafting_time_minutes: 480,
      tools_required: ['master_forge', 'anvil', 'hammer', 'armorers_toolkit'],
      success_rate_formula: '35 + (level * 2) + str_mod + con_mod',
      critical_success_bonus: 'Harnois Parfait (+3 CA, pas de pénalité discrétion)',
      fail_consequence: 'Articulations rigides (-5 vitesse, désavantage Acrobatie)'
    },
    
    // Niveau 15 - Légendaire
    {
      id: 'adamantine_greatsword',
      name: 'Espadon d\'Adamantine',
      level_required: 15,
      ingredients: [
        { itemId: 'adamantine_ingot', quantity: 8 },
        { itemId: 'dragon_scale', quantity: 3 },
        { itemId: 'elemental_core_fire', quantity: 1 },
        { itemId: 'ancient_rune_stone', quantity: 2 },
        { itemId: 'phoenix_feather', quantity: 1 }
      ],
      result: {
        itemId: 'adamantine_greatsword',
        quantity: 1,
        quality_range: [90, 100]
      },
      crafting_time_minutes: 1440, // 24 heures
      tools_required: ['divine_forge', 'titans_anvil', 'hammer_of_legends'],
      success_rate_formula: '25 + (level * 1.5) + str_mod + int_mod + wis_mod',
      critical_success_bonus: 'Lame Éternelle : Indestructible, +3d6 dégâts, bonus élémentaire au choix',
      fail_consequence: 'Explosion élémentaire (3d10 dégâts feu rayon 6m, matériaux perdus)'
    }
  ],
  
  specializations: [
    {
      id: 'weaponsmith',
      name: 'Maître d\'Armes',
      description: 'Spécialisé dans la forge d\'armes. +15% dégâts armes craftées, débloque recettes armes exotiques.',
      unlock_level: 8,
      bonus_effects: [
        '+15% dégâts base armes forgées',
        'Recettes exclusives : Katana, Khopesh, Lance de Joute',
        'Affûtage Expert : +2 critique sur armes forgées',
        'Réparation armes en combat (action bonus)'
      ]
    },
    {
      id: 'armorsmith',
      name: 'Maître Armurier',
      description: 'Spécialisé dans les armures. +2 CA sur armures craftées, réduit pénalités poids/discrétion.',
      unlock_level: 8,
      bonus_effects: [
        '+2 CA sur toutes armures forgées',
        'Réduction 50% pénalité discrétion armures lourdes',
        'Recettes exclusives : Armure Elfique, Harnois Draconique',
        'Renforcement : Une fois/jour, +5 CA temporaire 1 heure'
      ]
    },
    {
      id: 'runesmith',
      name: 'Forgeron Runique',
      description: 'Infuse armes/armures avec runes anciennes. Débloque enchantements de forge permanents.',
      unlock_level: 12,
      bonus_effects: [
        'Graver 3 runes au choix sur équipement forgé',
        'Runes disponibles : Feu (+1d6 feu), Glace (+1d6 froid), Foudre (+1d6 électricité)',
        'Protection Runique (+2 jets sauv contre magie)',
        'Une fois/arc : Créer objet avec propriété magique majeure'
      ]
    }
  ],
  
  synergies_with: ['mining', 'enchanting', 'jewelcrafting'],
  
  faction_reputation: [
    { factionId: 'guilde_forgerons', bonus_per_rank: 10 },
    { factionId: 'clans_nordiques', bonus_per_rank: 5 },
    { factionId: 'armee_royale', bonus_per_rank: 3 }
  ]
};
