/**
 * MEGA-DONJON FINAL : Le Nexus des Sceaux
 * Acte 5 — Niveau 16-20
 * 12 salles — Le donjon ultime de la campagne d'Aethelgard
 */

import type { BookChapter, BookScene } from './gm-book-data';

// ============================================================================
// SALLE 1 : La Porte du Destin (Point de Non-Retour)
// ============================================================================
const SCENE_PORTE_DESTIN: BookScene = {
  id: 'nexus-1-porte-destin',
  sceneNumber: 1,
  title: "La Porte du Destin",
  type: 'choice',
  location: "Entrée du Nexus des Sceaux",
  locationId: 'nexus-porte-destin',
  estimatedMinutes: 20,
  readAloud: {
    text: `Le Nexus des Sceaux n'a pas d'emplacement fixe — il existe dans l'espace entre les plans, accessible uniquement par ceux qui possèdent les fragments des cinq Sceaux. Quand vous activez les reliques ensemble, le monde se déchire devant vous. Pas violemment — délicatement, comme on ouvre une enveloppe scellée depuis des millénaires.

Le passage qui s'ouvre est un tunnel de lumière pure — blanche, dorée, aveuglante — qui traverse le tissu même de la réalité. Derrière vous, le monde que vous connaissez. Devant vous, l'inconnu absolu. L'air qui s'en échappe est chargé d'une énergie si dense qu'elle fait bourdonner vos os et vibrer vos dents.

Au seuil du tunnel, une inscription flotte dans l'air — des lettres de feu qui brûlent sans consumer, écrites dans toutes les langues à la fois : « AU-DELÀ DE CE SEUIL, IL N'Y A PAS DE RETOUR. LA PORTE SE FERME DERRIÈRE CEUX QUI CHOISISSENT LE DESTIN. SEULE LA VICTOIRE OU LA MORT OUVRIRA UNE ISSUE. RÉFLÉCHISSEZ. PUIS AVANCEZ. »

C'est le point de non-retour. Au-delà de cette porte, la campagne atteint sa conclusion — pour le meilleur ou pour le pire. Vos alliés rassemblés au fil des actes se tiennent derrière vous, prêts à rester ou à suivre. Le monde entier retient son souffle.

La Porte du Destin attend votre choix.`,
    mood: 'solennel, épique, point culminant de la campagne',
    music: 'Silence puis crescendo orchestral, thème principal de la campagne'
  },
  gmNotes: [
    {
      type: 'info',
      text: "C'est le point de non-retour officiel. Assurez-vous que les PJ ont eu le temps de se préparer : repos long, achats d'équipement, conversations avec les PNJ alliés. Une fois la porte franchie, pas de repos long possible dans le Nexus (repos courts seulement, et uniquement dans les Salles de Sceau si elles sont purifiées)."
    },
    {
      type: 'tip',
      text: "C'est le moment parfait pour les RP émotionnels : discours de motivation, adieux potentiels, promesses entre PJ. Laissez les joueurs avoir leur moment. Ce sera peut-être la dernière fois que certains personnages parlent à leurs alliés."
    },
    {
      type: 'warning',
      text: "Les alliés rassemblés (Lirael, Thessala, le Golem de la Forge, etc.) peuvent accompagner les PJ mais ne survivront pas tous. Chaque allié qui entre apporte un bonus mais attire aussi l'attention de Malachar. Maximum 2 alliés PNJ en plus du groupe principal."
    },
    {
      type: 'secret',
      text: "La Porte se souvient des choix passés. Si les PJ ont protégé les 4 Sceaux précédents, la Porte brille d'un or pur et les bénit à l'entrée (+2 aux sauvegardes pour tout le donjon). Si un ou plusieurs Sceaux ont été brisés ou affaiblis, la Porte est fissurée et aucune bénédiction n'est accordée."
    }
  ],
  skillChecks: [
    {
      skill: 'Perspicacité',
      dc: 16,
      success: "Vous percevez que la Porte est une création des Anciens Dieux — les mêmes qui ont créé les Sceaux. Elle est neutre, ni bienveillante ni hostile. Elle juge la détermination, pas la puissance.",
      failure: "La Porte est intimidante et incompréhensible. Vous ne percevez que sa puissance brute."
    },
    {
      skill: 'Arcanes',
      dc: 18,
      success: "Vous analysez la structure de la Porte : c'est un pont entre le Plan Matériel et le Demi-Plan du Nexus. Une fois à l'intérieur, les règles de la réalité sont... flexibles. La magie y est plus puissante — et plus imprévisible.",
      failure: "La magie de la Porte dépasse votre compréhension. C'est du divin, pas de l'arcane."
    }
  ],
  choices: [
    {
      id: 'choix-porte-1',
      prompt: "La Porte du Destin attend votre décision. C'est le point de non-retour.",
      options: [
        {
          label: "Franchir la Porte avec tous les alliés",
          description: "Entrer en force avec toute l'aide disponible",
          consequence: "Plus de puissance mais plus de cibles pour Malachar.",
          nextScene: 'nexus-2-corridor-epreuves'
        },
        {
          label: "Franchir la Porte en petit groupe (PJ seuls)",
          description: "Entrer discrètement, sans alliés",
          consequence: "Moins de ressources mais moins d'attention de l'ennemi.",
          nextScene: 'nexus-2-corridor-epreuves'
        },
        {
          label: "Prendre un dernier moment pour se préparer",
          description: "Dernières paroles, derniers préparatifs",
          consequence: "Le temps pour un dernier RP avant la fin. Aucun effet mécanique.",
          nextScene: 'nexus-2-corridor-epreuves'
        }
      ]
    }
  ],
  loot: [
    "Bénédiction de la Porte (+2 sauvegardes, tout le donjon, si 4 Sceaux protégés)",
    "Cristal de Retour (si tous les Sceaux protégés : permet UN retour au monde réel, usage unique d'urgence)"
  ],
  nextScenes: ['nexus-2-corridor-epreuves'],
  mapMovement: { from: 'plan-materiel', to: 'nexus-des-sceaux' }
};

// ============================================================================
// SALLE 2 : Le Corridor des Épreuves
// ============================================================================
const SCENE_CORRIDOR_EPREUVES: BookScene = {
  id: 'nexus-2-corridor-epreuves',
  sceneNumber: 2,
  title: "Le Corridor des Épreuves",
  type: 'exploration',
  location: "Corridor d'entrée, Nexus des Sceaux",
  locationId: 'nexus-corridor',
  estimatedMinutes: 30,
  readAloud: {
    text: `Au-delà de la Porte, le Nexus se révèle. Ce n'est pas un lieu physique — c'est un concept incarné. Un espace impossible où les cinq éléments des Sceaux convergent en un point unique. Les murs sont faits de cinq matériaux entrelacés : pierre dorée (Terre), cristal bleu (Mer), bois vivant (Forêt), obsidienne volcanique (Feu) et un matériau translucide et inconnu (le Cinquième Sceau, le Secret).

Le Corridor s'étend devant vous sur une centaine de mètres, large de dix. Mais il n'est pas vide — il est peuplé de visions. Des images fantomatiques jouent en boucle sur les murs : des scènes de votre voyage, rejouées comme dans un miroir du temps. Votre première rencontre avec les Spectres de Sol-Aureus. Le Dragon de Cristal. La Reine Araignée. Le Léviathan. Chaque épreuve que vous avez surmontée — ou échouée — est rejouée ici comme un rappel.

À intervalles réguliers, des portes scellées par les symboles des cinq Sceaux se dressent de part et d'autre du corridor. Chaque porte mène à une Salle de Sceau — un espace où le Sceau correspondant est ancré dans le Nexus. Pour atteindre Malachar, il faut traverser les cinq Salles de Sceau et les activer.

Au bout du corridor, visible mais lointaine, une arche de ténèbres pulse — la porte vers Malachar. Elle est verrouillée par cinq sceaux de lumière. Chaque Salle de Sceau activée en éteint un. Quand les cinq sont éteints, la porte s'ouvre.

Le premier choix : par quel Sceau commencer ?`,
    mood: 'solennel, récapitulatif, montée en puissance',
    music: 'Rappels des thèmes des 4 donjons précédents, crescendo'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le Corridor mène aux 5 Salles de Sceau (Terre, Mer, Forêt, Feu, Secret). L'ordre est libre. Chaque Salle est un défi différent (puzzle, combat, épreuve morale). Compléter une Salle renforce le Sceau correspondant et ouvre un verrou sur la porte de Malachar. Les 5 doivent être complétées."
    },
    {
      type: 'tip',
      text: "Les visions sur les murs réagissent aux PJ. Si un PJ touche sa propre vision, il reçoit un boost temporaire lié à cette épreuve (ex : toucher la vision du Dragon donne résistance froid 1h). Maximum 1 boost par PJ."
    },
    {
      type: 'warning',
      text: "Le Corridor est surveillé par des Sentinelles du Nexus — des constructions magiques neutres qui attaquent quiconque endommage le Nexus. Elles ne sont PAS hostiles par défaut. Seules les actions destructrices les provoquent."
    },
    {
      type: 'secret',
      text: "Le mur translucide (Cinquième Sceau) contient des visions d'un sixième Sceau — un Sceau que personne ne connaît, scellé dans un lieu que personne n'a jamais visité. C'est un foreshadowing pour une suite potentielle de la campagne."
    }
  ],
  skillChecks: [
    {
      skill: 'Arcanes',
      dc: 16,
      success: "Vous comprenez la structure du Nexus : c'est un amplificateur. Chaque Sceau activé rend les PJ plus puissants mais aussi plus visibles pour Malachar. Au dernier Sceau, Malachar saura exactement où vous êtes et ce que vous pouvez faire.",
      failure: "Le Nexus est au-delà de votre compréhension théorique. Vous ne percevez que sa puissance brute."
    },
    {
      skill: 'Perception',
      dc: 15,
      success: "Vous remarquez que les visions ne sont pas que décoratives — elles réagissent au toucher. Vous pouvez en tirer un bénéfice.",
      failure: "Les visions sont fascinantes mais intangibles. Rien de pratique à en tirer."
    }
  ],
  choices: [
    {
      id: 'choix-corridor-1',
      prompt: "Cinq portes de Sceau s'offrent à vous. Par laquelle commencez-vous ?",
      options: [
        {
          label: "Salle du Sceau de Terre (puzzle)",
          description: "La porte dorée aux runes de pierre",
          consequence: "Un puzzle de logique et de force.",
          nextScene: 'nexus-3-sceau-terre'
        },
        {
          label: "Salle du Sceau de Mer (combat aquatique)",
          description: "La porte de cristal bleu",
          consequence: "Un combat dans l'eau contre les gardiens marins.",
          nextScene: 'nexus-4-sceau-mer'
        },
        {
          label: "Salle du Sceau de Forêt (nature vs corruption)",
          description: "La porte de bois vivant",
          consequence: "Une épreuve de purification et de volonté naturelle.",
          nextScene: 'nexus-5-sceau-foret'
        },
        {
          label: "Salle du Sceau de Feu (épreuve de volonté)",
          description: "La porte d'obsidienne volcanique",
          consequence: "Une épreuve mentale dans un enfer de flammes.",
          nextScene: 'nexus-6-sceau-feu'
        },
        {
          label: "Salle du Sceau Secret (révélation)",
          description: "La porte translucide et mystérieuse",
          consequence: "Le Sceau que personne ne connaissait. La vérité sur Malachar.",
          nextScene: 'nexus-7-sceau-secret'
        }
      ]
    }
  ],
  loot: [
    "Boost de Vision (1 par PJ, temporaire, lié à un donjon précédent)",
    "Fragment de Mur du Nexus (composante de sort de niveau 9, valeur : 5000 po)"
  ],
  nextScenes: ['nexus-3-sceau-terre', 'nexus-4-sceau-mer', 'nexus-5-sceau-foret', 'nexus-6-sceau-feu', 'nexus-7-sceau-secret'],
  previousScene: 'nexus-1-porte-destin'
};

// ============================================================================
// SALLE 3 : Salle du Sceau de Terre (Puzzle)
// ============================================================================
const SCENE_SCEAU_TERRE: BookScene = {
  id: 'nexus-3-sceau-terre',
  sceneNumber: 3,
  title: "Salle du Sceau de Terre",
  type: 'exploration',
  location: "Chambre du Sceau de Terre, Nexus",
  locationId: 'nexus-sceau-terre',
  estimatedMinutes: 30,
  readAloud: {
    text: `La porte dorée s'ouvre sur une caverne qui rappelle le cœur de Karak-Zhul — mais transcendée, perfectionnée, idéalisée. Les murs sont de pierre vivante qui se remodèle lentement, et le sol est un damier de blocs de granit, de basalte et de marbre qui flottent dans le vide comme des pièces d'échecs en attente d'un joueur.

Au centre de la salle, le Sceau de Terre brille — un glyphe de montagne d'un or profond, suspendu au-dessus d'un gouffre sans fond. Le Sceau est intact si vous l'avez protégé dans le Donjon 2, ou fissuré si vous avez échoué. Dans les deux cas, il doit être activé — reconnecté au Nexus.

Le puzzle est physique : les blocs flottants forment un chemin potentiel vers le Sceau, mais ils sont dans le désordre. Chaque bloc porte un symbole nain — les mêmes que ceux de la Forge de Karak-Zhul. Il faut les réarranger en ordre correct pour créer un pont stable vers le Sceau.

La difficulté : les blocs réagissent au poids. Marcher sur un mauvais bloc le fait chuter dans le vide. Et le vide n'a pas de fond.`,
    mood: 'puzzle monumental, vertige, logique naine',
    music: 'Thème de Karak-Zhul transcendé, percussions de pierre'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Le puzzle : 12 blocs doivent être ordonnés selon les runes naines de la création (Fondation → Construction → Renforcement → Achèvement). Un PJ qui a étudié les runes de Karak-Zhul (Donjon 2) a un avantage. Intelligence DD 16 pour résoudre, ou Force DD 18 pour déplacer les blocs manuellement."
    },
    {
      type: 'tip',
      text: "Si les PJ ont le Marteau Runique de Karak-Zhul (Donjon 2), il résonne en présence des bons blocs — un guide sonore qui réduit le DD de 4."
    },
    {
      type: 'warning',
      text: "Tomber d'un bloc = chute dans le vide. Dextérité DD 16 pour se rattraper au bord. Échec = chute de 30m (10d6 contondant) avant qu'un courant magique ne ramène le PJ au bord de la salle. Douloureux mais pas mortel (le Nexus ne tue pas dans les salles de puzzle)."
    },
    {
      type: 'secret',
      text: "Si le Roi Durin a été apaisé (Donjon 2), son fantôme apparaît brièvement pour guider les PJ : « La montagne se construit de bas en haut, du plus dur au plus tendre. Commencez par le granit, finissez par le marbre. » Cet indice résout le puzzle automatiquement."
    }
  ],
  skillChecks: [
    {
      skill: 'Intelligence',
      dc: 16,
      success: "Vous déchiffrez l'ordre des runes. Le pont se forme dans un grondement satisfaisant de pierre qui s'emboîte.",
      failure: "Un bloc cède sous votre poids ! Dextérité DD 16 pour se rattraper."
    },
    {
      skill: 'Force',
      dc: 18,
      success: "Vous déplacez les blocs par la force brute, les réarrangeant jusqu'à ce que le pont tienne.",
      failure: "Le bloc que vous poussez bascule dans le mauvais sens. Le puzzle se complexifie."
    }
  ],
  choices: [
    {
      id: 'choix-terre-1',
      prompt: "Le Sceau de Terre attend d'être activé.",
      options: [
        {
          label: "Résoudre le puzzle par la logique",
          description: "Déchiffrer les runes et réarranger les blocs",
          consequence: "Solution intellectuelle.",
          skillCheck: {
            skill: 'Intelligence',
            dc: 16,
            success: "Pont formé ! Le Sceau de Terre s'active dans une pulsation dorée.",
            failure: "Un bloc tombe. Vous devez recommencer avec un malus."
          },
          nextScene: 'nexus-2-corridor-epreuves'
        },
        {
          label: "Utiliser le Marteau de Karak-Zhul",
          description: "Le marteau guide vers les bons blocs (DD réduit)",
          consequence: "Plus facile si vous avez l'objet du Donjon 2.",
          nextScene: 'nexus-2-corridor-epreuves'
        },
        {
          label: "Sauter directement vers le Sceau",
          description: "Ignorer le puzzle et bondir sur les blocs",
          consequence: "Acrobatie DD 18. Spectaculaire mais risqué.",
          skillCheck: {
            skill: 'Acrobatie',
            dc: 18,
            success: "Vous bondissez de bloc en bloc comme un chat ! Le Sceau est atteint.",
            failure: "Vous tombez ! 10d6 contondant mais le Nexus vous ramène au bord."
          },
          nextScene: 'nexus-2-corridor-epreuves'
        }
      ]
    }
  ],
  loot: [
    "Sceau de Terre Activé (verrou 1/5 ouvert sur la porte de Malachar)",
    "Bénédiction de la Terre (+2 Force temporaire, dure jusqu'au combat final)",
    "Pierre de Fondation (gemme, absorbe 20 dégâts 1/jour, valeur : 2000 po)"
  ],
  nextScenes: ['nexus-2-corridor-epreuves'],
  previousScene: 'nexus-2-corridor-epreuves'
};

// ============================================================================
// SALLES 4-7 : Condensées pour les 4 Sceaux restants
// ============================================================================
const SCENE_SCEAU_MER: BookScene = {
  id: 'nexus-4-sceau-mer',
  sceneNumber: 4,
  title: "Salle du Sceau de Mer",
  type: 'combat',
  location: "Chambre du Sceau de Mer, Nexus",
  locationId: 'nexus-sceau-mer',
  estimatedMinutes: 35,
  readAloud: {
    text: `La porte de cristal bleu s'ouvre sur un océan intérieur — une sphère d'eau de trente mètres de diamètre, parfaitement sphérique, flottant dans le vide du Nexus. Le Sceau de Mer brille en son centre comme un phare sous-marin.

L'eau est habitée. Des gardiens marins — des élémentaires d'eau pure, non corrompus cette fois — patrouillent autour du Sceau. Ils ne sont pas hostiles par nature, mais ils ne laisseront personne toucher le Sceau sans prouver sa valeur martiale. C'est une épreuve de combat aquatique.

Le défi : vaincre ou soumettre les trois Chevaliers de la Marée — des élémentaires d'eau en forme de guerriers, armés de tridents de glace et de boucliers de corail — dans un combat tridimensionnel au cœur d'une sphère d'eau flottante.

Si le Léviathan a été pacifié (Donjon 4), une ombre massive traverse la sphère d'eau — un rappel du Pacte. Les Chevaliers de la Marée saluent les PJ qui portent la marque du Pacte avec respect, et l'épreuve est moins violente.`,
    mood: 'combat aquatique épique, fluidité, puissance',
    music: 'Thème de Marethys transcendé, combat sous-marin héroïque'
  },
  gmNotes: [
    {
      type: 'info',
      text: "3 Chevaliers de la Marée (CR 8 chacun). Combat entièrement sous-marin dans une sphère 3D. Si le Pacte du Léviathan est actif, les Chevaliers commencent avec un désavantage sur leurs 2 premières attaques (ils respectent le Pacte)."
    },
    {
      type: 'tip',
      text: "Le Trident de Thalassa (Donjon 4) est l'arme parfaite ici. Il confère avantage sur toutes les attaques dans la sphère d'eau et les Chevaliers le reconnaissent comme un symbole d'autorité (-2 à leur moral)."
    },
    {
      type: 'secret',
      text: "Les Chevaliers peuvent être soumis sans être tués (Intimidation DD 18 après les avoir réduits à 25% PV). Un Chevalier soumis devient un allié temporaire pour le combat final contre Malachar."
    },
    {
      type: 'warning',
      text: "Le combat 3D sous-marin est désorientant. Les PJ sans vitesse de nage ou vol subissent un désavantage sur toutes leurs attaques et les Chevaliers ont un avantage constant."
    }
  ],
  encounter: {
    name: "Les Chevaliers de la Marée",
    enemies: [
      {
        name: "Chevalier de la Marée",
        hp: 90,
        atk: 10,
        ac: 17,
        cr: 8,
        abilities: [
          "Trident de Glace : +10, 2d8+5 perçant + 2d6 froid",
          "Bouclier de Corail : Réaction, +3 CA, absorbe 10 dégâts 1/round",
          "Vague de Choc : (Recharge 5-6) Sphère de 6m, 4d8 contondant + repoussé 6m, Force DD 17",
          "Forme Aquatique : Immunité contondant non-magique, vitesse de nage 18m",
          "Coordination : Les Chevaliers partagent un bonus de +2 attaque quand ils sont à 3m les uns des autres"
        ]
      },
      {
        name: "Chevalier de la Marée (×2 supplémentaires)",
        hp: 90,
        atk: 10,
        ac: 17,
        cr: 8,
        abilities: ["Identique au premier Chevalier"]
      }
    ],
    terrain: [
      "Sphère d'eau (30m) : combat 3D, pas de sol ni de plafond",
      "Sceau de Mer (centre) : zone de lumière, +2 CA/sauvegardes dans 3m",
      "Courants internes : Athlétisme DD 13 chaque round pour rester stable, sinon déplacé de 3m aléatoirement"
    ],
    tactics: "Les Chevaliers combattent en triangle, utilisant Coordination. Ils alternent entre mêlée et Vague de Choc pour séparer les PJ. Ils défendent le Sceau en priorité.",
    loot: [
      "Sceau de Mer Activé (verrou 2/5)",
      "Bénédiction de la Mer Renforcée (+2 Constitution temporaire, dure jusqu'au combat final)",
      "Trident de la Marée (+2, 2d8+2 + 2d6 froid, fonctionne parfaitement sous l'eau)"
    ]
  },
  skillChecks: [
    {
      skill: 'Intimidation',
      dc: 18,
      success: "Le Chevalier s'agenouille. « Vous êtes dignes. Je servirai. » Un allié de plus pour le combat final.",
      failure: "Le Chevalier redouble d'efforts. Il ne se rendra pas facilement."
    }
  ],
  choices: [
    {
      id: 'choix-mer-1',
      prompt: "Les Chevaliers de la Marée gardent le Sceau.",
      options: [
        {
          label: "Combattre les Chevaliers",
          description: "Vaincre les gardiens par la force",
          consequence: "Combat sous-marin en 3D.",
          nextScene: 'nexus-2-corridor-epreuves'
        },
        {
          label: "Soumettre les Chevaliers après les avoir affaiblis",
          description: "Réduire puis intimider pour gagner des alliés",
          consequence: "Plus long mais ajoute un allié pour le boss.",
          nextScene: 'nexus-2-corridor-epreuves'
        }
      ]
    }
  ],
  loot: ["Sceau de Mer Activé", "Bénédiction de la Mer", "Trident de la Marée (+2)"],
  nextScenes: ['nexus-2-corridor-epreuves'],
  previousScene: 'nexus-2-corridor-epreuves'
};

const SCENE_SCEAU_FORET: BookScene = {
  id: 'nexus-5-sceau-foret',
  sceneNumber: 5,
  title: "Salle du Sceau de Forêt",
  type: 'exploration',
  location: "Chambre du Sceau de Forêt, Nexus",
  locationId: 'nexus-sceau-foret',
  estimatedMinutes: 30,
  readAloud: {
    text: `La porte de bois vivant s'ouvre sur un jardin paradisiaque — et un jardin mourant. Deux réalités coexistent dans cette salle : la moitié gauche est un éden de verdure parfaite, d'arbres géants et de fleurs éternelles. La moitié droite est un cauchemar de corruption — arbres morts, sol toxique, champignons nécrotiques et spores empoisonnées.

Le Sceau de Forêt brille sur la ligne de démarcation — exactement entre la vie et la mort. Pour l'activer, il faut faire reculer la corruption et faire avancer la vie, poussant le Sceau entièrement dans la zone vivante.

L'épreuve est un bras de fer écologique : chaque action des PJ en faveur de la vie (planter une graine, purifier une zone, canaliser de l'énergie vitale) pousse le Sceau vers la vie. Mais la corruption résiste — des Blighters (druides corrompus spectraux) tentent de faire avancer la mort. Chaque round, la corruption gagne 1 mètre. Les PJ doivent la repousser de 10 mètres pour activer le Sceau.

Si les PJ ont sauvé Yggdrasylve (Donjon 3), le côté vivant est plus fort et la corruption ne gagne que 1 mètre tous les 2 rounds.`,
    mood: 'vie vs mort, urgence écologique, combat symbolique',
    music: 'Thème d\'Yggdrasylve transcendé, nature combattante'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Mécanique : 10 « étapes » de progression. Chaque réussite (Nature DD 15, Religion DD 15, ou utilisation d'une Graine du Monde) avance la vie d'1 étape. Chaque round sans progression, la corruption avance d'1 étape. 2 Blighters (CR 6) sabotent les efforts. Les PJ doivent combattre ET purifier simultanément."
    },
    {
      type: 'tip',
      text: "Les Graines du Monde (Donjon 3) sont l'outil parfait : chaque graine plantée avance la vie de 3 étapes au lieu de 1. C'est pour cela qu'on les a données aux PJ."
    },
    {
      type: 'secret',
      text: "Si le côté vie atteint 10/10, le jardin entier revit ET libère un esprit de Sylvana qui bénit les PJ : sort Guérison de Masse gratuit et +2 sagesse temporaire."
    },
    {
      type: 'warning',
      text: "Si la corruption atteint 10/10, le Sceau est corrompu. Il s'active quand même mais Malachar gagne un bonus dans le combat final (+2 CA, 30 PV supplémentaires). La campagne continue mais en mode difficile."
    }
  ],
  encounter: {
    name: "Blighters — Druides Corrompus Spectraux",
    enemies: [
      {
        name: "Blighter",
        hp: 68,
        atk: 9,
        ac: 15,
        cr: 6,
        abilities: [
          "Toucher Flétri : +9, 3d8 nécrotique, les plantes dans 1,5m meurent",
          "Nuage de Spores : (Recharge 5-6) Sphère 6m, 3d6 poison + 2d6 nécrotique, Constitution DD 16",
          "Anti-Vie : Annule 1 action de purification des PJ par round",
          "Résistance Spectrale : Résistance aux dégâts non-magiques"
        ]
      },
      {
        name: "Blighter (×1 supplémentaire)",
        hp: 68,
        atk: 9,
        ac: 15,
        cr: 6,
        abilities: ["Identique au premier Blighter"]
      }
    ],
    terrain: [
      "Zone vivante : soigne 1d4 PV/round aux PJ dedans",
      "Zone corrompue : 1d6 nécrotique/round aux PJ dedans",
      "Ligne de démarcation : position du Sceau, aucun effet"
    ],
    tactics: "Un Blighter combat les PJ directement. L'autre utilise Anti-Vie pour annuler les purifications. Ils se relaient toutes les 2 rounds.",
    loot: [
      "Sceau de Forêt Activé (verrou 3/5)",
      "Bénédiction de la Forêt (+2 Sagesse temporaire)",
      "Bourgeon de Renaissance (1/jour, sort Résurrection avec composante gratuite)"
    ]
  },
  skillChecks: [
    {
      skill: 'Nature',
      dc: 15,
      success: "Vous purifiez une zone. La vie avance d'1 étape. Les fleurs s'ouvrent sur votre passage.",
      failure: "La corruption résiste. L'étape n'avance pas ce round."
    }
  ],
  choices: [
    {
      id: 'choix-foret-1',
      prompt: "La bataille entre vie et mort fait rage. Votre stratégie ?",
      options: [
        {
          label: "Combattre les Blighters en priorité",
          description: "Éliminer l'opposition pour purifier en paix",
          consequence: "Tactique offensive.",
          nextScene: 'nexus-2-corridor-epreuves'
        },
        {
          label: "Purifier en ignorant les Blighters",
          description: "Utiliser les Graines du Monde pour une avancée rapide",
          consequence: "Risqué mais potentiellement plus rapide.",
          nextScene: 'nexus-2-corridor-epreuves'
        },
        {
          label: "Se diviser : combattants + purificateurs",
          description: "Répartir les rôles dans le groupe",
          consequence: "La stratégie optimale si bien coordonnée.",
          nextScene: 'nexus-2-corridor-epreuves'
        }
      ]
    }
  ],
  loot: ["Sceau de Forêt Activé", "Bénédiction de la Forêt", "Bourgeon de Renaissance"],
  nextScenes: ['nexus-2-corridor-epreuves'],
  previousScene: 'nexus-2-corridor-epreuves'
};

const SCENE_SCEAU_FEU: BookScene = {
  id: 'nexus-6-sceau-feu',
  sceneNumber: 6,
  title: "Salle du Sceau de Feu",
  type: 'choice',
  location: "Chambre du Sceau de Feu, Nexus",
  locationId: 'nexus-sceau-feu',
  estimatedMinutes: 30,
  readAloud: {
    text: `La porte d'obsidienne s'ouvre sur un enfer. Un lac de lave remplit la salle, chauffé à blanc par un soleil miniature suspendu au plafond — un noyau de feu pur qui irradie une chaleur si intense que l'air tremble et se distord. Le Sceau de Feu brille au centre du lac, sur un îlot de basalte à peine assez grand pour une personne.

Mais l'épreuve n'est pas de traverser la lave. L'épreuve est de ne PAS bouger.

Dès que vous entrez, la voix du Nexus résonne : « Le feu éprouve la volonté. Seuls ceux qui résistent à la peur, à la douleur et à la tentation peuvent activer le Sceau de Feu. Restez immobiles. Endurez. Prouvez votre détermination. »

Le sol sous vos pieds commence à chauffer. Pas assez pour blesser — pas encore. Mais la chaleur monte. Lentement, inexorablement. En même temps, des illusions apparaissent : vos pires peurs, vos plus grands regrets, vos tentations les plus profondes. Tout est conçu pour vous faire bouger, fuir, abandonner.

L'épreuve dure 5 rounds. Si au moins un PJ reste immobile pendant 5 rounds, le Sceau s'active. La chaleur atteint son pic — insupportable mais pas mortelle — puis se dissipe dans un flash de lumière purificatrice.`,
    mood: 'épreuve mentale, douleur, détermination pure',
    music: 'Montée de tension constante, feu rugissant, silence intérieur'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Mécanique : 5 rounds. Chaque round, chaque PJ fait un jet de Sagesse avec un DD croissant : Round 1 = DD 14, Round 2 = DD 15, Round 3 = DD 16, Round 4 = DD 17, Round 5 = DD 18. Échec = le PJ bouge et subit 2d6 dégâts de feu. Il peut réessayer le round suivant. Au moins 1 PJ doit réussir les 5 rounds."
    },
    {
      type: 'tip',
      text: "Les illusions sont personnalisées : utilisez les backgrounds des PJ. Le guerrier voit sa famille en danger. Le mage voit un sortilège interdit qui résoudrait tout. Le clerc voit son dieu lui ordonner de fuir. C'est un moment de RP intense."
    },
    {
      type: 'secret',
      text: "Un PJ qui a fait preuve de volonté exceptionnelle au cours de la campagne (résisté à la corruption, gardé un serment, sacrifié quelque chose de personnel) a un avantage sur tous les jets de cette épreuve. Récompensez la cohérence du RP."
    },
    {
      type: 'warning',
      text: "Ne tuez personne ici. Les dégâts de l'épreuve sont douloureux mais pas mortels. Si un PJ tombe à 0 PV, il s'effondre mais la chaleur cesse pour lui — il est simplement éliminé de l'épreuve, pas en danger de mort."
    }
  ],
  skillChecks: [
    {
      skill: 'Sagesse',
      dc: 18,
      success: "Vous résistez aux 5 rounds d'épreuve. Le feu vous purifie. Le Sceau de Feu s'active dans une explosion de lumière dorée.",
      failure: "L'illusion est trop réaliste. Vous bougez, rompant votre immobilité. 2d6 feu. Réessayez au round suivant."
    }
  ],
  choices: [
    {
      id: 'choix-feu-1',
      prompt: "L'épreuve de volonté commence. Comment l'affrontez-vous ?",
      options: [
        {
          label: "Endurer stoïquement",
          description: "Rester immobile par pure volonté",
          consequence: "La voie classique. 5 jets de Sagesse croissants.",
          nextScene: 'nexus-2-corridor-epreuves'
        },
        {
          label: "Méditer pour ignorer les illusions",
          description: "Se concentrer sur son souffle, ignorer le monde",
          consequence: "Avantage au round 1, puis normal.",
          nextScene: 'nexus-2-corridor-epreuves'
        },
        {
          label: "S'encourager mutuellement",
          description: "Se soutenir verbalement entre PJ",
          consequence: "Chaque PJ peut donner +2 au jet d'un allié 1/épreuve.",
          nextScene: 'nexus-2-corridor-epreuves'
        }
      ]
    }
  ],
  loot: [
    "Sceau de Feu Activé (verrou 4/5)",
    "Bénédiction du Feu (+2 Charisme temporaire, résistance feu, dure jusqu'au combat final)",
    "Flamme Intérieure (capacité : 1/jour, immunité peur pendant 1 minute)"
  ],
  nextScenes: ['nexus-2-corridor-epreuves'],
  previousScene: 'nexus-2-corridor-epreuves'
};

const SCENE_SCEAU_SECRET: BookScene = {
  id: 'nexus-7-sceau-secret',
  sceneNumber: 7,
  title: "Salle du Sceau Secret — La Révélation",
  type: 'revelation',
  location: "Chambre du Sceau Secret, Nexus",
  locationId: 'nexus-sceau-secret',
  estimatedMinutes: 30,
  readAloud: {
    text: `La porte translucide ne s'ouvre pas — elle se dissout, comme un rêve qui s'achève. Derrière, il n'y a pas de salle. Il y a un souvenir.

Vous êtes debout dans un paysage qui n'existe plus — Aethelgard avant les Sceaux, avant Malachar, avant la Chute. Le ciel est d'un bleu impossible, l'herbe est plus verte que le vert, et la lumière est celle d'un monde qui n'a jamais connu l'ombre.

Et devant vous, deux silhouettes. L'une est lumineuse — un être de pure énergie créatrice, dont la présence inspire la paix, la joie et l'espoir. L'autre est sombre — pas maléfique, mais différente. Une ombre qui n'est pas l'absence de lumière mais une lumière alternative, plus ancienne, plus profonde.

Le Sceau Secret n'est pas un Sceau comme les autres. C'est la vérité. La vérité que personne ne connaît.

Malachar n'est pas un démon. Malachar n'est pas un ennemi envahisseur. Malachar est le jumeau de la lumière qui a créé Aethelgard. Le Créateur et le Destructeur sont deux faces de la même pièce. Et les Sceaux ne l'emprisonnent pas — ils le séparent de son autre moitié.

La voix du souvenir résonne : « La Destruction est nécessaire pour la Création. L'Hiver permet le Printemps. La Mort nourrit la Vie. Séparer les deux, c'est condamner le monde à l'immobilité — ou à l'effondrement. Le choix final n'est pas de vaincre Malachar. C'est de choisir comment le monde continue. »

Le Sceau Secret s'active simplement en comprenant. La compréhension EST l'épreuve.`,
    mood: 'transcendant, philosophique, révélation cosmique',
    music: 'Silence puis harmonie complète, thème principal en majeur'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Cette salle est LE twist de la campagne. Malachar n'est pas un monstre à abattre — c'est un aspect du cosmos. Les 4 fins possibles du donjon dépendent de cette compréhension : (1) Détruire Malachar (déséquilibre le monde), (2) Libérer Malachar (chaos mais équilibre), (3) Fusionner les deux (création d'un nouveau monde), (4) Renforcer les Sceaux (statu quo, reporte le problème)."
    },
    {
      type: 'lore',
      text: "Le Créateur et le Destructeur étaient un seul être avant le début des temps. La séparation a créé Aethelgard mais a aussi créé le conflit éternel. Les Anciens Dieux ont créé les Sceaux non pas pour emprisonner le mal mais pour maintenir la séparation — car la réunion des deux pourrait détruire ou recréer le monde."
    },
    {
      type: 'tip',
      text: "C'est un moment de RP pur. Pas de jet de dés, pas de combat. Laissez les joueurs absorber la révélation et discuter entre eux de ce que cela signifie pour leur choix final. C'est le cœur émotionnel et philosophique de la campagne."
    },
    {
      type: 'secret',
      text: "Le Sceau Secret est le Sceau de l'Équilibre. Il n'emprisonne rien — il mesure. Si les PJ ont protégé les 4 autres Sceaux, le Secret leur offre le choix de la Fin. S'ils ont échoué, les options se réduisent."
    }
  ],
  skillChecks: [
    {
      skill: 'Perspicacité',
      dc: 15,
      success: "Vous comprenez la vérité dans toute sa profondeur. Malachar n'est pas le mal — il est l'autre face de la médaille. Le conflit n'est pas entre le bien et le mal, mais entre l'ordre et le changement.",
      failure: "La révélation est troublante mais vous ne saisissez pas toutes ses implications. Vous avez besoin de temps pour digérer."
    }
  ],
  choices: [
    {
      id: 'choix-secret-1',
      prompt: "La vérité est révélée. Le Sceau Secret s'active par la compréhension.",
      options: [
        {
          label: "Accepter la vérité",
          description: "Comprendre et intégrer la révélation",
          consequence: "Le Sceau s'active. Les 5 verrous de la porte de Malachar sont ouverts.",
          nextScene: 'nexus-2-corridor-epreuves'
        },
        {
          label: "Rejeter la vérité",
          description: "Refuser d'accepter que Malachar puisse être autre chose qu'un monstre",
          consequence: "Le Sceau s'active quand même (la compréhension existe, même refusée) mais les PJ perdent l'option de la Fin 3 (Fusion).",
          nextScene: 'nexus-2-corridor-epreuves'
        }
      ]
    }
  ],
  loot: [
    "Sceau Secret Activé (verrou 5/5 — la porte de Malachar est ouverte)",
    "Connaissance de la Vérité (nécessaire pour les 4 fins)",
    "Cristal de l'Équilibre (focaliseur universel +3, amplifie tous les types de magie, valeur : inestimable)"
  ],
  nextScenes: ['nexus-2-corridor-epreuves'],
  previousScene: 'nexus-2-corridor-epreuves'
};

// ============================================================================
// SALLE 8 : Galerie des Héros Déchus (Mini-Boss)
// ============================================================================
const SCENE_HEROS_DECHUS: BookScene = {
  id: 'nexus-8-heros-dechus',
  sceneNumber: 8,
  title: "La Galerie des Héros Déchus",
  type: 'combat',
  location: "Galerie mémoriale, Nexus des Sceaux",
  locationId: 'nexus-galerie-heros',
  estimatedMinutes: 35,
  readAloud: {
    text: `Les cinq Sceaux activés, la porte de ténèbres s'ouvre. Mais avant d'atteindre Malachar, un dernier obstacle se dresse — la Galerie des Héros Déchus.

C'est un couloir bordé de statues de cristal — pas n'importe quelles statues. Ce sont les héros qui ont tenté de vaincre Malachar avant vous. Des centaines. Des milliers. Chaque statue est un aventurier figé dans le cristal, son expression trahissant la terreur ou la détermination de son dernier instant.

Et cinq de ces statues s'animent. Ce ne sont pas des inconnus — ce sont des versions alternatives de VOUS. Des PJ d'une autre ligne temporelle, d'un autre essai, qui ont échoué là où vous espérez réussir. Ils portent votre visage mais leurs yeux sont vides, animés par la volonté de Malachar.

C'est le dernier test avant le boss. Vaincre vos doubles — qui connaissent vos capacités, vos faiblesses, vos tactiques — pour prouver que vous êtes différents. Que cette fois, l'histoire sera différente.

Les Doubles se lèvent. Ils ne parlent pas. Ils n'ont pas besoin de mots. Ils attaquent.`,
    mood: 'miroir sombre, combat contre soi-même, détermination',
    music: 'Thème héroïque en mineur, combat tragique'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Les Doubles ont les stats de base des PJ au niveau 14 (pas 16-20 — ils sont les PJ d'AVANT, moins expérimentés). Ils n'ont pas les objets magiques des PJ actuels mais ont les mêmes capacités de classe. C'est un combat difficile mais gérable car les PJ ont plus de ressources."
    },
    {
      type: 'tip',
      text: "Les Doubles utilisent les tactiques que les PJ utilisaient au début de la campagne — pas celles qu'ils ont développées depuis. Un groupe qui a évolué tactiquement aura un avantage. Récompensez la croissance des joueurs."
    },
    {
      type: 'warning',
      text: "Les Doubles ne meurent pas de manière classique — quand ils atteignent 0 PV, ils se cristallisent et retournent en statues. Ils ne peuvent pas être ressuscités ou récupérés. C'est un combat triste, pas triomphant."
    },
    {
      type: 'secret',
      text: "Un PJ qui refuse de combattre son Double et tente la compassion (Persuasion DD 20) peut le « réveiller » brièvement. Le Double prononce un seul mot d'avertissement sur Malachar — un indice pour le combat final. Puis il se cristallise volontairement."
    }
  ],
  encounter: {
    name: "Les Doubles — Héros Déchus",
    enemies: [
      {
        name: "Double du Guerrier",
        hp: 85,
        atk: 9,
        ac: 17,
        cr: 7,
        abilities: [
          "Épée du Destin : +9, 2d8+5 tranchant",
          "Action Bonus : Attaque supplémentaire 1/round",
          "Résilience : Avantage sur les jets de sauvegarde de Constitution",
          "Miroir Tactique : Connaît les tactiques du PJ guerrier (pas d'attaques de surprise possibles)"
        ]
      },
      {
        name: "Double du Mage",
        hp: 55,
        atk: 10,
        ac: 14,
        cr: 7,
        abilities: [
          "Sorts de niveau 7 maximum",
          "Bouclier Magique : Réaction, +5 CA",
          "Contre-sort automatique (niveau 4 et inférieur)",
          "Miroir Arcanique : Connaît le répertoire de sorts du PJ mage"
        ]
      },
      {
        name: "Double du Soigneur",
        hp: 70,
        atk: 8,
        ac: 16,
        cr: 7,
        abilities: [
          "Masse Sacrée : +8, 2d6+4 contondant + 1d8 radiant",
          "Soin de groupe : 3d8+5 PV à tous les Doubles dans 9m (2/combat)",
          "Renvoi des vivants : Comme Renvoi des morts-vivants mais affecte les vivants (Sagesse DD 16)",
          "Miroir Divin : Connaît les sorts du PJ soigneur"
        ]
      },
      {
        name: "Double du Rôdeur",
        hp: 65,
        atk: 10,
        ac: 15,
        cr: 7,
        abilities: [
          "Arc du Crépuscule : +10, 2d8+4 perçant (portée 30m)",
          "Marque du Chasseur : Cible marquée, +1d8 dégâts",
          "Esquive Instinctive : Réaction, moitié dégâts sur une attaque",
          "Miroir Sauvage : Connaît les points faibles du PJ rôdeur"
        ]
      }
    ],
    terrain: [
      "Galerie longue (30m × 10m) : bon pour les combats à distance",
      "Statues de cristal : couverture partielle, destructibles (20 PV), explosion si détruites (2d6 force dans 3m)",
      "Sol de marbre : terrain normal, glissant si mouillé"
    ],
    tactics: "Les Doubles utilisent les tactiques de base des PJ au niveau 14 : le Guerrier en première ligne, le Mage en support, le Soigneur en retrait, le Rôdeur en flanc. Ils sont coordonnés mais prévisibles pour des PJ qui ont évolué.",
    loot: [
      "Fragments de Cristal Héroïque (×4, chacun amplifie un sort de la classe correspondante, valeur : 1000 po chacun)",
      "Mémoire des Déchus (vision : montre la faiblesse de Malachar dans le combat final — son cœur est son point faible, pas sa tête)"
    ]
  },
  skillChecks: [
    {
      skill: 'Persuasion',
      dc: 20,
      success: "Votre Double vous regarde avec vos propres yeux. Un éclair de lucidité. Il murmure : « Son cœur... visez son cœur... pas sa tête... » Puis il se cristallise.",
      failure: "Le Double attaque sans hésitation. Il n'y a plus de personne derrière ces yeux vides."
    }
  ],
  choices: [
    {
      id: 'choix-doubles-1',
      prompt: "Vos Doubles se dressent devant vous.",
      options: [
        {
          label: "Combattre sans merci",
          description: "Ils ne sont pas vous — juste des ombres",
          consequence: "Combat direct et efficace.",
          nextScene: 'nexus-9-antichambre'
        },
        {
          label: "Tenter la compassion avant le combat",
          description: "Essayer de réveiller vos Doubles",
          consequence: "Chance d'obtenir un indice crucial sur Malachar.",
          skillCheck: {
            skill: 'Persuasion',
            dc: 20,
            success: "Un indice vital obtenu. Le combat commence mais avec un avantage moral.",
            failure: "Pas de réponse. Le combat commence normalement."
          },
          nextScene: 'nexus-9-antichambre'
        }
      ]
    }
  ],
  loot: ["4 Fragments de Cristal Héroïque (1000 po chacun)", "Mémoire des Déchus (indice boss)"],
  nextScenes: ['nexus-9-antichambre'],
  previousScene: 'nexus-2-corridor-epreuves'
};

// ============================================================================
// SALLE 9 : Antichambre de Malachar
// ============================================================================
const SCENE_ANTICHAMBRE: BookScene = {
  id: 'nexus-9-antichambre',
  sceneNumber: 9,
  title: "L'Antichambre de Malachar — Préparation Finale",
  type: 'rest',
  location: "Antichambre, Nexus des Sceaux",
  locationId: 'nexus-antichambre',
  estimatedMinutes: 20,
  readAloud: {
    text: `Au-delà de la Galerie, un espace de calme absolu. Une salle circulaire, vide, silencieuse, baignée d'une lumière douce qui n'a pas de source. C'est le dernier refuge avant la tempête — l'Antichambre de Malachar.

Les murs sont lisses et purs — ni pierre, ni bois, ni métal. Juste de la lumière solidifiée. Au sol, cinq cercles de protection brillent des couleurs des cinq Sceaux, formant un pentagramme de puissance. Se tenir au centre du pentagramme restaure les forces et apaise l'esprit.

Au fond de la salle, une unique porte. Pas de runes, pas d'inscriptions, pas de décoration. Juste une porte noire, opaque, qui absorbe la lumière. Derrière cette porte, Malachar attend. Vous le sentez — une présence qui fait vibrer l'air, un poids sur votre conscience, un murmure à la limite de l'audible qui dit : « Enfin. Venez. »

C'est votre dernier moment de répit. Votre dernière chance de vous préparer, de vous soigner, de vous parler. Au-delà de cette porte, le destin du monde se joue.`,
    mood: 'calme avant la tempête, préparation, gravité',
    music: 'Silence, battement de cœur, murmure lointain'
  },
  gmNotes: [
    {
      type: 'info',
      text: "Zone de repos court OBLIGATOIRE. Les PJ récupèrent toutes leurs capacités de repos court. Le pentagramme restaure aussi 50% des PV maximum et supprime tous les états négatifs (empoisonné, effrayé, etc.). C'est la préparation finale."
    },
    {
      type: 'tip',
      text: "C'est le moment de la dernière conversation de RP. Les serments, les promesses, les adieux potentiels. Ce moment est souvent l'un des plus mémorables d'une campagne. Ne le précipitez pas."
    },
    {
      type: 'secret',
      text: "Le pentagramme amplifie un sort par PJ : le prochain sort lancé par chaque PJ après avoir quitté l'Antichambre est maximisé (dégâts ou soins max, pas de jets). C'est un avantage énorme pour le début du combat."
    },
    {
      type: 'warning',
      text: "Malachar est conscient des PJ. Il les laisse se préparer car il VEUT un combat digne. Ce n'est pas de la négligence — c'est de l'arrogance cosmique. Ou peut-être... du respect."
    }
  ],
  skillChecks: [
    {
      skill: 'Médecine',
      dc: 14,
      success: "Vous optimisez la récupération du groupe. Chaque PJ récupère 10 PV supplémentaires.",
      failure: "La récupération est standard. Pas de bonus supplémentaire."
    }
  ],
  choices: [
    {
      id: 'choix-antichambre-1',
      prompt: "La porte de Malachar attend. Êtes-vous prêts ?",
      options: [
        {
          label: "Ouvrir la porte",
          description: "Affronter le Destructeur",
          consequence: "Le combat final commence.",
          nextScene: 'nexus-10-malachar-phase1'
        },
        {
          label: "Un dernier moment ensemble",
          description: "Paroles finales entre compagnons",
          consequence: "Aucun effet mécanique. Tout l'effet est émotionnel.",
          nextScene: 'nexus-10-malachar-phase1'
        }
      ]
    }
  ],
  loot: [
    "Restauration du pentagramme (50% PV, suppression états négatifs)",
    "Premier sort maximisé (chaque PJ)",
    "Repos court complet"
  ],
  nextScenes: ['nexus-10-malachar-phase1'],
  previousScene: 'nexus-8-heros-dechus'
};

// ============================================================================
// SALLE 10 : Combat Malachar Phase 1 — Le Destructeur Mortel
// ============================================================================
const SCENE_MALACHAR_P1: BookScene = {
  id: 'nexus-10-malachar-phase1',
  sceneNumber: 10,
  title: "Malachar le Destructeur — Phase 1 : Forme Mortelle",
  type: 'combat',
  location: "Sanctum de Malachar, Cœur du Nexus",
  locationId: 'nexus-sanctum-malachar',
  estimatedMinutes: 45,
  readAloud: {
    text: `La porte s'ouvre sur le néant. Puis le néant prend forme.

La salle de Malachar n'est pas un lieu — c'est un vide que le Destructeur a rempli de sa volonté. Des plates-formes de réalité solidifiée flottent dans un espace infini et sombre, connectées par des ponts de lumière crépusculaire. Au centre, la plus grande plate-forme — un cercle de cent mètres de diamètre — sert d'arène.

Et Malachar est là.

Il ne ressemble pas à ce que vous imaginiez. Pas de cornes. Pas de flammes. Pas de monstruosité. Malachar est beau. Terriblement, tragiquement beau. Il a la forme d'un homme de haute stature, vêtu d'une armure de nuit étoilée, ses yeux sont deux galaxies en miniature — des spirales de lumière et d'ombre qui tournent dans des orbites infinies. Ses cheveux sont des filaments d'obscurité vivante, et sa présence remplit l'espace comme un orage remplit le ciel.

Sa voix est douce — presque tendre : « Vous voilà enfin. J'ai attendu si longtemps. Des millénaires à murmurer dans le noir, à tenter de faire comprendre... Personne n'écoute. Personne ne comprend que la destruction n'est pas le mal. C'est le changement. Et le changement est la seule constante de l'univers. »

Il lève une main. L'espace se plie. « Mais puisque vous avez choisi le chemin des armes... »

Son armure de nuit se hérisse de lames d'ombre. Ses yeux de galaxies se rétrécissent.

« ...alors je vous montrerai ce que signifie véritablement le mot DESTRUCTION. »`,
    mood: 'combat final épique, enjeux cosmiques, beauté terrifiante',
    music: 'THÈME FINAL — orchestre complet, chœurs, percussions titanesques'
  },
  gmNotes: [
    {
      type: 'info',
      text: "PHASE 1 : Malachar combat sous forme « mortelle » — puissant mais pas invincible. CR 18. Il teste les PJ, jauge leur force. Cette phase est un combat « classique » mais à un niveau de puissance extrême. La Phase 2 (transcendante) se déclenche quand il atteint 0 PV en Phase 1."
    },
    {
      type: 'tip',
      text: "Malachar est vulnérable au cœur — pas à la tête (indice de la Galerie des Héros). Les attaques ciblant son torse/cœur ignorent sa régénération. Les attaques normales le blessent mais il régénère. L'information des Doubles est CRUCIALE."
    },
    {
      type: 'warning',
      text: "Malachar est le boss final de toute la campagne. Il DOIT être redoutable. N'ayez pas peur de pousser les PJ dans leurs retranchements. Cependant, il ne doit pas être injuste : chaque capacité a un indicateur visuel (ses galaxies pulsent avant Annihilation, son armure scintille avant Lames d'Ombre, etc.)."
    },
    {
      type: 'secret',
      text: "Malachar ne veut pas TUER les PJ. Il veut les convaincre. Pendant le combat, il parle — il explique sa philosophie, il questionne leurs certitudes. Si un PJ écoute réellement (pas en ignorant le combat mais en répondant à Malachar tout en combattant), Malachar désarme ses attaques envers ce PJ pendant 1 round. C'est un boss qui VEUT être compris."
    }
  ],
  encounter: {
    name: "Malachar le Destructeur — Forme Mortelle",
    enemies: [
      {
        name: "Malachar — Phase 1 (Forme Mortelle)",
        hp: 250,
        atk: 14,
        ac: 21,
        cr: 18,
        abilities: [
          "Lame du Crépuscule : +14 au toucher, 3d10+7 tranchant + 2d8 nécrotique. Ignore les résistances non-divines.",
          "Lames d'Ombre : (Bonus) 6 lames d'ombre attaquent simultanément (+12, 1d8+4 nécrotique chacune, 6 cibles différentes dans 12m)",
          "Annihilation : (Recharge 5-6) Rayon noir, ligne de 30m, 10d10 nécrotique + 5d10 force. Dextérité DD 21 pour moitié. Les objets non-magiques dans la zone sont détruits.",
          "Régénération Cosmique : 20 PV/round. Les attaques ciblant le cœur (attaque ciblée, -5 au jet) ignorent cette régénération.",
          "Présence du Destructeur : Aura 18m. Début du tour de chaque créature : Sagesse DD 19 ou Effrayé 1 tour. Les créatures ayant la Bénédiction de la Porte sont immunisées.",
          "Pas du Néant : Bonus, se téléporte de 12m dans n'importe quelle direction.",
          "Contre-Création : Réaction, annule 1 sort de niveau 5 ou moins (comme Contre-sort mais automatique).",
          "Résistances : Résistance à TOUS les dégâts sauf radiant et force. Immunité nécrotique, poison, psychique.",
          "Transition : À 0 PV, Malachar ne meurt pas. Son corps mortel se dissout et sa forme transcendante émerge."
        ]
      }
    ],
    terrain: [
      "Plate-forme centrale (100m) : arène principale, terrain plat",
      "Plates-formes secondaires (6, 10m chacune) : couverture à distance, accessibles par ponts de lumière",
      "Ponts de lumière : traversables mais Malachar peut les dissoudre (bonus action) pour isoler les PJ",
      "Vide infini : chute = retour aléatoire sur une plate-forme après 1 round (3d6 force)"
    ],
    tactics: "Malachar commence par Présence du Destructeur pour effrayer le groupe. Il utilise Pas du Néant pour rester mobile et Lame du Crépuscule sur le tank. Lames d'Ombre harcèle tout le groupe. Annihilation est gardée pour les PJ regroupés. Il utilise Contre-Création contre les sorts de contrôle (Hold Monster, Banissement). Il PARLE pendant tout le combat — ne faites pas de ce boss un sac de PV silencieux.",
    loot: [
      "Transition vers Phase 2 — pas de loot ici (le combat n'est pas fini !)"
    ]
  },
  skillChecks: [
    {
      skill: 'Perspicacité',
      dc: 18,
      success: "Vous percevez que Malachar ne combat pas à pleine puissance. Il retient ses coups. Il veut être convaincu, pas vaincu.",
      failure: "Malachar semble invincible. Sa puissance est terrifiante."
    }
  ],
  choices: [
    {
      id: 'choix-malachar-p1',
      prompt: "Malachar combat mais il parle aussi. Comment répondez-vous ?",
      options: [
        {
          label: "Combattre en silence",
          description: "Se concentrer uniquement sur le combat",
          consequence: "Combat standard. Malachar ne désarme jamais.",
          nextScene: 'nexus-11-malachar-phase2'
        },
        {
          label: "Dialoguer tout en combattant",
          description: "Répondre à Malachar entre les coups",
          consequence: "Malachar désarme envers les PJ qui répondent sincèrement (1 round).",
          nextScene: 'nexus-11-malachar-phase2'
        },
        {
          label: "Viser le cœur en priorité",
          description: "Utiliser l'indice des Doubles pour ignorer sa régénération",
          consequence: "Optimal tactiquement — chaque coup au cœur est permanent.",
          nextScene: 'nexus-11-malachar-phase2'
        }
      ]
    }
  ],
  loot: [],
  nextScenes: ['nexus-11-malachar-phase2'],
  previousScene: 'nexus-9-antichambre'
};

// ============================================================================
// SALLE 11 : Combat Malachar Phase 2 — Forme Transcendante
// ============================================================================
const SCENE_MALACHAR_P2: BookScene = {
  id: 'nexus-11-malachar-phase2',
  sceneNumber: 11,
  title: "Malachar — Phase 2 : Forme Transcendante",
  type: 'combat',
  location: "Au-delà de la réalité, Nexus des Sceaux",
  locationId: 'nexus-transcendance',
  estimatedMinutes: 45,
  readAloud: {
    text: `Le corps mortel de Malachar se dissout comme du sable dans le vent. Pendant un instant — un seul battement de cœur — il y a le silence. Puis l'univers CRIE.

L'espace autour de vous se déchire. Les plates-formes se brisent et se reforment. Le vide entre les étoiles devient le champ de bataille. Et Malachar renaît.

Sa forme transcendante est un titan de nuit et d'étoiles — trente mètres de haut, un humanoïde fait de cosmos pur. Son corps est une fenêtre sur un univers en destruction : des galaxies s'effondrent dans sa poitrine, des étoiles meurent dans ses yeux, des planètes se brisent dans ses poings. Il n'est plus un être — il est un concept incarné. La Destruction faite chair. La Fin de Toute Chose rendue visible.

Et pourtant, au centre de sa poitrine de cosmos, un point de lumière dorée brille — un cœur, minuscule, vulnérable, qui pulse au rythme du monde qu'il a contribué à créer.

Sa voix n'est plus celle d'un homme — c'est celle d'un dieu : « VOYEZ CE QUE JE SUIS VÉRITABLEMENT. JE SUIS L'HIVER QUI SUIT L'ÉTÉ. JE SUIS LA NUIT QUI SUIT LE JOUR. JE SUIS LA FIN QUI PRÉCÈDE LE DÉBUT. ET VOUS... VOUS ÊTES MAGNIFIQUES. VOUS ÊTES LE PLUS BEAU CHAPITRE AVANT LA DERNIÈRE PAGE. »

Des larmes de galaxie coulent sur son visage de cosmos.

« FINISSONS-EN. ENSEMBLE. »`,
    mood: 'transcendant, cosmique, dernière bataille de la campagne',
    music: 'CLIMAX FINAL — toute la puissance orchestrale, silence puis explosion'
  },
  gmNotes: [
    {
      type: 'info',
      text: "PHASE 2 : Malachar Transcendant. CR 22. C'est le combat final FINAL. Le seul point faible est le cœur — tous les autres dégâts sont réduits de moitié. Le cœur a CA 25 (minuscule cible à 30m de haut) mais n'a que 100 PV. Les PJ doivent trouver un moyen d'atteindre le cœur et de le frapper."
    },
    {
      type: 'tip',
      text: "Les bénédictions des 5 Sceaux s'activent ici : +2 Force (Terre), +2 Constitution (Mer), +2 Sagesse (Forêt), +2 Charisme (Feu), Cristal de l'Équilibre (Secret). Combinées avec les objets de la campagne, les PJ sont à leur apogée absolue."
    },
    {
      type: 'warning',
      text: "Ce combat doit être le plus mémorable de toute la campagne. Décrivez chaque attaque de manière épique. Les PJ ne combattent pas un monstre — ils combattent un concept. Chaque coup qui touche Malachar fait trembler les étoiles. Chaque sort lancé illumine le cosmos."
    },
    {
      type: 'secret',
      text: "Si les PJ ont dialogué avec Malachar en Phase 1, il hésite à utiliser Néant Final. Ce moment d'hésitation donne 1 round gratuit aux PJ. Si les PJ ont compris la vérité (Sceau Secret), Malachar peut être convaincu de se rendre APRÈS avoir été réduit à 25% PV (cœur à 25 PV) — ouvrant la voie à la Fin 3 (Fusion)."
    }
  ],
  encounter: {
    name: "Malachar Transcendant — Forme Cosmique",
    enemies: [
      {
        name: "Malachar — Phase 2 (Transcendant)",
        hp: 300,
        atk: 16,
        ac: 19,
        cr: 22,
        abilities: [
          "Poing du Néant : +16, portée 9m, 4d12+8 force + 3d10 nécrotique. La zone d'impact (3m) est Terrain Difficile pendant 1 minute.",
          "Regard d'Annihilation : (Recharge 4-6) Ligne de 60m, 12d10 nécrotique. Constitution DD 22. Réussite = moitié. Échec de 10+ = Désintégré (0 PV immédiat, jet de mort).",
          "Nova de Destruction : (1/combat) Sphère de 30m centrée sur Malachar, 8d10 force + 8d10 nécrotique. Constitution DD 22 pour moitié. Malachar perd 50 PV en utilisant cette capacité.",
          "Aura du Néant : Toutes les créatures dans 18m : les soins sont réduits de moitié. Les PJ avec la Bénédiction de la Forêt sont immunisés.",
          "Cœur Vulnérable : CA 25, 100 PV. Attaques ciblées à -8 (cible minuscule à 30m de haut). Si le cœur atteint 0 PV, Malachar est vaincu/soumis. Les dégâts au cœur ne sont PAS réduits.",
          "Réduction de Dégâts : Tous les dégâts (sauf au cœur) sont réduits de moitié.",
          "Pas entre les Étoiles : Se téléporte instantanément n'importe où dans l'arène. 1/round.",
          "Volonté Indomptable : Immunité à tout contrôle mental, charme, peur. Avantage sur tous les jets de sauvegarde."
        ]
      }
    ],
    terrain: [
      "Cosmos (espace infini) : pas de sol fixe, gravité variable",
      "Débris de plates-formes : petites plates-formes (3m) flottant dans le vide, utilisables comme position",
      "Cœur de Malachar : visible au centre de sa poitrine, accessible par vol, saut héroïque (Athlétisme DD 20) ou sorts",
      "Éclats de réalité : des fragments du monde réel flottent dans le vide — arbres, rochers, vagues — utilisables comme armes improvisées ou couverture"
    ],
    tactics: "Malachar commence par Nova de Destruction pour ouvrir (il se blesse lui-même, c'est un acte de démonstration de puissance). Ensuite il alterne Poing du Néant et Regard d'Annihilation. Il se téléporte pour éviter les PJ qui s'approchent de son cœur. Il PARLE encore — il n'est pas silencieux. Chaque attaque est accompagnée d'un commentaire philosophique.",
    loot: [
      "Victoire ou défaite — le loot dépend de la fin choisie (Salle 12)"
    ]
  },
  skillChecks: [
    {
      skill: 'Athlétisme',
      dc: 20,
      success: "Vous bondissez de débris en débris et atteignez la hauteur du cœur de Malachar ! Vous pouvez le frapper directement !",
      failure: "Le saut est trop court. Vous retombez sur un débris. Le cœur reste hors de portée."
    },
    {
      skill: 'Persuasion',
      dc: 22,
      success: "Malachar hésite. Pour la première fois en trois millénaires, quelqu'un comprend. « Peut-être... peut-être qu'il y a une autre voie. » Il baisse sa garde 1 round entier.",
      failure: "Malachar secoue la tête. « Les mots sont beaux. Mais ils ne changent pas ce que je suis. »"
    }
  ],
  choices: [
    {
      id: 'choix-malachar-p2',
      prompt: "Malachar Transcendant domine le cosmos. Comment l'affrontez-vous ?",
      options: [
        {
          label: "Tout miser sur le cœur",
          description: "Concentrer toutes les attaques sur le point faible",
          consequence: "La voie la plus efficace. 100 PV à détruire.",
          nextScene: 'nexus-12-grand-rituel'
        },
        {
          label: "L'affaiblir d'abord puis frapper le cœur",
          description: "Réduire ses défenses avant la frappe finale",
          consequence: "Plus long mais plus sûr.",
          nextScene: 'nexus-12-grand-rituel'
        },
        {
          label: "Le convaincre de se rendre",
          description: "Après l'avoir affaibli, tenter la diplomatie cosmique",
          consequence: "Possible seulement si la vérité du Sceau Secret est connue et si le cœur est à 25% PV.",
          skillCheck: {
            skill: 'Persuasion',
            dc: 22,
            success: "Malachar accepte. 'Montrez-moi cette autre voie.' Le combat cesse. La Salle du Grand Rituel s'ouvre.",
            failure: "Malachar refuse. Le combat continue."
          },
          nextScene: 'nexus-12-grand-rituel'
        }
      ]
    }
  ],
  loot: [],
  nextScenes: ['nexus-12-grand-rituel'],
  previousScene: 'nexus-10-malachar-phase1'
};

// ============================================================================
// SALLE 12 : La Salle du Grand Rituel — Le Choix Final (4 Fins)
// ============================================================================
const SCENE_GRAND_RITUEL: BookScene = {
  id: 'nexus-12-grand-rituel',
  sceneNumber: 12,
  title: "La Salle du Grand Rituel — Le Choix Final",
  type: 'choice',
  location: "Centre absolu du Nexus des Sceaux",
  locationId: 'nexus-centre-absolu',
  estimatedMinutes: 30,
  readAloud: {
    text: `Malachar est vaincu — ou soumis. Son corps transcendant se compresse, se condense, redevient la forme d'un homme. Blessé, affaibli, mais toujours présent. Toujours conscient. Ses yeux de galaxies se sont éteints, remplacés par des yeux humains — tristes, fatigués, anciens.

Autour de vous, le Nexus se reconfigure. Les cinq Sceaux convergent, formant un cercle parfait au centre de l'espace. Le pentagramme de pouvoir est complet, et en son centre, un autel de lumière pure attend.

C'est ici que tout se décide. L'autel est un outil — le Grand Rituel. Il peut être utilisé de quatre manières, chacune déterminant le destin d'Aethelgard pour les millénaires à venir.

Le fantôme d'Aldric Solaris apparaît. La vision de Sylvana illumine le Nexus. L'ombre de Thalassa ondule. Les esprits de tous ceux que vous avez rencontrés, aidés ou perdus sont ici, spectateurs du moment le plus important de l'histoire du monde.

Malachar, à genoux, vous regarde. « Le choix est vôtre. Je l'accepterai. Quel qu'il soit. »

Quatre chemins. Quatre fins. Un monde qui attend.`,
    mood: 'culminant, philosophique, choix final de toute la campagne',
    music: 'Silence absolu puis thème principal une dernière fois, doux et résolu'
  },
  gmNotes: [
    {
      type: 'info',
      text: "LES QUATRE FINS :\n\nFin 1 — DESTRUCTION : Tuer Malachar définitivement. Le monde est libéré de la menace mais perd la capacité de changement fondamental. Aethelgard devient un monde figé, stable mais statique. Pas de mal, mais pas d'évolution.\n\nFin 2 — LIBÉRATION : Libérer Malachar et briser les Sceaux. Le monde est plongé dans le chaos mais aussi dans un renouveau. Destruction et création coexistent. Un monde dangereux mais vivant.\n\nFin 3 — FUSION : Réunir Malachar et le Créateur. Le monde est recréé — pas détruit, transformé. L'ancien monde meurt, un nouveau naît. Les PJ deviennent les premiers héros du nouveau monde. C'est la fin « secrète » et la plus complète.\n\nFin 4 — STATU QUO : Renforcer les Sceaux. Malachar est emprisonné pour des millénaires de plus. Le problème est reporté, pas résolu. Le monde continue comme avant, avec la menace latente."
    },
    {
      type: 'tip',
      text: "Ne guidez PAS les joueurs vers une fin spécifique. Présentez les quatre options avec leurs conséquences clairement et laissez le groupe décider. C'est LEUR histoire. Si les joueurs sont divisés, c'est encore mieux — le débat EST le climax narratif."
    },
    {
      type: 'warning',
      text: "La Fin 2 (Libération) peut sembler « mauvaise » mais elle n'est pas moins valide que les autres. Un monde de chaos est aussi un monde de possibilités infinies. La Fin 1 (Destruction) peut sembler « bonne » mais un monde sans changement est un monde mourant lentement."
    },
    {
      type: 'secret',
      text: "La Fin 3 (Fusion) n'est disponible que si les PJ ont compris la vérité (Sceau Secret) et si Malachar s'est rendu volontairement. C'est la seule fin qui résout véritablement le conflit au lieu de le reporter ou de l'effacer."
    }
  ],
  skillChecks: [
    {
      skill: 'Religion',
      dc: 20,
      success: "Vous comprenez parfaitement les implications cosmiques de chaque choix. Vous pouvez guider le rituel sans risque.",
      failure: "Les implications sont floues. Le rituel fonctionnera mais avec une marge d'incertitude."
    }
  ],
  choices: [
    {
      id: 'choix-final',
      prompt: "Le Grand Rituel attend. Le destin d'Aethelgard est entre vos mains. Quel choix faites-vous ?",
      options: [
        {
          label: "FIN 1 — DESTRUCTION : Tuer Malachar",
          description: "Éliminer définitivement le Destructeur et sceller les Sceaux pour toujours",
          consequence: "Le monde est libéré de Malachar mais perd la capacité de changement fondamental. Un monde stable mais figé. Les héros sont célébrés comme des sauveurs. La paix règne — une paix éternelle et immuable. Certains diront : trop parfaite.",
          nextScene: 'nexus-epilogue'
        },
        {
          label: "FIN 2 — LIBÉRATION : Briser les Sceaux",
          description: "Libérer Malachar et laisser la destruction et la création coexister",
          consequence: "Le monde plonge dans le chaos mais aussi dans un renouveau sans précédent. Les mers se soulèvent, les montagnes tombent, les forêts brûlent — mais de nouvelles terres émergent, de nouvelles espèces naissent, de nouvelles possibilités s'ouvrent. Les héros deviennent les gardiens d'un monde sauvage et libre.",
          nextScene: 'nexus-epilogue'
        },
        {
          label: "FIN 3 — FUSION : Réunir le Créateur et le Destructeur",
          description: "Fusionner les deux aspects de l'être primordial, recréant le monde",
          consequence: "Le monde est recréé. L'ancien Aethelgard se transforme — non pas détruit, TRANSCENDÉ. Les héros sont les premiers habitants du nouveau monde, portant les souvenirs de l'ancien. C'est à la fois une fin et un début. La plus belle des conclusions.",
          nextScene: 'nexus-epilogue'
        },
        {
          label: "FIN 4 — STATU QUO : Renforcer les Sceaux",
          description: "Renvoyer Malachar dans sa prison pour des millénaires",
          consequence: "Le monde continue comme avant. La menace est reportée, pas résolue. Les Sceaux tiendront mille ans de plus — peut-être deux mille. Et un jour, d'autres héros devront faire le même choix. Les héros rentrent chez eux, victorieux mais conscients que rien n'est résolu.",
          nextScene: 'nexus-epilogue'
        }
      ]
    }
  ],
  loot: [
    "Le destin d'Aethelgard (inestimable)",
    "Satisfaction narrative de toute une campagne",
    "Loot final dépendant de la fin choisie — voir récompenses du chapitre"
  ],
  nextScenes: ['nexus-epilogue'],
  previousScene: 'nexus-11-malachar-phase2'
};

// ============================================================================
// CHAPITRE COMPLET : Le Nexus des Sceaux
// ============================================================================
export const DUNGEON_NEXUS: BookChapter = {
  id: 'dungeon-nexus-des-sceaux',
  actNumber: 5,
  chapterNumber: 20,
  title: "Le Nexus des Sceaux",
  subtitle: "Le donjon final — Où le destin du monde est scellé",
  summary: "Le Nexus des Sceaux est le donjon final de la campagne d'Aethelgard. Accessible uniquement par ceux qui portent les fragments des cinq Sceaux, il existe entre les plans de réalité. Les héros doivent traverser cinq Salles de Sceau — chacune une épreuve différente — avant d'affronter la Galerie des Héros Déchus et enfin Malachar lui-même dans un combat en deux phases cosmiques. La révélation du Sceau Secret change tout : Malachar n'est pas un monstre mais l'autre face du Créateur. Le Grand Rituel final offre quatre fins possibles, chacune avec des conséquences profondes et nuancées. C'est l'aboutissement de toute la campagne — un climax qui récompense chaque choix fait au cours des cinq actes.",
  levelRange: "16-20",
  themes: [
    "Le choix ultime et ses conséquences",
    "La nature duale de l'existence",
    "Destruction comme transformation",
    "L'héritage et la mémoire",
    "La fin comme nouveau départ"
  ],
  scenes: [
    SCENE_PORTE_DESTIN,
    SCENE_CORRIDOR_EPREUVES,
    SCENE_SCEAU_TERRE,
    SCENE_SCEAU_MER,
    SCENE_SCEAU_FORET,
    SCENE_SCEAU_FEU,
    SCENE_SCEAU_SECRET,
    SCENE_HEROS_DECHUS,
    SCENE_ANTICHAMBRE,
    SCENE_MALACHAR_P1,
    SCENE_MALACHAR_P2,
    SCENE_GRAND_RITUEL
  ],
  chapterIntro: {
    text: `Bienvenue dans le Nexus des Sceaux — le donjon final de la campagne d'Aethelgard. Ce donjon est conçu pour des personnages de niveau 16 à 20 et devrait prendre 8 à 12 heures de jeu réel. Prévoyez deux sessions longues ou trois sessions normales.

Ce donjon est la culmination de TOUT ce que les PJ ont fait depuis le début. Chaque donjon précédent, chaque choix, chaque allié gagné ou perdu a un impact ici. Les Sceaux sont plus forts ou plus faibles selon les actions passées. Les bénédictions s'accumulent. Les indices convergent.

Le combat contre Malachar en deux phases est le combat le plus difficile et le plus spectaculaire de la campagne. Mais la vraie conclusion n'est pas le combat — c'est le CHOIX. Les quatre fins sont toutes valides, toutes intéressantes, toutes satisfaisantes à leur manière. Faites confiance à vos joueurs.

Bonne chance, Maître du Jeu. Vous en aurez besoin. Mais surtout — amusez-vous. C'est la fin d'une histoire. Faites-en une histoire mémorable.`,
    mood: 'ultime, épique, conclusion de campagne',
    music: 'Ouverture complète — tous les thèmes de la campagne entrelacés'
  },
  chapterConclusion: {
    text: `Le Grand Rituel est accompli. Le choix est fait. Et le monde change — ou ne change pas — selon la volonté des héros qui ont traversé cinq actes, cinq donjons et mille dangers pour arriver à ce moment.

Quelle que soit la fin choisie, une chose est certaine : le monde d'Aethelgard ne sera plus jamais le même. Les noms des héros seront gravés dans l'histoire — dans la pierre de Sol-Aureus, dans le mithral de Karak-Zhul, dans le bois d'Yggdrasylve, dans le corail de Marethys, et dans le tissu même de la réalité au cœur du Nexus.

Leur histoire est terminée. Mais comme Malachar l'a appris — la fin n'est que le début d'autre chose.

Merci d'avoir joué à Aethelgard.`,
    mood: 'conclusif, émouvant, gratitude',
    music: 'Thème principal une dernière fois, doux et complet, fondu au silence'
  },
  rewards: {
    xp: 30000,
    gold: "Dépend de la fin — voir ci-dessous",
    items: [
      "Fin 1 (Destruction) : Lame de l'Aube Éternelle (+3, 4d6 radiant, mort-vivants détruits au contact)",
      "Fin 2 (Libération) : Manteau du Chaos Primordial (+3 CA, lance un sort aléatoire de niveau 9 1/jour)",
      "Fin 3 (Fusion) : Cœur du Nouveau Monde (artefact, recrée une zone de 1km selon la volonté du porteur, 1/an)",
      "Fin 4 (Statu Quo) : Bouclier des Sceaux (+3, immunité nécrotique, Mur de Force 1/jour)",
      "Toutes les fins : Titre de Héros d'Aethelgard, domaine offert par le royaume, reconnaissance éternelle",
      "Cristal de l'Équilibre (focaliseur universel +3)",
      "Bénédictions permanentes des 5 Sceaux",
      "Écaille du Léviathan / Bois de l'Arbre-Monde / Cœur de Cristal du Dragon (si obtenus précédemment)"
    ]
  }
};
