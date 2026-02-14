// ==========================================
// LOCATION GENERATOR - Générateur de lieux procédural
// ==========================================
// Génère des descriptions uniques de lieux basées sur :
// - Type de lieu (ville, forêt, donjon, etc.)
// - Météo et heure
// - Événements récents
// - Présence de PNJ

class LocationGenerator {
  constructor() {
    this.locationTypes = {
      city: {
        sizes: ['petite', 'moyenne', 'grande', 'métropole'],
        atmospheres: ['animée', 'calme', 'tendue', 'festive', 'sombre'],
        features: ['place centrale', 'marché', 'cathédrale', 'château', 'port', 'murailles', 'quartier pauvre']
      },
      forest: {
        densities: ['clairsemée', 'dense', 'impénétrable'],
        atmospheres: ['paisible', 'inquiétante', 'magique', 'maudite'],
        features: ['clairière', 'ruisseau', 'arbre ancien', 'ruines', 'grotte', 'sentier', 'campement abandonné']
      },
      dungeon: {
        states: ['ancien', 'délabré', 'bien préservé', 'humide'],
        atmospheres: ['oppressante', 'mystérieuse', 'dangereuse', 'hantée'],
        features: ['salle du trésor', 'crypte', 'piège', 'fresque ancienne', 'autel', 'cellule', 'salle du trône']
      },
      mountain: {
        heights: ['colline', 'montagne', 'pic enneigé'],
        atmospheres: ['majestueuse', 'hostile', 'isolée'],
        features: ['sommet', 'grotte', 'cascade', 'pont suspendu', 'temple', 'mine abandonnée']
      },
      tavern: {
        qualities: ['misérable', 'modeste', 'accueillante', 'luxueuse'],
        atmospheres: ['bruyante', 'calme', 'louche', 'chaleureuse'],
        features: ['cheminée', 'musiciens', 'bagarre', 'clients suspects', 'table de jeu', 'chambres à l\'étage']
      }
    };

    this.weatherDescriptions = {
      clear: ['Le soleil brille', 'Le ciel est dégagé', 'Une belle journée'],
      rain: ['La pluie tombe', 'Il pleut', 'Des gouttes martelent le sol'],
      storm: ['L\'orage gronde', 'Les éclairs déchirent le ciel', 'La tempête fait rage'],
      fog: ['Le brouillard enveloppe tout', 'Une brume épaisse', 'La visibilité est réduite'],
      snow: ['La neige tombe doucement', 'Un manteau blanc recouvre le sol', 'Il neige']
    };

    this.timeDescriptions = {
      morning: ['L\'aube se lève', 'Le matin est encore frais', 'Le soleil matinal'],
      afternoon: ['L\'après-midi est bien entamé', 'Le soleil est haut', 'Il fait chaud'],
      evening: ['Le soleil décline', 'Le crépuscule approche', 'La lumière dorée du soir'],
      night: ['La nuit est tombée', 'L\'obscurité règne', 'Les étoiles brillent']
    };
  }

  // ==========================================
  // GÉNÉRER UNE DESCRIPTION
  // ==========================================
  generateLocation(type, context = {}) {
    const typeData = this.locationTypes[type];
    if (!typeData) return 'Un lieu inconnu.';

    let description = '';

    // Intro basée sur le temps et la météo
    if (context.weather) {
      description += `${this.random(this.weatherDescriptions[context.weather] || [])}. `;
    }
    if (context.timeOfDay) {
      description += `${this.random(this.timeDescriptions[context.timeOfDay] || [])}. `;
    }

    // Description du lieu
    description += this.generateMainDescription(type, typeData, context);

    // Éléments présents
    if (context.npcsPresent && context.npcsPresent.length > 0) {
      description += ` Vous apercevez ${context.npcsPresent.length} personne${context.npcsPresent.length > 1 ? 's' : ''}.`;
    }

    // Détails supplémentaires
    const details = this.generateDetails(type, typeData, context);
    if (details) description += ` ${details}`;

    return description;
  }

  generateMainDescription(type, typeData, context) {
    const templates = {
      city: (data) => {
        const size = this.random(data.sizes);
        const atm = this.random(data.atmospheres);
        return `Vous entrez dans une ${size} ville ${atm}.`;
      },
      forest: (data) => {
        const density = this.random(data.densities);
        const atm = this.random(data.atmospheres);
        return `Vous traversez une forêt ${density}, l\'atmosphère est ${atm}.`;
      },
      dungeon: (data) => {
        const state = this.random(data.states);
        const atm = this.random(data.atmospheres);
        return `Vous pénétrez dans un donjon ${state}, l\'air est ${atm}.`;
      },
      mountain: (data) => {
        const height = this.random(data.heights);
        return `Vous gravissez une ${height}.`;
      },
      tavern: (data) => {
        const quality = this.random(data.qualities);
        const atm = this.random(data.atmospheres);
        return `Vous entrez dans une taverne ${quality}, l\'ambiance est ${atm}.`;
      }
    };

    return templates[type] ? templates[type](typeData) : 'Vous arrivez dans un lieu étrange.';
  }

  generateDetails(type, typeData, context) {
    const feature = this.random(typeData.features);
    const detailTemplates = [
      `Vous remarquez ${feature}.`,
      `Un${feature.startsWith('a') || feature.startsWith('e') ? 'e' : ''} ${feature} attire votre attention.`,
      `Au loin, vous distinguez ${feature}.`
    ];
    return this.random(detailTemplates);
  }

  random(array) {
    return array[Math.floor(Math.random() * array.length)] || '';
  }
}

export default LocationGenerator;
