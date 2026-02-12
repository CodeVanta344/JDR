/**
 * SYSTÈME D100 - UTILITAIRES COMBAT
 * Fonctions pour intégrer formules d100 dans CombatManager
 */

import { getModifier, rollDice, DIFFICULTY_THRESHOLDS, calculateAC, getProficiencyBonus } from '../lore/rules';

/**
 * Calcul jet d'attaque d100
 * @param attacker - Combattant attaquant
 * @param target - Cible
 * @param level - Niveau de l'attaquant (défaut 1)
 * @param tacticalBonus - Bonus tactique (flanking, etc.)
 * @returns {roll, modifier, total, success, isCritical}
 */
export const rollAttackD100 = (attacker, target, level = 1, tacticalBonus = 0) => {
  // Jet d100
  const { total: roll, rolls, isCritical, isFumble } = rollDice('1d100');
  
  // Modificateur = attribut principal + bonus maîtrise + tactique
  const primaryStat = attacker.str || attacker.dex || 15; // Default 15 si pas défini
  const statMod = getModifier(primaryStat);
  const profBonus = getProficiencyBonus(level);
  const totalModifier = statMod + profBonus + tacticalBonus;
  
  // Total final
  const total = roll + totalModifier;
  
  // Succès si total >= CA cible (ou critique auto-réussite)
  const success = total >= target.ac || isCritical;
  
  return {
    roll: rolls[0],  // Valeur brute du d100
    modifier: totalModifier,
    total,
    success,
    isCritical,
    isFumble,
    targetAC: target.ac
  };
};

/**
 * Calcul dégâts d100
 * @param attacker - Combattant attaquant
 * @param action - Action utilisée
 * @param isCritical - Si le coup est critique
 * @returns {damage, rolls, breakdown}
 */
export const calculateDamageD100 = (attacker, action, isCritical = false) => {
  // Base : dés d'arme
  const weaponDice = action.damage_dice || '1d40'; // Épée longue standard
  const weaponRoll = rollDice(weaponDice);
  
  // Modificateur attribut
  const primaryStat = attacker.str || attacker.dex || 15;
  const statMod = getModifier(primaryStat);
  
  // Bonus traits LifePath
  const traitBonus = attacker.bonus_damage || 0;
  
  // Dés bonus (ex: Sneak Attack +1d30)
  let bonusDiceTotal = 0;
  if (attacker.bonus_dice_damage) {
    const bonusRoll = rollDice(attacker.bonus_dice_damage);
    bonusDiceTotal = bonusRoll.total;
  }
  
  // Bonus action (sorts, capacités spéciales)
  const actionBonus = action.damage_bonus || 0;
  
  // CRITIQUE : Double dés (arme + bonus)
  let criticalBonus = 0;
  if (isCritical) {
    const critWeapon = rollDice(weaponDice);
    criticalBonus = critWeapon.total;
    if (attacker.bonus_dice_damage) {
      const critBonusDice = rollDice(attacker.bonus_dice_damage);
      criticalBonus += critBonusDice.total;
    }
  }
  
  // Total final
  const damage = weaponRoll.total + statMod + traitBonus + bonusDiceTotal + actionBonus + criticalBonus;
  
  return {
    damage: Math.max(1, damage), // Minimum 1 dégât
    rolls: {
      weapon: weaponRoll.rolls,
      critical: isCritical ? criticalBonus : 0
    },
    breakdown: {
      weaponDice: weaponRoll.total,
      statMod,
      traitBonus,
      bonusDice: bonusDiceTotal,
      actionBonus,
      critical: criticalBonus,
      total: damage
    }
  };
};

/**
 * Calcul CA d100 pour un combattant
 * @param combatant - Données combattant
 * @returns CA d100
 */
export const calculateCombatantAC = (combatant) => {
  // Si CA déjà définie (ancien système converti), utiliser
  if (combatant.ac && combatant.ac >= 20) {
    return combatant.ac; // Déjà format d100
  }
  
  // Sinon calculer depuis stats
  const baseAC = combatant.armor_ac || 0; // AC armure brute
  const dexMod = getModifier(combatant.dex || 15);
  const armorCategory = combatant.armor_category || 'light';
  const hasShield = combatant.has_shield || false;
  
  return calculateAC(baseAC, dexMod, armorCategory, hasShield);
};

/**
 * Conversion AC ancien (d20) vers nouveau (d100) si nécessaire
 * @param oldAC - CA ancien système (10-22)
 * @returns CA d100 (20-60)
 */
export const convertACtoD100 = (oldAC) => {
  // Si déjà >= 20, probablement déjà d100
  if (oldAC >= 20) return oldAC;
  
  // Conversion : (oldAC × 2.5) + 10
  return Math.round((oldAC * 2.5) + 10);
};

/**
 * Jet de sauvegarde d100
 * @param combatant - Combattant qui fait le jet
 * @param dc - Difficulté
 * @param stat - Stat utilisée (str, dex, con, int, wis, cha)
 * @param level - Niveau du combattant
 * @returns {roll, total, success, isCritical}
 */
export const rollSaveD100 = (combatant, dc, stat = 'dex', level = 1) => {
  const { total: roll, rolls, isCritical } = rollDice('1d100');
  const statMod = getModifier(combatant[stat] || 12);
  const profBonus = getProficiencyBonus(level);
  const total = roll + statMod + profBonus;
  
  return {
    roll: rolls[0],
    total,
    success: total >= dc || isCritical,
    isCritical,
    dc
  };
};

/**
 * Déterminer bonus d'attaque pour ennemis (selon CR)
 * @param cr - Challenge Rating
 * @returns Bonus d'attaque d100
 */
export const getEnemyAttackBonus = (cr) => {
  if (cr <= 2) return 10;     // CR 0-2 : +10
  if (cr <= 5) return 15;     // CR 3-5 : +15
  if (cr <= 10) return 20;    // CR 6-10 : +20
  if (cr <= 15) return 25;    // CR 11-15 : +25
  return 30;                  // CR 16+ : +30
};

/**
 * Exemple de configuration combattant d100
 */
export const COMBATANT_D100_TEMPLATE = {
  // Stats de base (1-30)
  str: 15,
  dex: 14,
  con: 16,
  int: 12,
  wis: 13,
  cha: 10,
  
  // Combat
  level: 5,
  hp: 200,          // HP ×5 (ancien 40 → 200)
  maxHp: 200,
  ac: 32,           // CA d100 (ancien 13 → 32)
  atk: 18,          // Bonus attaque (prof +8 + STR +10)
  
  // Arme
  weapon_name: 'Épée Longue',
  damage_dice: '1d40',  // d100 (ancien 1d8)
  
  // Traits LifePath
  bonus_damage: 5,              // Bonus fixe
  bonus_dice_damage: '1d30',    // Dés bonus (ex: Sneak Attack)
  
  // Armure
  armor_ac: 4,                  // CA base armure (cuir clouté)
  armor_category: 'medium',
  has_shield: false,
  
  // Résistances (inchangées)
  resistances: ['fire'],        // Liste types dégâts
  vulnerabilities: ['cold']
};

/**
 * MESSAGE DE LOG FORMATÉ D100
 */
export const formatCombatLogD100 = (attacker, target, rollData, damageData) => {
  const { roll, modifier, total, success, isCritical } = rollData;
  const { damage, breakdown } = damageData;
  
  let msg = `⚔️ **${attacker.name}** attaque **${target.name}**\n`;
  msg += `🎲 Jet : **${roll}** + ${modifier} = **${total}** vs CA ${target.ac}`;
  
  if (isCritical) {
    msg += ` 💥 **CRITIQUE !**\n`;
    msg += `💀 Dégâts : ${breakdown.weaponDice}×2 + ${breakdown.statMod} + ${breakdown.traitBonus} = **${damage}**`;
  } else if (success) {
    msg += ` ✅\n`;
    msg += `💥 Dégâts : ${breakdown.weaponDice} + ${breakdown.statMod} + ${breakdown.traitBonus} = **${damage}**`;
  } else {
    msg += ` ❌ **RATÉ !**`;
  }
  
  return msg;
};
