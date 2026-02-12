// ============================================================
// MINAGE - Extraction de Minerais et Gemmes
// ============================================================

import type { Profession } from '../index';

export const MINING: Profession = {
  id: 'mining',
  name: 'Minage',
  category: 'gather',
  description: 'L\'art d\'extraire les richesses enfouies de la terre : minerais, gemmes et cristaux rares.',
  lore_background: `Les Mineurs d'Aethelgard sont une caste respectée et redoutée. Les mines de Bastion-de-Fer plongent à 3 kilomètres sous terre, où des veines de mithril côtoient des créatures oubliées. La Guilde des Mineurs garde jalousement ses cartes de filons, et les prospecteurs indépendants risquent leur vie dans des grottes inexplorées. On raconte que certaines gemmes anciennes contiennent des esprits prisonniers depuis l'Ère des Dragons.`,
  
  primary_stat: 'strength',
  secondary_stat: 'constitution',
  
  starting_tools: [
    { itemId: 'pickaxe_iron', quantity: 1 },
    { itemId: 'mining_helmet_lantern', quantity: 1 },
    { itemId: 'ore_sack', quantity: 1 },
    { itemId: 'chisel', quantity: 1 }
  ],
  
  ranks: [
    {
      level: 1,
      title: 'Mineur Novice',
      xp_required: 0,
      recipes_unlocked: [], // Gather, pas craft
      passive_bonuses: [
        'Détecter veines de minerai commun (5m)',
        'Extraire minerais basiques (Cuivre, Fer)',
        'Résistance fatigue +2'
      ]
    },
    {
      level: 5,
      title: 'Mineur Expérimenté',
      xp_required: 500,
      recipes_unlocked: [],
      passive_bonuses: [
        'Détecter veines rares (10m)',
        'Extraire Argent, Or, Mithril',
        'Vision dans le noir (6m)',
        '+25% quantité minerai extrait'
      ]
    },
    {
      level: 10,
      title: 'Maître Mineur',
      xp_required: 2000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Détecter gemmes et cristaux magiques (15m)',
        'Extraire Adamantine, Orichalque',
        'Vision dans le noir (18m)',
        '+50% quantité, Qualité gemmes +1 tier',
        'Chance découvrir filon secret (10%)'
      ],
      special_ability: 'Résonance Tellurique : Sentir structure souterraine (tunnels, grottes, dangers) dans 30m radius'
    },
    {
      level: 15,
      title: 'Seigneur des Profondeurs',
      xp_required: 5000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Détecter TOUTES ressources souterraines (30m)',
        'Extraire Dragonglass, Starmetal',
        'Tremorsense (détection vibrations sol 18m)',
        '+100% quantité, Qualité gemmes +2 tiers',
        '25% trouver filon légendaire'
      ],
      special_ability: 'Cœur de la Montagne : Communion avec l\'esprit de la montagne (révèle carte complète niveau minier, 1/arc)'
    }
  ],
  
  recipes: [], // Pas de craft, seulement extraction optimisée
  
  specializations: [
    {
      id: 'gemcutter',
      name: 'Tailleur de Gemmes',
      description: 'Expert en extraction/taille de gemmes. Gemmes extraites ont qualité supérieure, peuvent être serties.',
      unlock_level: 8,
      bonus_effects: [
        'Gemmes extraites : Qualité +2 (Ex: Bon → Excellent → Parfait)',
        'Peut tailler gemmes pour sertissage (armes/armures +propriétés)',
        'Identifier gemmes magiques instantanément',
        'Chance 15% : Gemme extraite contient enchantement aléatoire'
      ]
    },
    {
      id: 'deepdelver',
      name: 'Explorateur des Profondeurs',
      description: 'Spécialisé dans mines dangereuses. Résiste dangers souterrains, trouve filons anciens.',
      unlock_level: 8,
      bonus_effects: [
        'Immunité gaz toxiques/asphyxie (4h)',
        'Détection éboulements imminents (précognition 6 secondes)',
        'Vitesse déplacement souterrain +50%',
        'Accès mines abandonnées/ruines naines (filons légendaires)'
      ]
    },
    {
      id: 'metalshaper',
      name: 'Forgeur de Métal Brut',
      description: 'Peut fondre/purifier minerais sur place. Crée lingots haute pureté (+20% valeur).',
      unlock_level: 10,
      bonus_effects: [
        'Forge portative : Fondre minerais en lingots sur terrain',
        'Lingots pureté supérieure (+20% valeur, +10% qualité craft)',
        'Alliages de terrain : Mélanger 2 métaux pour alliage unique',
        'Synergy Blacksmithing : Réparation équipement minier instantanée'
      ]
    }
  ],
  
  synergies_with: ['blacksmithing', 'jewelcrafting', 'engineering'],
  
  faction_reputation: [
    { factionId: 'guilde_mineurs', bonus_per_rank: 12 },
    { factionId: 'clans_nordiques', bonus_per_rank: 6 },
    { factionId: 'nains_montagnes', bonus_per_rank: 8 }
  ]
};

// ============================================================
// MINERAIS & GEMMES EXTRACTIBLES
// ============================================================

export interface MiningNode {
  id: string;
  name: string;
  level_required: number;
  found_in: string[]; // Biomes/zones
  yield_range: [number, number];
  extraction_time_seconds: number;
  difficulty_dc: number;
  special_conditions?: string;
  lore_description: string;
}

export const MINING_NODES: MiningNode[] = [
  // Niveau 1-4
  {
    id: 'copper_vein',
    name: 'Veine de Cuivre',
    level_required: 1,
    found_in: ['Collines', 'Montagnes Basses', 'Grottes Côtières'],
    yield_range: [3, 8],
    extraction_time_seconds: 30,
    difficulty_dc: 10,
    lore_description: 'Un filon de cuivre rougeâtre affleure la roche. Facile à extraire, c\'est le premier métal que tout mineur apprend à reconnaître.'
  },
  {
    id: 'iron_deposit',
    name: 'Gisement de Fer',
    level_required: 1,
    found_in: ['Montagnes', 'Mines Abandonnées', 'Canyons'],
    yield_range: [2, 6],
    extraction_time_seconds: 45,
    difficulty_dc: 12,
    lore_description: 'Une bande de minerai noir et lourd traverse la paroi. Le fer d\'Aethelgard est réputé pour sa robustesse.'
  },
  {
    id: 'coal_seam',
    name: 'Veine de Charbon',
    level_required: 1,
    found_in: ['Grottes', 'Anciennes Forêts Pétrifiées', 'Marais Fossilisés'],
    yield_range: [5, 12],
    extraction_time_seconds: 20,
    difficulty_dc: 8,
    lore_description: 'Une strate noire et friable, vestige d\'arbres millénaires compressés sous la terre. Brûle longtemps et fort.'
  },
  
  // Niveau 5-9
  {
    id: 'silver_vein',
    name: 'Filon d\'Argent',
    level_required: 5,
    found_in: ['Mines Nordiques', 'Grottes de Cristal', 'Ruines Naines'],
    yield_range: [2, 5],
    extraction_time_seconds: 60,
    difficulty_dc: 15,
    lore_description: 'Des filaments argentés serpentent dans le quartz. L\'argent d\'Aethelgard est béni par les prêtres lunaires pour repousser les morts-vivants.'
  },
  {
    id: 'gold_nugget',
    name: 'Pépites d\'Or',
    level_required: 5,
    found_in: ['Rivières Souterraines', 'Grottes Volcaniques', 'Anciennes Mines Royales'],
    yield_range: [1, 3],
    extraction_time_seconds: 90,
    difficulty_dc: 16,
    lore_description: 'Des éclats dorés brillent dans le sable noir. L\'or pur est rare ; ces pépites sont plus précieuses que des lingots forgés.'
  },
  {
    id: 'sapphire_cluster',
    name: 'Grappe de Saphirs',
    level_required: 6,
    found_in: ['Grottes de Glace', 'Monts Givrés', 'Geysers Cristallins'],
    yield_range: [1, 4],
    extraction_time_seconds: 120,
    difficulty_dc: 18,
    special_conditions: 'Température sous 0°C',
    lore_description: 'Des cristaux bleus glacés incrustés dans la roche gelée. Les saphirs de Bastion-de-Fer sont réputés pour capturer la lumière stellaire.'
  },
  
  // Niveau 10-14
  {
    id: 'mithril_vein',
    name: 'Veine de Mithril',
    level_required: 10,
    found_in: ['Profondeurs Naines', 'Cœur des Montagnes', 'Ruines de l\'Ère Ancienne'],
    yield_range: [1, 3],
    extraction_time_seconds: 180,
    difficulty_dc: 20,
    special_conditions: 'Sous 1000m de profondeur',
    lore_description: 'Un métal argenté-bleuté qui semble émettre sa propre lueur. Léger comme la plume, dur comme le diamant. Les Nains l\'appellent "Cadeau des Dieux de la Forge".'
  },
  {
    id: 'adamantine_ore',
    name: 'Minerai d\'Adamantine',
    level_required: 12,
    found_in: ['Noyau Volcanique', 'Météorites Enfouies', 'Champs de Bataille Divins'],
    yield_range: [1, 2],
    extraction_time_seconds: 300,
    difficulty_dc: 23,
    special_conditions: 'Température >1000°C ou Site de Pouvoir Ancien',
    lore_description: 'Un métal vert-noir d\'une densité incroyable, forgé dans les fournaises des dieux. Presque indestructible. L\'extraire sans outils magiques est quasi-impossible.'
  },
  {
    id: 'ruby_heart',
    name: 'Cœur de Rubis',
    level_required: 11,
    found_in: ['Volcans Actifs', 'Lairs de Dragons Rouges', 'Temples du Dieu-Feu'],
    yield_range: [1, 1],
    extraction_time_seconds: 240,
    difficulty_dc: 22,
    special_conditions: 'Proximité magma actif',
    lore_description: 'Une gemme pulsant d\'une lueur rouge sang, chaude au toucher. Les rubis majeurs sont dit contenir une étincelle de feu primordial. Certains murmurent qu\'ils sont des larmes cristallisées de dragons morts.'
  },
  
  // Niveau 15+ - Légendaire
  {
    id: 'starmetal_fragment',
    name: 'Fragment de Métal Stellaire',
    level_required: 15,
    found_in: ['Cratères de Météorites', 'Observatoires Célestes', 'Pics au-delà des Nuages'],
    yield_range: [1, 1],
    extraction_time_seconds: 600,
    difficulty_dc: 25,
    special_conditions: 'Uniquement nuit sans lune, sous les étoiles',
    lore_description: 'Un métal iridescent tombé du ciel, probablement lors de la Pluie d\'Étoiles il y a 1000 ans. Froid au toucher, il vibre légèrement. Ceux qui le portent disent entendre des chansons stellaires dans leurs rêves.'
  },
  {
    id: 'dragonglass_pure',
    name: 'Verre de Dragon Pur',
    level_required: 15,
    found_in: ['Lairs de Dragons Anciens', 'Éruptions Volcaniques Magiques', 'Champs de Bataille Draconiques'],
    yield_range: [1, 2],
    extraction_time_seconds: 480,
    difficulty_dc: 26,
    special_conditions: 'Zone imprégnée magie draconique',
    lore_description: 'Obsidienne translucide formée par le souffle fusionné de dragons en combat mortel. Tranchant comme mille lames, impossible à briser. Les armes en verre de dragon peuvent trancher la magie elle-même.'
  },
  {
    id: 'philosophers_ore',
    name: 'Minerai du Philosophe',
    level_required: 18,
    found_in: ['Nexus Alchimiques', 'Ruines de Grands Alchimistes', 'Laboratoires Interdits'],
    yield_range: [1, 1],
    extraction_time_seconds: 900,
    difficulty_dc: 28,
    special_conditions: 'Transmutation alchimique active à proximité',
    lore_description: 'Un cristal opalescent qui change de couleur selon l\'angle. La matière première de la Pierre Philosophale. Extraire ce minerai sans le corrompre requiert un rituel alchimique de 3 jours.'
  }
];
