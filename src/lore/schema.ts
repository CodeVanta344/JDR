/**
 * AETHELGARD LORE SCHEMA - Types et Interfaces Centralisés
 * Définit les structures de données communes pour tout le système de lore
 */

// ============================================================================
// BASE ENTITY TYPES
// ============================================================================

export type RegionId = 'val-dore' | 'cote-orages' | 'monts-coeur-fer' | 'sylve-emeraude' | 'terres-brulees' | 'neutre';
export type EraId = 'eveil' | 'ashka' | 'cendres' | 'reconstruction';
export type FactionId = string; // Ex: 'guilde-arcanes', 'cercle-cendres', 'aube-argent'
export type BiomeId = 'foret' | 'montagne' | 'plaine' | 'marais' | 'desert' | 'toundra' | 'ruines' | 'abysse' | 'ocean';
export type DangerLevel = 'safe' | 'low' | 'moderate' | 'high' | 'deadly' | 'legendary';

/**
 * Base commune pour toutes les entités du lore
 */
export interface EntityBase {
  id: string; // Format: 'category:subcategory:name' ex: 'npc:val-dore:miriel'
  name: string;
  regionId?: RegionId;
  tags: string[]; // Tags normalisés pour recherche IA
  summary: string; // Description courte (1-2 phrases)
  description: string; // Description complète
  hooks?: string[]; // Accroches narratives pour le MJ
  sources?: string[]; // Références lore (époque, événements liés)
}

// ============================================================================
// REPUTATION & FACTION SYSTEM
// ============================================================================

export interface ReputationDelta {
  factionId: FactionId;
  delta: number; // -100 to +100
  reason: string;
}

export interface FactionRank {
  id: string;
  name: string;
  threshold: number; // Score de réputation requis
  perks: string[];
  unlocks?: string[]; // IDs de quêtes/items/zones débloqués
}

export interface Faction extends EntityBase {
  type: 'guild' | 'cult' | 'political' | 'criminal' | 'religious' | 'merchant';
  alignment: 'good' | 'neutral' | 'evil';
  headquarters?: string; // Location ID
  leader?: string; // NPC ID
  rivals?: FactionId[];
  allies?: FactionId[];
  ranks: FactionRank[];
  joinRequirements?: {
    level?: number;
    reputation?: Record<FactionId, number>;
    quest?: string;
    skill?: SkillCheck;
  };
}

// ============================================================================
// SKILL & CHECK SYSTEM
// ============================================================================

export type SkillType =
  // Combat
  | 'melee' | 'ranged' | 'magic' | 'defense'
  // Social
  | 'persuasion' | 'intimidation' | 'deception' | 'insight'
  // Exploration
  | 'investigation' | 'perception' | 'survival' | 'stealth'
  // Crafting
  | 'smithing' | 'alchemy' | 'enchanting' | 'cooking'
  // Gathering
  | 'mining' | 'herbalism' | 'fishing' | 'hunting'
  // Knowledge
  | 'arcana' | 'history' | 'religion' | 'nature';

export interface SkillCheck {
  skill: SkillType;
  dc: number; // Difficulty Class (seuil de réussite)
  successText?: string;
  failureText?: string;
  criticalSuccessText?: string;
  criticalFailureText?: string;
}

export interface SkillTree {
  skillId: string;
  name: string;
  description: string;
  maxLevel: number;
  prerequisites?: {
    skills?: Record<string, number>; // skillId -> level requis
    attributes?: Partial<Stats>;
  };
  bonusPerLevel: {
    attribute?: keyof Stats;
    value?: number;
    special?: string; // Description du bonus spécial
  };
}

// ============================================================================
// STATS & ATTRIBUTES
// ============================================================================

export interface Stats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  perception: number;
  willpower: number;
}

export interface CombatStats {
  hp: number;
  ac: number; // Armor Class
  atk: number; // Bonus d'attaque
  dmg: string; // Dégâts (format dice: "2d6+3")
  cr?: number; // Challenge Rating
}

// ============================================================================
// LOOT & ECONOMY
// ============================================================================

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary' | 'artifact';
export type ItemCategory =
  | 'weapon' | 'armor' | 'shield' | 'accessory' | 'consumable'
  | 'material' | 'ingredient' | 'tool' | 'key-item' | 'quest-item';

export interface LootEntry {
  itemId: string;
  quantity: { min: number; max: number };
  chance: number; // 0-1 (probabilité)
  condition?: string; // Condition spéciale (ex: "if boss killed solo")
}

export interface LootTable {
  id: string;
  name: string;
  entries: LootEntry[];
  gold?: { min: number; max: number };
}

export interface PriceModifier {
  region: RegionId;
  category: ItemCategory;
  multiplier: number; // 0.5 = -50%, 2.0 = +100%
  reason: string;
  startDate?: string; // ISO date
  endDate?: string;
}

export interface TradeRoute {
  id: string;
  from: string; // Location ID
  to: string; // Location ID
  goods: ItemCategory[];
  profitMargin: number; // 0-1 (% de profit)
  danger: DangerLevel;
  travelTime: number; // En heures
  requirements?: {
    factionReputation?: Record<FactionId, number>;
    level?: number;
    escortQuest?: string;
  };
}

// ============================================================================
// CRAFTING & PROFESSIONS
// ============================================================================

export type ProfessionType =
  // Artisanat
  | 'smithing' | 'alchemy' | 'enchanting' | 'cooking'
  | 'tailoring' | 'leatherworking' | 'jewelcrafting' | 'inscription'
  // Récolte
  | 'mining' | 'herbalism' | 'fishing' | 'hunting' | 'skinning' | 'logging';

export interface Recipe {
  id: string;
  name: string;
  profession: ProfessionType;
  level: number; // Niveau de métier requis
  station?: string; // "forge", "alchemy-table", etc.
  ingredients: Array<{
    itemId: string;
    quantity: number;
  }>;
  result: {
    itemId: string;
    quantity: number;
  };
  craftTime?: number; // En secondes
  experienceGained: number;
  discoveryMethod?: 'trainer' | 'quest' | 'drop' | 'vendor' | 'world';
}

export interface Profession {
  type: ProfessionType;
  level: number;
  experience: number;
  knownRecipes: string[]; // Recipe IDs
  specialization?: string;
}

export interface Resource {
  id: string;
  name: string;
  category: ItemCategory;
  rarity: ItemRarity;
  gatheredBy: ProfessionType;
  biomes: BiomeId[];
  season?: 'spring' | 'summer' | 'autumn' | 'winter' | 'all';
  toolRequired?: string; // "pickaxe", "fishing-rod", etc.
  skillLevel: number;
  yield: { min: number; max: number };
  respawnTime?: number; // En minutes
}

// ============================================================================
// WORLD FLAGS & STATE
// ============================================================================

export interface WorldFlag {
  id: string;
  name: string;
  description: string;
  active: boolean;
  triggeredBy?: string; // Quest ID ou Event ID
  effects: {
    priceModifiers?: PriceModifier[];
    encounterChanges?: string[]; // Encounter IDs modifiés
    questUnlocks?: string[];
    locationChanges?: Record<string, Partial<Location>>;
  };
}

// ============================================================================
// QUEST SYSTEM
// ============================================================================

export type QuestType =
  | 'main' // Quête principale
  | 'side' // Quête secondaire
  | 'faction' // Quête de faction
  | 'legendary' // Quête légendaire (artefact)
  | 'daily' // Quête journalière
  | 'event'; // Quête d'événement

export type QuestStatus = 'available' | 'active' | 'completed' | 'failed' | 'hidden';

export interface QuestObjective {
  id: string;
  description: string;
  type: 'kill' | 'collect' | 'talk' | 'explore' | 'craft' | 'escort' | 'custom';
  target?: string; // Creature ID, Item ID, NPC ID, Location ID
  quantity?: number;
  completed: boolean;
  optional?: boolean;
}

export interface QuestReward {
  experience?: number;
  gold?: number;
  items?: Array<{ itemId: string; quantity: number }>;
  reputation?: ReputationDelta[];
  skillPoints?: number;
  unlocks?: {
    quests?: string[];
    locations?: string[];
    recipes?: string[];
    abilities?: string[];
  };
}

export interface Quest extends EntityBase {
  type: QuestType;
  level: number; // Niveau recommandé
  giver?: string; // NPC ID
  location?: string; // Location ID
  prerequisites?: {
    level?: number;
    quests?: string[]; // Quêtes requises
    reputation?: Record<FactionId, number>;
    skills?: Record<SkillType, number>;
  };
  objectives: QuestObjective[];
  rewards: QuestReward;
  timeLimit?: number; // En heures (pour quêtes limitées)
  branches?: {
    condition: string; // Description de la condition
    nextQuest: string; // Quest ID
  }[];
  consequences?: string[]; // Impacts sur le monde
}

// ============================================================================
// LOCATION SYSTEM
// ============================================================================

export type LocationType =
  | 'city' | 'town' | 'village' | 'hamlet'
  | 'dungeon' | 'ruins' | 'cave' | 'tower'
  | 'tavern' | 'shop' | 'temple' | 'guild-hall'
  | 'landmark' | 'camp' | 'fortress';

export interface Location extends EntityBase {
  type: LocationType;
  parentLocation?: string; // Location ID (pour districts, étages de donjon)
  biome?: BiomeId;
  dangerLevel: DangerLevel;
  services?: {
    inn?: boolean;
    shop?: boolean;
    trainer?: boolean;
    bank?: boolean;
    crafting?: ProfessionType[];
  };
  npcs?: string[]; // NPC IDs présents
  quests?: string[]; // Quest IDs disponibles
  resources?: string[]; // Resource IDs récoltables
  secrets?: {
    description: string;
    discoveryMethod: SkillCheck | string;
    reward?: string;
  }[];
  accessibility?: {
    level?: number;
    reputation?: Record<FactionId, number>;
    quest?: string;
    key?: string; // Item ID requis
  };
}

// ============================================================================
// CREATURE & BESTIARY
// ============================================================================

export type CreatureType =
  | 'beast' | 'humanoid' | 'undead' | 'elemental' | 'dragon'
  | 'aberration' | 'construct' | 'celestial' | 'fiend' | 'fey';

export type CreatureSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan';

export interface CreatureBehavior {
  aggression: 'passive' | 'defensive' | 'aggressive' | 'territorial';
  intelligence: 'mindless' | 'animal' | 'low' | 'average' | 'high' | 'genius';
  tactics?: string; // Description de la stratégie de combat
  special?: string[]; // Comportements spéciaux
}

export interface Creature extends EntityBase {
  type: CreatureType;
  size: CreatureSize;
  stats: Stats;
  combat: CombatStats;
  behavior: CreatureBehavior;
  habitat: BiomeId[];
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  variants?: string[]; // IDs de variantes
  lootTable: string; // Loot Table ID
  harvestable?: Array<{
    itemId: string;
    profession: ProfessionType;
    skillLevel: number;
    quantity: { min: number; max: number };
  }>;
  weaknesses?: string[]; // Types de dégâts
  resistances?: string[];
  immunities?: string[];
  abilities?: string[]; // Capacités spéciales
}

// ============================================================================
// NPC SYSTEM
// ============================================================================

export type NPCRole =
  | 'merchant' | 'innkeeper' | 'blacksmith' | 'alchemist' | 'trainer'
  | 'quest-giver' | 'guard' | 'noble' | 'commoner' | 'companion'
  | 'antagonist' | 'neutral' | 'faction-leader';

export interface NPCRelationship {
  npcId: string;
  type: 'friend' | 'enemy' | 'rival' | 'lover' | 'family' | 'mentor' | 'student';
  affinity: number; // -100 to 100
  history?: string;
}

export interface NPCSchedule {
  [hour: number]: {
    locationId: string;
    activity: string;
    availability: boolean;
  };
}

export interface NPCDialogue {
  condition?: string; // Condition pour afficher (ex: "reputation:aube-argent>50")
  text: string;
  responses?: Array<{
    text: string;
    action?: 'quest' | 'trade' | 'train' | 'recruit' | 'info';
    requirement?: SkillCheck | string;
  }>;
}

export interface NPC extends EntityBase {
  role: NPCRole;
  race?: string;
  class?: string;
  level?: number;
  faction?: FactionId;
  factionRank?: string;
  location: string; // Location ID
  profession?: {
    type: ProfessionType;
    level: number;
    canTrain: boolean;
  };
  relationships?: NPCRelationship[];
  schedule?: NPCSchedule;
  dialogue?: NPCDialogue[];
  inventory?: string[]; // Item IDs (pour marchands)
  services?: {
    trades?: boolean;
    trains?: ProfessionType[];
    repairs?: boolean;
    quests?: string[]; // Quest IDs
  };
  voiceLines?: {
    greeting: string[];
    farewell: string[];
    trade: string[];
    questOffer: string[];
    questComplete: string[];
    ambient: string[];
  };
}

// ============================================================================
// ITEM SYSTEM
// ============================================================================

export interface ItemStats {
  atk?: number;
  ac?: number;
  str?: number;
  dex?: number;
  con?: number;
  int?: number;
  wis?: number;
  cha?: number;
  hp?: number;
  mana?: number;
  bonus?: string; // Bonus spécial (texte libre)
}

export interface Item extends EntityBase {
  category: ItemCategory;
  rarity: ItemRarity;
  value: number; // Prix de base en gold
  weight?: number; // En kg
  stats?: ItemStats;
  requirements?: {
    level?: number;
    class?: string[];
    strength?: number;
    faction?: FactionId;
  };
  lore?: string; // Histoire de l'item
  questItem?: boolean;
  stackable?: boolean;
  maxStack?: number;
  consumable?: boolean;
  effect?: string; // Effet à l'utilisation
  cursed?: boolean;
  awakening?: {
    stage: number;
    maxStages: number;
    condition: string;
    bonusPerStage: ItemStats;
  };
}

// ============================================================================
// EVENT SYSTEM
// ============================================================================

export type EventType = 'world' | 'seasonal' | 'invasion' | 'catastrophe' | 'festival';

export interface EventPhase {
  name: string;
  duration: number; // En heures
  description: string;
  effects: {
    worldFlags?: string[]; // World Flag IDs activés
    encounterModifiers?: string[];
    questsAvailable?: string[];
  };
}

export interface WorldEvent extends EntityBase {
  type: EventType;
  phases: EventPhase[];
  currentPhase: number;
  startDate?: string; // ISO date
  endDate?: string;
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  triggers?: {
    quests?: string[];
    worldFlags?: string[];
    date?: string;
  };
  rewards?: QuestReward;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type EntityType =
  | 'faction' | 'quest' | 'location' | 'creature' | 'npc'
  | 'item' | 'event' | 'recipe' | 'resource' | 'loot-table';

export type AnyEntity =
  | Faction | Quest | Location | Creature | NPC
  | Item | WorldEvent | Recipe | Resource | LootTable;
