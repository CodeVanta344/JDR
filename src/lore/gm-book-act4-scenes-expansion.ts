/**
 * ACTE 4 - EXPANSION DES SCENES
 * Nouvelles scènes pour les Chapitres 8, 9 et 10
 * 13 scènes additionnelles pour enrichir l'expérience de jeu
 */

import type { BookScene } from './gm-book-data';

// ============================================================================
// CHAPITRE 8 : LA FORGE DU MONDE — Scènes additionnelles
// ============================================================================

const scene_4_8_mountain_pass: BookScene = {
  id: 'scene-4-8-mountain-pass',
  sceneNumber: 201,
  title: "Le Col des Lamentations",
  type: 'exploration',
  location: "Col de montagne entre Sol-Aureus et les Monts Cœur-de-Fer",
  locationId: 'monts-coeur-de-fer-col',
  estimatedMinutes: 35,
  readAloud: {
    text: `Le sentier s'amincit jusqu'à n'être qu'une cicatrice dans la roche, et le vent hurle comme un animal blessé dans l'étroit défilé qui serpente entre deux pics déchiquetés. Le Col des Lamentations — les nains l'appellent « Khaz-Durum », la Gorge qui Pleure — est le seul passage vers les Monts Cœur-de-Fer en hiver, et il mérite amplement sa réputation.

De chaque côté, des parois de granit noir s'élèvent à perte de vue, striées de veines de quartz qui brillent faiblement dans la lumière grise. La neige couvre tout — le sentier, les rochers, vos épaules, vos pensées. Elle tombe sans interruption depuis deux jours, épaisse et silencieuse, transformant le monde en un tableau blanc et gris où les distances n'ont plus de sens.

Le froid est un ennemi à part entière. Pas le froid ordinaire d'un hiver en ville — un froid primordial, qui s'insinue à travers les armures, les fourrures, la chair, jusqu'aux os. Vos doigts sont engourdis. Vos pensées ralentissent. Et quelque part au-dessus de vous, la montagne gronde.

Un des guides nains — un vieux prospecteur nommé Durnik — lève soudain le poing. Arrêt. Silence. Il colle son oreille contre la paroi rocheuse, et son visage change. La couleur s'en va, remplacée par quelque chose de blanc et de froid qui n'a rien à voir avec la neige.

« Avalanche, » murmure-t-il. « Pas maintenant. Bientôt. Le rocher chante. Et quand le rocher chante, la neige danse. Et quand la neige danse... »

Il ne finit pas sa phrase. Il n'en a pas besoin.

Au-dessus de vous, dans le blanc infini, quelque chose commence à bouger.`,
    mood: "Survie alpine, majesté glaciale, danger naturel imminent",
    music: "Vent hurlant, cordes tendues et aiguës, silences oppressants, grondement sourd en crescendo",
  },
  gmNotes: [
    { type: 'info', text: "Le passage du col est un défi de survie pure. L'avalanche est inévitable — la question est comment les PJ y survivent. C'est aussi l'occasion de montrer la majesté terrifiante des Monts Cœur-de-Fer." },
    { type: 'tip', text: "Faites monter la tension lentement. Le froid, la fatigue, le bruit du vent — puis le grondement soudain de l'avalanche. Demandez des jets en cascade, chaque échec empirant la situation." },
    { type: 'warning', text: "L'avalanche ne doit pas tuer les PJ, mais les mettre en danger réel. Des PNJ du groupe peuvent être ensevelis et nécessiter un sauvetage rapide." },
    { type: 'secret', text: "L'avalanche n'est pas naturelle. Un agent du Cercle des Cendres a placé des runes d'explosion sur les corniches de neige au-dessus du col. Si les PJ trouvent les runes après l'avalanche (Investigation CD 55), c'est une preuve de sabotage." },
  ],
  npcs: [
    {
      name: "Durnik Barbe-Givre",
      role: "Guide de montagne nain, prospecteur retraité",
      personality: "Laconique, pragmatique, connaît ces montagnes comme sa barbe. Parle peu mais chaque mot compte. Terrifié par l'avalanche mais ne le montre pas.",
      appearance: "Nain âgé, barbe blanche gelée en pointes, yeux gris comme le granit. Manteau de fourrure d'ours polaire, piolet à la ceinture, bottes clouées. Chaque ride est une carte de montagne.",
      dialogues: {
        greeting: "« Moins de mots, plus de marche. Les montagnes écoutent. Et elles n'aiment pas les bavards. »",
        info: "« Le Col des Lamentations pleure pas pour rien. Trois caravanes perdues cet hiver. La neige est instable, les vents sont fous, et quelque chose effraie les chèvres de montagne. Quand les chèvres ont peur, j'ai peur. »",
        quest: "« Si l'avalanche tombe — et elle tombera — courez vers la grotte à deux cents pas en avant. Paroi est. Entrée basse, faut se pencher. C'est votre seule chance. Ne vous arrêtez pas. Ne regardez pas en arrière. Courez. »",
        farewell: "« On se retrouve de l'autre côté. Ou on se retrouve pas. Dans les deux cas, j'aurai fait mon boulot. »",
      },
      stats: { hp: 45, atk: 10, ac: 15 },
    },
  ],
  skillChecks: [
    { skill: 'Survie', dc: 50, success: "Vous repérez les signes de l'avalanche imminente — les fissures dans le manteau neigeux, le silence soudain des oiseaux — et vous avez le temps de vous mettre à couvert.", failure: "L'avalanche vous surprend en terrain découvert. Jet de Dextérité CD 50 pour éviter d'être enseveli." },
    { skill: 'Athlétisme', dc: 50, success: "Vous arrachez un compagnon enseveli de la neige compacte. Il tousse, crache, mais il est vivant. Les secondes comptaient — il lui restait peut-être une minute d'air.", failure: "Vous creusez frénétiquement mais la neige est dure comme du béton. Il vous faut de l'aide — et vite." },
    { skill: 'Perception', dc: 45, success: "De la grotte, vous apercevez une vue panoramique extraordinaire — les Monts Cœur-de-Fer dans toute leur majesté, la Forge-Citadelle de Forgefer brillant comme une étoile au flanc de la plus haute montagne.", failure: "La tempête de neige masque tout. Vous ne voyez pas plus loin que votre main tendue." },
  ],
  choices: [
    {
      id: 'choice-mountain-pass',
      prompt: "Après l'avalanche, comment les héros poursuivent-ils ?",
      options: [
        {
          label: "Forcer le passage malgré le danger",
          description: "Traverser le col encore instable pour gagner du temps.",
          consequence: "Arrivée rapide à Forgefer, mais avec des blessures et un moral entamé. Les nains respectent le courage, mais s'inquiètent de votre état.",
          nextScene: 'scene-4-8-dwarf-politics',
          skillCheck: { skill: 'Constitution', dc: 50, success: "Vous traversez le col gelé avec une détermination de fer. Épuisés mais debout. Les nains de la Porte d'Acier vous accueillent avec un respect silencieux.", failure: "Le froid et l'effort vous mettent à genoux. Vous arrivez à Forgefer portés par les gardes nains — vivants, mais à peine." },
        },
        {
          label: "Chercher un passage alternatif",
          description: "Durnik connaît un ancien tunnel nain qui contourne le col.",
          consequence: "Le tunnel est sûr mais long. Perte d'un jour, mais arrivée en bonne forme. Le tunnel contient des fresques naines anciennes qui racontent l'histoire de la Forge Primordiale.",
          nextScene: 'scene-4-8-dwarf-politics',
        },
        {
          label: "Investiguer les runes suspectes",
          description: "Examiner les débris de l'avalanche pour chercher des preuves de sabotage.",
          consequence: "Découverte des runes du Cercle des Cendres. Preuve que l'ennemi savait que vous veniez. Information cruciale pour les nains.",
          nextScene: 'scene-4-8-dwarf-politics',
          skillCheck: { skill: 'Investigation', dc: 55, success: "Des fragments de runes ashkanes dans la neige — preuve irréfutable de sabotage. Les nains seront furieux d'apprendre que le Cercle opère dans leurs montagnes.", failure: "Trop de neige, trop de débris. S'il y avait des preuves, l'avalanche les a enterrées." },
          reputationChange: [{ faction: "Nains de Forgefer", amount: 10 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-4-8-dwarf-politics', 'scene-4-8-1'],
  previousScene: 'scene-3-7-mourning',
};

const scene_4_8_dwarf_politics: BookScene = {
  id: 'scene-4-8-dwarf-politics',
  sceneNumber: 202,
  title: "Le Marteau et la Couronne",
  type: 'social',
  location: "Grande Salle du Conseil de Forgefer",
  locationId: 'forgefer',
  estimatedMinutes: 40,
  readAloud: {
    text: `Forgefer est une merveille d'ingénierie qui ferait pleurer d'envie n'importe quel architecte humain. Taillée directement dans le flanc du Mont Cœur-de-Fer, la citadelle-forge est un labyrinthe de halls immenses, de tunnels éclairés par de la lave canalisée, et de mécanismes si complexes qu'ils semblent vivants. Des engrenages géants tournent dans les murs, alimentant des ascenseurs, des forges, des ventilateurs, des systèmes d'irrigation — tout un écosystème mécanique qui pulse comme un cœur d'acier.

La Grande Salle du Conseil est le cœur politique de ce cœur mécanique. C'est une caverne naturelle transformée en salle de trône, avec des stalactites sculptées en chandeliers et un sol de marbre noir poli comme un miroir. Au centre, la Table des Clans — un anneau de pierre massive autour d'une forge miniature dont la flamme ne s'éteint jamais.

Aujourd'hui, autour de cette table, les représentants des sept clans nains se font face. Et l'atmosphère est aussi chaude que la forge — mais pas dans le bon sens.

Le Roi Thrain Forge-Flamme trône sur son siège de fer. À sa droite, le Clan Marteau-d'Or, marchands et diplomates. À sa gauche, le Clan Lame-Noire, guerriers et isolationnistes. En face, les cinq autres clans, chacun tirant dans sa direction.

Et au milieu, le sujet qui divise : faut-il aider les Grandes-Gens dans leur guerre, ou refermer les portes de Forgefer et attendre que la tempête passe ?

Vous êtes invités à parler. Ce qui, chez les nains, signifie que vous êtes invités à être jugés.`,
    mood: "Tension politique, fierté naine, diplomatie sous haute pression",
    music: "Percussions naines (enclumes, marteaux), basses profondes de cuivre, échos de caverne",
  },
  gmNotes: [
    { type: 'info', text: "Le conseil nain est un exercice de diplomatie où chaque mot compte. Les nains respectent la force, l'honnêteté et la compétence — pas la flatterie. Le mauvais argument peut faire perdre des alliés cruciaux." },
    { type: 'tip', text: "Faites parler les chefs de clan entre eux avant l'intervention des PJ. Montrez les divisions, les rancunes anciennes, les alliances secrètes. Les PJ doivent comprendre le paysage politique avant de naviguer dedans." },
    { type: 'warning', text: "Les nains sont fiers. Toute tentative de manipulation ou de condescendance sera immédiatement détectée et punie. La Persuasion fonctionne, l'Intimidation est un suicide diplomatique." },
    { type: 'secret', text: "Le Clan Lame-Noire a déjà été approché par le Cercle des Cendres. Leur chef, Brunhilde Lame-Noire, n'a pas accepté — mais elle n'a pas refusé non plus. Elle attend de voir qui offre le meilleur marché." },
    { type: 'lore', text: "Le Conseil des Clans se réunit selon un protocole millénaire. Chaque clan a un vote. Le Roi tranche en cas d'égalité. Mais le vote ne suffit pas — il faut l'unanimité pour une action militaire. C'est la loi naine, et aucun roi ne l'a jamais enfreinte." },
  ],
  npcs: [
    {
      name: "Roi Thrain Forge-Flamme",
      role: "Souverain de Forgefer, forgeron-roi",
      personality: "Pragmatique, brusque, secrètement sentimental. Aime son peuple plus que sa couronne. Teste constamment ceux qui se présentent devant lui.",
      appearance: "Nain massif, barbe rousse tressée avec des anneaux de mithril. Couronne de fer brut intégrée à un casque de forgeron. Tablier de cuir par-dessus une armure royale. Mains calleuses d'artisan.",
      dialogues: {
        greeting: "« Alors. Vous voilà. Plus petits en vrai qu'en légende — mais c'est toujours comme ça. Asseyez-vous. Parlez. Et par les ancêtres, soyez brefs. J'ai une épée à finir avant le dîner. »",
        info: "« Mon peuple est divisé. Les Marteau-d'Or veulent commercer avec le monde, les Lame-Noire veulent fermer nos portes. Et moi, je suis au milieu, comme un clou entre deux marteaux. Votre job, c'est de me donner une raison de choisir un côté. »",
        quest: "« Vous voulez l'Enclume Primordiale ? La relique la plus sacrée de mon peuple ? (rire grave) J'admire le culot. Montrez-moi que vous méritez ne serait-ce que de la regarder. Et non, un joli discours ne suffira pas. »",
        farewell: "« Je prends pas de décision à chaud. C'est un truc de Grandes-Gens. Demain, le Conseil vote. D'ici là, faites-vous des amis. Vous en aurez besoin. »",
      },
      stats: { hp: 130, atk: 24, ac: 22 },
    },
    {
      name: "Brunhilde Lame-Noire",
      role: "Chef du Clan Lame-Noire, isolationniste",
      personality: "Froide, calculatrice, patriote. Considère les non-nains comme des problèmes potentiels. Respecte secrètement la force des PJ s'ils la démontrent.",
      appearance: "Naine athlétique, cheveux noirs coupés court, cicatrice en X sur la joue. Armure noire sans ornement. Deux haches à la ceinture. Regard qui pèse et mesure.",
      dialogues: {
        greeting: "« Les Grandes-Gens viennent toujours quand ils ont besoin de quelque chose. Jamais quand nous avons besoin d'eux. Curieux, non ? »",
        info: "« Forgefer a survécu à trois âges du monde en restant dans ses montagnes. Notre pierre est solide, nos portes épaisses, nos lames aiguisées. Pourquoi risquer tout ça pour une guerre de surface ? »",
        quest: "« Vous voulez mon vote ? Montrez-moi que vous êtes dignes. Pas avec des mots — avec de l'acier. Le Défi du Lame-Noire : un combat singulier contre mon champion. Si vous gagnez, j'écoute. Si vous perdez... vous repartez. »",
        farewell: "« Au moins vous avez du cran. C'est plus que ce que je peux dire de la plupart des Grandes-Gens. »",
      },
      stats: { hp: 95, atk: 21, ac: 20 },
    },
  ],
  skillChecks: [
    { skill: 'Persuasion', dc: 55, success: "Votre argument touche une corde sensible : les nains ne se cachent pas — ils se préparent. Aider maintenant, c'est choisir le champ de bataille plutôt que de le subir. Thrain hoche la tête.", failure: "Les nains écoutent poliment, mais les bras restent croisés. Vous n'avez pas trouvé l'angle juste." },
    { skill: 'Histoire', dc: 45, success: "Vous citez la Bataille des Trois Marteaux, où une alliance nain-humain a sauvé Forgefer de la destruction. Les vieux nains échangent des regards. L'histoire a du poids ici.", failure: "Votre connaissance de l'histoire naine est lacunaire. Un ancien corrige poliment — mais fermement — vos erreurs." },
  ],
  choices: [
    {
      id: 'choice-dwarf-diplomacy',
      prompt: "Comment les héros influencent-ils le vote du Conseil ?",
      options: [
        {
          label: "Accepter le Défi du Lame-Noire",
          description: "Combat singulier contre le champion de Brunhilde pour gagner son vote.",
          consequence: "Le champion est un guerrier d'élite (HP 85, ATK 20, AC 19). La victoire gagne le respect du Clan Lame-Noire et de tous les nains. La défaite est humiliante mais pas fatale.",
          nextScene: 'scene-4-8-dragon-lair',
          reputationChange: [{ faction: "Nains de Forgefer", amount: 20 }],
        },
        {
          label: "Révéler les preuves de sabotage du Cercle",
          description: "Montrer les runes trouvées dans l'avalanche pour prouver que l'ennemi est déjà dans les montagnes.",
          consequence: "Les nains sont furieux. Le Cercle des Cendres ose opérer sur leurs terres ? Le vote bascule unanimement vers l'alliance — mais par colère, pas par amitié.",
          nextScene: 'scene-4-8-dragon-lair',
          reputationChange: [{ faction: "Nains de Forgefer", amount: 15 }],
        },
        {
          label: "Proposer un marché commercial",
          description: "Offrir des concessions commerciales au nom de Sol-Aureus en échange de l'aide militaire.",
          consequence: "Le Clan Marteau-d'Or est ravi. Les autres sont méfiants mais intéressés. Le vote passe, mais les conditions sont sévères — Sol-Aureus paiera cher cette alliance.",
          nextScene: 'scene-4-8-dragon-lair',
          skillCheck: { skill: 'Persuasion', dc: 50, success: "Les termes sont équitables. Les nains sont satisfaits, Sol-Aureus peut se le permettre. Une vraie alliance.", failure: "Les nains vous écorchent dans la négociation. Sol-Aureus devra fournir des ressources considérables après la guerre." },
          reputationChange: [{ faction: "Nains de Forgefer", amount: 10 }, { faction: "Sol-Aureus", amount: -5 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-4-8-dragon-lair', 'scene-4-8-2'],
  previousScene: 'scene-4-8-mountain-pass',
};

const scene_4_8_dragon_lair: BookScene = {
  id: 'scene-4-8-dragon-lair',
  sceneNumber: 203,
  title: "Le Cristal et la Flamme",
  type: 'combat',
  location: "Caverne de Vyraxithon, profondeurs des Monts Cœur-de-Fer",
  locationId: 'forgefer-profondeurs',
  estimatedMinutes: 50,
  readAloud: {
    text: `Le tunnel descend si profondément que la chaleur de la surface devient un souvenir lointain, remplacée par une chaleur différente — celle du cœur de la terre elle-même. Les parois de la caverne passent du granit au cristal, des formations géologiques impossibles qui captent et réfractent la moindre lumière en arcs-en-ciel prismatiques.

Et puis la caverne s'ouvre.

C'est immense. Un dôme naturel de cristal si vaste que sa voûte se perd dans l'obscurité, constellé de gemmes qui brillent comme des étoiles souterraines. Le sol est couvert d'or. Pas figurativement — littéralement. Des pièces, des lingots, des artefacts, des armures, des couronnes, des sceptres. Le trésor de mille rois entassé comme des feuilles mortes.

Et au centre de ce trésor, lovée autour de l'Enclume Primordiale comme un chat autour d'un jouet favori, Vyraxithon.

Le dragon de cristal n'est pas fait de chair. Son corps est une sculpture vivante de quartz, d'améthyste et de diamant, chaque écaille un prisme qui décompose la lumière en spectres mouvants. Ses yeux sont deux saphirs étoilés, profonds comme des puits, intelligents comme aucun animal ne devrait l'être.

Il ne dort pas. Il vous attendait.

Une voix résonne dans votre esprit — pas dans vos oreilles, dans votre esprit — claire comme du cristal, ancienne comme la pierre.

« Mortels. Enfin. Je commençais à m'ennuyer. Asseyez-vous sur l'or — il y en a assez — et parlons. Si votre conversation est divertissante, je pourrais ne pas vous manger. Si elle est brillante... je pourrais même vous aider. »

Un sourire de cristal. Des dents de diamant.

« Mais d'abord, une énigme. J'adore les énigmes. »`,
    mood: "Majesté draconique, tension intellectuelle, beauté mortelle",
    music: "Cristaux qui résonnent, basses profondes et harmoniques, silence de cathédrale, grondement sourd",
  },
  gmNotes: [
    { type: 'info', text: "Vyraxithon est un dragon ancien qui préfère les jeux d'esprit au combat. Il PEUT être vaincu par la force, mais c'est le chemin le plus difficile et le moins gratifiant. L'intelligence et la diplomatie sont les clés." },
    { type: 'tip', text: "Jouez Vyraxithon comme un être d'une intelligence terrifiante qui s'ennuie depuis des siècles. Il est amusé par les mortels, pas menacé. Chaque échange doit ressembler à un chat jouant avec une souris — mais un chat philosophe." },
    { type: 'warning', text: "Si les joueurs attaquent immédiatement, Vyraxithon riposte avec une puissance écrasante. Mais il leur donne une chance de s'arrêter — il VEUT la conversation, pas le combat." },
    { type: 'secret', text: "L'énigme de Vyraxithon est une métaphore de la situation des héros : 'Qu'est-ce qui est plus fort que les chaînes mais se brise quand on le tient trop fort ?' Réponse : la confiance. Si les joueurs répondent correctement, le dragon est satisfait et partage un secret sur les Sceaux." },
    { type: 'lore', text: "Vyraxithon est l'un des derniers dragons primordiaux — des créatures nées de la magie brute du monde avant les Sceaux. Il garde l'Enclume non par cupidité mais par devoir : les Premiers lui ont confié cette tâche il y a des éons." },
  ],
  npcs: [
    {
      name: "Vyraxithon, Dragon de Cristal",
      role: "Gardien de l'Enclume Primordiale / Ancien Primordial",
      personality: "Intellectuel, sarcastique, philosophe. Adore les énigmes, les paradoxes et les mortels qui le surprennent. Méprise la violence gratuite mais est capable d'une destruction totale.",
      appearance: "Dragon de taille colossale, entièrement fait de cristal vivant. Chaque mouvement produit un son de carillon. Sa voix est télépathique, résonnant directement dans l'esprit comme un écho de cristal.",
      secret: "Vyraxithon est fatigué. Garder l'Enclume pendant des millénaires l'a usé. Il VEUT la donner — mais seulement à quelqu'un qui comprend sa valeur. L'énigme est un test, pas un obstacle.",
      dialogues: {
        greeting: "« Ah, des bipèdes. Ma forme préférée de divertissement. Vous avez des pouces opposables ET la capacité de vous entre-tuer pour des raisons abstraites. Fascinant, vraiment. »",
        info: "« L'Enclume Primordiale est la première chose que les Premiers ont créée. Avant les Sceaux, avant les races, avant le concept même de 'création'. C'est l'outil qui a forgé le monde. Et vous voulez l'emprunter. C'est comme demander à emprunter le soleil. »",
        quest: "« Mon énigme est simple. Si vous la résolvez, l'Enclume est vôtre — et ma garde prend fin. Si vous échouez... eh bien, j'ai un trésor, mais il manque toujours de statues. Vous feriez de jolies statues. »",
        farewell: "« Partez. Forgez votre destin — littéralement, avec l'Enclume. Et si vous sauvez le monde... revenez me raconter. J'aime les histoires avec une bonne fin. »",
      },
      stats: { hp: 350, atk: 35, ac: 25 },
    },
  ],
  skillChecks: [
    { skill: 'Intelligence', dc: 55, success: "L'énigme est résolue. Vyraxithon éclate d'un rire cristallin qui fait vibrer toute la caverne. 'Enfin ! Quelqu'un qui PENSE ! Prenez l'Enclume. Vous l'avez méritée.'", failure: "Mauvaise réponse. Vyraxithon soupire, ses yeux de saphir se voilant de déception. 'Mmh. Presque. Essayez encore. Vous avez droit à trois tentatives. Les Premiers aimaient le chiffre trois.'" },
    { skill: 'Persuasion', dc: 60, success: "Vous ne résolvez pas l'énigme — vous la transcendez. Vous expliquez pourquoi vous avez besoin de l'Enclume, ce que vous êtes prêts à sacrifier. Le dragon vous regarde longuement. 'La bonne réponse n'était pas un mot. C'était la conviction. Prenez-la.'", failure: "Vyraxithon écoute avec patience, mais secoue la tête. 'Des mots jolis, mortels. Mais les mots ne forgent pas l'acier. Résolvez l'énigme ou partez.'" },
  ],
  choices: [
    {
      id: 'choice-dragon-encounter',
      prompt: "Comment les héros abordent-ils Vyraxithon ?",
      options: [
        {
          label: "Résoudre l'énigme",
          description: "Réfléchir et proposer une réponse à l'énigme du dragon.",
          consequence: "Si la réponse est correcte, le dragon cède l'Enclume avec grâce et partage un secret sur les Sceaux. Meilleur résultat possible.",
          nextScene: 'scene-4-8-forge-ritual',
          reputationChange: [{ faction: "Nains de Forgefer", amount: 10 }],
        },
        {
          label: "Négocier un pacte",
          description: "Proposer au dragon un échange — l'Enclume contre un service futur.",
          consequence: "Vyraxithon est intrigué. Il accepte si les héros promettent de le libérer de son devoir de gardien. Un pacte draconique est contraignant et magique.",
          nextScene: 'scene-4-8-forge-ritual',
          skillCheck: { skill: 'Persuasion', dc: 55, success: "Le pacte est scellé. L'Enclume est vôtre, mais vous devez un service à un dragon ancien. Ce genre de dette a tendance à se rappeler aux pires moments.", failure: "Vyraxithon ricane. 'Vous n'avez rien d'assez précieux pour moi, mortels. Résolvez l'énigme ou battez-vous.'" },
        },
        {
          label: "Combattre Vyraxithon",
          description: "Affronter le dragon de cristal par la force.",
          consequence: "Combat dévastateur. Vyraxithon est un adversaire redoutable. La victoire est possible mais coûteuse, et l'Enclume pourrait être endommagée dans la bataille.",
          nextScene: 'scene-4-8-forge-ritual',
        },
      ],
    },
  ],
  encounter: {
    name: "Vyraxithon, Dragon de Cristal Ancien",
    enemies: [
      { name: "Vyraxithon", hp: 350, atk: 35, ac: 25, cr: 16, abilities: ["Souffle prismatique (cône 20m, 12d8 dégâts variés)", "Aura de réfraction (désavantage aux attaques à distance)", "Résonance cristalline (2d8 tonnerre à tous dans 10m)", "Résistance à toute magie"] },
    ],
    terrain: ["Trésor au sol (terrain difficile)", "Cristaux réflecteurs (sorts peuvent ricocher)", "Enclume Primordiale (couverture totale, indestructible)", "Stalactites de cristal (peuvent être brisées pour dégâts de zone)"],
    tactics: "Vyraxithon utilise le terrain cristallin à son avantage, réfractant les sorts et créant des illusions prismatiques. Il combat avec une intelligence stratégique millénaire, pas avec la rage aveugle.",
    loot: ["Écaille de Cristal Dragon (composant légendaire)", "Gemme de Connaissance Primordiale (un sort de niveau 7 au choix)", "100-500 PP en trésor"],
  },
  nextScenes: ['scene-4-8-forge-ritual'],
  previousScene: 'scene-4-8-dwarf-politics',
};

const scene_4_8_forge_ritual: BookScene = {
  id: 'scene-4-8-forge-ritual',
  sceneNumber: 204,
  title: "Le Souffle de la Création",
  type: 'revelation',
  location: "La Forge Originelle, cœur des Monts Cœur-de-Fer",
  locationId: 'forgefer-forge-originelle',
  estimatedMinutes: 35,
  readAloud: {
    text: `L'Enclume Primordiale est plus qu'un simple bloc de métal. C'est un concept solidifié — l'idée même de « création » rendue tangible. Sa surface est d'un noir impossible, un noir qui absorbe la lumière sans la réfléchir, et pourtant des constellations y brillent, comme si elle contenait un univers miniature dans sa masse.

La Forge Originelle est le seul endroit au monde capable de l'accueillir. C'est une caverne au cœur absolu de la montagne, là où le magma du monde affleure, où la chaleur est si intense que l'air lui-même semble liquide. Un système de canaux de lave alimente un brasier d'une température impossible — assez chaud pour fondre n'importe quoi. Y compris la réalité.

Le Roi Thrain est là, en tablier de forgeron. Autour de lui, les maîtres-forgerons des sept clans. Et vous. Parce que forger une arme sur l'Enclume Primordiale nécessite plus que de l'acier et du feu — cela nécessite un sacrifice personnel. Quelque chose de vous. Un souvenir, une émotion, un morceau de votre âme.

Le Roi lève le Marteau de Forge-Flamme, héritage de mille générations.

« Le métal attend. Le feu brûle. L'Enclume chante. Il ne manque qu'une chose — la volonté. Votre volonté. Choisissez ce que vous donnez au métal. Ce dont vous vous séparez pour que la lame naisse. »

Il fait chaud. Si chaud que les larmes s'évaporent avant de couler.

« La forge ne ment pas. Ce que vous donnez, c'est ce que la lame sera. Donnez la peur, et elle fera peur. Donnez l'amour, et elle protégera. Donnez la rage... (il vous regarde) et que les dieux aient pitié de ce qu'elle détruira. »

Le marteau attend.`,
    mood: "Sacré, transformatif, prix du pouvoir",
    music: "Forge battante comme un cœur, chœurs nains profonds, grondement de lave, résonance métallique",
  },
  gmNotes: [
    { type: 'info', text: "La forge d'une arme primordiale est un moment unique de la campagne. Chaque PJ peut contribuer au rituel, et le choix de ce qu'ils sacrifient détermine les propriétés de l'arme forgée." },
    { type: 'tip', text: "Demandez à chaque joueur de décrire ce que son personnage sacrifie. C'est un moment de roleplay intense — encouragez les descriptions détaillées et émotionnelles." },
    { type: 'warning', text: "Le sacrifice est réel et permanent. Si un PJ sacrifie un souvenir, il l'oublie vraiment. Si c'est une émotion, il ne la ressent plus. C'est le prix du pouvoir." },
    { type: 'secret', text: "L'Enclume Primordiale n'est pas juste un outil — c'est un fragment du pouvoir des Premiers. En forgeant dessus, les héros créent un lien direct avec l'énergie primordiale du monde. Ce lien sera crucial lors du Grand Rituel." },
    { type: 'lore', text: "La dernière arme forgée sur l'Enclume Primordiale était Étoile du Matin, l'épée du premier roi nain. Elle a été perdue il y a trois mille ans. Les nains croient qu'elle attend quelque part, dans le noir, que quelqu'un la retrouve." },
  ],
  choices: [
    {
      id: 'choice-forge-sacrifice',
      prompt: "Quel sacrifice les héros offrent-ils à la forge ?",
      options: [
        {
          label: "Sacrifier la peur",
          description: "Donner votre peur à la lame — ne plus jamais craindre, mais ne plus jamais être prudent.",
          consequence: "L'arme forgée est une lame d'audace pure. +3 aux jets d'attaque, immunité à la peur. Mais le porteur perd le sens du danger — désavantage aux jets de Sagesse liés à la prudence.",
          nextScene: 'scene-4-9-1',
        },
        {
          label: "Sacrifier un souvenir précieux",
          description: "Donner le souvenir le plus cher à votre cœur — il sera oublié à jamais.",
          consequence: "L'arme forgée est une lame de mémoire. Capable de couper les enchantements et les malédictions. Le porteur oublie un souvenir choisi — mais l'arme s'en souvient.",
          nextScene: 'scene-4-9-1',
        },
        {
          label: "Sacrifier la colère",
          description: "Donner votre rage à la lame — ne plus jamais haïr, mais ne plus jamais se battre avec passion.",
          consequence: "L'arme forgée est une lame de sérénité. +3 aux dégâts, attaques toujours calmes et précises. Le porteur ne peut plus entrer en rage et perd accès aux capacités basées sur la colère.",
          nextScene: 'scene-4-9-1',
        },
        {
          label: "Sacrifier un fragment d'âme",
          description: "Le sacrifice ultime — donner un morceau de votre essence même.",
          consequence: "L'arme forgée est une lame vivante, liée à votre âme. +4 aux jets d'attaque et de dégâts, peut couper les liens entre les Sceaux et la corruption. Le porteur perd 2 PV maximaux de façon permanente.",
          nextScene: 'scene-4-9-1',
          reputationChange: [{ faction: "Nains de Forgefer", amount: 20 }],
        },
      ],
    },
  ],
  loot: ["Arme Primordiale (propriétés selon le sacrifice)", "Bénédiction de la Forge (résistance au feu permanente)", "Faveur du Roi Thrain (accès illimité aux forges de Forgefer)"],
  nextScenes: ['scene-4-9-1'],
  previousScene: 'scene-4-8-dragon-lair',
};

// ============================================================================
// CHAPITRE 9 : LES TERRES BRÛLÉES — Scènes additionnelles
// ============================================================================

const scene_4_9_ash_survival: BookScene = {
  id: 'scene-4-9-ash-survival',
  sceneNumber: 205,
  title: "La Marche des Cendres",
  type: 'exploration',
  location: "Terres Brûlées, plaines de cendres",
  locationId: 'terres-brulees',
  estimatedMinutes: 35,
  readAloud: {
    text: `Rien ne vit ici. Rien n'a vécu ici depuis longtemps.

Les Terres Brûlées portent bien leur nom — un désert de cendres grises qui s'étend jusqu'à l'horizon dans toutes les directions, plat, mort, infini. Le sol craque sous vos bottes comme du verre brisé. L'air est sec, brûlant, chargé de particules qui irritent les yeux et tapissent la gorge d'une poussière au goût de fer.

Le ciel est orange. Pas le orange d'un coucher de soleil — un orange malade, permanent, comme si l'atmosphère elle-même était contaminée. Le soleil est un disque pâle derrière ce voile de cendres en suspension, projetant une lumière diffuse qui élimine les ombres et aplatit les distances.

Vous marchez depuis six heures. Ou huit. Ou douze. Impossible de dire — sans ombres, le temps perd son ancrage. Votre eau baisse. Votre moral aussi.

Et puis les hallucinations commencent.

Au début, c'est subtil — un miroitement au loin qui ressemble à une ville. Un son de cloche qui vient de nulle part. L'odeur du pain frais au milieu d'un désert de mort. Puis c'est moins subtil — des silhouettes qui marchent à côté de vous, des visages familiers qui se dissolvent quand vous les regardez directement, des voix qui murmurent votre nom avec une tendresse insupportable.

Les Terres Brûlées ne sont pas juste mortes. Elles se souviennent de la vie. Et elles vous la montrent, encore et encore, comme une plaie qui refuse de cicatriser.`,
    mood: "Désolation, survie extrême, frontière entre réel et irréel",
    music: "Silence assourdissant, bourdonnement de chaleur, notes isolées de piano désaccordé, souffle de vent sec",
  },
  gmNotes: [
    { type: 'info', text: "Les Terres Brûlées sont un test de survie et de volonté. Les hallucinations sont causées par la magie résiduelle de l'ancienne civilisation ashkane qui vivait ici avant la catastrophe." },
    { type: 'tip', text: "Les hallucinations doivent être personnalisées pour chaque PJ. Montrez-leur ce qu'ils désirent le plus ou ce qu'ils craignent le plus. C'est du roleplay psychologique puissant." },
    { type: 'warning', text: "La déshydratation est un danger réel. Si les PJ n'ont pas prévu assez d'eau, appliquez des niveaux d'épuisement. La mort par soif est lente et terrible — exactement ce que les Terres Brûlées infligent." },
    { type: 'secret', text: "Les hallucinations ne sont pas que des mirages. Certaines montrent des fragments du passé réel — la civilisation d'Ashka telle qu'elle était avant sa destruction. Un PJ attentif peut glaner des informations sur Vexor et la nécromancier en observant ces visions." },
  ],
  skillChecks: [
    { skill: 'Survie', dc: 50, success: "Vous trouvez un puits ancien, à peine visible sous les cendres. L'eau est saumâtre mais potable. Plus important, des marques gravées sur la margelle indiquent la direction de la Cité d'Ashka.", failure: "Le désert ne donne rien. Chaque PJ gagne un niveau d'épuisement. La marche continue." },
    { skill: 'Sagesse', dc: 50, success: "Vous reconnaissez les hallucinations pour ce qu'elles sont et maintenez votre lucidité. Plus encore, vous réalisez qu'elles suivent un motif — elles se concentrent dans une direction. Vers Ashka.", failure: "Les hallucinations sont convaincantes. Vous perdez du temps à suivre un mirage, errant en cercle pendant une heure précieuse." },
    { skill: 'Constitution', dc: 45, success: "La chaleur et la poussière ne vous abattent pas. Votre corps endure ce que votre esprit commence à lâcher. Pas de niveau d'épuisement supplémentaire.", failure: "La chaleur est écrasante. Un niveau d'épuisement gagné. Vos lèvres craquent, votre vision se trouble." },
  ],
  choices: [
    {
      id: 'choice-ash-survival',
      prompt: "Comment les héros gèrent-ils les épreuves du désert ?",
      options: [
        {
          label: "Suivre les hallucinations",
          description: "Si les visions montrent le passé, elles pourraient aussi montrer le chemin.",
          consequence: "Pari risqué qui s'avère payant — les hallucinations guident vers Ashka par le chemin le plus court. Arrivée plus rapide, mais l'exposition prolongée aux visions laisse des séquelles psychologiques.",
          nextScene: 'scene-4-9-ghost-city',
        },
        {
          label: "Naviguer à l'ancienne",
          description: "Boussole, étoiles et détermination. Ignorer les mirages.",
          consequence: "Route plus longue mais plus sûre. Les PJ arrivent fatigués mais sains d'esprit. La discipline est récompensée.",
          nextScene: 'scene-4-9-ghost-city',
          skillCheck: { skill: 'Survie', dc: 50, success: "Navigation impeccable. Vous coupez à travers le désert avec la précision d'un trait sur une carte.", failure: "Vous vous perdez pendant quelques heures. Rien de fatal, mais le temps perdu ne se rattrape pas." },
        },
        {
          label: "Utiliser la magie pour se protéger",
          description: "Créer une bulle de protection contre les effets psychiques du désert.",
          consequence: "La protection fonctionne mais consomme des ressources magiques. Les hallucinations sont repoussées, mais le désert résiste — la magie est instable ici.",
          nextScene: 'scene-4-9-ghost-city',
          skillCheck: { skill: 'Arcanes', dc: 50, success: "La bulle tient. La marche est presque confortable — si on peut dire ça d'un désert de cendres.", failure: "La magie résiduelle des Terres Brûlées interfère. Le sort se retourne partiellement, amplifiant les hallucinations pendant une heure terrifiante." },
        },
      ],
    },
  ],
  nextScenes: ['scene-4-9-ghost-city'],
  previousScene: 'scene-4-8-forge-ritual',
};

const scene_4_9_ghost_city: BookScene = {
  id: 'scene-4-9-ghost-city',
  sceneNumber: 206,
  title: "Les Échos d'Ashka",
  type: 'exploration',
  location: "Ruines de la Cité d'Ashka",
  locationId: 'ashka-ruines',
  estimatedMinutes: 40,
  readAloud: {
    text: `Ashka apparaît d'abord comme un mirage de plus — des tours qui scintillent dans la brume de cendres, des dômes qui brillent d'un éclat irréel. Mais contrairement aux autres mirages, celle-ci ne disparaît pas quand vous approchez. Elle grandit. Elle devient réelle.

La Cité d'Ashka fut autrefois la plus grande civilisation des Terres Brûlées — avant qu'elles ne soient brûlées. Les ruines témoignent d'une splendeur passée presque insupportable : des avenues larges comme des rivières, pavées de marbre blanc maintenant craquelé. Des fontaines à sec, leurs bassins remplis de cendres. Des bâtiments aux architectures audacieuses, dômes et minarets, colonnades et arches, tout en courbes et en lumière — sauf qu'il n'y a plus de lumière. Juste les cendres.

Et les spectres.

Ils sont partout. Des silhouettes translucides, bleues et tremblantes, qui parcourent les rues comme s'ils ne savaient pas qu'ils étaient morts. Un marchand qui vend des fruits invisibles à des clients invisibles. Une mère qui berce un enfant que personne d'autre ne peut voir. Un forgeron qui martèle une enclume silencieuse.

Ils ne sont pas hostiles. Ils sont... tristes. Piégés dans l'écho de leur vie passée, condamnés à la répéter pour l'éternité. La plupart ne vous voient même pas. Mais quelques-uns lèvent la tête à votre passage. Quelques-uns vous reconnaissent — pas vous personnellement, mais ce que vous êtes. Des vivants.

Au cœur de la cité, une bibliothèque. Immense, miraculeusement préservée. Ses murs de pierre ont résisté à la catastrophe qui a détruit tout le reste. Et à l'intérieur, des milliers de rouleaux, de tablettes, de livres — le savoir d'une civilisation entière, attendant que quelqu'un vienne le lire.`,
    mood: "Mélancolie fantomatique, beauté en ruines, savoir oublié",
    music: "Échos de musique ancienne, chuchotements spectraux, vent dans les ruines, harpe désaccordée",
  },
  gmNotes: [
    { type: 'info', text: "Ashka est la clé pour comprendre l'histoire de Vexor et la nature de la nécromancier dans Aethelgard. La bibliothèque contient des informations sur le Cercle des Cendres, les Sceaux et la catastrophe qui a créé les Terres Brûlées." },
    { type: 'tip', text: "Les spectres sont des outils narratifs, pas des ennemis. Utilisez-les pour raconter l'histoire d'Ashka à travers des vignettes : le quotidien, les célébrations, puis la catastrophe. C'est du worldbuilding par immersion." },
    { type: 'warning', text: "La bibliothèque est un piège potentiel pour les joueurs avides de lore. Mettez une limite de temps — la nuit, les spectres deviennent plus agressifs, et rester trop longtemps dans Ashka risque de piéger les PJ dans le cycle spectral." },
    { type: 'secret', text: "La catastrophe d'Ashka n'était pas un accident. C'était un rituel raté — la première tentative de briser les Sceaux, il y a cinq cents ans. Vexor en était l'architecte. Il a survécu parce qu'il s'est lié à la mort elle-même." },
    { type: 'lore', text: "Ashka était la capitale de l'Empire Ashkane, une civilisation qui maîtrisait la nécromancie comme art et comme science. Pour eux, la mort n'était pas une fin mais une transformation. Le problème est que la transformation a mal tourné." },
  ],
  npcs: [
    {
      name: "Spectre du Bibliothécaire Rashid",
      role: "Gardien spectral de la Grande Bibliothèque",
      personality: "Courtois, érudit, légèrement confus. Ne réalise pas toujours qu'il est mort. Alternes entre lucidité parfaite et confusion spectrale.",
      appearance: "Silhouette translucide d'un homme âgé en robe de savant, lunettes posées sur le bout du nez, bras chargés de livres fantomatiques. Sa forme scintille comme une bougie dans le vent.",
      secret: "Rashid était le mentor de Vexor. Il l'a vu sombrer dans l'obsession, il a essayé de l'arrêter, et il a échoué. Sa culpabilité le maintient dans le cycle spectral plus que tout sort.",
      dialogues: {
        greeting: "« Oh, des visiteurs ! Merveilleux, merveilleux. La bibliothèque est ouverte de l'aube au... (regarde autour de lui, confus) ... quel jour sommes-nous ? Non, ne répondez pas. Ça n'a pas d'importance. Que cherchez-vous ? »",
        info: "« Vexor ? (sa forme vacille) Oui, je... je me souviens. Mon meilleur élève. Mon plus grand regret. Il voulait ramener sa femme. Je lui ai dit que la mort ne négocie pas. Il m'a répondu qu'il la forcerait. Et il... il a... (long silence) Les livres que vous cherchez sont au troisième niveau. Aile est. »",
        quest: "« Si vous trouvez un moyen de... de nous libérer... les spectres... nous ne voulons pas être ici. Cinq cents ans à revivre le même jour. C'est un enfer plus cruel que n'importe quel abîme. »",
        farewell: "« Revenez quand vous voulez. Nous serons toujours là. C'est le problème, n'est-ce pas ? Nous serons toujours là. »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Investigation', dc: 50, success: "Dans la bibliothèque, vous trouvez le journal personnel de Vexor — écrit avant sa chute. Les entrées passent de l'espoir à l'obsession, puis à la folie. La dernière entrée : 'Le rituel est prêt. Demain, Ashka renaîtra. Demain, Lyra me reviendra.'", failure: "La bibliothèque est immense et désorganisée. Vous trouvez des informations utiles mais fragmentaires sur la civilisation ashkane." },
    { skill: 'Religion', dc: 45, success: "Les pratiques nécromantiques d'Ashka n'étaient pas maléfiques à l'origine. Elles visaient à honorer les morts, à communiquer avec eux, à préserver leur sagesse. C'est la corruption de ces pratiques qui a mené à la catastrophe.", failure: "La nécromancie ashkane semble similaire à celle du Cercle des Cendres. Mais quelque chose est différent — vous n'arrivez pas à mettre le doigt dessus." },
  ],
  choices: [
    {
      id: 'choice-ashka-exploration',
      prompt: "Que font les héros dans les ruines d'Ashka ?",
      options: [
        {
          label: "Étudier les archives de la bibliothèque",
          description: "Passer du temps à lire les textes anciens pour comprendre les Sceaux.",
          consequence: "Informations cruciales sur le fonctionnement des Sceaux et les erreurs du rituel ashkane. +2 aux jets liés au Grand Rituel dans l'Acte 5. Mais le temps passé attire l'attention des spectres moins amicaux.",
          nextScene: 'scene-4-9-vexor-past',
          reputationChange: [{ faction: "Guilde des Arcanes", amount: 15 }],
        },
        {
          label: "Parler aux spectres amicaux",
          description: "Interagir avec les fantômes de l'ancienne civilisation pour apprendre leur histoire.",
          consequence: "Les spectres partagent des souvenirs d'Ashka avant la catastrophe — une civilisation brillante et bienveillante. Leur tristesse est contagieuse mais instructive.",
          nextScene: 'scene-4-9-vexor-past',
        },
        {
          label: "Chercher le laboratoire de Vexor",
          description: "Trouver l'endroit où Vexor a mené ses expériences fatidiques.",
          consequence: "Le laboratoire est intact, figé dans le temps. Des outils nécromantiques, des notes de recherche, et une peinture de Lyra — la femme de Vexor, dont la mort a déclenché sa chute.",
          nextScene: 'scene-4-9-vexor-past',
          skillCheck: { skill: 'Investigation', dc: 55, success: "Vous trouvez le laboratoire caché derrière un mur illusoire. À l'intérieur, la vérité sur Vexor se révèle dans toute sa tragédie.", failure: "Le laboratoire reste introuvable. Les spectres évitent un certain quartier de la ville — peut-être un indice, mais vous ne pouvez pas l'exploiter." },
        },
      ],
    },
  ],
  nextScenes: ['scene-4-9-vexor-past'],
  previousScene: 'scene-4-9-ash-survival',
};

const scene_4_9_vexor_past: BookScene = {
  id: 'scene-4-9-vexor-past',
  sceneNumber: 207,
  title: "Le Premier Péché",
  type: 'narration',
  location: "Flashback — Ashka, cinq cents ans plus tôt",
  locationId: 'ashka-passe',
  estimatedMinutes: 25,
  readAloud: {
    text: `La vision s'impose sans prévenir — une fracture dans le temps qui vous aspire cinq cents ans en arrière.

Ashka est vivante.

Les rues bourdonnent d'activité. Les fontaines coulent de cristal liquide. Les tours brillent de runes luminescentes. Des enfants courent entre les étals d'un marché coloré. Des savants en robes brodées discutent philosophie sur les marches de la bibliothèque. C'est beau. C'est parfait.

Et dans une maison modeste, au bord du canal principal, un homme pleure.

Il est jeune — trente ans peut-être — avec des yeux brillants d'intelligence et creusés par le manque de sommeil. Ses mains sont tachées d'encre et de quelque chose de plus sombre. Devant lui, dans un lit de draps blancs, une femme dort. Non. Une femme ne dort pas. Une femme est morte.

Lyra. Sa femme. Emportée par la fièvre des cendres — une maladie endémique des Terres... qui ne sont pas encore brûlées.

L'homme — Vexor, vous le reconnaissez malgré les siècles qui séparent ce visage de celui de l'Archon — serre la main froide de sa femme et murmure les mots qui changeront le monde.

« Je te ramènerai. Je te le promets. Si le monde refuse, je briserai le monde. »

La vision avance — des semaines, des mois, des années compressées en instants. Vexor dans la bibliothèque, étudiant les textes interdits. Vexor dans son laboratoire, expérimentant sur les frontières entre vie et mort. Vexor devant le Conseil d'Ashka, suppliant, puis menaçant, puis rejeté.

Et enfin, Vexor au centre d'un cercle rituel, entouré de runes ashkanes, canalisant l'énergie du Sceau le plus proche pour forcer les portes de la mort.

Le rituel fonctionne. Pendant un instant impossible et magnifique, Lyra ouvre les yeux.

Puis le monde explose.`,
    mood: "Tragédie intime devenue catastrophe cosmique, amour destructeur",
    music: "Piano solo, délicat puis de plus en plus dissonant, crescendo orchestral, explosion, silence",
  },
  gmNotes: [
    { type: 'info', text: "Cette vision est le cœur émotionnel de l'histoire de Vexor. Elle transforme l'antagoniste en un personnage tragique — un homme brisé par le deuil qui a détruit un monde en essayant de sauver une personne." },
    { type: 'tip', text: "Lisez cette scène avec émotion. Le contraste entre la beauté d'Ashka et la douleur de Vexor est essentiel. Les joueurs doivent ressentir de la compassion pour lui, même en le combattant." },
    { type: 'warning', text: "Ne laissez pas cette révélation justifier les actions de Vexor. Expliquer n'est pas excuser. Mais comprendre un ennemi, c'est trouver un moyen de le vaincre — ou de le sauver." },
    { type: 'secret', text: "Le rituel de Vexor a partiellement réussi — Lyra a été ramenée, mais pas comme humaine. Son âme est devenue le cœur du premier Sceau corrompu. Vexor le sait, et c'est pourquoi il veut briser les Sceaux — pas pour le pouvoir, mais pour libérer l'âme de sa femme." },
  ],
  choices: [
    {
      id: 'choice-vexor-revelation',
      prompt: "Que retirent les héros de cette vision ?",
      options: [
        {
          label: "Compassion — chercher à sauver Vexor",
          description: "Comprendre sa douleur et chercher une solution qui le rachète.",
          consequence: "Si les héros affrontent Vexor plus tard, ils peuvent tenter de le raisonner (Persuasion CD 55). Succès = Vexor hésite, créant une ouverture. Cette option ouvre la voie à la rédemption.",
          nextScene: 'scene-4-9-freed-souls',
          reputationChange: [{ faction: "Gardiens d'Émeraude", amount: 5 }],
        },
        {
          label: "Détermination — utiliser cette connaissance",
          description: "Comprendre la faiblesse de Vexor pour mieux le combattre.",
          consequence: "En combat contre Vexor, mentionner Lyra provoque un malus de -5 à ses jets pendant un round. Information tactique précieuse, mais manipulation moralement douteuse.",
          nextScene: 'scene-4-9-freed-souls',
        },
        {
          label: "Enquête — chercher l'âme de Lyra",
          description: "Si Lyra est piégée dans un Sceau, la libérer pourrait changer l'équation.",
          consequence: "Quête secondaire débloquée : trouver et libérer l'âme de Lyra. Si elle réussit, Vexor pourrait devenir un allié — le retournement le plus spectaculaire de la campagne.",
          nextScene: 'scene-4-9-freed-souls',
          reputationChange: [{ faction: "Guilde des Arcanes", amount: 10 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-4-9-freed-souls'],
  previousScene: 'scene-4-9-ghost-city',
};

const scene_4_9_freed_souls: BookScene = {
  id: 'scene-4-9-freed-souls',
  sceneNumber: 208,
  title: "La Dernière Prière d'Ashka",
  type: 'revelation',
  location: "Place centrale d'Ashka, au crépuscule spectral",
  locationId: 'ashka-centre',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le crépuscule tombe sur Ashka — un crépuscule qui n'a rien de naturel, baigné de lumière violette et de particules de cendres qui dansent comme des lucioles mourantes.

Sur la grande place de la cité, les spectres se rassemblent. Pas par dizaines — par milliers. Ils émergent des murs, des pavés, de l'air lui-même, une marée de lumière bleue et tremblante. Des familles entières, des artisans, des enfants, des soldats, des savants. Toute une civilisation de fantômes, réunie pour la première fois en cinq cents ans.

Et ils vous regardent.

Le Bibliothécaire Rashid s'avance, plus lucide qu'il ne l'a été depuis des siècles. Sa forme est presque solide, ses yeux clairs et tristes.

« Vous avez trouvé la vérité, » dit-il. « Vous savez ce qui nous est arrivé. Ce que Vexor a fait. Ce que nous sommes devenus. »

Autour de lui, les spectres murmurent — pas des mots, un son collectif, comme le soupir d'une ville entière.

« Nous ne demandons pas vengeance. Nous demandons le repos. Cinq cents ans à errer entre les mondes, à revivre le même jour, à voir notre cité en cendres et se souvenir de sa gloire... c'est un supplice que même les damnés ne méritent pas. »

Il vous tend quelque chose — une sphère de lumière spectrale, pulsant faiblement.

« Le Cœur d'Ashka. La mémoire collective de notre peuple. Si vous accomplissez le rituel de libération, nos âmes trouveront enfin le repos. Et en échange, le Cœur sera vôtre — tout notre savoir, toute notre sagesse, concentrés dans cette lumière. C'est notre dernier don au monde des vivants. »

Les milliers de spectres attendent. Cinq cents ans d'attente touchent à leur fin.`,
    mood: "Catharsis collective, beauté spectrale, libération attendue depuis des siècles",
    music: "Chœur spectral montant en puissance, harpes éthérées, résonance cristalline, silence sacré",
  },
  gmNotes: [
    { type: 'info', text: "Le rituel de libération est un moment de catharsis pour toute la campagne. Les spectres d'Ashka sont enfin en paix, et les héros reçoivent une récompense inestimable — le savoir d'une civilisation entière." },
    { type: 'tip', text: "Faites de ce moment quelque chose de beau. Les spectres qui s'élèvent, la lumière qui change, le silence qui tombe. C'est un des rares moments de paix pure dans une campagne sombre." },
    { type: 'warning', text: "Le rituel nécessite de la magie et de la volonté. Il n'est pas dangereux, mais il est émouvant. Préparez les joueurs émotionnellement — certains PNJ spectraux auxquels ils se sont attachés vont disparaître." },
    { type: 'secret', text: "Le Cœur d'Ashka contient une information cruciale : la formule complète du Grand Rituel. C'est la pièce manquante que les héros cherchent depuis le début de l'Acte 4. La quête est presque terminée." },
    { type: 'lore', text: "Le rituel de libération ashkane est l'inverse du rituel qui a créé les spectres. Au lieu de lier les âmes au monde physique, il coupe le lien. Les ashkanes l'avaient prévu comme sécurité — mais personne n'avait survécu pour l'accomplir." },
  ],
  skillChecks: [
    { skill: 'Arcanes', dc: 50, success: "Le rituel est complexe mais faisable. Vous canalisez l'énergie du Cœur d'Ashka, inversant le flux nécromantique. Les spectres commencent à s'élever, un par un, puis par dizaines, puis par milliers.", failure: "Le rituel vacille. Vous perdez le contrôle un instant, et les spectres crient — pas de douleur, de peur. Vous reprenez le contrôle, mais l'expérience est éprouvante." },
    { skill: 'Religion', dc: 45, success: "Vous ajoutez une prière de passage à l'âme qui stabilise le rituel et apaise les spectres les plus agités. La libération est douce, comme un sommeil longtemps attendu.", failure: "Les mots de la prière vous échappent. Le rituel fonctionne, mais sans la grâce qui l'aurait rendu parfait." },
  ],
  choices: [
    {
      id: 'choice-freed-souls',
      prompt: "Comment les héros accomplissent-ils le rituel de libération ?",
      options: [
        {
          label: "Rituel complet de libération",
          description: "Accomplir le rituel ashkane pour libérer toutes les âmes piégées.",
          consequence: "Toutes les âmes sont libérées. La cité d'Ashka devient silencieuse pour la première fois en cinq siècles. Le Cœur d'Ashka brille plus fort que jamais, chargé de gratitude.",
          nextScene: 'scene-4-9-4',
          reputationChange: [{ faction: "Gardiens d'Émeraude", amount: 10 }, { faction: "Guilde des Arcanes", amount: 10 }],
        },
        {
          label: "Libération partielle — garder Rashid",
          description: "Libérer la plupart des âmes mais demander à Rashid de rester comme guide.",
          consequence: "Rashid accepte avec une tristesse résignée. Les autres âmes sont libérées. Il restera tant que vous aurez besoin de lui — mais chaque jour supplémentaire est un jour de souffrance.",
          nextScene: 'scene-4-9-4',
        },
        {
          label: "Absorber l'énergie spectrale",
          description: "Au lieu de libérer les âmes, canaliser leur énergie pour renforcer vos pouvoirs.",
          consequence: "Les spectres hurlent. Le pouvoir afflue, immense, intoxicant. Mais le prix est terrible — ces âmes ne trouveront jamais le repos. Et dans leurs yeux, au dernier moment, il y a de la trahison.",
          nextScene: 'scene-4-9-4',
          reputationChange: [{ faction: "Gardiens d'Émeraude", amount: -20 }, { faction: "Guilde des Arcanes", amount: -15 }],
        },
      ],
    },
  ],
  loot: ["Cœur d'Ashka (contient le savoir nécromantique et la formule du Grand Rituel)", "Bénédiction des Libérés (+2 aux jets de sauvegarde contre la nécromancie)", "Larme de Rashid (composant pour sort de Résurrection Véritable)"],
  nextScenes: ['scene-4-9-4'],
  previousScene: 'scene-4-9-vexor-past',
};

// ============================================================================
// CHAPITRE 10 : L'ALLIANCE IMPOSSIBLE — Scènes additionnelles
// ============================================================================

const scene_4_10_underground: BookScene = {
  id: 'scene-4-10-underground',
  sceneNumber: 209,
  title: "Les Lames de l'Ombre",
  type: 'exploration',
  location: "Les Bas-Fonds de Sol-Aureus",
  locationId: 'sol-aureus-bas-fonds',
  estimatedMinutes: 35,
  readAloud: {
    text: `Sous Sol-Aureus, une autre ville existe. Pas sur les cartes, pas dans les guides, pas dans les sermons des prêtres. Une ville de tunnels, de caves, de passages secrets, de salles enfouies dont les habitants du dessus préfèrent ignorer l'existence.

Les Bas-Fonds.

L'Ombre vous y a donné rendez-vous. Un message glissé sous votre porte, écrit à l'encre invisible, lisible seulement à la lumière de la lune : « Minuit. La Porte du Rat. Venez seuls. Ou venez armés. L'un n'exclut pas l'autre. »

La Porte du Rat est une grille d'égout dans le quartier le plus pauvre de Sol-Aureus. Elle mène à un dédale de couloirs humides où l'air sent le moisi, la sueur et le crime. Des silhouettes se fondent dans les ombres à votre passage. Des yeux vous suivent depuis des trous dans les murs.

Au bout du labyrinthe, une porte de fer. Deux gardes — si on peut appeler « gardes » des individus dont chacun porte assez de cicatrices pour remplir un livre d'anatomie. Ils vous reconnaissent. La porte s'ouvre.

Derrière, c'est un autre monde. Une arène souterraine éclairée par des torches grasses, entourée de gradins taillés dans la roche. Des combats clandestins. Des paris. De l'argent sale. Et dans la loge d'honneur, un fauteuil en cuir d'où L'Ombre vous observe avec ce sourire qui ne touche jamais ses yeux.

« Bienvenue dans mon bureau, » dit-il. « Le vrai bureau. Pas celui du Palais. »`,
    mood: "Monde souterrain, moralité grise, alliance improbable",
    music: "Basses percussives, contrebasse jazz sombre, foule en fond, cliquetis de pièces",
  },
  gmNotes: [
    { type: 'info', text: "Les Bas-Fonds sont le territoire du Syndicat, le réseau criminel dirigé par L'Ombre. Cette scène permet aux PJ de recruter les criminels comme espions et saboteurs pour la guerre à venir." },
    { type: 'tip', text: "L'Ombre n'est pas un allié confortable. Il a ses propres intérêts, ses propres règles, et il n'hésitera pas à trahir les héros si le marché devient mauvais. Jouez-le comme un homme d'affaires amoral, pas comme un méchant de dessin animé." },
    { type: 'warning', text: "S'allier avec le Syndicat a des conséquences sur la réputation. L'Aube d'Argent et la Garde Royale n'apprécieront pas. C'est un choix moral complexe." },
    { type: 'secret', text: "L'Ombre sait quelque chose que personne d'autre ne sait : il y a un deuxième traître dans l'Alliance. Pas dans l'Aube cette fois — au sein même de la Garde Royale. Il ne le révélera que si le prix est juste." },
  ],
  npcs: [
    {
      name: "L'Ombre",
      role: "Chef du Syndicat / Maître-espion",
      personality: "Calculateur, charmant, dangereux. Chaque mot est une lame à double tranchant. Il aide par intérêt, jamais par bonté.",
      appearance: "Homme indéfinissable — âge, origine, même la couleur de ses cheveux semble changer selon l'éclairage. Vêtements sombres et élégants. Sourire de prédateur.",
      secret: "L'Ombre est le frère illégitime de la Reine Elara. Personne ne le sait, pas même Elara. C'est sa motivation secrète pour protéger Sol-Aureus — pas le profit, la famille.",
      dialogues: {
        greeting: "« Vous êtes en retard. De trente secondes. Dans mon métier, trente secondes c'est la différence entre un homme riche et un homme mort. Mais je pardonne. Asseyez-vous. »",
        info: "« Le Cercle des Cendres recrute dans mes bas-fonds. Mon territoire. Mon peuple. Ça, c'est une offense que je ne pardonne pas. Alors oui, je suis disposé à discuter alliance. Mais mes termes, mes règles, mon prix. »",
        quest: "« Ce dont j'ai besoin, c'est d'informations. Spécifiquement, les plans de bataille du Cercle. Mon réseau d'espions est bon, mais pas assez pour infiltrer leur camp principal. Vous, par contre... vous avez les compétences. Et la raison. »",
        farewell: "« On ne se serre pas la main dans les Bas-Fonds. On se regarde dans les yeux et on hoche la tête. C'est plus honnête qu'un contrat. (hoche la tête) Bonne chance. Vous en aurez besoin. »",
      },
      stats: { hp: 70, atk: 18, ac: 18 },
    },
  ],
  choices: [
    {
      id: 'choice-underground-alliance',
      prompt: "Comment les héros gèrent-ils l'alliance avec le Syndicat ?",
      options: [
        {
          label: "Accepter pleinement l'alliance",
          description: "Donner à L'Ombre ce qu'il demande en échange de son réseau d'espions.",
          consequence: "Le réseau d'espions du Syndicat rejoint l'effort de guerre. Informations cruciales, sabotage derrière les lignes ennemies. Mais la Garde Royale grince des dents.",
          nextScene: 'scene-4-10-training',
          reputationChange: [{ faction: "Syndicat", amount: 20 }, { faction: "Garde Royale", amount: -10 }],
        },
        {
          label: "Alliance limitée — information seulement",
          description: "Accepter l'aide de L'Ombre uniquement pour le renseignement, pas le combat.",
          consequence: "Compromis pragmatique. L'Ombre est légèrement déçu mais comprend. Les informations sont partagées, mais le potentiel de sabotage est perdu.",
          nextScene: 'scene-4-10-training',
          reputationChange: [{ faction: "Syndicat", amount: 10 }],
        },
        {
          label: "Refuser — les héros ne s'allient pas aux criminels",
          description: "Maintenir l'intégrité morale et refuser l'aide du Syndicat.",
          consequence: "L'Ombre respecte le choix mais est blessé. Le Syndicat reste neutre dans la guerre — ni allié ni ennemi. Une ressource perdue, mais l'honneur est sauf.",
          nextScene: 'scene-4-10-training',
          reputationChange: [{ faction: "Aube d'Argent", amount: 10 }, { faction: "Syndicat", amount: -15 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-4-10-training', 'scene-4-10-1'],
  previousScene: 'scene-4-9-freed-souls',
};

const scene_4_10_training: BookScene = {
  id: 'scene-4-10-training',
  sceneNumber: 210,
  title: "L'Acier et la Volonté",
  type: 'rest',
  location: "Champs d'entraînement de Sol-Aureus",
  locationId: 'sol-aureus-champs',
  estimatedMinutes: 30,
  readAloud: {
    text: `Les champs d'entraînement de Sol-Aureus n'ont jamais été aussi pleins. Des milliers de soldats, de miliciens et de volontaires s'entraînent du lever au coucher du soleil, transformant les plaines devant les murailles en un océan de sueur, de poussière et de détermination.

Il y a les professionnels — les soldats de la Garde Royale, les paladins de l'Aube, les guerriers nains de Forgefer. Ils connaissent leur métier. Leurs formations sont précises, leurs armes bien entretenues, leurs visages durs.

Et puis il y a les autres. Les fermiers qui tiennent une épée pour la première fois. Les marchands qui ont troqué leur balance pour un bouclier. Les adolescents qui mentent sur leur âge pour s'enrôler. Ils sont maladroits, effrayés, et absolument magnifiques dans leur courage ordinaire.

Le Général Marcus vous a confié une tâche : en deux semaines, transformer ce troupeau en armée. Pas en soldats d'élite — le temps manque pour ça — mais en personnes capables de tenir une ligne, d'obéir à un ordre, et de ne pas fuir quand la première flèche siffle au-dessus de leur tête.

C'est un défi immense. Mais en regardant ces visages — ceux qui tremblent de peur et ceux qui brûlent de rage, ceux qui n'ont rien à perdre et ceux qui ont tout à protéger — vous comprenez quelque chose.

Ces gens ne se battent pas parce qu'ils sont des guerriers. Ils se battent parce qu'ils n'ont pas d'autre choix. Et c'est la motivation la plus puissante qui existe.`,
    mood: "Montage d'entraînement, espoir dans l'ordinaire, préparation au sacrifice",
    music: "Percussions d'entraînement, fifres militaires, cris de cadence, crescendo de volonté",
  },
  gmNotes: [
    { type: 'info', text: "Scène de montage qui permet aux PJ de choisir comment entraîner l'armée. Chaque approche donne des bonus différents pour les batailles de l'Acte 5." },
    { type: 'tip', text: "Faites interagir les PJ avec des recrues individuelles. Le fermier qui n'arrive pas à tenir une épée. L'adolescente qui tire à l'arc mieux que personne. Le vieil homme qui refuse de rester en arrière. Ces micro-histoires donnent du poids au sacrifice collectif." },
    { type: 'warning', text: "Le temps est limité. Les PJ ne peuvent pas tout entraîner — ils doivent choisir une spécialisation pour l'armée." },
    { type: 'secret', text: "Parmi les recrues, un ancien soldat du Cercle des Cendres qui a déserté. Il porte des informations sur les tactiques ennemies, mais n'ose pas se révéler de peur d'être exécuté comme espion." },
  ],
  skillChecks: [
    { skill: 'Athlétisme', dc: 45, success: "Votre démonstration de combat inspire les recrues. En une semaine, le niveau moyen de l'armée progresse visiblement.", failure: "L'entraînement est chaotique. Les recrues sont motivées mais manquent de structure." },
    { skill: 'Persuasion', dc: 40, success: "Votre discours transforme la peur en détermination. Le moral de l'armée est au plus haut.", failure: "Les mots sont justes mais l'impact est limité. Le moral reste fragile." },
  ],
  choices: [
    {
      id: 'choice-training-focus',
      prompt: "Sur quoi les héros concentrent-ils l'entraînement ?",
      options: [
        {
          label: "Discipline et formation défensive",
          description: "Enseigner les bases de la survie en ligne : boucliers, formation serrée, retraite ordonnée.",
          consequence: "L'armée est défensivement solide. +2 à la CA des troupes pendant les scènes de siège. Moins efficace en attaque.",
          nextScene: 'scene-4-10-spy-mission',
          reputationChange: [{ faction: "Garde Royale", amount: 10 }],
        },
        {
          label: "Tactiques de guérilla",
          description: "Former des escouades mobiles capables d'embuscades et de raids.",
          consequence: "L'armée est flexible et dangereuse. +2 aux jets d'initiative et de Discrétion pour les troupes. Moins efficace en défense statique.",
          nextScene: 'scene-4-10-spy-mission',
          reputationChange: [{ faction: "Syndicat", amount: 5 }],
        },
        {
          label: "Moral et cohésion",
          description: "Se concentrer sur l'esprit de corps, la confiance mutuelle et la résistance psychologique.",
          consequence: "L'armée est moralement inébranlable. Immunité à la peur magique et +2 aux jets de sauvegarde de Sagesse pour les troupes. Techniquement moyen.",
          nextScene: 'scene-4-10-spy-mission',
          reputationChange: [{ faction: "Peuple de Sol-Aureus", amount: 15 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-4-10-spy-mission'],
  previousScene: 'scene-4-10-underground',
};

const scene_4_10_spy_mission: BookScene = {
  id: 'scene-4-10-spy-mission',
  sceneNumber: 211,
  title: "Derrière les Lignes",
  type: 'exploration',
  location: "Camp principal du Cercle des Cendres, Terres Brûlées",
  locationId: 'cercle-camp',
  estimatedMinutes: 40,
  readAloud: {
    text: `Le déguisement gratte. La robe de cendres est rêche contre la peau, l'amulette du Cercle est froide comme de la glace, et le masque de fer pèse sur votre visage comme un jugement.

Mais ça fonctionne. Les gardes du camp vous laissent passer sans un regard. Une robe de cendres, une amulette, un masque — c'est tout ce qu'il faut pour devenir invisible au milieu des fanatiques du Cercle des Cendres.

Le camp est immense. Une ville de tentes noires, de tours de guet en os, et de feux qui brûlent d'une flamme verdâtre. Des milliers de cultistes, de mercenaires, de morts-vivants et de créatures assemblées en une armée hétéroclite mais terrifiante. L'air pue la mort, la magie noire et la ferveur.

Et au centre du camp, la Tente du Commandement — une structure de toile et de métal, aussi grande qu'un petit château. C'est là que se trouvent les plans de bataille, les ordres de marche et les secrets du Cercle.

C'est aussi là que se trouve Archon Vexor, le nécromancien qui a détruit Ashka. Et probablement Malachar lui-même.

Le plan est simple : entrer, trouver les plans, sortir. Ne pas se faire prendre. Ne pas attirer l'attention. Ne pas mourir.

Simple. En théorie.

En pratique, chaque pas dans ce camp est un pas au bord d'un précipice. Un mot de trop, un regard trop long, un geste qui ne colle pas avec le rôle — et des milliers d'ennemis se retournent contre vous en un instant.

Le masque de fer est inconfortable. Mais pas autant que l'idée de ce qui arrive si on vous le retire.`,
    mood: "Infiltration tendue, danger permanent, chaque seconde compte",
    music: "Battement de cœur amplifié, cordes graves staccato, souffle retenu, silences terrifiants",
  },
  gmNotes: [
    { type: 'info', text: "Mission d'infiltration pure. C'est du stealth pur — les PJ doivent passer inaperçus dans le camp ennemi. Un seul échec critique déclenche l'alarme." },
    { type: 'tip', text: "Faites vivre le camp ennemi. Les cultistes ne sont pas tous des fanatiques sans âme — certains sont là par peur, par désespoir, ou par conviction sincère. Humaniser l'ennemi rend l'infiltration plus tendue." },
    { type: 'warning', text: "Si les PJ sont découverts, la fuite est plus importante que le combat. Ils sont en territoire ennemi, en infériorité numérique massive. Combattre, c'est mourir." },
    { type: 'secret', text: "Les plans de bataille révèlent la date et la direction de l'assaut final. Mais plus important : ils révèlent l'existence d'un artefact que Malachar transporte — le Cœur de Cendres, capable de briser les trois derniers Sceaux simultanément." },
  ],
  skillChecks: [
    { skill: 'Tromperie', dc: 55, success: "Votre imitation d'un cultiste est parfaite. Vous imitez leur démarche, leurs salutations, leurs murmures de dévotion. Personne ne vous regarde deux fois.", failure: "Un cultiste vous fixe trop longtemps. 'Je ne vous connais pas. Quel escadron ?' Le temps de réfléchir à une réponse, la sueur commence à couler sous le masque." },
    { skill: 'Discrétion', dc: 55, success: "Vous vous glissez dans la Tente du Commandement comme une ombre. Les gardes ne vous voient pas, les runes d'alarme ne se déclenchent pas. Les plans sont sur la table.", failure: "Une rune d'alarme s'active silencieusement. Vous ne le savez pas encore, mais un chronomètre vient de se mettre en marche. Vous avez dix minutes avant que les gardes ne viennent vérifier." },
    { skill: 'Investigation', dc: 50, success: "Les plans de bataille sont détaillés et complets. Routes d'invasion, positions des Archons, timing de l'assaut, et... l'artefact. Le Cœur de Cendres. Vous photographiez mentalement chaque détail.", failure: "Les plans sont en code ashkane. Vous reconnaissez l'essentiel — direction et date de l'assaut — mais les détails vous échappent." },
  ],
  choices: [
    {
      id: 'choice-spy-mission',
      prompt: "Les héros sont dans la Tente du Commandement. Que font-ils ?",
      options: [
        {
          label: "Copier les plans et partir",
          description: "Mémoriser ou copier les documents et s'enfuir discrètement.",
          consequence: "Mission accomplie proprement. Les informations sont inestimables. Sortie sans accroc — la meilleure issue possible.",
          nextScene: 'scene-4-10-romance',
          reputationChange: [{ faction: "Garde Royale", amount: 15 }, { faction: "Syndicat", amount: 5 }],
        },
        {
          label: "Saboter les plans",
          description: "Modifier subtilement les ordres de marche pour créer de la confusion.",
          consequence: "Le sabotage est brillant — de petits changements qui passeront inaperçus jusqu'à ce qu'il soit trop tard. L'armée du Cercle sera désorganisée le jour J. Mais si le sabotage est détecté...",
          nextScene: 'scene-4-10-romance',
          skillCheck: { skill: 'Tromperie', dc: 60, success: "Les modifications sont indétectables. L'armée du Cercle marchera dans la mauvaise direction pendant des heures cruciales.", failure: "Les modifications sont subtiles mais un œil expert pourrait les repérer. Le risque est réel." },
          reputationChange: [{ faction: "Garde Royale", amount: 20 }],
        },
        {
          label: "Tenter d'assassiner un Archon",
          description: "Profiter de l'occasion pour éliminer un commandant ennemi.",
          consequence: "Si Vexor ou un autre Archon est vulnérable, c'est tentant. Mais l'assassinat déclenchera une alerte totale. Le gain est énorme, le risque mortel.",
          nextScene: 'scene-4-10-romance',
          skillCheck: { skill: 'Discrétion', dc: 65, success: "L'Archon tombe dans un silence absolu. Personne ne le découvrira avant l'aube. Une victoire stratégique majeure.", failure: "L'attaque échoue. L'alarme retentit. Fuite désespérée à travers un camp de milliers d'ennemis en alerte." },
        },
      ],
    },
  ],
  nextScenes: ['scene-4-10-romance'],
  previousScene: 'scene-4-10-training',
};

const scene_4_10_romance: BookScene = {
  id: 'scene-4-10-romance',
  sceneNumber: 212,
  title: "L'Étoile et l'Épée",
  type: 'social',
  location: "Jardins royaux de Sol-Aureus, nuit étoilée",
  locationId: 'sol-aureus-jardins',
  estimatedMinutes: 20,
  readAloud: {
    text: `Il y a des moments, même au cœur de la guerre, où le monde s'arrête.

Les jardins royaux de Sol-Aureus sont un miracle de paix dans un océan de chaos. Des rosiers grimpants, des fontaines qui murmurent, des allées de gravier blanc sous un ciel constellé d'étoiles. Les murs du palais bloquent le bruit de la ville en préparation de guerre, et ici, pour un instant, il est possible de croire que tout ira bien.

Quelqu'un vous attend.

Un allié, un compagnon, une personne dont la présence est devenue aussi nécessaire que l'air. Quelqu'un qui vous connaît — pas le héros, pas la légende, pas l'arme. Vous. La personne sous l'armure.

La conversation commence doucement. Les étoiles. Le silence. La beauté absurde d'un jardin de roses pendant la fin du monde. Puis les mots deviennent plus lourds. Les vérités qu'on ne dit pas en plein jour, les peurs qu'on cache derrière l'humour, les espoirs qu'on n'ose pas formuler de peur de les briser.

Et quelque part entre un mot et un silence, entre un regard et un sourire, quelque chose change. Pas violemment. Pas dramatiquement. Mais irréversiblement.

Les étoiles brillent. La fontaine murmure. Et pour un instant — un seul, précieux, fragile instant — la guerre n'existe pas.`,
    mood: "Intimité, vulnérabilité, beauté dans les ténèbres",
    music: "Violon solo, guitare acoustique, bruissement de feuilles, fontaine, silence entre les notes",
  },
  gmNotes: [
    { type: 'info', text: "Scène optionnelle de romance ou d'amitié profonde avec un PNJ allié. Adaptez le PNJ selon les relations que les joueurs ont développées pendant la campagne. Ce peut être romantique ou platonique — l'important est l'intimité émotionnelle." },
    { type: 'tip', text: "Laissez le joueur mener cette scène. Posez des questions plutôt que de diriger : 'Qu'est-ce que votre personnage lui dit ?' 'Comment réagit-il/elle quand le PNJ avoue avoir peur ?' Le MJ est un facilitateur ici, pas un narrateur." },
    { type: 'warning', text: "Respectez les limites des joueurs. Si un joueur n'est pas intéressé par le roleplay romantique, transformez la scène en moment d'amitié profonde. L'important est la connexion humaine, pas le registre." },
    { type: 'secret', text: "Le PNJ allié a un secret qu'il/elle partage cette nuit : une peur, un regret, un espoir. Ce secret sera narrativement pertinent plus tard — peut-être lors du sacrifice de l'Acte 5." },
  ],
  npcs: [
    {
      name: "Allié(e) de cœur (à adapter)",
      role: "Compagnon(ne) émotionnel(le) principal(e)",
      personality: "Vulnérable ce soir. Les murs sont tombés, les masques retirés. Ce qui reste est une personne qui a peur de perdre ce qui lui est cher.",
      appearance: "Sans armure, sans arme, sans titre. Juste une personne dans un jardin, sous les étoiles, qui essaie de trouver le courage de dire ce qui compte.",
      dialogues: {
        greeting: "« J'espérais que tu viendrais. Non — je savais que tu viendrais. C'est ça qui fait peur. Quand quelqu'un devient prévisible, c'est qu'on le connaît trop. Et quand on connaît quelqu'un trop bien... on a quelque chose à perdre. »",
        info: "« Tu sais ce qui me terrifies le plus ? Pas le Cercle. Pas Malachar. Pas la guerre. Ce qui me terrifies, c'est l'après. Si on gagne — comment on revient à une vie normale après avoir vu ce qu'on a vu ? Et si on perd... (silence) »",
        quest: "« Promets-moi quelque chose. Pas de gagner, pas de survivre — ça, c'est hors de notre contrôle. Promets-moi que si l'un de nous tombe... l'autre continuera. Pas pour la vengeance. Pour la vie. Promets. »",
        farewell: "« (sourire fragile) Merci. Pour cette nuit. Pour les étoiles. Pour... tout. Allez, il faut dormir. Demain sera... demain sera ce qu'il sera. Bonne nuit. »",
      },
    },
  ],
  choices: [
    {
      id: 'choice-intimate-moment',
      prompt: "Que dit le héros en réponse à la promesse demandée ?",
      options: [
        {
          label: "Promettre sincèrement",
          description: "Donner sa parole, du fond du cœur.",
          consequence: "La promesse crée un lien narratif puissant. Si le PNJ tombe plus tard, le PJ obtient un bonus unique : un jet automatique réussi au moment le plus critique, alimenté par la promesse.",
          nextScene: 'scene-4-10-eve-battle',
        },
        {
          label: "Refuser doucement",
          description: "Expliquer qu'on ne peut pas promettre ce qui n'est pas garanti.",
          consequence: "L'honnêteté est respectée. Le PNJ comprend, et cette franchise renforce leur lien d'une manière différente — basée sur la vérité, pas sur l'espoir.",
          nextScene: 'scene-4-10-eve-battle',
        },
        {
          label: "Contre-promettre",
          description: "Promettre autre chose : 'Je promets qu'on fera tout pour que personne ne tombe.'",
          consequence: "Le PNJ sourit — un vrai sourire, le premier depuis longtemps. 'Ça, je peux y croire.' La promesse modifiée porte sa propre force.",
          nextScene: 'scene-4-10-eve-battle',
        },
      ],
    },
  ],
  nextScenes: ['scene-4-10-eve-battle'],
  previousScene: 'scene-4-10-spy-mission',
};

const scene_4_10_eve_battle: BookScene = {
  id: 'scene-4-10-eve-battle',
  sceneNumber: 213,
  title: "La Dernière Nuit de Paix",
  type: 'transition',
  location: "Sol-Aureus, veille de la marche finale",
  locationId: 'sol-aureus',
  estimatedMinutes: 25,
  readAloud: {
    text: `C'est la dernière nuit.

Demain, l'armée de l'Alliance se met en marche vers le Nexus des Sceaux. Demain commence l'Acte final d'une histoire qui a commencé dans une taverne, il y a ce qui semble une éternité. Demain, le monde sera sauvé ou perdu.

Mais ce soir, il y a encore le temps.

Sol-Aureus est silencieuse — pas le silence de la peur, mais celui de la réflexion. Dans les casernes, les soldats écrivent des lettres. Dans les temples, les fidèles prient. Dans les tavernes, les verres sont levés en silence. Et dans les rues, des gens marchent lentement, regardant la ville comme s'ils la voyaient pour la dernière fois.

Peut-être est-ce le cas.

Vous trouvez un endroit calme. Un toit, un banc, un mur d'enceinte — peu importe. Un endroit d'où vous pouvez voir la ville, les étoiles, et votre propre reflet dans la vitre d'une fenêtre éteinte.

Qu'avez-vous accompli depuis le début ? Les amis gagnés, les ennemis vaincus, les choix — bons et mauvais — qui vous ont menés ici. Le fermier que vous avez sauvé au Chapitre 1. Le traître que vous n'avez pas vu venir au Chapitre 5. Le sacrifice de l'allié au Chapitre 7. Le dragon de cristal, les spectres d'Ashka, les bas-fonds, les étoiles dans le jardin.

Tout cela a mené ici. À cette nuit. À cette veille.

Demain, vous marcherez. Pas seuls — jamais seuls. Avec une armée, des amis, un but. Mais la marche sera longue, et la destination est un endroit d'où certains ne reviendront pas.

Le vent souffle sur Sol-Aureus. Les bannières claquent. Et quelque part, un enfant rit dans la nuit.

C'est pour ce rire que vous vous battez.`,
    mood: "Méditation avant la tempête, récapitulation, sérénité fragile",
    music: "Piano lent, cordes en sourdine, cloches lointaines, bruit de ville endormie, silence",
  },
  gmNotes: [
    { type: 'info', text: "Dernière scène de l'Acte 4. C'est un moment de respiration et de préparation émotionnelle pour l'Acte final. Pas de mécanique, pas d'enjeux — juste le calme avant la dernière tempête." },
    { type: 'tip', text: "Demandez à chaque joueur ce que son personnage fait cette dernière nuit. Écrit-il une lettre ? Prie-t-il ? S'entraîne-t-il ? Boit-il ? Médite-t-il ? Ces choix définissent les personnages plus que n'importe quel combat." },
    { type: 'secret', text: "Pendant la nuit, chaque PJ reçoit un cadeau d'un PNJ allié : une lettre, un objet, un mot. Quelque chose de personnel. Ces objets auront une importance narrative dans l'Acte 5." },
    { type: 'lore', text: "La veille de bataille est un moment sacré dans la tradition d'Aethelgard. Les soldats qui survivent au combat portent cette nuit en eux pour le reste de leur vie — c'est la nuit où ils ont choisi de ne pas fuir." },
  ],
  choices: [
    {
      id: 'choice-eve-activity',
      prompt: "Que fait le héros lors de sa dernière nuit de paix ?",
      options: [
        {
          label: "Écrire une lettre à ceux qu'on pourrait ne jamais revoir",
          description: "Poser sur le papier ce que le cœur ne peut pas dire à voix haute.",
          consequence: "La lettre est scellée et confiée à un messager de confiance. Si le PJ tombe en combat, la lettre sera délivrée. Mécaniquement : avantage sur le premier jet de sauvegarde contre la mort dans l'Acte 5.",
          nextScene: 'scene-5-11-1',
        },
        {
          label: "Méditer ou prier",
          description: "Chercher la paix intérieure avant la tempête.",
          consequence: "La méditation apporte une clarté d'esprit remarquable. Le PJ récupère tous ses emplacements de sort et ses PV, et gagne l'inspiration au début de l'Acte 5.",
          nextScene: 'scene-5-11-1',
        },
        {
          label: "Affûter ses armes et vérifier son équipement",
          description: "Se préparer méticuleusement, comme avant chaque bataille.",
          consequence: "L'équipement est en condition parfaite. Le PJ gagne un bonus de +1 aux jets d'attaque et de dégâts pour la première rencontre de l'Acte 5.",
          nextScene: 'scene-5-11-1',
        },
        {
          label: "Boire à la taverne avec les soldats",
          description: "Partager une dernière chope avec ceux qui marcheront à vos côtés.",
          consequence: "La camaraderie réchauffe le cœur. Le moral des troupes adjacentes au PJ reçoit un bonus permanent. Et le lendemain, malgré la gueule de bois, le cœur est léger.",
          nextScene: 'scene-5-11-1',
          reputationChange: [{ faction: "Peuple de Sol-Aureus", amount: 10 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-5-11-1'],
  previousScene: 'scene-4-10-romance',
};

// ============================================================================
// EXPORT
// ============================================================================

export const ACT_4_EXPANSION_SCENES: BookScene[] = [
  // Chapitre 8
  scene_4_8_mountain_pass,
  scene_4_8_dwarf_politics,
  scene_4_8_dragon_lair,
  scene_4_8_forge_ritual,
  // Chapitre 9
  scene_4_9_ash_survival,
  scene_4_9_ghost_city,
  scene_4_9_vexor_past,
  scene_4_9_freed_souls,
  // Chapitre 10
  scene_4_10_underground,
  scene_4_10_training,
  scene_4_10_spy_mission,
  scene_4_10_romance,
  scene_4_10_eve_battle,
];
