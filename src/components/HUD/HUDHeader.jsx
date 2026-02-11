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
    tension = 0
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

            {/* Tension Meter */}
            <div className="tension-widget" title={`Tension: ${tension}%`}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>DANGER</span>
                <div className="tension-bar-bg">
                    <div
                        className="tension-fill"
                        style={{
                            width: `${tension}%`,
                            background: tension > 80 ? 'var(--neon-red)' : (tension > 50 ? 'var(--gold-primary)' : 'var(--success-color)'),
                            boxShadow: tension > 80 ? '0 0 10px var(--neon-red)' : 'none'
                        }}
                    />
                </div>
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
