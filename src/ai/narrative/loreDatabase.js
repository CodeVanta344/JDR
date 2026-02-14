// ═══════════════════════════════════════════════════════════════════════
// 📚 LORE DATABASE - Base de données narrative
// ═══════════════════════════════════════════════════════════════════════
// Contient toutes les données de lore pour générer des narrations cohérentes

export const LORE_DATABASE = {
  locations: {
    'sol-aureus': {
      name: 'Sol-Aureus',
      type: 'city',
      description: 'Capitale dorée de l\'Empire d\'Aethelgard',
      atmosphere: 'animée et prospère',
      landmarks: ['Tour de Lunara', 'Grande Place', 'Forge Royale']
    },
    'forgefer': {
      name: 'Forgefer',
      type: 'city',
      description: 'Cité minière dans les montagnes',
      atmosphere: 'industrieuse et enfumée',
      landmarks: ['Grandes Mines', 'Haut-Fourneau', 'Guilde des Mineurs']
    }
  },

  npcs: {
    archetypes: {
      merchant: {
        personality: 'affable et commerçant',
        greeting: 'Bienvenue !',
        commonPhrases: ['Bonne affaire !', 'Prix d\'ami !']
      },
      guard: {
        personality: 'sérieux et vigilant',
        greeting: 'Halte !',
        commonPhrases: ['Circulez !', 'Papiers, s\'il vous plaît.']
      }
    }
  },

  rumors: [
    "des ombres étranges rôdent près des ruines au nord",
    "un trésor serait caché dans les grottes de l'est",
    "le dragon Saurax aurait été aperçu dans les montagnes"
  ],

  events: {
    random: [
      { type: 'weather_change', description: 'Le temps change soudainement' },
      { type: 'npc_encounter', description: 'Tu croises un voyageur' },
      { type: 'discovery', description: 'Tu remarques quelque chose d\'inhabituel' }
    ]
  }
};

export default LORE_DATABASE;
