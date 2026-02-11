import React, { useState, useEffect, useRef } from 'react';
import { extractSpokenText, speakText } from '../utils/speechUtils';

export function NPCDialogueModal({ npc, messages, onSendMessage, onClose, loading, voiceEnabled, setVoiceEnabled }) {
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef(null);

    // Speech Synthesis setup
    useEffect(() => {
        const lastMsg = messages[messages.length - 1];
        if (!lastMsg || lastMsg.role !== 'npc' || !voiceEnabled) return;

        const spokenText = extractSpokenText(lastMsg.content);
        speakText(spokenText, npc.name);

        return () => window.speechSynthesis.cancel();
    }, [messages, voiceEnabled, npc.name]);

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
        <div className="npc-dialogue-overlay animate-fade-in" style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2500,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)'
        }}>
            <div className="npc-dialogue-container glass-panel" style={{
                width: 'min(700px, 95vw)',
                height: 'min(600px, 80vh)',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--void-panel)',
                border: '1px solid var(--gold-dim)',
                boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Header with NPC Info */}
                <header style={{
                    padding: '1.5rem',
                    background: 'rgba(0,0,0,0.4)',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        border: '2px solid var(--gold-primary)',
                        overflow: 'hidden',
                        boxShadow: '0 0 15px rgba(229,192,109,0.3)'
                    }}>
                        <img
                            src={npc.portrait_url || `https://loremflickr.com/100/100/fantasy,portrait,${npc.name || 'human'}`}
                            alt={npc.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div>
                        <h2 style={{ color: 'var(--gold-primary)', letterSpacing: '2px', fontSize: '1.2rem', margin: 0 }}>{npc.name}</h2>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>PNJ • CONVERSATION PRIVÉE</span>
                    </div>

                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => {
                                setVoiceEnabled(!voiceEnabled);
                                if (voiceEnabled) window.speechSynthesis.cancel();
                            }}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: voiceEnabled ? 'var(--gold-primary)' : 'var(--text-muted)',
                                width: '36px',
                                height: '36px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'all 0.3s'
                            }}
                            title={voiceEnabled ? "Couper la voix" : "Activer la voix"}
                        >
                            {voiceEnabled ? '🔊' : '🔈'}
                        </button>
                        <button
                            onClick={() => {
                                window.speechSynthesis.cancel();
                                onClose();
                            }}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'var(--text-secondary)',
                                width: '36px',
                                height: '36px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ✕
                        </button>
                    </div>
                </header>

                {/* Chat History */}
                <div
                    ref={scrollRef}
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))'
                    }}
                >
                    {messages.map((m, i) => (
                        <div key={i} style={{
                            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '85%',
                            padding: '0.8rem 1.2rem',
                            borderRadius: '8px',
                            background: m.role === 'user' ? 'rgba(229,192,109,0.1)' : 'rgba(255,255,255,0.03)',
                            border: m.role === 'user' ? '1px solid var(--gold-dim)' : '1px solid rgba(255,255,255,0.05)',
                            color: m.role === 'user' ? 'var(--gold-primary)' : 'var(--text-primary)',
                            fontSize: '0.95rem',
                            lineHeight: '1.5',
                            boxShadow: m.role === 'user' ? '0 4px 15px rgba(0,0,0,0.2)' : 'none'
                        }}>
                            {m.content}
                        </div>
                    ))}
                    {loading && (
                        <div style={{ alignSelf: 'flex-start', color: 'var(--aether-blue)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                            {npc.name} réfléchit...
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        padding: '1.5rem',
                        background: 'rgba(0,0,0,0.5)',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        gap: '1rem'
                    }}
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Que dites-vous ?"
                        autoFocus
                        style={{
                            flex: 1,
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--glass-border)',
                            color: '#fff',
                            padding: '0.8rem 1.2rem',
                            borderRadius: '4px',
                            outline: 'none',
                            fontSize: '1rem'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={loading || !inputValue.trim()}
                        className="btn-gold"
                        style={{ padding: '0 1.5rem' }}
                    >
                        RÉPONDRE
                    </button>
                </form>

                {/* Dismiss Hint */}
                <div style={{
                    paddingBottom: '0.8rem',
                    textAlign: 'center',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    opacity: 0.5,
                    letterSpacing: '1px'
                }}>
                    DITES "AU REVOIR" OU SORTEZ DE LA PIÈCE POUR FERMER CETTE FENÊTRE
                </div>
            </div>
        </div>
    );
}
