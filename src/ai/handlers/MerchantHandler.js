// ═══════════════════════════════════════════════════════════════════════
// 💰 MERCHANT HANDLER - Gestion des transactions commerciales
// ═══════════════════════════════════════════════════════════════════════

export class MerchantHandler {
  constructor(gmEngine) {
    this.gmEngine = gmEngine;
  }

  async handle(intent, context) {
    const { normalized, entities } = intent;

    // Vérifier qu'il y a un marchand
    const merchant = context.nearbyNPCs?.find(npc => npc.archetype === 'merchant');
    if (!merchant) {
      return {
        text: "Il n'y a pas de marchand ici. Tu peux utiliser `/achat` dans une boutique.",
        confidence: 0.9,
        effects: {}
      };
    }

    // Détecter le type de transaction
    if (normalized.includes('achète') || normalized.includes('buy')) {
      return this.handleBuy(entities, context, merchant);
    }
    if (normalized.includes('vend') || normalized.includes('sell')) {
      return this.handleSell(entities, context, merchant);
    }

    // Par défaut, afficher le catalogue
    return {
      text: `${merchant.name} te salue chaleureusement.\n\n💰 Utilise \`/achat\` pour voir les articles en vente.\n📦 Utilise \`/vente\` pour vendre tes objets.`,
      confidence: 0.85,
      effects: {}
    };
  }

  handleBuy(entities, context, merchant) {
    const item = entities.items[0] || entities.targets[0];
    
    if (!item) {
      return {
        text: "Que veux-tu acheter ? Utilise `/achat` pour voir le catalogue.",
        confidence: 0.8,
        effects: {}
      };
    }

    // Simuler un prix
    const price = this.getItemPrice(item);
    const playerGold = context.player?.gold || 0;

    if (playerGold < price) {
      return {
        text: `${merchant.name} : "Désolé, mais ${item} coûte ${price} po. Tu n'as que ${playerGold} po."`,
        confidence: 0.9,
        effects: {}
      };
    }

    return {
      text: `${merchant.name} : "Excellent choix ! ${item} pour ${price} po. Marché conclu !"\n\n💰 -${price} po\n📦 +1 ${item}`,
      confidence: 0.9,
      effects: {
        gold: -price,
        item: item
      }
    };
  }

  handleSell(entities, context, merchant) {
    const item = entities.items[0] || entities.targets[0];
    
    if (!item) {
      return {
        text: "Que veux-tu vendre ?",
        confidence: 0.8,
        effects: {}
      };
    }

    const price = Math.floor(this.getItemPrice(item) * 0.5); // 50% du prix d'achat

    return {
      text: `${merchant.name} : "Je peux t'en donner ${price} po."\n\n💰 +${price} po\n📦 -1 ${item}`,
      confidence: 0.9,
      effects: {
        gold: price,
        item: '-' + item
      }
    };
  }

  getItemPrice(item) {
    const prices = {
      'potion': 10,
      'épée': 50,
      'armure': 100,
      'bouclier': 40,
      'arc': 30,
      'flèche': 1,
      'pain': 2,
      'viande': 5
    };
    return prices[item] || 20;
  }
}

export default MerchantHandler;
