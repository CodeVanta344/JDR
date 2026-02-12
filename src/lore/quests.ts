/**
 * AETHELGARD QUESTS - Système de quêtes structurées
 * 30+ quêtes avec actes, embranchements et récompenses
 */

// ============================================================================
// TYPES
// ============================================================================

export type QuestType = 
  | 'main' // Quête principale
  | 'side' // Quête secondaire
  | 'faction' // Quête de faction
  | 'repeatable' // Quête répétable
  | 'event'; // Quête événement

export type QuestCategory = 
  | 'combat' 
  | 'investigation' 
  | 'exploration' 
  | 'diplomacy' 
  | 'stealth'
  | 'crafting'
  | 'collection';

export type QuestStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';

export interface QuestObjective {
  id: string;
  description: string;
  type: 'kill' | 'collect' | 'talk' | 'explore' | 'escort' | 'craft' | 'choice';
  target?: string; // ID de l'entité cible
  quantity?: number;
  location?: string;
  optional?: boolean;
}

export interface QuestAct {
  actNumber: number;
  title: string;
  description: string;
  objectives: QuestObjective[];
  choices?: QuestChoice[];
  rewards?: QuestReward;
}

export interface QuestChoice {
  id: string;
  prompt: string;
  options: {
    text: string;
    consequence: string;
    nextAct?: number; // Numéro de l'acte suivant
    reputationChange?: { faction: string; amount: number }[];
    itemsGained?: string[];
    itemsLost?: string[];
  }[];
}

export interface QuestReward {
  experience: number;
  gold: number;
  items?: string[];
  reputation?: { faction: string; amount: number }[];
  unlocks?: string[]; // IDs de quêtes/zones débloquées
}

export interface QuestPrerequisites {
  level?: number;
  quests?: string[]; // IDs de quêtes requises
  faction?: { id: string; reputation: number };
  items?: string[];
}

export interface QuestDefinition {
  id: string;
  name: string;
  type: QuestType;
  category: QuestCategory;
  
  // Donneur de quête
  questGiver: string; // ID du NPC
  location: string;
  region: string;
  
  // Description
  summary: string;
  description: string;
  
  // Structure
  acts: QuestAct[];
  
  // Prérequis
  prerequisites?: QuestPrerequisites;
  
  // Récompenses finales
  finalRewards: QuestReward;
  
  // Temps
  timeLimit?: number; // En minutes (0 = pas de limite)
  
  // Lore
  loreImpact?: string; // Impact sur le monde
  
  // Difficulté suggerée
  suggestedLevel: number;
}

// ============================================================================
// QUÊTES PRINCIPALES
// ============================================================================

export const MAIN_DRAGON_AWAKENS: QuestDefinition = {
  id: 'quest:main:dragon-awakens',
  name: "Le Réveil du Dragon",
  type: 'main',
  category: 'combat',
  questGiver: 'npc:quest:elena',
  location: 'royal-palace',
  region: 'northern-kingdoms',
  summary: "Un dragon rouge ancien s'est réveillé dans les Montagnes de Feu. Le royaume est en danger.",
  description: "Depuis des siècles, le dragon Infernus dormait sous les Montagnes de Feu. Des tremblements de terre et colonnes de fumée signalent son réveil. Le roi ordonne son élimination avant qu'il ne rase le royaume.",
  suggestedLevel: 15,
  
  acts: [
    {
      actNumber: 1,
      title: "Enquête Préliminaire",
      description: "Enquêter sur les signes du réveil du dragon et rassembler des informations.",
      objectives: [
        {
          id: 'obj:investigate-tremors',
          description: "Enquêter sur les tremblements de terre près du Mont Ignis",
          type: 'explore',
          location: 'mount-ignis'
        },
        {
          id: 'obj:interview-survivors',
          description: "Interroger les survivants du village de Cendrelac",
          type: 'talk',
          target: 'npc:survivor:marcus',
          quantity: 3
        },
        {
          id: 'obj:ancient-texts',
          description: "Consulter les archives de l'Académie Arcane sur les dragons",
          type: 'talk',
          target: 'npc:merchant:theodore',
          optional: true
        }
      ],
      rewards: {
        experience: 500,
        gold: 100,
        reputation: [{ faction: 'faction:royal-crown', amount: 50 }]
      }
    },
    {
      actNumber: 2,
      title: "Préparatifs",
      description: "Se préparer pour affronter un dragon ancien. Réunir alliés et équipement.",
      objectives: [
        {
          id: 'obj:forge-dragonbane',
          description: "Faire forger une arme anti-dragon chez Brom le Forgeron",
          type: 'craft',
          target: 'npc:blacksmith:brom'
        },
        {
          id: 'obj:recruit-allies',
          description: "Recruter au moins 2 compagnons pour l'assaut",
          type: 'talk',
          quantity: 2
        },
        {
          id: 'obj:fire-resistance',
          description: "Obtenir potions de résistance au feu",
          type: 'collect',
          target: 'potion:fire-resistance',
          quantity: 5
        }
      ],
      choices: [
        {
          id: 'choice:strategy',
          prompt: "Quelle stratégie adopter pour affronter Infernus ?",
          options: [
            {
              text: "Assaut frontal - Force brute et courage",
              consequence: "Combat difficile mais honorable. +100 réputation Couronne.",
              reputationChange: [{ faction: 'faction:royal-crown', amount: 100 }]
            },
            {
              text: "Approche furtive - Infiltration du repaire",
              consequence: "Bonus d'initiative au combat. +50 réputation Voleurs.",
              reputationChange: [{ faction: 'faction:shadow-brotherhood', amount: 50 }]
            },
            {
              text: "Négociation - Tenter de parlementer avec le dragon",
              consequence: "Peut éviter combat si Charisme élevé. Risqué.",
              nextAct: 4
            }
          ]
        }
      ],
      rewards: {
        experience: 800,
        gold: 200,
        items: ['weapon:dragonbane:legendary']
      }
    },
    {
      actNumber: 3,
      title: "L'Assaut",
      description: "Affronter Infernus dans son repaire volcanique.",
      objectives: [
        {
          id: 'obj:reach-lair',
          description: "Traverser les Cavernes de Lave jusqu'au repaire",
          type: 'explore',
          location: 'lava-caverns'
        },
        {
          id: 'obj:defeat-wyrmlings',
          description: "Éliminer les dragonneaux gardiens (0/5)",
          type: 'kill',
          target: 'creature:dragon:wyrmling',
          quantity: 5
        },
        {
          id: 'obj:slay-infernus',
          description: "Vaincre Infernus le Dragon Rouge Ancien",
          type: 'kill',
          target: 'creature:dragon:red:ancient'
        }
      ],
      rewards: {
        experience: 5000,
        gold: 10000,
        items: ['armor:dragonscale:epic', 'gem:dragons-heart'],
        reputation: [{ faction: 'faction:royal-crown', amount: 500 }]
      }
    },
    {
      actNumber: 4,
      title: "Négociation (alternatif)",
      description: "Tenter de raisonner le dragon plutôt que de le combattre.",
      objectives: [
        {
          id: 'obj:ancient-tribute',
          description: "Rassembler tribut digne d'un dragon (10000 gold en trésors)",
          type: 'collect',
          target: 'treasure',
          quantity: 10000
        },
        {
          id: 'obj:parley-dragon',
          description: "Parlementer avec Infernus (jet de Charisme DD 25)",
          type: 'talk',
          target: 'creature:dragon:red:ancient'
        }
      ],
      choices: [
        {
          id: 'choice:negotiation',
          prompt: "Infernus écoute votre proposition...",
          options: [
            {
              text: "Offrir tribut annuel en échange de paix",
              consequence: "Dragon accepte. Royaume taxé mais vivant. -200 réputation Couronne.",
              reputationChange: [{ faction: 'faction:royal-crown', amount: -200 }]
            },
            {
              text: "Proposer alliance contre ennemi commun",
              consequence: "Dragon intéressé. Débloque quête épique alliance draconique.",
              unlocks: ['quest:main:draconic-alliance']
            },
            {
              text: "Trahir et attaquer pendant négociation",
              consequence: "Dragon furieux. Combat avec malus. Considéré comme traître.",
              nextAct: 3,
              reputationChange: [{ faction: 'faction:royal-crown', amount: -500 }]
            }
          ]
        }
      ],
      rewards: {
        experience: 3000,
        gold: 5000,
        items: ['scroll:summon-dragon'],
        reputation: [{ faction: 'faction:draconic-covenant', amount: 1000 }]
      }
    }
  ],
  
  finalRewards: {
    experience: 10000,
    gold: 20000,
    items: ['title:dragonslayer', 'mount:dragon-hatchling'],
    reputation: [{ faction: 'faction:royal-crown', amount: 1000 }],
    unlocks: ['zone:dragon-roost', 'quest:main:ancient-prophecy']
  },
  
  loreImpact: "La mort/alliance d'Infernus change l'équilibre du pouvoir. Les autres dragons prennent note.",
  timeLimit: 0
};

// ============================================================================
// QUÊTES DE FACTION
// ============================================================================

export const FACTION_ARCANE_INITIATION: QuestDefinition = {
  id: 'quest:faction:arcane-initiation',
  name: "Rites d'Initiation Arcane",
  type: 'faction',
  category: 'investigation',
  questGiver: 'npc:trainer:thalion',
  location: 'arcane-academy',
  region: 'northern-kingdoms',
  summary: "Prouver votre maîtrise de la magie pour rejoindre la Guilde Arcane.",
  description: "L'Archimage Thalion vous met à l'épreuve. Trois défis doivent être relevés pour prouver votre valeur et rejoindre les rangs de la prestigieuse Guilde Arcane.",
  suggestedLevel: 5,
  
  prerequisites: {
    level: 5,
    items: ['spellbook:apprentice']
  },
  
  acts: [
    {
      actNumber: 1,
      title: "Épreuve du Savoir",
      description: "Démontrer vos connaissances théoriques en magie.",
      objectives: [
        {
          id: 'obj:arcane-exam',
          description: "Réussir l'examen écrit de l'Académie (5 questions)",
          type: 'choice'
        },
        {
          id: 'obj:identify-artifacts',
          description: "Identifier correctement 3 artefacts magiques",
          type: 'collect',
          target: 'artifact:unknown',
          quantity: 3
        }
      ],
      rewards: {
        experience: 200,
        gold: 50
      }
    },
    {
      actNumber: 2,
      title: "Épreuve de Puissance",
      description: "Prouver votre maîtrise pratique de la magie au combat.",
      objectives: [
        {
          id: 'obj:duel-apprentices',
          description: "Vaincre 3 apprentis en duel magique",
          type: 'kill',
          target: 'npc:apprentice:mage',
          quantity: 3
        },
        {
          id: 'obj:elemental-summon',
          description: "Invoquer et contrôler un élémentaire mineur",
          type: 'craft'
        }
      ],
      rewards: {
        experience: 300,
        gold: 100,
        items: ['staff:apprentice']
      }
    },
    {
      actNumber: 3,
      title: "Épreuve de Sagesse",
      description: "Faire preuve de jugement moral face à un dilemme magique.",
      objectives: [
        {
          id: 'obj:rogue-mage',
          description: "Traquer un mage renégat pratiquant nécromancie",
          type: 'explore',
          location: 'haunted-manor'
        }
      ],
      choices: [
        {
          id: 'choice:rogue-mage',
          prompt: "Vous trouvez le mage renégat. C'est un vieil homme désespéré tentant de ressusciter sa fille morte. Que faites-vous ?",
          options: [
            {
              text: "L'arrêter et le livrer à l'Inquisition",
              consequence: "Approuvé par Thalion. Mage exécuté. +100 réputation Guilde, -50 Voile Crépusculaire.",
              reputationChange: [
                { faction: 'faction:arcane-guild', amount: 100 },
                { faction: 'faction:twilight-veil', amount: -50 }
              ]
            },
            {
              text: "L'aider à terminer le rituel en secret",
              consequence: "Résurrection réussie mais instable. +50 Voile, -100 Guilde si découvert.",
              reputationChange: [
                { faction: 'faction:twilight-veil', amount: 50 },
                { faction: 'faction:arcane-guild', amount: -100 }
              ],
              itemsGained: ['scroll:resurrection:forbidden']
            },
            {
              text: "Lui expliquer pourquoi la nécromancie est dangereuse et l'aider à faire le deuil",
              consequence: "Mage renonce, remercie. +150 réputation Guilde. Considéré sage.",
              reputationChange: [{ faction: 'faction:arcane-guild', amount: 150 }],
              itemsGained: ['title:compassionate-mage']
            }
          ]
        }
      ],
      rewards: {
        experience: 500,
        gold: 200
      }
    }
  ],
  
  finalRewards: {
    experience: 1000,
    gold: 500,
    items: ['robe:arcane-guild', 'badge:guild-member'],
    reputation: [{ faction: 'faction:arcane-guild', amount: 500 }],
    unlocks: ['faction:arcane-guild:rank1', 'shop:guild-exclusive']
  },
  
  loreImpact: "Vous êtes maintenant membre de la Guilde Arcane. Accès aux ressources et quêtes exclusives."
};

export const FACTION_THIEVES_GUILD_HEIST: QuestDefinition = {
  id: 'quest:faction:grand-heist',
  name: "Le Grand Casse",
  type: 'faction',
  category: 'stealth',
  questGiver: 'npc:quest:stranger',
  location: 'shadowy-alley',
  region: 'northern-kingdoms',
  summary: "Voler le Diamant de Minuit dans le manoir le mieux gardé du royaume.",
  description: "L'Étranger vous propose le casse du siècle : voler le légendaire Diamant de Minuit de la collection privée du Duc Blackwood. Discrétion absolue requise.",
  suggestedLevel: 10,
  
  prerequisites: {
    level: 10,
    faction: { id: 'faction:shadow-brotherhood', reputation: 200 }
  },
  
  acts: [
    {
      actNumber: 1,
      title: "Reconnaissance",
      description: "Étudier le manoir et identifier les failles de sécurité.",
      objectives: [
        {
          id: 'obj:scout-manor',
          description: "Observer le manoir pendant 3 jours et noter les patrouilles",
          type: 'explore',
          location: 'blackwood-manor'
        },
        {
          id: 'obj:bribe-servant',
          description: "Soudoyer un serviteur pour obtenir plans du manoir",
          type: 'talk',
          target: 'npc:servant:marie'
        },
        {
          id: 'obj:disable-wards',
          description: "Trouver moyen de neutraliser les protections magiques",
          type: 'talk',
          target: 'npc:enchanter:mystral',
          optional: true
        }
      ],
      rewards: {
        experience: 400,
        gold: 100
      }
    },
    {
      actNumber: 2,
      title: "Préparatifs",
      description: "Rassembler équipement et alliés pour le casse.",
      objectives: [
        {
          id: 'obj:recruit-crew',
          description: "Recruter spécialistes : crocheteur, guetteur, expert magie",
          type: 'talk',
          quantity: 3
        },
        {
          id: 'obj:acquire-tools',
          description: "Obtenir outils de voleur de qualité supérieure",
          type: 'collect',
          target: 'tools:thieves-kit:master',
          quantity: 1
        }
      ],
      choices: [
        {
          id: 'choice:approach',
          prompt: "Comment infiltrer le manoir ?",
          options: [
            {
              text: "Toit - Escalader et entrer par lucarne",
              consequence: "Difficulté acrobaties. Évite gardes sol.",
              itemsLost: ['rope:climbing']
            },
            {
              text: "Égouts - Réseau souterrain sous le manoir",
              consequence: "Discret mais dangereux (rats géants). Sale.",
              itemsLost: ['torch']
            },
            {
              text: "Déguisement - Se faire passer pour serviteurs",
              consequence: "Facile d'accès mais risque découverte sociale.",
              itemsLost: ['costume:servant']
            }
          ]
        }
      ],
      rewards: {
        experience: 300,
        gold: 150
      }
    },
    {
      actNumber: 3,
      title: "L'Infiltration",
      description: "Exécuter le plan et voler le Diamant de Minuit.",
      objectives: [
        {
          id: 'obj:bypass-guards',
          description: "Éviter/neutraliser les gardes (0 alertes)",
          type: 'stealth'
        },
        {
          id: 'obj:crack-vault',
          description: "Crocheter le coffre-fort (jet Dextérité DD 20)",
          type: 'choice'
        },
        {
          id: 'obj:steal-diamond',
          description: "S'emparer du Diamant de Minuit",
          type: 'collect',
          target: 'gem:midnight-diamond'
        },
        {
          id: 'obj:escape',
          description: "S'échapper sans être capturé",
          type: 'explore'
        }
      ],
      rewards: {
        experience: 1500,
        gold: 5000,
        items: ['gem:midnight-diamond']
      }
    }
  ],
  
  finalRewards: {
    experience: 2500,
    gold: 10000,
    items: ['title:master-thief', 'cloak:shadow-master'],
    reputation: [
      { faction: 'faction:shadow-brotherhood', amount: 1000 },
      { faction: 'faction:royal-crown', amount: -500 }
    ],
    unlocks: ['faction:shadow-brotherhood:rank3', 'quest:faction:guild-war']
  },
  
  loreImpact: "Le vol du Diamant fait sensation. Le Duc offre récompense colossale pour retrouver les voleurs.",
  timeLimit: 0
};

// ============================================================================
// QUÊTES SECONDAIRES
// ============================================================================

export const SIDE_WOLF_PROBLEM: QuestDefinition = {
  id: 'quest:side:wolf-problem',
  name: "Le Problème des Loups",
  type: 'side',
  category: 'combat',
  questGiver: 'npc:quest:marcus',
  location: 'riverside-farm',
  region: 'northern-kingdoms',
  summary: "Des loups attaquent le bétail du vieux Marcus. Éliminer la meute.",
  description: "Le vieux Marcus est désespéré. Une meute de loups terrorise sa ferme depuis des semaines. Il a déjà perdu 12 moutons. Aidez-le avant qu'il ne perde tout.",
  suggestedLevel: 2,
  
  acts: [
    {
      actNumber: 1,
      title: "Pistage",
      description: "Suivre les traces des loups jusqu'à leur tanière.",
      objectives: [
        {
          id: 'obj:find-tracks',
          description: "Trouver traces de loups près de la ferme",
          type: 'explore',
          location: 'riverside-farm'
        },
        {
          id: 'obj:follow-trail',
          description: "Suivre piste jusqu'à la tanière (jet Survie DD 12)",
          type: 'explore',
          location: 'dark-forest'
        }
      ],
      rewards: {
        experience: 50,
        gold: 10
      }
    },
    {
      actNumber: 2,
      title: "Élimination",
      description: "Éliminer la meute de loups.",
      objectives: [
        {
          id: 'obj:kill-wolves',
          description: "Tuer les loups (0/6)",
          type: 'kill',
          target: 'beast:wolf',
          quantity: 6
        },
        {
          id: 'obj:alpha-wolf',
          description: "Vaincre le loup alpha",
          type: 'kill',
          target: 'beast:wolf:dire'
        }
      ],
      choices: [
        {
          id: 'choice:alpha',
          prompt: "Le loup alpha blessé vous fixe. Sa patte est prise dans un piège de chasseur.",
          options: [
            {
              text: "L'achever rapidement",
              consequence: "Meute éliminée. Mission accomplie.",
              itemsGained: ['leather:wolf-pelt']
            },
            {
              text: "Le libérer et le soigner",
              consequence: "Loup reconnaissant part. Future quête druide débloquée.",
              reputationChange: [{ faction: 'faction:emerald-wardens', amount: 100 }],
              unlocks: ['quest:side:wolf-companion']
            }
          ]
        }
      ],
      rewards: {
        experience: 150,
        gold: 50,
        items: ['leather:medium']
      }
    }
  ],
  
  finalRewards: {
    experience: 200,
    gold: 100,
    items: ['food:roasted-meat'],
    reputation: [{ faction: 'faction:common-folk', amount: 50 }]
  },
  
  loreImpact: "Les fermiers peuvent dormir tranquilles. Marcus est éternellement reconnaissant."
};

export const SIDE_MISSING_DAUGHTER: QuestDefinition = {
  id: 'quest:side:missing-daughter',
  name: "La Fille Disparue",
  type: 'side',
  category: 'investigation',
  questGiver: 'npc:innkeeper:rosie',
  location: 'prancing-pony-inn',
  region: 'northern-kingdoms',
  summary: "La fille de Rosie a disparu. Retrouvez-la avant qu'il ne soit trop tard.",
  description: "Sarah, la fille de Rosie, n'est pas rentrée hier soir. Elle devait cueillir des champignons dans la forêt. Rosie est folle d'inquiétude. Des rumeurs parlent de disparitions récentes...",
  suggestedLevel: 4,
  
  acts: [
    {
      actNumber: 1,
      title: "L'Enquête",
      description: "Rassembler indices sur la disparition de Sarah.",
      objectives: [
        {
          id: 'obj:interview-witnesses',
          description: "Interroger les dernières personnes à l'avoir vue",
          type: 'talk',
          quantity: 3
        },
        {
          id: 'obj:search-forest',
          description: "Fouiller la forêt où elle cueillait des champignons",
          type: 'explore',
          location: 'whispering-woods'
        },
        {
          id: 'obj:find-clue',
          description: "Trouver indice : panier renversé, traces de lutte",
          type: 'collect',
          target: 'clue:basket'
        }
      ],
      rewards: {
        experience: 100,
        gold: 20
      }
    },
    {
      actNumber: 2,
      title: "La Piste",
      description: "Suivre les indices jusqu'aux ravisseurs.",
      objectives: [
        {
          id: 'obj:goblin-tracks',
          description: "Identifier traces de gobelins menant à des grottes",
          type: 'explore',
          location: 'caves'
        },
        {
          id: 'obj:enter-hideout',
          description: "Infiltrer repaire gobelin",
          type: 'explore',
          location: 'goblin-caves'
        }
      ],
      rewards: {
        experience: 150,
        gold: 30
      }
    },
    {
      actNumber: 3,
      title: "Le Sauvetage",
      description: "Libérer Sarah et les autres prisonniers.",
      objectives: [
        {
          id: 'obj:defeat-goblins',
          description: "Vaincre gobelins gardiens (0/8)",
          type: 'kill',
          target: 'humanoid:goblin',
          quantity: 8
        },
        {
          id: 'obj:rescue-sarah',
          description: "Libérer Sarah de sa cage",
          type: 'choice'
        },
        {
          id: 'obj:rescue-others',
          description: "Libérer autres prisonniers (3 villageois)",
          type: 'choice',
          optional: true
        },
        {
          id: 'obj:escape',
          description: "Escorter prisonniers hors des grottes",
          type: 'escort'
        }
      ],
      choices: [
        {
          id: 'choice:goblin-chief',
          prompt: "Le chef gobelin propose marché : Sarah contre votre équipement magique.",
          options: [
            {
              text: "Accepter l'échange",
              consequence: "Sarah libérée pacifiquement. Vous perdez 1 item magique.",
              itemsLost: ['weapon:magic']
            },
            {
              text: "Refuser et combattre",
              consequence: "Combat contre chef + 5 gobelins. Gardez équipement.",
              itemsGained: ['weapon:goblin-chief:sword']
            },
            {
              text: "Tromper les gobelins avec faux objet",
              consequence: "Jet de Tromperie DD 15. Réussite = tout le monde satisfait.",
              itemsGained: ['gold:goblin-stash']
            }
          ]
        }
      ],
      rewards: {
        experience: 400,
        gold: 150,
        items: ['potion:healing:normal']
      }
    }
  ],
  
  finalRewards: {
    experience: 750,
    gold: 200,
    items: ['ring:rosies-gratitude'],
    reputation: [{ faction: 'faction:common-folk', amount: 150 }],
    unlocks: ['discount:prancing-pony:50%']
  },
  
  loreImpact: "Sarah et les villageois sont sains et saufs. Rosie vous considère comme famille. Vous avez découvert repaire gobelin à nettoyer.",
  timeLimit: 2880 // 48 heures
};

export const SIDE_HAUNTED_MANOR: QuestDefinition = {
  id: 'quest:side:haunted-manor',
  name: "Le Manoir Hanté",
  type: 'side',
  category: 'investigation',
  questGiver: 'npc:noble:blackwood',
  location: 'blackwood-manor',
  region: 'southern-swamps',
  summary: "Le Manoir Blackwood est hanté. Découvrir la source et l'éliminer.",
  description: "Lord Blackwood vous engage pour enquêter sur phénomènes paranormaux dans son manoir ancestral. Serviteurs terrifiés, objets qui bougent seuls, cris la nuit. Il offre récompense généreuse mais quelque chose ne tourne pas rond...",
  suggestedLevel: 7,
  
  acts: [
    {
      actNumber: 1,
      title: "Investigation Initiale",
      description: "Explorer le manoir et identifier nature de la hantise.",
      objectives: [
        {
          id: 'obj:interview-servants',
          description: "Interroger serviteurs sur les phénomènes",
          type: 'talk',
          quantity: 4
        },
        {
          id: 'obj:explore-rooms',
          description: "Inspecter ailes est, ouest et sous-sol",
          type: 'explore',
          location: 'blackwood-manor'
        },
        {
          id: 'obj:find-journal',
          description: "Trouver journal intime de Lady Blackwood (disparue)",
          type: 'collect',
          target: 'book:journal:blackwood'
        }
      ],
      rewards: {
        experience: 250,
        gold: 100
      }
    },
    {
      actNumber: 2,
      title: "Révélations Sombres",
      description: "Découvrir la vérité sur Lady Blackwood et le rituel démoniaque.",
      objectives: [
        {
          id: 'obj:secret-chamber',
          description: "Trouver chambre secrète derrière bibliothèque",
          type: 'explore',
          location: 'blackwood-manor:secret-room'
        },
        {
          id: 'obj:ritual-circle',
          description: "Examiner cercle rituel avec symboles démoniaques",
          type: 'choice'
        },
        {
          id: 'obj:confront-blackwood',
          description: "Affronter Lord Blackwood avec preuves",
          type: 'talk',
          target: 'npc:noble:blackwood'
        }
      ],
      choices: [
        {
          id: 'choice:blackwood-truth',
          prompt: "Lord Blackwood avoue : il a sacrifié sa femme à un démon pour pouvoir éternel. Son esprit hante le manoir. Que faites-vous ?",
          options: [
            {
              text: "Le dénoncer aux autorités",
              consequence: "Blackwood arrêté et exécuté. Manoir confisqué. +200 Couronne.",
              reputationChange: [
                { faction: 'faction:royal-crown', amount: 200 },
                { faction: 'faction:twilight-veil', amount: -100 }
              ],
              nextAct: 3
            },
            {
              text: "Accepter pot-de-vin pour votre silence",
              consequence: "5000 gold mais Blackwood continue pratiques noires. -100 Couronne si découvert.",
              itemsGained: ['gold:bribe:5000'],
              reputationChange: [{ faction: 'faction:twilight-veil', amount: 100 }]
            },
            {
              text: "Le tuer vous-même et libérer l'esprit",
              consequence: "Blackwood mort, esprit apaisé. Vous êtes suspect mais aucune preuve.",
              nextAct: 3,
              itemsGained: ['artifact:blackwood-grimoire']
            },
            {
              text: "Proposer de briser le pacte démoniaque ensemble",
              consequence: "Quête épique débloquée. Dangereux mais rédemption possible.",
              unlocks: ['quest:epic:demon-pact-break']
            }
          ]
        }
      ],
      rewards: {
        experience: 500,
        gold: 250
      }
    },
    {
      actNumber: 3,
      title: "Repos Éternel",
      description: "Libérer l'esprit de Lady Blackwood.",
      objectives: [
        {
          id: 'obj:gather-components',
          description: "Rassembler composants pour rituel d'exorcisme",
          type: 'collect',
          target: 'reagent:holy-water',
          quantity: 3
        },
        {
          id: 'obj:perform-exorcism',
          description: "Effectuer rituel dans chambre secrète",
          type: 'choice'
        },
        {
          id: 'obj:banish-spirit',
          description: "Apaiser/bannir esprit de Lady Blackwood",
          type: 'combat'
        }
      ],
      rewards: {
        experience: 800,
        gold: 500,
        items: ['amulet:spirit-protection']
      }
    }
  ],
  
  finalRewards: {
    experience: 1800,
    gold: 1000,
    items: ['title:ghost-hunter', 'grimoire:exorcism'],
    reputation: [{ faction: 'faction:temple-light', amount: 200 }],
    unlocks: ['quest:side:other-hauntings']
  },
  
  loreImpact: "Le destin du Manoir Blackwood dépend de vos choix. L'esprit est enfin en paix ou le manoir reste maudit.",
  timeLimit: 0
};

// ============================================================================
// QUÊTES RÉPÉTABLES
// ============================================================================

export const REPEATABLE_BOUNTY_HUNT: QuestDefinition = {
  id: 'quest:repeatable:bounty-board',
  name: "Tableau des Primes",
  type: 'repeatable',
  category: 'combat',
  questGiver: 'npc:guard:captain',
  location: 'city-barracks',
  region: 'northern-kingdoms',
  summary: "Éliminer criminels recherchés listés sur le tableau des primes.",
  description: "Le Capitaine Marcus tient à jour liste de criminels dangereux. Rapporter preuves de leur capture/élimination contre récompense.",
  suggestedLevel: 3,
  
  acts: [
    {
      actNumber: 1,
      title: "Chasse à l'Homme",
      description: "Traquer et capturer/éliminer cible désignée.",
      objectives: [
        {
          id: 'obj:track-bounty',
          description: "Localiser criminel recherché",
          type: 'explore'
        },
        {
          id: 'obj:capture-kill',
          description: "Capturer vivant (prime x2) ou éliminer",
          type: 'kill',
          target: 'humanoid:bandit:wanted'
        },
        {
          id: 'obj:return-proof',
          description: "Rapporter preuve (corps/criminel ligoté/badge)",
          type: 'collect',
          target: 'proof:bounty'
        }
      ],
      rewards: {
        experience: 150,
        gold: 100,
        reputation: [{ faction: 'faction:royal-crown', amount: 25 }]
      }
    }
  ],
  
  finalRewards: {
    experience: 150,
    gold: 100,
    reputation: [{ faction: 'faction:royal-crown', amount: 25 }]
  },
  
  loreImpact: "Les routes deviennent plus sûres à chaque criminel capturé.",
  timeLimit: 0
};

export const REPEATABLE_GATHER_HERBS: QuestDefinition = {
  id: 'quest:repeatable:herb-gathering',
  name: "Cueillette d'Herbes Médicinales",
  type: 'repeatable',
  category: 'collection',
  questGiver: 'npc:alchemist:mirabel',
  location: 'arcane-district',
  region: 'northern-kingdoms',
  summary: "Mirabel a constamment besoin d'herbes fraîches pour ses potions.",
  description: "Mirabel paiera bon prix pour herbes médicinales fraîches. Liste change selon saison et besoins.",
  suggestedLevel: 1,
  
  acts: [
    {
      actNumber: 1,
      title: "Récolte",
      description: "Cueillir herbes demandées.",
      objectives: [
        {
          id: 'obj:gather-herbs',
          description: "Rassembler 10 Feuilles d'Argent",
          type: 'collect',
          target: 'herb:silverleaf',
          quantity: 10
        },
        {
          id: 'obj:deliver',
          description: "Livrer herbes à Mirabel",
          type: 'talk',
          target: 'npc:alchemist:mirabel'
        }
      ],
      rewards: {
        experience: 50,
        gold: 30,
        items: ['potion:healing:minor']
      }
    }
  ],
  
  finalRewards: {
    experience: 50,
    gold: 30,
    items: ['potion:healing:minor'],
    reputation: [{ faction: 'faction:arcane-guild', amount: 10 }]
  },
  
  loreImpact: "Mirabel peut continuer ses expériences alchimiques.",
  timeLimit: 0
};

// ============================================================================
// EXPORTS & UTILITIES
// ============================================================================

export const ALL_QUESTS: QuestDefinition[] = [
  // Quêtes principales
  MAIN_DRAGON_AWAKENS,
  // Quêtes de faction
  FACTION_ARCANE_INITIATION,
  FACTION_THIEVES_GUILD_HEIST,
  // Quêtes secondaires
  SIDE_WOLF_PROBLEM,
  SIDE_MISSING_DAUGHTER,
  SIDE_HAUNTED_MANOR,
  // Quêtes répétables
  REPEATABLE_BOUNTY_HUNT,
  REPEATABLE_GATHER_HERBS
];

export const QUESTS_BY_ID: Record<string, QuestDefinition> = ALL_QUESTS.reduce((acc, quest) => {
  acc[quest.id] = quest;
  return acc;
}, {} as Record<string, QuestDefinition>);

export const QUESTS_BY_TYPE: Record<QuestType, QuestDefinition[]> = ALL_QUESTS.reduce((acc, quest) => {
  if (!acc[quest.type]) acc[quest.type] = [];
  acc[quest.type].push(quest);
  return acc;
}, {} as Record<QuestType, QuestDefinition[]>);

export const QUESTS_BY_CATEGORY: Record<QuestCategory, QuestDefinition[]> = ALL_QUESTS.reduce((acc, quest) => {
  if (!acc[quest.category]) acc[quest.category] = [];
  acc[quest.category].push(quest);
  return acc;
}, {} as Record<QuestCategory, QuestDefinition[]>);

/**
 * Trouve quêtes disponibles pour un joueur
 */
export function getAvailableQuests(
  playerLevel: number,
  completedQuests: string[],
  factionReps?: Record<string, number>
): QuestDefinition[] {
  return ALL_QUESTS.filter(quest => {
    // Niveau requis
    if (quest.suggestedLevel > playerLevel + 2) return false;
    
    // Déjà complétée (sauf répétables)
    if (quest.type !== 'repeatable' && completedQuests.includes(quest.id)) return false;
    
    // Prérequis
    if (quest.prerequisites) {
      // Niveau
      if (quest.prerequisites.level && playerLevel < quest.prerequisites.level) return false;
      
      // Quêtes préalables
      if (quest.prerequisites.quests) {
        const hasAllQuests = quest.prerequisites.quests.every(q => completedQuests.includes(q));
        if (!hasAllQuests) return false;
      }
      
      // Réputation faction
      if (quest.prerequisites.faction && factionReps) {
        const rep = factionReps[quest.prerequisites.faction.id] || 0;
        if (rep < quest.prerequisites.faction.reputation) return false;
      }
    }
    
    return true;
  });
}

/**
 * Calcule récompenses totales d'une quête
 */
export function calculateTotalRewards(quest: QuestDefinition): QuestReward {
  let totalExp = quest.finalRewards.experience;
  let totalGold = quest.finalRewards.gold;
  const allItems: string[] = [...(quest.finalRewards.items || [])];
  
  quest.acts.forEach(act => {
    if (act.rewards) {
      totalExp += act.rewards.experience || 0;
      totalGold += act.rewards.gold || 0;
      if (act.rewards.items) allItems.push(...act.rewards.items);
    }
  });
  
  return {
    experience: totalExp,
    gold: totalGold,
    items: allItems,
    reputation: quest.finalRewards.reputation
  };
}

/**
 * Vérifie si quête a dépassé limite de temps
 */
export function isQuestExpired(quest: QuestDefinition, startTime: number): boolean {
  if (!quest.timeLimit || quest.timeLimit === 0) return false;
  const elapsed = (Date.now() - startTime) / 60000; // Minutes
  return elapsed > quest.timeLimit;
}

/**
 * Obtient quêtes par donneur
 */
export function getQuestsByGiver(giverId: string): QuestDefinition[] {
  return ALL_QUESTS.filter(q => q.questGiver === giverId);
}

/**
 * Obtient prochaine quête dans chaîne
 */
export function getNextQuestInChain(currentQuest: QuestDefinition): QuestDefinition | null {
  // Cherche quêtes qui ont currentQuest en prérequis
  const nextQuest = ALL_QUESTS.find(q => 
    q.prerequisites?.quests?.includes(currentQuest.id)
  );
  
  return nextQuest || null;
}
