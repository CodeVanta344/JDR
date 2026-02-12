/**
 * BONUS DE MAÎTRISE SYSTÈME D100
 * Conversion : bonus_ancien × 2.5 arrondi
 */
export const PROFICIENCY_BONUS_D100: Record<number, number> = {
  1: 5,   // Ancien +2
  2: 5,
  3: 5,
  4: 5,
  5: 8,   // Ancien +3
  6: 8,
  7: 8,
  8: 8,
  9: 12,  // Ancien +4
  10: 12,
  11: 12,
  12: 12,
  13: 15, // Ancien +5
  14: 15,
  15: 15,
  16: 15,
  17: 20, // Ancien +6
  18: 20,
  19: 20,
  20: 20,
  21: 23, // Extension niveau épique
  22: 23,
  23: 23,
  24: 23,
  25: 25,
  26: 25,
  27: 28,
  28: 28,
  29: 30,
  30: 30
};

/**
 * Obtenir bonus de maîtrise pour un niveau donné (d100)
 */
export const getProficiencyBonus = (level: number): number => {
  return PROFICIENCY_BONUS_D100[Math.min(level, 30)] || 5;
};

/**
 * PALIERS DE COMPÉTENCE (0-100)
 */
export const SKILL_TIERS = {
  NOVICE: { min: 0, max: 20, bonus: 0, label: "Novice" },
  APPRENTICE: { min: 21, max: 40, bonus: 5, label: "Apprenti" },
  COMPETENT: { min: 41, max: 60, bonus: 10, label: "Compétent" },
  EXPERT: { min: 61, max: 80, bonus: 15, label: "Expert" },
  MASTER: { min: 81, max: 95, bonus: 20, label: "Maître" },
  LEGEND: { min: 96, max: 100, bonus: 30, label: "Légende" }
} as const;

/**
 * Obtenir palier de compétence pour un score donné
 */
export const getSkillTier = (skillValue: number): typeof SKILL_TIERS[keyof typeof SKILL_TIERS] => {
  if (skillValue <= 20) return SKILL_TIERS.NOVICE;
  if (skillValue <= 40) return SKILL_TIERS.APPRENTICE;
  if (skillValue <= 60) return SKILL_TIERS.COMPETENT;
  if (skillValue <= 80) return SKILL_TIERS.EXPERT;
  if (skillValue <= 95) return SKILL_TIERS.MASTER;
  return SKILL_TIERS.LEGEND;
};

/**
 * Points de compétence par niveau (d100)
 */
export const SKILL_POINTS_PER_LEVEL: Record<string, number> = {
  "Guerrier": 5,
  "Mage": 5,
  "Clerc": 5,
  "Paladin": 5,
  "Voleur": 10,  // Spécialiste compétences
  "Rodeur": 7,
  "Barde": 8,
  "Druide": 6,
  "Moine": 6,
  "Barbare": 5,
  "Sorcier": 5
};

/**
 * Bonus points compétence par point INT (au-dessus de 12)
 */
export const getIntSkillBonus = (intelligence: number): number => {
  return Math.max(0, Math.floor((intelligence - 12) / 2));
};
