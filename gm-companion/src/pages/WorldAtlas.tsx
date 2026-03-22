import { useState, useMemo } from 'react'
import { WORLD_NAME, WORLD_HISTORY, WORLD_CONTEXT, LORE_INTRO } from '@lore/world'
import { TAVERNS_AND_LOCATIONS } from '@lore/locations'
import {
  EXPANSION_TOWNS,
  EXPANSION_VILLAGES,
  EXPANSION_DUNGEONS,
  EXPANSION_LANDMARKS,
  ALL_EXPANSION_LOCATIONS
} from '@lore/world-map-expansion'

const REGIONS = [
  {
    name: 'Côte des Orages', icon: '🏔️', capital: 'Kuldahar', climate: 'Toundra glaciale, fjords brumeux',
    inhabitants: 'Humains barbares, Nains des glaces, Géants des tempêtes',
    politics: 'Les Jarls règnent par le fer.',
    legend: 'Le Marcheur Blanc n\'est pas un conte pour enfants. Il viendra pour ceux qui gaspillent le feu.',
    places: ['Le Gouffre d\'Ymir', 'La Forge de Givre']
  },
  {
    name: 'Val Doré', icon: '🌾', capital: 'Sol-Aureus', climate: 'Tempéré, terres agricoles, soleil perpétuel',
    inhabitants: 'Humains, Halflings, Gnomes',
    politics: 'Monarchie constitutionnelle sous la Reine Elara.',
    legend: 'Le jour où le verre de Sol-Aureus se brisera, les larmes de la Reine noieront le monde.',
    places: ['Le Grand Jardin Arcanique', 'La Tour de Lunara']
  },
  {
    name: 'Monts Cœur-de-Fer', icon: '⛏️', capital: 'Hammerdeep (15 niveaux)', climate: 'Montagnes escarpées',
    inhabitants: 'Nains, Kobolds, Golems de pierre',
    politics: 'Oligarchie des Guildes Minières.',
    legend: 'Écoutez les vibrations de la pierre. Si elle s\'arrête de chanter, courez vers la surface.',
    places: ['L\'Ascenseur de Cristal', 'Le Caveau des Ancêtres']
  },
  {
    name: 'Sylve d\'Émeraude', icon: '🌿', capital: 'Sylmanir', climate: 'Forêt dense, bioluminescence',
    inhabitants: 'Elfes, Centaures, Satyres, Dryades',
    politics: 'Théocratie druidique — Conseil des Chênes.',
    legend: 'Ne ramassez jamais une plume d\'argent en forêt sans demander la permission aux arbres.',
    places: ['Le Mur de Ronces', 'La Source d\'Émeraude']
  },
  {
    name: 'Terres Brûlées', icon: '🔥', capital: 'Aucune (ruines d\'Ashka)', climate: 'Désert aride, volcans, souffre',
    inhabitants: 'Tieffelins, Dracéides, Pilleurs de tombes, Goules',
    politics: 'Loi de la jungle. Seigneurs de guerre.',
    legend: 'Dans le désert, l\'ombre que vous voyez n\'est pas toujours la vôtre.',
    places: ['Le Pilier de Cendres', 'La Faille de l\'Ombre']
  },
]

const DANGER_COLORS: Record<string, string> = {
  safe: '#4ade80',
  moderate: '#f59e0b',
  dangerous: '#ef4444',
  deadly: '#dc2626',
}

const DANGER_FR: Record<string, string> = {
  safe: 'Sûr',
  moderate: 'Modéré',
  dangerous: 'Dangereux',
  deadly: 'Mortel',
}

const TYPE_ICONS: Record<string, string> = {
  town: '🏘️',
  village: '🏡',
  dungeon: '💀',
  landmark: '🏛️',
  city: '🏰',
  ruins: '🏚️',
  cave: '⛰️',
  forest: '🌲',
}

export default function WorldAtlas() {
  const [activeTab, setActiveTab] = useState<'regions' | 'history' | 'locations' | 'expansion'>('regions')
  const [expFilter, setExpFilter] = useState<'all' | 'town' | 'village' | 'dungeon' | 'landmark'>('all')

  const filteredExpansion = useMemo(() => {
    if (expFilter === 'all') return ALL_EXPANSION_LOCATIONS
    if (expFilter === 'town') return EXPANSION_TOWNS
    if (expFilter === 'village') return EXPANSION_VILLAGES
    if (expFilter === 'dungeon') return EXPANSION_DUNGEONS
    return EXPANSION_LANDMARKS
  }, [expFilter])

  return (
    <div>
      <div className="page-header">
        <h1>🗺️ Atlas d'{WORLD_NAME}</h1>
        <p style={{ fontStyle: 'italic', maxWidth: 700 }}>{LORE_INTRO.trim().split('\n')[1]}</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {([
          ['regions', '🌍 Régions'],
          ['history', '📖 Histoire'],
          ['locations', '🏠 Lieux'],
          ['expansion', '🗺️ Expansion (40+)'],
        ] as const).map(([tab, label]) => (
          <button key={tab} className={`btn ${activeTab === tab ? 'btn-gold' : ''}`} onClick={() => setActiveTab(tab)}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'regions' && (
        <div>
          {REGIONS.map(r => (
            <div key={r.name} className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: '2rem' }}>{r.icon}</span>
                <div>
                  <h3 style={{ color: 'var(--gold)', margin: 0 }}>{r.name}</h3>
                  <div className="card-subtitle">Capitale : {r.capital}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: '0.9rem', marginBottom: 12 }}>
                <div><strong style={{ color: 'var(--text-muted)' }}>Climat :</strong> {r.climate}</div>
                <div><strong style={{ color: 'var(--text-muted)' }}>Habitants :</strong> {r.inhabitants}</div>
                <div><strong style={{ color: 'var(--text-muted)' }}>Politique :</strong> {r.politics}</div>
                <div><strong style={{ color: 'var(--text-muted)' }}>Lieux :</strong> {r.places.join(', ')}</div>
              </div>

              <div style={{ padding: '8px 12px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--gold-dim)', borderLeft: '3px solid var(--gold-dim)' }}>
                « {r.legend} »
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div>
          {/* Mythology */}
          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ color: 'var(--gold)', marginBottom: 8 }}>🌌 Mythologie — La Création</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{WORLD_HISTORY.mythology.creation}</p>
          </div>
          <div className="card" style={{ marginBottom: 24 }}>
            <h3 style={{ color: 'var(--gold)', marginBottom: 8 }}>🤫 Le Silence Divin</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{WORLD_HISTORY.mythology.the_divine_silence}</p>
          </div>

          {/* Epochs */}
          <h2>Époques</h2>
          {WORLD_HISTORY.epochs.map((epoch, i) => (
            <div key={i} className="card" style={{ marginBottom: 12, borderLeft: '3px solid var(--gold)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ color: 'var(--gold)', margin: 0 }}>{epoch.name}</h3>
                <span className="tag tag-gold">{epoch.duration}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{epoch.desc}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'locations' && (
        <div>
          {/* Taverns */}
          <h2>🍺 Tavernes & Auberges</h2>
          <div className="card-grid" style={{ marginBottom: 32 }}>
            {TAVERNS_AND_LOCATIONS.taverns.map(t => (
              <div key={t.name} className="card">
                <div className="card-title">{t.name}</div>
                <div className="card-subtitle">{t.region}</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '8px 0' }}>{t.desc}</p>
                <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span>💰 {t.price}</span>
                  <span>🍻 {t.specialty}</span>
                  <span>🎭 {t.atmosphere}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Shops */}
          <h2>🛒 Boutiques</h2>
          <div className="card-grid" style={{ marginBottom: 32 }}>
            {TAVERNS_AND_LOCATIONS.shops.map(s => (
              <div key={s.name} className="card">
                <div className="card-title">{s.name}</div>
                <div className="card-subtitle">{s.region} — {s.type}</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '8px 0' }}>{s.desc}</p>
                {s.npc && <span className="tag tag-gold">PNJ : {s.npc}</span>}
              </div>
            ))}
          </div>

          {/* Landmarks */}
          <h2>🏛️ Lieux Remarquables</h2>
          <div className="card-grid">
            {TAVERNS_AND_LOCATIONS.landmarks.map(l => (
              <div key={l.name} className="card">
                <div className="card-title">{l.name}</div>
                <div className="card-subtitle">{l.region}</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '8px 0' }}>{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'expansion' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              {filteredExpansion.length} lieux — villes, villages, donjons et curiosités supplémentaires
            </p>
            <div style={{ display: 'flex', gap: 6 }}>
              {([
                ['all', 'Tous'],
                ['town', '🏘️ Villes'],
                ['village', '🏡 Villages'],
                ['dungeon', '💀 Donjons'],
                ['landmark', '🏛️ Curiosités'],
              ] as const).map(([key, label]) => (
                <button key={key} className={`btn ${expFilter === key ? 'btn-gold' : ''}`} onClick={() => setExpFilter(key)} style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Villes', count: EXPANSION_TOWNS.length, icon: '🏘️' },
              { label: 'Villages', count: EXPANSION_VILLAGES.length, icon: '🏡' },
              { label: 'Donjons', count: EXPANSION_DUNGEONS.length, icon: '💀' },
              { label: 'Curiosités', count: EXPANSION_LANDMARKS.length, icon: '🏛️' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign: 'center', padding: '12px' }}>
                <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--gold)' }}>{s.count}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Location cards */}
          <div className="card-grid">
            {filteredExpansion.map(loc => (
              <div key={loc.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div className="card-title" style={{ marginBottom: 0 }}>
                    {TYPE_ICONS[loc.type] || '📍'} {loc.name}
                  </div>
                  {loc.dangerLevel && (
                    <span className="tag" style={{ background: DANGER_COLORS[loc.dangerLevel] + '22', color: DANGER_COLORS[loc.dangerLevel], border: `1px solid ${DANGER_COLORS[loc.dangerLevel]}44` }}>
                      {DANGER_FR[loc.dangerLevel] || loc.dangerLevel}
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 8px' }}>{loc.description}</p>

                {loc.lore && (
                  <div style={{ padding: '6px 10px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-sm)', fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--gold-dim)', borderLeft: '2px solid var(--gold-dim)', marginBottom: 8 }}>
                    {loc.lore.length > 120 ? loc.lore.slice(0, 120) + '…' : loc.lore}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: '0.75rem' }}>
                  {loc.suggestedLevel != null && (
                    <span className="tag">Nv. {loc.suggestedLevel}</span>
                  )}
                  {loc.population != null && (
                    <span className="tag">👥 {loc.population.toLocaleString()}</span>
                  )}
                  {loc.biome && (
                    <span className="tag">{loc.biome}</span>
                  )}
                  {loc.services && (
                    <span className="tag" style={{ color: '#4ade80' }}>
                      {[loc.services.inn && '🏨', loc.services.blacksmith && '⚒️', loc.services.merchant && '🛒', loc.services.temple && '⛪', loc.services.guild && '🏰'].filter(Boolean).join(' ')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
