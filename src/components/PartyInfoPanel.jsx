import React from 'react';

export function PartyInfoPanel({ players, currentCharacter, onKickPlayer, isHost }) {
    // Filter out the current player
    const otherPlayers = players.filter(p => p.id !== currentCharacter?.id && p.class);
    
    if (otherPlayers.length === 0) return null;

    const getClassIcon = (cls) => {
        if (!cls) return '👤';
        const classLower = cls.toLowerCase();
        if (classLower.includes('guerrier')) return '⚔️';
        if (classLower.includes('mage')) return '🔮';
        if (classLower.includes('voleur')) return '🗡️';
        if (classLower.includes('prêtre')) return '✨';
        if (classLower.includes('archer')) return '🏹';
        if (classLower.includes('paladin')) return '🛡️';
        if (classLower.includes('druide')) return '🌿';
        if (classLower.includes('barde')) return '🎵';
        if (classLower.includes('chasseur')) return '🏹';
        if (classLower.includes('moine')) return '👊';
        if (classLower.includes('démoniste')) return '👹';
        if (classLower.includes('shaman')) return '🔥';
        return '👤';
    };

    const getHpColor = (hp, maxHp) => {
        const ratio = hp / maxHp;
        if (ratio > 0.6) return '#4dff88';
        if (ratio > 0.3) return '#ffd700';
        return '#ff4444';
    };

    return (
        <div className="party-info-panel">
            <div className="party-header">
                <span className="party-title">GROUPE</span>
                <span className="party-count">{otherPlayers.length + 1}</span>
            </div>
            
            <div className="party-list">
                {/* Current player */}
                <div className="party-member self">
                    <div className="member-icon">{getClassIcon(currentCharacter?.class)}</div>
                    <div className="member-info">
                        <div className="member-name">{currentCharacter?.name} (Vous)</div>
                        <div className="member-class">{currentCharacter?.class}</div>
                        <div className="member-stats">
                            <span className="member-level">Niv. {currentCharacter?.level || 1}</span>
                            <span className="member-hp" style={{ color: getHpColor(currentCharacter?.hp || 100, currentCharacter?.max_hp || 100) }}>
                                ❤️ {currentCharacter?.hp || 100}/{currentCharacter?.max_hp || 100}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Other players */}
                {otherPlayers.map(player => (
                    <div key={player.id} className="party-member" style={{ position: 'relative' }}>
                        <div className="member-icon">{getClassIcon(player.class)}</div>
                        <div className="member-info">
                            <div className="member-name">{player.name}</div>
                            <div className="member-class">{player.class}</div>
                            <div className="member-stats">
                                <span className="member-level">Niv. {player.level || 1}</span>
                                <span className="member-hp" style={{ color: getHpColor(player.hp || 100, player.max_hp || 100) }}>
                                    ❤️ {player.hp || 100}/{player.max_hp || 100}
                                </span>
                            </div>
                        </div>
                        {isHost && onKickPlayer && (
                            <button
                                onClick={() => onKickPlayer(player.id)}
                                title="Expulser le joueur"
                                style={{
                                    position: 'absolute',
                                    right: '5px',
                                    top: '5px',
                                    background: 'rgba(255, 68, 68, 0.2)',
                                    border: '1px solid #ff4444',
                                    color: '#ff6666',
                                    borderRadius: '4px',
                                    padding: '2px 6px',
                                    fontSize: '0.7rem',
                                    cursor: 'pointer'
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PartyInfoPanel;
