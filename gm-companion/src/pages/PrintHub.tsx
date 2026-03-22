import { useState } from 'react'
import { CLASSES, type Class } from '@lore/classes'
import { DIFFICULTY_THRESHOLDS, getModifier, getProficiencyBonus } from '@lore/rules'

type PrintMode = 'none' | 'char-sheet' | 'quick-rules' | 'gm-screen'

function CharacterSheet({ cls }: { cls: Class }) {
  const slots = ['Main', 'Off-hand', 'Corps', 'Tête', 'Cou', 'Doigt', 'Dos', 'Objet']
  const stats = [
    { key: 'str', label: 'FORCE' },
    { key: 'dex', label: 'DEXTÉRITÉ' },
    { key: 'con', label: 'CONSTITUTION' },
    { key: 'int', label: 'INTELLIGENCE' },
    { key: 'wis', label: 'SAGESSE' },
    { key: 'cha', label: 'CHARISME' },
  ]

  const startAbilities = cls.initial_ability_options || []

  return (
    <div className="print-page char-sheet">
      <div className="sheet-header">
        <div className="sheet-title">AETHELGARD</div>
        <div className="sheet-subtitle">Fiche de Personnage — {cls.label} ({cls.category})</div>
      </div>

      {/* Identity fields */}
      <div className="field-row">
        <div style={{ flex: 2 }}><div className="field-label">NOM DU PERSONNAGE</div><div className="field"></div></div>
        <div style={{ flex: 1 }}><div className="field-label">RACE</div><div className="field"></div></div>
        <div style={{ flex: 1 }}><div className="field-label">NIVEAU</div><div className="field"></div></div>
        <div style={{ flex: 1 }}><div className="field-label">XP</div><div className="field"></div></div>
      </div>
      <div className="field-row">
        <div style={{ flex: 2 }}><div className="field-label">JOUEUR</div><div className="field"></div></div>
        <div style={{ flex: 1 }}><div className="field-label">CLASSE</div><div className="field">{cls.label}</div></div>
        <div style={{ flex: 1 }}><div className="field-label">DÉ DE VIE</div><div className="field">d{cls.hitDie}</div></div>
      </div>

      {/* Stats grid */}
      <div className="section-title">Caractéristiques</div>
      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.key} className="stat-box">
            <div className="label">{s.label}</div>
            <div className="value">___</div>
            <div className="modifier">Mod: ___</div>
          </div>
        ))}
      </div>

      {/* Combat stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, margin: '8px 0' }}>
        {[
          { l: 'PV MAX', v: '' },
          { l: 'PV ACTUELS', v: '' },
          { l: 'CLASSE D\'ARMURE', v: '' },
          { l: 'VITESSE', v: '30' },
        ].map(x => (
          <div key={x.l} className="stat-box">
            <div className="label">{x.l}</div>
            <div className="value" style={{ fontSize: '14pt' }}>{x.v || '___'}</div>
          </div>
        ))}
      </div>

      {/* Class mechanic */}
      <div className="mechanic-box">
        <div className="mech-title">⚙️ {cls.mechanic.name}</div>
        <div>{cls.mechanic.desc.split('\\n')[0]}</div>
      </div>

      {/* Equipment */}
      <div className="section-title">Équipement</div>
      <div className="equipment-grid">
        {slots.map(s => (
          <div key={s} className="equip-slot">
            <span className="slot-label">{s}</span>
            <span>_________________________________</span>
          </div>
        ))}
      </div>

      {/* Starting abilities */}
      <div className="section-title">Capacités de Départ</div>
      {startAbilities.slice(0, 4).map(a => (
        <div key={a.name} className="ability-print">
          <div className="ab-name">{a.name}</div>
          <div className="ab-meta">
            {a.cost > 0 && <span>Coût : {a.cost} {cls.resourceStat} | </span>}
            <span>CD : {a.cooldown}t | </span>
            {a.dice && <span>Dés : {a.dice} | </span>}
            {a.range && <span>Portée : {a.range}</span>}
          </div>
          <div>{a.desc || a.description || a.flavor || ''}</div>
        </div>
      ))}

      {/* Proficiencies */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 8, fontSize: '8pt' }}>
        <div><strong>Armures :</strong> {cls.protection.armor.join(', ')}</div>
        <div><strong>Armes :</strong> {cls.protection.weapons.join(', ')}</div>
        <div><strong>Bouclier :</strong> {cls.protection.shields ? 'Oui' : 'Non'}</div>
        <div><strong>Attr. recommandés :</strong> {cls.recommended_stats.major.join(', ')}</div>
      </div>

      {/* Inventory */}
      <div className="section-title">Inventaire</div>
      <div className="inventory-grid">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="inv-slot">{i + 1}.</div>
        ))}
      </div>

      {/* Money & Notes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 8, marginTop: 8 }}>
        <div>
          <div className="section-title" style={{ marginTop: 0 }}>Or</div>
          <div className="stat-box" style={{ padding: 8, fontSize: '14pt' }}>_____</div>
        </div>
        <div>
          <div className="section-title" style={{ marginTop: 0 }}>Notes</div>
          <div className="notes-area"></div>
        </div>
      </div>
    </div>
  )
}

function QuickRules() {
  const dcEntries = [
    { label: 'Trivial', dc: DIFFICULTY_THRESHOLDS.TRIVIAL },
    { label: 'Très Facile', dc: DIFFICULTY_THRESHOLDS.VERY_EASY },
    { label: 'Facile', dc: DIFFICULTY_THRESHOLDS.EASY },
    { label: 'Moyen', dc: DIFFICULTY_THRESHOLDS.MEDIUM },
    { label: 'Difficile', dc: DIFFICULTY_THRESHOLDS.HARD },
    { label: 'Très Difficile', dc: DIFFICULTY_THRESHOLDS.VERY_HARD },
    { label: 'Légendaire', dc: DIFFICULTY_THRESHOLDS.LEGENDARY },
  ]

  return (
    <div className="print-page char-sheet">
      <div className="sheet-header">
        <div className="sheet-title">AETHELGARD — RÈGLES RAPIDES</div>
        <div className="sheet-subtitle">Résumé du Système de Jeu</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: '8.5pt' }}>
        <div>
          <div className="section-title">🎲 Système de Dés</div>
          <ul style={{ paddingLeft: 16 }}>
            <li><strong>Jet de base :</strong> d100 + Modificateur ≥ DC</li>
            <li><strong>Critique :</strong> 95-100 sur le d100</li>
            <li><strong>Fumble :</strong> 1-5 sur le d100</li>
            <li><strong>Modificateur :</strong> (Attribut − 10) × 1.25</li>
          </ul>

          <div className="section-title">📊 Seuils de Difficulté</div>
          <table style={{ width: '100%', fontSize: '8pt' }}>
            <thead><tr><th>Niveau</th><th>DC</th></tr></thead>
            <tbody>
              {dcEntries.map(d => (
                <tr key={d.label}><td>{d.label}</td><td><strong>{d.dc}</strong></td></tr>
              ))}
            </tbody>
          </table>

          <div className="section-title">🛡️ Classe d'Armure</div>
          <p>CA = 20 + (Bonus Armure × 3) + (Mod DEX × 1.5)</p>

          <div className="section-title">⚔️ Combat</div>
          <ul style={{ paddingLeft: 16 }}>
            <li><strong>Initiative :</strong> d100 + Mod DEX</li>
            <li><strong>Attaque :</strong> d100 + Mod + Maîtrise ≥ CA</li>
            <li><strong>Dégâts :</strong> Dé d'arme + Mod Attr</li>
          </ul>
        </div>

        <div>
          <div className="section-title">🌙 Repos</div>
          <div style={{ marginBottom: 8 }}>
            <strong>Court (1h) :</strong> 25% PV, 25% ressource
          </div>
          <div>
            <strong>Long (8h) :</strong> 100% PV, 100% ressource
          </div>

          <div className="section-title">📈 Bonus de Maîtrise</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2, fontSize: '7.5pt', textAlign: 'center' }}>
            {Array.from({ length: 30 }, (_, i) => i + 1).map(lv => (
              <div key={lv} style={{ border: '1px solid #ddd', padding: 1 }}>
                <div style={{ color: '#888' }}>{lv}</div>
                <div><strong>+{getProficiencyBonus(lv)}</strong></div>
              </div>
            ))}
          </div>

          <div className="section-title">🎭 Conditions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, fontSize: '7.5pt' }}>
            {['Aveuglé', 'Charmé', 'Assourdi', 'Effrayé', 'Empoigné', 'Incapacité', 'Invisible', 'Paralysé', 'Pétrifié', 'Empoisonné', 'À terre', 'Entravé', 'Étourdi', 'Inconscient'].map(c => (
              <div key={c} style={{ border: '1px solid #eee', padding: '1px 4px' }}>{c}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function GMScreen() {
  const dcEntries = [
    { label: 'Trivial', dc: DIFFICULTY_THRESHOLDS.TRIVIAL },
    { label: 'Très Facile', dc: DIFFICULTY_THRESHOLDS.VERY_EASY },
    { label: 'Facile', dc: DIFFICULTY_THRESHOLDS.EASY },
    { label: 'Moyen', dc: DIFFICULTY_THRESHOLDS.MEDIUM },
    { label: 'Difficile', dc: DIFFICULTY_THRESHOLDS.HARD },
    { label: 'Très Difficile', dc: DIFFICULTY_THRESHOLDS.VERY_HARD },
    { label: 'Légendaire', dc: DIFFICULTY_THRESHOLDS.LEGENDARY },
  ]

  return (
    <div className="print-page" style={{ padding: 6 }}>
      <div className="gm-screen">
        <div className="panel">
          <h4 style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: 4, marginBottom: 8 }}>📜 RÉFÉRENCE RAPIDE</h4>
          <table>
            <thead><tr><th>Difficulté</th><th>DC</th></tr></thead>
            <tbody>
              {dcEntries.map(d => (
                <tr key={d.label}><td>{d.label}</td><td><strong>{d.dc}</strong></td></tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 8, fontSize: '7pt' }}>
            <strong>Mod :</strong> (Attr−10)×1.25<br/>
            <strong>CA :</strong> 20+(Armure×3)+(DEX mod×1.5)<br/>
            <strong>Attaque :</strong> d100+Mod+Maîtrise ≥ CA<br/>
            <strong>Crit :</strong> 95-100 | <strong>Fumble :</strong> 1-5
          </div>
        </div>

        <div className="panel">
          <h4 style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: 4, marginBottom: 8 }}>⚔️ COMBAT & REPOS</h4>
          <div style={{ fontSize: '7pt' }}>
            <strong>Initiative :</strong> d100 + DEX mod<br/>
            <strong>Actions :</strong> Action + Mouvement + Action bonus<br/>
            <strong>Repos Court (1h) :</strong> 25% PV, 25% ressource<br/>
            <strong>Repos Long (8h) :</strong> 100% PV, 100% ressource
          </div>
          <div style={{ marginTop: 8, fontSize: '7pt' }}>
            <strong>Conditions :</strong> Aveuglé, Charmé, Effrayé, Empoigné, Incapacité, Invisible, Paralysé, Empoisonné, À terre, Entravé, Étourdi, Inconscient
          </div>
          <div style={{ marginTop: 8 }}>
            <strong>Maîtrise :</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, fontSize: '6.5pt' }}>
              {Array.from({ length: 20 }, (_, i) => i + 1).map(lv => (
                <span key={lv}>Nv{lv}:+{getProficiencyBonus(lv)} </span>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <h4 style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: 4, marginBottom: 8 }}>🎲 TABLES ALÉATOIRES</h4>
          <div style={{ fontSize: '7pt' }}>
            <strong>Rumeurs (d6) :</strong>
            <ol style={{ paddingLeft: 14, margin: '2px 0' }}>
              <li>Un portail ancien brille dans les ruines</li>
              <li>Un dragon rouge a été vu au sud</li>
              <li>Le marché noir vend des artefacts</li>
              <li>Les morts ne restent plus en terre</li>
              <li>Le Conseil cache un traître</li>
              <li>Une secte vénère l'Ombre</li>
            </ol>
          </div>
          <div style={{ marginTop: 6, fontSize: '7pt' }}>
            <strong>PNJ Rapide (d6) :</strong>
            <ol style={{ paddingLeft: 14, margin: '2px 0' }}>
              <li>Marchand nerveux, colis suspect</li>
              <li>Garde ivre avec un secret</li>
              <li>Mendiant qui en sait trop</li>
              <li>Noble en fuite, poursuivi</li>
              <li>Prêtre doutant de sa foi</li>
              <li>Enfant avec une carte au trésor</li>
            </ol>
          </div>
          <div style={{ marginTop: 6, fontSize: '7pt' }}>
            <strong>Événement de Route (d6) :</strong>
            <ol style={{ paddingLeft: 14, margin: '2px 0' }}>
              <li>Pont effondré, détour nécessaire</li>
              <li>Caravane attaquée par des bandits</li>
              <li>Orage magique, éclairs violets</li>
              <li>Ruines anciennes, piège actif</li>
              <li>Animal blessé, guérison = récompense</li>
              <li>Voyageur mystérieux, offre un marché</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PrintHub() {
  const [printMode, setPrintMode] = useState<PrintMode>('none')
  const [selectedClass, setSelectedClass] = useState<string>(Object.keys(CLASSES)[0])

  const classEntries = Object.entries(CLASSES) as [string, Class][]

  if (printMode !== 'none') {
    return (
      <div>
        <div className="no-print" style={{ padding: 16, background: 'var(--bg-surface)', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn" onClick={() => setPrintMode('none')}>← Retour</button>
          <button className="btn btn-gold" onClick={() => window.print()}>🖨️ Imprimer / PDF</button>
          {printMode === 'char-sheet' && (
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
              {classEntries.map(([k, c]) => (
                <option key={k} value={k}>{c.label}</option>
              ))}
            </select>
          )}
        </div>

        {printMode === 'char-sheet' && CLASSES[selectedClass] && (
          <CharacterSheet cls={CLASSES[selectedClass]} />
        )}
        {printMode === 'quick-rules' && <QuickRules />}
        {printMode === 'gm-screen' && <GMScreen />}
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1>🖨️ Fiches & Cartes Imprimables</h1>
        <p>Sélectionnez un document à imprimer ou exporter en PDF</p>
      </div>

      <div className="card-grid">
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => setPrintMode('char-sheet')}>
          <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: 8 }}>📋</div>
          <div className="card-title" style={{ textAlign: 'center' }}>Fiche de Personnage</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center' }}>
            Fiche A4 complète pour chacune des 8 classes : stats, équipement, capacités, inventaire.
          </p>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
            {classEntries.map(([k, c]) => (
              <span key={k} className="tag tag-gold">{c.label}</span>
            ))}
          </div>
        </div>

        <div className="card" style={{ cursor: 'pointer' }} onClick={() => setPrintMode('quick-rules')}>
          <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: 8 }}>📜</div>
          <div className="card-title" style={{ textAlign: 'center' }}>Règles Rapides</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center' }}>
            Résumé 1 page recto : système de dés, seuils, combat, repos, conditions, XP.
          </p>
        </div>

        <div className="card" style={{ cursor: 'pointer' }} onClick={() => setPrintMode('gm-screen')}>
          <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: 8 }}>🛡️</div>
          <div className="card-title" style={{ textAlign: 'center' }}>Écran du MJ</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center' }}>
            3 volets : référence de règles, combat & repos, tables aléatoires.
          </p>
        </div>
      </div>

      <hr className="divider" />

      <div className="card" style={{ borderColor: 'var(--border-gold)' }}>
        <h3 style={{ marginBottom: 8 }}>💡 Comment imprimer</h3>
        <ol style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: 20 }}>
          <li>Cliquez sur un document ci-dessus</li>
          <li>Cliquez sur "🖨️ Imprimer / PDF"</li>
          <li>Dans la fenêtre d'impression, choisissez "Enregistrer en PDF" comme destination</li>
          <li>Assurez-vous que les marges sont sur "Aucune" ou "Minimum"</li>
        </ol>
      </div>
    </div>
  )
}
