/**
 * GUIDE NARRATIF — Données scène par scène
 * Arc Principal : Les Sceaux Brisés (15 chapitres, ~70 scènes)
 */

// ============================================================================
// TYPES
// ============================================================================

export interface NarrativeDialogue {
  npcId: string;
  npcName: string;
  lines: { trigger: string; text: string; tone: string }[];
}

export interface NarrativeTransition {
  condition: string;
  nextScene: string;
  label: string;
  alternative?: string;
}

export interface NarrativeSkillCheck {
  skill: string;
  dc: number;
  success: string;
  failure: string;
}

export interface NarrativeScene {
  id: string;
  chapterId: string;
  sceneNumber: number;
  title: string;
  type: 'narration' | 'combat' | 'exploration' | 'dialogue' | 'choice' | 'transition';
  readAloud: string;
  gmNotes: string;
  dialogues: NarrativeDialogue[];
  objectives: { description: string; type: string; optional: boolean }[];
  transitions: NarrativeTransition[];
  skillChecks?: NarrativeSkillCheck[];
  encounters?: string[];
  loot?: string[];
  estimatedMinutes: number;
  mood: string;
  music?: string;
  location: string;
}

export interface NarrativeChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  suggestedLevel: number;
  region: string;
  themes: string[];
  scenes: NarrativeScene[];
  previousChapter?: string;
  nextChapter?: string;
}

// ============================================================================
// CHAPITRE 1 : SIGNES PRÉCURSEURS (Niveau 1-3)
// ============================================================================

const CH1_SCENES: NarrativeScene[] = [
  {
    id: 'ch1_s1_taverne',
    chapterId: 'ch1',
    sceneNumber: 1,
    title: 'Le Dragon Rouillé',
    type: 'narration',
    readAloud: `La porte de la taverne grince en s'ouvrant sur une salle enfumée baignée d'une lumière ambrée. L'odeur du ragoût de sanglier se mêle à celle de la bière d'orge. Des marins au teint buriné jouent aux dés dans un coin tandis qu'un chat roux dort sur le comptoir. Le tavernier, un colosse moustachu nommé Brok, essuie un verre en sifflotant.

Au fond de la salle, près de la cheminée, un vieil homme aux yeux laiteux fixe sa chope vide. C'est le Vieux Sam — tout le monde le connaît ici. Ce soir, il a l'air plus agité que d'habitude.`,
    gmNotes: `Le Vieux Sam a réellement entendu des bruits dans les égouts la nuit dernière. Il n'est pas fou mais ses descriptions sont confuses. Profitez de cette scène pour établir l'ambiance et laisser les joueurs explorer la taverne librement. Si les joueurs ne vont pas vers Sam d'eux-mêmes, Brok le mentionne : "Sam radote encore sur ses fantômes d'égout, hein."`,
    dialogues: [
      {
        npcId: 'npc_brok',
        npcName: 'Brok le Tavernier',
        lines: [
          { trigger: 'Accueil', text: `Bienvenue au Dragon Rouillé, voyageurs ! On a du ragoût de sanglier frais et de la bière de Hammerdeep. Prenez place où vous voulez !`, tone: 'jovial' },
          { trigger: 'Rumeurs', text: `Des rumeurs ? Hah ! Le vieux Sam là-bas jure qu'il a entendu des grognements dans les égouts. Et la Garde recrute des volontaires — trois incidents cette semaine paraît-il. Du jamais vu.`, tone: 'intrigué' },
          { trigger: 'À propos de Sam', text: `Sam ? C'est un ancien mineur. Il vit ici depuis vingt ans. D'habitude il délire un peu, mais là... il a vraiment l'air secoué. Allez lui parler, ça lui fera du bien.`, tone: 'soucieux' }
        ]
      },
      {
        npcId: 'npc_old_sam',
        npcName: 'Le Vieux Sam',
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
    estimatedMinutes: 15,
    mood: 'mystère',
    music: 'Taverne médiévale — luth, conversations',
    location: 'Sol-Aureus — Le Dragon Rouillé'
  },
  {
    id: 'ch1_s2_recrutement',
    chapterId: 'ch1',
    sceneNumber: 2,
    title: 'L\'Appel de la Garde',
    type: 'dialogue',
    readAloud: `Le lendemain matin, une clameur résonne dans la rue principale de Sol-Aureus. Trois gardes en armure polie, portant le blason du Soleil d'Or, martèlent un avis sur le panneau de la place du marché. Une foule se rassemble.

L'affiche, rédigée à l'encre dorée, proclame : "Par ordre du Général Marcus — La Garde Royale recrute des volontaires courageux pour enquêter sur les perturbations souterraines. Récompense : 500 pièces d'or. Se présenter à la Caserne du Soleil Levant avant midi."

Parmi la foule, vous remarquez que personne ne semble pressé de se porter volontaire. Les gens échangent des regards nerveux.`,
    gmNotes: `Le Général Marcus est un homme pragmatique et direct. Il n'a pas assez d'hommes pour envoyer des gardes dans les égouts — la moitié de la garnison est déployée aux frontières. Il évalue les joueurs rapidement et accepte quiconque semble capable de tenir une arme. Si les joueurs négocient la récompense, il peut monter à 600 PO maximum avec un jet de Persuasion DC 14.`,
    dialogues: [
      {
        npcId: 'npc_general_marcus',
        npcName: 'Général Marcus',
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
      { condition: 'Les joueurs visitent d\'abord l\'Académie Arcane', nextScene: 'ch1_s2b_academie', label: '→ Visite à Théodore (optionnel)' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 14, success: 'Marcus accepte de monter la récompense à 600 PO et ajoute deux potions de soin.', failure: 'Marcus fronce les sourcils : "500 PO, c\'est déjà généreux. À prendre ou à laisser."' }
    ],
    loot: ['2x Torches Enchantées', 'Carte des Égouts de Sol-Aureus'],
    estimatedMinutes: 10,
    mood: 'tension',
    music: 'Militaire — tambours lointains',
    location: 'Sol-Aureus — Caserne du Soleil Levant'
  },
  {
    id: 'ch1_s2b_academie',
    chapterId: 'ch1',
    sceneNumber: 2.5,
    title: 'L\'Académie Arcane (Optionnel)',
    type: 'dialogue',
    readAloud: `L'Académie Arcane de Sol-Aureus est une tour de marbre blanc incrustée de runes bleues qui pulsent doucement. À l'intérieur, l'air sent le parchemin ancien et l'encens. Un gnome à lunettes trop grandes, perché sur un escabeau, trie des livres en marmonnant.

"Démons d'ombre, démons d'ombre... Ah ! Vous voilà ! Marcus m'a prévenu que quelqu'un passerait peut-être. Approchez, j'ai trouvé quelque chose d'intéressant."`,
    gmNotes: `Théodore donne aux joueurs un avantage narratif pour la suite. Ses informations sur les Démons d'Ombre permettent aux joueurs de savoir qu'ils sont vulnérables à la lumière radieuse et que leur présence implique une faille vers le Miroir des Ombres. C'est du lore-building pour l'arc entier.`,
    dialogues: [
      {
        npcId: 'npc_theodore',
        npcName: 'Théodore le Bibliothécaire',
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
    estimatedMinutes: 10,
    mood: 'mystère',
    music: 'Bibliothèque — silence, pages tournées',
    location: 'Sol-Aureus — Académie Arcane'
  },
  {
    id: 'ch1_s3_egouts',
    chapterId: 'ch1',
    sceneNumber: 3,
    title: 'Dans les Ténèbres',
    type: 'combat',
    readAloud: `L'escalier de pierre descend dans une obscurité épaisse. L'air devient lourd, chargé d'humidité et d'une odeur de moisissure mêlée à... autre chose. Quelque chose de métallique. De sulfureux.

Vos torches projettent des ombres dansantes sur les murs couverts de mousse. Le son de l'eau qui goutte résonne dans les tunnels voûtés. Vos pas éclaboussent une eau brunâtre qui vous arrive aux chevilles.

Soudain, vous remarquez quelque chose d'étrange : les ombres projetées par vos torches semblent... se figer. Puis, lentement, commencer à ramper dans la direction OPPOSÉE de la lumière. Et dans le noir, au bout du tunnel, deux points rouges s'allument comme des braises.`,
    gmNotes: `COMBAT : 3 Démons d'Ombre (CR 2 chacun). Utilisez le bestiaire pour les stats. Ils attaquent en meute — un attire l'attention de front, les deux autres flanquent. Si les joueurs utilisent de la lumière radieuse, les démons reculent et perdent leurs actions de réaction. Après le combat, les joueurs trouvent le symbole de Sceau gravé dans la pierre. Un jet d'Investigation DC 15 révèle que le symbole est fissuré de manière non naturelle — c'est du sabotage.`,
    dialogues: [],
    objectives: [
      { description: 'Explorer le réseau d\'égouts jusqu\'au collecteur central', type: 'explore', optional: false },
      { description: 'Vaincre les 3 Démons d\'Ombre', type: 'combat', optional: false },
      { description: 'Examiner le symbole de Sceau fissuré', type: 'investigate', optional: false }
    ],
    transitions: [
      { condition: 'Victoire et symbole examiné', nextScene: 'ch1_s4_rapport', label: '→ Retour faire rapport' }
    ],
    skillChecks: [
      { skill: 'Perception', dc: 12, success: 'Vous remarquez que les ombres bougent anormalement AVANT que les démons n\'attaquent — pas de surprise.', failure: 'Les démons surgissent de l\'obscurité — jet d\'Initiative avec Surprise pour les ennemis.' },
      { skill: 'Investigation', dc: 15, success: 'Le symbole gravé montre des marques de ciseau récentes. Quelqu\'un a VOLONTAIREMENT fissuré ce Sceau. Ce n\'est pas de l\'usure naturelle.', failure: 'Le symbole est étrange mais vous ne pouvez pas en tirer de conclusion.' },
      { skill: 'Arcanes', dc: 13, success: 'Vous ressentez une énergie résiduelle de magie noire autour du Sceau. Un rituel de profanation a été effectué ici récemment.', failure: 'L\'énergie magique est trop diffuse pour être analysée.' }
    ],
    encounters: ['3x Démon d\'Ombre (CR 2)'],
    loot: ['Essence d\'Ombre (composant alchimique)', 'Médaillon cultiste brisé'],
    estimatedMinutes: 25,
    mood: 'horreur',
    music: 'Souterrain — eau qui goutte, échos sinistres',
    location: 'Sol-Aureus — Égouts, Collecteur Central'
  },
  {
    id: 'ch1_s4_rapport',
    chapterId: 'ch1',
    sceneNumber: 4,
    title: 'L\'Ampleur de la Menace',
    type: 'dialogue',
    readAloud: `Vous émergez des égouts, couverts de crasse et de sang noir. La lumière du soleil de Sol-Aureus vous éblouit après ces heures dans les ténèbres. Les passants vous regardent avec un mélange de dégoût et de curiosité.

À la Caserne, le Général Marcus vous attend. Son visage se contracte en voyant le médaillon cultiste et le rapport que vous lui faites. Il se tourne vers son aide de camp : "Envoyez un message à la Reine. Immédiatement."`,
    gmNotes: `Cette scène conclut le chapitre 1 et pose les enjeux pour la suite. Marcus est visiblement inquiet — c'est la première fois que les joueurs le voient montrer de l'émotion. La convocation par la Reine Elara est l'accroche vers le Chapitre 2. Distribuez les récompenses et laissez les joueurs se reposer avant le prochain chapitre.`,
    dialogues: [
      {
        npcId: 'npc_general_marcus',
        npcName: 'Général Marcus',
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
    estimatedMinutes: 10,
    mood: 'transition',
    music: 'Héroïque subtil — cordes, espoir prudent',
    location: 'Sol-Aureus — Caserne du Soleil Levant'
  }
];

export const CHAPTER_1: NarrativeChapter = {
  id: 'ch1',
  number: 1,
  title: 'Signes Précurseurs',
  subtitle: 'L\'ombre dans les égouts',
  summary: 'Des créatures d\'ombre surgissent des égouts de Sol-Aureus. La Garde recrute des aventuriers pour enquêter.',
  suggestedLevel: 1,
  region: 'Sol-Aureus',
  themes: ['Introduction', 'Mystère', 'Premier combat'],
  scenes: CH1_SCENES,
  nextChapter: 'ch2'
};

// ============================================================================
// CHAPITRE 2 : LE PREMIER SCEAU BRISÉ (Niveau 4-6)
// ============================================================================

const CH2_SCENES: NarrativeScene[] = [
  {
    id: 'ch2_s1_audience',
    chapterId: 'ch2',
    sceneNumber: 1,
    title: 'Audience Royale',
    type: 'dialogue',
    readAloud: `Le Palais de Sol-Aureus brille sous le soleil matinal comme un joyau taillé dans l'or pur. Des gardes en armure cérémonielle vous escortent à travers des couloirs de marbre poli, ornés de tapisseries représentant les héros de l'Alliance des Sept.

La Salle du Trône s'ouvre devant vous — immense, baignée de lumière par une verrière en forme de soleil. Au bout d'un tapis pourpre, sur un trône de cristal doré, siège la Reine Elara. Jeune mais au regard acéré, elle porte une couronne simple et une robe bleu nuit constellée d'étoiles brodées. À ses côtés, le Général Marcus, visiblement tendu, et un homme en robe blanche — le Grand Prêtre Alduin.`,
    gmNotes: `C'est la première rencontre avec la Reine Elara. Elle est intelligente, directe, et plus préoccupée qu'elle ne le montre. Elle confie la mission personnellement car elle ne fait pas entièrement confiance à son propre conseil — certains nobles minimisent la menace. Le voyage vers la Forêt de Cendre prend 3 jours — utilisez les tables de rencontres aléatoires.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Accueil', text: `*Sa voix est claire et posée.* Défenseurs des Égouts. Le Général Marcus m'a raconté votre bravoure. Ce que vous avez affronté dans les profondeurs de ma ville n'est pas un incident isolé. Approchez.`, tone: 'royale' },
          { trigger: 'La mission', text: `Nos érudits pensent que les créatures que vous avez combattues viennent d'une faille — une brèche dans un des anciens Sceaux. Le premier site se trouve dans la Forêt de Cendre, à trois jours d'ici. *Elle déroule une carte.* J'ai besoin que vous vous y rendiez et que vous découvriez ce qui s'y passe. Si un Sceau est brisé... *Elle hésite.* Nous devons savoir.`, tone: 'grave' },
          { trigger: 'Pourquoi eux', text: `*Un sourire triste.* Parce que mes gardes sont à la frontière, mes chevaliers sont trop... politiques, et vous, vous avez déjà prouvé que vous n'avez pas peur de l'ombre. Le Général Marcus sera votre contact. Tout ce dont vous avez besoin — provisions, équipement, montures — sera fourni.`, tone: 'sincère' }
        ]
      },
      {
        npcId: 'npc_high_priest_alduin',
        npcName: 'Grand Prêtre Alduin',
        lines: [
          { trigger: 'Les Sceaux', text: `*Le vieil homme s'avance, appuyé sur un bâton.* Les Sceaux ont été posés il y a 120 ans par l'Alliance des Sept, après la Grande Guerre des Cendres. Sept verrous magiques pour maintenir le Miroir des Ombres clos. Si l'un d'eux cède... chaque suivant sera plus facile à briser.`, tone: 'prophétique' },
          { trigger: 'Conseil', text: `Emportez ceci. *Il tend une fiole de liquide argenté.* Eau Bénite de Lunara. Si vous trouvez le Sceau, versez-en sur les fissures. Ça ne le réparera pas, mais ça ralentira la corruption. Et priez Solarius que nous trouvions une solution avant qu'il ne soit trop tard.`, tone: 'solennel' }
        ]
      }
    ],
    objectives: [
      { description: 'Recevoir la mission de la Reine Elara', type: 'talk', optional: false },
      { description: 'Obtenir l\'Eau Bénite de Lunara du Grand Prêtre Alduin', type: 'collect', optional: false }
    ],
    transitions: [
      { condition: 'Mission acceptée', nextScene: 'ch2_s2_voyage', label: '→ Voyage vers la Forêt de Cendre' }
    ],
    loot: ['Eau Bénite de Lunara (fiole)', 'Provisions pour 5 jours', '3 montures'],
    estimatedMinutes: 15,
    mood: 'solennel',
    music: 'Royale — harpe, cuivres doux',
    location: 'Sol-Aureus — Palais Royal'
  },
  {
    id: 'ch2_s2_voyage',
    chapterId: 'ch2',
    sceneNumber: 2,
    title: 'La Route des Cendres',
    type: 'exploration',
    readAloud: `Le chemin qui mène à la Forêt de Cendre traverse d'abord les plaines dorées du Val, paisibles et ensoleillées. Mais au fil des jours, le paysage change. Les champs cultivés cèdent la place à des herbes grises. Les arbres se tordent, noircis comme après un incendie qui aurait brûlé il y a des siècles mais dont le sol n'aurait jamais récupéré.

Le troisième jour, une brume perpétuelle enveloppe le sentier. Les oiseaux se taisent. Vos montures deviennent nerveuses, refusant d'avancer au-delà d'un certain point. Vous devez continuer à pied.

La Forêt de Cendre porte bien son nom : des troncs calcinés s'élèvent comme des doigts squelettiques vers un ciel gris permanent. Le sol craque sous vos pas — c'est de la cendre compactée. Et dans l'air, une odeur de soufre.`,
    gmNotes: `Le voyage de 3 jours peut être joué en résumé ou détaillé avec des rencontres : Jour 1 — Marchands sur la route (RP), Jour 2 — Bandits (4x CR 3, optionnel), Jour 3 — Loups Géants (2x CR 3) à l'orée de la forêt. La Forêt de Cendre est un lieu chargé de magie résiduelle de l'Ère des Cendres — les sorts de divination sont brouillés (-2 aux jets d'Arcanes).`,
    dialogues: [],
    objectives: [
      { description: 'Traverser les plaines vers la Forêt de Cendre (3 jours)', type: 'travel', optional: false },
      { description: 'Gérer les rencontres en route (optionnel)', type: 'combat', optional: true }
    ],
    transitions: [
      { condition: 'Arrivée à la Forêt de Cendre', nextScene: 'ch2_s3_sceau', label: '→ Site du Sceau #1' }
    ],
    skillChecks: [
      { skill: 'Survie', dc: 12, success: 'Vous trouvez un chemin sûr à travers la forêt — pas de rencontre aléatoire.', failure: 'Vous vous perdez pendant 2 heures. Tirez une rencontre aléatoire.' },
      { skill: 'Nature', dc: 14, success: 'Vous reconnaissez les signes de corruption magique : la magie ici est instable. Sorts de divination brouillés.', failure: 'La forêt vous semble juste... morte. Rien d\'anormal.' }
    ],
    encounters: ['4x Bandits (CR 3)', '2x Loups Géants (CR 3)'],
    estimatedMinutes: 15,
    mood: 'désolation',
    music: 'Voyage — vent, pas sur la cendre',
    location: 'Route vers Forêt de Cendre'
  },
  {
    id: 'ch2_s3_sceau',
    chapterId: 'ch2',
    sceneNumber: 3,
    title: 'Le Sceau Brisé',
    type: 'combat',
    readAloud: `Au cœur de la forêt, une clairière s'ouvre comme une blessure dans la terre. Le sol est vitrifié — fondu et resolidifié en un cercle parfait de trente mètres. Au centre, un pilier de pierre noire de trois mètres de haut, couvert de runes qui pulsaient autrefois de lumière dorée.

Les runes sont éteintes. Le pilier est fissuré de haut en bas, et de ses fissures s'écoule une substance noire, visqueuse, qui rampe sur le sol comme si elle était vivante. L'air autour tremble et ondule — vous pouvez VOIR la réalité se distordre, comme un reflet dans de l'eau agitée.

Et là, devant le pilier, trois silhouettes. Deux masses d'ombre griffue — des Démons que vous reconnaissez. Et entre eux, une femme d'une beauté surnaturelle, aux yeux entièrement noirs, qui trace des runes de sang dans l'air. Elle se retourne vers vous avec un sourire cruel.

"Ah. Les petits héros de la Reine. Trop tard."`,
    gmNotes: `COMBAT MAJEUR : 2x Démons d'Ombre (CR 3) + 1 Succube (CR 4). La Succube tente d'abord le Charme (DC 15 Sagesse) sur le personnage le plus charismatique. Si le charme échoue, elle se bat. Elle peut fuir (se téléporter) si elle tombe en dessous de 20 HP — elle n'est pas suicidaire. Les Démons se battent jusqu'à la mort. Après le combat, l'investigation du site est cruciale : le journal cultiste mentionne "Malachi" et un "Temple du Miroir".`,
    dialogues: [
      {
        npcId: 'npc_succubus',
        npcName: 'Velithara (Succube)',
        lines: [
          { trigger: 'Avant combat', text: `*Elle rit, un son comme du cristal brisé.* Le Sceau est tombé. Le Maître sera ravi. Et vous... *ses yeux se plissent.* Vous sentez la peur et l'acier. Délicieux. Venez, laissez-moi goûter votre courage.`, tone: 'séducteur-menaçant' },
          { trigger: 'Charme', text: `*Elle fixe l'un de vous intensément.* Pourquoi te battre ? Tu es fatigué du voyage. Pose ton arme. Je peux te montrer des choses... des secrets que la Reine ne connaîtra jamais. *JDS Sagesse DC 15*`, tone: 'hypnotique' },
          { trigger: 'Si elle fuit', text: `*Un éclat de fureur traverse son visage.* Ce n'est pas fini ! Le Grand Prêtre Malachi a déjà brisé un autre Sceau. Vous ne pouvez pas tous les sauver ! *Elle disparaît dans un nuage de fumée noire.*`, tone: 'furieux' }
        ]
      }
    ],
    objectives: [
      { description: 'Vaincre les 2 Démons d\'Ombre et la Succube Velithara', type: 'combat', optional: false },
      { description: 'Examiner le Sceau brisé', type: 'investigate', optional: false },
      { description: 'Trouver le journal cultiste', type: 'collect', optional: false },
      { description: 'Appliquer l\'Eau Bénite de Lunara sur le Sceau (optionnel)', type: 'special', optional: true }
    ],
    transitions: [
      { condition: 'Combat terminé, preuves recueillies', nextScene: 'ch2_s4_retour', label: '→ Retour à Sol-Aureus' }
    ],
    skillChecks: [
      { skill: 'Sagesse (JDS)', dc: 15, success: 'Vous résistez au Charme de Velithara et voyez à travers son illusion — elle n\'est qu\'un démon.', failure: 'Vous êtes Charmé pendant 1 minute. Vous percevez Velithara comme une alliée de confiance.' },
      { skill: 'Investigation', dc: 15, success: 'Le Sceau montre des marques de rituels récents. Des symboles cultistes sont gravés dans la pierre — sabotage délibéré. Vous trouvez un journal en cuir noir dans les cendres.', failure: 'Le Sceau est clairement brisé mais vous ne pouvez pas dire comment.' },
      { skill: 'Religion', dc: 14, success: 'L\'Eau Bénite de Lunara stabilise temporairement les fissures. La corruption ralentit — vous avez gagné du temps.', failure: 'Vous versez l\'eau mais elle s\'évapore au contact de la corruption. Aucun effet visible.' }
    ],
    encounters: ['2x Démon d\'Ombre (CR 3)', '1x Succube Velithara (CR 4)'],
    loot: ['Journal Cultiste (mentionne Malachi et le Temple du Miroir)', 'Fragment de Sceau #1 (item de quête)', 'Arme +1 (trouvée près du campement cultiste)'],
    estimatedMinutes: 30,
    mood: 'horreur-épique',
    music: 'Combat — percussions lourdes, chœurs sinistres',
    location: 'Forêt de Cendre — Site du Sceau #1'
  },
  {
    id: 'ch2_s4_retour',
    chapterId: 'ch2',
    sceneNumber: 4,
    title: 'Le Journal de Malachi',
    type: 'transition',
    readAloud: `Le voyage retour vers Sol-Aureus pèse lourd. Le journal cultiste que vous avez trouvé ne veut pas quitter vos pensées. Écrit d'une main ferme et érudite, il raconte froidement la procédure pour "libérer" un Sceau — comme un manuel technique de destruction.

Le nom revient sans cesse : Grand Prêtre Malachi. Un homme qui parle du Seigneur des Ombres avec une vénération terrifiante.

Une phrase vous glace : "Quand les sept sceaux tomberont, le Miroir s'ouvrira enfin. Et le Maître marchera parmi les vivants. Ce monde putride sera purifié par les ténèbres."

À Sol-Aureus, le Général Marcus lit le journal en silence. Quand il lève les yeux, son visage est de marbre. "Il y a sept Sceaux. Nous en avons perdu un. Il nous en reste six à protéger. Et nous ne savons pas où ils sont tous."`,
    gmNotes: `FIN DU CHAPITRE 2. Distribuez les récompenses. Le journal est un objet de quête majeur — il contient des indices pour les chapitres 3-5. La phrase d'accroche vers le Chapitre 3 : le journal mentionne un "contact au sein de la noblesse de Sol-Aureus" qui aide le culte. C'est Dame Celeste, mais les joueurs ne le savent pas encore.`,
    dialogues: [
      {
        npcId: 'npc_general_marcus',
        npcName: 'Général Marcus',
        lines: [
          { trigger: 'Le journal', text: `*Après une longue lecture.* Ce Malachi... n'est pas un fanatique ordinaire. Il est méthodique. Calculateur. Et il a des contacts dans la ville. Le journal mentionne "notre allié parmi les roses dorées" — c'est un surnom de la haute noblesse. Il y a un traître parmi nous.`, tone: 'furieux' },
          { trigger: 'Plan d\'action', text: `Deux priorités. Premièrement : identifier le traître. Deuxièmement : trouver les six autres Sceaux avant que Malachi ne les brise. Je vais demander à Lysandra Voile-de-Nuit — notre meilleure espionne — de mener l'enquête en interne. Vous, préparez-vous. Cette guerre ne fait que commencer.`, tone: 'déterminé' }
        ]
      }
    ],
    objectives: [
      { description: 'Rapporter le journal cultiste et le Fragment de Sceau', type: 'talk', optional: false },
      { description: 'Recevoir les récompenses du Chapitre 2', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 2', nextScene: 'ch3_s1_lysandra', label: '→ Chapitre 3 : Enquête à Sol-Aureus' }
    ],
    loot: ['1500 PO', 'Arme +1 (une par joueur)', '+20 Réputation Couronne', 'Fragment de Sceau #1 (gardé)'],
    estimatedMinutes: 10,
    mood: 'tension-transition',
    music: 'Sombre — violoncelle, révélation',
    location: 'Sol-Aureus — Caserne'
  }
];

export const CHAPTER_2: NarrativeChapter = {
  id: 'ch2',
  number: 2,
  title: 'Le Premier Sceau Brisé',
  subtitle: 'Voyage vers la Forêt de Cendre',
  summary: 'Enquête sur le site du premier Sceau brisé dans la Forêt de Cendre. Découverte du culte de Malachi.',
  suggestedLevel: 4,
  region: 'Forêt de Cendre',
  themes: ['Exploration', 'Révélation', 'Combat majeur'],
  scenes: CH2_SCENES,
  previousChapter: 'ch1',
  nextChapter: 'ch3'
};

// ============================================================================
// CHAPITRES 3-15 : SCÈNES CONDENSÉES (3 scènes clés par chapitre)
// ============================================================================

// ---------- CHAPITRE 3 : L'OMBRE DANS LA CITÉ (Niveau 5-6) ----------

const CH3_SCENES: NarrativeScene[] = [
  {
    id: 'ch3_s1_lysandra', chapterId: 'ch3', sceneNumber: 1,
    title: 'La Maîtresse Espionne', type: 'dialogue',
    readAloud: `Dans une cave secrète sous la Caserne, une femme aux cheveux argentés vous attend dans la pénombre. Ses yeux violets vous jaugent comme un chat évalue une souris. "Lysandra Voile-de-Nuit. Le Général vous a envoyés. Bien." Elle étale des documents sur la table — des rapports de surveillance, des schémas de mouvement suspects dans la haute noblesse. "Le traître se cache parmi les roses dorées. J'ai réduit la liste à trois suspects : Lord Aldric, la Comtesse Morgaine, et... Dame Celeste."`,
    gmNotes: `Lysandra est une alliée précieuse mais ne fait confiance à personne. Elle donne trois pistes d'enquête — une pour chaque suspect. Les joueurs peuvent les explorer dans n'importe quel ordre. Dame Celeste est la coupable mais les indices doivent être découverts naturellement.`,
    dialogues: [{
      npcId: 'npc_lysandra', npcName: 'Lysandra Voile-de-Nuit',
      lines: [
        { trigger: 'Les suspects', text: `Lord Aldric fréquente des cercles occultes. La Comtesse Morgaine a des dettes impossibles avec des créanciers douteux. Et Dame Celeste... *elle hésite.* Elle a disparu pendant deux semaines le mois dernier. Personne ne sait où. Enquêtez. Discrètement.`, tone: 'calculatrice' },
        { trigger: 'Méthodes', text: `Infiltration, surveillance, conversation. Pas de brutalité. Ce sont des nobles — si vous les accusez sans preuve, c'est NOUS qui finirons en prison. Trouvez le lien avec Malachi et apportez-moi la preuve.`, tone: 'autoritaire' }
      ]
    }],
    objectives: [
      { description: 'Rencontrer Lysandra Voile-de-Nuit', type: 'talk', optional: false },
      { description: 'Choisir un suspect à enquêter en premier', type: 'choice', optional: false }
    ],
    transitions: [
      { condition: 'Enquêter sur Lord Aldric', nextScene: 'ch3_s2_enquete', label: '→ Enquête (3 pistes)' },
      { condition: 'Enquêter sur la Comtesse', nextScene: 'ch3_s2_enquete', label: '→ Enquête (3 pistes)' },
      { condition: 'Enquêter sur Dame Celeste', nextScene: 'ch3_s2_enquete', label: '→ Enquête (3 pistes)' }
    ],
    estimatedMinutes: 10, mood: 'intrigue',
    music: 'Espionnage — cordes tendues, notes basses', location: 'Sol-Aureus — Cave secrète'
  },
  {
    id: 'ch3_s2_enquete', chapterId: 'ch3', sceneNumber: 2,
    title: 'Fils d\'Araignée', type: 'exploration',
    readAloud: `Sol-Aureus cache bien des secrets derrière ses façades dorées. Dans les ruelles sombres, les salons privés et les bibliothèques poussiéreuses, vous tirez les fils d'une conspiration qui s'étend bien plus loin que vous ne le pensiez. Chaque indice mène à un autre, chaque porte ouverte en révèle trois de plus.

Lord Aldric est innocent — ses cercles occultes sont de l'ésotérisme de salon. La Comtesse cache un amant, pas un complot. Mais Dame Celeste... sa résidence regorge de symboles dissimulés, de correspondance chiffrée, et d'un passage secret vers les égouts. Et dans sa chambre, un autel couvert de sang séché et de runes d'ombre.`,
    gmNotes: `Phase d'enquête libre. Donnez aux joueurs 2-3 sessions d'investigation. Indices clés chez Dame Celeste : correspondance avec "M" (Malachi), carte des Sceaux restants, potion d'ombre (preuve matérielle). Un jet de Discrétion DC 14 est requis pour entrer chez elle sans alerter ses gardes. Si les joueurs sont découverts, Dame Celeste fuit vers le Chapitre 4 prématurément.`,
    dialogues: [],
    objectives: [
      { description: 'Enquêter sur les 3 suspects', type: 'investigate', optional: false },
      { description: 'Trouver les preuves contre Dame Celeste', type: 'collect', optional: false },
      { description: 'Découvrir la correspondance avec Malachi', type: 'collect', optional: false }
    ],
    transitions: [
      { condition: 'Preuves rassemblées', nextScene: 'ch3_s3_confrontation', label: '→ Confrontation' }
    ],
    skillChecks: [
      { skill: 'Discrétion', dc: 14, success: 'Vous entrez dans la résidence de Dame Celeste sans alerter personne.', failure: 'Un garde vous repère — Dame Celeste est prévenue. Elle commencera à détruire des preuves.' },
      { skill: 'Investigation', dc: 16, success: 'Vous déchiffrez la correspondance codée — la prochaine cible est le Sceau des Monts Cœur-de-Fer, à Hammerdeep.', failure: 'Le code est trop complexe. Vous devrez le faire analyser par Théodore.' }
    ],
    estimatedMinutes: 25, mood: 'suspense',
    music: 'Mystère — piano, tension croissante', location: 'Sol-Aureus — Quartier Noble'
  },
  {
    id: 'ch3_s3_confrontation', chapterId: 'ch3', sceneNumber: 3,
    title: 'La Traîtresse Démasquée', type: 'combat',
    readAloud: `Le bal masqué au Palais bat son plein quand vous repérez Dame Celeste. Elle porte un masque de papillon noir et une robe pourpre. Au moment où Lysandra donne le signal, des gardes bloquent les sorties.

"Dame Celeste de Morwyn, vous êtes en état d'arrestation pour trahison."

Le masque tombe. Un sourire cruel traverse son visage parfait. "Fools." Sa main s'embrase de flammes noires. "Vous ne comprenez rien. Le Maître est déjà en marche. Trois Sceaux sont tombés pendant que vous fouiniez dans mes tiroirs."

Elle lève les bras — et le sol se fissure. Des Démons d'Ombre jaillissent des failles, semant la panique parmi les invités.`,
    gmNotes: `Combat dans un bal : 4x Démons d'Ombre (CR 3) + Dame Celeste (Warlock niv.7, CR 5). Celeste tente de fuir vers un portail d'ombre après le round 3. Si elle s'échappe, elle rejoint Malachi. Si elle est capturée, elle révèle sous interrogatoire (Intimidation DC 18) l'emplacement du prochain rituel à Hammerdeep. FIN DU CHAPITRE 3.`,
    dialogues: [{
      npcId: 'npc_lady_celeste', npcName: 'Dame Celeste',
      lines: [
        { trigger: 'Révélation', text: `*Ses yeux deviennent entièrement noirs.* Malachi m'a ouvert les yeux. Le Seigneur des Ombres ne détruira pas ce monde — il le libérera. Vous vous accrochez à une lumière qui s'éteint. *Elle invoque les démons.* Que les ténèbres vous jugent !`, tone: 'fanatique' }
      ]
    }],
    objectives: [
      { description: 'Neutraliser Dame Celeste et ses démons', type: 'combat', optional: false },
      { description: 'Protéger les civils du bal', type: 'special', optional: true }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 3', nextScene: 'ch4_s1_hammerdeep', label: '→ Ch.4 : Voyage à Hammerdeep' }
    ],
    encounters: ['4x Démon d\'Ombre (CR 3)', '1x Dame Celeste (CR 5)'],
    loot: ['Carte des Sceaux restants', '2500 PO', 'Anneau de Protection +1'],
    estimatedMinutes: 25, mood: 'chaos-épique',
    music: 'Combat orchestral — violons rapides, cuivres', location: 'Sol-Aureus — Palais Royal, Grand Bal'
  }
];

export const CHAPTER_3: NarrativeChapter = {
  id: 'ch3', number: 3, title: 'L\'Ombre dans la Cité',
  subtitle: 'Enquête et trahison à Sol-Aureus',
  summary: 'Enquête dans la haute noblesse pour démasquer un traître allié au culte de Malachi.',
  suggestedLevel: 5, region: 'Sol-Aureus',
  themes: ['Intrigue', 'Enquête', 'Trahison'],
  scenes: CH3_SCENES, previousChapter: 'ch2', nextChapter: 'ch4'
};

// ---------- CHAPITRE 4 : LES PROFONDEURS DE HAMMERDEEP (Niveau 6-8) ----------

const CH4_SCENES: NarrativeScene[] = [
  {
    id: 'ch4_s1_hammerdeep', chapterId: 'ch4', sceneNumber: 1,
    title: 'La Cité sous la Montagne', type: 'narration',
    readAloud: `Hammerdeep s'ouvre devant vous comme une cathédrale de pierre vivante. Des cascades de lave éclairent des ponts suspendus au-dessus de gouffres sans fond. Le martèlement des forges résonne dans vos os — un battement de cœur mécanique qui ne s'arrête jamais. 

Le Jarl Thorgrim Barbe-de-Fer vous accueille dans sa salle de trône creusée dans le diamant brut. Un nain massif, couvert de cicatrices, dont la barbe tressée touche presque le sol. "La Reine de surface m'envoie ses héros. Hmph. On verra ce que vous valez dans les profondeurs."`,
    gmNotes: `Hammerdeep est spectaculaire et hostile aux non-nains. Le Jarl est bourru mais pragmatique. Il ne croit pas aux menaces des Sceaux jusqu'à ce qu'il voie les preuves. Un jet de Persuasion DC 16 ou la présentation du Fragment de Sceau #1 le convainc. Il vous donne un guide nain : Grimhild Marteau-de-Glace, une guerrière féroce.`,
    dialogues: [{
      npcId: 'npc_jarl_thorgrim', npcName: 'Jarl Thorgrim Barbe-de-Fer',
      lines: [
        { trigger: 'Accueil', text: `*Il vous toise.* Des aventuriers de surface. Pâles comme des champignons. *Il crache.* Vous parlez de Sceaux brisés et de démons ? Montrez-moi vos preuves ou retournez à votre soleil doré.`, tone: 'méprisant' },
        { trigger: 'Convaincu', text: `*Il examine le Fragment de Sceau, et son visage change.* Par la barbe d'ancêtres... c'est réel. *Il se lève.* Le Sceau des Profondeurs est au Niveau 15 — la Forge Cachée. Mes mineurs rapportent des bruits étranges depuis des semaines. Grimhild vous guidera. Ne me décevez pas.`, tone: 'grave' }
      ]
    }],
    objectives: [
      { description: 'Convaincre le Jarl Thorgrim de la menace', type: 'talk', optional: false },
      { description: 'Obtenir un guide pour le Niveau 15', type: 'talk', optional: false }
    ],
    transitions: [
      { condition: 'Le Jarl est convaincu', nextScene: 'ch4_s2_profondeurs', label: '→ Descente vers le Niveau 15' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 16, success: 'Le Jarl est impressionné par votre éloquence. Il vous offre des armes naines en plus du guide.', failure: 'Le Jarl n\'est pas convaincu par les mots. Montrez le Fragment de Sceau (réussite automatique).' }
    ],
    loot: ['Guide : Grimhild Marteau-de-Glace (PNJ allié)'],
    estimatedMinutes: 15, mood: 'émerveillement-tension',
    music: 'Nain — percussions profondes, chœurs graves', location: 'Hammerdeep — Salle du Trône'
  },
  {
    id: 'ch4_s2_profondeurs', chapterId: 'ch4', sceneNumber: 2,
    title: 'Le Niveau 15', type: 'exploration',
    readAloud: `La descente vers le Niveau 15 prend des heures. L'air devient brûlant, puis glacial, puis brûlant à nouveau selon les poches de lave et les courants d'air souterrain. La lumière des champignons phosphorescents peint les murs de bleu et de vert.

Au Niveau 15, la Forge Cachée s'ouvre — une caverne si vaste que son plafond se perd dans l'obscurité. Des machines naines antiques, figées depuis des siècles, bordent un lac de magma dormant. Et au centre du lac, sur un îlot de basalte, le pilier du Sceau pulse d'une lumière faible et mourante. Des cultistes en robe noire sont en plein rituel autour.`,
    gmNotes: `Le groupe de cultistes comprend 6 acolytes (CR 1) et 1 prêtre sombre (CR 5). Le rituel est en cours — les joueurs ont 5 rounds pour l'interrompre avant que le Sceau ne cède. Grimhild peut retenir 2 acolytes seule. L'îlot est accessible par un pont de pierre étroit — un goulet d'étranglement tactique intéressant.`,
    dialogues: [],
    objectives: [
      { description: 'Descendre au Niveau 15 de Hammerdeep', type: 'explore', optional: false },
      { description: 'Interrompre le rituel cultiste (5 rounds)', type: 'combat', optional: false },
      { description: 'Protéger le Sceau des Profondeurs', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Rituel interrompu', nextScene: 'ch4_s3_forge', label: '→ La Forge des Ancêtres' },
      { condition: 'Rituel complété (échec)', nextScene: 'ch4_s3_forge', label: '→ Sceau brisé (conséquences)' }
    ],
    encounters: ['6x Acolyte Cultiste (CR 1)', '1x Prêtre Sombre (CR 5)'],
    estimatedMinutes: 25, mood: 'urgence',
    music: 'Action souterraine — tambours accélérés, échos', location: 'Hammerdeep — Niveau 15, Forge Cachée'
  },
  {
    id: 'ch4_s3_forge', chapterId: 'ch4', sceneNumber: 3,
    title: 'La Forge des Ancêtres', type: 'transition',
    readAloud: `Le calme revient dans la Forge Cachée après le combat. La lumière du Sceau pulse encore — faiblement, mais vivante. Le Jarl Thorgrim descend en personne pour voir le résultat. Son visage est illisible.

"Vous avez sauvé le Sceau. Ou du moins, vous lui avez donné du temps." Il pose une main calleuse sur la pierre du pilier. "C'est l'œuvre de mes ancêtres. Ils ont donné leur sang pour poser ces protections. Et maintenant, des fanatiques veulent les détruire." Il se tourne vers vous. "Je vous dois une dette. La Maison Barbe-de-Fer honore ses dettes."

Il tire une arme de son dos — un marteau de guerre aux runes brillantes. "Forgé par le Roi Thror lui-même. Portez-le avec honneur."`,
    gmNotes: `FIN DU CHAPITRE 4. Le Jarl devient un allié majeur. Si le Sceau a été sauvé, +30 Réputation Hammerdeep et alliance naine. Si le Sceau a été brisé, le Jarl est furieux mais reconnaît que ce n'est pas votre faute (-10 Réputation mais alliance quand même). La carte des Sceaux pointe vers Kuldahar comme prochain objectif.`,
    dialogues: [{
      npcId: 'npc_jarl_thorgrim', npcName: 'Jarl Thorgrim',
      lines: [
        { trigger: 'Gratitude', text: `*Il incline la tête — un geste rare chez un Jarl.* Vous avez prouvé votre valeur. Les Nains de Hammerdeep se battront à vos côtés quand le temps viendra. Et il viendra. Je le sens dans la pierre.`, tone: 'solennel' }
      ]
    }],
    objectives: [
      { description: 'Recevoir les récompenses du Jarl', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 4', nextScene: 'ch5_s1_kuldahar', label: '→ Ch.5 : Voyage vers Kuldahar' }
    ],
    loot: ['Marteau de Thror (+2, ignore résistance aux dégâts)', '3000 PO', 'Alliance Hammerdeep'],
    estimatedMinutes: 10, mood: 'triomphe',
    music: 'Nain triomphant — chœurs, marteaux', location: 'Hammerdeep — Forge Cachée'
  }
];

export const CHAPTER_4: NarrativeChapter = {
  id: 'ch4', number: 4, title: 'Les Profondeurs de Hammerdeep',
  subtitle: 'Course contre la montre dans les mines naines',
  summary: 'Descente au Niveau 15 de Hammerdeep pour sauver le Sceau des Profondeurs avant que les cultistes ne le brisent.',
  suggestedLevel: 7, region: 'Hammerdeep',
  themes: ['Exploration souterraine', 'Urgence', 'Alliance naine'],
  scenes: CH4_SCENES, previousChapter: 'ch3', nextChapter: 'ch5'
};

// ---------- CHAPITRE 5 : LES GLACES DE KULDAHAR (Niveau 8-9) ----------

const CH5_SCENES: NarrativeScene[] = [
  {
    id: 'ch5_s1_kuldahar', chapterId: 'ch5', sceneNumber: 1,
    title: 'La Forteresse de Glace', type: 'narration',
    readAloud: `Le vent du nord hurle comme un loup affamé alors que vous remontez les cols gelés vers Kuldahar. La température chute au-delà de l'imaginable — vos souffles gèlent en cristaux avant de toucher le sol. Les montagnes de glace se dressent comme les dents d'un titan endormi.

Kuldahar apparaît enfin : une forteresse sculptée directement dans un glacier bleu, ses tours de glace reflétant un soleil pâle. Les barbares du Nord vous accueillent avec méfiance — des étrangers du "Sud radoteur" ne sont pas les bienvenus. Le Chieftain Ragnar Crocs-de-Givre vous écoute depuis son trône de défenses de mammouth.`,
    gmNotes: `Kuldahar est un test de survie et de diplomatie. Le Chieftain est un guerrier fier mais juste. Il teste les joueurs via l'épreuve du Blizzard — une nuit seul dans la tempête (Constitution DC 14 chaque heure, 3 heures). Réussir gagne son respect. Le Sceau de Givre est protégé par un dragon de cristal endormi — pas un ennemi, un gardien.`,
    dialogues: [{
      npcId: 'npc_chieftain_ragnar', npcName: 'Chieftain Ragnar',
      lines: [
        { trigger: 'Accueil', text: `*Il vous regarde comme on regarde des insectes.* Des gens du sud. Encore. Vous parlez de Sceaux et de menaces. Le Nord a ses propres menaces — le froid, les loups, la faim. Que pouvez-vous nous apporter que nous n'avons pas déjà ?`, tone: 'dédaigneux' },
        { trigger: 'L\'épreuve', text: `Vous voulez notre respect ? Survivez à la Nuit de Givre. Seul. Dehors. Si vous êtes debout au matin, nous parlerons.`, tone: 'défi' }
      ]
    }],
    objectives: [
      { description: 'Atteindre Kuldahar malgré le froid extrême', type: 'travel', optional: false },
      { description: 'Survivre à l\'épreuve du Blizzard', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Épreuve réussie', nextScene: 'ch5_s2_dragon', label: '→ Le Dragon de Cristal' }
    ],
    skillChecks: [
      { skill: 'Constitution (JDS)', dc: 14, success: 'Vous résistez au froid mortel. Le matin, vous vous levez sous les regards impressionnés des barbares.', failure: 'Vous souffrez d\'un niveau d\'Épuisement mais vous survivez. Le Chieftain accepte quand même.' }
    ],
    estimatedMinutes: 15, mood: 'désolation-défi',
    music: 'Nordique — vents, tambours graves', location: 'Kuldahar — Forteresse de Glace'
  },
  {
    id: 'ch5_s2_dragon', chapterId: 'ch5', sceneNumber: 2,
    title: 'L\'Éveil du Dragon de Cristal', type: 'dialogue',
    readAloud: `Au plus profond du glacier, dans une caverne de glace bleue si pure que la lumière se fracture en arcs-en-ciel, repose le Dragon de Cristal. Immense. Magnifique. Ses écailles transparentes révèlent un cœur de lumière dorée qui pulse lentement — le battement d'un être ancien qui rêve depuis des siècles.

Le Sceau de Givre est enchâssé dans le sol gelé, juste entre ses pattes avant. Intact, mais entouré de fissures de glace noire — la corruption approche.

Quand vous entrez dans la caverne, un des yeux du dragon s'ouvre. Un iris d'or liquide vous fixe. Une voix résonne dans vos esprits : "Mortels. Vous portez le parfum de la guerre et de l'ombre. Parlez."`,
    gmNotes: `Le Dragon de Cristal (Ancien Dragon Blanc modifié, CR 20) n'est PAS un ennemi. C'est un gardien posé par l'Alliance des Sept. Il est sage mais fatigué — maintenir le Sceau l'a affaibli. Il accepte de renforcer le Sceau si les joueurs lui fournissent un composant : le Cristal de Lunara, caché dans un temple submergé sous le lac gelé. Mini-donjon optionnel.`,
    dialogues: [{
      npcId: 'npc_crystal_dragon', npcName: 'Ael\'thyrion, Dragon de Cristal',
      lines: [
        { trigger: 'Premiers mots', text: `*La voix est douce mais immense, comme un écho dans une cathédrale.* Je suis Ael'thyrion. Je veille sur ce Sceau depuis que le dernier héros de l'Alliance me l'a confié. 120 ans. C'est long, même pour un dragon. La corruption grignote mes défenses... je ne tiendrai plus longtemps seul.`, tone: 'mélancolique' },
        { trigger: 'Solution', text: `Il existe un Cristal de Lunara dans le temple submergé sous le Lac de Givre. Avec lui, je peux renforcer le Sceau pour un siècle de plus. Mais le temple est piégé — construit par les mêmes mages de l'Alliance, et ils n'étaient pas tendres avec les intrus. Êtes-vous prêts à risquer vos vies pour une pierre ?`, tone: 'espoir prudent' }
      ]
    }],
    objectives: [
      { description: 'Communiquer avec le Dragon de Cristal', type: 'talk', optional: false },
      { description: 'Accepter la quête du Cristal de Lunara', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Quête acceptée', nextScene: 'ch5_s3_temple', label: '→ Temple submergé' }
    ],
    estimatedMinutes: 15, mood: 'émerveillement',
    music: 'Dragon — chœurs célestes, cristaux qui tintent', location: 'Kuldahar — Cœur du Glacier'
  },
  {
    id: 'ch5_s3_temple', chapterId: 'ch5', sceneNumber: 3,
    title: 'Le Temple Submergé', type: 'combat',
    readAloud: `Sous la surface gelée du Lac de Givre, un temple de pierre blanche émerge dans la pénombre aquatique. Des bulles d'air piégées dans la glace depuis des siècles créent un réseau de poches respirables. Le froid est mortel — chaque seconde dans l'eau gèle vos os.

Le temple est piégé : dalles de pression, jets de givre, golems gardiens. Et au centre, sur un autel couvert de glace, le Cristal de Lunara brille d'une lumière argentée douce, comme un clair de lune capturé dans la pierre.

Mais vous n'êtes pas seuls. Des cultistes vous ont suivis — ils veulent le Cristal pour le détruire.`,
    gmNotes: `Donjon court : 3 salles avec pièges + combat final contre 4 cultistes et 1 Élémentaire de Glace (CR 5). Le Cristal de Lunara est un objet de quête majeur — il renforce le Sceau ET peut servir de composant pour un rituel au Chapitre 10. FIN DU CHAPITRE 5 après retour au Dragon.`,
    dialogues: [],
    objectives: [
      { description: 'Traverser les pièges du temple', type: 'explore', optional: false },
      { description: 'Obtenir le Cristal de Lunara', type: 'collect', optional: false },
      { description: 'Vaincre les cultistes et l\'Élémentaire de Glace', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Cristal obtenu — retour au Dragon', nextScene: 'ch6_s1_alliance', label: '→ Ch.6 : Le Conseil des Factions' }
    ],
    encounters: ['4x Cultiste (CR 2)', '1x Élémentaire de Glace (CR 5)'],
    loot: ['Cristal de Lunara (objet de quête)', '4000 PO', 'Armure de Glace Enchantée'],
    estimatedMinutes: 30, mood: 'péril-récompense',
    music: 'Donjon aquatique — sons étouffés, tension', location: 'Kuldahar — Temple Submergé du Lac de Givre'
  }
];

export const CHAPTER_5: NarrativeChapter = {
  id: 'ch5', number: 5, title: 'Les Glaces de Kuldahar',
  subtitle: 'Alliance du Nord et Dragon de Cristal',
  summary: 'Voyage vers le Nord glacial, épreuve de survie, rencontre avec le Dragon de Cristal gardien du Sceau de Givre.',
  suggestedLevel: 8, region: 'Kuldahar',
  themes: ['Survie', 'Diplomatie', 'Donjon', 'Dragon allié'],
  scenes: CH5_SCENES, previousChapter: 'ch4', nextChapter: 'ch6'
};

// ---------- CHAPITRE 6 : LE CONSEIL DES FACTIONS (Niveau 9-10) ----------

const CH6_SCENES: NarrativeScene[] = [
  {
    id: 'ch6_s1_alliance', chapterId: 'ch6', sceneNumber: 1,
    title: 'Le Grand Conseil', type: 'dialogue',
    readAloud: `Pour la première fois depuis la fin de l'Ère des Cendres, les trois factions d'Aethelgard se réunissent dans la Grande Salle de Sol-Aureus. La tension est palpable — les drapeaux du Soleil d'Or, du Marteau de Fer et du Loup de Glace pendent côte à côte, et les délégués se jaugent avec méfiance.

La Reine Elara préside. Le Jarl Thorgrim tambourine sur la table. Le Chieftain Ragnar mâche un os. Le Général Marcus se tient rigide comme un pilier. Et vous — les héros qui avez vu la menace de vos propres yeux — devez convaincre ces leaders de s'unir.`,
    gmNotes: `Scène de diplomatie majeure. Les trois factions ont des intérêts divergents. Le Jarl veut des armes. Ragnar veut du territoire. La Reine veut le contrôle centralisé. Les joueurs doivent négocier un compromis — série de jets de Persuasion/Intimidation (DC 14-18 selon l'approche). L'alliance est CRUCIALE pour les chapitres 10-15.`,
    dialogues: [{
      npcId: 'npc_queen_elara', npcName: 'Reine Elara',
      lines: [
        { trigger: 'Ouverture', text: `Mes seigneurs, la menace est réelle. Nos héros ont combattu les forces de l'Ombre sur trois fronts. Si nous ne nous unissons pas, nous tomberons séparément. *Elle se tourne vers vous.* Dites-leur ce que vous avez vu.`, tone: 'urgente' }
      ]
    }],
    objectives: [
      { description: 'Convaincre les trois factions de s\'allier', type: 'talk', optional: false },
      { description: 'Négocier les termes de l\'alliance', type: 'choice', optional: false }
    ],
    transitions: [
      { condition: 'Alliance conclue', nextScene: 'ch6_s2_preparation', label: '→ Préparatifs de guerre' },
      { condition: 'Alliance partielle', nextScene: 'ch6_s2_preparation', label: '→ Préparatifs (alliance faible)' }
    ],
    estimatedMinutes: 20, mood: 'politique-épique',
    music: 'Conseil — cuivres majestueux, tension', location: 'Sol-Aureus — Grande Salle du Conseil'
  },
  {
    id: 'ch6_s2_preparation', chapterId: 'ch6', sceneNumber: 2,
    title: 'L\'Arsenal et le Savoir', type: 'exploration',
    readAloud: `L'alliance formée — fragile mais réelle — les trois factions mettent en commun leurs ressources. Les forges de Hammerdeep tournent jour et nuit pour armer les barbares du Nord. Les éclaireurs de Kuldahar cartographient les positions ennemies. Et les mages de Sol-Aureus analysent les Fragments de Sceau pour comprendre comment les renforcer.

Théodore, le gnome bibliothécaire, fait une découverte capitale : un rituel de restauration des Sceaux existe dans les archives de la Sylve d'Émeraude — chez les Elfes.`,
    gmNotes: `Phase de préparation libre : les joueurs choisissent comment utiliser leur temps. Entraînement (+1 à un jet de compétence), Reconnaissance (infos sur Malachi), Recherche (rituel de restauration), ou Diplomatie (renforcer l'alliance). Chaque choix a un impact sur les chapitres suivants. La révélation de Théodore accroche vers le Chapitre 7.`,
    dialogues: [{
      npcId: 'npc_theodore', npcName: 'Théodore',
      lines: [
        { trigger: 'Découverte', text: `*Il agite un parchemin.* J'ai trouvé ! Le rituel de Scellement Universel — il peut restaurer TOUS les Sceaux d'un coup ! Mais il est dans les archives elfiques de Sylmanir. Et les Elfes ne parlent à personne depuis cinquante ans...`, tone: 'excité-inquiet' }
      ]
    }],
    objectives: [
      { description: 'Choisir une activité de préparation', type: 'choice', optional: false },
      { description: 'Apprendre l\'existence du Rituel de Scellement Universel', type: 'talk', optional: false }
    ],
    transitions: [
      { condition: 'Préparatifs complétés', nextScene: 'ch6_s3_revelation', label: '→ La Prophétie révélée' }
    ],
    estimatedMinutes: 15, mood: 'espoir-préparation',
    music: 'Préparatifs — marteaux, parchemins, murmures', location: 'Sol-Aureus — Quartier Général de l\'Alliance'
  },
  {
    id: 'ch6_s3_revelation', chapterId: 'ch6', sceneNumber: 3,
    title: 'La Prophétie du Miroir', type: 'narration',
    readAloud: `La nuit précédant votre départ pour la Sylve d'Émeraude, le Grand Prêtre Alduin vous convoque dans le temple de Solarius. Les bougies vacillent dans un vent qui ne devrait pas exister dans un lieu clos.

"J'ai rêvé," dit-il d'une voix brisée. "Solarius m'a parlé pour la première fois en vingt ans." Il déroule un parchemin couvert de symboles anciens. "Quand Sept Sceaux tomberont, le Miroir s'ouvrira. Quand le Miroir s'ouvrira, le Maître reviendra. Et seuls ceux qui portent la Lumière des Sept pourront le repousser." Il vous regarde. "C'est vous. Vous êtes la Lumière des Sept. Pas par hasard — par destin."`,
    gmNotes: `FIN DU CHAPITRE 6. La Prophétie est un tournant narratif — les joueurs passent de réactifs à proactifs. Alduin est épuisé par la vision — il vieillit visiblement. La "Lumière des Sept" fait référence aux Fragments de Sceau collectés qui, combinés, forment une arme contre le Seigneur des Ombres.`,
    dialogues: [{
      npcId: 'npc_high_priest_alduin', npcName: 'Grand Prêtre Alduin',
      lines: [
        { trigger: 'La prophétie', text: `*Il tremble.* Je ne sais pas ce que cela signifie exactement. Mais Solarius ne ment pas. Vous devez trouver le rituel, restaurer les Sceaux, et vous préparer à affronter le Seigneur des Ombres. Le destin du monde repose littéralement sur vos épaules. *Larmes.* Je suis désolé de ce fardeau.`, tone: 'dévasté' }
      ]
    }],
    objectives: [
      { description: 'Recevoir la Prophétie du Miroir', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 6', nextScene: 'ch7_s1_sylve', label: '→ Ch.7 : La Sylve d\'Émeraude' }
    ],
    loot: ['Texte de la Prophétie (item de quête)', 'Bénédiction de Solarius (+1 aux JDS contre magie d\'ombre)'],
    estimatedMinutes: 10, mood: 'prophétique',
    music: 'Sacrée — orgue, chœurs célestes', location: 'Sol-Aureus — Temple de Solarius'
  }
];

export const CHAPTER_6: NarrativeChapter = {
  id: 'ch6', number: 6, title: 'Le Conseil des Factions',
  subtitle: 'Alliance et prophétie',
  summary: 'Unir les trois factions d\'Aethelgard et découvrir la Prophétie du Miroir.',
  suggestedLevel: 9, region: 'Sol-Aureus',
  themes: ['Diplomatie', 'Alliance', 'Prophétie'],
  scenes: CH6_SCENES, previousChapter: 'ch5', nextChapter: 'ch7'
};

// ---------- CHAPITRE 7 : LA SYLVE D'ÉMERAUDE (Niveau 10-11) ----------

const CH7_SCENES: NarrativeScene[] = [
  {
    id: 'ch7_s1_sylve', chapterId: 'ch7', sceneNumber: 1,
    title: 'La Forêt Vivante', type: 'exploration',
    readAloud: `La Sylve d'Émeraude est tout ce qu'on vous a raconté, et davantage. Les arbres sont vivants — pas seulement au sens botanique, mais consciemment vivants. Ils murmurent entre eux dans un langage de frémissements et de craquements. La lumière du soleil filtre à travers un dais de feuilles dorées et émeraude, créant des motifs qui changent à chaque souffle de vent.

Sylmanir, la cité elfique, est tissée dans les branches de l'Arbre-Monde junior — un chêne si immense qu'il faut six heures pour en faire le tour. Des passerelles de bois vivant relient des maisons de cristal végétal. Les Elfes vous observent depuis les hauteurs, silencieux, impassibles.`,
    gmNotes: `Les Elfes sont isolationnistes et méfiants. Ils n'ont pas parlé aux "peuples courts" depuis 50 ans. Le Sage Elendil est le seul disposé à écouter, mais les joueurs doivent d'abord passer une épreuve de sagesse elfique : résoudre trois énigmes de l'Arbre-Monde. L'enjeu : accéder aux archives contenant le Rituel de Scellement.`,
    dialogues: [{
      npcId: 'npc_sage_elendil', npcName: 'Sage Elendil',
      lines: [
        { trigger: 'Accueil', text: `*Un elfe d'une beauté intemporelle, au visage marqué de rides impossiblement fines.* Vous apportez l'odeur de la cendre et du fer. Et de l'ombre. Oui, nous savons ce qui se passe au-delà de nos frontières. Nous avons choisi de ne pas intervenir. Mais... l'Arbre murmure que le choix ne nous appartient plus.`, tone: 'résigné' },
        { trigger: 'L\'épreuve', text: `L'Arbre-Monde décide qui est digne de son savoir. Vous devez répondre à trois questions posées par ses racines. Si vous échouez, vous oublierez ces bois. Si vous réussissez, les archives seront vôtres.`, tone: 'solennel' }
      ]
    }],
    objectives: [
      { description: 'Trouver Sylmanir et contacter le Sage Elendil', type: 'talk', optional: false },
      { description: 'Passer l\'épreuve de l\'Arbre-Monde (3 énigmes)', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Épreuve réussie', nextScene: 'ch7_s2_archives', label: '→ Archives elfiques' }
    ],
    estimatedMinutes: 20, mood: 'merveilleux-sacré',
    music: 'Elfique — harpe cristalline, chant d\'oiseaux', location: 'Sylve d\'Émeraude — Sylmanir'
  },
  {
    id: 'ch7_s2_archives', chapterId: 'ch7', sceneNumber: 2,
    title: 'Le Rituel de Scellement', type: 'narration',
    readAloud: `Les Archives de l'Arbre-Monde ne sont pas des livres — elles sont vivantes. Les murs de bois s'ouvrent pour révéler des runes lumineuses qui flottent dans l'air comme des lucioles d'or. Le savoir de millénaires danse devant vos yeux.

Le Sage Elendil guide vos mains vers un nœud particulier dans le bois — quand vous le touchez, une vision s'empare de vous : vous voyez l'Alliance des Sept il y a 120 ans, sept héros différents mais unis, posant les Sceaux ensemble dans un rituel de sang et de lumière. Et vous comprenez : le rituel nécessite sept composants, un par Sceau, et un sacrifice. Pas de mort — un sacrifice de pouvoir. Chaque participant doit donner une partie de sa vie au Sceau.`,
    gmNotes: `Le Rituel de Scellement Universel nécessite : 1) Les 7 Fragments de Sceau, 2) Un cercle de pouvoir au Temple du Miroir, 3) Un sacrifice volontaire de chaque participant (perte permanente de 5 HP max). Les joueurs ont 4 fragments — il en reste 3 à trouver. Cette connaissance drive les chapitres 8-10.`,
    dialogues: [{
      npcId: 'npc_sage_elendil', npcName: 'Sage Elendil',
      lines: [
        { trigger: 'Le rituel', text: `*Sa voix est lourde de siècles.* Le prix est élevé. L'Alliance des Sept y a laissé des années de vie. Certains sont morts prématurément à cause de cela. Êtes-vous prêts à payer ce prix ? *Pause.* Bien sûr. Les héros n'hésitent jamais. C'est ce qui les rend héroïques... et tragiques.`, tone: 'triste-admiratif' }
      ]
    }],
    objectives: [
      { description: 'Découvrir le Rituel de Scellement Universel', type: 'special', optional: false },
      { description: 'Comprendre les composants nécessaires', type: 'talk', optional: false }
    ],
    transitions: [
      { condition: 'Rituel appris', nextScene: 'ch7_s3_embuscade', label: '→ Embuscade sur le retour' }
    ],
    estimatedMinutes: 15, mood: 'révélation-gravité',
    music: 'Mystique — harpe éthérée, chant elfique', location: 'Sylve d\'Émeraude — Archives de l\'Arbre-Monde'
  },
  {
    id: 'ch7_s3_embuscade', chapterId: 'ch7', sceneNumber: 3,
    title: 'L\'Embuscade de Malachi', type: 'combat',
    readAloud: `Sur le chemin du retour, à la lisière de la Sylve, le monde bascule. Le ciel s'assombrit en plein jour. Les arbres cessent de murmurer. Un silence de mort s'installe.

Puis HE apparaît. Malachi. Grand Prêtre du Seigneur des Ombres. Un homme émacié dans une robe noire brodée de runes rouges, le crâne rasé orné de tatouages démoniaques. Ses yeux brillent d'une lumière malsaine.

"Ah. Les porteurs de lumière." Sa voix est douce, presque agréable. "J'ai attendu patiemment que vous trouviez le rituel pour moi. Merci." Derrière lui, une armée d'ombres se matérialise.

C'est un piège.`,
    gmNotes: `COMBAT MAJEUR contre Malachi (Clerc/Warlock niv.12, CR 10) et ses forces : 6x Démons d'Ombre (CR 3), 2x Chevaliers d'Ombre (CR 6). Malachi est BEAUCOUP trop fort pour être vaincu maintenant. Après 3 rounds, le Sage Elendil intervient avec la magie de la Sylve, créant une barrière végétale qui force Malachi à se retirer. Malachi vole le Fragment de Sceau #2 si les joueurs ne le protègent pas (Dextérité DC 16). FIN DU CHAPITRE 7.`,
    dialogues: [{
      npcId: 'npc_malachi', npcName: 'Grand Prêtre Malachi',
      lines: [
        { trigger: 'Révélation', text: `*Il sourit.* Vous ne comprenez toujours pas, n'est-ce pas ? Chaque Sceau que vous "sauvez", je le brise derrière votre dos. Vous êtes en retard d'un mouvement. Toujours. *Il lève les mains.* Le Miroir attend. Et bientôt, le Maître marchera.`, tone: 'triomphant-calme' }
      ]
    }],
    objectives: [
      { description: 'Survivre à l\'embuscade de Malachi (3 rounds)', type: 'combat', optional: false },
      { description: 'Protéger les Fragments de Sceau', type: 'special', optional: true }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 7 — survie', nextScene: 'ch8_s1_terres_brulees', label: '→ Ch.8 : Les Terres Brûlées' }
    ],
    encounters: ['Malachi (CR 10)', '6x Démon d\'Ombre (CR 3)', '2x Chevalier d\'Ombre (CR 6)'],
    loot: ['5000 PO', 'Fragment de Sceau #3 (si protégé)', 'Épée du Sage (+2, lumière)'],
    estimatedMinutes: 25, mood: 'terreur-survie',
    music: 'Boss — chœurs sombres, percussions apocalyptiques', location: 'Lisière de la Sylve d\'Émeraude'
  }
];

export const CHAPTER_7: NarrativeChapter = {
  id: 'ch7', number: 7, title: 'La Sylve d\'Émeraude',
  subtitle: 'Sagesse elfique et première confrontation avec Malachi',
  summary: 'Voyage chez les Elfes pour découvrir le Rituel de Scellement. Première confrontation directe avec le Grand Prêtre Malachi.',
  suggestedLevel: 10, region: 'Sylve d\'Émeraude',
  themes: ['Sagesse', 'Révélation', 'Boss fight', 'Premier échec'],
  scenes: CH7_SCENES, previousChapter: 'ch6', nextChapter: 'ch8'
};

// ---------- CHAPITRE 8 : LES TERRES BRÛLÉES (Niveau 11-12) ----------

const CH8_SCENES: NarrativeScene[] = [
  {
    id: 'ch8_s1_terres_brulees', chapterId: 'ch8', sceneNumber: 1,
    title: 'Les Ruines d\'Ashka', type: 'exploration',
    readAloud: `Les Terres Brûlées sont un cauchemar géologique. Le sol est couvert de verre volcanique noir qui craque sous vos pas. Des colonnes de fumée s'élèvent de fissures d'où s'échappe une chaleur suffocante. Les ruines de l'ancien Empire Ashka émergent du paysage comme des os d'un titan mort — tours brisées, arches effondrées, et au loin, la silhouette impossible d'une cité flottante à moitié effondrée, suspendue entre ciel et terre par une magie agonisante.

C'est ici que tout a commencé, il y a 500 ans. C'est ici que le Miroir des Ombres a été ouvert pour la première fois. Et c'est ici que le prochain Sceau se trouve — sous les ruines du Temple du Miroir.`,
    gmNotes: `Les Terres Brûlées sont hostiles : dégâts de chaleur (1d6/heure sans protection), terrain difficile permanent, et créatures corrompues errant dans les ruines. Le Temple du Miroir est un méga-donjon de 5 salles avec le Sceau le plus important — celui qui garde l'accès direct au Miroir des Ombres.`,
    dialogues: [],
    objectives: [
      { description: 'Traverser les Terres Brûlées jusqu\'au Temple du Miroir', type: 'travel', optional: false },
      { description: 'Survivre à l\'environnement hostile', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Temple atteint', nextScene: 'ch8_s2_temple', label: '→ Le Temple du Miroir' }
    ],
    skillChecks: [
      { skill: 'Survie', dc: 15, success: 'Vous trouvez un chemin à travers les ruines qui évite les zones de chaleur extrême.', failure: 'Dégâts de chaleur : 2d6 dégâts de feu pour chaque membre du groupe.' },
      { skill: 'Histoire', dc: 14, success: 'Vous reconnaissez les ruines Ashka et identifiez un raccourci vers le Temple via les anciens aqueducs.', failure: 'Les ruines sont un labyrinthe incompréhensible. Route longue et dangereuse.' }
    ],
    estimatedMinutes: 15, mood: 'désolation-épique',
    music: 'Wasteland — vent brûlant, craquements', location: 'Terres Brûlées — Ruines d\'Ashka'
  },
  {
    id: 'ch8_s2_temple', chapterId: 'ch8', sceneNumber: 2,
    title: 'Le Temple du Miroir', type: 'combat',
    readAloud: `Le Temple du Miroir se dresse au cœur des ruines — intact, comme si la destruction l'avait évité. Ses murs de pierre noire polie reflètent votre image déformée, étirée, comme si une autre version de vous-même vous observait depuis l'intérieur.

Les portes s'ouvrent d'elles-mêmes à votre approche. L'intérieur est froid — glacial même, un contraste violent avec la chaleur des Terres Brûlées. Au centre, le Miroir des Ombres. Pas un miroir ordinaire — un portail de trois mètres de haut, fait d'une substance qui n'est ni verre ni métal, mais quelque chose d'autre. Sa surface ondule comme de l'eau sombre, et vous pouvez voir des formes bouger de l'autre côté. Des formes qui vous regardent.

Le Sceau du Miroir est enchâssé dans le sol devant le portail. Fissuré. Corrompu. Et autour, les traces fraîches d'un rituel récent.`,
    gmNotes: `Le Miroir des Ombres est le centre narratif de tout l'arc. Les joueurs le voient ici pour la première fois. Le Sceau du Miroir est le plus important — s'il cède, le Miroir s'ouvre. Combat : 2x Gardiens du Miroir (Golems d'Ombre, CR 8) qui s'activent quand les joueurs s'approchent du Sceau. Ils ne sont pas cultistes — ce sont des gardiens posés par l'Alliance des Sept qui ont été corrompus.`,
    dialogues: [],
    objectives: [
      { description: 'Explorer le Temple du Miroir', type: 'explore', optional: false },
      { description: 'Vaincre les Gardiens corrompus du Miroir', type: 'combat', optional: false },
      { description: 'Examiner le Sceau du Miroir', type: 'investigate', optional: false }
    ],
    transitions: [
      { condition: 'Temple sécurisé', nextScene: 'ch8_s3_vision', label: '→ Vision du Miroir' }
    ],
    encounters: ['2x Golem d\'Ombre (CR 8)'],
    loot: ['Fragment de Sceau #4', 'Armure du Gardien (+2, résistance ombre)'],
    estimatedMinutes: 30, mood: 'horreur-cosmique',
    music: 'Temple — orgue inversé, murmures démoniaques', location: 'Terres Brûlées — Temple du Miroir'
  },
  {
    id: 'ch8_s3_vision', chapterId: 'ch8', sceneNumber: 3,
    title: 'La Vision de l\'Autre Côté', type: 'narration',
    readAloud: `En touchant le Sceau, une vision vous frappe comme un coup de tonnerre. Pendant un instant — une éternité — vous voyez L'AUTRE CÔTÉ.

Le Plan d'Ombre. Un monde inversé, où le ciel est un miroir brisé reflétant des étoiles mortes. Des cités d'ombre se dressent comme des négatifs de Sol-Aureus, de Hammerdeep, de Kuldahar. Et au centre de tout, une silhouette colossale. Le Seigneur des Ombres. Pas un démon. Pas un monstre. Un être de concept pur — l'Ombre primordiale elle-même, celle qui existait avant la lumière, celle que les mythes ont oubliée.

Il tourne son regard vers vous. Et il dit un seul mot, qui résonne comme le glas d'un monde : "Bientôt."

Vous revenez à vous, haletants, sur le sol du Temple. Le Miroir est calme. Mais vous savez, au plus profond de vous, que le compte à rebours est lancé.`,
    gmNotes: `FIN DU CHAPITRE 8. Cette vision est le point de non-retour narratif. Les joueurs comprennent l'échelle cosmique de la menace. Le "Bientôt" est un countdown — ils ont 3 chapitres (9-11) avant que Malachi ne brise les derniers Sceaux. Distribuez les récompenses et laissez les joueurs absorber la gravité de la situation.`,
    dialogues: [],
    objectives: [
      { description: 'Recevoir la Vision du Seigneur des Ombres', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 8', nextScene: 'ch9_s1_course', label: '→ Ch.9 : Course contre la Montre' }
    ],
    loot: ['6000 PO', 'Connaissance des défenses du Seigneur des Ombres', 'Vision (trait : avantage aux JDS contre peur ombre)'],
    estimatedMinutes: 10, mood: 'terreur-cosmique',
    music: 'Apocalyptique — silence, puis chœurs massifs', location: 'Terres Brûlées — Temple du Miroir'
  }
];

export const CHAPTER_8: NarrativeChapter = {
  id: 'ch8', number: 8, title: 'Les Terres Brûlées',
  subtitle: 'Le Temple du Miroir et la vision de l\'Ombre',
  summary: 'Exploration des ruines de l\'Empire Ashka et première confrontation avec le Miroir des Ombres. Vision du Seigneur des Ombres.',
  suggestedLevel: 11, region: 'Terres Brûlées',
  themes: ['Archéologie', 'Horreur cosmique', 'Révélation finale'],
  scenes: CH8_SCENES, previousChapter: 'ch7', nextChapter: 'ch9'
};

// ---------- CHAPITRE 9 : COURSE CONTRE LA MONTRE (Niveau 12-13) ----------

const CH9_SCENES: NarrativeScene[] = [
  {
    id: 'ch9_s1_course', chapterId: 'ch9', sceneNumber: 1,
    title: 'Trois Sceaux, Trois Fronts', type: 'narration',
    readAloud: `De retour à Sol-Aureus, la carte des Sceaux sur la table de guerre affiche un bilan sinistre : trois Sceaux restent intacts — les Marais de Sombrefange, les Pics du Tonnerre, et l'Île de Brise-Écume. Malachi frappe partout à la fois. L'alliance ne peut pas être sur tous les fronts.

"Nous devons nous séparer," déclare le Général Marcus. "Chaque équipe prend un front. Vous —" il vous désigne "— vous prenez le plus dangereux."`,
    gmNotes: `Choix stratégique : les joueurs choisissent quel Sceau protéger. Les deux autres sont défendus par des PNJ alliés. Un des deux ÉCHOUERA automatiquement (suspense narratif). Le Sceau choisi par les joueurs est sauvable avec effort. Donnez des détails sur les trois options pour un choix informé.`,
    dialogues: [{
      npcId: 'npc_general_marcus', npcName: 'Général Marcus',
      lines: [
        { trigger: 'Les options', text: `Sombrefange est un marécage empoisonné — tactiquement cauchemardesque. Les Pics du Tonnerre sont une forteresse naturelle — facile à défendre mais le Sceau est au sommet, exposé. Brise-Écume est une île — attaque navale possible. Choisissez votre front. Les alliés nains et barbares couvriront les deux autres.`, tone: 'stratégique' }
      ]
    }],
    objectives: [
      { description: 'Choisir quel Sceau protéger en personne', type: 'choice', optional: false },
      { description: 'Déployer les forces alliées sur les 2 autres fronts', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Front choisi', nextScene: 'ch9_s2_front', label: '→ Mission sur le front choisi' }
    ],
    estimatedMinutes: 15, mood: 'urgence-stratégique',
    music: 'Guerre — tambours de marche, cuivres', location: 'Sol-Aureus — Salle de Guerre'
  },
  {
    id: 'ch9_s2_front', chapterId: 'ch9', sceneNumber: 2,
    title: 'La Bataille du Sceau', type: 'combat',
    readAloud: `Quel que soit votre choix, le combat est brutal. Les forces de Malachi frappent avec une coordination terrifiante — des vagues de cultistes, des démons invoqués, et un lieutenant sombre qui commande avec une froideur clinique.

Le terrain est contre vous. L'ennemi est nombreux. Et le temps joue contre vous — le rituel de brisure est déjà en cours. Vous avez peut-être une heure.

Mais vous n'êtes plus les aventuriers novices qui tremblaient devant des zombis dans une forêt. Vous êtes des héros forgés par l'épreuve. Et cette fois, vous allez gagner.`,
    gmNotes: `Combat scalable selon le front choisi. Chaque front a ses propres ennemis et terrain. Structure commune : 3 vagues d'ennemis (Vague 1: 8x Cultistes CR 2, Vague 2: 4x Démons CR 5 + 2x Chevaliers Noirs CR 6, Vague 3: 1x Lieutenant Sombre CR 10). Le Sceau est sauvé si les joueurs battent les 3 vagues dans les 10 rounds. Fragment de Sceau #5 obtenu.`,
    dialogues: [],
    objectives: [
      { description: 'Repousser 3 vagues d\'ennemis', type: 'combat', optional: false },
      { description: 'Protéger le Sceau (10 rounds)', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Victoire', nextScene: 'ch9_s3_nouvelles', label: '→ Nouvelles des autres fronts' }
    ],
    encounters: ['Vague 1: 8x Cultiste (CR 2)', 'Vague 2: 4x Démon (CR 5) + 2x Chevalier Noir (CR 6)', 'Vague 3: Lieutenant Sombre (CR 10)'],
    loot: ['Fragment de Sceau #5', '7000 PO', 'Arme du Lieutenant (+3)'],
    estimatedMinutes: 35, mood: 'bataille-épique',
    music: 'Bataille — orchestre complet, crescendo', location: 'Variable selon le choix du joueur'
  },
  {
    id: 'ch9_s3_nouvelles', chapterId: 'ch9', sceneNumber: 3,
    title: 'Le Bilan', type: 'narration',
    readAloud: `Le messager arrive couvert de boue et de sang. Un front a tenu — mais l'autre a cédé. Le Sceau est brisé. Les alliés qui le défendaient ont été décimés.

Le Général Marcus reçoit la nouvelle en silence. Puis il se tourne vers la carte et trace une croix sur le Sceau perdu. "Cinq Sceaux sur sept sont tombés. Il en reste deux. Le vôtre et celui de Kuldahar." Il vous regarde. "Si un seul de plus tombe, le Miroir s'ouvre. Nous sommes au bord du gouffre."

Et dans le silence qui suit, un colombier apporte un message scellé d'un sceau noir — les armoiries de Malachi. Le parchemin ne contient qu'un seul mot : "Demain."`,
    gmNotes: `FIN DU CHAPITRE 9. Moment narratif de tension maximale. Un Sceau est perdu — irrémédiable. 5/7 Sceaux brisés. La menace de "Demain" annonce le Chapitre 10. Laisser les joueurs absorber les conséquences de leur choix. Récompensez le front qu'ils ont sauvé, et faites voir les conséquences de celui qu'ils n'ont pas choisi.`,
    dialogues: [],
    objectives: [
      { description: 'Recevoir le bilan des trois fronts', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 9', nextScene: 'ch10_s1_trahison', label: '→ Ch.10 : La Trahison de l\'Ombre' }
    ],
    loot: ['8000 PO (total campagne)', 'Statut : Alliance intacte mais affaiblie'],
    estimatedMinutes: 10, mood: 'victoire-amère',
    music: 'Élégiaque — violons seuls, silence', location: 'Sol-Aureus — Salle de Guerre'
  }
];

export const CHAPTER_9: NarrativeChapter = {
  id: 'ch9', number: 9, title: 'Course contre la Montre',
  subtitle: 'Guerre sur trois fronts',
  summary: 'Bataille simultanée sur trois fronts pour protéger les derniers Sceaux. Un Sceau est inévitablement perdu.',
  suggestedLevel: 12, region: 'Multiple',
  themes: ['Guerre', 'Choix impossibles', 'Sacrifice'],
  scenes: CH9_SCENES, previousChapter: 'ch8', nextChapter: 'ch10'
};

// ---------- CHAPITRE 10 : LA TRAHISON DE L'OMBRE (Niveau 13-14) ----------

const CH10_SCENES: NarrativeScene[] = [
  {
    id: 'ch10_s1_trahison', chapterId: 'ch10', sceneNumber: 1,
    title: 'Le Traître Parmi Nous', type: 'dialogue',
    readAloud: `L'attaque vient de l'intérieur. L'alarme retentit en pleine nuit — les gardes de Sol-Aureus trouvés égorgés, le donjon royal ouvert, et sur les murs de la salle du trône, écrit en sang : "LE SIXIÈME SCEAU EST TOMBÉ."

Le Sceau de la Cathédrale — caché sous le Temple de Solarius depuis des siècles, protégé par la foi elle-même — a été brisé pendant que tout le monde dormait.

Le Grand Prêtre Alduin est retrouvé inconscient dans les décombres du sanctuaire. La Reine Elara est furieuse. Quelqu'un a donné aux cultistes l'accès aux protections divines.

Et les preuves pointent vers un allié impensable.`,
    gmNotes: `TWIST MAJEUR : Le Général Marcus est le traître involontaire. Il a été possédé par un esprit d'ombre depuis le Chapitre 7 (l'embuscade de Malachi). Il ne s'en souvient pas — possession intermittente. Les joueurs doivent le découvrir via Investigation (DC 18) ou Perception (DC 16 pour détecter l'aura d'ombre). Le vrai Marcus est toujours là — il peut être sauvé avec un Exorcisme (Religion DC 20 ou Cristal de Lunara).`,
    dialogues: [{
      npcId: 'npc_queen_elara', npcName: 'Reine Elara',
      lines: [
        { trigger: 'Rage', text: `*Les mains tremblantes.* Six Sceaux. SIX. Il n'en reste qu'UN. Et quelqu'un dans cette salle a trahi tout ce pour quoi nous nous battons. Trouvez-le. Trouvez-le MAINTENANT. Ou nous sommes tous morts.`, tone: 'furieuse' }
      ]
    }],
    objectives: [
      { description: 'Enquêter sur la brisure du 6e Sceau', type: 'investigate', optional: false },
      { description: 'Identifier le traître involontaire', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Marcus identifié', nextScene: 'ch10_s2_exorcisme', label: '→ Sauver Marcus' }
    ],
    skillChecks: [
      { skill: 'Investigation', dc: 18, success: 'Vous trouvez des traces d\'ombre sur les gants du Général. Il a ouvert les portes du sanctuaire lui-même — mais ne s\'en souvient pas.', failure: 'Les preuves sont confuses. Lysandra suggère un sort de Détection.' },
      { skill: 'Perception', dc: 16, success: 'L\'aura d\'ombre autour de Marcus est visible brièvement quand il cligne des yeux — un éclat noir dans ses pupilles.', failure: 'Rien de visible. Peut-être que Théodore pourrait aider avec un sort de divination.' }
    ],
    estimatedMinutes: 20, mood: 'paranoïa',
    music: 'Suspense — cordes discordantes, battement de cœur', location: 'Sol-Aureus — Palais Royal'
  },
  {
    id: 'ch10_s2_exorcisme', chapterId: 'ch10', sceneNumber: 2,
    title: 'L\'Exorcisme', type: 'combat',
    readAloud: `Le Général Marcus s'effondre quand vous le confrontez. La possession prend le dessus — son corps se tord, ses yeux deviennent entièrement noirs, et une voix qui n'est pas la sienne parle : "Vous êtes trop tard. Le Maître attend derrière le dernier voile."

L'esprit d'ombre tente de prendre le contrôle total. Marcus se bat de l'intérieur, sa volonté de fer luttant contre des siècles de ténèbres. Vous devez l'aider — avec le Cristal de Lunara, la prière, ou la force brute si nécessaire.

C'est un combat contre l'ombre elle-même, dans le corps d'un allié.`,
    gmNotes: `Combat inhabituel : l'ennemi est un Esprit d'Ombre Supérieur (CR 12) qui possède Marcus. Les joueurs ne peuvent PAS tuer Marcus. Options : 1) Cristal de Lunara (utilisation automatique réussie), 2) Religion DC 20 (exorcisme classique), 3) Combat spirituel (3 rounds de JDS de Sagesse DC 16 par un joueur volontaire entrant dans l'esprit de Marcus). Si réussi, Marcus est sauvé mais affaibli. Si échoué, Marcus meurt — perte majeure d'allié.`,
    dialogues: [{
      npcId: 'npc_general_marcus', npcName: 'Général Marcus (possédé)',
      lines: [
        { trigger: 'La voix de l\'ombre', text: `*La voix de Marcus alterne avec celle de l'ombre.* AIDEZ... moi... JE NE CONTRÔLE... Le Maître... PLUS RIEN... marchera... S'IL VOUS PLAÎT... quand le soleil... TUEZ-MOI SI...`, tone: 'possession-torturée' }
      ]
    }],
    objectives: [
      { description: 'Exorciser l\'esprit d\'ombre du Général Marcus', type: 'special', optional: false },
      { description: 'Sauver Marcus vivant (optionnel mais souhaitable)', type: 'special', optional: true }
    ],
    transitions: [
      { condition: 'Marcus sauvé', nextScene: 'ch10_s3_derniere_ligne', label: '→ Dernière ligne de défense' },
      { condition: 'Marcus mort', nextScene: 'ch10_s3_derniere_ligne', label: '→ Deuil et résolution' }
    ],
    encounters: ['Esprit d\'Ombre Supérieur (CR 12) — dans le corps de Marcus'],
    estimatedMinutes: 25, mood: 'angoisse-espoir',
    music: 'Exorcisme — orgue, voix déformées, crescendo', location: 'Sol-Aureus — Donjon Royal'
  },
  {
    id: 'ch10_s3_derniere_ligne', chapterId: 'ch10', sceneNumber: 3,
    title: 'La Dernière Ligne', type: 'transition',
    readAloud: `Six Sceaux sur sept sont brisés. Le dernier — le Sceau de Kuldahar, protégé par Ael'thyrion le Dragon de Cristal — est tout ce qui sépare Aethelgard de l'apocalypse.

"Le Dragon tiendra," dit le Chieftain Ragnar. "Mais pas éternellement."

La Reine Elara prend la parole. "Alors nous ne lui demandons pas de tenir éternellement. Nous marchons sur le Temple du Miroir. Nous y accomplissons le Rituel de Scellement AVANT que le dernier Sceau ne tombe. Et nous fermons cette porte pour toujours." 

Elle vous regarde. "Êtes-vous prêts ?"`,
    gmNotes: `FIN DU CHAPITRE 10. Transition vers l'acte final. L'alliance se mobilise pour une offensive sur le Temple du Miroir. Le plan : arriver au Temple, accomplir le Rituel avec les Fragments collectés, sceller le Miroir définitivement. C'est le début de la fin — les chapitres 11-15 sont l'acte final continu.`,
    dialogues: [],
    objectives: [
      { description: 'Se préparer pour l\'assaut final sur le Temple du Miroir', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 10', nextScene: 'ch11_s1_siege', label: '→ Ch.11 : Le Siège de Sol-Aureus' }
    ],
    loot: ['10000 PO', 'Équipement de guerre de l\'Alliance', 'Bénédiction des Trois Factions'],
    estimatedMinutes: 10, mood: 'résolution-épique',
    music: 'Héroïque — thème principal repris, cuivres', location: 'Sol-Aureus — Salle du Trône'
  }
];

export const CHAPTER_10: NarrativeChapter = {
  id: 'ch10', number: 10, title: 'La Trahison de l\'Ombre',
  subtitle: 'Possession, exorcisme et résolution',
  summary: 'Un allié proche est révélé comme traître involontaire. Exorcisme et préparation pour l\'assaut final.',
  suggestedLevel: 13, region: 'Sol-Aureus',
  themes: ['Trahison', 'Possession', 'Résolution'],
  scenes: CH10_SCENES, previousChapter: 'ch9', nextChapter: 'ch11'
};

// ---------- CHAPITRE 11 : LE SIÈGE DE SOL-AUREUS (Niveau 14) ----------

const CH11_SCENES: NarrativeScene[] = [
  {
    id: 'ch11_s1_siege', chapterId: 'ch11', sceneNumber: 1,
    title: 'L\'Armée des Ombres', type: 'narration',
    readAloud: `L'horizon s'assombrit. Pas de nuages — l'ombre elle-même dévore le ciel. Une armée se matérialise autour de Sol-Aureus : des milliers de créatures d'ombre, des démons, des morts-vivants, et au centre, la forteresse mobile de Malachi — une tour d'obsidienne flottante qui crache des éclairs noirs.

Malachi ne marche pas sur le Temple du Miroir. Il marche sur Sol-Aureus. Il veut détruire l'Alliance avant qu'elle ne puisse agir.

Les cloches de la cité sonnent le tocsin. Les soldats prennent position. Les mages activent les défenses. Et vous vous tenez sur les remparts, face à l'apocalypse.`,
    gmNotes: `SIÈGE MASSIF. Combat en 3 phases : 1) Défense des murs (compétence de commandement), 2) Percée ennemie (combat direct), 3) Duel contre le lieutenant de Malachi. L'alliance des chapitres précédents affecte directement la difficulté : alliance forte = renforts nains et barbares, alliance faible = défense désespérée.`,
    dialogues: [{
      npcId: 'npc_queen_elara', npcName: 'Reine Elara',
      lines: [
        { trigger: 'Avant la bataille', text: `*En armure de guerre, épée au poing.* Je ne resterai pas sur mon trône pendant que mon peuple meurt. *Elle monte sur les remparts.* Soldats d'Aethelgard ! Ce jour, nous ne défendons pas seulement une cité — nous défendons le monde ! Tenez vos positions !`, tone: 'héroïque' }
      ]
    }],
    objectives: [
      { description: 'Défendre Sol-Aureus contre le siège', type: 'combat', optional: false },
      { description: 'Commander les troupes alliées', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Murs tenus', nextScene: 'ch11_s2_percee', label: '→ Percée ennemie' }
    ],
    encounters: ['Phase 1: Défense des murs (commandement)', 'Phase 2: 6x Démon Majeur (CR 7)', 'Phase 3: Lieutenant Var\'kul (CR 13)'],
    estimatedMinutes: 30, mood: 'siège-épique',
    music: 'Siège — orchestre complet, cors de guerre', location: 'Sol-Aureus — Remparts'
  },
  {
    id: 'ch11_s2_percee', chapterId: 'ch11', sceneNumber: 2,
    title: 'La Tour d\'Obsidienne', type: 'combat',
    readAloud: `Les murs tiennent, mais Malachi change de tactique. Sa tour d'obsidienne avance, abattant les défenses magiques avec des rayons de ténèbres concentrés. Les mages tombent un par un, épuisés.

"Il faut détruire cette tour !" crie Théodore. "Si elle atteint les portes, rien ne l'arrêtera !"

L'accès est impossible par le sol — trop d'ennemis. Mais le dragon Ael'thyrion a quitté Kuldahar pour cette bataille. Il peut vous porter jusqu'à la tour. C'est un vol suicide à travers un ciel de ténèbres, mais c'est la seule option.`,
    gmNotes: `Vol sur le dos du Dragon de Cristal vers la Tour d'Obsidienne. Phase d'approche : esquive des projectiles (3x JDS Dextérité DC 15, dégâts 3d10 force par échec). À l'intérieur de la tour : 3 Cristaux de Puissance à détruire (CA 18, 50 HP chacun, immunité magie). Gardiens : 2x Gardien d'Obsidienne (CR 10). Détruire les 3 cristaux fait tomber la tour.`,
    dialogues: [{
      npcId: 'npc_crystal_dragon', npcName: 'Ael\'thyrion',
      lines: [
        { trigger: 'Vol', text: `*Sa voix résonne dans vos esprits.* Accrochez-vous, mortels. Ce vol ne sera pas agréable. Mais je ne laisserai pas tomber des héros. Pas aujourd'hui. *Il déploie ses ailes de cristal et s'élance dans le ciel noir.*`, tone: 'déterminé' }
      ]
    }],
    objectives: [
      { description: 'Voler jusqu\'à la Tour d\'Obsidienne sur le dragon', type: 'special', optional: false },
      { description: 'Détruire les 3 Cristaux de Puissance', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Tour détruite', nextScene: 'ch11_s3_victoire_amere', label: '→ Victoire amère' }
    ],
    encounters: ['2x Gardien d\'Obsidienne (CR 10)'],
    estimatedMinutes: 25, mood: 'action-aérienne',
    music: 'Vol de combat — orchestre frénétique', location: 'Ciel au-dessus de Sol-Aureus'
  },
  {
    id: 'ch11_s3_victoire_amere', chapterId: 'ch11', sceneNumber: 3,
    title: 'Victoire et Perte', type: 'transition',
    readAloud: `La Tour d'Obsidienne s'effondre dans un tonnerre d'ombre et de cristal brisé. L'armée de Malachi vacille — sans son centre de commandement, les créatures d'ombre perdent leur coordination. Les alliés chargent. Le siège est brisé.

Mais la victoire a un goût de cendres. Le Grand Prêtre Alduin est tombé dans la bataille, épuisant sa dernière prière pour maintenir le bouclier divin. Grimhild Marteau-de-Glace est gravement blessée. Et les pertes parmi les soldats sont terrifiantes.

Et Malachi... Malachi n'était pas dans la tour. C'était un leurre. Pendant le siège, il est parti vers Kuldahar. Vers le dernier Sceau.

La course est lancée.`,
    gmNotes: `FIN DU CHAPITRE 11. Victoire militaire mais perte stratégique. Alduin meurt (perte émotionnelle forte), Grimhild blessée. Malachi a utilisé le siège comme diversion. Le dernier Sceau est en danger. Les joueurs doivent foncer vers Kuldahar — mais ils sont épuisés. Repos court possible, pas repos long.`,
    dialogues: [],
    objectives: [
      { description: 'Survivre au siège de Sol-Aureus', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 11', nextScene: 'ch12_s1_miroir', label: '→ Ch.12 : Le Miroir s\'Ouvre' }
    ],
    loot: ['12000 PO', 'Armure d\'Alduin (relique, +3)', 'Gratitude de l\'Alliance'],
    estimatedMinutes: 10, mood: 'victoire-pyrrhique',
    music: 'Élégie de guerre — violoncelle solo', location: 'Sol-Aureus — Place du Palais'
  }
];

export const CHAPTER_11: NarrativeChapter = {
  id: 'ch11', number: 11, title: 'Le Siège de Sol-Aureus',
  subtitle: 'Bataille massive et diversion de Malachi',
  summary: 'Défense de Sol-Aureus contre l\'armée des ombres. Victoire militaire mais Malachi utilise le siège comme diversion pour atteindre le dernier Sceau.',
  suggestedLevel: 14, region: 'Sol-Aureus',
  themes: ['Guerre', 'Sacrifice', 'Diversion'],
  scenes: CH11_SCENES, previousChapter: 'ch10', nextChapter: 'ch12'
};

// ---------- CHAPITRE 12 : LE MIROIR S'OUVRE (Niveau 15) ----------

const CH12_SCENES: NarrativeScene[] = [
  {
    id: 'ch12_s1_miroir', chapterId: 'ch12', sceneNumber: 1,
    title: 'Le Dernier Sceau Tombe', type: 'narration',
    readAloud: `Vous arrivez trop tard. Le cadavre d'Ael'thyrion gît dans sa caverne de glace, ses écailles de cristal brisées, son cœur de lumière éteint. Le dragon qui avait veillé pendant 120 ans est mort en combattant Malachi. Et le dernier Sceau... brisé. 

Le monde tremble. Littéralement. Le sol craque, le ciel se déchire, et au loin — même depuis Kuldahar — vous pouvez voir la lueur malveillante du Miroir des Ombres qui s'active dans les Terres Brûlées. Le portail s'ouvre. Le Seigneur des Ombres commence à passer.

Vous n'avez pas empêché l'ouverture. Mais vous pouvez encore le fermer. Si vous accomplissez le Rituel de Scellement au Temple du Miroir avant que le Seigneur ne traverse complètement.

Combien de temps ? "Heures," murmure Théodore. "Peut-être un jour. Pas plus."`,
    gmNotes: `POINT DE NON-RETOUR ABSOLU. Le Miroir est ouvert. Le Seigneur des Ombres est en transit — pas encore complètement matérialisé. Les joueurs ont un compte à rebours fictionnel de 24h pour atteindre le Temple du Miroir et accomplir le Rituel. Ael'thyrion est mort — perte émotionnelle majeure. Le Fragment de Sceau #7 (dernier) est récupérable dans les débris du Sceau.`,
    dialogues: [{
      npcId: 'npc_theodore', npcName: 'Théodore',
      lines: [
        { trigger: 'Le plan', text: `*En larmes devant le corps du dragon, mais fonctionnel.* Le Rituel. C'est notre dernière chance. Nous avons les Fragments — six, peut-être sept si on récupère celui du dernier Sceau. Nous avons le savoir des Elfes. Il nous faut le Temple du Miroir et... et des héros prêts à y laisser une part d'eux-mêmes. *Il vous regarde.* Je viens avec vous.`, tone: 'résolu-brisé' }
      ]
    }],
    objectives: [
      { description: 'Récupérer le Fragment de Sceau #7 dans les débris', type: 'collect', optional: false },
      { description: 'Se lancer vers le Temple du Miroir (24h)', type: 'travel', optional: false }
    ],
    transitions: [
      { condition: 'Départ vers le Temple', nextScene: 'ch12_s2_traversee', label: '→ Traversée des Terres Brûlées' }
    ],
    loot: ['Fragment de Sceau #7 (dernier)', 'Larme d\'Ael\'thyrion (artefact, +3 vs démons)'],
    estimatedMinutes: 15, mood: 'désespoir-résolution',
    music: 'Requiem du dragon — harpe brisée, silence', location: 'Kuldahar — Caverne du Dragon'
  },
  {
    id: 'ch12_s2_traversee', chapterId: 'ch12', sceneNumber: 2,
    title: 'L\'Apocalypse en Marche', type: 'exploration',
    readAloud: `Les Terres Brûlées sont devenues un paysage d'apocalypse. Le ciel est fendu en deux — d'un côté, la lumière mourante du soleil ; de l'autre, les ténèbres du Plan d'Ombre qui suintent dans la réalité. Des créatures impossibles errent entre les deux mondes, mi-réelles mi-spectrales.

Le Temple du Miroir est visible au loin, auréolé d'un pilier de lumière noire qui monte jusqu'aux nuages. L'énergie est palpable — l'air crépite d'électricité d'ombre, et chaque pas vous rapproche d'une puissance écrasante.

Et Malachi vous attend. Vous le savez. Il veut que vous veniez.`,
    gmNotes: `Traversée d'urgence : 3 obstacles rapides (pas de combat complet). 1) Faille d'ombre (Athlétisme DC 16 pour sauter), 2) Créatures spectrales (Intimidation DC 14 ou combat rapide), 3) Tempête d'ombre (Constitution DC 15 ou 4d6 dégâts nécrotiques). Le Temple est atteint en fin de scène.`,
    dialogues: [],
    objectives: [
      { description: 'Traverser les Terres Brûlées apocalyptiques', type: 'travel', optional: false },
      { description: 'Atteindre le Temple du Miroir', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Temple atteint', nextScene: 'ch12_s3_malachi_final', label: '→ Confrontation avec Malachi' }
    ],
    skillChecks: [
      { skill: 'Athlétisme', dc: 16, success: 'Vous franchissez la faille d\'un bond.', failure: 'Chute : 3d6 dégâts contondants.' },
      { skill: 'Constitution (JDS)', dc: 15, success: 'Vous résistez à la tempête d\'ombre.', failure: '4d6 dégâts nécrotiques pour chaque membre.' }
    ],
    estimatedMinutes: 15, mood: 'apocalypse',
    music: 'Fin du monde — orchestre massif, chaos', location: 'Terres Brûlées — Route vers le Temple'
  },
  {
    id: 'ch12_s3_malachi_final', chapterId: 'ch12', sceneNumber: 3,
    title: 'La Chute de Malachi', type: 'combat',
    readAloud: `Malachi vous attend au seuil du Temple. Il n'est plus l'homme émacié que vous avez affronté dans la Sylve. L'énergie du Miroir ouvert l'a transformé — son corps est à moitié ombre, à moitié chair, ses yeux brûlent de ténèbres, et sa voix est un chœur de mille murmures.

"Vous êtes tellement prévisibles." Il écarte les bras. "Le rituel. Toujours le rituel. Mais comprenez-vous ce qui se passe ? Le Maître ne DÉTRUIT pas — il TRANSFORME. L'Ombre n'est pas le mal. L'Ombre est la vérité que la lumière cache. Et vous... vous vous accrochez à un mensonge."

Il lève les mains, et le monde s'assombrit encore davantage.

"Mais si vous insistez pour mourir en héros... qu'il en soit ainsi."`,
    gmNotes: `BOSS FIGHT MAJEUR. Malachi Transcendant (CR 16) : résistances à tout sauf radiant, sorts de niveau 7+, aura d'ombre (désavantage aux JDS dans un rayon de 9m). 3 phases : Phase 1 (100%-60% HP) — sorts offensifs. Phase 2 (60%-30%) — invoque 4 Ombres (CR 3). Phase 3 (30%-0%) — forme d'ombre pure, vulnérable aux Fragments de Sceau (dégâts x2 si utilisés comme focus). IMPORTANT : Si les joueurs utilisent le Cristal de Lunara ou la Larme d'Ael'thyrion, bonus de +5 aux jets d'attaque contre lui. FIN DU CHAPITRE 12 après sa défaite.`,
    dialogues: [{
      npcId: 'npc_malachi', npcName: 'Malachi Transcendant',
      lines: [
        { trigger: 'Phase 3', text: `*Sa forme se disloque.* Non... le Maître... avait promis... Je devais être... immortel... *Il s'effondre en ombres.* Vous... ne pouvez pas... le vaincre... Il n'est pas... comme moi... Il EST... l'Ombre... *Mort.*`, tone: 'défait' }
      ]
    }],
    objectives: [
      { description: 'Vaincre Malachi Transcendant (3 phases)', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 12', nextScene: 'ch13_s1_plan_ombre', label: '→ Ch.13 : Le Plan d\'Ombre' }
    ],
    encounters: ['Malachi Transcendant (CR 16)', '4x Ombre (CR 3) — Phase 2'],
    loot: ['15000 PO', 'Bâton de Malachi (+3, sorts d\'ombre)', 'Clé du Temple du Miroir'],
    estimatedMinutes: 35, mood: 'duel-final',
    music: 'Boss final — chœurs latins, orchestre complet', location: 'Temple du Miroir — Parvis'
  }
];

export const CHAPTER_12: NarrativeChapter = {
  id: 'ch12', number: 12, title: 'Le Miroir s\'Ouvre',
  subtitle: 'Le dernier Sceau tombe et Malachi est vaincu',
  summary: 'Les 7 Sceaux sont brisés. Course désespérée vers le Temple du Miroir et duel final contre Malachi.',
  suggestedLevel: 15, region: 'Kuldahar → Terres Brûlées',
  themes: ['Apocalypse', 'Boss fight', 'Point de non-retour'],
  scenes: CH12_SCENES, previousChapter: 'ch11', nextChapter: 'ch13'
};

// ---------- CHAPITRE 13 : LE PLAN D'OMBRE (Niveau 16-17) ----------

const CH13_SCENES: NarrativeScene[] = [
  {
    id: 'ch13_s1_plan_ombre', chapterId: 'ch13', sceneNumber: 1,
    title: 'De l\'Autre Côté du Miroir', type: 'exploration',
    readAloud: `Le Temple du Miroir est un cauchemar architectural — des colonnes tordues, des escaliers qui montent dans toutes les directions, et au centre, le Miroir lui-même : un portail de dix mètres de haut, encadré de runes anciennes, qui irradie une lumière noire si intense qu'elle dévore la lumière alentour.

Et à travers le Miroir, vous pouvez voir l'Autre Côté. Le Plan d'Ombre — un monde inversé, une parodie cauchemardesque d'Aethelgard où tout est ombre et silence et horreur.

Le Rituel de Scellement doit être accompli DE L'AUTRE CÔTÉ. Depuis l'intérieur du Plan d'Ombre. Théodore le confirme avec une grimace. "Le verrou ne peut être tourné que de l'intérieur."

Entrer dans le Plan d'Ombre signifie peut-être ne jamais en revenir.`,
    gmNotes: `ENTRÉE DANS LE PLAN D'OMBRE. Le Miroir est le portail — traversée unidirectionnelle (pas de retour tant que le Rituel n'est pas accompli). Le Plan d'Ombre est un reflet tordu d'Aethelgard. Physique altérée : tout sort de lumière/feu est à demi-puissance, sorts d'ombre à double puissance. Les joueurs perdent 1d4 HP temporaire par heure (drain ambiant). La Larme d'Ael'thyrion protège du drain (rayon de 3m).`,
    dialogues: [{
      npcId: 'npc_lysandra', npcName: 'Lysandra',
      lines: [
        { trigger: 'Avant la traversée', text: `*Sa voix est un murmure.* Mon peuple a traversé ce Miroir il y a des siècles pour le sceller la première fois. Aucun n'est revenu. *Elle serre votre main.* Cette fois, nous reviendrons. Parce que nous devons.`, tone: 'déterminée-terrifiée' }
      ]
    }],
    objectives: [
      { description: 'Traverser le Miroir vers le Plan d\'Ombre', type: 'special', optional: false },
      { description: 'Explorer l\'Aethelgard inversé', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Miroir traversé', nextScene: 'ch13_s2_gardiens', label: '→ Les Gardiens de l\'Ombre' }
    ],
    estimatedMinutes: 15, mood: 'horreur-cosmique',
    music: 'Plan d\'Ombre — résonance inversée, silence oppressant', location: 'Plan d\'Ombre — Portail d\'entrée'
  },
  {
    id: 'ch13_s2_gardiens', chapterId: 'ch13', sceneNumber: 2,
    title: 'Les Gardiens du Seigneur', type: 'combat',
    readAloud: `Le Plan d'Ombre n'est pas vide. Trois Gardiens Primordiaux — des entités d'ombre pure, immenses et anciennes — bloquent la route vers le Cœur du Plan où le Rituel doit être accompli. Ils sont les derniers défenseurs du Seigneur des Ombres, et ils n'ont jamais été vaincus.

Le premier est une masse de tentacules d'ombre — le Dévoreur.
Le second est une silhouette humanoïde de quatre mètres de haut, armée d'une faux de ténèbres — le Faucheur.
Le troisième est une présence invisible qui attaque l'esprit — le Murmureur.

Trois combats. Trois épreuves. Et après — le Seigneur lui-même attend.`,
    gmNotes: `TRIPLE BOSS GAUNTLET. Les 3 Gardiens sont affrontés séquentiellement sans repos entre eux. Le Dévoreur (CR 14, tentacules, grapple DC 18), le Faucheur (CR 15, faux, peur DC 17), le Murmureur (CR 14, psychique, JDS Sagesse DC 19). Récompense pour chaque victoire : restauration partielle (2d10 HP après chaque gardien). Fragment de lumière récupéré de chaque gardien — nécessaire pour le Rituel.`,
    dialogues: [],
    objectives: [
      { description: 'Vaincre le Dévoreur', type: 'combat', optional: false },
      { description: 'Vaincre le Faucheur', type: 'combat', optional: false },
      { description: 'Vaincre le Murmureur', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: '3 Gardiens vaincus', nextScene: 'ch13_s3_coeur', label: '→ Le Cœur du Plan d\'Ombre' }
    ],
    encounters: ['Le Dévoreur (CR 14)', 'Le Faucheur (CR 15)', 'Le Murmureur (CR 14)'],
    loot: ['3x Fragment de Lumière (composant rituel)', 'Restauration 2d10 HP après chaque gardien'],
    estimatedMinutes: 40, mood: 'survie-épuisante',
    music: 'Gardiens — percussions tribales, dissonance', location: 'Plan d\'Ombre — Voie des Gardiens'
  },
  {
    id: 'ch13_s3_coeur', chapterId: 'ch13', sceneNumber: 3,
    title: 'Le Cœur des Ténèbres', type: 'narration',
    readAloud: `Au centre du Plan d'Ombre, le monde s'ouvre sur un vide — un gouffre sans fond entouré d'un cercle de pierre flottant. C'est le Cœur. L'endroit où le Rituel de Scellement doit être accompli.

Et là, suspendu au-dessus du vide, une forme massive se matérialise lentement. Le Seigneur des Ombres. Il n'a pas de forme fixe — il est UN avec l'ombre, une conscience malveillante qui occupe tout l'espace autour de vous. Ses yeux sont deux étoiles mourantes, et sa voix est le silence qui absorbe le son.

"Bienvenue, mortels." La non-voix résonne dans vos os. "J'attendais depuis si longtemps."

Le Rituel doit être accompli face à cette entité. Il ne vous arrêtera pas avec force — il essaiera de vous convaincre de ne pas le faire.`,
    gmNotes: `FIN DU CHAPITRE 13. Le Seigneur des Ombres ne combat pas encore — il observe et parle. C'est un être de pure persuasion et corruption. Il va tenter de convaincre individuellement chaque joueur que le Scellement est une erreur. JDS Sagesse DC 20 pour résister (avec avantage si un allié encourage). Le Chapitre 14 commence avec le Rituel proprement dit.`,
    dialogues: [{
      npcId: 'npc_shadow_lord', npcName: 'Le Seigneur des Ombres',
      lines: [
        { trigger: 'Tentation', text: `Tu as perdu tant de choses. Des amis. Des alliés. Un dragon. Et pour quoi ? Pour maintenir un monde qui te craint, qui t'oubliera sitôt la menace passée. L'Ombre ne demande rien. L'Ombre offre tout — la paix, la puissance, l'oubli de la douleur. Pose les Fragments. Laisse le Miroir ouvert. Et tout s'arrête.`, tone: 'séduction-absolue' }
      ]
    }],
    objectives: [
      { description: 'Atteindre le Cœur du Plan d\'Ombre', type: 'explore', optional: false },
      { description: 'Résister à la tentation du Seigneur des Ombres (JDS Sagesse DC 20)', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 13', nextScene: 'ch14_s1_rituel', label: '→ Ch.14 : Le Rituel de Scellement' }
    ],
    skillChecks: [
      { skill: 'Sagesse (JDS)', dc: 20, success: 'Sa voix glisse sur vous comme de l\'eau sur la pierre. Vous savez qui vous êtes.', failure: 'Pendant un instant — un seul instant — vous considérez son offre. L\'ombre vous enveloppe. Un allié doit vous rappeler à la réalité.' }
    ],
    estimatedMinutes: 15, mood: 'confrontation-cosmique',
    music: 'Silence cosmique — drone basse, murmures', location: 'Plan d\'Ombre — Le Cœur'
  }
];

export const CHAPTER_13: NarrativeChapter = {
  id: 'ch13', number: 13, title: 'Le Plan d\'Ombre',
  subtitle: 'Traversée du Miroir et les Gardiens Primordiaux',
  summary: 'Les héros traversent le Miroir vers le Plan d\'Ombre, affrontent trois Gardiens Primordiaux, et arrivent au Cœur face au Seigneur des Ombres.',
  suggestedLevel: 16, region: 'Plan d\'Ombre',
  themes: ['Horreur cosmique', 'Survie', 'Tentation'],
  scenes: CH13_SCENES, previousChapter: 'ch12', nextChapter: 'ch14'
};

// ---------- CHAPITRE 14 : LE RITUEL DE SCELLEMENT (Niveau 17-18) ----------

const CH14_SCENES: NarrativeScene[] = [
  {
    id: 'ch14_s1_rituel', chapterId: 'ch14', sceneNumber: 1,
    title: 'Les Sept Fragments', type: 'narration',
    readAloud: `Théodore commence le Rituel. Les sept Fragments de Sceau sont disposés en cercle sur la pierre flottante. Les trois Fragments de Lumière récupérés des Gardiens servent de catalyseurs. Lysandra chante une incantation elfique — la même que ses ancêtres ont chanté il y a des millénaires.

Le cercle s'illumine. La lumière combat l'ombre. Et le Seigneur des Ombres comprend que vous ne renoncerez pas.

"Alors il en sera ainsi. COMBAT."

La forme massive se condense, se concentre, et pour la première fois — le Seigneur des Ombres prend une forme physique.`,
    gmNotes: `DÉBUT DU BOSS FINAL. Le Seigneur des Ombres (CR 20, créature Légendaire) se matérialise pour interrompre le Rituel. Le Rituel prend 10 ROUNDS pour se compléter. Théodore et Lysandra maintiennent le Rituel — les joueurs doivent PROTÉGER le cercle rituel tout en combattant le Seigneur. Si le Seigneur atteint le cercle, le Rituel échoue (=TPK narratif). Le Seigneur a 3 actions légendaires par round.`,
    dialogues: [{
      npcId: 'npc_theodore', npcName: 'Théodore',
      lines: [
        { trigger: 'Rituel', text: `*Les mains brillantes d'énergie.* Dix rounds. C'est tout ce dont j'ai besoin. Dix rounds pour fermer cette porte à jamais. *Il vous regarde avec une détermination absolue.* Ne le laissez pas m'atteindre. Quoi qu'il arrive — ne le laissez pas m'atteindre.`, tone: 'absolu' }
      ]
    }],
    objectives: [
      { description: 'Maintenir le Rituel de Scellement (10 rounds)', type: 'special', optional: false },
      { description: 'Empêcher le Seigneur des Ombres d\'atteindre le cercle rituel', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Combat engagé', nextScene: 'ch14_s2_boss_final', label: '→ Le Seigneur des Ombres — Combat Final' }
    ],
    estimatedMinutes: 10, mood: 'rituel-combat',
    music: 'Rituel — chœurs ascendants, orchestre de guerre', location: 'Plan d\'Ombre — Cercle Rituel'
  },
  {
    id: 'ch14_s2_boss_final', chapterId: 'ch14', sceneNumber: 2,
    title: 'L\'Affrontement Final', type: 'combat',
    readAloud: `Le Seigneur des Ombres est une horreur incarnée. Sa forme est un géant d'ombre de quinze mètres de haut, avec des bras multiples qui fouettent l'air comme des fléaux. Chaque coup qu'il porte arrache des morceaux de réalité. Le sol sous vos pieds craque et se dissout.

Mais la lumière du Rituel grandit. Round après round, les Fragments brillent plus fort. L'ombre recule. Le Seigneur hurle — un son qui n'est pas un son, qui est l'absence de tout son, qui est le vide entre les étoiles.

Et quelque part dans ce chaos, Théodore comprend quelque chose. Le Rituel demande un sacrifice. Un port d'ancrage. Quelqu'un doit rester de l'autre côté du Miroir quand il se ferme.

Quelqu'un ne rentrera pas.`,
    gmNotes: `BOSS FINAL — COMBAT EN 3 PHASES. Phase 1 (Rounds 1-3) : Seigneur des Ombres à pleine puissance (CR 20). 3 attaques par round + 3 actions légendaires. Phase 2 (Rounds 4-6) : Seigneur affaibli par le Rituel (CR 18, perd les résistances). Phase 3 (Rounds 7-10) : Seigneur désespéré — attaques plus puissantes mais plus désordonnées (CR 16 effectif, mais dégâts x1.5).

TWIST DU SACRIFICE : Au Round 7, Théodore annonce que le Rituel nécessite un ancrage vivant côté Ombre. Quelqu'un doit rester. Options : 1) Un PNJ se sacrifie (Lysandra, Ragnar, ou Théodore lui-même), 2) Un joueur se porte volontaire (héroïsme ultime), 3) Intelligence DC 22 — solution alternative avec la Larme d'Ael'thyrion comme ancrage (personne ne meurt).

Ne révélez PAS l'option 3 sans le jet d'Intelligence. La tension du sacrifice est le climax émotionnel de toute la campagne.`,
    dialogues: [{
      npcId: 'npc_theodore', npcName: 'Théodore',
      lines: [
        { trigger: 'Le sacrifice', text: `*Sa voix tremble pour la première fois.* Le Rituel... il n'est pas complet. Il faut un ancrage. Une conscience vivante, liée des deux côtés du Miroir, pour maintenir le sceau fermé. Pour toujours. *Ses yeux sont pleins de larmes.* L'un de nous... doit rester ici.`, tone: 'dévastée' }
      ]
    }],
    objectives: [
      { description: 'Survivre 10 rounds face au Seigneur des Ombres', type: 'combat', optional: false },
      { description: 'Résoudre le dilemme du sacrifice', type: 'choice', optional: false }
    ],
    transitions: [
      { condition: 'Rituel complété', nextScene: 'ch14_s3_scellement', label: '→ Le Scellement' }
    ],
    encounters: ['Le Seigneur des Ombres (CR 20 → CR 18 → CR 16)'],
    skillChecks: [
      { skill: 'Intelligence', dc: 22, success: 'EUREKA — la Larme d\'Ael\'thyrion ! Le cristal du dragon peut servir d\'ancrage à la place d\'une âme vivante. Le dragon veille même dans la mort.', failure: 'Pas de solution alternative visible. Le sacrifice semble inévitable.' }
    ],
    estimatedMinutes: 45, mood: 'climax-absolu',
    music: 'Boss final — orchestre complet, chœurs, crescendo ultime', location: 'Plan d\'Ombre — Cercle Rituel'
  },
  {
    id: 'ch14_s3_scellement', chapterId: 'ch14', sceneNumber: 3,
    title: 'Le Miroir se Ferme', type: 'narration',
    readAloud: `La lumière explose. Les Fragments de Sceau fusionnent en un seul anneau de lumière dorée qui enveloppe le Miroir. Le Seigneur des Ombres hurle — un cri qui dure une éternité et un instant — et sa forme se dissout dans la lumière.

Le Miroir se ferme. L'ombre recule. Le Plan se replie sur lui-même.

Et vous — miraculeux, impossibles, incroyables vous — retombez de l'autre côté. Dans le monde réel. Sous un ciel qui se déchire d'aube.

Le premier rayon de soleil touche votre visage. Vous êtes vivants. Le monde est sauvé.

Les héros regardent le Miroir — maintenant une simple surface de métal terni, inerte et silencieuse. L'écho du Seigneur des Ombres s'estompe comme un mauvais rêve.

C'est fini.`,
    gmNotes: `FIN DU CHAPITRE 14 — CLIMAX DE LA CAMPAGNE. Le Miroir est scellé. Le Seigneur des Ombres est emprisonné. Tout dépend du sacrifice :
- Si la Larme d'Ael'thyrion a été utilisée : tout le monde rentre. Fin heureuse maximale.
- Si un PNJ s'est sacrifié : retour avec deuil. Lysandra, Ragnar, ou Théodore laissé derrière.
- Si un joueur s'est sacrifié : moment de deuil extrême. Le joueur "mort" peut avoir une scène finale dans l'épilogue (vision, message depuis l'au-delà).

Donnez aux joueurs le temps d'absorber ce moment. Pas de mécanique. Juste la narration.`,
    dialogues: [],
    objectives: [
      { description: 'Sceller le Miroir des Ombres pour l\'éternité', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 14', nextScene: 'ch15_s1_aube', label: '→ Ch.15 : Épilogue — L\'Aube Nouvelle' }
    ],
    estimatedMinutes: 10, mood: 'catharsis',
    music: 'Lumière — harpes, flûtes, aube musicale', location: 'Temple du Miroir — Monde Réel'
  }
];

export const CHAPTER_14: NarrativeChapter = {
  id: 'ch14', number: 14, title: 'Le Rituel de Scellement',
  subtitle: 'Le combat final et le sacrifice ultime',
  summary: 'Combat final contre le Seigneur des Ombres pendant le Rituel de Scellement. Dilemme du sacrifice. Le Miroir se ferme.',
  suggestedLevel: 17, region: 'Plan d\'Ombre',
  themes: ['Boss final', 'Sacrifice', 'Victoire'],
  scenes: CH14_SCENES, previousChapter: 'ch13', nextChapter: 'ch15'
};

// ---------- CHAPITRE 15 : ÉPILOGUE — L'AUBE NOUVELLE (Niveau 18-20) ----------

const CH15_SCENES: NarrativeScene[] = [
  {
    id: 'ch15_s1_aube', chapterId: 'ch15', sceneNumber: 1,
    title: 'Le Retour des Héros', type: 'narration',
    readAloud: `Sol-Aureus vous accueille comme des légendes vivantes. Les rues sont pavoisées de bannières dorées, les cloches sonnent sans interruption, et une foule immense crie votre nom — chaque nom, individuellement, scandé par des milliers de voix.

La Reine Elara vous attend au palais, en robe de cérémonie cette fois, pas en armure de guerre. Le Général Marcus — s'il a survécu — est à ses côtés, le bras en écharpe mais souriant. Le Chieftain Ragnar lève sa hache en signe de respect. Le Thane Durinn verse une larme dans sa barbe — la première larme naine en trois générations, selon lui.

"Vous avez fait ce que les dieux n'ont pas pu," dit la Reine. "Vous avez sauvé le monde. Et le monde s'en souviendra."`,
    gmNotes: `CÉLÉBRATION. Moment de joie pure après toute l'horreur. Chaque PNJ survivant a un mot pour les joueurs. Si un PNJ est mort, un moment de silence est observé à leur mémoire. Récompenses cérémonielles et titres de noblesse. Laissez les joueurs profiter — ils l'ont mérité.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara', npcName: 'Reine Elara',
        lines: [
          { trigger: 'Cérémonie', text: `Par les pouvoirs qui me sont conférés par la Couronne d'Aethelgard, je vous nomme — chacun de vous — Gardiens du Miroir. Protecteurs du Royaume. Héros d'Aethelgard. *Elle place un médaillon d'or autour de votre cou.* Que votre nom soit gravé dans la pierre et chanté par les bardes pour l'éternité.`, tone: 'cérémonie-émue' }
        ]
      },
      {
        npcId: 'npc_ragnar', npcName: 'Chieftain Ragnar',
        lines: [
          { trigger: 'Respect', text: `*Il vous serre l'avant-bras.* Vous avez le cœur d'un barbare. C'est le plus grand compliment que je puisse faire. *Un rare sourire.* Vous serez toujours les bienvenus dans les Steppes. Ma tente est votre tente.`, tone: 'respect-fraternel' }
        ]
      }
    ],
    objectives: [
      { description: 'Recevoir les honneurs de l\'Alliance', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Cérémonie terminée', nextScene: 'ch15_s2_epilogues', label: '→ Épilogues individuels' }
    ],
    loot: ['25000 PO', 'Titre : Gardien du Miroir', 'Médaillon d\'Or d\'Aethelgard (artefact)', 'Propriété foncière dans Sol-Aureus'],
    estimatedMinutes: 15, mood: 'triomphe-émotion',
    music: 'Triomphe — fanfares royales, orchestre festif', location: 'Sol-Aureus — Palais Royal'
  },
  {
    id: 'ch15_s2_epilogues', chapterId: 'ch15', sceneNumber: 2,
    title: 'Destins Forgés', type: 'dialogue',
    readAloud: `Les jours passent. La menace a disparu. Le monde guérit, lentement mais sûrement. Les Terres Brûlées commencent à reverdir — des pousses vertes percent l'obsidienne. Les fantômes de la Sylve Murmurante trouvent enfin le repos.

Et vous — héros, légendes, amis — vous devez décider de ce que sera votre avenir. Le monde ne vous doit rien de plus. Vous avez tout donné. Qu'allez-vous faire maintenant que le combat est terminé ?`,
    gmNotes: `ÉPILOGUES INDIVIDUELS. Demandez à CHAQUE joueur ce que fait son personnage après la victoire. Suggestions : s'installer, fonder une guilde, explorer de nouveaux mondes, enseigner, régner, disparaître. Théodore reprend ses recherches. Lysandra retourne parmi les Elfes pour les guider vers une nouvelle ère. Ragnar unit les tribus pour de bon. La Reine construit un monument aux héros.

Si un personnage s'est sacrifié dans le Plan d'Ombre, un dernier rêve ou vision de ce personnage peut apparaître à ses compagnons — un adieu silencieux, un sourire, une paix trouvée dans l'éternité.`,
    dialogues: [{
      npcId: 'npc_theodore', npcName: 'Théodore',
      lines: [
        { trigger: 'Adieu', text: `*Il vous serre dans ses bras — chose qu'il n'a jamais faite.* J'ai passé ma vie dans les livres. Vous m'avez montré que l'aventure est le meilleur des professeurs. *Ses yeux brillent.* Venez me voir à l'académie. J'écris un livre. Sur vous. Il s'appellera "Les Gardiens du Miroir." J'espère que le titre vous plaît.`, tone: 'émotion-profonde' }
      ]
    }],
    objectives: [
      { description: 'Décider du destin de chaque héros', type: 'choice', optional: false },
      { description: 'Faire ses adieux aux alliés', type: 'special', optional: true }
    ],
    transitions: [
      { condition: 'Épilogues terminés', nextScene: 'ch15_s3_fin', label: '→ Fin de la Campagne' }
    ],
    estimatedMinutes: 20, mood: 'nostalgie-espoir',
    music: 'Épilogue — thème principal au piano, lent', location: 'Sol-Aureus — Divers'
  },
  {
    id: 'ch15_s3_fin', chapterId: 'ch15', sceneNumber: 3,
    title: 'FIN — Les Gardiens du Miroir', type: 'transition',
    readAloud: `Des années passent. Le monde change, grandit, oublie et se souvient.

Dans une taverne, quelque part, un barde accorde sa lyre. Un groupe de jeunes aventuriers entre — les yeux brillants, l'armure trop grande, l'épée trop lourde. Ils s'assoient et le barde commence son histoire.

"Laissez-moi vous raconter l'histoire des Gardiens du Miroir. De héros ordinaires qui ont fait des choses extraordinaires. D'un monde au bord du gouffre, sauvé par le courage, l'amitié, et un peu de chance."

Le barde sourit.

"L'histoire commence dans une forêt. La nuit tombe. Un vieil homme demande de l'aide..."

Et le cycle continue.

FIN DE LA CAMPAGNE : LES SCEAUX DU CRÉPUSCULE`,
    gmNotes: `FIN ABSOLUE. Lisez le texte à voix haute avec émotion. Le cycle qui se referme — les nouveaux aventuriers en taverne, le barde racontant VOTRE histoire — est le plus beau miroir de toute campagne de JDR. Les joueurs étaient les héros, et maintenant leur légende inspire la prochaine génération.

REMERCIEZ VOS JOUEURS. Sérieusement. 15 chapitres, des dizaines de sessions, des centaines d'heures. Ils méritent un tonnerre d'applaudissements.

Note: Si vous voulez continuer, la campagne peut avoir une suite — "Les Sceaux de l'Aube" — où les enfants des héros originaux font face à une nouvelle menace. Mais c'est une autre histoire.`,
    dialogues: [],
    objectives: [
      { description: 'FIN DE LA CAMPAGNE', type: 'special', optional: false }
    ],
    transitions: [],
    estimatedMinutes: 5, mood: 'fin-parfaite',
    music: 'Thème final — orchestre complet, reprise du thème principal, lent et majestueux', location: 'Une taverne, quelque part, des années plus tard'
  }
];

export const CHAPTER_15: NarrativeChapter = {
  id: 'ch15', number: 15, title: 'Épilogue — L\'Aube Nouvelle',
  subtitle: 'Fin de la campagne Les Sceaux du Crépuscule',
  summary: 'Célébration de la victoire, épilogues individuels des héros, et fin cyclique de la campagne.',
  suggestedLevel: 18, region: 'Sol-Aureus',
  themes: ['Épilogue', 'Héritage', 'Nouvelle aube'],
  scenes: CH15_SCENES, previousChapter: 'ch14'
};

// ==================== EXPORT PRINCIPAL ====================

export const ALL_CHAPTERS: NarrativeChapter[] = [
  CHAPTER_1, CHAPTER_2, CHAPTER_3, CHAPTER_4, CHAPTER_5,
  CHAPTER_6, CHAPTER_7, CHAPTER_8, CHAPTER_9, CHAPTER_10,
  CHAPTER_11, CHAPTER_12, CHAPTER_13, CHAPTER_14, CHAPTER_15
];

export function getChapterById(id: string): NarrativeChapter | undefined {
  return ALL_CHAPTERS.find(ch => ch.id === id);
}

export function getSceneById(sceneId: string): NarrativeScene | undefined {
  for (const ch of ALL_CHAPTERS) {
    const scene = ch.scenes.find(s => s.id === sceneId);
    if (scene) return scene;
  }
  return undefined;
}

export function getAllScenes(): NarrativeScene[] {
  return ALL_CHAPTERS.flatMap(ch => ch.scenes);
}
