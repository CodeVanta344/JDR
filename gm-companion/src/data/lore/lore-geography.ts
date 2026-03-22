/**
 * LORE — GÉOGRAPHIE D'AETHELGARD
 *
 * Régions, villes, routes, points d'intérêt.
 * Référence complète pour le MJ : description, habitants, ambiance, secrets.
 */
import type { LoreEntry } from './lore-history';

export interface LocationEntry {
  id: string;
  name: string;
  type: 'city' | 'region' | 'dungeon' | 'landmark' | 'road' | 'wilderness';
  /** Description courte (1-2 phrases) */
  shortDescription: string;
  /** Description longue pour le MJ */
  fullDescription: string;
  /** Population approximative */
  population?: string;
  /** Gouvernant / autorité locale */
  ruler?: string;
  /** Économie / ressources */
  economy?: string;
  /** Ambiance en un mot */
  mood: string;
  /** Chapitres où ce lieu apparaît */
  relevantChapters: string[];
  /** Points d'intérêt à l'intérieur */
  pointsOfInterest?: PointOfInterest[];
  /** Lieux connectés (routes, passages) */
  connections?: string[];
  /** Secret caché lié à ce lieu */
  secret?: string;
}

export interface PointOfInterest {
  name: string;
  description: string;
  /** PNJ qu'on peut y trouver */
  npcs?: string[];
}

// ============================================================================
// RÉGIONS MAJEURES
// ============================================================================

export const LOCATIONS: LocationEntry[] = [
  // ============================
  // SOL-AUREUS & PLAINES DU SUD
  // ============================
  {
    id: 'loc_sol_aureus', name: 'Sol-Aureus', type: 'city',
    shortDescription: 'Capitale humaine d\'Aethelgard, cité de lumière et d\'or.',
    mood: 'majestueux', relevantChapters: ['ch1', 'ch2', 'ch3', 'ch9'],
    population: '~85 000 habitants',
    ruler: 'Reine Elara Solaris III',
    economy: 'Commerce, magie, artisanat de luxe, agriculture environnante',
    connections: ['loc_plaines_dorees', 'loc_foret_murmures', 'loc_route_nord'],
    fullDescription: `Sol-Aureus est bâtie sur sept collines qui surplombent le fleuve Doriane. Au sommet de la plus haute colline se dresse le Palais de la Couronne d'Or — une forteresse-palais de marbre blanc dont le dôme doré est visible à 30 km par temps clair.

La ville est organisée en quartiers concentriques :
• LE CŒUR DORÉ (colline centrale) — Palais, temples, Académie Arcane, demeures nobles. Rues pavées de marbre blanc. Gardes royaux en armure dorée.
• LE QUARTIER DES ARTISANS (flanc est) — Forges, ateliers, boutiques. Le Bazar des Aventuriers s'y trouve. Odeurs de métal chaud, cuir tanné et bois brûlé.
• LE PORT FLUVIAL (flanc sud) — Docks sur le Doriane. Entrepôts, tavernes, auberges. Le Dragon Rouillé est ici. Ambiance portuaire, accent marin, rumeurs.
• LE QUARTIER RÉSIDENTIEL (flanc ouest) — Maisons de pierre et colombages. Marchés de rue. Familles, enfants, vie quotidienne.
• LES BAS-FONDS (sous-sols et caves) — Réseau de tunnels, égouts, marché noir. Le Culte du Miroir y recrute discrètement.
• L'ACADÉMIE ARCANE (flanc nord) — Campus universitaire magique. Bibliothèque de 200 000 tomes. Tour d'astronomie. Laboratoires alchimiques.

TRAIT UNIQUE : Le Cœur du Soleil — une gemme divine enchâssée dans la flèche du Temple de Solarius — baigne la ville d'une lueur dorée permanente. Les nuits à Sol-Aureus ne sont jamais totalement noires.`,
    pointsOfInterest: [
      { name: 'Palais de la Couronne d\'Or', description: 'Siège du pouvoir royal. Salle du Trône en quartz doré, salles de stratégie, jardins suspendus, prison royale au sous-sol.', npcs: ['Reine Elara', 'Général Marcus', 'Conseiller Aldric'] },
      { name: 'Le Dragon Rouillé', description: 'Taverne du port — ambiance enfumée, ragoût de sanglier, bière naine. Point de rencontre des aventuriers.', npcs: ['Brok le Tavernier'] },
      { name: 'Académie Arcane', description: 'Université de magie. Bibliothèque immense, laboratoires, observatoire. Le vieux Théodore y vit.', npcs: ['Théodore l\'Archiviste'] },
      { name: 'Temple de Solarius', description: 'Plus grand temple d\'Aethelgard. Le Cœur du Soleil brille au sommet de sa flèche.', npcs: ['Grand Prêtre Alduin'] },
      { name: 'Caserne du Soleil Levant', description: 'Quartier général de la Garde Royale. Arsenal, salles d\'entraînement, prison.', npcs: ['Général Marcus'] },
      { name: 'Le Bazar des Aventuriers', description: 'Marché couvert pour mercenaires et explorateurs. Potions, armes, composants magiques.', npcs: ['Pip l\'Alchimiste', 'Sybilla la Devineresse'] },
      { name: 'Les Égouts', description: 'Réseau souterrain vaste et ancien. Certaines sections n\'ont pas été explorées depuis des décennies.', npcs: [] }
    ],
    secret: 'Le Sceau de la Lumière est caché SOUS le Temple de Solarius, dans une crypte accessible uniquement par un passage derrière l\'autel. Seuls la Reine et le Grand Prêtre connaissent son emplacement exact.'
  },
  {
    id: 'loc_plaines_dorees', name: 'Les Plaines Dorées', type: 'region',
    shortDescription: 'Vastes plaines agricoles autour de Sol-Aureus. Blé, vignes, villages paisibles.',
    mood: 'pastoral', relevantChapters: ['ch2', 'ch9'],
    population: '~200 000 (répartis en villages)',
    economy: 'Agriculture — blé, orge, vin, élevage bovin',
    connections: ['loc_sol_aureus', 'loc_foret_murmures', 'loc_lac_ashka', 'loc_hammerdeep'],
    fullDescription: `Les Plaines Dorées s'étendent du fleuve Doriane au sud jusqu'aux contreforts des Montagnes du Marteau au nord. C'est le grenier d'Aethelgard — des champs de blé à perte de vue, ponctués de villages aux toits de chaume et de moulins à vent.

VILLAGES NOTABLES :
• FERGEAUX — Village de forgerons à mi-chemin vers Hammerdeep. Forge renommée, auberge "L'Enclume Joyeuse". Population : ~800.
• HAUTERIVE — Village de pêcheurs sur le Doriane. Marché aux poissons le mardi. Population : ~500.
• BOISVERT — Village à la lisière de la Forêt de Murmures. Bûcherons et charbonniers. Tendu depuis les "incidents". Population : ~300.

DANGERS : Habituellement sûres, les plaines ont vu apparaître des disparitions ces derniers mois. Des patrouilles de la Garde trouvent des campements abandonnés et des traces de griffes d'ombre. Les fermiers sont nerveux.`,
    pointsOfInterest: [
      { name: 'Carrefour du Roi', description: 'Croisée des routes vers les 4 points cardinaux. Pierre milliaire ancienne. Campement de marchands.', npcs: [] },
      { name: 'Ruines du Fort Ancien', description: 'Fortin pré-Guerre de l\'Ombre, en ruines. Des rumeurs parlent d\'un trésor caché. En réalité, un nid de gobelins.', npcs: [] }
    ],
    secret: 'Sous le Carrefour du Roi, un ancien poste d\'observation des Sept Héros contient un journal de Valorien décrivant l\'emplacement d\'une de ses caches d\'armes.'
  },

  // ============================
  // FORÊT DE MURMURES
  // ============================
  {
    id: 'loc_foret_murmures', name: 'La Forêt de Murmures', type: 'wilderness',
    shortDescription: 'Forêt ancienne et mystérieuse au nord-est de Sol-Aureus.',
    mood: 'mystérieux-menaçant', relevantChapters: ['ch2'],
    population: 'Quelques bûcherons en lisière, esprits de la forêt à l\'intérieur',
    connections: ['loc_plaines_dorees', 'loc_sylve_emeraude'],
    fullDescription: `La Forêt de Murmures tire son nom du chuchotement constant que produisent ses arbres millénaires. Des chênes si larges qu'il faut dix personnes pour en faire le tour, des pins dont la cime se perd dans la brume. La lumière du soleil y est rare — une lueur verte et diffuse filtre à travers les feuillages.

Avant la corruption, la forêt était un lieu de paix : les druides y venaient méditer, les elfes la traversaient pour rejoindre Sol-Aureus. Le Sanctuaire du Sceau — un cercle de menhirs au centre de la forêt — était considéré comme un lieu saint.

La corruption par Voss a tout changé. Même après l'intervention des joueurs (Ch2), la forêt conserve des cicatrices : zones de végétation morte, arbres aux troncs noircis, poches de brume toxique.

ÉCOLOGIE :
• Créatures normales : cerfs, loups (non corrompus), hiboux géants, fées (rares), ours bruns
• Créatures corrompues (post-Voss) : loups d'ombre, racines animées, champignons toxiques ambulants
• Esprits : Élanor (Dryade), 3-4 esprits mineurs de source, 1 treant ancien (dormeur)`,
    pointsOfInterest: [
      { name: 'Sanctuaire du Sceau', description: 'Cercle de menhirs au centre. Le Sceau de la Forêt y repose, fissuré mais actif.', npcs: ['Élanor (Dryade)'] },
      { name: 'Source de Clarté', description: 'Source naturelle dont l\'eau guérit les maladies mineures. Un vieil ermite druide y vit.', npcs: ['Beren l\'Ermite'] },
      { name: 'Clairière des Fées', description: 'Cercle de champignons. Les fées y dansent au clair de lune. Passage vers le Plan Féérique (dangereux).', npcs: [] },
      { name: 'Caverne du Treant', description: 'Un treant ancien dort depuis 400 ans dans cette grotte. Si réveillé, il est confus et potentiellement hostile.', npcs: ['Xylocarpe le Treant'] }
    ],
    secret: 'La Source de Clarté est en réalité une larme de Sélénia (la Mère-Lune) tombée pendant la Création. Si un prêtre de Sélénia bénit la source, elle produit de l\'eau sainte permanente.'
  },

  // ============================
  // HAMMERDEEP & MONTAGNES DU MARTEAU
  // ============================
  {
    id: 'loc_hammerdeep', name: 'Hammerdeep', type: 'city',
    shortDescription: 'Forteresse naine de 22 niveaux sous les Montagnes du Marteau.',
    mood: 'grandeur-souterraine', relevantChapters: ['ch4', 'ch5'],
    population: '~45 000 nains, ~3 000 autres races',
    ruler: 'Thane Durinn Marteau-Profond',
    economy: 'Mithril, forge d\'armes enchantées, pierres précieuses, bières',
    connections: ['loc_montagnes_marteau', 'loc_forge_thogrund'],
    fullDescription: `Hammerdeep est la plus grande forteresse naine d'Aethelgard. Creusée il y a plus de 2000 ans, elle s'enfonce sur 22 niveaux sous la montagne du Marteau — du Hall d'Entrée (niveau 1, accessible aux visiteurs) jusqu'aux Forges Profondes (niveau 22, où le mithril coule en rivières).

NIVEAUX NOTABLES :
• NIV. 1-3 : Hall d'Entrée, quartier marchand, auberges, forge publique. C'est ici que les visiteurs non-nains sont accueillis. Ambiance de marché bourdonnant.
• NIV. 4-8 : Quartiers résidentiels des clans. Chaque clan a son propre niveau avec halls de banquet, forges familiales, temples. Les murs sont couverts de runes qui brillent dans le noir.
• NIV. 9-12 : Les Mines. Extraction de mithril, fer, or, gemmes. Réseau de tunnels sur des kilomètres. Certains tunnels sont condamnés — on dit que des choses y vivent.
• NIV. 13-15 : La Garde Profonde. Casernes, Arsenal, salle du Thane. Centre du pouvoir militaire nain.
• NIV. 16-18 : L'Académie des Forges. Où les jeunes nains apprennent les secrets de la forge. Le Maître Forgeron Korgan y enseigne.
• NIV. 19-21 : Les Anciennes Mines. Abandonnées il y a 600 ans après un effondrement. Interdites d'accès. Rumeurs de créatures.
• NIV. 22 : La Forge de Thogrund. Forge légendaire du héros nain. Le Sceau de la Montagne y est ancré.

POLITIQUE :
Le Thane Durinn est le 47ème Thane de Hammerdeep. Élu par le Conseil des 7 Clans, il gouverne depuis 60 ans. Vétéran de la Guerre de l'Ombre, il est respecté mais fatigué. Son fils, Borin, est impétueux et veut moderniser Hammerdeep.

Les 7 Clans : Marteau-Profond (le Thane), Pierre-Vive, Hache-de-Fer, Barbe-d'Or, Forge-Ancienne, Lames-Jumelles, Gardiens-de-Mine.`,
    pointsOfInterest: [
      { name: 'Hall du Marteau', description: 'Immense caverne d\'entrée (200m × 100m × 50m haut). Stalactites sculptées en forme de guerriers nains. Marché permanent.', npcs: ['Forgeron Durinn (cousin du Thane)'] },
      { name: 'La Taverne du Mithril Fondu', description: 'Meilleure taverne de Hammerdeep. Bières de 47 variétés. Compétitions de boisson. Le patron, Grinbar, connaît tout le monde.', npcs: ['Grinbar le Tavernier'] },
      { name: 'Salle du Thane', description: 'Salle de conseil au niveau 14. Trône taillé dans un bloc de mithril. Tapisseries racontant l\'histoire des Thanes.', npcs: ['Thane Durinn', 'Borin fils du Thane'] },
      { name: 'Temple de Moradin', description: 'Temple-forge souterrain. L\'enclume sacrée au centre est faite d\'un métal inconnu tombé du ciel.', npcs: ['Grand Forgeron-Prêtre Korgan'] },
      { name: 'Les Anciennes Mines', description: 'Niveaux 19-21. Interdites. Effondrement il y a 600 ans. Des mineurs rapportent des bruits de grattement.', npcs: [] }
    ],
    secret: 'Les Anciennes Mines ne se sont pas effondrées naturellement. Le Thane de l\'époque a VOLONTAIREMENT fait s\'effondrer les tunnels pour sceller quelque chose qui avait été déterré — un fragment du Plan Ombre cristallisé.'
  },
  {
    id: 'loc_montagnes_marteau', name: 'Les Montagnes du Marteau', type: 'region',
    shortDescription: 'Chaîne montagneuse au nord d\'Aethelgard. Pics enneigés, cols dangereux.',
    mood: 'rude-majestueux', relevantChapters: ['ch4', 'ch5', 'ch6'],
    economy: 'Mines (mithril, fer, gemmes), élevage de chèvres de montagne',
    connections: ['loc_hammerdeep', 'loc_forge_thogrund', 'loc_lac_ashka', 'loc_plaines_dorees'],
    fullDescription: `Les Montagnes du Marteau forment un arc de cercle au nord d'Aethelgard, du col de l'Est (près de la Sylve) au col de l'Ouest (vers les Plaines Mortes). Les pics culminent à 4000m — couverts de neige éternelle, battus par des vents glacials.

CARACTÉRISTIQUES :
• Le Col du Marteau : passage principal vers le nord. Route pavée par les nains. Pont suspendu au-dessus du Gouffre du Tonnerre (300m de profondeur).
• Le Val des Échos : vallée encaissée entre deux pics. Réverbération naturelle — on peut entendre une conversation à 2 km. Les nains l'utilisent comme système d'alerte.
• Le Glacier du Dragon : glacier ancien en forme de dragon endormi. Légende : un vrai dragon de glace y dort depuis l'Éon Doré.
• La Passe de Fer : col secondaire vers Ashka. Dangereux — gobelins et ogres l'utilisent.

FAUNE : Chèvres de montagne, aigles géants (envergure 5m), trolls des cavernes (rares), ours polaires, loups des neiges.`,
    pointsOfInterest: [
      { name: 'Col du Marteau', description: 'Route principale. Poste de garde nain avec 20 soldats permanents.', npcs: ['Capitaine Brunhild'] },
      { name: 'Gouffre du Tonnerre', description: 'Gouffre de 300m. Le pont suspendu nain qui le traverse est un chef-d\'œuvre d\'ingénierie.', npcs: [] },
      { name: 'Glacier du Dragon', description: 'Formation de glace en forme de dragon. Les nains jurent que ça bouge parfois.', npcs: [] }
    ],
    secret: 'Le Glacier du Dragon contient effectivement un dragon de givre ancien — Crysthalgos — en hibernation depuis 3000 ans. Il se réveillera si les Sceaux sont insuffisamment protégés.'
  },
  {
    id: 'loc_forge_thogrund', name: 'La Forge de Thogrund', type: 'dungeon',
    shortDescription: 'Forge légendaire du héros nain Thorek. Le Sceau de la Montagne y repose.',
    mood: 'sacré-dangereux', relevantChapters: ['ch5'],
    connections: ['loc_hammerdeep'],
    fullDescription: `Au niveau 22 de Hammerdeep, derrière une porte de mithril gravée de runes protectrices, se trouve la Forge de Thogrund — du nom de l'ancêtre mythique des forgerons nains.

La forge est une immense caverne naturelle modifiée par des millénaires de travail nain. Une rivière de mithril liquide coule au centre, chauffée par un puits de magma naturel. L'enclume de Thogrund — un bloc de métal céleste — trône au centre, et c'est ICI que Thorek Marteau-Sacré a forgé les ancres physiques des Sept Sceaux.

Le Sceau de la Montagne est ancré dans l'enclume elle-même. Il se manifeste comme un réseau de runes dorées qui couvrent l'enclume et pulsent au rythme d'un battement de cœur lent.

DANGERS : La forge est protégée par des automates de pierre (golems de garde nains), des pièges de forge (jets de mithril en fusion), et un dragon de lave (jeune) qui s'est installé dans le puits de magma il y a 50 ans. Les nains le tolèrent car il réchauffe la forge.`,
    pointsOfInterest: [
      { name: 'Enclume de Thogrund', description: 'Enclume de métal céleste. Le Sceau de la Montagne y est ancré. Indestructible par des moyens normaux.', npcs: [] },
      { name: 'Puits de Magma', description: 'Source de chaleur de la forge. Un jeune dragon de lave y vit.', npcs: ['Ignatis (dragon de lave)'] },
      { name: 'Galerie des Héros', description: 'Statues des 47 Thanes et des héros nains. Thorek est au centre, mains de pierre levées.', npcs: [] }
    ],
    secret: 'L\'enclume de Thogrund peut forger des armes capables de blesser Ombréus. Le mithril qui en sort est "béni" — il brûle les créatures d\'ombre comme de l\'acide.'
  },

  // ============================
  // LAC D'ASHKA
  // ============================
  {
    id: 'loc_lac_ashka', name: 'Le Lac d\'Ashka', type: 'region',
    shortDescription: 'Grand lac bordé de ruines. Le Sceau du Lac — désormais brisé.',
    mood: 'désolé-hanté', relevantChapters: ['ch6'],
    population: '~2000 (village de pêcheurs, évacué)',
    connections: ['loc_montagnes_marteau', 'loc_plaines_mortes'],
    fullDescription: `Le Lac d'Ashka est un lac d'eau douce de 30 km de diamètre, entouré de collines basses et de forêts de bouleaux. Sur sa rive nord, les ruines d'Ashka — une ancienne ville de commerce — témoignent d'une époque révolue.

Ashka fut détruite pendant la Guerre de l'Ombre et jamais reconstruite. Les ruines sont maintenant un labyrinthe de murs effondrés, de tours brisées et de caves inondées. Le Sceau du Lac reposait au fond du lac, ancré dans un temple submergé.

Gorvan, le lieutenant de Malachi, a réussi à briser le Sceau avant l'arrivée des joueurs (Ch6). Les conséquences sont visibles : l'eau du lac est devenue noire comme de l'encre, les poissons meurent, et des créatures d'ombre émergent de l'eau la nuit.

AMBIANCE : Brumes permanentes, odeur de vase et de pourriture, silence oppressant brisé par des clapotis anormaux. Le village de pêcheurs de Portlac (rive sud) est partiellement évacué.`,
    pointsOfInterest: [
      { name: 'Ruines d\'Ashka', description: 'Ville détruite. Bâtiments effondrés, caves, passages secrets. Gorvan y a établi sa base.', npcs: ['Gorvan (ennemi)'] },
      { name: 'Temple Submergé', description: 'Sous le lac. Le Sceau du Lac s\'y trouvait, désormais brisé. Accessible en plongée ou par un tunnel.', npcs: [] },
      { name: 'Portlac', description: 'Village de pêcheurs partiellement évacué. Les survivants sont terrifiés.', npcs: ['Maire Hilda', 'Pêcheur Jonas'] }
    ],
    secret: 'Le temple submergé contient le tombeau de Liora la Guérisseuse (7ème Héroïne). Son bâton sacré — le Rameau de Vie — y repose. Si récupéré, c\'est un artefact qui peut restaurer un Sceau brisé (une seule fois).'
  },

  // ============================
  // SYLVE D'ÉMERAUDE
  // ============================
  {
    id: 'loc_sylve_emeraude', name: 'La Sylve d\'Émeraude', type: 'region',
    shortDescription: 'Forêt elfique sacrée. Cités-arbres et magie ancienne.',
    mood: 'féerique-politique', relevantChapters: ['ch7', 'ch8'],
    population: '~30 000 elfes',
    ruler: 'Haut Seigneur Thalion (Traditionaliste)',
    economy: 'Magie, alchimie botanique, artisanat de bois enchanté, chants de pouvoir',
    connections: ['loc_foret_murmures', 'loc_arbre_monde'],
    fullDescription: `La Sylve d'Émeraude est la plus grande forêt d'Aethelgard — et la plus ancienne. Ses arbres ont été plantés par Sylvanus lui-même. Contrairement à la Forêt de Murmures (une forêt "sauvage"), la Sylve est cultivée, soignée, façonnée par des millénaires de magie elfique.

CITÉS-ARBRES : Les elfes vivent dans des structures impossibles — des maisons tissées dans le bois vivant des arbres géants. Des escaliers en spirale montent jusqu'à des plates-formes à 50m de hauteur. Des ponts de lumière (solidifiée par magie) relient les arbres.

La capitale, Émerilion, est un arbre de 200m de haut dont le tronc abrite le Conseil des Anciens et la bibliothèque elfique (la plus vieille du monde, +400 000 ans de savoir).

POLITIQUE ELFIQUE :
• TRADITIONALISTES (60%) — Menés par le Haut Seigneur Thalion. Isolationnistes stricts. "Les peuples courts nous ont trahis après la Guerre de l'Ombre. Nous ne referons pas la même erreur."
• PROGRESSISTES (30%) — Menés par Dame Aethel. Veulent renouer avec les humains et les nains. "Le monde change. Rester isolés, c'est mourir."
• RADICAUX (10%) — Menés par... personne ouvertement. En secret, Syrana (espionne de Malachi) les manipule vers l'extrémisme anti-extérieur.`,
    pointsOfInterest: [
      { name: 'Émerilion', description: 'Capitale elfique. Arbre géant de 200m. Conseil des Anciens, bibliothèque, marché de magie vivante.', npcs: ['Haut Seigneur Thalion', 'Dame Aethel'] },
      { name: 'Clairière de Mémoire', description: 'Lieu de méditation. Les elfes y communient avec les souvenirs des ancêtres gravés dans les arbres.', npcs: [] },
      { name: 'Le Sentier des Ronces', description: 'Défense naturelle magique. Les ronces attaquent les intrus non-autorisés.', npcs: [] }
    ],
    secret: 'Syrana (l\'espionne de Malachi) a empoisonné subtilement le Haut Seigneur Thalion avec une toxine d\'ombre à effet lent. Ses opinions isolationnistes sont EXACERBÉES par l\'empoisonnement — il n\'était pas aussi radical avant.'
  },
  {
    id: 'loc_arbre_monde', name: 'L\'Arbre-Monde Yggvan', type: 'landmark',
    shortDescription: 'Arbre millénaire sacré des elfes. Ses racines touchent le Plan Éthéré.',
    mood: 'sacré-cosmique', relevantChapters: ['ch8'],
    connections: ['loc_sylve_emeraude'],
    fullDescription: `Yggvan est le plus grand être vivant d'Aethelgard — un chêne dont le tronc fait 80m de diamètre et dont la cime dépasse 300m. Ses racines plongent dans la terre sur des kilomètres et, selon les elfes, atteignent le Plan Éthéré lui-même.

L'arbre est CONSCIENT. Pas intelligent au sens humain, mais il ressent, réagit, et communique par des vibrations dans ses racines. Les druides elfiques "parlent" à Yggvan par la méditation — ils posent une question, et Yggvan répond par des images, des émotions, des sensations.

STRUCTURE :
• LES RACINES EXTERNES — Accessibles. Grottes naturelles entre les racines. Ermitages de druides.
• LE TRONC — L'écorce épaisse de 3m forme des "salles" naturelles. Le Temple de la Sève — un sanctuaire druidique — occupe le cœur du tronc.
• LA CANOPÉE — Plate-formes naturelles entre les branches. Nids d'aigles géants. Observatoire des étoiles.
• LES RACINES PROFONDES — Inaccessibles sans magie. Mènent au Plan Éthéré. Le Sceau de la Forêt (le principal) y est connecté.

RÔLE DANS LA CAMPAGNE (Ch8) : Les joueurs doivent descendre dans les racines profondes pour accomplir le rituel de renforcement du Sceau de la Forêt. C'est un donjon vertical — vers le bas.`,
    pointsOfInterest: [
      { name: 'Temple de la Sève', description: 'Sanctuaire druidique au cœur du tronc. L\'air y a un goût sucré. Guérison accélérée.', npcs: ['Archidruide Faelorn'] },
      { name: 'Nid de l\'Aigle-Roi', description: 'Aigle géant (envergure 15m) vit au sommet. Peut servir de monture si les joueurs gagnent sa confiance.', npcs: ['Aquilon (Aigle-Roi)'] }
    ],
    secret: 'Yggvan sait que les Sceaux faiblissent. Il essaie de communiquer l\'urgence aux elfes, mais Thalion (empoisonné) interprète les vibrations comme "Yggvan nous dit de nous isoler davantage".'
  },

  // ============================
  // PLAINES MORTES & SOMBRELUNE
  // ============================
  {
    id: 'loc_plaines_mortes', name: 'Les Plaines Mortes', type: 'region',
    shortDescription: 'Terres dévastées par la Guerre de l\'Ombre. Rien n\'y pousse.',
    mood: 'désolation-horreur', relevantChapters: ['ch10', 'ch11'],
    connections: ['loc_lac_ashka', 'loc_mont_sombrelune'],
    fullDescription: `Les Plaines Mortes sont la cicatrice béante de la Guerre de l'Ombre. S'étendant sur 200 km entre le Lac d'Ashka et le Mont Sombrelune, c'est un désert gris où rien ne pousse, où la pluie ne tombe jamais, et où le silence est si profond qu'on entend son propre sang circuler.

CARACTÉRISTIQUES :
• Le sol est de la cendre compactée — les restes des forêts et villages incinérés pendant la guerre.
• L'air a un goût métallique. Les sorts de détection révèlent une contamination de nécromancie résiduelle.
• La nuit, des lueurs fantomatiques — les "feux follets d'ombre" — dansent à l'horizon. Ce sont les échos des morts de la guerre.
• La température est anormalement basse — 10°C de moins que les régions environnantes, même en été.

DANGERS :
• Morts-vivants errants (zombies, spectres) — vestiges des armées des deux camps.
• Rocs empoisonnés (la cendre contient des traces de nécromancie — Constitution DC 12 chaque 8h ou 1 niveau d'épuisement).
• Tempêtes de cendre (visibilité 0, dégâts d'abrasion, 1d4/round sans protection).
• Désorientation magique (les boussoles ne fonctionnent pas — la nécromancie résiduelle perturbe le champ magnétique).`,
    pointsOfInterest: [
      { name: 'Le Champ des Lames', description: 'Des milliers d\'épées rouillées plantées dans le sol. Mémorial spontané de la bataille finale.', npcs: [] },
      { name: 'La Tour de Malachor', description: 'Tour de pierre noire où l\'ancêtre de Malachi s\'est isolé. Abandonnée... en apparence.', npcs: [] },
      { name: 'Le Gouffre du Désespoir', description: 'Crevasse de 1 km de long. Le point d\'impact où Ombréus a été scellé. La crevasse mène au Mont Sombrelune souterrain.', npcs: [] }
    ],
    secret: 'La Tour de Malachor n\'est PAS abandonnée. Malachi y a laissé un clone alchimique — une copie de lui-même qui surveille la tour et défend les journaux de Malachor. Le clone ne sait pas qu\'il est un clone.'
  },
  {
    id: 'loc_mont_sombrelune', name: 'Le Mont Sombrelune', type: 'dungeon',
    shortDescription: 'Volcan éteint au centre d\'Aethelgard. Le Miroir de l\'Ombre s\'y cache.',
    mood: 'climax-épique', relevantChapters: ['ch10', 'ch11'],
    connections: ['loc_plaines_mortes'],
    fullDescription: `Le Mont Sombrelune est un stratovolcan éteint de 3500m d'altitude. Son cratère, large de 2 km, est rempli d'un lac d'eau noire qui ne reflète jamais le ciel — il reflète le Plan Ombre.

Le Miroir de l'Ombre se trouve dans une caverne SOUS le lac, accessible par un réseau de tunnels volcaniques. C'est ici que les Sept Héros ont accompli le rituel de scellement — et c'est ici que Malachi compte accomplir le rituel d'ouverture.

STRUCTURE DU DONJON (Tour de Sombrelune / Tunnels) :
• SURFACE : Campement de Malachi, fortifications improvisées, gardes du Culte.
• TUNNELS SUPÉRIEURS : 5 salles de lave refroidie. Pièges, automates d'ombre.
• TUNNELS INFÉRIEURS : 5 salles de roche volcanique. Créatures d'ombre de haut niveau.
• SALLE DU MIROIR : Caverne immense sous le lac. Le Miroir fait 5m de haut, en verre noir. Malachi y est.

AMBIANCE : Le Mont gronde. Pas d'éruption volcanique — c'est le Plan Ombre qui pulse derrière la barrière. Plus on descend, plus la réalité se déforme : les ombres bougent seules, les reflets montrent des versions "alternatives" des personnages, les murs murmurent.`,
    pointsOfInterest: [
      { name: 'Le Lac Noir', description: 'Lac de cratère. Eau noire opaque. Reflète le Plan Ombre, pas le ciel. Nager dedans = Sagesse DC 15 ou 1 niveau de folie.', npcs: [] },
      { name: 'Salle du Miroir', description: 'Caverne finale. Le Miroir de l\'Ombre de 5m de haut. Malachi y accomplit son rituel.', npcs: ['Malachi'] },
      { name: 'Cercle des Sept', description: 'Les marques au sol où les Sept Héros se sont tenus pendant le rituel. Chaque marque brille faiblement.', npcs: [] }
    ],
    secret: 'Le Cercle des Sept est la CLÉ de la victoire. Si les joueurs se tiennent aux mêmes positions que les Sept Héros, ils peuvent canaliser la magie résiduelle du rituel original pour RENFORCER les Sceaux. Mais chacun doit faire un sacrifice personnel (mécanique Ch11).'
  }
];
