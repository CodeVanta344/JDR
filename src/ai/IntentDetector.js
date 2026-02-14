// ═══════════════════════════════════════════════════════════════════════
// 🎯 INTENT DETECTOR - Détection d'intention des actions joueur
// ═══════════════════════════════════════════════════════════════════════
// Analyse le texte du joueur pour déterminer quelle action il veut faire
// (combat, dialogue, exploration, achat, craft, etc.)

export class IntentDetector {
  constructor() {
    // Patterns de mots-clés par intention
    this.patterns = {
      combat: {
        keywords: [
          'attaque', 'frappe', 'coup', 'tue', 'combat', 'défend',
          'esquive', 'pare', 'riposte', 'charge', 'sort', 'lance',
          'tire', 'vise', 'dégaine', 'brandis', 'fonce', 'rush'
        ],
        priority: 10 // Combat = prioritaire
      },
      
      dialogue: {
        keywords: [
          'parle', 'dis', 'demande', 'interroge', 'salue', 'discute',
          'conversation', 'répond', 'questionne', 'interpelle', 'crie',
          'murmure', 'chuchote', 'hurle', 'appelle', 'hèle'
        ],
        priority: 8
      },
      
      merchant: {
        keywords: [
          'achète', 'vend', 'marchand', 'boutique', 'commerce', 'prix',
          'coûte', 'combien', 'négocie', 'troc', 'échange', 'commerce',
          'forge', 'échoppe', 'magasin', 'taverne', 'auberge'
        ],
        priority: 9
      },
      
      crafting: {
        keywords: [
          'fabrique', 'craft', 'forge', 'crée', 'assemble', 'construit',
          'répare', 'améliore', 'enchante', 'tanne', 'coud', 'brasse',
          'cuisine', 'taille', 'mine', 'récolte', 'pêche', 'dépeçe'
        ],
        priority: 7
      },
      
      exploration: {
        keywords: [
          'explore', 'cherche', 'fouille', 'regarde', 'inspecte', 'examine',
          'va', 'marche', 'avance', 'dirige', 'monte', 'descend',
          'entre', 'sors', 'ouvre', 'pousse', 'tire', 'escalade'
        ],
        priority: 5
      },
      
      quest: {
        keywords: [
          'quête', 'mission', 'objectif', 'journal', 'contrat', 'tâche',
          'accepte', 'complète', 'termine', 'accomplis', 'réussis'
        ],
        priority: 6
      },
      
      rest: {
        keywords: [
          'repos', 'dort', 'campe', 'dort', 'se repose', 'auberge',
          'lit', 'chambre', 'nuit', 'médite', 'récupère'
        ],
        priority: 4
      },
      
      inventory: {
        keywords: [
          'inventaire', 'sac', 'équipe', 'déséquipe', 'utilise', 'consomme',
          'bois', 'mange', 'range', 'jette', 'drop', 'ramasse', 'prend'
        ],
        priority: 3
      }
    };

    // Patterns d'entités (extraction d'informations)
    this.entityPatterns = {
      target: /(?:sur|contre|à)\s+(?:le|la|l'|un|une)?\s*([a-zàâäçèéêëîïôùûü\s]+)/gi,
      item: /(?:épée|potion|armure|bouclier|arc|flèche|casque|gants|bottes|cape|anneau|amulette|bâton|dague|hache|masse|lance|hallebarde)/gi,
      npc: /(?:marchand|forgeron|aubergiste|garde|prêtre|mage|guerrier|voleur|noble|paysan|enfant|vieillard)/gi,
      direction: /(?:nord|sud|est|ouest|gauche|droite|devant|derrière|haut|bas)/gi,
      number: /(\d+)/g
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🎯 ANALYSE PRINCIPALE
  // ═══════════════════════════════════════════════════════════════════════

  analyze(action, context = {}) {
    const normalizedAction = action.toLowerCase().trim();

    // 1. Détecter l'intention primaire
    const intent = this.detectIntent(normalizedAction, context);

    // 2. Extraire les entités (cibles, objets, directions)
    const entities = this.extractEntities(normalizedAction, context);

    // 3. Calculer la confiance
    const confidence = this.calculateConfidence(intent, entities, context);

    return {
      type: intent,
      confidence: confidence,
      entities: entities,
      raw: action,
      normalized: normalizedAction
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🔍 DÉTECTION D'INTENTION
  // ═══════════════════════════════════════════════════════════════════════

  detectIntent(text, context) {
    const scores = {};

    // Calculer les scores pour chaque intention
    for (const [intentType, config] of Object.entries(this.patterns)) {
      let score = 0;
      
      // Compter les mots-clés matchés
      for (const keyword of config.keywords) {
        if (text.includes(keyword)) {
          score += 1;
        }
      }

      // Appliquer la priorité
      score *= config.priority;

      // Bonus contextuel
      score += this.getContextBonus(intentType, context);

      scores[intentType] = score;
    }

    // Contexte spécial : En combat, forcer l'intention combat pour la plupart des actions
    if (context.inCombat && scores.combat > 0) {
      scores.combat *= 3; // Boost majeur pour le combat
    }

    // Contexte spécial : Près d'un marchand
    if (context.nearMerchant && scores.merchant > 0) {
      scores.merchant *= 2;
    }

    // Trouver l'intention avec le meilleur score
    let bestIntent = 'exploration'; // Défaut
    let maxScore = 0;

    for (const [intentType, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        bestIntent = intentType;
      }
    }

    return bestIntent;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🏷️ EXTRACTION D'ENTITÉS
  // ═══════════════════════════════════════════════════════════════════════

  extractEntities(text, context) {
    const entities = {
      targets: [],
      items: [],
      npcs: [],
      directions: [],
      numbers: []
    };

    // Extraire les cibles
    const targetMatches = [...text.matchAll(this.entityPatterns.target)];
    entities.targets = targetMatches.map(m => m[1].trim()).filter(Boolean);

    // Extraire les objets mentionnés
    const itemMatches = [...text.matchAll(this.entityPatterns.item)];
    entities.items = itemMatches.map(m => m[0].trim()).filter(Boolean);

    // Extraire les PNJ mentionnés
    const npcMatches = [...text.matchAll(this.entityPatterns.npc)];
    entities.npcs = npcMatches.map(m => m[0].trim()).filter(Boolean);

    // Extraire les directions
    const directionMatches = [...text.matchAll(this.entityPatterns.direction)];
    entities.directions = directionMatches.map(m => m[0].trim()).filter(Boolean);

    // Extraire les nombres
    const numberMatches = [...text.matchAll(this.entityPatterns.number)];
    entities.numbers = numberMatches.map(m => parseInt(m[1])).filter(n => !isNaN(n));

    // Enrichir avec le contexte
    if (context.nearbyNPCs && entities.npcs.length === 0 && entities.targets.length > 0) {
      // Si on parle à "quelqu'un" mais qu'il n'y a qu'un seul PNJ proche, c'est lui
      if (context.nearbyNPCs.length === 1) {
        entities.npcs = [context.nearbyNPCs[0].name];
      }
    }

    if (context.nearbyEnemies && entities.targets.length === 0 && context.inCombat) {
      // En combat, si pas de cible spécifiée, prendre l'ennemi le plus proche
      if (context.nearbyEnemies.length > 0) {
        entities.targets = [context.nearbyEnemies[0].name];
      }
    }

    return entities;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 📊 CALCUL DE CONFIANCE
  // ═══════════════════════════════════════════════════════════════════════

  calculateConfidence(intent, entities, context) {
    let confidence = 0.5; // Base

    // Bonus selon le nombre d'entités extraites
    const entityCount = Object.values(entities).flat().length;
    confidence += Math.min(entityCount * 0.1, 0.3);

    // Bonus selon la cohérence contextuelle
    if (intent === 'combat' && context.inCombat) {
      confidence += 0.2;
    }
    if (intent === 'merchant' && context.nearMerchant) {
      confidence += 0.2;
    }
    if (intent === 'dialogue' && context.nearbyNPCs?.length > 0) {
      confidence += 0.15;
    }

    // Malus si l'action est très courte (ambiguë)
    if (entities.raw?.length < 10) {
      confidence -= 0.1;
    }

    return Math.max(0, Math.min(1, confidence));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🎁 BONUS CONTEXTUELS
  // ═══════════════════════════════════════════════════════════════════════

  getContextBonus(intentType, context) {
    let bonus = 0;

    switch (intentType) {
      case 'combat':
        if (context.inCombat) bonus += 10;
        if (context.nearbyEnemies?.length > 0) bonus += 5;
        break;
      case 'dialogue':
        if (context.nearbyNPCs?.length > 0) bonus += 5;
        break;
      case 'merchant':
        if (context.nearMerchant) bonus += 10;
        if (context.location?.type === 'shop') bonus += 5;
        break;
      case 'crafting':
        if (context.location?.type === 'workshop') bonus += 5;
        if (context.player?.professions?.length > 0) bonus += 3;
        break;
      case 'rest':
        if (context.location?.type === 'inn') bonus += 5;
        if (context.time === 'Nuit') bonus += 3;
        break;
    }

    return bonus;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🛠️ AJOUT DE MOTS-CLÉS PERSONNALISÉS
  // ═══════════════════════════════════════════════════════════════════════

  addKeywords(intentType, keywords) {
    if (this.patterns[intentType]) {
      this.patterns[intentType].keywords.push(...keywords);
    }
  }

  addEntityPattern(entityType, pattern) {
    this.entityPatterns[entityType] = pattern;
  }
}

export default IntentDetector;
