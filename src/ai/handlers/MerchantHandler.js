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

    // Dynamic pricing: rarity + level scaling + CHA discount
    const itemRarity = entities.rarity || this.detectRarity(item);
    const playerLevel = context.player?.level || 1;
    const playerCha = context.player?.stats?.cha || 10;
    const price = this.getDynamicPrice(item, itemRarity, playerLevel, playerCha);
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

    const itemRarity = entities.rarity || this.detectRarity(item);
    const playerLevel = context.player?.level || 1;
    const playerCha = context.player?.stats?.cha || 10;
    const buyPrice = this.getDynamicPrice(item, itemRarity, playerLevel, playerCha);
    const price = Math.floor(buyPrice * 0.5); // 50% du prix d'achat

    return {
      text: `${merchant.name} : "Je peux t'en donner ${price} po."\n\n💰 +${price} po\n📦 -1 ${item}`,
      confidence: 0.9,
      effects: {
        gold: price,
        item: '-' + item
      }
    };
  }

  // ─── Dynamic Pricing by Rarity + Level Scaling + CHA Discount ─────────

  static RARITY_PRICE_RANGES = {
    common:    { min: 5,   max: 20 },
    uncommon:  { min: 20,  max: 50 },
    rare:      { min: 50,  max: 150 },
    epic:      { min: 150, max: 400 },
    legendary: { min: 400, max: 1000 },
  };

  getDynamicPrice(item, rarity, playerLevel, playerCha) {
    const range = MerchantHandler.RARITY_PRICE_RANGES[rarity] || MerchantHandler.RARITY_PRICE_RANGES.common;

    // Base price: midpoint of rarity range
    let basePrice = Math.floor((range.min + range.max) / 2);

    // Level scaling: multiply by (1 + playerLevel * 0.1)
    basePrice = Math.floor(basePrice * (1 + playerLevel * 0.1));

    // CHA discount: -1% per CHA point above 10, +1% per point below 10
    const chaModifier = playerCha - 10;
    const chaDiscount = 1 - (chaModifier * 0.01);
    basePrice = Math.max(1, Math.floor(basePrice * chaDiscount));

    // Clamp within scaled range
    const scaledMin = Math.floor(range.min * (1 + playerLevel * 0.1));
    const scaledMax = Math.floor(range.max * (1 + playerLevel * 0.1));
    return Math.max(scaledMin, Math.min(scaledMax, basePrice));
  }

  detectRarity(itemName) {
    const name = (itemName || '').toLowerCase();
    if (name.includes('légendaire') || name.includes('legendary') || name.includes('scellé') || name.includes('divin')) return 'legendary';
    if (name.includes('épique') || name.includes('epic') || name.includes('céleste') || name.includes('mithril')) return 'epic';
    if (name.includes('rare') || name.includes('enchanté') || name.includes('acier') || name.includes('adamantine')) return 'rare';
    if (name.includes('uncommon') || name.includes('fer') || name.includes('cuir') || name.includes('épée') || name.includes('armure') || name.includes('bouclier') || name.includes('arc')) return 'uncommon';
    return 'common';
  }
}

export default MerchantHandler;
