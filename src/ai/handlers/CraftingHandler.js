// ═══════════════════════════════════════════════════════════════════════
// 🔨 CRAFTING HANDLER - Gestion de l'artisanat
// ═══════════════════════════════════════════════════════════════════════

export class CraftingHandler {
  constructor(gmEngine) {
    this.gmEngine = gmEngine;
  }

  async handle(intent, context) {
    const { entities } = intent;
    const item = entities.items[0] || entities.targets[0];

    if (!item) {
      return {
        text: "Que veux-tu fabriquer ? Utilise `/craft` pour voir les recettes disponibles.",
        confidence: 0.8,
        effects: {}
      };
    }

    // Vérifier si le joueur a la profession nécessaire
    const profession = this.getRequiredProfession(item);
    if (profession && !context.player?.professions?.includes(profession)) {
      return {
        text: `Tu as besoin de la profession **${profession}** pour fabriquer ${item}.`,
        confidence: 0.9,
        effects: {}
      };
    }

    // Vérifier les matériaux
    const materials = this.getRequiredMaterials(item);
    const hasMaterials = this.checkMaterials(materials, context.player?.inventory);

    if (!hasMaterials) {
      const materialList = Object.entries(materials).map(([mat, qty]) => `${qty}x ${mat}`).join(', ');
      return {
        text: `Matériaux nécessaires : ${materialList}`,
        confidence: 0.9,
        effects: {}
      };
    }

    // INT crafting bonus: +3% success chance per INT modifier
    const intScore = context.player?.stats?.int || 10;
    const intModifier = Math.floor((intScore - 10) / 2);
    const craftingBonus = intModifier * 3; // % bonus
    const baseCraftChance = 70; // Base 70% success
    const successChance = Math.min(99, Math.max(5, baseCraftChance + craftingBonus));
    const roll = Math.floor(Math.random() * 100) + 1;
    const craftSuccess = roll <= successChance;

    if (!craftSuccess) {
      // Failed craft - lose some materials
      const intNote = intModifier !== 0 ? ` (INT ${intModifier >= 0 ? '+' : ''}${craftingBonus}%)` : '';
      return {
        text: `🔨 Échec de fabrication de ${item}...${intNote}\n\n⚠️ Certains matériaux ont été perdus.\n🎲 Jet: ${roll}/${successChance}`,
        confidence: 0.9,
        effects: {
          craftFailed: true,
          materials: materials // Materials consumed on failure
        }
      };
    }

    // Fabrication réussie
    const intNote = intModifier !== 0 ? ` (INT ${intModifier >= 0 ? '+' : ''}${craftingBonus}%)` : '';
    return {
      text: `🔨 Tu fabriques ${item} avec succès !${intNote}\n\n📦 +1 ${item}\n✨ +20 XP (${profession})\n🎲 Jet: ${roll}/${successChance}`,
      confidence: 0.9,
      effects: {
        itemCrafted: item,
        xp: 20,
        materials: materials
      }
    };
  }

  getRequiredProfession(item) {
    const professions = {
      'épée': 'Blacksmithing',
      'armure': 'Blacksmithing',
      'potion': 'Alchemy',
      'pain': 'Cooking',
      'arc': 'Carpentry'
    };
    return professions[item] || null;
  }

  getRequiredMaterials(item) {
    const materials = {
      'épée': { 'fer': 3, 'bois': 1 },
      'potion': { 'herbe': 2, 'eau': 1 },
      'pain': { 'farine': 2, 'eau': 1 },
      'arc': { 'bois': 3, 'corde': 1 }
    };
    return materials[item] || {};
  }

  checkMaterials(required, inventory) {
    // Simplification : on suppose que le joueur a toujours les matériaux
    return true;
  }
}

export default CraftingHandler;
