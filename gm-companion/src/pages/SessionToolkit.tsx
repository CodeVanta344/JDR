import { useState, useCallback } from 'react'

// ============================================================================
// DICE ROLLER
// ============================================================================

type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100'
const DICE_TYPES: DiceType[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100']

interface DiceRoll {
  dice: DiceType
  result: number
  max: number
  timestamp: number
  count: number
  total: number
  modifier: number
  results: number[]
}

function rollDice(dice: DiceType, count: number, modifier: number): DiceRoll {
  const max = parseInt(dice.slice(1))
  const results = Array.from({ length: count }, () => Math.floor(Math.random() * max) + 1)
  const total = results.reduce((a, b) => a + b, 0) + modifier
  return { dice, result: total, max, timestamp: Date.now(), count, total, modifier, results }
}

// ============================================================================
// INITIATIVE TRACKER
// ============================================================================

interface InitiativeEntry {
  id: string
  name: string
  initiative: number
  hp: number
  maxHp: number
  notes: string
  isEnemy: boolean
}

// ============================================================================
// ENCOUNTER TABLES
// ============================================================================

const ENCOUNTER_TABLES = {
  'Forêt': [
    { roll: '01-20', encounter: '2d4 Loups', difficulty: 'Facile' },
    { roll: '21-40', encounter: '1d6 Bandits', difficulty: 'Moyen' },
    { roll: '41-55', encounter: '1 Owlbear', difficulty: 'Moyen' },
    { roll: '56-70', encounter: 'Marchands ambulants (2d4 personnes)', difficulty: 'RP' },
    { roll: '71-80', encounter: '1d4 Araignées géantes', difficulty: 'Difficile' },
    { roll: '81-90', encounter: 'Un cercle de druides en rituel', difficulty: 'RP' },
    { roll: '91-95', encounter: '1 Tréant éveillé', difficulty: 'Difficile' },
    { roll: '96-100', encounter: '1 Dragon Vert Jeune', difficulty: 'Mortel' },
  ],
  'Donjon': [
    { roll: '01-15', encounter: '2d6 Squelettes', difficulty: 'Facile' },
    { roll: '16-30', encounter: '1d4 Goules', difficulty: 'Moyen' },
    { roll: '31-45', encounter: 'Piège à fléchettes (DD 14)', difficulty: 'Piège' },
    { roll: '46-60', encounter: '1d6 Kobolds avec piège', difficulty: 'Moyen' },
    { roll: '61-75', encounter: '1 Mimique', difficulty: 'Moyen' },
    { roll: '76-85', encounter: '1 Spectre', difficulty: 'Difficile' },
    { roll: '86-95', encounter: 'Coffre piégé avec trésor', difficulty: 'Piège' },
    { roll: '96-100', encounter: '1 Liche en sommeil', difficulty: 'Mortel' },
  ],
  'Ville': [
    { roll: '01-20', encounter: 'Pickpocket tente sa chance', difficulty: 'RP' },
    { roll: '21-40', encounter: 'Bagarre de taverne', difficulty: 'Facile' },
    { roll: '41-55', encounter: 'Marchand propose objet rare', difficulty: 'RP' },
    { roll: '56-70', encounter: 'Garde de la ville questionne le groupe', difficulty: 'RP' },
    { roll: '71-80', encounter: 'Embuscade de la guilde des voleurs', difficulty: 'Moyen' },
    { roll: '81-90', encounter: 'Rumeur sur un trésor caché', difficulty: 'RP' },
    { roll: '91-95', encounter: 'Assassin envoyé par un rival', difficulty: 'Difficile' },
    { roll: '96-100', encounter: 'Le roi/seigneur veut une audience', difficulty: 'RP' },
  ],
}

const DIFF_COLORS: Record<string, string> = {
  'Facile': '#22c55e',
  'Moyen': '#eab308',
  'Difficile': '#f97316',
  'Mortel': '#ef4444',
  'RP': '#3b82f6',
  'Piège': '#a855f7',
}

// ============================================================================
// WEATHER GENERATOR
// ============================================================================

const WEATHER_TABLE = [
  { roll: '1-2', weather: '☀️ Ciel dégagé', temp: 'Agréable', effect: 'Aucun' },
  { roll: '3-4', weather: '⛅ Partiellement nuageux', temp: 'Doux', effect: 'Aucun' },
  { roll: '5', weather: '🌧️ Pluie légère', temp: 'Frais', effect: '-1 Perception visuelle' },
  { roll: '6', weather: '🌧️ Pluie forte', temp: 'Froid', effect: '-2 Perception, terrain difficile' },
  { roll: '7', weather: '⛈️ Tempête', temp: 'Variable', effect: '-5 Perception, 1d6 dégâts/min en extérieur' },
  { roll: '8', weather: '🌫️ Brouillard épais', temp: 'Humide', effect: 'Visibilité réduite à 10m' },
  { roll: '9', weather: '❄️ Neige', temp: 'Glacial', effect: 'Terrain difficile, -2 DEX' },
  { roll: '10', weather: '🔥 Canicule', temp: 'Brûlant', effect: 'CON DD 12/heure ou 1 épuisement' },
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function SessionToolkit() {
  // Dice roller state
  const [rolls, setRolls] = useState<DiceRoll[]>([])
  const [diceCount, setDiceCount] = useState(1)
  const [modifier, setModifier] = useState(0)

  const handleRoll = useCallback((dice: DiceType) => {
    const roll = rollDice(dice, diceCount, modifier)
    setRolls(prev => [roll, ...prev].slice(0, 20))
  }, [diceCount, modifier])

  // Initiative tracker state
  const [entries, setEntries] = useState<InitiativeEntry[]>([])
  const [newName, setNewName] = useState('')
  const [currentTurn, setCurrentTurn] = useState(0)

  const addEntry = () => {
    if (!newName.trim()) return
    const init = Math.floor(Math.random() * 20) + 1
    setEntries(prev => [...prev, {
      id: Date.now().toString(),
      name: newName,
      initiative: init,
      hp: 20,
      maxHp: 20,
      notes: '',
      isEnemy: false,
    }].sort((a, b) => b.initiative - a.initiative))
    setNewName('')
  }

  const nextTurn = () => setCurrentTurn(prev => (prev + 1) % Math.max(entries.length, 1))

  const updateHp = (id: string, delta: number) => {
    setEntries(prev => prev.map(e =>
      e.id === id ? { ...e, hp: Math.max(0, Math.min(e.maxHp, e.hp + delta)) } : e
    ))
  }

  const removeEntry = (id: string) => setEntries(prev => prev.filter(e => e.id !== id))

  // Encounter table state
  const [encounterEnv, setEncounterEnv] = useState<keyof typeof ENCOUNTER_TABLES>('Forêt')
  const [rolledEncounter, setRolledEncounter] = useState<typeof ENCOUNTER_TABLES['Forêt'][0] | null>(null)

  const rollEncounter = () => {
    const table = ENCOUNTER_TABLES[encounterEnv]
    const idx = Math.floor(Math.random() * table.length)
    setRolledEncounter(table[idx])
  }

  // Weather
  const [currentWeather, setCurrentWeather] = useState(WEATHER_TABLE[0])
  const rollWeather = () => {
    const idx = Math.floor(Math.random() * WEATHER_TABLE.length)
    setCurrentWeather(WEATHER_TABLE[idx])
  }

  return (
    <div>
      <div className="page-header">
        <h1>🎲 Boîte à outils de session</h1>
        <p>Lanceur de dés · Traqueur d'initiative · Rencontres · Météo</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* DICE ROLLER */}
        <div className="card">
          <h3 style={{ color: 'var(--gold)', marginBottom: 12 }}>🎲 Lanceur de Dés</h3>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Nombre:</label>
            <input type="number" min={1} max={20} value={diceCount}
              onChange={e => setDiceCount(Math.max(1, parseInt(e.target.value) || 1))}
              style={{
                width: 50, padding: '4px 8px', background: 'var(--bg-surface)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)', textAlign: 'center'
              }}
            />
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: 8 }}>Mod:</label>
            <input type="number" value={modifier}
              onChange={e => setModifier(parseInt(e.target.value) || 0)}
              style={{
                width: 50, padding: '4px 8px', background: 'var(--bg-surface)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)', textAlign: 'center'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {DICE_TYPES.map(d => (
              <button key={d} className="btn" onClick={() => handleRoll(d)}
                style={{ minWidth: 50, fontWeight: 700 }}>
                {d}
              </button>
            ))}
          </div>

          {/* Results */}
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {rolls.map((r, i) => (
              <div key={r.timestamp + i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '6px 10px', marginBottom: 4, borderRadius: 'var(--radius-sm)',
                background: i === 0 ? 'var(--bg-hover)' : 'transparent',
                borderLeft: `2px solid ${
                  r.results.some(v => v === r.max) ? 'var(--gold)' :
                    r.results.some(v => v === 1) ? '#ef4444' : 'var(--border)'
                }`
              }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {r.count}{r.dice}{r.modifier ? (r.modifier > 0 ? `+${r.modifier}` : r.modifier) : ''}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  [{r.results.join(', ')}]{r.modifier ? ` + ${r.modifier}` : ''}
                </span>
                <span style={{
                  fontWeight: 700, fontSize: '1rem',
                  color: r.results.some(v => v === r.max) ? 'var(--gold)' :
                    r.results.some(v => v === 1) ? '#ef4444' : 'var(--text-primary)'
                }}>
                  = {r.total}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* INITIATIVE TRACKER */}
        <div className="card">
          <h3 style={{ color: 'var(--gold)', marginBottom: 12 }}>⚔️ Traqueur d'Initiative</h3>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input type="text" placeholder="Nom du combattant..." value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addEntry()}
              style={{
                flex: 1, padding: '6px 10px', background: 'var(--bg-surface)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)', fontSize: '0.85rem'
              }}
            />
            <button className="btn btn-gold" onClick={addEntry}>+</button>
            <button className="btn" onClick={nextTurn}>Tour ▶</button>
          </div>

          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {entries.map((e, i) => (
              <div key={e.id} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px',
                marginBottom: 4, borderRadius: 'var(--radius-sm)',
                background: i === currentTurn ? 'var(--bg-hover)' : 'transparent',
                borderLeft: `2px solid ${i === currentTurn ? 'var(--gold)' : 'var(--border)'}`
              }}>
                <span style={{ fontWeight: 700, color: 'var(--gold)', minWidth: 28 }}>{e.initiative}</span>
                <span style={{ flex: 1, color: e.hp <= 0 ? '#ef4444' : 'var(--text-primary)', fontSize: '0.85rem' }}>
                  {e.name}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button className="btn" style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                    onClick={() => updateHp(e.id, -1)}>−</button>
                  <span style={{
                    fontSize: '0.8rem', minWidth: 36, textAlign: 'center',
                    color: e.hp <= e.maxHp * 0.25 ? '#ef4444' : e.hp <= e.maxHp * 0.5 ? '#eab308' : '#22c55e'
                  }}>
                    {e.hp}/{e.maxHp}
                  </span>
                  <button className="btn" style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                    onClick={() => updateHp(e.id, 1)}>+</button>
                  <button className="btn" style={{ padding: '2px 6px', fontSize: '0.7rem', color: '#ef4444' }}
                    onClick={() => removeEntry(e.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ENCOUNTER TABLE */}
        <div className="card">
          <h3 style={{ color: 'var(--gold)', marginBottom: 12 }}>🗺️ Table de Rencontres</h3>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {(Object.keys(ENCOUNTER_TABLES) as (keyof typeof ENCOUNTER_TABLES)[]).map(env => (
              <button key={env} className={`btn ${encounterEnv === env ? 'btn-gold' : ''}`}
                onClick={() => setEncounterEnv(env)}>{env}</button>
            ))}
            <button className="btn btn-gold" onClick={rollEncounter} style={{ marginLeft: 'auto' }}>
              🎲 Lancer
            </button>
          </div>

          {rolledEncounter && (
            <div style={{
              padding: '12px 16px', marginBottom: 12, borderRadius: 'var(--radius-md)',
              background: 'var(--bg-hover)', borderLeft: `3px solid ${DIFF_COLORS[rolledEncounter.difficulty] || 'var(--border)'}`
            }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                {rolledEncounter.encounter}
              </div>
              <span style={{
                fontSize: '0.72rem', padding: '2px 8px', borderRadius: 99,
                background: (DIFF_COLORS[rolledEncounter.difficulty] || '#666') + '22',
                color: DIFF_COLORS[rolledEncounter.difficulty] || '#999',
              }}>
                {rolledEncounter.difficulty}
              </span>
            </div>
          )}

          <div style={{ fontSize: '0.78rem' }}>
            {ENCOUNTER_TABLES[encounterEnv].map((row, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', padding: '4px 8px',
                background: i % 2 === 0 ? 'var(--bg-hover)' : 'transparent',
                borderRadius: 'var(--radius-sm)'
              }}>
                <span style={{ color: 'var(--text-muted)', minWidth: 50 }}>{row.roll}</span>
                <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{row.encounter}</span>
                <span style={{ color: DIFF_COLORS[row.difficulty] || 'var(--text-muted)', fontSize: '0.72rem' }}>
                  {row.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WEATHER */}
        <div className="card">
          <h3 style={{ color: 'var(--gold)', marginBottom: 12 }}>🌤️ Météo</h3>

          <button className="btn btn-gold" onClick={rollWeather} style={{ marginBottom: 12 }}>
            🎲 Générer la météo
          </button>

          <div style={{
            padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-hover)',
            borderLeft: '3px solid var(--gold)', marginBottom: 16, textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 6 }}>{currentWeather.weather.split(' ')[0]}</div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>
              {currentWeather.weather}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
              Température: {currentWeather.temp}
            </div>
            <div style={{ color: 'var(--gold-dim)', fontSize: '0.85rem', marginTop: 4 }}>
              Effet: {currentWeather.effect}
            </div>
          </div>

          <div style={{ fontSize: '0.78rem' }}>
            {WEATHER_TABLE.map((w, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', padding: '4px 8px',
                background: i % 2 === 0 ? 'var(--bg-hover)' : 'transparent',
                borderRadius: 'var(--radius-sm)'
              }}>
                <span style={{ color: 'var(--text-muted)', minWidth: 30 }}>{w.roll}</span>
                <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{w.weather}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{w.effect}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
