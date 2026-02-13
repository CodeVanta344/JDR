// ============================================================
// SIDEBAR EFFETS CUMULÉS - Affichage Temps Réel
// ============================================================

import React, { useMemo } from 'react';
import type { LifepathSelection, StatKey } from '../../types/lore';
import { accumulateEffects } from '../../lore/character-creation/lifepath';
import { STAT_LABELS } from '../../types/lore';
import './EffectsSidebar.css';

interface Props {
  selection: Partial<LifepathSelection>;
}

export const EffectsSidebar: React.FC<Props> = ({ selection }) => {
  // Calculer effets cumulés
  const effects = useMemo(() => {
    // Vérifier si au moins 1 choix fait
    const hasChoices = 
      Object.keys(selection.birth || {}).length > 0 ||
      Object.keys(selection.childhood || {}).length > 0 ||
      Object.keys(selection.adolescence || {}).length > 0 ||
      Object.keys(selection.youngAdult || {}).length > 0;

    if (!hasChoices) return null;

    try {
      // Note: accumulateEffects ne crashera pas si sélection incomplète
      return accumulateEffects(selection as any);
    } catch {
      return null;
    }
  }, [selection]);

  if (!effects) {
    return (
      <div className="effects-sidebar empty">
        <h3>Effets Cumulés</h3>
        <p className="placeholder-text">
          Vos choix apparaîtront ici au fur et à mesure de votre sélection.
        </p>
      </div>
    );
  }

  return (
    <div className="effects-sidebar">
      <h3 className="sidebar-title">Effets Cumulés</h3>

      {/* Stats */}
      <section className="sidebar-section">
        <div className="sidebar-label">Statistiques</div>
        <div className="stats-grid">
          {(Object.keys(STAT_LABELS) as StatKey[]).map(statKey => {
            const bonus = effects.final_stats[statKey] || 0;
            const baseValue = 0; // Base de référence
            const finalValue = baseValue + bonus;

            return (
              <div key={statKey} className="stat-item">
                <span className="stat-label">{STAT_LABELS[statKey]}</span>
                <span className="stat-value-display">
                  <span className="final-value">{finalValue}</span>
                  {bonus !== 0 && (
                    <span className={`bonus-indicator ${bonus > 0 ? 'positive' : 'negative'}`}>
                      {bonus > 0 ? '+' : ''}{bonus}
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Traits Mécaniques */}
      {effects.all_traits.length > 0 && (
        <section className="sidebar-section">
          <div className="sidebar-label">Capacités Spéciales ({effects.all_traits.length})</div>
          <div className="traits-list">
            {effects.all_traits.map((trait, idx) => (
              <div key={idx} className="trait-item">
                <strong>{trait.name}</strong>
                <p>{trait.desc}</p>
                {trait.game_effect && (
                  <span className="game-effect">{trait.game_effect}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Réputation */}
      {effects.reputation_map.size > 0 && (
        <section className="sidebar-section">
          <div className="sidebar-label">Réputation</div>
          <div className="reputation-list">
            {Array.from(effects.reputation_map.entries()).map(([factionId, value]) => (
              <div key={factionId} className={`rep-item ${value > 0 ? 'positive' : 'negative'}`}>
                <span className="rep-faction">{factionId.replace(/_/g, ' ')}</span>
                <span className="rep-value">
                  {value > 0 ? '+' : ''}{value}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Compétences */}
      {effects.skills.length > 0 && (
        <section className="sidebar-section">
          <div className="sidebar-label">Bonus Compétences</div>
          <div className="skills-list">
            {effects.skills.map((skill, idx) => (
              <div key={idx} className="skill-item">
                <span className="skill-name">{skill.skillId.replace(/_/g, ' ')}</span>
                <span className="skill-bonus">+{skill.bonus}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Items */}
      {effects.items.length > 0 && (
        <section className="sidebar-section">
          <div className="sidebar-label">Équipement de Départ</div>
          <ul className="items-list">
            {effects.items.map((item, idx) => (
              <li key={idx}>
                {item.quantity}x {item.itemId.replace(/_/g, ' ')}
                <span className="item-reason">({item.reason})</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Langues */}
      {effects.languages.length > 0 && (
        <section className="sidebar-section">
          <div className="sidebar-label">Langues</div>
          <div className="languages-tags">
            {effects.languages.map(lang => (
              <span key={lang} className="language-tag">{lang}</span>
            ))}
          </div>
        </section>
      )}

      {/* Résumé Narratif */}
      {effects.narrative_summary && (
        <section className="sidebar-section narrative">
          <div className="sidebar-label">Votre Histoire</div>
          <div className="narrative-text">
            {effects.narrative_summary}
          </div>
        </section>
      )}
    </div>
  );
};
