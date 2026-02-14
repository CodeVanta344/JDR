/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                       🌍 WORLD SIMULATION v4.0                           ║
 * ║                    Living, Breathing World System                        ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * MISSION: Créer un monde vivant où les PNJ ont des routines quotidiennes,
 *          les villes évoluent, l'économie fluctue et le temps passe de
 *          manière réaliste. Le monde continue de vivre même sans le joueur.
 * 
 * CAPACITÉS:
 * - Routines quotidiennes des PNJ (travail, sommeil, loisirs)
 * - Vieillissement et cycle de vie
 * - Économie globale dynamique
 * - Événements météorologiques et saisonniers
 * - Évolution des villes et constructions
 * - Simulation continue en arrière-plan
 */

export class WorldSimulation {
  constructor(config = {}) {
    this.config = {
      enabled: config.enabled ?? true,
      simulationSpeed: config.simulationSpeed ?? 1.0, // Multiplicateur de temps
      tickInterval: config.tickInterval ?? 5000, // Tick toutes les 5 secondes
      enableAging: config.enableAging ?? true,
      enableWeather: config.enableWeather ?? true,
      enableEconomy: config.enableEconomy ?? true,
      enableCityGrowth: config.enableCityGrowth ?? true,
      maxNPCsSimulated: config.maxNPCsSimulated ?? 500,
      yearLength: config.yearLength ?? 360, // Jours par an
      dayLength: config.dayLength ?? 24, // Heures par jour
      ...config
    };

    // État du monde
    this.worldState = {
      currentTime: {
        year: 1524, // An de l'Ombre (Aethelgard)
        day: 1,
        hour: 6,
        minute: 0,
        season: 'spring' // spring, summer, autumn, winter
      },
      weather: {
        current: 'clear',
        temperature: 15,
        windSpeed: 5,
        precipitation: 0
      },
      globalEconomy: {
        inflation: 1.0,
        gdp: 10000,
        employment: 0.85,
        wealth: 'stable' // poor, stable, prosperous
      }
    };

    // Entités du monde
    this.npcs = new Map(); // npcId → NPC
    this.cities = new Map(); // cityId → City
    this.events = []; // Événements mondiaux
    this.routines = new Map(); // npcId → Routine

    // Simulation
    this.isRunning = false;
    this.tickCount = 0;
    this.lastTickTime = Date.now();
    this.simulationInterval = null;

    // Statistiques
    this.stats = {
      totalTicks: 0,
      npcsSimulated: 0,
      citiesSimulated: 0,
      eventsGenerated: 0,
      avgTickTime: 0
    };

    console.log('[World Simulation] 🌍 Initialized - Living world ready');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 1: TIME & CALENDAR SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Démarre la simulation du monde
   */
  startSimulation() {
    if (this.isRunning) {
      console.warn('[World Simulation] Already running');
      return;
    }

    this.isRunning = true;
    this.lastTickTime = Date.now();

    this.simulationInterval = setInterval(() => {
      this._tick();
    }, this.config.tickInterval);

    console.log('[World Simulation] ▶️ Simulation started');
  }

  /**
   * Arrête la simulation
   */
  stopSimulation() {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }

    console.log('[World Simulation] ⏸️ Simulation stopped');
  }

  /**
   * Tick de simulation (appelé à intervalles réguliers)
   */
  _tick() {
    const startTime = performance.now();

    // Avancement du temps
    this._advanceTime();

    // Simulation des PNJ
    if (this.config.enabled) {
      this._simulateNPCs();
      this._simulateCities();
      this._updateWeather();
      this._updateGlobalEconomy();
      this._generateWorldEvents();
    }

    // Statistiques
    const duration = performance.now() - startTime;
    this.stats.totalTicks++;
    this.stats.avgTickTime = 
      (this.stats.avgTickTime * (this.stats.totalTicks - 1) + duration) / 
      this.stats.totalTicks;

    this.tickCount++;
    this.lastTickTime = Date.now();
  }

  /**
   * Avance le temps du monde
   */
  _advanceTime() {
    const time = this.worldState.currentTime;

    // 1 tick = 5 minutes de temps de jeu (par défaut)
    const minutesPerTick = 5 * this.config.simulationSpeed;

    time.minute += minutesPerTick;

    // Gestion des débordements
    if (time.minute >= 60) {
      time.hour += Math.floor(time.minute / 60);
      time.minute = time.minute % 60;
    }

    if (time.hour >= this.config.dayLength) {
      time.day += Math.floor(time.hour / this.config.dayLength);
      time.hour = time.hour % this.config.dayLength;

      // Événement: nouveau jour
      this._onNewDay();
    }

    if (time.day > this.config.yearLength) {
      time.year += Math.floor(time.day / this.config.yearLength);
      time.day = time.day % this.config.yearLength;

      // Événement: nouvelle année
      this._onNewYear();
    }

    // Mise à jour de la saison
    this._updateSeason();
  }

  /**
   * Met à jour la saison actuelle
   */
  _updateSeason() {
    const time = this.worldState.currentTime;
    const dayOfYear = time.day;
    const quarterLength = this.config.yearLength / 4;

    if (dayOfYear < quarterLength) {
      time.season = 'spring';
    } else if (dayOfYear < quarterLength * 2) {
      time.season = 'summer';
    } else if (dayOfYear < quarterLength * 3) {
      time.season = 'autumn';
    } else {
      time.season = 'winter';
    }
  }

  /**
   * Événement: nouveau jour
   */
  _onNewDay() {
    console.log(`[World Simulation] 🌅 New day: Year ${this.worldState.currentTime.year}, Day ${this.worldState.currentTime.day}`);

    // Réinitialisation des routines quotidiennes
    this.npcs.forEach(npc => {
      npc.dailyRoutineCompleted = false;
    });

    // Événements quotidiens
    if (Math.random() < 0.1) { // 10% de chance d'événement quotidien
      this._generateWorldEvent('daily');
    }
  }

  /**
   * Événement: nouvelle année
   */
  _onNewYear() {
    console.log(`[World Simulation] 🎆 New year: ${this.worldState.currentTime.year}`);

    // Vieillissement des PNJ
    if (this.config.enableAging) {
      this.npcs.forEach(npc => {
        this._ageNPC(npc);
      });
    }

    // Croissance des villes
    if (this.config.enableCityGrowth) {
      this.cities.forEach(city => {
        this._growCity(city);
      });
    }

    // Événement annuel majeur
    this._generateWorldEvent('annual');
  }

  /**
   * Obtient l'heure actuelle formatée
   */
  getFormattedTime() {
    const t = this.worldState.currentTime;
    return `${String(t.hour).padStart(2, '0')}:${String(t.minute).padStart(2, '0')}`;
  }

  /**
   * Obtient la période de la journée
   */
  getTimeOfDay() {
    const hour = this.worldState.currentTime.hour;
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2: NPC ROUTINES & BEHAVIOR
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Ajoute un PNJ à la simulation
   */
  addNPC(npcData) {
    const npc = {
      id: npcData.id,
      name: npcData.name,
      age: npcData.age || 25,
      occupation: npcData.occupation || 'citizen',
      home: npcData.home || 'city_center',
      work: npcData.work || npcData.home,
      currentLocation: npcData.home,
      currentActivity: 'sleeping',
      health: 100,
      energy: 100,
      mood: 'neutral',
      relationships: new Map(),
      schedule: this._generateSchedule(npcData.occupation),
      inventory: [],
      gold: npcData.gold || 100,
      isAlive: true,
      lastUpdate: Date.now()
    };

    this.npcs.set(npc.id, npc);
    this.stats.npcsSimulated++;

    console.log(`[World Simulation] 👤 Added NPC: ${npc.name} (${npc.occupation})`);
    return npc;
  }

  /**
   * Génère un emploi du temps pour un PNJ
   */
  _generateSchedule(occupation) {
    const schedules = {
      merchant: [
        { start: 6, end: 7, activity: 'waking_up', location: 'home' },
        { start: 7, end: 8, activity: 'breakfast', location: 'home' },
        { start: 8, end: 12, activity: 'working', location: 'market' },
        { start: 12, end: 13, activity: 'lunch', location: 'tavern' },
        { start: 13, end: 18, activity: 'working', location: 'market' },
        { start: 18, end: 19, activity: 'dinner', location: 'home' },
        { start: 19, end: 21, activity: 'socializing', location: 'tavern' },
        { start: 21, end: 6, activity: 'sleeping', location: 'home' }
      ],
      guard: [
        { start: 6, end: 7, activity: 'waking_up', location: 'barracks' },
        { start: 7, end: 8, activity: 'training', location: 'training_grounds' },
        { start: 8, end: 12, activity: 'patrolling', location: 'city_walls' },
        { start: 12, end: 13, activity: 'lunch', location: 'barracks' },
        { start: 13, end: 20, activity: 'patrolling', location: 'city_gates' },
        { start: 20, end: 21, activity: 'dinner', location: 'barracks' },
        { start: 21, end: 6, activity: 'sleeping', location: 'barracks' }
      ],
      farmer: [
        { start: 5, end: 6, activity: 'waking_up', location: 'farm' },
        { start: 6, end: 12, activity: 'farming', location: 'fields' },
        { start: 12, end: 13, activity: 'lunch', location: 'farm' },
        { start: 13, end: 18, activity: 'farming', location: 'fields' },
        { start: 18, end: 19, activity: 'dinner', location: 'farm' },
        { start: 19, end: 21, activity: 'relaxing', location: 'farm' },
        { start: 21, end: 5, activity: 'sleeping', location: 'farm' }
      ],
      blacksmith: [
        { start: 6, end: 7, activity: 'waking_up', location: 'home' },
        { start: 7, end: 8, activity: 'breakfast', location: 'home' },
        { start: 8, end: 12, activity: 'smithing', location: 'forge' },
        { start: 12, end: 13, activity: 'lunch', location: 'tavern' },
        { start: 13, end: 18, activity: 'smithing', location: 'forge' },
        { start: 18, end: 19, activity: 'dinner', location: 'home' },
        { start: 19, end: 22, activity: 'relaxing', location: 'home' },
        { start: 22, end: 6, activity: 'sleeping', location: 'home' }
      ],
      citizen: [
        { start: 7, end: 8, activity: 'waking_up', location: 'home' },
        { start: 8, end: 9, activity: 'breakfast', location: 'home' },
        { start: 9, end: 12, activity: 'wandering', location: 'city_center' },
        { start: 12, end: 13, activity: 'lunch', location: 'home' },
        { start: 13, end: 17, activity: 'shopping', location: 'market' },
        { start: 17, end: 19, activity: 'socializing', location: 'tavern' },
        { start: 19, end: 20, activity: 'dinner', location: 'home' },
        { start: 20, end: 7, activity: 'sleeping', location: 'home' }
      ]
    };

    return schedules[occupation] || schedules.citizen;
  }

  /**
   * Simule tous les PNJ
   */
  _simulateNPCs() {
    let count = 0;
    const currentHour = this.worldState.currentTime.hour;

    this.npcs.forEach(npc => {
      if (!npc.isAlive || count >= this.config.maxNPCsSimulated) return;

      // Trouve l'activité actuelle selon l'emploi du temps
      const currentSlot = npc.schedule.find(slot => 
        currentHour >= slot.start && 
        (currentHour < slot.end || (slot.end < slot.start && (currentHour >= slot.start || currentHour < slot.end)))
      );

      if (currentSlot) {
        npc.currentActivity = currentSlot.activity;
        npc.currentLocation = currentSlot.location;

        // Mise à jour de l'énergie et de l'humeur
        this._updateNPCState(npc, currentSlot.activity);
      }

      count++;
    });
  }

  /**
   * Met à jour l'état d'un PNJ
   */
  _updateNPCState(npc, activity) {
    switch (activity) {
      case 'sleeping':
        npc.energy = Math.min(100, npc.energy + 5);
        break;
      case 'working':
      case 'farming':
      case 'smithing':
      case 'patrolling':
        npc.energy = Math.max(0, npc.energy - 2);
        npc.gold += 5; // Gagne de l'argent en travaillant
        break;
      case 'eating':
      case 'breakfast':
      case 'lunch':
      case 'dinner':
        npc.energy = Math.min(100, npc.energy + 10);
        npc.gold -= 2; // Dépense pour nourriture
        break;
      case 'socializing':
        npc.mood = 'happy';
        npc.energy = Math.max(0, npc.energy - 1);
        break;
      case 'relaxing':
        npc.energy = Math.min(100, npc.energy + 3);
        npc.mood = 'content';
        break;
    }

    // Ajustement de l'humeur basé sur l'énergie
    if (npc.energy < 20) {
      npc.mood = 'exhausted';
    } else if (npc.energy < 40) {
      npc.mood = 'tired';
    }

    npc.lastUpdate = Date.now();
  }

  /**
   * Vieillit un PNJ
   */
  _ageNPC(npc) {
    npc.age++;

    // Effets du vieillissement
    if (npc.age > 60) {
      npc.health = Math.max(50, npc.health - 2);
    }

    if (npc.age > 80) {
      // Chance de décès naturel
      if (Math.random() < 0.1) {
        npc.isAlive = false;
        console.log(`[World Simulation] ⚰️ ${npc.name} died of old age at ${npc.age}`);
        this._onNPCDeath(npc);
      }
    }

    // Transition de carrière
    if (npc.age === 18) {
      // Devient adulte, peut changer de profession
      const professions = ['merchant', 'guard', 'farmer', 'blacksmith'];
      npc.occupation = professions[Math.floor(Math.random() * professions.length)];
      npc.schedule = this._generateSchedule(npc.occupation);
    }

    if (npc.age === 65) {
      // Retraite
      npc.occupation = 'retired';
      npc.schedule = this._generateSchedule('citizen');
    }
  }

  /**
   * Gère la mort d'un PNJ
   */
  _onNPCDeath(npc) {
    // Héritage
    const family = Array.from(npc.relationships.entries())
      .filter(([, rel]) => rel.type === 'family')
      .map(([id]) => this.npcs.get(id))
      .filter(n => n && n.isAlive);

    if (family.length > 0) {
      const heir = family[0];
      heir.gold += npc.gold;
      console.log(`[World Simulation] 💰 ${heir.name} inherited ${npc.gold} gold from ${npc.name}`);
    }

    // Génération d'événement
    this.events.push({
      type: 'npc_death',
      npcId: npc.id,
      npcName: npc.name,
      age: npc.age,
      timestamp: Date.now()
    });
  }

  /**
   * Obtient l'état d'un PNJ
   */
  getNPCState(npcId) {
    const npc = this.npcs.get(npcId);
    if (!npc) return null;

    return {
      name: npc.name,
      location: npc.currentLocation,
      activity: npc.currentActivity,
      mood: npc.mood,
      energy: npc.energy,
      health: npc.health,
      isAlive: npc.isAlive
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3: CITY & SETTLEMENT SIMULATION
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Ajoute une ville à la simulation
   */
  addCity(cityData) {
    const city = {
      id: cityData.id,
      name: cityData.name,
      population: cityData.population || 1000,
      wealth: cityData.wealth || 'stable',
      size: cityData.size || 'medium', // small, medium, large, capital
      buildings: cityData.buildings || {
        homes: 100,
        shops: 20,
        taverns: 5,
        temples: 2,
        barracks: 1
      },
      resources: {
        food: 1000,
        water: 1000,
        wood: 500,
        stone: 300,
        gold: 5000
      },
      economy: {
        employment: 0.85,
        avgIncome: 100,
        taxRate: 0.1,
        marketActivity: 0.7
      },
      events: [],
      lastUpdate: Date.now()
    };

    this.cities.set(city.id, city);
    this.stats.citiesSimulated++;

    console.log(`[World Simulation] 🏰 Added city: ${city.name} (pop: ${city.population})`);
    return city;
  }

  /**
   * Simule toutes les villes
   */
  _simulateCities() {
    this.cities.forEach(city => {
      // Consommation de ressources
      this._consumeCityResources(city);

      // Production de ressources
      this._produceCityResources(city);

      // Mise à jour économique
      this._updateCityEconomy(city);

      // Événements aléatoires
      if (Math.random() < 0.01) { // 1% par tick
        this._generateCityEvent(city);
      }

      city.lastUpdate = Date.now();
    });
  }

  /**
   * Consommation de ressources d'une ville
   */
  _consumeCityResources(city) {
    const consumptionRate = city.population / 1000;

    city.resources.food = Math.max(0, city.resources.food - consumptionRate * 10);
    city.resources.water = Math.max(0, city.resources.water - consumptionRate * 5);
    city.resources.wood = Math.max(0, city.resources.wood - consumptionRate * 2);

    // Pénurie = problèmes
    if (city.resources.food < 100) {
      city.wealth = 'poor';
      city.economy.employment -= 0.01;
    }
  }

  /**
   * Production de ressources d'une ville
   */
  _produceCityResources(city) {
    const productionMod = city.economy.employment;

    // Production basée sur les bâtiments
    const farmers = Math.floor(city.population * 0.3);
    city.resources.food += farmers * 0.5 * productionMod;

    const woodcutters = Math.floor(city.population * 0.1);
    city.resources.wood += woodcutters * 0.3 * productionMod;

    // Revenus fiscaux
    const taxes = city.population * city.economy.avgIncome * city.economy.taxRate;
    city.resources.gold += taxes * productionMod;
  }

  /**
   * Met à jour l'économie d'une ville
   */
  _updateCityEconomy(city) {
    // L'emploi affecte les revenus
    city.economy.avgIncome = 100 * city.economy.employment;

    // La richesse affecte l'activité du marché
    if (city.wealth === 'prosperous') {
      city.economy.marketActivity = 0.9;
    } else if (city.wealth === 'poor') {
      city.economy.marketActivity = 0.4;
    } else {
      city.economy.marketActivity = 0.7;
    }

    // Détermination de la richesse
    if (city.resources.gold > 10000 && city.resources.food > 2000) {
      city.wealth = 'prosperous';
    } else if (city.resources.gold < 2000 || city.resources.food < 500) {
      city.wealth = 'poor';
    } else {
      city.wealth = 'stable';
    }
  }

  /**
   * Fait grandir une ville
   */
  _growCity(city) {
    if (city.wealth === 'prosperous') {
      // Croissance démographique
      const growth = Math.floor(city.population * 0.05);
      city.population += growth;

      // Construction de nouveaux bâtiments
      if (Math.random() < 0.5) {
        const buildingType = ['homes', 'shops', 'taverns'][Math.floor(Math.random() * 3)];
        city.buildings[buildingType] = (city.buildings[buildingType] || 0) + 1;
        console.log(`[World Simulation] 🏗️ ${city.name} built a new ${buildingType}`);
      }

      // Évolution de taille
      if (city.population > 10000 && city.size === 'large') {
        city.size = 'capital';
      } else if (city.population > 5000 && city.size === 'medium') {
        city.size = 'large';
      } else if (city.population > 1000 && city.size === 'small') {
        city.size = 'medium';
      }
    } else if (city.wealth === 'poor') {
      // Déclin
      const decline = Math.floor(city.population * 0.02);
      city.population = Math.max(100, city.population - decline);
    }
  }

  /**
   * Génère un événement de ville
   */
  _generateCityEvent(city) {
    const eventTypes = [
      { type: 'festival', effect: () => { city.economy.marketActivity += 0.2; } },
      { type: 'plague', effect: () => { city.population -= Math.floor(city.population * 0.1); } },
      { type: 'fire', effect: () => { city.buildings.homes -= 5; city.resources.gold -= 500; } },
      { type: 'trade_caravan', effect: () => { city.resources.gold += 1000; } },
      { type: 'bandits', effect: () => { city.resources.gold -= 300; } }
    ];

    const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    event.effect();

    city.events.push({
      type: event.type,
      timestamp: Date.now()
    });

    this.events.push({
      type: 'city_event',
      cityId: city.id,
      cityName: city.name,
      eventType: event.type,
      timestamp: Date.now()
    });

    console.log(`[World Simulation] 🎭 ${city.name}: ${event.type}`);
  }

  /**
   * Obtient l'état d'une ville
   */
  getCityState(cityId) {
    const city = this.cities.get(cityId);
    if (!city) return null;

    return {
      name: city.name,
      population: city.population,
      wealth: city.wealth,
      size: city.size,
      resources: { ...city.resources },
      economy: { ...city.economy }
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 4: WEATHER & ENVIRONMENT
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Met à jour la météo
   */
  _updateWeather() {
    if (!this.config.enableWeather) return;

    const weather = this.worldState.weather;
    const season = this.worldState.currentTime.season;

    // Température de base par saison
    const baseTemps = {
      spring: 15,
      summer: 25,
      autumn: 12,
      winter: -5
    };

    // Variation aléatoire
    const tempVariation = (Math.random() - 0.5) * 5;
    weather.temperature = baseTemps[season] + tempVariation;

    // Vent
    weather.windSpeed = Math.max(0, weather.windSpeed + (Math.random() - 0.5) * 10);

    // Précipitations
    const precipChance = {
      spring: 0.4,
      summer: 0.2,
      autumn: 0.5,
      winter: 0.6
    }[season];

    if (Math.random() < precipChance * 0.1) { // 10% de la chance par tick
      // Commence à pleuvoir/neiger
      weather.precipitation = Math.random() * 100;
      weather.current = weather.temperature < 0 ? 'snow' : 'rain';
    } else if (weather.precipitation > 0) {
      // Arrêt progressif
      weather.precipitation -= 10;
      if (weather.precipitation <= 0) {
        weather.precipitation = 0;
        weather.current = weather.windSpeed > 20 ? 'windy' : 
                         weather.temperature > 30 ? 'hot' : 'clear';
      }
    }

    // Événements météo extrêmes
    if (Math.random() < 0.001) { // 0.1% par tick
      this._generateWeatherEvent();
    }
  }

  /**
   * Génère un événement météorologique
   */
  _generateWeatherEvent() {
    const events = ['storm', 'blizzard', 'heatwave', 'fog'];
    const event = events[Math.floor(Math.random() * events.length)];

    this.worldState.weather.current = event;

    this.events.push({
      type: 'weather_event',
      eventType: event,
      timestamp: Date.now()
    });

    console.log(`[World Simulation] ⛈️ Weather event: ${event}`);

    // Effets sur les villes
    this.cities.forEach(city => {
      if (event === 'storm') {
        city.buildings.homes -= Math.floor(Math.random() * 3);
      } else if (event === 'blizzard') {
        city.resources.food -= city.population * 0.5;
      }
    });
  }

  /**
   * Obtient la météo actuelle
   */
  getCurrentWeather() {
    return { ...this.worldState.weather };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 5: GLOBAL ECONOMY
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Met à jour l'économie globale
   */
  _updateGlobalEconomy() {
    if (!this.config.enableEconomy) return;

    const economy = this.worldState.globalEconomy;

    // Calcul du PIB basé sur toutes les villes
    let totalGold = 0;
    let totalEmployment = 0;
    let cityCount = 0;

    this.cities.forEach(city => {
      totalGold += city.resources.gold;
      totalEmployment += city.economy.employment;
      cityCount++;
    });

    economy.gdp = totalGold;
    economy.employment = cityCount > 0 ? totalEmployment / cityCount : 0.85;

    // Inflation
    if (economy.gdp > 50000) {
      economy.inflation = Math.min(2.0, economy.inflation + 0.01);
    } else if (economy.gdp < 20000) {
      economy.inflation = Math.max(0.5, economy.inflation - 0.01);
    }

    // Détermination de la richesse globale
    if (economy.gdp > 50000 && economy.employment > 0.8) {
      economy.wealth = 'prosperous';
    } else if (economy.gdp < 20000 || economy.employment < 0.6) {
      economy.wealth = 'poor';
    } else {
      economy.wealth = 'stable';
    }
  }

  /**
   * Obtient l'état de l'économie globale
   */
  getGlobalEconomy() {
    return { ...this.worldState.globalEconomy };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 6: WORLD EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Génère des événements mondiaux
   */
  _generateWorldEvents() {
    // Événements aléatoires rares
    if (Math.random() < 0.0001) { // 0.01% par tick
      this._generateWorldEvent('random');
    }
  }

  /**
   * Génère un événement mondial spécifique
   */
  _generateWorldEvent(type) {
    const events = {
      daily: [
        { type: 'merchant_caravan', description: 'Une caravane marchande traverse le royaume' },
        { type: 'noble_visit', description: 'Un noble visite la région' }
      ],
      annual: [
        { type: 'harvest_festival', description: 'Festival de la moisson' },
        { type: 'winter_solstice', description: 'Solstice d\'hiver' },
        { type: 'royal_coronation', description: 'Couronnement royal' }
      ],
      random: [
        { type: 'dragon_sighting', description: 'Un dragon a été aperçu!' },
        { type: 'plague_outbreak', description: 'Une épidémie se propage' },
        { type: 'war_declaration', description: 'Une guerre est déclarée' },
        { type: 'discovery', description: 'Une découverte majeure' }
      ]
    };

    const pool = events[type] || events.random;
    const event = pool[Math.floor(Math.random() * pool.length)];

    this.events.push({
      ...event,
      timestamp: Date.now(),
      worldTime: { ...this.worldState.currentTime }
    });

    this.stats.eventsGenerated++;

    console.log(`[World Simulation] 🌟 World event: ${event.description}`);

    return event;
  }

  /**
   * Obtient les événements récents
   */
  getRecentEvents(limit = 10) {
    return this.events.slice(-limit);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 7: UTILITIES & STATS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Obtient les statistiques de la simulation
   */
  getStats() {
    return {
      ...this.stats,
      isRunning: this.isRunning,
      tickCount: this.tickCount,
      worldTime: { ...this.worldState.currentTime },
      npcsAlive: Array.from(this.npcs.values()).filter(n => n.isAlive).length,
      totalCities: this.cities.size,
      totalEvents: this.events.length
    };
  }

  /**
   * Obtient l'état complet du monde
   */
  getWorldState() {
    return {
      time: { ...this.worldState.currentTime },
      weather: { ...this.worldState.weather },
      economy: { ...this.worldState.globalEconomy },
      timeOfDay: this.getTimeOfDay(),
      formattedTime: this.getFormattedTime()
    };
  }

  /**
   * Avance rapidement le temps
   */
  fastForward(hours) {
    const time = this.worldState.currentTime;
    time.hour += hours;

    while (time.hour >= this.config.dayLength) {
      time.day++;
      time.hour -= this.config.dayLength;
      this._onNewDay();
    }

    while (time.day > this.config.yearLength) {
      time.year++;
      time.day -= this.config.yearLength;
      this._onNewYear();
    }

    console.log(`[World Simulation] ⏩ Fast-forwarded ${hours} hours`);
  }

  /**
   * Réinitialise la simulation
   */
  reset() {
    this.stopSimulation();
    
    this.npcs.clear();
    this.cities.clear();
    this.events = [];
    this.routines.clear();

    this.worldState.currentTime = {
      year: 1524,
      day: 1,
      hour: 6,
      minute: 0,
      season: 'spring'
    };

    this.stats = {
      totalTicks: 0,
      npcsSimulated: 0,
      citiesSimulated: 0,
      eventsGenerated: 0,
      avgTickTime: 0
    };

    console.log('[World Simulation] 🔄 Reset complete');
  }
}

export default WorldSimulation;
