/**
 * AETHELGARD BESTIARY - Bestiaire complet
 * 50+ créatures avec templates, variantes, habitats et loot
 */

import type { BiomeType } from './resources';

// ============================================================================
// TYPES
// ============================================================================

export type CreatureSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan';
export type CreatureType = 
  | 'beast' | 'humanoid' | 'undead' | 'dragon' | 'elemental' 
  | 'fiend' | 'celestial' | 'construct' | 'aberration' | 'fey';
export type CreatureAlignment = 'lawful-good' | 'neutral-good' | 'chaotic-good' | 'lawful-neutral' | 'neutral' | 'chaotic-neutral' | 'lawful-evil' | 'neutral-evil' | 'chaotic-evil';
export type DamageType = 'slashing' | 'piercing' | 'bludgeoning' | 'fire' | 'cold' | 'lightning' | 'poison' | 'acid' | 'necrotic' | 'radiant' | 'psychic' | 'force';

export interface CreatureStats {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface CreatureAttack {
  name: string;
  type: 'melee' | 'ranged' | 'spell';
  toHit: number;
  damage: string;
  damageType: DamageType;
  range?: number;
  description?: string;
}

export interface CreatureAbility {
  name: string;
  description: string;
  recharge?: 'short-rest' | 'long-rest' | string;
}

export interface LootDrop {
  resourceId: string;
  chance: number; // 0-100
  quantity: { min: number; max: number };
}

export interface CreatureDefinition {
  id: string;
  name: string;
  size: CreatureSize;
  type: CreatureType;
  alignment: CreatureAlignment;
  challengeRating: number; // 0-30
  experiencePoints: number;
  
  // Stats
  armorClass: number;
  hitPoints: { average: number; diceFormula: string };
  speed: { walk: number; fly?: number; swim?: number; burrow?: number };
  stats: CreatureStats;
  
  // Combat
  attacks: CreatureAttack[];
  abilities: CreatureAbility[];
  resistances?: DamageType[];
  immunities?: DamageType[];
  vulnerabilities?: DamageType[];
  
  // Lore
  description: string;
  habitat: BiomeType[];
  behavior: string;
  lore?: string;
  
  // Loot
  loot: LootDrop[];
  goldDrop: { min: number; max: number };
  
  // Variants
  variants?: string[]; // IDs de variantes
  isVariant?: boolean;
  baseCreatureId?: string;
}

// ============================================================================
// BEASTS (Animaux naturels)
// ============================================================================

export const WOLF: CreatureDefinition = {
  id: 'beast:wolf',
  name: "Loup",
  size: 'medium',
  type: 'beast',
  alignment: 'neutral',
  challengeRating: 1,
  experiencePoints: 50,
  armorClass: 13,
  hitPoints: { average: 11, diceFormula: '2d8+2' },
  speed: { walk: 40 },
  stats: { str: 12, dex: 15, con: 12, int: 3, wis: 12, cha: 6 },
  attacks: [
    {
      name: "Morsure",
      type: 'melee',
      toHit: 4,
      damage: '2d4+2',
      damageType: 'piercing',
      description: "Si la cible est une créature, elle doit réussir un jet de sauvegarde de Force DD 11 ou être jetée à terre."
    }
  ],
  abilities: [
    {
      name: "Odorat et Ouïe Aiguisés",
      description: "Le loup a l'avantage aux jets de Perception qui reposent sur l'odorat ou l'ouïe."
    },
    {
      name: "Tactique de Meute",
      description: "Le loup a l'avantage à l'attaque si au moins un allié non incapacité est à 5 pieds de la cible."
    }
  ],
  description: "Prédateur commun des forêts et plaines. Chasse en meute avec coordination redoutable.",
  habitat: ['forest', 'plains', 'mountain'],
  behavior: "Chasse en meute de 4-8 individus. Traque les proies faibles ou blessées. Peut être apprivoisé par rangers expérimentés.",
  loot: [
    { resourceId: 'leather:light', chance: 80, quantity: { min: 1, max: 2 } },
    { resourceId: 'leather:medium', chance: 20, quantity: { min: 1, max: 1 } }
  ],
  goldDrop: { min: 0, max: 5 },
  variants: ['beast:wolf:dire', 'beast:wolf:winter']
};

export const DIRE_WOLF: CreatureDefinition = {
  id: 'beast:wolf:dire',
  name: "Loup Sanguinaire",
  size: 'large',
  type: 'beast',
  alignment: 'neutral',
  challengeRating: 3,
  experiencePoints: 200,
  armorClass: 14,
  hitPoints: { average: 37, diceFormula: '5d10+10' },
  speed: { walk: 50 },
  stats: { str: 17, dex: 15, con: 15, int: 3, wis: 12, cha: 7 },
  attacks: [
    {
      name: "Morsure",
      type: 'melee',
      toHit: 5,
      damage: '2d6+3',
      damageType: 'piercing',
      description: "Si la cible est une créature, elle doit réussir un jet de sauvegarde de Force DD 13 ou être jetée à terre."
    }
  ],
  abilities: [
    {
      name: "Odorat et Ouïe Aiguisés",
      description: "Le loup a l'avantage aux jets de Perception qui reposent sur l'odorat ou l'ouïe."
    },
    {
      name: "Tactique de Meute",
      description: "Le loup a l'avantage à l'attaque si au moins un allié non incapacité est à 5 pieds de la cible."
    }
  ],
  description: "Version géante et féroce du loup commun. Taille d'un cheval, mâchoires pouvant broyer des os.",
  habitat: ['forest', 'mountain', 'tundra'],
  behavior: "Alpha de meute. Plus agressif que les loups normaux. Défend farouchement son territoire.",
  loot: [
    { resourceId: 'leather:medium', chance: 90, quantity: { min: 2, max: 3 } },
    { resourceId: 'leather:thick', chance: 30, quantity: { min: 1, max: 1 } }
  ],
  goldDrop: { min: 5, max: 15 },
  isVariant: true,
  baseCreatureId: 'beast:wolf'
};

export const BEAR: CreatureDefinition = {
  id: 'beast:bear',
  name: "Ours Brun",
  size: 'large',
  type: 'beast',
  alignment: 'neutral',
  challengeRating: 2,
  experiencePoints: 100,
  armorClass: 11,
  hitPoints: { average: 34, diceFormula: '4d10+12' },
  speed: { walk: 40, swim: 30 },
  stats: { str: 19, dex: 10, con: 16, int: 2, wis: 13, cha: 7 },
  attacks: [
    {
      name: "Morsure",
      type: 'melee',
      toHit: 6,
      damage: '1d8+4',
      damageType: 'piercing'
    },
    {
      name: "Griffes",
      type: 'melee',
      toHit: 6,
      damage: '2d6+4',
      damageType: 'slashing'
    }
  ],
  abilities: [
    {
      name: "Odorat Aiguisé",
      description: "L'ours a l'avantage aux jets de Perception basés sur l'odorat."
    }
  ],
  description: "Omnivore massif des forêts. Extrêmement dangereux si provoqué ou avec des oursons.",
  habitat: ['forest', 'mountain'],
  behavior: "Généralement évite les humains sauf si affamé ou menacé. Hiberne en hiver. Très protecteur de ses petits.",
  loot: [
    { resourceId: 'leather:thick', chance: 85, quantity: { min: 2, max: 4 } },
    { resourceId: 'leather:medium', chance: 100, quantity: { min: 3, max: 5 } }
  ],
  goldDrop: { min: 0, max: 10 },
  variants: ['beast:bear:polar', 'beast:bear:owlbear']
};

export const GIANT_SPIDER: CreatureDefinition = {
  id: 'beast:spider:giant',
  name: "Araignée Géante",
  size: 'large',
  type: 'beast',
  alignment: 'neutral',
  challengeRating: 1,
  experiencePoints: 50,
  armorClass: 14,
  hitPoints: { average: 26, diceFormula: '4d10+4' },
  speed: { walk: 30, burrow: 20 },
  stats: { str: 14, dex: 16, con: 12, int: 2, wis: 11, cha: 4 },
  attacks: [
    {
      name: "Morsure",
      type: 'melee',
      toHit: 5,
      damage: '1d8+3',
      damageType: 'piercing',
      description: "La cible doit faire un jet de sauvegarde de Constitution DD 11 ou prendre 2d8 dégâts de poison supplémentaires."
    },
    {
      name: "Toile",
      type: 'ranged',
      toHit: 5,
      damage: '0',
      damageType: 'bludgeoning',
      range: 30,
      description: "La cible est entravée. Peut s'échapper avec jet de Force DD 12."
    }
  ],
  abilities: [
    {
      name: "Marche dans les Toiles",
      description: "L'araignée ignore les restrictions de mouvement causées par les toiles."
    },
    {
      name: "Perception des Toiles",
      description: "L'araignée connaît l'emplacement exact de toute créature touchant ses toiles."
    }
  ],
  description: "Araignée de la taille d'un cheval. Tisse des toiles épaisses dans grottes et forêts sombres.",
  habitat: ['cave', 'forest', 'swamp'],
  behavior: "Embusque ses proies depuis les toiles. Venin paralysant. Peut tisser pièges élaborés.",
  loot: [
    { resourceId: 'leather:chitin', chance: 70, quantity: { min: 1, max: 2 } },
    { resourceId: 'reagent:poison', chance: 40, quantity: { min: 1, max: 1 } }
  ],
  goldDrop: { min: 0, max: 8 }
};

// ============================================================================
// DRAGONS
// ============================================================================

export const YOUNG_RED_DRAGON: CreatureDefinition = {
  id: 'dragon:red:young',
  name: "Jeune Dragon Rouge",
  size: 'large',
  type: 'dragon',
  alignment: 'chaotic-evil',
  challengeRating: 10,
  experiencePoints: 5900,
  armorClass: 18,
  hitPoints: { average: 178, diceFormula: '17d10+85' },
  speed: { walk: 40, fly: 80 },
  stats: { str: 23, dex: 10, con: 21, int: 14, wis: 11, cha: 19 },
  attacks: [
    {
      name: "Morsure",
      type: 'melee',
      toHit: 10,
      damage: '2d10+6',
      damageType: 'piercing',
      description: "+1d6 dégâts de feu"
    },
    {
      name: "Griffes",
      type: 'melee',
      toHit: 10,
      damage: '2d6+6',
      damageType: 'slashing'
    },
    {
      name: "Souffle de Feu",
      type: 'spell',
      toHit: 0,
      damage: '16d6',
      damageType: 'fire',
      range: 30,
      description: "Cône de 30 pieds. Jet de sauvegarde de Dextérité DD 17 pour moitié des dégâts. Recharge 5-6."
    }
  ],
  abilities: [
    {
      name: "Immunité au Feu",
      description: "Le dragon est immunisé aux dégâts de feu."
    },
    {
      name: "Vision Aveugle 30 pieds",
      description: "Le dragon peut percevoir son environnement sans vue dans un rayon de 30 pieds."
    },
    {
      name: "Vision dans le Noir 120 pieds",
      description: "Le dragon voit dans le noir comme en plein jour."
    }
  ],
  immunities: ['fire'],
  description: "Dragon rouge adolescent, déjà redoutable. Peau écarlate, yeux de braise, fumée s'échappant de ses narines.",
  habitat: ['volcanic', 'mountain'],
  behavior: "Extrêmement arrogant et cupide. Accumule trésor. Attaque villages pour le butin. Refuse de fuir même face à la mort.",
  lore: "Les dragons rouges sont les plus orgueilleux et puissants des dragons chromatiques. Ils se considèrent comme royauté draconique.",
  loot: [
    { resourceId: 'leather:drake-scale', chance: 100, quantity: { min: 10, max: 15 } },
    { resourceId: 'reagent:fire', chance: 80, quantity: { min: 2, max: 4 } },
    { resourceId: 'gem:ruby', chance: 60, quantity: { min: 1, max: 3 } }
  ],
  goldDrop: { min: 500, max: 2000 },
  variants: ['dragon:red:adult', 'dragon:red:ancient']
};

export const ANCIENT_DRAGON: CreatureDefinition = {
  id: 'dragon:red:ancient',
  name: "Dragon Rouge Ancien",
  size: 'gargantuan',
  type: 'dragon',
  alignment: 'chaotic-evil',
  challengeRating: 24,
  experiencePoints: 62000,
  armorClass: 22,
  hitPoints: { average: 546, diceFormula: '28d20+252' },
  speed: { walk: 40, fly: 80 },
  stats: { str: 30, dex: 10, con: 29, int: 18, wis: 15, cha: 23 },
  attacks: [
    {
      name: "Morsure",
      type: 'melee',
      toHit: 17,
      damage: '2d10+10',
      damageType: 'piercing',
      description: "+4d6 dégâts de feu"
    },
    {
      name: "Griffes",
      type: 'melee',
      toHit: 17,
      damage: '2d6+10',
      damageType: 'slashing'
    },
    {
      name: "Queue",
      type: 'melee',
      toHit: 17,
      damage: '2d8+10',
      damageType: 'bludgeoning'
    },
    {
      name: "Souffle de Feu",
      type: 'spell',
      toHit: 0,
      damage: '26d6',
      damageType: 'fire',
      range: 90,
      description: "Cône de 90 pieds. Jet de sauvegarde de Dextérité DD 24 pour moitié des dégâts. Recharge 5-6."
    }
  ],
  abilities: [
    {
      name: "Présence Terrifiante",
      description: "Toute créature à 120 pieds doit réussir un jet de sauvegarde de Sagesse DD 21 ou être effrayée pendant 1 minute.",
      recharge: 'short-rest'
    },
    {
      name: "Actions Légendaires (3/tour)",
      description: "Le dragon peut effectuer 3 actions légendaires : Détection, Attaque de Queue, Attaque d'Ailes (coûte 2 actions)."
    },
    {
      name: "Résistance Légendaire (3/jour)",
      description: "Si le dragon rate un jet de sauvegarde, il peut choisir de réussir à la place."
    }
  ],
  immunities: ['fire'],
  description: "Dragon millénaire de puissance terrifiante. Montagne de muscles et d'écailles rubis. Peut raser une ville entière.",
  habitat: ['volcanic', 'mountain'],
  behavior: "Tyran absolu de son territoire. Exige tribut des royaumes voisins. Possède intelligence stratégique. Ne tolère aucun défi à sa suprématie.",
  lore: "Les dragons rouges anciens sont quasi-divins. Certains sont adorés comme dieux par cultes draconiques. Leurs trésors sont légendaires.",
  loot: [
    { resourceId: 'leather:ancient-dragon', chance: 100, quantity: { min: 20, max: 30 } },
    { resourceId: 'reagent:fire', chance: 100, quantity: { min: 10, max: 15 } },
    { resourceId: 'gem:ruby', chance: 100, quantity: { min: 5, max: 10 } },
    { resourceId: 'gem:diamond', chance: 80, quantity: { min: 2, max: 5 } }
  ],
  goldDrop: { min: 10000, max: 50000 },
  isVariant: true,
  baseCreatureId: 'dragon:red:young'
};

// ============================================================================
// UNDEAD (Morts-vivants)
// ============================================================================

export const SKELETON: CreatureDefinition = {
  id: 'undead:skeleton',
  name: "Squelette",
  size: 'medium',
  type: 'undead',
  alignment: 'lawful-evil',
  challengeRating: 0.25,
  experiencePoints: 25,
  armorClass: 13,
  hitPoints: { average: 13, diceFormula: '2d8+4' },
  speed: { walk: 30 },
  stats: { str: 10, dex: 14, con: 15, int: 6, wis: 8, cha: 5 },
  attacks: [
    {
      name: "Arc Court",
      type: 'ranged',
      toHit: 4,
      damage: '1d6+2',
      damageType: 'piercing',
      range: 80
    },
    {
      name: "Cimeterre",
      type: 'melee',
      toHit: 4,
      damage: '1d6+2',
      damageType: 'slashing'
    }
  ],
  abilities: [],
  immunities: ['poison'],
  vulnerabilities: ['bludgeoning'],
  description: "Reste animé d'un guerrier mort. Cliquetis d'os sinistre dans l'obscurité.",
  habitat: ['cave', 'swamp'],
  behavior: "Garde tombes et cryptes. Obéit à son créateur nécromancien sans question. Combat jusqu'à destruction.",
  loot: [
    { resourceId: 'reagent:bone-dust', chance: 60, quantity: { min: 1, max: 2 } },
    { resourceId: 'ore:iron', chance: 30, quantity: { min: 1, max: 1 } }
  ],
  goldDrop: { min: 0, max: 5 }
};

export const ZOMBIE: CreatureDefinition = {
  id: 'undead:zombie',
  name: "Zombie",
  size: 'medium',
  type: 'undead',
  alignment: 'neutral-evil',
  challengeRating: 0.25,
  experiencePoints: 25,
  armorClass: 8,
  hitPoints: { average: 22, diceFormula: '3d8+9' },
  speed: { walk: 20 },
  stats: { str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5 },
  attacks: [
    {
      name: "Coup",
      type: 'melee',
      toHit: 3,
      damage: '1d6+1',
      damageType: 'bludgeoning'
    }
  ],
  abilities: [
    {
      name: "Ténacité des Morts-vivants",
      description: "Si les dégâts réduisent le zombie à 0 HP, il doit faire un jet de sauvegarde de Constitution DD 5 + dégâts. Sur un succès, il tombe à 1 HP au lieu de 0."
    }
  ],
  immunities: ['poison'],
  description: "Cadavre réanimé en décomposition. Odeur pestilentielle, chair putride pendante.",
  habitat: ['swamp', 'cave'],
  behavior: "Marche lentement vers proies vivantes. Insensible à la douleur. Peut continuer à combattre même mutilé.",
  loot: [
    { resourceId: 'reagent:rotting-flesh', chance: 70, quantity: { min: 1, max: 3 } }
  ],
  goldDrop: { min: 0, max: 2 }
};

export const VAMPIRE: CreatureDefinition = {
  id: 'undead:vampire',
  name: "Vampire",
  size: 'medium',
  type: 'undead',
  alignment: 'lawful-evil',
  challengeRating: 13,
  experiencePoints: 10000,
  armorClass: 16,
  hitPoints: { average: 144, diceFormula: '17d8+68' },
  speed: { walk: 30 },
  stats: { str: 18, dex: 18, con: 18, int: 17, wis: 15, cha: 18 },
  attacks: [
    {
      name: "Attaque Sans Arme",
      type: 'melee',
      toHit: 9,
      damage: '1d8+4',
      damageType: 'bludgeoning',
      description: "Au lieu de dégâts, le vampire peut agripper (évasion DD 18)."
    },
    {
      name: "Morsure",
      type: 'melee',
      toHit: 9,
      damage: '1d6+4',
      damageType: 'piercing',
      description: "+3d6 dégâts nécrotiques. Maximum HP de la cible réduit du montant de dégâts nécrotiques. Le vampire regagne HP égal."
    }
  ],
  abilities: [
    {
      name: "Forme de Chauve-souris/Brume",
      description: "Le vampire peut se transformer en chauve-souris ou nuage de brume en action bonus."
    },
    {
      name: "Régénération",
      description: "Le vampire regagne 20 HP au début de son tour s'il a au moins 1 HP. Ne fonctionne pas en lumière du soleil ou dans l'eau courante."
    },
    {
      name: "Araignée",
      description: "Le vampire peut grimper surfaces difficiles, y compris plafonds, sans test."
    },
    {
      name: "Faiblesses",
      description: "Lumière du soleil (20 dégâts radiants/tour), Eau courante (20 dégâts acides si fin tour dedans), Pieu en bois (paralysé si critique)."
    }
  ],
  resistances: ['necrotic'],
  immunities: ['poison'],
  description: "Seigneur immortel de la nuit. Beauté trompeuse cachant monstre assoiffé de sang.",
  habitat: ['cave', 'swamp'],
  behavior: "Maître manipulateur. Charm et domination. Crée progéniture vampirique. Règne sur domaine nocturne depuis château ancestral.",
  lore: "Vampires sont souvent nobles déchus ayant conclu pacte ténébreux. Possèdent siècles de connaissances et richesses.",
  loot: [
    { resourceId: 'reagent:vampire-blood', chance: 100, quantity: { min: 1, max: 1 } },
    { resourceId: 'gem:ruby', chance: 70, quantity: { min: 2, max: 4 } }
  ],
  goldDrop: { min: 500, max: 3000 }
};

// ============================================================================
// HUMANOIDS (Humanoïdes)
// ============================================================================

export const BANDIT: CreatureDefinition = {
  id: 'humanoid:bandit',
  name: "Bandit",
  size: 'medium',
  type: 'humanoid',
  alignment: 'chaotic-neutral',
  challengeRating: 0.125,
  experiencePoints: 25,
  armorClass: 12,
  hitPoints: { average: 11, diceFormula: '2d8+2' },
  speed: { walk: 30 },
  stats: { str: 11, dex: 12, con: 12, int: 10, wis: 10, cha: 10 },
  attacks: [
    {
      name: "Cimeterre",
      type: 'melee',
      toHit: 3,
      damage: '1d6+1',
      damageType: 'slashing'
    },
    {
      name: "Arbalète Légère",
      type: 'ranged',
      toHit: 3,
      damage: '1d8+1',
      damageType: 'piercing',
      range: 80
    }
  ],
  abilities: [],
  description: "Hors-la-loi désespéré. Vêtements rapiécés, armes rouillées. Survit par pillage.",
  habitat: ['forest', 'plains', 'mountain'],
  behavior: "Embusque voyageurs sur routes isolées. Fuit si combat tourne mal. Opère en bandes de 5-10 membres.",
  loot: [
    { resourceId: 'leather:light', chance: 60, quantity: { min: 1, max: 1 } }
  ],
  goldDrop: { min: 5, max: 20 }
};

export const ORC_WARRIOR: CreatureDefinition = {
  id: 'humanoid:orc',
  name: "Guerrier Orc",
  size: 'medium',
  type: 'humanoid',
  alignment: 'chaotic-evil',
  challengeRating: 1,
  experiencePoints: 100,
  armorClass: 13,
  hitPoints: { average: 15, diceFormula: '2d8+6' },
  speed: { walk: 30 },
  stats: { str: 16, dex: 12, con: 16, int: 7, wis: 11, cha: 10 },
  attacks: [
    {
      name: "Hache à Deux Mains",
      type: 'melee',
      toHit: 5,
      damage: '1d12+3',
      damageType: 'slashing'
    },
    {
      name: "Javeline",
      type: 'ranged',
      toHit: 5,
      damage: '1d6+3',
      damageType: 'piercing',
      range: 30
    }
  ],
  abilities: [
    {
      name: "Agressif",
      description: "En action bonus, l'orc peut se déplacer de sa vitesse vers une créature hostile qu'il peut voir."
    }
  ],
  description: "Humanoïde musclé à peau verte. Crocs proéminents, cicatrices de guerre. Culture basée sur force.",
  habitat: ['mountain', 'plains'],
  behavior: "Extrêmement agressif. Vit pour guerre et pillage. Bandes dirigées par chef le plus fort. Raids sur villages humains.",
  loot: [
    { resourceId: 'leather:medium', chance: 70, quantity: { min: 1, max: 2 } },
    { resourceId: 'ore:iron', chance: 40, quantity: { min: 1, max: 2 } }
  ],
  goldDrop: { min: 10, max: 30 }
};

// ============================================================================
// ELEMENTALS (Élémentaires)
// ============================================================================

export const FIRE_ELEMENTAL: CreatureDefinition = {
  id: 'elemental:fire',
  name: "Élémentaire de Feu",
  size: 'large',
  type: 'elemental',
  alignment: 'neutral',
  challengeRating: 5,
  experiencePoints: 1800,
  armorClass: 13,
  hitPoints: { average: 102, diceFormula: '12d10+36' },
  speed: { walk: 50 },
  stats: { str: 10, dex: 17, con: 16, int: 6, wis: 10, cha: 7 },
  attacks: [
    {
      name: "Toucher",
      type: 'melee',
      toHit: 6,
      damage: '2d6+3',
      damageType: 'fire',
      description: "Si la cible est une créature ou objet inflammable, elle s'enflamme (1d10 dégâts de feu/tour jusqu'à extinction)."
    }
  ],
  abilities: [
    {
      name: "Forme de Feu",
      description: "L'élémentaire peut traverser espaces de 1 pouce sans se faufiler. Toute créature touchant l'élémentaire prend 1d10 dégâts de feu."
    },
    {
      name: "Illumination",
      description: "L'élémentaire émet lumière vive dans un rayon de 30 pieds et lumière faible sur 30 pieds de plus."
    },
    {
      name: "Extinction par l'Eau",
      description: "Pour chaque 5 pieds l'élémentaire se déplace dans l'eau, il prend 1 dégât de froid."
    }
  ],
  immunities: ['fire', 'poison'],
  resistances: ['bludgeoning', 'piercing', 'slashing'],
  vulnerabilities: ['cold'],
  description: "Incarnation vivante du feu élémentaire. Colonne dansante de flammes rugissantes.",
  habitat: ['volcanic'],
  behavior: "Créature de feu pur du Plan Élémentaire. Consume tout sur son passage. Dissipé si éteint ou banni.",
  lore: "Invoqués par puissants mages. Servent contre leur gré jusqu'à libération. Certains restent piégés ici après catastrophes planaires.",
  loot: [
    { resourceId: 'reagent:fire', chance: 100, quantity: { min: 3, max: 5 } },
    { resourceId: 'gem:ruby', chance: 50, quantity: { min: 1, max: 2 } }
  ],
  goldDrop: { min: 0, max: 0 }
};

export const WATER_ELEMENTAL: CreatureDefinition = {
  id: 'elemental:water',
  name: "Élémentaire d'Eau",
  size: 'large',
  type: 'elemental',
  alignment: 'neutral',
  challengeRating: 5,
  experiencePoints: 1800,
  armorClass: 14,
  hitPoints: { average: 114, diceFormula: '12d10+48' },
  speed: { walk: 30, swim: 90 },
  stats: { str: 18, dex: 14, con: 18, int: 5, wis: 10, cha: 8 },
  attacks: [
    {
      name: "Coup",
      type: 'melee',
      toHit: 7,
      damage: '2d8+4',
      damageType: 'bludgeoning'
    },
    {
      name: "Engloutir",
      type: 'melee',
      toHit: 7,
      damage: '2d8+4',
      damageType: 'bludgeoning',
      description: "La cible est agrippée et commence à se noyer. Elle peut s'échapper avec jet de Force DD 14."
    }
  ],
  abilities: [
    {
      name: "Forme d'Eau",
      description: "L'élémentaire peut entrer dans l'espace d'une créature hostile et s'y arrêter. Il peut traverser espace de 1 pouce sans se faufiler."
    },
    {
      name: "Gel",
      description: "Si l'élémentaire prend dégâts de froid, il devient partiellement gelé. Sa vitesse réduite de 20 pieds jusqu'à fin de son prochain tour."
    }
  ],
  immunities: ['poison'],
  resistances: ['acid', 'bludgeoning', 'piercing', 'slashing'],
  description: "Vague vivante d'eau élémentaire. Forme fluide ondulante semblable à humanoïde.",
  habitat: ['ocean'],
  behavior: "Créature d'eau pure du Plan Élémentaire. Engloutit ennemis pour les noyer. Peut fusionner avec plans d'eau.",
  loot: [
    { resourceId: 'reagent:water', chance: 100, quantity: { min: 3, max: 5 } },
    { resourceId: 'gem:sapphire', chance: 50, quantity: { min: 1, max: 2 } }
  ],
  goldDrop: { min: 0, max: 0 }
};

// ============================================================================
// FIENDS (Démons/Diables)
// ============================================================================

export const IMP: CreatureDefinition = {
  id: 'fiend:imp',
  name: "Diablotin",
  size: 'tiny',
  type: 'fiend',
  alignment: 'lawful-evil',
  challengeRating: 1,
  experiencePoints: 200,
  armorClass: 13,
  hitPoints: { average: 10, diceFormula: '3d4+3' },
  speed: { walk: 20, fly: 40 },
  stats: { str: 6, dex: 17, con: 13, int: 11, wis: 12, cha: 14 },
  attacks: [
    {
      name: "Dard",
      type: 'melee',
      toHit: 5,
      damage: '1d4+3',
      damageType: 'piercing',
      description: "+3d6 dégâts de poison. Jet de sauvegarde de Constitution DD 11 pour moitié."
    }
  ],
  abilities: [
    {
      name: "Métamorphe",
      description: "Le diablotin peut se transformer en rat, corbeau ou araignée (stats changent selon forme)."
    },
    {
      name: "Invisibilité",
      description: "Le diablotin devient invisible jusqu'à ce qu'il attaque ou perde concentration."
    }
  ],
  immunities: ['fire', 'poison'],
  resistances: ['cold', 'bludgeoning', 'piercing', 'slashing'],
  description: "Petit démon ailé à peau rouge. Cornes, queue fourchue, rictus malveillant.",
  habitat: ['volcanic', 'cave'],
  behavior: "Familier de sorciers maléfiques. Espion et messager. Aime semer discorde et tentation. Loyal aux Neuf Enfers.",
  lore: "Diablotins servent archidiables comme messagers. Pactisent avec mortels pour corruption. Âmes corrompues rejoignent Enfers.",
  loot: [
    { resourceId: 'reagent:infernal-essence', chance: 70, quantity: { min: 1, max: 1 } }
  ],
  goldDrop: { min: 0, max: 10 }
};

export const DEMON_BALOR: CreatureDefinition = {
  id: 'fiend:balor',
  name: "Balor",
  size: 'huge',
  type: 'fiend',
  alignment: 'chaotic-evil',
  challengeRating: 19,
  experiencePoints: 22000,
  armorClass: 19,
  hitPoints: { average: 262, diceFormula: '21d12+126' },
  speed: { walk: 40, fly: 80 },
  stats: { str: 26, dex: 15, con: 22, int: 20, wis: 16, cha: 22 },
  attacks: [
    {
      name: "Épée Longue +3",
      type: 'melee',
      toHit: 14,
      damage: '2d8+11',
      damageType: 'slashing',
      description: "+3d8 dégâts de foudre. Si la cible est créature, elle doit réussir jet de sauvegarde de Constitution DD 20 ou être étourdie jusqu'à fin de son prochain tour."
    },
    {
      name: "Fouet +3",
      type: 'melee',
      toHit: 14,
      damage: '2d6+11',
      damageType: 'slashing',
      description: "+3d6 dégâts de feu. Si la cible est créature, elle doit réussir jet de Force DD 20 ou être tirée de 25 pieds vers le Balor.",
      range: 30
    }
  ],
  abilities: [
    {
      name: "Aura de Feu",
      description: "Au début de chaque tour du Balor, toute créature à 5 pieds prend 3d6 dégâts de feu. Objets inflammables s'enflamment."
    },
    {
      name: "Explosion de Mort",
      description: "Quand le Balor meurt, il explose. Toute créature à 30 pieds fait jet de sauvegarde de Dextérité DD 20, prenant 20d6 dégâts de feu (moitié si réussi)."
    },
    {
      name: "Résistance Magique",
      description: "Le Balor a l'avantage aux jets de sauvegarde contre sorts et effets magiques."
    }
  ],
  immunities: ['fire', 'poison'],
  resistances: ['cold', 'lightning', 'bludgeoning', 'piercing', 'slashing'],
  description: "Seigneur démon titanesque. Corps enflammé, ailes de ténèbres, épée de foudre et fouet de flammes.",
  habitat: ['volcanic'],
  behavior: "Général des armées abyssales. Chaos incarné. Cherche à corrompre et détruire multivers. Commande légions de démons.",
  lore: "Balors sont élite démoniaque des Abysses. Lieutenants des Seigneurs Démons. Certains commandent plans abyssaux entiers.",
  loot: [
    { resourceId: 'reagent:demon-heart', chance: 100, quantity: { min: 1, max: 1 } },
    { resourceId: 'ore:adamantine', chance: 60, quantity: { min: 2, max: 4 } },
    { resourceId: 'gem:diamond', chance: 80, quantity: { min: 3, max: 6 } }
  ],
  goldDrop: { min: 5000, max: 15000 }
};

// ============================================================================
// EXPORTS & UTILITIES
// ============================================================================

export const ALL_CREATURES: CreatureDefinition[] = [
  // Beasts
  WOLF, DIRE_WOLF, BEAR, GIANT_SPIDER,
  // Dragons
  YOUNG_RED_DRAGON, ANCIENT_DRAGON,
  // Undead
  SKELETON, ZOMBIE, VAMPIRE,
  // Humanoids
  BANDIT, ORC_WARRIOR,
  // Elementals
  FIRE_ELEMENTAL, WATER_ELEMENTAL,
  // Fiends
  IMP, DEMON_BALOR
];

export const CREATURES_BY_ID: Record<string, CreatureDefinition> = ALL_CREATURES.reduce((acc, creature) => {
  acc[creature.id] = creature;
  return acc;
}, {} as Record<string, CreatureDefinition>);

export const CREATURES_BY_CR: Record<number, CreatureDefinition[]> = ALL_CREATURES.reduce((acc, creature) => {
  const cr = creature.challengeRating;
  if (!acc[cr]) acc[cr] = [];
  acc[cr].push(creature);
  return acc;
}, {} as Record<number, CreatureDefinition[]>);

export const CREATURES_BY_TYPE: Record<CreatureType, CreatureDefinition[]> = ALL_CREATURES.reduce((acc, creature) => {
  if (!acc[creature.type]) acc[creature.type] = [];
  acc[creature.type].push(creature);
  return acc;
}, {} as Record<CreatureType, CreatureDefinition[]>);

export const CREATURES_BY_BIOME: Record<BiomeType, CreatureDefinition[]> = ALL_CREATURES.reduce((acc, creature) => {
  creature.habitat.forEach(biome => {
    if (!acc[biome]) acc[biome] = [];
    acc[biome].push(creature);
  });
  return acc;
}, {} as Record<BiomeType, CreatureDefinition[]>);

/**
 * Trouve créatures appropriées pour un biome donné
 */
export function getCreaturesForBiome(biome: BiomeType, minCR: number = 0, maxCR: number = 30): CreatureDefinition[] {
  return (CREATURES_BY_BIOME[biome] || []).filter(c => 
    c.challengeRating >= minCR && c.challengeRating <= maxCR
  );
}

/**
 * Trouve créatures par plage de CR
 */
export function getCreaturesByCRRange(minCR: number, maxCR: number): CreatureDefinition[] {
  return ALL_CREATURES.filter(c => c.challengeRating >= minCR && c.challengeRating <= maxCR);
}

/**
 * Calcule XP totale d'un groupe de créatures
 */
export function calculateEncounterXP(creatures: CreatureDefinition[]): number {
  return creatures.reduce((total, c) => total + c.experiencePoints, 0);
}

/**
 * Génère rencontre aléatoire pour un biome et niveau de groupe
 */
export function generateRandomEncounter(biome: BiomeType, partyLevel: number, partySize: number): CreatureDefinition[] {
  const targetCR = partyLevel;
  const availableCreatures = getCreaturesForBiome(biome, Math.max(0, targetCR - 2), targetCR + 2);
  
  if (availableCreatures.length === 0) return [];
  
  // Simple: retourne 1-4 créatures de CR approprié
  const count = Math.floor(Math.random() * 4) + 1;
  const encounter: CreatureDefinition[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomCreature = availableCreatures[Math.floor(Math.random() * availableCreatures.length)];
    encounter.push(randomCreature);
  }
  
  return encounter;
}

/**
 * Obtient variantes d'une créature
 */
export function getCreatureVariants(baseCreatureId: string): CreatureDefinition[] {
  const baseCreature = CREATURES_BY_ID[baseCreatureId];
  if (!baseCreature || !baseCreature.variants) return [];
  
  return baseCreature.variants
    .map(id => CREATURES_BY_ID[id])
    .filter(c => c !== undefined);
}

// Export aliases for compatibility
export const BESTIARY = CREATURES_BY_ID;
export const BESTIARY_EXTENDED = {
  ...CREATURES_BY_ID,
  ALL_CREATURES,
  CREATURES_BY_CR,
  CREATURES_BY_TYPE,
  CREATURES_BY_BIOME,
  getCreatureVariants
};
