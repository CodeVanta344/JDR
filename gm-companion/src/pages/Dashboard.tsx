import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { RUMORS_AND_GOSSIP } from '@lore/quests'

const TOOLS = [
  { to: '/dice', icon: '🎲', title: 'Lanceur de Dés', desc: 'Système d100, jets de compétence' },
  { to: '/bestiary', icon: '🐉', title: 'Bestiaire', desc: '50+ créatures avec stats et loot' },
  { to: '/encounters', icon: '⚔️', title: 'Rencontres', desc: 'Constructeur par biome et budget XP' },
  { to: '/session-toolkit', icon: '🧰', title: 'Boîte à Outils', desc: 'Dés, initiative, météo, rencontres' },
  { to: '/print', icon: '🖨️', title: 'Fiches & Cartes', desc: 'Fiches perso, cartes, écran MJ' },
]

const LORE_LINKS = [
  { to: '/npcs', icon: '👤', title: 'Répertoire PNJs', desc: '68 PNJs avec filtres et fiches détaillées' },
  { to: '/factions', icon: '🏛️', title: 'Factions', desc: '17 factions, alignements, rangs et relations' },
  { to: '/quests', icon: '📋', title: 'Journal de Quêtes', desc: '8 quêtes principales, secondaires et faction' },
  { to: '/items', icon: '⚗️', title: 'Items & Craft', desc: 'Objets légendaires, artefacts et recettes' },
  { to: '/classes', icon: '🛡️', title: 'Classes', desc: '8 classes avec sous-classes et arbres de talents' },
  { to: '/world', icon: '🗺️', title: 'Atlas du Monde', desc: '5 régions, histoire, tavernes et boutiques' },
]

const REF_LINKS = [
  { to: '/rules', icon: '📜', title: 'Règles', desc: 'Seuils DC, CA, bonus de maîtrise' },
  { to: '/economy', icon: '💰', title: 'Économie', desc: 'Prix des armes, armures et services' },
]

const REGIONS = [
  { name: 'Côte des Orages', icon: '🏔️', capital: 'Kuldahar', tone: 'Toundra glaciale, fjords, Vikings' },
  { name: 'Val Doré', icon: '🌾', capital: 'Sol-Aureus', tone: 'Cœur civilisé, monarchie, commerce' },
  { name: 'Monts Cœur-de-Fer', icon: '⛏️', capital: 'Hammerdeep', tone: 'Nains, mines, forges, 15 niveaux' },
  { name: 'Sylve d\'Émeraude', icon: '🌿', capital: 'Sylmanir', tone: 'Elfes, druides, magie ancienne' },
  { name: 'Terres Brûlées', icon: '🔥', capital: 'Aucune', tone: 'Ruines d\'Ashka, chaos, démons' },
]

// Flatten all rumors
const ALL_RUMORS = Object.values(RUMORS_AND_GOSSIP).flat()

export default function Dashboard() {
  const [rumor, setRumor] = useState(() => ALL_RUMORS[Math.floor(Math.random() * ALL_RUMORS.length)])

  const rollRumor = () => {
    let next: string
    do { next = ALL_RUMORS[Math.floor(Math.random() * ALL_RUMORS.length)] } while (next === rumor && ALL_RUMORS.length > 1)
    setRumor(next)
  }

  return (
    <div>
      <div className="page-header">
        <h1>⚔️ Aethelgard — Compagnon du MJ</h1>
        <p>
          Bienvenue en Aethelgard, un monde en reconstruction dont les anciens portails 
          recommencent à briller. Tous les outils pour mener votre campagne.
        </p>
      </div>

      {/* Random rumor banner */}
      <div className="card" style={{ borderColor: 'var(--gold-dim)', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>🗣️ Rumeur de Taverne</div>
            <p style={{ color: 'var(--gold)', fontStyle: 'italic', margin: 0, fontSize: '0.95rem' }}>« {rumor} »</p>
          </div>
          <button className="btn btn-gold" onClick={rollRumor} style={{ whiteSpace: 'nowrap' }}>🎲 Autre</button>
        </div>
      </div>

      {/* GM Tools */}
      <h2>🧰 Outils MJ</h2>
      <div className="card-grid" style={{ marginBottom: 32 }}>
        {TOOLS.map(l => (
          <Link key={l.to} to={l.to} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>{l.icon}</div>
              <div className="card-title">{l.title}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{l.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <hr className="divider divider-gold" />

      {/* Lore & World */}
      <h2>📖 Lore & Monde</h2>
      <div className="card-grid" style={{ marginBottom: 32 }}>
        {LORE_LINKS.map(l => (
          <Link key={l.to} to={l.to} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>{l.icon}</div>
              <div className="card-title">{l.title}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{l.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <hr className="divider" />

      {/* Reference */}
      <h2>📚 Référence</h2>
      <div className="card-grid" style={{ marginBottom: 32 }}>
        {REF_LINKS.map(l => (
          <Link key={l.to} to={l.to} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>{l.icon}</div>
              <div className="card-title">{l.title}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{l.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <hr className="divider" />

      {/* Regions overview */}
      <h2>🌍 Régions d'Aethelgard</h2>
      <div className="card-grid" style={{ marginBottom: 32 }}>
        {REGIONS.map(r => (
          <div key={r.name} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
              <div>
                <div className="card-title" style={{ marginBottom: 0 }}>{r.name}</div>
                <div className="card-subtitle">Capitale : {r.capital}</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{r.tone}</p>
          </div>
        ))}
      </div>

      <hr className="divider" />

      {/* Era banner */}
      <div className="card" style={{ borderColor: 'var(--border-gold)' }}>
        <h3 style={{ color: 'var(--gold)', marginBottom: 8 }}>📖 Ère Actuelle — La Reconstruction</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          120 ans après l'Ère des Cendres. Les royaumes tentent une paix fragile. 
          Les sceaux faiblissent. L'Ombre murmure. Les anciens portails d'Ashka brillent.
          Vos joueurs arrivent à un moment charnière.
        </p>
      </div>
    </div>
  )
}
