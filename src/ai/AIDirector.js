/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                          🎭 AI DIRECTOR v4.0                              ║
 * ║                    Adaptive Game Master Intelligence                      ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * MISSION: Analyser le comportement des joueurs en temps réel et adapter
 *          dynamiquement la difficulté, les récompenses et le contenu pour
 *          maintenir un niveau d'engagement optimal.
 * 
 * CAPACITÉS:
 * - Analyse comportementale multi-dimensionnelle
 * - Ajustement dynamique de difficulté (DDA)
 * - Génération de contenu personnalisé
 * - Prédiction des actions joueur
 * - Détection de patterns de jeu
 * - Adaptation des ennemis et récompenses
 */

export class AIDirector {
  constructor(config = {}) {
    this.config = {
      enabled: config.enabled ?? true,
      analysisInterval: config.analysisInterval ?? 60000, // Analyse toutes les 60s
      difficultyWindow: config.difficultyWindow ?? 100, // Nombre d'actions analysées
      adaptationSpeed: config.adaptationSpeed ?? 0.1, // Vitesse d'adaptation (0-1)
      minDifficulty: config.minDifficulty ?? 0.3,
      maxDifficulty: config.maxDifficulty ?? 2.5,
      targetWinRate: config.targetWinRate ?? 0.65, // Taux de victoire cible
      targetCompletionRate: config.targetCompletionRate ?? 0.7,
      enablePrediction: config.enablePrediction ?? true,
      enablePersonalization: config.enablePersonalization ?? true,
      ...config
    };

    // État du directeur
    this.playerProfiles = new Map(); // playerId → Profile
    this.globalDifficulty = 1.0;
    this.currentSession = {
      startTime: Date.now(),
      eventCount: 0,
      adjustmentsMade: 0
    };

    // Métriques de performance
    this.stats = {
      totalAnalyses: 0,
      totalAdjustments: 0,
      avgAnalysisTime: 0,
      predictions: { correct: 0, total: 0 }
    };

    console.log('[AI Director] 🎭 Initialized - Adaptive difficulty system ready');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 1: PLAYER BEHAVIOR ANALYSIS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Analyse complète du comportement d'un joueur
   * @param {string} playerId - ID du joueur
   * @returns {Object} Profil comportemental détaillé
   */
  analyzePlayerBehavior(playerId) {
    const startTime = performance.now();
    
    const profile = this.getOrCreateProfile(playerId);
    
    // Analyse multi-dimensionnelle
    const analysis = {
      combat: this._analyzeCombatBehavior(profile),
      exploration: this._analyzeExplorationBehavior(profile),
      social: this._analyzeSocialBehavior(profile),
      economy: this._analyzeEconomyBehavior(profile),
      progression: this._analyzeProgressionBehavior(profile),
      engagement: this._analyzeEngagement(profile),
      difficulty: this._calculatePerceivedDifficulty(profile),
      playstyle: this._detectPlaystyle(profile),
      skillLevel: this._estimateSkillLevel(profile),
      timestamp: Date.now()
    };

    // Mise à jour du profil
    profile.lastAnalysis = analysis;
    profile.analysisHistory.push(analysis);
    if (profile.analysisHistory.length > 50) {
      profile.analysisHistory.shift(); // Keep last 50 analyses
    }

    // Statistiques
    const duration = performance.now() - startTime;
    this.stats.totalAnalyses++;
    this.stats.avgAnalysisTime = 
      (this.stats.avgAnalysisTime * (this.stats.totalAnalyses - 1) + duration) / 
      this.stats.totalAnalyses;

    console.log(`[AI Director] 📊 Analyzed player ${playerId} in ${duration.toFixed(2)}ms`);
    
    return analysis;
  }

  /**
   * Analyse du comportement en combat
   */
  _analyzeCombatBehavior(profile) {
    const combatData = profile.combatHistory;
    if (combatData.length === 0) {
      return { winRate: 0.5, avgDuration: 0, deathCount: 0, strategy: 'unknown' };
    }

    const recent = combatData.slice(-20); // 20 derniers combats
    const wins = recent.filter(c => c.victory).length;
    const deaths = recent.filter(c => c.died).length;
    const avgDuration = recent.reduce((sum, c) => sum + c.duration, 0) / recent.length;
    const avgDamageTaken = recent.reduce((sum, c) => sum + (c.damageTaken || 0), 0) / recent.length;
    const avgDamageDealt = recent.reduce((sum, c) => sum + (c.damageDealt || 0), 0) / recent.length;

    // Détection de stratégie
    const aggressiveActions = recent.reduce((sum, c) => sum + (c.attacks || 0), 0);
    const defensiveActions = recent.reduce((sum, c) => sum + (c.defenses || 0), 0);
    const supportActions = recent.reduce((sum, c) => sum + (c.heals || 0) + (c.buffs || 0), 0);

    let strategy = 'balanced';
    if (aggressiveActions > defensiveActions * 2) strategy = 'aggressive';
    else if (defensiveActions > aggressiveActions * 1.5) strategy = 'defensive';
    else if (supportActions > aggressiveActions * 0.5) strategy = 'support';

    return {
      winRate: wins / recent.length,
      deathCount: deaths,
      avgDuration,
      avgDamageTaken,
      avgDamageDealt,
      strategy,
      totalCombats: combatData.length,
      recentPerformance: this._calculateTrend(recent.map(c => c.victory ? 1 : 0))
    };
  }

  /**
   * Analyse du comportement d'exploration
   */
  _analyzeExplorationBehavior(profile) {
    const exploreData = profile.explorationHistory;
    if (exploreData.length === 0) {
      return { locationsVisited: 0, curiosity: 0.5, backtracking: 0 };
    }

    const uniqueLocations = new Set(exploreData.map(e => e.locationId)).size;
    const totalMoves = exploreData.length;
    const backtrackMoves = exploreData.filter(e => e.isBacktrack).length;
    const secretsFound = exploreData.filter(e => e.foundSecret).length;

    return {
      locationsVisited: uniqueLocations,
      curiosity: Math.min(1, secretsFound / Math.max(1, totalMoves / 20)),
      backtracking: backtrackMoves / totalMoves,
      explorationRate: uniqueLocations / Math.max(1, totalMoves / 10),
      secretsFound
    };
  }

  /**
   * Analyse des interactions sociales
   */
  _analyzeSocialBehavior(profile) {
    const socialData = profile.socialHistory;
    if (socialData.length === 0) {
      return { dialogueCount: 0, charisma: 0.5, aggression: 0.5 };
    }

    const totalDialogues = socialData.length;
    const persuasionAttempts = socialData.filter(s => s.type === 'persuade').length;
    const intimidationAttempts = socialData.filter(s => s.type === 'intimidate').length;
    const friendlyInteractions = socialData.filter(s => s.tone === 'friendly').length;
    const aggressiveInteractions = socialData.filter(s => s.tone === 'aggressive').length;

    return {
      dialogueCount: totalDialogues,
      charisma: friendlyInteractions / totalDialogues,
      aggression: aggressiveInteractions / totalDialogues,
      persuasionRate: persuasionAttempts / totalDialogues,
      intimidationRate: intimidationAttempts / totalDialogues
    };
  }

  /**
   * Analyse du comportement économique
   */
  _analyzeEconomyBehavior(profile) {
    const economyData = profile.economyHistory;
    if (economyData.length === 0) {
      return { goldSpent: 0, tradingActivity: 0, savingRate: 0.5 };
    }

    const totalSpent = economyData.reduce((sum, e) => sum + (e.spent || 0), 0);
    const totalEarned = economyData.reduce((sum, e) => sum + (e.earned || 0), 0);
    const trades = economyData.filter(e => e.type === 'trade').length;

    return {
      goldSpent: totalSpent,
      goldEarned: totalEarned,
      netWorth: totalEarned - totalSpent,
      tradingActivity: trades / economyData.length,
      savingRate: Math.max(0, (totalEarned - totalSpent) / Math.max(1, totalEarned)),
      impulseBuying: economyData.filter(e => e.impulsive).length / economyData.length
    };
  }

  /**
   * Analyse de la progression
   */
  _analyzeProgressionBehavior(profile) {
    const progressData = profile.progressionHistory;
    if (progressData.length === 0) {
      return { level: 1, xpRate: 0, questCompletionRate: 0.5 };
    }

    const recent = progressData.slice(-30);
    const questsCompleted = recent.filter(p => p.type === 'quest' && p.completed).length;
    const questsAttempted = recent.filter(p => p.type === 'quest').length;
    const avgQuestTime = recent
      .filter(p => p.type === 'quest' && p.completed)
      .reduce((sum, p) => sum + (p.duration || 0), 0) / Math.max(1, questsCompleted);

    return {
      level: profile.currentLevel,
      xpRate: recent.reduce((sum, p) => sum + (p.xpGained || 0), 0) / recent.length,
      questCompletionRate: questsCompleted / Math.max(1, questsAttempted),
      avgQuestTime,
      totalQuestsCompleted: questsCompleted,
      progressionSpeed: this._calculateTrend(recent.map(p => p.xpGained || 0))
    };
  }

  /**
   * Analyse de l'engagement
   */
  _analyzeEngagement(profile) {
    const sessionData = profile.sessionHistory;
    if (sessionData.length === 0) {
      return { sessionLength: 0, frequency: 0, retention: 0.5 };
    }

    const avgSessionLength = sessionData.reduce((sum, s) => sum + s.duration, 0) / sessionData.length;
    const totalPlayTime = sessionData.reduce((sum, s) => sum + s.duration, 0);
    const daysSinceStart = (Date.now() - profile.createdAt) / (1000 * 60 * 60 * 24);
    const frequency = sessionData.length / Math.max(1, daysSinceStart);

    // Calcul de la rétention (sessions dans les 7 derniers jours)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentSessions = sessionData.filter(s => s.timestamp > sevenDaysAgo).length;

    return {
      sessionLength: avgSessionLength,
      frequency,
      retention: Math.min(1, recentSessions / 7),
      totalPlayTime,
      sessionCount: sessionData.length,
      actionsPerMinute: profile.totalActions / (totalPlayTime / 60000)
    };
  }

  /**
   * Calcule la difficulté perçue par le joueur
   */
  _calculatePerceivedDifficulty(profile) {
    const combat = this._analyzeCombatBehavior(profile);
    const progression = this._analyzeProgressionBehavior(profile);

    // Difficulté basée sur:
    // - Taux de victoire (plus bas = plus difficile)
    // - Nombre de morts
    // - Taux de complétion de quêtes
    // - Vitesse de progression

    const winRateFactor = 1 - combat.winRate; // 0 = facile, 1 = difficile
    const deathFactor = Math.min(1, combat.deathCount / 10);
    const questFactor = 1 - progression.questCompletionRate;

    const perceivedDifficulty = (winRateFactor * 0.4 + deathFactor * 0.3 + questFactor * 0.3);

    return {
      value: perceivedDifficulty,
      level: perceivedDifficulty < 0.3 ? 'too_easy' :
             perceivedDifficulty < 0.5 ? 'balanced' :
             perceivedDifficulty < 0.7 ? 'challenging' : 'too_hard',
      confidence: Math.min(1, profile.totalActions / 100)
    };
  }

  /**
   * Détecte le style de jeu du joueur
   */
  _detectPlaystyle(profile) {
    const combat = this._analyzeCombatBehavior(profile);
    const exploration = this._analyzeExplorationBehavior(profile);
    const social = this._analyzeSocialBehavior(profile);

    const styles = {
      warrior: combat.strategy === 'aggressive' ? 0.8 : 0.3,
      tank: combat.strategy === 'defensive' ? 0.8 : 0.3,
      support: combat.strategy === 'support' ? 0.8 : 0.2,
      explorer: exploration.curiosity * 0.9,
      completionist: exploration.explorationRate * 0.9,
      diplomat: social.charisma * 0.9,
      merchant: profile.economyHistory.length / Math.max(1, profile.totalActions) * 2,
      speedrunner: combat.avgDuration < 30 ? 0.8 : 0.2
    };

    // Trouve le style dominant
    const dominant = Object.entries(styles)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return {
      primary: dominant[0][0],
      secondary: dominant[1]?.[0] || 'balanced',
      scores: styles,
      confidence: Math.min(1, profile.totalActions / 50)
    };
  }

  /**
   * Estime le niveau de compétence du joueur
   */
  _estimateSkillLevel(profile) {
    const combat = this._analyzeCombatBehavior(profile);
    const progression = this._analyzeProgressionBehavior(profile);
    const engagement = this._analyzeEngagement(profile);

    // Facteurs de compétence:
    // - Performance en combat
    // - Vitesse de progression
    // - Efficacité des actions
    // - Adaptation (amélioration au fil du temps)

    const combatSkill = combat.winRate * 0.4 + (1 - combat.deathCount / 20) * 0.3 + 
                        (combat.avgDamageDealt / Math.max(1, combat.avgDamageTaken)) * 0.1;
    const progressionSkill = progression.questCompletionRate * 0.5 + 
                             Math.min(1, progression.xpRate / 100) * 0.3;
    const efficiencySkill = Math.min(1, engagement.actionsPerMinute / 5) * 0.3;

    // Calcul de l'amélioration (trend des dernières analyses)
    const improvement = profile.analysisHistory.length > 10 ?
      this._calculateTrend(profile.analysisHistory.slice(-10).map(a => 
        a.combat.winRate * 0.5 + a.progression.questCompletionRate * 0.5
      )) : 0;

    const skillScore = (combatSkill * 0.4 + progressionSkill * 0.4 + efficiencySkill * 0.2);

    return {
      score: skillScore,
      level: skillScore < 0.3 ? 'novice' :
             skillScore < 0.5 ? 'intermediate' :
             skillScore < 0.7 ? 'advanced' : 'expert',
      improvement,
      trending: improvement > 0.1 ? 'up' : improvement < -0.1 ? 'down' : 'stable',
      confidence: Math.min(1, profile.totalActions / 100)
    };
  }

  /**
   * Calcule la tendance d'une série de valeurs (régression linéaire simple)
   */
  _calculateTrend(values) {
    if (values.length < 2) return 0;
    
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, i) => sum + i * val, 0);
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2: DYNAMIC DIFFICULTY ADJUSTMENT
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Ajuste dynamiquement la difficulté pour un joueur
   * @param {string} playerId - ID du joueur
   * @param {Object} context - Contexte actuel (combat, exploration, etc.)
   * @returns {Object} Ajustements à appliquer
   */
  adjustDifficulty(playerId, context = {}) {
    if (!this.config.enabled) {
      return { multiplier: 1.0, adjustments: {} };
    }

    const profile = this.getOrCreateProfile(playerId);
    const analysis = this.analyzePlayerBehavior(playerId);

    // Calcul du multiplicateur de difficulté
    const targetDifficulty = this._calculateTargetDifficulty(analysis);
    const currentDifficulty = profile.difficultyMultiplier || 1.0;

    // Ajustement progressif (évite les changements brusques)
    const newDifficulty = currentDifficulty + 
      (targetDifficulty - currentDifficulty) * this.config.adaptationSpeed;

    // Limites
    const clampedDifficulty = Math.max(
      this.config.minDifficulty,
      Math.min(this.config.maxDifficulty, newDifficulty)
    );

    profile.difficultyMultiplier = clampedDifficulty;

    // Génération des ajustements spécifiques
    const adjustments = this._generateAdjustments(clampedDifficulty, analysis, context);

    // Statistiques
    if (Math.abs(clampedDifficulty - currentDifficulty) > 0.01) {
      this.stats.totalAdjustments++;
      this.currentSession.adjustmentsMade++;
    }

    console.log(`[AI Director] ⚖️ Adjusted difficulty for ${playerId}: ${currentDifficulty.toFixed(2)} → ${clampedDifficulty.toFixed(2)}`);

    return {
      multiplier: clampedDifficulty,
      previousMultiplier: currentDifficulty,
      adjustments,
      reason: this._explainAdjustment(analysis, targetDifficulty),
      timestamp: Date.now()
    };
  }

  /**
   * Calcule la difficulté cible basée sur l'analyse
   */
  _calculateTargetDifficulty(analysis) {
    const { combat, progression, difficulty, skillLevel } = analysis;

    // Objectif: maintenir le joueur dans la "zone de flow"
    // - Trop facile → augmenter
    // - Trop difficile → diminuer

    let target = 1.0;

    // Ajustement basé sur le taux de victoire
    if (combat.winRate > this.config.targetWinRate + 0.1) {
      target += 0.2; // Trop facile
    } else if (combat.winRate < this.config.targetWinRate - 0.1) {
      target -= 0.2; // Trop difficile
    }

    // Ajustement basé sur les morts
    if (combat.deathCount > 5) {
      target -= 0.15;
    } else if (combat.deathCount === 0 && combat.totalCombats > 10) {
      target += 0.1;
    }

    // Ajustement basé sur la progression
    if (progression.questCompletionRate > this.config.targetCompletionRate + 0.1) {
      target += 0.1;
    } else if (progression.questCompletionRate < this.config.targetCompletionRate - 0.1) {
      target -= 0.1;
    }

    // Ajustement basé sur le niveau de compétence
    if (skillLevel.level === 'expert' && skillLevel.trending === 'up') {
      target += 0.15;
    } else if (skillLevel.level === 'novice') {
      target -= 0.1;
    }

    // Ajustement basé sur la difficulté perçue
    if (difficulty.level === 'too_easy') {
      target += 0.2;
    } else if (difficulty.level === 'too_hard') {
      target -= 0.2;
    }

    return Math.max(0.5, Math.min(2.0, target));
  }

  /**
   * Génère les ajustements spécifiques à appliquer
   */
  _generateAdjustments(multiplier, analysis, context) {
    const adjustments = {
      enemies: {},
      rewards: {},
      environment: {},
      assistance: {}
    };

    // ENNEMIS
    adjustments.enemies.healthMultiplier = 0.8 + multiplier * 0.4; // 0.8x à 1.2x
    adjustments.enemies.damageMultiplier = 0.85 + multiplier * 0.3; // 0.85x à 1.15x
    adjustments.enemies.spawnRate = 0.7 + multiplier * 0.6; // 0.7x à 1.3x
    adjustments.enemies.aiAggression = Math.min(1, multiplier); // 0 à 1
    adjustments.enemies.levelVariance = multiplier > 1.2 ? 2 : multiplier < 0.8 ? 0 : 1;

    // RÉCOMPENSES (inversement proportionnel)
    adjustments.rewards.xpMultiplier = 1.3 - multiplier * 0.3; // 1.0x à 1.3x
    adjustments.rewards.goldMultiplier = 1.25 - multiplier * 0.25; // 1.0x à 1.25x
    adjustments.rewards.lootQuality = multiplier < 0.8 ? 1.2 : multiplier > 1.2 ? 0.9 : 1.0;
    adjustments.rewards.bonusDropChance = Math.max(0, (1.0 - multiplier) * 0.2); // 0% à 20%

    // ENVIRONNEMENT
    if (context.type === 'exploration') {
      adjustments.environment.trapDamage = 0.7 + multiplier * 0.6;
      adjustments.environment.hazardFrequency = 0.8 + multiplier * 0.4;
      adjustments.environment.resourceAvailability = 1.2 - multiplier * 0.2;
    }

    // ASSISTANCE
    if (multiplier < 0.8) {
      adjustments.assistance.hintFrequency = 1.5; // Plus d'indices
      adjustments.assistance.healingPotionChance = 0.3;
      adjustments.assistance.npcSupportChance = 0.2;
    } else if (multiplier > 1.3) {
      adjustments.assistance.hintFrequency = 0.5; // Moins d'indices
      adjustments.assistance.healingPotionChance = 0.05;
      adjustments.assistance.npcSupportChance = 0.0;
    } else {
      adjustments.assistance.hintFrequency = 1.0;
      adjustments.assistance.healingPotionChance = 0.15;
      adjustments.assistance.npcSupportChance = 0.1;
    }

    // Ajustements spécifiques au style de jeu
    const playstyle = analysis.playstyle.primary;
    if (playstyle === 'warrior' || playstyle === 'tank') {
      adjustments.enemies.damageMultiplier *= 1.1; // Plus de challenge en combat
    } else if (playstyle === 'explorer') {
      adjustments.environment.secretChance = 1.3; // Plus de secrets
    } else if (playstyle === 'diplomat') {
      adjustments.assistance.npcSupportChance *= 1.5; // Plus d'aide des PNJ
    }

    return adjustments;
  }

  /**
   * Explique pourquoi l'ajustement a été fait
   */
  _explainAdjustment(analysis, targetDifficulty) {
    const reasons = [];

    if (analysis.combat.winRate > this.config.targetWinRate + 0.1) {
      reasons.push(`Taux de victoire élevé (${(analysis.combat.winRate * 100).toFixed(0)}%)`);
    } else if (analysis.combat.winRate < this.config.targetWinRate - 0.1) {
      reasons.push(`Taux de victoire faible (${(analysis.combat.winRate * 100).toFixed(0)}%)`);
    }

    if (analysis.combat.deathCount > 5) {
      reasons.push(`Nombre de morts élevé (${analysis.combat.deathCount})`);
    }

    if (analysis.progression.questCompletionRate > this.config.targetCompletionRate + 0.1) {
      reasons.push(`Progression rapide (${(analysis.progression.questCompletionRate * 100).toFixed(0)}%)`);
    } else if (analysis.progression.questCompletionRate < this.config.targetCompletionRate - 0.1) {
      reasons.push(`Progression lente (${(analysis.progression.questCompletionRate * 100).toFixed(0)}%)`);
    }

    if (analysis.difficulty.level === 'too_easy') {
      reasons.push('Difficulté perçue trop faible');
    } else if (analysis.difficulty.level === 'too_hard') {
      reasons.push('Difficulté perçue trop élevée');
    }

    if (analysis.skillLevel.trending === 'up') {
      reasons.push('Compétences en amélioration');
    } else if (analysis.skillLevel.trending === 'down') {
      reasons.push('Performances en baisse');
    }

    return reasons.join(', ') || 'Ajustement d\'équilibrage';
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3: PERSONALIZED CONTENT GENERATION
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Génère du contenu personnalisé basé sur le profil du joueur
   * @param {string} playerId - ID du joueur
   * @param {string} contentType - Type de contenu ('quest', 'encounter', 'event', 'reward')
   * @param {Object} context - Contexte supplémentaire
   * @returns {Object} Contenu généré
   */
  generatePersonalizedContent(playerId, contentType, context = {}) {
    if (!this.config.enablePersonalization) {
      return null;
    }

    const profile = this.getOrCreateProfile(playerId);
    const analysis = profile.lastAnalysis || this.analyzePlayerBehavior(playerId);

    switch (contentType) {
      case 'quest':
        return this._generatePersonalizedQuest(analysis, context);
      case 'encounter':
        return this._generatePersonalizedEncounter(analysis, context);
      case 'event':
        return this._generatePersonalizedEvent(analysis, context);
      case 'reward':
        return this._generatePersonalizedReward(analysis, context);
      default:
        console.warn(`[AI Director] Unknown content type: ${contentType}`);
        return null;
    }
  }

  /**
   * Génère une quête personnalisée
   */
  _generatePersonalizedQuest(analysis, context) {
    const playstyle = analysis.playstyle.primary;
    const skillLevel = analysis.skillLevel.level;

    const questTemplates = {
      warrior: [
        { type: 'combat', objective: 'defeat', target: 'enemies', count: 10 },
        { type: 'boss', objective: 'defeat_boss', target: 'champion', count: 1 }
      ],
      explorer: [
        { type: 'discovery', objective: 'find', target: 'location', count: 3 },
        { type: 'collection', objective: 'collect', target: 'artifacts', count: 5 }
      ],
      diplomat: [
        { type: 'negotiation', objective: 'convince', target: 'npcs', count: 3 },
        { type: 'alliance', objective: 'ally', target: 'faction', count: 1 }
      ],
      merchant: [
        { type: 'trade', objective: 'earn', target: 'gold', count: 1000 },
        { type: 'delivery', objective: 'deliver', target: 'goods', count: 5 }
      ]
    };

    const templates = questTemplates[playstyle] || questTemplates.warrior;
    const template = templates[Math.floor(Math.random() * templates.length)];

    // Ajustement de la difficulté
    const difficultyMod = {
      novice: 0.6,
      intermediate: 0.9,
      advanced: 1.2,
      expert: 1.5
    }[skillLevel];

    return {
      id: `personalized_${Date.now()}`,
      type: template.type,
      objective: template.objective,
      target: template.target,
      count: Math.ceil(template.count * difficultyMod),
      reward: {
        xp: Math.floor(100 * difficultyMod * (analysis.progression.level || 1)),
        gold: Math.floor(50 * difficultyMod * (analysis.progression.level || 1))
      },
      personalizedFor: playstyle,
      difficultyLevel: skillLevel
    };
  }

  /**
   * Génère une rencontre personnalisée
   */
  _generatePersonalizedEncounter(analysis, context) {
    const combat = analysis.combat;
    const skillLevel = analysis.skillLevel.level;

    // Types d'ennemis adaptés
    const enemyTypes = {
      aggressive: ['berserker', 'assassin', 'demon'],
      defensive: ['tank', 'guardian', 'golem'],
      support: ['cleric', 'buffer', 'healer']
    };

    const counterStrategy = combat.strategy === 'aggressive' ? 'defensive' :
                           combat.strategy === 'defensive' ? 'aggressive' : 'support';

    const enemies = enemyTypes[counterStrategy] || enemyTypes.aggressive;
    const enemyType = enemies[Math.floor(Math.random() * enemies.length)];

    const levelMod = {
      novice: -2,
      intermediate: 0,
      advanced: 1,
      expert: 3
    }[skillLevel];

    const playerLevel = analysis.progression.level || 1;

    return {
      enemyType,
      level: Math.max(1, playerLevel + levelMod),
      count: combat.strategy === 'aggressive' ? 2 : 1,
      tactics: counterStrategy,
      personalizedFor: combat.strategy,
      challenge: skillLevel
    };
  }

  /**
   * Génère un événement personnalisé
   */
  _generatePersonalizedEvent(analysis, context) {
    const exploration = analysis.exploration;
    const social = analysis.social;

    let eventType;
    if (exploration.curiosity > 0.7) {
      eventType = 'discovery';
    } else if (social.charisma > 0.7) {
      eventType = 'social';
    } else {
      eventType = 'challenge';
    }

    const events = {
      discovery: [
        { id: 'hidden_passage', description: 'Un passage secret révélé' },
        { id: 'ancient_artifact', description: 'Un artefact ancien découvert' }
      ],
      social: [
        { id: 'npc_encounter', description: 'Rencontre avec un PNJ important' },
        { id: 'faction_event', description: 'Événement de faction' }
      ],
      challenge: [
        { id: 'ambush', description: 'Embuscade ennemie' },
        { id: 'trap', description: 'Piège mortel' }
      ]
    };

    const options = events[eventType];
    const event = options[Math.floor(Math.random() * options.length)];

    return {
      ...event,
      type: eventType,
      personalizedFor: eventType,
      timestamp: Date.now()
    };
  }

  /**
   * Génère une récompense personnalisée
   */
  _generatePersonalizedReward(analysis, context) {
    const playstyle = analysis.playstyle.primary;
    const combat = analysis.combat;

    const rewardTypes = {
      warrior: ['weapon', 'damage_boost'],
      tank: ['armor', 'health_boost'],
      support: ['healing_item', 'mana_boost'],
      explorer: ['map', 'compass'],
      diplomat: ['charm', 'reputation_boost'],
      merchant: ['gold', 'rare_item']
    };

    const types = rewardTypes[playstyle] || rewardTypes.warrior;
    const rewardType = types[Math.floor(Math.random() * types.length)];

    const quality = analysis.skillLevel.level === 'expert' ? 'legendary' :
                   analysis.skillLevel.level === 'advanced' ? 'epic' :
                   analysis.skillLevel.level === 'intermediate' ? 'rare' : 'common';

    return {
      type: rewardType,
      quality,
      personalizedFor: playstyle,
      value: Math.floor(100 * (analysis.progression.level || 1)),
      timestamp: Date.now()
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 4: PLAYER ACTION PREDICTION
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Prédit la prochaine action probable du joueur
   * @param {string} playerId - ID du joueur
   * @param {Object} context - Contexte actuel
   * @returns {Object} Prédiction avec probabilités
   */
  predictPlayerAction(playerId, context = {}) {
    if (!this.config.enablePrediction) {
      return null;
    }

    const profile = this.getOrCreateProfile(playerId);
    const analysis = profile.lastAnalysis || this.analyzePlayerBehavior(playerId);

    // Analyse des patterns récents
    const recentActions = profile.actionHistory.slice(-20);
    if (recentActions.length < 5) {
      return { confidence: 'low', predictions: [] };
    }

    // Détection de patterns
    const patterns = this._detectActionPatterns(recentActions);
    
    // Prédiction basée sur le contexte
    const predictions = this._generatePredictions(analysis, context, patterns);

    // Tri par probabilité
    predictions.sort((a, b) => b.probability - a.probability);

    return {
      confidence: recentActions.length > 15 ? 'high' : 'medium',
      predictions: predictions.slice(0, 5),
      patterns,
      timestamp: Date.now()
    };
  }

  /**
   * Détecte les patterns dans l'historique d'actions
   */
  _detectActionPatterns(actions) {
    const patterns = {
      sequences: [],
      frequency: {},
      timing: {}
    };

    // Fréquence des actions
    actions.forEach(action => {
      patterns.frequency[action.type] = (patterns.frequency[action.type] || 0) + 1;
    });

    // Séquences communes (actions consécutives)
    for (let i = 0; i < actions.length - 1; i++) {
      const sequence = `${actions[i].type}->${actions[i + 1].type}`;
      const existing = patterns.sequences.find(s => s.sequence === sequence);
      if (existing) {
        existing.count++;
      } else {
        patterns.sequences.push({ sequence, count: 1 });
      }
    }

    // Timing (temps entre actions)
    for (let i = 1; i < actions.length; i++) {
      const type = actions[i].type;
      const timeDiff = actions[i].timestamp - actions[i - 1].timestamp;
      if (!patterns.timing[type]) {
        patterns.timing[type] = [];
      }
      patterns.timing[type].push(timeDiff);
    }

    return patterns;
  }

  /**
   * Génère les prédictions d'actions
   */
  _generatePredictions(analysis, context, patterns) {
    const predictions = [];

    // Prédiction basée sur le style de jeu
    const playstyle = analysis.playstyle.primary;
    const styleActions = {
      warrior: [
        { action: 'attack', probability: 0.7 },
        { action: 'move_forward', probability: 0.6 },
        { action: 'use_combat_ability', probability: 0.5 }
      ],
      tank: [
        { action: 'defend', probability: 0.7 },
        { action: 'taunt', probability: 0.6 },
        { action: 'position_defensive', probability: 0.5 }
      ],
      explorer: [
        { action: 'investigate', probability: 0.7 },
        { action: 'search', probability: 0.6 },
        { action: 'map_area', probability: 0.5 }
      ],
      diplomat: [
        { action: 'talk', probability: 0.7 },
        { action: 'persuade', probability: 0.6 },
        { action: 'negotiate', probability: 0.5 }
      ]
    };

    const basePredictions = styleActions[playstyle] || styleActions.warrior;

    // Ajustement basé sur les patterns
    basePredictions.forEach(pred => {
      const frequency = patterns.frequency[pred.action] || 0;
      const totalActions = Object.values(patterns.frequency).reduce((sum, val) => sum + val, 0);
      const frequencyBonus = frequency / totalActions;

      predictions.push({
        action: pred.action,
        probability: Math.min(0.95, pred.probability + frequencyBonus),
        reason: `Style: ${playstyle}, Fréquence: ${(frequencyBonus * 100).toFixed(0)}%`
      });
    });

    // Prédiction basée sur le contexte
    if (context.inCombat) {
      const combatStrategy = analysis.combat.strategy;
      if (combatStrategy === 'aggressive') {
        predictions.push({ action: 'attack', probability: 0.85, reason: 'Combat actif, style agressif' });
      } else if (combatStrategy === 'defensive') {
        predictions.push({ action: 'defend', probability: 0.8, reason: 'Combat actif, style défensif' });
      }
    }

    if (context.lowHealth && analysis.combat.strategy !== 'aggressive') {
      predictions.push({ action: 'heal', probability: 0.9, reason: 'Santé faible' });
      predictions.push({ action: 'retreat', probability: 0.7, reason: 'Santé faible' });
    }

    if (context.nearNPC && analysis.social.charisma > 0.6) {
      predictions.push({ action: 'talk', probability: 0.75, reason: 'PNJ à proximité, haute charisme' });
    }

    // Prédiction basée sur les séquences
    if (patterns.sequences.length > 0) {
      const topSequence = patterns.sequences.sort((a, b) => b.count - a.count)[0];
      const [, nextAction] = topSequence.sequence.split('->');
      predictions.push({
        action: nextAction,
        probability: 0.7,
        reason: `Séquence habituelle (${topSequence.count}x)`
      });
    }

    return predictions;
  }

  /**
   * Enregistre une action et vérifie si elle était prédite
   * @param {string} playerId - ID du joueur
   * @param {string} action - Action effectuée
   * @param {Object} lastPrediction - Dernière prédiction faite
   */
  recordActionAndVerify(playerId, action, lastPrediction) {
    const profile = this.getOrCreateProfile(playerId);

    // Enregistrement
    profile.actionHistory.push({
      type: action,
      timestamp: Date.now()
    });

    if (profile.actionHistory.length > 100) {
      profile.actionHistory.shift();
    }

    profile.totalActions++;

    // Vérification de la prédiction
    if (lastPrediction && lastPrediction.predictions) {
      const predicted = lastPrediction.predictions.find(p => p.action === action);
      if (predicted) {
        this.stats.predictions.correct++;
        console.log(`[AI Director] ✅ Predicted ${action} correctly (${(predicted.probability * 100).toFixed(0)}%)`);
      }
      this.stats.predictions.total++;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 5: PROFILE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Récupère ou crée un profil joueur
   */
  getOrCreateProfile(playerId) {
    if (!this.playerProfiles.has(playerId)) {
      this.playerProfiles.set(playerId, {
        playerId,
        createdAt: Date.now(),
        currentLevel: 1,
        totalActions: 0,
        difficultyMultiplier: 1.0,
        
        // Historiques
        combatHistory: [],
        explorationHistory: [],
        socialHistory: [],
        economyHistory: [],
        progressionHistory: [],
        sessionHistory: [],
        actionHistory: [],
        analysisHistory: [],

        // Dernière analyse
        lastAnalysis: null,
        lastAnalysisTime: 0
      });
    }
    return this.playerProfiles.get(playerId);
  }

  /**
   * Enregistre un événement de combat
   */
  recordCombatEvent(playerId, event) {
    const profile = this.getOrCreateProfile(playerId);
    profile.combatHistory.push({
      ...event,
      timestamp: Date.now()
    });
    if (profile.combatHistory.length > 50) {
      profile.combatHistory.shift();
    }
  }

  /**
   * Enregistre un événement d'exploration
   */
  recordExplorationEvent(playerId, event) {
    const profile = this.getOrCreateProfile(playerId);
    profile.explorationHistory.push({
      ...event,
      timestamp: Date.now()
    });
    if (profile.explorationHistory.length > 100) {
      profile.explorationHistory.shift();
    }
  }

  /**
   * Enregistre un événement social
   */
  recordSocialEvent(playerId, event) {
    const profile = this.getOrCreateProfile(playerId);
    profile.socialHistory.push({
      ...event,
      timestamp: Date.now()
    });
    if (profile.socialHistory.length > 50) {
      profile.socialHistory.shift();
    }
  }

  /**
   * Enregistre un événement économique
   */
  recordEconomyEvent(playerId, event) {
    const profile = this.getOrCreateProfile(playerId);
    profile.economyHistory.push({
      ...event,
      timestamp: Date.now()
    });
    if (profile.economyHistory.length > 100) {
      profile.economyHistory.shift();
    }
  }

  /**
   * Enregistre un événement de progression
   */
  recordProgressionEvent(playerId, event) {
    const profile = this.getOrCreateProfile(playerId);
    profile.progressionHistory.push({
      ...event,
      timestamp: Date.now()
    });
    if (event.level) {
      profile.currentLevel = event.level;
    }
    if (profile.progressionHistory.length > 100) {
      profile.progressionHistory.shift();
    }
  }

  /**
   * Démarre une nouvelle session
   */
  startSession(playerId) {
    const profile = this.getOrCreateProfile(playerId);
    profile.currentSession = {
      startTime: Date.now(),
      actions: 0
    };
  }

  /**
   * Termine une session
   */
  endSession(playerId) {
    const profile = this.getOrCreateProfile(playerId);
    if (profile.currentSession) {
      const duration = Date.now() - profile.currentSession.startTime;
      profile.sessionHistory.push({
        duration,
        actions: profile.currentSession.actions,
        timestamp: profile.currentSession.startTime
      });
      profile.currentSession = null;

      if (profile.sessionHistory.length > 30) {
        profile.sessionHistory.shift();
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 6: UTILITIES & STATS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Obtient les statistiques globales du directeur
   */
  getStats() {
    return {
      ...this.stats,
      totalPlayers: this.playerProfiles.size,
      globalDifficulty: this.globalDifficulty,
      sessionInfo: this.currentSession,
      predictionAccuracy: this.stats.predictions.total > 0 ?
        this.stats.predictions.correct / this.stats.predictions.total : 0
    };
  }

  /**
   * Obtient un résumé du profil d'un joueur
   */
  getPlayerSummary(playerId) {
    const profile = this.getOrCreateProfile(playerId);
    const analysis = profile.lastAnalysis || this.analyzePlayerBehavior(playerId);

    return {
      playerId,
      level: profile.currentLevel,
      playstyle: analysis.playstyle.primary,
      skillLevel: analysis.skillLevel.level,
      difficultyMultiplier: profile.difficultyMultiplier,
      totalPlayTime: profile.sessionHistory.reduce((sum, s) => sum + s.duration, 0),
      totalActions: profile.totalActions,
      performance: {
        winRate: analysis.combat.winRate,
        questCompletionRate: analysis.progression.questCompletionRate,
        engagement: analysis.engagement.retention
      }
    };
  }

  /**
   * Réinitialise les données d'un joueur
   */
  resetPlayer(playerId) {
    this.playerProfiles.delete(playerId);
    console.log(`[AI Director] 🔄 Reset player ${playerId}`);
  }

  /**
   * Réinitialise toutes les données
   */
  reset() {
    this.playerProfiles.clear();
    this.globalDifficulty = 1.0;
    this.currentSession = {
      startTime: Date.now(),
      eventCount: 0,
      adjustmentsMade: 0
    };
    this.stats = {
      totalAnalyses: 0,
      totalAdjustments: 0,
      avgAnalysisTime: 0,
      predictions: { correct: 0, total: 0 }
    };
    console.log('[AI Director] 🔄 System reset complete');
  }
}

export default AIDirector;
