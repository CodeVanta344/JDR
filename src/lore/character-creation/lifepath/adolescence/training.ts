// ==========================================================================
// ADOLESCENCE - FORMATIONS (20 OPTIONS)
// Apprentissage spécialisé / Entraînement / Découverte de vocation
// ==========================================================================

import type { LifeChoice } from '../../../../types/lore';

export const TRAININGS: LifeChoice[] = [
  {
    id: 'adolescence_training_warrior_school',
    stage: 'adolescence',
    category: 'training',
    label: 'École de Guerre - Guerrier',
    desc: 'Formation intensive au combat : maniement d\'armes, tactiques, endurance.',
    detailed_lore: {
      backstory: 'Pendant trois ans, vous avez sué sang et eau dans une académie martiale. Lever avant l\'aube, entraînement jusqu\'au crépuscule. Les sparring matches étaient brutaux, les instructeurs impitoyables.',
      defining_moment: 'Lors du tournoi de fin d\'année, vous avez vaincu le champion en titre. Le maître d\'armes vous a remis votre première vraie lame.',
      worldview_shaped: 'La discipline forge les champions. Chaque cicatrice est une leçon. Le combat est un art.'
    },
    effects: {
      stats: { strength: 2, constitution: 1 },
      mechanical_traits: [
        { name: 'Guerrier Formé', desc: '+2 attaque corps-à-corps, maîtrise 3 armes martiales', game_effect: 'Spécialisation combat' }
      ],
      reputation: [{ factionId: 'guerriers', delta: 5, reason: 'Diplômé académie' }],
      items: [{ itemId: 'quality_sword', quantity: 1, reason: 'Arme de graduation' }],
      skills: [
        { skillId: 'athletics', bonus: 2, reason: 'Condition physique extrême' },
        { skillId: 'intimidation', bonus: 1, reason: 'Présence martiale' }
      ],
      languages: [],
      tags: ['warrior', 'disciplined', 'combat', 'martial']
    },
    social_impacts: {
      npc_reactions: { 'soldats': 'Respect', 'civils': 'Admiration ou crainte' },
      first_impression: '« Votre posture trahit un entraînement martial sérieux. »'
    },
    tags: ['warrior', 'disciplined', 'combat'],
    incompatible_with: []
  },

  {
    id: 'adolescence_training_mage_academy',
    stage: 'adolescence',
    category: 'training',
    label: 'Académie de Magie - Mage',
    desc: 'Études arcanes avancées : théorie magique, incantations, contrôle élémentaire.',
    detailed_lore: {
      backstory: 'Vous avez intégré une prestigieuse académie de magie. Tours de cristal, bibliothèques infinies, cours sur les plans élémentaires. Vos doigts portent encore les brûlures des premiers sorts ratés.',
      defining_moment: 'Votre thèse sur la transmutation de la matière a impressionné l\'archimage en personne. "Continuez ainsi, et vous dépasserez vos maîtres", a-t-il dit.',
      worldview_shaped: 'La magie est la forme ultime de connaissance. Les lois de la réalité peuvent être réécrites.'
    },
    effects: {
      stats: { intelligence: 3 },
      mechanical_traits: [
        { name: 'Érudit Arcane', desc: '+3 Arcanes, 3 sorts bonus connus, Rituel magique', game_effect: 'Maître magique' }
      ],
      reputation: [{ factionId: 'mages', delta: 6, reason: 'Diplôme académique' }],
      items: [{ itemId: 'spellbook_advanced', quantity: 1, reason: 'Grimoire personnel' }],
      skills: [
        { skillId: 'arcana', bonus: 3, reason: 'Études intensives' },
        { skillId: 'history', bonus: 1, reason: 'Histoire de la magie' }
      ],
      languages: ['Langue Arcanique'],
      tags: ['mage', 'scholar', 'arcane', 'intellectual']
    },
    social_impacts: {
      npc_reactions: { 'mages': 'Reconnaissance', 'anti-mages': 'Hostilité' },
      first_impression: '« Académie d\'Argent ? Vos sorts doivent être... redoutables. »'
    },
    tags: ['mage', 'scholar', 'arcane'],
    incompatible_with: []
  },

  {
    id: 'adolescence_training_rogue_guild',
    stage: 'adolescence',
    category: 'training',
    label: 'Guilde des Voleurs - Roublard',
    desc: 'Apprentissage des arts de l\'ombre : crochetage, discrétion, assassinat.',
    detailed_lore: {
      backstory: 'La Guilde ne recrute que les meilleurs. Vous avez passé les épreuves : infiltration, vol impossible, contrat d\'élimination. Vous êtes maintenant un ombre parmi les ombres.',
      defining_moment: 'Votre premier "contrat" était un noble corrompu. Vous l\'avez exécuté sans témoin, sans trace. Le maître vous a remis votre lame d\'ombre.',
      worldview_shaped: 'L\'ombre protège. Le silence tue. La discrétion est survie.'
    },
    effects: {
      stats: { dexterity: 3 },
      mechanical_traits: [
        { name: 'Ombre Formée', desc: '+3 Discrétion, Attaque sournoise +2d6, Expertise crochetage', game_effect: 'Assassin expert' }
      ],
      reputation: [{ factionId: 'guilde_voleurs', delta: 7, reason: 'Membre initié' }],
      items: [{ itemId: 'shadow_blade', quantity: 1, reason: 'Dague consacrée' }],
      skills: [
        { skillId: 'stealth', bonus: 3, reason: 'Entraînement intensif' },
        { skillId: 'sleight_of_hand', bonus: 2, reason: 'Pickpocket maître' }
      ],
      languages: ['Cant des Voleurs'],
      tags: ['rogue', 'stealthy', 'criminal', 'deadly']
    },
    social_impacts: {
      npc_reactions: { 'gardes': 'Suspicion extrême', 'criminels': 'Respect' },
      first_impression: '« Tu bouges comme... Tu es de la Guilde, n\'est-ce pas ? »'
    },
    tags: ['rogue', 'stealthy', 'criminal'],
    incompatible_with: []
  },

  // ... 17 autres trainings :
  // - Clerc/Paladin (temple)
  // - Ranger (forêt)
  // - Barde (troupe)
  // - Druide (cercle)
  // - Moine (monastère)
  // - Barbare (tribu)
  // - Sorcier (pacte)
  // - Artisan maître
  // - Navigateur
  // - Alchimiste
  // - Médecin/Guérisseur
  // - Diplomat/Espion
  // - Ingénieur/Inventeur
  // - Chasseur de primes
  // - Gladiateur arène
  // - Ménestrel/Conteur
  // - Autodidacte (livres)
];
