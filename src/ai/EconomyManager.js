// ==========================================
// ECONOMY MANAGER - Système d'économie dynamique
// ==========================================
// Gère une économie vivante avec :
// - Prix fluctuants selon l'offre et la demande
// - Événements économiques (inflation, pénurie, abondance)
// - Marchés locaux et régionaux
// - Spéculation et arbitrage
// - Imp

act des actions du joueur sur l'économie

class EconomyManager {
  constructor() {
    // Catégories d'items
    this.itemCategories = {
      weapons: { baseVolatility: 0.15, demandElasticity: 0.8 },
      armor: { baseVolatility: 0.12, demandElasticity: 0.7 },
      food: { baseVolatility: 0.25, demandElasticity: 1.5 },
      potions: { baseVolatility: 0.18, demandElasticity: 1.0 },
      materials: { baseVolatility: 0.20, demandElasticity: 1.2 },
      luxury: { baseVolatility: 0.30, demandElasticity: 0.5 },
      services: { baseVolatility: 0.10, demandElasticity: 0.9 }
    };

    // Prix de base (100 = valeur standard)
    this.basePrices = new Map();
    
    // Prix actuels par marché
    this.marketPrices = new Map(); // Map<marketId, Map<itemId, price>>
    
    // Stock par marché
    this.marketStocks = new Map(); // Map<marketId, Map<itemId, quantity>>
    
    // Demande par marché
    this.marketDemand = new Map(); // Map<marketId, Map<itemId, demand>>
    
    // Événements économiques actifs
    this.activeEconomicEvents = [];
    
    // Historique des prix
    this.priceHistory = new Map(); // Map<itemId, Array<{timestamp, price}>>
    
    // Marchés disponibles
    this.markets = new Map();
    
    // Configuration globale
    this.globalEconomy = {
      inflationRate: 1.0,      // 1.0 = stable, >1.0 = inflation, <1.0 = déflation
      prosperity: 50,          // 0-100
      tradeRoutesSecurity: 70, // 0-100
      taxation: 15             // %
    };
  }

  // ==========================================
  // CRÉER UN MARCHÉ
  // ==========================================
  createMarket(marketId, config = {}) {
    const market = {
      id: marketId,
      name: config.name || marketId,
      location: config.location || 'unknown',
      size: config.size || 'medium', // small/medium/large
      specialization: config.specialization || null, // weapons/food/luxury/etc.
      wealth: config.wealth || 50, // 0-100
      accessibility: config.accessibility || 70, // 0-100
      reputation: config.reputation || 50, // 0-100
      createdAt: Date.now()
    };

    this.markets.set(marketId, market);
    this.marketPrices.set(marketId, new Map());
    this.marketStocks.set(marketId, new Map());
    this.marketDemand.set(marketId, new Map());

    return market;
  }

  // ==========================================
  // DÉFINIR LE PRIX DE BASE
  // ==========================================
  setBasePrice(itemId, price, category = 'materials') {
    this.basePrices.set(itemId, {
      price: price,
      category: category,
      updatedAt: Date.now()
    });
  }

  // ==========================================
  // INITIALISER UN ITEM DANS UN MARCHÉ
  // ==========================================
  initializeMarketItem(marketId, itemId, quantity = 100, demand = 50) {
    const baseData = this.basePrices.get(itemId);
    if (!baseData) {
      console.warn(`[EconomyManager] Prix de base inconnu pour ${itemId}`);
      return false;
    }

    // Calculer le prix initial
    const initialPrice = this.calculateMarketPrice(marketId, itemId, quantity, demand);
    
    this.marketPrices.get(marketId).set(itemId, initialPrice);
    this.marketStocks.get(marketId).set(itemId, quantity);
    this.marketDemand.get(marketId).set(itemId, demand);

    // Initialiser l'historique
    if (!this.priceHistory.has(itemId)) {
      this.priceHistory.set(itemId, []);
    }
    this.priceHistory.get(itemId).push({
      timestamp: Date.now(),
      price: initialPrice,
      marketId
    });

    return true;
  }

  // ==========================================
  // CALCULER LE PRIX DE MARCHÉ
  // ==========================================
  calculateMarketPrice(marketId, itemId, stock, demand) {
    const baseData = this.basePrices.get(itemId);
    if (!baseData) return 100;

    const market = this.markets.get(marketId);
    const category = this.itemCategories[baseData.category] || this.itemCategories.materials;

    let price = baseData.price;

    // 1. Ajuster selon l'offre (stock)
    const stockFactor = 100 / Math.max(1, stock);
    price *= (1 + (stockFactor - 1) * 0.5); // 50% d'impact du stock

    // 2. Ajuster selon la demande
    const demandFactor = demand / 50; // 50 = demande normale
    price *= demandFactor;

    // 3. Ajuster selon la richesse du marché
    if (market) {
      const wealthFactor = market.wealth / 50;
      price *= (0.5 + wealthFactor * 0.5); // 50-150% selon richesse
    }

    // 4. Ajuster selon la spécialisation
    if (market && market.specialization === baseData.category) {
      price *= 0.85; // -15% si le marché est spécialisé
    }

    // 5. Inflation globale
    price *= this.globalEconomy.inflationRate;

    // 6. Événements économiques actifs
    this.activeEconomicEvents.forEach(event => {
      if (event.affectedCategories.includes(baseData.category)) {
        price *= event.priceMultiplier;
      }
    });

    // 7. Volatilité aléatoire
    const volatility = category.baseVolatility;
    const randomFactor = 1 + (Math.random() * 2 - 1) * volatility;
    price *= randomFactor;

    return Math.max(1, Math.floor(price));
  }

  // ==========================================
  // ACHETER UN ITEM
  // ==========================================
  buyItem(marketId, itemId, quantity = 1) {
    const currentStock = this.marketStocks.get(marketId)?.get(itemId) || 0;
    if (currentStock < quantity) {
      return {
        success: false,
        reason: 'insufficient_stock',
        availableStock: currentStock
      };
    }

    const currentPrice = this.marketPrices.get(marketId)?.get(itemId) || 100;
    const totalCost = currentPrice * quantity;

    // Diminuer le stock
    this.marketStocks.get(marketId).set(itemId, currentStock - quantity);

    // Augmenter la demande
    const currentDemand = this.marketDemand.get(marketId)?.get(itemId) || 50;
    this.marketDemand.get(marketId).set(itemId, Math.min(100, currentDemand + quantity * 2));

    // Recalculer le prix
    this.updateMarketPrice(marketId, itemId);

    return {
      success: true,
      unitPrice: currentPrice,
      totalCost: totalCost,
      quantity: quantity,
      newStock: currentStock - quantity
    };
  }

  // ==========================================
  // VENDRE UN ITEM
  // ==========================================
  sellItem(marketId, itemId, quantity = 1) {
    const currentPrice = this.marketPrices.get(marketId)?.get(itemId) || 100;
    
    // Prix de rachat (70% du prix de vente)
    const buybackPrice = Math.floor(currentPrice * 0.7);
    const totalEarnings = buybackPrice * quantity;

    // Augmenter le stock
    const currentStock = this.marketStocks.get(marketId)?.get(itemId) || 0;
    this.marketStocks.get(marketId).set(itemId, currentStock + quantity);

    // Diminuer légèrement la demande
    const currentDemand = this.marketDemand.get(marketId)?.get(itemId) || 50;
    this.marketDemand.get(marketId).set(itemId, Math.max(0, currentDemand - quantity));

    // Recalculer le prix
    this.updateMarketPrice(marketId, itemId);

    return {
      success: true,
      unitPrice: buybackPrice,
      totalEarnings: totalEarnings,
      quantity: quantity,
      newStock: currentStock + quantity
    };
  }

  // ==========================================
  // METTRE À JOUR LE PRIX D'UN MARCHÉ
  // ==========================================
  updateMarketPrice(marketId, itemId) {
    const stock = this.marketStocks.get(marketId)?.get(itemId) || 100;
    const demand = this.marketDemand.get(marketId)?.get(itemId) || 50;
    
    const newPrice = this.calculateMarketPrice(marketId, itemId, stock, demand);
    this.marketPrices.get(marketId).set(itemId, newPrice);

    // Enregistrer dans l'historique
    if (!this.priceHistory.has(itemId)) {
      this.priceHistory.set(itemId, []);
    }
    
    const history = this.priceHistory.get(itemId);
    history.push({
      timestamp: Date.now(),
      price: newPrice,
      marketId
    });

    // Garder seulement les 100 dernières entrées
    if (history.length > 100) {
      history.shift();
    }
  }

  // ==========================================
  // METTRE À JOUR TOUS LES PRIX
  // ==========================================
  updateAllPrices() {
    this.marketPrices.forEach((itemPrices, marketId) => {
      itemPrices.forEach((price, itemId) => {
        this.updateMarketPrice(marketId, itemId);
      });
    });

    // Décroissance naturelle de la demande
    this.marketDemand.forEach((itemDemands, marketId) => {
      itemDemands.forEach((demand, itemId) => {
        const newDemand = Math.max(30, demand * 0.95); // Retour vers demande normale
        itemDemands.set(itemId, newDemand);
      });
    });

    // Réapprovisionnement naturel
    this.marketStocks.forEach((itemStocks, marketId) => {
      itemStocks.forEach((stock, itemId) => {
        const newStock = Math.min(200, stock + 5); // +5 par tick
        itemStocks.set(itemId, newStock);
      });
    });
  }

  // ==========================================
  // CRÉER UN ÉVÉNEMENT ÉCONOMIQUE
  // ==========================================
  createEconomicEvent(type, config = {}) {
    const events = {
      shortage: {
        name: 'Pénurie',
        description: 'Une pénurie affecte certaines ressources',
        priceMultiplier: 2.5,
        affectedCategories: config.categories || ['food', 'materials'],
        duration: config.duration || 48 // heures in-game
      },
      abundance: {
        name: 'Abondance',
        description: 'Une récolte exceptionnelle fait baisser les prix',
        priceMultiplier: 0.5,
        affectedCategories: config.categories || ['food'],
        duration: config.duration || 24
      },
      war: {
        name: 'Guerre',
        description: 'Un conflit fait flamber les prix des armes',
        priceMultiplier: 3.0,
        affectedCategories: ['weapons', 'armor', 'potions'],
        duration: config.duration || 72
      },
      peace: {
        name: 'Paix',
        description: 'La paix fait chuter les prix militaires',
        priceMultiplier: 0.6,
        affectedCategories: ['weapons', 'armor'],
        duration: config.duration || 96
      },
      festival: {
        name: 'Festival',
        description: 'Un festival stimule le commerce de luxe',
        priceMultiplier: 1.5,
        affectedCategories: ['luxury', 'food'],
        duration: config.duration || 48
      },
      plague: {
        name: 'Épidémie',
        description: 'Une épidémie fait monter les prix des soins',
        priceMultiplier: 4.0,
        affectedCategories: ['potions', 'services'],
        duration: config.duration || 96
      }
    };

    const eventData = events[type];
    if (!eventData) return null;

    const event = {
      ...eventData,
      type,
      startTime: Date.now(),
      active: true
    };

    this.activeEconomicEvents.push(event);

    return event;
  }

  // ==========================================
  // METTRE À JOUR LES ÉVÉNEMENTS
  // ==========================================
  updateEconomicEvents(gameTime) {
    this.activeEconomicEvents = this.activeEconomicEvents.filter(event => {
      const elapsed = (Date.now() - event.startTime) / 1000 / 60; // minutes réelles
      return elapsed < event.duration;
    });
  }

  // ==========================================
  // OBTENIR LE MEILLEUR MARCHÉ
  // ==========================================
  findBestMarketToBuy(itemId) {
    let bestPrice = Infinity;
    let bestMarket = null;

    this.marketPrices.forEach((itemPrices, marketId) => {
      const price = itemPrices.get(itemId);
      const stock = this.marketStocks.get(marketId)?.get(itemId) || 0;
      
      if (price && stock > 0 && price < bestPrice) {
        bestPrice = price;
        bestMarket = marketId;
      }
    });

    return { marketId: bestMarket, price: bestPrice };
  }

  findBestMarketToSell(itemId) {
    let bestPrice = 0;
    let bestMarket = null;

    this.marketPrices.forEach((itemPrices, marketId) => {
      const price = itemPrices.get(itemId);
      
      if (price && price > bestPrice) {
        bestPrice = Math.floor(price * 0.7); // Prix de rachat
        bestMarket = marketId;
      }
    });

    return { marketId: bestMarket, price: bestPrice };
  }

  // ==========================================
  // CALCULER L'OPPORTUNITÉ D'ARBITRAGE
  // ==========================================
  findArbitrageOpportunities(itemId) {
    const opportunities = [];
    const markets = Array.from(this.marketPrices.keys());

    for (let i = 0; i < markets.length; i++) {
      for (let j = i + 1; j < markets.length; j++) {
        const market1 = markets[i];
        const market2 = markets[j];

        const price1 = this.marketPrices.get(market1)?.get(itemId) || 0;
        const price2 = this.marketPrices.get(market2)?.get(itemId) || 0;

        const stock1 = this.marketStocks.get(market1)?.get(itemId) || 0;
        const stock2 = this.marketStocks.get(market2)?.get(itemId) || 0;

        // Acheter au marché 1, vendre au marché 2
        if (price1 > 0 && price2 > price1 * 1.3 && stock1 > 0) {
          const profit = Math.floor(price2 * 0.7) - price1;
          opportunities.push({
            buyFrom: market1,
            sellTo: market2,
            buyPrice: price1,
            sellPrice: Math.floor(price2 * 0.7),
            profit: profit,
            profitPercent: (profit / price1 * 100).toFixed(1)
          });
        }

        // Acheter au marché 2, vendre au marché 1
        if (price2 > 0 && price1 > price2 * 1.3 && stock2 > 0) {
          const profit = Math.floor(price1 * 0.7) - price2;
          opportunities.push({
            buyFrom: market2,
            sellTo: market1,
            buyPrice: price2,
            sellPrice: Math.floor(price1 * 0.7),
            profit: profit,
            profitPercent: (profit / price2 * 100).toFixed(1)
          });
        }
      }
    }

    return opportunities.sort((a, b) => b.profit - a.profit);
  }

  // ==========================================
  // OBTENIR L'HISTORIQUE DES PRIX
  // ==========================================
  getPriceHistory(itemId, limit = 20) {
    const history = this.priceHistory.get(itemId) || [];
    return history.slice(-limit);
  }

  // ==========================================
  // OBTENIR LA TENDANCE
  // ==========================================
  getPriceTrend(itemId) {
    const history = this.getPriceHistory(itemId, 10);
    if (history.length < 2) return 'stable';

    const oldPrice = history[0].price;
    const newPrice = history[history.length - 1].price;
    const change = (newPrice - oldPrice) / oldPrice;

    if (change > 0.1) return 'rising';
    if (change < -0.1) return 'falling';
    return 'stable';
  }

  // ==========================================
  // STATISTIQUES
  // ==========================================
  getEconomyReport() {
    const report = {
      globalEconomy: this.globalEconomy,
      marketsCount: this.markets.size,
      itemsTracked: this.basePrices.size,
      activeEvents: this.activeEconomicEvents.map(e => ({
        name: e.name,
        description: e.description,
        affectedCategories: e.affectedCategories
      })),
      priceRanges: {}
    };

    // Calculer les fourchettes de prix par catégorie
    Object.keys(this.itemCategories).forEach(category => {
      const prices = [];
      this.basePrices.forEach((data, itemId) => {
        if (data.category === category) {
          this.marketPrices.forEach(itemPrices => {
            const price = itemPrices.get(itemId);
            if (price) prices.push(price);
          });
        }
      });

      if (prices.length > 0) {
        report.priceRanges[category] = {
          min: Math.min(...prices),
          max: Math.max(...prices),
          avg: Math.floor(prices.reduce((a, b) => a + b, 0) / prices.length)
        };
      }
    });

    return report;
  }

  // ==========================================
  // RÉINITIALISATION
  // ==========================================
  reset() {
    this.basePrices.clear();
    this.marketPrices.clear();
    this.marketStocks.clear();
    this.marketDemand.clear();
    this.activeEconomicEvents = [];
    this.priceHistory.clear();
    this.markets.clear();
  }
}

export default EconomyManager;
