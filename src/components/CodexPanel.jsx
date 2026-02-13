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
import {
  LEGENDARY_WEAPONS as LW_EXP,
  LEGENDARY_ARMORS as LA_EXP,
  DIVINE_ARTIFACTS as DA_EXP
} from '../lore/items-legendary-expansion';
import {
  WEAPON_LEGENDARY_DRAGONBANE,
  WEAPON_ARTIFACT_SHADOWFANG,
  ARTIFACT_STAFF_ARCHMAGE,
  ARTIFACT_RING_POWER
} from '../lore/items-catalog';
import { BESTIARY, BESTIARY_EXTENDED } from '../lore';
import { CLASSES } from '../lore/classes';
import { ALL_QUESTS } from '../lore/quests';
import { TAVERNS_AND_LOCATIONS } from '../lore/locations';
import { LEVEL_THRESHOLDS, EQUIPMENT_RULES, DIFFICULTY_THRESHOLDS } from '../lore/rules';
import { NPC_TEMPLATES } from '../lore/npcs';
import './CodexPanel.css';

// Build rules summary for Codex
const WORLD_RULES = {
  "Progression de Niveau": Object.entries(LEVEL_THRESHOLDS).slice(0, 10).map(([lvl, xp]) => `Niveau ${lvl}: ${xp} XP`),
  "Seuils de Difficulté (d100)": Object.entries(DIFFICULTY_THRESHOLDS).map(([key, val]) => `${key}: DC ${val}`),
  "Catégories d'Armures": Object.entries(EQUIPMENT_RULES.armor_categories).map(([cat, data]) => `${data.label}: ${data.description}`)
};

// Consolidated Legendary Items
const ALL_LEGENDARY_ITEMS = [
  ...LW_BASE,
  ...LW_EXP,
  ...LA_EXP,
  ...DA_EXP,
  WEAPON_LEGENDARY_DRAGONBANE,
  WEAPON_ARTIFACT_SHADOWFANG,
  ARTIFACT_STAFF_ARCHMAGE,
  ARTIFACT_RING_POWER
].filter((item, index, self) =>
  index === self.findIndex((t) => t.id === item.id || t.name === item.name)
);

// Consolidated Bestiary
const ALL_CREATURES = [...Object.values(BESTIARY), ...Object.values(BESTIARY_EXTENDED)];

export function CodexPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('professions');
  const [selectedItem, setSelectedItem] = useState(null);

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
          <button
            className={activeTab === 'professions' ? 'active' : ''}
            onClick={() => { setActiveTab('professions'); setSelectedItem(null); }}
          >
            ⚒️ Métiers
          </button>
          <button
            className={activeTab === 'factions' ? 'active' : ''}
            onClick={() => { setActiveTab('factions'); setSelectedItem(null); }}
          >
            🛡️ Factions
          </button>
          <button
            className={activeTab === 'legendary_items' ? 'active' : ''}
            onClick={() => { setActiveTab('legendary_items'); setSelectedItem(null); }}
          >
            ⚔️ Items Légendaires
          </button>
          <button
            className={activeTab === 'bestiary' ? 'active' : ''}
            onClick={() => { setActiveTab('bestiary'); setSelectedItem(null); }}
          >
            🐉 Bestiaire
          </button>
          <button
            className={activeTab === 'classes' ? 'active' : ''}
            onClick={() => { setActiveTab('classes'); setSelectedItem(null); }}
          >
            ⚔️ Classes
          </button>
          <button
            className={activeTab === 'quests' ? 'active' : ''}
            onClick={() => { setActiveTab('quests'); setSelectedItem(null); }}
          >
            📜 Quêtes
          </button>
          <button
            className={activeTab === 'locations' ? 'active' : ''}
            onClick={() => { setActiveTab('locations'); setSelectedItem(null); }}
          >
            🏰 Lieux
          </button>
          <button
            className={activeTab === 'rules' ? 'active' : ''}
            onClick={() => { setActiveTab('rules'); setSelectedItem(null); }}
          >
            📖 Règles
          </button>
          <button
            className={activeTab === 'world_events' ? 'active' : ''}
            onClick={() => { setActiveTab('world_events'); setSelectedItem(null); }}
          >
            🌍 Événements Mondiaux
          </button>
          <button
            className={activeTab === 'economy' ? 'active' : ''}
            onClick={() => { setActiveTab('economy'); setSelectedItem(null); }}
          >
            💰 Économie
          </button>
        </div>

        <div className="codex-content">
          {activeTab === 'professions' && (
            <div className="professions-view">
              <div className="professions-list">
                <h3>Métiers Disponibles</h3>
                {PROFESSIONS.map(prof => (
                  <div
                    key={prof.id}
                    className="profession-card"
                    onClick={() => setSelectedItem(prof)}
                  >
                    <h4>{prof.name}</h4>
                    <p className="profession-category">
                      {prof.category === 'craft' ? '🔨 Artisanat' : '⛏️ Récolte'}
                    </p>
                    <p className="profession-desc">{prof.description}</p>
                  </div>
                ))}
              </div>

              {!selectedItem ? (
                <div className="details-placeholder">
                  <div className="placeholder-icon">⚒️</div>
                  <p>Sélectionnez un métier pour voir les détails, les rangs et les spécialisations.</p>
                </div>
              ) : (
                <div className="profession-details">
                  <h3>{selectedItem.name}</h3>

                  <div className="lore-section">
                    <h4>📜 Histoire</h4>
                    <p>{selectedItem.lore_background}</p>
                  </div>

                  <div className="stats-section">
                    <h4>📊 Caractéristiques</h4>
                    <p><strong>Stat Principale :</strong> {selectedItem.primary_stat}</p>
                    <p><strong>Stat Secondaire :</strong> {selectedItem.secondary_stat}</p>
                  </div>

                  <div className="ranks-section">
                    <h4>🎖️ Rangs de Progression</h4>
                    {selectedItem.ranks?.map(rank => (
                      <div key={rank.level} className="rank-card">
                        <h5>Niveau {rank.level} - {rank.title}</h5>
                        <p className="xp-required">XP Requis : {rank.xp_required}</p>
                        <div className="rank-bonuses">
                          <strong>Bonus Passifs :</strong>
                          <ul>
                            {rank.passive_bonuses?.map((bonus, i) => (
                              <li key={i}>{bonus}</li>
                            ))}
                          </ul>
                        </div>
                        {rank.special_ability && (
                          <p className="special-ability">
                            <strong>✨ Capacité Spéciale :</strong> {rank.special_ability}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {selectedItem.specializations && selectedItem.specializations.length > 0 && (
                    <div className="specializations-section">
                      <h4>🎯 Spécialisations</h4>
                      {selectedItem.specializations.map(spec => (
                        <div key={spec.id} className="spec-card">
                          <h5>{spec.name} (Débloqué Niv. {spec.unlock_level})</h5>
                          <p>{spec.description}</p>
                          <ul>
                            {spec.bonus_effects.map((effect, i) => (
                              <li key={i}>{effect}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    className="learn-profession-btn"
                    onClick={() => {
                      const result = gameSystemsManager.learnProfession(selectedItem.id);
                      alert(result.message);
                    }}
                  >
                    Apprendre ce Métier
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'factions' && (
            <div className="factions-view">
              <div className="factions-list">
                <h3>Factions Majeures</h3>
                {GUILDES.map(faction => (
                  <div
                    key={faction.id}
                    className={`faction-card type-${faction.category}`}
                    onClick={() => setSelectedItem(faction)}
                  >
                    <div className="card-accent"></div>
                    <div className="faction-header">
                      <h4>{faction.name}</h4>
                      <span className={`category-badge ${faction.category}`}>
                        {faction.category}
                      </span>
                    </div>
                    <div className="faction-brief">
                      <p className="faction-motto">"{faction.motto}"</p>
                      <div className="faction-meta">
                        <span className="meta-item">
                          <span className="meta-label">Chef :</span>
                          <span className="meta-value">{faction.leader}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!selectedItem ? (
                <div className="details-placeholder">
                  <div className="placeholder-icon">🛡️</div>
                  <p>Sélectionnez une faction pour découvrir son histoire, ses objectifs et sa hiérarchie.</p>
                </div>
              ) : (
                <div className="faction-details">
                  <div className="faction-grid-header">
                    <div className="faction-meta-box">
                      <div className="meta-row">
                        <span className="meta-icon">🏰</span>
                        <div className="meta-text">
                          <label>Quartier Général</label>
                          <span>{selectedItem.headquarters}</span>
                        </div>
                      </div>
                      <div className="meta-row">
                        <span className="meta-icon">👑</span>
                        <div className="meta-text">
                          <label>Dirigeant</label>
                          <span>{selectedItem.leader}</span>
                        </div>
                      </div>
                    </div>
                    <div className="faction-meta-box">
                      <div className="meta-row">
                        <span className="meta-icon">⚖️</span>
                        <div className="meta-text">
                          <label>Alignement</label>
                          <span>{selectedItem.alignment}</span>
                        </div>
                      </div>
                      <div className="meta-row">
                        <span className="meta-icon">📜</span>
                        <div className="meta-text">
                          <label>Devise</label>
                          <span className="motto-text">"{selectedItem.motto}"</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lore-section bordered">
                    <h4>📜 Histoire de Fondation</h4>
                    <p>{selectedItem.lore.founding_story}</p>
                  </div>

                  <div className="faction-columns">
                    <div className="goals-section">
                      <h4>🎯 Objectifs Actuels</h4>
                      <ul>
                        {selectedItem.lore.current_goals.map((goal, i) => (
                          <li key={i}>{goal}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="relations-section">
                      <h4>🤝 Diplomatie</h4>
                      <div className="diplomacy-box allies">
                        <strong>Alliés</strong>
                        <p>{selectedItem.lore.allies.join(', ')}</p>
                      </div>
                      <div className="diplomacy-box enemies">
                        <strong>Ennemis</strong>
                        <p>{selectedItem.lore.enemies.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  {selectedItem.lore.secret_history && (
                    <div className="secret-section premium">
                      <div className="secret-header">
                        <span className="lock-icon">🔒</span>
                        <h4>Annales Interdites</h4>
                      </div>
                      <p className="secret-text">{selectedItem.lore.secret_history}</p>
                    </div>
                  )}

                  <div className="ranks-timeline">
                    <h4>🎖️ Hiérarchie de la Faction</h4>
                    <div className="timeline-container">
                      {selectedItem.ranks.map((rank, idx) => (
                        <div key={rank.level} className="faction-rank-card-premium">
                          <div className="rank-level-badge">
                            <span>{rank.level}</span>
                          </div>
                          <div className="rank-content">
                            <div className="rank-header">
                              <h5>{rank.title}</h5>
                              <span className="rep-required">
                                <b>{rank.reputation_required}</b> REP
                              </span>
                            </div>
                            <div className="rank-privileges-grid">
                              {rank.privileges.map((priv, i) => (
                                <div key={i} className="privilege-item">
                                  <span className="dot"></span>
                                  <span>{priv}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="join-faction-btn"
                    onClick={() => {
                      const result = gameSystemsManager.joinFaction(selectedItem.id);
                      alert(result.message);
                    }}
                  >
                    Rejoindre cette Faction
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'legendary_items' && (
            <div className="legendary-items-view">
              <div className="legendary-header">
                <h3>⚔️ Armes & Artefacts de Légende</h3>
                <p className="items-count">{ALL_LEGENDARY_ITEMS.length} reliques répertoriées</p>
              </div>
              <div className="legendary-list">
                {ALL_LEGENDARY_ITEMS.map(item => (
                  <div
                    key={item.id}
                    className={`legendary-card rarity-${item.rarity}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="card-shine"></div>
                    <div className="item-header">
                      <span className={`rarity-badge ${item.rarity}`}>{item.rarity}</span>
                      <h4>{item.name}</h4>
                    </div>
                    <div className="item-content">
                      <p className="item-lore">
                        {item.lore?.current_location || item.description?.substring(0, 120) + '...'}
                      </p>

                      {(item.requirements?.level || item.properties?.level_requirement) && (
                        <div className="item-reqs">
                          <span className="req-label">Niveau :</span>
                          <span className="req-value">
                            {item.requirements?.level || item.properties?.level_requirement}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedItem && selectedItem.lore?.creation_story && (
                <div className="legendary-details">
                  <h3>{selectedItem.name}</h3>

                  <div className="creation-story">
                    <h4>🔥 Histoire de Création</h4>
                    <p>{selectedItem.lore.creation_story}</p>
                  </div>

                  <div className="famous-wielders">
                    <h4>👑 Porteurs Célèbres</h4>
                    {selectedItem.lore.famous_wielders.map((wielder, i) => (
                      <div key={i} className="wielder-card">
                        <h5>{wielder.name}</h5>
                        <p className="wielder-era">{wielder.era}</p>
                        <p>{wielder.notable_deed}</p>
                      </div>
                    ))}
                  </div>

                  <div className="properties-section">
                    <h4>✨ Propriétés Magiques</h4>
                    {selectedItem.properties.magical_effects.map((effect, i) => (
                      <div key={i} className="effect-card">
                        <h5>{effect.name}</h5>
                        <p>{effect.description}</p>
                        <p className="activation">Type : {effect.activation}</p>
                        {effect.cooldown && <p className="cooldown">CD : {effect.cooldown}</p>}
                      </div>
                    ))}
                  </div>

                  <div className="quest-section">
                    <h4>📜 Quête d'Obtention</h4>
                    <h5>{selectedItem.acquisition_quest.name}</h5>
                    <p className="quest-difficulty">
                      Difficulté : <strong>{selectedItem.acquisition_quest.difficulty}</strong>
                    </p>
                    <p>Niveau Recommandé : {selectedItem.acquisition_quest.estimated_level}</p>

                    <div className="quest-stages">
                      {selectedItem.acquisition_quest.quest_stages.map(stage => (
                        <div key={stage.stage_number} className="stage-card">
                          <h6>Étape {stage.stage_number} : {stage.objective}</h6>
                          <p><strong>Lieu :</strong> {stage.location}</p>
                          <ul>
                            {stage.challenges.map((challenge, i) => (
                              <li key={i}>{challenge}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="final-challenge">
                      <h6>🔥 Épreuve Finale</h6>
                      <p>{selectedItem.acquisition_quest.final_challenge}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'economy' && (
            <div className="economy-view">
              <div className="economy-scroll-container">
                <section className="economy-section">
                  <h3>⚔️ Armurerie & Arsenal</h3>
                  <div className="item-grid">
                    {BALANCED_WEAPONS.map(item => (
                      <div key={item.id} className={`item-card rarity-${item.rarity}`}>
                        <div className="item-header">
                          <h4>{item.name}</h4>
                          <span className="rarity-tag">{item.rarity}</span>
                        </div>
                        <div className="item-stats">
                          <p><strong>Dégâts :</strong> {item.stats.damage}</p>
                          {item.stats.attackBonus > 0 && <p><strong>Bonus ATK :</strong> +{item.stats.attackBonus}</p>}
                        </div>
                        <div className="item-requirements">
                          <p>Niveau {item.requirements.level} requis</p>
                          {item.requirements.strength > 0 && <span>FOR {item.requirements.strength}</span>}
                        </div>
                        <div className="item-price">
                          <span className="gold-icon">💰</span>
                          {calculateMerchantPrice(item.basePrice, item.rarity)} PO
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="economy-section">
                  <h3>🛡️ Protections & Armures</h3>
                  <div className="item-grid">
                    {BALANCED_ARMORS.map(item => (
                      <div key={item.id} className={`item-card rarity-${item.rarity}`}>
                        <div className="item-header">
                          <h4>{item.name}</h4>
                          <span className="rarity-tag">{item.rarity}</span>
                        </div>
                        <div className="item-stats">
                          <p><strong>Armure :</strong> {item.stats.armor}</p>
                          <p><strong>Poids :</strong> {item.stats.weight}kg</p>
                        </div>
                        <div className="item-requirements">
                          <p>Niveau {item.requirements.level} requis</p>
                        </div>
                        <div className="item-price">
                          <span className="gold-icon">💰</span>
                          {calculateMerchantPrice(item.basePrice, item.rarity)} PO
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="economy-section">
                  <h3>🧪 Potions & Vivres</h3>
                  <div className="item-grid">
                    {BALANCED_CONSUMABLES.map(item => (
                      <div key={item.id} className={`item-card rarity-${item.rarity}`}>
                        <div className="item-header">
                          <h4>{item.name}</h4>
                          <span className="rarity-tag">{item.rarity}</span>
                        </div>
                        <p className="item-desc">{item.description}</p>
                        <div className="item-price">
                          <span className="gold-icon">💰</span>
                          {calculateMerchantPrice(item.basePrice, item.rarity)} PO
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === 'bestiary' && (
            <div className="bestiary-view">
              <h3>Créatures d'Aethelgard</h3>
              <div className="creature-grid">
                {ALL_CREATURES.map((creature, idx) => (
                  <div key={creature.id || idx} className="creature-card" onClick={() => setSelectedItem(creature)}>
                    <h4>{creature.name}</h4>
                    <p className="creature-type">{creature.type || 'Créature'}</p>
                    <div className="creature-stats">
                      <span>HP: {creature.hp || '?'}</span>
                      <span>AC: {creature.ac || '?'}</span>
                      <span>ATK: {creature.attack || '?'}</span>
                    </div>
                    <p className="creature-habitat">{creature.habitat || creature.location || 'Inconnu'}</p>
                  </div>
                ))}
              </div>
              
              {selectedItem && activeTab === 'bestiary' && (
                <div className="creature-detail">
                  <h3>{selectedItem.name}</h3>
                  <p><strong>Type:</strong> {selectedItem.type || 'Créature'}</p>
                  <div className="stats-row">
                    <span>HP: {selectedItem.hp}</span>
                    <span>AC: {selectedItem.ac}</span>
                    <span>ATK: {selectedItem.attack}</span>
                  </div>
                  <p><strong>Habitat:</strong> {selectedItem.habitat || selectedItem.location}</p>
                  <p>{selectedItem.description || selectedItem.behavior}</p>
                  {selectedItem.abilities && (
                    <div>
                      <h4>Capacités:</h4>
                      <ul>
                        {selectedItem.abilities.map((ability, i) => (
                          <li key={i}>{ability}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedItem.loot && (
                    <div>
                      <h4>Butin:</h4>
                      <ul>
                        {selectedItem.loot.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'classes' && (
            <div className="classes-view">
              <h3>Classes Disponibles</h3>
              <div className="class-grid">
                {Object.values(CLASSES).map(classData => (
                  <div key={classData.id} className="class-card" onClick={() => setSelectedItem(classData)}>
                    <h4>{classData.name}</h4>
                    <p className="class-archetype">{classData.archetype || 'Classe'}</p>
                    <div className="class-stats">
                      <span>HP Base: {classData.base_hp || classData.baseHP}</span>
                      <span>PM: {classData.base_pm || classData.basePM || 3}</span>
                    </div>
                    <p className="class-desc">{classData.description?.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
              
              {selectedItem && activeTab === 'classes' && (
                <div className="class-detail">
                  <h3>{selectedItem.name}</h3>
                  <p><strong>Archétype:</strong> {selectedItem.archetype}</p>
                  <p>{selectedItem.description}</p>
                  {selectedItem.skills && (
                    <div>
                      <h4>Compétences:</h4>
                      <ul>
                        {selectedItem.skills.map((skill, i) => (
                          <li key={i}><strong>{skill.name}:</strong> {skill.description}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedItem.starting_equipment && (
                    <div>
                      <h4>Équipement de départ:</h4>
                      <ul>
                        {selectedItem.starting_equipment.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'quests' && (
            <div className="quests-view">
              <h3>Quêtes Disponibles</h3>
              <div className="quest-grid">
                {ALL_QUESTS.map((quest, idx) => (
                  <div key={quest.id || idx} className="quest-card" onClick={() => setSelectedItem(quest)}>
                    <h4>{quest.name || quest.title}</h4>
                    <p className="quest-difficulty">{quest.difficulty || 'Moyenne'}</p>
                    <p className="quest-reward">Récompense: {quest.xp_reward || quest.gold_reward ? `${quest.xp_reward || 0} XP / ${quest.gold_reward || 0} PO` : 'À définir'}</p>
                    <p className="quest-desc">{quest.hook?.substring(0, 100) || quest.description?.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
              
              {selectedItem && activeTab === 'quests' && (
                <div className="quest-detail">
                  <h3>{selectedItem.name || selectedItem.title}</h3>
                  <p><strong>Difficulté:</strong> {selectedItem.difficulty}</p>
                  <p><strong>Niveau recommandé:</strong> {selectedItem.min_level || selectedItem.level || 1}</p>
                  <p>{selectedItem.hook || selectedItem.description}</p>
                  {selectedItem.stages && (
                    <div>
                      <h4>Étapes:</h4>
                      <ol>
                        {selectedItem.stages.map((stage, i) => (
                          <li key={i}>{stage}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {selectedItem.reward && (
                    <div>
                      <h4>Récompenses:</h4>
                      <p>{selectedItem.reward}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="locations-view">
              <h3>Lieux d'Aethelgard</h3>
              <div className="location-grid">
                {TAVERNS_AND_LOCATIONS.map((loc, idx) => (
                  <div key={loc.id || idx} className="location-card" onClick={() => setSelectedItem(loc)}>
                    <h4>{loc.name}</h4>
                    <p className="location-type">{loc.type || 'Lieu'}</p>
                    <p className="location-region">{loc.region || loc.location || 'Région inconnue'}</p>
                    <p className="location-desc">{loc.description?.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
              
              {selectedItem && activeTab === 'locations' && (
                <div className="location-detail">
                  <h3>{selectedItem.name}</h3>
                  <p><strong>Type:</strong> {selectedItem.type}</p>
                  <p><strong>Région:</strong> {selectedItem.region || selectedItem.location}</p>
                  <p>{selectedItem.description}</p>
                  {selectedItem.npcs && (
                    <div>
                      <h4>Personnages notables:</h4>
                      <ul>
                        {selectedItem.npcs.map((npc, i) => (
                          <li key={i}><strong>{npc.name}:</strong> {npc.role}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedItem.services && (
                    <div>
                      <h4>Services:</h4>
                      <ul>
                        {selectedItem.services.map((service, i) => (
                          <li key={i}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="rules-view">
              <h3>Règles du Monde</h3>
              <div className="rules-scroll">
                {Object.entries(WORLD_RULES).map(([category, rules]) => (
                  <div key={category} className="rule-category">
                    <h4>{category}</h4>
                    {Array.isArray(rules) ? (
                      <ul>
                        {rules.map((rule, i) => (
                          <li key={i}>{rule}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{rules}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
