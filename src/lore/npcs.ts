/**
 * AETHELGARD NPCs - Personnages Non-Joueurs
 * 50+ PNJs uniques avec personnalités, inventaires et services
 */

import type { BiomeType } from './resources';

// ============================================================================
// TYPES
// ============================================================================

export type NPCRole = 
  | 'merchant' 
  | 'questgiver' 
  | 'trainer' 
  | 'innkeeper' 
  | 'blacksmith' 
  | 'alchemist'
  | 'enchanter'
  | 'guard'
  | 'noble'
  | 'ally'
  | 'enemy'
  | 'neutral';

export type NPCPersonality = 
  | 'friendly' 
  | 'grumpy' 
  | 'mysterious' 
  | 'greedy' 
  | 'helpful' 
  | 'paranoid'
  | 'jovial'
  | 'arrogant'
  | 'humble'
  | 'eccentric';

export interface NPCDialogue {
  trigger: 'greeting' | 'farewell' | 'trade' | 'quest' | 'idle' | 'combat';
  text: string;
  conditions?: string; // Conditions pour déclencher ce dialogue
}

export interface MerchantInventory {
  itemId: string;
  stock: number; // -1 = illimité
  priceMultiplier: number; // 1.0 = prix de base, 1.5 = +50%, etc.
  restockTime?: number; // Minutes avant restock
}

export interface NPCService {
  type: 'repair' | 'train' | 'enchant' | 'identify' | 'rest' | 'stable' | 'bank';
  description: string;
  cost: number;
  requirements?: string;
}

export interface NPCDefinition {
  id: string;
  name: string;
  title?: string;
  role: NPCRole;
  personality: NPCPersonality;
  
  // Localisation
  location: string; // ID du lieu
  region: string;
  
  // Apparence & lore
  description: string;
  appearance: string;
  backstory?: string;
  
  // Faction & réputation
  faction?: string;
  reputationRequired?: number; // Réputation minimale pour interagir
  
  // Commerce
  inventory?: MerchantInventory[];
  services?: NPCService[];
  
  // Quêtes
  quests?: string[]; // IDs des quêtes disponibles
  
  // Dialogues
  dialogues: NPCDialogue[];
  
  // Relations
  allies?: string[]; // IDs de NPCs alliés
  enemies?: string[]; // IDs de NPCs ennemis
  
  // Combat (si hostile)
  isHostile?: boolean;
  creatureTemplate?: string; // ID créature pour stats de combat
}

// ============================================================================
// MARCHANDS GÉNÉRAUX
// ============================================================================

export const MERCHANT_ALDRIC: NPCDefinition = {
  id: 'npc:merchant:aldric',
  name: "Aldric le Marchand",
  title: "Commerçant Itinérant",
  role: 'merchant',
  personality: 'jovial',
  location: 'eldoria-market',
  region: 'northern-kingdoms',
  description: "Marchand jovial au ventre rond, toujours souriant. Vend de tout, des épées aux pommes.",
  appearance: "Homme d'âge mûr, cheveux gris, vêtu de rouge et or. Porte une balance dorée à sa ceinture.",
  backstory: "Ancien aventurier devenu marchand après avoir perdu sa jambe contre un dragon. Ses histoires sont légendaires.",
  inventory: [
    { itemId: 'weapon:sword:iron', stock: 3, priceMultiplier: 1.2 },
    { itemId: 'armor:chest:leather', stock: 5, priceMultiplier: 1.1 },
    { itemId: 'potion:healing:minor', stock: 20, priceMultiplier: 1.0 },
    { itemId: 'food:bread', stock: -1, priceMultiplier: 1.0 },
    { itemId: 'tool:rope', stock: 10, priceMultiplier: 1.0 }
  ],
  dialogues: [
    {
      trigger: 'greeting',
      text: "Bienvenue, voyageur ! Aldric a tout ce qu'il vous faut. Des armes ? Des provisions ? Une histoire de dragon ?"
    },
    {
      trigger: 'trade',
      text: "Voyons voir... *ajuste ses lunettes* Oui, oui, j'ai exactement ce qu'il vous faut !"
    },
    {
      trigger: 'farewell',
      text: "Que les vents vous soient favorables, ami ! Revenez quand votre bourse sera pleine !"
    },
    {
      trigger: 'idle',
      text: "Saviez-vous que j'ai survécu à un dragon ? Ah, c'était en 1247... *commence une longue histoire*"
    }
  ]
};

export const MERCHANT_SYLVANA: NPCDefinition = {
  id: 'npc:merchant:sylvana',
  name: "Sylvana Duskweaver",
  title: "Tisserande de Nuit",
  role: 'merchant',
  personality: 'mysterious',
  location: 'shadowfen-bazaar',
  region: 'southern-swamps',
  description: "Elfe mystérieuse vendant tissus rares et vêtements enchantés. Parle peu mais ses produits sont exceptionnels.",
  appearance: "Elfe aux cheveux noirs de jais, yeux violets perçants. Vêtements de soie sombre brodés de runes argentées.",
  backstory: "Ancienne apprentie de l'Ordre du Voile. A quitté l'ordre dans des circonstances mystérieuses. Ses créations sont imprégnées de magie subtile.",
  faction: 'faction:twilight-veil',
  inventory: [
    { itemId: 'armor:robe:silk', stock: 2, priceMultiplier: 1.5 },
    { itemId: 'armor:cloak:enchanted', stock: 1, priceMultiplier: 2.0, restockTime: 2880 },
    { itemId: 'cloth:silk', stock: 20, priceMultiplier: 1.3 },
    { itemId: 'cloth:ethereal', stock: 5, priceMultiplier: 3.0, restockTime: 1440 }
  ],
  services: [
    {
      type: 'enchant',
      description: "Tisser des enchantements dans vos vêtements (+1 slot enchantement)",
      cost: 500,
      requirements: "Vêtement en soie ou mieux"
    }
  ],
  dialogues: [
    {
      trigger: 'greeting',
      text: "... *lève les yeux de son métier* Vous cherchez quelque chose de... particulier ?"
    },
    {
      trigger: 'trade',
      text: "*effleure le tissu* Cette pièce m'a pris trois nuits sous la lune. Elle vaut son prix."
    },
    {
      trigger: 'farewell',
      text: "*retourne à son travail sans un mot*"
    }
  ]
};

// ============================================================================
// FORGERONS & ARTISANS
// ============================================================================

export const BLACKSMITH_BROM: NPCDefinition = {
  id: 'npc:blacksmith:brom',
  name: "Brom Martelpoing",
  title: "Maître Forgeron",
  role: 'blacksmith',
  personality: 'grumpy',
  location: 'ironhold-forge',
  region: 'northern-kingdoms',
  description: "Nain bourru au caractère de fer. Le meilleur forgeron à 100 lieues à la ronde, et il le sait.",
  appearance: "Nain massif, barbe rousse tressée, muscles comme des câbles d'acier. Toujours couvert de suie.",
  backstory: "Forgea l'épée du roi actuel. Perdit son fils dans la Guerre des Cendres, depuis lors travaille jour et nuit.",
  faction: 'faction:steel-brotherhood',
  inventory: [
    { itemId: 'weapon:longsword:steel', stock: 2, priceMultiplier: 1.0 },
    { itemId: 'weapon:warhammer:iron', stock: 3, priceMultiplier: 1.0 },
    { itemId: 'armor:chest:plate', stock: 1, priceMultiplier: 1.2, restockTime: 1440 },
    { itemId: 'ore:iron', stock: 50, priceMultiplier: 0.8 },
    { itemId: 'ore:steel', stock: 20, priceMultiplier: 0.9 }
  ],
  services: [
    {
      type: 'repair',
      description: "Réparer équipement métallique (restaure 100% durabilité)",
      cost: 50
    },
    {
      type: 'train',
      description: "Formation Forge (débloque métier Smithing)",
      cost: 100,
      requirements: "Force 12+"
    }
  ],
  dialogues: [
    {
      trigger: 'greeting',
      text: "*grogne sans lever les yeux du marteau* Qu'est-ce tu veux ? Si c'est pas important, dégage."
    },
    {
      trigger: 'trade',
      text: "Ouais, c'est du bon acier. Forgé à la main, pas cette camelote magique. *crache*"
    },
    {
      trigger: 'farewell',
      text: "*retourne à l'enclume en marmonnant*"
    },
    {
      trigger: 'idle',
      text: "Les jeunes aujourd'hui... savent même plus tenir un marteau correctement. *secoue la tête*"
    }
  ]
};

export const ALCHEMIST_MIRABEL: NPCDefinition = {
  id: 'npc:alchemist:mirabel',
  name: "Mirabel Fleurdelune",
  title: "Maîtresse Alchimiste",
  role: 'alchemist',
  personality: 'eccentric',
  location: 'arcane-district',
  region: 'northern-kingdoms',
  description: "Alchimiste excentrique entourée de fioles bouillonnantes et vapeurs colorées. Parle à ses potions.",
  appearance: "Femme d'âge indéterminé, cheveux violets hérissés, taches de couleur partout. Lunettes déformées par les vapeurs.",
  backstory: "Ancienne professeur à l'Académie Arcane. Préféra la liberté de l'expérimentation à la rigueur académique. Ses découvertes sont révolutionnaires... et dangereuses.",
  faction: 'faction:arcane-guild',
  reputationRequired: 50,
  inventory: [
    { itemId: 'potion:healing:normal', stock: 15, priceMultiplier: 0.9 },
    { itemId: 'potion:mana:normal', stock: 10, priceMultiplier: 0.9 },
    { itemId: 'potion:strength', stock: 5, priceMultiplier: 1.2 },
    { itemId: 'potion:invisibility', stock: 2, priceMultiplier: 2.5, restockTime: 2880 },
    { itemId: 'herb:silverleaf', stock: 30, priceMultiplier: 0.8 },
    { itemId: 'herb:dreamfoil', stock: 15, priceMultiplier: 1.0 }
  ],
  services: [
    {
      type: 'train',
      description: "Formation Alchimie (débloque métier Alchemy)",
      cost: 150,
      requirements: "Intelligence 13+"
    },
    {
      type: 'identify',
      description: "Identifier potion inconnue",
      cost: 25
    }
  ],
  dialogues: [
    {
      trigger: 'greeting',
      text: "Oh ! Un visiteur ! *renverse une fiole* Ne vous inquiétez pas, ce n'était que de l'acide... mineur."
    },
    {
      trigger: 'trade',
      text: "*chuchote à une potion* Oui, oui, tu vas avoir un nouveau maître. Sois sage ! *vous tend la fiole*"
    },
    {
      trigger: 'farewell',
      text: "Revenez me voir ! J'aurai peut-être inventé quelque chose d'encore plus... *BOUM* ...explosif."
    },
    {
      trigger: 'idle',
      text: "*marmonne en remuant un chaudron* Trois gouttes de lune, une pincée d'étoile... non, attends, c'était l'inverse..."
    }
  ]
};

// ============================================================================
// DONNEURS DE QUÊTES
// ============================================================================

export const QUESTGIVER_ELENA: NPCDefinition = {
  id: 'npc:quest:elena',
  name: "Dame Elena Casteleyn",
  title: "Intendante Royale",
  role: 'questgiver',
  personality: 'helpful',
  location: 'royal-palace',
  region: 'northern-kingdoms',
  description: "Noble élégante chargée des affaires du royaume. Toujours débordée mais garde son calme.",
  appearance: "Femme élégante d'une quarantaine d'années, cheveux châtains relevés, robe bleue royale. Port altier.",
  backstory: "Fille d'un duc, éduquée à la cour. Devint Intendante Royale après avoir déjoué un complot. Le roi lui fait entièrement confiance.",
  faction: 'faction:royal-crown',
  quests: ['quest:missing-caravan', 'quest:goblin-threat', 'quest:royal-artifact'],
  dialogues: [
    {
      trigger: 'greeting',
      text: "Bonjour, aventurier. Le royaume a besoin de gens compétents comme vous. Puis-je compter sur votre aide ?"
    },
    {
      trigger: 'quest',
      text: "Voici la situation... *déroule un parchemin* J'ai besoin de quelqu'un de discret et efficace."
    },
    {
      trigger: 'farewell',
      text: "Que la Couronne vous protège. Revenez me voir une fois votre mission accomplie."
    }
  ]
};

export const QUESTGIVER_OLD_MARCUS: NPCDefinition = {
  id: 'npc:quest:marcus',
  name: "Vieux Marcus",
  title: "Fermier",
  role: 'questgiver',
  personality: 'humble',
  location: 'riverside-farm',
  region: 'northern-kingdoms',
  description: "Vieux fermier au dos courbé par le labeur. Mains calleuses, regard inquiet.",
  appearance: "Homme âgé, cheveux blancs rares, vêtements rapiécés. Appuyé sur un bâton noueux.",
  backstory: "Ferme ses terres depuis 50 ans. A vu le royaume prospérer et décliner. Sa femme est morte l'année dernière, ses fils sont partis à la guerre.",
  quests: ['quest:wolf-problem', 'quest:stolen-livestock'],
  dialogues: [
    {
      trigger: 'greeting',
      text: "*lève la tête péniblement* Oh, un voyageur... Vous tombez bien, j'ai des problèmes avec les loups..."
    },
    {
      trigger: 'quest',
      text: "J'peux pas vous payer grand-chose, mais si vous m'aidez, j'vous donnerai ce que j'ai."
    },
    {
      trigger: 'farewell',
      text: "Merci, jeune. Que les dieux vous bénissent."
    }
  ]
};

export const QUESTGIVER_MYSTERIOUS_STRANGER: NPCDefinition = {
  id: 'npc:quest:stranger',
  name: "L'Étranger Encapuchonné",
  title: "???",
  role: 'questgiver',
  personality: 'mysterious',
  location: 'shadowy-alley',
  region: 'northern-kingdoms',
  description: "Silhouette indistincte dans l'ombre. Impossible de voir son visage sous la capuche profonde.",
  appearance: "Cape noire, capuche cachant tout le visage. Seuls deux yeux brillants sont visibles.",
  backstory: "Nul ne connaît sa véritable identité. Apparaît et disparaît comme une ombre. Ses quêtes sont dangereuses mais lucratives.",
  faction: 'faction:twilight-veil',
  reputationRequired: 100,
  quests: ['quest:shadow-artifact', 'quest:assassination', 'quest:heist'],
  dialogues: [
    {
      trigger: 'greeting',
      text: "*voix rauque de l'ombre* Je vous attendais... Vous avez la réputation d'être... discret."
    },
    {
      trigger: 'quest',
      text: "Cette mission est délicate. Aucune trace, aucun témoin. Compris ?"
    },
    {
      trigger: 'farewell',
      text: "*disparaît dans l'ombre* Nous nous reverrons..."
    }
  ]
};

// ============================================================================
// ENTRAÎNEURS
// ============================================================================

export const TRAINER_SWORD_MASTER: NPCDefinition = {
  id: 'npc:trainer:roland',
  name: "Maître Roland",
  title: "Maître d'Armes",
  role: 'trainer',
  personality: 'arrogant',
  location: 'training-grounds',
  region: 'northern-kingdoms',
  description: "Ancien champion de tournoi, maintenant forme la garde royale. Arrogant mais compétent.",
  appearance: "Homme dans la force de l'âge, cicatrice en travers du visage. Armure d'entraînement polie. Posture martiale.",
  backstory: "Champion invaincu de 15 tournois consécutifs. Prit sa retraite après avoir perdu contre un jeune prodige. Depuis, cherche à former le prochain champion.",
  faction: 'faction:royal-crown',
  services: [
    {
      type: 'train',
      description: "Entraînement Combat à l'Épée (+1 Compétence Épée)",
      cost: 200,
      requirements: "Force 12+, Dextérité 10+"
    },
    {
      type: 'train',
      description: "Entraînement Technique Avancée (débloquer feat)",
      cost: 500,
      requirements: "Niveau 5+, Compétence Épée 3+"
    }
  ],
  dialogues: [
    {
      trigger: 'greeting',
      text: "*vous jauge du regard* Vous voulez apprendre ? Bien. Montrez-moi d'abord si vous en êtes digne. En garde !"
    },
    {
      trigger: 'idle',
      text: "*effectue des moulinets parfaits* La perfection n'est pas un but, c'est un mode de vie."
    }
  ]
};

export const TRAINER_ARCHMAGE_THALION: NPCDefinition = {
  id: 'npc:trainer:thalion',
  name: "Archimage Thalion",
  title: "Grand Érudit",
  role: 'trainer',
  personality: 'arrogant',
  location: 'arcane-academy',
  region: 'northern-kingdoms',
  description: "Elfe érudit à l'intelligence remarquable. Méprise ceux qu'il juge inférieurs intellectuellement.",
  appearance: "Elfe grand et mince, cheveux argentés, robes bleues brodées de constellations. Staff de cristal.",
  backstory: "Né il y a 300 ans, a étudié sous les plus grands mages. Maîtrise 47 sorts de niveau 9. Son seul échec : n'a jamais réussi la Pierre Philosophale.",
  faction: 'faction:arcane-guild',
  reputationRequired: 200,
  services: [
    {
      type: 'train',
      description: "Enseigner sort niveau 1-3",
      cost: 300,
      requirements: "Intelligence 15+"
    },
    {
      type: 'train',
      description: "Enseigner sort niveau 4-6",
      cost: 800,
      requirements: "Intelligence 17+, Arcana 5+"
    },
    {
      type: 'train',
      description: "Enseigner sort niveau 7-9",
      cost: 2000,
      requirements: "Intelligence 20+, Arcana 10+"
    },
    {
      type: 'identify',
      description: "Identifier objet magique",
      cost: 50
    }
  ],
  dialogues: [
    {
      trigger: 'greeting',
      text: "*à peine un regard* Encore un qui vient quémander du savoir. Très bien. Prouvez que vous en êtes digne."
    },
    {
      trigger: 'idle',
      text: "*lit un grimoire ancien* ...fascinant. Cette incantation de 3e ère est bien plus élégante que la version moderne..."
    }
  ]
};

// ============================================================================
// AUBERGISTES & SERVICES
// ============================================================================

export const INNKEEPER_ROSIE: NPCDefinition = {
  id: 'npc:innkeeper:rosie',
  name: "Rosie Barrelpour",
  title: "Aubergiste",
  role: 'innkeeper',
  personality: 'jovial',
  location: 'prancing-pony-inn',
  region: 'northern-kingdoms',
  description: "Halfling chaleureuse tenant l'auberge la plus accueillante du royaume. Son ragoût est légendaire.",
  appearance: "Halfling ronde au visage jovial, tablier toujours couvert de farine. Cheveux bouclés attachés en chignon.",
  backstory: "A hérité l'auberge de sa mère. Transformé un taudis en l'établissement le plus prospère de la ville. Connaît tous les ragots du royaume.",
  inventory: [
    { itemId: 'food:bread', stock: -1, priceMultiplier: 1.0 },
    { itemId: 'food:stew', stock: -1, priceMultiplier: 1.2 },
    { itemId: 'drink:ale', stock: -1, priceMultiplier: 1.0 },
    { itemId: 'drink:wine', stock: 20, priceMultiplier: 1.5 }
  ],
  services: [
    {
      type: 'rest',
      description: "Chambre confortable pour la nuit (repos complet)",
      cost: 10
    },
    {
      type: 'rest',
      description: "Suite de luxe (repos complet + buff +1 tous stats 8h)",
      cost: 50
    }
  ],
  dialogues: [
    {
      trigger: 'greeting',
      text: "Bienvenue au Poney Fringant, cher ! Entrez, entrez ! Vous avez l'air affamé. Mon ragoût va arranger ça !"
    },
    {
      trigger: 'trade',
      text: "*remplit une assiette fumante* Voilà ! Fait avec amour, comme toujours !"
    },
    {
      trigger: 'idle',
      text: "Vous avez entendu les nouvelles ? Paraît que le dragon du nord s'est réveillé ! *baisse la voix*"
    }
  ]
};

// ============================================================================
// ALLIÉS & COMPAGNONS POTENTIELS
// ============================================================================

export const ALLY_THERON: NPCDefinition = {
  id: 'npc:ally:theron',
  name: "Theron Stormcaller",
  title: "Mage de Guerre",
  role: 'ally',
  personality: 'friendly',
  location: 'wandering',
  region: 'various',
  description: "Mage de combat expérimenté cherchant aventuriers compétents pour former un groupe.",
  appearance: "Homme d'une trentaine d'années, cheveux noirs, barbe naissante. Robes de combat fonctionnelles.",
  backstory: "Ancien soldat devenu mage après la guerre. A vu trop d'amis mourir. Cherche désormais à protéger les innocents plutôt que servir les nobles.",
  faction: 'faction:arcane-guild',
  creatureTemplate: 'humanoid:mage:combat',
  dialogues: [
    {
      trigger: 'greeting',
      text: "Salutations. J'ai entendu parler de vos exploits. Peut-être devrions-nous unir nos forces ?"
    },
    {
      trigger: 'combat',
      text: "Couvrez-moi ! Je prépare un sort dévastateur !"
    }
  ],
  allies: ['npc:ally:lyra']
};

export const ALLY_LYRA: NPCDefinition = {
  id: 'npc:ally:lyra',
  name: "Lyra Swiftarrow",
  title: "Ranger",
  role: 'ally',
  personality: 'friendly',
  location: 'wandering',
  region: 'forest',
  description: "Ranger experte en survie et pistage. Protège les forêts et leurs créatures.",
  appearance: "Elfe aux cheveux auburn, yeux verts perçants. Armure de cuir vert, arc en bois d'if.",
  backstory: "Élevée par les rangers après que sa famille fut tuée par des braconniers. A juré de protéger la nature.",
  faction: 'faction:emerald-wardens',
  creatureTemplate: 'humanoid:ranger:elite',
  dialogues: [
    {
      trigger: 'greeting',
      text: "La forêt m'a parlé de vous. Elle dit que vous respectez la nature. C'est bien."
    },
    {
      trigger: 'combat',
      text: "*décoche rapidement trois flèches* Continuez d'avancer, je couvre vos arrières !"
    }
  ],
  allies: ['npc:ally:theron']
};

// ============================================================================
// BOSS & ENNEMIS NOMMÉS
// ============================================================================

export const ENEMY_BANDIT_KING: NPCDefinition = {
  id: 'npc:enemy:bandit-king',
  name: "Gareth Lamedenfer",
  title: "Roi des Bandits",
  role: 'enemy',
  personality: 'arrogant',
  location: 'bandit-hideout',
  region: 'forest',
  description: "Chef charismatique d'une bande de 50+ brigands. Ancien chevalier déchu.",
  appearance: "Homme imposant, cicatrices de bataille, armure noire dérobée. Cape rouge sang. Épée nommée 'Veuve'.",
  backstory: "Ancien chevalier déshonoré après avoir refusé un ordre immoral. Rassembla les exclus et forme maintenant une armée de l'ombre.",
  faction: 'faction:shadow-brotherhood',
  isHostile: true,
  creatureTemplate: 'humanoid:bandit:boss',
  dialogues: [
    {
      trigger: 'greeting',
      text: "Tiens, tiens... des héros. *ricane* Vous êtes venus pour ma tête ? Venez la prendre !"
    },
    {
      trigger: 'combat',
      text: "*brandit son épée* Pour la liberté ! Pour ceux qu'on a rejetés ! EN AVANT !"
    }
  ],
  enemies: ['npc:quest:elena', 'faction:royal-crown']
};

export const ENEMY_NECROMANCER: NPCDefinition = {
  id: 'npc:enemy:malachar',
  name: "Malachar le Nécromancien",
  title: "Seigneur des Morts",
  role: 'enemy',
  personality: 'arrogant',
  location: 'cursed-tower',
  region: 'swamp',
  description: "Nécromancien fou cherchant à créer une armée de morts-vivants pour conquérir le royaume.",
  appearance: "Silhouette émaciée en robes noires déchiquetées. Yeux brillant d'une lueur verte maladive. Odeur de putréfaction.",
  backstory: "Ancien archimage banni de l'Académie Arcane après avoir pratiqué la nécromancie interdite. Jure de se venger.",
  faction: 'faction:necromancers-cult',
  isHostile: true,
  creatureTemplate: 'undead:necromancer:master',
  dialogues: [
    {
      trigger: 'greeting',
      text: "*rire sinistre* Des vivants... Parfait. J'ai toujours besoin de nouveaux sujets pour mes expériences."
    },
    {
      trigger: 'combat',
      text: "Levez-vous, mes serviteurs ! Montrez à ces insectes la puissance de la mort éternelle !"
    }
  ],
  enemies: ['faction:arcane-guild', 'faction:royal-crown', 'faction:temple-light']
};

// ============================================================================
// GARDES & AUTORITÉS
// ============================================================================

export const GUARD_CAPTAIN: NPCDefinition = {
  id: 'npc:guard:captain',
  name: "Capitaine Marcus Steelhelm",
  title: "Capitaine de la Garde",
  role: 'guard',
  personality: 'helpful',
  location: 'city-barracks',
  region: 'northern-kingdoms',
  description: "Vétéran commandant la garde municipale. Strict mais juste.",
  appearance: "Homme d'âge mûr, cheveux gris coupés court, armure de plates impeccable. Cicatrice sur le menton.",
  backstory: "30 ans de service. Protège la ville comme sa propre famille. Respecté autant qu'il est craint des criminels.",
  faction: 'faction:royal-crown',
  dialogues: [
    {
      trigger: 'greeting',
      text: "Aventurier. Bienvenue dans notre ville. Je vous préviens : zéro tolérance pour le désordre. Clair ?"
    },
    {
      trigger: 'idle',
      text: "*surveille la rue d'un œil vigilant* Tout semble calme... pour l'instant."
    }
  ]
};

// ============================================================================
// MARCHANDS SPÉCIALISÉS (suite)
// ============================================================================

export const MERCHANT_WEAPONS: NPCDefinition = {
  id: 'npc:merchant:armand',
  name: "Armand L'Armurier",
  role: 'merchant',
  personality: 'grumpy',
  location: 'weapon-shop',
  region: 'northern-kingdoms',
  description: "Marchand d'armes spécialisé. Vend uniquement le meilleur équipement de combat.",
  appearance: "Homme trapu, borgne, moustache épaisse. Toujours armé jusqu'aux dents.",
  inventory: [
    { itemId: 'weapon:longsword:steel', stock: 4, priceMultiplier: 1.1 },
    { itemId: 'weapon:greataxe:steel', stock: 2, priceMultiplier: 1.2 },
    { itemId: 'weapon:crossbow:heavy', stock: 3, priceMultiplier: 1.3 },
    { itemId: 'weapon:dagger:mithril', stock: 1, priceMultiplier: 2.0, restockTime: 2880 }
  ],
  dialogues: [
    { trigger: 'greeting', text: "Des armes ? Vous êtes au bon endroit. Tout ici est testé personnellement." },
    { trigger: 'trade', text: "*tape l'arme* Solide. Équilibrée. Mortelle. Prenez-la." }
  ]
};

export const MERCHANT_POTION_SELLER: NPCDefinition = {
  id: 'npc:merchant:griselda',
  name: "Griselda la Sorcière",
  title: "Vendeuse de Potions",
  role: 'merchant',
  personality: 'eccentric',
  location: 'swamp-hut',
  region: 'southern-swamps',
  description: "Vieille femme vivant dans les marais. Potions douteuses mais efficaces.",
  appearance: "Vieille femme voûtée, verrue sur le nez, doigts crochus. Rit toute seule.",
  inventory: [
    { itemId: 'potion:healing:greater', stock: 8, priceMultiplier: 0.8 },
    { itemId: 'potion:poison:deadly', stock: 5, priceMultiplier: 1.5 },
    { itemId: 'potion:transformation:frog', stock: 2, priceMultiplier: 3.0 },
    { itemId: 'reagent:eye-of-newt', stock: 20, priceMultiplier: 1.0 }
  ],
  dialogues: [
    { trigger: 'greeting', text: "*caquètement* Hehe ! Un client ! Tu veux des potions, oui ? J'ai ce qu'il faut..." },
    { trigger: 'idle', text: "*remue chaudron* Œil de crapaud, langue de chauve-souris... *marmonne*" }
  ]
};

export const MERCHANT_JEWELER: NPCDefinition = {
  id: 'npc:merchant:ezio',
  name: "Ezio Brillantine",
  title: "Joaillier",
  role: 'merchant',
  personality: 'greedy',
  location: 'jewel-emporium',
  region: 'northern-kingdoms',
  description: "Joaillier raffiné aux prix exorbitants. Qualité inégalée mais avare.",
  appearance: "Homme élégant, monocle doré, costume de soie. Doigts couverts de bagues.",
  reputationRequired: 100,
  inventory: [
    { itemId: 'jewelry:ring:silver', stock: 5, priceMultiplier: 1.5 },
    { itemId: 'jewelry:necklace:ruby', stock: 2, priceMultiplier: 2.0 },
    { itemId: 'gem:diamond', stock: 3, priceMultiplier: 2.5 },
    { itemId: 'jewelry:crown:diamond', stock: 1, priceMultiplier: 5.0, restockTime: 10080 }
  ],
  dialogues: [
    { trigger: 'greeting', text: "*regarde à travers monocle* Mmm... vous avez les moyens de mes produits ?" },
    { trigger: 'trade', text: "Cette pièce est unique. Un vrai chef-d'œuvre. Le prix reflète sa valeur." }
  ]
};

export const MERCHANT_RARE_BOOKS: NPCDefinition = {
  id: 'npc:merchant:theodore',
  name: "Théodore Pageturner",
  title: "Libraire Ancien",
  role: 'merchant',
  personality: 'helpful',
  location: 'ancient-library',
  region: 'northern-kingdoms',
  description: "Vieil érudit gardien de connaissances anciennes. Vend livres et parchemins rares.",
  appearance: "Vieil homme maigre, lunettes épaisses, robe poussiéreuse. Toujours un livre en main.",
  faction: 'faction:arcane-guild',
  inventory: [
    { itemId: 'scroll:fireball', stock: 3, priceMultiplier: 1.2 },
    { itemId: 'tome:spellbook', stock: 2, priceMultiplier: 1.5 },
    { itemId: 'scroll:teleportation', stock: 1, priceMultiplier: 3.0, restockTime: 4320 },
    { itemId: 'book:history:ancient', stock: 5, priceMultiplier: 1.0 }
  ],
  services: [
    { type: 'identify', description: "Déchiffrer texte ancien", cost: 100 }
  ],
  dialogues: [
    { trigger: 'greeting', text: "*lève les yeux* Ah ! Un chercheur de savoir. Bienvenue dans mon humble collection." },
    { trigger: 'idle', text: "*tourne pages délicatement* Fascinant... ce manuscrit date de la 2e ère..." }
  ]
};

// ============================================================================
// NOBLES & AUTORITÉS (suite)
// ============================================================================

export const NOBLE_LORD_BLACKWOOD: NPCDefinition = {
  id: 'npc:noble:blackwood',
  name: "Lord Damien Blackwood",
  title: "Baron de Shadowfen",
  role: 'noble',
  personality: 'arrogant',
  location: 'blackwood-manor',
  region: 'southern-swamps',
  description: "Noble corrompu régnant sur les marais. Rumeurs de pactes démoniaques.",
  appearance: "Homme pâle aux cheveux noirs, yeux froids. Vêtements sombres luxueux.",
  backstory: "Famille noble autrefois respectable. Damien a conclu pacte avec entités ténébreuses pour prolonger sa vie. Règne par la peur.",
  faction: 'faction:twilight-veil',
  isHostile: false,
  quests: ['quest:manor-mystery', 'quest:demonic-pact'],
  dialogues: [
    { trigger: 'greeting', text: "*sourire froid* Bienvenue dans mon humble demeure. J'espère que vous respectez... l'étiquette." },
    { trigger: 'idle', text: "*regarde par la fenêtre* Le pouvoir a un prix. Certains sont prêts à le payer..." }
  ]
};

export const NOBLE_PRINCESS_ARIA: NPCDefinition = {
  id: 'npc:noble:aria',
  name: "Princesse Aria Lumière-d'Aube",
  title: "Héritière du Royaume",
  role: 'noble',
  personality: 'friendly',
  location: 'royal-palace',
  region: 'northern-kingdoms',
  description: "Princesse idéaliste voulant aider son peuple. Souvent en désaccord avec la cour.",
  appearance: "Jeune femme blonde, couronne simple, robe pratique plutôt qu'ostentatoire.",
  backstory: "Contrairement à son père, veut réformer le royaume. S'entraîne secrètement au combat. Le peuple l'adore.",
  faction: 'faction:royal-crown',
  quests: ['quest:peoples-champion', 'quest:reform-laws'],
  dialogues: [
    { trigger: 'greeting', text: "Bonjour ! Pas de formalités, je vous prie. Je préfère parler d'égal à égal." },
    { trigger: 'quest', text: "Mon père refuse d'écouter. Peut-être que si je lui prouve... Voulez-vous m'aider ?" }
  ]
};

export const JUDGE_GRIMWALD: NPCDefinition = {
  id: 'npc:authority:grimwald',
  name: "Juge Grimwald",
  title: "Grand Inquisiteur",
  role: 'neutral',
  personality: 'paranoid',
  location: 'court-house',
  region: 'northern-kingdoms',
  description: "Inquisiteur zélé chassant hérétiques et pratiques interdites. Aucune pitié.",
  appearance: "Homme austère en robe noire, symbole du jugement brodé. Regard perçant.",
  faction: 'faction:temple-light',
  isHostile: false,
  dialogues: [
    { trigger: 'greeting', text: "*vous jauge* Vous n'avez rien à cacher, j'espère ? La Lumière révèle tout mensonge." },
    { trigger: 'idle', text: "*lit liste* Hérétiques capturés ce mois : 47. Pas assez. Les ténèbres se répandent..." }
  ]
};

// ============================================================================
// ARTISANS SPÉCIALISÉS (suite)
// ============================================================================

export const ENCHANTER_MYSTRAL: NPCDefinition = {
  id: 'npc:enchanter:mystral',
  name: "Mystral Runeetcher",
  title: "Maître Enchanteur",
  role: 'enchanter',
  personality: 'mysterious',
  location: 'enchanting-sanctum',
  region: 'northern-kingdoms',
  description: "Enchanteur énigmatique maîtrisant runes anciennes. Prix élevés mais travail exceptionnel.",
  appearance: "Androgyne aux traits délicats, tatouages runiques lumineux sur les bras.",
  faction: 'faction:arcane-guild',
  reputationRequired: 150,
  services: [
    { type: 'enchant', description: "Enchantement d'arme (+1/+2/+3)", cost: 500, requirements: "Arme de qualité" },
    { type: 'enchant', description: "Enchantement d'armure (résistance élémentaire)", cost: 800 },
    { type: 'enchant', description: "Création de rune permanente", cost: 2000, requirements: "Gemme épique+" }
  ],
  dialogues: [
    { trigger: 'greeting', text: "*trace rune dans l'air* Les énergies vous entourent... intéressant." },
    { trigger: 'idle', text: "*médite devant cercle runique brillant*" }
  ]
};

export const COOK_PIERRE: NPCDefinition = {
  id: 'npc:cook:pierre',
  name: "Pierre Flammesauce",
  title: "Chef Cuisinier",
  role: 'merchant',
  personality: 'jovial',
  location: 'golden-fork',
  region: 'northern-kingdoms',
  description: "Chef passionné tenant le meilleur restaurant de la capitale. Excentrique mais talentueux.",
  appearance: "Homme rond, toque blanche immaculée, moustache en guidon. Tablier couvert de taches.",
  inventory: [
    { itemId: 'food:hearty-stew', stock: 10, priceMultiplier: 1.5 },
    { itemId: 'food:lobster-bisque', stock: 5, priceMultiplier: 2.0 },
    { itemId: 'food:dragons-feast', stock: 1, priceMultiplier: 5.0, restockTime: 1440 }
  ],
  services: [
    { type: 'train', description: "Formation Cuisine (débloque métier Cooking)", cost: 50 }
  ],
  dialogues: [
    { trigger: 'greeting', text: "*baise du bout des doigts* Bienvenue ! Aujourd'hui, le menu est... magnifique !" },
    { trigger: 'idle', text: "*goûte sauce* Mmm... il manque quelque chose... AH ! Une pincée de safran !" }
  ]
};

export const TAILOR_MADAME_BOUTIQUE: NPCDefinition = {
  id: 'npc:tailor:boutique',
  name: "Madame Boutique",
  title: "Couturière de Luxe",
  role: 'merchant',
  personality: 'arrogant',
  location: 'haute-couture',
  region: 'northern-kingdoms',
  description: "Couturière snob habillant la noblesse. Refuse les clients 'mal habillés'.",
  appearance: "Femme élégante, cheveux en chignon parfait, lorgnon. Robe à la dernière mode.",
  reputationRequired: 75,
  inventory: [
    { itemId: 'armor:shirt:silk', stock: 10, priceMultiplier: 2.0 },
    { itemId: 'armor:robe:silk', stock: 5, priceMultiplier: 2.5 },
    { itemId: 'armor:cloak:enchanted', stock: 2, priceMultiplier: 3.0 }
  ],
  dialogues: [
    { trigger: 'greeting', text: "*vous examine de haut en bas* ...Je suppose que je peux vous aider. Si vous avez les moyens." },
    { trigger: 'trade', text: "*pince lèvres* Cette pièce est unique. Ne la gâchez pas avec des aventures vulgaires." }
  ]
};

// ============================================================================
// SERVICES DIVERS
// ============================================================================

export const BANKER_GOLDSWORTH: NPCDefinition = {
  id: 'npc:banker:goldsworth',
  name: "Barnabé Goldsworth",
  title: "Maître Banquier",
  role: 'merchant',
  personality: 'greedy',
  location: 'golden-vault',
  region: 'northern-kingdoms',
  description: "Banquier cupide gérant les coffres les plus sûrs du royaume. Tout a un prix.",
  appearance: "Homme corpulent, costume cher, bagues en or. Sourire commercial permanent.",
  services: [
    { type: 'bank', description: "Coffre personnel (stockage illimité)", cost: 100 },
    { type: 'bank', description: "Prêt (1000 gold, intérêt 20%)", cost: 0 },
    { type: 'bank', description: "Échange de devises (5% commission)", cost: 0 }
  ],
  dialogues: [
    { trigger: 'greeting', text: "*frotte mains* Bienvenue à la Voûte Dorée ! Comment puis-je faire fructifier votre fortune aujourd'hui ?" },
    { trigger: 'trade', text: "Tout est sûr ici. Même les dragons ne pourraient forcer ces portes ! *rit*" }
  ]
};

export const STABLEMASTER_TOM: NPCDefinition = {
  id: 'npc:stable:tom',
  name: "Tom Cavalécurie",
  title: "Maître d'Écurie",
  role: 'merchant',
  personality: 'helpful',
  location: 'town-stables',
  region: 'northern-kingdoms',
  description: "Palefrenier jovial aimant les animaux plus que les gens. Chevaux impeccables.",
  appearance: "Homme robuste, cheveux paille, odeur de foin. Toujours une pomme pour les chevaux.",
  services: [
    { type: 'stable', description: "Louer cheval (vitesse +50%)", cost: 50 },
    { type: 'stable', description: "Louer cheval de guerre (vitesse +50%, combat)", cost: 150 },
    { type: 'stable', description: "Pension pour monture", cost: 5 }
  ],
  dialogues: [
    { trigger: 'greeting', text: "Bonjour ! Besoin d'un cheval ? J'ai les meilleurs de la région !" },
    { trigger: 'idle', text: "*brosse cheval* Là, là ma belle... *chantonne*" }
  ]
};

export const HEALER_SISTER_MERCY: NPCDefinition = {
  id: 'npc:healer:mercy',
  name: "Sœur Mercy",
  title: "Guérisseuse",
  role: 'ally',
  personality: 'helpful',
  location: 'temple-healing',
  region: 'northern-kingdoms',
  description: "Prêtresse dévouée soignant malades et blessés gratuitement. Cœur d'or.",
  appearance: "Femme d'âge moyen, habits simples de prêtresse, symbole de Lumière au cou. Sourire doux.",
  faction: 'faction:temple-light',
  services: [
    { type: 'rest', description: "Soins (restaure tous HP)", cost: 0 },
    { type: 'rest', description: "Guérison maladie/poison", cost: 25 },
    { type: 'rest', description: "Résurrection", cost: 1000, requirements: "Corps intact" }
  ],
  dialogues: [
    { trigger: 'greeting', text: "Bienvenue, enfant. Vous semblez fatigué. Laissez-moi vous aider." },
    { trigger: 'idle', text: "*prie silencieusement devant autel*" }
  ]
};

// ============================================================================
// PERSONNAGES DE QUÊTES SECONDAIRES
// ============================================================================

export const QUEST_LOST_CHILD: NPCDefinition = {
  id: 'npc:quest:anabelle',
  name: "Petite Anabelle",
  role: 'questgiver',
  personality: 'friendly',
  location: 'wandering',
  region: 'forest',
  description: "Fillette perdue dans la forêt. Cherche désespérément sa mère.",
  appearance: "Fillette d'environ 8 ans, robe déchirée, larmes aux yeux. Serré une poupée.",
  quests: ['quest:find-mother'],
  dialogues: [
    { trigger: 'greeting', text: "*sanglote* S'il vous plaît... aidez-moi à retrouver maman... je suis perdue..." },
    { trigger: 'farewell', text: "*étreinte* Merci ! *court vers sa mère*" }
  ]
};

export const QUEST_SCHOLAR_ANCIENT: NPCDefinition = {
  id: 'npc:quest:elminster',
  name: "Professeur Elminster",
  title: "Historien",
  role: 'questgiver',
  personality: 'eccentric',
  location: 'ruins',
  region: 'various',
  description: "Archéologue obsédé par civilisations anciennes. Cherche constamment artefacts.",
  appearance: "Vieil homme excentrique, chapeau à large bord, outils d'excavation partout.",
  faction: 'faction:arcane-guild',
  quests: ['quest:ancient-artifact', 'quest:lost-civilization', 'quest:forbidden-knowledge'],
  dialogues: [
    { trigger: 'greeting', text: "Ah ! Parfait timing ! J'ai découvert des inscriptions fascinantes ! Vous devez m'aider à..." },
    { trigger: 'idle', text: "*gratte pierre ancien* ...ce symbole... il ne correspond à aucune langue connue..." }
  ]
};

export const QUEST_WIDOW: NPCDefinition = {
  id: 'npc:quest:martha',
  name: "Veuve Martha",
  role: 'questgiver',
  personality: 'humble',
  location: 'cottage',
  region: 'plains',
  description: "Vieille femme dont le mari fut tué par bandits. Cherche justice.",
  appearance: "Femme âgée en noir, regard triste mais déterminé. Mains tremblantes.",
  quests: ['quest:bandits-revenge'],
  dialogues: [
    { trigger: 'greeting', text: "*essuie larmes* Ils ont tué mon George... je ne peux pas me venger moi-même mais..." },
    { trigger: 'quest', text: "Faites-leur payer. Pour George. Pour tous ceux qu'ils ont blessés." }
  ]
};

// ============================================================================
// ANTAGONISTES MINEURS
// ============================================================================

export const ENEMY_CORRUPT_MERCHANT: NPCDefinition = {
  id: 'npc:enemy:corvus',
  name: "Corvus Noirbourse",
  title: "Marchand Corrompu",
  role: 'enemy',
  personality: 'greedy',
  location: 'black-market',
  region: 'northern-kingdoms',
  description: "Marchand sans scrupules vendant biens volés et esclaves. Protégé par gardes corrompus.",
  appearance: "Homme obèse, vêtements clinquants, sourire huileux. Bagues volées à chaque doigt.",
  isHostile: false,
  quests: ['quest:shut-down-slavery', 'quest:corrupt-network'],
  dialogues: [
    { trigger: 'greeting', text: "*sourire faux* Bienvenue ! J'ai des... articles rares. Pas de questions posées." },
    { trigger: 'combat', text: "GARDES ! Tuez-les ! Je paierai double !" }
  ],
  enemies: ['faction:royal-crown']
};

export const ENEMY_CULT_LEADER: NPCDefinition = {
  id: 'npc:enemy:zealot',
  name: "Grand Zélote Morteus",
  title: "Leader du Culte",
  role: 'enemy',
  personality: 'arrogant',
  location: 'hidden-shrine',
  region: 'cave',
  description: "Fanatique menant culte apocalyptique. Cherche à invoquer démon ancien.",
  appearance: "Homme au regard fou, robe rouge sang, symboles démoniaques tatoués.",
  faction: 'faction:necromancers-cult',
  isHostile: true,
  creatureTemplate: 'humanoid:cultist:leader',
  dialogues: [
    { trigger: 'greeting', text: "*rire maniaque* Vous êtes trop tard ! Le rituel est presque complet !" },
    { trigger: 'combat', text: "Notre Seigneur Ténébreux s'élèvera ! Et vous en serez les premiers sacrifices !" }
  ]
};

// ============================================================================
// COMPAGNONS POTENTIELS (suite)
// ============================================================================

export const ALLY_DWARF_WARRIOR: NPCDefinition = {
  id: 'npc:ally:thorin',
  name: "Thorin Barbeforge",
  title: "Guerrier Nain",
  role: 'ally',
  personality: 'jovial',
  location: 'tavern',
  region: 'mountain',
  description: "Nain robuste cherchant aventures et bonne bière. Loyal jusqu'à la mort.",
  appearance: "Nain trapu, barbe rousse tressée avec anneaux de fer. Hache de guerre en main.",
  creatureTemplate: 'humanoid:dwarf:warrior',
  dialogues: [
    { trigger: 'greeting', text: "Haha ! Vous avez l'air solides ! Une quête se prépare ? Comptez sur ma hache !" },
    { trigger: 'combat', text: "*charge en hurlant* POUR LES MONTAGNES !" }
  ]
};

export const ALLY_ROGUE: NPCDefinition = {
  id: 'npc:ally:shadow',
  name: "Ombre",
  title: "Rôdeur",
  role: 'ally',
  personality: 'mysterious',
  location: 'wandering',
  region: 'various',
  description: "Rôdeur masqué aux compétences d'infiltration légendaires. Passé mystérieux.",
  appearance: "Silhouette masquée, armure de cuir noire, mouvements silencieux comme la nuit.",
  creatureTemplate: 'humanoid:rogue:master',
  dialogues: [
    { trigger: 'greeting', text: "*apparaît de nulle part* ...Besoin de quelqu'un de discret ?" },
    { trigger: 'combat', text: "*chuchote* Couvrez-moi. Je m'occupe des sentinelles." }
  ]
};

export const ALLY_CLERIC: NPCDefinition = {
  id: 'npc:ally:seraphina',
  name: "Seraphina Lumière-Céleste",
  title: "Clerc de Lumière",
  role: 'ally',
  personality: 'friendly',
  location: 'temple',
  region: 'northern-kingdoms',
  description: "Prêtresse combattante dévouée à éradiquer mal et protéger innocents.",
  appearance: "Elfe aux cheveux d'or, armure légère blanche et or, symbole sacré lumineux.",
  faction: 'faction:temple-light',
  creatureTemplate: 'humanoid:cleric:battle',
  dialogues: [
    { trigger: 'greeting', text: "La Lumière m'a guidée vers vous. Ensemble, repoussons les ténèbres !" },
    { trigger: 'combat', text: "*lève symbole sacré* Que la Lumière nous protège ! *sorts de guérison*" }
  ]
};

// ============================================================================
// PERSONNAGES MYSTÉRIEUX
// ============================================================================

export const MYSTERIOUS_ORACLE: NPCDefinition = {
  id: 'npc:oracle:cassandra',
  name: "Cassandra la Voyante",
  title: "Oracle",
  role: 'questgiver',
  personality: 'mysterious',
  location: 'mystic-grove',
  region: 'mystic',
  description: "Oracle énigmatique voyant futurs possibles. Parle par énigmes.",
  appearance: "Femme aux yeux blancs laiteux, cheveux flottant sans vent. Aura éthérée.",
  services: [
    { type: 'identify', description: "Divination (aperçu du futur)", cost: 500 }
  ],
  dialogues: [
    { trigger: 'greeting', text: "*voix éthérée* Je vous ai vu venir dans mes rêves... trois chemins s'ouvrent devant vous..." },
    { trigger: 'idle', text: "*médite* ...le dragon s'éveille... la couronne brisée... l'ombre qui grandit..." }
  ]
};

export const MYSTERIOUS_WANDERER: NPCDefinition = {
  id: 'npc:wanderer:grey',
  name: "Le Voyageur Gris",
  title: "???",
  role: 'ally',
  personality: 'mysterious',
  location: 'wandering',
  region: 'various',
  description: "Voyageur mystérieux apparaissant aux moments critiques. Immense pouvoir caché.",
  appearance: "Homme en robes grises, capuche cachant visage. Staff noueux. Aura de puissance.",
  backstory: "Nul ne connaît sa vraie nature. Certains pensent qu'il est un dieu mortel. D'autres, le dernier d'une race ancienne.",
  dialogues: [
    { trigger: 'greeting', text: "*voix grave et sage* Les chemins du destin sont étranges... nous nous croisons à nouveau." },
    { trigger: 'combat', text: "*lève staff* Assez ! *explosion de pouvoir arcanique*" }
  ]
};

// ============================================================================
// EXPORTS & UTILITIES
// ============================================================================

export const ALL_NPCS: NPCDefinition[] = [
  // Marchands généraux
  MERCHANT_ALDRIC,
  MERCHANT_SYLVANA,
  // Marchands spécialisés
  MERCHANT_WEAPONS,
  MERCHANT_POTION_SELLER,
  MERCHANT_JEWELER,
  MERCHANT_RARE_BOOKS,
  // Artisans
  BLACKSMITH_BROM,
  ALCHEMIST_MIRABEL,
  ENCHANTER_MYSTRAL,
  COOK_PIERRE,
  TAILOR_MADAME_BOUTIQUE,
  // Donneurs de quêtes
  QUESTGIVER_ELENA,
  QUESTGIVER_OLD_MARCUS,
  QUESTGIVER_MYSTERIOUS_STRANGER,
  QUEST_LOST_CHILD,
  QUEST_SCHOLAR_ANCIENT,
  QUEST_WIDOW,
  // Entraîneurs
  TRAINER_SWORD_MASTER,
  TRAINER_ARCHMAGE_THALION,
  // Services
  INNKEEPER_ROSIE,
  BANKER_GOLDSWORTH,
  STABLEMASTER_TOM,
  HEALER_SISTER_MERCY,
  // Nobles & autorités
  NOBLE_LORD_BLACKWOOD,
  NOBLE_PRINCESS_ARIA,
  JUDGE_GRIMWALD,
  GUARD_CAPTAIN,
  // Alliés
  ALLY_THERON,
  ALLY_LYRA,
  ALLY_DWARF_WARRIOR,
  ALLY_ROGUE,
  ALLY_CLERIC,
  // Ennemis
  ENEMY_BANDIT_KING,
  ENEMY_NECROMANCER,
  ENEMY_CORRUPT_MERCHANT,
  ENEMY_CULT_LEADER,
  // Mystérieux
  MYSTERIOUS_ORACLE,
  MYSTERIOUS_WANDERER
];

export const NPCS_BY_ID: Record<string, NPCDefinition> = ALL_NPCS.reduce((acc, npc) => {
  acc[npc.id] = npc;
  return acc;
}, {} as Record<string, NPCDefinition>);

export const NPCS_BY_ROLE: Record<NPCRole, NPCDefinition[]> = ALL_NPCS.reduce((acc, npc) => {
  if (!acc[npc.role]) acc[npc.role] = [];
  acc[npc.role].push(npc);
  return acc;
}, {} as Record<NPCRole, NPCDefinition[]>);

export const NPCS_BY_LOCATION: Record<string, NPCDefinition[]> = ALL_NPCS.reduce((acc, npc) => {
  if (!acc[npc.location]) acc[npc.location] = [];
  acc[npc.location].push(npc);
  return acc;
}, {} as Record<string, NPCDefinition[]>);

/**
 * Trouve NPCs dans un lieu donné
 */
export function getNPCsAtLocation(location: string): NPCDefinition[] {
  return NPCS_BY_LOCATION[location] || [];
}

/**
 * Trouve NPCs par rôle
 */
export function getNPCsByRole(role: NPCRole): NPCDefinition[] {
  return NPCS_BY_ROLE[role] || [];
}

/**
 * Trouve marchands disponibles
 */
export function getMerchants(): NPCDefinition[] {
  return ALL_NPCS.filter(npc => npc.inventory && npc.inventory.length > 0);
}

/**
 * Trouve donneurs de quêtes
 */
export function getQuestGivers(): NPCDefinition[] {
  return ALL_NPCS.filter(npc => npc.quests && npc.quests.length > 0);
}

/**
 * Trouve entraîneurs offrant service spécifique
 */
export function getTrainers(serviceType?: string): NPCDefinition[] {
  const trainers = ALL_NPCS.filter(npc => 
    npc.services && npc.services.some(s => s.type === 'train')
  );
  
  if (serviceType) {
    return trainers.filter(npc => 
      npc.services!.some(s => s.description.includes(serviceType))
    );
  }
  
  return trainers;
}

/**
 * Vérifie si un joueur peut interagir avec un NPC (réputation)
 */
export function canInteractWith(npc: NPCDefinition, playerReputation: number): boolean {
  if (!npc.reputationRequired) return true;
  return playerReputation >= npc.reputationRequired;
}

/**
 * Obtient dialogue approprié pour contexte
 */
export function getDialogue(npc: NPCDefinition, trigger: NPCDialogue['trigger']): string {
  const dialogue = npc.dialogues.find(d => d.trigger === trigger);
  return dialogue?.text || npc.dialogues[0]?.text || "...";
}

/**
 * Calcule prix d'un item chez un marchand
 */
export function calculatePrice(basePrice: number, multiplier: number): number {
  return Math.floor(basePrice * multiplier);
}

// Export templates for compatibility
export const NPC_TEMPLATES = {
  merchants: {
    general: [MERCHANT_ALDRIC, MERCHANT_SYLVANA],
    weapons: MERCHANT_WEAPONS,
    potions: MERCHANT_POTION_SELLER,
    jewelry: MERCHANT_JEWELER,
    books: MERCHANT_RARE_BOOKS
  },
  artisans: {
    blacksmith: BLACKSMITH_BROM,
    alchemist: ALCHEMIST_MIRABEL,
    enchanter: ENCHANTER_MYSTRAL,
    cook: COOK_PIERRE,
    tailor: TAILOR_MADAME_BOUTIQUE
  },
  questgivers: {
    main: [QUESTGIVER_ELENA, QUESTGIVER_OLD_MARCUS, QUESTGIVER_MYSTERIOUS_STRANGER],
    secondary: [QUEST_LOST_CHILD, QUEST_SCHOLAR_ANCIENT, QUEST_WIDOW]
  },
  trainers: {
    combat: TRAINER_SWORD_MASTER,
    magic: TRAINER_ARCHMAGE_THALION
  },
  allies: [ALLY_THERON, ALLY_LYRA, ALLY_DWARF_WARRIOR, ALLY_ROGUE, ALLY_CLERIC],
  enemies: {
    bosses: [ENEMY_BANDIT_KING, ENEMY_NECROMANCER],
    minor: [ENEMY_CORRUPT_MERCHANT, ENEMY_CULT_LEADER]
  }
};
