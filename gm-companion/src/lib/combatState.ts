/**
 * COMBAT STATE — Shared state for launching combats from encounter sections
 * Uses localStorage to pass combat data between pages (NarrativeGuide → CombatTracker)
 */

export interface CombatCreature {
  /** Unique instance ID (for duplicates) */
  instanceId: string;
  /** Display name */
  name: string;
  /** Current HP */
  hp: number;
  /** Max HP */
  maxHp: number;
  /** Armor Class */
  ac: number;
  /** Initiative roll (0 = not rolled yet) */
  initiative: number;
  /** ID in the bestiary, if matched */
  creatureId?: string;
  /** Challenge Rating */
  cr?: number;
  /** Is this a player character? */
  isPC?: boolean;
  /** Is dead? */
  isDead?: boolean;
  /** Active conditions */
  conditions?: string[];
  /** Attacks summary for quick reference */
  attacks?: { name: string; toHit: number; damage: string; damageType: string }[];
  /** Abilities summary */
  abilities?: { name: string; description: string }[];
  /** Speed */
  speed?: number;
  /** Experience points */
  xp?: number;
}

export interface CombatState {
  enemies: CombatCreature[];
  /** Where the combat was launched from */
  source?: string;
  /** Scene/chapter context label */
  contextLabel?: string;
}

const STORAGE_KEY = 'aethelgard_combat_state';

/**
 * Save combat state and return true. The caller should then navigate to /combat.
 */
export function startCombat(state: CombatState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Read the combat state from storage.
 */
export function getCombatState(): CombatState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CombatState;
  } catch {
    return null;
  }
}

/**
 * Clear combat state.
 */
export function clearCombatState(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Generate a unique instance ID.
 */
let _counter = 0;
export function makeInstanceId(): string {
  return `c_${Date.now()}_${++_counter}`;
}

/**
 * Parse an encounter string like "Nécromancien Voss (CR 4)" into { name, cr }.
 */
export function parseEncounterString(s: string): { name: string; cr: number | null; count: number } {
  // Handle "6x Squelette (CR 1/4)" or "Nécromancien Voss (CR 4)"
  const countMatch = s.match(/^(\d+)\s*x\s*/i);
  const count = countMatch ? parseInt(countMatch[1]) : 1;
  const withoutCount = countMatch ? s.slice(countMatch[0].length) : s;

  const crMatch = withoutCount.match(/\(CR\s+([\d/]+)\)/i);
  let cr: number | null = null;
  if (crMatch) {
    const crStr = crMatch[1];
    if (crStr.includes('/')) {
      const [num, den] = crStr.split('/');
      cr = parseInt(num) / parseInt(den);
    } else {
      cr = parseInt(crStr);
    }
  }

  const name = withoutCount.replace(/\s*\(CR\s+[\d/]+\)\s*/i, '').trim();

  return { name, cr, count };
}

/**
 * Default stats by CR (D&D 5e Monster Statistics by CR table).
 * Used when a creature isn't in the bestiary.
 */
const CR_DEFAULTS: Record<number, { ac: number; hp: number; toHit: number; damage: string; xp: number; speed: number }> = {
  0:    { ac: 10, hp: 4,   toHit: 2, damage: '1d4',     xp: 10,    speed: 30 },
  0.125:{ ac: 11, hp: 7,   toHit: 3, damage: '1d6',     xp: 25,    speed: 30 },
  0.25: { ac: 11, hp: 13,  toHit: 3, damage: '1d6+1',   xp: 50,    speed: 30 },
  0.5:  { ac: 12, hp: 22,  toHit: 3, damage: '1d8+1',   xp: 100,   speed: 30 },
  1:    { ac: 13, hp: 33,  toHit: 3, damage: '1d10+2',  xp: 200,   speed: 30 },
  2:    { ac: 13, hp: 45,  toHit: 4, damage: '2d6+2',   xp: 450,   speed: 30 },
  3:    { ac: 13, hp: 60,  toHit: 4, damage: '2d8+2',   xp: 700,   speed: 30 },
  4:    { ac: 14, hp: 78,  toHit: 5, damage: '2d8+3',   xp: 1100,  speed: 30 },
  5:    { ac: 15, hp: 95,  toHit: 6, damage: '2d10+3',  xp: 1800,  speed: 30 },
  6:    { ac: 15, hp: 112, toHit: 6, damage: '2d10+4',  xp: 2300,  speed: 30 },
  7:    { ac: 15, hp: 130, toHit: 6, damage: '3d8+3',   xp: 2900,  speed: 30 },
  8:    { ac: 16, hp: 150, toHit: 7, damage: '3d8+4',   xp: 3900,  speed: 30 },
  9:    { ac: 16, hp: 168, toHit: 7, damage: '3d10+4',  xp: 5000,  speed: 30 },
  10:   { ac: 17, hp: 187, toHit: 7, damage: '4d8+4',   xp: 5900,  speed: 30 },
  11:   { ac: 17, hp: 210, toHit: 8, damage: '4d8+5',   xp: 7200,  speed: 30 },
  12:   { ac: 17, hp: 235, toHit: 8, damage: '4d10+5',  xp: 8400,  speed: 30 },
  13:   { ac: 18, hp: 260, toHit: 8, damage: '5d8+5',   xp: 10000, speed: 30 },
  14:   { ac: 19, hp: 285, toHit: 8, damage: '5d10+5',  xp: 11500, speed: 30 },
  15:   { ac: 19, hp: 310, toHit: 8, damage: '5d10+6',  xp: 13000, speed: 30 },
  20:   { ac: 21, hp: 420, toHit: 10, damage: '7d10+7', xp: 25000, speed: 30 },
};

/**
 * Get default AC / HP / attack / XP for a given CR.
 * Falls back to nearest lower CR if exact CR not in table.
 */
export function getDefaultsForCR(cr: number): { ac: number; hp: number; toHit: number; damage: string; xp: number; speed: number } {
  if (CR_DEFAULTS[cr]) return CR_DEFAULTS[cr];
  // Find nearest known CR ≤ requested CR
  const knownCRs = Object.keys(CR_DEFAULTS).map(Number).sort((a, b) => a - b);
  let best = knownCRs[0];
  for (const k of knownCRs) {
    if (k <= cr) best = k;
    else break;
  }
  return CR_DEFAULTS[best];
}
