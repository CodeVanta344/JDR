/**
 * EXPANSION SCENES - ACTE I
 * 15 scènes additionnelles pour les chapitres 1 à 4 de l'Acte I
 * S'intercalent entre les scènes existantes ou branchent depuis elles
 */

import type { BookScene } from './gm-book-data';

// ============================================================================
// CHAPITRE 1 - LA CITÉ DORÉE (5 scènes)
// ============================================================================

const scene_1_1_market: BookScene = {
  id: 'scene-1-1-market',
  sceneNumber: 10,
  title: "Le Grand Marché de Sol-Aureus",
  type: 'exploration',
  location: "Grand Marché, Quartier des Marchands",
  locationId: 'sol-aureus',
  estimatedMinutes: 35,
  readAloud: {
    text: `Le Grand Marché de Sol-Aureus est une créature vivante faite de bruit, de couleurs et d'odeurs.

Quatre allées principales rayonnent depuis une fontaine centrale en forme de soleil doré, chacune dédiée à un type de commerce. L'Allée des Épices vous frappe en premier : safran de la Côte des Orages, poivre noir des Terres du Sud, cannelle des comptoirs elfiques. Les marchands crient leurs prix dans cinq langues différentes, et les enfants courent entre les étals en chapardant des fruits avec une adresse qui ferait rougir un voleur professionnel.

L'Allée des Artisans expose des merveilles : armures naines martelées à froid, soieries elfiques qui changent de couleur avec la lumière, automates gnomes qui dansent et jouent de la musique, potions de toutes les couleurs dans des fioles qui semblent vivantes. Un forgeron halfelin martèle une lame en sifflant, indifférent au chaos autour de lui.

L'Allée des Curiosités est la plus étrange. Des marchands aux origines douteuses vendent des cartes de trésors « garanties authentiques », des reliques d'époques oubliées, et des animaux exotiques dans des cages dorées. Un perroquet mécanique répète les conversations des passants avec un décalage troublant.

Mais c'est dans l'Allée des Murmures que les choses deviennent intéressantes. Les étals y sont plus discrets, les vendeurs parlent à voix basse, et les marchandises ne sont pas toujours exposées. Ici, on vend de l'information, des contacts, et des choses qui n'ont pas de nom officiel.

Au milieu de tout cela, une femme en haillons agrippe votre bras. Ses yeux sont écarquillés, fiévreux. « Ils achètent des gens, » souffle-t-elle avant de disparaître dans la foule.`,
    mood: "Effervescence joyeuse masquant des courants sombres",
    music: "Marché médiéval animé, cris de marchands, musique de rue, foule dense",
  },
  gmNotes: [
    { type: 'info', text: "Le Grand Marché est le poumon économique de Sol-Aureus. Il fonctionne du lever au coucher du soleil. Chaque allée offre des opportunités différentes : achats, informations, contacts, et même des ennuis." },
    { type: 'tip', text: "Laissez les joueurs explorer librement. L'Allée des Artisans permet d'acheter de l'équipement (prix standard +10% car Sol-Aureus est chère). L'Allée des Curiosités offre des objets uniques mais potentiellement maudits. L'Allée des Murmures est la porte vers le réseau d'information." },
    { type: 'warning', text: "Pickpockets actifs ! Perception CD 30 ou perte de 1d10 pièces d'or. Les victimes qui font une scène attirent l'attention des gardes ET du Syndicat de l'Ombre, chacun pour ses propres raisons." },
    { type: 'secret', text: "La femme en haillons est Maren, une ancienne servante du noble Valaric. Elle a vu des hommes masqués acheter des esclaves dans une arrière-boutique de l'Allée des Murmures. Elle a fui et se cache. Le Cercle des Cendres la recherche." },
    { type: 'lore', text: "Le Grand Marché occupe l'emplacement de l'ancien Forum d'Ashka, où les esclaves étaient vendus publiquement il y a 120 ans. La fontaine dorée a été construite par-dessus l'ancienne estrade de vente. Certains disent entendre des gémissements quand la fontaine est à sec." },
  ],
  npcs: [
    {
      name: "Zafir le Marchand d'Ailleurs",
      role: "Marchand exotique / Receleur discret",
      personality: "Charmeur, polyglotte, toujours en train de négocier. Cache une intelligence acérée sous un vernis de jovialité.",
      appearance: "Humain à la peau brune, la quarantaine, turban de soie bleue, caftan brodé d'or. Moustache cirée impeccable. Bagues à chaque doigt, chacune d'une origine différente.",
      secret: "Ancien espion du Royaume de la Côte des Orages, reconverti dans le commerce après un désaccord avec ses maîtres. Possède un réseau d'information qui rivalise avec celui du Syndicat. Sait que le Cercle des Cendres achète des artefacts ashkans en grande quantité.",
      dialogues: {
        greeting: "« Ah, des visages neufs ! Bienvenue, bienvenue ! Zafir a tout ce dont vous rêvez et même ce dont vous n'osez pas rêver. Approchez, touchez, sentez. Acheter est optionnel. Repartir les mains vides est impossible. »",
        info: "« Les affaires changent, mes amis. Depuis quelques mois, des acheteurs mystérieux raflent tout ce qui touche à l'ancien empire. Runes, reliques, même de la poussière de cendres ashkanes. Ils paient trois fois le prix et ne marchandent jamais. Quand un acheteur ne marchande pas, c'est qu'il est soit fou, soit désespéré. »",
        quest: "« Un conseil gratuit, ce qui est rare chez moi : allez voir la vieille Nara dans l'Allée des Murmures. Elle vend des cartes anciennes. Certaines montrent des passages sous la ville que personne n'a empruntés depuis l'ère d'Ashka. Elle vous les vendra pour... disons un service en retour. »",
        farewell: "« Que les vents vous soient favorables et que vos bourses restent pleines ! Revenez quand vous voulez. Zafir est toujours là, sauf quand il n'y est pas. »",
      },
    },
    {
      name: "Maren la Fugitive",
      role: "Témoin / Quête secondaire",
      personality: "Terrifiée, méfiante, mais désespérée au point de prendre des risques. Parle vite et regarde constamment par-dessus son épaule.",
      appearance: "Humaine, la vingtaine, cheveux noirs emmêlés, vêtements de servante déchirés et sales. Yeux cernés, lèvres gercées. Une marque de brûlure récente sur l'avant-bras gauche.",
      secret: "A été marquée par un sort de pistage du Cercle des Cendres. Tant que la marque n'est pas dissipée (Dissipation de la magie CD 40), ils peuvent la retrouver. Si les joueurs l'aident, elle peut les mener à l'arrière-boutique où elle a vu les transactions.",
      dialogues: {
        greeting: "« Vous... vous n'êtes pas avec eux ? Non, vos yeux sont différents. S'il vous plaît, aidez-moi. Personne ne me croit. »",
        info: "« Dans l'Allée des Murmures, derrière la boutique de l'herboriste. Il y a une porte cachée. La nuit, des hommes en masques de cendre y entrent avec des gens enchaînés. Des gens qui ne ressortent pas. J'ai servi le vin lors d'une... réunion. J'ai vu trop. »",
        quest: "« La marque sur mon bras. Elle brûle quand ils sont proches. Trouvez quelqu'un pour l'enlever, et je vous montrerai la porte. Je vous montrerai tout. »",
        farewell: "« Je serai près de la fontaine à la tombée du jour. Si je n'y suis pas... ne me cherchez pas. Ça voudra dire qu'ils m'ont trouvée en premier. »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Perception', dc: 30, success: "Vous sentez une main habile effleurer votre bourse. Un gamin d'une dizaine d'années, rapide comme l'éclair. Vous avez le temps de réagir.", failure: "En quittant un étal, vous réalisez que votre bourse est plus légère de 1d10 pièces d'or. Aucune trace du coupable." },
    { skill: 'Persuasion', dc: 35, success: "Les marchands de l'Allée des Murmures vous acceptent comme clients sérieux. Accès aux informations discrètes sur les mouvements suspects en ville.", failure: "Les marchands de l'Allée des Murmures vous ignorent poliment. 'On ne sert que les habitués, désolé.'" },
    { skill: 'Investigation', dc: 40, success: "En observant les flux de personnes, vous remarquez un schéma : certains individus en robes sombres visitent les mêmes étals en séquence, comme s'ils suivaient un itinéraire codé.", failure: "Le marché est trop chaotique pour y distinguer un motif." },
  ],
  choices: [
    {
      id: 'choice-market',
      prompt: "Que font les personnages au Grand Marché ?",
      options: [
        {
          label: "Aider Maren",
          description: "Suivre la femme terrifiée et enquêter sur ses dires.",
          consequence: "Mène à une quête secondaire : trouver un mage pour dissiper la marque (Temple ou Guilde), puis infiltrer l'arrière-boutique du Cercle.",
          nextScene: 'scene-1-1-temple',
          reputationChange: [{ faction: 'Peuple de Sol-Aureus', amount: 5 }],
        },
        {
          label: "Acheter et négocier",
          description: "Profiter du marché pour s'équiper et collecter des rumeurs.",
          consequence: "Équipement acheté, 2 rumeurs de la table aléatoire obtenues. Zafir devient un contact récurrent.",
          nextScene: 'scene-1-1-2',
        },
        {
          label: "Explorer l'Allée des Murmures",
          description: "Se mêler aux marchands d'information et aux contacts louches.",
          consequence: "Jet d'Intuition CD 35. Succès : découverte d'un réseau d'achat d'artefacts ashkans. Échec : attirer l'attention indésirable.",
          nextScene: 'scene-1-1-night',
          skillCheck: { skill: 'Intuition', dc: 35, success: "Vous repérez un homme en robe grise qui achète discrètement des fragments de runes ashkanes à prix d'or. Agent du Cercle identifié.", failure: "Un marchand vous vend de fausses informations pour 10 pièces d'or. Perte de temps." },
        },
        {
          label: "Suivre les robes sombres",
          description: "Filer discrètement les individus suspects repérés dans la foule.",
          consequence: "Discrétion CD 40. Mène à un entrepôt dans le Quartier Bas où le Cercle stocke des artefacts.",
          nextScene: 'scene-1-1-lowquarter',
          skillCheck: { skill: 'Discrétion', dc: 40, success: "Vous suivez la robe grise à travers un dédale de ruelles. Il entre dans un entrepôt barricadé du Quartier Bas.", failure: "La robe grise vous repère. Elle accélère et disparaît dans une ruelle. Quand vous y arrivez, il n'y a plus personne. Juste un morceau de tissu accroché à un clou." },
        },
      ],
    },
  ],
  loot: [
    "Carte des tunnels anciens (achetable chez Nara pour 20 PO ou un service)",
    "Potion de soin mineure (10 PO)",
    "Dague de cérémonie ashkane (trouvée chez un antiquaire, 50 PO, pas magique mais intéressante)",
  ],
  nextScenes: ['scene-1-1-2', 'scene-1-1-temple', 'scene-1-1-night', 'scene-1-1-lowquarter'],
  previousScene: 'scene-1-1-2',
};

const scene_1_1_temple: BookScene = {
  id: 'scene-1-1-temple',
  sceneNumber: 11,
  title: "Le Temple de Solarius",
  type: 'social',
  location: "Grand Temple de Solarius, Quartier du Temple",
  locationId: 'sol-aureus',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le Grand Temple de Solarius est une cathédrale de lumière.

Le dôme doré, visible de partout dans la ville, est encore plus impressionnant de l'intérieur. Chaque panneau de métal est gravé de scènes de la mythologie solaire, et à midi, quand le soleil est au zénith, des ouvertures savamment disposées projettent des rayons de lumière qui dessinent un soleil parfait sur le sol de marbre blanc.

Vous n'êtes pas là à midi, mais même le soir, le Temple rayonne. Des dizaines de bougies flottent dans l'air à hauteur d'épaule, soutenues par une magie ancienne et douce. L'odeur d'encens de cèdre emplit l'espace, et un chœur invisible chante une psalmodie apaisante qui semble venir des murs eux-mêmes.

Des fidèles prient en silence dans les rangées de bancs. Des moines en robe blanche et dorée circulent, offrant de l'eau bénite et des paroles de réconfort. Tout semble serein.

Mais en observant mieux, vous remarquez des détails qui brisent l'illusion. Un moine dont les mains tremblent. Un prêtre qui regarde par-dessus son épaule avant de disparaître dans une porte latérale. Et au fond du Temple, devant le Grand Autel de Solarius, un homme agenouillé en prière depuis si longtemps que ses genoux ont marqué le marbre.

C'est Frère Aldwin. Et quand il lève les yeux vers vous, vous voyez quelque chose que vous ne vous attendiez pas à trouver dans un lieu saint : de la peur.`,
    mood: "Sérénité apparente masquant une inquiétude profonde",
    music: "Chœur liturgique doux, cloches de cristal, silence recueilli",
  },
  gmNotes: [
    { type: 'info', text: "Le Temple de Solarius est le centre spirituel de Sol-Aureus et le siège du clergé. Les prêtres offrent gratuitement soins mineurs (1d8+2 PV) et bénédictions (+1 au prochain jet de sauvegarde). Une prière sincère octroie Inspiration." },
    { type: 'tip', text: "Si les joueurs amènent Maren ici pour dissiper sa marque, Frère Aldwin peut le faire (Dissipation CD 40, il a +8). En échange, il demande de l'aide pour enquêter sur la disparition des fidèles." },
    { type: 'warning', text: "Le Grand Prêtre Valerius est un PNJ ambigu. Il semble bienveillant mais refuse de parler des disparitions. Il pourrait être sous l'influence du Cercle, ou simplement terrorisé. Ne le révélez pas encore." },
    { type: 'secret', text: "Sous le Grand Autel se trouve un Sceau Majeur, l'un des plus puissants d'Aethelgard. Le Grand Prêtre Valerius le sait et fait tout pour le cacher, convaincu que le secret est la meilleure protection. Il a tort." },
    { type: 'lore', text: "Le Temple est construit sur un ancien site de pouvoir pré-ashkan. Avant l'Hégémonie, c'était un sanctuaire druidique dédié au soleil. Les Ashkans l'ont converti en temple à leur dieu sombre. Après leur chute, il a été reconsacré à Solarius. Chaque strate ajoute de la puissance au lieu." },
  ],
  npcs: [
    {
      name: "Frère Aldwin",
      role: "Prêtre inquiet / Allié potentiel",
      personality: "Doux et patient, mais rongé par la culpabilité d'un passé violent. Sa foi est sincère mais ébranlée par ce qu'il sent dans le Temple.",
      appearance: "Humain, la quarantaine, crâne rasé, robe blanche et dorée impeccable. Mains couvertes de cicatrices de brûlure. Cernes profondes sous des yeux bienveillants mais hantés.",
      secret: "Sent une « corruption » grandir sous le Temple. Ses prières lui montrent des visions de ténèbres montant depuis le sous-sol. Le Grand Prêtre lui a ordonné de se taire.",
      dialogues: {
        greeting: "« Que la lumière de Solarius vous guide, voyageurs. Vos visages portent le poids de questions lourdes. Approchez. La lumière n'a pas peur des questions. »",
        info: "« Le Temple... n'est plus le sanctuaire qu'il était. La nuit, les bougies vacillent sans vent. Les prières résonnent différemment, comme si quelque chose les absorbait. Et les fidèles... trois ont disparu ce mois-ci. Après la prière du soir. Comme si la nuit les avait avalés au seuil même de la lumière. »",
        quest: "« Le Grand Prêtre refuse d'agir. Il dit que la foi suffit. Mais la foi sans action est une bougie sans flamme. J'ai besoin de gens de courage. Le sous-sol du Temple est interdit, mais j'ai entendu des bruits derrière la porte scellée. Des murmures dans une langue que je ne connais pas. Aidez-moi à comprendre ce qui se passe. »",
        farewell: "« Que Solarius veille sur chacun de vos pas. Et rappelez-vous : la lumière la plus forte est celle qu'on porte en soi, car aucune ombre ne peut l'éteindre. »",
      },
      stats: { hp: 35, atk: 8, ac: 16 },
    },
    {
      name: "Grand Prêtre Valerius",
      role: "Chef du clergé / PNJ ambigu",
      personality: "Charismatique, autoritaire, convaincu que le secret protège. Paternaliste envers ses ouailles. Cache une peur profonde sous un masque de sérénité.",
      appearance: "Humain âgé, la soixantaine, cheveux blancs comme la neige. Robe de cérémonie dorée et blanc immaculé. Regard perçant, sourire chaleureux mais contrôlé. Bague de fonction au rubis impressionnant.",
      secret: "Sait que le Sceau Majeur sous le Temple faiblit. A envoyé deux prêtres enquêter en secret. Ils ne sont pas revenus. Terrifié, il a scellé la porte et prétend que tout va bien.",
      dialogues: {
        greeting: "« Bienvenue dans la maison de Solarius. Ici, tous sont égaux devant la lumière. Que puis-je pour vous, mes enfants ? »",
        info: "« Des disparitions ? La ville est grande et les temps sont incertains. Le Temple fait ce qu'il peut. Nous prions, nous soignons, nous réconfortons. Quant aux rumeurs d'activités étranges dans le Temple... les vieux bâtiments font des bruits étranges. C'est tout. »",
        quest: "« Je vous remercie de votre inquiétude, mais le Temple n'a besoin d'aide de personne. Nos affaires internes restent internes. Si vous souhaitez prier, les bancs sont ouverts. Pour le reste... laissez le clergé gérer les affaires du clergé. »",
        farewell: "« Que la lumière de Solarius vous accompagne. Et... ne vous aventurez pas dans les zones interdites du Temple. Pour votre propre sécurité. »",
      },
      stats: { hp: 50, atk: 12, ac: 18 },
    },
  ],
  skillChecks: [
    { skill: 'Intuition', dc: 35, success: "Le Grand Prêtre ment. Son sourire est impeccable mais ses pupilles se dilatent quand il parle des disparitions. Il cache quelque chose d'important.", failure: "Le Grand Prêtre semble sincère et confiant. Un homme de foi solide." },
    { skill: 'Religion', dc: 30, success: "Les bougies flottantes oscillent de manière anormale. Le sort qui les maintient devrait être stable. Quelque chose perturbe la magie divine du Temple depuis en dessous.", failure: "Le Temple semble normal pour un lieu de cette importance." },
    { skill: 'Perception', dc: 40, success: "Derrière le Grand Autel, vous repérez une porte à peine visible, intégrée dans le mur de marbre. Des runes sont gravées sur le linteau. La porte est scellée par un sort divin récent.", failure: "Le Temple est grandiose mais ne révèle rien d'inhabituel à vos yeux." },
  ],
  choices: [
    {
      id: 'choice-temple',
      prompt: "Que font les personnages au Temple ?",
      options: [
        {
          label: "Aider Frère Aldwin",
          description: "Accepter d'enquêter discrètement sur les perturbations dans le Temple.",
          consequence: "Alliance avec Aldwin. Accès au sous-sol possible via une clé qu'il possède. Mène à une exploration secrète du sous-sol dans un prochain chapitre.",
          nextScene: 'scene-1-1-3',
          reputationChange: [{ faction: 'Clergé de Solarius', amount: 5 }],
        },
        {
          label: "Confronter le Grand Prêtre",
          description: "Exiger des réponses de Valerius sur les disparitions et la porte scellée.",
          consequence: "Valerius se braque. Intimidation CD 50 : il avoue tout, effondré. Échec : il fait appeler les gardes du Temple et vous bannit pour une semaine.",
          nextScene: 'scene-1-1-3',
          skillCheck: { skill: 'Intimidation', dc: 50, success: "Le masque tombe. Valerius s'effondre sur un banc. 'Deux de mes prêtres sont descendus. Ils ne sont pas remontés. Le Sceau... il se fissure. Et je ne sais pas quoi faire.'", failure: "'Gardes ! Escortez ces individus hors du Temple. Interdiction d'accès pour une semaine.' Valerius se détourne, les mains tremblantes." },
        },
        {
          label: "Prier et observer",
          description: "Assister à un office et observer discrètement le fonctionnement du Temple.",
          consequence: "Inspiration divine (avantage au prochain jet de sauvegarde). Perception CD 30 : repérer un moine qui se faufile vers les sous-sols à minuit.",
          nextScene: 'scene-1-1-night',
        },
        {
          label: "Demander la dissipation de la marque de Maren",
          description: "Amener Maren au Temple pour que Frère Aldwin dissipe le sort de pistage.",
          consequence: "Aldwin réussit la dissipation. Maren est en sécurité et fournit des informations détaillées sur l'arrière-boutique du Cercle.",
          nextScene: 'scene-1-1-night',
          reputationChange: [{ faction: 'Peuple de Sol-Aureus', amount: 3 }],
        },
      ],
    },
  ],
  loot: [
    "Bénédiction de Solarius (+1 prochain jet de sauvegarde, dure 24h)",
    "Fiole d'eau bénite (gratuite, offerte par Aldwin)",
    "Symbole sacré de Solarius (10 PO, focus divin)",
  ],
  nextScenes: ['scene-1-1-3', 'scene-1-1-night'],
  previousScene: 'scene-1-1-2',
};

const scene_1_1_guild: BookScene = {
  id: 'scene-1-1-guild',
  sceneNumber: 12,
  title: "La Tour des Arcanes",
  type: 'exploration',
  location: "Tour des Arcanes, Quartier Académique",
  locationId: 'sol-aureus',
  estimatedMinutes: 35,
  readAloud: {
    text: `La Tour des Arcanes défie les lois de la physique avec une arrogance toute académique.

Vue de l'extérieur, c'est une spirale de cristal et de métal qui s'élance vers le ciel en tournoyant comme un escalier sans fin. Des runes luisent le long de ses arêtes, et des éclairs miniatures dansent entre les pointes de cristal au sommet. Les fenêtres ne sont jamais au même endroit deux fois, ce qui rend l'observation depuis l'extérieur particulièrement frustrante.

Le hall d'entrée est un dôme de verre où flottent des maquettes miniatures des constellations, tournant lentement dans une danse silencieuse. Au centre, un bureau d'accueil taillé dans un seul bloc de quartz abrite un golem bureaucratique de la taille d'un chat, fait d'encre animée et de parchemin froissé.

« Bienvenue à la Tour des Arcanes, » dit le golem d'une voix de papier froissé. « Veuillez indiquer le motif de votre visite, votre niveau d'accréditation magique, et si vous transportez des substances des Plans Extérieurs, des artefacts maudits, ou des émotions particulièrement intenses. La Tour est sensible aux émotions. »

Au-delà du hall, des escaliers montent en spirale vers les étages supérieurs : salles de cours, laboratoires, bibliothèque, et les niveaux interdits. Des apprentis en robe bleue circulent, le nez dans leurs grimoires, se cognant régulièrement dans les murs, les meubles, et entre eux.

Un tableau d'affichage près de l'entrée annonce : « Le troisième sous-sol reste fermé par ordre du Haut-Mage. Les étudiants sont priés de cesser d'essayer de forcer la porte. Le sort de gardiennage a déjà transformé trois personnes en grenouilles ce mois-ci. »`,
    mood: "Émerveillement académique, humour décalé, mystère intellectuel",
    music: "Bourdonnement magique doux, pages qui tournent, éclats d'énergie lointains",
  },
  gmNotes: [
    { type: 'info', text: "La Tour des Arcanes est la guilde magique officielle de Sol-Aureus. Elle abrite 200+ mages, des laboratoires, et la plus grande bibliothèque magique d'Aethelgard. L'inscription à la guilde coûte 100 PO et nécessite un test magique." },
    { type: 'tip', text: "Un personnage avec des capacités magiques peut s'inscrire à la guilde. Le test : identifier 3 runes (Arcanes CD 25), lancer un sort sous observation, et répondre à une question philosophique sur l'éthique magique. Réussite = accès à la bibliothèque et aux ateliers de base." },
    { type: 'warning', text: "Le troisième sous-sol abrite un fragment de Sceau que le Haut-Mage Theron étudie en secret. Forcer l'accès déclenche un sort d'alarme ET de transformation (CD 50 Sagesse ou polymorphé en grenouille pendant 1h)." },
    { type: 'secret', text: "Un apprenti, Calen, a réussi à espionner le troisième sous-sol. Il a vu des runes ashkanes qui pulsent et un bassin de veinérite liquide qui bouge tout seul. Il est trop effrayé pour y retourner mais trop curieux pour lâcher l'affaire." },
    { type: 'lore', text: "La Tour a été construite il y a 80 ans sur les fondations d'un observatoire ashkan. Les premiers mages qui ont creusé les fondations ont trouvé des salles scellées pleines de connaissances interdites. Le Haut-Mage d'alors a tout enfermé au sous-sol. Theron est le premier à rouvrir certaines portes." },
  ],
  npcs: [
    {
      name: "Calen l'Apprenti",
      role: "Apprenti mage / Informateur involontaire",
      personality: "Curieux maladif, nerveux, bavard quand il est stressé. Brillant mais manque de jugement. Le genre à ouvrir une boîte marquée « ne pas ouvrir ».",
      appearance: "Demi-elfe, la vingtaine, robe bleue tachée d'encre, cheveux en bataille. Lunettes de travers. Toujours au moins trois livres sous le bras, dont un qui fume légèrement.",
      secret: "A volé un fragment de parchemin du troisième sous-sol. Le parchemin contient un diagramme partiel du réseau de Sceaux sous Sol-Aureus. Il ne sait pas ce que c'est mais sent que c'est important.",
      dialogues: {
        greeting: "« Oh ! Des gens ! Des vrais gens, pas des mages ! Enfin, pas que les mages ne soient pas de vrais gens, c'est juste que... Je parle trop. Bonjour. Qu'est-ce que vous cherchez ? La bibliothèque est au troisième étage. Sauf le troisième sous-sol. N'allez PAS au troisième sous-sol. »",
        info: "« Il se passe des trucs bizarres. Le Haut-Mage Theron ne dort plus. Il passe ses nuits au sous-sol avec trois autres mages seniors. Ils ont fait installer des barrières de silence. Et la semaine dernière, il y a eu... un tremblement. Pas un tremblement de terre. Un tremblement de MAGIE. Tout le monde l'a senti. Theron a dit que c'était une expérience ratée. Mais je l'ai vu trembler. »",
        quest: "« J'ai trouvé quelque chose. Un parchemin. Je ne devrais pas l'avoir. Si Theron apprend que je l'ai pris... transformé en grenouille, au minimum. Mais regardez. C'est un schéma. Des cercles concentriques reliés par des lignes de force. Ça ressemble à un réseau. Comme une toile d'araignée sous toute la ville. Qu'est-ce que c'est ? »",
        farewell: "« Vous n'avez pas eu cette conversation avec moi. Je n'existe pas. Je suis juste un apprenti ordinaire qui n'a rien fait d'illégal récemment. Au revoir. »",
      },
      stats: { hp: 18, atk: 6, ac: 12 },
    },
  ],
  skillChecks: [
    { skill: 'Arcanes', dc: 25, success: "Vous identifiez correctement les trois runes du test d'entrée. Le golem bureaucratique tamponné votre formulaire. Accès basique accordé.", failure: "Vous confondez une rune de protection avec une rune d'invocation. Le golem soupire (comment un golem de papier soupire, c'est un mystère). 'Accès refusé. Revenez après avoir étudié.'" },
    { skill: 'Investigation', dc: 40, success: "En parcourant la bibliothèque, vous trouvez une référence aux 'Sceaux de Contention' dans un ouvrage sur l'histoire ashkane. Le passage mentionne 'sept sceaux majeurs répartis aux points de convergence des lignes de force'.", failure: "La bibliothèque est immense. Sans savoir exactement quoi chercher, les heures passent sans résultat concret." },
    { skill: 'Persuasion', dc: 35, success: "Calen vous fait suffisamment confiance pour vous montrer le parchemin volé. C'est un diagramme partiel du réseau de Sceaux sous Sol-Aureus.", failure: "Calen bafouille, rougit, et s'enfuit en marmonnant quelque chose sur un chaudron à surveiller." },
  ],
  choices: [
    {
      id: 'choice-guild',
      prompt: "Que font les personnages à la Tour des Arcanes ?",
      options: [
        {
          label: "S'inscrire à la Guilde",
          description: "Passer le test d'admission et devenir membre de la Guilde des Arcanes.",
          consequence: "100 PO + test réussi = accès à la bibliothèque, aux ateliers de base, et aux rumeurs magiques. Statut officiel dans la ville.",
          nextScene: 'scene-1-1-3',
          reputationChange: [{ faction: 'Guilde des Arcanes', amount: 10 }],
        },
        {
          label: "Enquêter sur le troisième sous-sol",
          description: "Chercher des informations sur ce que cache le Haut-Mage Theron.",
          consequence: "Via Calen : diagramme partiel des Sceaux. Via infiltration : sort de gardiennage dangereux. Via Theron directement : il refuse mais note l'intérêt des PJ.",
          nextScene: 'scene-1-1-3',
        },
        {
          label: "Recherche en bibliothèque",
          description: "Passer des heures à chercher des informations sur les Sceaux, l'ère d'Ashka, ou les disparitions.",
          consequence: "Investigation CD 40. Succès : informations cruciales sur les Sceaux de Contention. Échec : informations parcellaires mais pistes intéressantes.",
          nextScene: 'scene-1-1-3',
          skillCheck: { skill: 'Investigation', dc: 40, success: "Vous trouvez un passage mentionnant sept sceaux et les rituels de maintenance nécessaires. Le dernier rituel date de... 120 ans.", failure: "Des heures de lecture. Beaucoup d'informations, peu de pertinence. Mais vous notez que plusieurs ouvrages sur l'ère d'Ashka ont été récemment retirés des étagères." },
        },
        {
          label: "Acheter des composants magiques",
          description: "Profiter des boutiques des artisans de la Tour pour acheter des composants et des parchemins.",
          consequence: "Accès aux parchemins de sorts de niveau 1-2 (prix standard) et composants rares (prix x2).",
          nextScene: 'scene-1-1-2',
        },
      ],
    },
  ],
  loot: [
    "Diagramme partiel des Sceaux (obtenu via Calen)",
    "Parchemin de Détection de la magie (15 PO)",
    "Cristal de focalisation (25 PO, focus arcanique)",
  ],
  nextScenes: ['scene-1-1-2', 'scene-1-1-3'],
  previousScene: 'scene-1-1-city',
};

const scene_1_1_lowquarter: BookScene = {
  id: 'scene-1-1-lowquarter',
  sceneNumber: 13,
  title: "Le Quartier Bas",
  type: 'exploration',
  location: "Quartier Bas, Sol-Aureus",
  locationId: 'sol-aureus',
  estimatedMinutes: 35,
  readAloud: {
    text: `Le Quartier Bas est le ventre de Sol-Aureus, et comme tout ventre, il digère ce que le reste du corps refuse.

Ici, les pavés dorés sont un souvenir lointain. Les rues sont de terre battue, de boue quand il pleut, de poussière quand il fait sec. Les bâtiments se serrent les uns contre les autres comme des réfugiés autour d'un feu, leurs façades lépreuses suintant d'une humidité perpétuelle. Des cordes à linge traversent les ruelles comme des toiles d'araignée, les vêtements pendant comme des fantômes fatigués.

L'odeur est un assaut : cuisine bon marché, déchets, sueur, et cette senteur de moisissure qui monte du sol comme la respiration d'un sous-sol. Des enfants pieds nus jouent avec des bâtons dans un caniveau. Une vieille femme vend des pommes flétries à un coin de rue, surveillant chaque passant avec des yeux de rapace.

Au cœur du quartier, une petite place abrite un puits communal autour duquel la vie s'organise. Des femmes lavent du linge, des hommes jouent aux dés sur une caisse renversée, et dans l'ombre d'un auvent déchiré, un groupe de jeunes aux yeux durs surveille chaque mouvement.

Ce sont les Griffes, le gang local. Pas le Syndicat de l'Ombre, non, ceux-là sont trop petits pour ça. Les Griffes contrôlent le Quartier Bas par défaut, parce que personne d'autre ne veut de ce territoire.

Parmi les enfants, vous remarquez une fillette à l'écart. Assise sur un tas de briques, les genoux contre la poitrine, elle fixe le sol avec des yeux trop vieux pour un visage aussi jeune. Son bras gauche est enveloppé dans un bandage sale, et elle ne bouge pas quand les autres enfants l'appellent.`,
    mood: "Misère réaliste, humanité dans l'adversité, menace latente",
    music: "Silence urbain lourd, chien qui aboie au loin, gouttes d'eau, murmures",
  },
  gmNotes: [
    { type: 'info', text: "Le Quartier Bas est le territoire le plus pauvre de Sol-Aureus. La Garde y patrouille rarement. Les habitants sont méfiants envers les étrangers mais pas hostiles si on les respecte. L'économie est basée sur le troc, la débrouille, et les services au noir." },
    { type: 'tip', text: "La fillette, Lira, est la clé de cette scène. Son père a disparu il y a une semaine (victime du Cercle). Son bras est blessé parce qu'elle a tenté de suivre les hommes masqués et est tombée dans un escalier. Elle a vu quelque chose d'important." },
    { type: 'warning', text: "Les Griffes (1d6+2 voyous, HP 12, ATK 6, AC 11) taxent les étrangers : 5 PO pour 'traverser le quartier en paix'. Refuser mène à un combat ou à une intimidation réciproque. S'ils voient les joueurs aider Lira, ils changent d'attitude — son père était apprécié." },
    { type: 'secret', text: "Sous la place du puits, un ancien réseau d'égouts ashkans est accessible via une trappe cachée (Perception CD 40 ou Lira peut la montrer). Ce passage rejoint les tunnels menant aux catacombes du Chapitre 3." },
    { type: 'lore', text: "Le Quartier Bas occupe un quartier d'esclaves de l'ère ashkane. Les bâtiments sont construits sur les anciennes barraques. Certaines caves descendent bien plus profond que leurs propriétaires ne le réalisent, se connectant au réseau souterrain." },
  ],
  npcs: [
    {
      name: "Lira",
      role: "Orpheline / Témoin innocent",
      personality: "Silencieuse, observatrice, plus courageuse qu'elle ne devrait l'être. Ne fait confiance qu'à ceux qui prouvent leur gentillesse par des actes, pas des mots.",
      appearance: "Humaine, environ 10 ans. Cheveux bruns emmêlés. Robe rapiécée trois fois. Yeux gris immenses, sérieux. Bras gauche bandé avec un tissu sale. Pieds nus, ongles noirs de crasse.",
      secret: "A suivi les hommes masqués qui ont emmené son père. Les a vus descendre dans la trappe sous le puits avec trois autres personnes enchaînées. A glissé dans l'escalier et s'est cassé le poignet. N'en a parlé à personne parce que 'personne ne croirait une gamine du Quartier Bas'.",
      dialogues: {
        greeting: "« ... » [Elle vous regarde sans rien dire. Si vous vous asseyez à côté d'elle en silence pendant une minute, elle finit par murmurer :] « Vous cherchez quelqu'un vous aussi ? »",
        info: "« Papa n'est pas rentré. Ça fait sept nuits. Sept. J'ai compté les étoiles chaque soir en attendant. Les hommes avec les visages de cendre l'ont emmené. J'ai essayé de les suivre mais je suis tombée. Ils sont descendus sous le puits. Sous la terre. »",
        quest: "« Vous pouvez trouver mon papa ? Il s'appelle Dorin. Il est forgeron. Il a les mains fortes mais il est doux. Il me disait toujours 'Lira, même les étoiles les plus petites brillent dans le noir le plus profond.' Je veux qu'il me le redise. »",
        farewell: "« Si vous le trouvez, dites-lui que Lira compte toujours les étoiles. Il comprendra. »",
      },
    },
    {
      name: "Rask le Griffe",
      role: "Chef de gang / Protecteur réticent",
      personality: "Dur, territorial, mais pas cruel. Protège les siens à sa manière. Méprise les riches et la Garde. Respecte la force et l'honnêteté.",
      appearance: "Humain, la vingtaine, musculeux, cicatrice sur la joue droite en forme de griffure (auto-infligée lors de l'initiation). Veste de cuir sans manches, poings bandés, regard méfiant.",
      secret: "Perd des membres au même rythme que le reste du quartier — trois Griffes ont disparu. Il sait que quelque chose rôde la nuit mais refuse de l'admettre parce que ça saperait l'image d'invincibilité de son gang.",
      dialogues: {
        greeting: "« Le Quartier Bas a des règles. Vous voulez passer, vous payez. 5 pièces d'or par tête. C'est le tarif touriste. Vous voulez la visite guidée, c'est le double. »",
        info: "« Y'a des trucs qui bougent la nuit. Des trucs qui étaient pas là avant. Mes gars ont peur, même s'ils le nient. Des ombres qui marchent toutes seules, des bruits sous la terre, et des gens qui disparaissent. Trois de mes Griffes. Pff. Volatilisés. La Garde s'en fout. On est le Quartier Bas. On n'existe pas pour eux. »",
        quest: "« Vous voulez descendre ? Allez-y. Moi, j'envoie plus personne là-dessous. Mais si vous ramenez Dorin le forgeron — c'est un type bien, il réparait nos armes gratis — alors vous aurez les Griffes comme alliés. Et dans le Quartier Bas, c'est pas rien. »",
        farewell: "« Essayez de pas mourir. Si vous mourez, on récupère vos trucs. C'est les règles. »",
      },
      stats: { hp: 28, atk: 10, ac: 13 },
    },
  ],
  skillChecks: [
    { skill: 'Persuasion', dc: 30, success: "Lira vous fait confiance. Elle vous montre la trappe sous la dalle fissurée à côté du puits. 'C'est par là qu'ils sont descendus.'", failure: "Lira vous regarde avec méfiance. 'Les adultes disent toujours qu'ils vont aider. Ils mentent toujours.'" },
    { skill: 'Intimidation', dc: 35, success: "Rask recule d'un pas. 'OK. OK. Pas de taxe. Mais vous nous devez un service.' Les Griffes vous laissent passer sans problème.", failure: "Rask crache par terre. 'Vous pensez que ça m'impressionne ? Les Griffes !' Quatre voyous émergent des ruelles." },
    { skill: 'Médecine', dc: 25, success: "Vous examinez le bras de Lira. Poignet cassé, mal soigné. Avec un bandage propre et une attelle, vous la soulagez considérablement. Elle vous regarde avec des yeux reconnaissants.", failure: "Le bras est blessé mais vous n'avez pas de quoi le soigner correctement ici." },
  ],
  choices: [
    {
      id: 'choice-lowquarter',
      prompt: "Que font les personnages dans le Quartier Bas ?",
      options: [
        {
          label: "Aider Lira et chercher son père",
          description: "Soigner Lira, gagner sa confiance, et descendre par la trappe du puits.",
          consequence: "Accès au réseau souterrain. Lira montre la trappe. Rask offre l'aide des Griffes pour monter la garde.",
          nextScene: 'scene-1-2-sewers-deep',
          reputationChange: [{ faction: 'Peuple de Sol-Aureus', amount: 10 }, { faction: 'Syndicat de l\'Ombre', amount: 3 }],
        },
        {
          label: "Négocier avec les Griffes",
          description: "Établir un accord avec le gang local pour obtenir informations et passage libre.",
          consequence: "5 PO ou service en échange du libre passage et d'informations sur les disparitions dans le quartier.",
          nextScene: 'scene-1-1-night',
        },
        {
          label: "Enquêter discrètement",
          description: "Observer le quartier et la trappe sans se faire remarquer.",
          consequence: "Discrétion CD 35. Succès : repérer les entrées et sorties des tunnels. Échec : repéré par les Griffes.",
          nextScene: 'scene-1-1-night',
          skillCheck: { skill: 'Discrétion', dc: 35, success: "Vous observez la place pendant une heure. À la tombée de la nuit, vous voyez une silhouette en robe grise soulever la dalle près du puits et disparaître dessous.", failure: "Un des guetteurs des Griffes vous repère. 'Hé ! On a un fouineur !' L'attention est sur vous." },
        },
      ],
    },
  ],
  loot: [
    "Confiance de Lira (accès à la trappe secrète)",
    "Alliance avec les Griffes (si service rendu)",
    "Médaillon de forgeron de Dorin (donné par Lira, permet l'identification du père)",
  ],
  nextScenes: ['scene-1-1-night', 'scene-1-2-sewers-deep'],
  previousScene: 'scene-1-1-city',
};

const scene_1_1_night: BookScene = {
  id: 'scene-1-1-night',
  sceneNumber: 14,
  title: "Sol-Aureus la Nuit",
  type: 'exploration',
  location: "Sol-Aureus, de nuit",
  locationId: 'sol-aureus',
  estimatedMinutes: 30,
  readAloud: {
    text: `Sol-Aureus se transforme quand le soleil se couche.

Les lanternes magiques des artères principales projettent leur lumière bleutée, transformant les rues familières en corridors d'un autre monde. Les ombres sont plus profondes, plus nettes, et semblent bouger au coin de votre vision.

La foule diurne a cédé la place à une population différente. Des gardes en patrouille, leurs bottes claquant sur les pavés en rythme régulier. Des couples qui marchent bras dessus bras dessous, profitant de la fraîcheur nocturne. Des musiciens de rue qui jouent pour les retardataires et les noctambules. Et, dans les ruelles qui s'éloignent des artères éclairées, des silhouettes qui ne veulent pas être vues.

La ville murmure différemment la nuit. Les bruits du jour s'éteignent, remplacés par le chant des fontaines, le cliquetis lointain de la Garde, et parfois, quand le vent tourne, un bourdonnement grave qui semble monter du sol lui-même.

Vous passez devant un jardin public fermé. Derrière les grilles, les arbres projettent des ombres fantomatiques sur des statues de héros d'un autre âge. L'une des statues a les yeux qui brillent faiblement d'une lueur verte. Vous clignez des yeux. La lueur a disparu.

Plus loin, un chat noir traverse la rue devant vous, un rat mort dans la gueule. Il s'arrête, vous regarde avec des yeux d'ambre, et disparaît dans une ruelle. Dans la ruelle, une porte s'ouvre et se referme.

La nuit de Sol-Aureus est vivante. Et elle vous observe.`,
    mood: "Mystère nocturne, romantisme sombre, danger tapi dans l'ombre",
    music: "Ambiance nocturne médiévale, fontaines, pas lointains, vent dans les ruelles",
  },
  gmNotes: [
    { type: 'info', text: "La nuit offre des opportunités différentes du jour. Les patrouilles de la Garde (6 gardes par escouade) passent toutes les 20 minutes dans les artères principales. Les ruelles secondaires ne sont pas patrouillées." },
    { type: 'tip', text: "Trois rencontres possibles cette nuit : 1) Une patrouille de la Garde avec des rumeurs fraîches. 2) Élise Doigts-d'Argent qui propose un travail. 3) Un agent du Cercle des Cendres en mission secrète. Le MJ choisit ou tire au hasard." },
    { type: 'warning', text: "La nuit, les Ombres sont plus actives. Perception CD 35 : apercevoir une forme sombre se glisser dans un mur. Si les joueurs la suivent, elle les mène vers un accès au réseau souterrain gardé par 2 Ombres Mineures." },
    { type: 'secret', text: "La statue aux yeux verts est un ancien Œil de l'Empire ashkan qui se réactive. Il enregistre ce qui passe devant lui et transmet l'information quelque part sous la ville. Les joueurs peuvent le détruire (HP 20, AC 15) ou l'étudier (Arcanes CD 45 pour comprendre le mécanisme)." },
    { type: 'lore', text: "Sol-Aureus la nuit est le royaume du Syndicat de l'Ombre. Le couvre-feu officiel est à minuit, mais il est rarement appliqué sauf en cas de troubles. Les nobles ont leurs propres gardes et sortent comme ils veulent. Les pauvres restent chez eux." },
  ],
  npcs: [
    {
      name: "Élise Doigts-d'Argent",
      role: "Voleuse / Contact nocturne",
      personality: "Sarcastique, professionnelle, dangereusement compétente. Ne fait confiance qu'à elle-même mais respecte ceux qui prouvent leur valeur.",
      appearance: "Demi-elfe, la trentaine, cheveux noirs coupés court. Apparaît littéralement de nulle part, adossée à un mur comme si elle y était depuis toujours. Sourire de prédateur.",
      secret: "Mission du Syndicat de l'Ombre : surveiller les activités du Cercle des Cendres. Le Syndicat et le Cercle sont rivaux. Le Syndicat a compris que le Cercle représente une menace existentielle.",
      dialogues: {
        greeting: "« Bel le nuit pour une promenade, hein ? Pas très prudent cependant. Sol-Aureus la nuit appartient à ceux qui connaissent ses ombres. Comme moi. »",
        info: "« Le Syndicat s'intéresse à vous. Pas pour de mauvaises raisons, pour une fois. On a un ennemi commun. Ces types en masques de cendre ? Ils font des choses dans cette ville qui dérangent tout le monde, même nous. Et quand les voleurs sont nerveux, c'est que la situation est vraiment mauvaise. »",
        quest: "« Simple proposition : on vous donne des informations sur les mouvements du Cercle des Cendres — horaires de patrouille, entrées de leurs planques, noms de contacts. En échange, vous nous racontez ce que vous trouvez en dessous. On aime savoir ce qui se passe sous nos pieds. Deal ? »",
        farewell: "« On se reverra. Quand vous ne m'attendrez pas. C'est plus amusant comme ça. »",
      },
      stats: { hp: 30, atk: 15, ac: 16 },
    },
    {
      name: "Capitaine de patrouille Sorel",
      role: "Garde de nuit / Source d'informations officielles",
      personality: "Professionnelle, sérieuse, légèrement paranoïaque depuis les disparitions. Fait son travail avec rigueur même quand personne ne regarde.",
      appearance: "Humaine, la trentaine, armure polie, cheveux blonds attachés en chignon serré. Lanterne-épée dans une main, carnet de rapport dans l'autre.",
      dialogues: {
        greeting: "« Halte. Identifiez-vous. ... Ah, les enquêteurs du Capitaine-Général. Vous avez une raison d'être dehors à cette heure ? »",
        info: "« Trois incidents cette semaine dans mon secteur. Des témoins qui décrivent des silhouettes qui 'marchent dans les murs'. Pas à travers — dans. Comme si les murs les absorbaient. Mon sergent dit que c'est l'alcool. Je dis que l'alcool ne laisse pas de traces de cendre au sol. »",
        farewell: "« Soyez prudents. Et si vous voyez quelque chose d'anormal... venez me trouver avant d'agir. J'ai assez de rapports de disparitions sur mon bureau. »",
      },
      stats: { hp: 40, atk: 12, ac: 17 },
    },
  ],
  skillChecks: [
    { skill: 'Perception', dc: 35, success: "Vous apercevez une forme sombre, presque invisible, qui glisse le long d'un mur et disparaît à travers la pierre. Une Ombre. Elle se dirigeait vers le quartier du Temple.", failure: "La nuit est pleine de bruits et de mouvements, mais rien ne sort vraiment de l'ordinaire pour une grande ville." },
    { skill: 'Discrétion', dc: 30, success: "Vous vous glissez dans les ruelles sans attirer l'attention des patrouilles ni des yeux indiscrets. La nuit vous appartient.", failure: "Une patrouille vous repère. 'Vous là ! Couvre-feu dans deux heures. Que faites-vous ici ?'" },
    { skill: 'Arcanes', dc: 45, success: "La statue aux yeux verts est un relais de surveillance ashkan. Il capture des images magiques et les transmet à un récepteur sous la ville. Un artefact ancien qui se réactive avec les Sceaux.", failure: "La statue semble normale. Peut-être un effet de la lumière des lanternes." },
  ],
  choices: [
    {
      id: 'choice-night',
      prompt: "Que font les personnages dans la nuit de Sol-Aureus ?",
      options: [
        {
          label: "Accepter le deal d'Élise",
          description: "Établir un partenariat d'information avec le Syndicat de l'Ombre.",
          consequence: "Accès aux informations du Syndicat sur le Cercle des Cendres. Devoir rendre des comptes au Syndicat. Alliance risquée mais précieuse.",
          nextScene: 'scene-1-1-3',
          reputationChange: [{ faction: 'Syndicat de l\'Ombre', amount: 10 }, { faction: 'Garde Royale', amount: -5 }],
        },
        {
          label: "Suivre l'Ombre",
          description: "Pister la créature d'ombre qui a disparu dans le mur.",
          consequence: "Discrétion CD 35. Mène à un accès souterrain gardé par 2 Ombres Mineures. Combat probable.",
          nextScene: 'scene-1-2-sewers-deep',
          skillCheck: { skill: 'Discrétion', dc: 35, success: "Vous suivez la trace de cendre que l'Ombre laisse sur la pierre. Elle mène à une porte cachée dans un mur de ruelle.", failure: "L'Ombre a disparu. Mais vous trouvez des résidus de cendre sur la pierre du mur. Elle est passée par ici." },
        },
        {
          label: "Patrouiller avec Sorel",
          description: "Accompagner la patrouille de nuit pour observer et collecter des informations.",
          consequence: "Perspective officielle sur les événements. Sorel partage ses notes de patrouille. Possible rencontre avec un témoin des disparitions.",
          nextScene: 'scene-1-1-3',
          reputationChange: [{ faction: 'Garde Royale', amount: 5 }],
        },
        {
          label: "Explorer les jardins la nuit",
          description: "Examiner la statue aux yeux verts et les jardins publics fermés.",
          consequence: "Arcanes CD 45 : comprendre le relais de surveillance ashkan. Investigation CD 35 : trouver d'autres statues-espions dans la ville.",
          nextScene: 'scene-1-1-3',
        },
      ],
    },
  ],
  nextScenes: ['scene-1-1-3', 'scene-1-2-sewers-deep'],
  previousScene: 'scene-1-1-2',
};

// ============================================================================
// CHAPITRE 2 - SOUS LA SURFACE (3 scènes)
// ============================================================================

const scene_1_2_sewers_deep: BookScene = {
  id: 'scene-1-2-sewers-deep',
  sceneNumber: 20,
  title: "Les Égouts Profonds",
  type: 'exploration',
  location: "Égouts profonds, Sol-Aureus",
  locationId: 'sol-aureus-sewers',
  estimatedMinutes: 40,
  readAloud: {
    text: `Les égouts de surface sont désagréables. Les égouts profonds sont un cauchemar.

Vous descendez par un escalier en colimaçon si ancien que les marches sont usées en leur centre par des millénaires de pas. L'air change brutalement : l'odeur d'eaux usées cède la place à une fraîcheur minérale, puis à quelque chose d'indéfinissable, entre la terre mouillée et le métal chaud.

Le premier niveau profond est un réseau hydraulique qui ferait pleurer d'envie n'importe quel ingénieur moderne. Des canaux de pierre noire transportent une eau d'un bleu luminescent, alimentés par des mécanismes de vannes et de roues à engrenages qui fonctionnent encore après des siècles. Certaines roues tournent toutes seules, mues par une force invisible.

Les murs sont couverts de graffitis. Pas des graffitis modernes : des inscriptions ashkanes en alphabet serré, des diagrammes de rituels, des comptages obsessionnels de marques — comme si quelqu'un avait compté les jours. Certaines inscriptions sont des prières. D'autres sont des cris silencieux.

Un carrefour hydraulique s'ouvre devant vous : trois tunnels divergent, chacun marqué d'un symbole différent. À gauche, un crâne stylisé. Au centre, un œil ouvert. À droite, une main tendue. Au milieu du carrefour, un bassin circulaire contient de l'eau lumineuse dans laquelle quelque chose bouge lentement.

Et puis il y a les rats. Ou plutôt, ce qui était autrefois des rats. Les créatures qui grouillent sur les parois du tunnel central sont de la taille de chiens, avec des yeux rouges lumineux et des dents qui brillent d'une lueur malsaine. Elles vous regardent avec une intelligence qui n'a pas sa place dans des yeux de rongeur.`,
    mood: "Horreur archéologique, merveille corrompue, claustrophobie",
    music: "Eau qui coule en écho, engrenages lointains, grattements de griffes, bourdonnement grave",
  },
  gmNotes: [
    { type: 'info', text: "Le réseau hydraulique ashkan alimentait la ville en eau et en énergie magique. Les vannes contrôlent le flux d'eau lumineuse (veinérite liquide diluée). Manipuler les vannes est un puzzle : la bonne combinaison ouvre un passage secret vers le niveau inférieur." },
    { type: 'tip', text: "Le puzzle des vannes : 3 vannes (A, B, C) contrôlent le flux. La séquence correcte est C-A-B (indiquée par les symboles au sol si les joueurs les décryptent avec Arcanes CD 30). Mauvaise séquence = inondation du carrefour (1d6 contondant, jet de sauvegarde Force CD 30)." },
    { type: 'warning', text: "Les rats géants mutants : 1d6+2, HP 18 chacun, ATK 8, AC 12. Ils attaquent en meute. Vulnérables au feu. Si on en tue la moitié, les autres fuient. Le nid contient un objet brillant volé : un médaillon de garde royale (celui du fils de Dorval)." },
    { type: 'secret', text: "Le bassin central contient un élémentaire d'eau corrompu — un ancien gardien devenu fou après des siècles d'isolement. Il peut être apaisé (Persuasion CD 45 en ashkan archaïque ou magie de purification) ou combattu (HP 40, ATK 12, AC 14)." },
    { type: 'lore', text: "Les graffitis sur les murs sont ceux d'esclaves ashkans. Certains sont des prières à des dieux oubliés. D'autres sont des messages codés d'un réseau de résistance qui existait au sein même de l'Hégémonie. Le symbole de la main tendue était leur signe de ralliement." },
  ],
  npcs: [
    {
      name: "L'Écho",
      role: "Élémentaire d'eau corrompu / Gardien ancien",
      personality: "Confus, souffrant, alternant entre rage et supplication. Parle en fragments de phrases ashkanes mêlées de gargouillements.",
      appearance: "Forme humanoïde d'eau bleutée mêlée de traînées noires. Visage à peine esquissé, bouche ouverte en cri perpétuel. Taille variable entre 1 et 3 mètres selon son état émotionnel.",
      secret: "Était autrefois un esprit protecteur lié au réseau hydraulique. La corruption des Sceaux l'a rendu instable. Il possède la mémoire de tout ce qui est passé par ces tunnels depuis 500 ans, y compris les mouvements récents du Cercle des Cendres.",
      dialogues: {
        greeting: "« Qui... TROUBLE... les eaux ?! NON ! Plus de masques de cendre ! Plus de douleur ! Je... je protège. Je... SOUFFRE. Allez-vous-en ou NOYEZ-VOUS ! »",
        info: "« Les masques... descendent... chaque nuit de lune noire. Ils portent... des corps endormis. Pas morts... endormis. Les emmènent... plus bas. Au cercle de l'œil. Le grand cercle. Il pulse comme un cœur malade. Il va... éclater. »",
        quest: "« Purifiez... mes eaux. La noirceur... me consume. Un sort de lumière... dans le bassin. S'il vous plaît. Avant que je ne... disparaisse dans la rage. Si vous m'aidez... je vous montrerai... le chemin qu'ils prennent. »",
        farewell: "« Merci... la clarté revient... pour un temps. Le chemin que vous cherchez... suivez le symbole de l'œil. Mais ne... ne regardez pas dans l'œil trop longtemps. Il regarde en retour. »",
      },
      stats: { hp: 40, atk: 12, ac: 14 },
    },
  ],
  skillChecks: [
    { skill: 'Arcanes', dc: 30, success: "Vous déchiffrez les symboles au sol : ce sont des instructions de maintenance hydraulique. La séquence C-A-B active le système correctement.", failure: "Les symboles sont ashkans, trop érodés pour être lus clairement." },
    { skill: 'Perception', dc: 35, success: "Dans le nid des rats géants, parmi les débris, vous trouvez un médaillon de la Garde Royale. Le nom gravé dessus est celui du fils du Sergent Dorval.", failure: "Le nid est un amas répugnant de déchets et d'os que vous préférez ne pas fouiller." },
    { skill: 'Survie', dc: 30, success: "Les traces au sol montrent un passage régulier de groupes de 4-6 personnes, toujours dans la même direction : vers le symbole de l'œil.", failure: "L'humidité et le flux d'eau brouillent les traces." },
    { skill: 'Religion', dc: 40, success: "Un sort de Lumière sacrée dans le bassin purifierait temporairement l'élémentaire, lui rendant sa raison et ses souvenirs.", failure: "L'élémentaire est clairement corrompu mais vous ne savez pas comment l'aider." },
  ],
  encounter: {
    name: "Le Nid des Profondeurs",
    enemies: [
      { name: "Rat Géant Mutant", hp: 18, atk: 8, ac: 12, cr: 0.5, abilities: ["Morsure Venimeuse (1d6+2 perçant + CD 25 CON ou Empoisonné 1 round)", "Nuée (avantage en attaque si un allié rat est adjacent)"] },
      { name: "Rat Géant Mutant", hp: 18, atk: 8, ac: 12, cr: 0.5, abilities: ["Morsure Venimeuse (1d6+2 perçant + CD 25 CON ou Empoisonné 1 round)", "Nuée (avantage en attaque si un allié rat est adjacent)"] },
      { name: "Rat Géant Mutant", hp: 18, atk: 8, ac: 12, cr: 0.5, abilities: ["Morsure Venimeuse (1d6+2 perçant + CD 25 CON ou Empoisonné 1 round)", "Nuée (avantage en attaque si un allié rat est adjacent)"] },
      { name: "Rat Géant Mutant", hp: 18, atk: 8, ac: 12, cr: 0.5, abilities: ["Morsure Venimeuse (1d6+2 perçant + CD 25 CON ou Empoisonné 1 round)", "Nuée (avantage en attaque si un allié rat est adjacent)"] },
    ],
    terrain: ["Canaux d'eau lumineuse (terrain difficile, 1d4 nécrotique si immersion)", "Engrenages en mouvement (piège potentiel)", "Bassin central (espace dégagé)", "Tunnels étroits (désavantage armes lourdes)"],
    tactics: "Les rats attaquent en meute, ciblant le personnage le plus isolé. Ils utilisent les tunnels étroits pour encercler. Le feu les terrorise et les fait fuir.",
    loot: ["Médaillon de la Garde Royale (fils de Dorval)", "3 fioles de veinérite liquide (25 PO chacune)", "Carte partielle des niveaux profonds (gravée sur une plaque de métal)"],
  },
  choices: [
    {
      id: 'choice-sewers-deep',
      prompt: "Après avoir exploré le carrefour hydraulique, que font les personnages ?",
      options: [
        {
          label: "Purifier l'élémentaire",
          description: "Utiliser la magie de lumière pour aider L'Écho et obtenir ses informations.",
          consequence: "L'élémentaire retrouve sa raison. Il révèle le chemin vers la salle rituelle du Cercle et les horaires de leurs passages.",
          nextScene: 'scene-1-2-2',
          reputationChange: [{ faction: 'Esprits Anciens', amount: 10 }],
        },
        {
          label: "Résoudre le puzzle des vannes",
          description: "Manipuler les vannes pour ouvrir le passage secret.",
          consequence: "Séquence C-A-B. Succès : passage vers le niveau inférieur. Échec : inondation temporaire du carrefour.",
          nextScene: 'scene-1-2-2',
        },
        {
          label: "Suivre les traces vers l'œil",
          description: "Emprunter le tunnel central marqué du symbole de l'œil.",
          consequence: "Mène directement vers les catacombes ashkanes. Route la plus rapide mais la plus dangereuse — patrouille du Cercle possible.",
          nextScene: 'scene-1-3-2',
        },
      ],
    },
  ],
  loot: [
    "Médaillon de la Garde Royale (preuve des disparitions)",
    "Carte partielle des niveaux profonds",
    "6 fioles de veinérite liquide (25 PO chacune, illégales)",
  ],
  nextScenes: ['scene-1-2-2', 'scene-1-3-2'],
  previousScene: 'scene-1-2-1',
  mapMovement: { from: 'sol-aureus-sewers', to: 'sol-aureus-deep' },
};

const scene_1_2_informant: BookScene = {
  id: 'scene-1-2-informant',
  sceneNumber: 21,
  title: "L'Informateur du Syndicat",
  type: 'social',
  location: "Arrière-salle de La Lanterne Brisée, Quartier Bas",
  locationId: 'sol-aureus',
  estimatedMinutes: 25,
  readAloud: {
    text: `La Lanterne Brisée porte bien son nom : l'enseigne est une lanterne de fer tordue dont la vitre est effectivement brisée. La taverne est un trou sombre dans un mur du Quartier Bas, le genre d'endroit où la lumière entre à contrecœur et la clientèle ne pose pas de questions.

Élise Doigts-d'Argent vous attend à une table du fond, dans une arrière-salle séparée par un rideau de perles si vieux que la moitié des perles manquent. Elle n'est pas seule.

À côté d'elle, un homme que vous n'avez jamais vu. Grand, mince, visage anguleux à moitié caché par une capuche. Ses mains gantées de noir reposent à plat sur la table, immobiles, et quelque chose dans son immobilité est profondément dérangeant. C'est l'immobilité d'un prédateur.

« Voici Sifflement, » dit Élise d'un ton léger qui ne correspond pas du tout à l'atmosphère. « C'est un nom de travail. Ne demandez pas le vrai. Il représente les intérêts du Syndicat dans cette affaire. »

Sifflement ne dit rien. Il vous regarde avec des yeux d'une couleur indéterminée, et dans ce silence, vous sentez qu'il pèse chacun de vous. Votre valeur. Votre danger. Votre utilité.

Puis il parle, et sa voix est exactement ce à quoi vous vous attendiez : un murmure contrôlé, sans émotion, chaque mot choisi comme une lame.

« Le Cercle des Cendres fait quelque chose sous cette ville. Quelque chose qui menace nos affaires. Ce qui menace nos affaires nous menace tous. Nous avons des informations. Vous avez du courage. Négocions. »`,
    mood: "Tension feutrée, négociation dans l'ombre, alliances inconfortables",
    music: "Silence tendu, bois qui craque, verre posé sur une table, rien d'autre",
  },
  gmNotes: [
    { type: 'info', text: "Le Syndicat de l'Ombre est le réseau criminel principal de Sol-Aureus. Leur intérêt pour le Cercle est purement pragmatique : le Cercle déstabilise la ville et menace les affaires du Syndicat. 'Sifflement' est un agent de haut rang." },
    { type: 'tip', text: "Sifflement propose un échange : les plans de patrouille du Cercle dans les souterrains + l'emplacement d'une planque. En échange : les joueurs doivent rapporter tout artefact trouvé OU laisser le Syndicat fouiller les lieux après eux. Négociable." },
    { type: 'warning', text: "Attention au double jeu. Sifflement est sincère DANS SES INTÉRÊTS. Si les joueurs deviennent un problème, il n'hésitera pas à les vendre au Cercle ou à la Garde. Ne le mentionnez pas maintenant, mais semez le doute." },
    { type: 'secret', text: "Sifflement possède un médaillon ashkan volé au Cercle. Il ne sait pas ce que c'est mais le porte comme trophée. Le médaillon est en fait une clé pour les portes des catacombes profondes. Il le donnera si les joueurs le remarquent et demandent (Perception CD 40 pour le repérer sous sa chemise)." },
    { type: 'lore', text: "Le Syndicat de l'Ombre existe depuis la chute d'Ashka. Selon la légende, il a été fondé par d'anciens esclaves ashkans qui ont gardé le réseau de contrebande souterrain comme base d'opérations. Le symbole de la main tendue dans les tunnels est à l'origine le leur." },
  ],
  npcs: [
    {
      name: "Sifflement",
      role: "Agent du Syndicat / Négociateur",
      personality: "Froid, calculateur, économe en mots. Chaque phrase est un outil. Ne ment pas — il omet. Ne menace pas — il implique.",
      appearance: "Humain, âge indéterminé (30-50 ?). Grand, mince, visage anguleux. Capuche sombre. Gants noirs. Se déplace sans bruit. Yeux d'une couleur changeante selon la lumière.",
      secret: "Ancien orphelin du Quartier Bas, recruté par le Syndicat à 12 ans. A gravi les échelons par intelligence pure. Possède un réseau d'informateurs dans toutes les factions de Sol-Aureus, y compris la Garde Royale et le clergé.",
      dialogues: {
        greeting: "« Asseyez-vous. Le temps est précieux pour tout le monde. »",
        info: "« Le Cercle opère depuis trois planques en ville. Nous en avons identifié deux. La troisième est dans les souterrains, mobile. Ils déplacent des personnes endormies vers un point central sous le Quartier du Temple. Régulièrement, toutes les trois nuits, entre la deuxième et la quatrième heure du matin. »",
        quest: "« Notre offre : plans de patrouille du Cercle, emplacement de la planque de surface, et un accès au réseau de tunnels que nous contrôlons. En échange : premier accès à tout artefact récupéré. Nous ne voulons pas détruire le monde. Nous voulons qu'il continue de tourner. C'est bon pour les affaires. »",
        farewell: "« Un dernier conseil, gratuit : le Cercle ne dort pas. Si vous les sous-estimez parce qu'ils portent des masques ridicules, vous finirez dans une urne de cendre sous cette ville. Comme les autres. Bonne chasse. »",
      },
      stats: { hp: 55, atk: 18, ac: 17 },
    },
  ],
  skillChecks: [
    { skill: 'Intuition', dc: 40, success: "Sifflement est sincère dans ce qu'il dit. Mais il omet beaucoup. Il ne vous dit pas tout ce qu'il sait, et il ne le fera que si le rapport de force l'y oblige.", failure: "Difficile de lire cet homme. Son visage est un masque de cire." },
    { skill: 'Persuasion', dc: 45, success: "Vous négociez de meilleures conditions : les plans du Cercle + la planque + un guide dans les tunnels du Syndicat. En échange : seulement un rapport oral, pas les artefacts eux-mêmes.", failure: "Sifflement ne bouge pas d'un pouce. 'C'est notre offre. Prenez-la ou partez.'" },
    { skill: 'Perception', dc: 40, success: "Sous la chemise de Sifflement, un médaillon en métal sombre pend à une chaîne. Les gravures sont ashkanes. Un œil ouvert entouré de runes.", failure: "Rien de notable dans l'apparence de Sifflement." },
  ],
  choices: [
    {
      id: 'choice-informant',
      prompt: "Que décident les personnages face à l'offre du Syndicat ?",
      options: [
        {
          label: "Accepter le deal",
          description: "Échanger informations contre accès aux artefacts trouvés.",
          consequence: "Plans de patrouille du Cercle + emplacement de la planque + accès tunnels du Syndicat. Le Syndicat devient un allié ambigu mais utile.",
          nextScene: 'scene-1-3-safehouse',
          reputationChange: [{ faction: 'Syndicat de l\'Ombre', amount: 15 }, { faction: 'Garde Royale', amount: -5 }],
        },
        {
          label: "Négocier de meilleures conditions",
          description: "Tenter de modifier les termes de l'accord.",
          consequence: "Persuasion CD 45. Succès : deal amélioré. Échec : offre de base ou rien.",
          nextScene: 'scene-1-3-safehouse',
          skillCheck: { skill: 'Persuasion', dc: 45, success: "Sifflement incline la tête. 'Vous avez du cran. Accord modifié.' Meilleures conditions obtenues.", failure: "'Notre offre est ferme.' Pas de changement." },
        },
        {
          label: "Refuser et partir",
          description: "Décliner l'alliance avec le Syndicat.",
          consequence: "Sifflement hausse les épaules. 'Dommage.' Les joueurs perdent un accès à des informations précieuses mais restent libres de toute obligation. Le Syndicat les observe de loin.",
          nextScene: 'scene-1-2-2',
          reputationChange: [{ faction: 'Syndicat de l\'Ombre', amount: -5 }],
        },
        {
          label: "Demander le médaillon",
          description: "Si repéré : demander le médaillon ashkan que Sifflement porte.",
          consequence: "Sifflement est surpris qu'on l'ait remarqué. Intimidation CD 40 ou échange contre un service futur. Le médaillon est une clé des catacombes profondes.",
          nextScene: 'scene-1-3-safehouse',
          skillCheck: { skill: 'Intimidation', dc: 40, success: "Sifflement détache le médaillon. 'Vous avez l'œil. Prenez-le. Si c'est important, ça vaut bien un investissement.'", failure: "'Le médaillon n'est pas sur la table. Si vous le voulez, apportez-moi quelque chose d'égale valeur.'" },
        },
      ],
    },
  ],
  nextScenes: ['scene-1-2-2', 'scene-1-3-safehouse'],
  previousScene: 'scene-1-1-night',
};

const scene_1_2_ambush: BookScene = {
  id: 'scene-1-2-ambush',
  sceneNumber: 22,
  title: "Embuscade dans les Ruelles",
  type: 'combat',
  location: "Ruelles du Quartier des Artisans, Sol-Aureus",
  locationId: 'sol-aureus',
  estimatedMinutes: 30,
  readAloud: {
    text: `La ruelle est étroite, bordée de hauts murs de brique et éclairée par une unique lanterne magique qui grésille comme si elle allait mourir. L'air sent le métal chaud et la sciure de bois — vous êtes dans la partie artisanale du quartier, entre les forges éteintes et les ateliers fermés pour la nuit.

C'est le raccourci que Brok vous a recommandé pour éviter la Grand-Rue à cette heure. Rapide, discret, et normalement sûr.

Normalement.

Le premier signe est le silence. Les chats qui traînaient sur les murs ont disparu. La lanterne magique s'éteint avec un pop discret, plongeant la ruelle dans l'obscurité. Puis une voix, venue de nulle part et de partout :

« Vous posez trop de questions, étrangers. Le Cercle vous offre un choix : oubliez ce que vous avez vu, quittez Sol-Aureus avant l'aube, et vivez. Ou restez... et rejoignez ceux qui ont disparu. »

Des silhouettes apparaissent aux deux extrémités de la ruelle. Masques de cendre gris pâle, robes sombres, lames qui ne reflètent pas la lumière. Quatre ? Non, cinq. Et au milieu, un sixième avec un bâton qui pulse d'une lueur verdâtre.

Au-dessus de vous, un cri de femme depuis une fenêtre. « Au secours ! Ils sont dans la ruelle ! » Un rideau se referme brutalement.

Les masques de cendre avancent. Lentement. Méthodiquement. Comme s'ils avaient tout le temps du monde.

Ils ont tort.`,
    mood: "Tension explosive, combat urbain brutal, adrénaline",
    music: "Silence soudain, puis percussions rapides, métal qui chante, cris",
  },
  gmNotes: [
    { type: 'info', text: "Embuscade du Cercle des Cendres. 4 Acolytes + 1 Adepte (mage). Ils ont été envoyés pour intimider les PJ, pas les tuer (au départ). Si les PJ résistent, les ordres changent." },
    { type: 'tip', text: "Combat en espace confiné : la ruelle fait 3 mètres de large. Maximum 2 combattants de front. Les joueurs peuvent utiliser les murs (escalade, Athlétisme CD 30), les enseignes (couverture), et les portes d'atelier (enfoncable, Force CD 25, pour s'échapper ou flanquer)." },
    { type: 'warning', text: "Des civils sont présents aux fenêtres. Les sorts de zone risquent de toucher les bâtiments. Si un civil est blessé, conséquences de réputation graves." },
    { type: 'secret', text: "L'Adepte porte un parchemin scellé avec les ordres du Cercle. Il mentionne un 'rassemblement au Cercle de l'Œil dans trois nuits' et la nécessité de 'sept offrandes supplémentaires pour compléter le rituel'. Preuve cruciale." },
    { type: 'lore', text: "Les masques de cendre sont fabriqués avec de la cendre d'os mélangée à de la veinérite broyée. Ils permettent de voir dans le noir et confèrent une résistance aux sorts de charme. Le Cercle les considère comme sacrés." },
  ],
  npcs: [
    {
      name: "L'Adepte Kor",
      role: "Mage du Cercle des Cendres / Chef de l'embuscade",
      personality: "Fanatique calme, convaincu de la justesse de sa cause. Voit les PJ comme des obstacles à la 'renaissance' qu'il prépare.",
      appearance: "Silhouette mince, masque de cendre lisse sans trait distinctif. Robe noire aux coutures argentées. Bâton de bois noir couronné d'un cristal verdâtre qui pulse au rythme de son cœur.",
      secret: "Kor est un ancien apprenti de la Guilde des Arcanes, renvoyé pour avoir étudié la nécromancie ashkane. Recruté par le Cercle il y a un an. Convaincu que les Anciens méritent d'être libérés.",
      dialogues: {
        greeting: "« La cendre est le début et la fin de toute chose. Vous pouvez encore choisir la paix de la cendre. »",
        info: "« Vous ne comprenez pas ce qui se réveille. Nous ne sommes pas vos ennemis. Nous sommes les serviteurs de l'inévitable. Les Sceaux tomberont. La question est : serez-vous du côté des cendres... ou sous elles ? »",
        quest: "« Vous voulez comprendre ? Venez au Cercle de l'Œil. Pas comme ennemis — comme témoins. Voyez la vérité de vos propres yeux. Ensuite, choisissez. »",
        farewell: "« Que vos cendres soient légères. » [Dit avant de se dissoudre en poussière grise si réduit à 0 HP — les Adeptes portent un sort de désintégration automatique pour ne pas être identifiés.]",
      },
      stats: { hp: 35, atk: 14, ac: 14 },
    },
  ],
  skillChecks: [
    { skill: 'Initiative', dc: 0, success: "Vous réagissez avant les assaillants.", failure: "Les masques de cendre agissent en premier." },
    { skill: 'Perception', dc: 30, success: "Vous repérez une porte d'atelier mal fermée sur votre droite. Issue de secours ou position de flanc possible.", failure: "La ruelle semble être un piège sans issue." },
    { skill: 'Athlétisme', dc: 30, success: "Vous escaladez le mur et accédez aux toits, gagnant un avantage tactique décisif.", failure: "Le mur est glissant. Vous retombez dans la ruelle." },
  ],
  encounter: {
    name: "L'Embuscade du Cercle des Cendres",
    enemies: [
      { name: "Acolyte du Cercle", hp: 22, atk: 10, ac: 13, cr: 1, abilities: ["Lame de Cendre (1d8+3 tranchant)", "Masque de Cendre (vision dans le noir, résistance charme)"] },
      { name: "Acolyte du Cercle", hp: 22, atk: 10, ac: 13, cr: 1, abilities: ["Lame de Cendre (1d8+3 tranchant)", "Masque de Cendre (vision dans le noir, résistance charme)"] },
      { name: "Acolyte du Cercle", hp: 22, atk: 10, ac: 13, cr: 1, abilities: ["Lame de Cendre (1d8+3 tranchant)", "Masque de Cendre (vision dans le noir, résistance charme)"] },
      { name: "Acolyte du Cercle", hp: 22, atk: 10, ac: 13, cr: 1, abilities: ["Lame de Cendre (1d8+3 tranchant)", "Masque de Cendre (vision dans le noir, résistance charme)"] },
      { name: "Adepte Kor", hp: 35, atk: 14, ac: 14, cr: 3, abilities: ["Rayon de Cendre (3d6 nécrotique, portée 18m)", "Bouclier de Cendre (réaction, +3 AC)", "Mot de Terreur (CD 40 Sagesse ou Effrayé 1 round, une cible)", "Désintégration posthume (se désintègre à 0 HP)"] },
    ],
    terrain: ["Ruelle étroite (3m de large, 2 de front max)", "Enseignes en fer forgé (couverture 1/2)", "Portes d'ateliers (enfoncables, Force CD 25)", "Lanterne éteinte (obscurité totale sans source lumineuse)", "Fenêtres aux étages (civils présents, attention aux sorts de zone)"],
    tactics: "Les Acolytes forment deux groupes aux extrémités de la ruelle, bloquant la fuite. Kor reste en arrière et lance ses sorts. Si deux Acolytes tombent, Kor tente de fuir via un passage secret (Perception CD 35 pour le suivre). Si capturé vivant (très difficile), il ne parle pas mais le parchemin sur lui est une mine d'or.",
    loot: ["4 Masques de Cendre (50 PO chacun, interdits par la Guilde)", "Parchemin scellé (ordres du Cercle, preuve cruciale)", "Bâton de Cendre (focus nécrotique, 200 PO, utilisable par un mage sombre)", "Bourse commune : 80 PO"],
  },
  choices: [
    {
      id: 'choice-ambush-aftermath',
      prompt: "Après le combat, que font les personnages ?",
      options: [
        {
          label: "Fouiller les corps et lire le parchemin",
          description: "Examiner les preuves récupérées sur les agents du Cercle.",
          consequence: "Le parchemin révèle le lieu du prochain rassemblement et le besoin de 'sept offrandes'. Preuve cruciale pour Marcus ou le Syndicat.",
          nextScene: 'scene-1-2-3',
        },
        {
          label: "Poursuivre Kor s'il a fui",
          description: "Traquer l'Adepte en fuite à travers les ruelles.",
          consequence: "Discrétion CD 35 pour le suivre sans le perdre. Il mène à une entrée des tunnels souterrains du Cercle.",
          nextScene: 'scene-1-3-safehouse',
          skillCheck: { skill: 'Discrétion', dc: 35, success: "Vous filez Kor à travers un dédale de ruelles. Il entre dans une cave abandonnée et disparaît par une trappe. Vous avez trouvé une entrée.", failure: "Kor se volatilise dans la nuit. Mais vous avez le parchemin, c'est l'essentiel." },
        },
        {
          label: "Alerter la Garde",
          description: "Prévenir le Capitaine Sorel ou le Palais du combat.",
          consequence: "La Garde arrive et sécurise la zone. Marcus est impressionné par les preuves. Renforcement de l'alliance officielle.",
          nextScene: 'scene-1-2-3',
          reputationChange: [{ faction: 'Garde Royale', amount: 10 }],
        },
        {
          label: "Aider les civils et disparaître",
          description: "Vérifier que les civils vont bien puis quitter les lieux discrètement.",
          consequence: "Les habitants du quartier vous sont reconnaissants. Rumeurs positives sur le groupe. Pas de rapport officiel.",
          nextScene: 'scene-1-1-2',
          reputationChange: [{ faction: 'Peuple de Sol-Aureus', amount: 10 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-1-2-3', 'scene-1-3-safehouse', 'scene-1-1-2'],
  previousScene: 'scene-1-2-1',
};

// ============================================================================
// CHAPITRE 3 - LES OMBRES DE SOL-AUREUS (3 scènes)
// ============================================================================

const scene_1_3_investigation: BookScene = {
  id: 'scene-1-3-investigation',
  sceneNumber: 30,
  title: "Enquête au Port",
  type: 'exploration',
  location: "Port Fluvial de Sol-Aureus",
  locationId: 'sol-aureus',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le port fluvial de Sol-Aureus s'étend le long du fleuve Doreval, un ruban d'eau brune et paresseuse qui traverse la ville d'est en ouest. Des dizaines de quais en bois s'avancent dans l'eau comme des doigts tendus, accueillant des barges marchandes, des barques de pêcheurs et, à l'occasion, un vaisseau de la flotte royale.

L'activité portuaire est un ballet organisé de dockers, de marchands et de douaniers. Des grues de bois et de métal déchargent des caisses marquées de blasons de toutes les régions d'Aethelgard. L'air sent la vase, le goudron chaud, et le poisson fumé.

Vous êtes ici parce qu'un détail vous a échappé : les disparitions ne concernent pas uniquement le Quartier Bas. Deux marins et un douanier ont disparu au port le mois dernier. Les rapports de la Garde mentionnent « désertions probables ». Mais vous commencez à reconnaître ce mot pour ce qu'il est : un euphémisme pour « nous ne savons pas ce qui s'est passé ».

Le bureau du Maître du Port, une cabane de bois perchée sur pilotis au-dessus de l'eau, est fermé à cette heure. Mais les dockers travaillent encore, et les tavernes portuaires ne ferment jamais.

Sur le quai numéro sept, un bateau est amarré depuis trois semaines sans que personne ne l'ait réclamé. Son nom, peint en lettres rouges écaillées sur la coque, est « Le Regard Éternel ». Sur le pont, rien ne bouge.`,
    mood: "Enquête méthodique, atmosphère portuaire vivante, mystère croissant",
    music: "Clapotis de l'eau, grincements de bois, mouettes, cris de dockers lointains",
  },
  gmNotes: [
    { type: 'info', text: "Le port est la plaque tournante logistique du Cercle des Cendres. Des artefacts ashkans arrivent par voie fluviale, cachés dans des cargaisons ordinaires. Le bateau abandonné 'Le Regard Éternel' appartenait à un contrebandier du Cercle." },
    { type: 'tip', text: "L'enquête peut suivre trois pistes : 1) Interroger les dockers (Persuasion CD 30). 2) Explorer le bateau abandonné (Investigation CD 35). 3) Examiner les registres du Maître du Port (Crochetage CD 35 pour le bureau, puis Investigation CD 30)." },
    { type: 'warning', text: "Le bateau est piégé. Une rune de garde sur la porte de la cabine (Perception CD 35 pour repérer, CD 40 en Arcanes pour désarmer). Si déclenchée : 2d8 dégâts de feu et alerte au Cercle." },
    { type: 'secret', text: "Dans la cabine du capitaine du Regard Éternel : un manifeste chiffré listant des 'livraisons' de personnes. Noms, âges, compétences magiques. Preuve que le Cercle cible spécifiquement des individus avec un potentiel arcanique latent. Le douanier disparu avait du sang de sorcier." },
    { type: 'lore', text: "Le port de Sol-Aureus est construit sur les anciennes docks ashkanes. Sous les pilotis, des passages mènent à un réseau de grottes fluviales que l'Hégémonie utilisait pour le transport discret de prisonniers et de matériel de guerre." },
  ],
  npcs: [
    {
      name: "Gull le Docker",
      role: "Docker vétéran / Témoin",
      personality: "Méfiant, lacunaire, mais honnête. Travaille au port depuis 30 ans. A vu trop de choses suspectes pour ignorer les questions plus longtemps.",
      appearance: "Humain, la cinquantaine, épaules larges, mains calleuses comme du cuir. Visage buriné par le soleil et le vent. Pipe éternellement éteinte entre les dents.",
      secret: "A vu des caisses marquées du symbole de l'œil déchargées du Regard Éternel la nuit. Trois hommes en robes sombres les ont emportées sous les quais. Il n'en a parlé à personne parce que 'ce qui se passe sous les quais reste sous les quais'.",
      dialogues: {
        greeting: "« Vous êtes pas des dockers. Ni des marchands. Ni de la Garde, sinon vous seriez venus à dix. Qui vous êtes et qu'est-ce que vous voulez ? »",
        info: "« Le Regard Éternel ? Arrivé y'a trois semaines. L'équipage est descendu un soir et jamais remonté. Enfin, le capitaine est remonté une fois, la nuit. Avec des types en robes. Ils ont déchargé des caisses — pas sur le quai. Sous le quai. Y'a des tunnels là-dessous. On en parle pas. »",
        quest: "« Écoutez, j'vais pas aller fouiner là-dessous. J'ai trois gosses à nourrir. Mais si vous y allez, faites attention aux pilotis du quai douze. Ils bougent tout seuls la nuit. Et pas à cause des vagues. »",
        farewell: "« Vous m'avez jamais vu. J'ai jamais rien dit. C'est compris ? »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Investigation', dc: 35, success: "Sur le bateau, vous trouvez le manifeste chiffré dans un double fond du bureau du capitaine. Les noms, les dates, les compétences magiques. C'est une liste de cibles.", failure: "Le bateau semble avoir été nettoyé méticuleusement. Rien d'utile en apparence." },
    { skill: 'Perception', dc: 35, success: "Sur la porte de la cabine, une rune quasi invisible brille faiblement. Un piège magique. Ne touchez pas cette porte sans la désamorcer.", failure: "Vous ouvrez la porte. BOOM. 2d8 dégâts de feu. Et quelque part dans la ville, quelqu'un sait que vous êtes là." },
    { skill: 'Persuasion', dc: 30, success: "Gull crache sa pipe et parle. L'histoire des caisses, des tunnels sous les quais, tout sort.", failure: "Gull vous regarde fixement. 'J'ai rien vu. Bonne journée.' Il tourne les talons." },
    { skill: 'Discrétion', dc: 30, success: "Vous explorez le dessous des quais sans être vus. Des traces fraîches dans la vase mènent à une ouverture dans la berge.", failure: "Un docker vous repère. 'Hé ! Qu'est-ce que vous faites là-dessous !' L'attention est sur vous." },
  ],
  choices: [
    {
      id: 'choice-port',
      prompt: "Que font les personnages au port ?",
      options: [
        {
          label: "Explorer le Regard Éternel",
          description: "Monter à bord du bateau abandonné et fouiller.",
          consequence: "Manifeste chiffré trouvé (Investigation CD 35). Attention au piège. Preuve cruciale des opérations du Cercle.",
          nextScene: 'scene-1-3-3',
        },
        {
          label: "Explorer les tunnels sous les quais",
          description: "Descendre sous les pilotis et suivre les traces.",
          consequence: "Accès à un réseau de grottes fluviales menant aux souterrains ashkans. Raccourci vers les catacombes.",
          nextScene: 'scene-1-3-2',
        },
        {
          label: "Filature nocturne",
          description: "Surveiller le port de nuit pour observer les mouvements du Cercle.",
          consequence: "Après 1d4 heures d'attente : un petit bateau accoste au quai 12. Deux agents du Cercle déchargent une caisse et disparaissent sous les pilotis.",
          nextScene: 'scene-1-3-safehouse',
        },
        {
          label: "Consulter les registres du port",
          description: "S'introduire dans le bureau du Maître du Port pour examiner les manifestes.",
          consequence: "Crochetage CD 35. Les registres montrent que le Regard Éternel est enregistré sous un faux nom commercial. Le vrai propriétaire : un noble de Sol-Aureus.",
          nextScene: 'scene-1-3-gala-aftermath',
          skillCheck: { skill: 'Crochetage', dc: 35, success: "La serrure cède. Les registres révèlent le nom du propriétaire : Lord Valaric de Haute-Cour. Un noble influent.", failure: "La serrure résiste. Vous pourriez forcer la porte, mais ce serait bruyant." },
        },
      ],
    },
  ],
  loot: [
    "Manifeste chiffré du Regard Éternel (preuve des opérations du Cercle)",
    "Dague sacrificielle ashkane (trouvée sur le bateau, 75 PO)",
    "Carte des tunnels sous-portuaires (grossière mais utilisable)",
  ],
  nextScenes: ['scene-1-3-2', 'scene-1-3-3', 'scene-1-3-safehouse', 'scene-1-3-gala-aftermath'],
  previousScene: 'scene-1-3-1',
};

const scene_1_3_gala_aftermath: BookScene = {
  id: 'scene-1-3-gala-aftermath',
  sceneNumber: 31,
  title: "Lendemain du Gala",
  type: 'social',
  location: "Quartier Noble, Sol-Aureus",
  locationId: 'sol-aureus',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le Quartier Noble de Sol-Aureus au lendemain d'un gala ressemble à un champ de bataille élégant.

Des serviteurs en livrée ramassent des verres abandonnés dans les jardins. Des guirlandes de lumières magiques pendent encore entre les lampadaires, leur éclat mourant dans la lumière du matin. L'odeur de parfum coûteux et de vin renversé flotte dans l'air comme un fantôme de la fête.

Le gala de Lady Morvane — la soirée annuelle la plus courue de Sol-Aureus — a eu lieu cette nuit. Tout le monde qui compte y était : nobles, marchands fortunés, officiers de la Garde, mages de la Tour, et même quelques diplomates étrangers.

Mais ce matin, les conversations ne portent pas sur les robes ou les danses. Elles portent sur le scandale.

Lord Valaric de Haute-Cour, l'un des nobles les plus influents de la ville, a quitté le gala précipitamment après une altercation avec le Capitaine-Général Marcus. Des mots ont été échangés. Valaric a été vu pâlir, puis partir sans un mot à son hôtesse.

Et ce matin, sa résidence est fermée. Volets clos, gardes doublés, aucun visiteur accepté.

Vous êtes dans un salon de thé du quartier, où les nobles viennent dissoudre leurs excès dans du thé de menthe et des commérages. Et les commérages, ce matin, sont juteux.

Une comtesse dont le maquillage ne cache pas tout à fait les cernes de la nuit se penche vers sa voisine : « Valaric est fini. Marcus lui a dit en face qu'il avait des preuves. Des preuves de quoi, ma chère ? Personne ne le sait. Mais Valaric est devenu blanc comme un linge. »`,
    mood: "Intrigues de cour, commérages dangereux, politique urbaine",
    music: "Musique de salon douce, tintements de porcelaine, murmures",
  },
  gmNotes: [
    { type: 'info', text: "Lord Valaric est un noble de haut rang secrètement affilié au Cercle des Cendres. Il finance leurs opérations et utilise ses contacts pour protéger le Cercle des enquêtes officielles. Marcus l'a confronté au gala avec des preuves partielles." },
    { type: 'tip', text: "Les joueurs peuvent collecter des informations via les commérages (Persuasion CD 25, tout le monde veut parler), enquêter sur Valaric (Investigation CD 35), ou tenter d'approcher sa résidence (Discrétion CD 40)." },
    { type: 'warning', text: "Valaric est dangereux. Il a des gardes privés (4 vétérans, HP 40, ATK 14, AC 16) et des contacts au Cercle. S'il apprend que les PJ enquêtent sur lui, il enverra des assassins." },
    { type: 'secret', text: "Dans le bureau de Valaric (accès très difficile) : un coffre contenant de la correspondance avec le Cercle, des plans du réseau de tunnels sous Sol-Aureus, et un artefact ashkan — un cristal de communication qui permet de parler directement avec le chef du Cercle." },
    { type: 'lore', text: "Les familles nobles de Sol-Aureus descendent en partie de collaborateurs de l'Hégémonie d'Ashka. La plupart ont renié cet héritage. Quelques-unes, comme les Haute-Cour, l'ont secrètement préservé, transmettant connaissances et artefacts de génération en génération." },
  ],
  npcs: [
    {
      name: "Comtesse Adélaïde de Rivesang",
      role: "Noble comméreuse / Source involontaire d'informations",
      personality: "Superficielle en apparence, remarquablement observatrice en réalité. Utilise les commérages comme arme politique. Aime être au centre de l'attention.",
      appearance: "Humaine, la quarantaine élégante. Robe de soie bleue, bijoux discrets mais coûteux. Maquillage impeccable malgré la nuit blanche. Éventail perpétuellement en mouvement.",
      secret: "Sait que Valaric est impliqué dans quelque chose de sombre mais ne sait pas quoi exactement. Le soupçonne depuis que sa servante Maren a disparu. N'en parle pas publiquement par peur des représailles.",
      dialogues: {
        greeting: "« Oh, des visages que je ne connais pas ! Comment rafraîchissant. Asseyez-vous, asseyez-vous. Le thé est divin et les nouvelles sont encore meilleures. Vous avez entendu parler du scandale Valaric ? »",
        info: "« Lord Valaric de Haute-Cour. Riche, influent, et jusqu'à hier soir, intouchable. Mais Marcus l'a coincé au gala. Personne n'a entendu les mots exacts, mais le visage de Valaric parlait pour lui. Blême. Comme s'il avait vu un fantôme. Ou comme si un fantôme l'avait vu. »",
        quest: "« Entre nous... sa servante Maren a disparu il y a deux semaines. 'Renvoyée', selon Valaric. Mais j'ai vu Maren ce matin même, dans le Quartier Bas, l'air terrifié. Si quelqu'un pouvait la trouver et lui demander ce qu'elle sait... je paierais généreusement pour cette information. »",
        farewell: "« Vous n'avez rien appris de moi. Je ne suis qu'une vieille comtesse qui boit du thé et qui ne sait rien de rien. N'est-ce pas ? »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Persuasion', dc: 25, success: "Les nobles parlent librement. Valaric a des ennemis politiques qui sont ravis de le descendre. Vous collectez une douzaine de rumeurs, dont certaines sont utiles.", failure: "Les nobles vous regardent avec suspicion. 'Qui êtes-vous, déjà ?'" },
    { skill: 'Investigation', dc: 35, success: "En recoupant les informations : Valaric est le propriétaire du Regard Éternel (via une société écran), il a acheté des terrains au-dessus de tunnels ashkans connus, et il a fait de généreux dons au clergé (pour acheter le silence de Valerius ?).", failure: "Les informations sont contradictoires. Difficile de distinguer les faits des rumeurs." },
    { skill: 'Discrétion', dc: 40, success: "Vous approchez la résidence Valaric par les jardins. Les gardes patrouillent, mais il y a une fenêtre entrouverte au premier étage.", failure: "Les gardes vous repèrent à cinquante mètres. 'Circulez. La résidence n'accepte pas de visiteurs.'" },
  ],
  choices: [
    {
      id: 'choice-gala',
      prompt: "Comment les personnages exploitent-ils la situation post-gala ?",
      options: [
        {
          label: "Enquêter sur Valaric via les nobles",
          description: "Utiliser les commérages et les rivalités nobles pour obtenir des informations.",
          consequence: "Preuve circonstancielle reliant Valaric au Cercle. Suffisant pour convaincre Marcus d'émettre un mandat de perquisition.",
          nextScene: 'scene-1-3-4',
          reputationChange: [{ faction: 'Noblesse de Sol-Aureus', amount: 5 }],
        },
        {
          label: "Infiltrer la résidence Valaric",
          description: "S'introduire discrètement dans la résidence fermée.",
          consequence: "Discrétion CD 40. Succès : accès au bureau, preuves directes, artefact de communication. Échec : combat avec les gardes et fuite.",
          nextScene: 'scene-1-3-4',
          skillCheck: { skill: 'Discrétion', dc: 40, success: "Vous entrez par la fenêtre du premier étage. Le bureau de Valaric est au fond du couloir. Serrure CD 35.", failure: "Un garde tourne au mauvais moment. 'Intrus ! Aux armes !' Vous avez 2 rounds pour fuir ou combattre." },
        },
        {
          label: "Rapporter à Marcus",
          description: "Informer le Capitaine-Général de ce que vous savez sur Valaric.",
          consequence: "Marcus est ravi. Il confirme ses soupçons. Un mandat sera émis mais prendra 2 jours (bureaucratie). Les joueurs peuvent agir avant.",
          nextScene: 'scene-1-3-3',
          reputationChange: [{ faction: 'Garde Royale', amount: 10 }],
        },
        {
          label: "Retrouver Maren via la Comtesse",
          description: "Utiliser la piste de la Comtesse pour retrouver Maren et la faire témoigner.",
          consequence: "Maren confirme l'implication de Valaric. Témoignage direct + marque de cendre comme preuve. Alliance avec la Comtesse.",
          nextScene: 'scene-1-1-lowquarter',
          reputationChange: [{ faction: 'Peuple de Sol-Aureus', amount: 5 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-1-3-3', 'scene-1-3-4', 'scene-1-1-lowquarter'],
  previousScene: 'scene-1-3-1',
};

const scene_1_3_safehouse: BookScene = {
  id: 'scene-1-3-safehouse',
  sceneNumber: 32,
  title: "Planque du Cercle des Cendres",
  type: 'exploration',
  location: "Entrepôt abandonné, Quartier des Docks",
  locationId: 'sol-aureus',
  estimatedMinutes: 35,
  readAloud: {
    text: `L'entrepôt ressemble à des dizaines d'autres le long des quais : murs de brique sale, toit en tôle rouillée, portes de chargement cadenassées. Un panneau à moitié arraché annonce « Importations Solmare — Fermé pour rénovation ». La rénovation date d'au moins cinq ans à en juger par l'état du bâtiment.

Mais derrière cette façade d'abandon, des signes trahissent une activité récente. Les cadenas sont neufs malgré la rouille artificielle. Les fenêtres sont opaques de l'intérieur. Et une odeur subtile filtre sous la porte — encens, cire de bougie noire, et cette senteur de cendre que vous commencez à reconnaître comme la signature du Cercle.

Vous trouvez un accès par le toit : une trappe de ventilation assez large pour s'y glisser. En dessous, l'entrepôt n'est pas ce qu'il semble être.

L'intérieur a été transformé. Les caisses ordinaires sont poussées contre les murs, créant un espace central où un cercle de runes a été peint au sol avec quelque chose de sombre et épais. Des bougies noires, éteintes, marquent les points cardinaux. Des étagères métalliques alignent des dizaines de bocaux contenant une poudre grise — cendre d'os, réalisez-vous avec un frisson.

Au fond, un bureau improvisé supporte des piles de documents, une carte de Sol-Aureus couverte d'annotations, et un cristal noir de la taille d'un poing posé sur un socle en métal.

Et puis vous voyez le piège.

Trois fils métalliques, tendus à hauteur de cheville, relient les étagères à un mécanisme au plafond. Au-dessus de vos têtes, un ballon de verre rempli d'un liquide vert est suspendu au mécanisme. Si le liquide se brise et tombe sur les runes au sol...`,
    mood: "Infiltration tendue, découvertes macabres, danger imminent",
    music: "Silence absolu, battement de cœur, craquement de bois",
  },
  gmNotes: [
    { type: 'info', text: "C'est une planque opérationnelle du Cercle. Pas un lieu de rituel (trop petit) mais un centre logistique : stockage d'artefacts, briefing des agents, communications. Le cristal noir est un relais de communication avec le chef du Cercle." },
    { type: 'tip', text: "Le piège (veinérite liquide + runes = explosion nécrotique 4d8 dans 6m) est détectable Perception CD 30 et désarmable Crochetage/Dextérité CD 35. Si déclenché, détruit la plupart des preuves et attire l'attention." },
    { type: 'warning', text: "La planque n'est pas vide. Un gardien dort à l'arrière : Sable, un cultiste de rang intermédiaire. Si réveillé, il tente d'activer le piège puis de fuir. HP 30, ATK 10, AC 13." },
    { type: 'secret', text: "Les documents incluent : une liste de cibles (personnes à enlever), un calendrier de rituels, une carte montrant l'emplacement de TOUS les accès aux tunnels sous Sol-Aureus, et une lettre codée du 'Maître de Cendres' mentionnant l'ouverture du 'Grand Œil' pour la prochaine lune noire." },
    { type: 'lore', text: "Le cristal de communication est un artefact ashkan rare appelé 'Œil de Dialogue'. Il permet une conversation à distance entre deux cristaux appairés. Celui-ci est jumelé avec un cristal dans les profondeurs des catacombes. L'utiliser sans le détruire permettrait de piéger le chef du Cercle." },
  ],
  npcs: [
    {
      name: "Sable",
      role: "Gardien de la planque / Cultiste de rang moyen",
      personality: "Nerveux, plus suiveur que leader. A rejoint le Cercle par peur plutôt que par conviction. Peut être retourné si intimidé correctement.",
      appearance: "Humain, la trentaine, maigre, traits tirés. Pas de masque de cendre (seulement les agents de terrain en portent). Robe grise ordinaire. Mains qui tremblent.",
      secret: "N'a jamais tué personne et ne veut pas le faire. A rejoint le Cercle parce que son frère est un Adepte qui l'a menacé. Possède des informations sur la hiérarchie du Cercle : le 'Maître de Cendres' est quelqu'un de puissant dans la ville, pas un étranger.",
      dialogues: {
        greeting: "« Qui— Comment êtes-vous entrés ?! Ne bougez pas ! Je vais— le piège— je... » [Il hésite entre activer le piège et lever les mains en l'air.]",
        info: "« Je ne sais pas grand-chose ! Je garde l'endroit, c'est tout ! Le Maître ne nous dit rien aux petits. Je sais juste que le grand rituel approche. Lune noire. Sous le Temple. Et qu'il faut encore sept... offrandes. Mon frère dit que ce qui va se réveiller changera tout. Moi, ça me terrifie. »",
        quest: "« Si vous me protégez... de mon frère, du Cercle... je vous dis tout ce que je sais. Chaque nom, chaque planque, chaque horaire. Je veux sortir de ce cauchemar. S'il vous plaît. »",
        farewell: "« Emmenez-moi loin d'ici. N'importe où. Mais vite, avant que quelqu'un ne vienne vérifier pourquoi le cristal ne répond plus. »",
      },
      stats: { hp: 30, atk: 10, ac: 13 },
    },
  ],
  skillChecks: [
    { skill: 'Perception', dc: 30, success: "Vous repérez les trois fils métalliques tendus à hauteur de cheville. Piège identifié avant de le déclencher.", failure: "Vous marchez sur un fil. Un clic mécanique résonne dans le silence. Vous avez 1 round pour réagir avant que le ballon ne tombe." },
    { skill: 'Crochetage', dc: 35, success: "Vous désarmez le piège avec précision. Le mécanisme se détend en silence. La planque est à vous.", failure: "Le fil se tend davantage. Un deuxième clic. Le ballon commence à descendre lentement. Vous avez un dernier essai." },
    { skill: 'Intimidation', dc: 30, success: "Sable se liquéfie. Il lève les mains et déballe tout : noms, planques, horaires. Il est à vous.", failure: "Sable est terrorisé mais plus du Cercle que de vous. 'Si je parle, ils me tueront. Si je me tais, vous me frapperez. Au moins vous, vous frapperez vite.'" },
    { skill: 'Investigation', dc: 30, success: "Parmi les documents : la carte complète des tunnels, le calendrier des rituels, et la lettre codée. Une mine d'informations.", failure: "Les documents sont nombreux et désorganisés. Vous prenez tout en vrac — il faudra du temps pour trier." },
  ],
  choices: [
    {
      id: 'choice-safehouse',
      prompt: "Que font les personnages dans la planque du Cercle ?",
      options: [
        {
          label: "Retourner Sable",
          description: "Protéger le gardien en échange de ses informations complètes.",
          consequence: "Sable devient un informateur. Il connaît 3 autres planques, les horaires de patrouille souterraine, et les noms de 5 agents.",
          nextScene: 'scene-1-3-4',
          reputationChange: [{ faction: 'Cercle des Cendres', amount: -10 }],
        },
        {
          label: "Utiliser le cristal de communication",
          description: "Activer le cristal pour piéger ou espionner le chef du Cercle.",
          consequence: "Arcanes CD 40 pour l'activer sans se trahir. Succès : entendent une voix qui donne des ordres pour le rituel. Échec : le chef détecte l'intrusion.",
          nextScene: 'scene-1-3-4',
          skillCheck: { skill: 'Arcanes', dc: 40, success: "Le cristal s'active. Une voix grave, déformée : 'Le Grand Œil s'ouvrira dans sept nuits. Assurez-vous que les offrandes sont en place.' Vous coupez avant d'être détectés.", failure: "Le cristal crépite. 'Qui est là ? ... Sable ? Ce n'est pas Sable.' Le cristal explose en fragments de verre noir. Ils savent que la planque est compromise." },
        },
        {
          label: "Tout prendre et partir",
          description: "Récupérer tous les documents et artefacts, puis incendier la planque.",
          consequence: "Preuves massives récupérées. Le Cercle perd une base logistique. Mais ils sauront que quelqu'un les traque.",
          nextScene: 'scene-1-3-3',
        },
        {
          label: "Tendre un piège au Cercle",
          description: "Laisser la planque intacte et organiser une embuscade pour le prochain agent qui viendra.",
          consequence: "Attente de 1d6 heures. Un agent de niveau intermédiaire arrive. Possibilité de capture et interrogatoire.",
          nextScene: 'scene-1-3-4',
        },
      ],
    },
  ],
  loot: [
    "Carte complète des tunnels sous Sol-Aureus",
    "Calendrier des rituels du Cercle (prochaine lune noire dans 7 jours)",
    "Cristal de communication ashkan (intact ou détruit selon les actions)",
    "5 fioles de cendre d'os (composant rituel, 20 PO chacune)",
    "Lettre codée du Maître de Cendres",
  ],
  nextScenes: ['scene-1-3-3', 'scene-1-3-4'],
  previousScene: 'scene-1-2-informant',
};

// ============================================================================
// CHAPITRE 4 - LE PREMIER SCEAU (4 scènes)
// ============================================================================

const scene_1_4_road_camp: BookScene = {
  id: 'scene-1-4-road-camp',
  sceneNumber: 40,
  title: "Campement sur la Route du Sceau",
  type: 'rest',
  location: "Route de Sol-Aureus aux Collines Anciennes",
  locationId: 'val-dore-road',
  estimatedMinutes: 25,
  readAloud: {
    text: `La route de Sol-Aureus s'éloigne dans le crépuscule. Derrière vous, les tours de la capitale ne sont plus que des silhouettes dorées contre un ciel virant au pourpre. Devant, les Collines Anciennes se profilent, rondes et boisées, comme des géants endormis sous des couvertures de verdure.

Vous avez marché toute la journée. Le sol de la route est passé de pavés bien entretenus à de la terre battue, puis à un simple sentier entre les herbes hautes. La civilisation s'efface avec chaque pas.

Un bon endroit pour camper se présente : un creux entre deux collines, protégé du vent, avec un ruisseau clair qui murmure entre les pierres. Un cercle de pierres noircies témoigne de feux précédents. Des voyageurs avant vous ont trouvé cet endroit.

La nuit tombe vite hors des murs de la ville. Sans les lanternes magiques, l'obscurité est totale, percée seulement par les étoiles et votre feu de camp. Le bois crépite, les flammes dansent, et autour de vous, la nature nocturne s'éveille : grillons, chouettes, bruissements dans les buissons.

C'est le premier soir loin de Sol-Aureus. Le premier soir sans murs pour vous protéger. Et dans ce silence, les questions que vous avez refoulées pendant la journée remontent : qu'est-ce qui vous attend ? Êtes-vous prêts ? Et cette voix dans le rêve, ce « bientôt » murmuré par quelque chose d'immense et d'ancien... était-ce une promesse ou une menace ?

Le feu crépite. Les étoiles brillent. Et quelque part dans les collines, quelque chose hurle — un loup ? Ou autre chose ?`,
    mood: "Repos contemplatif, vulnérabilité, camaraderie naissante",
    music: "Feu de camp, grillons, vent léger, chouette lointaine",
  },
  gmNotes: [
    { type: 'info', text: "Scène de repos et de développement des personnages. Parfaite pour du roleplay entre PJ, des histoires personnelles, et la construction de liens. Le MJ peut offrir l'Inspiration aux joueurs qui partagent des moments significatifs." },
    { type: 'tip', text: "Posez des questions aux joueurs : 'Que fait votre personnage pendant le premier tour de garde ?', 'De quoi parle-t-il autour du feu ?', 'À quoi rêve-t-il cette nuit ?' Ces moments calmes sont le ciment d'un bon groupe." },
    { type: 'warning', text: "Attaque nocturne possible (1 chance sur 3) : 1d4+1 loups affamés ou 2 bandits de grand chemin. Perception CD 25 du guetteur pour ne pas être surpris. Alternative : l'attaque est évitée mais les joueurs trouvent des traces au matin." },
    { type: 'secret', text: "Le rêve revient cette nuit — plus intense. L'Entité est plus proche. Les PJ voient la même porte scellée, mais cette fois elle a des fissures. De la lumière verte filtre. La voix dit : 'Venez. J'ai tant attendu. Les clés sont dans la pierre, le sang et le feu.' Au réveil, chaque PJ a un goût de cendre dans la bouche." },
    { type: 'lore', text: "Le cercle de pierres du campement est un ancien relais de voyageurs datant de l'ère pré-ashkane. Les druides plaçaient ces cercles le long des routes comme points de repos protégés. La magie protectrice a presque disparu, mais pas entièrement — les animaux dangereux hésitent instinctivement à s'approcher." },
  ],
  npcs: [
    {
      name: "Marcus (si accompagne le groupe)",
      role: "Compagnon / Mentor temporaire",
      personality: "Plus détendu hors de la ville. Partage des histoires de ses campagnes passées. Révèle un côté humain sous la carapace militaire.",
      appearance: "Sans son armure de cérémonie, Marcus ressemble à ce qu'il est : un soldat fatigué avec trop de cicatrices et pas assez de sommeil.",
      dialogues: {
        greeting: "« Le feu est bon. Passez-moi la gourde. »",
        info: "« Les Collines Anciennes. Ça fait vingt ans que je n'y suis pas allé. La dernière fois, c'était pour chasser des bandits. On a trouvé leur camp... vide. Comme s'ils avaient fui quelque chose. On n'a jamais su quoi. »",
        quest: "« Demain, on atteint les premières ruines. Le Sceau, d'après les cartes de Theron, est sous un temple en ruine au sommet de la Colline du Soupir. Joli nom, hein ? Les locaux disent qu'on entend des soupirs quand le vent passe dans les ruines. »",
        farewell: "« Dormez. Je prends le premier tour de garde. Les vieux soldats ne dorment pas bien de toute façon. »",
      },
      stats: { hp: 75, atk: 18, ac: 20 },
    },
  ],
  skillChecks: [
    { skill: 'Survie', dc: 20, success: "Vous allumez un feu efficace, trouvez de l'eau potable et organisez un campement confortable. Repos long complet.", failure: "Le bois est humide, le feu fume plus qu'il ne brûle. Repos long accordé mais sans le confort." },
    { skill: 'Perception', dc: 25, success: "Pendant votre tour de garde, vous entendez des bruits dans les buissons. Deux yeux lumineux vous observent... puis s'éloignent. Quelque chose vous a évalué et a décidé de ne pas attaquer.", failure: "Votre tour de garde se passe sans incident. Du moins, c'est ce que vous croyez." },
    { skill: 'Nature', dc: 30, success: "Les étoiles ne sont pas tout à fait dans leur position normale. Un léger décalage, comme si le ciel lui-même avait tremblé. Signe que les lignes de force magique sont perturbées.", failure: "Belle nuit étoilée. Rien d'anormal." },
  ],
  choices: [
    {
      id: 'choice-camp',
      prompt: "Que font les personnages pendant la nuit au camp ?",
      options: [
        {
          label: "Histoires au coin du feu",
          description: "Partager des histoires personnelles et renforcer les liens du groupe.",
          consequence: "Roleplay libre. Le MJ accorde l'Inspiration aux joueurs qui partagent quelque chose de significatif sur leur passé.",
          nextScene: 'scene-1-4-village',
        },
        {
          label: "Méditer sur le rêve",
          description: "Tenter de comprendre les visions et la voix de l'Entité.",
          consequence: "Arcanes ou Religion CD 35. Succès : vision supplémentaire montrant l'emplacement approximatif du Sceau. Échec : cauchemars, pas de repos long.",
          nextScene: 'scene-1-4-village',
          skillCheck: { skill: 'Arcanes', dc: 35, success: "En méditant, vous percevez les lignes de force convergent vers le nord-est. Le Sceau pulse comme un cœur malade. Vous le sentez.", failure: "Les visions sont confuses, fragmentaires. Vous vous réveillez épuisé, l'esprit trouble." },
        },
        {
          label: "Renforcer les défenses",
          description: "Poser des pièges, organiser les tours de garde, se préparer au pire.",
          consequence: "Avantage sur les jets de Perception pendant la nuit. Si attaque, pas de surprise possible.",
          nextScene: 'scene-1-4-village',
        },
        {
          label: "Explorer les environs",
          description: "Reconnaissance nocturne des collines proches.",
          consequence: "Discrétion CD 25. Découverte de traces anciennes menant à des ruines au sommet d'une colline proche.",
          nextScene: 'scene-1-4-ruins',
        },
      ],
    },
  ],
  nextScenes: ['scene-1-4-village', 'scene-1-4-ruins'],
  previousScene: 'scene-1-3-4',
  mapMovement: { from: 'sol-aureus', to: 'val-dore-road' },
};

const scene_1_4_village: BookScene = {
  id: 'scene-1-4-village',
  sceneNumber: 41,
  title: "Le Village de Pierrevent",
  type: 'social',
  location: "Pierrevent, village de montagne",
  locationId: 'val-dore-road',
  estimatedMinutes: 30,
  readAloud: {
    text: `Pierrevent est blotti dans le creux d'une vallée, comme un enfant qui se cache sous une couverture. Trente maisons de pierre grise aux toits de chaume, un moulin à vent qui grince, une chapelle minuscule dédiée à Solarius, et une auberge qui s'appelle — sans aucune ironie — « Le Dernier Repos ».

Les habitants vous regardent avec un mélange d'espoir et de terreur qui vous serre le cœur.

C'est le maire, un vieux fermier aux mains comme des battoirs, qui s'approche en premier. Son visage est marqué par le manque de sommeil et les rides que laisse l'inquiétude.

« Des aventuriers. Par Solarius, enfin des aventuriers. Vous venez de la capitale ? Est-ce que la Garde vous envoie ? Non ? Ça ne fait rien. Vous êtes là. C'est ce qui compte. »

Il vous entraîne vers la chapelle. À l'intérieur, sur des lits de fortune, une dizaine de villageois sont allongés. Ils tremblent, gémissent, et leurs yeux — quand ils les ouvrent — sont vitreux et lointains, comme s'ils regardaient quelque chose que personne d'autre ne peut voir.

« Ça a commencé il y a trois semaines, » dit le maire, la voix brisée. « La maladie. Sauf que ce n'est pas une maladie ordinaire. Le guérisseur ne comprend pas. Ils ne toussent pas, n'ont pas de fièvre. Ils dorment. Et ils murmurent. Toujours la même chose. »

Il se penche vers un dormeur. L'homme murmure, les lèvres à peine mobiles : « L'œil s'ouvre... l'œil s'ouvre... l'œil s'ouvre... »

Le maire vous regarde. « Et la nuit, quelque chose rôde dans les collines. On entend des grondements. Les animaux fuient. Et ce matin... ce matin, une vache a été trouvée morte. Vidée de son sang. Pas une égratignure. Juste... vide. »`,
    mood: "Désespoir rural, horreur rampante, appel à l'aide",
    music: "Vent dans les collines, grincement du moulin, silence lourd",
  },
  gmNotes: [
    { type: 'info', text: "Pierrevent est un village de fermiers et de bergers sur la route des Collines Anciennes. La 'maladie' est causée par la proximité du Sceau qui fissure : l'énergie nécrotique fuit et affecte les personnes sensibles (environ 1 sur 3)." },
    { type: 'tip', text: "La créature dans les collines est un Dragueur de Sang (CR 3, HP 45, ATK 12, AC 15) — un prédateur nécrotique attiré par l'énergie du Sceau. Le tuer est une quête secondaire qui gagne la gratitude éternelle du village." },
    { type: 'warning', text: "Les dormeurs ne peuvent pas être réveillés par des moyens normaux. Dissipation de la magie CD 40 (temporaire, 1h) ou réparation du Sceau (permanente). Si laissés sans traitement plus de 2 semaines, ils meurent." },
    { type: 'secret', text: "L'un des dormeurs, la vieille Hestra, est une ancienne gardienne des traditions. Dans ses murmures, elle mêle ashkan archaïque et directions vers le temple en ruine. Elle 'voit' le chemin du Sceau dans son sommeil." },
    { type: 'lore', text: "Pierrevent existe depuis avant l'Hégémonie d'Ashka. Les villageois descendent des druides qui gardaient les Collines Anciennes. Ils ont oublié cette origine, mais certaines traditions persistent : la pierre sculptée au centre du village est un ancien menhir de protection, et la chapelle est construite sur un cairn druidique." },
  ],
  npcs: [
    {
      name: "Maire Edric",
      role: "Maire du village / Quête locale",
      personality: "Honnête, dépassé par les événements, prêt à tout pour sauver ses gens. Un homme simple face à une menace qu'il ne comprend pas.",
      appearance: "Humain, la soixantaine, large d'épaules, mains de fermier. Cheveux gris clairsemés, yeux bleus fatigués. Chemise de lin, pantalon de toile, bottes de travail.",
      dialogues: {
        greeting: "« Bienvenue à Pierrevent. Je voudrais dire que les temps sont meilleurs d'habitude, mais en ce moment, tout ce que je peux offrir c'est un toit, un repas chaud, et une prière. »",
        info: "« Dix dormeurs. Dix personnes qui ne se réveillent plus. Mon fils en fait partie. Il a 14 ans. Il me reste peut-être deux semaines pour le sauver, d'après notre guérisseur. Deux semaines. »",
        quest: "« Tuez la bête dans les collines et trouvez ce qui rend mes gens malades. Je n'ai pas d'or. Mais ce que Pierrevent a, il le donnera. Nourriture, abri, gratitude. Et quand le monde sera redevenu normal, on se souviendra de ceux qui nous ont aidés quand personne d'autre ne le faisait. »",
        farewell: "« Que Solarius vous protège. Mon fils s'appelle Tam. S'il se réveille... dites-lui que son père n'a pas abandonné. »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Médecine', dc: 35, success: "Ce n'est pas une maladie. C'est une contamination magique. L'énergie nécrotique qui émane du sol affecte ceux qui y sont sensibles. C'est la même énergie que dans les tunnels sous Sol-Aureus, mais plus concentrée.", failure: "Les symptômes ne correspondent à aucune maladie connue. Mystère." },
    { skill: 'Survie', dc: 30, success: "Les traces autour du village montrent un prédateur de grande taille qui se déplace la nuit. Ses empreintes sont étranges — comme si une partie de l'animal était plus lourde que nature.", failure: "Le sol est dur et les traces sont confuses." },
    { skill: 'Arcanes', dc: 35, success: "Vous sentez les lignes de force converger vers les collines au nord. L'énergie est nécrotique mais pas hostile — elle fuit, comme l'eau d'un tuyau percé. La source est le Sceau fissuré.", failure: "L'air est chargé d'une énergie étrange, mais sa source vous échappe." },
  ],
  choices: [
    {
      id: 'choice-village',
      prompt: "Comment les personnages aident-ils Pierrevent ?",
      options: [
        {
          label: "Chasser la créature",
          description: "Traquer le Dragueur de Sang dans les collines.",
          consequence: "Pistage (Survie CD 30) puis combat. Le Dragueur est puissant mais seul. Le tuer soulage le village mais ne guérit pas les dormeurs.",
          nextScene: 'scene-1-4-ruins',
        },
        {
          label: "Soigner les dormeurs",
          description: "Tenter de réveiller les malades par la magie.",
          consequence: "Dissipation de la magie CD 40, temporaire. Indique que la cause est un Sceau brisé. Pointe vers la source dans les collines.",
          nextScene: 'scene-1-4-ruins',
        },
        {
          label: "Écouter les murmures d'Hestra",
          description: "Écouter attentivement la vieille dormeuse qui mêle ashkan et directions.",
          consequence: "Langues anciennes CD 30 ou Intuition CD 35 : Hestra décrit le chemin vers le temple en ruine, y compris les pièges.",
          nextScene: 'scene-1-4-ruins',
          skillCheck: { skill: 'Intuition', dc: 35, success: "Entre les murmures ashkans, des mots en commun émergent : 'colline du soupir', 'escalier qui descend', 'gardien de pierre', 'ne regarde pas l'œil'. C'est une carte orale.", failure: "Les murmures sont incompréhensibles. Juste cette répétition obsédante : 'l'œil s'ouvre...'" },
        },
        {
          label: "Partir sans s'arrêter",
          description: "Le temps presse. Continuer directement vers le Sceau.",
          consequence: "Perte de l'alliance villageoise et des informations d'Hestra. Le Dragueur pourrait attaquer le groupe sur la route.",
          nextScene: 'scene-1-4-ruins',
          reputationChange: [{ faction: 'Peuple de Sol-Aureus', amount: -5 }],
        },
      ],
    },
  ],
  loot: [
    "Provisions gratuites pour 5 jours (offertes par le village)",
    "Herbes de soin locales (2 potions de soin mineures)",
    "Amulette druidique ancienne (trouvée dans la chapelle, +1 aux jets de sauvegarde vs nécrotique)",
  ],
  nextScenes: ['scene-1-4-ruins'],
  previousScene: 'scene-1-4-road-camp',
};

const scene_1_4_ruins: BookScene = {
  id: 'scene-1-4-ruins',
  sceneNumber: 42,
  title: "Les Ruines du Temple de la Colline du Soupir",
  type: 'exploration',
  location: "Ruines du Temple, Colline du Soupir",
  locationId: 'ancient-hills',
  estimatedMinutes: 40,
  readAloud: {
    text: `La Colline du Soupir porte son nom à la perfection.

À mi-pente, le vent se met à souffler entre les pierres brisées d'un temple dont il ne reste que les fondations, deux colonnes dressées comme des doigts accusateurs vers le ciel, et un escalier qui descend dans l'obscurité. Le vent, en passant entre les colonnes et les pierres, produit un son qui ressemble à un soupir — long, triste, et étrangement humain.

Le temple était dédié aux anciens dieux d'avant l'Hégémonie, ceux que les druides vénéraient quand le monde était jeune. Les colonnes portent des gravures de feuilles, d'animaux et de spirales — le langage visuel de la nature sacrée. Mais superposées à ces gravures, des runes ashkanes ont été brutalement taillées, défigurant les motifs originaux comme des cicatrices.

Au centre des ruines, un cercle de pierres dressées entoure l'entrée de l'escalier. Six pierres, chacune haute comme un homme, chacune gravée d'un symbole différent. Le soleil. La lune. L'arbre. La montagne. La vague. Et le dernier... l'œil ouvert.

L'escalier descend dans le noir. Mais ce n'est pas un noir naturel. C'est un noir qui repousse la lumière. Votre torche éclaire les premières marches, puis sa lumière semble être aspirée, dévorée par l'obscurité en contrebas.

Et du fond de cette obscurité monte un souffle. Régulier. Rythmique. Comme si quelque chose de grand respirait dans son sommeil.

Un puzzle se présente : les six pierres peuvent être tournées sur leur base, révélant des symboles cachés sur leur face arrière. Les murmures d'Hestra résonnent dans votre mémoire : « Ne regarde pas l'œil... tourne la pierre vers le soleil... »`,
    mood: "Révérence archéologique, puzzle mystique, horreur ancienne",
    music: "Vent sifflant entre les pierres, soupirs fantomatiques, bourdonnement souterrain",
  },
  gmNotes: [
    { type: 'info', text: "Le puzzle des pierres : chaque pierre peut tourner pour montrer un symbole primaire (devant) ou un symbole inversé/corrompu (derrière). La solution est de tourner toutes les pierres SAUF l'œil vers leur face 'lumineuse' (symbole original). L'œil doit rester face ashkane pour servir de sceau temporaire." },
    { type: 'tip', text: "Le puzzle peut être résolu par la logique (Arcanes CD 30 + Investigation CD 30) ou par les indices d'Hestra si les joueurs l'ont écoutée. Mauvaise combinaison : décharge d'énergie nécrotique (2d8 nécrotique, jet de sauvegarde Constitution CD 35)." },
    { type: 'warning', text: "Le 'souffle' dans les profondeurs n'est pas une créature — c'est le Sceau lui-même qui pulse. Mais un Gardien de Pierre (CR 4, HP 60, ATK 14, AC 16) attend en bas de l'escalier, animé par la magie résiduelle du Sceau." },
    { type: 'secret', text: "Au fond du temple, une salle contient une fresque murale montrant la création originale des Sceaux : sept mages de l'Alliance des Peuples scellant les Anciens dans un rituel qui a coûté la vie à trois d'entre eux. L'un des mages ressemble étrangement à Maestra Selyne." },
    { type: 'lore', text: "Ce temple pré-ashkan est l'un des plus anciens lieux sacrés d'Aethelgard. Les druides l'ont construit il y a plus de 1000 ans pour canaliser les forces de la terre. L'Hégémonie l'a profané et utilisé comme point d'ancrage pour un Sceau de Contention mineur. Ironiquement, la magie druidique du lieu renforce le Sceau." },
  ],
  encounter: {
    name: "Le Gardien de Pierre",
    enemies: [
      { name: "Gardien de Pierre Ancien", hp: 60, atk: 14, ac: 16, cr: 4, abilities: ["Immunité : Poison, Psychique, Nécrotique", "Résistance : Dégâts physiques non-magiques", "Poing de Pierre (2d8+4 contondant)", "Tremblement (tous les ennemis dans 3m, CD 35 Force ou à terre)", "Lenteur (pas de réaction, un seul mouvement ou attaque par tour)"] },
    ],
    terrain: ["Escalier étroit (1 de front)", "Salle du Sceau (espace ouvert, cercle de runes au centre)", "Piliers de soutien (couverture)", "Lueur du Sceau (éclairage faible vert)", "Sol instable près des fissures du Sceau (terrain difficile)"],
    tactics: "Le Gardien attend en bas de l'escalier, immobile comme une statue. Il s'active quand quelqu'un entre dans la salle du Sceau. Il utilise Tremblement en premier pour déstabiliser le groupe, puis attaque le plus proche. Il ne poursuit pas au-delà de la salle.",
    loot: ["Cœur de Pierre du Gardien (composant rituel rare, 200 PO)", "Fragment de fresque (représentant les Sept Mages, valeur historique inestimable)", "Cristal de Sceau récupérable (permet de renforcer temporairement un autre Sceau)"],
  },
  skillChecks: [
    { skill: 'Arcanes', dc: 30, success: "Le puzzle est un mécanisme d'alignement. Les pierres 'lumineuses' renforcent le Sceau, les 'sombres' l'affaiblissent. La solution est de maximiser la lumière tout en maintenant l'œil comme verrou.", failure: "Les symboles sont anciens et leur logique vous échappe." },
    { skill: 'Investigation', dc: 30, success: "En examinant la base des pierres, vous trouvez des marques d'usure : certaines ont été tournées récemment. Quelqu'un est passé avant vous et a mal aligné les pierres.", failure: "Les pierres sont massives et anciennes. Leur mécanique n'est pas évidente." },
    { skill: 'Histoire', dc: 35, success: "La fresque murale montre la Guerre des Sceaux — le moment où l'Alliance des Peuples a piégé les Anciens. L'une des figures porte la marque de Selyne.", failure: "La fresque est belle mais son sens exact vous échappe." },
  ],
  choices: [
    {
      id: 'choice-ruins',
      prompt: "Comment les personnages abordent-ils le temple en ruine ?",
      options: [
        {
          label: "Résoudre le puzzle des pierres",
          description: "Aligner correctement les six pierres pour renforcer le Sceau.",
          consequence: "Succès : le Sceau se stabilise temporairement. Les dormeurs de Pierrevent se réveillent. L'énergie nécrotique diminue. Le passage vers le bas s'ouvre.",
          nextScene: 'scene-1-4-aftermath',
        },
        {
          label: "Descendre directement",
          description: "Ignorer le puzzle et descendre l'escalier.",
          consequence: "Le Gardien est actif ET hostile d'emblée. Pas de bonus de stabilisation du Sceau. Combat plus difficile.",
          nextScene: 'scene-1-4-aftermath',
        },
        {
          label: "Étudier la fresque d'abord",
          description: "Examiner les murs du temple pour comprendre l'histoire du lieu.",
          consequence: "Histoire CD 35. Révèle la méthode de réparation des Sceaux et le rôle de Selyne. Information cruciale pour la suite.",
          nextScene: 'scene-1-4-aftermath',
          skillCheck: { skill: 'Histoire', dc: 35, success: "La fresque raconte tout : la création des Sceaux, les composants nécessaires, et le prix à payer. Vous comprenez maintenant l'ampleur de la tâche.", failure: "La fresque est fascinante mais trop endommagée pour livrer tous ses secrets." },
        },
      ],
    },
  ],
  loot: [
    "Cœur de Pierre du Gardien (200 PO, composant rituel)",
    "Fragment de fresque des Sept Mages (valeur historique)",
    "Cristal de Sceau (permet un renforcement temporaire d'un Sceau)",
  ],
  nextScenes: ['scene-1-4-aftermath'],
  previousScene: 'scene-1-4-village',
  mapMovement: { from: 'val-dore-road', to: 'ancient-hills' },
};

const scene_1_4_aftermath: BookScene = {
  id: 'scene-1-4-aftermath',
  sceneNumber: 43,
  title: "Après le Premier Sceau",
  type: 'revelation',
  location: "Campement près des ruines / Retour vers Pierrevent",
  locationId: 'ancient-hills',
  estimatedMinutes: 25,
  readAloud: {
    text: `Vous émergez des ruines au lever du soleil. L'air du matin est frais, presque doux, comme si la terre elle-même poussait un soupir de soulagement.

Le Sceau est stabilisé. Pas réparé — Theron vous avait prévenus que la réparation nécessiterait bien plus — mais stabilisé. La fuite d'énergie nécrotique est réduite à un filet. C'est un pansement sur une blessure profonde, mais c'est mieux que rien.

Vous vous laissez tomber sur l'herbe humide, épuisés. Les muscles douloureux, les esprits saturés de ce que vous avez vu en bas. Le Gardien. Le Sceau, pulsant comme un cœur blessé. Les fissures d'où montait cette lueur verte. Et la fresque, avec ses sept figures silencieuses qui semblaient vous regarder depuis un passé lointain.

C'est en fermant les yeux que le rêve vous prend. Pas un rêve de sommeil — une vision éveillée, brutale et claire.

Vous êtes debout dans un espace sans dimension. Pas d'en haut, pas d'en bas. Juste un vide gris et, au centre, un œil immense. Un œil d'un vert lumineux, avec une pupille verticale comme celle d'un serpent, qui vous regarde avec une intelligence ancienne et patiente.

L'Entité parle. Pas avec des mots — avec des sensations, des images, des émotions.

Elle vous montre une carte. Pas d'Aethelgard tel qu'il est — tel qu'il était. Avant les villes, avant les routes, avant même les druides. Un monde sauvage, brûlant de magie brute, où des êtres de pouvoir inimaginable marchaient comme des dieux.

Puis les Sceaux, comme des chaînes dorées, se referment sur cette vision. Un par un. Sept verrouillages. Sept prisons.

Et maintenant, les chaînes rouillent.

La vision s'efface. Vous ouvrez les yeux. Le soleil brille. Les oiseaux chantent. Mais le goût de cendre dans votre bouche et la sensation de cet œil immense qui vous a vu — vraiment vu — reste comme une empreinte brûlée dans votre esprit.

Vous n'êtes plus des aventuriers. Vous êtes des pièces sur un échiquier dont vous commencez à peine à comprendre les règles.`,
    mood: "Révélation cosmique, fatigue post-combat, prise de conscience vertigineuse",
    music: "Silence puis thème orchestral grandissant, mélancolique et épique",
  },
  gmNotes: [
    { type: 'info', text: "Transition majeure de la campagne. Les PJ passent d'enquêteurs locaux à acteurs d'un conflit cosmique. C'est le moment de laisser les implications s'installer." },
    { type: 'tip', text: "Laissez un silence après la description de la vision. Ne pressez pas les joueurs. Demandez : 'Qu'est-ce que votre personnage ressent ?' C'est un moment de roleplay crucial." },
    { type: 'warning', text: "Les PJ savent maintenant que l'Entité les connaît. Elle ne les considère pas comme des menaces — pas encore. Elle est curieuse. C'est presque pire." },
    { type: 'secret', text: "La vision contenait un indice caché : dans la carte ancienne, trois points brillaient plus fort que les autres. Ce sont les emplacements des trois Sceaux Majeurs les plus menacés : Monts Cœur-de-Fer, Sylve d'Émeraude, Côte des Orages. Les cibles de l'Acte II." },
    { type: 'lore', text: "L'Entité n'est pas un dieu maléfique au sens classique. C'est un être d'une autre ère, d'avant la séparation des plans. Les Sceaux ne la 'retiennent' pas comme une prison physique — ils l'empêchent de se manifester pleinement dans la réalité matérielle. Chaque Sceau brisé lui rend une fraction de sa capacité à influencer le monde." },
  ],
  skillChecks: [
    { skill: 'Arcanes', dc: 35, success: "La vision n'était pas un rêve. C'était une communication directe. L'Entité possède la capacité de projeter sa conscience à travers les fissures des Sceaux. Elle vous a choisis pour vous observer.", failure: "La vision était intense et déstabilisante, mais sa nature exacte vous échappe." },
    { skill: 'Intuition', dc: 30, success: "L'Entité n'est pas hostile... pas encore. Sa curiosité est sincère. Mais il y avait autre chose dans son regard : de la faim. Pas pour la nourriture. Pour la liberté.", failure: "Impossible de lire les intentions d'un être aussi étranger." },
    { skill: 'Histoire', dc: 40, success: "Les êtres de la vision correspondent aux légendes des 'Premiers' — les entités qui existaient avant les mortels, avant les dieux actuels. Si les légendes sont vraies, un seul d'entre eux libéré pourrait remodeler un continent.", failure: "Les légendes parlent d'êtres anciens, mais les détails sont flous et contradictoires." },
  ],
  choices: [
    {
      id: 'choice-aftermath',
      prompt: "Après la vision, que décident les personnages ?",
      options: [
        {
          label: "Retourner à Sol-Aureus rapporter",
          description: "Informer Marcus, Theron et Selyne de ce que vous avez découvert et vu.",
          consequence: "Briefing complet. Selyne confirme la vision et révèle partiellement son rôle. Début de l'Acte II : les PJ sont envoyés sécuriser les autres Sceaux.",
          nextScene: 'scene-2-transition-road',
          reputationChange: [{ faction: 'Garde Royale', amount: 10 }, { faction: 'Guilde des Arcanes', amount: 10 }],
        },
        {
          label: "Retourner à Pierrevent d'abord",
          description: "Vérifier que les dormeurs se sont réveillés et rassurer le village.",
          consequence: "Les dormeurs se réveillent lentement. Tam, le fils du maire, est le premier. Gratitude immense du village. Repos complet. Puis retour à Sol-Aureus.",
          nextScene: 'scene-2-transition-road',
          reputationChange: [{ faction: 'Peuple de Sol-Aureus', amount: 15 }],
        },
        {
          label: "Méditer et tenter de communiquer avec l'Entité",
          description: "Ouvrir volontairement un canal de communication avec l'être de la vision.",
          consequence: "Très dangereux. Sagesse CD 45 pour maintenir le contact sans perdre le contrôle. Succès : l'Entité révèle un indice supplémentaire. Échec : 2d10 dégâts psychiques et cauchemars pendant 1d4 jours.",
          nextScene: 'scene-2-transition-road',
          skillCheck: { skill: 'Sagesse', dc: 45, success: "Vous touchez brièvement l'esprit de l'Entité. Elle vous montre un neuvième Sceau, caché, que personne d'autre ne connaît. Puis le contact se rompt.", failure: "L'esprit de l'Entité vous submerge. Des visions de destruction, de cendres, de renaissance terrifiante. Vous vous réveillez en hurlant, 2d10 dégâts psychiques." },
        },
        {
          label: "Prendre du repos et réfléchir",
          description: "Passer une journée à se reposer, soigner les blessures, et discuter de la suite.",
          consequence: "Repos long complet. Chaque PJ reçoit l'Inspiration. Discussion de groupe sur la stratégie pour l'Acte II.",
          nextScene: 'scene-2-transition-road',
        },
      ],
    },
  ],
  nextScenes: ['scene-2-transition-road'],
  previousScene: 'scene-1-4-ruins',
  mapMovement: { from: 'ancient-hills', to: 'val-dore-road' },
};

// ============================================================================
// EXPORT
// ============================================================================

export const ACT_1_SCENES_EXPANSION: BookScene[] = [
  // Chapitre 1 - La Cité Dorée
  scene_1_1_market,
  scene_1_1_temple,
  scene_1_1_guild,
  scene_1_1_lowquarter,
  scene_1_1_night,
  // Chapitre 2 - Sous la Surface
  scene_1_2_sewers_deep,
  scene_1_2_informant,
  scene_1_2_ambush,
  // Chapitre 3 - Les Ombres de Sol-Aureus
  scene_1_3_investigation,
  scene_1_3_gala_aftermath,
  scene_1_3_safehouse,
  // Chapitre 4 - Le Premier Sceau
  scene_1_4_road_camp,
  scene_1_4_village,
  scene_1_4_ruins,
  scene_1_4_aftermath,
];
