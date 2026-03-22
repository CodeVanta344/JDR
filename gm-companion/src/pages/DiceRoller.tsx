import { useState, useCallback } from 'react'

interface RollResult {
  id: number
  formula: string
  rolls: number[]
  modifier: number
  total: number
  isCritical: boolean
  isFumble: boolean
  timestamp: Date
}

const QUICK_DICE = [
  { label: 'd4', formula: '1d4' },
  { label: 'd6', formula: '1d6' },
  { label: 'd8', formula: '1d8' },
  { label: 'd10', formula: '1d10' },
  { label: 'd12', formula: '1d12' },
  { label: 'd20', formula: '1d20' },
  { label: 'd100', formula: '1d100' },
]

const DIFFICULTY_THRESHOLDS = [
  { label: 'Trivial', dc: 15, color: '#2ecc71' },
  { label: 'Très Facile', dc: 25, color: '#27ae60' },
  { label: 'Facile', dc: 35, color: '#3498db' },
  { label: 'Moyen', dc: 50, color: '#f39c12' },
  { label: 'Difficile', dc: 65, color: '#e67e22' },
  { label: 'Très Difficile', dc: 80, color: '#e74c3c' },
  { label: 'Légendaire', dc: 95, color: '#8e44ad' },
]

function parseDice(formula: string): { count: number; sides: number; modifier: number } | null {
  const match = formula.trim().match(/^(\d+)?d(\d+)([+-]\d+)?$/i)
  if (!match) return null
  return {
    count: parseInt(match[1] || '1'),
    sides: parseInt(match[2]),
    modifier: parseInt(match[3] || '0'),
  }
}

function rollDice(formula: string): RollResult | null {
  const parsed = parseDice(formula)
  if (!parsed) return null

  const rolls: number[] = []
  for (let i = 0; i < parsed.count; i++) {
    rolls.push(Math.floor(Math.random() * parsed.sides) + 1)
  }

  const total = rolls.reduce((a, b) => a + b, 0) + parsed.modifier

  // Critical: 95-100 on d100, nat max on d20+
  const isCritical = parsed.sides === 100
    ? rolls.some(r => r >= 95)
    : parsed.sides >= 20
      ? rolls.some(r => r === parsed.sides)
      : false

  // Fumble: 1-5 on d100, nat 1 on others
  const isFumble = parsed.sides === 100
    ? rolls.some(r => r <= 5)
    : rolls.some(r => r === 1)

  return {
    id: Date.now(),
    formula,
    rolls,
    modifier: parsed.modifier,
    total,
    isCritical: isCritical && !isFumble,
    isFumble: isFumble && !isCritical,
    timestamp: new Date(),
  }
}

export default function DiceRoller() {
  const [customFormula, setCustomFormula] = useState('1d100')
  const [history, setHistory] = useState<RollResult[]>([])
  const [lastResult, setLastResult] = useState<RollResult | null>(null)

  // Skill check state
  const [skillValue, setSkillValue] = useState(0)
  const [attrMod, setAttrMod] = useState(0)
  const [dc, setDc] = useState(50)

  const doRoll = useCallback((formula: string) => {
    const result = rollDice(formula)
    if (result) {
      setLastResult(result)
      setHistory(h => [result, ...h].slice(0, 20))
    }
  }, [])

  const doSkillCheck = useCallback(() => {
    const roll = Math.floor(Math.random() * 100) + 1
    const total = roll + skillValue + attrMod
    const isCrit = roll >= 95
    const isFumb = roll <= 5

    const result: RollResult = {
      id: Date.now(),
      formula: `Compétence (${skillValue}) + Attr (${attrMod}) vs DC ${dc}`,
      rolls: [roll],
      modifier: skillValue + attrMod,
      total,
      isCritical: isCrit,
      isFumble: isFumb && !isCrit,
      timestamp: new Date(),
    }

    setLastResult(result)
    setHistory(h => [result, ...h].slice(0, 20))
  }, [skillValue, attrMod, dc])

  return (
    <div>
      <div className="page-header">
        <h1>🎲 Lanceur de Dés</h1>
        <p>Système d100 — Critique sur 95-100, Fumble sur 1-5</p>
      </div>

      {/* Last result display */}
      {lastResult && (
        <div className="card" style={{ textAlign: 'center', marginBottom: 24, borderColor: lastResult.isCritical ? '#2ecc71' : lastResult.isFumble ? '#e74c3c' : 'var(--border-gold)' }}>
          <div className={`dice-result ${lastResult.isCritical ? 'dice-critical' : lastResult.isFumble ? 'dice-fumble' : ''}`}>
            {lastResult.total}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 4 }}>
            [{lastResult.rolls.join(', ')}]{lastResult.modifier ? ` ${lastResult.modifier > 0 ? '+' : ''}${lastResult.modifier}` : ''}
          </div>
          {lastResult.isCritical && <span className="tag tag-green">✨ CRITIQUE !</span>}
          {lastResult.isFumble && <span className="tag tag-red">💀 FUMBLE !</span>}
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 8 }}>{lastResult.formula}</div>
        </div>
      )}

      {/* Quick dice buttons */}
      <h2>Dés Rapides</h2>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        {QUICK_DICE.map(d => (
          <button key={d.label} className="btn" onClick={() => doRoll(d.formula)}>
            🎲 {d.label}
          </button>
        ))}
      </div>

      {/* Custom formula */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Formule Personnalisée</h3>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            value={customFormula}
            onChange={e => setCustomFormula(e.target.value)}
            placeholder="ex: 3d6+5"
            style={{ flex: 1 }}
            onKeyDown={e => e.key === 'Enter' && doRoll(customFormula)}
          />
          <button className="btn btn-gold" onClick={() => doRoll(customFormula)}>Lancer</button>
        </div>
      </div>

      {/* Skill Check */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Jet de Compétence (d100)</h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'end' }}>
          <div>
            <label className="stat-label">Comp.</label>
            <input type="number" value={skillValue} onChange={e => setSkillValue(+e.target.value)} style={{ width: 70 }} />
          </div>
          <div>
            <label className="stat-label">Mod. Attr.</label>
            <input type="number" value={attrMod} onChange={e => setAttrMod(+e.target.value)} style={{ width: 70 }} />
          </div>
          <div>
            <label className="stat-label">DC</label>
            <input type="number" value={dc} onChange={e => setDc(+e.target.value)} style={{ width: 70 }} />
          </div>
          <button className="btn btn-gold" onClick={doSkillCheck}>Jet de Compétence</button>
        </div>
        {lastResult && lastResult.formula.startsWith('Compétence') && (
          <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, background: lastResult.total >= dc || lastResult.isCritical ? 'rgba(46,204,113,0.15)' : 'rgba(231,76,60,0.15)' }}>
            <strong>{lastResult.total >= dc || lastResult.isCritical ? '✅ RÉUSSITE' : '❌ ÉCHEC'}</strong>
            {' — '}Jet: {lastResult.rolls[0]} + {skillValue} + {attrMod} = {lastResult.total} (vs DC {dc}, marge: {lastResult.total - dc > 0 ? '+' : ''}{lastResult.total - dc})
          </div>
        )}
      </div>

      {/* Difficulty thresholds */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Seuils de Difficulté</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {DIFFICULTY_THRESHOLDS.map(d => (
            <button
              key={d.label}
              className="btn"
              style={{ borderColor: d.color, color: d.color, fontSize: '0.8rem' }}
              onClick={() => setDc(d.dc)}
            >
              {d.label} ({d.dc})
            </button>
          ))}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3>Historique</h3>
            <button className="btn" style={{ fontSize: '0.75rem', padding: '4px 12px' }} onClick={() => setHistory([])}>Effacer</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Heure</th>
                  <th>Formule</th>
                  <th>Dés</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {history.map(r => (
                  <tr key={r.id}>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {r.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{r.formula}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>[{r.rolls.join(', ')}]</td>
                    <td style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem', color: r.isCritical ? '#2ecc71' : r.isFumble ? '#e74c3c' : 'var(--gold)' }}>
                      {r.total}
                    </td>
                    <td>
                      {r.isCritical && <span className="tag tag-green">CRIT</span>}
                      {r.isFumble && <span className="tag tag-red">FUMBLE</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
