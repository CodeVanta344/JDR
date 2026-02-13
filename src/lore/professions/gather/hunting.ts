// ============================================================
// CHASSE - Traque et Capture de Gibier
// ============================================================

import type { Profession } from '../index';

export const HUNTING: Profession = {
  id: 'hunting',
  name: 'Chasse',
  category: 'gather',
  description: 'L\'art ancestral de traquer, abattre et dépecer le gibier des forêts et montagnes.',
  lore_background: `Les Chasseurs d'Aethelgard honorent le Pacte du Sang : ne tuer que ce dont on a besoin, utiliser chaque partie de l'animal, remercier l'esprit de la proie. Dans les Bois Sauvages, les Rôdeurs Verts traquent cerfs et sangliers avec arc et patience. Les Traqueurs du Nord affrontent ours et loups dans des duels mortels. Mais les plus respectés sont les Tueurs de Monstres - ceux qui chassent griffons, manticores et chimères. La Guilde des Chasseurs organise la Grande Battue annuelle, où le champion ramène la tête du plus grand prédateur.`,
  
  primary_stat: 'dexterity',
  secondary_stat: 'wisdom',
  
  starting_tools: [
    { itemId: 'hunting_bow', quantity: 1 },
    { itemId: 'arrows_hunting', quantity: 30 },
    { itemId: 'skinning_knife', quantity: 1 },
    { itemId: 'trap_basic', quantity: 3 }
  ],
  
  ranks: [
    {
      level: 1,
      title: 'Chasseur Novice',
      xp_required: 0,
      recipes_unlocked: [],
      passive_bonuses: [
        'Traquer animaux communs (lapins, cerfs, sangliers)',
        'Suivre pistes fraîches (<6h)',
        'Discrétion en forêt +2'
      ]
    },
    {
      level: 5,
      title: 'Traqueur Confirmé',
      xp_required: 1000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Traquer prédateurs (loups, ours, grands félins)',
        'Suivre pistes anciennes (<3 jours)',
        'Camouflage naturel : Invisible si immobile',
        '+25% qualité viande/peaux récoltées'
      ]
    },
    {
      level: 10,
      title: 'Maître Chasseur',
      xp_required: 5000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Traquer créatures magiques (griffons, manticores)',
        'Reconstituer scène complète depuis pistes',
        'Prédation instinctive : Sentir proie dans 100m',
        '+50% qualité, Trophées de qualité supérieure',
        'Tir précis : Critique sur proie non-alertée'
      ],
      special_ability: 'Appel du Chasseur : Attirer proie spécifique dans 1km (1/jour)'
    },
    {
      level: 15,
      title: 'Seigneur de la Traque',
      xp_required: 15000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Traquer créatures légendaires (dragons, phénix)',
        'Lien empathique avec proie (sentir émotions/intentions)',
        'Invisibilité du prédateur : Indétectable par proie',
        '+100% qualité, Trophées légendaires garantis',
        'Une flèche, un mort : Premier tir = instant kill (créatures non-boss)'
      ],
      special_ability: 'Marque du Chasseur Ultime : Marquer créature légendaire. Toujours savoir position exacte (permanent, 1 cible)'
    }
  ],
  
  recipes: [],
  
  specializations: [
    {
      id: 'tracker',
      name: 'Traqueur Expert',
      description: 'Maître du pistage. Suit pistes impossibles, reconstruit historique complet de la proie.',
      unlock_level: 8,
      bonus_effects: [
        'Pistage temporel : Remonter piste jusqu\'à 1 mois',
        'Vision du chasseur : Voir silhouettes résiduelles des créatures passées',
        'Analyse prédictive : Prévoir chemin futur de proie (30 min)',
        'Ne perd JAMAIS une piste une fois détectée'
      ]
    },
    {
      id: 'trophy_hunter',
      name: 'Chasseur de Trophées',
      description: 'Collectionneur de reliques animales. Trophées récoltés ont propriétés magiques amplifiées.',
      unlock_level: 8,
      bonus_effects: [
        'Dépeçage parfait : Préserve 100% parties utilisables',
        'Trophées enchantés : Crânes/cornes deviennent objets magiques',
        'Taxidermie légendaire : Créer mannequins animés de proies',
        'Synergy Enchanting : Trophées comme focus pour sorts animaliers'
      ]
    },
    {
      id: 'monster_slayer',
      name: 'Tueur de Monstres',
      description: 'Spécialisé dans chasse de créatures dangereuses. Bonus dégâts massifs contre monstres.',
      unlock_level: 10,
      bonus_effects: [
        'Connaissance monstrueuse : Identifier points faibles instantanément',
        'Tueur-né : +50% dégâts contre aberrations/monstruosités/dragons',
        'Résistance bestiale : Réduction 50% dégâts de créatures',
        'Synergy Alchemy : Organes de monstres → Potions de mutation'
      ]
    }
  ],
  
  synergies_with: ['skinning', 'cooking', 'leatherworking'],
  
  faction_reputation: [
    { factionId: 'guilde_chasseurs', bonus_per_rank: 12 },
    { factionId: 'rodeurs_foret', bonus_per_rank: 10 },
    { factionId: 'tueurs_monstres', bonus_per_rank: 8 }
  ]
};

// ============================================================
// ZONES DE CHASSE & GIBIER
// ============================================================

export interface HuntingGround {
  id: string;
  name: string;
  level_required: number;
  found_in: string[];
  yield_meat_kg: [number, number];
  hunt_time_minutes: number;
  difficulty_dc: number;
  special_conditions?: string;
  trophy_value: number;
  lore_description: string;
}

export const HUNTING_GROUNDS: HuntingGround[] = [
  // Niveau 1-4
  {
    id: 'common_rabbit',
    name: 'Lapin Sauvage',
    level_required: 1,
    found_in: ['Prairies', 'Lisières Forestières', 'Champs Abandonnés'],
    yield_meat_kg: [1, 3],
    hunt_time_minutes: 30,
    difficulty_dc: 8,
    trophy_value: 1,
    lore_description: 'Petite créature timide et rapide. Viande tendre et savoureuse. La proie parfaite pour apprentis chasseurs. Leur fourrure fait d\'excellentes doublures de capuches.'
  },
  {
    id: 'forest_deer',
    name: 'Cerf des Bois',
    level_required: 2,
    found_in: ['Forêts Tempérées', 'Collines Boisées', 'Clairières'],
    yield_meat_kg: [30, 60],
    hunt_time_minutes: 120,
    difficulty_dc: 12,
    trophy_value: 25,
    lore_description: 'Majestueux herbivore aux bois ramifiés. Sens aiguisés le rendent difficile à approcher. Les chasseurs honorent le Cerf comme symbole de la forêt. Ses bois sont sculptés en amulettes.'
  },
  {
    id: 'wild_boar',
    name: 'Sanglier Sauvage',
    level_required: 3,
    found_in: ['Forêts Denses', 'Marais', 'Sous-Bois'],
    yield_meat_kg: [40, 80],
    hunt_time_minutes: 90,
    difficulty_dc: 14,
    trophy_value: 20,
    lore_description: 'Bête agressive aux défenses acérées. Charge sans hésiter si acculé. Viande riche et grasse, appréciée l\'hiver. Chasser un mâle alpha est rite de passage pour jeunes guerriers.'
  },

  // Niveau 5-9
  {
    id: 'dire_wolf',
    name: 'Loup Sombre',
    level_required: 5,
    found_in: ['Forêts Nordiques', 'Montagnes Enneigées', 'Terres Sauvages'],
    yield_meat_kg: [20, 40],
    hunt_time_minutes: 180,
    difficulty_dc: 16,
    trophy_value: 80,
    lore_description: 'Prédateur redoutable chassant en meute. Plus grands et féroces que loups ordinaires. Leurs yeux brillent dans l\'obscurité. Peau prisée pour capes de guerre. Les Nordiques les considèrent sacrés.'
  },
  {
    id: 'cave_bear',
    name: 'Ours des Cavernes',
    level_required: 6,
    found_in: ['Grottes Montagneuses', 'Forêts Anciennes', 'Tanières Isolées'],
    yield_meat_kg: [100, 200],
    hunt_time_minutes: 240,
    difficulty_dc: 18,
    trophy_value: 150,
    lore_description: 'Colosse territorial pesant 500kg. Griffes capables d\'arracher un bras. Viande sustentielle nourrissant famille entière 1 mois. Tuer ours des cavernes seul = preuve de bravoure légendaire.'
  },
  {
    id: 'giant_eagle',
    name: 'Aigle Géant',
    level_required: 7,
    found_in: ['Pics Montagneux', 'Falaises Inaccessibles', 'Nids Célestes'],
    yield_meat_kg: [15, 30],
    hunt_time_minutes: 150,
    difficulty_dc: 17,
    trophy_value: 200,
    lore_description: 'Rapace majestueux d\'envergure 6 mètres. Vue perçante détecte souris à 1km. Plumes utilisées pour flèches magiques. Certains sont intelligents et parlent - tuer l\'un par erreur = malédiction.'
  },

  // Niveau 10-14
  {
    id: 'griffon_wild',
    name: 'Griffon Sauvage',
    level_required: 10,
    found_in: ['Montagnes Escarpées', 'Ruines Célestes', 'Territoires Aériens'],
    yield_meat_kg: [80, 150],
    hunt_time_minutes: 360,
    difficulty_dc: 22,
    trophy_value: 800,
    lore_description: 'Hybride lion-aigle de noblesse légendaire. Extrêmement territorial, attaque à vue intrus. Crins et plumes valent fortune. Apprivoiser un Griffon = monture ultime, mais chasse d\'un sauvage reste test suprême.'
  },
  {
    id: 'manticore',
    name: 'Manticore',
    level_required: 12,
    found_in: ['Déserts Maudits', 'Ruines Anciennes', 'Terres Désolées'],
    yield_meat_kg: [100, 180],
    hunt_time_minutes: 420,
    difficulty_dc: 24,
    trophy_value: 1500,
    lore_description: 'Monstre à tête humaine, corps de lion, ailes de chauve-souris, queue à dards venimeux. Intelligence cruelle. Mange les humains. Dards sont ingrédients alchimiques mortels. Chasser seul = suicide ou gloire éternelle.'
  },
  {
    id: 'white_stag',
    name: 'Cerf Blanc Ancestral',
    level_required: 11,
    found_in: ['Forêts Enchantées', 'Clairières Sacrées', 'Nexus Féeriques'],
    yield_meat_kg: [50, 70],
    hunt_time_minutes: 300,
    difficulty_dc: 21,
    special_conditions: 'Créature sacrée - certains refusent de chasser',
    trophy_value: 5000,
    lore_description: 'Cerf albinos légendaire vivant 500 ans. Protégé par esprits sylvestres. Le tuer apporte prospérité OU malédiction selon intentions chasseur. Ses bois peuvent ressusciter forêts mortes.'
  },

  // Niveau 15+ - Légendaire
  {
    id: 'elder_dragon_wyrmling',
    name: 'Dragonnet Ancien',
    level_required: 15,
    found_in: ['Lairs Draconiques', 'Volcans Anciens', 'Pics Interdits'],
    yield_meat_kg: [200, 500],
    hunt_time_minutes: 720,
    difficulty_dc: 28,
    special_conditions: 'EXTRÊMEMENT DANGEREUX - Peut attirer parent dragon',
    trophy_value: 50000,
    lore_description: 'Jeune dragon de 50 ans (enfant selon eux). Déjà redoutable : souffle enflammé, écailles quasi-impénétrables, intellect vif. Viande confère résistance feu temporaire. Écailles = armure légendaire. ATTENTION : Parent vengera.'
  },
  {
    id: 'phoenix_juvenile',
    name: 'Phénix Juvénile',
    level_required: 16,
    found_in: ['Volcans Sacrés', 'Temples du Feu', 'Plans Élémentaires (Feu)'],
    yield_meat_kg: [10, 20],
    hunt_time_minutes: 600,
    difficulty_dc: 26,
    special_conditions: 'Renaît de ses cendres après 7 jours',
    trophy_value: 100000,
    lore_description: 'Oiseau de flammes immortel. "Tuer" un Phénix est temporaire - il renaît. Mais durant 7 jours, récolter plumes/cendres. Plume de Phénix = ingrédient résurrection. Certains mages paient fortunes pour larme de Phénix.'
  },
  {
    id: 'ancient_behemoth',
    name: 'Béhémoth Primordial',
    level_required: 18,
    found_in: ['Terres Oubliées', 'Cœur de Continents', 'Réservés Titanesques'],
    yield_meat_kg: [2000, 5000],
    hunt_time_minutes: 1440,
    difficulty_dc: 30,
    special_conditions: 'Nécessite groupe de chasseurs légendaires',
    trophy_value: 500000,
    lore_description: 'Créature colossale vestige Ère Primordiale. 30m de haut, cuir épais comme murs de château. Chasse d\'un Béhémoth = expédition nationale. Viande nourrit ville entière 1 an. Os sculptés en portes de forteresse. Défenses = arcs titanesques.'
  }
];
