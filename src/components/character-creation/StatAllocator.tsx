import React, { useState, useCallback, useEffect, useMemo } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────────

type StatKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
type Mode = 'standard' | 'pointbuy' | 'roll';

interface StatAllocatorProps {
  lifepathBonuses: Record<string, number>;
  onStatsChange: (stats: Record<string, number>) => void;
  classRecommendation?: { major: string[]; minor: string[] };
}

// ── Constants ──────────────────────────────────────────────────────────────────

const STAT_KEYS: StatKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

const STAT_META: Record<StatKey, { icon: string; label: string }> = {
  str: { icon: '⚔️', label: 'Force' },
  dex: { icon: '🏹', label: 'Dextérité' },
  con: { icon: '🛡️', label: 'Constitution' },
  int: { icon: '📜', label: 'Intelligence' },
  wis: { icon: '👁️', label: 'Sagesse' },
  cha: { icon: '👑', label: 'Charisme' },
};

const STANDARD_ARRAY = [16, 14, 13, 12, 10, 8];
const POINT_BUY_BUDGET = 27;
const POINT_BUY_MIN = 8;
const POINT_BUY_MAX = 15;
const FINAL_CAP = 18;

const TABS: { key: Mode; label: string }[] = [
  { key: 'standard', label: 'TABLEAU STANDARD' },
  { key: 'pointbuy', label: 'ACHAT DE POINTS' },
  { key: 'roll', label: 'LANCER LES DÉS' },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function pointBuyCost(from: number, to: number): number {
  let cost = 0;
  for (let v = from; v < to; v++) cost += v >= 13 ? 2 : 1;
  return cost;
}

function modifier(final: number): number {
  return Math.floor((final - 10) / 2);
}

function fmtMod(m: number): string {
  return m >= 0 ? `+${m}` : `${m}`;
}

function roll4d6DropLowest(): number {
  const dice = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  dice.sort((a, b) => a - b);
  return dice[1] + dice[2] + dice[3];
}

// ── Styles ──────────────────────────────────────────────────────────────────

const s = {
  wrapper: {
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: 8,
    padding: 24,
    fontFamily: "'Inter', sans-serif",
    color: '#f4e8d0',
  } as React.CSSProperties,
  heading: {
    fontFamily: "'Cinzel', serif",
    fontSize: 20,
    color: '#d4af37',
    margin: '0 0 16px',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  tabBar: {
    display: 'flex',
    gap: 4,
    marginBottom: 20,
    borderBottom: '1px solid rgba(212,175,55,0.2)',
    paddingBottom: 0,
  } as React.CSSProperties,
  tab: (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '10px 8px',
    background: active ? 'rgba(212,175,55,0.15)' : 'transparent',
    border: 'none',
    borderBottom: active ? '2px solid #d4af37' : '2px solid transparent',
    color: active ? '#d4af37' : '#f4e8d0',
    fontFamily: "'Cinzel', serif",
    fontSize: 12,
    letterSpacing: 1,
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 12px',
    borderBottom: '1px solid rgba(212,175,55,0.08)',
    transition: 'background 0.15s',
  } as React.CSSProperties,
  icon: { fontSize: 20, width: 28, textAlign: 'center' as const } as React.CSSProperties,
  label: { width: 110, fontFamily: "'Cinzel', serif", fontSize: 13 } as React.CSSProperties,
  baseVal: {
    width: 48,
    textAlign: 'center' as const,
    fontWeight: 700,
    fontSize: 16,
  } as React.CSSProperties,
  badge: {
    background: 'rgba(212,175,55,0.15)',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: 4,
    padding: '2px 6px',
    fontSize: 12,
    color: '#d4af37',
    minWidth: 32,
    textAlign: 'center' as const,
  } as React.CSSProperties,
  finalVal: { fontWeight: 700, fontSize: 16, width: 36, textAlign: 'center' as const } as React.CSSProperties,
  mod: { fontSize: 13, opacity: 0.7, width: 36, textAlign: 'center' as const } as React.CSSProperties,
  select: {
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: 4,
    color: '#f4e8d0',
    padding: '4px 8px',
    fontSize: 14,
    cursor: 'pointer',
    width: 56,
  } as React.CSSProperties,
  btn: (disabled = false): React.CSSProperties => ({
    background: disabled ? 'rgba(212,175,55,0.08)' : 'rgba(212,175,55,0.15)',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: 4,
    color: disabled ? '#8a7a5a' : '#d4af37',
    padding: '4px 10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: 16,
    lineHeight: 1,
    transition: 'background 0.15s',
  }),
  bigBtn: {
    display: 'block',
    margin: '16px auto 8px',
    padding: '10px 32px',
    background: 'rgba(212,175,55,0.15)',
    border: '1px solid rgba(212,175,55,0.4)',
    borderRadius: 6,
    color: '#d4af37',
    fontFamily: "'Cinzel', serif",
    fontSize: 14,
    letterSpacing: 1,
    cursor: 'pointer',
    transition: 'background 0.2s',
  } as React.CSSProperties,
  points: {
    textAlign: 'center' as const,
    fontFamily: "'Cinzel', serif",
    fontSize: 15,
    marginBottom: 14,
    color: '#d4af37',
  } as React.CSSProperties,
} as const;

// ── Component ──────────────────────────────────────────────────────────────

const StatAllocator: React.FC<StatAllocatorProps> = ({
  lifepathBonuses,
  onStatsChange,
  classRecommendation,
}) => {
  const [mode, setMode] = useState<Mode>('standard');

  // Standard array assignments: stat -> chosen value or null
  const [standardAssign, setStandardAssign] = useState<Record<StatKey, number | null>>(
    () => Object.fromEntries(STAT_KEYS.map((k) => [k, null])) as Record<StatKey, number | null>,
  );

  // Point-buy base values
  const [pointBuyValues, setPointBuyValues] = useState<Record<StatKey, number>>(
    () => Object.fromEntries(STAT_KEYS.map((k) => [k, POINT_BUY_MIN])) as Record<StatKey, number>,
  );

  // Roll results & assignments
  const [rolledPool, setRolledPool] = useState<number[]>([]);
  const [rollAssign, setRollAssign] = useState<Record<StatKey, number | null>>(
    () => Object.fromEntries(STAT_KEYS.map((k) => [k, null])) as Record<StatKey, number | null>,
  );
  const [rolling, setRolling] = useState<boolean[]>(Array(6).fill(false));
  const [displayPool, setDisplayPool] = useState<number[]>(Array(6).fill(0));

  // ── Derived values ────────────────────────────────────────────────────────

  const baseValues: Record<StatKey, number | null> = useMemo(() => {
    if (mode === 'standard') return standardAssign;
    if (mode === 'pointbuy')
      return Object.fromEntries(STAT_KEYS.map((k) => [k, pointBuyValues[k]])) as Record<StatKey, number | null>;
    return rollAssign;
  }, [mode, standardAssign, pointBuyValues, rollAssign]);

  const pointsSpent = useMemo(
    () => STAT_KEYS.reduce((sum, k) => sum + pointBuyCost(POINT_BUY_MIN, pointBuyValues[k]), 0),
    [pointBuyValues],
  );
  const pointsRemaining = POINT_BUY_BUDGET - pointsSpent;

  // Remaining standard array values
  const usedStandard = useMemo(
    () => Object.values(standardAssign).filter((v): v is number => v !== null),
    [standardAssign],
  );
  const remainingStandard = useMemo(() => {
    const pool = [...STANDARD_ARRAY];
    usedStandard.forEach((v) => {
      const idx = pool.indexOf(v);
      if (idx !== -1) pool.splice(idx, 1);
    });
    return pool.sort((a, b) => b - a);
  }, [usedStandard]);

  // Remaining roll pool values
  const usedRoll = useMemo(
    () => Object.values(rollAssign).filter((v): v is number => v !== null),
    [rollAssign],
  );
  const remainingRoll = useMemo(() => {
    const pool = [...rolledPool];
    usedRoll.forEach((v) => {
      const idx = pool.indexOf(v);
      if (idx !== -1) pool.splice(idx, 1);
    });
    return pool.sort((a, b) => b - a);
  }, [rolledPool, usedRoll]);

  // ── Emit final stats ──────────────────────────────────────────────────────

  useEffect(() => {
    const stats: Record<string, number> = {};
    STAT_KEYS.forEach((k) => {
      const base = baseValues[k];
      if (base === null) return;
      const bonus = lifepathBonuses[k] ?? 0;
      stats[k] = Math.min(base + bonus, FINAL_CAP);
    });
    if (Object.keys(stats).length === 6) onStatsChange(stats);
  }, [baseValues, lifepathBonuses, onStatsChange]);

  // ── Rolling logic ─────────────────────────────────────────────────────────

  const animateRoll = useCallback((indices: number[], onDone: (results: number[]) => void) => {
    setRolling((prev) => {
      const next = [...prev];
      indices.forEach((i) => (next[i] = true));
      return next;
    });

    const interval = setInterval(() => {
      setDisplayPool((prev) => {
        const next = [...prev];
        indices.forEach((i) => (next[i] = Math.floor(Math.random() * 13) + 3));
        return next;
      });
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      const results = indices.map(() => roll4d6DropLowest());
      setRolling((prev) => {
        const next = [...prev];
        indices.forEach((i) => (next[i] = false));
        return next;
      });
      onDone(results);
    }, 600);
  }, []);

  const rollAll = useCallback(() => {
    setRollAssign(Object.fromEntries(STAT_KEYS.map((k) => [k, null])) as Record<StatKey, number | null>);
    animateRoll([0, 1, 2, 3, 4, 5], (results) => {
      setRolledPool(results);
      setDisplayPool(results);
    });
  }, [animateRoll]);

  const rerollOne = useCallback(
    (idx: number) => {
      // Unassign anything using the old value at this index
      const oldVal = rolledPool[idx];
      if (oldVal !== undefined) {
        setRollAssign((prev) => {
          const next = { ...prev };
          // Clear any stat that had the old pool value assigned from this slot
          STAT_KEYS.forEach((k) => {
            if (next[k] === oldVal) next[k] = null;
          });
          return next;
        });
      }
      animateRoll([idx], (results) => {
        setRolledPool((prev) => {
          const next = [...prev];
          next[idx] = results[0];
          return next;
        });
        setDisplayPool((prev) => {
          const next = [...prev];
          next[idx] = results[0];
          return next;
        });
      });
    },
    [animateRoll, rolledPool],
  );

  // ── Stat colour based on class recommendation ─────────────────────────────

  const statColor = useCallback(
    (key: StatKey): string | undefined => {
      if (!classRecommendation) return undefined;
      if (classRecommendation.major.includes(key)) return '#d4af37';
      if (classRecommendation.minor.includes(key)) return '#b0b0b0';
      return undefined;
    },
    [classRecommendation],
  );

  // ── Render helpers ────────────────────────────────────────────────────────

  const renderStatRow = (key: StatKey, baseControl: React.ReactNode) => {
    const meta = STAT_META[key];
    const base = baseValues[key];
    const bonus = lifepathBonuses[key] ?? 0;
    const final = base !== null ? Math.min(base + bonus, FINAL_CAP) : null;
    const mod = final !== null ? modifier(final) : null;
    const highlight = statColor(key);

    return (
      <div
        key={key}
        style={{
          ...s.row,
          borderLeft: highlight ? `3px solid ${highlight}` : '3px solid transparent',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212,175,55,0.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <span style={s.icon}>{meta.icon}</span>
        <span style={{ ...s.label, color: highlight ?? '#f4e8d0' }}>{meta.label}</span>
        <span style={s.baseVal}>{baseControl}</span>
        {bonus !== 0 && <span style={s.badge}>+{bonus}</span>}
        {bonus === 0 && <span style={{ ...s.badge, opacity: 0.3 }}>+0</span>}
        <span style={{ margin: '0 4px', opacity: 0.4 }}>=</span>
        <span style={{ ...s.finalVal, color: final !== null && final >= 16 ? '#d4af37' : '#f4e8d0' }}>
          {final ?? '—'}
        </span>
        <span style={s.mod}>{mod !== null ? fmtMod(mod) : ''}</span>
      </div>
    );
  };

  // ── Standard array controls ───────────────────────────────────────────────

  const renderStandard = () =>
    STAT_KEYS.map((key) => {
      const current = standardAssign[key];
      const options = current !== null ? [current, ...remainingStandard] : remainingStandard;
      const uniqueOptions = [...new Set(options)].sort((a, b) => b - a);

      const control = (
        <select
          style={s.select}
          value={current ?? ''}
          onChange={(e) => {
            const val = e.target.value === '' ? null : Number(e.target.value);
            setStandardAssign((prev) => ({ ...prev, [key]: val }));
          }}
        >
          <option value="">—</option>
          {uniqueOptions.map((v, i) => (
            <option key={`${v}-${i}`} value={v}>
              {v}
            </option>
          ))}
        </select>
      );

      return renderStatRow(key, control);
    });

  // ── Point-buy controls ────────────────────────────────────────────────────

  const renderPointBuy = () => (
    <>
      <div style={s.points}>
        Points restants : <strong>{pointsRemaining}</strong> / {POINT_BUY_BUDGET}
      </div>
      {STAT_KEYS.map((key) => {
        const val = pointBuyValues[key];
        const costUp = val >= 13 ? 2 : 1;
        const canInc = val < POINT_BUY_MAX && pointsRemaining >= costUp;
        const canDec = val > POINT_BUY_MIN;

        const control = (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              style={s.btn(!canDec)}
              disabled={!canDec}
              onClick={() =>
                setPointBuyValues((prev) => ({ ...prev, [key]: prev[key] - 1 }))
              }
              onMouseEnter={(e) => canDec && (e.currentTarget.style.background = 'rgba(212,175,55,0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = s.btn(!canDec).background as string)}
            >
              −
            </button>
            <span style={{ width: 28, textAlign: 'center', fontWeight: 700 }}>{val}</span>
            <button
              style={s.btn(!canInc)}
              disabled={!canInc}
              onClick={() =>
                setPointBuyValues((prev) => ({ ...prev, [key]: prev[key] + 1 }))
              }
              onMouseEnter={(e) => canInc && (e.currentTarget.style.background = 'rgba(212,175,55,0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = s.btn(!canInc).background as string)}
            >
              +
            </button>
          </span>
        );

        return renderStatRow(key, control);
      })}
    </>
  );

  // ── Roll controls ─────────────────────────────────────────────────────────

  const renderRoll = () => (
    <>
      {/* Pool display */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {displayPool.map((val, idx) => (
          <div
            key={idx}
            style={{
              background: rolling[idx] ? 'rgba(212,175,55,0.2)' : 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 6,
              padding: '8px 12px',
              minWidth: 44,
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 16,
              transition: 'background 0.15s',
              cursor: rolledPool.length > 0 && !rolling[idx] ? 'pointer' : 'default',
            }}
            title="Cliquer pour relancer"
            onClick={() => rolledPool.length > 0 && !rolling[idx] && rerollOne(idx)}
          >
            {rolledPool.length === 0 && !rolling[idx] ? '?' : val}
          </div>
        ))}
      </div>

      <button
        style={s.bigBtn}
        onClick={rollAll}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212,175,55,0.25)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(212,175,55,0.15)')}
      >
        🎲 TOUT LANCER
      </button>

      {rolledPool.length > 0 && (
        <div style={{ marginTop: 12 }}>
          {STAT_KEYS.map((key) => {
            const current = rollAssign[key];
            const options = current !== null ? [current, ...remainingRoll] : remainingRoll;
            const uniqueOptions = [...new Set(options)].sort((a, b) => b - a);

            const control = (
              <select
                style={s.select}
                value={current ?? ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? null : Number(e.target.value);
                  setRollAssign((prev) => ({ ...prev, [key]: val }));
                }}
              >
                <option value="">—</option>
                {uniqueOptions.map((v, i) => (
                  <option key={`${v}-${i}`} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            );

            return renderStatRow(key, control);
          })}
        </div>
      )}
    </>
  );

  // ── Main render ───────────────────────────────────────────────────────────

  return (
    <div style={s.wrapper}>
      <h3 style={s.heading}>Répartition des Caractéristiques</h3>

      {/* Tab bar */}
      <div style={s.tabBar}>
        {TABS.map((t) => (
          <button
            key={t.key}
            style={s.tab(mode === t.key)}
            onClick={() => setMode(t.key)}
            onMouseEnter={(e) =>
              mode !== t.key && (e.currentTarget.style.background = 'rgba(212,175,55,0.08)')
            }
            onMouseLeave={(e) =>
              mode !== t.key && (e.currentTarget.style.background = 'transparent')
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Mode content */}
      {mode === 'standard' && renderStandard()}
      {mode === 'pointbuy' && renderPointBuy()}
      {mode === 'roll' && renderRoll()}
    </div>
  );
};

export default StatAllocator;
