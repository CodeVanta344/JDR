/**
 * MEGA-DONJON : Les Mines Perdues de Karak-Zhul
 * Acte 2 — Niveau 4-8
 * 10 salles dans les profondeurs des anciennes mines naines
 */

import type { BookChapter, BookScene } from './gm-book-data';

// ============================================================================
// SALLE 1 : Mine Effondrée — L'Entrée
// ============================================================================
const SCENE_MINE_EFFONDREE: BookScene = {
  id: 'mines-1-entree-effondree',
  sceneNumber: 1,
  title: "La Mine Effondrée",
  type: 'exploration',
  location: "Entrée des Mines de Karak-Zhul",
  locationId: 'mines-entree',
  estimatedMinutes: 25,
  readAloud: {
    text: `L'entrée de Karak-Zhul n'a rien de la grandeur que les légendes naines lui prêtent. Un éboulement massif a réduit le portail monumental — autrefois flanqué de colosses de granit — à un amas de rochers entre lesquels un passage étroit serpente dans les ténèbres. Des poutres de soutènement brisées pointent comme des os fracturés dans la roche.

L'air qui s'échappe de la mine est chaud et sec, chargé d'une odeur de soufre et de poussière minérale. Des rails de chariot rouillés disparaissent sous les décombres, témoins silencieux d'une industrie qui faisait autrefois la fierté du peuple nain. Des inscriptions runiques naines, à demi effacées par les éboulements, mettent en garde : des mots comme « profondeur », « gardien » et « interdit » sont encore lisibles.

En vous faufilant entre les blocs de pierre, vous débouchez dans un tunnel principal large de quatre mètres. Le plafond est renforcé par des arches de pierre naine — un ouvrage si parfait qu'il a résisté aux millénaires et aux tremblements de terre qui ont ravagé la surface. Le sol est couvert d'une poussière épaisse dans laquelle des traces récentes se dessinent : des empreintes de bottes lourdes et des sillons de griffes qui n'appartiennent à aucune créature connue.

Au bout du tunnel, le passage se divise. À gauche, un bruit d'eau courante et des reflets bleutés. À droite, un tunnel descendant d'où provient un grondement sourd et régulier — comme le battement d'un cœur de pierre.`,
    mood: 'aventure, claustrophobie, mystère',
    music: 'Échos miniers, gouttes d\'eau, grondement lointain'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Les traces au sol sont celles de Vers des Profondeurs (Salle 3) et de gobelins mineurs qui servent de chair à canon dans le donjon. Les empreintes de bottes appartiennent à un groupe de mercenaires envoyés par le Consortium des Ombres pour exploiter les ressources de Karak-Zhul — indice pour l'Acte 2."
    },
    {
      type: 'warning',
      text: "L'éboulement à l'entrée est instable. Tout bruit fort (combat, explosion) dans cette zone risque de provoquer un second éboulement. Les PJ qui restent trop longtemps ici doivent faire un jet de Perception DD 12 pour entendre les craquements avertisseurs. Éboulement : 3d6 contondant, Dextérité DD 14 pour moitié."
    },
    {
      type: 'secret',
      text: "Un passage secret nain, invisible à l'œil nu (Investigation DD 17), se cache derrière un panneau de roche mobile. Il mène directement à la Forge Ancienne (Salle 4), contournant les Salles 2 et 3. Les nains l'utilisaient comme raccourci d'urgence."
    },
    {
      type: 'tip',
      text: "Offrez un jet de Survie DD 12 pour analyser les traces. Succès : le PJ identifie au moins 3 types de créatures (gobelins, vers géants, quelque chose de plus grand). Cela donne un aperçu des menaces à venir."
    }
  ],
  skillChecks: [
    {
      skill: 'Survie',
      dc: 12,
      success: "Vous identifiez des traces de gobelins (petites, désordonnées), de vers géants (sillons profonds) et d'une créature massive bipède (empreintes profondes de 40 cm). Au moins trois types de menaces vous attendent.",
      failure: "Des traces dans la poussière — impossibles à identifier avec certitude."
    },
    {
      skill: 'Investigation',
      dc: 17,
      success: "Vous découvrez un panneau de roche mobile qui cache un passage secret nain ! Il semble mener plus profondément dans la mine par un chemin alternatif.",
      failure: "Les murs semblent solides partout. Rien de particulier."
    },
    {
      skill: 'Perception',
      dc: 12,
      success: "Vous entendez des craquements inquiétants dans le plafond. L'éboulement n'est pas terminé — tout bruit fort pourrait provoquer un second effondrement.",
      failure: "La mine semble stable. Pas de danger immédiat apparent."
    }
  ],
  choices: [
    {
      id: 'choix-mine-1',
      prompt: "Le tunnel se divise. Quelle direction prenez-vous ?",
      options: [
        {
          label: "Gauche — vers les reflets bleutés",
          description: "Suivre le bruit d'eau et les reflets de cristal",
          consequence: "Le passage mène au Lac Souterrain de Cristal.",
          nextScene: 'mines-2-lac-cristal'
        },
        {
          label: "Droite — vers le grondement",
          description: "Descendre vers le battement de cœur de la montagne",
          consequence: "Le tunnel descend vers le Nid de Vers des Profondeurs.",
          nextScene: 'mines-3-nid-vers'
        },
        {
          label: "Passage secret (si découvert)",
          description: "Emprunter le passage nain caché",
          consequence: "Un raccourci direct vers la Forge Ancienne.",
          nextScene: 'mines-4-forge-ancienne'
        }
      ]
    }
  ],
  loot: [
    "Pioche naine de mithral (outil, +2 aux jets d'Extraction minière, valeur : 75 po)",
    "Carte partielle des mines (parchemin, révèle les salles 1 à 5)",
    "Rations de survie naines (5 jours, goût terrible, très nutritif)",
    "Casque de mineur avec lanterne intégrée (éclaire 9m, mains libres)"
  ],
  nextScenes: ['mines-2-lac-cristal', 'mines-3-nid-vers', 'mines-4-forge-ancienne'],
  mapMovement: { from: 'montagnes-coeurfer', to: 'mines-karak-zhul-entree' }
};

// ============================================================================
// SALLE 2 : Lac Souterrain de Cristal
// ============================================================================
const SCENE_LAC_CRISTAL: BookScene = {
  id: 'mines-2-lac-cristal',
  sceneNumber: 2,
  title: "Le Lac Souterrain de Cristal",
  type: 'exploration',
  location: "Lac de cristal, Mines de Karak-Zhul",
  locationId: 'mines-lac-cristal',
  estimatedMinutes: 25,
  readAloud: {
    text: `Le tunnel débouche sur une caverne naturelle d'une beauté à couper le souffle. Un lac souterrain d'une eau si pure et si transparente qu'elle semble liquide cristallin remplit presque tout l'espace. La surface est immobile comme un miroir parfait, reflétant les milliers de cristaux qui tapissent les parois et la voûte de la caverne.

Ces cristaux émettent leur propre lumière — une bioluminescence bleutée et violette qui transforme la caverne en une cathédrale de saphir vivant. Les formations cristallines pendent du plafond en grappes scintillantes, certaines atteignant trois mètres de long, et d'autres poussent du sol comme des stalagmites de diamant.

L'eau du lac est glaciale mais incroyablement limpide. Vous pouvez voir le fond à plus de dix mètres de profondeur — un lit de sable blanc parsemé de cristaux tombés et de... quelque chose de métallique. Des objets brillent au fond du lac, vestiges d'une époque où les nains venaient ici pour méditer et consacrer leurs meilleures créations.

Un chemin de pierre étroit longe la rive nord du lac, menant à un tunnel qui s'enfonce plus profondément dans la montagne. Sur la rive sud, une petite plage de sable cristallin s'étend devant une alcôve naturelle où des offrandes naines — chandeliers de mithral, runes gravées sur des galets — ont été déposées avec révérence.`,
    mood: 'émerveillement, sérénité, beauté cachée',
    music: 'Cristaux résonnants, eau calme, échos ambiants doux'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le lac est un lieu sacré nain — les « Eaux de la Première Forge ». Boire l'eau du lac restaure 2d8+4 PV et soigne une maladie ou un poison. Cet effet ne fonctionne qu'une fois par personne. Les nains venaient ici pour consacrer leurs armes légendaires."
    },
    {
      type: 'secret',
      text: "Au fond du lac (10m de profondeur) reposent : une épée naine forgée en mithral pur (arme +2, incroyablement précieuse), un coffret scellé contenant des documents sur le Sceau de Terre, et les restes d'un nain en armure de cérémonie. Plonger nécessite un jet d'Athlétisme DD 14 et la capacité de retenir son souffle (3 tours disponibles, Constitution DD 12 pour chaque tour supplémentaire)."
    },
    {
      type: 'tip',
      text: "Les cristaux peuvent être récoltés (Force DD 12 pour en détacher un). Chaque cristal vaut 50 po et peut servir de composante de sort. Cependant, récolter plus de 3 cristaux déclenche une résonance qui attire les Vers des Profondeurs (Salle 3) — un combat imprévu si les PJ sont trop cupides."
    },
    {
      type: 'warning',
      text: "L'eau du lac est si froide que l'immersion prolongée (plus de 5 minutes) cause des dégâts de froid : 1d6 par minute au-delà de 5 minutes. L'Anneau de Respiration Aquatique (Donjon 1) aide pour la respiration mais pas pour le froid."
    }
  ],
  skillChecks: [
    {
      skill: 'Athlétisme',
      dc: 14,
      success: "Vous plongez avec succès dans les eaux glaciales et atteignez le fond. Les trésors nains sont à portée de main.",
      failure: "Le froid vous saisit dès l'immersion. Vous remontez précipitamment, grelottant et les mains vides."
    },
    {
      skill: 'Nature',
      dc: 13,
      success: "Vous identifiez les cristaux comme de la « Larme de Montagne » — un matériau rare utilisé par les nains pour enchanter leurs armes. Chacun vaut au moins 50 po.",
      failure: "De jolis cristaux lumineux. Probablement sans grande valeur."
    },
    {
      skill: 'Religion',
      dc: 14,
      success: "Vous reconnaissez les offrandes naines : ce lieu est consacré à Moradin, le dieu-forgeron. Faire une offrande sincère (un objet de valeur) octroie la bénédiction de Moradin (+1 aux jets de Forge pendant 1 semaine).",
      failure: "Des objets nains disposés avec soin. Un lieu de culte, certainement, mais les détails vous échappent."
    }
  ],
  choices: [
    {
      id: 'choix-lac-1',
      prompt: "Le lac de cristal offre plusieurs possibilités.",
      options: [
        {
          label: "Plonger pour récupérer les trésors",
          description: "Braver les eaux glaciales pour atteindre le fond",
          consequence: "Risqué mais potentiellement très lucratif.",
          skillCheck: {
            skill: 'Athlétisme',
            dc: 14,
            success: "Vous récupérez l'épée de mithral et le coffret scellé. Victoire glaciale !",
            failure: "Le froid est insoutenable. Vous remontez bredouille avec 1d6 dégâts de froid."
          }
        },
        {
          label: "Boire l'eau sacrée",
          description: "Goûter les eaux bénies de la Première Forge",
          consequence: "Guérison garantie — mais l'effet est unique.",
          nextScene: 'mines-3-nid-vers'
        },
        {
          label: "Récolter des cristaux",
          description: "Détacher quelques cristaux lumineux",
          consequence: "Précieux, mais attention à ne pas en prendre trop...",
          skillCheck: {
            skill: 'Force',
            dc: 12,
            success: "Vous détachez 1d4 cristaux intacts. Chacun vaut 50 po.",
            failure: "Le cristal se brise en éclats sans valeur. La résonance attire l'attention..."
          }
        },
        {
          label: "Continuer vers les profondeurs",
          description: "Emprunter le chemin le long de la rive nord",
          consequence: "Le tunnel descend vers les niveaux inférieurs.",
          nextScene: 'mines-3-nid-vers'
        }
      ]
    }
  ],
  loot: [
    "Eau de la Première Forge (guérit 2d8+4 PV + maladie/poison, usage unique par personne)",
    "Épée de Mithral Naine (+2, 1d8+2 tranchant, légère, incassable, valeur : 1500 po) — fond du lac",
    "Coffret scellé (documents sur le Sceau de Terre) — fond du lac",
    "1d4 Cristaux de Larme de Montagne (50 po chacun, composante de sort)",
    "Offrandes naines : chandelier de mithral (200 po), 3 runes gravées (25 po chacune)"
  ],
  nextScenes: ['mines-3-nid-vers', 'mines-4-forge-ancienne'],
  previousScene: 'mines-1-entree-effondree'
};

// ============================================================================
// SALLE 3 : Nid de Vers des Profondeurs
// ============================================================================
const SCENE_NID_VERS: BookScene = {
  id: 'mines-3-nid-vers',
  sceneNumber: 3,
  title: "Le Nid de Vers des Profondeurs",
  type: 'combat',
  location: "Galeries infestées, Mines de Karak-Zhul",
  locationId: 'mines-nid-vers',
  estimatedMinutes: 35,
  readAloud: {
    text: `Le tunnel se réduit brusquement et les murs changent de texture. La pierre naine taillée avec précision cède la place à des parois irrégulières, luisantes d'un mucus translucide qui colle à tout ce qu'il touche. Le sol est creusé de sillons profonds — des tunnels creusés par quelque chose de massif qui a foré la roche comme un ver dans la terre.

L'odeur est atroce : un mélange d'ammoniac, de pierre dissoute et de matière organique en décomposition. Des restes de minéraux à demi digérés forment des amas vitreux le long des parois, brillant faiblement dans la lueur de vos torches. La roche elle-même semble rongée, acide, malade.

Devant vous s'ouvre une caverne naturelle — ou plutôt, une caverne creusée par les Vers eux-mêmes. Le plafond est un labyrinthe de tunnels circulaires qui s'enfoncent dans toutes les directions. Des œufs translucides, gros comme des pastèques, sont regroupés en grappes sur les parois, leur surface pulsant d'une lueur orangée malsaine. À l'intérieur, des formes vermiculaires s'agitent.

Un Ver des Profondeurs adulte — trois mètres de long, un mètre de diamètre, couvert d'anneaux de chitine grisâtre — est enroulé autour de la plus grande grappe d'œufs. Deux autres, plus petits, patrouillent le périmètre. Le sol tremble légèrement au rythme de mouvements souterrains — d'autres Vers, invisibles, creusent quelque part en dessous.`,
    mood: 'dégoût, danger, survie',
    music: 'Grondements souterrains, crissements de chitine, suintements'
  },
  gmNotes: [
    {
      type: 'info',
      text: "3 Vers des Profondeurs sont visibles (1 adulte, 2 juvéniles). 2 autres adultes sont dans les tunnels et arrivent en renfort au round 3. Détruire les œufs enrage les Vers (+2 attaque, -2 CA). Ignorer les œufs et passer discrètement est possible (Discrétion DD 15 pour le groupe)."
    },
    {
      type: 'tip',
      text: "Les Vers sont vulnérables au feu et au froid. Le feu détruit aussi les œufs efficacement. Le mucus sur les murs est inflammable — y mettre le feu crée un mur de flammes qui bloque les tunnels (empêche les renforts pendant 3 rounds)."
    },
    {
      type: 'warning',
      text: "Si les 5 Vers attaquent simultanément, c'est un TPK probable pour un groupe de niveau 4-5. Gérez les renforts : les 2 Vers supplémentaires n'arrivent qu'au round 3, et seulement si les PJ font du bruit. Un groupe discret peut ne combattre que les 2 juvéniles."
    },
    {
      type: 'secret',
      text: "Sous la grappe d'œufs principale, enterré dans la roche digérée, se trouve un fragment de mithral brut de la taille d'un poing — assez pour forger une arme de qualité supérieure. La grappe doit être détruite ou déplacée pour y accéder."
    }
  ],
  encounter: {
    name: "Le Nid de Vers des Profondeurs",
    enemies: [
      {
        name: "Ver des Profondeurs Adulte",
        hp: 52,
        atk: 7,
        ac: 14,
        cr: 4,
        abilities: [
          "Morsure Acide : +7 au toucher, 2d8+4 perçant + 1d6 acide",
          "Constriction : +7 au toucher (portée 3m), 2d6+4 contondant et Agrippé (Évasion DD 15)",
          "Jet d'Acide : (Recharge 5-6) Ligne de 9m, 4d6 acide, Dextérité DD 14 pour moitié",
          "Fouisseur : Vitesse de fouissement 6m, peut disparaître sous terre en 1 tour",
          "Tremblement : Quand il fore, toutes les créatures dans 6m font Dextérité DD 12 ou tombent à terre",
          "Vulnérabilités : Feu et froid (dégâts ×1.5)"
        ]
      },
      {
        name: "Ver des Profondeurs Juvénile (×2)",
        hp: 28,
        atk: 5,
        ac: 12,
        cr: 2,
        abilities: [
          "Morsure : +5 au toucher, 1d8+3 perçant + 1d4 acide",
          "Enroulement : +5 au toucher, 1d6+3 contondant et Agrippé (Évasion DD 12)",
          "Mucus Adhésif : La cible qui touche le Ver est collée (Force DD 12 pour se libérer)",
          "Fouisseur : Vitesse de fouissement 4m",
          "Vulnérabilités : Feu et froid (dégâts ×1.5)"
        ]
      },
      {
        name: "Ver des Profondeurs Adulte — Renfort (×2, arrive round 3)",
        hp: 52,
        atk: 7,
        ac: 14,
        cr: 4,
        abilities: [
          "Identique au Ver Adulte principal",
          "Émergence : Apparaît d'un tunnel au plafond, jet de Dextérité DD 13 pour les créatures en dessous ou 2d6 contondant (débris)"
        ]
      }
    ],
    terrain: [
      "Mucus au sol : terrain difficile, jets de Dextérité DD 10 pour ne pas glisser en courant",
      "Tunnels au plafond : les Vers peuvent apparaître de n'importe où",
      "Grappes d'œufs : inflammables, explosent si touchées par le feu (1d6 feu + 1d6 acide dans 3m)",
      "Mucus mural inflammable : crée un mur de feu (2d6 feu/round) pendant 3 rounds si enflammé"
    ],
    tactics: "L'Adulte protège les œufs et utilise Constriction sur le premier PJ qui s'approche. Les Juvéniles harcèlent les flancs avec Mucus Adhésif. Si les œufs sont menacés, l'Adulte abandonne sa cible actuelle pour protéger la grappe. Les renforts arrivent par le plafond au round 3 et tentent de couper la retraite des PJ.",
    loot: [
      "Acide de Ver (×3, fiole, lance comme une arme, 2d6 acide, portée 6m, valeur : 30 po chacune)",
      "Chitine de Ver (matériau pour armure légère de qualité, CA 13, résistance acide, nécessite artisan)",
      "Fragment de mithral brut (sous les œufs, matériau rare, valeur : 500 po)",
      "Glande à acide (composante alchimique, valeur : 100 po)"
    ]
  },
  skillChecks: [
    {
      skill: 'Discrétion (groupe)',
      dc: 15,
      success: "Vous traversez le nid sans éveiller les Vers. Vous pouvez passer sans combat.",
      failure: "Un Ver juvénile lève la tête et pousse un cri strident. Le nid s'éveille."
    },
    {
      skill: 'Nature',
      dc: 14,
      success: "Vous identifiez les faiblesses des Vers : feu et froid. Vous repérez aussi que le mucus mural est inflammable — une arme potentielle.",
      failure: "Ces créatures sont inconnues. Elles semblent dangereuses, c'est tout ce que vous savez."
    }
  ],
  choices: [
    {
      id: 'choix-vers-1',
      prompt: "Le nid de Vers bloque le passage. Que faites-vous ?",
      options: [
        {
          label: "Attaquer directement",
          description: "Éliminer la menace par la force",
          consequence: "Combat frontal contre les Vers.",
          nextScene: 'mines-4-forge-ancienne'
        },
        {
          label: "Passer furtivement",
          description: "Traverser le nid sans éveiller les créatures",
          consequence: "Risqué mais évite le combat.",
          skillCheck: {
            skill: 'Discrétion',
            dc: 15,
            success: "Vous passez comme des ombres entre les grappes d'œufs. Les Vers dorment toujours.",
            failure: "Un craquement sous votre pied. Tous les Vers se tournent vers vous."
          },
          nextScene: 'mines-4-forge-ancienne'
        },
        {
          label: "Enflammer le mucus pour créer un passage",
          description: "Utiliser le feu pour bloquer les tunnels de renfort",
          consequence: "Intelligent — réduit le nombre d'ennemis.",
          skillCheck: {
            skill: 'Survie',
            dc: 13,
            success: "Le mucus s'enflamme ! Un mur de feu bloque les tunnels. Seuls les 3 Vers visibles peuvent combattre.",
            failure: "Le feu se propage trop vite ! Dextérité DD 13 ou 2d6 feu pour tous les PJ dans la zone."
          },
          nextScene: 'mines-4-forge-ancienne'
        },
        {
          label: "Contourner par les tunnels secondaires",
          description: "Chercher un passage alternatif dans le labyrinthe de tunnels",
          consequence: "Possible mais risque de se perdre.",
          skillCheck: {
            skill: 'Survie',
            dc: 14,
            success: "Vous trouvez un passage qui contourne le nid. 30 minutes de détour mais aucun combat.",
            failure: "Vous vous perdez dans le labyrinthe. 1 heure perdue et vous revenez au même endroit."
          },
          nextScene: 'mines-4-forge-ancienne'
        }
      ]
    }
  ],
  loot: [
    "3 Fioles d'Acide de Ver (30 po chacune)",
    "Chitine de Ver (armure légère possible)",
    "Fragment de mithral brut (500 po)",
    "Glande à acide (100 po)"
  ],
  nextScenes: ['mines-4-forge-ancienne'],
  previousScene: 'mines-1-entree-effondree'
};

// ============================================================================
// SALLE 4 : Forge Ancienne des Maîtres Nains
// ============================================================================
const SCENE_FORGE_NAINE: BookScene = {
  id: 'mines-4-forge-ancienne',
  sceneNumber: 4,
  title: "La Forge Ancienne des Maîtres Nains",
  type: 'exploration',
  location: "Grande Forge de Karak-Zhul",
  locationId: 'mines-forge-ancienne',
  estimatedMinutes: 35,
  readAloud: {
    text: `Vous pénétrez dans la salle la plus impressionnante que vous ayez jamais vue sous terre. La Grande Forge de Karak-Zhul est un dôme de pierre de trente mètres de diamètre, son plafond soutenu par huit piliers gravés de scènes épiques : des nains forgeant des armes légendaires, combattant des dragons, bâtissant des cités dans la roche.

Au centre, le Grand Foyer — une fosse circulaire de cinq mètres de diamètre — brûle encore. Pas de flammes ordinaires : un feu de forge élémentaire, alimenté par une veine de lave qui coule lentement sous le sol et remonte par des canaux de pierre. La chaleur est intense mais supportable grâce à un système de ventilation nain dont les conduits s'enfoncent dans la voûte.

Autour du Foyer, cinq stations de forge sont disposées en étoile, chacune dédiée à un métal différent : acier, mithral, adamantine, orichalque et un cinquième métal inconnu dont les runes sont effacées. Les enclumes sont intactes, les marteaux alignés, les bacs de trempe encore remplis d'un liquide sombre et huile — comme si les forgerons avaient quitté les lieux hier.

Sur le mur du fond, une immense fresque représente le Chef-d'Œuvre Ultime des nains de Karak-Zhul : une armure complète qui semble irradier la lumière même dans la peinture. La légende en runes naines proclame : « Quand le Feu de la Montagne rencontrera le Cœur du Forgeron, l'Invincible renaîtra. »`,
    mood: 'grandeur passée, potentiel, émerveillement',
    music: 'Forge épique, flammes rugissantes, martèlements fantômes'
  },
  gmNotes: [
    {
      type: 'info',
      text: "La forge est pleinement fonctionnelle. Un PJ forgeron (ou ayant des compétences d'artisanat) peut utiliser les stations pour améliorer l'équipement. Chaque station offre un bonus différent selon le métal travaillé. Le feu élémentaire est permanent — c'est un vestige du pacte entre les nains et les élémentaires de feu."
    },
    {
      type: 'lore',
      text: "Le Chef-d'Œuvre mentionné dans la fresque est l'Armure de l'Invincible — l'artefact défensif le plus puissant jamais forgé. Elle a été démontée et ses pièces dispersées dans les cinq donjons de la campagne. Le plastron est ici, dans un compartiment secret sous la station de mithral."
    },
    {
      type: 'secret',
      text: "Sous la station de mithral, un compartiment secret (Investigation DD 16) contient le Plastron de l'Invincible — une pièce d'armure en mithral pur (CA +3 quand équipé sur une armure, résistance au feu). C'est l'une des 5 pièces de l'Armure Légendaire. Le compartiment est protégé par un piège de feu (3d6 feu, Dextérité DD 15)."
    },
    {
      type: 'tip',
      text: "Si un PJ passe 2 heures à forger ici, il peut créer un objet en mithral de qualité exceptionnelle (Artisanat DD 16). Cet objet compte comme magique +1. C'est une récompense unique pour les PJ artisans."
    }
  ],
  skillChecks: [
    {
      skill: 'Artisanat (Forgeron)',
      dc: 16,
      success: "Utilisant le feu élémentaire et les outils nains, vous forgez un chef-d'œuvre. L'objet créé est de qualité +1 magique.",
      failure: "Malgré la qualité des outils, votre technique n'est pas à la hauteur. L'objet est fonctionnel mais ordinaire."
    },
    {
      skill: 'Investigation',
      dc: 16,
      success: "Vous trouvez le compartiment secret sous la station de mithral ! Attention — un piège le protège.",
      failure: "Les stations de forge sont fascinantes mais vous ne trouvez rien de caché."
    },
    {
      skill: 'Histoire',
      dc: 14,
      success: "La fresque vous raconte l'histoire de l'Armure de l'Invincible : cinq pièces, forgées dans cinq métaux, dispersées pour empêcher qu'un seul mortel ne détienne un tel pouvoir.",
      failure: "La fresque est belle mais les détails de l'histoire vous échappent."
    }
  ],
  choices: [
    {
      id: 'choix-forge-naine-1',
      prompt: "La Grande Forge offre de nombreuses possibilités.",
      options: [
        {
          label: "Forger ou améliorer de l'équipement",
          description: "Utiliser les stations de forge naines (2 heures)",
          consequence: "Investissement en temps mais potentiellement très rentable.",
          skillCheck: {
            skill: 'Artisanat (Forgeron)',
            dc: 16,
            success: "Votre création est exceptionnelle — un objet +1 magique qui ferait la fierté d'un maître nain.",
            failure: "L'objet est de bonne facture mais pas magique. Le feu élémentaire demande une expertise que vous ne possédez pas encore."
          }
        },
        {
          label: "Chercher des trésors cachés",
          description: "Explorer les stations pour des compartiments secrets",
          consequence: "Le plastron légendaire pourrait être ici...",
          skillCheck: {
            skill: 'Investigation',
            dc: 16,
            success: "Compartiment secret trouvé ! Mais attention au piège de feu (Dextérité DD 15 ou 3d6 feu).",
            failure: "Rien de caché ne retient votre attention. La forge semble être ce qu'elle est — une forge."
          }
        },
        {
          label: "Étudier la fresque du Chef-d'Œuvre",
          description: "Apprendre l'histoire de l'Armure de l'Invincible",
          consequence: "Des informations cruciales pour la campagne.",
          nextScene: 'mines-5-trone-roi-fou'
        },
        {
          label: "Continuer l'exploration",
          description: "Emprunter le passage vers les profondeurs",
          consequence: "La route descend vers la Salle du Trône du Roi Fou.",
          nextScene: 'mines-5-trone-roi-fou'
        }
      ]
    }
  ],
  loot: [
    "Plastron de l'Invincible (compartiment secret, +3 CA sur armure, résistance feu)",
    "Kit de Maître Forgeron nain (avantage permanent sur jets d'Artisanat, valeur : 500 po)",
    "3 lingots de mithral (matériau rare, 200 po chacun)",
    "Marteau Runique de Karak-Zhul (marteau de guerre +1, 1d8+1, peut graver des runes simples)",
    "Plans de forge nains (améliorent les capacités de forge du groupe, objet de camp)"
  ],
  nextScenes: ['mines-5-trone-roi-fou', 'mines-6-epreuve-elements'],
  previousScene: 'mines-3-nid-vers'
};

// ============================================================================
// SALLE 5 : Salle du Trône du Roi Fou
// ============================================================================
const SCENE_TRONE_ROI_FOU: BookScene = {
  id: 'mines-5-trone-roi-fou',
  sceneNumber: 5,
  title: "La Salle du Trône du Roi Fou",
  type: 'social',
  location: "Salle du Trône de Durin le Dément, Karak-Zhul",
  locationId: 'mines-trone-roi-fou',
  estimatedMinutes: 30,
  readAloud: {
    text: `Au bout d'un escalier monumental de cent marches, vous atteignez la Salle du Trône de Karak-Zhul. Mais ce qui devait être un lieu de majesté naine est devenu un théâtre de folie. Les murs sont couverts de graffitis gravés profondément dans la pierre — pas des runes, pas des mots, mais des spirales obsessionnelles, des yeux sans paupières, des formes géométriques impossibles qui font mal au cerveau quand on les regarde trop longtemps.

Le trône lui-même est intact — un siège massif taillé dans un unique bloc d'obsidienne noire, incrusté de veines de mithral formant des motifs qui pulsent encore d'une lueur fantomatique. Mais autour du trône, le chaos règne. Des meubles brisés, des parchemins déchirés, des marques de griffes sur le sol — et partout, des messages gravés dans la pierre, tous de la même écriture de plus en plus instable :

« Il parle dans les profondeurs. Il promet. Il ment. Il dit vrai. Les voix. LES VOIX. Comment les faire taire ? Creusez plus profond. Non. Non ! PLUS PROFOND. Le cristal chante et le roi écoute. »

Et sur le trône, assis comme s'il n'avait jamais bougé, le fantôme du Roi Durin vous fixe de ses yeux de diamant fou. Il ne bouge pas. Il ne parle pas. Mais quand vos regards se croisent, un sourire — un sourire terrible et triste — se dessine sur ses lèvres spectrales.`,
    mood: 'folie, tragédie, malaise',
    music: 'Murmures incohérents, résonance métallique discordante, silence oppressant'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le Roi Durin est un fantôme non-hostile — il est fou mais pas agressif. Il parle par fragments incohérents, mais certains contiennent des informations vitales. Il répond aux questions mais ses réponses mêlent vérité et délire. Sagesse (Perspicacité) DD 14 pour distinguer le vrai du faux dans ses paroles."
    },
    {
      type: 'lore',
      text: "Durin a été rendu fou par les murmures de Malachar, filtrés à travers le Sceau de Terre fissuré. C'est la preuve que la corruption de Malachar s'infiltre déjà. Durin a creusé toujours plus profond, attiré par les promesses du Destructeur, jusqu'à atteindre la veine de cristal où le Sceau est ancré (Salle 9)."
    },
    {
      type: 'tip',
      text: "Si les PJ parviennent à apaiser Durin (Persuasion DD 16 ou sort de Restauration), il peut leur donner des indications claires sur le reste du donjon, y compris l'emplacement du Dragon de Cristal (Salle 10) et comment le vaincre."
    },
    {
      type: 'secret',
      text: "Le trône d'obsidienne est un artefact mineur : s'asseoir dessus octroie une vision momentanée du Sceau de Terre (localisation exacte dans les mines) mais inflige 1d4 dégâts psychiques et impose un jet de Sagesse DD 14 ou le PJ entend les murmures de Malachar pendant 1d4 heures (désavantage sur les jets de Sagesse)."
    }
  ],
  npcs: [
    {
      name: "Roi Durin le Dément",
      role: "Fantôme du dernier roi de Karak-Zhul",
      personality: "Fou mais tragique. Alterne entre lucidité brillante et délire total. Parle en rimes quand il est lucide. Crie quand les voix reviennent.",
      appearance: "Spectre nain massif, couronne de fer tordue, yeux de diamant brillants, barbe fantomatique qui flotte sans vent. Son armure spectrale est gravée de spirales obsessionnelles.",
      secret: "Durin sait comment sceller définitivement le Sceau de Terre, mais l'information est fragmentée dans sa folie. Il faut 3 réussites en Persuasion DD 14 pour reconstituer l'information complète.",
      dialogues: {
        greeting: "Ah... des visiteurs. Combien de temps ? Cent ans ? Mille ? Les voix disent que vous venez pour le cristal. Ou est-ce le cristal qui vous appelle ? (rire amer) C'est la même chose, n'est-ce pas ?",
        info: "Le Sceau... oui, je sais où il est. Tout en bas. Là où la terre a un cœur. Là où ÇA parle. Ne l'écoutez pas ! Ou écoutez-le. Il dit des choses vraies, parfois. C'est ce qui le rend dangereux. La vérité est le meilleur des mensonges...",
        quest: "Vous voulez sauver le monde ? (rire hystérique) Moi aussi, je voulais ! Creusez jusqu'au cœur de cristal. Brisez-le. Non ! Renforcez-le ! NON ! Brisez... non... Le dragon le garde. Le dragon de cristal. Il dort sur le Sceau comme un oiseau sur son œuf. Réveillez-le à vos risques et périls.",
        farewell: "Partez. Partez avant que les voix ne vous trouvent aussi. Et si vous les entendez... (murmure) ne répondez jamais. Jamais."
      },
      stats: { hp: 1, atk: 0, ac: 20 }
    }
  ],
  skillChecks: [
    {
      skill: 'Persuasion',
      dc: 16,
      success: "Un moment de lucidité traverse le regard de Durin. Il vous donne des informations claires et précieuses sur le donjon.",
      failure: "Durin rit et pleure en même temps. Ses mots n'ont aucun sens compréhensible."
    },
    {
      skill: 'Perspicacité',
      dc: 14,
      success: "Vous distinguez les fragments de vérité dans le délire de Durin. Le dragon de cristal et le Sceau de Terre sont réels.",
      failure: "Impossible de démêler le vrai du faux. Tout ce que dit Durin semble aussi plausible qu'absurde."
    },
    {
      skill: 'Sagesse',
      dc: 14,
      success: "Vous résistez à l'influence des murmures qui imprègnent cette salle. Votre esprit reste clair.",
      failure: "Les spirales sur les murs semblent tourner. Vous entendez un murmure à la limite de l'audible. Désavantage sur les jets de Sagesse pendant 1 heure."
    }
  ],
  choices: [
    {
      id: 'choix-trone-1',
      prompt: "Le Roi Durin est devant vous. Comment interagissez-vous ?",
      options: [
        {
          label: "Parler au Roi Durin",
          description: "Tenter de communiquer avec le fantôme fou",
          consequence: "Informatif mais potentiellement déstabilisant.",
          skillCheck: {
            skill: 'Persuasion',
            dc: 16,
            success: "Durin est lucide pendant quelques précieuses minutes. Il vous révèle le chemin vers le Sceau de Terre et les faiblesses du Dragon de Cristal.",
            failure: "Durin hurle et la salle tremble. Les PJ dans 6m font un jet de Sagesse DD 12 ou sont Effrayés pendant 1 minute."
          }
        },
        {
          label: "S'asseoir sur le trône d'obsidienne",
          description: "Tenter d'avoir une vision à travers le trône",
          consequence: "Puissant mais dangereux — vision directe du Sceau.",
          skillCheck: {
            skill: 'Sagesse',
            dc: 14,
            success: "Vision claire : vous voyez le Sceau de Terre, un immense cristal dans une chambre magmatique, gardé par un dragon. La vision se dissipe sans dommage.",
            failure: "La vision est noyée de murmures. 1d4 dégâts psychiques et les voix de Malachar résonnent dans votre tête pendant 1d4 heures."
          }
        },
        {
          label: "Exorciser Durin",
          description: "Tenter de libérer l'âme du roi de sa folie et de ce plan",
          consequence: "Acte de compassion — nécessite un pouvoir divin.",
          skillCheck: {
            skill: 'Religion',
            dc: 18,
            success: "L'âme de Durin est libérée. Dans un dernier instant de lucidité totale, il vous transmet tout ce qu'il sait et vous bénit. +1 permanent aux sauvegardes de Sagesse.",
            failure: "La corruption est trop profonde. Durin crie et sa folie empire. Il devient hostile temporairement (fuit après 1 round)."
          }
        },
        {
          label: "Continuer sans interagir",
          description: "Laisser le roi à sa folie et poursuivre",
          consequence: "Plus sûr mais vous manquez des informations.",
          nextScene: 'mines-6-epreuve-elements'
        }
      ]
    }
  ],
  loot: [
    "Couronne de Fer de Durin (diadème, +2 aux jets de Sagesse (Perspicacité), pèse sur l'esprit : -1 Charisme)",
    "Sceptre d'Obsidienne (focaliseur arcanique, +1 aux sorts de Divination, valeur : 300 po)",
    "Journal fragmenté de Durin (lore sur Malachar et le Sceau de Terre)",
    "Clé du Vault Royal (ouvre la salle du trésor cachée dans la Salle 6)"
  ],
  nextScenes: ['mines-6-epreuve-elements'],
  previousScene: 'mines-4-forge-ancienne'
};

// ============================================================================
// SALLE 6 : Épreuve des Quatre Éléments
// ============================================================================
const SCENE_EPREUVE_ELEMENTS: BookScene = {
  id: 'mines-6-epreuve-elements',
  sceneNumber: 6,
  title: "L'Épreuve des Quatre Éléments",
  type: 'exploration',
  location: "Chambre des Éléments, Mines de Karak-Zhul",
  locationId: 'mines-chambre-elements',
  estimatedMinutes: 40,
  readAloud: {
    text: `Derrière la salle du trône, un passage scellé par quatre sceaux élémentaires mène à une chambre circulaire divisée en quatre quartiers. Chaque quartier représente un élément : Terre, Eau, Feu, Air — et chacun est une épreuve en soi.

Le quartier de Terre est un labyrinthe de colonnes de pierre mouvantes qui se déplacent lentement, écrasant tout ce qui se trouve entre elles. Le quartier d'Eau est inondé d'une eau tourbillonnante qui forme des courants changeants et des vortex miniatures. Le quartier de Feu est un sol de braises ardentes traversé par des geysers de flammes jaillissant à intervalles réguliers. Le quartier d'Air est un vide béant — une fosse sans fond apparente au-dessus de laquelle des courants d'air forment des ponts invisibles.

Au centre de la salle, là où les quatre quartiers se rejoignent, un piédestal attend. Sur le piédestal, quatre encoches en forme de gemmes — une pour chaque élément. Les gemmes elles-mêmes se trouvent quelque part dans leurs quartiers respectifs.

Les runes naines au sol proclament : « Seul celui qui maîtrise les quatre forces de la terre mérite d'avancer. La force brute ne suffit pas — seule l'ingéniosité triomphe des éléments. »`,
    mood: 'défi, puzzle, détermination',
    music: 'Thème de puzzle, éléments en mouvement, tension croissante'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Chaque quartier contient une gemme élémentaire. Les PJ peuvent se répartir (un par quartier) ou les affronter séquentiellement. Chaque épreuve nécessite un jet de compétence spécifique : Terre=Force DD 14, Eau=Athlétisme DD 15, Feu=Dextérité DD 14, Air=Acrobatie DD 16. Échec = dégâts (2d6 du type élémentaire) et possibilité de réessayer."
    },
    {
      type: 'tip',
      text: "Récompensez la créativité ! Un sort de Forme de l'Eau trivialise l'épreuve de l'Eau. Vol trivialise l'Air. Résistance au Feu trivialise le Feu. Etc. Le puzzle est conçu pour être résolu par un groupe complet avec des compétences variées."
    },
    {
      type: 'warning',
      text: "Si un PJ échoue 3 fois à la même épreuve, l'élément « s'ennuie » et crée un Élémentaire Mineur (CR 2) qui doit être vaincu. L'élémentaire porte la gemme et la relâche quand il est détruit."
    },
    {
      type: 'secret',
      text: "Placer les 4 gemmes dans le bon ordre (Terre-Eau-Air-Feu, le cycle de création nain) ouvre le passage ET octroie la Bénédiction des Éléments : résistance temporaire aux 4 types de dégâts élémentaires pendant 1 heure. Mauvais ordre = 2d6 dégâts de force et les gemmes s'éjectent."
    }
  ],
  skillChecks: [
    {
      skill: 'Force',
      dc: 14,
      success: "Vous repoussez les colonnes de pierre juste assez pour saisir la Gemme de Terre avant qu'elles ne se referment.",
      failure: "Les colonnes vous écrasent ! 2d6 contondant. La gemme vous échappe."
    },
    {
      skill: 'Athlétisme',
      dc: 15,
      success: "Vous nagez à travers les courants et les vortex, arrachant la Gemme d'Eau de son socle submergé.",
      failure: "Le vortex vous aspire et vous recrache violemment. 2d6 contondant + à bout de souffle."
    },
    {
      skill: 'Dextérité (Acrobatie)',
      dc: 14,
      success: "Vous dansez entre les geysers de feu avec une grâce surprenante, récupérant la Gemme de Feu intacte.",
      failure: "Un geyser vous rattrape. 2d6 feu. La gemme roule hors de portée."
    },
    {
      skill: 'Acrobatie',
      dc: 16,
      success: "Vous sentez les courants d'air porteurs et avancez sur les ponts invisibles. La Gemme d'Air brille dans le vide, et vous l'attrapez.",
      failure: "Vous perdez l'équilibre dans le vide. 2d6 contondant (chute rattrapée par un courant). La gemme reste hors d'atteinte."
    }
  ],
  encounter: {
    name: "Élémentaires Mineurs (si 3 échecs)",
    enemies: [
      {
        name: "Élémentaire de Terre Mineur",
        hp: 30,
        atk: 5,
        ac: 15,
        cr: 2,
        abilities: [
          "Poing de Pierre : +5, 1d10+3 contondant",
          "Tremblements : Toutes les créatures dans 3m, Dextérité DD 12 ou tombent à terre",
          "Résistance : Immunité poison, résistance tranchant/perçant non-magique"
        ]
      },
      {
        name: "Élémentaire d'Eau Mineur",
        hp: 26,
        atk: 4,
        ac: 13,
        cr: 2,
        abilities: [
          "Vague : +4, 1d8+2 contondant + repoussé de 1,5m",
          "Forme Liquide : Peut se faufiler dans des espaces de 2,5 cm",
          "Noyade : Enveloppe une cible (Constitution DD 13 ou commence à se noyer)"
        ]
      },
      {
        name: "Élémentaire de Feu Mineur",
        hp: 24,
        atk: 5,
        ac: 12,
        cr: 2,
        abilities: [
          "Toucher Brûlant : +5, 1d8+3 feu",
          "Embrasement : Cible touchée prend feu (1d4 feu/tour, action pour éteindre)",
          "Vulnérabilité : Froid (dégâts ×2)"
        ]
      },
      {
        name: "Élémentaire d'Air Mineur",
        hp: 22,
        atk: 6,
        ac: 14,
        cr: 2,
        abilities: [
          "Bourrasque : +6, 1d6+4 tranchant (lames de vent)",
          "Vol : Vitesse de vol 18m",
          "Tourbillon : (Recharge 5-6) Aspiré vers le haut, 2d6 contondant, Dextérité DD 14"
        ]
      }
    ],
    terrain: [
      "Quartier spécifique de l'élémentaire invoqué",
      "Les élémentaires ne quittent pas leur quartier",
      "L'élément du quartier avantage son élémentaire (+2 CA, +2 dégâts)"
    ],
    tactics: "L'élémentaire garde sa gemme. Il combat agressivement dans son quartier mais ne poursuit pas au-delà. Utilise le terrain à son avantage (l'Eau attire dans les vortex, le Feu pousse vers les geysers, etc.).",
    loot: [
      "Gemme Élémentaire correspondante (nécessaire pour le puzzle)"
    ]
  },
  choices: [
    {
      id: 'choix-elements-1',
      prompt: "Les quatre épreuves élémentaires sont devant vous.",
      options: [
        {
          label: "Se répartir (un PJ par quartier)",
          description: "Affronter les épreuves simultanément",
          consequence: "Plus rapide mais chaque PJ est seul face à son épreuve.",
          nextScene: 'mines-7-pont-vide'
        },
        {
          label: "Affronter les épreuves en séquence",
          description: "Traverser chaque quartier en groupe",
          consequence: "Plus lent mais le groupe peut s'entraider.",
          nextScene: 'mines-7-pont-vide'
        },
        {
          label: "Utiliser la magie pour contourner",
          description: "Appliquer des sorts pour simplifier les épreuves",
          consequence: "Les runes naines approuvent l'ingéniosité. Les DC sont réduits de 2.",
          nextScene: 'mines-7-pont-vide'
        }
      ]
    }
  ],
  loot: [
    "4 Gemmes Élémentaires (30 po chacune, composantes de sort élémentaire)",
    "Bénédiction des Éléments (résistance aux 4 types élémentaires, 1 heure, si bon ordre)",
    "Vault Royal (si clé de Durin) : 800 po, 2 Potions de Soin Supérieur (4d4+4), Bouclier Élémentaire (+1 CA, résistance à un élément au choix 1/jour)"
  ],
  nextScenes: ['mines-7-pont-vide'],
  previousScene: 'mines-5-trone-roi-fou'
};

// ============================================================================
// SALLE 7 : Le Pont au-dessus du Vide
// ============================================================================
const SCENE_PONT_VIDE: BookScene = {
  id: 'mines-7-pont-vide',
  sceneNumber: 7,
  title: "Le Pont au-dessus du Vide",
  type: 'exploration',
  location: "Le Grand Gouffre de Karak-Zhul",
  locationId: 'mines-pont-vide',
  estimatedMinutes: 25,
  readAloud: {
    text: `Le passage débouche sur un spectacle vertigineux. Vous vous tenez au bord d'un gouffre si profond que son fond se perd dans une obscurité absolue. La caverne est immense — au moins cent mètres de diamètre — et un seul pont de pierre la traverse : une arche naturelle de roche noire, large de deux mètres, sans garde-fou, suspendue au-dessus d'un vide insondable.

Le pont fait cinquante mètres de long et sa surface est lisse, polie par des millénaires de passages nains. Mais le temps a fait son œuvre : des fissures courent le long de la pierre, et à mi-chemin, une section de trois mètres s'est effondrée, laissant un trou béant qu'il faudra franchir d'une manière ou d'une autre.

Des courants d'air ascendants et descendants balaient le pont de manière imprévisible, assez forts pour déséquilibrer un marcheur imprudent. La lueur de vos torches vacille follement dans ces bourrasques, créant des ombres mouvantes sur les parois du gouffre.

De l'autre côté du pont, vous distinguez une porte massive flanquée de deux statues de guerriers nains, leurs marteaux croisés en signe de protection. Au-dessus de la porte, des runes brillent : « Le Cœur de la Montagne bat derrière cette porte. Seuls les braves y entrent. Seuls les dignes en ressortent. »`,
    mood: 'vertige, danger, traversée périlleuse',
    music: 'Vents hurlants, échos du vide, tension'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le pont a 3 dangers : les bourrasques (Dextérité DD 13 ou repoussé vers le bord, DD 15 pour ne pas tomber si au bord), la brèche de 3m (Athlétisme DD 14 pour sauter, ou corde + Acrobatie DD 12), et des Chauves-Souris de Pierre (2 essaims) qui attaquent à mi-chemin."
    },
    {
      type: 'tip',
      text: "L'utilisation de corde est encouragée. Un PJ en sécurité d'un côté peut assurer les autres avec une corde, réduisant le DD de tous les jets de 3. Le sort Vol rend la traversée triviale mais attire les Chauves-Souris."
    },
    {
      type: 'warning',
      text: "Tomber du pont = mort quasi-certaine (20d6 contondant). Prévoyez des filets de sécurité narratifs : une saillie à 10m en contrebas (Dextérité DD 16 pour s'y accrocher, seulement 3d6), un sort de Chute Lente, ou un PJ rapide qui attrape le tombeur (Réaction + Athlétisme DD 15)."
    },
    {
      type: 'secret',
      text: "Dans la paroi du gouffre, à 5m sous le pont côté nord, un tunnel naturel mène à une petite caverne où un ermite nain fantôme médite depuis des siècles. Il offre un conseil cryptique sur le Dragon de Cristal : « Son cœur n'est pas de flamme mais de givre. C'est le froid qui l'a créé, c'est la chaleur qui le détruira. »"
    }
  ],
  encounter: {
    name: "Essaims de Chauves-Souris de Pierre",
    enemies: [
      {
        name: "Essaim de Chauves-Souris de Pierre",
        hp: 22,
        atk: 4,
        ac: 12,
        cr: 1,
        abilities: [
          "Morsures en Essaim : +4, 2d4 perçant (la moitié si l'essaim est en dessous de la moitié de ses PV)",
          "Nuée : Occupe le même espace qu'une créature, imposant un désavantage sur les attaques de la cible",
          "Aveuglant : La cible dans l'essaim est Aveuglée (Dextérité DD 12 pour protéger ses yeux)",
          "Déséquilibre : Sur le pont, une créature aveuglée doit réussir Dextérité DD 12 ou perdre l'équilibre"
        ]
      },
      {
        name: "Essaim de Chauves-Souris de Pierre (×2)",
        hp: 22,
        atk: 4,
        ac: 12,
        cr: 1,
        abilities: [
          "Identique au premier essaim",
          "Tactique coordonnée : Les deux essaims ciblent le même PJ pour maximiser le désavantage"
        ]
      }
    ],
    terrain: [
      "Pont étroit (2m) : pas de flanquement, une seule créature de taille Moyenne par case",
      "Bourrasques : Dextérité DD 13 au début de chaque tour pour rester stable",
      "Brèche (3m) : saut nécessaire (Athlétisme DD 14)",
      "Vide : chute mortelle des deux côtés"
    ],
    tactics: "Les essaims attaquent quand les PJ sont à mi-chemin du pont, à l'endroit le plus vulnérable (près de la brèche). Ils tentent d'aveugler et de déséquilibrer les PJ. Ils fuient si réduits à moins de 5 PV chacun.",
    loot: [
      "Guano de Chauve-Souris de Pierre (composante alchimique, ingrédient de potion de vol, valeur : 40 po)",
      "Éclat de Pierre Volante (gemme, permet Lévitation 1 minute 1/jour, valeur : 150 po)"
    ]
  },
  skillChecks: [
    {
      skill: 'Athlétisme',
      dc: 14,
      success: "Vous franchissez la brèche d'un bond puissant et atterrissez de l'autre côté sans perdre l'équilibre.",
      failure: "Votre saut est court ! Vous vous accrochez au bord (Athlétisme DD 10 pour vous hisser, sinon chute)."
    },
    {
      skill: 'Dextérité (Acrobatie)',
      dc: 12,
      success: "Avec la corde tendue, vous traversez la brèche en équilibre comme un funambule.",
      failure: "Vous glissez de la corde mais elle vous retient. Vous restez pendu au-dessus du vide (Force DD 10 pour remonter)."
    },
    {
      skill: 'Perception',
      dc: 14,
      success: "Vous repérez le tunnel dans la paroi du gouffre et les nids de chauves-souris au plafond. Vous n'êtes pas surpris.",
      failure: "Le gouffre semble vide et silencieux. Les chauves-souris attaquent par surprise."
    }
  ],
  choices: [
    {
      id: 'choix-pont-1',
      prompt: "Le pont s'étend devant vous. Comment le traversez-vous ?",
      options: [
        {
          label: "Traverser prudemment avec des cordes",
          description: "Sécuriser la traversée avec de l'équipement",
          consequence: "Plus lent mais bien plus sûr.",
          nextScene: 'mines-8-veine-mithral'
        },
        {
          label: "Traverser rapidement",
          description: "Courir à travers avant que quelque chose ne se passe",
          consequence: "Rapide mais les bourrasques et la brèche sont dangereuses à pleine vitesse.",
          skillCheck: {
            skill: 'Athlétisme',
            dc: 16,
            success: "Vous traversez en trombe et atteignez l'autre côté avant que les chauves-souris ne réagissent.",
            failure: "Vous trébuchez sur la brèche. Jet de Dextérité DD 14 pour ne pas tomber !"
          },
          nextScene: 'mines-8-veine-mithral'
        },
        {
          label: "Explorer le tunnel dans la paroi",
          description: "Descendre vers le tunnel mystérieux repéré",
          consequence: "Nécessite de l'escalade mais pourrait offrir un raccourci ou un secret.",
          skillCheck: {
            skill: 'Athlétisme (Escalade)',
            dc: 15,
            success: "Vous descendez jusqu'au tunnel et découvrez la caverne de l'ermite nain.",
            failure: "La descente est trop périlleuse. Vous remontez prudemment."
          }
        }
      ]
    }
  ],
  loot: [
    "Guano de Pierre (40 po, composante)",
    "Éclat de Pierre Volante (Lévitation 1 min/jour, 150 po)",
    "Conseil de l'ermite sur le Dragon (si tunnel exploré)"
  ],
  nextScenes: ['mines-8-veine-mithral'],
  previousScene: 'mines-6-epreuve-elements'
};

// ============================================================================
// SALLE 8 : Veine de Mithral gardée par un Golem
// ============================================================================
const SCENE_VEINE_MITHRAL: BookScene = {
  id: 'mines-8-veine-mithral',
  sceneNumber: 8,
  title: "La Veine de Mithral et son Gardien",
  type: 'combat',
  location: "Veine de Mithral, Profondeurs de Karak-Zhul",
  locationId: 'mines-veine-mithral',
  estimatedMinutes: 35,
  readAloud: {
    text: `Derrière la porte gardée par les statues naines, vous découvrez la raison pour laquelle Karak-Zhul était autrefois la cité naine la plus riche du continent. Une veine de mithral pur traverse la caverne comme une rivière d'argent liquide figée dans la roche. Le métal brille de sa propre lumière — un éclat bleuté et pur qui illumine toute la salle d'une clarté presque lunaire.

La veine fait un mètre de large et s'étend sur toute la longueur de la caverne, soit une cinquantaine de mètres. Des outils d'extraction nains — pioches de diamant, ciseaux enchantés, creusets de transport — sont rangés dans des râteliers le long des parois, prêts pour un travail qui ne reprendra jamais.

Mais la veine n'est pas sans gardien. Au centre de la caverne, debout sur un socle de granit, se tient un Golem de Mithral — une construction naine de quatre mètres de haut, entièrement forgée dans le précieux métal. Son corps reflète la lumière de la veine comme un miroir vivant, et ses yeux sont deux rubis massifs qui scrutent l'espace avec une vigilance mécanique.

Le Golem ne bouge pas à votre arrivée. Sur son torse, des runes d'activation identiques à celles de la forge Sol-Aureus — mais d'un modèle plus ancien et plus complexe. Et devant lui, gravé dans le sol, un cercle de protection magique pulse d'une lueur protectrice.`,
    mood: 'richesse, danger, gardien implacable',
    music: 'Résonance métallique, bourdonnement de mithral, tension mécanique'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le Golem de Mithral est un gardien CR 6 — un défi sérieux pour un groupe de niveau 5-7. Il n'attaque que si quelqu'un touche la veine de mithral ou franchit le cercle de protection. Il peut être désactivé avec la bonne phrase runique (Intelligence (Arcanes) DD 18) ou en détruisant les rubis-yeux (attaques ciblées, CA 20, 15 PV chacun)."
    },
    {
      type: 'tip',
      text: "Les PJ qui ont activé le Golem de la Forge Sol-Aureus (Donjon 1) avec la bonne phrase peuvent tenter une approche similaire ici, avec un bonus de +2 au jet d'Arcanes. L'expérience passée est récompensée."
    },
    {
      type: 'warning',
      text: "Le Golem de Mithral est TRÈS résistant. Il est immunisé à presque tout sauf les dégâts magiques. La stratégie recommandée est de le désactiver plutôt que de le combattre frontalement. Prévoir une porte de sortie si le combat tourne mal."
    },
    {
      type: 'secret',
      text: "Le cercle de protection au sol n'est pas juste défensif — c'est un amplificateur. Si un lanceur de sorts s'y place et canalise un sort de Dissipation de la Magie, le Golem est désactivé pendant 1d4 rounds, permettant d'agir librement."
    }
  ],
  encounter: {
    name: "Golem de Mithral de Karak-Zhul",
    enemies: [
      {
        name: "Golem de Mithral",
        hp: 90,
        atk: 9,
        ac: 18,
        cr: 6,
        abilities: [
          "Poing de Mithral : +9 au toucher, 2d10+5 contondant",
          "Reflet Aveuglant : (Recharge 5-6) Flash de lumière, toutes les créatures dans 9m font Constitution DD 16 ou sont Aveuglées pendant 1 tour",
          "Corps de Mithral : Immunité poison, psychique, nécrotique. Résistance à TOUS les dégâts non-magiques. Résistance feu.",
          "Charge Lourde : Si le Golem se déplace d'au moins 6m, +3d6 contondant à la prochaine attaque",
          "Réparation Automatique : Récupère 10 PV au début de son tour s'il est en contact avec la veine de mithral",
          "Yeux de Rubis : Détection de la magie permanente, vision dans le noir 36m. Détruire un œil (CA 20, 15 PV) réduit sa CA de 2 et sa portée de détection"
        ]
      }
    ],
    terrain: [
      "Veine de mithral : guérit le Golem s'il la touche (éloignez-le !)",
      "Cercle de protection : amplifie Dissipation de la Magie (désactive le Golem 1d4 rounds)",
      "Outils nains : peuvent être lancés comme armes improvisées (1d4+Force)",
      "Caverne allongée : possibilité de course-poursuite le long de la veine"
    ],
    tactics: "Le Golem garde le centre de la caverne. Il utilise Reflet Aveuglant immédiatement puis charge le PJ le plus proche. Il retourne vers la veine de mithral s'il est endommagé (Réparation Automatique). Il ne quitte pas la caverne. Si les deux yeux sont détruits, il devient « aveugle » et attaque au hasard (-5 aux jets d'attaque).",
    loot: [
      "Noyau du Golem de Mithral (gemme, composante pour enchantement de haut niveau, valeur : 1000 po)",
      "2 Rubis Massifs (yeux, 250 po chacun si intacts)",
      "Mithral brut (assez pour forger 2 armes ou 1 armure en mithral, valeur : 3000 po)",
      "Pioche de Diamant naine (outil enchanté, +3 à l'extraction minière, valeur : 200 po)"
    ]
  },
  skillChecks: [
    {
      skill: 'Arcanes',
      dc: 18,
      success: "Vous prononcez la phrase de désactivation en runique nain ancien. Le Golem s'immobilise et ses yeux s'éteignent. Passage libre.",
      failure: "Les runes ne réagissent pas à votre incantation. Le Golem tourne la tête vers vous..."
    },
    {
      skill: 'Discrétion',
      dc: 16,
      success: "Vous contournez le Golem sans toucher la veine ni le cercle. Il ne vous détecte pas.",
      failure: "Vos pas résonnent sur le sol de pierre. Les yeux de rubis se braquent sur vous. Le Golem s'anime."
    }
  ],
  choices: [
    {
      id: 'choix-mithral-1',
      prompt: "Le Golem de Mithral garde la veine. Comment procédez-vous ?",
      options: [
        {
          label: "Désactiver le Golem par les runes",
          description: "Utiliser la phrase de commande naine",
          consequence: "La solution la plus élégante — si vous connaissez les mots.",
          skillCheck: {
            skill: 'Arcanes',
            dc: 18,
            success: "Le Golem se désactive. Vous avez accès libre à la veine de mithral.",
            failure: "Le Golem s'active et attaque ! Combat."
          },
          nextScene: 'mines-9-chambre-magmatique'
        },
        {
          label: "Combattre le Golem",
          description: "Affronter le gardien par la force",
          consequence: "Un combat difficile mais le loot en vaut la peine.",
          nextScene: 'mines-9-chambre-magmatique'
        },
        {
          label: "Contourner en discrétion",
          description: "Passer sans éveiller le gardien",
          consequence: "Vous renoncez au mithral mais évitez le danger.",
          skillCheck: {
            skill: 'Discrétion',
            dc: 16,
            success: "Vous passez inaperçus. Le Golem ne bronche pas.",
            failure: "Détectés ! Le Golem s'anime."
          },
          nextScene: 'mines-9-chambre-magmatique'
        },
        {
          label: "Utiliser le cercle de protection",
          description: "Amplifier Dissipation de la Magie depuis le cercle",
          consequence: "Nécessite un lanceur de sorts — désactive le Golem temporairement.",
          nextScene: 'mines-9-chambre-magmatique'
        }
      ]
    }
  ],
  loot: [
    "Noyau du Golem de Mithral (1000 po)",
    "2 Rubis Massifs (250 po chacun)",
    "Mithral brut (3000 po en matériau)",
    "Pioche de Diamant (200 po)"
  ],
  nextScenes: ['mines-9-chambre-magmatique'],
  previousScene: 'mines-7-pont-vide'
};

// ============================================================================
// SALLE 9 : Chambre Magmatique
// ============================================================================
const SCENE_CHAMBRE_MAGMATIQUE: BookScene = {
  id: 'mines-9-chambre-magmatique',
  sceneNumber: 9,
  title: "La Chambre Magmatique",
  type: 'exploration',
  location: "Chambre magmatique, Cœur de Karak-Zhul",
  locationId: 'mines-chambre-magmatique',
  estimatedMinutes: 25,
  readAloud: {
    text: `La température grimpe brutalement à mesure que le tunnel descend. L'air devient presque irrespirable — un four naturel alimenté par les entrailles de la terre. Quand le passage s'ouvre enfin, le spectacle vous coupe le souffle.

Vous êtes au bord d'un lac de lave en fusion. Le magma orange et rouge roule paresseusement dans un bassin naturel de cinquante mètres de diamètre, émettant une chaleur si intense que votre peau vous brûle à dix mètres de distance. Des bulles de gaz éclatent à la surface avec des détonations sourdes, projetant des gerbes de roche fondue qui retombent en gouttelettes incandescentes.

Un chemin de pierre basaltique — noir, solide, résistant à la chaleur — serpente au-dessus du lac de lave, reliant votre position à une île de roche au centre du bassin. L'île est dominée par une formation cristalline massive : un pilier de cristal translucide de cinq mètres de haut qui brille d'une lueur intérieure pulsante — le Sceau de Terre.

Le pilier est fissuré. Des veines noires parcourent sa surface comme des vaisseaux sanguins malades, et une énergie sombre suinte des fissures. Autour du pilier, des runes de confinement gravées dans le basalte brillent et s'éteignent en alternance, luttant pour maintenir un sceau qui s'affaiblit.

Et au pied du pilier, enroulé comme un serpent autour d'un œuf, le Dragon de Cristal dort.`,
    mood: 'infernal, épique, point culminant',
    music: 'Lave bouillonnante, grondement tellurique, tension maximale'
  },
  gmNotes: [
    {
      type: 'info',
      text: "La chambre magmatique est l'antichambre du boss final. Les PJ doivent traverser le chemin de basalte pour atteindre l'île. La lave inflige 10d10 dégâts de feu par round d'immersion. Le chemin est stable mais étroit (1,5m) — tomber est mortel. Résistance au feu réduit les dégâts de proximité (2d6 feu/round sans résistance à moins de 5m de la lave)."
    },
    {
      type: 'tip',
      text: "C'est le moment parfait pour un repos court avant le boss. L'île a une zone « fraîche » (relativement) où les PJ peuvent récupérer. Le cristal du Sceau émet une aura qui neutralise les dégâts de chaleur dans un rayon de 3m — un repos est possible là."
    },
    {
      type: 'warning',
      text: "Les PJ sans résistance au feu subissent 2d6 feu/round sur le chemin de basalte (chaleur ambiante). La Bénédiction des Éléments (Salle 6) annule ces dégâts. Sinon, la traversée dure 5 rounds — potentiellement 10d6 feu au total. Prévoyez des alternatives (potions, sorts)."
    },
    {
      type: 'secret',
      text: "Le Sceau de Terre peut être temporairement renforcé si un PJ canalise de l'énergie divine ou arcanique dedans (Religion/Arcanes DD 16). Cela affaiblit le Dragon de Cristal (-2 CA, -2 attaque) car le Sceau purifie partiellement la corruption qui le nourrit. Cependant, cela attire aussi l'attention de Malachar..."
    }
  ],
  skillChecks: [
    {
      skill: 'Athlétisme',
      dc: 14,
      success: "Vous traversez le chemin de basalte en courant, minimisant l'exposition à la chaleur. Seulement 1d6 dégâts de feu.",
      failure: "Le chemin est glissant de condensation. Vous trébuchez et votre main touche le sol brûlant (2d6 feu) mais vous ne tombez pas dans la lave."
    },
    {
      skill: 'Arcanes',
      dc: 16,
      success: "Vous canalisez votre énergie dans le Sceau de Terre. Le cristal brille et les veines noires reculent momentanément. Le Dragon est affaibli.",
      failure: "L'énergie du Sceau vous repousse violemment (2d6 de force). Les veines noires pulsent plus fort. Le Dragon remue dans son sommeil."
    },
    {
      skill: 'Nature',
      dc: 15,
      success: "Vous identifiez la formation cristalline comme un Nœud Tellurique — un point d'ancrage entre les plans. Le Sceau utilise ce nœud comme fondation. Le détruire serait catastrophique pour la région entière.",
      failure: "Un gros cristal dans une caverne de lave. Impressionnant mais vous ne comprenez pas sa fonction exacte."
    }
  ],
  choices: [
    {
      id: 'choix-magma-1',
      prompt: "Le Dragon de Cristal dort au pied du Sceau. Que faites-vous ?",
      options: [
        {
          label: "Renforcer le Sceau avant le combat",
          description: "Canaliser de l'énergie dans le cristal pour affaiblir le Dragon",
          consequence: "Réduit la difficulté du boss mais attire l'attention de Malachar.",
          skillCheck: {
            skill: 'Arcanes',
            dc: 16,
            success: "Le Sceau est renforcé. Le Dragon est affaibli (-2 CA, -2 attaque). Mais une voix sombre murmure : « Je sais que vous êtes là... »",
            failure: "Le Sceau résiste. Le Dragon ouvre un œil."
          },
          nextScene: 'mines-10-dragon-cristal'
        },
        {
          label: "Attaquer le Dragon dans son sommeil",
          description: "Lancer une attaque surprise avant qu'il ne se réveille",
          consequence: "Un round de surprise gratuit — mais le Dragon se réveille furieux.",
          nextScene: 'mines-10-dragon-cristal'
        },
        {
          label: "Tenter de communiquer avec le Dragon",
          description: "Essayer de parler avant de combattre",
          consequence: "Le Dragon de Cristal était autrefois un gardien. Peut-il être raisonné ?",
          skillCheck: {
            skill: 'Persuasion',
            dc: 20,
            success: "Le Dragon vous écoute. Il est corrompu mais pas entièrement maléfique. Il accepte un marché : « Purgez la corruption du Sceau et je partirai en paix. »",
            failure: "Le Dragon rugit. La diplomatie a échoué. Combat immédiat."
          },
          nextScene: 'mines-10-dragon-cristal'
        },
        {
          label: "Se préparer et se reposer",
          description: "Prendre un repos court à l'abri du Sceau",
          consequence: "Récupération de ressources avant le combat final.",
          nextScene: 'mines-10-dragon-cristal'
        }
      ]
    }
  ],
  loot: [
    "Obsidienne volcanique (×5, composante de sort de feu, 20 po chacune)",
    "Pierre de Lave Solidifiée (protège contre le froid, -3 dégâts de froid, valeur : 75 po)",
    "Fragment du Sceau de Terre (si le Sceau est renforcé, gemme de Terre qui octroie +2 aux jets de Force 1/jour)"
  ],
  nextScenes: ['mines-10-dragon-cristal'],
  previousScene: 'mines-8-veine-mithral'
};

// ============================================================================
// SALLE 10 : Le Dragon de Cristal Ancien (BOSS)
// ============================================================================
const SCENE_BOSS_DRAGON: BookScene = {
  id: 'mines-10-dragon-cristal',
  sceneNumber: 10,
  title: "Le Dragon de Cristal Ancien",
  type: 'combat',
  location: "Île du Sceau, Chambre Magmatique de Karak-Zhul",
  locationId: 'mines-ile-sceau',
  estimatedMinutes: 50,
  readAloud: {
    text: `Le Dragon de Cristal se déploie dans toute sa terrible magnificence. Son corps n'est pas fait de chair et d'écailles mais de cristal vivant — un réseau de prismes translucides qui captent la lueur de la lave et la transforment en un kaléidoscope mortel de lumières aveuglantes. Il mesure quinze mètres de la gueule à la queue, et ses ailes sont des vitraux de cristal qui projettent des arcs-en-ciel mortels sur les murs de la caverne.

Ses yeux sont deux améthystes géantes corrompues — autrefois d'un violet pur, maintenant traversées de veines noires qui pulsent au rythme du Sceau fissuré derrière lui. Sa gueule s'ouvre sur des crocs de cristal parfait, et entre ses mâchoires brille une lueur violette froide — pas du feu, mais un souffle de cristallisation pure capable de transformer la chair en minéral.

Le Dragon se redresse sur l'île de basalte, dominant le lac de lave de toute sa hauteur. Ses mouvements sont accompagnés d'un carillon discordant — le tintement de milliers de cristaux qui s'entrechoquent. Quand il parle, sa voix résonne comme du verre qui se brise :

« VOUS ÊTES VENUS POUR LE SCEAU. COMME TANT D'AUTRES AVANT VOUS. ILS SONT DEVENUS CRISTAL. REGARDEZ. » Sa griffe désigne des silhouettes cristallines autour de l'île — des aventuriers pétrifiés, figés dans des poses de combat ou de fuite, leurs expressions de terreur parfaitement préservées dans le cristal.

« SEREZ-VOUS DIFFÉRENTS ? J'EN DOUTE. »`,
    mood: 'épique, terreur, combat final',
    music: 'Thème de boss dragon, carillons cristallins, percussions de lave'
  },
  gmNotes: [
    {
      type: 'info',
      text: "BOSS EN 2 PHASES. Phase 1 : Le Dragon combat depuis le sol et l'air de l'île. Phase 2 (50% PV) : Il absorbe l'énergie du Sceau, ses cristaux deviennent noirs et il gagne des pouvoirs nécrotiques en plus de ses pouvoirs cristallins. Si les PJ ont renforcé le Sceau (Salle 9), la Phase 2 est retardée (35% PV au lieu de 50%)."
    },
    {
      type: 'tip',
      text: "Le Dragon est vulnérable à la chaleur (ironie : il vit dans une caverne de lave mais ses cristaux craignent la chaleur directe). Pousser le Dragon dans la lave (Force DD 20 ou sort de contrôle) inflige 5d10 feu et brise certains cristaux (-2 CA permanent). Le conseil de l'ermite (Salle 7) révèle cette faiblesse."
    },
    {
      type: 'warning',
      text: "Ce boss est calibré pour un groupe de 4 PJ de niveau 6-8. Ajustez les PV si nécessaire. Le souffle cristallin est potentiellement mortel — assurez-vous que les PJ comprennent qu'ils doivent l'esquiver à tout prix. La pétrification est réversible avec Restauration Supérieure ou en détruisant le Dragon."
    },
    {
      type: 'secret',
      text: "Le Dragon était autrefois un gardien bienveillant placé par les nains pour protéger le Sceau. La corruption de Malachar l'a transformé. Si les PJ parviennent à purifier le Dragon (Religion DD 20 pendant le combat, nécessite 3 réussites consécutives), il redevient allié et les aide à renforcer le Sceau. C'est la meilleure fin possible pour ce donjon."
    }
  ],
  encounter: {
    name: "Dragon de Cristal Ancien de Karak-Zhul",
    enemies: [
      {
        name: "Dragon de Cristal — Phase 1",
        hp: 136,
        atk: 9,
        ac: 17,
        cr: 8,
        abilities: [
          "Morsure Cristalline : +9 au toucher, 2d10+5 perçant + 1d8 froid",
          "Griffes de Cristal (×2) : +9 au toucher, 2d6+5 tranchant",
          "Souffle Cristallin : (Recharge 5-6) Cône de 9m, 6d8 froid. Constitution DD 16 : réussite = moitié dégâts, échec = dégâts complets + Ralenti pendant 1 tour. Échec de 5+ = Pétrifié (transformé en cristal, réversible)",
          "Vol Cristallin : Vitesse de vol 18m, les ailes projettent des éclats lumineux (désavantage sur les attaques à distance contre le Dragon en vol)",
          "Réfraction : 1/tour, réaction, un sort de rayon ou de projectile est réfracté vers une cible aléatoire dans 6m",
          "Régénération Cristalline : Récupère 5 PV/tour tant qu'il est en contact avec le Sceau",
          "Vulnérabilité Thermique : Les dégâts de feu infligent +50% de dégâts et empêchent la Régénération pendant 1 tour"
        ]
      },
      {
        name: "Dragon de Cristal — Phase 2 (Cristal Corrompu)",
        hp: 68,
        atk: 10,
        ac: 15,
        cr: 9,
        abilities: [
          "Morsure Corrompue : +10 au toucher, 2d10+5 perçant + 1d8 nécrotique",
          "Aura de Corruption : Toutes les créatures dans 6m au début du tour du Dragon : 2d6 nécrotique, Constitution DD 15 pour moitié",
          "Souffle de Cristal Noir : (Recharge 4-6) Cône de 12m, 4d8 nécrotique + 4d8 froid. Constitution DD 17. Échec = Pétrifié (cristal noir, nécessite Restauration Supérieure)",
          "Éclats Explosifs : Quand touché en mêlée, l'attaquant subit 1d6 perçant (éclats de cristal noir)",
          "Absorption du Sceau : Tant que le Dragon est en Phase 2, le Sceau s'affaiblit. Après 10 rounds en Phase 2, le Sceau se brise (conséquence de campagne catastrophique)",
          "Fureur Cristalline : À 25% PV, le Dragon entre en frénésie. +2 attaque, +2 dégâts, mais -3 CA",
          "Vulnérabilité Thermique : Toujours active, +50% dégâts de feu"
        ]
      }
    ],
    terrain: [
      "Île de basalte (20m de diamètre) : terrain de combat principal",
      "Lac de lave : chute mortelle (10d10 feu/round), mais 5d10 au Dragon si poussé dedans",
      "Pilier du Sceau : couverture totale d'un côté, zone de régénération du Dragon",
      "Aventuriers pétrifiés : couverture partielle, peuvent être brisés (libérant les âmes qui infligent 1d6 radiant au Dragon)",
      "Chemin de basalte : retraite possible mais étroite"
    ],
    tactics: "Phase 1 : Le Dragon alterne entre attaques au sol (morsure + griffes) et vol (souffle cristallin). Il retourne au Sceau quand il a besoin de régénérer. Il utilise Réfraction contre les lanceurs de sorts. Phase 2 : Il reste au sol, utilisant l'Aura de Corruption pour user le groupe. Il cible les soigneurs avec le Souffle de Cristal Noir. Il défend le Sceau car il en tire sa puissance corrompue.",
    loot: [
      "Cœur de Cristal du Dragon (gemme légendaire, focaliseur arcanique +2, permet de lancer Mur de Cristal 1/jour, valeur : 5000 po)",
      "Écailles de Cristal (×10, matériau pour armure de cristal CA 18, résistance froid, vulnérabilité feu)",
      "Croc de Dragon Cristallin (dague +2, 1d4+2 perçant + 2d6 froid, cible ralentie 1 tour sur un critique)",
      "Sang de Cristal (5 fioles, potion qui octroie résistance froid 1h, valeur : 100 po chacune)",
      "Fragment du Sceau de Terre Renforcé (si Sceau renforcé avant combat, artefact mineur : +2 Constitution 1/jour pendant 1h)"
    ]
  },
  skillChecks: [
    {
      skill: 'Religion',
      dc: 20,
      success: "Vous canalisez une énergie purificatrice dans le Dragon. Les veines noires reculent. Répétez 3 fois pour une purification complète (le Dragon redevient allié).",
      failure: "La corruption résiste. Le Dragon rugit de douleur et vous attaque avec furie (+2 dégâts au prochain tour)."
    },
    {
      skill: 'Athlétisme',
      dc: 20,
      success: "Vous poussez le Dragon vers le bord de l'île ! Il bascule dans la lave (5d10 feu, perd sa Régénération et 2 CA permanent).",
      failure: "Le Dragon ne bouge pas d'un pouce. Il vous repousse à la place (2d6 contondant et repoussé de 3m)."
    },
    {
      skill: 'Arcanes',
      dc: 17,
      success: "Vous comprenez le lien entre le Dragon et le Sceau. Couper ce lien (Dissipation de la Magie DD 17 sur le Sceau) empêche la Régénération Cristalline et retarde la Phase 2.",
      failure: "Le lien est trop complexe pour vos connaissances actuelles."
    }
  ],
  choices: [
    {
      id: 'choix-dragon-1',
      prompt: "Le Dragon de Cristal se dresse devant vous. Le combat final commence.",
      options: [
        {
          label: "Combat frontal",
          description: "Engager le Dragon en utilisant la force brute et la magie",
          consequence: "Le choix classique. Préparez-vous à un combat intense.",
          nextScene: 'mines-conclusion'
        },
        {
          label: "Tenter de purifier le Dragon",
          description: "Utiliser l'énergie divine pour chasser la corruption",
          consequence: "La voie la plus difficile mais aussi la plus récompensée.",
          skillCheck: {
            skill: 'Religion',
            dc: 20,
            success: "Premier pas vers la purification. Deux de plus et le Dragon sera libéré.",
            failure: "La corruption est trop profonde. Le Dragon attaque avec une furie renouvelée."
          },
          nextScene: 'mines-conclusion'
        },
        {
          label: "Pousser le Dragon dans la lave",
          description: "Utiliser l'environnement comme arme",
          consequence: "Utiliser la lave contre un dragon — audacieux.",
          nextScene: 'mines-conclusion'
        },
        {
          label: "Couper le lien avec le Sceau",
          description: "Dissiper la connexion magique qui nourrit le Dragon",
          consequence: "Affaiblit considérablement le Dragon mais nécessite un lanceur de sorts.",
          nextScene: 'mines-conclusion'
        }
      ]
    }
  ],
  loot: [
    "Cœur de Cristal du Dragon (5000 po, focaliseur +2, Mur de Cristal 1/jour)",
    "10 Écailles de Cristal (armure possible CA 18)",
    "Croc de Dragon (+2, 1d4+2 + 2d6 froid)",
    "5 Fioles de Sang de Cristal (100 po chacune)",
    "Fragment du Sceau de Terre Renforcé"
  ],
  nextScenes: ['mines-conclusion'],
  previousScene: 'mines-9-chambre-magmatique'
};

// ============================================================================
// CHAPITRE COMPLET : Les Mines Perdues de Karak-Zhul
// ============================================================================
export const DUNGEON_MINES: BookChapter = {
  id: 'dungeon-mines-karak-zhul',
  actNumber: 2,
  chapterNumber: 10,
  title: "Les Mines Perdues de Karak-Zhul",
  subtitle: "Dans les profondeurs de la montagne, le Sceau de Terre s'effrite",
  summary: "Les héros s'enfoncent dans les Mines Perdues de Karak-Zhul, anciennes mines naines légendaires pour leur mithral. À travers dix salles de dangers croissants — des nids de vers des profondeurs aux épreuves élémentaires, en passant par la rencontre avec le fantôme du Roi Fou Durin — ils atteignent le cœur de la montagne où le Sceau de Terre, ancré dans un pilier de cristal au-dessus d'un lac de lave, est gardé par le Dragon de Cristal Ancien. Ce boss en deux phases est le défi culminant de l'Acte 2, et la résolution du combat détermine l'état du Sceau de Terre pour la suite de la campagne.",
  levelRange: "4-8",
  themes: [
    "Grandeur naine perdue et décadence",
    "Folie et corruption par Malachar",
    "Les Sceaux et leur fragilité",
    "Cupidité et ses conséquences",
    "Nature vs exploitation"
  ],
  scenes: [
    SCENE_MINE_EFFONDREE,
    SCENE_LAC_CRISTAL,
    SCENE_NID_VERS,
    SCENE_FORGE_NAINE,
    SCENE_TRONE_ROI_FOU,
    SCENE_EPREUVE_ELEMENTS,
    SCENE_PONT_VIDE,
    SCENE_VEINE_MITHRAL,
    SCENE_CHAMBRE_MAGMATIQUE,
    SCENE_BOSS_DRAGON
  ],
  chapterIntro: {
    text: `Bienvenue dans les Mines Perdues de Karak-Zhul — le deuxième méga-donjon de la campagne d'Aethelgard. Ce donjon est conçu pour des personnages de niveau 4 à 8 et devrait prendre 6 à 8 heures de jeu réel.

Karak-Zhul est un donjon plus linéaire que les Catacombes mais offre davantage de choix tactiques dans chaque salle. Le thème central est la chute d'une civilisation naine autrefois glorieuse, corrompue par les murmures de Malachar filtrant à travers le Sceau de Terre fissuré.

Le boss final — le Dragon de Cristal Ancien — est un combat intense en deux phases qui récompense la préparation et la créativité. La meilleure fin possible (purification du Dragon) est extrêmement difficile mais transforme un ennemi en allié puissant pour la suite de la campagne.`,
    mood: 'descente épique, danger croissant, enjeux majeurs',
    music: 'Thème des mines — percussions naines, grondements telluriques'
  },
  chapterConclusion: {
    text: `Le Dragon de Cristal est vaincu — ou purifié — et le Sceau de Terre est, pour l'instant, préservé. Les héros remontent des profondeurs de Karak-Zhul chargés de mithral, de cristaux et de connaissances terrifiantes : la corruption de Malachar est plus avancée qu'ils ne le pensaient, et d'autres Sceaux sont en danger.

Le Roi Durin, s'il a été apaisé, veille à nouveau sur les mines avec une lucidité retrouvée. Le Sceau de Terre pulse d'une lueur un peu plus forte — un sursis, pas une victoire définitive.

La prochaine étape de leur quête les mènera dans les profondeurs d'un autre type : les racines de l'Arbre-Monde Yggdrasylve, où le Sceau de Forêt affronte ses propres menaces...`,
    mood: 'accomplissement, transition, urgence croissante',
    music: 'Thème héroïque nain, écho des profondeurs'
  },
  rewards: {
    xp: 6000,
    gold: "3000-5000 po (selon exploration et mithral récupéré)",
    items: [
      "Cœur de Cristal du Dragon (focaliseur +2)",
      "Plastron de l'Invincible (pièce d'armure légendaire)",
      "Épée de Mithral Naine (+2)",
      "Marteau Runique de Karak-Zhul (+1)",
      "Bouclier Élémentaire (+1 CA, résistance élémentaire)",
      "Couronne de Fer de Durin (+2 Perspicacité)",
      "Croc de Dragon Cristallin (+2, froid)",
      "Kit de Maître Forgeron nain"
    ]
  }
};
