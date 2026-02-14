import React from 'react';

const WaitingRoom = ({ players, character, onToggleReady, onStart, loading, sessionId, profile, onInvite }) => {

    // Check if current player is host (simple check based on profile id matching session host)
    // Note: sessionHostId is passed as prop now
    // const isHost = ... 

    return (
        <div className="creation-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="stone-panel ornate-border" style={{
                maxWidth: '700px',
                width: '90%',
                padding: '3rem',
                textAlign: 'center',
                background: 'rgba(10, 10, 15, 0.85)',
                backdropFilter: 'blur(12px)',
                animation: 'fadeIn 0.8s ease-out',
                position: 'relative'
            }}>
                {/* Decoration */}
                <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', color: 'var(--gold-dim)', fontSize: '2rem' }}>✦</div>

                <div className="category-tag" style={{ color: 'var(--gold-primary)', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '1rem' }}>SALLE D'ATTENTE</div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 className="text-gold" style={{ fontSize: '2rem', letterSpacing: '4px', marginBottom: '0.5rem' }}>RASSEMBLEMENT DES HÉROS</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <span>Session: <span style={{ fontFamily: 'monospace', color: '#fff' }}>{sessionId}</span></span>
                        <button
                            className="btn-icon"
                            onClick={onInvite}
                            title="Copier le lien d'invitation"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                        >
                            🔗
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem', display: 'grid', gap: '0.5rem' }}>
                    {players.map(p => {
                        const hasClass = !!p.class;
                        const isReady = p.class && p.is_ready;
                        const isYou = p.id === character?.id;
                        return (
                            <div key={p.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.8rem 1.2rem',
                                background: isReady ? 'rgba(77, 255, 136, 0.05)' : isYou ? 'rgba(212,175,55,0.05)' : 'rgba(255, 255, 255, 0.02)',
                                border: `1px solid ${isReady ? 'rgba(77, 255, 136, 0.2)' : isYou ? 'var(--gold-dim)' : 'rgba(255,255,255,0.05)'}`,
                                borderRadius: '4px',
                                transition: 'all 0.3s'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {p.portrait_url ? (
                                        <img src={p.portrait_url} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--gold-dim)' }} />
                                    ) : (
                                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--void-panel)', border: '1px solid var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>?</div>
                                    )}
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ color: '#fff', fontSize: '1rem', fontFamily: 'Cinzel, serif' }}>
                                            {p.name} {isYou && <span style={{ color: 'var(--gold-primary)', fontSize: '0.7rem' }}>(VOUS)</span>}
                                        </div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{p.class || 'Crée son personnage...'}</div>
                                    </div>
                                </div>
                                <div>
                                    {!hasClass ? (
                                        <div style={{
                                            width: '20px', height: '20px',
                                            border: '2px solid var(--gold-dim)',
                                            borderTopColor: 'var(--gold-primary)',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }} />
                                    ) : isReady ? (
                                        <span style={{ color: '#4dff88', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            PRÊT <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4dff88', boxShadow: '0 0 8px #4dff88' }}></span>
                                        </span>
                                    ) : (
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>EN ATTENTE</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Controls Area */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>

                    {/* Ready Button for current player */}
                    {character?.class && !loading && (
                        <button
                            onClick={onToggleReady}
                            className={character.is_ready ? 'btn-gold' : 'btn-medieval'}
                            style={{
                                padding: '1rem 3rem',
                                fontSize: '1.2rem',
                                letterSpacing: '2px',
                                minWidth: '250px',
                                background: character.is_ready ? 'rgba(77, 255, 136, 0.15)' : 'rgba(0,0,0,0.5)',
                                border: `2px solid ${character.is_ready ? '#4dff88' : 'var(--gold-primary)'}`,
                                color: character.is_ready ? '#4dff88' : 'var(--gold-primary)',
                                transform: character.is_ready ? 'scale(1.05)' : 'scale(1)',
                                boxShadow: character.is_ready ? '0 0 15px rgba(77, 255, 136, 0.3)' : 'none'
                            }}
                        >
                            {character.is_ready ? 'PRÊT !' : 'JE SUIS PRÊT'}
                        </button>
                    )}

                    {/* Force Start for Host */}
                    {/* Note: Logic handled by parent passing onStart if allowed */}
                    {players.length >= 1 && character?.class && !loading && onStart && (
                        <div style={{ marginTop: '1rem' }}>
                            <button
                                onClick={onStart}
                                className="btn-secondary"
                                title="Lancer la partie même si tous les joueurs ne sont pas prêts"
                            >
                                ⚠️ Forcer le Lancement
                            </button>
                        </div>
                    )}
                </div>

                {loading && (
                    <div style={{ marginTop: '2rem', color: 'var(--gold-primary)', fontStyle: 'italic', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '30px', height: '30px',
                            border: '3px solid var(--gold-dim)',
                            borderTopColor: 'var(--gold-primary)',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <span>Le Maître du Jeu prépare l'aventure...</span>
                    </div>
                )}

                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', width: '100%' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                        {(() => {
                            const withClass = players.filter(p => p.class);
                            const ready = players.filter(p => p.class && p.is_ready);
                            if (withClass.length < players.length) {
                                return `${withClass.length} / ${players.length} héros ont créé leur personnage`;
                            }
                            if (ready.length === players.length) {
                                return "Tous les héros sont prêts ! L'aventure commence...";
                            }
                            return `${ready.length} / ${players.length} héros sont prêts`;
                        })()}
                    </p>
                </div>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );
};

export default WaitingRoom;
