import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCombatState, clearCombatState, type CombatCreature, makeInstanceId } from '../lib/combatState'
import { BESTIARY, type CreatureDefinition } from '@lore/bestiary'
import { getModifier } from '@lore/rules'
import { getParty } from '../lib/partyState'

// ============================================================================
// CONDITIONS D&D
// ============================================================================

const CONDITIONS = [
  { id: 'blinded', label: 'Aveuglé', icon: '🙈' },
  { id: 'charmed', label: 'Charmé', icon: '💖' },
  { id: 'deafened', label: 'Assourdi', icon: '🔇' },
  { id: 'frightened', label: 'Effrayé', icon: '😱' },
  { id: 'grappled', label: 'Agrippé', icon: '🤜' },
  { id: 'incapacitated', label: 'Incapable', icon: '💫' },
  { id: 'invisible', label: 'Invisible', icon: '👻' },
  { id: 'paralyzed', label: 'Paralysé', icon: '⚡' },
  { id: 'petrified', label: 'Pétrifié', icon: '🪨' },
  { id: 'poisoned', label: 'Empoisonné', icon: '🤢' },
  { id: 'prone', label: 'À terre', icon: '🔻' },
  { id: 'restrained', label: 'Entravé', icon: '⛓️' },
  { id: 'stunned', label: 'Étourdi', icon: '💥' },
  { id: 'unconscious', label: 'Inconscient', icon: '😵' },
  { id: 'concentration', label: 'Concentration', icon: '🎯' },
]

// ============================================================================
// HELPERS
// ============================================================================

function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1
}

function findBestiaryCreature(name: string): CreatureDefinition | null {
  const allCreatures = Object.values(BESTIARY) as CreatureDefinition[]
  const normalized = name.toLowerCase().trim()

  // Exact match first
  const exact = allCreatures.find(c => c.name.toLowerCase() === normalized)
  if (exact) return exact

  // Partial match
  const partial = allCreatures.find(c =>
    normalized.includes(c.name.toLowerCase()) ||
    c.name.toLowerCase().includes(normalized)
  )
  return partial || null
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function CombatTracker() {
  const navigate = useNavigate()
  const [combatants, setCombatants] = useState<CombatCreature[]>([])
  const [round, setRound] = useState(1)
  const [activeIndex, setActiveIndex] = useState(0)
  const [contextLabel, setContextLabel] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showConditionPicker, setShowConditionPicker] = useState<string | null>(null)

  // New PC form
  const [pcName, setPcName] = useState('')
  const [pcInit, setPcInit] = useState(10)
  const [pcAc, setPcAc] = useState(14)
  const [pcHp, setPcHp] = useState(30)

  // Load combat state on mount
  useEffect(() => {
    const state = getCombatState()
    if (state) {
      setCombatants(state.enemies)
      setContextLabel(state.contextLabel || '')
    }
  }, [])

  // Sorted combatants by initiative (descending)
  const sorted = [...combatants].sort((a, b) => b.initiative - a.initiative)

  // --- Actions ---

  const updateCombatant = useCallback((instanceId: string, updates: Partial<CombatCreature>) => {
    setCombatants(prev => prev.map(c =>
      c.instanceId === instanceId ? { ...c, ...updates } : c
    ))
  }, [])

  const adjustHp = (instanceId: string, delta: number) => {
    setCombatants(prev => prev.map(c => {
      if (c.instanceId !== instanceId) return c
      const newHp = Math.max(0, Math.min(c.maxHp, c.hp + delta))
      return { ...c, hp: newHp, isDead: newHp === 0 }
    }))
  }

  const setHpDirect = (instanceId: string, value: number) => {
    setCombatants(prev => prev.map(c => {
      if (c.instanceId !== instanceId) return c
      const newHp = Math.max(0, Math.min(c.maxHp, value))
      return { ...c, hp: newHp, isDead: newHp === 0 }
    }))
  }

  const toggleCondition = (instanceId: string, conditionId: string) => {
    setCombatants(prev => prev.map(c => {
      if (c.instanceId !== instanceId) return c
      const conditions = c.conditions || []
      return {
        ...c,
        conditions: conditions.includes(conditionId)
          ? conditions.filter(x => x !== conditionId)
          : [...conditions, conditionId]
      }
    }))
  }

  const rollAllInitiatives = () => {
    setCombatants(prev => prev.map(c => {
      if (c.isPC) return c // Don't re-roll PCs
      const bonus = c.creatureId ? (() => {
        const creature = findBestiaryCreature(c.name)
        return creature ? getModifier(creature.stats.dex) : 0
      })() : 0
      return { ...c, initiative: rollD20() + bonus }
    }))
  }

  const addPC = () => {
    if (!pcName.trim()) return
    const pc: CombatCreature = {
      instanceId: makeInstanceId(),
      name: pcName.trim(),
      hp: pcHp,
      maxHp: pcHp,
      ac: pcAc,
      initiative: pcInit,
      isPC: true,
      conditions: [],
    }
    setCombatants(prev => [...prev, pc])
    setPcName('')
    setPcInit(10)
  }

  const removeCombatant = (instanceId: string) => {
    setCombatants(prev => prev.filter(c => c.instanceId !== instanceId))
  }

  const addPartyToCombat = () => {
    const party = getParty()
    if (party.length === 0) return
    const pcs: CombatCreature[] = party.map(pc => ({
      instanceId: makeInstanceId(),
      name: pc.name,
      hp: pc.hp,
      maxHp: pc.maxHp,
      ac: pc.ac,
      initiative: rollD20() + pc.initiativeBonus,
      isPC: true,
      conditions: [],
    }))
    // Filter out PCs already present (by name)
    setCombatants(prev => {
      const existingNames = new Set(prev.filter(c => c.isPC).map(c => c.name.toLowerCase()))
      const newPcs = pcs.filter(pc => !existingNames.has(pc.name.toLowerCase()))
      return [...prev, ...newPcs]
    })
  }

  const nextTurn = () => {
    const nextIdx = (activeIndex + 1) % sorted.length
    if (nextIdx === 0) setRound(r => r + 1)
    setActiveIndex(nextIdx)
  }

  const prevTurn = () => {
    if (activeIndex === 0 && round > 1) {
      setRound(r => r - 1)
      setActiveIndex(sorted.length - 1)
    } else {
      setActiveIndex(Math.max(0, activeIndex - 1))
    }
  }

  const endCombat = () => {
    clearCombatState()
    navigate(-1)
  }

  // --- Look up bestiary for expanded view ---
  const getBestiaryData = (c: CombatCreature): CreatureDefinition | null => {
    return findBestiaryCreature(c.name)
  }

  // --- Stats ---
  const aliveEnemies = combatants.filter(c => !c.isPC && !c.isDead).length
  const totalEnemies = combatants.filter(c => !c.isPC).length
  const totalXP = combatants.filter(c => !c.isPC).reduce((sum, c) => sum + (c.xp || 0), 0)

  // ============================================================================
  // RENDER
  // ============================================================================

  if (combatants.length === 0) {
    return (
      <div>
        <div className="page-header">
          <h1>⚔️ Tracker de Combat</h1>
          <p>Aucun combat en cours. Lancez un combat depuis le Guide Narratif ou le Constructeur de Rencontres.</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: 20 }}>
            Rendez-vous dans le <strong>Guide Narratif</strong> ou le <strong>Constructeur de Rencontres</strong> et cliquez sur <strong>"⚔️ Lancer le combat"</strong> pour démarrer.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-gold" onClick={() => navigate('/narrative')}>📜 Guide Narratif</button>
            <button className="btn" onClick={() => navigate('/encounters')}>⚔️ Rencontres</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1>⚔️ Combat en cours</h1>
        {contextLabel && <p>{contextLabel}</p>}
      </div>

      {/* Combat Controls Bar */}
      <div className="card" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Round</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)' }}>{round}</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 16 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ennemis</span>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: aliveEnemies === 0 ? '#22c55e' : '#ef4444' }}>
              {aliveEnemies}/{totalEnemies} vivants
            </div>
          </div>
          {totalXP > 0 && (
            <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 16 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>XP Total</span>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gold)' }}>{totalXP}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={prevTurn}>◀ Tour Préc.</button>
          <button className="btn btn-gold" onClick={nextTurn} style={{ fontSize: '1rem', padding: '8px 20px' }}>
            Tour Suivant ▶
          </button>
          <button className="btn" onClick={rollAllInitiatives}>🎲 Initiatives</button>
          <button className="btn" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }} onClick={endCombat}>
            ✕ Fin du Combat
          </button>
        </div>
      </div>

      {/* Initiative Order */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>

        {/* Main - Combatants List */}
        <div>
          {sorted.map((c, idx) => {
            const isActive = idx === activeIndex
            const bestiaryData = getBestiaryData(c)
            const isExpanded = expandedId === c.instanceId
            const hpPct = c.maxHp > 0 ? (c.hp / c.maxHp) * 100 : 0
            const hpColor = hpPct > 60 ? '#22c55e' : hpPct > 30 ? '#eab308' : '#ef4444'

            return (
              <div key={c.instanceId} style={{
                background: isActive ? 'rgba(234,179,8,0.08)' : c.isDead ? 'rgba(100,100,100,0.05)' : 'var(--bg-card)',
                border: isActive ? '2px solid var(--gold)' : '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                marginBottom: 8,
                opacity: c.isDead ? 0.5 : 1,
                transition: 'all 0.2s'
              }}>
                {/* Combatant Row */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                  cursor: 'pointer'
                }} onClick={() => setExpandedId(isExpanded ? null : c.instanceId)}>
                  {/* Initiative */}
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: c.isPC ? 'rgba(59,130,246,0.2)' : 'rgba(239,68,68,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.95rem',
                    color: c.isPC ? '#3b82f6' : '#ef4444',
                    flexShrink: 0
                  }}>
                    {c.initiative}
                  </div>

                  {/* Name & Tags */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {isActive && <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>▶</span>}
                      <strong style={{ color: c.isDead ? 'var(--text-muted)' : c.isPC ? '#3b82f6' : 'var(--gold)', textDecoration: c.isDead ? 'line-through' : 'none' }}>
                        {c.name}
                      </strong>
                      {c.isPC && <span className="tag" style={{ fontSize: '0.65rem', background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>PJ</span>}
                      {c.cr != null && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CR {c.cr}</span>}
                      {c.isDead && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>💀 Mort</span>}
                    </div>
                    {/* Conditions */}
                    {c.conditions && c.conditions.length > 0 && (
                      <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
                        {c.conditions.map(cond => {
                          const condDef = CONDITIONS.find(x => x.id === cond)
                          return condDef ? (
                            <span key={cond} style={{
                              fontSize: '0.65rem', padding: '1px 6px', borderRadius: 4,
                              background: 'rgba(168,85,247,0.15)', color: '#a855f7'
                            }}>
                              {condDef.icon} {condDef.label}
                            </span>
                          ) : null
                        })}
                      </div>
                    )}
                  </div>

                  {/* AC */}
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>CA</div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--blue)' }}>{c.ac}</div>
                  </div>

                  {/* HP Bar */}
                  <div style={{ width: 160, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>
                      <span>PV</span>
                      <span style={{ color: hpColor, fontWeight: 600 }}>{c.hp}/{c.maxHp}</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${hpPct}%`, background: hpColor, borderRadius: 3, transition: 'width 0.3s' }} />
                    </div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 4, justifyContent: 'center' }}>
                      <button className="btn" style={{ padding: '1px 8px', fontSize: '0.7rem' }} onClick={() => adjustHp(c.instanceId, -10)}>-10</button>
                      <button className="btn" style={{ padding: '1px 8px', fontSize: '0.7rem' }} onClick={() => adjustHp(c.instanceId, -5)}>-5</button>
                      <button className="btn" style={{ padding: '1px 8px', fontSize: '0.7rem' }} onClick={() => adjustHp(c.instanceId, -1)}>-1</button>
                      <button className="btn" style={{ padding: '1px 8px', fontSize: '0.7rem' }} onClick={() => adjustHp(c.instanceId, +1)}>+1</button>
                      <button className="btn" style={{ padding: '1px 8px', fontSize: '0.7rem' }} onClick={() => adjustHp(c.instanceId, +5)}>+5</button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                    <button
                      className="btn"
                      style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                      title="Conditions"
                      onClick={() => setShowConditionPicker(showConditionPicker === c.instanceId ? null : c.instanceId)}
                    >🏷️</button>
                    <button
                      className="btn"
                      style={{ padding: '4px 8px', fontSize: '0.7rem', color: c.isDead ? '#22c55e' : '#ef4444' }}
                      title={c.isDead ? 'Ranimer' : 'Tuer'}
                      onClick={() => {
                        if (c.isDead) {
                          updateCombatant(c.instanceId, { isDead: false, hp: 1 })
                        } else {
                          updateCombatant(c.instanceId, { isDead: true, hp: 0 })
                        }
                      }}
                    >{c.isDead ? '❤️' : '💀'}</button>
                    <button
                      className="btn"
                      style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                      title="Retirer"
                      onClick={() => removeCombatant(c.instanceId)}
                    >✕</button>
                  </div>

                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{isExpanded ? '▲' : '▼'}</span>
                </div>

                {/* Condition Picker */}
                {showConditionPicker === c.instanceId && (
                  <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {CONDITIONS.map(cond => (
                      <button
                        key={cond.id}
                        className="btn"
                        style={{
                          padding: '2px 8px', fontSize: '0.7rem',
                          background: (c.conditions || []).includes(cond.id) ? 'rgba(168,85,247,0.25)' : undefined,
                          color: (c.conditions || []).includes(cond.id) ? '#a855f7' : undefined,
                        }}
                        onClick={() => toggleCondition(c.instanceId, cond.id)}
                      >
                        {cond.icon} {cond.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Expanded Stat Block */}
                {isExpanded && (
                  <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.15)' }}>
                    {/* Initiative edit */}
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12 }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Initiative</label>
                        <input type="number" value={c.initiative} onChange={e => updateCombatant(c.instanceId, { initiative: +e.target.value })} style={{ width: 60, marginLeft: 6 }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PV</label>
                        <input type="number" value={c.hp} onChange={e => setHpDirect(c.instanceId, +e.target.value)} style={{ width: 60, marginLeft: 6 }} />
                      </div>
                    </div>

                    {/* Bestiary Stat Block */}
                    {bestiaryData ? (
                      <div>
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 10, fontSize: '0.85rem' }}>
                          <span><strong style={{ color: 'var(--gold-dim)' }}>CA :</strong> {bestiaryData.armorClass}</span>
                          <span><strong style={{ color: 'var(--red)' }}>PV :</strong> {bestiaryData.hitPoints.average} ({bestiaryData.hitPoints.diceFormula})</span>
                          <span><strong style={{ color: 'var(--blue)' }}>Vitesse :</strong> {bestiaryData.speed.walk}{bestiaryData.speed.fly ? `, vol ${bestiaryData.speed.fly}` : ''}</span>
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                          {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as const).map(s => (
                            <div key={s} style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                                {{ str: 'FOR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'SAG', cha: 'CHA' }[s]}
                              </div>
                              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{bestiaryData.stats[s]}</div>
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                ({getModifier(bestiaryData.stats[s]) >= 0 ? '+' : ''}{getModifier(bestiaryData.stats[s])})
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Attacks */}
                        <h4 style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: 6 }}>⚔️ Attaques</h4>
                        {bestiaryData.attacks.map((atk, i) => (
                          <div key={i} style={{
                            background: 'rgba(239,68,68,0.08)', borderRadius: 6, padding: '6px 10px', marginBottom: 4, fontSize: '0.8rem'
                          }}>
                            <strong style={{ color: 'var(--gold)' }}>{atk.name}</strong>
                            <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>
                              {atk.type === 'melee' ? '⚔️' : atk.type === 'ranged' ? '🏹' : '✨'} +{atk.toHit} | {atk.damage} {atk.damageType}
                            </span>
                            {atk.description && <div style={{ color: 'var(--text-secondary)', marginTop: 2, fontSize: '0.75rem' }}>{atk.description}</div>}
                          </div>
                        ))}

                        {/* Abilities */}
                        {bestiaryData.abilities.length > 0 && (
                          <>
                            <h4 style={{ fontSize: '0.8rem', color: '#a855f7', marginTop: 8, marginBottom: 6 }}>✨ Capacités</h4>
                            {bestiaryData.abilities.map((ab, i) => (
                              <div key={i} style={{
                                background: 'rgba(168,85,247,0.08)', borderRadius: 6, padding: '6px 10px', marginBottom: 4, fontSize: '0.8rem'
                              }}>
                                <strong style={{ color: 'var(--gold)' }}>{ab.name}</strong>
                                {ab.recharge && <span style={{ color: 'var(--text-muted)', marginLeft: 6, fontSize: '0.7rem' }}>({ab.recharge})</span>}
                                <div style={{ color: 'var(--text-secondary)', marginTop: 2, fontSize: '0.75rem' }}>{ab.description}</div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    ) : (
                      /* Inline attacks/abilities from combat state if no bestiary match */
                      <div>
                        {c.attacks && c.attacks.length > 0 && (
                          <>
                            <h4 style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: 6 }}>⚔️ Attaques</h4>
                            {c.attacks.map((atk, i) => (
                              <div key={i} style={{
                                background: 'rgba(239,68,68,0.08)', borderRadius: 6, padding: '6px 10px', marginBottom: 4, fontSize: '0.8rem'
                              }}>
                                <strong style={{ color: 'var(--gold)' }}>{atk.name}</strong>
                                <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>+{atk.toHit} | {atk.damage} {atk.damageType}</span>
                              </div>
                            ))}
                          </>
                        )}
                        {c.abilities && c.abilities.length > 0 && (
                          <>
                            <h4 style={{ fontSize: '0.8rem', color: '#a855f7', marginTop: 8, marginBottom: 6 }}>✨ Capacités</h4>
                            {c.abilities.map((ab, i) => (
                              <div key={i} style={{
                                background: 'rgba(168,85,247,0.08)', borderRadius: 6, padding: '6px 10px', marginBottom: 4, fontSize: '0.8rem'
                              }}>
                                <strong style={{ color: 'var(--gold)' }}>{ab.name}</strong>
                                <div style={{ color: 'var(--text-secondary)', marginTop: 2, fontSize: '0.75rem' }}>{ab.description}</div>
                              </div>
                            ))}
                          </>
                        )}
                        {!c.attacks?.length && !c.abilities?.length && (
                          <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>
                            Aucun stat block complet trouvé dans le bestiaire pour "{c.name}".
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Sidebar — Add PCs */}
        <div>
          {/* Import Party button */}
          <div className="card" style={{ marginBottom: 16, textAlign: 'center' }}>
            <button className="btn btn-gold" style={{ width: '100%' }} onClick={addPartyToCombat}>
              🛡️ Ajouter le Groupe
            </button>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 6 }}>
              Importe les PJ depuis le Gestionnaire de Groupe
            </p>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ marginBottom: 12, color: 'var(--gold)' }}>➕ Ajouter un PJ</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                placeholder="Nom du personnage"
                value={pcName}
                onChange={e => setPcName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addPC()}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <label className="stat-label">Initiative</label>
                  <input type="number" value={pcInit} onChange={e => setPcInit(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="stat-label">CA</label>
                  <input type="number" value={pcAc} onChange={e => setPcAc(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="stat-label">PV</label>
                  <input type="number" value={pcHp} onChange={e => setPcHp(+e.target.value)} style={{ width: '100%' }} />
                </div>
              </div>
              <button className="btn btn-gold" onClick={addPC} disabled={!pcName.trim()}>
                ➕ Ajouter
              </button>
            </div>
          </div>

          {/* Combat Summary */}
          <div className="card">
            <h3 style={{ marginBottom: 12, color: 'var(--gold)' }}>📊 Résumé</h3>
            <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Round</span>
                <strong style={{ color: 'var(--gold)' }}>{round}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Combattants</span>
                <strong>{combatants.length}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Ennemis vivants</span>
                <strong style={{ color: aliveEnemies > 0 ? '#ef4444' : '#22c55e' }}>{aliveEnemies}/{totalEnemies}</strong>
              </div>
              {totalXP > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>XP à gagner</span>
                  <strong style={{ color: 'var(--gold)' }}>{totalXP}</strong>
                </div>
              )}
              <hr className="divider" />

              {/* Per-combatant HP quick view */}
              {sorted.map(c => {
                const pct = c.maxHp > 0 ? (c.hp / c.maxHp) * 100 : 0
                return (
                  <div key={c.instanceId} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: c.isDead ? '#666' : c.isPC ? '#3b82f6' : '#ef4444',
                      flexShrink: 0
                    }} />
                    <span style={{
                      flex: 1, fontSize: '0.75rem',
                      color: c.isDead ? 'var(--text-muted)' : 'var(--text-secondary)',
                      textDecoration: c.isDead ? 'line-through' : 'none',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>{c.name}</span>
                    <div style={{ width: 50, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${pct}%`, borderRadius: 2,
                        background: pct > 60 ? '#22c55e' : pct > 30 ? '#eab308' : '#ef4444'
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
