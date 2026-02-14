# Architecture du Projet Aethelgard RPG

## 📋 Vue d'ensemble

JDR (Jeu de Rôle) Aethelgard est un RPG dark fantasy multijoueur avec IA Game Master, combats tactiques au tour par tour, et système de progression de personnages.

## 🏗️ Structure du Projet

```
D:\JDR/
├── src/                          # Code source principal
│   ├── App.jsx                   # Point d'entrée principal, gestion état global
│   ├── components/               # Composants React
│   │   ├── CharacterCreation.jsx    # Création personnage (lifepath, stats, backstory)
│   │   ├── CharacterSheet.jsx       # Fiche personnage (stats, inventaire, compétences)
│   │   ├── CombatManager.jsx        # Système combat tactique grille 25×25
│   │   ├── DiceChallengeModal.jsx   # Interface jets de dés (DC challenges)
│   │   ├── Dice3D.jsx               # Rendu 3D des dés (Three.js)
│   │   ├── SessionHub.jsx           # Lobby multijoueur
│   │   ├── SessionLobby.jsx         # Salle d'attente session
│   │   └── WaitingRoom.jsx          # Attente autres joueurs
│   ├── lore/                     # Base de données lore
│   │   ├── backstories.ts           # Backstories par race/classe
│   │   ├── classes.ts               # 10 classes (Guerrier, Mage, etc.)
│   │   ├── items.ts                 # Items, armes, armures, potions
│   │   ├── locations.ts             # Lieux (villes, donjons, régions)
│   │   ├── npcs.ts                  # PNJ (marchands, forgerons, etc.)
│   │   ├── rules.ts                 # Règles MJ (autorité, cohérence, DC)
│   │   └── character-creation/      # Système lifepath
│   ├── ai/                       # Logique IA (deprecated, migré vers Edge Function)
│   └── utils/                    # Utilitaires (combat, dés, etc.)
├── supabase/
│   ├── functions/
│   │   └── game-master/
│   │       └── index.ts             # Edge Function MJ (Claude AI)
│   └── migrations/                  # Schéma base de données
├── docs/                         # Documentation
│   ├── AUTORITE_MJ_ABSOLUE.md       # Règles autorité MJ
│   └── ARCHITECTURE.md              # Ce fichier
└── public/                       # Assets statiques
    ├── maps/                        # Cartes combat
    └── aethelgard_map_menu.jpg      # Carte monde menu
```

## 🔑 Composants Clés

### 1. **App.jsx** (Point d'entrée)
- **État global** : personnages, messages, combat, sessions
- **Supabase realtime** : sync multijoueur temps réel
- **Routes principales** : création perso → lobby → session → jeu
- **Hooks critiques** :
  - `useEffect` ligne 380 : Initialisation Supabase
  - `useEffect` ligne 450 : Sync realtime sessions
  - `useEffect` ligne 520 : Sync messages chat

### 2. **CombatManager.jsx** (Combat Tactique)
- **Grille 25×25** : système hexagonal/grid
- **Tour par tour** : initiative, points de mouvement (PM), actions
- **IA ennemis** : logique automatique (ligne 1200+)
- **Sync temps réel** : `combatState` Supabase (ligne 260-290)
- **Animations** : déplacement smooth (ligne 755-783)
- **CRITICAL FIX** : Anti-deadlock animation (ligne 775-778)

### 3. **CharacterCreation.jsx** (Création Personnage)
- **Lifepath system** : 13 phases narratives
- **Choix multiples** : race, classe, origine, backstory
- **Stats calculées** : FOR, DEX, INT, CHA, PER basées sur choix
- **Musique** : Wii Sports Medieval Cover en boucle
- **État persisté** : Supabase `characters` table

### 4. **Game Master (Edge Function)**
**Fichier** : `supabase/functions/game-master/index.ts`
- **IA** : Claude 3.5 Sonnet (Anthropic)
- **Prompt structuré** :
  - Ligne 575-608 : STOP critique anti-complaisance
  - Ligne 143-246 : SUPREME_AUTHORITY_RULES
  - Ligne 254-350 : RULES principales
  - Ligne 448-463 : FORMAT_RESPONSE (JSON avec challenge/combat/codex)
- **Calibrage DC** : ligne 261-280 (échelle 20-100)
- **Refus roleplay** : ligne 146-184 (cohérence environnementale)

## 🗄️ Base de Données (Supabase)

### Tables principales

**characters**
- `id`, `user_id`, `name`, `race`, `class`
- `stats` (JSON), `inventory` (JSON), `abilities` (JSON)
- `backstory`, `level`, `xp`, `hp`, `max_hp`

**sessions**
- `id`, `host_id`, `players` (ARRAY), `status`
- `combat_state` (JSON), `current_location`

**messages**
- `id`, `session_id`, `user_id`, `content`, `type`
- `created_at` (timestamp)

**combat_log**
- `id`, `session_id`, `event`, `details` (JSON)

## 🎮 Flux de Jeu

```
1. Création Personnage (CharacterCreation.jsx)
   ↓
2. Lobby (SessionHub.jsx)
   → Créer session OU Rejoindre session existante
   ↓
3. Salle d'attente (SessionLobby.jsx)
   → Host démarre quand tous prêts
   ↓
4. Jeu Principal (App.jsx - phase: 'playing')
   → Chat avec MJ
   → Exploration
   → Challenges (jets dés)
   → Combat (CombatManager)
   ↓
5. Combat Tactique
   → Initiative
   → Tour par tour (Joueurs → Ennemis)
   → Actions : Déplacement + Attaque/Capacité
   → Victoire → Récompenses
```

## 🤖 Système IA Game Master

### Autorité Absolue
Le MJ contrôle **100%** de la réalité du jeu :
- **Le joueur déclare des INTENTIONS**, jamais des résultats
- **Le MJ demande des jets de dés** AVANT de narrer
- **Aucune complaisance** : pas de narration avant jets
- **Cohérence environnementale** : joueur ne peut référencer que ce que MJ a décrit
- **Refus roleplay** : rester immersif, ne jamais briser le 4ème mur

### Calibrage DC (Difficulty Class)
| DC | Difficulté | Exemple |
|----|-----------|---------|
| 20-30 | FACILE | Parler PNJ amical, acheter boutique |
| 35-45 | NORMAL | Convaincre marchand méfiant |
| 50-60 | DIFFICILE | Convaincre garde hostile |
| 65-75 | TRÈS DIFFICILE | Désarmer piège mortel |
| 80-90 | EXTRÊME | Enfoncer porte magique |
| 95-100 | HÉROÏQUE | Défier les dieux |

## 🔧 Technologies

- **Frontend** : React 18 + Vite
- **3D** : Three.js (@react-three/fiber, @react-three/drei)
- **Backend** : Supabase (PostgreSQL + Realtime + Edge Functions)
- **IA** : Claude 3.5 Sonnet (Anthropic API)
- **Styling** : CSS custom (dark fantasy theme)
- **Déploiement** : Vercel (frontend) + Supabase (backend)

## 🐛 Bugs Connus Résolus

1. **Combat Deadlock** (résolu) : Animation bloquait sync → ajout delay 50ms (ligne 777)
2. **Challenge non affiché** (résolu) : Format JSON manquait champ `challenge` → ajouté (ligne 448-463)
3. **MJ trop complaisant** (résolu) : STOP critique en header prompt (ligne 575-608)
4. **DC trop élevés** (résolu) : Calibrage échelle 20-100 (ligne 261-280)

## 📝 Conventions de Code

- **Composants** : PascalCase (CharacterCreation.jsx)
- **Fonctions** : camelCase (handleCombatAction)
- **Constantes** : UPPER_SNAKE_CASE (RESPONSE_FORMAT)
- **CSS classes** : kebab-case (dice-roll-container)
- **Logs** : Préfixer `[ComponentName]` pour debugging

## 🚀 Commandes Importantes

```bash
# Développement local
npm run dev

# Build production
npm run build

# Deploy Edge Function
npx supabase functions deploy game-master

# Push Vercel
git push origin main  # Auto-deploy
```

## 📚 Fichiers Documentation

- `docs/AUTORITE_MJ_ABSOLUE.md` : Règles complètes MJ (autorité, cohérence, refus)
- `docs/ARCHITECTURE.md` : Ce fichier (vue d'ensemble technique)
- `README.md` : Instructions setup projet

## 🔗 Liens Utiles

- Dashboard Supabase : https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu
- Vercel Dashboard : (check git remote)
- Anthropic API : https://console.anthropic.com/
