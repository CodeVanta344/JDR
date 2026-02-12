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

  {
    id: 'youngadult_prof_mercenary',
    stage: 'youngAdult',
    category: 'profession',
    label: 'Mercenaire',
    desc: 'Vous avez vendu votre lame au plus offrant à travers tout Aethelgard.',
    detailed_lore: {
      backstory: 'Pas de patrie, pas de maîtres, seulement des contrats. Vous avez voyagé de champ de bataille en champ de bataille.',
      defining_moment: 'Un jour, vous avez refusé d\'exécuter un ordre de massacre, perdant votre paye mais sauvant votre honneur.',
      worldview_shaped: 'L\'argent est utile, mais la vie n\'a pas de prix. Tout contrat finit par se payer, d\'une manière ou d\'une autre.'
    },
    effects: {
      stats: { strength: 1, dexterity: 1 },
      mechanical_traits: [
        { name: 'Oeil du Vétéran', desc: 'Peut estimer la force d\'un adversaire au premier regard', game_effect: 'Analyse de combat' }
      ],
      reputation: [{ factionId: 'guildes_mercenaires', delta: 5, reason: 'Réputation de fiabilité' }],
      items: [{ itemId: 'mercenary_contract', quantity: 1, reason: 'Dernier contrat en cours' }],
      skills: [{ skillId: 'survival', bonus: 1, reason: 'Vie nomade' }],
      languages: [],
      tags: ['mercenary', 'traveler', 'pragmatic']
    },
    social_impacts: {
      npc_reactions: { 'soldats': 'Méfiance', 'marchands': 'Utilité', 'hors-la-loi': 'Respect' },
      first_impression: '« Vous avez l\'air de quelqu\'un qui connaît le prix d\'un coup d\'épée. »'
    },
    tags: ['mercenary', 'fighter', 'nomad'],
    incompatible_with: []
  },

  {
    id: 'youngadult_prof_scholar',
    stage: 'youngAdult',
    category: 'profession',
    label: 'Érudit',
    desc: 'Vous avez passé vos meilleures années entre les murs d\'une académie.',
    detailed_lore: {
      backstory: 'Les livres étaient plus réels que le monde extérieur. Vous avez étudié l\'histoire, la magie et la philosophie.',
      defining_moment: 'Dans une archive scellée, vous avez trouvé une mention d\'un artefact oublié qui a changé votre vision du monde.',
      worldview_shaped: 'La connaissance est la seule véritable puissance. Les empires tombent, mais les idées perdurent.'
    },
    effects: {
      stats: { intelligence: 1, wisdom: 1 },
      mechanical_traits: [
        { name: 'Mémoire Prodigieuse', desc: 'Peut se souvenir de détails lus même il y a longtemps', game_effect: 'Bonus de lore' }
      ],
      reputation: [{ factionId: 'academies', delta: 6, reason: 'Élève brillant' }],
      items: [{ itemId: 'scholar_tome', quantity: 1, reason: 'Livre de recherche' }],
      skills: [{ skillId: 'investigation', bonus: 2, reason: 'Méthodes de recherche' }],
      languages: ['Ancien Aethel'],
      tags: ['academic', 'philosopher', 'curious']
    },
    social_impacts: {
      npc_reactions: { 'nobles': 'Respect', 'paysans': 'Incompréhension', 'mages': 'Fraternité' },
      first_impression: '« Vos mains ne sont pas faites pour le travail de la terre, mais votre esprit semble... vaste. »'
    },
    tags: ['scholar', 'academic', 'thinker'],
    incompatible_with: []
  }
];
