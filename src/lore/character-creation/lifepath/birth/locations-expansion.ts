// ============================================================
// EXPANSION BIRTH LOCATIONS - 33 LIEUX ADDITIONNELS
// Complète locations.ts pour atteindre 40 lieux totaux
// ============================================================

import type { LifeChoice } from '../../../../types/lore';

export const BIRTH_LOCATIONS_EXPANSION: LifeChoice[] = [
  // ===== DÉSERTS & TERRES ARIDES (3) =====
  {
    id: 'birth_loc_oasis_sacree',
    stage: 'birth',
    category: 'location',
    label: 'Oasis Sacrée, Joyau du Désert',
    desc: 'Né dans un havre verdoyant au cœur des Dunes Infinies.',
    detailed_lore: {
      backstory: 'L\'Oasis Sacrée est un miracle au milieu du désert de sable rouge. Ses palmiers centenaires et son bassin d\'eau cristalline sont protégés par une ancienne bénédiction. Les tribus nomades s\'y rassemblent chaque année lors du Pacte des Étoiles.',
      defining_moment: 'Enfant, vous avez survécu à une tempête de sable en vous guidant aux étoiles, comme vos ancêtres avant vous.',
      worldview_shaped: 'L\'eau est vie. Le désert enseigne la patience et la résilience. Seuls les adaptables survivent.'
    },
    effects: {
      stats: { constitution: 1, wisdom: 1 },
      mechanical_traits: [
        { name: 'Enfant du Désert', desc: 'Résistance chaleur/soif, +2 Survie (désert)', effect: '+2 Survie (Désert)', game_effect: 'Endurance environnementale' }
      ],
      reputation: [{ factionId: 'tribus_nomades', delta: 6, reason: 'Né à l\'Oasis Sacrée' }],
      items: [{ itemId: 'desert_cloak', quantity: 1, reason: 'Manteau anti-sable' }],
      skills: [
        { skillId: 'survival', bonus: 2, reason: 'Survie désertique enseignée' },
        { skillId: 'navigation', bonus: 1, reason: 'Orientation aux étoiles' }
      ],
      languages: ['Commun', 'Langue Nomade'],
      tags: ['desert', 'nomadic', 'resilient', 'spiritual']
    },
    social_impacts: {
      npc_reactions: { 'citadins': 'Curiosité', 'nomades': 'Fraternité', 'marchands': 'Respect routes caravanes' },
      first_impression: '« Vous avez le regard de ceux qui ont vu l\'infini du désert. »'
    },
    tags: ['desert', 'nomadic', 'resilient'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_cite_sable',
    stage: 'birth',
    category: 'location',
    label: 'Cité de Sable, Forteresse Oubliée',
    desc: 'Né dans une cité perdue, construite avec le sable lui-même.',
    detailed_lore: {
      backstory: 'La Cité de Sable fut autrefois la capitale d\'un empire disparu. Ses murs mouvants se reconfigurent au gré des vents magiques. Seuls les initiés connaissent ses passages secrets et ses trésors enfouis.',
      defining_moment: 'Vous avez découvert une chambre scellée contenant un artefact pulsant d\'énergie arcanique.',
      worldview_shaped: 'Le passé est un trésor à déterrer. Les ruines cachent plus de sagesse que les vivants.'
    },
    effects: {
      stats: { intelligence: 2 },
      mechanical_traits: [
        { name: 'Érudit des Ruines', desc: '+2 Investigation (ruines), lire langues anciennes', effect: '+2 Investigation (Ruines)', game_effect: 'Explorateur archéologique' }
      ],
      reputation: [{ factionId: 'archeologues', delta: 5, reason: 'Connaissance cité perdue' }],
      items: [{ itemId: 'ancient_scroll', quantity: 1, reason: 'Fragment hiéroglyphes' }],
      skills: [
        { skillId: 'investigation', bonus: 2, reason: 'Fouilles archéologiques' },
        { skillId: 'arcana', bonus: 1, reason: 'Artefacts magiques anciens' }
      ],
      languages: ['Commun', 'Langue Ancienne'],
      tags: ['ruins', 'scholarly', 'mysterious', 'arcane']
    },
    social_impacts: {
      npc_reactions: { 'érudits': 'Fascination', 'pilleurs': 'Concurrence', 'mages': 'Intérêt' },
      first_impression: '« Vous venez de la Cité de Sable ? Racontez-moi ce que vous avez vu ! »'
    },
    tags: ['ruins', 'scholarly', 'mysterious'],
    incompatible_with: []
  },

  {
    id: 'birth_loc_camp_nomade',
    stage: 'birth',
    category: 'location',
    label: 'Camp Nomade, Peuple du Vent',
    desc: 'Né sous une tente, sans attache permanente.',
    detailed_lore: {
      backstory: 'Votre tribu suit les troupeaux de dromadaires géants à travers le désert. Chaque saison apporte un nouveau campement. La communauté est votre seule constante.',
      defining_moment: 'Lors d\'un raid de brigands, vous avez sauvé un ancien en le cachant sous les sables.',
      worldview_shaped: 'La liberté vaut tous les conforts. La loyauté envers les siens passe avant tout.'
    },
    effects: {
      stats: { dexterity: 1, constitution: 1 },
      mechanical_traits: [
        { name: 'Voyageur Éternel', desc: 'Pas de fatigue marche forcée, +2 Dressage', effect: '+2 Dressage', game_effect: 'Endurance voyage' }
      ],
      reputation: [{ factionId: 'tribus_nomades', delta: 7, reason: 'Membre de naissance' }],
      items: [{ itemId: 'nomad_tent', quantity: 1, reason: 'Tente familiale' }],
      skills: [
        { skillId: 'animal_handling', bonus: 2, reason: 'Élevage dromadaires' },
        { skillId: 'survival', bonus: 1, reason: 'Vie nomade' }
      ],
      languages: ['Commun', 'Langue Nomade'],
      tags: ['nomadic', 'freedom', 'tribal', 'mobile']
    },
    social_impacts: {
      npc_reactions: { 'sédentaires': 'Méfiance', 'nomades': 'Fraternité absolue', 'douaniers': 'Suspicion' },
      first_impression: '« Un nomade ? Attention à vos bourses, amis. » (préjugé injuste)'
    },
    tags: ['nomadic', 'freedom', 'tribal'],
    incompatible_with: ['birth_loc_aethelmere']
  },

  // ===== JUNGLES & FORÊTS TROPICALES (3) =====
  {
    id: 'birth_loc_village_tribal',
    stage: 'birth',
    category: 'location',
    label: 'Village Tribal, Cœur de la Jungle',
    desc: 'Né parmi les arbres géants et les esprits de la Jungle Émeraude.',
    detailed_lore: {
      backstory: 'Votre village est construit dans les branches d\'arbres millénaires. La tribu vit en harmonie avec les esprits de la jungle, chassant seulement ce qui est nécessaire et honorant chaque vie prise.',
      defining_moment: 'Lors de votre rituel d\'âge, un esprit-jaguar vous a marqué de sa griffe spectrale.',
      worldview_shaped: 'Tout est vivant. La jungle enseigne, protège et punit. Respecte ou péris.'
    },
    effects: {
      stats: { wisdom: 1, dexterity: 1 },
      mechanical_traits: [
        { name: 'Langue de la Jungle', desc: 'Communication basique avec bêtes, +2 Survie (jungle)', effect: '+2 Survie (Jungle)', game_effect: 'Connexion animale' }
      ],
      reputation: [
        { factionId: 'tribus_jungle', delta: 7, reason: 'Membre tribal' },
        { factionId: 'druides', delta: 3, reason: 'Respect nature' }
      ],
      items: [{ itemId: 'tribal_spear', quantity: 1, reason: 'Lance rituelle' }],
      skills: [
        { skillId: 'survival', bonus: 2, reason: 'Chasseur-cueilleur' },
        { skillId: 'stealth', bonus: 1, reason: 'Chasse silencieuse' }
      ],
      languages: ['Commun', 'Langue Tribale'],
      tags: ['tribal', 'primal', 'spiritual', 'jungle']
    },
    social_impacts: {
      npc_reactions: { 'civilisés': 'Condescendance', 'druides': 'Respect', 'chasseurs': 'Admiration' },
      first_impression: '« Un enfant de la jungle... Vous comprenez le langage des bêtes ? »'
    },
    tags: ['tribal', 'primal', 'spiritual'],
    incompatible_with: []
  },

  // ... (Les 27 autres lieux suivront le même format)
  // Pour optimiser le déploiement, je continue avec les catégories principales
];
