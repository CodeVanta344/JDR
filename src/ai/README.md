# 🎲 GMEngine - Système de Maître du Jeu Hybride

## Vue d'ensemble

Le **GMEngine** est un système hybride qui combine :
- **80% de gestion par règles** (gratuit, instantané, cohérent)
- **20% d'appels LLM** (pour situations complexes uniquement)

### Objectifs
✅ Réduire les coûts d'API LLM de 80%
✅ Améliorer la latence (< 100ms au lieu de 2-5s)
✅ Garantir la cohérence avec le lore
✅ Permettre un gameplay fluide même sans LLM

---

## Architecture

```
GMEngine
├── IntentDetector       # Analyse l'action du joueur
├── MemoryManager        # Mémorise les événements
├── Narrative Generator  # Enrichit les réponses
└── Handlers
    ├── DialogueHandler    # Conversations avec PNJ
    ├── ExplorationHandler # Déplacements et découvertes
    ├── MerchantHandler    # Achats/ventes
    ├── QuestHandler       # Gestion des quêtes
    ├── CraftingHandler    # Artisanat
    └── CombatHandler      # Délégation au CombatManager
```

---

## Utilisation

### Installation

```javascript
import { getGMEngine } from './ai/GMEngine';

const gmEngine = getGMEngine({
  useLLMFallback: true,           // Activer le fallback LLM
  llmConfidenceThreshold: 0.6,    // Seuil de confiance (0-1)
  enableMemory: true,              // Activer la mémoire
  enableConsequences: true         // Activer les conséquences
});
```

### Traiter une action joueur

```javascript
const response = await gmEngine.handlePlayerAction(
  "Je parle au marchand",
  {
    player: { name: 'Aragorn', hp: 80, gold: 150 },
    location: { name: 'Sol-Aureus', type: 'city' },
    nearbyNPCs: [
      { id: 'npc_1', name: 'Jorik le Marchand', archetype: 'merchant' }
    ],
    time: 'Jour',
    weather: 'Clair'
  }
);

console.log(response.text);
// "Bienvenue, Aragorn ! Que puis-je faire pour vous aujourd'hui ?"
```

---

## Handlers

### 1. DialogueHandler

Gère les conversations avec les PNJ.

**Archétypes supportés :**
- `merchant` : Marchand
- `guard` : Garde
- `innkeeper` : Aubergiste
- `questgiver` : Donneur de quête
- `commoner` : Citoyen lambda

**Exemple :**
```javascript
// Le joueur dit "Bonjour" au marchand
-> "Bienvenue ! Jetez un œil à ma marchandise."

// Le joueur demande des nouvelles
-> "Vous avez entendu ? On raconte que des ombres rôdent près des ruines..."
```

### 2. ExplorationHandler

Gère l'exploration et les déplacements.

**Actions supportées :**
- Regarder autour (`regarde`, `examine`)
- Se déplacer (`va nord`, `marche vers l'est`)
- Fouiller (`fouille`, `cherche`)
- Entrer (`entre`, `ouvre la porte`)

**Exemple :**
```javascript
// Le joueur fouille la zone
-> "Tu fouilles minutieusement..."
-> "✨ Tu trouves : **Potion de soin** !"
```

### 3. MerchantHandler

Gère les transactions commerciales.

**Actions supportées :**
- Acheter (`achète épée`)
- Vendre (`vend armure`)
- Consulter (`que vends-tu ?`)

**Exemple :**
```javascript
// Le joueur achète une épée
-> "Excellent choix ! Ça vous fera 50 pièces d'or."
-> "💰 -50 po | 📦 +1 Épée"
```

### 4. QuestHandler

Gère le système de quêtes.

**Actions supportées :**
- Accepter (`accepte la quête`)
- Compléter (`termine la quête`)
- Lister (`journal de quêtes`)

### 5. CraftingHandler

Gère l'artisanat.

**Professions supportées :**
- Blacksmithing, Alchemy, Cooking, Carpentry, etc.

---

## IntentDetector

Analyse automatique des actions du joueur.

### Types d'intention détectés

| Intention    | Mots-clés                                    |
|--------------|----------------------------------------------|
| `combat`     | attaque, frappe, tue, défend, sort          |
| `dialogue`   | parle, dis, demande, salue                  |
| `merchant`   | achète, vend, prix, marchand                |
| `crafting`   | fabrique, forge, crée, répare               |
| `exploration`| explore, cherche, va, regarde               |
| `quest`      | quête, mission, accepte                     |
| `rest`       | repos, dort, auberge                        |
| `inventory`  | inventaire, équipe, utilise                 |

### Extraction d'entités

```javascript
const intent = intentDetector.analyze("J'attaque le gobelin avec mon épée");

// Résultat :
{
  type: 'combat',
  confidence: 0.9,
  entities: {
    targets: ['gobelin'],
    items: ['épée'],
    npcs: [],
    directions: [],
    numbers: []
  }
}
```

---

## MemoryManager

Système de mémoire contextuelle du MJ.

### Fonctionnalités

✅ Mémorise jusqu'à 100 événements importants
✅ Suit les relations avec les PNJ (-100 à +100)
✅ Enregistre les lieux visités
✅ Compte les ennemis tués
✅ Trace les quêtes complétées

### Utilisation

```javascript
// Ajouter un souvenir
memoryManager.addMemory({
  action: "J'achète une épée",
  intent: 'merchant',
  response: "Tu achètes une épée pour 50 po.",
  context: { location, player }
});

// Récupérer les souvenirs pertinents
const memories = memoryManager.getRelevantMemories(context, 5);

// Statistiques
const stats = memoryManager.getPlayerStats();
// {
//   totalActions: 42,
//   locationsVisited: 8,
//   questsCompleted: 3,
//   enemiesKilled: 15,
//   playtime: 125 (minutes)
// }
```

---

## Statistiques d'utilisation

```javascript
const stats = gmEngine.getStats();

console.log(stats);
// {
//   totalActions: 100,
//   ruleBasedActions: 82,
//   llmActions: 18,
//   ruleBasedPercentage: '82.0%',
//   llmPercentage: '18.0%',
//   averageResponseTime: '75ms',
//   estimatedCostSavings: 0.164 (dollars)
// }
```

---

## Configuration avancée

### Ajout de mots-clés personnalisés

```javascript
gmEngine.intentDetector.addKeywords('combat', ['dégaine', 'fonce', 'rush']);
```

### Ajout de templates de dialogue

```javascript
gmEngine.handlers.dialogue.dialogueTemplates.custom_npc = {
  greeting: ["Salutations, voyageur !"],
  farewell: ["Que les dieux vous protègent."]
};
```

---

## Fallback LLM

Quand le système passe-t-il au LLM ?

1. **Confiance insuffisante** (< 0.6)
2. **Action ambiguë** non reconnue
3. **Situation créative** nécessitant de l'improvisation
4. **Contexte complexe** (dialogues philosophiques, énigmes, etc.)

Le LLM reçoit un prompt optimisé avec :
- Résumé du contexte (< 200 tokens)
- Suggestion du moteur de règles
- Mémoires pertinentes récentes

---

## Performances

| Méthode           | Latence | Coût par action | Cohérence |
|-------------------|---------|-----------------|-----------|
| **GMEngine**      | < 100ms | $0.0004         | ⭐⭐⭐⭐⭐    |
| **LLM pur**       | 2-5s    | $0.002          | ⭐⭐⭐⭐      |
| **Amélioration**  | 20-50x  | 80% moins cher  | +20%      |

---

## Roadmap

### ✅ Phase 1 (Actuel)
- [x] Moteur de règles de base
- [x] Handlers principaux
- [x] Détection d'intention
- [x] Système de mémoire

### 🔄 Phase 2 (Prochaine)
- [ ] Arbres de dialogue avancés
- [ ] Génération procédurale d'événements
- [ ] IA des PNJ (personnalités dynamiques)
- [ ] Système de conséquences (karma)

### 🔮 Phase 3 (Future)
- [ ] Intégration Ollama (LLM local)
- [ ] Fine-tuning d'un modèle personnalisé
- [ ] Mode 100% offline

---

## Dépannage

### Le système passe trop souvent au LLM

➡️ Réduire `llmConfidenceThreshold` (ex: 0.5 au lieu de 0.6)
➡️ Ajouter plus de mots-clés personnalisés

### Les réponses sont trop répétitives

➡️ Ajouter plus de templates dans les handlers
➡️ Activer l'enrichissement narratif

### Le contexte n'est pas pris en compte

➡️ Vérifier que `enableMemory: true`
➡️ S'assurer que `context` contient les bonnes données

---

## Contributeurs

Développé par [CodeVanta] pour le projet Aethelgard JDR.

## Licence

MIT
