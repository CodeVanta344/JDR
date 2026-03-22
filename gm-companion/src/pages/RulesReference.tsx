import { CLASSES, type Class } from '@lore/classes'
import { DIFFICULTY_THRESHOLDS, getModifier, getProficiencyBonus, calculateAC } from '@lore/rules'

const DC_TABLE = [
  { label: 'Trivial', dc: DIFFICULTY_THRESHOLDS.TRIVIAL, desc: 'Routine absolue' },
  { label: 'Très Facile', dc: DIFFICULTY_THRESHOLDS.VERY_EASY, desc: 'Un novice peut réussir' },
  { label: 'Facile', dc: DIFFICULTY_THRESHOLDS.EASY, desc: 'Effort minimal' },
  { label: 'Moyen', dc: DIFFICULTY_THRESHOLDS.MEDIUM, desc: 'Compétence modérée requise' },
  { label: 'Difficile', dc: DIFFICULTY_THRESHOLDS.HARD, desc: 'Challenge pour expert' },
  { label: 'Très Difficile', dc: DIFFICULTY_THRESHOLDS.VERY_HARD, desc: 'Héroïque, quasi-impossible' },
  { label: 'Légendaire', dc: DIFFICULTY_THRESHOLDS.LEGENDARY, desc: 'Digne des légendes' },
]

const PROFICIENCY_LEVELS = Array.from({ length: 30 }, (_, i) => ({
  level: i + 1,
  bonus: getProficiencyBonus(i + 1),
}))

export default function RulesReference() {
  return (
    <div>
      <div className="page-header">
        <h1>📜 Référence des Règles</h1>
        <p>Système d100 — Aethelgard RPG</p>
      </div>

      {/* Difficulty Thresholds */}
      <h2>Seuils de Difficulté (d100)</h2>
      <div className="card" style={{ marginBottom: 24 }}>
        <table>
          <thead>
            <tr><th>Difficulté</th><th>DC</th><th>Description</th></tr>
          </thead>
          <tbody>
            {DC_TABLE.map(d => (
              <tr key={d.label}>
                <td><strong style={{ color: 'var(--gold)' }}>{d.label}</strong></td>
                <td style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem' }}>{d.dc}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{d.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modifier formula */}
      <div className="card" style={{ marginBottom: 16, borderColor: 'var(--border-gold)' }}>
        <h3 style={{ marginBottom: 8 }}>📐 Formule de Modificateur</h3>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: 'var(--gold)', textAlign: 'center', padding: '8px 0' }}>
          Modificateur = (Attribut − 10) × 1.25
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
          {[8, 10, 12, 14, 16, 18, 20].map(v => (
            <div key={v} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Attr {v}</div>
              <div style={{ fontFamily: 'var(--font-title)', color: 'var(--gold)' }}>
                {getModifier(v) >= 0 ? '+' : ''}{getModifier(v)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AC Formula */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 8 }}>🛡️ Calcul de la Classe d'Armure</h3>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem', color: 'var(--gold)', textAlign: 'center', padding: '8px 0' }}>
          CA = 20 + (Bonus Armure × 3) + (Mod DEX × 1.5)
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          Exemple : Cotte de mailles (bonus 5) + DEX 14 (mod +5) → CA = {calculateAC(5, getModifier(14), 'medium', false)}
        </p>
      </div>

      {/* Combat basics */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 8 }}>⚔️ Mécaniques de Combat</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.9rem' }}>
          <div><strong>Initiative :</strong> d100 + Mod DEX</div>
          <div><strong>Attaque :</strong> d100 + Mod + Maîtrise ≥ CA</div>
          <div><strong>Critique :</strong> 95-100 sur d100</div>
          <div><strong>Fumble :</strong> 1-5 sur d100</div>
          <div><strong>Dégâts :</strong> Dé d'arme + Mod Attr</div>
          <div><strong>PV à 0 :</strong> Inconscient, jets de mort</div>
        </div>
      </div>

      {/* Rest System */}
      <h2>Système de Repos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div className="card">
          <h3 style={{ marginBottom: 8 }}>🌙 Repos Court (1h)</h3>
          <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: 16 }}>
            <li>Récupération PV : 25% PV max</li>
            <li>Ressource : 25% pool max</li>
            <li>1 utilisation Dé de Vie possible</li>
          </ul>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: 8 }}>☀️ Repos Long (8h)</h3>
          <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: 16 }}>
            <li>Récupération PV : 100% PV max</li>
            <li>Ressource : 100% pool max</li>
            <li>Tous les Dés de Vie récupérés</li>
          </ul>
        </div>
      </div>

      {/* Proficiency by level */}
      <h2>Bonus de Maîtrise par Niveau</h2>
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {PROFICIENCY_LEVELS.map(({ level, bonus }) => (
            <div key={level} style={{ textAlign: 'center', minWidth: 40 }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Nv.{level}</div>
              <div style={{ fontFamily: 'var(--font-title)', color: level % 4 === 0 ? 'var(--gold)' : 'var(--text-primary)' }}>+{bonus}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Class overview */}
      <h2>Maîtrises par Classe</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Classe</th>
              <th>Catégorie</th>
              <th>Armures</th>
              <th>Armes</th>
              <th>Bouclier</th>
              <th>Dé de Vie</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(CLASSES).map(([key, cls]: [string, Class]) => (
              <tr key={key}>
                <td><strong style={{ color: 'var(--gold)' }}>{cls.label}</strong></td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cls.category}</td>
                <td style={{ fontSize: '0.8rem' }}>{cls.protection.armor.join(', ')}</td>
                <td style={{ fontSize: '0.8rem' }}>{cls.protection.weapons.join(', ')}</td>
                <td style={{ textAlign: 'center' }}>{cls.protection.shields ? '✅' : '❌'}</td>
                <td style={{ textAlign: 'center' }}>d{cls.hitDie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
