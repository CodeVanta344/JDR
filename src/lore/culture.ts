export const CULTURAL_LORE = {
  CALENDAR: {
    months: [
      { name: "Solaura", season: "Hiver", desc: "Le mois du lever du soleil, marqué par des aubes éblouissantes sur la neige." },
      { name: "Givrefeu", season: "Hiver", desc: "Le froid le plus intense, nommé d'après la lueur bleue de la glace sous la lune." },
      { name: "Éveil-Vert", season: "Printemps", desc: "Le moment où la Sylve d'Émeraude commence à bourgeonner." },
      { name: "Pluiedor", season: "Printemps", desc: "Pluies fertiles qui apportent les premières fleurs au Val Doré." },
      { name: "Zénith", season: "Été", desc: "Le mois le plus chaud, où Solarius est au plus haut dans le ciel." },
      { name: "Moissombre", season: "Été", desc: "Le début des récoltes, finissant par des nuits de plus en plus longues." },
      { name: "Rougefeuille", season: "Automne", desc: "Les forêts se teintent d'ambre et de pourpre." },
      { name: "Voile-Gris", season: "Automne", desc: "Mois des brumes intenses, où l'on dit que le Miroir des Ombres est plus proche." }
    ],
    daysPerMonth: 28,
    weeksPerMonth: 4
  },
  FESTIVALS: [
    {
      name: "Lumière de Solarius",
      month: "Zénith",
      desc: "Un festival de trois jours célébrant la victoire sur l'hiver. Les villes sont décorées de bannières dorées et de lanternes solaires."
    },
    {
      name: "Nuit du Voile",
      month: "Voile-Gris",
      desc: "Une célébration solennelle où l'on honore les ancêtres. Les habitants portent des masques pour 'tromper' les esprits malveillants."
    },
    {
      name: "Banquet des Braves",
      month: "Givrefeu",
      desc: "Un grand festin dans les tavernes pour combattre le froid et se raconter des exploits héroïques de l'année passée."
    }
  ],
  IDIOMS: [
    { expression: "Chercher le maillon d'or", meaning: "Poursuivre un but impossible ou divin." },
    { expression: "Avoir le regard de l'Archiviste", meaning: "Être distrait par des détails inutiles ou être perdu dans ses pensées." },
    { expression: "Vendre du soufre à un Dragon", meaning: "Essayer de tromper quelqu'un sur son propre domaine d'expertise." },
    { expression: "Froid comme le cœur de Givrefeu", meaning: "Désigne une personne sans émotion ou impitoyable." },
    { expression: "Danser sur le fil du Voile", meaning: "Prendre des risques inconsidérés." }
  ],
  LINGUISTICS: {
    archaic_ashkan: {
      name: "Ashkan Archaïque",
      desc: "La langue de l'ancien Empire. Complexe, tonale et gravée dans la pierre magique.",
      common_words: [
        { word: "Sol", meaning: "Lumière/Vie" },
        { word: "Vask", meaning: "Sang/Lignage" },
        { word: "Kael", meaning: "Connaissance/Pierre" },
        { word: "Aura", meaning: "Protection/Ciel" }
      ]
    }
  }
};

export const getTimeOfDay = (hour: number): string => {
  if (hour >= 5 && hour < 8) return 'aube';
  if (hour >= 8 && hour < 18) return 'jour';
  if (hour >= 18 && hour < 21) return 'crépuscule';
  return 'nuit';
};

export const getTimePeriodDescription = (hour: number): string => {
  const period = getTimeOfDay(hour);
  switch (period) {
    case 'aube':
      return "Le soleil se lève à l'horizon, baignant le monde d'une lumière dorée et rasante.";
    case 'jour':
      return "Le soleil brille haut dans le ciel, illuminant le monde de sa chaleur.";
    case 'crépuscule':
      return "Le soleil décline, projetant de longues ombres et teintant le ciel d'orange et de pourpre.";
    case 'nuit':
      return "La nuit enveloppe le monde de son manteau d'étoiles.";
    default:
      return "";
  }
};

export const getMonthInfo = (dayOfYear: number) => {
  const monthIndex = Math.floor((dayOfYear - 1) / 28);
  const dayOfMonth = ((dayOfYear - 1) % 28) + 1;
  const month = CULTURAL_LORE.CALENDAR.months[monthIndex % 8];
  return {
    month: month?.name || 'Unknown',
    season: month?.season || 'Unknown',
    dayOfMonth
  };
};
