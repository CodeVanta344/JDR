import React, { useState } from 'react';
import { MagicBackground } from './MagicBackground';
import './SessionHub.css';

export function SessionHub({ players, character, session, onToggleReady, onStart, loading, onLeave }) {
    const isHost = session?.host_id === character?.user_id;
    // Le host n'a pas besoin d'être "prêt" - vérifie seulement les autres joueurs
    const allReady = players.length >= 1 && players.filter(p => p.user_id !== session?.host_id).every(p => p.is_ready);
    const playerCount = players.length;

    return (
        <>
            <MagicBackground />
            <div className="session-hub-container">
                {/* Grand titre épique */}
                <div className="epic-title-container">
                    <div className="subtitle">Chroniques d'Aethelgard</div>
                    <h1 className="epic-title">
                        <span className="title-ornament">✦</span>
                        RASSEMBLEMENT
                        <span className="title-ornament">✦</span>
                    </h1>
                    <div className="title-underline"></div>
                </div>

                {/* Panneau principal - style parchemin */}
                <div className="hub-scroll-panel">
                    {/* Coins décoratifs */}
                    <div className="corner-ornament top-left"></div>
                    <div className="corner-ornament top-right"></div>
                    <div className="corner-ornament bottom-left"></div>
                    <div className="corner-ornament bottom-right"></div>

                    {/* En-tête avec sceau */}
                    <div className="hub-header">
                        <div className="session-seal">
                            <svg viewBox="0 0 100 100" className="seal-svg">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,3" />
                                <text x="50" y="55" textAnchor="middle" fontSize="16" fill="currentColor" fontFamily="Cinzel">⚔</text>
                            </svg>
                        </div>

                        <div className="session-info-grid">
                            <div className="info-block">
                                <div className="info-label">Code de Session</div>
                                <div className="info-value code-value">{session?.id?.slice(0, 8).toUpperCase()}</div>
                            </div>
                            <div className="info-divider"></div>
                            <div className="info-block">
                                <div className="info-label">Aventuriers Assemblés</div>
                                <div className="info-value" style={{ color: playerCount >= 2 ? '#5dff98' : '#ff7b7b' }}>
                                    {playerCount} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>/ 2 minimum</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Liste des joueurs - style registre */}
                    <div className="players-registry">
                        <h3 className="registry-title">
                            <span className="registry-line"></span>
                            <span>Registre des Héros</span>
                            <span className="registry-line"></span>
                        </h3>

                        <div className="players-list">
                            {players.map((p, index) => (
                                <div
                                    key={p.id}
                                    className={`player-card ${p.user_id === character?.user_id ? 'player-self' : ''}`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="player-avatar">
                                        <div className="avatar-ring"></div>
                                        <div className="avatar-inner">
                                            {p.name.charAt(0).toUpperCase()}
                                        </div>
                                        {p.user_id === session?.host_id && (
                                            <div className="host-crown" title="Maître du Jeu">👑</div>
                                        )}
                                    </div>

                                    <div className="player-info">
                                        <div className="player-name">
                                            {p.name}
                                            {p.user_id === session?.host_id && (
                                                <span className="host-badge">Maître</span>
                                            )}
                                        </div>
                                        <div className="player-status-label">
                                            {p.user_id === character?.user_id ? '⚔ Vous' : '⚔ Compagnon'}
                                        </div>
                                    </div>

                                    <div className="player-ready-indicator">
                                        {p.is_ready ? (
                                            <>
                                                <span className="ready-text">Prêt</span>
                                                <div className="ready-orb ready-orb-active"></div>
                                            </>
                                        ) : (
                                            <>
                                                <span className="ready-text waiting">En attente</span>
                                                <div className="ready-orb"></div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="hub-actions">
                        <div className="actions-divider"></div>

                        <div className="button-group">
                            <button
                                className="btn-medieval btn-secondary"
                                onClick={onLeave}
                            >
                                <span className="btn-icon">⬅</span>
                                Quitter le Hall
                            </button>

                            {!isHost && (
                                <button
                                    className="btn-medieval btn-primary"
                                    onClick={onToggleReady}
                                    disabled={loading}
                                >
                                    <span className="btn-icon">{players.find(p => p.user_id === character?.user_id)?.is_ready ? '✓' : '⏳'}</span>
                                    {players.find(p => p.user_id === character?.user_id)?.is_ready ? 'Annuler' : 'Je suis prêt'}
                                </button>
                            )}

                            {isHost && (
                                <button
                                    className="btn-medieval btn-epic"
                                    onClick={onStart}
                                    disabled={!allReady || loading}
                                >
                                    <span className="btn-icon">⚔</span>
                                    Commencer l'Aventure
                                    {!allReady && <span className="btn-subtitle">En attente des héros</span>}
                                </button>
                            )}
                        </div>

                        {!allReady && playerCount >= 2 && (
                            <div className="hub-notice">
                                <span className="notice-icon">⌛</span>
                                Tous les aventuriers doivent être prêts avant de débuter la quête
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer décoratif */}
                <div className="hub-footer">
                    <div className="footer-ornament">✦ ✦ ✦</div>
                    <div className="footer-text">Que votre quête soit légendaire</div>
                </div>
            </div>
        </>
    );
}
