import React, { useState, useEffect, useRef } from 'react';

export function GameHelperModal({ messages, onSendMessage, onClose, loading }) {
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim() || loading) return;
        onSendMessage(inputValue);
        setInputValue('');
    };

    return (
        <div className="helper-overlay animate-fade-in" style={{
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            width: 'min(400px, 100vw)',
            zIndex: 3000,
            background: 'var(--void-panel)',
            borderLeft: '2px solid var(--gold-dim)',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            backdropFilter: 'blur(10px)'
        }}>
            {/* Header */}
            <header style={{
                padding: '1.2rem',
                background: 'rgba(229,192,109,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.2rem' }}>📖</span>
                    <div>
                        <h3 style={{ color: 'var(--gold-primary)', margin: 0, fontSize: '1rem', letterSpacing: '1px' }}>GRIMOIRE D'AIDE</h3>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>ASSISTANCE HORS RP</span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        padding: '5px'
                    }}
                >
                    ✕
                </button>
            </header>

            {/* Content / Chat */}
            <div
                ref={scrollRef}
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    background: 'radial-gradient(circle at top right, rgba(229,192,109,0.03), transparent)'
                }}
            >
                {messages.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        marginTop: '2rem',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                        padding: '0 1rem'
                    }}>
                        <p>Posez vos questions sur les règles, vos statistiques ou le monde d'Aethelgard ici.</p>
                        <p style={{ fontStyle: 'italic', fontSize: '0.8rem' }}>Cette conversation est privée.</p>
                    </div>
                )}
                {messages.map((m, i) => (
                    <div key={i} style={{
                        alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '90%',
                        padding: '0.7rem 1rem',
                        borderRadius: '8px',
                        background: m.role === 'user' ? 'rgba(229,192,109,0.1)' : 'rgba(255,255,255,0.03)',
                        border: m.role === 'user' ? '1px solid var(--gold-dim)' : '1px solid rgba(255,255,255,0.05)',
                        color: m.role === 'user' ? 'var(--gold-primary)' : 'var(--text-primary)',
                        fontSize: '0.85rem',
                        lineHeight: '1.4'
                    }}>
                        {m.content}
                    </div>
                ))}
                {loading && (
                    <div style={{ alignSelf: 'flex-start', color: 'var(--aether-blue)', fontSize: '0.7rem', fontStyle: 'italic' }}>
                        Le Grimoire s'illumine...
                    </div>
                )}
            </div>

            {/* Input */}
            <form
                onSubmit={handleSubmit}
                style={{
                    padding: '1.2rem',
                    background: 'rgba(0,0,0,0.3)',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    gap: '0.8rem'
                }}
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Comment fonctionne..."
                    style={{
                        flex: 1,
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid var(--glass-border)',
                        color: '#fff',
                        padding: '0.6rem 0.8rem',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        outline: 'none'
                    }}
                />
                <button
                    type="submit"
                    disabled={loading || !inputValue.trim()}
                    className="btn-action"
                    style={{ padding: '0 1rem', fontSize: '0.8rem' }}
                >
                    ASK
                </button>
            </form>
        </div>
    );
}
