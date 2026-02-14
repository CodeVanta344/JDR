// ═══════════════════════════════════════════════════════════════════════
// 💬 DIALOGUE HANDLER - Gestion des conversations avec PNJ
// ═══════════════════════════════════════════════════════════════════════
// Gère les dialogues de manière procédurale avec des arbres de conversation,
// personnalités de PNJ, et réactions contextuelles

export class DialogueHandler {
  constructor(gmEngine) {
    this.gmEngine = gmEngine;
    
    // Templates de dialogues par archétype de PNJ
    this.dialogueTemplates = {
      merchant: {
        greeting: [
          "Bienvenue, {playerName} ! Que puis-je faire pour vous aujourd'hui ?",
          "Ah, un client ! Jetez un œil à ma marchandise.",
          "Bonjour ! J'ai reçu de nouveaux stocks ce matin.",
          "Entrez, entrez ! Les meilleures affaires de {locationName} !"
        ],
        browse: [
          "Prenez votre temps. Tout est de qualité, je vous l'assure.",
          "Si quelque chose vous intéresse, dites-le moi.",
          "J'ai des articles rares en réserve si vous avez les moyens."
        ],
        buy: [
          "Excellent choix ! Ça vous fera {price} pièces d'or.",
          "Ah, vous avez l'œil ! {price} po et c'est à vous.",
          "Un bon investissement. {price} pièces d'or."
        ],
        sell: [
          "Voyons voir... Je peux vous en donner {price} po.",
          "Hmm, pas mal. {price} pièces d'or, pas plus.",
          "D'accord, je vous l'achète pour {price} po."
        ],
        cantAfford: [
          "Ah, il vous manque un peu d'or. Revenez quand vous aurez {price} po !",
          "Désolé, mais ça coûte {price} po. Vous n'avez pas assez.",
          "Cette pièce nécessite {price} pièces d'or. Revenez plus tard !"
        ],
        farewell: [
          "Au plaisir de vous revoir !",
          "Portez-vous bien, et revenez vite !",
          "Bonne route, {playerName} !"
        ]
      },
      
      guard: {
        greeting: [
          "Halte ! Que faites-vous ici ?",
          "Circulez, citoyen.",
          "Tout va bien ?",
          "Que puis-je faire pour vous ?"
        ],
        ask_about_location: [
          "{locationName} est calme ces derniers temps. Tout va bien.",
          "La ville est sûre, ne vous inquiétez pas.",
          "Restez vigilant. Des rumeurs circulent sur des créatures dans les environs."
        ],
        ask_about_quest: [
          "Si vous cherchez du travail, allez voir au bureau des quêtes.",
          "Le capitaine cherche des aventuriers. Allez le voir à la caserne.",
          "Il y a toujours des contrats à la guilde."
        ],
        farewell: [
          "Bonne route.",
          "Restez en sécurité.",
          "Que la lumière vous guide."
        ]
      },
      
      innkeeper: {
        greeting: [
          "Bienvenue à l'auberge ! Une chambre, un repas ?",
          "Entrez, entrez ! Que puis-je vous servir ?",
          "Ah, un voyageur ! Installez-vous."
        ],
        rest: [
          "Une chambre pour la nuit ? Ça fera {price} po.",
          "Reposez-vous bien. {price} pièces d'or pour la chambre.",
          "Vous avez l'air fatigué. {price} po et vous aurez un bon lit."
        ],
        rumor: [
          "Vous avez entendu ? On raconte que {rumor}.",
          "Des voyageurs ont parlé de {rumor}. Étrange, non ?",
          "Il paraît que {rumor}. Mais ce ne sont peut-être que des histoires."
        ],
        farewell: [
          "Passez une bonne nuit !",
          "À bientôt !",
          "Revenez quand vous voulez !"
        ]
      },
      
      questgiver: {
        greeting: [
          "Ah, vous tombez bien ! J'ai besoin d'aide.",
          "Vous êtes aventurier ? J'ai un travail pour vous.",
          "Parfait ! J'ai justement une mission."
        ],
        offer_quest: [
          "Voilà : {questDescription}. Qu'en dites-vous ?",
          "J'ai besoin que quelqu'un {questDescription}. Intéressé ?",
          "Si vous pouvez {questDescription}, je vous paierai bien."
        ],
        accept_quest: [
          "Excellent ! Je compte sur vous.",
          "Merci ! Revenez me voir quand c'est fait.",
          "Parfait ! Bonne chance."
        ],
        decline_quest: [
          "Dommage. Si vous changez d'avis, revenez me voir.",
          "Très bien. D'autres le feront sans doute.",
          "Comme vous voulez."
        ],
        quest_complete: [
          "Incroyable ! Vous l'avez fait ! Voici votre récompense : {reward}.",
          "Merci infiniment ! Tenez, {reward} comme convenu.",
          "Excellent travail ! Prenez {reward}."
        ]
      },
      
      commoner: {
        greeting: [
          "Bonjour, étranger.",
          "Salut ! Vous êtes nouveau ici ?",
          "Beau temps, n'est-ce pas ?"
        ],
        small_talk: [
          "La vie est tranquille par ici.",
          "Parfois, on entend des histoires étranges...",
          "Faites attention la nuit. On ne sait jamais."
        ],
        farewell: [
          "À bientôt !",
          "Portez-vous bien !",
          "Bonne journée !"
        ]
      }
    };

    // Sujets de conversation communs
    this.topics = {
      weather: [
        "Le temps est agréable aujourd'hui.",
        "Il a fait froid ces derniers jours.",
        "On annonce de la pluie pour demain."
      ],
      rumors: [
        "des ombres étranges rôdent près des ruines au nord",
        "le vieux moulin serait hanté",
        "un trésor serait caché dans les grottes de l'est",
        "des bandits attaquent les caravanes sur la route du sud",
        "un dragon aurait été aperçu dans les montagnes"
      ],
      local_info: [
        "Le marché est ouvert tous les matins.",
        "La forge du coin est réputée.",
        "Méfiez-vous des pickpockets dans les ruelles.",
        "L'auberge du Cheval d'Or a les meilleurs lits de la ville.",
        "Le temple offre des bénédictions aux voyageurs."
      ]
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 💬 GESTION PRINCIPALE DES DIALOGUES
  // ═══════════════════════════════════════════════════════════════════════

  async handle(intent, context) {
    const { entities } = intent;
    const npc = this.identifyNPC(entities, context);

    if (!npc) {
      return {
        text: "Il n'y a personne à qui parler ici.",
        confidence: 0.9,
        effects: {}
      };
    }

    // Déterminer le type de dialogue
    const dialogueType = this.determineDialogueType(intent.normalized, context);

    // Générer la réponse appropriée
    const response = this.generateDialogue(npc, dialogueType, context);

    // Mise à jour des relations (si mémoire activée)
    if (this.gmEngine.config.enableMemory) {
      const relationChange = this.calculateRelationChange(dialogueType, context);
      if (relationChange !== 0) {
        this.gmEngine.memoryManager.updateRelationship(npc.id, relationChange);
      }
    }

    return {
      text: response,
      confidence: 0.85,
      effects: {
        npc: npc.id,
        dialogueType: dialogueType
      },
      meta: {
        responseType: 'dialogue'
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🎯 IDENTIFICATION & CLASSIFICATION
  // ═══════════════════════════════════════════════════════════════════════

  identifyNPC(entities, context) {
    // Essayer de trouver le PNJ par nom
    if (entities.npcs && entities.npcs.length > 0) {
      const npcName = entities.npcs[0];
      const found = context.nearbyNPCs?.find(n => 
        n.name.toLowerCase().includes(npcName.toLowerCase())
      );
      if (found) return found;
    }

    // Si un seul PNJ proche, c'est lui
    if (context.nearbyNPCs?.length === 1) {
      return context.nearbyNPCs[0];
    }

    // Sinon, chercher le PNJ le plus proche
    if (context.nearbyNPCs?.length > 0) {
      return context.nearbyNPCs[0]; // Par défaut, le premier
    }

    return null;
  }

  determineDialogueType(text, context) {
    // Détection du type de dialogue
    if (text.includes('achète') || text.includes('vend') || text.includes('prix')) {
      return 'merchant_trade';
    }
    if (text.includes('quête') || text.includes('mission') || text.includes('travail')) {
      return 'quest_inquiry';
    }
    if (text.includes('rumeur') || text.includes('nouvelles') || text.includes('info')) {
      return 'rumors';
    }
    if (text.includes('repos') || text.includes('chambre') || text.includes('dort')) {
      return 'rest';
    }
    if (text.includes('bonjour') || text.includes('salut') || text.includes('hey')) {
      return 'greeting';
    }
    if (text.includes('au revoir') || text.includes('bye') || text.includes('à plus')) {
      return 'farewell';
    }

    // Par défaut
    return 'small_talk';
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 📝 GÉNÉRATION DE DIALOGUES
  // ═══════════════════════════════════════════════════════════════════════

  generateDialogue(npc, dialogueType, context) {
    const archetype = npc.archetype || 'commoner';
    const templates = this.dialogueTemplates[archetype];

    if (!templates) {
      return `${npc.name} vous regarde sans rien dire.`;
    }

    let response = '';

    switch (dialogueType) {
      case 'greeting':
        response = this.randomPick(templates.greeting || templates.small_talk);
        break;
      case 'farewell':
        response = this.randomPick(templates.farewell);
        break;
      case 'merchant_trade':
        if (archetype === 'merchant') {
          response = this.randomPick(templates.browse);
          response += '\n\n💰 Tapez `/achat` pour voir les articles disponibles.';
        } else {
          response = `${npc.name} n'est pas un marchand.`;
        }
        break;
      case 'quest_inquiry':
        if (archetype === 'questgiver') {
          const quest = context.availableQuests?.[0];
          if (quest) {
            response = this.randomPick(templates.offer_quest);
            response = response.replace('{questDescription}', quest.description);
          } else {
            response = "Je n'ai pas de travail pour le moment. Revenez plus tard !";
          }
        } else {
          response = this.randomPick(templates.ask_about_quest || ["Je ne peux pas vous aider avec ça."]);
        }
        break;
      case 'rumors':
        response = this.randomPick(templates.rumor || templates.small_talk);
        response = response.replace('{rumor}', this.randomPick(this.topics.rumors));
        break;
      case 'rest':
        if (archetype === 'innkeeper') {
          response = this.randomPick(templates.rest);
          response = response.replace('{price}', '10');
        } else {
          response = `${npc.name} ne peut pas vous louer de chambre.`;
        }
        break;
      case 'small_talk':
      default:
        response = this.randomPick(templates.small_talk || templates.greeting);
        break;
    }

    // Remplacer les variables
    response = this.replaceVariables(response, npc, context);

    return response;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🛠️ HELPERS
  // ═══════════════════════════════════════════════════════════════════════

  replaceVariables(text, npc, context) {
    return text
      .replace('{playerName}', context.player?.name || 'voyageur')
      .replace('{npcName}', npc.name)
      .replace('{locationName}', context.location?.name || 'cette région')
      .replace('{price}', '10'); // Prix par défaut
  }

  randomPick(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  calculateRelationChange(dialogueType, context) {
    // Augmenter ou diminuer la relation selon le type de dialogue
    switch (dialogueType) {
      case 'greeting': return 1;
      case 'farewell': return 1;
      case 'quest_inquiry': return 2;
      case 'merchant_trade': return 1;
      case 'insult': return -10;
      case 'threat': return -20;
      default: return 0;
    }
  }
}

export default DialogueHandler;
