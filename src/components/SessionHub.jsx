import React, { useState } from 'react';
import { MagicBackground } from './MagicBackground';
import { ScrollLore } from './ScrollLore';
import { CLASSES } from '../lore';
import './SessionHub.css';

export function SessionHub({ players, character, session, onToggleReady, onStart, loading, onLeave, onCreateRandomCharacter, onKickPlayer }) {
    const isHost = session?.host_id === character?.user_id;
    // Le host n'a pas besoin d'être "prêt" - vérifie seulement les autres joueurs
    const allReady = players.length >= 1 && players.filter(p => p.user_id !== session?.host_id).every(p => p.is_ready);
    const playerCount = players.length;

    // État pour l'animation du parchemin de lore
    const [showScrollLore, setShowScrollLore] = useState(false);

    // Handler pour démarrer l'aventure avec animation
    const handleStartAdventure = () => {
        if (isHost && allReady) {
            setShowScrollLore(true);
        }
    };

    // Handler quand le parchemin est terminé
    const handleScrollComplete = () => {
        setShowScrollLore(false);
        onStart?.();
    };

    // Fonction de génération de personnage aléatoire (DEBUG)
    const handleCreateRandomCharacter = () => {
        if (!onCreateRandomCharacter) return;

        const classKeys = Object.keys(CLASSES);
        const randomClassKey = classKeys[Math.floor(Math.random() * classKeys.length)];
        const classData = CLASSES[randomClassKey];

        const subclassKeys = Object.keys(classData.subclasses || {});
        const randomSubclassKey = subclassKeys[Math.floor(Math.random() * subclassKeys.length)];
        const subclassData = classData.subclasses[randomSubclassKey];

        // Générer un nom aléatoire
        const namePrefixes = ['Ald', 'Thal', 'Kor', 'Mer', 'Sil', 'Var', 'Nor', 'Bel', 'Rav', 'Zan'];
        const nameSuffixes = ['ric', 'dor', 'in', 'a', 'us', 'or', 'an', 'os', 'ix', 'um'];
        const randomName = namePrefixes[Math.floor(Math.random() * namePrefixes.length)] +
                          nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];

        // Rouler les stats (4d6 drop lowest)
        const rollStat = () => {
            const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
            rolls.sort((a, b) => a - b);
            return rolls.slice(1).reduce((a, b) => a + b, 0);
        };

        const attributes = {
            str: rollStat(),
            dex: rollStat(),
            con: rollStat(),
            int: rollStat(),
            wis: rollStat(),
            cha: rollStat()
        };

        // Équipement aléatoire
        const equipmentOptions = classData.starting_equipment_options || [];
        const randomEquipmentIndex = Math.floor(Math.random() * equipmentOptions.length);
        const selectedEquipment = equipmentOptions[randomEquipmentIndex]?.items || [];

        // Capacités aléatoires (en choisir 2)
        const abilityOptions = classData.initial_ability_options || [];
        const shuffledAbilities = [...abilityOptions].sort(() => Math.random() - 0.5);
        const selectedAbilities = shuffledAbilities.slice(0, 2);

        const finalStats = { ...attributes };
        const hitDie = classData.hitDie || 8;
        const conMod = Math.floor((finalStats.con - 10) / 2);
        const maxHp = hitDie + 10 + (conMod * 2);

        const charData = {
            name: randomName,
            class: `${classData.label} (${subclassData?.label || '...'})`,
            mechanic: classData.mechanic,
            desc: classData.desc,
            stats: finalStats,
            gold: 100,
            abilities: selectedAbilities,
            equipment: selectedEquipment,
            hp: maxHp,
            maxHp: maxHp,
            resource: 100,
            max_resource: 100,
            inventory: [...selectedEquipment],
            portrait_url: classData.portrait,
            backstory: 'Généré aléatoirement (DEBUG)',
            life_path: { birth: '', childhood: '', adolescence: '', adult: '' },
            mechanical_traits: [],
            skill_bonuses: [],
            backstory_gm_context: 'Personnage généré via bouton debug',
            starting_reputation: {},
            visited_npcs: [],
            faction_ties: [],
            discovered_secrets: [],
            discovered_locations: [],
            active_quests: [],
            important_events: [],
            languages: []
        };

        onCreateRandomCharacter(charData);
    };

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
                                        {isHost && p.user_id !== character?.user_id && onKickPlayer && (
                                            <button
                                                className="kick-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onKickPlayer(p.id);
                                                }}
                                                title="Expulser le joueur"
                                                style={{
                                                    marginLeft: '10px',
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

                            {/* Bouton DEBUG - Personnage aléatoire */}
                            {onCreateRandomCharacter && !character?.class && (
                                <button
                                    className="btn-medieval btn-debug"
                                    onClick={handleCreateRandomCharacter}
                                    disabled={loading}
                                    title="DEBUG: Créer un personnage aléatoire"
                                >
                                    <span className="btn-icon">🎲</span>
                                    Personnage Aléatoire
                                </button>
                            )}

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
                                    onClick={handleStartAdventure}
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

            {/* Animation Parchemin de Lore */}
            <ScrollLore 
                isVisible={showScrollLore}
                onComplete={handleScrollComplete}
                isHost={isHost}
            />
        </>
    );
}
