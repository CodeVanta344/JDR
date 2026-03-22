/**
 * AETHELGARD - EXPANSION CARTE DU MONDE
 * Lieux détaillés pour les 5 régions principales
 * 30 lieux avec PNJ notables, connexions et chemins
 */

// ============================================================================
// TYPES
// ============================================================================

export type ExpLocationtype =
  | 'city'
  | 'capital'
  | 'town'
  | 'village'
  | 'dungeon'
  | 'landmark'
  | 'ruin'
  | 'natural'
  | 'fortress'
  | 'temple'
  | 'special';

export type ExpDangerLevel = 'safe' | 'low' | 'medium' | 'high' | 'extreme' | 'deadly';

export type ExpTerrainType =
  | 'road'
  | 'trail'
  | 'mountain'
  | 'forest'
  | 'desert'
  | 'coastal'
  | 'underground'
  | 'swamp'
  | 'river';

export interface ExpMapLocation {
  id: string;
  name: string;
  description: string;
  region: string;
  coordinates: { x: number; y: number };
  type: ExpLocationtype;
  dangerLevel: ExpDangerLevel;
  level: string;
  notableNPCs: {
    name: string;
    role: string;
    description: string;
  }[];
  connectedTo: string[];
  icon: string;
  services?: string[];
  population?: number;
  lore?: string;
  pointsOfInterest?: {
    name: string;
    description: string;
  }[];
  economy?: {
    wealth: 'poor' | 'modest' | 'prosperous' | 'wealthy';
    mainExports?: string[];
    mainImports?: string[];
  };
  controlledBy?: string;
}

export interface ExpMapPath {
  id: string;
  from: string;
  to: string;
  distance: number; // en km
  terrain: ExpTerrainType;
  dangerLevel: ExpDangerLevel;
  travelDays: number;
  description: string;
  encounters?: string[];
}

// ============================================================================
// VAL DORÉ - Plaines fertiles et cœur politique d'Aethelgard
// ============================================================================

export const MAP_EXPANSION_LOCATIONS: ExpMapLocation[] = [

  // ── VAL DORÉ ──────────────────────────────────────────────────────────────

  {
    id: 'sol-aureus-expanded',
    name: 'Sol-Aureus (Districts détaillés)',
    description: `Capitale dorée d'Aethelgard, cité de 150 000 âmes bâtie sur sept collines. Ses murailles de pierre blanche brillent au soleil couchant. La ville est divisée en six districts distincts, chacun avec son caractère propre.`,
    region: 'val-dore',
    coordinates: { x: 48, y: 40 },
    type: 'capital',
    dangerLevel: 'safe',
    level: '1+',
    population: 150000,
    notableNPCs: [
      { name: 'Roi Aldric III', role: 'Souverain', description: 'Monarque vieillissant, hanté par la menace des Sceaux brisés. Juste mais hésitant face aux décisions difficiles.' },
      { name: 'Archimage Elara Solveig', role: 'Conseillère royale', description: 'Haute-mage de la Tour Solaire, experte en magie de protection. Soupçonne une conspiration au sein du Conseil.' },
      { name: 'Capitaine Veron Ashford', role: 'Chef de la Garde Royale', description: 'Vétéran incorruptible, cicatrice sur l\'œil gauche. Ancien compagnon d\'aventure du roi.' },
      { name: 'Maîtresse Lysandra', role: 'Directrice de la Guilde des Marchands', description: 'Femme d\'affaires redoutable, réseau d\'espions commercial étendu. Connaît tous les secrets de la cité.' },
      { name: 'Frère Mathieu', role: 'Grand Prêtre du Temple de Solarius', description: 'Guérisseur renommé, gardien de reliques sacrées. Cache un lourd secret sur les origines des Sceaux.' },
      { name: 'Korin "La Fouine"', role: 'Chef de la Guilde des Voleurs', description: 'Halfelin insaisissable, opère depuis les égouts. Loyal envers les siens, impitoyable envers les traîtres.' }
    ],
    connectedTo: ['pontdore', 'village-orval', 'ferme-deux-rivieres', 'abbaye-solarius', 'ruines-pont-ancien'],
    icon: '👑',
    services: ['auberge', 'forge', 'temple', 'guilde', 'marché', 'banque', 'bibliothèque', 'arène'],
    pointsOfInterest: [
      { name: 'District de la Couronne', description: 'Palais royal, résidences nobles, jardins suspendus. Accès restreint sans invitation.' },
      { name: 'District du Commerce', description: 'Grand marché, entrepôts, guilde des marchands. Plus de 200 échoppes permanentes.' },
      { name: 'District des Arts', description: 'Théâtre de l\'Aube, académie bardique, ateliers d\'artisans de luxe.' },
      { name: 'District du Temple', description: 'Temple de Solarius, hospice, jardin de méditation. Centre spirituel de la cité.' },
      { name: 'District des Forges', description: 'Quartier des artisans, forge royale, ateliers d\'alchimie. Fumée et bruit constants.' },
      { name: 'Les Bas-Fonds', description: 'Quartier pauvre, tavernes louches, marché noir. La Guilde des Voleurs y règne.' }
    ],
    economy: {
      wealth: 'wealthy',
      mainExports: ['Blé', 'Vin', 'Artisanat de luxe', 'Produits magiques'],
      mainImports: ['Minerai nain', 'Bois elfique', 'Épices maritimes', 'Gemmes']
    },
    controlledBy: 'couronne-aethelgard',
    lore: `Fondée il y a huit siècles après la chute de l'Hégémonie d'Ashka, Sol-Aureus fut bâtie sur les ruines d'un ancien temple solaire. Les Sept Fondateurs y scellèrent le Pacte Doré, unissant les peuples libres contre la menace de l'Ombre. Chaque pierre de la muraille extérieure porte une rune de protection gravée par les premiers archimages.`
  },

  {
    id: 'pontdore',
    name: 'Pontdoré',
    description: `Ville-pont enjambant la rivière Aureline, connue pour ses orfèvres et ses joailliers. Le célèbre Pont d'Or, couvert de boutiques, attire marchands et voyageurs de tout le continent.`,
    region: 'val-dore',
    coordinates: { x: 44, y: 35 },
    type: 'town',
    dangerLevel: 'safe',
    level: '1+',
    population: 12000,
    notableNPCs: [
      { name: 'Maître Orlan Dorémis', role: 'Maître-Orfèvre', description: 'Artisan légendaire, seul capable de travailler l\'or solaire. Vieillard excentrique qui ne travaille que les nuits de pleine lune.' },
      { name: 'Prévôte Camille de Verne', role: 'Gouverneure', description: 'Administratrice efficace, ancienne aventurière reconvertie. Protège farouchement l\'indépendance commerciale de sa ville.' }
    ],
    connectedTo: ['sol-aureus-expanded', 'village-orval', 'ferme-deux-rivieres'],
    icon: '🌉',
    services: ['auberge', 'forge', 'marché', 'joaillier'],
    economy: {
      wealth: 'prosperous',
      mainExports: ['Bijoux', 'Orfèvrerie', 'Or travaillé'],
      mainImports: ['Gemmes brutes', 'Nourriture', 'Métaux précieux']
    },
    lore: `Le Pont d'Or fut construit par des nains et des humains ensemble, symbole de l'alliance entre les deux peuples. On dit que les fondations contiennent un fragment de Sceau qui protège la ville des inondations.`
  },

  {
    id: 'village-orval',
    name: 'Village d\'Orval',
    description: `Paisible village agricole niché dans un vallon doré. Célèbre pour son vin ambré "Cru d'Orval" et ses vergers centenaires. Point de départ idéal pour les aventuriers débutants.`,
    region: 'val-dore',
    coordinates: { x: 52, y: 45 },
    type: 'village',
    dangerLevel: 'safe',
    level: '1+',
    population: 800,
    notableNPCs: [
      { name: 'Ancien Gaston Bléterre', role: 'Doyen du village', description: 'Vieil agriculteur sage, connaît tous les secrets et légendes locales. Ancien soldat qui cache des cicatrices sous ses vêtements de paysan.' },
      { name: 'Aubergiste Margot', role: 'Tenancière de l\'Épi Doré', description: 'Femme chaleureuse, cuisine exceptionnelle. Son auberge est le cœur social du village et un refuge pour voyageurs fatigués.' }
    ],
    connectedTo: ['sol-aureus-expanded', 'pontdore', 'ferme-deux-rivieres'],
    icon: '🏡',
    services: ['auberge', 'marché'],
    economy: {
      wealth: 'modest',
      mainExports: ['Vin ambré', 'Blé', 'Fruits'],
      mainImports: ['Outils', 'Tissus']
    },
    lore: `Le village tire son nom de la légende selon laquelle un dragon d'or y aurait autrefois enterré son trésor. Chaque année, le Festival de la Moisson attire des visiteurs de toute la région.`
  },

  {
    id: 'ferme-deux-rivieres',
    name: 'Ferme des Deux-Rivières',
    description: `Grande exploitation agricole au confluent de l'Aureline et du Ruisseau d'Argent. Fournit une part importante des vivres de Sol-Aureus. Récemment menacée par des disparitions mystérieuses de bétail.`,
    region: 'val-dore',
    coordinates: { x: 50, y: 48 },
    type: 'landmark',
    dangerLevel: 'low',
    level: '1+',
    population: 150,
    notableNPCs: [
      { name: 'Fermier Bertrand Delarive', role: 'Propriétaire', description: 'Homme robuste et inquiet, ses bêtes disparaissent la nuit. Offre une récompense à quiconque résout le mystère.' },
      { name: 'Druide Vert Sylvain', role: 'Gardien de la nature', description: 'Demi-elfe discret vivant dans une cabane au bord de la rivière. Sait que la corruption des Terres Brûlées s\'étend lentement.' }
    ],
    connectedTo: ['sol-aureus-expanded', 'pontdore', 'village-orval'],
    icon: '🌾',
    services: ['auberge'],
    lore: `Le confluent des deux rivières est un lieu de pouvoir naturel. Les druides y accomplissaient des rituels bien avant la fondation de Sol-Aureus. Un ancien menhir couvert de mousse se dresse encore au centre de la ferme.`
  },

  {
    id: 'abbaye-solarius',
    name: 'Abbaye de Solarius',
    description: `Monastère fortifié dédié au dieu solaire Solarius, perché sur une colline dominant le Val Doré. Centre de savoir, de guérison et de formation des prêtres-guerriers. Bibliothèque contenant des textes datant de l'Ère des Cendres.`,
    region: 'val-dore',
    coordinates: { x: 55, y: 38 },
    type: 'temple',
    dangerLevel: 'safe',
    level: '2+',
    population: 300,
    notableNPCs: [
      { name: 'Abbesse Célestine d\'Aurélie', role: 'Haute Prêtresse', description: 'Femme austère mais compatissante, détient des prophéties concernant la rupture des Sceaux. Peut accorder la bénédiction solaire.' },
      { name: 'Frère Ignace', role: 'Bibliothécaire', description: 'Moine érudit obsédé par les textes anciens. A découvert des références inquiétantes à l\'Entité dans des manuscrits pré-Ashka.' },
      { name: 'Sœur Valorine', role: 'Maître d\'armes', description: 'Paladin formant les novices au combat. Ancienne chasseuse de morts-vivants, porte une épée bénie.' }
    ],
    connectedTo: ['sol-aureus-expanded', 'ruines-pont-ancien'],
    icon: '⛪',
    services: ['temple', 'bibliothèque', 'herboriste', 'forge'],
    pointsOfInterest: [
      { name: 'Bibliothèque des Origines', description: 'Collection de 10 000 ouvrages, dont certains en langue ashkane. Accès restreint au sous-sol.' },
      { name: 'Jardin de Guérison', description: 'Herbes médicinales rares cultivées sous bénédiction divine. Potions de guérison à prix réduit.' },
      { name: 'Cryptes des Fondateurs', description: 'Tombeaux des premiers prêtres de Solarius. Rumeurs de passages secrets menant sous Sol-Aureus.' }
    ],
    lore: `L'Abbaye fut fondée immédiatement après la Chute d'Ashka par des survivants qui avaient vu la lumière du dieu solaire percer les ténèbres. Le vitrail principal représente la scène où Solarius repoussa l'Entité dans le Néant.`
  },

  {
    id: 'ruines-pont-ancien',
    name: 'Ruines du Pont-Ancien',
    description: `Vestiges d'un pont colossal datant de l'Hégémonie d'Ashka, effondré depuis des siècles. Les arches brisées s'élèvent encore à trente mètres au-dessus du ravin. Lieu de rendez-vous pour contrebandiers et repaire de créatures nocturnes.`,
    region: 'val-dore',
    coordinates: { x: 46, y: 50 },
    type: 'ruin',
    dangerLevel: 'medium',
    level: '3+',
    notableNPCs: [
      { name: 'Renna "Pont-de-Corde"', role: 'Contrebandière', description: 'Halfeline agile tenant un pont de corde improvisé entre les arches. Fait payer le passage et vend des informations.' },
      { name: 'Spectre de l\'Architecte', role: 'Fantôme', description: 'Esprit de l\'architecte ashkan qui conçut le pont. Apparaît les nuits de brume et murmure des indices sur des trésors cachés.' }
    ],
    connectedTo: ['sol-aureus-expanded', 'abbaye-solarius'],
    icon: '🏚️',
    pointsOfInterest: [
      { name: 'Chambre du Pilier Nord', description: 'Salle secrète dans le pilier principal, accessible par escalade. Contient des glyphes ashkans.' },
      { name: 'Le Ravin des Échos', description: 'Le fond du ravin résonne étrangement. Des voix semblent murmurer des mots en langue ancienne.' }
    ],
    lore: `Ce pont reliait autrefois Sol-Aureus aux montagnes. Sa destruction lors de la Chute isola les nains pendant une génération entière. On dit que l'Architecte l'avait conçu pour résister à tout, sauf à la magie qui le détruisit.`
  },

  // ── MONTS CŒUR-DE-FER ────────────────────────────────────────────────────

  {
    id: 'hammerdeep-expanded',
    name: 'Hammerdeep (Cité Naine)',
    description: `Capitale naine creusée dans le cœur de la montagne Fer-de-Lance. Cinquante mille nains y vivent dans des halls immenses éclairés par des cristaux lumineux. Les forges de Hammerdeep sont les plus réputées du continent.`,
    region: 'monts-coeur-de-fer',
    coordinates: { x: 78, y: 30 },
    type: 'capital',
    dangerLevel: 'safe',
    level: '3+',
    population: 50000,
    notableNPCs: [
      { name: 'Thane Brokk Marteaudacier', role: 'Roi des Nains', description: 'Dirigeant pragmatique et têtu, forgeron accompli. Refuse de croire aux menaces tant qu\'il ne les voit pas de ses propres yeux.' },
      { name: 'Maître-Forge Hilda Rougefeu', role: 'Cheffe des Forges', description: 'Naine prodigieuse capable de forger le mithral. Seule artisane vivante à connaître le secret de l\'acier ashkan.' },
      { name: 'Thane-Guerrier Durak Brise-Roc', role: 'Commandant militaire', description: 'Vétéran couvert de cicatrices, défenseur légendaire. A repoussé trois invasions orques à lui seul selon les chants.' },
      { name: 'Maîtresse des Runes Elda', role: 'Enchanteresse', description: 'Plus vieille naine vivante (487 ans), détient les secrets des runes de forge. Excentrique, parle aux pierres.' }
    ],
    connectedTo: ['forgefer', 'col-dragon', 'mines-mithral', 'temple-forge', 'caverne-cristal'],
    icon: '⛏️',
    services: ['auberge', 'forge', 'marché', 'banque', 'runiste', 'brasserie'],
    pointsOfInterest: [
      { name: 'La Grande Forge', description: 'Forge alimentée par un flux de lave contrôlé. Peut fondre n\'importe quel métal connu.' },
      { name: 'Hall des Ancêtres', description: 'Immense caverne ornée de statues des thanes passés. Les échos portent les voix des morts.' },
      { name: 'Le Marché Profond', description: 'Bazar souterrain où l\'on trouve des gemmes, métaux rares et bières de 200 ans d\'âge.' },
      { name: 'Arsenal de Guerre', description: 'Réserve d\'armes et d\'armures suffisante pour équiper 10 000 guerriers. Accès très restreint.' }
    ],
    economy: {
      wealth: 'wealthy',
      mainExports: ['Armes', 'Armures', 'Gemmes', 'Bière naine', 'Outils enchantés'],
      mainImports: ['Nourriture', 'Bois', 'Tissus', 'Herbes']
    },
    controlledBy: 'royaume-nain',
    lore: `Hammerdeep fut fondée il y a plus de deux mille ans quand les nains découvrirent le cœur de fer au centre de la montagne — un météore géant contenant des métaux inconnus. C'est ce cœur qui donne son nom aux montagnes et alimente les forges les plus chaudes du monde.`
  },

  {
    id: 'forgefer',
    name: 'Forgefer',
    description: `Avant-poste fortifié nain à l'entrée des Monts Cœur-de-Fer. Première ligne de défense et checkpoint commercial. Les marchandises transitant vers Hammerdeep y sont inspectées et taxées.`,
    region: 'monts-coeur-de-fer',
    coordinates: { x: 72, y: 32 },
    type: 'fortress',
    dangerLevel: 'low',
    level: '3+',
    population: 5000,
    notableNPCs: [
      { name: 'Gardien Thorin Porteferrée', role: 'Commandant de la garnison', description: 'Nain méfiant mais honorable. Verrouille les portes au crépuscule sans exception, même pour le Thane.' },
      { name: 'Marchande Greta Pièce-Sonnante', role: 'Négociante', description: 'Naine corpulente gérant le bureau de douane. Dure en affaires mais connaît la valeur exacte de tout objet.' }
    ],
    connectedTo: ['hammerdeep-expanded', 'col-dragon'],
    icon: '🏰',
    services: ['auberge', 'forge', 'marché'],
    lore: `Forgefer tire son nom de la porte principale, un battant de fer massif forgé en une seule pièce. On dit qu'aucune armée n'a jamais franchi cette porte sans y être invitée.`
  },

  {
    id: 'col-dragon',
    name: 'Col du Dragon',
    description: `Passage périlleux entre deux pics où les vents soufflent avec la violence d'un dragon. Seul chemin praticable reliant les versants est et ouest des Monts Cœur-de-Fer. Des ossements géants parsèment le sentier.`,
    region: 'monts-coeur-de-fer',
    coordinates: { x: 80, y: 25 },
    type: 'natural',
    dangerLevel: 'high',
    level: '8+',
    notableNPCs: [
      { name: 'Ermite Zharak', role: 'Ancien chasseur de dragons', description: 'Demi-orc vieillissant vivant dans une grotte du col. Connaît les habitudes des dragons et peut vendre des informations.' },
      { name: 'Kael Ventegivre', role: 'Guide de montagne', description: 'Humain taciturne, seul guide capable de traverser le col en hiver. Prix exorbitants mais survie garantie.' }
    ],
    connectedTo: ['hammerdeep-expanded', 'forgefer', 'mines-mithral'],
    icon: '🐉',
    pointsOfInterest: [
      { name: 'Ossements de Vyraxion', description: 'Squelette d\'un dragon ancien, long de 80 mètres. Ses os irradient encore de magie.' },
      { name: 'Nid Abandonné', description: 'Ancienne tanière de dragon contenant peut-être un œuf oublié.' }
    ],
    lore: `Le Col doit son nom au dragon Vyraxion qui y résidait il y a cinq cents ans. Tué par une alliance de nains et d'elfes, son cadavre pétrifié sert aujourd'hui de pont naturel au-dessus du gouffre le plus profond.`
  },

  {
    id: 'mines-mithral',
    name: 'Mines de Mithral',
    description: `Complexe minier profond où l'on extrait le précieux mithral, le métal le plus léger et résistant connu. Les tunnels les plus profonds sont fermés depuis qu'on y a réveillé quelque chose.`,
    region: 'monts-coeur-de-fer',
    coordinates: { x: 85, y: 28 },
    type: 'dungeon',
    dangerLevel: 'high',
    level: '7+',
    notableNPCs: [
      { name: 'Contremaître Baldur Noirpioche', role: 'Chef des mines', description: 'Nain obsédé par les quotas de production. Cache la vérité sur ce qui se cache dans les niveaux inférieurs.' },
      { name: 'Géologue Mira Cristalline', role: 'Experte en minerais', description: 'Gnome curieuse étudiant les veines de mithral. A découvert que le métal semble réagir à la magie des Sceaux.' }
    ],
    connectedTo: ['hammerdeep-expanded', 'col-dragon'],
    icon: '💎',
    pointsOfInterest: [
      { name: 'Veine Principale', description: 'Filon de mithral large de 3 mètres, le plus riche jamais découvert.' },
      { name: 'Niveau Scellé', description: 'Tunnels barricadés d\'où proviennent des grondements. Les mineurs refusent d\'y descendre.' },
      { name: 'Lac Souterrain', description: 'Lac d\'eau cristalline à 500 mètres de profondeur. Des lueurs étranges dansent sous la surface.' }
    ],
    lore: `Les Mines de Mithral sont exploitées depuis la fondation de Hammerdeep. Mais les nains savent que le mithral n'est pas un minerai ordinaire — c'est le sang cristallisé de la montagne elle-même. Prendre trop risque de réveiller le Cœur-de-Fer.`
  },

  {
    id: 'temple-forge',
    name: 'Temple de la Forge',
    description: `Sanctuaire nain dédié à Moradin, dieu des forges et des artisans. Bâti autour d'une forge sacrée qui brûle sans combustible depuis deux millénaires. Lieu de pèlerinage pour tous les artisans du continent.`,
    region: 'monts-coeur-de-fer',
    coordinates: { x: 76, y: 35 },
    type: 'temple',
    dangerLevel: 'safe',
    level: '4+',
    population: 500,
    notableNPCs: [
      { name: 'Grand-Prêtre Grimm Flamme-Éternelle', role: 'Gardien de la Forge Sacrée', description: 'Nain vénérable dont la barbe est roussie par des siècles près de la forge. Peut bénir les armes avec le feu divin.' },
      { name: 'Vestale Inga', role: 'Gardienne des Flammes', description: 'Jeune naine vouée au silence, entretient la forge sacrée. On murmure qu\'elle reçoit des visions dans les flammes.' }
    ],
    connectedTo: ['hammerdeep-expanded', 'caverne-cristal'],
    icon: '🔥',
    services: ['temple', 'forge', 'enchanteur'],
    lore: `La Forge Sacrée brûle depuis le jour où Moradin frappa l'enclume du monde, selon la légende naine. L'arme forgée dans ses flammes ne peut être brisée par aucune force mortelle. Un seul objet y est forgé par génération.`
  },

  {
    id: 'caverne-cristal',
    name: 'Caverne de Cristal',
    description: `Grotte naturelle tapissée de cristaux géants qui chantent quand le vent les traverse. Les cristaux réagissent à la magie et amplifient les sorts lancés à proximité. Lieu dangereux mais source de composants magiques rares.`,
    region: 'monts-coeur-de-fer',
    coordinates: { x: 82, y: 38 },
    type: 'natural',
    dangerLevel: 'medium',
    level: '5+',
    notableNPCs: [
      { name: 'Cristallomancien Fenn', role: 'Chercheur', description: 'Elfe obsédé par les propriétés magiques des cristaux. Vit dans la caverne depuis 40 ans et connaît chaque recoin.' },
      { name: 'Gardien de Pierre Grolm', role: 'Golem conscient', description: 'Golem de cristal doué de conscience, gardien ancestral de la caverne. Communique par vibrations.' }
    ],
    connectedTo: ['hammerdeep-expanded', 'temple-forge'],
    icon: '💎',
    pointsOfInterest: [
      { name: 'Chœur de Cristal', description: 'Formation naturelle où des centaines de cristaux produisent une harmonie continue. Méditer ici octroie des visions.' },
      { name: 'Cœur de la Caverne', description: 'Cristal géant de 10 mètres au centre. On dit qu\'il est un fragment du Sceau des Montagnes.' }
    ],
    lore: `Les cristaux de cette caverne ne sont pas naturels — ce sont des éclats du premier Sceau, celui qui emprisonna les élémentaires dans la pierre. Quand un Sceau se brise ailleurs, les cristaux gémissent.`
  },

  // ── SYLVE D'ÉMERAUDE ─────────────────────────────────────────────────────

  {
    id: 'yggdrasylve',
    name: 'Yggdrasylve (Arbre-Monde)',
    description: `Arbre titanesque dont la cime perce les nuages et dont les racines plongent dans d'autres plans d'existence. Centre spirituel des elfes et nexus de magie naturelle le plus puissant d'Aethelgard. Une cité elfique est construite dans ses branches.`,
    region: 'sylve-emeraude',
    coordinates: { x: 12, y: 45 },
    type: 'special',
    dangerLevel: 'low',
    level: '5+',
    population: 3000,
    notableNPCs: [
      { name: 'Archidruide Nyssa Feuille-de-Lune', role: 'Gardienne de l\'Arbre-Monde', description: 'Elfe millénaire, voix de la forêt. Sent la corruption se propager et cherche désespérément des champions.' },
      { name: 'Sentinelle Thalas Ombreverte', role: 'Chef des Sentinelles', description: 'Rôdeur elfe silencieux, protège les frontières de la Sylve. Méfiant envers les non-elfes mais respecte la bravoure.' },
      { name: 'Tisseuse d\'Écorce Aelindra', role: 'Enchanteresse', description: 'Dryade liée à l\'Arbre-Monde, peut façonner le bois vivant en armes et armures. Exige un service à la forêt en paiement.' }
    ],
    connectedTo: ['clairiere-anciens', 'village-feuillevent', 'bosquet-corrompu', 'lac-miroir'],
    icon: '🌳',
    services: ['temple', 'herboriste', 'enchanteur'],
    pointsOfInterest: [
      { name: 'Cité des Branches', description: 'Habitations elfiques suspendues reliées par des ponts de lianes. Architecture vivante qui pousse et évolue.' },
      { name: 'Racines Planaires', description: 'Les racines les plus profondes touchent le Plan Féérique. Des portails s\'ouvrent parfois sans prévenir.' },
      { name: 'Sanctuaire du Cœur', description: 'Cavité au centre du tronc où bat le cœur de l\'Arbre. Interdit à tous sauf l\'Archidruide.' }
    ],
    lore: `Yggdrasylve fut planté par les dieux eux-mêmes pour ancrer la réalité après le Chaos Primordial. Ses racines maintiennent les plans d'existence séparés. Si l'Arbre meurt, les barrières entre les mondes s'effondreraient.`
  },

  {
    id: 'clairiere-anciens',
    name: 'Clairière des Anciens',
    description: `Cercle sacré de menhirs au cœur de la Sylve, lieu de conseil des druides et des esprits de la forêt. Ici, le voile entre le monde matériel et le monde des esprits est mince comme du papier.`,
    region: 'sylve-emeraude',
    coordinates: { x: 15, y: 42 },
    type: 'landmark',
    dangerLevel: 'low',
    level: '4+',
    notableNPCs: [
      { name: 'Esprit du Chêne Ancien', role: 'Oracle', description: 'Esprit millénaire d\'un chêne mort, apparaît sous forme de silhouette lumineuse. Répond en énigmes mais ne ment jamais.' },
      { name: 'Druide Rowan Cendreterre', role: 'Gardien du Cercle', description: 'Humain adopté par les elfes, protège la clairière. Peut communiquer avec les esprits animaux.' }
    ],
    connectedTo: ['yggdrasylve', 'village-feuillevent', 'ruines-elfiques'],
    icon: '🪨',
    pointsOfInterest: [
      { name: 'Pierre de Vision', description: 'Menhir central qui octroie des visions du passé à ceux qui le touchent sous la pleine lune.' },
      { name: 'Source des Esprits', description: 'Petit bassin naturel dont l\'eau guérit les malédictions. Ne fonctionne qu\'une fois par personne.' }
    ],
    lore: `Les menhirs furent dressés par les premiers elfes pour communiquer avec les dieux. Chaque pierre représente un aspect du monde naturel et porte les noms des druides qui y ont sacrifié leur vie pour la forêt.`
  },

  {
    id: 'village-feuillevent',
    name: 'Village de Feuillevent',
    description: `Village elfique construit dans les arbres, spécialisé dans l'artisanat du bois vivant et la culture d'herbes médicinales. Les maisons poussent littéralement depuis les branches des arbres géants.`,
    region: 'sylve-emeraude',
    coordinates: { x: 18, y: 48 },
    type: 'village',
    dangerLevel: 'safe',
    level: '2+',
    population: 600,
    notableNPCs: [
      { name: 'Herboriste Lirien', role: 'Guérisseuse', description: 'Elfe douce et savante, connaît chaque plante de la Sylve. Fournit des potions à prix d\'amie aux défenseurs de la forêt.' },
      { name: 'Artisan Kael Arc-de-Lune', role: 'Fabricant d\'arcs', description: 'Elfe taciturne créant les meilleurs arcs du monde. Chaque arc est fait de bois vivant et ne fonctionne que pour son propriétaire.' }
    ],
    connectedTo: ['yggdrasylve', 'clairiere-anciens', 'bosquet-corrompu', 'lac-miroir'],
    icon: '🏡',
    services: ['auberge', 'herboriste', 'marché'],
    economy: {
      wealth: 'modest',
      mainExports: ['Herbes médicinales', 'Arcs elfiques', 'Bois vivant'],
      mainImports: ['Métal', 'Outils', 'Livres']
    },
    lore: `Feuillevent est le village le plus accueillant envers les non-elfes dans la Sylve. Sa fondatrice, une demi-elfe, croyait fermement à l'union des peuples face aux ténèbres.`
  },

  {
    id: 'bosquet-corrompu',
    name: 'Bosquet Corrompu',
    description: `Zone de la Sylve où la végétation a noirci et pourri, contaminée par l'influence d'un Sceau fissuré. Les arbres suintent une sève noire et les animaux y deviennent hostiles et déformés. La corruption s'étend lentement.`,
    region: 'sylve-emeraude',
    coordinates: { x: 20, y: 52 },
    type: 'dungeon',
    dangerLevel: 'high',
    level: '7+',
    notableNPCs: [
      { name: 'Ombre de Dryade Morrigan', role: 'Dryade corrompue', description: 'Ancienne gardienne du bosquet, transformée par la corruption. Alterne entre lucidité et folie, supplie qu\'on la libère.' },
      { name: 'Chasseur Fennir', role: 'Rôdeur solitaire', description: 'Humain qui a juré de purifier le bosquet. Campement à la lisière, cherche des alliés pour une expédition au cœur.' }
    ],
    connectedTo: ['yggdrasylve', 'village-feuillevent'],
    icon: '☠️',
    pointsOfInterest: [
      { name: 'Cœur de la Corruption', description: 'Clairière où un fragment de Sceau brisé pulse d\'énergie sombre. Source de toute la contamination.' },
      { name: 'Nid des Araignées de Brume', description: 'Toiles géantes entre les arbres morts, repaire d\'araignées corrompues.' },
      { name: 'Autel Profané', description: 'Ancien autel druidique recouvert de champignons noirs. Émet une aura de terreur.' }
    ],
    lore: `Le Bosquet était autrefois le plus beau jardin de la Sylve. Quand le troisième Sceau se fissura, l'énergie corruptrice trouva un chemin jusqu'ici à travers les racines de l'Arbre-Monde. Si la corruption atteint Yggdrasylve, la forêt entière périra.`
  },

  {
    id: 'lac-miroir',
    name: 'Lac Miroir',
    description: `Lac d'une pureté surnaturelle dont la surface reflète non pas le ciel, mais le Plan Féérique. Les fées y dansent au clair de lune et les ondines protègent ses eaux. Lieu de divination et de passage entre les mondes.`,
    region: 'sylve-emeraude',
    coordinates: { x: 10, y: 50 },
    type: 'natural',
    dangerLevel: 'medium',
    level: '5+',
    notableNPCs: [
      { name: 'Ondine Mélusine', role: 'Gardienne du Lac', description: 'Esprit aquatique ancienne, peut accorder des visions de l\'avenir en échange d\'un souvenir précieux.' },
      { name: 'Pêcheur Fantôme Aldwin', role: 'Spectre bienveillant', description: 'Fantôme d\'un pêcheur noyé il y a 200 ans. Guide les voyageurs perdus mais ne peut quitter les berges.' }
    ],
    connectedTo: ['yggdrasylve', 'village-feuillevent'],
    icon: '🌊',
    pointsOfInterest: [
      { name: 'Île de Verre', description: 'Petite île au centre du lac, accessible uniquement par barque féérique. Portal vers le Plan Féérique.' },
      { name: 'Cascade Chantante', description: 'Chute d\'eau dont le bruit forme des mélodies. Certains y entendent des prophéties.' }
    ],
    lore: `Le Lac Miroir est un œil du monde — un point où la réalité est si fine que l'on peut voir d'autres plans. Les fées l'utilisent pour observer le monde mortel, et les mortels audacieux peuvent y entrevoir leur destin.`
  },

  {
    id: 'ruines-elfiques',
    name: 'Ruines Elfiques',
    description: `Vestiges d'une cité elfique détruite lors de la Guerre des Sceaux. Des tours brisées de pierre blanche et de bois pétrifié se dressent parmi les arbres. Des gardiens magiques errent encore entre les décombres.`,
    region: 'sylve-emeraude',
    coordinates: { x: 8, y: 40 },
    type: 'ruin',
    dangerLevel: 'high',
    level: '8+',
    notableNPCs: [
      { name: 'Gardien Spectral Aerandir', role: 'Dernier défenseur', description: 'Spectre d\'un chevalier elfe, protège encore les ruines trois mille ans après sa mort. Honorable, peut être raisonné.' },
      { name: 'Exploratrice Thessa', role: 'Archéologue', description: 'Demi-elfe passionnée d\'histoire, campe aux abords. Cherche la Bibliothèque Perdue d\'Aerenthil.' }
    ],
    connectedTo: ['clairiere-anciens'],
    icon: '🏛️',
    pointsOfInterest: [
      { name: 'Tour de la Mémoire', description: 'Tour partiellement intacte, les murs racontent l\'histoire elfique en images mouvantes.' },
      { name: 'Bibliothèque d\'Aerenthil', description: 'Enfouie sous les ruines, contient des savoirs perdus sur les Sceaux. Entrée piégée.' },
      { name: 'Fontaine du Temps', description: 'Fontaine magique qui montre des scènes du passé de la cité à quiconque y verse une larme.' }
    ],
    lore: `La cité d'Aerenthil était le plus grand centre de savoir elfique avant la Chute. Sa destruction par les forces d'Ashka reste la plus grande tragédie de l'histoire elfique. On dit que sa bibliothèque contient le secret pour restaurer les Sceaux.`
  },

  // ── CÔTE DES ORAGES ──────────────────────────────────────────────────────

  {
    id: 'port-tempete',
    name: 'Port-Tempête (Cité Libre)',
    description: `Cité portuaire indépendante gouvernée par un conseil de capitaines. Plaque tournante du commerce maritime, repaire de pirates réformés et de marchands audacieux. Les tempêtes magiques qui frappent la côte épargnent mystérieusement le port.`,
    region: 'cote-des-orages',
    coordinates: { x: 25, y: 15 },
    type: 'city',
    dangerLevel: 'low',
    level: '2+',
    population: 35000,
    notableNPCs: [
      { name: 'Capitaine-Amiral Isabeau Vague-Noire', role: 'Première du Conseil', description: 'Ancienne pirate devenue dirigeante respectée. Épée enchantée, perroquet mécanique, sens politique aiguisé.' },
      { name: 'Marchand-Prince Rashid al-Nadir', role: 'Maître des Échanges', description: 'Négociant étranger richissime, réseau commercial s\'étendant au-delà des mers connues. Toujours souriant, jamais honnête.' },
      { name: 'Maîtresse des Vagues Ondine', role: 'Sorcière marine', description: 'Femme-poisson solitaire protégeant le port des tempêtes. Exige un tribut annuel de perles noires.' },
      { name: 'Capitaine Morrow "Le Crochet"', role: 'Chef des Corsaires', description: 'Vétéran balafré, main de fer enchantée. Loyal au Conseil mais nostalgique de sa vie de pirate.' }
    ],
    connectedTo: ['baie-naufrageurs', 'phare-abandonne', 'temple-englouti', 'iles-pirates', 'village-brisants'],
    icon: '⚓',
    services: ['auberge', 'forge', 'marché', 'port', 'guilde', 'taverne', 'chantier naval'],
    pointsOfInterest: [
      { name: 'Le Conseil des Vents', description: 'Tour où siège le conseil des capitaines. Les décisions se prennent à la majorité... ou au duel.' },
      { name: 'Marché aux Poissons', description: 'Plus grand marché maritime du continent. On y trouve des créatures des profondeurs et des artefacts repêchés.' },
      { name: 'Taverne du Kraken Borgne', description: 'Taverne légendaire où les marins partagent histoires et contrats. Bière la moins chère, bagarre la plus fréquente.' },
      { name: 'Cale Sèche Enchantée', description: 'Chantier naval utilisant la magie pour réparer les navires. Peut renforcer une coque en une nuit.' }
    ],
    economy: {
      wealth: 'prosperous',
      mainExports: ['Poisson', 'Sel', 'Perles', 'Marchandises exotiques'],
      mainImports: ['Bois', 'Métal', 'Armes', 'Vivres']
    },
    controlledBy: 'conseil-des-capitaines',
    lore: `Port-Tempête fut fondée par des pirates et des marchands fuyant la tyrannie d'Ashka. Le Pacte des Vagues, signé en sang et en sel, garantit que la cité n'obéira jamais à un seul maître. La protection magique contre les tempêtes serait liée à un Sceau marin oublié.`
  },

  {
    id: 'baie-naufrageurs',
    name: 'Baie des Naufrageurs',
    description: `Crique traîtresse bordée de récifs acérés où des dizaines de navires ont fait naufrage au fil des siècles. Les épaves regorgent de trésors mais aussi de créatures marines et de morts-vivants noyés.`,
    region: 'cote-des-orages',
    coordinates: { x: 22, y: 10 },
    type: 'dungeon',
    dangerLevel: 'high',
    level: '6+',
    notableNPCs: [
      { name: 'Pilleuse d\'Épaves Nessa', role: 'Exploratrice', description: 'Halfeline intrépide spécialisée dans la plongée sur épaves. Possède un appareil respiratoire magique unique.' },
      { name: 'Capitaine Fantôme Aldric le Noyé', role: 'Revenant', description: 'Fantôme d\'un capitaine dont le navire coula avec un trésor royal. Condamné à errer jusqu\'à ce que son or soit retrouvé.' }
    ],
    connectedTo: ['port-tempete', 'phare-abandonne'],
    icon: '⛵',
    pointsOfInterest: [
      { name: 'Galion Royal Englouti', description: 'Le Soleil Couronné, navire royal coulé avec le trésor de guerre. Gardé par des noyés enchantés.' },
      { name: 'Grotte aux Perles', description: 'Caverne sous-marine remplie d\'huîtres géantes produisant des perles magiques.' }
    ],
    lore: `On dit que les récifs de la Baie ne sont pas naturels — ce sont les os pétrifiés d'un léviathan tué par les dieux. Son esprit attire les navires vers leur perte, cherchant à reconstruire son corps.`
  },

  {
    id: 'phare-abandonne',
    name: 'Phare Abandonné',
    description: `Tour de pierre battue par les vents, autrefois guide des marins, maintenant hantée. Sa lumière s'allume parfois seule, attirant les navires vers les récifs. Un escalier en spirale mène à une salle au sommet contenant un miroir ancien.`,
    region: 'cote-des-orages',
    coordinates: { x: 20, y: 8 },
    type: 'dungeon',
    dangerLevel: 'medium',
    level: '4+',
    notableNPCs: [
      { name: 'Fantôme du Gardien Elias', role: 'Spectre', description: 'Ancien gardien du phare, assassiné par des pirates. Allume le phare pour prévenir d\'un danger qu\'il a vu dans le miroir.' }
    ],
    connectedTo: ['port-tempete', 'baie-naufrageurs'],
    icon: '🏚️',
    pointsOfInterest: [
      { name: 'Miroir des Tempêtes', description: 'Artefact ashkan montrant les tempêtes à venir. Peut aussi montrer des visions du passé maritime.' },
      { name: 'Cave aux Contrebandiers', description: 'Tunnel sous le phare menant à une crique secrète, utilisé par les contrebandiers.' }
    ],
    lore: `Le phare fut construit par l'Hégémonie d'Ashka pour surveiller les mers. Son miroir est un fragment de technologie ashkane capable de voir à travers les tempêtes et le temps. Quiconque le regarde trop longtemps risque la folie.`
  },

  {
    id: 'temple-englouti',
    name: 'Temple Englouti',
    description: `Temple sous-marin dédié à une divinité marine oubliée, accessible uniquement à marée basse ou par magie aquatique. Ses salles contiennent des fresques montrant la création du Sceau des Océans.`,
    region: 'cote-des-orages',
    coordinates: { x: 28, y: 8 },
    type: 'dungeon',
    dangerLevel: 'high',
    level: '9+',
    notableNPCs: [
      { name: 'Prêtresse Abyssale Thalassa', role: 'Gardienne du Temple', description: 'Triton femelle vouée au dieu des abysses. Peut respirer dans l\'eau et sur terre. Teste ceux qui cherchent le savoir du temple.' },
      { name: 'Oracle des Profondeurs', role: 'Entité', description: 'Pieuvre géante douée d\'intelligence, communique par télépathie. Garde les secrets du Sceau des Océans.' }
    ],
    connectedTo: ['port-tempete'],
    icon: '🏛️',
    pointsOfInterest: [
      { name: 'Salle du Sceau Marin', description: 'Chambre principale contenant le glyphe du Sceau des Océans. Toujours intact mais fissuré.' },
      { name: 'Bibliothèque Corallienne', description: 'Textes gravés sur des plaques de corail. Décrivent les rituels pour renforcer le Sceau.' }
    ],
    lore: `Ce temple fut construit bien avant l'Hégémonie d'Ashka par une civilisation maritime aujourd'hui disparue. Le Sceau des Océans qu'il contient maintient les créatures abyssales dans les profondeurs. Sa fissure explique les tempêtes de plus en plus violentes.`
  },

  {
    id: 'iles-pirates',
    name: 'Îles des Pirates',
    description: `Archipel de sept îles volcaniques servant de base aux pirates et corsaires. Chaque île est contrôlée par un capitaine différent. Un code d'honneur régit la vie sur les îles : pas de vol entre pirates, pas de meurtre au port.`,
    region: 'cote-des-orages',
    coordinates: { x: 15, y: 12 },
    type: 'town',
    dangerLevel: 'medium',
    level: '5+',
    population: 8000,
    notableNPCs: [
      { name: 'Roi-Pirate Barnabé "Barbe-de-Feu"', role: 'Seigneur des Îles', description: 'Géant roux dont la barbe semble littéralement enflammée (enchantement). Brutal mais juste selon le Code.' },
      { name: 'Navigatrice Estrella', role: 'Cartographe', description: 'Elfe marine possédant les cartes les plus précises du monde. Vend ses services au plus offrant.' },
      { name: 'Docteur Ossian', role: 'Chirurgien', description: 'Ancien nécromancien reconverti en médecin. Ses méthodes sont peu orthodoxes mais efficaces.' }
    ],
    connectedTo: ['port-tempete'],
    icon: '🏴‍☠️',
    services: ['auberge', 'forge', 'marché noir', 'chantier naval'],
    economy: {
      wealth: 'prosperous',
      mainExports: ['Marchandises volées', 'Rhum', 'Informations'],
      mainImports: ['Armes', 'Poudre', 'Vivres', 'Cordage']
    },
    lore: `Les Îles des Pirates furent découvertes par des mutins fuyant la marine royale il y a trois siècles. Le Code des Îles, gravé dans la roche volcanique de l'île centrale, est la seule loi respectée. Ceux qui le brisent sont abandonnés sur l'Île des Squelettes.`
  },

  {
    id: 'village-brisants',
    name: 'Village de Brisants',
    description: `Village de pêcheurs bâti sur des pilotis au-dessus des vagues. Les habitants vivent au rythme des marées et des tempêtes. Communauté accueillante mais superstitieuse, vénérant les esprits de la mer.`,
    region: 'cote-des-orages',
    coordinates: { x: 30, y: 18 },
    type: 'village',
    dangerLevel: 'low',
    level: '1+',
    population: 400,
    notableNPCs: [
      { name: 'Ancien Marin Gustave', role: 'Doyen', description: 'Vieux pêcheur borgne, connaît les courants et les secrets de la côte. Dit avoir vu un léviathan dans sa jeunesse.' },
      { name: 'Chamane des Vagues Coral', role: 'Prêtresse de la mer', description: 'Femme mystérieuse aux cheveux verts, communique avec les créatures marines. Peut prédire les tempêtes.' }
    ],
    connectedTo: ['port-tempete'],
    icon: '🏡',
    services: ['auberge', 'marché'],
    economy: {
      wealth: 'poor',
      mainExports: ['Poisson', 'Algues médicinales', 'Coquillages'],
      mainImports: ['Bois', 'Outils', 'Tissu']
    },
    lore: `Les habitants de Brisants descendent des survivants d'une cité côtière engloutie. Leurs chants de marée contiennent des fragments de rituels anciens capables d'apaiser les tempêtes. Ils ne le savent plus, mais leur chamane commence à comprendre.`
  },

  // ── TERRES BRÛLÉES ────────────────────────────────────────────────────────

  {
    id: 'nexus-sceaux',
    name: 'Nexus des Sceaux',
    description: `Point de convergence de tous les Sceaux d'Aethelgard, situé au centre exact des Terres Brûlées. Un cercle de monolithes entoure un gouffre d'où émane une énergie violette pulsante. C'est ici que l'Entité fut emprisonnée — et c'est ici qu'elle pourrait s'en libérer.`,
    region: 'terres-brulees',
    coordinates: { x: 55, y: 80 },
    type: 'special',
    dangerLevel: 'deadly',
    level: '18+',
    notableNPCs: [
      { name: 'Gardien du Dernier Sceau', role: 'Sentinelle éternelle', description: 'Être d\'énergie pure, dernier gardien créé par les Fondateurs. S\'affaiblit à mesure que les Sceaux se brisent. Parle en énigmes anciennes.' },
      { name: 'Spectre du Premier Archimage', role: 'Fantôme', description: 'Écho du mage qui créa les Sceaux. Apparaît pour guider ceux qui sont dignes de restaurer la prison.' }
    ],
    connectedTo: ['citadelle-ashka', 'desert-verre', 'oasis-ombre', 'tour-ossements'],
    icon: '🌀',
    pointsOfInterest: [
      { name: 'Le Gouffre du Néant', description: 'Abîme sans fond au centre du Nexus. Regarde trop longtemps et il te regarde aussi.' },
      { name: 'Monolithes des Sceaux', description: 'Sept piliers de pierre marquant chaque Sceau. Ceux correspondant aux Sceaux brisés sont fissurés et sombres.' },
      { name: 'Autel de la Chaîne', description: 'Pierre de sacrifice où le sang des Fondateurs scella l\'Entité. L\'autel réagit au sang de leurs descendants.' }
    ],
    lore: `Le Nexus est le point zéro de la magie en Aethelgard. C'est ici que, il y a huit siècles, sept mages sacrifièrent leur vie pour emprisonner l'Entité dans le Néant. Chaque Sceau brisé affaiblit la prison. Quand le dernier tombera, l'Entité sera libre.`
  },

  {
    id: 'citadelle-ashka',
    name: 'Citadelle d\'Ashka (Ruines)',
    description: `Ruines colossales de la capitale de l'Hégémonie d'Ashka, empire qui domina le monde avant sa chute. Des tours de métal tordu et de pierre vitrifiée s'élèvent comme des doigts squelettiques. La magie y est instable et dangereuse.`,
    region: 'terres-brulees',
    coordinates: { x: 58, y: 75 },
    type: 'ruin',
    dangerLevel: 'extreme',
    level: '15+',
    notableNPCs: [
      { name: 'Archon Malachar (projection)', role: 'Émissaire de l\'Ombre', description: 'Projection spectrale de l\'Archon cherchant à recruter les faibles. Offre pouvoir et savoir en échange de la loyauté.' },
      { name: 'Automate Ashkan 77-B', role: 'Gardien mécanique', description: 'Dernier automate fonctionnel de la Citadelle. Obéit à quiconque prononce les mots de commande en ashkan ancien.' }
    ],
    connectedTo: ['nexus-sceaux', 'desert-verre', 'camp-resistance'],
    icon: '💀',
    pointsOfInterest: [
      { name: 'Salle du Trône d\'Ombre', description: 'Ancien trône d\'Ashka, maintenant source de corruption. Quiconque s\'y assied reçoit des visions de pouvoir... et d\'horreur.' },
      { name: 'Laboratoire des Archons', description: 'Ateliers souterrains où les Archons créaient leurs abominations. Certaines expériences semblent encore actives.' },
      { name: 'Bibliothèque Ashkane', description: 'Immense collection de savoirs interdits. Les livres sont piégés et maudits, mais contiennent des secrets inestimables.' },
      { name: 'Forge de l\'Âme', description: 'Machine ashkane capable de séparer l\'âme du corps. Partiellement fonctionnelle.' }
    ],
    lore: `L'Hégémonie d'Ashka régna pendant mille ans grâce à une magie alimentée par l'Entité elle-même. Quand les Sept Fondateurs scellèrent l'Entité, toute la puissance de l'Hégémonie s'effondra en un instant. La Citadelle conserve encore des échos de ce pouvoir, attirant les ambitieux et les fous.`
  },

  {
    id: 'desert-verre',
    name: 'Désert de Verre',
    description: `Étendue de sable vitrifié par la magie destructrice de la Chute d'Ashka. Le sol brille comme un miroir sous le soleil. La nuit, des reflets fantomatiques montrent les rues de villes disparues. La chaleur est mortelle le jour, le froid glacial la nuit.`,
    region: 'terres-brulees',
    coordinates: { x: 62, y: 82 },
    type: 'natural',
    dangerLevel: 'extreme',
    level: '12+',
    notableNPCs: [
      { name: 'Marcheur de Verre Kasim', role: 'Guide du désert', description: 'Nomade au visage voilé, seul être vivant à connaître les routes sûres. Accepte de guider en échange de souvenirs — littéralement.' },
      { name: 'Mirageuse Zara', role: 'Sorcière du sable', description: 'Femme mystérieuse vivant dans un palais illusoire. Réelle ou mirage ? Personne ne sait.' }
    ],
    connectedTo: ['nexus-sceaux', 'citadelle-ashka', 'oasis-ombre'],
    icon: '🏜️',
    pointsOfInterest: [
      { name: 'Champ d\'Éclats', description: 'Zone de verre acéré où la marche est suicidaire sans protection. Contient des artefacts ashkans piégés dans le verre.' },
      { name: 'Ville Fantôme d\'Elenara', description: 'Reflet nocturne d\'une cité ashkane. On peut y entrer si l\'on connaît le rituel, mais en sortir est une autre histoire.' }
    ],
    lore: `Le Désert de Verre est la cicatrice laissée par la destruction de l'Hégémonie. La puissance libérée lors du Scellement de l'Entité vitrifia des milliers de kilomètres carrés en un instant. Les âmes des victimes sont piégées dans le verre.`
  },

  {
    id: 'oasis-ombre',
    name: 'Oasis de l\'Ombre',
    description: `Oasis paradoxale au cœur du Désert de Verre, toujours plongée dans l'ombre malgré l'absence de surplomb. Son eau noire est potable mais provoque des rêves prophétiques. Camp de passage pour les rares voyageurs des Terres Brûlées.`,
    region: 'terres-brulees',
    coordinates: { x: 60, y: 88 },
    type: 'landmark',
    dangerLevel: 'high',
    level: '10+',
    notableNPCs: [
      { name: 'Gardien d\'Ombre Ash', role: 'Protecteur de l\'Oasis', description: 'Être mi-humain mi-ombre, né de la magie résiduelle du désert. Protège l\'oasis contre les créatures de la nuit.' },
      { name: 'Devineresse Mirka', role: 'Oracle', description: 'Vieille femme aveugle qui boit l\'eau noire chaque jour. Ses prophéties sont toujours vraies mais toujours terrifiantes.' }
    ],
    connectedTo: ['nexus-sceaux', 'desert-verre', 'camp-resistance'],
    icon: '🌴',
    pointsOfInterest: [
      { name: 'Source Noire', description: 'L\'eau semble absorber la lumière. Boire accorde des visions, mais trop boire lie l\'âme à l\'Ombre.' },
      { name: 'Pierre des Rêves', description: 'Monolithe obsidien sur lequel dormir provoque des rêves du passé d\'Ashka.' }
    ],
    lore: `L'Oasis est le seul point d'eau dans des centaines de kilomètres. Sa nature sombre vient d'une faille dans le tissu de la réalité : l'ombre de l'Entité s'y projette depuis sa prison. L'eau est le sang du Néant, dilué mais puissant.`
  },

  {
    id: 'camp-resistance',
    name: 'Camp de la Résistance',
    description: `Base secrète des derniers défenseurs luttant contre la corruption des Terres Brûlées. Installé dans un canyon protégé par des runes de dissimulation. Rassemble des combattants, des mages et des érudits de toutes races.`,
    region: 'terres-brulees',
    coordinates: { x: 52, y: 72 },
    type: 'fortress',
    dangerLevel: 'medium',
    level: '8+',
    population: 500,
    notableNPCs: [
      { name: 'Commandante Lyra Cendrétoile', role: 'Chef de la Résistance', description: 'Humaine au regard d\'acier, ancienne paladin déchue qui a retrouvé la foi. Stratège brillante et combattante féroce.' },
      { name: 'Mage de Guerre Aldric le Scarifié', role: 'Arcaniste', description: 'Homme couvert de runes gravées dans sa chair, chaque rune est un sort de protection. A survécu à la corruption deux fois.' },
      { name: 'Éclaireur Shade', role: 'Rôdeur', description: 'Tieffelin discret servant d\'espion dans les Terres Brûlées. Connaît les mouvements des forces de l\'Ombre.' },
      { name: 'Forgeron Brondar', role: 'Artisan de guerre', description: 'Nain exilé de Hammerdeep pour hérésie. Forge des armes imprégnées de lumière sacrée, seules capables de blesser certaines ombres.' }
    ],
    connectedTo: ['citadelle-ashka', 'oasis-ombre', 'tour-ossements'],
    icon: '⚔️',
    services: ['auberge', 'forge', 'herboriste', 'temple'],
    lore: `Le Camp de la Résistance fut fondé il y a trente ans par une poignée de vétérans ayant vu la corruption s'étendre. Leur nombre grandit à mesure que la menace se fait plus évidente. C'est le dernier rempart avant le Nexus des Sceaux.`
  },

  {
    id: 'tour-ossements',
    name: 'Tour des Ossements',
    description: `Tour macabre construite entièrement d'os empilés, haute de quarante mètres. Ancien sanctuaire nécromantique de l'Hégémonie d'Ashka, toujours alimenté par une énergie noire résiduelle. Des morts-vivants errent dans ses étages.`,
    region: 'terres-brulees',
    coordinates: { x: 48, y: 85 },
    type: 'dungeon',
    dangerLevel: 'extreme',
    level: '14+',
    notableNPCs: [
      { name: 'Liche Mineure Velkaris', role: 'Occupant actuel', description: 'Nécromancien ashkan devenu liche, trop faible pour quitter la Tour. Accumule des serviteurs morts-vivants et prépare un rituel.' },
      { name: 'Prisonnier Fantôme Sereth', role: 'Esprit captif', description: 'Âme d\'un paladin emprisonné par Velkaris. Communique par murmures, supplie d\'être libéré et de détruire la liche.' }
    ],
    connectedTo: ['nexus-sceaux', 'camp-resistance'],
    icon: '💀',
    pointsOfInterest: [
      { name: 'Laboratoire Nécromantique', description: 'Étage supérieur où Velkaris mène ses expériences. Tables de dissection, composants macabres, phylactère caché.' },
      { name: 'Fosse aux Âmes', description: 'Sous-sol où des centaines d\'âmes sont piégées dans des cristaux noirs, alimentant la Tour en énergie.' },
      { name: 'Salle des Os Gravés', description: 'Chaque os porte un nom — celui du mort qu\'il était. Trouver le bon os peut libérer une âme utile.' }
    ],
    lore: `La Tour des Ossements fut le centre de recherche nécromantique de l'Hégémonie. C'est ici que furent créés les premiers Chevaliers de Cendres — morts-vivants d'élite servant de gardes d'honneur. Velkaris, l'un des derniers nécromanciens ashkans, refuse d'accepter la chute de son empire.`
  },
];

// ============================================================================
// CHEMINS ET CONNEXIONS
// ============================================================================

export const MAP_EXPANSION_PATHS: ExpMapPath[] = [

  // ── CHEMINS DU VAL DORÉ ──────────────────────────────────────────────────

  {
    id: 'exp-path-sol-pontdore',
    from: 'sol-aureus-expanded',
    to: 'pontdore',
    distance: 25,
    terrain: 'road',
    dangerLevel: 'safe',
    travelDays: 0.5,
    description: 'Route royale pavée longeant la rivière Aureline. Patrouillée régulièrement par la garde.',
    encounters: ['Marchands ambulants', 'Patrouille royale']
  },
  {
    id: 'exp-path-sol-orval',
    from: 'sol-aureus-expanded',
    to: 'village-orval',
    distance: 30,
    terrain: 'road',
    dangerLevel: 'safe',
    travelDays: 0.5,
    description: 'Route champêtre traversant des champs de blé dorés. Vue panoramique sur le Val.',
    encounters: ['Fermiers', 'Colporteurs']
  },
  {
    id: 'exp-path-sol-ferme',
    from: 'sol-aureus-expanded',
    to: 'ferme-deux-rivieres',
    distance: 20,
    terrain: 'road',
    dangerLevel: 'safe',
    travelDays: 0.5,
    description: 'Chemin bordé de haies menant au confluent des rivières. Pont de pierre au passage.',
    encounters: ['Pêcheurs', 'Enfants jouant']
  },
  {
    id: 'exp-path-sol-abbaye',
    from: 'sol-aureus-expanded',
    to: 'abbaye-solarius',
    distance: 35,
    terrain: 'road',
    dangerLevel: 'safe',
    travelDays: 1,
    description: 'Route montante vers la colline de l\'Abbaye. Bordée de statues de saints et de lanternes sacrées.',
    encounters: ['Pèlerins', 'Novices de l\'Abbaye']
  },
  {
    id: 'exp-path-sol-ruines',
    from: 'sol-aureus-expanded',
    to: 'ruines-pont-ancien',
    distance: 15,
    terrain: 'trail',
    dangerLevel: 'low',
    travelDays: 0.5,
    description: 'Sentier descendant vers le ravin. Peu entretenu, les gardes évitent la zone.',
    encounters: ['Contrebandiers', 'Gobelins errants', 'Chauves-souris géantes']
  },
  {
    id: 'exp-path-pontdore-orval',
    from: 'pontdore',
    to: 'village-orval',
    distance: 40,
    terrain: 'road',
    dangerLevel: 'safe',
    travelDays: 1,
    description: 'Route des Vignobles reliant les deux communautés. Les auberges jalonnent le parcours.',
    encounters: ['Marchands de vin', 'Troubadours']
  },
  {
    id: 'exp-path-pontdore-ferme',
    from: 'pontdore',
    to: 'ferme-deux-rivieres',
    distance: 30,
    terrain: 'road',
    dangerLevel: 'safe',
    travelDays: 0.5,
    description: 'Route suivant la rivière Aureline en amont.',
    encounters: ['Barges de transport', 'Pêcheurs']
  },
  {
    id: 'exp-path-abbaye-ruines',
    from: 'abbaye-solarius',
    to: 'ruines-pont-ancien',
    distance: 45,
    terrain: 'trail',
    dangerLevel: 'medium',
    travelDays: 1,
    description: 'Ancien chemin de pèlerinage tombé en désuétude. Traverse une forêt peu fréquentée.',
    encounters: ['Loups', 'Brigands', 'Fantômes errants']
  },

  // ── CHEMINS DES MONTS CŒUR-DE-FER ────────────────────────────────────────

  {
    id: 'exp-path-hammer-forgefer',
    from: 'hammerdeep-expanded',
    to: 'forgefer',
    distance: 40,
    terrain: 'mountain',
    dangerLevel: 'low',
    travelDays: 1,
    description: 'Route naine taillée dans la roche, large et bien éclairée par des cristaux. Patrouilles naines.',
    encounters: ['Caravanes naines', 'Marchands de gemmes']
  },
  {
    id: 'exp-path-hammer-col',
    from: 'hammerdeep-expanded',
    to: 'col-dragon',
    distance: 80,
    terrain: 'mountain',
    dangerLevel: 'high',
    travelDays: 3,
    description: 'Sentier de montagne de plus en plus escarpé. Les vents forcissent à mesure que l\'on monte.',
    encounters: ['Griffons', 'Harpies', 'Tempêtes de neige', 'Éboulements']
  },
  {
    id: 'exp-path-hammer-mines',
    from: 'hammerdeep-expanded',
    to: 'mines-mithral',
    distance: 30,
    terrain: 'underground',
    dangerLevel: 'medium',
    travelDays: 1,
    description: 'Tunnel minier principal, rails pour chariots de minerai. Bien gardé mais sombre.',
    encounters: ['Mineurs nains', 'Élémentaires de terre', 'Rats géants']
  },
  {
    id: 'exp-path-hammer-temple',
    from: 'hammerdeep-expanded',
    to: 'temple-forge',
    distance: 20,
    terrain: 'mountain',
    dangerLevel: 'safe',
    travelDays: 0.5,
    description: 'Voie Sacrée des Forgerons, escalier taillé dans le granite. Torches éternelles aux murs.',
    encounters: ['Pèlerins nains', 'Apprentis forgerons']
  },
  {
    id: 'exp-path-hammer-caverne',
    from: 'hammerdeep-expanded',
    to: 'caverne-cristal',
    distance: 50,
    terrain: 'underground',
    dangerLevel: 'medium',
    travelDays: 2,
    description: 'Tunnel naturel aux parois scintillantes. La magie devient instable en approchant.',
    encounters: ['Golems de pierre', 'Élémentaires de cristal', 'Champignons toxiques']
  },
  {
    id: 'exp-path-forgefer-col',
    from: 'forgefer',
    to: 'col-dragon',
    distance: 60,
    terrain: 'mountain',
    dangerLevel: 'high',
    travelDays: 2,
    description: 'Piste extérieure escaladant les pics. Exposée aux intempéries et aux prédateurs volants.',
    encounters: ['Wyvernes', 'Tempêtes', 'Trolls des montagnes']
  },
  {
    id: 'exp-path-col-mines',
    from: 'col-dragon',
    to: 'mines-mithral',
    distance: 45,
    terrain: 'mountain',
    dangerLevel: 'high',
    travelDays: 2,
    description: 'Passage par les crêtes reliant le Col aux mines du versant est.',
    encounters: ['Dragons jeunes', 'Gobelins des montagnes']
  },
  {
    id: 'exp-path-temple-caverne',
    from: 'temple-forge',
    to: 'caverne-cristal',
    distance: 35,
    terrain: 'underground',
    dangerLevel: 'low',
    travelDays: 1,
    description: 'Passage sacré connectant les deux sites spirituels nains. Murs gravés de runes de protection.',
    encounters: ['Esprits nains ancestraux', 'Échos magiques']
  },

  // ── CHEMINS DE LA SYLVE D'ÉMERAUDE ───────────────────────────────────────

  {
    id: 'exp-path-ygg-clairiere',
    from: 'yggdrasylve',
    to: 'clairiere-anciens',
    distance: 15,
    terrain: 'forest',
    dangerLevel: 'low',
    travelDays: 0.5,
    description: 'Sentier lumineux guidé par des lucioles féérique. Les arbres semblent s\'écarter sur le passage.',
    encounters: ['Fées bienveillantes', 'Esprits animaux']
  },
  {
    id: 'exp-path-ygg-feuillevent',
    from: 'yggdrasylve',
    to: 'village-feuillevent',
    distance: 25,
    terrain: 'forest',
    dangerLevel: 'safe',
    travelDays: 1,
    description: 'Chemin des Feuilles, route elfique principale. Ponts de lianes au-dessus des ravins.',
    encounters: ['Patrouilles elfiques', 'Cerfs enchantés']
  },
  {
    id: 'exp-path-ygg-bosquet',
    from: 'yggdrasylve',
    to: 'bosquet-corrompu',
    distance: 40,
    terrain: 'forest',
    dangerLevel: 'high',
    travelDays: 1.5,
    description: 'Sentier qui s\'assombrit progressivement. Les arbres deviennent noirs et noueux en approchant.',
    encounters: ['Créatures corrompues', 'Brume toxique', 'Treants malades']
  },
  {
    id: 'exp-path-ygg-lac',
    from: 'yggdrasylve',
    to: 'lac-miroir',
    distance: 20,
    terrain: 'forest',
    dangerLevel: 'low',
    travelDays: 1,
    description: 'Sentier descendant vers le lac, bordé de fleurs lumineuses. L\'air devient frais et brumeux.',
    encounters: ['Ondines', 'Lucioles géantes', 'Fées aquatiques']
  },
  {
    id: 'exp-path-clairiere-feuillevent',
    from: 'clairiere-anciens',
    to: 'village-feuillevent',
    distance: 20,
    terrain: 'forest',
    dangerLevel: 'safe',
    travelDays: 0.5,
    description: 'Route elfique secondaire traversant de vieux bocages paisibles.',
    encounters: ['Druides en méditation', 'Animaux curieux']
  },
  {
    id: 'exp-path-clairiere-ruines',
    from: 'clairiere-anciens',
    to: 'ruines-elfiques',
    distance: 35,
    terrain: 'forest',
    dangerLevel: 'high',
    travelDays: 1.5,
    description: 'Sentier abandonné, envahi par la végétation. Des gardiens spectraux patrouillent.',
    encounters: ['Spectres elfiques', 'Plantes carnivores', 'Araignées de brume']
  },
  {
    id: 'exp-path-feuillevent-bosquet',
    from: 'village-feuillevent',
    to: 'bosquet-corrompu',
    distance: 25,
    terrain: 'forest',
    dangerLevel: 'medium',
    travelDays: 1,
    description: 'La limite entre la forêt saine et corrompue. Des barrières magiques elfiques ralentissent la progression de la corruption.',
    encounters: ['Sentinelles elfiques', 'Créatures en fuite']
  },
  {
    id: 'exp-path-feuillevent-lac',
    from: 'village-feuillevent',
    to: 'lac-miroir',
    distance: 30,
    terrain: 'forest',
    dangerLevel: 'low',
    travelDays: 1,
    description: 'Chemin sinueux le long d\'un ruisseau cristallin alimentant le lac.',
    encounters: ['Pêcheurs elfes', 'Loutres enchantées']
  },

  // ── CHEMINS DE LA CÔTE DES ORAGES ────────────────────────────────────────

  {
    id: 'exp-path-port-baie',
    from: 'port-tempete',
    to: 'baie-naufrageurs',
    distance: 20,
    terrain: 'coastal',
    dangerLevel: 'medium',
    travelDays: 0.5,
    description: 'Sentier côtier escarpé surplombant les falaises. Le vent y souffle violemment.',
    encounters: ['Contrebandiers', 'Goélands géants', 'Crabes géants']
  },
  {
    id: 'exp-path-port-phare',
    from: 'port-tempete',
    to: 'phare-abandonne',
    distance: 30,
    terrain: 'coastal',
    dangerLevel: 'low',
    travelDays: 1,
    description: 'Route côtière pavée, autrefois bien entretenue. Maintenant envahie par le sable et les algues.',
    encounters: ['Marins superstitieux', 'Crabes']
  },
  {
    id: 'exp-path-port-temple',
    from: 'port-tempete',
    to: 'temple-englouti',
    distance: 15,
    terrain: 'coastal',
    dangerLevel: 'high',
    travelDays: 0.5,
    description: 'Accessible uniquement à marée basse via un passage rocheux, ou par bateau. Dangereusement glissant.',
    encounters: ['Noyés', 'Méduses géantes', 'Courants traîtres']
  },
  {
    id: 'exp-path-port-iles',
    from: 'port-tempete',
    to: 'iles-pirates',
    distance: 80,
    terrain: 'coastal',
    dangerLevel: 'medium',
    travelDays: 2,
    description: 'Traversée maritime par eaux agitées. Nécessite un navire solide et un bon capitaine.',
    encounters: ['Pirates', 'Tempêtes', 'Serpents de mer', 'Navires marchands']
  },
  {
    id: 'exp-path-port-brisants',
    from: 'port-tempete',
    to: 'village-brisants',
    distance: 35,
    terrain: 'coastal',
    dangerLevel: 'low',
    travelDays: 1,
    description: 'Route côtière longeant les criques. Paysages magnifiques mais exposés au vent.',
    encounters: ['Pêcheurs', 'Mouettes géantes']
  },
  {
    id: 'exp-path-baie-phare',
    from: 'baie-naufrageurs',
    to: 'phare-abandonne',
    distance: 10,
    terrain: 'coastal',
    dangerLevel: 'medium',
    travelDays: 0.5,
    description: 'Passage par les rochers entre la baie et le phare. Dangereux à marée haute.',
    encounters: ['Crabes géants', 'Esprits des noyés']
  },

  // ── CHEMINS DES TERRES BRÛLÉES ───────────────────────────────────────────

  {
    id: 'exp-path-nexus-citadelle',
    from: 'nexus-sceaux',
    to: 'citadelle-ashka',
    distance: 25,
    terrain: 'desert',
    dangerLevel: 'extreme',
    travelDays: 1,
    description: 'Ancienne route impériale ashkane, maintenant fissurée et hantée. Les ombres y ont une forme propre.',
    encounters: ['Ombres vivantes', 'Spectres ashkans', 'Tempêtes de cendres']
  },
  {
    id: 'exp-path-nexus-desert',
    from: 'nexus-sceaux',
    to: 'desert-verre',
    distance: 40,
    terrain: 'desert',
    dangerLevel: 'extreme',
    travelDays: 2,
    description: 'Traversée du champ de verre. La lumière aveugle le jour, les reflets trompent la nuit.',
    encounters: ['Mirages piégeurs', 'Golems de verre', 'Vers des sables']
  },
  {
    id: 'exp-path-nexus-oasis',
    from: 'nexus-sceaux',
    to: 'oasis-ombre',
    distance: 50,
    terrain: 'desert',
    dangerLevel: 'high',
    travelDays: 2,
    description: 'Route indirecte évitant les zones les plus corrompues. Repérable uniquement par les étoiles.',
    encounters: ['Morts-vivants errants', 'Tempêtes de sable', 'Charognards d\'ombre']
  },
  {
    id: 'exp-path-nexus-tour',
    from: 'nexus-sceaux',
    to: 'tour-ossements',
    distance: 35,
    terrain: 'desert',
    dangerLevel: 'extreme',
    travelDays: 1.5,
    description: 'Chemin sinistre jalonné d\'ossements. Les morts-vivants deviennent plus nombreux en approchant.',
    encounters: ['Squelettes', 'Zombies', 'Chevaliers de Cendres patrouilleurs']
  },
  {
    id: 'exp-path-citadelle-desert',
    from: 'citadelle-ashka',
    to: 'desert-verre',
    distance: 30,
    terrain: 'desert',
    dangerLevel: 'extreme',
    travelDays: 1,
    description: 'Route directe entre les ruines et le désert. Le sol passe de la pierre brisée au verre fondu.',
    encounters: ['Automates ashkans errants', 'Élémentaires de feu']
  },
  {
    id: 'exp-path-citadelle-camp',
    from: 'citadelle-ashka',
    to: 'camp-resistance',
    distance: 40,
    terrain: 'desert',
    dangerLevel: 'high',
    travelDays: 2,
    description: 'Route secrète connue uniquement de la Résistance. Changeante pour éviter les patrouilles d\'ombres.',
    encounters: ['Éclaireurs de la Résistance', 'Ombres patrouilleurs']
  },
  {
    id: 'exp-path-desert-oasis',
    from: 'desert-verre',
    to: 'oasis-ombre',
    distance: 60,
    terrain: 'desert',
    dangerLevel: 'extreme',
    travelDays: 3,
    description: 'Traversée mortelle du désert. Sans eau magique de l\'oasis pour guide, la désorientation est fatale.',
    encounters: ['Mirages', 'Vers de verre', 'Tempêtes de cristal', 'Chaleur mortelle']
  },
  {
    id: 'exp-path-oasis-camp',
    from: 'oasis-ombre',
    to: 'camp-resistance',
    distance: 45,
    terrain: 'desert',
    dangerLevel: 'high',
    travelDays: 2,
    description: 'Route utilisée par la Résistance pour les ravitaillements. Marquée par des cairns de pierres noires.',
    encounters: ['Patrouilles de la Résistance', 'Charognards', 'Morts-vivants isolés']
  },
  {
    id: 'exp-path-camp-tour',
    from: 'camp-resistance',
    to: 'tour-ossements',
    distance: 55,
    terrain: 'desert',
    dangerLevel: 'extreme',
    travelDays: 2,
    description: 'Mission suicidaire selon les vétérans. L\'approche de la Tour intensifie la présence de morts-vivants.',
    encounters: ['Hordes de squelettes', 'Chevaliers de Cendres', 'Liche Mineure en patrouille']
  },

  // ── CHEMINS INTER-RÉGIONS ────────────────────────────────────────────────

  {
    id: 'exp-path-sol-hammerdeep',
    from: 'sol-aureus-expanded',
    to: 'hammerdeep-expanded',
    distance: 200,
    terrain: 'road',
    dangerLevel: 'low',
    travelDays: 4,
    description: 'Route Royale des Montagnes, principale artère commerciale entre humains et nains. Bien patrouillée.',
    encounters: ['Caravanes marchandes', 'Patrouilles mixtes', 'Bandits occasionnels']
  },
  {
    id: 'exp-path-sol-yggdrasylve',
    from: 'sol-aureus-expanded',
    to: 'yggdrasylve',
    distance: 180,
    terrain: 'trail',
    dangerLevel: 'medium',
    travelDays: 5,
    description: 'Sentier des Anciens traversant les plaines puis la Sylve. Les elfes surveillent les derniers kilomètres.',
    encounters: ['Loups', 'Brigands', 'Patrouilles elfiques', 'Fées curieuses']
  },
  {
    id: 'exp-path-sol-port',
    from: 'sol-aureus-expanded',
    to: 'port-tempete',
    distance: 250,
    terrain: 'road',
    dangerLevel: 'low',
    travelDays: 5,
    description: 'Route du Commerce Maritime, artère vitale reliant la capitale au port. Auberges tous les 30 km.',
    encounters: ['Marchands', 'Pèlerins', 'Troubadours', 'Bandits de grand chemin']
  },
  {
    id: 'exp-path-sol-nexus',
    from: 'sol-aureus-expanded',
    to: 'nexus-sceaux',
    distance: 400,
    terrain: 'trail',
    dangerLevel: 'extreme',
    travelDays: 12,
    description: 'Route du Péril traversant les Marais-Salés puis les Terres Brûlées. Seuls les héros l\'empruntent.',
    encounters: ['Toute créature possible', 'Corruption croissante', 'Épreuves magiques']
  },
];

// ============================================================================
// HELPERS
// ============================================================================

/** Trouve un lieu d'expansion par ID */
export function findExpansionLocation(id: string): ExpMapLocation | undefined {
  return MAP_EXPANSION_LOCATIONS.find(loc => loc.id === id);
}

/** Trouve tous les lieux d'une région */
export function getLocationsByRegion(region: string): ExpMapLocation[] {
  return MAP_EXPANSION_LOCATIONS.filter(loc => loc.region === region);
}

/** Trouve tous les chemins partant d'un lieu */
export function getPathsFrom(locationId: string): ExpMapPath[] {
  return MAP_EXPANSION_PATHS.filter(p => p.from === locationId || p.to === locationId);
}

/** Trouve le chemin le plus court entre deux lieux (par travelDays) */
export function findShortestPath(fromId: string, toId: string): ExpMapPath | undefined {
  return MAP_EXPANSION_PATHS.find(
    p => (p.from === fromId && p.to === toId) || (p.from === toId && p.to === fromId)
  );
}

/** Statistiques de la carte d'expansion */
export const MAP_EXPANSION_STATS = {
  totalLocations: MAP_EXPANSION_LOCATIONS.length,
  totalPaths: MAP_EXPANSION_PATHS.length,
  locationsByRegion: {
    'val-dore': MAP_EXPANSION_LOCATIONS.filter(l => l.region === 'val-dore').length,
    'monts-coeur-de-fer': MAP_EXPANSION_LOCATIONS.filter(l => l.region === 'monts-coeur-de-fer').length,
    'sylve-emeraude': MAP_EXPANSION_LOCATIONS.filter(l => l.region === 'sylve-emeraude').length,
    'cote-des-orages': MAP_EXPANSION_LOCATIONS.filter(l => l.region === 'cote-des-orages').length,
    'terres-brulees': MAP_EXPANSION_LOCATIONS.filter(l => l.region === 'terres-brulees').length,
  },
  totalNPCs: MAP_EXPANSION_LOCATIONS.reduce((sum, loc) => sum + loc.notableNPCs.length, 0),
};
