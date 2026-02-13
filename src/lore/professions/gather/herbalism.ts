// ============================================================
// HERBORISTERIE - Cueillette de Plantes et Herbes
// ============================================================

import type { Profession } from '../index';

export const HERBALISM: Profession = {
  id: 'herbalism',
  name: 'Herboristerie',
  category: 'gather',
  description: 'L\'art de reconnaître et cueillir les plantes médicinales, magiques et toxiques du monde.',
  lore_background: `Les Herboristes d'Aethelgard sont vénérés comme gardiens du savoir ancien. Dans les Bois Murmures, ils récoltent des fleurs qui ne s'ouvrent qu'au clair de lune. Leurs grimoires végétaux sont aussi précieux que des livres de sorts. La Guilde des Herboristes enseigne que chaque plante possède une âme, et que les cueillir sans respect attire la malédiction des esprits sylvestres. Certains Herboristes mystiques prétendent pouvoir communier avec la Forêt-Mère elle-même.`,
  
  primary_stat: 'wisdom',
  secondary_stat: 'intelligence',
  
  starting_tools: [
    { itemId: 'sickle_silver', quantity: 1 },
    { itemId: 'herbalist_pouch', quantity: 1 },
    { itemId: 'plant_guide_basic', quantity: 1 },
    { itemId: 'gloves_leather', quantity: 1 }
  ],
  
  ranks: [
    {
      level: 1,
      title: 'Cueilleur Novice',
      xp_required: 0,
      recipes_unlocked: [],
      passive_bonuses: [
        'Identifier herbes communes (5m)',
        'Cueillir plantes médicinales basiques',
        'Résistance poisons végétaux +2'
      ]
    },
    {
      level: 5,
      title: 'Herboriste Confirmé',
      xp_required: 1000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Identifier plantes rares et toxiques (10m)',
        'Cueillir fleurs magiques et racines anciennes',
        'Vision botanique : Voir auras végétales',
        '+25% quantité récoltée, Qualité +1'
      ]
    },
    {
      level: 10,
      title: 'Maître Herboriste',
      xp_required: 5000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Identifier toutes espèces végétales instantanément',
        'Cueillir plantes légendaires et esprits-plantes',
        'Immunité totale poisons végétaux',
        '+50% quantité, Qualité +2',
        '15% chance : Plante se régénère instantanément'
      ],
      special_ability: 'Chant de Croissance : Accélère pousse plantes (semaine → 1h, rayon 10m, 1/jour)'
    },
    {
      level: 15,
      title: 'Gardien de la Flore',
      xp_required: 15000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Communion avec esprits végétaux (parler aux plantes)',
        'Cueillir fragments d\'Arbre-Monde',
        'Régénération nature : +5 HP/tour en forêt',
        '+100% quantité, Qualité +3',
        '30% chance : Plante offre graines rares'
      ],
      special_ability: 'Éveil de la Forêt : Animer 1d6 arbres/plantes pour combat/assistance (1/arc)'
    }
  ],
  
  recipes: [], // Gathering actions, not crafting
  
  specializations: [
    {
      id: 'botanist',
      name: 'Botaniste Érudit',
      description: 'Expert en classification scientifique. Découvre propriétés cachées des plantes, crée hybrides uniques.',
      unlock_level: 8,
      bonus_effects: [
        'Analyse complète : Révèle TOUTES propriétés plante (médicinales, toxiques, magiques)',
        'Hybridation : Croiser 2 plantes pour créer espèce unique',
        'Grimoire botanique : +50% XP Herbalism par découverte',
        'Peut cultiver plantes rares en serre (temps divisé par 3)'
      ]
    },
    {
      id: 'mystic_herbalist',
      name: 'Herboriste Mystique',
      description: 'Canal entre monde végétal et magique. Plantes récoltées ont propriétés magiques amplifiées.',
      unlock_level: 8,
      bonus_effects: [
        'Cueillette lunaire : Plantes récoltées nuit de pleine lune → Potence magique x2',
        'Bénédiction sylvestre : Plantes donnent buff temporaire (10 min)',
        'Vision des racines : Voir réseaux mycorhiziens (trouver plantes cachées)',
        'Synergy Alchemy : Potions fabriquées avec vos plantes → +30% efficacité'
      ]
    },
    {
      id: 'poison_gatherer',
      name: 'Cueilleur de Poison',
      description: 'Maître des toxines mortelles. Récolte plantes venimeuses sans danger, crée poisons dévastateurs.',
      unlock_level: 10,
      bonus_effects: [
        'Immunité absolue : Tous poisons végétaux, animaux et fongiques',
        'Extraction toxine : Prélever venin pur (dégâts poison +50%)',
        'Jardin mortel : Cultiver plantes toxiques interdites',
        'Synergy Assassination : Poisons appliqués sur armes → Durée x2, DC +5'
      ]
    }
  ],
  
  synergies_with: ['alchemy', 'cooking', 'medicine'],
  
  faction_reputation: [
    { factionId: 'guilde_herboristes', bonus_per_rank: 12 },
    { factionId: 'druides_anciens', bonus_per_rank: 10 },
    { factionId: 'alchimistes_royaux', bonus_per_rank: 6 }
  ]
};

// ============================================================
// PLANTES & HERBES RÉCOLTABLES
// ============================================================

export interface HerbNode {
  id: string;
  name: string;
  level_required: number;
  found_in: string[];
  yield_range: [number, number];
  gathering_time_seconds: number;
  difficulty_dc: number;
  special_conditions?: string;
  properties: string[];
  lore_description: string;
}

export const HERB_NODES: HerbNode[] = [
  // Niveau 1-4
  {
    id: 'common_yarrow',
    name: 'Achillée Millefeuille',
    level_required: 1,
    found_in: ['Prairies', 'Bords de Chemins', 'Champs'],
    yield_range: [3, 8],
    gathering_time_seconds: 15,
    difficulty_dc: 8,
    properties: ['Arrête saignements', 'Cicatrisant léger'],
    lore_description: 'Petites fleurs blanches en ombelles. Le héros Achille l\'utilisait pour soigner ses guerriers. Pousse partout, bénie des dieux de la guerre.'
  },
  {
    id: 'silverleaf',
    name: 'Feuille d\'Argent',
    level_required: 1,
    found_in: ['Forêts Claires', 'Clairières Lumineuses', 'Jardins Sacrés'],
    yield_range: [2, 6],
    gathering_time_seconds: 20,
    difficulty_dc: 10,
    properties: ['Antidote faible', 'Purifie eau'],
    lore_description: 'Feuilles argentées qui captent la lumière lunaire. Les Elfes les tissent dans leurs bannières. Goût amer mais purifiant.'
  },
  {
    id: 'peacebloom',
    name: 'Fleur de Paix',
    level_required: 1,
    found_in: ['Prairies Paisibles', 'Villages', 'Zones Non-Corrompues'],
    yield_range: [4, 10],
    gathering_time_seconds: 10,
    difficulty_dc: 6,
    properties: ['Calme anxiété', 'Sommeil léger'],
    lore_description: 'Petite fleur bleue pâle qui pousse là où règne la paix. Se fane instantanément en présence de violence. Symbole des temps d\'harmonie.'
  },

  // Niveau 5-9
  {
    id: 'ghostcap_mushroom',
    name: 'Champignon Fantôme',
    level_required: 5,
    found_in: ['Forêts Hantées', 'Cimetières Anciens', 'Cryptes'],
    yield_range: [2, 5],
    gathering_time_seconds: 45,
    difficulty_dc: 15,
    special_conditions: 'Nuit uniquement',
    properties: ['Vision spectrale', 'Communion avec morts'],
    lore_description: 'Champignon blanc translucide qui brille d\'une lueur blafarde. Pousse sur tombes oubliées. Permet aux vivants de voir les âmes errantes pendant quelques minutes.'
  },
  {
    id: 'bloodthorn_root',
    name: 'Racine d\'Épine Sanglante',
    level_required: 6,
    found_in: ['Marais Sombres', 'Champs de Bataille', 'Terres Maudites'],
    yield_range: [1, 4],
    gathering_time_seconds: 60,
    difficulty_dc: 16,
    special_conditions: 'Protections contre épines recommandées',
    properties: ['Régénération sang', 'Augmente coagulation'],
    lore_description: 'Plante épineuse rouge sang qui se nourrit de terre imbibée de bataille. Ses racines plongent jusqu\'aux ossements. Extraire sans se blesser est un art.'
  },
  {
    id: 'sungrass',
    name: 'Herbe Solaire',
    level_required: 7,
    found_in: ['Steppes Arides', 'Déserts', 'Plateaux Élevés'],
    yield_range: [2, 6],
    gathering_time_seconds: 30,
    difficulty_dc: 14,
    special_conditions: 'Midi uniquement (soleil au zénith)',
    properties: ['Énergie vitale', 'Résistance chaleur'],
    lore_description: 'Herbes dorées qui suivent la course du soleil. Les nomades du désert les mâchent pour endurer la chaleur. Goût citronné et revigorant.'
  },

  // Niveau 10-14
  {
    id: 'dragons_breath_flower',
    name: 'Fleur de Souffle-Dragon',
    level_required: 10,
    found_in: ['Volcans', 'Lairs de Dragons Rouges', 'Cratères Brûlants'],
    yield_range: [1, 3],
    gathering_time_seconds: 120,
    difficulty_dc: 20,
    special_conditions: 'Résistance au feu requise',
    properties: ['Immunité feu temporaire', 'Ingrédient potions de feu'],
    lore_description: 'Fleur rouge-orange qui pousse dans la lave refroidie. Ses pétales sont chauds au toucher. Les alchimistes paient des fortunes pour cette rareté.'
  },
  {
    id: 'moonpetal',
    name: 'Pétale de Lune',
    level_required: 11,
    found_in: ['Clairières Féeriques', 'Lacs Sacrés', 'Temples Lunaires'],
    yield_range: [1, 2],
    gathering_time_seconds: 90,
    difficulty_dc: 19,
    special_conditions: 'Pleine lune uniquement',
    properties: ['Magie lunaire amplifiée', 'Vision nocturne parfaite'],
    lore_description: 'Fleur argentée éthérée qui n\'apparaît qu\'une nuit par mois. Les pétales se dissolvent à la lumière du jour. Les Druides Lunaires en font des couronnes rituelles.'
  },
  {
    id: 'nightshade_black',
    name: 'Belladone Noire',
    level_required: 12,
    found_in: ['Forêts Corrompues', 'Repaires d\'Assassins', 'Jardins Interdits'],
    yield_range: [1, 4],
    gathering_time_seconds: 75,
    difficulty_dc: 21,
    special_conditions: 'Extrêmement toxique - gants obligatoires',
    properties: ['Poison mortel', 'Paralysie', 'Dilatation pupilles'],
    lore_description: 'Baies noires luisantes d\'une beauté mortelle. Une seule suffit à tuer un homme adulte. Les assassins de la Guilde Noire paient en or pour cette plante.'
  },

  // Niveau 15+ - Légendaire
  {
    id: 'world_tree_sapling',
    name: 'Pousse d\'Arbre-Monde',
    level_required: 15,
    found_in: ['Nexus Naturels', 'Cœur de Forêts Primordiales', 'Sites de Pouvoir Druidique'],
    yield_range: [1, 1],
    gathering_time_seconds: 300,
    difficulty_dc: 25,
    special_conditions: 'Permission des Druides Anciens requise',
    properties: ['Connexion au Réseau Vert', 'Vie éternelle (théorique)'],
    lore_description: 'Fragment d\'Yggdrasil, l\'Arbre-Monde qui relie tous les plans. Planter cette pousse crée un nouveau nexus naturel en 100 ans. Les Druides tuent quiconque en vole sans permission.'
  },
  {
    id: 'phoenix_fern',
    name: 'Fougère du Phénix',
    level_required: 16,
    found_in: ['Cendres de Phénix', 'Volcans Endormis', 'Sites de Renaissance'],
    yield_range: [1, 2],
    gathering_time_seconds: 240,
    difficulty_dc: 26,
    special_conditions: 'Ne pousse que 24h après mort d\'un Phénix',
    properties: ['Résurrection (composant)', 'Régénération majeure'],
    lore_description: 'Fougère rouge-or qui jaillit des cendres d\'un Phénix renaissant. Contient l\'essence de la renaissance éternelle. Un ingrédient clé des rituels de résurrection.'
  },
  {
    id: 'starlight_moss',
    name: 'Mousse Stellaire',
    level_required: 18,
    found_in: ['Pics des Étoiles', 'Météorites', 'Observatoires Célestes'],
    yield_range: [1, 1],
    gathering_time_seconds: 480,
    difficulty_dc: 28,
    special_conditions: 'Nuit sans lune, ciel dégagé',
    properties: ['Magie astrale', 'Clairvoyance cosmique'],
    lore_description: 'Mousse bioluminescente qui absorbe la lumière des étoiles. Murmure des secrets de l\'univers à ceux qui écoutent. Les Astromanciens en font de l\'encre pour leurs grimoires prophétiques.'
  }
];
