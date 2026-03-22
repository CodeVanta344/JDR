/**
 * DICE ROLLER UTILITY — Parses and rolls dice expressions like "2d6+3", "1d20", "4d8-2"
 */

export interface DiceRollResult {
  /** The original expression string */
  expression: string;
  /** Individual die results */
  dice: number[];
  /** The modifier (+ or -) */
  modifier: number;
  /** The total result */
  total: number;
  /** Number of sides on the dice */
  sides: number;
  /** Number of dice rolled */
  count: number;
  /** Timestamp */
  timestamp: number;
  /** Is this a natural 20? (only for single d20 rolls) */
  isCritical: boolean;
  /** Is this a natural 1? (only for single d20 rolls) */
  isFumble: boolean;
}

/**
 * Parse and roll a dice expression.
 * Supports: "d20", "1d20", "2d6+3", "1d8-1", "3d10", "d100"
 */
export function rollDice(expression: string): DiceRollResult {
  const cleaned = expression.toLowerCase().replace(/\s/g, '');

  // Match pattern: [count]d<sides>[+/-modifier]
  const match = cleaned.match(/^(\d*)d(\d+)([+-]\d+)?$/);

  if (!match) {
    // If it's just a number, treat it as a flat modifier
    const num = parseInt(cleaned);
    if (!isNaN(num)) {
      return {
        expression,
        dice: [],
        modifier: num,
        total: num,
        sides: 0,
        count: 0,
        timestamp: Date.now(),
        isCritical: false,
        isFumble: false,
      };
    }
    throw new Error(`Expression invalide: "${expression}"`);
  }

  const count = match[1] ? parseInt(match[1]) : 1;
  const sides = parseInt(match[2]);
  const modifier = match[3] ? parseInt(match[3]) : 0;

  if (count < 1 || count > 100) throw new Error('Nombre de dés entre 1 et 100');
  if (sides < 2 || sides > 1000) throw new Error('Nombre de faces entre 2 et 1000');

  const dice: number[] = [];
  for (let i = 0; i < count; i++) {
    dice.push(Math.floor(Math.random() * sides) + 1);
  }

  const sum = dice.reduce((a, b) => a + b, 0);
  const total = sum + modifier;

  const isCritical = count === 1 && sides === 20 && dice[0] === 20;
  const isFumble = count === 1 && sides === 20 && dice[0] === 1;

  return {
    expression,
    dice,
    modifier,
    total,
    sides,
    count,
    timestamp: Date.now(),
    isCritical,
    isFumble,
  };
}

/** Quick roll a single die */
export function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}

/** Format a roll result for display */
export function formatRoll(result: DiceRollResult): string {
  if (result.dice.length === 0) return `${result.total}`;
  const diceStr = result.dice.join(' + ');
  const modStr = result.modifier > 0 ? ` + ${result.modifier}` : result.modifier < 0 ? ` - ${Math.abs(result.modifier)}` : '';
  return `[${diceStr}]${modStr} = ${result.total}`;
}
