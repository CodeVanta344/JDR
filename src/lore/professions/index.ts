// ============================================================
// SYSTÈME DE MÉTIERS - Craft & Récolte
// Progression avec niveaux, recettes déblocables, spécialisations
// ============================================================

export interface ProfessionRecipe {
  id: string;
  name: string;
  level_required: number;
  ingredients: Array<{
    itemId: string;
    quantity: number;
  }>;
  result: {
    itemId: string;
    quantity: number;
    quality_range: [number, number]; // Min/max qualité selon compétence
  };
  crafting_time_minutes: number;
  tools_required: string[];
  success_rate_formula: string; // Ex: "base_50 + (level * 2) + intelligence_modifier"
  critical_success_bonus?: string;
  fail_consequence?: string;
}

export interface ProfessionRank {
  level: number;
  title: string;
  xp_required: number;
  recipes_unlocked: string[];
  passive_bonuses: string[];
  special_ability?: string;
}

export interface Profession {
  id: string;
  name: string;
  category: 'craft' | 'gather';
  description: string;
  lore_background: string;
  primary_stat: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';
  secondary_stat: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';
  
  starting_tools: Array<{
    itemId: string;
    quantity: number;
  }>;
  
  ranks: ProfessionRank[];
  recipes: ProfessionRecipe[];
  
  specializations?: Array<{
    id: string;
    name: string;
    description: string;
    unlock_level: number;
    bonus_effects: string[];
  }>;
  
  synergies_with: string[]; // Autres professions complémentaires
  faction_reputation?: Array<{
    factionId: string;
    bonus_per_rank: number;
  }>;
}

export * from './craft/blacksmithing';
export * from './craft/alchemy';
export * from './craft/enchanting';
export * from './craft/cooking';
export * from './craft/leatherworking';
export * from './craft/tailoring';
export * from './craft/carpentry';
export * from './craft/jewelcrafting';

export * from './gather/mining';
export * from './gather/herbalism';
export * from './gather/fishing';
export * from './gather/hunting';
export * from './gather/woodcutting';
export * from './gather/skinning';
