/**
 * ARC ÉPIQUE 1 : LES SCEAUX BRISÉS
 * 
 * Arc narratif principal de 15 chapitres
 * Durée estimée: 10-20h de jeu
 * Niveau suggéré: 1-20
 * 
 * Synopsis:
 * Les anciens Sceaux qui retiennent le Miroir des Ombres se fissurent. 
 * Les joueurs doivent découvrir qui sabote les sceaux, rallier les factions,
 * voyager dans le Miroir et affronter le Seigneur des Ombres.
 * 
 * 3 fins possibles selon choix moraux
 */

import type { QuestDefinition } from './quests';

// ============================================================================
// CHAPITRE 1 : SIGNES PRÉCURSEURS
// ============================================================================

export const QUEST_SEALED_CH1: QuestDefinition = {
  id: 'quest_sealed_ch1',
  name: 'Les Sceaux Brisés - Chapitre 1 : Signes Précurseurs',
  type: 'main',
  category: 'investigation',
  region: 'Sol-Aureus',
  questGiver: 'npc_old_sam',
  suggestedLevel: 1,
  
  summary: `Des créatures d'ombre surgissent des égouts de Sol-Aureus. La Garde Royale recrute des aventuriers pour enquêter sur ces manifestations inquiétantes.`,
  
  description: `## Signes Précurseurs
  
**Objectif:** Introduction à la menace, découverte du problème

Votre aventure commence au Dragon Rouillé, une taverne animée de Sol-Aureus. Le vieux Sam, un habitué, mentionne des bruits étranges et des créatures d'ombre aperçues dans les égouts récemment.

La Garde Royale, alertée par plusieurs incidents similaires, recrute des aventuriers pour une expédition d'investigation dans les égouts de la ville.

**Événements principaux:**
- Session commence à la taverne Le Dragon Rouillé
- Vieux Sam raconte des rumeurs de créatures d'ombre dans les égouts
- Recrutement par la Garde Royale pour enquête
- Première exploration des égouts → Combat contre Démons d'Ombre (CR 2-3)
- Découverte : Un symbole de Sceau ancien gravé sur les murs, fissuré

**Récompenses:**
- 500 PO
- Titre : "Défenseurs des Égouts"
- +10 Réputation Couronne Sol-Aureus

**Fin du chapitre:**
Après avoir fait votre rapport au Général Marcus, vous apprenez que c'est le 3ème incident similaire cette semaine dans la ville. La Garde est débordée et craint une invasion. Vous êtes convoqués pour une audience avec la Reine Elara elle-même.`,
  
  prerequisites: {
    level: 1
  },
  
  objectives: [
    {
      id: 'talk_old_sam',
      description: 'Parler au Vieux Sam au Dragon Rouillé',
      type: 'talk',
      target: 'npc_old_sam',
      required: true,
      completed: false
    },
    {
      id: 'join_royal_guard',
      description: 'S\'engager avec la Garde Royale pour l\'expédition',
      type: 'talk',
      target: 'npc_general_marcus',
      required: true,
      completed: false
    },
    {
      id: 'explore_sewers',
      description: 'Explorer les égouts de Sol-Aureus',
      type: 'explore',
      target: 'loc_sol_aureus_sewers',
      required: true,
      completed: false
    },
    {
      id: 'defeat_shadow_demons',
      description: 'Vaincre les Démons d\'Ombre (2-3 ennemis)',
      type: 'kill',
      target: 'creature_shadow_demon',
      count: 3,
      required: true,
      completed: false
    },
    {
      id: 'investigate_seal_symbol',
      description: 'Examiner le symbole de Sceau fissuré (Investigation DC 15)',
      type: 'investigate',
      target: 'seal_symbol_1',
      required: true,
      completed: false
    },
    {
      id: 'report_to_marcus',
      description: 'Faire rapport au Général Marcus',
      type: 'talk',
      target: 'npc_general_marcus',
      required: true,
      completed: false
    }
  ],
  
  rewards: {
    gold: 500,
    experience: 300,
    reputation: [
      { faction: 'faction_crown', amount: 10 }
    ],
    titles: ['Défenseurs des Égouts'],
    items: []
  },
  
  followUpQuests: ['quest_sealed_ch2']
};

// ============================================================================
// CHAPITRE 2 : LE PREMIER SCEAU BRISÉ
// ============================================================================

export const QUEST_SEALED_CH2: QuestDefinition = {
  id: 'quest_sealed_ch2',
  name: 'Les Sceaux Brisés - Chapitre 2 : Le Premier Sceau Brisé',
  type: 'main',
  category: 'exploration',
  region: 'Forêt de Cendre',
  questGiver: 'npc_queen_elara',
  suggestedLevel: 4,
  
  summary: `La Reine Elara vous envoie enquêter sur le site du premier Sceau brisé dans la Forêt de Cendre, à 3 jours de voyage de Sol-Aureus.`,
  
  description: `## Le Premier Sceau Brisé

**Objectif:** Enquête sur le site du premier sceau brisé

Audience au palais royal avec la Reine Elara. Elle vous confie une mission de la plus haute importance : voyager vers le Site du Sceau #1, situé dans la dangereuse Forêt de Cendre, et découvrir ce qui s'y passe.

**Événements principaux:**
- Audience avec Reine Elara au palais
- Voyage de 3 jours vers la Forêt de Cendre
- Rencontres aléatoires en route : Bandits (CR 3), Loups Géants (CR 3)
- Arrivée au site : Sceau complètement brisé, portail mineur vers le Miroir ouvert
- Combat majeur : 2x Démons d'Ombre + 1 Succube (CR 4) tentant d'élargir le portail
- Investigation (DC 15) : Traces de sabotage rituel, symboles cultistes découverts

**Récompenses:**
- 1500 PO
- Armes +1 (une par joueur)
- +20 Réputation Couronne
- Fragment de Sceau (item de quête)

**Fin du chapitre:**
Parmi les débris, vous découvrez un journal cultiste mentionnant un certain "Grand Prêtre Malachi" et un "Temple du Miroir" caché quelque part dans les Terres Brûlées. Vous devez retourner à Sol-Aureus pour faire votre rapport.`,
  
  prerequisites: {
    level: 4,
    quests: ['quest_sealed_ch1']
  },
  
  objectives: [
    {
      id: 'audience_queen',
      description: 'Assister à l\'audience avec la Reine Elara',
      type: 'talk',
      target: 'npc_queen_elara',
      required: true,
      completed: false
    },
    {
      id: 'travel_ash_forest',
      description: 'Voyager vers la Forêt de Cendre (3 jours)',
      type: 'travel',
      target: 'loc_ash_forest',
      required: true,
      completed: false
    },
    {
      id: 'reach_seal_site',
      description: 'Atteindre le Site du Sceau #1',
      type: 'explore',
      target: 'loc_seal_site_1',
      required: true,
      completed: false
    },
    {
      id: 'defeat_demons_succubus',
      description: 'Vaincre les démons et la Succube',
      type: 'kill',
      target: 'creature_succubus',
      count: 1,
      required: true,
      completed: false
    },
    {
      id: 'investigate_sabotage',
      description: 'Enquêter sur les traces de sabotage (Investigation DC 15)',
      type: 'investigate',
      target: 'seal_site_1',
      required: true,
      completed: false
    },
    {
      id: 'find_cultist_journal',
      description: 'Trouver et lire le journal cultiste',
      type: 'collect',
      target: 'item_cultist_journal_1',
      count: 1,
      required: true,
      completed: false
    },
    {
      id: 'return_report',
      description: 'Retourner à Sol-Aureus faire rapport',
      type: 'talk',
      target: 'npc_general_marcus',
      required: true,
      completed: false
    }
  ],
  
  rewards: {
    gold: 1500,
    experience: 800,
    reputation: [
      { faction: 'faction_crown', amount: 20 }
    ],
    items: ['item_weapon_plus_one', 'item_seal_fragment_1'],
    titles: []
  },
  
  followUpQuests: ['quest_sealed_ch3']
};

// ============================================================================
// CHAPITRE 3 : ENQUÊTE À SOL-AUREUS
// ============================================================================

export const QUEST_SEALED_CH3: QuestDefinition = {
  id: 'quest_sealed_ch3',
  name: 'Les Sceaux Brisés - Chapitre 3 : Enquête à Sol-Aureus',
  type: 'main',
  category: 'intrigue',
  region: 'Sol-Aureus',
  questGiver: 'npc_general_marcus',
  suggestedLevel: 7,
  
  summary: `Une enquête urbaine pour infiltrer le Culte du Miroir à Sol-Aureus et découvrir les liens du Duc Blackthorn avec les attaques.`,
  
  description: `## Enquête à Sol-Aureus

**Objectif:** Investigation urbaine, infiltration du culte

De retour à Sol-Aureus avec les preuves du sabotage, vous devez maintenant enquêter sur la présence du Culte du Miroir dans la capitale elle-même.

**Événements principaux:**
- Prise de contact avec Lysandra Voile-de-Nuit (espionne de la Couronne)
- Dame Celeste (noble influente) offre son aide
- Pistes : Le Duc Blackthorn est suspect, réunions secrètes au Quartier des Ombres
- Infiltration du bal masqué au Manoir Blackthorn (Stealth DC 16, Persuasion DC 14)
- Découverte : Blackthorn possède un Fragment de Sceau, l'utilise pour invoquer des démons
- Combat optionnel : Fuite du manoir si découverts (6x Gardes + 2x Rejetons Vampiriques)

**Récompenses:**
- 2500 PO
- Informations précieuses sur le culte
- +30 Réputation si preuve exposée publiquement
- Le Duc Blackthorn devient ennemi juré

**Fin du chapitre:**
Vous avez maintenant la preuve que Blackthorn travaille pour le Grand Prêtre Malachi. Un plan se forme : organiser un raid sur le Temple du Miroir dans les Terres Brûlées. Le Général Marcus commence à préparer une expédition militaire.`,
  
  prerequisites: {
    level: 7,
    quests: ['quest_sealed_ch2']
  },
  
  objectives: [
    {
      id: 'meet_lysandra',
      description: 'Rencontrer Lysandra Voile-de-Nuit',
      type: 'talk',
      target: 'npc_lysandra_night_veil',
      required: true,
      completed: false
    },
    {
      id: 'meet_celeste',
      description: 'Rencontrer Dame Celeste',
      type: 'talk',
      target: 'npc_lady_celeste',
      required: true,
      completed: false
    },
    {
      id: 'investigate_shadow_quarter',
      description: 'Enquêter au Quartier des Ombres',
      type: 'investigate',
      target: 'loc_shadow_quarter',
      required: true,
      completed: false
    },
    {
      id: 'infiltrate_ball',
      description: 'Infiltrer le bal masqué (Stealth DC 16 ou Persuasion DC 14)',
      type: 'special',
      target: 'event_blackthorn_ball',
      required: true,
      completed: false
    },
    {
      id: 'discover_fragment',
      description: 'Découvrir que Blackthorn possède un Fragment de Sceau',
      type: 'investigate',
      target: 'item_seal_fragment_blackthorn',
      required: true,
      completed: false
    },
    {
      id: 'escape_or_fight',
      description: 'S\'échapper du manoir (ou combattre si découverts)',
      type: 'special',
      target: 'event_manor_escape',
      required: true,
      completed: false
    },
    {
      id: 'report_findings',
      description: 'Rapporter les découvertes au Général Marcus',
      type: 'talk',
      target: 'npc_general_marcus',
      required: true,
      completed: false
    }
  ],
  
  rewards: {
    gold: 2500,
    experience: 1500,
    reputation: [
      { faction: 'faction_crown', amount: 30 }
    ],
    items: ['item_blackthorn_evidence'],
    titles: []
  },
  
  followUpQuests: ['quest_sealed_ch4']
};

// ============================================================================
// CHAPITRE 4 : TRAHISON À LA COUR
// ============================================================================

export const QUEST_SEALED_CH4: QuestDefinition = {
  id: 'quest_sealed_ch4',
  name: 'Les Sceaux Brisés - Chapitre 4 : Trahison à la Cour',
  type: 'main',
  category: 'combat',
  region: 'Sol-Aureus',
  questGiver: 'npc_general_marcus',
  suggestedLevel: 10,
  
  summary: `Un twist majeur : Dame Celeste est révélée être une agent triple. Elle alerte Malachi et lance une attaque sur le palais royal la nuit avant l'expédition.`,
  
  description: `## Trahison à la Cour

**Objectif:** Révélation du twist, défense du palais

Alors que l'expédition vers les Terres Brûlées est presque prête, la trahison frappe au cœur même de Sol-Aureus.

**Événements principaux:**
- Préparatifs pour l'expédition aux Terres Brûlées
- **TWIST MAJEUR** : Dame Celeste révélée comme agent triple du Culte
- Nuit avant le départ : Attaque massive du palais par Culte + Démons
- Combat défensif épique : 3x Démons d'Ombre, 2x Succubes, 10x Cultistes
- Dame Celeste tente personnellement d'assassiner la Reine Elara (Combat Boss CR 9)
- **Choix moral** : Tuer Dame Celeste ou la capturer vivante ?

**Récompenses:**
- 3500 PO
- Armure +2 OU Arme +2 (au choix)
- +50 Réputation Couronne
- Titre : "Sauveurs de la Reine"
- Si Celeste capturée : Informations précieuses sur le temple

**Fin du chapitre:**
La Reine Elara est blessée mais vivante grâce à votre intervention. Le Grand Prêtre Alduin reçoit une vision prophétique terrifiante : il existe 7 Sceaux au total, 3 sont déjà brisés, et 4 restent en danger. Le temps presse.`,
  
  prerequisites: {
    level: 10,
    quests: ['quest_sealed_ch3']
  },
  
  objectives: [
    {
      id: 'expedition_prep',
      description: 'Participer aux préparatifs de l\'expédition',
      type: 'special',
      target: 'event_expedition_prep',
      required: true,
      completed: false
    },
    {
      id: 'defend_palace',
      description: 'Défendre le palais royal contre l\'attaque',
      type: 'kill',
      target: 'enemy_cultist',
      count: 10,
      required: true,
      completed: false
    },
    {
      id: 'defeat_demons',
      description: 'Vaincre les démons invoqués (3 Démons + 2 Succubes)',
      type: 'kill',
      target: 'creature_shadow_demon',
      count: 3,
      required: true,
      completed: false
    },
    {
      id: 'confront_celeste',
      description: 'Affronter Dame Celeste (Boss CR 9)',
      type: 'kill',
      target: 'npc_lady_celeste_boss',
      count: 1,
      required: true,
      completed: false
    },
    {
      id: 'save_queen',
      description: 'Sauver la Reine Elara de l\'assassinat',
      type: 'special',
      target: 'npc_queen_elara',
      required: true,
      completed: false
    },
    {
      id: 'moral_choice',
      description: 'Choisir : Tuer ou Capturer Dame Celeste',
      type: 'choice',
      target: 'choice_celeste_fate',
      required: true,
      completed: false
    },
    {
      id: 'alduin_vision',
      description: 'Assister à la vision prophétique du Grand Prêtre Alduin',
      type: 'talk',
      target: 'npc_high_priest_alduin',
      required: true,
      completed: false
    }
  ],
  
  rewards: {
    gold: 3500,
    experience: 2500,
    reputation: [
      { faction: 'faction_crown', amount: 50 }
    ],
    items: ['item_armor_plus_two', 'item_weapon_plus_two'],
    titles: ['Sauveurs de la Reine']
  },
  
  followUpQuests: ['quest_sealed_ch5']
};

// ============================================================================
// CHAPITRES 5-15 : RÉSUMÉ STRUCTURÉ
// ============================================================================

/**
 * CHAPITRE 5 : LE VOYAGE VERS HAMMERDEEP (Niveau 12-13)
 * - Alliance avec les nains de Hammerdeep
 * - Protection du Sceau #2 dans les profondeurs
 * - Combat contre colonie de Flagelleurs Mentaux
 * - Récompenses : Équipement Mithril, Alliance Nains-Couronne
 */

export const QUEST_SEALED_CH5: QuestDefinition = {
  id: 'quest_sealed_ch5',
  name: 'Les Sceaux Brisés - Chapitre 5 : Le Voyage vers Hammerdeep',
  type: 'main',
  category: 'exploration',
  region: 'Hammerdeep',
  questGiver: 'npc_general_marcus',
  suggestedLevel: 12,
  summary: `Voyage vers la forteresse naine de Hammerdeep pour protéger le Sceau #2 et forger une alliance avec les nains.`,
  description: `Voyage de 2 semaines vers Hammerdeep. Négociation avec le Conseil Nain. Descente au Niveau 12 pour protéger le Sceau #2 des Flagelleurs Mentaux.`,
  prerequisites: { level: 12, quests: ['quest_sealed_ch4'] },
  objectives: [],
  rewards: { gold: 4500, experience: 3500, reputation: [{ faction: 'faction_hammerdeep', amount: 40 }], items: ['item_mithril_equipment'], titles: [] },
  followUpQuests: ['quest_sealed_ch6']
};

/**
 * CHAPITRE 6 : SECRETS NAINS (Niveau 13-14)
 * - Accès aux Archives Secrètes de Hammerdeep
 * - Découverte de l'histoire complète des Sceaux
 * - Révélation : Malachi cherche la Clé Primordiale
 */

export const QUEST_SEALED_CH6: QuestDefinition = {
  id: 'quest_sealed_ch6',
  name: 'Les Sceaux Brisés - Chapitre 6 : Secrets Nains',
  type: 'main',
  category: 'investigation',
  region: 'Hammerdeep',
  questGiver: 'npc_archiviste_thorin',
  suggestedLevel: 13,
  summary: `Recherche dans les Archives Secrètes pour comprendre l'origine des Sceaux et la menace du Miroir des Ombres.`,
  description: `Accès rare aux Archives. Révélation que les Sceaux ont été créés à l'Ère de l'Éveil par une alliance Dieux-Mortels. Malachi cherche la Clé Primordiale pour ouvrir totalement le Miroir.`,
  prerequisites: { level: 13, quests: ['quest_sealed_ch5'] },
  objectives: [],
  rewards: { gold: 0, experience: 4000, reputation: [], items: ['item_seal_map', 'item_closure_ritual_grimoire'], titles: [] },
  followUpQuests: ['quest_sealed_ch7']
};

/**
 * CHAPITRE 7 : L'ALLIANCE DU GIVRE (Niveau 14-15)
 * - Alliance avec Jarl Thorgrim à Kuldahar
 * - Épreuve de combat : Duel vs Champion Nord
 * - Défense du Sceau #3 contre Géants du Givre
 */

export const QUEST_SEALED_CH7: QuestDefinition = {
  id: 'quest_sealed_ch7',
  name: 'Les Sceaux Brisés - Chapitre 7 : L\'Alliance du Givre',
  type: 'main',
  category: 'combat',
  region: 'Kuldahar',
  questGiver: 'npc_jarl_thorgrim',
  suggestedLevel: 14,
  summary: `Voyage vers Kuldahar pour forger une alliance avec le Jarl Thorgrim et protéger le Sceau #3.`,
  description: `Conditions extrêmes du Nord. Épreuve de combat pour prouver valeur. Défense du Hall des Glaces contre 6 Géants du Givre. Sceau #3 protégé.`,
  prerequisites: { level: 14, quests: ['quest_sealed_ch6'] },
  objectives: [],
  rewards: { gold: 6000, experience: 5000, reputation: [{ faction: 'faction_kuldahar', amount: 50 }], items: ['item_nordic_legendary_weapon'], titles: ['Ami du Nord'] },
  followUpQuests: ['quest_sealed_ch8']
};

/**
 * CHAPITRE 8 : TERRES BRÛLÉES (Niveau 15-16)
 * - Expédition vers les Terres Brûlées
 * - Combat : Momie Royale, Golem de Bronze
 * - Protection du Sceau #4
 */

export const QUEST_SEALED_CH8: QuestDefinition = {
  id: 'quest_sealed_ch8',
  name: 'Les Sceaux Brisés - Chapitre 8 : Terres Brûlées',
  type: 'main',
  category: 'exploration',
  region: 'Terres Brûlées',
  questGiver: 'npc_general_marcus',
  suggestedLevel: 15,
  summary: `Expédition militaire vers les Terres Brûlées pour protéger le Sceau #4 situé dans les ruines anciennes.`,
  description: `Voyage dans le désert hostile. Combat contre Momie Royale et Golem de Bronze. Protection réussie du Sceau #4.`,
  prerequisites: { level: 15, quests: ['quest_sealed_ch7'] },
  objectives: [],
  rewards: { gold: 7000, experience: 6000, reputation: [{ faction: 'faction_crown', amount: 30 }], items: [], titles: [] },
  followUpQuests: ['quest_sealed_ch9']
};

/**
 * CHAPITRE 9 : RUINES DE L'HÉGÉMONIE (Niveau 16-17)
 * - Exploration des Ruines de l'Hégémonie Ashkan
 * - Découverte de la Clé Primordiale
 * - Combat majeur : Cultistes + Balor (CR 19)
 */

export const QUEST_SEALED_CH9: QuestDefinition = {
  id: 'quest_sealed_ch9',
  name: 'Les Sceaux Brisés - Chapitre 9 : Ruines de l\'Hégémonie',
  type: 'main',
  category: 'combat',
  region: 'Ruines Ashkan',
  questGiver: 'npc_high_priest_alduin',
  suggestedLevel: 16,
  summary: `Exploration des dangereuses Ruines de l'Hégémonie Ashkan pour trouver la Clé Primordiale avant Malachi.`,
  description: `Course contre Malachi. Découverte de la Clé Primordiale dans les profondeurs. Combat épique contre Cultistes et Balor (CR 19). Malachi s'échappe avec la Clé.`,
  prerequisites: { level: 16, quests: ['quest_sealed_ch8'] },
  objectives: [],
  rewards: { gold: 8000, experience: 7000, reputation: [], items: [], titles: [] },
  followUpQuests: ['quest_sealed_ch10']
};

/**
 * CHAPITRE 10 : L'OUVERTURE (Niveau 17-18)
 * - Malachi obtient la Clé avant le groupe
 * - Ouverture du Portail Majeur du Miroir
 * - Début de l'invasion démoniaque
 */

export const QUEST_SEALED_CH10: QuestDefinition = {
  id: 'quest_sealed_ch10',
  name: 'Les Sceaux Brisés - Chapitre 10 : L\'Ouverture',
  title: 'Les Sceaux Brisés - Chapitre 10 : L\'Ouverture',
  type: 'main',
  category: 'defense',
  status: 'not_started',
  level: 17,
  questGiver: 'npc_queen_elara',
  location: 'Sol-Aureus',
  region: 'Sol-Aureus',
  suggestedLevel: 17,
  summary: `Malachi active la Clé Primordiale. Le Portail Majeur du Miroir s'ouvre. L'invasion démoniaque commence.`,
  description: `Défense désespérée de Sol-Aureus. Évacuation des civils. Ralliement des factions alliées. Préparation à entrer dans le Miroir des Ombres.`,
  prerequisites: { level: 17, quests: ['quest_sealed_ch9'] },
  objectives: [],
  rewards: { gold: 10000, experience: 8000, reputation: [{ faction: 'faction_crown', amount: 50 }], items: [], titles: [] },
  followUpQuests: ['quest_sealed_ch11'],
  acts: [],
  isRepeatable: false,
  tags: ['main', 'defense', 'portal']
};

/**
 * CHAPITRE 11 : PREMIER VOYAGE DANS LE MIROIR (Niveau 18)
 * - Entrée dans le Plan du Miroir des Ombres
 * - Survie dans un environnement hostile et alien
 * - Rencontre avec des entités étranges
 */

export const QUEST_SEALED_CH11: QuestDefinition = {
  id: 'quest_sealed_ch11',
  name: 'Les Sceaux Brisés - Chapitre 11 : Premier Voyage dans le Miroir',
  title: 'Les Sceaux Brisés - Chapitre 11 : Premier Voyage dans le Miroir',
  type: 'main',
  category: 'exploration',
  status: 'not_started',
  level: 18,
  questGiver: 'npc_high_priest_alduin',
  location: 'Miroir des Ombres',
  region: 'Miroir des Ombres',
  suggestedLevel: 18,
  summary: `Première incursion dans le dangereux Plan du Miroir des Ombres pour comprendre la menace.`,
  description: `Traversée du portail. Environnement hostile et désorientant. Rencontre avec des entités du Miroir. Découverte de la structure du plan.`,
  prerequisites: { level: 18, quests: ['quest_sealed_ch10'] },
  objectives: [],
  rewards: { gold: 0, experience: 9000, reputation: [], items: ['item_shadow_essence'], titles: [] },
  followUpQuests: ['quest_sealed_ch12'],
  acts: [],
  isRepeatable: false,
  tags: ['main', 'exploration', 'mirror']
};

/**
 * CHAPITRE 12 : LE SEIGNEUR DES OMBRES (Niveau 18-19)
 * - Découverte du Seigneur des Ombres
 * - Reconnaissance de son armée démoniaque
 * - Préparation à l'affrontement final
 */

export const QUEST_SEALED_CH12: QuestDefinition = {
  id: 'quest_sealed_ch12',
  name: 'Les Sceaux Brisés - Chapitre 12 : Le Seigneur des Ombres',
  type: 'main',
  category: 'investigation',
  region: 'Miroir des Ombres',
  questGiver: 'npc_shadow_guide',
  suggestedLevel: 18,
  summary: `Découverte de l'identité et des plans du Seigneur des Ombres, entité ancienne préparant sa manifestation.`,
  description: `Exploration plus profonde du Miroir. Découverte du trône du Seigneur des Ombres. Armée de démons en préparation. Retour pour planifier la riposte.`,
  prerequisites: { level: 18, quests: ['quest_sealed_ch11'] },
  objectives: [],
  rewards: { gold: 0, experience: 10000, reputation: [], items: ['item_shadow_lord_intel'], titles: [] },
  followUpQuests: ['quest_sealed_ch13']
};

/**
 * CHAPITRE 13 : LE CHOIX MORAL MAJEUR (Niveau 19)
 * - Trois options stratégiques présentées
 * - Choix qui déterminera la fin de l'arc
 * - Option A : Sceller le Miroir définitivement (sacrifices nécessaires)
 * - Option B : Détruire le Miroir (risque de déchirure de la réalité)
 * - Option C : Négocier avec le Seigneur des Ombres (devenir serviteurs)
 */

export const QUEST_SEALED_CH13: QuestDefinition = {
  id: 'quest_sealed_ch13',
  name: 'Les Sceaux Brisés - Chapitre 13 : Le Choix Moral',
  type: 'main',
  category: 'decision',
  region: 'Sol-Aureus',
  questGiver: 'npc_council_leaders',
  suggestedLevel: 19,
  summary: `Le Conseil des Leaders présente trois options stratégiques. Votre choix déterminera le sort d'Aethelgard.`,
  description: `## Le Choix Moral Majeur

Trois voies s'offrent à vous :

**Option A : Scellement Éternel**
- Sceller le Miroir définitivement avec un rituel ancien
- Requiert le sacrifice d'un PNJ majeur (Alduin, Marcus, ou Thorgrim)
- Aethelgard sauvé, paix restaurée
- Fin : Héros du Scellement

**Option B : Destruction Totale**
- Détruire le Miroir complètement avec la magie primordiale
- Risque : Réalité d'Aethelgard se déchire partiellement
- Zones d'instabilité permanentes créées
- Fin : Briseurs de Réalité

**Option C : Pacte des Ombres** (Alignement Mauvais requis)
- Négocier avec le Seigneur des Ombres
- Devenir ses Champions en échange de l'épargne d'Aethelgard
- Pouvoirs d'ombre accordés, corruption progressive
- Fin : Champions des Ombres

Ce choix est irréversible et déterminera votre destinée.`,
  prerequisites: { level: 19, quests: ['quest_sealed_ch12'] },
  objectives: [
    {
      id: 'council_meeting',
      description: 'Assister à la réunion du Conseil des Leaders',
      type: 'talk',
      target: 'event_council_meeting',
      required: true,
      completed: false
    },
    {
      id: 'hear_options',
      description: 'Écouter les trois options stratégiques',
      type: 'special',
      target: 'event_strategic_options',
      required: true,
      completed: false
    },
    {
      id: 'make_choice',
      description: 'Faire votre choix : Scellement (A), Destruction (B), ou Pacte (C)',
      type: 'choice',
      target: 'choice_mirror_fate',
      required: true,
      completed: false
    }
  ],
  rewards: { gold: 0, experience: 0, reputation: [], items: [], titles: [] },
  followUpQuests: ['quest_sealed_ch14']
};

/**
 * CHAPITRE 14 : PRÉPARATIFS POUR LA BATAILLE FINALE (Niveau 19-20)
 * - Ralliement de toutes les factions alliées
 * - Forge d'armes légendaires
 * - Préparation stratégique selon le choix du Chapitre 13
 */

export const QUEST_SEALED_CH14: QuestDefinition = {
  id: 'quest_sealed_ch14',
  name: 'Les Sceaux Brisés - Chapitre 14 : Préparatifs pour la Bataille',
  type: 'main',
  category: 'preparation',
  region: 'Multiple',
  questGiver: 'npc_general_marcus',
  suggestedLevel: 19,
  summary: `Ralliement des forces d'Aethelgard et préparation finale avant l'affrontement avec le Seigneur des Ombres.`,
  description: `Mobilisation de toutes les factions. Forge d'armes légendaires par Maître-Forgeron Aldric. Entraînement intensif. Stratégie finale selon choix moral.`,
  prerequisites: { level: 19, quests: ['quest_sealed_ch13'] },
  objectives: [],
  rewards: { gold: 15000, experience: 12000, reputation: [], items: ['item_legendary_weapon', 'item_legendary_armor'], titles: [] },
  followUpQuests: ['quest_sealed_ch15']
};

/**
 * CHAPITRE 15 : CONFRONTATION FINALE (Niveau 20)
 * - Bataille épique dans le Cœur du Miroir
 * - Combat contre le Seigneur des Ombres (CR 25 Boss Légendaire)
 * - 3 phases de combat + Actions Légendaires
 * - Résolution selon le choix du Chapitre 13
 * - Une des 3 fins possibles
 */

export const QUEST_SEALED_CH15: QuestDefinition = {
  id: 'quest_sealed_ch15',
  name: 'Les Sceaux Brisés - Chapitre 15 : Confrontation Finale',
  type: 'main',
  category: 'boss',
  region: 'Miroir des Ombres - Cœur',
  questGiver: 'npc_high_priest_alduin',
  suggestedLevel: 20,
  
  summary: `Affrontement final contre le Seigneur des Ombres dans le Cœur du Miroir. Le sort d'Aethelgard se décide maintenant.`,
  
  description: `## Confrontation Finale

Le moment de vérité est arrivé. Au Cœur du Miroir des Ombres, où la réalité elle-même vacille, vous affrontez le Seigneur des Ombres.

**Combat Épique:**
- Boss CR 25 avec 3 phases de combat
- Actions Légendaires : 3 par tour
- Environnement : Réalité instable, gravité changeante
- Alliés NPC combattent à vos côtés (Marcus, Thorgrim, Alduin selon choix)

**Phase 1 (100%-66% HP):**
- Attaques physiques puissantes
- Invocation de Démons d'Ombre
- Téléportation

**Phase 2 (66%-33% HP):**
- Magie d'ombre dévastatrice
- Drain de vie massif
- Zone d'obscurité totale

**Phase 3 (33%-0% HP):**
- Forme ultime révélée
- Attaques combinées physique + magique
- Tentative de corruption des joueurs

**Résolution:**
Selon votre choix du Chapitre 13, une des trois fins se déclenchera après la victoire.

**Fin A : Scellement Éternel**
- Rituel de scellement réussi
- Sacrifice du PNJ choisi (scène émotionnelle)
- Miroir scellé pour l'éternité
- Aethelgard sauvé, paix restaurée
- Titre : "Héros du Scellement"
- Récompenses : 50000 PO, Artefact Légendaire, Réputation Max

**Fin B : Destruction Totale**
- Explosion magique primordiale
- Miroir détruit, Plan Ombre implose
- Zones d'instabilité permanentes à Aethelgard
- Portails aléatoires apparaissent périodiquement
- Titre : "Briseurs de Réalité"
- Récompenses : 40000 PO, Armes Artefacts, Nouvelles zones exploration

**Fin C : Pacte des Ombres**
- Négociation finale avec Seigneur Ombres
- Serment de servitude échangé contre paix
- Transformation en Champions des Ombres (classe prestige)
- Pouvoirs d'ombre accordés, corruption commencée
- Toutes factions Bien deviennent ennemis
- Titre : "Champions des Ombres"
- Récompenses : Pouvoirs ombre, Serviteurs démons, Immortalité corrompue`,
  
  prerequisites: {
    level: 20,
    quests: ['quest_sealed_ch14']
  },
  
  objectives: [
    {
      id: 'enter_mirror_heart',
      description: 'Entrer dans le Cœur du Miroir des Ombres',
      type: 'explore',
      target: 'loc_mirror_heart',
      required: true,
      completed: false
    },
    {
      id: 'confront_shadow_lord',
      description: 'Affronter le Seigneur des Ombres',
      type: 'talk',
      target: 'boss_shadow_lord',
      required: true,
      completed: false
    },
    {
      id: 'defeat_phase_1',
      description: 'Survivre à la Phase 1 (100%-66% HP)',
      type: 'combat',
      target: 'boss_shadow_lord_phase_1',
      required: true,
      completed: false
    },
    {
      id: 'defeat_phase_2',
      description: 'Survivre à la Phase 2 (66%-33% HP)',
      type: 'combat',
      target: 'boss_shadow_lord_phase_2',
      required: true,
      completed: false
    },
    {
      id: 'defeat_phase_3',
      description: 'Vaincre la Phase 3 Finale (33%-0% HP)',
      type: 'kill',
      target: 'boss_shadow_lord_phase_3',
      count: 1,
      required: true,
      completed: false
    },
    {
      id: 'execute_resolution',
      description: 'Exécuter la résolution selon le choix moral (A, B, ou C)',
      type: 'special',
      target: 'event_final_resolution',
      required: true,
      completed: false
    }
  ],
  
  rewards: {
    gold: 50000,
    experience: 20000,
    reputation: [
      { faction: 'faction_crown', amount: 100 },
      { faction: 'faction_hammerdeep', amount: 100 },
      { faction: 'faction_kuldahar', amount: 100 }
    ],
    items: ['item_legendary_artifact', 'item_shadow_lord_trophy'],
    titles: ['Héros du Scellement', 'Briseurs de Réalité', 'Champions des Ombres']
  },
  
  followUpQuests: []
};

// ============================================================================
// EXPORT DE L'ARC COMPLET
// ============================================================================

export const ARC_SEALED_ONES_QUESTS: QuestDefinition[] = [
  QUEST_SEALED_CH1,
  QUEST_SEALED_CH2,
  QUEST_SEALED_CH3,
  QUEST_SEALED_CH4,
  QUEST_SEALED_CH5,
  QUEST_SEALED_CH6,
  QUEST_SEALED_CH7,
  QUEST_SEALED_CH8,
  QUEST_SEALED_CH9,
  QUEST_SEALED_CH10,
  QUEST_SEALED_CH11,
  QUEST_SEALED_CH12,
  QUEST_SEALED_CH13,
  QUEST_SEALED_CH14,
  QUEST_SEALED_CH15
];

/**
 * Métadonnées de l'arc
 */
export const ARC_SEALED_ONES_META = {
  id: 'arc_sealed_ones',
  name: 'Les Sceaux Brisés',
  description: 'Arc épique principal - Course contre le temps pour empêcher l\'ouverture du Miroir des Ombres',
  suggestedLevel: { min: 1, max: 20 },
  estimatedHours: { min: 10, max: 20 },
  chapters: 15,
  endings: 3,
  majorChoices: 2,
  majorNPCs: ['npc_queen_elara', 'npc_general_marcus', 'npc_high_priest_alduin', 'npc_jarl_thorgrim', 'npc_lady_celeste'],
  factions: ['faction_crown', 'faction_hammerdeep', 'faction_kuldahar'],
  locations: ['loc_sol_aureus', 'loc_ash_forest', 'loc_hammerdeep', 'loc_kuldahar', 'loc_burned_lands', 'loc_mirror_shadow'],
  themes: ['High Fantasy', 'Heroic', 'Moral Choices', 'Epic Scale', 'Sacrifice']
};
