import React, { useState } from 'react';
import { gameSystemsManager } from '../lore/game-systems-manager';
import { BLACKSMITHING } from '../lore/professions/craft/blacksmithing';
import { ALCHEMY } from '../lore/professions/craft/alchemy';
import { MINING } from '../lore/professions/gather/mining';
import { GUILDES } from '../lore/factions/index';
import { LEGENDARY_WEAPONS } from '../lore/legendary-items';
import {
  BALANCED_WEAPONS,
  BALANCED_ARMORS,
  BALANCED_CONSUMABLES,
  calculateMerchantPrice
} from '../lore/economy-system';
import { LEGENDARY_WEAPONS as LW_BASE } from '../lore/legendary-items';
import { ALL_CREATURES } from '../lore/bestiary';
import { EXPANDED_BESTIARY_BATCH_1 } from '../lore/bestiary-expansion-1';
import { EXPANDED_BESTIARY_BATCH_2 } from '../lore/bestiary-expansion-2';
import { BESTIARY_EXPANSION_3 } from '../lore/bestiary-expansion-3';
import { CLASSES } from '../lore/classes';
import { ALL_QUESTS } from '../lore/quests';
import { TAVERNS_AND_LOCATIONS } from '../lore/locations';
import { LEVEL_THRESHOLDS, EQUIPMENT_RULES, DIFFICULTY_THRESHOLDS } from '../lore/rules';
import { ALL_LOCATIONS as WORLD_LOCATIONS } from '../lore/world-map';
import './CodexPanel.css';

// Build rules summary for Codex
const WORLD_RULES = {
  "Progression de Niveau": Object.entries(LEVEL_THRESHOLDS).slice(0, 10).map(([lvl, xp]) => `Niveau ${lvl}: ${xp} XP`),
  "Seuils de Difficulté (d100)": Object.entries(DIFFICULTY_THRESHOLDS).map(([key, val]) => `${key}: DC ${val}`),
  "Catégories d'Armures": Object.entries(EQUIPMENT_RULES.armor_categories).map(([cat, data]) => `${data.label}: ${data.desc}`)
};

// Consolidated Legendary Items
const ALL_LEGENDARY_ITEMS = [
  ...LEGENDARY_WEAPONS,
].filter((item, index, self) =>
  index === self.findIndex((t) => t.id === item.id)
);

// Consolidated Bestiary
const FULL_BESTIARY = [
  ...ALL_CREATURES,
  ...EXPANDED_BESTIARY_BATCH_1,
  ...EXPANDED_BESTIARY_BATCH_2,
  ...BESTIARY_EXPANSION_3
].filter((c, index, self) =>
  index === self.findIndex((t) => t.id === c.id)
);

// Consolidated Locations - Merge world-map with taverns/landmarks
const ALL_LOCATIONS = [
  ...WORLD_LOCATIONS,
  ...(TAVERNS_AND_LOCATIONS.taverns || []).map(t => ({ 
    ...t, 
    type: 'Auberge', 
    description: t.desc,
    dangerLevel: 'safe',
    suggestedLevel: 1,
    region: t.location || 'Inconnu'
  })),
  ...(TAVERNS_AND_LOCATIONS.shops || []).map(s => ({ 
    ...s, 
    type: 'Boutique',
    description: s.desc,
    dangerLevel: 'safe',
    suggestedLevel: 1,
    region: 'Commerce'
  })),
  ...(TAVERNS_AND_LOCATIONS.landmarks || []).map(l => ({ 
    ...l, 
    type: 'Point d\'intérêt', 
    description: l.desc,
    dangerLevel: l.danger_level || 'medium',
    suggestedLevel: l.suggested_level || 5,
    region: l.location || 'Inconnu'
  }))
];

export function CodexPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('professions');
  const [selectedItem, setSelectedItem] = useState(null);
  const [feedback, setFeedback] = useState({ visible: false, message: '', icon: '', title: '' });

  const triggerFeedback = (title, message, icon = '✨') => {
    setFeedback({ visible: true, title, message, icon });
    setTimeout(() => setFeedback(prev => ({ ...prev, visible: false })), 4000);
  };

  if (!isOpen) return null;

  const PROFESSIONS = [BLACKSMITHING, ALCHEMY, MINING];

  return (
    <div className="codex-overlay" onClick={onClose}>
      <div className="codex-panel" onClick={(e) => e.stopPropagation()}>
        <div className="codex-header">
          <h2>📖 Codex d'Aethelgard</h2>
          <button className="codex-close" onClick={onClose}>✕</button>
        </div>

        <div className="codex-tabs">
          {[
            { id: 'professions', label: 'Professions', icon: '⚒️' },
            { id: 'factions', label: 'Factions', icon: '🛡️' },
            { id: 'legendary_items', label: 'Reliques', icon: '⚔️' },
            { id: 'bestiary', label: 'Bestiaire', icon: '🐲' },
            { id: 'classes', label: 'Classes', icon: '📜' },
            { id: 'quests', label: 'Quêtes', icon: '📖' },
            { id: 'locations', label: 'Atlas', icon: '🏰' },
            { id: 'rules', label: 'Dogmes', icon: '⚖️' },
            { id: 'world_events', label: 'Chroniques', icon: '🌍' },
            { id: 'economy', label: 'Comptoir', icon: '💰' }
          ].map(tab => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => { setActiveTab(tab.id); setSelectedItem(null); }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="codex-content">
          {activeTab === 'professions' && (
            <div className="professions-view">
              <div className="professions-list">
                <h3>Grimoire des Métiers</h3>
                {PROFESSIONS.map(prof => (
                  <div key={prof.id} className={`profession-card ${selectedItem?.id === prof.id ? 'active' : ''}`} onClick={() => setSelectedItem(prof)}>
                    <h4>{prof.name}</h4>
                    <p className="profession-category">{prof.category === 'craft' ? '⚒️ Grand Artisanat' : '⛏️ Maître Récolteur'}</p>
                    <p className="profession-desc">{prof.description.substring(0, 80)}...</p>
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">⚒️</div><p>Consultez les secrets de l'artisanat.</p></div>
              ) : (
                <div className="profession-details">
                  <h3>{selectedItem.name}</h3>
                  <div className="lore-section"><h4>📜 Origines & Secrets</h4><p className="lore-p">{selectedItem.lore_background}</p></div>
                  <div className="stats-section">
                    <h4>📊 Aptitudes Requises</h4>
                    <div className="stats-grid">
                      <div className="stat-item"><span className="stat-label">Attribut Primaire</span><span className="stat-value">{selectedItem.primary_stat}</span></div>
                      <div className="stat-item"><span className="stat-label">Attribut Secondaire</span><span className="stat-value">{selectedItem.secondary_stat}</span></div>
                    </div>
                  </div>
                  <div className="ranks-section">
                    <h4>🎖️ Hiérarchie de Maîtrise</h4>
                    <div className="rank-timeline-vertical">
                      {selectedItem.ranks?.map(rank => (
                        <div key={rank.level} className="rank-card">
                          <div className="rank-header-row"><h5>{rank.title} <span className="rank-level">Niv. {rank.level}</span></h5><span className="xp-badge">{rank.xp_required} XP</span></div>
                          <div className="rank-body">
                            <div className="passive-bonuses">
                              <h6>✨ Bénédictions Passives</h6>
                              <ul>{rank.passive_bonuses?.map((bonus, i) => <li key={i}>{bonus}</li>)}</ul>
                            </div>
                            {rank.special_ability && <div className="special-ability"><h6>🔥 Capacité de Maître</h6><p>{rank.special_ability}</p></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="action-footer">
                    <button className="premium-action-btn" onClick={() => {
                      const result = gameSystemsManager.learnProfession(selectedItem.id);
                      triggerFeedback("Serment Prêté", result.message, "⚒️");
                    }}>
                      <span className="btn-glow"></span>Prêter Serment
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'factions' && (
            <div className="factions-view">
              <div className="factions-list">
                <h3>Annales des Factions</h3>
                {GUILDES.map(faction => (
                  <div key={faction.id} className={`faction-card ${selectedItem?.id === faction.id ? 'active' : ''}`} onClick={() => setSelectedItem(faction)}>
                    <h4>{faction.name}</h4>
                    <span className={`category-badge ${faction.category}`}>{faction.category}</span>
                    <p className="faction-motto">"{faction.motto}"</p>
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">🛡️</div><p>Les puissances qui façonnent le monde.</p></div>
              ) : (
                <div className="faction-details">
                  <h3>{selectedItem.name}</h3>
                  <div className="lore-section"><h4>📜 Histoire de Fondation</h4><p className="lore-p">{selectedItem.lore.founding_story}</p></div>
                  <div className="stats-section">
                    <h4>🏛️ Structure & Influence</h4>
                    <div className="stats-grid">
                      <div className="stat-item"><span className="stat-label">Siège Officiel</span><span className="stat-value">{selectedItem.headquarters}</span></div>
                      <div className="stat-item"><span className="stat-label">Dirigeant Actuel</span><span className="stat-value">{selectedItem.leader}</span></div>
                    </div>
                  </div>
                  <div className="ranks-section">
                    <h4>🎖️ Hiérarchie Interne</h4>
                    <div className="rank-timeline-vertical">
                      {selectedItem.ranks.map(rank => (
                        <div key={rank.level} className="rank-card">
                          <div className="rank-header-row"><h5>{rank.title}</h5><span className="xp-badge">{rank.reputation_required} Rep</span></div>
                          <div className="passive-bonuses"><h6>✨ Privilèges du Rang</h6><ul>{rank.privileges.map((p, i) => <li key={i}>{p}</li>)}</ul></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'legendary_items' && (
            <div className="legendary-items-view">
              <div className="legendary-list">
                <h3>Reliques de Légende</h3>
                {ALL_LEGENDARY_ITEMS.map(item => (
                  <div key={item.id} className={`legendary-card item-rarity-${item.rarity} ${selectedItem?.id === item.id ? 'active' : ''}`} onClick={() => setSelectedItem(item)}>
                    <h4>{item.name}</h4>
                    <p className="item-type">{item.type || 'Artefact'}</p>
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">⚔️</div><p>Les échos des anciens épiques.</p></div>
              ) : (
                <div className="legendary-details">
                  <h3>{selectedItem.name}</h3>
                  <div className="lore-section"><h4>🔥 Chronique de Création</h4><p className="lore-p">{selectedItem.lore?.creation_story || selectedItem.description}</p></div>
                  <div className="abilities-section">
                    <h4>✨ Propriétés Sacrées</h4>
                    <div className="ability-detail-grid">
                      {(selectedItem.properties?.magical_effects || []).map((effect, i) => (
                        <div key={i} className="ability-card">
                          <div className="ability-header"><h5>{effect.name}</h5></div>
                          <p>{effect.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bestiary' && (
            <div className="bestiary-view">
              <div className="bestiary-list">
                <h3>Bestiaire d'Aethelgard</h3>
                {FULL_BESTIARY.map((creature, idx) => (
                  <div key={creature.id || idx} className={`creature-card ${selectedItem?.id === creature.id ? 'active' : ''} rarity-${(creature.challengeRating > 10 ? 'epic' : creature.challengeRating > 5 ? 'rare' : 'common')}`} onClick={() => setSelectedItem(creature)}>
                    <h4>{creature.name}</h4>
                    <div className="creature-meta">
                      <span className="cr-tag">CR {creature.challengeRating}</span>
                      <span className="type-tag">{creature.type || 'Créature'}</span>
                    </div>
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">🐉</div><p>Étudiez les menaces d'Aethelgard.</p></div>
              ) : (
                <div className="creature-details">
                  <div className="creature-header">
                    <h3>{selectedItem.name}</h3>
                    <div className="rarity-badge">Rareté: {selectedItem.challengeRating > 15 ? 'Légendaire' : selectedItem.challengeRating > 10 ? 'Épique' : 'Commune'}</div>
                  </div>

                  <div className="lore-section">
                    <h4>📜 Analyse Tactique</h4>
                    <p className="lore-p">{selectedItem.description || selectedItem.desc}</p>
                    {selectedItem.habitat && <div className="habitat-tags"><strong>Habitats:</strong> {Array.isArray(selectedItem.habitat) ? selectedItem.habitat.join(', ') : selectedItem.habitat}</div>}
                  </div>

                  <div className="stats-grid">
                    <div className="stat-box"><strong>PV</strong><span>{selectedItem.hitPoints?.average || selectedItem.hp}</span></div>
                    <div className="stat-box"><strong>CA</strong><span>{selectedItem.armorClass || selectedItem.ac || selectedItem.defenses?.AC}</span></div>
                    <div className="stat-box"><strong>XP</strong><span>{selectedItem.experiencePoints || selectedItem.xp}</span></div>
                  </div>

                  {(selectedItem.abilities || selectedItem.special_abilities) && (
                    <div className="abilities-section">
                      <h4>✨ Capacités Spéciales</h4>
                      <div className="ability-detail-grid">
                        {(selectedItem.abilities || selectedItem.special_abilities).map((ability, idx) => (
                          <div key={idx} className="ability-card">
                            <h5>{ability.name}</h5>
                            <p>{ability.description || ability.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedItem.attacks && selectedItem.attacks.length > 0 && (
                    <div className="attacks-section">
                      <h4>⚔️ Actions & Attaques</h4>
                      <div className="attack-list">
                        {selectedItem.attacks.map((attack, idx) => (
                          <div key={idx} className="attack-item">
                            <strong>{attack.name}</strong>: {attack.damage} {attack.damageType || attack.type} ({attack.toHit || attack.bonus_to_hit})
                            {attack.special && <p className="attack-desc">{attack.special}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'classes' && (
            <div className="classes-view">
              <div className="classes-list">
                <h3>Archétypes de Destin</h3>
                {Object.values(CLASSES).map(cls => (
                  <div key={cls.label} className={`class-card ${selectedItem?.label === cls.label ? 'active' : ''}`} onClick={() => setSelectedItem(cls)}>
                    <h4>{cls.label}</h4>
                    <p className="class-role">✨ {cls.recommended_stats?.major?.join(' / ') || 'Équilibre'}</p>
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">⚔️</div><p>Choisissez votre voie héroïque.</p></div>
              ) : (
                <div className="class-details">
                  <h3>{selectedItem.label}</h3>
                  <div className="lore-section"><h4>📜 Voie & Philosophie</h4><p className="lore-p">{selectedItem.desc}</p></div>
                  <div className="abilities-section">
                    <h4>✨ Arts & Sortilèges</h4>
                    <div className="ability-detail-grid">
                      {(selectedItem.abilities || selectedItem.unlockables || []).map((ability, idx) => (
                        <div key={idx} className="ability-card">
                          <div className="ability-header"><h5>{ability.name}</h5><span className="cost-tag">{ability.cost || 'Inné'}</span></div>
                          <p>{ability.desc || ability.flavor}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'quests' && (
            <div className="quests-view">
              <div className="quests-list">
                <h3>Chroniques de Quêtes</h3>
                {ALL_QUESTS.map((quest, idx) => (
                  <div key={quest.id || idx} className={`quest-card ${selectedItem?.id === quest.id ? 'active' : ''}`} onClick={() => setSelectedItem(quest)}>
                    <h4>{quest.name || quest.title}</h4>
                    <p className="quest-difficulty">{quest.difficulty || 'Moyenne'}</p>
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">📖</div><p>Les récits qui attendent d'être vécus.</p></div>
              ) : (
                <div className="quest-details">
                  <h3>{selectedItem.name || selectedItem.title}</h3>
                  <div className="stats-section">
                    <h4>📊 Informations</h4>
                    <div className="stats-grid">
                      <div className="stat-item"><span className="stat-label">Difficulté</span><span className="stat-value">{selectedItem.difficulty}</span></div>
                      <div className="stat-item"><span className="stat-label">Niveau</span><span className="stat-value">{selectedItem.min_level || 1}</span></div>
                    </div>
                  </div>
                  <div className="lore-section"><h4>📜 Accroche</h4><p className="lore-p">{selectedItem.hook || selectedItem.description}</p></div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="locations-view">
              <div className="locations-list">
                <h3>Atlas d'Aethelgard</h3>
                {ALL_LOCATIONS.map((loc, idx) => (
                  <div key={loc.id || idx} className={`location-card ${selectedItem?.id === loc.id ? 'active' : ''}`} onClick={() => setSelectedItem(loc)}>
                    <h4>{loc.name}</h4>
                    <p className="location-type">📍 {loc.type || 'Lieu'}</p>
                    {loc.dangerLevel && (
                      <span className={`danger-badge danger-${loc.dangerLevel}`}>
                        {loc.dangerLevel === 'safe' ? '🛡️ Sûr' : 
                         loc.dangerLevel === 'low' ? '⚠️ Risque faible' : 
                         loc.dangerLevel === 'medium' ? '⚔️ Dangereux' :
                         loc.dangerLevel === 'high' ? '☠️ Très dangereux' : 
                         loc.dangerLevel === 'extreme' ? '💀 Extrême' : '🔥 Mortel'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">🏰</div><p>Explorez les merveilles du monde.</p></div>
              ) : (
                <div className="location-details">
                  <h3>{selectedItem.name}</h3>
                  
                  <div className="stats-section">
                    <h4>📍 Informations Générales</h4>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <span className="stat-label">Région</span>
                        <span className="stat-value">{selectedItem.region || 'Inconnu'}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Type</span>
                        <span className="stat-value">{selectedItem.type}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Danger</span>
                        <span className="stat-value">{selectedItem.dangerLevel || 'Moyen'}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Niveau suggéré</span>
                        <span className="stat-value">{selectedItem.suggestedLevel || 1}</span>
                      </div>
                      {selectedItem.population && (
                        <div className="stat-item">
                          <span className="stat-label">Population</span>
                          <span className="stat-value">{selectedItem.population.toLocaleString()}</span>
                        </div>
                      )}
                      {selectedItem.biome && (
                        <div className="stat-item">
                          <span className="stat-label">Biome</span>
                          <span className="stat-value">{selectedItem.biome}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lore-section">
                    <h4>📜 Description</h4>
                    <p className="lore-p">{selectedItem.description}</p>
                  </div>

                  {selectedItem.lore && (
                    <div className="lore-section">
                      <h4>📖 Histoire & Légendes</h4>
                      <p className="lore-p">{selectedItem.lore}</p>
                    </div>
                  )}

                  {selectedItem.services && Object.keys(selectedItem.services).some(k => selectedItem.services[k]) && (
                    <div className="services-section">
                      <h4>🏪 Services Disponibles</h4>
                      <div className="services-grid">
                        {selectedItem.services.inn && <span className="service-badge">🏠 Auberge</span>}
                        {selectedItem.services.blacksmith && <span className="service-badge">⚒️ Forge</span>}
                        {selectedItem.services.merchant && <span className="service-badge">💰 Marchand</span>}
                        {selectedItem.services.temple && <span className="service-badge">⛪ Temple</span>}
                        {selectedItem.services.guild && <span className="service-badge">🛡️ Guilde</span>}
                        {selectedItem.services.stables && <span className="service-badge">🐴 Écuries</span>}
                        {selectedItem.services.bank && <span className="service-badge">🏦 Banque</span>}
                      </div>
                    </div>
                  )}

                  {selectedItem.pointsOfInterest && selectedItem.pointsOfInterest.length > 0 && (
                    <div className="points-of-interest-section">
                      <h4>✨ Points d'Intérêt</h4>
                      <div className="poi-list">
                        {selectedItem.pointsOfInterest.map((poi, idx) => (
                          <div key={idx} className="poi-card">
                            <h5>{poi.name}</h5>
                            <p>{poi.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedItem.economy && (
                    <div className="economy-section">
                      <h4>💰 Économie</h4>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-label">Richesse</span>
                          <span className="stat-value">{
                            selectedItem.economy.wealth === 'poor' ? '💔 Pauvre' :
                            selectedItem.economy.wealth === 'modest' ? '💛 Modeste' :
                            selectedItem.economy.wealth === 'prosperous' ? '💚 Prospère' : '💎 Riche'
                          }</span>
                        </div>
                      </div>
                      {selectedItem.economy.mainExports && (
                        <div className="trade-info">
                          <strong>Exports :</strong> {selectedItem.economy.mainExports.join(', ')}
                        </div>
                      )}
                      {selectedItem.economy.mainImports && (
                        <div className="trade-info">
                          <strong>Imports :</strong> {selectedItem.economy.mainImports.join(', ')}
                        </div>
                      )}
                    </div>
                  )}

                  {selectedItem.connectedTo && selectedItem.connectedTo.length > 0 && (
                    <div className="connections-section">
                      <h4>🛤️ Chemins & Connexions</h4>
                      <div className="connections-list">
                        {selectedItem.connectedTo.map((conn, idx) => (
                          <div key={idx} className="connection-card">
                            <div className="connection-header">
                              <strong>→ {conn.locationId}</strong>
                              <span className={`difficulty-badge diff-${conn.difficulty}`}>
                                {conn.difficulty === 'easy' ? '🟢 Facile' : 
                                 conn.difficulty === 'medium' ? '🟡 Moyen' : '🔴 Difficile'}
                              </span>
                            </div>
                            <p>{conn.distance} km • {conn.travelTime}h de voyage</p>
                            {conn.description && <p className="connection-desc">{conn.description}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="rules-view">
              <div className="rules-list">
                <h3>Dogmes & Systèmes</h3>
                {Object.keys(WORLD_RULES).map(cat => (
                  <div key={cat} className={`rule-card ${selectedItem === cat ? 'active' : ''}`} onClick={() => setSelectedItem(cat)}>
                    <h4>{cat}</h4>
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">⚖️</div><p>Les fondements de la réalité.</p></div>
              ) : (
                <div className="rules-details">
                  <h3>{selectedItem}</h3>
                  <div className="lore-section">
                    <ul>{WORLD_RULES[selectedItem].map((rule, i) => <li key={i} className="lore-p">{rule}</li>)}</ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'world_events' && (
            <div className="world-events-view">
              <div className="details-placeholder"><div className="placeholder-icon">🌍</div><p>Les Chroniques sont en cours d'écriture...</p></div>
            </div>
          )}

          {activeTab === 'economy' && (
            <div className="economy-view">
              <div className="economy-list">
                <h3>Archives du Comptoir</h3>
                {['Armurerie', 'Protections', 'Vivres'].map(cat => (
                  <div key={cat} className={`economy-card ${selectedItem === cat ? 'active' : ''}`} onClick={() => setSelectedItem(cat)}>
                    <h4>{cat}</h4>
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">💰</div><p>Consultez les prix du marché.</p></div>
              ) : (
                <div className="economy-details">
                  <h3>{selectedItem}</h3>
                  <div className="ability-detail-grid">
                    {(selectedItem === 'Armurerie' ? BALANCED_WEAPONS : (selectedItem === 'Protections' ? BALANCED_ARMORS : BALANCED_CONSUMABLES)).map(item => (
                      <div key={item.id} className="ability-card">
                        <div className="ability-header"><h5>{item.name}</h5><span className="cost-tag">{calculateMerchantPrice(item.basePrice, item.rarity)} PO</span></div>
                        <p>{item.description || `Qualité ${item.rarity}.`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {feedback.visible && (
          <div className="codex-feedback-overlay">
            <div className="feedback-icon">{feedback.icon}</div>
            <div className="feedback-title">{feedback.title}</div>
            <div className="feedback-msg">{feedback.message}</div>
          </div>
        )}
      </div>
    </div>
  );
}
