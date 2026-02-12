/**
 * AETHELGARD LORE - Point d'entrée principal
 * Initialise et exporte tout le système de lore
 */

import { LoreRegistry } from './registry';
import { LoreSearchEngine } from './search';

// Import des données
import { ALL_FACTIONS } from './factions';
import { ALL_PROFESSIONS } from './professions';
import { ALL_RESOURCES } from './resources';
import { ALL_RECIPES } from './recipes';
import { ALL_CREATURES } from './bestiary';
import { ALL_NPCS } from './npcs';
import { ALL_QUESTS } from './quests';
import { ALL_ITEMS } from './items-catalog';
import { ALL_LOCATIONS } from './world-map';

// Import des expansions
import { EXPANDED_NPCS_BATCH_1 } from './npcs-expansion-1';
import { EXPANDED_NPCS_BATCH_2 } from './npcs-expansion-2';
import { EXPANDED_BESTIARY_BATCH_1 } from './bestiary-expansion-1';
import { EXPANDED_BESTIARY_BATCH_2 } from './bestiary-expansion-2';

// ============================================================================
// REGISTRY GLOBAL
// ============================================================================

export const GlobalLoreRegistry = new LoreRegistry();
export const GlobalLoreSearch = new LoreSearchEngine(GlobalLoreRegistry);

// ============================================================================
// INITIALISATION
// ============================================================================

/**
 * Initialise le système de lore complet
 * À appeler au démarrage de l'application
 */
export function initializeLoreSystem(): void {
  console.log('[Lore] Initialisation du système de lore...');
  
  const startTime = performance.now();
  
  // Enregistrement des factions
  console.log(`[Lore] Enregistrement de ${ALL_FACTIONS.length} factions...`);
  ALL_FACTIONS.forEach(faction => {
    GlobalLoreRegistry.register({
      id: faction.id,
      name: faction.name,
      type: 'faction',
      tags: [faction.alignment, faction.influence],
      description: faction.description,
      data: faction
    });
  });
  
  // Enregistrement des métiers
  console.log(`[Lore] Enregistrement de ${ALL_PROFESSIONS.length} métiers...`);
  ALL_PROFESSIONS.forEach(profession => {
    GlobalLoreRegistry.register({
      id: `profession:${profession.type}`,
      name: profession.name,
      type: 'profession',
      tags: [profession.category, profession.primaryStat],
      description: profession.description,
      data: profession
    });
  });
  
  // Enregistrement des ressources
  console.log(`[Lore] Enregistrement de ${ALL_RESOURCES.length} ressources...`);
  ALL_RESOURCES.forEach(resource => {
    GlobalLoreRegistry.register({
      id: resource.id,
      name: resource.name,
      type: 'resource',
      tags: [resource.category, resource.rarity, resource.gatheredBy, ...resource.biomes],
      description: resource.description,
      data: resource
    });
  });
  
  // Enregistrement des recettes
  console.log(`[Lore] Enregistrement de ${ALL_RECIPES.length} recettes...`);
  ALL_RECIPES.forEach(recipe => {
    GlobalLoreRegistry.register({
      id: recipe.id,
      name: recipe.name,
      type: 'recipe',
      tags: [recipe.profession, recipe.category, recipe.station],
      description: `Recette de ${recipe.profession} niveau ${recipe.levelRequired}`,
      data: recipe
    });
  });
  
  // Enregistrement des créatures
  console.log(`[Lore] Enregistrement de ${ALL_CREATURES.length} créatures...`);
  ALL_CREATURES.forEach(creature => {
    GlobalLoreRegistry.register({
      id: creature.id,
      name: creature.name,
      type: 'creature',
      tags: [creature.type, creature.size, creature.alignment, `cr-${creature.challengeRating}`, ...creature.habitat],
      description: creature.description,
      data: creature
    });
  });
  
  // Enregistrement des créatures Expansion Batch 1
  console.log(`[Lore] Enregistrement de ${EXPANDED_BESTIARY_BATCH_1.length} créatures (Expansion Batch 1)...`);
  EXPANDED_BESTIARY_BATCH_1.forEach(creature => {
    GlobalLoreRegistry.register({
      id: creature.id,
      name: creature.name,
      type: 'creature',
      tags: [creature.type, creature.size, creature.alignment, `cr-${creature.challengeRating}`, ...creature.habitat],
      description: creature.description,
      data: creature
    });
  });
  
  // Enregistrement des créatures Expansion Batch 2
  console.log(`[Lore] Enregistrement de ${EXPANDED_BESTIARY_BATCH_2.length} créatures (Expansion Batch 2)...`);
  EXPANDED_BESTIARY_BATCH_2.forEach(creature => {
    GlobalLoreRegistry.register({
      id: creature.id,
      name: creature.name,
      type: 'creature',
      tags: [creature.type, creature.size, creature.alignment, `cr-${creature.challengeRating}`, ...creature.habitat],
      description: creature.description,
      data: creature
    });
  });
  
  // Enregistrement des NPCs
  console.log(`[Lore] Enregistrement de ${ALL_NPCS.length} NPCs...`);
  ALL_NPCS.forEach(npc => {
    const tags = [npc.role, npc.personality, npc.region];
    if (npc.faction) tags.push(npc.faction);
    if (npc.isHostile) tags.push('hostile');
    
    GlobalLoreRegistry.register({
      id: npc.id,
      name: npc.name,
      type: 'npc',
      tags,
      description: npc.description,
      data: npc
    });
  });
  
  // Enregistrement des NPCs Expansion Batch 1
  console.log(`[Lore] Enregistrement de ${EXPANDED_NPCS_BATCH_1.length} NPCs (Expansion Batch 1)...`);
  EXPANDED_NPCS_BATCH_1.forEach(npc => {
    const tags = [npc.role, npc.personality, npc.region];
    if (npc.faction) tags.push(npc.faction);
    if (npc.isHostile) tags.push('hostile');
    
    GlobalLoreRegistry.register({
      id: npc.id,
      name: npc.name,
      type: 'npc',
      tags,
      description: npc.description,
      data: npc
    });
  });
  
  // Enregistrement des NPCs Expansion Batch 2
  console.log(`[Lore] Enregistrement de ${EXPANDED_NPCS_BATCH_2.length} NPCs (Expansion Batch 2)...`);
  EXPANDED_NPCS_BATCH_2.forEach(npc => {
    const tags = [npc.role, npc.personality, npc.region];
    if (npc.faction) tags.push(npc.faction);
    if (npc.isHostile) tags.push('hostile');
    
    GlobalLoreRegistry.register({
      id: npc.id,
      name: npc.name,
      type: 'npc',
      tags,
      description: npc.description,
      data: npc
    });
  });
  
  // Enregistrement des quêtes
  console.log(`[Lore] Enregistrement de ${ALL_QUESTS.length} quêtes...`);
  ALL_QUESTS.forEach(quest => {
    const tags = [quest.type, quest.category, quest.region, quest.questGiver, `level-${quest.suggestedLevel}`];
    if (quest.prerequisites?.faction) tags.push(quest.prerequisites.faction.id);
    
    GlobalLoreRegistry.register({
      id: quest.id,
      name: quest.name,
      type: 'quest',
      tags,
      description: quest.summary,
      data: quest
    });
  });
  
  // Enregistrement des items
  console.log(`[Lore] Enregistrement de ${ALL_ITEMS.length} items...`);
  ALL_ITEMS.forEach(item => {
    const tags = [item.type, item.rarity];
    if (item.category) tags.push(item.category);
    if (item.requirements?.class) tags.push(...item.requirements.class);
    
    GlobalLoreRegistry.register({
      id: item.id,
      name: item.name,
      type: 'item',
      tags,
      description: item.description,
      data: item
    });
  });
  
  // Enregistrement des locations
  console.log(`[Lore] Enregistrement de ${ALL_LOCATIONS.length} lieux...`);
  ALL_LOCATIONS.forEach(location => {
    const tags = [
      location.type, 
      location.biome, 
      location.region, 
      location.dangerLevel,
      `level-${location.suggestedLevel}`
    ];
    if (location.controlledBy) tags.push(location.controlledBy);
    
    GlobalLoreRegistry.register({
      id: location.id,
      name: location.name,
      type: 'location',
      tags,
      description: location.description,
      data: location
    });
  });
  
  const endTime = performance.now();
  const totalEntities = GlobalLoreRegistry.getAll().length;
  const totalCreatures = ALL_CREATURES.length + EXPANDED_BESTIARY_BATCH_1.length + EXPANDED_BESTIARY_BATCH_2.length;
  const totalNPCs = ALL_NPCS.length + EXPANDED_NPCS_BATCH_1.length + EXPANDED_NPCS_BATCH_2.length;
  
  console.log(`[Lore] ✅ Système de lore initialisé en ${(endTime - startTime).toFixed(2)}ms`);
  console.log(`[Lore] 📊 Total: ${totalEntities} entités enregistrées`);
  console.log(`[Lore] - Factions: ${ALL_FACTIONS.length}`);
  console.log(`[Lore] - Métiers: ${ALL_PROFESSIONS.length}`);
  console.log(`[Lore] - Ressources: ${ALL_RESOURCES.length}`);
  console.log(`[Lore] - Recettes: ${ALL_RECIPES.length}`);
  console.log(`[Lore] - Créatures: ${totalCreatures} (Base: ${ALL_CREATURES.length}, Expansion: ${EXPANDED_BESTIARY_BATCH_1.length + EXPANDED_BESTIARY_BATCH_2.length})`);
  console.log(`[Lore] - NPCs: ${totalNPCs} (Base: ${ALL_NPCS.length}, Expansion: ${EXPANDED_NPCS_BATCH_1.length + EXPANDED_NPCS_BATCH_2.length})`);
  console.log(`[Lore] - Quêtes: ${ALL_QUESTS.length}`);
  console.log(`[Lore] - Items: ${ALL_ITEMS.length}`);
  console.log(`[Lore] - Lieux: ${ALL_LOCATIONS.length}`);
  
  // Validation (optionnel en développement)
  if (process.env.NODE_ENV === 'development') {
    const issues = GlobalLoreRegistry.validate();
    if (issues.length > 0) {
      console.warn(`[Lore] ⚠️ Problèmes d'intégrité détectés:`, issues);
    } else {
      console.log('[Lore] ✅ Validation d\'intégrité réussie');
    }
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Re-export des modules principaux
export * from './schema';
export * from './registry';
export * from './search';
export * from './factions';
export * from './professions';
export * from './resources';
export * from './recipes';
export * from './bestiary';
export * from './npcs';
export * from './quests';
export * from './items-catalog';
export * from './world-map';

// Re-export des expansions
export * from './npcs-expansion-1';
export * from './npcs-expansion-2';
export * from './bestiary-expansion-1';
export * from './bestiary-expansion-2';

// Export des données brutes
export {
  ALL_FACTIONS,
  ALL_PROFESSIONS,
  ALL_RESOURCES,
  ALL_RECIPES,
  ALL_CREATURES,
  ALL_NPCS,
  ALL_QUESTS,
  ALL_ITEMS,
  ALL_LOCATIONS,
  EXPANDED_NPCS_BATCH_1,
  EXPANDED_NPCS_BATCH_2,
  EXPANDED_BESTIARY_BATCH_1,
  EXPANDED_BESTIARY_BATCH_2
};

// ============================================================================
// HELPERS RAPIDES POUR LE MJ IA
// ============================================================================

/**
 * Génère un briefing complet pour le MJ sur un lieu
 */
export function getBriefingForLocation(locationName: string, biome: string): string {
  return GlobalLoreSearch.generateBriefing({
    biome: biome,
    includeNPCs: true,
    includeCreatures: true,
    includeQuests: true,
    includeItems: true
  });
}

/**
 * Trouve créatures pour une rencontre aléatoire
 */
export function getRandomEncounter(biome: string, partyLevel: number) {
  return GlobalLoreSearch.findCreaturesForEncounter(biome, partyLevel);
}

/**
 * Trouve marchands disponibles dans une région
 */
export function getMerchantsInRegion(regionId: string) {
  return GlobalLoreSearch.findNPCsAtLocation(regionId);
}

/**
 * Trouve quêtes disponibles pour un joueur
 */
export function getAvailableQuests(playerLevel: number, factionId?: string) {
  return GlobalLoreSearch.findAvailableQuests(playerLevel, factionId);
}

/**
 * Recherche textuelle rapide
 */
export function searchLore(query: string) {
  return GlobalLoreSearch.search(query);
}

/**
 * Obtient statistiques du système de lore
 */
export function getLoreStats() {
  const all = GlobalLoreRegistry.getAll();
  const byType: Record<string, number> = {};
  
  all.forEach(entity => {
    byType[entity.type] = (byType[entity.type] || 0) + 1;
  });
  
  return {
    total: all.length,
    byType,
    factions: ALL_FACTIONS.length,
    professions: ALL_PROFESSIONS.length,
    resources: ALL_RESOURCES.length,
    recipes: ALL_RECIPES.length,
    creatures: ALL_CREATURES.length,
    npcs: ALL_NPCS.length,
    quests: ALL_QUESTS.length,
    items: ALL_ITEMS.length,
    locations: ALL_LOCATIONS.length
  };
}

// ============================================================================
// AUTO-INITIALISATION (optionnel)
// ============================================================================

// Décommenter pour initialisation automatique au chargement du module
// initializeLoreSystem();

export default {
  registry: GlobalLoreRegistry,
  search: GlobalLoreSearch,
  initialize: initializeLoreSystem,
  stats: getLoreStats
};
