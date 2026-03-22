/**
 * STANDALONE SIDE QUESTS
 * Quêtes secondaires supplémentaires qui peuvent être jouées à n'importe
 * quel moment de la campagne, indépendamment des chapitres.
 * Organisées par région et difficulté.
 */
import type { SideQuest } from './types';

// ────────────────────────────────────────────────────────────────────
// Quêtes des Plaines Centrales
// ────────────────────────────────────────────────────────────────────
export const QUESTS_PLAINES: SideQuest[] = [
  {
    id: 'sq_contrebandiers_carrefour',
    title: 'Les Contrebandiers du Carrefour',
    description: 'Un réseau de contrebandiers utilise l\'Auberge du Carrefour Doré comme point de passage pour des armes volées. L\'aubergiste Marta soupçonne mais n\'ose pas agir.',
    giver: 'Marta (aubergiste)',
    hookText: '"Des chariots arrivent la nuit, trop lourds pour du grain. Je n\'aime pas ça, mais j\'ai des clients à protéger. Peut-être que des aventuriers pourraient... regarder discrètement ?"',
    reward: '200 PO + gratitude de Marta (prix divisés par 2 à l\'auberge pour toujours) + les armes confisquées (3 épées longues, 5 arbalètes)',
    objectives: [
      'Observer les livraisons nocturnes (Perception DC 12)',
      'Suivre le chariot jusqu\'à la cache (Discrétion DC 13)',
      'Neutraliser les 4 contrebandiers (CR 1/2 chacun) ou les capturer (Intimidation DC 14)',
      'Décider : remettre les armes aux autorités ou les garder'
    ],
    consequenceIfIgnored: 'Les armes finissent chez les cultistes au ch6. +2 ennemis supplémentaires.',
    estimatedMinutes: 40, difficulty: 'facile'
  },
  {
    id: 'sq_fantome_moulin',
    title: 'Le Fantôme du Vieux Moulin',
    description: 'Un moulin abandonné est hanté par l\'esprit d\'une meunière assassinée par des bandits. Elle ne peut trouver le repos tant que son assassin n\'est pas traduit en justice.',
    giver: 'Villageois effrayés',
    hookText: '"Le moulin grince la nuit, alors qu\'il n\'y a pas de vent. Et on entend des sanglots. Personne n\'ose y aller."',
    reward: 'Anneau de Protection +1 (caché dans le moulin) + 100 PO de récompense du village',
    objectives: [
      'Entrer dans le moulin et contacter l\'esprit (Religion DC 10 ou Arcanes DC 12)',
      'Écouter son histoire et retenir le nom de l\'assassin : Vareks',
      'Trouver Vareks — il est devenu un bandit de grand chemin sur la route de Sol-Aureus (Investigation DC 13)',
      'L\'affronter (Bandit capitaine CR 2) et le capturer ou le tuer',
      'Revenir au moulin — l\'esprit trouve le repos, laissant l\'Anneau'
    ],
    consequenceIfIgnored: 'Le fantôme devient agressif et attaque les voyageurs nocturnes (poltergeist CR 2).',
    estimatedMinutes: 45, difficulty: 'moyen'
  },
  {
    id: 'sq_course_chevaux',
    title: 'La Grande Course de Sol-Aureus',
    description: 'Une course annuelle de chevaux traverse Sol-Aureus. Les PJ peuvent participer, parier, ou enquêter sur un participant qui triche.',
    giver: 'Auto-découverte (événement de la ville)',
    reward: '300 PO pour le vainqueur + Cheval de guerre léger + renommée à Sol-Aureus',
    objectives: [
      'S\'inscrire à la course (50 PO de frais)',
      'La course : 3 jets de Dressage DC 12/14/16 — chaque échec = pénalité de temps',
      'Optionnel : Perception DC 13 → un participant utilise de la magie pour accélérer son cheval',
      'Exposer le tricheur (Arcanes DC 12 pour prouver la magie) → disqualification + gratitude de l\'organisateur'
    ],
    consequenceIfIgnored: 'Le tricheur gagne et utilise ses gains pour financer des activités suspectes liées au culte.',
    estimatedMinutes: 30, difficulty: 'facile'
  }
];

// ────────────────────────────────────────────────────────────────────
// Quêtes des Montagnes d'Acier
// ────────────────────────────────────────────────────────────────────
export const QUESTS_MONTAGNES: SideQuest[] = [
  {
    id: 'sq_fournaise_eternelle',
    title: 'La Fournaise Éternelle',
    description: 'La Grande Forge d\'Hammerdeep est menacée — sa flamme éternelle, alimentée par un élémentaire de feu lié, s\'affaiblit. L\'élémentaire est en train de mourir.',
    giver: 'Forge-Maître Kelda',
    hookText: '"La Fournaise brûle depuis 800 ans. Si elle s\'éteint, Hammerdeep perd sa capacité à forger. Nous devons trouver un moyen de raviver l\'élémentaire — ou d\'en invoquer un nouveau."',
    reward: 'Arme ou armure forgée sur mesure dans le mithral (+1 et un enchantement au choix du MJ) + Alliance renforcée avec les nains',
    objectives: [
      'Examiner l\'élémentaire mourant (Arcanes DC 14)',
      'Option A : trouver du combustible élémentaire — magma pur de la Veine de Feu (mini-donjon, 3 salles)',
      'Option B : libérer l\'élémentaire et négocier avec un nouveau (Persuasion DC 16 auprès d\'un élémentaire libre)',
      'Option C : créer un lien artificiel (Arcanes DC 17, nécessite un diamant de 500 PO)'
    ],
    consequenceIfIgnored: 'La Fournaise s\'éteint en 2 chapitres. Les nains ne peuvent plus forger d\'armes magiques pour la guerre.',
    estimatedMinutes: 60, difficulty: 'difficile'
  },
  {
    id: 'sq_golem_errant',
    title: 'Le Golem Errant de Khardum',
    description: 'Un golem de pierre construit il y a des siècles erre dans les tunnels sous Hammerdeep. Il est inoffensif mais détruit tout sur son passage. Les nains n\'arrivent pas à l\'arrêter.',
    giver: 'Thane Durinn',
    hookText: '"Cette chose détruit nos tunnels de ravitaillement. Nous avons essayé la force — ça ne marche pas. Peut-être que des esprits plus... créatifs pourraient trouver une solution."',
    reward: '200 PO + Si le golem est reprogrammé : allié golem pour 1 combat futur (CR 5, 75 PV)',
    objectives: [
      'Trouver le golem dans les tunnels (3 heures de recherche ou Survie DC 12)',
      'Observer ses patterns (Perception DC 11 → il suit un circuit, cherchant "le maître")',
      'Option A : Le désactiver (Arcanes DC 16 — trouver le mot de commande sur une inscription murale)',
      'Option B : Le reprogrammer (Arcanes DC 18 — redevient un gardien d\'Hammerdeep)',
      'Option C : Le détruire (CA 17, 133 PV, CR 5 — combat difficile dans un tunnel étroit)'
    ],
    consequenceIfIgnored: 'Le golem atteint la Grande Forge et cause des dégâts structurels. -1 chapitre avant que la Fournaise s\'éteigne.',
    estimatedMinutes: 45, difficulty: 'difficile'
  }
];

// ────────────────────────────────────────────────────────────────────
// Quêtes de la Sylve d'Émeraude
// ────────────────────────────────────────────────────────────────────
export const QUESTS_SYLVE: SideQuest[] = [
  {
    id: 'sq_chant_riviere',
    title: 'Le Chant de la Rivière d\'Argent',
    description: 'La Rivière d\'Argent, source de la magie elfique, est polluée par de la corruption nécrotique en amont. Les elfes demandent aux PJ de remonter le cours d\'eau et de purifier la source.',
    giver: 'Gardien des Eaux, Naelen',
    hookText: '"L\'eau qui coule dans nos veines vient de cette rivière. Sa magie nous lie aux arbres, aux animaux, à tout. Si elle meurt, nous mourrons — lentement, mais certainement."',
    reward: 'Cape d\'Invisibilité (1 utilisation/jour, 10 minutes) + Carte marine de la Sylve (avantage Survie dans la forêt)',
    objectives: [
      'Remonter la rivière pendant 1 jour (Survie DC 11)',
      'Affronter un Vodyanoi corrompu (CR 4, créature aquatique) à la source',
      'Purifier la source (Religion DC 13 ou verser l\'Eau de Vérité dessus)',
      'Détruire le totem nécrotique planté par les cultistes (CA 12, 15 PV, mais protégé par un piège : Perception DC 14, 3d6 nécrotique)'
    ],
    consequenceIfIgnored: 'La corruption s\'étend. Les elfes perdent 30% de leur magie de guérison au ch9. Les archers elfiques combattent avec désavantage au ch11.',
    estimatedMinutes: 50, difficulty: 'difficile'
  },
  {
    id: 'sq_treant_ancien',
    title: 'Le Tréant Ancien Endormi',
    description: 'Un tréant millénaire, Barkroot, dort depuis un siècle. Les druides croient qu\'il peut être réveillé pour défendre la forêt — mais réveiller un tréant est dangereux.',
    giver: 'Archidruide Faelen',
    reward: 'Barkroot rejoint la bataille finale au ch11 comme allié (CR 9, 138 PV) + Bâton de bois vivant (focalisateur +1)',
    objectives: [
      'Trouver Barkroot dans le Bosquet Profond (Survie DC 13, 4 heures de marche)',
      'Rassembler 3 ingrédients du rituel : Rosée de l\'aube (Survie DC 10), Chant des grillons (Représentation DC 12), Larme de dryade (Persuasion DC 14 auprès de Sylphia)',
      'Exécuter le rituel (Religion DC 14 collectif — chaque PJ contribue)',
      'Calmer Barkroot à son réveil (Nature DC 16 — il est confus et agressif pendant 1 minute)',
      'Lui expliquer la menace (Persuasion DC 12 — il se souvient de la dernière guerre contre Malachor)'
    ],
    consequenceIfIgnored: 'Barkroot reste endormi. Un allié puissant en moins au ch11.',
    estimatedMinutes: 55, difficulty: 'difficile'
  }
];

// ────────────────────────────────────────────────────────────────────
// Quêtes des Plaines de Cendres / Terres Mortes
// ────────────────────────────────────────────────────────────────────
export const QUESTS_CENDRES: SideQuest[] = [
  {
    id: 'sq_caravane_perdue',
    title: 'La Caravane Perdue',
    description: 'Une caravane de ravitaillement militaire a disparu dans les Plaines de Cendres. 20 soldats, 3 chariots de vivres et d\'armes. Sans eux, l\'armée alliée aura des pénuries.',
    giver: 'Intendant-chef Marek',
    hookText: '"La caravane devait arriver il y a 3 jours. Si ces provisions ne nous parviennent pas, nos soldats combattront le ventre vide et les mains nues."',
    reward: 'Provisions restaurées (bonus moral armée : +1 aux jets de bataille au ch11) + 150 PO + gratitude militaire',
    objectives: [
      'Suivre la piste de la caravane (Survie DC 12)',
      'Découvrir le site de l\'embuscade (Investigation DC 11 → cultistes)',
      'Suivre les traces vers un camp cultiste caché (Perception DC 13)',
      'Libérer les survivants (8 soldats + 1 sergente) et récupérer au moins 2 chariots',
      'Combattre les 6 cultistes (CR 1) et 1 nécromancien (CR 3) qui gardent le camp'
    ],
    consequenceIfIgnored: 'Pénuries à l\'armée. Les soldats combattent avec malus -1 aux attaques au ch11.',
    estimatedMinutes: 50, difficulty: 'difficile'
  },
  {
    id: 'sq_sanctuaire_oublie',
    title: 'Le Sanctuaire Oublié de l\'Aube',
    description: 'Les écrits de la Bibliothèque de Sol-Aureus mentionnent un ancien sanctuaire de l\'Ordre de l\'Aube caché dans les Plaines de Cendres. Ses reliques pourraient aider contre la corruption.',
    giver: 'Bibliothécaire Phaedra (Sol-Aureus)',
    hookText: '"J\'ai trouvé une référence à un sanctuaire souterrain, protégé par des sceaux de lumière. Si ces sceaux tiennent encore, les reliques à l\'intérieur pourraient changer le cours de la guerre."',
    reward: 'Relique de l\'Aube : amulette qui confère résistance aux dégâts nécrotiques (1 PJ) + 3 fioles d\'Eau Bénite Supérieure (3d6 radiant au lieu de 2d6)',
    objectives: [
      'Localiser le sanctuaire avec les indices de Phaedra (Investigation DC 13)',
      'Ouvrir le sceau d\'entrée (Religion DC 12 + 1 sort de niveau 2 radiant ou divin)',
      'Naviguer les 4 salles du sanctuaire (puzzles de lumière, pas de combat)',
      'Salle finale : un gardien spectral teste les PJ — 3 questions morales. Répondre honnêtement (pas de jet) → il offre les reliques',
      'Si les PJ mentent au gardien : le sanctuaire se referme et les piège (JDS Force DC 15 pour sortir, 2d6 radiant par round)'
    ],
    consequenceIfIgnored: 'La relique reste enterrée. Pas de résistance nécrotique pour le boss final.',
    estimatedMinutes: 45, difficulty: 'moyen'
  }
];

// ────────────────────────────────────────────────────────────────────
// Quêtes de Sol-Aureus
// ────────────────────────────────────────────────────────────────────
export const QUESTS_SOL_AUREUS: SideQuest[] = [
  {
    id: 'sq_assassin_ombre',
    title: 'L\'Assassin dans l\'Ombre',
    description: 'Quelqu\'un tente d\'assassiner les membres du Conseil Royal de Sol-Aureus. Les PJ doivent protéger le prochain conseiller visé et démasquer l\'assassin.',
    giver: 'Capitaine de la Garde, Lysander',
    hookText: '"Deux conseillers sont morts avec la même marque — un croissant inversé gravé sur la gorge. Le troisième, Dame Elara, est la prochaine. J\'ai besoin de quelqu\'un qui ne figure pas sur les registres du palais."',
    reward: 'Dague de l\'Ombre (dague +1, le porteur peut lancer Invisibilité 1 fois/jour) + accès aux archives secrètes du palais',
    objectives: [
      'Protéger Dame Elara pendant 2 jours (plusieurs jets de Perception DC 12-15)',
      'Repérer l\'assassin (Perception DC 15 lors de la tentative)',
      'Poursuivre l\'assassin dans les rues de Sol-Aureus (course-poursuite : 3 jets d\'Athlétisme/Acrobaties DC 13)',
      'Le capturer (combat : Assassin CR 4) ou le suivre jusqu\'à son commanditaire',
      'Découvrir que le commanditaire est un conseiller corrompu par le culte (Perspicacité DC 14 lors de l\'interrogatoire)'
    ],
    consequenceIfIgnored: 'Dame Elara meurt. Le conseiller corrompu prend sa place au conseil. Malus politique au ch9.',
    estimatedMinutes: 60, difficulty: 'difficile'
  },
  {
    id: 'sq_refugies_tensions',
    title: 'Tensions au Camp de Réfugiés',
    description: 'Le camp de réfugiés de Sol-Aureus déborde. Des tensions entre réfugiés et citadins menacent d\'exploser en émeute. Les PJ doivent trouver une solution.',
    giver: 'Intendante Sera (gestion des réfugiés)',
    hookText: '"Ce matin, un boulanger a refusé de vendre du pain à une réfugiée. Cet après-midi, ses fenêtres étaient brisées. Demain, ce sera pire. J\'ai besoin de quelqu\'un qui sait parler aux gens — des deux côtés."',
    reward: '100 PO + 10 volontaires réfugiés (renforts au ch11, combattants de niveau 1 mais nombreux) + réputation positive',
    objectives: [
      'Parler aux réfugiés et comprendre leurs griefs (Persuasion DC 10)',
      'Parler aux citadins et comprendre leurs peurs (Persuasion DC 11)',
      'Trouver une solution : organiser un marché commun (Performance DC 12), un chantier de construction (Athlétisme DC 11 pour aider), ou un discours fédérateur (Persuasion DC 15)',
      'Gérer un incident de dernière minute : une bagarre éclate (Intimidation DC 13 ou Médecine DC 10 pour soigner les blessés)'
    ],
    consequenceIfIgnored: 'Émeute au ch9. Sol-Aureus perd des ressources. Le moral de l\'armée baisse.',
    estimatedMinutes: 35, difficulty: 'moyen'
  },
  {
    id: 'sq_bibliotheque_secrete',
    title: 'La Bibliothèque Interdite',
    description: 'Un étage secret de la Bibliothèque de Sol-Aureus contient des textes interdits sur Malachor et le Miroir Brisé. Y accéder est illégal, mais les informations pourraient être cruciales.',
    giver: 'Auto-découverte ou Bibliothécaire Phaedra (après confiance)',
    reward: 'Connaissance : apprendre un point faible de Malachi (ses actions légendaires peuvent être annulées par le Mot de Puissance inscrit dans un livre spécifique) + 1 parchemin de Dissipation de la Magie',
    objectives: [
      'Trouver l\'entrée secrète (Investigation DC 14 dans la bibliothèque)',
      'Désamorcer les protections magiques (Arcanes DC 15 ou déclencher une alarme silencieuse)',
      'Naviguer les étagères (1d4 heures de recherche, Intelligence DC 12 pour trouver le bon livre)',
      'Décider : copier les informations et partir, ou voler le livre entier (risque si vu)',
      'Si alarme déclenchée : 6 rounds avant l\'arrivée des gardes. Discrétion DC 14 pour fuir.'
    ],
    consequenceIfIgnored: 'Les PJ n\'ont pas le Mot de Puissance contre Malachi. Boss fight plus difficile.',
    estimatedMinutes: 30, difficulty: 'moyen'
  }
];

// ────────────────────────────────────────────────────────────────────
// Export
// ────────────────────────────────────────────────────────────────────
export const ALL_SIDE_QUESTS: SideQuest[] = [
  ...QUESTS_PLAINES,
  ...QUESTS_MONTAGNES,
  ...QUESTS_SYLVE,
  ...QUESTS_CENDRES,
  ...QUESTS_SOL_AUREUS
];
