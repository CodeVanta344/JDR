// ═══════════════════════════════════════════════════════════════════════
// ⚔️ COMBAT HANDLER - Intégration avec CombatManager existant
// ═══════════════════════════════════════════════════════════════════════

export class CombatHandler {
  constructor(gmEngine) {
    this.gmEngine = gmEngine;
  }

  async handle(intent, context) {
    // Si pas en combat, refuser
    if (!context.inCombat) {
      return {
        text: "Il n'y a personne à attaquer ici. Utilise `/combat` pour déclencher un combat.",
        confidence: 0.9,
        effects: {}
      };
    }

    // Déléguer au CombatManager existant
    return {
      text: "⚔️ Combat en cours ! Utilise les boutons d'action pour attaquer, te défendre ou utiliser un sort.",
      confidence: 0.5, // Faible confiance = fallback vers LLM/CombatManager
      effects: {
        delegateToCombatManager: true
      },
      meta: {
        responseType: 'combat'
      }
    };
  }
}

export default CombatHandler;
