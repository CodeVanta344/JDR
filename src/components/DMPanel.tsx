/**
 * DMPanel - LIVRE DU MAÎTRE DU JEU
 * Interface narrative structurée en livre de campagne
 * avec carte interactive temps réel
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { dmAssistant } from '../services/dm-assistant';
import type { NPC, Encounter } from '../services/dm-assistant';
import { ALL_RESOURCES } from '../lore/resources';
import { gatheringSystem } from '../lore/gathering-system';
import { RANDOM_ENCOUNTERS } from '../lore/encounters';
import { TAVERNS_AND_LOCATIONS } from '../lore/locations';
import { EQUIPMENT_RULES, rollDice } from '../lore/rules';
import { GM_BOOK, MAP_LOCATIONS, findScene, findChapter, getAllScenes } from '../lore/gm-book-data';
import type { BookScene, BookChapter, BookAct, GMNote } from '../lore/gm-book-data';
import AethelgardMap from './AethelgardMap';
import './DMPanel.css';

// ============================================================================
// LOCAL TYPES (not exported from gm-book-data)
// ============================================================================

interface SessionNoteLocal {
  id: string;
  timestamp: number;
  category: 'event' | 'npc' | 'combat' | 'loot' | 'decision' | 'secret' | 'todo';
  content: string;
  pinned: boolean;
}

interface DiceResultLocal {
  expression: string;
  rolls: number[];
  total: number;
  isCritical: boolean;
  isFumble: boolean;
  timestamp: number;
  label?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

// ============================================================================
// PROPS
// ============================================================================

interface DMPanelProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: {
    location: string;
    players: Array<{
      class: string;
      level: number;
      name: string;
      user_id: string;
      mechanical_traits?: Array<{ name: string; effect?: string; desc?: string; game_effect?: string }>;
      skill_bonuses?: Array<{ skillId: string; bonus?: number; reason?: string } | string>;
    }>;
    history: string[];
    lore: any;
  };
  onSpawnNPC: (npc: NPC) => void;
  onTriggerCombat?: (encounter: Encounter) => void;
  onGiveItems?: (playerId: string, items: any[]) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const NOTE_CATEGORIES = [
  { id: 'event' as const, label: 'Événement', icon: '📌', color: '#d4af37' },
  { id: 'npc' as const, label: 'PNJ', icon: '🎭', color: '#8b7355' },
  { id: 'combat' as const, label: 'Combat', icon: '⚔️', color: '#ff4444' },
  { id: 'loot' as const, label: 'Butin', icon: '💎', color: '#5dff98' },
  { id: 'decision' as const, label: 'Décision', icon: '⚖️', color: '#ffd93d' },
  { id: 'secret' as const, label: 'Secret', icon: '🔒', color: '#ff8c42' },
  { id: 'todo' as const, label: 'À faire', icon: '📋', color: '#6c9bff' },
];

const GM_NOTE_STYLES: Record<string, { icon: string; borderColor: string; bgColor: string }> = {
  info: { icon: 'ℹ️', borderColor: '#6c9bff', bgColor: 'rgba(108,155,255,0.08)' },
  warning: { icon: '⚠️', borderColor: '#ff8c42', bgColor: 'rgba(255,140,66,0.08)' },
  secret: { icon: '🔒', borderColor: '#9b59b6', bgColor: 'rgba(155,89,182,0.08)' },
  tip: { icon: '💡', borderColor: '#5dff98', bgColor: 'rgba(93,255,152,0.08)' },
  lore: { icon: '📜', borderColor: '#d4af37', bgColor: 'rgba(212,175,55,0.08)' },
};

type MainView = 'book' | 'map' | 'tools' | 'notes';

// ============================================================================
// COMPONENT
// ============================================================================

export function DMPanel({ isOpen, onClose, gameState, onSpawnNPC, onTriggerCombat, onGiveItems }: DMPanelProps) {
  // --- Navigation state ---
  const [mainView, setMainView] = useState<MainView>('book');
  const [currentActIndex, setCurrentActIndex] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMapOverlay, setShowMapOverlay] = useState(false);

  // --- Map state ---
  const [partyLocation, setPartyLocation] = useState('sol-aureus');
  const [visitedLocations, setVisitedLocations] = useState<string[]>(['sol-aureus']);

  // --- Session state ---
  const [sessionNotes, setSessionNotes] = useState<SessionNoteLocal[]>(() => {
    try { const s = localStorage.getItem('dm-session-notes'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [noteInput, setNoteInput] = useState('');
  const [noteCategory, setNoteCategory] = useState<SessionNoteLocal['category']>('event');

  // --- Dice ---
  const [diceHistory, setDiceHistory] = useState<DiceResultLocal[]>([]);
  const [customDice, setCustomDice] = useState('1d100');

  // --- Chat ---
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- Generation state ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedNPCs, setGeneratedNPCs] = useState<NPC[]>([]);

  // --- Faction Reputation ---
  const [factionReputation, setFactionReputation] = useState<Record<string, number>>(() => {
    try { const s = localStorage.getItem('dm-faction-rep'); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });

  // --- Choice History ---
  const [choiceHistory, setChoiceHistory] = useState<Array<{
    sceneId: string;
    choiceId: string;
    optionLabel: string;
    timestamp: number;
    consequences: string;
    reputationChanges?: Array<{ faction: string; amount: number }>;
  }>>(() => {
    try { const s = localStorage.getItem('dm-choice-history'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [lastChoiceFlash, setLastChoiceFlash] = useState<string | null>(null);

  // --- Timer ---
  const [sessionStartTime] = useState(Date.now());
  const [sessionTime, setSessionTime] = useState('00:00:00');

  // --- Encounter ---
  const [currentEncounter, setCurrentEncounter] = useState<string | null>(null);
  const [encounterType, setEncounterType] = useState<keyof typeof RANDOM_ENCOUNTERS>('road');

  // --- Effects ---
  useEffect(() => {
    if (isOpen && gameState.lore) dmAssistant.loadLoreContext(gameState.lore).catch(console.error);
  }, [isOpen, gameState.lore]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);
  useEffect(() => { localStorage.setItem('dm-session-notes', JSON.stringify(sessionNotes)); }, [sessionNotes]);
  useEffect(() => { localStorage.setItem('dm-faction-rep', JSON.stringify(factionReputation)); }, [factionReputation]);
  useEffect(() => { localStorage.setItem('dm-choice-history', JSON.stringify(choiceHistory)); }, [choiceHistory]);

  const FACTION_NAMES: Record<string, string> = {
    'garde-royale': 'Garde Royale',
    'aube-argent': "Aube d'Argent",
    'guilde-arcanes': 'Guilde des Arcanes',
    'cercle-des-cendres': 'Cercle des Cendres',
    'gardiens-emeraude': "Gardiens d'Émeraude",
    'syndicat-ombre': "Syndicat de l'Ombre",
    'conseil-marchands': 'Conseil des Marchands',
    'nains-coeur-fer': 'Nains Cœur-de-Fer',
    'pirates-orages': 'Pirates des Orages',
    'peuple-libre': 'Peuple Libre',
    'temple-solarius': 'Temple de Solarius',
  };
  const factionName = (id: string) => FACTION_NAMES[id] || id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const addChatMessage = (role: ChatMessage['role'], content: string) => {
    setChatMessages(prev => [...prev, { role, content, timestamp: Date.now() }]);
  };

  const addNote = useCallback((content?: string, cat?: SessionNoteLocal['category']) => {
    const text = content || noteInput.trim();
    if (!text) return;
    setSessionNotes(prev => [{ id: `n-${Date.now()}`, timestamp: Date.now(), category: cat || noteCategory, content: text, pinned: false }, ...prev]);
    if (!content) setNoteInput('');
  }, [noteInput, noteCategory]);

  const handleChoiceSelect = (sceneId: string, choiceId: string, option: { label: string; consequence: string; nextScene?: string; reputationChange?: Array<{ faction: string; amount: number }> }) => {
    // 1. Apply reputation changes
    if (option.reputationChange) {
      setFactionReputation(prev => {
        const next = { ...prev };
        option.reputationChange!.forEach(({ faction, amount }) => {
          next[faction] = Math.max(-100, Math.min(100, (next[faction] || 0) + amount));
        });
        return next;
      });
    }
    // 2. Log choice
    setChoiceHistory(prev => [{
      sceneId, choiceId, optionLabel: option.label,
      timestamp: Date.now(), consequences: option.consequence,
      reputationChanges: option.reputationChange,
    }, ...prev]);
    // 3. Auto-note
    const repText = option.reputationChange?.map(r => `${factionName(r.faction)} ${r.amount > 0 ? '+' : ''}${r.amount}`).join(', ') || '';
    addNote(`⚔️ Choix: "${option.label}" — ${option.consequence}${repText ? ` [${repText}]` : ''}`, 'event');
    // 4. Flash
    setLastChoiceFlash(option.label);
    setTimeout(() => setLastChoiceFlash(null), 2000);
    // 5. Navigate
    if (option.nextScene) navigateToSceneById(option.nextScene);
  };

  const isChoiceMade = (sceneId: string, choiceId: string, optionLabel: string) =>
    choiceHistory.some(h => h.sceneId === sceneId && h.choiceId === choiceId && h.optionLabel === optionLabel);

  const undoChoice = (index: number) => {
    const choice = choiceHistory[index];
    if (choice?.reputationChanges) {
      setFactionReputation(prev => {
        const next = { ...prev };
        choice.reputationChanges!.forEach(({ faction, amount }) => {
          next[faction] = (next[faction] || 0) - amount;
        });
        return next;
      });
    }
    setChoiceHistory(prev => prev.filter((_, i) => i !== index));
    addNote(`↩️ Annulé: "${choice.optionLabel}"`, 'event');
  };

  useEffect(() => {
    if (!isOpen) return;
    const iv = setInterval(() => {
      const e = Date.now() - sessionStartTime;
      setSessionTime(`${Math.floor(e/3600000).toString().padStart(2,'0')}:${Math.floor((e%3600000)/60000).toString().padStart(2,'0')}:${Math.floor((e%60000)/1000).toString().padStart(2,'0')}`);
    }, 1000);
    return () => clearInterval(iv);
  }, [isOpen, sessionStartTime]);

  const handleRollDice = useCallback((expression: string, label?: string) => {
    const result = rollDice(expression);
    setDiceHistory(prev => [{ expression, rolls: result.rolls, total: result.total, isCritical: result.isCritical, isFumble: result.isFumble, timestamp: Date.now(), label }, ...prev.slice(0, 49)]);
    return result;
  }, []);

  // Skill check state (moved before early return, handler after addNote)
  const [skillCheckResults, setSkillCheckResults] = useState<Record<string, { total: number; success: boolean; critical?: boolean; fumble?: boolean }>>({});

  const handleSkillCheck = useCallback((skillName: string, dc: number, checkKey: string) => {
    const result = rollDice('1d100');
    const success = result.total <= dc;
    const critical = result.total <= 5;
    const fumble = result.total >= 96;
    setSkillCheckResults(prev => ({ ...prev, [checkKey]: { total: result.total, success, critical, fumble } }));
    const verdict = critical ? '💎 CRITIQUE !' : fumble ? '💀 FUMBLE !' : success ? '✅ Succès' : '❌ Échec';
    setDiceHistory(prev => [{
      expression: '1d100', rolls: result.rolls, total: result.total,
      isCritical: critical, isFumble: fumble, timestamp: Date.now(),
      label: `${skillName} CD ${dc} → ${verdict}`
    }, ...prev.slice(0, 49)]);
    addNote(`🎲 ${skillName} CD ${dc}: ${result.total} → ${verdict}`, 'event');
  }, [addNote]);

  if (!isOpen) return null;

  // --- Current content ---
  const currentAct = GM_BOOK.acts[currentActIndex];
  const currentChapter = currentAct?.chapters[currentChapterIndex];
  const currentScene = currentChapter?.scenes[currentSceneIndex];

  const navigateToSceneById = (sceneId: string) => {
    for (let a = 0; a < GM_BOOK.acts.length; a++) {
      for (let c = 0; c < GM_BOOK.acts[a].chapters.length; c++) {
        const scIdx = GM_BOOK.acts[a].chapters[c].scenes.findIndex(s => s.id === sceneId);
        if (scIdx !== -1) {
          navigateToScene(a, c, scIdx);
          return;
        }
      }
    }
    // Fallback: try partial match
    for (let a = 0; a < GM_BOOK.acts.length; a++) {
      for (let c = 0; c < GM_BOOK.acts[a].chapters.length; c++) {
        const scIdx = GM_BOOK.acts[a].chapters[c].scenes.findIndex(s => s.id.includes(sceneId) || sceneId.includes(s.id));
        if (scIdx !== -1) {
          navigateToScene(a, c, scIdx);
          return;
        }
      }
    }
  };

  const navigateToScene = (actIdx: number, chIdx: number, scIdx: number) => {
    setCurrentActIndex(actIdx);
    setCurrentChapterIndex(chIdx);
    setCurrentSceneIndex(scIdx);
    // Update party location from scene
    const act = GM_BOOK.acts[actIdx];
    const ch = act?.chapters[chIdx];
    const sc = ch?.scenes[scIdx];
    if (sc?.locationId) {
      setPartyLocation(sc.locationId);
      setVisitedLocations(prev => prev.includes(sc.locationId) ? prev : [...prev, sc.locationId]);
    }
  };

  const nextScene = () => {
    if (!currentChapter) return;
    if (currentSceneIndex < currentChapter.scenes.length - 1) {
      navigateToScene(currentActIndex, currentChapterIndex, currentSceneIndex + 1);
    } else if (currentChapterIndex < currentAct.chapters.length - 1) {
      navigateToScene(currentActIndex, currentChapterIndex + 1, 0);
    } else if (currentActIndex < GM_BOOK.acts.length - 1) {
      navigateToScene(currentActIndex + 1, 0, 0);
    }
  };

  const prevScene = () => {
    if (currentSceneIndex > 0) {
      navigateToScene(currentActIndex, currentChapterIndex, currentSceneIndex - 1);
    } else if (currentChapterIndex > 0) {
      const prevCh = currentAct.chapters[currentChapterIndex - 1];
      navigateToScene(currentActIndex, currentChapterIndex - 1, prevCh.scenes.length - 1);
    } else if (currentActIndex > 0) {
      const prevAct = GM_BOOK.acts[currentActIndex - 1];
      const lastCh = prevAct.chapters[prevAct.chapters.length - 1];
      navigateToScene(currentActIndex - 1, prevAct.chapters.length - 1, lastCh?.scenes.length ? lastCh.scenes.length - 1 : 0);
    }
  };

  const handleLocationClick = (locationId: string) => {
    setPartyLocation(locationId);
    setVisitedLocations(prev => prev.includes(locationId) ? prev : [...prev, locationId]);
    const loc = MAP_LOCATIONS.find(l => l.id === locationId);
    if (loc) addChatMessage('system', `Le groupe se déplace vers ${loc.name} (${loc.description})`);
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
  };

  // --- Render helpers ---
  const renderGMNote = (note: GMNote, i: number) => {
    const style = GM_NOTE_STYLES[note.type] || GM_NOTE_STYLES.info;
    return (
      <div key={i} className="gm-note-card" style={{ borderLeftColor: style.borderColor, background: style.bgColor }}>
        <span className="gm-note-icon">{style.icon}</span>
        <span className="gm-note-text">{note.text}</span>
      </div>
    );
  };

  const renderReadAloud = (text: string, mood?: string) => (
    <div className="read-aloud-box">
      <div className="read-aloud-header">
        <span className="read-aloud-icon">📖</span>
        <span>Texte à lire à voix haute</span>
        {mood && <span className="read-aloud-mood">{mood}</span>}
      </div>
      <div className="read-aloud-text">
        {text.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </div>
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="dm-panel-overlay" onClick={onClose}>
      <div className="dm-panel dm-book-panel" onClick={e => e.stopPropagation()}>

        {/* ===== TOP BAR ===== */}
        <div className="dm-panel-header">
          <div className="dm-header-left">
            <span className="dm-icon">📕</span>
            <h2>{GM_BOOK.title}</h2>
          </div>
          <div className="dm-header-center">
            {/* Main view switcher */}
            {(['book', 'map', 'tools', 'notes'] as MainView[]).map(v => (
              <button key={v} className={`dm-view-btn ${mainView === v ? 'active' : ''}`} onClick={() => setMainView(v)}>
                {{ book: '📖 Livre', map: '🗺️ Carte', tools: '🎲 Outils', notes: '📝 Notes' }[v]}
              </button>
            ))}
          </div>
          <div className="dm-header-right">
            <div className="session-timer"><span className="timer-icon">⏱️</span><span className="timer-value">{sessionTime}</span></div>
            <button className="dm-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* ===== STATUS BAR ===== */}
        <div className="dm-status-bar">
          <div className="status-item"><span className="status-label">Groupe:</span><span className="status-value">{partyLocation && MAP_LOCATIONS.find(l => l.id === partyLocation)?.name || gameState.location || 'N/A'}</span></div>
          <div className="status-item"><span className="status-label">Joueurs:</span><span className="status-value">{gameState.players.length}</span></div>
          <div className="status-item"><span className="status-label">Acte:</span><span className="status-value">{currentAct?.actNumber || '-'}</span></div>
          <div className="status-item"><span className="status-label">Chapitre:</span><span className="status-value">{currentChapter?.chapterNumber || '-'}</span></div>
          <div className="status-item"><span className="status-label">Scène:</span><span className="status-value">{currentScene?.sceneNumber || '-'}/{currentChapter?.scenes.length || '-'}</span></div>
          <div className="status-item"><span className="status-label">Lieux visités:</span><span className="status-value">{visitedLocations.length}/{MAP_LOCATIONS.length}</span></div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="dm-book-layout">

          {/* ===== BOOK VIEW ===== */}
          {mainView === 'book' && (
            <>
              {/* Sidebar - Table of contents */}
              {showSidebar && (
                <div className="dm-book-sidebar">
                  <div className="sidebar-header">
                    <h3>Table des Matières</h3>
                    <button className="dm-btn-sm" onClick={() => setShowSidebar(false)}>◀</button>
                  </div>
                  <div className="sidebar-content">
                    {GM_BOOK.acts.map((act, ai) => (
                      <div key={act.id} className={`sidebar-act ${ai === currentActIndex ? 'active' : ''}`}>
                        <div className="sidebar-act-title" onClick={() => navigateToScene(ai, 0, 0)}>
                          <span className="act-number">Acte {act.actNumber}</span>
                          <span className="act-title">{act.title}</span>
                          <span className="act-levels">{act.levelRange}</span>
                        </div>
                        {ai === currentActIndex && act.chapters.map((ch, ci) => (
                          <div key={ch.id} className={`sidebar-chapter ${ci === currentChapterIndex ? 'active' : ''}`}>
                            <div className="sidebar-chapter-title" onClick={() => navigateToScene(ai, ci, 0)}>
                              Ch.{ch.chapterNumber}: {ch.title}
                            </div>
                            {ci === currentChapterIndex && ch.scenes.map((sc, si) => (
                              <div
                                key={sc.id}
                                className={`sidebar-scene ${si === currentSceneIndex ? 'active' : ''}`}
                                onClick={() => navigateToScene(ai, ci, si)}
                              >
                                <span className="scene-type-icon">
                                  {{ narration: '📖', exploration: '🔍', combat: '⚔️', social: '🗣️', choice: '⚖️', transition: '➡️', revelation: '💡', rest: '🏕️' }[sc.type] || '📌'}
                                </span>
                                {sc.title}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main book content */}
              <div className="dm-book-main">
                {!showSidebar && (
                  <button className="sidebar-toggle" onClick={() => setShowSidebar(true)}>▶ Sommaire</button>
                )}

                {/* Scene navigation */}
                <div className="scene-nav">
                  <button className="dm-btn-sm" onClick={prevScene} disabled={currentActIndex === 0 && currentChapterIndex === 0 && currentSceneIndex === 0}>◀ Précédent</button>
                  <div className="scene-nav-info">
                    <span className="scene-nav-act">Acte {currentAct?.actNumber}: {currentAct?.title}</span>
                    <span className="scene-nav-chapter">Chapitre {currentChapter?.chapterNumber}: {currentChapter?.title}</span>
                  </div>
                  <button className="dm-btn-sm" onClick={nextScene}>Suivant ▶</button>
                </div>

                {/* Scene content */}
                {currentScene ? (
                  <div className="scene-content">
                    {/* Scene header */}
                    <div className="scene-header">
                      <div className="scene-header-left">
                        <span className="scene-type-badge" data-type={currentScene.type}>
                          {{ narration: '📖 Narration', exploration: '🔍 Exploration', combat: '⚔️ Combat', social: '🗣️ Social', choice: '⚖️ Choix', transition: '➡️ Transition', revelation: '💡 Révélation', rest: '🏕️ Repos' }[currentScene.type]}
                        </span>
                        <h2 className="scene-title">{currentScene.title}</h2>
                      </div>
                      <div className="scene-header-right">
                        <span className="scene-location">📍 {currentScene.location}</span>
                        <span className="scene-duration">⏱️ ~{currentScene.estimatedMinutes} min</span>
                      </div>
                    </div>

                    {/* Read-aloud box */}
                    {renderReadAloud(currentScene.readAloud.text, currentScene.readAloud.mood)}

                    {/* Music suggestion */}
                    {currentScene.readAloud.music && (
                      <div className="music-suggestion">
                        <span>🎵</span> <strong>Musique suggérée:</strong> {currentScene.readAloud.music}
                      </div>
                    )}

                    {/* GM Notes */}
                    {currentScene.gmNotes && currentScene.gmNotes.length > 0 && (
                      <div className="gm-notes-section">
                        <h3 className="section-title">Notes du MJ</h3>
                        {currentScene.gmNotes.map((note, i) => renderGMNote(note, i))}
                      </div>
                    )}

                    {/* NPCs present */}
                    {currentScene.npcs && currentScene.npcs.length > 0 && (
                      <div className="scene-npcs-section">
                        <h3 className="section-title">Personnages présents</h3>
                        <div className="scene-npcs-grid">
                          {currentScene.npcs.map((npc, i) => (
                            <div key={i} className="scene-npc-card">
                              <div className="scene-npc-header">
                                <h4>{npc.name}</h4>
                                <span className="scene-npc-role">{npc.role}</span>
                              </div>
                              <p className="scene-npc-appearance"><strong>Apparence:</strong> {npc.appearance}</p>
                              <p className="scene-npc-personality"><strong>Personnalité:</strong> {npc.personality}</p>
                              {npc.secret && (
                                <details className="scene-npc-secret">
                                  <summary>🔒 Secret (MJ uniquement)</summary>
                                  <p>{npc.secret}</p>
                                </details>
                              )}
                              <details className="scene-npc-dialogues">
                                <summary>💬 Dialogues</summary>
                                <div className="dialogue-list">
                                  <div className="dialogue-item"><strong>Salutation:</strong> {npc.dialogues.greeting}</div>
                                  <div className="dialogue-item"><strong>Information:</strong> {npc.dialogues.info}</div>
                                  {npc.dialogues.quest && <div className="dialogue-item"><strong>Quête:</strong> {npc.dialogues.quest}</div>}
                                  <div className="dialogue-item"><strong>Adieu:</strong> {npc.dialogues.farewell}</div>
                                </div>
                              </details>
                              {npc.stats && (
                                <div className="scene-npc-stats">HP: {npc.stats.hp} | ATK: {npc.stats.atk} | AC: {npc.stats.ac}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skill Checks */}
                    {currentScene.skillChecks && currentScene.skillChecks.length > 0 && (
                      <div className="skill-checks-section">
                        <h3 className="section-title">Jets de Compétence</h3>
                        {currentScene.skillChecks.map((check, i) => {
                          const checkKey = `${currentScene.id}-sc-${i}`;
                          const result = skillCheckResults[checkKey];
                          return (
                          <div key={i} className={`skill-check-card ${result ? (result.success ? 'sc-success' : 'sc-failure') : ''}`}>
                            <div className="skill-check-header">
                              <strong>{check.skill}</strong>
                              <span className="skill-check-dc">CD {check.dc}</span>
                              {!result ? (
                                <button className="dm-btn-sm dm-btn-roll" onClick={() => handleSkillCheck(check.skill, check.dc, checkKey)}>🎲 LANCER</button>
                              ) : (
                                <span className={`sc-result-badge ${result.critical ? 'sc-critical' : result.fumble ? 'sc-fumble' : result.success ? 'sc-pass' : 'sc-fail'}`}>
                                  {result.total} → {result.critical ? '💎 CRITIQUE' : result.fumble ? '💀 FUMBLE' : result.success ? '✅ SUCCÈS' : '❌ ÉCHEC'}
                                </span>
                              )}
                            </div>
                            <div className="skill-check-outcomes">
                              <div className={`outcome success ${result && !result.success ? 'outcome-dim' : ''} ${result?.success ? 'outcome-active' : ''}`}>
                                <strong>Succès:</strong> {check.success}
                              </div>
                              <div className={`outcome failure ${result && result.success ? 'outcome-dim' : ''} ${result && !result.success ? 'outcome-active' : ''}`}>
                                <strong>Échec:</strong> {check.failure}
                              </div>
                            </div>
                            {result && (
                              <button className="sc-reroll-btn" onClick={() => handleSkillCheck(check.skill, check.dc, checkKey)}>🔄 Relancer</button>
                            )}
                          </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Encounter */}
                    {currentScene.encounter && (
                      <div className="encounter-section">
                        <h3 className="section-title">⚔️ Rencontre: {currentScene.encounter.name}</h3>
                        <div className="encounter-enemies">
                          {currentScene.encounter.enemies.map((enemy, i) => (
                            <div key={i} className="enemy-card">
                              <h4>{enemy.name}</h4>
                              <div className="enemy-stats">
                                <span>HP: {enemy.hp}</span>
                                <span>ATK: {enemy.atk}</span>
                                <span>AC: {enemy.ac}</span>
                                <span>CR: {enemy.cr}</span>
                              </div>
                              {enemy.abilities && (
                                <ul className="enemy-abilities">
                                  {enemy.abilities.map((a, j) => <li key={j}>{a}</li>)}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="encounter-terrain">
                          <strong>Terrain:</strong>
                          <ul>{currentScene.encounter.terrain.map((t, i) => <li key={i}>{t}</li>)}</ul>
                        </div>
                        <div className="encounter-tactics">
                          <strong>Tactiques:</strong> {currentScene.encounter.tactics}
                        </div>
                        <div className="encounter-loot">
                          <strong>Butin:</strong>
                          <ul>{currentScene.encounter.loot.map((l, i) => <li key={i}>{l}</li>)}</ul>
                        </div>
                      </div>
                    )}

                    {/* Choices */}
                    {currentScene.choices && currentScene.choices.length > 0 && (
                      <div className="choices-section">
                        <h3 className="section-title">Embranchements</h3>
                        {currentScene.choices.map((choice, i) => (
                          <div key={i} className="choice-card">
                            <h4 className="choice-prompt">{choice.prompt}</h4>
                            <div className="choice-options">
                              {choice.options.map((opt, j) => {
                                const chosen = isChoiceMade(currentScene.id, choice.id, opt.label);
                                return (
                                <div key={j} className={`choice-option ${chosen ? 'choice-chosen' : ''}`}>
                                  <div className="choice-option-header">
                                    <strong>{chosen ? '✓ ' : ''}{opt.label}</strong>
                                    {opt.reputationChange && (
                                      <div className="rep-badges">
                                        {opt.reputationChange.map((rc, k) => (
                                          <span key={k} className={`rep-badge ${rc.amount > 0 ? 'rep-positive' : 'rep-negative'}`}>
                                            {factionName(rc.faction)} {rc.amount > 0 ? '+' : ''}{rc.amount}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  <p className="choice-description">{opt.description}</p>
                                  <p className="choice-consequence"><strong>Conséquence:</strong> {opt.consequence}</p>
                                  {opt.skillCheck && (() => {
                                    const ckKey = `${currentScene.id}-ch-${i}-${j}`;
                                    const ckRes = skillCheckResults[ckKey];
                                    return (
                                    <div className={`choice-skill-check ${ckRes ? (ckRes.success ? 'sc-success' : 'sc-failure') : ''}`}>
                                      <span>{opt.skillCheck!.skill} CD {opt.skillCheck!.dc}</span>
                                      {!ckRes ? (
                                        <button className="dm-btn-sm dm-btn-roll" onClick={(e) => { e.stopPropagation(); handleSkillCheck(opt.skillCheck!.skill, opt.skillCheck!.dc, ckKey); }}>🎲 LANCER</button>
                                      ) : (
                                        <span className={`sc-result-badge ${ckRes.critical ? 'sc-critical' : ckRes.fumble ? 'sc-fumble' : ckRes.success ? 'sc-pass' : 'sc-fail'}`}>
                                          {ckRes.total} → {ckRes.critical ? '💎 CRITIQUE' : ckRes.fumble ? '💀 FUMBLE' : ckRes.success ? '✅ SUCCÈS' : '❌ ÉCHEC'}
                                        </span>
                                      )}
                                      {ckRes && <button className="sc-reroll-btn-sm" onClick={(e) => { e.stopPropagation(); handleSkillCheck(opt.skillCheck!.skill, opt.skillCheck!.dc, ckKey); }}>🔄</button>}
                                    </div>
                                    );
                                  })()}
                                  <button
                                    className={`choice-select-btn ${chosen ? 'choice-select-done' : ''}`}
                                    onClick={() => !chosen && handleChoiceSelect(currentScene.id, choice.id, opt)}
                                    disabled={chosen}
                                  >
                                    {chosen ? '✓ Choix appliqué' : '⚔️ Appliquer ce choix'}
                                  </button>
                                </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Mini map for current scene */}
                    {currentScene.locationId && (
                      <div className="scene-minimap">
                        <div className="scene-minimap-header">
                          <h3 className="section-title">Position sur la carte</h3>
                          <button className="dm-btn-sm" onClick={() => setMainView('map')}>Ouvrir la carte</button>
                        </div>
                        <div className="scene-minimap-container">
                          <AethelgardMap
                            partyLocation={partyLocation}
                            visitedLocations={visitedLocations}
                            onLocationClick={handleLocationClick}
                            activeSceneLocation={currentScene.locationId}
                            compact={true}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Book intro if no scene selected */
                  <div className="book-intro">
                    {renderReadAloud(GM_BOOK.introduction.text)}
                    <div className="book-primer">
                      <h3>Aethelgard en Bref</h3>
                      {GM_BOOK.worldPrimer.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ===== MAP VIEW ===== */}
          {mainView === 'map' && (
            <div className="dm-map-fullview">
              <AethelgardMap
                partyLocation={partyLocation}
                visitedLocations={visitedLocations}
                onLocationClick={handleLocationClick}
                activeSceneLocation={currentScene?.locationId}
                showPaths={true}
              />
            </div>
          )}

          {/* ===== TOOLS VIEW ===== */}
          {mainView === 'tools' && (
            <div className="dm-tools-view">
              <div className="tools-grid">
                {/* Faction Reputation */}
                <div className="tool-panel faction-rep-panel">
                  <h3>🏛️ Réputation des Factions</h3>
                  {Object.keys(factionReputation).length === 0 ? (
                    <p style={{ color: '#888', fontSize: '0.82rem', fontStyle: 'italic' }}>Aucune réputation enregistrée. Faites des choix dans le Livre pour voir les factions ici.</p>
                  ) : (
                    <div className="faction-rep-list">
                      {Object.entries(factionReputation).sort((a, b) => b[1] - a[1]).map(([fId, value]) => (
                        <div key={fId} className="faction-rep-row">
                          <div className="faction-rep-info">
                            <span className="faction-rep-name">{factionName(fId)}</span>
                            <span className={`faction-rep-value ${value > 0 ? 'rep-positive' : value < 0 ? 'rep-negative' : ''}`}>
                              {value > 0 ? '+' : ''}{value}
                            </span>
                          </div>
                          <div className="faction-rep-bar-bg">
                            <div
                              className={`faction-rep-bar-fill ${value > 0 ? 'rep-bar-positive' : 'rep-bar-negative'}`}
                              style={{ width: `${Math.abs(value) / 2}%`, [value < 0 ? 'right' : 'left']: '50%' }}
                            />
                            <div className="faction-rep-bar-center" />
                          </div>
                          <span className="faction-rep-label">
                            {value >= 50 ? 'Allié' : value >= 20 ? 'Amical' : value >= -10 ? 'Neutre' : value >= -30 ? 'Méfiant' : value >= -60 ? 'Hostile' : 'Ennemi'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {Object.keys(factionReputation).length > 0 && (
                    <button className="dm-btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => { if (confirm('Réinitialiser toutes les réputations ?')) { setFactionReputation({}); } }}>🔄 Réinitialiser</button>
                  )}
                </div>

                {/* Dice Roller */}
                <div className="tool-panel">
                  <h3>🎲 Lanceur de Dés</h3>
                  <div className="dice-presets">
                    {['1d100','1d20','2d6','1d4','1d8','1d12','3d6'].map(d => (
                      <button key={d} className="dice-preset-btn" onClick={() => { setCustomDice(d); handleRollDice(d, d); }}>{d}</button>
                    ))}
                  </div>
                  <div className="dice-custom-row">
                    <input className="dm-input" value={customDice} onChange={e => setCustomDice(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleRollDice(customDice, customDice)} placeholder="Ex: 2d6+3" />
                    <button className="dm-action-btn primary" onClick={() => handleRollDice(customDice, customDice)}>Lancer</button>
                  </div>
                  <div className="dice-history">
                    {diceHistory.slice(0, 15).map((r, i) => (
                      <div key={r.timestamp + '-' + i} className={`dice-result-card ${r.isCritical ? 'critical' : ''} ${r.isFumble ? 'fumble' : ''} ${i === 0 ? 'latest' : ''}`}>
                        <span className="dice-result-total">{r.total}</span>
                        <span className="dice-result-expr">{r.expression}</span>
                        {r.label && <span className="dice-result-label">{r.label}</span>}
                        {r.isCritical && <span className="dice-badge critical-badge">CRIT!</span>}
                        {r.isFumble && <span className="dice-badge fumble-badge">FUMBLE!</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Random Encounters */}
                <div className="tool-panel">
                  <h3>🎯 Rencontres Aléatoires</h3>
                  <div className="encounter-type-selector">
                    {(['road','wilderness','social','supernatural','combat','mystery'] as const).map(t => (
                      <button key={t} className={`encounter-type-btn ${encounterType === t ? 'active' : ''}`} onClick={() => setEncounterType(t)}>{t}</button>
                    ))}
                  </div>
                  <button className="dm-action-btn primary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => {
                    const encs = RANDOM_ENCOUNTERS[encounterType];
                    if (encs?.length) setCurrentEncounter(encs[Math.floor(Math.random() * encs.length)]);
                  }}>Tirer une rencontre</button>
                  {currentEncounter && (
                    <div className="encounter-result">
                      <p>{currentEncounter}</p>
                      <button className="dm-btn-sm" onClick={() => { addNote(currentEncounter, 'event'); setCurrentEncounter(null); }}>Sauver en note</button>
                    </div>
                  )}
                </div>

                {/* Quick actions */}
                <div className="tool-panel">
                  <h3>⚡ Actions Rapides</h3>
                  <div className="quick-actions-grid">
                    <button className="dm-action-card ambiance-action" onClick={() => {
                      const a = GM_BOOK.appendices.ambiances;
                      addChatMessage('system', `🌙 ${a[Math.floor(Math.random() * a.length)]}`);
                    }}>🌙 Ambiance</button>
                    <button className="dm-action-card" onClick={() => {
                      const r = GM_BOOK.appendices.rumors;
                      addChatMessage('system', `🗣️ Rumeur: "${r[Math.floor(Math.random() * r.length)]}"`);
                    }}>🗣️ Rumeur</button>
                    <button className="dm-action-card" onClick={() => {
                      const c = GM_BOOK.appendices.complications;
                      addChatMessage('system', `⚠️ Complication: ${c[Math.floor(Math.random() * c.length)]}`);
                    }}>⚠️ Complication</button>
                    <button className="dm-action-card" onClick={() => {
                      const lootRoll = rollDice('1d100');
                      let tier = 'Commun (5-50 PO)';
                      if (lootRoll.total >= 95) tier = 'Légendaire (50000+ PO)';
                      else if (lootRoll.total >= 80) tier = 'Rare (500-5000 PO)';
                      else if (lootRoll.total >= 50) tier = 'Peu commun (50-500 PO)';
                      addChatMessage('system', `💎 Loot: ${lootRoll.total}/100 → ${tier}`);
                    }}>💎 Loot Roll</button>
                    <button className="dm-action-card" onClick={() => {
                      const times = ['Aube (6h)','Matin (9h)','Midi (12h)','Après-midi (15h)','Crépuscule (18h)','Soir (21h)','Minuit (0h)','Nuit profonde (3h)'];
                      const weathers = ['Ciel dégagé','Nuageux','Pluie légère','Forte pluie','Neige','Brouillard','Orage','Vent violent'];
                      addChatMessage('system', `🕐 ${times[Math.floor(Math.random()*times.length)]} | ${weathers[Math.floor(Math.random()*weathers.length)]}`);
                    }}>🕐 Temps & Météo</button>
                    <button className="dm-action-card" onClick={() => {
                      const npc = GM_BOOK.appendices.quickNPCs[Math.floor(Math.random() * GM_BOOK.appendices.quickNPCs.length)];
                      addChatMessage('system', `🎭 PNJ Rapide: **${npc.name}** (${npc.role}) - ${npc.personality}\n${npc.dialogues.greeting}`);
                    }}>🎭 PNJ Rapide</button>
                  </div>
                </div>

                {/* Chat log */}
                <div className="tool-panel tool-panel-wide">
                  <h3>💬 Journal de Session</h3>
                  <div className="chat-messages" style={{ maxHeight: '300px' }}>
                    {chatMessages.length === 0 ? (
                      <div className="empty-state"><p>Le journal est vide</p></div>
                    ) : chatMessages.map((msg, i) => (
                      <div key={i} className={`chat-message ${msg.role}`}>
                        <span className="message-avatar">{msg.role === 'system' ? '⚙️' : msg.role === 'user' ? '👤' : '🎭'}</span>
                        <div className="message-content">{msg.content}<span className="message-time">{formatTime(msg.timestamp)}</span></div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== NOTES VIEW ===== */}
          {mainView === 'notes' && (
            <div className="dm-notes-fullview">
              {/* Choice History */}
              {choiceHistory.length > 0 && (
                <div className="choice-history-section">
                  <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>📜 Historique des Décisions ({choiceHistory.length})</h3>
                  <div className="choice-history-list">
                    {choiceHistory.slice(0, 20).map((ch, i) => (
                      <div key={i} className="choice-history-item">
                        <div className="choice-history-header">
                          <strong>⚔️ {ch.optionLabel}</strong>
                          <span className="choice-history-time">{new Date(ch.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="choice-history-consequence">{ch.consequences}</p>
                        {ch.reputationChanges && ch.reputationChanges.length > 0 && (
                          <div className="rep-badges" style={{ marginTop: '0.3rem' }}>
                            {ch.reputationChanges.map((rc, k) => (
                              <span key={k} className={`rep-badge ${rc.amount > 0 ? 'rep-positive' : 'rep-negative'}`}>
                                {factionName(rc.faction)} {rc.amount > 0 ? '+' : ''}{rc.amount}
                              </span>
                            ))}
                          </div>
                        )}
                        <button className="choice-undo-btn" onClick={() => undoChoice(i)}>↩️ Annuler</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="notes-input-section">
                <div className="note-category-selector">
                  {NOTE_CATEGORIES.map(cat => (
                    <button key={cat.id} className={`note-cat-btn ${noteCategory === cat.id ? 'active' : ''}`} style={{ '--cat-color': cat.color } as React.CSSProperties} onClick={() => setNoteCategory(cat.id)}>{cat.icon}</button>
                  ))}
                </div>
                <div className="note-input-row">
                  <input className="dm-input note-input" placeholder="Nouvelle note..." value={noteInput} onChange={e => setNoteInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addNote()} />
                  <button className="dm-action-btn primary" onClick={() => addNote()} disabled={!noteInput.trim()}>Ajouter</button>
                </div>
              </div>
              <div className="notes-list">
                {sessionNotes.length === 0 ? (
                  <div className="empty-state"><p>Aucune note</p></div>
                ) : sessionNotes.sort((a, b) => {
                  if (a.pinned && !b.pinned) return -1;
                  if (!a.pinned && b.pinned) return 1;
                  return b.timestamp - a.timestamp;
                }).map(note => {
                  const cat = NOTE_CATEGORIES.find(c => c.id === note.category);
                  return (
                    <div key={note.id} className={`note-card ${note.pinned ? 'pinned' : ''}`} style={{ '--note-color': cat?.color || '#d4af37' } as React.CSSProperties}>
                      <div className="note-card-header">
                        <span>{cat?.icon}</span>
                        <span className="note-time">{formatTime(note.timestamp)}</span>
                        <button className={`note-pin-btn ${note.pinned ? 'active' : ''}`} onClick={() => setSessionNotes(prev => prev.map(n => n.id === note.id ? { ...n, pinned: !n.pinned } : n))}>📌</button>
                        <button className="note-delete-btn" onClick={() => setSessionNotes(prev => prev.filter(n => n.id !== note.id))}>✕</button>
                      </div>
                      <div className="note-card-content">{note.content}</div>
                    </div>
                  );
                })}
              </div>
              {sessionNotes.length > 0 && (
                <div className="notes-export">
                  <button className="dm-btn-sm" onClick={() => {
                    const text = sessionNotes.sort((a,b) => a.timestamp - b.timestamp).map(n => `[${formatTime(n.timestamp)}] ${NOTE_CATEGORIES.find(c=>c.id===n.category)?.icon||''} ${n.content}`).join('\n');
                    navigator.clipboard.writeText(text);
                  }}>Copier tout</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="dm-loading-overlay">
            <div className="dm-spinner"></div>
            <p>Claude Opus génère...</p>
          </div>
        )}
      </div>
    </div>
  );
}
