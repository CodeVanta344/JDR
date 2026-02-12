// ==========================================================================
// YOUNG ADULT - CONNEXIONS (20 OPTIONS)
// Allié / Contact / Ennemi important acquis avant aventure
// ==========================================================================

import type { LifeChoice } from '../../../../types/lore';

export const CONNECTIONS: LifeChoice[] = [
  {
    id: 'youngadult_conn_noble_patron',
    stage: 'youngAdult',
    category: 'connection',
    label: 'Protecteur Noble',
    desc: 'Un noble influent vous a pris sous son aile et finance vos aventures.',
    detailed_lore: {
      backstory: 'Vous avez sauvé la vie de [Nom Noble] ou impressionné lors d\'une démonstration. En retour, il/elle vous offre soutien financier et connexions politiques... en échange de services occasionnels.',
      defining_moment: 'Lors d\'un banquet, votre patron vous a présenté ainsi : "Voici mon protégé. Traitez-le comme vous me traiteriez."',
      worldview_shaped: 'Les connexions ouvrent les portes. Mais chaque faveur a un prix.'
    },
    effects: {
      stats: { charisma: 1 },
      mechanical_traits: [
        { name: 'Patronage Noble', desc: 'Accès cour royale, 500 PO départ, mais quêtes obligatoires périodiques', game_effect: 'Soutien puissant + obligations' }
      ],
      reputation: [{ factionId: 'noblesse', delta: 5, reason: 'Protégé de [Noble]' }],
      items: [{ itemId: 'noble_letter', quantity: 1, reason: 'Lettre de recommandation' }],
      skills: [{ skillId: 'persuasion', bonus: 1, reason: 'Fréquentation aristocratie' }],
      languages: [],
      tags: ['connected', 'wealthy', 'obligated', 'political']
    },
    social_impacts: {
      npc_reactions: { 'nobles': 'Respect', 'roturiers': 'Jalousie', 'rivaux_patron': 'Hostilité' },
      first_impression: '« Vous connaissez [Noble] ? Impressionnant. »'
    },
    tags: ['connected', 'wealthy', 'obligated'],
    incompatible_with: []
  },

  // ... 19 autres connexions : ennemi juré, amour perdu, frère d\'armes, maître guilde,
  // créancier, famille éloignée, traître, contact criminel, allié mystérieux, etc.
];
