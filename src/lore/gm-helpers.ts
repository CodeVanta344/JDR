/**
 * INTÉGRATION MJ IA - Helpers pour utilisation du lore par le MJ
 */

import { GlobalLoreRegistry } from './registry';
import { GlobalLoreCache, getCachedMerchants, getCachedCreaturesByCR, getCachedQuestsByLevel } from './optimization';

// ============================================================================
// HELPERS POUR LE MJ IA
// ============================================================================

/**
 * Génère contexte complet pour une location
 */
export function getLocationContext(locationId: string): string {
  const location = GlobalLoreRegistry.findById(locationId);
  if (!location) return '';

  const data = location.data;
  let context = `# ${data.name}\n\n`;
  context += `**Type:** ${data.type} | **Région:** ${data.region} | **Biome:** ${data.biome}\n`;
  context += `**Danger:** ${data.dangerLevel} | **Niveau suggéré:** ${data.suggestedLevel}\n\n`;
  context += `${data.description}\n\n`;

  if (data.lore) {
    context += `**Lore:** ${data.lore}\n\n`;
  }

  if (data.population) {
    context += `**Population:** ${data.population.toLocaleString()} habitants\n`;
  }

  if (data.services) {
    const available = Object.entries(data.services)
      .filter(([_, hasIt]) => hasIt)
      .map(([service, _]) => service);
    if (available.length > 0) {
      context += `**Services disponibles:** ${available.join(', ')}\n\n`;
    }
  }

  if (data.npcs && data.npcs.length > 0) {
    context += `**NPCs présents:** ${data.npcs.length} personnages notables\n`;
  }

  if (data.creatures && data.creatures.length > 0) {
    context += `**Créatures communes:** ${data.creatures.join(', ')}\n`;
  }

  if (data.pointsOfInterest && data.pointsOfInterest.length > 0) {
    context += `\n**Points d'intérêt:**\n`;
    data.pointsOfInterest.forEach((poi: any) => {
      context += `- **${poi.name}:** ${poi.description}\n`;
    });
  }

  return context;
}

/**
 * Génère contexte NPC pour conversation
 */
export function getNPCContext(npcId: string): string {
  const npc = GlobalLoreRegistry.findById(npcId);
  if (!npc) return '';

  const data = npc.data;
  let context = `# ${data.name}\n\n`;
  context += `**Rôle:** ${data.role} | **Personnalité:** ${data.personality}\n`;
  context += `**Race:** ${data.race} | **Classe:** ${data.class}\n\n`;
  context += `${data.description}\n\n`;

  if (data.backstory) {
    context += `**Backstory:** ${data.backstory}\n\n`;
  }

  if (data.faction) {
    context += `**Faction:** ${data.faction}\n`;
  }

  if (data.services && data.services.length > 0) {
    context += `**Services offerts:** ${data.services.join(', ')}\n`;
  }

  if (data.questsGiven && data.questsGiven.length > 0) {
    context += `**Quêtes disponibles:** ${data.questsGiven.length}\n`;
  }

  if (data.dialogue) {
    context += `\n**Style de dialogue:** ${data.dialogue.greeting}\n`;
  }

  return context;
}

/**
 * Génère rencontre aléatoire appropriée
 */
export function generateEncounter(partyLevel: number, biome: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): any[] {
  const targetCR = difficulty === 'easy' ? partyLevel - 1 : 
                   difficulty === 'hard' ? partyLevel + 2 : 
                   partyLevel;

  const creatures = getCachedCreaturesByCR(targetCR);
  
  if (creatures.length === 0) {
    return [];
  }

  // Filtrer par biome si possible
  const biomeFit = creatures.filter((c: any) => 
    c.habitat && c.habitat.includes(biome)
  );

  const pool = biomeFit.length > 0 ? biomeFit : creatures;
  const count = difficulty === 'easy' ? 1 : difficulty === 'hard' ? 4 : 2;

  const encounter = [];
  for (let i = 0; i < count; i++) {
    const random = Math.floor(Math.random() * pool.length);
    encounter.push(pool[random]);
  }

  return encounter;
}

/**
 * Propose quêtes appropriées au niveau joueur
 */
export function suggestQuests(playerLevel: number, factionId?: string): any[] {
  const quests = getCachedQuestsByLevel(playerLevel);
  
  if (!factionId) {
    return quests.slice(0, 3);
  }

  // Filtrer par faction si spécifié
  const factionQuests = quests.filter((q: any) => 
    q.questGiver && 
    GlobalLoreRegistry.findById(q.questGiver)?.data?.faction === factionId
  );

  return factionQuests.length > 0 ? factionQuests.slice(0, 3) : quests.slice(0, 3);
}

/**
 * Génère inventaire marchand dynamique
 */
export function generateMerchantInventory(merchantId: string, playerLevel: number): any[] {
  const npc = GlobalLoreRegistry.findById(merchantId);
  if (!npc || npc.data.role !== 'merchant') return [];

  const merchantData = npc.data;
  const baseInventory = merchantData.inventory || [];
  
  // Ajouter items aléatoires selon niveau joueur
  const { ALL_ITEMS } = require('./items-catalog');
  const appropriateItems = ALL_ITEMS.filter((item: any) => {
    const suggestedLevel = Math.floor(item.value / 100);
    return suggestedLevel <= playerLevel + 3 && !item.questItem && !item.bound;
  });

  const randomItems = [];
  const count = 5 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    const random = Math.floor(Math.random() * appropriateItems.length);
    randomItems.push(appropriateItems[random]);
  }

  return [...baseInventory, ...randomItems];
}

/**
 * Calcule réputation gain/loss après action
 */
export function calculateReputationChange(
  actionType: 'quest' | 'kill' | 'trade' | 'betray',
  targetFaction: string,
  magnitude: number
): Map<string, number> {
  const changes = new Map<string, number>();
  changes.set(targetFaction, magnitude);

  const faction = GlobalLoreRegistry.findById(targetFaction);
  if (!faction) return changes;

  const factionData = faction.data;

  // Appliquer répercussions sur alliés/ennemis
  if (factionData.allies) {
    factionData.allies.forEach((allyId: string) => {
      changes.set(allyId, Math.floor(magnitude * 0.5));
    });
  }

  if (factionData.enemies) {
    factionData.enemies.forEach((enemyId: string) => {
      changes.set(enemyId, Math.floor(magnitude * -0.5));
    });
  }

  return changes;
}

/**
 * Vérifie si joueur peut accéder à quête
 */
export function canAccessQuest(
  playerLevel: number,
  completedQuests: string[],
  factionReps: Record<string, number>,
  questId: string
): { canAccess: boolean; reason?: string } {
  const quest = GlobalLoreRegistry.findById(questId);
  if (!quest) return { canAccess: false, reason: 'Quête introuvable' };

  const questData = quest.data;

  // Vérifier niveau
  if (questData.prerequisites?.level && playerLevel < questData.prerequisites.level) {
    return { canAccess: false, reason: `Niveau ${questData.prerequisites.level} requis` };
  }

  // Vérifier quêtes préalables
  if (questData.prerequisites?.quests) {
    const missing = questData.prerequisites.quests.find((qId: string) => !completedQuests.includes(qId));
    if (missing) {
      return { canAccess: false, reason: 'Quêtes préalables non complétées' };
    }
  }

  // Vérifier réputation faction
  if (questData.prerequisites?.faction) {
    const factionId = questData.prerequisites.faction.id;
    const required = questData.prerequisites.faction.reputation;
    const current = factionReps[factionId] || 0;
    
    if (current < required) {
      return { canAccess: false, reason: `Réputation ${required} requise avec ${factionId}` };
    }
  }

  return { canAccess: true };
}

/**
 * Génère loot approprié après combat
 */
export function generateLoot(cr: number, quantity: number = 1): any[] {
  const loot = [];
  const { ALL_ITEMS } = require('./items-catalog');
  
  const maxValue = cr * 50;
  const availableItems = ALL_ITEMS.filter((item: any) => 
    item.value <= maxValue && 
    !item.questItem && 
    !item.bound &&
    item.rarity !== 'artifact'
  );

  for (let i = 0; i < quantity; i++) {
    const random = Math.floor(Math.random() * availableItems.length);
    loot.push(availableItems[random]);
  }

  // Gold aléatoire
  const goldAmount = Math.floor(cr * 10 + Math.random() * cr * 20);
  loot.push({ type: 'currency', name: 'Gold', amount: goldAmount });

  return loot;
}

/**
 * Trouve route optimale entre deux locations
 */
export function findRoute(startId: string, endId: string): any[] {
  const start = GlobalLoreRegistry.findById(startId);
  const end = GlobalLoreRegistry.findById(endId);
  
  if (!start || !end) return [];

  // Simple BFS pour pathfinding
  const queue = [{ location: start, path: [start], totalTime: 0 }];
  const visited = new Set<string>([startId]);

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.location.id === endId) {
      return current.path;
    }

    const connections = current.location.data.connectedTo || [];
    for (const conn of connections) {
      if (!visited.has(conn.locationId)) {
        visited.add(conn.locationId);
        const nextLoc = GlobalLoreRegistry.findById(conn.locationId);
        if (nextLoc) {
          queue.push({
            location: nextLoc,
            path: [...current.path, nextLoc],
            totalTime: current.totalTime + conn.travelTime
          });
        }
      }
    }
  }

  return [];
}

/**
 * Génère briefing complet pour le MJ
 */
export function generateGMBriefing(
  locationId: string,
  partyLevel: number,
  includeQuests: boolean = true,
  includeEncounters: boolean = true
): string {
  let briefing = '';

  // Location context
  briefing += getLocationContext(locationId) + '\n\n';

  // NPCs disponibles
  const location = GlobalLoreRegistry.findById(locationId);
  if (location?.data.npcs) {
    briefing += '## NPCs Disponibles\n\n';
    location.data.npcs.forEach((npcId: string) => {
      const npc = GlobalLoreRegistry.findById(npcId);
      if (npc) {
        briefing += `### ${npc.data.name} (${npc.data.role})\n`;
        briefing += `${npc.data.description}\n\n`;
      }
    });
  }

  // Quêtes disponibles
  if (includeQuests) {
    const quests = suggestQuests(partyLevel);
    if (quests.length > 0) {
      briefing += '## Quêtes Disponibles\n\n';
      quests.forEach((quest: any) => {
        briefing += `### ${quest.name} (Niveau ${quest.suggestedLevel})\n`;
        briefing += `${quest.summary}\n`;
        briefing += `**Donneur:** ${quest.questGiver}\n\n`;
      });
    }
  }

  // Rencontres possibles
  if (includeEncounters && location?.data.creatures) {
    briefing += '## Rencontres Possibles\n\n';
    const encounter = generateEncounter(partyLevel, location.data.biome);
    encounter.forEach((creature: any) => {
      briefing += `- **${creature.name}** (CR ${creature.challengeRating}): ${creature.description}\n`;
    });
  }

  return briefing;
}

/**
 * Export contexte complet pour prompt MJ
 */
export function exportGMContext(): string {
  const stats = GlobalLoreRegistry.getAll();
  let context = '# AETHELGARD LORE CONTEXT\n\n';
  
  context += `**Total Entities:** ${stats.length}\n\n`;
  
  context += '## Available Systems\n\n';
  context += '- **Factions:** 15 organizations with relationships\n';
  context += '- **NPCs:** 38 unique characters\n';
  context += '- **Creatures:** 15+ types for encounters\n';
  context += '- **Quests:** 8 structured quest lines\n';
  context += '- **Items:** 151+ weapons, armor, consumables\n';
  context += '- **Locations:** 62+ cities, dungeons, landmarks\n';
  context += '- **Professions:** 14 crafting/gathering skills\n';
  context += '- **Resources:** 60+ materials to gather\n';
  context += '- **Recipes:** 37 crafting recipes\n\n';
  
  context += '## Quick Reference\n\n';
  context += 'Use these helpers:\n';
  context += '- `getLocationContext(id)` - Full location details\n';
  context += '- `getNPCContext(id)` - NPC personality & services\n';
  context += '- `generateEncounter(level, biome)` - Random encounters\n';
  context += '- `suggestQuests(level, faction?)` - Available quests\n';
  context += '- `generateMerchantInventory(id, level)` - Shop stock\n';
  context += '- `generateLoot(cr, quantity)` - Combat loot\n';
  context += '- `findRoute(startId, endId)` - Travel pathfinding\n\n';

  return context;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  getLocationContext,
  getNPCContext,
  generateEncounter,
  suggestQuests,
  generateMerchantInventory,
  calculateReputationChange,
  canAccessQuest,
  generateLoot,
  findRoute,
  generateGMBriefing,
  exportGMContext
};
