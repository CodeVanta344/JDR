// ==========================================
// EVENT GENERATOR - Générateur d'événements dynamiques
// ==========================================
// Génère des événements aléatoires basés sur le contexte :
// - Météo changeante (impact gameplay)
// - Apparition de PNJ dynamiques
// - Événements mondiaux (invasion, festival, catastrophe)
// - Rencontres aléatoires contextuelles

class EventGenerator {
  constructor() {
    // Configuration des probabilités
    this.config = {
      weatherChangeChance: 0.15,        // 15% de chance de changement météo par action
      randomNPCChance: 0.08,            // 8% de chance de rencontre PNJ
      worldEventChance: 0.02,           // 2% de chance d'événement mondial
      randomEncounterChance: 0.12,      // 12% de chance de rencontre aléatoire
      timeBasedEventChance: 0.10        // 10% de chance d'événement temporel
    };

    // Compteur d'actions pour déclencheurs temporels
    this.actionCount = 0;
    this.lastWeatherChange = 0;
    this.activeWorldEvents = [];
    
    // Base de données météo
    this.weatherTypes = {
      clear: {
        name: 'Clair',
        description: 'Le ciel est dégagé, la visibilité parfaite.',
        effects: { visibility: 'excellente', travel: 'normal', morale: +5 },
        transitions: ['cloudy', 'clear'] // Peut devenir nuageux ou rester clair
      },
      cloudy: {
        name: 'Nuageux',
        description: 'Des nuages couvrent le ciel, la lumière est tamisée.',
        effects: { visibility: 'bonne', travel: 'normal', morale: 0 },
        transitions: ['clear', 'rain', 'cloudy']
      },
      rain: {
        name: 'Pluie',
        description: 'Une pluie fine tombe, rendant le sol boueux.',
        effects: { visibility: 'moyenne', travel: 'difficile', morale: -5, stealth: +10 },
        transitions: ['cloudy', 'storm', 'rain']
      },
      storm: {
        name: 'Orage',
        description: 'Un orage violent gronde, les éclairs illuminent le ciel.',
        effects: { visibility: 'faible', travel: 'très difficile', morale: -15, danger: +20 },
        transitions: ['rain', 'storm']
      },
      fog: {
        name: 'Brouillard',
        description: 'Un épais brouillard réduit la visibilité à quelques mètres.',
        effects: { visibility: 'très faible', travel: 'difficile', stealth: +20, ambush: +30 },
        transitions: ['clear', 'fog']
      },
      snow: {
        name: 'Neige',
        description: 'Des flocons de neige tombent doucement, couvrant le sol.',
        effects: { visibility: 'moyenne', travel: 'très difficile', morale: -10, cold: true },
        transitions: ['snow', 'clear']
      },
      heatwave: {
        name: 'Canicule',
        description: 'Une chaleur étouffante accable la région.',
        effects: { visibility: 'bonne', travel: 'difficile', morale: -10, fatigue: +20 },
        transitions: ['clear', 'heatwave']
      }
    };

    // Base de données PNJ aléatoires
    this.randomNPCs = {
      traveler: {
        names: ['Eryn le Voyageur', 'Mirella la Nomade', 'Gareth le Pèlerin', 'Sorin l\'Exilé'],
        greetings: [
          'Ah, un autre voyageur ! La route est longue, n\'est-ce pas ?',
          'Salutations ! Puis-je partager votre feu ce soir ?',
          'Vous semblez fatigué... Je connais un raccourci vers la ville.',
          'Méfiez-vous du chemin sud, j\'ai vu des créatures étranges.'
        ],
        offers: ['partage_carte', 'rumeur', 'objet_commun', 'compagnon_temporaire'],
        personality: ['amical', 'prudent', 'curieux']
      },
      merchant: {
        names: ['Balthazar le Colporteur', 'Lysandra la Marchande', 'Rodrik le Camelot'],
        greetings: [
          'Des marchandises rares ! Prix spéciaux pour les aventuriers !',
          'Bienvenue ! J\'ai ce qu\'il vous faut, certainement !',
          'Ah, un client ! Regardez ces merveilles que j\'ai déniché !'
        ],
        offers: ['objet_rare', 'echange', 'information_payante', 'quete_livraison'],
        personality: ['avide', 'rusé', 'bavard']
      },
      guard: {
        names: ['Capitaine Aldric', 'Lieutenant Kara', 'Sergent Theron', 'Garde Valen'],
        greetings: [
          'Halte ! Identifiez-vous. Que faites-vous ici ?',
          'Vous n\'avez pas l\'air d\'un brigand... Circulez.',
          'Vous avez vu quelque chose de suspect par ici ?',
          'Ordre du Conseil : couvre-feu à 22h. Ne traînez pas.'
        ],
        offers: ['avertissement', 'quete_garde', 'escorte', 'arrestation_si_karma_bas'],
        personality: ['strict', 'loyal', 'suspicieux']
      },
      mystic: {
        names: ['Séraphine la Voyante', 'Elden l\'Augure', 'Nyx la Prophétesse'],
        greetings: [
          'Les étoiles m\'ont parlé de votre venue...',
          'Votre destin est trouble, étranger. Laissez-moi le clarifier...',
          'Une aura de danger vous entoure. Voulez-vous connaître l\'avenir ?',
          'Les cartes ne mentent jamais. Souhaitez-vous une lecture ?'
        ],
        offers: ['prophétie', 'benediction_temporaire', 'quete_mystique', 'avertissement_danger'],
        personality: ['énigmatique', 'sage', 'inquiétant']
      },
      bandit: {
        names: ['Garen le Borgne', 'Rissa la Lame', 'Kolgrim le Brutal', 'Sable Noir'],
        greetings: [
          'Ta bourse ou ta vie, étranger !',
          'Mauvais moment pour voyager seul, pas vrai ?',
          'Cette route a un péage... et il est élevé.',
          'Dépose tes armes lentement, et personne ne sera blessé.'
        ],
        offers: ['combat', 'negociation', 'fuite', 'intimidation'],
        personality: ['agressif', 'cupide', 'lâche']
      }
    };

    // Base de données événements mondiaux
    this.worldEvents = {
      festival: {
        name: 'Festival de la Moisson',
        description: 'Les villes célèbrent l\'abondance ! Musique, danse et marchandises à prix réduits.',
        duration: 48, // heures in-game
        effects: { shop_discount: 15, morale: +20, quests_available: +3, xp_gain: +10 },
        announcements: [
          '📯 Des hérauts annoncent le début du Festival de la Moisson !',
          '🎉 Les rues s\'illuminent, la musique résonne dans toute la cité !'
        ]
      },
      invasion: {
        name: 'Invasion Gobeline',
        description: 'Des hordes de gobelins attaquent les villages ! Les routes sont dangereuses.',
        duration: 72,
        effects: { enemy_spawn_rate: +50, travel_danger: +40, quest_rewards: +25, shop_prices: +20 },
        announcements: [
          '⚔️ ALERTE ! Des gobelins ont été aperçus aux frontières !',
          '🔥 Un village a été attaqué ! Les gardes recrutent des mercenaires !'
        ]
      },
      plague: {
        name: 'Épidémie de Fièvre Noire',
        description: 'Une maladie se propage dans la région. Les auberges refusent du monde.',
        duration: 96,
        effects: { healing_cost: +50, npc_availability: -30, morale: -25, quest_medical: +5 },
        announcements: [
          '💀 Les guérisseurs sont débordés, une épidémie sévit !',
          '🏥 Les temples offrent des bénédictions de santé gratuites.'
        ]
      },
      aurora: {
        name: 'Aurore Magique',
        description: 'Le ciel s\'illumine de lueurs éthérées. La magie est amplifiée !',
        duration: 24,
        effects: { spell_power: +25, mana_regen: +50, magic_items: 'plus_fréquents' },
        announcements: [
          '✨ Le ciel s\'embrase de couleurs mystiques !',
          '🔮 Les mages ressentent un afflux de pouvoir arcanique !'
        ]
      },
      drought: {
        name: 'Grande Sécheresse',
        description: 'La pluie ne tombe plus. Les puits s\'assèchent, la famine menace.',
        duration: 120,
        effects: { food_price: +100, water_required: true, morale: -30, quest_water: +10 },
        announcements: [
          '☀️ Les cultures meurent, les rivières s\'assèchent !',
          '💧 Les marchands rationnent l\'eau et la nourriture.'
        ]
      },
      eclipse: {
        name: 'Éclipse Totale',
        description: 'Le soleil disparaît derrière la lune. Les morts-vivants se réveillent...',
        duration: 12,
        effects: { undead_spawn: +100, light_required: true, morale: -20, dark_magic: +50 },
        announcements: [
          '🌑 L\'obscurité règne ! Le soleil a disparu !',
          '👻 Les nécromanciens célèbrent, les vivants se terrent !'
        ]
      }
    };

    // Rencontres aléatoires
    this.randomEncounters = {
      wilderness: [
        { type: 'animal', name: 'Loup solitaire', danger: 'moyen', reward: 'fourrure' },
        { type: 'trap', name: 'Piège à ours', danger: 'élevé', reward: null },
        { type: 'treasure', name: 'Coffre abandonné', danger: 'faible', reward: 'or_moyen' },
        { type: 'ruins', name: 'Ruines anciennes', danger: 'variable', reward: 'artefact' },
        { type: 'herb', name: 'Plante médicinale rare', danger: null, reward: 'herbe_rare' }
      ],
      dungeon: [
        { type: 'trap', name: 'Dalle piégée', danger: 'élevé', reward: null },
        { type: 'enemy', name: 'Groupe de gobelins', danger: 'moyen', reward: 'or_faible' },
        { type: 'puzzle', name: 'Énigme gravée', danger: 'mental', reward: 'passage_secret' },
        { type: 'loot', name: 'Salle du trésor', danger: 'piégé', reward: 'or_élevé' }
      ],
      city: [
        { type: 'pickpocket', name: 'Voleur à la tire', danger: 'faible', reward: null },
        { type: 'rumor', name: 'Conversation entendue', danger: null, reward: 'information' },
        { type: 'quest', name: 'Affiche de recherche', danger: 'variable', reward: 'quête' },
        { type: 'merchant', name: 'Marchand ambulant', danger: null, reward: 'commerce' }
      ]
    };
  }

  // ==========================================
  // Méthode principale : génération d'événement
  // ==========================================
  generateEvent(context) {
    this.actionCount++;
    const events = [];

    // 1. Changement météo
    if (Math.random() < this.config.weatherChangeChance && this.actionCount - this.lastWeatherChange > 5) {
      const weatherEvent = this.generateWeatherChange(context.weather);
      if (weatherEvent) {
        events.push(weatherEvent);
        this.lastWeatherChange = this.actionCount;
      }
    }

    // 2. Apparition PNJ aléatoire
    if (Math.random() < this.config.randomNPCChance && context.location !== 'combat') {
      const npcEvent = this.generateRandomNPC(context);
      if (npcEvent) events.push(npcEvent);
    }

    // 3. Événement mondial
    if (Math.random() < this.config.worldEventChance && this.activeWorldEvents.length < 2) {
      const worldEvent = this.generateWorldEvent(context);
      if (worldEvent) {
        events.push(worldEvent);
        this.activeWorldEvents.push(worldEvent);
      }
    }

    // 4. Rencontre aléatoire
    if (Math.random() < this.config.randomEncounterChance) {
      const encounter = this.generateRandomEncounter(context);
      if (encounter) events.push(encounter);
    }

    // 5. Événement temporel (basé sur l'heure)
    if (Math.random() < this.config.timeBasedEventChance) {
      const timeEvent = this.generateTimeBasedEvent(context);
      if (timeEvent) events.push(timeEvent);
    }

    return events;
  }

  // ==========================================
  // Génération de changement météo
  // ==========================================
  generateWeatherChange(currentWeather = 'clear') {
    const current = this.weatherTypes[currentWeather] || this.weatherTypes.clear;
    const possibleTransitions = current.transitions;
    const newWeather = possibleTransitions[Math.floor(Math.random() * possibleTransitions.length)];
    const weatherData = this.weatherTypes[newWeather];

    return {
      type: 'weather_change',
      title: `☁️ Changement Météo : ${weatherData.name}`,
      description: weatherData.description,
      effects: weatherData.effects,
      newWeather: newWeather,
      narrative: this.getWeatherNarrative(currentWeather, newWeather)
    };
  }

  getWeatherNarrative(from, to) {
    const narratives = {
      'clear_rain': 'Les premiers nuages apparaissent à l\'horizon. Bientôt, des gouttes de pluie commencent à tomber.',
      'rain_storm': 'Le vent se lève brusquement. Les gouttes deviennent un déluge, les éclairs déchirent le ciel !',
      'storm_rain': 'L\'orage s\'éloigne lentement, laissant place à une pluie fine et persistante.',
      'fog_clear': 'Le brouillard se dissipe progressivement, révélant un ciel dégagé.',
      'clear_snow': 'Le froid s\'intensifie. Les premiers flocons commencent à tomber doucement.',
      'default': 'La météo change progressivement.'
    };
    return narratives[`${from}_${to}`] || narratives.default;
  }

  // ==========================================
  // Génération de PNJ aléatoire
  // ==========================================
  generateRandomNPC(context) {
    const location = context.location || 'wilderness';
    let npcTypes = ['traveler', 'merchant'];

    if (location === 'city' || location === 'town') {
      npcTypes = ['merchant', 'guard', 'mystic', 'traveler'];
    } else if (location === 'wilderness' || location === 'forest') {
      npcTypes = ['traveler', 'bandit', 'mystic'];
    }

    const chosenType = npcTypes[Math.floor(Math.random() * npcTypes.length)];
    const npcData = this.randomNPCs[chosenType];
    const name = npcData.names[Math.floor(Math.random() * npcData.names.length)];
    const greeting = npcData.greetings[Math.floor(Math.random() * npcData.greetings.length)];
    const offer = npcData.offers[Math.floor(Math.random() * npcData.offers.length)];

    return {
      type: 'random_npc',
      npcType: chosenType,
      name: name,
      greeting: greeting,
      offer: offer,
      personality: npcData.personality,
      narrative: `🚶 **${name}** apparaît sur votre chemin.\n\n"${greeting}"`
    };
  }

  // ==========================================
  // Génération d'événement mondial
  // ==========================================
  generateWorldEvent(context) {
    const eventKeys = Object.keys(this.worldEvents);
    const chosenKey = eventKeys[Math.floor(Math.random() * eventKeys.length)];
    const eventData = this.worldEvents[chosenKey];
    const announcement = eventData.announcements[Math.floor(Math.random() * eventData.announcements.length)];

    return {
      type: 'world_event',
      eventId: chosenKey,
      name: eventData.name,
      description: eventData.description,
      duration: eventData.duration,
      effects: eventData.effects,
      announcement: announcement,
      startTime: Date.now()
    };
  }

  // ==========================================
  // Génération de rencontre aléatoire
  // ==========================================
  generateRandomEncounter(context) {
    const location = context.location || 'wilderness';
    let encounterPool = this.randomEncounters.wilderness;

    if (location === 'dungeon') encounterPool = this.randomEncounters.dungeon;
    else if (location === 'city' || location === 'town') encounterPool = this.randomEncounters.city;

    const encounter = encounterPool[Math.floor(Math.random() * encounterPool.length)];

    return {
      type: 'random_encounter',
      encounterType: encounter.type,
      name: encounter.name,
      danger: encounter.danger,
      reward: encounter.reward,
      narrative: this.getEncounterNarrative(encounter)
    };
  }

  getEncounterNarrative(encounter) {
    const narratives = {
      animal: `🐺 Un **${encounter.name}** surgit des fourrés !`,
      trap: `⚠️ Attention ! Vous détectez un **${encounter.name}** !`,
      treasure: `💎 Vous découvrez un **${encounter.name}** caché !`,
      ruins: `🏛️ Vous tombez sur des **${encounter.name}** mystérieuses.`,
      enemy: `⚔️ Un **${encounter.name}** vous bloque le passage !`,
      puzzle: `🧩 Vous trouvez une **${encounter.name}**.`,
      pickpocket: `🕵️ Vous sentez une main dans votre poche !`,
      rumor: `👂 Vous surprenez une conversation intéressante...`,
      quest: `📜 Une affiche attire votre attention : **${encounter.name}**`
    };
    return narratives[encounter.type] || `Vous rencontrez : ${encounter.name}`;
  }

  // ==========================================
  // Génération d'événement temporel
  // ==========================================
  generateTimeBasedEvent(context) {
    const hour = context.hour || 12;
    
    // Événements du matin (6h-9h)
    if (hour >= 6 && hour < 9) {
      return {
        type: 'time_event',
        title: '🌅 Aube Nouvelle',
        description: 'Le soleil se lève. Les marchés ouvrent, les voyageurs reprennent la route.',
        effects: { morale: +5, travel: 'optimal' }
      };
    }
    
    // Événements du soir (18h-21h)
    if (hour >= 18 && hour < 21) {
      return {
        type: 'time_event',
        title: '🌆 Crépuscule',
        description: 'Le jour décline. Les auberges s\'animent, les rues se vident.',
        effects: { morale: 0, visibility: 'réduite', danger: +10 }
      };
    }
    
    // Événements de nuit (22h-5h)
    if (hour >= 22 || hour < 6) {
      return {
        type: 'time_event',
        title: '🌙 Nuit Profonde',
        description: 'L\'obscurité règne. Seuls les fous ou les désespérés voyagent à cette heure.',
        effects: { visibility: 'très faible', danger: +30, undead: +20 }
      };
    }

    return null;
  }

  // ==========================================
  // Mise à jour des événements actifs
  // ==========================================
  updateActiveEvents(gameTime) {
    this.activeWorldEvents = this.activeWorldEvents.filter(event => {
      const elapsed = (Date.now() - event.startTime) / 1000 / 60; // minutes réelles
      return elapsed < event.duration;
    });
  }

  // ==========================================
  // Récupérer les effets actifs
  // ==========================================
  getActiveEffects() {
    const effects = {
      shop_discount: 0,
      morale: 0,
      travel_danger: 0,
      enemy_spawn_rate: 0,
      spell_power: 0
    };

    this.activeWorldEvents.forEach(event => {
      Object.keys(event.effects).forEach(key => {
        if (typeof event.effects[key] === 'number') {
          effects[key] = (effects[key] || 0) + event.effects[key];
        }
      });
    });

    return effects;
  }

  // ==========================================
  // Réinitialisation
  // ==========================================
  reset() {
    this.actionCount = 0;
    this.lastWeatherChange = 0;
    this.activeWorldEvents = [];
  }
}

export default EventGenerator;
