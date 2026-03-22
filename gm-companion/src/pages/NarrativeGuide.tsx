import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ALL_CHAPTERS, type NarrativeChapter } from '../data/chapters'
import { BESTIARY, type CreatureDefinition } from '@lore/bestiary'
import { startCombat, parseEncounterString, makeInstanceId, getDefaultsForCR, type CombatCreature } from '../lib/combatState'

// Use the full narrative data from the data file
const CHAPTERS = ALL_CHAPTERS

// ============================================================================
// STYLE HELPERS
// ============================================================================

const SCENE_TYPE_ICONS: Record<string, string> = {
  combat: '⚔️', dialogue: '💬', exploration: '🧭', narration: '📖', transition: '🚪', investigation: '🔍'
}

const SCENE_TYPE_COLORS: Record<string, string> = {
  combat: '#ef4444', dialogue: '#3b82f6', exploration: '#22c55e', narration: '#a855f7', transition: '#eab308', investigation: '#f97316'
}

const THEME_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function NarrativeGuide() {
  const [selectedChapter, setSelectedChapter] = useState<NarrativeChapter | null>(null)
  const [expandedScene, setExpandedScene] = useState<string | null>(null)
  const [showGmNotes, setShowGmNotes] = useState(true)
  const [showReadAloud, setShowReadAloud] = useState(true)
  const navigate = useNavigate()

  const launchCombat = (encounters: string[], chapterTitle: string, sceneTitle: string, statBlocks?: Record<string, any>) => {
    const ALL_CREATURES = Object.values(BESTIARY) as CreatureDefinition[]
    const enemies: CombatCreature[] = []

    for (const enc of encounters) {
      const { name, cr, count } = parseEncounterString(enc)
      const normalized = name.toLowerCase().trim()

      // --- Tier 1: Bestiary match ---
      const bestiaryMatch = ALL_CREATURES.find(c =>
        c.name.toLowerCase() === normalized ||
        normalized.includes(c.name.toLowerCase()) ||
        c.name.toLowerCase().includes(normalized)
      )

      // --- Tier 2: Chapter statBlock (by key OR by .name field) ---
      let sb: any = undefined
      if (statBlocks) {
        // Try by key
        const sbKey = Object.keys(statBlocks).find(k =>
          k.toLowerCase().includes(normalized) || normalized.includes(k.toLowerCase())
        )
        if (sbKey) sb = statBlocks[sbKey]
        // Try by .name field
        if (!sb) {
          sb = Object.values(statBlocks).find((v: any) =>
            v.name && (
              v.name.toLowerCase().includes(normalized) ||
              normalized.includes(v.name.toLowerCase())
            )
          )
        }
      }

      // --- Tier 3: CR defaults ---
      const crDefaults = cr != null ? getDefaultsForCR(cr) : null

      for (let i = 0; i < count; i++) {
        const creature: CombatCreature = {
          instanceId: makeInstanceId(),
          name: count > 1 ? `${name} ${i + 1}` : name,
          hp: bestiaryMatch ? bestiaryMatch.hitPoints.average
            : sb?.hp ?? crDefaults?.hp ?? 10,
          maxHp: bestiaryMatch ? bestiaryMatch.hitPoints.average
            : sb?.hp ?? crDefaults?.hp ?? 10,
          ac: bestiaryMatch ? bestiaryMatch.armorClass
            : sb?.ac ?? crDefaults?.ac ?? 10,
          initiative: 0,
          cr: cr ?? (bestiaryMatch ? bestiaryMatch.challengeRating : undefined),
          creatureId: bestiaryMatch?.id,
          xp: bestiaryMatch?.experiencePoints ?? crDefaults?.xp ?? 0,
          speed: crDefaults?.speed ?? 30,
          conditions: [],
          attacks: sb?.attacks?.map((a: any) => ({
            name: a.name, toHit: parseInt(a.bonus) || 0, damage: a.damage, damageType: a.notes || 'slashing'
          })) ?? (crDefaults ? [{
            name: 'Attaque', toHit: crDefaults.toHit, damage: crDefaults.damage, damageType: 'slashing'
          }] : undefined),
          abilities: sb?.specialAbilities?.map((s: string) => ({ name: s, description: '' }))
            ?? (sb?.weakness ? [{ name: 'Faiblesse', description: sb.weakness }] : undefined),
        }
        enemies.push(creature)
      }
    }

    startCombat({
      enemies,
      source: 'narrative',
      contextLabel: `${chapterTitle} — ${sceneTitle}`
    })
    navigate('/combat')
  }

  const toggleScene = (id: string) => {
    setExpandedScene(prev => prev === id ? null : id)
  }

  // --- Chapter list view ---
  if (!selectedChapter) {
    return (
      <div>
        <div className="page-header">
          <h1>📜 Guide Narratif</h1>
          <p>Les Sceaux du Crépuscule — 12 chapitres · Niveaux 1-13</p>
        </div>

        {/* Arc progress */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: '1.2rem' }}>🗺️</span>
            <h3 style={{ color: 'var(--gold)', margin: 0 }}>Arc de la Campagne</h3>
          </div>
          <div style={{ display: 'flex', gap: 2, height: 6, borderRadius: 99, overflow: 'hidden' }}>
            {CHAPTERS.map((ch, i) => (
              <div key={ch.id} style={{
                flex: 1, background: `hsl(${(i / 15) * 280 + 20}, 70%, 50%)`,
                cursor: 'pointer', transition: 'transform 0.15s',
              }} title={`Ch.${ch.number}: ${ch.title} (Niv.${ch.suggestedLevel})`}
                onClick={() => setSelectedChapter(ch)}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <span>Niv. 1 — L'Éveil</span>
            <span>Niv. 10 — Guerre</span>
            <span>Niv. 18 — Aube Nouvelle</span>
          </div>
        </div>

        {/* Chapter grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
          {CHAPTERS.map((ch, i) => (
            <div key={ch.id} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}
              onClick={() => setSelectedChapter(ch)}
              onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
              onMouseOut={e => (e.currentTarget.style.borderColor = 'var(--border)')}>

              {/* Chapter number badge */}
              <div style={{
                position: 'absolute', top: 8, right: 10,
                fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold)',
                opacity: 0.1, lineHeight: 1, pointerEvents: 'none'
              }}>
                {ch.number}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, borderRadius: 99,
                  background: `hsl(${(i / 15) * 280 + 20}, 70%, 50%)`,
                  color: '#fff', fontSize: '0.72rem', fontWeight: 700
                }}>{ch.number}</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{ch.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{ch.subtitle}</div>
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 10px', lineHeight: 1.45 }}>
                {ch.summary}
              </p>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                {ch.themes.map((t, j) => (
                  <span key={t} style={{
                    fontSize: '0.65rem', padding: '2px 7px', borderRadius: 99,
                    background: THEME_COLORS[j % THEME_COLORS.length] + '18',
                    color: THEME_COLORS[j % THEME_COLORS.length],
                  }}>{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>📍 {ch.region}</span>
                <span>Niv. {ch.suggestedLevel}</span>
                <span>{ch.scenes.length} scène{ch.scenes.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // --- Chapter detail view ---
  const ch = selectedChapter
  const chIdx = CHAPTERS.findIndex(c => c.id === ch.id)

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn" onClick={() => { setSelectedChapter(null); setExpandedScene(null) }}
            style={{ fontSize: '0.85rem' }}>← Retour</button>
          <div>
            <h1 style={{ margin: 0 }}>Chapitre {ch.number} : {ch.title}</h1>
            <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>{ch.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Chapter meta bar */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 16, fontSize: '0.82rem' }}>
            <span>📍 <strong>{ch.region}</strong></span>
            <span>⬆️ Niv. <strong>{ch.suggestedLevel}</strong></span>
            <span>🎬 <strong>{ch.scenes.length}</strong> scène{ch.scenes.length !== 1 ? 's' : ''}</span>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {ch.themes.map((t, j) => (
              <span key={t} style={{
                fontSize: '0.7rem', padding: '2px 8px', borderRadius: 99,
                background: THEME_COLORS[j % THEME_COLORS.length] + '22',
                color: THEME_COLORS[j % THEME_COLORS.length], fontWeight: 600
              }}>{t}</span>
            ))}
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '10px 0 0', lineHeight: 1.5 }}>
          {ch.summary}
        </p>
      </div>

      {/* Toggle controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button className={`btn ${showReadAloud ? 'btn-gold' : ''}`}
          onClick={() => setShowReadAloud(!showReadAloud)}>
          📖 Texte à lire
        </button>
        <button className={`btn ${showGmNotes ? 'btn-gold' : ''}`}
          onClick={() => setShowGmNotes(!showGmNotes)}>
          🔒 Notes MJ
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {ch.previousChapter && (
            <button className="btn" onClick={() => {
              const prev = CHAPTERS.find(c => c.id === ch.previousChapter)
              if (prev) { setSelectedChapter(prev); setExpandedScene(null) }
            }}>← Ch.{chIdx}</button>
          )}
          {ch.nextChapter && (
            <button className="btn" onClick={() => {
              const next = CHAPTERS.find(c => c.id === ch.nextChapter)
              if (next) { setSelectedChapter(next); setExpandedScene(null) }
            }}>Ch.{chIdx + 2} →</button>
          )}
        </div>
      </div>

      {/* Scenes */}
      {ch.scenes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12, opacity: 0.3 }}>📜</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Les scènes détaillées de ce chapitre sont dans le fichier source
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 6 }}>
            <code>src/lore/narrative-guide-data.ts</code>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ch.scenes.map((scene) => {
            const isExpanded = expandedScene === scene.id
            const icon = SCENE_TYPE_ICONS[scene.type] || '📌'
            const color = SCENE_TYPE_COLORS[scene.type] || 'var(--gold)'

            return (
              <div key={scene.id} className="card" style={{
                borderLeft: `3px solid ${color}`, transition: 'all 0.2s',
                cursor: 'pointer',
              }}>
                {/* Scene header — always visible */}
                <div onClick={() => toggleScene(scene.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      Scène {scene.sceneNumber} — {scene.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', gap: 12, marginTop: 2 }}>
                      <span style={{ color, fontWeight: 600, textTransform: 'capitalize' }}>{scene.type}</span>
                      <span>📍 {scene.location}</span>
                      <span>⏱ ~{scene.estimatedMinutes} min</span>
                      <span>🎵 {scene.mood}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'none' }}>▼</span>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div style={{ marginTop: 16 }}>
                    {/* Read Aloud */}
                    {showReadAloud && scene.readAloud && (
                      <div style={{
                        padding: '14px 18px', marginBottom: 14, borderRadius: 'var(--radius-md)',
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))',
                        borderLeft: '3px solid var(--gold)',
                        fontStyle: 'italic', fontSize: '0.88rem', color: 'var(--text-secondary)',
                        lineHeight: 1.65, whiteSpace: 'pre-line'
                      }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 700, fontStyle: 'normal', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          📖 À lire aux joueurs
                        </div>
                        {scene.readAloud}
                      </div>
                    )}

                    {/* GM Notes */}
                    {showGmNotes && scene.gmNotes && (
                      <div style={{
                        padding: '12px 16px', marginBottom: 14, borderRadius: 'var(--radius-md)',
                        background: 'rgba(239,68,68,0.06)', borderLeft: '3px solid #ef4444',
                        fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55, whiteSpace: 'pre-line'
                      }}>
                        <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          🔒 Notes du MJ (secret)
                        </div>
                        {scene.gmNotes}
                      </div>
                    )}

                    {/* Music suggestion */}
                    {scene.music && (
                      <div style={{
                        padding: '8px 14px', marginBottom: 14, borderRadius: 'var(--radius-sm)',
                        background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', gap: 8,
                        fontSize: '0.8rem', color: '#8b8cf8'
                      }}>
                        🎵 <span>{scene.music}</span>
                      </div>
                    )}

                    {/* Objectives */}
                    {scene.objectives.length > 0 && (
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>
                          🎯 Objectifs
                        </div>
                        {scene.objectives.map((obj, i) => (
                          <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0',
                            fontSize: '0.82rem', color: 'var(--text-secondary)'
                          }}>
                            <span style={{ color: obj.optional ? 'var(--text-muted)' : '#22c55e' }}>
                              {obj.optional ? '○' : '●'}
                            </span>
                            <span>{obj.description}</span>
                            {obj.optional && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>(optionnel)</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Dialogues */}
                    {scene.dialogues.length > 0 && (
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>
                          💬 Dialogues PNJ
                        </div>
                        {scene.dialogues.map((dlg, di) => (
                          <div key={di} style={{ marginBottom: 10, paddingLeft: 12, borderLeft: '2px solid var(--border)' }}>
                            <div style={{ fontWeight: 700, color: '#3b82f6', fontSize: '0.82rem', marginBottom: 4 }}>
                              {dlg.npcName}
                            </div>
                            {dlg.lines.map((line, li) => (
                              <div key={li} style={{ marginBottom: 6 }}>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                  [{line.trigger}]
                                </span>
                                <span style={{ fontSize: '0.68rem', color: color, marginLeft: 6, fontStyle: 'italic' }}>
                                  {line.tone}
                                </span>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.5, fontStyle: 'italic' }}>
                                  {line.text}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Skill Checks */}
                    {scene.skillChecks && scene.skillChecks.length > 0 && (
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>
                          🎲 Jets de compétence
                        </div>
                        {scene.skillChecks.map((sc, i) => (
                          <div key={i} style={{
                            marginBottom: 8, padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                            background: 'var(--bg-hover)'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.82rem' }}>{sc.skill}</span>
                              <span style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.82rem' }}>DD {sc.dc}</span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#22c55e', marginBottom: 4 }}>✅ {sc.success}</div>
                            <div style={{ fontSize: '0.78rem', color: '#ef4444' }}>❌ {sc.failure}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Encounters & Loot — side by side */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                      {scene.encounters && scene.encounters.length > 0 && (
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>
                            ⚔️ Rencontres
                          </div>
                          {scene.encounters.map((e, i) => (
                            <div key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '2px 0' }}>• {e}</div>
                          ))}
                          <button
                            className="btn"
                            style={{
                              marginTop: 8, padding: '4px 14px', fontSize: '0.75rem',
                              background: 'rgba(239,68,68,0.15)', color: '#ef4444',
                              border: '1px solid rgba(239,68,68,0.3)', fontWeight: 600
                            }}
                            onClick={(ev) => {
                              ev.stopPropagation()
                              launchCombat(
                                scene.encounters!,
                                selectedChapter!.title,
                                scene.title,
                                selectedChapter!.statBlocks
                              )
                            }}
                          >
                            ⚔️ Lancer le combat
                          </button>
                        </div>
                      )}
                      {scene.loot && scene.loot.length > 0 && (
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>
                            💎 Butin
                          </div>
                          {scene.loot.map((l, i) => (
                            <div key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '2px 0' }}>• {l}</div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Transitions */}
                    {scene.transitions.length > 0 && (
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>
                          🚪 Transitions
                        </div>
                        {scene.transitions.map((t, i) => (
                          <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                            borderRadius: 'var(--radius-sm)', background: 'var(--bg-hover)', marginBottom: 4,
                            fontSize: '0.8rem'
                          }}>
                            <span style={{ color: 'var(--text-muted)' }}>Si: {t.condition}</span>
                            <span style={{ color: 'var(--gold)', fontWeight: 600, marginLeft: 'auto' }}>{t.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Bottom nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
        {ch.previousChapter ? (
          <button className="btn" onClick={() => {
            const prev = CHAPTERS.find(c => c.id === ch.previousChapter)
            if (prev) { setSelectedChapter(prev); setExpandedScene(null) }
          }}>← Chapitre {chIdx}</button>
        ) : <div />}
        <button className="btn btn-gold" onClick={() => { setSelectedChapter(null); setExpandedScene(null) }}>
          📜 Tous les chapitres
        </button>
        {ch.nextChapter ? (
          <button className="btn" onClick={() => {
            const next = CHAPTERS.find(c => c.id === ch.nextChapter)
            if (next) { setSelectedChapter(next); setExpandedScene(null) }
          }}>Chapitre {chIdx + 2} →</button>
        ) : <div />}
      </div>
    </div>
  )
}
