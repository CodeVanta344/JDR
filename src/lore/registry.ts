/**
 * AETHELGARD LORE REGISTRY
 * Système d'indexation et d'agrégation de toutes les entités du lore
 * Permet au MJ IA d'accéder rapidement à n'importe quelle information
 */

import type {
  AnyEntity,
  EntityType,
  RegionId,
  FactionId,
  BiomeId,
  Faction,
  Quest,
  Location,
  Creature,
  NPC,
  Item,
  WorldEvent,
  Recipe,
  Resource,
  LootTable
} from './schema';

// ============================================================================
// REGISTRY TYPES
// ============================================================================

export interface LoreIndex {
  // Index par ID (accès O(1))
  byId: Map<string, AnyEntity>;
  
  // Index par type
  byType: Map<EntityType, Set<string>>;
  
  // Index par région
  byRegion: Map<RegionId, Set<string>>;
  
  // Index par faction
  byFaction: Map<FactionId, Set<string>>;
  
  // Index par tags
  byTag: Map<string, Set<string>>;
  
  // Index par biome
  byBiome: Map<BiomeId, Set<string>>;
  
  // Index full-text simple (mots-clés -> entity IDs)
  keywords: Map<string, Set<string>>;
}

export interface RegistryStats {
  totalEntities: number;
  byType: Record<EntityType, number>;
  byRegion: Record<RegionId, number>;
  byFaction: Record<FactionId, number>;
  indexSizeBytes: number;
  buildTimeMs: number;
}

// ============================================================================
// LORE REGISTRY CLASS
// ============================================================================

export class LoreRegistry {
  private index: LoreIndex;
  private entities: Map<string, AnyEntity>;
  private buildTime: number = 0;

  constructor() {
    this.entities = new Map();
    this.index = {
      byId: new Map(),
      byType: new Map(),
      byRegion: new Map(),
      byFaction: new Map(),
      byTag: new Map(),
      byBiome: new Map(),
      keywords: new Map()
    };
  }

  // ============================================================================
  // REGISTRATION
  // ============================================================================

  /**
   * Enregistre une entité dans le registry
   */
  register(entity: AnyEntity, type: EntityType): void {
    const id = entity.id;

    // Vérification unicité de l'ID
    if (this.entities.has(id)) {
      console.warn(`[LoreRegistry] Duplicate ID detected: ${id}. Overwriting.`);
    }

    // Stockage
    this.entities.set(id, entity);
    this.index.byId.set(id, entity);

    // Index par type
    if (!this.index.byType.has(type)) {
      this.index.byType.set(type, new Set());
    }
    this.index.byType.get(type)!.add(id);

    // Index par région
    if ('regionId' in entity && entity.regionId) {
      if (!this.index.byRegion.has(entity.regionId)) {
        this.index.byRegion.set(entity.regionId, new Set());
      }
      this.index.byRegion.get(entity.regionId)!.add(id);
    }

    // Index par faction
    if ('faction' in entity && entity.faction) {
      if (!this.index.byFaction.has(entity.faction)) {
        this.index.byFaction.set(entity.faction, new Set());
      }
      this.index.byFaction.get(entity.faction)!.add(id);
    }

    // Index par tags
    if (entity.tags) {
      entity.tags.forEach(tag => {
        if (!this.index.byTag.has(tag)) {
          this.index.byTag.set(tag, new Set());
        }
        this.index.byTag.get(tag)!.add(id);
      });
    }

    // Index par biome
    if ('biome' in entity && entity.biome) {
      if (!this.index.byBiome.has(entity.biome)) {
        this.index.byBiome.set(entity.biome, new Set());
      }
      this.index.byBiome.get(entity.biome)!.add(id);
    }
    if ('habitat' in entity && entity.habitat) {
      entity.habitat.forEach(biome => {
        if (!this.index.byBiome.has(biome)) {
          this.index.byBiome.set(biome, new Set());
        }
        this.index.byBiome.get(biome)!.add(id);
      });
    }

    // Index keywords (full-text simple)
    this.indexKeywords(id, entity);
  }

  /**
   * Enregistre plusieurs entités d'un coup
   */
  registerBatch<T extends AnyEntity>(entities: T[], type: EntityType): void {
    entities.forEach(entity => this.register(entity, type));
  }

  /**
   * Index les mots-clés d'une entité pour recherche full-text
   */
  private indexKeywords(id: string, entity: AnyEntity): void {
    const text = `${entity.name} ${entity.summary} ${entity.description}`.toLowerCase();
    const words = text.match(/\w+/g) || [];
    
    // Filtrer les mots communs (stop words)
    const stopWords = new Set(['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'à', 'en', 'dans', 'par', 'pour', 'sur', 'avec']);
    
    words.forEach(word => {
      if (word.length > 2 && !stopWords.has(word)) {
        if (!this.index.keywords.has(word)) {
          this.index.keywords.set(word, new Set());
        }
        this.index.keywords.get(word)!.add(id);
      }
    });
  }

  // ============================================================================
  // GETTERS
  // ============================================================================

  /**
   * Récupère une entité par son ID
   */
  get<T extends AnyEntity>(id: string): T | undefined {
    return this.entities.get(id) as T | undefined;
  }

  /**
   * Récupère toutes les entités d'un type donné
   */
  getByType<T extends AnyEntity>(type: EntityType): T[] {
    const ids = this.index.byType.get(type);
    if (!ids) return [];
    return Array.from(ids).map(id => this.entities.get(id) as T).filter(Boolean);
  }

  /**
   * Récupère toutes les entités d'une région
   */
  getByRegion<T extends AnyEntity>(regionId: RegionId): T[] {
    const ids = this.index.byRegion.get(regionId);
    if (!ids) return [];
    return Array.from(ids).map(id => this.entities.get(id) as T).filter(Boolean);
  }

  /**
   * Récupère toutes les entités liées à une faction
   */
  getByFaction<T extends AnyEntity>(factionId: FactionId): T[] {
    const ids = this.index.byFaction.get(factionId);
    if (!ids) return [];
    return Array.from(ids).map(id => this.entities.get(id) as T).filter(Boolean);
  }

  /**
   * Récupère toutes les entités avec un tag donné
   */
  getByTag<T extends AnyEntity>(tag: string): T[] {
    const ids = this.index.byTag.get(tag);
    if (!ids) return [];
    return Array.from(ids).map(id => this.entities.get(id) as T).filter(Boolean);
  }

  /**
   * Récupère toutes les entités d'un biome
   */
  getByBiome<T extends AnyEntity>(biome: BiomeId): T[] {
    const ids = this.index.byBiome.get(biome);
    if (!ids) return [];
    return Array.from(ids).map(id => this.entities.get(id) as T).filter(Boolean);
  }

  /**
   * Récupère toutes les entités enregistrées
   */
  getAll<T extends AnyEntity>(): T[] {
    return Array.from(this.entities.values()) as T[];
  }

  /**
   * Recherche full-text simple
   */
  search(query: string): AnyEntity[] {
    const words = query.toLowerCase().match(/\w+/g) || [];
    const results = new Set<string>();

    words.forEach(word => {
      const ids = this.index.keywords.get(word);
      if (ids) {
        ids.forEach(id => results.add(id));
      }
    });

    return Array.from(results).map(id => this.entities.get(id)!);
  }

  // ============================================================================
  // HELPERS FOR AI
  // ============================================================================

  /**
   * Génère un briefing pour le MJ IA sur une région
   */
  getBriefing(options: {
    regionId?: RegionId;
    locationId?: string;
    depth?: 'summary' | 'detailed';
  }): string {
    const { regionId, locationId, depth = 'summary' } = options;
    const lines: string[] = [];

    if (regionId) {
      lines.push(`=== BRIEFING: ${regionId.toUpperCase()} ===\n`);
      
      // Locations
      const locations = this.getByRegion<Location>(regionId).filter(l => l.type !== 'dungeon');
      lines.push(`**Lieux (${locations.length}):**`);
      locations.forEach(loc => {
        lines.push(`- ${loc.name} (${loc.type}): ${loc.summary}`);
      });

      // NPCs
      const npcs = this.getByRegion<NPC>(regionId);
      lines.push(`\n**PNJ (${npcs.length}):**`);
      npcs.slice(0, 10).forEach(npc => {
        lines.push(`- ${npc.name} (${npc.role}): ${npc.summary}`);
      });

      // Creatures
      const creatures = this.getByRegion<Creature>(regionId);
      lines.push(`\n**Créatures communes (${creatures.length}):**`);
      const commonCreatures = creatures.filter(c => c.rarity === 'common').slice(0, 5);
      commonCreatures.forEach(c => lines.push(`- ${c.name} (${c.type})`));

      // Quests
      const quests = this.getByRegion<Quest>(regionId);
      lines.push(`\n**Quêtes disponibles (${quests.length}):**`);
      quests.slice(0, 5).forEach(q => {
        lines.push(`- ${q.name} (${q.type}, Lvl ${q.level}): ${q.summary}`);
      });
    }

    if (locationId) {
      const location = this.get<Location>(locationId);
      if (location) {
        lines.push(`\n=== LIEU: ${location.name} ===`);
        lines.push(depth === 'detailed' ? location.description : location.summary);
        
        if (location.npcs) {
          lines.push(`\n**PNJ présents:**`);
          location.npcs.forEach(npcId => {
            const npc = this.get<NPC>(npcId);
            if (npc) lines.push(`- ${npc.name} (${npc.role})`);
          });
        }
      }
    }

    return lines.join('\n');
  }

  /**
   * Récupère les statistiques du registry
   */
  getStats(): RegistryStats {
    const byType: Record<EntityType, number> = {} as any;
    this.index.byType.forEach((ids, type) => {
      byType[type] = ids.size;
    });

    const byRegion: Record<RegionId, number> = {} as any;
    this.index.byRegion.forEach((ids, region) => {
      byRegion[region] = ids.size;
    });

    const byFaction: Record<FactionId, number> = {} as any;
    this.index.byFaction.forEach((ids, faction) => {
      byFaction[faction] = ids.size;
    });

    return {
      totalEntities: this.entities.size,
      byType,
      byRegion,
      byFaction,
      indexSizeBytes: JSON.stringify(Array.from(this.index.byId.keys())).length,
      buildTimeMs: this.buildTime
    };
  }

  /**
   * Construit tous les index (appelé après registration)
   */
  build(): void {
    const start = performance.now();
    // Les index sont construits au fur et à mesure lors de register()
    this.buildTime = performance.now() - start;
    console.log(`[LoreRegistry] Index built in ${this.buildTime.toFixed(2)}ms`);
  }

  /**
   * Valide l'intégrité du registry
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Vérifier unicité des IDs
    const ids = new Set<string>();
    this.entities.forEach((entity, id) => {
      if (ids.has(id)) {
        errors.push(`Duplicate ID: ${id}`);
      }
      ids.add(id);
    });

    // Vérifier références (NPCs -> Factions, Quests -> NPCs, etc.)
    this.getByType<NPC>('npc').forEach(npc => {
      if (npc.faction && !this.get(npc.faction)) {
        errors.push(`NPC ${npc.id} references non-existent faction: ${npc.faction}`);
      }
      if (npc.relationships) {
        npc.relationships.forEach(rel => {
          if (!this.get(rel.npcId)) {
            errors.push(`NPC ${npc.id} has relationship with non-existent NPC: ${rel.npcId}`);
          }
        });
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const loreRegistry = new LoreRegistry();
