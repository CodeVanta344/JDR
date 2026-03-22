/**
 * MEGA-DONJON : Les Catacombes Oubliées de Sol-Aureus
 * Acte 1 — Niveau 1-4
 * 10 salles interconnectées sous l'ancien Temple de Sol-Aureus
 */

import type { BookChapter, BookScene } from './gm-book-data';

// ============================================================================
// SALLE 1 : Entrée Secrète sous le Temple
// ============================================================================
const SCENE_ENTREE_SECRETE: BookScene = {
  id: 'catacombes-1-entree-secrete',
  sceneNumber: 1,
  title: "L'Entrée Secrète sous le Temple",
  type: 'exploration',
  location: "Sous-sol du Temple de Sol-Aureus",
  locationId: 'temple-sol-aureus-sous-sol',
  estimatedMinutes: 25,
  readAloud: {
    text: `La trappe dissimulée sous l'autel du Temple de Sol-Aureus s'ouvre dans un grincement lugubre, libérant un souffle d'air vicié qui charrie une odeur de pierre humide et de cire fondue depuis longtemps éteinte. Un escalier en colimaçon s'enfonce dans les ténèbres, ses marches de granit usées par des siècles de passages oubliés.

Les murs du passage sont couverts d'inscriptions gravées dans une langue ancienne — le vieil aethélien, la langue des premiers fondateurs du royaume. Des symboles solaires, autrefois dorés à la feuille d'or, ont perdu leur éclat et ne sont plus que des cicatrices pâles dans la pierre grise. Çà et là, des restes de torches calcinées témoignent d'une époque où ces couloirs étaient encore fréquentés.

À mesure que vous descendez, la température chute. Vos torches projettent des ombres dansantes sur les parois, et chaque pas résonne dans le silence oppressant. L'escalier tourne sur lui-même sept fois — un nombre sacré dans le culte solaire — avant de déboucher sur un palier de pierre noire veinée d'or.

Une arche massive se dresse devant vous, encadrée de deux statues de chevaliers en armure, l'épée plantée dans le sol. Au-dessus de l'arche, une inscription à demi effacée proclame en vieil aethélien des mots que vous parvenez à déchiffrer : « Que seuls les dignes franchissent le seuil des Rois Endormis. »`,
    mood: 'mystérieux, oppressant',
    music: 'Ambiance souterraine, écho lointain, gouttes d\'eau'
  },
  gmNotes: [
    {
      type: 'info',
      text: "L'escalier fait 30 mètres de profondeur. Les inscriptions en vieil aethélien peuvent être déchiffrées avec un jet d'Intelligence (Histoire) DD 12. Elles racontent la fondation du premier temple et mentionnent les « Gardiens Éternels » qui protègent les reliques sacrées."
    },
    {
      type: 'secret',
      text: "Un personnage qui examine attentivement les statues (Perception DD 14) remarque que l'une d'elles tient un médaillon solaire amovible. Ce médaillon est une clé qui ouvre un passage secret dans la Salle 4 (Bibliothèque). Sans ce médaillon, le passage secret nécessite un jet de Crochetage DD 18."
    },
    {
      type: 'tip',
      text: "Si un joueur touche les inscriptions dorées, elles émettent une faible lueur pendant quelques secondes — un indice que la magie solaire imprègne encore les lieux. C'est purement cosmétique mais crée une belle ambiance."
    },
    {
      type: 'warning',
      text: "La trappe se referme automatiquement 10 minutes après ouverture. Les PJ doivent la caler ou trouver un autre moyen de sortir. Il existe une sortie alternative dans la Salle 10 (après le boss)."
    }
  ],
  skillChecks: [
    {
      skill: 'Intelligence (Histoire)',
      dc: 12,
      success: "Vous déchiffrez les inscriptions : elles racontent la consécration du temple par le Roi Solaire Aldric Ier et mentionnent une « relique de lumière pure » scellée dans les profondeurs.",
      failure: "Les inscriptions vous semblent familières mais leur sens vous échappe. Vous reconnaissez seulement le symbole du soleil levant, emblème de la dynastie Sol-Aureus."
    },
    {
      skill: 'Perception',
      dc: 14,
      success: "Vous remarquez que l'une des statues porte un médaillon amovible en forme de soleil. En le retirant délicatement, il se détache avec un clic satisfaisant. Ce médaillon semble important.",
      failure: "Les statues vous paraissent identiques — deux chevaliers figés dans la pierre depuis des siècles. Rien de particulier ne retient votre attention."
    }
  ],
  choices: [
    {
      id: 'choix-entree-1',
      prompt: "L'arche s'ouvre devant vous. Que faites-vous ?",
      options: [
        {
          label: "Franchir l'arche prudemment",
          description: "Avancer avec précaution dans les catacombes",
          consequence: "Vous pénétrez dans la Crypte des Premiers Rois. L'air devient glacial.",
          nextScene: 'catacombes-2-crypte-rois'
        },
        {
          label: "Examiner les statues en détail",
          description: "Inspecter les gardiens de pierre avant de continuer",
          consequence: "Votre attention est récompensée : vous découvrez un médaillon caché.",
          skillCheck: {
            skill: 'Perception',
            dc: 14,
            success: "Vous trouvez le médaillon solaire — un artefact clé pour la suite du donjon.",
            failure: "Vous ne trouvez rien de particulier sur les statues, mais au moins vous n'avez déclenché aucun piège."
          }
        },
        {
          label: "Tenter de déchiffrer toutes les inscriptions",
          description: "Prendre le temps d'étudier les écritures anciennes",
          consequence: "L'étude prend 20 minutes mais vous apprenez des informations précieuses sur le donjon.",
          skillCheck: {
            skill: 'Intelligence (Histoire)',
            dc: 12,
            success: "Vous comprenez la disposition générale des catacombes et obtenez un avantage sur votre prochain jet de Navigation ici.",
            failure: "Le vieil aethélien reste trop hermétique. Vous perdez du temps sans résultat concret."
          }
        }
      ]
    }
  ],
  loot: [
    "Médaillon Solaire (clé de la Salle 4, valeur sentimentale/historique)",
    "2 torches éternelles (lumière magique faible, durent 8 heures)",
    "Fragment de parchemin (indice sur le Sceau de Terre)"
  ],
  nextScenes: ['catacombes-2-crypte-rois'],
  mapMovement: { from: 'temple-sol-aureus', to: 'catacombes-palier' }
};

// ============================================================================
// SALLE 2 : Crypte des Premiers Rois
// ============================================================================
const SCENE_CRYPTE_ROIS: BookScene = {
  id: 'catacombes-2-crypte-rois',
  sceneNumber: 2,
  title: "La Crypte des Premiers Rois",
  type: 'combat',
  location: "Crypte Royale, Catacombes de Sol-Aureus",
  locationId: 'catacombes-crypte-royale',
  estimatedMinutes: 35,
  readAloud: {
    text: `La salle qui s'ouvre devant vous est immense — une cathédrale souterraine dont la voûte se perd dans l'obscurité. Six sarcophages de marbre blanc sont disposés en cercle autour d'un pilier central gravé de runes dorées. Chaque sarcophage porte le nom et le blason d'un roi de la dynastie Sol-Aureus, des souverains dont les règnes remontent à plus de mille ans.

Le pilier central pulse d'une lueur bleutée intermittente, comme un cœur de pierre qui bat encore faiblement. Des filaments d'énergie spectrale relient les sarcophages au pilier, formant une toile de lumière pâle qui baigne la salle d'une clarté surnaturelle.

L'air est chargé d'électricité statique. Vos cheveux se dressent sur votre nuque, et une sensation de présence invisible vous enveloppe. Les blasons sur les sarcophages représentent des soleils dans différentes phases — levant, zénith, couchant — comme un cycle éternel gravé dans la pierre.

Soudain, un murmure s'élève — pas un son physique, mais une voix qui résonne directement dans vos esprits : « Qui ose troubler le repos des Souverains de Lumière ? Prouvez votre valeur ou rejoignez-nous dans l'éternité. » Les couvercles de deux sarcophages commencent à glisser dans un raclement de pierre...`,
    mood: 'solennel, menaçant',
    music: 'Chœurs spectraux, résonance de pierre'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Deux Spectres Gardiens émergent des sarcophages. Ce sont les esprits des Rois Aldric III et Séraphine Ière. Ils ne sont pas foncièrement malveillants — ils testent les intrus. Si les PJ se montrent respectueux (Persuasion DD 14), les spectres posent des questions au lieu d'attaquer."
    },
    {
      type: 'lore',
      text: "Les six rois enterrés ici sont : Aldric Ier (fondateur), Séraphine Ière (bâtisseuse), Aldric III (guerrier), Célestine (magicienne), Tharion (diplomate) et Aldric V (le dernier roi légitime avant l'usurpation). Le pilier central canalise l'énergie résiduelle de leurs âmes pour maintenir les protections du temple."
    },
    {
      type: 'secret',
      text: "Le sarcophage d'Aldric V est vide — son corps n'a jamais été retrouvé après la Bataille du Crépuscule. Ce détail est un indice majeur pour la suite de la campagne : Aldric V n'est peut-être pas mort."
    },
    {
      type: 'tip',
      text: "Si les PJ examinent les sarcophages avant le combat, offrez-leur un avantage tactique : les spectres sont vulnérables à la lumière divine. Un Clerc ou Paladin peut utiliser Renvoi des morts-vivants pour les affaiblir (désavantage sur leurs attaques pendant 1 tour)."
    }
  ],
  encounter: {
    name: "Les Gardiens Spectraux de la Crypte",
    enemies: [
      {
        name: "Spectre du Roi Aldric III",
        hp: 32,
        atk: 5,
        ac: 13,
        cr: 2,
        abilities: [
          "Toucher Spectral : +5 au toucher, 2d6+2 dégâts nécrotiques",
          "Forme Intangible : Résistance aux dégâts non-magiques",
          "Aura de Froid : Les créatures à 1,5m subissent 1d4 dégâts de froid au début de leur tour",
          "Drain de Vie : Sur un coup critique, la cible perd 1d4 PV max temporairement (récupérés après un repos long)"
        ]
      },
      {
        name: "Spectre de la Reine Séraphine",
        hp: 28,
        atk: 4,
        ac: 14,
        cr: 2,
        abilities: [
          "Lame Spectrale : +4 au toucher, 2d6+1 dégâts nécrotiques",
          "Bouclier Fantôme : Réaction, +2 CA contre une attaque",
          "Cri de la Reine : (Recharge 5-6) Toutes les créatures dans 6m font un jet de Sagesse DD 13 ou sont Effrayées pendant 1 tour",
          "Lien Spectral : Si Aldric III est détruit, Séraphine gagne +2 à l'attaque et aux dégâts (rage de vengeance)"
        ]
      }
    ],
    terrain: [
      "Sarcophages : couverture partielle (+2 CA)",
      "Pilier central : couverture totale d'un côté",
      "Sol lisse : pas de terrain difficile",
      "Lumière spectrale : éclairage faible (désavantage sur Perception basée sur la vue au-delà de 10m)"
    ],
    tactics: "Les spectres émergent lentement (1er tour : surprise impossible, ils se matérialisent). Aldric III engage le combattant le plus proche au corps à corps. Séraphine reste à distance, utilisant son Cri de la Reine dès que possible, puis sa Lame Spectrale. Si l'un est détruit, l'autre devient plus agressif. Ils ne poursuivent pas au-delà de la crypte.",
    loot: [
      "Épée Spectrale du Roi (épée longue +1, émet une lueur bleutée, 1d8+1 tranchant + 1d4 nécrotique)",
      "Diadème de Séraphine (accessoire, +1 aux jets de Sagesse, valeur : 150 po)",
      "2 Potions de Soin (2d4+2 PV)",
      "75 pièces d'or anciennes frappées du sceau Sol-Aureus"
    ]
  },
  skillChecks: [
    {
      skill: 'Persuasion',
      dc: 14,
      success: "Les spectres acceptent de vous interroger plutôt que de combattre. Si vous répondez correctement à leur question (« Quel est le serment des Rois de Lumière ? » — réponse trouvable dans la Salle 4), ils vous laissent passer et offrent leur bénédiction (+1 aux jets de sauvegarde pendant 1 heure).",
      failure: "Les spectres considèrent votre tentative comme une insulte. Le combat commence immédiatement, et ils bénéficient d'un tour de surprise."
    },
    {
      skill: 'Religion',
      dc: 13,
      success: "Vous reconnaissez les rites funéraires solaires et savez que ces spectres sont liés au pilier central. Détruire le pilier les bannirait définitivement, mais cela affaiblirait aussi les protections du temple en surface.",
      failure: "Ces rites funéraires vous sont inconnus. Les spectres vous semblent être de simples morts-vivants hostiles."
    }
  ],
  choices: [
    {
      id: 'choix-crypte-1',
      prompt: "Les spectres sont vaincus (ou apaisés). Plusieurs passages s'offrent à vous.",
      options: [
        {
          label: "Prendre le couloir nord (dalles de pierre usées)",
          description: "Un couloir étroit aux dalles suspectes",
          consequence: "Vous vous dirigez vers la Salle des Pièges.",
          nextScene: 'catacombes-3-salle-pieges'
        },
        {
          label: "Prendre le couloir est (odeur de vieux parchemin)",
          description: "Un passage d'où émane une odeur de papier ancien",
          consequence: "Vous vous dirigez vers la Bibliothèque Souterraine.",
          nextScene: 'catacombes-4-bibliotheque'
        },
        {
          label: "Examiner le sarcophage vide d'Aldric V",
          description: "Le sixième sarcophage semble étrangement vide",
          consequence: "Vous découvrez un indice crucial sur le destin d'Aldric V.",
          skillCheck: {
            skill: 'Investigation',
            dc: 15,
            success: "À l'intérieur du sarcophage vide, vous trouvez un message gravé : « Le dernier roi n'est pas mort. Il attend au-delà du Voile. » Un fragment de carte indique un lieu dans les Montagnes du Crépuscule.",
            failure: "Le sarcophage est vide et poussiéreux. Rien ne semble indiquer pourquoi le corps est absent."
          }
        }
      ]
    }
  ],
  loot: [
    "Épée Spectrale du Roi (+1, lueur bleutée, 1d8+1 + 1d4 nécrotique)",
    "Diadème de Séraphine (+1 Sagesse, 150 po)",
    "2 Potions de Soin (2d4+2)",
    "75 po anciennes",
    "Fragment de carte (si sarcophage examiné)"
  ],
  nextScenes: ['catacombes-3-salle-pieges', 'catacombes-4-bibliotheque'],
  previousScene: 'catacombes-1-entree-secrete'
};

// ============================================================================
// SALLE 3 : Salle des Pièges
// ============================================================================
const SCENE_SALLE_PIEGES: BookScene = {
  id: 'catacombes-3-salle-pieges',
  sceneNumber: 3,
  title: "La Salle des Pièges",
  type: 'exploration',
  location: "Couloir piégé, Catacombes de Sol-Aureus",
  locationId: 'catacombes-couloir-pieges',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le couloir nord s'élargit brusquement pour former une longue salle rectangulaire d'environ vingt mètres de long sur cinq de large. Le sol est pavé de dalles hexagonales de trois couleurs différentes — or, argent et bronze — disposées selon un motif qui semble régulier mais dont la logique vous échappe au premier regard.

Les murs sont percés de fentes étroites à intervalles réguliers, d'où dépasse parfois la pointe d'un mécanisme rouillé. Au plafond, des chaînes retiennent ce qui ressemble à des blocs de pierre prêts à tomber. L'ensemble forme un tableau menaçant de périls mécaniques qui a traversé les siècles.

Au milieu de la salle, les restes d'un squelette gisent sur une dalle de bronze, transpercé par trois flèches encore fichées dans sa cage thoracique. Un sac à dos en cuir moisi repose à côté, son contenu éparpillé par le temps. Visiblement, vous n'êtes pas les premiers à tenter la traversée.

Au fond de la salle, une lourde porte de fer forgé est ornée d'un soleil en relief. Elle semble être la seule issue, et quelque chose vous dit que l'atteindre ne sera pas aussi simple que de marcher en ligne droite.`,
    mood: 'tendu, dangereux',
    music: 'Cliquetis mécaniques, silence pesant'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le motif des dalles suit une logique solaire : il faut marcher uniquement sur les dalles dorées, qui forment le tracé d'un soleil levant vu du dessus. Marcher sur l'argent déclenche des flèches (1d6 perçant, Dextérité DD 13 pour esquiver). Marcher sur le bronze ouvre une fosse (2d6 contondant, chute de 3m, Dextérité DD 14 pour se rattraper)."
    },
    {
      type: 'tip',
      text: "Un joueur qui a réussi le jet d'Histoire dans la Salle 1 reconnaît le motif solaire et obtient un avantage sur son premier jet dans cette salle. Le squelette au sol est un indice : il est tombé sur une dalle de bronze (fosse) puis a été achevé par les flèches en essayant de remonter."
    },
    {
      type: 'warning',
      text: "Si tout le groupe marche sur les mauvaises dalles simultanément, les pièges se déclenchent en cascade. Limitez à 2 déclenchements par tour pour ne pas tuer un groupe de niveau 1. Les pièges se réarment en 1 minute."
    },
    {
      type: 'secret',
      text: "Le sac du squelette contient un journal de pilleur de tombes qui décrit partiellement le chemin correct (« toujours suivre l'or du soleil levant ») et mentionne un « trésor au-delà des miroirs » (indice pour la Salle 7)."
    }
  ],
  skillChecks: [
    {
      skill: 'Perception',
      dc: 13,
      success: "Vous repérez les mécanismes dans les murs et remarquez que certaines dalles sont légèrement plus enfoncées que d'autres — les dalles dorées semblent plus stables.",
      failure: "La salle vous semble uniformément dangereuse. Impossible de distinguer les dalles sûres des piégées."
    },
    {
      skill: 'Dextérité (Acrobatie)',
      dc: 13,
      success: "Vous traversez la salle en bondissant agilement de dalle dorée en dalle dorée, évitant tous les pièges.",
      failure: "Vous trébuchez et posez le pied sur une mauvaise dalle. Un piège se déclenche ! (1d6 dégâts perçants ou 2d6 contondants selon la dalle)"
    },
    {
      skill: 'Intelligence (Investigation)',
      dc: 14,
      success: "En étudiant le motif, vous comprenez la logique : les dalles dorées forment un chemin en forme de soleil levant. Vous pouvez guider le groupe en toute sécurité.",
      failure: "Le motif vous semble aléatoire. Vous devrez traverser à l'instinct."
    },
    {
      skill: 'Dextérité (Escamotage)',
      dc: 16,
      success: "Vous parvenez à désactiver les mécanismes des flèches pour toute une rangée de dalles, créant un passage sûr de 3 mètres.",
      failure: "En manipulant le mécanisme, vous déclenchez un tir de flèche. Jet de Dextérité DD 13 ou 1d6 perçant."
    }
  ],
  choices: [
    {
      id: 'choix-pieges-1',
      prompt: "Comment traversez-vous la salle piégée ?",
      options: [
        {
          label: "Suivre le motif solaire (dalles dorées)",
          description: "Tenter de déchiffrer le motif et suivre les dalles sûres",
          consequence: "L'approche intellectuelle — nécessite un jet d'Investigation.",
          skillCheck: {
            skill: 'Investigation',
            dc: 14,
            success: "Vous guidez le groupe sans encombre à travers le labyrinthe de dalles.",
            failure: "Votre analyse est incomplète. Un membre du groupe déclenche un piège (1d6 dégâts)."
          },
          nextScene: 'catacombes-5-carrefour-inonde'
        },
        {
          label: "Traverser en acrobatie",
          description: "Bondir de dalle en dalle avec agilité",
          consequence: "L'approche athlétique — plus risquée mais plus rapide.",
          skillCheck: {
            skill: 'Acrobatie',
            dc: 13,
            success: "Vos bonds précis vous mènent de l'autre côté sans déclencher un seul piège.",
            failure: "Un faux pas ! Vous posez le pied sur une dalle argentée. Trois flèches fusent (1d6 perçant chacune, Dextérité DD 13 pour chaque)."
          },
          nextScene: 'catacombes-5-carrefour-inonde'
        },
        {
          label: "Désactiver les pièges mécaniquement",
          description: "Tenter de neutraliser les mécanismes un par un",
          consequence: "L'approche méthodique — lente mais potentiellement permanente.",
          skillCheck: {
            skill: 'Escamotage',
            dc: 16,
            success: "Après 30 minutes de travail minutieux, vous désactivez tous les pièges. Le passage est sûr pour les retours futurs.",
            failure: "Un mécanisme se déclenche dans vos mains. Jet de Dextérité DD 13 ou 1d8 perçant."
          },
          nextScene: 'catacombes-5-carrefour-inonde'
        },
        {
          label: "Fouiller le squelette d'abord",
          description: "Examiner le corps et ses affaires avant de traverser",
          consequence: "La prudence est récompensée par des indices.",
          skillCheck: {
            skill: 'Investigation',
            dc: 11,
            success: "Le journal du pilleur vous donne un avantage sur votre traversée : +2 au prochain jet dans cette salle.",
            failure: "Le sac est trop détérioré. Vous ne récupérez qu'une bourse de 12 po et un poignard rouillé."
          }
        }
      ]
    }
  ],
  loot: [
    "Journal du pilleur de tombes (indice Salle 7 + chemin des dalles)",
    "Bourse du squelette : 12 po, 34 pa",
    "Dague en argent rouillée (fonctionnelle après nettoyage, utile contre certains morts-vivants)",
    "Potion de Soin mineure (1d4+1 PV) dans le sac"
  ],
  nextScenes: ['catacombes-5-carrefour-inonde', 'catacombes-4-bibliotheque'],
  previousScene: 'catacombes-2-crypte-rois'
};

// ============================================================================
// SALLE 4 : Bibliothèque Souterraine
// ============================================================================
const SCENE_BIBLIOTHEQUE: BookScene = {
  id: 'catacombes-4-bibliotheque',
  sceneNumber: 4,
  title: "La Bibliothèque Souterraine",
  type: 'exploration',
  location: "Bibliothèque oubliée, Catacombes de Sol-Aureus",
  locationId: 'catacombes-bibliotheque',
  estimatedMinutes: 35,
  readAloud: {
    text: `Au bout du couloir est, une double porte en chêne noirci par le temps s'ouvre sur une vision inattendue : une vaste bibliothèque souterraine, miraculeusement préservée par la magie. Des étagères de pierre s'élèvent du sol au plafond sur trois niveaux, reliées par des escaliers en spirale et des passerelles de fer forgé. Des milliers de parchemins, grimoires et tablettes d'argile s'y entassent dans un ordre qui devait autrefois être méticuleux.

Une lueur ambrée émane d'orbes de cristal suspendus au plafond — des lumières magiques qui fonctionnent encore après des siècles, bien que leur éclat soit considérablement diminué. L'air est sec et poussiéreux, chargé de l'odeur reconnaissable entre toutes du vieux papier et du cuir desséché.

Au centre de la salle, un lutrin de marbre blanc supporte un grimoire ouvert dont les pages tournent toutes seules dans un courant d'air invisible. Devant le lutrin, le sol est incrusté d'un cercle de symboles — sept glyphes solaires disposés en arc de cercle, chacun représentant une phase du soleil.

Sur le mur du fond, derrière les étagères, vous distinguez les contours d'une porte secrète — mais elle est scellée par un mécanisme qui semble lié aux glyphes du sol. C'est un puzzle, et la solution se trouve quelque part dans cette bibliothèque.`,
    mood: 'érudit, mystérieux',
    music: 'Silence feutré, craquements de parchemin, bourdonnement magique doux'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le puzzle des glyphes : les 7 symboles doivent être activés dans l'ordre du cycle solaire (Aube, Matin, Zénith, Après-midi, Crépuscule, Nuit, Renaissance). L'ordre est décrit dans un poème trouvable dans le grimoire central. Chaque glyphe émet une note musicale quand on marche dessus."
    },
    {
      type: 'secret',
      text: "Derrière la porte secrète se trouve un petit cabinet contenant le Journal du Dernier Archiviste. Ce journal révèle l'existence des Cinq Sceaux qui maintiennent la prison de Malachar et indique que le premier Sceau est caché « là où la terre touche les racines du monde » (indice pour le Sceau de Terre). C'est la première révélation majeure de la campagne sur la menace principale."
    },
    {
      type: 'tip',
      text: "Si un PJ possède le Médaillon Solaire de la Salle 1, il peut ouvrir la porte secrète directement sans résoudre le puzzle. Le médaillon s'insère dans un creux au centre du cercle de glyphes."
    },
    {
      type: 'lore',
      text: "La bibliothèque contient des informations sur l'histoire d'Aethelgard, la magie des Sceaux, les lignées royales et les cultes anciens. Un PJ qui passe 1 heure à étudier obtient un avantage permanent sur les jets d'Intelligence (Histoire) liés au royaume."
    }
  ],
  skillChecks: [
    {
      skill: 'Intelligence (Arcanes)',
      dc: 14,
      success: "Vous comprenez que les glyphes sont liés au cycle solaire et identifiez l'ordre correct en étudiant les symboles. Le puzzle est résolu !",
      failure: "Les glyphes vous semblent être un système de protection magique, mais leur fonctionnement exact vous échappe."
    },
    {
      skill: 'Investigation',
      dc: 13,
      success: "Vous trouvez dans le grimoire central un poème qui décrit le cycle solaire en sept phases. C'est clairement la clé du puzzle.",
      failure: "Le grimoire est écrit en vieil aethélien et vous ne parvenez pas à en extraire d'information utile."
    },
    {
      skill: 'Perception',
      dc: 12,
      success: "Vous remarquez que chaque glyphe émet une note différente quand on marche dessus. En les activant dans le bon ordre, ils forment une mélodie ascendante puis descendante.",
      failure: "La salle est impressionnante mais vous ne remarquez rien de particulier au-delà des évidences."
    }
  ],
  choices: [
    {
      id: 'choix-biblio-1',
      prompt: "La bibliothèque offre plusieurs possibilités.",
      options: [
        {
          label: "Résoudre le puzzle des glyphes",
          description: "Activer les symboles dans le bon ordre",
          consequence: "Le puzzle ouvre la porte secrète vers le cabinet de l'Archiviste.",
          skillCheck: {
            skill: 'Intelligence (Arcanes)',
            dc: 14,
            success: "Les glyphes s'illuminent en séquence. La porte secrète s'ouvre dans un grondement sourd, révélant un petit cabinet poussiéreux.",
            failure: "Vous activez les glyphes dans le mauvais ordre. Une décharge d'énergie solaire vous repousse (1d6 dégâts radiants). Vous pouvez réessayer."
          }
        },
        {
          label: "Utiliser le Médaillon Solaire",
          description: "Insérer le médaillon trouvé dans la Salle 1",
          consequence: "Le médaillon s'emboîte parfaitement. La porte s'ouvre sans effort.",
          nextScene: 'catacombes-5-carrefour-inonde'
        },
        {
          label: "Étudier les archives pendant une heure",
          description: "Prendre le temps de lire les ouvrages anciens",
          consequence: "Vous acquérez des connaissances précieuses sur l'histoire du royaume.",
          skillCheck: {
            skill: 'Intelligence (Histoire)',
            dc: 10,
            success: "Vous obtenez un avantage permanent sur les jets d'Histoire liés à Aethelgard. Vous apprenez aussi l'existence de cinq « Gardiens des Sceaux » dispersés dans le monde.",
            failure: "La plupart des textes sont trop détériorés. Vous apprenez quelques anecdotes historiques sans grande utilité pratique."
          }
        },
        {
          label: "Continuer vers le carrefour inondé",
          description: "Emprunter le passage sud qui descend en pente",
          consequence: "Le passage descend et devient humide. On entend le bruit de l'eau.",
          nextScene: 'catacombes-5-carrefour-inonde'
        }
      ]
    }
  ],
  loot: [
    "Journal du Dernier Archiviste (révélation sur les Cinq Sceaux)",
    "Grimoire de Lumière Mineure (sort : Lumière Sacrée, 1/jour, 2d6 radiant à une cible à 18m)",
    "Parchemin de Protection contre les Morts-Vivants (usage unique)",
    "Encre d'or magique (composante de sort, valeur : 50 po)",
    "3 parchemins de sort de niveau 1 (au choix du MJ)"
  ],
  nextScenes: ['catacombes-5-carrefour-inonde', 'catacombes-3-salle-pieges'],
  previousScene: 'catacombes-2-crypte-rois'
};

// ============================================================================
// SALLE 5 : Carrefour Inondé
// ============================================================================
const SCENE_CARREFOUR_INONDE: BookScene = {
  id: 'catacombes-5-carrefour-inonde',
  sceneNumber: 5,
  title: "Le Carrefour Inondé",
  type: 'combat',
  location: "Carrefour inondé, Catacombes de Sol-Aureus",
  locationId: 'catacombes-carrefour-inonde',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le passage descend en pente douce et vos bottes commencent à clapoter dans une eau noire et glaciale. Rapidement, le niveau monte jusqu'à vos genoux, puis jusqu'à la taille. Le couloir débouche sur une salle circulaire partiellement inondée — un carrefour souterrain où convergent quatre passages.

L'eau stagnante est d'un noir d'encre, opaque et nauséabonde. Des bulles remontent occasionnellement à la surface, libérant des relents de vase et de matière organique en décomposition. La voûte est basse ici — à peine deux mètres — et des stalactites humides suintent un liquide verdâtre qui forme des cercles concentriques à la surface de l'eau.

Au centre du carrefour, une colonne de pierre partiellement effondrée émerge de l'eau, couverte de mousse phosphorescente qui émet une lueur verdâtre maladive. Autour de cette colonne, l'eau semble... bouger. Des ondulations qui ne correspondent à aucun courant naturel. Quelque chose vit là-dessous.

Trois passages s'offrent à vous en plus de celui d'où vous venez : au nord, un tunnel ascendant d'où provient une odeur d'encens ; à l'est, un passage horizontal marqué de reflets orangés ; à l'ouest, un escalier qui plonge dans des eaux plus profondes encore.`,
    mood: 'oppressant, dangereux',
    music: 'Clapotis, gouttes, grondements lointains sous l\'eau'
  },
  gmNotes: [
    {
      type: 'warning',
      text: "La créature dans l'eau est un Étrangleur des Profondeurs — un prédateur tentaculaire qui attaque quiconque entre dans l'eau profonde (au-delà de la taille). Il grapple sa proie et tente de la noyer. C'est un combat dangereux pour des PJ de niveau 1-2 : envisagez de le rendre optionnel (il n'attaque que si on s'approche de la colonne centrale)."
    },
    {
      type: 'info',
      text: "Le passage nord mène au Sanctuaire Corrompu (Salle 6). Le passage est mène à la Forge Abandonnée (Salle 8). Le passage ouest mène à la Galerie des Miroirs (Salle 7). Les PJ doivent choisir leur route — ils peuvent revenir plus tard explorer les autres."
    },
    {
      type: 'tip',
      text: "Si les PJ ont un moyen de geler ou d'assécher l'eau (sort, capacité spéciale), la créature est considérablement affaiblie hors de l'eau (-4 CA, vitesse divisée par deux). Cela récompense la créativité."
    },
    {
      type: 'secret',
      text: "Sous la colonne centrale, au fond de l'eau (3m de profondeur), se trouve un coffre verrouillé contenant un Anneau de Respiration Aquatique. Ce sera très utile pour le Donjon 4 (Temple Englouti). Le cadenas nécessite un jet de Crochetage DD 15 sous l'eau (avec désavantage)."
    }
  ],
  encounter: {
    name: "L'Étrangleur des Profondeurs",
    enemies: [
      {
        name: "Étrangleur des Profondeurs",
        hp: 38,
        atk: 5,
        ac: 12,
        cr: 2,
        abilities: [
          "Tentacules : +5 au toucher (portée 3m), 1d8+3 contondant et la cible est Agrippée (Évasion DD 13)",
          "Constriction : Une cible agrippée subit automatiquement 2d6 contondant au début du tour de l'Étrangleur",
          "Submersion : L'Étrangleur tente de tirer une cible agrippée sous l'eau (Force DD 14 pour résister). Une cible submergée commence à se noyer (Constitution DD 12 chaque tour ou perd 1d6 PV)",
          "Camouflage Aquatique : Invisible dans l'eau trouble, avantage sur sa première attaque",
          "Vulnérabilité : Hors de l'eau, -4 CA et vitesse réduite de moitié"
        ]
      }
    ],
    terrain: [
      "Eau profonde (1m au centre) : terrain difficile, désavantage sur les attaques de mêlée pour les créatures de taille Moyenne",
      "Eau peu profonde (50cm en bordure) : terrain difficile",
      "Colonne centrale : couverture partielle, point d'ancrage possible",
      "Stalactites : un jet d'attaque à distance DD 15 peut en faire tomber une (2d6 contondant, zone 1,5m)"
    ],
    tactics: "L'Étrangleur attend immobile au fond de l'eau. Il attaque le premier PJ qui s'aventure dans l'eau profonde avec son camouflage. Il tente de grapple et noyer une cible à la fois pendant que ses autres tentacules repoussent les sauveteurs. Il fuit sous la colonne s'il tombe en dessous de 10 PV.",
    loot: [
      "Tentacule sectionné (composante alchimique, valeur : 25 po)",
      "Coffre sous l'eau : Anneau de Respiration Aquatique (respirer sous l'eau 1h/jour)",
      "Gemme de phosphorescence (éclaire comme une torche dans l'eau, valeur : 30 po)",
      "Ossements d'un ancien aventurier : bourse de 45 po et une Potion de Nage"
    ]
  },
  skillChecks: [
    {
      skill: 'Perception',
      dc: 14,
      success: "Vous repérez les ondulations anormales dans l'eau et comprenez qu'une créature se cache au fond. Vous n'êtes pas surpris si le combat éclate.",
      failure: "L'eau semble simplement agitée par des courants souterrains naturels. La créature a l'avantage de la surprise."
    },
    {
      skill: 'Nature',
      dc: 13,
      success: "Vous identifiez les signes d'un Étrangleur des Profondeurs et connaissez sa faiblesse : hors de l'eau, il est considérablement affaibli.",
      failure: "Vous n'identifiez pas la menace. Quelque chose vit dans cette eau, mais quoi ?"
    },
    {
      skill: 'Athlétisme',
      dc: 14,
      success: "Vous parvenez à traverser la salle en longeant les murs, évitant l'eau profonde et la créature.",
      failure: "Vous glissez et tombez dans l'eau profonde. La créature attaque immédiatement."
    }
  ],
  choices: [
    {
      id: 'choix-carrefour-1',
      prompt: "Le carrefour offre trois directions. Laquelle choisissez-vous ?",
      options: [
        {
          label: "Passage nord (odeur d'encens)",
          description: "Un tunnel ascendant vers une source de lumière rougeâtre",
          consequence: "Vous montez vers le Sanctuaire Corrompu.",
          nextScene: 'catacombes-6-sanctuaire'
        },
        {
          label: "Passage ouest (escalier descendant)",
          description: "Un escalier qui plonge dans des eaux plus profondes",
          consequence: "L'escalier mène à la Galerie des Miroirs.",
          nextScene: 'catacombes-7-miroirs'
        },
        {
          label: "Passage est (reflets orangés)",
          description: "Un couloir horizontal éclairé de lueurs chaudes",
          consequence: "Les reflets proviennent de la Forge Abandonnée.",
          nextScene: 'catacombes-8-forge'
        },
        {
          label: "Plonger pour fouiller la colonne",
          description: "Tenter de récupérer ce qui se cache sous la colonne",
          consequence: "Risqué, mais potentiellement très lucratif.",
          skillCheck: {
            skill: 'Athlétisme',
            dc: 15,
            success: "Vous trouvez le coffre au fond et récupérez l'Anneau de Respiration Aquatique !",
            failure: "L'Étrangleur vous attrape pendant votre plongée ! Combat en conditions très défavorables."
          }
        }
      ]
    }
  ],
  loot: [
    "Anneau de Respiration Aquatique (coffre sous l'eau)",
    "Gemme de phosphorescence (30 po)",
    "Tentacule alchimique (25 po)",
    "Potion de Nage",
    "45 po en bourse"
  ],
  nextScenes: ['catacombes-6-sanctuaire', 'catacombes-7-miroirs', 'catacombes-8-forge'],
  previousScene: 'catacombes-3-salle-pieges'
};

// ============================================================================
// SALLE 6 : Sanctuaire Corrompu
// ============================================================================
const SCENE_SANCTUAIRE: BookScene = {
  id: 'catacombes-6-sanctuaire',
  sceneNumber: 6,
  title: "Le Sanctuaire Corrompu",
  type: 'exploration',
  location: "Sanctuaire profané, Catacombes de Sol-Aureus",
  locationId: 'catacombes-sanctuaire',
  estimatedMinutes: 25,
  readAloud: {
    text: `Le tunnel ascendant débouche sur une chapelle souterraine autrefois magnifique, aujourd'hui défigurée par une corruption insidieuse. Un autel de marbre blanc se dresse au fond de la salle, mais sa surface est souillée de traces noires — comme si quelqu'un y avait versé de l'encre maudite qui a rongé la pierre elle-même.

Les vitraux magiques encastrés dans les murs — des illusions permanentes qui simulaient la lumière du soleil — sont brisés ou déformés. Là où devaient briller des rayons dorés, des lueurs pourpres et maladives pulsent faiblement, projetant des ombres grotesques sur les bancs de prière renversés.

Des symboles blasphématoires ont été gravés par-dessus les prières solaires originales. L'air empeste l'encens rance mêlé à une odeur métallique — du sang séché. Autour de l'autel, un cercle rituel tracé en cendre noire témoigne d'un rite sombre pratiqué ici récemment... ou du moins, plus récemment que l'abandon supposé des catacombes.

Malgré la corruption, une résistance persiste. Au cœur de l'autel, enchâssée dans le marbre, une gemme dorée pulse encore d'une lumière chaude et pure — le dernier vestige du pouvoir sacré qui consacrait ce lieu.`,
    mood: 'oppressant, sacrilège, espoir fragile',
    music: 'Dissonances, bourdonnement sombre, lueur de lumière'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le sanctuaire a été corrompu par des cultistes de Malachar il y a environ un an. La gemme dans l'autel est un Fragment de Lumière Solaire — elle peut purifier l'autel si on réussit un rituel de purification (Religion DD 14 ou utilisation de sorts divins)."
    },
    {
      type: 'secret',
      text: "Les symboles blasphématoires, si déchiffrés (Arcanes DD 16), révèlent un fragment de la formule utilisée pour affaiblir les Sceaux. C'est un indice crucial : quelqu'un travaille activement à libérer Malachar, et cette personne connaît les catacombes."
    },
    {
      type: 'tip',
      text: "Purifier l'autel est optionnel mais très bénéfique. En cas de succès, tous les PJ reçoivent la Bénédiction de Sol-Aureus : +1 aux jets de sauvegarde contre la nécromancie et les effets de peur pendant 24 heures. De plus, la gemme peut être récupérée comme objet magique."
    },
    {
      type: 'warning',
      text: "Toucher les symboles blasphématoires sans protection inflige 1d6 dégâts nécrotiques et impose un jet de Sagesse DD 12 ou le PJ est Effrayé pendant 1 minute."
    }
  ],
  skillChecks: [
    {
      skill: 'Religion',
      dc: 14,
      success: "Vous accomplissez le rituel de purification. L'autel se nettoie, la lumière dorée se répand dans la salle, chassant les ombres. La Bénédiction de Sol-Aureus vous est accordée à tous.",
      failure: "Le rituel échoue et la corruption résiste. La gemme pulse plus faiblement. Vous pouvez réessayer avec un malus de -2, ou abandonner."
    },
    {
      skill: 'Arcanes',
      dc: 16,
      success: "Vous déchiffrez les symboles : c'est un fragment de rituel visant à « fissurer le Sceau de Terre ». Quelqu'un utilise ces catacombes comme base pour affaiblir les protections de Malachar.",
      failure: "Les symboles sont dans une langue arcanique corrompue. Vous ressentez une nausée en les étudiant mais n'en tirez rien d'utile."
    },
    {
      skill: 'Médecine',
      dc: 12,
      success: "Le sang séché autour de l'autel est récent — quelques semaines au plus. Quelqu'un est venu ici récemment pour accomplir ce rituel sombre.",
      failure: "C'est bien du sang séché, mais vous ne pouvez pas en déterminer l'ancienneté."
    }
  ],
  choices: [
    {
      id: 'choix-sanctuaire-1',
      prompt: "Que faites-vous dans le sanctuaire corrompu ?",
      options: [
        {
          label: "Purifier l'autel",
          description: "Tenter un rituel de purification pour restaurer le lieu sacré",
          consequence: "Un acte de foi et de courage qui pourrait être grandement récompensé.",
          skillCheck: {
            skill: 'Religion',
            dc: 14,
            success: "L'autel est purifié ! Bénédiction de Sol-Aureus obtenue (+1 sauvegardes vs nécromancie/peur, 24h).",
            failure: "La corruption est trop forte. L'autel émet une onde noire qui inflige 1d4 nécrotique à tous les PJ dans 3m."
          }
        },
        {
          label: "Étudier les symboles blasphématoires",
          description: "Déchiffrer les inscriptions des cultistes",
          consequence: "Risqué mais informatif — des indices sur la menace principale.",
          skillCheck: {
            skill: 'Arcanes',
            dc: 16,
            success: "Vous découvrez que des cultistes de Malachar travaillent à briser le Sceau de Terre depuis ces catacombes.",
            failure: "Les symboles résistent à votre analyse et vous causent un mal de tête persistant (-1 aux jets d'Intelligence pendant 1h)."
          }
        },
        {
          label: "Récupérer la gemme sans purifier",
          description: "Arracher le Fragment de Lumière de l'autel corrompu",
          consequence: "Plus rapide mais potentiellement dangereux.",
          skillCheck: {
            skill: 'Force',
            dc: 13,
            success: "Vous arrachez la gemme. Elle brille intensément dans votre main mais l'autel s'effondre, libérant une onde de corruption (1d4 nécrotique à tous).",
            failure: "La gemme est fermement enchâssée. En forçant, vous vous coupez (1d4 tranchant) et la gemme ne bouge pas."
          }
        },
        {
          label: "Quitter la salle et continuer",
          description: "Ce lieu est trop perturbant, mieux vaut avancer",
          consequence: "Vous rebroussez chemin vers le carrefour.",
          nextScene: 'catacombes-5-carrefour-inonde'
        }
      ]
    }
  ],
  loot: [
    "Fragment de Lumière Solaire (gemme, +1d4 radiant 1/jour sur une attaque, valeur : 100 po)",
    "Bénédiction de Sol-Aureus (si purification réussie, +1 sauvegardes vs nécromancie/peur, 24h)",
    "Cendres rituelles (composante alchimique, valeur : 15 po)",
    "Encensoir d'argent (objet religieux, valeur : 40 po)",
    "Notes de cultiste (partielles, indices sur l'identité du traître dans le temple en surface)"
  ],
  nextScenes: ['catacombes-5-carrefour-inonde', 'catacombes-9-tresor'],
  previousScene: 'catacombes-5-carrefour-inonde'
};

// ============================================================================
// SALLE 7 : Galerie des Miroirs
// ============================================================================
const SCENE_GALERIE_MIROIRS: BookScene = {
  id: 'catacombes-7-miroirs',
  sceneNumber: 7,
  title: "La Galerie des Miroirs",
  type: 'combat',
  location: "Galerie des Miroirs, Catacombes de Sol-Aureus",
  locationId: 'catacombes-galerie-miroirs',
  estimatedMinutes: 35,
  readAloud: {
    text: `L'escalier ouest descend dans un passage étroit qui s'ouvre soudain sur une longue galerie dont les murs sont entièrement recouverts de miroirs. Pas des miroirs ordinaires — des surfaces de métal poli, enchantées pour refléter non pas votre apparence physique, mais quelque chose de plus profond. Votre reflet vous regarde avec une expression légèrement différente de la vôtre : plus sombre, plus dure, plus... affamée.

La galerie fait une trentaine de mètres de long et trois de large. Les miroirs se font face de chaque côté, créant un tunnel infini de reflets qui se répètent à l'infini dans les deux directions. La lumière de vos torches rebondit et se multiplie, créant un éclairage désorientant qui semble venir de partout et de nulle part.

À mesure que vous avancez, vos reflets commencent à... diverger. Ils ne copient plus vos mouvements avec exactitude. L'un d'eux s'arrête quand vous marchez. Un autre tourne la tête dans la direction opposée. Un troisième sourit quand vous froncez les sourcils.

Au milieu de la galerie, l'un des miroirs est brisé — un trou béant dans le mur par lequel s'échappe un courant d'air chaud et une lueur rouge palpitante. Et devant ce miroir brisé, votre reflet n'est plus dans le miroir. Il est devant vous, debout dans le couloir, vous regardant avec vos propres yeux qui brillent d'une lueur argentée.`,
    mood: 'inquiétant, surréaliste, oppressant',
    music: 'Échos déformés, murmures inversés, tintements de verre'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Les Doppelgangers de Miroir sont des constructions magiques qui copient les stats du PJ qu'ils reflètent, avec les modifications suivantes : mêmes PV, même CA, même attaque, mais -2 à tous les jets de sauvegarde mentaux (ils n'ont pas de vraie volonté). Créez un Doppelganger par PJ (minimum 2, maximum 4). Chaque Doppelganger combat son « original »."
    },
    {
      type: 'tip',
      text: "Pour simplifier, utilisez les stats de base de chaque PJ sans équipement magique. Les Doppelgangers n'ont pas accès aux objets magiques des PJ, juste à leurs capacités de classe de base. Astuce narrative : les Doppelgangers parlent en miroir (phrases inversées) et ont les personnalités opposées des PJ."
    },
    {
      type: 'secret',
      text: "Briser le miroir d'un Doppelganger le détruit instantanément. Les miroirs ont 15 PV et CA 10. Cependant, briser un miroir sans tuer le Doppelganger associé d'abord libère son énergie qui soigne les Doppelgangers restants de 2d6 PV chacun."
    },
    {
      type: 'warning',
      text: "Si un PJ est réduit à 0 PV par son Doppelganger, le Doppelganger tente de prendre sa place (jet de Sagesse DD 15 pour le PJ inconscient, sinon le Doppelganger absorbe son apparence et le PJ se retrouve piégé dans le miroir jusqu'à ce que le Doppelganger soit détruit)."
    }
  ],
  encounter: {
    name: "Les Doppelgangers de Miroir",
    enemies: [
      {
        name: "Doppelganger de Miroir (Guerrier)",
        hp: 28,
        atk: 4,
        ac: 14,
        cr: 2,
        abilities: [
          "Copie Martiale : Reproduit les attaques au corps à corps du PJ guerrier",
          "Miroir Défensif : Réaction, renvoie 1d4 dégâts radiants quand touché par une attaque de mêlée",
          "Inversion : 1/combat, inverse la position avec son original (le PJ se retrouve où était le Doppelganger)",
          "Vulnérabilité Mentale : -2 aux sauvegardes de Sagesse, Intelligence et Charisme"
        ]
      },
      {
        name: "Doppelganger de Miroir (Mage)",
        hp: 20,
        atk: 5,
        ac: 12,
        cr: 2,
        abilities: [
          "Copie Arcanique : Lance les mêmes sorts que le PJ mage, mais de niveau inférieur",
          "Réflexion de Sort : 1/combat, renvoie un sort de niveau 1 ou moins à son lanceur",
          "Éclat de Miroir : Attaque spéciale, 2d6 radiants dans un cône de 3m",
          "Vulnérabilité Mentale : -2 aux sauvegardes de Sagesse, Intelligence et Charisme"
        ]
      },
      {
        name: "Doppelganger de Miroir (Rôdeur)",
        hp: 24,
        atk: 5,
        ac: 13,
        cr: 2,
        abilities: [
          "Copie Furtive : Reproduit les attaques à distance du PJ rôdeur",
          "Pas de Miroir : Se téléporte de miroir en miroir (mouvement bonus, portée 6m)",
          "Marque Inversée : La cible a un désavantage sur sa prochaine attaque contre le Doppelganger",
          "Vulnérabilité Mentale : -2 aux sauvegardes de Sagesse, Intelligence et Charisme"
        ]
      }
    ],
    terrain: [
      "Galerie étroite (3m de large) : pas de flanquement possible",
      "Miroirs enchantés : reflètent les sorts — un sort de zone peut toucher les reflets ET les réalités",
      "Miroir brisé (centre) : passage vers la Salle 8 (Forge)",
      "Sol de verre : terrain difficile si des miroirs sont brisés (éclats)"
    ],
    tactics: "Chaque Doppelganger engage son original en combat singulier. Ils tentent de se séparer les uns des autres pour isoler les PJ. Le Doppelganger Rôdeur utilise Pas de Miroir pour harceler à distance. Le Doppelganger Mage reste en arrière. Le Guerrier charge frontalement. Si possible, les Doppelgangers utilisent Inversion pour semer la confusion dans le groupe.",
    loot: [
      "Éclat de Miroir Enchanté (×2, peut servir de composante pour sort d'Illusion, valeur : 35 po chacun)",
      "Essence de Doppelganger (fiole, permet de changer d'apparence 1h, usage unique)",
      "Anneau d'Identité (immunise contre les effets de confusion d'identité, valeur : 75 po)"
    ]
  },
  skillChecks: [
    {
      skill: 'Sagesse (Perspicacité)',
      dc: 14,
      success: "Vous percez à jour la nature illusoire des Doppelgangers. Vous avez un avantage sur votre première attaque contre votre copie.",
      failure: "La ressemblance est troublante. Pendant un instant, vous doutez : lequel est le vrai vous ?"
    },
    {
      skill: 'Arcanes',
      dc: 15,
      success: "Vous comprenez que détruire le miroir associé à un Doppelganger le détruit aussi — mais seulement si le Doppelganger est à moins de la moitié de ses PV.",
      failure: "Ces miroirs semblent imprégnés d'une magie d'illusion puissante, mais vous ne comprenez pas leur fonctionnement exact."
    }
  ],
  choices: [
    {
      id: 'choix-miroirs-1',
      prompt: "Les Doppelgangers sont vaincus. Le miroir brisé révèle un passage.",
      options: [
        {
          label: "Traverser le miroir brisé",
          description: "Passer par l'ouverture vers la lueur rouge",
          consequence: "Le passage mène directement à la Forge Abandonnée.",
          nextScene: 'catacombes-8-forge'
        },
        {
          label: "Continuer au bout de la galerie",
          description: "Suivre le couloir jusqu'au bout",
          consequence: "La galerie débouche sur un escalier menant à la Salle du Trésor.",
          nextScene: 'catacombes-9-tresor'
        },
        {
          label: "Revenir au carrefour",
          description: "Retourner en arrière pour explorer une autre direction",
          consequence: "Vous revenez au carrefour inondé.",
          nextScene: 'catacombes-5-carrefour-inonde'
        }
      ]
    }
  ],
  loot: [
    "2 Éclats de Miroir Enchantés (35 po chacun)",
    "Essence de Doppelganger (change apparence 1h, usage unique)",
    "Anneau d'Identité (immunité confusion d'identité, 75 po)"
  ],
  nextScenes: ['catacombes-8-forge', 'catacombes-9-tresor', 'catacombes-5-carrefour-inonde'],
  previousScene: 'catacombes-5-carrefour-inonde'
};

// ============================================================================
// SALLE 8 : Forge Abandonnée
// ============================================================================
const SCENE_FORGE: BookScene = {
  id: 'catacombes-8-forge',
  sceneNumber: 8,
  title: "La Forge Abandonnée",
  type: 'exploration',
  location: "Ancienne forge royale, Catacombes de Sol-Aureus",
  locationId: 'catacombes-forge',
  estimatedMinutes: 30,
  readAloud: {
    text: `La chaleur vous frappe comme un mur quand vous pénétrez dans la forge. Malgré des siècles d'abandon supposé, les braises dans le grand foyer central rougeoient encore d'une lueur surnaturelle — alimentées non par du charbon mais par une veine de roche magmatique qui affleure sous le sol et chauffe la salle à une température supportable mais oppressante.

C'est une forge royale d'un autre âge, équipée de tout le matériel nécessaire à un maître forgeron : enclumes de différentes tailles, marteaux alignés par ordre croissant sur des râteliers, pinces, moules, et un bac de trempe dont l'eau est devenue noire comme du goudron. Des armes et armures à demi-forgées reposent sur des établis, figées dans leur processus de création par un départ précipité.

Dans un coin de la salle, immobile et couvert de poussière, se tient un Golem de Forge — un automate de métal et de pierre de deux mètres de haut, dont les yeux de cristal sont éteints. Son torse est gravé de runes d'activation, et un emplacement vide en forme de gemme au centre de sa poitrine semble attendre une source d'énergie.

Des plans de forge sont éparpillés sur un bureau : des schémas d'armes extraordinaires qui portent le sceau royal de Sol-Aureus. L'un d'eux attire votre attention — un croquis détaillé d'une épée dont la lame est parcourue de veines dorées, annotée en vieil aethélien : « L'Aube du Roi — forgée dans la lumière, trempée dans le sacrifice. »`,
    mood: 'chaud, industriel, nostalgie, potentiel',
    music: 'Crépitement de braises, bourdonnement de métal chaud, cliquetis lointains'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le Golem peut être réactivé en insérant une gemme d'énergie dans sa poitrine. Le Fragment de Lumière Solaire (Salle 6) ou une gemme similaire fonctionne. Le Golem réactivé obéit aux ordres simples en vieil aethélien — ou attaque tout le monde s'il est activé sans la bonne commande vocale (Intelligence (Histoire) DD 15 pour connaître la phrase)."
    },
    {
      type: 'tip',
      text: "Un PJ avec des outils de forgeron peut tenter de forger ou améliorer une arme ici. Jet d'Artisanat DD 14 : succès = +1 temporaire à une arme (dure 24h). Échec critique = l'arme est endommagée (-1 jusqu'à réparation). Cela prend 1 heure de temps de jeu."
    },
    {
      type: 'secret',
      text: "Les plans de l'Aube du Roi sont la clé pour forger l'arme légendaire qui sera nécessaire à l'Acte 5 pour vaincre Malachar. Les PJ ne peuvent pas la forger maintenant (il manque des matériaux), mais conserver les plans est crucial pour la suite de la campagne."
    },
    {
      type: 'warning',
      text: "Si le Golem est mal activé, c'est un combat très dangereux pour le groupe. Le Golem a des stats de CR 4, bien au-dessus du niveau du groupe. Prévoyez une sortie de secours : le Golem ne peut pas passer par les passages étroits menant aux salles adjacentes."
    }
  ],
  encounter: {
    name: "Golem de Forge (si mal activé)",
    enemies: [
      {
        name: "Golem de Forge",
        hp: 55,
        atk: 7,
        ac: 16,
        cr: 4,
        abilities: [
          "Poing de Métal : +7 au toucher, 2d8+4 contondant",
          "Souffle de Forge : (Recharge 5-6) Cône de 4,5m, 3d6 dégâts de feu, Dextérité DD 14 pour moitié",
          "Corps Métallique : Immunité poison, résistance feu et contondant non-magique",
          "Marche Lourde : Vitesse 6m seulement, ne peut pas passer par les passages étroits",
          "Vulnérabilité : Retirer la gemme de son torse (Escamotage DD 16 en contact) le désactive instantanément"
        ]
      }
    ],
    terrain: [
      "Forge (feu) : 1d6 dégâts de feu si poussé dedans",
      "Enclumes : couverture partielle, terrain difficile",
      "Bac de trempe : peut être renversé pour créer un terrain glissant",
      "Passages étroits : le Golem ne peut pas les emprunter (fuite possible)"
    ],
    tactics: "Le Golem est lent mais dévastateur. Il charge le PJ le plus proche et utilise son Souffle de Forge dès que possible. Il est stupide — il peut être leurré vers la forge ou dans un coin. Retirer la gemme est la méthode la plus efficace pour le désactiver.",
    loot: [
      "Noyau du Golem (gemme d'énergie, composante de sort de niveau 3, valeur : 200 po)",
      "Bras du Golem (peut être reforégé en bouclier +1 par un forgeron compétent)"
    ]
  },
  skillChecks: [
    {
      skill: 'Intelligence (Histoire)',
      dc: 15,
      success: "Vous connaissez la phrase d'activation en vieil aethélien : « Sers la Lumière, Gardien de la Forge. » Le Golem s'active et vous obéit (ordres simples : garder, attaquer, suivre, arrêter).",
      failure: "Vous tentez d'activer le Golem sans la bonne phrase. Ses yeux s'allument en rouge et il attaque !"
    },
    {
      skill: 'Artisanat (Forgeron)',
      dc: 14,
      success: "Vous parvenez à utiliser la forge pour améliorer une arme : +1 temporaire aux dégâts pendant 24 heures.",
      failure: "Votre tentative de forge échoue. L'arme n'est pas endommagée mais vous perdez une heure."
    },
    {
      skill: 'Investigation',
      dc: 13,
      success: "Vous trouvez les plans de l'Aube du Roi et comprenez leur importance. Vous repérez aussi une liste de matériaux nécessaires, dont du « cristal de l'Arbre-Monde » et de « l'acier des profondeurs forgé par le feu de dragon ».",
      failure: "Les plans sont intéressants mais vous ne saisissez pas leur véritable signification."
    }
  ],
  choices: [
    {
      id: 'choix-forge-1',
      prompt: "La forge offre plusieurs possibilités. Que faites-vous ?",
      options: [
        {
          label: "Activer le Golem (avec la phrase)",
          description: "Utiliser la phrase en vieil aethélien pour activer le gardien",
          consequence: "Le Golem s'active en mode allié. Il peut vous accompagner dans le donjon.",
          skillCheck: {
            skill: 'Intelligence (Histoire)',
            dc: 15,
            success: "Le Golem s'éveille docilement. « Golem... sert... Lumière. » Il vous suivra et combattra à vos côtés.",
            failure: "Le Golem s'éveille en mode hostile ! Combat !"
          }
        },
        {
          label: "Forger/améliorer une arme",
          description: "Utiliser la forge encore fonctionnelle pour travailler le métal",
          consequence: "Une heure de travail pour un bonus temporaire.",
          skillCheck: {
            skill: 'Artisanat (Forgeron)',
            dc: 14,
            success: "Votre arme luit d'un éclat neuf. +1 aux dégâts pendant 24 heures.",
            failure: "Le métal ne coopère pas. Vous transpirez pour rien."
          }
        },
        {
          label: "Récupérer les plans de l'Aube du Roi",
          description: "Prendre les schémas de l'arme légendaire",
          consequence: "Ces plans seront essentiels plus tard dans la campagne.",
          nextScene: 'catacombes-9-tresor'
        },
        {
          label: "Continuer vers la salle du trésor",
          description: "Emprunter le passage nord-est",
          consequence: "Un couloir descend vers ce qui semble être un caveau.",
          nextScene: 'catacombes-9-tresor'
        }
      ]
    }
  ],
  loot: [
    "Plans de l'Aube du Roi (objet de quête, essentiel Acte 5)",
    "Marteau de Forge Enchantée (masse d'armes +1, 1d8+1 contondant + 1d4 feu)",
    "Kit de forgeron royal (outils, avantage sur jets d'Artisanat, valeur : 100 po)",
    "3 lingots d'acier solaire (matériau rare, valeur : 50 po pièce)",
    "Golem allié (si activé correctement, temporaire)"
  ],
  nextScenes: ['catacombes-9-tresor', 'catacombes-5-carrefour-inonde', 'catacombes-7-miroirs'],
  previousScene: 'catacombes-5-carrefour-inonde'
};

// ============================================================================
// SALLE 9 : Salle du Trésor Piégée
// ============================================================================
const SCENE_TRESOR: BookScene = {
  id: 'catacombes-9-tresor',
  sceneNumber: 9,
  title: "La Salle du Trésor Piégée",
  type: 'exploration',
  location: "Caveau du trésor, Catacombes de Sol-Aureus",
  locationId: 'catacombes-tresor',
  estimatedMinutes: 30,
  readAloud: {
    text: `Vous pénétrez dans une salle octogonale dont chaque pan de mur est percé d'une alcôve contenant un coffre de bois cerclé de fer. Huit coffres au total, disposés en cercle autour d'un piédestal central sur lequel repose un neuvième coffre — plus petit, en or massif, orné de saphirs et de rubis qui captent la lumière de vos torches et la renvoient en éclats multicolores.

Le sol est recouvert de pièces d'or éparpillées, si nombreuses qu'elles forment un tapis métallique qui tinte sous vos pas. Des gobelets, des chandeliers, des bijoux et des pierres précieuses débordent des alcôves comme si les coffres ne suffisaient plus à contenir tant de richesses. C'est le trésor accumulé par des générations de rois de Sol-Aureus.

Mais quelque chose cloche. L'air est étrangement tiède et humide. Les pièces d'or sous vos pieds semblent... collantes par endroits. Et quand vous regardez de plus près le coffre le plus proche, vous remarquez que le bois n'a pas la texture du bois. Il respire. Imperceptiblement, la surface du coffre se soulève et s'abaisse en un rythme lent et organique.

Au centre de la salle, le coffre doré sur le piédestal ne respire pas, lui. Il semble authentique. Mais pour l'atteindre, il faut traverser ce champ de mines vivantes.`,
    mood: 'cupidité, tension, piège',
    music: 'Tintements métalliques, respiration humide, battement de cœur lointain'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Sur les 8 coffres muraux, 5 sont des Coffres Mimics — des créatures qui imitent des objets. Les 3 vrais coffres contiennent du trésor authentique. Le coffre central en or est le vrai trésor, mais il est piégé magiquement (Glyphe de Protection, 3d6 dégâts de feu, Dextérité DD 14 pour moitié)."
    },
    {
      type: 'tip',
      text: "Pour identifier les Mimics sans les provoquer : Perception DD 15 (remarquer la « respiration »), Nature DD 14 (reconnaître un Mimic), ou simplement toucher un coffre avec un bâton de 3m (le Mimic attaque le bâton). Les Mimics n'attaquent que si on les touche ou si on s'approche à moins de 1,5m."
    },
    {
      type: 'warning',
      text: "5 Mimics à la fois serait un massacre pour un groupe de niveau 2-3. Les Mimics n'attaquent PAS simultanément — seul celui qui est touché/approché réagit. Limitez le combat à 2 Mimics actifs maximum. Les autres « dorment » tant qu'on ne les provoque pas."
    },
    {
      type: 'secret',
      text: "Le coffre doré central contient le Sceau du Premier Roi — un médaillon en or qui prouve la lignée légitime de Sol-Aureus. Cet objet sera crucial lors de l'Acte 2 pour rallier certaines factions. Il y a aussi une lettre scellée du Roi Aldric V adressée « à celui qui sera digne »."
    }
  ],
  encounter: {
    name: "Les Coffres Mimics",
    enemies: [
      {
        name: "Coffre Mimic",
        hp: 30,
        atk: 5,
        ac: 12,
        cr: 2,
        abilities: [
          "Morsure : +5 au toucher, 1d8+3 perçant et la cible est Agrippée (Évasion DD 13)",
          "Colle Adhésive : Une créature qui touche le Mimic est collée (Force DD 13 pour se libérer)",
          "Mimétisme : Indiscernable d'un coffre ordinaire tant qu'il est immobile (Perception DD 15 pour le repérer)",
          "Pseudopodes : Bonus, +3 au toucher, 1d4+1 contondant (portée 1,5m)",
          "Résistance : Immunité acide, résistance aux dégâts contondants"
        ]
      },
      {
        name: "Coffre Mimic (identique, ×4 supplémentaires)",
        hp: 30,
        atk: 5,
        ac: 12,
        cr: 2,
        abilities: [
          "Morsure : +5 au toucher, 1d8+3 perçant et Agrippé (DD 13)",
          "Colle Adhésive : Force DD 13 pour se libérer",
          "Mimétisme : Perception DD 15",
          "Pseudopodes : +3, 1d4+1 contondant"
        ]
      }
    ],
    terrain: [
      "Pièces d'or au sol : terrain difficile partout",
      "Alcôves : couverture partielle contre les attaques à distance",
      "Piédestal central : position surélevée de 1m, +1 CA si on y combat",
      "Colle de Mimic au sol : restes collants, terrain difficile supplémentaire"
    ],
    tactics: "Les Mimics sont des prédateurs opportunistes. Ils attaquent uniquement quand une proie est à portée. Si un PJ est collé, le Mimic tente de le mordre à chaque tour. Les Mimics ne se coordonnent pas — chacun protège son propre territoire (son alcôve). Ils ne poursuivent pas au-delà de la salle.",
    loot: [
      "Contenu des 3 vrais coffres : 450 po, 120 pa, 15 gemmes variées (valeur totale : 300 po)",
      "Coffre central : Sceau du Premier Roi (objet de quête), Lettre d'Aldric V, Dague de Cérémonie +1 (1d4+1, +1d6 radiant vs morts-vivants)",
      "Mimic vaincu : Colle de Mimic (×3, usage alchimique, colle puissante, 20 po chaque)"
    ]
  },
  skillChecks: [
    {
      skill: 'Perception',
      dc: 15,
      success: "Vous repérez les coffres qui « respirent ». Vous identifiez 5 Mimics et 3 coffres authentiques sans déclencher d'attaque.",
      failure: "Les coffres vous semblent tous ordinaires. Quelle salle magnifique et remplie de trésors !"
    },
    {
      skill: 'Nature',
      dc: 14,
      success: "Vous reconnaissez les signes d'un Mimic : la texture organique, la légère chaleur corporelle, l'adhérence de certaines surfaces.",
      failure: "Ces coffres sont anciens et l'humidité a dû les détériorer. C'est normal qu'ils aient un aspect étrange, non ?"
    },
    {
      skill: 'Escamotage',
      dc: 15,
      success: "Vous désamorcez le Glyphe de Protection sur le coffre central sans le déclencher. Le coffre s'ouvre en toute sécurité.",
      failure: "Le Glyphe se déclenche ! Explosion de feu : 3d6 dégâts de feu dans un rayon de 3m (Dextérité DD 14 pour moitié)."
    }
  ],
  choices: [
    {
      id: 'choix-tresor-1',
      prompt: "La salle du trésor est devant vous. Comment procédez-vous ?",
      options: [
        {
          label: "Identifier les Mimics avant d'agir",
          description: "Observer attentivement chaque coffre",
          consequence: "La prudence est mère de sûreté.",
          skillCheck: {
            skill: 'Perception',
            dc: 15,
            success: "Vous identifiez les 5 Mimics. Vous pouvez les éviter ou les combattre un par un.",
            failure: "Vous ne détectez rien d'anormal. Le premier coffre que vous touchez vous mord !"
          }
        },
        {
          label: "Aller directement au coffre central",
          description: "Ignorer les coffres muraux et viser le trésor principal",
          consequence: "Risqué si vous passez trop près des Mimics...",
          skillCheck: {
            skill: 'Discrétion',
            dc: 13,
            success: "Vous slalomez entre les coffres sans en éveiller aucun. Le coffre central est à portée.",
            failure: "Vous effleurez un Mimic en passant. Il s'ouvre en une gueule béante et attaque !"
          },
          nextScene: 'catacombes-10-gardien'
        },
        {
          label: "Piller les vrais coffres en évitant les Mimics",
          description: "Récupérer le contenu des coffres authentiques sans combat",
          consequence: "Efficace si vous avez identifié les Mimics.",
          nextScene: 'catacombes-10-gardien'
        },
        {
          label: "Attaquer les Mimics un par un",
          description: "Éliminer les menaces méthodiquement",
          consequence: "Long mais sûr — tant que vous n'en éveillez qu'un à la fois.",
          nextScene: 'catacombes-10-gardien'
        }
      ]
    }
  ],
  loot: [
    "450 po, 120 pa",
    "15 gemmes variées (300 po au total)",
    "Sceau du Premier Roi (objet de quête, Acte 2)",
    "Lettre d'Aldric V (indice campagne)",
    "Dague de Cérémonie +1 (1d4+1, +1d6 radiant vs morts-vivants)",
    "3 Colles de Mimic (20 po chaque)"
  ],
  nextScenes: ['catacombes-10-gardien'],
  previousScene: 'catacombes-8-forge'
};

// ============================================================================
// SALLE 10 : Chambre du Gardien (BOSS)
// ============================================================================
const SCENE_BOSS_GARDIEN: BookScene = {
  id: 'catacombes-10-gardien',
  sceneNumber: 10,
  title: "La Chambre du Gardien — Le Chevalier Spectral du Premier Roi",
  type: 'combat',
  location: "Chambre du Gardien Éternel, Catacombes de Sol-Aureus",
  locationId: 'catacombes-chambre-gardien',
  estimatedMinutes: 45,
  readAloud: {
    text: `Au-delà de la salle du trésor, un dernier passage conduit à la plus grande salle des catacombes — un dôme souterrain dont la voûte atteint une hauteur vertigineuse de quinze mètres. Le sol est un damier de marbre noir et blanc, comme un gigantesque échiquier. Au centre, un trône de pierre sombre fait face à l'entrée, et sur ce trône repose une armure complète — la plus belle que vous ayez jamais vue.

L'armure est d'un argent lunaire, gravée de scènes de bataille et de symboles solaires. Un casque à visière, un bouclier frappé du soleil levant et une épée à deux mains reposent à ses côtés. Tout est disposé avec un soin cérémonial, comme si l'occupant attendait le moment de se relever.

Et c'est exactement ce qui se produit.

Dès que vous franchissez le seuil, les inscriptions au sol s'illuminent d'une lueur bleutée. L'armure se redresse, portée non par des muscles mais par une volonté spectrale. Une silhouette fantomatique emplit l'armure — un chevalier gigantesque dont les yeux sont deux flammes blanches brûlant d'un feu éternel. Sa voix résonne dans toute la salle comme le tonnerre :

« JE SUIS ALDRIC SOLARIS, GARDIEN ÉTERNEL DE SOL-AUREUS. NUL NE PASSERA SANS PROUVER SA VALEUR EN COMBAT. PRÉPAREZ VOS ARMES, ÉTRANGERS — CAR SEULS LES DIGNES SURVIVRONT À MON JUGEMENT. »

L'épée spectrale s'enflamme d'une lumière aveuglante. Le Chevalier descend de son trône et prend position au centre de l'échiquier. Le combat final du donjon commence.`,
    mood: 'épique, solennel, combat final',
    music: 'Thème de boss épique, chœurs martiaux, percussions lourdes'
  },
  gmNotes: [
    {
      type: 'info',
      text: "BOSS EN 2 PHASES. Phase 1 : Aldric Solaris combat comme un chevalier honneur — combat loyal, un contre un, pas de coups en traître. Phase 2 (à 50% PV) : Il libère sa forme spectrale complète et devient beaucoup plus dangereux. Transition : son armure éclate et sa forme fantomatique pure se déploie, doublant de taille."
    },
    {
      type: 'tip',
      text: "Si les PJ ont obtenu la Bénédiction de Sol-Aureus (Salle 6), Aldric les reconnaît comme « porteurs de la Lumière » et se bat avec moins de férocité (-2 aux dégâts). S'ils ont le Sceau du Premier Roi (Salle 9), ils peuvent tenter la Persuasion DD 18 pour éviter le combat complètement — Aldric les reconnaît comme héritiers légitimes."
    },
    {
      type: 'warning',
      text: "Ce boss est calibré pour un groupe de niveau 3-4 (4 PJ). Si le groupe est de niveau 1-2, réduisez les PV de 20% et supprimez Châtiment Spectral de la Phase 2. Prévoyez une mécanique de « seconde chance » : si un PJ tombe, Aldric attend 1 tour (honneur) avant de l'achever."
    },
    {
      type: 'secret',
      text: "Aldric ne veut pas réellement tuer les PJ — c'est un test. S'ils prouvent leur valeur (réduire ses PV à 25% ou moins), il cesse le combat et reconnaît leur mérite. Il leur confie alors une mission : « Trouvez les Cinq Sceaux. Empêchez le Destructeur de se libérer. Le monde en dépend. » C'est le lancement officiel de la quête principale."
    }
  ],
  encounter: {
    name: "Aldric Solaris — Chevalier Spectral du Premier Roi",
    enemies: [
      {
        name: "Aldric Solaris — Phase 1 (Chevalier en Armure)",
        hp: 75,
        atk: 7,
        ac: 17,
        cr: 4,
        abilities: [
          "Épée Solaire : +7 au toucher, 2d8+4 tranchant + 1d6 radiant",
          "Bouclier du Roi : Réaction, +3 CA contre une attaque, si l'attaque rate le bouclier renvoie 1d4 radiant",
          "Charge Royale : Si Aldric se déplace d'au moins 3m en ligne droite, +2d6 dégâts sur sa prochaine attaque",
          "Commandement : (1/combat) Tous les ennemis dans 9m font un jet de Sagesse DD 14 ou perdent leur réaction jusqu'au prochain tour d'Aldric",
          "Résistance Spectrale : Résistance aux dégâts non-magiques (sauf radiant et nécrotique)",
          "Honneur du Chevalier : Aldric n'attaque pas les PJ inconscients et ne frappe pas dans le dos"
        ]
      },
      {
        name: "Aldric Solaris — Phase 2 (Forme Spectrale Pure)",
        hp: 45,
        atk: 8,
        ac: 15,
        cr: 5,
        abilities: [
          "Lame Fantôme : +8 au toucher, 2d10+3 nécrotique (ignore l'armure physique, touche les PV directement)",
          "Explosion Solaire : (Recharge 5-6) Sphère de 6m centrée sur Aldric, 4d6 radiant, Constitution DD 15 pour moitié, les morts-vivants dans la zone sont détruits",
          "Forme Intangible : Traverse les murs et le sol, ne peut être agrippé",
          "Châtiment Spectral : Si un PJ est réduit à 0 PV, Aldric récupère 10 PV",
          "Vol Spectral : Vitesse de vol 12m, peut planer au-dessus de l'échiquier",
          "Transition : Quand Phase 1 atteint 0 PV, l'armure explose (2d6 contondant dans 3m, Dextérité DD 13) et Phase 2 commence"
        ]
      }
    ],
    terrain: [
      "Échiquier géant : Cases noires = terrain normal. Cases blanches = zones de lumière sacrée (+1d4 radiant aux attaques des défenseurs si Bénédiction active)",
      "Trône : couverture totale d'un côté, point de retranchement",
      "Colonnes aux quatre coins : couverture partielle, peuvent être détruites (20 PV) pour projeter des débris (2d6 contondant, zone 3m)",
      "Plafond haut (15m) : Aldric Phase 2 utilise le vol pour harceler en hauteur"
    ],
    tactics: "Phase 1 : Aldric combat loyalement au centre de l'échiquier. Il utilise Charge Royale quand possible et Commandement dès le premier tour. Il cible le combattant le plus fort en priorité. Phase 2 : Il vole hors de portée et utilise Explosion Solaire sur les PJ regroupés. Il plonge pour des attaques en piqué avec Lame Fantôme. Il cible les soigneurs en priorité. À 25% PV (environ 11 PV), il cesse le combat.",
    loot: [
      "Épée Solaire d'Aldric (épée à deux mains +1, 2d6+1 tranchant + 1d6 radiant, luit dans l'obscurité)",
      "Bouclier du Premier Roi (+2 CA, 1/jour : Mur de Lumière, barrière de 3m qui bloque les morts-vivants)",
      "Armure Spectrale (armure intermédiaire, CA 15 + Dex (max 2), résistance nécrotique)",
      "Couronne Brisée de Sol-Aureus (diadème, +2 Charisme avec les factions loyalistes)",
      "500 po en pièces anciennes",
      "Bénédiction d'Aldric : +1 permanent aux jets de sauvegarde contre la mort"
    ]
  },
  skillChecks: [
    {
      skill: 'Persuasion',
      dc: 18,
      success: "Avec le Sceau du Premier Roi en main, vous convainquez Aldric que vous êtes les héritiers légitimes. Il pose son épée et s'agenouille. Le combat est évité.",
      failure: "Aldric vous considère comme des imposteurs. « Les mots ne suffisent pas. Montrez votre valeur par les armes ! »"
    },
    {
      skill: 'Intimidation',
      dc: 16,
      success: "Votre détermination impressionne Aldric. « Vous avez du cran, mortels. Mais le cran seul ne suffit pas. » Il est Désavantagé sur sa première attaque.",
      failure: "Aldric rit — un son qui fait trembler les murs. « Intimidation ? Contre un fantôme millénaire ? Pathétique. »"
    },
    {
      skill: 'Religion',
      dc: 14,
      success: "Vous reconnaissez le rituel de jugement des chevaliers Sol-Aureus. En respectant les formes (salut, annonce de votre nom), Aldric combat avec plus de retenue (-1 aux dégâts).",
      failure: "Vous ne reconnaissez pas le protocole. Aldric vous considère comme des barbares indignes."
    }
  ],
  choices: [
    {
      id: 'choix-boss-1',
      prompt: "Aldric Solaris se dresse devant vous. Comment l'affrontez-vous ?",
      options: [
        {
          label: "Brandir le Sceau du Premier Roi",
          description: "Montrer le médaillon trouvé dans la salle du trésor",
          consequence: "Tentative diplomatique — peut éviter le combat.",
          skillCheck: {
            skill: 'Persuasion',
            dc: 18,
            success: "Aldric s'agenouille. « Enfin... après tant de siècles... les héritiers sont venus. » Il vous confie sa quête sans combat.",
            failure: "Aldric reconnaît le Sceau mais n'est pas convaincu. « Le Sceau ne fait pas le Roi. Prouvez votre valeur ! » Le combat commence, mais avec -2 aux dégâts d'Aldric."
          }
        },
        {
          label: "Accepter le duel d'honneur",
          description: "Combattre Aldric selon les règles chevaleresques",
          consequence: "Un seul PJ combat Aldric en duel. Les autres regardent.",
          nextScene: 'catacombes-10-gardien'
        },
        {
          label: "Attaquer en groupe",
          description: "Charger Aldric tous ensemble",
          consequence: "Plus efficace tactiquement, mais Aldric considère cela comme déshonorant et se bat plus férocement (+2 aux dégâts).",
          nextScene: 'catacombes-10-gardien'
        },
        {
          label: "Tenter de fuir",
          description: "Battre en retraite vers la salle précédente",
          consequence: "La porte se referme magiquement. Il n'y a pas d'issue tant que le jugement n'est pas rendu.",
          nextScene: 'catacombes-10-gardien'
        }
      ]
    },
    {
      id: 'choix-boss-2',
      prompt: "Aldric est vaincu (ou apaisé). Il vous parle une dernière fois avant de disparaître.",
      options: [
        {
          label: "Écouter son message",
          description: "Recevoir la quête principale de la campagne",
          consequence: "Aldric révèle l'existence des Cinq Sceaux et de la menace de Malachar. C'est le début de la vraie aventure.",
          nextScene: 'catacombes-sortie'
        },
        {
          label: "Lui poser des questions",
          description: "Interroger Aldric sur le passé et les Sceaux",
          consequence: "Aldric répond à 3 questions avant que son énergie ne s'épuise. Choisissez bien.",
          nextScene: 'catacombes-sortie'
        }
      ]
    }
  ],
  loot: [
    "Épée Solaire d'Aldric (+1, 2d6+1 tranchant + 1d6 radiant)",
    "Bouclier du Premier Roi (+2 CA, Mur de Lumière 1/jour)",
    "Armure Spectrale (CA 15 + Dex max 2, résistance nécrotique)",
    "Couronne Brisée (+2 Charisme factions loyalistes)",
    "500 po anciennes",
    "Bénédiction d'Aldric (+1 permanent sauvegardes vs mort)"
  ],
  nextScenes: ['catacombes-sortie'],
  previousScene: 'catacombes-9-tresor'
};

// ============================================================================
// CHAPITRE COMPLET : Les Catacombes Oubliées de Sol-Aureus
// ============================================================================
export const DUNGEON_CATACOMBES: BookChapter = {
  id: 'dungeon-catacombes-sol-aureus',
  actNumber: 1,
  chapterNumber: 10,
  title: "Les Catacombes Oubliées de Sol-Aureus",
  subtitle: "Un labyrinthe de secrets sous le temple le plus ancien du royaume",
  summary: "Les héros découvrent une entrée secrète sous le Temple de Sol-Aureus menant à d'anciennes catacombes royales. À travers dix salles peuplées de spectres gardiens, de pièges mécaniques, de créatures des profondeurs et d'illusions mortelles, ils affrontent les épreuves laissées par les rois d'antan. Au cœur du donjon, le Chevalier Spectral Aldric Solaris les met à l'épreuve dans un combat épique en deux phases. Vaincre — ou convaincre — le Gardien révèle l'existence des Cinq Sceaux et lance la quête principale de la campagne : empêcher la libération de Malachar le Destructeur.",
  levelRange: "1-4",
  themes: [
    "Héritage royal et légitimité",
    "Épreuves de valeur et d'honneur",
    "Secrets enfouis et histoire oubliée",
    "Corruption rampante sous la surface",
    "Les Sceaux et la menace de Malachar (introduction)"
  ],
  scenes: [
    SCENE_ENTREE_SECRETE,
    SCENE_CRYPTE_ROIS,
    SCENE_SALLE_PIEGES,
    SCENE_BIBLIOTHEQUE,
    SCENE_CARREFOUR_INONDE,
    SCENE_SANCTUAIRE,
    SCENE_GALERIE_MIROIRS,
    SCENE_FORGE,
    SCENE_TRESOR,
    SCENE_BOSS_GARDIEN
  ],
  chapterIntro: {
    text: `Bienvenue dans les Catacombes Oubliées de Sol-Aureus — le premier véritable donjon de la campagne d'Aethelgard. Ce labyrinthe souterrain est conçu pour des personnages de niveau 1 à 4 et devrait prendre environ 4 à 6 heures de jeu réel.

Les catacombes ne sont pas linéaires : à partir du Carrefour Inondé (Salle 5), les joueurs ont le choix entre trois chemins qui convergent vers la Salle du Trésor (Salle 9) puis le Boss Final (Salle 10). Encouragez l'exploration libre et la prudence — les ressources sont limitées et les repos difficiles dans ces profondeurs.

Ce donjon introduit la menace principale de la campagne : l'existence des Cinq Sceaux qui emprisonnent Malachar. Les indices sont dispersés dans plusieurs salles, et le boss final, Aldric Solaris, lance officiellement la quête principale. Assurez-vous que les joueurs comprennent l'importance de cette révélation.`,
    mood: 'aventure, découverte, danger croissant',
    music: 'Thème des catacombes — ambiance souterraine évolutive'
  },
  chapterConclusion: {
    text: `Les Catacombes Oubliées de Sol-Aureus révèlent leurs derniers secrets. Que le Chevalier Spectral ait été vaincu par les armes ou convaincu par la diplomatie, son message est le même : les Cinq Sceaux qui emprisonnent Malachar le Destructeur s'affaiblissent. Quelqu'un — ou quelque chose — travaille activement à les briser.

Les héros émergent des profondeurs chargés de trésors, de connaissances et d'une mission qui dépasse tout ce qu'ils imaginaient. La lumière du soleil qui les accueille à la sortie n'a jamais semblé aussi précieuse — ni aussi fragile.

Le monde au-dessus les attend, et avec lui, les Mines Perdues de Karak-Zhul où le deuxième Sceau les appelle...`,
    mood: 'accomplissement, gravité, transition',
    music: 'Thème héroïque en mineur, lueur d\'espoir'
  },
  rewards: {
    xp: 2500,
    gold: "800-1200 po (selon exploration)",
    items: [
      "Épée Solaire d'Aldric (+1, radiant)",
      "Bouclier du Premier Roi (+2 CA, Mur de Lumière)",
      "Armure Spectrale (CA 15, résistance nécrotique)",
      "Anneau de Respiration Aquatique",
      "Plans de l'Aube du Roi (objet de quête)",
      "Sceau du Premier Roi (objet de quête)",
      "Journal du Dernier Archiviste (lore)",
      "Fragment de Lumière Solaire (gemme magique)",
      "Marteau de Forge Enchantée (+1, feu)",
      "Dague de Cérémonie (+1, anti-morts-vivants)"
    ]
  }
};
