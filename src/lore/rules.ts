export const LEVEL_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 300,
  3: 900,
  4: 2700,
  5: 6500,
  6: 14000,
  7: 23000,
  8: 34000,
  9: 48000,
  10: 64000,
  11: 85000,
  12: 110000,
  13: 140000,
  14: 180000,
  15: 230000,
  16: 290000,
  17: 360000,
  18: 440000,
  19: 530000,
  20: 640000,
  21: 800000,
  22: 1000000,
  23: 1250000,
  24: 1550000,
  25: 1900000,
  26: 2350000,
  27: 2900000,
  28: 3550000,
  29: 4300000,
  30: 5200000
};

export const EQUIPMENT_RULES = {
  armor_categories: {
    light: {
      label: "Armure legere",
      examples: ["Robe", "Vetements", "Costume", "Tunique"],
      ac_range: [0, 2] as [number, number],      // Ancien système
      ac_range_d100: [20, 26] as [number, number], // Nouveau : 20 + (0-2)×3
      penalty: null,
      desc: "Aucune restriction. Bonus DEX complet a la CA."
    },
    medium: {
      label: "Armure intermediaire",
      examples: ["Cuir", "Cuir cloute", "Peau", "Brigandine", "Ecailles"],
      ac_range: [2, 4] as [number, number],      // Ancien
      ac_range_d100: [26, 32] as [number, number], // Nouveau : 20 + (2-4)×3
      penalty: { max_dex_bonus: 2, max_dex_bonus_d100: 5 },
      desc: "Bonus DEX a la CA limite a +5 max (systeme d100)."
    },
    heavy: {
      label: "Armure lourde",
      examples: ["Cotte de mailles", "Plates", "Harnois", "Plate complete"],
      ac_range: [4, 8] as [number, number],      // Ancien
      ac_range_d100: [32, 44] as [number, number], // Nouveau : 20 + (4-8)×3
      penalty: { no_dex_bonus: true, stealth_disadvantage: true, speed_penalty: -1 },
      desc: "Pas de bonus DEX. Desavantage en Discretion. -1 vitesse."
    }
  },
  weapon_categories: {
    simple: {
      label: "Arme simple",
      examples: ["Baton", "Masse", "Dague", "Gourdin", "Lance", "Serpe"],
      desc: "Utilisable par toutes les classes sans penalite."
    },
    martial: {
      label: "Arme de guerre",
      examples: ["Epee longue", "Hache", "Hallebarde", "Marteau", "Epee a deux mains", "Arc composite"],
      desc: "Requiert entrainement martial. -2 ATK si non-maitrise."
    },
    finesse: {
      label: "Arme de finesse",
      examples: ["Rapiere", "Dague", "Cimeterre", "Fouet"],
      desc: "Utilise DEX au lieu de STR pour l'attaque. Ideal pour les agiles."
    },
    arcane: {
      label: "Focus arcanique",
      examples: ["Baton", "Orbe", "Grimoire", "Baguette", "Luth"],
      desc: "Canalise la magie. Bonus INT/WIS/CHA selon classe."
    },
    holy: {
      label: "Arme sacree",
      examples: ["Masse benie", "Epee sacree", "Marteau de guerre"],
      desc: "Bonus radiant pour Clercs et Paladins."
    }
  },
  class_proficiency: {
    "Guerrier": {
      armor: ["light", "medium", "heavy"],
      weapons: ["simple", "martial"],
      shields: true,
      desc: "Maitre de toutes les armures et armes martiales."
    },
    "Mage": {
      armor: ["light"],
      weapons: ["simple", "arcane"],
      shields: false,
      desc: "Armure legere uniquement. Armure lourde = impossible de lancer des sorts."
    },
    "Voleur": {
      armor: ["light"],
      weapons: ["simple", "finesse"],
      shields: false,
      desc: "Armure legere pour la mobilite. Armes de finesse privilegiees."
    },
    "Clerc": {
      armor: ["light", "medium", "heavy"],
      weapons: ["simple", "holy"],
      shields: true,
      desc: "Toutes armures. Sorts divins non-affectes par l'armure lourde."
    },
    "Paladin": {
      armor: ["light", "medium", "heavy"],
      weapons: ["simple", "martial", "holy"],
      shields: true,
      desc: "Maitre de toutes les armures. Armes martiales et sacrees."
    },
    "Rodeur": {
      armor: ["light", "medium"],
      weapons: ["simple", "martial", "finesse"],
      shields: true,
      desc: "Armures legeres et intermediaires. Toutes les armes."
    },
    "Barde": {
      armor: ["light"],
      weapons: ["simple", "finesse", "arcane"],
      shields: false,
      desc: "Armure legere. Armes de finesse et focus arcaniques."
    },
    "Druide": {
      armor: ["light", "medium"],
      weapons: ["simple", "arcane"],
      shields: true,
      desc: "Refuse le metal. Armures naturelles uniquement."
    }
  },
  penalties: {
    non_proficient_armor: "Impossible de lancer des sorts. -2 a tous les jets d'attaque et de sauvegarde bases sur STR/DEX.",
    non_proficient_weapon: "-2 aux jets d'attaque avec cette arme.",
    heavy_armor_stealth: "Desavantage automatique sur les jets de Discretion.",
    heavy_armor_mage: "INTERDIT: Un mage en armure lourde ne peut PAS lancer de sorts."
  }
};

export const calculateLevel = (xp: number): number => {
  let level = 1;
  for (const [lvl, threshold] of Object.entries(LEVEL_THRESHOLDS)) {
    if (xp >= threshold) {
      level = parseInt(lvl);
    }
  }
  return level;
};

export const getXPForNextLevel = (currentLevel: number): number => {
  return LEVEL_THRESHOLDS[currentLevel + 1] || LEVEL_THRESHOLDS[30];
};

// ============= SYSTÈME D100 - RÈGLES COMPLÈTES =============

/**
 * Types de dés disponibles (système d100)
 */
export const DICE_TYPES = {
  d4: 4,     // Dague faible, coup de poing
  d6: 6,     // Arme simple légère (ancien système)
  d8: 8,     // Arme simple standard
  d10: 10,   // Arme martiale
  d12: 12,   // Grande arme (ancien système)
  d20: 20,   // Sorts mineurs, dague d100
  d30: 30,   // Épée courte d100
  d40: 40,   // Épée longue d100
  d50: 50,   // Arme lourde d100
  d60: 60,   // Arme deux mains d100
  d100: 100  // Jets compétence, chance pure
} as const;

/**
 * Lancé de dés universel (supporte d4 à d100)
 */
export const rollDice = (diceString: string): { total: number; rolls: number[]; isCritical: boolean; isFumble: boolean } => {
  const match = diceString.match(/(\d+)?d(\d+)([+-]\d+)?/i);
  if (!match) return { total: 0, rolls: [], isCritical: false, isFumble: false };
  
  const count = parseInt(match[1] || '1');
  const sides = parseInt(match[2]);
  const modifier = parseInt(match[3] || '0');
  
  const rolls: number[] = [];
  let criticals = 0;
  let fumbles = 0;

  for (let i = 0; i < count; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
    
    // Détection critique (95-100 pour d100, max pour autres dés)
    if (sides === 100 && roll >= 95) criticals++;
    else if (sides === 20 && roll === 20) criticals++;
    else if (roll === sides && sides >= 12) criticals++;
    
    // Détection fumble (1-5 pour d100, 1 pour autres dés)
    if (sides === 100 && roll <= 5) fumbles++;
    else if (roll === 1) fumbles++;
  }
  
  const total = rolls.reduce((a, b) => a + b, 0) + modifier;
  return { 
    total, 
    rolls, 
    isCritical: criticals > 0,
    isFumble: fumbles > 0 && criticals === 0 // Fumble only if no critical
  };
};

/**
 * Calcul modificateur attribut (système d100)
 * Formule : (Attribut - 10) × 1.25 arrondi
 * Exemple : STR 18 → (18-10) × 1.25 = +10
 */
export const getModifier = (stat: number): number => {
  return Math.round((stat - 10) * 1.25);
};

/**
 * Conversion ancien DC (d20) vers nouveau DC (d100)
 * Formule : (DC_d20 × 5) - 5
 */
export const convertDC = (oldDC: number): number => {
  return (oldDC * 5) - 5;
};

/**
 * Seuils de difficulté standard (système d100)
 */
export const DIFFICULTY_THRESHOLDS = {
  TRIVIAL: 15,        // Routine absolue
  VERY_EASY: 25,      // Novice peut réussir
  EASY: 35,           // Accessible avec minimal effort
  MEDIUM: 50,         // Compétence modérée requise
  HARD: 65,           // Challenge pour expert
  VERY_HARD: 80,      // Héroïque, quasi-impossible
  LEGENDARY: 95       // Digne des légendes
} as const;

/**
 * Jet de compétence d100
 */
export const skillCheck = (
  skillValue: number,
  attributeMod: number,
  dc: number
): { success: boolean; roll: number; total: number; isCritical: boolean; margin: number } => {
  const roll = Math.floor(Math.random() * 100) + 1;
  const total = roll + skillValue + attributeMod;
  const margin = total - dc;
  const isCritical = roll >= 95;
  
  return { 
    success: total >= dc || isCritical, // Critique auto-réussite
    roll, 
    total,
    isCritical,
    margin 
  };
};

/**
 * Calcul CA (Classe d'Armure) système d100
 * Formule : 20 + (AC_armure × 3) + (DEX_mod × 1.5) + (bonus_bouclier × 3)
 */
export const calculateAC = (
  baseAC: number,
  dexMod: number,
  armorCategory: 'light' | 'medium' | 'heavy',
  hasShield: boolean
): number => {
  // Base d100 : 20 (au lieu de 10)
  let ac = 20 + (baseAC * 3);
  
  if (armorCategory === 'light') {
    // Armure légère : bonus DEX complet × 1.5
    ac += Math.round(dexMod * 1.5);
  } else if (armorCategory === 'medium') {
    // Armure intermédiaire : DEX limité à +5 (équivalent ancien +2)
    ac += Math.min(Math.round(dexMod * 1.5), 5);
  }
  // Armure lourde : pas de bonus DEX
  
  if (hasShield) {
    // Bouclier : +6 (ancien +2 × 3)
    ac += 6;
  }
  
  return ac;
};
