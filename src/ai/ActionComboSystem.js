// ==========================================
// ACTION COMBO SYSTEM - Système de combos d'actions
// ==========================================
// Détecte et récompense les combinaisons d'actions :
// - Combos de compétences (synergie entre sorts/attaques)
// - Chaînes d'actions temporelles
// - Bonus de combo progressifs

class ActionComboSystem {
  constructor() {
    // Définitions des combos
    this.comboDefs = {
      elemental_chain: {
        name: 'Chaîne Élémentaire',
        actions: ['fire_spell', 'water_spell', 'earth_spell'],
        timeWindow: 15000, // 15 secondes
        bonus: { damage: 1.5, xp: 1.3 },
        description: 'Lancer 3 sorts élémentaires différents rapidement'
      },
      assassin_strike: {
        name: 'Frappe Assassin',
        actions: ['stealth', 'backstab'],
        timeWindow: 5000,
        bonus: { damage: 2.0, critChance: 0.3 },
        description: 'Attaquer en furtif après s\'être caché'
      },
      berserker_rage: {
        name: 'Rage du Berserker',
        actions: ['heavy_attack', 'heavy_attack', 'heavy_attack'],
        timeWindow: 10000,
        bonus: { damage: 1.8, attackSpeed: 1.2 },
        description: '3 attaques lourdes consécutives'
      },
      defensive_counter: {
        name: 'Contre Défensif',
        actions: ['block', 'counter_attack'],
        timeWindow: 2000,
        bonus: { damage: 1.5, stunChance: 0.5 },
        description: 'Bloquer puis contre-attaquer immédiatement'
      },
      healing_aura: {
        name: 'Aura Curative',
        actions: ['heal', 'buff'],
        timeWindow: 8000,
        bonus: { healing: 1.5, buffDuration: 1.5 },
        description: 'Soigner puis appliquer un buff'
      }
    };

    // Historique des actions récentes
    this.actionHistory = [];
    this.maxHistorySize = 20;

    // Combos actifs
    this.activeCombos = [];
    this.comboMultiplier = 1.0;
  }

  // ==========================================
  // ENREGISTRER UNE ACTION
  // ==========================================
  recordAction(actionType, timestamp = Date.now()) {
    this.actionHistory.push({ type: actionType, timestamp });

    // Limiter la taille de l'historique
    if (this.actionHistory.length > this.maxHistorySize) {
      this.actionHistory.shift();
    }

    // Vérifier les combos
    return this.checkCombos(timestamp);
  }

  // ==========================================
  // VÉRIFIER LES COMBOS
  // ==========================================
  checkCombos(currentTime) {
    const triggeredCombos = [];

    Object.entries(this.comboDefs).forEach(([comboId, comboDef]) => {
      const recentActions = this.actionHistory.filter(
        action => currentTime - action.timestamp <= comboDef.timeWindow
      );

      // Vérifier si la séquence est complète
      if (this.matchesSequence(recentActions, comboDef.actions)) {
        triggeredCombos.push({
          comboId,
          name: comboDef.name,
          bonus: comboDef.bonus,
          description: comboDef.description
        });

        // Augmenter le multiplicateur
        this.comboMultiplier += 0.1;
        this.activeCombos.push(comboId);
      }
    });

    return triggeredCombos;
  }

  // ==========================================
  // VÉRIFIER LA SÉQUENCE
  // ==========================================
  matchesSequence(recentActions, requiredSequence) {
    const actionTypes = recentActions.map(a => a.type);
    
    // Vérifier si toutes les actions requises sont présentes
    return requiredSequence.every(required => 
      actionTypes.includes(required)
    );
  }

  // ==========================================
  // APPLIQUER LE BONUS DE COMBO
  // ==========================================
  applyComboBonus(baseValue, bonusType) {
    return Math.floor(baseValue * this.comboMultiplier);
  }

  // ==========================================
  // RÉINITIALISER LE COMBO
  // ==========================================
  resetCombo() {
    this.comboMultiplier = 1.0;
    this.activeCombos = [];
  }

  // ==========================================
  // OBTENIR LE MULTIPLICATEUR ACTUEL
  // ==========================================
  getCurrentMultiplier() {
    return this.comboMultiplier;
  }
}

export default ActionComboSystem;
