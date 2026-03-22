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
  // d100 formula: Math.round((stat - 10) * 1.25)
  // Note: JS Math.round rounds .5 toward +∞ (e.g. -2.5 → -2, 2.5 → 3)
  it('should calculate correct d100 modifiers', () => {
    expect(getModifier(10)).toBe(0);     // (10-10)*1.25 = 0
    expect(getModifier(11)).toBe(1);     // (11-10)*1.25 = 1.25  → 1
    expect(getModifier(12)).toBe(3);     // (12-10)*1.25 = 2.5   → 3
    expect(getModifier(14)).toBe(5);     // (14-10)*1.25 = 5
    expect(getModifier(18)).toBe(10);    // (18-10)*1.25 = 10
    expect(getModifier(20)).toBe(13);    // (20-10)*1.25 = 12.5  → 13
    expect(getModifier(8)).toBe(-2);     // (8-10)*1.25  = -2.5  → -2 (JS rounds .5 up)
    expect(getModifier(6)).toBe(-5);     // (6-10)*1.25  = -5
    expect(getModifier(1)).toBe(-11);    // (1-10)*1.25  = -11.25 → -11
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
  // d100 formula: 20 + baseAC*3 + dex_adjust + shield*6
  // light: full dex * 1.5, medium: min(dex*1.5, 5), heavy: 0, shield: +6

  it('should add full DEX bonus (×1.5) for light armor', () => {
    // 20 + 10*3 + round(3*1.5) = 20+30+5 = 55
    expect(calculateAC(10, 3, 'light', false)).toBe(55);
    // 20 + 10*3 + round(5*1.5) = 20+30+8 = 58
    expect(calculateAC(10, 5, 'light', false)).toBe(58);
  });

  it('should cap DEX bonus at +5 for medium armor', () => {
    // 20 + 14*3 + min(round(3*1.5),5) = 20+42+5 = 67
    expect(calculateAC(14, 3, 'medium', false)).toBe(67);
    // 20 + 14*3 + min(round(5*1.5),5) = 20+42+5 = 67  (capped)
    expect(calculateAC(14, 5, 'medium', false)).toBe(67);
  });

  it('should not add DEX bonus for heavy armor', () => {
    // 20 + 18*3 + 0 = 74
    expect(calculateAC(18, 3, 'heavy', false)).toBe(74);
    expect(calculateAC(18, 5, 'heavy', false)).toBe(74);
  });

  it('should add +6 for shield (d100)', () => {
    // 20 + 10*3 + round(2*1.5) + 6 = 20+30+3+6 = 59
    expect(calculateAC(10, 2, 'light', true)).toBe(59);
    // 20 + 16*3 + 0 + 6 = 20+48+6 = 74
    expect(calculateAC(16, 0, 'heavy', true)).toBe(74);
  });
});
