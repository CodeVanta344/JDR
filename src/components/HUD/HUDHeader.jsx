import React from 'react';

export const HUDHeader = ({
    gameTime,
    getTimeLabel,
    onInvite,
    onToggleHelper,
    showHelper,
    onDebugCombat,
    connStatus,
    isGM,
    audioEnabled,
    onToggleAudio,
    audioVolume,
    onVolumeChange,
    onToggleCodex,
    onToggleDMPanel,
    onToggleItemSharePanel,
    itemShareCount,
    onSleep
}) => {
    return (
        <div className="hud-header">
            {/* Clock Widget */}
            <div className="clock-widget">
                <span className="clock-icon">{
                    gameTime.hour >= 5 && gameTime.hour < 8 ? '🌅' :
                    gameTime.hour >= 8 && gameTime.hour < 18 ? '☀️' :
                    gameTime.hour >= 18 && gameTime.hour < 21 ? '🌇' : '🌙'
                }</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="clock-time">{String(gameTime.hour).padStart(2, '0')}:{String(gameTime.minute || 0).padStart(2, '0')}</span>
                    <span className="day-sync-indicator">{getTimeLabel()} (Jour {gameTime.day})</span>
                </div>
                {(gameTime.hour >= 21 || gameTime.hour < 5) && onSleep && (
                    <button onClick={onSleep} style={{
                        marginLeft: 8, background: 'rgba(59,130,246,0.2)', border: '1px solid #3b82f6',
                        color: '#93c5fd', padding: '3px 10px', borderRadius: 6, cursor: 'pointer',
                        fontSize: '0.65rem', fontWeight: 700, letterSpacing: 1
                    }}>💤 Dormir</button>
                )}
            </div>

            {/* Top Right Controls */}
            <div className="hud-top-controls">
                <div className="audio-control-group">
                    <button
                        onClick={onToggleAudio}
                        className={`audio-toggle ${audioEnabled ? 'active' : ''}`}
                        title={audioEnabled ? "Couper le son" : "Activer le son"}
                    >
                        {audioEnabled ? '🔊' : '🔈'}
                    </button>
                    {audioEnabled && (
                        <input
                            type="range"
                            min="0" max="1" step="0.05"
                            value={audioVolume}
                            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                            className="volume-slider"
                        />
                    )}
                </div>
                {onInvite && (
                    <button onClick={onInvite} className="hud-btn invite-btn">
                        🔗 INVITER
                    </button>
                )}
                {onToggleCodex && (
                    <button 
                        onClick={onToggleCodex} 
                        className="hud-btn codex-btn"
                        style={{
                            fontSize: '0.85rem',
                            padding: '8px 20px',
                            background: 'linear-gradient(135deg, #f4e4a6 0%, #d4a853 50%, #b8941f 100%)',
                            color: '#1a1a2e',
                            fontWeight: 'bold',
                            border: '3px solid #f4e4a6',
                            borderRadius: '8px',
                            boxShadow: '0 0 20px rgba(212, 168, 83, 0.8), inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 8px rgba(0,0,0,0.3)',
                            textShadow: 'none',
                            letterSpacing: '1px',
                            transform: 'scale(1.05)',
                            animation: 'codexPulse 2s ease-in-out infinite',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <span style={{ marginRight: '4px', fontSize: '1em' }}>📖</span>
                        <span style={{ fontSize: '0.9em' }}>CODEX</span>
                    </button>
                )}
                {onToggleItemSharePanel && itemShareCount > 0 && (
                    <button 
                        onClick={onToggleItemSharePanel} 
                        className="hud-btn item-share-btn"
                        title="Objets partagés"
                        style={{
                            background: 'rgba(155, 89, 182, 0.2)',
                            border: '1px solid rgba(155, 89, 182, 0.5)',
                            color: '#9b59b6',
                            position: 'relative'
                        }}
                    >
                        📦 {itemShareCount}
                    </button>
                )}
                <button
                    onClick={onToggleHelper}
                    className={`hud-btn guide-btn ${showHelper ? 'active' : ''}`}
                >
                    ✨ GUIDE
                </button>
                <button onClick={onDebugCombat} className="hud-btn debug-btn">
                    ⚔️ DEBUG
                </button>
                <div className={`conn-status ${connStatus}`}>
                    {connStatus.toUpperCase()}
                </div>
            </div>
        </div>
    );
};
