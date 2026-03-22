# README - Composants React

Ce dossier contient tous les composants React du projet Aethelgard RPG.

## 📁 Structure

### 🎮 Gameplay Principal
- **`App.jsx`** : Point d'entrée, gestion état global, routing
- **`SessionHub.jsx`** : Lobby multijoueur (créer/rejoindre sessions)
- **`SessionLobby.jsx`** : Salle d'attente avant démarrage partie
- **`WaitingRoom.jsx`** : Écran attente connexion autres joueurs

### 🎲 Système de Dés
- **`DiceChallengeModal.jsx`** : Interface jets de dés (DC challenges)
- **`Dice2D.jsx`** : Rendu 2D des dés avec SVG et CSS (sans WebGL)
- **`Dice2D.css`** : Styles animations dés 2D avec effets premium

### ⚔️ Combat
- **`CombatManager.jsx`** : Système combat tactique complet
  - Grille 25×25, tour par tour
  - IA ennemis, animations déplacement
  - Sync temps réel Supabase
- **`CombatManager.css`** : Styles interface combat

### 👤 Personnage
- **`CharacterCreation.jsx`** : Création personnage (lifepath 13 phases)
- **`CharacterCreation.css`** : Styles écran création
- **`CharacterSheet.jsx`** : Fiche personnage (stats, inventaire, compétences)

### 🏪 Commerce & Interactions
- **`MerchantModal.jsx`** : Interface marchand (acheter/vendre)
- **`TradeModal.jsx`** : Interface échange entre joueurs

### 🎨 UI/UX
- **`SceneBackground.jsx`** : Fond dynamique selon scène
- **`NarrationPanel.jsx`** : Panneau narratif MJ (HUD/)

## 🔑 Composants Critiques

### App.jsx
**Responsabilités :**
- État global (personnages, messages, combat, sessions)
- Connexion Supabase realtime
- Routing phases (création → lobby → session → jeu)
- Gestion API Game Master (Claude AI)

**États clés :**
```javascript
const [currentPhase, setCurrentPhase] = useState('character-creation')
const [myPlayer, setMyPlayer] = useState(null)
const [activeSession, setActiveSession] = useState(null)
const [combatState, setCombatState] = useState(null)
const [messages, setMessages] = useState([])
const [activeChallenge, setActiveChallenge] = useState(null)
```

**Fonctions importantes :**
- `handleGMResponse()` : Traiter réponse IA (ligne ~2400)
- `sendMessage()` : Envoyer message au MJ (ligne ~1800)
- `handleCombatAction()` : Gérer actions combat (ligne ~2600)

---

### CombatManager.jsx
**Responsabilités :**
- Grille tactique 25×25
- Gestion tour par tour (initiative, PM, actions)
- IA ennemis (ligne 1200+)
- Animations déplacement (ligne 755-783)
- Sync realtime combatState

**Critical Sections :**
```javascript
// SYNC BLOCKER (ligne 263-290)
useEffect(() => {
  // Bloque sync si movingUnit actif (évite rollback pendant animation)
})

// ANIMATION (ligne 755-783)
const animateMovement = (unitId, fromX, fromY, toX, toY) => {
  // Easing, interpolation, callback avec delay 50ms
}

// IA ENEMIES (ligne 1200+)
const executeAITurn = async (enemy) => {
  // Logique IA : déplacement → attaque → fin tour
}
```

**États critiques :**
```javascript
const [combatants, setCombatants] = useState([])
const [currentActorIndex, setCurrentActorIndex] = useState(0)
const [movingUnit, setMovingUnit] = useState(null) // Anti-rollback
```

---

### CharacterCreation.jsx
**Responsabilités :**
- Système lifepath 13 phases
- Calcul stats basé sur choix
- Génération backstory
- Musique (Wii Sports Medieval)

**Phases :**
1. Nom
2. Race
3. Région d'origine
4. Classe
5-13. Événements narratifs

**Calcul stats :**
```javascript
// Exemple phase 4 (Classe)
if (choice === "Guerrier") {
  tempStats.FORCE += 15
  tempStats.CONSTITUTION += 10
}
```

---

### DiceChallengeModal.jsx
**Props :**
```javascript
{
  challenge: {
    stat: "CHARISME",
    dc: 35,
    description: "...",
    onSuccess: "...",
    onFailure: "..."
  },
  playerStats: { FORCE: 50, ... },
  onRoll: (result) => {},
  onClose: () => {}
}
```

**Fonctionnement :**
1. Affiche DC et stat requise
2. Joueur clique "Lancer"
3. `Math.floor(Math.random() * 100) + 1 + playerStats[stat]`
4. Compare vs DC
5. Callback avec résultat

---

## 🎨 Styles

**Fichiers CSS :**
- `CharacterCreation.css` : Écran création, phases, choix
- `CombatManager.css` : Grille combat, unités, UI combat
- `Dice2D.css` : Animations 2D dés SVG avec effets premium (glow, particules)
- `SessionHub.css` : Lobby, liste sessions
- `index.css` : Styles globaux, variables CSS

**Thème Dark Fantasy :**
```css
:root {
  --primary: #d4af37; /* Or */
  --bg-dark: #14141e;
  --bg-darker: #0a0a0f;
  --text: #e8e8f0;
  --border: rgba(212, 175, 55, 0.3);
}
```

---

## 🔧 Hooks Supabase

**Realtime subscriptions :**
```javascript
// Sessions sync
supabase
  .channel('sessions-changes')
  .on('postgres_changes', { event: '*', table: 'sessions' }, callback)
  .subscribe()

// Messages sync
supabase
  .channel('messages-changes')
  .on('postgres_changes', { event: 'INSERT', table: 'messages' }, callback)
  .subscribe()
```

**CRITICAL** : Toujours `unsubscribe()` dans cleanup useEffect.

---

## 🐛 Problèmes Connus Résolus

### 1. Combat Deadlock
**Symptôme :** Tour joueur ne commence jamais après ennemi.
**Cause :** `movingUnit` bloq sync useEffect (ligne 279).
**Fix :** Delay 50ms callback animation (ligne 777).

### 2. Challenge non affiché
**Symptôme :** MJ demande jet mais interface ne s'ouvre pas.
**Cause :** Format JSON manquait champ `challenge`.
**Fix :** Ajouté format dans prompt MJ (ligne 448-463).

### 3. Three.js Context Lost → Résolu
**Symptôme :** Warnings "WebGLRenderer: Context Lost".
**Cause :** Trop d'instances Three.js simultanées.
**Fix :** Remplacement par Dice2D (CSS/SVG sans WebGL).

---

## 📚 Documentation Complémentaire

- **Architecture générale** : `docs/ARCHITECTURE.md`
- **Lore & MJ** : `docs/LORE_AND_GM_GUIDE.md`
- **Règles MJ** : `docs/AUTORITE_MJ_ABSOLUE.md`

---

## 🚀 Bonnes Pratiques

1. **Logs debug** : Préfixer `[ComponentName]`
2. **État local vs global** : Local si composant seul l'utilise
3. **Realtime cleanup** : Toujours unsubscribe
4. **Animations** : Utiliser `requestAnimationFrame` + cleanup
5. **CSS** : Classes BEM-like (component-element--modifier)
