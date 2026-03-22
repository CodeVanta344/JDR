/**
 * MEGA-DONJON : Les Racines d'Yggdrasylve
 * Acte 3 — Niveau 8-12
 * 10 salles dans les racines de l'Arbre-Monde
 */

import type { BookChapter, BookScene } from './gm-book-data';

// ============================================================================
// SALLE 1 : Entrée par les Racines
// ============================================================================
const SCENE_ENTREE_RACINES: BookScene = {
  id: 'racines-1-entree',
  sceneNumber: 1,
  title: "L'Entrée par les Racines",
  type: 'exploration',
  location: "Base d'Yggdrasylve, Forêt d'Aethel",
  locationId: 'yggdrasylve-racines-entree',
  estimatedMinutes: 25,
  readAloud: {
    text: `L'Arbre-Monde Yggdrasylve se dresse devant vous comme une montagne de bois vivant. Son tronc fait deux cents mètres de diamètre — une muraille d'écorce ancienne, noueuse et profondément crevassée, qui s'élève si haut que sa canopée se confond avec les nuages. Des racines épaisses comme des tunnels serpentent à la surface du sol sur des centaines de mètres avant de plonger dans la terre.

C'est là, entre deux racines titanesques, que s'ouvre le passage. Un interstice dans l'écorce à la base de l'arbre, juste assez large pour qu'un humain s'y glisse, révèle un monde intérieur inattendu. L'intérieur de la racine est creux — un tunnel organique de cinq mètres de diamètre, tapissé d'une écorce lisse et tiède qui pulse doucement sous vos doigts comme une artère vivante.

La lumière ici est naturelle mais étrange : des filaments bioluminescents courent le long des parois comme des veines de lumière verte et dorée, éclairant le passage d'une clarté douce et végétale. L'air est saturé d'humidité et embaume le terreau riche, la sève fraîche et une note florale indéfinissable — le parfum même de la vie à son état le plus pur.

Le tunnel descend en spirale douce, et à mesure que vous vous enfoncez, vous sentez le pouls de l'Arbre autour de vous — un battement lent et profond, comme le cœur d'un être ancien et conscient. Yggdrasylve est vivant, et il sait que vous êtes là.`,
    mood: 'organique, sacré, émerveillement naturel',
    music: 'Battement de cœur végétal, bruissements, harmoniques naturelles'
  },
  gmNotes: [
    {
      type: 'info',
      text: "L'Arbre-Monde est semi-conscient. Il perçoit les intentions des PJ. Les personnages avec des intentions pures (protéger le Sceau) ressentent un accueil chaleureux (avantage sur le premier jet dans le donjon). Ceux avec des intentions égoïstes ou destructrices ressentent une résistance (désavantage)."
    },
    {
      type: 'lore',
      text: "Yggdrasylve est l'un des plus anciens êtres vivants d'Aethelgard. Il fut planté par la déesse Sylvana au début du monde et ses racines touchent les cinq points cardinaux du continent. Le Sceau de Forêt est ancré dans son cœur — si l'Arbre meurt, le Sceau se brise."
    },
    {
      type: 'tip',
      text: "Un Druide ou Rôdeur dans le groupe peut communier avec l'Arbre (Nature DD 14). L'Arbre peut transmettre des visions floues de ce qui l'attend : toiles d'araignée, corruption, et un cœur malade. Ces visions servent d'avertissement et de guide."
    },
    {
      type: 'secret',
      text: "L'Arbre essaie de guider les PJ vers le cœur corrompu pour qu'ils le purifient. Les filaments lumineux changent subtilement de couleur pour indiquer la bonne direction (vert = sûr, rouge = danger). Un PJ observateur (Perception DD 15) remarque ce code couleur."
    }
  ],
  skillChecks: [
    {
      skill: 'Nature',
      dc: 14,
      success: "Vous communiez brièvement avec Yggdrasylve. Des visions vous montrent les dangers qui l'attendent : une Reine Araignée, un cœur malade, et une ombre qui ronge ses racines.",
      failure: "L'Arbre est trop vaste et trop ancien pour que vous puissiez le comprendre. Son pouls reste un mystère."
    },
    {
      skill: 'Perception',
      dc: 15,
      success: "Vous remarquez que les filaments lumineux changent de couleur selon les tunnels : vert pour les passages sûrs, rouge-orangé pour les zones dangereuses. Un guide naturel.",
      failure: "Les lumières sont jolies mais vous ne remarquez aucun motif particulier."
    },
    {
      skill: 'Survie',
      dc: 12,
      success: "Vous identifiez des traces de passage récentes dans le tunnel : des pattes d'araignée géante et des gouttes de sève noircie. Quelque chose de hostile habite ces racines.",
      failure: "Le sol organique ne retient pas bien les traces. Impossible de savoir ce qui est passé ici."
    }
  ],
  choices: [
    {
      id: 'choix-racines-entree-1',
      prompt: "Le tunnel spirale descend dans deux directions.",
      options: [
        {
          label: "Suivre les filaments verts (passage sûr)",
          description: "Le chemin recommandé par l'Arbre — vers le Jardin Bioluminescent",
          consequence: "Un chemin plus long mais plus sûr.",
          nextScene: 'racines-3-jardin'
        },
        {
          label: "Suivre les filaments rouges (zone dangereuse)",
          description: "Un raccourci à travers la Toile d'Araignée",
          consequence: "Plus court mais plein de dangers.",
          nextScene: 'racines-2-toile'
        },
        {
          label: "Communier avec l'Arbre",
          description: "Tenter d'établir une connexion plus profonde",
          consequence: "Informations précieuses si vous réussissez.",
          skillCheck: {
            skill: 'Nature',
            dc: 14,
            success: "L'Arbre vous montre une carte mentale de ses racines. Avantage sur tous les jets de Navigation dans le donjon.",
            failure: "L'Arbre est trop souffrant pour communiquer clairement. Vous percevez seulement sa douleur."
          }
        }
      ]
    }
  ],
  loot: [
    "Sève d'Yggdrasylve (×3 fioles, potion de soin 3d8+5 PV, valeur : 75 po chacune)",
    "Écorce Vivante (matériau pour armure, CA 14+Dex, régénère 1 PV/heure, valeur : 400 po)",
    "Graine Lumineuse (éclaire 12m de lumière verte douce, illimitée, valeur : 50 po)"
  ],
  nextScenes: ['racines-2-toile', 'racines-3-jardin'],
  mapMovement: { from: 'foret-aethel', to: 'yggdrasylve-racines' }
};

// ============================================================================
// SALLE 2 : Toile d'Araignée Géante
// ============================================================================
const SCENE_TOILE_ARAIGNEE: BookScene = {
  id: 'racines-2-toile',
  sceneNumber: 2,
  title: "La Toile d'Araignée Géante",
  type: 'combat',
  location: "Galeries infestées, Racines d'Yggdrasylve",
  locationId: 'yggdrasylve-toile',
  estimatedMinutes: 35,
  readAloud: {
    text: `Le tunnel se rétrécit et l'air devient moite, chargé d'une odeur musquée et acide. Les filaments lumineux de l'Arbre ici sont étouffés — recouverts de couches de soie d'araignée si épaisses que la lumière ne filtre qu'en points tremblotants, comme des étoiles mourantes dans un ciel de toile.

Le passage est obstrué par un réseau de toiles qui s'étend dans les trois dimensions — des câbles de soie épaisse comme le pouce relient les parois, le sol et le plafond en un labyrinthe tridimensionnel. Chaque fil est enduit d'une substance collante qui brille d'un éclat huileux, et des cocons de différentes tailles pendent çà et là, certains encore animés de mouvements faibles.

Les cocons les plus grands font deux mètres de long — la taille d'un humain ou d'un elfe. D'autres, plus petits, contiennent les restes desséchés d'animaux forestiers, de gobelins, et de créatures méconnaissables. L'ensemble forme un garde-manger macabre suspendu dans la soie.

Un mouvement à la périphérie de votre vision. Rapide. Silencieux. Huit pattes. Puis le silence retombe — un silence qui n'en est pas un, car vous percevez maintenant le crissement ténu de mandibules et le tapotement délicat de pattes sur la soie. Vous n'êtes pas seuls dans cette toile.`,
    mood: 'horreur, claustrophobie, répulsion',
    music: 'Crissements de pattes, vibrations de soie, silence inquiétant'
  },
  gmNotes: [
    {
      type: 'info',
      text: "4 Araignées Racines (CR 3 chacune) patrouillent la toile. La Reine Araignée (Salle 6) n'est pas ici mais ses éclaireurs le sont. Les araignées attaquent en meute — 2 depuis le plafond, 2 depuis les côtés. Les PJ pris dans la toile sont Entravés (Évasion DD 14 ou 15 PV de dégâts pour couper)."
    },
    {
      type: 'tip',
      text: "Le feu est dévastateur contre les toiles (inflammables, brûlent en 1 round par section de 3m). Cependant, brûler les toiles fait aussi tomber les cocons — certains contiennent des PNJ vivants qui peuvent être sauvés. Brûler tout le réseau cause un effondrement de la salle (3d6 contondant, Dextérité DD 14)."
    },
    {
      type: 'secret',
      text: "L'un des grands cocons contient un Rôdeur elfe nommé Lirael, encore vivant mais paralysé par le venin. Si libéré et soigné (Médecine DD 14 + antidote ou sort de soin), il peut guider les PJ dans le reste du donjon. Il connaît les habitudes de la Reine Araignée et sait comment atteindre le Cœur de l'Arbre."
    },
    {
      type: 'warning',
      text: "Le venin des araignées est puissant : Constitution DD 15 ou Paralysé pendant 1 minute (un jet chaque fin de tour pour mettre fin). Un PJ paralysé dans la toile est extrêmement vulnérable — les araignées tentent de l'encoconner (1 round pour envelopper, puis suffocation en 3 rounds)."
    }
  ],
  encounter: {
    name: "Les Araignées Racines",
    enemies: [
      {
        name: "Araignée Racine",
        hp: 42,
        atk: 7,
        ac: 14,
        cr: 3,
        abilities: [
          "Morsure Venimeuse : +7 au toucher, 1d10+4 perçant + 2d6 poison. Constitution DD 15 ou Paralysé 1 minute",
          "Toile (Recharge 5-6) : Attaque à distance +6, portée 9m. Cible Entravée (Évasion DD 14 ou couper 15 PV)",
          "Marche sur les Toiles : Se déplace normalement sur les toiles sans se coller. Vitesse 12m sur toile.",
          "Embuscade Arachnide : Avantage sur les attaques depuis une toile contre une cible non-alertée",
          "Sens Vibratoires : Détecte toute créature touchant la toile dans 18m"
        ]
      },
      {
        name: "Araignée Racine (×3 supplémentaires)",
        hp: 42,
        atk: 7,
        ac: 14,
        cr: 3,
        abilities: [
          "Identique à la première Araignée Racine",
          "Encoconnage : Sur une cible Paralysée et Entravée, l'araignée passe 1 round à envelopper la cible dans de la soie. La cible commence à suffoquer (3 rounds avant inconscience)"
        ]
      }
    ],
    terrain: [
      "Toiles omniprésentes : terrain difficile partout sauf les sections brûlées",
      "Toiles collantes : tout contact = Athlétisme DD 12 pour se libérer ou collé 1 round",
      "Toiles inflammables : brûlent en 1 round (1d6 feu aux créatures dans la zone)",
      "Cocons suspendus : certains contiennent des PNJ vivants, d'autres des trésors, d'autres des araignées embusquées",
      "Plafond accessible : les araignées combattent en 3D, au sol, aux murs et au plafond"
    ],
    tactics: "Les araignées attaquent par embuscade : 2 depuis le plafond (surprise, avantage), 2 depuis les côtés. Elles ciblent en priorité les lanceurs de sorts (pas de feu = survie des toiles). Si un PJ est paralysé, une araignée abandonne le combat pour encoconner la victime. Elles fuient vers la Salle 6 si 3 sur 4 sont tuées.",
    loot: [
      "Soie d'Araignée Enchantée (×5 rouleaux, matériau pour armure légère ou corde magique, 60 po chacun)",
      "Glande à Venin (×2, poison de paralysie, application sur arme, DD 15, valeur : 150 po chacune)",
      "Contenu des cocons : 120 po en pièces variées, un arc court +1, une amulette de protection contre le poison (+2 aux jets contre poison)"
    ]
  },
  skillChecks: [
    {
      skill: 'Perception',
      dc: 15,
      success: "Vous repérez les araignées embusquées et le cocon qui bouge encore. Pas de surprise possible.",
      failure: "Les toiles semblent abandonnées. Les araignées attaquent par surprise."
    },
    {
      skill: 'Médecine',
      dc: 14,
      success: "Vous stabilisez le Rôdeur elfe Lirael et neutralisez le venin. Il reprend connaissance en quelques minutes.",
      failure: "Le venin est trop avancé pour vos compétences. Il faudrait un sort de Restauration Partielle."
    }
  ],
  npcs: [
    {
      name: "Lirael",
      role: "Rôdeur elfe, éclaireur de la Forêt d'Aethel",
      personality: "Calme, reconnaissant, pragmatique. Parle peu mais chaque mot compte.",
      appearance: "Elfe sylvestre, cheveux argentés collés de toile, armure de cuir couverte de mucus d'araignée. Yeux verts vifs malgré l'épreuve.",
      secret: "Lirael sait que la Reine Araignée n'est pas native de l'Arbre — elle a été invoquée par un cultiste de Malachar pour affaiblir Yggdrasylve de l'intérieur. Le cultiste est peut-être encore dans l'Arbre.",
      dialogues: {
        greeting: "Merci... je pensais finir vidé comme ces animaux. (tousse) La Reine... elle est en bas. Bien plus bas. Et elle n'est pas seule.",
        info: "La Reine Araignée a tissé sa toile autour du Cœur de l'Arbre. Elle se nourrit de la sève d'Yggdrasylve — c'est ce qui la rend si forte. Tant qu'elle est connectée à l'Arbre, elle régénère. Il faut couper ses liens avant de la combattre.",
        quest: "Il y a un cultiste dans l'Arbre. Je l'ai vu avant d'être capturé — un homme encapuchonné qui parlait à la Reine comme à un animal domestique. C'est lui qui l'a amenée ici. Trouvez-le. Il a un Orbe de Corruption qui empoisonne le Cœur.",
        farewell: "Je vous accompagnerai si vous le voulez. Mon arc est à votre service. Mais si vous refusez... au moins sauvez l'Arbre. C'est tout ce qui compte."
      },
      stats: { hp: 45, atk: 7, ac: 15 }
    }
  ],
  choices: [
    {
      id: 'choix-toile-1',
      prompt: "Les araignées sont vaincues. Lirael est sauvé (si trouvé). Plusieurs passages existent.",
      options: [
        {
          label: "Descendre vers le Jardin Bioluminescent",
          description: "Un tunnel descendant baigné de lumière verte",
          consequence: "Zone plus calme, possibilité de repos.",
          nextScene: 'racines-3-jardin'
        },
        {
          label: "Suivre les toiles vers la Reine",
          description: "Descendre directement vers le territoire de la Reine Araignée",
          consequence: "Raccourci dangereux mais direct.",
          nextScene: 'racines-6-reine-araignee'
        },
        {
          label: "Explorer les cocons restants",
          description: "Vérifier s'il y a d'autres survivants ou du loot",
          consequence: "Fouille méthodique des restes.",
          skillCheck: {
            skill: 'Investigation',
            dc: 13,
            success: "Vous trouvez de l'équipement et des indices sur le cultiste de Malachar.",
            failure: "Les cocons ne contiennent que des restes desséchés. Rien d'utile."
          }
        }
      ]
    }
  ],
  loot: [
    "5 Rouleaux de Soie Enchantée (60 po chacun)",
    "2 Glandes à Venin (150 po chacune)",
    "Arc court +1 (1d6+1 perçant)",
    "Amulette Anti-Poison (+2 jets vs poison, 200 po)",
    "120 po diverses",
    "Allié : Lirael (Rôdeur elfe, si sauvé)"
  ],
  nextScenes: ['racines-3-jardin', 'racines-6-reine-araignee'],
  previousScene: 'racines-1-entree'
};

// ============================================================================
// SALLE 3 : Jardin Souterrain Bioluminescent
// ============================================================================
const SCENE_JARDIN: BookScene = {
  id: 'racines-3-jardin',
  sceneNumber: 3,
  title: "Le Jardin Souterrain Bioluminescent",
  type: 'rest',
  location: "Jardin intérieur, Racines d'Yggdrasylve",
  locationId: 'yggdrasylve-jardin',
  estimatedMinutes: 20,
  readAloud: {
    text: `Après les horreurs de la toile, le jardin souterrain est un choc de beauté. Niché dans une cavité des racines, un écosystème complet s'est développé dans l'obscurité totale — illuminé uniquement par la bioluminescence de centaines d'espèces végétales que vous n'avez jamais vues.

Des champignons géants aux chapeaux translucides émettent une lumière bleue douce. Des fleurs sans nom s'ouvrent et se ferment au rythme du pouls de l'Arbre, leurs pétales irradiant des teintes de rose, de violet et d'or. Des lianes lumineuses pendent de la voûte comme des guirlandes d'étoiles vertes, et un tapis de mousse phosphorescente couvre le sol d'un vert émeraude surnaturel.

Au centre du jardin, un bassin naturel recueille la sève dorée qui suinte des racines au-dessus. Le liquide est épais, tiède et dégage un parfum de miel et de résine — la sève vitale d'Yggdrasylve, concentrée en un nectar de vie pure. L'air ici est si pur et si chargé d'énergie vitale que vos blessures picotent agréablement.

Des créatures fééries minuscules — des sylphides à peine plus grandes que votre pouce, des lucioles intelligentes, des escargots de cristal — peuplent le jardin en une microsociété paisible qui vous observe avec curiosité mais sans peur.`,
    mood: 'merveilleux, apaisant, refuge',
    music: 'Harpe féérique, chants d\'insectes lumineux, eau qui goutte doucement'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Zone de repos sûre. Les PJ peuvent prendre un repos court ou long ici sans interruption. La sève dorée a des propriétés curatives puissantes : boire restaure tous les PV et soigne toute maladie, malédiction ou poison. Cet effet ne fonctionne qu'une fois par visite."
    },
    {
      type: 'lore',
      text: "Ce jardin est le « système immunitaire » d'Yggdrasylve — les plantes produisent des enzymes qui combattent les parasites et les infections. Le fait que le jardin existe encore signifie que l'Arbre n'est pas complètement corrompu. Cependant, certaines plantes montrent des signes de flétrissement — la corruption progresse."
    },
    {
      type: 'tip',
      text: "Un Herboriste ou Druide peut récolter des plantes rares ici (Nature DD 15). Chaque plante récoltée peut être transformée en potion de soin supérieure ou en antidote universel. Maximum 3 récoltes avant que le jardin ne soit appauvri."
    },
    {
      type: 'secret',
      text: "Les Sylphides du jardin sont semi-intelligentes et peuvent communiquer par pantomime et lumière colorée. Elles connaissent un passage secret vers la Salle des Graines du Monde (Salle 4) qui évite la Tanière de la Reine (Salle 6). Gagner leur confiance nécessite un acte de bonté (nourrir, soigner une plante, offrir de l'eau pure)."
    }
  ],
  skillChecks: [
    {
      skill: 'Nature',
      dc: 15,
      success: "Vous récoltez des plantes médicinales rares : Lys Lunaire (antidote universel), Champignon Spectral (invisibilité 10 min), Mousse Curative (potion de soin supérieure).",
      failure: "Vous cueillez ce que vous pensez être médicinal mais la plupart des spécimens se flétrissent immédiatement hors de leur écosystème."
    },
    {
      skill: 'Dressage',
      dc: 13,
      success: "Les Sylphides vous font confiance et vous montrent un passage secret vers les profondeurs de l'Arbre.",
      failure: "Les Sylphides restent méfiantes. Elles s'éloignent quand vous approchez."
    }
  ],
  choices: [
    {
      id: 'choix-jardin-1',
      prompt: "Le jardin est un havre de paix. Que faites-vous ?",
      options: [
        {
          label: "Se reposer et guérir",
          description: "Prendre un repos et boire la sève dorée",
          consequence: "Restauration complète. Repos court ou long possible.",
          nextScene: 'racines-4-graines'
        },
        {
          label: "Récolter des plantes rares",
          description: "Cueillir des spécimens médicinaux",
          consequence: "Composantes alchimiques précieuses.",
          skillCheck: {
            skill: 'Nature',
            dc: 15,
            success: "Vous récoltez 3 plantes rares de grande valeur médicinale et alchimique.",
            failure: "Les plantes se flétrissent à peine cueillies. L'écosystème est plus fragile qu'il n'y paraît."
          }
        },
        {
          label: "Communiquer avec les Sylphides",
          description: "Tenter d'interagir avec les créatures fées",
          consequence: "Elles pourraient connaître un raccourci sûr.",
          skillCheck: {
            skill: 'Dressage',
            dc: 13,
            success: "Les Sylphides vous guident vers un passage secret ! Raccourci vers la Salle des Graines.",
            failure: "Les Sylphides s'enfuient en laissant des traînées de lumière. Pas de raccourci."
          }
        },
        {
          label: "Continuer l'exploration",
          description: "Poursuivre vers les profondeurs de l'Arbre",
          consequence: "Le tunnel principal descend vers la Salle des Graines.",
          nextScene: 'racines-4-graines'
        }
      ]
    }
  ],
  loot: [
    "Sève Dorée d'Yggdrasylve (×1, guérison totale, usage unique par visite)",
    "Lys Lunaire (antidote universel, usage unique, valeur : 200 po)",
    "Champignon Spectral (invisibilité 10 min, usage unique, valeur : 150 po)",
    "Mousse Curative (potion de soin supérieure, 4d4+4 PV, valeur : 100 po)",
    "Graines Lumineuses (×5, plantables, créent une source de lumière permanente, 30 po chacune)"
  ],
  nextScenes: ['racines-4-graines', 'racines-5-bassin-seve'],
  previousScene: 'racines-2-toile'
};

// ============================================================================
// SALLE 4 : Salle des Graines du Monde
// ============================================================================
const SCENE_GRAINES: BookScene = {
  id: 'racines-4-graines',
  sceneNumber: 4,
  title: "La Salle des Graines du Monde",
  type: 'revelation',
  location: "Chambre des Graines, Cœur racinaire d'Yggdrasylve",
  locationId: 'yggdrasylve-graines',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le tunnel s'élargit en une chambre sphérique parfaite — une bulle d'air au cœur même de la racine principale. Les parois sont lisses comme l'intérieur d'un fruit, et leur surface est ponctuée de centaines d'alvéoles naturelles, chacune contenant une graine.

Mais quelles graines. Chacune fait la taille d'un poing humain et brille d'une lumière intérieure unique — or, argent, cuivre, émeraude, saphir. Certaines pulsent, d'autres émettent un bourdonnement à peine audible. Chaque graine est un potentiel, une promesse de vie à une échelle que vous ne pouvez qu'imaginer.

Au centre de la chambre, suspendue dans un réseau de radicelles dorées, la plus grande graine repose — une sphère de la taille d'une pastèque, d'un vert profond veiné d'or liquide. C'est la Graine Primordiale, la graine originelle dont Yggdrasylve est né. Si l'Arbre-Monde venait à mourir, cette graine pourrait en engendrer un nouveau — dans quelques millénaires.

Des runes draconiques sont gravées dans l'écorce intérieure, entourant la Graine Primordiale d'un cercle de protection. Parmi elles, vous reconnaissez le symbole du Sceau de Forêt — ici, la magie qui emprisonne Malachar est littéralement enracinée dans la vie même.

Une graine dans un coin de la chambre est noircie, flétrie, morte. Et les graines voisines commencent à montrer les mêmes symptômes. La corruption s'étend.`,
    mood: 'émerveillement cosmique, urgence sacrée',
    music: 'Résonances harmoniques, bourdonnement vital, urgence douce'
  },
  gmNotes: [
    {
      type: 'info',
      text: "La Graine Primordiale ne peut PAS être prise — elle est liée à Yggdrasylve par des milliers de radicelles. Cependant, les graines secondaires (celles dans les alvéoles) peuvent être récoltées. Chaque graine, plantée, fait pousser un arbre en accéléré (1 heure) qui a une propriété magique unique."
    },
    {
      type: 'lore',
      text: "Les Graines du Monde sont la création ultime d'Yggdrasylve — chacune contient le code génétique magique d'un écosystème entier. La graine noircie est le signe que la corruption de Malachar atteint les fonctions les plus profondes de l'Arbre. Si la Graine Primordiale est corrompue, la vie sur le continent tout entier sera menacée."
    },
    {
      type: 'secret',
      text: "Planter une Graine du Monde dans un lieu corrompu peut purifier une zone de 100m de diamètre. Cela sera crucial dans l'Acte 4. Les PJ devraient emporter au moins 2-3 graines. La graine noircie, si analysée (Arcanes DD 17), révèle la signature magique du cultiste de Malachar — la même que celle trouvée dans les Catacombes (Donjon 1)."
    },
    {
      type: 'warning',
      text: "Prendre trop de graines (plus de 5) affaiblit les défenses de l'Arbre. Chaque graine prise au-delà de 5 réduit la résistance du Sceau de Forêt de 5%. Si le groupe est cupide, faites-le sentir : les filaments lumineux s'éteignent, l'Arbre gémit."
    }
  ],
  skillChecks: [
    {
      skill: 'Arcanes',
      dc: 17,
      success: "La graine noircie porte la signature magique d'un Orbe de Corruption — le même type d'artefact que celui utilisé dans les Catacombes. Le cultiste est le même individu.",
      failure: "La graine est morte, corrompue par une magie sombre. Vous ne pouvez pas en identifier la source exacte."
    },
    {
      skill: 'Nature',
      dc: 15,
      success: "Vous identifiez les graines les plus utiles : une qui purifie la corruption, une qui accélère la croissance, une qui crée un bouclier végétal. Vous savez lesquelles prendre.",
      failure: "Toutes les graines vous semblent identiques malgré leurs couleurs différentes."
    },
    {
      skill: 'Religion',
      dc: 14,
      success: "Les runes autour de la Graine Primordiale sont des prières de Sylvana. Vous comprenez que le Sceau de Forêt est ancré dans la vie même d'Yggdrasylve — détruire l'Arbre brise le Sceau.",
      failure: "Les runes sont dans une langue divine que vous ne maîtrisez pas."
    }
  ],
  choices: [
    {
      id: 'choix-graines-1',
      prompt: "La Salle des Graines s'offre à vous. Que faites-vous ?",
      options: [
        {
          label: "Récolter quelques graines avec respect (2-3)",
          description: "Prendre des graines sans nuire à l'Arbre",
          consequence: "L'Arbre accepte ce prélèvement modeste. Aucun effet négatif.",
          nextScene: 'racines-5-bassin-seve'
        },
        {
          label: "Analyser la graine corrompue",
          description: "Étudier la source de la corruption",
          consequence: "Des indices précieux sur le cultiste de Malachar.",
          skillCheck: {
            skill: 'Arcanes',
            dc: 17,
            success: "Vous identifiez la signature de l'Orbe de Corruption. Le même ennemi opère depuis le début de la campagne.",
            failure: "La corruption est trop chaotique pour être analysée. Vous percevez seulement la malveillance."
          }
        },
        {
          label: "Tenter de purifier la graine noircie",
          description: "Utiliser de la magie curative sur la graine morte",
          consequence: "Acte noble mais très difficile.",
          skillCheck: {
            skill: 'Nature',
            dc: 18,
            success: "La graine reprend lentement ses couleurs ! Vous ralentissez la corruption dans cette zone. L'Arbre émet une pulsation de gratitude.",
            failure: "La corruption résiste. La graine reste noircie. Au moins vous n'avez pas aggravé la situation."
          }
        },
        {
          label: "Continuer sans prendre de graines",
          description: "Respecter le sanctuaire et poursuivre",
          consequence: "L'Arbre vous récompense par une bénédiction passive : +1 aux sauvegardes tant que vous êtes dans ses racines.",
          nextScene: 'racines-5-bassin-seve'
        }
      ]
    }
  ],
  loot: [
    "Graine de Purification (planter : purifie 100m de diamètre de corruption, objet de quête)",
    "Graine de Croissance (planter : arbre bouclier en 1 heure, couverture totale, 100 PV)",
    "Graine de Lumière (planter : arbre qui éclaire 300m, repousse les morts-vivants)",
    "Fragment de Graine Corrompue (preuve, indice sur le cultiste)",
    "Sève Concentrée (×2, potion de soin supérieure, 4d4+4 PV)"
  ],
  nextScenes: ['racines-5-bassin-seve'],
  previousScene: 'racines-3-jardin'
};

// ============================================================================
// SALLE 5 : Bassin de Sève Dorée
// ============================================================================
const SCENE_BASSIN_SEVE: BookScene = {
  id: 'racines-5-bassin-seve',
  sceneNumber: 5,
  title: "Le Bassin de Sève Dorée",
  type: 'rest',
  location: "Bassin central de sève, Racines d'Yggdrasylve",
  locationId: 'yggdrasylve-bassin',
  estimatedMinutes: 20,
  readAloud: {
    text: `Le tunnel débouche sur une grotte naturelle dominée par un bassin de sève dorée d'une dizaine de mètres de diamètre. La sève est épaisse, tiède et lumineuse — un lac de miel vivant dont la surface ondule au rythme du pouls de l'Arbre. Des vapeurs dorées s'élèvent en volutes paresseuses, saturant l'air d'un parfum de résine chaude et de fleurs printanières.

Les parois de la grotte sont tapissées de racines secondaires qui plongent dans le bassin comme des milliers de pailles organiques, aspirant la sève pour la distribuer dans tout l'Arbre. L'ensemble forme un système circulatoire végétal d'une complexité ahurissante.

Les propriétés curatives du bassin sont palpables : vos blessures picotent, vos muscles endoloris se relâchent, et une fatigue que vous n'aviez même pas conscience de porter semble s'évaporer. L'eau — la sève — irradie une énergie vitale si concentrée qu'elle est presque enivrante.

Mais au bord du bassin, côté est, la sève est plus sombre. Des filaments noirs s'insinuent dans l'or, comme des veines malades dans un organisme sain. La corruption n'est pas encore ici, mais elle approche. Et quelque part en dessous, vous percevez un battement discordant — un deuxième rythme qui combat le pouls naturel de l'Arbre.`,
    mood: 'guérison, beauté, urgence sous-jacente',
    music: 'Bulles de sève, battement vital, harmoniques dorées'
  },
  gmNotes: [
    {
      type: 'info',
      text: "S'immerger dans le bassin restaure tous les PV, soigne toute maladie/poison/malédiction, et octroie la Bénédiction de la Sève : +2 PV temporaires par niveau du PJ pendant 24h. Cet effet ne fonctionne qu'une fois par PJ. Zone de repos sûre — dernier repos avant la Reine Araignée."
    },
    {
      type: 'tip',
      text: "Les fioles de sève récupérées ici sont plus puissantes que celles de l'entrée : 4d8+10 PV par fiole. Maximum 3 fioles par PJ (la sève perd ses propriétés si on en prend trop — elle se « dilue » magiquement)."
    },
    {
      type: 'warning',
      text: "Les filaments noirs sont un avertissement : la corruption de la Reine Araignée atteint le système circulatoire de l'Arbre. Plus les PJ tardent, plus la corruption s'étend. Mécaniquement, chaque heure passée après le Bassin ajoute +1 PV à la Reine Araignée (max +20)."
    },
    {
      type: 'secret',
      text: "Un PJ qui s'immerge et tente de communier avec l'Arbre via la sève (Nature DD 16) reçoit une vision complète du donjon restant : la Reine Araignée (Salle 6), le Cœur Corrompu (Salle 7), le Puzzle des Saisons (Salle 8), le Sanctuaire de Sylvana (Salle 9) et l'Avatar Corrompu (Salle 10). La vision montre aussi le cultiste — un humain encapuchonné avec un orbe noir — dans le Cœur Corrompu."
    }
  ],
  skillChecks: [
    {
      skill: 'Nature',
      dc: 16,
      success: "En communiant avec l'Arbre à travers la sève, vous recevez une carte mentale complète du donjon et une vision du cultiste ennemi.",
      failure: "La sève est trop puissante pour votre esprit. Vous ne percevez qu'un tourbillon de sensations végétales."
    },
    {
      skill: 'Médecine',
      dc: 13,
      success: "Vous récoltez la sève avec expertise, maximisant ses propriétés curatives. Vos fioles sont particulièrement puissantes (+2 PV par fiole).",
      failure: "Vous récoltez de la sève mais elle perd un peu de puissance hors du bassin."
    }
  ],
  choices: [
    {
      id: 'choix-bassin-1',
      prompt: "Le bassin de sève offre guérison et repos. Que faites-vous ?",
      options: [
        {
          label: "S'immerger et se reposer",
          description: "Profiter pleinement des propriétés curatives",
          consequence: "Guérison totale et PV temporaires. Mais le temps passe et la corruption avance.",
          nextScene: 'racines-6-reine-araignee'
        },
        {
          label: "Récolter de la sève et partir rapidement",
          description: "Prendre des fioles et continuer sans tarder",
          consequence: "Moins de guérison mais la corruption n'avance pas.",
          nextScene: 'racines-6-reine-araignee'
        },
        {
          label: "Communier avec l'Arbre via la sève",
          description: "Tenter une vision complète du donjon",
          consequence: "Intelligence tactique précieuse.",
          skillCheck: {
            skill: 'Nature',
            dc: 16,
            success: "Vision complète ! Vous connaissez la disposition de toutes les salles restantes et les faiblesses de vos ennemis.",
            failure: "La vision est trop intense. Vous émergez désorienté (-2 aux jets pendant 10 minutes)."
          }
        }
      ]
    }
  ],
  loot: [
    "Bénédiction de la Sève (+2 PV temporaires par niveau, 24h)",
    "Sève Dorée Concentrée (×3, potion, 4d8+10 PV, valeur : 200 po chacune)",
    "Résine d'Yggdrasylve (matériau d'enchantement, +1 à un objet existant, usage unique, valeur : 500 po)"
  ],
  nextScenes: ['racines-6-reine-araignee'],
  previousScene: 'racines-4-graines'
};

// ============================================================================
// SALLE 6 : Tanière de la Reine Araignée
// ============================================================================
const SCENE_REINE_ARAIGNEE: BookScene = {
  id: 'racines-6-reine-araignee',
  sceneNumber: 6,
  title: "La Tanière de la Reine Araignée",
  type: 'combat',
  location: "Tanière de la Reine, Racines profondes d'Yggdrasylve",
  locationId: 'yggdrasylve-taniere-reine',
  estimatedMinutes: 40,
  readAloud: {
    text: `Le tunnel plonge brutalement et débouche sur une caverne monstrueuse entièrement tapissée de soie noire. Ce n'est pas la soie blanche des araignées de surface — c'est une soie corrompue, noire comme l'encre, qui pulse d'une énergie sombre. Les filaments lumineux d'Yggdrasylve ici sont étouffés, enveloppés, éteints.

Au centre de cette cathédrale de soie trône la Reine Araignée — Shelaith la Tisseuse de Ténèbres. Son corps fait six mètres de diamètre, huit pattes articulées de trois mètres chacune, et un abdomen gonflé de sève corrompue qui luit d'une lueur malsaine. Ses yeux — huit orbes de jais parfaitement alignées — reflètent votre image avec une intelligence froide et calculatrice.

Des câbles de soie noire partent de son abdomen et s'enfoncent dans les parois de la racine, littéralement branchés sur le système vasculaire de l'Arbre. Elle se nourrit de la vie d'Yggdrasylve, et chaque battement de son cœur arachnide arrache un peu plus de force à l'Arbre-Monde.

Autour d'elle, des centaines d'œufs noirs tapissent le sol — une armée en devenir. Et à ses pieds, un humain encapuchonné est agenouillé, un orbe de cristal noir entre les mains, murmurant des incantations qui nourrissent la corruption.

La Reine vous a vus avant même que vous ne la voyiez. Sa voix résonne dans vos esprits — pas un son, mais une vibration de soie qui fait trembler vos nerfs : « Vous êtes venus mourir dans mes racines. Comme c'est... appétissant. »`,
    mood: 'terreur, combat épique, horreur organique',
    music: 'Thème de boss arachnide, vibrations graves, cordes discordantes'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Shelaith est un boss CR 8. Le cultiste (CR 4) combat à ses côtés. Couper les câbles de soie reliant Shelaith à l'Arbre (3 câbles, 20 PV chacun, CA 12) empêche sa régénération. Le cultiste peut être vaincu séparément — sans lui, l'Orbe de Corruption cesse de fonctionner et Shelaith perd ses pouvoirs nécrotiques."
    },
    {
      type: 'tip',
      text: "Lirael (si sauvé) connaît les faiblesses de Shelaith : le feu, couper les câbles, et viser les yeux (attaque ciblée CA 18, aveugle Shelaith si 4 yeux sur 8 sont détruits). Lirael combat aux côtés des PJ et cible les câbles en priorité."
    },
    {
      type: 'warning',
      text: "Shelaith invoque des araignons (araignées miniatures en essaim) toutes les 3 rounds si les œufs ne sont pas détruits. Détruire les œufs est une priorité tactique. Le cultiste tente de fuir avec l'Orbe si Shelaith tombe en dessous de 25% PV."
    },
    {
      type: 'secret',
      text: "Le cultiste est Theron, un ancien prêtre de Sylvana corrompu par Malachar. L'Orbe de Corruption qu'il porte est un artefact de Malachar — le même type utilisé dans les Catacombes (Donjon 1). Capturer Theron vivant (au lieu de le tuer) révèle l'identité du Maître qu'il sert : un agent de Malachar infiltré dans le Conseil d'Aethelgard."
    }
  ],
  encounter: {
    name: "Shelaith, Reine Araignée & Theron le Cultiste",
    enemies: [
      {
        name: "Shelaith, Tisseuse de Ténèbres",
        hp: 120,
        atk: 9,
        ac: 16,
        cr: 8,
        abilities: [
          "Morsure Toxique : +9 au toucher, 2d10+5 perçant + 3d6 poison. Constitution DD 16 ou Empoisonné + Paralysé 1 tour",
          "Patte Écrasante (×2) : +8 au toucher (portée 3m), 2d8+4 contondant",
          "Toile Noire : (Recharge 4-6) Zone de 6m de diamètre, toutes les créatures : Dextérité DD 15 ou Entravé. La toile noire inflige 1d6 nécrotique/tour",
          "Drain de Sève : Tant que les câbles sont connectés à l'Arbre, Shelaith régénère 10 PV/tour. Couper les 3 câbles (20 PV chacun) stoppe la régénération",
          "Invocation d'Araignons : Tous les 3 rounds si les œufs existent, 1 essaim d'araignons apparaît (CR 1, 18 PV)",
          "Soie Corrompue : Les armes de mêlée qui touchent Shelaith sont couvertes de soie collante. Force DD 13 ou l'arme colle au corps de Shelaith",
          "Vulnérabilité au Feu : Dégâts de feu ×1.5, enflamme la soie noire"
        ]
      },
      {
        name: "Theron, Cultiste de Malachar",
        hp: 52,
        atk: 7,
        ac: 14,
        cr: 4,
        abilities: [
          "Rayon de Corruption : +7, portée 18m, 3d8 nécrotique",
          "Bouclier de Soie : Réaction, +3 CA (Shelaith le protège avec un fil de soie)",
          "Orbe de Corruption : (1/combat) Vague de corruption dans 9m, 4d6 nécrotique, Constitution DD 15 pour moitié. Les plantes dans la zone meurent",
          "Invocation de Ténèbres : (1/combat) Zone de ténèbres magiques 6m pendant 3 rounds",
          "Fuite : Si Shelaith < 25% PV, Theron tente de fuir avec l'Orbe",
          "Fragile : Sans Shelaith, Theron perd Bouclier de Soie et combat seul (désavantage sur jets de sauvegarde mentaux)"
        ]
      }
    ],
    terrain: [
      "Soie noire au sol : terrain difficile, 1d6 nécrotique si immobilisé dedans",
      "3 Câbles de Sève : cibles destructibles (20 PV chacun, CA 12), couper stoppe la régénération",
      "Œufs noirs : destructibles en masse (feu = 1 round pour tout brûler, stoppe les essaims)",
      "Parois de soie : inflammables, brûlent en créant des zones de feu (2d6 feu/round)",
      "Espace dégagé au centre (10m) : zone de combat principale"
    ],
    tactics: "Shelaith reste au centre, utilisant ses pattes et sa morsure en mêlée. Elle lance Toile Noire sur les groupes rapprochés. Theron reste derrière Shelaith, utilisant Rayon de Corruption depuis la sécurité de son Bouclier de Soie. Priorités défensives : Shelaith protège les câbles et les œufs. Si les câbles sont coupés, elle devient plus agressive (+2 attaque, desperation). Si les œufs sont détruits, elle entre en rage (-2 CA, +4 dégâts).",
    loot: [
      "Soie Noire Enchantée (×3, matériau pour armure ou corde résistante, 100 po chacun)",
      "Croc de Shelaith (dague +2, 1d4+2 + 3d6 poison, Constitution DD 16, valeur : 1500 po)",
      "Orbe de Corruption de Malachar (artefact maudit, objet de quête — ne pas utiliser !)",
      "Cape de Theron (cape, +1 Discrétion, résistance nécrotique, valeur : 800 po)",
      "Journal de Theron (révèle le plan de Malachar et l'identité de son maître au Conseil)"
    ]
  },
  skillChecks: [
    {
      skill: 'Athlétisme',
      dc: 14,
      success: "Vous arrachez un câble d'un seul coup puissant ! La sève dorée gicle et Shelaith hurle de douleur.",
      failure: "Le câble est trop résistant pour être arraché. Il faut le couper avec une arme."
    },
    {
      skill: 'Persuasion',
      dc: 16,
      success: "Vous convainquez Theron de la futilité de son combat. Il hésite — un moment de faiblesse exploitable.",
      failure: "Theron rit. « Malachar m'a montré la vérité. Vous êtes aveugles. »"
    }
  ],
  choices: [
    {
      id: 'choix-reine-1',
      prompt: "Shelaith et Theron se dressent entre vous et le Cœur de l'Arbre.",
      options: [
        {
          label: "Combattre en ciblant les câbles d'abord",
          description: "Couper la source de régénération de Shelaith",
          consequence: "Stratégie optimale mais expose les PJ aux attaques.",
          nextScene: 'racines-7-coeur-corrompu'
        },
        {
          label: "Cibler Theron en priorité",
          description: "Éliminer le cultiste et l'Orbe de Corruption",
          consequence: "Shelaith perd ses pouvoirs nécrotiques mais reste dangereuse.",
          nextScene: 'racines-7-coeur-corrompu'
        },
        {
          label: "Brûler les œufs et la soie",
          description: "Mettre le feu à tout pour affaiblir Shelaith",
          consequence: "Efficace mais dangereux dans un espace confiné.",
          nextScene: 'racines-7-coeur-corrompu'
        },
        {
          label: "Tenter de capturer Theron vivant",
          description: "Neutraliser le cultiste sans le tuer",
          consequence: "Plus difficile mais les informations qu'il possède sont précieuses.",
          nextScene: 'racines-7-coeur-corrompu'
        }
      ]
    }
  ],
  loot: [
    "Croc de Shelaith (dague +2, poison)",
    "Orbe de Corruption (objet de quête)",
    "Cape de Theron (+1 Discrétion, résistance nécrotique)",
    "Journal de Theron (lore)",
    "3 Soies Noires Enchantées (100 po chacune)"
  ],
  nextScenes: ['racines-7-coeur-corrompu'],
  previousScene: 'racines-5-bassin-seve'
};

// ============================================================================
// SALLE 7 : Cœur Corrompu de l'Arbre
// ============================================================================
const SCENE_COEUR_CORROMPU: BookScene = {
  id: 'racines-7-coeur-corrompu',
  sceneNumber: 7,
  title: "Le Cœur Corrompu de l'Arbre",
  type: 'exploration',
  location: "Cœur d'Yggdrasylve, Racines profondes",
  locationId: 'yggdrasylve-coeur',
  estimatedMinutes: 30,
  readAloud: {
    text: `Au-delà de la tanière de Shelaith, le tunnel se transforme. L'écorce qui vous entourait devient chair — un tissu vivant et palpitant, chaud sous vos doigts, parcouru de veines de sève de plus en plus sombres. Vous n'êtes plus dans les racines. Vous êtes à l'intérieur de l'Arbre lui-même, dans ses organes vitaux.

Le Cœur d'Yggdrasylve est une chambre organique de forme ovoïde, pulsant comme un cœur véritable. Au centre, un noyau de lumière dorée — le cœur métaphysique de l'Arbre-Monde — bat avec une régularité de métronome. Mais ce cœur est malade. Des excroissances noires, semblables à des tumeurs, s'accrochent à sa surface, pulsant d'une lueur violette sombre qui contredit le rythme doré.

La corruption est ici, visible, tangible. Des filaments noirs s'étendent du noyau vers les parois, infectant les canaux de sève qui distribuent la vie dans tout l'Arbre. Là où ces filaments touchent la chair de l'Arbre, le tissu se nécrose — gris, flétri, mort.

Le Sceau de Forêt brille faiblement au centre du noyau — un symbole de feuille d'or suspendu dans la lumière dorée, entouré de corruption qui tente de l'étouffer. Le Sceau résiste encore, mais il faiblit à chaque battement. Chaque pulsation est un peu plus faible, un peu plus lente. L'Arbre-Monde est en train de mourir.`,
    mood: 'urgence vitale, tragédie, détermination',
    music: 'Battement cardiaque ralenti, dissonances organiques, urgence'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le Cœur peut être partiellement purifié par un rituel combiné (Religion DD 16 + Nature DD 16, deux PJ doivent réussir simultanément). La purification complète nécessitera le rituel dans le Sanctuaire de Sylvana (Salle 9). Ici, les PJ ne peuvent que ralentir la corruption."
    },
    {
      type: 'lore',
      text: "La corruption provient de l'Orbe de Malachar planté ici par Theron. Même si Theron est vaincu, l'Orbe a laissé des traces qui continuent de grandir. Seul le pouvoir de Sylvana (Salle 9) ou la destruction de l'Avatar Corrompu (Salle 10) peut inverser le processus."
    },
    {
      type: 'tip',
      text: "Si les PJ ont récupéré l'Orbe de Corruption de Theron, ils peuvent comprendre comment la corruption s'est implantée (Arcanes DD 16). Cela donne un avantage sur les jets de purification dans les Salles 8 et 9."
    },
    {
      type: 'secret',
      text: "Toucher le noyau doré avec une Graine du Monde (Salle 4) crée une résonance qui renforce temporairement le Sceau de Forêt (+1 round avant que l'Avatar ne se forme dans la Salle 10). C'est un investissement tactique pour le combat final."
    }
  ],
  skillChecks: [
    {
      skill: 'Religion',
      dc: 16,
      success: "Vous canalisez une énergie purificatrice dans le Cœur. Les tumeurs les plus petites se dissolvent et le rythme cardiaque se stabilise légèrement.",
      failure: "La corruption repousse votre énergie. Le Cœur est trop infecté pour un traitement partiel. Il faudra plus de puissance."
    },
    {
      skill: 'Nature',
      dc: 16,
      success: "En communiant avec le système immunitaire de l'Arbre, vous réactivez certaines défenses naturelles. Les filaments noirs reculent de quelques centimètres.",
      failure: "L'Arbre est trop affaibli pour répondre à votre appel. Ses défenses sont au plus bas."
    },
    {
      skill: 'Arcanes',
      dc: 16,
      success: "Vous analysez la structure de la corruption : c'est un « parasite magique » ancré dans le noyau. Le détruire nécessite un rituel de purification dans un lieu sacré — le Sanctuaire de Sylvana.",
      failure: "La corruption est d'une complexité magique terrifiante. Vous comprenez qu'elle est liée à Malachar mais pas comment la détruire."
    }
  ],
  choices: [
    {
      id: 'choix-coeur-1',
      prompt: "Le Cœur corrompu d'Yggdrasylve bat devant vous. Le temps presse.",
      options: [
        {
          label: "Tenter une purification partielle",
          description: "Combiner Religion et Nature pour nettoyer ce que vous pouvez",
          consequence: "Ralentit la corruption — donne plus de temps pour la suite.",
          nextScene: 'racines-8-puzzle-saisons'
        },
        {
          label: "Utiliser une Graine du Monde sur le noyau",
          description: "Sacrifier une graine pour renforcer le Sceau",
          consequence: "Renforce le Sceau de Forêt et donne un avantage tactique pour le boss.",
          nextScene: 'racines-8-puzzle-saisons'
        },
        {
          label: "Analyser et poursuivre",
          description: "Comprendre la corruption et chercher une solution plus loin",
          consequence: "Informations tactiques pour les salles suivantes.",
          nextScene: 'racines-8-puzzle-saisons'
        },
        {
          label: "Se hâter vers le Sanctuaire",
          description: "Courir chercher le pouvoir de Sylvana",
          consequence: "Le temps est compté — chaque minute compte.",
          nextScene: 'racines-9-sanctuaire'
        }
      ]
    }
  ],
  loot: [
    "Éclat de Cœur d'Arbre (gemme dorée, +2 aux sorts de guérison, 1/jour : Restauration Partielle, valeur : 800 po)",
    "Sève du Cœur (×1, guérit tout, ressuscite un personnage mort depuis moins de 1 minute, usage unique)",
    "Fragment de Corruption (composante, nécessaire pour comprendre les Orbes de Malachar)"
  ],
  nextScenes: ['racines-8-puzzle-saisons', 'racines-9-sanctuaire'],
  previousScene: 'racines-6-reine-araignee'
};

// ============================================================================
// SALLE 8 : Puzzle des Saisons
// ============================================================================
const SCENE_PUZZLE_SAISONS: BookScene = {
  id: 'racines-8-puzzle-saisons',
  sceneNumber: 8,
  title: "Le Puzzle des Saisons",
  type: 'exploration',
  location: "Chambre des Saisons, Racines d'Yggdrasylve",
  locationId: 'yggdrasylve-saisons',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le passage menant au Sanctuaire de Sylvana est bloqué par une porte vivante — une membrane de bois qui refuse de s'ouvrir. Devant la porte, une chambre circulaire est divisée en quatre quartiers, chacun représentant une saison.

Le quartier du Printemps est un jardin en fleurs miniature, avec des bourgeons qui s'ouvrent et se referment en accéléré. Le quartier de l'Été est une clairière ensoleillée — un sort d'illusion projette un soleil chaud et des blés dorés. Le quartier de l'Automne est un tapis de feuilles mortes aux couleurs flamboyantes, avec des champignons et des brumes. Le quartier de l'Hiver est un paysage gelé, avec de la neige artificielle et des cristaux de givre.

Au centre des quatre quartiers, un cercle de pierre porte une inscription en sylvain : « Le cycle de la vie est le cycle de l'Arbre. Montrez que vous comprenez le temps pour mériter l'audience de Celle qui Plante. »

Chaque quartier contient un artefact : une graine (Printemps), un fruit (Été), une feuille sèche (Automne) et une branche nue (Hiver). Le cercle central a quatre emplacements.`,
    mood: 'réflexion, beauté naturelle, puzzle',
    music: 'Changements de saison musicaux, harpe printanière, violoncelle automnal'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le puzzle est simple en apparence : placer les 4 artefacts dans le bon ordre. L'ordre est le cycle de VIE de l'arbre, pas le cycle calendaire : Graine (naissance) → Fruit (maturité) → Feuille (déclin) → Branche (mort/dormance). Pas Printemps-Été-Automne-Hiver. Le piège est de confondre le cycle des saisons avec le cycle de vie."
    },
    {
      type: 'tip',
      text: "L'inscription dit « le cycle de la VIE », pas « le cycle des SAISONS ». Un jet de Nature DD 13 permet de saisir la nuance. Le mauvais ordre (saisons calendaires) déclenche un piège de bourrasque qui repousse les artefacts et inflige 2d8 dégâts de force."
    },
    {
      type: 'secret',
      text: "Il y a un 5ème artefact caché : une pousse verte qui sort d'une branche morte, trouvable sous la neige de l'Hiver (Perception DD 15). C'est le symbole de la Renaissance — le placer après la Branche complète le vrai cycle et ouvre un passage secret vers un trésor supplémentaire dans le Sanctuaire."
    },
    {
      type: 'warning',
      text: "3 essais maximum. Après 3 échecs, la porte ne s'ouvrira qu'en détruisant la membrane avec des dégâts radiants (30 PV, résistance à tout sauf radiant). Cela endommage l'Arbre et attire un essaim de protecteurs (4 Dryades hostiles, CR 2 chacune)."
    }
  ],
  skillChecks: [
    {
      skill: 'Nature',
      dc: 13,
      success: "Vous comprenez la nuance : l'inscription parle du cycle de VIE, pas des saisons. L'ordre est Graine → Fruit → Feuille → Branche (naissance → maturité → déclin → dormance).",
      failure: "Printemps, Été, Automne, Hiver — l'ordre classique semble évident. Mais est-ce le bon ?"
    },
    {
      skill: 'Perception',
      dc: 15,
      success: "Sous la neige du quartier Hiver, vous trouvez un 5ème artefact : une pousse verte émergeant d'une branche morte. Le symbole de la Renaissance.",
      failure: "Les quatre quartiers contiennent chacun un artefact. Vous ne remarquez rien d'autre."
    },
    {
      skill: 'Intelligence (Investigation)',
      dc: 14,
      success: "L'analyse des emplacements au centre révèle qu'il y a en fait 5 creux, pas 4. Un cinquième artefact existe quelque part.",
      failure: "Quatre artefacts, quatre emplacements. Le puzzle semble simple."
    }
  ],
  choices: [
    {
      id: 'choix-saisons-1',
      prompt: "Le puzzle des saisons bloque le passage. Quel ordre choisissez-vous ?",
      options: [
        {
          label: "Ordre des saisons (Printemps → Été → Automne → Hiver)",
          description: "L'ordre calendaire classique",
          consequence: "Piège ! Le mauvais ordre déclenche une bourrasque. 2d8 dégâts de force. Essai perdu.",
          skillCheck: {
            skill: 'Dextérité',
            dc: 14,
            success: "Vous esquivez la bourrasque. Seulement 1d8 dégâts.",
            failure: "La bourrasque vous projette contre le mur. 2d8 dégâts de force."
          }
        },
        {
          label: "Ordre du cycle de vie (Graine → Fruit → Feuille → Branche)",
          description: "L'ordre de naissance à dormance",
          consequence: "Correct ! La membrane-porte s'ouvre lentement, révélant le Sanctuaire.",
          nextScene: 'racines-9-sanctuaire'
        },
        {
          label: "Cycle complet avec Renaissance (Graine → Fruit → Feuille → Branche → Pousse)",
          description: "Inclure le 5ème artefact pour le cycle complet",
          consequence: "Parfait ! La porte s'ouvre ET un passage secret se révèle vers un trésor supplémentaire.",
          nextScene: 'racines-9-sanctuaire'
        },
        {
          label: "Forcer la porte",
          description: "Détruire la membrane par la force",
          consequence: "Possible mais endommage l'Arbre et attire des défenseurs.",
          skillCheck: {
            skill: 'Force',
            dc: 18,
            success: "La membrane cède. L'Arbre gémit. 4 Dryades hostiles apparaissent.",
            failure: "La membrane résiste. Elle ne répond qu'aux dégâts radiants."
          }
        }
      ]
    }
  ],
  loot: [
    "Couronne de Saisons (diadème, change d'apparence selon la saison, +1 Nature, +1 Survie, valeur : 600 po)",
    "Trésor secret (si cycle complet) : Baguette de Croissance Végétale (5 charges, sort Croissance Végétale, valeur : 1000 po)",
    "Baies Magiques (×10, chaque baie nourrit 1 jour et soigne 1d4 PV, valeur : 10 po chacune)"
  ],
  nextScenes: ['racines-9-sanctuaire'],
  previousScene: 'racines-7-coeur-corrompu'
};

// ============================================================================
// SALLE 9 : Sanctuaire de Sylvana
// ============================================================================
const SCENE_SANCTUAIRE_SYLVANA: BookScene = {
  id: 'racines-9-sanctuaire',
  sceneNumber: 9,
  title: "Le Sanctuaire de Sylvana",
  type: 'revelation',
  location: "Sanctuaire de la Déesse, Cœur d'Yggdrasylve",
  locationId: 'yggdrasylve-sanctuaire-sylvana',
  estimatedMinutes: 25,
  readAloud: {
    text: `Au-delà de la membrane-porte, le monde change. Vous entrez dans un espace qui ne devrait pas exister à l'intérieur d'un arbre — ou de quoi que ce soit de physique. C'est un lieu entre les mondes, un fragment de plan divin incrusté dans la réalité.

Le Sanctuaire de Sylvana est une clairière infinie baignée d'une lumière dorée qui n'a pas de source visible. Le sol est de mousse parfaite — éternellement verte, éternellement douce. Des arbres de lumière pure poussent en cercle, leurs branches entrelacées formant une cathédrale végétale dont la voûte se perd dans un ciel d'émeraude.

Au centre de la clairière, un autel vivant — un arbre miniature de pure énergie — brille d'une lumière si intense qu'elle est presque insoutenable. C'est l'Avatar de Sylvana — ou plutôt, ce qui en reste. La déesse elle-même n'est plus là depuis longtemps, mais un fragment de sa volonté persiste ici, maintenu par la foi et par la vie d'Yggdrasylve.

L'autel parle. Pas avec des mots, mais avec des émotions, des images, des certitudes qui s'impriment directement dans votre conscience : gratitude pour votre venue, tristesse pour la corruption de son Arbre, et une demande — une supplication — de sauver ce qu'elle a créé.

La lumière de l'autel pulse et un choix se présente : accepter le pouvoir de Sylvana pour purifier l'Arbre... au prix d'affronter ce que la corruption engendrera quand elle sera chassée de son hôte.`,
    mood: 'divin, sacré, transcendant',
    music: 'Chœurs célestes, harpe éthérée, résonance divine'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le Sanctuaire offre la Bénédiction de Sylvana à tous les PJ qui l'acceptent : +2 aux sauvegardes pendant le combat final, résistance nécrotique, et les armes sont considérées comme magiques et infligent +1d6 radiant pendant 1 heure. C'est le buff de préparation pour le boss."
    },
    {
      type: 'lore',
      text: "Sylvana est l'une des Anciennes Divinités d'Aethelgard. Elle a planté Yggdrasylve et y a ancré le Sceau de Forêt. Son « départ » est un mystère — certains disent qu'elle est morte, d'autres qu'elle dort dans les racines les plus profondes. Le fragment ici est un écho de sa volonté, pas une intelligence complète."
    },
    {
      type: 'tip',
      text: "Un Druide ou Clerc de la nature peut communier plus profondément avec l'autel (Religion DD 16). En plus de la bénédiction standard, il reçoit un sort unique pour ce combat : Colère de Sylvana (6d8 radiant + 6d8 force dans un cône de 12m, usage unique). C'est l'arme ultime contre le boss."
    },
    {
      type: 'secret',
      text: "Accepter la bénédiction déclenche la Phase Finale : la corruption chassée du Cœur se condense en l'Avatar Corrompu de l'Arbre-Monde (Salle 10). Les PJ doivent le vaincre pour compléter la purification. Refuser la bénédiction = le Sceau de Forêt continue de s'affaiblir (conséquence de campagne)."
    }
  ],
  skillChecks: [
    {
      skill: 'Religion',
      dc: 16,
      success: "Votre communion avec Sylvana est profonde. Vous recevez le sort Colère de Sylvana en plus de la bénédiction standard.",
      failure: "La communion est partielle. Vous recevez la bénédiction standard mais pas le sort unique."
    },
    {
      skill: 'Perspicacité',
      dc: 14,
      success: "Vous comprenez que la bénédiction est aussi un déclencheur : en purifiant le Cœur, vous allez forcer la corruption à prendre forme. Vous vous préparez en conséquence.",
      failure: "La bénédiction semble être un don sans contrepartie. Vous ne pressentez pas la suite."
    }
  ],
  choices: [
    {
      id: 'choix-sanctuaire-1',
      prompt: "L'autel de Sylvana vous offre son pouvoir. Acceptez-vous ?",
      options: [
        {
          label: "Accepter la Bénédiction de Sylvana",
          description: "Recevoir le pouvoir de purifier l'Arbre",
          consequence: "Le combat final contre l'Avatar Corrompu commence. Vous êtes bénis et renforcés.",
          nextScene: 'racines-10-avatar-corrompu'
        },
        {
          label: "Accepter et communier profondément (Druide/Clerc)",
          description: "Aller plus loin dans la connexion divine",
          consequence: "Bénédiction renforcée + sort Colère de Sylvana.",
          skillCheck: {
            skill: 'Religion',
            dc: 16,
            success: "Sylvana vous investit de sa Colère. Un sort dévastateur vous est confié pour le combat à venir.",
            failure: "La communion est trop intense. Vous recevez la bénédiction standard mais êtes étourdi 1 round."
          },
          nextScene: 'racines-10-avatar-corrompu'
        },
        {
          label: "Refuser la Bénédiction",
          description: "Ne pas accepter le pouvoir de Sylvana",
          consequence: "Le Sceau de Forêt continue de s'affaiblir. Conséquence majeure pour la campagne. L'Avatar ne se forme pas (pas de combat final).",
          nextScene: 'racines-sortie'
        }
      ]
    }
  ],
  loot: [
    "Bénédiction de Sylvana (+2 sauvegardes, résistance nécrotique, +1d6 radiant aux armes, 1h)",
    "Sort : Colère de Sylvana (6d8 radiant + 6d8 force, cône 12m, usage unique) — si communion réussie",
    "Graine de l'Arbre de Lumière (planter : crée un arbre sacré permanent qui repousse les morts-vivants dans 100m)",
    "Amulette de Sylvana (+1 sorts de guérison, +1 Nature, bois vivant qui pousse lentement, valeur : 1200 po)"
  ],
  nextScenes: ['racines-10-avatar-corrompu'],
  previousScene: 'racines-8-puzzle-saisons'
};

// ============================================================================
// SALLE 10 : Avatar Corrompu de l'Arbre-Monde (BOSS)
// ============================================================================
const SCENE_BOSS_AVATAR: BookScene = {
  id: 'racines-10-avatar-corrompu',
  sceneNumber: 10,
  title: "L'Avatar Corrompu de l'Arbre-Monde",
  type: 'combat',
  location: "Cœur d'Yggdrasylve, entre deux plans",
  locationId: 'yggdrasylve-coeur-combat',
  estimatedMinutes: 50,
  readAloud: {
    text: `La Bénédiction de Sylvana pulse dans vos veines comme de la sève dorée. La lumière du Sanctuaire se concentre en un rayon qui frappe le Cœur Corrompu — et la corruption se rebelle.

Le sol tremble. Les parois organiques du Cœur se convulsent. Les tumeurs noires sur le noyau se déchirent, libérant des flots de sève noircie qui se rassemblent, s'accumulent et prennent forme. Devant vos yeux, la corruption s'incarne.

L'Avatar Corrompu de l'Arbre-Monde est une abomination végétale de huit mètres de haut — un tronc tordu surmonté d'une canopée de branches mortes, avec des racines qui serpentent au sol comme des tentacules. Son corps est fait du bois mort d'Yggdrasylve, noirci, pourri, animé par la malveillance de Malachar. Des yeux violets brillent dans les crevasses de son écorce, et une bouche béante s'ouvre dans son tronc, vomissant des nuages de spores toxiques.

Le Sceau de Forêt pulse au centre de la bataille — entre vous et l'Avatar. Si vous le protégez, il vous renforce. Si l'Avatar l'atteint, il le dévore.

La voix de Malachar, filtrée à travers la corruption, gronde comme un orage : « Vous ne pouvez pas sauver ce monde mourant. Chaque arbre tombe. Chaque sceau se brise. Rejoignez l'inévitable... ou soyez écrasés. »

L'Avatar charge.`,
    mood: 'combat épique final, apocalyptique, héroïque',
    music: 'Thème de boss final acte 3, percussions tribales, chœurs sombres vs lumière'
  },
  gmNotes: [
    {
      type: 'info',
      text: "BOSS EN 2 PHASES. Phase 1 : Avatar Végétal — combat physique avec tentacules et spores. Phase 2 (50% PV) : Forme Nécrotique — les parties mortes tombent et l'énergie pure de corruption se libère, combat magique. Le Sceau de Forêt au centre est un objectif : les PJ à 3m du Sceau bénéficient de +1 CA et +1 aux jets de sauvegarde. L'Avatar tente de détruire le Sceau."
    },
    {
      type: 'tip',
      text: "Colère de Sylvana (si obtenue) est dévastatrice contre ce boss : double dégâts car l'Avatar est vulnérable au radiant. Timing optimal : au début de la Phase 2 pour maximiser les dégâts avant que l'Avatar ne déploie ses défenses magiques."
    },
    {
      type: 'warning',
      text: "Si l'Avatar atteint le Sceau (il avance de 3m par round s'il n'est pas entravé), il l'absorbe et récupère 50 PV + gagne Aura de Mort. Les PJ doivent le maintenir à distance du Sceau — le contrôle du terrain est essentiel."
    },
    {
      type: 'secret',
      text: "Si les PJ ont purifié partiellement le Cœur (Salle 7) ET utilisé une Graine du Monde, l'Avatar commence avec 20% de PV en moins et le Sceau est protégé par un bouclier qui dure 3 rounds, empêchant l'Avatar de l'absorber immédiatement."
    }
  ],
  encounter: {
    name: "Avatar Corrompu de l'Arbre-Monde",
    enemies: [
      {
        name: "Avatar Corrompu — Phase 1 (Forme Végétale)",
        hp: 150,
        atk: 10,
        ac: 16,
        cr: 10,
        abilities: [
          "Tentacules de Racine (×3) : +10 au toucher (portée 6m), 2d8+5 contondant et Agrippé (Évasion DD 16)",
          "Écrasement : Cible agrippée, automatique, 3d8+5 contondant",
          "Nuage de Spores : (Recharge 5-6) Sphère de 9m, 4d8 poison + 2d8 nécrotique. Constitution DD 17 pour moitié. Empoisonné 1 tour en cas d'échec.",
          "Marche Inexorable : Se déplace de 3m vers le Sceau à chaque début de tour. Peut être repoussé (Force DD 18 ou sort de contrôle)",
          "Absorption Racinaire : Si à 3m du Sceau, absorbe 20 PV/round du Sceau (quand le Sceau atteint 0, catastrophe de campagne)",
          "Régénération Végétale : 10 PV/round. Le feu empêche la régénération pendant 1 round. Le radiant inflige dégâts ×1.5",
          "Vulnérabilités : Feu et Radiant"
        ]
      },
      {
        name: "Avatar Corrompu — Phase 2 (Forme Nécrotique)",
        hp: 75,
        atk: 11,
        ac: 14,
        cr: 11,
        abilities: [
          "Toucher de Corruption : +11 au toucher, 3d10 nécrotique. La cible ne peut pas régénérer de PV pendant 1 round.",
          "Aura de Flétrissement : Toutes les créatures dans 9m au début du tour de l'Avatar : 2d8 nécrotique. Constitution DD 17 pour moitié.",
          "Explosion de Spores Nécrotiques : (Recharge 4-6) Sphère de 12m, 5d8 nécrotique. Constitution DD 18. Échec : les PV max sont réduits du montant des dégâts subis (récupérés après un repos long).",
          "Drain de Vie : Chaque PJ tué par l'Avatar lui rend 30 PV (ne le laissez pas tuer un PJ !)",
          "Forme Éthérée : L'Avatar peut devenir partiellement éthéré (résistance à tous les dégâts physiques non-magiques)",
          "Dernière Corruption : À 0 PV, l'Avatar explose en une vague de corruption (6d6 nécrotique dans 12m, Constitution DD 16). Si le Sceau survit, il se renforce. Si le Sceau est détruit, conséquence de campagne.",
          "Vulnérabilité Radiant : Dégâts radiants ×2 en Phase 2"
        ]
      }
    ],
    terrain: [
      "Cœur d'Yggdrasylve (20m de diamètre) : parois organiques, sol vivant",
      "Sceau de Forêt (centre) : zone de buff +1 CA/sauvegardes dans 3m, objectif à protéger",
      "Racines du Cœur : couverture partielle, peuvent être utilisées pour grappin/escalade",
      "Sève corrompue au sol (Phase 2) : terrain difficile, 1d4 nécrotique si immobilisé dedans",
      "Lumière du Sanctuaire : filtre par le plafond, les sorts radiants sont renforcés (+1 DD) dans la zone éclairée"
    ],
    tactics: "Phase 1 : L'Avatar avance inexorablement vers le Sceau en utilisant ses tentacules pour grapple les PJ qui bloquent le chemin. Il utilise Nuage de Spores pour couvrir sa progression. Phase 2 : Il abandonne l'objectif du Sceau et tente de tuer les PJ directement avec Aura de Flétrissement et Drain de Vie. Il concentre ses attaques sur les soigneurs. Si un PJ est à 0 PV, il priorise l'achever pour se soigner.",
    loot: [
      "Noyau de l'Avatar (gemme corrompue purifiable, si purifiée : +2 sorts de nature, Communion avec la Nature 1/jour, valeur : 3000 po)",
      "Bois de l'Arbre-Monde (matériau légendaire, forgeable en arme ou bâton, +2 magique, propriétés de croissance)",
      "Sceau de Forêt Renforcé (si protégé : tous les PJ gagnent +1 permanent Sagesse, cadeau d'Yggdrasylve)",
      "Cape de Feuilles Vivantes (armure légère, CA 13+Dex, régénère 2 PV/round en extérieur, camouflage en forêt, valeur : 2000 po)",
      "Essence de Corruption Purifiée (composante pour enchantement de haut niveau, valeur : 1500 po)"
    ]
  },
  skillChecks: [
    {
      skill: 'Athlétisme',
      dc: 18,
      success: "Vous repoussez l'Avatar loin du Sceau ! Il recule de 3m et perd son prochain mouvement vers le Sceau.",
      failure: "L'Avatar est trop massif. Vos efforts sont vains et il continue d'avancer."
    },
    {
      skill: 'Nature',
      dc: 16,
      success: "Vous commandez aux racines du Cœur de retenir l'Avatar. Il est Entravé pendant 1 round !",
      failure: "Les racines sont trop faibles pour résister à la corruption de l'Avatar."
    }
  ],
  choices: [
    {
      id: 'choix-avatar-1',
      prompt: "L'Avatar Corrompu s'anime. Le Sceau de Forêt est en jeu.",
      options: [
        {
          label: "Protéger le Sceau à tout prix",
          description: "Former une ligne défensive autour du Sceau",
          consequence: "Tactique défensive — utilise le buff du Sceau mais limite la mobilité.",
          nextScene: 'racines-conclusion'
        },
        {
          label: "Attaquer l'Avatar avec tout ce qu'on a",
          description: "Offensive totale pour le détruire avant qu'il n'atteigne le Sceau",
          consequence: "Course contre la montre — l'Avatar avance de 3m/round.",
          nextScene: 'racines-conclusion'
        },
        {
          label: "Utiliser Colère de Sylvana (si disponible)",
          description: "Déchaîner le sort divin sur l'Avatar",
          consequence: "Dégâts massifs (×2 radiant !). Optimal en début de Phase 2.",
          nextScene: 'racines-conclusion'
        },
        {
          label: "Combiner défense et contrôle",
          description: "Entraver l'Avatar tout en le frappant",
          consequence: "La stratégie la plus sûre mais qui demande coordination.",
          nextScene: 'racines-conclusion'
        }
      ]
    }
  ],
  loot: [
    "Noyau de l'Avatar (3000 po si purifié)",
    "Bois de l'Arbre-Monde (matériau +2)",
    "+1 permanent Sagesse (si Sceau protégé)",
    "Cape de Feuilles Vivantes (2000 po)",
    "Essence de Corruption Purifiée (1500 po)"
  ],
  nextScenes: ['racines-conclusion'],
  previousScene: 'racines-9-sanctuaire'
};

// ============================================================================
// CHAPITRE COMPLET : Les Racines d'Yggdrasylve
// ============================================================================
export const DUNGEON_RACINES: BookChapter = {
  id: 'dungeon-racines-yggdrasylve',
  actNumber: 3,
  chapterNumber: 10,
  title: "Les Racines d'Yggdrasylve",
  subtitle: "Au cœur de l'Arbre-Monde, la vie et la corruption s'affrontent",
  summary: "Les héros s'enfoncent dans les racines de l'Arbre-Monde Yggdrasylve pour sauver le Sceau de Forêt. Ils traversent un monde organique et vivant — toiles d'araignées géantes, jardins bioluminescents, chambres de graines cosmiques — avant d'affronter la Reine Araignée Shelaith et de découvrir le cultiste de Malachar qui empoisonne l'Arbre. Le Sanctuaire de Sylvana leur offre le pouvoir de purifier le Cœur, mais cette purification donne naissance à l'Avatar Corrompu de l'Arbre-Monde — le boss final de l'Acte 3, un combat en deux phases où la protection du Sceau est aussi importante que la destruction de l'ennemi.",
  levelRange: "8-12",
  themes: [
    "Nature vs Corruption",
    "Le cycle de la vie et de la mort",
    "Sacrifice pour le bien commun",
    "Manipulation et trahison (cultiste infiltré)",
    "La conscience du monde vivant"
  ],
  scenes: [
    SCENE_ENTREE_RACINES,
    SCENE_TOILE_ARAIGNEE,
    SCENE_JARDIN,
    SCENE_GRAINES,
    SCENE_BASSIN_SEVE,
    SCENE_REINE_ARAIGNEE,
    SCENE_COEUR_CORROMPU,
    SCENE_PUZZLE_SAISONS,
    SCENE_SANCTUAIRE_SYLVANA,
    SCENE_BOSS_AVATAR
  ],
  chapterIntro: {
    text: `Bienvenue dans les Racines d'Yggdrasylve — le troisième méga-donjon de la campagne d'Aethelgard. Ce donjon est conçu pour des personnages de niveau 8 à 12 et devrait prendre 6 à 8 heures de jeu réel.

Ce donjon est unique : il est vivant. L'Arbre-Monde réagit aux actions des PJ, guidant les bienveillants et résistant aux destructeurs. L'atmosphère alterne entre émerveillement (le jardin, le bassin, le sanctuaire) et horreur (les toiles, le cœur corrompu, l'avatar). Insistez sur le contraste.

Le choix au Sanctuaire de Sylvana est un moment clé de la campagne : accepter la bénédiction sauve le Sceau mais force le combat final. Refuser évite le combat mais condamne le Sceau à long terme. Les joueurs doivent comprendre les enjeux.`,
    mood: 'organique, épique, contrastes entre beauté et horreur',
    music: 'Thème de la forêt profonde, variations entre merveilleux et sombre'
  },
  chapterConclusion: {
    text: `L'Avatar Corrompu s'effondre dans un torrent de sève noire qui se purifie au contact de la lumière du Sceau. Le Cœur d'Yggdrasylve reprend un rythme sain — plus fort, plus régulier — et les filaments lumineux dans les racines reprennent leur éclat doré.

Le Sceau de Forêt brille d'une lumière renouvelée, et l'Arbre-Monde lui-même semble soupirer de soulagement. Pour la première fois depuis des mois, les feuilles en surface cessent de tomber et de nouvelles pousses émergent.

Mais la corruption n'a pas été vaincue — seulement repoussée. Le cultiste Theron a révélé l'existence d'un maître plus puissant au sein du Conseil d'Aethelgard. Et trois Sceaux restent en danger...

Le prochain chapitre de leur quête les entraînera sous les vagues, dans le Temple Englouti de Marethys, où le Sceau de Mer attend.`,
    mood: 'victoire, renouveau, inquiétude persistante',
    music: 'Thème de la forêt renaissante, espoir nuancé d\'urgence'
  },
  rewards: {
    xp: 10000,
    gold: "4000-6000 po (selon exploration)",
    items: [
      "Noyau de l'Avatar purifié (focaliseur nature +2)",
      "Bois de l'Arbre-Monde (matériau légendaire)",
      "Cape de Feuilles Vivantes",
      "Croc de Shelaith (dague +2 poison)",
      "Amulette de Sylvana (+1 guérison/nature)",
      "Couronne de Saisons (+1 Nature/Survie)",
      "Graines du Monde (×2-3, objets de quête)",
      "Orbe de Corruption (objet de quête)",
      "+1 permanent Sagesse (si Sceau protégé)",
      "Allié potentiel : Lirael le Rôdeur"
    ]
  }
};
