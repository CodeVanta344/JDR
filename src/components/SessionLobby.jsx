import React, { useState } from 'react';
import { useAppVersion } from '../hooks/useAppVersion';
import { DeveloperPanel } from './DeveloperPanel';
import { confirmDelete } from './GameModals';

export function SessionLobby({ onJoin, onCreate, onQuickStart, onSoloAdventure, onSoloCustom, onJoinQuickStart, availableSessions = [], loading, savedGames = [], onLoadGame, onDeleteSession, onDeleteSave, profile, onOpenDMPanel, onOpenCodex }) {
    const [sessionId, setSessionId] = useState('');
    const [showSoloChoice, setShowSoloChoice] = useState(false);
    const [showDeveloperPanel, setShowDeveloperPanel] = useState(false);
    const { version } = useAppVersion();

    return (
        <div className="creation-overlay">
            {/* BACKGROUND EFFECTS TEMPORARILY REMOVED FOR SCROLL DEBUG */}
            {/*
            <div className="bg-animation" style={{
                position: 'fixed',
                inset: 0,
                backgroundImage: 'url("/aethelgard_map_menu.jpg")',
                backgroundSize: '80% auto',
                backgroundPosition: 'center',
                opacity: 0.5,
                filter: 'brightness(0.6) saturate(1.2)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>
            <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)', zIndex: 2, pointerEvents: 'none' }}></div>
            <div className="fog-overlay" style={{ position: 'fixed', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: 3, pointerEvents: 'none' }}></div>
            */}

            {/* Developer Access Button - Hidden in corner */}
            <button
                onClick={() => setShowDeveloperPanel(true)}
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    left: '10px',
                    zIndex: 99,
                    padding: '8px 12px',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    borderRadius: '4px',
                    color: 'rgba(212,175,55,0.6)',
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    opacity: 0.5,
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '1'}
                onMouseLeave={(e) => e.target.style.opacity = '0.5'}
            >
                🛠️ Dev
            </button>

            {/* Developer Panel Modal */}
            {showDeveloperPanel && (
                <DeveloperPanel onClose={() => setShowDeveloperPanel(false)} />
            )}

            {/* Version Badge - Top Right */}
            <div style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                zIndex: 100,
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid var(--gold-dim)',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '0.7rem',
                color: 'var(--gold-primary)',
                fontFamily: 'monospace',
                letterSpacing: '1px'
            }}>
                v{version}
            </div>

            <div className="lobby-content" style={{ maxWidth: '1200px', width: '90%', textAlign: 'center', zIndex: 10, animation: 'fadeIn 1s ease', position: 'relative', height: 'auto', padding: '2rem 0 10rem 0' }}>
                <header style={{ marginBottom: '4rem' }}>
                    <div className="brand-badge" style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', letterSpacing: '4px', marginBottom: '1rem', opacity: 0.6 }}>TALES FROM THE VOID</div>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                        color: '#fff',
                        letterSpacing: 'clamp(5px, 2vw, 18px)',
                        textShadow: '0 0 60px rgba(229,192,109,0.3)',
                        marginBottom: '0.1rem',
                        fontFamily: 'var(--font-display)',
                        position: 'relative',
                        display: 'inline-block'
                    }}>
                        AETHELGARD
                        <span style={{
                            position: 'absolute',
                            top: '10%',
                            right: '-40px',
                            fontSize: '0.8rem',
                            padding: '2px 8px',
                            background: 'var(--gold-primary)',
                            color: '#000',
                            borderRadius: '4px',
                            letterSpacing: '2px',
                            fontWeight: 'bold',
                            transform: 'rotate(15deg)',
                            boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
                        }}>ALPHA</span>
                    </h1>
                    <div style={{ width: '150px', height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-primary), transparent)', margin: '1rem auto' }}></div>
                    <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', letterSpacing: '4px', fontSize: '1rem', opacity: 0.8 }}>Le Serment de l'Aube Éclatée</p>
                </header>

                <main style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center', paddingBottom: '8rem', width: '100%' }}>
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

                            <button
                                className="btn-medieval"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    marginTop: '1.5rem',
                                    background: 'rgba(100, 150, 255, 0.1)',
                                    border: '1px solid rgba(100, 150, 255, 0.3)',
                                    color: '#88aaff',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    letterSpacing: '2px',
                                    boxShadow: '0 0 15px rgba(100, 150, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                                onClick={() => setShowSoloChoice(true)}
                                disabled={loading}
                            >
                                🔮 {loading ? '...' : 'AVENTURE SOLO (TEST)'}
                            </button>

                            <button
                                className="btn-medieval"
                                style={{
                                    width: '100%',
                                    padding: '0.6rem',
                                    marginTop: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.75rem',
                                    letterSpacing: '2px',
                                    opacity: 0.7
                                }}
                                onClick={onQuickStart}
                                disabled={loading}
                            >
                                ⚡ {loading ? '...' : 'DEBUG: QUICK START'}
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
                                className="btn-medieval"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    marginTop: '1rem',
                                    background: 'rgba(212, 175, 55, 0.1)',
                                    border: '1px solid rgba(212, 175, 55, 0.3)',
                                    color: 'var(--gold-primary)',
                                    fontSize: '0.8rem',
                                    letterSpacing: '2px'
                                }}
                                onClick={() => onJoinQuickStart(sessionId)}
                                disabled={loading || !sessionId.trim()}
                            >
                                {loading ? '...' : 'DEBUG: QUICK JOIN'}
                            </button>

                            <button
                                className="btn-medieval"
                                onClick={() => onJoin(sessionId)}
                                style={{ width: '100%', marginTop: '1rem' }}
                                disabled={loading || !sessionId.trim()}
                            >
                                {loading ? '...' : 'LÉGENDES CROISÉES'}
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

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', padding: '1rem' }}>
                                {availableSessions.map(sess => (
                                    <div key={sess.id} className="stone-panel hover-glow" style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(212, 175, 55, 0.1)',
                                        position: 'relative',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minHeight: '200px'
                                    }}>
                                        <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.4rem 0.8rem', background: 'rgba(212, 175, 55, 0.15)', fontSize: '0.6rem', color: 'var(--gold-light)', letterSpacing: '1px', borderBottomLeftRadius: '8px', fontWeight: 'bold' }}>
                                            EN ATTENTE
                                        </div>
                                        <div style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
                                            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '0.4rem' }}>MAÎTRE DE JEU</span>
                                            <span style={{ fontSize: '1.4rem', color: '#fff', fontWeight: '600', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{sess.host_name}</span>
                                        </div>

                                        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ marginBottom: '1rem' }}>
                                                <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>RÉGION</span>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--gold-dim)' }}>Arkhélia - Val Doré</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                                <button
                                                    className="btn-medieval"
                                                    onClick={() => onJoinQuickStart(sess.id)}
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.7rem',
                                                        fontSize: '0.75rem',
                                                        background: 'rgba(212, 175, 55, 0.1)',
                                                        border: '1px solid rgba(212, 175, 55, 0.3)',
                                                        color: 'var(--gold-primary)',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    QUICK JOIN
                                                </button>
                                                <button
                                                    className="btn-medieval"
                                                    onClick={() => onJoin(sess.id)}
                                                    style={{
                                                        flex: 2,
                                                        padding: '0.7rem',
                                                        fontSize: '0.8rem',
                                                        background: 'var(--gradient-gold)',
                                                        color: '#000',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    REJOINDRE
                                                </button>
                                                {onDeleteSession && sess.host_id === profile?.id && (
                                                    <button
                                                        className="btn-medieval"
                                                        onClick={() => {
                                                            confirmDelete(
                                                                'Supprimer cette session ? Cette action est irréversible.',
                                                                () => onDeleteSession(sess.id)
                                                            );
                                                        }}
                                                        style={{
                                                            padding: '0.7rem',
                                                            fontSize: '0.7rem',
                                                            background: 'rgba(255, 68, 68, 0.2)',
                                                            border: '1px solid #ff4444',
                                                            color: '#ff6666'
                                                        }}
                                                        title="Supprimer la session"
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Saved Games Section */}
                    {savedGames.length > 0 && (
                        <div className="discovery-section animate-slide-up" style={{ width: '100%', maxWidth: '1000px', marginBottom: '4rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(77, 255, 136, 0.3))' }}></div>
                                <h3 className="text-gold" style={{ fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.8, color: '#4dff88' }}>💾 PARTIES SAUVEGARDÉES</h3>
                                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(77, 255, 136, 0.3), transparent)' }}></div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', padding: '1rem' }}>
                                {savedGames.map(save => (
                                    <div key={save.id} className="stone-panel hover-glow" style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        background: 'rgba(77, 255, 136, 0.02)',
                                        border: '1px solid rgba(77, 255, 136, 0.2)',
                                        position: 'relative',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minHeight: '220px',
                                        height: 'auto'
                                    }}>
                                        <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.4rem 0.8rem', background: 'rgba(77, 255, 136, 0.15)', fontSize: '0.6rem', color: '#4dff88', letterSpacing: '1px', borderBottomLeftRadius: '8px', fontWeight: 'bold' }}>
                                            SAUVEGARDE
                                        </div>
                                        <div style={{ marginBottom: '1.5rem', marginTop: '0.5rem', overflow: 'hidden' }}>
                                            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '0.4rem' }}>MAÎTRE DE JEU</span>
                                            <span style={{ fontSize: '1.4rem', color: '#fff', fontWeight: '600', textShadow: '0 2px 10px rgba(0,0,0,0.5)', wordBreak: 'break-word', lineHeight: '1.2', display: 'block', maxHeight: '3.4rem', overflow: 'hidden' }}>{save.host_name}</span>
                                        </div>

                                        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ marginBottom: '1rem' }}>
                                                <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>DATE</span>
                                                <span style={{ fontSize: '0.9rem', color: '#4dff88' }}>
                                                    {new Date(save.timestamp).toLocaleString('fr-FR', { 
                                                        day: '2-digit', 
                                                        month: '2-digit', 
                                                        year: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                                <button
                                                    className="btn-medieval"
                                                    onClick={() => onLoadGame(save.sessionId)}
                                                    disabled={loading}
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.7rem',
                                                        fontSize: '0.8rem',
                                                        background: 'rgba(77, 255, 136, 0.2)',
                                                        border: '1px solid #4dff88',
                                                        color: '#4dff88',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {loading ? '...' : 'CHARGER'}
                                                </button>
                                                {onDeleteSave && (
                                                    // Check hostId (newer saves) or fall back to first player user_id (older saves)
                                                    save.saveData?.hostId === profile?.id || 
                                                    save.saveData?.players?.[0]?.user_id === profile?.id
                                                ) && (
                                                    <button
                                                        className="btn-medieval"
                                                        onClick={() => {
                                                            confirmDelete(
                                                                'Supprimer cette sauvegarde ? Cette action est irréversible.',
                                                                () => onDeleteSave(save.id)
                                                            );
                                                        }}
                                                        disabled={loading}
                                                        style={{
                                                            padding: '0.7rem',
                                                            fontSize: '0.8rem',
                                                            background: 'rgba(255, 68, 68, 0.2)',
                                                            border: '1px solid #ff4444',
                                                            color: '#ff4444',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                {/* Section JDR Papier / Outils MJ */}
                {(onOpenDMPanel || onOpenCodex) && (
                    <section style={{
                        marginTop: '3rem',
                        width: '100%',
                        maxWidth: '900px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: '1rem', marginBottom: '1.5rem'
                        }}>
                            <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(147, 112, 219, 0.3))' }} />
                            <span style={{ fontSize: '0.7rem', letterSpacing: '3px', color: 'rgba(147, 112, 219, 0.6)', fontWeight: 'bold' }}>
                                VERSION PAPIER & OUTILS MJ
                            </span>
                            <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(90deg, rgba(147, 112, 219, 0.3), transparent)' }} />
                        </div>

                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                            Outils pour jouer Aethelgard autour d'une table avec des dés et du papier.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {onOpenDMPanel && (
                                <button
                                    className="btn-medieval"
                                    style={{
                                        padding: '0.8rem 2rem',
                                        background: 'rgba(212, 175, 55, 0.08)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
                                        color: '#d4af37',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        letterSpacing: '2px',
                                        borderRadius: '6px'
                                    }}
                                    onClick={onOpenDMPanel}
                                >
                                    🎭 LIVRE DU MJ
                                </button>
                            )}

                            {onOpenCodex && (
                                <button
                                    className="btn-medieval"
                                    style={{
                                        padding: '0.8rem 2rem',
                                        background: 'rgba(147, 112, 219, 0.08)',
                                        border: '1px solid rgba(147, 112, 219, 0.3)',
                                        color: '#9370db',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        letterSpacing: '2px',
                                        borderRadius: '6px'
                                    }}
                                    onClick={onOpenCodex}
                                >
                                    📖 CODEX D'AETHELGARD
                                </button>
                            )}
                        </div>
                    </section>
                )}

                <footer style={{
                    marginTop: '5rem',
                    opacity: 0.7,
                    fontSize: '0.7rem',
                    color: 'var(--gold-primary)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
                    <div style={{ marginBottom: '0.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Produceur RL • Level Designer AL</div>
                    &copy; 2026 AETHELGARD ENGINE • VERSION 0.2.0-ALPHA
                </footer>
            </div>
            {/* BACKGROUND EFFECTS REMOVED FOR SCROLL DEBUG 
            <div className="bg-animation" style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("/aethelgard_map_menu.jpg")',
                backgroundSize: '80% auto',
                backgroundPosition: 'center',
                opacity: 0.5,
                filter: 'brightness(0.6) saturate(1.2)',
                pointerEvents: 'none'
            }}></div>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)', zIndex: 1, pointerEvents: 'none' }}></div>
            <div className="fog-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: 2, pointerEvents: 'none' }}></div>
            */}

            {/* Solo Choice Modal */}
            {showSoloChoice && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 100,
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div className="glass-panel" style={{
                        maxWidth: '500px',
                        width: '90%',
                        padding: '2.5rem',
                        textAlign: 'center',
                        border: '1px solid var(--gold-primary)',
                        boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)'
                    }}>
                        <h2 className="text-gold" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>DÉBUT DE L'AVENTURE</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                            Comment souhaitez-vous entrer dans la légende ?
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button
                                className="btn-medieval"
                                onClick={() => {
                                    setShowSoloChoice(false);
                                    onSoloCustom();
                                }}
                                style={{
                                    padding: '1.2rem',
                                    fontSize: '1rem',
                                    background: 'var(--gradient-gold)',
                                    color: '#000',
                                    fontWeight: 'bold'
                                }}
                            >
                                ✨ CRÉER MON PERSONNAGE
                            </button>

                            <button
                                className="btn-medieval"
                                onClick={() => {
                                    setShowSoloChoice(false);
                                    onSoloAdventure();
                                }}
                                style={{
                                    padding: '1rem',
                                    fontSize: '0.9rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                🎲 PERSONNAGE ALÉATOIRE (QUICK)
                            </button>

                            <button
                                onClick={() => setShowSoloChoice(false)}
                                style={{
                                    marginTop: '1rem',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    fontSize: '0.8rem'
                                }}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
