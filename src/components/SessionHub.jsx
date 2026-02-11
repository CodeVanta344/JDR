import React from 'react';

export function SessionHub({ players, character, session, onToggleReady, onStart, loading, onLeave }) {
    const isHost = session?.host_id === character?.user_id;
    const allReady = players.length >= 2 && players.every(p => p.is_ready);
    const playerCount = players.length;

    return (
        <div className="creation-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="hub-panel stone-panel ornate-border" style={{
                maxWidth: '900px',
                width: '95%',
                padding: '3rem',
                background: 'rgba(10, 10, 15, 0.95)',
                boxShadow: '0 0 50px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.1)',
                animation: 'fadeIn 0.8s ease-out'
            }}>
                <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="category-tag" style={{ color: 'var(--gold-primary)', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '0.5rem' }}>HUB DE SESSION</div>
                    <h2 className="text-gold" style={{ fontSize: '2.5rem', letterSpacing: '5px', marginBottom: '1rem' }}>RASSEMBLEMENT</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>CODE DE SESSION</span>
                            <span style={{ fontSize: '1.2rem', color: 'var(--gold-light)', fontFamily: 'monospace' }}>{session?.id?.slice(0, 8).toUpperCase()}</span>
                        </div>
                        <div style={{ width: '1px', height: '30px', background: 'rgba(212, 175, 55, 0.2)' }}></div>
                        <div style={{ textAlign: 'left' }}>
                            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>AVENTURIERS</span>
                            <span style={{ fontSize: '1.2rem', color: playerCount >= 2 ? '#4dff88' : '#ff6b6b' }}>{playerCount} / 2 minimum</span>
                        </div>
                    </div>
                </header>

                <main style={{ marginBottom: '3rem' }}>
                    <div className="player-list" style={{ display: 'grid', gap: '1rem' }}>
                        {players.map(p => (
                            <div key={p.id} className="stone-panel" style={{
                                padding: '1rem 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: p.user_id === character?.user_id ? 'rgba(212, 175, 55, 0.05)' : 'rgba(255,255,255,0.02)',
                                border: p.user_id === character?.user_id ? '1px solid var(--gold-dim)' : '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '4px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'var(--void-panel)',
                                        border: '1px solid var(--gold-dim)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem'
                                    }}>
                                        👤
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.1rem', color: '#fff' }}>
                                            {p.name} {p.user_id === session?.host_id && <span style={{ color: 'var(--gold-primary)', fontSize: '0.7rem', verticalAlign: 'middle', marginLeft: '0.5rem' }}>(MAITRE)</span>}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            {p.user_id === character?.user_id ? 'VOUS' : 'COMPAGNON'}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {p.is_ready ? (
                                        <span style={{ color: '#4dff88', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>PRÊT</span>
                                    ) : (
                                        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', letterSpacing: '1px' }}>EN ATTENTE</span>
                                    )}
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: p.is_ready ? '#4dff88' : 'transparent',
                                        border: `2px solid ${p.is_ready ? '#4dff88' : 'rgba(255,255,255,0.2)'}`,
                                        boxShadow: p.is_ready ? '0 0 10px #4dff88' : 'none'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                <footer style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(212, 175, 55, 0.1)'
                }}>
                    <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
                        <button className="btn-medieval" onClick={onLeave} style={{ width: '180px' }}>QUITTER</button>

                        <button
                            className={`btn-medieval ${character?.is_ready ? 'active' : ''}`}
                            onClick={onToggleReady}
                            style={{
                                width: '180px',
                                background: character?.is_ready ? 'rgba(77, 255, 136, 0.1)' : 'transparent',
                                border: `1px solid ${character?.is_ready ? '#4dff88' : 'var(--gold-dim)'}`,
                                color: character?.is_ready ? '#4dff88' : 'var(--gold-primary)'
                            }}
                        >
                            {character?.is_ready ? 'PRÊT ✓' : 'SE PRÉPARER'}
                        </button>
                    </div>

                    <div style={{ textAlign: 'center', width: '100%', marginTop: '1rem' }}>
                        {allReady ? (
                            <div style={{ padding: '1.5rem', animation: 'fadeIn 0.5s ease-out' }}>
                                <div className="btn-gold" style={{
                                    padding: '1.2rem 4rem',
                                    fontSize: '1.3rem',
                                    letterSpacing: '4px',
                                    boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
                                    cursor: 'default',
                                    display: 'inline-block'
                                }}>
                                    {loading ? 'LANCEMENT...' : '✨ LANCEMENT EN COURS...'}
                                </div>
                            </div>
                        ) : (
                            <p style={{ fontSize: '0.85rem', color: '#ff6b6b', marginTop: '0.8rem', opacity: 0.8 }}>
                                {playerCount < 2 ? "Il manque des aventuriers pour commencer." : "Tous les joueurs doivent être prêts."}
                            </p>
                        )}
                    </div>
                </footer>
            </div>

            {/* Background Atmosphere */}
            <div className="bg-animation" style={{
                position: 'fixed',
                inset: 0,
                backgroundImage: 'url("https://w0.peakpx.com/wallpaper/243/662/HD-wallpaper-dark-fantasy-castle-dark-fantasy-landscape-mystical.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.15,
                filter: 'grayscale(0.6) brightness(0.3)',
                zIndex: -1
            }}></div>
        </div>
    );
}
