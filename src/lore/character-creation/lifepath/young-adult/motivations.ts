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

  {
    id: 'youngadult_motiv_curiosity',
    stage: 'youngAdult',
    category: 'motivation',
    label: 'Curiosité Insatiable',
    desc: 'Le monde est vaste et vous refusez de mourir sans en avoir vu les merveilles.',
    detailed_lore: {
      backstory: 'Les récits de voyageurs et les cartes anciennes ont bercé votre jeunesse. Rester au même endroit vous donne l\'impression de dépérir.',
      defining_moment: 'Le jour où un vieil explorateur vous a légué sa boussole cassée en disant : "Elle montre ce que tu cherches vraiment."',
      worldview_shaped: 'La sécurité est une cage dorée. L\'aventure est la seule façon de se sentir vivant.'
    },
    effects: {
      stats: { perception: 1, wisdom: 1 },
      mechanical_traits: [
        { name: 'Oeil de Voyageur', desc: '+2 Survie pour trouver des chemins, avantage Jet d\'Init en terrain inconnu', game_effect: 'Exploration facilitée' }
      ],
      reputation: [],
      items: [{ itemId: 'broken_compass', quantity: 1, reason: 'Héritage d\'explorateur' }],
      skills: [{ skillId: 'survival', bonus: 1, reason: 'Étude des cartes' }],
      languages: ['Ancien Aethel'],
      tags: ['curious', 'explorer', 'restless']
    },
    social_impacts: {
      npc_reactions: { 'voyageurs': 'Respect', 'sédentaires': 'Incompréhension', 'guides': 'Amitié' },
      first_impression: '« Vous avez le regard de ceux qui ne font que passer. Où allez-vous ? »'
    },
    tags: ['curious', 'explorer', 'restless'],
    incompatible_with: []
  }
];
