/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      ⚔️ FACTION WARFARE v4.0                            ║
 * ║                 Dynamic Geopolitical War System                          ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * MISSION: Simuler des guerres entre factions avec territoires, batailles
 *          automatiques, influence du joueur et géopolitique complexe.
 * 
 * CAPACITÉS:
 * - Gestion de factions (alliances, rivalités, diplomatie)
 * - Contrôle de territoires
 * - Batailles automatiques
 * - Influence du joueur sur les conflits
 * - Économie de guerre
 * - Évolution géopolitique
 */

export class FactionWarfare {
  constructor(config = {}) {
    this.config = {
      enabled: config.enabled ?? true,
      maxFactions: config.maxFactions ?? 10,
      battleInterval: config.battleInterval ?? 60000, // Bataille toutes les 60s
      territoryCount: config.territoryCount ?? 30,
      enableDiplomacy: config.enableDiplomacy ?? true,
      enableEconomy: config.enableEconomy ?? true,
      playerInfluenceMultiplier: config.playerInfluenceMultiplier ?? 2.0,
      ...config
    };

    // Factions
    this.factions = new Map(); // factionId → Faction
    
    // Territoires
    this.territories = new Map(); // territoryId → Territory
    
    // Relations diplomatiques
    this.relations = new Map(); // `${factionId1}-${factionId2}` → Relation
    
    // Historique des batailles
    this.battleHistory = [];
    
    // État du monde
    this.worldState = {
      totalWars: 0,
      activeBattles: 0,
      dominantFaction: null
    };

    // Simulation
    this.isRunning = false;
    this.battleInterval = null;

    // Statistiques
    this.stats = {
      totalBattles: 0,
      totalWars: 0,
      territoriesConquered: 0,
      factionsDestroyed: 0
    };

    console.log('[Faction Warfare] ⚔️ Initialized - Geopolitical system ready');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 1: FACTION MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Crée une faction
   */
  createFaction(data) {
    if (this.factions.size >= this.config.maxFactions) {
      console.warn('[Faction Warfare] Max factions reached');
      return null;
    }

    const faction = {
      id: data.id || `faction_${Date.now()}`,
      name: data.name,
      ideology: data.ideology || 'neutral', // militarist, pacifist, expansionist, isolationist
      strength: data.strength || 100,
      economy: data.economy || 100,
      morale: data.morale || 100,
      territories: new Set(data.territories || []),
      military: {
        infantry: data.military?.infantry || 1000,
        cavalry: data.military?.cavalry || 200,
        archers: data.military?.archers || 300,
        siege: data.military?.siege || 50
      },
      resources: {
        gold: data.resources?.gold || 10000,
        food: data.resources?.food || 5000,
        weapons: data.resources?.weapons || 1000,
        population: data.resources?.population || 50000
      },
      allies: new Set(),
      enemies: new Set(),
      atWar: false,
      createdAt: Date.now()
    };

    this.factions.set(faction.id, faction);
    console.log(`[Faction Warfare] 🏛️ Created faction: ${faction.name} (${faction.ideology})`);

    return faction;
  }

  /**
   * Obtient la puissance militaire d'une faction
   */
  calculateMilitaryPower(factionId) {
    const faction = this.factions.get(factionId);
    if (!faction) return 0;

    const { infantry, cavalry, archers, siege } = faction.military;
    
    // Calcul pondéré
    const power = 
      infantry * 1.0 +
      cavalry * 2.5 +
      archers * 1.5 +
      siege * 3.0;

    // Modificateurs
    const moraleMod = faction.morale / 100;
    const economyMod = faction.economy / 100;

    return Math.floor(power * moraleMod * economyMod);
  }

  /**
   * Met à jour une faction après une bataille
   */
  updateFactionAfterBattle(factionId, outcome) {
    const faction = this.factions.get(factionId);
    if (!faction) return;

    if (outcome.victory) {
      faction.morale = Math.min(150, faction.morale + 10);
      faction.strength = Math.min(150, faction.strength + 5);
      faction.resources.gold += outcome.plunder || 0;
    } else {
      faction.morale = Math.max(20, faction.morale - 15);
      faction.strength = Math.max(10, faction.strength - 10);
      faction.military.infantry -= outcome.losses?.infantry || 0;
      faction.military.cavalry -= outcome.losses?.cavalry || 0;
      faction.military.archers -= outcome.losses?.archers || 0;
    }

    // Vérification de destruction
    if (faction.territories.size === 0 && faction.strength < 20) {
      this._destroyFaction(factionId);
    }
  }

  /**
   * Détruit une faction
   */
  _destroyFaction(factionId) {
    const faction = this.factions.get(factionId);
    if (!faction) return;

    console.log(`[Faction Warfare] 💀 Faction destroyed: ${faction.name}`);

    // Redistribue les territoires
    faction.territories.forEach(territoryId => {
      const territory = this.territories.get(territoryId);
      if (territory) {
        territory.owner = null;
        territory.contested = true;
      }
    });

    this.factions.delete(factionId);
    this.stats.factionsDestroyed++;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2: TERRITORY MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Crée un territoire
   */
  createTerritory(data) {
    const territory = {
      id: data.id || `territory_${Date.now()}`,
      name: data.name,
      type: data.type || 'plains', // plains, forest, mountains, coast, desert
      owner: data.owner || null,
      contested: data.contested || false,
      strategicValue: data.strategicValue || this._calculateStrategicValue(data.type),
      resources: {
        gold: data.resources?.gold || 100,
        food: data.resources?.food || 50,
        minerals: data.resources?.minerals || 20
      },
      defensibility: this._calculateDefensibility(data.type),
      population: data.population || 1000,
      borders: new Set(data.borders || []),
      createdAt: Date.now()
    };

    this.territories.set(territory.id, territory);
    console.log(`[Faction Warfare] 🗺️ Created territory: ${territory.name} (${territory.type})`);

    return territory;
  }

  /**
   * Calcule la valeur stratégique d'un territoire
   */
  _calculateStrategicValue(type) {
    const values = {
      plains: 70,
      forest: 50,
      mountains: 90,
      coast: 85,
      desert: 30
    };
    return values[type] || 50;
  }

  /**
   * Calcule la défensibilité
   */
  _calculateDefensibility(type) {
    const values = {
      plains: 0.5,
      forest: 0.7,
      mountains: 1.2,
      coast: 0.8,
      desert: 0.4
    };
    return values[type] || 0.6;
  }

  /**
   * Change le propriétaire d'un territoire
   */
  conquerTerritory(territoryId, newOwnerId) {
    const territory = this.territories.get(territoryId);
    if (!territory) return false;

    const oldOwner = territory.owner;

    // Retire du propriétaire précédent
    if (oldOwner) {
      const oldFaction = this.factions.get(oldOwner);
      if (oldFaction) {
        oldFaction.territories.delete(territoryId);
      }
    }

    // Ajoute au nouveau propriétaire
    territory.owner = newOwnerId;
    territory.contested = false;
    const newFaction = this.factions.get(newOwnerId);
    if (newFaction) {
      newFaction.territories.add(territoryId);
    }

    this.stats.territoriesConquered++;

    console.log(`[Faction Warfare] 🏴 Territory conquered: ${territory.name} by ${newFaction?.name || 'Unknown'}`);

    return true;
  }

  /**
   * Obtient les territoires frontaliers
   */
  getBorderTerritories(factionId) {
    const faction = this.factions.get(factionId);
    if (!faction) return [];

    const borders = [];

    faction.territories.forEach(territoryId => {
      const territory = this.territories.get(territoryId);
      if (!territory) return;

      territory.borders.forEach(borderId => {
        const borderTerritory = this.territories.get(borderId);
        if (borderTerritory && borderTerritory.owner !== factionId) {
          borders.push(borderTerritory);
        }
      });
    });

    return borders;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3: DIPLOMACY & RELATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Définit une relation entre deux factions
   */
  setRelation(factionId1, factionId2, type, value) {
    const key = this._getRelationKey(factionId1, factionId2);
    
    this.relations.set(key, {
      factions: [factionId1, factionId2],
      type, // alliance, war, neutral, trade
      value, // -100 à 100
      since: Date.now()
    });

    // Mise à jour des factions
    const faction1 = this.factions.get(factionId1);
    const faction2 = this.factions.get(factionId2);

    if (type === 'alliance') {
      faction1?.allies.add(factionId2);
      faction2?.allies.add(factionId1);
      faction1?.enemies.delete(factionId2);
      faction2?.enemies.delete(factionId1);
    } else if (type === 'war') {
      faction1?.enemies.add(factionId2);
      faction2?.enemies.add(factionId1);
      faction1?.allies.delete(factionId2);
      faction2?.allies.delete(factionId1);
      faction1.atWar = true;
      faction2.atWar = true;
      this.stats.totalWars++;
    }

    console.log(`[Faction Warfare] 🤝 Relation set: ${faction1?.name} ↔ ${faction2?.name} = ${type}`);
  }

  /**
   * Obtient une relation
   */
  getRelation(factionId1, factionId2) {
    const key = this._getRelationKey(factionId1, factionId2);
    return this.relations.get(key);
  }

  /**
   * Clé de relation (ordre indépendant)
   */
  _getRelationKey(factionId1, factionId2) {
    return factionId1 < factionId2 ?
      `${factionId1}-${factionId2}` :
      `${factionId2}-${factionId1}`;
  }

  /**
   * Déclare une guerre
   */
  declareWar(attackerId, defenderId, reason = 'territorial_expansion') {
    const attacker = this.factions.get(attackerId);
    const defender = this.factions.get(defenderId);

    if (!attacker || !defender) return false;

    this.setRelation(attackerId, defenderId, 'war', -100);

    this.worldState.totalWars++;

    console.log(`[Faction Warfare] ⚔️ WAR: ${attacker.name} declares war on ${defender.name} (${reason})`);

    // Déclenche la première bataille
    this._triggerBattle(attackerId, defenderId);

    return true;
  }

  /**
   * Négocie une paix
   */
  negotiatePeace(factionId1, factionId2, terms = {}) {
    const faction1 = this.factions.get(factionId1);
    const faction2 = this.factions.get(factionId2);

    if (!faction1 || !faction2) return false;

    // Conditions de paix
    if (terms.territorial) {
      terms.territorial.forEach(territoryId => {
        this.conquerTerritory(territoryId, terms.recipient);
      });
    }

    if (terms.reparations) {
      faction1.resources.gold -= terms.reparations;
      faction2.resources.gold += terms.reparations;
    }

    this.setRelation(factionId1, factionId2, 'neutral', 0);

    faction1.atWar = !Array.from(faction1.enemies).some(id => 
      this.getRelation(factionId1, id)?.type === 'war'
    );
    faction2.atWar = !Array.from(faction2.enemies).some(id => 
      this.getRelation(factionId2, id)?.type === 'war'
    );

    console.log(`[Faction Warfare] 🕊️ Peace negotiated: ${faction1.name} ↔ ${faction2.name}`);

    return true;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 4: BATTLES & WARFARE
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Démarre la simulation de guerre
   */
  startWarSimulation() {
    if (this.isRunning) return;

    this.isRunning = true;

    this.battleInterval = setInterval(() => {
      this._simulateOngoingWars();
    }, this.config.battleInterval);

    console.log('[Faction Warfare] ▶️ War simulation started');
  }

  /**
   * Arrête la simulation
   */
  stopWarSimulation() {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.battleInterval) {
      clearInterval(this.battleInterval);
      this.battleInterval = null;
    }

    console.log('[Faction Warfare] ⏸️ War simulation stopped');
  }

  /**
   * Simule les guerres en cours
   */
  _simulateOngoingWars() {
    const wars = Array.from(this.relations.values()).filter(r => r.type === 'war');

    wars.forEach(war => {
      if (Math.random() < 0.3) { // 30% de chance de bataille par interval
        this._triggerBattle(war.factions[0], war.factions[1]);
      }
    });
  }

  /**
   * Déclenche une bataille
   */
  _triggerBattle(attackerId, defenderId) {
    const attacker = this.factions.get(attackerId);
    const defender = this.factions.get(defenderId);

    if (!attacker || !defender) return null;

    // Sélection du territoire
    const targetTerritory = this._selectBattleground(attackerId, defenderId);
    if (!targetTerritory) return null;

    // Calcul des forces
    const attackerPower = this.calculateMilitaryPower(attackerId);
    const defenderPower = this.calculateMilitaryPower(defenderId) * targetTerritory.defensibility;

    // Résolution de la bataille
    const battle = this._resolveBattle(attacker, defender, targetTerritory, attackerPower, defenderPower);

    // Enregistrement
    this.battleHistory.push(battle);
    if (this.battleHistory.length > 100) {
      this.battleHistory.shift();
    }

    this.stats.totalBattles++;
    this.worldState.activeBattles++;

    // Mise à jour des factions
    this.updateFactionAfterBattle(attackerId, battle.attackerOutcome);
    this.updateFactionAfterBattle(defenderId, battle.defenderOutcome);

    // Conquête
    if (battle.result === 'attacker_victory') {
      this.conquerTerritory(targetTerritory.id, attackerId);
    }

    console.log(`[Faction Warfare] ⚔️ Battle: ${attacker.name} vs ${defender.name} at ${targetTerritory.name} → ${battle.result}`);

    return battle;
  }

  /**
   * Sélectionne le champ de bataille
   */
  _selectBattleground(attackerId, defenderId) {
    const borderTerritories = this.getBorderTerritories(attackerId);
    const enemyTerritories = borderTerritories.filter(t => t.owner === defenderId);

    if (enemyTerritories.length === 0) return null;

    // Choisit le territoire avec la plus faible défense
    return enemyTerritories.sort((a, b) => 
      a.defensibility - b.defensibility
    )[0];
  }

  /**
   * Résout une bataille
   */
  _resolveBattle(attacker, defender, territory, attackerPower, defenderPower) {
    const battle = {
      id: `battle_${Date.now()}`,
      attacker: attacker.name,
      attackerId: attacker.id,
      defender: defender.name,
      defenderId: defender.id,
      territory: territory.name,
      territoryId: territory.id,
      timestamp: Date.now()
    };

    // Facteurs aléatoires (brouillard de guerre)
    const attackerRoll = Math.random() * 0.4 + 0.8; // 0.8 - 1.2
    const defenderRoll = Math.random() * 0.4 + 0.8;

    const finalAttackerPower = attackerPower * attackerRoll;
    const finalDefenderPower = defenderPower * defenderRoll;

    // Résultat
    if (finalAttackerPower > finalDefenderPower * 1.3) {
      battle.result = 'attacker_decisive_victory';
      battle.attackerOutcome = {
        victory: true,
        losses: { infantry: Math.floor(attacker.military.infantry * 0.1) },
        plunder: Math.floor(territory.resources.gold * 0.5)
      };
      battle.defenderOutcome = {
        victory: false,
        losses: {
          infantry: Math.floor(defender.military.infantry * 0.3),
          cavalry: Math.floor(defender.military.cavalry * 0.2)
        }
      };
    } else if (finalAttackerPower > finalDefenderPower) {
      battle.result = 'attacker_victory';
      battle.attackerOutcome = {
        victory: true,
        losses: { infantry: Math.floor(attacker.military.infantry * 0.2) },
        plunder: Math.floor(territory.resources.gold * 0.3)
      };
      battle.defenderOutcome = {
        victory: false,
        losses: { infantry: Math.floor(defender.military.infantry * 0.25) }
      };
    } else if (finalDefenderPower > finalAttackerPower * 1.3) {
      battle.result = 'defender_decisive_victory';
      battle.defenderOutcome = {
        victory: true,
        losses: { infantry: Math.floor(defender.military.infantry * 0.05) }
      };
      battle.attackerOutcome = {
        victory: false,
        losses: {
          infantry: Math.floor(attacker.military.infantry * 0.35),
          cavalry: Math.floor(attacker.military.cavalry * 0.3)
        }
      };
    } else {
      battle.result = 'defender_victory';
      battle.defenderOutcome = {
        victory: true,
        losses: { infantry: Math.floor(defender.military.infantry * 0.15) }
      };
      battle.attackerOutcome = {
        victory: false,
        losses: { infantry: Math.floor(attacker.military.infantry * 0.25) }
      };
    }

    return battle;
  }

  /**
   * Applique l'influence du joueur sur une bataille
   */
  applyPlayerInfluence(battleId, factionId, influence) {
    const battle = this.battleHistory.find(b => b.id === battleId);
    if (!battle) return;

    // Multiplie l'influence du joueur
    const modifiedInfluence = influence * this.config.playerInfluenceMultiplier;

    // Ajuste le résultat
    if (factionId === battle.attackerId) {
      // Aide l'attaquant
      if (modifiedInfluence > 50 && battle.result.includes('defender')) {
        battle.result = battle.result.replace('defender', 'attacker');
        battle.attackerOutcome.victory = true;
        battle.defenderOutcome.victory = false;
        console.log(`[Faction Warfare] 👤 Player influence changed battle outcome!`);
      }
    } else if (factionId === battle.defenderId) {
      // Aide le défenseur
      if (modifiedInfluence > 50 && battle.result.includes('attacker')) {
        battle.result = battle.result.replace('attacker', 'defender');
        battle.defenderOutcome.victory = true;
        battle.attackerOutcome.victory = false;
        console.log(`[Faction Warfare] 👤 Player influence changed battle outcome!`);
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 5: GEOPOLITICAL EVOLUTION
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Met à jour la géopolitique
   */
  updateGeopolitics() {
    // Identifie la faction dominante
    let maxPower = 0;
    let dominantFaction = null;

    this.factions.forEach(faction => {
      const power = this.calculateMilitaryPower(faction.id) + faction.territories.size * 100;
      if (power > maxPower) {
        maxPower = power;
        dominantFaction = faction;
      }
    });

    this.worldState.dominantFaction = dominantFaction?.id || null;

    // Réactions automatiques
    this._autoGenerateDiplomacy();
  }

  /**
   * Génère automatiquement des relations diplomatiques
   */
  _autoGenerateDiplomacy() {
    if (!this.config.enableDiplomacy) return;

    this.factions.forEach((faction1, id1) => {
      this.factions.forEach((faction2, id2) => {
        if (id1 >= id2) return; // Évite les doublons

        const relation = this.getRelation(id1, id2);
        if (relation) return; // Relation déjà définie

        // Décision basée sur l'idéologie et la proximité
        const areBordering = this.getBorderTerritories(id1).some(t => t.owner === id2);

        if (faction1.ideology === 'expansionist' && areBordering) {
          // Expansionnistes attaquent les voisins
          if (Math.random() < 0.3) {
            this.declareWar(id1, id2, 'expansion');
          }
        } else if (faction1.ideology === faction2.ideology && !areBordering) {
          // Même idéologie → alliance
          if (Math.random() < 0.2) {
            this.setRelation(id1, id2, 'alliance', 80);
          }
        } else {
          // Par défaut neutre
          this.setRelation(id1, id2, 'neutral', 0);
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 6: UTILITIES & STATS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Obtient les statistiques
   */
  getStats() {
    return {
      ...this.stats,
      totalFactions: this.factions.size,
      totalTerritories: this.territories.size,
      activeWars: Array.from(this.relations.values()).filter(r => r.type === 'war').length,
      dominantFaction: this.worldState.dominantFaction
    };
  }

  /**
   * Obtient l'état géopolitique
   */
  getGeopoliticalState() {
    const factionStates = Array.from(this.factions.values()).map(f => ({
      id: f.id,
      name: f.name,
      territories: f.territories.size,
      militaryPower: this.calculateMilitaryPower(f.id),
      atWar: f.atWar,
      allies: f.allies.size,
      enemies: f.enemies.size
    }));

    return {
      factions: factionStates,
      dominantFaction: this.worldState.dominantFaction,
      totalWars: this.worldState.totalWars,
      activeBattles: this.worldState.activeBattles
    };
  }

  /**
   * Obtient l'historique des batailles récentes
   */
  getRecentBattles(limit = 10) {
    return this.battleHistory.slice(-limit);
  }

  /**
   * Réinitialise le système
   */
  reset() {
    this.stopWarSimulation();
    
    this.factions.clear();
    this.territories.clear();
    this.relations.clear();
    this.battleHistory = [];
    
    this.worldState = {
      totalWars: 0,
      activeBattles: 0,
      dominantFaction: null
    };

    this.stats = {
      totalBattles: 0,
      totalWars: 0,
      territoriesConquered: 0,
      factionsDestroyed: 0
    };

    console.log('[Faction Warfare] 🔄 Reset complete');
  }
}

export default FactionWarfare;
