// ═══════════════════════════════════════════════════════════════════════
// 📘 EXEMPLES D'UTILISATION DU GMENGINE
// ═══════════════════════════════════════════════════════════════════════

import { initializeGMEngine, handlePlayerActionWithGM, buildGMContext } from './integration';

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLE 1 : Initialisation basique
// ═══════════════════════════════════════════════════════════════════════

const gmEngine = initializeGMEngine({
  useLLMFallback: true,
  llmConfidenceThreshold: 0.6,
  enableMemory: true
});

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLE 2 : Traiter une action simple
// ═══════════════════════════════════════════════════════════════════════

const appState = {
  character: {
    name: 'Gandalf',
    hp: 80,
    maxHp: 100,
    gold: 150,
    level: 3
  },
  currentLocation: {
    id: 'sol-aureus',
    name: 'Sol-Aureus',
    type: 'city'
  },
  nearbyNPCs: [
    { id: 'npc_1', name: 'Jorik', archetype: 'merchant' }
  ],
  time: 'Jour',
  weather: 'Clair',
  inCombat: false
};

// Action : Parler au marchand
const response1 = await handlePlayerActionWithGM("Je parle au marchand", appState, gmEngine);
console.log(response1.text);
// -> "Bienvenue, Gandalf ! Que puis-je faire pour vous aujourd'hui ?"
// -> Confidence: 0.85 (rule-based)

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLE 3 : Explorer et fouiller
// ═══════════════════════════════════════════════════════════════════════

const response2 = await handlePlayerActionWithGM("Je fouille la zone", appState, gmEngine);
console.log(response2.text);
// -> "Tu fouilles minutieusement..."
// -> "✨ Tu trouves : **potion** !"

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLE 4 : Acheter un objet
// ═══════════════════════════════════════════════════════════════════════

const response3 = await handlePlayerActionWithGM("J'achète une épée", appState, gmEngine);
console.log(response3.text);
// -> "Jorik : 'Excellent choix ! Ça vous fera 50 po.'"
// -> Effects: { gold: -50, item: 'épée' }

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLE 5 : Combat
// ═══════════════════════════════════════════════════════════════════════

const combatState = {
  ...appState,
  inCombat: true,
  nearbyEnemies: [
    { id: 'e1', name: 'Gobelin', hp: 30 }
  ]
};

const response4 = await handlePlayerActionWithGM("J'attaque le gobelin", combatState, gmEngine);
console.log(response4.text);
// -> "⚔️ Combat en cours ! Utilise les boutons d'action..."
// -> Délégation au CombatManager

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLE 6 : Action complexe (fallback LLM)
// ═══════════════════════════════════════════════════════════════════════

const response5 = await handlePlayerActionWithGM(
  "Je tente de convaincre le marchand de me donner une réduction en lui racontant une histoire émouvante sur mon village détruit par un dragon",
  appState,
  gmEngine
);
console.log(response5.text);
// -> Réponse générée par le LLM (trop complexe pour les règles)
// -> usedLLM: true

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLE 7 : Statistiques d'utilisation
// ═══════════════════════════════════════════════════════════════════════

const stats = gmEngine.getStats();
console.log(stats);
// {
//   totalActions: 5,
//   ruleBasedActions: 4,
//   llmActions: 1,
//   ruleBasedPercentage: '80.0%',
//   llmPercentage: '20.0%',
//   averageResponseTime: '85ms',
//   estimatedCostSavings: 0.008
// }

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLE 8 : Mémoire contextuelle
// ═══════════════════════════════════════════════════════════════════════

const playerStats = gmEngine.memoryManager.getPlayerStats();
console.log(playerStats);
// {
//   totalActions: 5,
//   locationsVisited: 1,
//   questsCompleted: 0,
//   enemiesKilled: 0,
//   playtime: 12 (minutes)
// }

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLE 9 : Relations avec PNJ
// ═══════════════════════════════════════════════════════════════════════

const relationship = gmEngine.memoryManager.getRelationship('npc_1');
console.log(relationship); // 5 (Neutre -> Amical après plusieurs interactions)

const relationshipLevel = gmEngine.memoryManager.getRelationshipLevel('npc_1');
console.log(relationshipLevel); // "Amical"

// ═══════════════════════════════════════════════════════════════════════
// EXEMPLE 10 : Sauvegarde et restauration de la mémoire
// ═══════════════════════════════════════════════════════════════════════

// Sauvegarder
const serialized = gmEngine.memoryManager.serialize();
localStorage.setItem('gm_memory', serialized);

// Restaurer
const saved = localStorage.getItem('gm_memory');
if (saved) {
  gmEngine.memoryManager.deserialize(saved);
}
