import React, { useState } from 'react';
import { gameSystemsManager } from '../lore/game-systems-manager';
import { BLACKSMITHING } from '../lore/professions/craft/blacksmithing';
import { ALCHEMY } from '../lore/professions/craft/alchemy';
import { MINING } from '../lore/professions/gather/mining';
import { GUILDES } from '../lore/factions/index';
import { LEGENDARY_WEAPONS } from '../lore/legendary-items';
import './CodexPanel.css';

// type CodexTab = 'professions' | 'factions' | 'legendary_items' | 'world_events' | 'economy';

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
            onClick={() => setActiveTab('professions')}
          >
            ⚒️ Métiers
          </button>
          <button
            className={activeTab === 'factions' ? 'active' : ''}
            onClick={() => setActiveTab('factions')}
          >
            🛡️ Factions
          </button>
          <button
            className={activeTab === 'legendary_items' ? 'active' : ''}
            onClick={() => setActiveTab('legendary_items')}
          >
            ⚔️ Items Légendaires
          </button>
          <button
            className={activeTab === 'world_events' ? 'active' : ''}
            onClick={() => setActiveTab('world_events')}
          >
            🌍 Événements Mondiaux
          </button>
          <button
            className={activeTab === 'economy' ? 'active' : ''}
            onClick={() => setActiveTab('economy')}
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

              {selectedItem && selectedItem.id && (
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
                    {selectedItem.ranks.map(rank => (
                      <div key={rank.level} className="rank-card">
                        <h5>Niveau {rank.level} - {rank.title}</h5>
                        <p className="xp-required">XP Requis : {rank.xp_required}</p>
                        <div className="rank-bonuses">
                          <strong>Bonus Passifs :</strong>
                          <ul>
                            {rank.passive_bonuses.map((bonus, i) => (
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
                    className="faction-card"
                    onClick={() => setSelectedItem(faction)}
                  >
                    <div className="faction-header">
                      <h4>{faction.name}</h4>
                      <span className={`faction-category ${faction.category}`}>
                        {faction.category}
                      </span>
                    </div>
                    <p className="faction-motto">"{faction.motto}"</p>
                    <p className="faction-leader">Chef : {faction.leader}</p>
                  </div>
                ))}
              </div>

              {selectedItem && selectedItem.lore && (
                <div className="faction-details">
                  <h3>{selectedItem.symbol} {selectedItem.name}</h3>
                  
                  <div className="faction-info">
                    <p><strong>QG :</strong> {selectedItem.headquarters}</p>
                    <p><strong>Chef :</strong> {selectedItem.leader}</p>
                    <p><strong>Devise :</strong> "{selectedItem.motto}"</p>
                    <p><strong>Alignement :</strong> {selectedItem.alignment}</p>
                  </div>

                  <div className="lore-section">
                    <h4>📜 Histoire de Fondation</h4>
                    <p>{selectedItem.lore.founding_story}</p>
                  </div>

                  <div className="goals-section">
                    <h4>🎯 Objectifs Actuels</h4>
                    <ul>
                      {selectedItem.lore.current_goals.map((goal, i) => (
                        <li key={i}>{goal}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="relations-section">
                    <h4>🤝 Relations</h4>
                    <p><strong>Alliés :</strong> {selectedItem.lore.allies.join(', ')}</p>
                    <p><strong>Ennemis :</strong> {selectedItem.lore.enemies.join(', ')}</p>
                  </div>

                  {selectedItem.lore.secret_history && (
                    <div className="secret-section">
                      <h4>🔒 Histoire Secrète</h4>
                      <p className="secret-text">{selectedItem.lore.secret_history}</p>
                    </div>
                  )}

                  <div className="ranks-section">
                    <h4>🎖️ Hiérarchie</h4>
                    {selectedItem.ranks.map(rank => (
                      <div key={rank.level} className="faction-rank-card">
                        <h5>Rang {rank.level} - {rank.title}</h5>
                        <p>Réputation Requise : {rank.reputation_required}</p>
                        <div className="rank-privileges">
                          <strong>Privilèges :</strong>
                          <ul>
                            {rank.privileges.map((priv, i) => (
                              <li key={i}>{priv}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
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
              <h3>⚔️ Armes et Artefacts Légendaires</h3>
              <div className="legendary-list">
                {LEGENDARY_WEAPONS.map(item => (
                  <div
                    key={item.id}
                    className="legendary-card"
                    onClick={() => setSelectedItem(item)}
                  >
                    <h4>{item.name}</h4>
                    <p className="rarity-badge">{item.rarity}</p>
                    <p className="item-location">Emplacement : {item.lore.current_location}</p>
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
              <h3>💰 Marchés d'Aethelgard</h3>
              <p>Système économique dynamique avec prix variables selon événements.</p>
              <div className="markets-info">
                <p>🏛️ Aethelmere : Prospérité Maximale (x1.25 prix)</p>
                <p>⚓ Port-Azure : Commerce Maritime</p>
                <p>❄️ Bastion-de-Fer : Forge & Minerais</p>
                <p>🌳 Sylvanor : Herbes & Alchimie</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
