import React, { useState, useEffect, useRef, useCallback } from 'react';
import { initCombat, playCard, endPlayerTurn, startNewPlayerTurn, getEnemyIntention } from '../engine/CardCombatEngine';
import { Dice2D } from './Dice2D';
import './CardCombat.css';

// ============================================================
// CARD COMPONENT
// ============================================================

const CARD_THEMES = {
  attack: { icon: '⚔️', accentColor: '#ff4444', gradTop: '#4a1515', gradBot: '#1a0808', border: '#8c3a3a', label: 'ATTAQUE' },
  skill:  { icon: '🛡️', accentColor: '#22c55e', gradTop: '#153a15', gradBot: '#081a08', border: '#3a8c3a', label: 'COMPÉTENCE' },
  power:  { icon: '✨', accentColor: '#60a5fa', gradTop: '#15203a', gradBot: '#08101a', border: '#3a5a8c', label: 'POUVOIR' },
  curse:  { icon: '💀', accentColor: '#a855f7', gradTop: '#2a1530', gradBot: '#150a18', border: '#6a3a7a', label: 'MALÉDICTION' },
};

const CardView = ({ card, index, selected, canPlay, onClick }) => {
  const theme = CARD_THEMES[card.type] || CARD_THEMES.attack;

  // Build effect summary text
  const effectSummary = card.effects.map(e => {
    switch (e.type) {
      case 'damage': return `⚔️ ${e.value} ${e.target === 'all_enemies' ? '(tous)' : ''}`;
      case 'block': return `🛡️ ${e.value}`;
      case 'heal': return `💖 ${e.value}`;
      case 'draw': return `🃏 +${e.value}`;
      case 'energy': return `⚡ +${e.value}`;
      case 'poison': return `☠️ ${e.value}`;
      case 'weak': return `😵 ${e.value}`;
      case 'vulnerable': return `🎯 ${e.value}`;
      case 'strength': return `💪 +${e.value}`;
      case 'dexterity': return `🏃 +${e.value}`;
      default: return '';
    }
  }).filter(Boolean).join('  ');

  return (
    <div
      className={`cc-card ${selected ? 'selected' : ''} ${!canPlay ? 'unplayable' : ''}`}
      style={{ zIndex: index + 1, '--accent': theme.accentColor }}
      onClick={() => canPlay && onClick(index)}
    >
      {/* Energy cost orb */}
      <div className="cc-card-cost" style={{ background: `radial-gradient(circle, ${theme.accentColor}, ${theme.border})` }}>
        {card.cost >= 0 ? card.cost : '✕'}
      </div>

      <div className="cc-card-inner" style={{
        background: `linear-gradient(180deg, ${theme.gradTop} 0%, ${theme.gradBot} 100%)`,
        borderColor: theme.border,
      }}>
        {/* Type label */}
        <div className="cc-card-type-label" style={{ color: theme.accentColor }}>{theme.label}</div>

        {/* Card name */}
        <div className="cc-card-name">{card.name}</div>

        {/* Art area with icon */}
        <div className="cc-card-art" style={{ borderColor: `${theme.accentColor}33` }}>
          <span className="cc-card-icon">{theme.icon}</span>
          {card.diceRoll && <span className="cc-card-dice-badge">🎲 {card.diceRoll.die}</span>}
        </div>

        {/* Effect numbers - big visible feedback */}
        <div className="cc-card-effects">{effectSummary}</div>

        {/* Description */}
        <div className="cc-card-desc">{card.description}</div>
      </div>

      {/* Rarity gem */}
      <div className={`cc-card-rarity ${card.rarity}`} />

      {/* Exhaust indicator */}
      {card.exhaust && <div className="cc-card-exhaust">ÉPUISER</div>}
    </div>
  );
};

// ============================================================
// MAIN CARD COMBAT COMPONENT
// ============================================================

export const CardCombat = ({
  players, currentUserId, initialEnemies,
  classesData,
  onCombatEnd, onGameOver, onRewards,
  onHPChange, onVFX, onSFX,
}) => {
  const [state, setState] = useState(null);
  const [shakingEnemyId, setShakingEnemyId] = useState(null);
  const [damagePopups, setDamagePopups] = useState([]);
  const popupIdRef = useRef(0);
  const enemyTurnTimerRef = useRef(null);

  // Find current player
  const myPlayer = players?.find(p => p.user_id === currentUserId) || players?.[0];

  // Init combat on mount — inject classData for proper deck building
  useEffect(() => {
    if (!myPlayer || !initialEnemies?.length) return;

    // Find class data from CLASSES to get initial_ability_options + unlockables + subclasses
    let classData = null;
    if (classesData && myPlayer.class) {
      const classKey = Object.keys(classesData).find(k =>
        classesData[k].name?.toLowerCase() === myPlayer.class?.toLowerCase() ||
        k.toLowerCase() === myPlayer.class?.toLowerCase()
      );
      if (classKey) classData = classesData[classKey];
    }

    const playerWithClassData = { ...myPlayer, classData };
    const initial = initCombat(playerWithClassData, initialEnemies);
    setState(initial);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle enemy animation phase → start new player turn
  useEffect(() => {
    if (!state || state.phase !== 'enemy_animating') return;

    // Shake enemies during their turn
    state.enemies.forEach((e, i) => {
      if (!e.dead) {
        setTimeout(() => {
          setShakingEnemyId(e.id);
          setTimeout(() => setShakingEnemyId(null), 400);
        }, i * 600);
      }
    });

    // After all enemy animations, start new player turn
    const delay = Math.max(1000, state.enemies.filter(e => !e.dead).length * 600 + 500);
    enemyTurnTimerRef.current = setTimeout(() => {
      if (state.phase === 'enemy_animating') {
        const newState = startNewPlayerTurn(state);
        setState(newState);
      }
    }, delay);

    return () => clearTimeout(enemyTurnTimerRef.current);
  }, [state?.phase, state?.turn]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync HP to parent
  useEffect(() => {
    if (!state || !myPlayer) return;
    if (onHPChange) onHPChange(myPlayer.id, state.player.hp);
  }, [state?.player?.hp]); // eslint-disable-line react-hooks/exhaustive-deps

  // ============================================================
  // HANDLERS
  // ============================================================

  const addDamagePopup = useCallback((targetId, amount, type = 'damage') => {
    const id = ++popupIdRef.current;
    setDamagePopups(prev => [...prev, { id, targetId, amount, type }]);
    setTimeout(() => setDamagePopups(prev => prev.filter(p => p.id !== id)), 1000);
  }, []);

  const handleCardClick = useCallback((cardIndex) => {
    if (!state || state.phase !== 'player') return;
    const card = state.hand[cardIndex];
    if (!card || card.cost > state.player.energy || card.cost < 0) return;

    if (card.needsTarget) {
      // Select card, wait for target click
      setState(prev => ({ ...prev, selectedCardIndex: cardIndex }));
    } else {
      // Play immediately (no target needed)
      const oldEnemies = state.enemies.map(e => ({ ...e }));
      const newState = playCard(state, cardIndex);

      // Trigger VFX for block/heal
      if (card.effects.some(e => e.type === 'block')) {
        if (onVFX) onVFX('shield', window.innerWidth * 0.25, window.innerHeight * 0.4, '#3b82f6');
      }
      if (card.effects.some(e => e.type === 'heal')) {
        if (onVFX) onVFX('heal', window.innerWidth * 0.25, window.innerHeight * 0.4, '#22c55e');
      }
      // AoE damage
      if (card.effects.some(e => e.target === 'all_enemies')) {
        newState.enemies.forEach((e, i) => {
          if (oldEnemies[i] && e.hp < oldEnemies[i].hp) {
            addDamagePopup(e.id, oldEnemies[i].hp - e.hp);
            setShakingEnemyId(e.id);
            setTimeout(() => setShakingEnemyId(null), 400);
          }
        });
        if (onVFX) onVFX('fire', window.innerWidth * 0.7, window.innerHeight * 0.4, '#ff6600');
      }

      if (onSFX) onSFX('magic');
      setState(newState);
    }
  }, [state, onVFX, onSFX, addDamagePopup]);

  const handleEnemyClick = useCallback((enemyIndex) => {
    if (!state || state.phase !== 'player') return;

    if (state.selectedCardIndex !== null) {
      const card = state.hand[state.selectedCardIndex];
      if (!card) return;

      // Check for dice roll
      if (card.diceRoll && !state.diceRoll) {
        const newState = playCard(state, state.selectedCardIndex, enemyIndex);
        setState(newState); // This sets diceRoll active
        return;
      }

      const oldEnemy = { ...state.enemies[enemyIndex] };
      const newState = playCard(state, state.selectedCardIndex, enemyIndex);

      // VFX + damage popup
      const enemy = newState.enemies[enemyIndex];
      if (enemy && oldEnemy.hp > enemy.hp) {
        const dmg = oldEnemy.hp - enemy.hp;
        addDamagePopup(enemy.id, dmg);
        setShakingEnemyId(enemy.id);
        setTimeout(() => setShakingEnemyId(null), 400);
        if (onVFX) onVFX(card.type === 'attack' ? 'blood' : 'magic', window.innerWidth * 0.7, window.innerHeight * 0.4, '#ff0000');
        if (onSFX) onSFX('damage');
      }

      setState(newState);
    }
  }, [state, onVFX, onSFX, addDamagePopup]);

  const handleDiceComplete = useCallback(() => {
    if (!state?.diceRoll) return;
    const { cardIndex, targetIndex } = state.diceRoll;

    const oldEnemy = { ...state.enemies[targetIndex] };
    const newState = playCard(state, cardIndex, targetIndex);

    const enemy = newState.enemies[targetIndex];
    if (enemy && oldEnemy.hp > enemy.hp) {
      addDamagePopup(enemy.id, oldEnemy.hp - enemy.hp);
      setShakingEnemyId(enemy.id);
      setTimeout(() => setShakingEnemyId(null), 400);
      if (onVFX) onVFX('magic', window.innerWidth * 0.7, window.innerHeight * 0.4, '#d4af37');
      if (onSFX) onSFX('damage');
    }

    setState(newState);
  }, [state, onVFX, onSFX, addDamagePopup]);

  const handleEndTurn = useCallback(() => {
    if (!state || state.phase !== 'player') return;
    if (onSFX) onSFX('click');

    // Calculate damage from enemies for popups
    const oldPlayerHp = state.player.hp;
    const newState = endPlayerTurn(state);

    if (newState.player.hp < oldPlayerHp) {
      addDamagePopup('player', oldPlayerHp - newState.player.hp);
      if (onVFX) onVFX('blood', window.innerWidth * 0.25, window.innerHeight * 0.4, '#ff0000');
    }

    setState(newState);
  }, [state, onSFX, onVFX, addDamagePopup]);

  const handleRewardPick = useCallback((card) => {
    if (!state) return;
    // Add card to deck (will be in discard pile for next combat)
    setState(prev => ({
      ...prev,
      discard: [...prev.discard, card],
      phase: 'victory',
    }));
    // Trigger combat end
    if (onRewards) onRewards(state.enemies);
    if (onCombatEnd) onCombatEnd({ victory: true });
  }, [state, onRewards, onCombatEnd]);

  const handleSkipReward = useCallback(() => {
    if (onRewards) onRewards(state?.enemies || []);
    if (onCombatEnd) onCombatEnd({ victory: true });
  }, [state, onRewards, onCombatEnd]);

  // ============================================================
  // RENDER
  // ============================================================

  if (!state) return <div className="card-combat-viewport"><div style={{ color: '#888', textAlign: 'center', marginTop: '40vh' }}>Chargement du combat...</div></div>;

  const { player, enemies, hand, deck, discard, turn, phase, log, selectedCardIndex, diceRoll, rewardCards } = state;

  return (
    <div className="card-combat-viewport">
      {/* Top Bar */}
      <div className="cc-top-bar">
        <div className="cc-turn-info">TOUR {turn}</div>
        <div style={{ color: '#888', fontSize: '0.7rem' }}>
          {phase === 'player' ? 'VOTRE TOUR' : phase === 'enemy_animating' ? 'TOUR ENNEMI...' : ''}
        </div>
        <button className="cc-flee-btn" onClick={() => onCombatEnd?.({ victory: false, flight: true })}>FUIR</button>
      </div>

      {/* Battlefield */}
      <div className="cc-battlefield">
        {/* Player */}
        <div className="cc-player-area">
          <div className="cc-player-portrait">
            {myPlayer?.portrait_url
              ? <img src={myPlayer.portrait_url} alt={myPlayer.name} />
              : <div className="cc-player-token">⚔️</div>
            }
            {player.block > 0 && <div className="cc-block-badge">{player.block}</div>}
            {damagePopups.filter(p => p.targetId === 'player').map(p => (
              <div key={p.id} className={`cc-damage-popup ${p.type}`}>-{p.amount}</div>
            ))}
          </div>
          <div className="cc-hp-bar">
            <div className="cc-hp-fill player" style={{ width: `${(player.hp / player.maxHp) * 100}%` }} />
            <div className="cc-hp-text">{player.hp} / {player.maxHp}</div>
          </div>
          <div className="cc-player-name">{myPlayer?.name?.toUpperCase() || 'JOUEUR'}</div>
          {/* Status effects panel */}
          <div className="cc-status-row">
            {player.strength > 0 && <div className="cc-status-badge str">💪 {player.strength}</div>}
            {player.dexterity > 0 && <div className="cc-status-badge dex">🏃 {player.dexterity}</div>}
            {player.poison > 0 && <div className="cc-status-badge poison">☠️ {player.poison}</div>}
            {player.weak > 0 && <div className="cc-status-badge weak">😵 {player.weak}</div>}
            {player.vulnerable > 0 && <div className="cc-status-badge vuln">🎯 {player.vulnerable}</div>}
          </div>
        </div>

        {/* Enemies */}
        <div className="cc-enemies-area">
          {enemies.map((enemy, i) => {
            const intention = getEnemyIntention(enemy);
            return (
              <div
                key={enemy.id}
                className={`cc-enemy ${enemy.dead ? 'dead' : ''} ${selectedCardIndex !== null && !enemy.dead ? 'targetable' : ''} ${shakingEnemyId === enemy.id ? 'shake' : ''}`}
                onClick={() => handleEnemyClick(i)}
              >
                <div className="cc-intention">
                  <span>{intention.icon}</span>
                  {intention.type === 'attack' && <span className="cc-intention-value">{intention.value}</span>}
                  {intention.type === 'block' && <span style={{ color: '#3b82f6' }}>{intention.value}</span>}
                </div>
                <div className="cc-enemy-portrait">
                  {enemy.portrait_url
                    ? <img src={enemy.portrait_url} alt={enemy.name} onError={(e) => { e.target.style.display = 'none'; }} />
                    : null
                  }
                  <div className="cc-enemy-token" style={{ display: enemy.portrait_url ? 'none' : 'flex' }}>👹</div>
                  {enemy.block > 0 && <div className="cc-block-badge">{enemy.block}</div>}
                  {damagePopups.filter(p => p.targetId === enemy.id).map(p => (
                    <div key={p.id} className={`cc-damage-popup ${p.type}`}>-{p.amount}</div>
                  ))}
                </div>
                <div className="cc-hp-bar" style={{ width: 100 }}>
                  <div className="cc-hp-fill enemy" style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }} />
                  <div className="cc-hp-text">{enemy.hp} / {enemy.maxHp}</div>
                </div>
                <div className="cc-enemy-name">{enemy.name?.toUpperCase()}</div>
                {enemy.poison > 0 && <div style={{ color: '#a855f7', fontSize: '0.55rem' }}>☠️ {enemy.poison}</div>}
                {enemy.weak > 0 && <div style={{ color: '#fbbf24', fontSize: '0.55rem' }}>😵 {enemy.weak}</div>}
                {enemy.vulnerable > 0 && <div style={{ color: '#f87171', fontSize: '0.55rem' }}>🎯 {enemy.vulnerable}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Combat Log */}
      <div className="cc-log">
        {log.slice(-12).map((entry, i) => (
          <div key={i} className="cc-log-entry">{entry}</div>
        ))}
      </div>

      {/* Hand of Cards */}
      <div className="cc-hand-area">
        <div className="cc-deck-pile">
          <div className="cc-pile-count">{deck.length}</div>
          <div>PIOCHE</div>
        </div>

        <div className="cc-hand">
          {hand.map((card, i) => (
            <CardView
              key={card.id + '_' + i}
              card={card}
              index={i}
              selected={selectedCardIndex === i}
              canPlay={phase === 'player' && card.cost >= 0 && card.cost <= player.energy}
              onClick={handleCardClick}
            />
          ))}
        </div>

        <div className="cc-discard-pile">
          <div className="cc-pile-count">{discard.length}</div>
          <div>DÉFAUSSE</div>
        </div>

        {/* Energy Orb */}
        <div className="cc-energy">
          <div className="cc-energy-orb">{player.energy}/{player.maxEnergy}</div>
        </div>

        {/* End Turn Button */}
        <button
          className="cc-end-turn"
          onClick={handleEndTurn}
          disabled={phase !== 'player'}
        >
          FIN DE TOUR
        </button>
      </div>

      {/* Dice Roll Overlay */}
      {diceRoll?.active && (
        <div className="cc-dice-overlay">
          <Dice2D type={diceRoll.die} value={diceRoll.result} onComplete={handleDiceComplete} />
        </div>
      )}

      {/* Victory / Reward Screen */}
      {phase === 'victory' && rewardCards.length > 0 && (
        <div className="cc-reward-overlay">
          <div className="cc-reward-title">VICTOIRE !</div>
          <div style={{ color: '#aaa', marginBottom: 24, fontSize: '0.8rem' }}>Choisissez une carte à ajouter</div>
          <div className="cc-reward-cards">
            {rewardCards.map((card, i) => (
              <CardView
                key={card.id}
                card={card}
                index={i}
                selected={false}
                canPlay={true}
                onClick={() => handleRewardPick(card)}
              />
            ))}
          </div>
          <button className="cc-skip-btn" onClick={handleSkipReward}>PASSER</button>
        </div>
      )}

      {/* Defeat Screen */}
      {phase === 'defeat' && (
        <div className="cc-defeat-overlay">
          <div className="cc-defeat-title">DÉFAITE</div>
          <button
            className="cc-flee-btn"
            style={{ marginTop: 24, fontSize: '1rem', padding: '12px 32px' }}
            onClick={() => onGameOver?.()}
          >
            RECOMMENCER
          </button>
        </div>
      )}
    </div>
  );
};

export default CardCombat;
