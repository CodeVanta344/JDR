// ============================================================
// GAME SYSTEMS MANAGER - Point d'entrée central
// Coordonne tous les systèmes de jeu (métiers, factions, économie, etc.)
// ============================================================

import { worldEventManager } from './world-events';
import type { Profession } from './professions';
import type { Faction } from './factions';
import { BLACKSMITHING } from './professions/craft/blacksmithing';
import { ALCHEMY } from './professions/craft/alchemy';
import { MINING } from './professions/gather/mining';
import { GUILDES } from './factions/index';

export interface PlayerProfession {
  profession_id: string;
  level: number;
  xp: number;
  specialization_id?: string;
  recipes_unlocked: string[];
}

export interface PlayerFactionStatus {
  faction_id: string;
  reputation: number;
  rank_level: number;
  quests_completed: string[];
  exiled: boolean;
}

export interface GameState {
  current_day: number;
  player_professions: PlayerProfession[];
  player_factions: PlayerFactionStatus[];
  world_events_active: string[];
  market_state: any; // État des marchés
}

export class GameSystemsManager {
  private gameState: GameState;
  
  constructor(initialState?: Partial<GameState>) {
    this.gameState = {
      current_day: 0,
      player_professions: [],
      player_factions: [],
      world_events_active: [],
      market_state: {},
      ...initialState
    };
  }

  // ============================================================
  // SYSTÈME DE MÉTIERS
  // ============================================================

  /**
   * Apprendre un nouveau métier
   */
  learnProfession(professionId: string): { success: boolean; message: string } {
    if (this.gameState.player_professions.length >= 2) {
      return {
        success: false,
        message: 'Limite de 2 métiers atteinte. Oubliez un métier existant d\'abord.'
      };
    }

    if (this.gameState.player_professions.some(p => p.profession_id === professionId)) {
      return {
        success: false,
        message: 'Vous connaissez déjà ce métier.'
      };
    }

    this.gameState.player_professions.push({
      profession_id: professionId,
      level: 1,
      xp: 0,
      recipes_unlocked: []
    });

    return {
      success: true,
      message: `Métier ${professionId} appris ! Niveau 1.`
    };
  }

  /**
   * Gagner XP dans un métier
   */
  gainProfessionXP(professionId: string, xp: number): {
    level_up: boolean;
    new_level?: number;
    rewards?: any[];
  } {
    const prof = this.gameState.player_professions.find(p => p.profession_id === professionId);
    if (!prof) {
      return { level_up: false };
    }

    prof.xp += xp;

    // Calculer level-up
    const profession = this.getProfessionData(professionId);
    if (!profession) return { level_up: false };

    const nextRank = profession.ranks.find(r => r.level === prof.level + 1);
    if (nextRank && prof.xp >= nextRank.xp_required) {
      prof.level += 1;
      const newRank = profession.ranks.find(r => r.level === prof.level);
      
      return {
        level_up: true,
        new_level: prof.level,
        rewards: newRank?.rewards
      };
    }

    return { level_up: false };
  }

  /**
   * Crafter un item
   */
  craftItem(professionId: string, recipeId: string): {
    success: boolean;
    result?: any;
    message: string;
  } {
    const prof = this.gameState.player_professions.find(p => p.profession_id === professionId);
    if (!prof) {
      return { success: false, message: 'Vous ne connaissez pas ce métier.' };
    }

    const profession = this.getProfessionData(professionId);
    const recipe = profession?.recipes.find(r => r.id === recipeId);
    
    if (!recipe) {
      return { success: false, message: 'Recette inconnue.' };
    }

    if (recipe.level_required > prof.level) {
      return {
        success: false,
        message: `Niveau ${recipe.level_required} requis (vous êtes niveau ${prof.level}).`
      };
    }

    // TODO: Vérifier ingrédients, outils, etc.
    // Roll de réussite
    const successRate = this.calculateCraftSuccessRate(recipe, prof.level);
    const roll = Math.random() * 100;

    if (roll <= successRate) {
      // Succès ! Donner item + XP
      const xpGain = recipe.level_required * 10;
      this.gainProfessionXP(professionId, xpGain);

      return {
        success: true,
        result: recipe.result,
        message: `Craft réussi ! ${recipe.name} créé. +${xpGain} XP.`
      };
    } else {
      return {
        success: false,
        message: recipe.fail_consequence || 'Craft échoué.'
      };
    }
  }

  private calculateCraftSuccessRate(recipe: any, playerLevel: number): number {
    // Formule basique : base + (level * bonus)
    return 60 + (playerLevel * 3);
  }

  // ============================================================
  // SYSTÈME DE FACTIONS
  // ============================================================

  /**
   * Rejoindre une faction
   */
  joinFaction(factionId: string): { success: boolean; message: string } {
    const faction = this.getFactionData(factionId);
    if (!faction) {
      return { success: false, message: 'Faction inconnue.' };
    }

    // Vérifier factions incompatibles
    const hasIncompatible = this.gameState.player_factions.some(pf => 
      faction.incompatible_factions.includes(pf.faction_id)
    );

    if (hasIncompatible) {
      return {
        success: false,
        message: 'Vous êtes membre d\'une faction incompatible.'
      };
    }

    this.gameState.player_factions.push({
      faction_id: factionId,
      reputation: 0,
      rank_level: 1,
      quests_completed: [],
      exiled: false
    });

    return {
      success: true,
      message: `Vous avez rejoint ${faction.name} !`
    };
  }

  /**
   * Gagner/perdre réputation dans une faction
   */
  changeFactionReputation(factionId: string, delta: number, reason: string): {
    rank_up: boolean;
    rank_down: boolean;
    new_rank?: number;
    exile?: boolean;
  } {
    const pf = this.gameState.player_factions.find(f => f.faction_id === factionId);
    if (!pf) return { rank_up: false, rank_down: false };

    pf.reputation += delta;

    // Exil si réputation trop basse
    if (pf.reputation < -500) {
      pf.exiled = true;
      return {
        rank_up: false,
        rank_down: false,
        exile: true
      };
    }

    const faction = this.getFactionData(factionId);
    if (!faction) return { rank_up: false, rank_down: false };

    // Check rank up
    const nextRank = faction.ranks.find(r => r.level === pf.rank_level + 1);
    if (nextRank && pf.reputation >= nextRank.reputation_required) {
      pf.rank_level += 1;
      return {
        rank_up: true,
        rank_down: false,
        new_rank: pf.rank_level
      };
    }

    // Check rank down
    const currentRank = faction.ranks.find(r => r.level === pf.rank_level);
    if (currentRank && pf.reputation < currentRank.reputation_required) {
      pf.rank_level -= 1;
      return {
        rank_up: false,
        rank_down: true,
        new_rank: pf.rank_level
      };
    }

    return { rank_up: false, rank_down: false };
  }

  // ============================================================
  // SYSTÈME ÉCONOMIQUE
  // ============================================================

  /**
   * Obtenir prix d'un item dans une ville
   * TODO: Intégrer avec nouveau système economy-system.ts
   */
  getItemPrice(itemId: string, cityId: string, isBuying: boolean): number {
    // TEMPORARY: Prix fixes
    const basePrices: Record<string, number> = {
      'iron_ore': 10,
      'health_potion': 50,
      'sword_short': 120
    };
    return basePrices[itemId] || 100;
  }

  /**
   * Simuler voyage commercial
   * TODO: Intégrer avec nouveau système economy-system.ts
   */
  simulateTradeRoute(fromCity: string, toCity: string, itemId: string, quantity: number) {
    return { profit: quantity * 5, risk: 'low' };
  }

  // ============================================================
  // ÉVÉNEMENTS MONDIAUX
  // ============================================================

  /**
   * Vérifier déclenchement événements (appelé chaque nouveau jour)
   */
  checkWorldEvents(playerActions: string[]): any[] {
    const triggered = worldEventManager.checkTriggers(this.gameState.current_day, playerActions);
    
    triggered.forEach(event => {
      this.gameState.world_events_active.push(event.id);
    });

    return triggered;
  }

  /**
   * Avancer le temps (appelé chaque repos long / jour de voyage)
   */
  advanceDay(days: number = 1): void {
    this.gameState.current_day += days;
    
    // TODO: Mise à jour économie avec nouveau système economy-system.ts
    // for (let i = 0; i < days; i++) {
    //   globalEconomy.dailyUpdate();
    // }

    // Progression événements mondiaux
    this.gameState.world_events_active.forEach(eventId => {
      worldEventManager.progressEvent(eventId, days);
    });
  }

  // ============================================================
  // HELPERS
  // ============================================================

  private getProfessionData(professionId: string): Profession | undefined {
    const professions: Record<string, Profession> = {
      'blacksmithing': BLACKSMITHING,
      'alchemy': ALCHEMY,
      'mining': MINING
    };
    return professions[professionId];
  }

  private getFactionData(factionId: string): Faction | undefined {
    return GUILDES.find(g => g.id === factionId);
  }

  /**
   * Exporter état de jeu (pour sauvegarde)
   */
  exportState(): GameState {
    return { ...this.gameState };
  }

  /**
   * Restaurer état de jeu (depuis sauvegarde)
   */
  loadState(state: GameState): void {
    this.gameState = state;
  }
}

// Instance globale (singleton)
export const gameSystemsManager = new GameSystemsManager();
