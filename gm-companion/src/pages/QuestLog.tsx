import { useState, useMemo } from 'react'
import { ALL_QUESTS } from '@lore/quests'
import type { QuestDefinition, QuestType, QuestCategory, QuestAct, QuestChoice } from '@lore/quests'

const TYPE_COLORS: Record<QuestType, string> = {
  main: '#ef4444',
  side: '#3b82f6',
  faction: '#a855f7',
  repeatable: '#22c55e',
  event: '#eab308',
}

const TYPE_LABELS: Record<QuestType, string> = {
  main: '⭐ Principale',
  side: '📋 Secondaire',
  faction: '🏴 Faction',
  repeatable: '🔄 Répétable',
  event: '🎭 Événement',
}

const CAT_ICONS: Record<string, string> = {
  combat: '⚔️', investigation: '🔍', exploration: '🗺️', crafting: '🔨',
  collection: '📦', escort: '🛡️', diplomacy: '🤝', stealth: '🥷',
  intrigue: '🕵️', defense: '🏰', decision: '⚖️', preparation: '📐', boss: '💀',
  main: '⭐', side: '📋', faction: '🏴', repeatable: '🔄',
}

export default function QuestLog() {
  const [selected, setSelected] = useState<QuestDefinition | null>(null)
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const types = useMemo(() => Array.from(new Set(ALL_QUESTS.map(q => q.type))).sort(), [])

  const filtered = useMemo(() => {
    return ALL_QUESTS.filter(q => {
      if (typeFilter !== 'all' && q.type !== typeFilter) return false
      if (search) {
        const s = search.toLowerCase()
        return (q.name || q.title).toLowerCase().includes(s) ||
          q.description.toLowerCase().includes(s) ||
          q.tags?.some(t => t.toLowerCase().includes(s))
      }
      return true
    })
  }, [typeFilter, search])

  return (
    <div>
      <div className="page-header">
        <h1>📜 Journal de Quêtes</h1>
        <p>{ALL_QUESTS.length} quêtes — principales, secondaires, de faction et répétables</p>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {types.map(t => (
          <div className="stat-card" key={t}>
            <div className="stat-value" style={{ color: TYPE_COLORS[t] || 'var(--gold)' }}>
              {ALL_QUESTS.filter(q => q.type === t).length}
            </div>
            <div className="stat-label">{TYPE_LABELS[t] || t}</div>
          </div>
        ))}
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--gold)' }}>
            {ALL_QUESTS.reduce((s, q) => s + q.acts.length, 0)}
          </div>
          <div className="stat-label">Actes totaux</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input type="text" placeholder="🔍 Rechercher une quête..." value={search}
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
          {types.map(t => <option key={t} value={t}>{TYPE_LABELS[t] || t}</option>)}
        </select>
      </div>

      {/* List + detail */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.5fr' : '1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: selected ? 700 : undefined, overflowY: selected ? 'auto' : undefined }}>
          {filtered.map(q => (
            <div key={q.id} className="card" onClick={() => setSelected(q)}
              style={{ cursor: 'pointer', borderColor: selected?.id === q.id ? 'var(--gold)' : undefined }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="card-title">{q.name || q.title}</div>
                  <div className="card-subtitle">{CAT_ICONS[q.category] || ''} {q.category} · Lv {q.level || q.suggestedLevel}</div>
                </div>
                <span style={{
                  fontSize: '0.7rem', padding: '2px 8px', borderRadius: 99,
                  background: (TYPE_COLORS[q.type] || '#666') + '22',
                  color: TYPE_COLORS[q.type] || '#999',
                  border: `1px solid ${TYPE_COLORS[q.type] || '#666'}44`
                }}>{TYPE_LABELS[q.type] || q.type}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: '6px 0 0' }}>
                {(q.summary || q.description).slice(0, 120)}{(q.summary || q.description).length > 120 ? '…' : ''}
              </p>
            </div>
          ))}
        </div>

        {selected && <QuestDetail quest={selected} onClose={() => setSelected(null)} />}
      </div>
    </div>
  )
}

function QuestDetail({ quest, onClose }: { quest: QuestDefinition; onClose: () => void }) {
  const [openAct, setOpenAct] = useState<number | null>(0)
  const rewards = quest.finalRewards || quest.rewards

  return (
    <div className="card" style={{ borderColor: 'var(--border-gold)', position: 'sticky', top: 16, maxHeight: 700, overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <h2 style={{ color: 'var(--gold)', margin: 0 }}>{quest.name || quest.title}</h2>
          <div className="card-subtitle">{CAT_ICONS[quest.category] || ''} {quest.category} · Niveau {quest.level || quest.suggestedLevel}</div>
        </div>
        <button className="btn" onClick={onClose} style={{ fontSize: '0.8rem' }}>✕</button>
      </div>

      {/* Meta */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16, fontSize: '0.85rem' }}>
        <div><strong style={{ color: 'var(--text-muted)' }}>Donneur :</strong> {quest.questGiver}</div>
        <div><strong style={{ color: 'var(--text-muted)' }}>Lieu :</strong> {quest.location}</div>
        {quest.region && <div><strong style={{ color: 'var(--text-muted)' }}>Région :</strong> {quest.region}</div>}
        {quest.timeLimit ? <div><strong style={{ color: 'var(--text-muted)' }}>Limite :</strong> {quest.timeLimit} jours</div> : null}
        <div><strong style={{ color: 'var(--text-muted)' }}>Répétable :</strong> {quest.isRepeatable ? 'Oui' : 'Non'}</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{quest.description}</p>
      </div>

      {/* Tags */}
      {quest.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 16 }}>
          {quest.tags.map(t => <span key={t} className="tag" style={{ fontSize: '0.7rem' }}>{t}</span>)}
        </div>
      )}

      {/* Rewards */}
      {rewards && (
        <div style={{ marginBottom: 16, padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--gold)' }}>
          <h4 style={{ color: 'var(--gold-dim)', marginBottom: 6 }}>🏆 Récompenses</h4>
          <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', flexWrap: 'wrap' }}>
            <span>⭐ {rewards.experience} XP</span>
            <span>💰 {rewards.gold} or</span>
            {rewards.items?.map(i => <span key={i} className="tag tag-gold" style={{ fontSize: '0.7rem' }}>{i}</span>)}
          </div>
          {rewards.reputation && rewards.reputation.length > 0 && (
            <div style={{ marginTop: 6, fontSize: '0.82rem' }}>
              {rewards.reputation.map((r, i) => (
                <span key={i} style={{ marginRight: 12, color: r.amount > 0 ? '#22c55e' : '#ef4444' }}>
                  {r.faction}: {r.amount > 0 ? '+' : ''}{r.amount}
                </span>
              ))}
            </div>
          )}
          {rewards.titles && rewards.titles.length > 0 && (
            <div style={{ marginTop: 4, fontSize: '0.82rem', color: 'var(--gold)' }}>
              👑 Titres : {rewards.titles.join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Acts */}
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ color: 'var(--gold-dim)', marginBottom: 8 }}>📖 Actes ({quest.acts.length})</h4>
        {quest.acts.map((act, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div
              onClick={() => setOpenAct(openAct === i ? null : i)}
              style={{
                padding: '8px 12px', cursor: 'pointer',
                background: openAct === i ? 'var(--bg-hover)' : 'transparent',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}
            >
              <span style={{ fontWeight: 600 }}>
                Acte {act.actNumber}: {act.title}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {act.objectives.length} obj. {openAct === i ? '▾' : '▸'}
              </span>
            </div>

            {openAct === i && (
              <div style={{ padding: '10px 14px', borderLeft: '2px solid var(--gold-dim)', marginLeft: 12, marginTop: 4 }}>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{act.description}</p>

                {/* Objectives */}
                {act.objectives.map((obj, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6, fontSize: '0.82rem'
                  }}>
                    <span style={{ color: obj.optional ? 'var(--text-muted)' : 'var(--gold-dim)' }}>
                      {obj.optional ? '◇' : '◆'}
                    </span>
                    <div>
                      <span>{obj.description}</span>
                      {obj.location && <span style={{ color: 'var(--text-muted)', marginLeft: 6 }}>📍 {obj.location}</span>}
                      {obj.quantity && obj.quantity > 1 && <span style={{ color: 'var(--text-muted)', marginLeft: 6 }}>×{obj.quantity}</span>}
                    </div>
                  </div>
                ))}

                {/* Choices */}
                {act.choices && act.choices.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    {act.choices.map((choice, ci) => (
                      <div key={ci} style={{ marginBottom: 8 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--gold)', marginBottom: 4 }}>
                          ⚖️ {choice.prompt}
                        </div>
                        {choice.options.map((opt, oi) => (
                          <div key={oi} style={{
                            padding: '6px 10px', marginBottom: 4, fontSize: '0.8rem',
                            background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)',
                            borderLeft: '2px solid var(--text-muted)'
                          }}>
                            <div style={{ color: 'var(--text-primary)' }}>→ {opt.text}</div>
                            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{opt.consequence}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Act rewards */}
                {act.rewards && (
                  <div style={{ marginTop: 6, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    🎁 Acte : {act.rewards.experience} XP, {act.rewards.gold} or
                    {act.rewards.items?.map(i => <span key={i} className="tag" style={{ fontSize: '0.65rem', marginLeft: 4 }}>{i}</span>)}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lore impact */}
      {quest.loreImpact && (
        <div style={{
          padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)',
          borderLeft: '3px solid var(--gold)', fontSize: '0.83rem', color: 'var(--gold-dim)'
        }}>
          🌍 <strong>Impact lore :</strong> {quest.loreImpact}
        </div>
      )}
    </div>
  )
}
