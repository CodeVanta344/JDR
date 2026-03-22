/**
 * CHAPITRE 2 : LA COUR D'OR (Niveau 3-4)
 * 6 scènes — Audience royale, voyage, enquête politique, embuscade
 */
import type { NarrativeScene, NarrativeChapter } from './types';

const CH2_SCENES: NarrativeScene[] = [
  {
    id: 'ch2_s1_audience', chapterId: 'ch2', sceneNumber: 1,
    title: 'L\'Audience Royale', type: 'dialogue',
    readAloud: `Le Palais de la Couronne d'Or se dresse au sommet de Sol-Aureus comme la promesse d'un empire qui ne mourra jamais. Ses murs de marbre blanc veiné d'or rose s'élèvent sur cinq étages, percés de fenêtres en ogive dont les vitraux projettent des arcs-en-ciel sur les jardins suspendus. Des colonnes corinthiennes — sculptées de vignes, de lions et de soleils — encadrent une entrée grande comme la gueule d'un dragon. Au-dessus, un dôme doré si brillant qu'il semble rivaliser avec le soleil lui-même, et que les paysans des champs alentour utilisent comme point cardinal.

Des gardes en armure cérémonielle — cuirasse dorée, capes de velours pourpre, hallebardes au garde-à-vous — vous escortent à travers un dédale de couloirs qui sentent la cire d'abeille et le bois de cèdre. Sous vos pieds, le marbre est si poli qu'il reflète votre image comme un miroir. Des tapisseries géantes couvrent les murs — des scènes de batailles légendaires, des couronnements, le Traité des Sept Races tissé en fils d'or et d'argent. Vos pas résonnent dans un silence respectueux, brisé seulement par le murmure lointain des fontaines intérieures.

La Salle du Trône s'ouvre devant vous comme une cathédrale de lumière. Le plafond — quinze mètres de haut au moins — est une fresque représentant la création d'Aethelgard, peinte dans des bleus célestes et des ors chauds. Sept colonnes de quartz transparent flanquent un tapis de soie écarlate qui mène au trône — un siège massif sculpté dans un seul bloc de quartz doré qui irradie une lumière tiède, comme si le cristal captait la chaleur du soleil et la restituait.

La Reine Elara est assise sur ce trône. Une femme d'une quarantaine d'années, ni grande ni petite, mais dotée d'une présence qui remplit la pièce. Ses cheveux châtains, striés de gris prématuré, sont tressés en couronne autour de sa tête. Ses yeux — gris-bleu, percçants, du même acier que les épées de sa garde — vous détaillent avec l'efficacité d'un chirurgien. Elle porte une robe de velours bleu nuit bordée d'hermine, et ses mains fines sont posées sur les accoudoirs du trône avec une immobilité calculée.

À sa droite, le Général Marcus, en armure de parade, le visage fermé. À sa gauche, une figure que vous ne connaissez pas : une elfe en robe de voyage vert forêt, ses longs cheveux argentés tressés avec des feuilles vivantes. Elle porte un arc en bois blanc sur l'épaule et vous observe avec une curiosité franche, la tête légèrement inclinée, comme un faucon évaluant une proie potentielle.

La Reine parle. Sa voix est basse, claire, et porte sans effort dans l'immensité de la salle :

"Approchez. Le Général m'a rapporté vos exploits dans les égouts de cette cité. Je suis... impressionnée et inquiète en égale mesure."`,
    gmNotes: `Scène politique cruciale. La Reine Elara est intelligente et directe. Elle présente Lysandra — une éclaireur elfe de la Sylve d'Émeraude envoyée pour enquêter sur des perturbations similaires près de la forêt elfique. Lysandra est un PNJ compagnon qui accompagne le groupe à partir de maintenant. La Reine donne la mission : voyager vers la Forêt de Murmures pour enquêter sur le Sceau de la Sylve. Insight DC 12 pour lire l'inquiétude de la Reine — elle cache quelque chose (elle a reçu des rapports d'autres régions montrant des problèmes similaires). Si les joueurs posent les bonnes questions, elle partage cette information.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara', npcName: 'Reine Elara',
        lines: [
          { trigger: 'Ouverture', text: `Le Général Marcus me dit que vous avez affronté des créatures d'ombre dans nos égouts et découvert un symbole de Sceau profané. *Elle se penche en avant.* Savez-vous ce que sont les Sceaux, aventuriers ? Ce sont les verrous qui tiennent en cage l'horreur elle-même. Et quelqu'un est en train de les ouvrir.`, tone: 'grave' },
          { trigger: 'La mission', text: `Je vous envoie dans la Forêt de Murmures, à trois jours de route au nord-est. Nos éclaireurs rapportent des phénomènes similaires : ombres vivantes, animaux fuient la forêt, et un silence anormal dans les profondeurs. Le Sceau de la Sylve s'y trouve — et je veux savoir s'il est intact.`, tone: 'autoritaire' },
          { trigger: 'Lysandra', text: `*Elle désigne l'elfe.* Lysandra vous accompagnera. C'est une éclaireur de talent et elle connaît les bois. Les Elfes de la Sylve d'Émeraude ont ressenti des "perturbations" dans le tissu magique du monde. Ce n'est pas une coïncidence. Traitez-la comme votre égale.`, tone: 'diplomatique' },
          { trigger: 'Récompense', text: `La Couronne financera votre expédition — provisions, équipement, montures si nécessaire. Et en cas de succès, vous recevrez 1000 pièces d'or et le Titre de Sentinelles des Sceaux. C'est un honneur qui n'a pas été décerné depuis 120 ans.`, tone: 'formelle' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Présentation', text: `*Elle incline la tête — un salut elfique sobre.* Je suis Lysandra des Bois Profonds. Mon peuple a senti le tremblement dans les racines du monde. Ce n'est pas un phénomène local — c'est systémique. Quelque chose de fondamental est en train de changer.`, tone: 'calme-analytique' },
          { trigger: 'Sa spécialité', text: `Je suis archère et pisteur. Et j'ai étudié les Sceaux dans nos archives. Ce que vous avez trouvé dans les égouts est un "Rejeton d'Ombre" — une manifestation de faible puissance. Si le Sceau de la Forêt est atteint... nous verrons bien pire.`, tone: 'professionnelle' },
          { trigger: 'Les Elfes', text: `Mon peuple ne parle plus aux "peuples courts" depuis des décennies. Je suis ici contre l'avis de mon Conseil. Mais certaines menaces transcendent les querelles politiques. *Petit sourire.* Ne me faites pas regretter d'être venue.`, tone: 'pince-sans-rire' }
        ]
      }
    ],
    objectives: [
      { description: 'Assister à l\'audience royale', type: 'talk', optional: false },
      { description: 'Faire connaissance avec Lysandra', type: 'talk', optional: false },
      { description: 'Accepter la mission vers la Forêt de Murmures', type: 'talk', optional: false }
    ],
    transitions: [
      { condition: 'Mission acceptée', nextScene: 'ch2_s1b_preparation', label: '→ Préparatifs à Sol-Aureus' }
    ],
    skillChecks: [
      { skill: 'Perspicacité', dc: 12, success: 'La Reine cache quelque chose — ses mains serrent les accoudoirs du trône. Elle a reçu d\'autres rapports alarmants.', failure: 'La Reine semble confiante et en contrôle.' }
    ],
    loot: ['Lettre de Mission Royale (laissez-passer)', 'Sceau de la Couronne (accès aux dépôts militaires)'],
    estimatedMinutes: 15, mood: 'politique-solennelle',
    music: 'Cour royale — cuivres majestueux, harpe', location: 'Sol-Aureus — Palais de la Couronne d\'Or'
  },
  // Nouvelle scène : Préparatifs
  {
    id: 'ch2_s1b_preparation', chapterId: 'ch2', sceneNumber: 1.5,
    title: 'Préparatifs au Bazar des Aventuriers (Optionnel)', type: 'exploration',
    readAloud: `Le Bazar des Aventuriers occupe une ancienne écurie impériale reconvertie en marché couvert — un espace immense de pierre et de bois, éclairé par des puits de lumière percés dans le toit. L'air sent le cuir neuf, l'huile d'arme, la poudre de magnésie et cette odeur indéfinissable de l'aventure en préparation — un mélange d'excitation et de peur.

Les étals sont tenus par des vétérans et des artisans qui connaissent leur clientèle : des gens qui risquent leur vie pour gagner la leur. Un alchimiste halfling — un petit homme rondouillard dont les doigts sont tachés de bleu, de vert et de violet, comme la palette d'un peintre fou — jongle avec des fioles en criant ses prix. À côté, un forgeron nain au tablier de cuir épais frappe un métal rougeoyant avec des coups réguliers qui résonnent dans toute la halle — chaque étincelle jaillit comme une étoile filante miniature. Plus loin, dans un recoin sombre noyé de fumée d'encens, une vieille femme au regard blanc et percçant dispose des composants magiques sur un tissu de velours noir : des fioles d'herbes, des cristaux fumants, des os gravés de runes, et quelque chose qui ressemble à un œil séché.

Aux écuries royales, attenantes au Bazar, Lysandra vous attend déjà, accroupie près d'un seau d'eau. Elle affûte ses flèches avec une patience mécanique — l'éclair régulier de la pierre à aiguiser sur la pointe de mithral est hypnotique. Mais ses yeux d'ambre ne regardent pas ses flèches. Ils scrutent les ombres des ruelles adjacentes avec une vigilance d'animal sauvage. Quand elle vous voit, un micro-sourire — le premier — effleure ses lèvres avant de disparaître. "Vous êtes en retard. J'ai inspecté les montures. Le cheval pie a un mauvais caractère. Il est pour vous."`,
    gmNotes: `Scène de shopping/préparation optionnelle mais utile. L'alchimiste Pip vend des potions de soin (50 PO chacune, max 3), des antidotes (25 PO), et un "Élixir de Clarté" (+2 aux jets de Perception pendant 1h, 75 PO). Le forgeron Durinn (cousin éloigné du Thane Durinn de Hammerdeep) peut argenter une arme pour 100 PO (efficace contre certains morts-vivants). La vieille Sybilla vend la "Poussière de Révélation" (200 PO, révèle les créatures invisibles dans un rayon de 3m). Si les joueurs lui parlent des Sceaux, Sybilla dit quelque chose de cryptique : "Les Sept dormaient. Quelqu'un a chanté la berceuse à l'envers." Elle refuse d'en dire plus.`,
    dialogues: [
      {
        npcId: 'npc_pip', npcName: 'Pip l\'Alchimiste',
        lines: [
          { trigger: 'Catalogue', text: `*Un halfling tout sourire, couvert de taches de potion.* Potions de soin ? J'en ai trois de première fraîcheur ! Antidotes pour les venins de forêt — toujours utile dans les bois. Et mon spécial du jour : l'Élixir de Clarté ! Vous verrez dans le noir comme un chat !`, tone: 'commercial-enthousiaste' }
        ]
      },
      {
        npcId: 'npc_sybilla', npcName: 'Sybilla la Devineresse',
        lines: [
          { trigger: 'Les Sceaux', text: `*Ses yeux blancs vous fixent.* Vous portez l'odeur de l'Ombre. Récente. Fraîche. *Elle saisit votre main.* Les Sept dormaient. Quelqu'un a chanté la berceuse à l'envers. Et maintenant les rêveurs se réveillent... *Elle vous lâche.* Partez. Et prenez ça — vous en aurez besoin.`, tone: 'prophétique' }
        ]
      }
    ],
    objectives: [
      { description: 'Acheter de l\'équipement au Bazar', type: 'explore', optional: true },
      { description: 'Parler à Sybilla (indice cryptique)', type: 'talk', optional: true }
    ],
    transitions: [
      { condition: 'Préparatifs terminés', nextScene: 'ch2_s2_voyage', label: '→ Départ vers la Forêt de Murmures' }
    ],
    estimatedMinutes: 10, mood: 'préparation',
    music: 'Bazar — bruits de forge, discussions animées', location: 'Sol-Aureus — Bazar des Aventuriers'
  },
  {
    id: 'ch2_s2_voyage', chapterId: 'ch2', sceneNumber: 2,
    title: 'La Route de la Forêt', type: 'exploration',
    readAloud: `Les portes de Sol-Aureus se referment derrière vous avec un bruit sourd qui résonne comme un point final. Devant, la Route du Nord s'étend — un ruban de terre battue qui serpente à travers les plaines dorées d'Aethelgard.

Le premier jour est une bénédiction. Le soleil est chaud sans brûler, le vent apporte l'odeur suave du blé mûr et des coquelicots sauvages. Des champs dorés s'étendent jusqu'à l'horizon, ondulés comme un océan végétal par la brise. Vous traversez des villages aux toits de chaume où des paysans bronzés saluent votre convoi en levant leurs chapeaux de paille. Des enfants courent à côté de vos chevaux en riant. Un berger joue du pipeau sur une colline. La vie, ordinaire et belle.

Le deuxième jour, la route monte. Les champs de blé cèdent la place à des collines boisées couvertes de chênes et de hêtres. L'air fraîchit. Les villages s'espacement. Et vous croisez les premiers réfugiés — une famille de bûcherons, le père portant sa fille endormie sur son dos, la mère tirant une charrette chargée de leurs maigres possessions. Leurs visages sont gris de fatigue et de peur.

Le troisième jour, vous voyez la forêt.

Elle apparaît à l'horizon comme un mur. Pas une lisière graduelle — un MUR de troncs anciens, de chênes gigantesques et de pins si denses et si hauts que la lumière du soleil semble mourir à leur pied. La Forêt de Murmures est vaste — elle s'étend sur des kilomètres dans les deux directions, barrant l'horizon comme une barricade dressée par la nature elle-même. Et même à un kilomètre de distance, vous l'ENTENDEZ. Un chuchotement constant, continu, omnidirectionnel — comme si les arbres eux-mêmes conversaient dans un langage de frémissements et de craquements. Des murmures de bois vivant.

Lysandra s'arrête à la lisière. Son cheval piaffe, les oreilles plaquées en arrière, les naseaux flarés. Elle descend de selle et pose sa main sur le tronc du premier arbre — un chêne colossal dont l'écorce est si profondément sillonne que chaque ride raconte un siècle. Ses yeux d'ambre se ferment. Quand elle les rouvre, ils sont humides.

"D'habitude, la forêt accueille les voyageurs avec le chant des oiseaux. Les mésanges d'argent, les merles-lunes, les piverts d'or. Aujourd'hui..." Elle tend l'oreille. Le silence est total — pas un pépiement, pas un battement d'ailes, pas un cri. Rien que les murmures. "C'est mauvais signe. C'est très mauvais signe."`,
    gmNotes: `Voyage de 3 jours avec un événement aléatoire par jour possible. Jour 1 : Tranquille (utilisez pour le roleplay avec Lysandra — elle partage des légendes sur les Sceaux). Jour 2 : Rencontre avec des réfugiés fuyant la forêt (un bûcheron et sa famille). Le bûcheron dit que "les arbres bougent la nuit" (c'est la magie corrompue des Sceaux qui anime la végétation). Jour 3 : Arrivée à la lisière — Perception DC 12 pour repérer des griffures d'ombre sur les premiers arbres. Survie DC 13 pour identifier des traces de passage de créatures d'ombre (pas de pieds mais des marques de griffe qui entament la pierre comme du beurre).`,
    dialogues: [
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Les Sceaux', text: `Mon peuple raconte que les Sept Sceaux ont été posés par l'Alliance des Sept — sept héros de races différentes qui ont sacrifié une part de leur vie pour emprisonner le Seigneur des Ombres dans le Plan Ombre. Chaque sceau est ancré dans un lieu de pouvoir : une forêt, une montagne, un lac, un temple...`, tone: 'narrative' },
          { trigger: 'Sa motivation', text: `*En regardant le feu de camp.* Je suis la dernière de ma lignée. Mes parents sont morts quand j'avais vingt ans — vingt ans elfique, c'est l'équivalent de six ans humain. La forêt m'a élevée. Si l'Ombre la détruit... je n'aurai plus de foyer.`, tone: 'vulnérable' },
          { trigger: 'La Forêt', text: `La Forêt de Murmures est un lieu ancien. Les arbres ici ont mille ans. Ils se souviennent de l'Ère des Cendres. *Elle pose sa main sur un tronc.* Écoutez... les murmures sont différents. Plus... urgents. Comme un appel à l'aide.`, tone: 'inquiète' }
        ]
      },
      {
        npcId: 'npc_bucheron', npcName: 'Aldric le Bûcheron',
        lines: [
          { trigger: 'Fuite', text: `*Un homme massif au visage livide, sa femme et ses deux enfants serrés contre lui.* Ne prenez PAS cette route ! La forêt est devenue folle ! Les arbres bougent la nuit — pas à cause du vent, ils MARCHENT. Et j'ai vu... des choses dans les ombres. Des choses avec des yeux. On est parti en pleine nuit, avec ce qu'on pouvait porter.`, tone: 'terrorisé' },
          { trigger: 'Le sanctuaire', text: `Il y a un vieux sanctuaire au centre de la forêt. Avant, c'était un lieu saint — les druides y allaient pour méditer. Maintenant ? La dernière personne à s'en être approchée est revenue... changée. Elle ne parlait plus. Elle fixait le vide. Et ses yeux... *il frissonne* ... ses yeux étaient devenus noirs.`, tone: 'hanté' }
        ]
      }
    ],
    objectives: [
      { description: 'Voyager jusqu\'à la Forêt de Murmures (3 jours)', type: 'travel', optional: false },
      { description: 'En apprendre plus sur les Sceaux avec Lysandra', type: 'talk', optional: true },
      { description: 'Recueillir le témoignage des réfugiés', type: 'talk', optional: true }
    ],
    transitions: [
      { condition: 'Arrivée à la lisière de la forêt', nextScene: 'ch2_s3_foret', label: '→ Dans la Forêt de Murmures' }
    ],
    skillChecks: [
      { skill: 'Perception', dc: 12, success: 'Des griffures profondes marquent les premiers arbres — des entailles noires qui suintent une sève sombre et épaisse.', failure: 'La lisière semble normale, juste anormalement silencieuse.' },
      { skill: 'Survie', dc: 13, success: 'Vous identifiez des traces de passage de créatures non-naturelles — pas d\'empreintes mais des marques de griffe dans la pierre.', failure: 'Le sol est couvert de feuilles mortes — impossible de lire les traces.' }
    ],
    estimatedMinutes: 15, mood: 'voyage-tension',
    music: 'Voyage — paysages ouverts puis forêt menaçante', location: 'Route de Sol-Aureus à la Forêt de Murmures'
  },
  {
    id: 'ch2_s3_foret', chapterId: 'ch2', sceneNumber: 3,
    title: 'Les Murmures Corrompus', type: 'exploration',
    readAloud: `Sous la canopée de la Forêt de Murmures, le monde change comme si vous aviez franchi un seuil invisible. En trois pas, la lumière du soleil se réduit à des rayons épars qui percent le feuillage avec difficulté — des colonnes de lumière dorée dans lesquelles dansent des particules de poussière et de pollen. Mais la lumière est malade. Elle a une teinte verdâtre, comme filtrée à travers du verre sale.

L'air est lourd, humide, saturé d'une brume basse qui rampe entre les troncs comme un animal prudent. L'odeur est double : dessus, la mousse humide et le bois mort, familière et forestière ; dessous, quelque chose d'autre — l'ozone, comme avant un orage violent, mêlé à une note doucâtre de pourriture que la mousse ne parvient pas à masquer. Votre peau picote. Vos cheveux se dressent légèrement, comme chargés d'électricité statique.

Les murmures sont partout. Plus le doux chuchotement mélodieux que Lysandra décrivait — c'est un bourdonnement grave, presque mécanique, qui vibre dans vos os et dans vos dents. Il monte et descend par vagues, comme la respiration d'un être immense. De temps en temps, un gémissement s'élève d'un bosquet sombre — pas le vent, pas un animal. Une voix. Humaine, ou presque. Étouffée, comme criée derrière un bâillon de terre. Puis le silence. Puis le gémissement reprend, ailleurs.

Les arbres eux-mêmes semblent malades. L'écorce est craquelée, suintante d'une sève sombre presque noire. Des branches entières sont mortes, dépouillées de feuilles, dressées vers le ciel grisâtre comme des mains squelettiques. Le sol est couvert de feuilles mortes — mais elles ne craquent pas sous vos pieds. Elles sont molles, humides, en décomposition avancée, et sentent le compost aigre. Des champignons noirs, difformes, poussent en grappes sur les racines — des variétés que même Lysandra ne reconnaît pas.

Lysandra avance prudemment devant vous, arc bandé, une flèche encochée. Chaque pas est calculé, silencieux — un savoir-faire elfique qui contraste avec le craquement constant de la forêt autour d'elle. Son visage est un masque de concentration, mais sa mâchoire est serrée, et le blanc de ses doigts sur la corde de l'arc trahit une tension profonde.

"Les esprits de la forêt sont en souffrance," murmure-t-elle sans se retourner. Sa voix est basse, tendue, comme si elle avait peur de déranger quelque chose. "Quelque chose les... torture. Chaque arbre que nous passons crie en silence. Vous ne l'entendez pas. Moi, oui."`,
    gmNotes: `Exploration de la forêt corrompue. 3 rencontres possibles : 1) Un esprit de la forêt (Dryade affaiblie) qui supplie les joueurs de sauver le Sceau — elle indique le chemin et prévient du Nécromancien. 2) Un piège naturel (racines animées par la corruption, Dextérité DC 13 pour éviter, 2d6 dégâts contondants). 3) Des animaux corrompus (2x Loups d'Ombre, CR 1) — regardez si les joueurs préfèrent combattre ou calmer les animaux (Dressage DC 14).`,
    dialogues: [
      {
        npcId: 'npc_dryade', npcName: 'Élanor (Dryade)',
        lines: [
          { trigger: 'Apparition', text: `*Une forme féminine translucide, faite de feuilles et de lumière mourante, se matérialise devant vous. Sa voix est comme le vent dans les branches.* Mortels... vous êtes venus. Enfin. Le Sceau... il crie. Comme nous crions. L'homme en noir l'a touché avec un rituel de mort. La corruption se répand...`, tone: 'souffrante' },
          { trigger: 'Le Nécromancien', text: `Il est venu il y a sept jours. Un homme maigre, tout en os et en ombre. Il a planté un objet dans le sol du sanctuaire — un cristal noir qui pulse comme un cœur malade. Depuis... les arbres meurent. Les esprits meurent. Et les morts... les morts se lèvent.`, tone: 'terrifiée' },
          { trigger: 'Le chemin', text: `*Elle pointe vers le nord-est.* Le sanctuaire est à deux heures de marche. Suivez la rivière asséchée — l'eau a fui la corruption. Mais attention... il a laissé des gardiens. Des os qui marchent. Des ombres qui mordent. *Sa forme vacille.* Je... ne peux plus tenir longtemps. Sauvez le Sceau. S'il vous plaît.`, tone: 'suppliante' }
        ]
      }
    ],
    objectives: [
      { description: 'Explorer la Forêt de Murmures corrompue', type: 'explore', optional: false },
      { description: 'Rencontrer la Dryade Élanor (guide vers le Sceau)', type: 'talk', optional: false },
      { description: 'Suivre la rivière asséchée vers le sanctuaire', type: 'travel', optional: false }
    ],
    transitions: [
      { condition: 'Route identifiée vers le sanctuaire', nextScene: 'ch2_s4_sanctuaire', label: '→ Le Sanctuaire Corrompu' }
    ],
    skillChecks: [
      { skill: 'Nature', dc: 13, success: 'La corruption suit un schéma — elle irradie depuis le centre de la forêt, comme une infection.', failure: 'La forêt est malade, mais vous ne pouvez pas en déterminer la cause exacte.' },
      { skill: 'Dextérité (JDS)', dc: 13, success: 'Vous esquivez les racines animées qui tentent de vous agripper.', failure: 'Les racines vous enserrent : 2d6 dégâts contondants et restrained jusqu\'au prochain tour.' }
    ],
    encounters: ['2x Loup d\'Ombre (CR 1) — optionnel'],
    estimatedMinutes: 20, mood: 'horreur-naturelle',
    music: 'Forêt corrompue — craquements, murmures déformés', location: 'Forêt de Murmures — Sentiers corrompus'
  },
  {
    id: 'ch2_s4_sanctuaire', chapterId: 'ch2', sceneNumber: 4,
    title: 'Le Sanctuaire Profané', type: 'combat',
    readAloud: `La rivière asséchée vous a guidés jusqu'ici — son lit de pierre grise, craquelé et aride, débouchant sur une clairière circulaire où la forêt elle-même semble reculer, comme si les arbres avaient peur de s'approcher.

Le sanctuaire se dresse au centre : un cercle de sept menhirs anciens, hauts de quatre mètres chacun, dressés dans un alignement parfait qui ne doit rien au hasard. Chaque menhir est gravé de runes dont la lumière s'est éteinte — des sillons noirs là où jadis pulsait de l'or. Le lierre qui les recouvrait est mort, desséché en crânes végétaux racornis. Le sol de la clairière est nu — pas d'herbe, pas de mousse, pas de vie. Juste de la terre grise et craquelée, comme brûlée de l'intérieur.

Au centre exact du cercle, la pierre plate du Sceau de la Sylve — un disque de granite d'un mètre cinquante de diamètre, gravé d'entrelacs druidiques d'une complexité vertigineuse. Et planté dans le Sceau, comme un poignard dans un cœur vivant, un cristal noir de la taille d'un avant-bras. Il pulse. Régulièrement. Lentement. Comme un cœur malade. À chaque pulsation, des veines d'obsidienne irradient depuis le cristal dans la pierre du Sceau, s'étendant un peu plus loin, un peu plus profond. Le Sceau se meurt sous vos yeux.

Debout devant le Sceau, un homme en robe sombre — une robe noire bordée de fil d'argent terni, les manches retroussées révélant des bras couverts de tatouages nécromantiques qui luisent faiblement d'un violet malsin — lève ses mains dans un geste rituel. Entre ses doigts, des fils de magie noire serpentent comme de la fumée vivante, se connectant au cristal. Autour de lui, six squelettes en armure rouillée montent la garde, immobiles comme des statues. Leurs orbites vides brillent d'une lueur rouge sang. Leurs épées noires sont tenues avec une précision qui ne doit rien au hasard — ces morts-là savent se battre.

L'homme se tourne lentement. Son visage est un masque de peau tendue sur un crâne trop visible — les joues creuses, les yeux enfoncés dans des orbites cercées de noir, les lèvres fines et exsangues. Un sourire s'étire sur ce visage cadavérique, révélant des dents trop nombreuses et trop pointues.

"Ah. Les petits héros de Sol-Aureus. Le Maître m'avait prévenu que vous viendriez." Sa voix est un murmure rauque, comme des feuilles mortes traînées sur du gravier. "Mais vous êtes en retard. Le rituel est presque achevé. Encore quelques minutes... et ce Sceau rejoindra l'oubli."`,
    gmNotes: `COMBAT MAJEUR : Le Nécromancien Voss (Clerc/Nécromancien niv.5, CR 4) + 6 Squelettes (CR 1/4). Voss tente de compléter le rituel — chaque round qu'il n'est pas interrompu, le Sceau se fissure davantage. Interrompre le rituel nécessite de vaincre Voss OU de retirer le Cristal Noir (Force DC 16 ou Religion DC 14 pour le purifier). Si le rituel est interrompu, le Sceau est endommagé mais pas brisé — les joueurs ont sauvé la forêt. Si le rituel aboutit (6 rounds), le Sceau se brise et un Démon d'Ombre Majeur apparaît (CR 5) — combat secondaire plus dur.

Après le combat, les joueurs trouvent le Fragment de Sceau et un message de Malachi à Voss.`,
    dialogues: [
      {
        npcId: 'npc_voss', npcName: 'Nécromancien Voss',
        lines: [
          { trigger: 'Provocation', text: `Vous pensez pouvoir arrêter ce qui arrive ? Chaque Sceau brisé rend le suivant plus facile. Le Maître a déjà frappé dans le Nord, dans les Montagnes. Vous n'êtes qu'une brindille devant la tempête.`, tone: 'méprisant' },
          { trigger: 'Vaincu', text: `*À genoux, du sang noir coulant de sa bouche.* Tuez-moi si vous voulez... ça ne changera rien. Le Miroir... va s'ouvrir. Le Maître... a promis l'immortalité à ceux qui servent... *Il s'effondre.* Je n'ai jamais eu peur... du noir.`, tone: 'fanatique' }
        ]
      }
    ],
    objectives: [
      { description: 'Interrompre le rituel de corruption du Sceau', type: 'combat', optional: false },
      { description: 'Vaincre le Nécromancien Voss', type: 'combat', optional: false },
      { description: 'Sauver le Sceau de la Sylve (ou limiter les dégâts)', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Sceau sauvé/stabilisé', nextScene: 'ch2_s4b_foret_guerit', label: '→ La forêt guérit' }
    ],
    encounters: ['Nécromancien Voss (CR 4)', '6x Squelette (CR 1/4)'],
    loot: ['Fragment de Sceau #1 (objet de quête)', 'Cristal Noir (preuve du culte)', 'Message de Malachi à Voss', '200 PO'],
    estimatedMinutes: 25, mood: 'combat-urgent',
    music: 'Nécromancien — orgue sombre, chœurs inversés', location: 'Forêt de Murmures — Sanctuaire du Sceau'
  },
  // Nouvelle scène : Guérison de la forêt
  {
    id: 'ch2_s4b_foret_guerit', chapterId: 'ch2', sceneNumber: 4.5,
    title: 'La Forêt Respire', type: 'narration',
    readAloud: `Le cristal noir résiste un instant — une seconde d'éternité où le monde semble retenir son souffle — puis il se brise entre vos mains avec un cri aigu, comme du verre trempé qui éclate. Des fragments d'obsidienne s'éparpillent en poussière qui se dissout avant de toucher le sol. Et le monde CHANGE.

C'est comme si quelqu'un avait ouvert une fenêtre dans une pièce étouffante. Un souffle d'air pur — le premier depuis votre entrée dans la forêt — traverse la clairière. La brume verdâtre hésite, vacille, puis se dissipe comme de la vapeur d'eau au soleil. Les murmures changent de tonalité — passant du gémissement douloureux qui vous hantait depuis des heures à un fredonnement doux, mélodieux, presque reconnaissant. Comme un soupir de soulagement poussé par un million de feuilles.

Les menhirs du sanctuaire réagissent les uns après les autres — une lumière dorée, faible mais réelle, s'allume dans les runes gravées, pulsant au rythme d'un cœur qui reprend ses battements. Le Sceau est fissuré — les veines noires que le cristal avait répandues sont toujours là, comme des cicatrices — mais la lumière dorée les contient, les empêche de s'étendre davantage. Le Sceau est blessé mais VIVANT.

Autour de vous, la forêt revient à la vie en accéléré. Les feuilles mortes frémissent et se redressent, retrouvant une nuance timide de vert. Un bourgeon éclot sur une branche que vous auriez jurée morte il y a dix minutes. La sève noire qui suintait des écorces se tarit, remplacée par un liquide ambre, sain. Et soudain — un son que vous n'avez pas entendu depuis trois jours : le chant d'un oiseau. Une mésange, quelque part dans la canopée, qui lance trois notes hesitantes dans le silence. Puis une autre répond. Puis dix. Le chant se répand comme une vague de joie à travers les branches.

Élanor la Dryade réapparaît au centre du cercle de menhirs. Elle est transformée — plus solide, plus lumineuse, les feuilles de son corps d'un vert vif au lieu du brun mourant de votre première rencontre. Ses yeux — deux émeraudes vivantes — brillent de larmes végétales, des gouttes de rosée qui roulent sur ses joues de mousse.

"Vous avez arrêté le mal," dit-elle, et sa voix n'est plus le murmure brisé d'avant mais le frémissement d'un bois de bouleaux au printemps. "Pas guéri la blessure — elle est trop profonde pour cela — mais arrêté la gangrène. Le Sceau vivra." Elle lève ses mains de feuilles et les pose sur vos fronts, l'un après l'autre. Son toucher est frais et vivant, comme la pluie de printemps sur un visage fatigué. "La forêt vous remercie. Et moi avec."`,
    gmNotes: `Scène de récompense et de transition. Élanor bénit les joueurs (Bénédiction de la Forêt : avantage au premier jet de Survie dans un environnement naturel, permanent). Elle confirme que le Sceau est fissuré mais pas brisé — il tiendra encore un moment grâce à l'intervention des joueurs. Le message de Malachi à Voss (trouvé dans la scène précédente) mentionne "l'Île de Sombreterre" comme prochain objectif du culte — c'est l'accroche vers le Chapitre 3.

Lysandra est émue par le sauvetage de la forêt — c'est un moment de bonding avec le groupe. Elle partage plus d'informations sur sa mission et s'engage à rester avec le groupe "jusqu'à ce que cette menace soit éteinte".`,
    dialogues: [
      {
        npcId: 'npc_dryade', npcName: 'Élanor (Dryade)',
        lines: [
          { trigger: 'Bénédiction', text: `*Ses mains brillent d'une lumière verte.* Recevez la gratitude des Bois Anciens. Que la forêt soit votre alliée où que vous alliez. Les racines vous guideront. Les branches vous abriteront. Et les murmures vous avertiront. *La lumière passe en vous — une chaleur douce, comme un souffle printanier.*`, tone: 'sacrée' },
          { trigger: 'Le futur', text: `Le Sceau tiendra. Pour l'instant. Mais la blessure est profonde et ne guérira pas seule. Il faudra un rituel de restauration — un savoir que seuls les Elfes de la Sylve d'Émeraude possèdent encore. *Elle se tourne vers Lysandra.* Ton peuple détient la clé, jeune elfe. Convaincre les anciens... sera ta quête.`, tone: 'sage' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Émotion', text: `*Elle caresse l'écorce d'un chêne ressuscité. Ses yeux brillent.* Je pensais être venue pour une mission. Une enquête froide et méthodique. Mais c'est plus que ça. *Elle vous regarde.* Vous avez sauvé une forêt aujourd'hui. Pas une bataille de soldats ou un édit de roi — un acte de compassion brute. *Pause.* Je reste avec vous. Jusqu'au bout.`, tone: 'émue' }
        ]
      }
    ],
    objectives: [
      { description: 'Recevoir la Bénédiction de la Forêt', type: 'special', optional: false },
      { description: 'Lire le message de Malachi (indice vers Ch.3)', type: 'investigate', optional: false }
    ],
    transitions: [
      { condition: 'Retour vers Sol-Aureus — FIN DU CHAPITRE 2', nextScene: 'ch3_s1_ile', label: '→ Ch.3 : L\'Île de Sombreterre' }
    ],
    loot: ['Bénédiction de la Forêt (avantage Survie en nature, permanent)', '1000 PO (récompense royale)', 'Branche de l\'Arbre-Sceau (focus druidique, +1 sorts de soins)'],
    estimatedMinutes: 10, mood: 'espoir-guérison',
    music: 'Renaissance — cordes douces, chant d\'oiseau', location: 'Forêt de Murmures — Sanctuaire restauré'
  }
];

export const CHAPTER_2: NarrativeChapter = {
  id: 'ch2', number: 2, title: 'La Cour d\'Or',
  subtitle: 'Audience royale et sauvetage de la Forêt de Murmures',
  summary: 'Audience avec la Reine Elara, rencontre avec Lysandra, et première mission : sauver le Sceau de la Sylve dans la Forêt de Murmures corrompue.',
  suggestedLevel: 3, region: 'Sol-Aureus → Forêt de Murmures',
  themes: ['Politique', 'Voyage', 'Corruption naturelle', 'Alliance'],
  scenes: CH2_SCENES, previousChapter: 'ch1', nextChapter: 'ch3'
};
