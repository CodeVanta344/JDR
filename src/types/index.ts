import { z } from 'zod';

// === CORE GAME TYPES ===

export const StatsSchema = z.object({
  str: z.number().min(1).max(30),
  dex: z.number().min(1).max(30),
  con: z.number().min(1).max(30),
  int: z.number().min(1).max(30),
  wis: z.number().min(1).max(30),
  cha: z.number().min(1).max(30),
});
export type Stats = z.infer<typeof StatsSchema>;

export const ItemSchema = z.object({
  name: z.string(),
  type: z.enum(['weapon', 'armor', 'shield', 'offhand', 'accessory', 'consumable', 'tool', 'ammo']),
  category: z.string().optional(),
  slot: z.string().optional(),
  stats: z.record(z.number()).optional(),
  rarity: z.enum(['common', 'uncommon', 'rare', 'epic', 'legendary', 'artifact']).optional(),
  desc: z.string().optional(),
  equipped: z.boolean().optional(),
  img: z.string().optional(),
  price: z.number().optional(),
});
export type Item = z.infer<typeof ItemSchema>;

export const AbilitySchema = z.object({
  name: z.string(),
  cost: z.number(),
  cooldown: z.number(),
  level: z.number(),
  dice: z.string().optional(),
  scaling: z.string().optional(),
  range: z.number().optional(),
  type: z.string().optional(),
  actionType: z.string().optional(),
  flavor: z.string().optional(),
  desc: z.string(),
  vfx: z.string().optional(),
  heal: z.string().optional(),
  resource: z.number().optional(),
});
export type Ability = z.infer<typeof AbilitySchema>;

export const CharacterSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  session_id: z.string(),
  name: z.string(),
  class: z.string().optional(),
  hp: z.number(),
  max_hp: z.number(),
  resource: z.number().optional(),
  max_resource: z.number().optional(),
  level: z.number().default(1),
  xp: z.number().default(0),
  gold: z.number().default(100),
  stats: StatsSchema.optional(),
  inventory: z.array(ItemSchema).optional(),
  abilities: z.array(AbilitySchema).optional(),
  spells: z.array(z.string()).optional(),
  backstory: z.string().optional(),
  portrait_url: z.string().optional(),
  is_ready: z.boolean().default(false),
  is_host: z.boolean().default(false),
  status: z.string().optional(),
  attribute_points: z.number().default(0),
  mechanical_traits: z.array(z.any()).optional(),
  skill_bonuses: z.array(z.string()).optional(),
});
export type Character = z.infer<typeof CharacterSchema>;

export const SessionSchema = z.object({
  id: z.string(),
  host_id: z.string(),
  gm_id: z.string().optional(),
  is_started: z.boolean().default(false),
  active: z.boolean().default(true),
  created_at: z.string().optional(),
});
export type Session = z.infer<typeof SessionSchema>;

export const MessageSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  role: z.enum(['user', 'assistant', 'system', 'image', 'narrage', 'npc']),
  content: z.string(),
  player_id: z.string().optional(),
  created_at: z.string().optional(),
});
export type Message = z.infer<typeof MessageSchema>;

export const GameTimeSchema = z.object({
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
  day: z.number().min(1),
});
export type GameTime = z.infer<typeof GameTimeSchema>;

export const WeatherType = z.enum(['clear', 'cloudy', 'rain', 'storm', 'snow', 'fog']);
export type Weather = z.infer<typeof WeatherType>;

// === COMBAT TYPES ===

export const CombatantSchema = z.object({
  id: z.string(),
  user_id: z.string().optional(),
  name: z.string(),
  class: z.string().optional(),
  hp: z.number(),
  maxHp: z.number(),
  resource: z.number().optional(),
  maxResource: z.number().optional(),
  initiative: z.number(),
  isEnemy: z.boolean(),
  portrait_url: z.string().optional(),
  posX: z.number(),
  posY: z.number(),
  maxPM: z.number().default(5),
  currentPM: z.number().default(5),
  hasActed: z.boolean().default(false),
  facing: z.enum(['NORTH', 'SOUTH', 'EAST', 'WEST']).default('EAST'),
  behavior_type: z.string().optional(),
  actions: z.array(z.object({
    name: z.string(),
    desc: z.string().optional(),
    range: z.number(),
  })).optional(),
  atk: z.number().optional(),
  ac: z.number().optional(),
  spells: z.array(z.any()).optional(),
});
export type Combatant = z.infer<typeof CombatantSchema>;

export const ArenaConfigSchema = z.object({
  blocksX: z.number().default(10),
  blocksY: z.number().default(10),
  shapeType: z.enum(['STANDARD', 'HALL', 'CORRIDOR', 'BRIDGE', 'BRIDGE_H', 'CIRCULAR']).default('STANDARD'),
});
export type ArenaConfig = z.infer<typeof ArenaConfigSchema>;

export const CombatStateSchema = z.object({
  active: z.boolean(),
  round: z.number(),
  turnIndex: z.number(),
  combatants: z.array(CombatantSchema),
  arenaConfig: ArenaConfigSchema,
  logs: z.array(z.any()),
  updatedAt: z.number(),
});
export type CombatState = z.infer<typeof CombatStateSchema>;

// === NPC TYPES ===

export const NPCSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  region: z.string().optional(),
  personality: z.string().optional(),
  appearance: z.string().optional(),
  greeting: z.string().optional(),
  portrait_url: z.string().optional(),
});
export type NPC = z.infer<typeof NPCSchema>;

export const MerchantSchema = NPCSchema.extend({
  inventory: z.array(ItemSchema).optional(),
  npcName: z.string().optional(),
});
export type Merchant = z.infer<typeof MerchantSchema>;

export const LootSchema = z.object({
  gold: z.number(),
  items: z.array(ItemSchema),
});
export type Loot = z.infer<typeof LootSchema>;

// === QUEST TYPES ===

export const QuestStatusEnum = z.enum(['available', 'active', 'completed', 'failed']);
export type QuestStatus = z.infer<typeof QuestStatusEnum>;

export const QuestObjectiveSchema = z.object({
  id: z.string(),
  description: z.string(),
  completed: z.boolean().default(false),
  current: z.number().optional(),
  target: z.number().optional(),
});
export type QuestObjective = z.infer<typeof QuestObjectiveSchema>;

export const QuestSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  giver: z.string().optional(),
  region: z.string().optional(),
  level: z.string().optional(),
  type: z.string().optional(),
  status: QuestStatusEnum.default('available'),
  objectives: z.array(QuestObjectiveSchema).optional(),
  rewards: z.object({
    gold: z.number().optional(),
    xp: z.number().optional(),
    items: z.array(ItemSchema).optional(),
  }).optional(),
  notes: z.string().optional(),
});
export type Quest = z.infer<typeof QuestSchema>;

// === CHRONICLE / WORLD EVENT ===

export const WorldEventSchema = z.object({
  id: z.string(),
  description: z.string(),
  date: GameTimeSchema.optional(),
  type: z.string().optional(),
});
export type WorldEvent = z.infer<typeof WorldEventSchema>;

// === TRANSACTION ===

export const TransactionSchema = z.object({
  amount: z.number(),
  type: z.enum(['gain', 'loss']),
  reason: z.string().optional(),
  context: z.string().optional(),
  npcName: z.string().optional(),
});
export type Transaction = z.infer<typeof TransactionSchema>;

// === CHALLENGE ===

export const ChallengeSchema = z.object({
  stat: z.string(),
  dc: z.number(),
  label: z.string(),
  description: z.string().optional(),
});
export type Challenge = z.infer<typeof ChallengeSchema>;

// === NOTES SYSTEM ===

export const NoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  category: z.enum(['general', 'quest', 'npc', 'location', 'item', 'lore']).default('general'),
  pinned: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Note = z.infer<typeof NoteSchema>;

// === PROFILE ===

export const ProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type Profile = z.infer<typeof ProfileSchema>;
