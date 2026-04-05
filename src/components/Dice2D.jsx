import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Dice2D.css';

/**
 * Premium D100 Die - 2D with depth illusion
 * Pentagonal shape with faceted edges, smooth roll animation
 */
const D100Face = ({ value, state, isCrit, isFail }) => {
  const cls = [
    'die-face',
    state,
    isCrit ? 'crit' : '',
    isFail ? 'fail' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      <svg viewBox="0 0 120 120" className="die-svg">
        {/* Outer shape - pentagonal/decagonal feel */}
        <defs>
          <linearGradient id="dieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isCrit ? '#FFD700' : isFail ? '#8B0000' : '#2a2540'} />
            <stop offset="40%" stopColor={isCrit ? '#FFA500' : isFail ? '#5c0000' : '#1a1530'} />
            <stop offset="100%" stopColor={isCrit ? '#B8860B' : isFail ? '#3a0000' : '#0d0b18'} />
          </linearGradient>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isCrit ? '#FFD700' : isFail ? '#ff4444' : '#8B7355'} stopOpacity="0.8" />
            <stop offset="100%" stopColor={isCrit ? '#D4AF37' : isFail ? '#aa2222' : '#5a4a3a'} stopOpacity="0.4" />
          </linearGradient>
          <filter id="innerGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dropShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Main body - rounded polygon */}
        <polygon
          points="60,4 108,28 108,80 60,116 12,80 12,28"
          fill="url(#dieGrad)"
          stroke="url(#edgeGrad)"
          strokeWidth="2.5"
          filter="url(#dropShadow)"
        />

        {/* Inner facet lines for depth */}
        <line x1="60" y1="4" x2="60" y2="60" stroke={isCrit ? 'rgba(255,215,0,0.15)' : 'rgba(139,115,85,0.1)'} strokeWidth="1" />
        <line x1="12" y1="28" x2="60" y2="60" stroke={isCrit ? 'rgba(255,215,0,0.1)' : 'rgba(139,115,85,0.07)'} strokeWidth="1" />
        <line x1="108" y1="28" x2="60" y2="60" stroke={isCrit ? 'rgba(255,215,0,0.1)' : 'rgba(139,115,85,0.07)'} strokeWidth="1" />
        <line x1="12" y1="80" x2="60" y2="60" stroke={isCrit ? 'rgba(255,215,0,0.08)' : 'rgba(139,115,85,0.05)'} strokeWidth="1" />
        <line x1="108" y1="80" x2="60" y2="60" stroke={isCrit ? 'rgba(255,215,0,0.08)' : 'rgba(139,115,85,0.05)'} strokeWidth="1" />

        {/* Highlight on top facet */}
        <polygon
          points="60,4 108,28 60,60 12,28"
          fill="rgba(255,255,255,0.06)"
        />

        {/* Number */}
        <text
          x="60"
          y="68"
          textAnchor="middle"
          dominantBaseline="central"
          className="die-number"
          fill={isCrit ? '#FFD700' : isFail ? '#ff6b6b' : '#e8dcc8'}
          fontSize={value >= 100 ? '28' : value >= 10 ? '34' : '38'}
          fontFamily="'Cinzel Decorative', serif"
          fontWeight="900"
        >
          {value}
        </text>

        {/* Small d100 label */}
        <text
          x="60"
          y="100"
          textAnchor="middle"
          fill={isCrit ? 'rgba(255,215,0,0.5)' : 'rgba(139,115,85,0.4)'}
          fontSize="10"
          fontFamily="'Cinzel Decorative', serif"
          letterSpacing="2"
        >
          d100
        </text>
      </svg>
    </div>
  );
};

// Spark particles on roll
const RollSparks = ({ active, isCrit, isFail }) => {
  if (!active) return null;
  const color = isCrit ? '#FFD700' : isFail ? '#ff4444' : '#8B7355';
  return (
    <div className="roll-sparks">
      {[...Array(16)].map((_, i) => (
        <span
          key={i}
          className="spark"
          style={{
            '--angle': `${(i / 16) * 360}deg`,
            '--dist': `${60 + Math.random() * 40}px`,
            '--delay': `${Math.random() * 0.3}s`,
            '--size': `${2 + Math.random() * 4}px`,
            background: color,
          }}
        />
      ))}
    </div>
  );
};

// Impact ring on settle
const ImpactRing = ({ active, isCrit }) => {
  if (!active) return null;
  return (
    <div className={`impact-ring ${isCrit ? 'crit' : ''}`} />
  );
};

// Main exported component
export const Dice2D = ({ type = 'd100', value, onComplete, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState('?');
  const [phase, setPhase] = useState('idle'); // idle, rolling, settling, done
  const rollRef = useRef(null);
  const hasCompletedRef = useRef(false);
  const hasStartedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const valueRef = useRef(value);
  const typeRef = useRef(type);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);
  useEffect(() => { valueRef.current = value; }, [value]);

  // Run animation ONCE on mount only
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const getRand = () => {
      if (typeRef.current === 'd20') return Math.floor(Math.random() * 20) + 1;
      if (typeRef.current === 'd10') return Math.floor(Math.random() * 10);
      return Math.floor(Math.random() * 100) + 1;
    };

    const startTimer = setTimeout(() => {
      setPhase('rolling');
      let count = 0;
      const maxRolls = 25;

      rollRef.current = setInterval(() => {
        setDisplayValue(getRand());
        count++;

        if (count >= maxRolls) {
          clearInterval(rollRef.current);
          setDisplayValue(valueRef.current);
          setPhase('settling');

          setTimeout(() => {
            setPhase('done');
            if (!hasCompletedRef.current) {
              hasCompletedRef.current = true;
              if (onCompleteRef.current) {
                setTimeout(() => onCompleteRef.current(valueRef.current), 600);
              }
            }
          }, 500);
        }
      }, 70);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (rollRef.current) clearInterval(rollRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps — intentionally run once

  const isCrit = value >= 95 || value === 100;
  const isFail = value <= 5 || value === 1;
  const settled = phase === 'settling' || phase === 'done';

  return (
    <div className={`dice2d-root ${phase}`}>
      <div className={`dice2d-body ${isCrit ? 'crit-glow' : ''} ${isFail ? 'fail-glow' : ''}`}>
        <RollSparks active={settled} isCrit={isCrit} isFail={isFail} />
        <ImpactRing active={settled} isCrit={isCrit} />

        <div className={`dice2d-rotator ${phase === 'rolling' ? 'spin' : phase === 'settling' ? 'land' : ''}`}>
          <D100Face value={displayValue} state={phase} isCrit={isCrit} isFail={isFail} />
        </div>

        {/* Ground shadow */}
        <div className={`dice2d-shadow ${phase}`} />
      </div>
    </div>
  );
};

// Alias for NarrationPanel compatibility
export const DiceRollScene2D = ({ diceType, value, onComplete }) => (
  <Dice2D type={diceType || 'd100'} value={value} onComplete={onComplete} />
);

// Overlay for combat rolls
export const DiceOverlay2D = ({ diceRolls = [], onAllComplete }) => {
  const [completedDice, setCompletedDice] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    setCompletedDice(0);
    setShowFinal(false);
    doneRef.current = false;
  }, [diceRolls]);

  const handleDiceComplete = useCallback(() => {
    setCompletedDice(prev => {
      const next = prev + 1;
      if (next >= diceRolls.length && !doneRef.current) {
        doneRef.current = true;
        setTimeout(() => {
          setShowFinal(true);
          if (onAllComplete) setTimeout(onAllComplete, 1200);
        }, 400);
      }
      return next;
    });
  }, [diceRolls.length, onAllComplete]);

  if (diceRolls.length === 0) return null;

  const totalValue = diceRolls.reduce((sum, r) => sum + (r.value || 0), 0);
  const hasCrit = diceRolls.some(r => r.value >= 95);
  const hasFail = diceRolls.some(r => r.value <= 5);

  return (
    <div className="dice-overlay-2d">
      <div className="dice-overlay-backdrop" />
      <div className="dice-stage">
        {diceRolls.map((roll, i) => (
          <div key={i} className="dice-position" style={{ '--index': i }}>
            <Dice2D
              type={roll.type || 'd100'}
              value={roll.value}
              delay={i * 200}
              onComplete={handleDiceComplete}
            />
          </div>
        ))}
      </div>
      {showFinal && (
        <div className={`final-result ${hasCrit ? 'crit' : hasFail ? 'fail' : ''}`}>
          <div className="result-header">TOTAL</div>
          <div className="result-value">{totalValue}</div>
        </div>
      )}
    </div>
  );
};
