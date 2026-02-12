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

  {
    id: 'youngadult_conn_lost_love',
    stage: 'youngAdult',
    category: 'connection',
    label: 'Amour de Jeunesse',
    desc: 'Une personne importante de votre passé compte toujours pour vous, même si vos chemins ont divergé.',
    detailed_lore: {
      backstory: 'Vous avez grandi ensemble, aviez des projets, mais les circonstances (guerre, famille, destin) vous ont séparés.',
      defining_moment: 'Leur dernier regard avant de partir, et la promesse de vous revoir un jour sous le Grand If de [Lieu].',
      worldview_shaped: 'Le cœur a ses raisons. Parfois, on voyage pour fuir les souvenirs, parfois pour les retrouver.'
    },
    effects: {
      stats: { charisma: 1, willpower: 1 },
      mechanical_traits: [
        { name: 'Force du Cœur', desc: 'Avantage contre la peur quand vous agissez pour protéger un être cher', game_effect: 'Résistance psychologique' }
      ],
      reputation: [],
      items: [{ itemId: 'love_locket', quantity: 1, reason: 'Souvenir précieux' }],
      skills: [{ skillId: 'insight', bonus: 1, reason: 'Sensibilité accrue' }],
      languages: [],
      tags: ['romantic', 'nostalgic', 'driven']
    },
    social_impacts: {
      npc_reactions: { 'romantiques': 'Sympathie', 'pragmatiques': 'Dédain', 'rivaux': 'Levier de chantage' },
      first_impression: '« Il y a une certaine mélancolie dans votre sourire... Un regret, peut-être ? »'
    },
    tags: ['romantic', 'nostalgic', 'driven'],
    incompatible_with: []
  }
];
