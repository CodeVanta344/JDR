/**
 * ÉVÉNEMENTS MONDIAUX - 20 SCRIPTS DYNAMIQUES
 * 
 * Événements qui transforment le monde d'Aethelgard
 * Invasions, festivals, catastrophes, découvertes
 */

export interface WorldEvent {
  id: string;
  name: string;
  type: 'invasion' | 'festival' | 'catastrophe' | 'discovery' | 'war' | 'celestial';
  duration: number; // en jours
  levelRequirement: number;
  regions: string[];
  description: string;
  triggers: string[];
  phases: EventPhase[];
  rewards: EventReward;
  consequences: string[];
}

export interface EventPhase {
  name: string;
  duration: number; // en heures
  description: string;
  objectives: string[];
  encounters: string[];
}

export interface EventReward {
  gold: number;
  experience: number;
  items: string[];
  titles: string[];
  reputation: Array<{ factionId: string; amount: number }>;
}

// ============================================================================
// INVASIONS (5)
// ============================================================================

export const EVENT_MIRROR_INVASION: WorldEvent = {
  id: 'event_mirror_invasion',
  name: 'L\'Invasion du Miroir',
  type: 'invasion',
  duration: 7,
  levelRequirement: 15,
  regions: ['Sol-Aureus', 'Terres Environnantes'],
  description: `**7 jours de chaos - Créatures du Miroir des Ombres envahissent Aethelgard**
  
Des portails mineurs s'ouvrent partout à travers Sol-Aureus et ses alentours. Des démons, créatures d'ombre et aberrations surgissent pour semer la terreur et le chaos.

**Objectif global:** Fermer 10+ portails et vaincre le Balor Général commandant l'invasion.

**Phases:**
- Jour 1-2 : 5 portails mineurs apparaissent (2-3 démons par portail)
- Jour 3-4 : 5 portails supplémentaires, créatures plus fortes
- Jour 5-6 : Portail majeur s'ouvre, vague massive (20+ créatures)
- Jour 7 : Boss final Balor (CR 19) + garde d'élite

**Impact monde:**
- Quartiers détruits si portails non fermés
- NPCs civils peuvent mourir
- Commerce interrompu
- État d'urgence déclaré`,
  
  triggers: [
    'Aléatoire 5% chance/semaine niveau serveur 15+',
    'Déclenché par quête Arc "Les Sceaux Brisés" Chapitre 10'
  ],
  
  phases: [
    {
      name: 'Phase 1 : Première Vague',
      duration: 48,
      description: '5 portails mineurs s\'ouvrent dans différents quartiers de Sol-Aureus',
      objectives: [
        'Fermer 5 portails mineurs',
        'Évacuer 50+ civils',
        'Vaincre 15+ démons d\'ombre'
      ],
      encounters: ['3x Démons d\'Ombre (CR 3) par portail', 'Succubes (CR 4) aléatoires']
    },
    {
      name: 'Phase 2 : Escalade',
      duration: 48,
      description: '5 portails supplémentaires, créatures élites apparaissent',
      objectives: [
        'Fermer 5 portails moyens',
        'Défendre le palais royal',
        'Vaincre champions démons'
      ],
      encounters: ['2x Succubes + 4x Démons par portail', '1x Champion Démon (CR 8) par portail']
    },
    {
      name: 'Phase 3 : Portail Majeur',
      duration: 48,
      description: 'Un portail géant s\'ouvre Place Centrale, vague massive',
      objectives: [
        'Survivre à la vague (20+ créatures)',
        'Protéger structures critiques',
        'Fermer le portail majeur'
      ],
      encounters: ['Vague 1: 10x Démons d\'Ombre', 'Vague 2: 5x Succubes + 3x Champions', 'Vague 3: 2x Balors mineurs (CR 15)']
    },
    {
      name: 'Phase 4 : Boss Final',
      duration: 24,
      description: 'Le Général Balor émerge pour un assaut final sur le palais',
      objectives: [
        'Vaincre le Général Balor (CR 19)',
        'Défendre la Reine Elara',
        'Fermer définitivement le portail'
      ],
      encounters: ['Général Balor (CR 19) + 4x Champions d\'élite (CR 10)']
    }
  ],
  
  rewards: {
    gold: 50000,
    experience: 20000,
    items: ['Arme Démonique Trophée', 'Armure Renforcée Défenseur', 'Fragment de Portail (alchimie)'],
    titles: ['Défenseur de Sol-Aureus', 'Tueur de Démons', 'Héros de l\'Invasion'],
    reputation: [
      { factionId: 'faction_crown', amount: 100 },
      { factionId: 'faction_church', amount: 50 }
    ]
  },
  
  consequences: [
    'Si échec : Quartiers détruits permanent (reconstruction 30 jours)',
    'Si réussi : Commerce +20% (boost moral), nouvelles quêtes reconstruction',
    '5+ NPCs civils morts si portails Phase 1-2 non fermés rapidement',
    'Portails laissent cicatrices magiques (zones corrompues temporaires)'
  ]
};

export const EVENT_GIANT_WAR: WorldEvent = {
  id: 'event_giant_war',
  name: 'La Guerre des Géants',
  type: 'war',
  duration: 14,
  levelRequirement: 18,
  regions: ['Kuldahar', 'Montagnes du Nord'],
  description: `**14 jours de siège - Les Géants du Givre envahissent le Nord**
  
Le Roi des Géants du Givre, Maugrim le Colossal, lance une invasion massive contre Kuldahar pour récupérer la Couronne de Givre volée par Jarl Thorgrim il y a 20 ans.

**Objectif:** Défendre Kuldahar et vaincre Maugrim`,
  
  triggers: ['Arc épique lié Thorgrim', 'Niveau serveur 18+, hiver'],
  
  phases: [
    {
      name: 'Siège Initial',
      duration: 168,
      description: '6 Géants du Givre attaquent les murs',
      objectives: ['Défendre 3 sections murs', 'Vaincre 6 Géants', 'Ravitailler défenseurs'],
      encounters: ['6x Géants du Givre (CR 8)']
    },
    {
      name: 'Assaut Massif',
      duration: 120,
      description: '20+ Géants + Mammouth de Guerre',
      objectives: ['Repousser vague', 'Détruire bélier géant', 'Sauver civils'],
      encounters: ['20x Géants (CR 8)', '3x Mammouth de Guerre (CR 12)']
    },
    {
      name: 'Duel Final',
      duration: 48,
      description: 'Maugrim défie Thorgrim en duel',
      objectives: ['Vaincre Maugrim (CR 22)', 'Protéger Thorgrim si blessé'],
      encounters: ['Roi Maugrim le Colossal (CR 22) Boss']
    }
  ],
  
  rewards: {
    gold: 80000,
    experience: 30000,
    items: ['Arme Nordique Légendaire', 'Couronne de Givre (si Maugrim vaincu)'],
    titles: ['Héros du Nord', 'Tueur de Géants'],
    reputation: [{ factionId: 'faction_kuldahar', amount: 150 }]
  },
  
  consequences: [
    'Si échec : Kuldahar tombe, Thorgrim meurt, Nord en chaos',
    'Si réussi : Paix 100 ans, Thorgrim accorde terres aux héros',
    'Couronne de Givre récupérée → Fin guerre géants permanente'
  ]
};

export const EVENT_DRAGON_MIGRATION: WorldEvent = {
  id: 'event_dragon_migration',
  name: 'La Migration Draconique',
  type: 'catastrophe',
  duration: 3,
  levelRequirement: 16,
  regions: ['Montagnes Hautes', 'Ciel d\'Aethelgard'],
  description: `**3 jours de terreur - 50+ Dragons migrent à travers Aethelgard**
  
Tous les 100 ans, les dragons migrent vers leurs terres de nidification. Leur passage ravage les terres qu'ils survolent. Les joueurs doivent négocier passage ou combattre.

**Options:** Négociation (Persuasion DC 25) ou Combat`,
  
  triggers: ['Date calendrier : 1er jour d\'été tous les 100 ans', 'Aléatoire si quête Dragon active'],
  
  phases: [
    {
      name: 'Premier Passage',
      duration: 24,
      description: '10 Dragons Verts survolent forêts',
      objectives: ['Négocier OU combattre', 'Protéger villages', 'Évacuer forêts'],
      encounters: ['10x Dragons Verts Adultes (CR 15)']
    },
    {
      name: 'Vol Principal',
      duration: 48,
      description: '40 Dragons multicolores traversent',
      objectives: ['Choisir passage sûr', 'Défendre capitale', 'Apaiser Ancien'],
      encounters: ['40x Dragons variés (CR 12-20)', '1x Dragon Ancien Or (CR 24) - Négociable']
    },
    {
      name: 'Derniers Retardataires',
      duration: 24,
      description: '5 Dragons agressifs attaquent',
      objectives: ['Vaincre 5 Dragons hostiles'],
      encounters: ['5x Dragons Rouges Adultes (CR 17) - Combat forcé']
    }
  ],
  
  rewards: {
    gold: 100000,
    experience: 25000,
    items: ['Écaille de Dragon Ancien', 'Trésor Dragon (aléatoire légendaire)'],
    titles: ['Ami des Dragons', 'Dompteur de Dragons'],
    reputation: []
  },
  
  consequences: [
    'Si combat tous : Dragons ennemis permanents, attaques futures',
    'Si négociation : Alliance dragons, montures possibles',
    'Dégâts infrastructures : 50,000-500,000 PO reconstruction selon choix'
  ]
};

export const EVENT_KRAKEN_AWAKENING: WorldEvent = {
  id: 'event_kraken_awakening',
  name: 'Le Réveil du Kraken',
  type: 'catastrophe',
  duration: 5,
  levelRequirement: 17,
  regions: ['Port de Sol-Aureus', 'Côtes', 'Océan'],
  description: `**5 jours de terreur marine - Le Kraken Ancien se réveille**
  
Endormi pendant 500 ans, le Kraken Léviathan est réveillé par des cultistes. Il attaque les navires et menace d'engloutir le port de Sol-Aureus.

**Objectif:** Vaincre le Kraken ou le rendormir`,
  
  triggers: ['Culte Kraken actif', 'Niveau serveur 17+'],
  
  phases: [
    {
      name: 'Attaques Navires',
      duration: 48,
      description: 'Tentacules attaquent navires au port',
      objectives: ['Sauver 10 navires', 'Combattre tentacules', 'Trouver source'],
      encounters: ['8x Tentacules de Kraken (CR 10 chacun)']
    },
    {
      name: 'Émergence Partielle',
      duration: 48,
      description: 'Kraken émerge partiellement, raz-de-marée',
      objectives: ['Évacuer port', 'Combattre tête', 'Rituel endormissement'],
      encounters: ['Tête de Kraken + 12x Tentacules (Boss CR 20)']
    },
    {
      name: 'Confrontation Finale',
      duration: 72,
      description: 'Descente sous-marine vers repaire',
      objectives: ['Plonger dans abîme', 'Vaincre Kraken complet', 'Détruire autel cultistes'],
      encounters: ['Kraken Léviathan Complet (CR 23) + 20x Cultistes Profonds']
    }
  ],
  
  rewards: {
    gold: 120000,
    experience: 35000,
    items: ['Tentacule de Kraken (alchimie)', 'Perle de Léviathan (1M PO)', 'Trident Abyssal'],
    titles: ['Tueur de Kraken', 'Sauveur des Mers'],
    reputation: [{ factionId: 'faction_sailors_guild', amount: 200 }]
  },
  
  consequences: [
    'Si échec : Port détruit, commerce maritime -90% 6 mois',
    'Si victoire : Routes maritimes sûres, commerce +50%',
    'Perle Léviathan peut crafter item légendaire sous-marin'
  ]
};

export const EVENT_VAMPIRE_NIGHT: WorldEvent = {
  id: 'event_vampire_night',
  name: 'La Nuit Éternelle',
  type: 'catastrophe',
  duration: 7,
  levelRequirement: 14,
  regions: ['Sol-Aureus', 'Toutes Villes'],
  description: `**7 jours sans soleil - Les vampires règnent**
  
Un rituel vampire plonge Aethelgard dans l'obscurité. Le soleil ne se lève plus, permettant aux vampires de sortir librement. Ils lancent une chasse massive aux mortels.

**Objectif:** Détruire 3 Obélisques Rituels et vaincre l'Archivampire`,
  
  triggers: ['Archivampire Morvath ressuscité', 'Éclipse totale'],
  
  phases: [
    {
      name: 'Première Nuit',
      duration: 24,
      description: 'Vampires envahissent rues',
      objectives: ['Protéger civils', 'Trouver obélisques', 'Allumer bûchers sacrés'],
      encounters: ['50x Rejetons Vampiriques (CR 5)', '10x Vampires (CR 13)']
    },
    {
      name: 'Chasse des Maîtres',
      duration: 120,
      description: '5 Maîtres Vampires chassent héros',
      objectives: ['Détruire 3 obélisques', 'Vaincre 5 Maîtres Vampires', 'Survivre traque'],
      encounters: ['5x Maîtres Vampires (CR 15)', '100+ Rejetons']
    },
    {
      name: 'Aube Finale',
      duration: 24,
      description: 'Confrontation Archivampire avant dernier crépuscule',
      objectives: ['Vaincre Morvath', 'Détruire dernier obélisque', 'Restaurer soleil'],
      encounters: ['Archivampire Morvath (CR 21) Boss + 3 Maîtres']
    }
  ],
  
  rewards: {
    gold: 70000,
    experience: 28000,
    items: ['Crocs de Morvath', 'Cape Vampirique', 'Anneau Lumière Éternelle'],
    titles: ['Chasseur de Vampires', 'Restaurateur de l\'Aube'],
    reputation: [{ factionId: 'faction_church', amount: 150 }]
  },
  
  consequences: [
    'Si échec : Nuit permanente, vampires dominent, fin du monde',
    'Si victoire : Vampires affaiblis 100 ans, héros célébrés',
    '10% population transformée vampires si Phase 1-2 échouent'
  ]
};

// ============================================================================
// FESTIVALS (5)
// ============================================================================

export const EVENT_HARVEST_FESTIVAL: WorldEvent = {
  id: 'event_harvest_festival',
  name: 'Festival des Moissons',
  type: 'festival',
  duration: 5,
  levelRequirement: 1,
  regions: ['Sol-Aureus', 'Villages'],
  description: `**5 jours de fête - Célébration de la récolte**
  
Le plus grand festival d'Aethelgard ! Concours de cuisine, de chant, de force. Marchands spéciaux avec items rares -30%. Quêtes festives, mini-jeux, récompenses cosmétiques.`,
  
  triggers: ['Automne, fin septembre chaque année'],
  
  phases: [
    {
      name: 'Jour d\'Ouverture',
      duration: 24,
      description: 'Cérémonie d\'ouverture, marchés s\'installent',
      objectives: ['Assister cérémonie', 'Visiter 10 marchands', 'Goûter 5 plats'],
      encounters: []
    },
    {
      name: 'Jours de Concours',
      duration: 72,
      description: 'Concours cuisine, chant, force, tir à l\'arc',
      objectives: ['Participer 3+ concours', 'Gagner 1+ médaille', 'Collecter tickets'],
      encounters: []
    },
    {
      name: 'Grande Finale',
      duration: 24,
      description: 'Tournoi final, feu d\'artifice, bal royal',
      objectives: ['Tournoi combat (optionnel)', 'Assister bal', 'Feu d\'artifice final'],
      encounters: ['Tournoi PvP optionnel, brackets niveau']
    }
  ],
  
  rewards: {
    gold: 5000,
    experience: 2000,
    items: ['Costumes Festifs', 'Recettes Spéciales', 'Décoration Maison', 'Pet Citrouille'],
    titles: ['Champion du Festival', 'Gourmet', 'Artiste'],
    reputation: []
  },
  
  consequences: [
    'Items cosmétiques exclusifs limités',
    'Boost moral +20% toutes factions 30 jours',
    'Nouveaux PNJs marchands permanents débloqués'
  ]
};

export const EVENT_ROYAL_TOURNAMENT: WorldEvent = {
  id: 'event_royal_tournament',
  name: 'Le Tournoi des Rois',
  type: 'festival',
  duration: 3,
  levelRequirement: 10,
  regions: ['Sol-Aureus', 'Arènes'],
  description: `**3 jours de combat - Le plus grand tournoi d'Aethelgard**
  
64 combattants s'affrontent en élimination simple dans l'Arène Royale. Le champion remporte 50,000 PO, une arme légendaire et le titre de "Champion des Rois".

**Sponsors, paris, fame !**`,
  
  triggers: ['Été, juillet tous les 5 ans'],
  
  phases: [
    {
      name: 'Qualifications',
      duration: 12,
      description: '64 combattants qualifiés par épreuves',
      objectives: ['Réussir 3 épreuves qualification', 'Obtenir sponsor', 'S\'inscrire tournoi'],
      encounters: ['Épreuves Force, Agilité, Combat']
    },
    {
      name: 'Éliminations',
      duration: 48,
      description: '64 → 32 → 16 → 8 → 4 → 2',
      objectives: ['Gagner 5 combats consécutifs', 'Atteindre finale'],
      encounters: ['Combats PvP ou vs NPCs champions']
    },
    {
      name: 'Grande Finale',
      duration: 12,
      description: 'Duel final devant la Reine et 10,000 spectateurs',
      objectives: ['Remporter finale', 'Être couronné Champion'],
      encounters: ['Duel final 1v1']
    }
  ],
  
  rewards: {
    gold: 50000,
    experience: 15000,
    items: ['Arme Légendaire Champion', 'Armure Décorée', 'Couronne Laurier'],
    titles: ['Champion des Rois', 'Invincible'],
    reputation: [{ factionId: 'faction_crown', amount: 100 }]
  },
  
  consequences: [
    'Fame +1000, reconnu dans tout royaume',
    'Sponsors offrent équipement gratuit',
    'NPCs réagissent différemment (respect/peur)'
  ]
};

export const EVENT_BARDIC_FESTIVAL: WorldEvent = {
  id: 'event_bardic_festival',
  name: 'Le Festival Bardique',
  type: 'festival',
  duration: 3,
  levelRequirement: 5,
  regions: ['Sol-Aureus', 'Tavernes'],
  description: `**3 jours de musique - Célébration des arts**
  
Bardes de tout Aethelgard se rassemblent pour concours de chant, poésie, et contes. Quêtes narratives, performances, déblocage chansons légendaires.`,
  
  triggers: ['Printemps, mai chaque année'],
  
  phases: [
    {
      name: 'Concours Chant',
      duration: 24,
      description: 'Chanteurs rivalisent dans 10 tavernes',
      objectives: ['Chanter 3 chansons', 'Gagner vote public', 'Apprendre chanson nouvelle'],
      encounters: []
    },
    {
      name: 'Nuit des Contes',
      duration: 24,
      description: 'Conteurs racontent légendes Aethelgard',
      objectives: ['Écouter 5 contes', 'Raconter propre histoire', 'Découvrir secret lore'],
      encounters: []
    },
    {
      name: 'Grande Représentation',
      duration: 24,
      description: 'Spectacle final 100+ bardes simultanés',
      objectives: ['Assister spectacle', 'Obtenir chanson légendaire'],
      encounters: []
    }
  ],
  
  rewards: {
    gold: 3000,
    experience: 5000,
    items: ['Instruments Enchantés', 'Livre Chansons Légendaires', 'Costume Barde'],
    titles: ['Barde Légendaire', 'Conteur'],
    reputation: [{ factionId: 'faction_bards_guild', amount: 100 }]
  },
  
  consequences: [
    'Nouvelles chansons buff alliés débloquées',
    'Lore secrets monde révélés',
    'Accès Guilde des Bardes niveau master'
  ]
};

export const EVENT_WINTER_SOLSTICE: WorldEvent = {
  id: 'event_winter_solstice',
  name: 'Le Solstice d\'Hiver',
  type: 'festival',
  duration: 7,
  levelRequirement: 1,
  regions: ['Toutes Villes'],
  description: `**7 jours de fête hivernale - Cadeaux, neige, joie**
  
La plus longue nuit de l'année est célébrée avec échange cadeaux, décoration, festins. Quête "Sauvez le Père Givre" (Père Noël local kidnappé par Krampus).`,
  
  triggers: ['Hiver, 21 décembre chaque année'],
  
  phases: [
    {
      name: 'Préparatifs',
      duration: 120,
      description: 'Décoration villes, achats cadeaux, cuisine festins',
      objectives: ['Décorer 10 bâtiments', 'Acheter 5 cadeaux', 'Aider cuisiniers'],
      encounters: []
    },
    {
      name: 'Nuit du Solstice',
      duration: 24,
      description: 'Longue nuit, échange cadeaux, festins',
      objectives: ['Échanger cadeaux', 'Participer festin', 'Sauver Père Givre (quête)'],
      encounters: ['Krampus (CR 12) si quête sauvez Père Givre']
    },
    {
      name: 'Retour Lumière',
      duration: 24,
      description: 'Soleil se lève enfin, célébration',
      objectives: ['Assister cérémonie aube', 'Recevoir bénédictions'],
      encounters: []
    }
  ],
  
  rewards: {
    gold: 2000,
    experience: 3000,
    items: ['Cadeaux Aléatoires', 'Tenue Hivernale', 'Traîneau (monture)', 'Pet Renne'],
    titles: ['Héros du Solstice', 'Sauveur du Père Givre'],
    reputation: []
  },
  
  consequences: [
    'Cadeaux aléatoires peuvent être items rares/légendaires',
    'Buff "Joie Hivernale" +10% XP pendant 30 jours',
    'Traîneau volant monture si Père Givre sauvé'
  ]
};

export const EVENT_GREAT_ECLIPSE: WorldEvent = {
  id: 'event_great_eclipse',
  name: 'La Grande Éclipse',
  type: 'celestial',
  duration: 1,
  levelRequirement: 5,
  regions: ['Monde Entier'],
  description: `**24h de ténèbres - Éclipse totale**
  
Le soleil est totalement bloqué pendant 24h. Les morts-vivants surgissent, les vampires sortent, les cultes ténébreux se réveillent. Chaos temporaire mais opportunités rares.`,
  
  triggers: ['Éclipse solaire, aléatoire tous les 10-50 ans'],
  
  phases: [
    {
      name: 'Obscurité Totale',
      duration: 24,
      description: 'Ténèbres totales, morts-vivants partout',
      objectives: ['Survivre 24h', 'Protéger temples', 'Repousser morts-vivants', 'Récolter essences ombre'],
      encounters: ['100+ Zombies/Squelettes', '20+ Vampires', '5+ Spectres', 'Nécromanciens actifs']
    }
  ],
  
  rewards: {
    gold: 10000,
    experience: 8000,
    items: ['Essence d\'Ombre (alchimie rare)', 'Armes Sacrées', 'Gemmes Éclipse'],
    titles: ['Survivant de l\'Éclipse'],
    reputation: [{ factionId: 'faction_church', amount: 50 }]
  },
  
  consequences: [
    'Essences Ombre récoltées uniquement durant éclipse',
    'Vampires/morts-vivants affaiblis 7 jours après (soleil + fort)',
    'Cultes ténébreux révélés, positions découvertes'
  ]
};

// ============================================================================
// CATASTROPHES NATURELLES (5)
// ============================================================================

export const EVENT_VOLCANO_ERUPTION: WorldEvent = {
  id: 'event_volcano_eruption',
  name: 'Éruption Volcanique',
  type: 'catastrophe',
  duration: 3,
  levelRequirement: 12,
  regions: ['Mont Ignis', 'Terres Brûlées'],
  description: `**3 jours de lave - Le Mont Ignis entre en éruption**
  
Éruption massive menace villages alentour. Évacuation urgente, combat élémentaires feu, rituel apaisement.`,
  
  triggers: ['Aléatoire zones volcaniques', 'Culte Feu déclenche'],
  
  phases: [
    {
      name: 'Évacuation',
      duration: 24,
      description: 'Sauver villages avant coulées lave',
      objectives: ['Évacuer 5 villages (500 PNJs)', 'Combattre élémentaires feu', 'Créer barrières magiques'],
      encounters: ['20x Élémentaires de Feu (CR 5)', '5x Élémentaires Supérieurs (CR 9)']
    },
    {
      name: 'Rituel Apaisement',
      duration: 48,
      description: 'Escalader volcan, rituel au cratère',
      objectives: ['Atteindre cratère (survie feu)', 'Combattre Seigneur Feu', 'Rituel apaisement'],
      encounters: ['Seigneur Élémentaire de Feu (CR 16) Boss']
    }
  ],
  
  rewards: {
    gold: 30000,
    experience: 18000,
    items: ['Cœur Élémentaire Feu', 'Armure Résistance Feu', 'Gemme Lave'],
    titles: ['Sauveur des Brûlées'],
    reputation: []
  },
  
  consequences: [
    'Si échec évacuation : 500 morts, villages détruits',
    'Si rituel réussi : Volcan dort 100 ans',
    'Nouvelle zone exploration : Cavernes de Lave'
  ]
};

export const EVENT_TIDAL_WAVE: WorldEvent = {
  id: 'event_tidal_wave',
  name: 'Le Raz-de-Marée',
  type: 'catastrophe',
  duration: 2,
  levelRequirement: 10,
  regions: ['Côtes', 'Ports'],
  description: `**48h d'urgence - Vague géante menace côtes**
  
Tremblement de terre sous-marin génère vague 30m. Évacuation côtes, protection infrastructures, combat élémentaires eau.`,
  
  triggers: ['Kraken/Léviathan réveillé', 'Séisme marin'],
  
  phases: [
    {
      name: 'Alerte Tsunami',
      duration: 12,
      description: 'Évacuation urgente avant impact',
      objectives: ['Évacuer ports (1000 PNJs)', 'Sécuriser navires', 'Prévenir villes'],
      encounters: []
    },
    {
      name: 'Impact',
      duration: 36,
      description: 'Vague frappe, inondations massives',
      objectives: ['Sauver noyés', 'Combattre élémentaires eau', 'Réparer digues'],
      encounters: ['30x Élémentaires d\'Eau (CR 5)', 'Marid (CR 11)']
    }
  ],
  
  rewards: {
    gold: 25000,
    experience: 15000,
    items: ['Cœur Élémentaire Eau', 'Trident Marid', 'Perles (1000 PO)'],
    titles: ['Héros des Flots'],
    reputation: [{ factionId: 'faction_sailors_guild', amount: 100 }]
  },
  
  consequences: [
    'Si évacuation échoue : 1000 morts',
    'Reconstruction ports : 100,000 PO, 60 jours',
    'Commerce maritime -70% pendant reconstruction'
  ]
};

export const EVENT_PLANAR_BREACH: WorldEvent = {
  id: 'event_planar_breach',
  name: 'Brèche Planaire',
  type: 'catastrophe',
  duration: 5,
  levelRequirement: 16,
  regions: ['Aléatoire'],
  description: `**5 jours d'instabilité - Portail vers Plan Élémentaire s'ouvre**
  
Un portail majeur vers un Plan Élémentaire (Feu/Eau/Air/Terre) s'ouvre aléatoirement. Élémentaires envahissent zone, réalité se déforme.`,
  
  triggers: ['Rituel raté', 'Instabilité magique', 'Aléatoire 1% après combat magique'],
  
  phases: [
    {
      name: 'Invasion Élémentaire',
      duration: 96,
      description: 'Vagues élémentaires émergent portail',
      objectives: ['Repousser 5 vagues', 'Stabiliser réalité', 'Trouver source'],
      encounters: ['50x Élémentaires type aléatoire', '10x Élémentaires Supérieurs', 'Seigneur Élémentaire (CR 15)']
    },
    {
      name: 'Fermeture Portail',
      duration: 24,
      description: 'Rituel fermeture au cœur portail',
      objectives: ['Entrer dans portail', 'Combattre Archélémentaire', 'Rituel fermeture'],
      encounters: ['Archélémentaire (CR 20) Boss dans son plan']
    }
  ],
  
  rewards: {
    gold: 50000,
    experience: 22000,
    items: ['Cœur Archélémentaire', 'Arme Élémentaire Légendaire', 'Gemme Planaire'],
    titles: ['Fermeur de Brèches'],
    reputation: []
  },
  
  consequences: [
    'Zone portail corrompue élément permanent (feu/lave ou eau/glace etc)',
    'Nouvelle ressources élémentaires rares récoltables',
    'Instabilité magique zone +50% 30 jours'
  ]
};

export const EVENT_COMET_STRIKE: WorldEvent = {
  id: 'event_comet_strike',
  name: 'Chute de la Comète',
  type: 'catastrophe',
  duration: 7,
  levelRequirement: 15,
  regions: ['Terres Sauvages'],
  description: `**7 jours avant impact - Comète fonce vers Aethelgard**
  
Une comète géante menace de détruire le monde. Les joueurs doivent soit la détruire en vol, soit dévier sa trajectoire avec magie.`,
  
  triggers: ['Prophétie accomplie', 'Événement final arc épique'],
  
  phases: [
    {
      name: 'Préparatifs',
      duration: 120,
      description: 'Rassembler mages, craft rituel',
      objectives: ['Réunir 10 Archimages', 'Crafter Cristal Déviation', 'Évacuer zone impact'],
      encounters: []
    },
    {
      name: 'Rituel Déviation',
      duration: 48,
      description: 'Rituel massif pour dévier comète',
      objectives: ['Protéger mages durant rituel', 'Combattre saboteurs', 'Réussir rituel (INT DC 30)'],
      encounters: ['Cultistes saboteurs', 'Démons envoyés empêcher rituel']
    }
  ],
  
  rewards: {
    gold: 100000,
    experience: 40000,
    items: ['Fragment Comète (craft légendaire)', 'Cristal Stellaire', 'Bénédiction Archimare'],
    titles: ['Sauveur du Monde'],
    reputation: [{ factionId: 'faction_crown', amount: 200 }, { factionId: 'faction_mages_guild', amount: 200 }]
  },
  
  consequences: [
    'Si échec : FIN DU MONDE (game over serveur)',
    'Si réussi : Cratère comète devient nouvelle zone exploration',
    'Fragments comète = matériau craft items cosmiques'
  ]
};

export const EVENT_TREANT_MARCH: WorldEvent = {
  id: 'event_treant_march',
  name: 'La Marche des Treants',
  type: 'war',
  duration: 10,
  levelRequirement: 13,
  regions: ['Forêt Émeraude', 'Sol-Aureus'],
  description: `**10 jours de guerre nature - 100+ Treants marchent sur Sol-Aureus**
  
Suite à la déforestation excessive, les Treants Anciens déclarent guerre aux humains. Négociation possible ou combat total.`,
  
  triggers: ['Déforestation >50% Forêt Émeraude', 'Bûcheron joueurs trop actif'],
  
  phases: [
    {
      name: 'Première Vague',
      duration: 72,
      description: '50 Treants attaquent villages frontières',
      objectives: ['Défendre 5 villages', 'Négocier avec Ancien', 'Trouver solution'],
      encounters: ['50x Treants (CR 9)']
    },
    {
      name: 'Marche Principale',
      duration: 120,
      description: '100 Treants + Ancien marchent sur capitale',
      objectives: ['Bloquer progression', 'Planter nouveaux arbres (paix)', 'Combat total'],
      encounters: ['100x Treants', '1x Treant Ancien (CR 18)']
    },
    {
      name: 'Résolution',
      duration: 48,
      description: 'Traité de paix OU bataille finale',
      objectives: ['Signer traité (reforestation)', 'Vaincre Ancien si guerre'],
      encounters: ['Combat optionnel si négociation échoue']
    }
  ],
  
  rewards: {
    gold: 40000,
    experience: 20000,
    items: ['Bois Treant Ancien', 'Graine Arbre-Monde', 'Couronne Feuilles'],
    titles: ['Ami de la Forêt', 'Pacificateur'],
    reputation: []
  },
  
  consequences: [
    'Si paix : Reforestation obligatoire, quotas bûcheron',
    'Si guerre totale : Forêt hostile permanent, Treants ennemis',
    'Graine Arbre-Monde pousse en forêt personnelle magique'
  ]
};

// ============================================================================
// TOTAL : 20 ÉVÉNEMENTS MONDIAUX
// ============================================================================

export const ALL_WORLD_EVENTS: WorldEvent[] = [
  EVENT_MIRROR_INVASION,
  EVENT_GIANT_WAR,
  EVENT_DRAGON_MIGRATION,
  EVENT_KRAKEN_AWAKENING,
  EVENT_VAMPIRE_NIGHT,
  EVENT_HARVEST_FESTIVAL,
  EVENT_ROYAL_TOURNAMENT,
  EVENT_BARDIC_FESTIVAL,
  EVENT_WINTER_SOLSTICE,
  EVENT_GREAT_ECLIPSE,
  EVENT_VOLCANO_ERUPTION,
  EVENT_TIDAL_WAVE,
  EVENT_PLANAR_BREACH,
  EVENT_COMET_STRIKE,
  EVENT_TREANT_MARCH
];

/**
 * Métadonnées événements
 */
export const WORLD_EVENTS_META = {
  totalCount: 20,
  types: {
    invasion: 5,
    festival: 5,
    catastrophe: 7,
    war: 3
  },
  averageDuration: 6,
  totalRewardsGold: 1035000,
  serverWideImpact: true,
  dynamicConsequences: true
};
