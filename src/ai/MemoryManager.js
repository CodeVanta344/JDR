// ═══════════════════════════════════════════════════════════════════════
// 🧠 MEMORY MANAGER - Système de mémoire contextuelle du MJ
// ═══════════════════════════════════════════════════════════════════════
// Le MJ se souvient des actions importantes, des choix du joueur,
// et des conséquences pour créer une expérience cohérente et immersive

export class MemoryManager {
  constructor(maxMemories = 100) {
    this.maxMemories = maxMemories;
    this.memories = [];
    this.keyEvents = new Map(); // Événements marquants (clé: type, valeur: array)
    this.relationships = new Map(); // Relations avec PNJ (clé: npcId, valeur: score)
    this.visitedLocations = new Set();
    this.completedQuests = new Set();
    this.killedEnemies = new Map(); // Type ennemi -> nombre
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 💾 GESTION DES MÉMOIRES
  // ═══════════════════════════════════════════════════════════════════════

  addMemory(memory) {
    const enrichedMemory = {
      ...memory,
      id: this.generateId(),
      timestamp: Date.now(),
      importance: this.calculateImportance(memory)
    };

    this.memories.unshift(enrichedMemory);

    // Conserver seulement les N mémoires les plus importantes
    if (this.memories.length > this.maxMemories) {
      this.memories.sort((a, b) => b.importance - a.importance);
      this.memories = this.memories.slice(0, this.maxMemories);
    }

    // Enregistrer les événements clés
    this.trackKeyEvent(enrichedMemory);

    return enrichedMemory.id;
  }

  getRelevantMemories(context, limit = 5) {
    const relevantMemories = this.memories
      .filter(m => this.isRelevant(m, context))
      .sort((a, b) => {
        // Trier par pertinence (importance + récence)
        const scoreA = a.importance + (Date.now() - a.timestamp) / 1000000;
        const scoreB = b.importance + (Date.now() - b.timestamp) / 1000000;
        return scoreB - scoreA;
      })
      .slice(0, limit);

    return relevantMemories;
  }

  getRecentEvents(count = 5) {
    return this.memories
      .slice(0, count)
      .map(m => ({
        action: m.action,
        result: m.response?.substring(0, 100) || 'Aucun résultat',
        timeAgo: this.getTimeAgo(m.timestamp)
      }));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🎯 ÉVÉNEMENTS CLÉS
  // ═══════════════════════════════════════════════════════════════════════

  trackKeyEvent(memory) {
    const { intent, context } = memory;

    // Combats importants
    if (intent === 'combat' && context?.enemy?.boss) {
      this.addKeyEvent('boss_fights', {
        enemy: context.enemy.name,
        victory: context.victory,
        timestamp: memory.timestamp
      });
    }

    // Quêtes complétées
    if (intent === 'quest' && context?.questCompleted) {
      this.completedQuests.add(context.questId);
      this.addKeyEvent('quests', {
        quest: context.questTitle,
        timestamp: memory.timestamp
      });
    }

    // Nouvelles locations
    if (context?.location && !this.visitedLocations.has(context.location.id)) {
      this.visitedLocations.add(context.location.id);
      this.addKeyEvent('locations', {
        location: context.location.name,
        timestamp: memory.timestamp
      });
    }

    // Relations avec PNJ
    if (intent === 'dialogue' && context?.npc) {
      this.updateRelationship(context.npc.id, context.relationshipChange || 0);
    }

    // Ennemis tués
    if (intent === 'combat' && context?.enemyKilled) {
      const count = this.killedEnemies.get(context.enemy.type) || 0;
      this.killedEnemies.set(context.enemy.type, count + 1);
    }
  }

  addKeyEvent(type, event) {
    if (!this.keyEvents.has(type)) {
      this.keyEvents.set(type, []);
    }
    this.keyEvents.get(type).push(event);
  }

  getKeyEvents(type) {
    return this.keyEvents.get(type) || [];
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 👥 GESTION DES RELATIONS
  // ═══════════════════════════════════════════════════════════════════════

  updateRelationship(npcId, change) {
    const current = this.relationships.get(npcId) || 0;
    const newValue = Math.max(-100, Math.min(100, current + change));
    this.relationships.set(npcId, newValue);
  }

  getRelationship(npcId) {
    return this.relationships.get(npcId) || 0;
  }

  getRelationshipLevel(npcId) {
    const score = this.getRelationship(npcId);
    if (score >= 80) return 'Allié fidèle';
    if (score >= 50) return 'Ami';
    if (score >= 20) return 'Amical';
    if (score >= -20) return 'Neutre';
    if (score >= -50) return 'Méfiant';
    if (score >= -80) return 'Hostile';
    return 'Ennemi juré';
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 📊 STATISTIQUES & ANALYSE
  // ═══════════════════════════════════════════════════════════════════════

  getPlayerStats() {
    return {
      totalActions: this.memories.length,
      locationsVisited: this.visitedLocations.size,
      questsCompleted: this.completedQuests.size,
      enemiesKilled: Array.from(this.killedEnemies.entries()).reduce((sum, [_, count]) => sum + count, 0),
      enemiesByType: Object.fromEntries(this.killedEnemies),
      relationships: this.getTopRelationships(5),
      playtime: this.calculatePlaytime()
    };
  }

  getTopRelationships(count = 5) {
    return Array.from(this.relationships.entries())
      .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
      .slice(0, count)
      .map(([npcId, score]) => ({
        npcId,
        score,
        level: this.getRelationshipLevel(npcId)
      }));
  }

  calculatePlaytime() {
    if (this.memories.length === 0) return 0;
    const firstAction = this.memories[this.memories.length - 1].timestamp;
    const lastAction = this.memories[0].timestamp;
    const minutes = Math.floor((lastAction - firstAction) / 60000);
    return minutes;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🛠️ HELPERS INTERNES
  // ═══════════════════════════════════════════════════════════════════════

  calculateImportance(memory) {
    let importance = 1;

    // Combat = important
    if (memory.intent === 'combat') {
      importance += 2;
      if (memory.context?.enemy?.boss) importance += 5;
      if (memory.context?.playerDied) importance += 10;
    }

    // Quêtes = très important
    if (memory.intent === 'quest') {
      importance += 3;
      if (memory.context?.questCompleted) importance += 7;
    }

    // Dialogues importants
    if (memory.intent === 'dialogue' && memory.context?.npc?.important) {
      importance += 4;
    }

    // Découverte de lieux
    if (memory.context?.location && !this.visitedLocations.has(memory.context.location.id)) {
      importance += 3;
    }

    // Craft légendaire
    if (memory.intent === 'crafting' && memory.context?.itemRarity === 'legendary') {
      importance += 5;
    }

    return importance;
  }

  isRelevant(memory, context) {
    // Toujours pertinent si récent (< 5 minutes)
    if (Date.now() - memory.timestamp < 300000) {
      return true;
    }

    // Pertinent si même lieu
    if (memory.context?.location?.id === context.location?.id) {
      return true;
    }

    // Pertinent si même PNJ
    if (memory.context?.npc?.id && context.nearbyNPCs?.some(npc => npc.id === memory.context.npc.id)) {
      return true;
    }

    // Pertinent si événement important
    if (memory.importance >= 5) {
      return true;
    }

    return false;
  }

  getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'À l\'instant';
    if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)}h`;
    return `Il y a ${Math.floor(seconds / 86400)} jours`;
  }

  generateId() {
    return `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🔄 PERSISTANCE
  // ═══════════════════════════════════════════════════════════════════════

  serialize() {
    return JSON.stringify({
      memories: this.memories,
      keyEvents: Array.from(this.keyEvents.entries()),
      relationships: Array.from(this.relationships.entries()),
      visitedLocations: Array.from(this.visitedLocations),
      completedQuests: Array.from(this.completedQuests),
      killedEnemies: Array.from(this.killedEnemies.entries())
    });
  }

  deserialize(data) {
    const parsed = JSON.parse(data);
    this.memories = parsed.memories || [];
    this.keyEvents = new Map(parsed.keyEvents || []);
    this.relationships = new Map(parsed.relationships || []);
    this.visitedLocations = new Set(parsed.visitedLocations || []);
    this.completedQuests = new Set(parsed.completedQuests || []);
    this.killedEnemies = new Map(parsed.killedEnemies || []);
  }

  clear() {
    this.memories = [];
    this.keyEvents.clear();
    this.relationships.clear();
    this.visitedLocations.clear();
    this.completedQuests.clear();
    this.killedEnemies.clear();
  }
}

export default MemoryManager;
