// ═══════════════════════════════════════════════════════════════════════
// 📖 NARRATIVE GENERATOR - Génération procédurale de narration
// ═══════════════════════════════════════════════════════════════════════

export class NarrativeGenerator {
  constructor() {
    // Connecteurs pour fluidifier la narration
    this.connectors = {
      time: ['Soudain', 'Quelques instants plus tard', 'Peu après', 'Au même moment'],
      contrast: ['Cependant', 'Toutefois', 'Néanmoins', 'Pourtant'],
      addition: ['De plus', 'En outre', 'Par ailleurs', 'Également'],
      consequence: ['Par conséquent', 'Ainsi', 'Donc', 'C\'est pourquoi']
    };

    // Formules narratives pour enrichir les réponses
    this.narrativeFormulas = {
      success: [
        "Ton action est couronnée de succès.",
        "Tu parviens à accomplir ton objectif.",
        "Tout se déroule comme prévu."
      ],
      failure: [
        "Malheureusement, tu échoues.",
        "Les choses ne se passent pas comme prévu.",
        "Tu rencontres un obstacle inattendu."
      ],
      partial: [
        "Tu obtiens un résultat mitigé.",
        "C'est un demi-succès.",
        "Les choses auraient pu mieux se passer."
      ]
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // 📝 ENRICHISSEMENT NARRATIF
  // ═══════════════════════════════════════════════════════════════════════

  enrich(baseText, context, options = {}) {
    let narrative = baseText;

    // Ajouter un connecteur si demandé
    if (options.connector) {
      const connectorList = this.connectors[options.connector] || this.connectors.time;
      const connector = this.randomPick(connectorList);
      narrative = `${connector}, ${narrative.charAt(0).toLowerCase()}${narrative.slice(1)}`;
    }

    // Ajouter des détails sensoriels
    if (options.addSensory && context.location) {
      const sensory = this.generateSensoryDetails(context);
      narrative += ` ${sensory}`;
    }

    // Ajouter une touche émotionnelle
    if (options.addEmotion && context.player) {
      const emotion = this.generateEmotionalNote(context);
      narrative += ` ${emotion}`;
    }

    return narrative;
  }

  generateSensoryDetails(context) {
    const details = [
      "L'air est frais et vivifiant.",
      "Une légère brise caresse ton visage.",
      "Le sol crisse sous tes pas.",
      "Une odeur familière flotte dans l'air.",
      "Le silence est presque palpable."
    ];

    if (context.location?.type === 'forest') {
      return this.randomPick([
        "Le chant des oiseaux remplit l'air.",
        "L'odeur de la terre humide t'enveloppe.",
        "Les feuilles bruissent doucement."
      ]);
    }

    return this.randomPick(details);
  }

  generateEmotionalNote(context) {
    const playerHP = context.player?.hp || 100;
    const maxHP = context.player?.maxHp || 100;
    const hpPercentage = (playerHP / maxHP) * 100;

    if (hpPercentage < 30) {
      return "Tu te sens affaibli.";
    }
    if (hpPercentage > 80) {
      return "Tu te sens en pleine forme.";
    }

    return "";
  }

  randomPick(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

export default NarrativeGenerator;
