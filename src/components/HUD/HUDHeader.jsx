import React from 'react';

export const HUDHeader = ({
    gameTime,
    getTimeLabel,
    realTimeSync,
    onToggleRealTime,
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
    onToggleDMPanel
}) => {
    return (
        <div className="hud-header">
            {/* Clock Widget */}
            <div className="clock-widget">
                <span className="clock-icon">{gameTime.hour >= 6 && gameTime.hour < 18 ? '☀️' : '🌙'}</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="clock-time">{String(gameTime.hour).padStart(2, '0')}:{String(gameTime.minute || 0).padStart(2, '0')}</span>
                    <span className="day-sync-indicator">{getTimeLabel()} {realTimeSync ? '(Réel)' : `(Jour ${gameTime.day})`}</span>
                </div>
                <button
                    onClick={onToggleRealTime}
                    className="sync-btn"
                    title="Synchroniser avec l'heure réelle"
                >
                    🔄
                </button>
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
                            fontSize: '0.75rem',
                            padding: '6px 16px',
                            background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
                            color: 'var(--bg-dark)',
                            fontWeight: 'bold',
                            border: '2px solid var(--gold-light)',
                            boxShadow: '0 0 12px rgba(197, 168, 100, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
                            textShadow: 'none',
                            letterSpacing: '0.5px'
                        }}
                    >
                        📖 CODEX
                    </button>
                )}
                {onToggleDMPanel && isGM && (
                    <button onClick={onToggleDMPanel} className="hud-btn dm-panel-btn" title="Interface Maître du Jeu (Claude Opus)">
                        🎭 MJ
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
