import React from 'react';
import { formatAIContent } from '../../utils/gameUtils';
import { TypewriterText } from '../TypewriterText';
import { DiceRollScene2D } from '../Dice2D';

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

    const NARRATIVE_KEYWORDS = [
        'quête', 'quêtes', 'objectif', 'objectifs', 'indice', 'indices', 'secret', 'secrets',
        'danger', 'combat', 'ennemi', 'ennemis', 'boss', 'piège', 'récompense', 'or',
        'artefact', 'relique', 'faction', 'factions', 'village', 'auberge', 'marchand',
        'portail', 'rumeur', 'rumeurs', 'rituel', 'sort', 'malédiction', 'décision', 'choix'
    ];
    const KEYWORD_SET = new Set(NARRATIVE_KEYWORDS.map((k) => k.toLowerCase()));
    const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const KEYWORD_REGEX = new RegExp(`\\b(${NARRATIVE_KEYWORDS.map(escapeRegExp).join('|')})\\b`, 'giu');

    const renderHighlightedNarrative = (text) => {
        const lines = (text || '').split('\n');
        return lines.map((line, lineIndex) => {
            const segments = line.split(KEYWORD_REGEX);
            return (
                <React.Fragment key={`line-${lineIndex}`}>
                    {segments.map((segment, segmentIndex) => (
                        KEYWORD_SET.has(segment.toLowerCase())
                            ? <span key={`seg-${lineIndex}-${segmentIndex}`} className="mj-keyword">{segment}</span>
                            : <React.Fragment key={`seg-${lineIndex}-${segmentIndex}`}>{segment}</React.Fragment>
                    ))}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            );
        });
    };

    const extractNarrative = (rawContent) => {
        if (!rawContent) return '';

        let raw = typeof rawContent === 'string' ? rawContent : JSON.stringify(rawContent);

        // Skip memory markers
        if (raw.startsWith('(MEMOIRE:') || raw.startsWith('(MÉMOIRE:')) {
            return null;
        }

        // Strip "RÉCIT DU MJ" prefix if present
        raw = raw.replace(/^RÉCIT\s*DU\s*MJ\s*/i, '').replace(/^RECIT\s*DU\s*MJ\s*/i, '').trim();

        // Strip ```json blocks at the start
        if (raw.startsWith('```')) {
            raw = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
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
            <div className="messages-container" ref={chatRef} aria-live="polite">
                {messages.filter(m => !m.content?.startsWith?.('(MÉMOIRE:') && !m.content?.startsWith?.('[ITEM_SHARE]')).map((m, i) => {
                    // Détecter message de lancé de dé
                    if (m.content?.startsWith('[DICE_ROLL]')) {
                        try {
                            const jsonStr = m.content.replace('[DICE_ROLL]', '');
                            const diceData = JSON.parse(jsonStr);
                            return (
                                <div key={i} className="chat-message system dice-roll-message">
                                    <DiceRollScene2D
                                        diceType={diceData.diceType}
                                        value={diceData.result}
                                        onComplete={() => {}}
                                    />
                                </div>
                            );
                        } catch (e) {
                            console.error('Failed to parse dice roll:', e);
                            return null;
                        }
                    }

                    // Détecter message de partage d'item
                    if (m.content?.startsWith('[ITEM_SHARE]')) {
                        try {
                            const jsonStr = m.content.replace('[ITEM_SHARE]', '');
                            const shareData = JSON.parse(jsonStr);
                            const { player, item } = shareData;
                            
                            return (
                                <div key={i} className="chat-message system item-share-message" style={{
                                    background: 'rgba(155, 89, 182, 0.15)',
                                    border: `2px solid ${item.rarityColor}`,
                                    borderRadius: '12px',
                                    padding: '12px',
                                    margin: '8px 0',
                                    boxShadow: `0 0 15px ${item.rarityColor}44`
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: '8px',
                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                        paddingBottom: '8px'
                                    }}>
                                        <span style={{ fontSize: '1.2rem' }}>📤</span>
                                        <span style={{ 
                                            fontSize: '0.8rem', 
                                            color: '#aaa',
                                            fontStyle: 'italic'
                                        }}>
                                            {player} partage un objet :
                                        </span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '6px'
                                    }}>
                                        {/* Item name and rarity */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            flexWrap: 'wrap'
                                        }}>
                                            <span style={{
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold',
                                                color: item.rarityColor,
                                                textShadow: `0 0 10px ${item.rarityColor}66`
                                            }}>
                                                {item.name}
                                            </span>
                                            <span style={{
                                                fontSize: '0.65rem',
                                                padding: '2px 8px',
                                                background: `${item.rarityColor}22`,
                                                border: `1px solid ${item.rarityColor}`,
                                                borderRadius: '4px',
                                                color: item.rarityColor,
                                                textTransform: 'uppercase',
                                                fontWeight: 'bold'
                                            }}>
                                                {item.rarityLabel}
                                            </span>
                                            {item.equipped && (
                                                <span style={{
                                                    fontSize: '0.65rem',
                                                    padding: '2px 6px',
                                                    background: 'rgba(212, 175, 55, 0.2)',
                                                    border: '1px solid #d4af37',
                                                    borderRadius: '4px',
                                                    color: '#d4af37'
                                                }}>
                                                    ✓ Équipé
                                                </span>
                                            )}
                                        </div>

                                        {/* Item type */}
                                        <span style={{
                                            fontSize: '0.7rem',
                                            color: '#888',
                                            textTransform: 'uppercase'
                                        }}>
                                            Type: {item.type}
                                        </span>

                                        {/* Description */}
                                        {item.description && (
                                            <span style={{
                                                fontSize: '0.8rem',
                                                color: '#ccc',
                                                fontStyle: 'italic',
                                                marginTop: '4px'
                                            }}>
                                                {item.description}
                                            </span>
                                        )}

                                        {/* Stats */}
                                        {item.stats && (
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '6px',
                                                marginTop: '8px',
                                                padding: '8px',
                                                background: 'rgba(0,0,0,0.3)',
                                                borderRadius: '6px'
                                            }}>
                                                {item.stats.split(' | ').map((stat, idx) => (
                                                    <span key={idx} style={{
                                                        fontSize: '0.7rem',
                                                        padding: '2px 8px',
                                                        background: 'rgba(72, 219, 251, 0.15)',
                                                        border: '1px solid rgba(72, 219, 251, 0.3)',
                                                        borderRadius: '4px',
                                                        color: '#48dbfb'
                                                    }}>
                                                        {stat}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Effects */}
                                        {item.effects && (
                                            <div style={{
                                                marginTop: '8px',
                                                padding: '8px',
                                                background: 'rgba(76, 209, 55, 0.1)',
                                                border: '1px solid rgba(76, 209, 55, 0.2)',
                                                borderRadius: '6px'
                                            }}>
                                                <span style={{
                                                    fontSize: '0.65rem',
                                                    color: '#4cd137',
                                                    fontWeight: 'bold',
                                                    display: 'block',
                                                    marginBottom: '4px'
                                                }}>
                                                    Effets :
                                                </span>
                                                <span style={{
                                                    fontSize: '0.75rem',
                                                    color: '#4cd137',
                                                    whiteSpace: 'pre-wrap'
                                                }}>
                                                    {item.effects}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        } catch (e) {
                            console.error('Failed to parse item share:', e);
                            return null;
                        }
                    }

                    const content = extractNarrative(m.content);
                    if (content === null || !content?.trim()) return null;

                    return (
                        <div key={i} className={`chat-message ${m.role} ${m.role === 'system' ? 'system-msg' : ''}`}>
                            <span className="msg-author">
                                {m.role === 'user' ? (players.find(p => p.id === m.player_id)?.name || 'HEROS') :
                                    (m.role === 'system' || m.role === 'assistant') ? 'RECIT DU MJ' : 'ARCHIVES'}
                            </span>
                            <div className="msg-content">
                                {m.role === 'image' ? (
                                    <img src={m.content} alt="Vision" style={{ width: '100%', borderRadius: '4px' }} />
                                ) : (
                                    <>
                                        {/* Render specialized Codex Updates if present */}
                                        {(() => {
                                            try {
                                                const clean = m.content.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
                                                const data = clean.startsWith('{') ? JSON.parse(clean) : null;

                                                if (data?.codex_update) {
                                                    const { new_secret, new_location, new_npc } = data.codex_update;
                                                    return (
                                                        <div className="codex-updates" style={{
                                                            display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px'
                                                        }}>
                                                            {new_secret && (
                                                                <div className="secret-reveal" style={{
                                                                    border: '1px solid var(--gold-dim)',
                                                                    background: 'rgba(50, 20, 50, 0.4)',
                                                                    padding: '8px', borderRadius: '4px',
                                                                    color: '#d4af37', fontSize: '0.9em'
                                                                }}>
                                                                    <strong>👁️ SECRET RÉVÉLÉ:</strong> {new_secret}
                                                                </div>
                                                            )}
                                                            {new_location && (
                                                                <div className="location-reveal" style={{
                                                                    border: '1px dashed var(--aether-blue)',
                                                                    background: 'rgba(20, 30, 50, 0.4)',
                                                                    padding: '8px', borderRadius: '4px',
                                                                    color: 'var(--aether-blue)', fontSize: '0.9em'
                                                                }}>
                                                                    <strong>📍 LIEU DÉCOUVERT:</strong> {new_location.name}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            } catch (e) {
                                                return null;
                                            }
                                        })()}

                                        {i === messages.length - 1 && m.role !== 'user' ? (
                                            <TypewriterText text={content} speed={15} renderText={renderHighlightedNarrative} />
                                        ) : (
                                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                                {m.role === 'user' ? content : renderHighlightedNarrative(content)}
                                            </div>
                                        )}
                                    </>
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
                        top: '-35px',
                        left: '10px',
                        fontSize: '0.8rem',
                        color: 'var(--aether-blue)',
                        fontStyle: 'italic',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(0,0,0,0.6)',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        border: '1px solid var(--aether-blue)',
                        zIndex: 10
                    }}>
                        <span>{typingUsers.join(', ')} {typingUsers.length > 1 ? 'sont en train d\'écrire' : 'est en train d\'écrire'}</span>
                        <span className="typing-animation">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </span>
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
