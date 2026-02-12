/**
 * SCRIPT DE CONVERSION AUTOMATIQUE D20 → D100
 * Convertit tous les traits LifePath au nouveau système
 */

export const CONVERSION_FACTORS = {
  // Stats (STR, DEX, CON, INT, WIS, CHA)
  stats: 2,  // +1 ancien → +2 nouveau
  
  // Compétences (skills)
  skills: 2.5, // +2 ancien → +5 nouveau
  
  // PO (pièces d'or)
  gold: 5,  // +10 PO → +50 PO
  
  // CA (Classe d'Armure)
  ac: 3,  // +1 AC → +3 AC
  
  // Bonus attaque
  attack: 2.5, // +1 ATK → +2.5 ATK (arrondi +3)
  
  // Dégâts (dés)
  damage_dice: {
    'd4': 'd20',
    'd6': 'd30',
    'd8': 'd40',
    'd10': 'd50',
    'd12': 'd60'
  },
  
  // Réputations (factions)
  reputation: 1,  // Inchangé (échelle -100 à +100)
  
  // HP/ressources
  hp: 5,  // +2 HP → +10 HP
  
  // Vitesse
  speed: 1  // Inchangé (cases)
};

/**
 * Convertit un trait mécanique d20 → d100
 */
export const convertMechanicalTrait = (trait: string): string => {
  let converted = trait;
  
  // Conversion dés dégâts
  converted = converted.replace(/(\d+)d4/g, '$1d20');
  converted = converted.replace(/(\d+)d6/g, '$1d30');
  converted = converted.replace(/(\d+)d8/g, '$1d40');
  converted = converted.replace(/(\d+)d10/g, '$1d50');
  converted = converted.replace(/(\d+)d12/g, '$1d60');
  
  // Conversion bonus +X
  converted = converted.replace(/\+(\d+)\s+(en|à|aux|sur)/gi, (match, num, prep) => {
    const oldBonus = parseInt(num);
    let newBonus: number;
    
    // Déterminer facteur selon contexte
    if (match.toLowerCase().includes('dégât') || match.toLowerCase().includes('dommage')) {
      newBonus = oldBonus * CONVERSION_FACTORS.attack;
    } else if (match.toLowerCase().includes('ac') || match.toLowerCase().includes('ca')) {
      newBonus = oldBonus * CONVERSION_FACTORS.ac;
    } else {
      // Par défaut : compétences
      newBonus = Math.round(oldBonus * CONVERSION_FACTORS.skills);
    }
    
    return `+${newBonus} ${prep}`;
  });
  
  return converted;
};

/**
 * Convertit array de compétences (skills)
 */
export const convertSkills = (skills: Array<{ skillId: string; bonus: number; reason: string }>): typeof skills => {
  return skills.map(skill => ({
    ...skill,
    bonus: Math.round(skill.bonus * CONVERSION_FACTORS.skills)
  }));
};

/**
 * Convertit objet stats (STR, DEX, etc.)
 */
export const convertStats = (stats: Record<string, number>): Record<string, number> => {
  const converted: Record<string, number> = {};
  for (const [key, value] of Object.entries(stats)) {
    converted[key] = value * CONVERSION_FACTORS.stats;
  }
  return converted;
};

/**
 * Exemples de conversion
 */
export const CONVERSION_EXAMPLES = {
  before: {
    label: 'Noble (ancien d20)',
    stats: { charisma: 2, intelligence: 1 },
    skills: [
      { skillId: 'etiquette', bonus: 5, reason: 'Éducation aristocratique' },
      { skillId: 'diplomatie', bonus: 3, reason: 'Entraînement social' }
    ],
    gold: 500,
    mechanical_traits: [
      {
        name: 'Richesse héritée',
        desc: '+500 PO de départ',
        game_effect: 'Équipement luxueux accessible'
      },
      {
        name: 'Connexions',
        desc: '+2 en Persuasion avec nobles',
        game_effect: 'Bonus social aristocratie'
      }
    ]
  },
  after: {
    label: 'Noble (nouveau d100)',
    stats: { charisma: 4, intelligence: 2 },  // ×2
    skills: [
      { skillId: 'etiquette', bonus: 12, reason: 'Éducation aristocratique' },  // ×2.5 arrondi
      { skillId: 'diplomatie', bonus: 8, reason: 'Entraînement social' }
    ],
    gold: 2500,  // ×5
    mechanical_traits: [
      {
        name: 'Richesse héritée',
        desc: '+2500 PO de départ',
        game_effect: 'Équipement luxueux accessible'
      },
      {
        name: 'Connexions',
        desc: '+5 en Persuasion avec nobles',  // ×2.5
        game_effect: 'Bonus social aristocratie'
      }
    ]
  }
};

/**
 * CHECKLIST VALIDATION
 */
export const VALIDATION_CHECKLIST = {
  stats_total: {
    old_max: 6,   // +2/+2/+2 max par phase
    new_max: 12   // +4/+4/+4 max par phase
  },
  skills_total: {
    old_max: 10,  // +5/+5 max par phase
    new_max: 25   // +12/+13 max par phase
  },
  gold_ranges: {
    pauvre_old: 5,
    pauvre_new: 25,
    riche_old: 500,
    riche_new: 2500
  },
  ac_bonus: {
    old_max: 2,   // +2 AC max par trait
    new_max: 6    // +6 AC max par trait
  },
  damage_bonus: {
    old: '+1d6',
    new: '+1d30'
  }
};
