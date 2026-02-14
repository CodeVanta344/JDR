// ==========================================
// KARMA MANAGER - Système de conséquences et réputation
// ==========================================
// Gère la réputation auprès des factions, l'impact des actions sur le monde,
// et les conséquences à long terme des choix du joueur.

class KarmaManager {
  constructor() {
    // Configuration
    this.config = {
      maxReputation: 100,
      minReputation: -100,
      reputationDecayRate: 0.5, // Déclin naturel vers la neutralité
      actionMemoryDuration: 50   // Nombre d'actions avant "oubli" partiel
    };

    // État du monde
    this.worldState = {
      law_level: 50,              // 0=anarchie, 100=ordre strict
      prosperity: 50,             // 0=famine, 100=abondance
      magic_acceptance: 50,       // 0=chassés, 100=vénérés
      corruption: 30,             // 0=pur, 100=totalement corrompu
      military_strength: 50,      // 0=sans défense, 100=imprenable
      religious_influence: 40     // 0=athée, 100=théocratie
    };

    // Factions principales
    this.factions = {
      city_guard: {
        name: 'Garde de la Cité',
        reputation: 0,
        attitude: 'neutral', // hostile/unfriendly/neutral/friendly/ally
        interests: ['law', 'order', 'safety'],
        dislikes: ['crime', 'chaos', 'violence'],
        reactionThresholds: { ally: 75, friendly: 40, neutral: -40, unfriendly: -75 }
      },
      merchants_guild: {
        name: 'Guilde des Marchands',
        reputation: 0,
        attitude: 'neutral',
        interests: ['trade', 'profit', 'stability'],
        dislikes: ['theft', 'banditry', 'war'],
        reactionThresholds: { ally: 80, friendly: 50, neutral: -30, unfriendly: -70 }
      },
      thieves_guild: {
        name: 'Guilde des Voleurs',
        reputation: 0,
        attitude: 'neutral',
        interests: ['stealth', 'theft', 'freedom'],
        dislikes: ['guards', 'snitching', 'authority'],
        reactionThresholds: { ally: 70, friendly: 35, neutral: -35, unfriendly: -70 }
      },
      mages_circle: {
        name: 'Cercle des Mages',
        reputation: 0,
        attitude: 'neutral',
        interests: ['magic', 'knowledge', 'artifacts'],
        dislikes: ['ignorance', 'magic_bans', 'book_burning'],
        reactionThresholds: { ally: 85, friendly: 45, neutral: -40, unfriendly: -80 }
      },
      church: {
        name: 'Église de la Lumière',
        reputation: 0,
        attitude: 'neutral',
        interests: ['faith', 'healing', 'justice'],
        dislikes: ['undead', 'dark_magic', 'blasphemy'],
        reactionThresholds: { ally: 80, friendly: 50, neutral: -45, unfriendly: -75 }
      },
      rebels: {
        name: 'Rebelles du Peuple',
        reputation: 0,
        attitude: 'neutral',
        interests: ['freedom', 'equality', 'revolution'],
        dislikes: ['tyranny', 'nobles', 'taxes'],
        reactionThresholds: { ally: 65, friendly: 30, neutral: -30, unfriendly: -65 }
      },
      nobles: {
        name: 'Noblesse',
        reputation: 0,
        attitude: 'neutral',
        interests: ['status', 'power', 'tradition'],
        dislikes: ['rebellion', 'disrespect', 'chaos'],
        reactionThresholds: { ally: 90, friendly: 60, neutral: -50, unfriendly: -85 }
      }
    };

    // Historique des actions (pour conséquences à long terme)
    this.actionHistory = [];
    this.consequences = [];
    this.bounties = [];
  }

  // ==========================================
  // ENREGISTRER UNE ACTION
  // ==========================================
  recordAction(action) {
    const timestamp = Date.now();
    this.actionHistory.push({ ...action, timestamp });

    // Limiter l'historique
    if (this.actionHistory.length > this.config.actionMemoryDuration) {
      this.actionHistory.shift();
    }

    // Calculer l'impact immédiat
    const impact = this.calculateActionImpact(action);
    this.applyImpact(impact);

    // Générer des conséquences potentielles
    const consequences = this.generateConsequences(action, impact);
    this.consequences.push(...consequences);

    return { impact, consequences };
  }

  // ==========================================
  // CALCULER L'IMPACT D'UNE ACTION
  // ==========================================
  calculateActionImpact(action) {
    const impact = {
      factions: {},
      worldState: {},
      karma: 0,
      narrative: []
    };

    // ===== ACTIONS DE COMBAT =====
    if (action.type === 'kill_enemy') {
      impact.karma += 5;
      impact.factions.city_guard = 10;
      impact.worldState.law_level = 2;
      impact.narrative.push('Votre bravoure est remarquée par les autorités.');
      
      if (action.enemyType === 'undead') {
        impact.factions.church = 15;
        impact.narrative.push('L\'Église vous bénit pour avoir détruit des abominations.');
      }
    }

    if (action.type === 'kill_innocent') {
      impact.karma -= 30;
      impact.factions.city_guard = -40;
      impact.factions.church = -25;
      impact.factions.nobles = -20;
      impact.worldState.law_level = -5;
      impact.narrative.push('⚠️ Votre crime ne restera pas impuni !');
      
      // Ajouter une prime
      this.bounties.push({
        amount: 500 + Math.floor(Math.random() * 500),
        reason: 'Meurtre',
        issuer: 'city_guard'
      });
    }

    // ===== ACTIONS SOCIALES =====
    if (action.type === 'help_npc') {
      impact.karma += 10;
      impact.worldState.prosperity = 1;
      
      if (action.npcType === 'merchant') {
        impact.factions.merchants_guild = 15;
        impact.narrative.push('La Guilde des Marchands se souviendra de votre aide.');
      } else if (action.npcType === 'guard') {
        impact.factions.city_guard = 20;
        impact.narrative.push('Les gardes vous considèrent désormais comme un allié.');
      }
    }

    if (action.type === 'steal') {
      impact.karma -= 15;
      impact.factions.city_guard = -20;
      impact.factions.merchants_guild = -25;
      impact.factions.thieves_guild = 10; // Les voleurs apprécient
      impact.worldState.law_level = -1;
      
      if (Math.random() < 0.3) {
        impact.narrative.push('🚨 Vous avez été repéré ! Les gardes vous recherchent.');
        this.bounties.push({
          amount: 100 + Math.floor(Math.random() * 200),
          reason: 'Vol',
          issuer: 'city_guard'
        });
      } else {
        impact.narrative.push('Vous vous éclipsez sans être vu.');
      }
    }

    // ===== ACTIONS MAGIQUES =====
    if (action.type === 'cast_dark_magic') {
      impact.karma -= 10;
      impact.factions.church = -30;
      impact.factions.mages_circle = -15;
      impact.worldState.magic_acceptance = -2;
      impact.narrative.push('Les témoins reculent, effrayés par votre magie sombre.');
    }

    if (action.type === 'cast_healing_magic') {
      impact.karma += 8;
      impact.factions.church = 20;
      impact.factions.mages_circle = 10;
      impact.worldState.magic_acceptance = 1;
      impact.narrative.push('Votre magie bienfaisante inspire confiance.');
    }

    // ===== ACTIONS POLITIQUES =====
    if (action.type === 'support_rebels') {
      impact.karma += 5;
      impact.factions.rebels = 30;
      impact.factions.nobles = -35;
      impact.factions.city_guard = -20;
      impact.worldState.law_level = -3;
      impact.narrative.push('Les rebelles vous accueillent comme un frère d\'armes.');
    }

    if (action.type === 'support_nobles') {
      impact.karma -= 5;
      impact.factions.nobles = 30;
      impact.factions.rebels = -40;
      impact.worldState.law_level = 3;
      impact.narrative.push('La noblesse vous offre sa protection.');
    }

    // ===== ACTIONS COMMERCIALES =====
    if (action.type === 'fair_trade') {
      impact.karma += 3;
      impact.factions.merchants_guild = 10;
      impact.worldState.prosperity = 1;
    }

    if (action.type === 'scam') {
      impact.karma -= 12;
      impact.factions.merchants_guild = -30;
      impact.narrative.push('Votre réputation de tricheur se répand...');
    }

    // ===== ACTIONS RELIGIEUSES =====
    if (action.type === 'donate_temple') {
      impact.karma += 15;
      impact.factions.church = 25;
      impact.worldState.religious_influence = 2;
      impact.narrative.push('Les prêtres vous bénissent avec ferveur.');
    }

    if (action.type === 'desecrate_temple') {
      impact.karma -= 40;
      impact.factions.church = -80;
      impact.worldState.religious_influence = -5;
      impact.narrative.push('🔥 Vous avez commis un sacrilège ! L\'Église entière vous traque !');
      
      this.bounties.push({
        amount: 1000 + Math.floor(Math.random() * 1000),
        reason: 'Sacrilège',
        issuer: 'church'
      });
    }

    return impact;
  }

  // ==========================================
  // APPLIQUER L'IMPACT
  // ==========================================
  applyImpact(impact) {
    // Mettre à jour les réputations des factions
    Object.keys(impact.factions).forEach(factionKey => {
      const change = impact.factions[factionKey];
      this.modifyFactionReputation(factionKey, change);
    });

    // Mettre à jour l'état du monde
    Object.keys(impact.worldState).forEach(stateKey => {
      const change = impact.worldState[stateKey];
      this.worldState[stateKey] = Math.max(0, Math.min(100, this.worldState[stateKey] + change));
    });
  }

  // ==========================================
  // MODIFIER LA RÉPUTATION D'UNE FACTION
  // ==========================================
  modifyFactionReputation(factionKey, amount) {
    const faction = this.factions[factionKey];
    if (!faction) return;

    const oldRep = faction.reputation;
    faction.reputation = Math.max(
      this.config.minReputation,
      Math.min(this.config.maxReputation, faction.reputation + amount)
    );

    // Mettre à jour l'attitude
    faction.attitude = this.getAttitude(faction.reputation, faction.reactionThresholds);

    // Détecter les changements d'attitude
    const oldAttitude = this.getAttitude(oldRep, faction.reactionThresholds);
    if (oldAttitude !== faction.attitude) {
      return {
        factionName: faction.name,
        oldAttitude,
        newAttitude: faction.attitude,
        message: this.getAttitudeChangeMessage(faction.name, faction.attitude)
      };
    }

    return null;
  }

  // ==========================================
  // DÉTERMINER L'ATTITUDE
  // ==========================================
  getAttitude(reputation, thresholds) {
    if (reputation >= thresholds.ally) return 'ally';
    if (reputation >= thresholds.friendly) return 'friendly';
    if (reputation >= thresholds.neutral) return 'neutral';
    if (reputation >= thresholds.unfriendly) return 'unfriendly';
    return 'hostile';
  }

  // ==========================================
  // MESSAGES DE CHANGEMENT D'ATTITUDE
  // ==========================================
  getAttitudeChangeMessage(factionName, newAttitude) {
    const messages = {
      ally: `🌟 **${factionName}** vous considère maintenant comme un allié précieux !`,
      friendly: `😊 **${factionName}** vous traite avec bienveillance.`,
      neutral: `😐 **${factionName}** ne vous porte ni estime ni rancœur.`,
      unfriendly: `😠 **${factionName}** vous regarde avec suspicion.`,
      hostile: `⚔️ **${factionName}** vous considère comme un ennemi !`
    };
    return messages[newAttitude] || '';
  }

  // ==========================================
  // GÉNÉRER DES CONSÉQUENCES
  // ==========================================
  generateConsequences(action, impact) {
    const consequences = [];

    // Conséquences basées sur la réputation
    Object.keys(this.factions).forEach(key => {
      const faction = this.factions[key];
      
      if (faction.attitude === 'ally' && Math.random() < 0.15) {
        consequences.push({
          type: 'faction_gift',
          faction: key,
          description: `${faction.name} vous offre un cadeau en signe d'amitié.`,
          reward: 'random_item'
        });
      }

      if (faction.attitude === 'hostile' && Math.random() < 0.20) {
        consequences.push({
          type: 'faction_attack',
          faction: key,
          description: `${faction.name} envoie des agents pour vous éliminer !`,
          danger: 'high'
        });
      }
    });

    // Conséquences basées sur l'état du monde
    if (this.worldState.law_level < 20) {
      consequences.push({
        type: 'world_state',
        description: '⚠️ L\'anarchie règne ! Les bandits pullulent sur les routes.',
        effect: 'increased_bandit_spawns'
      });
    }

    if (this.worldState.prosperity < 20) {
      consequences.push({
        type: 'world_state',
        description: '💀 La famine sévit. Les prix des denrées explosent.',
        effect: 'food_prices_x3'
      });
    }

    if (this.worldState.corruption > 80) {
      consequences.push({
        type: 'world_state',
        description: '💰 La corruption est totale. Les gardes acceptent des pots-de-vin.',
        effect: 'bribery_available'
      });
    }

    return consequences;
  }

  // ==========================================
  // RÉCUPÉRER LA RÉPUTATION TOTALE
  // ==========================================
  getTotalReputation() {
    return Object.values(this.factions).reduce((sum, faction) => sum + faction.reputation, 0);
  }

  // ==========================================
  // RÉCUPÉRER L'ALIGNEMENT MORAL
  // ==========================================
  getMoralAlignment() {
    const totalKarma = this.actionHistory.reduce((sum, action) => {
      const impact = this.calculateActionImpact(action);
      return sum + (impact.karma || 0);
    }, 0);

    if (totalKarma > 100) return { alignment: 'Héroïque', description: 'Champion du bien' };
    if (totalKarma > 50) return { alignment: 'Bon', description: 'Défenseur des faibles' };
    if (totalKarma > 0) return { alignment: 'Neutre Bon', description: 'Âme bienveillante' };
    if (totalKarma > -50) return { alignment: 'Neutre', description: 'Pragmatique' };
    if (totalKarma > -100) return { alignment: 'Neutre Mauvais', description: 'Égoïste' };
    return { alignment: 'Maléfique', description: 'Âme corrompue' };
  }

  // ==========================================
  // VÉRIFIER LES PRIMES ACTIVES
  // ==========================================
  getActiveBounties() {
    return this.bounties.filter(bounty => bounty.amount > 0);
  }

  getTotalBounty() {
    return this.bounties.reduce((sum, bounty) => sum + bounty.amount, 0);
  }

  // ==========================================
  // RÉCUPÉRER LES CONSÉQUENCES ACTIVES
  // ==========================================
  getActiveConsequences() {
    return this.consequences.filter(c => !c.resolved);
  }

  // ==========================================
  // RÉCUPÉRER UN RAPPORT COMPLET
  // ==========================================
  getFullReport() {
    return {
      factions: Object.entries(this.factions).map(([key, faction]) => ({
        id: key,
        name: faction.name,
        reputation: faction.reputation,
        attitude: faction.attitude
      })),
      worldState: this.worldState,
      alignment: this.getMoralAlignment(),
      totalBounty: this.getTotalBounty(),
      activeBounties: this.getActiveBounties(),
      activeConsequences: this.getActiveConsequences()
    };
  }

  // ==========================================
  // RÉINITIALISATION
  // ==========================================
  reset() {
    this.actionHistory = [];
    this.consequences = [];
    this.bounties = [];
    
    Object.keys(this.factions).forEach(key => {
      this.factions[key].reputation = 0;
      this.factions[key].attitude = 'neutral';
    });

    this.worldState = {
      law_level: 50,
      prosperity: 50,
      magic_acceptance: 50,
      corruption: 30,
      military_strength: 50,
      religious_influence: 40
    };
  }
}

export default KarmaManager;
