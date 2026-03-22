import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Dice2D.css';

// Composant Dice Iso - Dés avec effet 3D simple
const DiceIso = ({ value, type }) => {
  const isCrit = value === 20 || value >= 95 || value === '00';
  const isFail = value === 1 || value === 0;
  
  return (
    <div className={`dice-simple-container ${isCrit ? 'crit' : ''} ${isFail ? 'fail' : ''}`}>
      <div className="dice-simple">
        <span className="dice-simple-value">{value}</span>
      </div>
      <div className="dice-simple-shadow"></div>
    </div>
  );
};

// Particle effects for dice roll
const DiceParticles = ({ isRolling, result }) => {
  if (!isRolling && !result) return null;
  
  return (
    <div className="dice-particles">
      {[...Array(12)].map((_, i) => (
        <span 
          key={i} 
          className={`particle ${isRolling ? 'rolling' : 'settled'}`}
          style={{ 
            '--delay': `${i * 0.1}s`,
            '--x': `${Math.random() * 200 - 100}px`,
            '--y': `${Math.random() * 200 - 100}px`
          }}
        />
      ))}
    </div>
  );
};

// Main Dice Component
export const Dice2D = ({ type = 'd100', value, onComplete, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState('?');
  const [isRolling, setIsRolling] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const rollIntervalRef = useRef(null);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Keep the callback in a ref to avoid effect re-runs
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Generate random value based on dice type
  const getRandomValue = useCallback(() => {
    switch (type) {
      case 'd100':
        return Math.floor(Math.random() * 100) + 1;
      case 'd20':
        return Math.floor(Math.random() * 20) + 1;
      case 'd10':
        return Math.floor(Math.random() * 10);
      default:
        return Math.floor(Math.random() * 100) + 1;
    }
  }, [type]);

  useEffect(() => {
    hasCompletedRef.current = false;
    setIsRolling(true);
    setShowResult(false);
    setRollCount(0);
    
    // Start rolling animation
    const startDelay = setTimeout(() => {
      rollIntervalRef.current = setInterval(() => {
        setDisplayValue(getRandomValue());
        setRollCount(prev => {
          if (prev >= 20) { // Roll for ~2 seconds (20 * 100ms)
            clearInterval(rollIntervalRef.current);
            setDisplayValue(value);
            setIsRolling(false);
            setShowResult(true);
            
            if (!hasCompletedRef.current) {
              hasCompletedRef.current = true;
              // Use a ref to avoid dependency issues
              if (onCompleteRef.current) {
                setTimeout(() => onCompleteRef.current(value), 800);
              }
            }
          }
          return prev + 1;
        });
      }, 100);
    }, delay);

    return () => {
      clearTimeout(startDelay);
      if (rollIntervalRef.current) {
        clearInterval(rollIntervalRef.current);
      }
    };
  }, [value, type, delay, getRandomValue]);

  const isCrit = value === 20 || value >= 95 || value === '00';
  const isFail = value === 1 || value === 0;

  return (
    <div className={`dice-container ${isRolling ? 'rolling' : ''} ${showResult ? 'show-result' : ''}`}>
      <div className={`dice-wrapper ${isCrit ? 'crit-glow' : ''} ${isFail ? 'fail-shake' : ''}`}>
        <DiceParticles isRolling={isRolling} result={showResult} />
        
        <div className="dice-shadow" />
        
        <div className={`dice ${isRolling ? 'tumbling' : 'settled'}`}>
          <DiceIso value={displayValue} type={type} />
        </div>
        
        {/* Result label - REMOVED to avoid duplicate with DiceChallengeModal */}
        {/* showResult && (
          <div className={`result-label ${isCrit ? 'crit' : isFail ? 'fail' : ''}`}>
            {isCrit && <span className="crit-text">✦ CRITIQUE ✦</span>}
            {isFail && <span className="fail-text">✕ ÉCHEC ✕</span>}
            {!isCrit && !isFail && <span className="normal-text">RÉSULTAT</span>}
          </div>
        ) */}
      </div>
    </div>
  );
};

// Overlay for multiple dice
export const DiceOverlay2D = ({ diceRolls = [], onAllComplete }) => {
  const [completedDice, setCompletedDice] = useState(0);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const hasCalledCompleteRef = useRef(false);

  useEffect(() => {
    setCompletedDice(0);
    setShowFinalResult(false);
    hasCalledCompleteRef.current = false;
  }, [diceRolls]);

  const handleDiceComplete = useCallback(() => {
    setCompletedDice(prev => {
      const next = prev + 1;
      if (next >= diceRolls.length && !hasCalledCompleteRef.current) {
        hasCalledCompleteRef.current = true;
        setTimeout(() => {
          setShowFinalResult(true);
          if (onAllComplete) {
            setTimeout(onAllComplete, 1500);
          }
        }, 500);
      }
      return next;
    });
  }, [diceRolls.length, onAllComplete]);

  if (diceRolls.length === 0) return null;

  const totalValue = diceRolls.reduce((sum, roll) => sum + (roll.value || 0), 0);
  const hasCrit = diceRolls.some(r => r.value === 20 || r.value >= 95);
  const hasFail = diceRolls.some(r => r.value === 1 || r.value <= 5);

  return (
    <div className="dice-overlay-2d">
      <div className="dice-overlay-backdrop" />
      
      <div className="dice-stage">
        {diceRolls.map((roll, index) => (
          <div 
            key={index} 
            className="dice-position"
            style={{ '--index': index }}
          >
            <Dice2D 
              type={roll.type} 
              value={roll.value} 
              onComplete={handleDiceComplete}
              delay={index * 200}
            />
          </div>
        ))}
      </div>
      
      {/* Final result display */}
      {showFinalResult && (
        <div className={`final-result ${hasCrit ? 'crit' : hasFail ? 'fail' : ''}`}>
          <div className="result-header">TOTAL</div>
          <div className="result-value">{totalValue}</div>
          {hasCrit && <div className="result-bonus">✦ Réussite Critique! ✦</div>}
          {hasFail && <div className="result-penalty">✕ Échec Critique... ✕</div>}
        </div>
      )}
    </div>
  );
};

// Simple scene for single dice display
export const DiceRollScene2D = ({ diceType = 'd100', value, onComplete }) => {
  return (
    <div className="dice-scene-2d">
      <Dice2D type={diceType} value={value} onComplete={onComplete} />
    </div>
  );
};
