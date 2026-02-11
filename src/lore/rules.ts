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
      ac_range: [0, 2] as [number, number],
      penalty: null,
      desc: "Aucune restriction. Bonus DEX complet a la CA."
    },
    medium: {
      label: "Armure intermediaire",
      examples: ["Cuir", "Cuir cloute", "Peau", "Brigandine", "Ecailles"],
      ac_range: [2, 4] as [number, number],
      penalty: { max_dex_bonus: 2 },
      desc: "Bonus DEX a la CA limite a +2 max."
    },
    heavy: {
      label: "Armure lourde",
      examples: ["Cotte de mailles", "Plates", "Harnois", "Plate complete"],
      ac_range: [4, 8] as [number, number],
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

export const rollDice = (diceString: string): { total: number; rolls: number[] } => {
  const match = diceString.match(/(\d+)?d(\d+)([+-]\d+)?/i);
  if (!match) return { total: 0, rolls: [] };
  
  const count = parseInt(match[1] || '1');
  const sides = parseInt(match[2]);
  const modifier = parseInt(match[3] || '0');
  
  const rolls: number[] = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  
  const total = rolls.reduce((a, b) => a + b, 0) + modifier;
  return { total, rolls };
};

export const getModifier = (stat: number): number => {
  return Math.floor((stat - 10) / 2);
};

export const calculateAC = (
  baseAC: number,
  dexMod: number,
  armorCategory: 'light' | 'medium' | 'heavy',
  hasShield: boolean
): number => {
  let ac = baseAC;
  
  if (armorCategory === 'light') {
    ac += dexMod;
  } else if (armorCategory === 'medium') {
    ac += Math.min(dexMod, 2);
  }
  
  if (hasShield) {
    ac += 2;
  }
  
  return ac;
};
