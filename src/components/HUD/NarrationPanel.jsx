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

    const extractNarrative = (rawContent) => {
        if (!rawContent) return '';
        
        let raw = typeof rawContent === 'string' ? rawContent : JSON.stringify(rawContent);
        
        // Skip memory markers
        if (raw.startsWith('(MEMOIRE:') || raw.startsWith('(MÉMOIRE:')) {
            return null;
        }
        
        // Not JSON? Return as-is
        if (!raw.trim().startsWith('{') && !raw.trim().startsWith('[')) {
            return raw;
        }
        
        // Clean markdown code blocks
        let cleaned = raw.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
        
        // Method 1: Extract narrative with regex (most robust for escaped strings)
        const narrativeMatch = cleaned.match(/"narrative"\s*:\s*"((?:[^"\\]|\\.)*)"/);
        if (narrativeMatch) {
            return narrativeMatch[1]
                .replace(/\\"/g, '"')
                .replace(/\\n/g, '\n')
                .replace(/\\t/g, '\t')
                .replace(/\\\\/g, '\\')
                .replace(/\\'/g, "'");
        }
        
        // Method 2: Try JSON.parse
        try {
            const parsed = JSON.parse(cleaned);
            if (parsed.narrative && typeof parsed.narrative === 'string') {
                return parsed.narrative;
            }
            if (typeof parsed === 'string') {
                return parsed;
            }
            // Use formatAIContent for complex objects
            return formatAIContent(parsed);
        } catch (e) {
            // Method 3: Manual extraction as last resort
            const startIdx = cleaned.indexOf('"narrative"');
            if (startIdx !== -1) {
                const colonIdx = cleaned.indexOf(':', startIdx);
                const quoteStart = cleaned.indexOf('"', colonIdx + 1);
                if (quoteStart !== -1) {
                    let quoteEnd = quoteStart + 1;
                    while (quoteEnd < cleaned.length) {
                        if (cleaned[quoteEnd] === '"' && cleaned[quoteEnd - 1] !== '\\') break;
                        quoteEnd++;
                    }
                    const narrative = cleaned.substring(quoteStart + 1, quoteEnd);
                    return narrative
                        .replace(/\\"/g, '"')
                        .replace(/\\n/g, '\n')
                        .replace(/\\\\/g, '\\');
                }
            }
        }
        
        return raw;
    };

    return (
        <section className="narration-section">
            <div className="messages-container" ref={chatRef}>
                {messages.filter(m => !m.content?.startsWith?.('(MÉMOIRE:')).map((m, i) => {
                    const content = extractNarrative(m.content);
                    if (content === null || !content?.trim()) return null;
                    
                    return (
                        <div key={i} className={`chat-message ${m.role} ${m.role === 'system' ? 'system-msg' : ''}`}>
                            <span className="msg-author">
                                {m.role === 'user' ? (players.find(p => p.id === m.player_id)?.name || 'HEROS') :
                                    m.role === 'system' ? 'RECIT DU MJ' : 'ARCHIVES'}
                            </span>
                            <div className="msg-content">
                                {m.role === 'image' ? (
                                    <img src={m.content} alt="Vision" style={{ width: '100%', borderRadius: '4px' }} />
                                ) : i === messages.length - 1 && m.role !== 'user' ? (
                                    <TypewriterText text={content} speed={15} />
                                ) : (
                                    <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
                                )}
                            </div>
                        </div>
                    );
                })}
                {loading && (
                    <div className="chat-message system">
                        <span className="msg-content italic" style={{ color: 'var(--aether-blue)' }}>
                            Le destin s'ecrit...
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
                        {typingUsers.join(', ')} {typingUsers.length > 1 ? 'ecrivent' : 'ecrit'}...
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
                        {character?.is_ready ? 'PRET !' : 'SE PREPARER'}
                    </button>
                )}
            </form>
        </section>
    );
};
