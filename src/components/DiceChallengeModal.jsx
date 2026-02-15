import React, { useEffect, useMemo, useState } from 'react';
import { DieVisual } from './DieVisual';
import { DiceOverlay } from './Dice3D';

/**
 * DiceChallengeModal
 * An immersive modal for resolving AI challenges with complex dice (e.g., 1d6 + 1d20).
 */
export const DiceChallengeModal = ({
    challenge,
    playerStats,
    onResult,
    onClose,
    onRollStart
}) => {
    const [rolled, setRolled] = useState(false);
    const [isRolling, setIsRolling] = useState(false);
    const [rolls, setRolls] = useState([]); // Array of { type, value, completed }
    const [totalNatural, setTotalNatural] = useState(0);
    const [modifier, setModifier] = useState(0);
    const [showOutcome, setShowOutcome] = useState(false);

    // Progressive Dice Logic based on character level
    const charLevel = playerStats?.level || 1;
    const {
        dieType,
        multiplier,
        critSuccessThreshold,
        critFailThreshold
    } = useMemo(() => {
        // Niveau 1-5 : d20 uniquement (pas de d100)
        if (charLevel <= 5) return { dieType: 'd20', multiplier: 5, critSuccessThreshold: 20, critFailThreshold: 1 };
        if (charLevel <= 10) return { dieType: 'd50', multiplier: 2, critSuccessThreshold: 48, critFailThreshold: 3 };
        if (charLevel <= 15) return { dieType: 'd75', multiplier: 1.33, critSuccessThreshold: 73, critFailThreshold: 3 };
        // Niveau 16+ seulement : d100
        return { dieType: 'd100', multiplier: 1, critSuccessThreshold: 95, critFailThreshold: 5 };
    }, [charLevel]);

    const { stat, label, dc = 50 } = challenge;

    // Calculate modifier from player stats
    useEffect(() => {
        if (playerStats && stat) {
            const val = playerStats[stat.toLowerCase()] || 10;
            // D100 Scaling: Stat * 2
            setModifier(val * 2);
        }
    }, [playerStats, stat]);

    const handleRoll = () => {
        if (rolled || isRolling) return;

        setIsRolling(true);
        if (onRollStart) onRollStart();

        setRolls([{
            type: dieType,
            value: Math.floor(Math.random() * parseInt(dieType.substring(1))) + 1,
            completed: false
        }]);
    };

    const finalizeRoll = () => {
        const natRoll = rolls[0]?.value || 0;
        const finalNatural = natRoll * multiplier;

        setTotalNatural(finalNatural);
        setIsRolling(false);
        setRolled(true);
        setShowOutcome(true);
    };

    const handleDieComplete = (index) => {
        setRolls(prev => {
            const updated = [...prev];
            updated[index].completed = true;

            const allDone = updated.every(d => d.completed);
            if (allDone) {
                const natRoll = updated[0].value;
                const finalNatural = natRoll * multiplier;

                setTimeout(() => {
                    setTotalNatural(finalNatural);
                    setIsRolling(false);
                    setRolled(true);
                    setShowOutcome(true);
                }, 400);
            }
            return updated;
        });
    };

    const getOutcome = () => {
        if (rolls.length === 0) return { status: 'UNKNOWN', label: '', color: '#fff' };

        const natValue = rolls[0].value; // The raw roll before multiplier
        const total = totalNatural + modifier;

        // Progressive Crit Logic
        if (natValue >= critSuccessThreshold) return { status: 'CRITICAL_SUCCESS', label: 'RÉUSSITE CRITIQUE !', color: '#ffd700' };
        if (natValue <= critFailThreshold) return { status: 'CRITICAL_FAILURE', label: 'ÉCHEC CRITIQUE...', color: '#ff4444' };

        if (total >= dc) return { status: 'SUCCESS', label: 'SUCCÈS !', color: '#4caf50' };
        return { status: 'FAILURE', label: 'ÉCHEC', color: '#ff8800' };
    };

    const confirmResult = () => {
        const outcome = getOutcome();
        onResult({
            natural: rolls[0]?.value || 0,
            naturalConverted: totalNatural,
            modifier,
            total: totalNatural + modifier,
            outcome: outcome.status,
            dice: dieType,
            dc,
            stat,
            rolls: rolls.map(r => ({ type: r.type, value: r.value }))
        });
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)', // Pure background dimming only
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'fadeIn 0.3s ease'
        }}>
            {/* Multi-Dice Physics Overlay */}
            {isRolling ? (
                <DiceOverlay
                    diceRolls={rolls}
                    onAllComplete={() => {
                        finalizeRoll();
                    }}
                />
            ) : null}

            <div className="dice-interface-overlay" style={{
                position: 'relative',
                width: 'min(90vw, 600px)',
                textAlign: 'center',
                zIndex: 10001,
                pointerEvents: 'none'
            }}>
                <div style={{ pointerEvents: 'auto' }}>
                    <h2 style={{
                        color: 'var(--gold-primary)',
                        marginBottom: '0.5rem',
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '3px',
                        textShadow: '0 0 20px rgba(0,0,0,0.8)'
                    }}>
                        DÉFI DE {stat?.toUpperCase() || 'COMPÉTENCE'}
                    </h2>
                    <p style={{ color: 'var(--aether-blue)', fontStyle: 'italic', marginBottom: '2rem', textShadow: '0 0 10px #000' }}>
                        "{label}"
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', fontSize: '1rem', textShadow: '0 2px 4px #000' }}>
                        <div style={{ color: 'var(--gold-light)' }}>
                            Cible : <span style={{ color: '#fff', fontWeight: 'bold' }}>{dc}</span>
                        </div>
                        <div style={{ color: 'var(--gold-light)' }}>
                            Formule : <span style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>{dieType.toUpperCase()}</span>
                        </div>
                        <div style={{ color: 'var(--gold-light)' }}>
                            Modificateur : <span style={{ color: '#fff', fontWeight: 'bold' }}>{modifier >= 0 ? '+' : ''}{modifier}</span>
                        </div>
                    </div>
                </div>

                <div style={{ minHeight: '30vh', pointerEvents: 'none' }} />

                <div style={{ pointerEvents: 'auto' }}>
                    {!isRolling && !rolled && (
                        <button
                            onClick={handleRoll}
                            className="btn-action"
                            style={{ padding: '1.2rem 4rem', fontSize: '1.4rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                        >
                            LANCER LES DÉS
                        </button>
                    )}

                    {showOutcome && (
                        <div style={{
                            animation: 'fadeInUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            paddingTop: '1.5rem'
                        }}>
                            <h1 style={{
                                color: getOutcome().color,
                                fontFamily: 'var(--font-display)',
                                fontSize: '3.5rem',
                                textShadow: `0 0 30px ${getOutcome().color}, 0 0 10px #000`,
                                margin: '0.5rem 0'
                            }}>
                                {getOutcome().label}
                            </h1>
                            <p style={{ color: '#fff', textShadow: '0 2px 10px #000', fontSize: '1.4rem', marginBottom: '1.5rem' }}>
                                Résultat ({dieType === 'd100' ? 'd100' : `${dieType.toUpperCase()} → équivalent d100`}) : <strong>{totalNatural + modifier}</strong>
                            </p>

                            <p style={{ color: '#ccc', textShadow: '0 2px 8px #000', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                                Calcul : {rolls[0]?.value || 0}{multiplier !== 1 ? ` × ${multiplier}` : ''} + {modifier} = {totalNatural + modifier}
                            </p>

                            <button
                                onClick={confirmResult}
                                className="btn-primary"
                                style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem' }}
                            >
                                CONTINUER LE RÉCIT
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};
