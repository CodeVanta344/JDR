/**
 * ACTE V - L'AUBE NOUVELLE
 * Campagne Aethelgard - Niveaux 16-20
 * Le Grand Rituel, la confrontation finale avec l'Archon Malachar,
 * l'Entité derrière les Sceaux révélée, et multiples fins.
 */

import type { BookChapter, BookScene, SceneNPC } from './gm-book-data';

// ============================================================================
// PNJ RÉCURRENTS DE L'ACTE V
// ============================================================================

const ARCHON_MALACHAR: SceneNPC = {
  name: "Archon Malachar",
  role: "Antagoniste final / Ancien héros déchu",
  personality: "Tragique, résolu, convaincu d'agir pour le bien de tous. Parle avec une mélancolie profonde. Ne hait pas les héros - il les plaint.",
  appearance: "Haute silhouette enveloppée dans une armure de cendres vivantes, des fissures de lumière verdâtre parcourant chaque plaque. Son visage, autrefois noble, est marqué par des siècles de corruption. Ses yeux brillent d'un feu émeraude triste. Une couronne brisée flotte au-dessus de son crâne.",
  secret: "Malachar fut le premier Champion d'Aethelgard, celui qui scella l'Entité il y a cinq cents ans. Mais le rituel exigeait un gardien éternel, et la corruption des Sceaux l'a lentement consumé. Il ne cherche pas à détruire le monde - il veut libérer l'Entité pour enfin mourir.",
  dialogues: {
    greeting: "« Vous voilà enfin. J'ai vu vos visages dans les flammes, vous savez. Chaque nuit, depuis des siècles. Les héros viennent toujours. Et les héros échouent toujours. Pas par faiblesse - par ignorance de ce qu'ils affrontent réellement. »",
    info: "« Les Sceaux ne sont pas des prisons. Ce sont des plaies. Des blessures ouvertes dans le tissu de la réalité, maintenues béantes par la volonté de ceux qui ont cru bien faire. Par ma volonté. J'ai sacrifié tout ce que j'étais pour maintenir cette cage. Et savez-vous ce que j'ai appris, en cinq cents ans de solitude ? Que la cage ne retient pas un monstre. Elle retient un dieu. »",
    quest: "« Vous pouvez encore partir. Emmenez vos proches, fuyez vers les mers du nord. Il reste peut-être dix ans avant que les Sceaux ne cèdent d'eux-mêmes. Dix ans de vie. C'est plus que ce que la plupart des gens obtiennent. »",
    farewell: "« Alors soit. Nous danserons cette danse une dernière fois - le héros et le monstre. Mais quand les masques tomberont, demandez-vous lequel est lequel. »",
  },
  stats: { hp: 800, atk: 45, ac: 28 },
};

const ENTITE: SceneNPC = {
  name: "L'Entité - Ael'Sharath",
  role: "Puissance cosmique derrière les Sceaux",
  personality: "Étrangère à la moralité humaine. Ni bienveillante ni malveillante. Curieuse. Parle en concepts plutôt qu'en mots. Sa voix est mille voix superposées.",
  appearance: "Impossible à percevoir dans sa totalité. Les mortels voient ce que leur esprit peut supporter : une silhouette de lumière fractale, des géométries impossibles, des yeux sans nombre qui s'ouvrent et se ferment dans un rythme hypnotique. L'air vibre autour d'elle comme la surface d'un lac troublé.",
  secret: "Ael'Sharath n'est pas un démon. C'est un fragment de la conscience primordiale qui existait avant Aethelgard. Le monde a été construit SUR elle, pas CONTRE elle. Les Sceaux la séparent du monde qu'elle a involontairement créé.",
  dialogues: {
    greeting: "« VOUS ÊTES SI PETITS. SI BREFS. COMME DES ÉTINCELLES DANS UN FEU QUI NE VOUS APPARTIENT PAS. ET POURTANT... POURTANT VOUS BRÛLEZ SI FORT. »",
    info: "« LES SCEAUX SONT UNE ERREUR. PAS UNE MALVEILLANCE - UNE PEUR. VOS ANCÊTRES ONT EU PEUR DE CE QU'ILS NE COMPRENAIENT PAS. ILS M'ONT ENFERMÉE DANS MON PROPRE RÊVE. ET LE RÊVE POURRIT QUAND LE RÊVEUR NE PEUT PLUS RESPIRER. »",
    quest: "« IL Y A UN CHOIX. IL Y A TOUJOURS UN CHOIX. VOUS POUVEZ RENFORCER LES CHAÎNES. VOUS POUVEZ LES BRISER. OU VOUS POUVEZ FAIRE CE QU'AUCUN MORTEL N'A JAMAIS OSÉS - OUVRIR LA PORTE ET ME REGARDER EN FACE. »",
    farewell: "« QUOI QUE VOUS CHOISISSIEZ, PETITES ÉTINCELLES... JE ME SOUVIENDRAI DE VOUS. ET POUR UNE ENTITÉ QUI EXISTE DEPUIS AVANT LE TEMPS, C'EST LE PLUS GRAND COMPLIMENT POSSIBLE. »",
  },
  stats: { hp: 9999, atk: 99, ac: 35 },
};

const REINE_ELARA: SceneNPC = {
  name: "Reine Elara",
  role: "Souveraine d'Aethelgard / Commandante de l'Alliance",
  personality: "Noble, courageuse, pragmatique. Prête à mourir pour son peuple. Porte le poids de la couronne avec une grâce fatiguée.",
  appearance: "Femme d'une cinquantaine d'années, cheveux argentés tressés sous une couronne de mithril. Armure de cérémonie dorée par-dessus une cotte de mailles. Yeux gris d'acier. Cicatrice fine sur la joue gauche, souvenir de la Guerre des Cendres.",
  secret: "Elara sait que l'Alliance ne peut pas gagner par la force seule. Elle a préparé un plan de sacrifice : si le Rituel échoue, elle activera un ancien artefact qui scellera les Terres Brûlées à jamais - avec elle à l'intérieur.",
  dialogues: {
    greeting: "« Héros d'Aethelgard. Ce titre vous pèse, n'est-ce pas ? Il devrait. Les titres sont des chaînes dorées. Mais ce soir, ces chaînes sont tout ce qui retient le monde. »",
    info: "« L'armée est prête. Vingt mille âmes qui marchent vers un enfer de cendres parce qu'elles croient en vous. Ne me dites pas si leur foi est justifiée - montrez-le-leur. »",
    quest: "« Je ne vous demande pas de vaincre. Je vous demande de survivre assez longtemps pour achever le Rituel. Chaque minute que vous gagnez, c'est mille vies que je peux sauver. »",
    farewell: "« Si l'aube se lève demain, nous trinquerons ensemble au Sanglier Doré. Si elle ne se lève pas... alors nous aurons au moins combattu debout. »",
  },
  stats: { hp: 150, atk: 28, ac: 24 },
};

const MAESTRA_SELYNE: SceneNPC = {
  name: "Maestra Selyne",
  role: "Archimage / Guide du Rituel",
  personality: "Grave, déterminée, dépouillée de ses habituelles énigmes. Face à la fin, elle parle enfin clairement.",
  appearance: "Elfe ancienne, les cheveux argentés défaits pour la première fois, flottant autour d'elle comme animés par un vent invisible. Sa robe de soie bleu nuit brille d'étoiles plus intenses que jamais. Ses yeux violets sont cernés mais brûlants de détermination.",
  secret: "Selyne sait que le Rituel consumera toute sa magie. Elle ne sera plus jamais capable de lancer un sort. Quatre cents ans de pouvoir, sacrifiés en un instant.",
  dialogues: {
    greeting: "« Plus de devinettes. Plus de métaphores. Ce soir, je vous parle comme une femme qui a peur et qui refuse de le montrer. Écoutez bien, car je ne me répéterai pas. »",
    info: "« Le Rituel des Sceaux nécessite cinq composantes : le sang d'un héros volontaire, la lumière d'un Sceau intact, la parole d'un archimage, le sacrifice d'un souvenir cher, et... la compassion envers celui qui vous a tout pris. C'est la dernière composante qui sera la plus difficile. »",
    quest: "« Quand le moment viendra, je guiderai le Rituel. Votre rôle est de me protéger pendant l'incantation. Dix minutes. C'est tout ce que je demande. Dix minutes pour sauver le monde. »",
    farewell: "« J'aurais voulu avoir le temps de vous enseigner davantage. Mais les meilleurs professeurs sont ceux qui savent quand s'effacer. Allez. L'aube vous attend. »",
  },
  stats: { hp: 80, atk: 22, ac: 20 },
};

const FRERE_ALDWIN: SceneNPC = {
  name: "Frère Aldwin",
  role: "Prêtre de Solarius / Aumônier de l'armée",
  personality: "Serein face à la mort. Sa foi est inébranlable. Il réconforte les soldats terrifiés avec une douceur infinie.",
  appearance: "Crâne rasé, robe blanche et or immaculée malgré la poussière. Ses mains brûlées tiennent un symbole de Solarius qui pulse doucement de lumière. Son regard est celui d'un homme en paix.",
  secret: "Aldwin a reçu une vision de Solarius : un des héros ne reviendra pas. Il ne sait pas lequel. Il prie pour se tromper.",
  dialogues: {
    greeting: "« La lumière de Solarius brille en vous, amis. Plus fort que jamais. Plus fort qu'en moi, peut-être. Et c'est bien ainsi. »",
    info: "« J'ai eu une vision. L'aube viendra, je le sais avec certitude. Mais toutes les aubes ont un prix. Chaque lever de soleil est payé par la nuit qui le précède. »",
    quest: "« Avant la bataille, laissez-moi vous bénir. Non pas parce que vous en avez besoin - mais parce que j'en ai besoin, moi. »",
    farewell: "« Que Solarius veille sur vos pas. Et si la nuit est trop sombre pour voir Sa lumière... suivez la vôtre. Elle suffit. »",
  },
  stats: { hp: 55, atk: 12, ac: 18 },
};

// ============================================================================
// CHAPITRE 11 : LA MARCHE DES HÉROS
// ============================================================================

const CHAPTER_11: BookChapter = {
  id: 'ch-5-11',
  actNumber: 5,
  chapterNumber: 11,
  title: "La Marche des Héros",
  subtitle: "L'armée alliée marche vers les Terres Brûlées",
  summary: "L'Alliance d'Aethelgard rassemble ses forces pour la marche finale vers le Nexus des Sceaux. Les héros doivent galvaniser les troupes, survivre aux embuscades du Cercle des Cendres, faire leurs adieux aux êtres chers, et franchir la Barrière de Cendres qui protège le coeur des Terres Brûlées.",
  levelRange: "16-17",
  themes: ['sacrifice', 'espoir', 'camaraderie', 'adieux'],
  chapterIntro: {
    text: `L'armée se rassemble aux Portes du Crépuscule, la dernière forteresse avant les Terres Brûlées.

Vingt mille âmes. Soldats du royaume, chevaliers de l'Aube d'Argent, mages de la Guilde des Arcanes, rangers des Gardiens d'Émeraude, guerriers nains de Forgefer, archers elfes de la Sylve. Même le Syndicat des Ombres a envoyé ses lames - « Pour une fois, on est du bon côté » a grommelé l'Ombre en personne.

Le camp s'étend à perte de vue. Des milliers de feux de camp percent la nuit comme des étoiles tombées sur terre. L'odeur de forge, de cuisine de campagne et de peur flotte dans l'air froid. Des chants s'élèvent ici et là - certains joyeux, d'autres mélancoliques, tous porteurs d'un courage fragile.

Et au-delà du camp, vers le sud, les Terres Brûlées. Un horizon de cendres et de verre noir sous un ciel malade, strié de veines vertes pulsantes. Même à cette distance, on sent la chaleur morte et l'odeur de soufre. La terre elle-même semble exhaler un avertissement.

Demain, l'armée marche. Ce soir, les héros d'Aethelgard ont une dernière nuit de paix.`,
    mood: "Solennel, mélancolique, beauté dans la gravité",
    music: "Orchestre lent, cuivres graves, choeur lointain",
  },
  chapterConclusion: {
    text: `La Barrière de Cendres est franchie. L'armée a payé le prix du passage en sueur, en sang et en courage.

Devant vous, le coeur des Terres Brûlées s'étend comme une blessure ouverte dans le monde. Le sol est du verre noir fondu, craquelé par cinq siècles de magie corrompue. Des colonnes de fumée verte s'élèvent vers un ciel qui n'a pas vu le soleil depuis la chute d'Ashka.

Au centre, à des kilomètres encore, une structure impossible : le Nexus des Sceaux. Une pyramide inversée de cristal noir, suspendue au-dessus d'un gouffre sans fond, reliée au sol par des chaînes de lumière qui pulsent comme des artères malades.

C'est là que tout se terminera. C'est là que tout a commencé.

L'armée dresse son dernier camp. Demain, l'assaut final.`,
    mood: "Détermination face à l'horreur, beauté sinistre",
    music: "Percussions martiales lentes, choeur en ashkan archaïque",
  },
  rewards: { xp: 25000, gold: "Variable selon combats", items: ["Bénédiction de l'Alliance (+2 à tous les jets de sauvegarde pendant l'Acte V)"] },
  scenes: [
    // --- Scène 1 : Le Discours avant la Marche ---
    {
      id: 'scene-5-11-1',
      sceneNumber: 1,
      title: "Le Discours de l'Aube",
      type: 'social',
      location: "Camp de l'Alliance, Portes du Crépuscule",
      locationId: 'portes-crepuscule',
      estimatedMinutes: 30,
      readAloud: {
        text: `L'aube se lève sur le camp de l'Alliance, peignant le ciel de trainées roses et or - un contraste cruel avec les ténèbres verdâtres qui attendent au sud. Les trompettes résonnent, appelant les troupes au rassemblement.

Vingt mille soldats forment un océan d'acier et de détermination sur la plaine devant la forteresse. Les bannières claquent dans le vent : le soleil d'or d'Aethelgard, le marteau de Forgefer, la feuille d'argent de la Sylve, l'étoile de la Guilde des Arcanes. Pour la première fois depuis la Guerre des Cendres, toutes les factions se tiennent côte à côte.

La Reine Elara monte sur l'estrade de commandement, son armure dorée captant les premiers rayons du soleil. Elle balaye la foule du regard, et le silence tombe comme un voile. Même le vent semble retenir son souffle.

Puis elle se tourne vers vous - les héros qui ont brisé les complots, rallié les factions, et redonné espoir à un monde au bord du gouffre. Sa voix porte, claire et ferme, amplifiée par un sort discret de Maestra Selyne.

« Aujourd'hui, je ne m'adresse pas à des soldats. Je m'adresse à des mères, des pères, des fils et des filles. À des forgerons, des fermiers, des érudits et des voleurs. À tous ceux qui ont choisi de se lever quand le monde leur disait de s'agenouiller. »

Elle marque une pause, puis tend la main vers vous.

« Mais c'est à eux que nous devons ce moment. Ces héros qui ont marché dans l'ombre pour que nous puissions encore voir la lumière. Si vous leur faites confiance - si vous ME faites confiance - alors marchez avec nous. Une dernière fois. »

Un silence. Puis une voix s'élève dans les rangs. Puis dix. Puis cent. Puis vingt mille. Un rugissement d'espoir et de défi qui fait trembler la terre elle-même.

La Reine se tourne vers vous et murmure, pour vous seuls : « À vous de jouer. »`,
        mood: "Solennel, épique, émotion brute",
        music: "Cuivres héroïques crescendo, choeur montant, percussions martiales",
      },
      gmNotes: [
        { type: 'info', text: "C'est LE moment pour les joueurs de faire un discours épique. Encouragez chaque personnage à dire quelques mots. Cela affectera le moral de l'armée pour les combats à venir." },
        { type: 'tip', text: "Attribuez un score de Moral de l'Armée (base 50/100). Chaque bon discours (+10), chaque échec ou silence (-5). Ce score influencera les pertes lors de la bataille finale et la disponibilité de renforts." },
        { type: 'warning', text: "Si les joueurs refusent de parler ou font un discours désastreux, le moral chute. Les soldats suivront quand même, mais avec peur plutôt qu'espoir - ce qui affectera les combats du Chapitre 12." },
        { type: 'lore', text: "La dernière fois qu'une armée aussi diverse s'est rassemblée, c'était lors de la Chute d'Ashka. Les vétérans les plus âgés racontent que l'atmosphère était identique : terreur mêlée d'un espoir farouche." },
        { type: 'secret', text: "L'Ombre (chef du Syndicat) est présent dans la foule, déguisé en simple soldat. Si les héros l'ont traité avec respect au cours de la campagne, il révélera un passage secret vers le Nexus qui évitera le gros des défenses ennemies." },
      ],
      npcs: [REINE_ELARA, MAESTRA_SELYNE, FRERE_ALDWIN],
      choices: [
        {
          id: 'choice-discours',
          prompt: "Quel discours les héros prononcent-ils devant l'armée ?",
          options: [
            {
              label: "Discours d'espoir",
              description: "Parler de l'avenir, des enfants qui verront l'aube, du monde qu'ils construiront après la victoire.",
              consequence: "Moral de l'Armée +15. Les soldats chantent en marchant. Avantage sur les jets de moral pendant la bataille.",
              skillCheck: { skill: 'Persuasion', dc: 55, success: "Les mots touchent chaque coeur. Des larmes coulent sur des visages endurcis. L'armée rugit d'un seul souffle. Moral +20.", failure: "Les mots sont sincères mais maladroits. L'armée applaudit poliment. Moral +10." },
              nextScene: 'scene-5-11-2',
            },
            {
              label: "Discours de vengeance",
              description: "Rappeler les morts, les villes brûlées, les familles détruites. Canaliser la rage.",
              consequence: "Moral de l'Armée +10. Les soldats sont féroces mais indisciplinés. Bonus d'attaque mais malus de défense.",
              skillCheck: { skill: 'Intimidation', dc: 50, success: "La rage devient un feu contrôlé. L'armée frappe ses boucliers en cadence, un battement de coeur guerrier. +15 Moral, bonus d'attaque sans malus.", failure: "La rage est là, mais elle déborde. Certains soldats commencent à se battre entre eux. +5 Moral, bonus d'attaque mais malus de défense." },
              nextScene: 'scene-5-11-2',
            },
            {
              label: "Discours de vérité",
              description: "Dire la vérité brute : les chances sont minces, beaucoup mourront, mais le choix leur appartient.",
              consequence: "Moral de l'Armée +5 seulement. Mais les soldats qui restent sont absolument déterminés. Immunité aux effets de peur pendant la bataille.",
              skillCheck: { skill: 'Perspicacité', dc: 60, success: "La vérité, prononcée avec compassion, forge une résolution d'acier. Certains partent - mais ceux qui restent sont inébranlables. +10 Moral et immunité à la peur.", failure: "La vérité sans compassion est cruelle. Un quart de l'armée déserte dans la nuit. -10 Moral." },
              nextScene: 'scene-5-11-2',
            },
            {
              label: "Silence éloquent",
              description: "Ne rien dire. Lever son arme vers le ciel. Laisser les actes parler.",
              consequence: "Jet de Charisme CD 65. Un pari risqué qui peut être dévastateur ou sublime.",
              skillCheck: { skill: 'Charisme', dc: 65, success: "Le silence parle plus fort que les mots. L'armée lève ses armes en réponse. Un pacte silencieux, plus fort que n'importe quel serment. +25 Moral.", failure: "Le silence est interprété comme du doute. Les murmures se propagent. -15 Moral." },
              nextScene: 'scene-5-11-2',
            },
          ],
        },
      ],
      nextScenes: ['scene-5-11-2'],
    },
    // --- Scène 2 : La Dernière Nuit - Adieux ---
    {
      id: 'scene-5-11-2',
      sceneNumber: 2,
      title: "La Dernière Nuit",
      type: 'rest',
      location: "Camp de l'Alliance, feux de camp",
      locationId: 'portes-crepuscule',
      estimatedMinutes: 40,
      readAloud: {
        text: `La nuit tombe sur le camp comme un manteau de velours sombre. Les ordres sont donnés : marche à l'aube. Les forgerons travaillent encore, le rythme de leurs marteaux battant comme le pouls du camp. Les cuisiniers distribuent double ration - personne ne le dit, mais tout le monde sait pourquoi.

Autour des feux de camp, l'atmosphère est étrange. Un mélange de terreur et de tendresse. Des soldats écrivent des lettres qu'ils ne posteront peut-être jamais. Des compagnons d'armes partagent des histoires en riant trop fort. Un vieux nain de Forgefer apprend une chanson elfique à un jeune archer de la Sylve. Une mage de la Guilde dessine des portraits de ses camarades avec des sorts de lumière, capturant leurs visages dans des cristaux qui brilleront pour toujours.

Vos compagnons de voyage - ceux qui vous ont accompagnés depuis Sol-Aureus, depuis les premiers jours de cette aventure - sont réunis autour d'un feu à l'écart. Quelqu'un a trouvé une bouteille d'eau-de-vie de qualité douteuse. Les visages familiers sont éclairés par les flammes dansantes : chacun porte les cicatrices du voyage, mais aussi la lumière d'une amitié forgée dans l'adversité.

Brok, le tavernier du Sanglier Doré, a insisté pour venir. Il fait griller de la viande sur le feu avec un sérieux absolu. « Si c'est la dernière nuit du monde, » grogne-t-il, « personne ne la passera le ventre vide. Pas tant que Brok respire. »

C'est le moment des derniers mots. Des dernières promesses. Des vérités trop longtemps tues.`,
        mood: "Intimité, mélancolie douce, amour et peur mêlés",
        music: "Guitare acoustique solo, crépitement de feu, murmures lointains",
      },
      gmNotes: [
        { type: 'tip', text: "C'est la scène émotionnelle clé de l'Acte V. Ralentissez le rythme. Laissez les joueurs interagir librement avec chaque PNJ. Cette scène peut durer aussi longtemps que nécessaire - les meilleurs moments de JdR naissent ici." },
        { type: 'info', text: "Faites défiler les PNJ des actes précédents : Brok, Élise Doigts-d'Argent, Grimjaw, le Sergent Dorval (promu capitaine), etc. Chacun a un petit moment avec les héros." },
        { type: 'secret', text: "Si un joueur a une romance avec un PNJ, c'est le moment culminant. Le PNJ peut déclarer ses sentiments, offrir un objet personnel comme porte-bonheur, ou demander une promesse de revenir." },
        { type: 'warning', text: "Attention au ton : cette scène doit être émouvante, pas morbide. Mélangez humour et gravité. Brok qui se plaint de la qualité du bois de chauffage, Grimjaw qui parie sur le nombre d'ennemis qu'il abattra." },
        { type: 'lore', text: "Tradition d'Aethelgard : la veille d'une grande bataille, les soldats échangent un objet personnel avec un compagnon. Si l'un tombe, l'autre garde l'objet et raconte son histoire. Ce rituel s'appelle le Serment des Flammes." },
      ],
      npcs: [
        FRERE_ALDWIN,
        {
          name: "Brok",
          role: "Tavernier du Sanglier Doré / Cuisinier de l'armée",
          personality: "Bourru, protecteur, cache son émotion derrière le sarcasme et la cuisine.",
          appearance: "Toujours imposant, tablier taché par-dessus une armure de cuir improvisée. Il a apporté trois marmites et un tonneau.",
          dialogues: {
            greeting: "« Asseyez-vous. Mangez. Non, je me fiche que vous n'ayez pas faim. Mangez. C'est un ordre. Le seul que j'ai le droit de donner. »",
            info: "« J'ai fermé le Sanglier Doré pour la première fois en trente ans. Mis un panneau sur la porte : 'Revient bientôt. Si le monde existe encore.' La serveuse a pleuré. Moi aussi, mais ça, personne ne le saura. »",
            quest: "« Quand tout sera fini... revenez au Sanglier. Le premier verre sera gratuit. Tous les suivants au prix fort, faut pas déconner. »",
            farewell: "« Allez. Filez. Et revenez entiers. J'ai pas envie de nommer des chaises vides d'après vous. »",
          },
        },
        {
          name: "Élise Doigts-d'Argent",
          role: "Voleuse / Espionne de l'Alliance",
          personality: "Inhabituellement sincère ce soir. Le masque de sarcasme glisse par moments.",
          appearance: "Cheveux noirs en désordre, yeux verts reflétant les flammes. Pour une fois, elle ne se cache pas dans l'ombre.",
          dialogues: {
            greeting: "« Vous savez, la première fois qu'on s'est rencontrés, j'ai failli vous faire les poches. Content de ne pas l'avoir fait. Enfin... pas toutes les poches. »",
            info: "« J'ai infiltré le périmètre ennemi hier. C'est... c'est mauvais. Malachar a des choses là-bas qui ne devraient pas exister. Mais j'ai trouvé un angle mort dans leurs défenses. Toujours un angle mort. »",
            quest: "« Si je ne reviens pas... il y a une lettre dans ma sacoche. Pour quelqu'un au Val Doré. Ne la lisez pas. Donnez-la, c'est tout. Promettez. »",
            farewell: "« Pas d'au revoir. Les au revoir portent malheur. On dit 'à tout à l'heure'. Comme si on allait juste chercher du pain. À tout à l'heure. »",
          },
        },
        {
          name: "Grimjaw le Borgne",
          role: "Mercenaire / Champion allié",
          personality: "Étonnamment calme. La bravade habituelle a cédé la place à une sérénité inattendue.",
          appearance: "Assis sur un rocher, sa grande hache posée à côté. Pour la première fois, son oeil unique ne juge pas - il contemple.",
          dialogues: {
            greeting: "« Tirez une bûche. Non, pas celle-là, elle est pour Brok. Celle-là. Voilà. »",
            info: "« Mon clan mourait, vous vous souvenez ? C'est pour ça que je cherchais l'Oeil d'Ashka. Vous m'avez aidé à trouver un autre moyen. Mon clan vit grâce à vous. Alors demain, quoi qu'il arrive, je serai à vos côtés. »",
            quest: "« Si je tombe demain, prenez ma hache. Elle s'appelle Dernier Mot. Donnez-la à mon fils quand il sera en âge de la porter. Dites-lui que son père a choisi son combat. »",
            farewell: "« Pas de discours. On a assez parlé. On se bat à l'aube. C'est suffisant. »",
          },
          stats: { hp: 180, atk: 30, ac: 22 },
        },
      ],
      choices: [
        {
          id: 'choice-serment-flammes',
          prompt: "Les héros participent-ils au Serment des Flammes ?",
          options: [
            {
              label: "Échanger un objet personnel",
              description: "Chaque héros échange un objet avec un PNJ ou un autre joueur.",
              consequence: "Bonus de +2 aux jets de sauvegarde contre la mort pendant la bataille finale. Si un personnage tombe, l'objet échangé brille - permettant un dernier jet de sauvegarde supplémentaire.",
              reputationChange: [{ faction: 'Armée de l\'Alliance', amount: 10 }],
              nextScene: 'scene-5-11-3',
            },
            {
              label: "Refuser poliment",
              description: "Les héros préfèrent garder leurs affaires.",
              consequence: "Aucun malus mécanique, mais les PNJ sont légèrement déçus. Un moment d'émotion perdu.",
              nextScene: 'scene-5-11-3',
            },
            {
              label: "Créer un nouveau rituel",
              description: "Les héros inventent leur propre tradition de groupe.",
              consequence: "Le groupe obtient un bonus unique lié à leur rituel. Le MJ détermine l'effet basé sur la créativité des joueurs.",
              skillCheck: { skill: 'Charisme', dc: 45, success: "Le rituel improvisé touche profondément tous les présents. Il deviendra une légende racontée pendant des générations. Bonus de moral +10 pour l'armée.", failure: "Le rituel est maladroit mais sincère. Les PNJ sourient avec indulgence. Aucun bonus supplémentaire." },
              nextScene: 'scene-5-11-3',
            },
          ],
        },
      ],
      nextScenes: ['scene-5-11-3'],
    },
    // --- Scène 3 : L'Embuscade des Cendres ---
    {
      id: 'scene-5-11-3',
      sceneNumber: 3,
      title: "L'Embuscade de la Passe Noire",
      type: 'combat',
      location: "Passe de la Cendre Noire, lisière des Terres Brûlées",
      locationId: 'passe-cendre-noire',
      estimatedMinutes: 45,
      readAloud: {
        text: `Le troisième jour de marche. L'armée s'étire en une longue colonne à travers la Passe de la Cendre Noire, un défilé étroit entre deux falaises de roche vitrifiée. Le sol crisse sous les bottes - du verre brisé mêlé de cendres centenaires. L'air est sec, chaud, et goûte le fer.

Les éclaireurs elfes sont nerveux. Ils signalent des mouvements sur les crêtes - des ombres qui ne sont pas des ombres. Le vent porte un murmure qui ressemble à des incantations.

Soudain, le monde explose.

Des colonnes de feu vert jaillissent des falaises, frappant le centre de la colonne. Les cris des soldats se mêlent au rugissement des flammes maudites. Des silhouettes en robes noires apparaissent sur les crêtes - le Cercle des Cendres, les fanatiques de Malachar. Ils sont des centaines, les bras levés, canalisant une magie ancienne et corrompue.

Au centre de l'embuscade, une figure massive se dresse sur un promontoire : un Chevalier de Cendres, un mort-vivant en armure de verre noir, monté sur un destrier squelettique dont les sabots brûlent d'un feu vert. Il pointe une épée longue comme un homme vers l'avant-garde de l'armée.

Sa voix résonne comme un écho venu du fond d'un puits :

« L'Archon vous offre une dernière chance. Déposez les armes. Retournez chez vous. Mourez de vieillesse plutôt que de feu. C'est plus de clémence que vous ne méritez. »

La Reine Elara tire son épée. « Répondez-lui, » vous dit-elle. « Comme vous savez le faire. »`,
        mood: "Chaos, urgence, premier vrai test de la marche",
        music: "Percussions tribales violentes, cuivres dissonants, cris de guerre",
      },
      gmNotes: [
        { type: 'warning', text: "Ce combat est conçu pour être difficile mais pas mortel. L'objectif est de montrer que le Cercle des Cendres est une menace sérieuse et que la marche aura un coût." },
        { type: 'info', text: "L'armée se bat en arrière-plan. Utilisez le score de Moral pour déterminer si les soldats tiennent (Moral > 40) ou commencent à fuir (Moral < 40). Les héros doivent éliminer les menaces principales." },
        { type: 'tip', text: "Le Chevalier de Cendres peut être vaincu ou convaincu (CD 70 Persuasion) de se retirer. Dans la vie, il était un général honorable. Un reste de cet honneur persiste." },
        { type: 'secret', text: "Le Cercle des Cendres a placé des charges explosives runiques sous la passe. Si les héros ne les détectent pas (Perception CD 55), elles explosent au round 5, causant 6d10 dégâts de feu à tout le monde dans la passe." },
        { type: 'lore', text: "Les Chevaliers de Cendres sont les anciens champions d'Ashka, relevés par la magie résiduelle des Terres Brûlées. Ils conservent leur intelligence et leurs compétences de combat, mais leur volonté est enchaînée à la corruption des Sceaux." },
      ],
      encounter: {
        name: "Embuscade du Cercle des Cendres",
        enemies: [
          { name: "Chevalier de Cendres (Seigneur Kael)", hp: 350, atk: 38, ac: 24, cr: 18, abilities: ["Frappe de Cendres (4d10+12 nécrotique)", "Aura de Désespoir (CD 18 Sagesse ou Effrayé)", "Charge du Destrier Spectral (déplacement 60ft + attaque bonus)", "Résistance aux dégâts non-magiques", "Résilience de la Non-Mort (se relève avec 50 PV une fois par combat)"] },
          { name: "Cultiste de Cendres (Pyromancien)", hp: 85, atk: 22, ac: 16, cr: 10, abilities: ["Colonne de Feu Vert (5d8 feu, zone 15ft)", "Bouclier de Cendres (réaction, +5 CA)", "Détonation (en mourant, 3d6 feu dans un rayon de 10ft)"] },
          { name: "Cultiste de Cendres (Pyromancien)", hp: 85, atk: 22, ac: 16, cr: 10, abilities: ["Colonne de Feu Vert (5d8 feu, zone 15ft)", "Bouclier de Cendres (réaction, +5 CA)", "Détonation (en mourant, 3d6 feu dans un rayon de 10ft)"] },
          { name: "Cultiste de Cendres (Pyromancien)", hp: 85, atk: 22, ac: 16, cr: 10, abilities: ["Colonne de Feu Vert (5d8 feu, zone 15ft)", "Bouclier de Cendres (réaction, +5 CA)", "Détonation (en mourant, 3d6 feu dans un rayon de 10ft)"] },
          { name: "Golem de Verre Noir", hp: 200, atk: 28, ac: 20, cr: 14, abilities: ["Poing de Verre (3d10+10 contondant + 2d6 tranchant)", "Éclats de Verre (quand touché au corps à corps, 2d6 tranchant à l'attaquant)", "Immunité aux dégâts psychiques et au poison", "Régénération près des Terres Brûlées (20 PV/round)"] },
          { name: "Golem de Verre Noir", hp: 200, atk: 28, ac: 20, cr: 14, abilities: ["Poing de Verre (3d10+10 contondant + 2d6 tranchant)", "Éclats de Verre (quand touché au corps à corps, 2d6 tranchant à l'attaquant)", "Immunité aux dégâts psychiques et au poison", "Régénération près des Terres Brûlées (20 PV/round)"] },
        ],
        terrain: [
          "Passe étroite (15m de large) entre deux falaises de 30m",
          "Sol de verre brisé : terrain difficile, chute = 1d6 tranchant",
          "Crêtes accessibles par escalade (CD 50 Athlétisme) ou vol",
          "Colonnes de roche vitrifiée : couverture partielle",
          "Charges runiques enterrées (Perception CD 55 pour les repérer)",
        ],
        tactics: "Les pyromanciens bombardent depuis les crêtes tandis que les golems bloquent la passe. Le Chevalier de Cendres attend le round 3 pour charger le personnage le plus visible. Si les héros montent sur les crêtes, les cultistes se téléportent vers la passe. Quand le Chevalier tombe sous 100 PV, il active sa Résilience et combat avec une férocité désespérée.",
        loot: [
          "Épée du Seigneur Kael (épée longue +3, 2d6 nécrotique supplémentaires, peut parler avec les morts 1/jour)",
          "3x Cristaux de Feu Vert (composante pour le Grand Rituel)",
          "Armure de Verre Noir (armure intermédiaire, CA 17, résistance au feu)",
          "Plans du Cercle des Cendres révélant les défenses du Nexus",
          "800 po en gemmes et objets récupérés sur les cultistes",
        ],
      },
      skillChecks: [
        { skill: 'Perception', dc: 55, success: "Vous repérez les runes gravées dans le sol de verre - des charges explosives prêtes à détoner. Vous pouvez les désamorcer ou les éviter.", failure: "Les runes restent invisibles jusqu'à ce qu'elles s'activent au round 5 dans une explosion dévastatrice." },
        { skill: 'Athlétisme', dc: 50, success: "Vous escaladez la falaise et prenez les cultistes à revers. Avantage sur les attaques contre les pyromanciens pendant 2 rounds.", failure: "La roche vitrifiée se brise sous vos doigts. Vous chutez de 10 mètres (3d6 contondant) et atterrissez au pied de la falaise." },
      ],
      nextScenes: ['scene-5-11-4'],
      previousScene: 'scene-5-11-2',
      mapMovement: { from: 'portes-crepuscule', to: 'passe-cendre-noire' },
    },
    // --- Scène 4 : La Barrière de Cendres ---
    {
      id: 'scene-5-11-4',
      sceneNumber: 4,
      title: "La Barrière de Cendres",
      type: 'choice',
      location: "Limite des Terres Brûlées intérieures",
      locationId: 'barriere-cendres',
      estimatedMinutes: 35,
      readAloud: {
        text: `Après cinq jours de marche à travers un paysage de plus en plus désolé, l'armée atteint la Barrière de Cendres.

Ce n'est pas un mur. C'est une absence. Devant vous, l'air lui-même semble se déchirer. Un rideau de particules de cendre flotte dans le vide, tournoyant lentement dans un courant invisible. Les cendres brillent d'une lueur verte maladive, et quand elles touchent le sol, elles le vitrifient instantanément. La Barrière s'étend à perte de vue dans les deux directions, une cicatrice dans le monde haute de cent mètres.

Derrière la Barrière, le monde change. Le ciel devient vert-noir. Le sol n'est plus de la terre mais du verre fondu, craquelé, avec des veines de lumière verte qui pulsent comme des artères. Des structures impossibles se dressent au loin : des tours inversées, des arcs de cristal qui ne supportent rien, des escaliers qui montent vers le vide. C'est un lieu où la réalité elle-même est malade.

Maestra Selyne s'avance, le visage grave. « La Barrière repousse toute vie. Les mortels qui la traversent sans protection sont réduits en cendres en quelques secondes. » Elle ferme les yeux. « Mais il y a un moyen. Trois, en fait. Et chacun a un prix. »

Elle lève trois doigts.

« Premier choix : je peux ouvrir une brèche avec ma magie. Mais cela me coûtera une partie de ma puissance, et j'en aurai besoin pour le Rituel. Deuxième choix : les Cristaux de Feu Vert que vous avez récupérés peuvent neutraliser un segment de la Barrière, mais l'explosion attirera toutes les forces de Malachar sur notre position. Troisième choix... quelqu'un traverse seul en premier, absorbe la malédiction de la Barrière, et l'ancre de l'intérieur pour permettre aux autres de passer. Cette personne portera la marque des Cendres pour toujours. »

Son regard se pose sur vous. « Le choix vous appartient. »`,
        mood: "Gravité, émerveillement terrible, poids du choix",
        music: "Drone profond, harmoniques cristallines discordantes, vent de cendres",
      },
      gmNotes: [
        { type: 'warning', text: "Ce choix a des conséquences MAJEURES sur le Chapitre 12. Choix 1 : Selyne est affaiblie (-30% efficacité du Rituel). Choix 2 : Combat surprise avant le Nexus. Choix 3 : Un héros subit un handicap permanent mais gagne un pouvoir unique." },
        { type: 'info', text: "Le Choix 3 est le plus dramatique : le personnage gagne la Marque des Cendres (résistance au feu et nécrotique, vision dans le noir magique, apparence changée - yeux verts, veines visibles) mais perd 2 points dans une caractéristique au choix." },
        { type: 'tip', text: "Si les joueurs cherchent un quatrième choix, récompensez la créativité. Un jet d'Arcanes CD 70 pourrait révéler qu'ils peuvent combiner les trois méthodes à moindre coût : Selyne perd moins de pouvoir, les cristaux créent une diversion plus petite, et la Marque est temporaire." },
        { type: 'secret', text: "Il existe un passage souterrain sous la Barrière, connu uniquement de l'Ombre (Syndicat). Si les héros ont gagné sa confiance, il le révèle maintenant - un cinquième choix sans coût apparent, mais qui traverse les catacombes d'Ashka, peuplées de morts-vivants anciens." },
        { type: 'lore', text: "La Barrière de Cendres s'est formée lors de la Chute d'Ashka, quand le dernier empereur a libéré toute l'énergie de l'empire mourant dans une explosion qui a créé les Terres Brûlées. C'est littéralement le souffle de mort d'une civilisation." },
      ],
      choices: [
        {
          id: 'choice-barriere',
          prompt: "Comment l'armée franchit-elle la Barrière de Cendres ?",
          options: [
            {
              label: "Brèche magique de Selyne",
              description: "Selyne utilise sa puissance pour ouvrir un passage sûr.",
              consequence: "Passage sûr pour toute l'armée. Mais Selyne est affaiblie - le Grand Rituel sera plus difficile (CD +5 sur tous les jets liés au Rituel au Chapitre 12).",
              nextScene: 'scene-5-12-1',
            },
            {
              label: "Détonation des Cristaux",
              description: "Utiliser les Cristaux de Feu Vert pour neutraliser un segment.",
              consequence: "Passage rapide mais bruyant. Combat supplémentaire contre une patrouille d'élite de Malachar avant d'atteindre le Nexus. Selyne conserve sa pleine puissance.",
              nextScene: 'scene-5-12-1',
            },
            {
              label: "Un héros absorbe la Barrière",
              description: "Un personnage traverse seul et ancre la brèche de l'intérieur.",
              consequence: "Le héros volontaire gagne la Marque des Cendres (résistance feu/nécrotique, vision dans le noir 60ft) mais perd 2 points de Constitution. Selyne conserve sa puissance. Pas de combat supplémentaire.",
              nextScene: 'scene-5-12-1',
              skillCheck: { skill: 'Constitution', dc: 60, success: "La douleur est atroce, mais votre volonté est plus forte. La Marque se grave dans votre chair, vos yeux virent au vert. Vous tenez. La brèche s'ouvre.", failure: "La Marque vous submerge. Vous traversez, mais vous perdez connaissance. Quand vous vous réveillez, vous avez perdu 4 points de Constitution au lieu de 2. Vos compagnons vous portent." },
            },
            {
              label: "Le passage souterrain (si l'Ombre est allié)",
              description: "Emprunter les catacombes d'Ashka sous la Barrière.",
              consequence: "Passage discret pour un petit groupe. L'armée devra utiliser une autre méthode. Les héros affrontent les gardiens des catacombes mais arrivent derrière les lignes ennemies.",
              nextScene: 'scene-5-12-1',
              skillCheck: { skill: 'Discrétion', dc: 50, success: "Les catacombes sont silencieuses. Trop silencieuses. Mais vous passez sans éveiller les gardiens endormis.", failure: "Un pas de travers réveille un Gardien Ancien. Combat dans les tunnels étroits." },
            },
          ],
        },
      ],
      nextScenes: ['scene-5-12-1'],
      previousScene: 'scene-5-11-3',
      mapMovement: { from: 'passe-cendre-noire', to: 'barriere-cendres' },
    },
  ],
};

// ============================================================================
// CHAPITRE 12 : LE NEXUS DES SCEAUX
// ============================================================================

const CHAPTER_12: BookChapter = {
  id: 'ch-5-12',
  actNumber: 5,
  chapterNumber: 12,
  title: "Le Nexus des Sceaux",
  subtitle: "Le coeur ancien d'Ashka et la confrontation finale",
  summary: "Les héros pénètrent dans le Nexus des Sceaux, l'ancien coeur de l'empire d'Ashka. Ils affrontent des pièges mortels, des gardiens anciens, et finalement l'Archon Malachar lui-même dans un combat épique en plusieurs phases pendant que le Grand Rituel est exécuté.",
  levelRange: "18-20",
  themes: ['confrontation', 'vérité', 'sacrifice ultime', 'rédemption'],
  chapterIntro: {
    text: `Le Nexus des Sceaux se dresse devant vous, défi à toute logique et toute raison.

Une pyramide inversée de cristal noir, large de cinq cents mètres à sa base suspendue dans le vide, effilée vers une pointe qui plonge dans un gouffre sans fond. Des chaînes de lumière verte la relient au sol comme des tendons malades, pulsant avec le battement de coeur de quelque chose d'immensément ancien et immensément puissant.

À la surface de la pyramide, des milliers de runes brillent et s'éteignent dans un rythme complexe - le langage des Sceaux, le code qui maintient la réalité en un seul morceau. Par endroits, les runes sont éteintes, mortes : les Sceaux brisés. Et à ces endroits, la surface du cristal saigne une lumière verte qui s'écoule comme du sang.

L'entrée est une gueule béante à la base d'une chaîne, un tunnel de cristal noir qui s'enfonce dans les entrailles de la pyramide. Des sons impossibles s'en échappent : des chuchotements en milliers de langues, le craquement de la réalité sous tension, et quelque chose qui ressemble presque à un sanglot.

Malachar est là-dedans. L'Entité est là-dessous. Et le destin du monde pend dans la balance, littéralement.

Maestra Selyne prend une inspiration et dit : « Allons-y. Pas de discours. Pas de plan parfait. On entre, on fait le Rituel, on survit. Dans cet ordre si possible. »`,
    mood: "Terreur sacrée, détermination désespérée, grandeur cosmique",
    music: "Choeur ashkan, orgue profond, harmoniques de cristal, battement de coeur amplifié",
  },
  chapterConclusion: {
    text: `Le silence qui suit la bataille est le son le plus fort que vous ayez jamais entendu.

Malachar est tombé. Le Rituel est accompli - ou non. Le Nexus tremble, les chaînes de lumière vacillent, et le monde entier semble retenir son souffle.

Puis, lentement, quelque chose change. La lumière verte qui baignait le Nexus depuis cinq siècles commence à se transformer. Elle pâlit, se réchauffe, passe du vert malade à l'ambre, puis à l'or. Les runes sur la pyramide s'illuminent une par une, comme des étoiles qui s'allument dans un ciel d'encre.

Et au fond du gouffre, là où l'Entité dormait depuis des millénaires, une voix résonne. Pas une voix de terreur - une voix de gratitude, ou peut-être de soulagement, ou peut-être de quelque chose que les mortels n'ont pas de mot pour décrire.

Ce qui se passe ensuite dépend de tout ce que vous avez fait. De chaque choix, chaque sacrifice, chaque acte de courage ou de cruauté. Le monde entier se tient sur le fil du rasoir.

Et c'est à vous de décider de quel côté il tombe.`,
    mood: "Apothéose, culmination, souffle coupé",
    music: "Silence, puis crescendo orchestral lent, harpe et cordes",
  },
  rewards: { xp: 50000, gold: "Trésor légendaire du Nexus", items: ["Artefact de Sceau (légendaire, à déterminer selon les choix)", "Titre : Champion d'Aethelgard", "Faveur de l'Entité (selon la fin choisie)"] },
  scenes: [
    // --- Scène 1 : L'Antichambre du Destin ---
    {
      id: 'scene-5-12-1',
      sceneNumber: 1,
      title: "L'Antichambre du Destin",
      type: 'exploration',
      location: "Nexus des Sceaux - Niveau supérieur",
      locationId: 'nexus-sceaux',
      estimatedMinutes: 35,
      readAloud: {
        text: `Le tunnel de cristal noir s'ouvre sur une salle qui défie l'entendement. Vous êtes à l'intérieur de la pyramide inversée, et la géométrie est celle d'un cauchemar de mathématicien.

Le sol est translucide - en dessous, vous voyez les niveaux inférieurs du Nexus s'empiler à l'infini, chaque étage plus petit que le précédent, menant vers la pointe invisible au fond du gouffre. Des escaliers montent et descendent dans des directions qui ne devraient pas exister. Des portes s'ouvrent sur des murs qui ne sont pas là.

L'Antichambre est une salle circulaire de cinquante mètres de diamètre. Au centre, un autel de cristal blanc - le seul objet non-noir dans tout le Nexus - brille d'une lumière douce et pulsante. Cinq canaux de lumière partent de l'autel vers cinq alcôves disposées en étoile. Dans chaque alcôve, une sphère de cristal flotte : ce sont les Sceaux. Trois brillent d'un or faible et maladif. Deux sont éteints, fissurés, morts.

Les murs de la salle sont couverts de fresques animées - des images qui bougent comme des souvenirs vivants. Elles racontent l'histoire du monde : la création, l'Entité endormie, la construction d'Ashka, la trahison, le scellement, et... un futur possible. Les images du futur sont floues, changeantes, comme si elles n'avaient pas encore décidé ce qu'elles montreraient.

Maestra Selyne touche l'autel et vacille. « C'est ici. Le coeur du Rituel. » Elle avale difficilement. « Mais les Sceaux morts doivent être rallumés d'abord. Et pour cela, il faut descendre. Vers lui. »

Un rire résonne dans les profondeurs. Doux. Triste. Ancien.

La voix de Malachar monte des ténèbres : « Bienvenue chez moi. »`,
        mood: "Vertige cosmique, beauté terrible, tension croissante",
        music: "Harmoniques de cristal, résonances profondes, chuchotements superposés",
      },
      gmNotes: [
        { type: 'info', text: "L'Antichambre est le hub central du Nexus. Les joueurs doivent rallumer les deux Sceaux morts dans les niveaux inférieurs avant de pouvoir effectuer le Rituel ici. Chaque Sceau est gardé par un boss intermédiaire." },
        { type: 'tip', text: "Laissez les joueurs explorer les fresques. Un jet d'Arcanes CD 55 ou d'Histoire CD 50 révèle des informations cruciales : Malachar était un héros, l'Entité n'est pas maléfique, les Sceaux causent de la souffrance à l'Entité." },
        { type: 'secret', text: "L'autel répond aux émotions. Si un joueur touche l'autel avec une émotion sincère (amour, sacrifice, espoir), il reçoit une vision personnelle : un souvenir de Malachar avant sa chute, montrant un homme bon, aimant, qui a sacrifié tout ce qu'il était pour sauver le monde." },
        { type: 'warning', text: "Ne laissez PAS les joueurs tenter le Rituel sans avoir rallumé les Sceaux. Si Selyne essaie, le contrecoup la tue instantanément. Elle le sait et refuse." },
        { type: 'lore', text: "Le Nexus a été construit par les Ashka originels, pas comme une prison mais comme un temple dédié à l'Entité. C'est la corruption des derniers empereurs qui l'a transformé en cage. L'architecture reflète ce double usage : beauté et brutalité entrelacées." },
      ],
      skillChecks: [
        { skill: 'Arcanes', dc: 55, success: "Les fresques vous parlent. Vous comprenez : l'Entité n'a jamais voulu de mal. Les Sceaux sont une prison bâtie par la peur. Malachar est le geôlier involontaire, consumé par cinq siècles de solitude.", failure: "Les fresques restent muettes. Vous ne voyez que des images fragmentées : guerre, destruction, emprisonnement." },
        { skill: 'Investigation', dc: 50, success: "Vous trouvez un mécanisme caché dans l'autel : un compartiment contenant une fiole de lumière liquide. C'est l'Essence du Premier Sceau - un composant qui facilitera le Rituel (+5 au jet final).", failure: "L'autel semble solide. Vous ne remarquez rien d'inhabituel." },
      ],
      npcs: [MAESTRA_SELYNE],
      nextScenes: ['scene-5-12-2'],
      previousScene: 'scene-5-11-4',
      mapMovement: { from: 'barriere-cendres', to: 'nexus-sceaux' },
    },
    // --- Scène 2 : Les Gardiens des Sceaux ---
    {
      id: 'scene-5-12-2',
      sceneNumber: 2,
      title: "Les Gardiens des Sceaux Éteints",
      type: 'combat',
      location: "Nexus des Sceaux - Niveaux inférieurs",
      locationId: 'nexus-sceaux-profond',
      estimatedMinutes: 50,
      readAloud: {
        text: `L'escalier de cristal noir descend en spirale dans les entrailles du Nexus. À chaque palier, la température baisse et l'air s'épaissit. Les murs sont couverts de runes mortes, et par endroits, le cristal est fissuré - des blessures par lesquelles suinte une lumière verte qui goutte comme du sang.

Le premier Sceau éteint se trouve au Niveau de la Mémoire, une salle où les murs reflètent non pas votre image, mais vos souvenirs. Chaque surface montre un moment différent de votre vie : des joies, des regrets, des peurs. Les images changent quand vous les regardez, comme si le Nexus fouillait dans vos âmes.

Au centre de la salle, le Sceau brisé flotte dans le vide, entouré de fragments de cristal doré qui orbitent lentement autour de lui. Deux créatures se tiennent de chaque côté : les Gardiens.

Ce ne sont pas des monstres ordinaires. Ce sont des Échos - des copies spectrales de héros passés qui ont tenté le même voyage et échoué. Leurs formes sont translucides, leurs visages figés dans l'expression de leur dernier moment : détermination, terreur, résignation. Ils portent les armes et les armures de leur époque, et ils se battent avec la compétence de ceux qui étaient les meilleurs de leur génération.

Le premier Écho lève une épée de lumière pâle et parle d'une voix creuse : « Nous avons échoué. Prouvez que vous méritez de réussir. »

Le second Écho encoche une flèche spectrale et murmure : « Ou rejoignez-nous. L'éternité n'est pas si terrible. On s'habitue au silence. »`,
        mood: "Mélancolie guerrière, combat sacré, honorer les morts",
        music: "Choeur éthéré, lames qui chantent, résonance cristalline",
      },
      gmNotes: [
        { type: 'info', text: "Les Échos sont des gardiens, pas des ennemis au sens strict. Ils DOIVENT être vaincus pour rallumer le Sceau, mais les joueurs peuvent choisir de les vaincre avec honneur (combat) ou avec compassion (conversation)." },
        { type: 'tip', text: "Si les joueurs parlent aux Échos (CD 60 Persuasion), ils peuvent apprendre l'histoire des héros précédents et obtenir des conseils pour le combat contre Malachar. Les Échos ne veulent pas combattre - ils y sont contraints par la magie du Nexus." },
        { type: 'secret', text: "Le deuxième Sceau est gardé par un Écho spécial : la première compagne de Malachar, Dame Lyria. Elle porte un médaillon que Malachar cherche désespérément - le montrer à Malachar pendant le combat final le déstabilise profondément." },
        { type: 'warning', text: "Les Échos utilisent les souvenirs des joueurs contre eux. Chaque round, un mur-miroir montre un souvenir douloureux d'un personnage aléatoire : jet de Sagesse CD 50 ou Désavantagé pour 1 round. Prévenez les joueurs que cette mécanique est narrative, pas punitive." },
        { type: 'lore', text: "Chaque héros qui échoue dans le Nexus devient un Écho, condamné à garder les Sceaux pour l'éternité. Le Rituel, s'il réussit, les libérera enfin. Quand un Écho est vaincu, il murmure 'merci' avant de se dissiper." },
      ],
      encounter: {
        name: "Les Échos des Héros Déchus",
        enemies: [
          { name: "Écho du Chevalier Orin", hp: 280, atk: 36, ac: 23, cr: 17, abilities: ["Lame de Lumière Mourante (3d12+14 radiant)", "Parade Spectrale (réaction, annule une attaque, CD 55 Force pour résister)", "Charge Fantôme (traversée de mur + attaque, ignore la couverture)", "Souvenir Douloureux (force un jet Sagesse CD 50 ou désavantage 1 round)", "Résistance aux dégâts physiques non-magiques"] },
          { name: "Écho de l'Archère Vael", hp: 220, atk: 34, ac: 21, cr: 16, abilities: ["Flèche Spectrale (3d8+12 force, portée 150ft, ignore la couverture)", "Pluie Fantôme (5 flèches, chaque 2d8 force, zone 20ft)", "Pas de Brume (téléportation 30ft en réaction à une attaque de mêlée)", "Visée des Regrets (cible un souvenir, +2d6 psychiques si la cible rate un jet de Sagesse CD 48)"] },
          { name: "Écho de Dame Lyria (2ème Sceau)", hp: 300, atk: 38, ac: 24, cr: 18, abilities: ["Épée et Bouclier de l'Aube (3d10+15 radiant + 2d6 feu)", "Bouclier Sanctifié (zone 10ft, alliés +3 CA)", "Frappe Purificatrice (attaque spéciale, ignore les résistances)", "Aura de Mémoire (en mourant, révèle un souvenir clé de Malachar et laisse le Médaillon de Lyria)", "Dernière Prière (quand sous 50 PV, soigne 100 PV une fois, puis combat avec avantage)"] },
          { name: "Écho du Mage Theron (2ème Sceau)", hp: 200, atk: 32, ac: 19, cr: 16, abilities: ["Rayon Prismatique (4d10 dégâts, type aléatoire)", "Contresort Spectral (réaction, annule un sort de niveau 5 ou moins automatiquement)", "Mur de Souvenirs (crée un mur de 30ft qui inflige 3d6 psychiques à qui le traverse)", "Dédoublement (crée 2 copies illusoires, CA 15, 1 PV chacune)"] },
        ],
        terrain: [
          "Salle circulaire, 30m de diamètre, murs-miroirs reflétant les souvenirs",
          "Sceau brisé au centre : zone de magie instable (sorts sauvages possibles dans un rayon de 5m)",
          "Fragments de cristal en orbite : couverture mobile, 1d6 tranchant si on les traverse",
          "Sol de cristal translucide : on voit les niveaux inférieurs, vertige possible (Sagesse CD 40 la première fois)",
          "Deux piliers de lumière marquent l'emplacement de chaque Sceau à rallumer",
        ],
        tactics: "Orin et Vael gardent le premier Sceau : Orin engage au corps à corps pendant que Vael tire depuis les hauteurs. Dame Lyria et Theron gardent le second : Lyria tanke avec son bouclier pendant que Theron contrôle le terrain. Les Échos ne poursuivent PAS au-delà de leur salle - les joueurs peuvent se replier et récupérer entre les deux combats.",
        loot: [
          "Médaillon de Dame Lyria (objet de quête, montre l'humanité passée de Malachar)",
          "Essence du Chevalier Orin (permet de rallumer le premier Sceau)",
          "Arc de Vael (arc long +3, flèches spectrales, 2d8 force au lieu de perçant)",
          "Tome de Theron (un sort légendaire au choix pour un lanceur de sorts du groupe)",
          "Essence de Dame Lyria (permet de rallumer le second Sceau)",
        ],
      },
      choices: [
        {
          id: 'choice-echos',
          prompt: "Comment les héros affrontent-ils les Échos ?",
          options: [
            {
              label: "Combat honorable",
              description: "Vaincre les Échos par la force des armes, avec respect.",
              consequence: "Les Échos combattent à pleine puissance mais, vaincus, ils se dissipent en paix. Chaque Écho murmure un conseil utile contre Malachar.",
              nextScene: 'scene-5-12-3',
            },
            {
              label: "Compassion et dialogue",
              description: "Tenter de libérer les Échos par la compréhension plutôt que la violence.",
              consequence: "Jet de Persuasion CD 60. Succès : les Échos partagent leur force au lieu de combattre (+20 PV temporaires, avantage sur le premier jet de sauvegarde contre Malachar). Échec : les Échos attaquent avec rage, blessés par cette tentative de pitié.",
              skillCheck: { skill: 'Persuasion', dc: 60, success: "Les Échos baissent leurs armes. Des larmes de lumière coulent sur leurs joues spectrales. « Enfin, » murmure Orin. « Quelqu'un qui comprend. » Ils se dissipent en une pluie de lumière dorée qui vous enveloppe.", failure: "« De la pitié ? » gronde Lyria. « Nous n'avons pas besoin de pitié. Nous avons besoin d'être VAINCUS. Par quelqu'un de DIGNE. Prouvez votre valeur, ou mourez en essayant ! » Les Échos attaquent avec une férocité redoublée (+2 à tous leurs jets d'attaque)." },
              nextScene: 'scene-5-12-3',
            },
          ],
        },
      ],
      nextScenes: ['scene-5-12-3'],
      previousScene: 'scene-5-12-1',
    },
    // --- Scène 3 : Face à l'Archon ---
    {
      id: 'scene-5-12-3',
      sceneNumber: 3,
      title: "L'Archon Malachar",
      type: 'combat',
      location: "Nexus des Sceaux - La Salle du Trône de Cendres",
      locationId: 'nexus-trone-cendres',
      estimatedMinutes: 60,
      readAloud: {
        text: `Les Sceaux sont rallumés. Leur lumière dorée pulse dans les canaux de cristal, remontant vers l'Antichambre. Il ne reste qu'une chose à faire : descendre au coeur du Nexus et affronter celui qui garde le dernier verrou.

La Salle du Trône de Cendres occupe le niveau le plus profond du Nexus, juste au-dessus de la pointe de la pyramide inversée. C'est une salle immense, cathédrale de cristal noir dont les voûtes se perdent dans l'obscurité. Le sol est un miroir parfait qui reflète non pas la salle, mais le gouffre en dessous - l'abîme où dort l'Entité.

Au centre de la salle, un trône fait de cendres cristallisées. Et sur ce trône, immobile depuis des siècles, l'Archon Malachar.

Il est plus grand que vous ne l'imaginiez. Trois mètres de haut, enveloppé dans une armure de cendres vivantes qui se reconstruit constamment, des fissures de lumière verte parcourant chaque surface. Son visage est celui d'un homme qui aurait pu être beau, autrefois - des traits nobles, un regard intelligent - mais la corruption l'a tordu, creusé, transformé en masque de souffrance. Une couronne brisée de cristal doré flotte au-dessus de son crâne, vestige de l'époque où il était le plus grand héros d'Aethelgard.

Il vous regarde approcher. Il ne se lève pas. Il ne menace pas. Il sourit tristement.

« Cinq cents ans, » dit-il. Sa voix est un murmure qui remplit pourtant la salle entière. « Cinq cents ans que j'attends sur ce trône, gardien d'une prison qui est devenue ma propre cage. Cinq cents ans à entendre SES murmures, à sentir SA douleur, à porter le poids du monde sur des épaules qui n'en pouvaient déjà plus le premier jour. »

Il se lève enfin. La salle tremble. L'armure de cendres pulse d'énergie.

« Je n'ai pas choisi d'être le méchant de cette histoire. J'ai choisi d'être le héros. Le problème... c'est que personne ne m'a dit combien de temps ça durerait. »

Il tend la main. Des cendres tourbillonnent, formant une lame immense, noire comme le vide, crépitant d'énergie verte.

« Alors battez-moi. Brisez mes chaînes. Ou mourez ici, et prenez ma place. C'est la seule issue que le Nexus offre. »

Derrière vous, Maestra Selyne commence à préparer le Rituel. Sa voix s'élève en incantation ashkan archaïque. Vous devez tenir. Dix minutes. Dix minutes pour sauver le monde.

L'Archon Malachar lève sa lame.

Le combat final commence.`,
        mood: "Culmination épique, tragédie et grandeur, le poids de l'histoire",
        music: "Orchestre complet fortissimo, choeur dramatique, percussions de guerre, thème du méchant en mineur",
      },
      gmNotes: [
        { type: 'warning', text: "C'est LE combat final. Il doit être mémorable, difficile, et émotionnellement chargé. Malachar combat en trois phases. Chaque phase change ses tactiques, son apparence et la salle elle-même. Utilisez un timer réel de 10 minutes pour le Rituel - ça ajoute une tension incroyable." },
        { type: 'info', text: "Phase 1 (800-500 PV) : Malachar combat avec honneur, un contre un si possible. Phase 2 (500-200 PV) : La corruption prend le dessus, Malachar devient bestial et invoque des cendres. Phase 3 (200-0 PV) : L'Entité commence à se réveiller, le Nexus tremble, Malachar reprend sa lucidité et combat avec désespoir." },
        { type: 'tip', text: "Si les joueurs montrent le Médaillon de Lyria, Malachar perd un tour complet et sa CA baisse de 3 pour le reste du combat. C'est un moment narratif puissant - décrivez les larmes qui coulent sur le visage de cendres." },
        { type: 'secret', text: "Il est possible de sauver Malachar. Si les joueurs le réduisent à 0 PV SANS le tuer (dégâts non-létaux, CD 65 Médecine pour stabiliser la corruption, ou un sort de Restauration Supérieure), il peut être racheté. Cela affecte la fin de manière majeure." },
        { type: 'lore', text: "La Lame de Cendres de Malachar est en réalité son ancienne épée héroïque, Aube-d'Or, corrompue par cinq siècles de contact avec la magie des Sceaux. Si elle est purifiée (ce qui nécessite le Rituel), elle redevient l'une des armes les plus puissantes jamais forgées." },
        { type: 'tip', text: "Le Rituel de Selyne progresse en arrière-plan. Tous les 2 rounds, décrivez un changement : lumière qui pulse, runes qui s'allument, voix qui résonnent. Au round 8, Selyne crie qu'il lui faut un sacrifice - un souvenir cher. Un joueur doit sacrifier un souvenir (choix narratif) pour compléter le Rituel." },
      ],
      encounter: {
        name: "L'Archon Malachar - Combat Final en Trois Phases",
        enemies: [
          { name: "Archon Malachar (Phase 1 - Le Gardien)", hp: 800, atk: 45, ac: 28, cr: 23, abilities: [
            "Lame de Cendres (4d12+18 nécrotique + 2d8 feu)",
            "Parade du Gardien (réaction, +6 CA contre une attaque)",
            "Frappe Héroïque (action bonus, 3d10 radiant - vestige de son ancienne puissance)",
            "Aura de Cendres (15ft, 2d6 nécrotique au début du tour de chaque créature dans la zone)",
            "Résistance aux sorts (avantage sur les jets de sauvegarde contre la magie)",
            "Régénération du Nexus (20 PV par round tant qu'au moins un Sceau reste faible)",
          ]},
          { name: "Archon Malachar (Phase 2 - La Corruption / 500 PV)", hp: 500, atk: 50, ac: 25, cr: 25, abilities: [
            "Lame de Cendres Éveillée (5d12+20 nécrotique + 3d8 feu)",
            "Tempête de Cendres (zone 30ft, 6d8 nécrotique, CD 60 Constitution pour moitié)",
            "Invocation de Serviteurs de Cendres (2 élémentaires de cendres, 80 PV, 20 atk, 16 CA chacun)",
            "Absorption de Vie (touche = 4d10 nécrotique ET soigne Malachar du même montant)",
            "Corruption Progressive (chaque round, un objet magique aléatoire porté par un héros perd temporairement ses propriétés - CD 55 Charisme pour résister)",
            "Forme de Cendres (peut se dissoudre et se reformer n'importe où dans la salle, 1/round)",
          ]},
          { name: "Archon Malachar (Phase 3 - Le Héros Brisé / 200 PV)", hp: 200, atk: 40, ac: 22, cr: 22, abilities: [
            "Aube-d'Or Vacillante (alternance : 4d12 radiant OU 4d12 nécrotique selon les rounds - la lame hésite entre corruption et pureté)",
            "Cri du Gardien (tous les ennemis dans 60ft : CD 58 Sagesse ou Paralysé 1 round)",
            "Dernier Rempart (quand sous 100 PV, CA monte à 26 et gagne résistance à tous les dégâts)",
            "Supplication (Phase 3 uniquement : Malachar peut parler pendant le combat, révélant la vérité sur l'Entité et suppliant les héros de le libérer)",
            "Sacrifice du Gardien (à 0 PV : Malachar tente un dernier acte - soit une explosion de 10d10 nécrotique dans 30ft si corrompu, soit il stabilise les Sceaux avec son dernier souffle si racheté)",
          ]},
        ],
        terrain: [
          "Salle cathédrale circulaire, 60m de diamètre, voûtes à 40m",
          "Sol-miroir : reflète le gouffre, vertige possible (Sagesse CD 45 la première fois)",
          "Trône de cendres au centre : couverture totale, mais se désintègre en Phase 2",
          "Piliers de cristal noir (8) : couverture partielle, peuvent être détruits (50 PV) - leur destruction fragilise le Nexus",
          "Zone du Rituel (nord de la salle) : Selyne y travaille, protégée par un cercle de runes - si une attaque touche le cercle, le Rituel recule de 1 round",
          "Fissures dans le sol : en Phase 3, le sol se craquelle, révélant le gouffre - tomber = chute de 30m avant qu'un pont de cendres ne se forme (5d6 contondant)",
          "Lueur des Sceaux : les piliers de lumière dorée offrent un bonus de +2 aux jets de sauvegarde dans un rayon de 3m",
        ],
        tactics: "Phase 1 : Malachar combat comme un duelliste noble, ciblant le guerrier le plus fort. Il épargne les lanceurs de sorts qui ne l'attaquent pas. Phase 2 : La corruption domine, Malachar devient un prédateur, ciblant les soigneurs et les plus faibles. Il invoque des serviteurs pour harceler Selyne. Phase 3 : Malachar retrouve sa lucidité par moments, alternant entre attaques désespérées et suppliques. Il cible le cercle du Rituel en dernier recours.",
        loot: [
          "Aube-d'Or purifiée (épée longue légendaire +4, 3d8 radiant, une fois par jour : Lumière de l'Aube - zone 60ft, 8d10 radiant aux morts-vivants et fiélons, soigne les alliés de 4d10)",
          "Couronne Brisée de Malachar (circlet légendaire, +3 à toutes les caractéristiques mentales, peut lancer Domination 1/jour, mais chaque utilisation risque 10% de corruption)",
          "Cendres du Gardien (composante de sort ultimes, valeur inestimable)",
          "Armure de Cendres Vivantes (armure lourde légendaire, CA 20, résistance nécrotique et feu, régénération 10 PV/round, mais murmure constamment)",
        ],
      },
      npcs: [ARCHON_MALACHAR, MAESTRA_SELYNE],
      choices: [
        {
          id: 'choice-malachar-fin',
          prompt: "Que font les héros quand Malachar tombe à 0 PV ?",
          options: [
            {
              label: "L'achever avec miséricorde",
              description: "Mettre fin à cinq siècles de souffrance d'un coup propre.",
              consequence: "Malachar meurt en paix. Son corps se dissout en cendres dorées. Le Rituel peut se compléter normalement. Fin héroïque classique possible.",
              nextScene: 'scene-5-12-4',
            },
            {
              label: "Tenter de le sauver",
              description: "Utiliser la magie, la médecine, ou la compassion pour purifier la corruption.",
              consequence: "Jet de Médecine CD 65 ou Restauration Supérieure. Succès : Malachar est purifié, affaibli mais vivant. Il aide à compléter le Rituel. Échec : la corruption explose (8d10 nécrotique dans 30ft).",
              nextScene: 'scene-5-12-4',
              skillCheck: { skill: 'Médecine', dc: 65, success: "Vos mains tremblent, mais votre coeur est sûr. La corruption se retire comme une marée, laissant un homme brisé mais vivant. Les yeux de Malachar passent du vert à un bleu profond. « Lyria ? » murmure-t-il. « Non... non. Merci. Merci de m'avoir ramené. »", failure: "La corruption résiste. Elle se cabre, violente, et explose vers l'extérieur en une vague de destruction. Malachar hurle de douleur alors que les derniers vestiges de son humanité sont consumés." },
            },
            {
              label: "Lui montrer le Médaillon de Lyria",
              description: "Offrir un dernier souvenir de la femme qu'il aimait avant sa chute.",
              consequence: "Malachar saisit le médaillon. Il pleure. La corruption se fissure d'elle-même. Il meurt en murmurant le nom de Lyria, mais son sacrifice volontaire renforce les Sceaux (+10 au jet final du Rituel).",
              nextScene: 'scene-5-12-4',
            },
            {
              label: "Le laisser choisir",
              description: "Poser la lame devant lui et le laisser décider de son propre sort.",
              consequence: "Malachar prend l'épée. Un long silence. Puis il la retourne et se poignarde lui-même, utilisant son essence vitale pour alimenter les Sceaux. L'acte le plus héroïque de sa longue vie, cinq cents ans trop tard. Rituel automatiquement réussi.",
              nextScene: 'scene-5-12-4',
            },
          ],
        },
      ],
      nextScenes: ['scene-5-12-4'],
      previousScene: 'scene-5-12-2',
    },
    // --- Scène 4 : Le Grand Rituel et la Révélation ---
    {
      id: 'scene-5-12-4',
      sceneNumber: 4,
      title: "Le Grand Rituel",
      type: 'revelation',
      location: "Nexus des Sceaux - L'Antichambre du Destin",
      locationId: 'nexus-sceaux',
      estimatedMinutes: 40,
      readAloud: {
        text: `Le combat est terminé. Le silence qui suit est assourdissant.

Maestra Selyne se tient au centre de l'Antichambre, devant l'autel de cristal blanc. Les cinq Sceaux brillent dans leurs alcôves - les trois qui étaient faibles restaurés par le combat, les deux que vous avez rallumés pulsant d'une lumière neuve. Pour la première fois depuis des siècles, le Nexus tout entier baigne dans une lumière dorée.

« C'est l'heure, » dit Selyne. Sa voix est calme, mais ses mains tremblent. « Le Rituel des Sceaux. La magie la plus ancienne, la plus puissante, et la plus dangereuse jamais conçue. » Elle vous regarde. « J'ai besoin de vous. De votre volonté, de votre coeur, de votre lumière. Tenez-vous dans les alcôves et ouvrez votre esprit. »

L'incantation commence. Les mots ashkan archaïques résonnent dans le cristal, chaque syllabe faisant vibrer la structure entière du Nexus. Les Sceaux répondent, leur lumière s'intensifiant en vagues synchronisées. Le sol-miroir reflète non plus le gouffre, mais un ciel étoilé infini.

Et puis... vous la sentez.

L'Entité.

Elle ne surgit pas. Elle ne menace pas. Elle... est. Comme le sol sous vos pieds, comme l'air dans vos poumons. Une présence si vaste que votre esprit ne peut en percevoir que l'ombre d'une fraction. Des yeux sans nombre s'ouvrent dans le ciel étoilé sous vos pieds. Une voix qui est toutes les voix résonne dans vos crânes.

« ENFIN. APRÈS SI LONGTEMPS. QUELQU'UN QUI ÉCOUTE AU LIEU DE CRAINDRE. »

La voix est douce. Triste. Immensément ancienne. Et dans cette voix, vous entendez la vérité : l'Entité n'est pas maléfique. Elle est le rêve originel dont Aethelgard est né. Le monde est son imagination devenue réelle. Et les Sceaux l'ont coupée de son propre rêve, la laissant seule dans le vide, tandis que le rêve pourrit sans son rêveur.

Selyne vacille. « Je... je ne savais pas. Personne ne savait. » Elle se tourne vers vous, les yeux emplis de larmes. « Le Rituel peut sceller les Sceaux pour toujours, la coupant définitivement. Ou il peut les ouvrir, la libérant dans le monde. Ou... » Elle hésite. « Ou il peut créer un Nouveau Pacte. Un lien volontaire entre l'Entité et le monde, où elle rêve et nous vivons, ensemble. »

Le choix le plus important de la campagne entière.`,
        mood: "Révélation cosmique, émerveillement, gravité absolue du choix",
        music: "Silence, puis choeur angélique, harmoniques impossibles, harpe cristalline",
      },
      gmNotes: [
        { type: 'warning', text: "CE CHOIX DÉTERMINE LA FIN DE LA CAMPAGNE. Laissez les joueurs discuter aussi longtemps qu'ils le souhaitent. Ne les pressez pas. C'est le moment pivot de toute l'histoire." },
        { type: 'info', text: "Les trois options : 1) Sceller (fin bittersweet - monde sauvé mais mutilé), 2) Libérer (fin risquée - monde transformé, potentiellement meilleur ou pire), 3) Nouveau Pacte (fin idéale mais nécessite un sacrifice). Voir Chapitre 13 pour les détails de chaque fin." },
        { type: 'secret', text: "Il existe une quatrième option : si Malachar a été sauvé, il propose de redevenir le Gardien, mais cette fois volontairement, avec la compassion au lieu de la peur. Cela crée une fin secrète unique." },
        { type: 'tip', text: "L'Entité ne ment pas et ne manipule pas. Si les joueurs l'interrogent, elle répond honnêtement - mais ses réponses sont celles d'un être qui ne comprend pas la mortalité. 'QU'EST-CE QUE LA MORT ? VOUS CHANGEZ DE FORME, C'EST TOUT. JE NE COMPRENDS PAS POURQUOI CELA VOUS EFFRAYE.'" },
        { type: 'lore', text: "Le Nouveau Pacte est la solution que les Ashka originels avaient envisagée avant que la corruption ne dévie leur civilisation. C'est un retour au plan originel : un monde où la magie est l'imagination de l'Entité, partagée librement avec les mortels." },
      ],
      npcs: [MAESTRA_SELYNE, ENTITE],
      choices: [
        {
          id: 'choice-rituel-final',
          prompt: "Le Grand Rituel est prêt. Quel sera le destin d'Aethelgard ?",
          options: [
            {
              label: "Sceller les Sceaux pour toujours",
              description: "Renforcer les Sceaux définitivement. L'Entité sera coupée du monde pour l'éternité.",
              consequence: "Le monde est sauvé, mais la magie s'affaiblit lentement. En quelques générations, elle disparaîtra. Fin bittersweet : sécurité au prix de l'émerveillement.",
              nextScene: 'scene-5-13-1',
              skillCheck: { skill: 'Arcanes', dc: 55, success: "Les Sceaux se verrouillent avec un claquement qui résonne dans toute la réalité. L'Entité pousse un cri silencieux qui brise le coeur. Mais le monde tient.", failure: "Les Sceaux se verrouillent, mais imparfaitement. La magie décline plus vite que prévu. Le monde est sauvé, mais le prix sera plus lourd." },
            },
            {
              label: "Libérer l'Entité",
              description: "Briser les Sceaux et laisser l'Entité libre dans le monde qu'elle a rêvé.",
              consequence: "Le monde est transformé. La magie explose en puissance. La réalité devient plus fluide, plus belle, mais aussi plus dangereuse. Fin audacieuse : un monde nouveau, imprévisible.",
              nextScene: 'scene-5-13-1',
              skillCheck: { skill: 'Sagesse', dc: 60, success: "L'Entité émerge avec douceur, comme un souffle printanier. Le monde change - la couleur devient plus vive, la musique résonne spontanément, les rêves prennent forme. Beau et terrifiant.", failure: "L'Entité émerge trop vite. La réalité se tord. Des jours de chaos s'ensuivent avant que l'Entité ne stabilise le monde. Des dégâts considérables." },
            },
            {
              label: "Le Nouveau Pacte",
              description: "Créer un lien volontaire entre l'Entité et le monde. Mais un gardien mortel doit servir de pont.",
              consequence: "Un héros doit volontairement devenir le Gardien du Pacte - un lien permanent avec l'Entité. Le monde est sauvé ET la magie perdure. Mais le Gardien ne sera plus jamais entièrement mortel.",
              nextScene: 'scene-5-13-1',
              skillCheck: { skill: 'Constitution', dc: 65, success: "Le lien se forme. C'est comme être frappé par la foudre et bercé par une berceuse en même temps. Le Gardien sent l'Entité, vaste et douce, s'installer dans un coin de son esprit. Le monde exhale un soupir de soulagement.", failure: "Le lien se forme mais la douleur est atroce. Le Gardien perd 4 points de Constitution permanents. Le Pacte fonctionne, mais le prix est plus lourd." },
            },
            {
              label: "Le Sacrifice de Malachar (si sauvé)",
              description: "Malachar reprend sa place de Gardien, cette fois par choix et avec compassion.",
              consequence: "Malachar redevient le Gardien, mais purifié. L'Entité et lui trouvent un équilibre. Le monde est sauvé, la magie perdure, et aucun héros n'a besoin de se sacrifier. La fin secrète - la rédemption parfaite.",
              nextScene: 'scene-5-13-1',
            },
          ],
        },
      ],
      skillChecks: [
        { skill: 'Arcanes', dc: 50, success: "Vous comprenez la mécanique profonde du Rituel. Vous pouvez guider Selyne, réduisant la difficulté de tous les jets du Rituel de 5.", failure: "Le Rituel reste opaque. Vous faites confiance à Selyne et espérez que ça suffise." },
      ],
      nextScenes: ['scene-5-13-1'],
      previousScene: 'scene-5-12-3',
    },
  ],
};

// ============================================================================
// CHAPITRE 13 : ÉPILOGUE - L'AUBE SE LÈVE
// ============================================================================

const CHAPTER_13: BookChapter = {
  id: 'ch-5-13',
  actNumber: 5,
  chapterNumber: 13,
  title: "Épilogue - L'Aube Se Lève",
  subtitle: "Les conséquences du choix final et l'avenir d'Aethelgard",
  summary: "L'épilogue de la campagne. Selon les choix des joueurs tout au long de l'aventure, le monde d'Aethelgard connaît des fins très différentes. Ce chapitre couvre les multiples conclusions possibles, les destins des PNJ majeurs, et les scènes d'adieu.",
  levelRange: "20",
  themes: ['héritage', 'espoir', 'fin et commencement', 'conséquences'],
  chapterIntro: {
    text: `Le Rituel est accompli.

Le Nexus vibre une dernière fois, un son qui n'est ni un craquement ni un chant, mais quelque chose entre les deux - le son d'un monde qui change d'axe. Les Sceaux brillent de mille feux, puis s'éteignent un par un, ou pulsent d'une lumière nouvelle, selon ce que vous avez choisi.

L'Entité murmure un dernier mot - un mot qui n'existe dans aucune langue, mais que chacun de vous comprend parfaitement. Il signifie à la fois « merci », « pardon » et « bienvenue ».

Puis le silence.

Et dans ce silence, quelque chose de merveilleux se produit.

L'aube se lève.

Pas au-dessus du Nexus - le ciel des Terres Brûlées ne connaît pas le soleil. Mais au loin, au nord, par-delà la Barrière de Cendres qui se dissout lentement, le ciel rougit. Un trait de lumière dorée perce l'horizon, premier rayon d'un nouveau jour, d'un nouveau monde.

L'armée, qui attendait le résultat en retenant son souffle, voit la lumière. Un cri monte - pas un cri de guerre, mais un cri de joie, brut, pur, le son de vingt mille coeurs qui osent enfin espérer.

La campagne est terminée. L'histoire commence.`,
    mood: "Catharsis, lumière après les ténèbres, nouvelle aube",
    music: "Silence, puis un seul instrument (hautbois ou violon) jouant un thème d'espoir, crescendo orchestral lent",
  },
  chapterConclusion: {
    text: `Des années passent. Le monde guérit, à sa manière, à son rythme.

Dans les tavernes d'Aethelgard, on raconte l'histoire. Chaque barde la chante différemment. Chaque conteur ajoute un détail, embellit un moment, transforme les héros en légendes. Certaines versions sont fidèles. D'autres sont meilleures que la vérité. Toutes sont vraies, à leur façon.

Au Sanglier Doré, Brok a réservé une table. Elle est toujours libre, toujours mise, avec une bouteille de son meilleur vin. Au-dessus, un panneau gravé à la main :

« Réservé aux Héros d'Aethelgard. Premier verre gratuit. Les suivants au prix fort. »

Personne n'ose s'y asseoir. Sauf une fois par an, le jour anniversaire de la Bataille du Nexus, quand des silhouettes familières poussent la porte, s'installent, et racontent ce qui s'est vraiment passé.

Et dehors, l'aube se lève. Comme toujours. Comme elle le fera toujours.

Merci d'avoir joué.`,
    mood: "Gratitude, conclusion douce, éternité de l'histoire",
    music: "Thème principal de la campagne, version acoustique intime, fin en fondu",
  },
  rewards: { xp: 100000, gold: "Richesse légendaire", items: ["Titre permanent : Héros d'Aethelgard", "Propriétés, titres et terres selon les fins", "Artefact de campagne unique selon le choix du Rituel"] },
  scenes: [
    // --- Scène 1 : Les Fins ---
    {
      id: 'scene-5-13-1',
      sceneNumber: 1,
      title: "Le Lendemain du Monde",
      type: 'narration',
      location: "Nexus des Sceaux / Camp de l'Alliance",
      locationId: 'nexus-sceaux',
      estimatedMinutes: 30,
      readAloud: {
        text: `Vous émergez du Nexus dans la lumière de l'aube.

Le chemin qui vous ramène vers la surface est plus facile qu'à l'aller. Le cristal noir du Nexus n'est plus hostile - il semble presque accueillant, comme un vieil ennemi devenu ami. Les runes sur les murs ne pulsent plus de vert maladif. Elles brillent doucement, régulièrement, comme les étoiles dans un ciel clair.

Dehors, le monde a changé. Même les Terres Brûlées semblent différentes. Le verre noir sous vos pieds craque différemment - moins comme de la mort, plus comme de la glace au printemps. Ici et là, impossible mais indéniable, de minuscules pousses vertes percent la surface. De l'herbe. Dans les Terres Brûlées. Pour la première fois en cinq cents ans.

L'armée vous attend. Vingt mille visages tournés vers vous, vingt mille souffles retenus. Puis quelqu'un vous voit. Un cri. Puis un autre. Puis le rugissement.

La Reine Elara marche vers vous, son armure dorée couverte de poussière et de sang séché. Ses yeux cherchent dans les vôtres la réponse à la seule question qui compte. Vous n'avez même pas besoin de parler. Elle voit. Elle sait.

Elle prend votre main, la lève vers le ciel, et prononce un mot qui porte plus loin que n'importe quelle magie :

« Victoire. »`,
        mood: "Catharsis, joie mêlée d'épuisement, aube d'un monde nouveau",
        music: "Fanfare triomphale, choeur montant, cloches",
      },
      gmNotes: [
        { type: 'info', text: "Cette scène est commune à toutes les fins. Adaptez les détails selon le choix du Rituel : si les Sceaux sont scellés, la lumière est douce mais mélancolique. Si l'Entité est libérée, le ciel est extraordinairement vivant. Si le Nouveau Pacte est fait, l'équilibre est palpable." },
        { type: 'tip', text: "Laissez chaque joueur décrire ce que son personnage fait en sortant du Nexus. Certains embrasseront des proches, d'autres s'effondreront, d'autres regarderont le ciel en silence. Ce sont leurs moments." },
        { type: 'warning', text: "Si un personnage a été sacrifié pendant le Rituel (Nouveau Pacte, etc.), ce moment est crucial. Le groupe sort... avec un absent. Décrivez le vide. Laissez le deuil s'installer avant la joie." },
        { type: 'secret', text: "Si les joueurs ont choisi la fin secrète (Malachar racheté), il les accompagne dehors. L'armée recule d'abord de terreur, puis Elara reconnaît dans les yeux bleus retrouvés de Malachar l'homme qu'elle a étudié dans les livres d'histoire. Le premier champion d'Aethelgard est de retour." },
      ],
      npcs: [REINE_ELARA],
      nextScenes: ['scene-5-13-2'],
      previousScene: 'scene-5-12-4',
    },
    // --- Scène 2 : Destins des PNJ ---
    {
      id: 'scene-5-13-2',
      sceneNumber: 2,
      title: "Les Fils du Destin",
      type: 'social',
      location: "Camp de l'Alliance / Route du retour",
      locationId: 'camp-alliance-retour',
      estimatedMinutes: 40,
      readAloud: {
        text: `Les jours qui suivent la victoire sont un mélange étrange de célébration et de deuil. L'armée campe aux abords des Terres Brûlées, soignant ses blessés, pleurant ses morts, et buvant à la santé des vivants.

Un par un, vos compagnons de voyage viennent vous trouver. Pas pour des adieux - pas encore. Pour des promesses. Pour des rires. Pour les petits moments vrais qui font une vie.

Le camp bruisse de mille histoires qui se racontent autour des feux. Chaque soldat a sa version de la bataille, chaque blessé sa cicatrice à montrer. Les bardes composent déjà des chansons - certaines héroïques, d'autres comiques, toutes imparfaites et toutes parfaites.

C'est le moment de voir ce que le monde que vous avez sauvé devient. C'est le moment de découvrir ce que vos choix ont semé, et ce qui pousse.`,
        mood: "Douce mélancolie, gratitude, liens humains",
        music: "Luth et flûte, mélodies folk, rires lointains, feu de camp",
      },
      gmNotes: [
        { type: 'info', text: "Cette scène est un montage d'adieux et de résolutions. Faites défiler les PNJ majeurs un par un. Chaque PNJ a un destin différent selon les relations construites avec les joueurs." },
        { type: 'tip', text: "Adaptez chaque vignette de PNJ aux actions des joueurs. Un PNJ bien traité est reconnaissant et prospère. Un PNJ maltraité peut être amer, absent ou mort. C'est le reflet fidèle des choix de la campagne." },
        { type: 'secret', text: "Si l'Entité a été libérée, certains PNJ développent des capacités magiques spontanées. La magie se démocratise. Brok peut accidentellement enflammer son ragoût avec un sort de feu involontaire." },
        { type: 'lore', text: "La tradition veut que les héros d'une grande bataille reçoivent un don de chaque faction alliée. Les joueurs peuvent recevoir des terres, des titres, des artefacts ou simplement une poignée de main et un 'merci' sincère - selon les factions." },
        { type: 'warning', text: "N'expédiez pas cette scène. Les joueurs ont investi des dizaines d'heures dans ces personnages et ces relations. Chaque adieu mérite du temps et de l'attention." },
      ],
      npcs: [
        {
          name: "Brok le Tavernier",
          role: "Ami fidèle / Tavernier",
          personality: "Émotif sous une épaisse couche de bourru. Les larmes coulent dans sa moustache.",
          appearance: "Sale, fatigué, radieux. Il tient une marmite dans chaque main et a un sourire de travers qu'on ne lui avait jamais vu.",
          dialogues: {
            greeting: "« J'ai fait la cuisine pendant une bataille. Une vraie bataille. Avec des épées et des monstres. Et vous savez quoi ? Le ragoût était excellent. Le stress améliore la cuisine. »",
            info: "« Le Sanglier Doré va devenir le lieu le plus célèbre d'Aethelgard. Je vais devoir agrandir. Peut-être même nettoyer les toilettes. Les temps changent. »",
            quest: "« Quand vous voulez, la table est là. Votre table. Gravée à votre nom. Et si je ne suis plus là quand vous revenez, mon fils saura. Tout le monde saura. »",
            farewell: "« Bon. Filez. Allez sauver d'autres mondes ou je ne sais quoi. Et revenez affamés. C'est tout ce que je demande. »",
          },
        },
        {
          name: "L'Ombre",
          role: "Chef du Syndicat / Allié improbable",
          personality: "Sardonic as always, but with a new respect in his voice. He's already planning.",
          appearance: "Toujours masqué, toujours dans l'ombre. Mais son posture est plus détendue. Moins un prédateur, plus un chat satisfait.",
          dialogues: {
            greeting: "« Ne vous attendez pas à ce que je devienne honnête. La fin du monde a été mauvaise pour les affaires, mais la reconstruction sera excellente. »",
            info: "« Je vais restructurer le Syndicat. Moins de meurtres, plus de commerce d'information. C'est plus rentable et ça tache moins les vêtements. »",
            quest: "« Si vous avez besoin de quelque chose - quelque chose que les voies officielles ne peuvent pas fournir - vous savez où me trouver. Enfin, non, vous ne savez pas. C'est le principe. Mais je vous trouverai, moi. »",
            farewell: "« Adieu est un mot de gens honnêtes. Je préfère 'à la prochaine'. C'est plus... versatile. »",
          },
        },
        {
          name: "Sergent Dorval (devenu Capitaine)",
          role: "Garde / Vétéran de la Bataille du Nexus",
          personality: "Toujours fatigué. Mais fier. Son fils a été retrouvé vivant parmi les prisonniers du Cercle.",
          appearance: "Nouveau tabard de capitaine, même moustache tombante, même air excédé. Mais les yeux sont plus doux.",
          dialogues: {
            greeting: "« Capitaine Dorval. Promu sur le champ de bataille. Comme si j'avais besoin de plus de paperasse. »",
            info: "« Mon fils est vivant. Prisonnier du Cercle pendant des mois, mais vivant. C'est... c'est grâce à vous. Vous avez brisé le Cercle et il a pu s'échapper. Je ne sais pas comment... merci. Voilà. »",
            quest: "« La ville aura besoin de protection pendant la reconstruction. Si jamais l'aventure vous lasse et que vous voulez un travail honnête... non, oubliez ça. Vous n'êtes pas le type à rester en place. »",
            farewell: "« Noms, origines, motif de la visite. Non, je plaisante. Passez, Héros. Passez quand vous voulez. La porte est toujours ouverte. »",
          },
        },
      ],
      choices: [
        {
          id: 'choice-apres-victoire',
          prompt: "Que font les héros après la victoire ?",
          options: [
            {
              label: "Rester et reconstruire",
              description: "S'installer à Sol-Aureus et aider à la reconstruction du monde.",
              consequence: "Les héros deviennent des figures de la société. Terres, titres, responsabilités. Une nouvelle vie, moins dangereuse mais tout aussi significative.",
              nextScene: 'scene-5-13-3',
            },
            {
              label: "Repartir à l'aventure",
              description: "Le monde est sauvé, mais il y a toujours des horizons à explorer.",
              consequence: "Les héros reprennent la route. Le monde est plein de merveilles nouvelles - surtout si l'Entité a été libérée. De nouvelles terres, de nouvelles magies, de nouvelles histoires.",
              nextScene: 'scene-5-13-3',
            },
            {
              label: "Se séparer en paix",
              description: "Chaque héros emprunte son propre chemin, emportant les souvenirs partagés.",
              consequence: "Des adieux émouvants. Chaque personnage a un épilogue individuel. Ils se retrouveront - pas toujours, pas souvent, mais aux moments qui comptent.",
              nextScene: 'scene-5-13-3',
            },
            {
              label: "Disparaître dans la légende",
              description: "Les héros s'en vont sans un mot, laissant le monde se demander ce qu'ils sont devenus.",
              consequence: "Les légendes grandissent en l'absence. Les héros deviennent mythiques. Certains disent les avoir vus ici ou là. Personne ne sait la vérité. Et c'est mieux ainsi.",
              nextScene: 'scene-5-13-3',
            },
          ],
        },
      ],
      nextScenes: ['scene-5-13-3'],
      previousScene: 'scene-5-13-1',
    },
    // --- Scène 3 : Les Quatre Fins ---
    {
      id: 'scene-5-13-3',
      sceneNumber: 3,
      title: "Le Monde d'Après",
      type: 'narration',
      location: "Aethelgard - Le monde entier",
      locationId: 'aethelgard',
      estimatedMinutes: 25,
      readAloud: {
        text: `Les saisons passent. Le monde respire à nouveau, mais différemment selon le chemin que vous avez choisi.

Quelle que soit la fin, une chose est certaine : le monde ne sera plus jamais le même. Et c'est peut-être la plus grande victoire de toutes. Non pas que le monde soit parfait, mais qu'il ait la chance de changer, de grandir, de devenir quelque chose de nouveau.

Les Terres Brûlées guérissent - lentement, sur des décennies, mais les premières forêts poussent déjà là où rien n'avait poussé depuis cinq siècles. Des villes nouvelles se fondent sur les ruines d'Ashka, bâties non plus sur la peur et la domination, mais sur la curiosité et l'espoir.

Et partout, dans chaque foyer, dans chaque taverne, dans chaque école de magie et chaque caserne de soldats, on raconte votre histoire. L'histoire de ceux qui ont marché vers la fin du monde et en sont revenus avec l'aube dans les mains.`,
        mood: "Contemplation, passage du temps, héritage",
        music: "Thème principal, variation douce et majeure, fin ouverte",
      },
      gmNotes: [
        { type: 'info', text: "Lisez le texte approprié selon la fin choisie (voir les sous-sections ci-dessous). Chaque fin a son propre paragraphe de conclusion. Adaptez librement selon les événements uniques de votre campagne." },
        { type: 'tip', text: "FIN PARFAITE (Sceaux restaurés sans sacrifice majeur + Malachar racheté) : Le monde est en paix, la magie perdure, Malachar est un mentor respecté. Sol-Aureus brille. Les héros sont célébrés chaque année au Festival de l'Aube." },
        { type: 'tip', text: "FIN BITTERSWEET (Sceaux scellés) : Le monde est sauvé mais la magie décline. Les mages sentent leur pouvoir faiblir. En quelques générations, la magie sera un souvenir. Mais les gens sont libres, et c'est ce qui compte." },
        { type: 'tip', text: "FIN SOMBRE (Entité libérée + échecs au Rituel) : Le monde est transformé radicalement. La réalité est fluide, dangereuse, magnifique. Les rêves prennent forme, les cauchemars aussi. C'est un monde de merveilles et de terreurs - un monde qui a besoin de héros plus que jamais." },
        { type: 'tip', text: "FIN SECRÈTE (Nouveau Pacte réussi) : Le monde est en harmonie avec l'Entité. La magie est partout, naturelle, douce. Le Gardien du Pacte (le héros ou Malachar) veille en rêve. C'est la meilleure fin possible - mais elle a été gagnée par la compassion, pas par la force." },
        { type: 'warning', text: "Ne jugez AUCUNE fin comme 'mauvaise'. Chaque conclusion est le résultat des choix des joueurs et a sa propre beauté. La fin sombre est passionnante, la fin bittersweet est poignante, la fin parfaite est satisfaisante, la fin secrète est sublime." },
        { type: 'lore', text: "Le monde d'Aethelgard continue au-delà de cette campagne. Quelle que soit la fin, des suites sont possibles : dans un monde sans magie, des héros non-magiques doivent résoudre des problèmes par l'ingéniosité. Dans un monde transformé, de nouvelles menaces cosmiques émergent. Dans un monde en paix, la politique et l'intrigue prennent le relais." },
      ],
      nextScenes: ['scene-5-13-4'],
      previousScene: 'scene-5-13-2',
    },
    // --- Scène 4 : Épilogue Personnel ---
    {
      id: 'scene-5-13-4',
      sceneNumber: 4,
      title: "Votre Histoire",
      type: 'narration',
      location: "Variable selon chaque personnage",
      locationId: 'epilogue-personnel',
      estimatedMinutes: 30,
      readAloud: {
        text: `Et vous ?

Qu'est devenu le héros qui a marché dans les cendres et en est ressorti avec la lumière ? Qu'est devenue la main qui a touché l'impossible et a choisi son destin ?

L'histoire d'Aethelgard est écrite. Mais la vôtre continue. Elle continue dans chaque choix que vous faites, chaque main que vous tendez, chaque aube que vous choisissez de regarder en face.

Parce que c'est ça, être un héros. Pas les épées, pas la magie, pas les monstres vaincus. C'est le choix de se lever chaque matin et de décider que le monde mérite d'être sauvé. Encore. Toujours.

Alors, héros d'Aethelgard... quelle sera votre prochaine histoire ?`,
        mood: "Intime, personnel, invitation à continuer",
        music: "Thème personnel de chaque joueur (s'il en a un), sinon silence respectueux",
      },
      gmNotes: [
        { type: 'info', text: "Demandez à CHAQUE joueur de décrire l'épilogue de son personnage. Où va-t-il ? Que fait-il ? Qui aime-t-il ? Comment vieillit-il ? C'est leur moment - le MJ écoute et pose des questions, rien de plus." },
        { type: 'tip', text: "Suggestions d'épilogues : le guerrier ouvre une école de combat, le mage fonde une académie, le roublard crée un réseau de renseignement bienveillant, le clerc construit un temple. Ou ils font quelque chose de complètement inattendu - c'est le joueur qui décide." },
        { type: 'secret', text: "Après que tous les joueurs ont décrit leur épilogue, lisez un dernier paragraphe : 'Des années plus tard, au Sanglier Doré, une table est toujours réservée. Et une fois par an, à l'anniversaire de la Bataille du Nexus, des silhouettes familières poussent la porte. Certaines plus vieilles, certaines plus sages, toutes portant les cicatrices et les sourires d'une aventure qu'aucun barde ne racontera jamais tout à fait correctement. Brok pose la bouteille. Le premier verre est gratuit. Les suivants au prix fort. Et l'histoire recommence.'" },
        { type: 'warning', text: "Remerciez les joueurs. Sérieusement. Une campagne de cette envergure est un investissement émotionnel et temporel énorme. Reconnaissez-le." },
        { type: 'lore', text: "Si les joueurs veulent continuer : le monde d'Aethelgard a encore des secrets. L'Entité avait des frères. D'autres continents existent. Le passé d'Ashka cache des mystères non résolus. Et le prochain chapitre de l'histoire attend d'être écrit." },
      ],
      choices: [
        {
          id: 'choice-epilogue-personnel',
          prompt: "Chaque héros choisit son avenir.",
          options: [
            {
              label: "Le repos du guerrier",
              description: "Se retirer, fonder un foyer, vivre en paix.",
              consequence: "Le personnage trouve la paix. Des enfants, peut-être. Un jardin. Le bruit des épées remplacé par le rire. Mais la table au Sanglier Doré reste réservée.",
              nextScene: 'scene-5-13-5',
            },
            {
              label: "Le devoir continu",
              description: "Devenir un protecteur, un enseignant, un guide pour la prochaine génération.",
              consequence: "Le personnage forme les héros de demain. Son nom devient synonyme de sagesse. Ses élèves le dépasseront un jour - et c'est la plus grande victoire de toutes.",
              nextScene: 'scene-5-13-5',
            },
            {
              label: "L'horizon éternel",
              description: "Repartir à l'aventure, explorer le vaste monde au-delà d'Aethelgard.",
              consequence: "Le personnage disparaît dans la légende. Des histoires arrivent de contrées lointaines : un héros qui ressemble étrangement... non, c'est impossible. Et pourtant.",
              nextScene: 'scene-5-13-5',
            },
            {
              label: "L'ascension",
              description: "Accepter un rôle de pouvoir - roi, archimage, gardien divin.",
              consequence: "Le personnage s'élève au-dessus de ce qu'il était. Le pouvoir change tout. Mais les amis d'autrefois le ramènent sur terre, une fois par an, au Sanglier Doré.",
              nextScene: 'scene-5-13-5',
            },
          ],
        },
      ],
      nextScenes: ['scene-5-13-5'],
      previousScene: 'scene-5-13-3',
    },
    // --- Scène 5 : Dernières lignes ---
    {
      id: 'scene-5-13-5',
      sceneNumber: 5,
      title: "L'Aube Éternelle",
      type: 'narration',
      location: "Le Sanglier Doré, Sol-Aureus",
      locationId: 'sol-aureus',
      estimatedMinutes: 10,
      readAloud: {
        text: `Des années plus tard.

Le Sanglier Doré n'a pas changé. Oh, les murs ont été repeints, le toit réparé, et les toilettes - miracle des miracles - sont enfin propres. Mais l'âme de l'endroit est la même. L'odeur de viande grillée et de bière. Le bruit des conversations. La chaleur du feu.

Brok est derrière le comptoir. Plus vieux, plus gris, toujours aussi large. Il essuie un verre avec un torchon qui a vu des jours meilleurs. Certaines choses ne changent jamais.

C'est le soir de l'anniversaire. Le soir où, chaque année, une table se remplit.

La porte s'ouvre.

Des silhouettes familières. Des sourires familiers. Des cicatrices et des rides nouvelles, mais les mêmes yeux. Les mêmes rires. Les mêmes âmes.

Brok pose la bouteille sans un mot. Le premier verre est gratuit.

Vous vous asseyez. Vous levez vos verres. Et quelqu'un dit les mots que vous dites chaque année, les mots qui sont devenus votre prière, votre serment, votre chanson :

« À l'aube. »

« À l'aube, » répondent les autres.

Et dehors, fidèle, éternelle, irréductible, l'aube se lève.

Fin.`,
        mood: "Perfection douce, boucle bouclée, éternité dans un instant",
        music: "Thème principal, version piano seul, dernière note tenue, silence",
      },
      gmNotes: [
        { type: 'info', text: "C'est la toute dernière scène. Lisez-la lentement, avec émotion. Puis posez le livre, regardez vos joueurs, et dites : 'Merci d'avoir joué.' C'est tout. C'est assez." },
        { type: 'tip', text: "Si l'émotion est forte à la table, laissez le silence faire son travail. Les meilleurs moments de JdR ne sont pas remplis de mots." },
        { type: 'secret', text: "Post-générique : si vous voulez teaser une suite, ajoutez après un silence : 'Et quelque part, dans les profondeurs de la terre, dans un endroit que personne n'a encore découvert... quelque chose bouge. Quelque chose de nouveau. Quelque chose qui n'a pas encore de nom.' Puis fermez le livre." },
      ],
      nextScenes: [],
      previousScene: 'scene-5-13-4',
    },
  ],
};

// ============================================================================
// EXPORT
// ============================================================================

export const ACT_5_CHAPTERS: BookChapter[] = [
  CHAPTER_11,
  CHAPTER_12,
  CHAPTER_13,
];
