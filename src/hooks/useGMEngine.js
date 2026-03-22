/**
 * useGMEngine - Hook React pour intégrer le GMEngine dans App.jsx
 *
 * Le GMEngine enrichit le flux existant (Supabase edge function) avec :
 * - Pré-traitement : détection d'intention, événements aléatoires, météo
 * - Post-traitement : karma, économie, personnalité PNJ, narration dynamique
 * - Simulation monde : routines PNJ, factions, progression temporelle
 * - IA directeur : difficulté adaptative, analyse comportement joueur
 */

import { useRef, useCallback, useEffect } from 'react';
import { getGMEngine } from '../ai/GMEngine';

// Config complète avec tous les systèmes activés
const GM_CONFIG = {
  useLLMFallback: false,          // On utilise déjà Supabase pour le LLM
  llmConfidenceThreshold: 0.6,
  enableMemory: true,
  enableConsequences: true,
  // v2.0
  enableEvents: true,
  enableKarma: true,
  enableNPCPersonality: true,
  // v3.0
  enableQuests: true,
  enableRelationships: true,
  enableEconomy: true,
  enableLocations: true,
  enableCombos: true,
  // v4.0
  enableAIDirector: true,
  enableWorldSimulation: true,
  enableDynamicStorytelling: true,
  enableAdvancedCombatAI: true,
  enableFactionWarfare: true,
  enableKnowledgeGraph: true,
  // v4.0 sub-configs
  worldSimulation: {
    enabled: true,
    simulationSpeed: 1.0,
    tickInterval: 10000,    // Every 10s (lighter for browser)
    enableAging: false,     // Too heavy for real-time
    enableWeather: true,
    enableEconomy: true,
    enableCityGrowth: false,
    maxNPCsSimulated: 50,   // Reduced for browser perf
  },
  aiDirector: {
    enabled: true,
    analysisInterval: 120000,   // Every 2 min
    difficultyWindow: 50,
    adaptationSpeed: 0.1,
    minDifficulty: 0.5,
    maxDifficulty: 2.0,
    targetWinRate: 0.65,
    enablePrediction: false,    // Too heavy
    enablePersonalization: true,
  },
  storytelling: {
    enabled: true,
    maxActiveStories: 3,
    maxRecurringCharacters: 10,
    twistProbability: 0.12,
    enableCoherence: true,
    minActsPerStory: 3,
    maxActsPerStory: 5,
  },
};

export function useGMEngine() {
  const engineRef = useRef(null);
  const initializedRef = useRef(false);

  // Lazy init - create engine once
  const getEngine = useCallback(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = getGMEngine(GM_CONFIG);
        console.log('[GMEngine] Initialized with all v2/v3/v4 systems');
      } catch (err) {
        console.error('[GMEngine] Init failed:', err);
        return null;
      }
    }
    return engineRef.current;
  }, []);

  // Cleanup world simulation on unmount
  useEffect(() => {
    return () => {
      if (engineRef.current?.worldSimulation) {
        try { engineRef.current.worldSimulation.stopSimulation?.(); } catch {}
      }
    };
  }, []);

  /**
   * PRE-PROCESS: Enrichit le contexte avant l'appel LLM
   * Retourne des événements/effets locaux qui ne nécessitent pas le LLM
   */
  const preProcess = useCallback((action, appState) => {
    const engine = getEngine();
    if (!engine) return { events: [], context: {} };

    const results = { events: [], context: {}, economyEffects: null, karmaEffects: null };

    try {
      // 1. Intent detection (pour enrichir le contexte LLM)
      const intent = engine.intentDetector.analyze(action, {
        player: appState.character,
        location: appState.currentLocation,
        inCombat: appState.combatMode,
      });
      results.context.intent = intent;

      // 2. Random events (weather, encounters, NPCs)
      if (engine.config.enableEvents && engine.eventGenerator) {
        try {
          const eventCtx = {
            location: appState.currentLocation || { type: 'plains' },
            time: appState.gameTime || 'Jour',
            weather: appState.weather || 'Clair',
            player: appState.character,
          };
          const event = engine.eventGenerator.generateEvent?.(eventCtx);
          if (event && event.type !== 'none') {
            results.events.push(event);
          }
        } catch {}
      }

      // 3. AI Director - analyze player behavior
      if (engine.aiDirector && appState.character) {
        try {
          engine.aiDirector.recordAction?.({
            playerId: appState.character.id,
            type: intent.type,
            action,
            timestamp: Date.now(),
          });
          const analysis = engine.aiDirector.analyzePlayerBehavior?.(appState.character.id);
          if (analysis) {
            results.context.difficultyModifier = analysis.difficulty || 1.0;
            results.context.playerProfile = analysis.profile;
          }
        } catch {}
      }

      // 4. Dynamic storytelling - check for story progression
      if (engine.dynamicStorytelling) {
        try {
          const storyCtx = {
            action,
            player: appState.character,
            location: appState.currentLocation,
            activeQuests: appState.activeQuests,
          };
          const storyUpdate = engine.dynamicStorytelling.processAction?.(storyCtx);
          if (storyUpdate && storyUpdate.narrative) {
            results.context.storyHint = storyUpdate.narrative;
          }
        } catch {}
      }

      // 5. Knowledge graph enrichment
      if (engine.knowledgeGraph) {
        try {
          const entities = engine.knowledgeGraph.queryRelated?.(action);
          if (entities && entities.length > 0) {
            results.context.relatedEntities = entities.slice(0, 5);
          }
        } catch {}
      }

    } catch (err) {
      console.warn('[GMEngine] preProcess error:', err);
    }

    return results;
  }, [getEngine]);

  /**
   * POST-PROCESS: Applique les effets des systèmes locaux après la réponse LLM
   */
  const postProcess = useCallback((action, aiResponse, appState) => {
    const engine = getEngine();
    if (!engine || !aiResponse) return { sideEffects: [], narrativeAddons: [] };

    const results = { sideEffects: [], narrativeAddons: [], npcPersonality: null };

    try {
      // 1. Karma / Reputation tracking
      if (engine.config.enableKarma && engine.karmaManager) {
        try {
          const karmaResult = engine.karmaManager.processAction?.({
            action,
            intent: aiResponse.intent || 'unknown',
            target: aiResponse.npc?.name,
            outcome: aiResponse.challenge ? 'challenge' : 'narrative',
            context: {
              location: appState.currentLocation,
              player: appState.character,
            },
          });
          if (karmaResult && karmaResult.reputationChanges) {
            results.sideEffects.push({
              type: 'karma',
              changes: karmaResult.reputationChanges,
              worldStateChanges: karmaResult.worldStateChanges,
            });
          }
        } catch {}
      }

      // 2. NPC Personality enrichment
      if (engine.config.enableNPCPersonality && engine.npcPersonalitySystem && aiResponse.npc) {
        try {
          const npcName = aiResponse.npc.name;
          const personality = engine.npcPersonalitySystem.getPersonality?.(npcName) ||
            engine.npcPersonalitySystem.generatePersonality?.(npcName, aiResponse.npc.type || 'merchant');
          if (personality) {
            results.npcPersonality = personality;
            // Record this interaction
            engine.npcPersonalitySystem.recordInteraction?.({
              npcName,
              playerAction: action,
              mood: personality.currentMood,
            });
          }
        } catch {}
      }

      // 3. NPC Relationships
      if (engine.config.enableRelationships && engine.npcRelationshipGraph && aiResponse.npc) {
        try {
          const playerName = appState.character?.name || 'Joueur';
          engine.npcRelationshipGraph.recordInteraction?.(
            playerName, aiResponse.npc.name, 'social', action
          );
        } catch {}
      }

      // 4. Economy tracking
      if (engine.config.enableEconomy && engine.economyManager) {
        try {
          if (aiResponse.merchant || aiResponse.loot) {
            engine.economyManager.recordTransaction?.({
              type: aiResponse.merchant ? 'trade' : 'loot',
              items: aiResponse.loot?.items || [],
              gold: aiResponse.gold || 0,
              location: appState.currentLocation?.name,
            });
          }
          // Get current price modifiers for next merchant interaction
          const priceModifiers = engine.economyManager.getPriceModifiers?.();
          if (priceModifiers) {
            results.sideEffects.push({ type: 'economy', priceModifiers });
          }
        } catch {}
      }

      // 5. Quest generation opportunities
      if (engine.config.enableQuests && engine.questGenerator && !appState.combatMode) {
        try {
          const questCtx = {
            player: appState.character,
            location: appState.currentLocation,
            activeQuests: appState.activeQuests || [],
            factionReputation: engine.karmaManager?.getReputations?.() || {},
          };
          const questOpportunity = engine.questGenerator.checkQuestOpportunity?.(questCtx);
          if (questOpportunity) {
            results.sideEffects.push({ type: 'questAvailable', quest: questOpportunity });
          }
        } catch {}
      }

      // 6. Memory - save important events
      if (engine.config.enableMemory && engine.memoryManager) {
        try {
          engine.memoryManager.addMemory?.({
            action,
            response: aiResponse.narrative || '',
            intent: aiResponse.intent,
            timestamp: Date.now(),
            location: appState.currentLocation?.name,
            context: {
              hp: appState.character?.hp,
              gold: appState.character?.gold,
              level: appState.character?.level,
            },
          });
        } catch {}
      }

      // 7. Faction warfare update
      if (engine.factionWarfare) {
        try {
          const warUpdate = engine.factionWarfare.getLatestUpdate?.();
          if (warUpdate && warUpdate.significant) {
            results.narrativeAddons.push(warUpdate.narrative);
          }
        } catch {}
      }

    } catch (err) {
      console.warn('[GMEngine] postProcess error:', err);
    }

    return results;
  }, [getEngine]);

  /**
   * GET WORLD STATE: Récupère l'état du monde simulé
   */
  const getWorldState = useCallback(() => {
    const engine = getEngine();
    if (!engine?.worldSimulation) return null;
    try {
      return engine.worldSimulation.getWorldState?.();
    } catch {
      return null;
    }
  }, [getEngine]);

  /**
   * GET ECONOMY: Récupère l'état économique pour les marchands
   */
  const getEconomyState = useCallback(() => {
    const engine = getEngine();
    if (!engine?.economyManager) return null;
    try {
      return engine.economyManager.getMarketState?.();
    } catch {
      return null;
    }
  }, [getEngine]);

  /**
   * GET NPC PERSONALITY: Récupère la personnalité d'un PNJ
   */
  const getNPCPersonality = useCallback((npcName) => {
    const engine = getEngine();
    if (!engine?.npcPersonalitySystem) return null;
    try {
      return engine.npcPersonalitySystem.getPersonality?.(npcName);
    } catch {
      return null;
    }
  }, [getEngine]);

  /**
   * GET DIFFICULTY: Récupère le modificateur de difficulté actuel
   */
  const getDifficulty = useCallback((playerId) => {
    const engine = getEngine();
    if (!engine?.aiDirector) return 1.0;
    try {
      const analysis = engine.aiDirector.analyzePlayerBehavior?.(playerId);
      return analysis?.difficulty || 1.0;
    } catch {
      return 1.0;
    }
  }, [getEngine]);

  /**
   * GET KARMA: Récupère les réputations de faction
   */
  const getKarma = useCallback(() => {
    const engine = getEngine();
    if (!engine?.karmaManager) return {};
    try {
      return engine.karmaManager.getReputations?.() || {};
    } catch {
      return {};
    }
  }, [getEngine]);

  /**
   * GET STATS: Statistiques du GMEngine
   */
  const getStats = useCallback(() => {
    const engine = getEngine();
    if (!engine) return null;
    return engine.stats;
  }, [getEngine]);

  /**
   * SERIALIZE: Exporte l'état pour sauvegarde
   */
  const serialize = useCallback(() => {
    const engine = getEngine();
    if (!engine) return null;
    try {
      return {
        memory: engine.memoryManager?.serialize?.(),
        karma: engine.karmaManager?.serialize?.(),
        economy: engine.economyManager?.serialize?.(),
        npcPersonalities: engine.npcPersonalitySystem?.serialize?.(),
        relationships: engine.npcRelationshipGraph?.serialize?.(),
        worldState: engine.worldSimulation?.serialize?.(),
        stories: engine.dynamicStorytelling?.serialize?.(),
        factions: engine.factionWarfare?.serialize?.(),
      };
    } catch {
      return null;
    }
  }, [getEngine]);

  /**
   * DESERIALIZE: Restaure l'état depuis sauvegarde
   */
  const deserialize = useCallback((data) => {
    const engine = getEngine();
    if (!engine || !data) return;
    try {
      if (data.memory) engine.memoryManager?.deserialize?.(data.memory);
      if (data.karma) engine.karmaManager?.deserialize?.(data.karma);
      if (data.economy) engine.economyManager?.deserialize?.(data.economy);
      if (data.npcPersonalities) engine.npcPersonalitySystem?.deserialize?.(data.npcPersonalities);
      if (data.relationships) engine.npcRelationshipGraph?.deserialize?.(data.relationships);
      if (data.worldState) engine.worldSimulation?.deserialize?.(data.worldState);
      if (data.stories) engine.dynamicStorytelling?.deserialize?.(data.stories);
      if (data.factions) engine.factionWarfare?.deserialize?.(data.factions);
    } catch (err) {
      console.warn('[GMEngine] deserialize error:', err);
    }
  }, [getEngine]);

  return {
    preProcess,
    postProcess,
    getWorldState,
    getEconomyState,
    getNPCPersonality,
    getDifficulty,
    getKarma,
    getStats,
    serialize,
    deserialize,
  };
}
