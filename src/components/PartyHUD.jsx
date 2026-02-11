import React from 'react';

export const PartyHUD = ({ players, currentPlayerId, onlineUsers }) => {
    // Only show players who are connected (in onlineUsers list) AND not self
    const partyMembers = players.filter(p => p.user_id !== currentPlayerId && onlineUsers?.includes(p.user_id));

    if (partyMembers.length === 0) return null;

    return (
        <div style={{
            position: 'absolute',
            top: 'clamp(10px, 2vh, 20px)',
            right: 'clamp(10px, 2vw, 20px)',
            width: 'clamp(200px, 20vw, 250px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            zIndex: 900 // Below CombatManager overlay
        }}>
            <h4 style={{
                color: 'var(--gold-dim)',
                textAlign: 'right',
                fontSize: '0.9rem',
                borderBottom: '1px solid var(--glass-border)',
                paddingBottom: '0.5rem',
                marginBottom: '0.5rem'
            }}>
                COMPAGNONS
            </h4>

            {partyMembers.map(member => (
                <div key={member.id} className="glass-panel animate-fade-in" style={{
                    padding: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    borderLeft: '3px solid var(--aether-blue)'
                }}>
                    {/* Portrait */}
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '1px solid var(--gold-dim)',
                        flexShrink: 0
                    }}>
                        <img
                            src={member.portrait_url || 'https://via.placeholder.com/40'}
                            alt={member.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.name}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.class?.split('(')[0].trim()}</div>

                        {/* HP Bar */}
                        <div style={{ marginTop: '0.4rem', background: 'rgba(0,0,0,0.5)', height: '4px', borderRadius: '2px', width: '100%', overflow: 'hidden' }}>
                            <div style={{
                                width: `${Math.min(100, (member.hp / member.max_hp) * 100)}%`,
                                background: member.hp < member.max_hp * 0.3 ? '#ff4444' : 'var(--aether-blue)',
                                height: '100%',
                                transition: 'width 0.5s ease'
                            }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
