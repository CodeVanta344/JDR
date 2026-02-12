// ==========================================================================
// ADOLESCENCE - RENCONTRES (25 OPTIONS)
// Rencontre décisive avec personne/créature/faction
// ==========================================================================

import type { LifeChoice } from '../../../../types/lore';

export const ENCOUNTERS: LifeChoice[] = [
  {
    id: 'adolescence_encounter_rival',
    stage: 'adolescence',
    category: 'encounter',
    label: 'Rival Talentueux',
    desc: 'Vous avez croisé le chemin d\'un rival d\'âge similaire, tout aussi doué que vous.',
    detailed_lore: {
      backstory: 'Cette personne vous égale en tout. Chaque victoire que vous remportez, elle la remporte aussi. Une rivalité intense mais respectueuse s\'est installée.',
      defining_moment: 'Lors d\'une compétition cruciale, vous vous êtes affrontés. Match nul. "On se reverra", a-t-il/elle dit en souriant.',
      worldview_shaped: 'La compétition me pousse à me dépasser. Mon rival me rend plus fort.'
    },
    effects: {
      stats: { willpower: 1, charisma: 1 },
      mechanical_traits: [
        { name: 'Rivalité Stimulante', desc: '+1 tous jets quand rival présent, PNJ rival récurrent', game_effect: 'Motivation compétitive' }
      ],
      reputation: [],
      items: [],
      skills: [{ skillId: 'athletics', bonus: 1, reason: 'Compétition constante' }],
      languages: [],
      tags: ['rivalry', 'competitive', 'driven', 'respectful']
    },
    social_impacts: {
      npc_reactions: { 'rival': 'Respect compétitif', 'spectateurs': 'Fascination' },
      first_impression: '« Tu as cette flamme dans les yeux... Un rival t\'attend quelque part ? »'
    },
    tags: ['rivalry', 'competitive', 'driven'],
    incompatible_with: []
  },

  // ... 24 autres rencontres : mentor, amour, ennemi juré, créature légendaire,
  // esprit, divinité, voleur célèbre, noble influent, culte, etc.
];
