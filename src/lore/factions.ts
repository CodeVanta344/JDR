/**
 * AETHELGARD FACTIONS - Systèm

e complet de guildes, ordres, cultes et organisations
 * 15 factions avec rangs, réputation, perks et quêtes exclusives
 */

import type { Faction, FactionRank } from './schema';

// ============================================================================
// FACTIONS RELIGIEUSES
// ============================================================================

export const CULT_OF_SOLARIUS: Faction = {
  id: 'faction:cult-solarius',
  name: "Culte de Solarius",
  type: 'religious',
  alignment: 'good',
  regionId: 'val-dore',
  tags: ['religion', 'light', 'healing', 'solarius'],
  summary: "Culte dédié à Solarius, dieu de la lumière et de la justice.",
  description: "Le Culte de Solarius est l'une des religions les plus répandues d'Aethelgard. Ses prêtres et paladins combattent les ténèbres et soignent les malades. Le temple principal se trouve à Sol Aureus, dans le Val Doré. Les adeptes croient que la lumière de Solarius guide les âmes perdues et repousse les forces de l'Abysse.",
  headquarters: 'loc:sol-aureus:great-temple',
  leader: 'npc:sol-aureus:high-priest-valerius',
  rivals: ['faction:cult-veiled-lady', 'faction:circle-ashes'],
  allies: ['faction:silver-dawn', 'faction:arcane-guild'],
  hooks: [
    "Le culte recherche des aventuriers pour purifier un ancien temple corrompu par les Cendres.",
    "Des rumeurs parlent d'une relique de Solarius cachée dans les Monts Cœur-de-Fer.",
    "Un hérétique prêche que Solarius a abandonné Aethelgard."
  ],
  ranks: [
    {
      id: 'novice',
      name: "Novice de la Lumière",
      threshold: 0,
      perks: ["Accès au temple", "Prix réduits chez les marchands du culte (-10%)"],
      unlocks: ['quest:solarius:first-blessing']
    },
    {
      id: 'acolyte',
      name: "Acolyte Consacré",
      threshold: 500,
      perks: ["Bénédiction quotidienne (+10 HP temp)", "Accès à la bibliothèque sacrée"],
      unlocks: ['quest:solarius:pilgrimage', 'recipe:holy-water']
    },
    {
      id: 'priest',
      name: "Prêtre de Solarius",
      threshold: 1500,
      perks: ["Sort: Lumière Purificatrice", "Logement gratuit dans tous les temples"],
      unlocks: ['quest:solarius:fallen-temple', 'item:blessed-armor']
    },
    {
      id: 'high-priest',
      name: "Haut-Prêtre",
      threshold: 3000,
      perks: ["Résurrection mineure (1/semaine)", "Titre: Élu de Solarius"],
      unlocks: ['quest:solarius:divine-trial', 'item:solaris-blade']
    }
  ],
  joinRequirements: {
    level: 1,
    quest: 'quest:solarius:initiation'
  }
};

export const CULT_OF_VEILED_LADY: Faction = {
  id: 'faction:cult-veiled-lady',
  name: "Culte de la Dame Voilée",
  type: 'religious',
  alignment: 'neutral',
  regionId: 'sylve-emeraude',
  tags: ['religion', 'shadow', 'secrets', 'moon'],
  summary: "Culte mystérieux vénérant la Dame Voilée, déesse des secrets et de la nuit.",
  description: "Le Culte de la Dame Voilée opère dans l'ombre. Ses membres croient que la connaissance est pouvoir et que certains secrets ne doivent jamais être révélés. La déesse qu'ils vénèrent est une figure énigmatique associée à la lune, aux rêves et aux vérités cachées. Leurs rites sont secrets et leurs temples se trouvent dans des lieux reculés.",
  headquarters: 'loc:sylve-emeraude:veiled-shrine',
  leader: 'npc:sylve:oracle-selene',
  rivals: ['faction:cult-solarius', 'faction:arcane-guild'],
  allies: ['faction:shadow-syndicate'],
  hooks: [
    "Des adeptes recherchent un artefact lunaire perdu depuis l'ère d'Ashka.",
    "Un oracle a prédit qu'une éclipse révélera un secret ancien.",
    "Le culte offre des services d'espionnage... pour le bon prix."
  ],
  ranks: [
    {
      id: 'seeker',
      name: "Chercheur de Secrets",
      threshold: 0,
      perks: ["Vision nocturne améliorée", "Accès aux rumeurs exclusives"],
      unlocks: ['quest:veiled-lady:first-secret']
    },
    {
      id: 'whisperer',
      name: "Murmureur",
      threshold: 600,
      perks: ["Compétence: Discrétion +2", "Réseau d'informateurs dans 3 villes"],
      unlocks: ['quest:veiled-lady:moon-ritual', 'recipe:shadow-ink']
    },
    {
      id: 'oracle',
      name: "Oracle Voilé",
      threshold: 1800,
      perks: ["Divination (1/jour)", "Immunité aux charmes mentaux"],
      unlocks: ['quest:veiled-lady:stolen-dream', 'item:veiled-cloak']
    },
    {
      id: 'high-oracle',
      name: "Grand Oracle",
      threshold: 3500,
      perks: ["Marche dans les ombres (téléportation)", "Titre: Gardien des Secrets"],
      unlocks: ['quest:veiled-lady:mirror-of-souls', 'item:lunar-staff']
    }
  ],
  joinRequirements: {
    level: 3,
    skill: { skill: 'stealth', dc: 15 }
  }
};

// ============================================================================
// GUILDES
// ============================================================================

export const ARCANE_GUILD: Faction = {
  id: 'faction:arcane-guild',
  name: "Guilde des Arcanes",
  type: 'guild',
  alignment: 'neutral',
  regionId: 'val-dore',
  tags: ['magic', 'knowledge', 'research', 'arcane'],
  summary: "Organisation de mages dédiée à l'étude et la préservation de la magie.",
  description: "La Guilde des Arcanes regroupe les mages les plus érudits d'Aethelgard. Fondée après la Chute d'Ashka pour empêcher une nouvelle catastrophe magique, elle régule l'usage de la magie et préserve les connaissances arcaniques. Sa grande bibliothèque à Sol Aureus contient des milliers de grimoires. Les membres étudient les Cendres pour comprendre leur nature et trouver un remède.",
  headquarters: 'loc:sol-aureus:arcane-tower',
  leader: 'npc:sol-aureus:archmage-theron',
  rivals: ['faction:circle-ashes'],
  allies: ['faction:cult-solarius', 'faction:scholars-guild'],
  hooks: [
    "La guilde offre des récompenses pour tout grimoire ou artefact magique retrouvé.",
    "Un mage renégat utilise une magie interdite dans les Terres Brûlées.",
    "La guilde organise un tournoi de magie annuel avec des prix légendaires."
  ],
  ranks: [
    {
      id: 'apprentice',
      name: "Apprenti Arcaniste",
      threshold: 0,
      perks: ["Accès à la bibliothèque (niveau 1)", "Rabais sur composants magiques (-15%)"],
      unlocks: ['quest:arcane:first-spell', 'recipe:mana-potion']
    },
    {
      id: 'journeyman',
      name: "Mage Itinérant",
      threshold: 700,
      perks: ["Accès à la bibliothèque (niveau 2)", "Logement gratuit dans tours de guilde"],
      unlocks: ['quest:arcane:artifact-recovery', 'recipe:scroll-crafting']
    },
    {
      id: 'magister',
      name: "Magister",
      threshold: 2000,
      perks: ["1 sort gratuit/niveau", "Recherche: 20% chance de trouver sorts rares"],
      unlocks: ['quest:arcane:spellweaving-mastery', 'item:arcane-focus-enhanced']
    },
    {
      id: 'archmage',
      name: "Archimage",
      threshold: 4000,
      perks: ["Siège au conseil de la guilde", "Titre: Maître des Arcanes"],
      unlocks: ['quest:arcane:staff-of-power', 'item:robe-archmage']
    }
  ],
  joinRequirements: {
    level: 1,
    reputation: { 'faction:arcane-guild': 0 }
  }
};

export const SMITHS_GUILD: Faction = {
  id: 'faction:smiths-guild',
  name: "Guilde des Forgerons",
  type: 'guild',
  alignment: 'neutral',
  regionId: 'monts-coeur-fer',
  tags: ['crafting', 'smithing', 'metal', 'forge'],
  summary: "Guilde des meilleurs forgerons et métallurgistes d'Aethelgard.",
  description: "La Guilde des Forgerons est basée à Hammerdeep, dans les Monts Cœur-de-Fer. Ses membres sont réputés pour fabriquer les meilleures armes et armures du royaume. La guilde contrôle l'accès aux mines les plus riches et protège jalousement les secrets de la forge runique. Les maîtres-forgerons peuvent travailler le mythril et l'adamantine.",
  headquarters: 'loc:hammerdeep:grand-forge',
  leader: 'npc:hammerdeep:guildmaster-borin',
  rivals: ['faction:merchants-league'],
  allies: ['faction:miners-guild'],
  hooks: [
    "La guilde cherche un rare minerai appelé 'étoile de fer' pour une commande royale.",
    "Un apprenti a volé le marteau légendaire de son maître.",
    "Des forgerons nains proposent d'enseigner l'art de la forge runique."
  ],
  ranks: [
    {
      id: 'apprentice',
      name: "Apprenti Forgeron",
      threshold: 0,
      perks: ["Accès aux forges de guilde", "Rabais sur métaux bruts (-20%)"],
      unlocks: ['recipe:iron-tools', 'recipe:steel-blade']
    },
    {
      id: 'journeyman',
      name: "Compagnon Forgeron",
      threshold: 800,
      perks: ["Réparations gratuites dans forges de guilde", "+10% qualité items craftés"],
      unlocks: ['recipe:mithril-forging', 'quest:smiths:masterwork']
    },
    {
      id: 'master',
      name: "Maître-Forgeron",
      threshold: 2500,
      perks: ["Accès aux techniques runiques", "Forge personnelle (si propriété achetée)"],
      unlocks: ['recipe:enchanted-weapons', 'quest:smiths:legendary-commission']
    },
    {
      id: 'grandmaster',
      name: "Grand-Maître",
      threshold: 5000,
      perks: ["Signature de maître (+5% valeur items)", "Titre: Forgeron Légendaire"],
      unlocks: ['recipe:artifact-reforging', 'item:hammer-of-the-ancients']
    }
  ],
  joinRequirements: {
    profession: { type: 'smithing', level: 1 }
  }
};

export const MERCHANTS_LEAGUE: Faction = {
  id: 'faction:merchants-league',
  name: "Ligue des Marchands",
  type: 'merchant',
  alignment: 'neutral',
  regionId: 'cote-orages',
  tags: ['trade', 'commerce', 'wealth', 'shipping'],
  summary: "Puissante organisation commerciale contrôlant le commerce maritime.",
  description: "La Ligue des Marchands est un cartel commercial basé à Kuldahar, sur la Côte des Orages. Elle contrôle la majorité des routes commerciales maritimes et terrestres. Les membres bénéficient de prix préférentiels, d'escortes armées et d'accès à des marchés exclusifs. La Ligue a des rivalités avec les guildes artisanales qui tentent de vendre directement.",
  headquarters: 'loc:kuldahar:trade-hall',
  leader: 'npc:kuldahar:merchant-prince-aldric',
  rivals: ['faction:smiths-guild', 'faction:shadow-syndicate'],
  allies: ['faction:sailors-union'],
  hooks: [
    "La Ligue offre des contrats d'escorte lucratifs pour caravanes.",
    "Des pirates attaquent les navires marchands sur la Côte des Orages.",
    "Un marchand vend des artefacts volés provenant des Terres Brûlées."
  ],
  ranks: [
    {
      id: 'associate',
      name: "Associé Commercial",
      threshold: 0,
      perks: ["Prix réduits chez marchands de la Ligue (-10%)", "Accès aux enchères privées"],
      unlocks: ['quest:merchants:first-deal']
    },
    {
      id: 'trader',
      name: "Commerçant Certifié",
      threshold: 1000,
      perks: ["+15% prix de revente", "Accès aux routes commerciales protégées"],
      unlocks: ['quest:merchants:caravan-master', 'perk:trade-network']
    },
    {
      id: 'merchant-captain',
      name: "Capitaine Marchand",
      threshold: 3000,
      perks: ["Navire marchand (location gratuite)", "Contacts dans 5 ports"],
      unlocks: ['quest:merchants:pirate-problem', 'perk:shipping-license']
    },
    {
      id: 'merchant-prince',
      name: "Prince Marchand",
      threshold: 6000,
      perks: ["Monopole sur 1 type de marchandise", "Titre: Magnat du Commerce"],
      unlocks: ['quest:merchants:trade-war', 'property:trading-company']
    }
  ],
  joinRequirements: {
    reputation: { 'faction:merchants-league': 0 },
    gold: 500
  }
};

// ============================================================================
// ORDRES MILITAIRES & POLITIQUES
// ============================================================================

export const SILVER_DAWN: Faction = {
  id: 'faction:silver-dawn',
  name: "L'Aube d'Argent",
  type: 'political',
  alignment: 'good',
  regionId: 'val-dore',
  tags: ['military', 'order', 'knights', 'protection'],
  summary: "Ordre de chevaliers jurant de protéger les innocents contre les ténèbres.",
  description: "L'Aube d'Argent est un ordre de paladins et chevaliers fondé après la Chute d'Ashka. Leur mission est de protéger Aethelgard contre les menaces des Cendres, de l'Abysse et de toute force maléfique. Ils opèrent depuis Sol Aureus et ont des forteresses dans chaque région. Leur code d'honneur est strict : courage, compassion, justice.",
  headquarters: 'loc:sol-aureus:silver-citadel',
  leader: 'npc:sol-aureus:lord-commander-garen',
  rivals: ['faction:circle-ashes', 'faction:abyss-cult'],
  allies: ['faction:cult-solarius', 'faction:royal-guard'],
  hooks: [
    "L'ordre recrute pour une expédition dans les Terres Brûlées.",
    "Un chevalier a été accusé de trahison et clame son innocence.",
    "Des rapports signalent une horde de morts-vivants marchant vers le Val Doré."
  ],
  ranks: [
    {
      id: 'squire',
      name: "Écuyer",
      threshold: 0,
      perks: ["Entraînement martial gratuit", "Équipement de base fourni"],
      unlocks: ['quest:dawn:first-patrol']
    },
    {
      id: 'knight',
      name: "Chevalier de l'Aube",
      threshold: 1000,
      perks: ["Monture gratuite (cheval de guerre)", "Logement dans citadelles"],
      unlocks: ['quest:dawn:corruption-hunt', 'item:silver-armor']
    },
    {
      id: 'champion',
      name: "Champion d'Argent",
      threshold: 2800,
      perks: ["Capacité: Châtiment Sacré", "Commandement d'une escouade"],
      unlocks: ['quest:dawn:seal-the-breach', 'item:dawn-blade']
    },
    {
      id: 'lord-commander',
      name: "Seigneur-Commandeur",
      threshold: 5000,
      perks: ["Autorité sur toutes les forces de l'ordre", "Titre: Défenseur d'Aethelgard"],
      unlocks: ['quest:dawn:final-battle', 'item:armor-of-the-martyr']
    }
  ],
  joinRequirements: {
    level: 5,
    reputation: { 'faction:silver-dawn': 250 },
    quest: 'quest:dawn:trial-of-valor'
  }
};

export const CIRCLE_OF_ASHES: Faction = {
  id: 'faction:circle-ashes',
  name: "Le Cercle des Cendres",
  type: 'cult',
  alignment: 'evil',
  regionId: 'terres-brulees',
  tags: ['dark-magic', 'corruption', 'ashka', 'forbidden'],
  summary: "Secte maléfique cherchant à restaurer l'Hégémonie d'Ashka.",
  description: "Le Cercle des Cendres est une organisation secrète de mages corrompus et cultistes qui vénèrent l'ancienne Hégémonie d'Ashka. Ils croient que la Chute était nécessaire pour évoluer et cherchent à maîtriser le pouvoir des Cendres. Leurs rituels sont interdits et considérés comme de la nécromancie. Ils opèrent dans les Terres Brûlées et infiltrent d'autres régions.",
  headquarters: 'loc:terres-brulees:obsidian-sanctum',
  leader: 'npc:terres-brulees:archon-malachar',
  rivals: ['faction:silver-dawn', 'faction:arcane-guild', 'faction:cult-solarius'],
  allies: ['faction:abyss-cult'],
  hooks: [
    "Le Cercle recrute secrètement dans les universités magiques.",
    "Des villages entiers disparaissent, transformés en cendres.",
    "Un rituel massif est prévu lors de la prochaine éclipse."
  ],
  ranks: [
    {
      id: 'initiate',
      name: "Initié des Cendres",
      threshold: 0,
      perks: ["Accès aux rituels mineurs", "Résistance aux Cendres +10%"],
      unlocks: ['quest:circle:first-corruption']
    },
    {
      id: 'adept',
      name: "Adepte Corrompu",
      threshold: 600,
      perks: ["Sort: Flammes Cendrées", "Immunité aux maladies"],
      unlocks: ['quest:circle:stolen-grimoire', 'recipe:ash-powder']
    },
    {
      id: 'archon',
      name: "Archon",
      threshold: 2000,
      perks: ["Transformation partielle (yeux de cendre)", "Contrôle des créatures cendrées"],
      unlocks: ['quest:circle:ritual-of-rebirth', 'item:ash-staff']
    },
    {
      id: 'lord-of-ashes',
      name: "Seigneur des Cendres",
      threshold: 4500,
      perks: ["Forme cendrée (invulnérabilité temporaire)", "Titre: Héraut d'Ashka"],
      unlocks: ['quest:circle:awaken-the-seal', 'item:crown-of-ashes']
    }
  ],
  joinRequirements: {
    level: 8,
    skill: { skill: 'arcana', dc: 18 },
    reputation: { 'faction:silver-dawn': -500 } // Être ennemi de l'Aube d'Argent
  }
};

// ============================================================================
// ORGANISATIONS CRIMINELLES
// ============================================================================

export const SHADOW_SYNDICATE: Faction = {
  id: 'faction:shadow-syndicate',
  name: "Le Syndicat de l'Ombre",
  type: 'criminal',
  alignment: 'evil',
  regionId: 'cote-orages',
  tags: ['thieves', 'assassins', 'smuggling', 'underground'],
  summary: "Réseau criminel contrôlant le marché noir et les activités illégales.",
  description: "Le Syndicat de l'Ombre est la plus grande organisation criminelle d'Aethelgard. Ils contrôlent le marché noir, les guildes de voleurs, les réseaux d'assassins et le contrebande. Basés à Kuldahar, ils ont des cellules dans chaque grande ville. Leur identité est secrète et seuls les membres de haut rang connaissent le vrai leader, connu sous le nom de 'L'Ombre'.",
  headquarters: 'loc:kuldahar:underground-vaults',
  leader: 'npc:kuldahar:the-shadow',
  rivals: ['faction:merchants-league', 'faction:royal-guard', 'faction:silver-dawn'],
  allies: ['faction:cult-veiled-lady'],
  hooks: [
    "Le Syndicat offre des contrats d'assassinat et d'espionnage.",
    "Un membre a trahi le Syndicat et doit être éliminé.",
    "Un artefact volé doit être livré discrètement à un acheteur mystérieux."
  ],
  ranks: [
    {
      id: 'pickpocket',
      name: "Tire-Laine",
      threshold: 0,
      perks: ["Accès au marché noir", "Formation au vol (+1 Dextérité)"],
      unlocks: ['quest:syndicate:first-heist']
    },
    {
      id: 'cutthroat',
      name: "Coupe-Jarret",
      threshold: 500,
      perks: ["Compétence: Attaque sournoise +1d6", "Contacts dans 3 villes"],
      unlocks: ['quest:syndicate:assassination-contract', 'recipe:poison-blade']
    },
    {
      id: 'master-thief',
      name: "Maître-Voleur",
      threshold: 1800,
      perks: ["Réseau de recel (vente objets volés +50%)", "Planque secrète"],
      unlocks: ['quest:syndicate:grand-heist', 'item:thieves-cloak']
    },
    {
      id: 'shadowmaster',
      name: "Maître de l'Ombre",
      threshold: 4000,
      perks: ["Commandement d'une cellule", "Titre: Ombre Vivante"],
      unlocks: ['quest:syndicate:crown-jewels', 'item:shadow-blade']
    }
  ],
  joinRequirements: {
    level: 3,
    skill: { skill: 'stealth', dc: 14 },
    quest: 'quest:syndicate:initiation-theft'
  }
};

// ============================================================================
// GUILDES SPÉCIALISÉES
// ============================================================================

export const ALCHEMISTS_GUILD: Faction = {
  id: 'faction:alchemists-guild',
  name: "Guilde des Alchimistes",
  type: 'guild',
  alignment: 'neutral',
  regionId: 'sylve-emeraude',
  tags: ['alchemy', 'potions', 'herbs', 'science'],
  summary: "Guilde d'alchimistes maîtrisant l'art des potions et des élixirs.",
  description: "La Guilde des Alchimistes regroupe les meilleurs apothicaires et alchimistes du royaume. Basée dans la Sylve d'Émeraude où les herbes rares poussent en abondance, la guilde expérimente constamment de nouvelles formules. Leurs membres fournissent des potions de soin, antidotes et élixirs aux aventuriers. Certains alchimistes étudient même les Cendres pour créer des remèdes.",
  headquarters: 'loc:sylve-emeraude:alchemist-lab',
  leader: 'npc:sylve:master-alchemist-yvaine',
  rivals: ['faction:circle-ashes'],
  allies: ['faction:herbalists-guild', 'faction:arcane-guild'],
  hooks: [
    "La guilde recherche une fleur rare qui ne pousse que sous la lune rouge.",
    "Un alchimiste a créé un élixir d'immortalité... mais à quel prix?",
    "Des potions défectueuses causent des mutations chez leurs utilisateurs."
  ],
  ranks: [
    {
      id: 'novice',
      name: "Novice Alchimiste",
      threshold: 0,
      perks: ["Accès au laboratoire de guilde", "Rabais sur ingrédients (-15%)"],
      unlocks: ['recipe:basic-healing-potion', 'recipe:antidote']
    },
    {
      id: 'journeyman',
      name: "Alchimiste Confirmé",
      threshold: 700,
      perks: ["+10% efficacité potions craftées", "Identification gratuite d'ingrédients"],
      unlocks: ['recipe:elixir-of-strength', 'quest:alchemist:rare-flower']
    },
    {
      id: 'master',
      name: "Maître-Alchimiste",
      threshold: 2200,
      perks: ["Transmutation mineure (cuivre→argent)", "Laboratoire personnel (si propriété)"],
      unlocks: ['recipe:philosophers-stone-fragment', 'quest:alchemist:formula-suprema']
    },
    {
      id: 'grand-master',
      name: "Grand-Maître",
      threshold: 5000,
      perks: ["Création d'élixirs légendaires", "Titre: Transmuteur Suprême"],
      unlocks: ['recipe:elixir-of-immortality', 'item:alchemists-crown']
    }
  ],
  joinRequirements: {
    profession: { type: 'alchemy', level: 1 }
  }
};

export const HUNTERS_LODGE: Faction = {
  id: 'faction:hunters-lodge',
  name: "Pavillon des Chasseurs",
  type: 'guild',
  alignment: 'neutral',
  regionId: 'monts-coeur-fer',
  tags: ['hunting', 'tracking', 'wilderness', 'rangers'],
  summary: "Guilde de chasseurs, rangers et traqueurs maîtrisant la survie en nature.",
  description: "Le Pavillon des Chasseurs rassemble les meilleurs pisteurs et chasseurs d'Aethelgard. Basés dans les Monts Cœur-de-Fer, ils connaissent tous les secrets de la nature sauvage. Ils chassent les créatures dangereuses menaçant les villages, fournissent des fourrures et viandes aux marchés, et guident les voyageurs à travers les terres hostiles. Certains chasseurs traquent même les monstres légendaires.",
  headquarters: 'loc:monts-coeur-fer:hunters-lodge',
  leader: 'npc:monts:hunt-master-thorin',
  rivals: [],
  allies: ['faction:rangers-circle', 'faction:smiths-guild'],
  hooks: [
    "Une créature mystérieuse décime les troupeaux dans les montagnes.",
    "Le Pavillon offre une prime pour la tête d'un dragon des glaces.",
    "Un membre a disparu en pistant un loup-garou légendaire."
  ],
  ranks: [
    {
      id: 'tracker',
      name: "Pisteur",
      threshold: 0,
      perks: ["Compétence: Survie +2", "Équipement de chasse basique fourni"],
      unlocks: ['quest:hunters:first-hunt']
    },
    {
      id: 'hunter',
      name: "Chasseur",
      threshold: 650,
      perks: ["+15% qualité peaux/trophées", "Connaissance des créatures rares"],
      unlocks: ['quest:hunters:beast-hunt', 'recipe:trophy-mounting']
    },
    {
      id: 'master-hunter',
      name: "Maître-Chasseur",
      threshold: 2000,
      perks: ["Compagnon animal (loup/faucon)", "Accès aux territoires de chasse exclusifs"],
      unlocks: ['quest:hunters:legendary-beast', 'item:hunters-bow']
    },
    {
      id: 'hunt-master',
      name: "Maître du Pavillon",
      threshold: 4500,
      perks: ["Titre: Fléau des Bêtes", "Organisation d'expéditions de chasse"],
      unlocks: ['quest:hunters:dragon-hunt', 'item:dragonscale-armor']
    }
  ],
  joinRequirements: {
    profession: { type: 'hunting', level: 1 }
  }
};

// ============================================================================
// AUTRES FACTIONS
// ============================================================================

export const SCHOLARS_GUILD: Faction = {
  id: 'faction:scholars-guild',
  name: "Guilde des Érudits",
  type: 'guild',
  alignment: 'neutral',
  regionId: 'val-dore',
  tags: ['knowledge', 'history', 'research', 'books'],
  summary: "Association de sages, historiens et chercheurs préservant le savoir.",
  description: "La Guilde des Érudits gère les plus grandes bibliothèques et archives d'Aethelgard. Ses membres sont historiens, archéologues, scribes et cartographes. Ils étudient l'histoire d'Ashka, déchiffrent les ruines anciennes et préservent les connaissances du passé. La grande bibliothèque de Sol Aureus contient des dizaines de milliers de volumes.",
  headquarters: 'loc:sol-aureus:great-library',
  leader: 'npc:sol-aureus:head-librarian-cassius',
  rivals: [],
  allies: ['faction:arcane-guild', 'faction:cult-veiled-lady'],
  hooks: [
    "La guilde finance des expéditions archéologiques vers les ruines d'Ashka.",
    "Un manuscrit volé contient la clé pour déchiffrer une langue ancienne.",
    "Des scribes copient frénétiquement des grimoires avant qu'ils ne se désintègrent."
  ],
  ranks: [
    {
      id: 'scribe',
      name: "Scribe",
      threshold: 0,
      perks: ["Accès bibliothèque (niveau 1)", "Copie de sorts/recettes (-50% coût)"],
      unlocks: ['quest:scholars:lost-tome']
    },
    {
      id: 'researcher',
      name: "Chercheur",
      threshold: 800,
      perks: ["Accès bibliothèque (niveau 2)", "Expertise en Histoire/Arcana +2"],
      unlocks: ['quest:scholars:decipher-ruins', 'perk:ancient-languages']
    },
    {
      id: 'sage',
      name: "Sage",
      threshold: 2500,
      perks: ["Consultation gratuite (identify items)", "Publication de traités"],
      unlocks: ['quest:scholars:expedition-ashka', 'item:tome-of-knowledge']
    },
    {
      id: 'head-scholar',
      name: "Érudit Suprême",
      threshold: 5500,
      perks: ["Accès à toutes les archives secrètes", "Titre: Gardien du Savoir"],
      unlocks: ['quest:scholars:lost-library', 'item:staff-of-the-sage']
    }
  ],
  joinRequirements: {
    level: 1,
    skill: { skill: 'history', dc: 12 }
  }
};

export const ABYSS_CULT: Faction = {
  id: 'faction:abyss-cult',
  name: "Culte de l'Abysse",
  type: 'cult',
  alignment: 'evil',
  regionId: 'terres-brulees',
  tags: ['demon', 'void', 'corruption', 'forbidden'],
  summary: "Secte adorant les entités du Miroir des Ombres et de l'Abysse.",
  description: "Le Culte de l'Abysse est une organisation secrète et mortellement dangereuse. Ses membres vénèrent les entités du Miroir des Ombres — dimension parallèle remplie d'horreurs indicibles. Ils cherchent à ouvrir des portails vers l'Abysse et invoquent des démons. Leur présence est sévèrement réprimée et leurs rituels sont considérés comme crimes de haute trahison. La plupart opèrent depuis les Terres Brûlées où la frontière entre mondes est affaiblie.",
  headquarters: 'loc:terres-brulees:void-shrine',
  leader: 'npc:terres-brulees:void-prophet',
  rivals: ['faction:silver-dawn', 'faction:cult-solarius', 'faction:arcane-guild'],
  allies: ['faction:circle-ashes'],
  hooks: [
    "Des villages entiers sont retrouvés déserts, leurs habitants disparus.",
    "Un portail vers l'Abysse s'ouvre lors de chaque pleine lune.",
    "Le culte promet pouvoir absolu à quiconque accepte de servir les Entités."
  ],
  ranks: [
    {
      id: 'thrall',
      name: "Esclave de l'Abysse",
      threshold: 0,
      perks: ["Vision dans l'obscurité totale", "Résistance à la peur"],
      unlocks: ['quest:abyss:first-pact']
    },
    {
      id: 'cultist',
      name: "Cultiste du Vide",
      threshold: 500,
      perks: ["Invocation mineure (imp)", "Marque de l'Abysse (camouflable)"],
      unlocks: ['quest:abyss:open-portal', 'recipe:void-essence']
    },
    {
      id: 'void-priest',
      name: "Prêtre du Vide",
      threshold: 1800,
      perks: ["Invocation majeure (démon)", "Transformation partielle (tentacules)"],
      unlocks: ['quest:abyss:sacrifice-ritual', 'item:void-tome']
    },
    {
      id: 'herald',
      name: "Héraut de l'Abysse",
      threshold: 4000,
      perks: ["Pact ultime (pouvoir immense, corruption totale)", "Titre: Élu des Ténèbres"],
      unlocks: ['quest:abyss:summon-archfiend', 'item:abyssal-crown']
    }
  ],
  joinRequirements: {
    level: 10,
    reputation: { 'faction:silver-dawn': -1000, 'faction:cult-solarius': -1000 }
  }
};

export const ROYAL_GUARD: Faction = {
  id: 'faction:royal-guard',
  name: "Garde Royale",
  type: 'political',
  alignment: 'neutral',
  regionId: 'val-dore',
  tags: ['military', 'law', 'order', 'kingdom'],
  summary: "Force militaire officielle protégeant le royaume et maintenant l'ordre.",
  description: "La Garde Royale est l'armée régulière du royaume de Val Doré. Elle maintient l'ordre, protège les frontières, escorte les caravanes et réprime les bandits. Basée à Sol Aureus, elle a des garnisons dans chaque grande ville. Les gardes sont formés au combat et à l'application de la loi. Rejoindre la garde offre un salaire stable et une respectabilité sociale.",
  headquarters: 'loc:sol-aureus:royal-barracks',
  leader: 'npc:sol-aureus:captain-general-marcus',
  rivals: ['faction:shadow-syndicate', 'faction:circle-ashes', 'faction:abyss-cult'],
  allies: ['faction:silver-dawn'],
  hooks: [
    "La garde recrute pour une campagne contre les bandits dans les montagnes.",
    "Un capitaine est soupçonné de corruption et doit être enquêté.",
    "Une forteresse frontalière est assiégée par des créatures des Cendres."
  ],
  ranks: [
    {
      id: 'recruit',
      name: "Recrue",
      threshold: 0,
      perks: ["Entraînement militaire gratuit", "Équipement standard fourni"],
      unlocks: ['quest:guard:first-patrol']
    },
    {
      id: 'soldier',
      name: "Soldat",
      threshold: 400,
      perks: ["Salaire mensuel (50 gold)", "Logement dans casernes"],
      unlocks: ['quest:guard:bandit-camp']
    },
    {
      id: 'sergeant',
      name: "Sergent",
      threshold: 1500,
      perks: ["Commandement d'une escouade", "Salaire mensuel (150 gold)"],
      unlocks: ['quest:guard:fortify-border', 'item:guard-captain-armor']
    },
    {
      id: 'captain',
      name: "Capitaine de la Garde",
      threshold: 3500,
      perks: ["Commandement d'une garnison", "Titre: Défenseur du Royaume"],
      unlocks: ['quest:guard:war-campaign', 'property:garrison-quarters']
    }
  ],
  joinRequirements: {
    level: 1
  }
};

export const RANGERS_CIRCLE: Faction = {
  id: 'faction:rangers-circle',
  name: "Cercle des Rangers",
  type: 'guild',
  alignment: 'neutral',
  regionId: 'sylve-emeraude',
  tags: ['nature', 'protection', 'wilderness', 'rangers'],
  summary: "Organisation de rangers protégeant la nature et l'équilibre sauvage.",
  description: "Le Cercle des Rangers est composé de gardiens de la nature dédiés à protéger les forêts, montagnes et terres sauvages d'Aethelgard. Ils combattent la corruption des Cendres qui transforme la nature en désolation. Basés dans la Sylve d'Émeraude, ils ont des avant-postes dans toutes les zones sauvages. Les rangers sont experts en survie, pistage et communication avec les animaux.",
  headquarters: 'loc:sylve-emeraude:rangers-grove',
  leader: 'npc:sylve:ranger-commander-elara',
  rivals: ['faction:circle-ashes', 'faction:abyss-cult'],
  allies: ['faction:hunters-lodge', 'faction:cult-veiled-lady'],
  hooks: [
    "Le Cercle signale une corruption magique transformant les forêts.",
    "Un tréant ancien demande de l'aide contre des bûcherons illégaux.",
    "Des rangers ont disparu en explorant une grotte mystérieuse."
  ],
  ranks: [
    {
      id: 'initiate',
      name: "Initié Ranger",
      threshold: 0,
      perks: ["Compétence: Survie +2", "Communication basique avec animaux"],
      unlocks: ['quest:rangers:first-patrol']
    },
    {
      id: 'ranger',
      name: "Ranger Confirmé",
      threshold: 700,
      perks: ["Compagnon animal (loup/ours)", "Passage libre dans terres sauvages"],
      unlocks: ['quest:rangers:cleanse-corruption', 'recipe:natural-remedy']
    },
    {
      id: 'warden',
      name: "Gardien de la Nature",
      threshold: 2300,
      perks: ["Sort: Appel de la Nature", "Sanctuaire dans forêts sacrées"],
      unlocks: ['quest:rangers:treant-alliance', 'item:rangers-bow']
    },
    {
      id: 'arch-ranger',
      name: "Arch-Ranger",
      threshold: 5000,
      perks: ["Forme animale (transformation)", "Titre: Protecteur des Terres Sauvages"],
      unlocks: ['quest:rangers:natures-wrath', 'item:cloak-of-the-forest']
    }
  ],
  joinRequirements: {
    level: 3,
    skill: { skill: 'nature', dc: 14 }
  }
};

export const MINERS_GUILD: Faction = {
  id: 'faction:miners-guild',
  name: "Guilde des Mineurs",
  type: 'guild',
  alignment: 'neutral',
  regionId: 'monts-coeur-fer',
  tags: ['mining', 'ore', 'gems', 'underground'],
  summary: "Guilde contrôlant l'extraction minière et le commerce des minerais.",
  description: "La Guilde des Mineurs gère toutes les opérations minières dans les Monts Cœur-de-Fer. Ses membres extraient fer, cuivre, or, argent, mythril et pierres précieuses des profondeurs montagneuses. La guilde régule les droits miniers, assure la sécurité des mines et négocie avec les forgerons. Les mineurs font face aux dangers des grottes : éboulements, gaz toxiques et créatures souterraines.",
  headquarters: 'loc:hammerdeep:miners-hall',
  leader: 'npc:hammerdeep:mine-overseer-durgan',
  rivals: [],
  allies: ['faction:smiths-guild', 'faction:merchants-league'],
  hooks: [
    "Une veine de mythril a été découverte dans une mine abandonnée.",
    "Des mineurs ont percé une caverne ancienne remplie de créatures.",
    "La guilde offre des primes pour sécuriser des mines infestées."
  ],
  ranks: [
    {
      id: 'digger',
      name: "Mineur Débutant",
      threshold: 0,
      perks: ["Équipement minier fourni", "Formation à la sécurité en mine"],
      unlocks: ['recipe:basic-ore-extraction']
    },
    {
      id: 'prospector',
      name: "Prospecteur",
      threshold: 600,
      perks: ["+15% rendement minerais", "Détection de veines cachées"],
      unlocks: ['quest:miners:lost-mine', 'recipe:gem-cutting']
    },
    {
      id: 'master-miner',
      name: "Maître-Mineur",
      threshold: 2000,
      perks: ["Droits miniers (claim de mine personnelle)", "Salaire mensuel (100 gold)"],
      unlocks: ['quest:miners:deep-expedition', 'item:mythril-pickaxe']
    },
    {
      id: 'overseer',
      name: "Contremaître",
      threshold: 4500,
      perks: ["Gestion d'opérations minières", "Titre: Seigneur des Profondeurs"],
      unlocks: ['quest:miners:adamantine-vein', 'property:mining-operation']
    }
  ],
  joinRequirements: {
    profession: { type: 'mining', level: 1 }
  }
};

export const HERBALISTS_GUILD: Faction = {
  id: 'faction:herbalists-guild',
  name: "Guilde des Herboristes",
  type: 'guild',
  alignment: 'neutral',
  regionId: 'sylve-emeraude',
  tags: ['herbs', 'healing', 'nature', 'plants'],
  summary: "Guilde d'herboristes maîtrisant les propriétés des plantes médicinales.",
  description: "La Guilde des Herboristes regroupe ceux qui connaissent les secrets des plantes. Basée dans la Sylve d'Émeraude, la guilde cultive des jardins médicinaux et explore les forêts pour trouver des herbes rares. Ses membres fournissent des remèdes naturels, antidotes et composants alchimiques. Certains herboristes étudient même les plantes mutées par les Cendres.",
  headquarters: 'loc:sylve-emeraude:herbalist-gardens',
  leader: 'npc:sylve:herbalist-elder-gwyneth',
  rivals: [],
  allies: ['faction:alchemists-guild', 'faction:rangers-circle'],
  hooks: [
    "Une maladie mystérieuse se répand et seule une plante rare peut la soigner.",
    "La guilde cultive une fleur légendaire qui ne fleurit qu'une fois par siècle.",
    "Des herbes mutées par les Cendres ont des propriétés étranges."
  ],
  ranks: [
    {
      id: 'gatherer',
      name: "Cueilleur d'Herbes",
      threshold: 0,
      perks: ["Identification d'herbes communes", "Accès aux jardins de guilde"],
      unlocks: ['recipe:healing-salve', 'recipe:herbal-tea']
    },
    {
      id: 'herbalist',
      name: "Herboriste Confirmé",
      threshold: 650,
      perks: ["+10% efficacité remèdes", "Connaissance herbes rares"],
      unlocks: ['quest:herbalist:rare-bloom', 'recipe:antitoxin']
    },
    {
      id: 'master-herbalist',
      name: "Maître-Herboriste",
      threshold: 2000,
      perks: ["Jardin personnel (si propriété)", "Création d'hybrides"],
      unlocks: ['quest:herbalist:legendary-flower', 'recipe:panacea']
    },
    {
      id: 'elder',
      name: "Ancien Herboriste",
      threshold: 4500,
      perks: ["Communion avec esprits végétaux", "Titre: Gardien des Plantes"],
      unlocks: ['quest:herbalist:tree-of-life', 'item:staff-of-growth']
    }
  ],
  joinRequirements: {
    profession: { type: 'herbalism', level: 1 }
  }
};

export const SAILORS_UNION: Faction = {
  id: 'faction:sailors-union',
  name: "Union des Marins",
  type: 'guild',
  alignment: 'neutral',
  regionId: 'cote-orages',
  tags: ['sailing', 'ships', 'ocean', 'trade'],
  summary: "Syndicat de marins, capitaines et dockers gérant les activités maritimes.",
  description: "L'Union des Marins représente tous les travailleurs des ports et de la mer sur la Côte des Orages. Elle négocie les salaires, assure la sécurité maritime et forme les nouveaux marins. L'Union gère également les droits de pêche et combat les pirates. Rejoindre l'Union garantit un travail sur les navires marchands et protection en mer.",
  headquarters: 'loc:kuldahar:sailors-hall',
  leader: 'npc:kuldahar:harborm aster-torgen',
  rivals: ['faction:shadow-syndicate'],
  allies: ['faction:merchants-league', 'faction:royal-guard'],
  hooks: [
    "L'Union cherche des aventuriers pour escorter des navires contre les pirates.",
    "Une tempête mystérieuse empêche tout navire de quitter le port.",
    "Un capitaine légendaire cherche un équipage pour une expédition périlleuse."
  ],
  ranks: [
    {
      id: 'deckhand',
      name: "Matelot",
      threshold: 0,
      perks: ["Formation navigation", "Embarquement garanti sur navires marchands"],
      unlocks: ['quest:sailors:first-voyage']
    },
    {
      id: 'sailor',
      name: "Marin Expérimenté",
      threshold: 500,
      perks: ["Salaire de marin (80 gold/mois)", "Résistance au mal de mer"],
      unlocks: ['quest:sailors:pirate-encounter', 'perk:sea-legs']
    },
    {
      id: 'first-mate',
      name: "Second",
      threshold: 1800,
      perks: ["Commandement en second", "Part de butin augmentée"],
      unlocks: ['quest:sailors:mutiny', 'item:sailors-cutlass']
    },
    {
      id: 'captain',
      name: "Capitaine",
      threshold: 4000,
      perks: ["Commandement d'un navire", "Titre: Maître des Mers"],
      unlocks: ['quest:sailors:legendary-voyage', 'property:merchant-ship']
    }
  ],
  joinRequirements: {
    level: 1
  }
};

// ============================================================================
// EXPORTS ET REGISTRY
// ============================================================================

export const ALL_FACTIONS: Faction[] = [
  CULT_OF_SOLARIUS,
  CULT_OF_VEILED_LADY,
  ARCANE_GUILD,
  SMITHS_GUILD,
  MERCHANTS_LEAGUE,
  SILVER_DAWN,
  CIRCLE_OF_ASHES,
  SHADOW_SYNDICATE,
  ALCHEMISTS_GUILD,
  HUNTERS_LODGE,
  SCHOLARS_GUILD,
  ABYSS_CULT,
  ROYAL_GUARD,
  RANGERS_CIRCLE,
  MINERS_GUILD,
  HERBALISTS_GUILD,
  SAILORS_UNION
];

export const FACTIONS_BY_ID: Record<string, Faction> = ALL_FACTIONS.reduce((acc, faction) => {
  acc[faction.id] = faction;
  return acc;
}, {} as Record<string, Faction>);

export const FACTIONS_BY_REGION: Record<string, Faction[]> = ALL_FACTIONS.reduce((acc, faction) => {
  if (!faction.regionId) return acc;
  if (!acc[faction.regionId]) acc[faction.regionId] = [];
  acc[faction.regionId].push(faction);
  return acc;
}, {} as Record<string, Faction[]>);
