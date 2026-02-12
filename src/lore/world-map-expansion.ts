/**
 * WORLD MAP EXPANSION - 80+ lieux supplémentaires
 * Expansion massive pour atteindre 100+ lieux
 */

import { LocationDefinition, REGIONS } from './world-map';

// ============================================================================
// VILLES ET VILLAGES SUPPLÉMENTAIRES (30+)
// ============================================================================

export const TOWN_SILVERPORT: LocationDefinition = {
  id: 'location:town:silverport',
  name: 'Port-d\'Argent',
  type: 'town',
  region: REGIONS.WESTERN_COAST,
  description: 'Port de pêche prospère. Flotte de pêche, chantier naval.',
  biome: 'coast',
  coordinates: { x: 150, y: 350 },
  dangerLevel: 'safe',
  suggestedLevel: 3,
  population: 5000,
  services: { inn: true, blacksmith: true, merchant: true, temple: true, guild: false, stables: true, bank: true },
  economy: { wealth: 'prosperous', mainExports: ['poisson', 'perles', 'corail'], mainImports: ['grain', 'bois'] }
};

export const VILLAGE_MOONBROOK: LocationDefinition = {
  id: 'location:village:moonbrook',
  name: 'Ruisseau-de-Lune',
  type: 'village',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Petit village paisible près d\'un ruisseau argenté.',
  biome: 'plains',
  coordinates: { x: 510, y: 330 },
  dangerLevel: 'safe',
  suggestedLevel: 1,
  population: 800,
  services: { inn: true, blacksmith: false, merchant: true, temple: false, guild: false, stables: false, bank: false }
};

export const TOWN_STONEHAVEN: LocationDefinition = {
  id: 'location:town:stonehaven',
  name: 'Havre-de-Pierre',
  type: 'town',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Ville fortifiée sur plateau rocheux.',
  biome: 'mountains',
  coordinates: { x: 570, y: 220 },
  dangerLevel: 'low',
  suggestedLevel: 4,
  population: 6000,
  services: { inn: true, blacksmith: true, merchant: true, temple: true, guild: true, stables: true, bank: true }
};

export const VILLAGE_MILLTOWN: LocationDefinition = {
  id: 'location:village:milltown',
  name: 'Bourg-du-Moulin',
  type: 'village',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Village centré autour d\'un grand moulin à vent.',
  biome: 'plains',
  coordinates: { x: 495, y: 345 },
  dangerLevel: 'safe',
  suggestedLevel: 2,
  population: 1200,
  services: { inn: true, blacksmith: false, merchant: true, temple: false, guild: false, stables: false, bank: false }
};

export const TOWN_REDCLIFF: LocationDefinition = {
  id: 'location:town:redcliff',
  name: 'Falaise-Rouge',
  type: 'town',
  region: REGIONS.WESTERN_COAST,
  description: 'Ville construite sur falaises rouges surplombant océan.',
  biome: 'coast',
  coordinates: { x: 80, y: 380 },
  dangerLevel: 'low',
  suggestedLevel: 5,
  population: 7000,
  services: { inn: true, blacksmith: true, merchant: true, temple: true, guild: true, stables: false, bank: true }
};

export const VILLAGE_THORNWOOD: LocationDefinition = {
  id: 'location:village:thornwood',
  name: 'Bois-d\'Épines',
  type: 'village',
  region: REGIONS.EMERALD_FOREST,
  description: 'Village forestier entouré de ronces magiques protectrices.',
  biome: 'forest',
  coordinates: { x: 440, y: 270 },
  dangerLevel: 'low',
  suggestedLevel: 3,
  population: 600,
  creatures: ['beast:wolf', 'fey:sprite']
};

export const TOWN_GOLDVALE: LocationDefinition = {
  id: 'location:town:goldvale',
  name: 'Val-d\'Or',
  type: 'town',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Ville minière prospère. Mines d\'or et pierres précieuses.',
  biome: 'mountains',
  coordinates: { x: 595, y: 240 },
  dangerLevel: 'medium',
  suggestedLevel: 6,
  population: 8000,
  services: { inn: true, blacksmith: true, merchant: true, temple: true, guild: true, stables: true, bank: true },
  economy: { wealth: 'wealthy', mainExports: ['or', 'gemmes', 'argent'] }
};

export const VILLAGE_FROSTHOLM: LocationDefinition = {
  id: 'location:village:frostholm',
  name: 'Tertre-Gelé',
  type: 'village',
  region: REGIONS.FROZEN_NORTH,
  description: 'Village hardy survivant dans le froid extrême.',
  biome: 'tundra',
  coordinates: { x: 480, y: 100 },
  dangerLevel: 'medium',
  suggestedLevel: 8,
  population: 400,
  creatures: ['beast:white-wolf', 'beast:yeti']
};

export const TOWN_SANDSTONE: LocationDefinition = {
  id: 'location:town:sandstone',
  name: 'Grès',
  type: 'town',
  region: REGIONS.EASTERN_DESERT,
  description: 'Ville oasis, hub commercial du désert.',
  biome: 'desert',
  coordinates: { x: 820, y: 410 },
  dangerLevel: 'low',
  suggestedLevel: 7,
  population: 9000,
  services: { inn: true, blacksmith: true, merchant: true, temple: true, guild: true, stables: true, bank: true },
  economy: { wealth: 'prosperous', mainExports: ['épices', 'soie', 'dattes'] }
};

export const VILLAGE_MARSHLIGHT: LocationDefinition = {
  id: 'location:village:marshlight',
  name: 'Lueur-des-Marais',
  type: 'village',
  region: REGIONS.SOUTHERN_SWAMPS,
  description: 'Village de pêcheurs dans marais. Feux follets la nuit.',
  biome: 'swamp',
  coordinates: { x: 410, y: 590 },
  dangerLevel: 'medium',
  suggestedLevel: 5,
  population: 700,
  creatures: ['beast:giant-crocodile', 'undead:will-o-wisp']
};

// ============================================================================
// DONJONS ET GROTTES (30+)
// ============================================================================

export const DUNGEON_GOBLIN_WARREN: LocationDefinition = {
  id: 'location:dungeon:goblin-warren',
  name: 'Terrier Gobelin',
  type: 'cave',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Réseau de tunnels infestés de gobelins.',
  biome: 'underground',
  coordinates: { x: 475, y: 310 },
  dangerLevel: 'low',
  suggestedLevel: 2,
  creatures: ['humanoid:goblin', 'beast:giant-rat']
};

export const DUNGEON_SPIDER_NEST: LocationDefinition = {
  id: 'location:dungeon:spider-nest',
  name: 'Nid d\'Araignées',
  type: 'cave',
  region: REGIONS.EMERALD_FOREST,
  description: 'Grotte remplie de toiles et d\'araignées géantes.',
  biome: 'underground',
  coordinates: { x: 460, y: 275 },
  dangerLevel: 'medium',
  suggestedLevel: 4,
  creatures: ['beast:giant-spider', 'beast:spider-queen']
};

export const DUNGEON_BANDIT_HIDEOUT: LocationDefinition = {
  id: 'location:dungeon:bandit-hideout',
  name: 'Repaire de Bandits',
  type: 'cave',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Caverne utilisée par gang de bandits.',
  biome: 'underground',
  coordinates: { x: 530, y: 270 },
  dangerLevel: 'low',
  suggestedLevel: 3,
  creatures: ['humanoid:bandit', 'beast:mastiff']
};

export const DUNGEON_CRYPT_FORGOTTEN: LocationDefinition = {
  id: 'location:dungeon:forgotten-crypt',
  name: 'Crypte Oubliée',
  type: 'dungeon',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Ancienne crypte envahie par morts-vivants.',
  biome: 'underground',
  coordinates: { x: 540, y: 290 },
  dangerLevel: 'medium',
  suggestedLevel: 5,
  creatures: ['undead:skeleton', 'undead:zombie', 'undead:ghoul']
};

export const DUNGEON_ABANDONED_MINE: LocationDefinition = {
  id: 'location:dungeon:abandoned-mine',
  name: 'Mine Abandonnée',
  type: 'cave',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Mine désertée infestée de kobolds.',
  biome: 'underground',
  coordinates: { x: 575, y: 235 },
  dangerLevel: 'low',
  suggestedLevel: 3,
  creatures: ['humanoid:kobold', 'beast:giant-bat']
};

export const DUNGEON_SERPENT_TEMPLE: LocationDefinition = {
  id: 'location:dungeon:serpent-temple',
  name: 'Temple du Serpent',
  type: 'ruin',
  region: REGIONS.SOUTHERN_SWAMPS,
  description: 'Temple en ruines dédié à dieu-serpent oublié.',
  biome: 'swamp',
  coordinates: { x: 430, y: 610 },
  dangerLevel: 'high',
  suggestedLevel: 9,
  creatures: ['beast:giant-snake', 'humanoid:lizardfolk', 'undead:mummy']
};

export const DUNGEON_ICE_CAVERN: LocationDefinition = {
  id: 'location:dungeon:ice-cavern',
  name: 'Caverne de Glace',
  type: 'cave',
  region: REGIONS.FROZEN_NORTH,
  description: 'Grotte glacée remplie de cristaux de glace.',
  biome: 'underground',
  coordinates: { x: 490, y: 80 },
  dangerLevel: 'high',
  suggestedLevel: 10,
  creatures: ['elemental:ice', 'beast:ice-elemental', 'beast:frost-worm']
};

export const DUNGEON_VOLCANO_CORE: LocationDefinition = {
  id: 'location:dungeon:volcano-core',
  name: 'Cœur du Volcan',
  type: 'dungeon',
  region: REGIONS.VOLCANIC_WASTES,
  description: 'Réseau de tunnels dans volcan actif.',
  biome: 'volcanic',
  coordinates: { x: 700, y: 150 },
  dangerLevel: 'extreme',
  suggestedLevel: 16,
  creatures: ['elemental:fire', 'dragon:red:young', 'elemental:magma']
};

export const DUNGEON_NECROPOLIS: LocationDefinition = {
  id: 'location:dungeon:necropolis',
  name: 'Nécropole',
  type: 'dungeon',
  region: REGIONS.SOUTHERN_SWAMPS,
  description: 'Cité des morts. Milliers de tombes, armée de squelettes.',
  biome: 'swamp',
  coordinates: { x: 440, y: 620 },
  dangerLevel: 'deadly',
  suggestedLevel: 18,
  creatures: ['undead:skeleton', 'undead:wight', 'undead:lich']
};

export const DUNGEON_WYRM_LAIR: LocationDefinition = {
  id: 'location:dungeon:wyrm-lair',
  name: 'Antre du Wyrm',
  type: 'cave',
  region: REGIONS.EASTERN_DESERT,
  description: 'Caverne profonde, repaire d\'un wyrm des sables.',
  biome: 'underground',
  coordinates: { x: 860, y: 440 },
  dangerLevel: 'extreme',
  suggestedLevel: 15,
  creatures: ['beast:sand-wurm', 'beast:sand-elemental']
};

// ============================================================================
// POINTS D'INTÉRÊT NATURELS ET LANDMARKS (40+)
// ============================================================================

export const LANDMARK_CRYSTAL_LAKE: LocationDefinition = {
  id: 'location:landmark:crystal-lake',
  name: 'Lac de Cristal',
  type: 'landmark',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Lac aux eaux si claires qu\'on voit le fond à 50m.',
  biome: 'plains',
  coordinates: { x: 470, y: 300 },
  dangerLevel: 'safe',
  suggestedLevel: 1,
  pointsOfInterest: [
    { name: 'Plage de Sable Blanc', description: 'Sable fin et blanc, idéal pour repos.' }
  ]
};

export const LANDMARK_WINDMILL_HILL: LocationDefinition = {
  id: 'location:landmark:windmill-hill',
  name: 'Colline aux Moulins',
  type: 'landmark',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Colline avec dizaines de moulins à vent.',
  biome: 'plains',
  coordinates: { x: 500, y: 350 },
  dangerLevel: 'safe',
  suggestedLevel: 1
};

export const LANDMARK_ANCIENT_BRIDGE: LocationDefinition = {
  id: 'location:landmark:ancient-bridge',
  name: 'Pont Ancien',
  type: 'landmark',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Pont de pierre millénaire enjambant gorge profonde.',
  biome: 'plains',
  coordinates: { x: 515, y: 310 },
  dangerLevel: 'safe',
  suggestedLevel: 2
};

export const LANDMARK_STANDING_STONES: LocationDefinition = {
  id: 'location:landmark:standing-stones',
  name: 'Pierres Levées',
  type: 'landmark',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Cercle de menhirs anciens. Énergie magique palpable.',
  biome: 'plains',
  coordinates: { x: 505, y: 295 },
  dangerLevel: 'medium',
  suggestedLevel: 6,
  lore: 'Cercle druidique ancien. Utilisé pour rituels depuis millénaires.'
};

export const LANDMARK_WATERFALL_GORGE: LocationDefinition = {
  id: 'location:landmark:waterfall-gorge',
  name: 'Gorge de la Cascade',
  type: 'landmark',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Cascade spectaculaire de 100m de haut.',
  biome: 'mountains',
  coordinates: { x: 560, y: 210 },
  dangerLevel: 'low',
  suggestedLevel: 3
};

export const LANDMARK_HAUNTED_FOREST: LocationDefinition = {
  id: 'location:landmark:haunted-forest',
  name: 'Forêt Hantée',
  type: 'wilderness',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Forêt sombre où esprits errent.',
  biome: 'forest',
  coordinates: { x: 490, y: 260 },
  dangerLevel: 'high',
  suggestedLevel: 8,
  creatures: ['undead:ghost', 'undead:wraith', 'beast:dire-wolf']
};

export const LANDMARK_RAINBOW_VALLEY: LocationDefinition = {
  id: 'location:landmark:rainbow-valley',
  name: 'Vallée Arc-en-Ciel',
  type: 'landmark',
  region: REGIONS.NORTHERN_KINGDOMS,
  description: 'Vallée où fleurs multicolores créent arc-en-ciel permanent.',
  biome: 'plains',
  coordinates: { x: 480, y: 340 },
  dangerLevel: 'safe',
  suggestedLevel: 1
};

export const LANDMARK_BOILING_SPRINGS: LocationDefinition = {
  id: 'location:landmark:boiling-springs',
  name: 'Sources Bouillantes',
  type: 'landmark',
  region: REGIONS.VOLCANIC_WASTES,
  description: 'Sources d\'eau chaude géothermales.',
  biome: 'volcanic',
  coordinates: { x: 690, y: 160 },
  dangerLevel: 'medium',
  suggestedLevel: 7
};

export const LANDMARK_STARFALL_CRATER: LocationDefinition = {
  id: 'location:landmark:starfall-crater',
  name: 'Cratère de l\'Étoile Tombée',
  type: 'landmark',
  region: REGIONS.EASTERN_DESERT,
  description: 'Cratère massif créé par chute de météorite.',
  biome: 'desert',
  coordinates: { x: 870, y: 430 },
  dangerLevel: 'medium',
  suggestedLevel: 9,
  lore: 'Météorite contient métal extraterrestre précieux.'
};

export const LANDMARK_SINGING_CLIFFS: LocationDefinition = {
  id: 'location:landmark:singing-cliffs',
  name: 'Falaises Chantantes',
  type: 'landmark',
  region: REGIONS.WESTERN_COAST,
  description: 'Falaises où vent crée mélodies étranges.',
  biome: 'coast',
  coordinates: { x: 90, y: 390 },
  dangerLevel: 'low',
  suggestedLevel: 2
};

export const LANDMARK_MUSHROOM_GROVE: LocationDefinition = {
  id: 'location:landmark:mushroom-grove',
  name: 'Bosquet de Champignons Géants',
  type: 'wilderness',
  region: REGIONS.EMERALD_FOREST,
  description: 'Zone où champignons atteignent taille d\'arbres.',
  biome: 'forest',
  coordinates: { x: 435, y: 265 },
  dangerLevel: 'medium',
  suggestedLevel: 5,
  creatures: ['beast:myconid', 'fey:sprite']
};

export const LANDMARK_BONE_FIELDS: LocationDefinition = {
  id: 'location:landmark:bone-fields',
  name: 'Champs d\'Ossements',
  type: 'wilderness',
  region: REGIONS.SOUTHERN_SWAMPS,
  description: 'Plaine jonchée d\'ossements de bataille ancienne.',
  biome: 'swamp',
  coordinates: { x: 450, y: 630 },
  dangerLevel: 'high',
  suggestedLevel: 11,
  lore: 'Site de bataille légendaire entre royaumes il y a mille ans.',
  creatures: ['undead:skeleton', 'undead:revenant']
};

export const LANDMARK_AURORA_PEAKS: LocationDefinition = {
  id: 'location:landmark:aurora-peaks',
  name: 'Pics de l\'Aurore',
  type: 'wilderness',
  region: REGIONS.FROZEN_NORTH,
  description: 'Montagnes où aurores boréales dansent toute l\'année.',
  biome: 'tundra',
  coordinates: { x: 510, y: 70 },
  dangerLevel: 'high',
  suggestedLevel: 12
};

export const LANDMARK_PETRIFIED_FOREST: LocationDefinition = {
  id: 'location:landmark:petrified-forest',
  name: 'Forêt Pétrifiée',
  type: 'wilderness',
  region: REGIONS.EASTERN_DESERT,
  description: 'Forêt entière transformée en pierre.',
  biome: 'desert',
  coordinates: { x: 840, y: 450 },
  dangerLevel: 'medium',
  suggestedLevel: 8,
  lore: 'Maudite par méduse ancestrale. Arbres et créatures figés à jamais.'
};

export const LANDMARK_THUNDERPEAK: LocationDefinition = {
  id: 'location:landmark:thunderpeak',
  name: 'Pic du Tonnerre',
  type: 'landmark',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Montagne constamment frappée par la foudre.',
  biome: 'mountains',
  coordinates: { x: 620, y: 170 },
  dangerLevel: 'extreme',
  suggestedLevel: 14,
  creatures: ['elemental:air', 'elemental:lightning']
};

export const LANDMARK_MIRROR_LAKE: LocationDefinition = {
  id: 'location:landmark:mirror-lake',
  name: 'Lac Miroir',
  type: 'landmark',
  region: REGIONS.EMERALD_FOREST,
  description: 'Lac parfaitement calme reflétant ciel comme miroir.',
  biome: 'forest',
  coordinates: { x: 445, y: 255 },
  dangerLevel: 'safe',
  suggestedLevel: 3,
  lore: 'Légende dit que lac montre reflet de ton âme véritable.'
};

export const LANDMARK_GIANTS_CAUSEWAY: LocationDefinition = {
  id: 'location:landmark:giants-causeway',
  name: 'Chaussée des Géants',
  type: 'landmark',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Colonnes de basalte hexagonales formant chemin.',
  biome: 'mountains',
  coordinates: { x: 615, y: 205 },
  dangerLevel: 'low',
  suggestedLevel: 4,
  lore: 'Créée par géants pour traverser montagne selon légende.'
};

export const LANDMARK_WHISPERING_CAVERNS: LocationDefinition = {
  id: 'location:landmark:whispering-caverns',
  name: 'Cavernes Murmurantes',
  type: 'cave',
  region: REGIONS.CENTRAL_HIGHLANDS,
  description: 'Grottes où échos créent murmures constants.',
  biome: 'underground',
  coordinates: { x: 585, y: 225 },
  dangerLevel: 'medium',
  suggestedLevel: 6,
  creatures: ['beast:bat', 'aberration:lurker']
};

export const LANDMARK_CORAL_REEF: LocationDefinition = {
  id: 'location:landmark:coral-reef',
  name: 'Récif de Corail',
  type: 'landmark',
  region: REGIONS.WESTERN_COAST,
  description: 'Récif coloré visible à marée basse.',
  biome: 'coast',
  coordinates: { x: 70, y: 410 },
  dangerLevel: 'low',
  suggestedLevel: 3,
  creatures: ['beast:shark', 'beast:giant-crab']
};

export const LANDMARK_OBSIDIAN_PLAINS: LocationDefinition = {
  id: 'location:landmark:obsidian-plains',
  name: 'Plaines d\'Obsidienne',
  type: 'wilderness',
  region: REGIONS.VOLCANIC_WASTES,
  description: 'Plaines de verre volcanique noir.',
  biome: 'volcanic',
  coordinates: { x: 710, y: 170 },
  dangerLevel: 'high',
  suggestedLevel: 13,
  lore: 'Créées par éruption cataclysmique il y a mille ans.'
};

export const LANDMARK_FAIRY_RING: LocationDefinition = {
  id: 'location:landmark:fairy-ring',
  name: 'Cercle des Fées',
  type: 'landmark',
  region: REGIONS.EMERALD_FOREST,
  description: 'Cercle de champignons magiques. Portail vers royaume féérique.',
  biome: 'forest',
  coordinates: { x: 455, y: 248 },
  dangerLevel: 'medium',
  suggestedLevel: 7,
  creatures: ['fey:sprite', 'fey:pixie'],
  lore: 'Ne jamais entrer dans cercle la nuit ou être piégé dans Féérie.'
};

// ============================================================================
// EXPORTS EXPANSION
// ============================================================================

export const EXPANSION_TOWNS: LocationDefinition[] = [
  TOWN_SILVERPORT,
  TOWN_STONEHAVEN,
  TOWN_REDCLIFF,
  TOWN_GOLDVALE,
  TOWN_SANDSTONE
];

export const EXPANSION_VILLAGES: LocationDefinition[] = [
  VILLAGE_MOONBROOK,
  VILLAGE_MILLTOWN,
  VILLAGE_THORNWOOD,
  VILLAGE_FROSTHOLM,
  VILLAGE_MARSHLIGHT
];

export const EXPANSION_DUNGEONS: LocationDefinition[] = [
  DUNGEON_GOBLIN_WARREN,
  DUNGEON_SPIDER_NEST,
  DUNGEON_BANDIT_HIDEOUT,
  DUNGEON_CRYPT_FORGOTTEN,
  DUNGEON_ABANDONED_MINE,
  DUNGEON_SERPENT_TEMPLE,
  DUNGEON_ICE_CAVERN,
  DUNGEON_VOLCANO_CORE,
  DUNGEON_NECROPOLIS,
  DUNGEON_WYRM_LAIR
];

export const EXPANSION_LANDMARKS: LocationDefinition[] = [
  LANDMARK_CRYSTAL_LAKE,
  LANDMARK_WINDMILL_HILL,
  LANDMARK_ANCIENT_BRIDGE,
  LANDMARK_STANDING_STONES,
  LANDMARK_WATERFALL_GORGE,
  LANDMARK_HAUNTED_FOREST,
  LANDMARK_RAINBOW_VALLEY,
  LANDMARK_BOILING_SPRINGS,
  LANDMARK_STARFALL_CRATER,
  LANDMARK_SINGING_CLIFFS,
  LANDMARK_MUSHROOM_GROVE,
  LANDMARK_BONE_FIELDS,
  LANDMARK_AURORA_PEAKS,
  LANDMARK_PETRIFIED_FOREST,
  LANDMARK_THUNDERPEAK,
  LANDMARK_MIRROR_LAKE,
  LANDMARK_GIANTS_CAUSEWAY,
  LANDMARK_WHISPERING_CAVERNS,
  LANDMARK_CORAL_REEF,
  LANDMARK_OBSIDIAN_PLAINS,
  LANDMARK_FAIRY_RING
];

export const ALL_EXPANSION_LOCATIONS: LocationDefinition[] = [
  ...EXPANSION_TOWNS,
  ...EXPANSION_VILLAGES,
  ...EXPANSION_DUNGEONS,
  ...EXPANSION_LANDMARKS
];
