import React from 'react';

export const LootModal = ({ loot, onCollect, onClose }) => {
    const items = Array.isArray(loot) ? loot : (loot?.items || []);
    const gold = Array.isArray(loot) ? 0 : (loot?.gold || 0);

    if (!loot || (items.length === 0 && gold === 0)) return null;

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
                    {gold > 0 && (
                        <div style={{
                            padding: '1rem',
                            background: 'rgba(255,215,0,0.1)',
                            border: '1px solid var(--gold-primary)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>💰</span>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--gold-primary)' }}>{gold} Pièces d'or</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Une bourse bien remplie.</div>
                            </div>
                        </div>
                    )}
                    {items.map((item, i) => (
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
                    <button className="btn-gold" style={{ flex: 1 }} onClick={() => onCollect(items, gold)}>TOUT RÉCUPÉRER</button>
                    <button className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>LAISSER</button>
                </div>
            </div>
        </div>
    );
};
