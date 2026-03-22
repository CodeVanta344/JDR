/**
 * AETHELGARD - Arbres de Dialogues Acte 3
 * 10 PNJs majeurs de l'Acte 3 avec dialogues profonds et ramifiés
 * Trahison de Séraphina, voyage maritime, temple englouti, siège de Sol-Aureus
 */

import type {
  DialogueEntry,
  DialogueTone,
  DialogueCondition,
  PlayerResponseOption,
  NPCDialogueTree
} from './dialogues-act1-2';

// ============================================================================
// 16. SÉRAPHINA - La traîtresse
// ============================================================================

const SERAPHINA_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:ally:seraphina',
  npcName: 'Séraphina',
  npcTitle: 'Compagnonne de route, mage guérisseuse — et traîtresse',
  act: 3,
  dialogues: [
    {
      id: 'seraphina-amitie-1',
      npcId: 'npc:ally:seraphina',
      trigger: 'premières interactions amicales',
      tone: 'amical',
      conditions: { actNumber: 3 },
      lines: [
        "*vous rejoint au feu de camp, deux tasses de tisane en main* Tenez. Camomille et miel. Mon secret pour les longues routes.",
        "Vous savez, j'ai parcouru beaucoup de chemins avec beaucoup de gens. Mais ce groupe... c'est différent. On se bat pour quelque chose de plus grand que nous. C'est rare.",
        "*sourire sincère* Je suis contente d'être ici. Vraiment. Quoi qu'il arrive."
      ],
      playerResponses: [
        {
          id: 'seraphina-amitie1-merci',
          text: "Merci, Séraphina. On a de la chance de vous avoir.",
          consequence: "Séraphina détourne le regard un instant. Culpabilité naissante.",
          reputationChange: [{ faction: 'compagnons', amount: 2 }]
        },
        {
          id: 'seraphina-amitie1-passe',
          text: "Parlez-nous de vous. D'où venez-vous ?",
          consequence: "Séraphina raconte une version édulcorée de son histoire.",
          nextDialogue: 'seraphina-amitie-2'
        },
        {
          id: 'seraphina-amitie1-avenir',
          text: "Quand tout ça sera fini, qu'est-ce que vous ferez ?",
          consequence: "Séraphina se tait un moment. 'Je... je ne sais pas. Je n'ai pas prévu aussi loin.'",
          reputationChange: [{ faction: 'compagnons', amount: 1 }]
        }
      ]
    },
    {
      id: 'seraphina-amitie-2',
      npcId: 'npc:ally:seraphina',
      trigger: 'Séraphina parle de son passé (version modifiée)',
      tone: 'triste',
      conditions: { previousDialogue: 'seraphina-amitie-1' },
      lines: [
        "Mon village a brûlé quand j'avais dix ans. Les Ombres — les premières incursions, avant que les gens ne prennent la menace au sérieux. J'ai perdu mes parents, ma soeur, tout.",
        "Un mage m'a trouvée dans les ruines. Il m'a appris la magie de guérison. Il disait que ceux qui ont connu la destruction sont les meilleurs pour reconstruire.",
        "C'est pour ça que je suis ici. Pour que plus aucun enfant ne perde sa famille comme je l'ai perdue. *sa voix tremble, et la douleur est RÉELLE*"
      ],
      playerResponses: [
        {
          id: 'seraphina-amitie2-soutien',
          text: "*Poser une main sur son épaule* Vous n'êtes plus seule.",
          consequence: "Séraphina ferme les yeux. Un combat intérieur se joue. La trahison sera plus difficile.",
          reputationChange: [{ faction: 'compagnons', amount: 3 }]
        },
        {
          id: 'seraphina-amitie2-mage',
          text: "Ce mage qui vous a formée, qui était-il ?",
          consequence: "Séraphina hésite une fraction de seconde trop longue. 'Il est mort depuis.' (Perspicacité DC 18 pour remarquer l'hésitation)",
          skillCheck: { skill: 'Perspicacité', dc: 18, success: "Vous remarquez une micro-expression de peur. Elle cache quelque chose sur ce mage.", failure: "L'histoire semble cohérente et touchante." }
        },
        {
          id: 'seraphina-amitie2-vengeance',
          text: "La vengeance motive ou elle consume. Laquelle pour vous ?",
          consequence: "Séraphina réfléchit longuement. 'Les deux. Et c'est ça le problème.'",
          unlocks: 'indice-seraphina-conflit'
        }
      ]
    },
    {
      id: 'seraphina-indice-1',
      npcId: 'npc:ally:seraphina',
      trigger: 'premier indice subtil de trahison',
      tone: 'nerveux',
      conditions: { actNumber: 3, customFlag: 'camp-nuit-foret' },
      lines: [
        "*surprise en train de murmurer dans la nuit, dos tourné au camp* ...non, pas encore. Ils ne sont pas prêts. Il faut plus de temps... *se retourne brusquement* Oh ! Vous êtes réveillé ?",
        "*se recompose rapidement* Je... je priais. Vieille habitude. Ma mère priait toujours la nuit. Je suppose que ça m'est resté.",
        "*sourire forcé* Rendormez-vous. Tout va bien. Je monte la garde encore une heure."
      ],
      playerResponses: [
        {
          id: 'seraphina-indice1-croire',
          text: "D'accord. Bonne nuit, Séraphina.",
          consequence: "Aucun soupçon. L'indice est noté dans le journal mais pas exploité.",
          unlocks: 'indice-trahison-1-manque'
        },
        {
          id: 'seraphina-indice1-douter',
          text: "(Perspicacité DC 16) Vous parliez à quelqu'un. Pas de prière.",
          consequence: "Test pour détecter le mensonge.",
          skillCheck: { skill: 'Perspicacité', dc: 16, success: "Séraphina pâlit. 'Je... je fais parfois des cauchemars éveillée. Depuis l'incendie.' Un autre mensonge, mais plus élaboré.", failure: "L'explication semble plausible. Les prières nocturnes ne sont pas rares." }
        },
        {
          id: 'seraphina-indice1-surveiller',
          text: "*Faire semblant de se rendormir et observer*",
          consequence: "Séraphina ne reprend pas sa conversation. Mais elle reste éveillée toute la nuit, tendue.",
          unlocks: 'seraphina-sous-surveillance'
        }
      ]
    },
    {
      id: 'seraphina-indice-2',
      npcId: 'npc:ally:seraphina',
      trigger: 'deuxième indice de trahison',
      tone: 'nerveux',
      conditions: { actNumber: 3, customFlag: 'apres-combat-ombres' },
      lines: [
        "*après un combat contre des créatures d'ombre, ses sorts semblent les avoir à peine effleurées* Je ne comprends pas... ma magie était plus forte avant. C'est comme si... les ombres la reconnaissaient.",
        "*se frotte les mains nerveusement* Non, c'est ridicule. C'est la fatigue. Je suis fatiguée, c'est tout.",
        "*mais ses yeux montrent une peur qui va bien au-delà de la fatigue*"
      ],
      playerResponses: [
        {
          id: 'seraphina-indice2-rassurer',
          text: "On est tous fatigués. Reposez-vous, on gère.",
          consequence: "Séraphina accepte avec gratitude. La culpabilité la ronge.",
          reputationChange: [{ faction: 'compagnons', amount: 1 }]
        },
        {
          id: 'seraphina-indice2-magie',
          text: "(Arcanes DC 15) La magie d'ombre ne résiste pas à la magie de guérison... sauf si les deux partagent une source.",
          consequence: "Test de connaissance arcanique crucial.",
          skillCheck: { skill: 'Arcanes', dc: 15, success: "Révélation : la magie de Séraphina a une signature d'ombre. Elle n'est pas une pure guérisseuse.", failure: "Rien d'anormal détecté dans le flux magique." },
          unlocks: 'indice-magie-seraphina'
        },
        {
          id: 'seraphina-indice2-aldwin',
          text: "Frère Aldwin pourrait examiner votre magie. Juste pour être sûr.",
          consequence: "Séraphina refuse catégoriquement. 'Non ! Je veux dire... ce n'est pas nécessaire.'",
          unlocks: 'refus-examen-seraphina'
        }
      ]
    },
    {
      id: 'seraphina-indice-3',
      npcId: 'npc:ally:seraphina',
      trigger: 'troisième indice pour joueurs attentifs',
      tone: 'mystérieux',
      conditions: { actNumber: 3, customFlag: 'avant-temple-englouti' },
      lines: [
        "*étudie une carte avec une familiarité troublante* Le temple englouti est par là. Je le... je le sens. *se reprend* Je veux dire, les courants magiques sont clairs dans cette direction.",
        "*pointe un passage sur la carte que PERSONNE n'a mentionné* On pourrait passer par ce passage latéral pour éviter les gardes de l'entrée principale.",
        "*réalise son erreur trop tard* C'est... c'est logique, architecturalement. Les temples de cette époque avaient toujours des passages secondaires."
      ],
      playerResponses: [
        {
          id: 'seraphina-indice3-passage',
          text: "Comment connaissez-vous ce passage, Séraphina ?",
          consequence: "Séraphina bégaie. Moment critique de suspicion.",
          skillCheck: { skill: 'Perspicacité', dc: 14, success: "Elle CONNAÎT ce temple. Ce n'est pas de la logique architecturale.", failure: "L'explication architecturale est plausible." },
          unlocks: 'suspicion-seraphina-temple'
        },
        {
          id: 'seraphina-indice3-utiliser',
          text: "Bon oeil. Allons par là.",
          consequence: "Le passage existe vraiment. Mais c'est un piège préparé.",
          unlocks: 'piege-passage-lateral'
        },
        {
          id: 'seraphina-indice3-confronter',
          text: "Depuis le début, il y a des incohérences. Les murmures nocturnes, la magie qui flanche, et maintenant ça. Qu'est-ce que vous nous cachez ?",
          consequence: "Confrontation directe. Séraphina peut craquer ou se renforcer.",
          nextDialogue: 'seraphina-presque-aveu'
        }
      ]
    },
    {
      id: 'seraphina-presque-aveu',
      npcId: 'npc:ally:seraphina',
      trigger: 'Séraphina au bord de l\'aveu',
      tone: 'désespéré',
      conditions: { previousDialogue: 'seraphina-indice-3' },
      lines: [
        "*les yeux brillants de larmes* Vous avez raison. Vous avez raison sur tout. Je... *serre les poings, combat intérieur visible*",
        "*murmure* Je voulais vous le dire. Chaque jour, je me lève en me disant 'aujourd'hui je leur dis'. Et chaque soir, je n'ai pas pu. Parce que...",
        "*se reprend soudain, mur émotionnel* ...parce qu'il n'y a rien à dire. J'ai des cauchemars. J'ai vécu des traumatismes. Ça affecte ma magie. C'est TOUT. *fuit le regard*"
      ],
      playerResponses: [
        {
          id: 'seraphina-aveu-pousser',
          text: "Séraphina. Regardez-moi. Quoi que ce soit, on peut le gérer ensemble.",
          consequence: "Séraphina est au bord de la confession. Mais sa peur est plus forte.",
          reputationChange: [{ faction: 'compagnons', amount: 2 }],
          unlocks: 'seraphina-conflit-maximal'
        },
        {
          id: 'seraphina-aveu-accepter',
          text: "D'accord. On en reparlera quand vous serez prête.",
          consequence: "Séraphina hoche la tête. Le secret reste. La trahison approche.",
          reputationChange: [{ faction: 'compagnons', amount: 1 }]
        },
        {
          id: 'seraphina-aveu-ultimatum',
          text: "La confiance est le ciment de ce groupe. Si vous ne pouvez pas être honnête, vous ne pouvez pas rester.",
          consequence: "Séraphina est blessée. Elle se ferme. La trahison sera plus froide.",
          reputationChange: [{ faction: 'compagnons', amount: -3 }]
        }
      ]
    },
    {
      id: 'seraphina-revelation',
      npcId: 'npc:ally:seraphina',
      trigger: 'monologue de révélation de la trahison',
      tone: 'triste',
      conditions: { actNumber: 3, customFlag: 'moment-revelation-seraphina' },
      lines: [
        "*debout face au groupe, masque tombé, larmes coulant* Je suis désolée. Depuis le début, je suis désolée. Et vous ne pouvez pas savoir à quel point ça fait mal de dire ça.",
        "Mon vrai nom est Séraphina Val-Ombre. Le mage qui m'a 'trouvée dans les ruines' était un adepte du Cercle d'Ombre. Il ne m'a pas sauvée — il m'a recrutée. Formée. Utilisée.",
        "Ma mission était de gagner votre confiance, de vous mener jusqu'aux Sceaux, et de... de les affaiblir de l'intérieur. Chaque nuit, quand vous dormiez, je transmettais votre position. Vos plans. Vos faiblesses.",
        "Mais je ne savais pas. Je ne savais pas que vous seriez... VOUS. Que vous seriez réels, et bons, et... *voix brisée* Je vous aime. Tous. Et c'est pour ça que la trahison est si cruelle."
      ],
      playerResponses: [
        {
          id: 'seraphina-revel-colere',
          text: "Vous nous avez TRAHIS ! Des gens sont MORTS à cause de vos informations !",
          consequence: "Séraphina ne se défend pas. Elle accepte la colère. C'est mérité.",
          reputationChange: [{ faction: 'compagnons', amount: -5 }]
        },
        {
          id: 'seraphina-revel-comprendre',
          text: "Pourquoi maintenant ? Pourquoi nous le dire ?",
          consequence: "Séraphina révèle que le Cercle prépare un assaut final.",
          nextDialogue: 'seraphina-justification'
        },
        {
          id: 'seraphina-revel-silence',
          text: "*Silence glacial*",
          consequence: "Le silence est pire que les cris. Séraphina s'effondre.",
          reputationChange: [{ faction: 'compagnons', amount: -3 }]
        }
      ]
    },
    {
      id: 'seraphina-justification',
      npcId: 'npc:ally:seraphina',
      trigger: 'Séraphina justifie sa trahison',
      tone: 'désespéré',
      conditions: { previousDialogue: 'seraphina-revelation' },
      lines: [
        "Le Cercle ne m'a pas donné le choix. Ils détiennent les survivants de mon village. Vingt-trois personnes, dont des enfants, enfermées quelque part que je ne connais pas.",
        "Chaque semaine, ils m'envoyaient une preuve de vie. Une lettre d'un prisonnier, un dessin d'enfant. Et chaque semaine, le message était le même : 'Obéis, ou ils meurent.'",
        "Mais ce que le Cercle ne sait pas... c'est que j'ai aussi collecté des informations sur EUX. Leurs mouvements, leurs faiblesses, leurs rituels. *sort un carnet caché* Tout est là. Tout ce que j'ai pu rassembler en secret."
      ],
      playerResponses: [
        {
          id: 'seraphina-justif-carnet',
          text: "*Prendre le carnet et l'examiner*",
          consequence: "Le carnet contient des informations critiques sur le Cercle d'Ombre.",
          unlocks: 'carnet-seraphina-intelligence',
          itemReceived: 'carnet-cercle-ombre'
        },
        {
          id: 'seraphina-justif-prisonniers',
          text: "Nous sauverons ces prisonniers. Mais d'abord, plus de secrets.",
          consequence: "Séraphina révèle absolument tout. Aucune rétention.",
          questStarted: 'quest:prisonniers-cercle',
          unlocks: 'intel-complete-seraphina'
        },
        {
          id: 'seraphina-justif-refuser',
          text: "Rien ne justifie d'avoir mis en danger tous ces gens. Rien.",
          consequence: "Séraphina baisse la tête. 'Je sais. Je ne demande pas le pardon.'",
          reputationChange: [{ faction: 'compagnons', amount: -2 }]
        }
      ]
    },
    {
      id: 'seraphina-remords',
      npcId: 'npc:ally:seraphina',
      trigger: 'Séraphina montre ses remords',
      tone: 'triste',
      conditions: { previousDialogue: 'seraphina-revelation' },
      lines: [
        "*assise à l'écart du groupe, seule* Je ne dors plus. Chaque fois que je ferme les yeux, je vois vos visages. Pas en colère — souriants. Avant. Quand vous me faisiez confiance.",
        "Le pire moment a été quand vous m'avez défendue face au Gardien Faenor. Il avait raison de se méfier. Et vous avez pris MA défense contre LUI. Vous vous êtes fait un ennemi pour protéger une traîtresse.",
        "Si vous décidez de me bannir, je comprendrai. Si vous décidez de me livrer à la justice, j'irai sans résister. Mais si vous me laissez... je passerai le reste de ma vie à essayer de réparer."
      ],
      playerResponses: [
        {
          id: 'seraphina-remords-rester',
          text: "Vous restez. Mais la confiance se reconstruit pierre par pierre.",
          consequence: "Séraphina reste dans le groupe, sous surveillance. Rédemption possible.",
          reputationChange: [{ faction: 'compagnons', amount: 2 }],
          unlocks: 'seraphina-redemption-debut'
        },
        {
          id: 'seraphina-remords-partir',
          text: "Partez. Trouvez ces prisonniers vous-même. Prouvez que vous valez mieux.",
          consequence: "Séraphina part en mission solitaire. Pourra revenir plus tard.",
          unlocks: 'seraphina-quete-solitaire'
        },
        {
          id: 'seraphina-remords-bannir',
          text: "C'est fini, Séraphina. Ne revenez pas.",
          consequence: "Séraphina part sans un mot. Lourde conséquence narrative.",
          reputationChange: [{ faction: 'compagnons', amount: -1 }],
          unlocks: 'seraphina-bannie'
        }
      ]
    },
    {
      id: 'seraphina-confrontation-finale',
      npcId: 'npc:ally:seraphina',
      trigger: 'confrontation finale avec le Cercle',
      tone: 'solennel',
      conditions: { actNumber: 3, customFlag: 'assaut-cercle-ombre' },
      lines: [
        "*face à son ancien maître du Cercle* Maître Corvus. *sa voix ne tremble plus* Vous m'avez brisée, formée, et utilisée. Mais vous avez oublié une chose.",
        "Vous m'avez envoyée auprès des meilleurs. Et ils m'ont appris ce que vous ne pouviez pas : que la force ne vient pas de la peur, mais de l'amour.",
        "*lève les mains, magie brillant d'une lumière pure — pas d'ombre* Relâchez les prisonniers. Maintenant. Ou je vous montre ce qu'une 'petite fille brisée' peut faire quand elle n'a plus peur."
      ],
      playerResponses: [
        {
          id: 'seraphina-final-soutenir',
          text: "*Se tenir à ses côtés face à Corvus*",
          consequence: "Séraphina est galvanisée. Sa magie atteint un niveau inédit.",
          reputationChange: [{ faction: 'compagnons', amount: 5 }]
        },
        {
          id: 'seraphina-final-laisser',
          text: "C'est votre combat, Séraphina. Montrez-lui qui vous êtes.",
          consequence: "Séraphina affronte Corvus seule. Combat personnel et cathartique.",
          unlocks: 'duel-seraphina-corvus'
        }
      ]
    },
    {
      id: 'seraphina-redemption',
      npcId: 'npc:ally:seraphina',
      trigger: 'Séraphina se rachète',
      tone: 'solennel',
      conditions: { customFlag: 'seraphina-redemption-possible' },
      lines: [
        "*après le combat, couverte de blessures mais debout* Les prisonniers sont libres. Tous les vingt-trois. J'ai compté.",
        "*se tourne vers le groupe* Je ne demanderai jamais votre pardon. Mais je peux vous donner une chose : tout ce que je suis, tout ce que je serai, au service de cette cause. Sans secrets, sans mensonge. Juste moi.",
        "*tend les mains, ouvertes* Pas de magie. Pas de ruse. Juste Séraphina. Si c'est assez."
      ],
      playerResponses: [
        {
          id: 'seraphina-redem-pardon',
          text: "*Prendre ses mains* C'est plus que suffisant.",
          consequence: "Rédemption complète. Séraphina devient l'alliée la plus fidèle.",
          reputationChange: [{ faction: 'compagnons', amount: 10 }],
          unlocks: 'seraphina-redimee'
        },
        {
          id: 'seraphina-redem-temps',
          text: "Le pardon viendra. Pas aujourd'hui. Mais il viendra.",
          consequence: "Séraphina acquiesce. C'est suffisant pour espérer.",
          reputationChange: [{ faction: 'compagnons', amount: 5 }],
          unlocks: 'seraphina-en-probation'
        }
      ]
    }
  ]
};

// ============================================================================
// 17. GARDIEN FAENOR - Elfe soupçonneux
// ============================================================================

const FAENOR_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:ally:faenor',
  npcName: 'Gardien Faenor',
  npcTitle: 'Sentinelle de Sylvaneth, elfe méfiant',
  act: 3,
  dialogues: [
    {
      id: 'faenor-mefiance',
      npcId: 'npc:ally:faenor',
      trigger: 'première rencontre',
      tone: 'méfiant',
      conditions: { actNumber: 3 },
      lines: [
        "*arc tendu, flèche pointée, immobile comme une statue* Des humains dans la Forêt Sacrée. Avec une humaine dont la magie sent la corruption. *regard perçant vers Séraphina* Donnez-moi une raison de ne pas tirer.",
        "L'Archidruide vous fait confiance. L'Archidruide fait confiance à tout le monde. C'est pour ça qu'il a besoin de moi — pour être la méfiance qu'il refuse d'avoir.",
        "Vous passerez. Parce que Sylvanis l'ordonne. Mais je vous observe. Chaque pas, chaque mot, chaque sort. Surtout les siens. *désigne Séraphina*"
      ],
      playerResponses: [
        {
          id: 'faenor-mefiance-comprendre',
          text: "Votre prudence est sage. Nous ne demandons que votre vigilance.",
          consequence: "Faenor est légèrement surpris par la réponse. Moins hostile.",
          reputationChange: [{ faction: 'sylvaneth', amount: 1 }]
        },
        {
          id: 'faenor-mefiance-seraphina',
          text: "Que sentez-vous exactement chez Séraphina ?",
          consequence: "Faenor décrit une signature magique double. Indice majeur.",
          unlocks: 'analyse-faenor-seraphina'
        },
        {
          id: 'faenor-mefiance-defier',
          text: "Baissez cet arc. Nous sommes ici sur invitation.",
          consequence: "Faenor obéit mais la tension reste palpable.",
          reputationChange: [{ faction: 'sylvaneth', amount: -1 }]
        }
      ]
    },
    {
      id: 'faenor-observation',
      npcId: 'npc:ally:faenor',
      trigger: 'Faenor rapporte ses observations sur Séraphina',
      tone: 'confidentiel',
      conditions: { reputationMin: 3, customFlag: 'faenor-observe-seraphina' },
      lines: [
        "*vous prend à part, loin de Séraphina* Écoutez. Je l'observe depuis trois jours. Cette nuit, elle a quitté le camp pendant une heure. Elle est revenue par l'est. Il n'y a RIEN à l'est sauf les Bois Morts.",
        "Sa magie fluctue de manière anormale. Les sortilèges de guérison qu'elle lance portent une... ombre résiduelle. Comme un écho dans une grotte. Ce n'est pas naturel.",
        "Je ne dis pas qu'elle est votre ennemie. Je dis qu'elle n'est pas ce qu'elle prétend être. Et dans ma forêt, les choses qui mentent finissent empalées."
      ],
      playerResponses: [
        {
          id: 'faenor-obs-croire',
          text: "Continuez à l'observer. Mais ne faites rien sans nous prévenir.",
          consequence: "Faenor accepte. Surveillance renforcée sur Séraphina.",
          unlocks: 'surveillance-seraphina-faenor'
        },
        {
          id: 'faenor-obs-confronter',
          text: "Vous avez raison. Il est temps de lui poser la question directement.",
          consequence: "Confrontation avec Séraphina. Peut accélérer la révélation.",
          nextDialogue: 'seraphina-presque-aveu'
        },
        {
          id: 'faenor-obs-defendre',
          text: "Séraphina a prouvé sa valeur maintes fois. Votre méfiance est excessive.",
          consequence: "Faenor secoue la tête. 'J'espère que j'ai tort. Vraiment.'",
          reputationChange: [{ faction: 'sylvaneth', amount: -1 }]
        }
      ]
    },
    {
      id: 'faenor-aide',
      npcId: 'npc:ally:faenor',
      trigger: 'Faenor offre son aide à contrecoeur',
      tone: 'bourru',
      conditions: { reputationMin: 5 },
      lines: [
        "*nettoie son arc, évitant le contact visuel* La purification des racines nécessite quelqu'un qui connaît le réseau souterrain. Je... *soupire* ...je connais les tunnels.",
        "Ne prenez pas ça pour de l'amitié. C'est du devoir. L'Arbre-Monde meurt et je ferais n'importe quoi pour le sauver. Même aider des humains.",
        "Mais si votre 'amie' fait quoi que ce soit de suspect là-dessous... je n'hésiterai pas."
      ],
      playerResponses: [
        {
          id: 'faenor-aide-accepter',
          text: "Merci, Faenor. Votre connaissance sera précieuse.",
          consequence: "Faenor comme guide dans les tunnels racinaires.",
          reputationChange: [{ faction: 'sylvaneth', amount: 2 }],
          unlocks: 'faenor-guide-racines'
        },
        {
          id: 'faenor-aide-respect',
          text: "Le devoir parle. Mais la confiance se gagne en combattant ensemble.",
          consequence: "Faenor acquiesce silencieusement. Un pas vers le respect mutuel.",
          reputationChange: [{ faction: 'sylvaneth', amount: 3 }]
        }
      ]
    },
    {
      id: 'faenor-respect',
      npcId: 'npc:ally:faenor',
      trigger: 'Faenor gagne du respect pour le groupe',
      tone: 'respectueux',
      conditions: { reputationMin: 8, customFlag: 'apres-purification' },
      lines: [
        "*s'incline légèrement, geste rarissime pour lui* J'avais tort. Pas sur tout — j'avais raison sur la traîtresse. Mais j'avais tort sur vous.",
        "Vous vous êtes battus pour un arbre que vous ne connaissiez pas, un peuple qui vous méprisait, une cause qui n'était pas la vôtre. Ça... ça mérite le respect.",
        "Si vous revenez en Sylvaneth, vous serez accueillis par un arc baissé et un feu préparé. Par moi. C'est la meilleure promesse que je puisse faire."
      ],
      playerResponses: [
        {
          id: 'faenor-respect-merci',
          text: "Votre méfiance nous a protégés, Faenor. Ne la perdez jamais.",
          consequence: "Faenor sourit pour la première fois. Allié gagné.",
          reputationChange: [{ faction: 'sylvaneth', amount: 5 }],
          unlocks: 'faenor-allie'
        },
        {
          id: 'faenor-respect-seraphina',
          text: "Vous aviez raison pour Séraphina. On aurait dû écouter.",
          consequence: "Faenor hoche la tête. 'La méfiance n'est pas de la cruauté. C'est de l'amour prudent.'",
          reputationChange: [{ faction: 'sylvaneth', amount: 3 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 18. CAPITAINE GORVALD - Marin endurci
// ============================================================================

const GORVALD_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:ally:gorvald',
  npcName: 'Capitaine Gorvald',
  npcTitle: 'Capitaine du navire de guerre Brise-Tempête',
  act: 3,
  dialogues: [
    {
      id: 'gorvald-preparation',
      npcId: 'npc:ally:gorvald',
      trigger: 'préparation du voyage maritime',
      tone: 'bourru',
      conditions: { actNumber: 3 },
      lines: [
        "*homme massif, barbe sel-et-poivre, cicatrice de tentacule sur le bras* Le Brise-Tempête est le navire le plus solide de la flotte royale. Vingt ans sans couler. Pas faute d'avoir essayé.",
        "La traversée vers le Temple Englouti prendra trois jours si le vent est bon, une semaine s'il ne l'est pas. Et entre nous... le vent n'est jamais bon dans ces eaux.",
        "Attachez vos affaires, mangez léger, et si quelque chose sort de l'eau — ne le regardez pas dans les yeux. Conseil d'expérience."
      ],
      playerResponses: [
        {
          id: 'gorvald-prep-pret',
          text: "Nous sommes prêts, Capitaine. Quand levons-nous l'ancre ?",
          consequence: "Gorvald apprécie les gens directs. Départ à la prochaine marée.",
          reputationChange: [{ faction: 'marine-royale', amount: 2 }]
        },
        {
          id: 'gorvald-prep-creature',
          text: "Ne pas le regarder dans les yeux ? Quel genre de créatures exactement ?",
          consequence: "Gorvald décrit les horreurs marines avec un détachement professionnel.",
          unlocks: 'bestiaire-maritime'
        },
        {
          id: 'gorvald-prep-tempesta',
          text: "On connaît un pirate, Tempesta. Elle dit que la mer parle.",
          consequence: "Gorvald crache par-dessus bord. 'Tempesta est folle. Mais elle a raison.'",
          reputationChange: [{ faction: 'marine-royale', amount: 1 }]
        }
      ]
    },
    {
      id: 'gorvald-tempete',
      npcId: 'npc:ally:gorvald',
      trigger: 'tempête en mer',
      tone: 'inspirant',
      conditions: { customFlag: 'tempete-maritime' },
      lines: [
        "*au gouvernail dans la tempête, trempé mais inébranlable* TOUT LE MONDE AUX POSTES ! La mer veut nous tester — montrons-lui de quel bois on se chauffe !",
        "*le navire penche dangereusement* Elle est en colère, la vieille dame. Quelque chose l'a réveillée dans les profondeurs. On ne peut pas la combattre — on doit danser avec elle !",
        "ACCROCHEZ-VOUS ! *une vague immense se dresse* Par tous les dieux... je n'ai jamais vu une vague aussi haute de toute ma..."
      ],
      playerResponses: [
        {
          id: 'gorvald-tempete-magie',
          text: "*Utiliser la magie pour calmer les eaux*",
          consequence: "La magie a un effet partiel. Combinée aux talents de Gorvald, le navire tient.",
          reputationChange: [{ faction: 'marine-royale', amount: 3 }]
        },
        {
          id: 'gorvald-tempete-aider',
          text: "*Aider l'équipage à sécuriser les voiles et le pont*",
          consequence: "Force physique nécessaire. Travail d'équipe qui sauve le navire.",
          skillCheck: { skill: 'Athlétisme', dc: 14, success: "Votre force aide à sécuriser le mât principal. Le navire passe la tempête.", failure: "Vous êtes balayé par une vague mais rattrapé par un marin." }
        }
      ]
    },
    {
      id: 'gorvald-superstitions',
      npcId: 'npc:ally:gorvald',
      trigger: 'discussion sur les superstitions de marin',
      tone: 'mystérieux',
      conditions: { reputationMin: 3 },
      lines: [
        "*appuyé au bastingage, regard perdu sur l'horizon* Les terriens pensent que les superstitions de marin sont des bêtises. Pas de femme à bord, pas de sifflement, pas de banane...",
        "Mais la mer est vieille. Plus vieille que la terre. Et elle se souvient de choses que le monde a oubliées. Les superstitions sont des souvenirs déformés — des règles de survie codées par des générations de marins.",
        "'Pas de sifflement' — parce que certains sons attirent les créatures abyssales. 'Pas de banane' — parce qu'une banane est le fruit préféré des singes de mer, et vous ne voulez PAS de singes de mer sur votre pont."
      ],
      playerResponses: [
        {
          id: 'gorvald-super-croire',
          text: "Les singes de mer existent vraiment ?",
          consequence: "Gorvald montre une cicatrice. 'Celui-ci m'a mordu en 1342.'",
          reputationChange: [{ faction: 'marine-royale', amount: 1 }]
        },
        {
          id: 'gorvald-super-abysses',
          text: "Les créatures abyssales... c'est lié aux Sceaux ?",
          consequence: "Gorvald réfléchit. 'Maintenant que vous le dites... elles sont plus actives depuis quelques mois.'",
          unlocks: 'lien-abysses-sceaux'
        }
      ]
    },
    {
      id: 'gorvald-leviathan',
      npcId: 'npc:ally:gorvald',
      trigger: 'face au Léviathan',
      tone: 'solennel',
      conditions: { customFlag: 'attaque-leviathan' },
      lines: [
        "*blanc comme un linge, pour la première fois* C'est... c'est le Léviathan d'Azur. *sa voix tremble* Mon grand-père le cherchait. Mon père aussi. Ils ne l'ont jamais trouvé.",
        "Il fait trois fois la taille du navire. Nos canons ne le chatouillent même pas. Et il bloque le passage vers le Temple Englouti.",
        "*se reprend, mâchoire serrée* Mais aucune créature n'est invincible. Aucune. Il y a un point faible. Il y en a toujours un. Trouvez-le, et je manoeuvre le navire."
      ],
      playerResponses: [
        {
          id: 'gorvald-lev-combattre',
          text: "On ne recule pas. Manoeuvrez, on s'occupe du reste !",
          consequence: "Combat épique contre le Léviathan. Gorvald est brillant au gouvernail.",
          reputationChange: [{ faction: 'marine-royale', amount: 5 }]
        },
        {
          id: 'gorvald-lev-communiquer',
          text: "Attendez. Le Léviathan bloque le passage... volontairement ? C'est peut-être un gardien.",
          consequence: "Tentative de communication avec la créature. Approche diplomatique.",
          unlocks: 'communication-leviathan'
        }
      ]
    },
    {
      id: 'gorvald-hommage',
      npcId: 'npc:ally:gorvald',
      trigger: 'Gorvald rend hommage aux marins perdus',
      tone: 'triste',
      conditions: { customFlag: 'marins-perdus' },
      lines: [
        "*debout sur le pont, chapeau retiré, équipage en rang* Nous avons perdu trois hommes aujourd'hui. Hagen, qui racontait les meilleures histoires. Tomas, qui chantait faux mais ne s'arrêtait jamais. Et le petit Luuk, dix-sept ans. Son premier voyage.",
        "*jette trois couronnes d'or dans la mer* Par la tradition des marins, nous rendons à la mer ce qu'elle donne et ce qu'elle prend. Que le courant les porte vers des eaux calmes.",
        "*voix grave* On ne pleure pas un marin. On le célèbre. Ce soir, on boira en leur nom, on chantera leurs chansons, et demain, on continuera. Parce que c'est ce qu'ils voudraient."
      ],
      playerResponses: [
        {
          id: 'gorvald-hommage-silence',
          text: "*Observer un moment de silence avec l'équipage*",
          consequence: "Le silence est le plus beau des hommages. L'équipage vous respecte.",
          reputationChange: [{ faction: 'marine-royale', amount: 3 }]
        },
        {
          id: 'gorvald-hommage-chanter',
          text: "Chantons maintenant. Pas ce soir. Maintenant.",
          consequence: "L'équipage entame un chant marin. Les larmes coulent mais le moral tient.",
          reputationChange: [{ faction: 'marine-royale', amount: 4 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 19. ELENA LA CHANTEUSE - Barde prisonnière
// ============================================================================

const ELENA_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:ally:elena',
  npcName: 'Elena la Chanteuse',
  npcTitle: 'Barde légendaire, prisonnière du Temple Englouti',
  act: 3,
  dialogues: [
    {
      id: 'elena-appel',
      npcId: 'npc:ally:elena',
      trigger: 'entendre le chant d\'Elena dans le temple',
      tone: 'triste',
      conditions: { actNumber: 3, customFlag: 'temple-englouti' },
      lines: [
        "*un chant résonne dans les couloirs inondés, d'une beauté à fendre l'âme* '...et la lumière danse sur les vagues, souvenir d'un monde qui ne meurt jamais...'",
        "*la voix vient de derrière un mur de corail enchanté* S'il vous plaît... si vous m'entendez... je suis Elena. Je suis prisonnière ici depuis... *hésite* ...je ne sais plus combien de temps. Des mois ? Des années ?",
        "Le temple m'a capturée quand j'ai essayé de toucher le Sceau. Il m'a jugée indigne et m'a enfermée. Mais il m'a aussi montré... il m'a montré le Chant du Scellement. Le chant qui peut renforcer les Sceaux."
      ],
      playerResponses: [
        {
          id: 'elena-appel-liberer',
          text: "On va vous sortir de là. Comment briser cette barrière de corail ?",
          consequence: "Elena indique la méthode : un son pur à la fréquence exacte du corail.",
          questAdvanced: 'quest:temple-englouti',
          unlocks: 'methode-liberation-elena'
        },
        {
          id: 'elena-appel-chant',
          text: "Le Chant du Scellement ? Vous pouvez le chanter pour nous ?",
          consequence: "Elena chante un fragment. Les murs du temple vibrent. Le Sceau pulse.",
          unlocks: 'fragment-chant-scellement'
        },
        {
          id: 'elena-appel-piege',
          text: "Comment savoir que ce n'est pas un piège du temple ?",
          consequence: "Elena comprend la méfiance. 'Posez-moi une question que seul un humain connaîtrait.'",
          reputationChange: [{ faction: 'compagnons', amount: 1 }]
        }
      ]
    },
    {
      id: 'elena-gratitude',
      npcId: 'npc:ally:elena',
      trigger: 'Elena est libérée',
      tone: 'amical',
      conditions: { customFlag: 'elena-liberee' },
      lines: [
        "*cligne des yeux dans la lumière, amaigrie mais rayonnante* La lumière... oh, la lumière du soleil. J'avais oublié. *les larmes coulent*",
        "Merci. Le mot est si petit pour ce que vous avez fait. Enfermée dans ce temple, j'entendais les murmures du Sceau. Il souffre, vous savez. Comme un animal blessé.",
        "Je peux aider. Mon chant n'est pas une simple mélodie — c'est un canal, comme la magie divine. Le Chant du Scellement peut renforcer les barrières. Si vous me le permettez... je chanterai pour vous."
      ],
      playerResponses: [
        {
          id: 'elena-grat-accepter',
          text: "Votre chant est un don précieux. Bienvenue parmi nous.",
          consequence: "Elena rejoint le groupe. Sa voix est une arme contre les Ombres.",
          reputationChange: [{ faction: 'compagnons', amount: 3 }],
          unlocks: 'elena-compagnon'
        },
        {
          id: 'elena-grat-temple',
          text: "Le temple vous a enfermée mais aussi enseignée. Que vous a-t-il montré d'autre ?",
          consequence: "Elena révèle des secrets du temple et du Sceau marin.",
          unlocks: 'secrets-temple-englouti'
        }
      ]
    },
    {
      id: 'elena-chant-scellement',
      npcId: 'npc:ally:elena',
      trigger: 'Elena chante le Chant du Scellement',
      tone: 'solennel',
      conditions: { customFlag: 'ritual-sceau-marin' },
      lines: [
        "*ferme les yeux, inspire profondément* Le Chant a été créé lors du Premier Scellement. Ce n'est pas un sort — c'est un souvenir. Le souvenir de ce que le monde était avant les Ombres.",
        "Il raconte la lumière du premier matin, le bruit de la première pluie, le rire du premier enfant. Ce sont ces souvenirs qui nourrissent les Sceaux. L'espoir condensé en musique.",
        "*commence à chanter, et le monde semble s'arrêter* '...'",
        "*les murs du temple brillent, le Sceau pulse avec force, les ombres reculent en hurlant*"
      ],
      playerResponses: [
        {
          id: 'elena-chant-joindre',
          text: "*Joindre votre voix à la sienne, même maladroitement*",
          consequence: "Chaque voix renforce le Chant. Le Sceau brille plus fort.",
          reputationChange: [{ faction: 'compagnons', amount: 3 }],
          questAdvanced: 'quest:proteger-sceaux'
        },
        {
          id: 'elena-chant-proteger',
          text: "*Protéger Elena pendant qu'elle chante*",
          consequence: "Les Ombres attaquent celle qui renforce le Sceau. Défense critique.",
          unlocks: 'defense-rituel-elena'
        }
      ]
    },
    {
      id: 'elena-sacrifice',
      npcId: 'npc:ally:elena',
      trigger: 'Elena envisage le sacrifice',
      tone: 'triste',
      conditions: { customFlag: 'sceau-marin-critique' },
      lines: [
        "*voix douce mais ferme* Le Sceau est trop faible pour mon chant seul. Il faudrait... il faudrait que le chant devienne permanent. Qu'il résonne à jamais dans ces murs.",
        "Le temple me l'a montré quand j'étais prisonnière. Le Chant Éternel. Un barde donne sa voix — et sa vie — au Sceau. Le chant continue pour toujours, gardant le Sceau vivant.",
        "*sourit tristement* J'ai chanté toute ma vie. Quelle plus belle fin qu'un chant qui ne finit jamais ?"
      ],
      playerResponses: [
        {
          id: 'elena-sacrifice-refuser',
          text: "Non. On trouvera un autre moyen. Vous n'avez pas survécu à ce temple pour mourir ici.",
          consequence: "Elena hésite. Il faut trouver une alternative au sacrifice.",
          questStarted: 'quest:alternative-sacrifice-elena',
          reputationChange: [{ faction: 'compagnons', amount: 3 }]
        },
        {
          id: 'elena-sacrifice-accepter',
          text: "Si c'est votre choix... nous honorerons votre mémoire à chaque lever de soleil.",
          consequence: "Elena accomplit le Chant Éternel. Le Sceau marin est sauvé à jamais. Elena vit dans le chant.",
          unlocks: 'sacrifice-elena-accompli'
        },
        {
          id: 'elena-sacrifice-partager',
          text: "Et si plusieurs voix partageaient le fardeau ? Pas un sacrifice mais un choeur permanent ?",
          consequence: "Idée brillante. Possible avec assez de volontaires. Elena survit.",
          questStarted: 'quest:choeur-eternel',
          unlocks: 'plan-choeur-eternel'
        }
      ]
    },
    {
      id: 'elena-souvenir',
      npcId: 'npc:ally:elena',
      trigger: 'souvenir d\'Elena après les événements',
      tone: 'mélancolique',
      conditions: { customFlag: 'post-temple-englouti' },
      lines: [
        "*sur le pont du navire, regarde la mer* Savez-vous ce qui m'a maintenue en vie dans ce temple ? Les chansons. Pas les miennes — celles de ma mère.",
        "Elle chantait des berceuses sur un monde sans ombres. Je pensais que c'étaient des contes. Maintenant je sais qu'elle chantait le passé. Le vrai passé, avant la Première Chute.",
        "Un jour, quand tout sera fini, je chanterai ces berceuses pour des enfants qui n'auront jamais à connaître la peur. C'est ma promesse."
      ],
      playerResponses: [
        {
          id: 'elena-souvenir-chanter',
          text: "Chantez-nous une de ces berceuses. Maintenant.",
          consequence: "Elena chante. Le monde semble plus doux pendant quelques instants. Repos amélioré.",
          unlocks: 'berceuse-elena'
        },
        {
          id: 'elena-souvenir-promesse',
          text: "On y arrivera. Et ces enfants entendront votre voix.",
          consequence: "Elena sourit avec confiance. Son moral renforce celui de tout le groupe.",
          reputationChange: [{ faction: 'compagnons', amount: 2 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 20. GÉNÉRAL DE SIÈGE (ennemi)
// ============================================================================

const GENERAL_SIEGE_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:enemy:general-siege',
  npcName: 'Général Kravos',
  npcTitle: 'Commandant de l\'Armée d\'Ombre, Général du Siège',
  act: 3,
  dialogues: [
    {
      id: 'kravos-ultimatum',
      npcId: 'npc:enemy:general-siege',
      trigger: 'ultimatum avant le siège',
      tone: 'menaçant',
      conditions: { actNumber: 3, customFlag: 'siege-sol-aureus' },
      lines: [
        "*voix amplifiée par magie, debout devant une armée d'ombres* Défenseurs de Sol-Aureus ! Je suis le Général Kravos, Bras Armé de celui qui fut Enchaîné !",
        "Vous avez un choix. Ouvrez les portes, livrez-nous les Gardiens des Sceaux, et votre ville sera épargnée. Chaque homme, femme et enfant pourra partir librement.",
        "Ou résistez. Et ma horde passera sur vos murs comme la marée sur un château de sable. Vous avez jusqu'à l'aube. Choisissez."
      ],
      playerResponses: [
        {
          id: 'kravos-ultim-defier',
          text: "*Depuis les remparts* Sol-Aureus ne cède pas ! Viens nous chercher !",
          consequence: "Le siège commence. Le moral des défenseurs est boosté.",
          reputationChange: [{ faction: 'sol-aureus', amount: 5 }]
        },
        {
          id: 'kravos-ultim-negocier',
          text: "Kravos ! Parlons ! Seul à seul !",
          consequence: "Kravos est intrigué. Une rencontre au milieu du champ est possible.",
          unlocks: 'parley-kravos'
        },
        {
          id: 'kravos-ultim-temps',
          text: "*Gagner du temps* Nous... devons consulter le conseil de la ville.",
          consequence: "Kravos accorde un délai. Temps supplémentaire pour préparer les défenses.",
          unlocks: 'delai-siege'
        }
      ]
    },
    {
      id: 'kravos-moquerie',
      npcId: 'npc:enemy:general-siege',
      trigger: 'Kravos se moque pendant le siège',
      tone: 'sarcastique',
      conditions: { customFlag: 'siege-en-cours' },
      lines: [
        "*voix qui résonne depuis le camp ennemi* Troisième jour, défenseurs ! Comment va le moral ? La nourriture ? L'eau ?",
        "Savez-vous ce que j'ai fait avant de servir l'Enchaîné ? J'étais soldat. Comme vous. Comme vos gardes. J'ai défendu des murs. J'ai cru aux mêmes choses.",
        "Et puis j'ai VU. J'ai vu ce qui se cache derrière le voile. Et j'ai compris que se battre contre l'inévitable n'est pas du courage — c'est de la stupidité."
      ],
      playerResponses: [
        {
          id: 'kravos-moq-ignorer',
          text: "*Ignorer la provocation et renforcer les défenses*",
          consequence: "Le silence est une réponse forte. Kravos perd patience.",
          reputationChange: [{ faction: 'sol-aureus', amount: 1 }]
        },
        {
          id: 'kravos-moq-retorquer',
          text: "Un ancien soldat devenu esclave d'un fantôme. Qui est le stupide ?",
          consequence: "Kravos se tait. Touché. Le moral ennemi baisse légèrement.",
          reputationChange: [{ faction: 'sol-aureus', amount: 3 }]
        }
      ]
    },
    {
      id: 'kravos-peur',
      npcId: 'npc:enemy:general-siege',
      trigger: 'Kravos révèle sa peur',
      tone: 'nerveux',
      conditions: { customFlag: 'face-a-face-kravos' },
      lines: [
        "*seul face à vous, l'arrogance a disparu* Vous pensez que je fais ça par choix ? *montre des marques noires sur ses bras* Chaque jour, l'Ombre prend un peu plus de moi.",
        "Quand j'ai refusé un ordre — UNE fois — il m'a montré ce qu'il réserve à ceux qui désobéissent. Trois jours dans un espace entre les mondes. Trois jours qui ont duré une éternité.",
        "Je ne suis pas votre ennemi. Je suis un homme qui a trop peur pour être courageux. Et maintenant il est trop tard. *ses yeux sont humides de terreur*"
      ],
      playerResponses: [
        {
          id: 'kravos-peur-redemption',
          text: "Il n'est jamais trop tard, Kravos. Retournez votre armée contre Malachar.",
          consequence: "Kravos hésite. Test de Persuasion DC 20 — extrêmement difficile.",
          skillCheck: { skill: 'Persuasion', dc: 20, success: "Kravos tremble. 'Qu'il me détruise alors. Au moins je mourrai libre.' Retournement de l'armée.", failure: "Kravos secoue la tête. 'Vous ne comprenez pas. Il n'y a pas de liberté dans la mort qu'il donne.'" }
        },
        {
          id: 'kravos-peur-info',
          text: "Donnez-nous des informations sur Malachar. Aidez-nous à le vaincre, et vous serez libre.",
          consequence: "Kravos partage ce qu'il sait des plans de Malachar.",
          unlocks: 'plans-malachar-kravos'
        }
      ]
    },
    {
      id: 'kravos-defaite',
      npcId: 'npc:enemy:general-siege',
      trigger: 'Kravos est vaincu',
      tone: 'triste',
      conditions: { customFlag: 'siege-brise' },
      lines: [
        "*à genoux, armure brisée, les ombres quittent son corps* C'est... fini ? *regarde ses mains redevenir normales* Je sens... je sens le soleil. Depuis combien de temps...",
        "*les larmes coulent* Qu'ai-je fait ? Toutes ces villes, tous ces gens... j'étais là. J'ai donné les ordres. Ombre ou pas, c'était MA voix.",
        "Ne me laissez pas vivre avec ça. *tend son épée, garde en avant* Finissez-en."
      ],
      playerResponses: [
        {
          id: 'kravos-defaite-epargner',
          text: "Vivre avec est votre punition, Kravos. Utilisez le temps qu'il vous reste pour réparer.",
          consequence: "Kravos s'effondre. Prisonnier qui pourra aider dans les actes suivants.",
          reputationChange: [{ faction: 'sol-aureus', amount: 3 }],
          unlocks: 'kravos-prisonnier'
        },
        {
          id: 'kravos-defaite-justice',
          text: "Vous serez jugé par les gens de Sol-Aureus. Leur verdict sera le vôtre.",
          consequence: "Justice populaire. Résultat variable selon le moral de la ville.",
          reputationChange: [{ faction: 'sol-aureus', amount: 5 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 21. RÉFUGIÉE MARTA - Civile
// ============================================================================

const MARTA_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:neutral:marta',
  npcName: 'Marta',
  npcTitle: 'Réfugiée de Sol-Aureus, boulangère',
  act: 3,
  dialogues: [
    {
      id: 'marta-panique',
      npcId: 'npc:neutral:marta',
      trigger: 'pendant l\'évacuation',
      tone: 'nerveux',
      conditions: { actNumber: 3, customFlag: 'evacuation-sol-aureus' },
      lines: [
        "*serre deux enfants contre elle, un sac sur le dos* S'il vous plaît, est-ce que... est-ce que c'est sûr par là ? Les soldats disent d'aller au sud, mais au sud il y a la forêt et les loups et...",
        "*le plus petit enfant pleure* Chut, chut, mon coeur. Tout va bien. Maman est là. *sa propre voix tremble*",
        "Mon mari est resté. Il dit qu'il aide à barricader les portes. Il dit qu'il nous rejoint. Mais je sais... je sais ce que ça veut dire quand un homme dit 'partez devant'."
      ],
      playerResponses: [
        {
          id: 'marta-panique-rassurer',
          text: "La route du sud est sécurisée. Des gardes vous escortent. Vos enfants seront en sécurité.",
          consequence: "Marta se calme un peu. L'enfant aussi.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 2 }]
        },
        {
          id: 'marta-panique-mari',
          text: "Votre mari, comment s'appelle-t-il ? On va le chercher.",
          consequence: "Marta éclate en sanglots de gratitude. 'Piotr. Grand, barbe blonde, tablier de forgeron.'",
          questStarted: 'quest:retrouver-piotr',
          reputationChange: [{ faction: 'peuple-eldoria', amount: 3 }]
        },
        {
          id: 'marta-panique-escorter',
          text: "Venez avec nous. On vous escorte personnellement.",
          consequence: "Marta suit le groupe. Protection de civils en zone de combat.",
          unlocks: 'escorte-marta'
        }
      ]
    },
    {
      id: 'marta-gratitude',
      npcId: 'npc:neutral:marta',
      trigger: 'Marta retrouve son mari',
      tone: 'amical',
      conditions: { customFlag: 'piotr-retrouve' },
      lines: [
        "*court vers Piotr, les enfants crient de joie* PIOTR ! *l'embrasse* Mon idiot de mari, ne refais JAMAIS ça !",
        "*se tourne vers le groupe, yeux brillants* Vous... vous l'avez ramené. Je ne sais pas comment vous remercier. Tout ce que j'avais — ma boulangerie, ma maison — tout a brûlé. Mais ma famille est entière.",
        "Quand tout sera reconstruit... parce que tout sera reconstruit... venez manger du pain chez Marta. Le meilleur pain de Sol-Aureus. Gratuit. Pour toujours."
      ],
      playerResponses: [
        {
          id: 'marta-grat-sourire',
          text: "*Sourire* Le meilleur pain de Sol-Aureus ? On retiendra l'offre.",
          consequence: "Moment d'humanité au milieu du chaos. Moral boosté.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 3 }]
        },
        {
          id: 'marta-grat-securite',
          text: "Mettez votre famille en sécurité. Et restez-y cette fois.",
          consequence: "Marta acquiesce avec une détermination féroce.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 1 }]
        }
      ]
    },
    {
      id: 'marta-courage',
      npcId: 'npc:neutral:marta',
      trigger: 'Marta fait preuve de courage',
      tone: 'inspirant',
      conditions: { customFlag: 'siege-sol-aureus-phase-2' },
      lines: [
        "*devant un groupe de réfugiés terrifiés, debout sur une caisse* ÉCOUTEZ-MOI ! Je suis boulangère. Je ne sais pas me battre. Je ne sais pas lancer de sorts. Mais je sais une chose.",
        "J'ai perdu ma maison. Ma boutique. Tout ce pour quoi j'ai travaillé pendant vingt ans. ET JE SUIS ENCORE LÀ. Et vous aussi. Nous sommes ENCORE LÀ.",
        "Alors on va prendre ces seaux d'eau et on va éteindre ces feux. On va prendre ces bandages et soigner les blessés. On va nourrir les enfants et protéger les anciens. Parce que c'est ÇA, être de Sol-Aureus !"
      ],
      playerResponses: [
        {
          id: 'marta-courage-applaudir',
          text: "*Applaudir* Voilà l'esprit de Sol-Aureus ! Suivez Marta !",
          consequence: "Les réfugiés se mobilisent. La résistance civile s'organise.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 5 }, { faction: 'sol-aureus', amount: 3 }]
        },
        {
          id: 'marta-courage-organiser',
          text: "Marta a raison. Voici le plan : chaque groupe a une tâche.",
          consequence: "Organisation efficace des civils. Support logistique pour les combattants.",
          unlocks: 'resistance-civile-organisee'
        }
      ]
    },
    {
      id: 'marta-histoire',
      npcId: 'npc:neutral:marta',
      trigger: 'Marta raconte son histoire',
      tone: 'triste',
      conditions: { reputationMin: 5 },
      lines: [
        "*assise près d'un feu de camp, les enfants endormis* Ma grand-mère a vécu la Guerre des Cendres. Elle avait six ans. Elle ne parlait jamais de ce qu'elle avait vu. Sauf une fois.",
        "Elle m'a dit : 'Marta, le monde peut brûler et renaître. Les murs tombent et se reconstruisent. Mais ce qui ne se reconstruit pas, c'est une promesse brisée à un enfant. Ne promets jamais à un enfant que tout ira bien si tu ne peux pas le garantir.'",
        "Ce soir, mes enfants m'ont demandé si tout allait bien aller. Et je leur ai dit... *voix brisée* ...je leur ai dit que des héros veillaient sur nous. Alors s'il vous plaît... ne brisez pas la promesse d'une mère."
      ],
      playerResponses: [
        {
          id: 'marta-histoire-promesse',
          text: "Nous ferons tout ce qui est en notre pouvoir, Marta. Tout.",
          consequence: "Promesse sincère. Le poids de la responsabilité est immense.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 3 }]
        },
        {
          id: 'marta-histoire-silence',
          text: "*Poser une main sur son épaule, pas de mots*",
          consequence: "Parfois les gestes valent mieux que les promesses. Marta comprend.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 2 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 22. MASQUE-GRIS - Agent du Cercle
// ============================================================================

const MASQUE_GRIS_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:enemy:masque-gris',
  npcName: 'Masque-Gris',
  npcTitle: 'Agent supérieur du Cercle d\'Ombre',
  act: 3,
  dialogues: [
    {
      id: 'masquegris-proposition',
      npcId: 'npc:enemy:masque-gris',
      trigger: 'contact initié par Masque-Gris',
      tone: 'mystérieux',
      conditions: { actNumber: 3 },
      lines: [
        "*apparaît dans un miroir, masque gris sans traits* Ne cherchez pas à me trouver. Ce n'est pas une rencontre — c'est une transmission.",
        "Le Cercle d'Ombre n'est pas ce que vous croyez. Nous ne servons pas Malachar — nous le CONTENONS. Depuis des siècles, le Cercle maintient l'équilibre entre les forces. Les Sceaux ne sont qu'une partie du puzzle.",
        "Je vous propose une alliance. Pas l'amitié — l'efficacité. Nous avons des ressources que vous n'imaginez pas. En échange, nous voulons un Sceau. Un seul. Celui de votre choix. Nous le protégerons mieux que vous."
      ],
      playerResponses: [
        {
          id: 'masquegris-prop-ecouter',
          text: "Continuez. Quelles preuves avez-vous de cette 'containment' ?",
          consequence: "Masque-Gris fournit des informations partiellement vérifiables.",
          unlocks: 'dossier-cercle-containment'
        },
        {
          id: 'masquegris-prop-refuser',
          text: "Le Cercle a kidnappé des innocents, corrompu des gardes, semé le chaos. Non.",
          consequence: "Masque-Gris incline la tête. 'Les dommages collatéraux d'une guerre secrète. Regrettable.'",
          reputationChange: [{ faction: 'cercle-ombre', amount: -3 }]
        },
        {
          id: 'masquegris-prop-piege',
          text: "Et si c'était un piège pour nous affaiblir ?",
          consequence: "Masque-Gris ne se vexe pas. 'La méfiance est sage. Vérifiez.'",
          unlocks: 'verification-cercle'
        }
      ]
    },
    {
      id: 'masquegris-test',
      npcId: 'npc:enemy:masque-gris',
      trigger: 'test imposé par Masque-Gris',
      tone: 'menaçant',
      conditions: { previousDialogue: 'masquegris-proposition' },
      lines: [
        "Un test de bonne foi. Des deux côtés. Demain, une caravane du Cercle transportera un artefact crucial vers le Sceau du Nord. Je vous donne l'itinéraire.",
        "Si vous l'interceptez et que l'artefact est ce que je dis — un catalyseur de purification — alors vous saurez que je dis vrai.",
        "Si vous détruisez la caravane et le catalyseur avec... eh bien, vous aurez prouvé que vous êtes aussi aveugles que Malachar le pense."
      ],
      playerResponses: [
        {
          id: 'masquegris-test-accepter',
          text: "Donnez l'itinéraire. On vérifiera par nous-mêmes.",
          consequence: "Mission d'interception. L'artefact pourrait être réel ou un piège.",
          questStarted: 'quest:caravane-cercle',
          unlocks: 'itineraire-caravane'
        },
        {
          id: 'masquegris-test-conditions',
          text: "On intercepte la caravane. Mais vous nous donnez aussi un prisonnier en signe de bonne foi.",
          consequence: "Masque-Gris accepte. Un prisonnier est libéré.",
          questStarted: 'quest:caravane-cercle',
          unlocks: 'prisonnier-libere-cercle'
        }
      ]
    },
    {
      id: 'masquegris-info-service',
      npcId: 'npc:enemy:masque-gris',
      trigger: 'échange d\'informations',
      tone: 'confidentiel',
      conditions: { reputationMin: 3 },
      lines: [
        "Vous voulez des informations sur Malachar ? Voici ce que je sais, gratuitement : il n'est pas encore éveillé. Ce que vous combattez — les ombres, les créatures — ce sont des rêves. Les cauchemars d'un être endormi.",
        "Quand il se RÉVEILLERA... les ombres que vous avez combattues ressembleront à des chatons joueurs en comparaison.",
        "Voilà pourquoi les Sceaux sont essentiels. Pas pour l'emprisonner — il est déjà trop tard pour ça. Mais pour le RALENTIR. Chaque Sceau intact nous donne du temps."
      ],
      playerResponses: [
        {
          id: 'masquegris-info-reveiller',
          text: "Comment empêcher le réveil complet ?",
          consequence: "Masque-Gris révèle un plan partiel. Information contre service.",
          unlocks: 'plan-anti-reveil'
        },
        {
          id: 'masquegris-info-alliance',
          text: "Si la menace est aussi grave, pourquoi ne pas travailler ensemble ouvertement ?",
          consequence: "Masque-Gris explique les divisions internes du Cercle.",
          unlocks: 'politique-interne-cercle'
        }
      ]
    },
    {
      id: 'masquegris-menace',
      npcId: 'npc:enemy:masque-gris',
      trigger: 'Masque-Gris menace voilement',
      tone: 'menaçant',
      conditions: { customFlag: 'conflit-cercle' },
      lines: [
        "J'avais espéré une approche civilisée. Mais vous insistez sur la voie... disons, directe.",
        "Sachez ceci : le Cercle a survécu mille ans. Nous avons vu des héros, des rois, des empires. Tous sont tombés. Nous sommes toujours là.",
        "Ne devenez pas un obstacle, Gardien. Les obstacles, dans notre histoire, ont tendance à disparaître. Pas violemment — ça attire l'attention. Juste... progressivement. Jusqu'à ce que personne ne se souvienne qu'ils existaient."
      ],
      playerResponses: [
        {
          id: 'masquegris-menace-defier',
          text: "Mille ans et vous n'avez toujours pas arrêté Malachar. Peut-être qu'il est temps de changer de méthode.",
          consequence: "Masque-Gris est touché. Un argument qui fait réfléchir.",
          reputationChange: [{ faction: 'cercle-ombre', amount: 1 }]
        },
        {
          id: 'masquegris-menace-froid',
          text: "Les menaces, je les collectionne. Vous voulez voir ma collection ?",
          consequence: "Masque-Gris rit. 'Vous me plaisez. C'est dommage.'",
          reputationChange: [{ faction: 'cercle-ombre', amount: -1 }]
        }
      ]
    },
    {
      id: 'masquegris-respect',
      npcId: 'npc:enemy:masque-gris',
      trigger: 'Masque-Gris montre du respect',
      tone: 'respectueux',
      conditions: { reputationMin: 8 },
      lines: [
        "*retire partiellement son masque — on voit un menton humain, une cicatrice* En mille ans, le Cercle a vu trois groupes capables de changer le cours de l'histoire. Vous êtes le quatrième.",
        "Si nous survivons tous à ce qui vient... je vous révélerai mon vrai visage. C'est la plus grande marque de respect que le Cercle puisse accorder.",
        "En attendant, prenez ceci. *glisse un médaillon sous la porte* Si vous avez besoin du Cercle — en dernier recours — brisez-le. Nous viendrons."
      ],
      playerResponses: [
        {
          id: 'masquegris-respect-accepter',
          text: "*Prendre le médaillon* En dernier recours.",
          consequence: "Médaillon du Cercle obtenu. Joker utilisable une fois.",
          itemReceived: 'medaillon-cercle-ombre',
          reputationChange: [{ faction: 'cercle-ombre', amount: 5 }]
        },
        {
          id: 'masquegris-respect-refuser',
          text: "Gardez votre médaillon. On ne doit rien au Cercle.",
          consequence: "Masque-Gris incline la tête. 'L'honneur. Rare. Et potentiellement fatal.'",
          reputationChange: [{ faction: 'cercle-ombre', amount: 2 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 23. THALASSOR - Esprit marin ancien
// ============================================================================

const THALASSOR_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:neutral:thalassor',
  npcName: 'Thalassor',
  npcTitle: 'Esprit marin ancien, gardien des profondeurs',
  act: 3,
  dialogues: [
    {
      id: 'thalassor-rage',
      npcId: 'npc:neutral:thalassor',
      trigger: 'rencontre avec Thalassor dans le temple englouti',
      tone: 'colérique',
      conditions: { actNumber: 3, customFlag: 'temple-englouti-profondeurs' },
      lines: [
        "*une forme immense d'eau et de lumière, yeux comme des abysses* MORTELS ! *la voix fait trembler les murs* Vous osez profaner ce sanctuaire ? Mille ans je garde ce lieu ! Mille ans de solitude et de RAGE !",
        "VOS ancêtres m'ont ENCHAÎNÉ ici ! Lié au Sceau comme un chien à sa niche ! 'Garde le Sceau, Thalassor. Protège-le, Thalassor.' Et quand j'ai demandé : 'Jusqu'à quand ?' — PERSONNE n'a répondu !",
        "Le Sceau se fissure et les Ombres s'infiltrent, et je suis SEUL à les repousser depuis des SIÈCLES ! Alors ne me parlez pas de devoir !"
      ],
      playerResponses: [
        {
          id: 'thalassor-rage-calmer',
          text: "Thalassor, nous ne sommes pas vos ennemis. Nous sommes venus AIDER.",
          consequence: "Thalassor s'arrête. 'Aider ?' Le concept semble étranger.",
          nextDialogue: 'thalassor-souffrance'
        },
        {
          id: 'thalassor-rage-comprendre',
          text: "Mille ans seul, à protéger un monde ingrat. Votre colère est légitime.",
          consequence: "Thalassor se calme légèrement, surpris par l'empathie.",
          reputationChange: [{ faction: 'esprits-anciens', amount: 3 }],
          nextDialogue: 'thalassor-souffrance'
        },
        {
          id: 'thalassor-rage-force',
          text: "Nous pouvons vous libérer, Thalassor. Mais d'abord, le Sceau doit être renforcé.",
          consequence: "Thalassor est tiraillé entre l'espoir et la méfiance.",
          nextDialogue: 'thalassor-pacification'
        }
      ]
    },
    {
      id: 'thalassor-souffrance',
      npcId: 'npc:neutral:thalassor',
      trigger: 'Thalassor exprime sa souffrance',
      tone: 'triste',
      conditions: { previousDialogue: 'thalassor-rage' },
      lines: [
        "*se réduit à une forme plus petite, presque humaine, voix de vague mourante* Je me souviens de la mer. De la vraie mer. Pas ces murs de pierre. La mer libre, le vent, les étoiles reflétées sur l'eau.",
        "J'étais un esprit des courants. Je guidais les baleines vers les eaux chaudes. Je berçais les marins dans la tempête. J'étais... libre.",
        "Puis les champions sont venus. 'Le monde a besoin de toi, Thalassor.' Et le monde m'a oublié. Pas une prière en mille ans. Pas un merci. Juste le silence et les Ombres."
      ],
      playerResponses: [
        {
          id: 'thalassor-soufr-promesse',
          text: "Quand les Sceaux seront renforcés, nous trouverons un moyen de vous libérer. Vous avez ma parole.",
          consequence: "Thalassor sonde votre sincérité. La promesse l'apaise.",
          reputationChange: [{ faction: 'esprits-anciens', amount: 5 }],
          nextDialogue: 'thalassor-pacification'
        },
        {
          id: 'thalassor-soufr-chant',
          text: "Elena, chantez pour lui. Qu'il entende la mer à travers votre voix.",
          consequence: "Le chant d'Elena résonne. Thalassor pleure des larmes d'océan.",
          reputationChange: [{ faction: 'esprits-anciens', amount: 5 }],
          unlocks: 'lien-elena-thalassor'
        }
      ]
    },
    {
      id: 'thalassor-pacification',
      npcId: 'npc:neutral:thalassor',
      trigger: 'pacification de Thalassor',
      tone: 'solennel',
      conditions: { reputationMin: 5 },
      lines: [
        "*forme apaisée, lumière bleue douce* Vous êtes... différents. Les anciens champions avaient du pouvoir mais pas de coeur. Vous avez les deux.",
        "Très bien. Je garderai le Sceau. Pas parce que j'y suis contraint — parce que je CHOISIS de le faire. C'est... nouveau. Le choix. Ça change tout.",
        "En échange, prenez ma bénédiction. *touche le front de chaque membre du groupe* Les eaux vous porteront désormais. Aucune tempête ne pourra vous noyer. Aucune créature marine ne vous attaquera. Vous êtes enfants de Thalassor."
      ],
      playerResponses: [
        {
          id: 'thalassor-pacif-merci',
          text: "Merci, Thalassor. Le monde se souviendra de vous cette fois.",
          consequence: "Bénédiction de Thalassor reçue. Protection marine permanente.",
          reputationChange: [{ faction: 'esprits-anciens', amount: 10 }],
          unlocks: 'benediction-thalassor'
        },
        {
          id: 'thalassor-pacif-aide',
          text: "Combattez avec nous contre les Ombres dans le temple. Ensemble.",
          consequence: "Thalassor accepte. Allié dévastateur dans le temple englouti.",
          unlocks: 'thalassor-allie-combat'
        }
      ]
    },
    {
      id: 'thalassor-benediction',
      npcId: 'npc:neutral:thalassor',
      trigger: 'bénédiction finale de Thalassor',
      tone: 'amical',
      conditions: { customFlag: 'depart-temple-englouti' },
      lines: [
        "*forme scintillante à la sortie du temple* Partez, enfants du rivage. La mer vous sourit aujourd'hui.",
        "Si un jour vous avez besoin de moi... chantez pour la mer. N'importe quel chant. Je vous entendrai.",
        "*se dissout en gouttelettes de lumière qui retournent dans l'océan*"
      ],
      playerResponses: [
        {
          id: 'thalassor-bened-adieu',
          text: "Au revoir, Thalassor. Jusqu'à ce que les vagues nous réunissent.",
          consequence: "Thalassor comme allié permanent en mer. Le Sceau marin est renforcé.",
          reputationChange: [{ faction: 'esprits-anciens', amount: 3 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 24. GRAND PRÊTRE ALDUIN - Chef du Temple
// ============================================================================

const ALDUIN_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:ally:alduin',
  npcName: 'Grand Prêtre Alduin',
  npcTitle: 'Chef du Temple de Solarius, gardien de la foi',
  act: 3,
  dialogues: [
    {
      id: 'alduin-foi',
      npcId: 'npc:ally:alduin',
      trigger: 'audience avec le Grand Prêtre',
      tone: 'solennel',
      conditions: { actNumber: 3 },
      lines: [
        "*vieil homme d'une présence imposante, yeux dorés qui semblent voir au-delà* La lumière de Solarius brille en vous, Gardiens. Je la vois aussi clairement que le soleil à midi.",
        "Je suis Alduin, et j'ai consacré soixante ans de ma vie à servir la lumière. J'ai vu des miracles et des horreurs. J'ai guéri des mourants et enterré des innocents.",
        "Et en soixante ans, je n'ai jamais eu aussi peur qu'aujourd'hui. Non pas pour moi — pour le monde. Car si la lumière faiblit... ce n'est pas parce que Solarius nous abandonne. C'est parce que l'obscurité est plus forte qu'elle ne l'a jamais été."
      ],
      playerResponses: [
        {
          id: 'alduin-foi-aide',
          text: "Nous avons besoin de la puissance du Temple, Grand Prêtre.",
          consequence: "Alduin offre les ressources sacrées du Temple.",
          unlocks: 'ressources-temple-solarius',
          reputationChange: [{ faction: 'temple-solarius', amount: 3 }]
        },
        {
          id: 'alduin-foi-aldwin',
          text: "Frère Aldwin nous a parlé du Sacrifice de l'Aube. Est-ce réel ?",
          consequence: "Le visage d'Alduin se ferme. 'Aldwin n'aurait pas dû... mais oui. C'est réel.'",
          unlocks: 'confirmation-sacrifice-aube'
        },
        {
          id: 'alduin-foi-sceaux',
          text: "Le lien entre Solarius et les Sceaux s'affaiblit. Que pouvez-vous faire ?",
          consequence: "Alduin révèle un rituel ancien de reconnexion divine.",
          unlocks: 'rituel-reconnexion-solarius'
        }
      ]
    },
    {
      id: 'alduin-doute',
      npcId: 'npc:ally:alduin',
      trigger: 'Alduin doute',
      tone: 'triste',
      conditions: { reputationMin: 6, customFlag: 'pertes-graves' },
      lines: [
        "*seul dans le sanctuaire, les cierges s'éteignent un par un* Soixante ans... soixante ans de prières. Et pour quoi ?",
        "J'ai prié pour la paix — la guerre est venue. J'ai prié pour la guérison — mes fidèles meurent. J'ai prié pour la lumière — et les ténèbres s'épaississent.",
        "Aldwin me regarde avec espoir. Les prêtres attendent mes paroles. Le peuple veut ma bénédiction. Mais comment puis-je bénir quand même moi... quand même moi je ne suis plus sûr que quelqu'un écoute ?"
      ],
      playerResponses: [
        {
          id: 'alduin-doute-humain',
          text: "Les gens n'ont pas besoin d'un dieu, Grand Prêtre. Ils ont besoin de VOUS.",
          consequence: "Alduin est frappé par cette vérité simple. Un recentrage.",
          reputationChange: [{ faction: 'temple-solarius', amount: 5 }]
        },
        {
          id: 'alduin-doute-solarius',
          text: "Solarius ne vous a pas abandonné. Vous SENTEZ les Sceaux s'affaiblir. C'est la preuve du lien.",
          consequence: "Alduin relève la tête. L'argument théologique le touche profondément.",
          reputationChange: [{ faction: 'temple-solarius', amount: 4 }]
        }
      ]
    },
    {
      id: 'alduin-priere',
      npcId: 'npc:ally:alduin',
      trigger: 'prière collective avant la bataille',
      tone: 'inspirant',
      conditions: { customFlag: 'veille-bataille-finale' },
      lines: [
        "*devant l'assemblée entière, combattants et civils mêlés* Ce soir, nous prions. Pas pour la victoire — car la victoire n'est pas entre les mains des dieux. Elle est entre les vôtres.",
        "Nous prions pour le courage. Le courage de se lever quand tout pousse à s'agenouiller. Le courage de regarder l'obscurité et de dire : 'Pas aujourd'hui.'",
        "Solarius, si tu m'entends encore... ne regarde pas ce monde avec pitié. Regarde-le avec fierté. Car tes enfants — TOUS tes enfants — se lèvent pour se battre."
      ],
      playerResponses: [
        {
          id: 'alduin-priere-joindre',
          text: "*Joindre les mains avec l'assemblée*",
          consequence: "Prière collective. Lumière divine palpable. Bonus au moral de tous.",
          reputationChange: [{ faction: 'temple-solarius', amount: 3 }]
        }
      ]
    },
    {
      id: 'alduin-sacrifice',
      npcId: 'npc:ally:alduin',
      trigger: 'sacrifice héroïque d\'Alduin',
      tone: 'solennel',
      conditions: { customFlag: 'breche-dans-les-defenses' },
      lines: [
        "*se lève, enlève sa robe de cérémonie pour révéler l'armure dorée en dessous* Il y a soixante ans, j'ai fait un voeu. Protéger la lumière jusqu'à mon dernier souffle.",
        "Aujourd'hui, je tiens ce voeu. *marche vers la brèche dans les défenses, lumière irradiant de lui* Aldwin ! *appelle son protégé* Prends ma place. Tu es prêt. Tu l'as toujours été.",
        "*se tourne vers les Ombres, sourire serein* Solarius... je viens à toi. Mais pas seul. J'emmène ces ténèbres AVEC moi."
      ],
      playerResponses: [
        {
          id: 'alduin-sacrifice-arreter',
          text: "ALDUIN, NON ! Il y a un autre moyen !",
          consequence: "Alduin se retourne. 'Lequel ?' Test de Persuasion DC 22 pour proposer une alternative.",
          skillCheck: { skill: 'Persuasion', dc: 22, success: "Vous proposez une alternative. Alduin hésite... et recule. Sauvé.", failure: "Alduin sourit. 'Il n'y en a pas. Mais merci d'avoir essayé.' Il avance dans la lumière." }
        },
        {
          id: 'alduin-sacrifice-honorer',
          text: "*S'agenouiller* Que Solarius vous accueille, Grand Prêtre.",
          consequence: "Alduin accomplit le Sacrifice de l'Aube. Lumière aveuglante. Les Ombres hurlent.",
          unlocks: 'sacrifice-alduin-accompli'
        }
      ]
    },
    {
      id: 'alduin-dernieres-paroles',
      npcId: 'npc:ally:alduin',
      trigger: 'dernières paroles d\'Alduin',
      tone: 'amical',
      conditions: { customFlag: 'alduin-sacrifice-en-cours' },
      lines: [
        "*baigné de lumière, voix qui porte comme une cathédrale* Écoutez... je l'entends enfin. Solarius. Il n'était pas parti. Il attendait que je sois prêt.",
        "Dites à Aldwin... dites-lui que sa foi est la plus forte de toutes. Parce qu'elle a survécu au doute.",
        "*la lumière s'intensifie* C'est... beau. Si beau. *sourire d'extase* Oh mes amis... ne pleurez pas. Je vais danser avec le soleil."
      ],
      playerResponses: [
        {
          id: 'alduin-dernier-silence',
          text: "*Silence respectueux. Les larmes coulent. La lumière emporte tout.*",
          consequence: "Le sacrifice d'Alduin scelle la brèche. Les Ombres sont repoussées. Le prix est immense.",
          reputationChange: [{ faction: 'temple-solarius', amount: 10 }],
          unlocks: 'heritage-alduin'
        }
      ]
    }
  ]
};

// ============================================================================
// 25. MALACHAR (APPARITION) - L'Archon principal
// ============================================================================

const MALACHAR_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:enemy:malachar',
  npcName: 'Malachar',
  npcTitle: 'L\'Archon Enchaîné, le Premier Ombre',
  act: 3,
  dialogues: [
    {
      id: 'malachar-avertissement',
      npcId: 'npc:enemy:malachar',
      trigger: 'première apparition de Malachar',
      tone: 'mystérieux',
      conditions: { actNumber: 3, customFlag: 'sceau-affaibli' },
      lines: [
        "*une ombre se matérialise dans un miroir, une surface d'eau, un reflet — la voix est partout et nulle part* Je vous observe depuis longtemps, petits Gardiens. Depuis que vous avez touché le premier Sceau.",
        "Vous êtes courageux. Futiles, mais courageux. Comme des fourmis qui essaient de retenir un fleuve avec des grains de sable. Admirable, vraiment.",
        "Mais permettez-moi une question : avez-vous demandé AUX SCEAUX ce qu'ils veulent ? Non ? Peut-être devriez-vous. Car ils souffrent. Et moi seul peux les libérer de leur souffrance."
      ],
      playerResponses: [
        {
          id: 'malachar-avert-defier',
          text: "Tes mots ne sont que du poison, Malachar. Retourne dans tes chaînes.",
          consequence: "L'ombre rit. Un rire qui fait trembler les murs. 'MES chaînes ? Oh, petit mortel...'",
          reputationChange: [{ faction: 'compagnons', amount: 2 }]
        },
        {
          id: 'malachar-avert-ecouter',
          text: "Que veux-tu dire par 'les Sceaux souffrent' ?",
          consequence: "Malachar révèle un fragment de vérité mêlé de mensonges.",
          unlocks: 'perspective-malachar-sceaux'
        },
        {
          id: 'malachar-avert-proteger',
          text: "*Résister à l'influence* (Sagesse DC 16)",
          consequence: "Test de Sagesse pour résister à la manipulation psychique.",
          skillCheck: { skill: 'Sagesse', dc: 16, success: "L'influence de Malachar glisse sur vous comme l'eau sur la pierre.", failure: "Un doute s'infiltre. Les Sceaux souffrent-ils vraiment ?" }
        }
      ]
    },
    {
      id: 'malachar-moquerie',
      npcId: 'npc:enemy:malachar',
      trigger: 'Malachar se moque après un échec',
      tone: 'sarcastique',
      conditions: { customFlag: 'echec-mission-majeure' },
      lines: [
        "*apparaît dans les ombres du camp, comme un cauchemar éveillé* Oh, quel dommage. Vraiment. Je suis navré de votre... mésaventure.",
        "Combien de Sceaux reste-t-il maintenant ? Comptez sur vos doigts — oh, attendez. Bientôt vous n'en aurez plus assez.",
        "Vous savez ce qui est tragique ? Isolde — VOTRE héroïne — elle m'a offert exactement la même résistance. Pendant vingt ans. Et à la fin, elle a quand même dû négocier. Parce que la force seule ne suffit JAMAIS contre l'inévitable."
      ],
      playerResponses: [
        {
          id: 'malachar-moq-stoique',
          text: "*Ignorer la provocation*",
          consequence: "Le silence agace Malachar. Il disparaît.",
          reputationChange: [{ faction: 'compagnons', amount: 1 }]
        },
        {
          id: 'malachar-moq-isolde',
          text: "Isolde t'a enchaîné pendant mille ans. Pas mal pour une mortelle.",
          consequence: "Silence. Touché. L'ombre vacille imperceptiblement.",
          reputationChange: [{ faction: 'compagnons', amount: 3 }]
        },
        {
          id: 'malachar-moq-negocier',
          text: "Tu parles de négociation. Qu'est-ce que tu proposes ?",
          consequence: "DANGEREUX. Malachar sourit. C'est exactement ce qu'il voulait.",
          nextDialogue: 'malachar-treve'
        }
      ]
    },
    {
      id: 'malachar-treve',
      npcId: 'npc:enemy:malachar',
      trigger: 'Malachar propose une trêve',
      tone: 'conspirateur',
      conditions: { actNumber: 3, customFlag: 'malachar-propose-treve' },
      lines: [
        "*forme plus définie, presque beau, voix de velours* Enfin. De la raison. Asseyez-vous — métaphoriquement, bien sûr.",
        "Voici ma proposition. Les Sceaux me retiennent, oui. Mais ils retiennent aussi autre chose. Quelque chose de PIRE que moi. Les autres Enchaînés. Les vrais monstres.",
        "Si les Sceaux cèdent — et ils CÉDERONT, avec ou sans vous — je serai libre. Mais EUX aussi. Et contrairement à moi, ils ne veulent pas négocier. Ils veulent DÉTRUIRE.",
        "Aidez-moi à me libérer SEUL, en gardant les autres enchaînés. En échange, je quitte ce monde. Définitivement. Pas de destruction, pas de conquête. Juste la liberté."
      ],
      playerResponses: [
        {
          id: 'malachar-treve-refuser',
          text: "Chaque mot qui sort de ta bouche est un piège, Malachar. La réponse est non.",
          consequence: "Malachar hausse les épaules. 'J'ai essayé la voie pacifique. Souvenez-vous-en.'",
          reputationChange: [{ faction: 'compagnons', amount: 3 }]
        },
        {
          id: 'malachar-treve-verifier',
          text: "Les 'autres Enchaînés'. Prouve-le. Montre-nous.",
          consequence: "Malachar montre une vision horrifiante de ce qui se cache derrière les Sceaux.",
          unlocks: 'vision-autres-enchaines',
          skillCheck: { skill: 'Sagesse', dc: 18, success: "La vision est partiellement vraie. Mais les détails sont manipulés.", failure: "La vision est terrifiante et convaincante. Doute installé." }
        },
        {
          id: 'malachar-treve-accepter',
          text: "Et si tu mens ? Et si tu ne pars pas ?",
          consequence: "Malachar rit. 'La confiance, petit mortel, est un luxe que ni vous ni moi ne pouvons nous permettre. Mais les alternatives...'",
          unlocks: 'dilemme-malachar'
        }
      ]
    },
    {
      id: 'malachar-monologue-villain',
      npcId: 'npc:enemy:malachar',
      trigger: 'monologue de villain de Malachar',
      tone: 'solennel',
      conditions: { actNumber: 3, customFlag: 'confrontation-malachar-finale-acte3' },
      lines: [
        "*forme complète, majestueuse et terrifiante, ombre couronnée de lumière noire* Vous voulez savoir qui je suis ? Pas le monstre de vos contes. Pas le mal absolu de vos prières.",
        "J'étais comme vous. Exactement. Comme. Vous. Un héros. Un gardien. J'ai combattu les ténèbres de MON époque. J'ai sacrifié tout ce que j'aimais pour sauver mon monde. Et quand j'ai réussi...",
        "...quand j'ai regardé le monde sauvé, vidé de tout ce qui comptait pour moi, j'ai compris. Le monde ne vaut pas le sacrifice. Le monde OUBLIE. Le monde prend vos héros, les consomme, et passe au suivant.",
        "Alors j'ai choisi de ne plus être consommé. J'ai pris le pouvoir qu'on me demandait de donner. Et on m'a appelé monstre. On m'a ENCHAÎNÉ. Moi. Celui qui les avait SAUVÉS.",
        "Vous comprenez maintenant ? Ce n'est pas une guerre entre le bien et le mal. C'est une guerre entre ceux qui acceptent d'être sacrifiés... et ceux qui refusent."
      ],
      playerResponses: [
        {
          id: 'malachar-mono-compassion',
          text: "Je suis désolé pour ce qui t'est arrivé, Malachar. Mais ta douleur ne justifie pas la nôtre.",
          consequence: "Malachar est silencieux un long moment. 'Non. Non, elle ne le justifie pas. Mais elle l'explique.'",
          reputationChange: [{ faction: 'compagnons', amount: 5 }],
          unlocks: 'humanite-malachar'
        },
        {
          id: 'malachar-mono-different',
          text: "Nous sommes différents. Nous ne finirons pas comme toi.",
          consequence: "Malachar sourit avec une tristesse infinie. 'C'est ce que je disais aussi.'",
          reputationChange: [{ faction: 'compagnons', amount: 3 }]
        },
        {
          id: 'malachar-mono-combattre',
          text: "Belle histoire. Mais tu restes un tyran qui menace des innocents. En garde.",
          consequence: "Malachar se redresse. 'Très bien. Montrez-moi ce que vos sacrifices valent.'",
          unlocks: 'combat-malachar-acte3'
        },
        {
          id: 'malachar-mono-troisieme-voie',
          text: "Et s'il existait une troisième voie ? Ni sacrifice, ni tyrannie ?",
          consequence: "Pour la première fois, Malachar semble sincèrement intéressé. 'Montrez-moi.'",
          unlocks: 'troisieme-voie-malachar'
        }
      ]
    }
  ]
};

// ============================================================================
// EXPORT
// ============================================================================

export const NPC_DIALOGUES_ACT3: NPCDialogueTree[] = [
  SERAPHINA_DIALOGUES,
  FAENOR_DIALOGUES,
  GORVALD_DIALOGUES,
  ELENA_DIALOGUES,
  GENERAL_SIEGE_DIALOGUES,
  MARTA_DIALOGUES,
  MASQUE_GRIS_DIALOGUES,
  THALASSOR_DIALOGUES,
  ALDUIN_DIALOGUES,
  MALACHAR_DIALOGUES
];
