import React, { useState, useRef, useEffect } from 'react';
import { rollDice, formatRoll, type DiceRollResult } from '../lib/diceRoller';

const QUICK_DICE = [
  { label: 'd4',  expr: '1d4' },
  { label: 'd6',  expr: '1d6' },
  { label: 'd8',  expr: '1d8' },
  { label: 'd10', expr: '1d10' },
  { label: 'd12', expr: '1d12' },
  { label: 'd20', expr: '1d20' },
  { label: 'd100', expr: '1d100' },
];

const MAX_HISTORY = 10;

export function DiceRoller() {
  const [isOpen, setIsOpen] = useState(false);
  const [customExpr, setCustomExpr] = useState('');
  const [lastResult, setLastResult] = useState<DiceRollResult | null>(null);
  const [history, setHistory] = useState<DiceRollResult[]>([]);
  const [shakeAnim, setShakeAnim] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // Don't close if clicking the FAB itself
        const fab = document.getElementById('dice-roller-fab');
        if (fab && fab.contains(e.target as Node)) return;
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const doRoll = (expression: string) => {
    try {
      const result = rollDice(expression);
      setLastResult(result);
      setHistory(prev => [result, ...prev].slice(0, MAX_HISTORY));
      setShakeAnim(true);
      setTimeout(() => setShakeAnim(false), 400);
    } catch (err: any) {
      // silently ignore bad expressions
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customExpr.trim()) return;
    doRoll(customExpr.trim());
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="dice-roller-fab"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gold-dim), var(--gold))',
          border: 'none',
          color: 'var(--bg-deep)',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(212,165,69,0.4)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
        }}
        title="Lancer des dés"
      >
        🎲
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            width: 320,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(212,165,69,0.15)',
            zIndex: 999,
            overflow: 'hidden',
            animation: 'slideUp 0.2s ease-out',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            background: 'linear-gradient(135deg, var(--bg-card), var(--bg-surface))',
            borderBottom: '2px solid var(--border-gold)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-title)',
              color: 'var(--gold)',
              fontSize: '1rem',
              letterSpacing: 1,
            }}>
              🎲 Lanceur de Dés
            </span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >✕</button>
          </div>

          {/* Result Display */}
          <div style={{
            padding: '16px',
            textAlign: 'center',
            minHeight: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {lastResult ? (
              <>
                <div
                  className={`dice-result ${lastResult.isCritical ? 'dice-critical' : ''} ${lastResult.isFumble ? 'dice-fumble' : ''}`}
                  style={{
                    animation: shakeAnim ? 'diceReveal 0.4s ease-out' : 'none',
                  }}
                >
                  {lastResult.total}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {lastResult.expression} → {formatRoll(lastResult)}
                </div>
                {lastResult.isCritical && (
                  <div style={{ color: '#2ecc71', fontWeight: 700, fontSize: '0.85rem', marginTop: 4 }}>
                    ⚔️ CRITIQUE !
                  </div>
                )}
                {lastResult.isFumble && (
                  <div style={{ color: '#e74c3c', fontWeight: 700, fontSize: '0.85rem', marginTop: 4 }}>
                    💀 ÉCHEC CRITIQUE !
                  </div>
                )}
              </>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Cliquez sur un dé ou entrez une formule
              </div>
            )}
          </div>

          {/* Quick Dice Buttons */}
          <div style={{
            display: 'flex',
            gap: 6,
            padding: '0 16px 12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {QUICK_DICE.map(d => (
              <button
                key={d.label}
                className="btn"
                style={{
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
                onClick={() => doRoll(d.expr)}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Custom Expression */}
          <form onSubmit={handleCustomSubmit} style={{
            display: 'flex',
            gap: 6,
            padding: '0 16px 12px',
          }}>
            <input
              type="text"
              value={customExpr}
              onChange={e => setCustomExpr(e.target.value)}
              placeholder="2d6+3, 4d8-1..."
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-gold" style={{ padding: '8px 14px' }}>
              🎲
            </button>
          </form>

          {/* History */}
          {history.length > 0 && (
            <div style={{
              borderTop: '1px solid var(--border)',
              padding: '10px 16px',
              maxHeight: 180,
              overflowY: 'auto',
            }}>
              <div style={{
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: 2,
                marginBottom: 6,
              }}>
                Historique
              </div>
              {history.map((r, i) => (
                <div
                  key={r.timestamp + '-' + i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px 0',
                    borderBottom: i < history.length - 1 ? '1px solid var(--border)' : 'none',
                    fontSize: '0.8rem',
                    opacity: 1 - i * 0.06,
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>{r.expression}</span>
                  <span style={{
                    fontWeight: 700,
                    color: r.isCritical ? '#2ecc71' : r.isFumble ? '#e74c3c' : 'var(--gold)',
                    fontFamily: 'var(--font-title)',
                  }}>
                    {r.total}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Keyframe for slide-up animation */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
