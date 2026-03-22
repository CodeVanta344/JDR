/**
 * CHAPITRE 1 : SIGNES PRÉCURSEURS (Niveau 1-3)
 * 7 scènes — Introduction, taverne, enquête, égouts, rapport
 */
import type { NarrativeScene, NarrativeChapter } from './types';

const CH1_SCENES: NarrativeScene[] = [
  {
    id: 'ch1_s1_taverne', chapterId: 'ch1', sceneNumber: 1,
    title: 'Le Dragon Rouillé', type: 'narration',
    readAloud: `La porte du Dragon Rouillé résiste un instant avant de céder avec un grincement profond de gonds rouillés. Une bouffée d'air chaud, lourd, saturé d'odeurs, vous frappe au visage — ragoût de sanglier qui mijote depuis des heures, houblon fermenté, sueur de marins, et cette note de fond douce et boisée que seules les très vieilles tavernes possèdent, quand le chêne des poutres a absorbé des décennies de fumée.

La salle est vaste et basse de plafond. Des poutres noircies par la suie supportent un enchevêtrement de lanternes à huile dont la lumière ambrée danse au rythme des courants d'air. Le sol est couvert de sciure de bois fraîche qui crisse sous vos bottes. À votre gauche, une cheminée massive — deux mètres de large au moins — crépite d'un feu de hêtre dont les flammes orangées projettent des ombres mouvantes sur un mur décoré de harpons rouillés, de filets de pêche séchés et d'une tête de brochet empaillée dont l'œil de verre vous fixe.

Une demi-douzaine de tables rondes occupent la salle. Dans le coin le plus éloigné de la porte, quatre marins au teint buriné par les embruns jouent aux dés en jurant à voix basse — leurs pièces de cuivre tintent sur le bois à chaque lancer. Près de la fenêtre, un couple de marchands halflings partage une tourte en se disputant amicalement. Un chat roux tigré, aussi large qu'un petit chien, dort sur le comptoir entre deux chopes vides, sa queue pendant mollement dans le vide.

Derrière le comptoir de chêne poli par des milliers de coudes, un colosse moustachu — facilement deux mètres, les bras comme des jambons, un tablier taché de bière sur une bedaine imposante — essuie un verre en sifflotant un air de marin. C'est Brok, le tavernier. Son sourire facile et ses yeux malins contrastent avec sa carrure de lutteur. Une cicatrice blanche barre sa joue gauche — souvenir d'une vie antérieure qu'il ne raconte jamais.

Mais c'est au fond de la salle que votre attention est attirée. Là, tout près de la cheminée, dans le fauteuil le plus usé de la taverne — celui dont le cuir est si craquelé qu'il ressemble à une carte géographique — un vieil homme est assis, immobile. Ses yeux laiteux, voilés par la cataracte, fixent une chope vide qu'il tourne entre ses doigts noueux. Ses cheveux blancs, en bataille, collent à ses tempes par la sueur. C'est le Vieux Sam — tout le monde le connaît ici, tout le monde l'aime bien, et personne ne l'écoute jamais vraiment.

Mais ce soir, quelque chose est différent. Sam ne marmonne pas dans sa barbe comme d'habitude. Il est SILENCIEUX. Et quand la porte grince en s'ouvrant — quand VOUS entrez — il lève la tête d'un coup sec. Ses yeux troubles vous trouvent immédiatement, avec une précision troublante pour un homme quasi aveugle. Et dans ce regard, vous lisez quelque chose qui vous serre l'estomac : de la peur. Une peur profonde, animale. La peur d'un homme qui a vu quelque chose qu'il n'aurait jamais dû voir.`,
    gmNotes: `Le Vieux Sam a réellement entendu des bruits dans les égouts la nuit dernière. Il n'est pas fou mais ses descriptions sont confuses. Profitez de cette scène pour établir l'ambiance et laisser les joueurs explorer la taverne librement. Si les joueurs ne vont pas vers Sam d'eux-mêmes, Brok le mentionne : "Sam radote encore sur ses fantômes d'égout, hein."`,
    dialogues: [
      {
        npcId: 'npc_brok', npcName: 'Brok le Tavernier',
        lines: [
          { trigger: 'Accueil', text: `Bienvenue au Dragon Rouillé, voyageurs ! On a du ragoût de sanglier frais et de la bière de Hammerdeep. Prenez place où vous voulez !`, tone: 'jovial' },
          { trigger: 'Rumeurs', text: `Des rumeurs ? Hah ! Le vieux Sam là-bas jure qu'il a entendu des grognements dans les égouts. Et la Garde recrute des volontaires — trois incidents cette semaine paraît-il. Du jamais vu.`, tone: 'intrigué' },
          { trigger: 'À propos de Sam', text: `Sam ? C'est un ancien mineur. Il vit ici depuis vingt ans. D'habitude il délire un peu, mais là... il a vraiment l'air secoué. Allez lui parler, ça lui fera du bien.`, tone: 'soucieux' }
        ]
      },
      {
        npcId: 'npc_old_sam', npcName: 'Le Vieux Sam',
        lines: [
          { trigger: 'Premiers mots', text: `*Il lève vers vous des yeux injectés de sang.* Vous... vous avez l'air de gens qui n'ont pas peur du noir. Approchez. J'ai quelque chose à raconter et personne ici ne veut m'écouter.`, tone: 'suppliant' },
          { trigger: 'Ce qu\'il a vu', text: `La nuit dernière, je rentrais chez moi par la ruelle des Forgerons. Et là... un bruit. Pas un rat, non. Un grondement. Comme si la terre elle-même grognait. Et j'ai vu... des yeux. Des yeux rouges dans la bouche d'égout. Rouges comme des braises, et ils me regardaient avec... de l'intelligence.`, tone: 'terrifié' },
          { trigger: 'Les ombres', text: `*Il baisse la voix.* Et le pire ? L'ombre. Elle bougeait CONTRE la lumière. Les ombres normales fuient la lumière, pas vrai ? Celle-là, elle avançait vers ma lanterne. J'ai couru. À mon âge !`, tone: 'chuchotant' },
          { trigger: 'La Garde', text: `J'ai prévenu la Garde ce matin. Ils m'ont ri au nez. "Encore le vieux Sam et ses histoires." Mais je vous jure sur Solarius, c'était réel. Et je ne suis pas le seul — la boulangère de la rue Haute aussi a entendu des choses.`, tone: 'frustré' }
        ]
      }
    ],
    objectives: [
      { description: 'S\'installer à la taverne et découvrir l\'ambiance', type: 'explore', optional: false },
      { description: 'Parler au Vieux Sam', type: 'talk', optional: false },
      { description: 'Recueillir des rumeurs auprès de Brok', type: 'talk', optional: true }
    ],
    transitions: [
      { condition: 'Les joueurs décident d\'enquêter sur les égouts', nextScene: 'ch1_s2_recrutement', label: '→ Recrutement par la Garde' },
      { condition: 'Les joueurs ignorent Sam', nextScene: 'ch1_s2_recrutement', label: '→ La Garde vient à eux', alternative: 'ch1_s2_recrutement' }
    ],
    estimatedMinutes: 15, mood: 'mystère',
    music: 'Taverne médiévale — luth, conversations', location: 'Sol-Aureus — Le Dragon Rouillé'
  },
  {
    id: 'ch1_s2_recrutement', chapterId: 'ch1', sceneNumber: 2,
    title: 'L\'Appel de la Garde', type: 'dialogue',
    readAloud: `Le lendemain matin, la lumière pâle de l'aube filtre à travers les volets de votre chambre de taverne. Sol-Aureus s'éveille — les roues des charrettes grincent sur les pavés, les marchands crient les premiers prix de la journée, et quelque part, un coq obstiné refuse d'admettre que le soleil est déjà levé.

Mais ce matin, un son nouveau se mêle au brouhaha : un roulement de tambour militaire. Régulier. Solennel. Le son d'une annonce officielle.

En descendant dans la rue, vous trouvez la place du marché déjà noire de monde. Trois gardes en armure polie — cuirasse rutilante frappée du Soleil d'Or de la Couronne, capes écarlates immaculées — se tiennent au pied du grand panneau d'affichage municipal. L'un d'eux, un sergent au visage carré barré d'une moustache impeccable, martèle un parchemin avec des clous de cuivre. Chaque coup de marteau résonne dans le silence attentif de la foule.

L'affiche est magnifique — presque trop pour un simple avis de recrutement. Rédigée sur du vélin de qualité, à l'encre dorée, le blason royal en filigrane, elle proclame en lettres capitales :

«PAR ORDRE DU GÉNÉRAL MARCUS, COMMANDANT DE LA GARNISON DE SOL-AUREUS — La Garde Royale recrute des volontaires courageux et compétents pour enquêter sur les perturbations souterraines qui affectent le réseau d'égouts de la cité. Récompense garantie : 500 pièces d'or par participant. Équipement fourni. Se présenter à la Caserne du Soleil Levant avant midi. Seuls les candidats capables de tenir une arme et de suivre des ordres seront considérés.»

Un murmure parcourt la foule. Vous observez les visages : un boucher qui secoue la tête, une femme qui tire son fils par le bras en s'éloignant, deux gardes municipaux qui échangent un regard gêné. Un vieux soldat à la jambe de bois crache par terre. "500 pièces, ça veut dire que personne veut y aller," grogne-t-il à son voisin. "Et quand la Garde offre de l'or, c'est que les gens meurent."

Personne ne se porte volontaire. La foule regarde l'affiche comme on regarde un avis de décès. Et quelque part dans le silence, vous entendez distinctement la voix d'un enfant demander : "Maman, c'est quoi les perturbations souterraines ?" La mère ne répond pas. Elle marche plus vite.`,
    gmNotes: `Le Général Marcus est un homme pragmatique et direct. Il n'a pas assez d'hommes pour envoyer des gardes dans les égouts — la moitié de la garnison est déployée aux frontières. Il évalue les joueurs rapidement et accepte quiconque semble capable de tenir une arme. Si les joueurs négocient la récompense, il peut monter à 600 PO maximum avec un jet de Persuasion DC 14.`,
    dialogues: [
      {
        npcId: 'npc_general_marcus', npcName: 'Général Marcus',
        lines: [
          { trigger: 'Accueil', text: `*Un homme massif aux cheveux grisonnants vous toise depuis son bureau.* Vous êtes les volontaires ? Bien. Asseyez-vous. Je ne vais pas enjoliver la situation : quelque chose rôde dans nos égouts et ça a déjà blessé deux de mes hommes.`, tone: 'grave' },
          { trigger: 'La mission', text: `Votre mission est simple : descendre dans les égouts par l'accès de la Porte Sud, explorer le réseau jusqu'au collecteur central, et éliminer ou identifier ce qui s'y cache. Mes hommes ont rapporté des... créatures. Noires comme l'encre, avec des griffes capables de trancher l'acier.`, tone: 'autoritaire' },
          { trigger: 'Questions', text: `Non, je ne sais pas ce que c'est. Mes hommes ne sont pas des érudits. Mais le vieux bibliothécaire de l'Académie Arcane — un certain Théodore — pourrait en savoir plus. Si vous avez le temps, passez le voir avant de descendre. Sinon, fiez-vous à vos lames.`, tone: 'pragmatique' },
          { trigger: 'Équipement', text: `*Il ouvre un coffre.* Prenez deux torches enchantées — elles brûlent même sous l'eau. Et cette carte des égouts. Elle date de dix ans mais le réseau n'a pas changé. Bonne chance.`, tone: 'expéditif' }
        ]
      }
    ],
    objectives: [
      { description: 'Se rendre à la Caserne du Soleil Levant', type: 'explore', optional: false },
      { description: 'Accepter la mission du Général Marcus', type: 'talk', optional: false },
      { description: 'Consulter Théodore à l\'Académie Arcane (optionnel)', type: 'talk', optional: true }
    ],
    transitions: [
      { condition: 'Les joueurs acceptent et descendent directement', nextScene: 'ch1_s3_egouts', label: '→ Exploration des égouts' },
      { condition: 'Les joueurs visitent d\'abord l\'Académie Arcane', nextScene: 'ch1_s2b_academie', label: '→ Visite à Théodore (optionnel)' },
      { condition: 'Les joueurs enquêtent au marché d\'abord', nextScene: 'ch1_s2c_marche', label: '→ Enquête au Marché (optionnel)' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 14, success: 'Marcus accepte de monter la récompense à 600 PO et ajoute deux potions de soin.', failure: 'Marcus fronce les sourcils : "500 PO, c\'est déjà généreux. À prendre ou à laisser."' }
    ],
    loot: ['2x Torches Enchantées', 'Carte des Égouts de Sol-Aureus'],
    estimatedMinutes: 10, mood: 'tension',
    music: 'Militaire — tambours lointains', location: 'Sol-Aureus — Caserne du Soleil Levant'
  },
  {
    id: 'ch1_s2b_academie', chapterId: 'ch1', sceneNumber: 2.5,
    title: 'L\'Académie Arcane (Optionnel)', type: 'dialogue',
    readAloud: `L'Académie Arcane de Sol-Aureus se dresse au bout de la Grand-Rue Savante — une tour de marbre blanc veiné d'argent qui s'élève sur six étages, si haute que son sommet se perd dans la brume matinale. Des runes d'un bleu profond, gravées dans la pierre à intervalles réguliers, pulsent doucement d'une lumière qui semble respirer — plus brillante à l'inspiration, plus douce à l'expiration, comme le pouls d'un être vivant. Les fenêtres sont des vitraux représentant les sept écoles de magie, chacun projetant des arcs-en-ciel colorés sur les pavés de la rue.

La porte principale — un double battant de chêne incrusté de symboles en cuivre qui changent de forme quand on les regarde trop longtemps — s'ouvre sans bruit à votre approche. Vous ne l'avez pas touchée.

À l'intérieur, le contraste avec l'extérieur est saisissant. L'air est immobile, saturé d'odeurs superposées : parchemin ancien, encens de santal, encre de seiche, et cette note métallique subtile que la magie laisse derrière elle, comme l'odeur de l'air après un orage. Des livres — des MILLIERS de livres — tapissent les murs du sol au plafond, reliés en cuir de toutes les couleurs. Certains vibrent légèrement. Un ou deux lévitent paresseusement entre les étagères, attendant apparemment d'être rangés.

L'escalier en colimaçon central est encombré de globes lumineux de différentes tailles qui flottent comme des bulles de savon, éclairant les recoins d'une lumière douce et mouvante. Le silence est total — ou presque. On entend le grattement d'une plume sur du papier, le tic-tac d'une horloge qui semble compter les secondes dans le mauvais sens, et un marmonnement continu.

Le marmonnement vient d'un gnome. Perché sur un escabeau si haut qu'il est à la limite du vertige, un petit homme aux cheveux en bataille — blancs, partant dans toutes les directions comme si un sortilège de foudre l'avait frappé au réveil — trie des livres avec une énergie frénétique. Ses lunettes, bien trop grandes pour son visage, glissent continuellement sur son nez. Il les repousse d'un geste machinal toutes les trois secondes.

"Démons d'ombre, démons d'ombre... Pas celui-ci... Ni celui-ci... AH !" Il se retourne si brusquement que l'escabeau vacille dangereusement. "Vous voilà ! Marcus m'a envoyé un message — il a utilisé un pigeon, le barbare, quand un simple Envoi aurait suffi — pour me dire que quelqu'un passerait peut-être. Approchez, approchez ! J'ai trouvé quelque chose d'in-té-res-sant !" Il bat des mains avec un enthousiasme que la gravité de la situation ne semble pas tempérer le moins du monde.`,
    gmNotes: `Théodore donne aux joueurs un avantage narratif pour la suite. Ses informations sur les Démons d'Ombre permettent aux joueurs de savoir qu'ils sont vulnérables à la lumière radieuse et que leur présence implique une faille vers le Miroir des Ombres. C'est du lore-building pour l'arc entier.`,
    dialogues: [
      {
        npcId: 'npc_theodore', npcName: 'Théodore le Bibliothécaire',
        lines: [
          { trigger: 'Informations', text: `*Il ouvre un grimoire poussiéreux.* Regardez : "Rejeton du Miroir — entité d'ombre pure, manifestation de la volonté du Plan Ombre." Ces créatures ne peuvent exister dans notre monde que si une faille est ouverte vers le Miroir des Ombres. La dernière fois qu'on en a vu, c'était il y a 120 ans, à la fin de l'Ère des Cendres !`, tone: 'excité' },
          { trigger: 'Faiblesses', text: `Lumière radieuse ! Ces créatures sont des êtres d'ombre — la lumière divine ou arcanique les brûle comme de l'acide. Vos torches les ralentiront, mais un sort de Lumière ou une arme consacrée les fera hurler. *Il note quelque chose.* Tenez, cette rune de lumière — collez-la sur votre bouclier, ça aidera.`, tone: 'professorial' },
          { trigger: 'Les Sceaux', text: `*Son regard se fait sombre.* Si des Démons d'Ombre sont dans nos égouts, cela signifie qu'un des Sceaux antiques est affaibli, voire brisé. Les Sceaux... ce sont les verrous magiques posés par l'Alliance des Sept pour emprisonner l'Ombre après la Grande Guerre. Si un Sceau cède... *Il frissonne.* Je préfère ne pas y penser.`, tone: 'grave' }
        ]
      }
    ],
    objectives: [
      { description: 'Apprendre les faiblesses des Démons d\'Ombre', type: 'talk', optional: false },
      { description: 'Obtenir la Rune de Lumière', type: 'collect', optional: false }
    ],
    transitions: [
      { condition: 'Informations recueillies', nextScene: 'ch1_s3_egouts', label: '→ Direction les égouts' }
    ],
    loot: ['Rune de Lumière (usage unique, +1d6 dégâts radieux pendant 1 combat)', 'Notes de Théodore sur les Sceaux'],
    estimatedMinutes: 10, mood: 'mystère',
    music: 'Bibliothèque — silence, pages tournées', location: 'Sol-Aureus — Académie Arcane'
  },
  // ===== NOUVELLE SCÈNE : Enquête au marché =====
  {
    id: 'ch1_s2c_marche', chapterId: 'ch1', sceneNumber: 2.7,
    title: 'Murmures sur la Place du Marché (Optionnel)', type: 'exploration',
    readAloud: `La Place du Marché de Sol-Aureus est un spectacle de couleurs et de bruit sous le soleil matinal. C'est un vaste carré pavé de pierre blonde, bordé d'arcades marchandes aux colonnes sculptées de vignes et de grappes, héritage de l'époque où cette ville était le joyau commercial de l'Empire. Plus d'une centaine d'étals — des structures de bois et de toile aux couleurs vives — forment un labyrinthe joyeux de commerce et de bavardage.

Les odeurs vous assaillent de toutes parts : poisson frais étalé sur des lits de glace enchantée, épices exotiques dont les poudres rouges et jaunes forment des pyramides parfaites sur des plateaux de cuivre, pain tout juste sorti du four dont la croûte dorée craque encore, fromages affinés dont certains ont une présence olfactive qui vaut un jet de Constitution. Des marchands crient leurs prix avec l'enthousiasme de gladiateurs, tentant de couvrir le vacarme de leurs voisins. Des enfants courent entre les étals en volant des cerises, poursuivis par un chien à trois pattes étonnamment rapide.

Près de la fontaine centrale — une magnifique statue dorée de Solarius, le dieu-soleil, les bras levés, versant de l'eau qui brille d'une lueur dorée même par temps couvert — une troupe de musiciens halflings joue une gigue entraînante. Un halfling joufflu souffle dans une cornemuse miniature, un autre gratte un luth en tapant du pied, et un troisième danse en jonglant avec trois pommes. Quelques enfants les entourent en riant.

Mais vous, vous remarquez les fissures dans le tableau.

Les conversations s'éteignent quand vous approchez certains étals — comme si les marchands craignaient d'être entendus dire quelque chose qu'il ne faut pas dire. Un poissonnier vous lance un regard méfiant avant de détourner les yeux. Une vieille femme, en vous voyant arriver, rassemble ses herbes séchées et ferme son étal avec une hâte suspecte.

La boulangère de la rue Haute — une femme robuste aux joues rouges, les mains encore blanches de farine — range ses miches de pain avec des gestes fébriles. C'est Marta, celle que le Vieux Sam a mentionnée. Quand vos regards se croisent, elle détourne instantanément les yeux, mais vous surprenez un frisson qui lui parcourt les épaules. Ses mains tremblent.

Plus loin, à un étal encombré de bibelots hétéroclites — miroirs anciens, boîtes à musique, fioles vides, crânes d'animaux, pierres polies — un demi-elfe aux oreilles légèrement pointues et aux doigts tachés d'encre réarrange sa marchandise avec une nervosité qui frise l'agitation. C'est Cyril, le marchand de curiosités. Il ne vend pas. Il fait semblant de vendre. Et il regarde autour de lui toutes les dix secondes, comme s'il attendait que quelqu'un vienne lui poser des questions qu'il redoute.`,
    gmNotes: `Scène optionnelle d'enquête qui récompense les joueurs curieux avec des indices supplémentaires. La boulangère Marta confirme les bruits de Sam et ajoute un détail : elle a vu une silhouette encapuchonnée sortir des égouts avant l'aube. Cyril le marchand a vendu récemment une "pierre noire gravée de runes" à un inconnu — c'est un composant du rituel de sabotage des Sceaux. Perception DC 12 pour remarquer que les chats et chiens errants ÉVITENT tous un quartier précis. Investigation DC 13 pour trouver une trace de suie noire anormale autour de la bouche d'égout de la ruelle des Forgerons.`,
    dialogues: [
      {
        npcId: 'npc_marta', npcName: 'Marta la Boulangère',
        lines: [
          { trigger: 'Les bruits', text: `*Elle baisse la voix et regarde autour d'elle.* Le vieux Sam dit que j'ai entendu des choses ? Il a raison. Avant-hier, j'étais debout à quatre heures pour le pain. Et là, par la fenêtre de ma cave... des grattements. Comme des griffes sur la pierre. Mes chats ont hurlé et refuse d'entrer à la cave depuis.`, tone: 'anxieuse' },
          { trigger: 'La silhouette', text: `Et il y a autre chose. Le matin où les bruits ont commencé, j'ai vu quelqu'un. Un homme en robe noire, le visage caché, qui sortait de la bouche d'égout de la ruelle des Forgerons. À cinq heures du matin ! Il portait un sac qui... *elle frissonne* ...qui bougeait. J'ai fermé mes volets et j'ai prié.`, tone: 'terrifiée' }
        ]
      },
      {
        npcId: 'npc_cyril', npcName: 'Cyril le Marchand de Curiosités',
        lines: [
          { trigger: 'La pierre noire', text: `*Il sursaute en entendant le mot "ombre".* Écoutez... il y a trois jours, un homme est venu à mon étal. Il voulait une "pierre noire gravée de runes anciennes". J'en avais une — un vestige pré-impérial, rien de spécial. Il l'a payée dix fois son prix. Sans marchander. *Il se ronge les ongles.* Ça ne m'a pas plu.`, tone: 'nerveux' },
          { trigger: 'Description de l\'acheteur', text: `Grand. Maigre. Des mains trop longues. Il portait un manteau gris avec une broche en forme de miroir brisé. *Il dessine le symbole dans la poussière.* Et il sentait... comme du soufre brûlé mélangé à de la terre mouillée. Une odeur de cave ou de tombe.`, tone: 'mal à l\'aise' }
        ]
      }
    ],
    objectives: [
      { description: 'Interroger les marchands sur les événements récents', type: 'investigate', optional: false },
      { description: 'Obtenir la description de l\'homme encapuchonné', type: 'talk', optional: false },
      { description: 'Examiner la bouche d\'égout de la ruelle des Forgerons', type: 'explore', optional: true }
    ],
    transitions: [
      { condition: 'Indices recueillis', nextScene: 'ch1_s3_egouts', label: '→ Direction les égouts — mieux préparés' }
    ],
    skillChecks: [
      { skill: 'Perception', dc: 12, success: 'Vous remarquez que TOUS les animaux errants du quartier évitent la ruelle des Forgerons. Les pigeons eux-mêmes ne se posent pas sur les toits voisins.', failure: 'Le marché semble normal, à part la nervosité ambiante.' },
      { skill: 'Investigation', dc: 13, success: 'Autour de la bouche d\'égout de la ruelle des Forgerons, vous trouvez une suie noire qui ne ressemble à rien de naturel. Elle est froide au toucher et semble absorber la lumière.', failure: 'La ruelle est sale, mais rien de particulier ne vous frappe.' },
      { skill: 'Perspicacité', dc: 11, success: 'Cyril dit la vérité — son anxiété est authentique. Marta aussi. Ces gens ont vraiment peur.', failure: 'Difficile de dire s\'ils exagèrent ou non.' }
    ],
    loot: ['Croquis de la broche en miroir brisé (indice cultiste)'],
    estimatedMinutes: 10, mood: 'enquête',
    music: 'Marché — brouhaha, méfiance naissante', location: 'Sol-Aureus — Place du Marché'
  },
  {
    id: 'ch1_s3_egouts', chapterId: 'ch1', sceneNumber: 3,
    title: 'Dans les Ténèbres', type: 'combat',
    readAloud: `La grille de fer de la Porte Sud cède avec un cri métallique qui résonne dans les profondeurs comme un avertissement. Au-delà, un escalier de pierre taillée — vingt marches, trente peut-être — s'enfonce dans une obscurité si épaisse qu'elle semble solide. Votre torche n'éclaire que trois marches devant vous. Le reste n'est que ténèbres.

Vous descendez. L'air change immédiatement. En quelques marches, la chaleur du soleil de Sol-Aureus disparaît, remplacée par un froid humide qui colle à la peau comme une toile d'araignée. L'atmosphère est lourde, saturée d'humidité, et chargée d'une odeur complexe — la moisissure verte et grasse des pierres anciennes, la puanteur douceâtre des eaux usées, et DESSOUS, comme une note de fond que vous ne devriez pas pouvoir sentir, quelque chose de métallique. Du fer chauffé à blanc. Du soufre. L'odeur d'un endroit qui n'appartient pas à ce monde.

Le pied de l'escalier débouche sur un réseau de tunnels voûtés en briques rouges noircies par les siècles. La maçonnerie est ancienne — impériale, reconnaissable à ses arcs en plein cintre et ses clés de voûte gravées du sceau de l'ancien Empire. Certaines briques se sont effondrées, révélant la roche brute derrière. De la mousse épaisse, presque noire, recouvre les murs jusqu'à hauteur de hanches. Quand vous la frôlez, elle est FROIDE — bien plus froide que l'air ambiant.

Une eau brunâtre, opaque, paresseuse, coule lentement au sol, formant un ruisseau d'une dizaine de centimètres qui vous arrive aux chevilles. Chaque pas produit un clapotis qui se répercute dans les tunnels, multiplié par les échos, donnant l'impression que dix personnes marchent autour de vous. Le son de l'eau qui goutte du plafond — toc, toc, toc — est le seul autre bruit. Régulier. Hypnotique. Comme un métronome qui compterait le temps qui vous reste.

Vos torches projettent un halo vacillant qui révèle des détails que vous préféreriez ne pas voir : des graffitis anciens sur les murs — des noms de travailleurs, des dates, un cœur percé d'une flèche — et plus récemment, des GRIFFURES. Quatre sillons parallèles, gravés dans la brique, à hauteur de poitrine. Profonds. Réguliers. Pas des griffures de rat.

Puis quelque chose change.

Votre ombre — votre propre ombre, projetée par votre torche sur le mur en face — se fige. Vous bougez votre bras. L'ombre ne bouge pas. Vous faites un pas. L'ombre reste immobile. Puis, lentement, très lentement, elle commence à glisser. Pas dans la direction de votre mouvement. Dans la direction OPPOSÉE. Vers l'obscurité. Comme si quelque chose, dans le noir, la TIRAIT.

La température chute de cinq degrés en trois secondes. Votre souffle forme un nuage blanc. La flamme de votre torche vacille, raccourcit, devient bleue à sa base. Et dans le noir absolu, au bout du tunnel, à vingt mètres peut-être — deux points rouges s'allument. Pas des flammes. Pas des reflets. Des YEUX. Qui vous regardent avec une intelligence froide et affamée.

Puis deux autres paires s'allument. À droite. À gauche. Vous êtes encerclés.`,
    gmNotes: `COMBAT : 3 Démons d'Ombre (CR 2 chacun). Utilisez le bestiaire pour les stats. Ils attaquent en meute — un attire l'attention de front, les deux autres flanquent. Si les joueurs utilisent de la lumière radieuse, les démons reculent et perdent leurs actions de réaction. Après le combat, les joueurs trouvent le symbole de Sceau gravé dans la pierre. Un jet d'Investigation DC 15 révèle que le symbole est fissuré de manière non naturelle — c'est du sabotage.`,
    dialogues: [],
    objectives: [
      { description: 'Explorer le réseau d\'égouts jusqu\'au collecteur central', type: 'explore', optional: false },
      { description: 'Vaincre les 3 Démons d\'Ombre', type: 'combat', optional: false },
      { description: 'Examiner le symbole de Sceau fissuré', type: 'investigate', optional: false }
    ],
    transitions: [
      { condition: 'Victoire et symbole examiné', nextScene: 'ch1_s3b_poursuite', label: '→ Poursuite dans les tunnels' }
    ],
    skillChecks: [
      { skill: 'Perception', dc: 12, success: 'Vous remarquez que les ombres bougent anormalement AVANT que les démons n\'attaquent — pas de surprise.', failure: 'Les démons surgissent de l\'obscurité — jet d\'Initiative avec Surprise pour les ennemis.' },
      { skill: 'Investigation', dc: 15, success: 'Le symbole gravé montre des marques de ciseau récentes. Quelqu\'un a VOLONTAIREMENT fissuré ce Sceau. Ce n\'est pas de l\'usure naturelle.', failure: 'Le symbole est étrange mais vous ne pouvez pas en tirer de conclusion.' },
      { skill: 'Arcanes', dc: 13, success: 'Vous ressentez une énergie résiduelle de magie noire autour du Sceau. Un rituel de profanation a été effectué ici récemment.', failure: 'L\'énergie magique est trop diffuse pour être analysée.' }
    ],
    encounters: ['3x Démon d\'Ombre (CR 2)'],
    loot: ['Essence d\'Ombre (composant alchimique)', 'Médaillon cultiste brisé'],
    estimatedMinutes: 25, mood: 'horreur',
    music: 'Souterrain — eau qui goutte, échos sinistres', location: 'Sol-Aureus — Égouts, Collecteur Central'
  },
  // ===== NOUVELLE SCÈNE : Poursuite d'un cultiste =====
  {
    id: 'ch1_s3b_poursuite', chapterId: 'ch1', sceneNumber: 3.5,
    title: 'La Silhouette dans les Tunnels', type: 'exploration',
    readAloud: `Le silence qui suit le combat est presque pire que le bruit. L'écho du dernier cri d'ombre — ce sifflement aigu, comme du cristal qui se brise — met de longues secondes à mourir dans les tunnels. Le sol est couvert de résidus noirs et fumants, là où les démons se sont dissous. La substance ressemble à de l'encre de seiche mélangée à de la cendre, et elle dégage une odeur âcre de soufre brûlé qui vous pique les yeux.

Votre respiration est forte dans le silence soudain. Le sang bat dans vos oreilles. Vos mains — celles qui tiennent encore vos armes — tremblent légèrement. L'adrénaline reflue.

C'est alors qu'un mouvement furtif attire votre attention.

Plus loin dans le tunnel, à la limite de la portée de votre torche, une silhouette se détache d'une alcôve que vous n'aviez pas remarquée. Une forme humaine — pas d'ombre, pas de monstre. HUMAINE. Mince, de taille moyenne, vêtue d'une robe sombre capuchonnée. Un instant, la lueur vacillante de votre torche accroche un éclat métallique à son cou : une broche. En forme de miroir. Un miroir BRISÉ.

La silhouette vous voit. Se fige. Et dans le silence des égouts, une voix jaillit — aiguë, paniquée, cassée par la terreur :

"ILS SAVENT ! Ils ont tué les gardiens ! FUYEZ !"

La silhouette pivote et s'élance dans l'obscurité avec une vitesse surprenante. Vous entendez des bruits de pas éclaboussant l'eau — rapides, frénétiques — puis le claquement métallique d'une grille qui s'ouvre et se referme. Le son d'une clé qui tourne dans une serrure rouillée. Et le silence. Complet.

Devant vous, le tunnel se divise en trois branches béantes. Trois gueules noires qui exhalent des courants d'air de températures différentes — la gauche est tiède et sent les eaux usées ; le centre est glacial et silencieux ; la droite est fraîche et vous percevez un courant d'air vif, comme si elle menait vers l'extérieur. L'eau au sol forme des flaques inégales, et dans l'une d'elles, à l'entrée de la branche droite, un morceau de tissu noir flotte doucement — arraché par la course du fuyard, pris dans un clou rouillé qui dépasse du montant de pierre.`,
    gmNotes: `Scène de course-poursuite optionnelle qui récompense les joueurs proactifs. Le cultiste (un acolyte de rang inférieur nommé Havel) tente de fuir vers la sortie Est des égouts. Les joueurs doivent choisir la bonne branche du tunnel : Survie DC 13 (empreintes dans la boue), Perception DC 14 (écouter les pas), ou Investigation DC 12 (le morceau de tissu indique la branche droite — il y a un clou rouillé sur le montant droit). S'ils le rattrapent, Havel supplie pour sa vie et lâche des informations partielles sur le culte. S'il s'échappe, les joueurs trouvent quand même son journal dans l'alcôve d'où il est parti. Dans les deux cas, ils obtiennent le nom "Malachi" et l'existence d'un "cercle de sept" — des références aux Sceaux.`,
    dialogues: [
      {
        npcId: 'npc_havel', npcName: 'Havel (Cultiste capturé)',
        lines: [
          { trigger: 'Captured — Supplique', text: `*À genoux, en larmes.* Ne me tuez pas ! Je... je ne suis personne ! Un messager, c'est tout ! Je porte les ordres, je ne comprends même pas la moitié de ce qu'ils signifient !`, tone: 'terreur' },
          { trigger: 'Qui est Malachi', text: `*Il tremble.* Le Maître. Malachi le Déchiré. Il... il dit que les Sceaux sont une prison injuste, que l'Ombre mérite d'être libérée. Je... je l'ai cru. Il était si convaincant. Mais ces créatures — *il regarde les restes des démons* — je ne savais pas qu'il y aurait DES MONSTRES !`, tone: 'panique' },
          { trigger: 'Les objectifs du culte', text: `Briser les Sept Sceaux. C'est tout ce que je sais. Il y en a partout — sous les villes, dans les montagnes, les forêts. *Il se recroqueville.* Celui-ci était le premier. La preuve que c'était possible. Maintenant Malachi va frapper les autres. Vite. Il dit que le Miroir doit s'ouvrir avant la prochaine éclipse.`, tone: 'résigné' }
        ]
      }
    ],
    objectives: [
      { description: 'Poursuivre le cultiste dans les tunnels', type: 'explore', optional: false },
      { description: 'Choisir la bonne branche du tunnel', type: 'special', optional: false },
      { description: 'Capturer ou retrouver les indices du cultiste', type: 'investigate', optional: false }
    ],
    transitions: [
      { condition: 'Cultiste capturé ou journal trouvé', nextScene: 'ch1_s4_rapport', label: '→ Retour faire rapport' }
    ],
    skillChecks: [
      { skill: 'Survie', dc: 13, success: 'Des traces fraîches dans la boue mènent vers la branche droite. Vous gagnez un round d\'avance.', failure: 'Les traces sont confuses. Vous perdez du temps à hésiter.' },
      { skill: 'Perception', dc: 14, success: 'Des pas qui s\'éloignent — branche droite, à environ 30 mètres. Et un bruit de clé dans une serrure.', failure: 'L\'écho rend les sons impossibles à localiser.' },
      { skill: 'Athlétisme', dc: 12, success: 'Vous rattrapez le fuyard en sprintant dans le tunnel étroit. Il trébuche sur un pavé descellé.', failure: 'Le fuyard est rapide malgré sa panique. Il vous distance et s\'échappe par une grille verrouillée.' }
    ],
    loot: ['Journal de Havel (mentions de Malachi et du "Cercle de Sept")', 'Broche du Miroir Brisé (symbole cultiste)'],
    estimatedMinutes: 12, mood: 'poursuite-tension',
    music: 'Course — percussions rapides, écho de pas', location: 'Sol-Aureus — Égouts, Tunnel Est'
  },
  {
    id: 'ch1_s4_rapport', chapterId: 'ch1', sceneNumber: 4,
    title: 'L\'Ampleur de la Menace', type: 'dialogue',
    readAloud: `La sortie des égouts est un choc sensoriel. Après des heures dans les ténèbres humides et froides, la lumière du soleil de Sol-Aureus vous frappe comme un mur blanc. Vous clignez des yeux, aveuglés, les pupilles douloureusement contractées. L'air frais — l'AIR FRAIS — emplit vos poumons et vous réalisez à quel point l'atmosphère souterraine était viciée. Vous respirez à pleins poumons, comme des noyés qui refont surface.

Vous êtes dans un état lamentable. Vos vêtements sont trempés d'eau d'égout brunâtre, vos bottes clapotent à chaque pas, et des traînées de sang noir — le sang des démons d'ombre, qui sèche en formant une croûte brillante comme de l'obsidienne — maculent vos armes et vos bras. L'odeur que vous dégagez est suffisante pour dégager un rayon de trois mètres autour de vous.

Les passants de la rue commerciale s'arrêtent pour vous dévisager. Une marchande de fleurs se bouche le nez avec un mouchoir de dentelle. Deux gamins vous montrent du doigt en pouffant. Un garde municipal fait un pas vers vous, hésite, puis décide que vous n'êtes pas de son ressort. Un vieux chien errant vous renifle brièvement puis s'éloigne, visiblement déçu — même lui trouve que vous sentez mauvais.

À la Caserne du Soleil Levant, l'accueil est différent. Les gardes de faction vous reconnaissent immédiatement — votre apparence parle d'elle-même. L'un d'eux court prévenir le Général tandis que l'autre vous tend une gourde d'eau. "Le Général vous attend. Premier étage, bureau du fond."

Le bureau du Général Marcus est spartiate — une table de chêne, deux chaises, une carte de Sol-Aureus punaisée au mur, et un support d'armure dans un coin. Marcus est debout derrière sa table. Quand vous posez le médaillon cultiste — cette broche en forme de miroir brisé — devant lui, son visage change. Pas de surprise. Quelque chose de pire : de la RECONNAISSANCE. Comme s'il avait espéré ne jamais revoir ce symbole.

Il prend le médaillon. Le retourne entre ses doigts épais. Puis il lève les yeux vers vous avec une expression que vous ne lui avez pas encore vue : de la peur, contenue mais réelle, derrière le masque du commandement.

Il se tourne vers son aide de camp, un jeune lieutenant pâle comme un linge :

"Envoyez un message à la Reine. Immédiatement. Code Vermillon. Et fermez la porte."`,
    gmNotes: `Cette scène conclut le chapitre 1 et pose les enjeux pour la suite. Marcus est visiblement inquiet — c'est la première fois que les joueurs le voient montrer de l'émotion. La convocation par la Reine Elara est l'accroche vers le Chapitre 2. Distribuez les récompenses et laissez les joueurs se reposer avant le prochain chapitre.`,
    dialogues: [
      {
        npcId: 'npc_general_marcus', npcName: 'Général Marcus',
        lines: [
          { trigger: 'Rapport', text: `*Il retourne le médaillon cultiste dans ses mains, le visage fermé.* Un sceau fissuré. Des créatures d'ombre. Un médaillon cultiste. C'est le troisième incident cette semaine. Et celui-ci est le pire. *Il se lève.* Vous avez fait du bon travail.`, tone: 'sombre' },
          { trigger: 'La suite', text: `Ce n'est plus de mon ressort. *Il soupire.* Ces sceaux, cette magie ancienne... c'est au-dessus de mon grade. La Reine Elara doit être informée. Attendez-vous à être convoqués au Palais d'ici demain matin. Reposez-vous. Je sens que les prochains jours seront... longs.`, tone: 'résigné' },
          { trigger: 'Récompense', text: `*Il pousse une bourse vers vous.* 500 pièces d'or, comme promis. Et le titre de Défenseurs des Égouts — ça vous ouvrira quelques portes en ville. *Petit sourire.* Dépensez-les bien. Vous les avez mérités.`, tone: 'respectueux' }
        ]
      }
    ],
    objectives: [
      { description: 'Rapporter le médaillon et le rapport au Général Marcus', type: 'talk', optional: false },
      { description: 'Recevoir la récompense et le titre', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Rapport effectué — FIN DU CHAPITRE 1', nextScene: 'ch2_s1_audience', label: '→ Chapitre 2 : Audience avec la Reine' }
    ],
    loot: ['500 PO', 'Titre : Défenseurs des Égouts', '+10 Réputation Couronne Sol-Aureus'],
    estimatedMinutes: 10, mood: 'transition',
    music: 'Héroïque subtil — cordes, espoir prudent', location: 'Sol-Aureus — Caserne du Soleil Levant'
  }
];

export const CHAPTER_1: NarrativeChapter = {
  id: 'ch1', number: 1, title: 'Signes Précurseurs',
  subtitle: 'Premiers pas dans l\'ombre',
  summary: 'Les héros découvrent les premiers signes d\'une menace souterraine à Sol-Aureus. Enquête, combat dans les égouts, et découverte d\'un culte voué à briser les Sceaux.',
  suggestedLevel: 1, region: 'Sol-Aureus',
  themes: ['Introduction', 'Mystère', 'Premier combat', 'Enquête urbaine'],
  scenes: CH1_SCENES, nextChapter: 'ch2'
};
