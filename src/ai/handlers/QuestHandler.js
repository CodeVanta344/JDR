// ═══════════════════════════════════════════════════════════════════════
// 📜 QUEST HANDLER - Gestion des quêtes
// ═══════════════════════════════════════════════════════════════════════

export class QuestHandler {
  constructor(gmEngine) {
    this.gmEngine = gmEngine;
  }

  async handle(intent, context) {
    const { normalized } = intent;

    if (normalized.includes('accepte')) {
      return this.acceptQuest(context);
    }
    if (normalized.includes('complète') || normalized.includes('termine')) {
      return this.completeQuest(context);
    }
    if (normalized.includes('journal') || normalized.includes('liste')) {
      return this.listQuests(context);
    }

    return {
      text: "Utilise `/quetes` pour voir tes quêtes actives.",
      confidence: 0.7,
      effects: {}
    };
  }

  acceptQuest(context) {
    const quest = context.availableQuests?.[0];
    if (!quest) {
      return {
        text: "Il n'y a pas de quête disponible ici.",
        confidence: 0.9,
        effects: {}
      };
    }

    return {
      text: `📜 Quête acceptée : **${quest.title}**\n\n${quest.description}\n\n🎯 Objectif : ${quest.objective}`,
      confidence: 0.9,
      effects: {
        questAccepted: quest.id
      }
    };
  }

  completeQuest(context) {
    const activeQuest = context.activeQuests?.[0];
    if (!activeQuest) {
      return {
        text: "Tu n'as pas de quête active.",
        confidence: 0.9,
        effects: {}
      };
    }

    if (!activeQuest.completed) {
      return {
        text: `La quête **${activeQuest.title}** n'est pas encore terminée.\n\nObjectif : ${activeQuest.objective}`,
        confidence: 0.9,
        effects: {}
      };
    }

    const reward = activeQuest.reward || { gold: 50, xp: 100 };
    
    return {
      text: `✅ Quête terminée : **${activeQuest.title}** !\n\n💰 +${reward.gold} po\n✨ +${reward.xp} XP`,
      confidence: 0.9,
      effects: {
        questCompleted: activeQuest.id,
        gold: reward.gold,
        xp: reward.xp
      }
    };
  }

  listQuests(context) {
    const quests = context.activeQuests || [];
    
    if (quests.length === 0) {
      return {
        text: "📜 Tu n'as aucune quête active.",
        confidence: 0.9,
        effects: {}
      };
    }

    const questList = quests.map((q, i) => 
      `${i+1}. **${q.title}** ${q.completed ? '✅' : '⏳'}\n   ${q.objective}`
    ).join('\n\n');

    return {
      text: `📜 **Tes quêtes actives :**\n\n${questList}`,
      confidence: 0.9,
      effects: {}
    };
  }
}

export default QuestHandler;
