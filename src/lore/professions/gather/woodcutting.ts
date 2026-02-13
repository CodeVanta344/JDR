// ============================================================
// BÛCHERONNAGE - Abattage et Récolte de Bois
// ============================================================

import type { Profession } from '../index';

export const WOODCUTTING: Profession = {
  id: 'woodcutting',
  name: 'Bûcheronnage',
  category: 'gather',
  description: 'L\'art robuste d\'abattre les arbres et de récolter le bois, de l\'érable commun aux arbres anciens.',
  lore_background: `Les Bûcherons d'Aethelgard sont une confrérie respectée et redoutée. Dans la Forêt Millénaire, ils négocient avec les Druides pour chaque arbre abattu, plantant trois semis en échange. Les Bûcherons Nordiques affrontent des arbres de 50 mètres dans des blizzards glacés. Mais les plus révérés sont les Gardiens de Forêt - ceux qui récoltent uniquement bois mort et arbres malades, préservant l'équilibre naturel. La Guilde des Bûcherons enseigne que chaque arbre a une chanson, et qu'écouter avant d'abattre honore son esprit.`,
  
  primary_stat: 'strength',
  secondary_stat: 'constitution',
  
  starting_tools: [
    { itemId: 'axe_steel', quantity: 1 },
    { itemId: 'saw_twohand', quantity: 1 },
    { itemId: 'rope_thick', quantity: 20 },
    { itemId: 'wedges_iron', quantity: 5 }
  ],
  
  ranks: [
    {
      level: 1,
      title: 'Bûcheron Novice',
      xp_required: 0,
      recipes_unlocked: [],
      passive_bonuses: [
        'Abattre arbres communs (chênes, pins, érables)',
        'Identifier qualité bois (grain, nœuds, humidité)',
        'Endurance physique +2'
      ]
    },
    {
      level: 5,
      title: 'Bûcheron Expérimenté',
      xp_required: 1000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Abattre arbres rares et durs (ébène, teck, acajou)',
        'Chute contrôlée : Diriger sens de chute précisément',
        'Force de travail : Porter charges lourdes sans fatigue',
        '+25% rendement bois utilisable'
      ]
    },
    {
      level: 10,
      title: 'Maître Bûcheron',
      xp_required: 5000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Abattre arbres magiques et anciens',
        'Communion sylvestre : Sentir santé/âge arbres',
        'Frappe parfaite : Un coup = débiter section complète',
        '+50% rendement, Qualité bois +1 grade',
        '20% chance : Découvrir nœud magique dans bois'
      ],
      special_ability: 'Résonance de la Forêt : Connaître position/état tous arbres dans 100m (1/jour)'
    },
    {
      level: 15,
      title: 'Gardien Sylvestre',
      xp_required: 15000,
      recipes_unlocked: [],
      passive_bonuses: [
        'Abattre fragments d\'Arbre-Monde sans tuer l\'arbre',
        'Parler avec arbres (obtenir consentement/histoires)',
        'Régénération forestière : Arbres coupés repoussent en 1 an',
        '+100% rendement, Qualité +2 grades',
        'Bois récolté contient magie résiduelle'
      ],
      special_ability: 'Bénédiction de la Forêt-Mère : Tous arbres dans 1km repoussent instantanément (1/arc)'
    }
  ],
  
  recipes: [],
  
  specializations: [
    {
      id: 'lumberjack',
      name: 'Bûcheron de Force',
      description: 'Spécialisé dans volume et rapidité. Abat arbres 3x plus vite, gère bois massifs.',
      unlock_level: 8,
      bonus_effects: [
        'Force titanesque : Abattre arbres géants seul (normalement nécessite équipe)',
        'Efficacité extrême : Temps d\'abattage divisé par 3',
        'Porter charges impossibles : 2x capacité transport',
        'Synergy Carpentry : Bois débité en planches directement sur terrain'
      ]
    },
    {
      id: 'forest_guardian',
      name: 'Gardien de Forêt',
      description: 'Protecteur de l\'équilibre naturel. Récolte durable, communique avec esprits forestiers.',
      unlock_level: 8,
      bonus_effects: [
        'Récolte éthique : Ne couper que bois mort/malade = +100% réputation Druides',
        'Esprit de la forêt : Arbres révèlent secrets (caches, dangers, trésors)',
        'Croissance accélérée : Arbres plantés poussent 10x plus vite',
        'Immunité totale aux attaques de créatures forestières (pacifiste)'
      ]
    },
    {
      id: 'ancient_harvester',
      name: 'Récolteur de Bois Ancien',
      description: 'Expert en arbres millénaires et magiques. Récolte bois légendaire sans corrompre magie.',
      unlock_level: 10,
      bonus_effects: [
        'Détection bois ancien : Sentir arbres magiques/millénaires dans 500m',
        'Préservation magique : Bois garde propriétés magiques après coupe',
        'Négociation arboréenne : Obtenir permission esprits d\'arbres (évite malédictions)',
        'Synergy Wandmaking : Bois ancien = baguettes/bâtons légendaires'
      ]
    }
  ],
  
  synergies_with: ['carpentry', 'engineering', 'construction'],
  
  faction_reputation: [
    { factionId: 'guilde_bucherons', bonus_per_rank: 12 },
    { factionId: 'druides_foret', bonus_per_rank: 8 },
    { factionId: 'charpentiers_royaux', bonus_per_rank: 6 }
  ]
};

// ============================================================
// ZONES FORESTIÈRES & TYPES DE BOIS
// ============================================================

export interface WoodSource {
  id: string;
  name: string;
  level_required: number;
  found_in: string[];
  yield_logs: [number, number];
  cutting_time_minutes: number;
  difficulty_dc: number;
  special_conditions?: string;
  wood_properties: string[];
  lore_description: string;
}

export const WOOD_SOURCES: WoodSource[] = [
  // Niveau 1-4
  {
    id: 'common_oak',
    name: 'Chêne Commun',
    level_required: 1,
    found_in: ['Forêts Tempérées', 'Plaines Boisées', 'Parcs Urbains'],
    yield_logs: [15, 30],
    cutting_time_minutes: 45,
    difficulty_dc: 8,
    wood_properties: ['Robuste', 'Polyvalent', 'Bonne combustion'],
    lore_description: 'Arbre noble et répandu. Bois dense et durable. Le chêne d\'Aethelgard fournit poutres de maisons, planches de navires, tonneaux de vin. Symbole de force et longévité.'
  },
  {
    id: 'pine_tree',
    name: 'Pin Sylvestre',
    level_required: 1,
    found_in: ['Forêts Nordiques', 'Montagnes Basses', 'Terres Froides'],
    yield_logs: [20, 40],
    cutting_time_minutes: 30,
    difficulty_dc: 6,
    wood_properties: ['Léger', 'Résineux', 'Facile à travailler'],
    lore_description: 'Conifère abondant aux aiguilles persistantes. Bois tendre idéal pour charpentes et feu. Son parfum résineux imprègne cabanes nordiques. Pousse vite, ressource durable.'
  },
  {
    id: 'birch_grove',
    name: 'Bouleau Argenté',
    level_required: 2,
    found_in: ['Clairières', 'Lisières Forestières', 'Berges Rivières'],
    yield_logs: [12, 25],
    cutting_time_minutes: 40,
    difficulty_dc: 10,
    wood_properties: ['Écorce décorative', 'Bois pâle', 'Flexible'],
    lore_description: 'Arbre élégant à écorce blanche papyracée. Bois utilisé en ébénisterie fine. Écorce imperméable sert de parchemin naturel. Druides gravent runes sur écorce de bouleau.'
  },

  // Niveau 5-9
  {
    id: 'ironwood_tree',
    name: 'Bois-de-Fer',
    level_required: 5,
    found_in: ['Forêts Anciennes', 'Jungles Épaisses', 'Régions Magiques'],
    yield_logs: [8, 15],
    cutting_time_minutes: 90,
    difficulty_dc: 16,
    wood_properties: ['Extrêmement dense', 'Résistant au feu', 'Presque indestructible'],
    lore_description: 'Arbre légendaire au bois plus dur que l\'acier. Abattre un Bois-de-Fer émousse haches ordinaires. Utilisé pour portes de forteresses et boucliers. Les Elfes en font arcs de guerre incassables.'
  },
  {
    id: 'ebony_tree',
    name: 'Ébène Noire',
    level_required: 6,
    found_in: ['Jungles Tropicales', 'Îles Lointaines', 'Forêts Mystiques'],
    yield_logs: [5, 12],
    cutting_time_minutes: 120,
    difficulty_dc: 18,
    wood_properties: ['Noir profond', 'Grain fin', 'Grande valeur'],
    lore_description: 'Bois précieux noir comme minuit. Croissance extrêmement lente (200 ans pour maturité). Sculpté en sceptres royaux et instruments de musique. Interdit d\'exportation dans certains royaumes.'
  },
  {
    id: 'silverleaf_willow',
    name: 'Saule Argenté',
    level_required: 7,
    found_in: ['Berges Enchantées', 'Marais Féeriques', 'Lieux de Pouvoir'],
    yield_logs: [10, 20],
    cutting_time_minutes: 60,
    difficulty_dc: 15,
    special_conditions: 'Permission des esprits d\'eau recommandée',
    wood_properties: ['Flexible', 'Conducteur magique', 'Argenté'],
    lore_description: 'Saule pleureur aux feuilles scintillantes. Bois utilisé pour baguettes magiques et harpes elfiques. Ses branches ploient sans casser. Les Fées tressent ses rameaux en couronnes.'
  },

  // Niveau 10-14
  {
    id: 'dragonthorn_tree',
    name: 'Épine-Dragon',
    level_required: 10,
    found_in: ['Lairs Draconiques', 'Montagnes Volcaniques', 'Terres Brûlées'],
    yield_logs: [4, 10],
    cutting_time_minutes: 180,
    difficulty_dc: 22,
    special_conditions: 'Résistance feu requise - arbre brûle intérieur',
    wood_properties: ['Ignifugé', 'Épineux', 'Conducteur feu magique'],
    lore_description: 'Arbre tordu poussant sur territoires draconiques. Bois noir rougeoyant, chaud au toucher. Résiste flammes de dragons. Forgé en lances anti-dragon. Coupe dangereuse - sève brûlante comme magma.'
  },
  {
    id: 'moonwood_elder',
    name: 'Bois-Lunaire Ancien',
    level_required: 11,
    found_in: ['Forêts Enchantées', 'Clairières Sacrées', 'Nexus Lunaires'],
    yield_logs: [3, 8],
    cutting_time_minutes: 150,
    difficulty_dc: 20,
    special_conditions: 'Ne couper que sous pleine lune',
    wood_properties: ['Bioluminescent', 'Magie lunaire', 'Argenté-bleu'],
    lore_description: 'Arbre mystique qui absorbe lumière lunaire. Bois brille doucement dans l\'obscurité. Utilisé pour arcs elfiques et bâtons de mages lunaires. Couper en nouvelle lune = malédiction garantie.'
  },
  {
    id: 'ancient_mahogany',
    name: 'Acajou Millénaire',
    level_required: 12,
    found_in: ['Jungles Primordiales', 'Îles Perdues', 'Forêts Vierges'],
    yield_logs: [6, 15],
    cutting_time_minutes: 240,
    difficulty_dc: 21,
    special_conditions: 'Arbre protégé - permis spécial requis',
    wood_properties: ['Rouge profond', 'Grain magnifique', 'Inestimable'],
    lore_description: 'Colosse de 40m datant Ère Ancienne. Bois rouge sang au grain hypnotique. Un seul arbre vaut fortune royale. Abattre sans permission = crime capital. Meubles en acajou millénaire = trésors nationaux.'
  },

  // Niveau 15+ - Légendaire
  {
    id: 'world_tree_branch',
    name: 'Branche d\'Arbre-Monde',
    level_required: 15,
    found_in: ['Yggdrasil', 'Nexus Planaires', 'Cœur de la Forêt Éternelle'],
    yield_logs: [1, 3],
    cutting_time_minutes: 480,
    difficulty_dc: 28,
    special_conditions: 'Permission des Archidruides OBLIGATOIRE',
    wood_properties: ['Relie les plans', 'Magie primordiale', 'Vivant'],
    lore_description: 'Fragment de l\'Arbre-Monde qui connecte tous les plans d\'existence. Bois vivant qui continue pousser après coupe. Utilisé pour portails permanents entre mondes. Couper sans permission = guerre avec Druides Anciens.'
  },
  {
    id: 'starfall_wood',
    name: 'Bois d\'Étoile Filante',
    level_required: 16,
    found_in: ['Cratères de Météorites', 'Forêts Touchées par le Ciel'],
    yield_logs: [1, 2],
    cutting_time_minutes: 360,
    difficulty_dc: 26,
    special_conditions: 'Pousse uniquement où météorite a frappé',
    wood_properties: ['Iridescent', 'Magie stellaire', 'Froid céleste'],
    lore_description: 'Arbre muté par impact météorite. Bois scintille de lumière stellaire. Froid au toucher même au feu. Forge baguettes qui canalisent magie cosmique. Extrêmement rare - peut-être 10 arbres dans tout Aethelgard.'
  },
  {
    id: 'phoenix_ash_tree',
    name: 'Frêne du Phénix',
    level_required: 18,
    found_in: ['Cendres de Phénix Ancestral', 'Volcans Sacrés'],
    yield_logs: [1, 1],
    cutting_time_minutes: 600,
    difficulty_dc: 30,
    special_conditions: 'Arbre renaît de ses cendres tous les 100 ans',
    wood_properties: ['Résurrection', 'Feu éternel', 'Rouge-or'],
    lore_description: 'Arbre légendaire né des cendres d\'un Phénix Primordial. Bois brûle éternellement sans se consumer. Fragment utilisé comme focus pour sorts de résurrection. Coupable de destruction complète = chasse par Ordre des Flammes Éternelles.'
  }
];
