import { useState, useMemo } from 'react'
import { ALL_FACTIONS } from '@lore/factions'
import type { Faction, FactionRank } from '@lore/schema'

const ALIGNMENT_COLORS: Record<string, string> = {
  good: '#22c55e',
  neutral: '#eab308',
  evil: '#ef4444',
}

const TYPE_ICONS: Record<string, string> = {
  religious: '⛪',
  guild: '🏛️',
  military: '⚔️',
  criminal: '🗡️',
  academic: '📚',
  order: '🛡️',
  cult: '🔮',
  trade: '💰',
  nature: '🌿',
}

export default function FactionHub() {
  const [selected, setSelected] = useState<Faction | null>(null)
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [alignFilter, setAlignFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const types = useMemo(() => Array.from(new Set(ALL_FACTIONS.map(f => f.type))).sort(), [])
  const alignments = useMemo(() => Array.from(new Set(ALL_FACTIONS.map(f => f.alignment))).sort(), [])

  const filtered = useMemo(() => {
    return ALL_FACTIONS.filter(f => {
      if (typeFilter !== 'all' && f.type !== typeFilter) return false
      if (alignFilter !== 'all' && f.alignment !== alignFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return f.name.toLowerCase().includes(q) ||
          f.summary.toLowerCase().includes(q) ||
          f.tags.some(t => t.toLowerCase().includes(q))
      }
      return true
    })
  }, [typeFilter, alignFilter, search])

  return (
    <div>
      <div className="page-header">
        <h1>🏴 Hub des Factions</h1>
        <p>{ALL_FACTIONS.length} factions — cultes, guildes, ordres et organisations secrètes</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          type="text" placeholder="🔍 Rechercher..." value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 200, padding: '8px 12px',
            background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '0.9rem'
          }}
        />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{
          padding: '8px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', color: 'var(--text-primary)'
        }}>
          <option value="all">Tous types</option>
          {types.map(t => <option key={t} value={t}>{TYPE_ICONS[t] || ''} {t}</option>)}
        </select>
        <select value={alignFilter} onChange={e => setAlignFilter(e.target.value)} style={{
          padding: '8px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', color: 'var(--text-primary)'
        }}>
          <option value="all">Tous alignements</option>
          {alignments.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {/* Stats row */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {alignments.map(a => (
          <div className="stat-card" key={a}>
            <div className="stat-value" style={{ color: ALIGNMENT_COLORS[a] || 'var(--text-primary)' }}>
              {ALL_FACTIONS.filter(f => f.alignment === a).length}
            </div>
            <div className="stat-label">{a.charAt(0).toUpperCase() + a.slice(1)}</div>
          </div>
        ))}
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--gold)' }}>
            {ALL_FACTIONS.reduce((s, f) => s + f.ranks.length, 0)}
          </div>
          <div className="stat-label">Rangs totaux</div>
        </div>
      </div>

      {/* Grid + detail */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.2fr' : '1fr 1fr 1fr', gap: 16 }}>
        {/* Faction list */}
        {selected ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 700, overflowY: 'auto' }}>
            {filtered.map(f => (
              <FactionCard key={f.id} faction={f} active={selected.id === f.id} onClick={() => setSelected(f)} />
            ))}
          </div>
        ) : (
          filtered.map(f => (
            <FactionCard key={f.id} faction={f} active={false} onClick={() => setSelected(f)} />
          ))
        )}

        {/* Detail panel */}
        {selected && <FactionDetail faction={selected} onClose={() => setSelected(null)} allFactions={ALL_FACTIONS} />}
      </div>
    </div>
  )
}

function FactionCard({ faction, active, onClick }: { faction: Faction; active: boolean; onClick: () => void }) {
  return (
    <div className="card" onClick={onClick} style={{
      cursor: 'pointer',
      borderColor: active ? 'var(--gold)' : undefined,
      transition: 'border-color .15s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="card-title">{TYPE_ICONS[faction.type] || '🏴'} {faction.name}</div>
        <span style={{
          fontSize: '0.7rem', padding: '2px 8px', borderRadius: 99,
          background: ALIGNMENT_COLORS[faction.alignment] + '22',
          color: ALIGNMENT_COLORS[faction.alignment],
          border: `1px solid ${ALIGNMENT_COLORS[faction.alignment]}44`
        }}>
          {faction.alignment}
        </span>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: '6px 0' }}>{faction.summary}</p>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {faction.tags.slice(0, 4).map(t => <span key={t} className="tag" style={{ fontSize: '0.7rem' }}>{t}</span>)}
      </div>
    </div>
  )
}

function FactionDetail({ faction, onClose, allFactions }: { faction: Faction; onClose: () => void; allFactions: Faction[] }) {
  const rivals = allFactions.filter(f => faction.rivals?.includes(f.id))
  const allies = allFactions.filter(f => faction.allies?.includes(f.id))

  return (
    <div className="card" style={{ borderColor: 'var(--border-gold)', position: 'sticky', top: 16, maxHeight: 700, overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <h2 style={{ color: 'var(--gold)', margin: 0 }}>{TYPE_ICONS[faction.type] || '🏴'} {faction.name}</h2>
          <div className="card-subtitle">{faction.type} · {faction.alignment}</div>
        </div>
        <button className="btn" onClick={onClose} style={{ fontSize: '0.8rem' }}>✕</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{faction.description}</p>
      </div>

      {/* HQ and leader */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16, fontSize: '0.85rem' }}>
        <div><strong style={{ color: 'var(--text-muted)' }}>QG :</strong> {faction.headquarters}</div>
        <div><strong style={{ color: 'var(--text-muted)' }}>Chef :</strong> {faction.leader}</div>
        <div><strong style={{ color: 'var(--text-muted)' }}>Région :</strong> {faction.regionId}</div>
        {faction.joinRequirements && (
          <div>
            <strong style={{ color: 'var(--text-muted)' }}>Niveau requis :</strong> {faction.joinRequirements.level}
          </div>
        )}
      </div>

      {/* Ranks */}
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ color: 'var(--gold-dim)', marginBottom: 8 }}>🎖️ Rangs</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faction.ranks.map((rank, i) => (
            <div key={rank.id} style={{
              padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)',
              borderLeft: `3px solid ${i === faction.ranks.length - 1 ? 'var(--gold)' : 'var(--border)'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <strong style={{ color: 'var(--text-primary)' }}>{rank.name}</strong>
                <span style={{ color: 'var(--gold-dim)', fontSize: '0.8rem' }}>{rank.threshold} rep</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {rank.perks.map((p, j) => <div key={j}>✦ {p}</div>)}
              </div>
              {rank.unlocks && rank.unlocks.length > 0 && (
                <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                  {rank.unlocks.map(u => <span key={u} className="tag tag-gold" style={{ fontSize: '0.7rem' }}>{u}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hooks */}
      {faction.hooks && faction.hooks.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ color: 'var(--gold-dim)', marginBottom: 8 }}>🪝 Accroches de quête</h4>
          {faction.hooks.map((h, i) => (
            <div key={i} style={{
              padding: '6px 12px', marginBottom: 4, fontSize: '0.85rem',
              background: 'var(--bg-hover)', borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)', fontStyle: 'italic'
            }}>
              "{h}"
            </div>
          ))}
        </div>
      )}

      {/* Relations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {allies.length > 0 && (
          <div>
            <h4 style={{ color: '#22c55e', marginBottom: 6 }}>🤝 Alliés</h4>
            {allies.map(a => (
              <div key={a.id} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', padding: '2px 0' }}>
                {TYPE_ICONS[a.type]} {a.name}
              </div>
            ))}
          </div>
        )}
        {rivals.length > 0 && (
          <div>
            <h4 style={{ color: '#ef4444', marginBottom: 6 }}>⚔️ Rivaux</h4>
            {rivals.map(r => (
              <div key={r.id} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', padding: '2px 0' }}>
                {TYPE_ICONS[r.type]} {r.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
