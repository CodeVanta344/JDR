/**
 * types.js — Shared JSDoc typedefs for the Aethelgard game.
 *
 * Import this file for IntelliSense in any JS/JSX module:
 *   /** @typedef {import('./types').Player} Player * /
 *
 * These are documentation-only; they produce no runtime code.
 */

// ─── Profile (Supabase auth + profile table) ────────────────────────────────

/**
 * @typedef {object} Profile
 * @property {string}  id        — Supabase auth user ID
 * @property {string}  name      — display name
 * @property {string}  [email]
 * @property {string}  [avatar_url]
 */

// ─── Session ────────────────────────────────────────────────────────────────

/**
 * @typedef {object} Session
 * @property {string}  id               — UUID
 * @property {string}  host_id          — Profile.id of the host
 * @property {boolean} is_started       — has the adventure been launched
 * @property {boolean} active           — is the session joinable / visible
 * @property {string}  current_location — display name of current area
 * @property {string}  [created_at]
 */

// ─── Player (character in a session) ────────────────────────────────────────

/**
 * @typedef {object} PlayerStats
 * @property {number} [strength]
 * @property {number} [dexterity]
 * @property {number} [constitution]
 * @property {number} [intelligence]
 * @property {number} [wisdom]
 * @property {number} [charisma]
 * @property {number} [perception]
 */

/**
 * @typedef {object} InventoryItem
 * @property {string}  name
 * @property {string}  [description]
 * @property {string}  [type]       — weapon | armor | consumable | misc
 * @property {object}  [stats]      — { heal?: number, resource?: number, damage?: string }
 * @property {number}  [value]      — gold value
 * @property {string}  [rarity]     — common | uncommon | rare | epic | legendary
 */

/**
 * @typedef {object} Player
 * @property {string}      id
 * @property {string}      session_id
 * @property {string}      user_id           — Profile.id
 * @property {string}      name
 * @property {string}      [class]           — Guerrier | Mage | Voleur | …
 * @property {number}      [level]
 * @property {number}      [xp]
 * @property {number}      [hp]
 * @property {number}      [max_hp]
 * @property {number}      [resource]        — mana / stamina / focus
 * @property {number}      [max_resource]
 * @property {PlayerStats} [stats]
 * @property {InventoryItem[]} [inventory]
 * @property {boolean}     is_host
 * @property {boolean}     is_ready
 * @property {string}      [backstory_gm_context]
 * @property {string}      [current_location]
 * @property {string[]}    [visited_npcs]
 * @property {string[]}    [discovered_locations]
 * @property {object[]}    [active_quests]
 * @property {string[]}    [discovered_secrets]
 * @property {object[]}    [important_events]
 * @property {object[]}    [discovered_visuals]
 * @property {string[]}    [abilities]
 */

// ─── Message ────────────────────────────────────────────────────────────────

/**
 * @typedef {object} Message
 * @property {string}  id
 * @property {string}  session_id
 * @property {'user'|'assistant'|'system'|'npc'} role
 * @property {string}  content
 * @property {string}  [player_id]
 * @property {string}  [created_at]
 */

// ─── Challenge (dice roll prompt from AI) ───────────────────────────────────

/**
 * @typedef {object} Challenge
 * @property {string}  label     — description shown to the player
 * @property {string}  stat      — which stat to roll against (e.g. "perception")
 * @property {number}  dc        — difficulty class / target number
 * @property {string}  [context] — extra narrative context
 */

/**
 * @typedef {object} ChallengeResult
 * @property {number}  natural           — raw die value
 * @property {number}  naturalConverted  — converted value
 * @property {number}  modifier          — stat-based modifier
 * @property {number}  total             — natural + modifier
 * @property {'SUCCESS'|'FAILURE'|'CRITICAL_SUCCESS'|'CRITICAL_FAILURE'} outcome
 * @property {string}  dice              — dice type, e.g. "d100"
 * @property {number}  dc
 * @property {string}  stat
 */

// ─── AI Response (from game-master edge function) ───────────────────────────

/**
 * @typedef {object} AIResponse
 * @property {string}   [narrative]      — main story text
 * @property {object}   [worldUpdate]    — { weather?: object }
 * @property {object}   [world_event]    — { description: string, … }
 * @property {{ xp: number, reason?: string }} [reward]
 * @property {{ trigger: boolean, enemies?: object[] }} [combat]
 * @property {object}   [merchant]       — merchant inventory data
 * @property {InventoryItem|InventoryItem[]} [loot]
 * @property {object}   [transaction]    — pending buy/sell
 * @property {object}   [unlock]         — ability unlock
 * @property {Partial<PlayerStats>} [stats] — stat changes
 * @property {InventoryItem|InventoryItem[]} [item] — items to add
 * @property {object}   [codex_update]   — codex entries to update
 * @property {Challenge} [challenge]     — dice challenge for the player
 * @property {{ name: string }} [npc]    — NPC conversation trigger
 */

// ─── Lore Modules (world-building data passed to the AI) ────────────────────

/**
 * @typedef {object} LoreModules
 * @property {string}  WORLD_CONTEXT
 * @property {string}  ENVIRONMENTAL_RULES
 * @property {object}  BESTIARY
 * @property {object}  BESTIARY_EXTENDED
 * @property {object}  CLASSES
 * @property {object}  NPC_TEMPLATES
 * @property {object}  QUEST_HOOKS
 * @property {object}  TAVERNS_AND_LOCATIONS
 * @property {object}  RUMORS_AND_GOSSIP
 * @property {object}  RANDOM_ENCOUNTERS
 * @property {object}  WORLD_MYTHS_EXTENDED
 * @property {object}  LEGENDARY_ITEMS
 * @property {object}  FACTION_LORE
 */

// ─── Game Phase ─────────────────────────────────────────────────────────────

/**
 * @typedef {'INTRO'|'EXPLORATION'|'DRAMA'} GamePhase
 */

export {};
