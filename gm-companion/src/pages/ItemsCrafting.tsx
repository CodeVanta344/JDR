import { useState, useMemo } from 'react'
import { LEGENDARY_ITEMS } from '@lore/items'
import type { LegendaryItem } from '@lore/items'
import { ALL_RECIPES } from '@lore/recipes'
import type { RecipeDefinition } from '@lore/recipes'

const RARITY_COLORS: Record<string, string> = {
  'Légendaire': '#ff8c00',
  'Artefact': '#a855f7',
  'Très rare': '#3b82f6',
}

const PROF_ICONS: Record<string, string> = {
  smithing: '⚒️', alchemy: '⚗️', enchanting: '✨', cooking: '🍖',
  tailoring: '🧵', leatherworking: '🐾', jewelcrafting: '💎', inscription: '📜',
}

const STATION_ICONS: Record<string, string> = {
  forge: '🔥', anvil: '⚒️', 'alchemy-table': '⚗️', 'enchanting-table': '✨',
  'cooking-fire': '🍳', 'sewing-table': '🧵', 'tanning-rack': '🐾',
  'jewelers-bench': '💎', 'scribes-desk': '📜', none: '🎒',
}

type Tab = 'legendary' | 'recipes'

export default function ItemsCrafting() {
  const [tab, setTab] = useState<Tab>('legendary')
  const [selectedItem, setSelectedItem] = useState<LegendaryItem | null>(null)
  const [profFilter, setProfFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const professions = useMemo(() =>
    Array.from(new Set(ALL_RECIPES.map(r => r.profession))).sort(), [])

  const filteredRecipes = useMemo(() => {
    return ALL_RECIPES.filter(r => {
      if (profFilter !== 'all' && r.profession !== profFilter) return false
      if (search) {
        const s = search.toLowerCase()
        return r.name.toLowerCase().includes(s) || r.category.toLowerCase().includes(s)
      }
      return true
    }).sort((a, b) => a.levelRequired - b.levelRequired)
  }, [profFilter, search])

  const filteredItems = useMemo(() => {
    if (!search) return LEGENDARY_ITEMS
    const s = search.toLowerCase()
    return LEGENDARY_ITEMS.filter(i =>
      i.name.toLowerCase().includes(s) || i.type.toLowerCase().includes(s) || i.lore.toLowerCase().includes(s)
    )
  }, [search])

  return (
    <div>
      <div className="page-header">
        <h1>⚔️ Items & Crafting</h1>
        <p>{LEGENDARY_ITEMS.length} objets légendaires · {ALL_RECIPES.length} recettes de craft</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button className={`btn ${tab === 'legendary' ? 'btn-gold' : ''}`}
          onClick={() => setTab('legendary')}>🗡️ Objets Légendaires ({LEGENDARY_ITEMS.length})</button>
        <button className={`btn ${tab === 'recipes' ? 'btn-gold' : ''}`}
          onClick={() => setTab('recipes')}>📖 Recettes ({ALL_RECIPES.length})</button>
      </div>

      {/* Search + profession filter (recipes only) */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input type="text" placeholder="🔍 Rechercher..." value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 200, padding: '8px 12px',
            background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '0.9rem'
          }}
        />
        {tab === 'recipes' && (
          <select value={profFilter} onChange={e => setProfFilter(e.target.value)} style={{
            padding: '8px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', color: 'var(--text-primary)'
          }}>
            <option value="all">Tous métiers</option>
            {professions.map(p => (
              <option key={p} value={p}>{PROF_ICONS[p] || ''} {p}</option>
            ))}
          </select>
        )}
      </div>

      {tab === 'legendary' ? (
        <div style={{ display: 'grid', gridTemplateColumns: selectedItem ? '1fr 1.2fr' : '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: selectedItem ? 700 : undefined, overflowY: selectedItem ? 'auto' : undefined }}>
            {filteredItems.map((item, i) => (
              <div key={i} className="card" onClick={() => setSelectedItem(item)}
                style={{ cursor: 'pointer', borderColor: selectedItem?.name === item.name ? 'var(--gold)' : undefined }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="card-title">{item.name}</div>
                  <span style={{
                    fontSize: '0.7rem', padding: '2px 8px', borderRadius: 99,
                    background: (RARITY_COLORS[item.rarity] || '#666') + '22',
                    color: RARITY_COLORS[item.rarity] || '#999',
                    border: `1px solid ${RARITY_COLORS[item.rarity] || '#666'}44`
                  }}>{item.rarity}</span>
                </div>
                <div className="card-subtitle">{item.type}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: '4px 0' }}>
                  {item.lore.slice(0, 100)}…
                </p>
                <div style={{ display: 'flex', gap: 8, fontSize: '0.8rem', color: 'var(--gold-dim)' }}>
                  {item.stats.atk && <span>⚔️ {item.stats.atk}</span>}
                  {item.stats.ac && <span>🛡️ {item.stats.ac}</span>}
                  {item.stats.str && <span>💪 +{item.stats.str}</span>}
                  {item.stats.dex && <span>🎯 +{item.stats.dex}</span>}
                  {item.stats.int && <span>🧠 +{item.stats.int}</span>}
                  {item.stats.wis && <span>👁️ +{item.stats.wis}</span>}
                  {item.stats.cha && <span>💬 +{item.stats.cha}</span>}
                  {item.stats.con && <span>❤️ +{item.stats.con}</span>}
                </div>
              </div>
            ))}
          </div>

          {selectedItem && (
            <div className="card" style={{ borderColor: 'var(--border-gold)', position: 'sticky', top: 16, maxHeight: 700, overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <h2 style={{ color: RARITY_COLORS[selectedItem.rarity] || 'var(--gold)', margin: 0 }}>{selectedItem.name}</h2>
                  <div className="card-subtitle">{selectedItem.type} · {selectedItem.rarity}</div>
                </div>
                <button className="btn" onClick={() => setSelectedItem(null)} style={{ fontSize: '0.8rem' }}>✕</button>
              </div>

              {/* Stats grid */}
              <div style={{
                display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16, padding: '10px 14px',
                background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)'
              }}>
                {selectedItem.stats.atk && <StatBadge icon="⚔️" label="ATK" value={`+${selectedItem.stats.atk}`} />}
                {selectedItem.stats.ac && <StatBadge icon="🛡️" label="CA" value={`+${selectedItem.stats.ac}`} />}
                {selectedItem.stats.str && <StatBadge icon="💪" label="FOR" value={`+${selectedItem.stats.str}`} />}
                {selectedItem.stats.dex && <StatBadge icon="🎯" label="DEX" value={`+${selectedItem.stats.dex}`} />}
                {selectedItem.stats.con && <StatBadge icon="❤️" label="CON" value={`+${selectedItem.stats.con}`} />}
                {selectedItem.stats.int && <StatBadge icon="🧠" label="INT" value={`+${selectedItem.stats.int}`} />}
                {selectedItem.stats.wis && <StatBadge icon="👁️" label="SAG" value={`+${selectedItem.stats.wis}`} />}
                {selectedItem.stats.cha && <StatBadge icon="💬" label="CHA" value={`+${selectedItem.stats.cha}`} />}
              </div>

              {selectedItem.stats.bonus && (
                <div style={{
                  padding: '10px 14px', marginBottom: 16, borderLeft: '3px solid var(--gold)',
                  background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem', color: 'var(--gold)'
                }}>
                  ✦ {selectedItem.stats.bonus}
                </div>
              )}

              <div style={{ marginBottom: 16 }}>
                <h4 style={{ color: 'var(--gold-dim)', marginBottom: 6 }}>📖 Lore</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selectedItem.lore}</p>
              </div>

              <div style={{
                padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)',
                borderLeft: '3px solid #3b82f6'
              }}>
                <h4 style={{ color: '#3b82f6', marginBottom: 4 }}>🗺️ Accroche de quête</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  {selectedItem.quest_hook}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Recipes tab */
        <div>
          {/* Stats by profession */}
          <div className="stats-grid" style={{ marginBottom: 20 }}>
            {professions.map(p => (
              <div className="stat-card" key={p}>
                <div className="stat-value">{PROF_ICONS[p] || '📦'}</div>
                <div className="stat-value" style={{ fontSize: '1.2rem' }}>
                  {ALL_RECIPES.filter(r => r.profession === p).length}
                </div>
                <div className="stat-label">{p}</div>
              </div>
            ))}
          </div>

          {/* Recipe list */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatBadge({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 50 }}>
      <div style={{ fontSize: '1.1rem' }}>{icon}</div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{label}</div>
      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gold)' }}>{value}</div>
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: RecipeDefinition }) {
  const formatTime = (sec: number) => {
    if (sec < 60) return `${sec}s`
    if (sec < 3600) return `${Math.floor(sec / 60)}m`
    return `${Math.floor(sec / 3600)}h ${Math.floor((sec % 3600) / 60)}m`
  }

  return (
    <div className="card" style={{ padding: '10px 14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div>
          <span className="card-title" style={{ fontSize: '0.85rem' }}>
            {PROF_ICONS[recipe.profession] || '📦'} {recipe.name}
          </span>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {recipe.category} · {STATION_ICONS[recipe.station] || ''} {recipe.station}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.75rem' }}>
          <div style={{ color: 'var(--gold)' }}>Lv {recipe.levelRequired}</div>
          <div style={{ color: 'var(--text-muted)' }}>⏱ {formatTime(recipe.craftTime)}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', fontSize: '0.72rem' }}>
        {recipe.ingredients.map((ing, i) => (
          <span key={i} className="tag" style={{ fontSize: '0.68rem' }}>
            {ing.resourceId.split(':').pop()} ×{ing.quantity}
          </span>
        ))}
        <span style={{ color: 'var(--text-muted)' }}>→</span>
        <span className="tag tag-gold" style={{ fontSize: '0.68rem' }}>
          {recipe.output.itemId.split(':').pop()} ×{recipe.output.quantity}
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        <span>⭐ {recipe.experience} XP</span>
        {recipe.notes && <span style={{ color: 'var(--gold-dim)', fontStyle: 'italic' }}>✦ {recipe.notes}</span>}
      </div>
    </div>
  )
}
