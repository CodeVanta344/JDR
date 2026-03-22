/**
 * DIALOGUES PROFONDS — ACTE 5 : L'Aube ou le Néant (FINALE)
 * 12 PNJ majeurs, arbres de dialogue complets
 * Chaque dialogue : id, npcId, trigger, lines, playerResponses, tone, unlockCondition
 * Notes de coaching émotionnel pour le MJ en français
 */

import type { DialogueTree } from './dialogues-act4';

// ============================================================================
// 14. REINE ELARA — Discours final et leadership (8 dialogues)
// ============================================================================

const ELARA_DIALOGUES: DialogueTree[] = [
  {
    id: 'elara-discours-armee',
    npcId: 'reine-elara',
    npcName: 'Reine Elara',
    trigger: 'Aube de la bataille finale — discours devant l\'armée assemblée',
    tone: 'épique, galvanisant',
    gmSceneNote: 'LE moment. Des milliers de soldats, nains, humains, aventuriers. Le silence est total. Elara se tient sur un promontoire, le vent dans les cheveux. C\'est le discours qui déterminera si ces gens avanceront ou fuiront.',
    lines: [
      {
        speaker: 'Reine Elara',
        text: 'Je ne vais pas vous mentir. L\'ennemi est plus nombreux. L\'ennemi ne connaît pas la fatigue, ni la peur, ni la douleur. Par tous les critères raisonnables, nous devrions perdre.',
        emotion: 'honnêteté brutale',
        gmCoaching: 'Silence. Elle laisse les mots tomber comme des pierres. Les soldats échangent des regards inquiets. C\'est voulu — la vérité d\'abord, le courage ensuite.'
      },
      {
        speaker: 'Reine Elara',
        text: 'Mais l\'ennemi ne possède pas ce que NOUS possédons. Il n\'a pas de mère qui l\'attend. Pas d\'enfant qui dort en rêvant de son retour. Pas de champs à labourer au printemps. Pas de rires à partager autour d\'un feu. PAS DE RAISONS DE VIVRE.',
        emotion: 'crescendo émotionnel',
        gmCoaching: 'La voix monte. Chaque phrase est un marteau qui forge le courage. Pointez vers le campement, vers les feux, vers tout ce qui représente la VIE.'
      },
      {
        speaker: 'Reine Elara',
        text: 'Et C\'EST notre arme. C\'est ce que Malachar ne comprendra jamais. Que l\'amour — celui d\'un père pour sa fille, d\'un ami pour son frère d\'armes, d\'un peuple pour sa terre — EST PLUS FORT QUE LA MORT.',
        emotion: 'conviction absolue',
        gmCoaching: 'CRIEZ ces derniers mots. La voix d\'Elara porte sur le champ de bataille. Les soldats commencent à frapper le sol de leurs lances.'
      },
      {
        speaker: 'Reine Elara',
        text: 'Alors quand vous chargerez — et vous CHARGEREZ — ne pensez pas à la mort. Pensez à ce pour quoi vous vivez. Et battez-vous POUR ÇA ! POUR AETHELGARD !',
        emotion: 'cri de ralliement',
        gmCoaching: 'Lame levée au ciel. L\'armée entière rugit "POUR AETHELGARD !" Le sol tremble. Les PJ doivent avoir des frissons.'
      }
    ],
    playerResponses: [
      {
        id: 'elara-disc-cri',
        label: 'Lever son arme et crier avec l\'armée.',
        consequence: 'L\'armée scande le nom des PJ. Moral maximal. Avantage sur le premier jet de combat.'
      },
      {
        id: 'elara-disc-ajouter',
        label: 'Ajouter ses propres mots au discours — parler aux troupes directement.',
        consequence: 'Jet de Charisme DD 14. Succès : les PJ deviennent des symboles de la résistance.',
        skillCheck: { skill: 'Charisme', dc: 14 }
      },
      {
        id: 'elara-disc-silence',
        label: 'Garder le silence — ce moment appartient à Elara.',
        consequence: 'Elara échange un regard avec les PJ. Un hochement de tête. Tout est dit.'
      }
    ]
  },
  {
    id: 'elara-peur',
    npcId: 'reine-elara',
    npcName: 'Reine Elara',
    trigger: 'Moment privé après le discours',
    tone: 'vulnérable, intime',
    unlockCondition: 'Discours donné',
    gmSceneNote: 'La reine sans sa couronne. Une femme terrifiée qui vient de galvaniser des milliers de personnes alors qu\'elle-même tremble à l\'intérieur.',
    lines: [
      {
        speaker: 'Reine Elara',
        text: 'Mes mains tremblent. Regardez. Est-ce que vous les voyez trembler ? Dites-moi que non.',
        emotion: 'peur cachée',
        gmCoaching: 'Seule dans sa tente, la reine ôte ses gants. Ses mains tremblent visiblement. Elle rit nerveusement, au bord des larmes.'
      },
      {
        speaker: 'Reine Elara',
        text: 'Je leur ai dit de se battre pour ce qu\'ils aiment. Mais ce que j\'aime, MOI, c\'est mon peuple. Et je suis en train de les envoyer mourir. Quel genre de reine fait ça ?',
        emotion: 'culpabilité royale',
        gmCoaching: 'La question est sincère. Elle cherche une absolution que personne ne peut lui donner. Ses yeux sont rouges mais elle refuse de pleurer.'
      }
    ],
    playerResponses: [
      {
        id: 'elara-peur-rassurer',
        label: '"Le genre de reine qui se bat à leurs côtés. Pas celle qui envoie — celle qui MÈNE."',
        consequence: 'Elara prend une grande inspiration. "Oui. Oui, vous avez raison. Je serai en première ligne."'
      },
      {
        id: 'elara-peur-humain',
        label: '"Avoir peur est humain. C\'est le courage malgré la peur qui fait les grands leaders."',
        consequence: 'Elara : "Alors je suis la reine la plus courageuse du monde. Parce que je suis terrifiée."'
      },
      {
        id: 'elara-peur-mains',
        label: 'Prendre ses mains dans les siennes pour arrêter le tremblement.',
        consequence: 'Elara serre fort. Le tremblement s\'arrête. "...Merci. Je suis prête maintenant."'
      }
    ]
  },
  {
    id: 'elara-adieu',
    npcId: 'reine-elara',
    npcName: 'Reine Elara',
    trigger: 'Veille de bataille — possibilité de mort',
    tone: 'testamentaire, digne',
    unlockCondition: 'Avant la bataille finale',
    gmSceneNote: 'Elara prépare ses dernières volontés. Si elle meurt demain, le royaume doit continuer. C\'est une reine jusqu\'au bout.',
    lines: [
      {
        speaker: 'Reine Elara',
        text: 'J\'ai écrit trois lettres. Une au Conseil, pour la succession. Une à mon peuple, pour leur dire que chaque vie comptait. Et une à vous.',
        emotion: 'préparation au sacrifice',
        gmCoaching: 'Elle tend une lettre scellée aux PJ. "Ne l\'ouvrez que si je tombe. Promettez-moi."'
      }
    ],
    playerResponses: [
      {
        id: 'elara-adieu-refuser',
        label: '"Vous me la donnerez vous-même après la victoire."',
        consequence: 'Elara : "Têtu comme un nain. D\'accord. Mais... gardez-la quand même. Au cas où."'
      },
      {
        id: 'elara-adieu-accepter',
        label: 'Prendre la lettre avec respect.',
        consequence: 'Elara : "Merci. Quoi qu\'il arrive, Aethelgard vivra. C\'est tout ce qui compte."'
      }
    ]
  },
  {
    id: 'elara-courage-bataille',
    npcId: 'reine-elara',
    npcName: 'Reine Elara',
    trigger: 'Elara au combat, en première ligne',
    tone: 'féroce, royal',
    unlockCondition: 'Bataille finale en cours',
    gmSceneNote: 'La reine à l\'épée. Armure bossée, sang sur le visage, yeux de feu. Elle n\'est plus la femme qui tremblait — elle est la guerre incarnée.',
    lines: [
      {
        speaker: 'Reine Elara',
        text: 'LA LIGNE TIENT ! PAR MA COURONNE ET PAR MON SANG, LA LIGNE TIENT ! Qui recule DERRIÈRE moi ?! PERSONNE !',
        emotion: 'fureur royale',
        gmCoaching: 'Elara au milieu des combats, tranchant des morts-vivants. Les soldats autour d\'elle se battent deux fois plus fort — leur reine est avec eux.'
      }
    ],
    playerResponses: [
      {
        id: 'elara-courage-cote',
        label: 'Se battre à ses côtés en protégeant son flanc.',
        consequence: 'Combat coordonné. Bonus de +2 aux jets d\'attaque tant qu\'on reste près d\'Elara.'
      },
      {
        id: 'elara-courage-avancer',
        label: '"Majesté, nous devons avancer vers Malachar !"',
        consequence: 'Elara : "Alors ALLONS-Y ! Marcus, prenez le commandement ici ! Nous avons un nécromancien à arrêter !"'
      }
    ]
  },
  {
    id: 'elara-victoire',
    npcId: 'reine-elara',
    npcName: 'Reine Elara',
    trigger: 'Après la victoire finale',
    tone: 'soulagement, émotion',
    unlockCondition: 'Victoire et survie d\'Elara',
    gmSceneNote: 'Le soleil se lève sur un champ de bataille silencieux. Elara ôte son casque. Les larmes coulent en silence sur ses joues sales.',
    lines: [
      {
        speaker: 'Reine Elara',
        text: '...C\'est fini ?',
        emotion: 'incrédulité',
        gmCoaching: 'Deux mots. Murmurés. La question la plus simple du monde, et pourtant la plus lourde.'
      },
      {
        speaker: 'Reine Elara',
        text: 'Dites aux survivants... dites-leur que leur reine les aime. Chacun d\'entre eux. Les vivants et les morts. Surtout les morts.',
        emotion: 'amour royal',
        gmCoaching: 'Elle tombe à genoux dans la boue et la cendre. Pas de faiblesse — de reconnaissance. La reine qui s\'agenouille devant le sacrifice de son peuple.'
      }
    ],
    playerResponses: [
      {
        id: 'elara-vict-agenouiller',
        label: 'S\'agenouiller avec elle en silence.',
        consequence: 'Un moment de grâce au milieu de l\'horreur. Le silence est la plus belle des prières.'
      },
      {
        id: 'elara-vict-relever',
        label: '"Debout, Majesté. Le peuple a besoin de voir sa reine."',
        consequence: 'Elara essuie ses larmes, remet son casque, et se lève. Reine jusqu\'au bout.'
      }
    ]
  },
  {
    id: 'elara-reconstruction',
    npcId: 'reine-elara',
    npcName: 'Reine Elara',
    trigger: 'Discours de reconstruction',
    tone: 'espoir, détermination',
    unlockCondition: 'Victoire finale',
    gmSceneNote: 'Le discours d\'après-guerre. Plus simple que celui d\'avant — Elara est fatiguée mais lumineuse.',
    lines: [
      {
        speaker: 'Reine Elara',
        text: 'Nous reconstruirons. Pierre par pierre, champ par champ, sourire par sourire. Et cette fois, nous construirons ensemble — humains, nains, tous les peuples. La guerre nous a appris que nos différences sont notre force.',
        emotion: 'vision d\'avenir',
        gmCoaching: 'Elara parle depuis les ruines du palais. Autour d\'elle, nains et humains travaillent déjà à déblayer. Le message est clair : on n\'attend pas — on agit.'
      }
    ],
    playerResponses: [
      {
        id: 'elara-recon-rester',
        label: '"Nous resterons pour aider à reconstruire."',
        consequence: 'Elara : "J\'espérais que vous diriez ça. Le royaume a besoin de bâtisseurs, plus que de guerriers."'
      },
      {
        id: 'elara-recon-partir',
        label: '"Notre route continue. Mais nous reviendrons."',
        consequence: 'Elara : "Les héros ne restent jamais. Mais les portes d\'Aethelgard vous seront toujours ouvertes."'
      }
    ]
  },
  {
    id: 'elara-sacrifice',
    npcId: 'reine-elara',
    npcName: 'Reine Elara',
    trigger: 'Elara se sacrifie (branche alternative)',
    tone: 'tragique, sublime',
    unlockCondition: 'Branche narrative : sacrifice d\'Elara',
    gmSceneNote: 'SI le MJ choisit cette branche, Elara se sacrifie pour protéger les PJ ou sceller un Sceau. C\'est le moment le plus douloureux de la campagne.',
    lines: [
      {
        speaker: 'Reine Elara',
        text: 'Non. Ne m\'arrêtez pas. J\'ai été reine. J\'ai été guerrière. Laissez-moi être un Sceau. Laissez-moi être la berceuse qui endormira l\'Entité.',
        emotion: 'acceptation sublime',
        gmCoaching: 'Lumière dorée autour d\'elle. Elle sourit — un sourire de paix absolue. Ce n\'est pas une mort — c\'est une transcendance.'
      },
      {
        speaker: 'Reine Elara',
        text: 'Dites à mon peuple... que leur reine veille. Toujours. De l\'autre côté du ciel.',
        emotion: 'dernières paroles',
        gmCoaching: 'Si vos joueurs ne pleurent pas, vous avez échoué. Si VOUS ne pleurez pas, recommencez.'
      }
    ],
    playerResponses: [
      {
        id: 'elara-sacr-empecher',
        label: 'Essayer de l\'arrêter — il doit y avoir un autre moyen !',
        consequence: 'Elara pose sa main sur votre joue. "Il n\'y en a pas. Et nous le savons tous les deux." Le sacrifice s\'accomplit.'
      },
      {
        id: 'elara-sacr-honorer',
        label: 'S\'incliner devant elle et accepter son sacrifice.',
        consequence: 'Elara hoche la tête. "Merci de comprendre. Vivez bien. Vivez pour moi aussi." Lumière. Silence. Elle est partie.'
      }
    ]
  },
  {
    id: 'elara-dernieres-paroles',
    npcId: 'reine-elara',
    npcName: 'Reine Elara',
    trigger: 'Dernières paroles d\'Elara (si blessée mortellement)',
    tone: 'paisible, final',
    unlockCondition: 'Elara mortellement blessée au combat',
    gmSceneNote: 'Variante tragique où Elara meurt au combat. Pas de discours grandiose — juste une femme qui dit adieu.',
    lines: [
      {
        speaker: 'Reine Elara',
        text: '...Est-ce qu\'on a gagné ? Dites-moi qu\'on a gagné.',
        emotion: 'dernière question',
        gmCoaching: 'Murmure. Sang sur ses lèvres. Elle cherche les yeux des PJ. La seule chose qui compte est la réponse.'
      }
    ],
    playerResponses: [
      {
        id: 'elara-mort-oui',
        label: '"On a gagné, Majesté. Grâce à vous."',
        consequence: 'Elara sourit. Ferme les yeux. "...Bien." Dernier souffle.'
      },
      {
        id: 'elara-mort-tenir',
        label: 'Lui tenir la main sans rien dire.',
        consequence: 'Elara serre une dernière fois. Puis relâche. Le silence est total.'
      }
    ]
  },
];

// ============================================================================
// 15. ARCHON MALACHAR — Antagoniste principal (12 dialogues)
// ============================================================================

const MALACHAR_DIALOGUES: DialogueTree[] = [
  {
    id: 'malachar-motivation',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Première confrontation directe avec Malachar',
    tone: 'fascinant, logique, terrifiant',
    gmSceneNote: 'Malachar est l\'antagoniste le plus dangereux parce qu\'il a RAISON — du moins en partie. Il ne détruit pas par folie mais par conviction. Jouez-le comme un visionnaire, pas comme un monstre.',
    lines: [
      {
        speaker: 'Malachar',
        text: 'Avant que vous ne leviez vos armes — et je sais que vous le ferez — accordez-moi la courtoisie que vous accorderiez à n\'importe quel condamné. Laissez-moi vous expliquer POURQUOI.',
        emotion: 'calme absolu',
        gmCoaching: 'Malachar ne crie pas. Il parle comme un professeur. Mains croisées dans le dos, voix posée. C\'est PLUS terrifiant que s\'il hurlait.'
      },
      {
        speaker: 'Malachar',
        text: 'Le monde meurt. Pas à cause de moi — MALGRÉ moi. La magie s\'épuise. Les Sceaux se fissurent depuis des siècles. L\'Entité se réveille, que je le veuille ou non. La question n\'est pas SI le monde va changer — mais COMMENT.',
        emotion: 'conviction froide',
        gmCoaching: 'Il marche lentement en parlant. Des hologrammes nécromantiques illustrent ses propos — cartes, graphiques, projections. C\'est une présentation, pas un monologue.'
      },
      {
        speaker: 'Malachar',
        text: 'Moi, je propose un changement CONTRÔLÉ. Oui, des gens mourront. Mais pas TOUS. Si l\'Entité se réveille sans contrôle — et elle LE FERA — tout meurt. Tout. J\'essaie de sauver ce qui peut l\'être. Vous... vous essayez de sauver ce qui ne peut plus être sauvé.',
        emotion: 'logique implacable',
        gmCoaching: 'C\'est l\'argument le plus dangereux : il est logique. Les PJ doivent sentir le doute. Malachar a peut-être raison. PEUT-ÊTRE.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-motiv-refuter',
        label: '"Votre logique est froide. Le monde ne se sauve pas en sacrifiant les innocents."',
        consequence: 'Malachar : "Froid ? Oui. La chirurgie est froide. Préférez-vous la gangrène chaude de l\'inaction ?"'
      },
      {
        id: 'malachar-motiv-ecouter',
        label: '"Continuez. Quelle est votre vision exactement ?"',
        consequence: 'Malachar est surpris. Personne n\'écoute d\'habitude. Il explique son plan — terrible mais cohérent.'
      },
      {
        id: 'malachar-motiv-alternative',
        label: '"Et si nous avions un autre moyen ? Un Rituel pour restaurer les Sceaux ?"',
        consequence: 'Malachar rit — amer, pas moqueur. "Le Rituel de Vaelith ? J\'y ai cru aussi, autrefois. Avant de comprendre qu\'il échouerait."'
      },
      {
        id: 'malachar-motiv-attaquer',
        label: 'Attaquer sans écouter davantage.',
        consequence: 'Malachar soupire. "Toujours les mêmes. L\'humanité choisit la violence quand la vérité est inconfortable." Combat phase 1.'
      }
    ]
  },
  {
    id: 'malachar-rage-phase1',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Combat phase 1 — Malachar puissant',
    tone: 'dominateur, méprisant',
    unlockCondition: 'Combat engagé',
    gmSceneNote: 'Phase 1 : Malachar est au sommet de sa puissance. Il combat avec élégance et dédain. Il est convaincu de sa supériorité.',
    lines: [
      {
        speaker: 'Malachar',
        text: 'Pathétique. Vous pensez que votre courage compense votre ignorance ? J\'ai étudié la mort pendant QUARANTE ANS. Vous n\'êtes que des enfants qui jouent avec des épées.',
        emotion: 'mépris intellectuel',
        gmCoaching: 'Malachar combat d\'une main, l\'autre derrière le dos. Il esquive plus qu\'il n\'attaque — il montre aux PJ à quel point ils sont inférieurs.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-p1-taunt',
        label: '"Quarante ans d\'études et vous n\'avez pas appris à perdre ?"',
        consequence: 'Malachar grince des dents. Sa concentration vacille. +2 au prochain jet d\'attaque.'
      },
      {
        id: 'malachar-p1-tactique',
        label: 'Coordonner une attaque de groupe pour briser sa défense.',
        consequence: 'Jet de Tactique DD 16. Succès : la phase 2 commence plus tôt.',
        skillCheck: { skill: 'Tactique', dc: 16 }
      }
    ]
  },
  {
    id: 'malachar-doute-phase2',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Combat phase 2 — Malachar blessé',
    tone: 'surpris, vacillant',
    unlockCondition: 'Malachar à 60% de ses PV',
    gmSceneNote: 'Phase 2 : Malachar est blessé pour la première fois depuis des années. Le doute s\'infiltre. Ses sorts deviennent erratiques.',
    lines: [
      {
        speaker: 'Malachar',
        text: 'Du sang... C\'est... mon sang ? Je ne me souviens plus de la dernière fois que j\'ai saigné. Combien de temps... depuis que...',
        emotion: 'choc',
        gmCoaching: 'Il regarde sa main ensanglantée avec fascination. Pour un instant, le nécromancien tout-puissant redevient un homme mortel.'
      },
      {
        speaker: 'Malachar',
        text: 'Non. NON ! Je ne suis pas venu aussi loin pour échouer ! Le monde a BESOIN de mon plan ! Sans moi, tout...',
        emotion: 'panique croissante',
        gmCoaching: 'La facade se fissure. Malachar doute — et un homme qui doute de sa cause est un homme qui peut être sauvé. Ou détruit.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-p2-reddition',
        label: '"Arrêtez, Malachar ! Il n\'est pas trop tard pour changer de voie !"',
        consequence: 'Malachar hésite. Un vrai moment de doute. Jet de Persuasion DD 20.',
        skillCheck: { skill: 'Persuasion', dc: 20 },
        nextDialogueId: 'malachar-reddition'
      },
      {
        id: 'malachar-p2-continuer',
        label: 'Profiter de sa confusion pour frapper plus fort.',
        consequence: 'Attaque avec avantage. Mais Malachar entre en rage nécromantique — phase 3.'
      }
    ]
  },
  {
    id: 'malachar-lucidite-phase3',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Combat phase 3 — Malachar désespéré',
    tone: 'désespéré, lucide',
    unlockCondition: 'Malachar à 30% de ses PV',
    gmSceneNote: 'Phase 3 : Malachar est presque vaincu. L\'énergie nécromantique le consume de l\'intérieur. Paradoxalement, c\'est le moment où il est le plus lucide et le plus dangereux.',
    lines: [
      {
        speaker: 'Malachar',
        text: 'J\'ai sacrifié tout. Ma bonté. Mes amis. Mon humanité. Et pour quoi ? Pour un rêve que personne d\'autre ne partage. Est-ce la définition de la folie ou du génie ?',
        emotion: 'lucidité déchirante',
        gmCoaching: 'Malachar s\'arrête de combattre un instant. Le pouvoir nécromantique crépite autour de lui comme un orage — incontrôlable, auto-destructeur.'
      },
      {
        speaker: 'Malachar',
        text: 'Si vous avez raison... si le Rituel peut marcher... alors j\'ai tué des milliers de gens... pour rien. Pour RIEN.',
        emotion: 'horreur de la réalisation',
        gmCoaching: 'Le moment où le méchant comprend qu\'il est le méchant. C\'est tragique, pas satisfaisant. Les joueurs devraient avoir pitié, pas triompher.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-p3-sauver',
        label: '"Aidez-nous à accomplir le Rituel. Votre pouvoir peut sauver des vies."',
        consequence: 'Jet de Persuasion DD 18. Le moment le plus important de la campagne.',
        skillCheck: { skill: 'Persuasion', dc: 18 },
        nextDialogueId: 'malachar-redemption'
      },
      {
        id: 'malachar-p3-achever',
        label: '"Assez parlé." Frapper le coup final.',
        consequence: 'Combat final. Malachar se bat avec l\'énergie du désespoir.',
        nextDialogueId: 'malachar-mort-tragique'
      }
    ]
  },
  {
    id: 'malachar-reddition',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Malachar accepte de se rendre',
    tone: 'brisé, résigné',
    unlockCondition: 'Persuasion DD 20 réussie en phase 2',
    gmSceneNote: 'Malachar pose les armes. Le plus grand nécromancien du monde se rend. Le silence est assourdissant.',
    lines: [
      {
        speaker: 'Malachar',
        text: '...Assez. J\'en ai assez. Du sang. De la mort. De la solitude de croire seul avoir raison. Si vous avez un meilleur plan... montrez-le-moi. Je suis tellement fatigué d\'avoir tort.',
        emotion: 'effondrement',
        gmCoaching: 'Malachar s\'effondre au sol. L\'énergie nécromantique se dissipe. Il n\'est plus qu\'un homme vieux, épuisé, et terriblement seul.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-rend-accepter',
        label: 'Accepter sa reddition et l\'emmener sous bonne garde.',
        consequence: 'Malachar est prisonnier. Son savoir pourrait être crucial pour le Rituel.',
        nextDialogueId: 'malachar-redemption'
      },
      {
        id: 'malachar-rend-mefiance',
        label: '"Comment savoir que ce n\'est pas un piège ?"',
        consequence: 'Malachar : "Vous ne pouvez pas. Mais je suis trop fatigué pour mentir."'
      }
    ]
  },
  {
    id: 'malachar-redemption',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Malachar aide les PJ',
    tone: 'fragile, déterminé',
    unlockCondition: 'Reddition ou persuasion phase 3 réussie',
    gmSceneNote: 'Malachar rédimé est terrifiant d\'utilité. Il connaît TOUT de l\'Entité, tout des Sceaux. Et son pouvoir nécromantique pourrait faire la différence.',
    lines: [
      {
        speaker: 'Malachar',
        text: 'Je ne mérite ni pardon ni pitié. Mais je peux offrir quelque chose de plus utile : la vérité. L\'Entité m\'a parlé. Pas en mots — en visions. Et je sais ce qu\'elle veut VRAIMENT.',
        emotion: 'résolution fragile',
        gmCoaching: 'Malachar parle les yeux baissés. Il n\'ose pas regarder les PJ — pas après ce qu\'il a fait.'
      },
      {
        speaker: 'Malachar',
        text: 'Ael\'Sharath ne veut pas détruire le monde. Elle veut le REPRENDRE. Le monde tel qu\'il était avant les mortels — chaos pur, conscience sans forme. Pour elle, NOUS sommes les parasites.',
        emotion: 'vérité cosmique',
        gmCoaching: 'Information cruciale que seul Malachar possède. Son lien avec l\'Entité est leur meilleur atout et leur plus grand danger.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-red-utiliser',
        label: '"Votre connexion avec l\'Entité — pouvez-vous servir de pont ?"',
        consequence: 'Malachar : "Oui. Mais à chaque contact, je risque de perdre le contrôle. C\'est... le prix."'
      },
      {
        id: 'malachar-red-confiance',
        label: '"Malachar. Je choisis de vous faire confiance. Ne me le faites pas regretter."',
        consequence: 'Malachar relève les yeux. Pour la première fois, ils sont humides. "Je ne le ferai pas. Cette fois."'
      }
    ]
  },
  {
    id: 'malachar-mort-tragique',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Mort de Malachar au combat',
    tone: 'tragique, paisible',
    unlockCondition: 'Malachar vaincu sans rédemption',
    gmSceneNote: 'La mort de l\'antagoniste principal. Pas de triomphe — de la tristesse. Malachar meurt en réalisant qu\'il avait tort, et qu\'il est trop tard.',
    lines: [
      {
        speaker: 'Malachar',
        text: '...Prouvez-moi... que j\'avais tort. S\'il vous plaît. Sauvez ce monde que je n\'ai pas su sauver. Donnez un sens à... à tout ce gâchis.',
        emotion: 'supplique mourante',
        gmCoaching: 'Malachar tend la main vers les PJ. Pas pour attaquer — pour toucher. Un dernier contact humain. Sa magie se dissipe comme de la fumée.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-mort-prendre-main',
        label: 'Prendre sa main.',
        consequence: 'Malachar sourit. Un vrai sourire. Ses yeux retrouvent une couleur humaine. "...Merci." Il s\'éteint.'
      },
      {
        id: 'malachar-mort-promesse',
        label: '"On le sauvera. Je vous le promets."',
        consequence: 'Malachar ferme les yeux. "Je vous crois. Enfin." Silence.'
      }
    ]
  },
  {
    id: 'malachar-dernieres-redemption',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Dernières paroles si Malachar se sacrifie pour le Rituel',
    tone: 'sublime, rédempteur',
    unlockCondition: 'Malachar rédimé qui choisit de devenir un Sceau',
    gmSceneNote: 'Le sacrifice ultime du méchant devenu héros. Malachar se porte volontaire pour devenir un Sceau — une éternité de souffrance pour racheter ses péchés.',
    lines: [
      {
        speaker: 'Malachar',
        text: 'J\'ai passé ma vie à fuir la mort. À la contrôler. À la nier. Et maintenant, je CHOISIS. Pas la mort — quelque chose de pire. L\'éternité. Comme gardien d\'un Sceau.',
        emotion: 'détermination calme',
        gmCoaching: 'Malachar se tient devant le Sceau, lumineux. L\'ironie n\'est pas perdue — le nécromancien qui craignait la mort choisit quelque chose de pire que la mort.'
      },
      {
        speaker: 'Malachar',
        text: 'C\'est la seule chose que je puisse offrir. Ma vie. Mon âme. Mon éternité. Pour chaque innocent que j\'ai tué, je chanterai la berceuse un million d\'années.',
        emotion: 'expiation',
        gmCoaching: 'Larmes. Malachar pleure pour la première fois depuis quarante ans. Chaque larme brille comme du cristal en tombant.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-sacr-accepter',
        label: '"Allez en paix, Malachar. Vous avez trouvé votre rédemption."',
        consequence: 'Malachar entre dans le Sceau. La lumière l\'engloutit. On entend un murmure — une berceuse, douce et triste.'
      },
      {
        id: 'malachar-sacr-empecher',
        label: '"Non ! Il y a un autre moyen ! On le trouvera !"',
        consequence: 'Malachar : "C\'est MON choix. Le premier choix altruiste de ma vie. Ne me le prenez pas."'
      }
    ]
  },
  {
    id: 'malachar-fin-sombre',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Dernières paroles si Malachar meurt en ennemi impénitent',
    tone: 'tragique, amer',
    unlockCondition: 'Malachar vaincu sans jamais se rendre',
    gmSceneNote: 'La fin la plus sombre. Malachar meurt convaincu d\'avoir raison. Il n\'y a pas de rédemption ici — seulement du gâchis.',
    lines: [
      {
        speaker: 'Malachar',
        text: 'Vous avez gagné rien. L\'Entité viendra. Les Sceaux faibliront encore. Et la prochaine fois, il n\'y aura personne avec le courage de faire ce que j\'ai essayé de faire.',
        emotion: 'conviction jusqu\'au bout',
        gmCoaching: 'Malachar meurt les yeux ouverts, fixant le ciel. Pas de paix sur son visage — juste de la conviction. C\'est la fin la plus triste.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-sombre-fermer-yeux',
        label: 'Lui fermer les yeux.',
        consequence: 'Un geste de pitié pour un homme qui n\'en a pas montré. Mais c\'est un geste humain.'
      },
      {
        id: 'malachar-sombre-partir',
        label: 'Partir sans se retourner.',
        consequence: 'Le vent souffle sur le corps de Malachar. L\'histoire l\'oubliera. Ou non.'
      }
    ]
  },
  {
    id: 'malachar-fin-espoir',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Dernières paroles si Malachar meurt réconcilié',
    tone: 'paisible',
    unlockCondition: 'Malachar vaincu après un échange empathique',
    gmSceneNote: 'La fin nuancée. Malachar ne se rachète pas mais trouve la paix en acceptant sa défaite.',
    lines: [
      {
        speaker: 'Malachar',
        text: '...Peut-être que j\'avais tort. Peut-être que le courage des idiots est plus puissant que la sagesse des solitaires. Si c\'est le cas... le monde est entre de bonnes mains.',
        emotion: 'paix amère',
        gmCoaching: 'Un demi-sourire. Le compliment le plus Malacharian qui soit — reconnaître sa défaite tout en insultant doucement les vainqueurs.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-espoir-respect',
        label: '"Vous étiez un adversaire digne. Reposez en paix."',
        consequence: 'Malachar : "Digne... Oui. C\'est suffisant." Il ferme les yeux avec un dernier sourire.'
      }
    ]
  },
  {
    id: 'malachar-offre-reddition',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Malachar propose aux PJ de le rejoindre',
    tone: 'séducteur, logique',
    unlockCondition: 'Avant ou pendant le combat, si les PJ ont écouté',
    gmSceneNote: 'Malachar fait une offre sincère — pas une ruse. Il croit vraiment que les PJ seraient plus utiles à ses côtés.',
    lines: [
      {
        speaker: 'Malachar',
        text: 'Rejoignez-moi. Non pas comme serviteurs — comme partenaires. Votre courage, mon savoir. Ensemble, nous pourrions contrôler le réveil de l\'Entité au lieu de le subir. N\'est-ce pas plus sage que de mourir pour un Rituel incertain ?',
        emotion: 'offre sincère',
        gmCoaching: 'Malachar est sincère. C\'est ce qui rend l\'offre dangereuse. Il ne ment pas — il croit vraiment que c\'est la meilleure option.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-offre-refuser',
        label: '"Non. Nous croyons au Rituel. Et nous croyons en l\'humanité."',
        consequence: 'Malachar : "L\'humanité. Le pari le plus risqué de l\'univers. ...J\'espère que vous avez raison."'
      },
      {
        id: 'malachar-offre-hesiter',
        label: '"...Expliquez-moi exactement votre plan. En détail."',
        consequence: 'Malachar explique — et son plan a une logique terrifiante. Les PJ doivent choisir. VRAI choix moral.'
      },
      {
        id: 'malachar-offre-piege',
        label: 'Faire semblant d\'accepter pour se rapprocher et frapper.',
        consequence: 'Jet de Tromperie DD 20. Échec : Malachar lit dans vos yeux. "Décevant."',
        skillCheck: { skill: 'Tromperie', dc: 20 }
      }
    ]
  },
  {
    id: 'malachar-pre-combat',
    npcId: 'archon-malachar',
    npcName: 'Archon Malachar',
    trigger: 'Dernières paroles avant le combat final',
    tone: 'résigné, grandiose',
    unlockCondition: 'Négociations échouées',
    gmSceneNote: 'Le point de non-retour. Les mots sont finis. Il ne reste que le fer et le feu.',
    lines: [
      {
        speaker: 'Malachar',
        text: 'Soit. L\'histoire dira qui avait raison. Les vainqueurs écrivent toujours les livres. Mais l\'histoire est écrite par les vivants — et j\'ai l\'intention de vivre.',
        emotion: 'résolution finale',
        gmCoaching: 'Malachar lève les bras. L\'énergie nécromantique tourbillonne autour de lui. Le sol tremble. Les morts se relèvent. C\'est le boss final. Rendez-le INOUBLIABLE.'
      }
    ],
    playerResponses: [
      {
        id: 'malachar-pre-charge',
        label: '"L\'histoire dira que nous avons choisi de nous battre. POUR AETHELGARD !"',
        consequence: 'Combat final. Initiative !'
      },
      {
        id: 'malachar-pre-silence',
        label: 'Lever son arme sans un mot. Les actes, pas les mots.',
        consequence: 'Malachar hoche la tête. "Au moins, vous avez la dignité du silence." Combat.'
      }
    ]
  },
];

// ============================================================================
// 16. L'ENTITÉ (AEL'SHARATH) — Être cosmique (6 dialogues)
// ============================================================================

const ENTITE_DIALOGUES: DialogueTree[] = [
  {
    id: 'entite-contact',
    npcId: 'ael-sharath',
    npcName: 'Ael\'Sharath (L\'Entité)',
    trigger: 'Premier contact psychique avec l\'Entité',
    tone: 'alien, immense, déstabilisant',
    gmSceneNote: 'L\'Entité ne parle pas comme un être vivant. Ses "mots" sont des visions, des sensations, des concepts qui envahissent l\'esprit. Les PJ ont mal à la tête, voient des couleurs impossibles, entendent de la musique qui n\'existe pas.',
    lines: [
      {
        speaker: 'Ael\'Sharath',
        text: '...petit. si petit. comme une étoile dans un océan. mais brûlant. curieux. pourquoi brûles-tu, petit être ?',
        emotion: 'curiosité cosmique',
        gmCoaching: 'Voix qui vient de partout et de nulle part. Pas de majuscules — l\'Entité ne comprend pas la hiérarchie des mots. Parlez lentement, comme si chaque mot était un concept étranger traduit imparfaitement.'
      },
      {
        speaker: 'Ael\'Sharath',
        text: 'j\'étais là avant. avant la lumière. avant les mots. je suis le rêve du monde. et le monde m\'a oublié. mais je n\'oublie pas. je n\'oublie JAMAIS.',
        emotion: 'éternité',
        gmCoaching: 'Sur "jamais", la voix résonne dans les os des PJ. L\'Entité est si ancienne que le concept de temps n\'a pas de sens pour elle.'
      }
    ],
    playerResponses: [
      {
        id: 'entite-contact-dialogue',
        label: '"Nous ne sommes pas vos ennemis. Nous voulons comprendre."',
        consequence: 'L\'Entité est surprise. Les mortels n\'essaient jamais de comprendre. Ils fuient ou ils combattent.',
        nextDialogueId: 'entite-verite'
      },
      {
        id: 'entite-contact-resister',
        label: 'Résister au contact psychique — fermer son esprit.',
        consequence: 'Jet de Volonté DD 16. Succès : le contact se brise. Échec : vision de cauchemar (1d6 dégâts psychiques).',
        skillCheck: { skill: 'Volonté', dc: 16 }
      },
      {
        id: 'entite-contact-question',
        label: '"Que voulez-vous ?"',
        consequence: 'L\'Entité : "vouloir ? les rivières veulent-elles couler ? les étoiles veulent-elles brûler ? je SUIS. c\'est tout."',
        nextDialogueId: 'entite-verite'
      }
    ]
  },
  {
    id: 'entite-verite',
    npcId: 'ael-sharath',
    npcName: 'Ael\'Sharath (L\'Entité)',
    trigger: 'L\'Entité révèle la vérité sur les Sceaux',
    tone: 'mélancolique, cosmique',
    unlockCondition: 'Contact psychique établi',
    gmSceneNote: 'L\'Entité n\'est pas mauvaise. C\'est la clé de tout. Elle est le monde primordial qui a été enfermé pour que les mortels puissent exister.',
    lines: [
      {
        speaker: 'Ael\'Sharath',
        text: 'les sceaux. oui. ils me font mal. pas le corps — je n\'ai pas de corps. l\'esprit. imaginez qu\'on vous enferme dans une boîte trop petite pendant mille ans. pas par méchanceté — par NÉCESSITÉ. mais ça fait mal quand même.',
        emotion: 'douleur cosmique',
        gmCoaching: 'L\'Entité exprime de la souffrance — une souffrance millénaire. Les PJ sentent un écho de cette douleur. Vertige, nausée, larmes involontaires.'
      },
      {
        speaker: 'Ael\'Sharath',
        text: 'les premiers. ils m\'aimaient. avant. quand le monde était un. ils m\'ont dit : "dors. nous veillerons." et j\'ai dormi. mais ils sont morts. et personne ne veille plus. et la boîte se fissure. et j\'ai PEUR.',
        emotion: 'peur d\'un être cosmique',
        gmCoaching: 'Une entité cosmique qui a PEUR. Ce concept devrait terrifier les PJ — si quelque chose d\'aussi puissant a peur, que doivent-ils ressentir ?'
      }
    ],
    playerResponses: [
      {
        id: 'entite-ver-compassion',
        label: '"Vous souffrez. Nous ne le savions pas. Pardonnez-nous."',
        consequence: 'L\'Entité : "pardonner... mot étrange. mais doux. comme les fleurs d\'aurore." (Écho d\'Elyndra ?)',
        nextDialogueId: 'entite-negociation'
      },
      {
        id: 'entite-ver-solution',
        label: '"Nous cherchons un moyen pour que tout le monde coexiste."',
        consequence: 'L\'Entité : "coexister... les premiers y ont pensé aussi. ils ont échoué. pourquoi réussiriez-vous ?"',
        nextDialogueId: 'entite-negociation'
      }
    ]
  },
  {
    id: 'entite-proposition',
    npcId: 'ael-sharath',
    npcName: 'Ael\'Sharath (L\'Entité)',
    trigger: 'L\'Entité propose un accord',
    tone: 'tentateur, cosmique',
    unlockCondition: 'Vérité révélée',
    gmSceneNote: 'L\'offre de l\'Entité est séduisante et terrifiante. Elle propose de "simplifier" le monde — retourner au chaos primordial. Pour elle, c\'est un retour à la paix.',
    lines: [
      {
        speaker: 'Ael\'Sharath',
        text: 'laissez-moi sortir. pas en conquérante — en mère. je reprends le monde dans mes bras. plus de douleur. plus de guerre. plus de mort. juste... le rêve. le grand rêve d\'avant. paisible. éternel.',
        emotion: 'tentation cosmique',
        gmCoaching: 'Les PJ voient des visions de paix — un monde sans souffrance, sans conflit. C\'est beau. Et c\'est un piège — parce que ce monde sans souffrance est un monde sans VIE.'
      }
    ],
    playerResponses: [
      {
        id: 'entite-prop-refuser',
        label: '"Le monde avec ses douleurs et ses joies vaut mieux que votre rêve vide."',
        consequence: 'L\'Entité : "vide ? ...peut-être. mais sans douleur. n\'est-ce pas mieux ?"',
        nextDialogueId: 'entite-menace'
      },
      {
        id: 'entite-prop-negocier',
        label: '"Et si nous trouvions un compromis ? Un espace pour vous dans le monde tel qu\'il est ?"',
        consequence: 'L\'Entité se tait longtemps. "...un espace. pour moi. personne n\'a jamais proposé ça."',
        nextDialogueId: 'entite-negociation'
      },
      {
        id: 'entite-prop-accepter',
        label: '"...Montrez-moi le rêve."',
        consequence: 'DANGER ! L\'Entité montre le rêve — et les PJ doivent résister ou perdre leur volonté. DD 18 Volonté.',
        skillCheck: { skill: 'Volonté', dc: 18 }
      }
    ]
  },
  {
    id: 'entite-menace',
    npcId: 'ael-sharath',
    npcName: 'Ael\'Sharath (L\'Entité)',
    trigger: 'L\'Entité devient menaçante',
    tone: 'terreur cosmique',
    unlockCondition: 'Refus de la proposition',
    gmSceneNote: 'L\'Entité n\'est pas en colère — elle est désespérée. Et le désespoir d\'un être cosmique est plus effrayant que sa colère.',
    lines: [
      {
        speaker: 'Ael\'Sharath',
        text: 'alors je me RÉVEILLERAI. pas par choix — par nécessité. et quand je m\'éveillerai, le rêve deviendra cauchemar. pas parce que je le veux. parce que c\'est ma NATURE. comme le feu brûle. comme l\'eau noie.',
        emotion: 'menace involontaire',
        gmCoaching: 'La réalité tremble. Les murs se fissurent. Les étoiles deviennent visibles à travers le plafond. L\'Entité ne menace pas — elle PRÉVIENT.'
      }
    ],
    playerResponses: [
      {
        id: 'entite-men-defier',
        label: '"Alors nous vous arrêterons. Les mortels ont survécu à pire."',
        consequence: 'L\'Entité : "...non. vous n\'avez pas. mais j\'admire votre feu."'
      },
      {
        id: 'entite-men-alternative',
        label: '"Il doit y avoir un troisième choix. Ni soumission ni destruction."',
        consequence: 'L\'Entité : "...troisième ? les premiers n\'en ont trouvé que deux. mais vous... vous êtes différents."',
        nextDialogueId: 'entite-negociation'
      }
    ]
  },
  {
    id: 'entite-negociation',
    npcId: 'ael-sharath',
    npcName: 'Ael\'Sharath (L\'Entité)',
    trigger: 'Négociation cosmique avec l\'Entité',
    tone: 'historique, cosmique',
    unlockCondition: 'Proposition de compromis ou de compassion',
    gmSceneNote: 'LE moment qui peut changer la fin de la campagne. Les PJ négocient avec un être cosmique. C\'est du jamais vu dans l\'histoire d\'Aethelgard.',
    lines: [
      {
        speaker: 'Ael\'Sharath',
        text: 'un espace... pour moi... dans votre monde. les anciens océans. les forêts profondes. les cavernes où aucun mortel ne va. laissez-moi CES lieux. et je laisserai les vôtres.',
        emotion: 'espoir cosmique',
        gmCoaching: 'L\'Entité propose le Grand Compromis — un partage du monde. Les lieux sauvages et inexplorés deviennent son domaine. Les lieux civilisés restent aux mortels.'
      },
      {
        speaker: 'Ael\'Sharath',
        text: 'et les sceaux... plus de prisons. des PORTES. que l\'on peut ouvrir et fermer. pas une cage — un arrangement. est-ce... est-ce que cela pourrait marcher ?',
        emotion: 'espoir fragile',
        gmCoaching: 'L\'être le plus puissant du monde demande avec une timidité désarmante si son idée est bonne. Rendez ce moment touchant.'
      }
    ],
    playerResponses: [
      {
        id: 'entite-nego-accepter',
        label: '"Oui. Nous pouvons essayer. Des portes, pas des cages."',
        consequence: 'FIN ALTERNATIVE DÉBLOQUÉE. Le Grand Compromis. Les Sceaux deviennent des Portes. Le monde change mais survit.',
        reputationChange: [{ faction: 'monde', amount: 100 }]
      },
      {
        id: 'entite-nego-conditions',
        label: '"Avec des conditions. Les mortels doivent être en sécurité."',
        consequence: 'L\'Entité : "sécurité... oui. je ne blesserai pas vos petits. promis." Négociation détaillée.'
      },
      {
        id: 'entite-nego-refuser',
        label: '"Le risque est trop grand. Les Sceaux restent."',
        consequence: 'L\'Entité se referme. "...alors rien ne change. et un jour, les sceaux se briseront. et il n\'y aura personne pour négocier."'
      }
    ]
  },
  {
    id: 'entite-resolution',
    npcId: 'ael-sharath',
    npcName: 'Ael\'Sharath (L\'Entité)',
    trigger: 'Résolution finale avec l\'Entité',
    tone: 'transcendant, final',
    unlockCondition: 'Négociation ou Rituel accompli',
    gmSceneNote: 'La dernière interaction avec l\'être le plus puissant du monde. Quelle que soit la résolution, elle doit être mémorable.',
    lines: [
      {
        speaker: 'Ael\'Sharath',
        text: 'petit être brûlant. tu as fait quelque chose qu\'aucun mortel n\'avait fait. tu m\'as PARLÉ. pas crié. pas supplié. parlé. cela... signifie quelque chose. même pour moi.',
        emotion: 'gratitude cosmique',
        gmCoaching: 'La présence de l\'Entité se fait douce — comme un soleil tiède. Elle est reconnaissante. Un être cosmique reconnaissant. Laissez peser ce moment.'
      },
      {
        speaker: 'Ael\'Sharath',
        text: 'je me souviendrai de toi. dans mille ans, dans un million d\'ans. quand les étoiles s\'éteindront et se rallumeront. je me souviendrai du petit être qui a choisi de parler au lieu de fuir.',
        emotion: 'mémoire éternelle',
        gmCoaching: 'Dernier contact. La voix s\'éloigne comme un écho de plus en plus doux. Les PJ sentent une chaleur qui reste longtemps après le départ de l\'Entité.'
      }
    ],
    playerResponses: [
      {
        id: 'entite-resol-adieu',
        label: '"Au revoir, Ael\'Sharath. Dormez bien."',
        consequence: 'Un rire — doux, immense, cosmique. "dormir... oui. mais cette fois, c\'est un BON rêve." L\'Entité se retire.'
      },
      {
        id: 'entite-resol-promesse',
        label: '"Nous viendrons vous rendre visite. Aux portes."',
        consequence: 'L\'Entité : "...j\'aimerais ça. apportez des histoires. j\'aime les histoires." Silence. Elle est partie.'
      }
    ]
  },
];

// ============================================================================
// 17. BROK (RETOUR) — Tavernier au champ de bataille (4 dialogues)
// ============================================================================

const BROK_DIALOGUES: DialogueTree[] = [
  {
    id: 'brok-retrouvailles',
    npcId: 'brok',
    npcName: 'Brok le Tavernier',
    trigger: 'Brok apparaît sur le champ de bataille avec une charrette',
    tone: 'émouvant, comique',
    gmSceneNote: 'Brok, le bon gros tavernier des débuts de la campagne, est là. Au milieu d\'un champ de bataille. Avec des tonneaux de bière et des provisions. Comment ? Pourquoi ? Parce que c\'est BROK.',
    lines: [
      {
        speaker: 'Brok',
        text: 'Ben quoi ? Vous pensiez que le vieux Brok allait rester derrière son comptoir pendant que ses meilleurs clients risquent leur vie ? AUCUNE CHANCE ! Qui va vous servir à boire après la victoire, hein ?!',
        emotion: 'bravoure ordinaire',
        gmCoaching: 'Brok est rouge, essoufflé, armé d\'un rouleau à pâtisserie et d\'un tablier par-dessus une vieille cotte de mailles rouillée. Il est RIDICULE et MAGNIFIQUE.'
      }
    ],
    playerResponses: [
      {
        id: 'brok-retro-joie',
        label: 'Le serrer dans ses bras.',
        consequence: 'Brok : "Hé hé ! Doucement ! J\'ai de la bière fragile dans la charrette !" Mais il serre fort en retour.'
      },
      {
        id: 'brok-retro-inquiet',
        label: '"Brok, c\'est dangereux ! Vous ne devriez pas être ici !"',
        consequence: 'Brok : "Dangereux ? MON AUBERGE sans clients, ÇA c\'est dangereux. Pour mon compte en banque."'
      },
      {
        id: 'brok-retro-merci',
        label: '"Brok... merci. Sincèrement."',
        consequence: 'Brok rougit encore plus. "Bah. C\'est rien. Maintenant, buvez avant que ça ne refroidisse."'
      }
    ]
  },
  {
    id: 'brok-comment',
    npcId: 'brok',
    npcName: 'Brok le Tavernier',
    trigger: 'Brok raconte son voyage',
    tone: 'comique, héroïque malgré lui',
    unlockCondition: 'Retrouvailles avec Brok',
    gmSceneNote: 'L\'histoire de Brok pour arriver jusqu\'ici est un mini-récit épique et comique.',
    lines: [
      {
        speaker: 'Brok',
        text: 'Alors, j\'ai fermé l\'auberge — FERMÉ ! Moi ! — j\'ai chargé la charrette, et j\'ai suivi les traces de l\'armée. En chemin, j\'ai croisé trois goules. TROIS ! J\'en ai assommé une avec un jambon. Les deux autres ont fui. Probablement le jambon de Marta — il assommerait un troll.',
        emotion: 'aventure domestique',
        gmCoaching: 'Brok raconte avec les mêmes gestes qu\'il utilise pour servir la bière — amples, enthousiastes, légèrement maladroits. C\'est un héros malgré lui.'
      },
      {
        speaker: 'Brok',
        text: 'Ensuite, j\'ai trouvé un groupe de réfugiés. Des femmes, des enfants. Ils avaient faim. Alors j\'ai fait ce que je sais faire — j\'ai cuisiné. Et puis je leur ai dit de me suivre. Et puis d\'AUTRES ont suivi. Et maintenant... ben, j\'ai une caravane de quatre-vingts personnes derrière.',
        emotion: 'leadership accidentel',
        gmCoaching: 'Brok a rassemblé des réfugiés en route — par pure bonté. Il est devenu un leader sans s\'en rendre compte.'
      }
    ],
    playerResponses: [
      {
        id: 'brok-com-hero',
        label: '"Brok, vous êtes un héros."',
        consequence: 'Brok : "Un héros ? MOI ? Non non non. Je suis juste un type qui fait de la soupe. Les héros, c\'est vous."'
      },
      {
        id: 'brok-com-refugies',
        label: '"Les réfugiés sont en sécurité ?"',
        consequence: 'Brok : "À l\'arrière du camp. J\'ai mis les plus costauds en garde. Et Marta a un poêle en fonte — personne ne passera."'
      }
    ]
  },
  {
    id: 'brok-courage',
    npcId: 'brok',
    npcName: 'Brok le Tavernier',
    trigger: 'Brok fait face au danger',
    tone: 'courageux, ordinaire',
    unlockCondition: 'Danger au campement',
    gmSceneNote: 'Brok n\'est pas un guerrier. Mais quand des gens sont en danger, il se met devant eux avec son rouleau à pâtisserie et son tablier, et il ne bouge pas.',
    lines: [
      {
        speaker: 'Brok',
        text: 'J\'ai pas d\'épée magique. J\'ai pas de sorts. J\'ai un rouleau à pâtisserie et quarante ans d\'expérience à gérer des clients ivres. VENEZ, SALES BÊTES ! ON VERRA QUI TIENT DEBOUT LE PLUS LONGTEMPS !',
        emotion: 'courage brut',
        gmCoaching: 'Brok devant une menace, protégeant des blessés. Il est terrifié — ses genoux tremblent — mais il ne bouge pas. C\'est le vrai courage : avoir peur et rester quand même.'
      }
    ],
    playerResponses: [
      {
        id: 'brok-cour-sauver',
        label: 'Se précipiter pour protéger Brok.',
        consequence: 'Brok : "J\'AVAIS la situation en main ! ...Mais merci quand même."'
      },
      {
        id: 'brok-cour-ensemble',
        label: '"Dos à dos, Brok !"',
        consequence: 'Brok : "Dos à dos avec un VRAI héros ? ...C\'est le plus beau jour de ma vie. Après mon mariage."'
      }
    ]
  },
  {
    id: 'brok-toast',
    npcId: 'brok',
    npcName: 'Brok le Tavernier',
    trigger: 'Toast final après la victoire',
    tone: 'joyeux, émouvant',
    unlockCondition: 'Victoire finale',
    gmSceneNote: 'Brok sert la dernière tournée de la campagne. C\'est un moment de communion, de joie, de larmes et de bière.',
    lines: [
      {
        speaker: 'Brok',
        text: 'ÉCOUTEZ TOUS ! La maison offre sa tournée ! Et quand Brok dit "la maison offre", c\'est que c\'est VRAIMENT la fin du monde ! Ha ha ! Ou plutôt... le début d\'un nouveau !',
        emotion: 'joie tonitruante',
        gmCoaching: 'Brok verse des chopes avec la vitesse d\'un maître brasseur. Autour de lui, soldats, nains, aventuriers trinquent ensemble. C\'est le dernier moment social de la campagne — rendez-le chaleureux.'
      },
      {
        speaker: 'Brok',
        text: 'Aux héros ! Pas les grandes épées et les grands discours — aux vrais héros ! Ceux qui ont donné à manger aux affamés, soigné les blessés, tenu la main des mourants ! À vous tous ! ET À LA PROCHAINE !',
        emotion: 'hommage aux héros ordinaires',
        gmCoaching: 'Brok lève sa chope. Tout le monde lève la sienne. C\'est simple, c\'est vrai, c\'est beau. Le toast d\'un homme ordinaire pour des gens extraordinaires.'
      }
    ],
    playerResponses: [
      {
        id: 'brok-toast-boire',
        label: 'Lever sa chope avec tout le monde et boire.',
        consequence: 'La meilleure bière de votre vie. Brok jure que c\'est la même que d\'habitude. Ça n\'a jamais eu ce goût.'
      },
      {
        id: 'brok-toast-brok',
        label: '"À BROK ! Le vrai héros de cette guerre !"',
        consequence: 'Brok devient écarlate. La foule scande "BROK ! BROK ! BROK !" Il pleure dans sa chope.'
      }
    ]
  },
];

// ============================================================================
// 18. MARCUS (FINAL) — Le Général (6 dialogues)
// ============================================================================

const MARCUS_DIALOGUES: DialogueTree[] = [
  {
    id: 'marcus-briefing',
    npcId: 'marcus',
    npcName: 'Général Marcus',
    trigger: 'Dernier briefing avant l\'assaut',
    tone: 'grave, professionnel',
    gmSceneNote: 'Marcus est le pilier militaire. Sa confiance inspire les troupes. Mais sous l\'armure, c\'est un homme qui sait que beaucoup de ses soldats ne reviendront pas.',
    lines: [
      {
        speaker: 'Marcus',
        text: 'L\'assaut principal partira à l\'aube. Trois prongs : les nains au nord, la cavalerie au sud, l\'infanterie au centre. Votre mission à vous est derrière les lignes — atteindre Malachar. Nous vous ouvrirons le chemin.',
        emotion: 'détermination',
        gmCoaching: 'Marcus montre la carte une dernière fois. Ses doigts sont fermes, sa voix ne tremble pas. Le parfait général.'
      }
    ],
    playerResponses: [
      {
        id: 'marcus-brief-questions',
        label: 'Poser des questions tactiques détaillées.',
        consequence: 'Marcus répond à chaque question avec précision. C\'est un professionnel.'
      },
      {
        id: 'marcus-brief-pret',
        label: '"Nous serons prêts. Et vous ?"',
        consequence: 'Marcus : "Toujours." Silence. Puis : "...Dites-le, si on ne se revoit pas. Ça a été un honneur."'
      }
    ]
  },
  {
    id: 'marcus-combat-epique',
    npcId: 'marcus',
    npcName: 'Général Marcus',
    trigger: 'Marcus au combat aux côtés des PJ',
    tone: 'épique, fraternel',
    unlockCondition: 'Bataille finale en cours',
    gmSceneNote: 'Marcus au combat est un ouragan méthodique. Il crie des ordres tout en décapitant des morts-vivants.',
    lines: [
      {
        speaker: 'Marcus',
        text: 'DEUXIÈME LIGNE, AVANCEZ ! ARCHERS, CONCENTRATION SUR LE FLANC ! Et vous — avec moi ! On enfonce ce mur de squelettes !',
        emotion: 'commandement au feu',
        gmCoaching: 'Marcus est dans son élément. Épée dans une main, étendard dans l\'autre. Les soldats autour de lui chargent avec une énergie redoublée.'
      }
    ],
    playerResponses: [
      {
        id: 'marcus-combat-ensemble',
        label: 'Charger aux côtés de Marcus.',
        consequence: 'Combat coordonné. Marcus et les PJ forment une pointe de lance dévastatrice.'
      },
      {
        id: 'marcus-combat-diviser',
        label: '"Marcus, prenez le flanc ! On prend le centre !"',
        consequence: 'Marcus : "EXÉCUTÉ !" Mouvement de tenaille efficace.'
      }
    ]
  },
  {
    id: 'marcus-blessure',
    npcId: 'marcus',
    npcName: 'Général Marcus',
    trigger: 'Marcus est grièvement blessé',
    tone: 'urgent, héroïque',
    unlockCondition: 'Combat avancé, Marcus touché',
    gmSceneNote: 'Marcus prend un coup destiné à un PJ ou tombe en protégeant la ligne. Le général est à terre et refuse de le montrer.',
    lines: [
      {
        speaker: 'Marcus',
        text: 'C\'est... c\'est rien. Une égratignure. Aidez-moi à me relever. L\'armée ne doit pas me voir à terre.',
        emotion: 'stoïcisme',
        gmCoaching: 'C\'est clairement plus qu\'une égratignure. Du sang partout. Mais Marcus se relève par pure volonté. Ses jambes tremblent mais il tient.'
      }
    ],
    playerResponses: [
      {
        id: 'marcus-bless-soigner',
        label: 'Le soigner immédiatement avec une potion ou de la magie.',
        consequence: 'Marcus : "Merci. Maintenant, retournez au combat. Je suis debout."'
      },
      {
        id: 'marcus-bless-retirer',
        label: '"Général, à l\'arrière. C\'est un ORDRE."',
        consequence: 'Marcus : "Un ordre ? ...Depuis quand les aventuriers donnent des ordres aux généraux ? ...D\'accord." Il se retire.'
      }
    ]
  },
  {
    id: 'marcus-victoire',
    npcId: 'marcus',
    npcName: 'Général Marcus',
    trigger: 'Après la victoire',
    tone: 'soulagement, fraternel',
    unlockCondition: 'Victoire et survie de Marcus',
    gmSceneNote: 'Marcus range son épée pour la dernière fois. Le soldat qui n\'a jamais connu la paix découvre ce qu\'elle sent.',
    lines: [
      {
        speaker: 'Marcus',
        text: 'Quarante-trois batailles. C\'est mon compte. Et celle-ci est la dernière. La meilleure. Parce que c\'est la dernière.',
        emotion: 'soulagement',
        gmCoaching: 'Marcus s\'assied, ôte son casque, et regarde le ciel comme s\'il le voyait pour la première fois.'
      }
    ],
    playerResponses: [
      {
        id: 'marcus-vict-toast',
        label: 'Trinquer avec lui en silence.',
        consequence: 'Les meilleurs toasts n\'ont pas besoin de mots. Marcus sourit — un sourire de paix.'
      },
      {
        id: 'marcus-vict-futur',
        label: '"Quarante-quatre est de trop, hein ?"',
        consequence: 'Marcus rit. "Largement. Je crois que je vais devenir fermier. Les carottes ne se battent pas."'
      }
    ]
  },
  {
    id: 'marcus-avenir',
    npcId: 'marcus',
    npcName: 'Général Marcus',
    trigger: 'Discussion sur l\'avenir',
    tone: 'nostalgique, optimiste',
    unlockCondition: 'Victoire',
    gmSceneNote: 'Le guerrier qui découvre la paix.',
    lines: [
      {
        speaker: 'Marcus',
        text: 'J\'ai acheté un terrain. Près de la côte. Un endroit où on entend les vagues et pas les cris. Ma femme dit que je vais m\'ennuyer en trois jours. Elle a probablement raison.',
        emotion: 'espoir simple',
        gmCoaching: 'Marcus parle de l\'avenir pour la première fois de sa vie. C\'est maladroit, inhabituel, et profondément humain.'
      }
    ],
    playerResponses: [
      {
        id: 'marcus-aven-visiter',
        label: '"On viendra vous rendre visite. Et vous enseigner la pêche."',
        consequence: 'Marcus : "La pêche ? Le seul ennemi qu\'on ne peut pas charger à l\'épée ? ...Ça me plaît."'
      }
    ]
  },
  {
    id: 'marcus-retraite',
    npcId: 'marcus',
    npcName: 'Général Marcus',
    trigger: 'Marcus annonce sa retraite',
    tone: 'solennel, libéré',
    unlockCondition: 'Après la victoire',
    gmSceneNote: 'Le général rend son épée. Symboliquement et littéralement.',
    lines: [
      {
        speaker: 'Marcus',
        text: 'Je remets mon commandement à la reine. Ma lame à l\'armurerie. Et mon avenir... à la paix. C\'est la plus belle victoire de ma carrière : ne plus avoir besoin de se battre.',
        emotion: 'liberté',
        gmCoaching: 'Marcus pose son épée sur la table du conseil avec une révérence. Quarante ans de guerre qui prennent fin dans un geste simple.'
      }
    ],
    playerResponses: [
      {
        id: 'marcus-ret-honneur',
        label: '"Général Marcus. Ce fut le plus grand honneur."',
        consequence: 'Marcus se met au garde-à-vous une dernière fois. "L\'honneur est partagé. À la prochaine vie, camarades."'
      }
    ]
  },
];

// ============================================================================
// 19. FRÈRE ALDWIN (FINAL) — Le prêtre (6 dialogues)
// ============================================================================

const ALDWIN_DIALOGUES: DialogueTree[] = [
  {
    id: 'aldwin-priere',
    npcId: 'frere-aldwin',
    npcName: 'Frère Aldwin',
    trigger: 'Prière avant la bataille',
    tone: 'sacré, communautaire',
    gmSceneNote: 'Aldwin mène une prière oecuménique — pour tous les dieux, toutes les fois, tous les doutes. C\'est inclusif et sincère.',
    lines: [
      {
        speaker: 'Aldwin',
        text: 'Je ne vais pas vous dire de prier un dieu en particulier. Priez qui vous voulez. Ou ne priez pas — pensez à ceux que vous aimez. L\'important n\'est pas la foi. L\'important, c\'est l\'amour.',
        emotion: 'sagesse spirituelle',
        gmCoaching: 'Aldwin parmi les soldats, une main sur chaque épaule. Il ne prêche pas — il console, il écoute, il tient les mains qui tremblent.'
      }
    ],
    playerResponses: [
      {
        id: 'aldwin-priere-joindre',
        label: 'Se joindre à la prière.',
        consequence: 'Un moment de paix. Les PJ sentent une chaleur — divine ou simplement humaine — qui apaise.'
      },
      {
        id: 'aldwin-priere-remercier',
        label: '"Merci, Aldwin. Pour tout ce que vous avez fait."',
        consequence: 'Aldwin : "C\'est moi qui vous remercie. Vous m\'avez montré que la foi sans action est vide."'
      }
    ]
  },
  {
    id: 'aldwin-doute',
    npcId: 'frere-aldwin',
    npcName: 'Frère Aldwin',
    trigger: 'Aldwin doute de sa foi',
    tone: 'vulnérable, philosophique',
    unlockCondition: 'Situation désespérée',
    gmSceneNote: 'Le prêtre qui doute — le moment le plus humain et le plus puissant pour un homme de foi.',
    lines: [
      {
        speaker: 'Aldwin',
        text: 'J\'ai prié toute ma vie. Et ce soir, quand je ferme les yeux... le silence. Pas de voix divine. Pas de signe. Juste le silence. Est-ce que les dieux nous ont abandonnés ? Ou est-ce que je n\'ai jamais vraiment écouté ?',
        emotion: 'crise de foi',
        gmCoaching: 'Aldwin à genoux, rosaire serré dans ses mains, les yeux fermés. La sueur perle sur son front. C\'est un homme en train de perdre la seule chose qui le définissait.'
      }
    ],
    playerResponses: [
      {
        id: 'aldwin-doute-foi',
        label: '"Le silence n\'est pas l\'absence. Peut-être que les dieux font confiance à VOTRE jugement."',
        consequence: 'Aldwin ouvre les yeux. "...Me faire confiance ? À MOI ? C\'est... c\'est la chose la plus terrifiante et la plus belle qu\'on m\'ait dite."',
        nextDialogueId: 'aldwin-miracle'
      },
      {
        id: 'aldwin-doute-humain',
        label: '"Dieux ou pas, VOUS êtes là. C\'est suffisant."',
        consequence: 'Aldwin : "Suffisant... Peut-être que la foi, c\'est ça. Être là quand c\'est dur."',
        nextDialogueId: 'aldwin-miracle'
      }
    ]
  },
  {
    id: 'aldwin-miracle',
    npcId: 'frere-aldwin',
    npcName: 'Frère Aldwin',
    trigger: 'Aldwin accomplit un miracle divin',
    tone: 'transcendant, lumineux',
    unlockCondition: 'Doute résolu et moment critique',
    gmSceneNote: 'LE miracle. Quand la foi d\'Aldwin est la plus forte PARCE QU\'il a douté et surmonté le doute. La lumière qui jaillit est authentique, puissante, inoubliable.',
    lines: [
      {
        speaker: 'Aldwin',
        text: 'Non. Pas cette fois. Pas ENCORE un innocent. PAR TOUTE LA LUMIÈRE QUI EXISTE — VIVEZ !',
        emotion: 'foi absolue',
        gmCoaching: 'Aldwin pose ses mains sur un mourant. De la lumière — pure, aveuglante, chaude — jaillit. Les blessures se referment. C\'est un miracle. Un VRAI miracle. Les soldats autour tombent à genoux.'
      }
    ],
    playerResponses: [
      {
        id: 'aldwin-mir-emerveillement',
        label: 'Rester bouche bée devant le miracle.',
        consequence: 'Aldwin lui-même est stupéfait. "...Ça... ça a MARCHÉ ? J\'ai... les dieux..." Il rit et pleure en même temps.'
      },
      {
        id: 'aldwin-mir-pratique',
        label: '"Aldwin, pouvez-vous refaire ça ?!"',
        consequence: 'Aldwin : "Je... je ne sais pas. Peut-être. C\'est la première fois en vingt ans de prêtrise !"'
      }
    ]
  },
  {
    id: 'aldwin-benediction-finale',
    npcId: 'frere-aldwin',
    npcName: 'Frère Aldwin',
    trigger: 'Bénédiction après la victoire',
    tone: 'sacré, apaisant',
    unlockCondition: 'Victoire finale',
    gmSceneNote: 'La bénédiction finale. Pour les vivants et pour les morts. Aldwin est en paix avec sa foi, renforcée par le doute.',
    lines: [
      {
        speaker: 'Aldwin',
        text: 'Que la lumière qui nous a guidés cette nuit continue de briller. Pour les vivants — qu\'elle soit espoir. Pour les morts — qu\'elle soit repos. Et pour ceux qui doutent — qu\'elle soit une question à laquelle on cherche toujours la réponse.',
        emotion: 'bénédiction inclusive',
        gmCoaching: 'Aldwin bénit tout le monde — croyants, athées, nains, humains. Sa lumière est douce, non aveuglante. C\'est une bénédiction de paix, pas de gloire.'
      }
    ],
    playerResponses: [
      {
        id: 'aldwin-ben-accepter',
        label: 'Recevoir la bénédiction avec gratitude.',
        consequence: 'Une chaleur douce. Le sentiment que tout ira bien — pas une certitude, mais un espoir.'
      }
    ]
  },
  {
    id: 'aldwin-epilogue',
    npcId: 'frere-aldwin',
    npcName: 'Frère Aldwin',
    trigger: 'Épilogue — Aldwin fonde un orphelinat',
    tone: 'doux, résolu',
    unlockCondition: 'Après la victoire, épilogue',
    gmSceneNote: 'L\'épilogue d\'Aldwin. Il utilise sa foi pour construire, pas pour prêcher.',
    lines: [
      {
        speaker: 'Aldwin',
        text: 'J\'ai trouvé un bâtiment. Près de l\'ancien temple — celui qui a été détruit. Je vais le reconstruire. Pas en temple. En orphelinat. La guerre a laissé trop d\'enfants seuls.',
        emotion: 'vocation retrouvée',
        gmCoaching: 'Aldwin devant un bâtiment en ruines, les manches retroussées, avec des enfants autour de lui. Sa soutane est sale de plâtre. Il sourit.'
      },
      {
        speaker: 'Aldwin',
        text: 'Je leur apprendrai à lire. À prier, s\'ils veulent. À douter, s\'ils préfèrent. Et surtout — surtout — à croire qu\'ils méritent d\'être aimés.',
        emotion: 'amour inconditionnel',
        gmCoaching: 'La plus belle fin pour un prêtre : pas un temple glorieux, mais des enfants qui rient.'
      }
    ],
    playerResponses: [
      {
        id: 'aldwin-epil-aider',
        label: 'Promettre de l\'aider à construire l\'orphelinat.',
        consequence: 'Aldwin : "Vous savez manier une truelle aussi bien qu\'une épée ?"'
      },
      {
        id: 'aldwin-epil-don',
        label: 'Faire un don généreux pour l\'orphelinat.',
        consequence: 'Aldwin : "Avec cet or, les enfants auront des lits chauds et des livres neufs. Merci."'
      }
    ]
  },
  {
    id: 'aldwin-priere-morts',
    npcId: 'frere-aldwin',
    npcName: 'Frère Aldwin',
    trigger: 'Rites funéraires pour les tombés',
    tone: 'solennel, compassionné',
    unlockCondition: 'Après la bataille, rites funéraires',
    gmSceneNote: 'Les funérailles. Aldwin nomme chaque mort dont il connaît le nom. C\'est long, épuisant, et nécessaire.',
    lines: [
      {
        speaker: 'Aldwin',
        text: 'Daron, fils de Mikel. Soldat de la troisième compagnie. Il avait vingt ans. Il aimait pêcher. ...Yara de Hautvent. Archère. Elle voulait ouvrir une boulangerie. ...Tomm le Fort. Il n\'était pas si fort que ça, mais il était brave.',
        emotion: 'hommage individuel',
        gmCoaching: 'Chaque nom est prononcé avec le même poids. Aldwin se souvient d\'un détail pour chacun. C\'est son hommage — personne n\'est un numéro.'
      }
    ],
    playerResponses: [
      {
        id: 'aldwin-fun-ecouter',
        label: 'Écouter chaque nom en silence.',
        consequence: 'Les noms résonnent. Certains sont des PNJ que les joueurs connaissaient. Ce moment pèse.'
      },
      {
        id: 'aldwin-fun-aider',
        label: 'Ajouter des noms de personnes tombées que les PJ connaissaient.',
        consequence: 'Aldwin hoche la tête. "Merci. Personne ne devrait être oublié."'
      }
    ]
  },
];

// ============================================================================
// 20. THÉODORE (FINAL) — L'érudit (4 dialogues)
// ============================================================================

const THEODORE_DIALOGUES: DialogueTree[] = [
  {
    id: 'theodore-nexus',
    npcId: 'theodore',
    npcName: 'Théodore l\'Érudit',
    trigger: 'Théodore devant le Nexus',
    tone: 'émerveillement, extase scientifique',
    gmSceneNote: 'Théodore devant le Nexus est un enfant devant le plus beau cadeau du monde. Il oublie le danger, la mort, tout — sauf la CONNAISSANCE.',
    lines: [
      {
        speaker: 'Théodore',
        text: 'C\'est... c\'est MAGNIFIQUE ! Les lignes ley convergent ICI ! Regardez — REGARDEZ — la cristallisation de l\'énergie primordiale ! C\'est exactement ce que Vaelith théorisait dans son troisième appendice ! Sauf qu\'il avait TORT sur la fréquence !',
        emotion: 'extase scientifique',
        gmCoaching: 'Théodore tourne en rond, touche tout, prend des notes frénétiques. Il a complètement oublié qu\'ils sont en territoire ennemi. Quelqu\'un devrait le surveiller.'
      }
    ],
    playerResponses: [
      {
        id: 'theodore-nexus-focus',
        label: '"Théodore, CONCENTREZ-VOUS. Qu\'est-ce qui est utile pour le Rituel ?"',
        consequence: 'Théodore : "Oh ! Oui ! Pardon ! Les inscriptions ici — elles confirment la théorie ! Le Rituel PEUT fonctionner !"'
      },
      {
        id: 'theodore-nexus-laisser',
        label: 'Le laisser explorer pendant qu\'on monte la garde.',
        consequence: 'Théodore découvre trois informations cruciales en vingt minutes de babillage enthousiaste.'
      }
    ]
  },
  {
    id: 'theodore-notes',
    npcId: 'theodore',
    npcName: 'Théodore l\'Érudit',
    trigger: 'Théodore prend des notes frénétiques',
    tone: 'maniaque, adorable',
    unlockCondition: 'Exploration du Nexus',
    gmSceneNote: 'Théodore remplit des carnets à une vitesse inhumaine. Il documente tout pour la postérité.',
    lines: [
      {
        speaker: 'Théodore',
        text: 'Si nous mourons tous, ces notes DOIVENT survivre ! Toute cette connaissance — perdue si je ne l\'écris pas ! J\'ai déjà rempli sept carnets ! DONNEZ-MOI DU PAPIER !',
        emotion: 'urgence académique',
        gmCoaching: 'Théodore est couvert d\'encre, ses doigts sont noirs, ses yeux sont fous de passion. Il est magnifique dans son obsession.'
      }
    ],
    playerResponses: [
      {
        id: 'theodore-notes-papier',
        label: 'Lui donner tout le papier disponible.',
        consequence: 'Théodore : "MERCI ! Vous venez de sauver mille ans de savoir !"'
      },
      {
        id: 'theodore-notes-calmer',
        label: '"Théodore, respirez. On ne va pas mourir."',
        consequence: 'Théodore : "Vous ne comprenez pas ! Même si on SURVIT — cette connaissance doit être PARTAGÉE !"'
      }
    ]
  },
  {
    id: 'theodore-decouverte',
    npcId: 'theodore',
    npcName: 'Théodore l\'Érudit',
    trigger: 'Théodore fait une découverte cruciale',
    tone: 'eurêka, vital',
    unlockCondition: 'Exploration approfondie',
    gmSceneNote: 'La découverte de Théodore change la donne. Son obsession du savoir a payé — il a trouvé la clé manquante.',
    lines: [
      {
        speaker: 'Théodore',
        text: 'ATTENDEZ ! ATTENDEZ ATTENDEZ ATTENDEZ ! Cette inscription... ces symboles... Ce n\'est pas une formule de containment — c\'est une formule de COMMUNICATION ! Les Premiers ne combattaient pas l\'Entité — ils lui PARLAIENT !',
        emotion: 'eurêka',
        gmCoaching: 'Théodore brandit ses notes comme un trophée. Il saute sur place. C\'est la découverte de sa vie et elle arrive au moment parfait.'
      }
    ],
    playerResponses: [
      {
        id: 'theodore-dec-utiliser',
        label: '"On peut utiliser ça ! Comment active-t-on la communication ?"',
        consequence: 'Théodore : "La formule est ici ! Il faut la synchroniser avec le Rituel ! Vaelith doit voir ça IMMÉDIATEMENT !"'
      },
      {
        id: 'theodore-dec-bravo',
        label: '"Théodore, vous êtes un génie."',
        consequence: 'Théodore rougit jusqu\'aux oreilles. "Je... je fais juste de la lecture. Beaucoup de lecture."'
      }
    ]
  },
  {
    id: 'theodore-epilogue',
    npcId: 'theodore',
    npcName: 'Théodore l\'Érudit',
    trigger: 'Épilogue — Théodore écrit l\'histoire',
    tone: 'satisfait, déterminé',
    unlockCondition: 'Victoire, épilogue',
    gmSceneNote: 'La plus belle fin pour un érudit : écrire l\'histoire qu\'il a vécue.',
    lines: [
      {
        speaker: 'Théodore',
        text: 'J\'ai commencé à écrire. "Chronique de la Guerre des Sceaux, par Théodore Ashval, érudit et témoin." Ce sera mon oeuvre. Vingt volumes. Peut-être trente.',
        emotion: 'vocation accomplie',
        gmCoaching: 'Théodore à son bureau, plume à la main, entouré de ses sept carnets du Nexus. Il écrit l\'histoire — pas comme elle est racontée, mais comme elle a VRAIMENT été.'
      },
      {
        speaker: 'Théodore',
        text: 'Et je ne changerai rien. Pas les erreurs, pas les doutes, pas les peurs. L\'histoire vraie est plus belle que la légende. Parce qu\'elle est HUMAINE.',
        emotion: 'intégrité',
        gmCoaching: 'Théodore refuse de mythifier les événements. Il veut la vérité. C\'est le plus beau cadeau qu\'un érudit puisse offrir.'
      }
    ],
    playerResponses: [
      {
        id: 'theodore-epil-temoigner',
        label: '"Incluez mon témoignage. Je veux que les gens sachent la vérité."',
        consequence: 'Théodore : "ABSOLUMENT ! Un témoignage de première main ! Asseyez-vous, j\'ai des questions !"'
      },
      {
        id: 'theodore-epil-lire',
        label: '"J\'ai hâte de lire ça."',
        consequence: 'Théodore : "Volume un prêt dans six mois ! ...Peut-être un an. D\'accord, deux ans. La vérité prend du temps."'
      }
    ]
  },
];

// ============================================================================
// 21. SOLDAT EWEN — Jeune recrue représentant l'espoir (4 dialogues)
// ============================================================================

const EWEN_DIALOGUES: DialogueTree[] = [
  {
    id: 'ewen-peur',
    npcId: 'ewen',
    npcName: 'Soldat Ewen',
    trigger: 'Veille de bataille — Ewen terrifié',
    tone: 'vulnérable, jeune',
    gmSceneNote: 'Ewen a dix-sept ans. Il s\'est engagé il y a trois semaines. Ses mains tremblent. C\'est un enfant dans un monde d\'adultes en guerre.',
    lines: [
      {
        speaker: 'Ewen',
        text: 'Je... je suis pas supposé avoir peur, hein ? Les vrais soldats n\'ont pas peur. C\'est ce que mon instructeur disait. Alors pourquoi... pourquoi j\'arrive pas à arrêter de trembler ?',
        emotion: 'terreur juvénile',
        gmCoaching: 'Un gamin. Un GAMIN avec une épée trop grande pour lui et des yeux trop grands pour son visage. Si vos joueurs ne veulent pas le protéger, quelque chose ne va pas.'
      }
    ],
    playerResponses: [
      {
        id: 'ewen-peur-rassurer',
        label: '"Tous les vrais soldats ont peur. Le courage, c\'est avancer quand même."',
        consequence: 'Ewen essuie ses yeux. "Vraiment ? Même vous ?" "Surtout moi." Ewen sourit faiblement.'
      },
      {
        id: 'ewen-peur-proteger',
        label: '"Reste derrière moi demain. Je te couvrirai."',
        consequence: 'Ewen : "Vous... vous feriez ça ? Merci. Je serai brave. Je vous le promets."'
      },
      {
        id: 'ewen-peur-verité',
        label: '"Avoir peur est normal. C\'est ne pas avoir peur qui serait inquiétant."',
        consequence: 'Ewen prend une grande inspiration. "D\'accord. D\'accord. Je peux faire ça. Je PEUX."'
      }
    ]
  },
  {
    id: 'ewen-courage',
    npcId: 'ewen',
    npcName: 'Soldat Ewen',
    trigger: 'Ewen pendant la bataille',
    tone: 'tremblant mais debout',
    unlockCondition: 'Bataille finale en cours',
    gmSceneNote: 'Ewen tient bon. Il tremble, il pleure, mais il ne fuit pas. Le gamin terrifié se transforme sous les yeux des PJ.',
    lines: [
      {
        speaker: 'Ewen',
        text: 'JE TIENS ! JE TIENS LA LIGNE ! COMME VOUS M\'AVEZ DIT ! JE TIENS !',
        emotion: 'courage né de la peur',
        gmCoaching: 'Ewen hurle plus pour se convaincre que pour communiquer. Des larmes coulent mais son épée est ferme. La transformation d\'un garçon en homme se fait en temps réel.'
      }
    ],
    playerResponses: [
      {
        id: 'ewen-cour-encourager',
        label: '"C\'EST ÇA, EWEN ! TU Y ES !"',
        consequence: 'Ewen rugit — un vrai cri de guerre. Petit, aigu, mais sincère. Les soldats autour de lui tiennent plus ferme.'
      },
      {
        id: 'ewen-cour-proteger',
        label: 'Se placer devant Ewen pour le protéger d\'une vague ennemie.',
        consequence: 'Ewen : "NON ! Côte à côte ! Vous m\'avez dit — CÔTE À CÔTE !" Il refuse de se cacher.'
      }
    ]
  },
  {
    id: 'ewen-heroisme',
    npcId: 'ewen',
    npcName: 'Soldat Ewen',
    trigger: 'Ewen fait un acte héroïque',
    tone: 'inattendu, bouleversant',
    unlockCondition: 'Bataille avancée',
    gmSceneNote: 'Le moment où Ewen sauve quelqu\'un. Pas un grand acte — juste le bon geste au bon moment. Mais c\'est suffisant pour faire de lui un héros.',
    lines: [
      {
        speaker: 'Ewen',
        text: 'ATTENTION !!!',
        emotion: 'instinct pur',
        gmCoaching: 'Un seul mot. Ewen pousse un camarade hors du chemin d\'un projectile. Il est touché à l\'épaule — blessé mais vivant. Il a sauvé une vie.'
      },
      {
        speaker: 'Ewen',
        text: '...Aïe. C\'est... c\'est comme ça que ça fait ? D\'être un héros ? Ça fait MAL.',
        emotion: 'humour involontaire',
        gmCoaching: 'Il rit en grimaçant. Le gamin qui tremblait hier est celui qui plonge devant le danger aujourd\'hui.'
      }
    ],
    playerResponses: [
      {
        id: 'ewen-hero-soigner',
        label: 'Soigner sa blessure immédiatement.',
        consequence: 'Ewen : "Juste une égratignure ! ...D\'accord, ça fait vraiment mal. Soignez-moi."'
      },
      {
        id: 'ewen-hero-fier',
        label: '"Bien joué, soldat. Tu as sauvé une vie."',
        consequence: 'Ewen rougit malgré la douleur. "J\'ai... j\'ai fait ce que vous m\'avez dit. Avancer malgré la peur."'
      }
    ]
  },
  {
    id: 'ewen-epilogue',
    npcId: 'ewen',
    npcName: 'Soldat Ewen',
    trigger: 'Épilogue — Ewen devient un héros à son tour',
    tone: 'plein d\'espoir, cyclique',
    unlockCondition: 'Victoire, survie d\'Ewen, épilogue',
    gmSceneNote: 'Le cycle se complète. Ewen, le gamin terrifié, est devenu le héros qui inspirera la prochaine génération. La boucle est bouclée.',
    lines: [
      {
        speaker: 'Ewen',
        text: 'Les gens me demandent de raconter la bataille. "Comment c\'était ?" qu\'ils disent. Je leur dis : "Terrifiant. Et magnifique. Et je n\'aurais pas voulu être ailleurs." ...C\'est ce que VOUS m\'avez appris.',
        emotion: 'gratitude et maturité',
        gmCoaching: 'Ewen est plus vieux de dix ans en quelques semaines. Il porte sa cicatrice d\'épaule avec fierté. Les enfants du village le regardent avec les mêmes yeux qu\'il avait pour les PJ.'
      },
      {
        speaker: 'Ewen',
        text: 'Un garçon m\'a demandé hier : "C\'est vrai que vous connaissez les héros ?" J\'ai dit : "Oui. Et un jour, peut-être que toi aussi tu en seras un." ...Exactement comme vous me l\'aviez dit.',
        emotion: 'héritage',
        gmCoaching: 'Le thème central de la campagne boucle ici : les héros inspirent d\'autres héros. À l\'infini. C\'est une belle fin.'
      }
    ],
    playerResponses: [
      {
        id: 'ewen-epil-fier',
        label: '"Je suis fier de toi, Ewen."',
        consequence: 'Ewen se met au garde-à-vous avec un sourire lumineux. "Et moi je suis fier de vous avoir connus."'
      },
      {
        id: 'ewen-epil-avenir',
        label: '"Qu\'est-ce que tu vas faire maintenant ?"',
        consequence: 'Ewen : "Rask m\'a proposé de devenir officier. Et Aldwin veut que j\'aide à l\'orphelinat. Je ferai les deux."'
      }
    ]
  },
];

// ============================================================================
// 22. LYANNA LA BARDE — Conteuse (6 dialogues)
// ============================================================================

const LYANNA_DIALOGUES: DialogueTree[] = [
  {
    id: 'lyanna-encouragement',
    npcId: 'lyanna',
    npcName: 'Lyanna la Barde',
    trigger: 'Chant d\'encouragement avant la bataille',
    tone: 'inspirant, musical',
    gmSceneNote: 'Lyanna chante comme si sa voix pouvait repousser les ténèbres. Et peut-être qu\'elle le peut. Les bardes ont un pouvoir que les guerriers ne comprennent pas.',
    lines: [
      {
        speaker: 'Lyanna',
        text: 'Écoutez. Pas mes mots — la musique. Elle est là depuis toujours. Dans le vent, dans les rivières, dans le battement de votre coeur. Ce soir, je lui donne une voix. Et cette voix dit : TENEZ BON.',
        emotion: 'inspiration',
        gmCoaching: 'Lyanna accorde son luth. Les premières notes flottent dans l\'air du soir. Les soldats s\'arrêtent de parler, de manger, de trembler. Ils écoutent.'
      }
    ],
    playerResponses: [
      {
        id: 'lyanna-enc-ecouter',
        label: 'Écouter le chant en silence.',
        consequence: 'Le moral de l\'armée monte. Avantage aux jets de Volonté pour les prochaines 24 heures.'
      },
      {
        id: 'lyanna-enc-chanter',
        label: 'Chanter avec elle.',
        consequence: 'Lyanna sourit et adapte la mélodie. Un duo. Le camp entier reprend le refrain.'
      }
    ]
  },
  {
    id: 'lyanna-legende',
    npcId: 'lyanna',
    npcName: 'Lyanna la Barde',
    trigger: 'Lyanna raconte la légende des héros passés',
    tone: 'mythique, puissant',
    unlockCondition: 'Veille de bataille',
    gmSceneNote: 'Les contes des héros anciens pour rappeler que d\'autres ont affronté l\'impossible avant eux. La tradition orale est l\'arme secrète d\'un peuple.',
    lines: [
      {
        speaker: 'Lyanna',
        text: 'Laissez-moi vous raconter l\'histoire d\'Aelwyn au Bouclier Brisé. Il se tenait là où vous vous tenez, il y a cinq cents ans, face à une armée dix fois plus grande. Et il a dit à ses soldats : "Nous sommes assez."',
        emotion: 'légende vivante',
        gmCoaching: 'Lyanna conte avec une voix qui change pour chaque personnage. Elle fait vivre les héros du passé. Ils sont presque visibles, debout parmi les vivants.'
      }
    ],
    playerResponses: [
      {
        id: 'lyanna-leg-suite',
        label: '"Et que s\'est-il passé ?"',
        consequence: 'Lyanna : "Il a gagné. Pas facilement. Pas sans pertes. Mais il a gagné. Et demain, VOUS gagnerez."'
      },
      {
        id: 'lyanna-leg-nous',
        label: '"Un jour, on racontera NOTRE histoire comme ça."',
        consequence: 'Lyanna sourit avec une intensité brûlante. "C\'est pour ça que je suis là. Pour me souvenir de chaque détail."'
      }
    ]
  },
  {
    id: 'lyanna-deuil',
    npcId: 'lyanna',
    npcName: 'Lyanna la Barde',
    trigger: 'Chant de deuil après des pertes',
    tone: 'déchirant, cathartique',
    unlockCondition: 'Mort d\'un allié important',
    gmSceneNote: 'Le chant de deuil de Lyanna est le plus beau et le plus triste son que les PJ entendront. Il donne forme au chagrin et le rend supportable.',
    lines: [
      {
        speaker: 'Lyanna',
        text: 'Je ne chanterai pas de mots. Pas pour ça. Les mots sont trop petits. Juste... la mélodie. Laissez-la vous prendre. Pleurez si vous devez pleurer. C\'est pour ça que la musique existe.',
        emotion: 'deuil musical',
        gmCoaching: 'Fredonner quelques notes. Lentes, montantes, puis descendantes. Pas de paroles — juste la musique. Laissez les joueurs ressentir.'
      }
    ],
    playerResponses: [
      {
        id: 'lyanna-deuil-pleurer',
        label: 'Laisser les larmes couler.',
        consequence: 'Pas de honte. Lyanna chante pour les larmes. C\'est leur but.'
      },
      {
        id: 'lyanna-deuil-raconter',
        label: 'Raconter un souvenir de l\'allié tombé.',
        consequence: 'Lyanna intègre l\'histoire dans la mélodie. L\'allié vit à travers le chant.'
      }
    ]
  },
  {
    id: 'lyanna-victoire',
    npcId: 'lyanna',
    npcName: 'Lyanna la Barde',
    trigger: 'Chant de victoire',
    tone: 'triomphal, joyeux',
    unlockCondition: 'Victoire finale',
    gmSceneNote: 'Le chant de victoire éclate comme le soleil après la tempête. Lyanna chante et tout le monde danse, rit, pleure de joie.',
    lines: [
      {
        speaker: 'Lyanna',
        text: 'MAINTENANT les mots ! Maintenant je CHANTE ! Chantez avec moi ! CHANTEZ POUR LES VIVANTS ET LES MORTS ! CHANTEZ PARCE QUE NOUS AVONS GAGNÉ !',
        emotion: 'joie explosive',
        gmCoaching: 'Lyanna saute debout, luth en l\'air, voix à plein volume. L\'armée entière reprend le chant — faux, criard, magnifique. C\'est le son de la victoire.'
      }
    ],
    playerResponses: [
      {
        id: 'lyanna-vict-chanter',
        label: 'Chanter à pleins poumons, peu importe le talent.',
        consequence: 'Lyanna : "PARFAIT ! Faux comme un chaudron, mais PARFAIT ! La victoire se chante mal !"'
      },
      {
        id: 'lyanna-vict-danser',
        label: 'Danser comme un fou au milieu du camp.',
        consequence: 'La danse gagne tout le monde. Nains, humains, tout le monde danse. C\'est la plus belle fête d\'Aethelgard.'
      }
    ]
  },
  {
    id: 'lyanna-legende-pj',
    npcId: 'lyanna',
    npcName: 'Lyanna la Barde',
    trigger: 'Lyanna commence à écrire la légende des PJ',
    tone: 'méta, poétique',
    unlockCondition: 'Après la victoire',
    gmSceneNote: 'Le moment méta : Lyanna écrit l\'histoire des PJ. La campagne elle-même devient une légende dans le monde du jeu.',
    lines: [
      {
        speaker: 'Lyanna',
        text: 'J\'ai commencé le premier couplet. Voulez-vous l\'entendre ? "Quand le monde tremblait et les sceaux craquaient, Quand les dieux se taisaient et l\'ombre montait, Des héros se levèrent — non par le destin, Mais par le choix, le coeur, et le lendemain..."',
        emotion: 'création artistique',
        gmCoaching: 'Lyanna récite les premiers vers de la Légende des PJ. Chaque joueur devrait se sentir vu, reconnu, immortalisé.'
      }
    ],
    playerResponses: [
      {
        id: 'lyanna-pj-corriger',
        label: '"C\'est beau. Mais changez la partie sur le choix — c\'était la CHANCE. Beaucoup de chance."',
        consequence: 'Lyanna rit. "La chance fait partie de la légende. Mais je garderai le choix. C\'est plus beau."'
      },
      {
        id: 'lyanna-pj-emotion',
        label: 'Écouter en silence, ému.',
        consequence: 'Lyanna : "Si ça vous touche... alors j\'ai réussi. La meilleure récompense d\'une barde."'
      }
    ]
  },
  {
    id: 'lyanna-epilogue',
    npcId: 'lyanna',
    npcName: 'Lyanna la Barde',
    trigger: 'Épilogue — Lyanna part en voyage',
    tone: 'aventureux, cyclique',
    unlockCondition: 'Épilogue',
    gmSceneNote: 'Lyanna repart sur les routes pour chanter l\'histoire des PJ partout dans le monde.',
    lines: [
      {
        speaker: 'Lyanna',
        text: 'La route m\'appelle. Chaque taverne, chaque place de village, chaque feu de camp — j\'y chanterai votre histoire. Dans cent ans, on la chantera encore. Et dans mille ans, quand quelqu\'un aura peur dans le noir, cette chanson lui dira : "D\'autres avant toi ont eu peur. Et ils ont quand même avancé."',
        emotion: 'mission éternelle',
        gmCoaching: 'Lyanna ajuste son luth sur son dos et part sur la route, silhouette diminuant vers l\'horizon. La musique continue, portée par le vent.'
      }
    ],
    playerResponses: [
      {
        id: 'lyanna-epil-adieu',
        label: '"Bonne route, Lyanna. Chante bien."',
        consequence: 'Lyanna se retourne une dernière fois et fait un salut de barde — la main sur le coeur. Puis elle disparaît au détour du chemin.'
      },
      {
        id: 'lyanna-epil-precise',
        label: '"N\'oublie pas de mentionner la fois où j\'ai trébuché devant le dragon !"',
        consequence: 'Le rire de Lyanna résonne depuis la route. "C\'est DÉJÀ dans le deuxième couplet !"'
      }
    ]
  },
];

// ============================================================================
// 23. FANTÔME DE SÉRAPHINA (si morte Act 3) (4 dialogues)
// ============================================================================

const SERAPHINA_DIALOGUES: DialogueTree[] = [
  {
    id: 'seraphina-pardon',
    npcId: 'seraphina-fantome',
    npcName: 'Fantôme de Séraphina',
    trigger: 'Séraphina apparaît comme spectre',
    tone: 'éthéré, apaisant',
    unlockCondition: 'Séraphina morte dans l\'Acte 3',
    gmSceneNote: 'Séraphina revient — non pas en colère mais en paix. Elle pardonne, elle guide, et elle dit adieu. C\'est un moment de grâce pure.',
    lines: [
      {
        speaker: 'Séraphina',
        text: 'Ne pleurez pas. S\'il vous plaît. Je suis... bien. Mieux que bien. Je vois des choses magnifiques de l\'autre côté. Des couleurs qui n\'ont pas de nom. Et je vous vois, vous, brûlant comme des étoiles.',
        emotion: 'paix transcendante',
        gmCoaching: 'Séraphina est lumineuse — pas le bleu froid de Nassira mais une lumière dorée et chaude. Elle sourit comme si elle savait quelque chose de merveilleux.'
      },
      {
        speaker: 'Séraphina',
        text: 'Si vous portez de la culpabilité pour ma mort... posez-la. Maintenant. Ici. C\'est MON choix de vous pardonner, et je le fais avec joie. Vous n\'avez rien fait de mal.',
        emotion: 'pardon absolu',
        gmCoaching: 'Si un PJ se sent coupable, ce moment est cathartique. Séraphina l\'absout avec une tendresse surnaturelle.'
      }
    ],
    playerResponses: [
      {
        id: 'sera-pardon-merci',
        label: '"Merci, Séraphina. Tu nous as manqué."',
        consequence: 'Séraphina : "Et vous m\'avez manqué. Mais je n\'étais jamais vraiment partie."'
      },
      {
        id: 'sera-pardon-desoler',
        label: '"Je suis tellement désolé. J\'aurais dû faire plus."',
        consequence: 'Séraphina pose sa main fantomatique sur votre joue. C\'est chaud, pas froid. "Vous avez fait assez. Plus qu\'assez."'
      }
    ]
  },
  {
    id: 'seraphina-conseil',
    npcId: 'seraphina-fantome',
    npcName: 'Fantôme de Séraphina',
    trigger: 'Séraphina donne un conseil crucial depuis l\'au-delà',
    tone: 'mystique, urgent',
    unlockCondition: 'Moment critique de l\'Acte 5',
    gmSceneNote: 'Séraphina voit des choses que les vivants ne voient pas. Son conseil est cryptique mais vital.',
    lines: [
      {
        speaker: 'Séraphina',
        text: 'De l\'autre côté, les choses sont claires. L\'Entité n\'est pas ce que vous croyez. Elle a PEUR, comme vous. Et la peur peut être apaisée — pas combattue. Apaisée.',
        emotion: 'sagesse d\'outre-tombe',
        gmCoaching: 'Séraphina parle avec l\'assurance de quelqu\'un qui a vu derrière le voile. Ses yeux regardent au-delà des PJ, vers quelque chose d\'invisible.'
      }
    ],
    playerResponses: [
      {
        id: 'sera-conseil-comment',
        label: '"Comment l\'apaiser ?"',
        consequence: 'Séraphina : "Avec ce qui apaise toujours la peur. La compassion. L\'écoute. L\'amour."'
      },
      {
        id: 'sera-conseil-confiance',
        label: '"Nous te faisons confiance, Séraphina."',
        consequence: 'Séraphina : "Alors faites-vous confiance à vous-mêmes. Vous avez tout ce qu\'il faut."'
      }
    ]
  },
  {
    id: 'seraphina-aide',
    npcId: 'seraphina-fantome',
    npcName: 'Fantôme de Séraphina',
    trigger: 'Séraphina intervient spectralement dans le combat',
    tone: 'héroïque, surnaturel',
    unlockCondition: 'Moment désespéré du combat final',
    gmSceneNote: 'Le fantôme de Séraphina se manifeste au moment le plus critique — un bouclier spectral, une lumière aveuglante, une intervention miraculeuse.',
    lines: [
      {
        speaker: 'Séraphina',
        text: 'PAS AUJOURD\'HUI. Pas MES amis. Pas TANT QUE JE SUIS LÀ.',
        emotion: 'protection féroce',
        gmCoaching: 'Séraphina apparaît comme une explosion de lumière dorée. Son fantôme se place entre les PJ et la mort. Même depuis l\'au-delà, elle protège ceux qu\'elle aime.'
      }
    ],
    playerResponses: [
      {
        id: 'sera-aide-merci',
        label: '"SÉRAPHINA !"',
        consequence: 'Elle sourit. Les ténèbres reculent. Les PJ sont sauvés. L\'amour est plus fort que la mort.'
      }
    ]
  },
  {
    id: 'seraphina-adieu',
    npcId: 'seraphina-fantome',
    npcName: 'Fantôme de Séraphina',
    trigger: 'Adieu définitif de Séraphina',
    tone: 'paisible, définitif',
    unlockCondition: 'Après la victoire',
    gmSceneNote: 'Le dernier adieu. Séraphina peut enfin reposer en paix. C\'est beau, c\'est triste, et c\'est juste.',
    lines: [
      {
        speaker: 'Séraphina',
        text: 'C\'est l\'heure. Les couleurs m\'appellent. L\'au-delà est plus beau que vous ne l\'imaginez, alors ne soyez pas tristes pour moi. Soyez tristes pour vous — parce que vous devrez vivre sans ma cuisine.',
        emotion: 'adieu joyeux',
        gmCoaching: 'Séraphina rit. C\'est la dernière chose qu\'on entend d\'elle — un rire. Puis la lumière monte, monte, et disparaît. Silence.'
      },
      {
        speaker: 'Séraphina',
        text: 'Vivez. C\'est la seule chose que je vous demande. Vivez bien.',
        emotion: 'dernier murmure',
        gmCoaching: 'Dernier souffle de lumière. Séraphina est partie. Vraiment partie cette fois. Mais son rire reste dans la mémoire.'
      }
    ],
    playerResponses: [
      {
        id: 'sera-adieu-vivre',
        label: '"On vivra. Pour toi aussi."',
        consequence: 'Un dernier éclat de lumière dorée. Chaleur sur le coeur. Puis la paix.'
      },
      {
        id: 'sera-adieu-silence',
        label: 'Regarder la lumière disparaître en silence.',
        consequence: 'Le silence après Séraphina n\'est pas vide. Il est plein. Plein de tout ce qu\'elle était.'
      }
    ]
  },
];

// ============================================================================
// 24. VEXOR RÉDIMÉ (si sauvé Act 4) (4 dialogues)
// ============================================================================

const VEXOR_REDIME_DIALOGUES: DialogueTree[] = [
  {
    id: 'vexor-redime-repentir',
    npcId: 'vexor-redime',
    npcName: 'Vexor (Rédimé)',
    trigger: 'Vexor rejoint l\'armée comme allié',
    tone: 'fragile, déterminé',
    unlockCondition: 'Vexor sauvé dans l\'Acte 4',
    gmSceneNote: 'Vexor au milieu des soldats qui le regardent avec terreur et dégoût. Il est un nécromancien repenti dans une armée qui combat des morts-vivants. L\'ironie le tue.',
    lines: [
      {
        speaker: 'Vexor',
        text: 'Oui, je sais. L\'ancien ennemi parmi vous. Croyez-moi, je suis aussi mal à l\'aise que vous. Peut-être plus. Au moins VOUS, vous n\'avez pas à vivre avec mes souvenirs.',
        emotion: 'auto-dérision amère',
        gmCoaching: 'Vexor est entouré d\'espace vide — personne ne veut se tenir près de lui. Il le comprend. Il l\'accepte.'
      },
      {
        speaker: 'Vexor',
        text: 'Je ne demande pas votre pardon. Ni votre amitié. Juste votre permission de me tenir entre vous et la mort. C\'est la seule chose que je sais bien faire... et pour une fois, je veux la faire du bon côté.',
        emotion: 'humilité guerrière',
        gmCoaching: 'Premier geste de vrai courage de Vexor : se montrer vulnérable devant ceux qui le haïssent.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-red-soutien',
        label: 'Se tenir à côté de Vexor devant tout le monde.',
        consequence: 'Le message est clair : les PJ font confiance à Vexor. Les soldats acceptent — à contrecoeur.',
        reputationChange: [{ faction: 'armee', amount: -5 }]
      },
      {
        id: 'vexor-red-discret',
        label: '"Restez à l\'arrière. Votre moment viendra."',
        consequence: 'Vexor hoche la tête. "Sage. Je n\'attirerai pas l\'attention. Pas encore."'
      }
    ]
  },
  {
    id: 'vexor-redime-aide',
    npcId: 'vexor-redime',
    npcName: 'Vexor (Rédimé)',
    trigger: 'Vexor aide de façon cruciale',
    tone: 'puissant, ironique',
    unlockCondition: 'Combat contre l\'armée de Malachar',
    gmSceneNote: 'Vexor retourne les morts-vivants de Malachar contre lui. L\'ironie est cosmique et magnifique.',
    lines: [
      {
        speaker: 'Vexor',
        text: 'Malachar pense que ces morts-vivants lui appartiennent ? Permettez-moi de le corriger. LEVEZ-VOUS ! LEVEZ-VOUS ET RETOURNEZ-VOUS CONTRE VOTRE MAÎTRE !',
        emotion: 'puissance redirigée',
        gmCoaching: 'Vexor lève les bras. L\'énergie nécromantique INVERSE sa polarité. Les squelettes de Malachar s\'arrêtent, tremblent, puis se retournent. L\'expression de Malachar est IMPAYABLE.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-aide-bravo',
        label: '"MAGNIFIQUE, Vexor !"',
        consequence: 'Vexor : "La nécromancie est un outil. Comme une épée. Ce qui compte, c\'est la main qui la tient."'
      },
      {
        id: 'vexor-aide-inquiet',
        label: '"Ne perdez pas le contrôle !"',
        consequence: 'Vexor : "Le contrôle ? C\'est la seule chose que j\'aie jamais maîtrisée." Sourire féroce.'
      }
    ]
  },
  {
    id: 'vexor-redime-sacrifice',
    npcId: 'vexor-redime',
    npcName: 'Vexor (Rédimé)',
    trigger: 'Vexor se sacrifie pour le Rituel',
    tone: 'tragique, sublime',
    unlockCondition: 'Moment critique du Rituel, besoin d\'une âme volontaire',
    gmSceneNote: 'Vexor se porte volontaire pour devenir un Sceau. Le nécromancien qui a passé sa vie à fuir la mort choisit quelque chose de pire que la mort — par amour.',
    lines: [
      {
        speaker: 'Vexor',
        text: 'Vous avez besoin d\'une âme volontaire ? J\'ai cent sept crimes à expier. Cent sept âmes que j\'ai prises. Il est temps que j\'en donne une en retour — la mienne.',
        emotion: 'sacrifice rédempteur',
        gmCoaching: 'Vexor s\'avance sans trembler. Pour la première fois, il n\'a pas peur. La mort — sa plus grande ennemie — est devenue son choix.'
      },
      {
        speaker: 'Vexor',
        text: 'Dites à Elyndra... si elle est quelque part... que son idiot de mari a fini par faire quelque chose de bien. Juste une fois. Mais une belle fois.',
        emotion: 'paix finale',
        gmCoaching: 'Il sourit. Le même sourire qu\'il avait en parlant d\'Elyndra — jeune, tendre, humain. Puis la lumière le prend.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-sacr-adieu',
        label: '"Adieu, Vexor. Tu as trouvé ta rédemption."',
        consequence: 'Vexor : "Pas ma rédemption. Mon humanité." La lumière l\'engloutit. Il est en paix.'
      },
      {
        id: 'vexor-sacr-empecher',
        label: '"NON ! Il y a un autre moyen !"',
        consequence: 'Vexor : "Il n\'y en a pas. Et vous le savez. Laissez-moi faire ça. S\'il vous plaît. C\'est tout ce que j\'ai."'
      }
    ]
  },
  {
    id: 'vexor-redime-gratitude',
    npcId: 'vexor-redime',
    npcName: 'Vexor (Rédimé)',
    trigger: 'Vexor remercie les PJ (si vivant après la victoire)',
    tone: 'doux, rare',
    unlockCondition: 'Victoire sans sacrifice de Vexor',
    gmSceneNote: 'Vexor vivant après la victoire. Le nécromancien rédimé qui doit apprendre à vivre, pas juste à survivre.',
    lines: [
      {
        speaker: 'Vexor',
        text: 'Je ne sais pas comment on fait... ça. Vivre. Sans colère, sans mission, sans vengeance. C\'est... étrange. Et terrifiant. Et peut-être un peu magnifique.',
        emotion: 'renaissance',
        gmCoaching: 'Vexor regarde le lever du soleil comme s\'il le voyait pour la première fois. L\'homme derrière le monstre, enfin libre.'
      },
      {
        speaker: 'Vexor',
        text: 'Vous m\'avez sauvé d\'une chose pire que la mort — de moi-même. Je ne sais pas comment rembourser ça. Mais je vais essayer. Chaque jour. Pour Elyndra. Et pour vous.',
        emotion: 'gratitude profonde',
        gmCoaching: 'Vexor tend la main. Pas de magie, pas de pouvoir — juste une main humaine, tendue en signe de gratitude.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-grat-serrer',
        label: 'Serrer sa main.',
        consequence: 'Vexor serre fort. Ses mains sont froides — elles le seront toujours — mais la poignée est chaude.'
      },
      {
        id: 'vexor-grat-avenir',
        label: '"Que vas-tu faire maintenant ?"',
        consequence: 'Vexor : "Planter des fleurs d\'aurore. Partout. Jusqu\'à ce que le monde en soit couvert."'
      }
    ]
  },
];

// ============================================================================
// 25. LE NARRATEUR — Voix divine/méta (4 dialogues)
// ============================================================================

const NARRATEUR_DIALOGUES: DialogueTree[] = [
  {
    id: 'narrateur-ouverture',
    npcId: 'narrateur',
    npcName: 'Le Narrateur',
    trigger: 'Ouverture de l\'épilogue',
    tone: 'omniscient, chaleureux',
    gmSceneNote: 'Le Narrateur est la voix qui ouvre et ferme l\'histoire. Ce n\'est pas un personnage — c\'est la voix du conte lui-même. Parlez comme si vous lisiez le dernier chapitre du plus beau livre du monde.',
    lines: [
      {
        speaker: 'Le Narrateur',
        text: 'Et ainsi, les héros se tenaient au seuil de l\'avenir. Le sang séchait. Les larmes tarissaient. Et le monde, ce monde stupide et magnifique, continuait de tourner. Comme il l\'avait toujours fait. Comme il le ferait toujours.',
        emotion: 'ouverture épique',
        gmCoaching: 'Voix calme, posée, omnisciente. Le Narrateur voit tout — passé, présent, avenir. Il raconte avec une affection détachée, comme un parent qui regarde ses enfants jouer.'
      }
    ],
    playerResponses: [
      {
        id: 'narrateur-ouv-ecouter',
        label: 'Écouter la narration.',
        consequence: 'Le récit continue. L\'épilogue se déploie.'
      }
    ]
  },
  {
    id: 'narrateur-consequences',
    npcId: 'narrateur',
    npcName: 'Le Narrateur',
    trigger: 'Résumé des conséquences des choix des PJ',
    tone: 'factuel, émotionnel',
    unlockCondition: 'Épilogue en cours',
    gmSceneNote: 'Le Narrateur résume ce que les PJ ont accompli et les conséquences de leurs choix. Chaque table aura un résumé différent — c\'est LEUR histoire.',
    lines: [
      {
        speaker: 'Le Narrateur',
        text: 'Dans les années qui suivirent, le monde changea. Pas d\'un coup — le monde ne change jamais d\'un coup. Mais pierre après pierre, sourire après sourire, les cicatrices se refermèrent. Et sur chaque cicatrice, quelqu\'un planta une fleur.',
        emotion: 'espoir mesuré',
        gmCoaching: 'Adaptez ce passage aux choix spécifiques des PJ. Mentionnez les conséquences de leurs décisions — les bonnes ET les mauvaises. Soyez honnête.'
      },
      {
        speaker: 'Le Narrateur',
        text: 'Les nains de Karak-Zhul ouvrirent leurs portes. Les mages de la Guilde partagèrent leur savoir. Et dans une petite taverne au bord d\'un chemin poussiéreux, un tavernier servait de la bière en racontant des histoires de héros — avec des détails qui changeaient à chaque fois, évidemment.',
        emotion: 'monde qui continue',
        gmCoaching: 'Insérez ici les épilogue spécifiques aux PNJ que les PJ ont rencontrés. Chaque amitié, chaque alliance, chaque sacrifice a des conséquences.'
      }
    ],
    playerResponses: [
      {
        id: 'narrateur-cons-ecouter',
        label: 'Savourer le résumé de leur histoire.',
        consequence: 'Les joueurs voient l\'impact de chacun de leurs choix. Pas de regrets — juste de la vie.'
      }
    ]
  },
  {
    id: 'narrateur-question',
    npcId: 'narrateur',
    npcName: 'Le Narrateur',
    trigger: 'Question existentielle aux joueurs',
    tone: 'philosophique, méta',
    unlockCondition: 'Fin de l\'épilogue',
    gmSceneNote: 'La question que le Narrateur pose n\'est pas seulement pour les personnages — elle est pour les JOUEURS. Brisez le quatrième mur délicatement.',
    lines: [
      {
        speaker: 'Le Narrateur',
        text: 'Et maintenant, une dernière question. Non pas pour les héros d\'Aethelgard — mais pour vous. Vous qui avez ri avec eux, pleuré avec eux, tremblé avec eux. Qu\'avez-vous appris ? Sur le courage. Sur l\'amour. Sur vous-mêmes.',
        emotion: 'introspection méta',
        gmCoaching: 'Pause. Regardez vos joueurs. Vraiment. Ce moment est pour EUX. Laissez-les parler s\'ils veulent. Ou rester silencieux. Les deux sont parfaits.'
      }
    ],
    playerResponses: [
      {
        id: 'narrateur-quest-repondre',
        label: 'Répondre sincèrement à la question.',
        consequence: 'Chaque réponse est la bonne réponse. Le Narrateur sourit.'
      },
      {
        id: 'narrateur-quest-silence',
        label: 'Sourire sans répondre.',
        consequence: 'Certaines réponses n\'ont pas besoin de mots. Le silence est parfait.'
      }
    ]
  },
  {
    id: 'narrateur-fin',
    npcId: 'narrateur',
    npcName: 'Le Narrateur',
    trigger: 'Le mot de la fin',
    tone: 'final, éternel',
    unlockCondition: 'Toute fin de campagne',
    gmSceneNote: 'LE DERNIER MOT. Après ça, la campagne est terminée. Faites-en un moment magique. Le silence après cette phrase est le plus beau silence de la campagne.',
    lines: [
      {
        speaker: 'Le Narrateur',
        text: 'Les histoires ne finissent jamais vraiment. Elles s\'endorment. Et quand quelqu\'un, quelque part, ouvre un livre ou lance des dés ou imagine un monde... elles se réveillent. Comme les héros. Comme l\'espoir. Comme la lumière du matin après la plus longue des nuits.',
        emotion: 'éternité',
        gmCoaching: 'Voix douce. Presque un murmure. Regardez chaque joueur dans les yeux. Ce moment leur appartient.'
      },
      {
        speaker: 'Le Narrateur',
        text: 'Merci d\'avoir joué. Merci d\'avoir cru. Et souvenez-vous : dans Aethelgard comme dans la vie — les vrais héros ne sont pas ceux qui n\'ont jamais peur. Ce sont ceux qui avancent malgré tout.',
        emotion: 'adieu et début',
        gmCoaching: 'Le dernier mot de la campagne. Après ça... silence. Puis, probablement, des applaudissements. Ou des larmes. Ou les deux. Bravo, MJ. Vous avez raconté une histoire magnifique.'
      }
    ],
    playerResponses: [
      {
        id: 'narrateur-fin-applaudir',
        label: 'Applaudir.',
        consequence: 'La campagne est terminée. L\'histoire vit pour toujours.'
      },
      {
        id: 'narrateur-fin-merci',
        label: '"Merci. Pour tout."',
        consequence: 'Le Narrateur sourit. Les dés sont rangés. Mais l\'histoire continue — dans la mémoire de ceux qui l\'ont vécue.'
      }
    ]
  },
];

// ============================================================================
// EXPORT — ACTE 5
// ============================================================================

export const NPC_DIALOGUES_ACT5: DialogueTree[] = [
  ...ELARA_DIALOGUES,
  ...MALACHAR_DIALOGUES,
  ...ENTITE_DIALOGUES,
  ...BROK_DIALOGUES,
  ...MARCUS_DIALOGUES,
  ...ALDWIN_DIALOGUES,
  ...THEODORE_DIALOGUES,
  ...EWEN_DIALOGUES,
  ...LYANNA_DIALOGUES,
  ...SERAPHINA_DIALOGUES,
  ...VEXOR_REDIME_DIALOGUES,
  ...NARRATEUR_DIALOGUES,
];
