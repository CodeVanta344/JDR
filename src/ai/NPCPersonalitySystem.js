// ==========================================
// NPC PERSONALITY SYSTEM - IA avancée des PNJ
// ==========================================
// Système de personnalités évolutives pour PNJ :
// - Traits de personnalité (Big Five + archétypes RPG)
// - Mémoire émotionnelle des interactions
// - Évolution des relations basée sur l'historique
// - Génération de dialogues contextuals adaptés à la personnalité

class NPCPersonalitySystem {
  constructor() {
    // Base de données des PNJ
    this.npcs = new Map();
    
    // Traits de personnalité (Big Five + traits RPG)
    this.traitDefinitions = {
      // Big Five
      openness: { min: 0, max: 100, default: 50 },        // Ouverture d'esprit
      conscientiousness: { min: 0, max: 100, default: 50 }, // Conscience/rigueur
      extraversion: { min: 0, max: 100, default: 50 },    // Extraversion
      agreeableness: { min: 0, max: 100, default: 50 },   // Agréabilité
      neuroticism: { min: 0, max: 100, default: 50 },     // Névrosisme/stabilité émotionnelle
      
      // Traits RPG
      courage: { min: 0, max: 100, default: 50 },         // Bravoure
      greed: { min: 0, max: 100, default: 30 },           // Cupidité
      honesty: { min: 0, max: 100, default: 60 },         // Honnêteté
      loyalty: { min: 0, max: 100, default: 50 },         // Loyauté
      compassion: { min: 0, max: 100, default: 50 }       // Compassion
    };

    // Archétypes de personnalité prédéfinis
    this.archetypes = {
      merchant: {
        name: 'Marchand',
        traits: { openness: 60, conscientiousness: 70, extraversion: 75, agreeableness: 55, neuroticism: 40, greed: 70, honesty: 50 },
        speechPatterns: ['affaires', 'profit', 'offre spéciale', 'qualité'],
        motivations: ['argent', 'réputation', 'clientèle']
      },
      guard: {
        name: 'Garde',
        traits: { openness: 30, conscientiousness: 85, extraversion: 40, agreeableness: 45, neuroticism: 30, courage: 75, loyalty: 90, honesty: 80 },
        speechPatterns: ['ordre', 'loi', 'devoir', 'sécurité'],
        motivations: ['ordre', 'protection', 'devoir']
      },
      rogue: {
        name: 'Voleur',
        traits: { openness: 70, conscientiousness: 30, extraversion: 60, agreeableness: 40, neuroticism: 50, courage: 65, greed: 80, honesty: 20 },
        speechPatterns: ['discret', 'opportunité', 'risque', 'récompense'],
        motivations: ['argent', 'liberté', 'excitation']
      },
      scholar: {
        name: 'Érudit',
        traits: { openness: 95, conscientiousness: 75, extraversion: 25, agreeableness: 55, neuroticism: 60, honesty: 85 },
        speechPatterns: ['savoir', 'anciens textes', 'recherche', 'théorie'],
        motivations: ['connaissance', 'découverte', 'vérité']
      },
      priest: {
        name: 'Prêtre',
        traits: { openness: 50, conscientiousness: 80, extraversion: 55, agreeableness: 85, neuroticism: 35, compassion: 95, honesty: 90 },
        speechPatterns: ['foi', 'bénédiction', 'vertu', 'divine'],
        motivations: ['salut', 'aide', 'foi']
      },
      noble: {
        name: 'Noble',
        traits: { openness: 40, conscientiousness: 65, extraversion: 70, agreeableness: 35, neuroticism: 45, greed: 60, loyalty: 40 },
        speechPatterns: ['honneur', 'lignée', 'prestige', 'tradition'],
        motivations: ['pouvoir', 'héritage', 'influence']
      },
      innkeeper: {
        name: 'Aubergiste',
        traits: { openness: 55, conscientiousness: 60, extraversion: 80, agreeableness: 75, neuroticism: 40, compassion: 65, honesty: 70 },
        speechPatterns: ['bienvenue', 'confort', 'histoires', 'repas chaud'],
        motivations: ['hospitalité', 'clientèle fidèle', 'stabilité']
      },
      hermit: {
        name: 'Ermite',
        traits: { openness: 85, conscientiousness: 50, extraversion: 10, agreeableness: 40, neuroticism: 65, honesty: 90 },
        speechPatterns: ['solitude', 'nature', 'méditation', 'sagesse'],
        motivations: ['paix', 'compréhension', 'isolement']
      }
    };

    // Types d'émotions
    this.emotions = {
      joy: { intensity: 0, decay: 0.9 },
      anger: { intensity: 0, decay: 0.85 },
      fear: { intensity: 0, decay: 0.88 },
      sadness: { intensity: 0, decay: 0.87 },
      disgust: { intensity: 0, decay: 0.90 },
      trust: { intensity: 0, decay: 0.95 },
      anticipation: { intensity: 0, decay: 0.92 },
      surprise: { intensity: 0, decay: 0.80 }
    };
  }

  // ==========================================
  // CRÉER UN PNJ
  // ==========================================
  createNPC(id, name, archetype, customTraits = {}) {
    const archetypeData = this.archetypes[archetype] || this.archetypes.merchant;
    
    const npc = {
      id,
      name,
      archetype,
      traits: { ...archetypeData.traits, ...customTraits },
      speechPatterns: [...archetypeData.speechPatterns],
      motivations: [...archetypeData.motivations],
      
      // Mémoire émotionnelle
      emotionalState: JSON.parse(JSON.stringify(this.emotions)),
      interactionHistory: [],
      relationshipScore: 0, // -100 à +100
      
      // Mémoire des sujets
      knownTopics: [],
      rumors: [],
      secrets: [],
      
      // État temporaire
      mood: 'neutral', // happy/neutral/sad/angry/fearful
      stress: 0,
      energy: 100,
      
      // Statistiques
      totalInteractions: 0,
      favorsDone: 0,
      offensesReceived: 0,
      giftsReceived: 0
    };

    this.npcs.set(id, npc);
    return npc;
  }

  // ==========================================
  // RÉCUPÉRER UN PNJ
  // ==========================================
  getNPC(id) {
    return this.npcs.get(id);
  }

  // ==========================================
  // ENREGISTRER UNE INTERACTION
  // ==========================================
  recordInteraction(npcId, interactionData) {
    const npc = this.npcs.get(npcId);
    if (!npc) return null;

    const interaction = {
      timestamp: Date.now(),
      type: interactionData.type, // greeting/dialogue/trade/quest/combat/gift
      playerAction: interactionData.action,
      npcReaction: interactionData.reaction,
      emotionalImpact: interactionData.emotionalImpact || {},
      relationshipChange: interactionData.relationshipChange || 0
    };

    // Ajouter à l'historique
    npc.interactionHistory.push(interaction);
    if (npc.interactionHistory.length > 50) {
      npc.interactionHistory.shift(); // Limiter la mémoire
    }

    // Mettre à jour les émotions
    this.updateEmotions(npc, interaction.emotionalImpact);

    // Mettre à jour la relation
    npc.relationshipScore = Math.max(-100, Math.min(100, npc.relationshipScore + interaction.relationshipChange));

    // Mettre à jour le mood
    npc.mood = this.calculateMood(npc);

    // Statistiques
    npc.totalInteractions++;

    return this.generateResponse(npc, interactionData);
  }

  // ==========================================
  // METTRE À JOUR LES ÉMOTIONS
  // ==========================================
  updateEmotions(npc, emotionalImpact) {
    Object.keys(emotionalImpact).forEach(emotion => {
      if (npc.emotionalState[emotion]) {
        npc.emotionalState[emotion].intensity = Math.max(
          0,
          Math.min(100, npc.emotionalState[emotion].intensity + emotionalImpact[emotion])
        );
      }
    });

    // Déclin naturel des émotions
    Object.keys(npc.emotionalState).forEach(emotion => {
      npc.emotionalState[emotion].intensity *= npc.emotionalState[emotion].decay;
    });
  }

  // ==========================================
  // CALCULER LE MOOD
  // ==========================================
  calculateMood(npc) {
    const emotions = npc.emotionalState;
    
    // Trouver l'émotion dominante
    let dominantEmotion = 'neutral';
    let maxIntensity = 20; // Seuil minimum

    Object.keys(emotions).forEach(emotion => {
      if (emotions[emotion].intensity > maxIntensity) {
        maxIntensity = emotions[emotion].intensity;
        dominantEmotion = emotion;
      }
    });

    // Mapper les émotions sur les moods
    const emotionToMood = {
      joy: 'happy',
      anger: 'angry',
      fear: 'fearful',
      sadness: 'sad',
      trust: 'friendly',
      disgust: 'disgusted'
    };

    return emotionToMood[dominantEmotion] || 'neutral';
  }

  // ==========================================
  // GÉNÉRER UNE RÉPONSE
  // ==========================================
  generateResponse(npc, interactionData) {
    const response = {
      npcName: npc.name,
      mood: npc.mood,
      relationshipScore: npc.relationshipScore,
      text: '',
      tone: this.getTone(npc),
      suggestions: []
    };

    // Générer le texte en fonction du type d'interaction
    switch (interactionData.type) {
      case 'greeting':
        response.text = this.generateGreeting(npc);
        break;
      case 'dialogue':
        response.text = this.generateDialogue(npc, interactionData.topic);
        break;
      case 'trade':
        response.text = this.generateTradeResponse(npc, interactionData);
        break;
      case 'quest':
        response.text = this.generateQuestResponse(npc, interactionData);
        break;
      case 'gift':
        response.text = this.generateGiftResponse(npc, interactionData);
        npc.giftsReceived++;
        break;
      case 'offense':
        response.text = this.generateOffenseResponse(npc, interactionData);
        npc.offensesReceived++;
        break;
      default:
        response.text = "...";
    }

    // Ajouter des suggestions contextuelles
    response.suggestions = this.generateSuggestions(npc);

    return response;
  }

  // ==========================================
  // GÉNÉRER UN SALUT
  // ==========================================
  generateGreeting(npc) {
    const relationship = npc.relationshipScore;
    const mood = npc.mood;
    const archetype = npc.archetype;

    // Greetings basés sur la relation
    if (relationship > 75) {
      const greetings = [
        `${npc.name} : "Ah, mon ami ! Toujours un plaisir de te voir !"`,
        `${npc.name} vous accueille chaleureusement : "Bienvenue, compagnon !"`,
        `${npc.name} sourit largement : "Te revoilà ! J'espérais ton retour !"`
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (relationship > 40) {
      return `${npc.name} : "Salutations ! Que puis-je faire pour toi aujourd'hui ?"`;
    }

    if (relationship > -40) {
      return `${npc.name} vous salue poliment d'un hochement de tête.`;
    }

    if (relationship > -75) {
      return `${npc.name} vous regarde avec méfiance : "Qu'est-ce que tu veux ?"`;
    }

    return `${npc.name} vous lance un regard noir : "Toi... Dégage."`;
  }

  // ==========================================
  // GÉNÉRER UN DIALOGUE
  // ==========================================
  generateDialogue(npc, topic) {
    const patterns = npc.speechPatterns;
    const traits = npc.traits;
    
    // Ajuster le dialogue selon les traits
    let dialogue = `${npc.name} : "`;

    if (traits.extraversion > 70) {
      dialogue += "Oh, excellente question ! ";
    } else if (traits.extraversion < 30) {
      dialogue += "Hmm... ";
    }

    // Ajouter le contenu
    if (patterns.includes(topic)) {
      dialogue += `C'est un sujet qui me passionne ! `;
    } else {
      dialogue += `Je ne suis pas expert en ${topic}, mais... `;
    }

    // Fin selon l'humeur
    if (npc.mood === 'happy') {
      dialogue += `Reviens me voir quand tu veux !"`;
    } else if (npc.mood === 'angry') {
      dialogue += `Maintenant, laisse-moi tranquille."`;
    } else {
      dialogue += `"`;
    }

    return dialogue;
  }

  // ==========================================
  // GÉNÉRER UNE RÉPONSE COMMERCIALE
  // ==========================================
  generateTradeResponse(npc, data) {
    const greed = npc.traits.greed;
    const relationship = npc.relationshipScore;

    if (data.action === 'buy') {
      if (greed > 70 && relationship < 20) {
        return `${npc.name} : "Ce prix est ferme. À prendre ou à laisser."`;
      } else if (relationship > 60) {
        return `${npc.name} : "Pour toi, je fais un prix d'ami !"`;
      } else {
        return `${npc.name} : "Affaire conclue !"`;
      }
    }

    if (data.action === 'sell') {
      if (greed > 70) {
        return `${npc.name} : "Je peux t'en donner la moitié du prix."`;
      } else {
        return `${npc.name} : "C'est un prix honnête."`;
      }
    }

    return `${npc.name} : "Hm, intéressant..."`;
  }

  // ==========================================
  // GÉNÉRER UNE RÉPONSE DE QUÊTE
  // ==========================================
  generateQuestResponse(npc, data) {
    const loyalty = npc.traits.loyalty;
    const relationship = npc.relationshipScore;

    if (data.action === 'accept') {
      if (relationship > 50) {
        return `${npc.name} : "Je savais que je pouvais compter sur toi ! Merci, ami."`;
      } else {
        return `${npc.name} : "Bien. Ne me déçois pas."`;
      }
    }

    if (data.action === 'complete') {
      if (loyalty > 70) {
        return `${npc.name} : "Tu as fait un travail remarquable ! Voici ta récompense... et un peu plus."`;
      } else {
        return `${npc.name} : "Travail accompli. Voici ce qui était convenu."`;
      }
    }

    return `${npc.name} : "J'ai besoin d'aide..."`;
  }

  // ==========================================
  // GÉNÉRER UNE RÉPONSE À UN CADEAU
  // ==========================================
  generateGiftResponse(npc, data) {
    const agreeableness = npc.traits.agreeableness;
    
    if (agreeableness > 70) {
      return `${npc.name} : "Pour moi ? C'est si gentil ! Merci infiniment !"`;
    } else if (agreeableness > 40) {
      return `${npc.name} : "Merci. J'apprécie le geste."`;
    } else {
      return `${npc.name} : "Qu'est-ce que tu veux en échange ?"`;
    }
  }

  // ==========================================
  // GÉNÉRER UNE RÉPONSE À UNE OFFENSE
  // ==========================================
  generateOffenseResponse(npc, data) {
    const courage = npc.traits.courage;
    const neuroticism = npc.traits.neuroticism;

    if (courage > 70 && neuroticism < 40) {
      return `${npc.name} : "Tu vas le regretter !" (Prépare son arme)`;
    } else if (neuroticism > 70) {
      return `${npc.name} recule, effrayé : "Ne me fais pas de mal !"`;
    } else {
      return `${npc.name} : "Je n'oublierai pas ça."`;
    }
  }

  // ==========================================
  // DÉTERMINER LE TON
  // ==========================================
  getTone(npc) {
    const mood = npc.mood;
    const extraversion = npc.traits.extraversion;

    if (mood === 'happy' && extraversion > 60) return 'joyeux et bavard';
    if (mood === 'happy') return 'content';
    if (mood === 'angry') return 'hostile';
    if (mood === 'fearful') return 'craintif';
    if (mood === 'sad') return 'mélancolique';
    if (mood === 'friendly') return 'chaleureux';
    return 'neutre';
  }

  // ==========================================
  // GÉNÉRER DES SUGGESTIONS
  // ==========================================
  generateSuggestions(npc) {
    const suggestions = [];
    const relationship = npc.relationshipScore;

    if (npc.archetype === 'merchant') {
      suggestions.push('Voir les marchandises', 'Vendre un objet');
    }

    if (relationship > 50) {
      suggestions.push('Demander une faveur', 'Partager une rumeur');
    }

    if (npc.rumors.length > 0) {
      suggestions.push('Écouter les rumeurs');
    }

    return suggestions;
  }

  // ==========================================
  // FAIRE ÉVOLUER LES TRAITS
  // ==========================================
  evolveTraits(npcId) {
    const npc = this.npcs.get(npcId);
    if (!npc || npc.interactionHistory.length < 10) return;

    // Analyser les 10 dernières interactions
    const recentInteractions = npc.interactionHistory.slice(-10);
    
    // Augmenter la loyauté si beaucoup de faveurs
    if (npc.favorsDone > 5) {
      npc.traits.loyalty = Math.min(100, npc.traits.loyalty + 5);
    }

    // Augmenter la méfiance si offenses répétées
    if (npc.offensesReceived > 3) {
      npc.traits.neuroticism = Math.min(100, npc.traits.neuroticism + 10);
      npc.traits.agreeableness = Math.max(0, npc.traits.agreeableness - 10);
    }

    // Augmenter l'ouverture si interactions variées
    const interactionTypes = new Set(recentInteractions.map(i => i.type));
    if (interactionTypes.size >= 4) {
      npc.traits.openness = Math.min(100, npc.traits.openness + 3);
    }
  }

  // ==========================================
  // RÉCUPÉRER LE PROFIL COMPLET
  // ==========================================
  getProfile(npcId) {
    const npc = this.npcs.get(npcId);
    if (!npc) return null;

    return {
      name: npc.name,
      archetype: npc.archetype,
      traits: npc.traits,
      mood: npc.mood,
      relationshipScore: npc.relationshipScore,
      totalInteractions: npc.totalInteractions,
      dominantEmotion: this.calculateMood(npc),
      recentInteractions: npc.interactionHistory.slice(-5)
    };
  }

  // ==========================================
  // RÉINITIALISATION
  // ==========================================
  reset() {
    this.npcs.clear();
  }
}

export default NPCPersonalitySystem;
