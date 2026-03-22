import { useState, useMemo } from 'react'
import { CLASSES, CLASS_CATEGORIES } from '@lore/classes'
import type { Class, ClassCategory, Ability } from '@lore/classes'

const STAT_LABELS: Record<string, string> = {
  str: '💪 FOR', dex: '🎯 DEX', con: '❤️ CON',
  int: '🧠 INT', wis: '👁️ SAG', cha: '💬 CHA',
}

export default function ClassReference() {
  const classNames = Object.keys(CLASSES)
  const [selected, setSelected] = useState(classNames[0])
  const cls = CLASSES[selected]

  return (
    <div>
      <div className="page-header">
        <h1>📚 Référence des Classes</h1>
        <p>{classNames.length} classes — 3 catégories, sous-classes et arbres de talents</p>
      </div>

      {/* Category cards */}
      <div className="stats-grid" style={{ marginBottom: 24, gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {Object.entries(CLASS_CATEGORIES).map(([key, cat]) => (
          <div className="stat-card" key={key} style={{ borderLeft: `3px solid ${cat.color}` }}>
            <div style={{ fontSize: '1.3rem' }}>{cat.icon}</div>
            <div className="stat-value" style={{ color: cat.color, fontSize: '1.1rem' }}>{cat.label}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>{cat.desc}</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
              {cat.classes.map(c => (
                <button key={c} className={`tag ${selected === c ? 'tag-gold' : ''}`}
                  style={{ cursor: 'pointer', fontSize: '0.72rem' }}
                  onClick={() => setSelected(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {cls && <ClassDetail cls={cls} />}
    </div>
  )
}

function ClassDetail({ cls }: { cls: Class }) {
  const [abilityTab, setAbilityTab] = useState<'initial' | 'unlockables'>('initial')
  const catInfo = CLASS_CATEGORIES[cls.category]

  return (
    <div className="card" style={{ borderColor: catInfo?.color || 'var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h2 style={{ color: catInfo?.color || 'var(--gold)', margin: 0 }}>
            {catInfo?.icon} {cls.label}
          </h2>
          <div className="card-subtitle">{catInfo?.label} · d{cls.hitDie} PV · Ressource: {cls.resourceStat.toUpperCase()}</div>
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>{cls.desc}</p>

      {/* Mechanic */}
      <div style={{
        padding: '12px 16px', marginBottom: 16, borderLeft: `3px solid ${catInfo?.color || 'var(--gold)'}`,
        background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)'
      }}>
        <h4 style={{ color: catInfo?.color || 'var(--gold)', marginBottom: 4 }}>⚙️ {cls.mechanic.name}</h4>
        <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
          {cls.mechanic.desc}
        </p>
      </div>

      {/* Stats + recommended */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <h4 style={{ color: 'var(--gold-dim)', marginBottom: 8 }}>📊 Statistiques de base</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {(Object.entries(cls.stats) as [string, number][]).map(([key, val]) => (
              <div key={key} style={{
                padding: '6px 10px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-sm)',
                textAlign: 'center', borderLeft: `2px solid ${val >= 16 ? 'var(--gold)' : val >= 14 ? '#22c55e' : 'var(--border)'}`
              }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{STAT_LABELS[key] || key}</div>
                <div style={{ fontWeight: 700, color: val >= 16 ? 'var(--gold)' : 'var(--text-primary)' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: 'var(--gold-dim)', marginBottom: 8 }}>🎯 Stats recommandées</h4>
          <div style={{ fontSize: '0.85rem' }}>
            <div style={{ marginBottom: 4 }}>
              <strong style={{ color: 'var(--gold)' }}>Principales:</strong>{' '}
              {cls.recommended_stats.major.map(s => STAT_LABELS[s] || s).join(', ')}
            </div>
            <div>
              <strong style={{ color: 'var(--text-muted)' }}>Secondaires:</strong>{' '}
              {cls.recommended_stats.minor.map(s => STAT_LABELS[s] || s).join(', ')}
            </div>
          </div>

          <h4 style={{ color: 'var(--gold-dim)', marginTop: 12, marginBottom: 6 }}>🛡️ Maîtrises</h4>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div>Armures: {cls.protection.armor.join(', ')}</div>
            <div>Armes: {cls.protection.weapons.join(', ')}</div>
            <div>Bouclier: {cls.protection.shields ? '✅' : '❌'}</div>
          </div>
        </div>
      </div>

      {/* Starting equipment */}
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ color: 'var(--gold-dim)', marginBottom: 8 }}>🎒 Équipement de départ</h4>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cls.starting_equipment_options.length}, 1fr)`, gap: 10 }}>
          {cls.starting_equipment_options.map((opt, i) => (
            <div key={i} style={{
              padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)',
              borderLeft: `2px solid ${catInfo?.color || 'var(--border)'}`
            }}>
              <div style={{ fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                {opt.label}
              </div>
              {opt.items.map((item, j) => (
                <div key={j} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', padding: '2px 0' }}>
                  • {item.name} <span style={{ color: 'var(--text-muted)' }}>({item.slot})</span>
                  {item.stats.atk && <span style={{ color: 'var(--gold-dim)', marginLeft: 4 }}>ATK+{item.stats.atk}</span>}
                  {item.stats.ac && <span style={{ color: '#3b82f6', marginLeft: 4 }}>CA+{item.stats.ac}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Subclasses */}
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ color: 'var(--gold-dim)', marginBottom: 8 }}>🌟 Sous-classes</h4>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Object.keys(cls.subclasses).length}, 1fr)`, gap: 10 }}>
          {Object.entries(cls.subclasses).map(([key, sub]) => (
            <div key={key} style={{
              padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)',
              borderTop: `2px solid ${catInfo?.color || 'var(--border)'}`
            }}>
              <div style={{ fontWeight: 600, color: catInfo?.color || 'var(--gold)', marginBottom: 4 }}>
                {sub.label}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 4 }}>{sub.desc}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Style: {sub.details.style}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--gold-dim)', marginTop: 4, fontStyle: 'italic' }}>
                ✦ {sub.details.feature}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Abilities */}
      <div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <button className={`btn ${abilityTab === 'initial' ? 'btn-gold' : ''}`}
            onClick={() => setAbilityTab('initial')}>
            ⚡ Capacités initiales ({cls.initial_ability_options.length})
          </button>
          <button className={`btn ${abilityTab === 'unlockables' ? 'btn-gold' : ''}`}
            onClick={() => setAbilityTab('unlockables')}>
            🔓 Déblocables ({cls.unlockables.length})
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {(abilityTab === 'initial' ? cls.initial_ability_options : cls.unlockables).map((ab, i) => (
            <AbilityCard key={i} ability={ab} color={catInfo?.color || 'var(--gold)'} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AbilityCard({ ability, color }: { ability: Ability; color: string }) {
  return (
    <div style={{
      padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)',
      borderLeft: `2px solid ${ability.name.includes('LÉGENDAIRE') || ability.name.includes('ASCENSION') ? 'var(--gold)' : color}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <strong style={{
          color: ability.name.includes('LÉGENDAIRE') ? 'var(--gold)' :
            ability.name.includes('ASCENSION') ? '#a855f7' : 'var(--text-primary)',
          fontSize: '0.85rem'
        }}>
          {ability.name}
        </strong>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Lv {ability.level}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4, flexWrap: 'wrap' }}>
        {ability.cost > 0 && <span>💧 {ability.cost}</span>}
        {ability.cooldown > 0 && <span>⏱ {ability.cooldown}t</span>}
        {ability.dice && <span>🎲 {ability.dice}</span>}
        {ability.range && <span>📏 {ability.range}</span>}
        {ability.type && <span className="tag" style={{ fontSize: '0.65rem' }}>{ability.type}</span>}
        {ability.actionType && <span className="tag" style={{ fontSize: '0.65rem' }}>{ability.actionType}</span>}
      </div>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
        {ability.desc || ability.description}
      </p>
      {ability.flavor && (
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: '4px 0 0' }}>
          "{ability.flavor}"
        </p>
      )}
    </div>
  )
}
