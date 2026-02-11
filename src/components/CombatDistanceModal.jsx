import React from 'react';

export const CombatDistanceModal = ({ pendingCombat, onJoin, onIgnore }) => {
    if (!pendingCombat) return null;

    return (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.9)', zIndex: 11000 }}>
            <div className="glass-panel" style={{ maxWidth: '400px', textAlign: 'center', padding: '2rem' }}>
                <h2 style={{ color: 'var(--gold-primary)', fontFamily: 'var(--font-display)' }}>⚔️ UN COMBAT A ÉCLATÉ !</h2>

                {pendingCombat.imposedDistance ? (
                    <>
                        <p style={{ margin: '1rem 0', color: '#ccc' }}>
                            {pendingCombat.reason || "Vous entendez le tumulte de la bataille..."}
                        </p>
                        <div style={{
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.05)',
                            marginBottom: '1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--gold-dim)'
                        }}>
                            DISTANCE : <strong style={{ color: 'var(--gold-primary)' }}>{pendingCombat.imposedDistance.toUpperCase()}</strong>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button className="btn-action" onClick={() => onJoin(pendingCombat.imposedDistance)}>
                                REJOINDRE LE COMBAT
                            </button>
                            <button className="btn-gold" style={{ marginTop: '0.5rem', border: '1px solid #ff4444', color: '#ff4444' }} onClick={onIgnore}>
                                IGNORER ET FUIR
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p style={{ margin: '1rem 0', color: '#ccc' }}>
                            Le Maître du Jeu ne peut déterminer votre position. À quelle distance êtes-vous ?
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button className="btn-action" onClick={() => onJoin('close')}>PROCHE (1 tour)</button>
                            <button className="btn-action" onClick={() => onJoin('medium')}>À DISTANCE (3 tours)</button>
                            <button className="btn-action" onClick={() => onJoin('far')}>LOIN (5 tours)</button>
                            <button className="btn-gold" style={{ marginTop: '1rem', border: '1px solid #ff4444', color: '#ff4444' }} onClick={onIgnore}>IGNORER</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
