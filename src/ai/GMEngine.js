// ═══════════════════════════════════════════════════════════════════════
// 🎲 GAME MASTER ENGINE - Système de MJ hybride (Règles + LLM)
// ═══════════════════════════════════════════════════════════════════════
// Ce moteur gère 80% des interactions sans LLM pour réduire les coûts
// et améliorer la latence. Le LLM n'est appelé que pour les situations
// complexes ou créatives.

import { LORE_DATABASE } from './narrative/loreDatabase.js';
import { IntentDetector } from './IntentDetector.js';
import { CombatHandler } from './handlers/CombatHandler.js';
import { DialogueHandler } from './handlers/DialogueHandler.js';
import { ExplorationHandler } from './handlers/ExplorationHandler.js';
import { MerchantHandler } from './handlers/MerchantHandler.js';
import { QuestHandler } from './handlers/QuestHandler.js';
import { CraftingHandler } from './handlers/CraftingHandler.js';
import { MemoryManager } from './MemoryManager.js';
import { NarrativeGenerator } from './narrative/NarrativeGenerator.js';

// ===== NOUVEAUX SYSTÈMES AVANCÉS v2.0 =====
import EventGenerator from './EventGenerator.js';
import KarmaManager from './KarmaManager.js';
import NPCPersonalitySystem from './NPCPersonalitySystem.js';
import DialogueExpansion from './DialogueExpansion.js';

// ===== SYSTÈMES ULTRA-AVANCÉS v3.0 =====
import QuestGenerator from './QuestGenerator.js';
import NPCRelationshipGraph from './NPCRelationshipGraph.js';
import EconomyManager from './EconomyManager.js';
import LocationGenerator from './LocationGenerator.js';
import ActionComboSystem from './ActionComboSystem.js';

// ===== SYSTÈMES LÉGENDAIRES v4.0 =====
import AIDirector from './AIDirector.js';
import WorldSimulation from './WorldSimulation.js';
import DynamicStorytelling from './DynamicStorytelling.js';
import AdvancedCombatAI from './AdvancedCombatAI.js';
import FactionWarfare from './FactionWarfare.js';
import KnowledgeGraph from './KnowledgeGraph.js';

// ═══════════════════════════════════════════════════════════════════════
// 🎯 GAME MASTER ENGINE - Classe principale
// ═══════════════════════════════════════════════════════════════════════

export class GMEngine {
  constructor(config = {}) {
    this.config = {
      useLLMFallback: true,
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
      
      // v4.0 LEGENDARY SYSTEMS
      enableAIDirector: true,
      enableWorldSimulation: true,
      enableDynamicStorytelling: true,
      enableAdvancedCombatAI: true,
      enableFactionWarfare: true,
      enableKnowledgeGraph: true,
      
      ...config
    };

    // Initialiser les composants
    this.intentDetector = new IntentDetector();
    this.memoryManager = new MemoryManager();
    this.narrativeGenerator = new NarrativeGenerator();

    // ===== SYSTÈMES AVANCÉS v2.0 =====
    this.eventGenerator = new EventGenerator();
    this.karmaManager = new KarmaManager();
    this.npcPersonalitySystem = new NPCPersonalitySystem();
    this.dialogueExpansion = new DialogueExpansion();
    
    // ===== SYSTÈMES ULTRA-AVANCÉS v3.0 =====
    this.questGenerator = new QuestGenerator();
    this.npcRelationshipGraph = new NPCRelationshipGraph();
    this.economyManager = new EconomyManager();
    this.locationGenerator = new LocationGenerator();
    this.actionComboSystem = new ActionComboSystem();
    
    // ===== SYSTÈMES LÉGENDAIRES v4.0 =====
    this.aiDirector = this.config.enableAIDirector ? new AIDirector(config.aiDirector) : null;
    this.worldSimulation = this.config.enableWorldSimulation ? new WorldSimulation(config.worldSimulation) : null;
    this.dynamicStorytelling = this.config.enableDynamicStorytelling ? new DynamicStorytelling(config.storytelling) : null;
    this.advancedCombatAI = this.config.enableAdvancedCombatAI ? new AdvancedCombatAI(config.combatAI) : null;
    this.factionWarfare = this.config.enableFactionWarfare ? new FactionWarfare(config.factionWarfare) : null;
    this.knowledgeGraph = this.config.enableKnowledgeGraph ? new KnowledgeGraph(config.knowledgeGraph) : null;
    
    // Démarrer les simulations automatiques
    if (this.worldSimulation) {
      this.worldSimulation.startSimulation();
    }
    if (this.factionWarfare) {
      this.factionWarfare.startWarSimulation();
    }

    // Handlers spécialisés
    this.handlers = {
      combat: new CombatHandler(this),
      dialogue: new DialogueHandler(this),
      exploration: new ExplorationHandler(this),
      merchant: new MerchantHandler(this),
      quest: new QuestHandler(this),
      crafting: new CraftingHandler(this)
    };

    // Statistiques d'utilisation
    this.stats = {
      totalActions: 0,
      ruleBasedActions: 0,
      llmActions: 0,
      averageResponseTime: 0
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🎯 MÉTHODE PRINCIPALE - Traiter une action joueur
  // ═══════════════════════════════════════════════════════════════════════

  async handlePlayerAction(action, context) {
    const startTime = Date.now();
    this.stats.totalActions++;

    try {
      // 1. Détecter l'intention de l'action
      const intent = this.intentDetector.analyze(action, context);

      console.log('[GMEngine] Intent detected:', {
        type: intent.type,
        confidence: intent.confidence,
        entities: intent.entities
      });

      // 2. Enrichir le contexte avec la mémoire
      if (this.config.enableMemory) {
        context.memory = this.memoryManager.getRelevantMemories(context);
      }

      // 3. Tenter de gérer avec les règles
      const ruleBasedResponse = await this.tryRuleBasedResponse(intent, context);

      if (ruleBasedResponse.success && ruleBasedResponse.confidence >= this.config.llmConfidenceThreshold) {
        // ✅ Réponse avec règles suffisante
        this.stats.ruleBasedActions++;
        const response = this.formatResponse(ruleBasedResponse, context);
        
        // Sauvegarder en mémoire
        if (this.config.enableMemory) {
          this.memoryManager.addMemory({
            action: action,
            intent: intent.type,
            response: response.text,
            timestamp: Date.now(),
            context: context
          });
        }

        this.updateStats(startTime);
        return response;
      }

      // 4. Fallback vers LLM si nécessaire
      if (this.config.useLLMFallback) {
        console.log('[GMEngine] Falling back to LLM (confidence too low or complex situation)');
        this.stats.llmActions++;
        
        const llmResponse = await this.callLLMWithContext(action, context, ruleBasedResponse);
        this.updateStats(startTime);
        return llmResponse;
      }

      // 5. Si pas de LLM disponible, réponse par défaut
      return this.getDefaultResponse(intent, context);

    } catch (error) {
      console.error('[GMEngine] Error processing action:', error);
      return {
        text: "Le Maître du Jeu semble distrait un instant... (Erreur technique, réessaye)",
        type: 'error',
        debug: error.message
      };
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🛠️ GESTION PAR RÈGLES (80% des cas)
  // ═══════════════════════════════════════════════════════════════════════

  async tryRuleBasedResponse(intent, context) {
    const handler = this.handlers[intent.type];

    if (!handler) {
      return {
        success: false,
        confidence: 0,
        reason: 'No handler available for intent type'
      };
    }

    try {
      const response = await handler.handle(intent, context);
      return {
        success: true,
        confidence: response.confidence || 0.8,
        text: response.text,
        effects: response.effects || {},
        meta: response.meta || {}
      };
    } catch (error) {
      console.error(`[GMEngine] Handler error (${intent.type}):`, error);
      return {
        success: false,
        confidence: 0,
        reason: error.message
      };
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🤖 FALLBACK LLM (20% des cas complexes)
  // ═══════════════════════════════════════════════════════════════════════

  async callLLMWithContext(action, context, ruleBasedHint) {
    // Construire un prompt optimisé avec contexte minimal
    const prompt = this.buildLLMPrompt(action, context, ruleBasedHint);

    try {
      // Appel au LLM externe (Supabase Edge Function)
      const response = await fetch('/api/game-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: action,
          context: this.summarizeContext(context),
          hint: ruleBasedHint?.text || null,
          sessionId: context.sessionId
        })
      });

      const data = await response.json();
      return {
        text: data.response,
        type: 'llm',
        confidence: 1.0,
        effects: data.effects || {}
      };
    } catch (error) {
      console.error('[GMEngine] LLM call failed:', error);
      return this.getDefaultResponse({ type: 'unknown' }, context);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 📝 HELPERS - Formatage et utilitaires
  // ═══════════════════════════════════════════════════════════════════════

  buildLLMPrompt(action, context, hint) {
    return {
      system: "Tu es un Maître du Jeu pour Aethelgard. Réponds de manière concise et immersive.",
      user: action,
      context: this.summarizeContext(context),
      hint: hint?.text || "Aucune suggestion du moteur de règles."
    };
  }

  summarizeContext(context) {
    // Réduire le contexte pour minimiser les tokens LLM
    return {
      location: context.location?.name || 'Inconnu',
      time: context.time || 'Jour',
      weather: context.weather || 'Clair',
      nearbyNPCs: context.nearbyNPCs?.map(npc => npc.name).slice(0, 3) || [],
      playerHP: context.player?.hp || 100,
      playerGold: context.player?.gold || 0,
      activeQuests: context.activeQuests?.map(q => q.title).slice(0, 2) || [],
      recentEvents: this.memoryManager.getRecentEvents(5)
    };
  }

  formatResponse(response, context) {
    // Enrichir la réponse avec des détails contextuels
    let text = response.text;

    // Ajouter des effets visuels si nécessaire
    if (response.effects?.gold) {
      text += `\n\n💰 Or: ${response.effects.gold > 0 ? '+' : ''}${response.effects.gold} po`;
    }
    if (response.effects?.xp) {
      text += `\n✨ Expérience: +${response.effects.xp} XP`;
    }
    if (response.effects?.items) {
      text += `\n📦 Objets obtenus: ${response.effects.items.join(', ')}`;
    }

    return {
      text: text,
      type: response.meta?.responseType || 'narrative',
      effects: response.effects || {},
      confidence: response.confidence || 0.8
    };
  }

  getDefaultResponse(intent, context) {
    // Réponses par défaut quand rien d'autre ne fonctionne
    const defaults = {
      combat: "Le combat continue. Que fais-tu ?",
      dialogue: "Le personnage semble attendre que tu parles.",
      exploration: "Tu regardes autour de toi, cherchant quelque chose d'intéressant.",
      merchant: "Le marchand te regarde, prêt à négocier.",
      quest: "Ton journal de quêtes reste ouvert, attendant ta prochaine décision.",
      crafting: "Tu examines tes outils de fabrication.",
      unknown: "L'action n'est pas claire. Peux-tu reformuler ?"
    };

    return {
      text: defaults[intent.type] || defaults.unknown,
      type: 'default',
      confidence: 0.3
    };
  }

  updateStats(startTime) {
    const responseTime = Date.now() - startTime;
    this.stats.averageResponseTime = 
      (this.stats.averageResponseTime * (this.stats.totalActions - 1) + responseTime) / this.stats.totalActions;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 📊 STATISTIQUES & MONITORING
  // ═══════════════════════════════════════════════════════════════════════

  getStats() {
    const ruleBasedPercentage = (this.stats.ruleBasedActions / this.stats.totalActions * 100).toFixed(1);
    const llmPercentage = (this.stats.llmActions / this.stats.totalActions * 100).toFixed(1);

    return {
      ...this.stats,
      ruleBasedPercentage: `${ruleBasedPercentage}%`,
      llmPercentage: `${llmPercentage}%`,
      averageResponseTime: `${this.stats.averageResponseTime.toFixed(0)}ms`,
      estimatedCostSavings: this.stats.ruleBasedActions * 0.002,
      
      // Stats v2.0
      karmaReport: this.config.enableKarma ? this.karmaManager.getFullReport() : null,
      activeEvents: this.config.enableEvents ? this.eventGenerator.activeWorldEvents : [],
      npcCount: this.config.enableNPCPersonality ? this.npcPersonalitySystem.npcs.size : 0,
      
      // Stats v3.0
      activeQuests: this.config.enableQuests ? this.questGenerator.activeQuests.length : 0,
      completedQuests: this.config.enableQuests ? this.questGenerator.completedQuests.length : 0,
      relationshipsCount: this.config.enableRelationships ? this.npcRelationshipGraph.relationships.size : 0,
      marketsCount: this.config.enableEconomy ? this.economyManager.markets.size : 0,
      comboMultiplier: this.config.enableCombos ? this.actionComboSystem.getCurrentMultiplier() : 1.0
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🌟 NOUVELLES MÉTHODES - SYSTÈMES AVANCÉS
  // ═══════════════════════════════════════════════════════════════════════

  // ENREGISTRER UNE ACTION POUR LE KARMA
  recordKarmaAction(actionType, actionData) {
    if (!this.config.enableKarma) return null;
    return this.karmaManager.recordAction({ type: actionType, ...actionData });
  }

  // GÉNÉRER DES ÉVÉNEMENTS DYNAMIQUES
  generateRandomEvents(context) {
    if (!this.config.enableEvents) return [];
    return this.eventGenerator.generateEvent(context);
  }

  // METTRE À JOUR LES ÉVÉNEMENTS ACTIFS
  updateActiveEvents(gameTime) {
    if (!this.config.enableEvents) return;
    this.eventGenerator.updateActiveEvents(gameTime);
  }

  // RÉCUPÉRER LES EFFETS DES ÉVÉNEMENTS ACTIFS
  getActiveEventEffects() {
    if (!this.config.enableEvents) return {};
    return this.eventGenerator.getActiveEffects();
  }

  // CRÉER UN PNJ AVEC PERSONNALITÉ
  createNPC(id, name, archetype, customTraits = {}) {
    if (!this.config.enableNPCPersonality) return null;
    return this.npcPersonalitySystem.createNPC(id, name, archetype, customTraits);
  }

  // INTERAGIR AVEC UN PNJ
  interactWithNPC(npcId, interactionData) {
    if (!this.config.enableNPCPersonality) return null;
    return this.npcPersonalitySystem.recordInteraction(npcId, interactionData);
  }

  // RÉCUPÉRER UN DIALOGUE CONTEXTUEL ÉTENDU
  getContextualDialogue(category, subcategory, context = {}) {
    return this.dialogueExpansion.getContextualDialogue(category, subcategory, context);
  }

  // RÉCUPÉRER UNE RUMEUR
  getRumor(type = 'local') {
    return this.dialogueExpansion.getRumor(type);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🚀 MÉTHODES v3.0 - SYSTÈMES ULTRA-AVANCÉS
  // ═══════════════════════════════════════════════════════════════════════

  // ===== QUESTS =====
  generateQuest(context = {}) {
    if (!this.config.enableQuests) return null;
    return this.questGenerator.generateQuest(context);
  }

  generateQuestChain(context, chainLength = 3) {
    if (!this.config.enableQuests) return null;
    return this.questGenerator.generateQuestChain(context, chainLength);
  }

  updateQuestProgress(questId, progress) {
    if (!this.config.enableQuests) return null;
    return this.questGenerator.updateQuestProgress(questId, progress);
  }

  completeQuest(questId) {
    if (!this.config.enableQuests) return null;
    return this.questGenerator.completeQuest(questId);
  }

  failQuest(questId, reason) {
    if (!this.config.enableQuests) return null;
    return this.questGenerator.failQuest(questId, reason);
  }

  // ===== RELATIONSHIPS =====
  addNPCRelationship(npc1Id, npc2Id, type, category) {
    if (!this.config.enableRelationships) return false;
    return this.npcRelationshipGraph.addRelationship(npc1Id, npc2Id, type, category);
  }

  getNPCRelationship(npc1Id, npc2Id) {
    if (!this.config.enableRelationships) return null;
    return this.npcRelationshipGraph.getRelationship(npc1Id, npc2Id);
  }

  modifyNPCRelationship(npc1Id, npc2Id, delta, reason = '') {
    if (!this.config.enableRelationships) return false;
    return this.npcRelationshipGraph.modifyRelationshipStrength(npc1Id, npc2Id, delta, reason);
  }

  generateNPCFamily(npcIds, familyName) {
    if (!this.config.enableRelationships) return false;
    return this.npcRelationshipGraph.generateFamily(npcIds, familyName);
  }

  findCommonFriends(npc1Id, npc2Id) {
    if (!this.config.enableRelationships) return [];
    return this.npcRelationshipGraph.findCommonFriends(npc1Id, npc2Id);
  }

  predictNPCReaction(npcId, targetNpcId, playerActionType) {
    if (!this.config.enableRelationships) return 'neutral';
    return this.npcRelationshipGraph.predictReaction(npcId, targetNpcId, playerActionType);
  }

  // ===== ECONOMY =====
  createMarket(marketId, config = {}) {
    if (!this.config.enableEconomy) return null;
    return this.economyManager.createMarket(marketId, config);
  }

  setItemBasePrice(itemId, price, category = 'materials') {
    if (!this.config.enableEconomy) return;
    this.economyManager.setBasePrice(itemId, price, category);
  }

  initializeMarketItem(marketId, itemId, quantity = 100, demand = 50) {
    if (!this.config.enableEconomy) return false;
    return this.economyManager.initializeMarketItem(marketId, itemId, quantity, demand);
  }

  buyFromMarket(marketId, itemId, quantity = 1) {
    if (!this.config.enableEconomy) return null;
    return this.economyManager.buyItem(marketId, itemId, quantity);
  }

  sellToMarket(marketId, itemId, quantity = 1) {
    if (!this.config.enableEconomy) return null;
    return this.economyManager.sellItem(marketId, itemId, quantity);
  }

  createEconomicEvent(type, config = {}) {
    if (!this.config.enableEconomy) return null;
    return this.economyManager.createEconomicEvent(type, config);
  }

  updateMarketPrices() {
    if (!this.config.enableEconomy) return;
    this.economyManager.updateAllPrices();
  }

  findBestMarket(itemId, action = 'buy') {
    if (!this.config.enableEconomy) return null;
    return action === 'buy' 
      ? this.economyManager.findBestMarketToBuy(itemId)
      : this.economyManager.findBestMarketToSell(itemId);
  }

  findArbitrageOpportunities(itemId) {
    if (!this.config.enableEconomy) return [];
    return this.economyManager.findArbitrageOpportunities(itemId);
  }

  // ===== LOCATIONS =====
  generateLocationDescription(type, context = {}) {
    if (!this.config.enableLocations) return 'Un lieu inconnu.';
    return this.locationGenerator.generateLocation(type, context);
  }

  // ===== COMBOS =====
  recordPlayerAction(actionType, timestamp = Date.now()) {
    if (!this.config.enableCombos) return [];
    return this.actionComboSystem.recordAction(actionType, timestamp);
  }

  getComboMultiplier() {
    if (!this.config.enableCombos) return 1.0;
    return this.actionComboSystem.getCurrentMultiplier();
  }

  applyComboBonus(baseValue) {
    if (!this.config.enableCombos) return baseValue;
    return this.actionComboSystem.applyComboBonus(baseValue);
  }

  resetCombo() {
    if (!this.config.enableCombos) return;
    this.actionComboSystem.resetCombo();
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🎭 V4.0 LEGENDARY SYSTEMS - AI DIRECTOR
  // ═══════════════════════════════════════════════════════════════════════

  analyzePlayerBehavior(playerId) {
    if (!this.aiDirector) return null;
    return this.aiDirector.analyzePlayerBehavior(playerId);
  }

  adjustDifficulty(playerId, context = {}) {
    if (!this.aiDirector) return { multiplier: 1.0, adjustments: {} };
    return this.aiDirector.adjustDifficulty(playerId, context);
  }

  generatePersonalizedContent(playerId, contentType, context = {}) {
    if (!this.aiDirector) return null;
    return this.aiDirector.generatePersonalizedContent(playerId, contentType, context);
  }

  predictPlayerAction(playerId, context = {}) {
    if (!this.aiDirector) return null;
    return this.aiDirector.predictPlayerAction(playerId, context);
  }

  recordCombatForAI(playerId, combatData) {
    if (!this.aiDirector) return;
    this.aiDirector.recordCombatEvent(playerId, combatData);
  }

  getPlayerSummary(playerId) {
    if (!this.aiDirector) return null;
    return this.aiDirector.getPlayerSummary(playerId);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🌍 V4.0 LEGENDARY SYSTEMS - WORLD SIMULATION
  // ═══════════════════════════════════════════════════════════════════════

  getWorldTime() {
    if (!this.worldSimulation) return null;
    return this.worldSimulation.getWorldState();
  }

  addNPCToWorld(npcData) {
    if (!this.worldSimulation) return null;
    return this.worldSimulation.addNPC(npcData);
  }

  addCityToWorld(cityData) {
    if (!this.worldSimulation) return null;
    return this.worldSimulation.addCity(cityData);
  }

  getNPCState(npcId) {
    if (!this.worldSimulation) return null;
    return this.worldSimulation.getNPCState(npcId);
  }

  getCityState(cityId) {
    if (!this.worldSimulation) return null;
    return this.worldSimulation.getCityState(cityId);
  }

  getCurrentWeather() {
    if (!this.worldSimulation) return null;
    return this.worldSimulation.getCurrentWeather();
  }

  getGlobalEconomy() {
    if (!this.worldSimulation) return null;
    return this.worldSimulation.getGlobalEconomy();
  }

  fastForwardTime(hours) {
    if (!this.worldSimulation) return;
    this.worldSimulation.fastForward(hours);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 📖 V4.0 LEGENDARY SYSTEMS - DYNAMIC STORYTELLING
  // ═══════════════════════════════════════════════════════════════════════

  generateStory(context = {}) {
    if (!this.dynamicStorytelling) return null;
    return this.dynamicStorytelling.generateStory(context);
  }

  progressStory(storyId, playerAction) {
    if (!this.dynamicStorytelling) return null;
    return this.dynamicStorytelling.progressStory(storyId, playerAction);
  }

  getActiveStories() {
    if (!this.dynamicStorytelling) return [];
    return this.dynamicStorytelling.getActiveStories();
  }

  getRecurringCharacters() {
    if (!this.dynamicStorytelling) return [];
    return this.dynamicStorytelling.getRecurringCharacters();
  }

  getNarrativeContext() {
    if (!this.dynamicStorytelling) return null;
    return this.dynamicStorytelling.getNarrativeContext();
  }

  generateStorySummary(storyId) {
    if (!this.dynamicStorytelling) return null;
    return this.dynamicStorytelling.generateStorySummary(storyId);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ⚔️ V4.0 LEGENDARY SYSTEMS - ADVANCED COMBAT AI
  // ═══════════════════════════════════════════════════════════════════════

  analyzePlayerCombatPatterns(playerId, combat) {
    if (!this.advancedCombatAI) return null;
    return this.advancedCombatAI.analyzePlayerPatterns(playerId, combat);
  }

  selectCombatFormation(units, enemyFormation, context) {
    if (!this.advancedCombatAI) return null;
    return this.advancedCombatAI.selectFormation(units, enemyFormation, context);
  }

  decideCombatStrategy(units, enemies, context) {
    if (!this.advancedCombatAI) return null;
    return this.advancedCombatAI.decideStrategy(units, enemies, context);
  }

  decideUnitAction(unit, allies, enemies, strategy, context) {
    if (!this.advancedCombatAI) return null;
    return this.advancedCombatAI.decideUnitAction(unit, allies, enemies, strategy, context);
  }

  coordinateTeam(units, enemies, strategy) {
    if (!this.advancedCombatAI) return [];
    return this.advancedCombatAI.coordinateTeam(units, enemies, strategy);
  }

  learnFromCombat(combatResult) {
    if (!this.advancedCombatAI) return;
    this.advancedCombatAI.learnFromCombat(combatResult);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ⚔️ V4.0 LEGENDARY SYSTEMS - FACTION WARFARE
  // ═══════════════════════════════════════════════════════════════════════

  createFaction(data) {
    if (!this.factionWarfare) return null;
    return this.factionWarfare.createFaction(data);
  }

  createTerritory(data) {
    if (!this.factionWarfare) return null;
    return this.factionWarfare.createTerritory(data);
  }

  declareWar(attackerId, defenderId, reason) {
    if (!this.factionWarfare) return false;
    return this.factionWarfare.declareWar(attackerId, defenderId, reason);
  }

  negotiatePeace(factionId1, factionId2, terms) {
    if (!this.factionWarfare) return false;
    return this.factionWarfare.negotiatePeace(factionId1, factionId2, terms);
  }

  getGeopoliticalState() {
    if (!this.factionWarfare) return null;
    return this.factionWarfare.getGeopoliticalState();
  }

  getRecentBattles(limit = 10) {
    if (!this.factionWarfare) return [];
    return this.factionWarfare.getRecentBattles(limit);
  }

  applyPlayerInfluenceToBattle(battleId, factionId, influence) {
    if (!this.factionWarfare) return;
    this.factionWarfare.applyPlayerInfluence(battleId, factionId, influence);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🧠 V4.0 LEGENDARY SYSTEMS - KNOWLEDGE GRAPH
  // ═══════════════════════════════════════════════════════════════════════

  addKnowledgeNode(data) {
    if (!this.knowledgeGraph) return null;
    return this.knowledgeGraph.addNode(data);
  }

  addKnowledgeEdge(fromId, toId, relationType, properties) {
    if (!this.knowledgeGraph) return null;
    return this.knowledgeGraph.addEdge(fromId, toId, relationType, properties);
  }

  findKnowledge(criteria) {
    if (!this.knowledgeGraph) return [];
    return this.knowledgeGraph.findNodes(criteria);
  }

  traverseKnowledge(startNodeId, relationTypes, depth) {
    if (!this.knowledgeGraph) return [];
    return this.knowledgeGraph.traverse(startNodeId, relationTypes, depth);
  }

  findKnowledgePath(fromId, toId, relationTypes) {
    if (!this.knowledgeGraph) return null;
    return this.knowledgeGraph.findPath(fromId, toId, relationTypes);
  }

  queryKnowledge(pattern) {
    if (!this.knowledgeGraph) return [];
    return this.knowledgeGraph.query(pattern);
  }

  performInferences() {
    if (!this.knowledgeGraph) return 0;
    return this.knowledgeGraph.performInferences();
  }

  suggestContent(contextNodeId, suggestionType) {
    if (!this.knowledgeGraph) return [];
    return this.knowledgeGraph.suggestContent(contextNodeId, suggestionType);
  }

  getContradictions(severity) {
    if (!this.knowledgeGraph) return [];
    return this.knowledgeGraph.getContradictions(severity);
  }

  exportKnowledgeGraph() {
    if (!this.knowledgeGraph) return null;
    return this.knowledgeGraph.export();
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 📊 STATISTIQUES
  // ═══════════════════════════════════════════════════════════════════════

  getStats() {
    const baseStats = { ...this.stats };
    
    if (this.config.enableEvents) {
      baseStats.events = this.eventGenerator.stats;
    }
    if (this.config.enableKarma) {
      baseStats.karma = this.karmaManager.stats;
    }
    if (this.config.enableNPCPersonality) {
      baseStats.npcAI = this.npcPersonalitySystem.stats;
    }
    if (this.config.enableQuests) {
      baseStats.quests = this.questGenerator.getStats();
    }
    if (this.config.enableRelationships) {
      baseStats.relationships = this.npcRelationshipGraph.getStats();
    }
    if (this.config.enableEconomy) {
      baseStats.economy = this.economyManager.getStats();
    }
    if (this.config.enableCombos) {
      baseStats.combos = this.actionComboSystem.getStats();
    }
    
    // v4.0 LEGENDARY SYSTEMS
    if (this.aiDirector) {
      baseStats.aiDirector = this.aiDirector.getStats();
    }
    if (this.worldSimulation) {
      baseStats.worldSimulation = this.worldSimulation.getStats();
    }
    if (this.dynamicStorytelling) {
      baseStats.storytelling = this.dynamicStorytelling.getStats();
    }
    if (this.advancedCombatAI) {
      baseStats.combatAI = this.advancedCombatAI.getStats();
    }
    if (this.factionWarfare) {
      baseStats.factionWarfare = this.factionWarfare.getStats();
    }
    if (this.knowledgeGraph) {
      baseStats.knowledgeGraph = this.knowledgeGraph.getStats();
    }
    
    return baseStats;
  }

  reset() {
    this.stats = {
      totalActions: 0,
      ruleBasedActions: 0,
      llmActions: 0,
      averageResponseTime: 0
    };
    this.memoryManager.clear();
    
    // Réinitialiser v2.0
    if (this.config.enableEvents) this.eventGenerator.reset();
    if (this.config.enableKarma) this.karmaManager.reset();
    if (this.config.enableNPCPersonality) this.npcPersonalitySystem.reset();
    
    // Réinitialiser v3.0
    if (this.config.enableQuests) this.questGenerator.reset();
    if (this.config.enableRelationships) this.npcRelationshipGraph.reset();
    if (this.config.enableEconomy) this.economyManager.reset();
    
    // Réinitialiser v4.0 LEGENDARY SYSTEMS
    if (this.aiDirector) this.aiDirector.reset();
    if (this.worldSimulation) this.worldSimulation.reset();
    if (this.dynamicStorytelling) this.dynamicStorytelling.reset();
    if (this.advancedCombatAI) this.advancedCombatAI.reset();
    if (this.factionWarfare) this.factionWarfare.reset();
    if (this.knowledgeGraph) this.knowledgeGraph.reset();
  }
}

// ═══════════════════════════════════════════════════════════════════════
// 🚀 EXPORT & SINGLETON
// ═══════════════════════════════════════════════════════════════════════

let engineInstance = null;

export function getGMEngine(config) {
  if (!engineInstance) {
    engineInstance = new GMEngine(config);
  }
  return engineInstance;
}

export default GMEngine;
