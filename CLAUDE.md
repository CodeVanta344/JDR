# Aethelgard JDR — RPG de table en navigateur avec IA

Application web JDR multijoueur temps réel avec Game Master IA (Claude), combat tactique D100, création de personnage par parcours de vie, et 4.7MB+ de lore.

## Stack

- **React 19** + **TypeScript 5.9** + **Vite 7.2**
- **Zustand 5.0** — state management (persist)
- **Supabase 2.95** — auth, DB, real-time listeners
- **Anthropic SDK** — IA Game Master (Claude)
- **Zod 4.3** — validation runtime
- **Vite PWA** — offline-first (15MB cache)
- **Vitest 4.0** + Testing Library
- **Déploiement** : Vercel

## Structure

```
src/
  App.jsx                          # Composant principal, routing features
  main.jsx                         # Entry point (ErrorBoundary + AuthGate)
  supabaseClient.js                # Init Supabase
  components/                      # Composants UI (~1.2MB)
    AuthGate.jsx                   # Auth + bypass dev
    CharacterCreation.jsx          # Wizard création personnage multi-étapes
    CharacterSheet.jsx             # Fiche personnage complète
    CombatManager.jsx              # Système combat grille temps réel
    DMPanel.tsx                    # Panneau Game Master
    CodexPanel.jsx                 # Navigateur lore/codex
    InventoryPanel.jsx             # Gestion inventaire
    MerchantModal.jsx              # Interactions marchands PNJ
    NPCDialogueModal.jsx           # Dialogues PNJ
    DiceChallengeModal.jsx         # Résolution jets de compétence
    HUD/                           # Header, narration, partage items
    LazyComponents.tsx             # Code-splitting
  engine/                          # Moteur de combat
    CombatEngine.ts                # Logique combat tour par tour
    EnemyAIController.ts           # Behaviour tree IA ennemie
    StatResolver.ts                # Calcul stats + jets
    SkillResolver.ts               # Résolution compétences
  hooks/                           # Custom hooks React
    useGameState.js                # État de jeu
    useCombat.ts                   # État combat
    useCombatSync.js               # Sync combat temps réel
    useGMEngine.js                 # Intégration IA GM
    useVoiceChat.js                # Chat vocal
    useReconnection.ts             # Reconnexion réseau
  store/
    gameStore.ts                   # Store Zustand central (profile, session, character, combat, quests...)
  lore/                            # Données monde (4.7MB+)
    bestiary*.ts                   # Créatures et ennemis
    classes.ts                     # Classes de personnage
    items-*.ts                     # Catalogues d'items
    dialogues-act[1-5].ts          # Arbres de dialogue par acte
    gm-book-act[1-5].ts            # Guide GM par acte
    dungeons-*.ts                  # Donjons et lieux
    character-creation/            # Données création personnage
      lifepath/                    # Parcours de vie en 4 étapes
        birth/                     # Origines, présages, statut social
        childhood/                 # Famille, éducation, traumatismes
        adolescence/               # Formation, exploits, rencontres
        young-adult/               # Professions, motivations, connexions
  ai/                              # Moteur IA Game Master
    AIDirector.js                  # Orchestration IA principale
    GMEngine.js                    # Moteur de règles GM
    AdvancedCombatAI.js            # IA combat avancée
    handlers/                      # Handlers par contexte (Combat, Dialogue, Exploration, Merchant, Quest)
    narrative/                     # Génération narrative
  managers/                        # Logique de jeu
    aiResponseProcessor.js         # Parse réponses Claude
    sessionManager.js              # Cycle de vie session
    inventoryManager.js            # Logique inventaire
    progressionManager.js          # XP et leveling
  types/
    index.ts                       # Types core (schémas Zod)
  utils/
    combat-d100.js                 # Système de dés D100
```

## Commandes

```bash
npm run dev              # Dev server (--host)
npm run build            # Build production (code splitting)
npm run deploy           # npx vercel --prod
npm run test             # Vitest watch
npm run test:run         # Tests single run
npm run typecheck        # tsc --noEmit
npm run lint             # ESLint
```

## Path aliases

```
@ → src/
@components → src/components/
@hooks → src/hooks/
@store → src/store/
@lore → src/lore/
@utils → src/utils/
@types → src/types/
```

## Code splitting (14 chunks)

`vendor-react`, `vendor-supabase`, `vendor-anthropic`, `cc-lifepath`, `cc-classes`, `cc-abilities`, `cc-equipment`, `cc-pedagogy`, `lore-bestiary`, `lore-classes`, `lore-items`, `lore-world`, `lore-narrative`, `lore-core`, `ai-engine`

## Env

```bash
# Requis
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx

# IA (DMPanel)
VITE_ANTHROPIC_API_KEY=sk-ant-...

# Dev bypass
VITE_DEV_BYPASS=true
VITE_DEV_EMAIL=...
VITE_DEV_PWD=...
```

## DB (Supabase)

- `players` — personnages (stats, inventaire, abilities, gold, xp)
- `sessions` — metadata sessions de jeu
- `messages` — historique chat/narration (roles: user, assistant, system, npc, narration)
- `ai_requests` — file d'attente requêtes GM (game-master, image-gen)

## Conventions

- Composants : PascalCase, lazy-loaded via LazyComponents.tsx
- CSS : fichiers par composant + index.css global + responsive.css
- Types : Zod schemas pour validation runtime + TypeScript strict
- IA : broker via table `ai_requests` Supabase → Claude API
- Combat : D100, tour par tour, grille avec points de mouvement
- Session : modèle Host-GM avec sync temps réel via Supabase listeners
- Lore : organisé par feature (classes, factions) + étapes (lifepath)
