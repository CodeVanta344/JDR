/**
 * CHAPITRE 4 : LES FORGES D'HAMMERDEEP (Niveau 5-6)
 * 6 scènes — Diplomatie naine, mines, rituel de restauration
 */
import type { NarrativeScene, NarrativeChapter } from './types';

const CH4_SCENES: NarrativeScene[] = [
  {
    id: 'ch4_s1_hammerdeep', chapterId: 'ch4', sceneNumber: 1,
    title: 'Les Portes de Fer', type: 'dialogue',
    readAloud: `Les Montagnes d'Acier se dressent comme des crocs de fer contre un ciel gris de novembre, si hautes que leurs sommets disparaissent dans une couche de nuages permanents — une couronne de brume et de givre qui n'a probablement pas bougé depuis des siècles. Après cinq jours de marche depuis Sol-Aureus — cinq jours de routes de montagne escarpées, de nuits froides sous des ciels étoilés comme du verre brisé, de vent qui coupe les lèvres — la route s'enfonce dans une gorge étroite taillée dans le granit rouge.

Et c'est là que vous l'entendez. Le battement. Régulier. Profond. Un rythme de marteaux sur l'enclume qui résonne dans la gorge comme un cœur géant battant dans la montagne elle-même. Chaque coup fait vibrer la roche sous vos pieds. Chaque silence entre les coups est chargé d'attente. C'est le pouls d'Hammerdeep — le cœur battant de la civilisation naine.

La gorge s'élargit d'un coup et les Portes d'Hammerdeep vous frappent comme une gifle de grandeur. Deux plaques d'acier poli de quinze mètres de haut, enchâssées dans la falaise même, gravées de runes ancestrales qui brillent d'un feu intérieur — un or fondu qui pulse au rythme des marteaux. Les portes sont si parfaitement ajustées qu'on ne voit pas la jointure. Chaque rune est un chef-d'œuvre de précision — des lignes si fines qu'elles semblent tracées par un cheveu d'ange dans le métal. L'air autour des portes est chaud, sec, et sent le fer chauffé et la fumée de charbon.

Deux gardes nains se tiennent de part et d'autre des Portes — en armure complète de plates d'acier runique, immobiles comme des statues, les yeux fixes sous des casques gravés de têtes de bélier. Ils n'ont pas bougé d'un millimètre à votre approche. Mais quand vous êtes à cinq mètres, ils se redressent d'un mouvement parfaitement synchronisé et plantent la hampe de leurs hallebardes dans la pierre avec un CLANG qui résonne dans toute la gorge.

"Halte ! Personne n'entre dans Hammerdeep sans l'autorisation du Thane. Qui êtes-vous et que voulez-vous ?"`,
    gmNotes: `Diplomatie naine. Les nains d'Hammerdeep sont isolationnistes et méfiants. La Lettre de Mission Royale de la Reine Elara aide (les gardes font entrer le groupe chez le Thane) mais ne garantit rien — les nains respectent la Couronne sans lui obéir. Le Thane Durinn est un vieux nain pragmatique : il accepte d'aider SI les joueurs récupèrent un artefact volé dans une mine infestée. Persuasion DC 14 pour obtenir de l'aide sans contrepartie (mais le Thane demande quand même de l'aide pour la mine). Si les joueurs sont agressifs, les nains les expulsent poliment mais fermement.`,
    dialogues: [
      {
        npcId: 'npc_thane_durinn', npcName: 'Thane Durinn',
        lines: [
          { trigger: 'Accueil', text: `*Un nain massif à la barbe tressée d'or, assis sur un trône de granit.* La Reine Elara vous envoie. *Il examine la lettre.* Les Sceaux, donc. Mes ancêtres en ont posé un sous cette montagne. Oui, je suis au courant des... perturbations.`, tone: 'mesuré' },
          { trigger: 'Le problème', text: `Notre mine la plus profonde — la Veine du Dragon — a été envahie par des créatures d'ombre il y a deux semaines. Nous l'avons scellée. Pas par lâcheté — par prudence. Et dans cette mine se trouve le Marteau de Thogrund — un artefact qui est la CLÉ du Sceau de la Montagne.`, tone: 'grave' },
          { trigger: 'Le marché', text: `Récupérez le Marteau de Thogrund. En échange, mes forgerons renforceront vos armes avec de l'acier runique et je vous donnerai accès au Sceau de la Montagne pour le vérifier. C'est un marché honnête, non ?`, tone: 'commercial' },
          { trigger: 'Aide militaire', text: `*Il tire sa barbe.* Envoyer mes guerriers en surface ? Hm. Si vous prouvez que la menace est réelle — le Marteau retrouvé, le Sceau vérifié — je mettrai cent haches naines à la disposition de l'Alliance. Pas avant. Les nains ne bougent pas sur des rumeurs.`, tone: 'ferme' }
        ]
      }
    ],
    objectives: [
      { description: 'Négocier avec le Thane Durinn', type: 'talk', optional: false },
      { description: 'Accepter la mission de la Veine du Dragon', type: 'talk', optional: false },
      { description: 'Explorer Hammerdeep et se préparer', type: 'explore', optional: true }
    ],
    transitions: [
      { condition: 'Mission acceptée', nextScene: 'ch4_s1b_hammerdeep_ville', label: '→ Exploration d\'Hammerdeep' },
      { condition: 'Joueurs pressés, vont directement à la mine', nextScene: 'ch4_s2_mine', label: '→ La Veine du Dragon' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 14, success: 'Durinn est impressionné par vos arguments et offre un guide nain pour la mine en plus du marché.', failure: 'Durinn s\'en tient au marché strict — pas de guide, pas de bonus.' }
    ],
    estimatedMinutes: 15, mood: 'diplomatie-méfiance',
    music: 'Nain — forge, marteaux, chants gutturaux', location: 'Hammerdeep — Salle du Trône du Thane'
  },
  // Nouvelle scène : Explorer la ville
  {
    id: 'ch4_s1b_hammerdeep_ville', chapterId: 'ch4', sceneNumber: 1.5,
    title: 'La Cité sous la Montagne (Optionnel)', type: 'exploration',
    readAloud: `Les Portes d'Hammerdeep s'ouvrent dans un grondement de mécaniques profondes — des engrenages gros comme des roues de chariot tournent dans la roche, des chaînes d'acier épaisses comme des bras se tendent, et les deux plaques de quinze mètres pivotent vers l'intérieur avec une lenteur majestueuse, révélant la Cité sous la Montagne.

Hammerdeep est une merveille d'ingénierie qui coupe le souffle. Creusée dans le cœur même de la montagne sur des millénaires de travail patient, la cité s'étend sur cinq niveaux reliés par des ascenseurs à engrenages — des plateformes de pierre montées sur des colonnes de bronze qui montent et descendent dans un ballet perpétuel — et des ponts de pierre suspendus au-dessus d'un gouffre central vertigineux. En bas, très loin en bas, rougeoient les Grandes Forges — un lac de lave contrôlée d'où monte une chaleur sèche qui fait onduler l'air comme un mirage de désert.

Le premier niveau est le quartier marchand. Des échoppes creusées dans la roche vendent des armures naines polies comme des miroirs, des gemmes taillées qui captent la lumière des lanternes runiques, des outils d'une précision chirurgicale, et de la bière si épaisse et si mousseuse qu'on pourrait y marcher dessus — ce que, d'après les taches sur le comptoir, certains ont manifestement essayé. L'air sent le métal chaud, la bière de malt, le cuir tanné, et une odeur de fond, minérale et profonde, qui est l'odeur de la montagne elle-même. Le deuxième niveau est résidentiel — des portes rondes dans la roche, chacune gravée d'armoiries de clan. Le troisième abrite les ateliers — le son des marteaux est assourdissant ici. Le quatrième, les temples de Moradin — des voûtes si hautes que l'écho d'une prière met trois secondes à revenir. Et le cinquième — le plus profond — est scellé par une grille de fer. C'est là que se trouve l'accès à la Veine du Dragon.

Un forgeron nain à l'étal débordant d'acier vous interpelle d'une voix qui porte comme un marteau sur l'enclume : "Vous êtes les gens de la surface qui vont nettoyer la mine ? Venez par ici — j'ai quelque chose qui pourrait vous aider."`,
    gmNotes: `Shopping et lore nain. Le forgeron Grimdak peut améliorer une arme existante (+1 temporaire) pour 300 PO. Le temple de Moradin offre une bénédiction (avantage aux JDS contre la Peur, 24h, donation libre). La brasserie naine vend de la "Bière de Pierre" (récupère 1d4+2 PV en short rest, 10 PO la gourde). Si les joueurs explorent le quatrième niveau, ils trouvent une vieille bibliothèque naine avec des archives sur les Sept Héros — l'un des Sept était un nain nommé Thogrund. C'est celui qui a forgé le Marteau-Sceau. Cette information enrichit le lore et donne du poids à l'artefact qu'ils vont récupérer.`,
    dialogues: [
      {
        npcId: 'npc_grimdak', npcName: 'Grimdak le Forgeron',
        lines: [
          { trigger: 'Armes', text: `*Un nain couvert de suie, des muscles comme des câbles d'acier.* Vous descendez dans la Veine ? Avec CES armes ? *Il renifle de mépris.* Donnez-moi deux heures et 300 pièces d'or et je renforce votre meilleur acier avec des runes de percussion. Ça fera mal aux choses d'ombre, ça je vous le garantis.`, tone: 'professionnel-méprisant' }
        ]
      }
    ],
    objectives: [
      { description: 'Explorer Hammerdeep et se préparer', type: 'explore', optional: true },
      { description: 'Faire améliorer des armes chez Grimdak', type: 'explore', optional: true },
      { description: 'Obtenir la bénédiction de Moradin', type: 'special', optional: true }
    ],
    transitions: [
      { condition: 'Préparatifs terminés', nextScene: 'ch4_s2_mine', label: '→ Descente dans la Veine du Dragon' }
    ],
    loot: ['Bière de Pierre (1d4+2 PV en short rest, optionnel)', 'Amélioration d\'arme +1 (temporaire, optionnel)'],
    estimatedMinutes: 10, mood: 'émerveillement-souterrain',
    music: 'Cité naine — forge, engrenages, chants de taverne', location: 'Hammerdeep — Niveaux 1-4'
  },
  {
    id: 'ch4_s2_mine', chapterId: 'ch4', sceneNumber: 2,
    title: 'La Veine du Dragon', type: 'exploration',
    readAloud: `Le cinquième niveau d'Hammerdeep est un autre monde. Là-haut, les bruits de la vie naine — marteaux, chants, engrenages — résonnaient partout. Ici, le silence est un mur. Les tunnels sont plus anciens, plus bruts, taillés dans la roche noire par les premiers clans nains il y a des millénaires, à une époque où creuser dans la montagne n'était pas un métier mais un acte de foi. Les parois portent encore les marques de pics primitifs — des entailles larges, désordonnées, comme les griffures d'un animal géant.

Des rails de chariot en fer rouillé s'enfoncent dans l'obscurité, parallèles comme deux serpents perdus dans le noir. L'air est chaud — bien plus chaud qu'il ne devrait — sec, et porte une odeur de soufre qui pique les narines et assèche la gorge. Une fine poussière rouge couvre le sol comme du sable de désert.

La porte de la mine — une grille de fer runique épaisse comme un bras, conçue pour résister à un dragon — a été défoncée de l'intérieur. Le métal est tordu vers l'extérieur comme du papier d'argent, les barreaux pliés à des angles impossibles. Des marques de griffes — profondes, nettes, parallèles — entament la pierre de part et d'autre du cadre. Mais le détail le plus inquiétant ce sont les runes. Les runes de protection gravées dans le métal ont été effacées — pas arrachées par la force brute, non. Grattées. Avec méthode. Une par une. Par quelqu'un — ou quelque chose — qui savait exactement CE qu'il faisait.

Au-delà de la porte brisée, le noir est total. Pas le noir ordinaire d'une cave ou d'un tunnel — un noir ÉPAIS, qui a une densité, une présence. Vos torches semblent éclairant moins bien ici, leur lumière absorbée par l'obscurité comme l'eau par du sable. Le cercle de clarté autour de vous est plus petit qu'il ne devrait. Et dans le silence, au fond du tunnel, quelque chose gratte doucement la pierre.`,
    gmNotes: `Donjon de mine en trois parties : 1) Tunnels supérieurs (pièges de mine + créatures d'ombre mineures). 2) La Grande Caverne (combat intermédiaire). 3) Le Cœur de la Veine (le Marteau). Piège à repérer en particulier : un chariot de mine piégé (Perception DC 13 pour le voir, Dextérité DC 14 pour esquiver si déclenché, 3d6 dégâts contondants). Les créatures d'ombre dans les tunnels sont de petits Rejetons d'Ombre (CR 1/2) qui harcèlent — ils attaquent et fuient, épuisant les ressources des joueurs avant le boss.`,
    dialogues: [],
    objectives: [
      { description: 'Descendre dans la Veine du Dragon', type: 'explore', optional: false },
      { description: 'Naviguer les tunnels piégés', type: 'explore', optional: false },
      { description: 'Atteindre le Cœur de la Veine', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Arrivée au Cœur de la Veine', nextScene: 'ch4_s3_coeur', label: '→ Le Cœur de la Veine' }
    ],
    skillChecks: [
      { skill: 'Perception', dc: 13, success: 'Vous repérez le chariot piégé — un câble tendu au niveau du genou déclenche la descente.', failure: 'Le chariot dévale les rails vers vous — Dextérité DC 14 ou 3d6 dégâts contondants.' },
      { skill: 'Survie', dc: 12, success: 'Vous repérez le chemin le plus sûr à travers le réseau de tunnels — évitant deux embuscades.', failure: 'Vous prenez un mauvais embranchement et tombez sur un groupe de Rejetons d\'Ombre.' }
    ],
    encounters: ['3x Rejeton d\'Ombre (CR 1/2) — harcèlement'],
    estimatedMinutes: 15, mood: 'claustrophobie-danger',
    music: 'Mine profonde — gouttes, craquements de roche, silence', location: 'Hammerdeep — Veine du Dragon, Tunnels'
  },
  {
    id: 'ch4_s3_coeur', chapterId: 'ch4', sceneNumber: 3,
    title: 'Le Gardien d\'Ombre', type: 'combat',
    readAloud: `Le tunnel débouche dans un espace qui arrache un souffle d'émerveillement même dans ces circonstances — la Grande Caverne, un dôme naturel si vaste que le plafond se perd dans des ténèbres que même la lumière des cristaux n'atteint pas. Et des cristaux, il y en a partout : des formations géantes de quartz améthyste, de calcite dorée, de fluorite bleutée, incrustées dans les parois comme les joyaux d'une couronne titanesque. Chaque cristal projette une lumière faible et tremblante — pas sa propre lumière, mais un reflet de quelque chose de plus profond, de plus ancien, comme si la montagne elle-même respirait de la luminescence.

Au centre de la caverne, sur un piédestal de basalte noir poli par des mains naines il y a 120 ans, repose le Marteau de Thogrund. C'est un marteau de guerre d'une facture sublime — une tête de mithral ciselée de runes dorées qui pulsent encore faiblement, comme un cœur qui bat dans le métal, montée sur un manche de frêne noir renforcé de bandes de bronze ancien. Même à cette distance, vous sentez sa chaleur — pas physique, mais spirituelle, comme la proximité d'un feu sacré.

Mais entre vous et le Marteau, l'ombre se condense. Pas une ombre ordinaire — une masse vivante de ténèbres qui se dresse du sol comme un pilier de nuit liquide et prend forme. Le Gardien. Un Démon d'Ombre Majeur, deux fois la taille de ceux que vous avez affrontés dans les égouts de Sol-Aureus, ses proportions massives, ses ailes d'encre déployées d'un mur de la caverne à l'autre, obscurcissant les cristaux dans un périmètre de terreur. Ses yeux — deux braises rouges dans un visage de vide — vous fixent avec une intelligence glaciale, calculatrice, ancienne.

"Le Marteau reste ici." Sa voix est le grondement d'une avalanche. "Le Sceau reste brisé. Le Miroir s'ouvre. Votre quête meurt dans cette caverne, mortels."`,
    gmNotes: `BOSS : Démon d'Ombre Majeur (CR 5). Il a des résistances aux dégâts non-magiques et une attaque spéciale "Vague d'Ombre" (cône de 6m, DC 14 Constitution, 3d8 dégâts nécrotiques, moitié en cas de réussite). Vulnérable à la lumière radieuse (double dégâts). Si les joueurs ont visité Théodore au Ch1, ils ont un avantage. Si Grimdak a amélioré une arme, elle traverse les résistances. Le combat se déroule autour du piédestal — les joueurs peuvent essayer de récupérer le Marteau PENDANT le combat (action, Force DC 14 pour le soulever — il est magiquement scellé) et l'utiliser comme arme (+2, 1d8+2 radieux supplémentaires contre les créatures d'ombre).

Tactique : le Démon utilise les ombres de la caverne pour se téléporter de cristal en cristal (mouvement bonus, 2 fois avant recharge). Si les joueurs brisent les cristaux, le Démon perd cette capacité.`,
    dialogues: [
      {
        npcId: 'npc_gardien_ombre', npcName: 'Gardien d\'Ombre',
        lines: [
          { trigger: 'Menace', text: `*Sa voix est un grondement de caverne.* Le Maître m'a posté ici pour garder Ce Qui Ne Doit Pas Bouger. Chaque sceau brisé nous rend plus forts. Chaque jour qui passe, le Miroir s'entrouvre davantage. Vous n'êtes que des insectes qui retardent l'inévitable.`, tone: 'menaçant-calme' },
          { trigger: 'Vaincu', text: `*Se dissipant en fumée noire.* Vous... retardez... l'inévitable... Le Miroir... s'ouvre... et il n'y a pas... assez de lumière... dans votre monde... pour empêcher... la Nuit...`, tone: 'mourant' }
        ]
      }
    ],
    objectives: [
      { description: 'Vaincre le Gardien d\'Ombre', type: 'combat', optional: false },
      { description: 'Récupérer le Marteau de Thogrund', type: 'collect', optional: false }
    ],
    transitions: [
      { condition: 'Marteau récupéré', nextScene: 'ch4_s4_restauration', label: '→ Restauration du Sceau' }
    ],
    encounters: ['Démon d\'Ombre Majeur (CR 5)'],
    skillChecks: [
      { skill: 'Force', dc: 14, success: 'Vous arrachez le Marteau de Thogrund de son piédestal — il pulse d\'une lumière dorée dans vos mains.', failure: 'Le Marteau est scellé magiquement. Il faudra vaincre le Gardien d\'abord.' }
    ],
    loot: ['Marteau de Thogrund (arme +2, +1d8 radieux vs ombre)'],
    estimatedMinutes: 25, mood: 'combat-boss',
    music: 'Boss — percussions lourdes, chœurs nains de guerre', location: 'Hammerdeep — Veine du Dragon, Grande Caverne'
  },
  {
    id: 'ch4_s4_restauration', chapterId: 'ch4', sceneNumber: 4,
    title: 'Le Rituel de la Forge', type: 'narration',
    readAloud: `De retour à Hammerdeep, le Marteau de Thogrund dans vos mains, le monde change. Les nains que vous croisez dans les tunnels s'arrêtent. Ils regardent le Marteau avec des yeux grands comme des assiettes, puis tombent à genoux — d'abord un, puis deux, puis des dizaines. Un murmure se propage dans la montagne comme une onde de choc silencieuse : "Le Marteau est revenu. Le Marteau de Thogrund est revenu."

Le Thane Durinn vous attend dans la Salle du Trône. Quand vous posez le Marteau devant lui, le vieux nain se lève de son siège de granit — un geste qu'il n'a probablement pas fait pour un étranger depuis des décennies. Il prend le Marteau dans ses mains calleuses, le soulève dans la lumière orange des Grandes Forges qui filtre par les puits de ventilation, et pendant un instant — un seul instant — le Thane Durinn, le nain le plus dur de la Montagne d'Acier, a les larmes aux yeux.

"C'est le Marteau de mon ancêtre," murmure-t-il d'une voix rauque d'émotion contenue. "La dernière fois qu'un nain l'a tenu, c'était Thogrund lui-même, il y a 120 ans. Le jour où il a scellé l'Ombre."

Il se tourne vers la salle, vers ses forgerons, vers ses guerriers, vers son peuple rassemblé en silence, et sa voix tonne comme un marteau sur l'enclume du monde : "ALLUMEZ LA GRANDE FORGE ! PRÉPAREZ LES RUNES ! Ce soir, nous réparons le Sceau de la Montagne !"

Le rituel de réparation dure toute la nuit. La Grande Forge — un bassin de lave contrôlée au cœur le plus profond d'Hammerdeep — est alimentée jusqu'à devenir un soleil souterrain, si brillant que les ombres reculent dans les moindres fissures de la roche. Cent nains forgerons frappent l'enclume en rythme — un battement de cœur de la montagne qui fait vibrer la pierre à des kilomètres. Le Thane, le Marteau de Thogrund levé au-dessus de sa tête, frappe les runes du Sceau une par une, chaque coup libérant un flash de lumière dorée et un son qui n'est pas du métal sur du métal mais du sacré sur du profane — une note pure, cristalline, qui nettoie l'air comme une pluie d'été.

Et lorsque le dernier coup résonne — un coup qui fait taire cent marteaux d'un seul écho — une lumière dorée jaillit du sol comme une geyser de feu sacré. Elle monte le long des tunnels, des galeries, des puits, traversant la montagne entière de bas en haut comme un pilier de lumière vivante, et explose au sommet dans un flash visible depuis Sol-Aureus. Le Sceau de la Montagne est réparé. Pas stabilisé. Pas colmaté. RÉPARÉ.`,
    gmNotes: `Scène de rituel spectaculaire. C'est la première fois qu'un Sceau est RÉPARÉ (les précédents ont été stabilisés mais pas guéris). Cela montre aux joueurs que la victoire est possible. Le Thane, impressionné, tient sa promesse : cent guerriers nains pour l'Alliance. Il donne aussi au joueur le plus méritant le titre de "Frère/Sœur de la Forge" — un honneur nain qui ouvre des portes dans tous les royaumes nains. Transition vers Ch5 : des éclaireurs nains rapportent que les "Ombres se rassemblent" au Col des Tempêtes — route vers le prochain Sceau. Les joueurs ont une armée naine comme alliée maintenant.`,
    dialogues: [
      {
        npcId: 'npc_thane_durinn', npcName: 'Thane Durinn',
        lines: [
          { trigger: 'Le Marteau', text: `*Il tient le Marteau avec des mains tremblantes.* Mon ancêtre Thogrund a donné sa vie pour forger ce Marteau et poser le Sceau. Il est mort d'épuisement trois jours après le rituel. *Il les regarde.* Vous m'avez rendu l'héritage de mon clan. Le clan Durinn ne l'oubliera JAMAIS.`, tone: 'ému' },
          { trigger: 'L\'Alliance', text: `*Redressé, de nouveau le Thane.* Cent haches naines. Des armes d'acier runique pour vos troupes. Et le Marteau de Thogrund restera avec vous — il est lié à la quête, pas à cette montagne. Utilisez-le bien. *Il frappe son poing sur sa poitrine.* Pour la Forge et la Lumière !`, tone: 'solennel' },
          { trigger: 'Prochaine étape', text: `Mes éclaireurs rapportent des mouvements d'ombre au Col des Tempêtes. C'est la route vers l'Est — vers les ruines d'Ashka et le royaume elfique. Si le culte frappe là-bas, la route sera coupée. Je vous conseille de vous hâter.`, tone: 'stratégique' }
        ]
      }
    ],
    objectives: [
      { description: 'Assister au rituel de restauration du Sceau', type: 'special', optional: false },
      { description: 'Recevoir l\'alliance du Thane Durinn', type: 'talk', optional: false }
    ],
    transitions: [
      { condition: 'Sceau réparé — FIN DU CHAPITRE 4', nextScene: 'ch5_s1_col', label: '→ Ch.5 : Le Col des Tempêtes' }
    ],
    loot: ['Titre : Frère/Sœur de la Forge (accès aux royaumes nains)', '100 guerriers nains (alliés)', 'Armure Runique (CA +1, un joueur)'],
    estimatedMinutes: 12, mood: 'triomphe-forge',
    music: 'Forge épique — cent marteaux, chœurs nains, flammes', location: 'Hammerdeep — Grandes Forges'
  }
];
// ── Stat Blocks ──────────────────────────────────────────────────────
const CH4_STAT_BLOCKS: Record<string, import('./types').StatBlock> = {
  dragon_lave: {
    name: 'Jeune Dragon de Lave', cr: '5', ac: 16, hp: 95,
    speed: '30 ft., vol 60 ft., nage 30 ft. (lave)',
    abilities: { str: 19, dex: 10, con: 17, int: 8, wis: 11, cha: 15 },
    attacks: [
      { name: 'Morsure', bonus: '+7', damage: '2d10+4 perforant + 1d6 feu', notes: '' },
      { name: 'Griffes', bonus: '+7', damage: '2d6+4 tranchant', notes: '' },
      { name: 'Souffle de Lave (recharge 5-6)', bonus: '', damage: '7d6 feu', notes: 'Cône 30 pieds, JDS Dextérité DC 14 pour moitié. La lave reste au sol 1 round (terrain difficile, 2d6 feu si traversé).' }
    ],
    specialAbilities: [
      'Immunité au feu.',
      'Vulnérabilité au froid.',
      'Sens de la terre : perception des vibrations dans la roche à 60 pieds.',
      'Bain de lave : se régénère de 10 PV par round s\'il est submergé dans la lave.'
    ],
    weakness: 'Froid — les attaques de froid infligent des dégâts doublés et réduisent sa vitesse de moitié pour 1 round.'
  },
  golem_pierre: {
    name: 'Golem de Pierre Gardien', cr: '4', ac: 17, hp: 76,
    speed: '25 ft.',
    abilities: { str: 20, dex: 8, con: 18, int: 3, wis: 10, cha: 1 },
    attacks: [
      { name: 'Poing de pierre', bonus: '+7', damage: '2d8+5 contondant', notes: '' },
      { name: 'Piétinement', bonus: '+7', damage: '2d6+5 contondant', notes: 'Créatures à terre seulement.' }
    ],
    specialAbilities: [
      'Immunité à la magie : avantage aux JDS contre sorts et effets magiques.',
      'Forme immuable : immunité aux sorts qui modifient sa forme.',
      'Ralentissement (recharge 5-6) : chaque créature dans un rayon de 10 pieds, JDS Sagesse DC 13 ou ralentie pour 1 minute.',
      'Mot de passe nain : dire "Thogrund" en nain ancien le désactive. Intelligence DC 15 (Histoire) pour connaître le mot.'
    ],
    weakness: 'Le mot de passe nain le neutralise. Les attaques d\'acide ignorent sa résistance.'
  }
};

// ── Room Descriptions ────────────────────────────────────────────────
const CH4_ROOMS: import('./types').RoomDescription[] = [
  {
    id: 'salle_trone_durinn', name: 'Salle du Trône de Durinn',
    readAloud: 'Une caverne immense taillée dans le granit noir. Des colonnes sculptées représentant les rois nains passés soutiennent un plafond à 30 mètres. Le trône est forgé en acier runique, chauffé par en dessous par des rivières de magma visibles à travers le sol de verre volcanique.',
    gmNotes: 'Le Thane Durinn siège ici. 40 gardes nains (Vétérans). Deux conseillers : Forge-Maître Kelda et Archiviste Galdur. Le sol de verre montre la rivière de magma 3 mètres en dessous — peut être brisé (CA 15, 30 PV) pour créer un danger.',
    exits: [
      { direction: 'Nord', targetRoomId: 'veine_dragon_entree', description: 'Escalier de 300 marches vers la Veine du Dragon' },
      { direction: 'Est', targetRoomId: 'grandes_forges', description: 'Tunnel menant aux Grandes Forges' },
      { direction: 'Sud', targetRoomId: 'quartiers_visiteurs', description: 'Couloir vers les quartiers des visiteurs' }
    ],
    dimensions: '40m × 25m', lighting: 'magique'
  },
  {
    id: 'veine_dragon_entree', name: 'Veine du Dragon — Entrée',
    readAloud: 'Un tunnel naturel s\'enfonce dans la montagne. Les parois brillent d\'un réseau de veines rougeoyantes — du minerai de feu démon. La chaleur est suffocante, l\'air vibre. Des rails de chariot rouillés serpentent dans l\'obscurité.',
    gmNotes: 'Température extrême : JDS Constitution DC 10 toutes les heures ou 1 niveau d\'épuisement. Les nains sont immunisés. Rails de chariot fonctionnels si un joueur réussit Investigation DC 12.',
    exits: [
      { direction: 'Profondeur', targetRoomId: 'veine_dragon_coeur', description: 'Tunnel principal (2 heures de marche)' },
      { direction: 'Retour', targetRoomId: 'salle_trone_durinn', description: 'Escalier vers la Salle du Trône' }
    ],
    dimensions: '5m largeur × infini', lighting: 'faible',
    traps: [{ name: 'Éboulement piégé', detectionDC: 14, disarmDC: 12, effect: 'Section de tunnel s\'effondre', damage: '3d6 contondant, JDS Dextérité DC 13 pour moitié' }]
  },
  {
    id: 'grandes_forges', name: 'Les Grandes Forges',
    readAloud: 'Cent enclumes résonnent en rythme. Des nains martèlent le métal incandescent tandis que des rivières de lave alimentent les foyers. Au centre, une enclume géante marquée de runes — l\'Enclume de Thogrund, l\'artefact qui peut réparer les Sceaux.',
    gmNotes: 'L\'Enclume de Thogrund nécessite le Marteau de Thogrund (trouvé dans la Veine du Dragon). Le rituel de réparation du Sceau prend 4 heures et nécessite 3 JDS Constitution DC 12 (un par heure). Chaque échec ajoute 1 niveau d\'épuisement.',
    exits: [{ direction: 'Ouest', targetRoomId: 'salle_trone_durinn', description: 'Tunnel vers la Salle du Trône' }],
    dimensions: '60m × 40m', lighting: 'vif'
  }
];

// ── Side Quests ──────────────────────────────────────────────────────
const CH4_SIDE_QUESTS: import('./types').SideQuest[] = [
  {
    id: 'sq_mineurs_disparus',
    title: 'Les Mineurs de la Veine Noire',
    description: 'Une équipe de 6 mineurs a disparu dans un tunnel secondaire de la Veine du Dragon il y a 3 jours. La Forge-Maître Kelda demande aux PJ de les retrouver pendant leur descente.',
    giver: 'Forge-Maître Kelda',
    hookText: '"Six de mes meilleurs ont pris le tunnel nord-est et ne sont jamais revenus. La montagne les a peut-être avalés... ou pire."',
    reward: '200 PO + Pioche de Mithral (+1 aux dégâts contre terre élémentaire, sert d\'arme)',
    objectives: [
      'Trouver l\'entrée du tunnel nord-est dans la Veine du Dragon (Survie DC 11)',
      'Naviguer les éboulements (Athlétisme DC 13 ou 2d6 contondant)',
      'Découvrir que les mineurs sont piégés derrière un Golem de Pierre qui s\'est réactivé',
      'Vaincre ou désactiver le Golem (mot de passe : "Thogrund" en nain — Histoire DC 15)',
      'Ramener les mineurs vivants (3 blessés, besoin de soins)'
    ],
    consequenceIfIgnored: 'Les mineurs meurent. Kelda blâme les PJ. -2 au jet de Persuasion avec le Thane Durinn au Chapitre suivant.',
    estimatedMinutes: 40, difficulty: 'moyen'
  },
  {
    id: 'sq_relique_borin',
    title: 'La Relique de Borin le Premier',
    description: 'L\'Archiviste Galdur sait qu\'une relique de Borin le Premier — un casque runique — est cachée dans la Veine du Dragon. Il offre sa connaissance du Sceau en échange.',
    giver: 'Archiviste Galdur',
    reward: 'Casque de Borin (avantage JDS contre Peur, vision Ténèbres 60 pieds) + Avantage au jet de réparation du Sceau',
    objectives: [
      'Accepter la demande de Galdur (il donne une carte partielle du tunnel)',
      'Trouver l\'alcôve secrète dans la Veine (Perception DC 14, indiquée sur la carte)',
      'Résoudre l\'énigme runique sur le coffre (Investigation DC 13 ou lire le nain ancien)',
      'Ramener le casque à Galdur'
    ],
    consequenceIfIgnored: 'Galdur est déçu mais coopère quand même. Pas d\'avantage pour la réparation du Sceau.',
    estimatedMinutes: 25, difficulty: 'facile'
  }
];

// ── Random Encounters ────────────────────────────────────────────────
const CH4_RANDOM_ENCOUNTERS: import('./types').RandomEncounter[] = [
  { d20Range: '1-4', description: 'Éboulement mineur — JDS Dextérité DC 12 ou 1d6 contondant et terrain difficile sur 10 pieds.', difficulty: 'facile', loot: ['Veines de gemmes exposées (30 PO en grenats bruts)'] },
  { d20Range: '5-8', description: 'Salamandre de feu (1) — CR 1. Patrouille les tunnels chauds. Fuit si réduite à moins de la moitié de ses PV.', difficulty: 'facile', creatures: ['Salamandre de feu'], loot: ['Écaille de salamandre (composant alchimique, 25 PO)'] },
  { d20Range: '9-12', description: 'Poche de gaz — JDS Constitution DC 13 ou empoisonné 10 minutes. Perception DC 12 pour détecter l\'odeur avant d\'entrer.', difficulty: 'moyen', loot: ['Cristal de soufre (15 PO)'] },
  { d20Range: '13-16', description: 'Élémentaire de magma mineur (1) — CR 2. Gardien antique qui défend un ancien autel nain.', difficulty: 'moyen', creatures: ['Élémentaire de magma'], loot: ['Fragment de mithral brut (40 PO)', 'Ancien jeton de prière nain'] },
  { d20Range: '17-20', description: 'Fantôme du Mineur Borik — apparition bienveillante. Si Persuasion DC 12, guide les PJ vers un raccourci (-1 heure de trajet) ou un trésor caché.', difficulty: 'facile', loot: ['300 PO en gemmes si trésor, ou gain de temps'] }
];

export const CHAPTER_4: NarrativeChapter = {
  id: 'ch4', number: 4, title: 'Les Forges d\'Hammerdeep',
  subtitle: 'Diplomatie naine et restauration du Sceau de la Montagne',
  summary: 'Négociation avec le Thane Durinn, descente dans la Veine du Dragon pour récupérer le Marteau de Thogrund, et premier Sceau réparé grâce au rituel de la Forge.',
  suggestedLevel: 5, region: 'Hammerdeep',
  themes: ['Diplomatie', 'Donjon minier', 'Lore nain', 'Restauration'],
  scenes: CH4_SCENES, previousChapter: 'ch3', nextChapter: 'ch5',
  sideQuests: CH4_SIDE_QUESTS,
  randomEncounters: CH4_RANDOM_ENCOUNTERS,
  statBlocks: CH4_STAT_BLOCKS,
  roomDescriptions: CH4_ROOMS
};
