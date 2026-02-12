// ============================================================
// SYSTÈME ÉCONOMIQUE DYNAMIQUE
// Prix variables selon offre/demande, commerce inter-cités
// ============================================================

export interface Market {
  city_id: string;
  city_name: string;
  prosperity_level: 1 | 2 | 3 | 4 | 5; // 1=Pauvre, 5=Prospère
  specialties: string[]; // Produits locaux (prix réduits)
  imports_needed: string[]; // Produits rares (prix majorés)
  current_events: MarketEvent[];
}

export interface MarketEvent {
  id: string;
  name: string;
  description: string;
  duration_days: number;
  price_modifiers: Array<{
    item_category: string;
    multiplier: number; // 0.5 = -50%, 2.0 = +100%
    reason: string;
  }>;
  availability_changes?: Array<{
    item_id: string;
    stock_multiplier: number;
  }>;
}

export interface TradingRoute {
  id: string;
  from_city: string;
  to_city: string;
  distance_km: number;
  travel_time_days: number;
  danger_level: 'safe' | 'risky' | 'dangerous' | 'deadly';
  profit_margin_base: number; // %
  random_events: Array<{
    event: string;
    probability: number;
    effect: string;
  }>;
}

// ============================================================
// MARCHÉS DES CITÉS PRINCIPALES
// ============================================================

export const MARKETS: Market[] = [
  {
    city_id: 'aethelmere',
    city_name: 'Aethelmere (Capitale)',
    prosperity_level: 5,
    specialties: [
      'Livres et Parchemins (Académies)',
      'Articles Nobles (Orfèvrerie, Soieries)',
      'Potions de Qualité',
      'Armes d\'Apparat'
    ],
    imports_needed: [
      'Minerais Rares (Mithril, Adamantine)',
      'Peaux Exotiques (Dragons, Griffons)',
      'Épices des Îles Lointaines'
    ],
    current_events: [
      {
        id: 'event_aethel_festival',
        name: 'Festival du Soleil Levant',
        description: 'Célébration annuelle attirant marchands de tout Aethelgard. Marché bouillonne d\'activité.',
        duration_days: 7,
        price_modifiers: [
          { item_category: 'food', multiplier: 1.5, reason: 'Demande festive accrue' },
          { item_category: 'alcohol', multiplier: 2.0, reason: 'Banquets royaux' },
          { item_category: 'luxe', multiplier: 0.8, reason: 'Afflux marchands concurrence' }
        ],
        availability_changes: [
          { item_id: 'exotic_spices', stock_multiplier: 3.0 },
          { item_id: 'rare_gems', stock_multiplier: 2.0 }
        ]
      }
    ]
  },

  {
    city_id: 'port_azure',
    city_name: 'Port-Azure',
    prosperity_level: 4,
    specialties: [
      'Poissons et Fruits de Mer',
      'Équipement Maritime (Cordes, Voiles)',
      'Rhum et Alcools Forts',
      'Artefacts Submergés (Épaves)'
    ],
    imports_needed: [
      'Bois de Construction (Forêts Intérieures)',
      'Métaux (Pas de mines locales)',
      'Grains et Céréales'
    ],
    current_events: [
      {
        id: 'event_port_blockade',
        name: 'Blocus Pirate',
        description: 'Pirates de la Côte des Tempêtes bloquent port. Commerce paralysé, prix flambent.',
        duration_days: 14,
        price_modifiers: [
          { item_category: 'imports', multiplier: 3.0, reason: 'Pénurie ravitaillement' },
          { item_category: 'weapons', multiplier: 1.8, reason: 'Demande défense' },
          { item_category: 'seafood', multiplier: 0.6, reason: 'Pêcheurs bloqués, surplus' }
        ],
        availability_changes: [
          { item_id: 'exotic_goods', stock_multiplier: 0.2 },
          { item_id: 'gunpowder', stock_multiplier: 0.0 }
        ]
      }
    ]
  },

  {
    city_id: 'ironhold',
    city_name: 'Bastion-de-Fer',
    prosperity_level: 3,
    specialties: [
      'Armes et Armures (Forge Légendaire)',
      'Minerais (Fer, Acier, Mithril)',
      'Fourrures Nordiques',
      'Hydromel et Bière'
    ],
    imports_needed: [
      'Fruits et Légumes (Climat Rude)',
      'Tissus Fins (Production Locale Limitée)',
      'Herbes Médicinales'
    ],
    current_events: [
      {
        id: 'event_iron_dragon',
        name: 'Raid de Dragon',
        description: 'Dragon Blanc attaque mines, tue mineurs. Production métaux paralysée.',
        duration_days: 30,
        price_modifiers: [
          { item_category: 'metals', multiplier: 2.5, reason: 'Mines fermées' },
          { item_category: 'armor', multiplier: 2.0, reason: 'Matériaux rares' },
          { item_category: 'furs', multiplier: 0.7, reason: 'Chasseurs fuient dragon' }
        ],
        availability_changes: [
          { item_id: 'steel_ingot', stock_multiplier: 0.3 },
          { item_id: 'mithril_ingot', stock_multiplier: 0.0 }
        ]
      }
    ]
  },

  {
    city_id: 'sylvanor',
    city_name: 'Sylvanor (Cité Elfique)',
    prosperity_level: 4,
    specialties: [
      'Arcs et Flèches Elfiques',
      'Herbes Rares (Forêt Ancienne)',
      'Bijoux de Bois Vivant',
      'Vins Millénaires'
    ],
    imports_needed: [
      'Métaux Travaillés (Elfes peu forgerons)',
      'Livres de Magie Humaine',
      'Viandes Rouges (Elfes végétariens)'
    ],
    current_events: [
      {
        id: 'event_sylvan_bloom',
        name: 'Floraison Millénaire',
        description: 'Arbre-Monde fleurit (1x/1000 ans). Plantes magiques poussent partout. Ruée alchimistes.',
        duration_days: 60,
        price_modifiers: [
          { item_category: 'herbs', multiplier: 0.4, reason: 'Surabondance' },
          { item_category: 'potions', multiplier: 0.6, reason: 'Composants abondants' },
          { item_category: 'accommodation', multiplier: 3.0, reason: 'Afflux visiteurs' }
        ],
        availability_changes: [
          { item_id: 'rare_herbs', stock_multiplier: 10.0 },
          { item_id: 'legendary_herbs', stock_multiplier: 2.0 }
        ]
      }
    ]
  }
];

// ============================================================
// ROUTES COMMERCIALES
// ============================================================

export const TRADE_ROUTES: TradingRoute[] = [
  {
    id: 'route_aethel_port',
    from_city: 'aethelmere',
    to_city: 'port_azure',
    distance_km: 250,
    travel_time_days: 5,
    danger_level: 'safe',
    profit_margin_base: 15,
    random_events: [
      { event: 'Bandits sur Route', probability: 0.1, effect: 'Combat CR 4-6, perte 30% cargaison si défaite' },
      { event: 'Rencontre Caravane Alliée', probability: 0.15, effect: 'Partage infos prix, +5% profit' },
      { event: 'Météo Favorable', probability: 0.2, effect: 'Arrivée 1 jour avance, +10% profit' }
    ]
  },

  {
    id: 'route_port_iron',
    from_city: 'port_azure',
    to_city: 'ironhold',
    distance_km: 800,
    travel_time_days: 20,
    danger_level: 'dangerous',
    profit_margin_base: 45,
    random_events: [
      { event: 'Tempête de Neige', probability: 0.3, effect: 'Retard 3 jours, JdS Con DD 15 ou épuisement' },
      { event: 'Orcs des Montagnes', probability: 0.25, effect: 'Combat CR 8-10, butin possible si victoire' },
      { event: 'Rencontre Clan Nordique', probability: 0.15, effect: 'Échange culturel, +10 réputation Nordiques' },
      { event: 'Yéti Affamé', probability: 0.1, effect: 'Combat CR 9, viande vaut 500 PO' }
    ]
  },

  {
    id: 'route_iron_sylvan',
    from_city: 'ironhold',
    to_city: 'sylvanor',
    distance_km: 600,
    travel_time_days: 15,
    danger_level: 'risky',
    profit_margin_base: 35,
    random_events: [
      { event: 'Loups-Garous', probability: 0.2, effect: 'Combat CR 7-9, pelage vaut 300 PO/loup' },
      { event: 'Druides Méfiants', probability: 0.15, effect: 'Persuasion DD 18 ou taxation 20% cargaison' },
      { event: 'Sentier Féérique Secret', probability: 0.1, effect: 'Raccourci mystique, arrivée 5 jours avance' },
      { event: 'Rencontre Licorne', probability: 0.05, effect: 'Bénédiction (+2 chance 1 semaine)' }
    ]
  },

  {
    id: 'route_aethel_sylvan',
    from_city: 'aethelmere',
    to_city: 'sylvanor',
    distance_km: 400,
    travel_time_days: 10,
    danger_level: 'safe',
    profit_margin_base: 20,
    random_events: [
      { event: 'Trolls de Pont', probability: 0.15, effect: 'Péage 100 PO ou combat CR 6' },
      { event: 'Marchands Concurrents', probability: 0.2, effect: 'Guerre prix, -10% profit' },
      { event: 'Escorte Royale', probability: 0.1, effect: 'Route sécurisée, +15% prix vente' }
    ]
  }
];

// ============================================================
// SYSTÈME DE PRIX DYNAMIQUES
// ============================================================

export class EconomyManager {
  private markets: Map<string, Market> = new Map();
  private basePrices: Map<string, number> = new Map();

  constructor() {
    MARKETS.forEach(m => this.markets.set(m.city_id, m));
  }

  /**
   * Calcule prix d'un item dans une ville donnée
   */
  calculatePrice(itemId: string, cityId: string, isBuying: boolean): number {
    const basePrice = this.basePrices.get(itemId) || 100;
    const market = this.markets.get(cityId);
    if (!market) return basePrice;

    let finalPrice = basePrice;

    // Multiplicateur prospérité (ville riche = prix hauts)
    finalPrice *= 0.7 + (market.prosperity_level * 0.15);

    // Spécialités locales (production locale = -30%)
    const itemCategory = this.getItemCategory(itemId);
    if (market.specialties.some(s => s.includes(itemCategory))) {
      finalPrice *= 0.7;
    }

    // Imports nécessaires (rareté = +50%)
    if (market.imports_needed.some(i => i.includes(itemCategory))) {
      finalPrice *= 1.5;
    }

    // Événements de marché
    market.current_events.forEach(event => {
      const modifier = event.price_modifiers.find(m => m.item_category === itemCategory);
      if (modifier) {
        finalPrice *= modifier.multiplier;
      }
    });

    // Différence achat/vente (marchands prennent marge)
    if (isBuying) {
      finalPrice *= 1.2; // +20% prix achat joueur
    } else {
      finalPrice *= 0.6; // -40% prix vente joueur
    }

    return Math.round(finalPrice);
  }

  /**
   * Simule commerce entre 2 villes (retourne profit)
   */
  simulateTradeRun(fromCityId: string, toCityId: string, itemId: string, quantity: number): {
    investment: number;
    selling_price: number;
    base_profit: number;
    travel_time_days: number;
    danger_level: string;
    random_events: string[];
  } {
    const route = TRADE_ROUTES.find(r => r.from_city === fromCityId && r.to_city === toCityId);
    if (!route) {
      throw new Error('Route commerciale inexistante');
    }

    const buyPrice = this.calculatePrice(itemId, fromCityId, true);
    const sellPrice = this.calculatePrice(itemId, toCityId, false);

    const investment = buyPrice * quantity;
    const revenue = sellPrice * quantity;
    const baseProfit = revenue - investment;

    // Événements aléatoires
    const triggeredEvents: string[] = [];
    route.random_events.forEach(re => {
      if (Math.random() < re.probability) {
        triggeredEvents.push(re.event);
      }
    });

    return {
      investment,
      selling_price: revenue,
      base_profit: baseProfit,
      travel_time_days: route.travel_time_days,
      danger_level: route.danger_level,
      random_events: triggeredEvents
    };
  }

  /**
   * Mise à jour quotidienne (événements, prix)
   */
  dailyUpdate(): void {
    this.markets.forEach(market => {
      // Réduire durée événements
      market.current_events = market.current_events.filter(event => {
        event.duration_days -= 1;
        return event.duration_days > 0;
      });

      // Générer nouveaux événements (10% chance/jour)
      if (Math.random() < 0.1) {
        market.current_events.push(this.generateRandomEvent(market.city_id));
      }
    });
  }

  private generateRandomEvent(cityId: string): MarketEvent {
    const eventPool = [
      {
        name: 'Arrivée Convoi Marchand',
        desc: 'Grande caravane arrive, surplus marchandises',
        duration: 3,
        modifiers: [{ item_category: 'general_goods', multiplier: 0.8, reason: 'Surplus temporaire' }]
      },
      {
        name: 'Vol dans Entrepôts',
        desc: 'Guilde des Voleurs a frappé, pénurie',
        duration: 7,
        modifiers: [{ item_category: 'valuables', multiplier: 1.5, reason: 'Stock volé' }]
      },
      {
        name: 'Bénédiction de Récolte',
        desc: 'Prêtres bénissent fermes, récolte abondante',
        duration: 14,
        modifiers: [{ item_category: 'food', multiplier: 0.6, reason: 'Récolte exceptionnelle' }]
      }
    ];

    const template = eventPool[Math.floor(Math.random() * eventPool.length)];
    return {
      id: `event_${cityId}_${Date.now()}`,
      name: template.name,
      description: template.desc,
      duration_days: template.duration,
      price_modifiers: template.modifiers
    };
  }

  private getItemCategory(itemId: string): string {
    // Mapping items → catégories (simplifié)
    const categoryMap: Record<string, string> = {
      sword: 'weapons',
      potion: 'potions',
      bread: 'food',
      iron_ingot: 'metals'
    };
    return categoryMap[itemId] || 'general_goods';
  }
}

export const globalEconomy = new EconomyManager();
