// ============================================================
// EXEMPLE CONVERSION : TRAIT "NOBLE" (Birth - Social Class)
// AVANT (d20) vs APRÈS (d100)
// ============================================================

import type { LifeChoice } from '../../../types/lore';

// ========== ANCIEN SYSTÈME (D20) ==========
export const NOBLE_OLD_D20: LifeChoice = {
  id: 'birth_social_noble',
  stage: 'birth',
  category: 'social_class',
  label: 'Aristocratie - Famille Noble',
  desc: 'Né dans une lignée aristocratique avec titres, terres et influence politique.',
  effects: {
    stats: { charisma: 2, intelligence: 1 },  // Total +3
    mechanical_traits: [
      {
        name: 'Richesse héritée',
        desc: '+500 PO de départ',
        game_effect: 'Équipement luxueux accessible'
      },
      {
        name: 'Connexions aristocratiques',
        desc: '+2 en Persuasion avec nobles',
        game_effect: 'Bonus social aristocratie'
      }
    ],
    reputation: [
      { factionId: 'noblesse', delta: 10, reason: 'Membre aristocratie' }
    ],
    items: [
      { itemId: 'noble_signet_ring', quantity: 1, reason: 'Sceau familial' }
    ],
    skills: [
      { skillId: 'etiquette', bonus: 5, reason: 'Éducation aristocratique' },
      { skillId: 'diplomacy', bonus: 3, reason: 'Entraînement social' },
      { skillId: 'knowledge_history', bonus: 2, reason: 'Tuteurs privés' }
    ],
    languages: ['Commun', 'Langue Classique'],
    tags: ['noble', 'rich', 'educated']
  },
  social_impacts: {
    npc_reactions: {
      'nobles': 'Respect automatique',
      'paysans': 'Déférence ou jalousie',
      'marchands': 'Opportunisme'
    },
    first_impression: '« Messire, quel honneur ! Votre famille est bien connue. »'
  },
  tags: ['social', 'wealth', 'political'],
  incompatible_with: ['birth_social_peasant', 'birth_social_slave']
};

// ========== NOUVEAU SYSTÈME (D100) ==========
export const NOBLE_NEW_D100: LifeChoice = {
  id: 'birth_social_noble',
  stage: 'birth',
  category: 'social_class',
  label: 'Aristocratie - Famille Noble',
  desc: 'Né dans une lignée aristocratique avec titres, terres et influence politique.',
  effects: {
    stats: { 
      charisma: 4,     // Ancien +2 × 2 = +4
      intelligence: 2   // Ancien +1 × 2 = +2
    },  
    mechanical_traits: [
      {
        name: 'Richesse héritée',
        desc: '+2500 PO de départ',  // Ancien 500 × 5 = 2500
        game_effect: 'Équipement luxueux accessible, influence économique'
      },
      {
        name: 'Connexions aristocratiques',
        desc: '+5 en Persuasion avec nobles, +3 en Diplomatie générale',  // Ancien +2 × 2.5 = +5
        game_effect: 'Bonus social aristocratie, portes ouvertes'
      },
      {
        name: 'Éducation supérieure',
        desc: '+1d20 aux jets de Connaissance (Histoire/Noblesse)',
        game_effect: 'Bonus d100 culture aristocratique'
      }
    ],
    reputation: [
      { factionId: 'noblesse', delta: 10, reason: 'Membre aristocratie' },
      { factionId: 'guildes_marchandes', delta: 5, reason: 'Crédit commercial' }
    ],
    items: [
      { itemId: 'noble_signet_ring', quantity: 1, reason: 'Sceau familial' },
      { itemId: 'fine_clothes', quantity: 3, reason: 'Garde-robe de qualité' }
    ],
    skills: [
      { skillId: 'etiquette', bonus: 12, reason: 'Éducation aristocratique' },     // Ancien 5 × 2.5 = 12.5 → 12
      { skillId: 'diplomacy', bonus: 8, reason: 'Entraînement social' },          // Ancien 3 × 2.5 = 7.5 → 8
      { skillId: 'knowledge_history', bonus: 5, reason: 'Tuteurs privés' }        // Ancien 2 × 2.5 = 5
    ],
    languages: ['Commun', 'Langue Classique', 'Langue des Cours'],  // +1 langue bonus
    tags: ['noble', 'rich', 'educated', 'influential']
  },
  social_impacts: {
    npc_reactions: {
      'nobles': 'Respect automatique (+10 disposition)',
      'paysans': 'Déférence ou jalousie (-5 si révolutionnaire)',
      'marchands': 'Opportunisme (+5 deals commerciaux)',
      'gardes': 'Laxisme (+5 aux jets Intimidation/Persuasion)'
    },
    first_impression: '« Messire, quel honneur ! Votre famille est bien connue dans ces contrées. »'
  },
  tags: ['social', 'wealth', 'political'],
  incompatible_with: ['birth_social_peasant', 'birth_social_slave', 'birth_social_outcast']
};

// ========== COMPARAISON LIGNE PAR LIGNE ==========
export const COMPARISON_NOBLE = {
  stats: {
    before: 'CHA +2, INT +1 (total +3)',
    after: 'CHA +4, INT +2 (total +6)',
    factor: '×2 (conversion standard attributs)'
  },
  gold: {
    before: '+500 PO',
    after: '+2500 PO',
    factor: '×5 (ajustement économie d100)'
  },
  skills_etiquette: {
    before: '+5 Étiquette',
    after: '+12 Étiquette',
    factor: '×2.4 (5×2.5=12.5 arrondi 12)'
  },
  skills_diplomacy: {
    before: '+3 Diplomatie',
    after: '+8 Diplomatie',
    factor: '×2.67 (3×2.5=7.5 arrondi 8)'
  },
  social_bonus: {
    before: '+2 Persuasion (nobles)',
    after: '+5 Persuasion (nobles), +3 Diplomatie générale',
    factor: '×2.5 + élargissement effet'
  },
  new_features: {
    added: [
      '+1d20 jets Connaissance (bonus d100 spécifique)',
      '+1 langue supplémentaire (Langue des Cours)',
      '+3 vêtements fins (équipement narratif)',
      'Réaction gardes améliorée (+5 disposition)'
    ],
    reason: 'Enrichissement narratif cohérent avec échelle d100'
  }
};

// ========== VALIDATION ÉQUILIBRAGE ==========
export const NOBLE_BALANCE_CHECK = {
  stats_total: {
    value: 6,  // CHA+4 + INT+2
    max_allowed: 12,  // Phase birth max
    status: '✅ OK (50% budget utilisé)'
  },
  skills_total: {
    value: 25,  // 12+8+5
    max_allowed: 25,  // Phase birth max
    status: '✅ OK (budget complet utilisé, justifié par classe sociale)'
  },
  gold: {
    value: 2500,
    range: 'Riche (500-5000)',
    status: '✅ OK (milieu de fourchette)'
  },
  mechanical_traits: {
    count: 3,
    power_level: 'Modéré (social, pas combat direct)',
    status: '✅ OK (avantages non-combat compensés par désavantages sociaux potentiels)'
  },
  incompatibilities: {
    list: ['peasant', 'slave', 'outcast'],
    reason: 'Mutuellement exclusif avec classes sociales basses',
    status: '✅ OK (cohérence narrative)'
  },
  overall: '✅ ÉQUILIBRÉ - Puissant en social/RP, pas de bonus combat directs'
};
