/**
 * ITEMS CATALOG EXPANSION - 200+ items complémentaires
 * Partie 2 : Plus d'armes, armures, accessoires, scrolls, bombs
 */

import { ItemDefinition } from './items-catalog';

// ============================================================================
// ARMES AVANCÉES (30+)
// ============================================================================

// Épées variées
export const WEAPON_SCIMITAR: ItemDefinition = {
  id: 'weapon:scimitar:fine',
  name: 'Cimeterre Forgé',
  type: 'weapon',
  rarity: 'uncommon',
  category: 'sword',
  description: 'Épée recourbée des terres du désert. Excellente pour la cavalerie.',
  value: 120,
  stats: { damage: '1d6', attackBonus: 1, dexterity: 1, weight: 3 },
  requirements: { dexterity: 11 },
  enchantable: true
};

export const WEAPON_RAPIER: ItemDefinition = {
  id: 'weapon:rapier:duelist',
  name: 'Rapière de Duelliste',
  type: 'weapon',
  rarity: 'uncommon',
  category: 'sword',
  description: 'Épée d\'estoc fine pour combats rapides et précis.',
  value: 150,
  stats: { damage: '1d8', attackBonus: 1, critChance: 15, weight: 2 },
  requirements: { dexterity: 13 },
  enchantable: true
};

export const WEAPON_GREATSWORD: ItemDefinition = {
  id: 'weapon:greatsword:knight',
  name: 'Espadon de Chevalier',
  type: 'weapon',
  rarity: 'uncommon',
  category: 'sword',
  description: 'Énorme épée à deux mains. Arme signature des chevaliers.',
  value: 200,
  stats: { damage: '2d6', attackBonus: 0, weight: 6 },
  requirements: { strength: 15 },
  enchantable: true
};

// Haches
export const WEAPON_HANDAXE: ItemDefinition = {
  id: 'weapon:handaxe:common',
  name: 'Hachette',
  type: 'weapon',
  rarity: 'common',
  category: 'axe',
  description: 'Petite hache légère, peut être lancée.',
  value: 20,
  stats: { damage: '1d6', weight: 2 },
  requirements: { strength: 8 },
  enchantable: true
};

export const WEAPON_BATTLEAXE: ItemDefinition = {
  id: 'weapon:battleaxe:common',
  name: 'Hache de Guerre',
  type: 'weapon',
  rarity: 'common',
  category: 'axe',
  description: 'Hache de combat polyvalente.',
  value: 60,
  stats: { damage: '1d8', weight: 4 },
  requirements: { strength: 12 },
  enchantable: true
};

export const WEAPON_DWARVEN_WARAXE: ItemDefinition = {
  id: 'weapon:axe:dwarven-war',
  name: 'Hache de Guerre Naine',
  type: 'weapon',
  rarity: 'rare',
  category: 'axe',
  description: 'Hache forgée par les maîtres forgerons nains. Équilibre parfait.',
  lore: 'Les nains forgent leurs haches avec des techniques séculaires. Chaque hache porte les runes du clan.',
  value: 800,
  stats: { damage: '1d10', attackBonus: 2, strength: 1, weight: 5 },
  requirements: { strength: 13 },
  enchantable: false
};

// Masses et marteaux
export const WEAPON_MACE: ItemDefinition = {
  id: 'weapon:mace:common',
  name: 'Masse d\'Armes',
  type: 'weapon',
  rarity: 'common',
  category: 'mace',
  description: 'Masse simple mais efficace contre armures.',
  value: 40,
  stats: { damage: '1d6', weight: 4 },
  requirements: { strength: 10 },
  enchantable: true
};

export const WEAPON_WARHAMMER: ItemDefinition = {
  id: 'weapon:warhammer:common',
  name: 'Marteau de Guerre',
  type: 'weapon',
  rarity: 'common',
  category: 'mace',
  description: 'Lourd marteau conçu pour écraser les armures.',
  value: 70,
  stats: { damage: '1d8', weight: 5 },
  requirements: { strength: 12 },
  enchantable: true
};

export const WEAPON_HOLY_MACE: ItemDefinition = {
  id: 'weapon:mace:holy',
  name: 'Masse Sacrée',
  type: 'weapon',
  rarity: 'epic',
  category: 'mace',
  description: 'Masse bénie par le Temple de la Lumière. Brûle les morts-vivants.',
  lore: 'Forgée dans les forges sacrées et bénie par l\'Archevêque lui-même.',
  value: 4000,
  stats: { damage: '1d8', attackBonus: 2, wisdom: 2, weight: 4 },
  effects: [
    { type: 'damage', magnitude: '2d6', description: '+2d6 radiant contre morts-vivants et démons' }
  ],
  requirements: { level: 10, class: ['Paladin', 'Clerc'], strength: 12 },
  enchantable: false
};

// Lances et piques
export const WEAPON_SPEAR: ItemDefinition = {
  id: 'weapon:spear:common',
  name: 'Lance',
  type: 'weapon',
  rarity: 'common',
  category: 'spear',
  description: 'Lance simple, peut être lancée ou utilisée au corps à corps.',
  value: 25,
  stats: { damage: '1d6', weight: 3 },
  requirements: { strength: 9 },
  enchantable: true
};

export const WEAPON_PIKE: ItemDefinition = {
  id: 'weapon:pike:soldier',
  name: 'Pique de Soldat',
  type: 'weapon',
  rarity: 'common',
  category: 'spear',
  description: 'Longue pique pour formations militaires.',
  value: 45,
  stats: { damage: '1d10', weight: 7 },
  requirements: { strength: 11 },
  enchantable: true
};

export const WEAPON_TRIDENT: ItemDefinition = {
  id: 'weapon:trident:oceanic',
  name: 'Trident Océanique',
  type: 'weapon',
  rarity: 'rare',
  category: 'spear',
  description: 'Trident enchanté par les prêtres de la mer.',
  lore: 'Utilisé par les gardiens des côtes pour repousser les créatures marines.',
  value: 1200,
  stats: { damage: '1d8', attackBonus: 2, weight: 4 },
  effects: [
    { type: 'buff', magnitude: 20, target: 'self', description: 'Respiration aquatique' },
    { type: 'buff', magnitude: 10, target: 'self', description: '+10 vitesse nage' }
  ],
  requirements: { level: 8, strength: 11 },
  enchantable: false
};

// Arcs et arbalètes avancés
export const WEAPON_COMPOSITE_BOW: ItemDefinition = {
  id: 'weapon:bow:composite',
  name: 'Arc Composite',
  type: 'weapon',
  rarity: 'uncommon',
  category: 'bow',
  description: 'Arc renforcé combinant bois et corne. Plus puissant.',
  value: 150,
  stats: { damage: '1d8', attackBonus: 1, weight: 2 },
  requirements: { dexterity: 13 },
  enchantable: true
};

export const WEAPON_ELVEN_BOW: ItemDefinition = {
  id: 'weapon:bow:elven',
  name: 'Arc Long Elfique',
  type: 'weapon',
  rarity: 'rare',
  category: 'bow',
  description: 'Arc élégant sculpté dans bois blanc de la Forêt d\'Émeraude.',
  lore: 'Les elfes sylvains façonnent leurs arcs à partir d\'arbres vivants qui acceptent de donner une branche.',
  value: 1500,
  stats: { damage: '2d6', attackBonus: 2, dexterity: 1, weight: 2 },
  effects: [
    { type: 'buff', magnitude: 20, target: 'self', description: 'Précision accrue : +20% chances critique' }
  ],
  requirements: { level: 9, dexterity: 14 },
  enchantable: false
};

export const WEAPON_CROSSBOW_LIGHT: ItemDefinition = {
  id: 'weapon:crossbow:light',
  name: 'Arbalète Légère',
  type: 'weapon',
  rarity: 'common',
  category: 'crossbow',
  description: 'Arbalète compacte, facile à recharger.',
  value: 60,
  stats: { damage: '1d8', weight: 5 },
  requirements: { dexterity: 10 },
  enchantable: true
};

export const WEAPON_CROSSBOW_HEAVY: ItemDefinition = {
  id: 'weapon:crossbow:heavy',
  name: 'Arbalète Lourde',
  type: 'weapon',
  rarity: 'uncommon',
  category: 'crossbow',
  description: 'Arbalète puissante. Longue recharge mais dégâts dévastateurs.',
  value: 180,
  stats: { damage: '1d12', attackBonus: 0, weight: 9 },
  requirements: { strength: 12, dexterity: 10 },
  enchantable: true
};

export const WEAPON_REPEATING_CROSSBOW: ItemDefinition = {
  id: 'weapon:crossbow:repeating',
  name: 'Arbalète à Répétition',
  type: 'weapon',
  rarity: 'rare',
  category: 'crossbow',
  description: 'Arbalète mécanique permettant tirs rapides successifs.',
  lore: 'Invention d\'un ingénieur gnome. Mécanisme complexe mais redoutablement efficace.',
  value: 2500,
  stats: { damage: '1d10', attackBonus: 1, weight: 8 },
  effects: [
    { type: 'buff', magnitude: 2, target: 'self', description: 'Peut tirer 3 fois par tour au lieu d\'1' }
  ],
  requirements: { level: 10, dexterity: 13 },
  enchantable: false
};

// Bâtons et baguettes magiques
export const WEAPON_QUARTERSTAFF: ItemDefinition = {
  id: 'weapon:quarterstaff:common',
  name: 'Bâton de Combat',
  type: 'weapon',
  rarity: 'common',
  category: 'staff',
  description: 'Bâton solide en chêne pour combat rapproché.',
  value: 10,
  stats: { damage: '1d6', weight: 4 },
  enchantable: true
};

export const WEAPON_BATTLE_STAFF: ItemDefinition = {
  id: 'weapon:staff:battle',
  name: 'Bâton de Guerre Runique',
  type: 'weapon',
  rarity: 'rare',
  category: 'staff',
  description: 'Bâton gravé de runes de puissance, équilibré pour combat et magie.',
  value: 1800,
  stats: { damage: '1d8', attackBonus: 2, intelligence: 2, wisdom: 1, weight: 5 },
  effects: [
    { type: 'buff', magnitude: 10, target: 'self', description: '+10% puissance sorts' }
  ],
  requirements: { level: 9, intelligence: 13 },
  enchantable: false
};

export const WEAPON_WAND_FIREBOLT: ItemDefinition = {
  id: 'weapon:wand:firebolt',
  name: 'Baguette d\'Éclair de Feu',
  type: 'weapon',
  rarity: 'uncommon',
  category: 'wand',
  description: 'Baguette qui lance projectiles de feu. 20 charges.',
  value: 500,
  stats: { damage: '2d6', weight: 1 },
  effects: [
    { type: 'damage', magnitude: '2d6', description: 'Tire éclair de feu (20 charges)' }
  ],
  requirements: { intelligence: 11 },
  enchantable: false
};

export const WEAPON_WAND_LIGHTNING: ItemDefinition = {
  id: 'weapon:wand:lightning',
  name: 'Baguette de Foudre',
  type: 'weapon',
  rarity: 'rare',
  category: 'wand',
  description: 'Baguette qui invoque éclairs. 15 charges.',
  value: 1200,
  stats: { damage: '3d6', weight: 1 },
  effects: [
    { type: 'damage', magnitude: '3d6', description: 'Éclair en ligne (15 charges)' }
  ],
  requirements: { level: 7, intelligence: 13 },
  enchantable: false
};

// ============================================================================
// ARMURES AVANCÉES (20+)
// ============================================================================

// Armures légères
export const ARMOR_PADDED: ItemDefinition = {
  id: 'armor:padded:common',
  name: 'Armure Matelassée',
  type: 'armor',
  rarity: 'common',
  category: 'light',
  description: 'Vêtement rembourré offrant protection basique.',
  value: 20,
  stats: { armor: 1, weight: 5 },
  enchantable: true
};

export const ARMOR_STUDDED_LEATHER: ItemDefinition = {
  id: 'armor:studded-leather',
  name: 'Cuir Clouté',
  type: 'armor',
  rarity: 'uncommon',
  category: 'light',
  description: 'Armure de cuir renforcée de clous métalliques.',
  value: 80,
  stats: { armor: 3, dexterity: 1, weight: 10 },
  enchantable: true
};

export const ARMOR_ELVEN_LEATHER: ItemDefinition = {
  id: 'armor:elven-leather',
  name: 'Cuir Elfique Enchanté',
  type: 'armor',
  rarity: 'rare',
  category: 'light',
  description: 'Armure légère elfique qui ne fait aucun bruit.',
  lore: 'Tannée avec des techniques ancestrales et enchantée par magie sylvaine.',
  value: 2000,
  stats: { armor: 4, dexterity: 2, weight: 6 },
  effects: [
    { type: 'buff', magnitude: 20, target: 'self', description: '+20% discrétion' }
  ],
  requirements: { level: 10, dexterity: 13 },
  enchantable: false
};

// Armures moyennes
export const ARMOR_HIDE: ItemDefinition = {
  id: 'armor:hide:common',
  name: 'Armure de Peau',
  type: 'armor',
  rarity: 'common',
  category: 'medium',
  description: 'Armure faite de peaux d\'animaux épaisses.',
  value: 60,
  stats: { armor: 3, weight: 15 },
  enchantable: true
};

export const ARMOR_SCALE_MAIL: ItemDefinition = {
  id: 'armor:scale-mail',
  name: 'Cotte d\'Écailles',
  type: 'armor',
  rarity: 'uncommon',
  category: 'medium',
  description: 'Armure composée d\'écailles métalliques superposées.',
  value: 150,
  stats: { armor: 6, weight: 22 },
  requirements: { strength: 11 },
  enchantable: true
};

export const ARMOR_BREASTPLATE: ItemDefinition = {
  id: 'armor:breastplate:steel',
  name: 'Cuirasse d\'Acier',
  type: 'armor',
  rarity: 'uncommon',
  category: 'medium',
  description: 'Protection thoracique en acier, permet bonne mobilité.',
  value: 200,
  stats: { armor: 6, dexterity: 1, weight: 18 },
  requirements: { strength: 12 },
  enchantable: true
};

export const ARMOR_HALF_PLATE: ItemDefinition = {
  id: 'armor:half-plate',
  name: 'Demi-Plate',
  type: 'armor',
  rarity: 'uncommon',
  category: 'medium',
  description: 'Combinaison de plates et mailles, compromis protection/mobilité.',
  value: 300,
  stats: { armor: 7, weight: 25 },
  requirements: { strength: 13 },
  enchantable: true
};

// Armures lourdes avancées
export const ARMOR_SPLINT: ItemDefinition = {
  id: 'armor:splint:common',
  name: 'Armure à Bandes',
  type: 'armor',
  rarity: 'common',
  category: 'heavy',
  description: 'Armure faite de bandes métalliques verticales.',
  value: 350,
  stats: { armor: 9, weight: 50 },
  requirements: { strength: 15 },
  enchantable: true
};

export const ARMOR_FULL_PLATE: ItemDefinition = {
  id: 'armor:full-plate:masterwork',
  name: 'Harnois de Maître',
  type: 'armor',
  rarity: 'rare',
  category: 'heavy',
  description: 'Armure complète forgée par maître artisan. Protection ultime.',
  value: 1500,
  stats: { armor: 10, weight: 50 },
  requirements: { strength: 16 },
  enchantable: true
};

export const ARMOR_MITHRIL_PLATE: ItemDefinition = {
  id: 'armor:mithril-plate',
  name: 'Armure de Plates en Mithril',
  type: 'armor',
  rarity: 'epic',
  category: 'heavy',
  description: 'Armure complète en mithril. Protection maximum, poids plume.',
  lore: 'Le mithril permet de créer armures aussi résistantes que l\'acier mais légères comme le cuir.',
  value: 15000,
  stats: { armor: 12, dexterity: 1, weight: 20 },
  requirements: { level: 12, strength: 13 },
  enchantable: false
};

export const ARMOR_DEMON_PLATE: ItemDefinition = {
  id: 'armor:demon-plate',
  name: 'Armure de Plates Démoniaque',
  type: 'armor',
  rarity: 'legendary',
  category: 'heavy',
  description: 'Armure noire forgée avec essence démoniaque. Maudite mais puissante.',
  lore: 'Portée par le Chevalier Noir avant sa chute. Murmure des promesses de pouvoir à son porteur.',
  value: 30000,
  stats: { armor: 14, strength: 3, constitution: 2, charisma: -2, weight: 40 },
  effects: [
    { type: 'buff', magnitude: 20, target: 'self', description: 'Résistance ténèbres +20%' },
    { type: 'debuff', magnitude: -10, description: 'Vulnérabilité lumière sacrée +10%' }
  ],
  requirements: { level: 16, strength: 16 },
  enchantable: false,
  bound: true
};

// Boucliers
export const ARMOR_WOODEN_SHIELD: ItemDefinition = {
  id: 'armor:shield:wooden',
  name: 'Bouclier de Bois',
  type: 'armor',
  rarity: 'common',
  category: 'shield',
  description: 'Bouclier rond en bois renforcé.',
  value: 15,
  stats: { armor: 1, weight: 5 },
  enchantable: true
};

export const ARMOR_STEEL_SHIELD: ItemDefinition = {
  id: 'armor:shield:steel',
  name: 'Écu d\'Acier',
  type: 'armor',
  rarity: 'common',
  category: 'shield',
  description: 'Bouclier métallique robuste.',
  value: 50,
  stats: { armor: 2, weight: 10 },
  requirements: { strength: 10 },
  enchantable: true
};

export const ARMOR_TOWER_SHIELD: ItemDefinition = {
  id: 'armor:shield:tower',
  name: 'Pavois',
  type: 'armor',
  rarity: 'uncommon',
  category: 'shield',
  description: 'Énorme bouclier qui protège presque tout le corps.',
  value: 120,
  stats: { armor: 3, weight: 20 },
  requirements: { strength: 14 },
  enchantable: true
};

export const ARMOR_SHIELD_REFLECTING: ItemDefinition = {
  id: 'armor:shield:reflecting',
  name: 'Bouclier Réfléchissant',
  type: 'armor',
  rarity: 'rare',
  category: 'shield',
  description: 'Bouclier poli comme miroir qui peut renvoyer sorts.',
  lore: 'Enchanté par un mage de guerre pour protéger contre magie hostile.',
  value: 3000,
  stats: { armor: 3, weight: 12 },
  effects: [
    { type: 'buff', magnitude: 30, target: 'self', description: '30% chances renvoyer sort ciblé' }
  ],
  requirements: { level: 11, strength: 12 },
  enchantable: false
};

// ============================================================================
// ACCESSOIRES (30+)
// ============================================================================

// Anneaux
export const ACC_RING_PROTECTION: ItemDefinition = {
  id: 'accessory:ring:protection',
  name: 'Anneau de Protection',
  type: 'artifact',
  rarity: 'uncommon',
  category: 'accessory',
  description: 'Anneau qui renforce défenses naturelles.',
  value: 400,
  stats: { armor: 1, weight: 0.1 },
  enchantable: false
};

export const ACC_RING_STRENGTH: ItemDefinition = {
  id: 'accessory:ring:strength',
  name: 'Anneau de Force',
  type: 'artifact',
  rarity: 'uncommon',
  category: 'accessory',
  description: 'Anneau qui augmente force physique.',
  value: 600,
  stats: { strength: 2, weight: 0.1 },
  requirements: { level: 5 },
  enchantable: false
};

export const ACC_RING_DEXTERITY: ItemDefinition = {
  id: 'accessory:ring:dexterity',
  name: 'Anneau d\'Agilité',
  type: 'artifact',
  rarity: 'uncommon',
  category: 'accessory',
  description: 'Anneau qui améliore réflexes et coordination.',
  value: 600,
  stats: { dexterity: 2, weight: 0.1 },
  requirements: { level: 5 },
  enchantable: false
};

export const ACC_RING_INTELLIGENCE: ItemDefinition = {
  id: 'accessory:ring:intelligence',
  name: 'Anneau d\'Intelligence',
  type: 'artifact',
  rarity: 'uncommon',
  category: 'accessory',
  description: 'Anneau qui aiguise l\'esprit.',
  value: 600,
  stats: { intelligence: 2, weight: 0.1 },
  requirements: { level: 5 },
  enchantable: false
};

export const ACC_RING_REGENERATION: ItemDefinition = {
  id: 'accessory:ring:regeneration',
  name: 'Anneau de Régénération',
  type: 'artifact',
  rarity: 'rare',
  category: 'accessory',
  description: 'Anneau qui restaure constamment la santé.',
  value: 5000,
  stats: { constitution: 1, healthBonus: 20, weight: 0.1 },
  effects: [
    { type: 'heal', magnitude: '1d4', description: 'Régénère 1d4 HP par minute hors combat' }
  ],
  requirements: { level: 10 },
  enchantable: false
};

export const ACC_RING_INVISIBILITY: ItemDefinition = {
  id: 'accessory:ring:invisibility',
  name: 'Anneau d\'Invisibilité',
  type: 'artifact',
  rarity: 'legendary',
  category: 'accessory',
  description: 'Anneau légendaire permettant de devenir invisible.',
  lore: 'Un des trois Anneaux des Ombres créés par les assassins de la Lame Silencieuse.',
  value: 50000,
  stats: { dexterity: 3, weight: 0.1 },
  effects: [
    { type: 'buff', magnitude: 100, duration: 10, target: 'self', description: 'Invisibilité 10 tours (3x/jour)' }
  ],
  requirements: { level: 15 },
  enchantable: false,
  bound: true
};

// Amulettes
export const ACC_AMULET_HEALTH: ItemDefinition = {
  id: 'accessory:amulet:health',
  name: 'Amulette de Vitalité',
  type: 'artifact',
  rarity: 'uncommon',
  category: 'accessory',
  description: 'Amulette qui augmente points de vie maximum.',
  value: 500,
  stats: { healthBonus: 15, weight: 0.2 },
  requirements: { level: 4 },
  enchantable: false
};

export const ACC_AMULET_MANA: ItemDefinition = {
  id: 'accessory:amulet:mana',
  name: 'Amulette de Mana',
  type: 'artifact',
  rarity: 'uncommon',
  category: 'accessory',
  description: 'Amulette qui augmente réserves de mana.',
  value: 500,
  stats: { manaBonus: 30, intelligence: 1, weight: 0.2 },
  requirements: { level: 4, class: ['Mage', 'Sorcier', 'Clerc'] },
  enchantable: false
};

export const ACC_AMULET_FIRE_IMMUNITY: ItemDefinition = {
  id: 'accessory:amulet:fire-immunity',
  name: 'Amulette d\'Immunité au Feu',
  type: 'artifact',
  rarity: 'epic',
  category: 'accessory',
  description: 'Amulette gravée de runes de feu. Protection quasi-totale.',
  lore: 'Forgée dans lave d\'un volcan actif et bénie par un élémentaire de feu.',
  value: 8000,
  stats: { fireResist: 90, weight: 0.2 },
  requirements: { level: 12 },
  enchantable: false
};

// Capes et manteaux
export const ACC_CLOAK_RESISTANCE: ItemDefinition = {
  id: 'accessory:cloak:resistance',
  name: 'Cape de Résistance',
  type: 'armor',
  rarity: 'uncommon',
  category: 'accessory',
  description: 'Cape enchantée qui protège contre éléments.',
  value: 400,
  stats: { 
    fireResist: 10, 
    coldResist: 10, 
    lightningResist: 10, 
    weight: 1 
  },
  enchantable: false
};

export const ACC_CLOAK_SHADOWS: ItemDefinition = {
  id: 'accessory:cloak:shadows',
  name: 'Cape d\'Ombres',
  type: 'armor',
  rarity: 'rare',
  category: 'accessory',
  description: 'Cape noire qui permet de se fondre dans l\'obscurité.',
  lore: 'Tissée avec fils d\'araignée phase et teinte dans ombres primordiales.',
  value: 2500,
  stats: { dexterity: 2, weight: 1 },
  effects: [
    { type: 'buff', magnitude: 30, target: 'self', description: '+30% discrétion dans ombres' }
  ],
  requirements: { level: 9, dexterity: 13 },
  enchantable: false
};

export const ACC_CLOAK_DISPLACEMENT: ItemDefinition = {
  id: 'accessory:cloak:displacement',
  name: 'Cape de Déplacement',
  type: 'armor',
  rarity: 'legendary',
  category: 'accessory',
  description: 'Cape qui crée illusion, vous apparaissez décalé de votre position réelle.',
  lore: 'Créée par un archimage illusionniste. L\'image projetée est à 30cm de la position réelle.',
  value: 25000,
  stats: { armor: 2, dexterity: 3, weight: 1 },
  effects: [
    { type: 'buff', magnitude: 50, target: 'self', description: '50% chances attaques ennemies ratent' }
  ],
  requirements: { level: 16 },
  enchantable: false,
  bound: true
};

// Ceintures
export const ACC_BELT_GIANT_STRENGTH: ItemDefinition = {
  id: 'accessory:belt:giant-strength',
  name: 'Ceinture de Force de Géant',
  type: 'artifact',
  rarity: 'rare',
  category: 'accessory',
  description: 'Ceinture enchantée qui confère force d\'un géant.',
  lore: 'Forgée à partir de chaînes ayant retenu un géant des collines pendant cent ans.',
  value: 6000,
  stats: { strength: 4, weight: 2 },
  requirements: { level: 10 },
  enchantable: false
};

export const ACC_BELT_DWARVEN: ItemDefinition = {
  id: 'accessory:belt:dwarven-fortitude',
  name: 'Ceinture de Robustesse Naine',
  type: 'artifact',
  rarity: 'rare',
  category: 'accessory',
  description: 'Ceinture naine qui augmente endurance et résistance poison.',
  value: 4000,
  stats: { constitution: 3, poisonResist: 50, weight: 2 },
  requirements: { level: 9 },
  enchantable: false
};

// Bottes
export const ACC_BOOTS_SPEED: ItemDefinition = {
  id: 'accessory:boots:speed',
  name: 'Bottes de Rapidité',
  type: 'armor',
  rarity: 'uncommon',
  category: 'accessory',
  description: 'Bottes légères qui augmentent vitesse de déplacement.',
  value: 800,
  stats: { speed: 10, dexterity: 1, weight: 1 },
  enchantable: false
};

export const ACC_BOOTS_LEVITATION: ItemDefinition = {
  id: 'accessory:boots:levitation',
  name: 'Bottes de Lévitation',
  type: 'armor',
  rarity: 'rare',
  category: 'accessory',
  description: 'Bottes permettant de marcher dans les airs.',
  lore: 'Enchantées par magie aérienne. Le porteur peut marcher sur l\'air comme sur un sol solide.',
  value: 5000,
  stats: { dexterity: 2, weight: 1 },
  effects: [
    { type: 'buff', magnitude: 1, target: 'self', description: 'Marche dans les airs (15min/jour)' }
  ],
  requirements: { level: 11 },
  enchantable: false
};

export const ACC_BOOTS_ELVENKIND: ItemDefinition = {
  id: 'accessory:boots:elvenkind',
  name: 'Bottes des Elfes',
  type: 'armor',
  rarity: 'rare',
  category: 'accessory',
  description: 'Bottes elfiques qui ne font aucun bruit.',
  lore: 'Les elfes peuvent se déplacer silencieusement même sur feuilles mortes.',
  value: 3500,
  stats: { dexterity: 2, weight: 0.5 },
  effects: [
    { type: 'buff', magnitude: 40, target: 'self', description: '+40% discrétion (silence total)' }
  ],
  requirements: { level: 8, dexterity: 13 },
  enchantable: false
};

// Gants
export const ACC_GLOVES_DEXTERITY: ItemDefinition = {
  id: 'accessory:gloves:dexterity',
  name: 'Gants d\'Adresse',
  type: 'armor',
  rarity: 'uncommon',
  category: 'accessory',
  description: 'Gants fins qui améliorent dextérité manuelle.',
  value: 600,
  stats: { dexterity: 2, weight: 0.2 },
  enchantable: false
};

export const ACC_GLOVES_OGRE_POWER: ItemDefinition = {
  id: 'accessory:gloves:ogre-power',
  name: 'Gantelets de Puissance d\'Ogre',
  type: 'armor',
  rarity: 'rare',
  category: 'accessory',
  description: 'Lourds gantelets qui décuplent force de frappe.',
  value: 4000,
  stats: { strength: 3, attackBonus: 1, weight: 4 },
  requirements: { level: 9, strength: 12 },
  enchantable: false
};

export const ACC_GLOVES_THIEVERY: ItemDefinition = {
  id: 'accessory:gloves:thievery',
  name: 'Gants de Voleur',
  type: 'armor',
  rarity: 'rare',
  category: 'accessory',
  description: 'Gants noirs qui facilitent pickpocket et crochetage.',
  lore: 'Portés par maître voleur Vex avant sa capture. Confisqués puis \"perdus\" mystérieusement.',
  value: 3000,
  stats: { dexterity: 2, weight: 0.2 },
  effects: [
    { type: 'buff', magnitude: 30, target: 'self', description: '+30% pickpocket et crochetage' }
  ],
  requirements: { level: 7, dexterity: 14 },
  enchantable: false
};

// Heaumes
export const ACC_HELMET_STEEL: ItemDefinition = {
  id: 'accessory:helmet:steel',
  name: 'Heaume d\'Acier',
  type: 'armor',
  rarity: 'common',
  category: 'accessory',
  description: 'Casque robuste protégeant la tête.',
  value: 40,
  stats: { armor: 1, weight: 3 },
  enchantable: true
};

export const ACC_HELMET_VISION: ItemDefinition = {
  id: 'accessory:helmet:eagle-vision',
  name: 'Heaume de Vision d\'Aigle',
  type: 'armor',
  rarity: 'rare',
  category: 'accessory',
  description: 'Heaume permettant de voir à des distances incroyables.',
  lore: 'Porté par les éclaireurs de l\'ancien empire. Les lentilles enchantées grossissent sans distorsion.',
  value: 4500,
  stats: { armor: 2, wisdom: 2, weight: 3 },
  effects: [
    { type: 'buff', magnitude: 50, target: 'self', description: '+50% portée vision' }
  ],
  requirements: { level: 10 },
  enchantable: false
};

export const ACC_HELMET_TELEPATHY: ItemDefinition = {
  id: 'accessory:helmet:telepathy',
  name: 'Heaume de Télépathie',
  type: 'armor',
  rarity: 'legendary',
  category: 'accessory',
  description: 'Heaume permettant communication mentale et lecture pensées.',
  lore: 'Créé par ordre psi avant leur extinction. Le heaume amplifie pouvoirs mentaux.',
  value: 40000,
  stats: { armor: 1, intelligence: 3, wisdom: 3, weight: 2 },
  effects: [
    { type: 'buff', magnitude: 1, target: 'self', description: 'Télépathie (lire pensées DD Sagesse 18)' },
    { type: 'buff', magnitude: 1, target: 'ally', description: 'Communication mentale avec alliés 100m' }
  ],
  requirements: { level: 17, intelligence: 16 },
  enchantable: false,
  bound: true
};

// ============================================================================
// CONSOMMABLES AVANCÉS (40+)
// ============================================================================

// Potions avancées
export const POTION_COLD_RESISTANCE: ItemDefinition = {
  id: 'potion:cold-resistance',
  name: 'Potion de Résistance au Froid',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'potion',
  description: 'Liquide bleu glacé qui protège du froid.',
  value: 100,
  effects: [
    { type: 'buff', magnitude: 50, duration: 60, target: 'self', description: 'Résistance froid +50% (1h)' }
  ],
  stackable: true,
  maxStack: 10,
  stats: { weight: 0.5 }
};

export const POTION_LIGHTNING_RESISTANCE: ItemDefinition = {
  id: 'potion:lightning-resistance',
  name: 'Potion de Résistance à la Foudre',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'potion',
  description: 'Liquide étincelant qui protège des éclairs.',
  value: 100,
  effects: [
    { type: 'buff', magnitude: 50, duration: 60, target: 'self', description: 'Résistance foudre +50% (1h)' }
  ],
  stackable: true,
  maxStack: 10,
  stats: { weight: 0.5 }
};

export const POTION_POISON_RESISTANCE: ItemDefinition = {
  id: 'potion:poison-resistance',
  name: 'Potion de Résistance au Poison',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'potion',
  description: 'Liquide vert qui neutralise poisons.',
  value: 100,
  effects: [
    { type: 'buff', magnitude: 50, duration: 60, target: 'self', description: 'Résistance poison +50% (1h)' }
  ],
  stackable: true,
  maxStack: 10,
  stats: { weight: 0.5 }
};

export const POTION_ANTIDOTE: ItemDefinition = {
  id: 'potion:antidote:universal',
  name: 'Antidote Universel',
  type: 'consumable',
  rarity: 'rare',
  category: 'potion',
  description: 'Antidote puissant neutralisant tous poisons connus.',
  value: 300,
  effects: [
    { type: 'heal', magnitude: '100%', target: 'self', description: 'Guérit tous effets poison' }
  ],
  stackable: true,
  maxStack: 5,
  stats: { weight: 0.5 }
};

export const POTION_HASTE: ItemDefinition = {
  id: 'potion:haste',
  name: 'Potion de Célérité',
  type: 'consumable',
  rarity: 'rare',
  category: 'potion',
  description: 'Potion argentée qui accélère le temps pour vous.',
  value: 400,
  effects: [
    { type: 'buff', magnitude: 100, duration: 10, target: 'self', description: 'Double vitesse et actions (10 tours)' }
  ],
  stackable: true,
  maxStack: 3,
  stats: { weight: 0.5 }
};

export const POTION_FLYING: ItemDefinition = {
  id: 'potion:flying',
  name: 'Potion de Vol',
  type: 'consumable',
  rarity: 'rare',
  category: 'potion',
  description: 'Potion légère qui permet de voler.',
  value: 500,
  effects: [
    { type: 'buff', magnitude: 1, duration: 30, target: 'self', description: 'Vol libre (30 tours / 5 minutes)' }
  ],
  stackable: true,
  maxStack: 3,
  stats: { weight: 0.5 }
};

export const POTION_GASEOUS_FORM: ItemDefinition = {
  id: 'potion:gaseous-form',
  name: 'Potion de Forme Gazeuse',
  type: 'consumable',
  rarity: 'rare',
  category: 'potion',
  description: 'Transforme le corps en vapeur, permet de traverser fissures.',
  value: 600,
  effects: [
    { type: 'transform', magnitude: 1, duration: 20, description: 'Forme gazeuse (20 tours, immunité physique)' }
  ],
  stackable: true,
  maxStack: 2,
  stats: { weight: 0.5 }
};

export const POTION_HEROISM: ItemDefinition = {
  id: 'potion:heroism',
  name: 'Potion d\'Héroïsme',
  type: 'consumable',
  rarity: 'rare',
  category: 'potion',
  description: 'Élixir doré qui inspire courage et bravoure.',
  value: 350,
  effects: [
    { type: 'buff', magnitude: 10, duration: 60, target: 'self', description: '+10 HP temporaires et immunité peur (1h)' }
  ],
  stackable: true,
  maxStack: 5,
  stats: { weight: 0.5 }
};

export const POTION_MIND_READING: ItemDefinition = {
  id: 'potion:mind-reading',
  name: 'Potion de Lecture des Pensées',
  type: 'consumable',
  rarity: 'epic',
  category: 'potion',
  description: 'Potion violette qui permet lire pensées surface.',
  value: 800,
  effects: [
    { type: 'buff', magnitude: 1, duration: 30, target: 'self', description: 'Lit pensées (30 tours, DD Sagesse 15)' }
  ],
  stackable: true,
  maxStack: 2,
  stats: { weight: 0.5 }
};

export const POTION_GIANT_SIZE: ItemDefinition = {
  id: 'potion:giant-size',
  name: 'Potion de Taille de Géant',
  type: 'consumable',
  rarity: 'epic',
  category: 'potion',
  description: 'Potion qui triple la taille et décuple la force.',
  lore: 'Distillée à partir de sang de géant. Sensation vertigineuse garantie.',
  value: 1000,
  effects: [
    { type: 'transform', magnitude: 3, duration: 10, description: 'Taille x3, Force +8, Dégâts x2 (10 tours)' }
  ],
  stackable: true,
  maxStack: 1,
  stats: { weight: 0.5 }
};

// Parchemins magiques
export const SCROLL_FIREBALL: ItemDefinition = {
  id: 'scroll:fireball',
  name: 'Parchemin de Boule de Feu',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'scroll',
  description: 'Parchemin invoquant boule de feu explosive.',
  value: 200,
  effects: [
    { type: 'damage', magnitude: '8d6', target: 'area', description: '8d6 dégâts feu (rayon 6m)' }
  ],
  stackable: true,
  maxStack: 10,
  stats: { weight: 0.1 }
};

export const SCROLL_LIGHTNING_BOLT: ItemDefinition = {
  id: 'scroll:lightning-bolt',
  name: 'Parchemin d\'Éclair',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'scroll',
  description: 'Parchemin invoquant éclair dévastateur.',
  value: 250,
  effects: [
    { type: 'damage', magnitude: '8d6', description: '8d6 dégâts foudre (ligne 30m)' }
  ],
  stackable: true,
  maxStack: 10,
  stats: { weight: 0.1 }
};

export const SCROLL_ICE_STORM: ItemDefinition = {
  id: 'scroll:ice-storm',
  name: 'Parchemin de Tempête de Glace',
  type: 'consumable',
  rarity: 'rare',
  category: 'scroll',
  description: 'Parchemin invoquant tempête de grêle glacée.',
  value: 400,
  effects: [
    { type: 'damage', magnitude: '4d8+2d6', target: 'area', description: '4d8 contondant + 2d6 froid (20m rayon)' }
  ],
  stackable: true,
  maxStack: 5,
  stats: { weight: 0.1 }
};

export const SCROLL_HEAL: ItemDefinition = {
  id: 'scroll:heal',
  name: 'Parchemin de Soins',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'scroll',
  description: 'Parchemin de guérison divine.',
  value: 250,
  effects: [
    { type: 'heal', magnitude: '6d8+6', target: 'ally', description: 'Soigne 6d8+6 HP' }
  ],
  stackable: true,
  maxStack: 10,
  stats: { weight: 0.1 }
};

export const SCROLL_RESURRECTION: ItemDefinition = {
  id: 'scroll:resurrection',
  name: 'Parchemin de Résurrection',
  type: 'consumable',
  rarity: 'legendary',
  category: 'scroll',
  description: 'Parchemin sacré ramenant un mort à la vie.',
  lore: 'Transcrit par grand prêtre. Requiert sacrifice immense de force vitale.',
  value: 50000,
  effects: [
    { type: 'heal', magnitude: '100%', target: 'ally', description: 'Ressuscite un mort (max 7 jours)' }
  ],
  stackable: true,
  maxStack: 1,
  stats: { weight: 0.1 }
};

export const SCROLL_TELEPORT: ItemDefinition = {
  id: 'scroll:teleport',
  name: 'Parchemin de Téléportation',
  type: 'consumable',
  rarity: 'rare',
  category: 'scroll',
  description: 'Parchemin téléportant à lieu connu.',
  value: 800,
  effects: [
    { type: 'teleport', magnitude: 1, description: 'Téléporte vous + 8 alliés à lieu familier' }
  ],
  stackable: true,
  maxStack: 3,
  stats: { weight: 0.1 }
};

export const SCROLL_IDENTIFY: ItemDefinition = {
  id: 'scroll:identify',
  name: 'Parchemin d\'Identification',
  type: 'consumable',
  rarity: 'common',
  category: 'scroll',
  description: 'Révèle propriétés magiques d\'un objet.',
  value: 50,
  stackable: true,
  maxStack: 20,
  stats: { weight: 0.1 }
};

export const SCROLL_REMOVE_CURSE: ItemDefinition = {
  id: 'scroll:remove-curse',
  name: 'Parchemin de Levée de Malédiction',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'scroll',
  description: 'Brise malédictions mineures.',
  value: 300,
  effects: [
    { type: 'buff', magnitude: 1, target: 'ally', description: 'Lève malédiction niveau 1-3' }
  ],
  stackable: true,
  maxStack: 5,
  stats: { weight: 0.1 }
};

// Bombes et explosifs
export const BOMB_SMOKE: ItemDefinition = {
  id: 'bomb:smoke',
  name: 'Bombe Fumigène',
  type: 'consumable',
  rarity: 'common',
  category: 'bomb',
  description: 'Bombe créant écran de fumée dense.',
  value: 30,
  effects: [
    { type: 'buff', magnitude: 10, duration: 10, target: 'area', description: 'Fumée opaque 10m rayon (10 tours)' }
  ],
  stackable: true,
  maxStack: 10,
  stats: { weight: 1 }
};

export const BOMB_ALCHEMIST_FIRE: ItemDefinition = {
  id: 'bomb:alchemist-fire',
  name: 'Feu Grégeois',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'bomb',
  description: 'Fiole de liquide inflammable qui explose au contact.',
  value: 50,
  effects: [
    { type: 'damage', magnitude: '2d6', target: 'enemy', description: '2d6 feu + brûle 3 tours (1d4/tour)' }
  ],
  stackable: true,
  maxStack: 10,
  stats: { weight: 1 }
};

export const BOMB_ACID: ItemDefinition = {
  id: 'bomb:acid',
  name: 'Fiole d\'Acide',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'bomb',
  description: 'Acide corrosif qui ronge armures.',
  value: 50,
  effects: [
    { type: 'damage', magnitude: '2d6', target: 'enemy', description: '2d6 acide + corrode armure (-2 CA 5 tours)' }
  ],
  stackable: true,
  maxStack: 10,
  stats: { weight: 1 }
};

export const BOMB_FROST: ItemDefinition = {
  id: 'bomb:frost',
  name: 'Bombe Givrante',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'bomb',
  description: 'Bombe gelant tout dans zone d\'impact.',
  value: 75,
  effects: [
    { type: 'damage', magnitude: '3d6', target: 'area', description: '3d6 froid + ralentit (vitesse /2, 5 tours)' }
  ],
  stackable: true,
  maxStack: 5,
  stats: { weight: 1 }
};

export const BOMB_THUNDER: ItemDefinition = {
  id: 'bomb:thunder',
  name: 'Bombe de Tonnerre',
  type: 'consumable',
  rarity: 'rare',
  category: 'bomb',
  description: 'Bombe produisant onde de choc assourdissante.',
  value: 150,
  effects: [
    { type: 'damage', magnitude: '4d6', target: 'area', description: '4d6 sonique + assourdit (DD Constitution 15)' }
  ],
  stackable: true,
  maxStack: 5,
  stats: { weight: 1 }
};

export const BOMB_DRAGON_BREATH: ItemDefinition = {
  id: 'bomb:dragon-breath',
  name: 'Souffle de Dragon en Fiole',
  type: 'consumable',
  rarity: 'epic',
  category: 'bomb',
  description: 'Fiole contenant essence de souffle de dragon.',
  lore: 'Souffle de dragon capturé et condensé. Instable et extrêmement dangereux.',
  value: 1000,
  effects: [
    { type: 'damage', magnitude: '10d6', target: 'area', description: '10d6 feu en cône 9m' }
  ],
  stackable: true,
  maxStack: 2,
  stats: { weight: 2 }
};

// Nourritures avancées
export const FOOD_DRIED_MEAT: ItemDefinition = {
  id: 'food:dried-meat',
  name: 'Viande Séchée',
  type: 'consumable',
  rarity: 'common',
  category: 'food',
  description: 'Viande séchée pour voyage. Se conserve longtemps.',
  value: 5,
  effects: [
    { type: 'heal', magnitude: '1d6', target: 'self', description: 'Restaure 1d6 HP' }
  ],
  stackable: true,
  maxStack: 50,
  stats: { weight: 0.5 }
};

export const FOOD_CHEESE: ItemDefinition = {
  id: 'food:cheese',
  name: 'Fromage',
  type: 'consumable',
  rarity: 'common',
  category: 'food',
  description: 'Morceau de fromage affiné.',
  value: 3,
  effects: [
    { type: 'heal', magnitude: '1d4', target: 'self', description: 'Restaure 1d4 HP' }
  ],
  stackable: true,
  maxStack: 30,
  stats: { weight: 0.5 }
};

export const FOOD_APPLE: ItemDefinition = {
  id: 'food:apple',
  name: 'Pomme',
  type: 'consumable',
  rarity: 'common',
  category: 'food',
  description: 'Pomme fraîche et croquante.',
  value: 1,
  effects: [
    { type: 'heal', magnitude: '1', target: 'self', description: 'Restaure 1 HP' }
  ],
  stackable: true,
  maxStack: 50,
  stats: { weight: 0.2 }
};

export const FOOD_STEW: ItemDefinition = {
  id: 'food:hearty-stew',
  name: 'Ragoût Copieux',
  type: 'consumable',
  rarity: 'common',
  category: 'food',
  description: 'Ragoût chaud et réconfortant.',
  value: 10,
  effects: [
    { type: 'heal', magnitude: '2d6', target: 'self', description: 'Restaure 2d6 HP' },
    { type: 'buff', magnitude: 1, duration: 120, target: 'self', description: '+1 Constitution 2 heures' }
  ],
  stackable: true,
  maxStack: 10,
  stats: { weight: 1 }
};

export const FOOD_DWARVEN_ALE: ItemDefinition = {
  id: 'food:dwarven-ale',
  name: 'Bière Naine',
  type: 'consumable',
  rarity: 'uncommon',
  category: 'food',
  description: 'Bière forte brassée par nains. Revigorante.',
  lore: 'Les nains boivent cette bière depuis l\'aube de leur civilisation.',
  value: 15,
  effects: [
    { type: 'heal', magnitude: '1d8', target: 'self', description: 'Restaure 1d8 HP' },
    { type: 'buff', magnitude: 2, duration: 60, target: 'self', description: '+2 Force, -1 Dextérité (1h)' }
  ],
  stackable: true,
  maxStack: 10,
  stats: { weight: 2 }
};

export const FOOD_ELVEN_WINE: ItemDefinition = {
  id: 'food:elven-wine',
  name: 'Vin Elfique',
  type: 'consumable',
  rarity: 'rare',
  category: 'food',
  description: 'Vin précieux des elfes. Améliore perception.',
  lore: 'Vieilli pendant cent ans dans fûts de chêne enchantés.',
  value: 100,
  effects: [
    { type: 'heal', magnitude: '2d4', target: 'self', description: 'Restaure 2d4 HP' },
    { type: 'buff', magnitude: 2, duration: 240, target: 'self', description: '+2 Sagesse, +2 Charisme (4h)' }
  ],
  stackable: true,
  maxStack: 5,
  stats: { weight: 1 }
};

// ============================================================================
// MATÉRIAUX AVANCÉS (20+)
// ============================================================================

export const MATERIAL_COPPER_ORE: ItemDefinition = {
  id: 'material:copper-ore',
  name: 'Minerai de Cuivre',
  type: 'material',
  rarity: 'common',
  description: 'Minerai rougeâtre de cuivre.',
  value: 3,
  stackable: true,
  maxStack: 100,
  stats: { weight: 2 }
};

export const MATERIAL_TIN_ORE: ItemDefinition = {
  id: 'material:tin-ore',
  name: 'Minerai d\'Étain',
  type: 'material',
  rarity: 'common',
  description: 'Minerai grisâtre d\'étain.',
  value: 4,
  stackable: true,
  maxStack: 100,
  stats: { weight: 2 }
};

export const MATERIAL_SILVER_ORE: ItemDefinition = {
  id: 'material:silver-ore',
  name: 'Minerai d\'Argent',
  type: 'material',
  rarity: 'uncommon',
  description: 'Minerai argenté précieux.',
  value: 50,
  stackable: true,
  maxStack: 100,
  stats: { weight: 2 }
};

export const MATERIAL_GOLD_ORE: ItemDefinition = {
  id: 'material:gold-ore',
  name: 'Minerai d\'Or',
  type: 'material',
  rarity: 'uncommon',
  description: 'Minerai doré très précieux.',
  value: 100,
  stackable: true,
  maxStack: 100,
  stats: { weight: 2 }
};

export const MATERIAL_ADAMANTINE: ItemDefinition = {
  id: 'material:adamantine-ore',
  name: 'Minerai d\'Adamantine',
  type: 'material',
  rarity: 'epic',
  description: 'Métal noir quasi-indestructible. Plus dur que diamant.',
  lore: 'Forgé dans cœur d\'étoiles mortes puis tombé sur terre via météorites.',
  value: 1000,
  stackable: true,
  maxStack: 20,
  stats: { weight: 5 }
};

export const MATERIAL_MOONSTONE: ItemDefinition = {
  id: 'material:moonstone',
  name: 'Pierre de Lune',
  type: 'material',
  rarity: 'rare',
  description: 'Gemme laiteuse qui brille doucement la nuit.',
  value: 200,
  stackable: true,
  maxStack: 50,
  stats: { weight: 0.1 }
};

export const MATERIAL_RUBY: ItemDefinition = {
  id: 'material:ruby',
  name: 'Rubis',
  type: 'material',
  rarity: 'rare',
  description: 'Gemme rouge sang de grande valeur.',
  value: 500,
  stackable: true,
  maxStack: 50,
  stats: { weight: 0.1 }
};

export const MATERIAL_SAPPHIRE: ItemDefinition = {
  id: 'material:sapphire',
  name: 'Saphir',
  type: 'material',
  rarity: 'rare',
  description: 'Gemme bleue profonde.',
  value: 500,
  stackable: true,
  maxStack: 50,
  stats: { weight: 0.1 }
};

export const MATERIAL_EMERALD: ItemDefinition = {
  id: 'material:emerald',
  name: 'Émeraude',
  type: 'material',
  rarity: 'rare',
  description: 'Gemme verte éclatante.',
  value: 500,
  stackable: true,
  maxStack: 50,
  stats: { weight: 0.1 }
};

export const MATERIAL_DIAMOND: ItemDefinition = {
  id: 'material:diamond',
  name: 'Diamant',
  type: 'material',
  rarity: 'epic',
  description: 'Gemme transparente de valeur inestimable.',
  value: 2000,
  stackable: true,
  maxStack: 20,
  stats: { weight: 0.1 }
};

export const MATERIAL_ARCANE_CRYSTAL: ItemDefinition = {
  id: 'material:arcane-crystal',
  name: 'Cristal Arcane',
  type: 'material',
  rarity: 'rare',
  description: 'Cristal violet pulsant d\'énergie magique.',
  lore: 'Se forme naturellement dans zones haute concentration magique.',
  value: 300,
  stackable: true,
  maxStack: 50,
  stats: { weight: 0.5 }
};

export const MATERIAL_DEMON_BLOOD: ItemDefinition = {
  id: 'material:demon-blood',
  name: 'Sang de Démon',
  type: 'material',
  rarity: 'epic',
  description: 'Sang noir de démon. Composant alchimique puissant mais corrompu.',
  lore: 'Utilisé dans rituels interdits. Possession illégale dans la plupart des royaumes.',
  value: 800,
  stackable: true,
  maxStack: 10,
  stats: { weight: 0.5 }
};

export const MATERIAL_PHOENIX_FEATHER: ItemDefinition = {
  id: 'material:phoenix-feather',
  name: 'Plume de Phénix',
  type: 'material',
  rarity: 'legendary',
  description: 'Plume d\'or d\'un phénix. Chaude au toucher.',
  lore: 'Les phénix sont quasi-mythiques. Une plume vaut fortune et possède propriétés résurrection.',
  value: 5000,
  stackable: true,
  maxStack: 5,
  stats: { weight: 0.1 }
};

export const MATERIAL_UNICORN_HORN: ItemDefinition = {
  id: 'material:unicorn-horn',
  name: 'Corne de Licorne',
  type: 'material',
  rarity: 'legendary',
  description: 'Corne spiralée irisée. Neutralise poisons.',
  lore: 'Tuer licorne = malédiction éternelle. Seules cornes naturellement perdues sont légitimes.',
  value: 10000,
  stackable: true,
  maxStack: 1,
  stats: { weight: 2 }
};

export const MATERIAL_DRAGON_SCALE: ItemDefinition = {
  id: 'material:dragon-scale:red',
  name: 'Écaille de Dragon Rouge',
  type: 'material',
  rarity: 'epic',
  description: 'Écaille rouge de dragon ancien. Quasi-impénétrable.',
  value: 1500,
  stackable: true,
  maxStack: 10,
  stats: { weight: 2 }
};

export const MATERIAL_DRAGON_HEART: ItemDefinition = {
  id: 'material:dragon-heart',
  name: 'Cœur de Dragon',
  type: 'material',
  rarity: 'legendary',
  description: 'Cœur palpitant d\'un dragon. Immense pouvoir magique.',
  lore: 'Cœur de dragon continue de battre pendant des années après mort. Source pouvoir incroyable.',
  value: 50000,
  stackable: false,
  stats: { weight: 10 }
};

export const MATERIAL_VOID_ESSENCE: ItemDefinition = {
  id: 'material:void-essence',
  name: 'Essence du Vide',
  type: 'material',
  rarity: 'artifact',
  description: 'Fragment du néant primordial. Absorbe lumière.',
  lore: 'Substance provenant d\'au-delà de la réalité. Extrêmement dangereuse à manipuler.',
  value: 20000,
  stackable: true,
  maxStack: 5,
  stats: { weight: 0 }
};

// ============================================================================
// EXPORTS EXPANSION
// ============================================================================

export const EXPANSION_WEAPONS: ItemDefinition[] = [
  WEAPON_SCIMITAR, WEAPON_RAPIER, WEAPON_GREATSWORD,
  WEAPON_HANDAXE, WEAPON_BATTLEAXE, WEAPON_DWARVEN_WARAXE,
  WEAPON_MACE, WEAPON_WARHAMMER, WEAPON_HOLY_MACE,
  WEAPON_SPEAR, WEAPON_PIKE, WEAPON_TRIDENT,
  WEAPON_COMPOSITE_BOW, WEAPON_ELVEN_BOW,
  WEAPON_CROSSBOW_LIGHT, WEAPON_CROSSBOW_HEAVY, WEAPON_REPEATING_CROSSBOW,
  WEAPON_QUARTERSTAFF, WEAPON_BATTLE_STAFF,
  WEAPON_WAND_FIREBOLT, WEAPON_WAND_LIGHTNING
];

export const EXPANSION_ARMORS: ItemDefinition[] = [
  ARMOR_PADDED, ARMOR_STUDDED_LEATHER, ARMOR_ELVEN_LEATHER,
  ARMOR_HIDE, ARMOR_SCALE_MAIL, ARMOR_BREASTPLATE, ARMOR_HALF_PLATE,
  ARMOR_SPLINT, ARMOR_FULL_PLATE, ARMOR_MITHRIL_PLATE, ARMOR_DEMON_PLATE,
  ARMOR_WOODEN_SHIELD, ARMOR_STEEL_SHIELD, ARMOR_TOWER_SHIELD, ARMOR_SHIELD_REFLECTING
];

export const EXPANSION_ACCESSORIES: ItemDefinition[] = [
  ACC_RING_PROTECTION, ACC_RING_STRENGTH, ACC_RING_DEXTERITY, ACC_RING_INTELLIGENCE,
  ACC_RING_REGENERATION, ACC_RING_INVISIBILITY,
  ACC_AMULET_HEALTH, ACC_AMULET_MANA, ACC_AMULET_FIRE_IMMUNITY,
  ACC_CLOAK_RESISTANCE, ACC_CLOAK_SHADOWS, ACC_CLOAK_DISPLACEMENT,
  ACC_BELT_GIANT_STRENGTH, ACC_BELT_DWARVEN,
  ACC_BOOTS_SPEED, ACC_BOOTS_LEVITATION, ACC_BOOTS_ELVENKIND,
  ACC_GLOVES_DEXTERITY, ACC_GLOVES_OGRE_POWER, ACC_GLOVES_THIEVERY,
  ACC_HELMET_STEEL, ACC_HELMET_VISION, ACC_HELMET_TELEPATHY
];

export const EXPANSION_POTIONS: ItemDefinition[] = [
  POTION_COLD_RESISTANCE, POTION_LIGHTNING_RESISTANCE, POTION_POISON_RESISTANCE,
  POTION_ANTIDOTE, POTION_HASTE, POTION_FLYING, POTION_GASEOUS_FORM,
  POTION_HEROISM, POTION_MIND_READING, POTION_GIANT_SIZE
];

export const EXPANSION_SCROLLS: ItemDefinition[] = [
  SCROLL_FIREBALL, SCROLL_LIGHTNING_BOLT, SCROLL_ICE_STORM,
  SCROLL_HEAL, SCROLL_RESURRECTION, SCROLL_TELEPORT,
  SCROLL_IDENTIFY, SCROLL_REMOVE_CURSE
];

export const EXPANSION_BOMBS: ItemDefinition[] = [
  BOMB_SMOKE, BOMB_ALCHEMIST_FIRE, BOMB_ACID, BOMB_FROST,
  BOMB_THUNDER, BOMB_DRAGON_BREATH
];

export const EXPANSION_FOOD: ItemDefinition[] = [
  FOOD_DRIED_MEAT, FOOD_CHEESE, FOOD_APPLE, FOOD_STEW,
  FOOD_DWARVEN_ALE, FOOD_ELVEN_WINE
];

export const EXPANSION_MATERIALS: ItemDefinition[] = [
  MATERIAL_COPPER_ORE, MATERIAL_TIN_ORE, MATERIAL_SILVER_ORE, MATERIAL_GOLD_ORE,
  MATERIAL_ADAMANTINE, MATERIAL_MOONSTONE, MATERIAL_RUBY, MATERIAL_SAPPHIRE,
  MATERIAL_EMERALD, MATERIAL_DIAMOND, MATERIAL_ARCANE_CRYSTAL,
  MATERIAL_DEMON_BLOOD, MATERIAL_PHOENIX_FEATHER, MATERIAL_UNICORN_HORN,
  MATERIAL_DRAGON_SCALE, MATERIAL_DRAGON_HEART, MATERIAL_VOID_ESSENCE
];

export const ALL_EXPANSION_ITEMS: ItemDefinition[] = [
  ...EXPANSION_WEAPONS,
  ...EXPANSION_ARMORS,
  ...EXPANSION_ACCESSORIES,
  ...EXPANSION_POTIONS,
  ...EXPANSION_SCROLLS,
  ...EXPANSION_BOMBS,
  ...EXPANSION_FOOD,
  ...EXPANSION_MATERIALS
];
