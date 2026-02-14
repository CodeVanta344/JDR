// ═══════════════════════════════════════════════════════════════════════
// 🗺️ EXPLORATION HANDLER - Gestion de l'exploration et des déplacements
// ═══════════════════════════════════════════════════════════════════════

export class ExplorationHandler {
  constructor(gmEngine) {
    this.gmEngine = gmEngine;
    
    // Templates de narration par type de lieu
    this.locationDescriptions = {
      city: [
        "Tu traverses les rues animées de {location}. {atmosphere}. {details}.",
        "{location} s'étend devant toi, {atmosphere}. {details}.",
        "Les bâtiments de {location} se dressent autour de toi. {atmosphere}. {details}."
      ],
      village: [
        "Le petit village de {location} est paisible. {atmosphere}. {details}.",
        "Tu arrives à {location}, un village modeste. {atmosphere}. {details}."
      ],
      dungeon: [
        "Les couloirs sombres de {location} résonnent de tes pas. {atmosphere}. {details}.",
        "Tu explores les profondeurs de {location}. {atmosphere}. {details}."
      ],
      forest: [
        "La forêt de {location} t'entoure. {atmosphere}. {details}.",
        "Les arbres de {location} forment une voûte au-dessus de ta tête. {atmosphere}. {details}."
      ],
      cave: [
        "La grotte de {location} est humide et froide. {atmosphere}. {details}.",
        "Tu avances prudemment dans {location}. {atmosphere}. {details}."
      ],
      ruins: [
        "Les ruines de {location} témoignent d'un passé glorieux. {atmosphere}. {details}.",
        "Tu explores les vestiges de {location}. {atmosphere}. {details}."
      ]
    };

    // Atmosphères contextuelles
    this.atmospheres = {
      day_clear: [
        "Le soleil brille haut dans le ciel",
        "Une belle journée s'annonce",
        "La lumière du jour éclaire les environs"
      ],
      day_cloudy: [
        "Des nuages couvrent le ciel",
        "Le temps est gris et menaçant",
        "Une légère bruine commence à tomber"
      ],
      night_clear: [
        "La lune éclaire ton chemin",
        "Les étoiles brillent dans le ciel nocturne",
        "L'obscurité enveloppe tout"
      ],
      night_dark: [
        "La nuit est sombre et sans lune",
        "L'obscurité est presque totale",
        "Tu distingues à peine ton chemin"
      ],
      danger: [
        "Une tension palpable flotte dans l'air",
        "Tu sens un danger imminent",
        "Quelque chose ne va pas"
      ]
    };

    // Détails procéduraux
    this.details = {
      city: [
        "Des marchands crient leurs prix sur la place",
        "Des enfants jouent dans les ruelles",
        "Des gardes patrouillent calmement",
        "L'odeur du pain frais vient d'une boulangerie proche",
        "Des chevaux hennissent devant une auberge"
      ],
      village: [
        "Un chien aboie au loin",
        "Un forgeron martèle son enclume",
        "Des poules picorent dans la rue",
        "Un vieillard est assis sur un banc",
        "De la fumée s'échappe des cheminées"
      ],
      dungeon: [
        "Des torches vacillent sur les murs",
        "Un courant d'air froid te fait frissonner",
        "Tu entends un bruit sourd au loin",
        "Des rats détalent à ton passage",
        "Une odeur de moisissure t'assaille"
      ],
      forest: [
        "Des oiseaux chantent dans les branches",
        "Le vent fait bruisser les feuilles",
        "Un ruisseau coule non loin",
        "Tu entends un animal bouger dans les buissons",
        "La mousse recouvre les rochers"
      ]
    };

    // Actions de découverte
    this.discoveries = [
      { type: 'item', chance: 0.2, items: ['potion', 'or', 'gemme', 'parchemin'] },
      { type: 'npc', chance: 0.15 },
      { type: 'event', chance: 0.1 },
      { type: 'nothing', chance: 0.55 }
    ];
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🗺️ GESTION PRINCIPALE
  // ═══════════════════════════════════════════════════════════════════════

  async handle(intent, context) {
    const { entities, normalized } = intent;

    // Déterminer le type d'action d'exploration
    if (normalized.includes('fouille') || normalized.includes('cherche')) {
      return this.handleSearch(context);
    }
    if (normalized.includes('va') || normalized.includes('marche') || entities.directions.length > 0) {
      return this.handleMovement(entities.directions[0], context);
    }
    if (normalized.includes('regarde') || normalized.includes('examine')) {
      return this.handleLook(context);
    }
    if (normalized.includes('entre') || normalized.includes('ouvre')) {
      return this.handleEnter(context);
    }

    // Par défaut, description du lieu actuel
    return this.handleLook(context);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 👀 REGARDER AUTOUR
  // ═══════════════════════════════════════════════════════════════════════

  handleLook(context) {
    const location = context.location || { name: 'Lieu Inconnu', type: 'plains' };
    const description = this.generateLocationDescription(location, context);

    // Ajouter les PNJ visibles
    let npcsText = '';
    if (context.nearbyNPCs && context.nearbyNPCs.length > 0) {
      const npcNames = context.nearbyNPCs.map(npc => npc.name).join(', ');
      npcsText = `\n\n👥 Tu vois : ${npcNames}`;
    }

    // Ajouter les ennemis visibles
    let enemiesText = '';
    if (context.nearbyEnemies && context.nearbyEnemies.length > 0) {
      const enemyNames = context.nearbyEnemies.map(e => e.name).join(', ');
      enemiesText = `\n\n⚔️ Ennemis présents : ${enemyNames}`;
    }

    // Ajouter les sorties
    let exitsText = '';
    if (context.exits && context.exits.length > 0) {
      exitsText = `\n\n🚪 Sorties : ${context.exits.join(', ')}`;
    }

    return {
      text: description + npcsText + enemiesText + exitsText,
      confidence: 0.9,
      effects: {},
      meta: { responseType: 'exploration' }
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🚶 DÉPLACEMENT
  // ═══════════════════════════════════════════════════════════════════════

  handleMovement(direction, context) {
    if (!direction) {
      return {
        text: "Dans quelle direction veux-tu aller ? (nord, sud, est, ouest)",
        confidence: 0.7,
        effects: {}
      };
    }

    // Vérifier si la sortie existe
    if (context.exits && !context.exits.includes(direction)) {
      return {
        text: `Il n'y a pas de sortie vers ${direction}. Les sorties disponibles sont : ${context.exits.join(', ')}.`,
        confidence: 0.9,
        effects: {}
      };
    }

    // Simuler le déplacement
    const travelTime = Math.floor(Math.random() * 3) + 1;
    
    return {
      text: `Tu te diriges vers ${direction}. Après ${travelTime} minutes de marche...`,
      confidence: 0.85,
      effects: {
        movement: direction,
        travelTime: travelTime
      },
      meta: { responseType: 'movement' }
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🔍 FOUILLER
  // ═══════════════════════════════════════════════════════════════════════

  handleSearch(context) {
    // Vérifier si déjà fouillé récemment
    const recentSearches = this.gmEngine.memoryManager?.memories.filter(
      m => m.intent === 'exploration' && m.context?.location?.id === context.location?.id
    ).length || 0;

    if (recentSearches > 2) {
      return {
        text: "Tu as déjà fouillé cet endroit récemment. Il n'y a rien de nouveau.",
        confidence: 0.9,
        effects: {}
      };
    }

    // Roll de découverte
    const roll = Math.random();
    let discovery = this.discoveries.find(d => roll < d.chance);

    if (!discovery) {
      discovery = this.discoveries[this.discoveries.length - 1]; // nothing
    }

    switch (discovery.type) {
      case 'item':
        const item = this.randomPick(discovery.items);
        return {
          text: `Tu fouilles les environs...\n\n✨ Tu trouves : **${item}** !`,
          confidence: 0.9,
          effects: {
            itemFound: item
          }
        };

      case 'npc':
        return {
          text: "Tu entends des voix... Quelqu'un s'approche !",
          confidence: 0.8,
          effects: {
            encounterNPC: true
          }
        };

      case 'event':
        const events = [
          "Tu remarques des traces étranges sur le sol.",
          "Un bruit soudain te fait sursauter !",
          "Tu trouves une note mystérieuse abandonnée.",
          "Un animal sauvage traverse ton champ de vision."
        ];
        return {
          text: this.randomPick(events),
          confidence: 0.8,
          effects: {}
        };

      case 'nothing':
      default:
        return {
          text: "Tu fouilles minutieusement, mais ne trouves rien d'intéressant.",
          confidence: 0.9,
          effects: {}
        };
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 🚪 ENTRER
  // ═══════════════════════════════════════════════════════════════════════

  handleEnter(context) {
    // Vérifier s'il y a un bâtiment à proximité
    if (!context.nearbyBuildings || context.nearbyBuildings.length === 0) {
      return {
        text: "Il n'y a rien à ouvrir ou dans lequel entrer ici.",
        confidence: 0.9,
        effects: {}
      };
    }

    const building = context.nearbyBuildings[0];
    
    return {
      text: `Tu entres dans ${building.name}...`,
      confidence: 0.85,
      effects: {
        enter: building.id
      },
      meta: { responseType: 'enter' }
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 📝 GÉNÉRATION DE DESCRIPTIONS
  // ═══════════════════════════════════════════════════════════════════════

  generateLocationDescription(location, context) {
    const locationType = location.type || 'plains';
    const templates = this.locationDescriptions[locationType] || this.locationDescriptions.city;
    
    let template = this.randomPick(templates);
    
    // Choisir l'atmosphère
    const atmosphere = this.getAtmosphere(context);
    
    // Choisir les détails
    const detailsArray = this.details[locationType] || this.details.city;
    const details = this.randomPick(detailsArray);

    // Remplacer les variables
    template = template
      .replace('{location}', location.name)
      .replace('{atmosphere}', atmosphere)
      .replace('{details}', details);

    return template;
  }

  getAtmosphere(context) {
    const time = context.time || 'Jour';
    const weather = context.weather || 'Clair';
    const danger = context.nearbyEnemies?.length > 0;

    if (danger) {
      return this.randomPick(this.atmospheres.danger);
    }

    if (time === 'Nuit') {
      if (weather === 'Clair') {
        return this.randomPick(this.atmospheres.night_clear);
      } else {
        return this.randomPick(this.atmospheres.night_dark);
      }
    } else {
      if (weather === 'Clair') {
        return this.randomPick(this.atmospheres.day_clear);
      } else {
        return this.randomPick(this.atmospheres.day_cloudy);
      }
    }
  }

  randomPick(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

export default ExplorationHandler;
