# Architecture du Projet JDR

## Vue d'ensemble

Ce projet est un **Jeu de Rôle (JDR) en ligne** utilisant React, Supabase et l'IA (OpenAI) pour générer du contenu narratif dynamique.

## Structure des dossiers (Optimisée - Feature-Based)

```
src/
├── features/               # Modules par domaine fonctionnel
│   ├── character/          # Personnages (création, fiche, level up)
│   │   ├── index.js        # Barrel export
│   │   ├── CharacterCreation.jsx
│   │   ├── CharacterSheet.jsx
│   │   └── LevelUpModal.jsx
│   ├── combat/             # Combat (gestion, dés, tours)
│   │   ├── index.js
│   │   ├── CombatManager.jsx
│   │   ├── TurnTracker.jsx
│   │   ├── Dice2D.jsx
│   │   ├── DieVisual.jsx
│   │   ├── DiceChallengeModal.jsx
│   │   └── CombatDistanceModal.jsx
│   ├── inventory/          # Inventaire (gestion, échange, butin)
│   │   ├── index.js
│   │   ├── InventoryPanel.jsx
│   │   ├── TradeModal.jsx
│   │   ├── LootModal.jsx
│   │   ├── MerchantModal.jsx
│   │   ├── MaterialInventory.jsx
│   │   └── TransactionPrompt.jsx
│   ├── session/            # Sessions (hub, lobby, attente)
│   │   ├── index.js
│   │   ├── SessionHub.jsx
│   │   ├── SessionLobby.jsx
│   │   └── WaitingRoom.jsx
│   ├── chat/               # Chat/Dialogue (narration, PNJ)
│   │   ├── index.js
│   │   ├── NarrationPanel.jsx
│   │   ├── NPCDialogueModal.jsx
│   │   └── ItemSharePanel.jsx
│   ├── game-master/        # MJ (panneau, codex, debug)
│   │   ├── index.js
│   │   ├── DMPanel.jsx
│   │   ├── CodexPanel.jsx
│   │   ├── GameHelperModal.jsx
│   │   └── DebugPanel.jsx
│   └── index.js            # Export central des features
├── shared/                 # Ressources partagées
│   ├── components/         # Composants UI réutilisables
│   │   ├── index.js
│   │   ├── ToastNotification.jsx
│   │   ├── MagicBackground.jsx
│   │   ├── ParticleSystem.jsx
│   │   ├── SceneBackground.jsx
│   │   ├── WeatherOverlay.jsx
│   │   ├── AudioManager.jsx
│   │   ├── TypewriterText.jsx
│   │   ├── PartyHUD.jsx
│   │   ├── PartyInfoPanel.jsx
│   │   └── HUD/
│   │       └── HUDHeader.jsx
│   ├── hooks/              # Hooks personnalisés
│   │   ├── index.js
│   │   ├── useGameState.js
│   │   ├── useCombat.ts
│   │   └── useCombatSync.js
│   ├── utils/              # Utilitaires
│   │   ├── index.js
│   │   ├── gameUtils.js
│   │   ├── combat-d100.js
│   │   └── combat-progression.js
│   └── types/              # Types TypeScript
├── infra/                  # Infrastructure
│   ├── index.js            # Export central
│   ├── supabase/           # Client Supabase
│   │   └── supabaseClient.js
│   ├── ai/                 # Systèmes AI
│   │   ├── handlers/
│   │   └── narrative/
│   ├── services/           # Services métier
│   └── store/              # State management
├── lore/                   # Données du monde (déjà bien organisé)
│   ├── professions/
│   ├── factions/
│   ├── bestiary-expansion-*.ts
│   └── ...
├── App.jsx                 # Point d'entrée principal
└── main.jsx                # Bootstrap React
```

### Imports simplifiés avec Barrel Exports

```javascript
// Avant (chemins complexes)
import { CombatManager } from './components/CombatManager';
import { CharacterSheet } from './components/CharacterSheet';
import { InventoryPanel } from './components/InventoryPanel';

// Après (imports propres)
import { CombatManager } from './features/combat';
import { CharacterSheet } from './features/character';
import { InventoryPanel } from './features/inventory';
import { AudioManager, MagicBackground } from './shared/components';
import { supabase } from './infra';
```

## Architecture clé

### 1. Système de combat (`CombatManager.jsx`)

**Responsabilités :**
- Gestion des tours de combat
- Mouvement sur grille
- Attaques et sorts
- Synchronisation multijoueur via `world_state`

**Points d'attention :**
- `canAct` est une valeur memoized qui peut devenir stale
- Toujours utiliser `combatantsRef.current` pour l'état frais
- Les sorts `target: 'self'` utilisent `executeSelfBuff()`

### 2. Synchronisation multijoueur

**Mécanismes :**
- **Supabase Realtime** : Écoute des changements `postgres_changes`
- **Polling fallback** : Intervale de 5 secondes si Realtime déconnecte
- **World State** : Table `world_state` pour l'état partagé (combat, météo, marchands)

**Tables critiques :**
- `players` : Données des personnages
- `messages` : Historique de chat et narration
- `world_state` : État synchronisé (clé: `combat_<sessionId>`, `weather_<sessionId>`)
- `player_professions` : Métiers appris via Codex

### 3. Gestion d'état globale

**Dans `App.jsx` :**
- `character` : Données du joueur courant
- `players` : Liste des joueurs de la session
- `session` : Informations de la session
- `messages` : Historique de narration
- `combatMode` / `syncedCombatState` : État du combat
- `activeMerchant` / `activeNPC` : Interactions PNJ

**Anti-patterns à éviter :**
- Ne pas modifier `character` directement, utiliser `handleUpdateInventory()`
- Toujours passer par Supabase pour les changements persistants

### 4. Système de LifePath

**Fichiers clés :**
- `lore/character-creation/lifepath/` : Données des choix de vie
- `CharacterCreation.jsx` : Wizard de création
- `LifePathWizard.tsx` : Interface de sélection

**Données persistées :**
- `mechanical_traits` : Aptitudes spéciales
- `skill_bonuses` : Bonus de compétences
- `life_path` : Historique des choix

### 5. Catalogue d'items

**Fichier :** `lore/items-catalog.ts`

**Structure :**
- `ALL_ITEMS` : Tableau de tous les items
- `ITEMS_BY_ID` : Map pour accès rapide par ID
- Items LifePath ajoutés séparément dans `ALL_LIFEPATH_ITEMS`

## Flux de données importants

### Démarrage d'une session

1. **Lobby** → Création session → Attente joueurs
2. **Hub** → Tous les joueurs "Ready" → `session.is_started = true`
3. **Character Creation** → Choix classe + LifePath → `players` mis à jour
4. **Waiting Room** → Tous avec classe → Host lance l'aventure
5. **Adventure Started** → Appel IA `START_ADVENTURE` → Premier message narratif

### Déroulement d'un combat

1. **Host** : `initializeHostCombat()` → Crée `world_state.combat_<sessionId>`
2. **Tous** : Détection via Realtime → `syncedCombatState` → `combatMode = true`
3. **CombatManager** : Initialisation locale avec `initialEnemies`
4. **Tour par tour** : Actions envoyées à Supabase, rechargées par Realtime
5. **Fin** : Host appelle `onCombatEnd()` → Nettoie `world_state`

## Conventions de code

### Nomenclature

- **Fichiers composants** : PascalCase (ex: `CombatManager.jsx`)
- **Fichiers utilitaires** : camelCase (ex: `combat-d100.js`)
- **Fichiers lore** : SCREAMING_SNAKE_CASE pour les constantes

### Gestion des erreurs

```javascript
// Toujours wrapper les appels IA
try {
  const { data } = await supabase.functions.invoke('game-master', { body });
} catch (e) {
  console.error('[GameMaster] Error:', e);
}
```

### États de chargement

```javascript
// Utiliser loading pour bloquer les interactions pendant les appels async
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  if (loading) return;
  setLoading(true);
  try {
    // ... action
  } finally {
    setLoading(false);
  }
};
```

## Debugging

### Logs importants

- `[fetchData]` : Mise à jour des données depuis Supabase
- `[CharacterCreation]` : Résolution des items LifePath
- `[SelfBuff]` : Exécution des sorts sur soi
- `[DEDUP]` : Dédoublonnage des messages IA

### Outils

- **Debug Panel** : Composant visible en bas de l'écran (mode debug)
- **Console Supabase** : Vérifier les tables `world_state`, `messages`
- **Vercel Logs** : Erreurs de build et runtime

## Points de fragilité connus

1. **Double message narratif** : Vérifier `hasGMIntro` utilise bien `role === 'assistant'`
2. **Items LifePath manquants** : Ajouter à `ALL_ITEMS` dans `items-catalog.ts`
3. **Spells self-targeting** : `executeSelfBuff` doit vérifier `action.target === 'self'`
4. **Sync multijoueur** : Non-host doivent faire `fetchData()` quand marqueur trouvé

## Déploiement

```bash
npm run build
npx vercel --prod --yes
```

**URL production** : `https://<project>-<hash>-codevantas-projects.vercel.app`

## Ressources externes

- **Supabase** : `https://okanuafsmkuzyuyqibpu.supabase.co`
- **Vercel Dashboard** : `https://vercel.com/codevantas-projects/jdr`
- **Fonctions Edge** : `supabase/functions/game-master/`, `generate-image/`
