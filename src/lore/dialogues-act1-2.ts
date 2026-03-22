/**
 * AETHELGARD - Arbres de Dialogues Actes 1 & 2
 * 15 PNJs majeurs avec dialogues profonds et ramifiés
 * Chaque dialogue possède des conditions, tons, et conséquences
 */

// ============================================================================
// INTERFACES
// ============================================================================

export type DialogueTone =
  | 'amical'
  | 'menaçant'
  | 'triste'
  | 'mystérieux'
  | 'solennel'
  | 'jovial'
  | 'nerveux'
  | 'colérique'
  | 'suppliant'
  | 'sarcastique'
  | 'conspirateur'
  | 'inspirant'
  | 'ivre'
  | 'respectueux'
  | 'méfiant'
  | 'séducteur'
  | 'désespéré'
  | 'confidentiel'
  | 'bourru'
  | 'mélancolique';

export interface DialogueCondition {
  questState?: string;
  questCompleted?: string[];
  reputationMin?: number;
  reputationMax?: number;
  factionReputation?: { faction: string; min: number };
  actNumber?: number;
  timeOfDay?: 'jour' | 'nuit' | 'aube' | 'crépuscule';
  hasItem?: string;
  previousDialogue?: string;
  playerChoice?: string;
  customFlag?: string;
}

export interface PlayerResponseOption {
  id: string;
  text: string;
  consequence: string;
  reputationChange?: { faction: string; amount: number }[];
  unlocks?: string;
  nextDialogue?: string;
  skillCheck?: { skill: string; dc: number; success: string; failure: string };
  itemGiven?: string;
  itemReceived?: string;
  questStarted?: string;
  questAdvanced?: string;
}

export interface DialogueEntry {
  id: string;
  npcId: string;
  trigger: string;
  tone: DialogueTone;
  conditions: DialogueCondition;
  lines: string[];
  playerResponses: PlayerResponseOption[];
}

export interface NPCDialogueTree {
  npcId: string;
  npcName: string;
  npcTitle: string;
  act: number;
  dialogues: DialogueEntry[];
}

// ============================================================================
// 1. BROK LE TAVERNIER - Patron du Sanglier Doré
// ============================================================================

const BROK_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:innkeeper:brok',
  npcName: 'Brok le Tavernier',
  npcTitle: 'Patron du Sanglier Doré, ancien aventurier',
  act: 1,
  dialogues: [
    {
      id: 'brok-accueil',
      npcId: 'npc:innkeeper:brok',
      trigger: 'première visite au Sanglier Doré',
      tone: 'jovial',
      conditions: {},
      lines: [
        "Ah, des nouvelles têtes ! Bienvenue au Sanglier Doré, la meilleure — et la seule honnête — taverne d'Eldoria. Je suis Brok, propriétaire, cuisinier et videur quand il le faut.",
        "Installez-vous où vous voulez, mais évitez la table du fond à gauche — un habitué y a laissé sa marque. Au sens propre. Il y a une entaille de hache dans le bois.",
        "La bière est brassée ici-même, le ragoût mijote depuis ce matin, et les ennuis restent dehors. C'est la règle numéro un."
      ],
      playerResponses: [
        {
          id: 'brok-accueil-biere',
          text: "Une bière et le ragoût, s'il vous plaît.",
          consequence: "Brok sert avec un sourire. L'accueil est chaleureux, première impression positive.",
          reputationChange: [{ faction: 'sanglier-dore', amount: 1 }]
        },
        {
          id: 'brok-accueil-info',
          text: "Nous cherchons des informations sur les environs.",
          consequence: "Brok lève un sourcil intéressé mais reste prudent.",
          nextDialogue: 'brok-rumeur-acte1-1'
        },
        {
          id: 'brok-accueil-aventurier',
          text: "On m'a dit que vous étiez un ancien aventurier ?",
          consequence: "Le regard de Brok s'illumine brièvement avant de se voiler.",
          nextDialogue: 'brok-histoire-perso'
        },
        {
          id: 'brok-accueil-froid',
          text: "Épargnez-nous le discours. Juste une chambre.",
          consequence: "Brok hausse les épaules, moins amical par la suite.",
          reputationChange: [{ faction: 'sanglier-dore', amount: -1 }]
        }
      ]
    },
    {
      id: 'brok-rumeur-acte1-1',
      npcId: 'npc:innkeeper:brok',
      trigger: 'demande de rumeurs en Acte 1, début',
      tone: 'confidentiel',
      conditions: { actNumber: 1 },
      lines: [
        "*essuie un verre en regardant autour de lui* Les rumeurs, hein ? Ça dépend de ce que vous cherchez. Mais je vais vous dire ce que tout le monde murmure ici.",
        "Des gens disparaissent près des anciennes ruines au nord. Pas des voyageurs — des gens du coin, des fermiers qui connaissent la région comme leur poche. Trois en deux semaines.",
        "La garde dit que ce sont des loups, mais j'ai vu des loups toute ma vie. Les loups ne laissent pas les os intacts et rangés en cercle."
      ],
      playerResponses: [
        {
          id: 'brok-rumeur1-enqueter',
          text: "Des os en cercle ? Ça ressemble à un rituel. Où exactement ?",
          consequence: "Brok dessine une carte sommaire sur une serviette.",
          questAdvanced: 'quest:disparitions-eldoria',
          reputationChange: [{ faction: 'sanglier-dore', amount: 1 }]
        },
        {
          id: 'brok-rumeur1-garde',
          text: "Pourquoi la garde ne fait rien ?",
          consequence: "Brok grimace et baisse encore la voix.",
          nextDialogue: 'brok-rumeur-acte1-2'
        },
        {
          id: 'brok-rumeur1-payer',
          text: "Je paie pour les bonnes informations. *pose une pièce d'or*",
          consequence: "Brok empoche la pièce et devient plus loquace.",
          reputationChange: [{ faction: 'sanglier-dore', amount: 2 }],
          nextDialogue: 'brok-rumeur-acte1-3'
        }
      ]
    },
    {
      id: 'brok-rumeur-acte1-2',
      npcId: 'npc:innkeeper:brok',
      trigger: 'suite rumeurs - corruption garde',
      tone: 'conspirateur',
      conditions: { actNumber: 1, previousDialogue: 'brok-rumeur-acte1-1' },
      lines: [
        "*se penche par-dessus le comptoir* La garde... Écoutez, le Capitaine-Général Marcus est un homme bien, ça je vous le dis. Mais il ne peut pas être partout.",
        "Il y a des gardes qui ferment les yeux quand certains chariots passent les portes la nuit. Des chariots qui ne figurent sur aucun registre.",
        "Je ne dis pas que c'est lié aux disparitions. Mais quand les gens censés vous protéger regardent ailleurs... les prédateurs s'enhardissent."
      ],
      playerResponses: [
        {
          id: 'brok-rumeur2-chariots',
          text: "Ces chariots, vous savez d'où ils viennent ?",
          consequence: "Brok hésite longuement.",
          skillCheck: { skill: 'Persuasion', dc: 14, success: "Brok révèle qu'ils portent le symbole d'une lune noire.", failure: "Brok secoue la tête. Trop dangereux d'en dire plus." }
        },
        {
          id: 'brok-rumeur2-marcus',
          text: "Peut-être que Marcus devrait savoir.",
          consequence: "Brok acquiesce gravement. Possibilité de rapporter à Marcus.",
          questAdvanced: 'quest:corruption-garde'
        },
        {
          id: 'brok-rumeur2-laisser',
          text: "Ce ne sont pas nos affaires.",
          consequence: "Brok semble déçu mais respecte la décision."
        }
      ]
    },
    {
      id: 'brok-rumeur-acte1-3',
      npcId: 'npc:innkeeper:brok',
      trigger: 'rumeur payée - information premium',
      tone: 'confidentiel',
      conditions: { actNumber: 1, previousDialogue: 'brok-rumeur-acte1-1' },
      lines: [
        "*range la pièce et parle très bas* Bon, puisque vous êtes généreux... Il y a un homme qui vient ici tous les Lunedis soirs. Se fait appeler 'Le Gris'. Capuche, gants, jamais de visage visible.",
        "Il rencontre toujours quelqu'un de différent. La dernière fois, c'était un garde. Celle d'avant, un noble — je l'ai reconnu à ses bottes, du cuir de wyrm, y'a que les riches qui portent ça.",
        "Ils échangent des parchemins. Si vous voulez en savoir plus, soyez ici Lunedi prochain. Mais ne dites jamais que c'est moi qui vous l'ai dit."
      ],
      playerResponses: [
        {
          id: 'brok-rumeur3-lunedi',
          text: "Nous serons là Lunedi. Merci, Brok.",
          consequence: "Déblocage de la scène d'espionnage au Sanglier Doré.",
          questStarted: 'quest:homme-gris',
          reputationChange: [{ faction: 'sanglier-dore', amount: 2 }]
        },
        {
          id: 'brok-rumeur3-pourquoi',
          text: "Pourquoi nous dire tout ça ?",
          consequence: "Brok révèle une motivation personnelle.",
          nextDialogue: 'brok-histoire-perso'
        }
      ]
    },
    {
      id: 'brok-rumeur-acte2-1',
      npcId: 'npc:innkeeper:brok',
      trigger: 'rumeur Acte 2 - menaces grandissantes',
      tone: 'nerveux',
      conditions: { actNumber: 2 },
      lines: [
        "*la taverne est moins remplie que d'habitude* Vous avez remarqué ? Moitié moins de clients. Les gens ont peur de sortir la nuit maintenant.",
        "Il y a eu des... choses. Des bruits dans les murs de la ville. Pas des rats — quelque chose de plus gros. Le quartier des tanneurs a été évacué hier après qu'on a trouvé une fissure dans le sol. Une fissure qui... respirait.",
        "Et la reine a doublé la garde aux portes. Ils fouillent tout le monde maintenant. Quelque chose se prépare, je le sens dans mes vieux os."
      ],
      playerResponses: [
        {
          id: 'brok-rumeur-a2-fissure',
          text: "Une fissure qui respirait ? Emmenez-nous là-bas.",
          consequence: "Brok refuse d'y aller mais indique l'emplacement exact.",
          questAdvanced: 'quest:fissures-eldoria'
        },
        {
          id: 'brok-rumeur-a2-reine',
          text: "Que savez-vous des intentions de la reine ?",
          consequence: "Brok partage ce qu'il sait de source fiable.",
          nextDialogue: 'brok-rumeur-acte2-2'
        },
        {
          id: 'brok-rumeur-a2-rassurer',
          text: "Nous allons régler ça. Gardez courage.",
          consequence: "Brok semble rassuré. Bonus de réputation.",
          reputationChange: [{ faction: 'sanglier-dore', amount: 2 }, { faction: 'peuple-eldoria', amount: 1 }]
        }
      ]
    },
    {
      id: 'brok-rumeur-acte2-2',
      npcId: 'npc:innkeeper:brok',
      trigger: 'rumeur Acte 2 - conseil de guerre',
      tone: 'mystérieux',
      conditions: { actNumber: 2, previousDialogue: 'brok-rumeur-acte2-1' },
      lines: [
        "La reine Elara a convoqué un conseil de guerre secret. Mon ancien compagnon d'aventure, Joren — il sert au palais maintenant — m'a dit que des émissaires sont arrivés. Des nains de Karak-Dûm et des elfes de Sylvaneth.",
        "La dernière fois que trois peuples se sont réunis en conseil, c'était avant la Guerre des Cendres. Et ça, ça ne s'est pas bien terminé pour personne.",
        "Si vous avez une chance de parler à la reine... dites-lui que le peuple a besoin de réponses. Le silence nourrit la peur."
      ],
      playerResponses: [
        {
          id: 'brok-rumeur-a2b-conseil',
          text: "Nous essaierons d'obtenir une audience.",
          consequence: "Information utile pour l'approche de la reine.",
          questAdvanced: 'quest:audience-royale'
        },
        {
          id: 'brok-rumeur-a2b-joren',
          text: "Ce Joren, on peut lui parler ?",
          consequence: "Brok donne le contact de Joren au palais.",
          unlocks: 'contact-joren-palais'
        }
      ]
    },
    {
      id: 'brok-histoire-perso',
      npcId: 'npc:innkeeper:brok',
      trigger: 'question sur le passé de Brok',
      tone: 'mélancolique',
      conditions: { reputationMin: 3 },
      lines: [
        "*pose le verre et s'assoit lourdement* Mon passé d'aventurier ? Ouais... J'étais avec la Compagnie du Gryphon. Cinq ans sur les routes, les donjons, les forêts maudites.",
        "On était sept. Sept amis, sept épées, un seul but : protéger les innocents. *rit amèrement* On y croyait vraiment, vous savez.",
        "Puis on a trouvé le tombeau de Malthéus. Ce qu'on a vu là-dedans... J'ai perdu trois compagnons en une nuit. Liara, Kael, et le petit Pip. Le petit Pip qui avait toujours le sourire.",
        "J'ai raccroché après ça. Ouvert cette taverne pour que les aventuriers aient un endroit sûr où se reposer. Pour que personne n'ait à dormir dans le froid comme nous."
      ],
      playerResponses: [
        {
          id: 'brok-histoire-tombeau',
          text: "Le tombeau de Malthéus... Qu'est-ce que vous y avez trouvé ?",
          consequence: "Brok pâlit. Ce souvenir est lié aux événements actuels.",
          nextDialogue: 'brok-confession-secrete',
          reputationChange: [{ faction: 'sanglier-dore', amount: 1 }]
        },
        {
          id: 'brok-histoire-compassion',
          text: "Vous honorez leur mémoire en aidant les autres.",
          consequence: "Brok est visiblement ému. Lien renforcé.",
          reputationChange: [{ faction: 'sanglier-dore', amount: 3 }]
        },
        {
          id: 'brok-histoire-survivants',
          text: "Et les trois autres survivants ?",
          consequence: "Brok hésite. L'un d'eux est devenu quelqu'un d'important.",
          unlocks: 'secret-compagnons-gryphon'
        }
      ]
    },
    {
      id: 'brok-cave',
      npcId: 'npc:innkeeper:brok',
      trigger: 'Brok demande de l\'aide pour sa cave',
      tone: 'nerveux',
      conditions: { reputationMin: 5 },
      lines: [
        "*vous prend à part, visiblement inquiet* Écoutez, j'ai un problème et... normalement je ne demanderais pas, mais vous m'avez l'air fiables.",
        "Il y a quelque chose dans ma cave. Pas des rats — j'ai eu des rats toute ma vie, je sais ce que c'est. Non, ça... gratte derrière le mur du fond. Le mur que j'ai muré moi-même il y a dix ans.",
        "Derrière ce mur, il y a un ancien passage. Un passage qui mène aux catacombes sous la ville. J'ai muré ça quand j'ai ouvert la taverne parce que... des choses montaient parfois.",
        "Mais maintenant, ce qui gratte est plus fort. Et ce matin, j'ai trouvé des fissures dans le mortier. Quelque chose essaie de passer."
      ],
      playerResponses: [
        {
          id: 'brok-cave-accepter',
          text: "Montrez-nous cette cave. On va s'en occuper.",
          consequence: "Accès aux catacombes via le Sanglier Doré. Quête secondaire débloquée.",
          questStarted: 'quest:cave-sanglier-dore',
          reputationChange: [{ faction: 'sanglier-dore', amount: 3 }]
        },
        {
          id: 'brok-cave-catacombes',
          text: "Les catacombes ? Où mènent-elles exactement ?",
          consequence: "Brok révèle l'étendue du réseau souterrain.",
          unlocks: 'carte-catacombes-partielle'
        },
        {
          id: 'brok-cave-prix',
          text: "Ce genre de service a un prix.",
          consequence: "Brok est blessé mais comprend. Offre une récompense.",
          reputationChange: [{ faction: 'sanglier-dore', amount: -1 }],
          itemReceived: 'gold:150'
        },
        {
          id: 'brok-cave-gardes',
          text: "Vous devriez prévenir la garde.",
          consequence: "Brok refuse catégoriquement, révélant sa méfiance de la garde.",
          nextDialogue: 'brok-rumeur-acte1-2'
        }
      ]
    },
    {
      id: 'brok-reaction-evenement',
      npcId: 'npc:innkeeper:brok',
      trigger: 'après un événement majeur en ville',
      tone: 'nerveux',
      conditions: { customFlag: 'evenement-majeur-eldoria' },
      lines: [
        "*la taverne est barricadée, Brok a une vieille épée à la ceinture* Vous avez vu ce qui s'est passé ? *des clients murmurent avec anxiété*",
        "J'ai renvoyé les serveuses chez elles. Fermé les volets. Cette chose dans le ciel... je l'ai déjà vue. Dans le tombeau de Malthéus. Le même symbole, le même froid qui vous prend aux tripes.",
        "Les gens viennent ici parce qu'ils ont peur de rester seuls. Je leur dis que ça va aller, mais... *regarde son épée* J'espérais ne plus jamais avoir besoin de ça."
      ],
      playerResponses: [
        {
          id: 'brok-event-calmer',
          text: "Brok, il faut garder les gens calmes. On gère ça.",
          consequence: "Brok prend sur lui et rassure la taverne. Bonus moral.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 2 }, { faction: 'sanglier-dore', amount: 2 }]
        },
        {
          id: 'brok-event-tombeau',
          text: "Vous avez dit le tombeau de Malthéus. Dites-nous TOUT.",
          consequence: "Brok cède sous la pression. Révélation majeure.",
          nextDialogue: 'brok-confession-secrete'
        },
        {
          id: 'brok-event-epee',
          text: "Vous savez encore vous en servir ?",
          consequence: "Brok serre la mâchoire. En cas de siège, il se battra.",
          unlocks: 'brok-combattant-disponible'
        }
      ]
    },
    {
      id: 'brok-conseil-veteran',
      npcId: 'npc:innkeeper:brok',
      trigger: 'demande de conseil à Brok',
      tone: 'amical',
      conditions: { reputationMin: 5 },
      lines: [
        "*croise les bras et vous regarde avec l'oeil d'un vétéran* Vous voulez un conseil ? En voilà un qui m'a sauvé la vie plus d'une fois.",
        "Ne faites confiance à personne qui vous offre exactement ce que vous cherchez. Les vrais alliés vous disent ce que vous avez BESOIN d'entendre, pas ce que vous voulez entendre.",
        "Et gardez toujours une sortie. Toujours. Quand vous entrez quelque part, repérez les issues. Quand quelqu'un vous parle, écoutez ce qu'il ne dit PAS. C'est là que se cachent les vérités."
      ],
      playerResponses: [
        {
          id: 'brok-conseil-merci',
          text: "Sage conseil. Merci, Brok.",
          consequence: "Brok hoche la tête, satisfait.",
          reputationChange: [{ faction: 'sanglier-dore', amount: 1 }]
        },
        {
          id: 'brok-conseil-qui',
          text: "Quelqu'un en particulier à qui on ne devrait pas faire confiance ?",
          consequence: "Brok mentionne Dame Céleste avec une méfiance visible.",
          unlocks: 'indice-dame-celeste'
        },
        {
          id: 'brok-conseil-pratique',
          text: "Des conseils plus pratiques ? Ennemis, tactiques ?",
          consequence: "Brok partage sa connaissance des monstres locaux.",
          unlocks: 'bestiaire-local-brok'
        }
      ]
    },
    {
      id: 'brok-ivre',
      npcId: 'npc:innkeeper:brok',
      trigger: 'Brok est ivre tard le soir',
      tone: 'ivre',
      conditions: { timeOfDay: 'nuit', customFlag: 'brok-boit-seul' },
      lines: [
        "*assis seul au comptoir, bouteille à moitié vide* Oh, c'est vous... *hic* Asseyez-vous, asseyez-vous. La maison offre. Ce soir, Brok boit.",
        "Vous savez quoi ? *tape du poing sur le comptoir* Liara... elle avait les yeux verts. Verts comme les collines au printemps. Et elle sentait la lavande. Même dans ce foutu tombeau, elle sentait la lavande.",
        "J'aurais dû... *voix qui se brise* J'aurais dû la protéger. C'était mon rôle. J'étais le bouclier du groupe. Et j'ai échoué. Trois fois j'ai échoué."
      ],
      playerResponses: [
        {
          id: 'brok-ivre-ecouter',
          text: "*S'asseoir et écouter en silence*",
          consequence: "Le silence compatissant touche Brok profondément. Lien très renforcé.",
          reputationChange: [{ faction: 'sanglier-dore', amount: 3 }],
          nextDialogue: 'brok-confession-secrete'
        },
        {
          id: 'brok-ivre-eau',
          text: "Brok, c'est assez pour ce soir. Buvez de l'eau.",
          consequence: "Brok grogne mais obéit. Reconnaissance le lendemain.",
          reputationChange: [{ faction: 'sanglier-dore', amount: 1 }]
        },
        {
          id: 'brok-ivre-rejoindre',
          text: "*Prendre un verre et trinquer avec lui*",
          consequence: "Soirée de beuverie. Brok parle librement mais les souvenirs sont confus.",
          reputationChange: [{ faction: 'sanglier-dore', amount: 2 }]
        }
      ]
    },
    {
      id: 'brok-confession-secrete',
      npcId: 'npc:innkeeper:brok',
      trigger: 'Brok révèle son secret',
      tone: 'confidentiel',
      conditions: { reputationMin: 8, previousDialogue: 'brok-histoire-perso' },
      lines: [
        "*vérifie que personne n'écoute, ferme la porte de l'arrière-salle* Ce que je vais vous dire... personne ne le sait. Personne vivant.",
        "Dans le tombeau de Malthéus, on n'a pas juste trouvé des morts-vivants. On a trouvé un Sceau. Un des Sceaux des Enchaînés. Il brillait d'une lumière noire, et quand Liara l'a touché...",
        "Elle a vu quelque chose. Elle a crié un nom — 'Malachar' — et puis l'ombre l'a prise. Juste... avalée. Kael a essayé de briser le Sceau et il est tombé raide mort. Le petit Pip... lui, il a été écrasé par le plafond quand tout s'est effondré.",
        "Ce passage dans ma cave ? Il mène aux catacombes, oui. Mais les catacombes mènent au tombeau de Malthéus. Et le Sceau est toujours là-bas. Je le sais parce que je le sens. Chaque nuit, je le sens qui pulse sous mes pieds."
      ],
      playerResponses: [
        {
          id: 'brok-secret-sceau',
          text: "Un Sceau des Enchaînés ? Il faut prévenir la reine.",
          consequence: "Révélation majeure. Lien entre les catacombes et la menace principale.",
          questStarted: 'quest:sceau-malthéus',
          reputationChange: [{ faction: 'sanglier-dore', amount: 3 }, { faction: 'couronne-eldoria', amount: 2 }]
        },
        {
          id: 'brok-secret-malachar',
          text: "Malachar... Ce nom est dans les archives. Brok, c'est l'Archon.",
          consequence: "Brok pâlit comme un mort. La connexion est faite.",
          unlocks: 'revelation-malachar-brok'
        },
        {
          id: 'brok-secret-descendre',
          text: "Il faut descendre. Maintenant. Avant que ce qui gratte ne passe.",
          consequence: "Brok hésite puis va chercher sa vieille épée. Il vous accompagne.",
          questStarted: 'quest:descente-catacombes',
          unlocks: 'brok-compagnon-temporaire'
        }
      ]
    },
    {
      id: 'brok-accueil-retour',
      npcId: 'npc:innkeeper:brok',
      trigger: 'retour à la taverne après une quête',
      tone: 'amical',
      conditions: { reputationMin: 3 },
      lines: [
        "Hé, les héros sont de retour ! *crie vers la cuisine* Préparez le bon ragoût, celui avec l'extra de thym !",
        "Allez, installez-vous à votre table habituelle. Première tournée offerte par la maison. Vous l'avez bien mérité, vu la tête que vous faites."
      ],
      playerResponses: [
        {
          id: 'brok-retour-raconter',
          text: "Brok, il faut qu'on vous raconte ce qu'on a vu.",
          consequence: "Brok écoute attentivement. Réactions variées selon la quête.",
          reputationChange: [{ faction: 'sanglier-dore', amount: 1 }]
        },
        {
          id: 'brok-retour-repos',
          text: "Juste le repos. On est épuisés.",
          consequence: "Brok installe le groupe dans les meilleures chambres.",
          unlocks: 'repos-long-sanglier-dore'
        }
      ]
    },
    {
      id: 'brok-adieu',
      npcId: 'npc:innkeeper:brok',
      trigger: 'départ prolongé d\'Eldoria',
      tone: 'triste',
      conditions: { reputationMin: 5, customFlag: 'depart-eldoria' },
      lines: [
        "*tend un paquet enveloppé dans du tissu* Provisions pour la route. Le bon pain, celui que vous aimez. Et du fromage de chèvre qui tiendra une semaine.",
        "Écoutez... *se racle la gorge* Faites attention à vous, d'accord ? J'ai déjà perdu assez d'amis pour une vie entière.",
        "Et quand tout ça sera fini... il y aura toujours une table pour vous ici. La meilleure. Celle du fond avec l'entaille de hache. Maintenant allez, avant que je devienne sentimental."
      ],
      playerResponses: [
        {
          id: 'brok-adieu-promesse',
          text: "On reviendra, Brok. C'est une promesse.",
          consequence: "Brok sourit. Buff moral pour le groupe.",
          reputationChange: [{ faction: 'sanglier-dore', amount: 5 }]
        },
        {
          id: 'brok-adieu-garde',
          text: "Protégez les gens ici pendant notre absence.",
          consequence: "Brok redresse les épaules, retrouvant sa posture de guerrier.",
          unlocks: 'brok-defenseur-eldoria'
        }
      ]
    }
  ]
};

// ============================================================================
// 2. CAPITAINE-GÉNÉRAL MARCUS - Chef de la garde
// ============================================================================

const MARCUS_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:guard:marcus',
  npcName: 'Capitaine-Général Marcus',
  npcTitle: 'Chef de la Garde Royale d\'Eldoria',
  act: 1,
  dialogues: [
    {
      id: 'marcus-briefing-mission',
      npcId: 'npc:guard:marcus',
      trigger: 'première mission confiée par Marcus',
      tone: 'solennel',
      conditions: { actNumber: 1, reputationMin: 2 },
      lines: [
        "*debout devant une carte de la région, en armure complète* Vous êtes les aventuriers dont Brok m'a parlé. Il ne recommande pas les gens à la légère.",
        "La situation est simple : des fermiers disparaissent dans le secteur nord. La garde est en sous-effectif — la moitié de mes hommes surveillent les frontières depuis les tremblements de terre. J'ai besoin de gens compétents.",
        "Votre mission : enquêter sur les disparitions dans le hameau de Ventclair. Interrogez les habitants, examinez les lieux, trouvez ce qui se passe. Rapport direct à moi. Pas de bavardage en ville, pas de panique."
      ],
      playerResponses: [
        {
          id: 'marcus-brief-accepter',
          text: "Considérez que c'est fait, Capitaine-Général.",
          consequence: "Marcus hoche la tête, satisfait du professionnalisme.",
          questStarted: 'quest:disparitions-ventclair',
          reputationChange: [{ faction: 'garde-royale', amount: 2 }]
        },
        {
          id: 'marcus-brief-info',
          text: "Que savez-vous déjà ? Des pistes ?",
          consequence: "Marcus partage les rapports de patrouille.",
          unlocks: 'rapports-patrouille-nord'
        },
        {
          id: 'marcus-brief-paiement',
          text: "Quelle est la récompense ?",
          consequence: "Marcus fronce les sourcils mais comprend.",
          reputationChange: [{ faction: 'garde-royale', amount: -1 }]
        },
        {
          id: 'marcus-brief-corruption',
          text: "On nous a dit que certains gardes fermaient les yeux sur des activités suspectes.",
          consequence: "Marcus se fige. Son expression devient de glace.",
          nextDialogue: 'marcus-corruption'
        }
      ]
    },
    {
      id: 'marcus-rapport-mission',
      npcId: 'npc:guard:marcus',
      trigger: 'retour de mission',
      tone: 'respectueux',
      conditions: { questCompleted: ['quest:disparitions-ventclair'] },
      lines: [
        "*vous reçoit dans son bureau, porte fermée* Rapport. Qu'avez-vous trouvé à Ventclair ?",
        "*écoute attentivement, prenant des notes* C'est pire que ce que je craignais. Si ce que vous dites est vrai... il ne s'agit pas de simples brigands.",
        "Vous avez fait du bon travail. Meilleur que ce que mes propres hommes auraient pu faire, et ça m'irrite de le reconnaître. *sort une bourse* Votre récompense, plus un bonus pour la discrétion."
      ],
      playerResponses: [
        {
          id: 'marcus-rapport-suite',
          text: "Quelle est la suite ? D'autres missions ?",
          consequence: "Marcus révèle d'autres zones problématiques.",
          nextDialogue: 'marcus-confiance',
          reputationChange: [{ faction: 'garde-royale', amount: 3 }]
        },
        {
          id: 'marcus-rapport-reine',
          text: "La reine doit être informée directement.",
          consequence: "Marcus hésite mais reconnaît la gravité.",
          questAdvanced: 'quest:audience-royale'
        },
        {
          id: 'marcus-rapport-aide',
          text: "Vos hommes ont besoin de renforts. On peut aider à former les recrues.",
          consequence: "Marcus est impressionné par l'offre.",
          reputationChange: [{ faction: 'garde-royale', amount: 4 }],
          unlocks: 'formation-recrues'
        }
      ]
    },
    {
      id: 'marcus-confiance',
      npcId: 'npc:guard:marcus',
      trigger: 'Marcus accorde sa confiance',
      tone: 'confidentiel',
      conditions: { reputationMin: 8, questCompleted: ['quest:disparitions-ventclair'] },
      lines: [
        "*retire ses gantelets et s'assoit, chose rare* Je vais être franc avec vous. Ce que je vais dire ne quitte pas cette pièce.",
        "Je sers cette cité depuis vingt-trois ans. J'ai vu des guerres, des famines, des épidémies. Mais ce qui se passe maintenant... c'est différent. Je le sens dans mes tripes.",
        "La reine sait des choses qu'elle ne partage pas. L'Archiviste Théodore passe ses nuits enfermé dans les archives scellées. Et hier, trois prêtres de Solarius sont arrivés en ville — à cheval, en pleine nuit, sans s'annoncer.",
        "Quelque chose de très ancien se réveille. Et j'ai peur que nous ne soyons pas prêts."
      ],
      playerResponses: [
        {
          id: 'marcus-confiance-ensemble',
          text: "Nous nous préparerons ensemble. Qu'est-ce qu'il faut faire ?",
          consequence: "Alliance solide avec Marcus. Accès aux ressources militaires.",
          reputationChange: [{ faction: 'garde-royale', amount: 5 }],
          unlocks: 'alliance-marcus'
        },
        {
          id: 'marcus-confiance-pretres',
          text: "Ces prêtres de Solarius, où sont-ils maintenant ?",
          consequence: "Marcus révèle qu'ils sont au Temple de l'Aube.",
          unlocks: 'piste-pretres-solarius'
        },
        {
          id: 'marcus-confiance-archives',
          text: "Et si on allait voir ce que cache Théodore ?",
          consequence: "Marcus fournit un laissez-passer pour les archives.",
          itemReceived: 'laissez-passer-archives',
          questAdvanced: 'quest:archives-scellees'
        }
      ]
    },
    {
      id: 'marcus-corruption',
      npcId: 'npc:guard:marcus',
      trigger: 'confrontation sur la corruption',
      tone: 'colérique',
      conditions: {},
      lines: [
        "*sa mâchoire se crispe* Vous pensez que je ne le sais pas ? Vous pensez que le Capitaine-Général de la garde royale ne voit pas la pourriture dans ses propres rangs ?",
        "J'ai identifié sept gardes corrompus. Sept. Mais je ne peux pas agir tant que je ne sais pas qui les paie. Si je les arrête maintenant, le commanditaire disparaît et en recrute sept autres.",
        "Alors oui, je 'ferme les yeux'. Parce que j'attends le bon moment pour frapper. Et si vous voulez aider... je pourrais avoir besoin d'yeux qui ne portent pas l'uniforme."
      ],
      playerResponses: [
        {
          id: 'marcus-corruption-aider',
          text: "Dites-nous ce dont vous avez besoin.",
          consequence: "Marcus confie une mission d'infiltration.",
          questStarted: 'quest:purge-garde',
          reputationChange: [{ faction: 'garde-royale', amount: 3 }]
        },
        {
          id: 'marcus-corruption-noms',
          text: "Donnez-nous les noms des sept. On enquêtera discrètement.",
          consequence: "Marcus hésite mais finit par donner trois noms.",
          unlocks: 'liste-gardes-corrompus'
        },
        {
          id: 'marcus-corruption-doute',
          text: "Comment savoir que VOUS n'êtes pas compromis ?",
          consequence: "Marcus fixe le joueur avec une intensité glaciale.",
          reputationChange: [{ faction: 'garde-royale', amount: -3 }]
        }
      ]
    },
    {
      id: 'marcus-inquietude-politique',
      npcId: 'npc:guard:marcus',
      trigger: 'discussion politique en Acte 2',
      tone: 'nerveux',
      conditions: { actNumber: 2, reputationMin: 6 },
      lines: [
        "*fait les cent pas* Le conseil noble pousse la reine à fermer les frontières. Lord Desmond veut même déclarer la loi martiale. Lui, la loi martiale ! Le même homme qui n'a jamais tenu une épée.",
        "Si la reine cède... les réfugiés du sud seront bloqués dehors. Des familles entières. Et le commerce s'effondrera en une semaine.",
        "J'ai besoin que quelqu'un parle à la reine en privé. Quelqu'un qui n'a pas d'agenda politique. Quelqu'un en qui elle a confiance. Vous."
      ],
      playerResponses: [
        {
          id: 'marcus-politique-accepter',
          text: "Nous parlerons à la reine. Que devons-nous lui dire ?",
          consequence: "Marcus prépare les arguments. Avancement de la quête politique.",
          questAdvanced: 'quest:crise-politique',
          unlocks: 'arguments-marcus'
        },
        {
          id: 'marcus-politique-desmond',
          text: "Ce Lord Desmond, quel est son vrai jeu ?",
          consequence: "Marcus partage ses soupçons sur les liens de Desmond.",
          unlocks: 'dossier-lord-desmond'
        },
        {
          id: 'marcus-politique-neutre',
          text: "La politique n'est pas notre domaine.",
          consequence: "Marcus est déçu mais respecte la position.",
          reputationChange: [{ faction: 'garde-royale', amount: -2 }]
        }
      ]
    },
    {
      id: 'marcus-ordre-urgent',
      npcId: 'npc:guard:marcus',
      trigger: 'ordre de mission urgent',
      tone: 'menaçant',
      conditions: { actNumber: 2, customFlag: 'attaque-imminente' },
      lines: [
        "*entre en trombe, sang sur l'armure* Pas le temps pour les politesses. Le fort de Brasier-Noir est tombé cette nuit. TOMBÉ. Trente gardes, tous morts.",
        "Quelque chose remonte du sud à vitesse terrifiante. Les éclaireurs parlent d'une armée d'ombres — des créatures que nos armes ne peuvent pas toucher. Elles seront aux portes d'Eldoria dans deux jours.",
        "J'ai besoin de vous sur la route sud. Pas pour combattre — pour ralentir. Évacuez les villages, détruisez les ponts, gagnez-nous du temps. Chaque heure compte."
      ],
      playerResponses: [
        {
          id: 'marcus-urgent-partir',
          text: "On part immédiatement.",
          consequence: "Mission d'urgence sur la route sud. Course contre la montre.",
          questStarted: 'quest:evacuation-route-sud',
          reputationChange: [{ faction: 'garde-royale', amount: 5 }]
        },
        {
          id: 'marcus-urgent-armes',
          text: "Des armes normales ne les touchent pas ? Il nous faut de l'argent, de la magie.",
          consequence: "Marcus dirige vers le Temple de Solarius pour des armes bénies.",
          unlocks: 'armes-benies-disponibles'
        },
        {
          id: 'marcus-urgent-renforts',
          text: "Envoyez un message aux nains et aux elfes. Nous avons besoin de tous les alliés.",
          consequence: "Marcus y avait pensé mais n'a pas d'émissaire. Le groupe peut s'en charger.",
          questStarted: 'quest:appel-aux-allies'
        }
      ]
    },
    {
      id: 'marcus-discours-troupes',
      npcId: 'npc:guard:marcus',
      trigger: 'Marcus fait un discours avant la bataille',
      tone: 'inspirant',
      conditions: { actNumber: 2, customFlag: 'veille-bataille' },
      lines: [
        "*debout sur les remparts, face à la garnison assemblée* Soldats d'Eldoria ! Demain, l'ennemi viendra frapper à nos portes. Et nous serons là pour l'accueillir !",
        "Je ne vais pas vous mentir — l'ennemi est redoutable. Mais regardez à votre gauche. Regardez à votre droite. Ce sont vos frères et soeurs d'armes. Et ensemble, ENSEMBLE, il n'y a rien que nous ne puissions affronter.",
        "Nos ancêtres ont repoussé les Ombres une première fois. Notre reine veille sur nous. Et ces héros — *désigne le groupe de joueurs* — se battront à nos côtés. Alors je vous le demande : QUI DÉFEND ELDORIA ?",
        "*la garnison rugit en réponse* C'est bien ce que je pensais. À vos postes. Et que Solarius veille sur nous tous."
      ],
      playerResponses: [
        {
          id: 'marcus-discours-rejoindre',
          text: "*Lever votre arme avec la garnison*",
          consequence: "Le moral des troupes est au maximum. Bonus pour la bataille.",
          reputationChange: [{ faction: 'garde-royale', amount: 3 }, { faction: 'peuple-eldoria', amount: 3 }]
        },
        {
          id: 'marcus-discours-parler',
          text: "*Prendre la parole pour ajouter vos mots*",
          consequence: "Discours improvisé. Test de Charisme DC 15 pour un bonus supplémentaire.",
          skillCheck: { skill: 'Charisme', dc: 15, success: "Les soldats scandent votre nom. Légende naissante.", failure: "Paroles maladroites mais l'intention est appréciée." }
        }
      ]
    },
    {
      id: 'marcus-revelation-garde',
      npcId: 'npc:guard:marcus',
      trigger: 'Marcus révèle la vérité sur la corruption',
      tone: 'triste',
      conditions: { actNumber: 2, reputationMin: 10, questCompleted: ['quest:purge-garde'] },
      lines: [
        "*seul dans son bureau, tête dans les mains* C'est mon fils. Le commanditaire de la corruption... c'est mon propre fils, Lucius.",
        "Il a rejoint le Cercle d'Ombre il y a deux ans. Je l'ai découvert il y a six mois. Six mois que je cherche un moyen de le sauver sans... *voix brisée*",
        "Je sais ce que le devoir exige. Je le sais mieux que quiconque. Mais c'est mon garçon. Mon seul fils. Et je ne suis pas prêt à le perdre."
      ],
      playerResponses: [
        {
          id: 'marcus-fils-sauver',
          text: "On peut peut-être le ramener. Laissez-nous essayer.",
          consequence: "Marcus s'accroche à cet espoir. Quête pour sauver Lucius.",
          questStarted: 'quest:sauver-lucius',
          reputationChange: [{ faction: 'garde-royale', amount: 5 }]
        },
        {
          id: 'marcus-fils-devoir',
          text: "Marcus, le devoir doit passer en premier. Vous le savez.",
          consequence: "Marcus acquiesce douloureusement. Il fera ce qu'il faut.",
          reputationChange: [{ faction: 'garde-royale', amount: 2 }]
        },
        {
          id: 'marcus-fils-comprendre',
          text: "Pourquoi a-t-il rejoint le Cercle ? Il y a une raison.",
          consequence: "Marcus révèle que Lucius cherchait à guérir sa mère mourante.",
          unlocks: 'motivation-lucius'
        }
      ]
    },
    {
      id: 'marcus-avant-depart',
      npcId: 'npc:guard:marcus',
      trigger: 'adieux avant le départ vers les terres sauvages',
      tone: 'solennel',
      conditions: { actNumber: 2, customFlag: 'depart-eldoria', reputationMin: 8 },
      lines: [
        "*en tenue de cérémonie, tend un insigne* Cet insigne vous identifie comme agents de la Couronne. Montrez-le à n'importe quel poste de garde du royaume — ils vous aideront.",
        "Là où vous allez, mes soldats ne peuvent pas vous suivre. Mais sachez que derrière vous, Eldoria tient bon. Je m'en assure personnellement.",
        "Revenez en un seul morceau. C'est un ordre."
      ],
      playerResponses: [
        {
          id: 'marcus-depart-accepter',
          text: "*Accepter l'insigne avec un salut militaire*",
          consequence: "Insigne de la Couronne reçu. Accès aux postes de garde du royaume.",
          itemReceived: 'insigne-couronne',
          reputationChange: [{ faction: 'garde-royale', amount: 3 }]
        },
        {
          id: 'marcus-depart-proteger',
          text: "Protégez la reine, Marcus. Elle est la clé de tout.",
          consequence: "Marcus donne sa parole solennelle.",
          unlocks: 'serment-marcus'
        }
      ]
    }
  ]
};

// ============================================================================
// 3. REINE ELARA - Souveraine sage
// ============================================================================

const ELARA_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:noble:elara',
  npcName: 'Reine Elara',
  npcTitle: 'Souveraine du Royaume d\'Eldoria',
  act: 1,
  dialogues: [
    {
      id: 'elara-audience-formelle',
      npcId: 'npc:noble:elara',
      trigger: 'première audience avec la reine',
      tone: 'solennel',
      conditions: { actNumber: 1, questCompleted: ['quest:disparitions-ventclair'] },
      lines: [
        "*assise sur le trône, couronne d'argent et de saphirs, regard perçant mais bienveillant* Approchez. Le Capitaine-Général Marcus m'a parlé de vous en termes élogieux, ce qui est remarquable venant d'un homme qui ne fait de compliments qu'à son cheval.",
        "Je suis la reine Elara, et en ces temps troublés, je n'ai ni le luxe ni l'envie des formalités creuses. Parlez librement. Que pouvez-vous me dire sur ce qui menace mon peuple ?",
        "Chaque information, chaque détail, aussi insignifiant qu'il puisse paraître, peut faire la différence entre la survie et l'extinction. Je vous écoute."
      ],
      playerResponses: [
        {
          id: 'elara-audience-rapport',
          text: "*Faire un rapport détaillé des découvertes*",
          consequence: "La reine écoute avec une attention absolue, posant des questions précises.",
          reputationChange: [{ faction: 'couronne-eldoria', amount: 3 }]
        },
        {
          id: 'elara-audience-sceau',
          text: "Majesté, nous avons entendu parler des Sceaux des Enchaînés.",
          consequence: "Le visage de la reine se fige imperceptiblement. Elle congédie les courtisans.",
          nextDialogue: 'elara-revelation-sceaux'
        },
        {
          id: 'elara-audience-aide',
          text: "Le peuple a peur, Majesté. Ils ont besoin de réponses.",
          consequence: "La reine acquiesce avec gravité.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 2 }, { faction: 'couronne-eldoria', amount: 1 }]
        }
      ]
    },
    {
      id: 'elara-conversation-privee',
      npcId: 'npc:noble:elara',
      trigger: 'audience privée avec la reine',
      tone: 'confidentiel',
      conditions: { reputationMin: 10, customFlag: 'audience-privee-accordee' },
      lines: [
        "*dans ses appartements privés, sans couronne, en tenue simple* Ici, je ne suis pas la reine. Je suis Elara. Et j'ai besoin de parler à quelqu'un qui ne cherchera pas à me manipuler.",
        "Le conseil me pousse dans des directions opposées. Les nobles veulent la guerre, les prêtres veulent prier, les marchands veulent fuir. Et moi, je sais quelque chose qu'aucun d'eux ne sait.",
        "Mon arrière-grand-mère, la reine Isolde, n'a pas seulement vaincu les Ombres lors de la Première Chute. Elle a payé un prix terrible. Un prix que chaque souveraine de notre lignée porte depuis."
      ],
      playerResponses: [
        {
          id: 'elara-privee-prix',
          text: "Quel prix, Elara ?",
          consequence: "La reine révèle le secret de la lignée royale.",
          nextDialogue: 'elara-revelation-sceaux'
        },
        {
          id: 'elara-privee-soutien',
          text: "Vous n'êtes pas seule. Nous sommes là.",
          consequence: "Elara est visiblement touchée. Confiance renforcée.",
          reputationChange: [{ faction: 'couronne-eldoria', amount: 5 }]
        },
        {
          id: 'elara-privee-conseil',
          text: "Que nous conseillez-vous de faire ?",
          consequence: "Elara partage sa stratégie personnelle.",
          unlocks: 'plan-strategique-elara'
        }
      ]
    },
    {
      id: 'elara-charge-heroique',
      npcId: 'npc:noble:elara',
      trigger: 'la reine confie une mission sacrée',
      tone: 'solennel',
      conditions: { actNumber: 2, reputationMin: 12 },
      lines: [
        "*debout en armure cérémonielle, épée au côté* Ce que je vais vous demander dépasse le cadre du devoir ordinaire. C'est une charge que je ne confierais qu'à ceux en qui j'ai une confiance absolue.",
        "Les Sceaux des Enchaînés s'affaiblissent. Cinq Sceaux maintiennent Malachar et ses serviteurs prisonniers depuis mille ans. Deux ont déjà été brisés. Si un troisième cède...",
        "Je vous charge de trouver et protéger les Sceaux restants. Par l'autorité de la Couronne et le sang de la lignée d'Isolde, je vous fais Gardiens des Sceaux. Que cette charge soit votre plus grand honneur... et votre plus lourd fardeau."
      ],
      playerResponses: [
        {
          id: 'elara-charge-accepter',
          text: "*S'agenouiller* Nous acceptons cette charge, Majesté.",
          consequence: "Titre de Gardiens des Sceaux conféré. Accès à des ressources spéciales.",
          reputationChange: [{ faction: 'couronne-eldoria', amount: 10 }],
          unlocks: 'titre-gardiens-sceaux',
          questStarted: 'quest:proteger-sceaux'
        },
        {
          id: 'elara-charge-info',
          text: "Nous acceptons, mais nous avons besoin de tout savoir sur ces Sceaux.",
          consequence: "Elara donne accès à tous les documents de la lignée royale.",
          unlocks: 'archives-royales-sceaux',
          questStarted: 'quest:proteger-sceaux'
        }
      ]
    },
    {
      id: 'elara-inquietude-maternelle',
      npcId: 'npc:noble:elara',
      trigger: 'Elara parle de son fils',
      tone: 'triste',
      conditions: { reputationMin: 12, previousDialogue: 'elara-conversation-privee' },
      lines: [
        "*tient un petit portrait peint* Mon fils, Aelric. Il a huit ans. Huit ans et il comprend déjà que sa mère pourrait ne pas revenir du prochain conseil.",
        "Il m'a demandé hier pourquoi le ciel était rouge le soir. Je lui ai dit que c'était le soleil qui peignait les nuages. Mais il m'a regardé avec ses yeux — les yeux de son père — et il a dit : 'Maman, ne me mens pas.'",
        "Si nous échouons... s'il arrive quelque chose à ce royaume... je vous en supplie, protégez mon fils. Emmenez-le chez les elfes de Sylvaneth. Elyndra a promis de l'accueillir. Promettez-le-moi."
      ],
      playerResponses: [
        {
          id: 'elara-fils-promesse',
          text: "Je vous le promets, Elara. Sur mon honneur.",
          consequence: "Serment sacré. En cas d'échec, quête de protection du prince.",
          unlocks: 'serment-protection-aelric',
          reputationChange: [{ faction: 'couronne-eldoria', amount: 5 }]
        },
        {
          id: 'elara-fils-victoire',
          text: "Nous n'échouerons pas. Il grandira dans un monde en paix.",
          consequence: "Elara sourit, un sourire fragile mais reconnaissant.",
          reputationChange: [{ faction: 'couronne-eldoria', amount: 3 }]
        },
        {
          id: 'elara-fils-elfes',
          text: "Pourquoi les elfes ? Pourquoi pas les nains ou un royaume allié ?",
          consequence: "Elara révèle un lien de sang avec la lignée elfique.",
          unlocks: 'secret-lignee-elfique'
        }
      ]
    },
    {
      id: 'elara-revelation-sceaux',
      npcId: 'npc:noble:elara',
      trigger: 'Elara révèle la vérité sur les Sceaux',
      tone: 'mystérieux',
      conditions: { reputationMin: 8 },
      lines: [
        "*ferme les portes avec un sort de silence* Ce que je vais vous dire est le secret le mieux gardé du royaume. Seuls le souverain et l'Archiviste en chef le connaissent.",
        "Les Sceaux des Enchaînés ne sont pas de simples barrières magiques. Ils sont vivants. Chacun est lié à une lignée de gardiens. La lignée royale d'Eldoria est liée au Sceau Central, celui qui se trouve sous le palais.",
        "Je le sens. Chaque nuit, je sens sa pulsation, comme un second coeur. Et depuis trois mois, ce coeur faiblit. Quelque chose le ronge de l'intérieur.",
        "Si le Sceau Central cède... je mourrai avec lui. C'est le prix d'Isolde. Et Malachar sera libre."
      ],
      playerResponses: [
        {
          id: 'elara-sceaux-renforcer',
          text: "Il doit y avoir un moyen de renforcer le Sceau.",
          consequence: "Elara mentionne le Rituel de Renouvellement décrit dans les archives.",
          unlocks: 'rituel-renouvellement',
          questAdvanced: 'quest:proteger-sceaux'
        },
        {
          id: 'elara-sceaux-briser',
          text: "Et si on brisait les Sceaux volontairement pour affronter Malachar avant qu'il ne soit à pleine puissance ?",
          consequence: "Elara pâlit mais considère cette stratégie désespérée.",
          unlocks: 'strategie-audacieuse'
        },
        {
          id: 'elara-sceaux-lignees',
          text: "Quelles sont les autres lignées liées aux Sceaux ?",
          consequence: "Elara révèle les gardiens des quatre autres Sceaux.",
          unlocks: 'carte-lignees-sceaux'
        }
      ]
    },
    {
      id: 'elara-desespoir',
      npcId: 'npc:noble:elara',
      trigger: 'après la perte d\'un Sceau',
      tone: 'désespéré',
      conditions: { actNumber: 2, customFlag: 'sceau-perdu' },
      lines: [
        "*seule dans la chapelle royale, agenouillée* Je l'ai senti se briser. Comme si on m'arrachait un organe. *ses mains tremblent*",
        "Trois Sceaux brisés. Plus que deux. Le Central et celui du Nord. Nous avons échoué... j'ai échoué...",
        "*se redresse soudain, une flamme dans les yeux* Non. Non, je refuse. Isolde a tenu bon avec moins que ça. Je suis sa descendante et je ne céderai pas. *essuie ses larmes* Dites-moi que nous avons encore une chance."
      ],
      playerResponses: [
        {
          id: 'elara-desespoir-espoir',
          text: "Tant que nous respirons, nous avons une chance. Toujours.",
          consequence: "Elara retrouve sa force. Le moral de la cour se stabilise.",
          reputationChange: [{ faction: 'couronne-eldoria', amount: 5 }]
        },
        {
          id: 'elara-desespoir-plan',
          text: "Voici notre plan. *exposer la stratégie*",
          consequence: "Elara écoute et contribue avec des ressources royales.",
          unlocks: 'ressources-royales-urgence'
        },
        {
          id: 'elara-desespoir-verite',
          text: "Elara, s'il reste un espoir, il est chez les elfes et les nains. Il faut unir les trois peuples.",
          consequence: "Elara acquiesce. Elle écrira les lettres d'alliance de sa propre main.",
          questStarted: 'quest:grande-alliance'
        }
      ]
    },
    {
      id: 'elara-adieu',
      npcId: 'npc:noble:elara',
      trigger: 'départ pour la quête finale de l\'Acte 2',
      tone: 'solennel',
      conditions: { actNumber: 2, customFlag: 'depart-quete-sceaux' },
      lines: [
        "*dans la cour du palais, toute la cour assemblée* Héros d'Eldoria. Vous portez avec vous l'espoir de tout un royaume. De tout un monde.",
        "Prenez ceci. *détache un pendentif brillant* C'est un fragment du Sceau Central. Il vous guidera vers les autres Sceaux et vous protégera contre l'influence de Malachar.",
        "Quand la nuit semblera la plus noire, souvenez-vous : même la plus petite lumière suffit à repousser l'ombre. Allez. Et revenez-nous."
      ],
      playerResponses: [
        {
          id: 'elara-adieu-serment',
          text: "Nous reviendrons. Et les Sceaux tiendront.",
          consequence: "Serment devant toute la cour. Effet inspirant sur les alliés.",
          itemReceived: 'fragment-sceau-central',
          reputationChange: [{ faction: 'couronne-eldoria', amount: 5 }]
        },
        {
          id: 'elara-adieu-fils',
          text: "*Regarder vers le prince Aelric, hocher la tête*",
          consequence: "Le petit prince fait un salut de chevalier maladroit. Moment poignant.",
          itemReceived: 'fragment-sceau-central',
          reputationChange: [{ faction: 'couronne-eldoria', amount: 3 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 4. LE VIEUX SAM - Témoin de phénomènes
// ============================================================================

const VIEUX_SAM_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:neutral:vieux-sam',
  npcName: 'Le Vieux Sam',
  npcTitle: 'Mendiant et témoin de phénomènes étranges',
  act: 1,
  dialogues: [
    {
      id: 'sam-divagations-1',
      npcId: 'npc:neutral:vieux-sam',
      trigger: 'première rencontre avec Sam',
      tone: 'mystérieux',
      conditions: {},
      lines: [
        "*assis contre un mur, emmitouflé dans des haillons, yeux vitreux* Les ombres dansent, les ombres chantent... Hé, hé ! Vous les voyez aussi ? Non ? Bien sûr que non. Personne ne voit. Personne n'écoute.",
        "*se balance d'avant en arrière* Cinq doigts sur la main, cinq sceaux dans la terre... cassez un doigt, ça fait mal. Cassez-en deux, vous ne pouvez plus saisir. Cassez-en trois...",
        "*vous fixe soudain avec une lucidité effrayante* ...et la main s'ouvre."
      ],
      playerResponses: [
        {
          id: 'sam-divag1-ecouter',
          text: "Quels sceaux ? De quoi parlez-vous ?",
          consequence: "Sam recommence à divaguer mais glisse d'autres indices.",
          nextDialogue: 'sam-divagations-2'
        },
        {
          id: 'sam-divag1-aider',
          text: "*Offrir de la nourriture et une couverture*",
          consequence: "Sam est touché. Il se souviendra de cette gentillesse.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 2 }],
          nextDialogue: 'sam-gratitude'
        },
        {
          id: 'sam-divag1-ignorer',
          text: "Juste un fou. Partons.",
          consequence: "Sam murmure dans votre dos : 'Le fou voit ce que le sage ignore.'",
          reputationChange: [{ faction: 'peuple-eldoria', amount: -1 }]
        }
      ]
    },
    {
      id: 'sam-divagations-2',
      npcId: 'npc:neutral:vieux-sam',
      trigger: 'deuxième conversation avec Sam',
      tone: 'mystérieux',
      conditions: { previousDialogue: 'sam-divagations-1' },
      lines: [
        "*compte sur ses doigts* Le premier sous la montagne de feu. Le deuxième dans la mer qui pleure. Le troisième sous les racines du vieil arbre. Le quatrième... *frissonne* ...sous le trône. Et le cinquième...",
        "*se couvre les yeux* Le cinquième est partout et nulle part. Il bouge. Il bouge dans le noir. Et il a des yeux. Oh oui, tant d'yeux...",
        "*chantonne* 'Quand les cinq se brisent, quand les chaînes se défont, celui qui dort ne dormira plus, et le monde chantera sa chanson...'"
      ],
      playerResponses: [
        {
          id: 'sam-divag2-localiser',
          text: "Montagne de feu, mer qui pleure, vieil arbre, sous le trône... Ce sont les emplacements des Sceaux !",
          consequence: "Révélation cartographique majeure. Les indices de Sam sont réels.",
          unlocks: 'carte-sceaux-sam',
          questAdvanced: 'quest:proteger-sceaux'
        },
        {
          id: 'sam-divag2-cinquieme',
          text: "Le cinquième Sceau bouge ? Comment est-ce possible ?",
          consequence: "Sam tremble et refuse d'en dire plus. Trop de peur.",
          unlocks: 'mystere-cinquieme-sceau'
        },
        {
          id: 'sam-divag2-chanson',
          text: "Cette chanson, où l'avez-vous apprise ?",
          consequence: "Sam révèle un fragment de son passé.",
          nextDialogue: 'sam-lucidite'
        }
      ]
    },
    {
      id: 'sam-lucidite',
      npcId: 'npc:neutral:vieux-sam',
      trigger: 'moment de lucidité de Sam',
      tone: 'triste',
      conditions: { previousDialogue: 'sam-divagations-1' },
      lines: [
        "*ses yeux deviennent clairs, sa voix ferme* Je n'ai pas toujours été comme ça. Il y a vingt ans, j'étais Samuel Voss, archiviste adjoint de la Bibliothèque Royale.",
        "J'ai trouvé un livre. Un livre qui n'aurait pas dû exister. Il décrivait les Sceaux, les Enchaînés, tout. Et quand je l'ai lu... quelque chose m'a regardé à travers les pages.",
        "Depuis ce jour, je vois. Les fissures dans le monde, les ombres qui ne devraient pas bouger, les murmures dans le vent. On dit que je suis fou. Mais je ne suis pas fou. Je vois trop, c'est tout."
      ],
      playerResponses: [
        {
          id: 'sam-lucide-livre',
          text: "Ce livre, où est-il maintenant ?",
          consequence: "Sam indique un emplacement secret dans les archives.",
          unlocks: 'livre-interdit-emplacement',
          questStarted: 'quest:livre-interdit'
        },
        {
          id: 'sam-lucide-guerir',
          text: "Frère Aldwin pourrait peut-être vous aider. La magie divine...",
          consequence: "Sam secoue la tête. 'La lumière guérit les blessures, pas les visions.'",
          unlocks: 'sam-et-aldwin'
        },
        {
          id: 'sam-lucide-proteger',
          text: "Vous êtes en danger si quelqu'un sait ce que vous voyez.",
          consequence: "Sam rit amèrement. 'Qui croirait un fou?'",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 1 }]
        }
      ]
    },
    {
      id: 'sam-souvenir-chute',
      npcId: 'npc:neutral:vieux-sam',
      trigger: 'Sam raconte la Chute',
      tone: 'mystérieux',
      conditions: { reputationMin: 5, previousDialogue: 'sam-lucidite' },
      lines: [
        "*les yeux dans le vide, comme s'il regardait un autre temps* La Première Chute... je ne l'ai pas vécue, mais je l'ai VUE. Le livre me l'a montrée.",
        "Le ciel s'est ouvert comme une blessure. Et de cette blessure, ILS sont tombés. Pas des ombres — des absences de lumière. Là où ils marchaient, la vie s'éteignait. L'herbe pourrissait. Les arbres hurlaient.",
        "C'est Isolde qui les a arrêtés. Avec son sang et celui de quatre autres champions. Cinq sacrifices pour cinq Sceaux. Et le monde a oublié. Le monde oublie toujours."
      ],
      playerResponses: [
        {
          id: 'sam-chute-champions',
          text: "Cinq champions ? Qui étaient les quatre autres ?",
          consequence: "Sam révèle les noms des lignées gardiennes.",
          unlocks: 'lignees-gardiennes-originales'
        },
        {
          id: 'sam-chute-repeter',
          text: "Est-ce que ça peut se reproduire ?",
          consequence: "Sam vous regarde avec une pitié infinie. 'C'est déjà en train de se produire.'",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 1 }]
        }
      ]
    },
    {
      id: 'sam-peur-ombres',
      npcId: 'npc:neutral:vieux-sam',
      trigger: 'Sam terrifié la nuit',
      tone: 'nerveux',
      conditions: { timeOfDay: 'nuit' },
      lines: [
        "*recroquevillé dans une ruelle, tremblant* Non non non non non... Elles sont là. Vous ne les voyez pas mais elles sont là. Dans les coins. Dans les ombres sous les escaliers.",
        "*s'agrippe à votre bras* Ne les regardez pas ! Si vous les regardez, elles savent que vous les voyez. Et alors... alors elles viennent.",
        "*murmure* Elles sont plus nombreuses chaque nuit. Avant, il y en avait trois ou quatre. Maintenant... des dizaines. Le mur s'amincit."
      ],
      playerResponses: [
        {
          id: 'sam-peur-lumiere',
          text: "*Allumer une torche ou un sort de lumière*",
          consequence: "Les ombres reculent. Sam se calme un peu mais reste terrifié.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 1 }]
        },
        {
          id: 'sam-peur-amener',
          text: "Venez, je vous emmène quelque part de sûr.",
          consequence: "Sam accepte d'aller au Temple de Solarius ou au Sanglier Doré.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 3 }],
          unlocks: 'sam-en-securite'
        },
        {
          id: 'sam-peur-observer',
          text: "*Observer les ombres que Sam désigne* (Perception DC 18)",
          consequence: "Test de Perception pour voir ce que Sam voit.",
          skillCheck: { skill: 'Perception', dc: 18, success: "Pendant un instant horrifiant, vous les voyez. Des formes dans les ombres. Sam a raison.", failure: "Rien. Mais un frisson inexplicable vous parcourt." }
        }
      ]
    },
    {
      id: 'sam-gratitude',
      npcId: 'npc:neutral:vieux-sam',
      trigger: 'Sam remercie d\'avoir été aidé',
      tone: 'amical',
      conditions: { customFlag: 'sam-aide' },
      lines: [
        "*tient la couverture serrée, yeux humides* Personne... personne ne fait ça. Vingt ans dans ces rues et personne ne m'a jamais regardé comme une personne.",
        "Vous voulez que je vous dise un secret ? Un vrai, pas mes divagations. *regarde à gauche et à droite* Il y a une femme au palais. Belle, riche, toujours souriante. Dame Céleste, ils l'appellent. Les ombres l'adorent. Elle pue la magie noire.",
        "Faites attention à elle. Les ombres dansent autour d'elle comme des chiots autour de leur maître."
      ],
      playerResponses: [
        {
          id: 'sam-grat-celeste',
          text: "Dame Céleste ? Que savez-vous d'autre sur elle ?",
          consequence: "Sam décrit les comportements suspects qu'il a observés.",
          unlocks: 'preuves-celeste-sam'
        },
        {
          id: 'sam-grat-proteger',
          text: "Sam, si vous observez d'autres choses, venez nous voir au Sanglier Doré.",
          consequence: "Sam devient un informateur précieux.",
          unlocks: 'sam-informateur'
        }
      ]
    },
    {
      id: 'sam-prophetie',
      npcId: 'npc:neutral:vieux-sam',
      trigger: 'Sam fait une prophétie',
      tone: 'mystérieux',
      conditions: { actNumber: 2, reputationMin: 6 },
      lines: [
        "*Sam est immobile, yeux blancs, voix qui n'est pas la sienne* L'Ombre et la Lumière se regardent à travers le voile. Cinq deviennent trois, trois deviennent un, et l'un s'ouvre sur le Néant.",
        "Le sang d'Isolde coule encore dans les veines du monde. Mais le sang s'épuise. Quand la dernière goutte tombera, la porte s'ouvrira et celui qui fut enchaîné marchera de nouveau parmi les vivants.",
        "Cherchez la chanteuse dans le temple noyé. Cherchez le roi sous la montagne. Cherchez la vérité dans les yeux du traître. Car le traître vous aime, et c'est pourquoi la trahison sera si cruelle.",
        "*revient à lui, hagard* Qu'est-ce que... qu'est-ce que j'ai dit ?"
      ],
      playerResponses: [
        {
          id: 'sam-prophetie-noter',
          text: "*Noter soigneusement chaque mot de la prophétie*",
          consequence: "Prophétie enregistrée. Indices majeurs pour les Actes 3 à 5.",
          unlocks: 'prophetie-sam-complete'
        },
        {
          id: 'sam-prophetie-traitre',
          text: "'Le traître vous aime'... Qui parmi nos alliés pourrait nous trahir ?",
          consequence: "Sam ne se souvient de rien. Mais l'indice est planté pour Séraphina.",
          unlocks: 'indice-trahison'
        },
        {
          id: 'sam-prophetie-aider',
          text: "Sam, ça va ? Vous avez besoin de quelque chose ?",
          consequence: "Sam tremble. 'De l'eau... s'il vous plaît...'",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 2 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 5. LYSANDRA - Espionne de l'Aube d'Argent
// ============================================================================

const LYSANDRA_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:ally:lysandra',
  npcName: 'Lysandra',
  npcTitle: 'Agente de l\'Aube d\'Argent',
  act: 1,
  dialogues: [
    {
      id: 'lysandra-briefing',
      npcId: 'npc:ally:lysandra',
      trigger: 'premier briefing avec Lysandra',
      tone: 'confidentiel',
      conditions: { actNumber: 1, questCompleted: ['quest:disparitions-ventclair'] },
      lines: [
        "*apparaît de nulle part dans une ruelle sombre* Ne sursautez pas. Je suis de votre côté. Pour l'instant.",
        "Je m'appelle Lysandra. L'Aube d'Argent — vous en avez entendu parler ? Non ? Tant mieux. Ça veut dire qu'on fait bien notre travail. Nous surveillons les menaces que la garde ne voit pas.",
        "Vous avez remué la fourmilière à Ventclair, et maintenant les fourmis paniquent. J'ai besoin que vous soyez mes yeux et mes oreilles au prochain gala de Dame Céleste. Observez, écoutez, ne touchez à rien."
      ],
      playerResponses: [
        {
          id: 'lysandra-brief-accepter',
          text: "Le gala de Dame Céleste ? Qu'est-ce qu'on cherche ?",
          consequence: "Lysandra donne les détails de la mission d'infiltration.",
          questStarted: 'quest:gala-celeste',
          reputationChange: [{ faction: 'aube-argent', amount: 2 }]
        },
        {
          id: 'lysandra-brief-confiance',
          text: "Pourquoi devrait-on vous faire confiance ?",
          consequence: "Lysandra sourit. 'Bonne question. La confiance se mérite.'",
          nextDialogue: 'lysandra-rapport-code'
        },
        {
          id: 'lysandra-brief-refuser',
          text: "On ne travaille pas pour des inconnus dans les ruelles.",
          consequence: "Lysandra hausse les épaules. 'Dommage. Les gens de Ventclair comptaient sur vous.'",
          reputationChange: [{ faction: 'aube-argent', amount: -2 }]
        }
      ]
    },
    {
      id: 'lysandra-rapport-code',
      npcId: 'npc:ally:lysandra',
      trigger: 'échange d\'informations codé',
      tone: 'confidentiel',
      conditions: { questCompleted: ['quest:gala-celeste'] },
      lines: [
        "*dans un endroit convenu, change de perruque en parlant* Rapport. Qu'avez-vous observé au gala ?",
        "*écoute attentivement, prenant des notes dans un code indéchiffrable* Intéressant. Ce que vous décrivez confirme nos soupçons. Dame Céleste n'est pas une simple noble corrompue.",
        "Nous pensons qu'elle est l'intermédiaire principale entre le Cercle d'Ombre et quelqu'un au sein même du palais. L'argent, les faveurs, les informations — tout passe par elle."
      ],
      playerResponses: [
        {
          id: 'lysandra-rapport-palais',
          text: "Quelqu'un au palais ? Qui ?",
          consequence: "Lysandra ne sait pas encore. C'est la prochaine étape.",
          questStarted: 'quest:taupe-palais'
        },
        {
          id: 'lysandra-rapport-preuve',
          text: "Des preuves ? On ne peut pas accuser sans preuves.",
          consequence: "Lysandra approuve. Elle donne un moyen de récupérer des documents.",
          unlocks: 'methode-infiltration-celeste'
        },
        {
          id: 'lysandra-rapport-lysandra',
          text: "Et vous ? Qui êtes-vous vraiment, Lysandra ?",
          consequence: "Un sourire énigmatique. 'Un autre jour, peut-être.'",
          nextDialogue: 'lysandra-flirt'
        }
      ]
    },
    {
      id: 'lysandra-flirt',
      npcId: 'npc:ally:lysandra',
      trigger: 'Lysandra en mode manipulation/flirt',
      tone: 'séducteur',
      conditions: { reputationMin: 4 },
      lines: [
        "*s'approche, voix basse et suave* Vous êtes curieux, n'est-ce pas ? C'est... rafraîchissant. La plupart des gens préfèrent ne pas poser de questions.",
        "Dans mon métier, on apprend à lire les gens. Leurs peurs, leurs désirs, ce qui les fait agir. Et vous... *incline la tête* ...vous êtes difficile à lire. J'aime ça.",
        "Mais attention — *pose un doigt sur vos lèvres* — la curiosité est une lame à double tranchant. Plus vous en savez sur moi, plus je suis en danger. Et plus vous l'êtes aussi."
      ],
      playerResponses: [
        {
          id: 'lysandra-flirt-jouer',
          text: "Je peux prendre des risques pour quelqu'un qui en vaut la peine.",
          consequence: "Lysandra rit. 'Charmant. Mais ne confondez pas le jeu et la réalité.'",
          reputationChange: [{ faction: 'aube-argent', amount: 1 }]
        },
        {
          id: 'lysandra-flirt-froid',
          text: "Épargnez-moi la manipulation. Je ne suis pas une cible.",
          consequence: "Lysandra recule, surprise mais impressionnée.",
          reputationChange: [{ faction: 'aube-argent', amount: 2 }],
          nextDialogue: 'lysandra-verite'
        },
        {
          id: 'lysandra-flirt-insight',
          text: "(Perspicacité DC 16) Ce n'est pas de la séduction. Vous testez si je suis manipulable.",
          consequence: "Test de Perspicacité pour percer le jeu de Lysandra.",
          skillCheck: { skill: 'Perspicacité', dc: 16, success: "Lysandra sourit. 'Enfin quelqu'un qui comprend.' Respect gagné.", failure: "Lysandra ne laisse rien paraître. 'Pensez ce que vous voulez.'" }
        }
      ]
    },
    {
      id: 'lysandra-verite',
      npcId: 'npc:ally:lysandra',
      trigger: 'Lysandra révèle son passé',
      tone: 'triste',
      conditions: { reputationMin: 10 },
      lines: [
        "*sans perruque, sans maquillage, visage nu* Vous voulez la vérité ? La voilà. Je m'appelle Lysandra Voss. Oui, Voss. Comme Samuel Voss — le Vieux Sam.",
        "C'est mon père. L'homme le plus brillant que j'aie jamais connu, détruit par ce qu'il a découvert. J'avais douze ans quand il a sombré. Ma mère est morte de chagrin un an après.",
        "J'ai rejoint l'Aube d'Argent pour une seule raison : trouver ce qui a brisé l'esprit de mon père et le détruire. Le Cercle d'Ombre, les Enchaînés, Malachar — c'est personnel."
      ],
      playerResponses: [
        {
          id: 'lysandra-verite-sam',
          text: "Votre père sait-il que vous êtes en vie ?",
          consequence: "Lysandra secoue la tête. 'Il ne me reconnaîtrait pas.'",
          unlocks: 'reunion-sam-lysandra'
        },
        {
          id: 'lysandra-verite-soutien',
          text: "Nous partageons le même ennemi. On le vaincra ensemble.",
          consequence: "Premier vrai sourire de Lysandra. Alliance profonde formée.",
          reputationChange: [{ faction: 'aube-argent', amount: 5 }],
          unlocks: 'alliance-lysandra-profonde'
        },
        {
          id: 'lysandra-verite-danger',
          text: "La vengeance personnelle peut obscurcir le jugement.",
          consequence: "Lysandra se raidit. 'C'est exactement ce qui me garde lucide.'",
          reputationChange: [{ faction: 'aube-argent', amount: 1 }]
        }
      ]
    },
    {
      id: 'lysandra-trahison-possible',
      npcId: 'npc:ally:lysandra',
      trigger: 'Lysandra envisage de trahir l\'Aube',
      tone: 'conspirateur',
      conditions: { actNumber: 2, reputationMin: 6, customFlag: 'offre-cercle-ombre' },
      lines: [
        "*nerveuse, regarde constamment par-dessus son épaule* Le Cercle d'Ombre m'a contactée. Ils savent qui je suis. Ils savent pour l'Aube.",
        "Mais au lieu de me tuer, ils m'ont proposé un marché. Ils disent qu'ils peuvent guérir mon père. Restaurer son esprit. En échange de... en échange de vous. Votre position, vos plans.",
        "Je n'ai pas dit oui. Mais je n'ai pas dit non. *ses mains tremblent* Dites-moi quoi faire. Parce que seule... seule je ferai le mauvais choix."
      ],
      playerResponses: [
        {
          id: 'lysandra-trahison-refuser',
          text: "C'est un piège, Lysandra. Ils mentent pour vous manipuler.",
          consequence: "Lysandra acquiesce lentement. La crise est évitée.",
          reputationChange: [{ faction: 'aube-argent', amount: 3 }]
        },
        {
          id: 'lysandra-trahison-piege',
          text: "Dites oui. Mais donnez-leur de fausses informations. On retourne le piège.",
          consequence: "Plan de contre-espionnage. Mission dangereuse mais lucrative.",
          questStarted: 'quest:double-agent',
          unlocks: 'plan-contre-espionnage'
        },
        {
          id: 'lysandra-trahison-comprendre',
          text: "On trouvera un autre moyen de guérir votre père. Je vous le promets.",
          consequence: "Lysandra est au bord des larmes mais choisit la loyauté.",
          reputationChange: [{ faction: 'aube-argent', amount: 5 }],
          questStarted: 'quest:guerir-sam'
        }
      ]
    },
    {
      id: 'lysandra-loyaute',
      npcId: 'npc:ally:lysandra',
      trigger: 'Lysandra prouve sa loyauté',
      tone: 'solennel',
      conditions: { reputationMin: 12 },
      lines: [
        "*vous tend une dague ornée du symbole de l'Aube d'Argent* Dans notre ordre, ceci est le signe ultime de confiance. On ne donne sa lame qu'une fois dans sa vie.",
        "Vous m'avez sauvée de moi-même. De la vengeance aveugle, de la trahison par désespoir. Je ne sais pas comment cette guerre finira, mais je sais de quel côté je serai.",
        "Si un jour je dois donner ma vie pour protéger ce que nous défendons... je le ferai sans hésiter. Et si un jour VOUS avez besoin de moi, peu importe où, peu importe quand — je viendrai."
      ],
      playerResponses: [
        {
          id: 'lysandra-loyaute-accepter',
          text: "*Accepter la dague avec respect* Ce lien est réciproque.",
          consequence: "Lysandra comme alliée permanente. Avantages d'espionnage.",
          itemReceived: 'dague-aube-argent',
          reputationChange: [{ faction: 'aube-argent', amount: 5 }],
          unlocks: 'lysandra-alliee-permanente'
        },
        {
          id: 'lysandra-loyaute-pere',
          text: "Avant tout, allons voir votre père ensemble.",
          consequence: "Scène émouvante de retrouvailles. Sam reconnaît brièvement sa fille.",
          unlocks: 'reunion-sam-lysandra-scene'
        }
      ]
    },
    {
      id: 'lysandra-infiltration-2',
      npcId: 'npc:ally:lysandra',
      trigger: 'briefing pour mission majeure',
      tone: 'confidentiel',
      conditions: { actNumber: 2, reputationMin: 8 },
      lines: [
        "*déploie un plan détaillé* J'ai trouvé l'entrepôt principal du Cercle d'Ombre. Sous les docks, derrière la poissonnerie de Gérard. L'ironie de se cacher derrière une odeur de poisson...",
        "Sécurité : deux gardes à la porte, un mage à l'intérieur, et probablement des pièges. Le mage change tous les trois jours. La fenêtre d'opportunité est cette nuit.",
        "Je peux vous faire entrer, mais je ne peux pas rester. Si on me voit là-bas, toute ma couverture saute. Vous êtes seuls à l'intérieur."
      ],
      playerResponses: [
        {
          id: 'lysandra-infil2-plan',
          text: "Expliquez-nous le plan en détail.",
          consequence: "Lysandra donne un plan d'infiltration complet.",
          questStarted: 'quest:entrepot-cercle-ombre',
          unlocks: 'plan-infiltration-docks'
        },
        {
          id: 'lysandra-infil2-risque',
          text: "Et si ça tourne mal ?",
          consequence: "Lysandra donne un point de repli et un signal de détresse.",
          unlocks: 'plan-extraction-urgence'
        }
      ]
    },
    {
      id: 'lysandra-adieu-acte2',
      npcId: 'npc:ally:lysandra',
      trigger: 'adieux à la fin de l\'Acte 2',
      tone: 'triste',
      conditions: { actNumber: 2, customFlag: 'depart-eldoria', reputationMin: 8 },
      lines: [
        "*sans déguisement, dans un endroit isolé* Je ne peux pas venir avec vous. Pas encore. Il reste du travail ici — le Cercle a des cellules dormantes que je dois démanteler.",
        "Mais quand vous aurez besoin de moi... *tapote la dague jumelle à sa ceinture* ...vous le saurez. Nous sommes liés maintenant.",
        "*hésite, puis vous enlace brièvement* Revenez en vie. S'il vous plaît."
      ],
      playerResponses: [
        {
          id: 'lysandra-adieu-promesse',
          text: "Prenez soin de votre père.",
          consequence: "Lysandra acquiesce. 'Je le ferai. Pour la première fois depuis vingt ans.'",
          reputationChange: [{ faction: 'aube-argent', amount: 3 }]
        },
        {
          id: 'lysandra-adieu-mission',
          text: "Continuez le travail. On se retrouve de l'autre côté.",
          consequence: "Lysandra se redresse, redevient l'espionne. 'Comptez-y.'",
          reputationChange: [{ faction: 'aube-argent', amount: 2 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 6. FRÈRE ALDWIN - Prêtre de Solarius
// ============================================================================

const ALDWIN_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:ally:aldwin',
  npcName: 'Frère Aldwin',
  npcTitle: 'Prêtre de Solarius, guérisseur du Temple de l\'Aube',
  act: 1,
  dialogues: [
    {
      id: 'aldwin-benediction',
      npcId: 'npc:ally:aldwin',
      trigger: 'visite au Temple de l\'Aube',
      tone: 'amical',
      conditions: {},
      lines: [
        "*en robe dorée, visage chaleureux et ouvert* Que la lumière de Solarius éclaire votre chemin, voyageurs. Je suis Frère Aldwin, humble serviteur du dieu-soleil.",
        "Le temple est ouvert à tous — croyants, sceptiques, et ceux qui cherchent simplement un toit. En ces temps sombres, la lumière ne fait pas de distinction.",
        "Puis-je vous offrir une bénédiction ? Elle ne coûte rien, si ce n'est un moment de paix."
      ],
      playerResponses: [
        {
          id: 'aldwin-bened-accepter',
          text: "Nous acceptons votre bénédiction, Frère Aldwin.",
          consequence: "Bénédiction de Solarius : +1 aux jets de sauvegarde pendant 24h.",
          reputationChange: [{ faction: 'temple-solarius', amount: 1 }]
        },
        {
          id: 'aldwin-bened-aide',
          text: "Nous avons plutôt besoin d'aide concrète.",
          consequence: "Aldwin ne se vexe pas et offre ses services.",
          nextDialogue: 'aldwin-guerison'
        },
        {
          id: 'aldwin-bened-info',
          text: "Les ombres s'épaississent, Frère. Que sait le Temple ?",
          consequence: "Aldwin devient sérieux et invite à parler en privé.",
          nextDialogue: 'aldwin-magie-divine'
        }
      ]
    },
    {
      id: 'aldwin-sermon',
      npcId: 'npc:ally:aldwin',
      trigger: 'assister au sermon d\'Aldwin',
      tone: 'inspirant',
      conditions: { timeOfDay: 'jour' },
      lines: [
        "*devant l'autel, voix qui porte* Mes frères et soeurs, la nuit est longue. Je le sais. Vous avez peur. Vos enfants ont peur. Et je ne vais pas vous mentir en disant qu'il n'y a rien à craindre.",
        "Mais rappelez-vous ceci : Solarius se lève chaque matin. CHAQUE matin. Même quand les nuages sont si épais que vous pensez que la lumière a disparu pour toujours, elle est là, derrière, qui attend.",
        "Nous sommes cette lumière pour nos voisins. Quand vous souriez à un étranger effrayé, quand vous partagez votre pain avec celui qui a faim, quand vous tenez la main de celui qui tremble — vous êtes les rayons de Solarius sur cette terre."
      ],
      playerResponses: [
        {
          id: 'aldwin-sermon-inspire',
          text: "*Écouter le sermon avec attention*",
          consequence: "Inspiration divine. Bonus temporaire de moral.",
          reputationChange: [{ faction: 'temple-solarius', amount: 1 }]
        },
        {
          id: 'aldwin-sermon-apres',
          text: "*Attendre la fin du sermon pour parler en privé*",
          consequence: "Aldwin vous rejoint après et est plus disponible.",
          nextDialogue: 'aldwin-doute-foi'
        }
      ]
    },
    {
      id: 'aldwin-doute-foi',
      npcId: 'npc:ally:aldwin',
      trigger: 'Aldwin doute de sa foi',
      tone: 'triste',
      conditions: { reputationMin: 6, actNumber: 2 },
      lines: [
        "*seul dans la chapelle, bougie presque éteinte* Oh, vous êtes là. Je... pardon. Ce n'est pas un bon moment.",
        "J'ai prié toute la nuit. Toute la nuit pour les victimes de l'attaque de la porte sud. Et Solarius n'a pas répondu. Le silence... le silence est pire que la colère divine.",
        "Comment puis-je dire aux gens de garder la foi quand... quand même moi je commence à douter ? Quand les prières restent sans réponse et que les ténèbres gagnent du terrain chaque jour ?"
      ],
      playerResponses: [
        {
          id: 'aldwin-doute-foi-soutien',
          text: "La foi n'est pas l'absence de doute, Frère. C'est continuer malgré le doute.",
          consequence: "Aldwin est touché. Il retrouve un semblant de force.",
          reputationChange: [{ faction: 'temple-solarius', amount: 3 }]
        },
        {
          id: 'aldwin-doute-foi-action',
          text: "Les dieux aident ceux qui agissent. Priez moins, agissez plus.",
          consequence: "Aldwin est secoué mais reconnaît la vérité. Il se lève.",
          reputationChange: [{ faction: 'temple-solarius', amount: 2 }],
          nextDialogue: 'aldwin-sacrifice'
        },
        {
          id: 'aldwin-doute-foi-ecouter',
          text: "*S'asseoir à côté de lui en silence*",
          consequence: "Le silence partagé est un réconfort. Lien renforcé.",
          reputationChange: [{ faction: 'temple-solarius', amount: 4 }]
        }
      ]
    },
    {
      id: 'aldwin-guerison',
      npcId: 'npc:ally:aldwin',
      trigger: 'demande de guérison',
      tone: 'amical',
      conditions: {},
      lines: [
        "*examine les blessures avec des mains qui brillent doucement* Laissez-moi voir... Oui, ce n'est pas joli, mais Solarius peut arranger ça.",
        "*murmure une prière, lumière dorée* La guérison divine n'est pas instantanée comme dans les contes. Elle accélère ce que le corps fait naturellement. Vous sentirez une chaleur, puis un soulagement.",
        "Mais n'allez pas vous faire blesser exprès juste parce que vous savez que je peux vous soigner, hein ? *sourire* J'ai déjà assez de travail."
      ],
      playerResponses: [
        {
          id: 'aldwin-guerison-merci',
          text: "Merci, Frère Aldwin. Combien vous doit-on ?",
          consequence: "'La guérison de Solarius est gratuite. Un don au temple est bienvenu mais pas obligatoire.'",
          reputationChange: [{ faction: 'temple-solarius', amount: 1 }]
        },
        {
          id: 'aldwin-guerison-questions',
          text: "Comment fonctionne la magie divine exactement ?",
          consequence: "Aldwin est ravi d'expliquer. Cours de théologie improvisé.",
          nextDialogue: 'aldwin-magie-divine'
        }
      ]
    },
    {
      id: 'aldwin-magie-divine',
      npcId: 'npc:ally:aldwin',
      trigger: 'explication de la magie divine',
      tone: 'amical',
      conditions: {},
      lines: [
        "*les yeux brillants de passion académique* Ah, la magie divine ! La plupart des gens pensent que c'est comme la magie arcanique — des formules et de la volonté. Mais c'est fondamentalement différent.",
        "La magie divine est un canal. Solarius EST lumière, chaleur, vie. Quand je prie, je ne 'lance' pas un sort — j'ouvre un passage entre sa lumière et notre monde. Je suis un prisme, pas une source.",
        "C'est pour cela que la foi est essentielle. Sans foi, le canal se ferme. Et c'est aussi pour cela que les prêtres qui perdent la foi perdent leurs pouvoirs. Le doute est l'ennemi du prisme.",
        "*plus sombre* Et c'est pour cela que ce qui arrive est si inquiétant. Certains de nos rituels les plus anciens... ne fonctionnent plus. Comme si quelque chose bloquait le canal."
      ],
      playerResponses: [
        {
          id: 'aldwin-magie-bloquer',
          text: "Quelque chose bloque le lien avec Solarius ? Est-ce lié aux Sceaux ?",
          consequence: "Aldwin pâlit. Il n'avait pas fait le lien, mais c'est évident maintenant.",
          unlocks: 'lien-sceaux-magie-divine',
          questAdvanced: 'quest:proteger-sceaux'
        },
        {
          id: 'aldwin-magie-apprendre',
          text: "Pourriez-vous nous enseigner à canaliser la lumière ?",
          consequence: "Aldwin propose un entraînement limité mais utile.",
          unlocks: 'formation-lumiere-basique'
        }
      ]
    },
    {
      id: 'aldwin-sacrifice',
      npcId: 'npc:ally:aldwin',
      trigger: 'Aldwin envisage le sacrifice',
      tone: 'solennel',
      conditions: { actNumber: 2, reputationMin: 10, customFlag: 'siege-eldoria' },
      lines: [
        "*en armure de prêtre-guerrier, marteau sacré à la main* J'ai lu les Écritures de la Dernière Aube cette nuit. Le chapitre que personne ne cite dans les sermons.",
        "Il parle d'un rituel. Le Sacrifice de l'Aube. Un prêtre peut canaliser toute la lumière de Solarius en lui, devenir un soleil vivant pendant quelques instants. Assez pour purifier une armée d'ombres.",
        "Le prêtre ne survit pas. *vous regarde avec calme* Si le moment vient... si c'est le seul moyen de sauver ces gens... ne m'en empêchez pas."
      ],
      playerResponses: [
        {
          id: 'aldwin-sacrifice-refuser',
          text: "Il y a toujours un autre moyen. On ne vous laissera pas faire ça.",
          consequence: "Aldwin sourit tristement. 'J'espère que vous avez raison.'",
          reputationChange: [{ faction: 'temple-solarius', amount: 3 }]
        },
        {
          id: 'aldwin-sacrifice-accepter',
          text: "Si c'est votre choix, nous le respecterons. Mais en dernier recours seulement.",
          consequence: "Aldwin acquiesce avec gratitude. Le plan est établi.",
          unlocks: 'plan-sacrifice-aldwin'
        },
        {
          id: 'aldwin-sacrifice-alternative',
          text: "Et si PLUSIEURS prêtres canalisaient ensemble ? Moins de puissance mais tous survivent ?",
          consequence: "Aldwin n'y avait pas pensé. Recherche nécessaire mais prometteuse.",
          questStarted: 'quest:rituel-collectif',
          unlocks: 'rituel-aube-collective'
        }
      ]
    },
    {
      id: 'aldwin-confession',
      npcId: 'npc:ally:aldwin',
      trigger: 'confession secrète d\'Aldwin',
      tone: 'confidentiel',
      conditions: { reputationMin: 12 },
      lines: [
        "*dans le confessionnal, voix basse* Je... j'ai quelque chose à confesser. Pas en tant que prêtre, mais en tant qu'homme.",
        "Avant de rejoindre le Temple, j'étais soldat. Un bon soldat. Trop bon. J'ai tué des gens, beaucoup de gens, et je n'en éprouvais rien. Rien du tout.",
        "C'est pour ça que j'ai choisi Solarius. Pour apprendre à ressentir. Pour transformer ces mains qui prenaient la vie en mains qui la donnent. Mais parfois... la nuit... le soldat revient.",
        "Si les Ombres viennent... le soldat sera utile. Mais j'ai peur de le laisser sortir. Peur de redevenir ce que j'étais."
      ],
      playerResponses: [
        {
          id: 'aldwin-confess-accepter',
          text: "Le soldat et le prêtre ne sont pas ennemis. Les deux sont nécessaires.",
          consequence: "Aldwin trouve la paix avec son dualité. Plus fort au combat.",
          reputationChange: [{ faction: 'temple-solarius', amount: 5 }],
          unlocks: 'aldwin-pretre-guerrier'
        },
        {
          id: 'aldwin-confess-passe',
          text: "Qu'est-ce qui s'est passé pour que vous quittiez l'armée ?",
          consequence: "Aldwin révèle qu'il a refusé un ordre de massacrer un village.",
          unlocks: 'passe-aldwin-complet'
        }
      ]
    }
  ]
};

// ============================================================================
// 7. MAÎTRE ARCHIVISTE THÉODORE - Érudit
// ============================================================================

const THEODORE_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:neutral:theodore',
  npcName: 'Maître Archiviste Théodore',
  npcTitle: 'Gardien des Archives Royales d\'Eldoria',
  act: 1,
  dialogues: [
    {
      id: 'theodore-expose',
      npcId: 'npc:neutral:theodore',
      trigger: 'consultation des archives',
      tone: 'amical',
      conditions: {},
      lines: [
        "*entouré de piles de livres, lunettes sur le nez, cheveux en désordre* Ah ! Des visiteurs ! Merveilleux, merveilleux. Je suis Théodore, Maître Archiviste. Pardon pour le désordre — c'est un système, je vous assure. Un système que moi seul comprends.",
        "Les Archives Royales contiennent neuf mille sept cent quarante-trois volumes, plus les manuscrits non classés, les cartes, et une collection de prophéties que personne ne prend au sérieux — à tort, si vous voulez mon avis.",
        "Que puis-je faire pour vous ? Si c'est un sujet historique, je suis votre homme. Si c'est de la fiction romantique, deuxième étage, rayon du fond."
      ],
      playerResponses: [
        {
          id: 'theodore-expose-sceaux',
          text: "Nous cherchons tout ce que vous avez sur les Sceaux des Enchaînés.",
          consequence: "Théodore s'illumine d'excitation académique.",
          nextDialogue: 'theodore-decouverte'
        },
        {
          id: 'theodore-expose-chute',
          text: "Que disent les archives sur la Première Chute ?",
          consequence: "Théodore est ravi de cette question. Long exposé historique.",
          unlocks: 'historique-premiere-chute'
        },
        {
          id: 'theodore-expose-carte',
          text: "Avez-vous des cartes anciennes de la région ?",
          consequence: "Théodore produit des cartes fascinantes avec des annotations.",
          unlocks: 'cartes-anciennes'
        }
      ]
    },
    {
      id: 'theodore-decouverte',
      npcId: 'npc:neutral:theodore',
      trigger: 'Théodore fait une découverte',
      tone: 'jovial',
      conditions: { previousDialogue: 'theodore-expose' },
      lines: [
        "*yeux écarquillés, agite un parchemin* J'AI TROUVÉ ! Enfin ! Trois mois que je cherche et c'était dans la section des registres de cuisine — CUISINE ! Quelqu'un l'a mal classé il y a probablement deux siècles !",
        "C'est un journal. Le journal d'Aldric le Scribe, qui a assisté au Scellement original. Il décrit le rituel, les cinq champions, les composants nécessaires !",
        "Écoutez ceci — *ajuste ses lunettes* — le rituel nécessite cinq éléments : du sang de chaque lignée gardienne, un cristal de lumière pure, les larmes d'un esprit ancien, le chant d'une voix vierge de magie, et... *pâlit* ...le consentement de l'Enchaîné lui-même."
      ],
      playerResponses: [
        {
          id: 'theodore-decouv-consent',
          text: "Le consentement de l'Enchaîné ? Comment obtient-on ça ?",
          consequence: "Théodore ne sait pas. Mais c'est dans les archives scellées.",
          questAdvanced: 'quest:archives-scellees'
        },
        {
          id: 'theodore-decouv-composants',
          text: "On peut trouver ces composants ? Où ?",
          consequence: "Théodore commence une liste détaillée d'emplacements possibles.",
          unlocks: 'liste-composants-rituel',
          questStarted: 'quest:composants-rituel'
        },
        {
          id: 'theodore-decouv-copie',
          text: "Faites-en une copie. L'original doit être mis en sécurité.",
          consequence: "Théodore approuve et fait trois copies.",
          unlocks: 'copie-journal-aldric'
        }
      ]
    },
    {
      id: 'theodore-avertissement',
      npcId: 'npc:neutral:theodore',
      trigger: 'avertissement de Théodore',
      tone: 'nerveux',
      conditions: { actNumber: 2 },
      lines: [
        "*porte fermée à clé, parle vite* Mes recherches m'ont mené dans des recoins des archives que je n'aurais jamais dû explorer. Il y a une section scellée, sous le bâtiment principal. Scellée par la magie royale.",
        "J'ai trouvé un moyen d'y accéder — ne me demandez pas comment. Et ce que j'ai lu là-dessous... les Enchaînés ne sont pas ce que nous pensons.",
        "Ce ne sont pas des démons. Ce ne sont pas des dieux maléfiques. Ce sont... nous. Des versions de nous, d'un autre cycle du monde. Ils ont été les héros de leur époque, corrompus par le pouvoir qu'ils ont utilisé pour sauver leur monde. Et Malachar... Malachar était leur Isolde."
      ],
      playerResponses: [
        {
          id: 'theodore-avert-preuves',
          text: "Des preuves ? Montrez-nous ces documents.",
          consequence: "Théodore mène le groupe aux archives scellées.",
          questAdvanced: 'quest:archives-scellees',
          unlocks: 'acces-archives-scellees'
        },
        {
          id: 'theodore-avert-implique',
          text: "Si Malachar était un héros corrompu... est-ce que ça peut arriver à n'importe qui ?",
          consequence: "Théodore acquiesce gravement. Question philosophique majeure.",
          unlocks: 'revelation-nature-enchaines'
        },
        {
          id: 'theodore-avert-secret',
          text: "Gardez ça secret. Si cette information fuit, la panique sera totale.",
          consequence: "Théodore promet le silence mais est visiblement inquiet.",
          reputationChange: [{ faction: 'archives-royales', amount: 2 }]
        }
      ]
    },
    {
      id: 'theodore-puzzle',
      npcId: 'npc:neutral:theodore',
      trigger: 'Théodore a besoin d\'aide pour un puzzle',
      tone: 'mystérieux',
      conditions: { actNumber: 2, reputationMin: 5 },
      lines: [
        "*entouré de fragments de pierre avec des inscriptions* Ce casse-tête me rend fou depuis une semaine. Ces fragments proviennent du site de l'ancien temple de Ventclair.",
        "Quand on les assemble correctement, ils forment une carte. Mais il y a neuf pièces et je ne peux identifier que six positions avec certitude. Les trois restantes pourraient aller n'importe où.",
        "J'ai besoin d'esprits frais. Peut-être que des yeux d'aventuriers verront ce qu'un vieil érudit ne voit pas."
      ],
      playerResponses: [
        {
          id: 'theodore-puzzle-essayer',
          text: "*Examiner les fragments* (Intelligence DC 14)",
          consequence: "Puzzle intellectuel pour les joueurs.",
          skillCheck: { skill: 'Intelligence', dc: 14, success: "Un fragment s'emboîte parfaitement. La carte révèle un emplacement secret.", failure: "Les fragments résistent à la logique. Peut-être faut-il une autre approche." }
        },
        {
          id: 'theodore-puzzle-magie',
          text: "Et si on utilisait un sort de détection pour sentir la résonance entre les fragments ?",
          consequence: "Théodore est enthousiasmé par l'idée. Approche alternative.",
          skillCheck: { skill: 'Arcanes', dc: 12, success: "Les fragments vibrent et s'assemblent seuls. Carte complète révélée.", failure: "La magie perturbe les fragments. Résultat partiel." }
        }
      ]
    },
    {
      id: 'theodore-composant-rare',
      npcId: 'npc:neutral:theodore',
      trigger: 'Théodore a besoin d\'un composant rare',
      tone: 'suppliant',
      conditions: { actNumber: 2, previousDialogue: 'theodore-decouverte' },
      lines: [
        "Le rituel de Renouvellement nécessite de l'Encre de Vérité — un liquide fabriqué à partir de larmes de phénix et de poudre de cristal d'aube. Le dernier flacon connu se trouvait à l'Académie de Val-Azur.",
        "L'Académie est tombée il y a trois mois. Envahie par les Ombres. Mais les salles de conservation alchimique sont au sous-sol, protégées par des sceaux de préservation. Le flacon pourrait encore y être.",
        "Je sais que c'est dangereux. Mais sans cette encre, je ne peux pas traduire les passages protégés du journal d'Aldric. Et sans cette traduction..."
      ],
      playerResponses: [
        {
          id: 'theodore-comp-accepter',
          text: "L'Académie de Val-Azur. Donnez-nous un plan des lieux.",
          consequence: "Théodore fournit des plans détaillés de l'Académie.",
          questStarted: 'quest:encre-verite',
          unlocks: 'plans-academie-val-azur'
        },
        {
          id: 'theodore-comp-alternative',
          text: "Existe-t-il un substitut ? Un autre moyen de traduire ?",
          consequence: "Théodore réfléchit. Possible mais plus lent et moins fiable.",
          unlocks: 'methode-alternative-traduction'
        }
      ]
    }
  ]
};

// ============================================================================
// 8. ROI THORIN FORGE-FLAMME - Roi nain
// ============================================================================

const THORIN_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:noble:thorin',
  npcName: 'Roi Thorin Forge-Flamme',
  npcTitle: 'Roi de Karak-Dûm, Seigneur des Forges Éternelles',
  act: 2,
  dialogues: [
    {
      id: 'thorin-audience-formelle',
      npcId: 'npc:noble:thorin',
      trigger: 'première audience avec le roi nain',
      tone: 'solennel',
      conditions: { actNumber: 2, hasItem: 'insigne-couronne' },
      lines: [
        "*sur un trône de pierre et d'acier, couronne incrustée de rubis, barbe grise tressée de chaînes d'or* Des envoyés d'Eldoria. Voilà longtemps qu'un humain n'a foulé les salles de Karak-Dûm.",
        "Je suis Thorin, septième du nom, Forge-Flamme par le mérite et le sang. Mon peuple forge l'acier depuis que les vôtres apprenaient encore à tailler le silex.",
        "Vous portez l'insigne de la Couronne. La reine Elara vous envoie. Parlez. Mais sachez que les nains ne donnent rien qui ne soit mérité."
      ],
      playerResponses: [
        {
          id: 'thorin-audience-alliance',
          text: "Roi Thorin, les Ombres menacent tous les peuples. Nous venons proposer une alliance.",
          consequence: "Thorin écoute mais n'est pas convaincu. Il veut une preuve.",
          nextDialogue: 'thorin-test-valeur'
        },
        {
          id: 'thorin-audience-respect',
          text: "*S'incliner à la manière naine* Votre montagne est aussi imposante que votre légende, Roi.",
          consequence: "Thorin est surpris et favorablement impressionné.",
          reputationChange: [{ faction: 'karak-dum', amount: 3 }]
        },
        {
          id: 'thorin-audience-direct',
          text: "Pas de discours. Malachar se réveille. Les Sceaux cèdent. Si les nains ne se battent pas, ils mourront comme tout le monde.",
          consequence: "Thorin frappe du poing. Audace ou insulte ? Test de Charisme DC 16.",
          skillCheck: { skill: 'Charisme', dc: 16, success: "Thorin éclate de rire. 'Enfin quelqu'un qui parle nain !'", failure: "Thorin se lève, furieux. 'PERSONNE ne menace les nains dans leur propre salle !'" }
        }
      ]
    },
    {
      id: 'thorin-test-valeur',
      npcId: 'npc:noble:thorin',
      trigger: 'Thorin teste les héros',
      tone: 'menaçant',
      conditions: { previousDialogue: 'thorin-audience-formelle' },
      lines: [
        "*descend de son trône, tire une hache immense* Les mots sont du vent. Les nains croient aux actes. Vous voulez une alliance ? Prouvez que vous la méritez.",
        "Trois épreuves. La Force — combattez notre champion dans l'arène. L'Esprit — résolvez l'énigme de la Forge Ancienne. Le Coeur — descendez dans la Mine Profonde et ramenez ce qui s'y cache.",
        "Réussissez les trois, et Karak-Dûm marchera à vos côtés. Échouez... et repartez chez vous avec votre honte."
      ],
      playerResponses: [
        {
          id: 'thorin-test-accepter',
          text: "Nous acceptons les trois épreuves.",
          consequence: "Thorin sourit pour la première fois. Les épreuves commencent.",
          questStarted: 'quest:epreuves-karak-dum',
          reputationChange: [{ faction: 'karak-dum', amount: 2 }]
        },
        {
          id: 'thorin-test-negocier',
          text: "Pendant que nous passons des épreuves, les Ombres avancent. Le temps manque.",
          consequence: "Thorin réfléchit. Compromis : une seule épreuve, la plus difficile.",
          unlocks: 'epreuve-unique-mine-profonde'
        },
        {
          id: 'thorin-test-defier',
          text: "Affrontez-moi vous-même, Roi Thorin. Un combat entre chefs.",
          consequence: "Thorin écarquille les yeux, puis un respect profond s'installe.",
          reputationChange: [{ faction: 'karak-dum', amount: 5 }],
          unlocks: 'duel-thorin'
        }
      ]
    },
    {
      id: 'thorin-festin-alliance',
      npcId: 'npc:noble:thorin',
      trigger: 'festin célébrant l\'alliance',
      tone: 'jovial',
      conditions: { questCompleted: ['quest:epreuves-karak-dum'] },
      lines: [
        "*debout, chope géante de bière* PAR LA FORGE DE MES ANCÊTRES ! Buvez ! Buvez, amis des nains ! Ce soir, Karak-Dûm célèbre !",
        "Vous avez prouvé votre valeur dans l'arène, votre esprit dans la Forge, et votre coeur dans la Mine. Rares sont ceux — humains, elfes ou nains — qui peuvent en dire autant.",
        "*frappe sa chope contre la vôtre* Karak-Dûm honore sa parole. Cinq cents guerriers nains, deux cents ingénieurs de siège, et les forges tourneront jour et nuit pour armer vos troupes. L'Alliance est scellée dans l'acier !"
      ],
      playerResponses: [
        {
          id: 'thorin-festin-toast',
          text: "*Lever sa chope* À l'Alliance ! Et à la chute de Malachar !",
          consequence: "Les nains rugissent d'approbation. Alliance formelle scellée.",
          reputationChange: [{ faction: 'karak-dum', amount: 10 }],
          unlocks: 'alliance-karak-dum'
        },
        {
          id: 'thorin-festin-histoire',
          text: "Racontez-nous l'histoire de votre peuple, Roi Thorin.",
          consequence: "Thorin est ravi. Long récit épique autour du feu.",
          nextDialogue: 'thorin-histoire-peuple'
        }
      ]
    },
    {
      id: 'thorin-histoire-peuple',
      npcId: 'npc:noble:thorin',
      trigger: 'Thorin raconte l\'histoire naine',
      tone: 'solennel',
      conditions: { reputationMin: 8 },
      lines: [
        "*voix grave qui résonne dans les salles de pierre* Avant les royaumes humains, avant les forêts elfiques, il y avait la montagne. Et dans la montagne, le premier nain — Durgan, forgé par le feu de la terre elle-même.",
        "Durgan frappa la montagne et en tira le fer. Il frappa le fer et en fit une hache. Il frappa le monde et en fit un foyer. Nous sommes ses enfants, nés du feu et de la pierre.",
        "Lors de la Première Chute, c'est un nain — Brenn Bouclier-d'Acier — qui fut l'un des cinq champions. Il donna son sang pour le Sceau sous la montagne. Le Sceau que mon peuple garde depuis mille ans.",
        "Ce Sceau... *baisse la voix* ...il tremble. Pour la première fois en mille ans. C'est la vraie raison pour laquelle j'ai accepté cette alliance."
      ],
      playerResponses: [
        {
          id: 'thorin-histoire-sceau',
          text: "Le Sceau sous la montagne tremble ? Pouvons-nous le voir ?",
          consequence: "Thorin hésite longuement, puis accepte. Accès au Sceau nain.",
          unlocks: 'acces-sceau-montagne',
          questAdvanced: 'quest:proteger-sceaux'
        },
        {
          id: 'thorin-histoire-brenn',
          text: "Brenn Bouclier-d'Acier... y a-t-il des descendants ?",
          consequence: "Thorin vous regarde fixement. 'VOUS parlez au dernier descendant.'",
          unlocks: 'thorin-lignee-gardienne'
        }
      ]
    },
    {
      id: 'thorin-colere-trahi',
      npcId: 'npc:noble:thorin',
      trigger: 'réaction si Thorin est trahi ou déçu',
      tone: 'colérique',
      conditions: { customFlag: 'trahison-karak-dum' },
      lines: [
        "*hache levée, visage cramoisi de rage* VOUS OSEZ ? Vous venez dans MA montagne, vous buvez à MA table, et vous ME trahissez ?!",
        "Les nains n'oublient JAMAIS. Vous entendez ? JAMAIS ! Votre nom sera gravé dans la Pierre de la Honte, et dans mille ans, les enfants nains cracheront en l'entendant !",
        "SORTEZ ! Sortez de Karak-Dûm avant que je ne vous y enterre !"
      ],
      playerResponses: [
        {
          id: 'thorin-colere-expliquer',
          text: "Roi Thorin, laissez-nous expliquer ! Ce n'est pas ce que vous croyez !",
          consequence: "Test de Persuasion DC 20. Extrêmement difficile.",
          skillCheck: { skill: 'Persuasion', dc: 20, success: "Thorin écoute, mâchoire serrée. L'explication le calme partiellement.", failure: "Thorin refuse d'écouter. Bannissement de Karak-Dûm." }
        },
        {
          id: 'thorin-colere-accepter',
          text: "Vous avez raison d'être en colère. Comment pouvons-nous réparer ?",
          consequence: "Thorin est surpris par l'humilité. Épreuve de réparation possible.",
          unlocks: 'epreuve-reparation-thorin'
        }
      ]
    },
    {
      id: 'thorin-combat',
      npcId: 'npc:noble:thorin',
      trigger: 'Thorin se bat aux côtés du groupe',
      tone: 'jovial',
      conditions: { customFlag: 'bataille-commune' },
      lines: [
        "*charge en rugissant, hache tournoyante* KARAK-DÛM ! Pour la montagne et pour l'Alliance !",
        "*après avoir abattu un ennemi* Haha ! Vous avez vu ça ? C'est comme ça qu'on forge l'acier — on FRAPPE et on FRAPPE ENCORE !",
        "*essuie le sang de sa barbe* Vous vous battez bien, pour des humains. Presque aussi bien que des nains. PRESQUE."
      ],
      playerResponses: [
        {
          id: 'thorin-combat-blague',
          text: "Et vous vous battez bien, pour un roi. Les vrais guerriers ne portent pas de couronne !",
          consequence: "Thorin éclate de rire en plein combat. Moral renforcé.",
          reputationChange: [{ faction: 'karak-dum', amount: 2 }]
        },
        {
          id: 'thorin-combat-dos',
          text: "*Protéger le flanc de Thorin*",
          consequence: "Thorin le remarque. Lien de guerrier forgé dans le sang.",
          reputationChange: [{ faction: 'karak-dum', amount: 3 }],
          unlocks: 'lien-guerrier-thorin'
        }
      ]
    },
    {
      id: 'thorin-adieu',
      npcId: 'npc:noble:thorin',
      trigger: 'adieux avant la séparation',
      tone: 'respectueux',
      conditions: { reputationMin: 10 },
      lines: [
        "*tend une hache magnifiquement forgée* Ceci est Brise-Ombre. Forgée par mes mains, trempée dans le feu de la Forge Éternelle. Elle porte la bénédiction de la montagne.",
        "Vous êtes les premiers humains en cinq siècles à être nommés Amis des Nains. Cet honneur porte des devoirs — mais je sais que vous les honorerez.",
        "*pose son front contre le vôtre, tradition naine* Que la montagne veille sur vous. Et quand la terre tremblera, sachez que les nains sont en marche."
      ],
      playerResponses: [
        {
          id: 'thorin-adieu-accepter',
          text: "*Accepter Brise-Ombre avec révérence* Nous sommes honorés, Roi Thorin.",
          consequence: "Arme légendaire reçue. Alliance naine assurée.",
          itemReceived: 'weapon:brise-ombre',
          reputationChange: [{ faction: 'karak-dum', amount: 5 }]
        },
        {
          id: 'thorin-adieu-front',
          text: "*Poser son front contre celui de Thorin* Jusqu'à la fin, ami.",
          consequence: "Le geste le plus respectueux possible. Thorin est ému.",
          reputationChange: [{ faction: 'karak-dum', amount: 5 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 9. ELYNDRA ARC-DE-LUNE - Guide elfique
// ============================================================================

const ELYNDRA_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:ally:elyndra',
  npcName: 'Elyndra Arc-de-Lune',
  npcTitle: 'Guide de Sylvaneth, Gardienne de l\'Arbre-Monde',
  act: 2,
  dialogues: [
    {
      id: 'elyndra-accueil',
      npcId: 'npc:ally:elyndra',
      trigger: 'arrivée en Sylvaneth',
      tone: 'mystérieux',
      conditions: { actNumber: 2 },
      lines: [
        "*apparaît entre les branches comme si la forêt elle-même prenait forme* Vous êtes bruyants. Les oiseaux vous ont annoncés il y a une lieue.",
        "Je suis Elyndra Arc-de-Lune. La forêt m'a dit de vous attendre. Et la forêt ne se trompe jamais — même quand elle accueille ceux qui piétinent ses racines.",
        "*un sourire s'esquisse* Mais l'heure n'est pas à la rancune. Venez. L'Arbre-Monde vous attend, et il n'aime pas attendre."
      ],
      playerResponses: [
        {
          id: 'elyndra-accueil-suivre',
          text: "Menez-nous. Nous marcherons comme vous l'indiquerez.",
          consequence: "Elyndra approuve le respect montré à la forêt.",
          reputationChange: [{ faction: 'sylvaneth', amount: 2 }]
        },
        {
          id: 'elyndra-accueil-arbre',
          text: "L'Arbre-Monde... comment va-t-il ?",
          consequence: "Le visage d'Elyndra s'assombrit. La réponse n'est pas bonne.",
          nextDialogue: 'elyndra-arbre-monde'
        },
        {
          id: 'elyndra-accueil-excuser',
          text: "Pardonnez notre manque de grâce. Nous sommes des enfants de la pierre et du fer.",
          consequence: "Elyndra rit doucement. 'Au moins, vous le reconnaissez.'",
          reputationChange: [{ faction: 'sylvaneth', amount: 3 }]
        }
      ]
    },
    {
      id: 'elyndra-lecon-nature',
      npcId: 'npc:ally:elyndra',
      trigger: 'traversée de la forêt',
      tone: 'amical',
      conditions: { reputationMin: 3 },
      lines: [
        "*s'arrête près d'un ruisseau* Écoutez. Non, pas avec vos oreilles — avec votre coeur. La forêt parle. Chaque bruissement, chaque craquement raconte une histoire.",
        "Ce ruisseau porte l'eau de fonte de la montagne. Il a mille ans. Il a vu passer des armées, des migrations, des amants. Et il coule toujours, parce que l'eau ne lutte pas — elle contourne.",
        "C'est la leçon de la forêt : ne luttez pas contre la nature des choses. Trouvez le chemin qui contourne l'obstacle. La force brute est l'arme des impatients."
      ],
      playerResponses: [
        {
          id: 'elyndra-lecon-ecouter',
          text: "*Fermer les yeux et écouter* (Perception DC 12)",
          consequence: "Test de Perception pour entendre la forêt.",
          skillCheck: { skill: 'Perception', dc: 12, success: "Pendant un instant, vous percevez le murmure vivant de la forêt. Bonus de Survie en milieu naturel.", failure: "Rien que le bruit du vent. Mais la tentative est appréciée." }
        },
        {
          id: 'elyndra-lecon-sagesse',
          text: "Belle sagesse. Mais parfois, il faut aussi savoir frapper fort.",
          consequence: "Elyndra acquiesce. 'L'arbre le plus souple survit à la tempête. Mais il a aussi des racines de fer.'",
          reputationChange: [{ faction: 'sylvaneth', amount: 1 }]
        }
      ]
    },
    {
      id: 'elyndra-arbre-monde',
      npcId: 'npc:ally:elyndra',
      trigger: 'discussion sur l\'Arbre-Monde',
      tone: 'triste',
      conditions: { actNumber: 2 },
      lines: [
        "*pose sa main sur un tronc, les yeux humides* L'Arbre-Monde meurt. Pas de maladie, pas de vieillesse — quelque chose le dévore de l'intérieur. Ses racines pourrissent dans les profondeurs.",
        "L'Arbre-Monde est le troisième Sceau. Vous le saviez peut-être déjà. Planté par les elfes lors du Premier Scellement, nourri par notre magie pendant mille ans.",
        "Si l'Arbre meurt... le Sceau cède. Et la forêt entière meurt avec lui. Dix mille ans de vie, de sagesse, de beauté — effacés en quelques jours.",
        "C'est pourquoi je vous ai attendus. Parce que les elfes seuls ne peuvent plus le sauver."
      ],
      playerResponses: [
        {
          id: 'elyndra-arbre-aider',
          text: "Que pouvons-nous faire ? Dites-nous.",
          consequence: "Elyndra révèle le rituel de purification nécessaire.",
          nextDialogue: 'elyndra-rituel',
          reputationChange: [{ faction: 'sylvaneth', amount: 3 }]
        },
        {
          id: 'elyndra-arbre-racines',
          text: "Quelque chose dans les racines ? On peut descendre y regarder.",
          consequence: "Elyndra hésite. Les profondeurs racinaires sont dangereuses.",
          unlocks: 'acces-racines-arbre-monde'
        },
        {
          id: 'elyndra-arbre-temps',
          text: "Combien de temps reste-t-il ?",
          consequence: "'Des semaines. Peut-être des jours. Chaque nuit, je l'entends pleurer.'",
          reputationChange: [{ faction: 'sylvaneth', amount: 1 }]
        }
      ]
    },
    {
      id: 'elyndra-rituel',
      npcId: 'npc:ally:elyndra',
      trigger: 'rituel elfique de purification',
      tone: 'solennel',
      conditions: { reputationMin: 6 },
      lines: [
        "*dans la clairière sacrée, cercle de pierres anciennes* Le Rituel des Racines Vivantes. C'est notre seul espoir. Il faut purifier la source de corruption dans les profondeurs racinaires.",
        "Le rituel nécessite trois choses : la lumière de Solarius canalisée par un prêtre, le sang d'un gardien de lignée, et... quelqu'un doit descendre physiquement dans les racines pour appliquer la purification à la source.",
        "Celui qui descend... la corruption essaiera de le consumer. C'est un voyage dans l'obscurité la plus pure. Et il n'y a aucune garantie de retour."
      ],
      playerResponses: [
        {
          id: 'elyndra-rituel-descendre',
          text: "Je descendrai. C'est pour ça qu'on est là.",
          consequence: "Elyndra vous regarde avec un respect nouveau. Préparation du rituel.",
          questStarted: 'quest:purification-racines',
          reputationChange: [{ faction: 'sylvaneth', amount: 5 }]
        },
        {
          id: 'elyndra-rituel-preparer',
          text: "Prenons le temps de nous préparer. Quelles protections existent ?",
          consequence: "Elyndra fournit des amulettes de protection elfiques.",
          unlocks: 'amulettes-protection-elfiques',
          itemReceived: 'amulette-lumiere-sylvaneth'
        }
      ]
    },
    {
      id: 'elyndra-adieu',
      npcId: 'npc:ally:elyndra',
      trigger: 'départ de Sylvaneth',
      tone: 'triste',
      conditions: { reputationMin: 8 },
      lines: [
        "*à la lisière de la forêt, le vent joue dans ses cheveux argentés* La forêt vous dit au revoir. Elle... elle dit merci. C'est la première fois en mille ans qu'elle remercie un humain.",
        "Prenez ceci. *tend un arc vivant, fait de bois qui pulse doucement* C'est un Arc de Lune. Il a grandi pour vous. Les flèches qu'il tire portent la lumière de la forêt.",
        "*ses yeux brillent de larmes retenues* Quand le monde sera sauf — si le monde est sauf — revenez nous voir. La forêt garde une clairière pour les amis. Et elle n'oublie jamais."
      ],
      playerResponses: [
        {
          id: 'elyndra-adieu-promesse',
          text: "Nous reviendrons. Et la forêt vivra.",
          consequence: "Arc de Lune reçu. Bénédiction de Sylvaneth.",
          itemReceived: 'weapon:arc-de-lune',
          reputationChange: [{ faction: 'sylvaneth', amount: 5 }]
        },
        {
          id: 'elyndra-adieu-ensemble',
          text: "Venez avec nous, Elyndra. La forêt a besoin de vous, mais le monde aussi.",
          consequence: "Elyndra hésite. Si la réputation est assez haute, elle accepte.",
          unlocks: 'elyndra-compagnon'
        }
      ]
    }
  ]
};

// ============================================================================
// 10. DAME CÉLESTE - Noble corrompue
// ============================================================================

const DAME_CELESTE_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:enemy:dame-celeste',
  npcName: 'Dame Céleste',
  npcTitle: 'Noble de la Cour d\'Eldoria, agent du Cercle d\'Ombre',
  act: 1,
  dialogues: [
    {
      id: 'celeste-gala',
      npcId: 'npc:enemy:dame-celeste',
      trigger: 'rencontre au gala',
      tone: 'séducteur',
      conditions: { actNumber: 1, questCompleted: ['quest:gala-celeste'] },
      lines: [
        "*robe de soie noire étoilée de diamants, sourire éblouissant* Oh, les héros dont tout le monde parle ! Quel honneur de vous avoir à mon humble petite réception.",
        "Je suis Dame Céleste de Val-Rosier. *tend une main gantée* Les rumeurs ne vous rendent pas justice — vous êtes bien plus... intrigants en personne.",
        "Venez, laissez-moi vous présenter quelques amis. Les gens les plus importants d'Eldoria sont ici ce soir, et ils meurent d'envie de connaître les sauveurs de Ventclair."
      ],
      playerResponses: [
        {
          id: 'celeste-gala-charme',
          text: "*Jouer le jeu social* L'honneur est pour nous, Dame Céleste.",
          consequence: "Céleste vous mène dans les cercles de pouvoir. Observation possible.",
          reputationChange: [{ faction: 'noblesse-eldoria', amount: 2 }]
        },
        {
          id: 'celeste-gala-observe',
          text: "*Observer discrètement ses interactions* (Perspicacité DC 15)",
          consequence: "Test pour repérer des comportements suspects.",
          skillCheck: { skill: 'Perspicacité', dc: 15, success: "Vous remarquez qu'elle échange des regards codés avec trois invités.", failure: "Elle semble être une hôtesse parfaite. Rien de suspect en surface." }
        },
        {
          id: 'celeste-gala-froid',
          text: "Merci, mais nous ne resterons pas longtemps.",
          consequence: "Céleste note la froideur. Sera plus prudente à l'avenir.",
          reputationChange: [{ faction: 'noblesse-eldoria', amount: -1 }]
        }
      ]
    },
    {
      id: 'celeste-defense',
      npcId: 'npc:enemy:dame-celeste',
      trigger: 'accusation directe',
      tone: 'menaçant',
      conditions: { customFlag: 'preuves-celeste' },
      lines: [
        "*le sourire disparaît, remplacé par de l'acier* Des accusations ? Contre MOI ? Savez-vous qui je suis ? Ma famille finance la moitié des oeuvres de charité de cette ville.",
        "Où sont vos preuves ? Des témoignages de mendiants fous et d'espions anonymes ? Allez donc présenter ça au conseil et voyez combien de temps vous garderez votre liberté.",
        "*se rapproche, voix mortellement basse* Je vous conseille de bien réfléchir à votre prochain mouvement. Les amis puissants peuvent devenir des ennemis plus puissants encore."
      ],
      playerResponses: [
        {
          id: 'celeste-defense-preuves',
          text: "*Présenter les preuves matérielles*",
          consequence: "Si preuves suffisantes, Céleste pâlit. Sinon, elle contre-attaque.",
          skillCheck: { skill: 'Persuasion', dc: 18, success: "Les preuves sont accablantes. Céleste est acculée.", failure: "Céleste retourne la situation contre le groupe devant la cour." }
        },
        {
          id: 'celeste-defense-bluff',
          text: "Nous savons TOUT, Céleste. Le Cercle d'Ombre, les chariots nocturnes, les gardes corrompus.",
          consequence: "Bluff massif. Test de Tromperie DC 16.",
          skillCheck: { skill: 'Tromperie', dc: 16, success: "Céleste vacille. Elle pense que vous savez plus que vous ne savez.", failure: "Céleste voit le bluff et rit. 'Pitoyable.'" }
        },
        {
          id: 'celeste-defense-reculer',
          text: "Ce n'est pas fini, Dame Céleste. Nous reviendrons.",
          consequence: "Céleste sourit froidement. Elle va accélérer ses plans.",
          unlocks: 'celeste-alerte'
        }
      ]
    },
    {
      id: 'celeste-aveu',
      npcId: 'npc:enemy:dame-celeste',
      trigger: 'Céleste avoue sous pression',
      tone: 'nerveux',
      conditions: { customFlag: 'celeste-acculee' },
      lines: [
        "*dans une pièce fermée, maquillage qui coule* D'accord. D'ACCORD ! Oui, je travaille avec le Cercle. Mais pas par choix — vous devez me croire !",
        "Ils ont mon fils. Mon petit Émeric. Enlevé il y a un an. Ils m'envoient un doigt chaque mois où je ne coopère pas. *montre un petit coffret avec horreur* Regardez si vous ne me croyez pas.",
        "Tout ce que j'ai fait — les contacts, l'argent, les informations — c'était pour le garder en vie. Quelle mère ne ferait pas la même chose ?"
      ],
      playerResponses: [
        {
          id: 'celeste-aveu-croire',
          text: "Nous pouvons retrouver votre fils. Mais vous devez tout nous dire.",
          consequence: "Céleste coopère totalement. Informations massives sur le Cercle.",
          questStarted: 'quest:sauver-emeric',
          unlocks: 'infos-cercle-ombre-complet'
        },
        {
          id: 'celeste-aveu-douter',
          text: "(Perspicacité DC 17) Est-ce que c'est encore un mensonge ?",
          consequence: "Test pour évaluer la sincérité de Céleste.",
          skillCheck: { skill: 'Perspicacité', dc: 17, success: "Elle dit la vérité. La douleur est réelle.", failure: "Impossible à dire avec certitude." }
        },
        {
          id: 'celeste-aveu-justice',
          text: "Vos raisons ne changent rien aux vies détruites. Vous répondrez devant la justice.",
          consequence: "Céleste s'effondre. Remise aux autorités possible.",
          reputationChange: [{ faction: 'garde-royale', amount: 3 }, { faction: 'noblesse-eldoria', amount: -3 }]
        }
      ]
    },
    {
      id: 'celeste-marchandage',
      npcId: 'npc:enemy:dame-celeste',
      trigger: 'Céleste propose un marché',
      tone: 'conspirateur',
      conditions: { actNumber: 1, reputationMin: 3 },
      lines: [
        "*rencontre secrète* Écoutez, nous pourrions être utiles l'un à l'autre. J'ai des informations. Des informations que même l'Aube d'Argent ne possède pas.",
        "Le Cercle d'Ombre prépare quelque chose de massif. Un rituel, sous la prochaine lune noire. Si vous m'aidez à libérer mon fils avant... je vous donnerai le lieu, la date, tout.",
        "Mais si vous refusez, ou si vous me trahissez... eh bien, j'ai aussi des informations sur VOUS que le Cercle paierait très cher."
      ],
      playerResponses: [
        {
          id: 'celeste-marche-accepter',
          text: "Marché conclu. Mais au premier signe de trahison...",
          consequence: "Alliance précaire avec Céleste. Informations précieuses mais risquées.",
          questStarted: 'quest:marche-celeste',
          unlocks: 'alliance-celeste'
        },
        {
          id: 'celeste-marche-refuser',
          text: "On ne marchande pas avec les traîtres.",
          consequence: "Céleste disparaît. Elle devient une ennemie active.",
          reputationChange: [{ faction: 'noblesse-eldoria', amount: -2 }],
          unlocks: 'celeste-ennemie'
        }
      ]
    },
    {
      id: 'celeste-menace',
      npcId: 'npc:enemy:dame-celeste',
      trigger: 'Céleste menace le groupe',
      tone: 'menaçant',
      conditions: { customFlag: 'celeste-ennemie' },
      lines: [
        "*message glissé sous la porte, écriture élégante* 'Vous avez fait votre choix. Maintenant voici le mien. Le Cercle connaît vos noms, vos visages, vos alliés.'",
        "'Le marchand chez qui vous achetez vos provisions ? À nous. Le garde qui veille la nuit devant votre auberge ? À nous. La servante qui fait vos lits ? À nous.'",
        "'Chaque mur a des oreilles. Chaque ombre cache un couteau. Dormez bien. - C.'"
      ],
      playerResponses: [
        {
          id: 'celeste-menace-ignorer',
          text: "Des mots. Rien que des mots pour nous effrayer.",
          consequence: "Mais la prudence s'impose. Sécurité renforcée nécessaire.",
          unlocks: 'alerte-securite'
        },
        {
          id: 'celeste-menace-riposter',
          text: "Il est temps de mettre fin à ça. Trouvons-la.",
          consequence: "Chasse à Céleste engagée. Mission dangereuse.",
          questStarted: 'quest:traquer-celeste'
        }
      ]
    },
    {
      id: 'celeste-remords',
      npcId: 'npc:enemy:dame-celeste',
      trigger: 'Céleste montre des remords',
      tone: 'triste',
      conditions: { customFlag: 'emeric-sauve' },
      lines: [
        "*Émeric dans ses bras, pleure silencieusement* Mon bébé... mon petit garçon... *le serre contre elle*",
        "*vous regarde, toute fierté disparue* Vous l'avez sauvé. Après tout ce que j'ai fait... après toutes mes menaces et mes trahisons... vous l'avez quand même sauvé.",
        "Je ne mérite pas votre pardon. Mais je vous donne tout ce que j'ai. *pose une pile de documents* Chaque transaction, chaque contact, chaque plan du Cercle d'Ombre que je connais. Utilisez-le pour les détruire."
      ],
      playerResponses: [
        {
          id: 'celeste-remords-pardon',
          text: "Élevez votre fils pour qu'il soit meilleur que nous tous. C'est suffisant.",
          consequence: "Céleste s'effondre de gratitude. Informations complètes obtenues.",
          unlocks: 'dossier-cercle-ombre-complet',
          reputationChange: [{ faction: 'peuple-eldoria', amount: 3 }]
        },
        {
          id: 'celeste-remords-justice',
          text: "Les documents d'abord. La justice ensuite. Pour les victimes.",
          consequence: "Céleste accepte son sort. Procès équitable assuré.",
          unlocks: 'dossier-cercle-ombre-complet',
          reputationChange: [{ faction: 'garde-royale', amount: 3 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 11. L'OMBRE - Chef du Syndicat
// ============================================================================

const OMBRE_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:neutral:ombre',
  npcName: "L'Ombre",
  npcTitle: 'Chef du Syndicat du Port, maître des bas-fonds',
  act: 1,
  dialogues: [
    {
      id: 'ombre-rencontre',
      npcId: 'npc:neutral:ombre',
      trigger: 'première rencontre avec l\'Ombre',
      tone: 'mystérieux',
      conditions: { actNumber: 1, customFlag: 'contact-syndicat' },
      lines: [
        "*une silhouette masquée dans une pièce sombre, éclairée par une seule bougie* Asseyez-vous. Non — pas sur cette chaise. Celle-ci est piégée. Petit test.",
        "On m'appelle l'Ombre. Pas très original, je sais, mais dans mon métier, l'originalité est un luxe mortel. Ce qui compte, c'est que je sache tout ce qui se passe dans cette ville.",
        "Et vous... vous êtes intéressants. Vous faites du bruit, vous dérangez les puissants, et vous êtes encore en vie. Ça mérite une conversation."
      ],
      playerResponses: [
        {
          id: 'ombre-rencontre-ecouter',
          text: "Nous écoutons. Qu'avez-vous à proposer ?",
          consequence: "L'Ombre apprécie la prudence et la concision.",
          nextDialogue: 'ombre-proposition'
        },
        {
          id: 'ombre-rencontre-mefiant',
          text: "Pourquoi devrions-nous faire confiance au roi des voleurs ?",
          consequence: "L'Ombre rit. 'Roi des voleurs ? Je préfère entrepreneur du crépuscule.'",
          reputationChange: [{ faction: 'syndicat-port', amount: -1 }]
        },
        {
          id: 'ombre-rencontre-piege',
          text: "La chaise piégée... vous testez vos invités ?",
          consequence: "'Toujours. Ceux qui s'assoient sans regarder ne méritent pas mon temps.'",
          reputationChange: [{ faction: 'syndicat-port', amount: 2 }]
        }
      ]
    },
    {
      id: 'ombre-proposition',
      npcId: 'npc:neutral:ombre',
      trigger: 'proposition de l\'Ombre',
      tone: 'conspirateur',
      conditions: { previousDialogue: 'ombre-rencontre' },
      lines: [
        "Voici ma proposition. Simple, claire, mutuellement bénéfique. Le Cercle d'Ombre empiète sur mon territoire. Leurs activités nuisent aux miennes. En affaires, on appelle ça une concurrence déloyale.",
        "Vous voulez les démanteler pour sauver le monde. Moi, je veux les démanteler pour protéger mes marges. Nos motivations diffèrent, mais l'objectif est le même.",
        "Je vous fournis informations, passages secrets, et surveillance. En échange, quand le Cercle tombe, ses opérations... disons qu'elles reviennent naturellement au Syndicat. Le vide, ça n'existe pas en affaires."
      ],
      playerResponses: [
        {
          id: 'ombre-prop-accepter',
          text: "Tant que le Syndicat ne touche pas aux innocents, nous avons un accord.",
          consequence: "L'Ombre incline la tête. Alliance avec le Syndicat établie.",
          reputationChange: [{ faction: 'syndicat-port', amount: 5 }],
          unlocks: 'alliance-syndicat'
        },
        {
          id: 'ombre-prop-negocier',
          text: "Informations d'abord. Si elles sont bonnes, on verra pour la suite.",
          consequence: "L'Ombre respecte la prudence. Échange limité accepté.",
          reputationChange: [{ faction: 'syndicat-port', amount: 2 }]
        },
        {
          id: 'ombre-prop-refuser',
          text: "On ne traite pas avec les criminels.",
          consequence: "L'Ombre soupire. 'Idéalisme. Rafraîchissant mais naïf. La porte est là.'",
          reputationChange: [{ faction: 'syndicat-port', amount: -5 }]
        }
      ]
    },
    {
      id: 'ombre-test-loyaute',
      npcId: 'npc:neutral:ombre',
      trigger: 'test de loyauté du Syndicat',
      tone: 'menaçant',
      conditions: { reputationMin: 5, customFlag: 'alliance-syndicat' },
      lines: [
        "Un petit test, si vous permettez. Un de mes hommes a été capturé par la garde. Il connaît des choses qui pourraient compromettre notre arrangement.",
        "Je veux que vous le fassiez libérer. Pas par la force — par la ruse. Trouvez un moyen légal, ou presque légal, de le sortir de là.",
        "Et avant que vous ne demandiez : non, il n'a pas tué quelqu'un. Vol à l'étalage. Trois pommes. La garde l'utilise comme levier contre moi."
      ],
      playerResponses: [
        {
          id: 'ombre-test-accepter',
          text: "Trois pommes ? On va s'en occuper.",
          consequence: "Mission de libération. Test de la relation avec la garde.",
          questStarted: 'quest:liberation-voleur'
        },
        {
          id: 'ombre-test-condition',
          text: "On le fait. Mais ensuite, vous nous devez une information majeure.",
          consequence: "L'Ombre accepte les termes. Échange équitable.",
          questStarted: 'quest:liberation-voleur',
          unlocks: 'dette-ombre'
        }
      ]
    },
    {
      id: 'ombre-identite',
      npcId: 'npc:neutral:ombre',
      trigger: 'l\'Ombre révèle son identité',
      tone: 'confidentiel',
      conditions: { reputationMin: 12 },
      lines: [
        "*retire lentement son masque* Reconnaissez-vous ce visage ?",
        "Non ? Bien. C'est le but. Mais peut-être reconnaîtrez-vous le nom : Joren. L'ancien compagnon de Brok. Celui qui 'sert au palais'.",
        "Brok pense que je suis garde du palais. La vérité est que je suis les deux. Le jour, Joren le serviteur fidèle. La nuit, l'Ombre du Syndicat. Et oui, avant que vous ne demandiez — Marcus ne sait rien."
      ],
      playerResponses: [
        {
          id: 'ombre-id-brok',
          text: "Brok mérite de savoir.",
          consequence: "L'Ombre secoue la tête. 'Brok est trop honnête. Il ne pourrait pas garder le secret.'",
          reputationChange: [{ faction: 'syndicat-port', amount: 1 }]
        },
        {
          id: 'ombre-id-utiliser',
          text: "Un homme au palais ET dans le Syndicat. C'est très utile.",
          consequence: "L'Ombre sourit. 'Maintenant vous comprenez pourquoi je suis si bien informé.'",
          unlocks: 'acces-palais-syndicat'
        },
        {
          id: 'ombre-id-dangereux',
          text: "Vous jouez un jeu très dangereux, Joren.",
          consequence: "'Le monde est un jeu dangereux. Au moins, je choisis mes pièces.'",
          reputationChange: [{ faction: 'syndicat-port', amount: 2 }]
        }
      ]
    },
    {
      id: 'ombre-prix-info',
      npcId: 'npc:neutral:ombre',
      trigger: 'achat d\'information',
      tone: 'sarcastique',
      conditions: {},
      lines: [
        "Ah, vous voulez des informations. Bien sûr. Tout le monde en veut. La question est toujours la même : qu'avez-vous à offrir en retour ?",
        "L'or, c'est bien. Les faveurs, c'est mieux. Et les informations en échange d'informations, c'est le nec plus ultra.",
        "Alors, qu'est-ce qui vous intéresse ? Le Cercle d'Ombre ? La corruption à la cour ? Les mouvements de troupes ennemies ? J'ai un catalogue."
      ],
      playerResponses: [
        {
          id: 'ombre-info-or',
          text: "*Offrir de l'or* Combien pour ce qu'on cherche ?",
          consequence: "Prix variable selon l'importance de l'information.",
          unlocks: 'marche-informations-ombre'
        },
        {
          id: 'ombre-info-echange',
          text: "Nous avons des informations sur les mouvements du Cercle.",
          consequence: "L'Ombre est très intéressé. Échange avantageux.",
          reputationChange: [{ faction: 'syndicat-port', amount: 3 }]
        }
      ]
    },
    {
      id: 'ombre-alliance-precaire',
      npcId: 'npc:neutral:ombre',
      trigger: 'maintien de l\'alliance en temps de crise',
      tone: 'nerveux',
      conditions: { actNumber: 2, customFlag: 'siege-eldoria' },
      lines: [
        "Le siège change la donne. Mes réseaux sont coupés, mes entrepôts bloqués, et trois de mes meilleurs agents ont disparu.",
        "Je ne suis pas un héros. Je suis un homme d'affaires. Mais même un homme d'affaires comprend que sans ville, il n'y a pas de marché.",
        "Le Syndicat mettra ses ressources au service de la défense. Tunnels, caches d'armes, espions. C'est temporaire — et je m'en souviendrai quand la paix reviendra."
      ],
      playerResponses: [
        {
          id: 'ombre-alliance-accepter',
          text: "Bienvenue du bon côté, Ombre. Voici le plan de défense.",
          consequence: "Les ressources du Syndicat renforcent considérablement la défense.",
          reputationChange: [{ faction: 'syndicat-port', amount: 5 }],
          unlocks: 'defense-syndicat'
        },
        {
          id: 'ombre-alliance-mefiants',
          text: "Vos tunnels et vos caches. Montrez-nous d'abord.",
          consequence: "L'Ombre comprend la méfiance et offre une visite guidée.",
          unlocks: 'carte-tunnels-syndicat'
        }
      ]
    }
  ]
};

// ============================================================================
// 12. SERGENT DORVAL - Garde de la porte
// ============================================================================

const DORVAL_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:guard:dorval',
  npcName: 'Sergent Dorval',
  npcTitle: 'Garde de la Porte Principale d\'Eldoria',
  act: 1,
  dialogues: [
    {
      id: 'dorval-controle',
      npcId: 'npc:guard:dorval',
      trigger: 'entrée dans Eldoria',
      tone: 'bourru',
      conditions: {},
      lines: [
        "*en armure de garde, hallebarde en main* Halte ! Noms, provenance, motif de visite. Et montrez-moi vos mains — lentement.",
        "Pas de magie dans l'enceinte de la ville sans permis. Pas d'armes dégainées en dehors des zones autorisées. Pas de monstres domestiques. Oui, quelqu'un a essayé une fois avec un basilic.",
        "Bienvenue à Eldoria. Essayez de ne rien casser."
      ],
      playerResponses: [
        {
          id: 'dorval-ctrl-cooperer',
          text: "*Donner toutes les informations demandées poliment*",
          consequence: "Dorval hoche la tête. Entrée rapide et sans problème.",
          reputationChange: [{ faction: 'garde-royale', amount: 1 }]
        },
        {
          id: 'dorval-ctrl-insigne',
          text: "*Montrer l'insigne de la Couronne*",
          consequence: "Dorval se met au garde-à-vous immédiatement.",
          reputationChange: [{ faction: 'garde-royale', amount: 2 }]
        },
        {
          id: 'dorval-ctrl-basilic',
          text: "Un basilic ? Racontez-moi ça.",
          consequence: "Dorval esquisse un sourire. Début de familiarité.",
          nextDialogue: 'dorval-bavardage'
        }
      ]
    },
    {
      id: 'dorval-bavardage',
      npcId: 'npc:guard:dorval',
      trigger: 'bavardage avec Dorval',
      tone: 'jovial',
      conditions: { reputationMin: 2 },
      lines: [
        "*s'appuie sur sa hallebarde* Le basilic ? Ha ! C'était il y a deux ans. Un gnome. Convaincu que son basilic était un 'chien-lézard thérapeutique'. Il avait même un faux certificat.",
        "Le basilic a pétrifié trois poules et le chapeau de Madame Rosenblatt avant qu'on l'attrape. Le gnome a passé la nuit au poste. Le basilic aussi — dans une cage avec un bandeau sur les yeux.",
        "Depuis, on a ajouté 'pas de monstres' au règlement. Parfois je me demande pourquoi ça n'y était pas déjà."
      ],
      playerResponses: [
        {
          id: 'dorval-bavard-rire',
          text: "*Rire* Vous devez en voir des choses à cette porte.",
          consequence: "Dorval se détend. Lien amical établi.",
          reputationChange: [{ faction: 'garde-royale', amount: 1 }],
          nextDialogue: 'dorval-complainte'
        },
        {
          id: 'dorval-bavard-info',
          text: "Rien de plus étrange ces derniers temps ?",
          consequence: "Dorval se rembrunit. Des choses inhabituelles, oui.",
          nextDialogue: 'dorval-info-utile'
        }
      ]
    },
    {
      id: 'dorval-complainte',
      npcId: 'npc:guard:dorval',
      trigger: 'Dorval se plaint de son métier',
      tone: 'triste',
      conditions: { reputationMin: 3 },
      lines: [
        "*soupir profond* Vingt ans de service. VINGT ans debout à cette porte. Par la pluie, la neige, la canicule. Et pour quoi ? Trente couronnes par mois et une pension que je ne verrai peut-être jamais.",
        "Ma femme me dit de démissionner. 'Deviens boulanger, Dorval. Les boulangers dorment la nuit.' Elle a raison. Mais qui garderait la porte ?",
        "Les jeunes recrues ne savent rien. L'autre jour, un gamin a confondu un halfelin avec un enfant perdu. Il l'a porté au poste. Le halfelin avait quatre-vingts ans."
      ],
      playerResponses: [
        {
          id: 'dorval-complainte-soutien',
          text: "Les gens comme vous sont le vrai rempart de cette ville.",
          consequence: "Dorval est touché. Informateur fidèle à la porte.",
          reputationChange: [{ faction: 'garde-royale', amount: 2 }],
          unlocks: 'dorval-informateur'
        },
        {
          id: 'dorval-complainte-argent',
          text: "Tenez, un petit extra pour les longues nuits. *donner de l'or*",
          consequence: "Dorval hésite puis accepte. Pas de la corruption, juste de la gratitude.",
          reputationChange: [{ faction: 'garde-royale', amount: 1 }]
        }
      ]
    },
    {
      id: 'dorval-info-utile',
      npcId: 'npc:guard:dorval',
      trigger: 'Dorval partage une information utile',
      tone: 'confidentiel',
      conditions: { reputationMin: 4 },
      lines: [
        "*baisse la voix* Écoutez, je ne devrais pas dire ça, mais... il y a des chariots qui entrent la nuit. Après le changement de garde, quand c'est le caporal Henris qui prend la relève.",
        "Henris laisse passer sans vérifier. Je l'ai vu. Trois fois ce mois-ci. Les chariots portent le symbole d'une guilde marchande, mais le bois sent le soufre et les chevaux sont nerveux.",
        "J'ai signalé à mon supérieur. Il m'a dit d'oublier. De 'me concentrer sur mon poste'. Ça ne sent pas bon."
      ],
      playerResponses: [
        {
          id: 'dorval-info-henris',
          text: "Henris... quand est-ce qu'il est de service la prochaine fois ?",
          consequence: "Dorval donne les horaires. Mission de surveillance possible.",
          unlocks: 'horaires-henris',
          questAdvanced: 'quest:corruption-garde'
        },
        {
          id: 'dorval-info-marcus',
          text: "On va en parler au Capitaine-Général Marcus directement.",
          consequence: "Dorval est soulagé que quelqu'un agisse.",
          reputationChange: [{ faction: 'garde-royale', amount: 2 }]
        }
      ]
    },
    {
      id: 'dorval-urgence',
      npcId: 'npc:guard:dorval',
      trigger: 'Dorval en situation d\'urgence',
      tone: 'nerveux',
      conditions: { customFlag: 'attaque-porte' },
      lines: [
        "*couvert de poussière, sang sur le visage* LES PORTES ! Ils attaquent les portes ! *sonne l'alarme frénétiquement*",
        "C'est sorti des égouts — des créatures d'ombre, des dizaines ! Henris est mort, Larsson aussi. Il ne reste que moi et trois recrues !",
        "*saisit son arme avec des mains tremblantes* Vingt ans à cette porte. Je ne la lâcherai pas maintenant."
      ],
      playerResponses: [
        {
          id: 'dorval-urgence-defendre',
          text: "Dorval, tenez bon ! On est avec vous !",
          consequence: "Dorval se ressaisit. Combat pour défendre la porte.",
          reputationChange: [{ faction: 'garde-royale', amount: 5 }]
        },
        {
          id: 'dorval-urgence-evacuer',
          text: "Évacuez les civils ! On tient la ligne !",
          consequence: "Dorval organise l'évacuation avec une efficacité surprenante.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 3 }]
        }
      ]
    },
    {
      id: 'dorval-reconnaissance',
      npcId: 'npc:guard:dorval',
      trigger: 'Dorval après la bataille',
      tone: 'respectueux',
      conditions: { customFlag: 'porte-defendue' },
      lines: [
        "*au garde-à-vous, malgré un bras en écharpe* Je... je voudrais vous remercier. Sans vous, cette porte serait tombée. Et ma famille vit juste derrière.",
        "Vingt ans de service et c'est la première fois que je me bats vraiment. C'est... différent de ce que j'imaginais.",
        "S'il y a quoi que ce soit que je puisse faire, n'importe quand — vous n'avez qu'à demander. Dorval de la Porte ne l'oubliera jamais."
      ],
      playerResponses: [
        {
          id: 'dorval-recon-honneur',
          text: "Vous vous êtes battu courageusement, Sergent. Eldoria est fière.",
          consequence: "Dorval se redresse, ému. Allié permanent.",
          reputationChange: [{ faction: 'garde-royale', amount: 3 }],
          unlocks: 'dorval-allie-permanent'
        },
        {
          id: 'dorval-recon-repos',
          text: "Allez soigner ce bras. Vous avez mérité du repos.",
          consequence: "Dorval obéit pour une fois. Sa femme est reconnaissante aussi.",
          reputationChange: [{ faction: 'peuple-eldoria', amount: 1 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 13. CAPITAINE TEMPESTA - Pirate
// ============================================================================

const TEMPESTA_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:neutral:tempesta',
  npcName: 'Capitaine Tempesta',
  npcTitle: 'Pirate de la Mer d\'Argent, Capitaine du Vent Noir',
  act: 2,
  dialogues: [
    {
      id: 'tempesta-negociation',
      npcId: 'npc:neutral:tempesta',
      trigger: 'négociation pour passage maritime',
      tone: 'sarcastique',
      conditions: { actNumber: 2 },
      lines: [
        "*bottes sur la table, chapeau sur les yeux, bouteille de rhum en main* Ah, des terriens ! Je les reconnais à l'odeur — poussière et désespoir.",
        "Vous voulez traverser la Mer d'Argent. Adorable. Sauf que la Mer d'Argent est infestée de créatures depuis que les fonds marins font des caprices. Mon équipage refuse d'y aller pour moins de mille couronnes.",
        "Moi ? Je m'en fiche du prix. J'aime le danger. C'est mon équipage qu'il faut convaincre. Alors, convainquez-moi de les convaincre."
      ],
      playerResponses: [
        {
          id: 'tempesta-nego-or',
          text: "Mille couronnes et un bonus à l'arrivée.",
          consequence: "Tempesta hausse un sourcil. L'argent parle.",
          reputationChange: [{ faction: 'pirates-mer-argent', amount: 2 }]
        },
        {
          id: 'tempesta-nego-honneur',
          text: "Capitaine Tempesta, la légende dit que vous ne reculez devant rien.",
          consequence: "Tempesta sourit. La flatterie bien placée est efficace.",
          skillCheck: { skill: 'Persuasion', dc: 13, success: "Tempesta se lève. 'Maudit soit votre charme. On part à marée haute.'", failure: "Tempesta rit. 'Belle tentative. Mais j'ai besoin de plus que des mots.'" },
          reputationChange: [{ faction: 'pirates-mer-argent', amount: 1 }]
        },
        {
          id: 'tempesta-nego-mission',
          text: "Ce voyage est lié au sort du monde. Les Sceaux, les Enchaînés... tout.",
          consequence: "Tempesta devient sérieuse pour une fois.",
          nextDialogue: 'tempesta-histoire-mer'
        }
      ]
    },
    {
      id: 'tempesta-histoire-mer',
      npcId: 'npc:neutral:tempesta',
      trigger: 'Tempesta raconte une histoire de mer',
      tone: 'mystérieux',
      conditions: { reputationMin: 3 },
      lines: [
        "*regarde l'horizon, voix inhabituellement grave* Les Enchaînés, hein ? Vous savez pourquoi je n'ai pas peur de la mer, même quand elle essaie de me tuer ?",
        "Parce que j'ai déjà vu le fond. Pas en image — en vrai. Mon navire a coulé il y a sept ans, dans la Fosse d'Azur. Je suis descendue si profond que j'ai vu les lumières dans les abysses.",
        "Des lumières qui n'auraient pas dû exister. Des structures, des murs, des inscriptions. Une cité entière, sous la mer, endormie. Et au centre... une pulsation. Comme un coeur géant.",
        "J'ai remonté. Je ne sais pas comment. Et depuis, la mer me parle. Elle me dit où aller, où ne pas aller. Cette fois, elle dit d'aller avec vous."
      ],
      playerResponses: [
        {
          id: 'tempesta-histoire-cite',
          text: "Une cité sous-marine ? C'est peut-être un des Sceaux !",
          consequence: "Tempesta acquiesce. Elle peut vous y mener.",
          unlocks: 'localisation-cite-engloutie',
          questAdvanced: 'quest:proteger-sceaux'
        },
        {
          id: 'tempesta-histoire-pulsation',
          text: "Le coeur qui bat... comme le Sceau sous le palais.",
          consequence: "Les connexions se font. Carte maritime mise à jour.",
          unlocks: 'carte-maritime-sceaux'
        }
      ]
    },
    {
      id: 'tempesta-combat-naval',
      npcId: 'npc:neutral:tempesta',
      trigger: 'combat naval',
      tone: 'jovial',
      conditions: { customFlag: 'attaque-navale' },
      lines: [
        "*au gouvernail pendant la tempête et l'attaque* HAHAHA ! VOILÀ pourquoi je vis, mes amis ! Sentez-vous ça ? Le vent, le sel, la MORT qui rôde !",
        "Bâbord toute ! Canonniers, visez le tentacule — le GROS ! Non, l'AUTRE gros ! Ils sont TOUS gros ? Tirez sur tout ce qui bouge !",
        "*se tourne vers vous, cheveux trempés et sourire fou* Vous savez vous battre sur terre. Voyons si vous valez quelque chose en mer !"
      ],
      playerResponses: [
        {
          id: 'tempesta-naval-aider',
          text: "*Rejoindre les canons ou combattre au corps à corps*",
          consequence: "Combat naval épique. Compétences variées utiles.",
          reputationChange: [{ faction: 'pirates-mer-argent', amount: 3 }]
        },
        {
          id: 'tempesta-naval-magie',
          text: "*Utiliser la magie pour repousser la créature*",
          consequence: "La magie a un effet amplifié en mer. Impressionne l'équipage.",
          reputationChange: [{ faction: 'pirates-mer-argent', amount: 4 }]
        }
      ]
    },
    {
      id: 'tempesta-code-honneur',
      npcId: 'npc:neutral:tempesta',
      trigger: 'discussion sur le code pirate',
      tone: 'solennel',
      conditions: { reputationMin: 5 },
      lines: [
        "Un pirate sans code est un monstre. Le Vent Noir a trois règles, gravées dans le mât. Un : pas de mal aux enfants ni aux innocents désarmés. Deux : le butin se partage équitablement. Trois : on n'abandonne jamais un membre d'équipage.",
        "Ceux qui brisent le code sont laissés sur un récif avec une bouteille d'eau et un couteau. C'est plus que ce que la marine royale leur donnerait.",
        "Mon code m'a coûté des fortunes. Des bateaux de marchands que j'aurais pu piller mais qui transportaient des réfugiés. Des trésors que j'ai rendus parce qu'ils appartenaient à des temples. Mais je dors la nuit, moi. Combien de nobles peuvent en dire autant ?"
      ],
      playerResponses: [
        {
          id: 'tempesta-code-respect',
          text: "Un code d'honneur, pirate ou non, mérite le respect.",
          consequence: "Tempesta lève sa bouteille en toast.",
          reputationChange: [{ faction: 'pirates-mer-argent', amount: 3 }]
        },
        {
          id: 'tempesta-code-rejoindre',
          text: "Si on survit à tout ça, peut-être qu'on naviguera ensemble un jour.",
          consequence: "Tempesta rit. 'Je garde une cabine pour vous. La petite. Avec les rats.'",
          reputationChange: [{ faction: 'pirates-mer-argent', amount: 2 }]
        }
      ]
    },
    {
      id: 'tempesta-tresor',
      npcId: 'npc:neutral:tempesta',
      trigger: 'partage d\'un trésor',
      tone: 'jovial',
      conditions: { questCompleted: ['quest:temple-englouti'] },
      lines: [
        "*ouvre un coffre remonté des profondeurs* Regardez-moi ça... De l'or de l'Ancien Empire. Des gemmes qui brillent de leur propre lumière. Et cette couronne — elle appartenait probablement à un roi-poisson ou je ne sais quoi.",
        "Le code est clair : partage équitable. Votre part est là. *pousse la moitié vers vous* Ne discutez pas — j'ai essayé de tricher une fois et la mer m'a envoyé une vague dans la cabine.",
        "Mais cette amulette... *tient un bijou étrange* ...ce n'est pas un trésor ordinaire. Ça vibre. Comme la pulsation que j'ai sentie dans les abysses."
      ],
      playerResponses: [
        {
          id: 'tempesta-tresor-amulette',
          text: "L'amulette est probablement liée au Sceau. Gardez l'or, on prend l'amulette.",
          consequence: "Tempesta est impressionnée par le désintéressement.",
          itemReceived: 'amulette-abysses',
          reputationChange: [{ faction: 'pirates-mer-argent', amount: 5 }]
        },
        {
          id: 'tempesta-tresor-partager',
          text: "On prend notre part, amulette comprise. Merci, Capitaine.",
          consequence: "Partage équitable. Tempesta respecte la franchise.",
          itemReceived: 'amulette-abysses',
          reputationChange: [{ faction: 'pirates-mer-argent', amount: 2 }]
        }
      ]
    },
    {
      id: 'tempesta-adieu',
      npcId: 'npc:neutral:tempesta',
      trigger: 'adieux avec Tempesta',
      tone: 'bourru',
      conditions: { reputationMin: 6 },
      lines: [
        "*sur le quai, bras croisés* Bon. C'est ici qu'on se sépare. La mer m'appelle vers le sud, et vous avez un monde à sauver ou un truc dans le genre.",
        "C'était... *cherche ses mots* ...pas horrible de naviguer avec vous. Vous êtes les pires marins que j'aie jamais vus, mais les meilleurs compagnons de combat.",
        "*vous donne une bourrade qui manque de vous faire tomber* Si vous avez besoin d'un navire, allumez un feu sur la falaise de Corne-de-Brume. Trois fois. Je viendrai."
      ],
      playerResponses: [
        {
          id: 'tempesta-adieu-promesse',
          text: "Trois feux. On s'en souviendra. Vent favorable, Capitaine.",
          consequence: "Tempesta disponible comme alliée pour la suite.",
          reputationChange: [{ faction: 'pirates-mer-argent', amount: 3 }],
          unlocks: 'signal-tempesta'
        },
        {
          id: 'tempesta-adieu-toast',
          text: "*Lever une bouteille de rhum* À la Mer d'Argent et à ses fous !",
          consequence: "Tempesta éclate de rire et trinque à distance.",
          reputationChange: [{ faction: 'pirates-mer-argent', amount: 2 }]
        }
      ]
    }
  ]
};

// ============================================================================
// 14. ARCHIDRUIDE SYLVANIS - Gardien de la forêt
// ============================================================================

const SYLVANIS_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:ally:sylvanis',
  npcName: 'Archidruide Sylvanis',
  npcTitle: 'Gardien de la Forêt Éternelle, Voix de l\'Arbre-Monde',
  act: 2,
  dialogues: [
    {
      id: 'sylvanis-communion',
      npcId: 'npc:ally:sylvanis',
      trigger: 'première rencontre avec Sylvanis',
      tone: 'solennel',
      conditions: { actNumber: 2 },
      lines: [
        "*un vieil elfe dont la peau ressemble à de l'écorce, yeux verts comme la canopée* Je vous attendais. L'Arbre-Monde murmure vos noms depuis trois jours. Il dit que vous portez l'odeur du Sceau brisé.",
        "Je suis Sylvanis. Depuis deux cents ans, je suis la Voix de l'Arbre — celui qui écoute et traduit. Et ce que j'entends maintenant... *ferme les yeux* ...c'est un cri. Un cri de douleur qui ne cesse jamais.",
        "L'Arbre meurt de l'intérieur. Quelque chose s'est infiltré par les racines profondes, là où le Sceau touche la terre. Et ça remonte. Lentement, implacablement."
      ],
      playerResponses: [
        {
          id: 'sylvanis-communion-voir',
          text: "Pouvez-vous nous montrer ce que l'Arbre vous montre ?",
          consequence: "Sylvanis partage une vision terrifiante via un rituel de communion.",
          unlocks: 'vision-arbre-monde'
        },
        {
          id: 'sylvanis-communion-aider',
          text: "Comment pouvons-nous aider ?",
          consequence: "Sylvanis expose le plan de purification.",
          nextDialogue: 'sylvanis-purification'
        },
        {
          id: 'sylvanis-communion-temps',
          text: "Combien de temps avant que l'Arbre ne cède ?",
          consequence: "Sylvanis ouvre les yeux, emplis de peur. 'Des jours. Peut-être des heures.'",
          reputationChange: [{ faction: 'sylvaneth', amount: 1 }]
        }
      ]
    },
    {
      id: 'sylvanis-etat-arbre',
      npcId: 'npc:ally:sylvanis',
      trigger: 'rapport sur l\'état de l\'Arbre-Monde',
      tone: 'triste',
      conditions: { actNumber: 2, reputationMin: 3 },
      lines: [
        "*main posée sur le tronc de l'Arbre-Monde, larmes coulant de ses yeux* Chaque feuille qui tombe est une mémoire qui s'éteint. L'Arbre contient mille ans de souvenirs de la forêt. Chaque animal qui y est né, chaque saison, chaque lever de soleil.",
        "Ce matin, il a oublié le printemps de l'année 847. Tout un printemps — les fleurs, les naissances, les premières pluies — effacé. Comme si ça n'avait jamais existé.",
        "S'il meurt... ce n'est pas seulement un arbre qui tombe. C'est toute la mémoire vivante de ce monde. Et qui se souviendra de nous quand personne ne sera là pour raconter ?"
      ],
      playerResponses: [
        {
          id: 'sylvanis-etat-sauver',
          text: "Nous ne le laisserons pas mourir. Dites-nous quoi faire.",
          consequence: "Sylvanis retrouve un fragment d'espoir.",
          nextDialogue: 'sylvanis-purification',
          reputationChange: [{ faction: 'sylvaneth', amount: 3 }]
        },
        {
          id: 'sylvanis-etat-memoires',
          text: "Peut-on sauvegarder les mémoires ? Les transférer ?",
          consequence: "Sylvanis n'y avait pas pensé. Idée brillante mais complexe.",
          unlocks: 'sauvegarde-memoires-arbre'
        }
      ]
    },
    {
      id: 'sylvanis-purification',
      npcId: 'npc:ally:sylvanis',
      trigger: 'rituel de purification',
      tone: 'solennel',
      conditions: { reputationMin: 5 },
      lines: [
        "*trace des cercles de runes sur le sol autour de l'Arbre* Le Rituel des Racines Vivantes est notre dernier espoir. Il a été créé lors du Scellement original, au cas où le Sceau serait menacé.",
        "Il faut trois choses : la lumière divine canalisée depuis le sommet de l'Arbre, le sang d'un gardien de lignée versé sur les racines, et un champion qui descend dans le réseau racinaire pour affronter la corruption à sa source.",
        "Le champion verra des choses terribles. La corruption prend la forme de vos pires cauchemars. Elle essaiera de vous briser l'esprit avant d'atteindre votre corps. Peu en reviennent intacts."
      ],
      playerResponses: [
        {
          id: 'sylvanis-purif-pret',
          text: "Commençons le rituel. Nous sommes prêts.",
          consequence: "Sylvanis entame les préparatifs. Scène épique imminente.",
          questAdvanced: 'quest:purification-racines'
        },
        {
          id: 'sylvanis-purif-preparer',
          text: "Comment se préparer mentalement à ce qui attend en bas ?",
          consequence: "Sylvanis enseigne une technique de méditation elfique.",
          unlocks: 'meditation-elfique',
          reputationChange: [{ faction: 'sylvaneth', amount: 2 }]
        }
      ]
    },
    {
      id: 'sylvanis-desespoir',
      npcId: 'npc:ally:sylvanis',
      trigger: 'Sylvanis perd espoir',
      tone: 'désespéré',
      conditions: { customFlag: 'purification-echouee' },
      lines: [
        "*à genoux, mains dans la terre* J'entends... je n'entends plus rien. Le murmure... il s'est arrêté. *les branches de l'Arbre-Monde sont immobiles, les feuilles grises*",
        "Deux cents ans. Deux cents ans à écouter sa voix, chaque jour, chaque nuit. Et maintenant... le silence. *sa propre peau commence à ternir, à devenir grise*",
        "Nous avons échoué. La Voix est... *ne peut pas finir la phrase*"
      ],
      playerResponses: [
        {
          id: 'sylvanis-desesp-reveiller',
          text: "L'Arbre n'est pas mort ! Pas encore ! *secouer Sylvanis* Écoutez MIEUX !",
          consequence: "Test de Charisme DC 16 pour redonner espoir.",
          skillCheck: { skill: 'Charisme', dc: 16, success: "Sylvanis se concentre... et entend un battement faible. 'Il... il est encore là!'", failure: "Sylvanis secoue la tête. Mais le groupe peut tenter une autre approche." }
        },
        {
          id: 'sylvanis-desesp-magie',
          text: "*Canaliser sa propre magie vers l'Arbre*",
          consequence: "Sacrifice partiel de force vitale. L'Arbre gagne du temps.",
          unlocks: 'sursis-arbre-monde'
        }
      ]
    },
    {
      id: 'sylvanis-espoir-renouvele',
      npcId: 'npc:ally:sylvanis',
      trigger: 'après purification réussie',
      tone: 'amical',
      conditions: { customFlag: 'purification-reussie' },
      lines: [
        "*debout, rajeuni de vingt ans, sourire radieux* Vous l'entendez ? *les branches bruissent, les feuilles redeviennent vertes* Il chante. Pour la première fois en des mois, l'Arbre CHANTE !",
        "Le Sceau tient. Renforcé, même. Ce que vous avez fait là-dessous... l'Arbre me montre des fragments. Les ombres reculaient devant vous comme la nuit devant l'aube.",
        "*pose ses mains sur vos épaules, bénédiction elfique* Vous êtes désormais Enracinés. Amis de l'Arbre-Monde pour l'éternité. La forêt vous reconnaîtra, vous protégera, et se souviendra de vous — toujours."
      ],
      playerResponses: [
        {
          id: 'sylvanis-espoir-honneur',
          text: "C'est nous qui sommes honorés, Archidruide.",
          consequence: "Titre d'Enraciné conféré. Avantages en milieu naturel.",
          reputationChange: [{ faction: 'sylvaneth', amount: 10 }],
          unlocks: 'titre-enracine'
        },
        {
          id: 'sylvanis-espoir-suite',
          text: "Un Sceau sauvé. Il en reste d'autres. Le combat continue.",
          consequence: "Sylvanis offre l'aide des druides pour les Sceaux restants.",
          unlocks: 'aide-druides-sceaux'
        }
      ]
    }
  ]
};

// ============================================================================
// 15. PROSPERO - Courtier d'informations
// ============================================================================

const PROSPERO_DIALOGUES: NPCDialogueTree = {
  npcId: 'npc:neutral:prospero',
  npcName: 'Prospero',
  npcTitle: 'Courtier d\'informations, homme à tout savoir',
  act: 1,
  dialogues: [
    {
      id: 'prospero-prix',
      npcId: 'npc:neutral:prospero',
      trigger: 'première consultation',
      tone: 'sarcastique',
      conditions: {},
      lines: [
        "*dans un salon privé d'une auberge discrète, costume impeccable, verre de vin* Ah, des clients. Prenez place. Le vin est inclus, l'information ne l'est pas.",
        "Je suis Prospero. Je ne vole pas, je ne tue pas, je ne trahis pas — directement. Je vends du savoir. Le savoir, c'est le pouvoir, et le pouvoir, ça se monnaie.",
        "Mon tarif est simple : cent couronnes pour une rumeur, cinq cents pour un fait vérifié, mille pour un secret. Et si ce que vous cherchez vaut la vie de quelqu'un... on négocie au cas par cas."
      ],
      playerResponses: [
        {
          id: 'prospero-prix-accepter',
          text: "Qu'avez-vous en stock en ce moment ?",
          consequence: "Prospero ouvre son catalogue mental. Plusieurs options.",
          unlocks: 'catalogue-prospero'
        },
        {
          id: 'prospero-prix-negocier',
          text: "Cent couronnes pour une rumeur qui pourrait être fausse ? Rude.",
          consequence: "'Les rumeurs fausses sont les plus précieuses. Elles vous disent ce que quelqu'un VEUT que vous croyiez.'",
          reputationChange: [{ faction: 'reseau-prospero', amount: 1 }]
        },
        {
          id: 'prospero-prix-echange',
          text: "Et si on échangeait information contre information ?",
          consequence: "Prospero est intéressé. L'échange est sa devise préférée.",
          reputationChange: [{ faction: 'reseau-prospero', amount: 2 }]
        }
      ]
    },
    {
      id: 'prospero-rumeur',
      npcId: 'npc:neutral:prospero',
      trigger: 'achat d\'une rumeur',
      tone: 'mystérieux',
      conditions: { previousDialogue: 'prospero-prix' },
      lines: [
        "*sirote son vin* Voici ce que j'ai pour vous. Attention : je vends la rumeur telle quelle. Vraie, fausse, à moitié exacte — c'est à vous de démêler.",
        "On dit qu'un noble du conseil privé rencontre régulièrement un envoyé d'une puissance étrangère. Les rencontres ont lieu dans une chapelle abandonnée hors les murs, toujours à la nouvelle lune.",
        "Est-ce vrai ? Peut-être. Est-ce utile ? Certainement. Le noble en question porte une bague avec un saphir noir. C'est tout ce que je sais. Ou tout ce que je vends pour ce prix."
      ],
      playerResponses: [
        {
          id: 'prospero-rumeur-plus',
          text: "Le nom du noble vaut combien ?",
          consequence: "Prospero sourit. 'Cinq cents couronnes. C'est un fait, pas une rumeur.'",
          unlocks: 'offre-nom-noble'
        },
        {
          id: 'prospero-rumeur-bague',
          text: "Un saphir noir... on va chercher nous-mêmes.",
          consequence: "Prospero hausse les épaules. L'investigation est lancée.",
          questStarted: 'quest:noble-traitre'
        }
      ]
    },
    {
      id: 'prospero-avertissement',
      npcId: 'npc:neutral:prospero',
      trigger: 'Prospero met en garde gratuitement',
      tone: 'nerveux',
      conditions: { reputationMin: 6 },
      lines: [
        "*sans son sourire habituel, tendu* Ceci est gratuit. Parce que les morts ne paient pas, et vous mort ne me servez à rien.",
        "Le Cercle d'Ombre a mis un prix sur vos têtes. Cinq mille couronnes chacun, vivants. Dix mille, morts. Ils ont contacté tous les chasseurs de primes de la région.",
        "Je ne vous ai rien dit. Si on me demande, je dirai que je ne vous ai jamais vus. Bonne chance."
      ],
      playerResponses: [
        {
          id: 'prospero-avert-merci',
          text: "Merci, Prospero. On n'oubliera pas.",
          consequence: "Prospero de la tête. Un vrai investissement, selon lui.",
          reputationChange: [{ faction: 'reseau-prospero', amount: 3 }]
        },
        {
          id: 'prospero-avert-chasseurs',
          text: "Ces chasseurs de primes, vous avez des noms ?",
          consequence: "Prospero hésite. 'Ça, ce n'est plus gratuit. Mais le tarif sera réduit.'",
          unlocks: 'liste-chasseurs-primes'
        }
      ]
    },
    {
      id: 'prospero-dette',
      npcId: 'npc:neutral:prospero',
      trigger: 'Prospero rappelle une dette',
      tone: 'menaçant',
      conditions: { customFlag: 'dette-prospero' },
      lines: [
        "Vous vous souvenez de notre arrangement ? L'information que je vous ai donnée sur le convoi du Cercle ? Celle qui vous a permis de sauver ces prisonniers ?",
        "Le moment est venu de rembourser. Et non, je n'accepte pas les paiements différés.",
        "J'ai besoin que vous récupériez un colis au bureau de poste de la ville basse. Pas de questions sur le contenu. Pas de regards à l'intérieur. Juste la récupération et la livraison. Simple, non ?"
      ],
      playerResponses: [
        {
          id: 'prospero-dette-accepter',
          text: "Un marché est un marché. Donnez-nous les détails.",
          consequence: "Mission simple... en apparence. Le colis contient des informations sensibles.",
          questStarted: 'quest:colis-prospero'
        },
        {
          id: 'prospero-dette-refuser',
          text: "On ne fait pas de courses sans savoir pour quoi.",
          consequence: "Prospero se raidit. 'Vous rompez un accord. Ça a des conséquences.'",
          reputationChange: [{ faction: 'reseau-prospero', amount: -5 }]
        }
      ]
    },
    {
      id: 'prospero-faveur',
      npcId: 'npc:neutral:prospero',
      trigger: 'Prospero offre une faveur',
      tone: 'amical',
      conditions: { reputationMin: 10 },
      lines: [
        "Vous m'avez rapporté plus d'argent en un mois que mes trois meilleurs agents en un an. Vos aventures génèrent des informations qui valent de l'or.",
        "Alors voici : une faveur. Une seule. N'importe quelle information, n'importe quel service dans mon réseau, gratuit. Gardez-la pour quand vous en aurez vraiment besoin.",
        "Et ne la gaspillez pas. Les faveurs de Prospero sont plus rares que les larmes de dragon."
      ],
      playerResponses: [
        {
          id: 'prospero-faveur-garder',
          text: "Merci, Prospero. On la gardera précieusement.",
          consequence: "Faveur de Prospero stockée. Utilisable une fois, n'importe quand.",
          unlocks: 'faveur-prospero',
          reputationChange: [{ faction: 'reseau-prospero', amount: 3 }]
        },
        {
          id: 'prospero-faveur-maintenant',
          text: "Maintenant. On a besoin de savoir où se cache le Cercle d'Ombre.",
          consequence: "Prospero donne la localisation du QG principal du Cercle.",
          unlocks: 'localisation-qg-cercle-ombre'
        }
      ]
    },
    {
      id: 'prospero-trahison',
      npcId: 'npc:neutral:prospero',
      trigger: 'Prospero trahit si le prix est bon',
      tone: 'sarcastique',
      conditions: { reputationMax: 3, customFlag: 'offre-rivale-prospero' },
      lines: [
        "*évite votre regard* Les affaires sont les affaires. J'aurais préféré que ça se passe autrement, croyez-moi.",
        "Quelqu'un a offert plus que ce que vous pouviez vous permettre. Beaucoup plus. Et dans mon métier, la loyauté... c'est un produit de luxe que je ne peux pas toujours me payer.",
        "Si ça peut vous consoler, j'ai négocié pour que le contrat soit 'vivants'. Pas de garantie qu'ils respecteront, mais j'ai essayé."
      ],
      playerResponses: [
        {
          id: 'prospero-trahison-colere',
          text: "Quand tout ça sera fini, Prospero, on aura une conversation.",
          consequence: "Prospero déglutit. Il sait que les menaces de héros ne sont pas vides.",
          reputationChange: [{ faction: 'reseau-prospero', amount: -10 }]
        },
        {
          id: 'prospero-trahison-surenchere',
          text: "On double leur offre. Maintenant.",
          consequence: "Prospero est tenté. Test de Persuasion DC 18.",
          skillCheck: { skill: 'Persuasion', dc: 18, success: "Prospero retourne sa veste. 'Vendu. Les affaires sont les affaires... dans les deux sens.'", failure: "Prospero secoue la tête. Trop tard, les informations sont parties." }
        }
      ]
    }
  ]
};

// ============================================================================
// EXPORT
// ============================================================================

export const NPC_DIALOGUES_ACT1_2: NPCDialogueTree[] = [
  BROK_DIALOGUES,
  MARCUS_DIALOGUES,
  ELARA_DIALOGUES,
  VIEUX_SAM_DIALOGUES,
  LYSANDRA_DIALOGUES,
  ALDWIN_DIALOGUES,
  THEODORE_DIALOGUES,
  THORIN_DIALOGUES,
  ELYNDRA_DIALOGUES,
  DAME_CELESTE_DIALOGUES,
  OMBRE_DIALOGUES,
  DORVAL_DIALOGUES,
  TEMPESTA_DIALOGUES,
  SYLVANIS_DIALOGUES,
  PROSPERO_DIALOGUES
];

export type { DialogueEntry, DialogueTone, DialogueCondition, PlayerResponseOption, NPCDialogueTree };
