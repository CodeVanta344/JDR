// ============================================================
// PÊCHE - Capture de Poissons et Créatures Aquatiques
// ============================================================

import type { Profession } from '../index';

export const FISHING: Profession = {
  id: 'fishing',
  name: 'Pêche',
  category: 'gather',
  description: 'L\'art patient de capturer les trésors des rivières, lacs et océans.',
  lore_background: `Les Pêcheurs d'Aethelgard sont des conteurs légendaires. Dans les tavernes côtières, on parle du Vieux Morten qui a ferré un Léviathan de 30 mètres, ou de la Mystérieuse Dame des Brumes qui pêche des âmes perdues dans le Lac des Lamentations. La Guilde des Pêcheurs organise le Grand Tournoi Annuel où le champion gagne le titre de "Maître des Marées". Certains pêcheurs de trésors ont fait fortune en remontant des coffres de galions engloutis, tandis que les chasseurs de monstres marins sont vénérés comme des héros.`,
  
  primary_stat: 'wisdom',
  secondary_stat: 'dexterity',
  
  starting_tools: [
    { itemId: 'fishing_rod_basic', quantity: 1 },
    { itemId: 'tackle_box', quantity: 1 },
    { itemId: 'fishing_net_small', quantity: 1 },
    { itemId: 'bait_worms', quantity: 20 }
  ],
  
  ranks: [
    {
      level: 1,
      title: 'Pêcheur Novice',
      xp_required: 0,
      recipes_unlocked: [],
      passive_bonuses: [
        'Pêcher poissons communs (rivières, lacs)',
        'Détecter bancs de poissons (10m)',
        'Respiration prolongée +2 min'
      ]
    },
    {
      level: 5,
      title: 'Pêcheur Expérimenté',
      xp_required: 1000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Pêcher poissons rares et créatures marines',
        'Lecture des courants : Prédire météo marine',
        'Nage rapide : Vitesse natation +50%',
        '+25% taille/qualité captures'
      ]
    },
    {
      level: 10,
      title: 'Maître Pêcheur',
      xp_required: 5000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Pêcher créatures légendaires et trésors engloutis',
        'Vision aquatique : Voir clairement sous l\'eau (30m)',
        'Communion marine : Comprendre créatures aquatiques',
        '+50% qualité, 15% chance : Capture exceptionnelle'
      ],
      special_ability: 'Appel des Profondeurs : Attirer créature marine spécifique (1/jour, DC 20 Sagesse)'
    },
    {
      level: 15,
      title: 'Seigneur des Océans',
      xp_required: 15000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Pêcher Léviathans, Krakens juvéniles, esprits marins',
        'Respiration aquatique permanente',
        'Résistance pression des profondeurs (illimitée)',
        '+100% qualité, 30% chance : Objet magique sur capture',
        'Immunité tempêtes marines'
      ],
      special_ability: 'Pacte des Marées : Invoquer tsunami localisé OU calmer tempête (1/arc)'
    }
  ],
  
  recipes: [],
  
  specializations: [
    {
      id: 'deep_fisher',
      name: 'Pêcheur des Profondeurs',
      description: 'Expert des abysses. Capture créatures des fonds marins, résiste à pressions extrêmes.',
      unlock_level: 8,
      bonus_effects: [
        'Plongée extrême : Descendre jusqu\'à 2000m sans équipement',
        'Vision abyssale : Voir dans noir total sous-marin',
        'Captures abyssales : Poissons des profondeurs → Valeur x3',
        'Chance 20% : Remonter gemme/perle rare avec poisson'
      ]
    },
    {
      id: 'treasure_fisher',
      name: 'Pêcheur de Trésors',
      description: 'Chasseur d\'épaves et coffres engloutis. Flair surnaturel pour objets précieux sous-marins.',
      unlock_level: 8,
      bonus_effects: [
        'Détection de trésor : Sentir or/magie dans 50m sous l\'eau',
        'Expertise épaves : Identifier navires coulés et leur cargaison',
        'Coffres engloutis : +50% chance trouver trésor en pêchant',
        'Synergy Archaeology : Artefacts remontés → Valeur historique doublée'
      ]
    },
    {
      id: 'sea_monster_hunter',
      name: 'Chasseur de Monstres Marins',
      description: 'Traqueur de créatures titanesques. Pêche requins géants, serpents de mer, krakens.',
      unlock_level: 10,
      bonus_effects: [
        'Harpon légendaire : Arme magique qui revient automatiquement',
        'Combat aquatique : Pas de malus sous l\'eau',
        'Trophées marins : Écailles/dents de monstres → Équipement épique',
        'Synergy Leatherworking : Peaux de monstres marins → Armure aquatique'
      ]
    }
  ],
  
  synergies_with: ['cooking', 'leatherworking', 'alchemy'],
  
  faction_reputation: [
    { factionId: 'guilde_pecheurs', bonus_per_rank: 12 },
    { factionId: 'pirates_cote_perle', bonus_per_rank: 8 },
    { factionId: 'tritons_profondeurs', bonus_per_rank: 10 }
  ]
};

// ============================================================
// ZONES DE PÊCHE & CAPTURES
// ============================================================

export interface FishingSpot {
  id: string;
  name: string;
  level_required: number;
  found_in: string[];
  catch_range: [number, number]; // Poids en kg
  fishing_time_seconds: number;
  difficulty_dc: number;
  special_conditions?: string;
  value_per_kg: number;
  lore_description: string;
}

export const FISHING_SPOTS: FishingSpot[] = [
  // Niveau 1-4
  {
    id: 'common_trout',
    name: 'Truite Commune',
    level_required: 1,
    found_in: ['Rivières', 'Ruisseaux', 'Lacs Calmes'],
    catch_range: [0.5, 2],
    fishing_time_seconds: 60,
    difficulty_dc: 8,
    value_per_kg: 2,
    lore_description: 'Poisson argenté commun dans les eaux claires. Chair délicate appréciée des aubergistes. Mord facilement à l\'aube.'
  },
  {
    id: 'river_pike',
    name: 'Brochet de Rivière',
    level_required: 2,
    found_in: ['Rivières Profondes', 'Lacs Herbeux'],
    catch_range: [2, 8],
    fishing_time_seconds: 120,
    difficulty_dc: 12,
    value_per_kg: 5,
    lore_description: 'Prédateur agressif aux dents acérées. Combat vigoureusement quand ferré. Les pêcheurs échangent histoires de "celui qui est parti".'
  },
  {
    id: 'moonlight_minnow',
    name: 'Vairon Argenté',
    level_required: 1,
    found_in: ['Étangs', 'Bassins Tranquilles', 'Mares Forestières'],
    catch_range: [0.1, 0.3],
    fishing_time_seconds: 30,
    difficulty_dc: 6,
    value_per_kg: 1,
    lore_description: 'Minuscules poissons qui brillent sous la lune. Utilisés comme appâts vivants pour captures plus grosses. Les enfants les pêchent avec des filets.'
  },

  // Niveau 5-9
  {
    id: 'golden_carp',
    name: 'Carpe Dorée',
    level_required: 5,
    found_in: ['Jardins Impériaux', 'Temples', 'Étangs Sacrés'],
    catch_range: [3, 10],
    fishing_time_seconds: 180,
    difficulty_dc: 16,
    special_conditions: 'Considérée sacrée - permission requise',
    value_per_kg: 50,
    lore_description: 'Poisson vénéré symbole de prospérité. Écailles d\'or pur. Les moines disent qu\'elles vivent 200 ans et apportent sagesse. Les pêcher sans permission attire malédiction.'
  },
  {
    id: 'ghost_sturgeon',
    name: 'Esturgeon Fantôme',
    level_required: 6,
    found_in: ['Rivières Profondes Anciennes', 'Lacs Hantés'],
    catch_range: [15, 50],
    fishing_time_seconds: 300,
    difficulty_dc: 18,
    special_conditions: 'Nuit uniquement',
    value_per_kg: 30,
    lore_description: 'Gigantesque poisson préhistorique translucide. Ses œufs (caviar fantôme) sont servis aux rois. Pêcher un spécimen de 50kg est exploit de légende.'
  },
  {
    id: 'electric_eel',
    name: 'Anguille Électrique',
    level_required: 7,
    found_in: ['Marais Orageux', 'Grottes Inondées', 'Lacs Tempétueux'],
    catch_range: [2, 8],
    fishing_time_seconds: 150,
    difficulty_dc: 17,
    special_conditions: 'Risque choc électrique - gants isolants recommandés',
    value_per_kg: 40,
    lore_description: 'Serpent aquatique qui génère décharges foudroyantes. Les mages en extraient essence pour parchemins d\'éclair. Toucher sans protection = paralysie garantie.'
  },

  // Niveau 10-14
  {
    id: 'leviathan_bass',
    name: 'Perche Léviathan',
    level_required: 10,
    found_in: ['Lacs Profonds', 'Fjords Nordiques', 'Crevasses Marines'],
    catch_range: [50, 150],
    fishing_time_seconds: 600,
    difficulty_dc: 22,
    special_conditions: 'Nécessite canne renforcée magiquement',
    value_per_kg: 80,
    lore_description: 'Poisson colossal capable d\'engloutir un homme entier. Combat durant des heures. Les pêcheurs qui en capturent deviennent légendes vivantes.'
  },
  {
    id: 'kraken_tentacle',
    name: 'Tentacule de Kraken (juvénile)',
    level_required: 12,
    found_in: ['Océans Profonds', 'Fosses Abyssales'],
    catch_range: [20, 80],
    fishing_time_seconds: 480,
    difficulty_dc: 24,
    special_conditions: 'Extrêmement dangereux - peut couler bateau',
    value_per_kg: 200,
    lore_description: 'Jeune Kraken curieux qui mord aux appâts. ATTENTION : Si vous ferrez un adulte, coupez la ligne IMMÉDIATEMENT. Ses tentacules sont prisés pour armures magiques.'
  },
  {
    id: 'phoenix_koi',
    name: 'Koï Phénix',
    level_required: 11,
    found_in: ['Sources Volcaniques', 'Geysers', 'Lacs de Lave Refroidie'],
    catch_range: [1, 4],
    fishing_time_seconds: 240,
    difficulty_dc: 21,
    special_conditions: 'Eau >80°C - résistance feu requise',
    value_per_kg: 500,
    lore_description: 'Poisson rouge-or qui nage dans eaux bouillantes. Manger sa chair accorde vision de mort passée. Alchimistes paient fortune pour ses écailles ignifugées.'
  },

  // Niveau 15+ - Légendaire
  {
    id: 'world_serpent_scale',
    name: 'Écaille de Jörmungandr',
    level_required: 15,
    found_in: ['Maëlstrom Éternel', 'Fin du Monde', 'Bord des Cartes'],
    catch_range: [1, 1],
    fishing_time_seconds: 900,
    difficulty_dc: 28,
    special_conditions: 'Offrir sacrifice à la mer avant',
    value_per_kg: 10000,
    lore_description: 'Fragment du Serpent-Monde qui encercle les océans. Une seule écaille = trésor national. Forgée en armure, elle rend invulnérable aux armes mortelles. Les dieux eux-mêmes convoitent ces reliques.'
  },
  {
    id: 'mermaid_treasure_chest',
    name: 'Coffre de Sirène',
    level_required: 16,
    found_in: ['Cités Englouties', 'Palais Sous-Marins', 'Épaves Légendaires'],
    catch_range: [10, 30],
    fishing_time_seconds: 720,
    difficulty_dc: 26,
    special_conditions: 'Chance 50% : Sirène attachée (négocie ou combat)',
    value_per_kg: 5000,
    lore_description: 'Coffre nacré enchaîné par les Sirènes. Contient trésors de navires coulés + artefacts marins. Si une Sirène garde le coffre, elle peut offrir un souhait en échange de libération.'
  },
  {
    id: 'cosmic_starfish',
    name: 'Étoile de Mer Cosmique',
    level_required: 18,
    found_in: ['Nexus Planaires Aquatiques', 'Lacs Interdimensionnels'],
    catch_range: [0.5, 2],
    fishing_time_seconds: 600,
    difficulty_dc: 30,
    special_conditions: 'Existe simultanément dans plusieurs plans',
    value_per_kg: 20000,
    lore_description: 'Créature extra-planaire ressemblant à étoile de mer. Ses bras pointent vers différentes dimensions. Consommer sa chair ouvre troisième œil (vision vraie permanente).'
  }
];
