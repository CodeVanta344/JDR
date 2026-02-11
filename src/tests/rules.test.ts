import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rollDice, getModifier, calculateLevel, getXPForNextLevel, calculateAC } from '../lore/rules';

describe('rollDice', () => {
  it('should roll a single d20', () => {
    const result = rollDice('1d20');
    expect(result.rolls.length).toBe(1);
    expect(result.rolls[0]).toBeGreaterThanOrEqual(1);
    expect(result.rolls[0]).toBeLessThanOrEqual(20);
    expect(result.total).toBe(result.rolls[0]);
  });

  it('should roll multiple dice', () => {
    const result = rollDice('3d6');
    expect(result.rolls.length).toBe(3);
    result.rolls.forEach(roll => {
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(6);
    });
    expect(result.total).toBe(result.rolls.reduce((a, b) => a + b, 0));
  });

  it('should handle modifiers', () => {
    const result = rollDice('1d20+5');
    expect(result.total).toBe(result.rolls[0] + 5);
  });

  it('should handle negative modifiers', () => {
    const result = rollDice('1d20-3');
    expect(result.total).toBe(result.rolls[0] - 3);
  });

  it('should return 0 for invalid dice strings', () => {
    const result = rollDice('invalid');
    expect(result.total).toBe(0);
    expect(result.rolls.length).toBe(0);
  });
});

describe('getModifier', () => {
  it('should calculate correct modifiers', () => {
    expect(getModifier(10)).toBe(0);
    expect(getModifier(11)).toBe(0);
    expect(getModifier(12)).toBe(1);
    expect(getModifier(14)).toBe(2);
    expect(getModifier(18)).toBe(4);
    expect(getModifier(20)).toBe(5);
    expect(getModifier(8)).toBe(-1);
    expect(getModifier(6)).toBe(-2);
    expect(getModifier(1)).toBe(-5);
  });
});

describe('calculateLevel', () => {
  it('should return level 1 for 0 XP', () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it('should return level 2 at 300 XP', () => {
    expect(calculateLevel(300)).toBe(2);
  });

  it('should return correct levels at thresholds', () => {
    expect(calculateLevel(900)).toBe(3);
    expect(calculateLevel(2700)).toBe(4);
    expect(calculateLevel(6500)).toBe(5);
  });

  it('should return max level for very high XP', () => {
    expect(calculateLevel(10000000)).toBe(30);
  });
});

describe('getXPForNextLevel', () => {
  it('should return XP needed for next level', () => {
    expect(getXPForNextLevel(1)).toBe(300);
    expect(getXPForNextLevel(2)).toBe(900);
    expect(getXPForNextLevel(3)).toBe(2700);
  });

  it('should return max threshold for level 30', () => {
    expect(getXPForNextLevel(30)).toBe(5200000);
  });
});

describe('calculateAC', () => {
  it('should add full DEX bonus for light armor', () => {
    expect(calculateAC(10, 3, 'light', false)).toBe(13);
    expect(calculateAC(10, 5, 'light', false)).toBe(15);
  });

  it('should cap DEX bonus at +2 for medium armor', () => {
    expect(calculateAC(14, 3, 'medium', false)).toBe(16);
    expect(calculateAC(14, 5, 'medium', false)).toBe(16);
  });

  it('should not add DEX bonus for heavy armor', () => {
    expect(calculateAC(18, 3, 'heavy', false)).toBe(18);
    expect(calculateAC(18, 5, 'heavy', false)).toBe(18);
  });

  it('should add +2 for shield', () => {
    expect(calculateAC(10, 2, 'light', true)).toBe(14);
    expect(calculateAC(16, 0, 'heavy', true)).toBe(18);
  });
});
