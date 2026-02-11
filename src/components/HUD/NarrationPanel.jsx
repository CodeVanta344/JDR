import React from 'react';
import { formatAIContent } from '../../utils/gameUtils';
import { TypewriterText } from '../TypewriterText';

export const NarrationPanel = ({
    messages,
    loading,
    chatRef,
    players,
    character,
    onSubmit,
    userMsg,
    handleInputTyping,
    typingUsers,
    onToggleReady,
    combatMode
}) => {
    const canToggleReady = players.length > 0 &&
        !players.every(p => p.is_ready) &&
        !messages.some(m => m.role === 'system' && m.content.includes("START_ADVENTURE_TRIGGERED"));

    return (
        <section className="narration-section">
            <div className="messages-container" ref={chatRef}>
                {messages.filter(m => !m.content?.startsWith?.('(MÉMOIRE:')).map((m, i) => (
                    <div key={i} className={`chat-message ${m.role}`}>
                        <span className="msg-author">
                            {m.role === 'user' ? (players.find(p => p.id === m.player_id)?.name || 'HÉROS') : 'RÉCIT'}
                        </span>
                        <div className="msg-content">
                            {(() => {
                                if (m.role === 'image') return <img src={m.content} alt="Vision" style={{ width: '100%', borderRadius: '4px' }} />;

                                let content = "";
                                let challenge = null;

                                try {
                                    // Robust parsing for possible JSON or string content
                                    const raw = typeof m.content === 'string' ? m.content : JSON.stringify(m.content);
                                    if (raw && (raw.startsWith('{') || raw.startsWith('['))) {
                                        const parsed = JSON.parse(raw.replace(/```[a-z]*\n?/gi, '').replace(/```/g, ''));
                                        content = parsed.narrative || formatAIContent(parsed);
                                        challenge = parsed.challenge;
                                    } else {
                                        content = raw;
                                    }
                                } catch (e) {
                                    content = String(m.content || '');
                                }

                                // Final safety check to avoid React Error #31 (rendering objects directly)
                                const renderableContent = (typeof content === 'object' && content !== null)
                                    ? JSON.stringify(content)
                                    : String(content || '');

                                return (
                                    <>
                                        {i === messages.length - 1 && m.role !== 'user' ? (
                                            <TypewriterText text={renderableContent} speed={15} />
                                        ) : (
                                            <div style={{ whiteSpace: 'pre-wrap' }}>{renderableContent}</div>
                                        )}
                                        {challenge && (
                                            <button
                                                className="btn-gold"
                                                style={{ marginTop: '0.8rem', padding: '0.5rem' }}
                                                onClick={() => {
                                                    const roll = Math.floor(Math.random() * 20) + 1;
                                                    const mod = Math.floor(((character?.stats?.[challenge.stat] || 10) - 10) / 2);
                                                    onSubmit(null, `Roll Result: ${roll} (Total: ${roll + mod}) for ${challenge.label}`);
                                                }}
                                            >
                                                🎲 {challenge.label} ({challenge.stat?.toUpperCase()})
                                            </button>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="chat-message system">
                        <span className="msg-content italic" style={{ color: 'var(--aether-blue)' }}>
                            Le destin s'écrit...
                        </span>
                    </div>
                )}
            </div>

            <form className="chat-input-bar" onSubmit={onSubmit} style={{ position: 'relative' }}>
                {typingUsers.length > 0 && (
                    <div style={{
                        position: 'absolute',
                        top: '-25px',
                        left: '10px',
                        fontSize: '0.7rem',
                        color: 'var(--aether-blue)',
                        fontStyle: 'italic',
                        animation: 'pulse 1.5s infinite'
                    }}>
                        ✨ {typingUsers.join(', ')} {typingUsers.length > 1 ? 'écrivent' : 'écrit'}...
                    </div>
                )}
                <input
                    type="text"
                    value={userMsg}
                    onChange={handleInputTyping}
                    placeholder={combatMode ? "Combat en cours..." : "Que faites-vous ?"}
                    className="glass-input"
                    disabled={loading || combatMode}
                />
                <button type="submit" className="btn-action" disabled={loading || !userMsg.trim() || combatMode}>AGIR</button>

                {canToggleReady && (
                    <button
                        type="button"
                        onClick={onToggleReady}
                        style={{
                            marginLeft: '10px',
                            padding: '0 1.5rem',
                            borderRadius: '4px',
                            background: character?.is_ready ? '#2ecc71' : 'rgba(255,215,0,0.1)',
                            border: character?.is_ready ? '1px solid #27ae60' : '1px solid var(--gold-dim)',
                            color: character?.is_ready ? '#000' : 'var(--gold-primary)',
                            fontWeight: 'bold',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        {character?.is_ready ? 'PRÊT !' : 'SE PRÉPARER'}
                    </button>
                )}
            </form>
        </section>
    );
};
