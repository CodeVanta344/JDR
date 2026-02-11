import React, { useState } from 'react';

export function SessionLobby({ onJoin, onCreate, availableSessions = [], loading }) {
    const [sessionId, setSessionId] = useState('');

    return (
        <div className="creation-overlay">
            <div className="lobby-content" style={{ maxWidth: '1200px', width: '90%', textAlign: 'center', zIndex: 10, animation: 'fadeIn 1s ease' }}>
                <header style={{ marginBottom: '4rem' }}>
                    <div className="brand-badge" style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', letterSpacing: '4px', marginBottom: '1rem', opacity: 0.6 }}>TALES FROM THE VOID</div>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                        color: '#fff',
                        letterSpacing: 'clamp(5px, 2vw, 18px)',
                        textShadow: '0 0 60px rgba(229,192,109,0.3)',
                        marginBottom: '0.5rem',
                        fontFamily: 'var(--font-display)'
                    }}>
                        AETHELGARD
                    </h1>
                    <div style={{ width: '150px', height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-primary), transparent)', margin: '1.5rem auto' }}></div>
                    <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', letterSpacing: '4px', fontSize: '1rem', opacity: 0.8 }}>Le Serment de l'Aube Éclatée</p>
                </header>

                <main style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap', width: '100%' }}>
                        <div className="glass-panel hover-glow" style={{
                            flex: '1 1 350px',
                            padding: '3rem',
                            maxWidth: '450px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            background: 'rgba(255,215,0,0.02)',
                            border: '1px solid rgba(255,215,0,0.1)',
                            transition: 'all 0.3s'
                        }}>
                            <h2 className="text-gold" style={{ marginBottom: '1rem', fontSize: '1.6rem', letterSpacing: '2px' }}>FORGER UNE SAGA</h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                                Prenez les rênes du destin. En tant que Maître de l'Histoire, vous façonnez le monde, les monstres et les miracles.
                            </p>
                            <button
                                className="btn-gold"
                                style={{ width: '100%', padding: '1.2rem', marginTop: 'auto', background: 'var(--gradient-gold)', color: '#000', fontWeight: 'bold', fontSize: '1rem', letterSpacing: '1px' }}
                                onClick={onCreate}
                                disabled={loading}
                            >
                                {loading ? 'INITIALISATION...' : 'CRÉER UNE SESSION'}
                            </button>
                        </div>

                        <div className="glass-panel" style={{
                            flex: '1 1 350px',
                            padding: '3rem',
                            maxWidth: '450px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: 'rgba(255,255,255,0.01)'
                        }}>
                            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.6rem', letterSpacing: '2px' }}>REJOINDRE</h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                                Un autre Maître vous attend. Entrez les runes de session pour lier votre destin au sien.
                            </p>
                            <div style={{ width: '100%', position: 'relative', marginBottom: '1.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="CODE_SESSION"
                                    value={sessionId}
                                    onChange={(e) => setSessionId(e.target.value.trim())}
                                    className="glass-input"
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        fontSize: '1.2rem',
                                        letterSpacing: '3px',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'var(--gold-primary)',
                                        fontFamily: 'monospace'
                                    }}
                                />
                            </div>
                            <button
                                style={{
                                    width: '100%',
                                    padding: '1.2rem',
                                    background: 'transparent',
                                    border: '1px solid var(--gold-dim)',
                                    color: 'var(--gold-primary)',
                                    fontWeight: 'bold',
                                    cursor: (loading || !sessionId) ? 'not-allowed' : 'pointer',
                                    letterSpacing: '1px'
                                }}
                                onClick={() => onJoin(sessionId)}
                                disabled={loading || !sessionId.trim()}
                            >
                                {loading ? 'RECHERCHE...' : 'LÉGENDES CROISÉES'}
                            </button>
                        </div>
                    </div>

                    {availableSessions.length > 0 && (
                        <div className="discovery-section animate-slide-up" style={{ width: '100%', maxWidth: '920px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3))' }}></div>
                                <h3 className="text-gold" style={{ fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.8 }}>Sagas en Cours</h3>
                                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.3), transparent)' }}></div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {availableSessions.map(sess => (
                                    <div key={sess.id} className="stone-panel hover-glow" style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(212, 175, 55, 0.1)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem 1rem', background: 'rgba(212, 175, 55, 0.1)', fontSize: '0.6rem', color: 'var(--gold-light)', letterSpacing: '1px' }}>
                                            EN ATTENTE
                                        </div>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '0.2rem' }}>MAÎTRE DE JEU</span>
                                            <span style={{ fontSize: '1.2rem', color: '#fff', fontWeight: '500' }}>{sess.host_name}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>RÉGION</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--gold-dim)' }}>Arkhélia</span>
                                            </div>
                                            <button
                                                className="btn-medieval"
                                                onClick={() => onJoin(sess.id)}
                                                style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
                                            >
                                                REJOINDRE
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                <footer style={{ marginTop: '5rem', opacity: 0.4, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    &copy; 2026 AETHELGARD ENGINE • STABLE RELEASE 1.2
                </footer>
            </div>
            {/* Immersive effects */}
            <div className="bg-animation" style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("https://w0.peakpx.com/wallpaper/243/662/HD-wallpaper-dark-fantasy-castle-dark-fantasy-landscape-mystical.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.2,
                filter: 'grayscale(0.6) brightness(0.5)'
            }}></div>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }}></div>
            <div className="fog-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: 2 }}></div>
        </div>
    );
}
