import React, { useState, useEffect } from 'react';
import './DiceRoll3D.css';

const DICE_FACES = {
    d4: [1, 2, 3, 4],
    d6: [1, 2, 3, 4, 5, 6],
    d8: [1, 2, 3, 4, 5, 6, 7, 8],
    d10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    d12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    d20: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    d100: Array.from({ length: 100 }, (_, i) => i + 1)
};

export function DiceRoll3D({ 
    diceType = 'd20', 
    result, 
    modifier = 0, 
    target = null,
    action = null,
    onComplete 
}) {
    const [rolling, setRolling] = useState(true);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        // Animation de roulement pendant 2.5s
        const rollTimer = setTimeout(() => {
            setRolling(false);
            setShowResult(true);
            if (onComplete) onComplete();
        }, 2500);

        return () => clearTimeout(rollTimer);
    }, [onComplete]);

    const total = result + modifier;
    const success = target !== null ? total >= target : null;

    // Couleur basée sur le résultat
    const getResultColor = () => {
        if (target === null) return '#d4af37';
        return success ? '#4ade80' : '#ef4444';
    };

    // Rotation aléatoire pour effet naturel
    const randomRotation = {
        x: Math.random() * 720 + 360,
        y: Math.random() * 720 + 360,
        z: Math.random() * 720 + 360
    };

    return (
        <div className="dice-roll-container">
            {/* Animation du dé */}
            <div className={`dice-3d ${rolling ? 'rolling' : 'landed'}`}>
                <div 
                    className={`dice-cube dice-${diceType}`}
                    style={{
                        '--rotate-x': `${randomRotation.x}deg`,
                        '--rotate-y': `${randomRotation.y}deg`,
                        '--rotate-z': `${randomRotation.z}deg`,
                        '--result-color': getResultColor()
                    }}
                >
                    {/* Faces du dé (d6 comme base visuelle) */}
                    <div className="dice-face dice-face-front">{rolling ? '?' : result}</div>
                    <div className="dice-face dice-face-back">{rolling ? '?' : result}</div>
                    <div className="dice-face dice-face-right">{rolling ? '?' : result}</div>
                    <div className="dice-face dice-face-left">{rolling ? '?' : result}</div>
                    <div className="dice-face dice-face-top">{rolling ? '?' : result}</div>
                    <div className="dice-face dice-face-bottom">{rolling ? '?' : result}</div>
                </div>

                {/* Particules d'impact */}
                {!rolling && (
                    <div className="dice-impact-particles">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="particle" style={{ '--angle': `${i * 30}deg` }} />
                        ))}
                    </div>
                )}
            </div>

            {/* Résultat détaillé */}
            {showResult && (
                <div className="dice-result-panel" style={{ '--result-color': getResultColor() }}>
                    {action && (
                        <div className="dice-result-action">
                            <span className="action-icon">⚔️</span>
                            {action}
                        </div>
                    )}

                    <div className="dice-result-breakdown">
                        <div className="result-line">
                            <span className="result-label">Dé :</span>
                            <span className="result-value">{diceType.toUpperCase()} ({result})</span>
                        </div>

                        {modifier !== 0 && (
                            <div className="result-line">
                                <span className="result-label">Modificateur :</span>
                                <span className={`result-value ${modifier > 0 ? 'positive' : 'negative'}`}>
                                    {modifier > 0 ? '+' : ''}{modifier}
                                </span>
                            </div>
                        )}

                        <div className="result-line total-line">
                            <span className="result-label">Total :</span>
                            <span className="result-value-total">{total}</span>
                            {target !== null && (
                                <span className="result-target">(Cible : {target})</span>
                            )}
                        </div>
                    </div>

                    {target !== null && (
                        <div className={`dice-result-verdict ${success ? 'success' : 'failure'}`}>
                            {success ? (
                                <>
                                    <span className="verdict-icon">✅</span>
                                    <span className="verdict-text">SUCCÈS !</span>
                                </>
                            ) : (
                                <>
                                    <span className="verdict-icon">❌</span>
                                    <span className="verdict-text">ÉCHEC</span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Composant compact pour petits lancers dans le chat
export function DiceMini({ diceType = 'd20', result }) {
    return (
        <span className="dice-mini">
            <span className="dice-mini-icon">🎲</span>
            <span className="dice-mini-type">{diceType}</span>
            <span className="dice-mini-result">{result}</span>
        </span>
    );
}
