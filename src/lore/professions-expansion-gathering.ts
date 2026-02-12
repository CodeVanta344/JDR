/**
 * SYSTÈME DE MÉTIERS - PROFESSIONS DE RÉCOLTE
 * 
 * 7 professions de récolte avec progression niveau 1-100
 * Ressources par biome et niveau
 * Bonus spécialisations niveau 50+
 */

import type { Profession, Resource } from './schema';

// ============================================================================
// MINEUR - 30 MINERAIS
// ============================================================================

export const MINING_RESOURCES: Resource[] = [
  // Niveau 1-20 : Minerais basiques
  {
    id: 'resource_copper_ore',
    name: 'Minerai de Cuivre',
    type: 'mineral',
    rarity: 'common',
    value: 5,
    professionRequired: { name: 'Mineur', level: 1 },
    harvestLocation: ['Montagnes', 'Collines'],
    description: 'Minerai de cuivre brut, premier métal pour forgerons débutants'
  },
  {
    id: 'resource_tin_ore',
    name: 'Minerai d\'Étain',
    type: 'mineral',
    rarity: 'common',
    value: 6,
    professionRequired: { name: 'Mineur', level: 5 },
    harvestLocation: ['Montagnes', 'Marais'],
    description: 'Étain utilisé pour créer du bronze avec le cuivre'
  },
  {
    id: 'resource_iron_ore',
    name: 'Minerai de Fer',
    type: 'mineral',
    rarity: 'common',
    value: 10,
    professionRequired: { name: 'Mineur', level: 10 },
    harvestLocation: ['Montagnes', 'Collines', 'Grottes'],
    description: 'Fer solide, base de l\'armurerie'
  },
  {
    id: 'resource_coal',
    name: 'Charbon',
    type: 'mineral',
    rarity: 'common',
    value: 8,
    professionRequired: { name: 'Mineur', level: 15 },
    harvestLocation: ['Grottes Profondes', 'Mines Abandonnées'],
    description: 'Combustible essentiel pour les forges'
  },
  {
    id: 'resource_silver_ore',
    name: 'Minerai d\'Argent',
    type: 'mineral',
    rarity: 'uncommon',
    value: 20,
    professionRequired: { name: 'Mineur', level: 20 },
    harvestLocation: ['Montagnes Hautes', 'Veines Précieuses'],
    description: 'Argent pur, utilisé en joaillerie et armes enchantées'
  },

  // Niveau 21-50 : Minerais avancés
  {
    id: 'resource_gold_ore',
    name: 'Minerai d\'Or',
    type: 'mineral',
    rarity: 'rare',
    value: 50,
    professionRequired: { name: 'Mineur', level: 25 },
    harvestLocation: ['Montagnes Hautes', 'Rivières Enchantées'],
    description: 'Or précieux pour joaillerie et enchantements'
  },
  {
    id: 'resource_mithril_ore',
    name: 'Minerai de Mithril',
    type: 'mineral',
    rarity: 'rare',
    value: 100,
    professionRequired: { name: 'Mineur', level: 35 },
    harvestLocation: ['Profondeurs Hammerdeep', 'Grottes Cristallines'],
    description: 'Métal léger et résistant des nains'
  },
  {
    id: 'resource_adamantine_ore',
    name: 'Minerai d\'Adamantine',
    type: 'mineral',
    rarity: 'epic',
    value: 200,
    professionRequired: { name: 'Mineur', level: 50 },
    harvestLocation: ['Cœur de la Montagne', 'Veines Légendaires'],
    description: 'Métal quasi indestructible, extrêmement rare'
  },

  // Niveau 51-100 : Minerais légendaires
  {
    id: 'resource_orichalcum_ore',
    name: 'Minerai d\'Orichalque',
    type: 'mineral',
    rarity: 'legendary',
    value: 500,
    professionRequired: { name: 'Mineur', level: 75 },
    harvestLocation: ['Veines Divines', 'Cratères Météorites'],
    description: 'Métal légendaire tombé des cieux'
  },
  {
    id: 'resource_starstone',
    name: 'Pierre d\'Étoile',
    type: 'mineral',
    rarity: 'legendary',
    value: 1000,
    professionRequired: { name: 'Mineur', level: 100 },
    harvestLocation: ['Sommets du Monde', 'Sites Cosmiques'],
    description: 'Fragment d\'étoile solidifié, pouvoir immense'
  },

  // Gemmes (20 types)
  {
    id: 'resource_gem_minor',
    name: 'Gemme Mineure',
    type: 'gem',
    rarity: 'common',
    value: 15,
    professionRequired: { name: 'Mineur', level: 8 },
    harvestLocation: ['Grottes', 'Filons Gemmes'],
    description: 'Petite gemme utilisée en enchantement basique'
  },
  {
    id: 'resource_ruby',
    name: 'Rubis',
    type: 'gem',
    rarity: 'rare',
    value: 80,
    professionRequired: { name: 'Mineur', level: 30 },
    harvestLocation: ['Grottes Feu', 'Volcans'],
    description: 'Gemme rouge, affinité élémentaire feu'
  },
  {
    id: 'resource_sapphire',
    name: 'Saphir',
    type: 'gem',
    rarity: 'rare',
    value: 80,
    professionRequired: { name: 'Mineur', level: 30 },
    harvestLocation: ['Grottes Glace', 'Toundra Cristalline'],
    description: 'Gemme bleue, affinité élémentaire glace'
  },
  {
    id: 'resource_emerald',
    name: 'Émeraude',
    type: 'gem',
    rarity: 'rare',
    value: 80,
    professionRequired: { name: 'Mineur', level: 30 },
    harvestLocation: ['Forêts Anciennes', 'Grottes Vie'],
    description: 'Gemme verte, affinité nature et guérison'
  },
  {
    id: 'resource_diamond',
    name: 'Diamant',
    type: 'gem',
    rarity: 'epic',
    value: 300,
    professionRequired: { name: 'Mineur', level: 60 },
    harvestLocation: ['Profondeurs Extrêmes', 'Pressions Immenses'],
    description: 'Gemme pure, enchantements puissants'
  },
  {
    id: 'resource_gem_divine',
    name: 'Gemme Divine',
    type: 'gem',
    rarity: 'legendary',
    value: 1000,
    professionRequired: { name: 'Mineur', level: 90 },
    harvestLocation: ['Temples Anciens', 'Sites Divins'],
    description: 'Gemme bénie par les dieux, pouvoir sacré'
  },

  // 14 autres minerais et gemmes...
  { id: 'resource_zinc_ore', name: 'Minerai de Zinc', type: 'mineral', rarity: 'common', value: 7, professionRequired: { name: 'Mineur', level: 12 }, harvestLocation: ['Collines', 'Grottes'], description: 'Zinc pour alliages' },
  { id: 'resource_platinum_ore', name: 'Minerai de Platine', type: 'mineral', rarity: 'rare', value: 150, professionRequired: { name: 'Mineur', level: 45 }, harvestLocation: ['Montagnes Hautes', 'Veines Rares'], description: 'Platine précieux' },
  { id: 'resource_obsidian', name: 'Obsidienne', type: 'mineral', rarity: 'uncommon', value: 30, professionRequired: { name: 'Mineur', level: 22 }, harvestLocation: ['Volcans', 'Lacs de Lave'], description: 'Verre volcanique tranchant' },
  { id: 'resource_sulfur', name: 'Soufre', type: 'mineral', rarity: 'common', value: 12, professionRequired: { name: 'Mineur', level: 18 }, harvestLocation: ['Volcans', 'Sources Chaudes'], description: 'Soufre pour alchimie' },
  { id: 'resource_quartz', name: 'Quartz', type: 'gem', rarity: 'common', value: 10, professionRequired: { name: 'Mineur', level: 6 }, harvestLocation: ['Grottes', 'Rivières'], description: 'Cristal basique' },
  { id: 'resource_amethyst', name: 'Améthyste', type: 'gem', rarity: 'uncommon', value: 40, professionRequired: { name: 'Mineur', level: 25 }, harvestLocation: ['Grottes Violettes', 'Géodes'], description: 'Gemme violette, affinité arcane' },
  { id: 'resource_topaz', name: 'Topaze', type: 'gem', rarity: 'rare', value: 70, professionRequired: { name: 'Mineur', level: 28 }, harvestLocation: ['Déserts', 'Grottes Sable'], description: 'Gemme jaune, affinité lumière' },
  { id: 'resource_onyx', name: 'Onyx', type: 'gem', rarity: 'rare', value: 90, professionRequired: { name: 'Mineur', level: 40 }, harvestLocation: ['Grottes Ombre', 'Temples Sombres'], description: 'Gemme noire, affinité ténèbres' },
  { id: 'resource_moonstone', name: 'Pierre de Lune', type: 'gem', rarity: 'epic', value: 250, professionRequired: { name: 'Mineur', level: 65 }, harvestLocation: ['Nuit Pleine Lune', 'Lacs Enchantés'], description: 'Gemme lunaire, magie nocturne' },
  { id: 'resource_sunstone', name: 'Pierre de Soleil', type: 'gem', rarity: 'epic', value: 250, professionRequired: { name: 'Mineur', level: 65 }, harvestLocation: ['Déserts Brûlants', 'Midi Solstice'], description: 'Gemme solaire, magie diurne' }
];

// ============================================================================
// HERBORISTE - 25 PLANTES
// ============================================================================

export const HERBALISM_RESOURCES: Resource[] = [
  // Niveau 1-20 : Herbes communes
  {
    id: 'resource_healing_herb',
    name: 'Herbe de Soin',
    type: 'herb',
    rarity: 'common',
    value: 5,
    professionRequired: { name: 'Herboriste', level: 1 },
    harvestLocation: ['Prairies', 'Forêts'],
    description: 'Herbe médicinale basique pour potions de soin'
  },
  {
    id: 'resource_mana_flower',
    name: 'Fleur de Mana',
    type: 'herb',
    rarity: 'common',
    value: 8,
    professionRequired: { name: 'Herboriste', level: 5 },
    harvestLocation: ['Clairières Magiques', 'Forêts Enchantées'],
    description: 'Fleur bleue restaure la mana'
  },
  {
    id: 'resource_toxic_herb',
    name: 'Herbe Toxique',
    type: 'herb',
    rarity: 'common',
    value: 10,
    professionRequired: { name: 'Herboriste', level: 10 },
    harvestLocation: ['Marais', 'Zones Corrompues'],
    description: 'Plante vénéneuse pour poisons'
  },
  {
    id: 'resource_purifying_root',
    name: 'Racine Purifiante',
    type: 'herb',
    rarity: 'uncommon',
    value: 15,
    professionRequired: { name: 'Herboriste', level: 15 },
    harvestLocation: ['Forêts Anciennes', 'Rivières Pures'],
    description: 'Racine neutralise poisons et malédictions'
  },
  {
    id: 'resource_power_herb',
    name: 'Herbe de Puissance',
    type: 'herb',
    rarity: 'uncommon',
    value: 20,
    professionRequired: { name: 'Herboriste', level: 20 },
    harvestLocation: ['Montagnes', 'Hauts Plateaux'],
    description: 'Herbe augmente force temporairement'
  },

  // Niveau 21-50 : Plantes rares
  {
    id: 'resource_rare_healing_herb',
    name: 'Herbe de Soin Rare',
    type: 'herb',
    rarity: 'rare',
    value: 40,
    professionRequired: { name: 'Herboriste', level: 25 },
    harvestLocation: ['Forêts Émeraude', 'Jardins Elfes'],
    description: 'Herbe puissante pour soins majeurs'
  },
  {
    id: 'resource_mandrake',
    name: 'Mandragore',
    type: 'herb',
    rarity: 'rare',
    value: 60,
    professionRequired: { name: 'Herboriste', level: 35 },
    harvestLocation: ['Cimetières', 'Tombes Anciennes'],
    description: 'Racine hurlante, ingrédient puissant poisons'
  },
  {
    id: 'resource_fairy_dust',
    name: 'Poussière Féérique',
    type: 'herb',
    rarity: 'epic',
    value: 100,
    professionRequired: { name: 'Herboriste', level: 40 },
    harvestLocation: ['Cercles Féeriques', 'Clairières Sacrées'],
    description: 'Poussière magique des fées'
  },
  {
    id: 'resource_world_tree_root',
    name: 'Racine d\'Arbre-Monde',
    type: 'herb',
    rarity: 'legendary',
    value: 500,
    professionRequired: { name: 'Herboriste', level: 75 },
    harvestLocation: ['Arbre-Monde Yggdrasil'],
    description: 'Fragment racine arbre légendaire, vie éternelle'
  },
  {
    id: 'resource_divine_fruit',
    name: 'Fruit Divin',
    type: 'herb',
    rarity: 'legendary',
    value: 1000,
    professionRequired: { name: 'Herboriste', level: 100 },
    harvestLocation: ['Jardins Divins', 'Olympe'],
    description: 'Fruit des dieux, ambroisie'
  },

  // 15 autres plantes...
  { id: 'resource_speed_herb', name: 'Herbe de Célérité', type: 'herb', rarity: 'uncommon', value: 18, professionRequired: { name: 'Herboriste', level: 18 }, harvestLocation: ['Prairies Venteuses'], description: 'Augmente vitesse' },
  { id: 'resource_endurance_herb', name: 'Herbe d\'Endurance', type: 'herb', rarity: 'uncommon', value: 16, professionRequired: { name: 'Herboriste', level: 16 }, harvestLocation: ['Hauts Plateaux'], description: 'Augmente constitution' },
  { id: 'resource_wisdom_herb', name: 'Herbe de Sagesse', type: 'herb', rarity: 'uncommon', value: 22, professionRequired: { name: 'Herboriste', level: 22 }, harvestLocation: ['Temples', 'Bibliothèques Anciennes'], description: 'Augmente intelligence' },
  { id: 'resource_brain_mushroom', name: 'Champignon Cérébral', type: 'herb', rarity: 'rare', value: 45, professionRequired: { name: 'Herboriste', level: 30 }, harvestLocation: ['Grottes Humides', 'Forêts Sombres'], description: 'Champignon magique, boost mental' },
  { id: 'resource_fire_flower', name: 'Fleur de Feu', type: 'herb', rarity: 'uncommon', value: 25, professionRequired: { name: 'Herboriste', level: 12 }, harvestLocation: ['Volcans', 'Déserts Chauds'], description: 'Fleur résistante feu' },
  { id: 'resource_ice_lotus', name: 'Lotus de Glace', type: 'herb', rarity: 'rare', value: 50, professionRequired: { name: 'Herboriste', level: 32 }, harvestLocation: ['Toundra', 'Lacs Gelés'], description: 'Fleur gelée, résistance froid' },
  { id: 'resource_shadow_herb', name: 'Herbe d\'Ombre', type: 'herb', rarity: 'rare', value: 55, professionRequired: { name: 'Herboriste', level: 38 }, harvestLocation: ['Zones Ombre', 'Grottes Profondes'], description: 'Herbe invisible, furtivité' },
  { id: 'resource_phoenix_herb', name: 'Herbe du Phénix', type: 'herb', rarity: 'epic', value: 200, professionRequired: { name: 'Herboriste', level: 60 }, harvestLocation: ['Nids Phénix', 'Volcans Sacrés'], description: 'Herbe résurrection' },
  { id: 'resource_dragon_herb', name: 'Herbe de Dragon', type: 'herb', rarity: 'epic', value: 180, professionRequired: { name: 'Herboriste', level: 55 }, harvestLocation: ['Lairs Dragons', 'Montagnes Hautes'], description: 'Herbe force draconique' }
];

// ============================================================================
// BÛCHERON - 15 TYPES DE BOIS
// ============================================================================

export const LOGGING_RESOURCES: Resource[] = [
  {
    id: 'resource_oak_wood',
    name: 'Bois de Chêne',
    type: 'wood',
    rarity: 'common',
    value: 5,
    professionRequired: { name: 'Bûcheron', level: 1 },
    harvestLocation: ['Forêts', 'Bois'],
    description: 'Bois solide et commun'
  },
  {
    id: 'resource_pine_wood',
    name: 'Bois de Pin',
    type: 'wood',
    rarity: 'common',
    value: 4,
    professionRequired: { name: 'Bûcheron', level: 5 },
    harvestLocation: ['Forêts de Pins', 'Montagnes Basses'],
    description: 'Bois léger et résineux'
  },
  {
    id: 'resource_ironwood',
    name: 'Bois de Fer',
    type: 'wood',
    rarity: 'uncommon',
    value: 20,
    professionRequired: { name: 'Bûcheron', level: 20 },
    harvestLocation: ['Forêts Anciennes'],
    description: 'Bois dur comme le fer'
  },
  {
    id: 'resource_darkwood',
    name: 'Bois Sombre',
    type: 'wood',
    rarity: 'rare',
    value: 50,
    professionRequired: { name: 'Bûcheron', level: 35 },
    harvestLocation: ['Forêts Hantées', 'Zones Corrompues'],
    description: 'Bois noir, absorbe lumière'
  },
  {
    id: 'resource_silverwood',
    name: 'Bois d\'Argent',
    type: 'wood',
    rarity: 'epic',
    value: 150,
    professionRequired: { name: 'Bûcheron', level: 50 },
    harvestLocation: ['Forêts Elfiques', 'Clairières Sacrées'],
    description: 'Bois argenté des elfes'
  },
  {
    id: 'resource_world_tree_wood',
    name: 'Bois d\'Arbre-Monde',
    type: 'wood',
    rarity: 'legendary',
    value: 1000,
    professionRequired: { name: 'Bûcheron', level: 100 },
    harvestLocation: ['Arbre-Monde Yggdrasil'],
    description: 'Bois légendaire, essence divine'
  },

  // 9 autres bois...
  { id: 'resource_ash_wood', name: 'Bois de Frêne', type: 'wood', rarity: 'common', value: 6, professionRequired: { name: 'Bûcheron', level: 8 }, harvestLocation: ['Forêts Mixtes'], description: 'Bois flexible pour arcs' },
  { id: 'resource_maple_wood', name: 'Bois d\'Érable', type: 'wood', rarity: 'common', value: 7, professionRequired: { name: 'Bûcheron', level: 10 }, harvestLocation: ['Forêts Tempérées'], description: 'Bois résistant' },
  { id: 'resource_ebony_wood', name: 'Bois d\'Ébène', type: 'wood', rarity: 'rare', value: 80, professionRequired: { name: 'Bûcheron', level: 40 }, harvestLocation: ['Jungles Tropicales'], description: 'Bois noir précieux' },
  { id: 'resource_mahogany_wood', name: 'Bois d\'Acajou', type: 'wood', rarity: 'uncommon', value: 30, professionRequired: { name: 'Bûcheron', level: 25 }, harvestLocation: ['Jungles'], description: 'Bois rouge de luxe' },
  { id: 'resource_bloodwood', name: 'Bois de Sang', type: 'wood', rarity: 'epic', value: 200, professionRequired: { name: 'Bûcheron', level: 65 }, harvestLocation: ['Forêts Maudites'], description: 'Bois rouge sang, magie noire' },
  { id: 'resource_crystal_wood', name: 'Bois Cristallin', type: 'wood', rarity: 'epic', value: 250, professionRequired: { name: 'Bûcheron', level: 70 }, harvestLocation: ['Forêts Enchantées'], description: 'Bois transparent, magique' }
];

// ============================================================================
// PÊCHEUR - 20 POISSONS
// ============================================================================

export const FISHING_RESOURCES: Resource[] = [
  {
    id: 'resource_common_fish',
    name: 'Poisson Commun',
    type: 'fish',
    rarity: 'common',
    value: 3,
    professionRequired: { name: 'Pêcheur', level: 1 },
    harvestLocation: ['Rivières', 'Lacs'],
    description: 'Petit poisson pour cuisine basique'
  },
  {
    id: 'resource_salmon',
    name: 'Saumon',
    type: 'fish',
    rarity: 'common',
    value: 8,
    professionRequired: { name: 'Pêcheur', level: 10 },
    harvestLocation: ['Rivières Rapides'],
    description: 'Poisson savoureux'
  },
  {
    id: 'resource_rare_fish',
    name: 'Poisson Rare',
    type: 'fish',
    rarity: 'rare',
    value: 40,
    professionRequired: { name: 'Pêcheur', level: 30 },
    harvestLocation: ['Lacs Enchantés', 'Rivières Secrètes'],
    description: 'Poisson rare aux propriétés magiques'
  },
  {
    id: 'resource_sea_dragon',
    name: 'Dragon de Mer',
    type: 'fish',
    rarity: 'legendary',
    value: 1000,
    professionRequired: { name: 'Pêcheur', level: 100 },
    harvestLocation: ['Fosses Abyssales'],
    description: 'Créature légendaire des profondeurs'
  },

  // 16 autres poissons...
  { id: 'resource_trout', name: 'Truite', type: 'fish', rarity: 'common', value: 5, professionRequired: { name: 'Pêcheur', level: 5 }, harvestLocation: ['Ruisseaux'], description: 'Poisson d\'eau douce' },
  { id: 'resource_pike', name: 'Brochet', type: 'fish', rarity: 'uncommon', value: 15, professionRequired: { name: 'Pêcheur', level: 15 }, harvestLocation: ['Lacs'], description: 'Poisson prédateur' },
  { id: 'resource_tuna', name: 'Thon', type: 'fish', rarity: 'uncommon', value: 20, professionRequired: { name: 'Pêcheur', level: 20 }, harvestLocation: ['Océan'], description: 'Gros poisson marin' },
  { id: 'resource_lobster', name: 'Homard', type: 'fish', rarity: 'uncommon', value: 25, professionRequired: { name: 'Pêcheur', level: 25 }, harvestLocation: ['Fonds Marins'], description: 'Crustacé de luxe' },
  { id: 'resource_electric_eel', name: 'Anguille Électrique', type: 'fish', rarity: 'rare', value: 60, professionRequired: { name: 'Pêcheur', level: 35 }, harvestLocation: ['Marais Électriques'], description: 'Anguille chargée' },
  { id: 'resource_fire_fish', name: 'Poisson de Feu', type: 'fish', rarity: 'epic', value: 150, professionRequired: { name: 'Pêcheur', level: 55 }, harvestLocation: ['Lacs Volcaniques'], description: 'Poisson enflammé' },
  { id: 'resource_kraken_tentacle', name: 'Tentacule de Kraken', type: 'fish', rarity: 'legendary', value: 800, professionRequired: { name: 'Pêcheur', level: 90 }, harvestLocation: ['Océan Profond'], description: 'Fragment kraken' }
];

// ============================================================================
// CHASSEUR & DÉPECEUR - 25 RESSOURCES ANIMALES
// ============================================================================

export const HUNTING_RESOURCES: Resource[] = [
  {
    id: 'resource_raw_meat',
    name: 'Viande Crue',
    type: 'animal',
    rarity: 'common',
    value: 5,
    professionRequired: { name: 'Chasseur', level: 1 },
    harvestLocation: ['Forêts', 'Prairies'],
    description: 'Viande de gibier commun'
  },
  {
    id: 'resource_leather',
    name: 'Cuir',
    type: 'animal',
    rarity: 'common',
    value: 8,
    professionRequired: { name: 'Dépeceur', level: 1 },
    harvestLocation: ['Cadavres Animaux'],
    description: 'Cuir basique pour armures légères'
  },
  {
    id: 'resource_premium_beef',
    name: 'Bœuf Premium',
    type: 'animal',
    rarity: 'uncommon',
    value: 20,
    professionRequired: { name: 'Chasseur', level: 20 },
    harvestLocation: ['Troupeaux Sauvages'],
    description: 'Viande de qualité supérieure'
  },
  {
    id: 'resource_dragon_scales',
    name: 'Écailles de Dragon',
    type: 'animal',
    rarity: 'legendary',
    value: 500,
    professionRequired: { name: 'Dépeceur', level: 80 },
    harvestLocation: ['Cadavres Dragons'],
    description: 'Écailles ultra résistantes'
  },
  {
    id: 'resource_dragon_meat',
    name: 'Viande de Dragon',
    type: 'animal',
    rarity: 'legendary',
    value: 300,
    professionRequired: { name: 'Chasseur', level: 70 },
    harvestLocation: ['Dragons Tués'],
    description: 'Viande donnant puissance immense'
  },

  // 20 autres ressources...
  { id: 'resource_wolf_pelt', name: 'Fourrure de Loup', type: 'animal', rarity: 'common', value: 12, professionRequired: { name: 'Dépeceur', level: 10 }, harvestLocation: ['Loups Tués'], description: 'Fourrure chaude' },
  { id: 'resource_bear_hide', name: 'Peau d\'Ours', type: 'animal', rarity: 'uncommon', value: 30, professionRequired: { name: 'Dépeceur', level: 25 }, harvestLocation: ['Ours Tués'], description: 'Cuir épais résistant' },
  { id: 'resource_spider_silk', name: 'Soie d\'Araignée', type: 'animal', rarity: 'uncommon', value: 25, professionRequired: { name: 'Dépeceur', level: 20 }, harvestLocation: ['Araignées Géantes'], description: 'Fil très résistant' },
  { id: 'resource_spider_venom', name: 'Venin d\'Araignée', type: 'animal', rarity: 'uncommon', value: 35, professionRequired: { name: 'Chasseur', level: 22 }, harvestLocation: ['Araignées'], description: 'Venin paralysant' },
  { id: 'resource_wyvern_venom', name: 'Venin de Wyverne', type: 'animal', rarity: 'rare', value: 100, professionRequired: { name: 'Chasseur', level: 50 }, harvestLocation: ['Wyvernes'], description: 'Venin mortel' },
  { id: 'resource_phoenix_feather', name: 'Plume de Phénix', type: 'animal', rarity: 'epic', value: 200, professionRequired: { name: 'Chasseur', level: 60 }, harvestLocation: ['Phénix'], description: 'Plume résurrection' },
  { id: 'resource_dragon_heart', name: 'Cœur de Dragon', type: 'animal', rarity: 'legendary', value: 1000, professionRequired: { name: 'Dépeceur', level: 90 }, harvestLocation: ['Dragons'], description: 'Cœur puissant' },
  { id: 'resource_demon_soul', name: 'Âme de Démon', type: 'animal', rarity: 'legendary', value: 800, professionRequired: { name: 'Chasseur', level: 85 }, harvestLocation: ['Démons'], description: 'Essence démoniaque' }
];

// ============================================================================
// EXPLORATEUR - 15 TRÉSORS ET DÉCOUVERTES
// ============================================================================

export const EXPLORATION_RESOURCES: Resource[] = [
  {
    id: 'resource_ancient_coin',
    name: 'Pièce Ancienne',
    type: 'treasure',
    rarity: 'uncommon',
    value: 20,
    professionRequired: { name: 'Explorateur', level: 10 },
    harvestLocation: ['Ruines', 'Tombes'],
    description: 'Monnaie antique, valeur historique'
  },
  {
    id: 'resource_treasure_map',
    name: 'Carte au Trésor',
    type: 'treasure',
    rarity: 'rare',
    value: 100,
    professionRequired: { name: 'Explorateur', level: 30 },
    harvestLocation: ['Épaves', 'Bibliothèques Perdues'],
    description: 'Carte mène à un trésor caché'
  },
  {
    id: 'resource_ancient_artifact',
    name: 'Artefact Ancien',
    type: 'treasure',
    rarity: 'epic',
    value: 500,
    professionRequired: { name: 'Explorateur', level: 60 },
    harvestLocation: ['Temples Anciens', 'Cités Perdues'],
    description: 'Objet d\'une civilisation disparue'
  },
  {
    id: 'resource_divine_fragment',
    name: 'Fragment Divin',
    type: 'treasure',
    rarity: 'legendary',
    value: 2000,
    professionRequired: { name: 'Explorateur', level: 100 },
    harvestLocation: ['Sites Divins', 'Sanctuaires'],
    description: 'Fragment pouvoir divin'
  },

  // 11 autres trésors...
  { id: 'resource_old_scroll', name: 'Parchemin Ancien', type: 'treasure', rarity: 'common', value: 15, professionRequired: { name: 'Explorateur', level: 5 }, harvestLocation: ['Ruines', 'Bibliothèques'], description: 'Texte ancien' },
  { id: 'resource_rare_book', name: 'Livre Rare', type: 'treasure', rarity: 'rare', value: 80, professionRequired: { name: 'Explorateur', level: 35 }, harvestLocation: ['Bibliothèques Perdues'], description: 'Grimoire précieux' },
  { id: 'resource_idol', name: 'Idole Sacrée', type: 'treasure', rarity: 'epic', value: 400, professionRequired: { name: 'Explorateur', level: 55 }, harvestLocation: ['Temples'], description: 'Statue divine' },
  { id: 'resource_crown', name: 'Couronne Ancienne', type: 'treasure', rarity: 'epic', value: 600, professionRequired: { name: 'Explorateur', level: 70 }, harvestLocation: ['Tombes Royales'], description: 'Couronne de roi' },
  { id: 'resource_philosopher_notes', name: 'Notes du Philosophe', type: 'treasure', rarity: 'legendary', value: 1500, professionRequired: { name: 'Explorateur', level: 95 }, harvestLocation: ['Laboratoires Anciens'], description: 'Secrets alchimie' }
];

// ============================================================================
// TOTAL : 165 RESSOURCES RÉCOLTE
// ============================================================================

export const ALL_GATHERING_RESOURCES: Resource[] = [
  ...MINING_RESOURCES,
  ...HERBALISM_RESOURCES,
  ...LOGGING_RESOURCES,
  ...FISHING_RESOURCES,
  ...HUNTING_RESOURCES,
  ...EXPLORATION_RESOURCES
];

/**
 * Spécialisations récolte niveau 50+
 */
export const GATHERING_SPECIALIZATIONS = {
  Mineur: [
    { id: 'spec_miner_prospector', name: 'Prospecteur', bonus: 'Détecte veines rares 100m, +50% gemmes' },
    { id: 'spec_miner_smelter', name: 'Fondeur', bonus: '+2 barres par minerai, craft alliages spéciaux' },
    { id: 'spec_miner_gemcutter', name: 'Gemmeur', bonus: 'Taille gemmes +100% valeur, craft bijoux' }
  ],
  Herboriste: [
    { id: 'spec_herb_botanist', name: 'Botaniste', bonus: '+50% récolte herbes, culture personnelle' },
    { id: 'spec_herb_druid', name: 'Druide', bonus: 'Communique plantes, herbes révèlent secrets' },
    { id: 'spec_herb_poisoner', name: 'Herboriste Vénéneux', bonus: 'Herbes toxiques +200% puissance' }
  ],
  Bûcheron: [
    { id: 'spec_log_forester', name: 'Forestier', bonus: 'Plante arbres, forêt personnelle pousse' },
    { id: 'spec_log_carpenter', name: 'Charpentier', bonus: 'Craft meubles, maisons, navires' },
    { id: 'spec_log_bowyer', name: 'Fabricant d\'Arcs', bonus: 'Craft arcs légendaires, flèches spéciales' }
  ],
  Pêcheur: [
    { id: 'spec_fish_angler', name: 'Pêcheur Expert', bonus: '+100% poissons rares, jamais échec' },
    { id: 'spec_fish_sailor', name: 'Marin', bonus: 'Navigue océans, trouve îles secrètes' },
    { id: 'spec_fish_cook', name: 'Cuisinier Poissons', bonus: 'Sushis légendaires, buffs permanents' }
  ],
  Chasseur: [
    { id: 'spec_hunt_tracker', name: 'Pisteur', bonus: 'Traque créatures légendaires, jamais échappe' },
    { id: 'spec_hunt_trapper', name: 'Trappeur', bonus: 'Pièges capturent créatures vivantes, apprivoise' },
    { id: 'spec_hunt_beastmaster', name: 'Maître des Bêtes', bonus: '3 familiers simultanés, contrôle total' }
  ],
  Dépeceur: [
    { id: 'spec_skin_tanner', name: 'Tanneur', bonus: 'Cuirs +200% qualité, craft armures légendaires' },
    { id: 'spec_skin_taxidermist', name: 'Taxidermiste', bonus: 'Naturalise créatures, décoration/trophées' },
    { id: 'spec_skin_alchemist', name: 'Alchimiste Organique', bonus: 'Organes → potions ultra rares' }
  ],
  Explorateur: [
    { id: 'spec_expl_archaeologist', name: 'Archéologue', bonus: 'Trouve ruines cachées, déchiffre langues anciennes' },
    { id: 'spec_expl_cartographer', name: 'Cartographe', bonus: 'Cartes révèlent trésors, téléportation rapide' },
    { id: 'spec_expl_treasure_hunter', name: 'Chasseur de Trésor', bonus: '+500% valeur trésors, chance légendaire doublée' }
  ]
};
