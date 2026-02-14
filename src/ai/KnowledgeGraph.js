/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     🧠 KNOWLEDGE GRAPH v4.0                              ║
 * ║              Semantic Knowledge & Reasoning System                       ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * MISSION: Créer un graphe de connaissances sémantique qui stocke toutes les
 *          informations du monde, détecte les contradictions, effectue des
 *          inférences logiques et suggère du contenu cohérent.
 * 
 * CAPACITÉS:
 * - Graphe de connaissances (entités, relations, propriétés)
 * - Inférences logiques
 * - Détection de contradictions
 * - Suggestions contextuelles
 * - Requêtes complexes
 * - Cohérence narrative
 */

export class KnowledgeGraph {
  constructor(config = {}) {
    this.config = {
      enabled: config.enabled ?? true,
      maxNodes: config.maxNodes ?? 10000,
      maxEdgesPerNode: config.maxEdgesPerNode ?? 100,
      enableInference: config.enableInference ?? true,
      enableContradictionDetection: config.enableContradictionDetection ?? true,
      inferenceDepth: config.inferenceDepth ?? 3,
      ...config
    };

    // Graphe
    this.nodes = new Map(); // nodeId → Node
    this.edges = new Map(); // edgeId → Edge
    this.nodesByType = new Map(); // type → Set<nodeId>
    this.edgesByType = new Map(); // type → Set<edgeId>

    // Index inversés
    this.incomingEdges = new Map(); // nodeId → Set<edgeId>
    this.outgoingEdges = new Map(); // nodeId → Set<edgeId>

    // Règles d'inférence
    this.inferenceRules = [];
    this._initializeInferenceRules();

    // Contradictions détectées
    this.contradictions = [];

    // Statistiques
    this.stats = {
      totalNodes: 0,
      totalEdges: 0,
      inferencesPerformed: 0,
      contradictionsDetected: 0,
      queriesExecuted: 0
    };

    console.log('[Knowledge Graph] 🧠 Initialized - Semantic reasoning ready');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 1: GRAPH CONSTRUCTION
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Ajoute un nœud (entité)
   */
  addNode(data) {
    if (this.nodes.size >= this.config.maxNodes) {
      console.warn('[Knowledge Graph] Max nodes reached');
      return null;
    }

    const node = {
      id: data.id || `node_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      type: data.type, // person, location, item, event, concept, faction, etc.
      label: data.label,
      properties: data.properties || {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.nodes.set(node.id, node);

    // Index par type
    if (!this.nodesByType.has(node.type)) {
      this.nodesByType.set(node.type, new Set());
    }
    this.nodesByType.get(node.type).add(node.id);

    this.stats.totalNodes++;

    console.log(`[Knowledge Graph] 📍 Added node: ${node.label} (${node.type})`);

    return node;
  }

  /**
   * Ajoute une arête (relation)
   */
  addEdge(fromId, toId, relationType, properties = {}) {
    const fromNode = this.nodes.get(fromId);
    const toNode = this.nodes.get(toId);

    if (!fromNode || !toNode) {
      console.warn('[Knowledge Graph] Invalid nodes for edge');
      return null;
    }

    const edgeId = `${fromId}-[${relationType}]->${toId}`;

    const edge = {
      id: edgeId,
      from: fromId,
      to: toId,
      type: relationType,
      properties,
      createdAt: Date.now()
    };

    this.edges.set(edgeId, edge);

    // Index
    if (!this.edgesByType.has(relationType)) {
      this.edgesByType.set(relationType, new Set());
    }
    this.edgesByType.get(relationType).add(edgeId);

    // Index inversés
    if (!this.outgoingEdges.has(fromId)) {
      this.outgoingEdges.set(fromId, new Set());
    }
    this.outgoingEdges.get(fromId).add(edgeId);

    if (!this.incomingEdges.has(toId)) {
      this.incomingEdges.set(toId, new Set());
    }
    this.incomingEdges.get(toId).add(edgeId);

    this.stats.totalEdges++;

    console.log(`[Knowledge Graph] 🔗 Added edge: ${fromNode.label} -[${relationType}]-> ${toNode.label}`);

    // Détection de contradictions
    if (this.config.enableContradictionDetection) {
      this._checkContradictions(fromId, toId, relationType);
    }

    return edge;
  }

  /**
   * Met à jour les propriétés d'un nœud
   */
  updateNode(nodeId, properties) {
    const node = this.nodes.get(nodeId);
    if (!node) return false;

    Object.assign(node.properties, properties);
    node.updatedAt = Date.now();

    console.log(`[Knowledge Graph] 🔄 Updated node: ${node.label}`);

    return true;
  }

  /**
   * Supprime un nœud
   */
  removeNode(nodeId) {
    const node = this.nodes.get(nodeId);
    if (!node) return false;

    // Supprime les arêtes associées
    const outgoing = this.outgoingEdges.get(nodeId) || new Set();
    const incoming = this.incomingEdges.get(nodeId) || new Set();

    [...outgoing, ...incoming].forEach(edgeId => {
      this.edges.delete(edgeId);
      this.stats.totalEdges--;
    });

    this.outgoingEdges.delete(nodeId);
    this.incomingEdges.delete(nodeId);

    // Supprime le nœud
    this.nodes.delete(nodeId);
    this.nodesByType.get(node.type)?.delete(nodeId);
    this.stats.totalNodes--;

    console.log(`[Knowledge Graph] 🗑️ Removed node: ${node.label}`);

    return true;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2: QUERYING
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Requête simple: trouve des nœuds
   */
  findNodes(criteria) {
    this.stats.queriesExecuted++;

    let results = Array.from(this.nodes.values());

    // Filtre par type
    if (criteria.type) {
      const typeNodes = this.nodesByType.get(criteria.type);
      if (!typeNodes) return [];
      results = results.filter(n => typeNodes.has(n.id));
    }

    // Filtre par label
    if (criteria.label) {
      results = results.filter(n => 
        n.label.toLowerCase().includes(criteria.label.toLowerCase())
      );
    }

    // Filtre par propriétés
    if (criteria.properties) {
      results = results.filter(n => {
        return Object.entries(criteria.properties).every(([key, value]) => 
          n.properties[key] === value
        );
      });
    }

    return results;
  }

  /**
   * Requête complexe: traverse le graphe
   */
  traverse(startNodeId, relationTypes, depth = 2) {
    this.stats.queriesExecuted++;

    const visited = new Set();
    const results = [];

    const dfs = (nodeId, currentDepth) => {
      if (currentDepth > depth || visited.has(nodeId)) return;
      visited.add(nodeId);

      const node = this.nodes.get(nodeId);
      if (!node) return;

      results.push(node);

      const outgoing = this.outgoingEdges.get(nodeId) || new Set();

      outgoing.forEach(edgeId => {
        const edge = this.edges.get(edgeId);
        if (!edge) return;

        if (!relationTypes || relationTypes.includes(edge.type)) {
          dfs(edge.to, currentDepth + 1);
        }
      });
    };

    dfs(startNodeId, 0);

    console.log(`[Knowledge Graph] 🔍 Traversed from ${startNodeId}: ${results.length} nodes found`);

    return results;
  }

  /**
   * Trouve le chemin le plus court entre deux nœuds
   */
  findPath(fromId, toId, relationTypes = null) {
    this.stats.queriesExecuted++;

    const queue = [[fromId]];
    const visited = new Set([fromId]);

    while (queue.length > 0) {
      const path = queue.shift();
      const currentId = path[path.length - 1];

      if (currentId === toId) {
        console.log(`[Knowledge Graph] 🎯 Path found: ${path.length - 1} hops`);
        return path.map(id => this.nodes.get(id));
      }

      const outgoing = this.outgoingEdges.get(currentId) || new Set();

      outgoing.forEach(edgeId => {
        const edge = this.edges.get(edgeId);
        if (!edge) return;

        if (relationTypes && !relationTypes.includes(edge.type)) return;

        if (!visited.has(edge.to)) {
          visited.add(edge.to);
          queue.push([...path, edge.to]);
        }
      });
    }

    console.log(`[Knowledge Graph] ❌ No path found between nodes`);
    return null;
  }

  /**
   * Requête SPARQL-like (simplifié)
   */
  query(pattern) {
    this.stats.queriesExecuted++;

    // Pattern: { subject, predicate, object }
    // Support des wildcards: null = any

    const results = [];

    this.edges.forEach(edge => {
      const subject = this.nodes.get(edge.from);
      const object = this.nodes.get(edge.to);

      const matches =
        (!pattern.subject || pattern.subject === subject?.label) &&
        (!pattern.predicate || pattern.predicate === edge.type) &&
        (!pattern.object || pattern.object === object?.label);

      if (matches) {
        results.push({ subject, predicate: edge.type, object, edge });
      }
    });

    console.log(`[Knowledge Graph] 📊 Query executed: ${results.length} results`);

    return results;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3: INFERENCE ENGINE
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Initialise les règles d'inférence
   */
  _initializeInferenceRules() {
    this.inferenceRules = [
      {
        name: 'transitive_relation',
        pattern: [
          { from: 'A', to: 'B', type: 'parent_of' },
          { from: 'B', to: 'C', type: 'parent_of' }
        ],
        infer: { from: 'A', to: 'C', type: 'grandparent_of' }
      },
      {
        name: 'symmetric_relation',
        pattern: [{ from: 'A', to: 'B', type: 'friend_of' }],
        infer: { from: 'B', to: 'A', type: 'friend_of' }
      },
      {
        name: 'alliance_transitivity',
        pattern: [
          { from: 'A', to: 'B', type: 'allied_with' },
          { from: 'B', to: 'C', type: 'allied_with' }
        ],
        infer: { from: 'A', to: 'C', type: 'potential_ally' }
      },
      {
        name: 'enemy_of_enemy',
        pattern: [
          { from: 'A', to: 'B', type: 'enemy_of' },
          { from: 'B', to: 'C', type: 'enemy_of' }
        ],
        infer: { from: 'A', to: 'C', type: 'potential_ally' }
      },
      {
        name: 'location_hierarchy',
        pattern: [
          { from: 'A', to: 'B', type: 'located_in' },
          { from: 'B', to: 'C', type: 'part_of' }
        ],
        infer: { from: 'A', to: 'C', type: 'indirectly_in' }
      },
      {
        name: 'ownership_chain',
        pattern: [
          { from: 'A', to: 'B', type: 'owns' },
          { from: 'B', to: 'C', type: 'contains' }
        ],
        infer: { from: 'A', to: 'C', type: 'has_access_to' }
      }
    ];

    console.log(`[Knowledge Graph] 📚 Initialized ${this.inferenceRules.length} inference rules`);
  }

  /**
   * Effectue des inférences
   */
  performInferences() {
    if (!this.config.enableInference) return 0;

    let inferencesCount = 0;

    this.inferenceRules.forEach(rule => {
      const inferences = this._applyRule(rule);
      inferencesCount += inferences;
    });

    this.stats.inferencesPerformed += inferencesCount;

    if (inferencesCount > 0) {
      console.log(`[Knowledge Graph] 💡 Performed ${inferencesCount} inferences`);
    }

    return inferencesCount;
  }

  /**
   * Applique une règle d'inférence
   */
  _applyRule(rule) {
    let count = 0;

    // Cas simple: règle à 1 pattern (symétrique)
    if (rule.pattern.length === 1) {
      const pattern = rule.pattern[0];
      const edgeType = pattern.type;
      const edges = this.edgesByType.get(edgeType) || new Set();

      edges.forEach(edgeId => {
        const edge = this.edges.get(edgeId);
        if (!edge) return;

        // Vérifie si l'inférence existe déjà
        const inferredEdgeId = `${edge.to}-[${rule.infer.type}]->${edge.from}`;
        if (!this.edges.has(inferredEdgeId)) {
          this.addEdge(edge.to, edge.from, rule.infer.type, { inferred: true, rule: rule.name });
          count++;
        }
      });
    }

    // Cas complexe: règle à 2+ patterns (transitive)
    if (rule.pattern.length === 2) {
      const [pattern1, pattern2] = rule.pattern;

      const edges1 = this.edgesByType.get(pattern1.type) || new Set();

      edges1.forEach(edgeId1 => {
        const edge1 = this.edges.get(edgeId1);
        if (!edge1) return;

        const middleNode = edge1.to;
        const outgoing = this.outgoingEdges.get(middleNode) || new Set();

        outgoing.forEach(edgeId2 => {
          const edge2 = this.edges.get(edgeId2);
          if (!edge2 || edge2.type !== pattern2.type) return;

          // Inférence: A -> B -> C implique A -> C
          const inferredEdgeId = `${edge1.from}-[${rule.infer.type}]->${edge2.to}`;
          if (!this.edges.has(inferredEdgeId)) {
            this.addEdge(edge1.from, edge2.to, rule.infer.type, {
              inferred: true,
              rule: rule.name,
              via: middleNode
            });
            count++;
          }
        });
      });
    }

    return count;
  }

  /**
   * Suggère du contenu basé sur le contexte
   */
  suggestContent(contextNodeId, suggestionType = 'any') {
    const contextNode = this.nodes.get(contextNodeId);
    if (!contextNode) return [];

    const suggestions = [];

    // Analyse des relations existantes
    const outgoing = this.outgoingEdges.get(contextNodeId) || new Set();
    const relatedNodes = [];

    outgoing.forEach(edgeId => {
      const edge = this.edges.get(edgeId);
      if (edge) {
        const related = this.nodes.get(edge.to);
        if (related) {
          relatedNodes.push({ node: related, relation: edge.type });
        }
      }
    });

    // Suggère du contenu similaire
    if (suggestionType === 'similar' || suggestionType === 'any') {
      const sameType = this.nodesByType.get(contextNode.type) || new Set();
      sameType.forEach(nodeId => {
        if (nodeId !== contextNodeId && !relatedNodes.find(r => r.node.id === nodeId)) {
          const node = this.nodes.get(nodeId);
          if (node) {
            suggestions.push({
              type: 'similar',
              node,
              reason: `Same type as ${contextNode.label}`,
              confidence: 0.6
            });
          }
        }
      });
    }

    // Suggère du contenu complémentaire
    if (suggestionType === 'complement' || suggestionType === 'any') {
      relatedNodes.forEach(related => {
        // Trouve les "amis d'amis"
        const friendsOfFriends = this.traverse(related.node.id, null, 2);
        friendsOfFriends.forEach(fof => {
          if (fof.id !== contextNodeId && !relatedNodes.find(r => r.node.id === fof.id)) {
            suggestions.push({
              type: 'complement',
              node: fof,
              reason: `Connected via ${related.node.label}`,
              confidence: 0.75
            });
          }
        });
      });
    }

    // Déduplique et limite
    const unique = Array.from(new Map(suggestions.map(s => [s.node.id, s])).values());
    const sorted = unique.sort((a, b) => b.confidence - a.confidence).slice(0, 10);

    console.log(`[Knowledge Graph] 💡 Generated ${sorted.length} suggestions`);

    return sorted;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 4: CONTRADICTION DETECTION
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Vérifie les contradictions
   */
  _checkContradictions(fromId, toId, relationType) {
    const contradictions = [];

    // Règle: enemy_of ET friend_of
    if (relationType === 'friend_of') {
      const enemyEdge = this.edges.get(`${fromId}-[enemy_of]->${toId}`);
      if (enemyEdge) {
        contradictions.push({
          type: 'conflicting_relations',
          nodes: [fromId, toId],
          relations: ['friend_of', 'enemy_of'],
          severity: 'high'
        });
      }
    }

    // Règle: mort ET vivant
    const fromNode = this.nodes.get(fromId);
    const toNode = this.nodes.get(toId);

    if (fromNode?.properties.status === 'dead' && relationType === 'talks_to') {
      contradictions.push({
        type: 'impossible_action',
        nodes: [fromId, toId],
        description: 'Dead character cannot talk',
        severity: 'critical'
      });
    }

    // Règle: localisation multiple
    if (relationType === 'located_in') {
      const outgoing = this.outgoingEdges.get(fromId) || new Set();
      const otherLocations = Array.from(outgoing)
        .map(edgeId => this.edges.get(edgeId))
        .filter(e => e && e.type === 'located_in' && e.to !== toId);

      if (otherLocations.length > 0) {
        contradictions.push({
          type: 'multiple_locations',
          nodes: [fromId, ...otherLocations.map(e => e.to)],
          description: 'Entity in multiple places simultaneously',
          severity: 'medium'
        });
      }
    }

    contradictions.forEach(c => {
      c.timestamp = Date.now();
      this.contradictions.push(c);
      this.stats.contradictionsDetected++;
      console.warn(`[Knowledge Graph] ⚠️ Contradiction detected: ${c.type}`);
    });

    // Limite l'historique
    if (this.contradictions.length > 100) {
      this.contradictions = this.contradictions.slice(-100);
    }
  }

  /**
   * Obtient les contradictions
   */
  getContradictions(severity = null) {
    if (severity) {
      return this.contradictions.filter(c => c.severity === severity);
    }
    return this.contradictions;
  }

  /**
   * Résout une contradiction
   */
  resolveContradiction(contradictionIndex, resolution) {
    if (contradictionIndex < 0 || contradictionIndex >= this.contradictions.length) {
      return false;
    }

    const contradiction = this.contradictions[contradictionIndex];

    // Applique la résolution
    if (resolution.action === 'remove_edge') {
      const edgeId = resolution.edgeId;
      this.edges.delete(edgeId);
      console.log(`[Knowledge Graph] ✅ Resolved contradiction by removing edge ${edgeId}`);
    } else if (resolution.action === 'update_property') {
      this.updateNode(resolution.nodeId, resolution.properties);
      console.log(`[Knowledge Graph] ✅ Resolved contradiction by updating node`);
    }

    // Marque comme résolu
    contradiction.resolved = true;
    contradiction.resolution = resolution;

    return true;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 5: UTILITIES & EXPORT
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Obtient les statistiques
   */
  getStats() {
    return {
      ...this.stats,
      nodeTypes: this.nodesByType.size,
      edgeTypes: this.edgesByType.size,
      avgEdgesPerNode: this.stats.totalNodes > 0 ?
        (this.stats.totalEdges / this.stats.totalNodes).toFixed(2) : 0
    };
  }

  /**
   * Exporte le graphe (JSON)
   */
  export() {
    return {
      nodes: Array.from(this.nodes.values()),
      edges: Array.from(this.edges.values()),
      metadata: {
        exportedAt: Date.now(),
        stats: this.getStats()
      }
    };
  }

  /**
   * Importe un graphe
   */
  import(data) {
    this.reset();

    // Importe les nœuds
    data.nodes.forEach(nodeData => {
      this.addNode(nodeData);
    });

    // Importe les arêtes
    data.edges.forEach(edgeData => {
      this.addEdge(edgeData.from, edgeData.to, edgeData.type, edgeData.properties);
    });

    console.log(`[Knowledge Graph] 📥 Imported ${data.nodes.length} nodes, ${data.edges.length} edges`);
  }

  /**
   * Visualise le graphe (format DOT pour Graphviz)
   */
  toDOT() {
    let dot = 'digraph KnowledgeGraph {\n';
    dot += '  node [shape=box, style=filled, fillcolor=lightblue];\n';

    this.nodes.forEach(node => {
      dot += `  "${node.id}" [label="${node.label}\\n(${node.type})"];\n`;
    });

    this.edges.forEach(edge => {
      dot += `  "${edge.from}" -> "${edge.to}" [label="${edge.type}"];\n`;
    });

    dot += '}';

    return dot;
  }

  /**
   * Réinitialise le graphe
   */
  reset() {
    this.nodes.clear();
    this.edges.clear();
    this.nodesByType.clear();
    this.edgesByType.clear();
    this.incomingEdges.clear();
    this.outgoingEdges.clear();
    this.contradictions = [];

    this.stats = {
      totalNodes: 0,
      totalEdges: 0,
      inferencesPerformed: 0,
      contradictionsDetected: 0,
      queriesExecuted: 0
    };

    console.log('[Knowledge Graph] 🔄 Reset complete');
  }
}

export default KnowledgeGraph;
