/**
 * AETHELGARD RESOURCES - Ressources récoltables du monde
 * 60+ ressources organisées par type et biome
 */

import type { ProfessionType } from './schema';

// ============================================================================
// TYPES
// ============================================================================

export type ResourceRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type ResourceCategory = 'ore' | 'herb' | 'fish' | 'wood' | 'leather' | 'cloth' | 'gem' | 'reagent';
export type BiomeType = 'plains' | 'forest' | 'mountain' | 'desert' | 'swamp' | 'tundra' | 'ocean' | 'cave' | 'volcanic' | 'mystic';
export type SeasonType = 'spring' | 'summer' | 'autumn' | 'winter' | 'all';

export interface ResourceDefinition {
  id: string;
  name: string;
  category: ResourceCategory;
  rarity: ResourceRarity;
  description: string;
  gatheredBy: ProfessionType;
  biomes: BiomeType[];
  season: SeasonType | SeasonType[];
  levelRequired: number;
  baseYield: number; // Quantité de base par récolte
  respawnTime: number; // En minutes
  value: number; // Prix de vente de base
  usedBy?: ProfessionType[]; // Métiers qui utilisent cette ressource
  specialProperties?: string;
}

// ============================================================================
// MINERAIS (MINING)
// ============================================================================

export const COPPER_ORE: ResourceDefinition = {
  id: 'ore:copper',
  name: "Minerai de Cuivre",
  category: 'ore',
  rarity: 'common',
  description: "Minerai orange-brun abondant, facile à fondre. Base de tout travail de forge.",
  gatheredBy: 'mining',
  biomes: ['plains', 'forest', 'mountain'],
  season: 'all',
  levelRequired: 1,
  baseYield: 3,
  respawnTime: 5,
  value: 5,
  usedBy: ['smithing']
};

export const TIN_ORE: ResourceDefinition = {
  id: 'ore:tin',
  name: "Minerai d'Étain",
  category: 'ore',
  rarity: 'common',
  description: "Minerai gris-argenté. Allié au cuivre pour créer du bronze.",
  gatheredBy: 'mining',
  biomes: ['mountain', 'cave'],
  season: 'all',
  levelRequired: 1,
  baseYield: 2,
  respawnTime: 5,
  value: 8,
  usedBy: ['smithing']
};

export const IRON_ORE: ResourceDefinition = {
  id: 'ore:iron',
  name: "Minerai de Fer",
  category: 'ore',
  rarity: 'common',
  description: "Minerai brun-rouille, pierre angulaire de l'industrie. Donne un acier solide une fois raffiné.",
  gatheredBy: 'mining',
  biomes: ['mountain', 'cave', 'plains'],
  season: 'all',
  levelRequired: 10,
  baseYield: 2,
  respawnTime: 10,
  value: 15,
  usedBy: ['smithing']
};

export const SILVER_ORE: ResourceDefinition = {
  id: 'ore:silver',
  name: "Minerai d'Argent",
  category: 'ore',
  rarity: 'uncommon',
  description: "Minerai brillant aux veines argentées. Conduit bien la magie, utilisé en joaillerie.",
  gatheredBy: 'mining',
  biomes: ['mountain', 'cave'],
  season: 'all',
  levelRequired: 25,
  baseYield: 1,
  respawnTime: 30,
  value: 50,
  usedBy: ['smithing', 'jewelcrafting'],
  specialProperties: "Conducteur magique"
};

export const GOLD_ORE: ResourceDefinition = {
  id: 'ore:gold',
  name: "Minerai d'Or",
  category: 'ore',
  rarity: 'uncommon',
  description: "Minerai jaune éclatant, symbole de richesse. Malléable et précieux.",
  gatheredBy: 'mining',
  biomes: ['mountain', 'cave', 'desert'],
  season: 'all',
  levelRequired: 30,
  baseYield: 1,
  respawnTime: 45,
  value: 100,
  usedBy: ['jewelcrafting', 'smithing']
};

export const MITHRIL_ORE: ResourceDefinition = {
  id: 'ore:mithril',
  name: "Minerai de Mythril",
  category: 'ore',
  rarity: 'rare',
  description: "Métal argenté-bleuté d'origine magique, léger comme l'air mais dur comme l'acier. Trouvé dans les profondeurs anciennes.",
  gatheredBy: 'mining',
  biomes: ['cave', 'mountain', 'mystic'],
  season: 'all',
  levelRequired: 50,
  baseYield: 1,
  respawnTime: 120,
  value: 500,
  usedBy: ['smithing', 'enchanting'],
  specialProperties: "Résistance magique +10%"
};

export const ADAMANTINE_ORE: ResourceDefinition = {
  id: 'ore:adamantine',
  name: "Adamantine Brute",
  category: 'ore',
  rarity: 'epic',
  description: "Métal noir indestructible forgé dans le cœur des étoiles mortes. Le matériau le plus dur d'Aethelgard.",
  gatheredBy: 'mining',
  biomes: ['volcanic', 'cave'],
  season: 'all',
  levelRequired: 75,
  baseYield: 1,
  respawnTime: 240,
  value: 2000,
  usedBy: ['smithing'],
  specialProperties: "Indestructible, +5 AC"
};

export const CELESTIAL_IRON: ResourceDefinition = {
  id: 'ore:celestial-iron',
  name: "Fer Céleste",
  category: 'ore',
  rarity: 'legendary',
  description: "Fragments de météorite tombés du ciel. Brille d'une lueur stellaire. Peut blesser créatures divines et infernales.",
  gatheredBy: 'mining',
  biomes: ['mountain', 'plains'],
  season: 'all',
  levelRequired: 90,
  baseYield: 1,
  respawnTime: 480,
  value: 5000,
  usedBy: ['smithing', 'enchanting'],
  specialProperties: "Dégâts sacrés, blesse démons/anges"
};

// ============================================================================
// GEMMES (MINING / JEWELCRAFTING)
// ============================================================================

export const QUARTZ: ResourceDefinition = {
  id: 'gem:quartz',
  name: "Quartz Brut",
  category: 'gem',
  rarity: 'common',
  description: "Cristal transparent commun. Utilisé en joaillerie basique.",
  gatheredBy: 'mining',
  biomes: ['mountain', 'cave'],
  season: 'all',
  levelRequired: 5,
  baseYield: 2,
  respawnTime: 15,
  value: 10,
  usedBy: ['jewelcrafting']
};

export const RUBY: ResourceDefinition = {
  id: 'gem:ruby',
  name: "Rubis Brut",
  category: 'gem',
  rarity: 'uncommon',
  description: "Gemme rouge sang, chaude au toucher. Amplifie magie du feu.",
  gatheredBy: 'mining',
  biomes: ['volcanic', 'mountain'],
  season: 'all',
  levelRequired: 35,
  baseYield: 1,
  respawnTime: 60,
  value: 200,
  usedBy: ['jewelcrafting', 'enchanting'],
  specialProperties: "Affinité feu +15%"
};

export const SAPPHIRE: ResourceDefinition = {
  id: 'gem:sapphire',
  name: "Saphir Brut",
  category: 'gem',
  rarity: 'uncommon',
  description: "Gemme bleue profonde comme l'océan. Amplifie magie de l'eau et de la glace.",
  gatheredBy: 'mining',
  biomes: ['ocean', 'tundra', 'mountain'],
  season: ['winter', 'all'],
  levelRequired: 35,
  baseYield: 1,
  respawnTime: 60,
  value: 200,
  usedBy: ['jewelcrafting', 'enchanting'],
  specialProperties: "Affinité glace +15%"
};

export const EMERALD: ResourceDefinition = {
  id: 'gem:emerald',
  name: "Émeraude Brute",
  category: 'gem',
  rarity: 'rare',
  description: "Gemme vert vif pulsant d'énergie vitale. Utilisée en magie de guérison.",
  gatheredBy: 'mining',
  biomes: ['forest', 'mystic'],
  season: ['spring', 'summer'],
  levelRequired: 45,
  baseYield: 1,
  respawnTime: 90,
  value: 400,
  usedBy: ['jewelcrafting', 'enchanting', 'alchemy'],
  specialProperties: "Potions de soin +25%"
};

export const DIAMOND: ResourceDefinition = {
  id: 'gem:diamond',
  name: "Diamant Brut",
  category: 'gem',
  rarity: 'epic',
  description: "Cristal parfait d'une dureté inégalée. Focalise puissamment la magie pure.",
  gatheredBy: 'mining',
  biomes: ['cave', 'mountain'],
  season: 'all',
  levelRequired: 70,
  baseYield: 1,
  respawnTime: 180,
  value: 1500,
  usedBy: ['jewelcrafting', 'enchanting'],
  specialProperties: "Puissance magique +20%"
};

export const MOONSTONE: ResourceDefinition = {
  id: 'gem:moonstone',
  name: "Pierre de Lune",
  category: 'gem',
  rarity: 'legendary',
  description: "Gemme laiteuse brillant d'une lueur lunaire. Ne se trouve que les nuits de pleine lune dans lieux magiques.",
  gatheredBy: 'mining',
  biomes: ['mystic'],
  season: 'all',
  levelRequired: 85,
  baseYield: 1,
  respawnTime: 720, // 12 heures
  value: 3000,
  usedBy: ['jewelcrafting', 'enchanting'],
  specialProperties: "Magie lunaire, Divination +30%"
};

// ============================================================================
// HERBES (HERBALISM)
// ============================================================================

export const SILVERLEAF: ResourceDefinition = {
  id: 'herb:silverleaf',
  name: "Feuille d'Argent",
  category: 'herb',
  rarity: 'common',
  description: "Herbe aux feuilles argentées poussant dans les prairies. Base de toute potion de soin mineure.",
  gatheredBy: 'herbalism',
  biomes: ['plains', 'forest'],
  season: ['spring', 'summer'],
  levelRequired: 1,
  baseYield: 4,
  respawnTime: 5,
  value: 3,
  usedBy: ['alchemy']
};

export const PEACEBLOOM: ResourceDefinition = {
  id: 'herb:peacebloom',
  name: "Fleur de Paix",
  category: 'herb',
  rarity: 'common',
  description: "Petite fleur blanche aux propriétés calmantes. Utilisée en potions de régénération.",
  gatheredBy: 'herbalism',
  biomes: ['plains', 'forest'],
  season: ['spring', 'summer'],
  levelRequired: 1,
  baseYield: 3,
  respawnTime: 5,
  value: 3,
  usedBy: ['alchemy']
};

export const BLOODTHISTLE: ResourceDefinition = {
  id: 'herb:bloodthistle',
  name: "Chardon Sanguin",
  category: 'herb',
  rarity: 'uncommon',
  description: "Chardon rouge sang aux épines acérées. Composant de potions de force et poisons.",
  gatheredBy: 'herbalism',
  biomes: ['mountain', 'desert'],
  season: 'summer',
  levelRequired: 15,
  baseYield: 2,
  respawnTime: 20,
  value: 12,
  usedBy: ['alchemy'],
  specialProperties: "Potions de force +2 STR"
};

export const DREAMFOIL: ResourceDefinition = {
  id: 'herb:dreamfoil',
  name: "Feuille de Rêve",
  category: 'herb',
  rarity: 'uncommon',
  description: "Plante éthérée aux feuilles translucides. Induit visions prophétiques. Ingrédient clé en alchimie mentale.",
  gatheredBy: 'herbalism',
  biomes: ['mystic', 'forest'],
  season: ['spring', 'autumn'],
  levelRequired: 20,
  baseYield: 2,
  respawnTime: 30,
  value: 25,
  usedBy: ['alchemy', 'inscription'],
  specialProperties: "Potions d'esprit, Divination"
};

export const DRAGONS_BREATH: ResourceDefinition = {
  id: 'herb:dragons-breath',
  name: "Souffle du Dragon",
  category: 'herb',
  rarity: 'rare',
  description: "Fleur rouge incandescente poussant dans zones volcaniques. Composant majeur en potions de résistance au feu.",
  gatheredBy: 'herbalism',
  biomes: ['volcanic', 'desert'],
  season: 'summer',
  levelRequired: 40,
  baseYield: 1,
  respawnTime: 60,
  value: 80,
  usedBy: ['alchemy'],
  specialProperties: "Résistance feu +50%"
};

export const GHOST_MUSHROOM: ResourceDefinition = {
  id: 'herb:ghost-mushroom',
  name: "Champignon Fantôme",
  category: 'herb',
  rarity: 'rare',
  description: "Champignon bioluminescent blanc poussant dans caves profondes. Visible uniquement la nuit. Utilisé en potions d'invisibilité.",
  gatheredBy: 'herbalism',
  biomes: ['cave'],
  season: 'all',
  levelRequired: 45,
  baseYield: 1,
  respawnTime: 90,
  value: 120,
  usedBy: ['alchemy'],
  specialProperties: "Potions d'invisibilité"
};

export const MOONPETAL: ResourceDefinition = {
  id: 'herb:moonpetal',
  name: "Pétale de Lune",
  category: 'herb',
  rarity: 'epic',
  description: "Fleur argentée ne s'épanouissant que sous pleine lune. Composant légendaire en alchimie céleste.",
  gatheredBy: 'herbalism',
  biomes: ['mystic', 'forest'],
  season: 'all',
  levelRequired: 65,
  baseYield: 1,
  respawnTime: 240,
  value: 500,
  usedBy: ['alchemy', 'enchanting'],
  specialProperties: "Élixirs permanents"
};

export const SUNGRASS: ResourceDefinition = {
  id: 'herb:sungrass',
  name: "Herbe Solaire",
  category: 'herb',
  rarity: 'epic',
  description: "Herbe dorée baignée de lumière solaire pure. Ne pousse qu'aux points de convergence magique sous soleil de midi.",
  gatheredBy: 'herbalism',
  biomes: ['plains', 'mystic'],
  season: 'summer',
  levelRequired: 70,
  baseYield: 1,
  respawnTime: 300,
  value: 600,
  usedBy: ['alchemy', 'enchanting'],
  specialProperties: "Potions de lumière sacrée"
};

export const WORLDTREE_SEED: ResourceDefinition = {
  id: 'herb:worldtree-seed',
  name: "Graine d'Arbre-Monde",
  category: 'herb',
  rarity: 'legendary',
  description: "Graine lumineuse tombée de l'Arbre-Monde légendaire Yggdrasil. Contient essence primordiale de vie. Extrêmement rare.",
  gatheredBy: 'herbalism',
  biomes: ['mystic'],
  season: 'all',
  levelRequired: 95,
  baseYield: 1,
  respawnTime: 1440, // 24 heures
  value: 10000,
  usedBy: ['alchemy', 'enchanting'],
  specialProperties: "Résurrection, Immortalité temporaire"
};

// ============================================================================
// BOIS (LOGGING)
// ============================================================================

export const ROUGH_WOOD: ResourceDefinition = {
  id: 'wood:rough',
  name: "Bois Brut",
  category: 'wood',
  rarity: 'common',
  description: "Bois de pin ou sapin commun. Utilisé en construction basique et artisanat.",
  gatheredBy: 'logging',
  biomes: ['forest', 'plains'],
  season: 'all',
  levelRequired: 1,
  baseYield: 5,
  respawnTime: 10,
  value: 2,
  usedBy: ['smithing', 'cooking']
};

export const OAK_WOOD: ResourceDefinition = {
  id: 'wood:oak',
  name: "Bois de Chêne",
  category: 'wood',
  rarity: 'common',
  description: "Bois solide et durable de chêne. Excellent pour armes et armures en bois.",
  gatheredBy: 'logging',
  biomes: ['forest'],
  season: 'all',
  levelRequired: 10,
  baseYield: 3,
  respawnTime: 20,
  value: 8,
  usedBy: ['smithing', 'inscription']
};

export const MAPLE_WOOD: ResourceDefinition = {
  id: 'wood:maple',
  name: "Bois d'Érable",
  category: 'wood',
  rarity: 'uncommon',
  description: "Bois clair et flexible. Idéal pour arcs et instruments.",
  gatheredBy: 'logging',
  biomes: ['forest'],
  season: ['spring', 'autumn'],
  levelRequired: 20,
  baseYield: 2,
  respawnTime: 30,
  value: 15,
  usedBy: ['smithing']
};

export const EBONY_WOOD: ResourceDefinition = {
  id: 'wood:ebony',
  name: "Bois d'Ébène",
  category: 'wood',
  rarity: 'rare',
  description: "Bois noir dense et précieux. Très résistant, utilisé en armes et meubles de luxe.",
  gatheredBy: 'logging',
  biomes: ['forest', 'swamp'],
  season: 'all',
  levelRequired: 45,
  baseYield: 1,
  respawnTime: 90,
  value: 100,
  usedBy: ['smithing', 'inscription']
};

export const IRONWOOD: ResourceDefinition = {
  id: 'wood:ironwood',
  name: "Bois de Fer",
  category: 'wood',
  rarity: 'epic',
  description: "Bois ancien dur comme le métal. Les arbres ne poussent que dans forêts millénaires.",
  gatheredBy: 'logging',
  biomes: ['mystic', 'forest'],
  season: 'all',
  levelRequired: 70,
  baseYield: 1,
  respawnTime: 180,
  value: 400,
  usedBy: ['smithing'],
  specialProperties: "Durabilité +100%"
};

export const WORLDTREE_WOOD: ResourceDefinition = {
  id: 'wood:worldtree',
  name: "Bois d'Arbre-Monde",
  category: 'wood',
  rarity: 'legendary',
  description: "Fragment sacré de l'Arbre-Monde Yggdrasil. Brille d'une aura divine. Ne peut être coupé que par haches bénies.",
  gatheredBy: 'logging',
  biomes: ['mystic'],
  season: 'all',
  levelRequired: 90,
  baseYield: 1,
  respawnTime: 720,
  value: 5000,
  usedBy: ['smithing', 'enchanting', 'inscription'],
  specialProperties: "Bénédiction divine, Indestructible"
};

// ============================================================================
// TISSUS / ÉTOFFES (TAILORING - récoltés via agriculture/chasse)
// ============================================================================

export const TATTERED_CLOTH: ResourceDefinition = {
  id: 'cloth:tattered',
  name: "Chiffon Déchiré",
  category: 'cloth',
  rarity: 'common',
  description: "Morceaux de tissus usagés. Matériau de base pour la couture.",
  gatheredBy: 'hunting',
  biomes: ['plains', 'forest'],
  season: 'all',
  levelRequired: 1,
  baseYield: 3,
  respawnTime: 0,
  value: 1,
  usedBy: ['tailoring']
};

export const LINEN: ResourceDefinition = {
  id: 'cloth:linen',
  name: "Lin",
  category: 'cloth',
  rarity: 'common',
  description: "Tissu léger en fibres de lin. Respirant et confortable.",
  gatheredBy: 'agriculture',
  biomes: ['plains'],
  season: ['spring', 'summer'],
  levelRequired: 5,
  baseYield: 2,
  respawnTime: 15,
  value: 8,
  usedBy: ['tailoring']
};

export const WOOL: ResourceDefinition = {
  id: 'cloth:wool',
  name: "Laine",
  category: 'cloth',
  rarity: 'common',
  description: "Laine de mouton. Chaude et résistante, idéale pour les vêtements d'hiver.",
  gatheredBy: 'animal-husbandry',
  biomes: ['plains', 'mountain'],
  season: 'all',
  levelRequired: 10,
  baseYield: 2,
  respawnTime: 20,
  value: 12,
  usedBy: ['tailoring']
};

export const COTTON: ResourceDefinition = {
  id: 'cloth:cotton',
  name: "Coton",
  category: 'cloth',
  rarity: 'common',
  description: "Fibres de coton douces et absorbantes. Matériau de couture polyvalent.",
  gatheredBy: 'agriculture',
  biomes: ['plains', 'forest'],
  season: ['spring', 'summer', 'autumn'],
  levelRequired: 15,
  baseYield: 3,
  respawnTime: 25,
  value: 10,
  usedBy: ['tailoring']
};

export const SILK: ResourceDefinition = {
  id: 'cloth:silk',
  name: "Soie",
  category: 'cloth',
  rarity: 'uncommon',
  description: "Fil précieux produit par les vers à soie. Luxueux et léger.",
  gatheredBy: 'agriculture',
  biomes: ['forest'],
  season: ['spring', 'summer'],
  levelRequired: 30,
  baseYield: 1,
  respawnTime: 45,
  value: 50,
  usedBy: ['tailoring']
};

export const MAGECLOTH: ResourceDefinition = {
  id: 'cloth:magecloth',
  name: "Étoffe de Mage",
  category: 'cloth',
  rarity: 'rare',
  description: "Tissu imprégné de pouvoir magique. Conduit les sorts.",
  gatheredBy: 'hunting',
  biomes: ['mystic', 'forest'],
  season: 'all',
  levelRequired: 50,
  baseYield: 1,
  respawnTime: 0,
  value: 200,
  usedBy: ['tailoring', 'enchanting'],
  specialProperties: "Conduction magique +15%"
};

export const MOONWEAVE: ResourceDefinition = {
  id: 'cloth:moonweave',
  name: "Tisse-Lune",
  category: 'cloth',
  rarity: 'epic',
  description: "Soie tissée sous la pleine lune avec enchantements lunaires. Brille d'une lueur argentée.",
  gatheredBy: 'hunting',
  biomes: ['mystic'],
  season: 'all',
  levelRequired: 75,
  baseYield: 1,
  respawnTime: 0,
  value: 1200,
  usedBy: ['tailoring', 'enchanting'],
  specialProperties: "Régénération mana +20%, Résistance magie lune"
};

export const PHOENIX_FEATHER_CLOTH: ResourceDefinition = {
  id: 'cloth:phoenix',
  name: "Étoffe de Plumes de Phénix",
  category: 'cloth',
  rarity: 'legendary',
  description: "Tissu tissé de plumes de phénix. Incroyablement léger, résistant au feu, se régénère.",
  gatheredBy: 'hunting',
  biomes: ['volcanic', 'mystic'],
  season: 'all',
  levelRequired: 95,
  baseYield: 1,
  respawnTime: 0,
  value: 10000,
  usedBy: ['tailoring', 'enchanting'],
  specialProperties: "Immunité feu, Régénération 5 HP/tour, Indestructible"
};

// ============================================================================
// PEAUX / CUIRS (SKINNING)
// ============================================================================

export const RUINED_LEATHER: ResourceDefinition = {
  id: 'leather:ruined',
  name: "Cuir Abîmé",
  category: 'leather',
  rarity: 'common',
  description: "Peau mal récoltée ou trop endommagée. Peu de valeur mais utilisable.",
  gatheredBy: 'skinning',
  biomes: ['plains', 'forest'],
  season: 'all',
  levelRequired: 1,
  baseYield: 2,
  respawnTime: 0, // Loot direct
  value: 1,
  usedBy: ['leatherworking']
};

export const LIGHT_LEATHER: ResourceDefinition = {
  id: 'leather:light',
  name: "Cuir Léger",
  category: 'leather',
  rarity: 'common',
  description: "Cuir de lapin, renard ou cerf. Souple et léger, pour armures légères.",
  gatheredBy: 'skinning',
  biomes: ['plains', 'forest'],
  season: 'all',
  levelRequired: 1,
  baseYield: 3,
  respawnTime: 0,
  value: 5,
  usedBy: ['leatherworking']
};

export const MEDIUM_LEATHER: ResourceDefinition = {
  id: 'leather:medium',
  name: "Cuir Moyen",
  category: 'leather',
  rarity: 'common',
  description: "Cuir de loup, ours ou sanglier. Résistant, pour armures intermédiaires.",
  gatheredBy: 'skinning',
  biomes: ['forest', 'mountain'],
  season: 'all',
  levelRequired: 10,
  baseYield: 2,
  respawnTime: 0,
  value: 12,
  usedBy: ['leatherworking']
};

export const THICK_LEATHER: ResourceDefinition = {
  id: 'leather:thick',
  name: "Cuir Épais",
  category: 'leather',
  rarity: 'uncommon',
  description: "Cuir de créatures massives (ours géant, mammouth). Très protecteur.",
  gatheredBy: 'skinning',
  biomes: ['tundra', 'mountain'],
  season: 'all',
  levelRequired: 25,
  baseYield: 1,
  respawnTime: 0,
  value: 30,
  usedBy: ['leatherworking']
};

export const CHITIN: ResourceDefinition = {
  id: 'leather:chitin',
  name: "Chitine",
  category: 'leather',
  rarity: 'uncommon',
  description: "Exosquelette de créatures insectoïdes géantes. Dur comme l'os mais plus léger.",
  gatheredBy: 'skinning',
  biomes: ['cave', 'swamp'],
  season: 'all',
  levelRequired: 30,
  baseYield: 2,
  respawnTime: 0,
  value: 40,
  usedBy: ['leatherworking'],
  specialProperties: "Résistance poison +10%"
};

export const DRAKE_SCALE: ResourceDefinition = {
  id: 'leather:drake-scale',
  name: "Écaille de Drake",
  category: 'leather',
  rarity: 'rare',
  description: "Écailles de jeune dragon. Résistantes au feu et extrêmement dures.",
  gatheredBy: 'skinning',
  biomes: ['volcanic', 'mountain'],
  season: 'all',
  levelRequired: 50,
  baseYield: 1,
  respawnTime: 0,
  value: 200,
  usedBy: ['leatherworking', 'smithing'],
  specialProperties: "Résistance feu +25%"
};

export const DRAGON_SCALE: ResourceDefinition = {
  id: 'leather:dragon-scale',
  name: "Écaille de Dragon",
  category: 'leather',
  rarity: 'epic',
  description: "Écaille d'un véritable dragon adulte. Pratiquement indestructible, résiste à toute magie.",
  gatheredBy: 'skinning',
  biomes: ['volcanic', 'mountain', 'mystic'],
  season: 'all',
  levelRequired: 75,
  baseYield: 1,
  respawnTime: 0,
  value: 1500,
  usedBy: ['leatherworking', 'smithing'],
  specialProperties: "Résistance tous éléments +50%, AC +3"
};

export const ANCIENT_DRAGON_HIDE: ResourceDefinition = {
  id: 'leather:ancient-dragon',
  name: "Peau de Dragon Ancien",
  category: 'leather',
  rarity: 'legendary',
  description: "Peau d'un dragon millénaire. Imprégné de magie primordiale, pratiquement vivant.",
  gatheredBy: 'skinning',
  biomes: ['mystic'],
  season: 'all',
  levelRequired: 95,
  baseYield: 1,
  respawnTime: 0,
  value: 8000,
  usedBy: ['leatherworking', 'enchanting'],
  specialProperties: "Immunité feu/froid, Régénération +5 HP/tour"
};

// ============================================================================
// POISSONS (FISHING)
// ============================================================================

export const SMALL_FISH: ResourceDefinition = {
  id: 'fish:small',
  name: "Petit Poisson",
  category: 'fish',
  rarity: 'common',
  description: "Petite friture commune. Restaure peu mais abondant.",
  gatheredBy: 'fishing',
  biomes: ['ocean', 'forest'],
  season: 'all',
  levelRequired: 1,
  baseYield: 5,
  respawnTime: 2,
  value: 1,
  usedBy: ['cooking']
};

export const TROUT: ResourceDefinition = {
  id: 'fish:trout',
  name: "Truite",
  category: 'fish',
  rarity: 'common',
  description: "Poisson d'eau douce savoureux. Bonne source de nourriture.",
  gatheredBy: 'fishing',
  biomes: ['forest'],
  season: ['spring', 'summer', 'autumn'],
  levelRequired: 5,
  baseYield: 2,
  respawnTime: 5,
  value: 5,
  usedBy: ['cooking']
};

export const SALMON: ResourceDefinition = {
  id: 'fish:salmon',
  name: "Saumon",
  category: 'fish',
  rarity: 'common',
  description: "Poisson orange nourrissant. Chair délicate et riche.",
  gatheredBy: 'fishing',
  biomes: ['ocean', 'forest'],
  season: ['spring', 'autumn'],
  levelRequired: 10,
  baseYield: 1,
  respawnTime: 10,
  value: 12,
  usedBy: ['cooking']
};

export const LOBSTER: ResourceDefinition = {
  id: 'fish:lobster',
  name: "Homard",
  category: 'fish',
  rarity: 'uncommon',
  description: "Crustacé de luxe à chair tendre. Mets délicat recherché.",
  gatheredBy: 'fishing',
  biomes: ['ocean'],
  season: 'all',
  levelRequired: 30,
  baseYield: 1,
  respawnTime: 30,
  value: 40,
  usedBy: ['cooking'],
  specialProperties: "Buff +2 Charisme 1h"
};

export const BLACKFIN_TUNA: ResourceDefinition = {
  id: 'fish:blackfin',
  name: "Thon à Nageoires Noires",
  category: 'fish',
  rarity: 'rare',
  description: "Grand poisson océanique rapide. Chair dense et riche en protéines.",
  gatheredBy: 'fishing',
  biomes: ['ocean'],
  season: 'summer',
  levelRequired: 45,
  baseYield: 1,
  respawnTime: 60,
  value: 100,
  usedBy: ['cooking'],
  specialProperties: "Buff +3 Force 2h"
};

export const MOONSCALE_KOI: ResourceDefinition = {
  id: 'fish:moonscale',
  name: "Carpe Écaille-de-Lune",
  category: 'fish',
  rarity: 'epic',
  description: "Poisson magique aux écailles argentées brillant sous la lune. Propriétés régénératrices.",
  gatheredBy: 'fishing',
  biomes: ['mystic'],
  season: ['spring', 'autumn'],
  levelRequired: 65,
  baseYield: 1,
  respawnTime: 120,
  value: 500,
  usedBy: ['cooking', 'alchemy'],
  specialProperties: "Régénération +10 HP/min 1h"
};

export const LEVIATHAN_EEL: ResourceDefinition = {
  id: 'fish:leviathan',
  name: "Anguille Léviathan",
  category: 'fish',
  rarity: 'legendary',
  description: "Serpent marin gigantesque des abysses. Chair imprégnée d'énergie primordiale. Extrêmement dangereux à pêcher.",
  gatheredBy: 'fishing',
  biomes: ['ocean'],
  season: 'all',
  levelRequired: 90,
  baseYield: 1,
  respawnTime: 480,
  value: 3000,
  usedBy: ['cooking', 'alchemy'],
  specialProperties: "Buff +5 toutes stats 4h, Respiration aquatique"
};

// ============================================================================
// RÉACTIFS MAGIQUES (HERBALISM / SKINNING)
// ============================================================================

export const ESSENCE_OF_FIRE: ResourceDefinition = {
  id: 'reagent:fire',
  name: "Essence de Feu",
  category: 'reagent',
  rarity: 'rare',
  description: "Cristal rouge pulsant. Extrait de créatures de feu (élémentaires, salamandres).",
  gatheredBy: 'skinning',
  biomes: ['volcanic'],
  season: 'all',
  levelRequired: 40,
  baseYield: 1,
  respawnTime: 0,
  value: 150,
  usedBy: ['alchemy', 'enchanting'],
  specialProperties: "Dégâts de feu +10"
};

export const ESSENCE_OF_WATER: ResourceDefinition = {
  id: 'reagent:water',
  name: "Essence d'Eau",
  category: 'reagent',
  rarity: 'rare',
  description: "Fiole d'eau cristalline magique. Extraite de créatures aquatiques élémentaires.",
  gatheredBy: 'skinning',
  biomes: ['ocean'],
  season: 'all',
  levelRequired: 40,
  baseYield: 1,
  respawnTime: 0,
  value: 150,
  usedBy: ['alchemy', 'enchanting'],
  specialProperties: "Guérison +50%"
};

export const VOID_CRYSTAL: ResourceDefinition = {
  id: 'reagent:void',
  name: "Cristal du Vide",
  category: 'reagent',
  rarity: 'epic',
  description: "Fragment de néant solidifié. Absorbe la lumière. Dangereux à manipuler.",
  gatheredBy: 'mining',
  biomes: ['cave', 'mystic'],
  season: 'all',
  levelRequired: 80,
  baseYield: 1,
  respawnTime: 180,
  value: 1000,
  usedBy: ['enchanting', 'alchemy'],
  specialProperties: "Magie d'ombre +30%, Corruption"
};

export const PHILOSOPHERS_STONE_FRAGMENT: ResourceDefinition = {
  id: 'reagent:philosophers-fragment',
  name: "Fragment de Pierre Philosophale",
  category: 'reagent',
  rarity: 'legendary',
  description: "Éclat d'une Pierre Philosophale détruite. Contient pouvoir de transmutation.",
  gatheredBy: 'mining',
  biomes: ['mystic'],
  season: 'all',
  levelRequired: 100,
  baseYield: 1,
  respawnTime: 1440,
  value: 20000,
  usedBy: ['alchemy'],
  specialProperties: "Transmutation métaux, Immortalité temporaire"
};

// ============================================================================
// EXPORTS & UTILITIES
// ============================================================================

export const ALL_RESOURCES: ResourceDefinition[] = [
  // Ores
  COPPER_ORE, TIN_ORE, IRON_ORE, SILVER_ORE, GOLD_ORE, MITHRIL_ORE, ADAMANTINE_ORE, CELESTIAL_IRON,
  // Gems
  QUARTZ, RUBY, SAPPHIRE, EMERALD, DIAMOND, MOONSTONE,
  // Herbs
  SILVERLEAF, PEACEBLOOM, BLOODTHISTLE, DREAMFOIL, DRAGONS_BREATH, GHOST_MUSHROOM, MOONPETAL, SUNGRASS, WORLDTREE_SEED,
  // Wood
  ROUGH_WOOD, OAK_WOOD, MAPLE_WOOD, EBONY_WOOD, IRONWOOD, WORLDTREE_WOOD,
  // Cloth
  TATTERED_CLOTH, LINEN, WOOL, COTTON, SILK, MAGECLOTH, MOONWEAVE, PHOENIX_FEATHER_CLOTH,
  // Leather
  RUINED_LEATHER, LIGHT_LEATHER, MEDIUM_LEATHER, THICK_LEATHER, CHITIN, DRAKE_SCALE, DRAGON_SCALE, ANCIENT_DRAGON_HIDE,
  // Fish
  SMALL_FISH, TROUT, SALMON, LOBSTER, BLACKFIN_TUNA, MOONSCALE_KOI, LEVIATHAN_EEL,
  // Reagents
  ESSENCE_OF_FIRE, ESSENCE_OF_WATER, VOID_CRYSTAL, PHILOSOPHERS_STONE_FRAGMENT
];

export const RESOURCES_BY_ID: Record<string, ResourceDefinition> = ALL_RESOURCES.reduce((acc, res) => {
  acc[res.id] = res;
  return acc;
}, {} as Record<string, ResourceDefinition>);

export const RESOURCES_BY_PROFESSION: Record<ProfessionType, ResourceDefinition[]> = {
  mining: ALL_RESOURCES.filter(r => r.gatheredBy === 'mining'),
  herbalism: ALL_RESOURCES.filter(r => r.gatheredBy === 'herbalism'),
  fishing: ALL_RESOURCES.filter(r => r.gatheredBy === 'fishing'),
  hunting: ALL_RESOURCES.filter(r => r.gatheredBy === 'hunting'),
  skinning: ALL_RESOURCES.filter(r => r.gatheredBy === 'skinning'),
  logging: ALL_RESOURCES.filter(r => r.gatheredBy === 'logging'),
  agriculture: ALL_RESOURCES.filter(r => r.gatheredBy === 'agriculture'),
  'animal-husbandry': ALL_RESOURCES.filter(r => r.gatheredBy === 'animal-husbandry'),
  // Crafting professions
  smithing: [],
  alchemy: [],
  enchanting: [],
  cooking: [],
  tailoring: [],
  leatherworking: [],
  jewelcrafting: [],
  inscription: [],
  architecture: [],
  engineering: [],
  cartography: [],
  music: [],
  medicine: [],
  commerce: []
};

export const RESOURCES_BY_BIOME: Record<BiomeType, ResourceDefinition[]> = ALL_RESOURCES.reduce((acc, res) => {
  res.biomes.forEach(biome => {
    if (!acc[biome]) acc[biome] = [];
    acc[biome].push(res);
  });
  return acc;
}, {} as Record<BiomeType, ResourceDefinition[]>);

export const RESOURCES_BY_RARITY: Record<ResourceRarity, ResourceDefinition[]> = {
  common: ALL_RESOURCES.filter(r => r.rarity === 'common'),
  uncommon: ALL_RESOURCES.filter(r => r.rarity === 'uncommon'),
  rare: ALL_RESOURCES.filter(r => r.rarity === 'rare'),
  epic: ALL_RESOURCES.filter(r => r.rarity === 'epic'),
  legendary: ALL_RESOURCES.filter(r => r.rarity === 'legendary')
};

/**
 * Trouve ressources disponibles dans un biome donné
 */
export function getResourcesForBiome(biome: BiomeType, minLevel: number = 1): ResourceDefinition[] {
  return (RESOURCES_BY_BIOME[biome] || []).filter(r => r.levelRequired <= minLevel);
}

/**
 * Trouve ressources pour un métier de récolte
 */
export function getResourcesForProfession(profession: ProfessionType): ResourceDefinition[] {
  return RESOURCES_BY_PROFESSION[profession] || [];
}

/**
 * Calcule le rendement d'une récolte avec bonus de niveau
 */
export function calculateYield(resource: ResourceDefinition, professionLevel: number): number {
  const baseYield = resource.baseYield;
  const levelBonus = Math.floor(professionLevel / 25); // +1 par 25 niveaux
  return baseYield + levelBonus;
}

/**
 * Vérifie si une ressource est disponible dans une saison donnée
 */
export function isAvailableInSeason(resource: ResourceDefinition, currentSeason: SeasonType): boolean {
  if (resource.season === 'all') return true;
  if (Array.isArray(resource.season)) {
    return resource.season.includes(currentSeason);
  }
  return resource.season === currentSeason;
}

/**
 * Obtient les ressources rares/légendaires pour événements spéciaux
 */
export function getLegendaryResources(): ResourceDefinition[] {
  return ALL_RESOURCES.filter(r => r.rarity === 'legendary' || r.rarity === 'epic');
}
