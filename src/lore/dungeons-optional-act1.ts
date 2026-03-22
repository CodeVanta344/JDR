/**
 * MINI-DONJONS OPTIONNELS - ACTE 1
 * 4 mini-donjons de 3-6 salles pour l'Acte 1 de la campagne Aethelgard
 */

import type { BookChapter } from './gm-book-data';

// ============================================================================
// 1. LA CAVE DE BROK (3 salles)
// ============================================================================

const CAVE_DE_BROK: BookChapter = {
  id: 'dungeon-cave-brok',
  actNumber: 1,
  chapterNumber: 101,
  title: 'La Cave de Brok',
  subtitle: 'Sous la taverne, des secrets oubliés',
  summary: 'Brok, le tavernier bourru, demande aux aventuriers d\'enquêter sur des bruits étranges provenant de sa cave à vin. Un tunnel oublié mène à un nid d\'araignées géantes qui menacent l\'établissement.',
  levelRange: '1-2',
  themes: ['exploration', 'horreur', 'mystère souterrain'],
  chapterIntro: {
    text: 'Brok vous accueille avec un regard inquiet, bien loin de sa jovialité habituelle. « Y\'a quelque chose en bas, » grogne-t-il en désignant la trappe derrière le comptoir. « Mes meilleures bouteilles sont en miettes. Et ces bruits... c\'est pas des rats, ça. » Il pousse la trappe et une bouffée d\'air fétide s\'en échappe.',
    mood: 'inquiétant',
    music: 'ambiance-cave-sombre'
  },
  chapterConclusion: {
    text: 'Le nid d\'araignées est détruit, et les tunnels sont désormais sûrs — du moins pour le moment. Brok vous accueille avec une rasade de son meilleur cru et une tape dans le dos. « Vous êtes les bienvenus ici quand vous voulez, mes amis. La maison offre ! » La cave garde encore des secrets, mais les ombres rampantes ne reviendront pas de sitôt.',
    mood: 'soulagement',
    music: 'taverne-joyeuse'
  },
  rewards: { xp: 150, gold: '30 po', items: ['Vin Millénaire Enchanté (potion : +2 à tous les jets pendant 1h)', 'Dague Ancienne (+1, émet une lueur en présence de poison)'] },
  scenes: [
    {
      id: 'brok-cave-vin',
      sceneNumber: 1,
      title: 'La Cave à Vin',
      type: 'exploration',
      location: 'Cave de la taverne de Brok',
      locationId: 'taverne-brok-cave',
      estimatedMinutes: 15,
      readAloud: {
        text: 'L\'escalier de pierre gémit sous vos pas tandis que vous descendez dans la cave de Brok. Des rangées de tonneaux s\'alignent contre les murs humides, mais plusieurs sont éventrés, leur contenu répandu sur le sol en flaques sombres. L\'odeur âcre du vin mêlée à une puanteur animale emplit l\'air.\n\nDans le fond de la cave, derrière les derniers racks de bouteilles, un trou béant s\'ouvre dans le mur de pierre. Les briques ont été arrachées de l\'intérieur, révélant un passage obscur d\'où provient un courant d\'air glacé. Des toiles épaisses et collantes tapissent les bords de l\'ouverture.\n\nLe sol autour du trou est couvert de traces : des empreintes à plusieurs pattes, larges comme des assiettes, mêlées à des traînées de substance visqueuse et blanchâtre.',
        mood: 'oppressant',
        music: 'ambiance-cave-sombre'
      },
      gmNotes: [
        { type: 'info', text: 'La cave fait environ 10m x 8m. Le trou dans le mur fait 1,5m de diamètre.' },
        { type: 'secret', text: 'Un test de Perception (DD 12) révèle une bouteille intacte cachée derrière un tonneau : c\'est un Vin Millénaire d\'avant la Fracture, d\'une valeur inestimable.' },
        { type: 'tip', text: 'Si les joueurs examinent les toiles, un test de Nature (DD 10) identifie des araignées géantes. DD 14 : elles sont de taille inhabituelle, probablement nourries par quelque chose de magique.' },
        { type: 'warning', text: '2 araignées de taille moyenne (PV 11, CA 12, Attaque +4, DG 1d6+2) peuvent surgir si les joueurs font trop de bruit.' }
      ],
      skillChecks: [
        { skill: 'Perception', dc: 12, success: 'Vous repérez une bouteille ancienne cachée derrière un tonneau, intacte et couverte de poussière séculaire.', failure: 'La cave semble n\'être qu\'un amoncellement de tonneaux brisés.' },
        { skill: 'Nature', dc: 10, success: 'Ces toiles sont l\'œuvre d\'araignées géantes — au moins trois spécimens adultes.', failure: 'Ces toiles sont épaisses. Probablement de grosses bestioles.' },
        { skill: 'Investigation', dc: 14, success: 'Le tunnel a été creusé il y a des mois. Les araignées sont là depuis longtemps, mais elles ne s\'aventuraient pas dans la cave avant récemment. Quelque chose les a dérangées.', failure: 'Le tunnel semble ancien mais vous ne pouvez pas en dire plus.' }
      ],
      choices: [
        {
          id: 'choix-cave-brok-1',
          prompt: 'Comment procédez-vous ?',
          options: [
            {
              label: 'Entrer dans le tunnel',
              description: 'S\'engager prudemment dans le passage obscur.',
              consequence: 'Vous vous faufilez dans le tunnel étroit, les toiles collant à vos vêtements.',
              nextScene: 'brok-tunnel-oublie'
            },
            {
              label: 'Préparer le terrain',
              description: 'Utiliser le feu ou la fumée pour nettoyer les toiles avant d\'avancer.',
              consequence: 'La fumée chasse les petites araignées mais alerte les plus grosses dans le tunnel.',
              nextScene: 'brok-tunnel-oublie',
              skillCheck: { skill: 'Survie', dc: 12, success: 'La fumée dégage le passage et vous donne un avantage sur votre premier jet d\'initiative.', failure: 'Le feu se propage aux tonneaux de vin — Brok ne sera pas content. Vous perdez votre discrétion.' }
            }
          ]
        }
      ],
      loot: ['Vin Millénaire Enchanté (si Perception DD 12 réussie)'],
      nextScenes: ['brok-tunnel-oublie'],
      previousScene: undefined
    },
    {
      id: 'brok-tunnel-oublie',
      sceneNumber: 2,
      title: 'Le Tunnel Oublié',
      type: 'exploration',
      location: 'Tunnel sous la taverne',
      locationId: 'tunnel-brok',
      estimatedMinutes: 15,
      readAloud: {
        text: 'Le tunnel serpente dans l\'obscurité, ses parois irrégulières taillées dans la roche brute. Par endroits, d\'anciennes briques affleurent — vestiges d\'un réseau souterrain bien plus ancien. Des toiles de plus en plus denses forment des voiles translucides que vous devez écarter pour progresser.\n\nL\'air est lourd, chargé d\'une odeur musquée et douceâtre. Sous vos pieds, des cocons de soie pendent du plafond, certains contenant des formes reconnaissables : rats, chats, et quelque chose de plus gros que vous préférez ne pas identifier.\n\nUn embranchement se dessine devant vous. À gauche, le tunnel se rétrécit et descend. À droite, il s\'élargit vers une cavité d\'où provient un bruissement constant, comme des dizaines de pattes raclant la pierre.',
        mood: 'claustrophobe',
        music: 'ambiance-tunnel-araignees'
      },
      gmNotes: [
        { type: 'info', text: 'Le tunnel fait environ 30m de long. Les cocons contiennent des restes d\'animaux et un squelette humain (un ancien cambrioleur, d\'après son équipement).' },
        { type: 'secret', text: 'Le squelette porte une bourse contenant 15 po et une carte indiquant l\'entrée de la Crypte du Héros Oublié (accroche vers un autre donjon).' },
        { type: 'tip', text: 'Le chemin de gauche (plus étroit) est un raccourci mais impose un test de Discrétion. Le chemin de droite mène directement au nid.' },
        { type: 'warning', text: '1d4 araignées de taille moyenne patrouillent ce tunnel. Elles attaquent si les joueurs échouent à un test de Discrétion (DD 13).' }
      ],
      skillChecks: [
        { skill: 'Discrétion', dc: 13, success: 'Vous progressez sans alerter les sentinelles arachnides.', failure: 'Un craquement sous votre pied — des yeux multiples se tournent vers vous dans l\'obscurité. Les araignées attaquent !' },
        { skill: 'Investigation', dc: 13, success: 'Vous découvrez le squelette d\'un ancien cambrioleur pris dans les toiles. Sa bourse contient des pièces et une carte mystérieuse.', failure: 'Les cocons ne contiennent que des restes d\'animaux, rien d\'intéressant.' },
        { skill: 'Perception', dc: 11, success: 'Vous repérez un fil-piège tendu en travers du tunnel qui déclencherait une chute de gravats.', failure: 'Vous ne remarquez pas le fil avant de le toucher — des gravats tombent ! 1d6 dégâts contondants, jet de Dextérité DD 12 pour moitié.' }
      ],
      encounter: {
        name: 'Patrouille Arachnide',
        enemies: [
          { name: 'Araignée Géante', hp: 11, atk: 4, ac: 12, cr: 0.5, abilities: ['Toile (Recharge 5-6) : cible à 6m, DD Dex 11 ou entravée', 'Morsure venimeuse : +4, 1d6+2 perforant + 1d4 poison'] }
        ],
        terrain: ['Toiles collantes (terrain difficile)', 'Plafond bas (désavantage aux armes à deux mains longues)', 'Obscurité totale sans source de lumière'],
        tactics: 'Les araignées tendent des embuscades depuis le plafond. Elles ciblent les porteurs de lumière en priorité.',
        loot: ['Glande à venin d\'araignée (composant alchimique, 5 po)']
      },
      choices: [
        {
          id: 'choix-tunnel-1',
          prompt: 'Quel chemin prenez-vous ?',
          options: [
            {
              label: 'Le passage étroit (gauche)',
              description: 'Plus risqué mais permet d\'arriver par un angle mort.',
              consequence: 'Vous rampez dans un boyau étroit qui débouche au-dessus du nid, offrant un avantage tactique.',
              nextScene: 'brok-nid-araignees',
              skillCheck: { skill: 'Acrobaties', dc: 13, success: 'Vous émergez silencieusement au-dessus du nid — avantage au premier round de combat.', failure: 'Vous restez coincé un instant et faites tomber des gravats, alertant la Reine.' }
            },
            {
              label: 'Le passage large (droite)',
              description: 'Approche directe vers le nid principal.',
              consequence: 'Vous entrez directement dans la caverne du nid. La Reine vous attend.',
              nextScene: 'brok-nid-araignees'
            }
          ]
        }
      ],
      loot: ['15 po (sur le squelette)', 'Carte vers la Crypte du Héros Oublié'],
      nextScenes: ['brok-nid-araignees'],
      previousScene: 'brok-cave-vin'
    },
    {
      id: 'brok-nid-araignees',
      sceneNumber: 3,
      title: 'Le Nid de l\'Araignée Reine',
      type: 'combat',
      location: 'Caverne-nid sous la taverne',
      locationId: 'nid-reine-brok',
      estimatedMinutes: 25,
      readAloud: {
        text: 'La caverne s\'ouvre devant vous comme un dôme naturel de cinq mètres de haut, entièrement tapissé de toiles épaisses et luisantes. Des centaines de petites araignées grouillent sur les parois, formant des motifs mouvants et hypnotiques. Au centre, un cocon massif pulse doucement d\'une lueur verdâtre.\n\nEt là, accrochée au plafond, elle vous observe. L\'Araignée Reine fait la taille d\'un cheval, son abdomen gonflé d\'œufs translucides. Ses huit yeux reflètent votre lumière comme autant de rubis noirs. Un sifflement guttural s\'échappe de ses chélicères tandis qu\'elle descend lentement vers vous.\n\nÀ ses côtés, deux araignées gardes se positionnent, protégeant leur matriarche. Le sol est jonché de cocons et d\'ossements, et dans un recoin, l\'éclat d\'une lame ancienne attire votre regard.',
        mood: 'terrifiant',
        music: 'combat-boss-mineur'
      },
      gmNotes: [
        { type: 'info', text: 'La caverne fait 12m de diamètre. Le plafond est à 5m. Les toiles couvrent 70% des surfaces.' },
        { type: 'warning', text: 'La Reine invoque 1d4 araignées supplémentaires au round 3 si elle est encore au-dessus de 50% PV.' },
        { type: 'tip', text: 'Le feu est très efficace ici : les toiles sont inflammables. Un sort de feu ou une torche lancée inflige 2d6 dégâts de feu à toutes les créatures dans un rayon de 3m et détruit les toiles dans la zone.' },
        { type: 'secret', text: 'Le cocon central contient un ancien artéfact nain qui attirait les araignées. Le détruire empêchera toute réinfestation.' },
        { type: 'lore', text: 'L\'Araignée Reine est une mutation causée par des résidus magiques de la Fracture. Ce n\'est pas une créature naturelle.' }
      ],
      skillChecks: [
        { skill: 'Arcanes', dc: 14, success: 'Vous sentez une énergie résiduelle de la Fracture émaner du cocon central. C\'est la source de la mutation des araignées.', failure: 'L\'aura magique est trop diffuse pour en déterminer la source.' },
        { skill: 'Perception', dc: 12, success: 'Vous repérez la Dague Ancienne à moitié enfouie sous les cocons, dans le recoin est de la caverne.', failure: 'L\'éclat métallique est perdu dans le chaos du combat.' }
      ],
      encounter: {
        name: 'L\'Araignée Reine',
        enemies: [
          { name: 'Araignée Reine', hp: 38, atk: 6, ac: 14, cr: 2, abilities: ['Morsure royale : +6, 1d8+3 perforant + 2d6 poison (DD Con 13, moitié)', 'Toile massive (Recharge 5-6) : cône 4,5m, DD Dex 13 ou entravé', 'Appel de la Ruche (1/combat) : invoque 1d4 araignées', 'Résistance au poison'] },
          { name: 'Araignée Garde', hp: 16, atk: 5, ac: 13, cr: 0.5, abilities: ['Morsure : +5, 1d6+3 perforant + 1d4 poison', 'Toile (Recharge 6) : cible unique, DD Dex 12 ou entravée'] }
        ],
        terrain: ['Toiles collantes (terrain difficile)', 'Plafond à 5m (araignées peuvent se déplacer au plafond)', 'Cocons au sol (couverture partielle)', 'Inflammable : les toiles brûlent facilement'],
        tactics: 'La Reine reste au plafond les 2 premiers rounds, utilisant sa toile massive. Les gardes chargent au corps à corps. Au round 3, la Reine descend et utilise sa morsure royale sur le personnage le plus menaçant.',
        loot: ['Glande à venin royal (composant rare, 25 po)', 'Soie d\'araignée géante (5 unités, 10 po chacune)']
      },
      choices: [
        {
          id: 'choix-nid-1',
          prompt: 'Que faites-vous du cocon central après le combat ?',
          options: [
            {
              label: 'Détruire le cocon',
              description: 'Éliminer la source de corruption.',
              consequence: 'L\'artéfact nain à l\'intérieur se brise, libérant une vague d\'énergie. Les araignées restantes fuient. Le nid ne se reformera pas.'
            },
            {
              label: 'Examiner le cocon',
              description: 'Étudier l\'artéfact avant de le détruire.',
              consequence: 'Vous découvrez un fragment d\'ancien artéfact nain, corrompu par la Fracture. Un mage pourrait l\'étudier.',
              skillCheck: { skill: 'Arcanes', dc: 15, success: 'Vous extrayez le fragment intact. Il pourrait servir à créer un objet magique ou être vendu à un érudit (50 po).', failure: 'Le fragment se désintègre à votre toucher, mais vous apprenez que la Fracture laisse des résidus attracteurs de créatures.' }
            }
          ]
        }
      ],
      loot: ['Dague Ancienne (+1, émet une lueur violette en présence de poison)', 'Glande à venin royal (25 po)', 'Soie d\'araignée géante x5 (50 po)', 'Fragment d\'artéfact nain (si examiné avec succès)'],
      nextScenes: [],
      previousScene: 'brok-tunnel-oublie'
    }
  ]
};

// ============================================================================
// 2. LES ÉGOUTS MAUDITS (4 salles)
// ============================================================================

const EGOUTS_MAUDITS: BookChapter = {
  id: 'dungeon-egouts-maudits',
  actNumber: 1,
  chapterNumber: 102,
  title: 'Les Égouts Maudits',
  subtitle: 'Dans les entrailles de Sol-Aureus',
  summary: 'Le réseau d\'égouts sous Sol-Aureus cache un repaire de gobelins et un autel sombre du Cercle des Cendres. Les aventuriers doivent naviguer les tunnels inondés, résoudre le mécanisme des vannes, et purger la menace avant qu\'elle ne grandisse.',
  levelRange: '1-3',
  themes: ['infiltration', 'puzzle', 'culte sombre'],
  chapterIntro: {
    text: 'Des disparitions inquiétantes ont frappé le Quartier Bas de Sol-Aureus. Des mendiants, des orphelins — ceux que personne ne cherche. Mais une vieille femme a vu quelque chose : des silhouettes encapuchonnées traînant un corps inconscient vers une bouche d\'égout. La garde est débordée, et la récompense est modeste mais l\'honneur est grand.',
    mood: 'sinistre',
    music: 'ambiance-urbaine-nuit'
  },
  chapterConclusion: {
    text: 'L\'autel du Cercle est détruit et les gobelins dispersés. La preuve de l\'activité cultiste dans les égouts de Sol-Aureus est troublante — le Cercle des Cendres étend son influence jusque sous la capitale. Les prisonniers libérés témoignent d\'horreurs murmurées dans l\'ombre. Ce n\'est que la surface d\'une menace bien plus profonde.',
    mood: 'victoire amère',
    music: 'ambiance-mystere'
  },
  rewards: { xp: 250, gold: '50 po', items: ['Amulette du Cercle (preuve, permet d\'identifier les cultistes)', 'Parchemin de Protection contre le Mal', 'Gratitude du Quartier Bas (+1 réputation)'] },
  scenes: [
    {
      id: 'egouts-intersection',
      sceneNumber: 1,
      title: 'L\'Intersection des Égouts',
      type: 'exploration',
      location: 'Égouts de Sol-Aureus',
      locationId: 'egouts-solaureus-intersection',
      estimatedMinutes: 15,
      readAloud: {
        text: 'L\'échelle rouillée vous mène six mètres sous le niveau de la rue, dans un réseau de tunnels voûtés en pierre grise. L\'eau stagnante vous arrive aux chevilles, charriant des immondices et une odeur qui vous prend à la gorge. La lueur de votre torche révèle trois tunnels qui partent dans des directions différentes.\n\nDes marques ont été gravées dans la pierre à hauteur d\'yeux — des symboles que vous ne reconnaissez pas immédiatement, mais qui semblent récents. Le tunnel central est le plus large, celui de gauche descend en pente douce, et celui de droite est partiellement obstrué par des gravats.\n\nUn bruit d\'écoulement régulier résonne dans le tunnel de gauche, tandis que des voix étouffées — ou est-ce le vent dans les conduits ? — semblent provenir du tunnel central.',
        mood: 'oppressant',
        music: 'ambiance-egouts'
      },
      gmNotes: [
        { type: 'info', text: 'Les symboles sont des marques du Cercle des Cendres (Arcanes DD 13 ou Religion DD 11 pour identifier). Le tunnel central mène aux gobelins, le gauche aux vannes, le droit est un cul-de-sac piégé.' },
        { type: 'warning', text: 'Le tunnel de droite contient un piège : fil tendu déclenchant une chute de gravats (Perception DD 13, 2d6 contondants, Dex DD 13 moitié).' },
        { type: 'secret', text: 'Sous l\'eau, un anneau de bronze gravé de runes est enfoncé dans la boue. C\'est un Anneau de Respiration Aquatique (3 charges, utile plus tard).' },
        { type: 'tip', text: 'Le chemin optimal est : vannes (gauche) d\'abord pour baisser le niveau d\'eau, puis central vers les gobelins.' }
      ],
      skillChecks: [
        { skill: 'Religion', dc: 11, success: 'Ces symboles sont des marques de passage du Cercle des Cendres. Des cultistes utilisent ces égouts.', failure: 'Les symboles ne vous évoquent rien de familier.' },
        { skill: 'Perception', dc: 15, success: 'Sous l\'eau trouble, l\'éclat d\'un objet métallique attire votre attention. Un anneau de bronze gravé de runes.', failure: 'L\'eau stagnante est trop opaque pour y voir quoi que ce soit.' },
        { skill: 'Survie', dc: 12, success: 'Des traces de pas multiples — pieds nus de petite taille et bottes lourdes — convergent vers le tunnel central.', failure: 'L\'eau a effacé la plupart des traces.' }
      ],
      choices: [
        {
          id: 'choix-egouts-direction',
          prompt: 'Quel tunnel empruntez-vous ?',
          options: [
            {
              label: 'Tunnel central (voix)',
              description: 'Suivre les voix étouffées.',
              consequence: 'Le tunnel s\'enfonce vers le repaire des gobelins. Le niveau d\'eau monte progressivement.',
              nextScene: 'egouts-repaire-gobelins'
            },
            {
              label: 'Tunnel de gauche (eau)',
              description: 'Suivre le bruit d\'écoulement.',
              consequence: 'Vous atteignez la salle des vannes, mécanisme ancien qui contrôle le niveau d\'eau.',
              nextScene: 'egouts-salle-vannes'
            },
            {
              label: 'Tunnel de droite (gravats)',
              description: 'Explorer le passage obstrué.',
              consequence: 'Un cul-de-sac piégé — mais un coffre de contrebandier s\'y cache.',
              skillCheck: { skill: 'Perception', dc: 13, success: 'Vous repérez le fil-piège avant de le déclencher et le désarmez.', failure: 'Des gravats tombent du plafond ! 2d6 dégâts contondants (Dex DD 13 moitié).' }
            }
          ]
        }
      ],
      loot: ['Anneau de Respiration Aquatique (3 charges, si Perception DD 15)', 'Coffre de contrebandier : 20 po, potion de soin (tunnel de droite)'],
      nextScenes: ['egouts-salle-vannes', 'egouts-repaire-gobelins'],
      previousScene: undefined
    },
    {
      id: 'egouts-salle-vannes',
      sceneNumber: 2,
      title: 'La Salle des Vannes',
      type: 'exploration',
      location: 'Salle de contrôle hydraulique',
      locationId: 'egouts-vannes',
      estimatedMinutes: 20,
      readAloud: {
        text: 'Le tunnel débouche sur une salle circulaire impressionnante, vestige d\'un génie d\'ingénierie ancien. Six énormes vannes de bronze s\'alignent le long des murs, reliées par un réseau de tuyaux et d\'engrenages couverts de rouille et de mousse. Au centre, un pilier de commande comporte quatre leviers numérotés en runes naines.\n\nL\'eau coule de plusieurs conduits, maintenant le niveau à mi-cuisse. Des gravures sur le pilier central semblent constituer un mode d\'emploi, mais le temps et l\'humidité ont effacé une partie du texte. Seuls quelques mots restent lisibles dans un dialecte nain ancien.\n\nUn gobelin mort flotte face contre l\'eau, ses mains griffées portant encore les marques de tentatives désespérées pour manipuler les leviers.',
        mood: 'puzzle',
        music: 'ambiance-mecanismes'
      },
      gmNotes: [
        { type: 'info', text: 'Puzzle des vannes : les 4 leviers doivent être actionnés dans le bon ordre (2-4-1-3) pour baisser le niveau d\'eau. Le mauvais ordre provoque une montée d\'eau de 30cm par erreur.' },
        { type: 'tip', text: 'Les runes naines (Nain ou Histoire DD 12) donnent l\'indice : « Le fleuve suit la lune — croissant, pleine, nouvelle, décroissante. » Les leviers portent des symboles lunaires.' },
        { type: 'warning', text: 'Si le niveau d\'eau monte 3 fois, la salle est submergée. Les personnages ont 3 rounds pour nager jusqu\'à la sortie (Athlétisme DD 14).' },
        { type: 'secret', text: 'Le gobelin mort porte une clé rouillée qui ouvre la porte arrière du repaire gobelin (raccourci discret).' }
      ],
      skillChecks: [
        { skill: 'Histoire', dc: 12, success: 'Vous déchiffrez les runes : un poème sur les phases lunaires. Les leviers portent des symboles de lune — l\'ordre correct est croissant, pleine, nouvelle, décroissante.', failure: 'Le dialecte nain est trop ancien pour vous.' },
        { skill: 'Investigation', dc: 14, success: 'En étudiant les engrenages, vous déduisez quels leviers contrôlent quelles vannes et trouvez l\'ordre correct par élimination.', failure: 'Le mécanisme est trop complexe à analyser visuellement.' },
        { skill: 'Athlétisme', dc: 13, success: 'Vous parvenez à forcer une vanne rouillée à la main, baissant partiellement le niveau sans utiliser les leviers.', failure: 'La vanne ne bouge pas d\'un pouce. La rouille l\'a soudée en place.' }
      ],
      choices: [
        {
          id: 'choix-vannes',
          prompt: 'Comment abordez-vous le mécanisme ?',
          options: [
            {
              label: 'Déchiffrer les runes',
              description: 'Étudier les inscriptions pour trouver l\'ordre correct.',
              consequence: 'La séquence correcte abaisse le niveau d\'eau dans tout le réseau d\'égouts.',
              skillCheck: { skill: 'Histoire', dc: 12, success: 'Les vannes grondent et le niveau d\'eau baisse. Le reste du donjon sera plus facile à naviguer.', failure: 'Vous tirez un mauvais levier — l\'eau monte de 30cm !' }
            },
            {
              label: 'Essais et erreurs',
              description: 'Tester les leviers un par un.',
              consequence: 'Risqué mais possible. Chaque erreur fait monter l\'eau de 30cm. Trois erreurs et la salle est submergée.',
              nextScene: 'egouts-repaire-gobelins'
            },
            {
              label: 'Ignorer et continuer',
              description: 'Laisser les vannes et aller directement au repaire.',
              consequence: 'Le niveau d\'eau reste élevé dans le repaire des gobelins, imposant un terrain difficile permanent.',
              nextScene: 'egouts-repaire-gobelins'
            }
          ]
        }
      ],
      loot: ['Clé du repaire gobelin (sur le cadavre)', 'Engrenage en mithral (composant, 15 po)'],
      nextScenes: ['egouts-repaire-gobelins'],
      previousScene: 'egouts-intersection'
    },
    {
      id: 'egouts-repaire-gobelins',
      sceneNumber: 3,
      title: 'Le Repaire des Gobelins',
      type: 'combat',
      location: 'Repaire gobelin dans les égouts',
      locationId: 'egouts-repaire-gob',
      estimatedMinutes: 25,
      readAloud: {
        text: 'Le tunnel s\'élargit en une cavité naturelle aménagée avec des moyens de fortune. Des caisses empilées, des hamacs de toile crasseuse et les restes de repas innommables composent un campement rudimentaire. Une dizaine de gobelins s\'affairent : certains aiguisent des lames, d\'autres jouent aux dés avec des osselets.\n\nDans un coin, une cage de fer rouillée contient deux prisonniers humains aux yeux hagards — les disparus du Quartier Bas. Un gobelin plus grand que les autres, portant une coiffe de plumes noires et un collier d\'os, aboie des ordres depuis un trône fait de débris.\n\nUne porte lourde bardée de fer se dresse dans le mur du fond, ornée du symbole du Cercle des Cendres. Elle est entrebâillée, et une lumière rougeâtre filtre de l\'autre côté.',
        mood: 'tendu',
        music: 'combat-groupe'
      },
      gmNotes: [
        { type: 'info', text: 'Le chef gobelin (Grik Dent-Noire) est au service du Cercle. Il a 4 gobelins d\'élite et 6 gobelins normaux. Possibilité d\'approche furtive ou de négociation.' },
        { type: 'tip', text: 'Si les vannes ont été résolues, le repaire est sec et normal. Sinon, l\'eau monte aux genoux (terrain difficile pour tout le monde, mais les gobelins connaissent les zones surélevées).' },
        { type: 'secret', text: 'Grik peut être convaincu de parler (Intimidation DD 15 ou Persuasion DD 17) : il révèle que le Cercle lui a promis un territoire en échange des prisonniers pour des « rituels ».' },
        { type: 'warning', text: 'Si le combat dure plus de 5 rounds, le Prêtre du Cercle dans la salle suivante est alerté et se prépare.' }
      ],
      skillChecks: [
        { skill: 'Discrétion', dc: 14, success: 'Vous approchez sans être repérés. Possibilité d\'attaque surprise ou de libérer les prisonniers discrètement.', failure: 'Un gobelin sentinelle donne l\'alerte ! Tout le camp se prépare au combat.' },
        { skill: 'Intimidation', dc: 15, success: 'Grik tremble et accepte de parler. Il révèle les plans du Cercle et offre la clé de la cage.', failure: 'Grik ricane et lance ses guerriers sur vous.' }
      ],
      encounter: {
        name: 'Le Repaire de Grik Dent-Noire',
        enemies: [
          { name: 'Grik Dent-Noire (Chef Gobelin)', hp: 24, atk: 5, ac: 15, cr: 1, abilities: ['Cri de Guerre (1/combat) : les gobelins alliés gagnent +2 aux attaques pendant 1 round', 'Fuite Lâche : peut se désengager en action bonus', 'Cimeterre empoisonné : +5, 1d6+3 tranchant + 1d4 poison'] },
          { name: 'Gobelin d\'Élite', hp: 12, atk: 4, ac: 14, cr: 0.5, abilities: ['Attaque sournoise (1d6 supplémentaire si avantage)', 'Arc court : +4, 1d6+2'] },
          { name: 'Gobelin', hp: 7, atk: 3, ac: 13, cr: 0.25, abilities: ['Fuite : peut se désengager en action bonus'] }
        ],
        terrain: ['Caisses (couverture partielle)', 'Eau stagnante (terrain difficile si vannes non résolues)', 'Cage des prisonniers (obstacle)', 'Hamacs (terrain difficile)'],
        tactics: 'Grik reste à l\'arrière et utilise son Cri de Guerre au round 1. Les élites utilisent leurs arcs depuis les positions surélevées. Les gobelins normaux chargent en meute. Si Grik tombe sous 8 PV, il tente de fuir vers l\'autel.',
        loot: ['Collier d\'os de Grik (fétiche, 10 po)', 'Cimeterre empoisonné', '35 po répartis dans le campement', 'Clé de la cage des prisonniers']
      },
      choices: [
        {
          id: 'choix-repaire-gob',
          prompt: 'Après le combat, que faites-vous ?',
          options: [
            {
              label: 'Libérer les prisonniers et poursuivre',
              description: 'Ouvrir la cage et avancer vers l\'autel.',
              consequence: 'Les prisonniers vous remercient et fuient par le tunnel. Vous franchissez la porte vers l\'autel du Cercle.',
              nextScene: 'egouts-autel-cercle'
            },
            {
              label: 'Libérer les prisonniers et escorter',
              description: 'Ramener les prisonniers en sécurité avant de continuer.',
              consequence: 'Un aller-retour de 20 minutes. Le Prêtre du Cercle a le temps de finaliser un rituel défensif (+2 CA, barrière magique).',
              nextScene: 'egouts-autel-cercle'
            }
          ]
        }
      ],
      loot: ['35 po', 'Cimeterre empoisonné', 'Clé de la cage'],
      nextScenes: ['egouts-autel-cercle'],
      previousScene: 'egouts-intersection'
    },
    {
      id: 'egouts-autel-cercle',
      sceneNumber: 4,
      title: 'L\'Autel Sombre du Cercle',
      type: 'combat',
      location: 'Sanctuaire secret du Cercle des Cendres',
      locationId: 'egouts-autel',
      estimatedMinutes: 30,
      readAloud: {
        text: 'Derrière la porte, une salle voûtée baigne dans une lueur écarlate. Des bougies noires entourent un autel de pierre obsidienne sur lequel sont gravés les symboles sinistres du Cercle des Cendres. Des chaînes pendent du plafond, et des traces de sang sèché maculent le sol en motifs rituels.\n\nUn homme en robe noire se tient derrière l\'autel, ses mains levées au-dessus d\'un grimoire ouvert. Son visage est masqué, mais ses yeux luisent d\'une lumière malsaine. « Vous arrivez trop tard, ou trop tôt — qu\'importe, » siffle-t-il. « Le Cercle est partout. Détruisez cet autel, dix autres se dresseront. »\n\nDeux silhouettes encapuchonnées se matérialisent dans les ombres, lames tirées. L\'air vibre d\'une énergie nécromantique palpable qui vous donne la nausée.',
        mood: 'dramatique',
        music: 'combat-boss-cercle'
      },
      gmNotes: [
        { type: 'info', text: 'Le Prêtre du Cercle est un lanceur de sorts de niveau 3. Ses acolytes sont des combattants entraînés. L\'autel amplifie ses sorts de nécromancie.' },
        { type: 'warning', text: 'Si les joueurs ont escorté les prisonniers, le Prêtre a une barrière magique (20 PV temporaires) et +2 CA du rituel.' },
        { type: 'secret', text: 'Le grimoire sur l\'autel contient des informations sur les plans du Cercle à Sol-Aureus — preuve cruciale pour les autorités.' },
        { type: 'tip', text: 'Détruire l\'autel (CA 15, 30 PV, vulnérable au radiant) coupe la source de pouvoir du Prêtre, lui faisant perdre ses sorts de niveau 2 et sa régénération.' },
        { type: 'lore', text: 'Ce sanctuaire est l\'un de nombreux avant-postes du Cercle des Cendres. Leur réseau s\'étend dans toute la région.' }
      ],
      skillChecks: [
        { skill: 'Religion', dc: 14, success: 'Vous identifiez le rituel en cours : une consécration nécromantique. Briser le cercle de sel autour de l\'autel l\'interrompra.', failure: 'L\'énergie sombre est oppressante, mais vous ne parvenez pas à en comprendre la nature exacte.' },
        { skill: 'Arcanes', dc: 15, success: 'L\'autel est un amplificateur de nécromancie. Le détruire coupera le lien du Prêtre avec sa source de pouvoir.', failure: 'La magie noire brouille vos sens arcaniques.' }
      ],
      encounter: {
        name: 'Le Prêtre du Cercle des Cendres',
        enemies: [
          { name: 'Prêtre du Cercle', hp: 32, atk: 5, ac: 13, cr: 2, abilities: ['Rayon Nécrotique : +5, portée 18m, 2d8 nécrotique', 'Mot de Douleur (Recharge 5-6) : DD Sag 14, 3d6 psychique', 'Régénération de l\'Autel : regagne 5 PV/tour tant que l\'autel est intact', 'Bouclier de l\'Ombre (réaction) : +3 CA contre une attaque'] },
          { name: 'Acolyte du Cercle', hp: 18, atk: 5, ac: 14, cr: 0.5, abilities: ['Dague empoisonnée : +5, 1d4+3 perforant + 1d6 poison (DD Con 12)', 'Fanatisme : avantage aux jets de sauvegarde contre la peur'] }
        ],
        terrain: ['Autel d\'obsidienne (couverture totale)', 'Bougies noires (éteindre réduit la visibilité)', 'Chaînes pendantes (peuvent être utilisées pour balancer ou entraver)', 'Cercle rituel au sol (terrain consacré au mal)'],
        tactics: 'Le Prêtre reste derrière l\'autel et utilise ses sorts à distance. Les acolytes protègent ses flancs. Le Prêtre utilise Bouclier de l\'Ombre si ciblé. Si l\'autel est détruit, le Prêtre tente de fuir avec le grimoire.',
        loot: ['Grimoire du Cercle (informations sur les plans cultistes)', 'Amulette du Cercle des Cendres', 'Parchemin de Protection contre le Mal', '45 po en offrandes', 'Bague d\'obsidienne (focus nécromantique, 30 po)']
      },
      choices: [
        {
          id: 'choix-autel',
          prompt: 'Que faites-vous de l\'autel et du grimoire ?',
          options: [
            {
              label: 'Tout détruire',
              description: 'Réduire l\'autel en poussière et brûler le grimoire.',
              consequence: 'L\'autel explose en fragments d\'obsidienne. La menace immédiate est éliminée, mais vous perdez les informations du grimoire.',
              reputationChange: [{ faction: 'Cercle des Cendres', amount: -5 }]
            },
            {
              label: 'Préserver le grimoire',
              description: 'Détruire l\'autel mais garder le grimoire comme preuve.',
              consequence: 'Le grimoire révèle trois autres cellules du Cercle dans la région. Information cruciale pour la suite de la campagne.',
              reputationChange: [{ faction: 'Garde de Sol-Aureus', amount: 3 }]
            }
          ]
        }
      ],
      loot: ['Grimoire du Cercle', 'Amulette du Cercle des Cendres', 'Parchemin de Protection contre le Mal', '45 po'],
      nextScenes: [],
      previousScene: 'egouts-repaire-gobelins'
    }
  ]
};

// ============================================================================
// 3. LA CRYPTE DU HÉROS OUBLIÉ (4 salles)
// ============================================================================

const CRYPTE_HEROS_OUBLIE: BookChapter = {
  id: 'dungeon-crypte-heros',
  actNumber: 1,
  chapterNumber: 103,
  title: 'La Crypte du Héros Oublié',
  subtitle: 'L\'honneur ne meurt jamais',
  summary: 'Sous le cimetière de Sol-Aureus, une crypte oubliée abrite le tombeau d\'un héros de la Grande Guerre. Son esprit tourmenté refuse le repos tant que son épée reste profanée. Les aventuriers doivent surmonter les pièges et affronter le Revenant pour lui rendre la paix — et gagner son arme légendaire.',
  levelRange: '2-3',
  themes: ['honneur', 'morts-vivants', 'héritage'],
  chapterIntro: {
    text: 'Une carte trouvée dans les tunnels sous la taverne de Brok — ou peut-être un rêve récurrent qui hante l\'un d\'entre vous — mène à une section oubliée du cimetière de Sol-Aureus. Derrière un mausolée effondré, un escalier de pierre descend dans les ténèbres. L\'air qui en émane est glacial et porte un murmure : « Rendez-moi... mon honneur... »',
    mood: 'solennel',
    music: 'ambiance-crypte'
  },
  chapterConclusion: {
    text: 'Le Revenant s\'effondre, ses yeux retrouvant une lueur de paix. « Merci, » murmure-t-il avant de se dissiper en poussière dorée. L\'épée vibre dans votre main, reconnaissant son nouveau porteur. Le héros oublié peut enfin reposer, et son nom — Aldric le Juste — mérite d\'être rappelé aux vivants.',
    mood: 'émouvant',
    music: 'theme-heroique-calme'
  },
  rewards: { xp: 300, gold: '60 po', items: ['Épée d\'Aldric le Juste (+1, +1d6 radiant contre les morts-vivants)', 'Médaillon du Héros (avantage aux jets de sauvegarde contre la peur, 1/jour)'] },
  scenes: [
    {
      id: 'crypte-escalier',
      sceneNumber: 1,
      title: 'L\'Escalier des Lamentations',
      type: 'exploration',
      location: 'Entrée de la crypte',
      locationId: 'crypte-heros-entree',
      estimatedMinutes: 10,
      readAloud: {
        text: 'L\'escalier de pierre plonge dans l\'obscurité sur une vingtaine de marches usées par le temps. Les murs sont gravés de scènes de bataille à demi effacées — des guerriers affrontant des ombres, menés par une silhouette brandissant une épée lumineuse. L\'air se refroidit à chaque pas, et votre souffle se transforme en buée.\n\nAu pied de l\'escalier, un vestibule rectangulaire s\'ouvre devant vous. Deux statues de guerriers en armure flanquent un couloir qui s\'enfonce dans les ténèbres. Les statues tiennent des boucliers gravés d\'un soleil — l\'ancien symbole de Sol-Aureus. Leurs visages de pierre semblent vous jauger.\n\nUne inscription en lettres dorées, encore lisible malgré les siècles, orne le linteau au-dessus du couloir : « Ici repose Aldric le Juste, gardien de l\'aube. Que seuls les dignes franchissent ce seuil. »',
        mood: 'solennel',
        music: 'ambiance-crypte'
      },
      gmNotes: [
        { type: 'info', text: 'Le vestibule fait 6m x 4m. Les statues sont non-magiques mais imposantes.' },
        { type: 'lore', text: 'Aldric le Juste était un héros de la guerre contre les premiers serviteurs de l\'ombre, trois siècles avant la Fracture. Son nom a été effacé de l\'histoire par des conspirateurs jaloux.' },
        { type: 'secret', text: 'Dire « Par l\'honneur et par l\'aube » (inscrit en petits caractères sur le bouclier gauche) désactive les pièges du couloir suivant.' },
        { type: 'tip', text: 'Un test de Religion ou Histoire (DD 12) révèle des informations sur Aldric. Un résultat de 18+ révèle la phrase de passe.' }
      ],
      skillChecks: [
        { skill: 'Histoire', dc: 12, success: 'Aldric le Juste était un paladin légendaire qui a combattu une invasion de morts-vivants il y a des siècles. Son nom a mystérieusement disparu des chroniques officielles.', failure: 'Le nom Aldric ne vous dit rien.' },
        { skill: 'Religion', dc: 12, success: 'Le soleil sur les boucliers est un ancien symbole sacré de Sol-Aureus. Les prières de cette époque commençaient par « Par l\'honneur et par l\'aube ».', failure: 'Un symbole religieux ancien, mais vous ne pouvez pas le contextualiser.' },
        { skill: 'Perception', dc: 16, success: 'De minuscules caractères sont gravés sur le bouclier de la statue de gauche : « Par l\'honneur et par l\'aube. »', failure: 'Les statues semblent purement décoratives.' }
      ],
      choices: [
        {
          id: 'choix-escalier-crypte',
          prompt: 'Comment avancez-vous ?',
          options: [
            {
              label: 'Prononcer la phrase de passe',
              description: '« Par l\'honneur et par l\'aube » — si découverte.',
              consequence: 'Les yeux des statues s\'illuminent brièvement de lumière dorée. Un déclic résonne : les pièges du couloir se désactivent.',
              nextScene: 'crypte-couloir-piege'
            },
            {
              label: 'Avancer prudemment',
              description: 'S\'engager dans le couloir avec précaution.',
              consequence: 'Vous entrez dans le couloir piégé sans la protection des gardiens de pierre.',
              nextScene: 'crypte-couloir-piege'
            }
          ]
        }
      ],
      loot: [],
      nextScenes: ['crypte-couloir-piege'],
      previousScene: undefined
    },
    {
      id: 'crypte-couloir-piege',
      sceneNumber: 2,
      title: 'Le Couloir des Épreuves',
      type: 'exploration',
      location: 'Couloir piégé de la crypte',
      locationId: 'crypte-heros-couloir',
      estimatedMinutes: 20,
      readAloud: {
        text: 'Le couloir s\'étend sur une quinzaine de mètres, ses murs ornés de fresques décolorées représentant les exploits d\'Aldric. Le sol est composé de dalles alternées — certaines légèrement plus hautes que d\'autres, comme les touches d\'un instrument géant. Un mécanisme subtil semble relier le tout.\n\nÀ mi-chemin, le couloir s\'élargit en une petite alcôve où un squelette en armure rouillée est affalé contre le mur, une arbalète de poing encore serrée dans sa main. Un piège à dards est visible dans le mur opposé, ses trous noircis par le poison d\'antan.\n\nAu fond du couloir, une lourde porte de pierre gravée d\'un soleil levant attend. Deux sabliers vides sont sculptés de chaque côté.',
        mood: 'tension',
        music: 'ambiance-piege'
      },
      gmNotes: [
        { type: 'info', text: 'Si la phrase de passe a été prononcée, tous les pièges sont désactivés et le couloir est sûr. Sinon : 3 pièges actifs.' },
        { type: 'warning', text: 'Piège 1 (dalles) : marcher sur une dalle relevée déclenche des fléchettes (Perception DD 14 pour repérer, Dex DD 13 pour esquiver, 1d6+2 perforant + poison DD 12 Con ou 1d4 poison). Piège 2 (fil) : fil tendu à 30cm du sol déclenche une lame (Perception DD 13, Dex DD 14, 2d6 tranchant). Piège 3 (porte) : la porte est piégée — toucher la poignée sans appuyer sur les sabliers inflige 2d6 foudre (Perception DD 15).' },
        { type: 'secret', text: 'Le squelette est un ancien pilleurs de tombes. Il porte un journal décrivant d\'autres cryptes dans la région (accroche potentielle).' },
        { type: 'tip', text: 'Un Voleur ou un personnage compétent en outils de voleur peut désarmer chaque piège (DD 14).' }
      ],
      skillChecks: [
        { skill: 'Perception', dc: 14, success: 'Vous repérez les dalles piégées — certaines sont fractionnellement plus hautes et montrent des traces de mécanisme.', failure: 'Le sol semble uniforme.' },
        { skill: 'Outils de voleur', dc: 14, success: 'Vous désarmez le piège avec précision. Le mécanisme se rétracte en grinçant.', failure: 'Votre outil glisse et le piège se déclenche !' },
        { skill: 'Investigation', dc: 13, success: 'Le journal du pilleur mentionne trois autres cryptes dans la région, avec des indices sur leurs emplacements.', failure: 'Le journal est trop abîmé pour être lu.' }
      ],
      choices: [
        {
          id: 'choix-couloir',
          prompt: 'Comment franchissez-vous les pièges ?',
          options: [
            {
              label: 'Désarmer méthodiquement',
              description: 'Prendre le temps de neutraliser chaque piège.',
              consequence: 'Lent mais sûr. Chaque piège nécessite un test d\'outils de voleur DD 14.',
              nextScene: 'crypte-sarcophage'
            },
            {
              label: 'Foncer à travers',
              description: 'Courir le long du couloir en évitant les pièges.',
              consequence: 'Chaque personnage doit réussir trois jets de Dextérité (DD 13, 14, 15) ou subir les dégâts des pièges activés.',
              nextScene: 'crypte-sarcophage',
              skillCheck: { skill: 'Acrobaties', dc: 14, success: 'Vous zigzaguez entre les pièges avec grâce.', failure: 'Un piège vous touche ! Subissez les dégâts.' }
            }
          ]
        }
      ],
      loot: ['Arbalète de poing (sur le squelette)', 'Journal du pilleur (informations)', '8 po sur le squelette'],
      nextScenes: ['crypte-sarcophage'],
      previousScene: 'crypte-escalier'
    },
    {
      id: 'crypte-sarcophage',
      sceneNumber: 3,
      title: 'Le Sarcophage d\'Aldric',
      type: 'revelation',
      location: 'Chambre funéraire principale',
      locationId: 'crypte-heros-sarcophage',
      estimatedMinutes: 15,
      readAloud: {
        text: 'La porte de pierre pivote lentement, révélant une chambre circulaire d\'une beauté austère. Des piliers de marbre blanc soutiennent un plafond voûté peint en bleu nuit, où des étoiles dorées scintillent encore faiblement d\'un enchantement ancien. Au centre, un sarcophage de granit repose sur un piédestal surélevé.\n\nLe couvercle du sarcophage a été repoussé — de l\'intérieur. Des marques de griffes rayent le granit poli. L\'intérieur est vide, à l\'exception d\'une dépression en forme d\'épée où l\'arme reposait jadis. L\'empreinte irradie encore une lueur dorée résiduelle.\n\nSur les murs, les fresques montrent la trahison d\'Aldric : un compagnon d\'armes lui arrachant son épée, le poignardant dans le dos. Les derniers panneaux montrent l\'esprit d\'Aldric se relevant, condamné à errer jusqu\'à ce que son honneur soit restauré.',
        mood: 'tragique',
        music: 'theme-heroique-triste'
      },
      gmNotes: [
        { type: 'info', text: 'La chambre fait 8m de diamètre. Le sarcophage ouvert est au centre. La porte vers la chambre du trésor est cachée derrière le pilier nord.' },
        { type: 'lore', text: 'Aldric a été trahi par son lieutenant, Vorn, qui a volé son épée et effacé son nom de l\'histoire. L\'esprit d\'Aldric est devenu un Revenant lié à sa quête de vengeance et d\'honneur.' },
        { type: 'secret', text: 'Prier devant le sarcophage (Religion DD 13) fait apparaître une bénédiction temporaire : +1 aux jets d\'attaque pendant 1 heure.' },
        { type: 'tip', text: 'Les joueurs qui examinent les fresques (Investigation DD 12) comprennent que le Revenant ne cherche pas à les tuer — il veut que quelqu\'un de digne porte son épée. Un combat peut être évité par la diplomatie.' }
      ],
      skillChecks: [
        { skill: 'Investigation', dc: 12, success: 'Les fresques racontent l\'histoire complète : Aldric cherche un porteur digne pour son épée. Il n\'est pas hostile par nature, mais protège sa tombe contre les indignes.', failure: 'Les fresques sont belles mais leur récit est fragmentaire.' },
        { skill: 'Religion', dc: 13, success: 'Votre prière résonne dans la crypte. Une chaleur dorée vous enveloppe : bénédiction +1 aux attaques pendant 1h.', failure: 'Le silence de la crypte reste inébranlable.' },
        { skill: 'Perception', dc: 14, success: 'Derrière le pilier nord, une fissure dans le mur révèle un passage secret menant à une chambre cachée.', failure: 'La chambre semble n\'avoir qu\'une seule entrée.' }
      ],
      choices: [
        {
          id: 'choix-sarcophage',
          prompt: 'Que faites-vous dans la chambre funéraire ?',
          options: [
            {
              label: 'Chercher le passage secret',
              description: 'Explorer la chambre pour trouver la suite.',
              consequence: 'Vous trouvez le passage vers la chambre du trésor — et le Revenant.',
              nextScene: 'crypte-tresor'
            },
            {
              label: 'Invoquer l\'esprit d\'Aldric',
              description: 'Appeler le héros tombé par son nom.',
              consequence: 'L\'esprit d\'Aldric se manifeste directement, ouvrant un dialogue avant le combat potentiel.',
              nextScene: 'crypte-tresor',
              skillCheck: { skill: 'Persuasion', dc: 14, success: 'Aldric reconnaît votre valeur. Il vous guidera vers la chambre du trésor sans combat.', failure: 'L\'esprit apparaît mais vous juge indigne. Le combat sera inévitable.' }
            }
          ]
        }
      ],
      loot: ['Bénédiction d\'Aldric (+1 attaques, 1h, si Religion DD 13)'],
      nextScenes: ['crypte-tresor'],
      previousScene: 'crypte-couloir-piege'
    },
    {
      id: 'crypte-tresor',
      sceneNumber: 4,
      title: 'La Chambre du Héros',
      type: 'combat',
      location: 'Chambre du trésor d\'Aldric',
      locationId: 'crypte-heros-tresor',
      estimatedMinutes: 25,
      readAloud: {
        text: 'Le passage secret débouche sur une chambre voûtée illuminée par une lumière dorée surnaturelle. Sur un autel de marbre blanc, l\'Épée d\'Aldric repose dans un halo de lumière, sa lame gravée de runes solaires. Des coffres ouverts débordent de pièces ternies et de médailles militaires.\n\nMais entre vous et l\'autel se dresse une silhouette spectrale : un guerrier en armure complète, son visage marqué par une détermination millénaire. Les yeux du Revenant brûlent d\'un feu bleu-blanc. « Prouvez... votre valeur, » gronde-t-il d\'une voix d\'outre-tombe, en dégainant une épée fantomatique.\n\nL\'air se charge d\'une énergie glaciale tandis que l\'esprit d\'Aldric se met en garde, prêt à juger les intrus par la force des armes — à moins qu\'un autre moyen ne prouve votre honneur.',
        mood: 'épique',
        music: 'combat-boss-heroique'
      },
      gmNotes: [
        { type: 'info', text: 'Le Revenant d\'Aldric peut être vaincu par le combat OU par la diplomatie. Si les joueurs ont compris les fresques et montrent du respect, Persuasion DD 16 (DD 14 si l\'esprit a été invoqué avec succès) peut éviter le combat.' },
        { type: 'warning', text: 'Le Revenant est résistant aux dégâts non-magiques. Les sorts radiants font des dégâts doubles.' },
        { type: 'secret', text: 'Si vaincu sans honneur (attaques sournoises, poison, fuite), l\'épée perd ses propriétés magiques et devient une épée ordinaire.' },
        { type: 'tip', text: 'Un combat honorable (face à face, sans fuir, en saluant avant le combat) octroie un bonus de +1d6 PV temporaires à celui qui reçoit l\'épée.' }
      ],
      skillChecks: [
        { skill: 'Persuasion', dc: 16, success: 'Aldric baisse son arme. « Vous portez l\'honneur dans votre cœur. Mon épée est à vous. Portez-la avec justice. » Le combat est évité.', failure: 'Aldric secoue la tête. « Les mots ne suffisent pas. Montrez votre valeur par les armes ! »' },
        { skill: 'Intimidation', dc: 18, success: 'Votre bravoure face à un spectre impressionne Aldric. Il hoche la tête avec respect.', failure: 'Aldric rit — un son glaçant. « La bravade n\'est pas le courage. »' }
      ],
      encounter: {
        name: 'Aldric le Juste — Revenant',
        enemies: [
          { name: 'Revenant d\'Aldric', hp: 45, atk: 7, ac: 16, cr: 3, abilities: ['Lame Spectrale : +7, 1d8+4 tranchant + 1d6 nécrotique', 'Regard Implacable (Recharge 5-6) : DD Sag 14 ou paralysé 1 round', 'Résistance aux dégâts non-magiques', 'Vulnérabilité au radiant (dégâts doubles)', 'Pas de l\'Ombre : peut se téléporter de 4,5m en action bonus'] }
        ],
        terrain: ['Autel de marbre (couverture)', 'Lumière dorée (pas d\'obscurité dans cette salle)', 'Sol sacré (les morts-vivants ont désavantage aux jets de sauvegarde contre le radiant)'],
        tactics: 'Aldric combat honorablement — il cible le guerrier le plus fort et n\'attaque pas les soigneurs en priorité. Il utilise Regard Implacable sur quiconque tente de fuir. Si réduit à 10 PV, il s\'arrête et évalue les aventuriers.',
        loot: ['Épée d\'Aldric le Juste (+1, +1d6 radiant contre les morts-vivants)', 'Médaillon du Héros (avantage contre la peur, 1/jour)', 'Armure spectrale dissipée (composant pour enchantement, 40 po)']
      },
      choices: [
        {
          id: 'choix-tresor-crypte',
          prompt: 'Aldric vaincu ou convaincu, l\'épée est vôtre. Que faites-vous ?',
          options: [
            {
              label: 'Prendre l\'épée avec respect',
              description: 'Saluer le héros tombé et accepter sa charge.',
              consequence: 'L\'épée pulse de lumière dorée en reconnaissant son nouveau porteur. Aldric sourit une dernière fois avant de trouver la paix.'
            },
            {
              label: 'Promettre de restaurer son nom',
              description: 'Jurer de faire connaître l\'histoire d\'Aldric.',
              consequence: 'L\'épée gagne un pouvoir supplémentaire : une fois par jour, elle peut émettre une Lumière du Jour (sort) pendant 10 minutes. Aldric repose en paix.',
              reputationChange: [{ faction: 'Église de Sol-Aureus', amount: 3 }]
            }
          ]
        }
      ],
      loot: ['Épée d\'Aldric le Juste', 'Médaillon du Héros', '60 po en pièces anciennes', 'Médailles militaires (collection, 20 po)'],
      nextScenes: [],
      previousScene: 'crypte-sarcophage'
    }
  ]
};

// ============================================================================
// 4. LE NID DES RATS (3 salles)
// ============================================================================

const NID_DES_RATS: BookChapter = {
  id: 'dungeon-nid-rats',
  actNumber: 1,
  chapterNumber: 104,
  title: 'Le Nid des Rats',
  subtitle: 'La menace grouillante du Quartier Bas',
  summary: 'Des rats géants infestent les tunnels sous le Quartier Bas de Sol-Aureus, terrorisant les habitants les plus pauvres. Au cœur du réseau, le Roi-Rat mutant — une créature corrompue par les résidus de la Fracture — règne sur une armée de rongeurs difformes.',
  levelRange: '1-2',
  themes: ['infestation', 'quartier pauvre', 'corruption magique'],
  chapterIntro: {
    text: 'Les habitants du Quartier Bas vivent dans la peur. Chaque nuit, des rats gros comme des chiens s\'aventurent dans les maisons, dévorant les réserves de nourriture et attaquant les imprudents. La garde ne daigne pas intervenir — après tout, ce ne sont que des rats, et le Quartier Bas n\'est pas une priorité. Mais les anciens murmurent : « Le Roi-Rat se réveille. »',
    mood: 'désespoir',
    music: 'ambiance-quartier-bas'
  },
  chapterConclusion: {
    text: 'Le Roi-Rat est mort, et son emprise sur la horde se dissipe. Les rats survivants fuient dans les profondeurs, redevenant de simples nuisibles plutôt qu\'une armée organisée. Le Quartier Bas respire enfin, et les habitants les plus reconnaissants offrent ce qu\'ils peuvent — bien peu en pièces, mais riche en gratitude.',
    mood: 'soulagement',
    music: 'ambiance-quartier-bas-jour'
  },
  rewards: { xp: 150, gold: '20 po', items: ['Amulette du Roi-Rat (permet de communiquer avec les rats ordinaires)', 'Fourrure de Rat Géant (armure légère improvisée, CA 12)'] },
  scenes: [
    {
      id: 'rats-tunnels',
      sceneNumber: 1,
      title: 'Les Tunnels Grouillants',
      type: 'exploration',
      location: 'Tunnels sous le Quartier Bas',
      locationId: 'quartier-bas-tunnels',
      estimatedMinutes: 15,
      readAloud: {
        text: 'L\'entrée des tunnels est un trou béant dans le mur d\'une cave effondrée du Quartier Bas. Dès que vous franchissez le seuil, le grattement de centaines de griffes sur la pierre emplit vos oreilles. L\'odeur est insoutenable — un mélange d\'urine, de pourriture et de musc animal qui vous brûle les narines.\n\nLes tunnels sont un labyrinthe de conduits naturels et de vieux égouts abandonnés. Le sol est couvert d\'excréments et de débris rongés. Des yeux rouges — des dizaines, des centaines — vous observent depuis les ombres, mais les petits rats s\'écartent sur votre passage, comme obéissant à un ordre silencieux.\n\nLe tunnel principal descend en pente douce vers un carrefour où trois passages s\'ouvrent. Des marques de griffes profondes — bien plus grosses que celles de rats ordinaires — rayent les murs.',
        mood: 'dégoût',
        music: 'ambiance-rats'
      },
      gmNotes: [
        { type: 'info', text: 'Des centaines de rats normaux sont présents mais n\'attaquent pas tant que le Roi-Rat ne le commande pas. Le passage central mène à la salle d\'élevage, le gauche à un cul-de-sac avec du butin, le droit à un éboulement.' },
        { type: 'warning', text: 'Si les joueurs attaquent les petits rats, la horde riposte : nuée de rats (PV 24, CA 10, morsures multiples +2, 2d6 perforant). Mieux vaut les ignorer.' },
        { type: 'secret', text: 'Un ancien vagabond vit dans une niche creusée dans le mur (Perception DD 14). Il connaît le chemin et peut guider les joueurs — contre de la nourriture.' },
        { type: 'tip', text: 'Le feu et le bruit (tambour, cloches) font fuir les rats ordinaires temporairement.' }
      ],
      skillChecks: [
        { skill: 'Survie', dc: 12, success: 'Vous identifiez les traces des plus gros rats et trouvez le chemin le plus direct vers leur tanière.', failure: 'Les tunnels se ressemblent tous dans cette puanteur.' },
        { skill: 'Perception', dc: 14, success: 'Vous repérez une niche habitée — un vieil homme y survit en cohabitation avec les rats. Il connaît le chemin.', failure: 'Rien que des rats et de la crasse.' },
        { skill: 'Dressage', dc: 13, success: 'Vous parvenez à calmer les rats les plus proches. Ils ne vous considèrent pas comme une menace.', failure: 'Les rats sifflent et se rapprochent dangereusement.' }
      ],
      choices: [
        {
          id: 'choix-tunnels-rats',
          prompt: 'Comment progressez-vous ?',
          options: [
            {
              label: 'Suivre le guide',
              description: 'Accepter l\'aide du vagabond (si trouvé).',
              consequence: 'Le vieil homme vous mène directement à la salle d\'élevage par un chemin sûr.',
              nextScene: 'rats-salle-elevage'
            },
            {
              label: 'Avancer prudemment',
              description: 'Naviguer les tunnels par vos propres moyens.',
              consequence: 'Vous finissez par trouver le chemin, mais rencontrez une patrouille de rats géants.',
              nextScene: 'rats-salle-elevage'
            },
            {
              label: 'Utiliser le feu',
              description: 'Créer des torches et avancer en brûlant les toiles et nids.',
              consequence: 'Efficace pour dégager le chemin, mais alerte le Roi-Rat de votre présence.',
              nextScene: 'rats-salle-elevage'
            }
          ]
        }
      ],
      loot: ['Sac de pièces égarées : 8 po (passage de gauche)', 'Dague rouillée mais fonctionnelle'],
      nextScenes: ['rats-salle-elevage'],
      previousScene: undefined
    },
    {
      id: 'rats-salle-elevage',
      sceneNumber: 2,
      title: 'La Salle d\'Élevage',
      type: 'combat',
      location: 'Caverne d\'élevage des rats géants',
      locationId: 'rats-elevage',
      estimatedMinutes: 20,
      readAloud: {
        text: 'Le tunnel s\'ouvre sur une caverne naturelle de taille impressionnante — au moins quinze mètres de diamètre. Le sol est couvert d\'une litière de paille, de tissu et de débris organiques formant un immense nid communautaire. Des dizaines de rats géants — de la taille de gros chiens — grouillent ici, nourrissant leurs petits avec des carcasses volées.\n\nAu centre de la caverne, trois rats géants particulièrement imposants semblent monter la garde autour d\'une portée de ratons déjà de taille anormale. Leur fourrure est tachetée de marques luminescentes violettes — la signature de la corruption de la Fracture.\n\nL\'un des gardes vous repère et pousse un cri strident qui alerte toute la salle. Les rats géants se tournent vers vous, babines retroussées, yeux luisant d\'une intelligence malveillante.',
        mood: 'grouillant',
        music: 'combat-nuee'
      },
      gmNotes: [
        { type: 'info', text: '3 rats géants gardes + 1 nuée de rats normaux. La salle a plusieurs niveaux (rochers, corniches) offrant des positions tactiques.' },
        { type: 'tip', text: 'Les rats géants peuvent être distraits par de la nourriture lancée loin. Un test de Dressage DD 14 peut en détourner un du combat.' },
        { type: 'warning', text: 'Si les joueurs ont utilisé le feu dans les tunnels, les rats sont en alerte et ne peuvent pas être surpris. De plus, un rat géant supplémentaire est présent.' },
        { type: 'secret', text: 'Parmi les débris du nid, un médaillon d\'argent appartenant à un des disparus du Quartier Bas. Le ramener à la famille octroie +2 réputation.' }
      ],
      skillChecks: [
        { skill: 'Discrétion', dc: 14, success: 'Vous contournez la salle sans éveiller l\'attention de tous les rats. Seuls 2 gardes vous repèrent.', failure: 'Toute la salle est en alerte !' },
        { skill: 'Dressage', dc: 14, success: 'Vous parvenez à détourner un rat géant en lançant des rations. Il quitte le combat pour manger.', failure: 'Le rat ignore la nourriture et charge.' }
      ],
      encounter: {
        name: 'Les Gardiens du Nid',
        enemies: [
          { name: 'Rat Géant Corrompu', hp: 18, atk: 5, ac: 13, cr: 0.5, abilities: ['Morsure : +5, 1d6+3 perforant + maladie (DD Con 11 ou empoisonné 1h)', 'Corruption de la Fracture : résistance au poison', 'Cri d\'alerte : peut appeler 1d4 rats normaux par round'] },
          { name: 'Nuée de Rats', hp: 24, atk: 2, ac: 10, cr: 0.25, abilities: ['Morsures multiples : +2, 2d6 perforant', 'Nuée : peut occuper l\'espace d\'une autre créature', 'Résistance aux dégâts physiques (sauf zone)', 'Vulnérabilité au feu'] }
        ],
        terrain: ['Nid de débris (terrain difficile)', 'Rochers (couverture partielle)', 'Corniches à 2m de hauteur (positions surélevées)', 'Litière organique (inflammable)'],
        tactics: 'Les rats géants chargent en meute, ciblant le même personnage. La nuée tente de submerger les personnages isolés. Si un rat tombe, les autres deviennent plus agressifs.',
        loot: ['Médaillon d\'argent (disparu du Quartier Bas)', 'Fourrure de Rat Géant x2 (5 po chacune)', 'Dents de rat corrompu (composant alchimique, 8 po)']
      },
      choices: [
        {
          id: 'choix-elevage',
          prompt: 'Après le combat, que faites-vous des ratons corrompus ?',
          options: [
            {
              label: 'Éliminer les ratons',
              description: 'Empêcher la corruption de se propager.',
              consequence: 'Pragmatique mais efficace. La population de rats géants ne se régénérera pas.'
            },
            {
              label: 'Les laisser',
              description: 'Ce ne sont que des bébés, après tout.',
              consequence: 'Les ratons survivent et, sans le Roi-Rat, redeviennent des rats géants non-corrompus. Certains pourraient être domestiqués.'
            }
          ]
        }
      ],
      loot: ['Médaillon d\'argent', 'Fourrure de Rat Géant x2', 'Dents corrompues'],
      nextScenes: ['rats-taniere-roi'],
      previousScene: 'rats-tunnels'
    },
    {
      id: 'rats-taniere-roi',
      sceneNumber: 3,
      title: 'La Tanière du Roi-Rat',
      type: 'combat',
      location: 'Chambre du Roi-Rat Mutant',
      locationId: 'rats-roi',
      estimatedMinutes: 25,
      readAloud: {
        text: 'Un tunnel plus large que les autres, tapissé d\'os rongés et de trophées macabres — des crânes humains parmi les crânes animaux — mène à une caverne aux proportions imposantes. Au centre trône une masse de chair, de fourrure et de queues entremêlées qui vous glace le sang.\n\nLe Roi-Rat est une abomination : un rat de la taille d\'un ours, son corps gonflé et déformé par la corruption de la Fracture. Des excroissances cristallines violettes percent sa fourrure, et ses yeux — six au lieu de deux — brillent d\'une intelligence terrifiante. Autour de lui, une cour de rats difformes attend ses ordres.\n\nLa créature se redresse sur ses pattes arrière et émet un cri qui fait vibrer les murs. Les rats autour de lui se mettent en formation, prêts au combat. Le message est clair : vous êtes dans son royaume, et il n\'a pas l\'intention de partager.',
        mood: 'horreur',
        music: 'combat-boss-mineur'
      },
      gmNotes: [
        { type: 'info', text: 'Le Roi-Rat est une mutation de la Fracture. Il commande télépathiquement tous les rats dans un rayon de 30m. Le tuer brise le lien.' },
        { type: 'warning', text: 'Le Roi-Rat invoque des renforts tous les 2 rounds : 1d4 rats géants arrivent des tunnels latéraux. Bloquer les tunnels (barricades, sorts) empêche les renforts.' },
        { type: 'tip', text: 'Les cristaux sur son corps sont sa faiblesse : un coup ciblé (attaque avec désavantage, ou Investigation DD 14 pour repérer) inflige 1d6 dégâts supplémentaires et le fait hurler, donnant à tous avantage au prochain jet d\'attaque.' },
        { type: 'secret', text: 'Le Roi-Rat porte une amulette enfoncée dans sa chair — un ancien artéfact qui l\'a mutée. L\'extraire (Médecine DD 14 après sa mort) donne l\'Amulette du Roi-Rat.' }
      ],
      skillChecks: [
        { skill: 'Investigation', dc: 14, success: 'Vous repérez les excroissances cristallines comme points faibles. Les cibler inflige des dégâts supplémentaires.', failure: 'La masse de chair et de cristaux est confuse et terrifiante.' },
        { skill: 'Médecine', dc: 14, success: 'Après le combat, vous extrayez l\'amulette enfoncée dans la chair du Roi-Rat. Elle pulse encore d\'énergie.', failure: 'L\'amulette est trop profondément enfoncée et se brise lors de l\'extraction.' }
      ],
      encounter: {
        name: 'Le Roi-Rat Mutant',
        enemies: [
          { name: 'Roi-Rat Mutant', hp: 52, atk: 7, ac: 14, cr: 3, abilities: ['Morsure Dévastatrice : +7, 2d6+4 perforant + 1d6 poison (DD Con 13)', 'Queue Fouet : +5, 1d8+3 contondant, cible à 3m', 'Cri du Roi (Recharge 5-6) : DD Sag 13 ou effrayé 1 round, invoque 1d4 rats géants', 'Corruption Cristalline : résistance au poison et au nécrotique', 'Points faibles cristallins : attaque ciblée (désavantage) inflige +1d6 et donne avantage au prochain jet allié'] },
          { name: 'Rat Géant d\'Élite', hp: 14, atk: 4, ac: 12, cr: 0.5, abilities: ['Morsure : +4, 1d6+2 perforant + maladie DD Con 11'] }
        ],
        terrain: ['Trône d\'os (couverture pour le Roi-Rat)', 'Tunnels latéraux (source de renforts)', 'Cristaux au sol (terrain difficile, 1d4 perforant si chute)', 'Plafond bas (2,5m, désavantage aux armes d\'hast)'],
        tactics: 'Le Roi-Rat utilise Cri du Roi au round 1, puis alterne Morsure et Queue. Il reste sur son trône tant que possible. À 15 PV, il tente de fuir vers un tunnel arrière — le poursuivre risque de mener à un cul-de-sac effondré.',
        loot: ['Amulette du Roi-Rat (communication avec les rats, si Médecine DD 14)', 'Cristaux de Fracture x3 (composants magiques, 15 po chacun)', 'Trésor accumulé : 20 po, bijoux volés (30 po)', 'Fourrure Royale (armure légère improvisée, CA 12)']
      },
      choices: [
        {
          id: 'choix-roi-rat',
          prompt: 'Le Roi-Rat est vaincu. Que faites-vous ?',
          options: [
            {
              label: 'Sceller les tunnels',
              description: 'Provoquer un éboulement pour fermer l\'accès depuis le Quartier Bas.',
              consequence: 'Les tunnels sont bloqués. Le Quartier Bas est protégé de futures infestations, mais le réseau souterrain est inaccessible.'
            },
            {
              label: 'Laisser les tunnels ouverts',
              description: 'Le réseau pourrait être utile plus tard.',
              consequence: 'Les tunnels restent un passage secret sous Sol-Aureus. Utile pour de futures aventures, mais risque de nouvelle infestation à terme.'
            }
          ]
        }
      ],
      loot: ['Amulette du Roi-Rat', 'Cristaux de Fracture x3', '50 po en or et bijoux', 'Fourrure Royale'],
      nextScenes: [],
      previousScene: 'rats-salle-elevage'
    }
  ]
};

// ============================================================================
// EXPORT
// ============================================================================

export const MINI_DUNGEONS_ACT_1: BookChapter[] = [
  CAVE_DE_BROK,
  EGOUTS_MAUDITS,
  CRYPTE_HEROS_OUBLIE,
  NID_DES_RATS
];
