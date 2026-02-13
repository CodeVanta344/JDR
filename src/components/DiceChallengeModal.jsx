import React, { useState } from 'react';
import { DieVisual } from './DieVisual';

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
    } = React.useMemo(() => {
        if (charLevel <= 5) return { dieType: 'd20', multiplier: 5, critSuccessThreshold: 20, critFailThreshold: 1 };
        if (charLevel <= 10) return { dieType: 'd50', multiplier: 2, critSuccessThreshold: 48, critFailThreshold: 3 };
        if (charLevel <= 15) return { dieType: 'd75', multiplier: 1.33, critSuccessThreshold: 73, critFailThreshold: 3 };
        return { dieType: 'd100', multiplier: 1, critSuccessThreshold: 95, critFailThreshold: 5 };
    }, [charLevel]);

    const { stat, label, dc = 50 } = challenge;

    // Calculate modifier from player stats
    React.useEffect(() => {
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
            natural: totalNatural,
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
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'fadeIn 0.3s ease'
        }}>
            <div className="glass-panel" style={{
                width: 'min(90vw, 600px)',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid var(--gold-primary)',
                boxShadow: '0 0 50px rgba(229, 192, 109, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh'
            }}>
                <h2 style={{ color: 'var(--gold-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', letterSpacing: '2px' }}>
                    DÉFI DE {stat?.toUpperCase() || 'COMPÉTENCE'}
                </h2>
                <p style={{ color: 'var(--aether-blue)', fontStyle: 'italic', marginBottom: '2rem' }}>
                    "{label}"
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    <div style={{ color: 'var(--gold-light)' }}>
                        Cible : <span style={{ color: '#fff', fontWeight: 'bold' }}>{dc}</span>
                    </div>
                    <div style={{ color: 'var(--gold-light)' }}>
                        Formule : <span style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>{dice.toUpperCase()}</span>
                    </div>
                    <div style={{ color: 'var(--gold-light)' }}>
                        Modificateur : <span style={{ color: '#fff', fontWeight: 'bold' }}>{modifier >= 0 ? '+' : ''}{modifier}</span>
                    </div>
                </div>

                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    minHeight: '200px'
                }}>
                    {!isRolling && !rolled ? (
                        <button
                            onClick={handleRoll}
                            className="btn-action"
                            style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
                        >
                            LANCER LES DÉS
                        </button>
                    ) : (
                        rolls.map((die, idx) => (
                            <DieVisual
                                key={idx}
                                type={die.type}
                                value={die.value}
                                onComplete={() => handleDieComplete(idx)}
                            />
                        ))
                    )}
                </div>

                {showOutcome && (
                    <div style={{
                        marginTop: '2rem',
                        animation: 'fadeInUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        borderTop: '1px solid rgba(229, 192, 109, 0.2)',
                        paddingTop: '1.5rem'
                    }}>
                        <h1 style={{
                            color: getOutcome().color,
                            fontFamily: 'var(--font-display)',
                            fontSize: '2.5rem',
                            textShadow: `0 0 20px ${getOutcome().color}44`,
                            margin: '0.5rem 0'
                        }}>
                            {getOutcome().label}
                        </h1>
                        <p style={{ color: '#fff', opacity: 0.8, fontSize: '1.2rem' }}>
                            {rolls.map(r => r.value).join(' + ')} {modifier !== 0 && `${modifier >= 0 ? '+' : ''}${modifier}`} = <strong>{totalNatural + modifier}</strong>
                        </p>

                        <button
                            onClick={confirmResult}
                            className="btn-primary"
                            style={{ marginTop: '1.5rem', width: '100%', padding: '1rem' }}
                        >
                            CONTINUER LE RÉCIT
                        </button>
                    </div>
                )}
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
