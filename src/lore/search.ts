/**
 * AETHELGARD LORE SEARCH API
 * API de recherche avancée pour le MJ IA
 * Permet de trouver rapidement des entités selon divers critères
 */

import { loreRegistry } from './registry';
import type {
  AnyEntity,
  EntityType,
  RegionId,
  FactionId,
  BiomeId,
  DangerLevel,
  Quest,
  Location,
  Creature,
  NPC,
  Item,
  QuestType,
  SkillType
} from './schema';

// ============================================================================
// SEARCH FILTERS
// ============================================================================

export interface SearchFilters {
  // Filtres généraux
  type?: EntityType | EntityType[];
  regionId?: RegionId | RegionId[];
  tags?: string[]; // Match ANY tag
  tagsAll?: string[]; // Match ALL tags
  
  // Filtres spécifiques créatures
  creatureType?: string[];
  biome?: BiomeId | BiomeId[];
  dangerLevel?: DangerLevel[];
  crMin?: number;
  crMax?: number;
  
  // Filtres spécifiques PNJ
  npcRole?: string[];
  faction?: FactionId | FactionId[];
  
  // Filtres spécifiques quêtes
  questType?: QuestType[];
  levelMin?: number;
  levelMax?: number;
  questGiver?: string; // NPC ID
  
  // Filtres spécifiques items
  rarity?: string[];
  itemCategory?: string[];
  minValue?: number;
  maxValue?: number;
  
  // Filtres spécifiques locations
  locationType?: string[];
  hasService?: string[]; // 'inn', 'shop', 'trainer', etc.
  
  // Recherche textuelle
  query?: string; // Recherche full-text
  
  // Pagination
  limit?: number;
  offset?: number;
  
  // Tri
  sortBy?: 'name' | 'level' | 'cr' | 'value' | 'rarity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult<T extends AnyEntity = AnyEntity> {
  results: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// SEARCH ENGINE
// ============================================================================

export class LoreSearchEngine {
  /**
   * Recherche avancée avec filtres multiples
   */
  search<T extends AnyEntity = AnyEntity>(filters: SearchFilters): SearchResult<T> {
    let results: AnyEntity[] = [];

    // 1. Filtrage par type
    if (filters.type) {
      const types = Array.isArray(filters.type) ? filters.type : [filters.type];
      types.forEach(type => {
        results.push(...loreRegistry.getByType(type));
      });
    } else {
      // Toutes les entités
      results = this.getAllEntities();
    }

    // 2. Filtrage par région
    if (filters.regionId) {
      const regions = Array.isArray(filters.regionId) ? filters.regionId : [filters.regionId];
      results = results.filter(e => 
        'regionId' in e && e.regionId && regions.includes(e.regionId)
      );
    }

    // 3. Filtrage par tags (ANY)
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(e => 
        e.tags && e.tags.some(tag => filters.tags!.includes(tag))
      );
    }

    // 4. Filtrage par tags (ALL)
    if (filters.tagsAll && filters.tagsAll.length > 0) {
      results = results.filter(e => 
        e.tags && filters.tagsAll!.every(tag => e.tags.includes(tag))
      );
    }

    // 5. Filtres spécifiques créatures
    if (filters.creatureType) {
      results = results.filter(e => 
        'type' in e && filters.creatureType!.includes((e as any).type)
      );
    }

    if (filters.biome) {
      const biomes = Array.isArray(filters.biome) ? filters.biome : [filters.biome];
      results = results.filter(e => 
        'habitat' in e && e.habitat && 
        (e.habitat as BiomeId[]).some(b => biomes.includes(b))
      );
    }

    if (filters.dangerLevel) {
      results = results.filter(e => 
        'dangerLevel' in e && filters.dangerLevel!.includes(e.dangerLevel as DangerLevel)
      );
    }

    if (filters.crMin !== undefined || filters.crMax !== undefined) {
      results = results.filter(e => {
        if (!('combat' in e) || !(e as any).combat.cr) return false;
        const cr = (e as any).combat.cr;
        if (filters.crMin !== undefined && cr < filters.crMin) return false;
        if (filters.crMax !== undefined && cr > filters.crMax) return false;
        return true;
      });
    }

    // 6. Filtres spécifiques PNJ
    if (filters.npcRole) {
      results = results.filter(e => 
        'role' in e && filters.npcRole!.includes((e as any).role)
      );
    }

    if (filters.faction) {
      const factions = Array.isArray(filters.faction) ? filters.faction : [filters.faction];
      results = results.filter(e => 
        'faction' in e && e.faction && factions.includes(e.faction)
      );
    }

    // 7. Filtres spécifiques quêtes
    if (filters.questType) {
      results = results.filter(e => 
        'type' in e && filters.questType!.includes((e as Quest).type)
      );
    }

    if (filters.levelMin !== undefined || filters.levelMax !== undefined) {
      results = results.filter(e => {
        if (!('level' in e)) return false;
        const level = (e as any).level;
        if (filters.levelMin !== undefined && level < filters.levelMin) return false;
        if (filters.levelMax !== undefined && level > filters.levelMax) return false;
        return true;
      });
    }

    if (filters.questGiver) {
      results = results.filter(e => 
        'giver' in e && (e as Quest).giver === filters.questGiver
      );
    }

    // 8. Filtres spécifiques items
    if (filters.rarity) {
      results = results.filter(e => 
        'rarity' in e && filters.rarity!.includes((e as any).rarity)
      );
    }

    if (filters.itemCategory) {
      results = results.filter(e => 
        'category' in e && filters.itemCategory!.includes((e as any).category)
      );
    }

    if (filters.minValue !== undefined || filters.maxValue !== undefined) {
      results = results.filter(e => {
        if (!('value' in e)) return false;
        const value = (e as Item).value;
        if (filters.minValue !== undefined && value < filters.minValue) return false;
        if (filters.maxValue !== undefined && value > filters.maxValue) return false;
        return true;
      });
    }

    // 9. Filtres spécifiques locations
    if (filters.locationType) {
      results = results.filter(e => 
        'type' in e && filters.locationType!.includes((e as Location).type)
      );
    }

    if (filters.hasService) {
      results = results.filter(e => {
        if (!('services' in e) || !e.services) return false;
        const services = (e as Location).services!;
        return filters.hasService!.some(service => (services as any)[service] === true);
      });
    }

    // 10. Recherche textuelle (full-text)
    if (filters.query) {
      const queryResults = loreRegistry.search(filters.query);
      const queryIds = new Set(queryResults.map(r => r.id));
      results = results.filter(e => queryIds.has(e.id));
    }

    // 11. Tri
    if (filters.sortBy) {
      results = this.sort(results, filters.sortBy, filters.sortOrder || 'asc');
    }

    // 12. Pagination
    const total = results.length;
    const limit = filters.limit || 50;
    const offset = filters.offset || 0;
    const paginated = results.slice(offset, offset + limit);

    return {
      results: paginated as T[],
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      hasMore: offset + limit < total
    };
  }

  /**
   * Tri des résultats
   */
  private sort(entities: AnyEntity[], sortBy: string, sortOrder: 'asc' | 'desc'): AnyEntity[] {
    return entities.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortBy) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'level':
          aVal = 'level' in a ? (a as any).level : 0;
          bVal = 'level' in b ? (b as any).level : 0;
          break;
        case 'cr':
          aVal = 'combat' in a && (a as any).combat?.cr ? (a as any).combat.cr : 0;
          bVal = 'combat' in b && (b as any).combat?.cr ? (b as any).combat.cr : 0;
          break;
        case 'value':
          aVal = 'value' in a ? (a as any).value : 0;
          bVal = 'value' in b ? (b as any).value : 0;
          break;
        case 'rarity':
          const rarityOrder = ['common', 'uncommon', 'rare', 'very-rare', 'legendary', 'artifact'];
          aVal = 'rarity' in a ? rarityOrder.indexOf((a as any).rarity) : -1;
          bVal = 'rarity' in b ? rarityOrder.indexOf((b as any).rarity) : -1;
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Récupère toutes les entités du registry
   */
  private getAllEntities(): AnyEntity[] {
    const types: EntityType[] = ['faction', 'quest', 'location', 'creature', 'npc', 'item', 'event', 'recipe', 'resource', 'loot-table'];
    const all: AnyEntity[] = [];
    types.forEach(type => {
      all.push(...loreRegistry.getByType(type));
    });
    return all;
  }

  // ============================================================================
  // CONVENIENCE METHODS FOR AI
  // ============================================================================

  /**
   * Trouve des créatures adaptées à une région et un niveau
   */
  findCreaturesForEncounter(regionId: RegionId, partyLevel: number, count: number = 3): Creature[] {
    const minCr = Math.max(1, partyLevel - 2);
    const maxCr = partyLevel + 2;

    const results = this.search<Creature>({
      type: 'creature',
      regionId,
      crMin: minCr,
      crMax: maxCr,
      limit: count * 2 // Récupérer plus pour avoir de la variété
    });

    // Mélanger et retourner
    return results.results
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  /**
   * Trouve des quêtes disponibles pour un joueur
   */
  findAvailableQuests(playerLevel: number, regionId?: RegionId, completed: string[] = []): Quest[] {
    const results = this.search<Quest>({
      type: 'quest',
      regionId,
      levelMin: Math.max(1, playerLevel - 3),
      levelMax: playerLevel + 3,
      sortBy: 'level',
      limit: 20
    });

    // Filtrer les quêtes déjà complétées
    return results.results.filter(q => !completed.includes(q.id));
  }

  /**
   * Trouve des PNJ dans un lieu
   */
  findNPCsAtLocation(locationId: string): NPC[] {
    const location = loreRegistry.get<Location>(locationId);
    if (!location || !location.npcs) return [];

    return location.npcs
      .map(id => loreRegistry.get<NPC>(id))
      .filter(Boolean) as NPC[];
  }

  /**
   * Trouve des marchands vendant un type d'item
   */
  findMerchantsSellingCategory(category: string, regionId?: RegionId): NPC[] {
    const filters: SearchFilters = {
      type: 'npc',
      npcRole: ['merchant', 'blacksmith', 'alchemist']
    };
    if (regionId) filters.regionId = regionId;

    return this.search<NPC>(filters).results.filter(npc => 
      npc.services?.trades && 
      npc.inventory?.some(itemId => {
        const item = loreRegistry.get<Item>(itemId);
        return item && item.category === category;
      })
    );
  }

  /**
   * Trouve des recettes craft pour un métier
   */
  findRecipesForProfession(profession: string, minLevel: number = 1, maxLevel: number = 100): any[] {
    // TODO: Implémenter quand on aura les recipes
    return [];
  }

  /**
   * Génère un briefing contextuel pour le MJ
   */
  generateBriefing(context: {
    location?: string;
    region?: RegionId;
    partyLevel?: number;
    questsActive?: string[];
  }): string {
    const lines: string[] = [];

    lines.push('=== BRIEFING MJ ===\n');

    if (context.location) {
      const loc = loreRegistry.get<Location>(context.location);
      if (loc) {
        lines.push(`**Lieu actuel:** ${loc.name}`);
        lines.push(loc.description);
        lines.push('');

        // PNJ présents
        const npcs = this.findNPCsAtLocation(context.location);
        if (npcs.length > 0) {
          lines.push('**PNJ présents:**');
          npcs.forEach(npc => {
            lines.push(`- ${npc.name} (${npc.role}): ${npc.summary}`);
          });
          lines.push('');
        }

        // Quêtes disponibles ici
        const quests = this.search<Quest>({
          type: 'quest',
          query: loc.name
        }).results.slice(0, 3);

        if (quests.length > 0) {
          lines.push('**Quêtes disponibles:**');
          quests.forEach(q => {
            lines.push(`- ${q.name} (Lvl ${q.level})`);
          });
          lines.push('');
        }
      }
    }

    if (context.region && context.partyLevel) {
      const creatures = this.findCreaturesForEncounter(context.region, context.partyLevel, 5);
      if (creatures.length > 0) {
        lines.push('**Créatures possibles pour rencontre aléatoire:**');
        creatures.forEach(c => {
          lines.push(`- ${c.name} (CR ${c.combat.cr}, ${c.habitat.join('/')})`);
        });
        lines.push('');
      }
    }

    return lines.join('\n');
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const loreSearch = new LoreSearchEngine();
