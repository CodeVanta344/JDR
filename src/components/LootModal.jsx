import React from 'react';

export const LootModal = ({ loot, onCollect, onClose }) => {
    if (!loot || loot.length === 0) return null;

    return (
        <div className="modal-overlay animate-fade-in" style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '500px',
                padding: '2rem',
                border: '1px solid var(--aether-blue)',
                boxShadow: '0 0 40px rgba(0, 112, 221, 0.2)',
                textAlign: 'center'
            }}>
                <h2 style={{ color: 'var(--aether-blue)', marginBottom: '1.5rem' }}>BUTIN TROUVÉ !</h2>
                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                    {loot.map((item, i) => (
                        <div key={i} style={{
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '4px',
                            textAlign: 'left'
                        }}>
                            <div style={{ fontWeight: 'bold', color: '#fff' }}>{item.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
                            {item.stats && (
                                <div style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', marginTop: '0.3rem' }}>
                                    {Object.entries(item.stats).map(([k, v]) => `${k.toUpperCase()} +${v}`).join(' ')}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-gold" style={{ flex: 1 }} onClick={() => onCollect(loot)}>TOUT RÉCUPÉRER</button>
                    <button className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>LAISSER</button>
                </div>
            </div>
        </div>
    );
};
