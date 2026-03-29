import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import './DiceChallengeModal.css';

/**
 * DiceChallengeModal — Dynamic d100 dice rolling interface
 * Features: animated rolling numbers, shake effect, particle burst on result,
 * progressive die scaling by level, stat modifier calculation
 */
export const DiceChallengeModal = ({
    challenge,
    playerStats,
    onResult,
    onClose,
    onRollStart
}) => {
    const [phase, setPhase] = useState('ready'); // ready | rolling | result
    const [rollValue, setRollValue] = useState(0);
    const [displayValue, setDisplayValue] = useState('?');
    const [totalNatural, setTotalNatural] = useState(0);
    const [modifier, setModifier] = useState(0);
    const rollIntervalRef = useRef(null);
    const rollCountRef = useRef(0);

    // Progressive Dice Logic based on character level
    const charLevel = playerStats?.level || 1;
    const { dieType, dieMax, multiplier, critSuccessThreshold, critFailThreshold } = useMemo(() => {
        if (charLevel <= 5) return { dieType: 'd20', dieMax: 20, multiplier: 5, critSuccessThreshold: 20, critFailThreshold: 1 };
        if (charLevel <= 10) return { dieType: 'd50', dieMax: 50, multiplier: 2, critSuccessThreshold: 48, critFailThreshold: 3 };
        if (charLevel <= 15) return { dieType: 'd75', dieMax: 75, multiplier: 1.33, critSuccessThreshold: 73, critFailThreshold: 3 };
        return { dieType: 'd100', dieMax: 100, multiplier: 1, critSuccessThreshold: 95, critFailThreshold: 5 };
    }, [charLevel]);

    const { stat, label, dc = 50 } = challenge;

    // Calculate modifier from player stats
    useEffect(() => {
        if (playerStats && stat) {
            setModifier(playerStats[stat.toLowerCase()] || 10);
        }
    }, [playerStats, stat]);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => { if (rollIntervalRef.current) clearInterval(rollIntervalRef.current); };
    }, []);

    const getOutcome = useCallback((natValue, total) => {
        if (natValue >= critSuccessThreshold) return { status: 'CRITICAL_SUCCESS', label: 'REUSSITE CRITIQUE !', color: '#ffd700', cssClass: 'dcm-crit-success' };
        if (natValue <= critFailThreshold) return { status: 'CRITICAL_FAILURE', label: 'ECHEC CRITIQUE...', color: '#ff4444', cssClass: 'dcm-crit-failure' };
        if (total >= dc) return { status: 'SUCCESS', label: 'SUCCES !', color: '#4caf50', cssClass: 'dcm-success' };
        return { status: 'FAILURE', label: 'ECHEC', color: '#ff8800', cssClass: 'dcm-failure' };
    }, [critSuccessThreshold, critFailThreshold, dc]);

    const handleRoll = () => {
        if (phase !== 'ready') return;
        setPhase('rolling');
        if (onRollStart) onRollStart();

        // Determine final value
        const finalValue = Math.floor(Math.random() * dieMax) + 1;
        rollCountRef.current = 0;

        // Animate: rapidly cycle random numbers, slowing down over ~2s
        const totalFrames = 30;
        let frame = 0;

        const animate = () => {
            frame++;
            rollCountRef.current = frame;

            if (frame < totalFrames) {
                // Show random numbers, slowing down
                const randomVal = Math.floor(Math.random() * dieMax) + 1;
                setDisplayValue(randomVal);

                // Speed decreases: starts at 40ms, ends at 200ms
                const delay = 40 + (frame / totalFrames) * 160;
                rollIntervalRef.current = setTimeout(animate, delay);
            } else {
                // Final value — reveal
                setDisplayValue(finalValue);
                setRollValue(finalValue);
                const natConverted = Math.round(finalValue * multiplier);
                setTotalNatural(natConverted);

                // Short pause then show outcome
                setTimeout(() => setPhase('result'), 600);
            }
        };

        animate();
    };

    const confirmResult = () => {
        const natConverted = Math.round(rollValue * multiplier);
        const total = natConverted + modifier;
        const outcome = getOutcome(rollValue, total);

        onResult({
            natural: rollValue,
            naturalConverted: natConverted,
            modifier,
            total,
            outcome: outcome.status,
            dice: dieType,
            dc,
            stat,
            rolls: [{ type: dieType, value: rollValue }]
        });
    };

    const total = totalNatural + modifier;
    const outcome = phase === 'result' ? getOutcome(rollValue, total) : null;
    const fillPercent = phase === 'result' ? Math.min((total / dc) * 100, 100) : 0;

    return (
        <div className="dice-challenge-overlay" role="dialog" aria-modal="true">
            {/* Floating particles */}
            <div className="dcm-particles">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="dcm-particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        animationDuration: `${4 + Math.random() * 6}s`
                    }} />
                ))}
            </div>

            <div className="dcm-container">
                {/* Header */}
                <div className="dcm-header">
                    <div className="dcm-stat-label">Test de {stat?.toUpperCase() || 'competence'}</div>
                    <h2 className="dcm-title">{label || 'Jet de competence'}</h2>
                    {challenge.description && (
                        <div className="dcm-label">{challenge.description}</div>
                    )}
                </div>

                {/* Info bar */}
                <div className="dcm-info-bar">
                    <div className="dcm-info-item">
                        <span className="dcm-info-label">Objectif</span>
                        <span className="dcm-info-value dcm-dc">{dc}</span>
                    </div>
                    <div className="dcm-info-item">
                        <span className="dcm-info-label">De</span>
                        <span className="dcm-info-value">{dieType.toUpperCase()}</span>
                    </div>
                    <div className="dcm-info-item">
                        <span className="dcm-info-label">Modificateur</span>
                        <span className="dcm-info-value dcm-mod">{modifier >= 0 ? '+' : ''}{modifier}</span>
                    </div>
                    <div className="dcm-info-item">
                        <span className="dcm-info-label">Total vise</span>
                        <span className="dcm-info-value" style={{ color: '#fff' }}>{dc}</span>
                    </div>
                </div>

                {/* Dice area */}
                <div className="dcm-dice-area">
                    <div className={`dcm-die ${phase === 'rolling' ? 'dcm-die-rolling' : ''} ${phase === 'result' ? `dcm-die-done ${outcome?.cssClass}` : ''}`}
                         onClick={phase === 'ready' ? handleRoll : undefined}>
                        <div className="dcm-die-face">
                            {phase === 'ready' ? '?' : displayValue}
                        </div>
                        <div className="dcm-die-type">{dieType.toUpperCase()}</div>
                    </div>
                </div>

                {/* Roll button */}
                {phase === 'ready' && (
                    <button className="dcm-roll-btn" onClick={handleRoll}>
                        LANCER LE DE
                    </button>
                )}

                {/* Rolling indicator */}
                {phase === 'rolling' && (
                    <div style={{ color: 'rgba(212,175,55,0.6)', fontSize: '0.85rem', letterSpacing: '2px', animation: 'dcm-fadeIn 0.3s' }}>
                        Le destin decide...
                    </div>
                )}

                {/* Outcome */}
                {phase === 'result' && outcome && (
                    <div className="dcm-outcome">
                        <h1 className="dcm-outcome-title" style={{
                            color: outcome.color,
                            textShadow: `0 0 40px ${outcome.color}40`
                        }}>
                            {outcome.label}
                        </h1>

                        <div className="dcm-outcome-calc">
                            <span style={{ color: '#d4af37' }}>{rollValue}</span>
                            {multiplier !== 1 && <span style={{ color: '#888' }}> x {multiplier}</span>}
                            <span style={{ color: '#888' }}> + </span>
                            <span style={{ color: '#8ecae6' }}>{modifier}</span>
                            <span style={{ color: '#888' }}> = </span>
                            <span style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}>{total}</span>
                            <span style={{ color: '#888' }}> / {dc}</span>
                        </div>

                        {/* Progress bar */}
                        <div className="dcm-outcome-bar">
                            <div className="dcm-outcome-fill" style={{
                                width: `${fillPercent}%`,
                                background: outcome.color
                            }} />
                        </div>

                        <div className="dcm-outcome-detail">
                            {dieType !== 'd100' && `${dieType.toUpperCase()} (${rollValue}) converti en d100 : ${totalNatural}`}
                            {dieType === 'd100' && `Jet naturel : ${rollValue}`}
                        </div>

                        <button className="dcm-continue-btn" onClick={confirmResult}>
                            CONTINUER LE RECIT
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
