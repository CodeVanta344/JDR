// ==========================================================================
// YOUNG ADULT - PROFESSIONS (15 OPTIONS)
// Premier métier / Occupation avant l'aventure
// ==========================================================================

import type { LifeChoice } from '../../../../types/lore';

export const PROFESSIONS: LifeChoice[] = [
  {
    id: 'youngadult_prof_soldier',
    stage: 'youngAdult',
    category: 'profession',
    label: 'Soldat Vétéran',
    desc: 'Vous avez servi dans l\'armée régulière pendant plusieurs années.',
    detailed_lore: {
      backstory: 'Campagnes militaires, batailles rangées, sièges... Vous avez vu camarades tomber et ennnemis se rendre. Le code militaire est gravé en vous.',
      defining_moment: 'Après cinq ans de service, vous avez été libéré avec honneur. L\'officier vous a dit : "Le monde a besoin de soldats comme toi."',
      worldview_shaped: 'L\'ordre et la discipline sauvent des vies. Un bon soldat obéit, un grand soldat pense.'
    },
    effects: {
      stats: { strength: 1, constitution: 1 },
      mechanical_traits: [
        { name: 'Vétéran de Guerre', desc: '+1 Initiative, avantage jets Intimidation vs non-combattants', game_effect: 'Expérience combat' }
      ],
      reputation: [{ factionId: 'armee', delta: 6, reason: 'Service honorable' }],
      items: [{ itemId: 'veteran_badge', quantity: 1, reason: 'Médaille de service' }],
      skills: [{ skillId: 'athletics', bonus: 1, reason: 'Maintien physique' }],
      languages: [],
      tags: ['soldier', 'veteran', 'disciplined', 'experienced']
    },
    social_impacts: {
      npc_reactions: { 'militaires': 'Fraternité', 'civils': 'Respect', 'déserteurs': 'Hostilité' },
      first_impression: '« Votre port... Vous avez servi, n\'est-ce pas ? »'
    },
    tags: ['soldier', 'veteran', 'disciplined'],
    incompatible_with: []
  },

  // ... 14 autres professions : mercenaire, artisan, marchand, érudit, prêtre,
  // voleur, garde, explorateur, éclaireur, chasseur, guérisseur, diplomate, etc.
];
