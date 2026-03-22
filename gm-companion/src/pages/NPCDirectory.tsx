import { useState, useMemo } from 'react'
import { ALL_NPCS } from '@lore/npcs'
import type { NPCDefinition, NPCRole } from '@lore/npcs'
import { EXPANDED_NPCS_BATCH_1 } from '@lore/npcs-expansion-1'

/* ── Normalize expanded NPCs (different shape) to a unified display model ── */
interface NPCDisplay {
  id: string
  name: string
  title: string
  role: string
  personality: string
  location: string
  region: string
  description: string
  appearance?: string
  backstory?: string
  faction?: string
  race?: string
  class?: string
  age?: string | number
  services: string[]
  inventory: { name: string; price?: number; rarity?: string; effect?: string }[]
  quests: string[]
  dialogues: { trigger: string; text: string }[]
  tradingTips?: string
  repRequired?: number
}

function normalizeBase(npc: NPCDefinition): NPCDisplay {
  return {
    id: npc.id,
    name: npc.name,
    title: npc.title || '',
    role: npc.role,
    personality: npc.personality,
    location: npc.location,
    region: npc.region || '',
    description: npc.description,
    appearance: npc.appearance,
    backstory: npc.backstory,
    faction: npc.faction,
    services: npc.services?.map(s => s.description) || [],
    inventory: npc.inventory?.map(i => ({ name: i.itemId, price: undefined, rarity: undefined, effect: undefined })) || [],
    quests: npc.quests || [],
    dialogues: npc.dialogues.map(d => ({ trigger: d.trigger, text: d.text })),
    repRequired: npc.reputationRequired,
  }
}

function normalizeExpanded(npc: any): NPCDisplay {
  const dlg = npc.dialogue || {}
  return {
    id: npc.id,
    name: npc.name,
    title: npc.class || '',
    role: npc.role || 'neutral',
    personality: typeof npc.personality === 'string' ? npc.personality : '',
    location: npc.location || '',
    region: '',
    description: npc.description || '',
    backstory: npc.backstory,
    faction: npc.faction,
    race: npc.race,
    class: npc.class,
    age: npc.age,
    services: Array.isArray(npc.services) ? npc.services : [],
    inventory: Array.isArray(npc.inventory) ? npc.inventory.map((i: any) => ({
      name: i.name, price: i.price, rarity: i.rarity, effect: i.effect
    })) : [],
    quests: npc.questsGiven || [],
    dialogues: Object.entries(dlg).map(([k, v]) => ({ trigger: k, text: v as string })),
    tradingTips: npc.tradingTips,
    repRequired: npc.reputation?.required,
  }
}

const ROLE_LABELS: Record<string, string> = {
  merchant: '🛒 Marchand',
  questgiver: '📜 Donneur de Quêtes',
  trainer: '🎓 Entraîneur',
  innkeeper: '🍺 Aubergiste',
  blacksmith: '🔨 Forgeron',
  alchemist: '⚗️ Alchimiste',
  enchanter: '✨ Enchanteur',
  guard: '🛡️ Garde',
  noble: '👑 Noble',
  ally: '🤝 Allié',
  enemy: '💀 Ennemi',
  neutral: '⚖️ Neutre',
  authority: '🏛️ Autorité',
  quest_giver: '📜 Donneur de Quêtes',
  antagonist: '🗡️ Antagoniste',
}

const RARITY_COLORS: Record<string, string> = {
  common: '#9ca3af',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  'very rare': '#a855f7',
  epic: '#a855f7',
  legendary: '#f59e0b',
  artifact: '#ef4444',
}

export default function NPCDirectory() {
  const allNpcs = useMemo<NPCDisplay[]>(() => {
    const base = ALL_NPCS.map(normalizeBase)
    const expanded = EXPANDED_NPCS_BATCH_1.map(normalizeExpanded)
    return [...base, ...expanded]
  }, [])

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [selected, setSelected] = useState<NPCDisplay | null>(null)

  const roles = useMemo(() => {
    const s = new Set(allNpcs.map(n => n.role))
    return Array.from(s).sort()
  }, [allNpcs])

  const filtered = useMemo(() => {
    return allNpcs.filter(n => {
      if (roleFilter !== 'all' && n.role !== roleFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return n.name.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.location.toLowerCase().includes(q) ||
          (n.faction || '').toLowerCase().includes(q)
      }
      return true
    })
  }, [allNpcs, search, roleFilter])

  return (
    <div>
      <div className="page-header">
        <h1>👤 Répertoire des PNJ</h1>
        <p>{allNpcs.length} personnages non-joueurs — marchands, entraîneurs, alliés, ennemis</p>
      </div>

      {/* ── Filters ── */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Rechercher un PNJ..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 200, padding: '8px 12px',
            background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '0.9rem'
          }}
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          style={{
            padding: '8px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '0.9rem'
          }}
        >
          <option value="all">Tous les rôles</option>
          {roles.map(r => <option key={r} value={r}>{ROLE_LABELS[r] || r}</option>)}
        </select>
      </div>

      <div style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: '0.85rem' }}>
        {filtered.length} PNJ trouvé{filtered.length > 1 ? 's' : ''}
      </div>

      {/* ── Split view: list + detail ── */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.2fr' : '1fr', gap: 16 }}>
        {/* NPC List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: selected ? 700 : undefined, overflowY: selected ? 'auto' : undefined }}>
          {filtered.map(npc => (
            <div
              key={npc.id}
              className="card"
              onClick={() => setSelected(npc)}
              style={{
                cursor: 'pointer',
                borderColor: selected?.id === npc.id ? 'var(--gold)' : undefined,
                transition: 'border-color .15s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="card-title" style={{ marginBottom: 2 }}>{npc.name}</div>
                  {npc.title && <div className="card-subtitle">{npc.title}</div>}
                </div>
                <span className="tag tag-gold" style={{ fontSize: '0.75rem' }}>
                  {ROLE_LABELS[npc.role] || npc.role}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: '6px 0 0' }}>
                📍 {npc.location}
              </p>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="card" style={{ borderColor: 'var(--border-gold)', position: 'sticky', top: 16, maxHeight: 700, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h2 style={{ color: 'var(--gold)', margin: 0 }}>{selected.name}</h2>
                {selected.title && <div className="card-subtitle" style={{ fontSize: '0.9rem' }}>{selected.title}</div>}
              </div>
              <button className="btn" onClick={() => setSelected(null)} style={{ fontSize: '0.8rem' }}>✕</button>
            </div>

            {/* Metadata */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16, fontSize: '0.85rem' }}>
              <div><strong style={{ color: 'var(--text-muted)' }}>Rôle :</strong> {ROLE_LABELS[selected.role] || selected.role}</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Personnalité :</strong> {selected.personality}</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Lieu :</strong> {selected.location}</div>
              {selected.faction && <div><strong style={{ color: 'var(--text-muted)' }}>Faction :</strong> {selected.faction}</div>}
              {selected.race && <div><strong style={{ color: 'var(--text-muted)' }}>Race :</strong> {selected.race}</div>}
              {selected.age && <div><strong style={{ color: 'var(--text-muted)' }}>Âge :</strong> {selected.age}</div>}
              {selected.repRequired != null && <div><strong style={{ color: 'var(--text-muted)' }}>Rép. requise :</strong> {selected.repRequired}</div>}
            </div>

            {/* Description */}
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ color: 'var(--gold-dim)', marginBottom: 4 }}>Description</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selected.description}</p>
            </div>

            {selected.appearance && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ color: 'var(--gold-dim)', marginBottom: 4 }}>Apparence</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selected.appearance}</p>
              </div>
            )}

            {selected.backstory && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ color: 'var(--gold-dim)', marginBottom: 4 }}>Backstory</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selected.backstory}</p>
              </div>
            )}

            {/* Dialogues */}
            {selected.dialogues.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ color: 'var(--gold-dim)', marginBottom: 8 }}>💬 Dialogues</h4>
                {selected.dialogues.map((d, i) => (
                  <div key={i} style={{
                    padding: '8px 12px', marginBottom: 6,
                    background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)',
                    borderLeft: '3px solid var(--gold-dim)', fontSize: '0.85rem'
                  }}>
                    <span className="tag" style={{ marginRight: 8, fontSize: '0.7rem' }}>{d.trigger}</span>
                    <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>{d.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Inventory */}
            {selected.inventory.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ color: 'var(--gold-dim)', marginBottom: 8 }}>🎒 Inventaire</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {selected.inventory.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '6px 10px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem'
                    }}>
                      <div>
                        <span style={{ color: item.rarity ? (RARITY_COLORS[item.rarity] || 'var(--text-primary)') : 'var(--text-primary)' }}>
                          {item.name}
                        </span>
                        {item.effect && <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>— {item.effect}</span>}
                      </div>
                      {item.price != null && <span style={{ color: 'var(--gold)' }}>{item.price} 💰</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {selected.services.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ color: 'var(--gold-dim)', marginBottom: 8 }}>🔧 Services</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selected.services.map((s, i) => (
                    <span key={i} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Quests */}
            {selected.quests.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ color: 'var(--gold-dim)', marginBottom: 8 }}>📜 Quêtes</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selected.quests.map((q, i) => (
                    <span key={i} className="tag tag-gold">{q}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Trading tips */}
            {selected.tradingTips && (
              <div style={{
                padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)',
                borderLeft: '3px solid var(--gold)', fontSize: '0.83rem', color: 'var(--gold-dim)'
              }}>
                💡 <strong>Conseil :</strong> {selected.tradingTips}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
