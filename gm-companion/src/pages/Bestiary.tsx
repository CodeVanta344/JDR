import { useState, useMemo } from 'react'
import { BESTIARY, type CreatureDefinition, type CreatureType } from '@lore/bestiary'
import { getModifier } from '@lore/rules'

const ALL_CREATURES: CreatureDefinition[] = Object.values(BESTIARY)

const TYPE_LABELS: Record<string, string> = {
  beast: '🐺 Bête', humanoid: '🧑 Humanoïde', undead: '💀 Mort-vivant',
  dragon: '🐉 Dragon', elemental: '🌪️ Élémentaire', fiend: '😈 Démon',
  celestial: '👼 Céleste', construct: '🤖 Artificiel', aberration: '🦑 Aberration', fey: '🧚 Fée'
}

const SIZE_LABELS: Record<string, string> = {
  tiny: 'Minuscule', small: 'Petit', medium: 'Moyen', large: 'Grand', huge: 'Énorme', gargantuan: 'Colossal'
}

function StatBlock({ creature }: { creature: CreatureDefinition }) {
  const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const
  const labels = { str: 'FOR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'SAG', cha: 'CHA' }

  return (
    <div className="creature-card" style={{ marginBottom: 16 }}>
      <div className="creature-header">
        <div>
          <h3 style={{ margin: 0, color: 'var(--gold)' }}>{creature.name}</h3>
          <span className="card-subtitle">
            {SIZE_LABELS[creature.size]} {TYPE_LABELS[creature.type] || creature.type} — {creature.alignment}
          </span>
        </div>
        <span className="tag tag-red" style={{ fontSize: '0.9rem' }}>CR {creature.challengeRating}</span>
      </div>

      <div className="creature-body">
        {/* Core stats */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
          <div><strong style={{ color: 'var(--gold-dim)' }}>CA :</strong> {creature.armorClass}</div>
          <div><strong style={{ color: 'var(--red)' }}>PV :</strong> {creature.hitPoints.average} ({creature.hitPoints.diceFormula})</div>
          <div><strong style={{ color: 'var(--blue)' }}>Vitesse :</strong> {creature.speed.walk}
            {creature.speed.fly ? `, vol ${creature.speed.fly}` : ''}
            {creature.speed.swim ? `, nage ${creature.speed.swim}` : ''}
          </div>
          <div><strong style={{ color: 'var(--green)' }}>XP :</strong> {creature.experiencePoints}</div>
        </div>

        {/* Attributes */}
        <div className="stat-row" style={{ marginBottom: 12 }}>
          {stats.map(s => (
            <div key={s} className="stat-block">
              <div className="stat-label">{labels[s]}</div>
              <div className="stat-value">{creature.stats[s]}</div>
              <div className="stat-mod">({getModifier(creature.stats[s]) >= 0 ? '+' : ''}{getModifier(creature.stats[s])})</div>
            </div>
          ))}
        </div>

        {/* Resistances / Immunities */}
        {creature.resistances && creature.resistances.length > 0 && (
          <p style={{ fontSize: '0.85rem', marginBottom: 4 }}>
            <strong style={{ color: 'var(--blue)' }}>Résistances :</strong> {creature.resistances.join(', ')}
          </p>
        )}
        {creature.immunities && creature.immunities.length > 0 && (
          <p style={{ fontSize: '0.85rem', marginBottom: 4 }}>
            <strong style={{ color: 'var(--purple)' }}>Immunités :</strong> {creature.immunities.join(', ')}
          </p>
        )}

        <hr className="divider" />

        {/* Attacks */}
        <h4 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>Attaques</h4>
        {creature.attacks.map((atk, i) => (
          <div key={i} className="ability-card" style={{ marginBottom: 6 }}>
            <div className="ability-name">{atk.name}</div>
            <div className="ability-meta">
              <span>{atk.type === 'melee' ? '⚔️ Mêlée' : atk.type === 'ranged' ? '🏹 Distance' : '✨ Sort'}</span>
              <span>+{atk.toHit} au toucher</span>
              <span>{atk.damage} {atk.damageType}</span>
              {atk.range && <span>Portée {atk.range}</span>}
            </div>
            {atk.description && <div className="ability-desc">{atk.description}</div>}
          </div>
        ))}

        {/* Abilities */}
        {creature.abilities.length > 0 && (
          <>
            <h4 style={{ color: 'var(--text-primary)', marginTop: 12, marginBottom: 8 }}>Capacités</h4>
            {creature.abilities.map((ab, i) => (
              <div key={i} className="ability-card" style={{ marginBottom: 6 }}>
                <div className="ability-name">{ab.name}</div>
                {ab.recharge && <div className="ability-meta"><span>Recharge : {ab.recharge}</span></div>}
                <div className="ability-desc">{ab.description}</div>
              </div>
            ))}
          </>
        )}

        <hr className="divider" />

        {/* Lore */}
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 4 }}>{creature.description}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{creature.behavior}</p>

        {/* Loot & Gold */}
        <div style={{ marginTop: 8, display: 'flex', gap: 16, fontSize: '0.8rem' }}>
          <span>💰 {creature.goldDrop.min}–{creature.goldDrop.max} PO</span>
          <span>🎁 {creature.loot.length} types de loot</span>
          <span>🌍 {creature.habitat.join(', ')}</span>
        </div>
      </div>
    </div>
  )
}

export default function Bestiary() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [crMin, setCrMin] = useState(0)
  const [crMax, setCrMax] = useState(30)
  const [expanded, setExpanded] = useState<string | null>(null)

  const creatures = useMemo(() => {
    return ALL_CREATURES.filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
      if (typeFilter !== 'all' && c.type !== typeFilter) return false
      if (c.challengeRating < crMin || c.challengeRating > crMax) return false
      return true
    }).sort((a, b) => a.challengeRating - b.challengeRating)
  }, [search, typeFilter, crMin, crMax])

  const types = [...new Set(ALL_CREATURES.map(c => c.type))]

  return (
    <div>
      <div className="page-header">
        <h1>🐉 Bestiaire d'Aethelgard</h1>
        <p>{ALL_CREATURES.length} créatures — filtrez par type, CR, ou nom</p>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <input
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ minWidth: 180 }}
        />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="all">Tous les types</option>
          {types.map(t => (
            <option key={t} value={t}>{TYPE_LABELS[t] || t}</option>
          ))}
        </select>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="stat-label">CR</span>
          <input type="number" value={crMin} onChange={e => setCrMin(+e.target.value)} style={{ width: 60 }} min={0} max={30} />
          <span>—</span>
          <input type="number" value={crMax} onChange={e => setCrMax(+e.target.value)} style={{ width: 60 }} min={0} max={30} />
        </div>
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: '0.85rem' }}>{creatures.length} résultat(s)</p>

      {/* Creature list */}
      {creatures.map(c => (
        <div key={c.id}>
          {/* Compact row */}
          <div
            className="card"
            style={{ marginBottom: 8, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px' }}
            onClick={() => setExpanded(expanded === c.id ? null : c.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="tag tag-red">CR {c.challengeRating}</span>
              <strong style={{ color: 'var(--gold)' }}>{c.name}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{TYPE_LABELS[c.type] || c.type}</span>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span>CA {c.armorClass}</span>
              <span>PV {c.hitPoints.average}</span>
              <span>XP {c.experiencePoints}</span>
              <span style={{ color: 'var(--text-muted)' }}>{expanded === c.id ? '▲' : '▼'}</span>
            </div>
          </div>

          {/* Expanded detail */}
          {expanded === c.id && <StatBlock creature={c} />}
        </div>
      ))}
    </div>
  )
}
