/**
 * OPTIMISATIONS PERFORMANCE - Système de cache et lazy loading
 */

// ============================================================================
// CACHE LAYER
// ============================================================================

class LoreCache {
  private cache: Map<string, any> = new Map();
  private ttl: Map<string, number> = new Map();
  private defaultTTL: number = 300000; // 5 minutes

  set(key: string, value: any, ttl?: number): void {
    this.cache.set(key, value);
    this.ttl.set(key, Date.now() + (ttl || this.defaultTTL));
  }

  get(key: string): any | null {
    const expiry = this.ttl.get(key);
    if (!expiry || Date.now() > expiry) {
      this.cache.delete(key);
      this.ttl.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
    this.ttl.clear();
  }

  clearExpired(): void {
    const now = Date.now();
    for (const [key, expiry] of this.ttl.entries()) {
      if (now > expiry) {
        this.cache.delete(key);
        this.ttl.delete(key);
      }
    }
  }
}

export const GlobalLoreCache = new LoreCache();

// Auto-nettoyage toutes les minutes
setInterval(() => GlobalLoreCache.clearExpired(), 60000);

// ============================================================================
// LAZY LOADING HELPERS
// ============================================================================

export async function lazyLoadItems() {
  if (GlobalLoreCache.has('items')) {
    return GlobalLoreCache.get('items');
  }
  
  const { ALL_ITEMS } = await import('./items-catalog');
  GlobalLoreCache.set('items', ALL_ITEMS);
  return ALL_ITEMS;
}

export async function lazyLoadLocations() {
  if (GlobalLoreCache.has('locations')) {
    return GlobalLoreCache.get('locations');
  }
  
  const { ALL_LOCATIONS } = await import('./world-map');
  GlobalLoreCache.set('locations', ALL_LOCATIONS);
  return ALL_LOCATIONS;
}

export async function lazyLoadQuests() {
  if (GlobalLoreCache.has('quests')) {
    return GlobalLoreCache.get('quests');
  }
  
  const { ALL_QUESTS } = await import('./quests');
  GlobalLoreCache.set('quests', ALL_QUESTS);
  return ALL_QUESTS;
}

// ============================================================================
// INDEX OPTIMISÉ POUR RECHERCHE RAPIDE
// ============================================================================

interface IndexEntry {
  id: string;
  name: string;
  type: string;
  tags: string[];
}

class FastSearchIndex {
  private index: Map<string, IndexEntry[]> = new Map();
  private nameIndex: Map<string, IndexEntry> = new Map();
  private tagIndex: Map<string, IndexEntry[]> = new Map();

  build(entities: IndexEntry[]): void {
    console.log('[FastIndex] Building search index...');
    const start = performance.now();

    entities.forEach(entity => {
      // Index par type
      if (!this.index.has(entity.type)) {
        this.index.set(entity.type, []);
      }
      this.index.get(entity.type)!.push(entity);

      // Index par nom (lowercase pour recherche insensible casse)
      this.nameIndex.set(entity.name.toLowerCase(), entity);

      // Index par tag
      entity.tags.forEach(tag => {
        if (!this.tagIndex.has(tag)) {
          this.tagIndex.set(tag, []);
        }
        this.tagIndex.get(tag)!.push(entity);
      });
    });

    const end = performance.now();
    console.log(`[FastIndex] ✅ Index built in ${(end - start).toFixed(2)}ms`);
    console.log(`[FastIndex] - ${this.nameIndex.size} unique names`);
    console.log(`[FastIndex] - ${this.tagIndex.size} unique tags`);
    console.log(`[FastIndex] - ${this.index.size} types`);
  }

  findByType(type: string): IndexEntry[] {
    return this.index.get(type) || [];
  }

  findByName(name: string): IndexEntry | undefined {
    return this.nameIndex.get(name.toLowerCase());
  }

  findByTag(tag: string): IndexEntry[] {
    return this.tagIndex.get(tag) || [];
  }

  search(query: string): IndexEntry[] {
    const lowerQuery = query.toLowerCase();
    const results: IndexEntry[] = [];
    const seen = new Set<string>();

    // Recherche exacte nom
    const exactMatch = this.nameIndex.get(lowerQuery);
    if (exactMatch) {
      results.push(exactMatch);
      seen.add(exactMatch.id);
    }

    // Recherche partielle nom
    for (const [name, entry] of this.nameIndex.entries()) {
      if (!seen.has(entry.id) && name.includes(lowerQuery)) {
        results.push(entry);
        seen.add(entry.id);
      }
    }

    // Recherche tags
    for (const [tag, entries] of this.tagIndex.entries()) {
      if (tag.toLowerCase().includes(lowerQuery)) {
        entries.forEach(entry => {
          if (!seen.has(entry.id)) {
            results.push(entry);
            seen.add(entry.id);
          }
        });
      }
    }

    return results;
  }

  clear(): void {
    this.index.clear();
    this.nameIndex.clear();
    this.tagIndex.clear();
  }
}

export const GlobalFastIndex = new FastSearchIndex();

// ============================================================================
// OPTIMISATIONS SPÉCIFIQUES MJ IA
// ============================================================================

/**
 * Pré-charge données fréquemment utilisées par MJ
 */
export async function preloadCommonData(): Promise<void> {
  console.log('[Optimization] Preloading common data...');
  
  // Pré-charger NPCs marchands
  const { ALL_NPCS } = await import('./npcs');
  const merchants = ALL_NPCS.filter(npc => npc.role === 'merchant');
  GlobalLoreCache.set('merchants', merchants);

  // Pré-charger créatures par CR
  const { ALL_CREATURES } = await import('./bestiary');
  const creaturesByCR: Record<number, any[]> = {};
  ALL_CREATURES.forEach(creature => {
    const cr = creature.challengeRating;
    if (!creaturesByCR[cr]) creaturesByCR[cr] = [];
    creaturesByCR[cr].push(creature);
  });
  GlobalLoreCache.set('creatures-by-cr', creaturesByCR);

  // Pré-charger quêtes par niveau
  const quests = await lazyLoadQuests();
  const questsByLevel: Record<number, any[]> = {};
  quests.forEach((quest: any) => {
    const level = quest.suggestedLevel;
    if (!questsByLevel[level]) questsByLevel[level] = [];
    questsByLevel[level].push(quest);
  });
  GlobalLoreCache.set('quests-by-level', questsByLevel);

  console.log('[Optimization] ✅ Common data preloaded');
}

/**
 * Récupère marchands optimisé (avec cache)
 */
export function getCachedMerchants() {
  if (GlobalLoreCache.has('merchants')) {
    return GlobalLoreCache.get('merchants');
  }
  
  const { ALL_NPCS } = require('./npcs');
  const merchants = ALL_NPCS.filter((npc: any) => npc.role === 'merchant');
  GlobalLoreCache.set('merchants', merchants);
  return merchants;
}

/**
 * Récupère créatures par CR optimisé (avec cache)
 */
export function getCachedCreaturesByCR(cr: number) {
  const cache = GlobalLoreCache.get('creatures-by-cr');
  if (cache) {
    return cache[cr] || [];
  }
  
  const { ALL_CREATURES } = require('./bestiary');
  const creaturesByCR: Record<number, any[]> = {};
  ALL_CREATURES.forEach((creature: any) => {
    const creatureCR = creature.challengeRating;
    if (!creaturesByCR[creatureCR]) creaturesByCR[creatureCR] = [];
    creaturesByCR[creatureCR].push(creature);
  });
  GlobalLoreCache.set('creatures-by-cr', creaturesByCR);
  return creaturesByCR[cr] || [];
}

/**
 * Récupère quêtes par niveau optimisé (avec cache)
 */
export function getCachedQuestsByLevel(level: number) {
  const cache = GlobalLoreCache.get('quests-by-level');
  if (cache) {
    return cache[level] || [];
  }
  
  const { ALL_QUESTS } = require('./quests');
  const questsByLevel: Record<number, any[]> = {};
  ALL_QUESTS.forEach((quest: any) => {
    const questLevel = quest.suggestedLevel;
    if (!questsByLevel[questLevel]) questsByLevel[questLevel] = [];
    questsByLevel[questLevel].push(quest);
  });
  GlobalLoreCache.set('quests-by-level', questsByLevel);
  return questsByLevel[level] || [];
}

// ============================================================================
// BATCH OPERATIONS
// ============================================================================

/**
 * Charge multiple entités en batch pour performance
 */
export async function batchLoad(ids: string[]): Promise<Map<string, any>> {
  const results = new Map<string, any>();
  
  // Check cache first
  const uncached: string[] = [];
  ids.forEach(id => {
    if (GlobalLoreCache.has(id)) {
      results.set(id, GlobalLoreCache.get(id));
    } else {
      uncached.push(id);
    }
  });
  
  // Load uncached in batch
  if (uncached.length > 0) {
    const { GlobalLoreRegistry } = await import('./registry');
    uncached.forEach(id => {
      const entity = GlobalLoreRegistry.findById(id);
      if (entity) {
        results.set(id, entity);
        GlobalLoreCache.set(id, entity);
      }
    });
  }
  
  return results;
}

// ============================================================================
// MEMOIZATION
// ============================================================================

const memoCache = new Map<string, any>();

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string
): T {
  return ((...args: Parameters<T>) => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    
    if (memoCache.has(key)) {
      return memoCache.get(key);
    }
    
    const result = fn(...args);
    memoCache.set(key, result);
    return result;
  }) as T;
}

// ============================================================================
// STATISTICS ET MONITORING
// ============================================================================

class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  track(operation: string, duration: number): void {
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, []);
    }
    this.metrics.get(operation)!.push(duration);
  }

  getStats(operation: string) {
    const durations = this.metrics.get(operation);
    if (!durations || durations.length === 0) return null;

    const sorted = [...durations].sort((a, b) => a - b);
    return {
      count: durations.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg: durations.reduce((a, b) => a + b, 0) / durations.length,
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)]
    };
  }

  getAllStats() {
    const result: Record<string, any> = {};
    for (const [operation, _] of this.metrics.entries()) {
      result[operation] = this.getStats(operation);
    }
    return result;
  }

  clear(): void {
    this.metrics.clear();
  }
}

export const GlobalPerfMonitor = new PerformanceMonitor();

/**
 * Wrapper pour mesurer performance d'une fonction
 */
export function measured<T extends (...args: any[]) => any>(
  name: string,
  fn: T
): T {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = fn(...args);
    const duration = performance.now() - start;
    GlobalPerfMonitor.track(name, duration);
    return result;
  }) as T;
}
