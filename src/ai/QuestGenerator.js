// ==========================================
// QUEST GENERATOR - Générateur de quêtes procédurales
// ==========================================
// Génère des quêtes dynamiques basées sur :
// - Le niveau du joueur
// - Les factions actives
// - L'état du monde
// - Les PNJ disponibles
// - L'historique du joueur

class QuestGenerator {
  constructor() {
    // Templates de quêtes par type
    this.questTemplates = {
      fetch: {
        name: 'Récupération',
        objectives: [
          'Rapporte-moi {item} trouvé à {location}',
          'J\'ai besoin de {quantity} {item} de {location}',
          'Va chercher {item} chez {npc}',
          'Récupère le {item} volé par {enemy}'
        ],
        rewards: { gold: [50, 150], xp: [100, 300], item_chance: 0.3 },
        difficulty: 'easy'
      },
      kill: {
        name: 'Élimination',
        objectives: [
          'Tue {quantity} {enemy} à {location}',
          'Élimine le chef {enemy} dans {location}',
          'Débarrasse {location} des {enemy}',
          'Chasse {quantity} {enemy} qui terrorisent la région'
        ],
        rewards: { gold: [100, 300], xp: [200, 500], item_chance: 0.5 },
        difficulty: 'medium'
      },
      escort: {
        name: 'Escorte',
        objectives: [
          'Escorte {npc} jusqu\'à {location}',
          'Protège {npc} pendant son voyage à {location}',
          'Accompagne {npc} en toute sécurité à {location}'
        ],
        rewards: { gold: [150, 400], xp: [300, 600], item_chance: 0.4 },
        difficulty: 'medium'
      },
      investigate: {
        name: 'Enquête',
        objectives: [
          'Découvre ce qui s\'est passé à {location}',
          'Enquête sur la disparition de {npc}',
          'Trouve des indices sur {mystery} à {location}',
          'Interroge {quantity} témoins à {location}'
        ],
        rewards: { gold: [100, 250], xp: [250, 500], item_chance: 0.3 },
        difficulty: 'medium'
      },
      delivery: {
        name: 'Livraison',
        objectives: [
          'Livre {item} à {npc} à {location}',
          'Apporte ce paquet à {location} avant {time}',
          'Transporte {item} jusqu\'à {location} sans l\'ouvrir'
        ],
        rewards: { gold: [80, 200], xp: [150, 350], item_chance: 0.2 },
        difficulty: 'easy'
      },
      diplomacy: {
        name: 'Diplomatie',
        objectives: [
          'Négocie une trêve entre {faction1} et {faction2}',
          'Convainc {npc} de rejoindre notre cause',
          'Apaise les tensions à {location}',
          'Persuade {npc} de révéler {secret}'
        ],
        rewards: { gold: [200, 500], xp: [400, 800], item_chance: 0.6 },
        difficulty: 'hard'
      },
      rescue: {
        name: 'Sauvetage',
        objectives: [
          'Sauve {npc} prisonnier à {location}',
          'Libère les otages de {location}',
          'Secours {npc} avant qu\'il soit trop tard'
        ],
        rewards: { gold: [250, 600], xp: [500, 1000], item_chance: 0.7 },
        difficulty: 'hard'
      },
      craft: {
        name: 'Artisanat',
        objectives: [
          'Fabrique {item} pour {npc}',
          'Crée {quantity} {item} de qualité supérieure',
          'Répare le {item} de {npc}'
        ],
        rewards: { gold: [100, 300], xp: [200, 400], item_chance: 0.5 },
        difficulty: 'medium'
      },
      explore: {
        name: 'Exploration',
        objectives: [
          'Explore {location} et cartographie la zone',
          'Découvre ce qui se cache dans {location}',
          'Trouve l\'entrée secrète de {location}'
        ],
        rewards: { gold: [150, 350], xp: [300, 600], item_chance: 0.6 },
        difficulty: 'medium'
      },
      protect: {
        name: 'Protection',
        objectives: [
          'Défends {location} contre {enemy}',
          'Protège {npc} pendant {time}',
          'Garde {item} jusqu\'à l\'arrivée de renforts'
        ],
        rewards: { gold: [200, 500], xp: [400, 800], item_chance: 0.5 },
        difficulty: 'hard'
      }
    };

    // Données pour remplir les templates
    this.questData = {
      items: [
        'Épée Ancienne', 'Grimoire Perdu', 'Herbe Médicinale', 'Pierre Précieuse',
        'Lettre Scellée', 'Artefact Magique', 'Clé Rouillée', 'Potion Rare',
        'Carte au Trésor', 'Amulette Protectrice', 'Parchemin Ancien', 'Cristal Lumineux'
      ],
      locations: [
        'la Forêt Sombre', 'les Ruines Anciennes', 'la Grotte Profonde', 'le Donjon Oublié',
        'la Tour Abandonnée', 'le Marais Maudit', 'les Montagnes du Nord', 'le Temple Perdu',
        'la Crypte Royale', 'le Village Fantôme', 'les Cavernes de Cristal', 'le Pont des Ombres'
      ],
      enemies: [
        'Gobelins', 'Squelettes', 'Bandits', 'Loups Sauvages', 'Trolls', 'Morts-Vivants',
        'Cultistes', 'Orcs', 'Araignées Géantes', 'Zombies', 'Dragons Mineurs', 'Démons'
      ],
      mysteries: [
        'les disparitions récentes', 'le complot secret', 'la malédiction',
        'les lumières étranges', 'les bruits nocturnes', 'la prophétie'
      ],
      secrets: [
        'l\'emplacement du trésor', 'l\'identité du traître', 'la formule secrète',
        'le mot de passe', 'le plan d\'invasion', 'l\'entrée cachée'
      ]
    };

    // Quêtes actives
    this.activeQuests = [];
    this.completedQuests = [];
    this.questIdCounter = 1;
  }

  // ==========================================
  // GÉNÉRER UNE QUÊTE
  // ==========================================
  generateQuest(context = {}) {
    const {
      playerLevel = 1,
      location = 'ville',
      faction = null,
      npcId = null,
      type = null // Si null, choisir aléatoirement
    } = context;

    // Choisir un type de quête
    const questType = type || this.selectQuestType(playerLevel, location);
    const template = this.questTemplates[questType];

    // Remplir le template
    const objective = this.fillTemplate(template.objectives, context);
    const reward = this.calculateReward(template.rewards, playerLevel);

    // Créer la quête
    const quest = {
      id: `quest_${this.questIdCounter++}`,
      type: questType,
      name: this.generateQuestName(questType, objective),
      description: this.generateQuestDescription(questType, objective, context),
      objective: objective,
      reward: reward,
      difficulty: template.difficulty,
      status: 'available', // available/active/completed/failed
      progress: 0,
      maxProgress: this.getMaxProgress(questType),
      giver: npcId || 'anonymous',
      location: location,
      faction: faction,
      level: playerLevel,
      timeLimit: this.getTimeLimit(questType, template.difficulty),
      startTime: null,
      failConditions: this.generateFailConditions(questType)
    };

    return quest;
  }

  // ==========================================
  // SÉLECTIONNER UN TYPE DE QUÊTE
  // ==========================================
  selectQuestType(playerLevel, location) {
    const weights = {
      fetch: playerLevel < 5 ? 30 : 15,
      kill: 25,
      delivery: playerLevel < 3 ? 25 : 10,
      escort: playerLevel > 3 ? 15 : 5,
      investigate: playerLevel > 5 ? 15 : 5,
      diplomacy: playerLevel > 7 ? 10 : 2,
      rescue: playerLevel > 5 ? 12 : 3,
      craft: playerLevel > 2 ? 10 : 5,
      explore: 15,
      protect: playerLevel > 6 ? 13 : 5
    };

    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (const [type, weight] of Object.entries(weights)) {
      random -= weight;
      if (random <= 0) return type;
    }

    return 'fetch';
  }

  // ==========================================
  // REMPLIR UN TEMPLATE
  // ==========================================
  fillTemplate(objectives, context) {
    const objectiveTemplate = objectives[Math.floor(Math.random() * objectives.length)];
    
    return objectiveTemplate
      .replace('{item}', this.random(this.questData.items))
      .replace('{location}', context.location || this.random(this.questData.locations))
      .replace('{enemy}', this.random(this.questData.enemies))
      .replace('{npc}', context.npcName || 'un contact')
      .replace('{quantity}', Math.floor(Math.random() * 5) + 3)
      .replace('{mystery}', this.random(this.questData.mysteries))
      .replace('{secret}', this.random(this.questData.secrets))
      .replace('{faction1}', 'les Marchands')
      .replace('{faction2}', 'les Voleurs')
      .replace('{time}', 'minuit');
  }

  // ==========================================
  // CALCULER LES RÉCOMPENSES
  // ==========================================
  calculateReward(baseReward, playerLevel) {
    const multiplier = 1 + (playerLevel * 0.2);
    
    return {
      gold: Math.floor(
        baseReward.gold[0] + 
        Math.random() * (baseReward.gold[1] - baseReward.gold[0])
      ) * multiplier,
      xp: Math.floor(
        baseReward.xp[0] + 
        Math.random() * (baseReward.xp[1] - baseReward.xp[0])
      ) * multiplier,
      item: Math.random() < baseReward.item_chance ? this.generateRewardItem(playerLevel) : null
    };
  }

  // ==========================================
  // GÉNÉRER UN OBJET DE RÉCOMPENSE
  // ==========================================
  generateRewardItem(playerLevel) {
    const itemTypes = ['weapon', 'armor', 'accessory', 'consumable'];
    const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];
    
    const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    let rarityIndex = Math.min(Math.floor(playerLevel / 3), rarities.length - 1);
    if (Math.random() < 0.2) rarityIndex = Math.min(rarityIndex + 1, rarities.length - 1);
    
    return {
      type: type,
      rarity: rarities[rarityIndex],
      level: playerLevel
    };
  }

  // ==========================================
  // GÉNÉRER UN NOM DE QUÊTE
  // ==========================================
  generateQuestName(type, objective) {
    const prefixes = {
      fetch: ['Récupération', 'La Recherche', 'Mission'],
      kill: ['Chasse', 'Élimination', 'Extermination'],
      escort: ['Escorte', 'Protection', 'Voyage Périlleux'],
      investigate: ['Enquête', 'Mystère', 'Investigation'],
      delivery: ['Livraison', 'Transport', 'Coursier'],
      diplomacy: ['Négociation', 'Diplomatie', 'Paix'],
      rescue: ['Sauvetage', 'Libération', 'Secours'],
      craft: ['Artisanat', 'Fabrication', 'Création'],
      explore: ['Exploration', 'Découverte', 'Cartographie'],
      protect: ['Défense', 'Protection', 'Siège']
    };

    const prefix = this.random(prefixes[type] || ['Mission']);
    const suffix = this.generateQuestSuffix(objective);
    
    return `${prefix} ${suffix}`;
  }

  generateQuestSuffix(objective) {
    // Extraire un mot clé de l'objectif
    const keywords = objective.match(/\b[A-Z][a-zéèêàâ]+\b/g) || [];
    if (keywords.length > 0) {
      return `: ${keywords[0]}`;
    }
    return this.random(['Urgente', 'Périlleuse', 'Secrète', 'Importante', 'Critique']);
  }

  // ==========================================
  // GÉNÉRER UNE DESCRIPTION
  // ==========================================
  generateQuestDescription(type, objective, context) {
    const intros = [
      'Un voyageur inquiet s\'approche de vous...',
      'Une affiche sur le tableau des quêtes attire votre attention...',
      'Un messager vous remet une lettre scellée...',
      'Un cri d\'alarme retentit dans la ville...',
      'Un vieil homme vous interpelle...'
    ];

    const closings = [
      'Le temps presse.',
      'Serez-vous à la hauteur ?',
      'Acceptez-vous cette mission ?',
      'Votre aide est précieuse.',
      'Que le sort vous soit favorable.'
    ];

    return `${this.random(intros)}\n\n"${objective}"\n\n${this.random(closings)}`;
  }

  // ==========================================
  // PROGRESSION MAX
  // ==========================================
  getMaxProgress(type) {
    const progressMap = {
      fetch: 1,
      kill: 10,
      delivery: 1,
      escort: 100, // Distance
      investigate: 5,
      diplomacy: 3,
      rescue: 1,
      craft: 1,
      explore: 100, // Pourcentage zone
      protect: 10 // Vagues
    };
    return progressMap[type] || 1;
  }

  // ==========================================
  // LIMITE DE TEMPS
  // ==========================================
  getTimeLimit(type, difficulty) {
    const baseTime = {
      easy: 60,     // 60 minutes
      medium: 45,
      hard: 30
    };

    const typeModifiers = {
      delivery: 0.5, // Plus urgent
      escort: 1.2,
      protect: 0.8,
      explore: 1.5
    };

    const time = baseTime[difficulty] || 45;
    const modifier = typeModifiers[type] || 1;
    
    return Math.floor(time * modifier);
  }

  // ==========================================
  // CONDITIONS D'ÉCHEC
  // ==========================================
  generateFailConditions(type) {
    const conditions = ['timeout'];
    
    const typeConditions = {
      escort: ['npc_death'],
      delivery: ['item_lost', 'timeout'],
      protect: ['location_destroyed', 'npc_death'],
      rescue: ['hostage_death', 'timeout']
    };

    return [...conditions, ...(typeConditions[type] || [])];
  }

  // ==========================================
  // GÉNÉRER UNE CHAÎNE DE QUÊTES
  // ==========================================
  generateQuestChain(context, chainLength = 3) {
    const chain = [];
    let previousQuest = null;

    for (let i = 0; i < chainLength; i++) {
      const quest = this.generateQuest({
        ...context,
        playerLevel: context.playerLevel + i
      });

      // Lier à la quête précédente
      if (previousQuest) {
        quest.prerequisite = previousQuest.id;
        quest.description = `${quest.description}\n\n*Suite de : ${previousQuest.name}*`;
      }

      chain.push(quest);
      previousQuest = quest;
    }

    return chain;
  }

  // ==========================================
  // METTRE À JOUR LA PROGRESSION
  // ==========================================
  updateQuestProgress(questId, progress) {
    const quest = this.activeQuests.find(q => q.id === questId);
    if (!quest) return null;

    quest.progress = Math.min(quest.maxProgress, quest.progress + progress);

    if (quest.progress >= quest.maxProgress) {
      quest.status = 'completed';
      this.completeQuest(questId);
    }

    return quest;
  }

  // ==========================================
  // COMPLÉTER UNE QUÊTE
  // ==========================================
  completeQuest(questId) {
    const index = this.activeQuests.findIndex(q => q.id === questId);
    if (index === -1) return null;

    const quest = this.activeQuests.splice(index, 1)[0];
    quest.status = 'completed';
    quest.completionTime = Date.now();
    
    this.completedQuests.push(quest);

    return {
      quest: quest,
      rewards: quest.reward,
      narrative: this.generateCompletionNarrative(quest)
    };
  }

  // ==========================================
  // ÉCHOUER UNE QUÊTE
  // ==========================================
  failQuest(questId, reason) {
    const index = this.activeQuests.findIndex(q => q.id === questId);
    if (index === -1) return null;

    const quest = this.activeQuests.splice(index, 1)[0];
    quest.status = 'failed';
    quest.failReason = reason;

    return {
      quest: quest,
      narrative: this.generateFailureNarrative(quest, reason)
    };
  }

  // ==========================================
  // NARRATIFS
  // ==========================================
  generateCompletionNarrative(quest) {
    const narratives = {
      fetch: [
        'Vous remettez l\'objet demandé. Un sourire de soulagement apparaît.',
        'Mission accomplie ! L\'objet est enfin récupéré.',
        'Excellent travail ! Voici votre récompense.'
      ],
      kill: [
        'Les créatures sont vaincues. La région est plus sûre désormais.',
        'Vous revenez victorieux, vos armes encore tachées de sang.',
        'La menace est éliminée. Les villageois peuvent respirer.'
      ],
      rescue: [
        'Les otages sont libres ! Ils vous remercient avec des larmes de joie.',
        'Vous avez réussi à les sauver juste à temps !',
        'Un sauvetage héroïque ! Vous êtes un vrai héros !'
      ]
    };

    const pool = narratives[quest.type] || [
      'Mission accomplie avec succès !',
      'Excellent travail !',
      'Bravo, vous avez réussi !'
    ];

    return this.random(pool);
  }

  generateFailureNarrative(quest, reason) {
    const narratives = {
      timeout: 'Le temps est écoulé... C\'est trop tard.',
      npc_death: 'La personne que vous deviez protéger est morte...',
      item_lost: 'L\'objet a été perdu. Mission échouée.',
      location_destroyed: 'Le lieu n\'a pas pu être défendu...'
    };

    return narratives[reason] || 'Mission échouée.';
  }

  // ==========================================
  // UTILITAIRES
  // ==========================================
  random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  getActiveQuests() {
    return this.activeQuests;
  }

  getCompletedQuests() {
    return this.completedQuests;
  }

  reset() {
    this.activeQuests = [];
    this.completedQuests = [];
    this.questIdCounter = 1;
  }
}

export default QuestGenerator;
