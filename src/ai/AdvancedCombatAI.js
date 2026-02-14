/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     ⚔️ ADVANCED COMBAT AI v4.0                          ║
 * ║                    Tactical & Learning Battle System                     ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * MISSION: Créer une IA de combat ultra-avancée capable d'apprendre,
 *          de s'adapter, d'utiliser des formations tactiques et de développer
 *          des stratégies complexes contre le joueur.
 * 
 * CAPACITÉS:
 * - Apprentissage des patterns du joueur
 * - Formations tactiques (phalange, tenaille, embuscade, etc.)
 * - Stratégies adaptatives
 * - Coordination d'équipe
 * - Évaluation de menaces
 * - Exploitation des faiblesses
 */

export class AdvancedCombatAI {
  constructor(config = {}) {
    this.config = {
      enabled: config.enabled ?? true,
      learningRate: config.learningRate ?? 0.1, // Vitesse d'apprentissage
      memorySize: config.memorySize ?? 100, // Nombre de combats mémorisés
      enableFormations: config.enableFormations ?? true,
      enableLearning: config.enableLearning ?? true,
      enableCoordination: config.enableCoordination ?? true,
      maxUnitsPerFormation: config.maxUnitsPerFormation ?? 8,
      aggressionBase: config.aggressionBase ?? 0.5, // 0-1
      ...config
    };

    // Mémoire d'apprentissage
    this.combatMemory = {
      playerPatterns: new Map(), // playerId → Patterns
      successfulStrategies: new Map(), // strategy → success rate
      failedTactics: new Set(),
      enemyWeaknesses: new Map() // enemyType → weaknesses
    };

    // Formations tactiques
    this.formations = new Map(); // formationId → Formation
    this._initializeFormations();

    // État actuel
    this.activeCombats = new Map(); // combatId → CombatState
    this.unitBehaviors = new Map(); // unitId → Behavior

    // Statistiques
    this.stats = {
      combatsAnalyzed: 0,
      patternsDetected: 0,
      strategiesLearned: 0,
      formationsUsed: 0,
      avgDecisionTime: 0
    };

    console.log('[Advanced Combat AI] ⚔️ Initialized - Tactical system ready');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 1: PATTERN LEARNING
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Analyse les patterns de combat du joueur
   * @param {string} playerId - ID du joueur
   * @param {Object} combat - Données du combat
   * @returns {Object} Patterns détectés
   */
  analyzePlayerPatterns(playerId, combat) {
    if (!this.config.enableLearning) return null;

    const startTime = performance.now();

    const patterns = this.combatMemory.playerPatterns.get(playerId) || {
      favoriteActions: {},
      movementStyle: 'balanced',
      targetingPriority: 'closest',
      defensiveBehavior: 0.5,
      abilityUsage: {},
      combatHistory: []
    };

    // Analyse des actions
    combat.actions.forEach(action => {
      patterns.favoriteActions[action.type] = 
        (patterns.favoriteActions[action.type] || 0) + 1;

      if (action.type === 'ability') {
        patterns.abilityUsage[action.abilityId] = 
          (patterns.abilityUsage[action.abilityId] || 0) + 1;
      }
    });

    // Style de mouvement
    const movements = combat.actions.filter(a => a.type === 'move');
    if (movements.length > 0) {
      const avgDistance = movements.reduce((sum, m) => sum + (m.distance || 1), 0) / movements.length;
      patterns.movementStyle = avgDistance > 3 ? 'aggressive' :
                               avgDistance < 1.5 ? 'defensive' : 'balanced';
    }

    // Priorité de ciblage
    const attacks = combat.actions.filter(a => a.type === 'attack');
    if (attacks.length > 0) {
      const targets = attacks.map(a => a.targetType);
      const lowHPTargets = targets.filter(t => t === 'low_hp').length;
      const highThreatTargets = targets.filter(t => t === 'high_threat').length;

      if (lowHPTargets > highThreatTargets) {
        patterns.targetingPriority = 'low_hp';
      } else if (highThreatTargets > lowHPTargets) {
        patterns.targetingPriority = 'high_threat';
      } else {
        patterns.targetingPriority = 'closest';
      }
    }

    // Comportement défensif
    const defenseActions = combat.actions.filter(a => 
      a.type === 'defend' || a.type === 'heal' || a.type === 'retreat'
    ).length;
    patterns.defensiveBehavior = defenseActions / combat.actions.length;

    // Enregistrement de l'historique
    patterns.combatHistory.push({
      outcome: combat.victory ? 'win' : 'loss',
      actions: combat.actions.length,
      duration: combat.duration,
      timestamp: Date.now()
    });

    if (patterns.combatHistory.length > this.config.memorySize) {
      patterns.combatHistory.shift();
    }

    this.combatMemory.playerPatterns.set(playerId, patterns);

    const duration = performance.now() - startTime;
    this.stats.combatsAnalyzed++;
    this.stats.avgDecisionTime = 
      (this.stats.avgDecisionTime * (this.stats.combatsAnalyzed - 1) + duration) / 
      this.stats.combatsAnalyzed;

    console.log(`[Combat AI] 🧠 Analyzed patterns for player ${playerId} in ${duration.toFixed(2)}ms`);

    return patterns;
  }

  /**
   * Détecte des patterns spécifiques
   */
  detectSpecificPatterns(playerId) {
    const patterns = this.combatMemory.playerPatterns.get(playerId);
    if (!patterns) return [];

    const detected = [];

    // Pattern: "Glass Cannon" (attaque beaucoup, défense peu)
    if (patterns.defensiveBehavior < 0.2) {
      const attackActions = Object.entries(patterns.favoriteActions)
        .filter(([type]) => type === 'attack' || type === 'ability')
        .reduce((sum, [, count]) => sum + count, 0);
      
      if (attackActions > patterns.combatHistory.length * 5) {
        detected.push({
          name: 'glass_cannon',
          confidence: 0.85,
          counter: 'burst_damage'
        });
      }
    }

    // Pattern: "Tank" (défense élevée, mobilité faible)
    if (patterns.defensiveBehavior > 0.6 && patterns.movementStyle === 'defensive') {
      detected.push({
        name: 'tank',
        confidence: 0.8,
        counter: 'sustained_damage'
      });
    }

    // Pattern: "Hit and Run" (mobilité + burst)
    if (patterns.movementStyle === 'aggressive') {
      const burstAbilities = Object.keys(patterns.abilityUsage).filter(id => 
        id.includes('burst') || id.includes('strike')
      ).length;

      if (burstAbilities > 0) {
        detected.push({
          name: 'hit_and_run',
          confidence: 0.75,
          counter: 'control_effects'
        });
      }
    }

    // Pattern: "Ability Spammer" (utilise beaucoup de compétences)
    const totalAbilities = Object.values(patterns.abilityUsage)
      .reduce((sum, count) => sum + count, 0);
    const totalActions = Object.values(patterns.favoriteActions)
      .reduce((sum, count) => sum + count, 0);

    if (totalAbilities / totalActions > 0.5) {
      detected.push({
        name: 'ability_spammer',
        confidence: 0.9,
        counter: 'silence_effects'
      });
    }

    // Pattern: "Healer Focus" (cible les soigneurs en priorité)
    if (patterns.targetingPriority === 'healer') {
      detected.push({
        name: 'healer_hunter',
        confidence: 0.85,
        counter: 'protect_healers'
      });
    }

    if (detected.length > 0) {
      this.stats.patternsDetected += detected.length;
      console.log(`[Combat AI] 🎯 Detected ${detected.length} patterns: ${detected.map(p => p.name).join(', ')}`);
    }

    return detected;
  }

  /**
   * Prédit la prochaine action du joueur
   */
  predictNextAction(playerId, context) {
    const patterns = this.combatMemory.playerPatterns.get(playerId);
    if (!patterns) {
      return { action: 'attack', confidence: 0.5 };
    }

    const predictions = [];

    // Basé sur les actions favorites
    const sortedActions = Object.entries(patterns.favoriteActions)
      .sort((a, b) => b[1] - a[1]);

    if (sortedActions.length > 0) {
      predictions.push({
        action: sortedActions[0][0],
        confidence: sortedActions[0][1] / patterns.combatHistory.length,
        reason: 'favorite_action'
      });
    }

    // Basé sur le contexte
    if (context.unitHealth < 30 && patterns.defensiveBehavior > 0.3) {
      predictions.push({
        action: 'heal',
        confidence: 0.8,
        reason: 'low_health'
      });
    }

    if (context.enemiesNearby > 3 && patterns.movementStyle === 'defensive') {
      predictions.push({
        action: 'retreat',
        confidence: 0.7,
        reason: 'surrounded'
      });
    }

    // Retourne la prédiction la plus confiante
    predictions.sort((a, b) => b.confidence - a.confidence);
    return predictions[0] || { action: 'attack', confidence: 0.5 };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2: TACTICAL FORMATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Initialise les formations tactiques
   */
  _initializeFormations() {
    const formations = [
      {
        id: 'phalanx',
        name: 'Phalange',
        description: 'Formation défensive en ligne',
        positions: [
          { role: 'tank', x: 0, y: 0 },
          { role: 'tank', x: 1, y: 0 },
          { role: 'tank', x: 2, y: 0 },
          { role: 'dps', x: 0, y: -1 },
          { role: 'dps', x: 1, y: -1 },
          { role: 'dps', x: 2, y: -1 },
          { role: 'support', x: 1, y: -2 }
        ],
        bonuses: { defense: 0.2, coordination: 0.3 },
        counters: ['flanking', 'aoe'],
        bestAgainst: ['frontal_assault']
      },
      {
        id: 'wedge',
        name: 'Coin',
        description: 'Formation offensive en triangle',
        positions: [
          { role: 'tank', x: 0, y: 0 },
          { role: 'dps', x: -1, y: -1 },
          { role: 'dps', x: 1, y: -1 },
          { role: 'dps', x: -2, y: -2 },
          { role: 'dps', x: 2, y: -2 },
          { role: 'support', x: 0, y: -3 }
        ],
        bonuses: { offense: 0.3, breakthrough: 0.4 },
        counters: ['surrounding'],
        bestAgainst: ['line_formation']
      },
      {
        id: 'pincer',
        name: 'Tenaille',
        description: 'Attaque par les flancs',
        positions: [
          { role: 'dps', x: -3, y: 0 },
          { role: 'dps', x: -3, y: -1 },
          { role: 'tank', x: 0, y: -2 },
          { role: 'support', x: 0, y: -3 },
          { role: 'dps', x: 3, y: 0 },
          { role: 'dps', x: 3, y: -1 }
        ],
        bonuses: { flanking: 0.5, surprise: 0.3 },
        counters: ['center_weakness'],
        bestAgainst: ['phalanx', 'defensive']
      },
      {
        id: 'ambush',
        name: 'Embuscade',
        description: 'Unités cachées pour surprise',
        positions: [
          { role: 'dps', x: -2, y: 1, hidden: true },
          { role: 'dps', x: 2, y: 1, hidden: true },
          { role: 'tank', x: 0, y: 0 },
          { role: 'support', x: 0, y: -1 }
        ],
        bonuses: { surprise: 0.8, first_strike: 0.6 },
        counters: ['detection'],
        bestAgainst: ['unprepared']
      },
      {
        id: 'turtle',
        name: 'Tortue',
        description: 'Formation défensive totale',
        positions: [
          { role: 'tank', x: 0, y: 0 },
          { role: 'tank', x: -1, y: 0 },
          { role: 'tank', x: 1, y: 0 },
          { role: 'tank', x: 0, y: -1 },
          { role: 'support', x: 0, y: -0.5 },
          { role: 'dps', x: 0, y: -0.5 }
        ],
        bonuses: { defense: 0.5, damage_reduction: 0.3 },
        counters: ['sustained_damage', 'siege'],
        bestAgainst: ['burst_damage']
      },
      {
        id: 'skirmish',
        name: 'Escarmouche',
        description: 'Unités dispersées et mobiles',
        positions: [
          { role: 'dps', x: -2, y: 0 },
          { role: 'dps', x: 2, y: 1 },
          { role: 'dps', x: -1, y: -2 },
          { role: 'dps', x: 1, y: -1 },
          { role: 'support', x: 0, y: -3 }
        ],
        bonuses: { mobility: 0.6, evasion: 0.4 },
        counters: ['aoe', 'isolation'],
        bestAgainst: ['slow_units']
      },
      {
        id: 'hammer_anvil',
        name: 'Marteau et Enclume',
        description: 'Fixe l\'ennemi puis frappe',
        positions: [
          { role: 'tank', x: 0, y: 0 },
          { role: 'tank', x: -1, y: 0 },
          { role: 'tank', x: 1, y: 0 },
          { role: 'dps', x: -3, y: 2, flanking: true },
          { role: 'dps', x: 3, y: 2, flanking: true },
          { role: 'support', x: 0, y: -1 }
        ],
        bonuses: { coordination: 0.5, crushing: 0.4 },
        counters: ['mobility'],
        bestAgainst: ['static_defense']
      }
    ];

    formations.forEach(formation => {
      this.formations.set(formation.id, formation);
    });

    console.log(`[Combat AI] 🛡️ Initialized ${formations.length} tactical formations`);
  }

  /**
   * Sélectionne la meilleure formation
   */
  selectFormation(units, enemyFormation, context) {
    if (!this.config.enableFormations) return null;

    const availableFormations = Array.from(this.formations.values())
      .filter(f => units.length >= f.positions.length);

    if (availableFormations.length === 0) return null;

    // Évalue chaque formation
    const scores = availableFormations.map(formation => {
      let score = 1.0;

      // Bonus contre la formation ennemie
      if (enemyFormation && formation.bestAgainst.includes(enemyFormation.id)) {
        score *= 1.5;
      }

      // Pénalité si l'ennemi contre cette formation
      if (enemyFormation && formation.counters.includes(enemyFormation.id)) {
        score *= 0.5;
      }

      // Ajustement selon le contexte
      if (context.terrain === 'narrow' && formation.id === 'phalanx') {
        score *= 1.3;
      }
      if (context.terrain === 'open' && formation.id === 'skirmish') {
        score *= 1.2;
      }
      if (context.needDefense && formation.bonuses.defense) {
        score *= 1.4;
      }
      if (context.needOffense && formation.bonuses.offense) {
        score *= 1.4;
      }

      // Bonus pour les formations apprises comme efficaces
      const successRate = this.combatMemory.successfulStrategies.get(formation.id) || 0.5;
      score *= successRate;

      return { formation, score };
    });

    // Sélectionne la meilleure
    scores.sort((a, b) => b.score - a.score);
    const selected = scores[0].formation;

    this.stats.formationsUsed++;
    console.log(`[Combat AI] 🎖️ Selected formation: ${selected.name} (score: ${scores[0].score.toFixed(2)})`);

    return selected;
  }

  /**
   * Applique une formation aux unités
   */
  applyFormation(formation, units, basePosition) {
    const assignments = [];

    // Assigne les rôles
    const roleGroups = {
      tank: units.filter(u => u.role === 'tank'),
      dps: units.filter(u => u.role === 'dps' || u.role === 'warrior'),
      support: units.filter(u => u.role === 'support' || u.role === 'healer')
    };

    formation.positions.forEach(pos => {
      const group = roleGroups[pos.role];
      if (group && group.length > 0) {
        const unit = group.shift();
        assignments.push({
          unitId: unit.id,
          position: {
            x: basePosition.x + pos.x,
            y: basePosition.y + pos.y
          },
          role: pos.role,
          hidden: pos.hidden || false,
          flanking: pos.flanking || false
        });
      }
    });

    console.log(`[Combat AI] 📍 Assigned ${assignments.length} units to ${formation.name} formation`);

    return assignments;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3: STRATEGIC DECISION MAKING
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Décide de la stratégie globale
   */
  decideStrategy(units, enemies, context) {
    const strategies = [
      {
        name: 'aggressive_rush',
        condition: () => units.length > enemies.length * 1.5,
        priority: 0.8,
        tactics: ['focus_fire', 'advance', 'overwhelm']
      },
      {
        name: 'defensive_hold',
        condition: () => units.length < enemies.length,
        priority: 0.7,
        tactics: ['defensive_formation', 'protect_support', 'counter_attack']
      },
      {
        name: 'divide_conquer',
        condition: () => enemies.length > 3 && context.terrain === 'open',
        priority: 0.75,
        tactics: ['split_forces', 'flank', 'isolate_targets']
      },
      {
        name: 'guerrilla',
        condition: () => units.length < enemies.length && context.terrain === 'forest',
        priority: 0.85,
        tactics: ['hit_and_run', 'ambush', 'retreat']
      },
      {
        name: 'attrition',
        condition: () => 
          units.filter(u => u.role === 'support').length > 1 &&
          context.time > 60,
        priority: 0.6,
        tactics: ['sustain', 'heal', 'outlast']
      },
      {
        name: 'focus_support',
        condition: () => enemies.filter(e => e.role === 'support').length > 0,
        priority: 0.9,
        tactics: ['target_healers', 'disable_support', 'prevent_healing']
      }
    ];

    // Évalue les stratégies
    const viable = strategies
      .filter(s => s.condition())
      .map(s => {
        let score = s.priority;

        // Bonus si déjà réussie dans le passé
        const successRate = this.combatMemory.successfulStrategies.get(s.name) || 0.5;
        score *= successRate;

        // Pénalité si déjà échouée
        if (this.combatMemory.failedTactics.has(s.name)) {
          score *= 0.7;
        }

        return { strategy: s, score };
      })
      .sort((a, b) => b.score - a.score);

    if (viable.length === 0) {
      return {
        name: 'balanced',
        tactics: ['mixed_approach', 'adapt']
      };
    }

    const selected = viable[0].strategy;
    console.log(`[Combat AI] 🎲 Strategy selected: ${selected.name} (score: ${viable[0].score.toFixed(2)})`);

    return selected;
  }

  /**
   * Décide de l'action d'une unité
   */
  decideUnitAction(unit, allies, enemies, strategy, context) {
    const startTime = performance.now();

    // Évaluation de la menace
    const threats = this._evaluateThreats(unit, enemies);
    const opportunities = this._evaluateOpportunities(unit, enemies, allies);

    // Décision basée sur la stratégie
    let action;

    if (unit.health < 30 && unit.role !== 'tank') {
      // Survie prioritaire
      action = {
        type: 'retreat',
        target: this._findSafestPosition(unit, enemies),
        priority: 0.95,
        reason: 'low_health'
      };
    } else if (strategy.tactics.includes('target_healers')) {
      const healer = enemies.find(e => e.role === 'support' || e.role === 'healer');
      if (healer && this._isInRange(unit, healer)) {
        action = {
          type: 'attack',
          target: healer,
          priority: 0.9,
          reason: 'priority_target_healer'
        };
      }
    } else if (strategy.tactics.includes('focus_fire')) {
      const weakest = this._findWeakestEnemy(enemies);
      action = {
        type: 'attack',
        target: weakest,
        priority: 0.8,
        reason: 'focus_fire'
      };
    } else if (strategy.tactics.includes('defensive_formation')) {
      action = {
        type: 'defend',
        priority: 0.7,
        reason: 'defensive_strategy'
      };
    } else if (opportunities.length > 0) {
      // Exploite une opportunité
      const best = opportunities[0];
      action = {
        type: best.type,
        target: best.target,
        priority: best.value,
        reason: 'opportunity'
      };
    } else if (threats.length > 0) {
      // Réagit à une menace
      const biggestThreat = threats[0];
      action = {
        type: 'attack',
        target: biggestThreat.source,
        priority: 0.7,
        reason: 'counter_threat'
      };
    } else {
      // Action par défaut
      const closest = this._findClosestEnemy(unit, enemies);
      action = {
        type: 'attack',
        target: closest,
        priority: 0.5,
        reason: 'default'
      };
    }

    const duration = performance.now() - startTime;
    this.stats.avgDecisionTime = 
      (this.stats.avgDecisionTime * this.stats.combatsAnalyzed + duration) / 
      (this.stats.combatsAnalyzed + 1);

    return action;
  }

  /**
   * Évalue les menaces pour une unité
   */
  _evaluateThreats(unit, enemies) {
    return enemies
      .filter(e => e.isAlive)
      .map(enemy => {
        let threat = 0;

        // Distance (plus proche = plus menaçant)
        const distance = this._calculateDistance(unit.position, enemy.position);
        threat += (10 - distance) * 10;

        // Dégâts potentiels
        threat += enemy.attack || 0;

        // Type d'ennemi
        if (enemy.role === 'dps' || enemy.role === 'assassin') {
          threat *= 1.5;
        }

        // Si l'ennemi cible cette unité
        if (enemy.target === unit.id) {
          threat *= 2;
        }

        return { source: enemy, value: threat };
      })
      .sort((a, b) => b.value - a.value);
  }

  /**
   * Évalue les opportunités
   */
  _evaluateOpportunities(unit, enemies, allies) {
    const opportunities = [];

    enemies.forEach(enemy => {
      // Ennemi affaibli
      if (enemy.health < 30) {
        opportunities.push({
          type: 'attack',
          target: enemy,
          value: 0.85,
          reason: 'low_hp_target'
        });
      }

      // Ennemi isolé
      const nearbyAllies = allies.filter(a => 
        this._calculateDistance(a.position, enemy.position) < 3
      ).length;
      if (nearbyAllies === 0) {
        opportunities.push({
          type: 'attack',
          target: enemy,
          value: 0.75,
          reason: 'isolated_target'
        });
      }

      // Flanking possible
      if (this._canFlank(unit, enemy, allies)) {
        opportunities.push({
          type: 'flank',
          target: enemy,
          value: 0.9,
          reason: 'flanking_opportunity'
        });
      }
    });

    // Allié à soigner
    if (unit.role === 'support' || unit.canHeal) {
      const wounded = allies.find(a => a.health < 50 && a.id !== unit.id);
      if (wounded) {
        opportunities.push({
          type: 'heal',
          target: wounded,
          value: 0.8,
          reason: 'wounded_ally'
        });
      }
    }

    return opportunities.sort((a, b) => b.value - a.value);
  }

  /**
   * Vérifie si une unité peut flanquer
   */
  _canFlank(unit, enemy, allies) {
    // Une unité alliée doit être en face de l'ennemi
    const hasAllyInFront = allies.some(ally => {
      const allyToEnemy = {
        x: enemy.position.x - ally.position.x,
        y: enemy.position.y - ally.position.y
      };
      const unitToEnemy = {
        x: enemy.position.x - unit.position.x,
        y: enemy.position.y - unit.position.y
      };

      // Directions opposées
      const dotProduct = allyToEnemy.x * unitToEnemy.x + allyToEnemy.y * unitToEnemy.y;
      return dotProduct < 0;
    });

    return hasAllyInFront && this._calculateDistance(unit.position, enemy.position) <= 2;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 4: COORDINATION & TEAM TACTICS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Coordonne les actions d'une équipe
   */
  coordinateTeam(units, enemies, strategy) {
    if (!this.config.enableCoordination) {
      return units.map(u => this.decideUnitAction(u, units, enemies, strategy, {}));
    }

    const actions = [];
    const assignments = new Map(); // unitId → assignment

    // Identifie les cibles prioritaires
    const priorityTargets = this._identifyPriorityTargets(enemies);

    // Assigne les rôles de coordination
    priorityTargets.forEach(target => {
      const attackers = this._assignAttackers(units, target, 2); // 2 attaquants par cible
      attackers.forEach(attacker => {
        assignments.set(attacker.id, {
          type: 'coordinated_attack',
          target,
          priority: 0.9
        });
      });
    });

    // Support units protect DPS
    const supports = units.filter(u => u.role === 'support');
    const dps = units.filter(u => u.role === 'dps' && !assignments.has(u.id));

    if (supports.length > 0 && dps.length > 0) {
      supports.forEach(support => {
        const closestDPS = dps[0];
        assignments.set(support.id, {
          type: 'protect',
          target: closestDPS,
          priority: 0.75
        });
      });
    }

    // Génère les actions
    units.forEach(unit => {
      const assignment = assignments.get(unit.id);
      if (assignment) {
        actions.push({
          unitId: unit.id,
          action: assignment
        });
      } else {
        actions.push({
          unitId: unit.id,
          action: this.decideUnitAction(unit, units, enemies, strategy, {})
        });
      }
    });

    console.log(`[Combat AI] 🤝 Coordinated ${actions.length} units`);

    return actions;
  }

  /**
   * Identifie les cibles prioritaires
   */
  _identifyPriorityTargets(enemies) {
    return enemies
      .filter(e => e.isAlive)
      .map(enemy => {
        let priority = 0;

        // Healers = haute priorité
        if (enemy.role === 'support' || enemy.role === 'healer') {
          priority += 100;
        }

        // DPS = priorité moyenne
        if (enemy.role === 'dps' || enemy.role === 'assassin') {
          priority += 50;
        }

        // Ennemis affaiblis
        if (enemy.health < 30) {
          priority += 30;
        }

        // Ennemis dangereux (haut niveau)
        priority += (enemy.level || 1) * 5;

        return { enemy, priority };
      })
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 3)
      .map(t => t.enemy);
  }

  /**
   * Assigne des attaquants à une cible
   */
  _assignAttackers(units, target, count) {
    const available = units
      .filter(u => u.role === 'dps' || u.role === 'warrior')
      .filter(u => u.isAlive)
      .sort((a, b) => 
        this._calculateDistance(a.position, target.position) -
        this._calculateDistance(b.position, target.position)
      );

    return available.slice(0, count);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 5: LEARNING & ADAPTATION
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Enregistre le résultat d'un combat pour apprentissage
   */
  learnFromCombat(combatResult) {
    if (!this.config.enableLearning) return;

    const { victory, strategyUsed, formationUsed, duration, enemyPatterns } = combatResult;

    // Mise à jour du taux de réussite des stratégies
    if (strategyUsed) {
      const currentRate = this.combatMemory.successfulStrategies.get(strategyUsed) || 0.5;
      const newRate = victory ?
        Math.min(1.0, currentRate + this.config.learningRate) :
        Math.max(0.0, currentRate - this.config.learningRate);

      this.combatMemory.successfulStrategies.set(strategyUsed, newRate);

      if (!victory) {
        this.combatMemory.failedTactics.add(strategyUsed);
      }
    }

    // Mise à jour pour les formations
    if (formationUsed) {
      const currentRate = this.combatMemory.successfulStrategies.get(formationUsed) || 0.5;
      const newRate = victory ?
        Math.min(1.0, currentRate + this.config.learningRate * 0.5) :
        Math.max(0.0, currentRate - this.config.learningRate * 0.5);

      this.combatMemory.successfulStrategies.set(formationUsed, newRate);
    }

    // Apprentissage des faiblesses ennemies
    if (enemyPatterns && victory) {
      Object.entries(enemyPatterns).forEach(([enemyType, weakness]) => {
        const weaknesses = this.combatMemory.enemyWeaknesses.get(enemyType) || [];
        if (!weaknesses.includes(weakness)) {
          weaknesses.push(weakness);
          this.combatMemory.enemyWeaknesses.set(enemyType, weaknesses);
        }
      });
    }

    this.stats.strategiesLearned++;

    console.log(`[Combat AI] 📚 Learned from combat (${victory ? 'Victory' : 'Defeat'})`);
  }

  /**
   * Obtient la connaissance sur un type d'ennemi
   */
  getEnemyKnowledge(enemyType) {
    return {
      weaknesses: this.combatMemory.enemyWeaknesses.get(enemyType) || [],
      encounterCount: this.stats.combatsAnalyzed
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 6: UTILITIES
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Calcule la distance entre deux positions
   */
  _calculateDistance(pos1, pos2) {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Vérifie si une unité est à portée
   */
  _isInRange(unit, target) {
    const distance = this._calculateDistance(unit.position, target.position);
    const range = unit.attackRange || 1.5;
    return distance <= range;
  }

  /**
   * Trouve l'ennemi le plus proche
   */
  _findClosestEnemy(unit, enemies) {
    return enemies
      .filter(e => e.isAlive)
      .sort((a, b) => 
        this._calculateDistance(unit.position, a.position) -
        this._calculateDistance(unit.position, b.position)
      )[0];
  }

  /**
   * Trouve l'ennemi le plus faible
   */
  _findWeakestEnemy(enemies) {
    return enemies
      .filter(e => e.isAlive)
      .sort((a, b) => a.health - b.health)[0];
  }

  /**
   * Trouve la position la plus sûre
   */
  _findSafestPosition(unit, enemies) {
    // Position opposée aux ennemis
    const avgEnemyPos = {
      x: enemies.reduce((sum, e) => sum + e.position.x, 0) / enemies.length,
      y: enemies.reduce((sum, e) => sum + e.position.y, 0) / enemies.length
    };

    return {
      x: unit.position.x - (avgEnemyPos.x - unit.position.x),
      y: unit.position.y - (avgEnemyPos.y - unit.position.y)
    };
  }

  /**
   * Obtient les statistiques
   */
  getStats() {
    return {
      ...this.stats,
      totalPatterns: this.combatMemory.playerPatterns.size,
      learnedStrategies: this.combatMemory.successfulStrategies.size,
      knownWeaknesses: this.combatMemory.enemyWeaknesses.size,
      formationsAvailable: this.formations.size
    };
  }

  /**
   * Réinitialise le système
   */
  reset() {
    this.combatMemory = {
      playerPatterns: new Map(),
      successfulStrategies: new Map(),
      failedTactics: new Set(),
      enemyWeaknesses: new Map()
    };
    this.activeCombats.clear();
    this.unitBehaviors.clear();
    this.stats = {
      combatsAnalyzed: 0,
      patternsDetected: 0,
      strategiesLearned: 0,
      formationsUsed: 0,
      avgDecisionTime: 0
    };

    console.log('[Advanced Combat AI] 🔄 Reset complete');
  }
}

export default AdvancedCombatAI;
