/**
 * QUÊTES SECONDAIRES — ACTE 1 : L'Éveil des Héros
 * 6 quêtes (30 scènes) liées à Sol-Aureus et ses environs
 */

import type { BookScene, BookChapter } from './gm-book-data';

// ============================================================================
// QUÊTE 1 : Le Fantôme du Pont-Vieux (Mystère) — 4 scènes
// ============================================================================

const sq1_scenes: BookScene[] = [
  {
    id: 'sq1-scene1',
    sceneNumber: 1,
    title: 'Rumeurs Nocturnes',
    type: 'social',
    location: 'Pont-Vieux de Sol-Aureus',
    locationId: 'sol-aureus-pont-vieux',
    estimatedMinutes: 25,
    readAloud: {
      text: `La nuit tombe sur Sol-Aureus et les lanternes projettent des ombres dansantes sur les pavés humides. Près de la taverne du Coq Doré, un attroupement murmure avec agitation. Une vieille marchande de poisson, Mère Gisèle, agrippe le bras du premier aventurier qu'elle voit. « Il est revenu ! Le fantôme du Pont-Vieux ! Je l'ai vu de mes propres yeux — une silhouette blafarde qui flottait au-dessus de l'eau, poussant un cri à glacer le sang. Trois nuits de suite maintenant. Les pêcheurs n'osent plus traverser après le coucher du soleil. »`,
      mood: 'mystérieux, inquiet',
      music: 'Ambiance urbaine nocturne, violon lointain',
    },
    gmNotes: [
      { type: 'info', text: `Le fantôme est réel — c'est l'esprit d'Aldric Valmonte, un marchand assassiné il y a 40 ans. Son meurtrier, l'actuel conseiller Renaud Daubry, vit encore et siège au conseil de la ville.` },
      { type: 'tip', text: `Laissez les PJ interviewer plusieurs témoins pour construire l'ambiance de mystère. Chaque témoin a un détail différent.` },
      { type: 'secret', text: `Si un PJ a le background Noble, il reconnaîtra le nom Valmonte — une famille marchande autrefois prospère qui a mystérieusement décliné.` },
    ],
    npcs: [
      {
        name: 'Mère Gisèle',
        role: 'Marchande de poisson / témoin',
        personality: 'Superstitieuse, bavarde, sincère',
        appearance: 'Femme âgée, tablier taché, mains noueuses, yeux vifs',
        dialogues: {
          greeting: `« Ah, des aventuriers ! Dieu merci ! Personne ne nous écoute ici ! »`,
          info: `« Le fantôme apparaît toujours à la troisième heure du matin. Il marche au milieu du pont, s'arrête, puis pousse un hurlement terrible avant de plonger dans l'eau. Et chaque matin, on retrouve du givre sur les pierres — en plein été ! »`,
          quest: `« Si vous êtes aussi braves qu'on le dit, allez au pont cette nuit. Mais emportez du sel et de la sauge — ma grand-mère disait que ça repousse les revenants. »`,
          farewell: `« Que la Lumière vous protège. Moi, je ne remets plus les pieds là-bas. »`,
        },
      },
      {
        name: 'Gareth le Veilleur',
        role: 'Garde de nuit',
        personality: 'Pragmatique, sceptique mais ébranlé',
        appearance: 'Homme trapu, cicatrice au menton, armure de cuir usée',
        secret: `Il a vu le fantôme murmurer un nom — « Renaud » — mais il a trop peur du conseiller pour le répéter.`,
        dialogues: {
          greeting: `« Vous venez pour le fantôme ? Bah. C'est probablement un ivrogne qui... non, en fait, je ne sais plus quoi penser. »`,
          info: `« J'ai fait ma ronde au pont hier. La température a chuté d'un coup. Et j'ai vu... j'ai vu une forme lumineuse. Elle m'a regardé. J'ai senti une tristesse immense, comme si tout le malheur du monde pesait sur mes épaules. »`,
          farewell: `« Faites attention. Quoi que ce soit, c'est pas naturel. »`,
        },
      },
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 12, success: `Gareth avoue que le fantôme a murmuré un nom : « Renaud ». Cela pointe vers le conseiller Daubry.`, failure: `Gareth reste évasif et refuse d'en dire plus.` },
      { skill: 'Histoire', dc: 14, success: `Le PJ se souvient que la famille Valmonte possédait un comptoir commercial sur le pont il y a des décennies, avant qu'un incendie ne détruise tout.`, failure: `Le nom Valmonte ne dit rien au PJ.` },
    ],
    choices: [
      {
        id: 'sq1-c1',
        prompt: 'Comment les aventuriers abordent-ils l\'enquête ?',
        options: [
          {
            label: 'Veillée au pont',
            description: 'Attendre le fantôme cette nuit même sur le pont',
            consequence: 'Rencontre directe avec le spectre — scène dramatique',
            nextScene: 'sq1-scene2',
          },
          {
            label: 'Recherches aux archives',
            description: 'Fouiller les registres de la ville pour en savoir plus sur le pont',
            consequence: 'Découverte du meurtre d\'Aldric Valmonte avant la confrontation',
            nextScene: 'sq1-scene2',
            skillCheck: { skill: 'Investigation', dc: 13, success: 'Trouvent le rapport du meurtre non résolu d\'Aldric Valmonte, daté de 40 ans.', failure: 'Les archives sont mal rangées, ils ne trouvent qu\'une mention vague.' },
          },
        ],
      },
    ],
    nextScenes: ['sq1-scene2'],
  },
  {
    id: 'sq1-scene2',
    sceneNumber: 2,
    title: 'La Rencontre Spectrale',
    type: 'revelation',
    location: 'Pont-Vieux, minuit',
    locationId: 'sol-aureus-pont-vieux',
    estimatedMinutes: 30,
    readAloud: {
      text: `L'air se glace soudainement. Votre souffle forme des nuages blancs malgré la douceur de la nuit d'été. Les lanternes du pont vacillent, puis s'éteignent une à une. Dans le silence qui s'installe, vous entendez d'abord un sanglot — long, déchirant, inhumain. Puis une lueur bleutée émerge de sous le pont, montant lentement comme une bulle de lumière. La forme prend les contours d'un homme en vêtements de marchand, le visage tordu de douleur. Ses yeux — deux puits de lumière froide — se posent sur vous. « Écoutez... » murmure-t-il d'une voix qui semble venir de très loin. « Mon sang crie justice... quarante ans dans l'eau noire... il m'a trahi... Renaud... mon ami Renaud... »`,
      mood: 'glaçant, tragique',
      music: 'Drone grave, chœur éthéré',
    },
    gmNotes: [
      { type: 'info', text: `Le spectre d'Aldric n'est pas hostile mais désespéré. Il peut montrer des visions de son meurtre si les PJ acceptent de le toucher — jet de Sagesse DC 13 pour supporter la vision.` },
      { type: 'warning', text: `Si un PJ attaque le spectre, celui-ci disparaît en hurlant et ne revient pas pendant 3 nuits, compliquant l'enquête.` },
      { type: 'lore', text: `Aldric était le partenaire commercial de Renaud Daubry. Renaud l'a assassiné pour s'emparer de leur fortune commune et a fait croire à un accident.` },
    ],
    npcs: [
      {
        name: 'Aldric Valmonte (spectre)',
        role: 'Victime / esprit tourmenté',
        personality: 'Désespéré, confus par moments, lucide par éclairs',
        appearance: 'Silhouette translucide bleutée, vêtements de marchand, plaie béante au dos',
        secret: `Si on lui montre un objet ayant appartenu à Renaud, il peut montrer la scène complète du meurtre.`,
        dialogues: {
          greeting: `« Vous... vous me voyez ? Enfin... quelqu'un qui ne fuit pas... »`,
          info: `« Renaud Daubry. Mon associé. Mon ami. Il m'a invité sur ce pont pour fêter notre nouveau contrat. Puis le couteau... dans le dos... l'eau froide... le noir. Quarante ans de noir. »`,
          quest: `« Trouvez le couteau. Il l'a gardé — il garde toujours ses trophées. Dans sa demeure, derrière le portrait de sa femme. Prouvez mon meurtre et je pourrai enfin reposer. »`,
          farewell: `« Merci... ne tardez pas... chaque nuit est une éternité... »`,
        },
        stats: { hp: 45, atk: 6, ac: 12 },
      },
    ],
    skillChecks: [
      { skill: 'Sagesse', dc: 13, success: `Le PJ voit la scène du meurtre en vision : Renaud poignardant Aldric par derrière, le poussant dans la rivière, puis empochant la bourse pleine d'or.`, failure: `La vision est trop intense — le PJ est repoussé et subit 1d6 dégâts psychiques.` },
      { skill: 'Religion', dc: 12, success: `Le PJ comprend que le spectre est lié au pont par son meurtre non résolu. Seule la justice ou un rituel de repos éternel peut le libérer.`, failure: `Le PJ ne sait pas comment aider le spectre.` },
    ],
    nextScenes: ['sq1-scene3'],
    previousScene: 'sq1-scene1',
  },
  {
    id: 'sq1-scene3',
    sceneNumber: 3,
    title: 'Le Placard aux Secrets',
    type: 'exploration',
    location: 'Manoir de Renaud Daubry',
    locationId: 'sol-aureus-quartier-noble',
    estimatedMinutes: 30,
    readAloud: {
      text: `Le manoir du conseiller Daubry se dresse dans le quartier noble, imposant et bien entretenu. Des gardes patrouillent le périmètre — Daubry est un homme prudent. L'intérieur respire la richesse : tapis épais, boiseries sculptées, portraits de famille. Dans le grand salon, un imposant portrait de femme aux cheveux d'argent surplombe la cheminée — l'épouse défunte de Daubry. Si le spectre a dit vrai, c'est derrière ce tableau que se cache la preuve du meurtre.`,
      mood: 'tendu, furtif',
      music: 'Tension basse, horloge qui tictaque',
    },
    gmNotes: [
      { type: 'info', text: `Les PJ peuvent s'introduire par effraction (Discrétion/Crochetage), obtenir une invitation sous prétexte (Persuasion/Tromperie), ou obtenir un mandat du capitaine de la garde (très difficile sans preuves).` },
      { type: 'secret', text: `Derrière le portrait se trouve un coffre contenant : le couteau ensanglanté (conservé par magie), le journal intime de Daubry avouant le meurtre, et un médaillon portant les initiales A.V.` },
      { type: 'tip', text: `Si les PJ se font prendre, Daubry essaie d'abord de les acheter (500 po de silence). S'ils refusent, il envoie ses hommes de main.` },
    ],
    npcs: [
      {
        name: 'Renaud Daubry',
        role: 'Conseiller municipal / meurtrier',
        personality: 'Charmeur, manipulateur, paniqué sous la surface',
        appearance: 'Homme de 65 ans, cheveux gris soignés, costume luxueux, bague à chaque doigt',
        secret: `Il est rongé par la culpabilité depuis 40 ans et fait des cauchemars chaque nuit. Une part de lui veut être découvert.`,
        dialogues: {
          greeting: `« Ah, des aventuriers ! Quel honneur. Que puis-je faire pour les héros de Sol-Aureus ? »`,
          info: `« Le fantôme du pont ? Des sottises de pêcheurs ivres, voyons. Ce pont est parfaitement sûr — j'y passe moi-même chaque jour. »`,
          farewell: `« Je vous souhaite une excellente soirée. Et n'écoutez pas les ragots — ils ne mènent qu'aux ennuis. »`,
        },
        stats: { hp: 22, atk: 3, ac: 11 },
      },
    ],
    skillChecks: [
      { skill: 'Discrétion', dc: 14, success: `Les PJ s'infiltrent dans le manoir sans être repérés.`, failure: `Un garde les repère — ils ont un round pour réagir avant l'alerte.` },
      { skill: 'Crochetage', dc: 15, success: `Le coffre derrière le portrait s'ouvre, révélant le couteau, le journal et le médaillon.`, failure: `Le mécanisme grince bruyamment — Daubry accourt.` },
      { skill: 'Perspicacité', dc: 13, success: `En parlant avec Daubry, le PJ remarque une micro-expression de terreur quand le fantôme est mentionné. Il ment.`, failure: `Daubry semble parfaitement sincère.` },
    ],
    choices: [
      {
        id: 'sq1-c3',
        prompt: 'Comment accéder au manoir ?',
        options: [
          {
            label: 'Infiltration nocturne',
            description: 'S\'introduire de nuit par effraction',
            consequence: 'Risqué mais direct — accès au coffre secret',
            nextScene: 'sq1-scene4',
            skillCheck: { skill: 'Discrétion', dc: 14, success: 'Entrée discrète, accès aux preuves.', failure: 'Repérés par un garde — combat ou fuite.' },
          },
          {
            label: 'Visite diplomatique',
            description: 'Demander audience au conseiller sous un prétexte',
            consequence: 'Plus sûr mais nécessite de trouver le coffre discrètement pendant la visite',
            nextScene: 'sq1-scene4',
            skillCheck: { skill: 'Tromperie', dc: 15, success: 'Daubry les reçoit et quitte la pièce un moment — accès au portrait.', failure: 'Daubry reste méfiant et ne les quitte pas des yeux.' },
          },
          {
            label: 'Mandat officiel',
            description: 'Convaincre la garde de fouiller le manoir',
            consequence: 'Légal mais très difficile sans preuves solides',
            nextScene: 'sq1-scene4',
            skillCheck: { skill: 'Persuasion', dc: 18, success: 'Le capitaine accepte — fouille officielle.', failure: 'Refus catégorique — Daubry est prévenu et se met sur ses gardes.' },
          },
        ],
      },
    ],
    nextScenes: ['sq1-scene4'],
    previousScene: 'sq1-scene2',
  },
  {
    id: 'sq1-scene4',
    sceneNumber: 4,
    title: 'Justice ou Pardon',
    type: 'choice',
    location: 'Pont-Vieux de Sol-Aureus',
    locationId: 'sol-aureus-pont-vieux',
    estimatedMinutes: 25,
    readAloud: {
      text: `Vous revenez au Pont-Vieux avec les preuves en main — le couteau rouillé, le journal aux aveux, le médaillon d'Aldric. Le spectre apparaît immédiatement, comme s'il savait. Sa forme est plus nette, plus humaine. Des larmes de lumière coulent sur ses joues translucides. Derrière vous, un bruit de pas : Renaud Daubry est là, seul, sans gardes. Il a vieilli de dix ans en une nuit. Ses mains tremblent. « Vous avez trouvé, » dit-il simplement. Il tombe à genoux sur les pavés du pont. « Quarante ans... quarante ans que j'entends sa voix chaque nuit. » Le spectre et le meurtrier se regardent. L'un mort, l'autre brisé. Le silence est assourdissant.`,
      mood: 'émotionnel, solennel',
      music: 'Piano lent, cordes douces',
    },
    gmNotes: [
      { type: 'info', text: `C'est un moment de roleplay pur. Laissez les PJ décider du sort de Daubry. Il n'y a pas de « bonne » réponse.` },
      { type: 'tip', text: `Si les PJ hésitent, le spectre et Daubry les regardent tous deux, attendant leur verdict. Aldric murmure : « La justice... ou la paix... est-ce la même chose ? »` },
      { type: 'lore', text: `Si Daubry est livré à la justice, la fortune des Valmonte est restituée à leurs descendants. Si pardonné, Daubry consacre le reste de sa vie à des œuvres caritatives au nom d'Aldric.` },
    ],
    npcs: [
      {
        name: 'Renaud Daubry',
        role: 'Meurtrier repenti',
        personality: 'Brisé, sincèrement repentant, accepte son sort',
        appearance: 'Homme défait, vêtements froissés, yeux rougis, tremblant',
        dialogues: {
          greeting: `« Je savais que ce jour viendrait. Une part de moi l'espérait. »`,
          info: `« J'étais jeune, cupide, stupide. Aldric était meilleur que moi en tout. Le comptoir marchait grâce à lui. J'ai voulu tout pour moi... et j'ai tout perdu le jour où je l'ai tué. »`,
          farewell: `« Quel que soit votre choix, je l'accepte. J'ai mérité bien pire que ce que vous pourrez me donner. »`,
        },
        stats: { hp: 22, atk: 3, ac: 11 },
      },
    ],
    choices: [
      {
        id: 'sq1-c4',
        prompt: 'Quel sort pour Renaud Daubry ?',
        options: [
          {
            label: 'Justice',
            description: 'Livrer Daubry aux autorités avec les preuves du meurtre',
            consequence: 'Daubry est emprisonné. Le spectre sourit et disparaît dans la lumière. La famille Valmonte retrouve son honneur et sa fortune. Réputation de justice +2.',
            reputationChange: [{ faction: 'Sol-Aureus', amount: 2 }, { faction: 'Garde', amount: 1 }],
          },
          {
            label: 'Pardon',
            description: 'Laisser Daubry racheter ses péchés par des actes',
            consequence: 'Le spectre hésite, puis acquiesce. Il pose une main spectrale sur l\'épaule de Daubry et murmure « Vis pour nous deux » avant de disparaître. Daubry consacre sa fortune aux pauvres. Réputation de compassion +2.',
            reputationChange: [{ faction: 'Sol-Aureus', amount: 1 }, { faction: 'Temple', amount: 2 }],
          },
          {
            label: 'Vengeance',
            description: 'Laisser le spectre punir lui-même son meurtrier',
            consequence: 'Le spectre saisit Daubry et l\'entraîne dans l\'eau du pont. Les deux disparaissent. Le lendemain, on retrouve le corps de Daubry, un sourire paisible sur le visage. Le pont n\'est plus hanté — mais l\'acte laisse un goût amer.',
            reputationChange: [{ faction: 'Sol-Aureus', amount: -1 }],
          },
        ],
      },
    ],
    nextScenes: [],
    previousScene: 'sq1-scene3',
    loot: ['Médaillon des Valmonte (bijou, 150 po)', 'Couteau d\'Aldric (dague +1, propriété Spectrale)'],
  },
];

const sideQuest1: BookChapter = {
  id: 'sq-1-fantome-pont-vieux',
  actNumber: 1,
  chapterNumber: 1,
  title: 'Le Fantôme du Pont-Vieux',
  subtitle: 'Un meurtre vieux de quarante ans réclame justice',
  summary: `Un spectre hante le Pont-Vieux de Sol-Aureus chaque nuit, terrorisant les habitants. Les aventuriers découvrent qu'il s'agit d'Aldric Valmonte, un marchand assassiné il y a 40 ans par son associé — l'actuel conseiller Renaud Daubry. Enquête, confrontation spectrale et choix moral déchirant.`,
  levelRange: '1-3',
  themes: ['mystère', 'justice', 'pardon', 'fantôme', 'enquête'],
  scenes: sq1_scenes,
  chapterIntro: {
    text: `Depuis trois nuits, le Pont-Vieux est le théâtre d'apparitions terrifiantes. Les pêcheurs refusent de traverser, les marchands font un détour d'une lieue. Quelque chose — ou quelqu'un — refuse de reposer en paix.`,
    mood: 'mystérieux',
    music: 'Ambiance nocturne urbaine',
  },
  chapterConclusion: {
    text: `Le Pont-Vieux retrouve sa quiétude. Qu'Aldric ait obtenu justice, pardon ou vengeance, son esprit ne hante plus les vivants. Mais l'affaire laisse une question dans l'esprit des aventuriers : combien d'autres secrets sont enfouis dans les pierres de Sol-Aureus ?`,
    mood: 'mélancolique, résolu',
    music: 'Piano doux, vent léger',
  },
  rewards: { xp: 300, gold: '150-250 po', items: ['Médaillon des Valmonte', 'Couteau d\'Aldric (dague +1)'] },
};

// ============================================================================
// QUÊTE 2 : Les Rats du Quartier Bas (Combat) — 3 scènes
// ============================================================================

const sq2_scenes: BookScene[] = [
  {
    id: 'sq2-scene1',
    sceneNumber: 1,
    title: 'Le Cri des Opprimés',
    type: 'social',
    location: 'Quartier Bas de Sol-Aureus',
    locationId: 'sol-aureus-quartier-bas',
    estimatedMinutes: 20,
    readAloud: {
      text: `Le Quartier Bas de Sol-Aureus pue la misère et le désespoir. Des ruelles étroites où le soleil ne pénètre jamais, des bâtiments qui s'affaissent les uns contre les autres comme des ivrognes épuisés. Une femme court vers vous, le visage tuméfié, un enfant accroché à ses jupes. « S'il vous plaît ! Les Rats — ils ont pris tout ce qu'on avait ! Mon mari a voulu résister et ils l'ont battu. Personne ne nous aide — la garde ne descend jamais ici ! »`,
      mood: 'urgent, misérable',
      music: 'Percussions urbaines, ambiance de quartier pauvre',
    },
    gmNotes: [
      { type: 'info', text: `Les Rats du Quartier Bas sont un gang de 15 voyous dirigé par « Lame », un ancien soldat devenu racketeur. Ils extorquent les commerçants et les familles pauvres.` },
      { type: 'tip', text: `Les habitants sont terrifiés mais prêts à aider si les PJ montrent qu'ils sont sérieux. Ils peuvent fournir des informations sur les planques des Rats.` },
      { type: 'secret', text: `Un garde corrompu, le sergent Voss, touche un pourcentage et détourne les patrouilles du quartier.` },
    ],
    npcs: [
      {
        name: 'Hanna la Couturière',
        role: 'Victime / informatrice',
        personality: 'Désespérée mais courageuse, protectrice',
        appearance: 'Femme de 30 ans, robe rapiécée, œil au beurre noir, mains calleuses',
        dialogues: {
          greeting: `« Vous êtes vraiment là pour nous aider ? Pas pour rire de nous ? »`,
          info: `« Les Rats se retrouvent à l'entrepôt abandonné près du canal, derrière la tannerie. Ils sont une douzaine, peut-être plus. Leur chef, Lame, c'est le pire — il était soldat avant, il sait se battre. »`,
          quest: `« Si vous pouviez juste... les faire partir. Qu'on puisse vivre en paix. On n'a rien à vous donner, mais on n'oubliera jamais. »`,
          farewell: `« Faites attention. Lame a déjà tué, et ça ne lui fait ni chaud ni froid. »`,
        },
      },
      {
        name: 'Petit Félix',
        role: 'Gamin des rues / éclaireur',
        personality: 'Débrouillard, méfiant, brave',
        appearance: 'Garçon de 10 ans, pieds nus, cheveux en bataille, regard vif',
        secret: `Il connaît un passage secret dans l'entrepôt — un ancien conduit d'égout.`,
        dialogues: {
          greeting: `« Z'êtes pas des Rats, ça se voit. Z'êtes trop propres. »`,
          info: `« J'connais l'entrepôt comme ma poche. Y'a un trou dans le mur côté canal, derrière les tonneaux. On peut entrer sans qu'ils voient. »`,
          farewell: `« Bonne chance. Si vous gagnez, j'vous montrerai où Lame planque son or. »`,
        },
      },
    ],
    skillChecks: [
      { skill: 'Intimidation', dc: 10, success: `Les habitants se sentent en sécurité et partagent tous les détails qu'ils connaissent sur les Rats.`, failure: `Les habitants restent méfiants — peur des représailles.` },
    ],
    nextScenes: ['sq2-scene2'],
  },
  {
    id: 'sq2-scene2',
    sceneNumber: 2,
    title: 'Le Nid de Rats',
    type: 'combat',
    location: 'Entrepôt abandonné, Quartier Bas',
    locationId: 'sol-aureus-quartier-bas',
    estimatedMinutes: 35,
    readAloud: {
      text: `L'entrepôt de la tannerie est un bâtiment décrépit qui empeste le cuir pourri. Des voix rauques filtrent à travers les planches disjointes — rires gras, cliquetis de dés, jurons. À l'intérieur, une dizaine de voyous occupent l'espace entre caisses renversées et tonneaux éventrés. Certains jouent aux cartes, d'autres aiguisent des lames. Au fond, sur un « trône » fait de caisses empilées, un homme massif au crâne rasé supervise son petit empire. Trois cicatrices parallèles barrent son visage — les griffes d'un fauve, ou peut-être d'un homme encore plus dangereux que lui.`,
      mood: 'tendu, dangereux',
      music: 'Percussion de combat urbain, basse menaçante',
    },
    gmNotes: [
      { type: 'info', text: `L'entrepôt compte 8 voyous et Lame. Les PJ peuvent attaquer de front, s'infiltrer par le passage secret (Petit Félix), ou attirer les voyous dehors un par un.` },
      { type: 'warning', text: `Si les PJ attaquent de front, tous les voyous se battent. Si infiltration, ils peuvent éliminer 2-3 avant que l'alarme soit donnée.` },
      { type: 'tip', text: `Lame essaiera de fuir si plus de la moitié de ses hommes tombent. Il a un plan de secours : un bateau amarré derrière l'entrepôt.` },
    ],
    encounter: {
      name: 'Raid sur l\'entrepôt des Rats',
      enemies: [
        { name: 'Lame (chef des Rats)', hp: 38, atk: 7, ac: 15, cr: 2, abilities: ['Attaque sournoise (2d6)', 'Riposte (réaction)', 'Fuite tactique'] },
        { name: 'Voyou des Rats', hp: 11, atk: 4, ac: 12, cr: 0.25 },
        { name: 'Voyou des Rats', hp: 11, atk: 4, ac: 12, cr: 0.25 },
        { name: 'Voyou des Rats', hp: 11, atk: 4, ac: 12, cr: 0.25 },
        { name: 'Voyou des Rats', hp: 11, atk: 4, ac: 12, cr: 0.25 },
        { name: 'Éclaireur des Rats', hp: 16, atk: 5, ac: 13, cr: 0.5, abilities: ['Tir précis (arbalète)'] },
        { name: 'Éclaireur des Rats', hp: 16, atk: 5, ac: 13, cr: 0.5, abilities: ['Tir précis (arbalète)'] },
        { name: 'Brute des Rats', hp: 26, atk: 6, ac: 11, cr: 1, abilities: ['Coup puissant (+1d6 dégâts)'] },
      ],
      terrain: ['Caisses (couvert partiel)', 'Tonneaux (obstacles)', 'Échelle vers les poutres (hauteur)', 'Sol glissant (huile renversée)'],
      tactics: `Les voyous se mettent à couvert derrière les caisses. Les éclaireurs tirent depuis les poutres. La brute charge au corps à corps. Lame attend en embuscade et frappe les cibles isolées.`,
      loot: ['Or extorqué (80 po)', 'Dague de Lame +1', 'Potion de soin (×2)', 'Carte des planques du gang'],
    },
    skillChecks: [
      { skill: 'Discrétion', dc: 13, success: `Infiltration réussie par le passage secret — surprise sur les Rats.`, failure: `Un voyou repère les PJ — combat sans avantage de surprise.` },
    ],
    nextScenes: ['sq2-scene3'],
    previousScene: 'sq2-scene1',
  },
  {
    id: 'sq2-scene3',
    sceneNumber: 3,
    title: 'Héros du Quartier',
    type: 'social',
    location: 'Quartier Bas de Sol-Aureus',
    locationId: 'sol-aureus-quartier-bas',
    estimatedMinutes: 15,
    readAloud: {
      text: `La nouvelle se répand comme une traînée de poudre dans le Quartier Bas. Les Rats sont tombés. Les portes s'ouvrent une à une, les visages apparaissent — d'abord méfiants, puis émerveillés, puis rayonnants. Hanna la Couturière arrive en courant, son enfant dans les bras, les larmes aux yeux. « C'est vrai ? C'est vraiment fini ? » Derrière elle, une foule s'assemble. Le vieux boulanger apporte du pain chaud. La sage-femme offre des onguents pour vos blessures. Petit Félix vous regarde avec des étoiles dans les yeux. Pour la première fois depuis des mois, le Quartier Bas respire.`,
      mood: 'triomphal, émouvant',
      music: 'Musique joyeuse populaire, instruments à cordes',
    },
    gmNotes: [
      { type: 'info', text: `Les habitants offrent tout ce qu'ils peuvent — ce n'est pas grand-chose matériellement, mais l'impact émotionnel est fort.` },
      { type: 'tip', text: `Si les PJ dénoncent le sergent Voss avec les preuves trouvées dans l'entrepôt, la garde le révoque et améliore la patrouille du quartier.` },
      { type: 'lore', text: `Les PJ gagnent la reconnaissance éternelle du Quartier Bas. Plus tard dans la campagne, ces gens les aideront sans hésiter.` },
    ],
    npcs: [
      {
        name: 'Hanna la Couturière',
        role: 'Porte-parole de la communauté',
        personality: 'Émue, reconnaissante, digne',
        appearance: 'Même femme qu\'avant, mais le sourire transforme son visage',
        dialogues: {
          greeting: `« Vous avez fait ce que personne n'osait faire. Le Quartier Bas n'oubliera jamais. »`,
          info: `« On a fait une collecte — c'est pas grand-chose, mais c'est tout ce qu'on a. Et si vous avez besoin de quoi que ce soit, n'importe quand — vous n'avez qu'à demander. »`,
          farewell: `« Que la Lumière bénisse chacun de vos pas. Vous êtes nos héros. »`,
        },
      },
    ],
    loot: ['Collecte du Quartier Bas (35 po)', 'Écharpe brodée « Héros du Quartier » (avantage Persuasion au Quartier Bas)', 'Faveur du peuple (contact fiable dans le quartier)'],
    nextScenes: [],
    previousScene: 'sq2-scene2',
  },
];

const sideQuest2: BookChapter = {
  id: 'sq-2-rats-quartier-bas',
  actNumber: 1,
  chapterNumber: 2,
  title: 'Les Rats du Quartier Bas',
  subtitle: 'Nettoyer les rues au nom des oubliés',
  summary: `Un gang de voyous appelé les Rats terrorise le Quartier Bas de Sol-Aureus, extorquant les plus pauvres sous l'œil aveugle d'un garde corrompu. Les aventuriers s'allient aux habitants, infiltrent l'entrepôt des Rats et affrontent leur chef, Lame, pour libérer le quartier.`,
  levelRange: '1-3',
  themes: ['combat', 'justice sociale', 'communauté', 'gang'],
  scenes: sq2_scenes,
  chapterIntro: {
    text: `Le Quartier Bas de Sol-Aureus est un endroit que les nobles préfèrent ignorer. Mais pour ceux qui y vivent, c'est chez eux — et un gang de voyous est en train de le leur voler.`,
    mood: 'sombre, urgent',
    music: 'Ambiance de quartier pauvre',
  },
  chapterConclusion: {
    text: `Les Rats du Quartier Bas ne sont plus. Le quartier panse ses blessures, mais pour la première fois en des mois, l'espoir renaît dans ses ruelles. Les aventuriers ont prouvé que même les oubliés méritent d'être défendus.`,
    mood: 'triomphal, humble',
    music: 'Musique populaire joyeuse',
  },
  rewards: { xp: 250, gold: '115 po', items: ['Dague de Lame +1', 'Écharpe du Quartier (avantage social)', 'Faveur du peuple'] },
};

// ============================================================================
// QUÊTE 3 : L'Apprenti Disparu (Enquête) — 4 scènes
// ============================================================================

const sq3_scenes: BookScene[] = [
  {
    id: 'sq3-scene1',
    sceneNumber: 1,
    title: 'Disparition à la Tour',
    type: 'social',
    location: 'Tour des Arcanes, Sol-Aureus',
    locationId: 'sol-aureus-tour-arcanes',
    estimatedMinutes: 20,
    readAloud: {
      text: `La Tour des Arcanes s'élève au-dessus des toits de Sol-Aureus, ses fenêtres clignotant de lueurs surnaturelles. À l'entrée, un mage en robe violette fait les cent pas, visiblement agité. « Enfin quelqu'un ! Je suis Maître Eloran, instructeur à la Tour. Mon apprenti, Théo — un garçon de quinze ans, brillant mais imprudent — a disparu il y a deux jours. Son laboratoire est scellé de l'intérieur par une magie que je ne comprends pas. Je crains qu'il n'ait tenté quelque chose de très dangereux. »`,
      mood: 'inquiet, académique',
      music: 'Sons magiques, ambiance de bibliothèque',
    },
    gmNotes: [
      { type: 'info', text: `Théo a tenté d'ouvrir un portail vers un demi-plan pour impressionner Maître Eloran. Le portail s'est mal stabilisé et l'a aspiré. Le labo est contaminé par de la magie dimensionnelle instable.` },
      { type: 'warning', text: `Le portail dans le labo est instable. Toute magie utilisée près de lui a 25% de chance de provoquer un effet aléatoire (table de magie sauvage).` },
      { type: 'secret', text: `Théo a volé un livre interdit dans la section restreinte de la bibliothèque. Un autre apprenti, Lysa, le sait mais n'ose pas le dire.` },
    ],
    npcs: [
      {
        name: 'Maître Eloran',
        role: 'Mage instructeur',
        personality: 'Méthodique, inquiet, se sent coupable',
        appearance: 'Elfe d\'âge mûr, robe violette, lunettes sur le nez, mains tachées d\'encre',
        dialogues: {
          greeting: `« Merci d'être venus. Le temps presse — chaque heure qui passe, les chances de retrouver Théo diminuent. »`,
          info: `« Théo est un prodige, mais il a toujours voulu aller trop vite. Je l'ai surpris à lire des textes au-dessus de son niveau. J'aurais dû être plus vigilant. »`,
          quest: `« J'ai besoin que vous entriez dans son laboratoire et découvriez ce qu'il a fait. Je vous fournirai des protections contre la magie résiduelle. »`,
          farewell: `« Ramenez-le-moi vivant. C'est tout ce que je demande. »`,
        },
      },
      {
        name: 'Lysa',
        role: 'Apprentie / informatrice',
        personality: 'Nerveuse, loyale envers Théo, rongée par la culpabilité',
        appearance: 'Jeune humaine, 16 ans, taches de rousseur, doigts nerveux',
        secret: `Elle a aidé Théo à voler le livre interdit « Ponts entre les Plans » dans la section restreinte.`,
        dialogues: {
          greeting: `« Vous cherchez Théo ? Je... je ne sais rien. Enfin, pas grand-chose. »`,
          info: `« Il parlait beaucoup de dimensions parallèles ces derniers temps. Il disait qu'il allait prouver à tout le monde qu'il était un vrai mage, pas juste un apprenti. »`,
          farewell: `« S'il vous plaît... ramenez-le. C'est mon ami. »`,
        },
      },
    ],
    skillChecks: [
      { skill: 'Perspicacité', dc: 12, success: `Lysa ment — elle sait quelque chose. Avec de la pression douce, elle admet avoir aidé Théo à voler un livre interdit.`, failure: `Lysa semble sincèrement ignorante.` },
      { skill: 'Arcanes', dc: 14, success: `L'énergie résiduelle dans le couloir menant au labo est dimensionnelle — quelqu'un a ouvert un portail ici.`, failure: `La magie est chaotique et difficile à identifier.` },
    ],
    nextScenes: ['sq3-scene2'],
  },
  {
    id: 'sq3-scene2',
    sceneNumber: 2,
    title: 'Le Laboratoire Instable',
    type: 'exploration',
    location: 'Laboratoire de Théo, Tour des Arcanes',
    locationId: 'sol-aureus-tour-arcanes',
    estimatedMinutes: 25,
    readAloud: {
      text: `La porte du laboratoire de Théo s'ouvre avec un grincement sinistre. L'air à l'intérieur est chargé d'électricité statique — vos cheveux se dressent, vos dents vibrent. La pièce est un chaos de livres ouverts, de fioles renversées et de cercles magiques tracés à la craie sur le sol. Au centre, flottant à un mètre du sol, un déchirure dans l'espace — comme un miroir brisé reflétant un paysage impossible. Des couleurs qui n'existent pas dans votre monde dansent dans la fissure. De l'autre côté, vous apercevez un paysage de cristaux flottants sous un ciel violet.`,
      mood: 'surréaliste, dangereux',
      music: 'Sons dimensionnels, réverbération étrange',
    },
    gmNotes: [
      { type: 'info', text: `Le portail mène au « Demi-Plan du Prisme », un fragment de réalité instable. Théo y est piégé depuis 2 jours. Le portail se referme lentement — il reste environ 4 heures.` },
      { type: 'warning', text: `Traverser le portail impose un jet de Constitution DC 12. Échec = 1d6 dégâts de force et désorientation (désavantage au premier jet).` },
      { type: 'tip', text: `Les notes de Théo sur la table expliquent comment stabiliser le portail (Arcanes DC 15). Si stabilisé, le passage est sûr et le temps est étendu à 8 heures.` },
    ],
    skillChecks: [
      { skill: 'Arcanes', dc: 15, success: `Le portail est stabilisé — passage sûr, le délai passe à 8 heures.`, failure: `Le portail crépite dangereusement mais reste ouvert. Chaque traversée impose un jet de Con DC 12.` },
      { skill: 'Investigation', dc: 13, success: `Les notes de Théo révèlent que le demi-plan contient un « nœud de cristal » qui ancre la réalité. Le briser ramènera tout le monde dans le plan matériel.`, failure: `Les notes sont trop techniques pour être comprises rapidement.` },
    ],
    choices: [
      {
        id: 'sq3-c2',
        prompt: 'Comment procéder ?',
        options: [
          {
            label: 'Traverser immédiatement',
            description: 'Plonger dans le portail sans attendre',
            consequence: 'Courageux mais risqué — pas de stabilisation',
            nextScene: 'sq3-scene3',
          },
          {
            label: 'Stabiliser puis traverser',
            description: 'Prendre le temps d\'étudier les notes et stabiliser le portail',
            consequence: 'Plus sûr, mais consomme du temps précieux',
            nextScene: 'sq3-scene3',
            skillCheck: { skill: 'Arcanes', dc: 15, success: 'Portail stabilisé, passage sûr.', failure: 'Échec de stabilisation, le portail perd 1 heure de temps restant.' },
          },
        ],
      },
    ],
    nextScenes: ['sq3-scene3'],
    previousScene: 'sq3-scene1',
  },
  {
    id: 'sq3-scene3',
    sceneNumber: 3,
    title: 'Le Demi-Plan du Prisme',
    type: 'exploration',
    location: 'Demi-Plan du Prisme',
    locationId: 'demi-plan-prisme',
    estimatedMinutes: 30,
    readAloud: {
      text: `Vous émergez dans un monde qui défie toute logique. Des plateformes de cristal flottent dans un vide violet, reliées par des ponts de lumière solidifiée. La gravité semble capricieuse — par moments vous êtes lourds comme du plomb, par moments légers comme des plumes. Au loin, perché sur un cristal géant, vous apercevez une silhouette recroquevillée : un adolescent en robe d'apprenti, entouré d'un bouclier magique vacillant. Autour de lui, des créatures de lumière fracturée — des éclats vivants — tournent comme des requins autour d'une proie.`,
      mood: 'alien, urgent',
      music: 'Ambiance cristalline, sons de verre',
    },
    gmNotes: [
      { type: 'info', text: `Théo est vivant mais épuisé. Son bouclier tient encore 30 minutes environ. Les Éclats Prismatiques sont des créatures du demi-plan — pas malveillantes, juste territoriales.` },
      { type: 'tip', text: `Les PJ peuvent combattre les Éclats ou les calmer (Arcanes DC 14 ou Performance DC 15 — les Éclats réagissent à la musique).` },
      { type: 'warning', text: `Si le bouclier de Théo tombe avant que les PJ arrivent, les Éclats l'absorbent (mais il peut être récupéré en brisant le cristal principal).` },
    ],
    encounter: {
      name: 'Les Éclats du Prisme',
      enemies: [
        { name: 'Éclat Prismatique', hp: 18, atk: 5, ac: 14, cr: 0.5, abilities: ['Résistance aux dégâts non magiques', 'Flash aveuglant (Con DC 12)'] },
        { name: 'Éclat Prismatique', hp: 18, atk: 5, ac: 14, cr: 0.5, abilities: ['Résistance aux dégâts non magiques', 'Flash aveuglant (Con DC 12)'] },
        { name: 'Éclat Prismatique', hp: 18, atk: 5, ac: 14, cr: 0.5, abilities: ['Résistance aux dégâts non magiques', 'Flash aveuglant (Con DC 12)'] },
        { name: 'Grand Éclat', hp: 32, atk: 7, ac: 15, cr: 1, abilities: ['Rayon prismatique (3d6 dégâts, Dex DC 13)', 'Téléportation courte'] },
      ],
      terrain: ['Plateformes de cristal (espaces limités)', 'Ponts de lumière (étroits)', 'Gravité variable (Athlétisme DC 10 pour se déplacer)'],
      tactics: `Les Éclats Prismatiques encerclent et utilisent leurs flashs pour aveugler. Le Grand Éclat tire des rayons depuis la distance. Ils fuient si le Grand Éclat est vaincu.`,
      loot: ['Fragment prismatique (composant magique rare, 100 po)', 'Essence de lumière (×3)'],
    },
    nextScenes: ['sq3-scene4'],
    previousScene: 'sq3-scene2',
  },
  {
    id: 'sq3-scene4',
    sceneNumber: 4,
    title: 'Le Retour de l\'Apprenti',
    type: 'social',
    location: 'Tour des Arcanes, Sol-Aureus',
    locationId: 'sol-aureus-tour-arcanes',
    estimatedMinutes: 15,
    readAloud: {
      text: `Le portail crache votre groupe dans le laboratoire en désordre. Théo s'effondre sur le sol, tremblant, épuisé, mais vivant. Maître Eloran fait irruption dans la pièce et serre son apprenti dans ses bras — un geste qui surprend le vieil elfe autant que Théo. « Petit imbécile, » murmure Eloran d'une voix brisée. « Brillant, mais petit imbécile. » Théo lève des yeux rougis : « Je suis désolé, Maître. Je voulais juste... prouver que je valais quelque chose. » Eloran se tourne vers vous, les yeux brillants de gratitude. « Vous avez sauvé bien plus qu'un apprenti. Vous avez sauvé mon fils — enfin, le fils que je n'ai jamais eu. »`,
      mood: 'émouvant, soulagé',
      music: 'Musique douce et chaleureuse',
    },
    gmNotes: [
      { type: 'info', text: `Théo est reconnaissant et devient un allié des PJ. Plus tard dans la campagne, il peut leur fournir des objets magiques ou des informations arcanes.` },
      { type: 'tip', text: `Maître Eloran offre un service magique gratuit : identification, enchantement mineur, ou une leçon de sort.` },
      { type: 'lore', text: `L'incident pousse la Tour des Arcanes à renforcer la sécurité de la section interdite. Théo, humilié mais plus sage, deviendra un mage remarquable.` },
    ],
    npcs: [
      {
        name: 'Théo',
        role: 'Apprenti sauvé',
        personality: 'Humilié, reconnaissant, déterminé à faire mieux',
        appearance: 'Adolescent maigre, robe déchirée, cheveux en désordre, yeux cernés mais brillants',
        dialogues: {
          greeting: `« Merci... sans vous, je serais devenu un morceau de cristal flottant pour l'éternité. »`,
          info: `« Le demi-plan était fascinant, même terrifiant. Les créatures n'étaient pas méchantes — elles protégeaient leur monde. J'aurais dû demander la permission au lieu de forcer l'entrée. »`,
          farewell: `« Je vous dois la vie. Si j'arrive un jour à faire quelque chose d'utile de mon existence, ce sera grâce à vous. »`,
        },
      },
    ],
    loot: ['Baguette du Prisme (1d8 dégâts radiants, 3 charges/jour)', 'Livre « Ponts entre les Plans » (avantage jets Arcanes sur les portails)', 'Faveur de la Tour des Arcanes'],
    nextScenes: [],
    previousScene: 'sq3-scene3',
  },
];

const sideQuest3: BookChapter = {
  id: 'sq-3-apprenti-disparu',
  actNumber: 1,
  chapterNumber: 3,
  title: 'L\'Apprenti Disparu',
  subtitle: 'Un prodige piégé entre les dimensions',
  summary: `Un apprenti mage trop ambitieux a ouvert un portail instable vers un demi-plan et s'y est retrouvé piégé. Les aventuriers doivent explorer le laboratoire, stabiliser le portail et sauver Théo des créatures du Demi-Plan du Prisme avant que la faille ne se referme.`,
  levelRange: '1-3',
  themes: ['magie', 'sauvetage', 'dimension', 'ambition', 'mentorat'],
  scenes: sq3_scenes,
  chapterIntro: {
    text: `La Tour des Arcanes de Sol-Aureus est réputée pour ses mages brillants. Mais le génie s'accompagne parfois d'imprudence, et un jeune apprenti vient d'en payer le prix.`,
    mood: 'inquiet, mystique',
    music: 'Ambiance magique, carillons',
  },
  chapterConclusion: {
    text: `Théo est sain et sauf, plus sage et plus humble. Le portail est scellé, le demi-plan refermé. Mais quelque part entre les dimensions, un fragment prismatique continue de briller — un rappel que les frontières de la réalité sont plus minces qu'on ne le croit.`,
    mood: 'soulagé, mystérieux',
    music: 'Carillons doux, vent magique',
  },
  rewards: { xp: 350, gold: '100 po', items: ['Baguette du Prisme', 'Livre des Ponts entre les Plans', 'Faveur de la Tour des Arcanes'] },
};

// ============================================================================
// QUÊTE 4 : Le Marché des Ombres (Social) — 3 scènes
// ============================================================================

const sq4_scenes: BookScene[] = [
  {
    id: 'sq4-scene1',
    sceneNumber: 1,
    title: 'L\'Objet Volé',
    type: 'social',
    location: 'Boutique d\'antiquités, Sol-Aureus',
    locationId: 'sol-aureus-marche',
    estimatedMinutes: 20,
    readAloud: {
      text: `La boutique de Messire Dorin est un capharnaüm de curiosités : globes célestes, crânes gravés, cartes jaunies et statuettes de toutes les époques. Mais aujourd'hui, le vieil antiquaire n'a pas le cœur à vanter ses merveilles. Il vous accueille avec des yeux désespérés et une voix chevrotante. « On m'a volé l'Amulette de Sélène — un artefact lunaire d'une valeur inestimable. Pas pour l'or, non — pour ce qu'elle fait. Elle protège contre la corruption ombrale. Et dans les temps qui courent... » Il baisse la voix. « Je sais où elle est. Le Marché des Ombres — le marché noir sous la ville. Mais moi, un vieil homme, ils me dévoreraient tout cru. »`,
      mood: 'intrigant, furtif',
      music: 'Ambiance de souk, murmures',
    },
    gmNotes: [
      { type: 'info', text: `L'Amulette de Sélène est un véritable artefact qui sera utile contre les forces du Cercle de l'Ombre plus tard dans la campagne. Le Marché des Ombres est accessible via les égouts.` },
      { type: 'secret', text: `Le voleur est un cambrioleur nommé « Doigts de Soie ». Il a déjà revendu l'amulette au receleur du Marché, un homme appelé « Le Peseur ».` },
      { type: 'tip', text: `Dorin peut donner un jeton d'accès au Marché des Ombres — un vieux sou percé. Sans ce jeton, l'entrée est impossible.` },
    ],
    npcs: [
      {
        name: 'Messire Dorin',
        role: 'Antiquaire / donneur de quête',
        personality: 'Érudit, anxieux, généreux',
        appearance: 'Vieil homme voûté, lorgnons épais, barbe blanche, gilet de brocart usé',
        dialogues: {
          greeting: `« Ah, vous avez l'air de gens qui savent se débrouiller dans l'ombre. C'est exactement ce dont j'ai besoin. »`,
          info: `« Le Marché des Ombres se tient dans les anciennes citernes sous la Place du Soleil — ironique, n'est-ce pas ? Montrez ce jeton à la sentinelle du troisième égout au nord de la fontaine. »`,
          quest: `« Retrouvez l'amulette et ramenez-la. Je vous paierai 200 pièces d'or — tout ce que j'ai. L'amulette n'a pas de prix pour moi, c'est un héritage familial. »`,
          farewell: `« Soyez prudents là-dessous. Le Marché des Ombres a ses propres lois, et elles ne sont pas tendres. »`,
        },
      },
    ],
    skillChecks: [
      { skill: 'Histoire', dc: 13, success: `Le PJ reconnaît la description de l'Amulette de Sélène — un artefact antique lié aux sceaux protecteurs. Sa valeur réelle dépasse largement les 200 po.`, failure: `L'amulette semble être un bijou ancien ordinaire.` },
    ],
    nextScenes: ['sq4-scene2'],
  },
  {
    id: 'sq4-scene2',
    sceneNumber: 2,
    title: 'Sous la Place du Soleil',
    type: 'social',
    location: 'Le Marché des Ombres, sous Sol-Aureus',
    locationId: 'sol-aureus-egouts',
    estimatedMinutes: 35,
    readAloud: {
      text: `Après avoir montré le sou percé à une sentinelle encapuchonnée dans les égouts, vous êtes guidés à travers un dédale de tunnels jusqu'à une vaste citerne antique reconvertie en bazar souterrain. Des centaines de lanternes voilées projettent une lumière orangée sur des étals chargés de marchandises interdites : poisons, armes enchantées, livres proscrits, créatures en cage. L'air est chargé d'encens et de méfiance. Un halfelin grassouillet, assis derrière une balance d'or massif, semble être le centre névralgique de cet endroit. Une pancarte au-dessus de lui indique : « Le Peseur — j'achète tout, je vends tout, je ne pose pas de questions. »`,
      mood: 'intrigant, souterrain, dangereux',
      music: 'Ambiance de marché oriental souterrain',
    },
    gmNotes: [
      { type: 'info', text: `Le Peseur est le receleur principal. Il a l'Amulette de Sélène et la vend pour 500 po. Les PJ peuvent négocier, voler, ou trouver un autre angle.` },
      { type: 'tip', text: `Le Peseur respecte la force, l'intelligence et le commerce. Il est plus réceptif à un échange (service contre amulette) qu'à l'intimidation.` },
      { type: 'warning', text: `Le Marché des Ombres a ses gardes — 8 mercenaires armés. Un combat ouvert ici serait suicidaire. La diplomatie est de mise.` },
    ],
    npcs: [
      {
        name: 'Le Peseur',
        role: 'Receleur en chef',
        personality: 'Jovial, rusé, pragmatique, respecte les affaires',
        appearance: 'Halfelin corpulent, bagues à chaque doigt, sourire permanent, yeux calculateurs',
        secret: `Il a un problème : un client l'a menacé et il cherche quelqu'un pour « s'en occuper ». Si les PJ rendent ce service, l'amulette est gratuite.`,
        dialogues: {
          greeting: `« Bienvenue, bienvenue ! Nouveaux visages, nouvelles opportunités ! Que puis-je faire pour des aventuriers de votre calibre ? »`,
          info: `« L'Amulette de Sélène ? Ah oui, une pièce magnifique. Arrivée ce matin même. Je la laisse pour 500 pièces d'or — prix d'ami. Non ? Hmm, peut-être qu'on peut s'arranger autrement... »`,
          quest: `« J'ai un petit souci. Un client mécontent — Gorvin le Balafré — menace de saccager mon étal si je ne lui rembourse pas une vente. Réglez ce problème pour moi, et l'amulette est à vous. »`,
          farewell: `« Les affaires sont les affaires, mes amis. Revenez quand vous voulez — Le Peseur est toujours ouvert ! »`,
        },
        stats: { hp: 20, atk: 3, ac: 12 },
      },
      {
        name: 'Gorvin le Balafré',
        role: 'Client mécontent / brute',
        personality: 'Colérique, borné, mais pas déraisonnable si on le respecte',
        appearance: 'Demi-orc massif, cicatrice du front au menton, armure de cuir cloutée',
        dialogues: {
          greeting: `« Quoi ? Le Peseur envoie des sbires maintenant ? Pathétique. »`,
          info: `« Il m'a vendu une potion de force qui était de l'eau colorée ! 50 po pour de la pisse de rat ! Je veux mon argent ou sa tête. »`,
          farewell: `« Hmph. Au moins quelqu'un a du bon sens ici. »`,
        },
        stats: { hp: 30, atk: 6, ac: 14 },
      },
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 15, success: `Le Peseur accepte de baisser le prix à 200 po pour l'amulette.`, failure: `Le Peseur ne bouge pas — 500 po ou un service.` },
      { skill: 'Intimidation', dc: 16, success: `Gorvin accepte un remboursement de 50 po au lieu de violence. Conflit résolu.`, failure: `Gorvin refuse et sort son arme — les gardes du Marché interviennent pour calmer la situation.` },
      { skill: 'Tromperie', dc: 14, success: `Les PJ convainquent Gorvin que Le Peseur lui offrira le double en marchandises. Gorvin accepte et Le Peseur est forcé d'honorer.`, failure: `Gorvin voit clair dans le mensonge et s'énerve davantage.` },
    ],
    choices: [
      {
        id: 'sq4-c2',
        prompt: 'Comment récupérer l\'amulette ?',
        options: [
          {
            label: 'Payer le prix fort',
            description: 'Acheter l\'amulette pour 500 po',
            consequence: 'Solution directe mais coûteuse',
            nextScene: 'sq4-scene3',
          },
          {
            label: 'Rendre service au Peseur',
            description: 'Résoudre le conflit avec Gorvin en échange de l\'amulette',
            consequence: 'Gratuit mais implique de s\'impliquer dans les affaires du marché noir',
            nextScene: 'sq4-scene3',
          },
          {
            label: 'Vol à la tire',
            description: 'Tenter de dérober l\'amulette discrètement',
            consequence: 'Risqué — si pris, bannissement du Marché et combat possible',
            nextScene: 'sq4-scene3',
            skillCheck: { skill: 'Escamotage', dc: 18, success: 'L\'amulette est subtilisée sans que personne ne s\'en aperçoive.', failure: 'Pris en flagrant délit — les gardes encerclent les PJ.' },
          },
        ],
      },
    ],
    nextScenes: ['sq4-scene3'],
    previousScene: 'sq4-scene1',
  },
  {
    id: 'sq4-scene3',
    sceneNumber: 3,
    title: 'Le Choix de l\'Amulette',
    type: 'choice',
    location: 'Boutique de Dorin / Rue de Sol-Aureus',
    locationId: 'sol-aureus-marche',
    estimatedMinutes: 15,
    readAloud: {
      text: `L'Amulette de Sélène repose dans vos mains. Un disque d'argent pâle incrusté d'une opale laiteuse qui pulse doucement, comme un cœur qui bat. Vous sentez sa puissance — une chaleur protectrice qui repousse l'obscurité. En la tenant, vous comprenez instinctivement sa valeur : ce n'est pas un simple bijou, c'est un bouclier contre les ténèbres. Messire Dorin attend dans sa boutique, prêt à payer pour la récupérer. Mais une voix dans votre tête murmure : cette amulette pourrait vous sauver la vie un jour. Les temps sombres approchent.`,
      mood: 'tentant, moral',
      music: 'Silence lourd, note de harpe',
    },
    gmNotes: [
      { type: 'info', text: `L'amulette confère Résistance aux dégâts nécrotiques et avantage aux jets de sauvegarde contre la corruption ombrale. Très utile pour l'Acte 3+.` },
      { type: 'tip', text: `Ce dilemme moral n'a pas de bonne réponse. Rendre l'amulette est honorable mais la garder est pragmatique. Les deux choix ont des conséquences intéressantes.` },
      { type: 'secret', text: `Si les PJ rendent l'amulette, Dorin meurt de maladie à l'Acte 3 et la leur lègue dans son testament. Si ils la gardent, Dorin est dévasté mais comprend.` },
    ],
    choices: [
      {
        id: 'sq4-c3',
        prompt: 'Que faire de l\'Amulette de Sélène ?',
        options: [
          {
            label: 'Rendre à Dorin',
            description: 'Honorer l\'accord et rendre l\'amulette à son propriétaire',
            consequence: 'Dorin est ému. Il paie les 200 po et offre un objet magique mineur en plus. L\'amulette revient aux PJ par testament à l\'Acte 3.',
            reputationChange: [{ faction: 'Sol-Aureus', amount: 2 }],
          },
          {
            label: 'Garder l\'amulette',
            description: 'Expliquer à Dorin que l\'amulette est nécessaire pour combattre les ténèbres',
            consequence: 'Dorin est dévasté mais comprend. Pas de récompense monétaire. L\'amulette est disponible immédiatement.',
            reputationChange: [{ faction: 'Sol-Aureus', amount: -1 }],
          },
          {
            label: 'Proposer un partage',
            description: 'Suggérer de garder l\'amulette en la « louant » à Dorin entre les missions',
            consequence: 'Dorin accepte à contrecœur. L\'amulette est disponible pour les missions dangereuses. Dorin la garde le reste du temps.',
            skillCheck: { skill: 'Persuasion', dc: 14, success: 'Dorin accepte le compromis, satisfait.', failure: 'Dorin refuse — c\'est tout ou rien.' },
            reputationChange: [{ faction: 'Sol-Aureus', amount: 1 }],
          },
        ],
      },
    ],
    loot: ['Amulette de Sélène (résistance nécrotique, avantage vs corruption)', '200 po (si rendue)'],
    nextScenes: [],
    previousScene: 'sq4-scene2',
  },
];

const sideQuest4: BookChapter = {
  id: 'sq-4-marche-ombres',
  actNumber: 1,
  chapterNumber: 4,
  title: 'Le Marché des Ombres',
  subtitle: 'Un trésor volé dans les entrailles de la ville',
  summary: `Un antiquaire supplie les aventuriers de récupérer l'Amulette de Sélène, un artefact protecteur volé et revendu au marché noir souterrain. Les PJ plongent dans le Marché des Ombres, négocient avec un receleur halfelin, et font face à un choix moral : rendre l'amulette ou la garder pour les batailles à venir.`,
  levelRange: '1-3',
  themes: ['marché noir', 'négociation', 'choix moral', 'vol', 'artefact'],
  scenes: sq4_scenes,
  chapterIntro: {
    text: `Sous les rues ensoleillées de Sol-Aureus, un autre monde prospère — un monde de lames et de murmures, d'or volé et de secrets monnayés. Le Marché des Ombres attend.`,
    mood: 'intrigant, souterrain',
    music: 'Ambiance de souk oriental',
  },
  chapterConclusion: {
    text: `L'Amulette de Sélène a changé de mains — mais dans quelle direction ? Quoi qu'il en soit, les aventuriers ont découvert un monde sous la ville, et le Marché des Ombres se souviendra de leur passage.`,
    mood: 'ambigu, intrigant',
    music: 'Notes de oud, cliquetis de pièces',
  },
  rewards: { xp: 250, gold: '0-200 po (selon le choix)', items: ['Amulette de Sélène (selon le choix)', 'Contact au Marché des Ombres'] },
};

// ============================================================================
// QUÊTE 5 : La Bête de Valombre (Combat/Mystère) — 4 scènes
// ============================================================================

const sq5_scenes: BookScene[] = [
  {
    id: 'sq5-scene1',
    sceneNumber: 1,
    title: 'Griffes dans la Nuit',
    type: 'social',
    location: 'Hameau de Valombre, périphérie de Sol-Aureus',
    locationId: 'valombre',
    estimatedMinutes: 20,
    readAloud: {
      text: `Le hameau de Valombre se blottit à l'orée de la forêt sombre qui borde Sol-Aureus. C'est un endroit paisible d'ordinaire — une poignée de fermes, une chapelle, un moulin. Mais aujourd'hui, la peur règne. Des animaux ont été retrouvés déchiquetés dans les enclos. Des griffures profondes marquent les portes des granges. La nuit dernière, un fermier a vu « une ombre massive, rapide comme le vent, avec des yeux comme des braises ». Le père Morel, prêtre du village, a envoyé un message à Sol-Aureus : « Envoyez des chasseurs. La Bête va s'en prendre aux enfants. »`,
      mood: 'rural, angoissant',
      music: 'Ambiance forestière, vent dans les feuilles, cris d\'animaux lointains',
    },
    gmNotes: [
      { type: 'info', text: `La « Bête » est en réalité Léon, un garçon de 12 ans atteint de lycanthropie depuis un mois. Il se transforme la nuit et ne se souvient de rien au matin. Sa mère, Veuve Mathilde, sait mais le cache.` },
      { type: 'secret', text: `Léon a été mordu par un loup-garou errant dans la forêt. La morsure a guéri mais la malédiction est restée.` },
      { type: 'tip', text: `Les indices sont contradictoires : les traces sont trop petites pour un loup géant, et la Bête n'attaque que les animaux, jamais les humains — elle les évite.` },
    ],
    npcs: [
      {
        name: 'Père Morel',
        role: 'Prêtre du village',
        personality: 'Bienveillant, inquiet, homme de foi',
        appearance: 'Homme de 50 ans, simple soutane, visage rond et bon, mains de travailleur',
        dialogues: {
          greeting: `« Louée soit la Lumière, vous êtes venus ! Chaque nuit qui passe, la Bête grandit en audace. »`,
          info: `« Les attaques ont commencé il y a un mois. Toujours les nuits de lune. Les animaux sont tués mais jamais mangés — c'est étrange, non ? Comme si la créature tuait par instinct, pas par faim. »`,
          quest: `« Trouvez cette bête et débarrassez-nous-en. Je prierai pour votre succès. »`,
          farewell: `« Que la Lumière guide vos pas dans les ténèbres de la forêt. »`,
        },
      },
      {
        name: 'Veuve Mathilde',
        role: 'Mère de Léon / protectrice',
        personality: 'Terrifiée, désespérée, protège son fils à tout prix',
        appearance: 'Femme mince, cernes profondes, mains nerveuses, regard fuyant',
        secret: `Elle enchaîne Léon dans la cave les nuits de pleine lune, mais les chaînes ne tiennent plus.`,
        dialogues: {
          greeting: `« Des chasseurs ? Non, non, il n'y a pas de bête ici. C'est juste un loup, un loup ordinaire de la forêt. »`,
          info: `« Je... je ne sais rien. Mon fils ? Il va bien. Il dort beaucoup ces temps-ci, c'est tout. Les enfants, vous savez... »`,
          farewell: `« S'il vous plaît... ne faites de mal à personne. Parfois les monstres ne sont pas ce qu'ils semblent être. »`,
        },
      },
    ],
    skillChecks: [
      { skill: 'Perspicacité', dc: 13, success: `Mathilde ment — elle sait exactement ce qu'est la Bête et elle la protège.`, failure: `Mathilde semble juste être une femme nerveuse.` },
      { skill: 'Survie', dc: 12, success: `Les traces de griffes sont trop petites pour un loup adulte. La créature est de la taille d'un grand chien — ou d'un enfant.`, failure: `Les traces sont confuses, piétinées par le bétail.` },
    ],
    nextScenes: ['sq5-scene2'],
  },
  {
    id: 'sq5-scene2',
    sceneNumber: 2,
    title: 'La Piste de la Bête',
    type: 'exploration',
    location: 'Forêt de Valombre',
    locationId: 'valombre-foret',
    estimatedMinutes: 25,
    readAloud: {
      text: `La forêt de Valombre est un lieu ancien où les arbres sont si serrés que la lumière du jour peine à percer. Vous suivez les traces — des empreintes de griffes qui alternent entre des pattes de loup et... des pieds nus humains. Les empreintes humaines sont petites. Celles d'un enfant. La piste mène à une clairière où les herbes sont aplaties, tachées de sang animal. Au centre, un morceau de tissu déchiré — une chemise de nuit, taille enfant. Plus loin, un terrier sous un vieux chêne, jonché d'ossements de poules et de lapins.`,
      mood: 'pistage, révélation progressive',
      music: 'Ambiance de forêt sombre, craquements',
    },
    gmNotes: [
      { type: 'info', text: `Les indices convergent : la Bête est un enfant lycanthrope. Les PJ devraient maintenant suspecter Léon.` },
      { type: 'tip', text: `Si les PJ retournent voir Mathilde avec ces preuves, elle craque et avoue tout en suppliant de ne pas tuer son fils.` },
      { type: 'warning', text: `La nuit tombe dans 2 heures. Si les PJ sont encore dans la forêt à la tombée de la nuit, Léon transformé les trouvera.` },
    ],
    skillChecks: [
      { skill: 'Survie', dc: 14, success: `Les traces mènent directement à la maison de Mathilde. L'enfant part de chez lui, se transforme dans la forêt, puis revient à l'aube.`, failure: `Les traces se perdent dans un ruisseau. Il faudra attendre la nuit pour retrouver la Bête.` },
      { skill: 'Nature', dc: 13, success: `Le PJ reconnaît les signes de lycanthropie : traces alternées humain/loup, comportement territorial, cycle lunaire. C'est un loup-garou jeune et incontrôlé.`, failure: `Le PJ pense à un changeforme ou un druide maléfique.` },
      { skill: 'Médecine', dc: 15, success: `Le sang sur les herbes contient des traces d'argenture naturelle — le corps de la créature rejette la malédiction. Elle peut être soignée.`, failure: `Le sang semble être du sang animal ordinaire.` },
    ],
    nextScenes: ['sq5-scene3'],
    previousScene: 'sq5-scene1',
  },
  {
    id: 'sq5-scene3',
    sceneNumber: 3,
    title: 'L\'Enfant-Loup',
    type: 'combat',
    location: 'Clairière de Valombre, nuit',
    locationId: 'valombre-foret',
    estimatedMinutes: 30,
    readAloud: {
      text: `La pleine lune se lève au-dessus des arbres, baignant la clairière d'une lumière argentée. Un hurlement déchire le silence — pas celui d'un loup adulte, mais quelque chose de plus aigu, de plus désespéré. Léon émerge des buissons, mais ce n'est plus un garçon. Son corps se tord, ses os craquent, une fourrure grise envahit sa peau. Il est à mi-chemin entre l'enfant et le loup — une petite forme hérissée, aux yeux dorés emplis de terreur et de rage. Il gronde, bave, griffant le sol. Mais dans ses yeux de bête, vous voyez un enfant qui hurle à l'aide.`,
      mood: 'déchirant, urgent',
      music: 'Cordes dramatiques, tambours lointains',
    },
    gmNotes: [
      { type: 'info', text: `Léon-loup n'est pas un ennemi classique. Il est terrifié et attaque par panique. Les PJ peuvent le combattre, le maîtriser sans le tuer (DC plus élevés), ou tenter de le calmer.` },
      { type: 'warning', text: `Le tuer est l'option facile mais a des conséquences terribles : Mathilde sera dévastée et les PJ perdent de la réputation.` },
      { type: 'tip', text: `Un PJ qui parle doucement et réussit Dressage DC 16 ou Persuasion DC 18 peut calmer la bête assez longtemps pour l'attacher avec des chaînes d'argent (fournies par Père Morel si consulté).` },
    ],
    encounter: {
      name: 'L\'Enfant-Loup',
      enemies: [
        { name: 'Léon (forme loup-garou juvénile)', hp: 35, atk: 6, ac: 13, cr: 1, abilities: ['Régénération (5 PV/tour sauf argent)', 'Morsure lycanthropique (Con DC 12)', 'Fuite paniquée (désengagement bonus)'] },
      ],
      terrain: ['Clairière au clair de lune', 'Souches d\'arbres (obstacles)', 'Buissons épais (couvert)', 'Sol boueux (terrain difficile)'],
      tactics: `Léon attaque le PJ le plus proche puis tente de fuir. Il revient attaquer si poursuivi. Il évite instinctivement l'argent. Si réduit à 10 PV, il reprend partiellement forme humaine et pleure.`,
      loot: [],
    },
    skillChecks: [
      { skill: 'Dressage', dc: 16, success: `L'enfant-loup se calme progressivement, gémissant au lieu de grogner. Il peut être approché.`, failure: `La bête panique et attaque avec plus de férocité.` },
      { skill: 'Athlétisme', dc: 14, success: `Le PJ plaque et immobilise Léon sans le blesser grièvement.`, failure: `Léon se dégage et mord le PJ (1d6+3 dégâts, jet de Con DC 12 contre la lycanthropie).` },
    ],
    nextScenes: ['sq5-scene4'],
    previousScene: 'sq5-scene2',
  },
  {
    id: 'sq5-scene4',
    sceneNumber: 4,
    title: 'Le Sort de Léon',
    type: 'choice',
    location: 'Chapelle de Valombre',
    locationId: 'valombre',
    estimatedMinutes: 20,
    readAloud: {
      text: `L'aube se lève sur Valombre. Léon est redevenu un petit garçon — sale, épuisé, en larmes. Mathilde le serre dans ses bras, tremblante. Le Père Morel se tient devant l'autel de sa chapelle, le visage grave. « Un loup-garou, » murmure-t-il. « Même un enfant. La loi de Sol-Aureus est claire : les lycanthropes doivent être exécutés. » Mathilde pousse un cri. « Non ! C'est mon fils ! Il ne sait pas ce qu'il fait ! » Père Morel lève la main. « Je connais un rituel de purification, mais il nécessite de l'eau bénite de la Source d'Argent, dans les montagnes — à trois jours de marche. Et il n'est pas certain que ça fonctionne. » Il regarde les aventuriers. « Le choix vous revient. Que fait-on de cet enfant ? »`,
      mood: 'solennel, déchirant',
      music: 'Orgue doux, silence lourd',
    },
    gmNotes: [
      { type: 'info', text: `Trois choix principaux, chacun avec des conséquences à long terme.` },
      { type: 'lore', text: `Si guéri, Léon garde une connexion avec la nature et devient un druide puissant. Si caché, il apprend à contrôler sa forme mais reste un danger latent. Si tué, le village est en sécurité mais l'acte hante les PJ.` },
      { type: 'tip', text: `La quête de la Source d'Argent peut être jouée comme une mini-aventure ou résolue en narration si le temps manque.` },
    ],
    npcs: [
      {
        name: 'Léon',
        role: 'Enfant lycanthrope',
        personality: 'Terrifié, confus, innocent',
        appearance: 'Garçon de 12 ans, maigre, cheveux bruns emmêlés, yeux dorés, griffures sur les bras',
        dialogues: {
          greeting: `« Je... je suis un monstre ? »`,
          info: `« Je me souviens de rien. Juste des rêves — courir dans la forêt, la lune, la faim... et puis je me réveille et maman pleure. »`,
          farewell: `« S'il vous plaît... ne me faites pas de mal. Je ferai tout ce que vous direz. »`,
        },
      },
    ],
    choices: [
      {
        id: 'sq5-c4',
        prompt: 'Quel sort pour Léon ?',
        options: [
          {
            label: 'Guérir',
            description: 'Entreprendre le voyage vers la Source d\'Argent pour tenter le rituel de purification',
            consequence: 'Trois jours de voyage aller-retour. Le rituel fonctionne — Léon est guéri mais garde une affinité avec les loups. Mathilde est éternellement reconnaissante. Père Morel bénit les PJ.',
            reputationChange: [{ faction: 'Sol-Aureus', amount: 1 }, { faction: 'Temple', amount: 2 }],
          },
          {
            label: 'Cacher',
            description: 'Garder le secret et aider Mathilde à contenir Léon les nuits de pleine lune',
            consequence: 'Léon reste lycanthrope mais apprend à se contrôler avec le temps. Risque futur : à l\'Acte 3, un incident révèle la vérité. Les PJ devront gérer les conséquences.',
            reputationChange: [{ faction: 'Valombre', amount: 1 }],
          },
          {
            label: 'Exécuter',
            description: 'Suivre la loi et éliminer la menace — aussi terrible que ce soit',
            consequence: 'Léon est tué. Mathilde ne pardonnera jamais. Le village est « en sécurité » mais le poids moral est écrasant. Les PJ font des cauchemars pendant une semaine (désavantage repos long).',
            reputationChange: [{ faction: 'Sol-Aureus', amount: 1 }, { faction: 'Valombre', amount: -3 }],
          },
        ],
      },
    ],
    loot: ['Croc de loup en argent (composant, 50 po)', 'Bénédiction de Morel (1 utilisation de Restauration Mineure)'],
    nextScenes: [],
    previousScene: 'sq5-scene3',
  },
];

const sideQuest5: BookChapter = {
  id: 'sq-5-bete-valombre',
  actNumber: 1,
  chapterNumber: 5,
  title: 'La Bête de Valombre',
  subtitle: 'Quand le monstre est un enfant',
  summary: `Une créature mystérieuse terrorise le hameau de Valombre. L'enquête révèle une vérité déchirante : la « Bête » est Léon, un garçon de 12 ans atteint de lycanthropie. Les aventuriers doivent le traquer, le maîtriser et choisir son destin : guérison, secret ou exécution.`,
  levelRange: '1-3',
  themes: ['lycanthropie', 'choix moral', 'enfant', 'monstre', 'compassion'],
  scenes: sq5_scenes,
  chapterIntro: {
    text: `Quelque chose rôde dans les bois de Valombre. Les fermiers barricadent leurs portes, les enfants ne jouent plus dehors. Mais la vérité est plus terrible que n'importe quel conte de loup.`,
    mood: 'inquiétant, rural',
    music: 'Vent dans les feuilles, hurlement lointain',
  },
  chapterConclusion: {
    text: `L'affaire de la Bête de Valombre est close — mais pas oubliée. Le choix des aventuriers définira le destin d'un enfant et la mémoire d'un village. Parfois, la plus grande bataille se livre dans le cœur.`,
    mood: 'mélancolique, résolu',
    music: 'Violon solo, silence',
  },
  rewards: { xp: 350, gold: '50 po', items: ['Croc de loup en argent', 'Bénédiction de Morel'] },
};

// ============================================================================
// QUÊTE 6 : Le Testament du Vieux Sam (RP) — 3 scènes
// ============================================================================

const sq6_scenes: BookScene[] = [
  {
    id: 'sq6-scene1',
    sceneNumber: 1,
    title: 'Les Dernières Volontés',
    type: 'social',
    location: 'Maison de Sam, Quartier du Port, Sol-Aureus',
    locationId: 'sol-aureus-port',
    estimatedMinutes: 20,
    readAloud: {
      text: `La petite maison du Vieux Sam sent la cire d'abeille et le tabac à pipe. Sam était un marin retraité, un conteur du port que tout le monde aimait. Il est mort cette nuit, paisiblement, un sourire aux lèvres et une lettre dans la main. Son notaire, un gnome nerveux nommé Maître Pik, vous a convoqués. « Sam m'a laissé des instructions précises. Il dit que vous — oui, vous spécifiquement — êtes les seuls dignes de son dernier cadeau. » Il déplie un parchemin couvert d'une écriture tremblante. C'est un poème cryptique avec une carte grossière des catacombes sous la ville.`,
      mood: 'nostalgique, intrigant',
      music: 'Accordéon doux, bruits de port',
    },
    gmNotes: [
      { type: 'info', text: `Sam a caché un « trésor » dans les catacombes il y a 30 ans. Le poème est un indice en quatre strophes menant à travers les catacombes. Le trésor n'est pas de l'or — c'est le journal de bord de son navire, des lettres de son épouse décédée, et un médaillon contenant leurs portraits.` },
      { type: 'tip', text: `Si les PJ ont connu Sam en jeu (taverne, port), ajoutez des flashbacks ou souvenirs partagés pour renforcer l'émotion.` },
      { type: 'lore', text: `Le poème : « Là où le sel rencontre la pierre / Où les rois dorment sous la terre / Cherche l'étoile qui ne brille pas / Et le trésor se révélera. » Les strophes pointent vers : l'entrée par la cave de la taverne du Port, le couloir des tombes royales, une étoile gravée au plafond (invisible sans lumière magique), un levier qui ouvre une cache.` },
    ],
    npcs: [
      {
        name: 'Maître Pik',
        role: 'Notaire gnome',
        personality: 'Nerveux, précis, secrètement ému',
        appearance: 'Gnome âgé, petites lunettes, costume impeccable, mallette de cuir',
        dialogues: {
          greeting: `« Ah, vous voilà. Sam a été très spécifique — il a dit, et je cite : "Ceux-là, pas d'autres. Ils comprendront." »`,
          info: `« Le parchemin contient un poème et une carte. Sam m'a dit que le trésor n'avait de valeur que pour le cœur. Je n'ai aucune idée de ce que ça signifie. »`,
          farewell: `« Bonne chance. Et... Sam était un homme bien. Le monde est un peu plus triste sans lui. »`,
        },
      },
    ],
    skillChecks: [
      { skill: 'Investigation', dc: 12, success: `Le poème est un guide : chaque strophe correspond à une étape dans les catacombes. « Le sel et la pierre » = entrée par la cave du port.`, failure: `Le poème semble être juste un mauvais vers de marin nostalgique.` },
    ],
    nextScenes: ['sq6-scene2'],
  },
  {
    id: 'sq6-scene2',
    sceneNumber: 2,
    title: 'Les Catacombes du Souvenir',
    type: 'exploration',
    location: 'Catacombes de Sol-Aureus',
    locationId: 'sol-aureus-catacombes',
    estimatedMinutes: 30,
    readAloud: {
      text: `Les catacombes sous Sol-Aureus sont un labyrinthe d'os et de silence. Les murs sont tapissés de crânes empilés avec une régularité macabre, leurs orbites vides vous suivant du « regard ». En suivant le poème de Sam, vous traversez le couloir des rois oubliés — des alcôves où reposent les anciens seigneurs de la cité, leurs noms effacés par le temps. Au plafond, parmi les toiles d'araignée, vous distinguez des gravures : des constellations. L'une d'elles — une étoile à cinq branches — ne brille pas comme les autres. Elle est plus terne, comme endormie. C'est celle que Sam mentionnait.`,
      mood: 'souterrain, mystérieux, funèbre',
      music: 'Échos, gouttes d\'eau, silence oppressant',
    },
    gmNotes: [
      { type: 'info', text: `Les catacombes contiennent un piège mécanique (dalle de pression) et un puzzle (l'étoile au plafond). L'étoile est un mécanisme — il faut projeter de la lumière magique dessus pour activer le levier caché.` },
      { type: 'warning', text: `Piège : une dalle de pression active un jet de fléchettes. Perception DC 14 pour repérer, Dextérité DC 13 pour esquiver, 2d6 dégâts perforants sinon.` },
      { type: 'tip', text: `Le puzzle de l'étoile peut être résolu par Arcanes DC 13 (comprendre le mécanisme magique) ou Intelligence DC 14 (trouver le levier manuellement derrière une brique).` },
    ],
    skillChecks: [
      { skill: 'Perception', dc: 14, success: `Le PJ repère la dalle piégée dans le couloir des rois — un léger renflement dans la pierre.`, failure: `Le piège se déclenche — jets de Dextérité DC 13 pour tout le groupe.` },
      { skill: 'Arcanes', dc: 13, success: `L'étoile au plafond réagit à la lumière magique. Un sort de Lumière ou une torche enchantée l'active, révélant un levier dans le mur.`, failure: `L'étoile reste inerte. Les PJ doivent chercher une autre approche.` },
      { skill: 'Investigation', dc: 14, success: `Un levier manuel est dissimulé derrière une brique descellée sous l'étoile.`, failure: `Le mur semble solide et sans intérêt.` },
    ],
    nextScenes: ['sq6-scene3'],
    previousScene: 'sq6-scene1',
  },
  {
    id: 'sq6-scene3',
    sceneNumber: 3,
    title: 'Le Trésor de Sam',
    type: 'revelation',
    location: 'Chambre secrète, Catacombes',
    locationId: 'sol-aureus-catacombes',
    estimatedMinutes: 15,
    readAloud: {
      text: `Le levier s'enfonce avec un clic satisfaisant. Un pan de mur pivote, révélant une petite chambre circulaire, sèche et propre — Sam l'a entretenue pendant des décennies. Au centre, un coffre de marin, simple, en bois salé par les embruns. À l'intérieur, pas d'or, pas de gemmes. Un journal de bord relié de cuir, couvert de l'écriture de Sam — trente ans de voyages, d'aventures, de tempêtes et de merveilles. Un paquet de lettres nouées d'un ruban fané — les lettres d'amour de son épouse, Éléonore, morte il y a vingt ans. Et un médaillon en cuivre contenant deux portraits miniatures : Sam jeune et souriant, et une femme d'une beauté lumineuse. Sur le couvercle du coffre, gravé au couteau : « Le vrai trésor, c'est ce qu'on ne peut pas acheter. »`,
      mood: 'émouvant, intime',
      music: 'Boîte à musique, violon doux',
    },
    gmNotes: [
      { type: 'info', text: `Le « trésor » est sentimental. Cependant, le journal de bord contient aussi des coordonnées vers une île inexplorée — potentiel crochet pour une aventure future. Le médaillon est un objet magique mineur (avantage contre la peur 1×/jour).` },
      { type: 'tip', text: `Faites de ce moment un instant calme et émouvant. Pas de combat, pas de piège — juste l'héritage d'un vieil homme qui a voulu partager ses souvenirs avec les bonnes personnes.` },
      { type: 'lore', text: `Les lettres d'Éléonore révèlent que Sam était autrefois un aventurier célèbre sous un autre nom. Ses exploits sont mentionnés dans les livres d'histoire de Sol-Aureus.` },
    ],
    loot: [
      'Journal de bord de Sam (coordonnées d\'une île mystérieuse — crochet d\'aventure)',
      'Lettres d\'Éléonore (valeur sentimentale)',
      'Médaillon de Sam et Éléonore (avantage contre la peur, 1×/jour)',
      'Coffre de marin (artisanat, 30 po)',
    ],
    nextScenes: [],
    previousScene: 'sq6-scene2',
  },
];

const sideQuest6: BookChapter = {
  id: 'sq-6-testament-vieux-sam',
  actNumber: 1,
  chapterNumber: 6,
  title: 'Le Testament du Vieux Sam',
  subtitle: 'Le dernier cadeau d\'un vieux loup de mer',
  summary: `Le Vieux Sam, marin retraité bien-aimé de Sol-Aureus, est mort en laissant un testament cryptique menant à un « trésor » caché dans les catacombes. Les aventuriers suivent les indices, évitent les pièges et découvrent un trésor qui n'a pas de prix — les souvenirs d'une vie bien vécue.`,
  levelRange: '1-3',
  themes: ['nostalgie', 'puzzle', 'catacombes', 'héritage', 'émotion'],
  scenes: sq6_scenes,
  chapterIntro: {
    text: `Tout Sol-Aureus pleure le Vieux Sam. Mais le vieux marin avait un dernier tour dans son sac — une chasse au trésor posthume pour des aventuriers qu'il jugeait dignes de son héritage.`,
    mood: 'nostalgique, chaleureux',
    music: 'Accordéon maritime, mouettes',
  },
  chapterConclusion: {
    text: `Le coffre de Sam est ouvert, ses souvenirs partagés. Le vrai trésor n'était pas dans l'or mais dans l'amour d'un vieil homme pour la vie et pour ceux qui l'ont accompagné. Les aventuriers repartent avec plus qu'un médaillon — ils repartent avec une leçon.`,
    mood: 'émouvant, apaisé',
    music: 'Boîte à musique, silence respectueux',
  },
  rewards: { xp: 200, gold: '30 po (coffre)', items: ['Médaillon de Sam (avantage vs peur)', 'Journal de bord (crochet aventure)', 'Lettres d\'Éléonore'] },
};

// ============================================================================
// EXPORT
// ============================================================================

export const SIDE_QUESTS_ACT_1: BookChapter[] = [
  sideQuest1,
  sideQuest2,
  sideQuest3,
  sideQuest4,
  sideQuest5,
  sideQuest6,
];
