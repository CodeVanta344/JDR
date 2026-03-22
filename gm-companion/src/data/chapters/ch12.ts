/**
 * CHAPITRE 12 : ÉPILOGUE — L'AUBE D'UN NOUVEAU MONDE (Fin de campagne)
 * 4 scènes — Victoire, conséquences, retour, épilogue personnalisé
 */
import type { NarrativeScene, NarrativeChapter } from './types';

const CH12_SCENES: NarrativeScene[] = [
  {
    id: 'ch12_s1_apres', chapterId: 'ch12', sceneNumber: 1,
    title: 'L\'Effondrement de la Tour', type: 'narration',
    readAloud: `Le Miroir implose dans un flash de lumière blanche qui aveugle le monde entier pendant trois secondes. Quand la lumière se dissipe, le cadre a disparu. La Tour de Sombrelune craque — sans le Miroir pour la soutenir, la magie qui la maintenait s'effondre.

"LA TOUR S'EFFONDRE ! SORTEZ ! SORTEZ MAINTENANT !"

La descente est un cauchemar de pierre qui s'écroule, d'escaliers qui s'effondrent, et de poussière qui aveugle. Les joueurs sautent, courent, glissent — et émergent des décombres au moment où la Tour s'effondre sur elle-même dans un tonnerre de fin du monde.

Le silence qui suit est assourdissant. Puis — un cri de victoire qui monte de l'armée de l'Alliance. Humains, nains, elfes — tous crient ensemble. Le ciel s'éclaircit. Pour la première fois depuis des jours, le soleil perce les nuages.

La guerre est finie.`,
    gmNotes: `Scène cinématique de l'effondrement. Un seul jet de Dextérité DC 14 pour s'en sortir sans blessures (échec : 2d6 dégâts contondants mais les joueurs s'en sortent). C'est censé être spectaculaire mais pas mortel — pas de TPK dans l'épilogue.

Lysandra et les PNJ alliés survivants rejoignent les joueurs dans les décombres. Moment émotionnel : étreintes, larmes, cris de joie. Grundar frappe son marteau sur le sol et dit "C'est FAIT !" Thalion s'incline devant les joueurs. La Reine Elara, arrivée avec l'arrière-garde, descend de cheval et serre la main de chaque joueur.`,
    dialogues: [
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Victoire', text: `*Couverte de poussière, un couteau à la main, les yeux rouges.* On a... on a réussi ? C'est fini ? *Elle regarde les décombres de la Tour.* C'est fini. *Rire, puis larmes.* C'est FINI ! *Elle vous serre dans ses bras.* Merci. Merci. Merci.`, tone: 'extase-soulagement' }
        ]
      },
      {
        npcId: 'npc_queen_elara', npcName: 'Reine Elara',
        lines: [
          { trigger: 'Gratitude', text: `*En armure de cérémonie, des larmes sur ses joues royales.* Le monde ne connaîtra jamais tous les détails de ce que vous avez fait ici. Mais MOI, je sais. Et je n'oublierai jamais. Vous êtes les Sept — les nouveaux Sept. Ceux qui ont tenu quand tout s'effondrait.`, tone: 'solennelle-émue' }
        ]
      }
    ],
    objectives: [
      { description: 'Survivre à l\'effondrement de la Tour', type: 'special', optional: false },
      { description: 'Célébrer la victoire avec les alliés', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Victoire célébrée', nextScene: 'ch12_s2_consequences', label: '→ Les conséquences' }
    ],
    skillChecks: [
      { skill: 'Dextérité (JDS)', dc: 14, success: 'Vous émergez des décombres sans une égratignure.', failure: 'Quelques pierres vous tombent dessus — 2d6 contondants, mais vous êtes vivants.' }
    ],
    estimatedMinutes: 10, mood: 'victoire-cathartique',
    music: 'Victoire — silence puis explosion de joie, cuivres, chœurs', location: 'Ruines de la Tour de Sombrelune'
  },
  {
    id: 'ch12_s2_consequences', chapterId: 'ch12', sceneNumber: 2,
    title: 'Les Comptes de la Guerre', type: 'narration',
    readAloud: `Dans les jours qui suivent la chute de Sombrelune, le monde commence à guérir — lentement. L'eau noire du lac d'Ashka s'éclaircit. Les arbres morts de la Forêt de Murmures bourgeonnent. Les créatures d'ombre, privées de leur source, se dissolvent comme des cauchemars au matin.

Mais la victoire a un coût. L'armée de l'Alliance a perdu un tiers de ses effectifs. Des villages ont été détruits. Des familles brisées. Le Thane Durinn compte ses morts avec la gravité d'un père. La Reine Elara parcourt les champs de bataille pour donner des noms aux tombes anonymes.

Et dans le silence d'un soir de paix — le premier vrai silence depuis des mois — Lysandra s'assoit au coin d'un feu et dit simplement : "Maintenant... il faut reconstruire."`,
    gmNotes: `Scène de transition émotionnelle. Le MJ doit poser des questions à chaque joueur :
- "Qu'est-ce que votre personnage fait le lendemain de la victoire?"
- "Comment gère-t-il/elle les pertes ?"
- "Qu'est-ce qui a changé en lui/elle depuis le début de cette quête ?"

C'est un moment de respiration narrative avant l'épilogue final. Pas de mécanique — pur RP et storytelling.`,
    dialogues: [
      {
        npcId: 'npc_thane_durinn', npcName: 'Thane Durinn',
        lines: [
          { trigger: 'Bilan', text: `*Assis sur un rocher, sa hache posée à côté de lui.* Trente-sept nains. C'est ce que ça a coûté. *Silence.* Mais chacun d'entre eux est mort avec une hache dans la main et un cri de guerre dans la gorge. Moradin les accueillera dans ses forges éternelles. *Il vous regarde.* Et vous... rentrez chez vous. Vous l'avez mérité.`, tone: 'deuil-respect' }
        ]
      }
    ],
    objectives: [
      { description: 'Mesurer les conséquences de la victoire', type: 'special', optional: false },
      { description: 'Roleplay post-guerre : chaque joueur réfléchit à son personnage', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Retour à Sol-Aureus', nextScene: 'ch12_s3_retour', label: '→ Le retour' }
    ],
    estimatedMinutes: 10, mood: 'deuil-paix',
    music: 'Après-guerre — cordes mélancoliques, silence', location: 'Plaines de Sombrelune — Camp de l\'après-bataille'
  },
  {
    id: 'ch12_s3_retour', chapterId: 'ch12', sceneNumber: 3,
    title: 'Le Retour des Héros', type: 'narration',
    readAloud: `Le retour à Sol-Aureus est un triomphe. Les portes de la ville s'ouvrent en grand, les rues sont bordées de citoyens qui lancent des fleurs et des rubans. Les cloches sonnent. Les enfants courent à côté de l'armée en criant vos noms.

Sur le balcon du palais, la Reine Elara vous attend. Derrière elle, une rangée de trônes — un pour chaque héros. Le Thane Durinn et le Haut Seigneur Thalion sont à ses côtés. Pour la première fois de l'histoire d'Aethelgard, les trois peuples sont unis — non par la guerre, mais par l'espoir.

La Reine lève la main et le silence se fait. "Peuple d'Aethelgard. Aujourd'hui, nous honorons ceux qui nous ont sauvés. Les Sentinelles des Sceaux. Les Nouveaux Héros."

Elle se tourne vers vous. "Ce que vous avez fait ne sera jamais oublié. Pas dans cette génération, ni dans les suivantes. Vous êtes la preuve que le courage de quelques-uns peut sauver le monde."`,
    gmNotes: `Cérémonie de reconnaissance. Chaque joueur reçoit un titre et une récompense personnalisée :
- Titre officiel : "Sentinelle d\'Aethelgard" (reconnaissance dans les trois royaumes)
- Récompense matérielle (au choix du MJ) : terre, or, arme légendaire, titre de noblesse
- Récompense naine : citoyenneté d'Hammerdeep (honneur rare)
- Récompense elfique : accès permanent à la Sylve d'Émeraude

Le MJ devrait PERSONNALISER chaque récompense en fonction de l'arc du personnage. Un guerrier reçoit peut-être une terre, un mage une bibliothèque, un roublard une guilde. Demandez aux joueurs ce que leur personnage souhaite.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara', npcName: 'Reine Elara',
        lines: [
          { trigger: 'Cérémonie', text: `*Posant une médaille d'or sur la poitrine de chaque héros.* Sentinelle d'Aethelgard. Ce titre n'a pas été porté depuis 120 ans — depuis les Sept Héros originaux. Aujourd'hui, il revit. *Sourire.* Et cette fois, tous les Sept sont des héros. Pas de traître dans vos rangs.`, tone: 'solennelle-chaleureuse' }
        ]
      }
    ],
    objectives: [
      { description: 'Assister à la cérémonie de reconnaissance', type: 'special', optional: false },
      { description: 'Recevoir les titres et récompenses', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Cérémonie terminée', nextScene: 'ch12_s4_epilogue', label: '→ Épilogue personnel' }
    ],
    loot: ['Titre : Sentinelle d\'Aethelgard', 'Récompense personnalisée (au choix du MJ/joueur)', 'Citoyenneté d\'Hammerdeep', 'Accès à la Sylve d\'Émeraude'],
    estimatedMinutes: 10, mood: 'triomphe-cérémonie',
    music: 'Triomphe — fanfare, cloches, acclamations', location: 'Sol-Aureus — Palais Royal, Balcon'
  },
  {
    id: 'ch12_s4_epilogue', chapterId: 'ch12', sceneNumber: 4,
    title: 'Ce Qui Vient Après', type: 'narration',
    readAloud: `Les mois passent. Le monde guérit. Les Sceaux, renforcés par le sacrifice de Malachi lui-même (ironiquement, sa magie a été recyclée par les gardiens pour consolider les Sceaux), tiennent bon. La Forêt de Murmures reverdit. Les Plaines de Cendres, pour la première fois depuis un siècle, montrent des signes de vie — un brin d'herbe, un buisson, un oiseau.

L'Alliance des Trois Peuples — humains, nains, elfes — signe un traité de coopération permanent. Pour la première fois, des ambassadeurs nains vivent en surface et des érudits elfiques enseignent dans les universités humaines. Le monde n'est pas parfait — il ne le sera jamais — mais il est VIVANT. Et il a de l'espoir.

Et vous ? Qu'est-il advenu de vous, Sentinelles d'Aethelgard ? Où vous a menés la route ? C'est à vous de le dire.`,
    gmNotes: `ÉPILOGUE PERSONNALISÉ. Le MJ fait un tour de table et demande à CHAQUE joueur : "Que fait votre personnage maintenant que la quête est terminée ?" Laissez-les raconter. C'est LEUR moment. Suggestions :
- Un guerrier fonde une école de combat. Un mage ouvre une bibliothèque. Un roublard disparaît dans la nuit. Un clerc retourne à son temple.
- Lysandra : elle retourne dans la Sylve d'Émeraude comme ambassadrice auprès des humains, mais elle revient souvent visiter ses compagnons.
- Grundar : il devient commandant de la garnison d'Ashka, reconstruisant la cité.
- Théodore : il se retire, heureux, et meurt paisiblement dans son sommeil six mois plus tard. Son fantôme bienveillant hante sa tour.

CROCHET POUR UNE SUITE (optionnel) : Le dernier paragraphe peut inclure un indice que tout n'est pas terminé — un fragment de miroir trouvé par un enfant, un murmure dans l'obscurité, un rêve étrange. Mais c'est OPTIONNEL. La campagne est terminée. Les héros ont gagné. Fin.

"Et quelque part, dans un caveau oublié, un éclat de miroir noir pulse doucement dans le noir. Attendant."`,
    dialogues: [
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra (Épilogue)',
        lines: [
          { trigger: 'Adieu', text: `*Sur le seuil de la Sylve, se retournant une dernière fois.* Vous savez... au début, je pensais que cette quête était pour sauver le monde. Mais en fait... c'était pour trouver ma famille. *Elle montre les joueurs du menton.* Vous. Vous êtes ma famille maintenant. Et une elfe n'oublie JAMAIS sa famille. Pas même dans mille ans. *Sourire.* À bientôt, mes amis. À très bientôt.`, tone: 'adieu-promesse' }
        ]
      }
    ],
    objectives: [
      { description: 'Raconter l\'avenir de chaque personnage-joueur', type: 'special', optional: false },
      { description: 'Conclure la campagne — FIN', type: 'special', optional: false }
    ],
    transitions: [],
    estimatedMinutes: 15, mood: 'épilogue-espoir',
    music: 'Épilogue — thème principal piano, cordes douces, silence final', location: 'Aethelgard — Partout et nulle part'
  }
];
// ── Room Descriptions ────────────────────────────────────────────────
const CH12_ROOMS: import('./types').RoomDescription[] = [
  {
    id: 'grande_salle_sol_aureus', name: 'Grande Salle de Sol-Aureus — Cérémonie',
    readAloud: 'La plus grande salle du palais royal. Des bannières aux couleurs de chaque faction alliée pendent du plafond — le marteau nain, le cerf elfique, le soleil humain. Mille personnes sont assemblées. Le Roi Alderon se tient sur l\'estrade, portant la Couronne de Lumière. Devant lui, quatre trônes vides attendent les héros.',
    gmNotes: 'Moment de RP pur. Le Roi remet des titres, des terres, et des artefacts. Chaque PJ est appelé individuellement. Ajuster les récompenses selon les choix des joueurs tout au long de la campagne. Si un PJ est mort au ch11, un siège est laissé vide avec son arme posée dessus.',
    exits: [
      { direction: 'Extérieur', targetRoomId: 'colline_souvenir', description: 'Portes ouvertes vers la Colline du Souvenir' }
    ],
    dimensions: '50m × 30m, plafond 20m', lighting: 'vif'
  },
  {
    id: 'colline_souvenir', name: 'La Colline du Souvenir',
    readAloud: 'Une colline herbeuse hors des murs de Sol-Aureus. Un nouveau monument y a été érigé — une stèle de marbre blanc portant les noms de tous les tombés. Au sommet, sept flammes éternelles brûlent pour les Sept Héros originaux. Quatre nouvelles flammes viennent d\'être allumées — celles des aventuriers.',
    gmNotes: 'Lieu de la scène finale d\'adieu. Chaque PJ peut y faire une dernière action de RP. Si le Fragment du Miroir a été conservé, il brille faiblement ici — crochet pour une campagne suivante.',
    exits: [{ direction: 'Ville', targetRoomId: 'grande_salle_sol_aureus', description: 'Chemin de terre vers Sol-Aureus' }],
    dimensions: 'Extérieur, colline 30m de rayon', lighting: 'vif'
  }
];

// ── Side Quests (Crochets d'épilogue) ────────────────────────────────
const CH12_SIDE_QUESTS: import('./types').SideQuest[] = [
  {
    id: 'sq_fragment_miroir',
    title: 'Le Fragment du Miroir',
    description: 'Le Fragment du Miroir Brisé que les PJ ont récupéré pulse encore d\'énergie. Un sage de Sol-Aureus, Maître Isolde, insiste pour l\'examiner — mais elle semble trop intéressée.',
    giver: 'Maître Isolde (sage de la cour)',
    hookText: '"Ce fragment... il ne devrait pas encore vibrer. Soit le Miroir n\'est pas entièrement détruit, soit quelque chose d\'autre regarde à travers."',
    reward: 'Crochet vers une campagne suivante (le Miroir tente de se reconstituer dans un autre plan)',
    objectives: [
      'Décider si le Fragment est confié à Isolde, détruit, ou conservé',
      'Si Investigation DC 15 : le Fragment contient une conscience fragmentaire',
      'Si conservé : il murmure des avertissements dans les rêves du porteur'
    ],
    consequenceIfIgnored: 'Isolde vole le Fragment dans la nuit. Crochet pour une future aventure.',
    estimatedMinutes: 15, difficulty: 'facile'
  },
  {
    id: 'sq_couronne_succession',
    title: 'La Question de la Succession',
    description: 'Le Roi Alderon est mourant — les blessures de la guerre l\'ont affaibli. Il souhaite que les héros l\'aident à choisir son successeur parmi trois prétendants, chacun avec ses qualités et ses défauts.',
    giver: 'Roi Alderon (en privé, après la cérémonie)',
    hookText: '"J\'ai peu de temps. Mon royaume a besoin d\'un guide. Aidez-moi à choisir — votre parole vaut plus que celle de n\'importe quel conseiller."',
    reward: 'Influence politique majeure sur l\'avenir d\'Aethelgard',
    objectives: [
      'Écouter les trois prétendants : Prince Edric (honorable mais naïf), Générale Mara (stratège mais autoritaire), Sage Théon (sage mais indécis)',
      'Enquêter sur chacun si désiré (Investigation DC 12 par prétendant)',
      'Conseiller le Roi — le choix affecte l\'épilogue narratif'
    ],
    consequenceIfIgnored: 'Le Roi meurt sans successeur clair. Guerre civile dans l\'épilogue narratif.',
    estimatedMinutes: 20, difficulty: 'moyen'
  }
];

export const CHAPTER_12: NarrativeChapter = {
  id: 'ch12', number: 12, title: 'Épilogue — L\'Aube d\'un Nouveau Monde',
  subtitle: 'La victoire, les récompenses, et ce qui vient après',
  summary: 'Effondrement de la Tour, célébration de la victoire, cérémonie de reconnaissance à Sol-Aureus, et épilogue personnalisé pour chaque joueur.',
  suggestedLevel: 13, region: 'Sol-Aureus → Aethelgard',
  themes: ['Victoire', 'Deuil', 'Célébration', 'Épilogue'],
  scenes: CH12_SCENES, previousChapter: 'ch11',
  sideQuests: CH12_SIDE_QUESTS,
  roomDescriptions: CH12_ROOMS
};
