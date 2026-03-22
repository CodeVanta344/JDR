/**
 * DIALOGUES PROFONDS — ACTE 4 : Le Crépuscule des Royaumes
 * 13 PNJ majeurs, arbres de dialogue complets
 * Chaque dialogue : id, npcId, trigger, lines, playerResponses, tone, unlockCondition
 * Notes de coaching émotionnel pour le MJ en français
 */

// ============================================================================
// TYPES — Interface DialogueTree
// ============================================================================

export interface DialogueLine {
  speaker: string;
  text: string;
  emotion?: string;
  /** Note de coaching pour le MJ : comment jouer cette réplique */
  gmCoaching?: string;
}

export interface PlayerResponse {
  id: string;
  label: string;
  /** Conséquence narrative ou mécanique */
  consequence?: string;
  /** Mène à un autre dialogue */
  nextDialogueId?: string;
  /** Check de compétence optionnel */
  skillCheck?: { skill: string; dc: number };
  /** Changement de réputation */
  reputationChange?: { faction: string; amount: number }[];
}

export interface DialogueTree {
  id: string;
  npcId: string;
  npcName: string;
  /** Déclencheur : quand ce dialogue se lance */
  trigger: string;
  /** Répliques du PNJ (et éventuellement d'autres intervenants) */
  lines: DialogueLine[];
  /** Réponses possibles du joueur (2-4 choix) */
  playerResponses: PlayerResponse[];
  /** Tonalité générale */
  tone: string;
  /** Condition pour débloquer ce dialogue */
  unlockCondition?: string;
  /** Note de mise en scène pour le MJ */
  gmSceneNote?: string;
}

// ============================================================================
// 1. ROI THRAIN FORGE-FLAMME — Roi nain de Karak-Zhul (10 dialogues)
// ============================================================================

const THRAIN_DIALOGUES: DialogueTree[] = [
  {
    id: 'thrain-audience-royale',
    npcId: 'roi-thrain',
    npcName: 'Roi Thrain Forge-Flamme',
    trigger: 'Les PJ arrivent dans la salle du trône de Karak-Zhul',
    tone: 'majestueux, méfiant',
    unlockCondition: 'Arrivée à Karak-Zhul',
    gmSceneNote: 'Jouez Thrain comme un roc : voix grave, phrases courtes, regard perçant. Il jauge les PJ en silence avant de parler. Laissez un long silence après leur entrée.',
    lines: [
      {
        speaker: 'Roi Thrain',
        text: 'La montagne a tremblé trois fois cette lune. Mes ancêtres grondent dans leurs tombes. Et voilà que des étrangers franchissent mes portes... Parlez. Mais choisissez vos mots comme on choisit son acier — avec soin.',
        emotion: 'autorité froide',
        gmCoaching: 'Voix basse et lente. Ne regardez pas les joueurs tout de suite — fixez un point au loin, puis tournez lentement le regard vers eux.'
      },
      {
        speaker: 'Roi Thrain',
        text: 'Mon peuple creuse ces halls depuis mille ans. Nous avons survécu aux dragons, aux tremblements, aux trahisons des elfes. Ce que vous me demandez... c\'est de risquer tout cela sur la parole d\'inconnus.',
        emotion: 'gravité',
        gmCoaching: 'Posez la main à plat sur la table. Ce geste montre que Thrain pèse littéralement sa décision.'
      }
    ],
    playerResponses: [
      {
        id: 'thrain-audience-respect',
        label: 'S\'incliner selon le protocole nain et présenter les armes, pointes vers le sol.',
        consequence: 'Thrain hoche la tête, impressionné. +10 réputation nains.',
        reputationChange: [{ faction: 'karak-zhul', amount: 10 }],
        nextDialogueId: 'thrain-epreuve'
      },
      {
        id: 'thrain-audience-direct',
        label: 'Expliquer la menace sans détour : les Sceaux se brisent, le monde a besoin de Karak-Zhul.',
        consequence: 'Thrain apprécie la franchise mais exige des preuves.',
        nextDialogueId: 'thrain-epreuve'
      },
      {
        id: 'thrain-audience-brenna',
        label: 'Mentionner Brenna et ce qu\'on sait du dragon de cristal.',
        consequence: 'Le visage de Thrain se fige. Un silence de plomb tombe sur la salle.',
        nextDialogueId: 'thrain-deuil-brenna',
        skillCheck: { skill: 'Perspicacité', dc: 14 }
      },
      {
        id: 'thrain-audience-arrogant',
        label: 'Exiger son aide comme un dû, rappelant les traités anciens.',
        consequence: 'Thrain se lève, furieux. Les gardes avancent d\'un pas. -15 réputation.',
        reputationChange: [{ faction: 'karak-zhul', amount: -15 }]
      }
    ]
  },
  {
    id: 'thrain-epreuve',
    npcId: 'roi-thrain',
    npcName: 'Roi Thrain Forge-Flamme',
    trigger: 'Après l\'audience, Thrain impose une épreuve',
    tone: 'solennel, exigeant',
    unlockCondition: 'Audience royale terminée sans offense grave',
    gmSceneNote: 'L\'épreuve est autant un test de caractère que de force. Thrain observe les réactions des PJ, pas seulement le résultat.',
    lines: [
      {
        speaker: 'Roi Thrain',
        text: 'Les mots sont du vent dans la montagne. Ici, on prouve sa valeur par le fer et le feu. Mon champion, Dolgrim Brisepierre, vous attend dans l\'Arène des Ancêtres. Pas à mort — mais jusqu\'au sang.',
        emotion: 'détermination',
        gmCoaching: 'Thrain parle comme s\'il énonçait une loi naturelle, pas une suggestion. C\'est non négociable.'
      },
      {
        speaker: 'Roi Thrain',
        text: 'Et sachez ceci : je ne juge pas la victoire. Je juge le courage. Mon père disait — un nain qui se relève trois fois vaut mieux qu\'un elfe qui gagne en restant debout.',
        emotion: 'sagesse bourrue',
        gmCoaching: 'Un demi-sourire, le premier. Thrain cite son père avec une tendresse cachée sous la rudesse.'
      }
    ],
    playerResponses: [
      {
        id: 'thrain-epreuve-accepter',
        label: 'Accepter l\'épreuve avec enthousiasme.',
        consequence: 'Combat rituel contre Dolgrim. Thrain observe attentivement.',
        nextDialogueId: 'thrain-festin'
      },
      {
        id: 'thrain-epreuve-negocier',
        label: 'Proposer une épreuve différente — un défi de forge, de boisson ou de savoir.',
        consequence: 'Thrain hausse un sourcil. Jet de Persuasion DD 16 pour qu\'il accepte.',
        skillCheck: { skill: 'Persuasion', dc: 16 }
      },
      {
        id: 'thrain-epreuve-refuser',
        label: 'Refuser poliment — le temps presse.',
        consequence: 'Thrain se referme. L\'alliance sera bien plus difficile à obtenir.'
      }
    ]
  },
  {
    id: 'thrain-festin',
    npcId: 'roi-thrain',
    npcName: 'Roi Thrain Forge-Flamme',
    trigger: 'Après l\'épreuve, festin dans la Grande Halle',
    tone: 'chaleureux, bruyant, émotionnel',
    unlockCondition: 'Épreuve complétée (victoire ou défaite honorable)',
    gmSceneNote: 'Le festin nain est un moment de lâcher-prise. Thrain boit, rit, et pour la première fois montre l\'homme derrière la couronne. C\'est ici que la vraie confiance se construit.',
    lines: [
      {
        speaker: 'Roi Thrain',
        text: 'HA ! Dolgrim dit que le petit humain frappe comme un baudet enragé. Venant de lui, c\'est un compliment ! Buvez ! Ce soir, la montagne accueille des amis !',
        emotion: 'joie tonitruante',
        gmCoaching: 'Tapez du poing sur la table en riant. Thrain est transformé — bruyant, généreux, vivant. Le contraste avec l\'audience doit être saisissant.'
      },
      {
        speaker: 'Roi Thrain',
        text: '...Vous savez pourquoi je teste tous ceux qui entrent ? Parce que la dernière fois que j\'ai fait confiance trop vite... le dragon est venu. Et ma Brenna...',
        emotion: 'mélancolie soudaine',
        gmCoaching: 'Baissez la voix d\'un coup. Le bruit de la fête continue autour, mais Thrain est soudain ailleurs. Ses yeux se voilent. Tenez cette pause.'
      },
      {
        speaker: 'Roi Thrain',
        text: 'Elle est là-bas. Dans la Galerie des Cristaux. Figée. Belle comme le jour où... Pardonnez un vieux roi. L\'hydromel délie la langue.',
        emotion: 'chagrin contenu',
        gmCoaching: 'Il essuie ses yeux d\'un revers de main brusque, presque en colère contre lui-même de montrer cette faiblesse.'
      }
    ],
    playerResponses: [
      {
        id: 'thrain-festin-brenna',
        label: 'Promettre de faire tout son possible pour sauver Brenna.',
        consequence: 'Thrain vous fixe longtemps. Quelque chose change dans son regard.',
        nextDialogueId: 'thrain-alliance'
      },
      {
        id: 'thrain-festin-toast',
        label: 'Lever sa chope : "À Brenna. Et à ceux qui ne baissent jamais les bras."',
        consequence: 'Thrain frappe sa chope contre la vôtre si fort que de la bière éclabousse partout. +5 réputation.',
        reputationChange: [{ faction: 'karak-zhul', amount: 5 }]
      },
      {
        id: 'thrain-festin-silence',
        label: 'Rester silencieux par respect pour sa douleur.',
        consequence: 'Thrain hoche la tête. Il apprécie le silence plus que des mots creux.'
      }
    ]
  },
  {
    id: 'thrain-alliance',
    npcId: 'roi-thrain',
    npcName: 'Roi Thrain Forge-Flamme',
    trigger: 'Thrain accepte de discuter alliance',
    tone: 'solennel, pragmatique',
    unlockCondition: 'Réputation Karak-Zhul >= 20 ou promesse de sauver Brenna',
    gmSceneNote: 'Ce moment scelle une alliance qui changera le cours de la guerre. Rendez-le mémorable — faites-le dans la forge ancestrale, pas dans la salle du trône.',
    lines: [
      {
        speaker: 'Roi Thrain',
        text: 'Venez. Pas dans la salle du trône — dans la Forge Première. C\'est là que les vrais serments se font chez les nains.',
        emotion: 'gravité rituelle',
        gmCoaching: 'Il les emmène dans les profondeurs. La chaleur de la lave éclaire tout d\'orange. Décrivez le bruit des marteaux éternels.'
      },
      {
        speaker: 'Roi Thrain',
        text: 'Je vous donne trois mille boucliers. La Légion de Fer de Karak-Zhul marchera à vos côtés. Mais j\'ai une condition : quand la bataille sera finie, nain et humain se souviendront. Plus de royaumes séparés. Une alliance forgée, comme l\'acier — dans le feu et pour toujours.',
        emotion: 'vision d\'avenir',
        gmCoaching: 'Thrain plonge une lame dans le magma et la ressort incandescente. Il la tend symboliquement. C\'est son serment.'
      }
    ],
    playerResponses: [
      {
        id: 'thrain-alliance-accepter',
        label: 'Saisir la lame chaude à mains nues pour sceller le pacte (1d4 dégâts).',
        consequence: 'Alliance scellée dans le sang et le feu. Thrain vous considère comme un frère de forge.',
        reputationChange: [{ faction: 'karak-zhul', amount: 25 }]
      },
      {
        id: 'thrain-alliance-negocier',
        label: 'Accepter l\'alliance mais nuancer les termes politiques.',
        consequence: 'Thrain grogne mais comprend. Alliance conclue, moins symbolique.',
        skillCheck: { skill: 'Persuasion', dc: 14 },
        reputationChange: [{ faction: 'karak-zhul', amount: 15 }]
      },
      {
        id: 'thrain-alliance-surencherir',
        label: '"Pas seulement une alliance — une fraternité. Et je jure sur mon sang de ramener Brenna."',
        consequence: 'Thrain en reste muet un instant. Puis il vous serre le bras à la manière naine, si fort que ça fait mal.',
        reputationChange: [{ faction: 'karak-zhul', amount: 30 }],
        nextDialogueId: 'thrain-conseil-guerre'
      }
    ]
  },
  {
    id: 'thrain-deuil-brenna',
    npcId: 'roi-thrain',
    npcName: 'Roi Thrain Forge-Flamme',
    trigger: 'Les PJ visitent la Galerie des Cristaux avec Thrain',
    tone: 'déchirant, intime',
    unlockCondition: 'Mention de Brenna ou visite de la galerie',
    gmSceneNote: 'LA scène émotionnelle clé de Thrain. Si vos joueurs ne pleurent pas, parlez plus doucement. Le silence est votre meilleur outil ici. Décrivez Brenna figée dans le cristal, main tendue comme si elle appelait à l\'aide.',
    lines: [
      {
        speaker: 'Roi Thrain',
        text: '...Chaque matin, je viens ici. Je lui parle. Les prêtres disent qu\'elle ne peut pas entendre. Mais je suis son père. Je refuse de croire ça.',
        emotion: 'chagrin profond',
        gmCoaching: 'Voix à peine audible. Thrain touche le cristal qui emprisonne Brenna. Ses doigts tremblent — c\'est la seule fois où ce roi montre de la faiblesse physique.'
      },
      {
        speaker: 'Roi Thrain',
        text: 'Elle avait vingt-trois hivers. Elle allait diriger les éclaireurs de la Passe Orientale. Elle m\'a dit — "Père, le dragon ne me fait pas peur." Et moi, vieux fou, je l\'ai laissée partir.',
        emotion: 'culpabilité dévorante',
        gmCoaching: 'La voix se brise sur "je l\'ai laissée partir". Thrain se détourne brusquement pour cacher ses larmes. Un roi ne pleure pas devant des étrangers.'
      },
      {
        speaker: 'Roi Thrain',
        text: 'Si vous pouvez... si le dragon... Si Vyraxithon peut être raisonné ou vaincu... Je donnerai tout. Mon trône. Ma couronne. Ma vie. Tout pour qu\'elle ouvre les yeux.',
        emotion: 'supplication voilée de fierté',
        gmCoaching: 'Il ne supplie pas — il énonce un fait. Il donnerait tout. Prononcez chaque phrase comme un serment irrévocable.'
      }
    ],
    playerResponses: [
      {
        id: 'thrain-deuil-serment',
        label: 'Jurer solennellement de sauver Brenna, quoi qu\'il en coûte.',
        consequence: 'Thrain pose son front contre le vôtre — le plus grand signe de confiance nain.',
        reputationChange: [{ faction: 'karak-zhul', amount: 20 }],
        nextDialogueId: 'thrain-alliance'
      },
      {
        id: 'thrain-deuil-prudent',
        label: '"Je ne fais pas de promesses que je ne peux pas tenir. Mais je ferai de mon mieux."',
        consequence: 'Thrain acquiesce. Il respecte l\'honnêteté plus que les grands mots.',
        reputationChange: [{ faction: 'karak-zhul', amount: 10 }]
      },
      {
        id: 'thrain-deuil-question',
        label: 'Demander ce que Thrain sait de Vyraxithon et comment approcher le dragon.',
        consequence: 'Thrain partage tout ce qu\'il sait — y compris un passage secret vers l\'antre.'
      }
    ]
  },
  {
    id: 'thrain-joie-brenna',
    npcId: 'roi-thrain',
    npcName: 'Roi Thrain Forge-Flamme',
    trigger: 'Les PJ ramènent Brenna libérée du cristal',
    tone: 'joie absolue, gratitude infinie',
    unlockCondition: 'Brenna libérée de la pétrification',
    gmSceneNote: 'Si vous avez bien joué le deuil, cette scène sera cathartique. Thrain, le roi de fer, tombe à genoux. Laissez les joueurs savourer ce moment. Ils l\'ont mérité.',
    lines: [
      {
        speaker: 'Roi Thrain',
        text: '...Brenna ?',
        emotion: 'incrédulité totale',
        gmCoaching: 'Un seul mot. Murmuré. Thrain ne bouge pas pendant trois secondes complètes, comme si bouger allait briser le rêve.'
      },
      {
        speaker: 'Brenna',
        text: 'Père... j\'ai fait un rêve si long...',
        emotion: 'confusion douce',
        gmCoaching: 'Voix fragile, enfantine presque. Elle ne sait pas combien de temps a passé.'
      },
      {
        speaker: 'Roi Thrain',
        text: 'Par les ancêtres... PAR TOUS LES ANCÊTRES !',
        emotion: 'explosion de joie',
        gmCoaching: 'Thrain court — COURT — vers sa fille et la soulève dans ses bras en rugissant de joie. Les gardes se mettent à frapper leurs boucliers en rythme. Tout Karak-Zhul résonne.'
      },
      {
        speaker: 'Roi Thrain',
        text: 'Vous... Vous m\'avez rendu mon enfant. Il n\'existe pas de mots dans aucune langue — naine, humaine, elfique — pour dire ce que je vous dois. Demandez. N\'importe quoi. C\'est à vous.',
        emotion: 'gratitude sans bornes',
        gmCoaching: 'Thrain tient toujours Brenna d\'un bras, et de l\'autre il agrippe l\'épaule du PJ le plus proche. Ses yeux brillent de larmes qu\'il ne cherche plus à cacher.'
      }
    ],
    playerResponses: [
      {
        id: 'thrain-joie-humble',
        label: '"Votre alliance dans la bataille à venir est tout ce que nous demandons."',
        consequence: 'Thrain jure fidélité éternelle. La Légion de Fer EST à vos ordres, pas seulement alliée.',
        reputationChange: [{ faction: 'karak-zhul', amount: 30 }]
      },
      {
        id: 'thrain-joie-forge',
        label: 'Demander une arme forgée dans le mithral de Karak-Zhul.',
        consequence: 'Thrain ordonne à Grimjaw de forger la plus belle arme que la montagne ait jamais produite.',
        nextDialogueId: 'grimjaw-craft'
      },
      {
        id: 'thrain-joie-rien',
        label: '"Voir un père retrouver sa fille est la seule récompense dont j\'ai besoin."',
        consequence: 'Thrain reste silencieux un moment, puis murmure "Vous êtes meilleur que la plupart des rois."',
        reputationChange: [{ faction: 'karak-zhul', amount: 25 }]
      }
    ]
  },
  {
    id: 'thrain-combat',
    npcId: 'roi-thrain',
    npcName: 'Roi Thrain Forge-Flamme',
    trigger: 'Combat majeur avec Thrain comme allié',
    tone: 'féroce, exaltant',
    unlockCondition: 'Alliance avec Karak-Zhul et combat majeur',
    gmSceneNote: 'Thrain au combat est une force de la nature. Il chante des hymnes de guerre nains en fracassant des ennemis. Montrez aux joueurs ce qu\'un allié de poids change.',
    lines: [
      {
        speaker: 'Roi Thrain',
        text: 'KARAK-ZHUL ! Pour la montagne et pour les vivants ! Que mes ancêtres guident ma hache et que mes ennemis nourrissent la terre !',
        emotion: 'rage de bataille',
        gmCoaching: 'Criez. Littéralement. C\'est un cri de guerre nain. Si vos joueurs ne sursautent pas, vous ne l\'avez pas assez crié.'
      },
      {
        speaker: 'Roi Thrain',
        text: 'Dos à dos, étranger ! Les nains ne reculent jamais — et ce soir, vous êtes un nain honoraire !',
        emotion: 'camaraderie de combat',
        gmCoaching: 'Thrain se place dos au PJ guerrier. Ce geste dit plus que mille mots — il confie sa vie.'
      }
    ],
    playerResponses: [
      {
        id: 'thrain-combat-cri',
        label: 'Pousser son propre cri de guerre et charger aux côtés de Thrain.',
        consequence: 'Avantage sur la prochaine attaque. La Légion de Fer rugit en réponse.'
      },
      {
        id: 'thrain-combat-tactique',
        label: 'Suggérer une manoeuvre tactique à Thrain.',
        consequence: 'Jet de Tactique DD 13. Succès : les nains exécutent une manoeuvre dévastatrice.',
        skillCheck: { skill: 'Tactique', dc: 13 }
      },
      {
        id: 'thrain-combat-proteger',
        label: 'Protéger Thrain d\'un coup qui allait le toucher.',
        consequence: 'Le PJ prend les dégâts à la place du roi. Thrain n\'oubliera JAMAIS.',
        reputationChange: [{ faction: 'karak-zhul', amount: 15 }]
      }
    ]
  },
  {
    id: 'thrain-conseil-guerre',
    npcId: 'roi-thrain',
    npcName: 'Roi Thrain Forge-Flamme',
    trigger: 'Conseil de guerre avant la grande bataille',
    tone: 'grave, stratégique',
    unlockCondition: 'Alliance scellée, préparatifs de guerre',
    gmSceneNote: 'Thrain déploie une carte gravée dans la pierre. Des figurines de métal représentent les armées. C\'est un stratège brillant malgré ses manières bourrues.',
    lines: [
      {
        speaker: 'Roi Thrain',
        text: 'Malachar masse ses forces ici, au Col des Lamentations. Vingt mille morts-vivants, peut-être plus. Mes éclaireurs comptent des horreurs que je n\'ai pas de nom pour décrire.',
        emotion: 'pragmatisme militaire',
        gmCoaching: 'Pointez la carte avec un doigt de fer. Chaque information est livrée comme un fait, sans émotion — c\'est un stratège en mode opérationnel.'
      },
      {
        speaker: 'Roi Thrain',
        text: 'La Légion de Fer tiendra le flanc gauche. Mais il nous faut quelqu\'un pour le coeur. Quelqu\'un d\'assez fou — ou d\'assez brave — pour enfoncer le centre et atteindre Malachar lui-même.',
        emotion: 'respect grave',
        gmCoaching: 'Il regarde les PJ. Il sait ce qu\'il demande. C\'est possiblement une mission suicide.'
      }
    ],
    playerResponses: [
      {
        id: 'thrain-conseil-accepter',
        label: '"Nous prendrons le centre. C\'est pour ça qu\'on est là."',
        consequence: 'Thrain hoche la tête. "Je savais que vous diriez ça. C\'est pour ça que je vous respecte."'
      },
      {
        id: 'thrain-conseil-plan',
        label: 'Proposer un plan alternatif : une frappe chirurgicale, pas un assaut frontal.',
        consequence: 'Jet de Tactique DD 15. Succès : plan plus risqué mais potentiellement moins sanglant.',
        skillCheck: { skill: 'Tactique', dc: 15 }
      },
      {
        id: 'thrain-conseil-renforts',
        label: 'Demander si d\'autres alliés peuvent être mobilisés.',
        consequence: 'Thrain mentionne Dame Nyx et ses espions, et Vaelith avec les mages.'
      }
    ]
  },
  {
    id: 'thrain-adieu-possible',
    npcId: 'roi-thrain',
    npcName: 'Roi Thrain Forge-Flamme',
    trigger: 'Veille de la bataille finale, moment privé',
    tone: 'intime, testamentaire',
    unlockCondition: 'Alliance scellée, veille de bataille',
    gmSceneNote: 'Thrain vient trouver les PJ seul, sans gardes, sans couronne. Juste un père et un guerrier vieillissant qui sait qu\'il ne survivra peut-être pas.',
    lines: [
      {
        speaker: 'Roi Thrain',
        text: 'Ne vous levez pas. Pas de "Majesté" ce soir. Ce soir je suis juste Thrain. Un nain fatigué qui voulait vous dire... merci. Pour Brenna. Pour avoir traité mon peuple avec honneur.',
        emotion: 'vulnérabilité',
        gmCoaching: 'Thrain s\'assied par terre, à côté des PJ, comme un vieux soldat au bivouac. Pas de protocole. Juste deux êtres humains (enfin, un nain) avant l\'orage.'
      },
      {
        speaker: 'Roi Thrain',
        text: 'Si je tombe demain... Brenna sera reine. Elle est plus forte que moi. Plus sage aussi, probablement. Mais si vous pouviez... garder un oeil sur elle. De loin. Ça me soulagerait.',
        emotion: 'tendresse paternelle',
        gmCoaching: 'C\'est le testament d\'un père, pas d\'un roi. Sa voix est douce, presque méconnaissable.'
      }
    ],
    playerResponses: [
      {
        id: 'thrain-adieu-promesse',
        label: '"Sur mon honneur, Thrain. Je veillerai sur elle."',
        consequence: 'Thrain sourit — un vrai sourire, rare et précieux — et tend une flasque d\'hydromel.'
      },
      {
        id: 'thrain-adieu-optimiste',
        label: '"Tu diras ça toi-même à Brenna après la victoire, vieux têtu."',
        consequence: 'Thrain rit doucement. "Vous avez peut-être raison. Les nains sont difficiles à tuer."'
      },
      {
        id: 'thrain-adieu-honneur',
        label: '"Si l\'un de nous tombe, l\'autre racontera son histoire. C\'est le pacte des guerriers."',
        consequence: 'Thrain sort un petit marteau en pendentif et le donne au PJ. "Le symbole de ma maison. Portez-le demain."'
      }
    ]
  },
  {
    id: 'thrain-victoire',
    npcId: 'roi-thrain',
    npcName: 'Roi Thrain Forge-Flamme',
    trigger: 'Après la victoire, Thrain s\'adresse aux PJ',
    tone: 'triomphal, ému',
    unlockCondition: 'Victoire de la bataille et survie de Thrain',
    gmSceneNote: 'Thrain debout sur les décombres, hache ensanglantée, couronné de poussière et de gloire. Il lève sa hache vers les PJ devant toute son armée.',
    lines: [
      {
        speaker: 'Roi Thrain',
        text: 'NAINS DE KARAK-ZHUL ! Regardez bien ces visages ! Ces héros ont saigné avec nous. Ont pleuré avec nous. Ont ri avec nous. À partir de ce jour, par décret royal, ils sont THANES DE LA MONTAGNE ! Que quiconque leur ferme sa porte subisse ma colère !',
        emotion: 'proclamation glorieuse',
        gmCoaching: 'Debout. Bras levés. Voix qui porte comme un tonnerre. L\'armée naine frappe le sol de ses bottes en rythme — BOUM, BOUM, BOUM.'
      }
    ],
    playerResponses: [
      {
        id: 'thrain-victoire-honneur',
        label: 'Accepter le titre avec émotion et lever son arme en retour.',
        consequence: 'Les PJ sont désormais Thanes de Karak-Zhul. Accès permanent à la cité et à ses ressources.',
        reputationChange: [{ faction: 'karak-zhul', amount: 50 }]
      },
      {
        id: 'thrain-victoire-humble',
        label: '"L\'honneur est partagé. Sans la Légion de Fer, nous serions tombés."',
        consequence: 'Les nains rugissent d\'approbation. Thrain hoche la tête, les yeux brillants.'
      }
    ]
  },
];

// ============================================================================
// 2. VYRAXITHON LE DRAGON DE CRISTAL — Gardien ancien (6 dialogues)
// ============================================================================

const VYRAXITHON_DIALOGUES: DialogueTree[] = [
  {
    id: 'vyrax-avertissement',
    npcId: 'vyraxithon',
    npcName: 'Vyraxithon le Dragon de Cristal',
    trigger: 'Approche de l\'antre du dragon',
    tone: 'terreur, puissance primordiale',
    gmSceneNote: 'Le rugissement fait vibrer la poitrine des joueurs. Des cristaux explosent autour d\'eux. Ce n\'est pas un monstre — c\'est une catastrophe naturelle qui parle.',
    lines: [
      {
        speaker: 'Vyraxithon',
        text: 'RRRRAAAAAHHHH ! INSECTES ! Vous osez fouler les dalles de MON sanctuaire ? Mille ans j\'ai veillé ici, et mille ans encore je veillerai. Partez ou devenez cristal — comme la dernière mortelle qui a osé me défier.',
        emotion: 'rage cosmique',
        gmCoaching: 'Voix caverneuse, résonnante, qui vient de partout à la fois. Chaque mot fait trembler le sol. Les PJ doivent sentir physiquement la puissance de cet être.'
      }
    ],
    playerResponses: [
      {
        id: 'vyrax-avert-diplomatie',
        label: 'S\'agenouiller et parler avec respect : "Grand Gardien, nous venons en paix."',
        consequence: 'Vyraxithon se tait un instant. Surpris. Jet de Persuasion DD 18.',
        skillCheck: { skill: 'Persuasion', dc: 18 },
        nextDialogueId: 'vyrax-sagesse'
      },
      {
        id: 'vyrax-avert-defi',
        label: 'Brandir ses armes et se préparer au combat.',
        consequence: 'Initiative ! Combat contre un dragon ancien. (Quasi-suicide sans préparation.)',
        nextDialogueId: 'vyrax-colere'
      },
      {
        id: 'vyrax-avert-brenna',
        label: 'Montrer le pendentif de Brenna ou mentionner la princesse pétrifiée.',
        consequence: 'Les yeux du dragon se plissent. Une lueur étrange passe dans ses facettes cristallines.',
        nextDialogueId: 'vyrax-sagesse'
      }
    ]
  },
  {
    id: 'vyrax-sagesse',
    npcId: 'vyraxithon',
    npcName: 'Vyraxithon le Dragon de Cristal',
    trigger: 'Dialogue diplomatique engagé',
    tone: 'ancien, philosophique, distant',
    unlockCondition: 'Approche diplomatique réussie',
    gmSceneNote: 'Vyraxithon baisse la tête au niveau des PJ. Ses yeux sont des prismes qui reflètent toutes les couleurs. Quand il parle doucement, c\'est presque pire que quand il rugit — on sent l\'intelligence terrifiante derrière.',
    lines: [
      {
        speaker: 'Vyraxithon',
        text: 'Hmm. Il y a longtemps qu\'un mortel ne m\'a pas parlé au lieu de crier. Vous avez du courage. Ou de la folie. Chez votre espèce, c\'est souvent la même chose.',
        emotion: 'curiosité amusée',
        gmCoaching: 'Ton condescendant mais pas hostile. Vyraxithon observe les PJ comme un entomologiste observe des insectes — fascinants mais inférieurs.'
      },
      {
        speaker: 'Vyraxithon',
        text: 'Je suis le dernier des Gardiens de Cristal. Avant que vos "royaumes" n\'existent, avant que vos "dieux" ne se nomment ainsi, nous veillions sur les Nexus. Les Premiers nous avaient confié cette tâche. Et je ne faillirai pas — même si l\'univers entier l\'exige.',
        emotion: 'fierté millénaire',
        gmCoaching: 'Majesté absolue. Vyraxithon ne se vante pas — il énonce des faits cosmiques. Parlez lentement, chaque mot pesé.'
      },
      {
        speaker: 'Vyraxithon',
        text: 'La petite naine... oui. Elle est venue avec du fer et de la rage. J\'ai fait ce que je devais. Le cristal la préserve. Un jour, peut-être, quand les mortels seront dignes, je la libérerai.',
        emotion: 'détachement ancien',
        gmCoaching: 'Aucun remords dans sa voix. Pour un être millénaire, pétrifier quelqu\'un est un geste de clémence — il aurait pu la tuer.'
      }
    ],
    playerResponses: [
      {
        id: 'vyrax-sagesse-question',
        label: 'Demander ce que signifie "être dignes" — que veut-il exactement ?',
        consequence: 'Vyraxithon explique : il faut prouver que les mortels peuvent protéger ce qu\'ils cherchent à utiliser.',
        nextDialogueId: 'vyrax-pacte'
      },
      {
        id: 'vyrax-sagesse-premiers',
        label: 'Interroger le dragon sur les Premiers et les Sceaux.',
        consequence: 'Les yeux du dragon s\'illuminent. Enfin un mortel qui pose les bonnes questions.',
        nextDialogueId: 'vyrax-revelation'
      },
      {
        id: 'vyrax-sagesse-brenna',
        label: 'Insister pour la libération immédiate de Brenna.',
        consequence: 'Vyraxithon gronde. La diplomatie vacille. Jet de Persuasion DD 20 pour éviter le combat.',
        skillCheck: { skill: 'Persuasion', dc: 20 }
      }
    ]
  },
  {
    id: 'vyrax-pacte',
    npcId: 'vyraxithon',
    npcName: 'Vyraxithon le Dragon de Cristal',
    trigger: 'Les PJ cherchent un accord avec le dragon',
    tone: 'solennel, cosmique',
    unlockCondition: 'Dialogue de sagesse réussi',
    gmSceneNote: 'Moment pivot. Le pacte avec un dragon ancien est quelque chose qui ne s\'est pas produit depuis des millénaires. Rendez chaque mot lourd de conséquences.',
    lines: [
      {
        speaker: 'Vyraxithon',
        text: 'Un pacte... Vous ne savez pas ce que vous demandez. Les derniers mortels à avoir passé un pacte avec un Gardien étaient les Premiers eux-mêmes. Et regardez comment cela a fini — des sceaux brisés et un monde en ruine.',
        emotion: 'amertume millénaire',
        gmCoaching: 'Fatigue cosmique. Vyraxithon a vu des civilisations naître et mourir. Chaque pacte rompu l\'a blessé un peu plus.'
      },
      {
        speaker: 'Vyraxithon',
        text: 'Soit. Voici mes termes : apportez-moi un Fragment d\'Éternité — arraché au coeur du Nexus le plus proche. Si vous survivez à cette épreuve, je saurai que vous êtes dignes. Je libérerai la naine. Et je prêterai ma force pour la bataille finale.',
        emotion: 'décision pesée',
        gmCoaching: 'Un Fragment d\'Éternité — quête secondaire majeure. Le dragon ne négocie pas ; il offre un test.'
      }
    ],
    playerResponses: [
      {
        id: 'vyrax-pacte-accepter',
        label: 'Accepter le pacte sans hésitation.',
        consequence: 'Vyraxithon marque le PJ d\'un sceau cristallin sur le front — guide vers le Nexus.'
      },
      {
        id: 'vyrax-pacte-negocier',
        label: 'Demander s\'il existe un autre moyen — le temps presse.',
        consequence: 'Vyraxithon : "Le temps ? J\'ai mille ans de patience. Vous, non." Jet Persuasion DD 22.',
        skillCheck: { skill: 'Persuasion', dc: 22 }
      },
      {
        id: 'vyrax-pacte-savoir',
        label: 'Demander ce qu\'est exactement un Fragment d\'Éternité.',
        consequence: 'Vyraxithon explique — un éclat de la création primordiale, dangereux et magnifique.'
      }
    ]
  },
  {
    id: 'vyrax-colere',
    npcId: 'vyraxithon',
    npcName: 'Vyraxithon le Dragon de Cristal',
    trigger: 'Provocation ou attaque du dragon',
    tone: 'terreur absolue',
    unlockCondition: 'Insulte, attaque, ou échec diplomatique critique',
    gmSceneNote: 'Vyraxithon en colère est un cataclysme. Ne faites pas un combat classique — décrivez un environnement qui se détruit. Les PJ doivent avoir PEUR.',
    lines: [
      {
        speaker: 'Vyraxithon',
        text: 'ASSEZ ! Vous venez dans MA demeure, vous menacez UN GARDIEN, et vous osez croire que votre petite vie de soixante-dix ans vous donne le DROIT de me juger ?!',
        emotion: 'fureur divine',
        gmCoaching: 'Levez-vous de votre chaise. Penchez-vous vers les joueurs. Le dragon est à deux mètres de leurs visages et sa gueule brille de cristaux incandescents.'
      },
      {
        speaker: 'Vyraxithon',
        text: 'J\'ai PIÉTIÉ des armées. J\'ai regardé des EMPIRES brûler en clignant des yeux. Vous n\'êtes rien. RIEN.',
        emotion: 'mépris cosmique',
        gmCoaching: 'Chaque mot est un coup de tonnerre. Les cristaux autour des PJ commencent à les encercler, à pousser du sol.'
      }
    ],
    playerResponses: [
      {
        id: 'vyrax-colere-soumission',
        label: 'Poser ses armes immédiatement et s\'agenouiller.',
        consequence: 'Jet de Survie DD 16. Succès : Vyraxithon se calme. Échec : pétrification partielle (1d6 dégâts).',
        skillCheck: { skill: 'Survie', dc: 16 },
        nextDialogueId: 'vyrax-sagesse'
      },
      {
        id: 'vyrax-colere-fuir',
        label: 'Fuir vers la sortie le plus vite possible.',
        consequence: 'Jet de Dextérité DD 14 pour éviter les cristaux qui poussent et bloquent le passage.'
      },
      {
        id: 'vyrax-colere-combattre',
        label: 'Se battre. Tant pis.',
        consequence: 'Combat contre Vyraxithon (CR 20). Bonne chance.'
      }
    ]
  },
  {
    id: 'vyrax-respect',
    npcId: 'vyraxithon',
    npcName: 'Vyraxithon le Dragon de Cristal',
    trigger: 'Les PJ ont prouvé leur valeur (Fragment d\'Éternité rapporté)',
    tone: 'respect profond, émerveillement',
    unlockCondition: 'Fragment d\'Éternité obtenu et rapporté',
    gmSceneNote: 'Vyraxithon s\'incline devant les PJ. Un DRAGON s\'incline. Laissez le poids de ce moment peser sur la table.',
    lines: [
      {
        speaker: 'Vyraxithon',
        text: '...Remarquable. En mille deux cents ans, aucun mortel n\'avait accompli ceci. Vous portez le Fragment comme si c\'était un caillou de rivière. Peut-être me suis-je trompé sur votre espèce.',
        emotion: 'respect sincère',
        gmCoaching: 'Le dragon baisse sa tête immense devant les PJ. Ses cristaux émettent une lumière douce, presque chaleureuse. Il est ému — autant qu\'un dragon peut l\'être.'
      },
      {
        speaker: 'Vyraxithon',
        text: 'La petite naine sera libérée. Et quand viendra le crépuscule final... appelez mon nom. VYRAXITHON. Criez-le au ciel, et je viendrai. Un Gardien paie toujours ses dettes.',
        emotion: 'serment solennel',
        gmCoaching: 'Promesse d\'un allié dévastateur pour la bataille finale. Les PJ ont gagné un dragon. LAISSEZ-LES SAVOURER.'
      }
    ],
    playerResponses: [
      {
        id: 'vyrax-respect-honneur',
        label: '"L\'honneur est mien, Grand Gardien. Puissions-nous être dignes de votre confiance."',
        consequence: 'Vyraxithon offre une écaille de cristal — artefact de protection puissant.'
      },
      {
        id: 'vyrax-respect-question',
        label: 'Profiter de ce moment pour poser des questions sur les Premiers et l\'Entité.',
        consequence: 'Vyraxithon partage des secrets cosmiques cruciaux.',
        nextDialogueId: 'vyrax-revelation'
      }
    ]
  },
  {
    id: 'vyrax-revelation',
    npcId: 'vyraxithon',
    npcName: 'Vyraxithon le Dragon de Cristal',
    trigger: 'Vyraxithon révèle la vérité sur les Premiers',
    tone: 'mystique, révélation cosmique',
    unlockCondition: 'Respect ou pacte avec le dragon',
    gmSceneNote: 'La GRANDE RÉVÉLATION de l\'Acte 4. Vyraxithon ouvre une mémoire cristalline — les PJ voient littéralement le passé. Décrivez une vision époustouflante.',
    lines: [
      {
        speaker: 'Vyraxithon',
        text: 'Vous voulez la vérité ? Regardez.',
        emotion: 'gravité absolue',
        gmCoaching: 'Un cristal s\'illumine et projette des images holographiques. Les PJ voient les Premiers — pas des dieux, mais des êtres comme eux, terrifiés, essayant de sauver un monde mourant.'
      },
      {
        speaker: 'Vyraxithon',
        text: 'Les Premiers n\'étaient pas des dieux. C\'étaient des mortels — comme vous. Ils ont trouvé les Nexus par accident. Ils ont créé les Sceaux pour contenir ce qu\'ils avaient réveillé — Ael\'Sharath, l\'Entité. Mais le prix... le prix était leur humanité. Ils sont devenus les Sceaux.',
        emotion: 'vérité terrible',
        gmCoaching: 'Chaque phrase est une bombe. Laissez des pauses entre elles. Les joueurs doivent digérer l\'information.'
      },
      {
        speaker: 'Vyraxithon',
        text: 'Quand les Sceaux se brisent, ce ne sont pas des pierres magiques qui craquent. Ce sont des ÂMES qui hurlent. Les âmes des Premiers. Et bientôt, il ne restera plus rien pour contenir Ael\'Sharath.',
        emotion: 'horreur cosmique',
        gmCoaching: 'Les images montrent des silhouettes humaines emprisonnées dans les Sceaux, tordues de douleur. C\'est horrible et magnifique.'
      }
    ],
    playerResponses: [
      {
        id: 'vyrax-revel-comment',
        label: '"Comment arrêter ça ? Il doit y avoir un moyen !"',
        consequence: 'Vyraxithon : "Il y en a un. Mais il exigera un sacrifice que vous n\'êtes peut-être pas prêts à faire."'
      },
      {
        id: 'vyrax-revel-entite',
        label: '"Qu\'est-ce qu\'Ael\'Sharath exactement ? Peut-on la raisonner ?"',
        consequence: 'Vyraxithon hésite. "Elle n\'est pas mauvaise. Elle EST. Comme une tempête. On ne raisonne pas une tempête."'
      },
      {
        id: 'vyrax-revel-choc',
        label: 'Rester silencieux, assommé par la révélation.',
        consequence: 'Vyraxithon laisse le silence s\'installer. "Maintenant vous savez. Et le savoir est un fardeau que vous ne pourrez plus déposer."'
      }
    ]
  },
];

// ============================================================================
// 3. ARCHON VEXOR — Nécromancien tragique (8 dialogues)
// ============================================================================

const VEXOR_DIALOGUES: DialogueTree[] = [
  {
    id: 'vexor-monologue',
    npcId: 'archon-vexor',
    npcName: 'Archon Vexor',
    trigger: 'Première confrontation avec Vexor',
    tone: 'théâtral, menaçant, complexe',
    gmSceneNote: 'Vexor n\'est PAS un méchant classique. C\'est un homme brisé qui a fait des choix horribles par amour. Jouez-le comme un tragédien, pas comme un monstre.',
    lines: [
      {
        speaker: 'Vexor',
        text: 'Ah... les "héros". Toujours les mêmes. Vous venez me juger, n\'est-ce pas ? Me dire que la nécromancie est un mal ? Que lever les morts est une abomination ?',
        emotion: 'ironie amère',
        gmCoaching: 'Vexor applaudit lentement, sarcastique. Mais ses yeux sont épuisés. Ce n\'est pas de la cruauté — c\'est du cynisme né de la douleur.'
      },
      {
        speaker: 'Vexor',
        text: 'Laissez-moi vous poser une question, "héros". Si la femme que vous aimiez mourait dans vos bras, rongée par une maladie que vos dieux si bienveillants refusent de guérir... jusqu\'où iriez-vous ?',
        emotion: 'défi philosophique',
        gmCoaching: 'Il se rapproche. Sa voix baisse. Ce n\'est plus du théâtre — c\'est une confession. Il veut sincèrement une réponse.'
      },
      {
        speaker: 'Vexor',
        text: 'MOI, j\'ai été jusqu\'au bout. Et je le referais. Chaque. Jour.',
        emotion: 'défi et douleur',
        gmCoaching: 'Trois mots martelés. Puis silence. Vexor ne regrette pas — il souffre, mais il ne regrette pas.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-mono-empathie',
        label: '"Je comprends votre douleur. Mais ce chemin ne mène nulle part."',
        consequence: 'Vexor tressaille. On ne lui a pas parlé avec empathie depuis longtemps.',
        nextDialogueId: 'vexor-doute'
      },
      {
        id: 'vexor-mono-defi',
        label: '"La souffrance n\'excuse pas le mal que vous avez fait."',
        consequence: 'Vexor s\'assombrit. "Le mal ? MOI ? Parlez-moi du mal quand vos dieux laissent mourir des enfants."',
        nextDialogueId: 'vexor-rage'
      },
      {
        id: 'vexor-mono-question',
        label: '"Dites-moi son nom. La femme que vous avez perdue."',
        consequence: 'Vexor est pris de court. Personne ne lui a jamais demandé ça.',
        nextDialogueId: 'vexor-flashback'
      },
      {
        id: 'vexor-mono-combat',
        label: 'Attaquer sans discuter.',
        consequence: 'Combat immédiat. Vexor est déçu : "Évidemment. Comme toujours."',
        nextDialogueId: 'vexor-combat'
      }
    ]
  },
  {
    id: 'vexor-flashback',
    npcId: 'archon-vexor',
    npcName: 'Archon Vexor',
    trigger: 'Les PJ demandent l\'histoire de Vexor',
    tone: 'mélancolique, intime, déchirant',
    unlockCondition: 'Avoir posé la question sur sa femme',
    gmSceneNote: 'Le coeur du personnage. Si les joueurs pleurent pour le méchant, vous avez réussi. Parlez doucement, comme si chaque mot coûtait à Vexor.',
    lines: [
      {
        speaker: 'Vexor',
        text: '...Elyndra. Elle s\'appelait Elyndra. Elle cultivait des fleurs d\'aurore — ces petites choses bleues qui ne poussent que dans les clairières de Sylvandell. Notre maison en était pleine.',
        emotion: 'nostalgie pure',
        gmCoaching: 'Vexor sourit pour la première et peut-être dernière fois. Un vrai sourire, doux, celui de l\'homme qu\'il était avant. Sa voix change — plus jeune, plus tendre.'
      },
      {
        speaker: 'Vexor',
        text: 'La fièvre noire l\'a prise en trois semaines. J\'ai prié tous les dieux. TOUS. Charun, Aelindra, même Tharok le dieu des ténèbres. J\'ai supplié les prêtres. J\'ai offert tout mon or. Et chacun m\'a dit la même chose : "C\'est la volonté divine."',
        emotion: 'rage contenue',
        gmCoaching: 'La voix monte progressivement. La tendresse se transforme en fureur. Les mots "volonté divine" sont crachés.'
      },
      {
        speaker: 'Vexor',
        text: 'Elle est morte un mardi. Un mardi banal. Le soleil brillait. Les oiseaux chantaient. Et moi j\'ai tenu sa main jusqu\'à ce qu\'elle soit froide, et j\'ai juré que plus JAMAIS un dieu ne déciderait qui vit et qui meurt.',
        emotion: 'trauma fondateur',
        gmCoaching: 'Voix brisée sur "froide". Puis dure comme le diamant sur le serment final. C\'est LE moment qui a créé le nécromancien.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-flash-compassion',
        label: '"Elyndra ne voudrait pas ça, Vexor. Vous le savez."',
        consequence: 'Vexor ferme les yeux. Un muscle tressaute sur sa joue. Coup critique émotionnel.',
        nextDialogueId: 'vexor-doute'
      },
      {
        id: 'vexor-flash-comprendre',
        label: '"J\'aurais peut-être fait la même chose à votre place."',
        consequence: 'Vexor vous regarde avec une intensité terrifiante. "Vraiment ? Alors vous comprenez pourquoi je ne peux pas m\'arrêter."'
      },
      {
        id: 'vexor-flash-defi',
        label: '"Et combien d\'Elyndras avez-vous créées depuis ? Combien de familles brisées ?"',
        consequence: 'Vexor tressaille comme s\'il avait reçu un coup physique.',
        nextDialogueId: 'vexor-doute'
      }
    ]
  },
  {
    id: 'vexor-rage',
    npcId: 'archon-vexor',
    npcName: 'Archon Vexor',
    trigger: 'Vexor est confronté ou accusé',
    tone: 'explosif, amer',
    unlockCondition: 'Accusation morale directe',
    gmSceneNote: 'L\'explosion de Vexor. Ses pouvoirs nécromantiques crépitent autour de lui — l\'air devient glacial, des ombres s\'allongent. Mais il ne frappe pas encore.',
    lines: [
      {
        speaker: 'Vexor',
        text: 'LE MAL ?! VOUS voulez parler du mal ?! Où étaient vos précieux dieux quand la peste frappait ? Où étaient vos rois quand les pauvres mouraient dans les rues ? MOI au moins j\'AGIS !',
        emotion: 'fureur brûlante',
        gmCoaching: 'L\'air gèle autour de Vexor. Des ombres se lèvent du sol. Il flotte presque. Mais ses yeux — ses yeux montrent la douleur, pas la folie.'
      },
      {
        speaker: 'Vexor',
        text: 'Malachar... oui, il m\'a utilisé. Il m\'a promis le pouvoir de vaincre la mort elle-même. Et j\'ai marché. Parce que l\'espoir est la plus cruelle des chaînes.',
        emotion: 'lucidité amère',
        gmCoaching: 'L\'énergie retombe d\'un coup. Vexor se dégonfle. Il sait qu\'il a été manipulé. Mais il ne peut pas reculer — c\'est trop tard, croit-il.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-rage-calmer',
        label: '"Vous avez raison — les dieux ont échoué. Mais Malachar n\'est pas la réponse."',
        consequence: 'Jet de Persuasion DD 17. Succès : Vexor tremble. Ses défenses émotionnelles craquent.',
        skillCheck: { skill: 'Persuasion', dc: 17 },
        nextDialogueId: 'vexor-doute'
      },
      {
        id: 'vexor-rage-combattre',
        label: 'Se préparer au combat — Vexor est trop dangereux pour être raisonné.',
        consequence: 'Combat. Vexor est un adversaire redoutable mais pas à pleine puissance (son doute le freine).',
        nextDialogueId: 'vexor-combat'
      },
      {
        id: 'vexor-rage-question',
        label: '"Malachar vous a-t-il réellement donné ce qu\'il a promis ? Avez-vous ramené Elyndra ?"',
        consequence: 'Le silence qui suit est assourdissant. Vexor n\'a pas ramené Elyndra. Il le sait.',
        nextDialogueId: 'vexor-doute'
      }
    ]
  },
  {
    id: 'vexor-doute',
    npcId: 'archon-vexor',
    npcName: 'Archon Vexor',
    trigger: 'Les PJ ébranlent les convictions de Vexor',
    tone: 'vulnérable, en crise',
    unlockCondition: 'Empathie ou argument philosophique percutant',
    gmSceneNote: 'L\'armure émotionnelle de Vexor se fissure. Pour la première fois, l\'homme sous le nécromancien refait surface. C\'est fragile, précieux, et les PJ peuvent le briser ou le sauver.',
    lines: [
      {
        speaker: 'Vexor',
        text: '...Non. Non, je ne l\'ai pas ramenée. Personne ne peut... la mort est...',
        emotion: 'effondrement',
        gmCoaching: 'La voix se brise. Vexor s\'effondre sur ses genoux. L\'énergie nécromantique vacille et s\'éteint autour de lui. Il ressemble soudain à un homme ordinaire, vieux et fatigué.'
      },
      {
        speaker: 'Vexor',
        text: 'Cent sept morts-vivants sous mes ordres. Cent sept âmes arrachées au repos. Et pas UNE n\'est Elyndra. Pas une seule.',
        emotion: 'horreur de soi',
        gmCoaching: 'Il regarde ses mains avec dégoût. L\'homme qui réalise l\'ampleur de ce qu\'il a fait. Ce moment est terrible et beau.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-doute-redemption',
        label: '"Il n\'est pas trop tard, Vexor. Aidez-nous. Honorez Elyndra en sauvant les vivants."',
        consequence: 'Jet de Persuasion DD 14. Succès : Vexor accepte de changer de camp.',
        skillCheck: { skill: 'Persuasion', dc: 14 },
        nextDialogueId: 'vexor-redemption'
      },
      {
        id: 'vexor-doute-justice',
        label: '"Vous devrez répondre de vos crimes. Mais la rédemption est possible."',
        consequence: 'Vexor acquiesce lentement. "Justice... oui. Je suppose que je la mérite."',
        nextDialogueId: 'vexor-redemption'
      },
      {
        id: 'vexor-doute-tuer',
        label: 'L\'achever pendant qu\'il est vulnérable.',
        consequence: 'Vexor ne se défend pas. Si un PJ le tue ainsi, les autres PJ gagnent un point de Corruption.',
        nextDialogueId: 'vexor-dernieres-paroles'
      }
    ]
  },
  {
    id: 'vexor-redemption',
    npcId: 'archon-vexor',
    npcName: 'Archon Vexor',
    trigger: 'Vexor accepte de se racheter',
    tone: 'fragile, déterminé',
    unlockCondition: 'Persuasion réussie lors du doute',
    gmSceneNote: 'Vexor rédimé est un allié puissant mais fragile. Il doute de chaque geste. Jouez cette fragilité — il pourrait rechuter à tout moment.',
    lines: [
      {
        speaker: 'Vexor',
        text: 'Je ne mérite pas votre confiance. Mais Elyndra... elle croyait que tout le monde mérite une seconde chance. Même les monstres. Alors je vais essayer. Pour elle.',
        emotion: 'résolution fragile',
        gmCoaching: 'Vexor se relève lentement. Ses yeux sont rouges mais sa mâchoire est serrée. Il fait le choix le plus difficile de sa vie.'
      },
      {
        speaker: 'Vexor',
        text: 'Je connais les plans de Malachar. Ses faiblesses. Et mes morts-vivants... je peux les retourner contre lui. Cent sept soldats qui ne craignent rien. Au service de la vie, pour une fois.',
        emotion: 'ironie douce-amère',
        gmCoaching: 'Un demi-sourire triste. L\'ironie d\'utiliser la nécromancie pour sauver le monde n\'est pas perdue pour lui.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-red-bienvenue',
        label: '"Bienvenue parmi nous, Vexor. Ne me faites pas regretter cette confiance."',
        consequence: 'Vexor sera un allié précieux lors de la bataille finale.'
      },
      {
        id: 'vexor-red-surveiller',
        label: '"Je vous donne cette chance. Mais je vous surveillerai."',
        consequence: 'Vexor hoche la tête. "C\'est prudent. Je me surveillerais aussi."'
      },
      {
        id: 'vexor-red-elyndra',
        label: '"Quand tout sera fini, nous trouverons un moyen d\'honorer Elyndra comme elle le mérite."',
        consequence: 'Vexor détourne le regard pour cacher son émotion. "...Merci."'
      }
    ]
  },
  {
    id: 'vexor-combat',
    npcId: 'archon-vexor',
    npcName: 'Archon Vexor',
    trigger: 'Combat contre Vexor',
    tone: 'désespéré, tragique',
    unlockCondition: 'Échec diplomatique ou attaque',
    gmSceneNote: 'Vexor au combat est dangereux mais pas cruel. Il essaie de neutraliser, pas de tuer. Il veut qu\'on l\'arrête, au fond.',
    lines: [
      {
        speaker: 'Vexor',
        text: 'Si c\'est le combat que vous voulez... soit. Mais sachez que chaque mort que vous infligerez à mes serviteurs libérera une âme. Et chaque âme libérée me rapproche d\'Elyndra.',
        emotion: 'résignation combative',
        gmCoaching: 'Vexor combat avec une élégance triste. Ses sorts sont puissants mais mesurés. Il ne cherche pas à tuer — il cherche une fin.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-combat-pitie',
        label: 'Pendant le combat, crier : "ARRÊTEZ ! Ça suffit, Vexor !"',
        consequence: 'Jet de Persuasion DD 15 en plein combat. Succès : Vexor s\'arrête.',
        skillCheck: { skill: 'Persuasion', dc: 15 },
        nextDialogueId: 'vexor-doute'
      },
      {
        id: 'vexor-combat-vaincre',
        label: 'Continuer le combat jusqu\'à la défaite de Vexor.',
        consequence: 'Vexor tombe. Il est à terre, vaincu mais vivant.',
        nextDialogueId: 'vexor-dernieres-paroles'
      }
    ]
  },
  {
    id: 'vexor-pardon-condamnation',
    npcId: 'archon-vexor',
    npcName: 'Archon Vexor',
    trigger: 'Jugement de Vexor après sa défaite',
    tone: 'solennel, moral',
    unlockCondition: 'Vexor vaincu au combat',
    gmSceneNote: 'Moment de jugement moral. Les PJ décident du sort d\'un homme tragique. Pas de bonne réponse — seulement des conséquences.',
    lines: [
      {
        speaker: 'Vexor',
        text: 'Alors ? Le bourreau ou la cage ? Je suppose que c\'est ce que mérite un nécromancien. Mais avant... laissez-moi libérer les âmes. S\'il vous plaît. C\'est tout ce que je demande.',
        emotion: 'acceptation',
        gmCoaching: 'Vexor est à genoux, mains jointes. Il ne supplie pas pour sa vie — seulement pour le droit de réparer une fraction du mal qu\'il a fait.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-pardon-pardonner',
        label: 'Le laisser libérer les âmes et lui offrir une chance de rédemption.',
        consequence: 'Vexor sera un allié dans l\'Acte 5 (dialogue "vexor-redime" activé).',
        reputationChange: [{ faction: 'guilde-arcanes', amount: -10 }, { faction: 'peuple', amount: 15 }]
      },
      {
        id: 'vexor-pardon-prison',
        label: 'L\'autoriser à libérer les âmes, puis l\'emprisonner pour ses crimes.',
        consequence: 'Juste mais froid. Vexor accepte. "Au moins en prison, je ne ferai plus de mal."'
      },
      {
        id: 'vexor-pardon-executer',
        label: 'L\'exécuter pour ses crimes contre les vivants et les morts.',
        consequence: 'Vexor ferme les yeux. "Dites à Elyndra que j\'arrive." Les âmes restent prisonnières.',
        nextDialogueId: 'vexor-dernieres-paroles'
      }
    ]
  },
  {
    id: 'vexor-dernieres-paroles',
    npcId: 'archon-vexor',
    npcName: 'Archon Vexor',
    trigger: 'Mort de Vexor',
    tone: 'paisible, tragique',
    unlockCondition: 'Vexor meurt (combat ou exécution)',
    gmSceneNote: 'Les dernières paroles de Vexor doivent hanter les joueurs. Pas de rage — de la paix. Il est enfin libre.',
    lines: [
      {
        speaker: 'Vexor',
        text: '...Des fleurs d\'aurore. Petites. Bleues. C\'est ce que je sens. Est-ce que... Elyndra ? Est-ce que tu...',
        emotion: 'paix finale',
        gmCoaching: 'Murmure à peine audible. Un sourire se forme sur ses lèvres. Sa main se tend vers quelque chose que les PJ ne voient pas. Puis silence.'
      }
    ],
    playerResponses: [
      {
        id: 'vexor-mort-recueillir',
        label: 'Se recueillir en silence devant sa dépouille.',
        consequence: 'Un sentiment étrange — pas de triomphe, pas de soulagement. Juste de la tristesse.'
      },
      {
        id: 'vexor-mort-enterrer',
        label: 'L\'enterrer dignement avec des fleurs bleues, si possible.',
        consequence: 'Si les PJ trouvent des fleurs d\'aurore et l\'enterrent : une lumière dorée s\'élève du corps. Les âmes sont libérées.',
        reputationChange: [{ faction: 'peuple', amount: 10 }]
      }
    ]
  },
];

// ============================================================================
// 4. DAME NYX — Cheffe du Syndicat de l'Ombre (8 dialogues)
// ============================================================================

const NYX_DIALOGUES: DialogueTree[] = [
  {
    id: 'nyx-proposition',
    npcId: 'dame-nyx',
    npcName: 'Dame Nyx',
    trigger: 'Rencontre dans un lieu clandestin',
    tone: 'séducteur, dangereux, intelligent',
    gmSceneNote: 'Nyx émerge de l\'ombre comme si l\'ombre faisait partie d\'elle. Elle sourit toujours. Elle contrôle toujours la conversation. Les PJ doivent sentir qu\'elle a cinq coups d\'avance.',
    lines: [
      {
        speaker: 'Dame Nyx',
        text: 'Asseyez-vous. Non, pas là — à la lumière. J\'aime voir les yeux de ceux à qui je parle. Les yeux mentent mal.',
        emotion: 'contrôle absolu',
        gmCoaching: 'Nyx est assise dans l\'ombre, jambes croisées, un verre de vin à la main. Elle ne se lève pas. La position de pouvoir est claire.'
      },
      {
        speaker: 'Dame Nyx',
        text: 'On dit que vous cherchez à sauver le monde. C\'est... adorable. Moi aussi. La différence, c\'est que vous le faites par idéalisme, et moi par investissement. Un monde mort est mauvais pour les affaires.',
        emotion: 'cynisme charmant',
        gmCoaching: 'Sourire en coin. Nyx est sincère dans son cynisme — c\'est ce qui la rend dangereuse et fiable à la fois.'
      }
    ],
    playerResponses: [
      {
        id: 'nyx-prop-ecouter',
        label: '"Je vous écoute. Qu\'avez-vous à proposer ?"',
        consequence: 'Nyx sourit : "Enfin quelqu\'un de pragmatique."',
        nextDialogueId: 'nyx-marchandage'
      },
      {
        id: 'nyx-prop-mefiance',
        label: '"Le Syndicat de l\'Ombre n\'est pas connu pour sa générosité."',
        consequence: 'Nyx : "Non. Mais nous sommes connus pour notre efficacité. Ce qui vaut mieux."',
        nextDialogueId: 'nyx-test'
      },
      {
        id: 'nyx-prop-refuser',
        label: '"Je ne traite pas avec des criminels."',
        consequence: 'Nyx soupire. "Comme vous voulez. Mais le monde n\'a pas le luxe de votre moralité."'
      },
      {
        id: 'nyx-prop-flatter',
        label: '"Votre réputation vous précède, Dame Nyx. C\'est un honneur."',
        consequence: 'Nyx rit. "La flatterie ne marche pas sur moi. Mais j\'apprécie l\'effort."'
      }
    ]
  },
  {
    id: 'nyx-marchandage',
    npcId: 'dame-nyx',
    npcName: 'Dame Nyx',
    trigger: 'Négociation avec le Syndicat',
    tone: 'commercial, tendu',
    unlockCondition: 'Avoir accepté d\'écouter sa proposition',
    gmSceneNote: 'Nyx propose un échange de services. Elle a des informations cruciales, des assassins, des espions. Mais son prix est toujours inattendu.',
    lines: [
      {
        speaker: 'Dame Nyx',
        text: 'Mes espions ont cartographié les défenses de Malachar. Ses lieutenants, ses points faibles, ses horaires de patrouille. Information qui vaut plus que tout l\'or d\'Aethelgard.',
        emotion: 'assurance commerciale',
        gmCoaching: 'Elle pose un rouleau scellé sur la table, juste hors de portée des PJ. Symbolique.'
      },
      {
        speaker: 'Dame Nyx',
        text: 'Mon prix ? Pas de l\'or. Quand tout sera fini, le Syndicat veut un siège au Conseil de Reconstruction. Officiel. Légitime. Fini l\'ombre — nous voulons la lumière.',
        emotion: 'ambition calculée',
        gmCoaching: 'C\'est inattendu. Nyx ne veut pas de l\'argent — elle veut la respectabilité. C\'est son rêve secret.'
      }
    ],
    playerResponses: [
      {
        id: 'nyx-march-accepter',
        label: 'Accepter le marché — un siège au Conseil contre les informations.',
        consequence: 'Alliance avec le Syndicat. Informations cruciales obtenues. Conséquences politiques futures.',
        reputationChange: [{ faction: 'syndicat-ombre', amount: 20 }, { faction: 'couronne', amount: -10 }]
      },
      {
        id: 'nyx-march-negocier',
        label: '"Un siège d\'observateur, pas de vote. Et le Syndicat se légalise."',
        consequence: 'Jet de Persuasion DD 16. Succès : Nyx accepte un compromis. "Vous êtes meilleur négociateur que je pensais."',
        skillCheck: { skill: 'Persuasion', dc: 16 }
      },
      {
        id: 'nyx-march-refuser',
        label: 'Refuser de légitimer une organisation criminelle.',
        consequence: 'Nyx range le rouleau. "Dommage. Bonne chance sans mes informations."'
      }
    ]
  },
  {
    id: 'nyx-test',
    npcId: 'dame-nyx',
    npcName: 'Dame Nyx',
    trigger: 'Nyx teste la loyauté des PJ',
    tone: 'manipulateur, dangereux',
    unlockCondition: 'Méfiance initiale des PJ',
    gmSceneNote: 'Nyx ne fait jamais confiance gratuitement. Son test est retors — elle présente un choix moral pour voir ce que les PJ font quand personne ne regarde.',
    lines: [
      {
        speaker: 'Dame Nyx',
        text: 'La confiance se mérite, n\'est-ce pas ? Alors méritons-la mutuellement. J\'ai un petit travail. Un noble de la cour finance secrètement Malachar. Voici les preuves. Apportez-les à la reine... ou à moi.',
        emotion: 'test calculé',
        gmCoaching: 'Elle tend un dossier. Le test : si les PJ donnent les preuves à la reine, c\'est honorable mais Nyx perd un atout. Si elle les donne à Nyx, elle gagne du pouvoir. Le choix révèle le caractère.'
      }
    ],
    playerResponses: [
      {
        id: 'nyx-test-reine',
        label: 'Apporter les preuves à la reine directement.',
        consequence: 'Nyx : "Honorable. Prévisible. Mais honorable. Ça me suffit."',
        reputationChange: [{ faction: 'couronne', amount: 10 }],
        nextDialogueId: 'nyx-secret'
      },
      {
        id: 'nyx-test-nyx',
        label: 'Donner les preuves à Nyx pour qu\'elle s\'en serve.',
        consequence: 'Nyx sourit. "Pragmatique. Nous allons bien nous entendre."',
        reputationChange: [{ faction: 'syndicat-ombre', amount: 15 }],
        nextDialogueId: 'nyx-secret'
      },
      {
        id: 'nyx-test-copie',
        label: 'Copier les preuves et les donner aux deux.',
        consequence: 'Nyx éclate de rire. "Oh, VOUS je vous aime. Malin. Très malin."',
        reputationChange: [{ faction: 'syndicat-ombre', amount: 10 }, { faction: 'couronne', amount: 5 }],
        nextDialogueId: 'nyx-secret'
      }
    ]
  },
  {
    id: 'nyx-secret',
    npcId: 'dame-nyx',
    npcName: 'Dame Nyx',
    trigger: 'Nyx partage un secret sur les Sceaux',
    tone: 'grave, conspirateur',
    unlockCondition: 'Test de confiance passé',
    gmSceneNote: 'L\'information de Nyx est explosive. Jouez-la comme si elle révélait un secret d\'État — parce que c\'en est un.',
    lines: [
      {
        speaker: 'Dame Nyx',
        text: 'Maintenant que nous nous faisons... relativement confiance. Il y a quelque chose que même la reine ignore. Le Cinquième Sceau n\'a pas été brisé accidentellement. Il a été brisé de l\'INTÉRIEUR.',
        emotion: 'gravité inhabituelle',
        gmCoaching: 'Nyx perd son sourire pour la première fois. Ce qu\'elle dit la trouble sincèrement — et il en faut beaucoup pour troubler Dame Nyx.'
      },
      {
        speaker: 'Dame Nyx',
        text: 'Quelqu\'un au sein même du Conseil Royal travaille pour Malachar. Ou pire — pour l\'Entité directement. Je ne sais pas qui. Pas encore. Mais je le trouverai.',
        emotion: 'détermination',
        gmCoaching: 'Le mystère du traître — fil rouge majeur. Nyx est la seule à avoir cette information.'
      }
    ],
    playerResponses: [
      {
        id: 'nyx-secret-qui',
        label: '"Des suspects ? N\'importe quel indice ?"',
        consequence: 'Nyx : "Trois suspects. Vaelith. Le Chancelier Dorne. Et... le Commandant Rask."'
      },
      {
        id: 'nyx-secret-prouver',
        label: '"Comment vous savez ça ?"',
        consequence: 'Nyx : "Mon réseau d\'espions. Il y a des choses que même les murs ne savent pas cacher."'
      },
      {
        id: 'nyx-secret-ensemble',
        label: '"Trouvons le traître ensemble."',
        consequence: 'Nyx sourit. "Ensemble. Quel mot dangereux. J\'accepte."',
        nextDialogueId: 'nyx-loyaute'
      }
    ]
  },
  {
    id: 'nyx-humour',
    npcId: 'dame-nyx',
    npcName: 'Dame Nyx',
    trigger: 'Moment de détente ou de stress',
    tone: 'humour noir, camaraderie',
    unlockCondition: 'Alliance avec Nyx établie',
    gmSceneNote: 'Nyx utilise l\'humour comme armure. Mais derrière les blagues, il y a une femme qui a survécu à l\'enfer et qui s\'en amuse pour ne pas pleurer.',
    lines: [
      {
        speaker: 'Dame Nyx',
        text: 'Savez-vous ce qu\'un assassin dit à un nécromancien ? "Au moins MES victimes restent mortes." ...Non ? Dur public.',
        emotion: 'humour noir',
        gmCoaching: 'Timing comique parfait. Nyx plaisante quand la tension est insupportable — c\'est sa manière de gérer le stress. Et ça marche.'
      },
      {
        speaker: 'Dame Nyx',
        text: 'Je dois dire que pour des héros censés sauver le monde, vous avez un talent remarquable pour vous fourrer dans les pires situations possibles. C\'est presque un art.',
        emotion: 'affection déguisée en sarcasme',
        gmCoaching: 'Elle se moque, mais c\'est sa façon de dire qu\'elle s\'inquiète. Si les PJ le remarquent, elle niera farouchement.'
      }
    ],
    playerResponses: [
      {
        id: 'nyx-humour-rire',
        label: 'Rire de bon coeur.',
        consequence: 'Nyx semble sincèrement contente. Les moments légers sont rares dans son monde.'
      },
      {
        id: 'nyx-humour-replique',
        label: 'Répliquer avec son propre trait d\'humour noir.',
        consequence: 'Nyx : "Oh, on a un comédien ! Enfin quelqu\'un à ma hauteur."'
      },
      {
        id: 'nyx-humour-serieux',
        label: '"Sous les blagues, vous vous inquiétez. N\'est-ce pas, Nyx ?"',
        consequence: 'Son sourire vacille une microseconde. "...Ne soyez pas ridicule." (Elle s\'inquiète.)'
      }
    ]
  },
  {
    id: 'nyx-loyaute',
    npcId: 'dame-nyx',
    npcName: 'Dame Nyx',
    trigger: 'Nyx montre sa loyauté de façon surprenante',
    tone: 'surprenant, émouvant',
    unlockCondition: 'Alliance solide et PJ en danger',
    gmSceneNote: 'LE moment où Nyx cesse d\'être une alliée de circonstance et devient une vraie amie. Elle sauve les PJ au péril de sa propre vie — et elle est aussi surprise que tout le monde.',
    lines: [
      {
        speaker: 'Dame Nyx',
        text: 'Ne me regardez pas comme ça. Ce n\'était pas de la loyauté. C\'était... un investissement. Vous mourir maintenant serait très mauvais pour mes plans.',
        emotion: 'déni d\'émotion',
        gmCoaching: 'Elle vient littéralement de se jeter entre les PJ et un danger mortel. Elle est blessée, essoufflée, et nie catégoriquement avoir agi par amitié. Personne n\'est dupe.'
      },
      {
        speaker: 'Dame Nyx',
        text: '...D\'accord. Peut-être que je me suis... attachée. Un peu. C\'est terriblement contre-productif, je dois dire. Les sentiments sont la pire vulnérabilité du monde.',
        emotion: 'aveu difficile',
        gmCoaching: 'Premier moment de vraie vulnérabilité de Nyx. Sa voix tremble légèrement. Elle déteste ça.'
      }
    ],
    playerResponses: [
      {
        id: 'nyx-loyal-merci',
        label: '"Merci, Nyx. Vous êtes une meilleure personne que vous le croyez."',
        consequence: 'Nyx détourne le regard. "Dites ça à qui que ce soit et je vous fais assassiner. ...C\'est une blague. Probablement."',
        reputationChange: [{ faction: 'syndicat-ombre', amount: 15 }]
      },
      {
        id: 'nyx-loyal-taquiner',
        label: '"Dame Nyx, la terreur du Syndicat de l\'Ombre, qui a un coeur ! Qui l\'eût cru ?"',
        consequence: 'Nyx : "Un mot de plus et je vous poignarde. Amicalement."'
      },
      {
        id: 'nyx-loyal-pareil',
        label: '"Moi aussi je me suis attaché. On est une équipe, maintenant."',
        consequence: 'Nyx est silencieuse un moment. Puis : "...Une équipe. Oui. Je suppose que oui."'
      }
    ]
  },
  {
    id: 'nyx-sacrifice',
    npcId: 'dame-nyx',
    npcName: 'Dame Nyx',
    trigger: 'Nyx offre de se sacrifier',
    tone: 'héroïque, inattendu',
    unlockCondition: 'Loyauté prouvée et situation désespérée',
    gmSceneNote: 'Le sacrifice potentiel de Nyx est d\'autant plus puissant qu\'il est inattendu. La cynique, la pragmatique, la survivante — qui choisit de risquer sa vie pour les autres.',
    lines: [
      {
        speaker: 'Dame Nyx',
        text: 'Écoutez. Le passage est piégé. Quelqu\'un doit rester pour le désarmer manuellement pendant que les autres passent. Et devinez qui est la meilleure avec les pièges dans cette équipe ?',
        emotion: 'faux détachement',
        gmCoaching: 'Elle fait comme si c\'était une décision logique, pas émotionnelle. Mais ses mains tremblent légèrement. Elle sait qu\'elle pourrait ne pas s\'en sortir.'
      },
      {
        speaker: 'Dame Nyx',
        text: 'Et si je ne m\'en sors pas... le Syndicat est à vous. Enfin, à qui vous voudrez. Juste... pas à un idiot. J\'ai mis vingt ans à le construire.',
        emotion: 'testament déguisé',
        gmCoaching: 'Un demi-sourire. L\'humour noir jusqu\'au bout. Mais ses yeux disent adieu.'
      }
    ],
    playerResponses: [
      {
        id: 'nyx-sacr-accepter',
        label: 'Accepter son sacrifice — elle a raison, c\'est la meilleure option.',
        consequence: 'Nyx hoche la tête et part. 50% de chance de survie (jet du MJ).'
      },
      {
        id: 'nyx-sacr-refuser',
        label: '"Pas question. On trouve un autre moyen ou on y va tous ensemble."',
        consequence: 'Nyx : "Sentimentaux. Tous les mêmes." Mais elle est secrètement soulagée.'
      },
      {
        id: 'nyx-sacr-accompagner',
        label: '"Je reste avec vous. Deux cerveaux valent mieux qu\'un."',
        consequence: 'Nyx : "...Vous êtes un idiot. Un idiot courageux. Venez."'
      }
    ]
  },
  {
    id: 'nyx-adieu',
    npcId: 'dame-nyx',
    npcName: 'Dame Nyx',
    trigger: 'Dernière rencontre avec Nyx avant la bataille finale',
    tone: 'intime, rare sincérité',
    unlockCondition: 'Fin de l\'Acte 4, Nyx vivante',
    gmSceneNote: 'Nyx sans masque. C\'est peut-être la première et dernière fois qu\'elle est entièrement honnête.',
    lines: [
      {
        speaker: 'Dame Nyx',
        text: 'Quand j\'avais douze ans, j\'ai volé une miche de pain. Un garde m\'a brisé trois doigts. Ce jour-là, j\'ai juré que plus jamais personne ne me ferait du mal. Et j\'ai tenu parole... jusqu\'à vous.',
        emotion: 'vulnérabilité absolue',
        gmCoaching: 'Pas de sourire. Pas de sarcasme. Juste Nyx. La vraie Nyx. Celle qui a été une enfant affamée avant d\'être une reine de l\'ombre.'
      },
      {
        speaker: 'Dame Nyx',
        text: 'Vous m\'avez fait quelque chose de terrible. Vous m\'avez fait croire que les gens pouvaient être bons. Impardonnable.',
        emotion: 'tendresse masquée d\'ironie',
        gmCoaching: 'Un sourire, enfin. Mais un vrai, pas un sourire de calcul. C\'est son adieu — au cas où.'
      }
    ],
    playerResponses: [
      {
        id: 'nyx-adieu-promesse',
        label: '"On survivra. Tous les deux. Et après, on changera le monde — à ta manière."',
        consequence: 'Nyx : "À MA manière ? C\'est la plus belle promesse qu\'on m\'ait jamais faite."'
      },
      {
        id: 'nyx-adieu-toast',
        label: 'Lever un verre en silence avec elle.',
        consequence: 'Pas besoin de mots. Le silence dit tout. Nyx hoche la tête et boit.'
      }
    ]
  },
];

// ============================================================================
// 5. ARCHIMAGE VAELITH — Chef de la Guilde des Arcanes (6 dialogues)
// ============================================================================

const VAELITH_DIALOGUES: DialogueTree[] = [
  {
    id: 'vaelith-rituel',
    npcId: 'archimage-vaelith',
    npcName: 'Archimage Vaelith',
    trigger: 'Vaelith explique le Grand Rituel',
    tone: 'académique, urgent',
    gmSceneNote: 'Vaelith parle vite, gesticule, dessine des diagrammes dans l\'air avec de la lumière. C\'est un génie sous pression — brillant et fragile.',
    lines: [
      {
        speaker: 'Vaelith',
        text: 'Le Grand Rituel est notre seul espoir de restaurer les Sceaux. Théoriquement. En pratique, c\'est un cauchemar logistique. Il faut synchroniser sept cercles de pouvoir, canaliser l\'énergie de trois Nexus, et maintenir le tout pendant exactement treize minutes sans interruption.',
        emotion: 'excitation nerveuse',
        gmCoaching: 'Vaelith trace des schémas lumineux dans l\'air. Il parle comme un professeur surexcité — trop vite, en supposant que tout le monde comprend.'
      },
      {
        speaker: 'Vaelith',
        text: 'Si nous échouons — et les chances d\'échec sont... considérables — l\'énergie libérée pourrait transformer un rayon de cinquante kilomètres en désert de verre. Mais à part ça, tout va bien.',
        emotion: 'humour nerveux',
        gmCoaching: 'Un rire nerveux. Vaelith gère le stress par l\'humour sec et la suractivité intellectuelle.'
      }
    ],
    playerResponses: [
      {
        id: 'vaelith-rituel-composants',
        label: '"De quoi avez-vous besoin exactement pour le Rituel ?"',
        consequence: 'Liste des composants nécessaires — dont le Fragment d\'Éternité.',
        nextDialogueId: 'vaelith-composants'
      },
      {
        id: 'vaelith-rituel-chances',
        label: '"Quelles sont nos chances réalistes ?"',
        consequence: 'Vaelith hésite. "Trente pour cent. Quarante si le dragon nous aide. Cinquante si nous avons le Fragment."'
      },
      {
        id: 'vaelith-rituel-alternative',
        label: '"Y a-t-il une alternative au Rituel ?"',
        consequence: 'Vaelith pâlit. "Il y en a une. Mais elle implique un sacrifice que je refuse de mentionner."'
      }
    ]
  },
  {
    id: 'vaelith-composants',
    npcId: 'archimage-vaelith',
    npcName: 'Archimage Vaelith',
    trigger: 'Discussion des composants du Rituel',
    tone: 'technique, pressé',
    unlockCondition: 'Explication du Rituel faite',
    gmSceneNote: 'Liste de courses cosmique. Chaque composant est une quête en soi.',
    lines: [
      {
        speaker: 'Vaelith',
        text: 'Il me faut : le Fragment d\'Éternité du Nexus Nord, de la poussière de lune récoltée au solstice, le sang d\'un Gardien consenti — oui, il faudra convaincre Vyraxithon — et... un coeur pur. Littéralement. Un cristal de coeur forgé dans la compassion.',
        emotion: 'énumération clinique',
        gmCoaching: 'Vaelith compte sur ses doigts. Chaque composant est plus impossible que le précédent. Son ton clinique cache son angoisse.'
      }
    ],
    playerResponses: [
      {
        id: 'vaelith-comp-impossible',
        label: '"C\'est impossible. Vous le savez, n\'est-ce pas ?"',
        consequence: 'Vaelith : "Impossible est un mot pour ceux qui manquent d\'imagination. Ou de désespoir."'
      },
      {
        id: 'vaelith-comp-plan',
        label: '"Commençons par le plus urgent. Que cherchons-nous en premier ?"',
        consequence: 'Vaelith : "Le Fragment. Sans lui, rien d\'autre n\'a d\'importance."'
      },
      {
        id: 'vaelith-comp-coeurpur',
        label: '"Un cristal de coeur forgé dans la compassion ? Comment crée-t-on ça ?"',
        consequence: 'Vaelith : "C\'est la partie la plus terrifiante. Il se forme spontanément... quand quelqu\'un fait un sacrifice purement altruiste."'
      }
    ]
  },
  {
    id: 'vaelith-inquietude',
    npcId: 'archimage-vaelith',
    npcName: 'Archimage Vaelith',
    trigger: 'Moment de doute de Vaelith',
    tone: 'vulnérable, épuisé',
    unlockCondition: 'Progression dans la collecte des composants',
    gmSceneNote: 'Vaelith sans ses livres ni ses sorts. Un homme fatigué qui porte le poids du monde sur ses épaules académiques.',
    lines: [
      {
        speaker: 'Vaelith',
        text: 'Je n\'ai pas dormi depuis quatre jours. Les calculs ne cessent de changer — comme si la magie elle-même résistait. Comme si les Sceaux ne VOULAIENT pas être restaurés.',
        emotion: 'épuisement',
        gmCoaching: 'Vaelith est pâle, cerné, les mains tremblantes. Il tient une tasse de thé froid qu\'il a oublié de boire. C\'est un homme au bord du gouffre.'
      },
      {
        speaker: 'Vaelith',
        text: 'Et si j\'ai tort ? Si le Rituel ne fonctionne pas ? Si je condamne tout le monde en essayant de les sauver ? Je suis un érudit, pas un héros. Les héros, c\'est vous.',
        emotion: 'doute profond',
        gmCoaching: 'L\'homme le plus intelligent de la pièce avoue qu\'il a peur. C\'est déstabilisant et humain.'
      }
    ],
    playerResponses: [
      {
        id: 'vaelith-inq-encourager',
        label: '"Vous êtes le seul qui puisse le faire, Vaelith. Nous croyons en vous."',
        consequence: 'Vaelith prend une grande inspiration. "...Merci. J\'avais besoin d\'entendre ça."'
      },
      {
        id: 'vaelith-inq-dormir',
        label: '"Allez dormir. Maintenant. Quatre heures minimum. On gère le reste."',
        consequence: 'Vaelith proteste mais cède. Après le repos, ses calculs s\'améliorent de 10%.'
      },
      {
        id: 'vaelith-inq-pragmatique',
        label: '"On fait avec ce qu\'on a. Un plan imparfait vaut mieux que pas de plan."',
        consequence: 'Vaelith : "Vous avez raison. L\'imperfection est le luxe des vivants."'
      }
    ]
  },
  {
    id: 'vaelith-course',
    npcId: 'archimage-vaelith',
    npcName: 'Archimage Vaelith',
    trigger: 'Urgence — le temps manque',
    tone: 'panique contrôlée',
    unlockCondition: 'Approche de la bataille finale',
    gmSceneNote: 'Le compte à rebours est lancé. Vaelith sent la magie se déstabiliser et sait qu\'ils ont des heures, pas des jours.',
    lines: [
      {
        speaker: 'Vaelith',
        text: 'NON NON NON ! Les Sceaux se fissurent plus vite que prévu ! Nous avions trois jours, maintenant nous avons... dix heures. Peut-être moins. L\'Entité force le passage !',
        emotion: 'panique maîtrisée',
        gmCoaching: 'Vaelith entre en courant, cheveux en désordre, robe couverte de craie. Le génie en mode crise totale.'
      }
    ],
    playerResponses: [
      {
        id: 'vaelith-course-faisable',
        label: '"Dix heures. C\'est assez. De quoi avez-vous besoin immédiatement ?"',
        consequence: 'Vaelith : "De TOUT. Maintenant. Et priez qu\'il ne se mette pas à pleuvoir."'
      },
      {
        id: 'vaelith-course-plan-b',
        label: '"Et si on accélérait le Rituel en le simplifiant ?"',
        consequence: 'Vaelith : "Simplifier ? C\'est comme simplifier la gravité. Mais... peut-être. Jet d\'Arcanes DD 18."',
        skillCheck: { skill: 'Arcanes', dc: 18 }
      }
    ]
  },
  {
    id: 'vaelith-trahison',
    npcId: 'archimage-vaelith',
    npcName: 'Archimage Vaelith',
    trigger: 'Révélation — Vaelith est corrompu (branche alternative)',
    tone: 'choc, trahison',
    unlockCondition: 'Branche narrative : Vaelith est le traître du Conseil',
    gmSceneNote: 'TWIST MAJEUR. Si le MJ choisit cette branche, Vaelith a été corrompu par l\'Entité. Jouez-le comme un homme qui lutte contre la possession — des éclairs de l\'ancien Vaelith percent.',
    lines: [
      {
        speaker: 'Vaelith',
        text: 'Je suis... tellement désolé. Elle est dans ma tête depuis des mois. L\'Entité. Elle murmure. Elle promet. Et parfois... parfois je ne sais plus quels sont MES pensées et quelles sont les siennes.',
        emotion: 'horreur de soi',
        gmCoaching: 'Vaelith pleure. Ses yeux alternent entre sa couleur normale et un éclat doré sinistre. Il lutte contre la possession.'
      },
      {
        speaker: 'Vaelith',
        text: 'Le Rituel que je vous ai donné... il est faux. FAUX ! Il n\'aurait pas restauré les Sceaux — il aurait LIBÉRÉ l\'Entité ! Mais je peux vous donner le VRAI — vite — avant qu\'Elle reprenne le contrôle — VITE !',
        emotion: 'urgence désespérée',
        gmCoaching: 'Vaelith se bat contre lui-même. Ses mains écrivent des formules pendant que sa bouche essaie de les effacer. Terrifiant et pathétique.'
      }
    ],
    playerResponses: [
      {
        id: 'vaelith-trah-aider',
        label: 'Aider Vaelith à résister à la possession.',
        consequence: 'Jet collectif de Volonté DD 16. Succès : Vaelith est libéré temporairement.',
        skillCheck: { skill: 'Volonté', dc: 16 }
      },
      {
        id: 'vaelith-trah-tuer',
        label: 'Vaelith est trop dangereux — l\'abattre avant que l\'Entité ne reprenne le contrôle.',
        consequence: 'Vaelith : "Faites-le. Vite. Avant que je ne sois plus moi."'
      },
      {
        id: 'vaelith-trah-formules',
        label: 'Se concentrer sur les formules qu\'il écrit — copier le vrai Rituel tant qu\'il est encore lui.',
        consequence: 'Course contre la montre. Jet d\'Arcanes DD 14 pour copier les formules à temps.'
      }
    ]
  },
  {
    id: 'vaelith-aide',
    npcId: 'archimage-vaelith',
    npcName: 'Archimage Vaelith',
    trigger: 'Vaelith apporte une aide cruciale au Rituel final',
    tone: 'héroïque, déterminé',
    unlockCondition: 'Vaelith loyal et composants réunis',
    gmSceneNote: 'Vaelith dans toute sa gloire. Le génie au sommet de son art, canalisant assez de pouvoir pour remodeler la réalité.',
    lines: [
      {
        speaker: 'Vaelith',
        text: 'Les cercles sont alignés. Les composants sont en place. C\'est le moment. Je vais avoir besoin que vous protégiez le périmètre pendant exactement treize minutes. Pas douze. Pas quatorze. TREIZE.',
        emotion: 'concentration absolue',
        gmCoaching: 'Vaelith est transformé — plus de tremblement, plus de doute. C\'est le mage le plus puissant d\'Aethelgard au travail. Impressionnant.'
      },
      {
        speaker: 'Vaelith',
        text: 'Et... si ça ne marche pas... dites aux apprentis de la Guilde que leur vieux professeur les aimait. Même les cancres. Surtout les cancres, en fait.',
        emotion: 'tendresse cachée',
        gmCoaching: 'Un demi-sourire. Il sait que le Rituel pourrait le tuer. Mais il y va quand même.'
      }
    ],
    playerResponses: [
      {
        id: 'vaelith-aide-proteger',
        label: '"Treize minutes. Pas une seconde de plus, pas une seconde de moins. On vous couvre."',
        consequence: 'Le Rituel commence. Combat de défense pendant 13 rounds.'
      },
      {
        id: 'vaelith-aide-encourager',
        label: '"Vous êtes le plus grand mage que ce monde ait connu. Montrez-leur."',
        consequence: 'Vaelith sourit. "Flatteur. Mais efficace." +5% aux chances du Rituel.'
      }
    ]
  },
];

// ============================================================================
// 6. NASSIRA LA BIBLIOTHÉCAIRE FANTÔME — Spectre bienveillant d'Ashka (6 dialogues)
// ============================================================================

const NASSIRA_DIALOGUES: DialogueTree[] = [
  {
    id: 'nassira-accueil',
    npcId: 'nassira',
    npcName: 'Nassira la Bibliothécaire Fantôme',
    trigger: 'Entrée dans les ruines d\'Ashka',
    tone: 'éthéré, mélancolique, bienveillant',
    gmSceneNote: 'Nassira apparaît comme une lumière bleue douce. Elle parle avec la voix d\'une bibliothécaire — calme, précise, accueillante — mais avec une tristesse infiniment profonde.',
    lines: [
      {
        speaker: 'Nassira',
        text: 'Oh... des visiteurs. Cela fait si longtemps. Deux cent quarante-trois ans, quatre mois et douze jours, pour être précise. Bienvenue dans la Grande Bibliothèque d\'Ashka. Enfin... ce qu\'il en reste.',
        emotion: 'joie triste',
        gmCoaching: 'Voix douce et cristalline, légèrement décalée comme un écho. Nassira flotte à quelques centimètres du sol. Les livres autour d\'elle vibrent de sa présence.'
      },
      {
        speaker: 'Nassira',
        text: 'Je suis Nassira. J\'étais la gardienne de ce savoir. Je le suis encore, je suppose. Les morts ont un avantage sur les vivants en matière de permanence.',
        emotion: 'humour doux',
        gmCoaching: 'Un sourire fantomatique. Nassira a accepté sa mort depuis longtemps. Elle n\'est pas en souffrance — elle est en service.'
      }
    ],
    playerResponses: [
      {
        id: 'nassira-acc-respect',
        label: 'S\'incliner respectueusement devant le spectre.',
        consequence: 'Nassira rayonne littéralement — sa lumière s\'intensifie de plaisir.',
        nextDialogueId: 'nassira-histoire'
      },
      {
        id: 'nassira-acc-aide',
        label: '"Nassira, nous avons besoin de votre savoir. Les Sceaux se brisent."',
        consequence: 'Nassira pâlit (ce qui est un exploit pour un fantôme). "Déjà ? Non... c\'est trop tôt..."',
        nextDialogueId: 'nassira-cle'
      },
      {
        id: 'nassira-acc-explorer',
        label: '"Pouvez-vous nous guider dans ces ruines ?"',
        consequence: 'Nassira : "Avec plaisir. Attention aux sections effondrées — et aux gardes spectraux qui ne sont pas aussi aimables que moi."',
        nextDialogueId: 'nassira-guide'
      }
    ]
  },
  {
    id: 'nassira-histoire',
    npcId: 'nassira',
    npcName: 'Nassira la Bibliothécaire Fantôme',
    trigger: 'Nassira raconte l\'histoire d\'Ashka',
    tone: 'nostalgique, tragique',
    unlockCondition: 'Conversation engagée',
    gmSceneNote: 'Les murs de la bibliothèque s\'illuminent d\'images fantomatiques — Nassira projette ses souvenirs. Les PJ voient Ashka dans sa gloire.',
    lines: [
      {
        speaker: 'Nassira',
        text: 'Ashka était... magnifique. La cité des Mille Savoirs. Chaque bâtiment était un livre, chaque rue une phrase. Nous pensions que le savoir nous protégerait de tout. Nous avions tort.',
        emotion: 'nostalgie douloureuse',
        gmCoaching: 'Les murs montrent une cité éclatante qui se transforme lentement en ruines. Nassira regarde ses propres souvenirs avec une tendresse déchirante.'
      },
      {
        speaker: 'Nassira',
        text: 'Quand le Premier Sceau s\'est brisé il y a des siècles, l\'onde de choc a traversé Ashka comme un cri. La terre s\'est ouverte. Le feu est tombé du ciel. Trois cent mille âmes... en une nuit.',
        emotion: 'deuil',
        gmCoaching: 'Les images montrent la destruction. Nassira ferme les yeux — même un fantôme peut avoir mal en se souvenant.'
      }
    ],
    playerResponses: [
      {
        id: 'nassira-hist-comment',
        label: '"Comment avez-vous survécu — enfin, comment êtes-vous devenue un spectre ?"',
        consequence: 'Nassira : "Je suis morte en protégeant les livres. Mon amour pour le savoir m\'a liée à cet endroit. Un cadeau... ou une malédiction."'
      },
      {
        id: 'nassira-hist-lecon',
        label: '"Quelle leçon Ashka a-t-elle à nous enseigner ?"',
        consequence: 'Nassira : "Que le savoir sans sagesse est une arme. Et que l\'arrogance est l\'ennemi le plus mortel."',
        nextDialogueId: 'nassira-cle'
      }
    ]
  },
  {
    id: 'nassira-guide',
    npcId: 'nassira',
    npcName: 'Nassira la Bibliothécaire Fantôme',
    trigger: 'Nassira guide les PJ dans les ruines',
    tone: 'pratique, maternel',
    unlockCondition: 'Acceptation de l\'aide de Nassira',
    gmSceneNote: 'Nassira connaît chaque pierre de ces ruines. Elle flotte devant les PJ, écartant les dangers spectraux d\'un geste. C\'est la meilleure guide possible.',
    lines: [
      {
        speaker: 'Nassira',
        text: 'Par ici. Attention au troisième carreau — il s\'effondre. Et ne touchez PAS l\'arche runique, sauf si vous aimez être transformés en grenouille. C\'est temporaire, mais humiliant.',
        emotion: 'professionnalisme de bibliothécaire',
        gmCoaching: 'Nassira guide comme elle devait guider les étudiants autrefois — efficace, protectrice, légèrement amusée par leur ignorance.'
      },
      {
        speaker: 'Nassira',
        text: 'Cette section était les Archives Interdites. Les textes sur les Premiers, les Sceaux, l\'Entité — tout est ici. Ou ce qu\'il en reste après l\'effondrement.',
        emotion: 'tristesse professionnelle',
        gmCoaching: 'Des livres flottent dans l\'air, suspendus par la magie résiduelle. Certains sont en morceaux. Pour Nassira, c\'est comme voir des amis blessés.'
      }
    ],
    playerResponses: [
      {
        id: 'nassira-guide-archiv',
        label: 'Fouiller les Archives Interdites pour des informations sur les Sceaux.',
        consequence: 'Jet de Recherche DD 14. Succès : texte crucial sur la restauration des Sceaux.',
        skillCheck: { skill: 'Investigation', dc: 14 }
      },
      {
        id: 'nassira-guide-danger',
        label: '"Y a-t-il des dangers spécifiques plus loin ?"',
        consequence: 'Nassira : "Le Gardien de la Salle des Origines. Il ne fait pas la différence entre amis et ennemis."'
      }
    ]
  },
  {
    id: 'nassira-tristesse',
    npcId: 'nassira',
    npcName: 'Nassira la Bibliothécaire Fantôme',
    trigger: 'Moment d\'intimité avec Nassira',
    tone: 'mélancolique, existentiel',
    unlockCondition: 'Exploration avancée des ruines',
    gmSceneNote: 'Le prix de l\'immortalité spectrale. Nassira est seule depuis deux siècles et demi. La solitude d\'un fantôme qui se souvient de tout.',
    lines: [
      {
        speaker: 'Nassira',
        text: 'Vous savez le plus dur ? Ce n\'est pas d\'être morte. C\'est de se souvenir de tout. Chaque visage. Chaque rire. Le goût du thé d\'épices que ma soeur préparait. Je ne peux plus sentir. Plus goûter. Mais je me souviens. Toujours.',
        emotion: 'solitude éternelle',
        gmCoaching: 'Nassira s\'arrête de flotter et s\'assied — ou plutôt, fait le geste de s\'asseoir au-dessus d\'un banc brisé. C\'est un réflexe de vivante qu\'elle n\'a pas perdu.'
      },
      {
        speaker: 'Nassira',
        text: 'Parfois, je parle aux livres. Ils ne répondent pas, mais au moins ils ne partent pas. Les fantômes... les autres fantômes sont devenus fous il y a longtemps. Je suis la dernière saine d\'esprit. Du moins, je crois.',
        emotion: 'humour amer',
        gmCoaching: 'Rire doux et triste. Nassira est la personne la plus seule d\'Aethelgard.'
      }
    ],
    playerResponses: [
      {
        id: 'nassira-trist-liberer',
        label: '"N\'y a-t-il pas un moyen de vous libérer ? De vous donner le repos ?"',
        consequence: 'Nassira : "Il y en a un. Mais il implique de détruire la bibliothèque. Et ça... je ne peux pas."'
      },
      {
        id: 'nassira-trist-compagnie',
        label: '"Nous sommes là maintenant. Et nous reviendrons."',
        consequence: 'La lumière de Nassira pulse doucement. "...Promettez ?"'
      },
      {
        id: 'nassira-trist-histoires',
        label: 'Lui raconter des histoires du monde extérieur — ce qui a changé en 243 ans.',
        consequence: 'Nassira écoute avec une avidité touchante. "Des bateaux volants ? Vraiment ? Oh, comme j\'aurais aimé voir ça..."'
      }
    ]
  },
  {
    id: 'nassira-cle',
    npcId: 'nassira',
    npcName: 'Nassira la Bibliothécaire Fantôme',
    trigger: 'Nassira révèle le savoir crucial',
    tone: 'grave, professoral',
    unlockCondition: 'Confiance établie avec Nassira',
    gmSceneNote: 'Le savoir d\'Ashka. Des informations que personne d\'autre dans le monde ne possède. Nassira est la clé de tout.',
    lines: [
      {
        speaker: 'Nassira',
        text: 'J\'ai gardé ce texte en mémoire pendant deux siècles, en attendant quelqu\'un de digne. Le Codex Primordial — le texte original sur les Sceaux, écrit par les Premiers eux-mêmes.',
        emotion: 'solennité',
        gmCoaching: 'Nassira tend une main fantomatique et la lumière forme des lettres dans l\'air. Le texte ancien s\'inscrit devant les yeux des PJ.'
      },
      {
        speaker: 'Nassira',
        text: 'Le Rituel de Restauration y est décrit. Mais attention — il y a un passage que Vaelith ne connaît pas : les Sceaux ne peuvent être restaurés que si leur gardien CHOISIT d\'y retourner. Il faut des âmes volontaires. Pas de la force.',
        emotion: 'gravité',
        gmCoaching: 'Information cruciale qui change toute la stratégie. Les Sceaux ne sont pas des prisons — ce sont des sacrifices consentis.'
      }
    ],
    playerResponses: [
      {
        id: 'nassira-cle-implications',
        label: '"Des âmes volontaires... Qui accepterait un tel sacrifice ?"',
        consequence: 'Nassira vous regarde avec une expression que vous ne pouvez pas déchiffrer. "...Peut-être plus de gens que vous ne pensez."'
      },
      {
        id: 'nassira-cle-copier',
        label: 'Copier le Codex Primordial pour l\'apporter à Vaelith.',
        consequence: 'Nassira aide à transcrire le texte. Information critique obtenue.'
      }
    ]
  },
  {
    id: 'nassira-adieu',
    npcId: 'nassira',
    npcName: 'Nassira la Bibliothécaire Fantôme',
    trigger: 'Départ des ruines d\'Ashka',
    tone: 'déchirant, doux',
    unlockCondition: 'Fin de l\'exploration des ruines',
    gmSceneNote: 'L\'adieu de Nassira est un des moments les plus tristes de la campagne. Une femme brillante, condamnée à une éternité de solitude, qui dit au revoir aux seuls amis qu\'elle a eus en deux siècles.',
    lines: [
      {
        speaker: 'Nassira',
        text: 'Vous partez. Bien sûr. Vous avez un monde à sauver, après tout. Pas le temps de tenir compagnie à un vieux fantôme.',
        emotion: 'acceptation douloureuse',
        gmCoaching: 'Elle sourit mais sa lumière faiblit. Nassira savait que ce moment viendrait. Elle avait juste espéré qu\'il viendrait plus tard.'
      },
      {
        speaker: 'Nassira',
        text: 'Allez. Sauvez ce monde stupide et magnifique. Et si un jour vous passez par des ruines poussiéreuses pleines de livres... pensez à moi. C\'est tout ce que demande un fantôme.',
        emotion: 'adieu touchant',
        gmCoaching: 'Des larmes fantomatiques, lumineuses. Elle fait un geste d\'au revoir — le même qu\'elle devait faire aux étudiants qui quittaient la bibliothèque à la fermeture.'
      }
    ],
    playerResponses: [
      {
        id: 'nassira-adieu-promesse',
        label: '"Quand tout sera fini, je reviendrai. Avec des histoires et du thé d\'épices."',
        consequence: 'Nassira rit à travers ses larmes de lumière. "Du thé ? Je ne peux pas le boire, mais... j\'adorerais en sentir l\'odeur."'
      },
      {
        id: 'nassira-adieu-livre',
        label: 'Laisser un livre neuf dans la bibliothèque — quelque chose qu\'elle n\'a jamais lu.',
        consequence: 'Les yeux de Nassira s\'écarquillent de joie. "Un... un NOUVEAU livre ?! Oh, vous êtes merveilleux !" Sa lumière brille comme un soleil.'
      },
      {
        id: 'nassira-adieu-liberer',
        label: '"Nassira... voulez-vous que nous trouvions un moyen de vous libérer ?"',
        consequence: 'Long silence. "...Pas encore. Pas tant qu\'il reste des livres à protéger. Mais un jour, peut-être. Demandez-moi après la victoire."'
      }
    ]
  },
];

// ============================================================================
// 7. BRENNA FORGE-FLAMME — Fille pétrifiée du roi (4 dialogues)
// ============================================================================

const BRENNA_DIALOGUES: DialogueTree[] = [
  {
    id: 'brenna-reveil',
    npcId: 'brenna',
    npcName: 'Brenna Forge-Flamme',
    trigger: 'Brenna est libérée de la pétrification',
    tone: 'confusion, vulnérabilité',
    unlockCondition: 'Vyraxithon libère Brenna ou pétrification brisée',
    gmSceneNote: 'Brenna a été figée pendant des mois. Pour elle, ça fait une seconde. Elle est désorientée, forte, et refuse de montrer sa peur.',
    lines: [
      {
        speaker: 'Brenna',
        text: '...Qu\'est-ce que... Le dragon ! Où est le dragon ?! Gardes, à moi !',
        emotion: 'panique guerrière',
        gmCoaching: 'Brenna se réveille en position de combat, cherchant son arme. Elle est prête à se battre avant même de comprendre ce qui s\'est passé.'
      },
      {
        speaker: 'Brenna',
        text: 'Combien de temps ? Attendez... père ? OÙ EST MON PÈRE ?!',
        emotion: 'peur soudaine',
        gmCoaching: 'La guerrière cède place à la fille. Sa voix se brise sur "père". Elle a peur qu\'il soit mort.'
      }
    ],
    playerResponses: [
      {
        id: 'brenna-rev-calmer',
        label: '"Princesse Brenna, vous êtes en sécurité. Votre père est vivant et vous attend."',
        consequence: 'Brenna tremble de soulagement. Ses jambes fléchissent un instant avant qu\'elle se redresse.',
        nextDialogueId: 'brenna-gratitude'
      },
      {
        id: 'brenna-rev-situation',
        label: 'Expliquer rapidement la situation : les Sceaux, la guerre, le temps qui a passé.',
        consequence: 'Brenna encaisse chaque information comme un coup. Mais elle reste debout. Elle est naine.',
        nextDialogueId: 'brenna-info-dragon'
      },
      {
        id: 'brenna-rev-humour',
        label: '"Vous avez dormi un moment. Vous avez raté pas mal de choses."',
        consequence: 'Brenna : "Dormi ?! J\'ai été PÉTRIFIÉE par un dragon ! Ce n\'est pas une sieste !"'
      }
    ]
  },
  {
    id: 'brenna-gratitude',
    npcId: 'brenna',
    npcName: 'Brenna Forge-Flamme',
    trigger: 'Après le réveil et la réunion avec Thrain',
    tone: 'reconnaissance, détermination',
    unlockCondition: 'Réveil de Brenna',
    gmSceneNote: 'Brenna n\'est pas une demoiselle en détresse — c\'est une guerrière qui a été sauvée et qui en est reconnaissante, mais qui veut immédiatement aider.',
    lines: [
      {
        speaker: 'Brenna',
        text: 'Mon père m\'a dit ce que vous avez fait. Comment vous avez affronté le dragon. Négocié avec lui. Pour moi. Une étrangère.',
        emotion: 'gratitude profonde',
        gmCoaching: 'Brenna parle avec la même voix grave que son père. Le pomme ne tombe pas loin de l\'arbre.'
      },
      {
        speaker: 'Brenna',
        text: 'Je ne suis pas douée pour dire merci. Chez les nains, les mots comptent moins que les actes. Alors voici mon serment : ma hache est à votre service. Où vous irez, j\'irai. Jusqu\'à ce que cette dette soit payée — et même après.',
        emotion: 'serment guerrier',
        gmCoaching: 'Elle dégaine sa hache et la plante dans le sol devant les PJ. C\'est un serment de sang nain, le plus sacré.'
      }
    ],
    playerResponses: [
      {
        id: 'brenna-grat-accepter',
        label: 'Accepter son serment et sa compagnie.',
        consequence: 'Brenna rejoint le groupe comme alliée de combat. Guerrière redoutable.'
      },
      {
        id: 'brenna-grat-egaux',
        label: '"Pas de dette, Brenna. Nous sommes alliés, pas créanciers."',
        consequence: 'Brenna sourit — le sourire de Thrain, en plus jeune. "Alliés, alors. C\'est encore mieux."'
      }
    ]
  },
  {
    id: 'brenna-info-dragon',
    npcId: 'brenna',
    npcName: 'Brenna Forge-Flamme',
    trigger: 'Brenna partage des informations sur Vyraxithon',
    tone: 'tactique, respectueux',
    unlockCondition: 'Brenna éveillée et en confiance',
    gmSceneNote: 'Brenna est la seule personne vivante à avoir vu Vyraxithon de près et survécu. Ses informations sont précieuses.',
    lines: [
      {
        speaker: 'Brenna',
        text: 'Le dragon... Vyraxithon. Il n\'est pas ce que vous croyez. Quand il m\'a pétrifiée, j\'ai vu ses yeux. Il n\'y avait pas de cruauté. Il y avait de la... tristesse. Comme s\'il s\'excusait.',
        emotion: 'réflexion',
        gmCoaching: 'Brenna revit le moment. Elle touche son bras — l\'endroit où le cristal l\'a touchée en premier. Elle n\'a pas peur du dragon. Elle le comprend.'
      },
      {
        speaker: 'Brenna',
        text: 'Il m\'a dit une chose, juste avant. "Pardonne-moi, petite guerrière. Mais je ne laisserai personne approcher ce que je protège." Il PROTÈGE quelque chose. Pas par méchanceté — par devoir.',
        emotion: 'compréhension',
        gmCoaching: 'Information cruciale pour la diplomatie avec le dragon. Brenna a perçu ce que les autres n\'ont pas vu.'
      }
    ],
    playerResponses: [
      {
        id: 'brenna-info-quoi',
        label: '"Qu\'est-ce qu\'il protège, selon vous ?"',
        consequence: 'Brenna : "Le Nexus Nord. J\'en suis certaine. Et peut-être... quelque chose de plus. Quelque chose de très ancien."'
      },
      {
        id: 'brenna-info-approche',
        label: '"Pourriez-vous nous aider à l\'approcher diplomatiquement ?"',
        consequence: 'Brenna hésite. "Il m\'a pétrifiée. Mais... oui. Si quelqu\'un peut le raisonner, c\'est peut-être moi."'
      }
    ]
  },
  {
    id: 'brenna-courage',
    npcId: 'brenna',
    npcName: 'Brenna Forge-Flamme',
    trigger: 'Brenna fait face à un défi majeur',
    tone: 'courageux, inspirant',
    unlockCondition: 'Brenna dans le groupe et situation de crise',
    gmSceneNote: 'Brenna retrouve son courage. Elle a traversé la pétrification et en est ressortie plus forte.',
    lines: [
      {
        speaker: 'Brenna',
        text: 'J\'ai passé des mois prisonnière dans le cristal. Consciente. Incapable de bouger, de crier, de pleurer. Et je ne me suis pas brisée. Vous pensez que CECI va m\'arrêter ?',
        emotion: 'défi féroce',
        gmCoaching: 'Yeux de feu, mâchoire serrée, hache levée. Brenna est passée par l\'enfer et en est revenue blindée. C\'est une force de la nature.'
      },
      {
        speaker: 'Brenna',
        text: 'Mon père dit que les nains ne reculent jamais. Et Brenna Forge-Flamme ENCORE MOINS. EN AVANT !',
        emotion: 'cri de guerre',
        gmCoaching: 'Cri nain, charge en avant. Les PJ n\'ont pas le choix — son élan est contagieux.'
      }
    ],
    playerResponses: [
      {
        id: 'brenna-courage-suivre',
        label: 'Charger avec Brenna en poussant un cri de guerre.',
        consequence: 'Inspiration ! Avantage sur le prochain jet de combat pour tout le groupe.'
      },
      {
        id: 'brenna-courage-plan',
        label: '"Brenna, attends ! On a besoin d\'un plan !"',
        consequence: 'Brenna : "Le plan ? On fonce. On tape. On gagne. Les nains n\'ont pas besoin de plus."'
      }
    ]
  },
];

// ============================================================================
// 8. COMMANDANT RASK — Chef militaire allié (6 dialogues)
// ============================================================================

const RASK_DIALOGUES: DialogueTree[] = [
  {
    id: 'rask-rapport',
    npcId: 'commandant-rask',
    npcName: 'Commandant Rask',
    trigger: 'Briefing militaire',
    tone: 'professionnel, tendu',
    gmSceneNote: 'Rask est un soldat de carrière — efficace, bref, sans fioritures. Chaque mot est un ordre ou un fait. Pas de place pour l\'émotion. En apparence.',
    lines: [
      {
        speaker: 'Rask',
        text: 'Rapport. Forces ennemies estimées à vingt mille. Composition : squelettes de base, goules, revenants d\'élite, trois liches secondaires. Et Malachar au centre.',
        emotion: 'froideur militaire',
        gmCoaching: 'Debout devant une carte. Droit comme un I. Chaque information est livrée sans émotion, comme un rapport d\'état-major.'
      },
      {
        speaker: 'Rask',
        text: 'Nos forces : huit mille soldats du royaume, trois mille nains de Karak-Zhul si l\'alliance tient, et quelques centaines de volontaires. Nous sommes en infériorité numérique de deux contre un. Minimum.',
        emotion: 'réalisme brutal',
        gmCoaching: 'Rask ne dramatise pas — il constate. Le silence qui suit les chiffres est plus éloquent que n\'importe quel discours.'
      }
    ],
    playerResponses: [
      {
        id: 'rask-rapport-moral',
        label: '"Et le moral des troupes ?"',
        consequence: 'Rask : "Bas. Mais ils tiendront. Les soldats du royaume ne désertent pas. C\'est dans le serment."'
      },
      {
        id: 'rask-rapport-strategie',
        label: '"Quelle stratégie recommandez-vous, Commandant ?"',
        consequence: 'Rask déploie un plan détaillé. Trois options tactiques présentées avec précision.',
        nextDialogueId: 'rask-desaccord'
      },
      {
        id: 'rask-rapport-atouts',
        label: '"Des atouts dont l\'ennemi ne dispose pas ?"',
        consequence: 'Rask : "Vous. Les PJ. Des agents spéciaux derrière les lignes. Et peut-être un dragon, si vos amis écailleux se montrent."'
      }
    ]
  },
  {
    id: 'rask-desaccord',
    npcId: 'commandant-rask',
    npcName: 'Commandant Rask',
    trigger: 'Désaccord stratégique avec les PJ',
    tone: 'tendu, professionnel',
    unlockCondition: 'Briefing militaire fait',
    gmSceneNote: 'Rask est un bon soldat mais parfois trop prudent. Les PJ peuvent avoir raison de proposer une approche plus audacieuse.',
    lines: [
      {
        speaker: 'Rask',
        text: 'Avec tout le respect que je vous dois... votre plan est suicidaire. Envoyer une petite équipe à travers les lignes ennemies pour atteindre Malachar directement ? C\'est de la folie.',
        emotion: 'désaccord ferme',
        gmCoaching: 'Rask ne crie pas. Il parle froidement, factuel. Mais ses poings sont serrés. Il perd des soldats — pas des pions.'
      },
      {
        speaker: 'Rask',
        text: 'Chaque plan brillant ressemble à de la folie pour ceux qui n\'y croient pas. Convainquez-moi. Si vous avez raison, je le suivrai. Mais si des hommes meurent à cause d\'un plan raté, ça sera SUR VOUS.',
        emotion: 'pragmatisme moral',
        gmCoaching: 'Rask met le poids moral sur les PJ. C\'est un test de leadership, pas d\'ego.'
      }
    ],
    playerResponses: [
      {
        id: 'rask-des-convaincre',
        label: 'Détailler le plan avec des arguments tactiques solides.',
        consequence: 'Jet de Tactique DD 15. Succès : Rask est convaincu. "...C\'est risqué. Mais ça pourrait marcher."',
        skillCheck: { skill: 'Tactique', dc: 15 }
      },
      {
        id: 'rask-des-accepter',
        label: '"Vous avez raison, Commandant. Suivons votre plan."',
        consequence: 'Rask hoche la tête, surpris mais satisfait. Le plan conservateur réduit les pertes mais allonge la bataille.'
      },
      {
        id: 'rask-des-compromis',
        label: '"Fusionnons nos deux plans — votre prudence et notre audace."',
        consequence: 'Rask considère. "Un compromis... inhabituel venant d\'aventuriers. Travaillons-le ensemble."'
      }
    ]
  },
  {
    id: 'rask-respect',
    npcId: 'commandant-rask',
    npcName: 'Commandant Rask',
    trigger: 'Après une victoire ou un acte de bravoure des PJ',
    tone: 'respect mesuré',
    unlockCondition: 'Victoire significative avec Rask comme témoin',
    gmSceneNote: 'Le respect de Rask se mérite, pas se demande. Quand il l\'accorde, c\'est sincère et définitif.',
    lines: [
      {
        speaker: 'Rask',
        text: 'Je dois reconnaître... j\'avais tort sur votre compte. Je pensais que les aventuriers étaient des mercenaires glorifiés. Vous êtes des soldats. Les meilleurs que j\'aie vus.',
        emotion: 'respect sincère',
        gmCoaching: 'C\'est le plus grand compliment que Rask puisse faire. "Soldats" — dans sa bouche, c\'est un titre sacré.'
      }
    ],
    playerResponses: [
      {
        id: 'rask-resp-humble',
        label: '"C\'est votre entraînement qui nous a préparés, Commandant."',
        consequence: 'Rask : "Flatteur. Mais l\'entraînement ne crée pas le courage. Ça, c\'est inné."'
      },
      {
        id: 'rask-resp-equipe',
        label: '"On n\'y serait pas arrivés sans vos hommes. C\'est une victoire commune."',
        consequence: 'Rask : "Transmis à la troupe. Ça leur fera plaisir."'
      }
    ]
  },
  {
    id: 'rask-sacrifice',
    npcId: 'commandant-rask',
    npcName: 'Commandant Rask',
    trigger: 'Rask offre de couvrir la retraite',
    tone: 'solennel, tragique',
    unlockCondition: 'Retraite nécessaire lors d\'un combat',
    gmSceneNote: 'Rask accepte la possibilité de mourir avec un calme professionnel. C\'est un soldat — il sait que ce jour pourrait venir.',
    lines: [
      {
        speaker: 'Rask',
        text: 'Quelqu\'un doit couvrir votre retraite. Et ça ne peut pas être vous — le monde a besoin de vous pour le Rituel. Il n\'a pas besoin d\'un vieux commandant.',
        emotion: 'sacrifice serein',
        gmCoaching: 'Calme absolu. Rask a fait la paix avec la mort il y a longtemps. Ce n\'est pas de la résignation — c\'est du devoir.'
      }
    ],
    playerResponses: [
      {
        id: 'rask-sacr-refuser',
        label: '"Personne ne reste derrière. On trouve un autre moyen."',
        consequence: 'Rask : "...Vous êtes aussi têtu qu\'un nain. D\'accord. Quel est le plan ?"'
      },
      {
        id: 'rask-sacr-accepter',
        label: '"Commandant... c\'est un honneur d\'avoir servi avec vous."',
        consequence: 'Rask serre votre main. "L\'honneur est mien. Maintenant, courez." 60% de chance de survie.'
      }
    ]
  },
  {
    id: 'rask-camaraderie',
    npcId: 'commandant-rask',
    npcName: 'Commandant Rask',
    trigger: 'Moment de repos au campement',
    tone: 'détendu, fraternel',
    unlockCondition: 'Respect mutuel établi',
    gmSceneNote: 'Rask hors service est un homme différent. Il boit, raconte des histoires, et montre un humour sec qu\'on ne soupçonnait pas.',
    lines: [
      {
        speaker: 'Rask',
        text: 'Mon premier combat ? J\'avais seize ans. J\'ai vomi sur les bottes de mon sergent. Il m\'a fait nettoyer ça, puis m\'a serré la main et m\'a dit : "Bienvenue dans l\'armée, fils."',
        emotion: 'nostalgie amusée',
        gmCoaching: 'Rask sourit — rare et précieux. Le feu de camp éclaire un homme fatigué qui se souvient de sa jeunesse.'
      }
    ],
    playerResponses: [
      {
        id: 'rask-cam-histoire',
        label: 'Partager sa propre histoire de premier combat.',
        consequence: 'Rask écoute et rit. "On a tous vomi la première fois. C\'est ceux qui ne vomissent pas qui m\'inquiètent."'
      },
      {
        id: 'rask-cam-toast',
        label: 'Porter un toast aux soldats tombés.',
        consequence: 'Rask se lève. "Aux absents." Silence respectueux. Puis il boit d\'un trait.'
      }
    ]
  },
  {
    id: 'rask-victoire',
    npcId: 'commandant-rask',
    npcName: 'Commandant Rask',
    trigger: 'Après la victoire finale',
    tone: 'soulagement, émotion',
    unlockCondition: 'Victoire et survie de Rask',
    gmSceneNote: 'Le soldat qui a tout donné. Rask s\'assied enfin et le poids de tout retombe d\'un coup.',
    lines: [
      {
        speaker: 'Rask',
        text: 'C\'est fini. Par tous les dieux que je ne prie pas... c\'est vraiment fini.',
        emotion: 'incrédulité soulagée',
        gmCoaching: 'Rask s\'assied au sol, retire son casque. Ses cheveux sont trempés de sueur et de sang. Il semble soudain avoir dix ans de plus — ou dix ans de moins.'
      }
    ],
    playerResponses: [
      {
        id: 'rask-vict-asseoir',
        label: 'S\'asseoir à côté de lui en silence.',
        consequence: 'Pas besoin de mots entre soldats qui ont survécu ensemble.'
      },
      {
        id: 'rask-vict-futur',
        label: '"Qu\'allez-vous faire maintenant, Commandant ?"',
        consequence: 'Rask : "Dormir. Pendant une semaine. Et puis... peut-être prendre ma retraite. Peut-être."'
      }
    ]
  },
];

// ============================================================================
// 9. ALDRIC L'ANCIEN — Sage millénaire (6 dialogues)
// ============================================================================

const ALDRIC_DIALOGUES: DialogueTree[] = [
  {
    id: 'aldric-exposition',
    npcId: 'aldric-ancien',
    npcName: 'Aldric l\'Ancien',
    trigger: 'Rencontre avec le sage millénaire',
    tone: 'vénérable, cryptique',
    gmSceneNote: 'Aldric a l\'air d\'un vieillard fragile mais ses yeux contiennent des galaxies. Il parle en paraboles et en silences. Chaque mot est pesé sur la balance de mille ans.',
    lines: [
      {
        speaker: 'Aldric',
        text: 'Ah. Vous voilà enfin. J\'ai vu votre venue dans les flammes il y a trois cents ans. Vous êtes en retard.',
        emotion: 'humour ancien',
        gmCoaching: 'Sourire de grand-père. Aldric est assis au coin d\'un feu impossible — les flammes sont bleues et ne brûlent pas. Il ne se lève pas. Il n\'en a pas besoin.'
      },
      {
        speaker: 'Aldric',
        text: 'Asseyez-vous. Le temps n\'est pas une ligne droite, voyez-vous. C\'est un lac. Et nous sommes des poissons qui nagent en cercles en croyant avancer.',
        emotion: 'sagesse cryptique',
        gmCoaching: 'Aldric parle en métaphores. C\'est frustrant mais chaque image contient une vérité profonde. Les PJ doivent faire l\'effort de comprendre.'
      }
    ],
    playerResponses: [
      {
        id: 'aldric-expo-patience',
        label: 'S\'asseoir et écouter patiemment.',
        consequence: 'Aldric sourit. "La patience. La plus rare des vertus chez les jeunes. Bien."',
        nextDialogueId: 'aldric-verite'
      },
      {
        id: 'aldric-expo-direct',
        label: '"Avec tout le respect dû à votre âge, nous n\'avons pas le temps pour les devinettes."',
        consequence: 'Aldric : "Le temps ? Vous croyez ne pas en avoir. C\'est justement pour ça que vous en avez besoin."'
      },
      {
        id: 'aldric-expo-questions',
        label: '"Qui êtes-vous vraiment, Aldric ?"',
        consequence: 'Aldric : "Qui suis-je ? La question la plus honnête qu\'on m\'ait posée. Je suis... un témoin."',
        nextDialogueId: 'aldric-verite'
      }
    ]
  },
  {
    id: 'aldric-verite',
    npcId: 'aldric-ancien',
    npcName: 'Aldric l\'Ancien',
    trigger: 'Aldric révèle la vérité sur l\'Entité',
    tone: 'grave, cosmique',
    unlockCondition: 'Patience ou question directe',
    gmSceneNote: 'Aldric connaît la vérité entière — parce qu\'il était là. Depuis le début. La question est : combien peut-il révéler sans tout détruire ?',
    lines: [
      {
        speaker: 'Aldric',
        text: 'Ael\'Sharath — l\'Entité — n\'est pas un ennemi. C\'est un... souvenir. La mémoire vivante de ce que le monde était AVANT. Avant les mortels, avant les dieux, avant la lumière. Le monde originel, pur chaos, conscience sans forme.',
        emotion: 'révérence',
        gmCoaching: 'Aldric parle d\'Ael\'Sharath avec un respect terrifiant. Pas de peur — du respect. Comme on parle d\'un océan ou d\'un volcan.'
      },
      {
        speaker: 'Aldric',
        text: 'Les Premiers ne l\'ont pas combattue. Ils l\'ont... endormie. Les Sceaux sont une berceuse cosmique. Et quand la berceuse s\'arrête, Ael\'Sharath se réveille. Pas par colère. Par nature.',
        emotion: 'vérité fondamentale',
        gmCoaching: 'Métaphore de la berceuse : puissante et simple. Les PJ comprennent enfin — ce n\'est pas une guerre, c\'est un réveil.'
      }
    ],
    playerResponses: [
      {
        id: 'aldric-ver-arreter',
        label: '"Comment la rendormir ?"',
        consequence: 'Aldric : "Avec de nouveaux Sceaux. De nouvelles berceuses. De nouvelles âmes prêtes à chanter pour l\'éternité."'
      },
      {
        id: 'aldric-ver-negocier',
        label: '"Peut-on coexister avec Ael\'Sharath ? Trouver un équilibre ?"',
        consequence: 'Les yeux d\'Aldric brillent. "CETTE question. Oui. Peut-être. Mais personne n\'a jamais essayé."',
        nextDialogueId: 'aldric-puzzle'
      }
    ]
  },
  {
    id: 'aldric-avertissement',
    npcId: 'aldric-ancien',
    npcName: 'Aldric l\'Ancien',
    trigger: 'Aldric prévient des dangers du Rituel',
    tone: 'sombre, paternel',
    unlockCondition: 'Plan du Grand Rituel connu',
    gmSceneNote: 'Le vieil homme s\'inquiète comme un grand-père pour ses petits-enfants qui vont à la guerre.',
    lines: [
      {
        speaker: 'Aldric',
        text: 'Le Rituel de Vaelith fonctionnera. Probablement. Mais chaque action a un prix, et le prix de celui-ci... vous ne le connaissez pas encore. Méfiez-vous des solutions qui semblent trop parfaites.',
        emotion: 'avertissement grave',
        gmCoaching: 'Aldric pose sa main sur l\'épaule du PJ le plus jeune. Son contact est étrangement chaud pour un vieil homme.'
      }
    ],
    playerResponses: [
      {
        id: 'aldric-avert-prix',
        label: '"Quel est le prix ? Dites-le nous."',
        consequence: 'Aldric : "Si je vous le dis, cela changera votre choix. Et je ne suis pas sûr que cela devrait être changé."'
      },
      {
        id: 'aldric-avert-confiance',
        label: '"Nous sommes prêts à payer le prix."',
        consequence: 'Aldric : "Dit avec le courage de l\'ignorance. Le plus beau courage qui soit."'
      }
    ]
  },
  {
    id: 'aldric-puzzle',
    npcId: 'aldric-ancien',
    npcName: 'Aldric l\'Ancien',
    trigger: 'Aldric pose une énigme philosophique',
    tone: 'socratique, ludique',
    unlockCondition: 'Vérité sur l\'Entité révélée',
    gmSceneNote: 'Aldric enseigne par les questions, pas les réponses. Son puzzle est une préparation mentale pour le choix final.',
    lines: [
      {
        speaker: 'Aldric',
        text: 'Une dernière leçon, si vous le permettez. Un homme porte un flambeau dans la nuit. L\'ombre recule. Mais sans ombre, la lumière n\'a pas de sens. Question : doit-il éteindre le flambeau pour comprendre l\'ombre, ou l\'ombre est-elle nécessaire justement parce qu\'elle existe ?',
        emotion: 'défi intellectuel',
        gmCoaching: 'Aldric attend une vraie réponse. Il n\'y a pas de bonne réponse — seulement des réponses qui révèlent le caractère des PJ.'
      }
    ],
    playerResponses: [
      {
        id: 'aldric-puzzle-equilibre',
        label: '"Les deux coexistent. L\'un ne va pas sans l\'autre."',
        consequence: 'Aldric sourit largement. "Vous commencez à comprendre. L\'Entité et le monde ne sont pas ennemis — ils sont partenaires."'
      },
      {
        id: 'aldric-puzzle-lumiere',
        label: '"On garde le flambeau. L\'ombre peut exister, mais la lumière la contient."',
        consequence: 'Aldric : "Réponse de guerrier. Valable. Mais peut-être un jour, vous découvrirez que l\'ombre ne veut pas être contenue."'
      },
      {
        id: 'aldric-puzzle-refus',
        label: '"Je ne suis pas philosophe. Je suis quelqu\'un qui agit."',
        consequence: 'Aldric rit. "Et c\'est pour ça que le monde a besoin de vous. Les philosophes pensent. Vous FAITES."'
      }
    ]
  },
  {
    id: 'aldric-benediction',
    npcId: 'aldric-ancien',
    npcName: 'Aldric l\'Ancien',
    trigger: 'Bénédiction avant la bataille finale',
    tone: 'sacré, paternel',
    unlockCondition: 'Veille de la bataille finale',
    gmSceneNote: 'Aldric bénit les PJ — et la bénédiction d\'un être millénaire a un VRAI pouvoir. Les PJ sentent la chaleur les envahir.',
    lines: [
      {
        speaker: 'Aldric',
        text: 'Inclinez-vous. Pas devant moi — devant le courage qui est en vous. Celui qui a toujours été là, bien avant que je ne le voie.',
        emotion: 'bénédiction',
        gmCoaching: 'Aldric pose ses mains sur les têtes des PJ. Une lumière dorée pulse. Chaque PJ sent ses peurs s\'apaiser — pas disparaître, mais devenir gérables.'
      }
    ],
    playerResponses: [
      {
        id: 'aldric-bened-accepter',
        label: 'S\'incliner et recevoir la bénédiction.',
        consequence: 'Bénédiction d\'Aldric : +2 à tous les jets de sauvegarde pendant la bataille finale.'
      },
      {
        id: 'aldric-bened-merci',
        label: '"Merci, Aldric. Pour tout."',
        consequence: 'Aldric : "Ne me remerciez pas encore. Remerciez-moi quand le soleil se lèvera sur un monde intact."'
      }
    ]
  },
  {
    id: 'aldric-prophetie',
    npcId: 'aldric-ancien',
    npcName: 'Aldric l\'Ancien',
    trigger: 'Prophétie finale d\'Aldric',
    tone: 'prophétique, mystérieux',
    unlockCondition: 'Bénédiction donnée',
    gmSceneNote: 'La dernière prophétie. Cryptique mais vitale. Les PJ ne comprendront pleinement qu\'au moment crucial de l\'Acte 5.',
    lines: [
      {
        speaker: 'Aldric',
        text: 'Un dernier mot. Quand tout semblera perdu — et ce moment VIENDRA — souvenez-vous de ceci : le choix le plus difficile n\'est pas entre le bien et le mal. C\'est entre deux biens. Ou entre deux sacrifices. Et celui qui choisit avec amour ne se trompe jamais.',
        emotion: 'prophétie',
        gmCoaching: 'Aldric s\'éloigne. Sa silhouette devient translucide — presque comme s\'il n\'avait jamais été vraiment là. Était-il réel ? Était-il un fantôme ? Un souvenir ? Les PJ ne le sauront peut-être jamais.'
      }
    ],
    playerResponses: [
      {
        id: 'aldric-proph-comprendre',
        label: '"Je m\'en souviendrai."',
        consequence: 'Aldric disparaît avec un sourire. Les PJ portent ses mots comme un talisman.'
      },
      {
        id: 'aldric-proph-attendre',
        label: '"Aldric ? ALDRIC !"',
        consequence: 'Il est parti. Seul le feu bleu reste, brûlant doucement. Puis il s\'éteint aussi.'
      }
    ]
  },
];

// ============================================================================
// 10. GUERRIER DÉCHU KAEL — Ancien héros tombé (4 dialogues)
// ============================================================================

const KAEL_DIALOGUES: DialogueTree[] = [
  {
    id: 'kael-rencontre',
    npcId: 'kael-dechu',
    npcName: 'Kael le Déchu',
    trigger: 'Rencontre dans les ruines d\'un ancien champ de bataille',
    tone: 'amer, brisé',
    gmSceneNote: 'Kael était un héros célèbre — maintenant c\'est un homme brisé assis parmi les ruines de sa gloire. Des armes rouillées et des bannières en lambeaux l\'entourent.',
    lines: [
      {
        speaker: 'Kael',
        text: 'Partez. Il n\'y a rien ici pour des héros. Seulement un vieil idiot qui a cru qu\'une épée et du courage suffisaient à changer le monde.',
        emotion: 'amertume',
        gmCoaching: 'Kael ne lève même pas les yeux. Il est assis sur un trône de décombres, une épée brisée sur les genoux. Il sent l\'alcool et le désespoir.'
      }
    ],
    playerResponses: [
      {
        id: 'kael-renc-ecouter',
        label: '"Que vous est-il arrivé ?"',
        consequence: 'Kael regarde les PJ pour la première fois. Quelque chose dans leurs yeux lui rappelle qui il était.',
        nextDialogueId: 'kael-histoire'
      },
      {
        id: 'kael-renc-secouer',
        label: '"Debout, soldat. Le monde a besoin de vous."',
        consequence: 'Kael rit amèrement. "Le monde m\'a déjà eu. Regardez le résultat."'
      },
      {
        id: 'kael-renc-partir',
        label: 'Le laisser tranquille et partir.',
        consequence: 'Kael murmure "...Attendez." Il ne veut pas qu\'ils partent, au fond.'
      }
    ]
  },
  {
    id: 'kael-histoire',
    npcId: 'kael-dechu',
    npcName: 'Kael le Déchu',
    trigger: 'Kael raconte sa chute',
    tone: 'tragique, confession',
    unlockCondition: 'Engagement dans la conversation',
    gmSceneNote: 'L\'histoire de Kael est un miroir sombre pour les PJ — ce qu\'ils pourraient devenir s\'ils échouent.',
    lines: [
      {
        speaker: 'Kael',
        text: 'J\'ai mené la Compagnie de l\'Aube contre la première invasion des morts-vivants. Cinquante braves. Nous avons gagné. Oh oui, nous avons gagné. Et sur les cinquante, trois sont revenus. Trois.',
        emotion: 'culpabilité de survivant',
        gmCoaching: 'Il compte sur ses doigts. Trois. Le nombre le hante chaque nuit.'
      },
      {
        speaker: 'Kael',
        text: 'On m\'a donné des médailles. On m\'a appelé héros. Mais les mères de quarante-sept soldats m\'ont regardé avec des yeux que je vois encore dans mes cauchemars. Et j\'ai su que "victoire" et "héroïsme" sont les mots que les survivants inventent pour supporter la mort.',
        emotion: 'trauma profond',
        gmCoaching: 'Les mains de Kael tremblent. Le syndrome du survivant dans toute sa cruauté.'
      }
    ],
    playerResponses: [
      {
        id: 'kael-hist-comprendre',
        label: '"Le poids de ces vies... personne ne devrait le porter seul."',
        consequence: 'Kael vous regarde avec des yeux brillants. "Personne ne m\'a jamais dit ça."',
        nextDialogueId: 'kael-redemption'
      },
      {
        id: 'kael-hist-verite',
        label: '"Ils sont morts en combattant. En choisissant. Vous ne les avez pas tués."',
        consequence: 'Kael : "Je les ai MENÉS. Quelle différence ?"'
      },
      {
        id: 'kael-hist-besoin',
        label: '"Il y a une nouvelle bataille. Et les vivants ont besoin de vous, Kael."',
        consequence: 'Kael serre l\'épée brisée. "...Une nouvelle bataille. Comme si la première n\'avait pas suffi."',
        nextDialogueId: 'kael-redemption'
      }
    ]
  },
  {
    id: 'kael-redemption',
    npcId: 'kael-dechu',
    npcName: 'Kael le Déchu',
    trigger: 'Kael choisit de se relever ou de rester',
    tone: 'pivot, résolution',
    unlockCondition: 'Connexion émotionnelle établie',
    gmSceneNote: 'LE moment : Kael se relève. Ou pas. Les joueurs influencent ce choix par leurs mots et leurs actes.',
    lines: [
      {
        speaker: 'Kael',
        text: '...Cette épée. Elle appartenait à Lira, mon lieutenant. La plus brave d\'entre nous. Elle m\'a dit, juste avant de mourir : "Ne laisse pas ça être pour rien, capitaine." Et j\'ai failli à cette promesse.',
        emotion: 'confession finale',
        gmCoaching: 'Kael tient l\'épée brisée comme une relique. C\'est le moment de bascule — sa décision dépend des PJ.'
      }
    ],
    playerResponses: [
      {
        id: 'kael-red-lever',
        label: 'Tendre la main. "Relevez-vous, Capitaine. Une dernière fois."',
        consequence: 'Kael prend la main. Se lève. L\'ancien héros est de retour — abîmé, mais debout. Allié puissant.'
      },
      {
        id: 'kael-red-epee',
        label: 'Offrir de faire reforger l\'épée de Lira par Grimjaw.',
        consequence: 'Les yeux de Kael s\'écarquillent. "Reforger... oui. Comme moi. Brisé, mais reforgé." Il se lève.',
        nextDialogueId: 'grimjaw-craft'
      },
      {
        id: 'kael-red-forcer',
        label: '"Lira serait furieuse de vous voir comme ça. Et vous le savez."',
        consequence: 'Kael tressaille. "...Elle me botterait le cul. Vous avez raison." Il se lève avec un rire amer.'
      }
    ]
  },
  {
    id: 'kael-derniere-volonte',
    npcId: 'kael-dechu',
    npcName: 'Kael le Déchu',
    trigger: 'Kael avant la bataille',
    tone: 'serein, résolu',
    unlockCondition: 'Kael rédimé',
    gmSceneNote: 'Kael a trouvé la paix — pas dans l\'oubli mais dans l\'action. Il sait qu\'il pourrait mourir et cette fois, il l\'accepte.',
    lines: [
      {
        speaker: 'Kael',
        text: 'Si je tombe demain... enterrez-moi avec l\'épée de Lira. Et dites aux gens... ne dites pas que j\'étais un héros. Dites que j\'ai essayé.',
        emotion: 'paix intérieure',
        gmCoaching: 'Kael est calme. Vraiment calme. Pour la première fois depuis des années, les tremblements ont cessé.'
      }
    ],
    playerResponses: [
      {
        id: 'kael-dern-promesse',
        label: '"Je le promets. Mais vous survivrez pour le dire vous-même."',
        consequence: 'Kael sourit. Un vrai sourire. "On verra."'
      },
      {
        id: 'kael-dern-honneur',
        label: '"Quoi qu\'il arrive demain, Capitaine Kael — vous avez déjà honoré Lira."',
        consequence: 'Kael baisse la tête un instant. Quand il la relève, ses yeux sont clairs. "Merci. Pour tout."'
      }
    ]
  },
];

// ============================================================================
// 11. FORGERON GRIMJAW — Maître artisan nain (4 dialogues)
// ============================================================================

const GRIMJAW_DIALOGUES: DialogueTree[] = [
  {
    id: 'grimjaw-craft',
    npcId: 'grimjaw',
    npcName: 'Forgeron Grimjaw',
    trigger: 'Demande de forger une arme légendaire',
    tone: 'bourru, passionné',
    gmSceneNote: 'Grimjaw est un artiste qui s\'exprime par le métal. Sa forge est son temple. Chaque arme est un chef-d\'oeuvre.',
    lines: [
      {
        speaker: 'Grimjaw',
        text: 'Une arme légendaire, hein ? Pas un couteau de cuisine, pas un presse-papier fancy — une VRAIE arme. Celle qui chante quand elle frappe et pleure quand elle tue.',
        emotion: 'fierté artisanale',
        gmCoaching: 'Grimjaw crache dans ses paumes et frotte ses mains devant sa forge. Ses yeux brillent d\'excitation professionnelle.'
      },
      {
        speaker: 'Grimjaw',
        text: 'Apportez-moi du mithral — le vrai, pas la camelote de surface — du coeur de dragon cristallisé, et trois jours. Pas un de plus, pas un de moins. Et NE ME DÉRANGEZ PAS pendant que je travaille.',
        emotion: 'exigence artisanale',
        gmCoaching: 'Grimjaw est inflexible sur ses matériaux et son processus. C\'est un perfectionniste absolu.'
      }
    ],
    playerResponses: [
      {
        id: 'grimjaw-craft-mithral',
        label: '"Où trouver du mithral authentique ?"',
        consequence: 'Grimjaw : "La Veine Profonde, niveau sept de Karak-Zhul. Mais attention — les vers de roche y nichent."'
      },
      {
        id: 'grimjaw-craft-confiance',
        label: '"Je vous fais confiance, Maître Grimjaw. Forgez ce que vous jugez le mieux."',
        consequence: 'Grimjaw : "HA ! Enfin quelqu\'un qui comprend ! Laissez faire l\'artiste ! Je vous ferai un chef-d\'oeuvre."'
      },
      {
        id: 'grimjaw-craft-specifique',
        label: 'Décrire exactement l\'arme souhaitée.',
        consequence: 'Grimjaw écoute, grogne, critique, et finalement : "Pas mal. Je peux améliorer votre idée de soixante pour cent."'
      }
    ]
  },
  {
    id: 'grimjaw-fierte',
    npcId: 'grimjaw',
    npcName: 'Forgeron Grimjaw',
    trigger: 'Grimjaw parle de son art',
    tone: 'passionné, philosophique',
    unlockCondition: 'Arme en cours de forge',
    gmSceneNote: 'Grimjaw devant sa forge, c\'est un philosophe du métal. Sa passion est contagieuse.',
    lines: [
      {
        speaker: 'Grimjaw',
        text: 'Les gens croient que forger, c\'est frapper du métal. NON. Forger, c\'est écouter. Le métal vous DIT ce qu\'il veut devenir. Le mithral chante — littéralement. Et un bon forgeron écoute la chanson.',
        emotion: 'passion pure',
        gmCoaching: 'Grimjaw parle en travaillant. Le rythme de ses marteaux ponctue ses phrases. C\'est une symphonie.'
      }
    ],
    playerResponses: [
      {
        id: 'grimjaw-fiert-ecouter',
        label: 'Écouter en silence, fasciné par le travail du maître.',
        consequence: 'Grimjaw apprécie le silence respectueux. Il fredonne un chant nain ancien.'
      },
      {
        id: 'grimjaw-fiert-question',
        label: '"Combien d\'armes avez-vous forgées dans votre vie ?"',
        consequence: 'Grimjaw : "Six cent quarante-trois. Mais seulement trois que je considère parfaites. Celle-ci sera la quatrième."'
      }
    ]
  },
  {
    id: 'grimjaw-mithral',
    npcId: 'grimjaw',
    npcName: 'Forgeron Grimjaw',
    trigger: 'Grimjaw raconte l\'histoire du mithral',
    tone: 'conteur, vénérable',
    unlockCondition: 'Discussion sur les matériaux',
    gmSceneNote: 'Le mithral est sacré pour les nains. Grimjaw en parle comme d\'un être vivant.',
    lines: [
      {
        speaker: 'Grimjaw',
        text: 'Le mithral n\'est pas un métal ordinaire. C\'est les larmes de la montagne. Quand le monde a été créé, les montagnes ont pleuré de joie, et leurs larmes sont devenues le mithral. Croyez ce que vous voulez — mais le mithral brille quand on en prend soin. Ça, c\'est un fait.',
        emotion: 'révérence',
        gmCoaching: 'Grimjaw tient un lingot de mithral avec la délicatesse d\'un père tenant un nouveau-né. Le métal brille d\'une lumière propre.'
      }
    ],
    playerResponses: [
      {
        id: 'grimjaw-mith-beau',
        label: '"C\'est magnifique."',
        consequence: 'Grimjaw : "Magnifique ? C\'est DIVIN. Vingt ans que je travaille ce matériau et il me surprend encore."'
      },
      {
        id: 'grimjaw-mith-legendaire',
        label: '"Les armes en mithral les plus célèbres ?"',
        consequence: 'Grimjaw : "Brise-Ombre, l\'épée du Premier Roi. Dent-de-Foudre, le marteau de Durinn. Et bientôt... la vôtre."'
      }
    ]
  },
  {
    id: 'grimjaw-cadeau',
    npcId: 'grimjaw',
    npcName: 'Forgeron Grimjaw',
    trigger: 'Grimjaw présente l\'arme terminée',
    tone: 'solennel, fier',
    unlockCondition: 'Matériaux fournis et temps écoulé',
    gmSceneNote: 'L\'arme est révélée. Grimjaw est fier comme jamais. C\'est son chef-d\'oeuvre. Décrivez l\'arme avec un luxe de détails.',
    lines: [
      {
        speaker: 'Grimjaw',
        text: 'C\'est fait. Trois jours sans dormir, sans manger, sans rien d\'autre que le feu et le chant du mithral. Regardez.',
        emotion: 'fierté absolue',
        gmCoaching: 'Il retire un tissu et l\'arme brille. BRILLE. Comme si une étoile avait été piégée dans le métal. L\'air vibre autour d\'elle.'
      },
      {
        speaker: 'Grimjaw',
        text: 'Elle n\'a pas encore de nom. C\'est au porteur de la nommer. Quand vous sentirez le moment... elle vous le dira.',
        emotion: 'tradition sacrée',
        gmCoaching: 'Il tend l\'arme à deux mains, comme un prêtre tend un calice. C\'est un moment sacré pour les nains.'
      }
    ],
    playerResponses: [
      {
        id: 'grimjaw-cad-nom',
        label: 'Nommer l\'arme sur-le-champ avec un nom significatif.',
        consequence: 'Grimjaw : "Bon nom. L\'acier approuve — je le sens vibrer. Elle est à vous."'
      },
      {
        id: 'grimjaw-cad-attendre',
        label: '"Je la nommerai après la victoire."',
        consequence: 'Grimjaw : "Sage. Un nom donné dans la victoire porte chance. Allez, et forgez votre légende comme j\'ai forgé cette lame."'
      },
      {
        id: 'grimjaw-cad-merci',
        label: '"Maître Grimjaw... c\'est la plus belle arme que j\'aie jamais vue."',
        consequence: 'Grimjaw rougit sous sa barbe. "Bah. C\'est juste du métal. ...Mais oui. C\'est plutôt réussi, hein ?"'
      }
    ]
  },
];

// ============================================================================
// 12. ÉCLAIREUSE SELYNE — Rôdeuse de l'avant-garde (4 dialogues)
// ============================================================================

const SELYNE_DIALOGUES: DialogueTree[] = [
  {
    id: 'selyne-rapport',
    npcId: 'selyne',
    npcName: 'Éclaireuse Selyne',
    trigger: 'Selyne revient de reconnaissance',
    tone: 'essoufflée, efficace',
    gmSceneNote: 'Selyne arrive en courant, arc en main, des feuilles dans les cheveux. Elle parle vite et précis — chaque seconde compte.',
    lines: [
      {
        speaker: 'Selyne',
        text: 'Trois colonnes. Nord-est, est, sud-est. Morts-vivants en formation serrée. Six heures de marche, peut-être moins. Et il y a... quelque chose derrière eux. Dans le brouillard. Quelque chose de GROS.',
        emotion: 'urgence',
        gmCoaching: 'Selyne est professionnelle mais on sent la peur dans ses yeux. Ce qu\'elle a vu dans le brouillard l\'a secouée.'
      }
    ],
    playerResponses: [
      {
        id: 'selyne-rapp-gros',
        label: '"Quelque chose de gros ? Décrivez."',
        consequence: 'Selyne frissonne. "Comme une ombre vivante. Plus haute que les arbres. Je n\'ai pas attendu d\'en voir plus."'
      },
      {
        id: 'selyne-rapp-chemin',
        label: '"Un chemin pour contourner les colonnes ?"',
        consequence: 'Selyne déploie une carte. "Le Ravin des Ombres. Risqué mais faisable si on passe de nuit."'
      },
      {
        id: 'selyne-rapp-merci',
        label: '"Bon travail, Selyne. Reposez-vous."',
        consequence: 'Selyne : "Me reposer ? Avec ça dehors ? Je repars dans une heure."'
      }
    ]
  },
  {
    id: 'selyne-danger',
    npcId: 'selyne',
    npcName: 'Éclaireuse Selyne',
    trigger: 'Danger imminent repéré par Selyne',
    tone: 'tendu, chuchoté',
    unlockCondition: 'En mission de reconnaissance',
    gmSceneNote: 'Selyne et les PJ sont accroupis derrière un rocher. L\'ennemi est tout proche. Chaque bruit pourrait les trahir.',
    lines: [
      {
        speaker: 'Selyne',
        text: 'Chut. Ne bougez pas. Patrouille de revenants, vingt mètres devant. Ils ont des traqueurs — des goules pisseuses. Si le vent tourne, ils nous sentent.',
        emotion: 'tension maximale',
        gmCoaching: 'Murmure à peine audible. Selyne a une main sur son arc et l\'autre qui fait signe de se baisser. Ses yeux ne quittent pas l\'ennemi.'
      }
    ],
    playerResponses: [
      {
        id: 'selyne-danger-attendre',
        label: 'Attendre en silence que la patrouille passe.',
        consequence: 'Jet de Discrétion DD 13. Succès : la patrouille passe sans les voir.',
        skillCheck: { skill: 'Discrétion', dc: 13 }
      },
      {
        id: 'selyne-danger-embuscade',
        label: 'Préparer une embuscade rapide.',
        consequence: 'Selyne : "Trois flèches, trois cibles. À mon signal." Jet d\'attaque avec avantage.'
      },
      {
        id: 'selyne-danger-contourner',
        label: 'Contourner la patrouille par un autre chemin.',
        consequence: 'Selyne guide le groupe par un passage étroit. Jet de Survie DD 12.',
        skillCheck: { skill: 'Survie', dc: 12 }
      }
    ]
  },
  {
    id: 'selyne-courage',
    npcId: 'selyne',
    npcName: 'Éclaireuse Selyne',
    trigger: 'Moment de bravoure de Selyne',
    tone: 'courageux, vulnérable',
    unlockCondition: 'Danger majeur affronté ensemble',
    gmSceneNote: 'Selyne montre le courage et la fragilité d\'une jeune femme qui fait un métier dangereux par choix.',
    lines: [
      {
        speaker: 'Selyne',
        text: 'Les gens pensent que les éclaireurs sont des lâches parce qu\'on court vite. Mais essayez de courir VERS le danger pour le repérer avant qu\'il ne frappe les vôtres. Ça demande un autre genre de courage.',
        emotion: 'fierté discrète',
        gmCoaching: 'Selyne nettoie ses flèches. Elle parle sans regarder les PJ — c\'est plus facile pour elle de se confier sans contact visuel.'
      }
    ],
    playerResponses: [
      {
        id: 'selyne-courage-reconnaitre',
        label: '"Vous êtes la plus courageuse personne que je connaisse, Selyne."',
        consequence: 'Selyne rougit. "...C\'est le truc le plus gentil qu\'on m\'ait dit depuis que mon chien est mort."'
      },
      {
        id: 'selyne-courage-equipe',
        label: '"On est une équipe. Plus besoin de courir seule."',
        consequence: 'Selyne sourit. "Une équipe... Ça fait bizarre. Mais bien bizarre."'
      }
    ]
  },
  {
    id: 'selyne-romance',
    npcId: 'selyne',
    npcName: 'Éclaireuse Selyne',
    trigger: 'Moment intime optionnel avec un PJ',
    tone: 'tendre, maladroit',
    unlockCondition: 'Plusieurs interactions positives et intérêt du joueur',
    gmSceneNote: 'OPTIONNEL. Seulement si un joueur a montré un intérêt romantique. Selyne est maladroite en amour — elle sait traquer un ours mais pas naviguer une conversation intime.',
    lines: [
      {
        speaker: 'Selyne',
        text: 'Je... voulais vous dire. Si on meurt tous demain — ce qui est possible — je voulais que vous sachiez que... que ces derniers jours avec vous... enfin, cette équipe... enfin, surtout VOUS... Ugh, les mots c\'est vraiment pas mon truc.',
        emotion: 'maladresse romantique',
        gmCoaching: 'Selyne, d\'habitude si précise, bafouille comme une adolescente. Elle rougit, regarde ses pieds, ses mains ne savent pas quoi faire. C\'est adorable et humain.'
      },
      {
        speaker: 'Selyne',
        text: 'Ce que j\'essaie de dire c\'est que... dans la forêt, quand vous m\'avez sauvée de cette goule, j\'ai compris que... bon sang, pourquoi c\'est plus dur que d\'affronter un dragon ?!',
        emotion: 'frustration tendre',
        gmCoaching: 'Elle rit d\'elle-même. Le rire brise la tension. Si le PJ ne fait rien, elle partira en courant (littéralement). Si le PJ répond, c\'est un moment doux au milieu de la guerre.'
      }
    ],
    playerResponses: [
      {
        id: 'selyne-rom-reciproque',
        label: 'L\'embrasser.',
        consequence: 'Selyne : "...Oh. C\'est... c\'est beaucoup mieux que les mots." Romance confirmée.'
      },
      {
        id: 'selyne-rom-doux',
        label: '"Moi aussi, Selyne. Quand tout sera fini, je t\'emmènerai voir la mer."',
        consequence: 'Selyne : "La mer ? Je n\'ai jamais vu la mer. ...C\'est une promesse ?"'
      },
      {
        id: 'selyne-rom-amis',
        label: '"Tu comptes énormément pour moi, Selyne. Comme une alliée. Une amie."',
        consequence: 'Selyne hoche la tête, le sourire un peu figé. "Amie. Oui. C\'est... c\'est bien aussi." (Elle a le coeur serré mais elle comprend.)'
      }
    ]
  },
];

// ============================================================================
// 13. MARCHAND AMBULANT PROSPERO — Retour du courtier (4 dialogues)
// ============================================================================

const PROSPERO_DIALOGUES: DialogueTree[] = [
  {
    id: 'prospero-retrouvailles',
    npcId: 'prospero',
    npcName: 'Marchand Prospero',
    trigger: 'Rencontre inattendue avec Prospero',
    tone: 'jovial, exubérant',
    gmSceneNote: 'Prospero apparaît dans l\'endroit le plus improbable possible — au milieu d\'un champ de bataille, dans des ruines, dans un donjon. Sa charrette est inexplicablement intacte.',
    lines: [
      {
        speaker: 'Prospero',
        text: 'MES AMIS ! Mes chers, mes précieux, mes RENTABLES amis ! Prospero ne vous a pas oubliés ! Prospero n\'oublie JAMAIS un bon client ! Ni un mauvais payeur, d\'ailleurs !',
        emotion: 'joie commerciale',
        gmCoaching: 'Prospero surgit de nulle part avec sa charrette brinquebalante, bras ouverts, sourire immense. Comment est-il arrivé là ? Personne ne sait. Même lui, probablement.'
      },
      {
        speaker: 'Prospero',
        text: 'Ah, vous vous demandez comment Prospero est arrivé ici, dans ce... charmant paysage désolé ? Le commerce, mes amis ! Le commerce trouve TOUJOURS un chemin !',
        emotion: 'mystère joyeux',
        gmCoaching: 'Il fait un geste vague de la main comme si la question était absurde. Le mystère de Prospero fait partie de son charme.'
      }
    ],
    playerResponses: [
      {
        id: 'prospero-retro-commerce',
        label: '"Prospero ! Qu\'avez-vous à vendre cette fois ?"',
        consequence: 'Prospero s\'illumine. "OH ! Vous n\'allez pas en croire vos yeux ! Des MERVEILLES !"',
        nextDialogueId: 'prospero-prix'
      },
      {
        id: 'prospero-retro-comment',
        label: '"Comment diable êtes-vous arrivé ici vivant ?!"',
        consequence: 'Prospero : "La chance ? Le talent ? Une mule très, très têtue ? Probablement les trois."'
      },
      {
        id: 'prospero-retro-info',
        label: '"Prospero, en voyageant, avez-vous vu des choses utiles ?"',
        consequence: 'Les yeux de Prospero brillent. "Des choses ? OH OUI. Mais l\'information a un prix, mes amis..."',
        nextDialogueId: 'prospero-info'
      }
    ]
  },
  {
    id: 'prospero-prix',
    npcId: 'prospero',
    npcName: 'Marchand Prospero',
    trigger: 'Marchandage avec Prospero',
    tone: 'comique, excessif',
    unlockCondition: 'Retrouvailles avec Prospero',
    gmSceneNote: 'Les prix de Prospero sont ABSURDES. C\'est un running gag. Mais ses objets sont toujours exactement ce dont les PJ ont besoin.',
    lines: [
      {
        speaker: 'Prospero',
        text: 'Potions de soin ? Cinq pièces d\'or. Potions de soin SUPÉRIEURES ? Vingt. Cette épée enchantée très spéciale qui brille dans le noir et fait des sons rigolos ? Trois cent cinquante. Ferme.',
        emotion: 'arnaque joyeuse',
        gmCoaching: 'Prospero annonce les prix avec le sourire d\'un homme qui sait qu\'il arnaque et qui s\'en fiche royalement.'
      },
      {
        speaker: 'Prospero',
        text: 'C\'est la FIN DU MONDE, mes amis ! L\'offre et la demande ! Quand la demande est "survivre" et l\'offre est "Prospero", les prix reflètent... la situation unique du marché !',
        emotion: 'justification comique',
        gmCoaching: 'Il gonfle le torse, absolument pas gêné. Prospero est un filou, mais un filou attachant.'
      }
    ],
    playerResponses: [
      {
        id: 'prospero-prix-negocier',
        label: 'Marchander férocement.',
        consequence: 'Jet de Persuasion DD 12. Succès : prix réduit de 30%. Prospero gémit théâtralement.',
        skillCheck: { skill: 'Persuasion', dc: 12 }
      },
      {
        id: 'prospero-prix-payer',
        label: 'Payer sans discuter — pas le temps.',
        consequence: 'Prospero : "Un client QUI PAIE ! C\'est Noël ! C\'est mon anniversaire ! C\'est..." Il s\'arrête, suspicieux. "Trop facile."'
      },
      {
        id: 'prospero-prix-menace',
        label: '"Prospero. Fin du monde, rappelez-vous. Prix normal ou on se sert."',
        consequence: 'Prospero : "Ha ha ha... vous plaisantez, non ? ...Non ? ...D\'accord, prix coûtant. Prospero est RUINÉ mais Prospero aime être vivant."'
      }
    ]
  },
  {
    id: 'prospero-info',
    npcId: 'prospero',
    npcName: 'Marchand Prospero',
    trigger: 'Prospero laisse échapper une information cruciale',
    tone: 'bavard, accidentellement utile',
    unlockCondition: 'Interaction prolongée avec Prospero',
    gmSceneNote: 'La vraie valeur de Prospero n\'est pas sa marchandise — ce sont les informations qu\'il laisse échapper dans son bavardage incessant.',
    lines: [
      {
        speaker: 'Prospero',
        text: 'D\'ailleurs, en passant par le Col des Lamentations — oui, j\'y étais, la mule a insisté — j\'ai vu un camp de morts-vivants ABANDONNÉ. Curieux, non ? Comme si quelqu\'un avait rappelé toutes les troupes vers le centre. Vers cette espèce de grande tour noire qui fait mal aux yeux quand on la regarde. Probablement rien d\'important. BREF, cette potion...',
        emotion: 'bavardage crucial',
        gmCoaching: 'Prospero lâche l\'information LA PLUS IMPORTANTE de l\'acte au milieu d\'un monologue sur les potions. Si les PJ ne l\'attrapent pas au vol, tant pis.'
      }
    ],
    playerResponses: [
      {
        id: 'prospero-info-stop',
        label: '"STOP. Prospero. La tour noire. Dites-nous TOUT."',
        consequence: 'Prospero cligne des yeux. "La tour ? Oh, ça ? Oui, deux kilomètres au nord du camp. Gardée par... Prospero a compté... beaucoup de choses mortes."'
      },
      {
        id: 'prospero-info-carte',
        label: '"Pouvez-vous marquer l\'emplacement sur une carte ?"',
        consequence: 'Prospero dessine une carte... absolument terrible. Mais l\'emplacement est correct.'
      },
      {
        id: 'prospero-info-rater',
        label: 'Ne pas relever et continuer le marchandage.',
        consequence: 'Information manquée ! Les PJ devront la trouver autrement. Prospero continue son bavardage.'
      }
    ]
  },
  {
    id: 'prospero-adieu',
    npcId: 'prospero',
    npcName: 'Marchand Prospero',
    trigger: 'Séparation avec Prospero',
    tone: 'touchant sous le comique',
    unlockCondition: 'Fin du commerce',
    gmSceneNote: 'Sous le personnage exubérant, Prospero est un survivant solitaire qui s\'est attaché aux PJ. Son adieu est drôle et émouvant.',
    lines: [
      {
        speaker: 'Prospero',
        text: 'Bien, bien ! Le commerce est fait, les bourses sont plus légères — les vôtres, pas la mienne — et les routes nous appellent ! Prospero a d\'autres clients ! D\'autres... mondes à... Non. Prospero sera honnête pour une fois.',
        emotion: 'sincérité soudaine',
        gmCoaching: 'Le masque tombe une seconde. Prospero regarde les PJ avec quelque chose qui ressemble à de l\'affection.'
      },
      {
        speaker: 'Prospero',
        text: 'Vous êtes les seuls à ne jamais m\'avoir volé. Ou menacé. Enfin, pas sérieusement. Et dans le monde de Prospero, ça fait de vous... des amis. Alors ne mourez pas, d\'accord ? Prospero refuse de vendre des fleurs pour vos tombes. La marge est terrible.',
        emotion: 'affection sous l\'humour',
        gmCoaching: 'Il renifle, se reprend, rajuste son chapeau et redevient le marchand flamboyant. Mais le moment était réel.'
      }
    ],
    playerResponses: [
      {
        id: 'prospero-adieu-ami',
        label: '"Prospero... vous êtes un voleur, un menteur et un arnaqueur. Et un ami."',
        consequence: 'Prospero fait une révérence théâtrale. "Le plus beau compliment que Prospero ait jamais reçu !"'
      },
      {
        id: 'prospero-adieu-cadeau',
        label: 'Lui offrir quelque chose en retour — un souvenir.',
        consequence: 'Prospero est sincèrement touché. "Prospero... gardera ceci près de son coeur. Et de sa bourse. Mais surtout de son coeur."'
      }
    ]
  },
];

// ============================================================================
// EXPORT — ACTE 4
// ============================================================================

export const NPC_DIALOGUES_ACT4: DialogueTree[] = [
  ...THRAIN_DIALOGUES,
  ...VYRAXITHON_DIALOGUES,
  ...VEXOR_DIALOGUES,
  ...NYX_DIALOGUES,
  ...VAELITH_DIALOGUES,
  ...NASSIRA_DIALOGUES,
  ...BRENNA_DIALOGUES,
  ...RASK_DIALOGUES,
  ...ALDRIC_DIALOGUES,
  ...KAEL_DIALOGUES,
  ...GRIMJAW_DIALOGUES,
  ...SELYNE_DIALOGUES,
  ...PROSPERO_DIALOGUES,
];
