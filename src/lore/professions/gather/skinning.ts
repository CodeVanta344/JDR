// ============================================================
// DÉPEÇAGE - Récolte de Peaux et Écailles
// ============================================================

import type { Profession } from '../index';

export const SKINNING: Profession = {
  id: 'skinning',
  name: 'Dépeçage',
  category: 'gather',
  description: 'L\'art précis de prélever peaux, cuirs, écailles et fourrures sur les créatures chassées.',
  lore_background: `Les Dépeçeurs d'Aethelgard sont respectés pour leur expertise chirurgicale. Un Maître Dépeçeur peut extraire peau d'un dragon sans endommager une seule écaille. La Guilde des Tanneurs paie fortune pour cuirs de qualité supérieure. Les Chasseurs de Dragons sont legends vivantes - leurs capes d'écailles draconiques les rendent quasi-invulnérables. Le Code du Dépeçeur enseigne : "Ne gaspille rien. Chaque créature morte doit servir." Les Récupérateurs peuvent transformer carcasse de griffon en 50 produits différents.`,
  
  primary_stat: 'dexterity',
  secondary_stat: 'strength',
  
  starting_tools: [
    { itemId: 'skinning_knife_sharp', quantity: 1 },
    { itemId: 'scraper_bone', quantity: 1 },
    { itemId: 'salt_preservation', quantity: 10 },
    { itemId: 'leather_roll', quantity: 5 }
  ],
  
  ranks: [
    {
      level: 1,
      title: 'Dépeçeur Novice',
      xp_required: 0,
      recipes_unlocked: [],
      passive_bonuses: [
        'Dépecer animaux communs (lapins, cerfs, loups)',
        'Identifier qualité peaux/fourrures',
        'Connaissance anatomie basique'
      ]
    },
    {
      level: 5,
      title: 'Dépeçeur Expérimenté',
      xp_required: 1000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Dépecer prédateurs et créatures résistantes',
        'Extraction parfaite : Aucun dommage aux peaux',
        'Prélèvement organes : Cœurs, glandes, griffes',
        '+25% rendement matériaux récoltés'
      ]
    },
    {
      level: 10,
      title: 'Maître Dépeçeur',
      xp_required: 5000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Dépecer créatures magiques (griffons, chimères)',
        'Préservation magique : Peaux gardent propriétés',
        'Dépeçage rapide : 50% temps en moins',
        '+50% rendement, Qualité cuir +1 grade',
        '20% chance : Composant rare additionnel'
      ],
      special_ability: 'Dissection Parfaite : Extraire TOUS composants utilisables, rien gaspillé (1/jour)'
    },
    {
      level: 15,
      title: 'Légende Vivante',
      xp_required: 15000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Dépecer dragons, phénix, créatures légendaires',
        'Maître anatomiste : Connaît point faible toute créature',
        'Récolte dimensionnelle : Stocker peaux sans poids',
        '+100% rendement, Qualité +2 grades',
        'Peaux récoltées deviennent objets magiques mineurs'
      ],
      special_ability: 'Essence Vitale : Extraire âme-cristal de créature (1 usage/composant résurrection, 1/arc)'
    }
  ],
  
  recipes: [],
  
  specializations: [
    {
      id: 'expert_skinner',
      name: 'Dépeçeur Expert',
      description: 'Virtuose du couteau. Extrait peaux parfaites en temps record, maximise rendement.',
      unlock_level: 8,
      bonus_effects: [
        'Perfection absolue : Toutes peaux qualité "Parfaite"',
        'Vitesse prodigieuse : Dépecer créature en 30 secondes',
        'Multi-prélèvement : Extraire peau + 5 organes simultanément',
        'Synergy Leatherworking : Cuirs travaillés → +30% durabilité'
      ]
    },
    {
      id: 'dragon_hunter',
      name: 'Chasseur de Dragons',
      description: 'Spécialisé dans dépeçage draconique. Maître des écailles, griffes, crocs de dragons.',
      unlock_level: 10,
      bonus_effects: [
        'Anatomie draconique : Localiser glande de souffle, cœur dragonique',
        'Écailles préservées : Gardent résistance élémentaire (feu, glace, etc.)',
        'Sang de dragon : Récolter sans contamination (ingrédient alchimique majeur)',
        'Synergy Blacksmithing : Écailles de dragon → Armures légendaires'
      ]
    },
    {
      id: 'salvager',
      name: 'Récupérateur Absolu',
      description: 'Rien n\'est gaspillé. Transforme chaque partie de créature en produit vendable.',
      unlock_level: 8,
      bonus_effects: [
        'Récolte totale : Os, tendons, glandes, yeux, dents, cornes, sabots...',
        'Transmutation : Déchets animaux → Composants alchimiques',
        'Efficacité maximale : 300% valeur totale par carcasse',
        'Synergy Alchemy : Organes rares → Potions exotiques'
      ]
    }
  ],
  
  synergies_with: ['leatherworking', 'alchemy', 'hunting'],
  
  faction_reputation: [
    { factionId: 'guilde_tanneurs', bonus_per_rank: 12 },
    { factionId: 'chasseurs_monstres', bonus_per_rank: 10 },
    { factionId: 'alchimistes_anatomistes', bonus_per_rank: 8 }
  ]
};

// ============================================================
// CRÉATURES DÉPEÇABLES & MATÉRIAUX
// ============================================================

export interface SkinningTarget {
  id: string;
  name: string;
  level_required: number;
  creature_type: string;
  skinning_time_minutes: number;
  difficulty_dc: number;
  materials_obtained: string[];
  special_conditions?: string;
  material_value: number;
  lore_description: string;
}

export const SKINNING_TARGETS: SkinningTarget[] = [
  // Niveau 1-4
  {
    id: 'rabbit_pelt',
    name: 'Peau de Lapin',
    level_required: 1,
    creature_type: 'Petit mammifère',
    skinning_time_minutes: 5,
    difficulty_dc: 8,
    materials_obtained: ['Fourrure douce', 'Petite peau', 'Viande'],
    material_value: 2,
    lore_description: 'Fourrure douce et légère. Utilisée pour doublures de vêtements et peluches pour enfants. Facile à travailler, idéal pour apprentissage.'
  },
  {
    id: 'wolf_hide',
    name: 'Peau de Loup',
    level_required: 3,
    creature_type: 'Prédateur',
    skinning_time_minutes: 20,
    difficulty_dc: 12,
    materials_obtained: ['Fourrure épaisse', 'Griffes', 'Crocs', 'Cuir résistant'],
    material_value: 15,
    lore_description: 'Fourrure grise dense et chaude. Crocs et griffes prisés comme trophées. Cuir résistant pour armures légères. Cape de loup = symbole guerrier nordique.'
  },
  {
    id: 'deer_leather',
    name: 'Cuir de Cerf',
    level_required: 2,
    creature_type: 'Herbivore',
    skinning_time_minutes: 30,
    difficulty_dc: 10,
    materials_obtained: ['Cuir souple', 'Bois (cornes)', 'Tendons', 'Sabots'],
    material_value: 20,
    lore_description: 'Cuir souple de qualité supérieure. Bois sculptés en poignées d\'armes. Tendons utilisés pour cordes d\'arc. Les sabots portent chance selon tradition.'
  },

  // Niveau 5-9
  {
    id: 'bear_hide',
    name: 'Peau d\'Ours',
    level_required: 5,
    creature_type: 'Grand prédateur',
    skinning_time_minutes: 60,
    difficulty_dc: 16,
    materials_obtained: ['Fourrure massive', 'Griffes énormes', 'Graisse', 'Cuir épais'],
    material_value: 80,
    lore_description: 'Fourrure épaisse isolant du froid extrême. Griffes de 10cm utilisées comme armes primitives. Graisse d\'ours = baume cicatrisant. Cape d\'ours = statut chef barbare.'
  },
  {
    id: 'giant_serpent_scales',
    name: 'Écailles de Serpent Géant',
    level_required: 6,
    creature_type: 'Reptile magique',
    skinning_time_minutes: 45,
    difficulty_dc: 17,
    materials_obtained: ['Écailles vertes', 'Venin', 'Peau flexible', 'Crocs venimeux'],
    material_value: 120,
    lore_description: 'Écailles brillantes résistantes aux lames. Venin mortel prisé par assassins. Peau tannée devient cuir exotique pour armures de roguesse. Crocs montés en dagues cérémonielles.'
  },
  {
    id: 'wyvern_hide',
    name: 'Peau de Vouivre',
    level_required: 7,
    creature_type: 'Dragon mineur',
    skinning_time_minutes: 90,
    difficulty_dc: 18,
    materials_obtained: ['Écailles draconiques', 'Membrane alaire', 'Dard venimeux', 'Cuir résistant'],
    material_value: 300,
    lore_description: 'Cousin mineur des dragons. Écailles moins robustes mais plus flexibles. Membranes alaires transparentes utilisées pour vitraux magiques. Dard contient poison paralysant puissant.'
  },

  // Niveau 10-14
  {
    id: 'griffon_pelt',
    name: 'Peau de Griffon',
    level_required: 10,
    creature_type: 'Créature magique',
    skinning_time_minutes: 120,
    difficulty_dc: 22,
    materials_obtained: ['Plumes dorées', 'Fourrure léonine', 'Serres', 'Bec acéré'],
    material_value: 1000,
    lore_description: 'Hybride lion-aigle. Plumes magiques utilisées pour flèches enchantées. Fourrure léonine tannée en cuir noble. Serres forgées en griffes d\'escalade. Bec monté sur heaume = symbole chevalerie.'
  },
  {
    id: 'chimera_hide',
    name: 'Peau de Chimère',
    level_required: 12,
    creature_type: 'Aberration',
    skinning_time_minutes: 180,
    difficulty_dc: 24,
    materials_obtained: ['Écailles de serpent', 'Crinière de lion', 'Peau de chèvre', 'Trois têtes'],
    special_conditions: 'Créature multi-parts - complexe',
    material_value: 2000,
    lore_description: 'Monstre composite cauchemardesque. Chaque partie offre matériaux différents. Écailles résistent acide, crinière au feu, peau aux chocs. Dépecer chimère = test ultime anatomie.'
  },
  {
    id: 'white_dragon_wyrmling',
    name: 'Écailles de Dragonnet Blanc',
    level_required: 11,
    creature_type: 'Jeune dragon',
    skinning_time_minutes: 240,
    difficulty_dc: 21,
    materials_obtained: ['Écailles givrées', 'Glande de souffle glacé', 'Griffes', 'Sang de dragon'],
    special_conditions: 'Résistance au froid requise',
    material_value: 5000,
    lore_description: 'Même juvénile, dragon est trésor. Écailles givrées immunisent contre froid. Glande de souffle = ingrédient potions glace majeures. Sang de dragon = base transmutation alchimique.'
  },

  // Niveau 15+ - Légendaire
  {
    id: 'ancient_red_dragon',
    name: 'Écailles de Dragon Rouge Ancien',
    level_required: 15,
    creature_type: 'Dragon ancestral',
    skinning_time_minutes: 720,
    difficulty_dc: 28,
    materials_obtained: ['Écailles rubis', 'Cœur de dragon', 'Sang draconique pur', 'Griffes titanesques'],
    special_conditions: 'Nécessite équipe de dépeçeurs experts',
    material_value: 100000,
    lore_description: 'Apex prédateur, terreur vivante. Écailles grosses comme boucliers, indestructibles. Cœur de dragon bat pendant 1h après mort. Sang brûle comme lave. Armure complète = artefact national.'
  },
  {
    id: 'phoenix_feather',
    name: 'Plumes de Phénix',
    level_required: 16,
    creature_type: 'Immortel',
    skinning_time_minutes: 60,
    difficulty_dc: 26,
    materials_obtained: ['Plumes éternelles', 'Cendres sacrées', 'Larmes cristallisées'],
    special_conditions: 'Seulement durant cycle de renaissance (7 jours)',
    material_value: 50000,
    lore_description: 'Oiseau immortel. Plumes brûlent éternellement sans consumer. Cendres de Phénix = composant résurrection. Larmes guérissent TOUTES blessures. Récolter durant renaissance = sans tuer vraiment.'
  },
  {
    id: 'kraken_tentacle_section',
    name: 'Section de Tentacule de Kraken',
    level_required: 18,
    creature_type: 'Colosse abyssal',
    skinning_time_minutes: 480,
    difficulty_dc: 30,
    materials_obtained: ['Peau caoutchouteuse', 'Ventouses géantes', 'Encre noire', 'Nerfs titanesques'],
    special_conditions: 'Nécessite grue/treuil pour manipuler',
    material_value: 200000,
    lore_description: 'Tentacule de 20m de Kraken légendaire. Peau élastique indestructible. Ventouses collent métal et pierre. Encre obscurcit océan entier. Nerfs tissés = cordes marines incassables. Dépeçage = expédition nationale.'
  }
];
