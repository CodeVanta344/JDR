// ============================================================
// TYPES CENTRALISÉS POUR SYSTÈME CRÉATION PERSONNAGE
// ============================================================

import type { Stats } from '../lore/schema';

// ===== CLÉS STATS =====
export type StatKey = keyof Stats;

export const STAT_LABELS: Record<StatKey, string> = {
  strength: 'Force',
  dexterity: 'Dextérité',
  constitution: 'Constitution',
  intelligence: 'Intelligence',
  wisdom: 'Sagesse',
  charisma: 'Charisme',
  perception: 'Perception',
  willpower: 'Volonté'
};

// ===== TRAITS MÉCANIQUES =====
export interface MechanicalTrait {
  name: string;
  desc: string;
  game_effect?: string; // Ex: "+2 Persuasion avec nobles"
  effect?: string;      // Alias for game_effect used in some data
}

// ===== SYSTÈME D'EFFETS UNIFIÉ =====
export interface EffectBundle {
  stats: Partial<Record<StatKey, number>>;              // Bonus stats
  stats_penalty?: Partial<Record<StatKey, number>>;    // Malus stats
  mechanical_traits: MechanicalTrait[];                 // Capacités spéciales
  reputation: ReputationEffect[];                       // Impacts factions
  items: ItemGrant[];                                   // Items de départ
  skills: SkillBonus[];                                 // Bonus compétences
  languages?: string[];                                 // Langues apprises
  gold?: number;                                        // Or de départ additionnel
  tags: string[];                                       // Tags narratifs
}

export interface ReputationEffect {
  factionId: string;
  delta: number;                  // -10 à +10
  reason: string;                 // Justification narrative
}

export interface ItemGrant {
  itemId: string;                 // ID dans items-catalog.ts
  quantity: number;
  reason: string;                 // "Héritage familial", "Butin premier combat"
}

export interface SkillBonus {
  skillId: string;
  bonus: number;                  // +1 à +3
  reason: string;
}

// ===== STAGES ET CATÉGORIES LIFEPATH =====
export type LifeStage = 'birth' | 'childhood' | 'adolescence' | 'youngAdult';

export type LifeCategory =
  // Birth
  | 'location' | 'status' | 'omen'
  // Childhood
  | 'family' | 'education' | 'trauma'
  // Adolescence
  | 'training' | 'exploit' | 'encounter'
  // Young Adult
  | 'profession' | 'motivation' | 'connection';

// ===== OPTIONS LIFEPATH =====
export interface LifeChoice {
  id: string;
  stage: LifeStage;
  category: LifeCategory;
  label: string;                                        // Titre court
  desc: string;                                         // Description 2-3 phrases
  detailed_lore: {
    backstory: string;                                  // Contexte historique 1-2 paragraphes
    defining_moment: string;                            // Scène marquante
    worldview_shaped: string;                           // Impact psychologique
  };
  effects: EffectBundle;
  social_impacts: {
    npc_reactions: Record<string, string>;              // Ex: { "guards": "Méfiance", "nobles": "Respect" }
    first_impression: string;                           // Phrase type PNJ
    long_term_perception?: string;                      // Perception durable (lint fix)
  };
  tags: string[];                                       // ["urban", "noble", "traumatic", "military"]
  subCategory?: string;                                 // Grouping (e.g., "Cités", "Élite")
  incompatible_with?: string[];                         // IDs options incompatibles
}

// ===== SÉLECTION LIFEPATH COMPLÈTE (SIMPLIFIÉ - 1 choix par phase) =====
export interface LifepathSelection {
  birth?: LifeChoice;      // Un seul choix pour la phase Naissance
  childhood?: LifeChoice;  // Un seul choix pour la phase Enfance
  adolescence?: LifeChoice;// Un seul choix pour la phase Adolescence
  youngAdult?: LifeChoice; // Un seul choix pour la phase Jeune Adulte
}

// ===== EFFETS CUMULÉS FINAUX =====
export interface AccumulatedEffects {
  final_stats: Record<StatKey, number>;
  all_traits: MechanicalTrait[];
  reputation_map: Map<string, number>;
  items: ItemGrant[];
  skills: SkillBonus[];
  languages: string[];
  narrative_summary: string;
  tags: string[];

  // Choix principaux pour affichage UI
  origin?: LifeChoice;      // Birth Location
  childhood?: LifeChoice;   // Childhood Trauma/Event
  adolescence?: LifeChoice; // Adolescence Training
  adult?: LifeChoice;       // Young Adult Profession
}

// ===== HÉROS LÉGENDAIRES =====
export interface LegendaryHero {
  name: string;
  era: string;                    // "Âge des Héros", "Guerre des Ombres"
  deed: string;                   // Exploit principal
  quote: string;                  // Citation célèbre
  artifact_left?: string;         // Artefact légendaire
}

// ===== SPÉCIALISATIONS =====
export interface SpecializationExpanded {
  id: string;
  name: string;
  class_id?: string;              // Classe parente
  desc: string;
  detailed_philosophy?: string;
  mechanics_explained?: {
    core_mechanic: string;
    signature_abilities: string[];
    playstyle_example: string;
  };
  synergies?: {
    with_classes: string[];
    with_items: string[];
  };
  progression_path?: Record<string, string>; // { "level_10": "...", "level_20": "..." }
  starting_equipment_bonus?: string[];
  tags?: string[];
}

// ===== CLASSES ENRICHIES =====
export interface ClassExpanded {
  id: string;
  name: string;
  short_desc: string;
  detailed_lore: {
    history_aethelgard: string;                         // 3-4 paragraphes
    legendary_heroes: LegendaryHero[];                  // 2-3 héros
    societal_role: string;                              // Perception PNJ
    guilds_orders: string[];                            // Factions associées
    endgame_path: string;                               // Capacités niv 30+
  };
  base_stats: Partial<Record<StatKey, number>>;
  specializations: SpecializationExpanded[];
  starting_equipment: string[];
  tags: string[];
}

// ===== RÈGLES VALIDATION =====
export interface CompatibilityRule {
  id: string;
  trigger: {
    tags_required: string[];      // Doit avoir TOUS ces tags
    choices_ids?: string[];       // OU un de ces choix
  };
  conflicts_with: {
    tags: string[];
    choices_ids?: string[];
  };
  severity: 'info' | 'warning';   // JAMAIS 'block' (Plan 3)
  message: string;
  narrative_suggestions: string[];  // Justifications possibles
}

export interface CompatibilityWarning {
  severity: 'info' | 'warning';
  message: string;
  suggestions: string[];
}

// ===== GLOSSAIRE =====
export interface GlossaryEntry {
  key: string;
  title: string;
  short: string;
  full: string;
  examples: string[];
  related_terms: string[];
}

// ===== GUIDES PÉDAGOGIQUES =====
export interface Guide {
  id: string;
  title: string;
  icon: string;
  sections: GuideSection[];
}

export interface GuideSection {
  heading: string;
  content: string;
  tips?: string[];
}

// ===== COMPÉTENCES/SORTS =====
export interface AbilityExpanded {
  id: string;
  name: string;
  type: 'skill' | 'spell' | 'passive';
  base_desc: string;
  flavor_lore?: string;
  usage_examples?: string[];
  synergies?: string[];
  upgrade_path?: string;
  tags?: string[];
}

// ===== ÉQUIPEMENTS =====
export interface EquipmentExpanded {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'consumable';
  category: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  base_stats?: Record<string, any>;
  lore_origin?: string;
  crafters?: {
    original: string;
    current?: string;
  };
  regional_variants?: string[];
  special_abilities?: string[];
  acquisition_quests?: string[];
  tags?: string[];
}

export interface ArmorSet {
  id: string;
  name: string;
  pieces: SetPiece[];
  set_bonuses: SetBonus[];
  lore_origin?: string;
  crafting_requirements?: string;
  acquisition?: string;
  tags?: string[];
}

export interface SetPiece {
  slot: 'head' | 'chest' | 'hands' | 'legs' | 'feet';
  name: string;
  stats: Record<string, number>;
}

export interface SetBonus {
  pieces: number; // Nombre de pièces requises
  effect: string;
}
