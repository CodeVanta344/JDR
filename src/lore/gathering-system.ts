/**
 * GATHERING SYSTEM - Système de récolte de ressources
 * Gestion des spots de récolte, tentatives de récolte, et loot des créatures
 */

import type { ResourceDefinition, BiomeType } from './resources';
import { ALL_RESOURCES, RESOURCES_BY_ID, getResourcesForBiome, calculateYield } from './resources';
import type { LootDrop } from './bestiary';
import type { ProfessionType } from './schema';

// ============================================================================
// TYPES
// ============================================================================

export interface GatheringSpot {
  id: string;
  resourceId: string;
  location: string;
  biome: BiomeType;
  quantity: number;
  difficulty: number; // DD pour récolte (1-30)
  respawnTime: number; // minutes
  visible: 'obvious' | 'hidden' | 'perception_required'; // Évident, caché, ou nécessite perception
  discovered: boolean;
  description?: string;
}

export interface GatheringAttempt {
  playerId: string;
  spotId: string;
  rollResult: number; // Jet de dés (1-20)
  statModifier: number;
  totalResult: number;
  success: boolean;
  critical: boolean;
  quantityGathered: number;
  experienceGained: number;
  message: string;
}

export interface LootResult {
  resourceId: string;
  resourceName: string;
  quantity: number;
  source: string; // Nom de la créature
}

// ============================================================================
// SPOT GENERATION
// ============================================================================

class GatheringSystem {
  private spots: Map<string, GatheringSpot> = new Map();
  private spotCounter = 0;

  /**
   * Génère des spots de récolte pour une zone
   */
  generateSpotsForLocation(
    location: string,
    biome: BiomeType,
    playerLevel: number,
    spotCount: number = 3
  ): GatheringSpot[] {
    const availableResources = getResourcesForBiome(biome, playerLevel);
    const newSpots: GatheringSpot[] = [];

    for (let i = 0; i < spotCount; i++) {
      if (availableResources.length === 0) break;

      const randomResource = availableResources[Math.floor(Math.random() * availableResources.length)];
      const spot: GatheringSpot = {
        id: `spot-${location}-${this.spotCounter++}`,
        resourceId: randomResource.id,
        location,
        biome,
        quantity: Math.floor(Math.random() * 3) + 1, // 1-3 unités disponibles
        difficulty: Math.max(5, Math.min(25, randomResource.levelRequired / 4 + 5)),
        respawnTime: randomResource.respawnTime,
        visible: this.determineVisibility(randomResource.rarity),
        discovered: false,
        description: this.generateSpotDescription(randomResource)
      };

      this.spots.set(spot.id, spot);
      newSpots.push(spot);
    }

    return newSpots;
  }

  /**
   * Détermine la visibilité d'une ressource selon sa rareté
   */
  private determineVisibility(rarity: string): 'obvious' | 'hidden' | 'perception_required' {
    switch (rarity) {
      case 'common':
      case 'uncommon':
        return 'obvious';
      case 'rare':
        return Math.random() > 0.5 ? 'obvious' : 'perception_required';
      case 'epic':
      case 'legendary':
        return 'hidden';
      default:
        return 'obvious';
    }
  }

  /**
   * Génère une description pour le spot
   */
  private generateSpotDescription(resource: ResourceDefinition): string {
    const descriptions: Record<string, string[]> = {
      ore: [`une veine de ${resource.name}`, `un filon de ${resource.name}`, `des cristaux de ${resource.name}`],
      herb: [`des ${resource.name} poussant`, `des ${resource.name} à l'état sauvage`, `une touffe de ${resource.name}`],
      wood: [`un ${resource.name} tombé`, `un vieux ${resource.name}`, `des ${resource.name} empilés`],
      fish: [`des ${resource.name} nageant`, `un banc de ${resource.name}`],
      leather: [`des traces menant à du ${resource.name}`],
      cloth: [`des ${resource.name} abandonnés`, `des restes de ${resource.name}`],
      gem: [`des fragments de ${resource.name} brillants`, `une formation de ${resource.name}`],
      reagent: [`une concentration de ${resource.name}`, `de la ${resource.name} pure`]
    };

    const options = descriptions[resource.category] || [`de ${resource.name}`];
    return options[Math.floor(Math.random() * options.length)];
  }

  /**
   * Récupère tous les spots pour une zone
   */
  getSpotsForLocation(location: string): GatheringSpot[] {
    return Array.from(this.spots.values()).filter(s => s.location === location);
  }

  /**
   * Découvre les spots évidents dans une zone (pas de jet requis)
   */
  discoverObviousSpots(location: string): GatheringSpot[] {
    const spots = this.getSpotsForLocation(location);
    const discovered: GatheringSpot[] = [];

    spots.forEach(spot => {
      if (spot.visible === 'obvious' && !spot.discovered) {
        spot.discovered = true;
        discovered.push(spot);
      }
    });

    return discovered;
  }

  /**
   * Tente de découvrir des spots cachés (jet de perception)
   */
  attemptDiscoverHidden(
    location: string,
    playerId: string,
    perceptionModifier: number,
    rollResult: number
  ): { spotsFound: GatheringSpot[]; message: string } {
    const spots = this.getSpotsForLocation(location);
    const hiddenSpots = spots.filter(s => 
      (s.visible === 'hidden' || s.visible === 'perception_required') && 
      !s.discovered
    );

    if (hiddenSpots.length === 0) {
      return { spotsFound: [], message: "Rien d'intéressant trouvé dans les environs." };
    }

    const total = rollResult + perceptionModifier;
    const spotsFound: GatheringSpot[] = [];

    hiddenSpots.forEach(spot => {
      // DD 15 pour spot caché, 12 pour perception_required
      const dc = spot.visible === 'hidden' ? 15 : 12;
      if (total >= dc) {
        spot.discovered = true;
        spotsFound.push(spot);
      }
    });

    const message = spotsFound.length > 0
      ? `Vous avez découvert ${spotsFound.length} ressource(s) cachée(s) !`
      : "Vous n'avez rien remarqué d'intéressant.";

    return { spotsFound, message };
  }

  /**
   * Tente une récolte sur un spot
   */
  attemptGathering(
    spotId: string,
    playerId: string,
    professionLevel: number,
    statModifier: number,
    rollResult: number
  ): GatheringAttempt {
    const spot = this.spots.get(spotId);
    if (!spot) {
      return {
        playerId,
        spotId,
        rollResult,
        statModifier,
        totalResult: 0,
        success: false,
        critical: false,
        quantityGathered: 0,
        experienceGained: 0,
        message: "Spot introuvable."
      };
    }

    if (spot.quantity <= 0) {
      return {
        playerId,
        spotId,
        rollResult,
        statModifier,
        totalResult: 0,
        success: false,
        critical: false,
        quantityGathered: 0,
        experienceGained: 0,
        message: "Cette ressource est épuisée."
      };
    }

    const resource = RESOURCES_BY_ID[spot.resourceId];
    if (!resource) {
      return {
        playerId,
        spotId,
        rollResult,
        statModifier,
        totalResult: 0,
        success: false,
        critical: false,
        quantityGathered: 0,
        experienceGained: 0,
        message: "Ressource inconnue."
      };
    }

    const total = rollResult + statModifier;
    const success = total >= spot.difficulty;
    const critical = rollResult === 20;

    if (success) {
      const baseYield = calculateYield(resource, professionLevel);
      const quantityGathered = critical ? baseYield * 2 : baseYield;
      const experienceGained = Math.floor(resource.value / 10) + (resource.levelRequired / 5);

      spot.quantity -= 1;

      // Si épuisé, programmer le respawn
      if (spot.quantity <= 0 && spot.respawnTime > 0) {
        setTimeout(() => {
          spot.quantity = Math.floor(Math.random() * 3) + 1;
          spot.discovered = false;
        }, spot.respawnTime * 60 * 1000);
      }

      return {
        playerId,
        spotId,
        rollResult,
        statModifier,
        totalResult: total,
        success: true,
        critical,
        quantityGathered,
        experienceGained,
        message: critical
          ? `Réussite critique ! Vous récoltez ${quantityGathered}x ${resource.name} !`
          : `Vous récoltez ${quantityGathered}x ${resource.name}.`
      };
    } else {
      // Échec partiel - peut-être 1 unité si proche
      const nearSuccess = total >= spot.difficulty - 3;
      if (nearSuccess) {
        spot.quantity -= 1;
        return {
          playerId,
          spotId,
          rollResult,
          statModifier,
          totalResult: total,
          success: true,
          critical: false,
          quantityGathered: 1,
          experienceGained: 1,
          message: `Vous avez réussi de justesse à récolter 1x ${resource.name}.`
        };
      }

      return {
        playerId,
        spotId,
        rollResult,
        statModifier,
        totalResult: total,
        success: false,
        critical: false,
        quantityGathered: 0,
        experienceGained: 0,
        message: `Échec. Vous n'avez pas réussi à récolter de ${resource.name}.`
      };
    }
  }

  /**
   * Génère le butin d'une créature vaincue
   */
  generateCreatureLoot(
    creatureName: string,
    lootTable: LootDrop[],
    luckModifier: number = 0
  ): LootResult[] {
    const loot: LootResult[] = [];

    lootTable.forEach(drop => {
      const roll = Math.random() * 100;
      const adjustedChance = drop.chance + luckModifier;

      if (roll <= adjustedChance) {
        const quantity = Math.floor(Math.random() * (drop.quantity.max - drop.quantity.min + 1)) + drop.quantity.min;
        const resource = RESOURCES_BY_ID[drop.resourceId];
        
        if (resource) {
          loot.push({
            resourceId: drop.resourceId,
            resourceName: resource.name,
            quantity,
            source: creatureName
          });
        }
      }
    });

    return loot;
  }

  /**
   * Crée un item de ressource pour l'inventaire
   */
  createResourceItem(resourceId: string, quantity: number) {
    const resource = RESOURCES_BY_ID[resourceId];
    if (!resource) return null;

    return {
      id: resourceId,
      name: resource.name,
      type: 'material',
      quantity,
      value: resource.value,
      desc: resource.description,
      category: resource.category,
      rarity: resource.rarity,
      stackable: true
    };
  }

  /**
   * Réinitialise tous les spots (debug/admin)
   */
  resetAllSpots(): void {
    this.spots.clear();
    this.spotCounter = 0;
  }

  /**
   * Exporte l'état des spots pour sauvegarde
   */
  exportSpots(): GatheringSpot[] {
    return Array.from(this.spots.values());
  }

  /**
   * Importe l'état des spots
   */
  importSpots(spots: GatheringSpot[]): void {
    this.spots.clear();
    spots.forEach(spot => {
      this.spots.set(spot.id, spot);
      // Mettre à jour le compteur
      const match = spot.id.match(/spot-.*-(\d+)/);
      if (match) {
        const num = parseInt(match[1]);
        if (num >= this.spotCounter) {
          this.spotCounter = num + 1;
        }
      }
    });
  }
}

// Singleton instance
export const gatheringSystem = new GatheringSystem();

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Détermine le stat à utiliser pour une récolte selon le type de ressource
 */
export function getGatheringStat(resourceCategory: string): 'str' | 'dex' | 'int' | 'wis' {
  const statMap: Record<string, 'str' | 'dex' | 'int' | 'wis'> = {
    ore: 'str',
    gem: 'str',
    wood: 'str',
    herb: 'wis',
    fish: 'dex',
    leather: 'dex',
    cloth: 'dex',
    reagent: 'int'
  };
  return statMap[resourceCategory] || 'wis';
}

/**
 * Calcule la difficulté estimée pour un joueur
 */
export function estimateDifficulty(spot: GatheringSpot, playerLevel: number): string {
  const levelDiff = spot.difficulty - (playerLevel / 2 + 10);
  
  if (levelDiff <= -5) return 'très facile';
  if (levelDiff <= 0) return 'facile';
  if (levelDiff <= 3) return 'modéré';
  if (levelDiff <= 6) return 'difficile';
  return 'très difficile';
}

/**
 * Génère une description narrative pour le MJ
 */
export function generateNarrativeDescription(
  spot: GatheringSpot,
  resource: ResourceDefinition
): string {
  const visibility = spot.visible === 'obvious' 
    ? 'visible' 
    : spot.visible === 'perception_required'
      ? 'peu visible, demande de l\'attention'
      : 'soigneusement dissimulé';

  return `Dans cette zone, vous remarquez ${spot.description} (${resource.name}). ` +
         `C'est ${visibility} et semble ${estimateDifficulty(spot, resource.levelRequired)} à récolter.`;
}

export default gatheringSystem;
