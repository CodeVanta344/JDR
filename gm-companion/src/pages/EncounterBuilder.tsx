import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BESTIARY, generateRandomEncounter, calculateEncounterXP, type CreatureDefinition } from '@lore/bestiary'
import type { BiomeType } from '@lore/resources'
import { startCombat, makeInstanceId, type CombatCreature } from '../lib/combatState'

const ALL_CREATURES: CreatureDefinition[] = Object.values(BESTIARY)

const BIOME_LABELS: Record<string, string> = {
  forest: '🌲 Forêt', plains: '🌾 Plaines', mountain: '🏔️ Montagne',
  swamp: '🌿 Marais', desert: '🏜️ Désert', coastal: '🌊 Côte',
  underground: '⛏️ Souterrain', arctic: '❄️ Arctique', volcanic: '🌋 Volcanique',
  urban: '🏰 Urbain'
}

export default function EncounterBuilder() {
  const [partyLevel, setPartyLevel] = useState(3)
  const [partySize, setPartySize] = useState(4)
  const [biome, setBiome] = useState<BiomeType>('forest')
  const [encounter, setEncounter] = useState<CreatureDefinition[]>([])
  const navigate = useNavigate()

  const totalXP = calculateEncounterXP(encounter)
  const xpPerPlayer = partySize > 0 ? Math.round(totalXP / partySize) : 0

  const generateRandom = () => {
    const result = generateRandomEncounter(biome, partyLevel, partySize)
    setEncounter(result)
  }

  const addCreature = (c: CreatureDefinition) => {
    setEncounter(e => [...e, c])
  }

  const removeCreature = (index: number) => {
    setEncounter(e => e.filter((_, i) => i !== index))
  }

  // Filter available creatures by biome and reasonable CR range
  const available = ALL_CREATURES.filter(c =>
    c.habitat.includes(biome) &&
    c.challengeRating >= Math.max(0, partyLevel - 3) &&
    c.challengeRating <= partyLevel + 3
  )

  return (
    <div>
      <div className="page-header">
        <h1>⚔️ Constructeur de Rencontres</h1>
        <p>Composez ou générez des rencontres équilibrées par biome et niveau</p>
      </div>

      {/* Party config */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Configuration du Groupe</h3>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'end' }}>
          <div>
            <label className="stat-label">Niveau du groupe</label>
            <input type="number" value={partyLevel} onChange={e => setPartyLevel(+e.target.value)} min={1} max={30} style={{ width: 70 }} />
          </div>
          <div>
            <label className="stat-label">Nb. joueurs</label>
            <input type="number" value={partySize} onChange={e => setPartySize(+e.target.value)} min={1} max={8} style={{ width: 70 }} />
          </div>
          <div>
            <label className="stat-label">Biome</label>
            <select value={biome} onChange={e => setBiome(e.target.value as BiomeType)}>
              {Object.entries(BIOME_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-gold" onClick={generateRandom}>🎲 Rencontre Aléatoire</button>
          <button className="btn" onClick={() => setEncounter([])}>Vider</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Current encounter */}
        <div className="card">
          <h3 style={{ marginBottom: 12 }}>Rencontre Actuelle</h3>

          {encounter.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Aucune créature. Utilisez le bouton aléatoire ou ajoutez depuis la liste.</p>
          ) : (
            <>
              {encounter.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <strong style={{ color: 'var(--gold)' }}>{c.name}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 8 }}>CR {c.challengeRating}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem' }}>CA {c.armorClass} | PV {c.hitPoints.average}</span>
                    <button className="btn" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => removeCreature(i)}>✕</button>
                  </div>
                </div>
              ))}

              <hr className="divider" />
              <div style={{ display: 'flex', gap: 24, fontSize: '0.9rem', alignItems: 'center' }}>
                <span><strong style={{ color: 'var(--gold)' }}>XP Total :</strong> {totalXP}</span>
                <span><strong style={{ color: 'var(--green)' }}>XP/joueur :</strong> {xpPerPlayer}</span>
                <span><strong style={{ color: 'var(--red)' }}>Monstres :</strong> {encounter.length}</span>
                <button
                  className="btn"
                  style={{
                    marginLeft: 'auto', padding: '6px 16px', fontSize: '0.85rem',
                    background: 'rgba(239,68,68,0.15)', color: '#ef4444',
                    border: '1px solid rgba(239,68,68,0.3)', fontWeight: 600
                  }}
                  onClick={() => {
                    const enemies: CombatCreature[] = encounter.map((c, i) => ({
                      instanceId: makeInstanceId(),
                      name: encounter.filter(x => x.id === c.id).length > 1
                        ? `${c.name} ${encounter.slice(0, i + 1).filter(x => x.id === c.id).length}`
                        : c.name,
                      hp: c.hitPoints.average,
                      maxHp: c.hitPoints.average,
                      ac: c.armorClass,
                      initiative: 0,
                      cr: c.challengeRating,
                      creatureId: c.id,
                      xp: c.experiencePoints,
                      conditions: [],
                    }))
                    startCombat({ enemies, source: 'encounter-builder', contextLabel: 'Rencontre personnalisée' })
                    navigate('/combat')
                  }}
                >
                  ⚔️ Lancer le combat
                </button>
              </div>
            </>
          )}
        </div>

        {/* Available creatures */}
        <div className="card">
          <h3 style={{ marginBottom: 12 }}>Créatures Disponibles ({available.length})</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 8 }}>
            Biome : {BIOME_LABELS[biome]} — CR {Math.max(0, partyLevel - 3)} à {partyLevel + 3}
          </p>

          {available.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Aucune créature dans ce biome pour cette plage de CR.</p>
          ) : (
            available.map(c => (
              <div
                key={c.id}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                onClick={() => addCreature(c)}
              >
                <div>
                  <span className="tag tag-red" style={{ fontSize: '0.7rem', marginRight: 8 }}>CR {c.challengeRating}</span>
                  <strong>{c.name}</strong>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>XP {c.experiencePoints} | + Ajouter</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
