import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { initCombat, playCard, endPlayerTurn, startNewPlayerTurn, restTurn, getEnemyIntention, getCurrentPlayer, getPlayer } from '../engine/CardCombatEngine.js';
import { itemToCard } from '../data/cards.js';
import './CardCombat.css';

// Inline simple dice component to avoid cross-chunk TDZ with Dice2D
const InlineDice = ({ die, value, onComplete }) => {
  const [display, setDisplay] = React.useState('?');
  const [done, setDone] = React.useState(false);
  const doneRef = React.useRef(false);

  React.useEffect(() => {
    let count = 0;
    const max = die === 'd20' ? 20 : 100;
    const interval = setInterval(() => {
      setDisplay(Math.floor(Math.random() * max) + 1);
      count++;
      if (count >= 20) {
        clearInterval(interval);
        setDisplay(value);
        setDone(true);
        if (!doneRef.current) {
          doneRef.current = true;
          setTimeout(() => onComplete && onComplete(), 800);
        }
      }
    }, 70);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line

  const isCrit = value >= (die === 'd20' ? 18 : 95);
  const isFail = value <= (die === 'd20' ? 2 : 5);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isCrit ? 'linear-gradient(135deg, #FFD700, #B8860B)' : isFail ? 'linear-gradient(135deg, #8B0000, #5c0000)' : 'linear-gradient(135deg, #2a2540, #0d0b18)',
        border: `3px solid ${isCrit ? '#FFD700' : isFail ? '#ff4444' : '#5a4a3a'}`,
        borderRadius: 16, fontSize: '2.5rem', fontWeight: 900, fontFamily: "'Cinzel Decorative', serif",
        color: isCrit ? '#1a0f08' : isFail ? '#ff6b6b' : '#e8dcc8',
        boxShadow: isCrit ? '0 0 30px rgba(255,215,0,0.5)' : '0 8px 20px rgba(0,0,0,0.5)',
        animation: done ? 'none' : 'spin 0.1s linear infinite',
        transition: 'all 0.3s ease',
      }}>
        {display}
      </div>
      <div style={{ color: '#888', fontSize: '0.7rem', letterSpacing: 2 }}>{die.toUpperCase()}</div>
      <style>{`@keyframes spin { 0%{transform:rotate(0deg) scale(0.95)} 50%{transform:rotate(5deg) scale(1)} 100%{transform:rotate(-5deg) scale(0.95)} }`}</style>
    </div>
  );
};

// ============================================================
// CARD THEMES
// ============================================================

const CARD_THEMES = {
  attack: { icon: '⚔️', accentColor: '#ff4444', gradTop: '#4a1515', gradBot: '#1a0808', border: '#8c3a3a', label: 'ATTAQUE' },
  skill:  { icon: '🛡️', accentColor: '#22c55e', gradTop: '#153a15', gradBot: '#081a08', border: '#3a8c3a', label: 'COMPÉTENCE' },
  power:  { icon: '✨', accentColor: '#60a5fa', gradTop: '#15203a', gradBot: '#08101a', border: '#3a5a8c', label: 'POUVOIR' },
  curse:  { icon: '💀', accentColor: '#a855f7', gradTop: '#2a1530', gradBot: '#150a18', border: '#6a3a7a', label: 'MALÉDICTION' },
  item:   { icon: '🧪', accentColor: '#f39c12', gradTop: '#3a2a10', gradBot: '#1a1508', border: '#8c6a2a', label: 'OBJET' },
};

// ============================================================
// CARD VIEW COMPONENT
// ============================================================

const CardView = ({ card, index, selected, canPlay, onClick }) => {
  const isItem = card.isItem || card.tags?.includes('item');
  const theme = isItem ? CARD_THEMES.item : (CARD_THEMES[card.type] || CARD_THEMES.attack);
  const cardIcon = isItem ? (card.itemIcon || '📦') : theme.icon;
  const cardLabel = isItem ? 'OBJET' : theme.label;
  const accentColor = isItem ? (card.itemRarityColor || theme.accentColor) : theme.accentColor;

  const effectSummary = card.effects.map(e => {
    switch (e.type) {
      case 'damage': return `⚔️${e.value}${e.target === 'all_enemies' ? '(tous)' : ''}`;
      case 'block': return `🛡️${e.value}`;
      case 'heal': return `💖${e.value}`;
      case 'draw': return `🃏+${e.value}`;
      case 'energy': return `⚡+${e.value}`;
      case 'poison': return `☠️${e.value}`;
      case 'weak': return `😵${e.value}`;
      case 'vulnerable': return `🎯${e.value}`;
      case 'strength': return `💪+${e.value}`;
      case 'dexterity': return `🏃+${e.value}`;
      default: return '';
    }
  }).filter(Boolean).join(' ');

  return (
    <div className={`cc-card ${selected ? 'selected' : ''} ${!canPlay ? 'unplayable' : ''}`} style={{ zIndex: index + 1 }} onClick={() => canPlay && onClick(index)}>
      <div className="cc-card-cost" style={{ background: `radial-gradient(circle, ${accentColor}, ${theme.border})` }}>
        {isItem ? '⟳' : (card.cost >= 0 ? card.cost : '✕')}
      </div>
      <div className="cc-card-inner" style={{
        background: `linear-gradient(180deg, ${theme.gradTop} 0%, ${theme.gradBot} 100%)`,
        borderColor: isItem ? accentColor : theme.border,
      }}>
        <div className="cc-card-type-label" style={{ color: accentColor }}>{cardLabel}</div>
        <div className="cc-card-name">{card.name}</div>
        <div className="cc-card-art" style={{ borderColor: `${accentColor}33` }}>
          <span className="cc-card-icon">{cardIcon}</span>
          {card.diceRoll && <span className="cc-card-dice-badge">🎲 {card.diceRoll.die}</span>}
        </div>
        <div className="cc-card-effects">{effectSummary}</div>
        <div className="cc-card-desc">{card.description}</div>
      </div>
      <div className={`cc-card-rarity ${card.rarity}`} />
      {card.exhaust && <div className="cc-card-exhaust">ÉPUISER</div>}
    </div>
  );
};

// ============================================================
// PLAYER PORTRAIT COMPONENT
// ============================================================

const PlayerPortrait = ({ player, isActive, isSelf, damagePopups }) => (
  <div className={`cc-player-area ${isActive ? 'active-player' : ''} ${player.dead ? 'dead' : ''}`}>
    <div className="cc-player-portrait" style={{ borderColor: isSelf ? '#d4af37' : '#3a5a8c' }}>
      {player.portrait_url
        ? <img src={player.portrait_url} alt={player.name} />
        : <div className="cc-player-token">{isSelf ? '⚔️' : '🛡️'}</div>
      }
      {player.block > 0 && <div className="cc-block-badge">{player.block}</div>}
      {damagePopups.filter(p => p.targetId === player.id).map(p => (
        <div key={p.id} className={`cc-damage-popup ${p.type} ${p.big ? 'big' : ''}`}>{p.type === 'heal' ? '+' : '-'}{p.amount}</div>
      ))}
    </div>
    <div className="cc-hp-bar">
      <div className={`cc-hp-fill player ${player.hp / player.maxHp < 0.25 ? 'critical' : ''}`} style={{ width: `${Math.max(0, (player.hp / player.maxHp) * 100)}%` }} />
      <div className="cc-hp-text">{player.hp}/{player.maxHp}</div>
    </div>
    <div className="cc-player-name" style={{ color: isSelf ? '#d4af37' : '#8bb8ff' }}>
      {player.name?.toUpperCase()} {isActive && '★'}
    </div>
    <div className="cc-status-row">
      {player.strength > 0 && <div className="cc-status-badge str">💪{player.strength}</div>}
      {player.dexterity > 0 && <div className="cc-status-badge dex">🏃{player.dexterity}</div>}
      {player.poison > 0 && <div className="cc-status-badge poison">☠️{player.poison}</div>}
      {player.weak > 0 && <div className="cc-status-badge weak">😵{player.weak}</div>}
    </div>
  </div>
);

// ============================================================
// MAIN CARD COMBAT COMPONENT
// ============================================================

const CardCombat = ({
  players, currentUserId, initialEnemies,
  classesData, gameTime, sessionId, supabaseClient,
  syncedCombatState, onUpdateCombatState,
  onCombatEnd, onGameOver, onRewards,
  onHPChange, onVFX, onSFX,
}) => {
  const [state, setState] = useState(null);
  const [shakingEnemyId, setShakingEnemyId] = useState(null);
  const [damagePopups, setDamagePopups] = useState([]);
  const [phaseBanner, setPhaseBanner] = useState(null);
  const [screenFlash, setScreenFlash] = useState(null);
  const [actionToast, setActionToast] = useState(null);
  const [showInventory, setShowInventory] = useState(false);
  const popupIdRef = useRef(0);
  const lastSyncRef = useRef(0);
  const isHost = useRef(false);
  const prevPhaseRef = useRef(null);

  // Am I the host? (first player or session host)
  useEffect(() => {
    isHost.current = players?.[0]?.user_id === currentUserId;
  }, [players, currentUserId]);

  // Find my player
  const myPlayerId = useMemo(() => {
    const me = players?.find(p => p.user_id === currentUserId);
    return me?.user_id || me?.id || currentUserId;
  }, [players, currentUserId]);

  // ============================================================
  // INIT COMBAT
  // ============================================================

  useEffect(() => {
    if (!players?.length || !initialEnemies?.length) return;

    // Enrich players with classData
    const enriched = players.map(p => {
      let classData = null;
      if (classesData && p.class) {
        const key = Object.keys(classesData).find(k =>
          classesData[k].name?.toLowerCase() === p.class?.toLowerCase() || k.toLowerCase() === p.class?.toLowerCase()
        );
        if (key) classData = classesData[key];
      }
      return { ...p, classData };
    });

    const initial = initCombat(enriched, initialEnemies, gameTime?.hour);
    setState(initial);

    // Sync initial state
    if (onUpdateCombatState) {
      onUpdateCombatState({ ...initial, active: true, updatedAt: Date.now() });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ============================================================
  // SUPABASE REALTIME SYNC
  // ============================================================

  useEffect(() => {
    if (!sessionId) return;

    const channel = supabaseClient
      ?.channel(`card_combat_${sessionId}`)
      .on('broadcast', { event: 'card_action' }, (payload) => {
        const action = payload.payload;
        if (!action || action.sourceUserId === currentUserId) return;

        // Apply remote state update
        if (action.type === 'state_sync' && action.state) {
          const remoteState = action.state;
          if (remoteState.updatedAt > lastSyncRef.current) {
            lastSyncRef.current = remoteState.updatedAt;
            setState(remoteState);
          }
        }
      })
      .subscribe();

    return () => { if (supabaseClient && channel) supabaseClient.removeChannel(channel); };
  }, [sessionId, currentUserId]);

  // Broadcast state to other players
  const broadcastState = useCallback((newState) => {
    if (!sessionId) return;
    const ts = Date.now();
    lastSyncRef.current = ts;

    supabaseClient?.channel(`card_combat_${sessionId}`)?.send({
      type: 'broadcast',
      event: 'card_action',
      payload: { type: 'state_sync', sourceUserId: currentUserId, state: { ...newState, updatedAt: ts } },
    });

    if (onUpdateCombatState) {
      onUpdateCombatState({ ...newState, active: true, updatedAt: ts });
    }
  }, [sessionId, currentUserId, onUpdateCombatState]);

  // ============================================================
  // ENEMY ANIMATION → NEW PLAYER TURN
  // ============================================================

  useEffect(() => {
    if (!state || state.phase !== 'enemy_animating') return;

    state.enemies.forEach((e, i) => {
      if (!e.dead) {
        setTimeout(() => { setShakingEnemyId(e.id); setTimeout(() => setShakingEnemyId(null), 400); }, i * 500);
      }
    });

    const delay = Math.max(1200, state.enemies.filter(e => !e.dead).length * 500 + 500);
    const timer = setTimeout(() => {
      const newState = startNewPlayerTurn(state);
      setState(newState);
      broadcastState(newState);
    }, delay);

    return () => clearTimeout(timer);
  }, [state?.phase, state?.turn]); // eslint-disable-line react-hooks/exhaustive-deps

  // ============================================================
  // HELPERS
  // ============================================================

  // Screen flash helper — MUST be before addDamagePopup (TDZ fix)
  const triggerFlash = useCallback((type) => {
    setScreenFlash(type);
    setTimeout(() => setScreenFlash(null), 300);
  }, []);

  // Toast helper
  const showToast = useCallback((playerName, text) => {
    setActionToast({ player: playerName, text });
    setTimeout(() => setActionToast(null), 3000);
  }, []);

  const addDamagePopup = useCallback((targetId, amount, type = 'damage') => {
    const id = ++popupIdRef.current;
    const big = amount >= 15;
    setDamagePopups(prev => [...prev, { id, targetId, amount, type, big }]);
    setTimeout(() => setDamagePopups(prev => prev.filter(p => p.id !== id)), 1200);

    if (type === 'damage') triggerFlash('damage');
    else if (type === 'heal') triggerFlash('heal');
    else if (type === 'block') triggerFlash('block');
  }, [triggerFlash]);

  // Phase banner trigger
  useEffect(() => {
    if (!state) return;
    const { phase } = state;
    if (phase === prevPhaseRef.current) return;
    prevPhaseRef.current = phase;

    if (phase === 'player') {
      const cp = getCurrentPlayer(state);
      if (cp?.id === myPlayerId) {
        setPhaseBanner({ text: '★ VOTRE TOUR', type: 'player-turn' });
      } else {
        setPhaseBanner({ text: `Tour de ${cp?.name || '...'}`, type: 'other-turn' });
      }
      setTimeout(() => setPhaseBanner(null), 2000);
    } else if (phase === 'enemy_animating') {
      setPhaseBanner({ text: '⚔️ TOUR ENNEMI', type: 'enemy-turn' });
      setTimeout(() => setPhaseBanner(null), 2000);
    }
  }, [state?.phase, state?.currentPlayerIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Is it MY turn?
  const isMyTurn = state?.phase === 'player' && state.players[state.currentPlayerIndex]?.id === myPlayerId;
  const currentPlayer = state ? getCurrentPlayer(state) : null;
  const myPlayerState = state ? getPlayer(state, myPlayerId) : null;
  const myPlayer = players?.find(p => p.user_id === currentUserId) || players?.[0]; // Original player with inventory

  // ============================================================
  // CARD HANDLERS
  // ============================================================

  const handleCardClick = useCallback((cardIndex) => {
    if (!state || !isMyTurn) return;
    const card = currentPlayer?.hand[cardIndex];
    if (!card || card.cost > currentPlayer.energy || card.cost < 0) return;

    if (card.needsTarget) {
      setState(prev => ({ ...prev, selectedCardIndex: cardIndex }));
    } else {
      const oldEnemies = state.enemies.map(e => ({ ...e }));
      let newState = playCard(state, cardIndex);

      // Item: auto-end turn
      const isItem = card.isItem || card.tags?.includes('item');
      if (isItem && newState.phase === 'player') {
        setTimeout(() => {
          const after = endPlayerTurn(newState);
          setState(after);
          broadcastState(after);
        }, 600);
        setState(newState);
        broadcastState(newState);
        return;
      }

      // VFX
      if (card.effects.some(e => e.type === 'block')) {
        if (onVFX) onVFX('shield', window.innerWidth * 0.2, window.innerHeight * 0.4, '#3b82f6');
        const blkEff = card.effects.find(e => e.type === 'block');
        if (blkEff) addDamagePopup(myPlayerId, blkEff.value + (myPlayerState?.dexterity || 0), 'block');
      }
      if (card.effects.some(e => e.type === 'heal')) {
        if (onVFX) onVFX('heal', window.innerWidth * 0.2, window.innerHeight * 0.4, '#22c55e');
        const healEff = card.effects.find(e => e.type === 'heal');
        if (healEff) addDamagePopup(myPlayerId, healEff.value, 'heal');
      }
      if (card.effects.some(e => e.target === 'all_enemies')) {
        newState.enemies.forEach((e, i) => {
          if (oldEnemies[i] && e.hp < oldEnemies[i].hp) addDamagePopup(e.id, oldEnemies[i].hp - e.hp);
        });
        if (onVFX) onVFX('fire', window.innerWidth * 0.7, window.innerHeight * 0.4, '#ff6600');
      }
      if (onSFX) onSFX('magic');
      setState(newState);
      broadcastState(newState);
    }
  }, [state, isMyTurn, currentPlayer, onVFX, onSFX, addDamagePopup, broadcastState]);

  const handleEnemyClick = useCallback((enemyIndex) => {
    if (!state || !isMyTurn || state.selectedCardIndex === null) return;
    const card = currentPlayer?.hand[state.selectedCardIndex];
    if (!card) return;

    if (card.diceRoll && !state.diceRoll) {
      const ns = playCard(state, state.selectedCardIndex, enemyIndex);
      setState(ns);
      return;
    }

    const oldEnemy = { ...state.enemies[enemyIndex] };
    const newState = playCard(state, state.selectedCardIndex, enemyIndex);
    const enemy = newState.enemies[enemyIndex];

    if (enemy && oldEnemy.hp > enemy.hp) {
      addDamagePopup(enemy.id, oldEnemy.hp - enemy.hp);
      setShakingEnemyId(enemy.id);
      setTimeout(() => setShakingEnemyId(null), 400);
      if (onVFX) onVFX('blood', window.innerWidth * 0.7, window.innerHeight * 0.4, '#ff0000');
      if (onSFX) onSFX('damage');
    }

    setState(newState);
    broadcastState(newState);
  }, [state, isMyTurn, currentPlayer, onVFX, onSFX, addDamagePopup, broadcastState]);

  const handleDiceComplete = useCallback(() => {
    if (!state?.diceRoll) return;
    const { cardIndex, targetIndex } = state.diceRoll;
    const oldEnemy = { ...state.enemies[targetIndex] };
    const newState = playCard(state, cardIndex, targetIndex);
    const enemy = newState.enemies[targetIndex];

    if (enemy && oldEnemy.hp > enemy.hp) {
      addDamagePopup(enemy.id, oldEnemy.hp - enemy.hp);
      if (onVFX) onVFX('magic', window.innerWidth * 0.7, window.innerHeight * 0.4, '#d4af37');
    }
    setState(newState);
    broadcastState(newState);
  }, [state, onVFX, addDamagePopup, broadcastState]);

  const handleEndTurn = useCallback(() => {
    if (!state || !isMyTurn) return;
    if (onSFX) onSFX('click');
    const oldHps = state.players.map(p => p.hp);
    const newState = endPlayerTurn(state);
    // Damage popups for players hit by enemies
    newState.players.forEach((p, i) => {
      if (p.hp < oldHps[i]) addDamagePopup(p.id, oldHps[i] - p.hp);
    });
    setState(newState);
    broadcastState(newState);
  }, [state, isMyTurn, onSFX, addDamagePopup, broadcastState]);

  const handleRest = useCallback(() => {
    if (!state || !isMyTurn) return;
    if (onSFX) onSFX('magic');
    const newState = restTurn(state);
    setState(newState);
    broadcastState(newState);
  }, [state, isMyTurn, onSFX, broadcastState]);

  const handleRewardPick = useCallback((card) => {
    if (onRewards) onRewards(state?.enemies || []);
    if (onCombatEnd) onCombatEnd({ victory: true });
  }, [state, onRewards, onCombatEnd]);

  // ============================================================
  // RENDER
  // ============================================================

  if (!state) return <div className="card-combat-viewport"><div style={{ color: '#888', textAlign: 'center', marginTop: '40vh' }}>Chargement du combat...</div></div>;

  const { enemies, turn, phase, log, selectedCardIndex, diceRoll, rewardCards } = state;
  const hand = isMyTurn && currentPlayer ? currentPlayer.hand : [];
  const energy = myPlayerState?.energy || 0;
  const maxEnergy = myPlayerState?.maxEnergy || 100;
  const resourceName = myPlayerState?.resourceName || 'Mana';

  return (
    <div className="card-combat-viewport">
      {/* Top Bar */}
      <div className="cc-top-bar">
        <div className="cc-turn-info">ROUND {turn}</div>
        <div style={{ color: isMyTurn ? '#d4af37' : '#888', fontSize: '0.75rem', fontWeight: 700 }}>
          {phase === 'player' ? (isMyTurn ? '★ VOTRE TOUR' : `Tour de ${currentPlayer?.name || '...'}`) : phase === 'enemy_animating' ? 'TOUR ENNEMI...' : ''}
        </div>
        <button className="cc-flee-btn" onClick={() => onCombatEnd?.({ victory: false, flight: true })}>FUIR</button>
      </div>

      {/* Battlefield */}
      <div className="cc-battlefield">
        {/* All Players */}
        <div className="cc-players-column">
          {state.players.map((p, i) => (
            <PlayerPortrait
              key={p.id}
              player={p}
              isActive={state.currentPlayerIndex === i && phase === 'player'}
              isSelf={p.id === myPlayerId}
              damagePopups={damagePopups}
            />
          ))}
        </div>

        {/* Enemies */}
        <div className="cc-enemies-area">
          {enemies.map((enemy, i) => {
            const intention = getEnemyIntention(enemy);
            const targetName = state.players.find(p => p.id === intention.targetPlayerId)?.name;
            return (
              <div key={enemy.id} className={`cc-enemy ${enemy.dead ? 'dead' : ''} ${selectedCardIndex !== null && !enemy.dead ? 'targetable' : ''} ${shakingEnemyId === enemy.id ? 'shake' : ''}`}
                onClick={() => handleEnemyClick(i)}>
                <div className="cc-intention">
                  <span>{intention.icon}</span>
                  {intention.type === 'attack' && <span className="cc-intention-value">{intention.value}</span>}
                  {targetName && <span style={{ fontSize: '0.55rem', color: '#aaa' }}>→{targetName}</span>}
                </div>
                <div className="cc-enemy-portrait">
                  {enemy.portrait_url ? <img src={enemy.portrait_url} alt={enemy.name} onError={e => { e.target.style.display = 'none'; }} /> : null}
                  <div className="cc-enemy-token" style={{ display: enemy.portrait_url ? 'none' : 'flex' }}>👹</div>
                  {enemy.block > 0 && <div className="cc-block-badge">{enemy.block}</div>}
                  {damagePopups.filter(p => p.targetId === enemy.id).map(p => (
                    <div key={p.id} className={`cc-damage-popup ${p.type} ${p.big ? 'big' : ''}`}>{p.type === 'heal' ? '+' : '-'}{p.amount}</div>
                  ))}
                </div>
                <div className="cc-hp-bar" style={{ width: 100 }}>
                  <div className="cc-hp-fill enemy" style={{ width: `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%` }} />
                  <div className="cc-hp-text">{enemy.hp}/{enemy.maxHp}</div>
                </div>
                <div className="cc-enemy-name">{enemy.name?.toUpperCase()}</div>
                {enemy.poison > 0 && <div style={{ color: '#a855f7', fontSize: '0.5rem' }}>☠️{enemy.poison}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Log */}
      <div className="cc-log">
        {log.slice(-15).map((entry, i) => <div key={i} className="cc-log-entry">{entry}</div>)}
      </div>

      {/* Hand */}
      <div className="cc-hand-area">
        <div className="cc-deck-pile">
          <div className="cc-pile-count">{myPlayerState?.deck?.length || 0}</div>
          <div>PIOCHE</div>
        </div>

        <div className="cc-hand">
          {isMyTurn ? hand.map((card, i) => (
            <CardView key={card.id + '_' + i} card={card} index={i} selected={selectedCardIndex === i}
              canPlay={isMyTurn && card.cost >= 0 && card.cost <= energy}
              onClick={handleCardClick} />
          )) : (
            <div style={{ color: '#666', fontSize: '0.8rem', padding: '40px', letterSpacing: 2 }}>
              {phase === 'player' ? `En attente de ${currentPlayer?.name || '...'}...` : 'Tour ennemi...'}
            </div>
          )}
        </div>

        <div className="cc-discard-pile">
          <div className="cc-pile-count">{myPlayerState?.discard?.length || 0}</div>
          <div>DÉFAUSSE</div>
        </div>

        <div className="cc-energy">
          <div className="cc-resource-bar-wrap">
            <div className="cc-resource-label">{resourceName}</div>
            <div className="cc-resource-bar">
              <div className="cc-resource-fill" style={{ width: `${(energy / maxEnergy) * 100}%` }} />
              <div className="cc-resource-text">{energy}/{maxEnergy}</div>
            </div>
          </div>
        </div>

        <div className="cc-action-buttons">
          <button className="cc-rest-btn" onClick={() => setShowInventory(!showInventory)} title="Inventaire">🎒</button>
          <button className="cc-rest-btn" onClick={handleRest} disabled={!isMyTurn}>😴 REPOS</button>
          <button className="cc-end-turn" onClick={handleEndTurn} disabled={!isMyTurn}>⚔️ FIN DE TOUR</button>
        </div>
      </div>

      {/* Inventory Overlay */}
      {showInventory && (
        <div className="cc-inventory-overlay" onClick={() => setShowInventory(false)}>
          <div className="cc-inventory-panel" onClick={e => e.stopPropagation()}>
            <div className="cc-inventory-header">
              <span>🎒 INVENTAIRE</span>
              <button onClick={() => setShowInventory(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>
            <div className="cc-inventory-list">
              {(myPlayer?.inventory || []).map((item, idx) => {
                const isConsumable = ['potion', 'scroll', 'food', 'bomb', 'consumable'].includes((item.type || '').toLowerCase());
                const isEquipped = item.equipped;
                return (
                  <div key={idx} className={`cc-inv-item ${isEquipped ? 'equipped' : ''}`}>
                    <div className="cc-inv-item-info">
                      <span className="cc-inv-item-name">{item.name}</span>
                      {item.stats && (
                        <span className="cc-inv-item-stats">
                          {Object.entries(item.stats).map(([k, v]) => v ? `${k}:${v > 0 ? '+' : ''}${v}` : '').filter(Boolean).join(' ')}
                        </span>
                      )}
                    </div>
                    <div className="cc-inv-item-actions">
                      {isEquipped && <span className="cc-inv-equipped-badge">ÉQUIPÉ</span>}
                      {isConsumable && isMyTurn && (
                        <button className="cc-inv-use-btn" onClick={() => {
                          setShowInventory(false);
                          // Convert item to card and auto-play it
                          const card = itemToCard(item, idx);
                          if (card && state) {
                            // Add card to hand and play it
                            const pIdx = state.currentPlayerIndex;
                            let newState = { ...state };
                            const p = { ...newState.players[pIdx] };
                            p.hand = [...p.hand, card];
                            newState.players = newState.players.map((pl, i) => i === pIdx ? p : pl);
                            // Play the last card (the item we just added)
                            const result = playCard(newState, p.hand.length - 1);
                            setState(result);
                            broadcastState(result);
                            // Auto end turn (items consume turn)
                            setTimeout(() => {
                              const after = endPlayerTurn(result);
                              setState(after);
                              broadcastState(after);
                            }, 600);
                          }
                        }}>Utiliser</button>
                      )}
                    </div>
                  </div>
                );
              })}
              {(!myPlayer?.inventory || myPlayer.inventory.length === 0) && (
                <div style={{ color: '#666', textAlign: 'center', padding: 20 }}>Inventaire vide</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Phase Banner */}
      {phaseBanner && (
        <div className={`cc-phase-banner ${phaseBanner.type}`}>{phaseBanner.text}</div>
      )}

      {/* Screen Flash */}
      {screenFlash && <div className={`cc-screen-flash ${screenFlash}`} />}

      {/* Action Toast (multi-player) */}
      {actionToast && (
        <div className="cc-action-toast">
          <span className="toast-player">{actionToast.player}</span>
          <span className="toast-text">{actionToast.text}</span>
        </div>
      )}

      {/* Targeting Hint */}
      {selectedCardIndex !== null && phase === 'player' && isMyTurn && (
        <div className="cc-targeting-hint">🎯 Choisir une cible</div>
      )}

      {/* Dice */}
      {diceRoll?.active && (
        <div className="cc-dice-overlay"><InlineDice die={diceRoll.die} value={diceRoll.result} onComplete={handleDiceComplete} /></div>
      )}

      {/* Victory */}
      {phase === 'victory' && (
        <div className="cc-reward-overlay">
          <div className="cc-reward-title">VICTOIRE !</div>
          <div style={{ color: '#aaa', marginBottom: 24, fontSize: '0.8rem' }}>Vous avez vaincu vos ennemis !</div>
          <button className="cc-end-turn" style={{ marginTop: 16 }} onClick={() => {
            if (onRewards) onRewards(state?.enemies || []);
            if (onCombatEnd) onCombatEnd({ victory: true });
          }}>CONTINUER</button>
        </div>
      )}

      {/* Defeat */}
      {phase === 'defeat' && (
        <div className="cc-defeat-overlay">
          <div className="cc-defeat-title">DÉFAITE</div>
          <button className="cc-flee-btn" style={{ marginTop: 24, fontSize: '1rem', padding: '12px 32px' }} onClick={() => onGameOver?.()}>RECOMMENCER</button>
        </div>
      )}
    </div>
  );
};

export default CardCombat;
