/**
 * EXPANSION SCENES - ACTE II
 * 15 scènes additionnelles pour les chapitres 5, 6, et 3 (Monts) de l'Acte II
 * Plus des scènes de transition entre régions
 */

import type { BookScene } from './gm-book-data';

// ============================================================================
// CHAPITRE 5 - LA SYLVE D'ÉMERAUDE (4 scènes)
// ============================================================================

const scene_2_5_campelfe: BookScene = {
  id: 'scene-2-5-campelfe',
  sceneNumber: 50,
  title: "Le Camp Elfique de Lunarael",
  type: 'social',
  location: "Campement de Lunarael, Sylve d'Émeraude",
  locationId: 'sylve-emeraude',
  estimatedMinutes: 35,
  readAloud: {
    text: `Vous ne trouvez pas le camp elfique. C'est le camp elfique qui vous trouve.

Après trois jours de marche dans la Sylve d'Émeraude, guidés par des sentiers qui semblent changer d'emplacement entre le matin et le soir, une flèche se plante dans le tronc à un doigt de votre oreille. Pas un tir hostile — un message.

Un ruban vert est attaché à la flèche. Une invitation.

Quand vous levez les yeux, la forêt a changé. Les arbres autour de vous ne sont plus des chênes et des hêtres ordinaires — ce sont des géants, des troncs si larges que dix personnes ne pourraient les entourer, avec des branches qui forment des ponts naturels à vingt mètres du sol. Dans ces branches, des lumières. Des habitations. Une ville dans les arbres.

Lunarael, le camp avancé des Gardiens d'Émeraude, est un émerveillement de bois vivant et de magie sylvestre. Les maisons ne sont pas construites — elles sont cultivées. Des branches tressées forment des murs, des feuilles géantes servent de toits, et des lianes lumineuses dessinent des escaliers en spirale le long des troncs.

Des elfes vous observent depuis les passerelles. Certains avec curiosité, d'autres avec méfiance, quelques-uns avec une hostilité ouverte. Vous êtes des étrangers dans un lieu sacré, et votre présence n'est pas la bienvenue pour tout le monde.

Une elfe descend vers vous avec la grâce d'une feuille qui tombe. Grande, mince, cheveux d'un blanc argenté, yeux verts comme les feuilles au printemps. Une couronne de branches vivantes pousse de son front, portant de petites fleurs qui s'ouvrent et se ferment au rythme de sa respiration.

« Je suis Aelindra, Gardienne du Seuil. La forêt vous a laissés passer. Ce n'est pas un hasard. Mais ce n'est pas non plus un pardon. Dites-moi pourquoi les arbres ont décidé que vous méritiez de voir Lunarael. »`,
    mood: "Émerveillement naturel, tension diplomatique, sacré sylvestre",
    music: "Harpes elfiques, chant d'oiseaux en harmonie, vent dans les feuilles géantes",
  },
  gmNotes: [
    { type: 'info', text: "Lunarael est un camp militaire déguisé en village idyllique. Les Gardiens d'Émeraude sont une milice elfique dédiée à la protection de la Sylve. Ils savent que le Sceau de la forêt faiblit et se préparent à une guerre qu'ils espèrent éviter." },
    { type: 'tip', text: "Les elfes respectent trois choses : le savoir, la patience, et la connexion à la nature. Les joueurs bruyants ou impatients seront mal reçus. Un druide ou un rôdeur dans le groupe facilite énormément les choses. Un jet de Nature CD 25 pour comprendre les coutumes aide." },
    { type: 'warning', text: "Le festin elfique est un test déguisé. La nourriture est infusée de magie sylvestre. Constitution CD 25 ou légèrement ivre (désavantage aux jets de Charisme pendant 1h, mais avantage aux jets de Perception liés à la nature). Les elfes observent comment les PJ réagissent." },
    { type: 'secret', text: "Aelindra cache une vérité terrible : le Sceau de la Sylve est sous l'Arbre-Monde, le plus ancien et le plus grand arbre d'Aethelgard. Si le Sceau brise, l'Arbre-Monde meurt. Si l'Arbre-Monde meurt, la Sylve entière suit en quelques semaines." },
    { type: 'lore', text: "Les elfes de la Sylve ne sont pas immortels mais vivent 800+ ans. Certains Anciens se souviennent de la chute d'Ashka comme d'un souvenir d'enfance. L'Arbre-Monde est vénéré comme un être vivant conscient — et selon les elfes, il l'est. Il communique par des vibrations dans ses racines que seuls les druides elfiques peuvent interpréter." },
  ],
  npcs: [
    {
      name: "Aelindra, Gardienne du Seuil",
      role: "Diplomate elfique / Gardienne de la Sylve",
      personality: "Majestueuse, mesurée, chaque mot pesé comme de l'or. Profondément inquiète sous son masque de sérénité. Protège son peuple avec une férocité tranquille.",
      appearance: "Elfe, apparence de 30 ans (réellement 450+). Cheveux blanc argenté, yeux vert émeraude. Couronne de branches vivantes avec des fleurs qui reflètent son humeur. Armure de bois enchanté, arc long dans le dos.",
      secret: "Dernière descendante de Lythanel, l'un des Sept Mages qui ont créé les Sceaux. Porte dans son sang la capacité de renforcer le Sceau de la Sylve — mais au prix de sa propre vie. Elle ne le sait que depuis peu.",
      dialogues: {
        greeting: "« Les arbres vous ont laissé passer. L'Arbre-Monde a tremblé quand vous avez franchi la lisière. Cela ne s'est pas produit depuis un siècle. Qui êtes-vous, et pourquoi la forêt vous connaît-elle ? »",
        info: "« La Sylve souffre. Les racines les plus profondes portent une maladie que nos guérisseurs ne peuvent nommer. Les animaux changent — certains deviennent agressifs, d'autres fuient vers le nord. Et l'Arbre-Monde... son chant est devenu dissonant. Il souffre. Quelque chose le ronge depuis en dessous. »",
        quest: "« Si vous êtes ceux que l'Arbre-Monde attendait, prouvez-le. La Zone Corrompue s'étend au sud-est. Trouvez la source de la corruption et arrêtez-la. Si vous réussissez, je vous accorderai audience avec le Conseil des Racines et accès à l'Arbre-Monde lui-même. »",
        farewell: "« La forêt veillera sur vos pas. Si vous la respectez, elle sera votre alliée la plus puissante. Si vous la blessez... il n'y aura pas d'avertissement. Juste le silence. Et dans la Sylve, le silence est la chose la plus dangereuse qui soit. »",
      },
      stats: { hp: 65, atk: 16, ac: 18 },
    },
    {
      name: "Thaelar l'Ancien",
      role: "Druide-Sage / Mémoire vivante de la Sylve",
      personality: "Immensément vieux, parle lentement, chaque phrase porte le poids de siècles. Humour sec inattendu. Considère les humains comme des enfants pressés mais attachants.",
      appearance: "Elfe très âgé, cheveux blancs comme de la mousse, visage ridé comme l'écorce d'un vieux chêne. Yeux d'un vert si sombre qu'il semble noir. S'appuie sur un bâton qui est en fait une branche de l'Arbre-Monde.",
      secret: "A connu Selyne il y a 400 ans. Sait qu'elle est l'une des Sept. N'en a jamais parlé car 'ce n'était pas le moment'. Le moment approche.",
      dialogues: {
        greeting: "« Ah. Des mortels pressés. Asseyez-vous. Les arbres ont poussé pendant que vous montiez les escaliers, et ils pousseront encore quand vous serez partis. Rien ne presse. Sauf que tout presse, n'est-ce pas ? »",
        info: "« J'avais sept ans quand l'Hégémonie est tombée. Je me souviens du ciel qui est devenu noir pendant trois jours. Je me souviens du silence. Pas le silence de la paix — le silence de la mort qui retient son souffle. Ce silence revient. Je l'entends dans les racines. »",
        quest: "« La Chasse Sacrée. C'est le test. Nos ancêtres le pratiquaient pour lier des alliances : chasser ensemble, respecter la proie, partager le repas. Si vous chassez avec nous et respectez nos traditions, le peuple de la Sylve sera votre allié. Sinon... nous combattrons seuls. Comme toujours. »",
        farewell: "« Les arbres poussent vers la lumière, jeunes gens. Même quand la nuit semble éternelle. Souvenez-vous de ça quand les ténèbres viendront. Et elles viendront. »",
      },
      stats: { hp: 45, atk: 10, ac: 15 },
    },
  ],
  skillChecks: [
    { skill: 'Nature', dc: 25, success: "Vous comprenez le protocole elfique : s'incliner devant l'arbre le plus proche, ne pas toucher les lianes lumineuses, et accepter tout ce qu'on vous offre. Les elfes approuvent visiblement.", failure: "Vous commettez un faux pas culturel (toucher un arbre sacré, parler trop fort). Les regards se durcissent." },
    { skill: 'Persuasion', dc: 35, success: "Aelindra voit la sincérité dans vos yeux. Elle se détend légèrement. L'invitation au festin est étendue à l'intégralité du groupe.", failure: "Aelindra reste distante. 'Vous serez tolérés. Pas bienvenus. Il y a une différence.'" },
    { skill: 'Constitution', dc: 25, success: "Le vin elfique est divin et vous le gérez parfaitement. Les elfes sont impressionnés par votre résistance. +2 au prochain jet social avec les elfes.", failure: "Le vin elfique vous monte à la tête. Désavantage aux jets de Charisme pendant 1h, mais visions étranges et belles : les arbres semblent chanter." },
  ],
  choices: [
    {
      id: 'choice-elfcamp',
      prompt: "Comment les personnages abordent-ils leur séjour à Lunarael ?",
      options: [
        {
          label: "Participer au festin",
          description: "Accepter l'hospitalité elfique et construire des liens.",
          consequence: "Festin sous les étoiles. Test de Constitution CD 25 (vin). Opportunité de discussions avec Thaelar et Aelindra. Alliance en construction.",
          nextScene: 'scene-2-5-hunter',
          reputationChange: [{ faction: 'Elfes de la Sylve', amount: 10 }],
        },
        {
          label: "Demander audience immédiate",
          description: "Insister sur l'urgence de la mission et demander à voir l'Arbre-Monde.",
          consequence: "Aelindra refuse poliment mais fermement. 'La Sylve a ses rythmes. Si vous ne pouvez pas les respecter, vous ne méritez pas ce que vous demandez.' Délai de 1 jour imposé.",
          nextScene: 'scene-2-5-corruption',
          reputationChange: [{ faction: 'Elfes de la Sylve', amount: -5 }],
        },
        {
          label: "Explorer le camp discrètement",
          description: "Observer les défenses elfiques et la disposition du camp.",
          consequence: "Discrétion CD 40 (les elfes voient TOUT). Succès : carte mentale du camp et compréhension de leurs forces. Échec : pris en flagrant délit, perte de confiance.",
          nextScene: 'scene-2-5-corruption',
          skillCheck: { skill: 'Discrétion', dc: 40, success: "Les défenses sont impressionnantes : archers dans chaque arbre, pièges naturels, et l'Arbre-Monde au centre, protégé par un cercle de druides permanents.", failure: "Un archer elfique apparaît devant vous. 'On ne se cache pas dans la Sylve. La Sylve voit tout.' Vous êtes escortés sous bonne garde." },
        },
        {
          label: "Offrir un cadeau symbolique",
          description: "Présenter un objet de valeur comme geste de bonne foi.",
          consequence: "Le Cristal de Sceau (si possédé) impressionne énormément. Sinon, un objet magique ou une preuve de la menace du Cercle fonctionne. +15 réputation elfique.",
          nextScene: 'scene-2-5-hunter',
          reputationChange: [{ faction: 'Elfes de la Sylve', amount: 15 }],
        },
      ],
    },
  ],
  loot: [
    "Arc court elfique +1 (offert par Aelindra si bonne impression)",
    "Cape de feuilles vivantes (avantage Discrétion en forêt)",
    "Fiole de sève de l'Arbre-Monde (potion de soin supérieure, 4d8+4)",
  ],
  nextScenes: ['scene-2-5-corruption', 'scene-2-5-hunter'],
  previousScene: 'scene-2-transition-road',
};

const scene_2_5_corruption: BookScene = {
  id: 'scene-2-5-corruption',
  sceneNumber: 51,
  title: "La Zone Corrompue",
  type: 'exploration',
  location: "Secteur sud-est de la Sylve d'Émeraude",
  locationId: 'sylve-emeraude',
  estimatedMinutes: 40,
  readAloud: {
    text: `La transition est brutale.

Un pas, vous marchez dans la Sylve vivante, bruissante d'oiseaux et de lumière filtrée. Le pas suivant, le monde change. Les arbres ne sont plus verts — ils sont gris. Leurs feuilles pendent, molles et tachetées de noir, et leurs troncs suintent une sève épaisse et sombre qui sent le fer rouillé.

Le sol sous vos pieds n'est plus couvert de mousse et de fougères. C'est de la terre nue, craquelée, d'où s'élèvent des volutes de vapeur acide. Les insectes qui bourdonnaient autour de vous se sont tus. Les oiseaux aussi. Le silence est total, complet, oppressant.

Et les animaux...

Un cerf se tient au milieu du chemin. Ou ce qui était un cerf. Sa ramure a poussé de manière incontrôlée, formant une masse tordue de bois noirci qui pèse sur sa tête comme un cauchemar solide. Un de ses yeux est normal — brun, effrayé, souffrant. L'autre est d'un vert lumineux, avec une pupille verticale.

Il vous regarde avec ses deux yeux. Et vous n'êtes pas sûrs que les deux regards appartiennent au même être.

Plus loin, les arbres sont morts. Pas simplement morts — pétrifiés. Leurs troncs sont devenus de la pierre noire, figés dans des postures de douleur, leurs branches crispées comme des mains agrippant le ciel. Au centre de cette zone de mort, une dépression dans le sol révèle des racines géantes — les racines de l'Arbre-Monde — qui pulsent d'une lueur verte maladive au lieu de la lumière dorée naturelle.

Quelque chose corrompt les racines. Quelque chose qui monte du sous-sol.`,
    mood: "Horreur naturelle, corruption tangible, urgence écologique",
    music: "Bourdonnement dissonant, craquements de bois mourant, silence anormal",
  },
  gmNotes: [
    { type: 'info', text: "La corruption émane d'une fissure dans le Sceau de la Sylve, situé sous les racines de l'Arbre-Monde. L'énergie nécrotique remonte par les racines et empoisonne la forêt. La zone corrompue s'agrandit d'un mètre par jour." },
    { type: 'tip', text: "Les animaux mutants ne sont pas hostiles par défaut — ils souffrent. Un druide ou un personnage avec des sorts de soins peut tenter de purifier un animal (Médecine CD 35 ou sort de restauration). Le cerf purifié devient un guide vers la source de corruption." },
    { type: 'warning', text: "La zone corrompue est dangereuse : 1d4 dégâts nécrotiques par heure passée à l'intérieur sans protection. Protection possible : sort de protection contre le mal, amulette druidique, ou bénédiction elfique." },
    { type: 'secret', text: "La source de corruption est un cristal de veinérite planté dans les racines par un agent du Cercle des Cendres. Le Cercle a infiltré la Sylve. Un elfe renégat nommé Sylvaris travaille pour eux, convaincu que l'Entité 'libérera' la nature de la domination des mortels." },
    { type: 'lore', text: "Les racines de l'Arbre-Monde s'étendent sur des kilomètres, formant un réseau souterrain qui connecte tous les arbres de la Sylve. C'est le réseau mycorhizien ultime, amplifié par la magie druidique. Corrompre les racines, c'est corrompre toute la forêt." },
  ],
  npcs: [
    {
      name: "Le Cerf Corrompu",
      role: "Animal souffrant / Guide potentiel",
      personality: "Effrayé, souffrant, partagé entre deux natures. L'œil normal est un animal terrified. L'œil vert est quelque chose d'autre — curieux, calculateur.",
      appearance: "Grand cerf blanc aux bois déformés et noircis. Un œil brun normal, un œil vert avec pupille verticale. Flancs marqués de veines noires visibles sous le pelage.",
      secret: "Si purifié, le cerf révèle (par empathie animale ou sort de communication) le chemin vers le cristal de veinérite planté dans les racines. Il a vu l'elfe renégat le placer.",
      dialogues: {
        greeting: "« [Le cerf tremble, hésite entre fuir et s'approcher. L'œil vert vous fixe avec une intelligence qui n'est pas animale.] »",
        info: "« [Si communication établie par magie :] Douleur. La terre est malade. L'homme aux oreilles pointues a planté une chose noire dans les grandes racines. La chose chante une chanson de mort. Les arbres meurent. Les animaux changent. Aidez. »",
        quest: "« [Le cerf tourne la tête vers le sud, vers le cœur de la zone corrompue. Il fait un pas, s'arrête, vous regarde. Il veut que vous le suiviez.] »",
        farewell: "« [Si purifié, le cerf s'incline — un geste presque humain — puis bondit dans la forêt, guidant le chemin.] »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Nature', dc: 30, success: "La corruption est nécrotique mais ciblée. Elle ne se diffuse pas naturellement — elle est canalisée par quelque chose. Un objet, un cristal, quelque chose d'artificiel enfoncé dans les racines.", failure: "La corruption est terrible mais sa source exacte vous échappe." },
    { skill: 'Médecine', dc: 35, success: "Vous purifiez le cerf. L'œil vert se ferme lentement, et quand il rouvre, les deux yeux sont bruns. L'animal est faible mais libre. Il vous regarde avec gratitude.", failure: "La corruption est trop profonde pour être guérie par vos moyens. Le cerf gémit de douleur." },
    { skill: 'Survie', dc: 30, success: "Les traces au sol montrent le passage d'un humanoïde — pas un animal. Bottes elfiques, pas léger. Quelqu'un est venu ici récemment et régulièrement.", failure: "Le sol craquelé ne révèle rien de lisible." },
    { skill: 'Arcanes', dc: 40, success: "Vous sentez un artefact puissant dans le sous-sol. De la veinérite concentrée, agissant comme un émetteur de corruption. Le retirer ou le détruire arrêterait la diffusion.", failure: "La magie ici est tellement perturbée que vos sens arcaniques sont brouillés." },
  ],
  encounter: {
    name: "Les Gardiens Corrompus de la Racine",
    enemies: [
      { name: "Loup Corrompu", hp: 30, atk: 12, ac: 14, cr: 2, abilities: ["Morsure Corrompue (1d8+3 perçant + 1d6 nécrotique)", "Hurlement de Terreur (CD 30 Sagesse ou Effrayé)"] },
      { name: "Loup Corrompu", hp: 30, atk: 12, ac: 14, cr: 2, abilities: ["Morsure Corrompue (1d8+3 perçant + 1d6 nécrotique)", "Hurlement de Terreur (CD 30 Sagesse ou Effrayé)"] },
      { name: "Ent Corrompu", hp: 55, atk: 14, ac: 15, cr: 4, abilities: ["Coups de Branches (2d8+4 contondant)", "Enracinement (immobilise une cible dans 6m, Force CD 35)", "Vulnérable au feu (mais le feu blesse aussi la forêt)"] },
    ],
    terrain: ["Arbres pétrifiés (couverture, mais fragiles)", "Sol craquelé (terrain difficile)", "Racines pulsantes (zone de corruption, 1d4 nécrotique/round sans protection)", "Brouillard acide (visibilité réduite à 10m)"],
    tactics: "Les loups harcèlent les flancs pendant que l'Ent Corrompu attaque frontalement. L'Ent essaie d'enraciner un PJ pour que les loups l'achèvent. Si l'Ent est purifié (sort de restauration ou lumière sacrée), il redevient allié et combat les loups.",
    loot: ["Sève cristallisée de l'Ent (composant de potion, 100 PO)", "Crocs de loup corrompu (composant alchimique, 25 PO chacun)", "Fragment de cristal de veinérite (trouvé dans la racine, preuve de sabotage)"],
  },
  choices: [
    {
      id: 'choice-corruption',
      prompt: "Face à la zone corrompue, que font les personnages ?",
      options: [
        {
          label: "Suivre le cerf purifié vers la source",
          description: "Laisser l'animal guider le groupe vers le cristal de veinérite.",
          consequence: "Chemin direct vers la source. Combat avec les gardiens corrompus. Extraction du cristal possible.",
          nextScene: 'scene-2-5-spirits',
        },
        {
          label: "Traquer l'elfe renégat",
          description: "Suivre les traces de bottes elfiques pour trouver le responsable.",
          consequence: "Survie CD 30. Piste qui mène à un campement caché de Sylvaris. Confrontation sociale ou combat.",
          nextScene: 'scene-2-5-spirits',
          skillCheck: { skill: 'Survie', dc: 30, success: "Les traces mènent à un campement dissimulé dans un arbre creux. Des outils rituels et de la veinérite brute. L'elfe renégat est parti mais reviendra.", failure: "Les traces se perdent dans la zone morte. Le sol craquelé ne retient aucune empreinte." },
        },
        {
          label: "Purifier la zone par la force magique",
          description: "Utiliser toutes les ressources magiques du groupe pour nettoyer la corruption.",
          consequence: "Possible mais coûteux : consomme tous les emplacements de sorts de soins. Recule la corruption de 100m mais ne détruit pas la source.",
          nextScene: 'scene-2-5-spirits',
        },
        {
          label: "Rapporter aux elfes et demander de l'aide",
          description: "Retourner à Lunarael avec des preuves de la corruption.",
          consequence: "Aelindra est horrifiée mais reconnaissante. Elle fournit une escorte de 4 guerriers elfiques pour le retour.",
          nextScene: 'scene-2-5-spirits',
          reputationChange: [{ faction: 'Elfes de la Sylve', amount: 10 }],
        },
      ],
    },
  ],
  loot: [
    "Fragment de cristal de veinérite (preuve de sabotage)",
    "Sève cristallisée d'Ent (100 PO)",
    "Baies de purification (3, chacune protège de la corruption pendant 4h)",
  ],
  nextScenes: ['scene-2-5-spirits'],
  previousScene: 'scene-2-5-campelfe',
};

const scene_2_5_spirits: BookScene = {
  id: 'scene-2-5-spirits',
  sceneNumber: 52,
  title: "Communion avec les Esprits de la Forêt",
  type: 'revelation',
  location: "Clairière du Murmure, Cœur de la Sylve",
  locationId: 'sylve-emeraude',
  estimatedMinutes: 30,
  readAloud: {
    text: `La Clairière du Murmure est l'endroit le plus ancien de la Sylve d'Émeraude.

Aelindra vous y guide au crépuscule, quand la lumière filtre entre les feuilles en rayons dorés qui ressemblent à des colonnes de temple. La clairière est un cercle parfait d'herbe d'un vert si intense qu'il semble irréel. Au centre, un bassin naturel reflète un ciel qui ne correspond pas tout à fait à celui au-dessus de vous — dans le reflet, les étoiles sont déjà visibles, et elles forment des constellations que vous ne reconnaissez pas.

Autour de la clairière, sept arbres d'essences différentes forment un cercle. Chêne, frêne, saule, bouleau, if, houx, et un septième que vous ne pouvez identifier — son tronc est d'argent pur et ses feuilles sont transparentes comme du cristal.

« C'est ici que les esprits de la forêt viennent quand la Sylve a besoin de parler, » dit Aelindra. « Asseyez-vous au bord du bassin. Ne résistez pas à ce que vous allez voir. Les esprits ne comprennent pas la peur — seulement la vérité. »

Thaelar s'installe de l'autre côté du bassin et commence à chanter. Pas avec des mots — avec des sons qui ressemblent au vent dans les branches, à l'eau sur les pierres, au craquement du bois vivant. Les sept arbres se mettent à vibrer. Les étoiles dans le bassin tourbillonnent.

Et les esprits arrivent.

Ce ne sont pas des fantômes. Ce ne sont pas des fées. Ce sont... des présences. Des lumières qui ne sont pas de la lumière. Des formes qui ne sont pas des formes. Le bassin s'anime de silhouettes lumineuses qui dansent et se fondent les unes dans les autres. Et quand ils tournent leur attention vers vous, c'est comme être regardé par la forêt elle-même — chaque arbre, chaque feuille, chaque racine, concentrés en un seul regard.

Des images envahissent votre esprit. Des visions d'un passé si lointain que les montagnes étaient jeunes.`,
    mood: "Sacré, mystique, communion avec l'ancien monde",
    music: "Harmoniques naturelles, chant sans paroles, vibrations profondes",
  },
  gmNotes: [
    { type: 'info', text: "La communion avec les esprits est un événement majeur de la campagne. Les esprits montrent le passé de la Sylve et la création du Sceau forestier. Ils offrent un don à chaque PJ qui se montre respectueux." },
    { type: 'tip', text: "Décrivez les visions de manière sensorielle, pas narrative. Les esprits communiquent par sensation, émotion, et image. Pas de mots. Les joueurs doivent interpréter ce qu'ils voient. C'est intentionnel." },
    { type: 'warning', text: "Un personnage qui résiste aux visions (refuse de s'ouvrir, essaie de contrôler l'expérience) souffre 2d6 dégâts psychiques et est éjecté de la communion. Il peut réessayer avec un jet de Sagesse CD 30." },
    { type: 'secret', text: "Les esprits montrent une vision de l'avenir : la Sylve en flammes, l'Arbre-Monde abattu, et au milieu des cendres, une silhouette familière — Selyne — qui pleure. C'est une possibilité, pas une certitude. L'avenir est malléable." },
    { type: 'lore', text: "Les esprits de la forêt sont les échos de tous les êtres vivants qui ont vécu et sont morts dans la Sylve depuis sa création. Ils ne sont ni bons ni mauvais — ils sont la mémoire vivante de la nature. Leur existence est liée à l'Arbre-Monde : s'il meurt, ils disparaissent." },
  ],
  npcs: [
    {
      name: "Les Esprits de la Sylve",
      role: "Mémoire vivante de la forêt / Oracles naturels",
      personality: "Ni bons ni mauvais. Curieux, anciens, détachés des préoccupations mortelles. Communiquent par visions et émotions.",
      appearance: "Lumières mouvantes de couleurs changeantes. Parfois, des silhouettes se forment : un cerf de lumière, un arbre miniature, un visage ancien. Toujours en mouvement, toujours en transformation.",
      dialogues: {
        greeting: "« [Vision : une porte qui s'ouvre sur une lumière verte. Sensation de bienvenue prudente. Odeur de terre après la pluie.] »",
        info: "« [Vision : les racines de l'Arbre-Monde qui pulsent, un cristal noir enfoncé entre elles comme un poignard. Le cri silencieux de l'arbre. Sensation de douleur immense et patiente. Puis une vision du Sceau : un cercle de lumière sous les racines, fissuré, saignant de la lumière verte.] »",
        quest: "« [Vision : le cristal noir arraché des racines. L'Arbre-Monde qui reprend des couleurs. Mais aussi : une ombre sous les racines qui grandit, qui pousse, qui attend. Le Sceau ne tiendra pas éternellement, même réparé. Sensation d'urgence mêlée de patience séculaire.] »",
        farewell: "« [Vision : chaque PJ, entouré d'une aura de lumière verte. Un don. Une graine dorée apparaît dans la main de chaque personnage. Sensation de confiance accordée. Puis les esprits se dissolvent comme la brume du matin.] »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Sagesse', dc: 25, success: "Vous vous ouvrez aux visions sans résistance. Les esprits vous acceptent pleinement. Les images sont claires, détaillées, chargées de sens.", failure: "Vous luttez contre l'intrusion dans votre esprit. 2d6 dégâts psychiques, visions fragmentaires. Vous pouvez réessayer." },
    { skill: 'Nature', dc: 30, success: "Vous comprenez le langage des visions : les esprits vous montrent comment les racines de l'Arbre-Monde sont le système nerveux de la forêt entière. Toucher une racine, c'est toucher la Sylve.", failure: "Les visions sont belles mais leur sens profond vous échappe." },
    { skill: 'Arcanes', dc: 35, success: "Dans les visions du passé, vous identifiez le rituel de création du Sceau forestier. Vous savez maintenant quel composant est nécessaire pour le renforcer : de la Sève de l'Arbre-Monde, donnée volontairement.", failure: "Les flux magiques des visions sont trop puissants pour être analysés." },
  ],
  choices: [
    {
      id: 'choice-spirits',
      prompt: "Après la communion, que font les personnages ?",
      options: [
        {
          label: "Agir immédiatement sur les visions",
          description: "Aller arracher le cristal de corruption des racines.",
          consequence: "Les esprits guident le chemin. Descente vers les racines profondes. Combat final possible avec le gardien de la corruption.",
          nextScene: 'scene-2-5-hunter',
        },
        {
          label: "Demander l'alliance elfique formelle",
          description: "Utiliser la confiance gagnée pour obtenir l'engagement militaire des elfes.",
          consequence: "Aelindra est convaincue par les visions partagées. Alliance elfique officielle. 20 guerriers promis pour la bataille finale.",
          nextScene: 'scene-2-5-hunter',
          reputationChange: [{ faction: 'Elfes de la Sylve', amount: 20 }],
        },
        {
          label: "Planter les graines données par les esprits",
          description: "Utiliser le don des esprits pour renforcer la barrière naturelle autour de la zone corrompue.",
          consequence: "Les graines poussent instantanément en un cercle d'arbres-sentinelles qui ralentissent la corruption. Gain de temps précieux.",
          nextScene: 'scene-2-5-hunter',
        },
        {
          label: "Méditer sur la vision de l'avenir",
          description: "Réfléchir à la vision de la Sylve en flammes et de Selyne qui pleure.",
          consequence: "Intuition CD 35 : comprendre que la vision est un avertissement, pas une prophétie. L'avenir peut être changé si les Sceaux sont renforcés à temps.",
          nextScene: 'scene-2-5-hunter',
          skillCheck: { skill: 'Intuition', dc: 35, success: "La vision était un 'si', pas un 'quand'. Les esprits vous ont montré ce qui arrivera si vous échouez. C'est un avertissement, pas un destin.", failure: "La vision de destruction est terrifiante et obsédante. Vous dormez mal cette nuit." },
        },
      ],
    },
  ],
  loot: [
    "Graine Dorée de la Sylve (1 par PJ, plantable pour créer un arbre-sentinelle)",
    "Vision du réseau de Sceaux (connaissance de l'emplacement du Sceau forestier)",
    "Bénédiction des Esprits (résistance aux dégâts nécrotiques pendant 7 jours)",
  ],
  nextScenes: ['scene-2-5-hunter'],
  previousScene: 'scene-2-5-corruption',
};

const scene_2_5_hunter: BookScene = {
  id: 'scene-2-5-hunter',
  sceneNumber: 53,
  title: "La Chasse Sacrée",
  type: 'exploration',
  location: "Forêt profonde, Sylve d'Émeraude",
  locationId: 'sylve-emeraude',
  estimatedMinutes: 35,
  readAloud: {
    text: `La Chasse Sacrée commence à l'aube.

Aelindra vous réveille avant le lever du soleil. Dehors, une douzaine de guerriers elfiques attend en silence, arcs dans le dos, peints de motifs verts et bruns qui les rendent presque invisibles contre les troncs. Leurs yeux brillent d'excitation et d'anticipation.

« La Chasse Sacrée est notre plus ancienne tradition, » explique Aelindra en vous tendant un carquois et un arc. « Nous ne chassons pas pour le sport. Nous chassons pour nourrir la communauté, pour honorer la proie, et pour tester ceux qui prétendent être nos alliés. »

Elle pointe vers la forêt profonde. « Un Grand Cerf Blanc a été aperçu dans les bois anciens. C'est le plus noble gibier de la Sylve. Le traquer prend des jours pour un chasseur ordinaire. Vous avez jusqu'au coucher du soleil. »

Les règles sont simples mais impitoyables :
Un : ne tuez rien d'autre que la proie désignée.
Deux : ne blessez aucun arbre, ne cassez aucune branche vivante.
Trois : quand vous trouvez le Cerf, c'est LUI qui décide si la chasse est terminée. Il doit vous accepter.

« Si le Cerf vous refuse, nous rentrons les mains vides. Ce n'est pas un échec — c'est un message. Si le Cerf vous accepte... alors la Sylve vous accepte. Et nous avec. »

Les elfes disparaissent entre les arbres comme des ombres vertes. Vous êtes seuls dans une forêt qui semble tout à coup beaucoup plus grande et beaucoup plus vivante.

La chasse commence.`,
    mood: "Rituel ancestral, test de caractère, harmonie avec la nature",
    music: "Silence forestier profond, bruissement subtil, souffle du chasseur",
  },
  gmNotes: [
    { type: 'info', text: "La Chasse Sacrée est un test en trois phases : 1) Pistage (Survie CD 30), 2) Approche (Discrétion CD 35 ou Nature CD 35 pour communiquer), 3) Acceptation (roleplay pur — le Cerf juge les intentions du groupe). Le combat est interdit." },
    { type: 'tip', text: "Le Grand Cerf Blanc est semi-divin — un esprit de la forêt incarné. Il ne peut pas être tué par des armes normales. Si quelqu'un essaie de le tuer, il disparaît et la Chasse est un échec cuisant. L'objectif est de s'approcher suffisamment pour que le Cerf vous accepte." },
    { type: 'warning', text: "Un événement imprévu : le Cerf passe près de la zone corrompue pendant la chasse. Les PJ doivent choisir entre poursuivre la chasse ou protéger le Cerf d'animaux corrompus. Protéger le Cerf = succès automatique de la Chasse." },
    { type: 'secret', text: "Le Grand Cerf est le même esprit que le cerf corrompu de la zone — son avatar pur. Si les PJ ont purifié le cerf corrompu, le Grand Cerf les reconnaît immédiatement et s'approche de lui-même. La Chasse est gagnée d'avance." },
    { type: 'lore', text: "La Chasse Sacrée remonte à la fondation de la civilisation elfique dans la Sylve, il y a plus de 3000 ans. Chaque alliance majeure des elfes avec les autres peuples a commencé par une Chasse. La dernière remonte à 120 ans — l'alliance contre l'Hégémonie d'Ashka." },
  ],
  npcs: [
    {
      name: "Le Grand Cerf Blanc",
      role: "Esprit de la Sylve / Juge sacré",
      personality: "Majestueux, serein, omniscient dans les limites de la forêt. Ne craint rien. Juge les cœurs, pas les actes.",
      appearance: "Cerf immense, blanc comme la neige fraîche. Ramure dorée qui brille doucement, chaque branche portant de minuscules feuilles d'émeraude. Yeux d'un or liquide. Se déplace sans faire le moindre bruit.",
      dialogues: {
        greeting: "« [Le Cerf s'arrête et tourne la tête vers vous. Son regard est ancien, profond, et totalement dépourvu de peur. Il attend.] »",
        info: "« [Si communication établie : images de la Sylve dans sa gloire passée, de la corruption actuelle, et d'un futur possible où la forêt est guérie. Le Cerf baisse la tête, montrant sa ramure. Invitation.] »",
        quest: "« [Le Cerf s'agenouille. Un geste de soumission qui est en fait un don suprême : il offre une branche de sa ramure, qui se détache sans douleur. La branche brille d'une lumière dorée. C'est un composant pour le rituel du Sceau.] »",
        farewell: "« [Le Cerf se relève, vous regarde une dernière fois, et s'éloigne entre les arbres. Là où il passe, les fleurs s'ouvrent et l'herbe revit. Il disparaît, mais sa lumière reste longtemps après.] »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Survie', dc: 30, success: "Vous trouvez les traces du Grand Cerf : des empreintes dorées dans la mousse qui s'effacent lentement. La piste mène vers les bois anciens.", failure: "La forêt est un labyrinthe vivant. Les sentiers changent, les repères bougent. Vous tournez en rond pendant des heures." },
    { skill: 'Discrétion', dc: 35, success: "Vous approchez le Cerf sans le faire fuir. Il vous regarde sans bouger, ses yeux dorés pesant votre âme.", failure: "Une brindille craque sous votre pied. Le Cerf relève la tête et bondit hors de vue. Il faut recommencer la traque." },
    { skill: 'Nature', dc: 35, success: "Vous communiquez avec la forêt elle-même, demandant le chemin vers le Cerf. Les branches s'écartent devant vous, formant un sentier.", failure: "La forêt reste silencieuse. Elle attend quelque chose de plus." },
  ],
  choices: [
    {
      id: 'choice-hunt',
      prompt: "Comment les personnages mènent-ils la Chasse Sacrée ?",
      options: [
        {
          label: "Pistage patient et respectueux",
          description: "Suivre les traces du Cerf en respectant toutes les règles elfiques.",
          consequence: "Long mais le plus susceptible de réussir. Survie CD 30 + Discrétion CD 35 + moment de roleplay avec le Cerf.",
          nextScene: 'scene-2-transition-camp',
          reputationChange: [{ faction: 'Elfes de la Sylve', amount: 15 }],
        },
        {
          label: "Communion avec la forêt",
          description: "Utiliser la magie ou l'empathie naturelle pour demander à la forêt de guider vers le Cerf.",
          consequence: "Nature CD 35. Si réussi, la forêt guide directement. Approche facilitée.",
          nextScene: 'scene-2-transition-camp',
          skillCheck: { skill: 'Nature', dc: 35, success: "Les arbres vous montrent le chemin. Le Grand Cerf attend dans une clairière baignée de lumière dorée.", failure: "La forêt ne répond pas. Il faudra traquer le Cerf à l'ancienne." },
        },
        {
          label: "Protéger le Cerf des animaux corrompus",
          description: "Quand le Cerf passe près de la zone corrompue, le défendre.",
          consequence: "Combat : 2 loups corrompus + 1 serpent géant mutant. Protéger le Cerf = succès automatique de la Chasse. Alliance elfique scellée.",
          nextScene: 'scene-2-transition-camp',
          reputationChange: [{ faction: 'Elfes de la Sylve', amount: 20 }],
        },
        {
          label: "Offrir les graines des esprits",
          description: "Planter une Graine Dorée dans le chemin du Cerf comme offrande.",
          consequence: "Le Cerf est attiré par la graine. Il la mange et brille plus fort. Il s'approche de lui-même. Succès garanti.",
          nextScene: 'scene-2-transition-camp',
          reputationChange: [{ faction: 'Elfes de la Sylve', amount: 15 }],
        },
      ],
    },
  ],
  loot: [
    "Branche de Ramure Dorée du Grand Cerf (composant du rituel de Sceau)",
    "Alliance elfique formelle (20 guerriers pour la bataille finale)",
    "Titre de 'Ami de la Sylve' (accès permanent aux territoires elfiques)",
  ],
  nextScenes: ['scene-2-transition-camp'],
  previousScene: 'scene-2-5-spirits',
};

// ============================================================================
// CHAPITRE 6 - LES CITÉS LIBRES (4 scènes)
// ============================================================================

const scene_2_6_arena: BookScene = {
  id: 'scene-2-6-arena',
  sceneNumber: 60,
  title: "L'Arène de Port-Tempête",
  type: 'combat',
  location: "Grande Arène, Port-Tempête",
  locationId: 'port-tempete',
  estimatedMinutes: 40,
  readAloud: {
    text: `Port-Tempête fait tout en grand. Son port est le plus vaste de la côte. Ses tavernes sont les plus bruyantes. Et son arène est la plus sanglante.

La Grande Arène est un amphithéâtre de pierre et de bois qui peut accueillir cinq mille spectateurs. Et aujourd'hui, chaque siège est occupé. La foule hurle, tape des pieds, et agite des bannières aux couleurs de son champion favori.

L'air sent la sueur, le sang séché, le sable chaud et la bière renversée. Des bookmakers circulent dans les rangées en criant des cotes. Des vendeurs ambulants poussent des plateaux de saucisses grillées et de fromage fondu. C'est un spectacle, un carnaval, et un abattoir — tout en un.

L'arène elle-même est un ovale de sable doré, entouré d'un mur de pierre de trois mètres de haut hérissé de pointes. Des portes de fer s'ouvrent sur les souterrains où les combattants attendent. Au-dessus de la porte principale, une tribune dorée abrite le Seigneur de l'Arène, un homme massif couvert de bijoux qui compte son argent avec un sourire de requin.

Vous êtes ici pour une raison. Le champion actuel, Thork Brise-Os, est un ancien mercenaire qui a combattu dans les Terres Brûlées. Il porte un amulette ashkane autour du cou. On dit qu'elle le rend invincible. Et vous avez besoin soit de l'amulette, soit de ses informations sur les Terres Brûlées.

Le héraut crie : « Prochain combat ! Les challengers de Sol-Aureus contre THORK BRISE-OS ! QUE LE MEILLEUR SURVIIIIIVE ! »

La foule explose.`,
    mood: "Adrénaline brute, spectacle violent, foule survoltée",
    music: "Foule rugissante, cors de combat, tambours de guerre, métal qui chante",
  },
  gmNotes: [
    { type: 'info', text: "L'Arène est légale à Port-Tempête (les Cités Libres n'ont pas les mêmes lois que Sol-Aureus). Les combats sont 'non-létaux' officiellement, mais les 'accidents' sont fréquents. Paris autorisés." },
    { type: 'tip', text: "Les joueurs peuvent gagner de l'argent en pariant (Intuition CD 30 pour repérer le favori). Ils peuvent aussi défier Thork en combat singulier (un PJ seul) ou en combat de groupe (tous vs Thork + 2 gladiateurs). Le combat de groupe est plus facile mais moins glorieux." },
    { type: 'warning', text: "Thork est CR 6 : HP 90, ATK 18, AC 17. L'amulette ashkane lui donne régénération 5 HP/round. Retirer l'amulette (Athlétisme CD 45 en combat) supprime la régénération. Thork se rend à 10 HP." },
    { type: 'secret', text: "L'amulette n'est pas simplement magique — c'est un fragment de Sceau. Thork l'a trouvée dans les Terres Brûlées et ne comprend pas sa vraie nature. Le Cercle des Cendres a essayé de la lui acheter. Il a refusé. Ils enverront des assassins bientôt." },
    { type: 'lore', text: "L'Arène de Port-Tempête existe depuis 200 ans. Construite par un ancien pirate qui trouvait que les combats navals 'manquaient de public'. Chaque pierre porte les noms de champions passés, gravés par les vainqueurs eux-mêmes." },
  ],
  npcs: [
    {
      name: "Thork Brise-Os",
      role: "Champion de l'Arène / Possesseur d'un artefact clé",
      personality: "Fier, brutal, mais doté d'un code d'honneur strict. Respecte les adversaires courageux. Méprise les lâches.",
      appearance: "Demi-orc massif, deux mètres, muscles sur muscles. Peau gris-vert couverte de cicatrices. L'amulette ashkane pend à son cou sur une chaîne d'acier. Hache de guerre immense.",
      secret: "L'amulette lui donne des cauchemars chaque nuit. Il voit l'Entité. Il ne le dit à personne. Il commence à craindre que l'amulette ne soit pas une bénédiction mais une malédiction.",
      dialogues: {
        greeting: "« Alors c'est vous, les challengers ? Vous êtes plus petits que je pensais. Mais la taille n'a jamais été une garantie. Battez-vous bien et on verra. »",
        info: "« L'amulette ? Trouvée dans les Terres Brûlées, dans un temple que le sable avait découvert. Elle me rend fort. Mais la nuit... la nuit elle me montre des choses. Un œil vert. Des chaînes qui se brisent. Et une voix qui dit 'bientôt'. Vous savez ce que ça veut dire ? »",
        quest: "« Battez-moi dans l'arène, proprement, avec honneur, et je vous la donne. L'amulette. J'en ai marre des cauchemars. Et j'ai le sentiment que vous en avez plus besoin que moi. Mais pas de triche. Pas de magie de charme. Du fer et du courage. »",
        farewell: "« Bon combat. Vous avez gagné le droit de me casser la gueule. C'est le plus beau compliment que je connaisse. Prenez l'amulette et fichez le camp. »",
      },
      stats: { hp: 90, atk: 18, ac: 17 },
    },
  ],
  skillChecks: [
    { skill: 'Athlétisme', dc: 45, success: "Vous arrachez l'amulette du cou de Thork en plein combat. Il perd sa régénération et vacille, surpris. Le combat tourne en votre faveur.", failure: "Vos doigts effleurent la chaîne mais Thork vous repousse d'un coup d'épaule. 'Bien essayé !'" },
    { skill: 'Intuition', dc: 30, success: "Thork est fatigué. Les cauchemars l'usent. Il combat par habitude, pas par conviction. Il VEUT perdre l'amulette, même s'il ne l'admettra jamais.", failure: "Thork semble invincible. Un mur de muscle et de rage." },
    { skill: 'Perception', dc: 35, success: "Dans les tribunes, vous repérez deux silhouettes en robes grises qui observent attentivement Thork. Des agents du Cercle. Ils sont là pour l'amulette.", failure: "La foule est trop dense pour distinguer quoi que ce soit." },
  ],
  encounter: {
    name: "Combat de l'Arène",
    enemies: [
      { name: "Thork Brise-Os", hp: 90, atk: 18, ac: 17, cr: 6, abilities: ["Hache de Guerre (2d12+5 tranchant)", "Rage du Champion (avantage aux attaques pendant 3 rounds, 1/combat)", "Régénération de l'Amulette (5 HP/round, retirable Athlétisme CD 45)", "Se rend à 10 HP ('Assez. Vous avez gagné.')"] },
    ],
    terrain: ["Sable (terrain normal, mais glissant si mouillé)", "Mur à pointes (contondant + perçant si projeté)", "Armes posées dans le sable (lances, filets, boucliers)", "Foule (bonus moral : avantage Initiative si les joueurs saluent la foule avant le combat)"],
    tactics: "Thork charge le combattant le plus imposant. Il utilise Rage au round 2. Il privilégie les attaques puissantes aux tactiques subtiles. Si l'amulette est retirée, il est déstabilisé pendant 1 round.",
    loot: ["Amulette Ashkane (Fragment de Sceau, artefact majeur)", "Bourse du champion : 500 PO", "Gloire dans l'arène (réputation dans les Cités Libres)"],
  },
  choices: [
    {
      id: 'choice-arena',
      prompt: "Comment les personnages abordent-ils le combat de l'arène ?",
      options: [
        {
          label: "Combat honorable",
          description: "Affronter Thork dans les règles, gagner par la force et le courage.",
          consequence: "Combat direct. Thork se rend à 10 HP et donne l'amulette avec respect.",
          nextScene: 'scene-2-6-blackmarket',
          reputationChange: [{ faction: 'Cités Libres', amount: 15 }],
        },
        {
          label: "Parler avant de combattre",
          description: "Approcher Thork avant le combat pour lui parler de l'amulette.",
          consequence: "Persuasion CD 40 : Thork accepte un combat symbolique (3 rounds, pas de mort). L'amulette change de mains quoi qu'il arrive.",
          nextScene: 'scene-2-6-blackmarket',
          skillCheck: { skill: 'Persuasion', dc: 40, success: "'Vous savez ce que c'est, hein ? Les cauchemars, l'œil vert. D'accord. On fait un spectacle pour la foule, et après c'est à vous.'", failure: "'Parler ? Dans l'arène, on COMBAT. Si vous voulez l'amulette, gagnez-la.'" },
        },
        {
          label: "Défier le Cercle en plus",
          description: "Révéler la présence des agents du Cercle et forcer une confrontation triple.",
          consequence: "Chaos dans l'arène. Les agents fuient ou se battent. La foule adore. Le Seigneur de l'Arène est furieux ou ravi.",
          nextScene: 'scene-2-6-blackmarket',
        },
        {
          label: "Voler l'amulette sans combattre",
          description: "Utiliser la discrétion ou la ruse pour obtenir l'amulette.",
          consequence: "Escroquerie CD 50 ou Discrétion CD 50. Extrêmement difficile. Si raté, Thork est furieux et le combat est bien plus dur (pas de reddition).",
          nextScene: 'scene-2-6-blackmarket',
          reputationChange: [{ faction: 'Cités Libres', amount: -10 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-2-6-blackmarket'],
  previousScene: 'scene-2-transition-road',
};

const scene_2_6_blackmarket: BookScene = {
  id: 'scene-2-6-blackmarket',
  sceneNumber: 61,
  title: "Le Marché Noir de Port-Tempête",
  type: 'social',
  location: "Sous les quais, Port-Tempête",
  locationId: 'port-tempete',
  estimatedMinutes: 30,
  readAloud: {
    text: `Sous les quais de Port-Tempête, un autre monde existe.

On y accède par un escalier de pierre glissant caché derrière un entrepôt de filets de pêche. L'escalier descend vers un réseau de caves naturelles creusées par la mer dans la falaise. L'odeur de sel, de poisson et de contrebande vous enveloppe.

Le Marché Noir occupe la plus grande de ces caves — un espace voûté éclairé par des lanternes rouges qui donnent à tout une teinte de sang et de secret. Des étals improvisés sur des caisses de bois exposent des marchandises qu'aucun marché légal ne vendrait : poisons rares, armes enchantées sans licence, documents d'identité forgés, et des choses plus étranges encore — des bocaux contenant des créatures phosphorescentes, des os gravés de runes, des parchemins scellés par de la cire noire.

Les vendeurs sont aussi variés que leurs marchandises. Un gnome aux doigts tachés de mercure vend des gadgets d'espionnage. Une orc imposante tient un étal de « potions de santé alternatives » qui sentent l'essence de champignon. Et dans un coin, derrière un rideau de perles noires, une silhouette à qui tout le monde montre du respect et que personne ne regarde dans les yeux.

On vous a dit de chercher « La Balafre » pour des informations sur le Cercle des Cendres. Le problème : La Balafre est la personne derrière le rideau de perles, et personne ne vous a dit comment on obtient une audience.`,
    mood: "Clandestinité, danger discret, tentations et trésors interdits",
    music: "Gouttes d'eau de mer, murmures, tintement de pièces, craquement de bois",
  },
  gmNotes: [
    { type: 'info', text: "Le Marché Noir est contrôlé par la branche locale du Syndicat de l'Ombre. La Balafre est le chef local — un contact que Sifflement (si alliance faite) a recommandé." },
    { type: 'tip', text: "Obtenir audience avec La Balafre : mentionner Sifflement (automatique), acheter pour plus de 100 PO (possible), ou résoudre un problème en cours (un voleur dérobe les marchands du marché, Perception CD 35 pour le repérer)." },
    { type: 'warning', text: "Le Marché Noir vend des objets dangereux. Si un joueur achète un artefact ashkan (300 PO), il fonctionne mais attire l'attention du Cercle. Choix risqué mais potentiellement utile." },
    { type: 'secret', text: "La Balafre sait que le Cercle des Cendres a un navire en route vers le Sceau de la Côte des Orages — un Sceau sous-marin. Le navire transporte un rituel d'ouverture. Si les PJ n'interviennent pas, le Sceau sera brisé dans 5 jours." },
    { type: 'lore', text: "Le Marché Noir de Port-Tempête est le plus ancien de la côte — 150 ans d'activité ininterrompue. Même pendant l'Hégémonie, il fonctionnait. Les Ashkans ont essayé de le fermer trois fois. Trois fois, les entrées ont changé d'emplacement. Comme si les caves elles-mêmes bougeaient." },
  ],
  npcs: [
    {
      name: "La Balafre",
      role: "Chef du Marché Noir / Source d'informations critiques",
      personality: "Calme, dangereux, chaque mot mesuré. Valeur chaque information à sa juste valeur. Ne donne rien gratuitement. Ne ment jamais — c'est mauvais pour les affaires.",
      appearance: "Tieflin, genre indéterminé, la quarantaine. Peau rouge sombre, cornes courtes polies, une balafre immense qui va du front au menton, traversant un œil — l'œil est de verre, mais il semble vous regarder. Costume de soie noire immaculé.",
      secret: "Ancien esclave ashkan (descendant direct). Le Marché Noir est né de la résistance esclave. La Balafre hait le Cercle des Cendres d'une haine profonde et personnelle : ils vénèrent les mêmes maîtres qui ont asservi ses ancêtres.",
      dialogues: {
        greeting: "« On m'a dit que vous étiez intéressants. Les gens intéressants sont soit des clients, soit des problèmes. Lequel êtes-vous ? »",
        info: "« Le Cercle des Cendres a affrété un navire, Le Silence Noir, il y a quatre jours. Destination : le Récif des Âmes, à deux jours de navigation au nord. Sous ce récif, un Sceau. Ils transportent un rituel d'ouverture et sept 'offrandes'. Vous avez cinq jours avant qu'ils ne l'atteignent. »",
        quest: "« L'information est gratuite. Considérez ça comme un investissement dans un monde où le Cercle n'a pas gagné. Mais si vous voulez un navire pour les intercepter, ça vous coûtera. J'ai un capitaine. Elle est folle, mais c'est la meilleure. 300 pièces d'or et elle est à vous. »",
        farewell: "« Mes ancêtres ont été enchaînés par les maîtres que le Cercle vénère. Si vous les arrêtez, vous n'aurez pas seulement sauvé un Sceau. Vous aurez rendu justice à des fantômes qui attendent depuis trop longtemps. »",
      },
      stats: { hp: 50, atk: 14, ac: 16 },
    },
  ],
  skillChecks: [
    { skill: 'Persuasion', dc: 30, success: "La Balafre vous accorde une audience. Le rideau de perles s'ouvre. Derrière, un bureau élégant et un verre de vin qui vous attend.", failure: "Le garde devant le rideau secoue la tête. 'Pas maintenant.' Il faut trouver un autre moyen." },
    { skill: 'Investigation', dc: 35, success: "En parcourant les étals, vous trouvez un manifeste de navigation récent mentionnant Le Silence Noir et une route vers le nord. Confirmation indépendante des dires de La Balafre.", failure: "Les marchandises sont fascinantes mais rien ne mène directement au Cercle." },
    { skill: 'Perception', dc: 35, success: "Vous repérez un pickpocket qui vole les marchands. Le signaler ou l'arrêter vous gagne le respect du Marché et une audience automatique avec La Balafre.", failure: "Le Marché est un chaos organisé impossible à déchiffrer pour un novice." },
  ],
  choices: [
    {
      id: 'choice-blackmarket',
      prompt: "Que font les personnages au Marché Noir ?",
      options: [
        {
          label: "Engager le capitaine de La Balafre",
          description: "Payer 300 PO pour un navire et intercepter le Cercle en mer.",
          consequence: "Capitaine Yara et son navire Le Vent d'Acier. Départ immédiat. Course contre la montre.",
          nextScene: 'scene-2-6-shipyard',
        },
        {
          label: "Acheter de l'équipement au marché",
          description: "Profiter des articles rares et interdits du Marché Noir.",
          consequence: "Accès à des objets uniques : poisons, armes enchantées sans licence, potions rares. Prix élevés mais qualité garantie.",
          nextScene: 'scene-2-6-shipyard',
        },
        {
          label: "Enquêter sur le Cercle via le Marché",
          description: "Utiliser les contacts du Marché pour en apprendre plus sur les opérations du Cercle dans les Cités Libres.",
          consequence: "Investigation CD 35. Réseau d'agents identifié. Trois planques dans Port-Tempête.",
          nextScene: 'scene-2-6-tavern-brawl',
        },
        {
          label: "Former une alliance avec La Balafre",
          description: "Proposer un partenariat formel contre le Cercle des Cendres.",
          consequence: "La Balafre accepte si preuves de la menace fournies. Alliance du Marché Noir : réseau d'espions, fournisseur d'armes, refuges secrets.",
          nextScene: 'scene-2-6-shipyard',
          reputationChange: [{ faction: 'Syndicat de l\'Ombre', amount: 15 }],
        },
      ],
    },
  ],
  loot: [
    "Poison de sommeil (3 doses, 25 PO chacune)",
    "Dague enchantée +1 (150 PO, pas de licence)",
    "Carte marine du Récif des Âmes (50 PO)",
  ],
  nextScenes: ['scene-2-6-shipyard', 'scene-2-6-tavern-brawl'],
  previousScene: 'scene-2-6-arena',
};

const scene_2_6_shipyard: BookScene = {
  id: 'scene-2-6-shipyard',
  sceneNumber: 62,
  title: "Les Chantiers Navals de Port-Tempête",
  type: 'exploration',
  location: "Chantiers navals, Port-Tempête",
  locationId: 'port-tempete',
  estimatedMinutes: 30,
  readAloud: {
    text: `Les chantiers navals de Port-Tempête occupent toute la baie nord, un croissant de quais, de cales sèches et d'ateliers où une douzaine de navires sont en construction ou en réparation. Le bruit est constant : scies, marteaux, cris des charpentiers, grincement des grues.

Au milieu de cette industrie maritime, un navire se distingue. Pas par sa taille — il est moyen, une caravelle rapide — mais par son état. Il est couvert de plaques de métal, ses voiles sont renforcées de fils d'argent, et sa proue porte une figure de proue en forme de femme ailée avec des dents de requin.

C'est Le Vent d'Acier. Et sa capitaine est exactement comme La Balafre l'a décrite : folle.

Capitaine Yara est perchée sur le beaupré, une longue-vue dans une main et une bouteille dans l'autre. Quand elle vous voit approcher, elle saute du beaupré — un saut de quatre mètres — et atterrit sur le quai avec la grâce d'un chat et le sourire d'un démon.

« La Balafre vous envoie. J'espère que vous avez le pied marin, parce que Le Vent d'Acier ne ralentit pour personne. Pas même pour les passagers qui payent. »

Derrière elle, son équipage prépare le navire. Et au bout du quai, vous remarquez quelque chose d'inquiétant : un navire de guerre bat pavillon noir, amarré en bout de jetée. Sa coque porte des runes qui luisent faiblement de vert dans l'ombre du quai.

Le Silence Noir. Le navire du Cercle. Il est encore là.

Ce qui signifie que vous avez une fenêtre pour agir. Mais elle se ferme vite.`,
    mood: "Urgence maritime, préparatifs de course, danger imminent",
    music: "Chantiers navals, vagues, vent, cris de mouettes, cordes qui claquent",
  },
  gmNotes: [
    { type: 'info', text: "Le Silence Noir est encore au port ! Les joueurs ont une opportunité inattendue : saboter le navire du Cercle avant qu'il ne parte. OU partir avant lui et arriver au Récif en premier. OU monter à bord pour une attaque surprise." },
    { type: 'tip', text: "Trois approches : 1) Sabotage discret du Silence Noir (Discrétion CD 35 + Crochetage/Sabotage CD 40). 2) Départ rapide avec Le Vent d'Acier pour arriver avant. 3) Assaut direct sur le navire au port (combat naval urbain, très risqué, très spectaculaire)." },
    { type: 'warning', text: "Le Silence Noir a 20 hommes d'équipage + 3 Adeptes du Cercle. Attaque directe = combat difficile mais faisable si surprise. Le navire porte des runes de protection (résistance au feu, +2 AC coque)." },
    { type: 'secret', text: "Capitaine Yara a une raison personnelle de haïr le Cercle : ils ont coulé son ancien navire et tué la moitié de son équipage il y a un an. Elle fera n'importe quoi pour les détruire, même se mettre en danger inconsidéré." },
    { type: 'lore', text: "Port-Tempête doit son nom aux tempêtes magiques qui balaient la côte trois fois par an. Les chantiers navals ont développé des techniques de renforcement uniques — mélange de métallurgie naine et de magie de vent elfique — qui rendent leurs navires les plus résistants d'Aethelgard." },
  ],
  npcs: [
    {
      name: "Capitaine Yara du Vent d'Acier",
      role: "Capitaine pirate/corsaire / Alliée féroce",
      personality: "Téméraire, loyale envers son équipage, rancunière, et dotée d'un humour noir ravageur. Boit trop mais ne perd jamais le contrôle.",
      appearance: "Humaine, la trentaine. Peau brune brûlée par le soleil, dreadlocks noires avec des perles de métal. Cicatrice en étoile sur l'épaule gauche. Toujours une lame quelque part sur elle (au moins trois).",
      secret: "Le Vent d'Acier a une arme secrète : un canon arcanique récupéré sur un navire ashkan coulé. Un seul tir, mais capable de briser la coque de n'importe quel navire. Yara le garde pour 'une occasion spéciale'.",
      dialogues: {
        greeting: "« Bienvenue sur le navire le plus rapide et le plus dangereux de la côte. Règle numéro un : on ne vomit pas sur le pont. Règle numéro deux : on obéit au capitaine. Règle numéro trois : voir règle deux. »",
        info: "« Le Silence Noir ? Je le connais. Ils ont coulé mon ancien navire. Le Souffle d'Argent. Mon second est mort cette nuit-là. J'ai juré de couler ce navire. Alors si vous me dites qu'on va le couler, vous avez mon navire, mon équipage, et mon canon. »",
        quest: "« Voilà comment on fait. Le Vent d'Acier est plus rapide. On part maintenant, on arrive au Récif avant eux. On leur prépare un accueil. Ou, si vous préférez le style brutal, on les sabote d'abord et on prend le large pendant qu'ils réparent. Votre choix. »",
        farewell: "« Largez les amarres ! Cap au nord ! Et si quelqu'un a le mal de mer, qu'il le dise maintenant. Pas après. »",
      },
      stats: { hp: 55, atk: 16, ac: 16 },
    },
  ],
  skillChecks: [
    { skill: 'Discrétion', dc: 35, success: "Vous approchez le Silence Noir sans être vus. L'équipage de garde est minimal : 4 marins endormis et 1 Adepte qui médite à la proue.", failure: "Un garde vous repère. 'Qui va là !' L'alarme est donnée. Plan compromis." },
    { skill: 'Sabotage', dc: 40, success: "Vous percez discrètement la coque sous la ligne de flottaison. Le Silence Noir coulera en 6 heures — assez pour que l'équipage ne remarque rien avant le départ.", failure: "La coque est renforcée par des runes. Vos outils ne percent pas. Il faut une autre approche." },
    { skill: 'Persuasion', dc: 30, success: "Yara accepte de retarder le départ de 2 heures pour vous laisser le temps de saboter le Silence Noir. 'Mais pas une minute de plus.'", failure: "'On part maintenant ou jamais. Le vent tourne dans une heure et je ne le louperai pas.'" },
  ],
  choices: [
    {
      id: 'choice-shipyard',
      prompt: "Que font les personnages face aux deux navires ?",
      options: [
        {
          label: "Saboter le Silence Noir et partir",
          description: "Désactiver le navire ennemi puis prendre la mer avec Le Vent d'Acier.",
          consequence: "Sabotage CD 40. Succès : le Cercle est retardé de 2 jours. Les PJ arrivent au Récif en premier. Échec : course serrée.",
          nextScene: 'scene-2-transition-road',
        },
        {
          label: "Partir immédiatement",
          description: "Prendre la mer avec Le Vent d'Acier sans perdre de temps.",
          consequence: "Départ rapide. Arrivée au Récif 12h avant le Silence Noir. Temps limité pour se préparer.",
          nextScene: 'scene-2-transition-road',
        },
        {
          label: "Attaquer le Silence Noir au port",
          description: "Assaut direct sur le navire du Cercle pendant qu'il est amarré.",
          consequence: "Combat urbain/naval. 20 marins + 3 Adeptes. Si victoire : le navire est capturé, l'équipement rituel est récupéré, et le Cercle perd une force majeure.",
          nextScene: 'scene-2-transition-road',
          reputationChange: [{ faction: 'Cités Libres', amount: 10 }, { faction: 'Cercle des Cendres', amount: -20 }],
        },
        {
          label: "Libérer les offrandes à bord",
          description: "S'infiltrer pour libérer les sept prisonniers destinés au rituel.",
          consequence: "Discrétion CD 35. Les prisonniers sont drogués mais vivants. Les libérer sauve des vies ET prive le Cercle du rituel. Victoire morale et stratégique.",
          nextScene: 'scene-2-transition-road',
          reputationChange: [{ faction: 'Peuple de Sol-Aureus', amount: 15 }],
        },
      ],
    },
  ],
  loot: [
    "Passage gratuit sur Le Vent d'Acier",
    "Carte marine détaillée du Récif des Âmes",
    "Plans du rituel d'ouverture (si récupérés sur le Silence Noir)",
  ],
  nextScenes: ['scene-2-transition-road'],
  previousScene: 'scene-2-6-blackmarket',
};

const scene_2_6_tavern_brawl: BookScene = {
  id: 'scene-2-6-tavern-brawl',
  sceneNumber: 63,
  title: "Bagarre au Kraken Ivre",
  type: 'combat',
  location: "Le Kraken Ivre, taverne portuaire, Port-Tempête",
  locationId: 'port-tempete',
  estimatedMinutes: 25,
  readAloud: {
    text: `Le Kraken Ivre est le genre de taverne où les chaises sont clouées au sol — pas par décoration, mais par nécessité.

L'enseigne représente un kraken tenant une chope dans chacun de ses huit tentacules, l'air béatement satisfait. L'intérieur est un mélange de bois flotté, de filets de pêche décoratifs, et de taches qui pourraient être du vin, du sang, ou les deux.

Vous êtes venus chercher des informations auprès d'un contact portuaire. Mais la soirée a d'autres plans.

Tout commence par un commentaire anodin. Un marin bourru renverse sa bière sur un mercenaire nain. Le nain insulte la mère du marin. Le marin insulte le roi des nains. Un elfe à la table voisine fait remarquer que les humains et les nains sont également vulgaires. Un demi-orc défend les nains. Un halfelin vole le portefeuille du demi-orc pendant la confusion.

Et puis quelqu'un — personne ne saura jamais qui — lance la première chaise.

C'est le chaos. Des chaises volent, des tables se renversent, des bouteilles explosent contre les murs. Le barman plonge derrière son comptoir avec la dextérité d'un homme qui fait ça trois fois par semaine.

Au milieu de ce pandémonium, un homme ivre se jette sur vous en hurlant : « C'EST VOUS QUI AVEZ PRIS MON POISSON ! »

Vous n'avez pris le poisson de personne. Mais essayez de le dire à un homme ivre dans une bagarre de taverne.

Et alors que le chaos atteint son apogée, vous entendez une voix familière dans le vacarme. Un marin à côté de vous, temporairement sobre entre deux coups, vous attrape par le col : « Le Cercle. Entrepôt douze. Ce soir minuit. C'est tout ce que je sais. » Puis il disparaît dans la mêlée.`,
    mood: "Chaos joyeux, humour dans la violence, information dans le désordre",
    music: "Bois qui craque, verre brisé, cris, rires, musique de taverne qui continue bravement",
  },
  gmNotes: [
    { type: 'info', text: "Bagarre générale non-létale ! 20+ participants. Pas un vrai combat — les jets sont des jets de Sauvegarde, d'Athlétisme et d'Acrobaties pour naviguer le chaos. Dégâts en non-létal seulement (contondant). Durée : 5 rounds." },
    { type: 'tip', text: "Rendre la scène amusante, pas dangereuse. Tables lancées (CD 25 Dex pour esquiver, 1d6 contondant), tonneaux de bière qui roulent, un barde qui continue de jouer malgré tout, un chat qui traverse le chaos sans être touché." },
    { type: 'warning', text: "L'information du marin est cruciale : l'entrepôt 12 est un point de rendez-vous du Cercle ce soir. C'est une fenêtre d'opportunité. Les joueurs doivent choisir entre enquêter ce soir ou attendre." },
    { type: 'secret', text: "Le marin qui donne l'info est un agent de La Balafre planté pour transmettre l'information dans un contexte où personne ne le remarque. La bagarre a été orchestrée. Le halfelin qui vole les portefeuilles travaille aussi pour La Balafre — il récupère des documents intéressants dans la confusion." },
    { type: 'lore', text: "Les bagarres au Kraken Ivre sont si fréquentes qu'elles font partie du folklore local. Il y a même un système de paris informel : 'Combien de rounds avant l'intervention de la Garde ?' (Réponse habituelle : la Garde n'intervient jamais. Le Kraken gère ses propres problèmes.)" },
  ],
  npcs: [
    {
      name: "Borrik le Barman",
      role: "Barman survivant / Philosophe de comptoir",
      personality: "Zen sous la pression, philosophe inattendu, lance des objets avec une précision terrifiante pour rétablir l'ordre.",
      appearance: "Demi-orc, la quarantaine, large comme une armoire. Tablier de cuir épais comme une armure. Moustache impressionnante. Cicatrice sur chaque phalange.",
      dialogues: {
        greeting: "« Bienvenue au Kraken. Si vous voulez boire, asseyez-vous. Si vous voulez vous battre, attendez le prochain incident. Ça ne devrait pas tarder. »",
        info: "« Je vois tout depuis ce comptoir. TOUT. L'information qui circule dans cette taverne en une nuit vaut plus que ce que la Garde collecte en un mois. Posez vos questions. Si la réponse vaut moins de 5 pièces d'or, c'est gratuit. »",
        farewell: "« Revenez quand vous voulez. Et si vous cassez moins de trois chaises, la prochaine tournée est offerte. C'est ma limite : trois. »",
      },
      stats: { hp: 50, atk: 14, ac: 14 },
    },
  ],
  skillChecks: [
    { skill: 'Acrobaties', dc: 25, success: "Vous esquivez une chaise volante, glissez sous une table, et émergez de l'autre côté du chaos indemne.", failure: "Une table vous percute. 1d6 contondant et vous atterrissez sur un marin en colère." },
    { skill: 'Athlétisme', dc: 25, success: "Vous attrapez un tonneau de bière qui roule et le redirigez vers un groupe de bagarreurs, dégageant votre chemin.", failure: "Le tonneau vous échappe et vous renverse. 1d4 contondant et couvert de bière." },
    { skill: 'Perception', dc: 30, success: "Dans le chaos, vous repérez le marin qui s'approche de vous. Son mouvement est trop délibéré pour être celui d'un ivrogne. L'information qu'il donne est préméditée.", failure: "Le marin vous semble n'être qu'un ivrogne de plus dans la mêlée." },
  ],
  choices: [
    {
      id: 'choice-brawl',
      prompt: "Que font les personnages après la bagarre ?",
      options: [
        {
          label: "Aller à l'entrepôt 12 immédiatement",
          description: "Profiter de la nuit pour espionner le rendez-vous du Cercle.",
          consequence: "Surveillance de l'entrepôt. 3 agents du Cercle arrivent à minuit. Possibilité d'espionnage ou d'embuscade.",
          nextScene: 'scene-2-6-shipyard',
        },
        {
          label: "Interroger Borrik",
          description: "Profiter du calme post-bagarre pour obtenir des informations du barman omniscient.",
          consequence: "Borrik connaît les horaires de marée, les mouvements du Silence Noir, et le nom du capitaine ennemi. Information gratuite 'parce que vous avez bien combattu'.",
          nextScene: 'scene-2-6-shipyard',
        },
        {
          label: "Chercher des alliés dans la taverne",
          description: "Recruter des mercenaires ou des marins pour un assaut ou une mission.",
          consequence: "2d4 mercenaires disponibles, 5 PO/jour chacun. Qualité variable. Un se révèle être un ancien soldat d'élite qui a ses propres raisons de haïr le Cercle.",
          nextScene: 'scene-2-6-shipyard',
        },
        {
          label: "Se reposer et planifier",
          description: "Retourner à l'auberge, soigner les blessures, et élaborer un plan.",
          consequence: "Repos court. Plan élaboré. Avantage au premier jet de la prochaine scène grâce à la préparation.",
          nextScene: 'scene-2-6-shipyard',
        },
      ],
    },
  ],
  nextScenes: ['scene-2-6-shipyard'],
  previousScene: 'scene-2-6-blackmarket',
};

// ============================================================================
// CHAPITRE 3 (ACTE 2) - LES MONTS CŒUR-DE-FER (4 scènes)
// ============================================================================

const scene_2_3_forge: BookScene = {
  id: 'scene-2-3-forge',
  sceneNumber: 70,
  title: "Les Grandes Forges de Hammerdeep",
  type: 'social',
  location: "Grandes Forges, Hammerdeep",
  locationId: 'hammerdeep',
  estimatedMinutes: 30,
  readAloud: {
    text: `Les Grandes Forges de Hammerdeep sont le cœur battant de la montagne. Littéralement.

La salle est immense — un dôme naturel de roche noire poli par des millénaires de chaleur. Au centre, le Grand Fourneau : une forge alimentée par un flux de magma naturel canalisé depuis les entrailles de la montagne par un réseau de canaux de métal enchanté. La chaleur est telle que l'air ondule en permanence, et les nains qui travaillent ici portent des tabliers de cuir ignifugé aussi épais qu'une armure.

Des dizaines de postes de travail encerclent le Grand Fourneau. Chaque enclume porte le nom de son maître-forgeron, gravé en runes naines millénaires. Le clang-clang-clang des marteaux est si régulier qu'il forme une mélodie, chaque frappe parfaitement synchronisée avec les autres comme un orchestre de métal.

Maître Forgeron Brunhild vous attend. C'est une naine d'une taille remarquable — presque un mètre quarante, ce qui dans la société naine est l'équivalent d'un géant. Ses bras sont plus épais que vos cuisses, et elle porte un marteau de forge si lourd que vous n'êtes pas sûrs de pouvoir le soulever à deux.

« Alors c'est vous, les étrangers qui ont impressionné le Roi. Bienvenue aux Forges. Ici, le métal ne ment pas et le feu révèle la vérité. Vous voulez forger quelque chose ? Ou vous êtes juste venus admirer ? »`,
    mood: "Majesté artisanale, chaleur et force, fierté naine à son apogée",
    music: "Marteaux sur enclumes en rythme, rugissement du feu, sifflements de vapeur",
  },
  gmNotes: [
    { type: 'info', text: "Les Grandes Forges permettent de forger ou améliorer un objet magique. Coût : composants + 200 PO + un défi artisanal. Le Fer Stellaire peut être travaillé ici pour créer le composant de réparation du Sceau." },
    { type: 'tip', text: "Le défi artisanal : un PJ doit frapper le métal en rythme avec les nains (Performance CD 30 ou Constitution CD 35). Succès = l'arme est de qualité supérieure (+1). Échec = qualité standard mais l'objet est fonctionnel." },
    { type: 'warning', text: "Brunhild teste les PJ en leur proposant de forger eux-mêmes. Si un PJ refuse ('je ne suis pas forgeron'), Brunhild est déçue. Si un PJ essaie même maladroitement, elle respecte l'effort." },
    { type: 'secret', text: "Brunhild possède les plans d'une arme légendaire : le Brise-Sceau. Forgée en Fer Stellaire, elle peut temporairement renforcer ou affaiblir un Sceau. Elle ne les montrera qu'à quelqu'un qui prouve sa valeur aux Forges." },
    { type: 'lore', text: "Les Grandes Forges sont actives depuis la fondation de Hammerdeep, il y a 2000 ans. Chaque objet forgé ici porte l'essence de la montagne. La légende dit que les premières armes forgées au Grand Fourneau ont tué un dieu mineur. La légende est vraie." },
  ],
  npcs: [
    {
      name: "Maître Brunhild Poing-de-Fer",
      role: "Maître-Forgeron / Artisane légendaire",
      personality: "Directe, perfectionniste, ne supporte pas la médiocrité. Respecte l'effort honnête plus que le talent naturel. Rire tonitruant quand quelque chose l'amuse.",
      appearance: "Naine, la centaine (jeune pour une naine). Massive, bras comme des enclumes. Cheveux roux tressés en une natte unique, barbe courte et soignée. Tablier de cuir noir marqué de brûlures de fierté.",
      secret: "Brunhild est la seule forgeronne capable de travailler le Fer Stellaire. C'est un art perdu qu'elle a redécouvert en étudiant les techniques ashkanes — ironie amère pour une naine.",
      dialogues: {
        greeting: "« Prenez un tablier, un marteau, et montrez-moi vos mains. Les mains disent tout sur quelqu'un. Les vôtres disent... intéressant. Vous n'êtes pas des forgerons, mais vous n'êtes pas inutiles non plus. »",
        info: "« Le Fer Stellaire est le métal le plus rare d'Aethelgard. Il tombe des étoiles, une fois par siècle. Le Roi possède le dernier lingot. Pour le travailler, il faut une chaleur que seul le Grand Fourneau peut produire, et une technique que seuls les Ashkans maîtrisaient. Oui, les Ashkans. Même les monstres savaient forger. »",
        quest: "« Vous voulez que je forge le composant pour votre Sceau ? D'accord. Mais pas gratuitement. Voici le marché : vous m'aidez à forger, vous frappez le métal en rythme avec mes compagnons, et vous prouvez que vous êtes dignes de l'arme qui sortira de ma forge. Deal ? »",
        farewell: "« Revenez quand le métal vous appellera. Il le fera. Tôt ou tard, tout le monde entend la chanson de la forge. »",
      },
      stats: { hp: 55, atk: 14, ac: 18 },
    },
  ],
  skillChecks: [
    { skill: 'Constitution', dc: 35, success: "Vous tenez le rythme des marteaux nains pendant dix minutes. La sueur coule, vos bras tremblent, mais vous ne flanchez pas. Brunhild hoche la tête avec respect.", failure: "Vous perdez le rythme au bout de cinq minutes. Le métal refroidit. 'Pas mal pour un non-nain. Mais pas suffisant pour le Fer Stellaire.'" },
    { skill: 'Performance', dc: 30, success: "Vous trouvez le rythme naturel des marteaux et frappez en parfaite synchronisation. Le métal chante sous vos coups. Les nains échangent des regards impressionnés.", failure: "Vos frappes sont décalées. Le son est discordant. Le métal le sent — il prend une forme imparfaite." },
    { skill: 'Arcanes', dc: 35, success: "Vous comprenez que les runes naines de la forge sont en fait un circuit magique. Chaque frappe de marteau charge le métal de puissance. Le rythme n'est pas esthétique — il est fonctionnel.", failure: "Les runes sont décoratives, non ? Elles sont jolies en tout cas." },
  ],
  choices: [
    {
      id: 'choice-forge',
      prompt: "Que font les personnages aux Grandes Forges ?",
      options: [
        {
          label: "Relever le défi de forge",
          description: "Forger aux côtés des nains pour prouver sa valeur.",
          consequence: "Constitution CD 35 ou Performance CD 30. Succès : arme/composant de qualité supérieure. Brunhild montre les plans du Brise-Sceau.",
          nextScene: 'scene-2-3-deepmine',
          reputationChange: [{ faction: 'Nains de Hammerdeep', amount: 15 }],
        },
        {
          label: "Demander le Fer Stellaire au Roi",
          description: "Aller voir le Roi Thorin pour obtenir le dernier lingot.",
          consequence: "Le Roi donne le lingot si les PJ ont déjà prouvé leur valeur. Sinon, il faut d'abord gagner sa confiance (quête dans les mines).",
          nextScene: 'scene-2-3-feast',
        },
        {
          label: "Étudier les techniques de forge ashkanes",
          description: "Examiner les techniques que Brunhild a redécouvertes.",
          consequence: "Arcanes CD 35. Compréhension du processus de travail du Fer Stellaire. Information cruciale pour les futurs rituels de Sceau.",
          nextScene: 'scene-2-3-deepmine',
        },
        {
          label: "Commander une arme personnalisée",
          description: "Payer Brunhild pour forger une arme ou une armure sur mesure.",
          consequence: "200 PO minimum + composants. Arme +1 ou armure +1. Temps de fabrication : 3 jours. Qualité exceptionnelle.",
          nextScene: 'scene-2-3-feast',
        },
      ],
    },
  ],
  loot: [
    "Composant de Sceau en Fer Stellaire (si forgé avec succès)",
    "Plans du Brise-Sceau (si défi réussi)",
    "Marteau de forge nain (arme ou outil, +1 aux jets de forge)",
  ],
  nextScenes: ['scene-2-3-deepmine', 'scene-2-3-feast'],
  previousScene: 'scene-2-1-1',
};

const scene_2_3_deepmine: BookScene = {
  id: 'scene-2-3-deepmine',
  sceneNumber: 71,
  title: "Éboulement dans les Mines Profondes",
  type: 'exploration',
  location: "Mine profonde, niveau 15, Hammerdeep",
  locationId: 'hammerdeep-mines',
  estimatedMinutes: 35,
  readAloud: {
    text: `Le niveau 15 est plus profond que ce que les nains exploitent normalement. C'est le domaine des prospecteurs les plus audacieux et des créatures qui n'ont jamais vu la lumière.

Vous descendez avec une équipe de sauvetage : cinq mineurs nains armés de pioches et de torches. Un éboulement a piégé six de leurs camarades il y a douze heures. Les tunnels de secours sont trop étroits pour les équipes lourdes.

L'air devient étouffant à mesure que vous descendez. La roche change de couleur — du gris au noir, puis à un noir luisant moucheté de cristaux qui brillent d'une lueur propre.

Le tunnel principal est bloqué par un amas de rochers. On entend des coups faibles de l'autre côté — les mineurs piégés qui frappent la roche avec leurs outils. Ils sont vivants. Pour l'instant.

Mais ce n'est pas le seul bruit.

De quelque part sous vos pieds — en dessous même du niveau 15 — monte un grondement sourd et régulier. Pas un éboulement. Pas la montagne qui bouge. C'est quelque chose de vivant. Quelque chose de grand. Et ça se rapproche.

Le chef des mineurs, un nain couvert de suie nommé Gundrik, vous regarde avec des yeux qui en disent long : « On a deux problèmes. Le premier, c'est les rochers. Le deuxième... c'est ce qui a causé l'éboulement en premier lieu. »`,
    mood: "Urgence de sauvetage, claustrophobie, horreur des profondeurs",
    music: "Craquements de roche, coups de pioche lointains, grondement souterrain",
  },
  gmNotes: [
    { type: 'info', text: "Mission de sauvetage + rencontre avec une créature des profondeurs. Les mineurs piégés ont 6 heures d'air restant. Le déblayage prend 4 heures normalement, mais peut être accéléré." },
    { type: 'tip', text: "Accélérer le sauvetage : magie (Façonnage de la pierre = instantané), explosifs nains (risqué, Intelligence CD 35), ou force brute (Athlétisme CD 40, réduit à 2 heures). La créature arrive dans 3 heures." },
    { type: 'warning', text: "La créature : un Ankheg des Profondeurs (CR 5, HP 65, ATK 16, AC 15). Creuse à travers la roche. Attirée par les vibrations des coups de pioche. Attaque depuis en dessous. Vulnérable au froid." },
    { type: 'secret', text: "Parmi les mineurs piégés, l'un d'eux — le jeune Kael — a trouvé quelque chose avant l'éboulement : une caverne de cristal naturelle avec des formations impossibles. Au centre, un cristal pulsant qui semble vivant. C'est un morceau de Sceau exposé." },
    { type: 'lore', text: "Le niveau 15 n'existait pas il y a cinq ans. Les forages nains l'ont ouvert. Ce qu'ils ont découvert n'est pas de la roche naturelle mais une structure ashkane enterrée sous la montagne depuis avant sa formation. Les Ashkans ne construisaient pas dans la montagne — la montagne a poussé AUTOUR de leur construction." },
  ],
  npcs: [
    {
      name: "Gundrik le Prospecteur",
      role: "Chef mineur / Guide des profondeurs",
      personality: "Pragmatique, courageux, protecteur envers ses hommes. Parle peu mais chaque mot compte.",
      appearance: "Nain trapu même pour un nain, barbe noire coupée court pour la sécurité. Lampe de mineur greffée sur le casque. Mains comme des blocs de granit.",
      dialogues: {
        greeting: "« Pas le temps pour les présentations. Six gars sont coincés. L'air se raréfie. Et il y a une bête en dessous. On y va. »",
        info: "« L'éboulement n'était pas naturel. La roche ici est solide. Quelque chose a frappé en dessous et tout s'est effondré. Le jeune Kael était excité avant ça — il disait avoir trouvé une caverne de cristal. Ça a jamais existé ici avant. »",
        farewell: "« Mes gars sont saufs. La bête est morte. Je vous dois la vie de six nains. Chez nous, ça vaut plus que de l'or. »",
      },
      stats: { hp: 45, atk: 12, ac: 16 },
    },
  ],
  skillChecks: [
    { skill: 'Athlétisme', dc: 40, success: "Vous déplacez les rochers les plus lourds à mains nues. Le passage s'ouvre en 2 heures au lieu de 4. Les mineurs sont sauvés avec de la marge.", failure: "Les rochers sont trop lourds. Il faut trouver un autre moyen ou attendre le déblayage normal." },
    { skill: 'Intelligence', dc: 35, success: "Vous identifiez un point faible dans l'éboulement. Une charge explosive naine placée précisément dégagera le passage en quelques minutes.", failure: "La structure de l'éboulement est chaotique. Explosifs = risque d'aggraver l'effondrement." },
    { skill: 'Perception', dc: 35, success: "Le grondement change de direction. La créature s'approche par l'est. Vous avez 20 minutes pour vous préparer.", failure: "Le grondement est omniprésent. Impossible de déterminer sa direction exacte." },
  ],
  encounter: {
    name: "L'Ankheg des Profondeurs",
    enemies: [
      { name: "Ankheg des Profondeurs", hp: 65, atk: 16, ac: 15, cr: 5, abilities: ["Morsure (2d10+4 perçant + 1d6 acide)", "Attaque Souterraine (émerge du sol, cible surprise si pas détecté)", "Jet d'Acide (ligne 6m, 3d6 acide, CD 35 Dextérité)", "Vulnérable au froid", "Tremblement (mouvement souterrain détectable Perception CD 30)"] },
    ],
    terrain: ["Tunnel étroit (3m de large, désavantage armes lourdes)", "Sol instable (terrain difficile)", "Cristaux lumineux (éclairage faible)", "Éboulement partiel (couverture)", "Plafond bas (pas de vol, pas de saut)"],
    tactics: "L'Ankheg émerge du sol pour attaquer puis replonge. Il vise les personnages isolés. Le froid le ralentit (vitesse réduite de moitié pendant 1 round). Si réduit à 15 HP, il fuit dans les profondeurs.",
    loot: ["Mandibules d'Ankheg (composant alchimique pour acide, 150 PO)", "Glande à acide intacte (3 doses d'acide, 2d6 chacune, 100 PO)", "Cristaux des profondeurs (3, 50 PO chacun, luisent dans le noir)"],
  },
  choices: [
    {
      id: 'choice-deepmine',
      prompt: "Après le sauvetage et le combat, que font les personnages ?",
      options: [
        {
          label: "Explorer la caverne de cristal de Kael",
          description: "Descendre encore pour voir ce que le jeune mineur a trouvé.",
          consequence: "Caverne spectaculaire avec un fragment de Sceau exposé. Informations cruciales sur le réseau de Sceaux sous les montagnes.",
          nextScene: 'scene-2-3-crystal',
        },
        {
          label: "Remonter les mineurs en sécurité",
          description: "Prioriser le sauvetage et remonter tout le monde.",
          consequence: "Sauvetage complet. Gratitude des nains. Le Roi Thorin est impressionné. Accès facilité au Fer Stellaire.",
          nextScene: 'scene-2-3-feast',
          reputationChange: [{ faction: 'Nains de Hammerdeep', amount: 15 }],
        },
        {
          label: "Chasser la créature dans les profondeurs",
          description: "Suivre l'Ankheg blessé pour s'assurer qu'il ne revient pas.",
          consequence: "Pistage (Survie CD 30). Mène à un nid d'Ankhegs plus profond. Combat plus dangereux mais loot supérieur.",
          nextScene: 'scene-2-3-crystal',
        },
      ],
    },
  ],
  loot: [
    "Mandibules d'Ankheg (150 PO)",
    "Cristaux des profondeurs (150 PO total)",
    "Gratitude des mineurs (réputation naine)",
  ],
  nextScenes: ['scene-2-3-crystal', 'scene-2-3-feast'],
  previousScene: 'scene-2-3-forge',
  mapMovement: { from: 'hammerdeep', to: 'hammerdeep-mines' },
};

const scene_2_3_feast: BookScene = {
  id: 'scene-2-3-feast',
  sceneNumber: 72,
  title: "Le Grand Festin de Hammerdeep",
  type: 'social',
  location: "Grande Salle du Roi, Hammerdeep",
  locationId: 'hammerdeep',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le Grand Festin de Hammerdeep est un événement qui défie la raison et l'estomac.

La Grande Salle du Roi est taillée dans un seul bloc de granit rose, ses murs polis reflétant la lumière de mille bougies. Une table longue de trente mètres occupe le centre, et elle ploie — littéralement — sous le poids de la nourriture.

Du sanglier rôti entier, sa peau croustillante dorée et épicée. Des montagnes de pain de pierre nain — dense, nourrissant, capable de casser une dent humaine si vous ne savez pas le tremper dans la sauce. Des fromages des cavernes, affinés dans les profondeurs pendant des décennies. Des champignons géants grillés qui ont le goût de steak. Et de la bière. Des rivières de bière. Bière ambrée, bière noire, bière de cristal (qui brille littéralement dans le noir), et la redoutable Trois-Marteaux — une bière si forte que les nains eux-mêmes la boivent à petites gorgées.

Le Roi Thorin préside depuis un trône de fer à une extrémité de la table. Autour de lui, les chefs de clan, les maîtres-forgerons, et les anciens. Et, à la place d'honneur à sa droite, vos sièges.

Les nains frappent leurs chopes sur la table en rythme. Thorin lève la sienne.

« Ce soir, nous honorons ceux qui sont descendus dans les profondeurs et en sont remontés ! Ceux qui ont sauvé nos frères ! Ceux qui ont le courage de regarder l'ombre en face et de lui mettre un coup de poing ! »

La salle rugit d'approbation.

« Ce soir, vous n'êtes pas des étrangers. Ce soir, vous êtes des nains ! SKOVAAL ! »

Cinq cents nains lèvent leurs chopes. « SKOVAAL ! » Le tonnerre du cri fait vibrer la montagne elle-même.`,
    mood: "Joie massive, camaraderie guerrière, célébration bruyante",
    music: "Chants nains puissants, chopes qui s'entrechoquent, rires tonitruants, tambours festifs",
  },
  gmNotes: [
    { type: 'info', text: "Le festin est l'occasion de cimenter l'alliance naine, d'obtenir des informations sur les légendes locales, et de gagner le respect des chefs de clan. C'est aussi un test social déguisé." },
    { type: 'tip', text: "Trois épreuves sociales au festin : 1) Le Concours de Boisson (Constitution CD 40 pour rivaliser avec un champion nain). 2) Le Chant de Guerre (Performance CD 30 pour improviser un chant glorifiant les nains). 3) Le Récit de Bataille (Persuasion CD 30 pour raconter un exploit). Réussir les trois = alliance totale." },
    { type: 'warning', text: "La Trois-Marteaux est dangereuse : Constitution CD 45 par verre. Échec = ivre (désavantage à tout pendant 4h). Second échec = inconscient pendant 8h. Les nains trouvent ça hilarant." },
    { type: 'secret', text: "Pendant le festin, le chef du Clan des Profondeurs, Dugarn, s'approche discrètement. Il sait que quelque chose rôde dans les mines les plus profondes — pas un animal. Quelque chose d'intelligent. Il n'ose pas en parler au Roi parce que Thorin nie le danger." },
    { type: 'lore', text: "'Skovaal' est le cri de guerre nain. Il signifie littéralement 'Le marteau tombe !' mais est utilisé comme toast universel. Refuser de crier 'Skovaal' quand un toast est porté est considéré comme une insulte mortelle." },
  ],
  npcs: [
    {
      name: "Roi Thorin Poing-de-Fer",
      role: "Roi nain / Allié puissant",
      personality: "Fier, têtu, mais juste. Refuse de montrer la faiblesse. Le festin est sa façon de remercier sans avoir à prononcer le mot.",
      appearance: "Nain imposant, barbe noire tressée avec des anneaux d'or. Couronne de fer simple mais lourde. Yeux noirs perçants. Porte sa hache même au festin.",
      dialogues: {
        greeting: "« Asseyez-vous. Mangez. Buvez. Et si quelqu'un vous dit que les nains ne savent pas faire la fête, cassez-lui la chope sur le crâne. C'est un mensonge. »",
        info: "« Mes forgerons travaillent le Fer Stellaire jour et nuit. Le composant sera prêt dans deux jours. En attendant, profitez de mon hospitalité. Les nains de Hammerdeep ne sont pas connus pour leur subtilité, mais notre bière est honnête et notre amitié est éternelle. »",
        farewell: "« Quand vous partirez, vous emporterez le Fer Stellaire, vingt guerriers nains, et la promesse de Hammerdeep. Si les Sceaux tombent et que le monde a besoin de marteaux pour le rebâtir... les nains seront là. Comme toujours. »",
      },
      stats: { hp: 95, atk: 20, ac: 20 },
    },
  ],
  skillChecks: [
    { skill: 'Constitution', dc: 40, success: "Vous tenez tête au champion de boisson nain, chope après chope. Au septième verre, il titube. Vous êtes toujours debout. La salle explose de joie.", failure: "Au quatrième verre, le monde tourne. Vous êtes ivre mais vous avez gagné le respect pour avoir essayé." },
    { skill: 'Performance', dc: 30, success: "Votre chant de guerre improvise sur les exploits des nains. Les paroles sont maladroites mais le cœur y est. Les nains reprennent le refrain en chœur.", failure: "Votre chant est... créatif. Les nains rient mais applaudissent quand même l'effort." },
    { skill: 'Persuasion', dc: 30, success: "Votre récit de bataille captive la table. Les nains tapent du poing en rythme. Thorin lui-même hoche la tête. Vous avez gagné votre place.", failure: "L'histoire est bonne mais la livraison manque de punch. Les nains sont polis mais pas impressionnés." },
  ],
  choices: [
    {
      id: 'choice-feast',
      prompt: "Comment les personnages profitent-ils du festin ?",
      options: [
        {
          label: "Relever les trois épreuves",
          description: "Concours de boisson, chant de guerre, et récit de bataille.",
          consequence: "Alliance naine totale. 20 guerriers, Fer Stellaire, accès illimité aux Forges, et titre honorifique nain.",
          nextScene: 'scene-2-3-crystal',
          reputationChange: [{ faction: 'Nains de Hammerdeep', amount: 20 }],
        },
        {
          label: "Parler discrètement avec Dugarn",
          description: "S'éloigner du festin pour écouter les inquiétudes du chef de clan.",
          consequence: "Dugarn révèle l'existence de quelque chose d'intelligent dans les mines profondes. Piste vers une menace non résolue.",
          nextScene: 'scene-2-3-crystal',
        },
        {
          label: "Profiter du festin sans épreuves",
          description: "Manger, boire modérément, et socialiser.",
          consequence: "Alliance standard. 10 guerriers, Fer Stellaire. Les nains vous respectent mais ne vous considèrent pas comme des héros.",
          nextScene: 'scene-2-transition-camp',
        },
        {
          label: "Discuter stratégie avec Thorin",
          description: "Profiter de la bonne humeur du Roi pour planifier la défense des Sceaux.",
          consequence: "Thorin offre des plans militaires et des connaissances sur les tunnels sous Aethelgard. Carte stratégique des Sceaux sous les montagnes.",
          nextScene: 'scene-2-3-crystal',
        },
      ],
    },
  ],
  loot: [
    "Titre de 'Frère de la Montagne' (accès permanent à Hammerdeep)",
    "Chope de cérémonie en Fer Stellaire (50 PO, symbole de l'alliance)",
    "3 tonneaux de Trois-Marteaux (pour usage ou revente, 25 PO chacun)",
  ],
  nextScenes: ['scene-2-3-crystal', 'scene-2-transition-camp'],
  previousScene: 'scene-2-3-forge',
};

const scene_2_3_crystal: BookScene = {
  id: 'scene-2-3-crystal',
  sceneNumber: 73,
  title: "La Caverne de Cristal",
  type: 'revelation',
  location: "Caverne cachée, niveau 17, Hammerdeep",
  locationId: 'hammerdeep-mines',
  estimatedMinutes: 25,
  readAloud: {
    text: `Le jeune Kael vous guide à travers un passage si étroit que vous devez avancer de profil. La roche ici est d'un noir total, sans la moindre veine de minerai. C'est de l'obsidienne naturelle, polie par le temps, froide au toucher.

Puis le passage s'ouvre, et vous perdez le souffle.

La caverne est un dôme parfait de cinquante mètres de diamètre. Chaque centimètre de sa surface est couvert de cristaux — pas des cristaux ordinaires, mais des formations translucides d'un bleu profond qui émettent leur propre lumière, douce et pulsante, comme une respiration.

Le sol est un miroir de cristal poli naturellement. En marchant dessus, vos pieds ne font aucun bruit. Les cristaux au plafond projettent des motifs de lumière sur le sol qui ressemblent à des constellations.

Au centre de la caverne, un cristal unique s'élève du sol comme un pilier. Il fait trois mètres de haut et la largeur d'un homme. Sa lumière est différente des autres — plus intense, plus régulière. Il pulse exactement au même rythme que votre cœur. Et quand vous vous approchez, le rythme change pour s'aligner sur le vôtre.

Le cristal n'est pas un cristal. C'est un nœud du Sceau. Le point où l'énergie du Sceau des Montagnes se concentre. Et il est beau. Terriblement, dangereusement beau.

Kael murmure : « Quand je l'ai touché... j'ai vu le monde d'en dessous. Un monde d'ombres et de feu. Et quelque chose qui attendait derrière une porte. Quelque chose qui m'a souri. »`,
    mood: "Émerveillement terrible, beauté dangereuse, révélation cosmique",
    music: "Résonance cristalline pure, harmoniques naturelles, silence sacré",
  },
  gmNotes: [
    { type: 'info', text: "La caverne de cristal est un point de puissance majeur. Le cristal central est un nœud du réseau de Sceaux — le 'cœur' du Sceau des Montagnes. Le toucher permet une vision directe de l'état du réseau." },
    { type: 'tip', text: "Toucher le cristal (volontaire) : jet de Sagesse CD 30. Succès = vision claire de l'état de TOUS les Sceaux d'Aethelgard (quels sont intacts, fissurés, brisés). Échec = vision fragmentaire + 1d8 dégâts psychiques." },
    { type: 'warning', text: "Extraire un cristal de la caverne déclenche une résonance : 3d8 dégâts de tonnerre à tout le monde dans 10m. Les cristaux extraits perdent leur lumière en 24h sauf s'ils sont enchâssés dans du Fer Stellaire." },
    { type: 'secret', text: "La gemme rare au centre contient un fragment de mémoire de l'un des Sept Mages originaux — le nain Forgeron Durin qui a forgé le Sceau des Montagnes. Si extraite correctement et lue par un arcaniste, elle révèle le rituel complet de restauration." },
    { type: 'lore', text: "Les cavernes de cristal existent à chaque point de nœud du réseau de Sceaux. Chaque civilisation les découvre et les interprète différemment : les nains comme des trésors, les elfes comme des lieux sacrés, les humains comme des anomalies géologiques. En réalité, ce sont les terminaux du réseau de contention créé par les Sept." },
  ],
  skillChecks: [
    { skill: 'Sagesse', dc: 30, success: "En touchant le cristal, une vision panoramique vous submerge : sept points de lumière sur une carte d'Aethelgard. Trois brillent fort (Sceaux intacts), deux clignotent (fissurés), deux sont presque éteints (critiques).", failure: "La vision est un kaléidoscope de lumière et de douleur. 1d8 dégâts psychiques. Fragments d'images : des fissures, des ombres, un œil." },
    { skill: 'Arcanes', dc: 40, success: "Le cristal central contient une mémoire magique. Vous percevez la technique du Scellement — le rituel exact utilisé par les Sept pour créer les Sceaux. Information inestimable.", failure: "Le cristal est saturé de magie ancienne mais sa complexité dépasse vos capacités d'analyse actuelles." },
    { skill: 'Investigation', dc: 30, success: "Les motifs de lumière au sol ne sont pas aléatoires — c'est une carte. Les positions des cristaux au plafond correspondent aux positions des Sceaux dans le monde. Vous pouvez cartographier le réseau.", failure: "Les motifs sont beaux mais semblent aléatoires." },
  ],
  choices: [
    {
      id: 'choice-crystal',
      prompt: "Face au cristal-nœud du Sceau, que font les personnages ?",
      options: [
        {
          label: "Toucher le cristal pour une vision",
          description: "Accepter le risque pour obtenir une vue d'ensemble de tous les Sceaux.",
          consequence: "Sagesse CD 30. Succès = carte complète des Sceaux. Information stratégique majeure pour la suite de la campagne.",
          nextScene: 'scene-2-transition-dream',
        },
        {
          label: "Extraire un petit cristal",
          description: "Prendre un échantillon pour étude par Theron ou la Guilde.",
          consequence: "3d8 dégâts de tonnerre dans 10m. Cristal obtenu mais perd sa lumière en 24h sans Fer Stellaire.",
          nextScene: 'scene-2-transition-camp',
        },
        {
          label: "Cartographier la caverne",
          description: "Étudier les motifs de lumière et créer une carte du réseau de Sceaux.",
          consequence: "Investigation CD 30. Carte du réseau complet. Indique les Sceaux les plus en danger.",
          nextScene: 'scene-2-transition-camp',
        },
        {
          label: "Protéger la caverne",
          description: "Sceller l'accès pour empêcher le Cercle de la trouver.",
          consequence: "Éboulement contrôlé (Athlétisme CD 30) pour sceller le passage. La caverne est protégée mais inaccessible.",
          nextScene: 'scene-2-transition-camp',
          reputationChange: [{ faction: 'Nains de Hammerdeep', amount: 10 }],
        },
      ],
    },
  ],
  loot: [
    "Vision du réseau de Sceaux (connaissance stratégique)",
    "Cristal de Nœud (si extrait, composant rituel inestimable)",
    "Carte du réseau de Sceaux (si cartographiée)",
    "Mémoire de Forgeron Durin (rituel de restauration, si déchiffrée)",
  ],
  nextScenes: ['scene-2-transition-camp', 'scene-2-transition-dream'],
  previousScene: 'scene-2-3-deepmine',
  mapMovement: { from: 'hammerdeep-mines', to: 'hammerdeep' },
};

// ============================================================================
// SCÈNES DE TRANSITION (3 scènes)
// ============================================================================

const scene_2_transition_road: BookScene = {
  id: 'scene-2-transition-road',
  sceneNumber: 80,
  title: "Sur les Routes d'Aethelgard",
  type: 'transition',
  location: "Routes entre régions",
  locationId: 'val-dore-road',
  estimatedMinutes: 20,
  readAloud: {
    text: `La route s'étire devant vous comme un ruban jeté sur le monde.

Aethelgard déploie ses paysages au rythme de vos pas. Les collines dorées du Val cèdent la place à des plaines herbues battues par le vent, puis à des forêts sombres dont les arbres se penchent au-dessus du chemin comme des sentinelles curieuses.

Le voyage entre les régions est long — des jours de marche, de repos au bord du chemin, et de conversations qui se nouent entre les membres du groupe. C'est dans ces moments que les vrais liens se forment : non pas dans la chaleur du combat, mais dans le silence du chemin partagé.

Au troisième jour, un chariot vous rattrape. Un marchand ambulant, tirant un attelage surchargé de marchandises hétéroclites. Le mulet qui tire le chariot vous regarde avec l'expression résignée de quelqu'un qui a vu trop de routes.

Le marchand — un halfelin souriant au chapeau plus large que lui — vous salue avec enthousiasme.

« Des voyageurs ! Par les pieds poilus de ma grand-mère, ça fait trois jours que je ne parle qu'au mulet ! Et le mulet est un interlocuteur terrible. Il est toujours négatif. Approchez, approchez ! J'ai des nouvelles, des marchandises, et des histoires. Dans cet ordre ou dans un autre ! »`,
    mood: "Voyage contemplatif, rencontre de route, légèreté bienvenue",
    music: "Thème de voyage, flûtes douces, sabots sur la terre, vent dans les herbes",
  },
  gmNotes: [
    { type: 'info', text: "Scène de transition entre deux régions. Permet le roleplay, l'achat de marchandises, et la distribution d'informations. Le marchand halfelin est un vecteur de rumeurs fraîches." },
    { type: 'tip', text: "Utilisez cette scène pour : 1) Donner des rumeurs sur la prochaine destination. 2) Permettre aux joueurs de préparer leurs stratégies. 3) Vendre des consommables. 4) Développer les relations entre PJ." },
    { type: 'warning', text: "Rencontre aléatoire possible (1 chance sur 4) : bandits de grand chemin (3d4, CR 1/4 chacun), patrouille de gardes, réfugiés fuyant une zone corrompue, ou créature sauvage (ours, loups)." },
    { type: 'secret', text: "Le marchand halfelin, Pip, transporte sans le savoir un colis pour le Cercle des Cendres — une caisse scellée qu'on lui a demandé de livrer. S'il est mis au courant, il est horrifié et offre la caisse aux PJ. Elle contient des composants rituels et une lettre codée." },
  ],
  npcs: [
    {
      name: "Pip le Marchand Ambulant",
      role: "Marchand / Comic relief / Source d'information involontaire",
      personality: "Bavard, optimiste compulsif, incapable de garder un secret. Le genre de personne qui rend les routes moins longues malgré tout.",
      appearance: "Halfelin, la quarantaine, chapeau de paille trois fois trop grand, gilet à poches innombrables. Mulet nommé 'Philosophie' parce qu'il 'refuse de bouger sans bonne raison'.",
      dialogues: {
        greeting: "« Oh par les chaussettes de Solarius, des gens ! Des VRAIS gens ! Pip Taillevent, marchand ambulant extraordinaire, à votre service ! Qu'est-ce que je peux vous vendre ? J'ai de tout ! Des potions, des cartes, des savons artisanaux, et un fromage qui a probablement acquis la conscience. »",
        info: "« Des nouvelles ? J'en ai ! Les elfes ont fermé la Sylve — personne n'entre. Les nains recrutent des mercenaires — mauvais signe. Et dans les Cités Libres, on parle d'un navire fantôme qui longe la côte la nuit. Avec des lumières vertes. Vous savez ce que ça veut dire ? Moi non plus, mais ça fait froid dans le dos. »",
        quest: "« Oh, tant que j'y pense — un type bizarre m'a payé 50 pièces d'or pour livrer une caisse à Port-Tempête. Pas de questions, pas de problèmes, il a dit. Mais la caisse... elle bourdonne. Les caisses normales ne bourdonnent pas, si ? Vous voulez y jeter un œil ? »",
        farewell: "« Bonne route ! Si vous croisez d'autres marchands, dites-leur que Pip a les meilleurs prix de la route ! C'est un mensonge, mais bon, la publicité, hein ? »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Intuition', dc: 25, success: "Pip est sincèrement ce qu'il prétend être : un marchand bavard. Mais la caisse qu'il transporte dégage une aura étrange.", failure: "Pip semble inoffensif. Juste un halfelin bavard de plus." },
    { skill: 'Arcanes', dc: 30, success: "La caisse scellée contient des composants magiques. De la veinérite. De la cendre d'os. Des composants rituels du Cercle des Cendres.", failure: "La caisse est scellée magiquement. Difficile de sentir quoi que ce soit sans l'ouvrir." },
    { skill: 'Survie', dc: 25, success: "Le campement du soir est bien choisi : un creux abrité du vent, avec de l'eau potable et du bois sec. Repos long optimal.", failure: "Le terrain est plat et exposé. Repos long mais risque de rencontre nocturne augmenté." },
  ],
  choices: [
    {
      id: 'choice-road',
      prompt: "Que font les personnages pendant le voyage ?",
      options: [
        {
          label: "Acheter des marchandises à Pip",
          description: "Profiter du marchand ambulant pour s'équiper.",
          consequence: "Accès à : potions de soin (10 PO), rations (2 PO/jour), carte régionale (15 PO), torches enchantées (5 PO chacune, durent 8h).",
          nextScene: 'scene-2-transition-camp',
        },
        {
          label: "Inspecter la caisse suspecte",
          description: "Ouvrir ou examiner le colis destiné au Cercle.",
          consequence: "Composants rituels récupérés. Lettre codée avec le nom d'un contact à Port-Tempête. Pip est horrifié mais reconnaissant.",
          nextScene: 'scene-2-transition-camp',
        },
        {
          label: "Voyager en silence et observer",
          description: "Se concentrer sur le trajet et les alentours.",
          consequence: "Perception CD 25. Repérer des signes de la corruption : oiseaux qui fuient, zones d'herbe morte, silence anormal. La menace s'étend.",
          nextScene: 'scene-2-transition-camp',
        },
        {
          label: "Forcer l'allure",
          description: "Marcher plus vite pour arriver avant le Cercle.",
          consequence: "Constitution CD 30 pour tout le groupe. Succès : arrivée 1 jour plus tôt. Échec : 1 niveau de fatigue.",
          nextScene: 'scene-2-transition-camp',
          skillCheck: { skill: 'Constitution', dc: 30, success: "Vous gagnez un jour de voyage. L'avance pourrait être cruciale.", failure: "L'épuisement vous rattrape. Un niveau de fatigue pour ceux qui échouent." },
        },
      ],
    },
  ],
  nextScenes: ['scene-2-transition-camp'],
  previousScene: 'scene-1-4-aftermath',
};

const scene_2_transition_camp: BookScene = {
  id: 'scene-2-transition-camp',
  sceneNumber: 81,
  title: "Camp de Repos entre les Régions",
  type: 'rest',
  location: "Campement dans la nature",
  locationId: 'val-dore-road',
  estimatedMinutes: 20,
  readAloud: {
    text: `Le feu de camp projette des ombres dansantes sur les visages fatigués.

C'est l'une de ces nuits où le voyage pèse sur les épaules. Les pieds sont douloureux, les muscles endoloris, et l'esprit saturé de tout ce que vous avez vu et vécu. Le monde est plus grand et plus dangereux que vous ne le pensiez, et la tâche qui vous attend semble parfois... impossible.

Mais le feu est chaud. Les étoiles sont brillantes. Et vous n'êtes pas seuls.

Autour du feu, chacun trouve sa place. Quelqu'un entretient les flammes. Quelqu'un affûte une arme. Quelqu'un regarde les étoiles en silence. Et quelqu'un, inévitablement, sort la gourde.

C'est dans ces moments que les conversations vraies émergent. Pas les stratégies, pas les plans — les confidences. Les peurs qu'on n'avoue pas en plein jour. Les espoirs qu'on n'ose pas formuler à voix haute. Les souvenirs qui reviennent quand la garde est baissée.

Le vent porte une odeur de pin et de terre mouillée. Quelque part, un ruisseau murmure. Et lentement, naturellement, le camp trouve son rythme. Le bruit des conversations cède la place au silence. Le silence cède la place au sommeil.

Demain sera un autre jour de marche, de découvertes, et peut-être de danger. Mais cette nuit, sous les étoiles d'Aethelgard, vous êtes en paix.

Presque.`,
    mood: "Intimité nocturne, vulnérabilité partagée, repos du guerrier",
    music: "Feu de camp, grillons, vent dans les arbres, silence",
  },
  gmNotes: [
    { type: 'info', text: "Scène de repos et de développement des personnages. Pas de danger immédiat (sauf si le MJ veut une rencontre). Focalisée sur le roleplay entre PJ et les interactions avec les PNJ compagnons." },
    { type: 'tip', text: "Posez une question personnelle à chaque joueur : 'Qu'est-ce que votre personnage regrette ?', 'De quoi a-t-il peur ?', 'S'il pouvait être ailleurs, où serait-il ?' Offrez l'Inspiration pour les réponses sincères." },
    { type: 'warning', text: "Si un PNJ compagnon est présent (Élise, Marcus, un allié de faction), c'est le moment de développer sa personnalité et ses motivations. Un PNJ qui partage une confidence devient un allié plus crédible." },
    { type: 'secret', text: "Pendant le sommeil, chaque PJ fait un rêve différent lié à sa classe/son passé. Le MJ adapte : un guerrier rêve de batailles futures, un mage de connaissances interdites, un prêtre d'un message de sa divinité. Un élément commun dans tous les rêves : l'œil vert qui les observe." },
  ],
  skillChecks: [
    { skill: 'Médecine', dc: 20, success: "Vous soignez les ampoules, les écorchures et les petites blessures du voyage. Chaque PJ récupère 1d6 PV supplémentaires.", failure: "Les soins sont basiques mais suffisants pour le repos." },
    { skill: 'Survie', dc: 20, success: "Le campement est parfaitement organisé : feu efficace, guet optimisé, provisions rationnées. Avantage aux jets de Perception pendant la nuit.", failure: "Le campement est fonctionnel mais sans plus." },
    { skill: 'Performance', dc: 25, success: "Un chant, une histoire, ou une musique autour du feu. Le moral du groupe remonte. Tout le monde reçoit l'Inspiration.", failure: "L'effort est apprécié même s'il manque de technique. Le groupe sourit quand même." },
  ],
  choices: [
    {
      id: 'choice-camp-rest',
      prompt: "Comment les personnages passent-ils la soirée ?",
      options: [
        {
          label: "Conversations profondes",
          description: "Partager des confidences et renforcer les liens du groupe.",
          consequence: "Roleplay libre. Inspiration pour chaque joueur qui partage quelque chose de significatif. Les PNJ compagnons révèlent un secret personnel.",
          nextScene: 'scene-2-transition-dream',
        },
        {
          label: "Entraînement nocturne",
          description: "Profiter du calme pour s'entraîner et affiner ses compétences.",
          consequence: "Chaque PJ choisit une compétence. Jet CD 25 : succès = +2 temporaire à cette compétence pour la prochaine scène. Échec = fatigue légère.",
          nextScene: 'scene-2-transition-dream',
        },
        {
          label: "Étude et préparation",
          description: "Relire les notes, étudier les cartes, et planifier la suite.",
          consequence: "Avantage au premier jet de la prochaine scène. Le MJ peut révéler un détail oublié dans les notes des joueurs.",
          nextScene: 'scene-2-transition-dream',
        },
        {
          label: "Dormir immédiatement",
          description: "Le repos est plus important que tout. Dormir profondément.",
          consequence: "Repos long optimal. Tous les PV et sorts récupérés. Mais les rêves sont plus intenses...",
          nextScene: 'scene-2-transition-dream',
        },
      ],
    },
  ],
  nextScenes: ['scene-2-transition-dream'],
  previousScene: 'scene-2-transition-road',
};

const scene_2_transition_dream: BookScene = {
  id: 'scene-2-transition-dream',
  sceneNumber: 82,
  title: "Le Rêve Prophétique",
  type: 'revelation',
  location: "Espace onirique",
  locationId: 'dream-realm',
  estimatedMinutes: 15,
  readAloud: {
    text: `Le rêve vous prend comme une vague.

Un instant vous dormez, bercés par le crépitement du feu et le chant des grillons. L'instant suivant, vous êtes ailleurs. Pas nulle part — ailleurs. Un espace qui n'a pas de nom, qui n'existe pas quand personne n'y rêve, et qui est pourtant plus réel que le sol sous votre corps endormi.

Vous flottez dans un vide gris. Pas de haut, pas de bas. Pas de son. Pas de sensation physique. Juste... la conscience. Pure, dépouillée de tout.

Puis l'Entité apparaît.

Pas d'un coup. Lentement. Comme une aube qui monte. D'abord la lueur verte, faible, puis croissante. Puis la forme : un œil immense, aussi large que le ciel, avec une pupille verticale qui contient des galaxies. L'iris est fait de mille nuances de vert, chacune pulsant à un rythme différent, créant une mosaïque hypnotique.

L'Entité ne parle pas. Elle montre.

Une vision : les sept Sceaux, vus de l'intérieur. Des chaînes de lumière dorée tendues entre les piliers de la réalité. Certaines sont intactes, brillantes. D'autres sont ternies, fissurées, prêtes à rompre. Et derrière chaque chaîne, dans l'ombre, quelque chose pousse. Quelque chose de vaste et de patient.

L'Entité vous montre le prochain Sceau en danger. L'image est claire : un lieu que vous reconnaissez peut-être, un danger que vous pouvez anticiper, et un chemin que vous pouvez suivre.

Puis, pour la première fois, l'Entité fait quelque chose de nouveau. Elle vous offre un choix.

Deux chemins apparaissent dans la vision. Deux directions. Deux sceaux en danger. Vous ne pouvez pas sauver les deux en même temps. Lequel choisissez-vous ?

L'Entité attend. Elle ne juge pas. Elle observe. Avec cette patience qui est peut-être la chose la plus terrifiante chez elle.

Puis le rêve se dissipe. Vous ouvrez les yeux. L'aube peint le ciel de rose et d'or. Le feu est mort, les étoiles pâlissent, et le goût de cendre est sur vos lèvres.

Mais cette fois, il y a autre chose aussi. Une sensation de direction. De but. Comme si une boussole invisible avait été implantée dans votre poitrine, pointant vers le prochain Sceau.

Le voyage continue.`,
    mood: "Cosmique, solennel, choix impossible, beauté terrible",
    music: "Silence absolu puis harmoniques cristallines, crescendo orchestral, retour au silence",
  },
  gmNotes: [
    { type: 'info', text: "Ce rêve est le mécanisme de transition principal de l'Acte II. Il permet au MJ de diriger les joueurs vers la prochaine région tout en leur donnant l'illusion du choix. Les deux Sceaux en danger sont les deux prochaines aventures possibles." },
    { type: 'tip', text: "Adaptez les deux choix aux régions non encore visitées. Ex : si les PJ n'ont pas fait les Monts ni la Sylve, proposez-les. Si une seule reste, le deuxième choix peut être une quête secondaire unique." },
    { type: 'warning', text: "Le Sceau non choisi sera 'partiellement brisé' quand les PJ y arriveront. Conséquence narrative : la situation sera plus grave, les ennemis plus nombreux, mais le Sceau sera encore sauvable." },
    { type: 'secret', text: "L'Entité ne montre pas ces visions par bienveillance. Elle teste les PJ pour comprendre leur nature. Chaque choix révèle leurs priorités. L'Entité collectionne ces informations pour... plus tard. Dans l'Acte III, elle utilisera cette connaissance contre eux." },
    { type: 'lore', text: "Les rêves prophétiques sont possibles parce que les PJ ont été 'marqués' par le premier contact avec le Sceau à Sol-Aureus. Cette marque est invisible mais permanente — elle fait d'eux des 'antennes' du réseau de Sceaux. C'est pourquoi ils sentent les perturbations et reçoivent les visions." },
  ],
  skillChecks: [
    { skill: 'Sagesse', dc: 30, success: "Vous maintenez votre lucidité dans le rêve. Les détails sont clairs : emplacement exact du prochain Sceau, type de danger, et fenêtre temporelle. Avantage au premier jet dans la prochaine région.", failure: "Le rêve est intense mais confus. Des images fragmentaires, des directions approximatives. Vous savez où aller, mais pas exactement ce qui vous attend." },
    { skill: 'Arcanes', dc: 35, success: "Vous analysez la vision elle-même : l'Entité utilise les fissures des Sceaux comme canaux de communication. Plus les Sceaux faiblissent, plus ses projections sont puissantes. Un cercle vicieux.", failure: "La vision est surnaturelle mais son mécanisme vous échappe." },
    { skill: 'Intuition', dc: 35, success: "L'Entité n'est pas altruiste. Elle montre les Sceaux en danger parce que leur destruction sert ses intérêts. Mais paradoxalement, elle semble aussi... curieuse. Comme si observer votre choix l'intéressait autant que le résultat.", failure: "Impossible de sonder les motivations d'un être aussi alien." },
  ],
  choices: [
    {
      id: 'choice-dream',
      prompt: "L'Entité montre deux Sceaux en danger. Lequel les personnages choisissent-ils ?",
      options: [
        {
          label: "Le Sceau des Montagnes",
          description: "Les Monts Cœur-de-Fer. Les nains. La force brute contre l'horreur souterraine.",
          consequence: "Direction : Hammerdeep. Le Sceau est fissuré mais pas brisé. Course contre le temps pour le renforcer avant que les forces d'en dessous ne percent.",
          nextScene: 'scene-2-1-1',
          reputationChange: [{ faction: 'Nains de Hammerdeep', amount: 5 }],
        },
        {
          label: "Le Sceau de la Forêt",
          description: "La Sylve d'Émeraude. Les elfes. La nature corrompue et les esprits anciens.",
          consequence: "Direction : la Sylve. Le Sceau est empoisonné par la corruption. Il faut identifier et éliminer la source avant que l'Arbre-Monde ne meure.",
          nextScene: 'scene-2-5-campelfe',
          reputationChange: [{ faction: 'Elfes de la Sylve', amount: 5 }],
        },
        {
          label: "Le Sceau de la Mer (si disponible)",
          description: "La Côte des Orages. Les Cités Libres. Pirates et Sceau sous-marin.",
          consequence: "Direction : Port-Tempête. Le Cercle a un navire en route vers le Sceau. Course maritime pour les intercepter.",
          nextScene: 'scene-2-6-arena',
          reputationChange: [{ faction: 'Cités Libres', amount: 5 }],
        },
        {
          label: "Résister au rêve",
          description: "Tenter de rejeter la vision et de choisir indépendamment.",
          consequence: "Sagesse CD 45. Succès : vous brisez le lien. Liberté totale mais perte de la 'boussole intérieure'. Échec : la vision se réimpose, plus intense. 1d8 dégâts psychiques.",
          nextScene: 'scene-2-transition-road',
          skillCheck: { skill: 'Sagesse', dc: 45, success: "Vous arrachez votre esprit à l'emprise de l'Entité. Elle recule, surprise. Pour la première fois, vous sentez de l'étonnement dans cet esprit alien. Et peut-être... du respect.", failure: "L'Entité tient bon. Les visions reviennent, plus fortes. 1d8 dégâts psychiques. Mais vous avez l'impression qu'elle a noté votre résistance." },
        },
      ],
    },
  ],
  nextScenes: ['scene-2-1-1', 'scene-2-5-campelfe', 'scene-2-6-arena', 'scene-2-transition-road'],
  previousScene: 'scene-2-transition-camp',
};

// ============================================================================
// EXPORT
// ============================================================================

export const ACT_2_SCENES_EXPANSION: BookScene[] = [
  // Chapitre 5 - La Sylve d'Émeraude
  scene_2_5_campelfe,
  scene_2_5_corruption,
  scene_2_5_spirits,
  scene_2_5_hunter,
  // Chapitre 6 - Les Cités Libres
  scene_2_6_arena,
  scene_2_6_blackmarket,
  scene_2_6_shipyard,
  scene_2_6_tavern_brawl,
  // Chapitre 3 (Acte 2) - Les Monts Cœur-de-Fer
  scene_2_3_forge,
  scene_2_3_deepmine,
  scene_2_3_feast,
  scene_2_3_crystal,
  // Scènes de Transition
  scene_2_transition_road,
  scene_2_transition_camp,
  scene_2_transition_dream,
];
