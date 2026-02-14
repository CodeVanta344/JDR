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

// ===== NOUVEAUX SYSTÈMES AVANCÉS =====
import EventGenerator from './EventGenerator.js';
import KarmaManager from './KarmaManager.js';
import NPCPersonalitySystem from './NPCPersonalitySystem.js';
import DialogueExpansion from './DialogueExpansion.js';

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
      enableEvents: true,        // Nouveaux : événements dynamiques
      enableKarma: true,          // Nouveau : système de karma
      enableNPCPersonality: true, // Nouveau : IA des PNJ
      ...config
    };

    // Initialiser les composants
    this.intentDetector = new IntentDetector();
    this.memoryManager = new MemoryManager();
    this.narrativeGenerator = new NarrativeGenerator();

    // ===== NOUVEAUX SYSTÈMES AVANCÉS =====
    this.eventGenerator = new EventGenerator();
    this.karmaManager = new KarmaManager();
    this.npcPersonalitySystem = new NPCPersonalitySystem();
    this.dialogueExpansion = new DialogueExpansion();

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
      estimatedCostSavings: this.stats.ruleBasedActions * 0.002, // $0.002 par appel LLM évité
      
      // Nouvelles stats
      karmaReport: this.config.enableKarma ? this.karmaManager.getFullReport() : null,
      activeEvents: this.config.enableEvents ? this.eventGenerator.activeWorldEvents : [],
      npcCount: this.config.enableNPCPersonality ? this.npcPersonalitySystem.npcs.size : 0
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

  reset() {
    this.stats = {
      totalActions: 0,
      ruleBasedActions: 0,
      llmActions: 0,
      averageResponseTime: 0
    };
    this.memoryManager.clear();
    
    // Réinitialiser les nouveaux systèmes
    if (this.config.enableEvents) this.eventGenerator.reset();
    if (this.config.enableKarma) this.karmaManager.reset();
    if (this.config.enableNPCPersonality) this.npcPersonalitySystem.reset();
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
