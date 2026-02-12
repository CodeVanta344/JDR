// ==========================================================================
// YOUNG ADULT - MOTIVATIONS (30 OPTIONS)
// Raison de devenir aventurier
// ==========================================================================

import type { LifeChoice } from '../../../../types/lore';

export const MOTIVATIONS: LifeChoice[] = [
  {
    id: 'youngadult_motiv_revenge',
    stage: 'youngAdult',
    category: 'motivation',
    label: 'Vengeance',
    desc: 'Quelqu\'un a détruit votre vie. Vous cherchez justice... ou vengeance.',
    detailed_lore: {
      backstory: 'Un seigneur de guerre / mage noir / organisation criminelle a tué vos proches, brûlé votre maison, détruit tout ce qui comptait. Vous vivez pour les traquer.',
      defining_moment: 'Le jour où vous avez juré sur la tombe de [Nom] : "Je les retrouverai. Et ils paieront."',
      worldview_shaped: 'La vengeance est tout ce qui me reste. Rien ne m\'arrêtera.'
    },
    effects: {
      stats: { willpower: 2 },
      mechanical_traits: [
        { name: 'Obsession Vengeresse', desc: '+2 attaque vs cible vengeance, désavantage jets sociaux (froid/distant)', game_effect: 'Focus destructeur' }
      ],
      reputation: [],
      items: [{ itemId: 'wanted_poster', quantity: 1, reason: 'Avis de recherche de la cible' }],
      skills: [{ skillId: 'investigation', bonus: 2, reason: 'Traque obsessionnelle' }],
      languages: [],
      tags: ['vengeful', 'driven', 'dark', 'obsessed']
    },
    social_impacts: {
      npc_reactions: { 'sympathisants': 'Soutien', 'pacifistes': 'Désapprobation', 'ennemis_cible': 'Peur' },
      first_impression: '« Cette rage dans tes yeux... Qui cherches-tu ? »'
    },
    tags: ['vengeful', 'driven', 'dark'],
    incompatible_with: []
  },

  // ... 29 autres motivations : gloire, richesse, connaissance, protection proches,
  // rédemption, devoir, prophétie, curiosité, liberté, découverte, amour, etc.
];
