/**
 * MEGA-DONJON : Le Temple Englouti de Marethys
 * Acte 3-4 — Niveau 10-14
 * 10 salles sous les mers, dans un ancien temple submergé
 */

import type { BookChapter, BookScene } from './gm-book-data';

// ============================================================================
// SALLE 1 : Plongée dans les Abysses
// ============================================================================
const SCENE_PLONGEE: BookScene = {
  id: 'temple-1-plongee',
  sceneNumber: 1,
  title: "La Plongée dans les Abysses",
  type: 'exploration',
  location: "Côte de Marethys, descente sous-marine",
  locationId: 'marethys-plongee',
  estimatedMinutes: 25,
  readAloud: {
    text: `Les eaux de la Mer de Marethys sont d'un bleu si profond qu'elles semblent noires. La côte tombe à pic dans l'océan — des falaises de basalte qui plongent verticalement dans les abysses. Quelque part là-dessous, à une profondeur que les pêcheurs locaux ne mentionnent qu'en murmurant, repose le Temple Englouti.

La magie de respiration aquatique que vous avez acquise — qu'il s'agisse de l'Anneau des Catacombes, d'un sort, ou de l'élixir fourni par les alchimistes de la côte — enveloppe vos poumons d'une sensation étrange : l'eau entre mais l'air vient. Vos premiers pas sous la surface sont désorientants : le monde bascule, le haut et le bas perdent leur certitude, et le silence de l'océan vous enveloppe comme un linceul liquide.

Vous descendez le long de la falaise sous-marine. La lumière du soleil s'amenuise rapidement — à trente mètres, elle n'est plus qu'une lueur verte lointaine. À cinquante mètres, l'obscurité règne, percée seulement par la bioluminescence de créatures marines qui vous observent avec des yeux de cristal. Des méduses translucides dérivent comme des fantômes d'eau.

Et puis, à cent mètres de profondeur, dans le noir presque total, des lumières apparaissent — des lumières qui ne sont pas naturelles. Des colonnes de marbre blanc, incrustées de nacre phosphorescente, émergent de la vase comme les os d'un géant. Le Temple de Marethys se révèle, englouti mais intact, son architecture majestueuse défiant les millénaires et la pression de l'océan.`,
    mood: 'immersif, vertigineux, découverte abyssale',
    music: 'Sons sous-marins, pression, échos profonds, mystère aquatique'
  },
  gmNotes: [
    {
      type: 'info',
      text: "La descente dure 15 minutes. Rappels de mécanique sous-marine : les armes de mêlée ont un désavantage sauf les armes perforantes (lances, tridents, dagues). Les sorts de feu sont impossibles sauf si la description dit « fonctionne sous l'eau ». La vitesse de nage est la moitié de la vitesse de marche sauf avec une vitesse de nage naturelle."
    },
    {
      type: 'warning',
      text: "La pression à 100m est significative. Les PJ sans protection magique appropriée subissent 1d6 contondant par 10 minutes d'exposition. Le temple a des poches d'air créées par magie, mais les passages entre les salles sont sous l'eau."
    },
    {
      type: 'tip',
      text: "L'Anneau de Respiration Aquatique du Donjon 1 est prévu pour cet endroit. Si les PJ ne l'ont pas, fournissez des alternatives : potions de respiration (3h), sort de groupe, ou un PNJ sirène qui peut créer des bulles d'air."
    },
    {
      type: 'secret',
      text: "Les colonnes de nacre sont un système de navigation : elles changent de couleur selon la direction du Sceau de Mer. Vert = plus proche, rouge = plus loin. Un PJ qui remarque ce code (Perception DD 16) peut naviguer le donjon sans jamais se perdre."
    }
  ],
  skillChecks: [
    {
      skill: 'Athlétisme',
      dc: 14,
      success: "Vous nagez avec aisance malgré la profondeur. Votre vitesse de nage est normale pour le reste du donjon.",
      failure: "La pression et le courant vous désorientent. Votre vitesse de nage est réduite d'un tiers jusqu'à ce que vous vous acclimatez (1 heure)."
    },
    {
      skill: 'Perception',
      dc: 16,
      success: "Vous remarquez le code couleur des colonnes de nacre. Le temple vous guide comme un phare sous-marin.",
      failure: "Les colonnes sont belles mais vous ne saisissez pas leur fonction."
    },
    {
      skill: 'Nature',
      dc: 14,
      success: "Vous identifiez les créatures marines environnantes comme non-hostiles. Les méduses luminescentes sont même bénéfiques — leur proximité repousse les prédateurs des profondeurs.",
      failure: "L'écosystème sous-marin est fascinant mais étranger. Vous ne savez pas ce qui est dangereux et ce qui ne l'est pas."
    }
  ],
  choices: [
    {
      id: 'choix-plongee-1',
      prompt: "Le Temple se dresse devant vous dans l'obscurité sous-marine.",
      options: [
        {
          label: "Entrer par le portail principal",
          description: "Nager vers l'entrée monumentale",
          consequence: "Le chemin direct vers le Hall d'Entrée sous Pression.",
          nextScene: 'temple-2-hall-entree'
        },
        {
          label: "Chercher une entrée secondaire",
          description: "Explorer les flancs du temple",
          consequence: "Un passage discret qui contourne le hall principal.",
          skillCheck: {
            skill: 'Investigation',
            dc: 15,
            success: "Vous trouvez une brèche dans le mur nord qui mène directement à la Bibliothèque Submergée.",
            failure: "Pas d'entrée alternative visible. Le portail principal est le seul chemin."
          },
          nextScene: 'temple-4-bibliotheque'
        },
        {
          label: "Observer le temple depuis l'extérieur",
          description: "Étudier l'architecture avant d'entrer",
          consequence: "Informations tactiques sur la disposition du temple.",
          skillCheck: {
            skill: 'Investigation',
            dc: 14,
            success: "Vous identifiez la structure générale : hall, ailes latérales, tour centrale. Le cœur du temple semble intact.",
            failure: "Le temple est trop grand et trop sombre pour être cartographié de l'extérieur."
          }
        }
      ]
    }
  ],
  loot: [
    "Perles de Profondeur (×5, billes lumineuses, éclairent 6m sous l'eau, 20 po chacune)",
    "Corail Phosphorescent (matériau d'enchantement aquatique, valeur : 100 po)",
    "Coquillage-Boussole (pointe toujours vers le Sceau de Mer, valeur : 50 po)"
  ],
  nextScenes: ['temple-2-hall-entree', 'temple-4-bibliotheque'],
  mapMovement: { from: 'cote-marethys', to: 'temple-englouti-exterieur' }
};

// ============================================================================
// SALLE 2 : Hall d'Entrée sous Pression
// ============================================================================
const SCENE_HALL_ENTREE: BookScene = {
  id: 'temple-2-hall-entree',
  sceneNumber: 2,
  title: "Le Hall d'Entrée sous Pression",
  type: 'exploration',
  location: "Hall principal, Temple de Marethys",
  locationId: 'marethys-hall',
  estimatedMinutes: 25,
  readAloud: {
    text: `Le portail du temple s'ouvre sur un hall monumental qui a défié les millénaires sous l'océan. Des colonnes de corail pétrifié soutiennent une voûte d'une hauteur vertigineuse — quinze mètres au moins — décorée de mosaïques de nacre représentant des scènes maritimes : des flottes de navires, des créatures marines colossales, et une figure récurrente — une reine aux cheveux d'algue verte portant un trident de cristal.

Le hall est partiellement inondé — l'eau atteint la taille — mais une bulle d'air magique persiste dans la partie supérieure de la salle, permettant de respirer normalement. Le système de pression est visible : des runes gravées dans les colonnes maintiennent un équilibre délicat entre l'air emprisonné et la mer qui pousse de toutes parts.

Le sol sous l'eau est un damier de mosaïque, certaines tuiles encore intactes et brillantes, d'autres brisées ou envahies par des anémones marines vivantes. Des bancs de poissons colorés nagent entre les colonnes, indifférents à votre présence. Des coquillages géants servent de vasques le long des murs, encore remplis d'une eau qui luit d'une lueur bleutée.

À l'extrémité du hall, trois passages s'ouvrent derrière un arc de triomphe corallien : au centre, un escalier descendant submergé ; à gauche, un couloir sec protégé par la magie ; à droite, un passage à moitié effondré d'où s'écoule un courant puissant.`,
    mood: 'majesté submergée, beauté étrange, fragilité',
    music: 'Échos aquatiques, bulles, résonance de coquillage'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Les runes de pression maintiennent la bulle d'air. Si 3 colonnes (sur 8) sont détruites, la bulle s'effondre et le hall est entièrement inondé. Chaque colonne a 40 PV et CA 15. Un combat imprudent peut les endommager."
    },
    {
      type: 'tip',
      text: "Les vasques de coquillage contiennent de l'Eau Sacrée de Marethys — l'équivalent marin de l'eau bénite. Elle inflige 2d6 radiant aux morts-vivants et créatures corrompues. Les PJ peuvent en remplir 4 fioles."
    },
    {
      type: 'warning',
      text: "Le courant dans le passage droit est dangereux : Athlétisme DD 16 pour nager contre, sinon emporté vers une zone de combat non-prévue (grottes de murènes géantes, rencontre CR 6). Alternativement, le courant peut être bloqué par un sort ou un objet lourd."
    },
    {
      type: 'secret',
      text: "Sous les tuiles brisées du sol, un compartiment contient une carte complète du temple gravée sur une plaque de nacre. La carte montre toutes les salles et indique « Sanctum de la Reine » comme emplacement du Sceau de Mer."
    }
  ],
  skillChecks: [
    {
      skill: 'Investigation',
      dc: 14,
      success: "Vous trouvez la carte en nacre sous les tuiles. La disposition complète du temple est révélée.",
      failure: "Les tuiles brisées ne cachent que du sable et des anémones."
    },
    {
      skill: 'Arcanes',
      dc: 15,
      success: "Vous comprenez le fonctionnement des runes de pression. Vous pouvez les renforcer (+10 PV aux colonnes) ou les affaiblir volontairement si nécessaire.",
      failure: "Les runes sont d'une magie aquatique ancienne que vous ne maîtrisez pas."
    }
  ],
  choices: [
    {
      id: 'choix-hall-1',
      prompt: "Trois passages s'offrent à vous.",
      options: [
        {
          label: "Escalier central submergé (vers les profondeurs)",
          description: "Plonger vers les niveaux inférieurs",
          consequence: "Mène à la Salle des Courants.",
          nextScene: 'temple-3-courants'
        },
        {
          label: "Couloir gauche sec (protégé par magie)",
          description: "Un passage aéré menant aux archives",
          consequence: "Mène à la Bibliothèque Submergée.",
          nextScene: 'temple-4-bibliotheque'
        },
        {
          label: "Passage droit effondré (courant puissant)",
          description: "Lutter contre le courant vers une zone inconnue",
          consequence: "Mène à la Prison des Sirènes par un chemin dangereux.",
          skillCheck: {
            skill: 'Athlétisme',
            dc: 16,
            success: "Vous nagez contre le courant et atteignez la Prison des Sirènes.",
            failure: "Le courant vous emporte ! Rencontre aléatoire avec des murènes géantes avant de rejoindre la Prison."
          },
          nextScene: 'temple-5-prison-sirenes'
        }
      ]
    }
  ],
  loot: [
    "Eau Sacrée de Marethys (×4 fioles, 2d6 radiant vs morts-vivants/corrompus, 25 po chacune)",
    "Carte en nacre du temple (objet utilitaire, révèle toutes les salles)",
    "Trident cérémoniel (arme, 1d8 perçant, fonctionne normalement sous l'eau, valeur : 100 po)",
    "Diadème de nacre (accessoire, permet de voir dans l'obscurité sous-marine, 30m, valeur : 200 po)"
  ],
  nextScenes: ['temple-3-courants', 'temple-4-bibliotheque', 'temple-5-prison-sirenes'],
  previousScene: 'temple-1-plongee'
};

// ============================================================================
// SALLE 3 : Salle des Courants (Puzzle Hydraulique)
// ============================================================================
const SCENE_COURANTS: BookScene = {
  id: 'temple-3-courants',
  sceneNumber: 3,
  title: "La Salle des Courants",
  type: 'exploration',
  location: "Chambre hydraulique, Temple de Marethys",
  locationId: 'marethys-courants',
  estimatedMinutes: 35,
  readAloud: {
    text: `L'escalier submergé vous amène dans une salle qui est un miracle d'ingénierie hydraulique. Entièrement sous l'eau, cette chambre circulaire est traversée par des courants artificiels — des rivières sous-marines canalisées par des parois de verre enchanté qui forment un labyrinthe aquatique tridimensionnel.

Six vannes massives en bronze sont encastrées dans les murs, chacune contrôlant la direction et la puissance d'un courant. Des indicateurs de pression en forme d'anémones mécaniques signalent l'état de chaque canal : vert pour un flux normal, rouge pour une surpression, bleu pour un canal vide.

Au centre du labyrinthe, visible à travers les parois de verre, un passage descend vers les profondeurs du temple — le chemin vers le Sanctum. Mais le passage est scellé par un iris mécanique qui ne s'ouvrira que quand tous les courants seront correctement alignés : les six anémones doivent être vertes simultanément.

Actuellement, trois sont rouges, deux sont bleues et une seule est verte. Chaque vanne contrôle deux courants — les modifier affecte tout le système de manière complexe et interdépendante. C'est un puzzle d'équilibre hydraulique, et la moindre erreur peut créer un vortex capable de vous happer.`,
    mood: 'puzzle mécanique, ingéniosité, pression (littérale)',
    music: 'Flux hydrauliques, cliquetis mécaniques, pression ambiante'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le puzzle a une solution en 4 coups de vanne (A, D, B, F dans cet ordre). Chaque manipulation de vanne change l'état de 2 anémones. Les PJ doivent comprendre le système : donner un schéma ou décrire verbalement quelle vanne affecte quelles anémones. Intelligence DD 14 pour comprendre le système en l'observant."
    },
    {
      type: 'tip',
      text: "Un PJ ingénieur ou artisan peut résoudre le puzzle en 1 seul jet d'Intelligence (Investigation) DD 16 — il voit la logique immédiatement. Sinon, procédez par essai-erreur (chaque mauvaise manipulation crée un vortex mineur : Dextérité DD 13 ou 2d6 contondant)."
    },
    {
      type: 'warning',
      text: "5 mauvaises manipulations consécutives déclenchent un vortex majeur : toute la salle devient un tourbillon. Athlétisme DD 18 pour chaque PJ ou aspiré dans un canal secondaire (4d6 contondant et éjecté dans une salle aléatoire du temple)."
    },
    {
      type: 'secret',
      text: "Un 7ème mécanisme est caché derrière un panneau de corail (Investigation DD 17) — c'est un raccourci qui aligne tous les courants d'un coup. Il a été ajouté par un prêtre fainéant il y a des siècles. L'utiliser ouvre aussi un compartiment contenant un parchemin de sort de Contrôle de l'Eau."
    }
  ],
  skillChecks: [
    {
      skill: 'Investigation',
      dc: 16,
      success: "Vous analysez le système hydraulique et comprenez la séquence correcte : A, D, B, F. Les courants s'alignent parfaitement.",
      failure: "Le système est trop complexe pour être résolu d'un seul regard. Il faudra procéder par essai-erreur."
    },
    {
      skill: 'Dextérité',
      dc: 13,
      success: "Vous esquivez le vortex créé par la mauvaise manipulation. Aucun dégât.",
      failure: "Le vortex vous happer et vous projette contre la paroi de verre. 2d6 contondant."
    },
    {
      skill: 'Investigation',
      dc: 17,
      success: "Vous trouvez le 7ème mécanisme caché ! Un seul levier résout tout le puzzle.",
      failure: "Rien de caché ne vous apparaît. Les 6 vannes semblent être le seul système."
    }
  ],
  choices: [
    {
      id: 'choix-courants-1',
      prompt: "Le puzzle hydraulique bloque le chemin vers les profondeurs.",
      options: [
        {
          label: "Résoudre le puzzle méthodiquement",
          description: "Analyser le système et trouver la bonne séquence",
          consequence: "Intelligence requise — la solution élégante.",
          skillCheck: {
            skill: 'Investigation',
            dc: 16,
            success: "Séquence correcte trouvée ! L'iris s'ouvre dans un grincement hydraulique.",
            failure: "Votre première tentative échoue. Un vortex mineur se forme."
          },
          nextScene: 'temple-5-prison-sirenes'
        },
        {
          label: "Essai-erreur avec les vannes",
          description: "Tester différentes combinaisons",
          consequence: "Risqué mais ne nécessite pas de compétence particulière.",
          nextScene: 'temple-5-prison-sirenes'
        },
        {
          label: "Chercher un mécanisme alternatif",
          description: "Explorer les murs pour un raccourci",
          consequence: "Le 7ème mécanisme caché résout tout en un geste.",
          skillCheck: {
            skill: 'Investigation',
            dc: 17,
            success: "Levier secret trouvé ! L'iris s'ouvre et un compartiment bonus se révèle.",
            failure: "Pas de raccourci trouvé. Retour aux 6 vannes."
          },
          nextScene: 'temple-5-prison-sirenes'
        },
        {
          label: "Forcer l'iris mécaniquement",
          description: "Appliquer la force brute sur le mécanisme d'ouverture",
          consequence: "Possible mais bruyant et attire l'attention des gardiens.",
          skillCheck: {
            skill: 'Force',
            dc: 20,
            success: "L'iris cède dans un grincement terrible. Les gardiens du temple sont alertés.",
            failure: "L'iris ne bouge pas. Le mécanisme est trop résistant."
          },
          nextScene: 'temple-5-prison-sirenes'
        }
      ]
    }
  ],
  loot: [
    "Parchemin de Contrôle de l'Eau (sort, 1 utilisation, valeur : 400 po) — si mécanisme caché",
    "Engrenage de Bronze Enchanté (composante d'artisanat, +2 aux mécanismes, valeur : 150 po)",
    "Perle de Pression (protège contre les dégâts de pression sous-marine, valeur : 300 po)"
  ],
  nextScenes: ['temple-5-prison-sirenes', 'temple-4-bibliotheque'],
  previousScene: 'temple-2-hall-entree'
};

// ============================================================================
// SALLE 4 : Bibliothèque Submergée
// ============================================================================
const SCENE_BIBLIOTHEQUE_SUB: BookScene = {
  id: 'temple-4-bibliotheque',
  sceneNumber: 4,
  title: "La Bibliothèque Submergée",
  type: 'exploration',
  location: "Archives de Marethys, Temple Englouti",
  locationId: 'marethys-bibliotheque',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le couloir sec mène à une merveille inattendue : une bibliothèque entièrement préservée dans une bulle d'air magique parfaitement sphérique. Les murs de la bulle sont transparents, offrant une vue panoramique sur l'océan environnant — des bancs de poissons abyssaux et des méduses géantes dérivent paresseusement de l'autre côté de la paroi invisible.

À l'intérieur, des étagères de bois de navire — traité pour résister à l'humidité — s'élèvent sur quatre niveaux. Les ouvrages ne sont pas en papier mais gravés sur des tablettes de nacre, des rouleaux de cuir de requin et des plaques de corail poli. Chaque texte est un trésor de connaissance marine : cartes des courants, atlas des fonds marins, traités de magie aquatique et chroniques du Royaume Sous-Marin de Marethys.

Une sphère de cristal bleu flotte au centre de la salle, émettant une lumière douce qui illumine chaque recoin. C'est un Orbe de Connaissance — un artefact qui contient la mémoire de la bibliothèque elle-même. En le touchant, des images et des informations se projettent dans l'esprit du contact.

Sur un pupitre de nacre, un grimoire ouvert attire votre attention. Ses pages de cuir de baleine portent des inscriptions récentes — bien plus récentes que le reste de la bibliothèque. Quelqu'un est venu ici. Récemment.`,
    mood: 'érudit, aquatique, découverte et inquiétude',
    music: 'Ambiance sous-marine douce, pages qui tournent, bulles'
  },
  gmNotes: [
    {
      type: 'info',
      text: "L'Orbe de Connaissance peut répondre à 3 questions sur le temple, le Sceau de Mer ou l'histoire de Marethys. Les réponses sont des visions précises. Au-delà de 3 questions, l'Orbe surchauffe et explose (3d6 force dans 6m)."
    },
    {
      type: 'lore',
      text: "Marethys était un royaume sous-marin florissant dirigé par la Reine Thalassa. Le temple a été englouti il y a 3000 ans lors du Grand Cataclysme — la même catastrophe qui a créé les Sceaux. Le Sceau de Mer est ancré dans le trône de Thalassa, au plus profond du temple."
    },
    {
      type: 'secret',
      text: "Le grimoire récent est le journal d'un agent du Consortium des Ombres qui a exploré le temple il y a 3 mois. Il a libéré les Sirènes de leur prison (Salle 5) en échange de leur allégeance, et a commencé à corrompre le Sceau de Mer. Son nom est Veyra, et elle est toujours dans le temple."
    },
    {
      type: 'tip',
      text: "Les parchemins magiques de la bibliothèque peuvent être appris par un lanceur de sorts aquatiques. Sorts disponibles : Mur d'Eau, Sphère Aqueuse, Marche sur l'Eau, et un sort unique : Appel des Profondeurs (invoque un élémentaire d'eau CR 5, concentration 1 minute)."
    }
  ],
  skillChecks: [
    {
      skill: 'Investigation',
      dc: 14,
      success: "Vous trouvez le journal de Veyra et comprenez son plan : corrompre le Sceau via les Sirènes qu'elle a libérées. Elle est encore dans le temple, quelque part en bas.",
      failure: "Le grimoire est écrit en code. Vous ne parvenez pas à le déchiffrer entièrement."
    },
    {
      skill: 'Arcanes',
      dc: 15,
      success: "Vous utilisez l'Orbe de Connaissance efficacement. Vous apprenez la disposition du temple, la nature du Sceau de Mer, et l'emplacement exact du boss.",
      failure: "L'Orbe vous submerge d'informations chaotiques. Mal de tête (désavantage sur le prochain jet de concentration)."
    },
    {
      skill: 'Histoire',
      dc: 13,
      success: "Vous reconstituez l'histoire de Marethys et comprenez que la Reine Thalassa n'est pas morte — elle est liée au Sceau. La réveiller pourrait aider ou tout détruire.",
      failure: "L'histoire de Marethys est trop ancienne et trop étrangère à votre culture pour que vous puissiez la comprendre."
    }
  ],
  choices: [
    {
      id: 'choix-biblio-sub-1',
      prompt: "La bibliothèque regorge de connaissances. Que faites-vous ?",
      options: [
        {
          label: "Interroger l'Orbe de Connaissance (3 questions)",
          description: "Utiliser l'artefact pour obtenir des réponses",
          consequence: "3 questions — choisissez bien !",
          nextScene: 'temple-5-prison-sirenes'
        },
        {
          label: "Étudier le journal de Veyra",
          description: "Déchiffrer les notes de l'agent ennemie",
          consequence: "Intel tactique sur l'ennemi dans le temple.",
          skillCheck: {
            skill: 'Investigation',
            dc: 14,
            success: "Plan de Veyra révélé : elle utilise les Sirènes pour corrompre le Sceau depuis l'intérieur.",
            failure: "Le code de Veyra résiste. Vous ne comprenez que des fragments."
          }
        },
        {
          label: "Apprendre des sorts aquatiques",
          description: "Copier les sorts de la bibliothèque",
          consequence: "Sorts puissants pour un lanceur aquatique. Prend 1 heure.",
          nextScene: 'temple-5-prison-sirenes'
        },
        {
          label: "Continuer rapidement",
          description: "Ne pas perdre de temps ici et descendre",
          consequence: "Vous manquez des informations mais gagnez du temps.",
          nextScene: 'temple-5-prison-sirenes'
        }
      ]
    }
  ],
  loot: [
    "Orbe de Connaissance (3 questions, puis détruit, valeur historique inestimable)",
    "Parchemin de Mur d'Eau (sort, 1 utilisation, valeur : 300 po)",
    "Parchemin d'Appel des Profondeurs (sort unique, élémentaire d'eau CR 5, valeur : 800 po)",
    "Journal de Veyra (intel ennemie, objet de quête)",
    "Atlas des Fonds Marins (avantage sur Navigation sous-marine, valeur : 500 po)"
  ],
  nextScenes: ['temple-5-prison-sirenes', 'temple-3-courants'],
  previousScene: 'temple-2-hall-entree'
};

// ============================================================================
// SALLE 5 : Prison des Sirènes
// ============================================================================
const SCENE_PRISON_SIRENES: BookScene = {
  id: 'temple-5-prison-sirenes',
  sceneNumber: 5,
  title: "La Prison des Sirènes",
  type: 'social',
  location: "Geôles sous-marines, Temple de Marethys",
  locationId: 'marethys-prison-sirenes',
  estimatedMinutes: 30,
  readAloud: {
    text: `Les geôles du Temple de Marethys sont taillées dans le corail noir — un matériau qui absorbe la magie et empêche toute évasion surnaturelle. Des dizaines de cellules s'alignent de part et d'autre d'un couloir central submergé, leurs barreaux de corail encore intacts malgré les millénaires.

La plupart des cellules sont vides, mais trois d'entre elles sont occupées. Dans la première, une Sirène aux écailles d'argent est enchaînée à un mur par des chaînes de corail noir. Ses longs cheveux flottent autour d'elle comme des algues, et ses yeux — d'un bleu profond — vous fixent avec un mélange de méfiance et d'espoir.

Dans la deuxième cellule, deux Sirènes plus jeunes — des guerrières, à en juger par leurs cicatrices et leurs muscles — sont enfermées ensemble. Elles portent les marques de combats récents. L'une d'elles a été blessée par une arme de métal — pas de corail, pas de magie. Une arme de surface.

La troisième cellule est ouverte, vide, et ses chaînes sont brisées. Des traces de magie résiduelle — de la magie de surface, pas marine — flottent dans l'eau comme des résidus de poudre. Quelqu'un a libéré un prisonnier récemment. L'agent Veyra, selon toute vraisemblance.

La Sirène aux écailles d'argent parle. Sa voix sous l'eau est comme un chant : « Vous n'êtes pas celle qui est venue avant. Vous sentez... différemment. Êtes-vous venus pour nous sauver ou pour nous utiliser, comme elle ? »`,
    mood: 'tension morale, choix, diplomatie sous-marine',
    music: 'Chant de sirène mélancolique, échos sous-marins, chaînes'
  },
  gmNotes: [
    {
      type: 'info',
      text: "La Sirène d'argent est Thessala, fille de la Reine Thalassa. Les deux guerrières sont ses gardes du corps, Nereia et Corala. Veyra a libéré leur sœur, Morwen, en échange de sa coopération pour corrompre le Sceau. Morwen est maintenant avec Veyra dans les profondeurs, travaillant sous contrainte."
    },
    {
      type: 'tip',
      text: "Libérer Thessala et ses gardes en fait des alliées puissantes. Thessala connaît le temple parfaitement et peut guider les PJ. Nereia et Corala sont des combattantes redoutables qui ajoutent de la puissance au groupe pour les combats à venir."
    },
    {
      type: 'secret',
      text: "Thessala possède le Fragment de Trident — une pièce du trident de sa mère Thalassa. Assemblé avec les 2 autres fragments (un dans la Forge, un dans la Salle du Trône), le Trident de Thalassa est une arme capable de contrôler les mers et de renforcer ou briser le Sceau de Mer."
    },
    {
      type: 'warning',
      text: "Si les PJ refusent de libérer les Sirènes ou les menacent, Thessala utilise sa voix hypnotique (Sagesse DD 17) pour tenter de les manipuler. Les guerrières se préparent au combat malgré leurs chaînes. Un conflit ici est évitable et non-souhaitable."
    }
  ],
  npcs: [
    {
      name: "Thessala, Princesse des Mers",
      role: "Fille de la Reine Thalassa, héritière de Marethys",
      personality: "Royale, méfiante, désespérée. Prête à tout pour sauver sa sœur Morwen et son peuple. Honorable mais pragmatique.",
      appearance: "Sirène aux écailles d'argent iridescent, cheveux blancs flottants, yeux bleu profond. Couronne de coquillages brisée. Cicatrices de chaînes sur les poignets.",
      secret: "Thessala sait comment réveiller sa mère Thalassa dans la Salle du Trône (Salle 8). Si Thalassa est réveillée, elle peut purifier le Sceau... mais cela implique qu'elle donne sa vie pour fusionner avec le Sceau, le renforçant définitivement.",
      dialogues: {
        greeting: "Vous n'avez pas l'odeur de la mer ni la cruauté de celle qui est venue avant. Qui êtes-vous, et pourquoi nagez-vous dans les eaux mortes de Marethys ?",
        info: "Ma sœur Morwen... elle l'a prise. Cette femme de la surface, avec ses yeux de serpent et son orbe de ténèbres. Elle l'a libérée non par bonté mais par calcul — Morwen connaît les rituels de la mer, et cette femme a besoin d'elle pour briser le Sceau.",
        quest: "Libérez-moi et je vous mènerai au Sceau. Je connais chaque couloir, chaque piège, chaque courant de ce temple. Plus important : je sais comment sauver ma sœur de l'emprise de cette sorcière. Mais je ne le ferai pas enchaînée.",
        farewell: "Si vous me trahissez... la mer n'oublie jamais, et la mer ne pardonne pas. Mais si vous tenez parole... vous aurez une alliée dont la gratitude est aussi profonde que l'océan."
      },
      stats: { hp: 68, atk: 8, ac: 15 }
    }
  ],
  skillChecks: [
    {
      skill: 'Persuasion',
      dc: 14,
      success: "Thessala vous fait confiance. Elle accepte une alliance temporaire et partage tout ce qu'elle sait sur le temple et sur Veyra.",
      failure: "Thessala reste méfiante. Elle accepte l'alliance mais ne partage pas tout — elle garde ses secrets pour elle."
    },
    {
      skill: 'Escamotage',
      dc: 15,
      success: "Vous crochetez les serrures de corail noir sans les briser. Les chaînes tombent silencieusement.",
      failure: "Les serrures de corail résistent. Il faut les briser par la force (Force DD 16) ou la magie."
    },
    {
      skill: 'Perspicacité',
      dc: 16,
      success: "Thessala dit la vérité — son inquiétude pour Morwen est sincère. Cependant, elle cache quelque chose : un désir de vengeance contre Veyra qui pourrait compromettre la mission.",
      failure: "Thessala semble sincère. Vous ne détectez aucun arrière-pensée."
    }
  ],
  choices: [
    {
      id: 'choix-prison-1',
      prompt: "Les Sirènes sont emprisonnées. Que faites-vous ?",
      options: [
        {
          label: "Libérer les trois Sirènes",
          description: "Ouvrir les cellules et former une alliance",
          consequence: "3 alliées puissantes, connaissance du temple, et Fragment de Trident.",
          nextScene: 'temple-6-forge-marine'
        },
        {
          label: "Libérer Thessala seule",
          description: "Ne libérer que la princesse, garder les guerrières en réserve",
          consequence: "Alliance limitée mais moins risquée.",
          nextScene: 'temple-6-forge-marine'
        },
        {
          label: "Négocier des informations d'abord",
          description: "Obtenir des renseignements avant de décider",
          consequence: "Thessala parle mais la confiance est limitée.",
          skillCheck: {
            skill: 'Persuasion',
            dc: 14,
            success: "Thessala révèle la disposition du temple et les plans de Veyra en échange de votre promesse de libération.",
            failure: "Thessala refuse de parler tant qu'elle est enchaînée. 'Les informations sont le prix de ma liberté, pas un avant-goût gratuit.'"
          }
        },
        {
          label: "Ignorer les Sirènes et continuer",
          description: "Ne pas se mêler de la politique sous-marine",
          consequence: "Vous perdez de puissantes alliées et le Fragment de Trident.",
          nextScene: 'temple-6-forge-marine'
        }
      ]
    }
  ],
  loot: [
    "Fragment de Trident (pièce du Trident de Thalassa, objet de quête)",
    "Alliées : Thessala, Nereia, Corala (si libérées)",
    "Chaînes de Corail Noir (matériau anti-magie, peut entraver un lanceur de sorts, valeur : 500 po)",
    "Clé de la Prison (ouvre aussi un coffre dans la Salle 8)"
  ],
  nextScenes: ['temple-6-forge-marine'],
  previousScene: 'temple-3-courants'
};

// ============================================================================
// SALLE 6 : Forge Sous-Marine
// ============================================================================
const SCENE_FORGE_MARINE: BookScene = {
  id: 'temple-6-forge-marine',
  sceneNumber: 6,
  title: "La Forge Sous-Marine",
  type: 'exploration',
  location: "Forge du Temple, Marethys",
  locationId: 'marethys-forge',
  estimatedMinutes: 25,
  readAloud: {
    text: `La Forge de Marethys est une merveille d'ingéniosité : une forge qui fonctionne sous l'eau. Au lieu de feu, elle utilise des évents hydrothermaux — des cheminées volcaniques sous-marines qui crachent une eau à plus de 400 degrés, assez chaude pour fondre le métal dans des creusets de corail noir résistant à la chaleur.

L'atelier est organisé autour de trois évents principaux, chacun entouré de stations de travail où des Sirènes-forgeronnes créaient des armes et armures de corail, de nacre enchantée et de métal marin. Les outils sont toujours en place — des marteaux de cristal, des pinces de coquillage géant, des moules aux formes élégantes et fonctionnelles.

Sur un présentoir central, parmi des armes inachevées, repose le deuxième Fragment de Trident — le manche, orné de gravures représentant les courants marins. Il est encastré dans un socle verrouillé dont le mécanisme semble nécessiter une clé ou une compétence de crochetage.

Un évent thermal au fond de la salle crache des bulles de vapeur toxique à intervalles réguliers — un gaz sulfureux qui brûle les poumons et brouille la vision. La zone autour de cet évent est marquée de runes d'avertissement en langue sirène.`,
    mood: 'industriel sous-marin, chaleur, création',
    music: 'Bouillonnement thermal, forge sous-marine, vapeurs'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le Fragment de Trident (manche) est dans un socle verrouillé (Escamotage DD 16 ou la clé de la Prison, Salle 5). La forge peut être utilisée pour améliorer des armes : Artisanat DD 17 pour créer une arme +2 en matériau marin (corail ou nacre enchantée)."
    },
    {
      type: 'tip',
      text: "L'évent toxique crache du gaz toutes les 30 secondes. Constitution DD 14 pour les PJ dans 3m ou 2d6 poison + Aveuglé 1 round. Cependant, l'évent peut être utilisé comme arme : attirer un ennemi dans la zone au bon moment."
    },
    {
      type: 'secret',
      text: "Un compartiment secret dans la station de mithral (Investigation DD 18) contient les Gantelets de la Reine des Mers — une pièce de l'Armure de l'Invincible (la même armure légendaire que le plastron du Donjon 2). Les Gantelets confèrent +2 Force et la capacité de respirer sous l'eau indéfiniment."
    },
    {
      type: 'warning',
      text: "Si le socle du Fragment est forcé (au lieu de crocheté/déverrouillé), un piège de pression d'eau se déclenche : jet d'eau à haute pression, 4d6 contondant dans une ligne de 9m, Dextérité DD 15 pour moitié."
    }
  ],
  encounter: {
    name: "Gardiens Corail (si alerte déclenchée)",
    enemies: [
      {
        name: "Golem de Corail",
        hp: 65,
        atk: 8,
        ac: 16,
        cr: 5,
        abilities: [
          "Poing de Corail : +8, 2d10+4 contondant + 1d4 perçant (éclats)",
          "Régénération Aquatique : 5 PV/tour sous l'eau",
          "Jet de Corail : (Recharge 5-6) Cône de 4,5m, 3d8 perçant, Dextérité DD 15 pour moitié",
          "Corps de Corail : Immunité poison, résistance perçant/tranchant non-magique"
        ]
      }
    ],
    terrain: [
      "Évents thermaux : 2d6 feu si poussé dedans",
      "Évent toxique : 2d6 poison + Aveuglé dans 3m, toutes les 30 secondes",
      "Outils de forge : armes improvisées (1d6 + Force)",
      "Creusets de métal fondu : 3d6 feu si renversés sur un ennemi"
    ],
    tactics: "Le Golem de Corail défend le socle du Fragment. Il charge le premier PJ qui s'approche et utilise Jet de Corail dès que possible. Il ne quitte pas la zone de la forge.",
    loot: [
      "Fragment de Trident — Manche (objet de quête)",
      "Gantelets de la Reine des Mers (+2 Force, respiration aquatique permanente) — compartiment secret",
      "Marteau de Forge Corallien (+1, 1d8+1, fonctionne sous l'eau, valeur : 400 po)",
      "Lingots de Nacre Enchantée (×3, matériau pour armure, 150 po chacun)"
    ]
  },
  skillChecks: [
    {
      skill: 'Escamotage',
      dc: 16,
      success: "Le socle s'ouvre sans déclencher le piège. Le Fragment de Trident est à vous.",
      failure: "Le mécanisme résiste. Voulez-vous forcer ? (Attention au piège !)"
    },
    {
      skill: 'Artisanat',
      dc: 17,
      success: "Utilisant les outils sirènes et les évents, vous forgez une arme +2 en corail enchanté. Magnifique travail.",
      failure: "Le matériau marin est trop différent de ce que vous connaissez. L'arme est fonctionnelle mais ordinaire."
    },
    {
      skill: 'Investigation',
      dc: 18,
      success: "Compartiment secret trouvé ! Les Gantelets de la Reine des Mers brillent dans leur écrin de nacre.",
      failure: "Rien de caché ne retient votre attention dans cette forge."
    }
  ],
  choices: [
    {
      id: 'choix-forge-marine-1',
      prompt: "La forge offre des trésors et des outils.",
      options: [
        {
          label: "Récupérer le Fragment et continuer",
          description: "Prendre le manche du Trident et avancer",
          consequence: "Rapide et efficace.",
          nextScene: 'temple-7-jardin-corail'
        },
        {
          label: "Forger des armes avec les outils sirènes",
          description: "Utiliser la forge pour améliorer l'équipement (1 heure)",
          consequence: "Investissement en temps pour un équipement supérieur.",
          nextScene: 'temple-7-jardin-corail'
        },
        {
          label: "Assembler deux Fragments de Trident",
          description: "Si vous avez le Fragment de Thessala et le manche",
          consequence: "Le Trident partiel gagne en puissance — arme +2, 2d8 perçant + 1d8 froid.",
          nextScene: 'temple-7-jardin-corail'
        }
      ]
    }
  ],
  loot: [
    "Fragment de Trident — Manche",
    "Gantelets de la Reine des Mers (+2 Force, respiration aquatique)",
    "Marteau de Forge Corallien (+1, 400 po)",
    "3 Lingots de Nacre Enchantée (150 po chacun)"
  ],
  nextScenes: ['temple-7-jardin-corail'],
  previousScene: 'temple-5-prison-sirenes'
};

// ============================================================================
// SALLE 7 : Jardin de Corail Vivant
// ============================================================================
const SCENE_JARDIN_CORAIL: BookScene = {
  id: 'temple-7-jardin-corail',
  sceneNumber: 7,
  title: "Le Jardin de Corail Vivant",
  type: 'combat',
  location: "Jardin de corail, Temple de Marethys",
  locationId: 'marethys-jardin-corail',
  estimatedMinutes: 35,
  readAloud: {
    text: `Le passage s'ouvre sur un jardin sous-marin d'une beauté surnaturelle — et d'un danger mortel. Des formations de corail vivant poussent dans toutes les directions, créant un labyrinthe tridimensionnel de couleurs éclatantes. Rose, rouge, bleu, violet, vert — chaque espèce de corail émet sa propre bioluminescence, transformant la salle en un kaléidoscope aquatique.

Mais ce jardin est conscient. Les coraux bougent — lentement, comme des plantes au ralenti, mais indéniablement vivants et réactifs. Des branches coralliennes s'écartent sur votre passage, d'autres se tendent vers vous avec une curiosité qui pourrait vite devenir agression. Des filaments de corail-méduse flottent dans l'eau, leurs tentacules translucides chargés de cellules urticantes.

Au centre du jardin, un corail massif — l'Arbre-Corail, un organisme unique de dix mètres de haut — domine l'espace. Sa base est enracinée dans le sol du temple, et ses branches s'étalent comme un parapluie de cristal vivant. Le troisième Fragment de Trident — la tête, avec ses trois pointes de corail de mer — est enchâssé dans le tronc de l'Arbre-Corail.

Et autour de l'Arbre-Corail, des créatures de garde patrouillent : des Élémentaires d'Eau corrompus, leur forme liquide teintée de noir, qui maintiennent le jardin dans un état de tension hostile.`,
    mood: 'beauté dangereuse, labyrinthe vivant, combat aquatique',
    music: 'Harmoniques coralliennes, courants, vibrations de combat'
  },
  gmNotes: [
    {
      type: 'info',
      text: "3 Élémentaires d'Eau Corrompus gardent l'Arbre-Corail. Le jardin lui-même est semi-hostile : les coraux attaquent si on les touche (1d6 perçant + 1d4 poison de contact). Le chemin vers l'Arbre-Corail nécessite de naviguer le labyrinthe sans toucher les murs (Acrobatie DD 14 ou Discrétion DD 15)."
    },
    {
      type: 'tip',
      text: "Les Élémentaires corrompus sont vulnérables à la lumière divine (radiant ×1.5). La corruption qui les anime est la même que celle de Veyra — les détruire affaiblit l'emprise de Veyra sur le temple."
    },
    {
      type: 'warning',
      text: "Extraire le Fragment de l'Arbre-Corail le blesse. L'Arbre émet un cri psychique (Sagesse DD 15 ou Étourdi 1 round) et le jardin entier devient hostile pendant 3 rounds (tous les coraux attaquent : 2d6 perçant + 1d6 poison par round à chaque PJ dans le jardin)."
    },
    {
      type: 'secret',
      text: "Thessala (si alliée) peut communiquer avec l'Arbre-Corail et le convaincre de libérer le Fragment sans violence (Persuasion DD 16 pour Thessala, auto-succès si les PJ ont protégé le Sceau de Forêt dans le Donjon 3)."
    }
  ],
  encounter: {
    name: "Élémentaires d'Eau Corrompus",
    enemies: [
      {
        name: "Élémentaire d'Eau Corrompu",
        hp: 58,
        atk: 8,
        ac: 14,
        cr: 5,
        abilities: [
          "Vague Corrompue : +8, 2d8+4 contondant + 1d6 nécrotique",
          "Enveloppement : Enveloppe une créature (Constitution DD 15 ou Noyade, 2d6 contondant + 1d6 nécrotique/tour)",
          "Forme Liquide : Peut se faufiler dans des espaces de 2,5 cm, résistance perçant/tranchant non-magique",
          "Aura de Corruption Aquatique : L'eau dans 3m est corrompue, 1d4 nécrotique par tour aux créatures organiques",
          "Vulnérabilité Radiant : Dégâts radiants ×1.5"
        ]
      },
      {
        name: "Élémentaire d'Eau Corrompu (×2 supplémentaires)",
        hp: 58,
        atk: 8,
        ac: 14,
        cr: 5,
        abilities: [
          "Identique au premier",
          "Fusion : Deux élémentaires peuvent fusionner en 1 round. L'élémentaire fusionné a la somme des PV restants, +2 attaque, +2 CA, et son Enveloppement affecte 2 cibles."
        ]
      }
    ],
    terrain: [
      "Labyrinthe de corail : terrain difficile, 1d6 perçant + 1d4 poison si on touche les murs",
      "Arbre-Corail (centre) : couverture totale, objectif",
      "Eau corrompue (autour des élémentaires) : 1d4 nécrotique/tour",
      "Espace tridimensionnel : combat en 3D, les élémentaires utilisent le volume"
    ],
    tactics: "Les élémentaires patrouillent le jardin en triangle. Si un PJ s'approche de l'Arbre-Corail, deux élémentaires convergent tandis que le troisième tente d'Envelopper un soigneur. Ils utilisent Fusion si réduits à 2 élémentaires. Ils ne quittent pas le jardin.",
    loot: [
      "Fragment de Trident — Tête (objet de quête, 3 pointes de corail de mer)",
      "Essence d'Élémentaire Purifié (×2, composante de sort aquatique de haut niveau, 200 po chacune)",
      "Corail Vivant (branche, arme +1 qui pousse et s'adapte à son porteur, 1d8 perçant, valeur : 600 po)",
      "Eau Corrompue Purifiée (fiole, si purifiée par magie divine : super-potion de soin 6d8+10, valeur : 500 po)"
    ]
  },
  skillChecks: [
    {
      skill: 'Acrobatie',
      dc: 14,
      success: "Vous naviguez le labyrinthe de corail sans toucher un seul mur. Passage discret.",
      failure: "Vous frôlez une branche de corail. 1d6 perçant + 1d4 poison. Le jardin frémit."
    },
    {
      skill: 'Persuasion (Thessala)',
      dc: 16,
      success: "Thessala convaincue l'Arbre-Corail de libérer le Fragment pacifiquement. Aucun cri, aucune hostilité.",
      failure: "L'Arbre-Corail est trop méfiant. Il faudra extraire le Fragment par la force."
    }
  ],
  choices: [
    {
      id: 'choix-corail-1',
      prompt: "Le Fragment de Trident est dans l'Arbre-Corail. Comment le récupérer ?",
      options: [
        {
          label: "Demander à Thessala de négocier",
          description: "Utiliser la connexion de la princesse sirène avec le jardin",
          consequence: "La voie pacifique — si Thessala est avec vous.",
          nextScene: 'temple-8-trone-reine'
        },
        {
          label: "Extraire le Fragment par la force",
          description: "Arracher le Fragment de l'Arbre-Corail",
          consequence: "Rapide mais déclenche la colère du jardin.",
          nextScene: 'temple-8-trone-reine'
        },
        {
          label: "Éliminer les Élémentaires d'abord",
          description: "Nettoyer la zone avant de toucher au Fragment",
          consequence: "Tactique sûre mais bruyante.",
          nextScene: 'temple-8-trone-reine'
        }
      ]
    }
  ],
  loot: [
    "Fragment de Trident — Tête (3 pointes de corail)",
    "2 Essences d'Élémentaire (200 po chacune)",
    "Corail Vivant (+1 adaptatif, 600 po)",
    "Eau Corrompue Purifiée (500 po)"
  ],
  nextScenes: ['temple-8-trone-reine'],
  previousScene: 'temple-6-forge-marine'
};

// ============================================================================
// SALLE 8 : Salle du Trône de la Reine des Mers
// ============================================================================
const SCENE_TRONE_REINE: BookScene = {
  id: 'temple-8-trone-reine',
  sceneNumber: 8,
  title: "La Salle du Trône de la Reine des Mers",
  type: 'revelation',
  location: "Sanctum Royal, Temple de Marethys",
  locationId: 'marethys-trone-reine',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le Sanctum Royal de Marethys est la salle la plus profonde et la plus majestueuse du temple. Une bulle d'air magique parfaitement stable maintient un espace respirable — le dernier vestige du pouvoir de la Reine Thalassa.

Le trône est un chef-d'œuvre : un siège taillé dans un unique bloc de nacre géante, incrusté de saphirs, de perles noires et de diamants marins. Derrière le trône, un vitrail magique sous-marin projette des images de l'ancien royaume de Marethys dans sa splendeur — des cités de corail, des armées de sirènes, des baleines chantantes qui servaient de montures.

Et sur le trône, immobile depuis trois millénaires, la Reine Thalassa repose. Ce n'est pas un cadavre — c'est une stase. Son corps est cristallisé dans une coquille de nacre translucide, son expression sereine, sa main gauche tendue comme si elle attendait quelque chose. Ses doigts sont ouverts, et dans la paume de sa main, un creux en forme de trident...

Le Sceau de Mer brille sous le trône, intégré dans le sol de nacre — un symbole de vague d'un bleu profond qui pulse au rythme des marées même à cent mètres de profondeur. Des fissures noires — la corruption de Veyra — rampent vers le Sceau depuis les murs.

Et là, dans l'ombre d'une colonne, Veyra vous attend. L'agent du Consortium. À ses côtés, Morwen — la sœur de Thessala — les yeux vitreux, sous l'emprise de l'Orbe.`,
    mood: 'culminant, confrontation, choix fatidiques',
    music: 'Thème royal océanique, tension, confrontation'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Veyra est une sorcière CR 8 qui contrôle Morwen (sirène guerrière CR 5) via son Orbe de Corruption. Combattre Morwen n'est pas nécessaire — briser l'Orbe (15 PV, CA 13) ou réussir Dissipation DD 17 la libère. Veyra fuit si son Orbe est détruit."
    },
    {
      type: 'tip',
      text: "Assembler le Trident de Thalassa (3 fragments) et le placer dans la main de la Reine réveille Thalassa. Elle peut purifier le Sceau de Mer, mais cela lui coûte la vie (elle fusionne avec le Sceau pour le renforcer définitivement). C'est un choix moral pour Thessala."
    },
    {
      type: 'secret',
      text: "Si Thessala est présente et que sa mère est réveillée, le choix est déchirant : Thalassa peut vivre (le Sceau reste fragile) ou mourir (le Sceau est renforcé pour des siècles). Thessala plaidera pour sauver sa mère. Les PJ doivent décider s'ils insistent ou respectent le choix de Thessala."
    },
    {
      type: 'warning',
      text: "Veyra a des informations cruciales sur le Consortium des Ombres et le plan global de Malachar. La capturer vivante (au lieu de la tuer) est très bénéfique pour l'Acte 4. Elle négocie sa vie contre des informations si elle est acculée."
    }
  ],
  encounter: {
    name: "Veyra, Agent du Consortium & Morwen sous contrôle",
    enemies: [
      {
        name: "Veyra, Sorcière du Consortium",
        hp: 72,
        atk: 9,
        ac: 15,
        cr: 8,
        abilities: [
          "Rayon d'Eau Noire : +9, portée 18m, 3d10 nécrotique + 1d8 froid",
          "Contrôle de Morwen : Tant que l'Orbe existe, Morwen combat pour Veyra",
          "Bouclier Aquatique : Réaction, +4 CA, redirige les dégâts vers Morwen (si contrôlée)",
          "Vortex : (1/combat) Tourbillon de 6m, 4d8 contondant + aspiré au centre, Force DD 16",
          "Téléportation Aquatique : Bonus, se téléporte dans n'importe quel plan d'eau visible dans 18m",
          "Fuite : Si l'Orbe est détruit, Veyra tente de fuir via Téléportation Aquatique"
        ]
      },
      {
        name: "Morwen, Sirène sous Contrôle",
        hp: 55,
        atk: 7,
        ac: 14,
        cr: 5,
        abilities: [
          "Trident de Corail : +7, 2d8+3 perçant",
          "Chant Hypnotique : (Recharge 5-6) 9m, Sagesse DD 16 ou Charmé 1 tour (les alliés apparaissent comme des ennemis)",
          "Forme Aquatique : Vitesse de nage 18m, avantage sur les attaques sous l'eau",
          "Sous Contrôle : Morwen obéit à Veyra. Elle ne fait rien de sa propre volonté. Si l'Orbe est détruit, elle s'effondre et reprend conscience en 1d4 rounds"
        ]
      }
    ],
    terrain: [
      "Bulle d'air : combat en conditions normales (pas de pénalité sous-marine)",
      "Trône : couverture totale d'un côté, point tactique",
      "Colonnes : couverture partielle",
      "Sceau de Mer au sol : zone de lumière, +1 aux sauvegardes pour les PJ dans 3m",
      "Plans d'eau décoratifs : Veyra peut se téléporter entre eux"
    ],
    tactics: "Veyra garde Morwen entre elle et les PJ, utilisant Bouclier Aquatique pour rediriger les dégâts. Elle utilise Rayon d'Eau Noire depuis la couverture des colonnes et se téléporte si approchée. Morwen attaque le PJ le plus proche et utilise Chant Hypnotique dès que possible. Si l'Orbe est menacé, Veyra le protège en priorité.",
    loot: [
      "Orbe de Corruption de Veyra (objet de quête, preuve contre le Consortium)",
      "Bâton de Veyra (+2, 2d6+2 contondant, lance Rayon de Froid 3/jour)",
      "Armure Écaille de Veyra (armure moyenne, CA 16, résistance froid, vitesse de nage 12m)",
      "Informations du Consortium (si Veyra capturée vivante)",
      "Trident de Thalassa (si les 3 fragments assemblés : arme +3, 2d8+3 perçant + 2d6 froid, Contrôle des Eaux 1/jour)"
    ]
  },
  skillChecks: [
    {
      skill: 'Arcanes',
      dc: 17,
      success: "Vous lancez Dissipation sur l'Orbe. Le contrôle de Morwen est brisé ! Elle s'effondre, confuse mais libre.",
      failure: "L'Orbe résiste à la dissipation. Sa magie est plus puissante que prévu."
    },
    {
      skill: 'Persuasion',
      dc: 16,
      success: "Vous convainquez Veyra de se rendre. Elle accepte de parler en échange de sa vie. Informations cruciales obtenues.",
      failure: "Veyra rit. « Le Consortium ne négocie pas avec des pions. » Combat."
    }
  ],
  choices: [
    {
      id: 'choix-trone-reine-1',
      prompt: "Veyra est vaincue. Le Trident peut réveiller Thalassa. Que faites-vous ?",
      options: [
        {
          label: "Placer le Trident dans la main de Thalassa",
          description: "Réveiller la Reine des Mers",
          consequence: "Thalassa se réveille. Le choix de la sacrifier pour le Sceau se posera.",
          nextScene: 'temple-9-kraken'
        },
        {
          label: "Garder le Trident comme arme",
          description: "Ne pas réveiller Thalassa — garder l'arme +3",
          consequence: "L'arme reste à votre disposition mais le Sceau restera fragile.",
          nextScene: 'temple-9-kraken'
        },
        {
          label: "Laisser Thessala décider",
          description: "C'est sa mère — c'est son choix",
          consequence: "Thessala hésite, puis réveille sa mère. Le choix du sacrifice viendra plus tard.",
          nextScene: 'temple-9-kraken'
        }
      ]
    }
  ],
  loot: [
    "Trident de Thalassa (+3, 2d8+3 + 2d6 froid, Contrôle des Eaux 1/jour)",
    "Bâton de Veyra (+2, Rayon de Froid 3/jour)",
    "Armure Écaille (CA 16, résistance froid, nage 12m)",
    "Orbe de Corruption (preuve)",
    "Intel du Consortium (si Veyra capturée)"
  ],
  nextScenes: ['temple-9-kraken'],
  previousScene: 'temple-7-jardin-corail'
};

// ============================================================================
// SALLE 9 : Combat contre le Kraken Juvénile
// ============================================================================
const SCENE_KRAKEN: BookScene = {
  id: 'temple-9-kraken',
  sceneNumber: 9,
  title: "Le Kraken Juvénile",
  type: 'combat',
  location: "Abysses sous le temple, Marethys",
  locationId: 'marethys-abysses',
  estimatedMinutes: 40,
  readAloud: {
    text: `Sous la Salle du Trône, un dernier escalier plonge dans les abysses véritables — la zone la plus profonde du temple, là où même la lumière magique peine à percer. Le passage débouche sur une caverne naturelle d'une taille vertigineuse, entièrement submergée dans une eau si noire qu'elle absorbe la lumière.

C'est ici que le Sceau de Mer est ancré dans sa forme la plus pure — un glyphe de lumière bleue qui pulse sur le fond de la caverne comme une étoile sous-marine. Mais entre vous et le Sceau, une masse sombre se déplace.

Le Kraken Juvénile — un monstre de trente mètres d'envergure, ses huit bras couverts de ventouses dentelées, son bec capable de broyer une coque de navire. Ses yeux, grands comme des boucliers, reflètent la lueur du Sceau avec une intelligence terrifiante. Ce n'est pas un animal — c'est un gardien, corrompu par la même force qui menace les Sceaux.

Son corps est parcouru de veines de corruption noire, et ses mouvements sont erratiques — il souffre, déchiré entre son rôle de protecteur et la folie que la corruption lui inflige. Par moments, il semble presque docile, et l'instant d'après, ses tentacules frappent avec la force d'un ouragan.

Derrière le Kraken, le Sceau de Mer pulse — et ses fissures sont visibles même à cette distance. Le temps presse.`,
    mood: 'terreur abyssale, combat titanesque, enjeux cosmiques',
    music: 'Thème de boss titanesque, pressions sous-marines, percussions de combat'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le Kraken Juvénile est un boss CR 10. Il est corrompu mais pas irrémédiablement. Si Thalassa a été réveillée (Salle 8), elle peut apaiser le Kraken (Persuasion DD 18 par Thalassa, auto-succès). Sinon, il faut le combattre ou le soumettre."
    },
    {
      type: 'tip',
      text: "Le Kraken a 8 tentacules mais seuls 4 peuvent agir par round. Couper un tentacule (25 PV, CA 14) le neutralise pour le reste du combat. Couper 4 tentacules réduit le Kraken à la moitié de son efficacité. Le bec est le point faible : CA 12 mais seulement accessible si 2+ tentacules sont coupés."
    },
    {
      type: 'warning',
      text: "Ce combat est ENTIÈREMENT sous l'eau. Toutes les pénalités sous-marines s'appliquent sauf pour les armes perforantes et les lanceurs de sorts avec des sorts fonctionnels sous l'eau. Les PJ sans vitesse de nage sont en grand désavantage."
    },
    {
      type: 'secret',
      text: "Le Kraken protège un œuf — un unique œuf géant caché derrière le Sceau. C'est pourquoi il est ici : c'est une mère. La corruption la rend agressive mais son instinct de protection est plus fort. Si les PJ promettent de protéger l'œuf (Persuasion DD 18, Dressage DD 20), le Kraken se calme."
    }
  ],
  encounter: {
    name: "Kraken Juvénile Corrompu",
    enemies: [
      {
        name: "Kraken Juvénile Corrompu",
        hp: 160,
        atk: 10,
        ac: 15,
        cr: 10,
        abilities: [
          "Tentacule (×4/round) : +10, portée 9m, 2d8+5 contondant et Agrippé (Évasion DD 17)",
          "Bec : +10, 3d10+5 perçant (uniquement si 2+ tentacules sont coupés, portée 3m)",
          "Constriction : Cible agrippée, automatique, 3d8 contondant/tour",
          "Jet d'Encre Corrompu : (Recharge 5-6) Nuage de 12m, Vision réduite à 0, 2d8 poison/round dans la zone, 3 rounds",
          "Vague de Tentacules : (1/combat) TOUS les 8 tentacules attaquent simultanément (+8, 1d8+3 chacun), Dextérité DD 16 pour esquiver complètement",
          "Courant de Fuite : Le Kraken crée un courant qui repousse tout de 6m (Force DD 16 pour résister)",
          "Tentacules Séparables : Chaque tentacule a 25 PV et CA 14. Couper un tentacule = 1 attaque en moins/round. Le Kraken crie de douleur mais ne meurt pas.",
          "Régénération Corrompue : 5 PV/tour. Les dégâts radiants empêchent la régénération 1 round."
        ]
      }
    ],
    terrain: [
      "Combat entièrement sous-marin : pénalités standards",
      "Caverne massive (50m de diamètre) : beaucoup d'espace de manœuvre",
      "Sceau de Mer (fond) : zone de lumière, +2 CA et sauvegardes dans 3m",
      "Colonies de corail : couverture partielle, destructibles",
      "Courants naturels : peuvent être utilisés pour manœuvrer (Athlétisme DD 12 pour les utiliser)"
    ],
    tactics: "Le Kraken utilise ses 4 meilleurs tentacules pour grapple les PJ et les tirer vers son bec. Il utilise Jet d'Encre quand il est entouré pour fuir et se repositionner. Il cible les PJ qui s'approchent de l'œuf caché en priorité. Si réduit à 40 PV, il utilise Vague de Tentacules (désespoir) puis tente de protéger l'œuf en se repliant dessus.",
    loot: [
      "Bec de Kraken (matériau pour arme +2, extrêmement dur, valeur : 2000 po)",
      "Ventouses de Kraken (×8, composante alchimique, adhésif surpuissant, 100 po chacune)",
      "Encre de Kraken (×3 fioles, crée une zone d'obscurité de 6m pendant 1 minute, 150 po chacune)",
      "Œuf de Kraken (si protégé : allié potentiel futur, objet de quête de grande valeur)",
      "Perle Noire Abyssale (gemme, +2 sorts de ténèbres, Ténèbres 3/jour, valeur : 3000 po)"
    ]
  },
  skillChecks: [
    {
      skill: 'Dressage',
      dc: 20,
      success: "Vous établissez un contact avec le Kraken. Sa rage s'apaise. Elle comprend que vous n'êtes pas une menace pour son œuf. Le combat cesse.",
      failure: "Le Kraken ne comprend pas vos signaux. Ou plutôt, la corruption l'empêche de les interpréter."
    },
    {
      skill: 'Persuasion',
      dc: 18,
      success: "Avec Thalassa à vos côtés, vous apaisez le Kraken. La Reine des Mers le connaît depuis sa naissance. Il se calme.",
      failure: "Même la voix de Thalassa ne perce pas la corruption. Le Kraken est trop loin dans la folie."
    }
  ],
  choices: [
    {
      id: 'choix-kraken-1',
      prompt: "Le Kraken bloque l'accès au Sceau. Comment procédez-vous ?",
      options: [
        {
          label: "Combattre le Kraken",
          description: "Affronter le monstre des profondeurs",
          consequence: "Combat titanesque sous-marin.",
          nextScene: 'temple-10-leviathan'
        },
        {
          label: "Apaiser le Kraken (avec Thalassa)",
          description: "Utiliser la Reine des Mers pour calmer la créature",
          consequence: "Voie pacifique — nécessite Thalassa.",
          skillCheck: {
            skill: 'Persuasion',
            dc: 18,
            success: "Le Kraken se retire, révélant le chemin vers le Léviathan Enchaîné.",
            failure: "Le Kraken attaque malgré les efforts de Thalassa."
          },
          nextScene: 'temple-10-leviathan'
        },
        {
          label: "Protéger l'œuf pour gagner sa confiance",
          description: "Montrer au Kraken que vous n'êtes pas une menace",
          consequence: "Approche longue mais qui pourrait fonctionner.",
          skillCheck: {
            skill: 'Dressage',
            dc: 20,
            success: "Le Kraken comprend. Il se calme et vous laisse passer.",
            failure: "Le Kraken interprète votre approche de l'œuf comme une agression. Fureur !"
          },
          nextScene: 'temple-10-leviathan'
        }
      ]
    }
  ],
  loot: [
    "Bec de Kraken (2000 po matériau)",
    "8 Ventouses (100 po chacune)",
    "3 Fioles d'Encre (150 po chacune)",
    "Perle Noire Abyssale (3000 po)",
    "Œuf de Kraken (objet de quête, si protégé)"
  ],
  nextScenes: ['temple-10-leviathan'],
  previousScene: 'temple-8-trone-reine'
};

// ============================================================================
// SALLE 10 : Le Léviathan Enchaîné (BOSS)
// ============================================================================
const SCENE_BOSS_LEVIATHAN: BookScene = {
  id: 'temple-10-leviathan',
  sceneNumber: 10,
  title: "Le Léviathan Enchaîné — Libérer ou Détruire",
  type: 'combat',
  location: "Fosse Abyssale, sous le Temple de Marethys",
  locationId: 'marethys-fosse-abyssale',
  estimatedMinutes: 50,
  readAloud: {
    text: `Au-delà du Kraken, la caverne plonge encore — dans une fosse verticale d'une profondeur insondable. Et au fond de cette fosse, enchaîné par des liens de lumière bleue qui sont les chaînes même du Sceau de Mer, repose le Léviathan.

Le Léviathan est une créature d'un autre âge — un serpent de mer de plus de cent mètres de long, son corps couvert d'écailles d'un bleu si sombre qu'elles paraissent noires. Des chaînes de lumière l'enserrent à intervalles réguliers, formant un réseau de contraintes magiques qui le maintient prisonnier depuis trois millénaires. Le Sceau de Mer est littéralement tissé dans ses chaînes — briser le Sceau libère le Léviathan, et vice versa.

Mais le Léviathan est éveillé. Ses yeux — deux gouffres de lumière verte, chacun grand comme un homme — vous fixent avec une intelligence ancienne et une fureur contenue. Son corps se tord contre ses chaînes, et chaque convulsion fait trembler tout le temple. Les fissures dans le Sceau — les mêmes que celles causées par Veyra et la corruption — lui ont rendu une partie de sa mobilité.

Quand il parle, sa voix est un tremblement de terre mental : « TROIS MILLE ANS. TROIS MILLE ANS ENCHAÎNÉ DANS L'OBSCURITÉ. ÊTES-VOUS VENUS ME LIBÉRER OU ME DÉTRUIRE ? CHOISISSEZ BIEN — CAR MON SOUFFLE SEUL PEUT NOYER DES CONTINENTS. »

Le choix est devant vous. Libérer le Léviathan brise le Sceau de Mer. Le détruire (est-ce seulement possible ?) renforce le Sceau. Ou existe-t-il une troisième voie ?`,
    mood: 'titanesque, dilemme moral, climax',
    music: 'Thème de boss final marin, basses profondes, pression maximale'
  },
  gmNotes: [
    {
      type: 'info',
      text: "LE LÉVIATHAN NE PEUT PAS ÊTRE TUÉ par des PJ de niveau 10-14. C'est une créature divine, CR 20+. Le combat est un combat de SURVIE et de CHOIX, pas d'élimination. Les PJ ont 3 options : (1) Renforcer les chaînes/le Sceau (Religion DD 18 × 3 réussites), (2) Libérer le Léviathan (briser 5 chaînes, Force DD 20 ou Dissipation DD 18 chacune), (3) Négocier un pacte (Persuasion DD 20)."
    },
    {
      type: 'tip',
      text: "Si Thalassa est réveillée et présente, elle peut se sacrifier pour fusionner avec le Sceau et renforcer les chaînes automatiquement. C'est la voie « héroïque mais tragique ». Thessala sera dévastée. Alternativement, Thalassa peut négocier avec le Léviathan (ils se connaissent) avec avantage sur le jet."
    },
    {
      type: 'warning',
      text: "Le Léviathan attaque pendant que les PJ tentent leur objectif. Il ne peut pas se libérer seul, mais il peut empêcher les PJ d'agir. Le combat est un combat de retardement : les PJ doivent survivre assez longtemps pour compléter leur choix (5 rounds minimum). Chaque round, le Léviathan attaque avec une partie libre de son corps."
    },
    {
      type: 'secret',
      text: "La troisième voie — le Pacte — est la meilleure. Si les PJ convainquent le Léviathan d'accepter volontairement ses chaînes en échange d'une promesse (« briser la source de la corruption, Malachar lui-même »), le Léviathan accepte et le Sceau est renforcé SANS sacrifice. Mais la promesse doit être tenue — sinon le Léviathan brisera ses chaînes lui-même. Cela lie les PJ à une quête."
    }
  ],
  encounter: {
    name: "Le Léviathan Enchaîné",
    enemies: [
      {
        name: "Le Léviathan (combat de survie, pas d'élimination)",
        hp: 999,
        atk: 14,
        ac: 20,
        cr: 20,
        abilities: [
          "Queue (seule partie libre) : +14, portée 15m, 4d10+8 contondant, cible repoussée de 6m (Force DD 20 pour résister)",
          "Souffle de Marée : (Recharge 5-6) Ligne de 30m, 8d10 froid + 4d10 contondant (force de l'eau). Dextérité DD 20 pour moitié. Repousse de 12m.",
          "Tremblement : Début de chaque round, le temple tremble. Dextérité DD 15 ou tous les PJ tombent à terre.",
          "Présence Terrifiante : Aura de 18m, Sagesse DD 18 ou Effrayé 1 round (première fois uniquement, immunité après).",
          "Convulsion : (1/combat) Le Léviathan convulse violemment. TOUT dans 30m : 6d10 contondant, Dextérité DD 18 pour moitié. Les chaînes craquent — le temps est compté.",
          "Immunités : Le Léviathan est immunisé à presque tout. Les dégâts des PJ ne font que le distraire (pas de dégâts réels)."
        ]
      }
    ],
    terrain: [
      "Fosse verticale : combat en 3D sous l'eau, chute possible dans l'obscurité",
      "Chaînes de Sceau (×5) : destructibles (50 PV chacune, CA 18) ou renforçables (Religion DD 18)",
      "Sceau de Mer (au centre des chaînes) : zone de lumière, +2 aux sauvegardes dans 6m",
      "Courants violents : le mouvement du Léviathan crée des courants aléatoires (Athlétisme DD 14 pour résister)"
    ],
    tactics: "Le Léviathan utilise sa Queue pour repousser les PJ loin des chaînes. Il utilise Souffle de Marée dès que les PJ se regroupent. Tremblement perturbe les incantations. Convulsion est utilisée quand le Léviathan sent que les PJ sont proches de réussir (stress narratif). Le combat DOIT durer au moins 5 rounds pour que les PJ complètent leur objectif.",
    loot: [
      "Écaille du Léviathan (×1, tombée durant le combat, matériau pour armure lourde +3, CA 20, résistance froid et contondant, valeur : 10000 po)",
      "Chaîne de Sceau brisée (matériau divin, composante pour sort de niveau 8+, valeur inestimable)",
      "Bénédiction de la Mer (si Sceau renforcé : respiration aquatique permanente + résistance froid pour tous les PJ)",
      "Perle du Léviathan (si pacte négocié : gemme qui permet de communiquer avec le Léviathan 1/mois, il peut répondre à 1 question)",
      "Trident de Thalassa Complet (si assemblé et récupéré après la conclusion)"
    ]
  },
  skillChecks: [
    {
      skill: 'Religion',
      dc: 18,
      success: "Vous canalisez de l'énergie dans une chaîne de Sceau. Elle brille plus fort et le Léviathan grogne. 1 chaîne renforcée sur 3 nécessaires.",
      failure: "La chaîne ne répond pas à votre énergie. Le Léviathan rit — un son qui fait vibrer vos os."
    },
    {
      skill: 'Persuasion',
      dc: 20,
      success: "Le Léviathan vous écoute. « Vous promettez de détruire celui qui m'a emprisonné... Malachar. Je peux attendre encore. Mais si vous échouez... je viendrai réclamer mon dû. » Le Pacte est scellé. Le Sceau se renforce.",
      failure: "Le Léviathan rugit. « Des mots ! Toujours des mots ! Montrez-moi des ACTES ou mourrez dans mes chaînes ! »"
    }
  ],
  choices: [
    {
      id: 'choix-leviathan-1',
      prompt: "Le Léviathan attend votre choix. Le destin du Sceau de Mer est entre vos mains.",
      options: [
        {
          label: "Renforcer les chaînes (3 réussites en Religion DD 18)",
          description: "Maintenir le Sceau par la foi et la magie",
          consequence: "Le Sceau est renforcé. Le Léviathan reste prisonnier. Stable mais temporaire.",
          nextScene: 'temple-conclusion'
        },
        {
          label: "Négocier un Pacte avec le Léviathan",
          description: "Promettre de détruire Malachar en échange de sa coopération",
          consequence: "Le meilleur résultat — mais la promesse doit être tenue dans l'Acte 5.",
          skillCheck: {
            skill: 'Persuasion',
            dc: 20,
            success: "Pacte scellé ! Le Léviathan accepte volontairement ses chaînes. Le Sceau est renforcé durablement.",
            failure: "Le Léviathan refuse. Il faudra renforcer les chaînes par la force."
          },
          nextScene: 'temple-conclusion'
        },
        {
          label: "Sacrifier Thalassa pour fusionner avec le Sceau",
          description: "La Reine des Mers donne sa vie pour le Sceau",
          consequence: "Sceau renforcé définitivement. Thessala perd sa mère. Conséquence émotionnelle majeure.",
          nextScene: 'temple-conclusion'
        },
        {
          label: "Libérer le Léviathan",
          description: "Briser les chaînes et le Sceau",
          consequence: "Le Léviathan est libre. Le Sceau de Mer est BRISÉ. Conséquences catastrophiques pour la campagne. Raz-de-marée. Malachar se rapproche de la liberté.",
          nextScene: 'temple-conclusion'
        }
      ]
    }
  ],
  loot: [
    "Écaille du Léviathan (armure +3 possible, 10000 po)",
    "Chaîne de Sceau (matériau divin)",
    "Bénédiction de la Mer (si renforcé)",
    "Perle du Léviathan (si pacte)",
    "Trident de Thalassa Complet (+3, contrôle des eaux)"
  ],
  nextScenes: ['temple-conclusion'],
  previousScene: 'temple-9-kraken'
};

// ============================================================================
// CHAPITRE COMPLET
// ============================================================================
export const DUNGEON_TEMPLE: BookChapter = {
  id: 'dungeon-temple-marethys',
  actNumber: 3,
  chapterNumber: 15,
  title: "Le Temple Englouti de Marethys",
  subtitle: "Sous les vagues, le Sceau de Mer vacille entre les griffes du Léviathan",
  summary: "Les héros plongent dans les profondeurs de la Mer de Marethys pour atteindre un temple englouti depuis trois millénaires. À travers dix salles sous-marines — puzzles hydrauliques, prison de sirènes, jardins de corail vivant et forges sous-marines — ils affrontent Veyra, agent du Consortium des Ombres, et font face au Kraken Juvénile Corrompu. Le boss final est unique : le Léviathan Enchaîné ne peut pas être tué. Les PJ doivent choisir entre renforcer le Sceau, négocier un pacte, sacrifier la Reine Thalassa, ou libérer la créature. Chaque choix a des conséquences majeures pour la suite de la campagne.",
  levelRange: "10-14",
  themes: [
    "Les profondeurs et l'inconnu",
    "Diplomatie et alliances contre force brute",
    "Sacrifice et devoir",
    "Le poids des promesses",
    "La corruption qui s'étend"
  ],
  scenes: [
    SCENE_PLONGEE,
    SCENE_HALL_ENTREE,
    SCENE_COURANTS,
    SCENE_BIBLIOTHEQUE_SUB,
    SCENE_PRISON_SIRENES,
    SCENE_FORGE_MARINE,
    SCENE_JARDIN_CORAIL,
    SCENE_TRONE_REINE,
    SCENE_KRAKEN,
    SCENE_BOSS_LEVIATHAN
  ],
  chapterIntro: {
    text: `Bienvenue dans le Temple Englouti de Marethys — le quatrième méga-donjon de la campagne d'Aethelgard. Ce donjon est conçu pour des personnages de niveau 10 à 14 et devrait prendre 6 à 10 heures de jeu réel.

Ce donjon est entièrement sous-marin, ce qui change fondamentalement les mécaniques de combat et d'exploration. Assurez-vous que tous les PJ ont un moyen de respirer sous l'eau avant de commencer. Le combat sous l'eau pénalise les armes non-perforantes et les sorts de feu.

Le thème central est le CHOIX. Chaque salle offre des alternatives significatives, et le boss final — le Léviathan Enchaîné — n'a PAS de solution unique. Le choix des PJ face au Léviathan est l'un des moments les plus importants de la campagne, avec des conséquences qui se répercutent jusqu'à l'Acte 5.`,
    mood: 'abyssal, diplomatique, conséquences',
    music: 'Thème océanique profond, mystère et majesté sous-marine'
  },
  chapterConclusion: {
    text: `Les profondeurs de Marethys relâchent les héros — changés, chargés du poids de leurs choix. Le Sceau de Mer est renforcé, brisé ou lié par un pacte — et chaque résolution aura des répercussions que le monde ne tardera pas à ressentir.

Si Thalassa s'est sacrifiée, Thessala porte le deuil de sa mère mais aussi sa couronne. Le royaume sous-marin de Marethys a une nouvelle reine — et une alliée potentielle pour la bataille finale. Si le pacte a été scellé, une promesse lourde pèse sur les épaules des héros : détruire Malachar ou affronter la colère du Léviathan.

Quatre Sceaux ont été visités. Le cinquième — le Sceau Secret — reste un mystère. Et au-delà des Sceaux, le Nexus attend : le lieu où tout converge, où Malachar tente de se libérer, et où le destin d'Aethelgard sera scellé...`,
    mood: 'gravité des choix, transition vers le final',
    music: 'Thème de la mer qui s\'éloigne, horizon incertain'
  },
  rewards: {
    xp: 14000,
    gold: "6000-10000 po (selon exploration et choix)",
    items: [
      "Trident de Thalassa (+3, contrôle des eaux)",
      "Écaille du Léviathan (matériau armure +3)",
      "Gantelets de la Reine des Mers (+2 Force)",
      "Bâton de Veyra (+2, Rayon de Froid)",
      "Armure Écaille (CA 16, résistance froid)",
      "Perle Noire Abyssale (+2 ténèbres)",
      "Perle du Léviathan (communication)",
      "Bénédiction de la Mer (résistance froid permanente)",
      "Allié potentiel : Thessala, Reine de Marethys",
      "Orbe de Corruption (preuve pour l'Acte 4)"
    ]
  }
};
