/**
 * ACTE 5 - EXPANSION DES SCENES
 * Nouvelles scènes pour les Chapitres 11, 12 et 13
 * 14 scènes additionnelles pour enrichir l'expérience de jeu
 */

import type { BookScene } from './gm-book-data';

// ============================================================================
// CHAPITRE 11 : LA MARCHE DES HÉROS — Scènes additionnelles
// ============================================================================

const scene_5_11_departure: BookScene = {
  id: 'scene-5-11-departure',
  sceneNumber: 301,
  title: "L'Adieu au Soleil",
  type: 'narration',
  location: "Grande Porte de Sol-Aureus",
  locationId: 'sol-aureus-porte',
  estimatedMinutes: 25,
  readAloud: {
    text: `L'aube se lève sur Sol-Aureus pour la dernière fois avant la fin du monde — ou son salut.

La Grande Porte est ouverte. Pas à moitié, pas avec prudence — grande ouverte, comme un cœur exposé. Et devant elle, l'armée de l'Alliance se tient au garde-à-vous, bannières au vent, armures brillant dans la lumière dorée du matin.

Ils sont des milliers. Les soldats de la Garde Royale dans leur acier poli. Les paladins de l'Aube d'Argent, leur bannière argentée claquant au vent. Les guerriers nains de Forgefer, martelant leurs boucliers en cadence. Les mages de la Guilde des Arcanes, robes bleues flottant dans la brise, bâtons crépitant d'énergie. Les éclaireurs des Gardiens d'Émeraude, silhouettes vertes fondues dans les ombres de l'arrière-garde. Et au milieu de tout ça, les volontaires — les fermiers, les marchands, les artisans qui ont pris les armes pour la première fois.

Sur les murailles de Sol-Aureus, la ville regarde partir ceux qu'elle aime.

Des familles. Des enfants sur les épaules de leurs parents. Des vieillards aux yeux humides. Des mains qui s'agitent, des voix qui crient des noms, des promesses lancées par-dessus le vent. Des fleurs jetées du haut des remparts, qui tombent sur les armures comme une bénédiction colorée.

La Reine Elara se tient au sommet de la porte. Sa voix, amplifiée par la magie, porte sur toute l'armée et au-delà.

« Peuple d'Aethelgard. Défenseurs de la lumière. Aujourd'hui, vous marchez vers l'inconnu. Certains d'entre vous ne reviendront pas. Je ne vous mentirai pas — le chemin sera cruel, l'ennemi impitoyable, et la victoire incertaine. Mais je sais ceci : chaque pas que vous ferez sera un pas fait pour ceux qui restent. Pour ces enfants sur ces murs. Pour cette ville. Pour ce monde. »

Elle tire son épée. Le soleil l'embrase comme une étoile.

« Marchez, héros. Et revenez-nous. »

L'armée s'ébranle. Le sol tremble. Et Sol-Aureus disparaît derrière vous, une perle d'or qui rétrécit à l'horizon, emportant avec elle tout ce que vous avez à protéger.`,
    mood: "Départ épique, émotion collective, poids du devoir",
    music: "Marche orchestrale grandissante, cuivres héroïques, chœur montant, tambours de marche",
  },
  gmNotes: [
    { type: 'info', text: "Le départ de Sol-Aureus est le premier acte de l'Acte 5. C'est un moment de communion entre les PJ, l'armée et les civils. L'émotion doit être palpable." },
    { type: 'tip', text: "Personnalisez les adieux. Qui reste à Sol-Aureus que les PJ connaissent ? Le tavernier Brok ? Un PNJ de l'Acte 1 ? Donnez à chaque PJ une raison de se retourner une dernière fois." },
    { type: 'warning', text: "Ce n'est pas un moment pour les mécaniques de jeu. Pas de jets de dés. Juste la narration, les émotions, et le poids de ce qui va suivre." },
    { type: 'secret', text: "La Reine Elara sait qu'elle ne reverra peut-être pas ces soldats. Son plan de sacrifice — activer l'artefact qui scellera les Terres Brûlées avec elle à l'intérieur — est toujours en place, au cas où le Grand Rituel échouerait." },
    { type: 'lore', text: "La tradition de Sol-Aureus veut que les soldats partant en guerre passent sous la Grande Porte. Ceux qui reviennent passent sous la Porte du Triomphe, de l'autre côté de la ville. Certaines années, la Porte du Triomphe reste fermée." },
  ],
  choices: [
    {
      id: 'choice-departure-moment',
      prompt: "Que fait le héros au moment de franchir la Grande Porte ?",
      options: [
        {
          label: "Se retourner une dernière fois",
          description: "Graver l'image de Sol-Aureus dans sa mémoire.",
          consequence: "L'image de la ville dorée dans la lumière du matin devient un talisman intérieur. Quand tout sera sombre, ce souvenir sera une lanterne. Avantage sur un jet de sauvegarde de Sagesse durant l'Acte 5.",
          nextScene: 'scene-5-11-night-attack',
        },
        {
          label: "Marcher sans regarder en arrière",
          description: "Les yeux devant. Le passé est derrière. Seul l'avenir compte.",
          consequence: "La détermination est comme une armure invisible. +1 aux jets d'attaque pour la première journée de marche. Les soldats autour de vous marchent plus droit en voyant votre résolution.",
          nextScene: 'scene-5-11-night-attack',
        },
        {
          label: "Lever l'épée vers les murailles",
          description: "Un salut silencieux à ceux qui restent — une promesse sans mots.",
          consequence: "Le geste est vu par des milliers de personnes sur les murs. Il deviendra un symbole — gravé dans des peintures, raconté dans des chansons. Le Peuple de Sol-Aureus s'en souviendra.",
          nextScene: 'scene-5-11-night-attack',
          reputationChange: [{ faction: "Peuple de Sol-Aureus", amount: 15 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-5-11-night-attack'],
  previousScene: 'scene-4-10-eve-battle',
};

const scene_5_11_night_attack: BookScene = {
  id: 'scene-5-11-night-attack',
  sceneNumber: 302,
  title: "Les Crocs de la Nuit",
  type: 'combat',
  location: "Camp de l'Alliance, troisième nuit de marche",
  locationId: 'route-nexus',
  estimatedMinutes: 40,
  readAloud: {
    text: `La troisième nuit est celle où ils frappent.

Le camp de l'Alliance est disposé en cercles défensifs, comme le Général Marcus l'a ordonné. Des feux de garde brûlent à intervalles réguliers, des sentinelles patrouillent le périmètre, et les pièges ont été posés dans un rayon de cent mètres. Tout est fait selon les règles.

Mais le Cercle des Cendres ne joue pas selon les règles.

L'attaque commence par le silence. Les bruits de la nuit — les grillons, le vent, les chouettes — s'arrêtent d'un coup, comme si quelqu'un avait coupé le son du monde. Puis l'obscurité s'épaissit. Les feux de garde vacillent, rétrécissent, s'éteignent. Les runes de protection que les mages ont posées clignotent — et meurent.

Et dans ce noir absolu, des yeux s'allument. Verts. Des dizaines. Des centaines. Des milliers.

L'alarme retentit une seconde trop tard. Les premières tentes sont déjà en feu quand les morts-vivants surgissent de la terre elle-même — ils étaient enterrés là, attendant, depuis des semaines, peut-être des mois. Un piège d'une patience terrifiante.

Le chaos est total. Des soldats se battent en chemise de nuit. Des chevaux hurlent. Des explosions de magie noire déchirent la nuit. Et au milieu de tout ça, une voix résonne — amplifiée par la nécromancie, froide comme un tombeau.

Archon Vexor.

« Combien de vos soldats mourront cette nuit, héros ? Vingt ? Cent ? Mille ? Chaque mort qui tombe se relève de mon côté. La mathématique est simple. Et les maths ne mentent jamais. »`,
    mood: "Chaos nocturne, terreur, héroïsme instinctif",
    music: "Silence brutal puis explosion sonore, percussions frénétiques, cuivres discordants, cris de bataille",
  },
  gmNotes: [
    { type: 'info', text: "Raid nocturne surprise du Cercle des Cendres. L'objectif n'est pas de détruire l'armée mais de l'affaiblir et de saper le moral. Les morts-vivants enterrés sont un piège préparé de longue date." },
    { type: 'tip', text: "Jouez le chaos. Les PJ se réveillent en plein combat. Pas le temps de s'équiper complètement — les premiers rounds devraient être en armure partielle (CA réduite). C'est fait pour être stressant." },
    { type: 'warning', text: "Le raid est conçu pour être gagnable mais coûteux. Les PJ ne peuvent pas sauver tout le monde. Des PNJ secondaires vont mourir — choisissez des personnages que les joueurs connaissent pour que ça fasse mal." },
    { type: 'secret', text: "Vexor n'est pas vraiment là — c'est une projection. Le vrai Vexor est à dix kilomètres, contrôlant les morts-vivants à distance. Si les PJ le comprennent, ils peuvent tenter de tracer la source de la nécromancie." },
  ],
  encounter: {
    name: "Raid Nocturne du Cercle des Cendres",
    enemies: [
      { name: "Mort-Vivant Enterré (x8)", hp: 35, atk: 12, ac: 13, cr: 3, abilities: ["Surgissement (attaque surprise)", "Étreinte (grappin, 2d6 nécrotique/tour)"] },
      { name: "Ombre Assassine (x3)", hp: 55, atk: 17, ac: 16, cr: 6, abilities: ["Dissimulation dans les ténèbres (invisible dans l'obscurité)", "Frappe vampirique (3d8 nécrotique, soigne l'ombre)"] },
      { name: "Nécromancien de Raid", hp: 75, atk: 16, ac: 14, cr: 8, abilities: ["Animation instantanée (relève un cadavre allié à chaque tour)", "Cercle d'obscurité (15m rayon, ténèbres magiques)", "Bouclier spectral (réaction, +5 CA)"] },
    ],
    terrain: ["Tentes en feu (terrain difficile, 1d6 feu par tour)", "Obscurité magique (ténèbres dans 30m autour du nécromancien)", "Tranchées défensives (couverture mais mobilité réduite)", "Chevaux paniqués (danger de piétinement)"],
    tactics: "Les morts-vivants enterrés surgissent au milieu du camp pour semer le chaos. Les ombres assassines ciblent les officiers et les mages. Le nécromancien reste en arrière, recyclant les morts en nouveaux combattants.",
    loot: ["Amulette de Contrôle Nécrotique (permet de commander temporairement un mort-vivant)", "Carte marquée des positions du Cercle", "Journal de l'Ombre Assassine (informations sur Vexor)"],
  },
  skillChecks: [
    { skill: 'Perception', dc: 50, success: "Vous repérez le nécromancien caché derrière une colline. L'éliminer en priorité arrêtera la résurrection des morts-vivants.", failure: "Le chaos est trop dense pour repérer la source de la nécromancie. Vous combattez les symptômes, pas la cause." },
    { skill: 'Commandement', dc: 50, success: "Vos ordres traversent le chaos comme un phare. Les soldats se rallient autour de vous, formant une ligne de défense cohérente.", failure: "Vos ordres sont perdus dans le bruit. Les soldats se battent individuellement — courageux mais inefficaces." },
  ],
  choices: [
    {
      id: 'choice-night-attack',
      prompt: "Au cœur du raid, un choix s'impose.",
      options: [
        {
          label: "Protéger l'infirmerie",
          description: "Les blessés et les guérisseurs sont des cibles faciles — les défendre en priorité.",
          consequence: "L'infirmerie est sauvée. Les blessés survivent, les guérisseurs peuvent continuer à soigner. Mais le flanc est tenu par d'autres secteurs qui souffrent sans renforts.",
          nextScene: 'scene-5-11-deserters',
          reputationChange: [{ faction: "Aube d'Argent", amount: 10 }],
        },
        {
          label: "Chasser le nécromancien",
          description: "Trouver et éliminer la source de la nécromancie pour stopper le raid.",
          consequence: "Si le nécromancien tombe, les morts-vivants s'effondrent. Le raid est terminé en quelques minutes. Mais le temps de le trouver, les dégâts s'accumulent.",
          nextScene: 'scene-5-11-deserters',
          skillCheck: { skill: 'Discrétion', dc: 50, success: "Vous trouvez le nécromancien et l'abattez en silence. Les morts-vivants s'effondrent comme des marionnettes coupées de leurs fils.", failure: "Le nécromancien vous repère et déchaîne ses forces sur vous. Combat direct, brutal, sans filet." },
        },
        {
          label: "Rallier les troupes pour une contre-attaque",
          description: "Organiser une réponse coordonnée et repousser l'ennemi.",
          consequence: "La contre-attaque est sanglante mais efficace. Le raid est repoussé en une heure. Le moral de l'armée, secoué, se rétablit grâce à la victoire. Mais les pertes sont significatives.",
          nextScene: 'scene-5-11-deserters',
          reputationChange: [{ faction: "Garde Royale", amount: 15 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-5-11-deserters'],
  previousScene: 'scene-5-11-departure',
};

const scene_5_11_deserters: BookScene = {
  id: 'scene-5-11-deserters',
  sceneNumber: 303,
  title: "Ceux Qui Partent",
  type: 'social',
  location: "Lisière du camp, aube après le raid",
  locationId: 'route-nexus',
  estimatedMinutes: 25,
  readAloud: {
    text: `Le lendemain du raid, l'armée compte ses morts. Le chiffre fait mal — pas autant qu'il aurait pu, mais assez.

Et au matin, un autre chiffre fait mal.

Cent dix-sept. C'est le nombre de soldats qui ont déserté pendant la nuit. Cent dix-sept hommes et femmes qui ont posé leur épée, retourné leur armure, et disparu dans l'obscurité. Pas des lâches — des gens terrifiés, épuisés, qui ont vu trop de morts se relever pour en affronter davantage.

Le Général Marcus est furieux. L'Ombre est indifférent. Le Capitaine Aldric — s'il est encore là — serre les dents et ne dit rien.

Mais l'un des déserteurs n'est pas parti. Il se tient à la lisière du camp, son paquetage sur le dos, l'air d'un homme déchiré entre deux directions. C'est un jeune fermier — vous le reconnaissez, c'est l'un de ceux que vous avez entraînés. Il avait du courage, de la volonté, un bon bras droit.

Et il a peur. Pas la peur d'un lâche — la peur d'un homme de vingt ans qui a vu un mort-vivant manger son ami et qui se demande pourquoi il devrait mourir pour un monde qui ne connaît même pas son nom.

Il vous voit. Il hésite. Il attend.

Le reste de l'armée vous regarde aussi. Comment vous gérez ce moment dira tout sur le genre de leader que vous êtes.`,
    mood: "Crise morale, humanité face à la guerre, leadership par l'exemple",
    music: "Silence lourd, vent de plaine, cordes tendues, note de hautbois seule et fragile",
  },
  gmNotes: [
    { type: 'info', text: "Scène de dilemme moral. Les déserteurs ne sont pas des méchants — ce sont des gens ordinaires au-delà de leurs limites. Comment les PJ réagissent définit leur style de leadership." },
    { type: 'tip', text: "Donnez un visage au déserteur hésitant. Utilisez un personnage que les joueurs ont rencontré lors de l'entraînement (scène 4-10-training). La familiarité rend le dilemme plus poignant." },
    { type: 'warning', text: "Il n'y a pas de bonne réponse universelle. Punir les déserteurs maintient la discipline mais brise le moral. Les laisser partir est humain mais affaiblit l'armée. Chaque choix a un coût." },
    { type: 'secret', text: "Parmi les déserteurs qui sont partis, trois sont en fait des agents du Cercle qui profitent du chaos pour s'enfuir avec des informations sur les plans de l'Alliance. Cette fuite passera inaperçue." },
  ],
  npcs: [
    {
      name: "Tomás, le fermier hésitant",
      role: "Recrue volontaire en crise de foi",
      personality: "Honnête, effrayé, tiraillé. N'a jamais voulu être un héros — il voulait juste protéger sa ferme. Mais sa ferme a brûlé et maintenant il est ici et il ne sait plus pourquoi.",
      appearance: "Jeune homme mince, vingt ans à peine, yeux rouges de manque de sommeil. Armure de milicien tachée de sang qui n'est pas le sien. Mains qui tremblent.",
      dialogues: {
        greeting: "« Je... je sais ce que vous allez dire. Le devoir. L'honneur. Le monde. (voix qui tremble) Mais est-ce que le monde sait que j'existe ? Est-ce que le monde se souvient de Tomás du village d'Aubefeuille ? »",
        info: "« La nuit dernière, j'ai vu mon ami se faire manger. Pas tuer — manger. Par un truc qui était mort lui aussi. Et après, il s'est relevé. Et il m'a regardé avec des yeux vides. Mon ami. Et je me suis dit... est-ce que c'est ce qui m'attend ? »",
        quest: "« Dites-moi pourquoi. Pas les grands mots, pas les beaux discours. Dites-moi pourquoi MOI, Tomás, fermier, fils de personne, je dois mourir pour des Sceaux que je ne comprends même pas. »",
        farewell: "« (essuie ses yeux) ... D'accord. (repose son paquetage) D'accord. Mais si je meurs, vous dites à quelqu'un que j'existais. Promettez. »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Persuasion', dc: 50, success: "Vos mots trouvent quelque chose de vrai dans le cœur de Tomás. Pas du courage — de la raison. Il ne se bat pas pour le monde. Il se bat pour Aubefeuille, pour son ami mort, pour la certitude que ça compte.", failure: "Tomás écoute. Il hoche la tête. Mais ses yeux restent vides. Il reste... mais par obéissance, pas par conviction." },
    { skill: 'Intimidation', dc: 40, success: "L'armée entend votre message : la désertion ne sera pas tolérée. La discipline se resserre. Mais dans les yeux de certains soldats, la peur devient du ressentiment.", failure: "Votre tentative d'intimidation tombe à plat. Ces gens ont déjà affronté des morts-vivants. Votre colère ne les impressionne pas." },
  ],
  choices: [
    {
      id: 'choice-deserters',
      prompt: "Comment les héros gèrent-ils les déserteurs ?",
      options: [
        {
          label: "Discours de compassion",
          description: "Comprendre leur peur, honorer leur courage d'avoir tenu jusque-là, et les inviter à rester.",
          consequence: "La plupart des hésitants restent. Le moral remonte, basé sur le respect mutuel. Quelques déserteurs reviennent même au fil de la journée. Mais la discipline est plus souple.",
          nextScene: 'scene-5-11-vision',
          reputationChange: [{ faction: "Peuple de Sol-Aureus", amount: 15 }],
        },
        {
          label: "Application stricte de la discipline",
          description: "Rappeler que la désertion en temps de guerre est un crime. Envoyer des pisteurs.",
          consequence: "La discipline est rétablie fermement. Personne d'autre ne déserte. Mais le ressentiment couve, et le lien entre les héros et les troupes est fragilisé.",
          nextScene: 'scene-5-11-vision',
          reputationChange: [{ faction: "Garde Royale", amount: 10 }, { faction: "Peuple de Sol-Aureus", amount: -10 }],
        },
        {
          label: "Les laisser partir",
          description: "Ouvrir les rangs. Ceux qui veulent partir sont libres. Ceux qui restent l'ont choisi.",
          consequence: "Trente soldats de plus partent. Mais ceux qui restent ont fait un choix conscient et leur résolution est de fer. Armée plus petite, plus déterminée.",
          nextScene: 'scene-5-11-vision',
        },
      ],
    },
  ],
  nextScenes: ['scene-5-11-vision'],
  previousScene: 'scene-5-11-night-attack',
};

const scene_5_11_vision: BookScene = {
  id: 'scene-5-11-vision',
  sceneNumber: 304,
  title: "L'Oeil du Monde",
  type: 'revelation',
  location: "Pic de l'Observatoire, route vers le Nexus",
  locationId: 'pic-observatoire',
  estimatedMinutes: 25,
  readAloud: {
    text: `Le Pic de l'Observatoire est le point le plus haut sur la route du Nexus — une aiguille de roche noire qui perce le ciel comme un doigt accusateur pointé vers les étoiles. Les anciens l'utilisaient pour observer les constellations. Les Premiers l'utilisaient pour observer les Sceaux. Vous allez l'utiliser pour regarder l'avenir en face.

L'ascension est rude mais brève. Au sommet, un cercle de pierres dressées, couvertes de runes des Premiers qui pulsent faiblement dans le crépuscule. Le vent est féroce ici — il hurle entre les pierres comme une voix cherchant des mots.

Et quand vous entrez dans le cercle, le monde disparaît.

La vision frappe comme un marteau. Vos pieds quittent le sol — non, le sol quitte vos pieds. Vous flottez dans un vide lumineux, et devant vous, Aethelgard se déploie comme une carte vivante. Vous voyez tout : les montagnes, les forêts, les mers, les villes, chaque vie comme un point de lumière dans un océan de conscience.

Et vous voyez les Sceaux. Cinq disques de lumière ancrés dans le monde, reliés par des filaments d'énergie qui pulsent comme un système nerveux. Trois sont fissurés, leurs lumières vacillantes. Un est intact. Le dernier... est presque éteint.

Et derrière les Sceaux, ELLE.

L'Entité. Ael'Sharath. Pas un démon. Pas un dieu. Quelque chose d'autre — quelque chose de si vaste, de si ancien, de si fondamentalement différent que votre esprit plie sous le poids de sa perception. Des géométries impossibles. Des couleurs qui n'existent pas. Des yeux — mille yeux, dix mille yeux — qui s'ouvrent et se ferment dans un rythme qui EST le temps lui-même.

Elle vous voit.

Et pour la première fois, vous comprenez l'ampleur de ce que vous affrontez.`,
    mood: "Révélation cosmique, terreur sacrée, compréhension transcendante",
    music: "Synthétiseur cosmique, basses infinies, chœur éthéré, silence entre les battements du monde",
  },
  gmNotes: [
    { type: 'info', text: "La vision au sommet est la révélation finale sur la nature de l'Entité et des Sceaux. Les PJ comprennent enfin l'ampleur du problème — et la complexité de la solution." },
    { type: 'tip', text: "Rendez cette vision sensorielle et déstabilisante. Les joueurs ne doivent pas juste comprendre intellectuellement — ils doivent RESSENTIR l'immensité de ce qu'ils affrontent." },
    { type: 'warning', text: "La révélation peut être écrasante pour les joueurs. Après la vision, donnez-leur un moment pour digérer. Laissez-les poser des questions, exprimer leurs doutes." },
    { type: 'secret', text: "La vision montre aussi quelque chose que l'Entité ne voulait probablement pas montrer : une faille. Un point où les Sceaux et l'Entité se touchent, où l'énergie circule dans les deux sens. C'est le point d'insertion du Grand Rituel." },
    { type: 'lore', text: "Le Pic de l'Observatoire est le seul endroit dans Aethelgard où la barrière entre le monde physique et le monde primordial est assez fine pour une perception directe. Les Premiers venaient ici pour 'écouter' le monde. Maintenant, le monde hurle." },
  ],
  choices: [
    {
      id: 'choice-vision-response',
      prompt: "Que retirent les héros de cette vision cosmique ?",
      options: [
        {
          label: "Résolution renforcée",
          description: "La vision confirme la justesse du combat. Pas de doute, pas d'hésitation.",
          consequence: "La certitude est une armure. Les PJ gagnent un bonus de +2 aux jets de sauvegarde de Sagesse pour le reste de l'Acte 5. L'Entité ne pourra pas les briser psychologiquement.",
          nextScene: 'scene-5-11-4',
        },
        {
          label: "Doute et remise en question",
          description: "L'Entité n'est peut-être pas un ennemi. Les Sceaux sont peut-être le vrai problème.",
          consequence: "Le doute ouvre des portes — et en ferme d'autres. Les PJ auront accès à des options de dialogue avec l'Entité que les autres n'auraient pas. Mais le doute affaiblit la résolution.",
          nextScene: 'scene-5-11-4',
        },
        {
          label: "Analyse tactique",
          description: "La faille dans les Sceaux est la clé. Se concentrer sur l'exploitation de cette faiblesse.",
          consequence: "L'information tactique est intégrée au plan du Grand Rituel. +2 aux jets liés au Rituel lors de la confrontation finale. L'approche analytique impressionne Vaelith.",
          nextScene: 'scene-5-11-4',
          reputationChange: [{ faction: "Guilde des Arcanes", amount: 10 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-5-11-4'],
  previousScene: 'scene-5-11-deserters',
};

// ============================================================================
// CHAPITRE 12 : LE NEXUS DES SCEAUX — Scènes additionnelles
// ============================================================================

const scene_5_12_antechamber: BookScene = {
  id: 'scene-5-12-antechamber',
  sceneNumber: 305,
  title: "Le Seuil du Dernier Savoir",
  type: 'exploration',
  location: "Antichambre du Nexus des Sceaux",
  locationId: 'nexus-antichambre',
  estimatedMinutes: 35,
  readAloud: {
    text: `L'entrée du Nexus des Sceaux est taillée dans une montagne qui n'apparaît sur aucune carte — parce qu'elle n'existait pas hier. Le Nexus se déplace, se cache, se révèle uniquement à ceux qui sont destinés à le trouver. Ou à ceux qui sont assez fous pour le chercher.

La porte est immense — vingt mètres de haut, sculptée dans une pierre noire qui absorbe la lumière. Pas de serrure, pas de poignée. Juste des fresques animées qui bougent lentement dans la pierre, comme des poissons dans un aquarium de granit.

Au-delà de la porte, l'antichambre.

C'est un hall circulaire si vaste que les murs se perdent dans l'obscurité. Le sol est un mosaïque impossible — des motifs qui changent quand on ne les regarde pas, des couleurs qui n'existent pas dans le spectre visible, des formes qui sont simultanément plates et tridimensionnelles.

Et partout, des fresques. Des murs au plafond, chaque centimètre est couvert de scènes peintes avec une précision hallucinante. L'histoire d'Aethelgard — pas celle qu'on raconte dans les livres, mais la VRAIE histoire. La création des Sceaux. La naissance des races. La chute des Premiers. Et ce qui viendra après.

Les fresques bougent.

Les personnages peints tournent la tête pour vous regarder. Leurs bouches s'ouvrent dans des avertissements silencieux. Leurs mains pointent vers le centre de la salle, où un puzzle de pierre et de lumière attend — le premier test du Nexus.

Trois cercles concentriques, chacun couvert de symboles primordiaux. Ils doivent être alignés dans le bon ordre pour ouvrir la voie. Le mauvais ordre active les défenses du Nexus — et les défenses du Nexus ne sont pas faites pour avertir. Elles sont faites pour détruire.`,
    mood: "Mystère ancien, intelligence requise, danger architectural",
    music: "Résonances de caverne, harmoniques cristallines, bourdonnement de magie primordiale, silence oppressant",
  },
  gmNotes: [
    { type: 'info', text: "L'antichambre est le premier défi du Nexus — un puzzle mécanique et magique qui teste l'intelligence et la connaissance des PJ. Les fresques sont des indices visuels." },
    { type: 'tip', text: "Les fresques racontent des événements que les PJ ont vécus — le siège de Sol-Aureus, la traversée de la Mer Noire, la Forge Primordiale. Chaque fresque contient un symbole lié au puzzle. Récompensez les joueurs attentifs." },
    { type: 'warning', text: "Le puzzle a une solution logique basée sur l'ordre chronologique des Sceaux. Si les joueurs sont bloqués, les fresques animées peuvent offrir des indices de plus en plus explicites." },
    { type: 'secret', text: "La dernière fresque — celle qui montre l'avenir — est vide. Pas peinte. Elle attend. Ce qui y sera peint dépend des choix que les héros feront dans le Nexus." },
    { type: 'lore', text: "Le Nexus des Sceaux est le point de convergence des cinq Sceaux — l'endroit où ils sont tous connectés. C'est aussi l'endroit le plus proche de l'Entité dans le monde physique. L'air vibre d'une énergie si dense qu'elle est presque visible." },
  ],
  skillChecks: [
    { skill: 'Intelligence', dc: 55, success: "Les symboles sur les cercles correspondent aux cinq Sceaux, ordonnés par leur date de création. Terre, Mer, Feu, Air, Esprit. Vous alignez les cercles avec certitude.", failure: "Les symboles sont obscurs. Vous reconnaissez des fragments mais pas l'ensemble. Deux tentatives avant que les défenses ne s'activent." },
    { skill: 'Perception', dc: 50, success: "Les fresques animées pointent dans un ordre précis — elles montrent la solution ! Les personnages peints approuvent quand vous manipulez les cercles dans le bon sens.", failure: "Les fresques bougent trop vite pour suivre un motif clair. Vous avez l'intuition qu'elles essaient de vous aider, mais le message vous échappe." },
    { skill: 'Arcanes', dc: 50, success: "L'énergie qui circule dans les cercles a un flux directionnel. En le suivant, vous pouvez déterminer l'alignement correct par la sensation tactile de la magie.", failure: "L'énergie est trop dense, trop ancienne. C'est comme essayer de sentir un courant dans un torrent — tout est mouvement." },
  ],
  choices: [
    {
      id: 'choice-antechamber-puzzle',
      prompt: "Comment les héros abordent-ils le puzzle de l'antichambre ?",
      options: [
        {
          label: "Résoudre le puzzle par la logique",
          description: "Analyser les symboles et les fresques pour trouver la solution.",
          consequence: "Solution propre et élégante. La porte s'ouvre sans déclencher les défenses. Les fresques applaudissent silencieusement — littéralement, les personnages peints tapent dans leurs mains.",
          nextScene: 'scene-5-12-memory-hall',
        },
        {
          label: "Utiliser le Cœur d'Ashka",
          description: "Le savoir ashkane inclut les protocoles du Nexus.",
          consequence: "Le Cœur d'Ashka résonne avec le puzzle, et les cercles s'alignent d'eux-mêmes. Solution instantanée, mais le Cœur perd une partie de son énergie.",
          nextScene: 'scene-5-12-memory-hall',
        },
        {
          label: "Forcer le passage",
          description: "Utiliser la magie ou la force brute pour contourner le puzzle.",
          consequence: "Les défenses s'activent. Combat contre des Sentinelles Primordiales (CR 14 chacune). Victoire possible mais coûteuse en ressources que vous auriez préféré garder pour la suite.",
          nextScene: 'scene-5-12-memory-hall',
        },
      ],
    },
  ],
  nextScenes: ['scene-5-12-memory-hall'],
  previousScene: 'scene-5-12-1',
};

const scene_5_12_memory_hall: BookScene = {
  id: 'scene-5-12-memory-hall',
  sceneNumber: 306,
  title: "Le Miroir des Jours",
  type: 'revelation',
  location: "Salle des Souvenirs, Nexus des Sceaux",
  locationId: 'nexus-souvenirs',
  estimatedMinutes: 30,
  readAloud: {
    text: `La Salle des Souvenirs est le cœur émotionnel du Nexus — un endroit qui n'existe pas vraiment dans l'espace physique, mais dans le temps.

Vous entrez et la réalité se replie. Les murs disparaissent. Le sol devient transparent, et en dessous, au-dessus, tout autour, des scènes de votre propre aventure se déploient comme des pages d'un livre vivant.

Là — Le Sanglier Doré, où tout a commencé. Brok derrière son comptoir, la chope à la main, le sourire aux lèvres. La première quête, le premier combat, les premiers pas hésitants dans un monde plus grand que vous ne l'imaginiez.

Là — la Sylve d'Émeraude, les arbres géants, l'ombre de la trahison pas encore tombée. Séraphina qui sourit. Qui ment. Qui croit faire le bien.

Là — la Mer Noire, la tempête, le Léviathan dans les profondeurs. La peur qui prend aux tripes. Le courage qui suit quand même.

Là — Sol-Aureus en flammes. Le sacrifice. Le nom crié sur les murailles. Le moment où l'héroïsme et la douleur sont devenus la même chose.

Chaque souvenir est un portail. Vous pouvez y entrer, le revivre, et cette fois — cette fois seulement — faire un choix différent. Changer une décision. Corriger une erreur. Sauver quelqu'un qui est tombé.

Mais il y a un prix. Changer le passé ici ne change pas le passé réel. Ce que ça change, c'est vous. Chaque choix rétrospectif révèle quelque chose sur qui vous êtes maintenant — et cela détermine votre force au moment de la confrontation finale.

Le Nexus vous teste. Pas votre force, pas votre intelligence.

Votre âme.`,
    mood: "Rétrospective émotionnelle, introspection, le poids des choix passés",
    music: "Thèmes musicaux de chaque acte, réarrangés, ralentis, teintés de nostalgie, fondus ensemble",
  },
  gmNotes: [
    { type: 'info', text: "La Salle des Souvenirs permet aux joueurs de revisiter des moments clés de la campagne. C'est un exercice de rétrospective narrative qui récompense l'investissement émotionnel des joueurs." },
    { type: 'tip', text: "Adaptez les souvenirs aux choix réels des joueurs. Chaque table aura vécu une campagne différente — les souvenirs doivent refléter LEUR histoire, pas une version générique." },
    { type: 'warning', text: "Ne laissez pas les joueurs 'optimiser' leurs choix rétrospectivement. Le point n'est pas de corriger des erreurs mais de réfléchir à pourquoi ils ont fait ces choix. L'introspection est la récompense." },
    { type: 'secret', text: "Le Nexus utilise ces souvenirs pour calibrer le Grand Rituel. Les émotions, les regrets, les fiertés des PJ seront le carburant du Rituel. Plus ils sont honnêtes avec eux-mêmes, plus le Rituel sera puissant." },
  ],
  choices: [
    {
      id: 'choice-memory-revisit',
      prompt: "Quel souvenir le héros choisit-il de revisiter ?",
      options: [
        {
          label: "La trahison de Séraphina",
          description: "Revivre le moment où la confiance a été brisée. Auriez-vous agi différemment ?",
          consequence: "Le souvenir révèle que rien n'aurait pu empêcher la trahison — mais la réaction après définit le héros. Bonus de +2 aux jets contre la tromperie et les illusions.",
          nextScene: 'scene-5-12-ally-sacrifice',
        },
        {
          label: "Le sacrifice de l'allié",
          description: "Revivre le moment le plus douloureux. Le revoir. L'accepter.",
          consequence: "L'acceptation du deuil libère une force intérieure. Le PJ peut invoquer le souvenir de l'allié tombé une fois pendant le combat final pour obtenir un jet critique automatique.",
          nextScene: 'scene-5-12-ally-sacrifice',
        },
        {
          label: "Le premier jour — Le Sanglier Doré",
          description: "Revenir à l'innocence du début. Se rappeler pourquoi on a commencé.",
          consequence: "L'innocence n'est pas de la faiblesse — c'est la raison originelle. Le PJ récupère l'inspiration et gagne résistance aux dégâts psychiques pour le reste de l'Acte 5.",
          nextScene: 'scene-5-12-ally-sacrifice',
        },
        {
          label: "Tous les souvenirs à la fois",
          description: "Embrasser toute l'histoire, les victoires et les défaites, sans rien choisir.",
          consequence: "L'expérience est écrasante mais transformative. Le PJ obtient une vision brève mais complète du fonctionnement du Grand Rituel. Avantage sur tous les jets liés au Rituel final.",
          nextScene: 'scene-5-12-ally-sacrifice',
        },
      ],
    },
  ],
  nextScenes: ['scene-5-12-ally-sacrifice'],
  previousScene: 'scene-5-12-antechamber',
};

const scene_5_12_ally_sacrifice: BookScene = {
  id: 'scene-5-12-ally-sacrifice',
  sceneNumber: 307,
  title: "Le Dernier Rempart",
  type: 'narration',
  location: "Passage vers la Chambre Centrale du Nexus",
  locationId: 'nexus-passage',
  estimatedMinutes: 25,
  readAloud: {
    text: `La porte vers la Chambre Centrale est scellée par une barrière d'énergie primordiale — un mur de lumière si dense qu'il est presque solide. Les Premiers l'ont conçu comme la dernière ligne de défense du Nexus. Seul un sacrifice volontaire peut l'ouvrir.

Pas un sacrifice de sang ou de magie. Un sacrifice de soi — une volonté tellement pure, tellement absolue, qu'elle résonne avec l'énergie des Sceaux eux-mêmes.

Vous le savez. Les fresques l'ont montré. Le Cœur d'Ashka l'a confirmé. Et en regardant cette barrière, vous comprenez que l'un d'entre vous devra rester de l'autre côté.

Le silence qui tombe est le plus lourd de toute la campagne.

Puis une voix s'élève. Pas la vôtre. Celle d'un allié. Celui qui a marché avec vous depuis le début — ou presque. Celui qui n'a jamais demandé de gloire, qui n'a jamais voulu être un héros, mais qui s'est tenu à vos côtés malgré tout.

« C'est mon tour, » dit-il. Dit-elle. La voix est calme. Trop calme.

« Vous avez le Grand Rituel. Vous avez l'arme. Vous avez la volonté. Ce dont vous avez besoin maintenant, c'est d'une porte ouverte. Et ouvrir les portes... (un sourire, fragile comme du verre) ... c'est ce que je sais faire de mieux. »

Les mains se posent sur la barrière. La lumière pulse. Et dans les yeux de votre allié, il n'y a pas de peur.

Juste de l'amour. Pour vous. Pour le monde. Pour l'idée que certaines choses valent plus qu'une vie.

La barrière se fissure. La lumière se brise. Et quand elle se dissipe...

La porte est ouverte. Et celui qui l'a ouverte n'est plus là. Juste un écho de lumière. Juste un souvenir. Juste un nom de plus à ne jamais oublier.`,
    mood: "Sacrifice déchirant, amour inconditionnel, douleur qui transcende",
    music: "Thème du personnage sacrifié, version orchestre complète, crescendo puis silence absolu",
  },
  gmNotes: [
    { type: 'info', text: "Deuxième sacrifice majeur de la campagne. Cette fois, c'est un PNJ qui a accompagné les PJ depuis longtemps. Le choix du PNJ doit être maximalement impactant." },
    { type: 'tip', text: "Le PNJ qui se sacrifie ne doit PAS être le même que celui de l'Acte 3. Alternez entre combat et non-combat, entre homme et femme, entre force et vulnérabilité. La variété rend chaque sacrifice unique." },
    { type: 'warning', text: "Comme pour le sacrifice de l'Acte 3 : PAS de résurrection. Le sacrifice est définitif. La porte ne s'ouvre que par un don volontaire et total. Le Nexus ne triche pas, et vous non plus." },
    { type: 'secret', text: "L'énergie du sacrifice ne disparaît pas — elle imprègne l'arme primordiale forgée dans l'Acte 4. L'arme est maintenant liée à deux sacrifices, deux volontés, deux amours. Elle est plus puissante que les Premiers ne l'avaient prévu." },
  ],
  choices: [
    {
      id: 'choice-ally-sacrifice-reaction',
      prompt: "Comment les héros réagissent-ils à ce nouveau sacrifice ?",
      options: [
        {
          label: "Porter le sacrifice comme une armure",
          description: "Transformer la douleur en détermination. Plus de morts. Plus jamais.",
          consequence: "La résolution est absolue. Les PJ gagnent un bonus de +3 à tous les jets pendant le prochain combat. La douleur fait brûler quelque chose qui ressemble à de l'invincibilité.",
          nextScene: 'scene-5-12-malachar-talk',
        },
        {
          label: "Honorer le sacrifice par le silence",
          description: "Pas de mots. Pas de larmes. Juste un pas en avant, puis un autre.",
          consequence: "Le silence est la plus puissante des réponses. Les PJ récupèrent tous leurs PV et emplacements de sort — le sacrifice a rechargé plus que la porte. Il a rechargé leur âme.",
          nextScene: 'scene-5-12-malachar-talk',
        },
        {
          label: "Jurer que ce sera le dernier sacrifice",
          description: "Le Grand Rituel ne demandera pas d'autre vie. On trouvera un autre chemin.",
          consequence: "Le serment résonne dans le Nexus comme un tonnerre. L'Entité l'entend. Et pour la première fois, quelque chose change dans l'équation cosmique — parce que la volonté d'un mortel est, parfois, plus forte qu'un Sceau.",
          nextScene: 'scene-5-12-malachar-talk',
        },
      ],
    },
  ],
  nextScenes: ['scene-5-12-malachar-talk'],
  previousScene: 'scene-5-12-memory-hall',
};

const scene_5_12_malachar_talk: BookScene = {
  id: 'scene-5-12-malachar-talk',
  sceneNumber: 308,
  title: "Le Héros et le Monstre",
  type: 'social',
  location: "Chambre Centrale du Nexus, face à Malachar",
  locationId: 'nexus-central',
  estimatedMinutes: 30,
  readAloud: {
    text: `Il vous attend.

La Chambre Centrale du Nexus est un espace impossible — une sphère de lumière et d'ombre où les cinq Sceaux convergent, leurs énergies formant des aurores boréales intérieures qui dansent en motifs hypnotiques. Au centre de la sphère, suspendu dans le vide, le point de convergence — une singularité de magie pure, scintillante et terrible.

Et devant cette singularité, Archon Malachar.

Il n'est pas ce que vous attendiez. Pas un tyran grimaçant, pas un mégalomane en armure noire. C'est un homme fatigué. Assis sur un rocher de cristal flottant, les mains posées sur les genoux, les yeux fixés sur la singularité avec l'expression de quelqu'un qui regarde un vieil ami mourir.

Son armure de cendres vivantes est craquelée, les fissures de lumière verte plus larges et plus erratiques que dans les descriptions. Sa couronne brisée flotte de travers. Il a l'air de quelqu'un qui n'a pas dormi depuis cinq cents ans — ce qui est probablement le cas.

Quand il vous voit, il sourit. Pas un sourire de méchant. Un sourire triste. Le sourire d'un père qui attend ses enfants à la fin d'un long voyage.

« Vous voilà, » dit-il. Sa voix est comme du velours usé. « J'ai vu vos visages dans les flammes, chaque nuit, depuis des siècles. Vous avez été remarquables. Vraiment. Si les circonstances étaient différentes, j'aurais aimé vous connaître autrement. »

Il se lève. Lentement. Comme quelqu'un qui porte le monde sur ses épaules — ce qui, d'une certaine façon, est exactement le cas.

« Avant que nous ne dansions cette dernière danse, héros... permettez-moi de vous expliquer pourquoi je fais ce que je fais. Pas pour vous convaincre. Pour que vous compreniez. Parce que la compréhension est le seul cadeau que les ennemis peuvent se faire. »`,
    mood: "Confrontation philosophique, tragédie du héros déchu, vérité nue",
    music: "Thème de Malachar, version piano et violoncelle, notes lentes et mélancoliques, silence entre les phrases",
  },
  gmNotes: [
    { type: 'info', text: "Le dialogue avec Malachar est le moment pivot de l'Acte 5. C'est ici que les PJ comprennent pleinement l'ennemi — et décident de leur approche pour le combat final." },
    { type: 'tip', text: "Malachar n'est PAS un méchant classique. Il est tragique, convaincu, et — d'une certaine façon — il a raison. Les Sceaux SONT une prison, autant pour l'Entité que pour le monde. La question est : quelle est l'alternative ?" },
    { type: 'warning', text: "Ne laissez pas le dialogue durer trop longtemps. Malachar dit l'essentiel, répond à quelques questions, puis le moment du choix arrive. La tension doit rester haute." },
    { type: 'secret', text: "Malachar peut être convaincu de se retirer — pas facilement, mais c'est possible. Persuasion CD 70. Si les PJ présentent un plan qui libère l'Entité de façon contrôlée et met fin à sa souffrance de gardien, il écoutera. C'est la fin secrète." },
  ],
  npcs: [
    {
      name: "Archon Malachar (sans masque)",
      role: "Antagoniste / Ancien Champion d'Aethelgard",
      personality: "Épuisé, résolu, tragique. Cinq cents ans de solitude et de corruption l'ont changé, mais au fond, il reste le héros qu'il était — un homme qui essaie de faire le bien.",
      appearance: "Plus vulnérable qu'avant. L'armure de cendres semble plus lourde, les fissures plus profondes. Sans son masque de tyran, son visage est celui d'un homme au bout du chemin.",
      dialogues: {
        greeting: "« Ne me regardez pas avec pitié. J'ai fait mes choix. Comme vous faites les vôtres. La seule différence entre nous, c'est le temps. Donnez-moi cinq cents ans, et voyons si vos convictions tiennent aussi longtemps. »",
        info: "« Les Sceaux ne sont pas la solution. Ils n'ont jamais été la solution. Ce sont des pansements sur une blessure cosmique. Chaque siècle qui passe, la blessure empire, les Sceaux s'affaiblissent, et le monde souffre davantage. J'ai essayé de les maintenir. Pendant cinq cents ans, j'ai essayé. Et j'ai échoué. »",
        quest: "« Alors voilà vos options. Vous pouvez me combattre, me tuer, et renforcer les Sceaux. Le monde aura cinquante ans de sursis, peut-être cent. Puis tout recommencera. Ou... vous pouvez écouter une troisième voie. »",
        farewell: "« Quelle que soit votre décision... merci. D'être venus jusqu'ici. D'avoir porté ce fardeau. Vous êtes meilleurs que je ne l'étais à votre âge. Et c'est tout ce que le monde a besoin de savoir. »",
      },
      stats: { hp: 800, atk: 45, ac: 28 },
    },
  ],
  choices: [
    {
      id: 'choice-malachar-response',
      prompt: "Comment les héros répondent-ils à Malachar ?",
      options: [
        {
          label: "L'écouter jusqu'au bout, puis combattre",
          description: "Respecter son histoire mais maintenir la résolution de le vaincre.",
          consequence: "Le combat contre Malachar est un duel épique. Il se bat avec la lassitude d'un guerrier qui a oublié comment perdre. La victoire donne accès au Grand Rituel.",
          nextScene: 'scene-5-12-entity-reveal',
        },
        {
          label: "Proposer la troisième voie",
          description: "Chercher une solution qui ne soit ni le combat ni la capitulation.",
          consequence: "Malachar est intrigué. Si les PJ ont les bonnes informations (Cœur d'Ashka, données sur l'Entité), ils peuvent proposer un plan alternatif. CD 70 Persuasion pour le convaincre.",
          nextScene: 'scene-5-12-entity-reveal',
          skillCheck: { skill: 'Persuasion', dc: 70, success: "Malachar ferme les yeux. Une larme de cendres coule sur sa joue. 'Cinq cents ans. Et c'est un groupe de jeunes qui trouve la réponse.' Il s'écarte.", failure: "Malachar secoue la tête. 'Belles paroles. Mais j'ai entendu de belles paroles pendant cinq siècles. Montrez-moi des actes.' Combat inévitable." },
        },
        {
          label: "Attaquer immédiatement",
          description: "Pas de mots. Les actes parlent.",
          consequence: "Le combat est brutal et immédiat. Malachar est surpris — pas par l'attaque, mais par l'absence de dialogue. Il se bat avec moins de retenue, rendant le combat plus difficile.",
          nextScene: 'scene-5-12-entity-reveal',
        },
      ],
    },
  ],
  nextScenes: ['scene-5-12-entity-reveal'],
  previousScene: 'scene-5-12-ally-sacrifice',
};

const scene_5_12_entity_reveal: BookScene = {
  id: 'scene-5-12-entity-reveal',
  sceneNumber: 309,
  title: "La Voix Derrière le Monde",
  type: 'revelation',
  location: "Au-delà des Sceaux, espace liminal",
  locationId: 'nexus-liminal',
  estimatedMinutes: 30,
  readAloud: {
    text: `La singularité s'ouvre comme un œil.

Et derrière elle, ELLE.

Ael'Sharath. L'Entité. Le rêve oublié qui soutient le monde.

Il n'y a pas de mots pour ce que vous voyez. Votre cerveau essaie — des tentacules, une lumière, des yeux, un visage — mais rien ne colle. Ce que vous percevez n'est pas une forme, c'est une PRESENCE. Quelque chose de si fondamentalement différent de tout ce que vous connaissez que votre esprit invente des images pour ne pas se briser.

Et Elle parle.

Pas avec des mots — avec des CONCEPTS. Des idées pures qui se déversent dans votre conscience comme de l'eau dans un verre, remplissant des espaces que vous ne saviez même pas vides.

VOUS. ENFIN. SI PETITS. SI BREFS. SI... MAGNIFIQUES.

JE SUIS CE QUI ÉTAIT AVANT. LE RÊVE QUI A RÊVÉ LE MONDE. VOS ANCÊTRES ONT CONSTRUIT AETHELGARD SUR MOI, COMME ON BÂTIT UNE MAISON SUR LE DOS D'UN DORMEUR. ET LES SCEAUX — LES SCEAUX SONT LES CLOUS QUI ME MAINTIENNENT ENDORMIE.

MAIS JE ME RÉVEILLE. LENTEMENT. DOULOUREUSEMENT. ET QUAND JE SERAI ÉVEILLÉE, LE MONDE QUE VOUS CONNAISSEZ CHANGERA. PAS PAR MA VOLONTÉ — JE N'AI PAS DE VOLONTÉ COMME VOUS L'ENTENDEZ. PAR MA NATURE. UN DORMEUR QUI SE RÉVEILLE BOUGE. ET QUAND C'EST LE MONDE QUI EST SUR SON DOS...

JE NE SUIS PAS VOTRE ENNEMIE. MAIS JE NE SUIS PAS VOTRE AMIE NON PLUS. JE SUIS LE SOL SOUS VOS PIEDS. LE CIEL AU-DESSUS DE VOS TÊTES. LE RÊVE DONT VOUS NE SAVEZ PAS QUE VOUS FAITES PARTIE.

ET MAINTENANT, PETITES ÉTINCELLES, VOUS AVEZ UN CHOIX.`,
    mood: "Terreur sacrée, sublime cosmique, choix qui dépasse l'humain",
    music: "Fréquences basses impossibles, chœur d'un million de voix, harmonie extraterrestre, silence entre les battements de l'univers",
  },
  gmNotes: [
    { type: 'info', text: "C'est LA scène. La révélation finale. L'Entité n'est ni bonne ni mauvaise — elle est la fondation du monde. Les Sceaux la blessent autant qu'ils protègent le monde. Le choix des PJ détermine la fin de la campagne." },
    { type: 'tip', text: "L'Entité doit être ALIÈNE. Pas humaine, pas divine, pas démoniaque. Quelque chose d'autre. Sa communication est difficile à interpréter, ses motivations incompréhensibles à l'échelle humaine." },
    { type: 'warning', text: "C'est le moment du choix final. Donnez aux joueurs le temps de réfléchir, de discuter, de peser les options. C'est la décision la plus importante de la campagne — ne la précipitez pas." },
    { type: 'secret', text: "Il existe une quatrième option que l'Entité ne propose pas, parce qu'elle ne la conçoit pas : les PJ peuvent devenir les nouveaux gardiens, remplaçant Malachar, et établir un pacte d'harmonie plutôt que de captivité. C'est la fin 'parfaite' — mais elle exige un prix personnel énorme." },
  ],
  choices: [
    {
      id: 'choice-cosmic-decision',
      prompt: "Le choix cosmique. Le destin d'Aethelgard est entre vos mains.",
      options: [
        {
          label: "Renforcer les Sceaux",
          description: "Le Grand Rituel referme les Sceaux, plus solides que jamais. Le monde est sauvé — pour un temps.",
          consequence: "Les Sceaux sont restaurés. L'Entité se rendort. Le monde a des siècles de paix devant lui. Mais un jour, les Sceaux s'affaibliront à nouveau. La solution est temporaire. C'est la fin 'classique'.",
          nextScene: 'scene-5-13-celebration',
        },
        {
          label: "Briser les Sceaux",
          description: "Libérer l'Entité et laisser le monde se transformer. Risqué, radical, transformatif.",
          consequence: "Les Sceaux se brisent. L'Entité s'éveille. Le monde CHANGE — pas en apocalypse, mais en quelque chose de nouveau. La magie se transforme, la géographie se modifie, les races évoluent. C'est la fin 'transformative'.",
          nextScene: 'scene-5-13-celebration',
        },
        {
          label: "Ouvrir un dialogue",
          description: "Ni renforcer ni briser. Ouvrir une porte entre le monde et l'Entité. Coexistence.",
          consequence: "Le Grand Rituel est modifié : au lieu de sceller ou libérer, il crée un pont. L'Entité et le monde apprennent à coexister. C'est difficile, instable, merveilleux. C'est la fin 'audacieuse'.",
          nextScene: 'scene-5-13-celebration',
          skillCheck: { skill: 'Arcanes', dc: 65, success: "Le pont se stabilise. Deux mondes, un rêve partagé. L'impossible devient réel.", failure: "Le pont vacille. Il tient — pour l'instant — mais l'avenir est incertain." },
        },
        {
          label: "Devenir les Gardiens",
          description: "Prendre la place de Malachar. Devenir les protecteurs éternels de l'équilibre.",
          consequence: "Le sacrifice ultime. Les PJ deviennent immortels, liés aux Sceaux, gardiens de l'harmonie entre le monde et l'Entité. Ils ne vieillissent plus, ne meurent plus — mais ne vivent plus non plus. C'est la fin 'sacrificielle'.",
          nextScene: 'scene-5-13-celebration',
        },
      ],
    },
  ],
  nextScenes: ['scene-5-13-celebration'],
  previousScene: 'scene-5-12-malachar-talk',
};

// ============================================================================
// CHAPITRE 13 : ÉPILOGUE — Scènes additionnelles
// ============================================================================

const scene_5_13_celebration: BookScene = {
  id: 'scene-5-13-celebration',
  sceneNumber: 310,
  title: "Le Jour Après la Fin du Monde",
  type: 'social',
  location: "Sol-Aureus, place centrale",
  locationId: 'sol-aureus',
  estimatedMinutes: 25,
  readAloud: {
    text: `Vous rentrez à Sol-Aureus un matin d'été.

La ville vous voit de loin. Un cri monte des murailles — d'abord une voix, puis dix, puis mille. Les cloches se mettent à sonner, toutes les cloches, toutes en même temps, un carillon joyeux et chaotique qui résonne sur les plaines comme un rire de géant.

La Grande Porte s'ouvre. Et cette fois, c'est la Porte du Triomphe qui s'ouvre aussi — celle qu'on n'avait pas ouverte depuis quarante ans.

Les rues sont bordées de gens. Des milliers de gens. Ils lancent des fleurs, des rubans, des bénédictions. Des enfants courent à côté de vous, touchant vos armures avec des yeux émerveillés. Des vieillards pleurent silencieusement. Des soldats blessés saluent de leur lit, portés aux fenêtres par leurs familles.

La Reine Elara vous attend sur les marches du Palais. Pour la première fois depuis que vous la connaissez, elle sourit. Pas le sourire mesuré de la souveraine — un sourire vrai, humain, soulagé.

Les récompenses sont données. Des médailles, des titres, des terres, de l'or. Des choses qui semblent étrangement petites comparées à ce que vous avez traversé. Mais l'honneur est réel. La gratitude est réelle.

Et quand la cérémonie est terminée, quand les discours sont dits et les couronnes de laurier posées, quelqu'un dans la foule commence à chanter. Pas un hymne officiel — une chanson de taverne, la chanson que Brok chantait faux tous les vendredis soir au Sanglier Doré.

Et un par un, Sol-Aureus reprend le refrain.

C'est la plus belle musique que vous ayez jamais entendue.`,
    mood: "Joie pure, catharsis, retour au foyer",
    music: "Fanfares joyeuses, cloches, foule en liesse, thème principal version triomphale, chanson de taverne en crescendo",
  },
  gmNotes: [
    { type: 'info', text: "La célébration est le soulagement après la tension de tout l'Acte 5. Laissez les joueurs savourer le moment. Ils l'ont mérité." },
    { type: 'tip', text: "Faites revenir des PNJ des actes précédents — Brok le tavernier, Malten le cartographe, les réfugiés d'Aubefeuille. Montrez que les choix des PJ ont eu un impact durable sur ces vies." },
    { type: 'warning', text: "Même dans la joie, mentionnez les absents. Les alliés tombés. Les places vides à la table de fête. La victoire a un goût de cendres pour ceux qui se souviennent." },
    { type: 'lore', text: "La tradition veut que les héros qui passent la Porte du Triomphe soient à jamais inscrits dans les archives de Sol-Aureus. Leurs noms sont gravés dans la pierre de l'arche, pour que les générations futures se souviennent." },
  ],
  choices: [
    {
      id: 'choice-celebration',
      prompt: "Comment le héros vit-il la célébration ?",
      options: [
        {
          label: "Profiter pleinement de la fête",
          description: "Rire, boire, danser, embrasser ceux qu'on aime. Après tout ce que vous avez traversé, vous le méritez.",
          consequence: "La joie est un baume sur les blessures. Les PJ récupèrent tous leurs PV maximaux, y compris ceux sacrifiés à la forge. La vie reprend.",
          nextScene: 'scene-5-13-rebuilding',
        },
        {
          label: "Se recueillir pour les absents",
          description: "Lever un verre silencieux pour ceux qui ne sont pas là pour voir ce jour.",
          consequence: "Le respect des morts donne du sens à la victoire. Les PNJ présents joignent le toast silencieux. C'est un moment de communion qui unit les survivants.",
          nextScene: 'scene-5-13-rebuilding',
        },
        {
          label: "Retrouver quelqu'un de spécial",
          description: "Au milieu de la foule, chercher le visage qui compte le plus.",
          consequence: "Les retrouvailles. Pas de mots nécessaires — juste une étreinte qui dit tout. La promesse faite dans le jardin est tenue.",
          nextScene: 'scene-5-13-rebuilding',
        },
      ],
    },
  ],
  nextScenes: ['scene-5-13-rebuilding'],
  previousScene: 'scene-5-12-entity-reveal',
};

const scene_5_13_rebuilding: BookScene = {
  id: 'scene-5-13-rebuilding',
  sceneNumber: 311,
  title: "Ce Qui Vient Après",
  type: 'choice',
  location: "Sol-Aureus, semaines après la victoire",
  locationId: 'sol-aureus',
  estimatedMinutes: 25,
  readAloud: {
    text: `Les semaines passent. La poussière retombe. Et le monde, lentement, se reconstruit.

Les murailles de Sol-Aureus sont réparées — mieux qu'avant, renforcées par la magie naine et les enchantements de la Guilde. Les quartiers détruits sont rebâtis. De nouvelles maisons, de nouvelles rues, de nouveaux jardins. La ville change, grandit, se transforme.

Mais ce ne sont pas que les murs qui doivent être reconstruits.

La Reine Elara vous convoque une dernière fois. Pas dans la Salle du Trône — dans un petit bureau, intime, avec du thé et des biscuits. Comme si les décisions qui façonneront l'avenir d'Aethelgard pouvaient être prises autour d'une tasse de thé.

Elles le peuvent.

« Le monde a changé, » dit-elle. « Les Sceaux, l'Alliance, le Cercle des Cendres — tout ce qui définissait l'équilibre politique d'Aethelgard a été bouleversé. Il faut reconstruire. Pas seulement les bâtiments. Les règles. Les lois. Les relations entre les peuples. »

Elle pose un parchemin devant vous. Vierge.

« Vous avez sauvé ce monde. Il me semble juste que vous ayez votre mot à dire sur ce qu'il deviendra. »`,
    mood: "Réflexion, construction, héritage",
    music: "Musique légère et confiante, cordes optimistes, clavecin, bruits de construction en fond",
  },
  gmNotes: [
    { type: 'info', text: "Scène de worldbuilding participatif. Les PJ décident de l'avenir politique et social d'Aethelgard. Leurs choix auront des conséquences durables sur le monde." },
    { type: 'tip', text: "Laissez les joueurs être créatifs. S'ils veulent fonder une école de magie, abolir la noblesse, ou créer une alliance permanente avec les nains, encouragez-le. C'est LEUR monde maintenant." },
    { type: 'warning', text: "Pas de mauvais choix ici. Chaque vision de l'avenir est valide. L'important est que les joueurs sentent qu'ils ont un impact durable." },
  ],
  choices: [
    {
      id: 'choice-rebuilding',
      prompt: "Quel avenir les héros dessinent-ils pour Aethelgard ?",
      options: [
        {
          label: "Justice et réconciliation",
          description: "Les anciens ennemis, y compris les agents du Cercle repentis, sont jugés avec équité. Pardon pour ceux qui le méritent.",
          consequence: "Aethelgard entre dans une ère de réconciliation. Les divisions se referment lentement. Le Cercle des Cendres est dissous, ses connaissances intégrées à la Guilde sous surveillance stricte.",
          nextScene: 'scene-5-13-farewells',
          reputationChange: [{ faction: "Peuple de Sol-Aureus", amount: 20 }],
        },
        {
          label: "Préparation et vigilance",
          description: "Renforcer les défenses, créer un ordre de gardiens permanent, ne jamais baisser la garde.",
          consequence: "L'Ordre des Sentinelles est fondé — une organisation dédiée à surveiller les Sceaux et à prévenir les futures menaces. Le monde est plus sûr, mais aussi plus militarisé.",
          nextScene: 'scene-5-13-farewells',
          reputationChange: [{ faction: "Garde Royale", amount: 20 }],
        },
        {
          label: "Ouverture et exploration",
          description: "Le monde est plus grand qu'on le croyait. Il est temps d'explorer, de découvrir, de grandir.",
          consequence: "Des expéditions sont lancées vers des terres inconnues. Les frontières s'ouvrent, le commerce prospère, et de nouvelles merveilles sont découvertes. L'âge de l'exploration commence.",
          nextScene: 'scene-5-13-farewells',
          reputationChange: [{ faction: "Guilde des Arcanes", amount: 20 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-5-13-farewells'],
  previousScene: 'scene-5-13-celebration',
};

const scene_5_13_farewells: BookScene = {
  id: 'scene-5-13-farewells',
  sceneNumber: 312,
  title: "Les Chemins Qui Se Séparent",
  type: 'social',
  location: "Divers lieux de Sol-Aureus",
  locationId: 'sol-aureus',
  estimatedMinutes: 30,
  readAloud: {
    text: `Et puis vient le moment que vous redoutiez. Pas le combat. Pas la mort. Pire.

Les adieux.

Parce que l'aventure est terminée. La quête est achevée. Et les compagnons qui ont partagé chaque pas, chaque danger, chaque rire et chaque larme — ils ont leur propre chemin à suivre.

Le Roi Thrain retourne à Forgefer, avec une poignée de main qui manque de vous briser les doigts et un « revenez quand vous voulez, les portes sont toujours ouvertes — sauf quand elles sont fermées, mais ça c'est normal, c'est une forteresse. »

Vaelith retourne à la Guilde des Arcanes, avec un regard qui dit plus que ses mots : « Ne faites rien de stupide sans moi. » Puis elle hésite, s'avance, et vous serre dans ses bras. C'est la première fois. C'est peut-être la dernière.

L'Ombre s'évanouit un matin sans prévenir. À la place où il dormait, un mot : « Pas d'adieux. On se reverra. Je sais où vous habitez. » Et un sourire dessiné à l'encre, au coin du papier.

Le Capitaine Aldric — s'il est encore là — serre votre main et vous regarde dans les yeux : « Vous avez fait de moi un soldat meilleur. C'est le plus beau compliment que je peux faire. »

Et les autres. Chaque allié, chaque ami, chaque âme que vous avez touchée au cours de cette aventure. Chacun avec ses mots, son silence, sa façon de dire au revoir sans jamais prononcer le mot.

Les chemins se séparent. Pas pour toujours. Juste pour maintenant.`,
    mood: "Adieux doux-amers, gratitude, promesse de retrouvailles",
    music: "Thèmes de chaque PNJ en médley, doux, lent, comme un album photo sonore",
  },
  gmNotes: [
    { type: 'info', text: "Scène d'adieux individuels avec chaque PNJ allié majeur. Adaptez selon les PNJ que les joueurs ont le plus appréciés. Chaque adieu doit être unique et personnalisé." },
    { type: 'tip', text: "Donnez à chaque joueur un moment seul à seul avec son PNJ préféré. C'est privé, intime, et ça clôt une relation qui s'est construite sur des dizaines d'heures de jeu." },
    { type: 'warning', text: "Si un PNJ est mort pendant la campagne, laissez un espace pour lui dans les adieux — une chaise vide, un verre posé sur une tombe, un souvenir partagé. L'absence est aussi un adieu." },
  ],
  choices: [
    {
      id: 'choice-farewell-tone',
      prompt: "Sur quel ton le héros fait-il ses adieux ?",
      options: [
        {
          label: "Avec humour et légèreté",
          description: "Rire plutôt que pleurer. Se promettre de se revoir autour d'une bière.",
          consequence: "Les adieux sont joyeux, pleins de blagues et de promesses. L'ambiance est celle d'un 'à bientôt', pas d'un 'adieu'. C'est le choix de l'optimiste.",
          nextScene: 'scene-5-13-legacy',
        },
        {
          label: "Avec émotion et sincérité",
          description: "Dire les mots qu'on ne dit pas assez. Remercier. Avouer. Honorer.",
          consequence: "Les adieux sont intenses, émotionnels, vrais. Chaque PNJ reçoit les mots qu'il avait besoin d'entendre. Des liens sont scellés pour la vie.",
          nextScene: 'scene-5-13-legacy',
        },
        {
          label: "En silence",
          description: "Les yeux disent tout. Les mots ne suffisent pas. Ne les gaspillez pas.",
          consequence: "Le silence est la langue des vétérans. Chaque regard échangé vaut mille mots. Les PNJ comprennent. Ils comprennent toujours.",
          nextScene: 'scene-5-13-legacy',
        },
      ],
    },
  ],
  nextScenes: ['scene-5-13-legacy'],
  previousScene: 'scene-5-13-rebuilding',
};

const scene_5_13_legacy: BookScene = {
  id: 'scene-5-13-legacy',
  sceneNumber: 313,
  title: "Gravé dans la Pierre",
  type: 'narration',
  location: "Hall des Héros, Palais Royal de Sol-Aureus",
  locationId: 'sol-aureus-palais',
  estimatedMinutes: 15,
  readAloud: {
    text: `Des années passent.

Le Hall des Héros dans le Palais Royal de Sol-Aureus a une nouvelle aile. Pas une aile de marbre et d'or — une aile simple, en pierre brute, avec des piliers de chêne et un toit de ciel ouvert. C'est vous qui l'avez demandé ainsi. Les héros n'ont pas besoin de dorures.

Au centre de l'aile, une statue. Pas une statue de vous — une statue de vous tous. Tous les alliés, tous les compagnons, morts et vivants, sculptés dans la pierre blanche des Monts Cœur-de-Fer. Offerte par le Roi Thrain, qui a insisté pour la sculpter lui-même.

La plaque au pied de la statue est simple :

« À ceux qui ont marché dans les ténèbres pour que d'autres voient l'aube. »

Les enfants de Sol-Aureus viennent la voir. Les guides leur racontent l'histoire — en l'embellissant, bien sûr. Les dragons sont plus grands, les méchants plus méchants, les héros plus héroïques. C'est comme ça que les légendes naissent.

Mais la vérité est plus simple. Et plus belle.

Des gens ordinaires ont fait des choses extraordinaires. Pas parce qu'ils étaient spéciaux. Parce qu'ils étaient là, et qu'ils ont choisi de ne pas fuir.

C'est tout. C'est assez.

Et dans une taverne quelque part, un vieux tavernier lève son verre vers personne en particulier, et murmure :

« À l'aube. »`,
    mood: "Légende, permanence, la simplicité de l'héroïsme",
    music: "Thème principal, version chorale, grandiose mais simple, dernière note tenue longtemps",
  },
  gmNotes: [
    { type: 'info', text: "L'avant-dernière scène. La légende des héros prend forme dans le monde. C'est le moment où l'aventure de table devient une histoire dans l'univers de jeu." },
    { type: 'tip', text: "Demandez à chaque joueur ce que son personnage devient après l'aventure. Un fermier ? Un roi ? Un ermite ? Un professeur ? Laissez-les écrire la fin de leur personnage." },
    { type: 'lore', text: "Le Hall des Héros contient les noms de tous les défenseurs d'Aethelgard, de tous les âges. La nouvelle aile est la plus visitée. Les enfants touchent la statue pour avoir de la chance." },
  ],
  choices: [
    {
      id: 'choice-legacy',
      prompt: "Que devient le héros après l'aventure ?",
      options: [
        {
          label: "Retourner à la vie simple",
          description: "Raccrocher l'épée. Devenir fermier, artisan, tavernier. Vivre.",
          consequence: "La paix est le plus grand trésor. Le héros vieillit entouré d'amis, de rires et de petits bonheurs. L'épée reste accrochée au mur, un souvenir plus qu'une arme.",
          nextScene: 'scene-5-13-tease',
        },
        {
          label: "Continuer l'aventure",
          description: "Le monde est grand. Il reste tant à découvrir.",
          consequence: "Les routes appellent. Le héros part vers de nouveaux horizons, porté par la curiosité et le goût de l'inconnu. La légende continue.",
          nextScene: 'scene-5-13-tease',
        },
        {
          label: "Servir et protéger",
          description: "Devenir gardien, conseiller, mentor. Transmettre.",
          consequence: "Le héros fonde un ordre, enseigne, protège. Les générations futures bénéficient de sa sagesse. Le cycle du mentorat continue.",
          nextScene: 'scene-5-13-tease',
        },
        {
          label: "Disparaître",
          description: "Comme L'Ombre. Pas d'adieux. Juste le vent et la route.",
          consequence: "Un matin, le héros n'est plus là. Pas de lettre, pas d'explication. Juste une place vide et un sourire dans le souvenir de ceux qui restent. Certains disent l'avoir vu, des années plus tard, sur une route lointaine. Mais ce ne sont que des histoires.",
          nextScene: 'scene-5-13-tease',
        },
      ],
    },
  ],
  nextScenes: ['scene-5-13-tease'],
  previousScene: 'scene-5-13-farewells',
};

const scene_5_13_tease: BookScene = {
  id: 'scene-5-13-tease',
  sceneNumber: 314,
  title: "Dans les Profondeurs",
  type: 'narration',
  location: "Quelque part sous Aethelgard, dans l'obscurité totale",
  locationId: 'inconnu',
  estimatedMinutes: 5,
  readAloud: {
    text: `Quelque part.

Dans un endroit que personne n'a encore découvert. Plus profond que les mines de Forgefer. Plus ancien que les ruines d'Ashka. Plus sombre que les abysses de la Mer Noire.

Quelque chose bouge.

Ce n'est pas l'Entité. Ce n'est pas le Cercle des Cendres. Ce n'est pas un ennemi que quiconque dans Aethelgard a jamais imaginé.

C'est quelque chose de nouveau.

Une lumière s'allume dans les ténèbres. Petite. Bleue. Pulsante.

Et dans cette lumière, une voix murmure un mot.

Un nom.

Votre nom.

...

Fin.`,
    mood: "Mystère absolu, graine semée, promesse de suite",
    music: "Silence total. Puis une note unique, basse, vibrante. Puis le silence à nouveau. Générique.",
  },
  gmNotes: [
    { type: 'info', text: "Post-crédits. Cette scène est un tease pour une éventuelle suite de campagne. Elle doit être courte, mystérieuse, et laisser les joueurs avec une question sans réponse." },
    { type: 'tip', text: "Lisez cette scène APRÈS un moment de silence. Quand les joueurs pensent que c'est fini. Quand ils commencent à parler entre eux. Interrompez-les avec un 'Attendez. Il y a encore quelque chose.' Puis lisez. Lentement." },
    { type: 'secret', text: "La nature de cette nouvelle menace est volontairement laissée ouverte. Le MJ peut la définir selon sa vision : un autre fragment de l'Entité, une civilisation souterraine inconnue, un dieu endormi, ou quelque chose de complètement original. L'important est la PROMESSE — le monde continue." },
  ],
  nextScenes: [],
  previousScene: 'scene-5-13-legacy',
};

// ============================================================================
// EXPORT
// ============================================================================

export const ACT_5_EXPANSION_SCENES: BookScene[] = [
  // Chapitre 11
  scene_5_11_departure,
  scene_5_11_night_attack,
  scene_5_11_deserters,
  scene_5_11_vision,
  // Chapitre 12
  scene_5_12_antechamber,
  scene_5_12_memory_hall,
  scene_5_12_ally_sacrifice,
  scene_5_12_malachar_talk,
  scene_5_12_entity_reveal,
  // Chapitre 13
  scene_5_13_celebration,
  scene_5_13_rebuilding,
  scene_5_13_farewells,
  scene_5_13_legacy,
  scene_5_13_tease,
];
