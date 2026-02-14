// ==========================================
// NPC RELATIONSHIP GRAPH - Relations entre PNJ
// ==========================================
// Gère un graphe de relations sociales entre tous les PNJ :
// - Amitiés / Inimitiés
// - Relations familiales (parent, enfant, fratrie, conjoint)
// - Relations professionnelles (patron, employé, concurrent)
// - Alliances / Rivalités
// - Impact sur les interactions et le gameplay

class NPCRelationshipGraph {
  constructor() {
    // Graphe de relations : Map<npcId, Map<otherNpcId, relationship>>
    this.relationships = new Map();
    
    // Types de relations
    this.relationshipTypes = {
      family: {
        parent: { strength: 100, mutable: false },
        child: { strength: 100, mutable: false },
        sibling: { strength: 80, mutable: false },
        spouse: { strength: 90, mutable: true }, // Peut divorcer
        cousin: { strength: 50, mutable: false }
      },
      social: {
        best_friend: { strength: 90, mutable: true },
        friend: { strength: 60, mutable: true },
        acquaintance: { strength: 30, mutable: true },
        rival: { strength: -60, mutable: true },
        enemy: { strength: -90, mutable: true }
      },
      professional: {
        employer: { strength: 40, mutable: true },
        employee: { strength: 40, mutable: true },
        colleague: { strength: 50, mutable: true },
        competitor: { strength: -40, mutable: true },
        partner: { strength: 70, mutable: true }
      },
      romantic: {
        lover: { strength: 85, mutable: true },
        ex_lover: { strength: -50, mutable: true },
        crush: { strength: 60, mutable: true },
        rejected: { strength: -30, mutable: true }
      },
      faction: {
        ally: { strength: 70, mutable: true },
        neutral: { strength: 0, mutable: true },
        hostile: { strength: -70, mutable: true }
      }
    };

    // Historique des événements relationnels
    this.relationshipEvents = [];
  }

  // ==========================================
  // AJOUTER UNE RELATION
  // ==========================================
  addRelationship(npc1Id, npc2Id, type, category) {
    if (!this.relationships.has(npc1Id)) {
      this.relationships.set(npc1Id, new Map());
    }
    if (!this.relationships.has(npc2Id)) {
      this.relationships.set(npc2Id, new Map());
    }

    const relationshipData = this.relationshipTypes[category]?.[type];
    if (!relationshipData) {
      console.warn(`[NPCRelationshipGraph] Type inconnu : ${category}.${type}`);
      return false;
    }

    // Relation de npc1 vers npc2
    this.relationships.get(npc1Id).set(npc2Id, {
      type: type,
      category: category,
      strength: relationshipData.strength,
      mutable: relationshipData.mutable,
      createdAt: Date.now(),
      lastInteraction: Date.now(),
      events: []
    });

    // Relation réciproque (certaines sont symétriques)
    const reciprocalType = this.getReciprocalType(type, category);
    if (reciprocalType) {
      const reciprocalData = this.relationshipTypes[category]?.[reciprocalType];
      this.relationships.get(npc2Id).set(npc1Id, {
        type: reciprocalType,
        category: category,
        strength: reciprocalData.strength,
        mutable: reciprocalData.mutable,
        createdAt: Date.now(),
        lastInteraction: Date.now(),
        events: []
      });
    }

    // Enregistrer l'événement
    this.relationshipEvents.push({
      type: 'relationship_created',
      npc1: npc1Id,
      npc2: npc2Id,
      relationshipType: type,
      timestamp: Date.now()
    });

    return true;
  }

  // ==========================================
  // OBTENIR LA RELATION RÉCIPROQUE
  // ==========================================
  getReciprocalType(type, category) {
    const reciprocals = {
      family: {
        parent: 'child',
        child: 'parent',
        sibling: 'sibling',
        spouse: 'spouse',
        cousin: 'cousin'
      },
      social: {
        best_friend: 'best_friend',
        friend: 'friend',
        acquaintance: 'acquaintance',
        rival: 'rival',
        enemy: 'enemy'
      },
      professional: {
        employer: 'employee',
        employee: 'employer',
        colleague: 'colleague',
        competitor: 'competitor',
        partner: 'partner'
      },
      romantic: {
        lover: 'lover',
        ex_lover: 'ex_lover',
        crush: null, // Non réciproque
        rejected: null // Non réciproque
      },
      faction: {
        ally: 'ally',
        neutral: 'neutral',
        hostile: 'hostile'
      }
    };

    return reciprocals[category]?.[type] || type;
  }

  // ==========================================
  // RÉCUPÉRER UNE RELATION
  // ==========================================
  getRelationship(npc1Id, npc2Id) {
    return this.relationships.get(npc1Id)?.get(npc2Id) || null;
  }

  // ==========================================
  // RÉCUPÉRER TOUTES LES RELATIONS D'UN PNJ
  // ==========================================
  getRelationships(npcId) {
    const relations = this.relationships.get(npcId);
    if (!relations) return [];

    return Array.from(relations.entries()).map(([otherId, rel]) => ({
      npcId: otherId,
      ...rel
    }));
  }

  // ==========================================
  // MODIFIER LA FORCE D'UNE RELATION
  // ==========================================
  modifyRelationshipStrength(npc1Id, npc2Id, delta, reason = '') {
    const rel = this.getRelationship(npc1Id, npc2Id);
    if (!rel) return false;

    if (!rel.mutable) {
      console.warn(`[NPCRelationshipGraph] Relation ${rel.type} non modifiable`);
      return false;
    }

    const oldStrength = rel.strength;
    rel.strength = Math.max(-100, Math.min(100, rel.strength + delta));
    rel.lastInteraction = Date.now();

    // Enregistrer l'événement
    rel.events.push({
      type: 'strength_change',
      oldStrength,
      newStrength: rel.strength,
      delta,
      reason,
      timestamp: Date.now()
    });

    // Vérifier si la relation a changé de type
    this.checkRelationshipTypeChange(npc1Id, npc2Id);

    return true;
  }

  // ==========================================
  // VÉRIFIER UN CHANGEMENT DE TYPE
  // ==========================================
  checkRelationshipTypeChange(npc1Id, npc2Id) {
    const rel = this.getRelationship(npc1Id, npc2Id);
    if (!rel || rel.category !== 'social') return;

    const strength = rel.strength;
    let newType = rel.type;

    // Déterminer le nouveau type selon la force
    if (strength >= 90) newType = 'best_friend';
    else if (strength >= 60) newType = 'friend';
    else if (strength >= 30) newType = 'acquaintance';
    else if (strength >= -30) newType = 'acquaintance';
    else if (strength >= -60) newType = 'rival';
    else newType = 'enemy';

    if (newType !== rel.type) {
      const oldType = rel.type;
      rel.type = newType;

      this.relationshipEvents.push({
        type: 'relationship_type_changed',
        npc1: npc1Id,
        npc2: npc2Id,
        oldType,
        newType,
        strength,
        timestamp: Date.now()
      });

      return { oldType, newType, strength };
    }

    return null;
  }

  // ==========================================
  // TROUVER DES AMIS COMMUNS
  // ==========================================
  findCommonFriends(npc1Id, npc2Id) {
    const friends1 = this.getRelationships(npc1Id)
      .filter(r => r.category === 'social' && r.strength > 50)
      .map(r => r.npcId);

    const friends2 = this.getRelationships(npc2Id)
      .filter(r => r.category === 'social' && r.strength > 50)
      .map(r => r.npcId);

    return friends1.filter(id => friends2.includes(id));
  }

  // ==========================================
  // TROUVER LES ENNEMIS COMMUNS
  // ==========================================
  findCommonEnemies(npc1Id, npc2Id) {
    const enemies1 = this.getRelationships(npc1Id)
      .filter(r => r.strength < -50)
      .map(r => r.npcId);

    const enemies2 = this.getRelationships(npc2Id)
      .filter(r => r.strength < -50)
      .map(r => r.npcId);

    return enemies1.filter(id => enemies2.includes(id));
  }

  // ==========================================
  // TROUVER LA FAMILLE
  // ==========================================
  findFamily(npcId) {
    return this.getRelationships(npcId)
      .filter(r => r.category === 'family');
  }

  // ==========================================
  // TROUVER LES ALLIÉS
  // ==========================================
  findAllies(npcId) {
    return this.getRelationships(npcId)
      .filter(r => r.strength > 60);
  }

  // ==========================================
  // CALCULER L'INFLUENCE
  // ==========================================
  calculateInfluence(npcId) {
    const relationships = this.getRelationships(npcId);
    
    // Poids selon le type
    const weights = {
      family: 1.5,
      social: 1.0,
      professional: 1.2,
      romantic: 0.8,
      faction: 1.3
    };

    let influence = 0;
    relationships.forEach(rel => {
      const weight = weights[rel.category] || 1.0;
      influence += Math.abs(rel.strength) * weight;
    });

    return Math.floor(influence / 10); // Score sur 100+
  }

  // ==========================================
  // PRÉDIRE LA RÉACTION D'UN PNJ
  // ==========================================
  predictReaction(npcId, targetNpcId, playerActionType) {
    const relWithTarget = this.getRelationship(npcId, targetNpcId);
    if (!relWithTarget) return 'neutral';

    const strength = relWithTarget.strength;

    // Actions positives envers la cible
    if (['help', 'gift', 'heal'].includes(playerActionType)) {
      if (strength > 60) return 'very_pleased';
      if (strength > 30) return 'pleased';
      if (strength > -30) return 'neutral';
      if (strength > -60) return 'displeased';
      return 'angry';
    }

    // Actions négatives envers la cible
    if (['attack', 'steal', 'insult'].includes(playerActionType)) {
      if (strength > 60) return 'very_angry';
      if (strength > 30) return 'angry';
      if (strength > -30) return 'neutral';
      if (strength > -60) return 'pleased';
      return 'very_pleased';
    }

    return 'neutral';
  }

  // ==========================================
  // GÉNÉRER UNE FAMILLE
  // ==========================================
  generateFamily(npcIds, familyName = 'Famille') {
    if (npcIds.length < 2) return false;

    // Parents (2 premiers)
    if (npcIds.length >= 2) {
      this.addRelationship(npcIds[0], npcIds[1], 'spouse', 'family');
    }

    // Enfants (restants)
    for (let i = 2; i < npcIds.length; i++) {
      this.addRelationship(npcIds[0], npcIds[i], 'parent', 'family');
      this.addRelationship(npcIds[1], npcIds[i], 'parent', 'family');

      // Fratrie
      for (let j = i + 1; j < npcIds.length; j++) {
        this.addRelationship(npcIds[i], npcIds[j], 'sibling', 'family');
      }
    }

    return true;
  }

  // ==========================================
  // OBTENIR LE RÉSEAU SOCIAL
  // ==========================================
  getSocialNetwork(npcId, depth = 2) {
    const network = new Set([npcId]);
    const toExplore = [{ id: npcId, level: 0 }];
    const explored = new Set();

    while (toExplore.length > 0) {
      const { id, level } = toExplore.shift();
      if (explored.has(id) || level >= depth) continue;
      explored.add(id);

      const relations = this.getRelationships(id)
        .filter(r => r.strength > 30); // Seulement relations positives

      relations.forEach(rel => {
        network.add(rel.npcId);
        if (level + 1 < depth) {
          toExplore.push({ id: rel.npcId, level: level + 1 });
        }
      });
    }

    return Array.from(network).filter(id => id !== npcId);
  }

  // ==========================================
  // TROUVER LE CHEMIN SOCIAL
  // ==========================================
  findSocialPath(startNpcId, targetNpcId, maxDepth = 5) {
    const queue = [[startNpcId]];
    const visited = new Set([startNpcId]);

    while (queue.length > 0) {
      const path = queue.shift();
      const currentId = path[path.length - 1];

      if (currentId === targetNpcId) {
        return path;
      }

      if (path.length >= maxDepth) continue;

      const relations = this.getRelationships(currentId)
        .filter(r => r.strength > 0); // Seulement relations non-hostiles

      for (const rel of relations) {
        if (!visited.has(rel.npcId)) {
          visited.add(rel.npcId);
          queue.push([...path, rel.npcId]);
        }
      }
    }

    return null; // Pas de chemin trouvé
  }

  // ==========================================
  // CRÉER UN CONFLIT
  // ==========================================
  createConflict(npc1Id, npc2Id, reason = 'dispute') {
    // Diminuer la relation
    this.modifyRelationshipStrength(npc1Id, npc2Id, -40, reason);
    this.modifyRelationshipStrength(npc2Id, npc1Id, -40, reason);

    // Les amis de chacun peuvent prendre parti
    const friends1 = this.findAllies(npc1Id);
    const friends2 = this.findAllies(npc2Id);

    friends1.forEach(friend => {
      if (Math.random() < 0.5) {
        this.modifyRelationshipStrength(friend.npcId, npc2Id, -20, 'supporting_friend');
      }
    });

    friends2.forEach(friend => {
      if (Math.random() < 0.5) {
        this.modifyRelationshipStrength(friend.npcId, npc1Id, -20, 'supporting_friend');
      }
    });

    return {
      participants: [npc1Id, npc2Id],
      supporters: {
        [npc1Id]: friends1.map(f => f.npcId),
        [npc2Id]: friends2.map(f => f.npcId)
      },
      reason
    };
  }

  // ==========================================
  // RÉCUPÉRER LES ÉVÉNEMENTS RÉCENTS
  // ==========================================
  getRecentEvents(limit = 10) {
    return this.relationshipEvents.slice(-limit);
  }

  // ==========================================
  // STATISTIQUES
  // ==========================================
  getStatistics() {
    let totalRelationships = 0;
    const relationshipsByType = {};
    const relationshipsByCategory = {};

    this.relationships.forEach(rels => {
      rels.forEach(rel => {
        totalRelationships++;
        relationshipsByType[rel.type] = (relationshipsByType[rel.type] || 0) + 1;
        relationshipsByCategory[rel.category] = (relationshipsByCategory[rel.category] || 0) + 1;
      });
    });

    return {
      totalNPCs: this.relationships.size,
      totalRelationships,
      relationshipsByType,
      relationshipsByCategory,
      totalEvents: this.relationshipEvents.length
    };
  }

  // ==========================================
  // RÉINITIALISATION
  // ==========================================
  reset() {
    this.relationships.clear();
    this.relationshipEvents = [];
  }
}

export default NPCRelationshipGraph;
