// ═══════════════════════════════════════════════════════════════════════
// 🔌 GM ENGINE INTEGRATION - Intégration avec App.jsx
// ═══════════════════════════════════════════════════════════════════════
// Ce fichier facilite l'intégration du GMEngine dans l'app existante

import { getGMEngine } from './GMEngine';

/**
 * Initialise le GMEngine avec la config par défaut
 */
export function initializeGMEngine(config = {}) {
  const defaultConfig = {
    useLLMFallback: true,           // Utiliser le LLM pour les cas complexes
    llmConfidenceThreshold: 0.6,    // Seuil minimum de confiance
    enableMemory: true,              // Activer la mémoire contextuelle
    enableConsequences: true         // Activer le système de conséquences
  };

  return getGMEngine({ ...defaultConfig, ...config });
}

/**
 * Convertit le contexte de l'app en contexte GMEngine
 */
export function buildGMContext(appState) {
  return {
    // Joueur
    player: appState.character ? {
      name: appState.character.name,
      hp: appState.character.hp,
      maxHp: appState.character.maxHp,
      gold: appState.character.gold || 0,
      level: appState.character.level || 1,
      professions: appState.character.professions || [],
      inventory: appState.character.inventory || []
    } : null,

    // Localisation
    location: appState.currentLocation ? {
      id: appState.currentLocation.id,
      name: appState.currentLocation.name,
      type: appState.currentLocation.type || 'plains'
    } : null,

    // PNJ proches
    nearbyNPCs: appState.nearbyNPCs || [],

    // Ennemis proches
    nearbyEnemies: appState.nearbyEnemies || [],

    // Bâtiments proches
    nearbyBuildings: appState.nearbyBuildings || [],

    // Sorties disponibles
    exits: appState.availableExits || [],

    // État du combat
    inCombat: appState.inCombat || false,

    // Quêtes
    activeQuests: appState.activeQuests || [],
    availableQuests: appState.availableQuests || [],

    // Météo et temps
    time: appState.timeOfDay || 'Jour',
    weather: appState.weather || 'Clair',

    // Session
    sessionId: appState.sessionId
  };
}

/**
 * Traite une action joueur via le GMEngine
 */
export async function handlePlayerActionWithGM(action, appState, gmEngine) {
  // Construire le contexte
  const context = buildGMContext(appState);

  // Traiter l'action
  const response = await gmEngine.handlePlayerAction(action, context);

  // Retourner le résultat dans un format compatible avec l'app
  return {
    text: response.text,
    type: response.type || 'narrative',
    effects: response.effects || {},
    confidence: response.confidence || 0,
    usedLLM: response.type === 'llm'
  };
}

/**
 * Applique les effets d'une réponse GM sur l'état de l'app
 */
export function applyGMEffects(effects, appState, setAppState) {
  if (!effects || Object.keys(effects).length === 0) {
    return;
  }

  const newState = { ...appState };

  // Or
  if (effects.gold && newState.character) {
    newState.character.gold = (newState.character.gold || 0) + effects.gold;
  }

  // XP
  if (effects.xp && newState.character) {
    newState.character.xp = (newState.character.xp || 0) + effects.xp;
  }

  // Items
  if (effects.item && newState.character) {
    if (!newState.character.inventory) {
      newState.character.inventory = [];
    }
    if (effects.item.startsWith('-')) {
      // Retirer un item
      const itemName = effects.item.substring(1);
      const index = newState.character.inventory.findIndex(i => i === itemName);
      if (index !== -1) {
        newState.character.inventory.splice(index, 1);
      }
    } else {
      // Ajouter un item
      newState.character.inventory.push(effects.item);
    }
  }

  // Quêtes
  if (effects.questAccepted) {
    if (!newState.activeQuests) {
      newState.activeQuests = [];
    }
    const quest = newState.availableQuests?.find(q => q.id === effects.questAccepted);
    if (quest) {
      newState.activeQuests.push(quest);
    }
  }

  if (effects.questCompleted) {
    if (newState.activeQuests) {
      newState.activeQuests = newState.activeQuests.filter(q => q.id !== effects.questCompleted);
    }
  }

  // Appliquer les changements
  setAppState(newState);
}

/**
 * Récupère les statistiques du GMEngine
 */
export function getGMStats(gmEngine) {
  return gmEngine.getStats();
}

/**
 * Exporte la mémoire du GMEngine (pour sauvegarde)
 */
export function exportGMMemory(gmEngine) {
  return gmEngine.memoryManager.serialize();
}

/**
 * Importe la mémoire du GMEngine (depuis sauvegarde)
 */
export function importGMMemory(gmEngine, serializedMemory) {
  gmEngine.memoryManager.deserialize(serializedMemory);
}

export default {
  initializeGMEngine,
  buildGMContext,
  handlePlayerActionWithGM,
  applyGMEffects,
  getGMStats,
  exportGMMemory,
  importGMMemory
};
