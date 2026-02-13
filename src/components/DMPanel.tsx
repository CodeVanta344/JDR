/**
 * DMPanel - Interface MJ avec intégration Claude Opus
 * Actions rapides, chat contextualisé, référence lore
 */

import React, { useState, useEffect, useRef } from 'react';
import { dmAssistant } from '../services/dm-assistant';
import type { NPC, Encounter } from '../services/dm-assistant';
import './DMPanel.css';

interface DMPanelProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: {
    location: string;
    players: Array<{ class: string; level: number; name: string; user_id: string }>;
    history: string[];
    lore: any;
  };
  onSpawnNPC: (npc: NPC) => void;
  onTriggerCombat: (encounter: Encounter) => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

type TabType = 'actions' | 'chat' | 'npcs' | 'quests' | 'locations' | 'rules';

export function DMPanel({ isOpen, onClose, gameState, onSpawnNPC, onTriggerCombat }: DMPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('actions');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedNPCs, setGeneratedNPCs] = useState<NPC[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Charger lore au montage
  useEffect(() => {
    if (isOpen && gameState.lore) {
      dmAssistant.loadLoreContext(gameState.lore).catch(console.error);
    }
  }, [isOpen, gameState.lore]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  if (!isOpen) return null;

  const handleGenerateNPC = async () => {
    setLoading(true);
    setError(null);
    try {
      const avgLevel = Math.round(
        gameState.players.reduce((sum, p) => sum + p.level, 0) / gameState.players.length
      );

      const npc = await dmAssistant.generateNPC({
        location: gameState.location || 'Taverne Générique',
        role: 'merchant', // TODO: Dialog sélection rôle
        level: avgLevel,
      });

      setGeneratedNPCs([npc, ...generatedNPCs]);
      onSpawnNPC(npc);
      setActiveTab('npcs');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImproveCombat = async () => {
    setLoading(true);
    setError(null);
    try {
      const encounter = await dmAssistant.improveCombat({
        party: gameState.players,
        location: gameState.location || 'Forêt Sombre',
        difficulty: 'medium', // TODO: Dialog sélection difficulté
        narrative_context: gameState.history.slice(-3).join(' '),
      });

      onTriggerCombat(encounter);
      addChatMessage('assistant', `Combat improvisé généré : ${encounter.enemies.length} ennemis dans ${encounter.terrain.ambient}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlotTwist = async () => {
    setLoading(true);
    setError(null);
    try {
      const avgLevel = Math.round(
        gameState.players.reduce((sum, p) => sum + p.level, 0) / gameState.players.length
      );

      const twist = await dmAssistant.suggestPlotTwist({
        context: gameState.location || 'Session en cours',
        recentEvents: gameState.history.slice(-5),
        partyLevel: avgLevel,
      });

      addChatMessage('assistant', `💡 **Plot Twist Suggéré** : ${twist}`);
      setActiveTab('chat');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    addChatMessage('user', userMessage);

    // TODO: Intégrer chat contextualisé avec Claude (API directe ou Edge Function)
    addChatMessage('assistant', 'Chat LLM en cours d\'implémentation...');
  };

  const addChatMessage = (role: 'user' | 'assistant', content: string) => {
    setChatMessages([...chatMessages, { role, content, timestamp: Date.now() }]);
  };

  return (
    <div className="dm-panel-overlay" onClick={onClose}>
      <div className="dm-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="dm-panel-header">
          <h2>
            <span className="dm-icon">🎭</span>
            Interface Maître du Jeu
          </h2>
          <button className="dm-close" onClick={onClose}>✕</button>
        </div>

        {/* Status Bar */}
        <div className="dm-status-bar">
          <div className="status-item">
            <span className="status-label">Location:</span>
            <span className="status-value">{gameState.location || 'N/A'}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Joueurs:</span>
            <span className="status-value">{gameState.players.length}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Claude:</span>
            <span className={`status-value ${dmAssistant.isAvailable() ? 'status-ok' : 'status-error'}`}>
              {dmAssistant.isAvailable() ? '✓ Actif' : '✗ Offline'}
            </span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="dm-error">
            <strong>⚠️ Erreur:</strong> {error}
          </div>
        )}

        {/* Tabs */}
        <div className="dm-tabs">
          <button className={activeTab === 'actions' ? 'active' : ''} onClick={() => setActiveTab('actions')}>
            ⚡ Actions
          </button>
          <button className={activeTab === 'chat' ? 'active' : ''} onClick={() => setActiveTab('chat')}>
            💬 Chat
          </button>
          <button className={activeTab === 'npcs' ? 'active' : ''} onClick={() => setActiveTab('npcs')}>
            🎭 NPCs ({generatedNPCs.length})
          </button>
          <button className={activeTab === 'quests' ? 'active' : ''} onClick={() => setActiveTab('quests')}>
            📜 Quêtes
          </button>
          <button className={activeTab === 'locations' ? 'active' : ''} onClick={() => setActiveTab('locations')}>
            🗺️ Lieux
          </button>
          <button className={activeTab === 'rules' ? 'active' : ''} onClick={() => setActiveTab('rules')}>
            📖 Règles d100
          </button>
        </div>

        {/* Content */}
        <div className="dm-content">
          {activeTab === 'actions' && (
            <div className="dm-actions-grid">
              <button
                className="dm-action-card npc-action"
                onClick={handleGenerateNPC}
                disabled={loading || !dmAssistant.isAvailable()}
              >
                <div className="action-icon">🎭</div>
                <div className="action-label">Générer NPC</div>
                <div className="action-desc">PNJ contextuel avec backstory, secrets, dialogue</div>
              </button>

              <button
                className="dm-action-card combat-action"
                onClick={handleImproveCombat}
                disabled={loading || !dmAssistant.isAvailable()}
              >
                <div className="action-icon">⚔️</div>
                <div className="action-label">Combat Impro</div>
                <div className="action-desc">Rencontre équilibrée d100 avec terrain tactique</div>
              </button>

              <button
                className="dm-action-card twist-action"
                onClick={handlePlotTwist}
                disabled={loading || !dmAssistant.isAvailable()}
              >
                <div className="action-icon">🎲</div>
                <div className="action-label">Plot Twist</div>
                <div className="action-desc">Twist dramatique connecté au lore</div>
              </button>

              <button className="dm-action-card loot-action" disabled>
                <div className="action-icon">💎</div>
                <div className="action-label">Loot Adapté</div>
                <div className="action-desc">Récompenses équilibrées (bientôt)</div>
              </button>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="dm-chat-container">
              <div className="chat-messages">
                {chatMessages.length === 0 ? (
                  <div className="chat-empty">
                    <p>💬 Chat MJ contextualisé</p>
                    <p className="chat-hint">Posez une question ou demandez une suggestion...</p>
                  </div>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div key={i} className={`chat-message ${msg.role}`}>
                      <div className="message-avatar">
                        {msg.role === 'user' ? '👤' : '🎭'}
                      </div>
                      <div className="message-content">
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="chat-input-container">
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Posez une question au MJ IA..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                  disabled={loading}
                />
                <button
                  className="chat-send"
                  onClick={handleChatSubmit}
                  disabled={loading || !chatInput.trim()}
                >
                  ➤
                </button>
              </div>
            </div>
          )}

          {activeTab === 'npcs' && (
            <div className="dm-npcs-list">
              {generatedNPCs.length === 0 ? (
                <div className="empty-state">
                  <p>🎭 Aucun NPC généré</p>
                  <p className="empty-hint">Utilisez l'onglet Actions pour créer un PNJ</p>
                </div>
              ) : (
                generatedNPCs.map((npc, i) => (
                  <div key={i} className="npc-card">
                    <div className="npc-header">
                      <h3>{npc.name}</h3>
                      <span className="npc-age">{npc.age} ans</span>
                    </div>
                    <p className="npc-appearance">{npc.appearance}</p>
                    <details>
                      <summary><strong>📖 Backstory</strong></summary>
                      <p>{npc.backstory}</p>
                    </details>
                    <details>
                      <summary><strong>🔒 Secrets ({npc.secrets.length})</strong></summary>
                      <ul>
                        {npc.secrets.map((s, j) => <li key={j}>{s}</li>)}
                      </ul>
                    </details>
                    <details>
                      <summary><strong>💬 Dialogues Exemples</strong></summary>
                      <ul>
                        {npc.dialogue_samples.map((d, j) => <li key={j}>{d}</li>)}
                      </ul>
                    </details>
                    <details>
                      <summary><strong>📜 Quest Hooks</strong></summary>
                      <ul>
                        {npc.quest_hooks.map((q, j) => <li key={j}>{q}</li>)}
                      </ul>
                    </details>
                    {npc.stats && (
                      <div className="npc-stats">
                        <span>❤️ HP: {npc.stats.hp}</span>
                        <span>⚔️ ATK: {npc.stats.atk}</span>
                        <span>🛡️ AC: {npc.stats.ac}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'quests' && (
            <div className="dm-quests-view">
              <p className="coming-soon">📜 Système de quêtes dynamiques en développement...</p>
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="dm-locations-view">
              <h3>📍 40 Birth Locations</h3>
              <p className="info-text">Référence rapide aux locations du système de création de personnage</p>
              <div className="location-categories">
                <div className="category-badge">🏔️ Montagnes (5)</div>
                <div className="category-badge">🌊 Côtières (4)</div>
                <div className="category-badge">🌲 Forêts (6)</div>
                <div className="category-badge">🏛️ Urbaines (8)</div>
                <div className="category-badge">🔥 Extrêmes (5)</div>
                <div className="category-badge">✨ Magiques (7)</div>
                <div className="category-badge">🏜️ Désertiques (5)</div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="dm-rules-view">
              <h3>📖 Système d100 - Référence Rapide</h3>
              <div className="rules-section">
                <h4>⚔️ Combat</h4>
                <ul>
                  <li><strong>Jet d'Attaque:</strong> 1d100 + ATK vs AC cible</li>
                  <li><strong>Critique:</strong> 95-100 = dégâts ×2</li>
                  <li><strong>Échec Critique:</strong> 1-5 = malus/désavantage</li>
                </ul>
              </div>
              <div className="rules-section">
                <h4>🎯 Compétences</h4>
                <ul>
                  <li><strong>Check Standard:</strong> 1d100 + Skill vs DC</li>
                  <li><strong>DC Facile:</strong> 30 | Moyen: 50 | Difficile: 70 | Très Difficile: 90</li>
                  <li><strong>Maîtrise:</strong> +10 au check si compétence maîtrisée</li>
                </ul>
              </div>
              <div className="rules-section">
                <h4>📊 Stats & Conversion</h4>
                <ul>
                  <li><strong>Stats d100:</strong> Stats d20 × 2 (max 20)</li>
                  <li><strong>Skills d100:</strong> Skills d20 × 2.5 (max 100)</li>
                  <li><strong>HP d100:</strong> HP d20 × 5</li>
                </ul>
              </div>
              <div className="rules-section">
                <h4>💰 Or & Équipement</h4>
                <ul>
                  <li><strong>Création Perso:</strong> 200-800 PO selon origine</li>
                  <li><strong>Prix Items:</strong> Common 5-50 PO | Uncommon 50-500 PO | Rare 500-5000 PO</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Loading Overlay */}
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
