import React, { useState, useEffect } from 'react';
import { gameSystemsManager } from '../lore/game-systems-manager';
import { BLACKSMITHING } from '../lore/professions/craft/blacksmithing';
import { ALCHEMY } from '../lore/professions/craft/alchemy';
import { ENCHANTING } from '../lore/professions/craft/enchanting';
import { COOKING } from '../lore/professions/craft/cooking';
import { LEATHERWORKING } from '../lore/professions/craft/leatherworking';
import { TAILORING } from '../lore/professions/craft/tailoring';
import { CARPENTRY } from '../lore/professions/craft/carpentry';
import { JEWELCRAFTING } from '../lore/professions/craft/jewelcrafting';
import { MINING } from '../lore/professions/gather/mining';
import { HERBALISM } from '../lore/professions/gather/herbalism';
import { FISHING } from '../lore/professions/gather/fishing';
import { HUNTING } from '../lore/professions/gather/hunting';
import { WOODCUTTING } from '../lore/professions/gather/woodcutting';
import { SKINNING } from '../lore/professions/gather/skinning';
import { GUILDES } from '../lore/factions/index';
import { ALL_FACTIONS as LORE_FACTIONS } from '../lore/factions';
import { LEGENDARY_WEAPONS } from '../lore/legendary-items';
import { ALL_LEGENDARY_ITEMS as LEGENDARY_ITEMS_EXPANDED } from '../lore/items-legendary-expansion';
import {
  BALANCED_WEAPONS,
  BALANCED_ARMORS,
  BALANCED_CONSUMABLES,
  calculateMerchantPrice
} from '../lore/economy-system';
import { ALL_CREATURES } from '../lore/bestiary';
import { EXPANDED_BESTIARY_BATCH_1 } from '../lore/bestiary-expansion-1';
import { EXPANDED_BESTIARY_BATCH_2 } from '../lore/bestiary-expansion-2';
import { BESTIARY_EXPANSION_3 } from '../lore/bestiary-expansion-3';
import { CLASSES, CLASS_CATEGORIES } from '../lore/classes';
import { ALL_QUESTS } from '../lore/quests';
import { ARC_SEALED_ONES_QUESTS } from '../lore/quests-arc-sealed-ones';
import { WORLD_EVENTS as CORE_WORLD_EVENTS } from '../lore/world-events';
import { ALL_WORLD_EVENTS as EXPANDED_WORLD_EVENTS } from '../lore/events-world-expansion';
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
  ...LEGENDARY_ITEMS_EXPANDED,
].filter((item, index, self) =>
  index === self.findIndex((t) => t.id === item.id)
);

// Consolidated Bestiary
const normalizeCreature = (creature, index) => ({
  ...creature,
  id: creature.id || `creature_${index}_${(creature.name || 'unknown').toLowerCase().replace(/\s+/g, '_')}`,
  name: creature.name || 'Créature Inconnue',
  type: creature.type || creature.class || 'Créature',
  challengeRating: creature.challengeRating ?? creature.cr ?? creature.level ?? 1,
  description: creature.description || creature.desc || 'Aucune description disponible.'
});

const FULL_BESTIARY = [
  ...ALL_CREATURES,
  ...EXPANDED_BESTIARY_BATCH_1,
  ...EXPANDED_BESTIARY_BATCH_2,
  ...BESTIARY_EXPANSION_3
]
  .map(normalizeCreature)
  .filter((c, index, self) =>
    index === self.findIndex((t) => (t.id || t.name) === (c.id || c.name))
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

const parseLegendaryEffects = (item) => {
  const directEffects = item?.properties?.magical_effects;
  if (Array.isArray(directEffects) && directEffects.length > 0) {
    return directEffects
      .filter((effect) => effect && (effect.name || effect.description))
      .map((effect, index) => ({
        name: effect.name || `Propriété ${index + 1}`,
        description: effect.description || 'Aucune description.'
      }));
  }

  const description = typeof item?.description === 'string' ? item.description : '';
  const powersSection = description.includes('**Pouvoirs:**')
    ? description.split('**Pouvoirs:**')[1]
    : (description.includes('Pouvoirs:') ? description.split('Pouvoirs:')[1] : '');

  const parsedPowers = powersSection
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('-'))
    .map((line, index) => ({
      name: `Pouvoir ${index + 1}`,
      description: line.replace(/^-\s*/, '').trim()
    }));

  if (parsedPowers.length > 0) {
    return parsedPowers;
  }

  const fallbackEffects = [];

  if (item?.stats && Object.keys(item.stats).length > 0) {
    const statsText = Object.entries(item.stats)
      .map(([key, value]) => `${key}: ${value}`)
      .join(' | ');
    fallbackEffects.push({ name: 'Statistiques', description: statsText });
  }

  if (item?.requirements && Object.keys(item.requirements).length > 0) {
    const reqText = Object.entries(item.requirements)
      .map(([key, value]) => `${key}: ${value}`)
      .join(' | ');
    fallbackEffects.push({ name: 'Pré-requis', description: reqText });
  }

  if (item?.questRequired) {
    fallbackEffects.push({ name: 'Quête associée', description: item.questRequired });
  }

  if (item?.cursed) {
    fallbackEffects.push({ name: 'Malédiction', description: 'Cet artefact est maudit.' });
  }

  return fallbackEffects;
};

const normalizeWorldEvent = (event) => ({
  id: event.id,
  name: event.name || 'Événement Inconnu',
  kind: event.type || event.category || 'event',
  scope: event.magnitude || 'regional',
  durationDays: event.duration || event.initial_phase?.duration_days || 0,
  levelRequirement: event.levelRequirement || 1,
  description: event.description || event.initial_phase?.description || 'Aucune chronique disponible.',
  triggers: event.triggers || event.trigger_conditions?.player_actions || [],
  regions: event.regions || [],
  objectives: event.phases?.[0]?.objectives || event.escalation_phases?.[0]?.player_intervention_options?.map((o) => o.action) || [],
  consequences:
    event.consequences ||
    event.resolution?.possible_endings?.flatMap((ending) => ending.long_term_consequences || []).slice(0, 5) ||
    [],
  rumors: event.initial_phase?.rumors_spreading || []
});

const WORLD_CHRONICLES = [
  ...CORE_WORLD_EVENTS,
  ...EXPANDED_WORLD_EVENTS
]
  .map(normalizeWorldEvent)
  .filter((event, index, self) => index === self.findIndex((e) => e.id === event.id));

const ALL_BALANCED_ITEMS = [
  ...BALANCED_WEAPONS,
  ...BALANCED_ARMORS,
  ...BALANCED_CONSUMABLES
].filter((item, index, self) => index === self.findIndex((it) => it.id === item.id));

const ECONOMY_CATEGORY_LABELS = {
  all: 'Tout le Comptoir',
  weapon: 'Armurerie',
  armor: 'Protections',
  consumable: 'Vivres',
  material: 'Matériaux'
};

const ECONOMY_CATEGORIES = [
  { id: 'all', label: ECONOMY_CATEGORY_LABELS.all, items: ALL_BALANCED_ITEMS },
  ...Object.entries(ECONOMY_CATEGORY_LABELS)
    .filter(([type]) => type !== 'all')
    .map(([type, label]) => ({
      id: type,
      label,
      items: ALL_BALANCED_ITEMS.filter((item) => item.type === type)
    }))
    .filter((category) => category.items.length > 0)
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

  const PROFESSIONS = [
    BLACKSMITHING,
    ALCHEMY,
    ENCHANTING,
    COOKING,
    LEATHERWORKING,
    TAILORING,
    CARPENTRY,
    JEWELCRAFTING,
    MINING,
    HERBALISM,
    FISHING,
    HUNTING,
    WOODCUTTING,
    SKINNING
  ];

  const normalizeFaction = (faction) => ({
    id: faction.id,
    name: faction.name,
    category: faction.category || faction.type || 'guild',
    motto: faction.motto || faction.summary || 'Aucune devise connue',
    headquarters: faction.headquarters || 'Inconnu',
    leader: faction.leader || 'Inconnu',
    lore: {
      founding_story:
        faction.lore?.founding_story ||
        faction.description ||
        faction.summary ||
        'Aucune chronique disponible.'
    },
    ranks: (faction.ranks || []).map((rank, index) => ({
      level: rank.level ?? index + 1,
      title: rank.title || rank.name || `Rang ${index + 1}`,
      reputation_required: rank.reputation_required ?? rank.threshold ?? 0,
      privileges: rank.privileges || rank.perks || []
    }))
  });

  const FACTIONS = [
    ...GUILDES.map(normalizeFaction),
    ...LORE_FACTIONS.map(normalizeFaction)
  ].filter((faction, index, self) => index === self.findIndex((f) => f.id === faction.id));

  const normalizeQuest = (quest) => ({
    ...quest,
    title: quest.title || quest.name || 'Quête Inconnue',
    difficulty:
      quest.difficulty ||
      (quest.suggestedLevel >= 15 ? 'Épique' : quest.suggestedLevel >= 8 ? 'Difficile' : 'Moyenne'),
    min_level: quest.min_level || quest.suggestedLevel || quest.level || 1,
    hook: quest.hook || quest.summary || quest.description || 'Aucune accroche disponible.'
  });

  const CODEX_QUESTS = [
    ...ALL_QUESTS,
    ...ARC_SEALED_ONES_QUESTS
  ]
    .map(normalizeQuest)
    .filter((quest, index, self) => index === self.findIndex((q) => q.id === quest.id));

  const playerProfessions = gameSystemsManager.exportState().player_professions || [];
  const swornProfessionId = playerProfessions[0]?.profession_id || null;
  const hasSwornProfession = Boolean(swornProfessionId);
  const isProfessionLocked = (professionId) => hasSwornProfession && professionId !== swornProfessionId;
  const isSelectedProfessionKnown = Boolean(selectedItem?.id && playerProfessions.some((p) => p.profession_id === selectedItem.id));
  const isSelectedProfessionLocked = Boolean(selectedItem?.id && isProfessionLocked(selectedItem.id));

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
                  <div
                    key={prof.id}
                    className={`profession-card ${selectedItem?.id === prof.id ? 'active' : ''} ${isProfessionLocked(prof.id) ? 'locked' : ''}`}
                    onClick={() => {
                      if (isProfessionLocked(prof.id)) return;
                      setSelectedItem(prof);
                    }}
                  >
                    <h4>{prof.name}</h4>
                    <p className="profession-category">{prof.category === 'craft' ? '⚒️ Grand Artisanat' : '⛏️ Maître Récolteur'}</p>
                    <p className="profession-desc">{prof.description.substring(0, 80)}...</p>
                    {isProfessionLocked(prof.id) && <p className="profession-lock">🔒 Inaccessible après serment</p>}
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
                    <button
                      className="premium-action-btn"
                      disabled={isSelectedProfessionLocked || isSelectedProfessionKnown}
                      onClick={() => {
                        if (isSelectedProfessionLocked || isSelectedProfessionKnown) return;
                        const result = gameSystemsManager.learnProfession(selectedItem.id);
                        triggerFeedback(result.success ? 'Serment Prêté' : 'Serment Refusé', result.message, result.success ? '⚒️' : '⛔');
                      }}
                    >
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
                {FACTIONS.map(faction => (
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
                  <div className="lore-section"><h4>🔥 Chronique de Création</h4><p className="lore-p">{selectedItem.lore?.creation_story || selectedItem.lore || selectedItem.description}</p></div>
                  <div className="abilities-section">
                    <h4>✨ Propriétés Sacrées</h4>
                    <div className="ability-detail-grid">
                      {(() => {
                        const legendaryEffects = parseLegendaryEffects(selectedItem);
                        if (legendaryEffects.length === 0) {
                          return <p>Aucune propriété détaillée disponible pour cette relique.</p>;
                        }
                        return legendaryEffects.map((effect, i) => (
                          <div key={i} className="ability-card">
                            <div className="ability-header"><h5>{effect.name}</h5></div>
                            <p>{effect.description}</p>
                          </div>
                        ));
                      })()}
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
                <div className="class-categories-overview">
                  {Object.entries(CLASS_CATEGORIES).map(([id, cat]) => (
                    <div key={id} className="rule-card">
                      <h4>{cat.icon} {cat.label}</h4>
                      <p className="profession-desc">{cat.desc}</p>
                    </div>
                  ))}
                </div>
                {Object.values(CLASSES).map(cls => (
                  <div key={cls.label} className={`class-card ${selectedItem?.label === cls.label ? 'active' : ''}`} onClick={() => setSelectedItem(cls)}>
                    <h4>{cls.label}</h4>
                    <p className="class-role">{CLASS_CATEGORIES[cls.category]?.icon} {CLASS_CATEGORIES[cls.category]?.label || cls.category}</p>
                    <p className="class-role">✨ {cls.recommended_stats?.major?.join(' / ') || 'Équilibre'}</p>
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">⚔️</div><p>Choisissez votre voie héroïque.</p></div>
              ) : (
                <div className="class-details">
                  <h3>{selectedItem.label}</h3>
                  {CLASS_CATEGORIES[selectedItem.category] && (
                    <div className="stats-section">
                      <h4>{CLASS_CATEGORIES[selectedItem.category].icon} Catégorie</h4>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-label">Voie</span>
                          <span className="stat-value">{CLASS_CATEGORIES[selectedItem.category].label}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Affinité</span>
                          <span className="stat-value">{CLASS_CATEGORIES[selectedItem.category].classes.join(' / ')}</span>
                        </div>
                      </div>
                      <p className="lore-p">{CLASS_CATEGORIES[selectedItem.category].desc}</p>
                    </div>
                  )}

                  <div className="stats-section">
                    <h4>📊 Fiche Technique</h4>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <span className="stat-label">Dé de Vie</span>
                        <span className="stat-value">d{selectedItem.hitDie || 6}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Ressource</span>
                        <span className="stat-value">{selectedItem.resourceStat || 'N/A'}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Stats majeures</span>
                        <span className="stat-value">{selectedItem.recommended_stats?.major?.join(' / ') || 'N/A'}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Stats mineures</span>
                        <span className="stat-value">{selectedItem.recommended_stats?.minor?.join(' / ') || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {selectedItem.mechanic && (
                    <div className="lore-section">
                      <h4>⚙️ Mécanique de Classe — {selectedItem.mechanic.name}</h4>
                      <p className="lore-p">{selectedItem.mechanic.desc}</p>
                    </div>
                  )}

                  {selectedItem.protection && (
                    <div className="stats-section">
                      <h4>�️ Maîtrises</h4>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-label">Armures</span>
                          <span className="stat-value">{selectedItem.protection.armor?.join(' / ') || 'Aucune'}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Armes</span>
                          <span className="stat-value">{selectedItem.protection.weapons?.join(' / ') || 'Aucune'}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Boucliers</span>
                          <span className="stat-value">{selectedItem.protection.shields ? 'Oui' : 'Non'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="lore-section"><h4>�📜 Voie & Philosophie</h4><p className="lore-p">{selectedItem.desc}</p></div>

                  {(selectedItem.starting_equipment_options?.length > 0) && (
                    <div className="abilities-section">
                      <h4>🎒 Équipements de départ</h4>
                      <div className="ability-detail-grid">
                        {selectedItem.starting_equipment_options.map((option, idx) => (
                          <div key={idx} className="ability-card">
                            <div className="ability-header"><h5>{option.label}</h5></div>
                            <p>{option.items?.map((it) => it.name).join(', ')}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedItem.subclasses && Object.keys(selectedItem.subclasses).length > 0) && (
                    <div className="abilities-section">
                      <h4>🧭 Spécialisations</h4>
                      <div className="ability-detail-grid">
                        {Object.values(selectedItem.subclasses).map((subclass, idx) => (
                          <div key={idx} className="ability-card">
                            <div className="ability-header"><h5>{subclass.label}</h5></div>
                            <p>{subclass.desc}</p>
                            {subclass.details?.feature && <p>{subclass.details.feature}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="abilities-section">
                    <h4>✨ Arts & Sortilèges</h4>
                    <div className="ability-detail-grid">
                      {(selectedItem.abilities?.length ? selectedItem.abilities : selectedItem.unlockables || []).map((ability, idx) => (
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
                {CODEX_QUESTS.map((quest, idx) => (
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

                  <div className="stats-section atlas-stats">
                    <h4>📍 Informations Générales</h4>
                    <div className="atlas-stats-grid">
                      <div className="stat-card">
                        <div className="stat-card-icon">🌍</div>
                        <div className="stat-card-content">
                          <span className="stat-label">Région</span>
                          <span className="stat-value">{selectedItem.region || 'Inconnu'}</span>
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-card-icon">🏛️</div>
                        <div className="stat-card-content">
                          <span className="stat-label">Type</span>
                          <span className="stat-value">{selectedItem.type}</span>
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-card-icon">⚔️</div>
                        <div className="stat-card-content">
                          <span className="stat-label">Danger</span>
                          <span className="stat-value danger-text">
                            {selectedItem.dangerLevel || 'Moyen'}
                          </span>
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-card-icon">📜</div>
                        <div className="stat-card-content">
                          <span className="stat-label">Niveau suggéré</span>
                          <span className="stat-value">{selectedItem.suggestedLevel || 1}</span>
                        </div>
                      </div>
                      {selectedItem.population && (
                        <div className="stat-card">
                          <div className="stat-card-icon">👥</div>
                          <div className="stat-card-content">
                            <span className="stat-label">Population</span>
                            <span className="stat-value">{selectedItem.population.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                      {selectedItem.biome && (
                        <div className="stat-card">
                          <div className="stat-card-icon">🌲</div>
                          <div className="stat-card-content">
                            <span className="stat-label">Biome</span>
                            <span className="stat-value">{selectedItem.biome}</span>
                          </div>
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
              <div className="quests-list">
                <h3>Chroniques du Monde</h3>
                {WORLD_CHRONICLES.map((event, idx) => (
                  <div key={event.id || idx} className={`quest-card ${selectedItem?.id === event.id ? 'active' : ''}`} onClick={() => setSelectedItem(event)}>
                    <h4>{event.name}</h4>
                    <p className="quest-difficulty">{event.kind} • {event.scope}</p>
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">🌍</div><p>Consultez les chroniques et bouleversements d'Aethelgard.</p></div>
              ) : (
                <div className="quest-details">
                  <h3>{selectedItem.name}</h3>
                  <div className="stats-section">
                    <h4>📊 Informations</h4>
                    <div className="stats-grid">
                      <div className="stat-item"><span className="stat-label">Type</span><span className="stat-value">{selectedItem.kind}</span></div>
                      <div className="stat-item"><span className="stat-label">Portée</span><span className="stat-value">{selectedItem.scope}</span></div>
                      <div className="stat-item"><span className="stat-label">Durée</span><span className="stat-value">{selectedItem.durationDays} jours</span></div>
                      <div className="stat-item"><span className="stat-label">Niveau recommandé</span><span className="stat-value">{selectedItem.levelRequirement}</span></div>
                    </div>
                  </div>

                  <div className="lore-section"><h4>📜 Chronique</h4><p className="lore-p">{selectedItem.description}</p></div>

                  {selectedItem.regions?.length > 0 && (
                    <div className="lore-section"><h4>🗺️ Régions concernées</h4><p className="lore-p">{selectedItem.regions.join(' • ')}</p></div>
                  )}

                  {selectedItem.objectives?.length > 0 && (
                    <div className="lore-section"><h4>🎯 Objectifs majeurs</h4><ul>{selectedItem.objectives.map((o, i) => <li key={i} className="lore-p">{o}</li>)}</ul></div>
                  )}

                  {selectedItem.triggers?.length > 0 && (
                    <div className="lore-section"><h4>⚡ Déclencheurs</h4><ul>{selectedItem.triggers.map((t, i) => <li key={i} className="lore-p">{t}</li>)}</ul></div>
                  )}

                  {selectedItem.consequences?.length > 0 && (
                    <div className="lore-section"><h4>🏛️ Conséquences</h4><ul>{selectedItem.consequences.map((c, i) => <li key={i} className="lore-p">{c}</li>)}</ul></div>
                  )}

                  {selectedItem.rumors?.length > 0 && (
                    <div className="lore-section"><h4>🕯️ Rumeurs</h4><ul>{selectedItem.rumors.map((r, i) => <li key={i} className="lore-p">{r}</li>)}</ul></div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'economy' && (
            <div className="economy-view">
              <div className="economy-list">
                <h3>Archives du Comptoir</h3>
                {ECONOMY_CATEGORIES.map(cat => (
                  <div key={cat.id} className={`economy-card ${selectedItem?.id === cat.id ? 'active' : ''}`} onClick={() => setSelectedItem(cat)}>
                    <h4>{cat.label}</h4>
                  </div>
                ))}
              </div>
              {!selectedItem ? (
                <div className="details-placeholder"><div className="placeholder-icon">💰</div><p>Consultez les prix du marché.</p></div>
              ) : (
                <div className="economy-details">
                  <h3>{selectedItem.label || 'Comptoir'}</h3>
                  <div className="ability-detail-grid">
                    {(selectedItem.items || []).map(item => (
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
