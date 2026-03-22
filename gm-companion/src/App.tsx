import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Bestiary from './pages/Bestiary'
import DiceRollerPage from './pages/DiceRoller'
import EncounterBuilder from './pages/EncounterBuilder'
import WorldAtlas from './pages/WorldAtlas'
import RulesReference from './pages/RulesReference'
import EconomyTool from './pages/EconomyTool'
import NPCDirectory from './pages/NPCDirectory'
import FactionHub from './pages/FactionHub'
import QuestLog from './pages/QuestLog'
import ItemsCrafting from './pages/ItemsCrafting'
import ClassReference from './pages/ClassReference'
import SessionToolkit from './pages/SessionToolkit'
import PrintHub from './pages/PrintHub'
import CombatTracker from './pages/CombatTracker'
import NarrativeGuide from './pages/NarrativeGuide'
import { PartyManager } from './pages/PartyManager'
import { DiceRoller as DiceRollerFloat } from './components/DiceRoller'

type NavSection = { kind: 'section'; section: string }
type NavLink = { kind: 'link'; to: string; icon: string; label: string }
type NavItem = NavSection | NavLink

const NAV: NavItem[] = [
  { kind: 'section', section: 'Outils MJ' },
  { kind: 'link', to: '/', icon: '🏰', label: 'Tableau de Bord' },
  { kind: 'link', to: '/party', icon: '🛡️', label: 'Groupe' },
  { kind: 'link', to: '/dice', icon: '🎲', label: 'Lanceur de Dés' },
  { kind: 'link', to: '/bestiary', icon: '🐉', label: 'Bestiaire' },
  { kind: 'link', to: '/encounters', icon: '⚔️', label: 'Rencontres' },
  { kind: 'link', to: '/session-toolkit', icon: '🧰', label: 'Boîte à Outils' },
  { kind: 'link', to: '/combat', icon: '⚔️', label: 'Combat' },
  { kind: 'section', section: 'Lore & Monde' },
  { kind: 'link', to: '/narrative', icon: '📜', label: 'Guide Narratif' },
  { kind: 'link', to: '/npcs', icon: '👤', label: 'Répertoire PNJs' },
  { kind: 'link', to: '/factions', icon: '🏛️', label: 'Factions' },
  { kind: 'link', to: '/quests', icon: '📋', label: 'Journal de Quêtes' },
  { kind: 'link', to: '/items', icon: '⚔️', label: 'Items & Craft' },
  { kind: 'link', to: '/classes', icon: '📚', label: 'Classes' },
  { kind: 'section', section: 'Référence' },
  { kind: 'link', to: '/world', icon: '🗺️', label: 'Atlas du Monde' },
  { kind: 'link', to: '/rules', icon: '📜', label: 'Règles' },
  { kind: 'link', to: '/economy', icon: '💰', label: 'Économie' },
  { kind: 'section', section: 'Impression' },
  { kind: 'link', to: '/print', icon: '🖨️', label: 'Fiches & Cartes' },
]

export default function App() {
  const location = useLocation()

  return (
    <div className="app-layout">
      <nav className="sidebar no-print">
        <div className="sidebar-title">AETHELGARD</div>
        <div className="sidebar-subtitle">Compagnon du MJ</div>

        {NAV.map((item, i) => {
          if (item.kind === 'section') {
            return <div key={i} className="sidebar-section">{item.section}</div>
          }
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive && location.pathname === item.to ? 'active' : ''
              }
              end={item.to === '/'}
            >
              <span>{item.icon}</span> {item.label}
            </NavLink>
          )
        })}
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/party" element={<PartyManager />} />
          <Route path="/dice" element={<DiceRollerPage />} />
          <Route path="/bestiary" element={<Bestiary />} />
          <Route path="/encounters" element={<EncounterBuilder />} />
          <Route path="/world" element={<WorldAtlas />} />
          <Route path="/rules" element={<RulesReference />} />
          <Route path="/economy" element={<EconomyTool />} />
          <Route path="/print" element={<PrintHub />} />
          <Route path="/npcs" element={<NPCDirectory />} />
          <Route path="/factions" element={<FactionHub />} />
          <Route path="/quests" element={<QuestLog />} />
          <Route path="/items" element={<ItemsCrafting />} />
          <Route path="/classes" element={<ClassReference />} />
          <Route path="/session-toolkit" element={<SessionToolkit />} />
          <Route path="/narrative" element={<NarrativeGuide />} />
          <Route path="/combat" element={<CombatTracker />} />
        </Routes>
      </main>
      <DiceRollerFloat />
    </div>
  )
}
