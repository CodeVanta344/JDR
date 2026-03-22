import React, { useState } from 'react';

export function VoiceChatPanel({ 
    isMuted, 
    isTalking, 
    isPushToTalk, 
    pushToTalkKey,
    speakers,
    toggleMute,
    togglePushToTalk,
    changePushToTalkKey,
    character
}) {
    const [showSettings, setShowSettings] = useState(false);
    const [tempKey, setTempKey] = useState(pushToTalkKey);

    const handleKeyChange = (e) => {
        const key = e.key;
        if (key.length === 1 || key === 'Control' || key === 'Alt' || key === 'Shift' || key === ' ') {
            setTempKey(key === ' ' ? 'SPACE' : key);
        }
    };

    const saveKey = () => {
        changePushToTalkKey(tempKey);
        setShowSettings(false);
    };

    // Convert speakers Map to array
    const speakersList = Array.from(speakers.entries())
        .map(([id, data]) => ({ id, ...data }))
        .filter(s => s.id !== character?.user_id); // Don't show self

    return (
        <div style={{
            position: 'fixed',
            bottom: 'clamp(320px, 35vh, 400px)',
            right: 'clamp(10px, 2vw, 20px)',
            width: 'clamp(200px, 18vw, 280px)',
            background: 'rgba(10, 11, 14, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--gold-dim, #8b7355)',
            borderRadius: '8px',
            padding: '12px',
            zIndex: 850,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
                borderBottom: '1px solid rgba(139, 115, 85, 0.3)',
                paddingBottom: '8px'
            }}>
                <span style={{
                    color: 'var(--gold-primary, #d4af37)',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    fontFamily: 'Cinzel, serif'
                }}>
                    🎤 VOX
                </span>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        padding: '2px 5px'
                    }}
                >
                    ⚙️
                </button>
            </div>

            {/* Main Controls */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {/* Mute Toggle */}
                <button
                    onClick={() => toggleMute()}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '10px',
                        background: isMuted 
                            ? 'rgba(255, 68, 68, 0.2)' 
                            : 'rgba(77, 255, 136, 0.2)',
                        border: `2px solid ${isMuted ? '#ff4444' : '#4dff88'}`,
                        borderRadius: '6px',
                        color: isMuted ? '#ff6666' : '#4dff88',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <span style={{ fontSize: '1.2rem' }}>
                        {isMuted ? '🔇' : isTalking ? '🎙️' : '🎤'}
                    </span>
                    <span>
                        {isMuted 
                            ? 'MUET' 
                            : isPushToTalk 
                                ? `PARLE (${pushToTalkKey})` 
                                : 'ACTIF'
                        }
                    </span>
                </button>

                {/* Push-to-Talk Toggle */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary, #a0a0a0)'
                }}>
                    <span>Push-to-Talk</span>
                    <button
                        onClick={togglePushToTalk}
                        style={{
                            padding: '4px 10px',
                            background: isPushToTalk 
                                ? 'rgba(212, 175, 55, 0.3)' 
                                : 'rgba(100,100,100,0.3)',
                            border: `1px solid ${isPushToTalk ? '#d4af37' : '#666'}`,
                            borderRadius: '4px',
                            color: isPushToTalk ? '#d4af37' : '#888',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {isPushToTalk ? 'ON' : 'OFF'}
                    </button>
                </div>

                {/* Speaking Indicator */}
                {isTalking && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        padding: '6px',
                        background: 'rgba(77, 255, 136, 0.15)',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        color: '#4dff88'
                    }}>
                        <span className="voice-pulse">●</span>
                        <span>Vous parlez...</span>
                    </div>
                )}

                {/* Speakers List */}
                {speakersList.length > 0 && (
                    <div style={{
                        marginTop: '5px',
                        borderTop: '1px solid rgba(139, 115, 85, 0.2)',
                        paddingTop: '8px'
                    }}>
                        <div style={{
                            fontSize: '0.7rem',
                            color: 'var(--text-muted, #666)',
                            marginBottom: '5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            En ligne ({speakersList.length})
                        </div>
                        {speakersList.map(speaker => (
                            <div
                                key={speaker.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '4px 0',
                                    fontSize: '0.8rem',
                                    color: speaker.talking ? '#4dff88' : 'var(--text-secondary)'
                                }}
                            >
                                <span style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: speaker.talking ? '#4dff88' : '#666',
                                    animation: speaker.talking ? 'pulse 1s infinite' : 'none'
                                }} />
                                <span>{speaker.name}</span>
                                {speaker.talking && <span style={{ fontSize: '0.7rem' }}>🎙️</span>}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div
                    onClick={() => setShowSettings(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 10000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: 'rgba(10, 11, 14, 0.95)',
                            border: '1px solid var(--gold-dim)',
                            borderRadius: '8px',
                            padding: '20px',
                            minWidth: '250px'
                        }}
                    >
                        <h4 style={{
                            color: 'var(--gold-primary)',
                            margin: '0 0 15px 0',
                            fontFamily: 'Cinzel, serif'
                        }}>
                            Paramètres Vox
                        </h4>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                color: 'var(--text-secondary)',
                                marginBottom: '8px'
                            }}>
                                Touche Push-to-Talk
                            </label>
                            <div
                                tabIndex={0}
                                onKeyDown={handleKeyChange}
                                style={{
                                    padding: '10px',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--gold-dim)',
                                    borderRadius: '4px',
                                    color: 'var(--text-primary)',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                Appuyez sur une touche...
                                <div style={{
                                    fontSize: '1.2rem',
                                    color: 'var(--gold-primary)',
                                    marginTop: '5px',
                                    fontWeight: 'bold'
                                }}>
                                    {tempKey}
                                </div>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '10px'
                        }}>
                            <button
                                onClick={saveKey}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    background: 'rgba(77, 255, 136, 0.2)',
                                    border: '1px solid #4dff88',
                                    borderRadius: '4px',
                                    color: '#4dff88',
                                    cursor: 'pointer'
                                }}
                            >
                                Sauvegarder
                            </button>
                            <button
                                onClick={() => setShowSettings(false)}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    background: 'rgba(255, 68, 68, 0.2)',
                                    border: '1px solid #ff4444',
                                    borderRadius: '4px',
                                    color: '#ff6666',
                                    cursor: 'pointer'
                                }}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS Animation */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                }
                .voice-pulse {
                    animation: pulse 1s infinite;
                }
            `}</style>
        </div>
    );
}

export default VoiceChatPanel;
