import { describe, it, expect } from 'vitest';
import { distanceToTurns, resolveJoinStatus, isImmediateJoin, buildDistancePrompt } from '../managers/combatInit';

describe('distanceToTurns', () => {
  it('returns 1 for close', () => {
    expect(distanceToTurns('close')).toBe(1);
    expect(distanceToTurns('CLOSE')).toBe(1);
  });

  it('returns 3 for medium', () => {
    expect(distanceToTurns('medium')).toBe(3);
    expect(distanceToTurns('MEDIUM')).toBe(3);
  });

  it('returns 5 for far', () => {
    expect(distanceToTurns('far')).toBe(5);
    expect(distanceToTurns('FAR')).toBe(5);
  });

  it('defaults to 3 for unknown', () => {
    expect(distanceToTurns('unknown')).toBe(3);
    expect(distanceToTurns(undefined as unknown as string)).toBe(3);
  });
});

describe('resolveJoinStatus', () => {
  it('returns "arrived" for 0 turns', () => {
    expect(resolveJoinStatus(0)).toBe('arrived');
  });

  it('returns traveling string for non-zero turns', () => {
    expect(resolveJoinStatus(1)).toBe('traveling:1');
    expect(resolveJoinStatus(3)).toBe('traveling:3');
    expect(resolveJoinStatus(5)).toBe('traveling:5');
  });
});

describe('isImmediateJoin', () => {
  it('returns true for IMMEDIATE', () => {
    expect(isImmediateJoin('IMMEDIATE', undefined)).toBe(true);
    expect(isImmediateJoin('immediate', undefined)).toBe(true);
  });

  it('returns true for CLOSE with 0 turns', () => {
    expect(isImmediateJoin('CLOSE', 0)).toBe(true);
    expect(isImmediateJoin('close', 0)).toBe(true);
  });

  it('returns false for CLOSE with non-zero turns', () => {
    expect(isImmediateJoin('CLOSE', 1)).toBe(false);
    expect(isImmediateJoin('CLOSE', undefined)).toBe(false);
  });

  it('returns false for medium/far', () => {
    expect(isImmediateJoin('MEDIUM', 0)).toBe(false);
    expect(isImmediateJoin('FAR', 0)).toBe(false);
  });

  it('handles null/undefined gracefully', () => {
    expect(isImmediateJoin(null as unknown as string, undefined)).toBe(false);
    expect(isImmediateJoin(undefined as unknown as string, undefined)).toBe(false);
  });
});

describe('buildDistancePrompt', () => {
  it('generates a string containing enemy data', () => {
    const enemies = [{ name: 'Goblin', hp: 10 }];
    const result = buildDistancePrompt(enemies);
    expect(result).toContain('Goblin');
    expect(result).toContain('IMMEDIATE');
    expect(result).toContain('CLOSE');
  });

  it('handles empty array', () => {
    const result = buildDistancePrompt([]);
    expect(result).toContain('[]');
  });
});
