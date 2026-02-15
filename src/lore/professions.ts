/**
 * AETHELGARD PROFESSIONS - Système complet de métiers
 * 12 métiers (8 artisanat + 4 récolte) avec progression et spécialisations
 */

import type { ProfessionType, SkillCheck } from './schema';

// ============================================================================
// PROFESSION DEFINITIONS
// ============================================================================

export interface ProfessionDefinition {
  type: ProfessionType;
  name: string;
  category: 'crafting' | 'gathering';
  description: string;
  primaryStat: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
  associatedSkill: string;
  trainingCost: number; // Coût pour apprendre le métier
  maxLevel: number;
  specializations?: {
    name: string;
    description: string;
    levelRequired: number;
    bonus: string;
  }[];
  levelBonuses: {
    level: number;
    bonus: string;
  }[];
  tools?: {
    name: string;
    cost: number;
    description: string;
  }[];
}

// ============================================================================
// CRAFTING PROFESSIONS
// ============================================================================

export const SMITHING: ProfessionDefinition = {
  type: 'smithing',
  name: "Forge",
  category: 'crafting',
  description: "L'art de façonner le métal en armes, armures et outils. Les forgerons maîtrisent le feu et l'enclume pour créer des équipements de qualité supérieure. Les maîtres-forgerons peuvent travailler des métaux rares comme le mythril et l'adamantine.",
  primaryStat: 'str',
  associatedSkill: 'smithing',
  trainingCost: 100,
  maxLevel: 100,
  specializations: [
    {
      name: "Maître-Armurier",
      description: "Spécialisation dans la création d'armures. +10% AC sur armures craftées.",
      levelRequired: 30,
      bonus: "+10% AC sur armures"
    },
    {
      name: "Forgeron d'Armes",
      description: "Spécialisation dans les armes. +1 dégâts sur armes craftées.",
      levelRequired: 30,
      bonus: "+1 dégâts armes"
    },
    {
      name: "Forgeron Runique",
      description: "Peut graver des runes magiques sur équipement métallique.",
      levelRequired: 60,
      bonus: "Gravure de runes"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "Déblocage: Acier" },
    { level: 25, bonus: "+5% qualité items" },
    { level: 40, bonus: "Déblocage: Mythril" },
    { level: 50, bonus: "Réparations coûtent 50% moins cher" },
    { level: 75, bonus: "Déblocage: Adamantine" },
    { level: 100, bonus: "Chance de créer items Masterwork (+20% stats)" }
  ],
  tools: [
    { name: "Marteau de Forgeron", cost: 10, description: "Outil basique pour travailler le métal" },
    { name: "Enclume Portative", cost: 50, description: "Permet de forger en dehors d'une forge" },
    { name: "Forge Runique", cost: 500, description: "Nécessaire pour graver des runes" }
  ]
};

export const ALCHEMY: ProfessionDefinition = {
  type: 'alchemy',
  name: "Alchimie",
  category: 'crafting',
  description: "La science de mélanger ingrédients pour créer potions, élixirs et philtres. Les alchimistes maîtrisent les propriétés des plantes, minéraux et essences magiques pour produire des breuvages aux effets variés.",
  primaryStat: 'int',
  associatedSkill: 'alchemy',
  trainingCost: 150,
  maxLevel: 100,
  specializations: [
    {
      name: "Maître-Apothicaire",
      description: "Spécialisation en potions de soin. +50% efficacité potions de soin.",
      levelRequired: 30,
      bonus: "+50% efficacité potions soin"
    },
    {
      name: "Empoisonneur",
      description: "Spécialisation en poisons et toxines. Poisons durent 2x plus longtemps.",
      levelRequired: 30,
      bonus: "Poisons 2x durée"
    },
    {
      name: "Transmutateur",
      description: "Peut transmuter certains matériaux en d'autres (cuivre→argent).",
      levelRequired: 70,
      bonus: "Transmutation mineure"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "+10% efficacité potions" },
    { level: 25, bonus: "Déblocage: Élixirs (effets permanents)" },
    { level: 40, bonus: "+20% rendement ingrédients" },
    { level: 50, bonus: "2 potions pour le prix d'une (chance 25%)" },
    { level: 75, bonus: "Déblocage: Grand Élixirs" },
    { level: 100, bonus: "Création Pierre Philosophale (transmutation majeure)" }
  ],
  tools: [
    { name: "Kit d'Alchimie Portable", cost: 25, description: "Fioles, alambic, mortier" },
    { name: "Table Alchimique", cost: 100, description: "Station complète pour alchimie avancée" },
    { name: "Alambic Magique", cost: 500, description: "Permet de distiller essences magiques" }
  ]
};

export const ENCHANTING: ProfessionDefinition = {
  type: 'enchanting',
  name: "Enchantement",
  category: 'crafting',
  description: "L'art d'imprégner objets de magie. Les enchanteurs peuvent ajouter des propriétés magiques aux équipements, créer des amulettes et désenchanter des items pour en extraire l'essence.",
  primaryStat: 'int',
  associatedSkill: 'arcana',
  trainingCost: 200,
  maxLevel: 100,
  specializations: [
    {
      name: "Enchanteur d'Armes",
      description: "Spécialisation armes. Enchantements d'armes coûtent 30% moins cher.",
      levelRequired: 30,
      bonus: "-30% coût enchantements armes"
    },
    {
      name: "Enchanteur d'Armures",
      description: "Spécialisation armures. +1 niveau enchantements défensifs.",
      levelRequired: 30,
      bonus: "+1 niveau enchantements défensifs"
    },
    {
      name: "Maître-Runiste",
      description: "Peut créer des runes permanentes réutilisables.",
      levelRequired: 75,
      bonus: "Création runes permanentes"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "Déblocage: Enchantements mineurs (+1/+2)" },
    { level: 25, bonus: "Désenchantement (récupère 50% essences)" },
    { level: 40, bonus: "Déblocage: Enchantements majeurs (+3/+4)" },
    { level: 50, bonus: "+1 slot enchantement sur items" },
    { level: 75, bonus: "Déblocage: Enchantements suprêmes (+5/+6)" },
    { level: 100, bonus: "Enchantements légendaires (+7/+8, effets uniques)" }
  ],
  tools: [
    { name: "Bâton d'Enchantement", cost: 50, description: "Canalise l'énergie magique" },
    { name: "Table d'Enchantement", cost: 200, description: "Amplifie pouvoir des enchantements" },
    { name: "Cristal d'Âme", cost: 1000, description: "Stocke essences magiques puissantes" }
  ]
};

export const COOKING: ProfessionDefinition = {
  type: 'cooking',
  name: "Cuisine",
  category: 'crafting',
  description: "L'art de préparer nourriture et boissons. Les cuisiniers créent des plats qui restaurent santé, mana et octroient des buffs temporaires. Les grands chefs peuvent préparer des festins magiques.",
  primaryStat: 'wis',
  associatedSkill: 'survival',
  trainingCost: 50,
  maxLevel: 100,
  specializations: [
    {
      name: "Chef Pâtissier",
      description: "Spécialisation desserts. Buffs de moral (+2 Charisme, 1h).",
      levelRequired: 25,
      bonus: "Buffs de moral"
    },
    {
      name: "Maître-Boucher",
      description: "Spécialisation viandes. +30% rendement viandes récoltées.",
      levelRequired: 25,
      bonus: "+30% rendement viandes"
    },
    {
      name: "Cuisinier Magique",
      description: "Peut infuser plats avec potions pour effets combinés.",
      levelRequired: 60,
      bonus: "Cuisine alchimique"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "Plats restaurent +25% HP/Mana" },
    { level: 25, bonus: "Déblocage: Buffs de combat (1h)" },
    { level: 40, bonus: "+50% durée buffs nourriture" },
    { level: 50, bonus: "Plats donnent résistances élémentaires" },
    { level: 75, bonus: "Déblocage: Festins (buff groupe, 2h)" },
    { level: 100, bonus: "Banquet Royal (buff groupe, +20% toutes stats, 4h)" }
  ],
  tools: [
    { name: "Ustensiles de Cuisine", cost: 5, description: "Couteaux, casseroles, poêle" },
    { name: "Feu de Camp Portable", cost: 15, description: "Permet de cuisiner partout" },
    { name: "Four Magique", cost: 300, description: "Cuit instantanément, bonus qualité" }
  ]
};

export const TAILORING: ProfessionDefinition = {
  type: 'tailoring',
  name: "Couture",
  category: 'crafting',
  description: "L'art de créer vêtements, robes et armures légères en tissu. Les tailleurs peuvent travailler soie, lin, laine et fibres magiques pour produire des équipements élégants et enchantables.",
  primaryStat: 'dex',
  associatedSkill: 'sleight-of-hand',
  trainingCost: 75,
  maxLevel: 100,
  specializations: [
    {
      name: "Maître-Tisserand",
      description: "Spécialisation robes magiques. +1 slot enchantement robes.",
      levelRequired: 30,
      bonus: "+1 slot enchantement robes"
    },
    {
      name: "Tailleur de Luxe",
      description: "Vêtements donnent +2 Charisme pour interactions sociales.",
      levelRequired: 30,
      bonus: "+2 Charisme vêtements"
    },
    {
      name: "Tisserand Runique",
      description: "Peut tisser des runes dans le tissu lui-même.",
      levelRequired: 65,
      bonus: "Tissage runique"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "Déblocage: Armures légères en tissu" },
    { level: 25, bonus: "+10% durabilité items tissu" },
    { level: 40, bonus: "Déblocage: Soie-araignée (armure magique)" },
    { level: 50, bonus: "Items réparables avec kits basiques" },
    { level: 75, bonus: "Déblocage: Tissu éthéré (invisibilité partielle)" },
    { level: 100, bonus: "Robes légendaires (stats +5, effets spéciaux)" }
  ],
  tools: [
    { name: "Kit de Couture", cost: 10, description: "Aiguilles, fil, ciseaux" },
    { name: "Métier à Tisser", cost: 50, description: "Produit tissu de qualité supérieure" },
    { name: "Métier Runique", cost: 400, description: "Tisse runes dans le tissu" }
  ]
};

export const LEATHERWORKING: ProfessionDefinition = {
  type: 'leatherworking',
  name: "Travail du Cuir",
  category: 'crafting',
  description: "L'art de tanner peaux et créer armures de cuir, sacs et accessoires. Les maîtres-tanneurs peuvent travailler écailles de dragon et peaux de créatures magiques.",
  primaryStat: 'dex',
  associatedSkill: 'survival',
  trainingCost: 60,
  maxLevel: 100,
  specializations: [
    {
      name: "Maître-Tanneur",
      description: "Spécialisation armures. Armures de cuir donnent +1 AC.",
      levelRequired: 30,
      bonus: "+1 AC armures cuir"
    },
    {
      name: "Artisan Exotique",
      description: "Peut travailler peaux de créatures rares (basilic, chimère).",
      levelRequired: 45,
      bonus: "Peaux exotiques"
    },
    {
      name: "Écailleur",
      description: "Spécialisation écailles de dragon. Armures résistent feu/froid.",
      levelRequired: 70,
      bonus: "Armures draconiennes"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "+20% rendement tannage" },
    { level: 25, bonus: "Déblocage: Cuir renforcé" },
    { level: 40, bonus: "+15% durabilité armures cuir" },
    { level: 50, bonus: "Création de sacs magiques (slots +5)" },
    { level: 75, bonus: "Déblocage: Cuir de wyvern" },
    { level: 100, bonus: "Armures légendaires (cuir de dragon ancien)" }
  ],
  tools: [
    { name: "Outils de Tanneur", cost: 12, description: "Couteaux, pinces, huiles" },
    { name: "Cuve de Tannage", cost: 40, description: "Traite grandes peaux" },
    { name: "Presse Magique", cost: 350, description: "Durcit cuir instantanément" }
  ]
};

export const JEWELCRAFTING: ProfessionDefinition = {
  type: 'jewelcrafting',
  name: "Joaillerie",
  category: 'crafting',
  description: "L'art de tailler gemmes et créer bijoux enchantés. Les joailliers transforment pierres brutes en joyaux étincelants et forgent anneaux, colliers et couronnes magiques.",
  primaryStat: 'dex',
  associatedSkill: 'perception',
  trainingCost: 120,
  maxLevel: 100,
  specializations: [
    {
      name: "Maître-Gemmologue",
      description: "Identifie propriétés magiques des gemmes. Taille parfaite +10%.",
      levelRequired: 30,
      bonus: "Taille parfaite"
    },
    {
      name: "Forgeron de Bijoux",
      description: "Bijoux donnent +1 à une stat au choix.",
      levelRequired: 35,
      bonus: "+1 stat sur bijoux"
    },
    {
      name: "Enchâsseur",
      description: "Peut sertir 2 gemmes dans un seul bijou.",
      levelRequired: 60,
      bonus: "Double sertissage"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "+15% valeur gemmes taillées" },
    { level: 25, bonus: "Déblocage: Sertissage (gemmes → bijoux)" },
    { level: 40, bonus: "+1 niveau enchantements sur bijoux" },
    { level: 50, bonus: "Gemmes restaurent propriétés après usage (50%)" },
    { level: 75, bonus: "Déblocage: Couronnes royales" },
    { level: 100, bonus: "Création de Phylactères (stockage âme, immortalité)" }
  ],
  tools: [
    { name: "Outils de Joaillier", cost: 30, description: "Loupes, pinces, limes" },
    { name: "Table de Taille", cost: 80, description: "Coupe gemmes avec précision" },
    { name: "Forge de Bijoux", cost: 450, description: "Crée bijoux en métaux précieux" }
  ]
};

export const INSCRIPTION: ProfessionDefinition = {
  type: 'inscription',
  name: "Calligraphie",
  category: 'crafting',
  description: "L'art de créer parchemins, grimoires et glyphes magiques. Les scribes copient sorts sur parchemins, créent contrats magiques et déchiffrent textes anciens.",
  primaryStat: 'int',
  associatedSkill: 'arcana',
  trainingCost: 100,
  maxLevel: 100,
  specializations: [
    {
      name: "Maître-Scribe",
      description: "Parchemins utilisables 2 fois avant destruction.",
      levelRequired: 30,
      bonus: "Parchemins réutilisables"
    },
    {
      name: "Glyphiste",
      description: "Peut créer glyphes de protection (pièges magiques).",
      levelRequired: 40,
      bonus: "Glyphes de protection"
    },
    {
      name: "Archiviste Ancien",
      description: "Déchiffre langues mortes instantanément.",
      levelRequired: 65,
      bonus: "Compréhension langues anciennes"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "Déblocage: Parchemins sorts niveau 1-2" },
    { level: 25, bonus: "+30% durabilité parchemins" },
    { level: 40, bonus: "Déblocage: Parchemins sorts niveau 3-5" },
    { level: 50, bonus: "Création de Grimoires (+5 sorts mémorisés)" },
    { level: 75, bonus: "Déblocage: Parchemins sorts niveau 6-8" },
    { level: 100, bonus: "Codex Éternels (sorts légendaires permanents)" }
  ],
  tools: [
    { name: "Kit de Calligraphie", cost: 15, description: "Plumes, encre, parchemin" },
    { name: "Pupitre Enchanté", cost: 60, description: "Amplifie pouvoir des sorts écrits" },
    { name: "Encre Draconique", cost: 500, description: "Encre permanente, résiste tout" }
  ]
};

// ============================================================================
// GATHERING PROFESSIONS
// ============================================================================

export const MINING: ProfessionDefinition = {
  type: 'mining',
  name: "Minage",
  category: 'gathering',
  description: "L'art d'extraire minerais et gemmes des profondeurs terrestres. Les mineurs localisent veines riches et excavent ressources précieuses des mines et cavernes.",
  primaryStat: 'str',
  associatedSkill: 'perception',
  trainingCost: 50,
  maxLevel: 100,
  specializations: [
    {
      name: "Prospecteur",
      description: "Détecte veines cachées. +20% chance trouver minerais rares.",
      levelRequired: 25,
      bonus: "+20% minerais rares"
    },
    {
      name: "Gemmologue",
      description: "Extrait gemmes sans les endommager (100% rendement).",
      levelRequired: 30,
      bonus: "Extraction gemmes parfaite"
    },
    {
      name: "Explorateur des Profondeurs",
      description: "Immunité gaz toxiques, vision dans noir absolu.",
      levelRequired: 50,
      bonus: "Survie profondeurs"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "+25% rendement minerais communs" },
    { level: 25, bonus: "Détection veines (30m)" },
    { level: 40, bonus: "+50% vitesse minage" },
    { level: 50, bonus: "Extraction cristaux magiques" },
    { level: 75, bonus: "Détection trésors enfouis" },
    { level: 100, bonus: "Extraction météorite (adamantine céleste)" }
  ],
  tools: [
    { name: "Pioche de Mineur", cost: 8, description: "Outil basique extraction" },
    { name: "Pioche Renforcée", cost: 40, description: "+50% durabilité, mine plus vite" },
    { name: "Pioche Runique", cost: 250, description: "Ne se dégrade jamais, détecte gemmes" }
  ]
};

export const HERBALISM: ProfessionDefinition = {
  type: 'herbalism',
  name: "Herboristerie",
  category: 'gathering',
  description: "L'art de récolter plantes médicinales, herbes rares et champignons magiques. Les herboristes connaissent chaque espèce végétale et leurs propriétés curatives.",
  primaryStat: 'wis',
  associatedSkill: 'nature',
  trainingCost: 40,
  maxLevel: 100,
  specializations: [
    {
      name: "Botaniste",
      description: "Identifie toutes plantes instantanément. +1 herbe par récolte.",
      levelRequired: 20,
      bonus: "+1 herbe/récolte"
    },
    {
      name: "Mycologue",
      description: "Spécialisation champignons. Résistance poisons naturels.",
      levelRequired: 30,
      bonus: "Expertise champignons"
    },
    {
      name: "Druidiste",
      description: "Peut récolter sans tuer la plante (repousse immédiate).",
      levelRequired: 60,
      bonus: "Récolte durable"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "+30% rendement herbes communes" },
    { level: 25, bonus: "Détection plantes rares (20m)" },
    { level: 40, bonus: "+50% chance herbes rares" },
    { level: 50, bonus: "Récolte herbes magiques (fleur de lune)" },
    { level: 75, bonus: "Communication avec esprits végétaux" },
    { level: 100, bonus: "Récolte herbes légendaires (arbre-monde)" }
  ],
  tools: [
    { name: "Faucille", cost: 3, description: "Coupe herbes sans les abîmer" },
    { name: "Panier Enchanté", cost: 25, description: "Préserve fraîcheur herbes" },
    { name: "Faucille Druïdique", cost: 200, description: "Récolte ne tue pas plante" }
  ]
};

export const FISHING: ProfessionDefinition = {
  type: 'fishing',
  name: "Pêche",
  category: 'gathering',
  description: "L'art de capturer poissons, crustacés et créatures aquatiques. Les pêcheurs maîtres peuvent attraper poissons rares, perles et même des monstres marins.",
  primaryStat: 'dex',
  associatedSkill: 'survival',
  trainingCost: 30,
  maxLevel: 100,
  specializations: [
    {
      name: "Pêcheur en Eau Douce",
      description: "Spécialisation rivières/lacs. +2 poissons par prise.",
      levelRequired: 20,
      bonus: "+2 poissons/prise"
    },
    {
      name: "Pêcheur Océanique",
      description: "Spécialisation mer. Peut pêcher depuis navires.",
      levelRequired: 25,
      bonus: "Pêche océanique"
    },
    {
      name: "Chasseur de Trophées",
      description: "Peut attraper créatures aquatiques légendaires.",
      levelRequired: 70,
      bonus: "Pêche monstres"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "+40% chance attraper poisson" },
    { level: 25, bonus: "Pêche automatique (AFK fishing)" },
    { level: 40, bonus: "+50% chance poissons rares" },
    { level: 50, bonus: "Récolte perles et coraux" },
    { level: 75, bonus: "Pêche poissons magiques (régénération)" },
    { level: 100, bonus: "Invocation créatures marines alliées" }
  ],
  tools: [
    { name: "Canne à Pêche Simple", cost: 5, description: "Outil basique pêche" },
    { name: "Canne Renforcée", cost: 30, description: "+25% chance captures" },
    { name: "Canne Légendaire", cost: 300, description: "Attire poissons rares automatiquement" }
  ]
};

export const HUNTING: ProfessionDefinition = {
  type: 'hunting',
  name: "Chasse",
  category: 'gathering',
  description: "L'art de traquer et abattre gibier sauvage. Les chasseurs fournissent viandes, peaux et trophées. Les maîtres-chasseurs traquent des créatures légendaires.",
  primaryStat: 'dex',
  associatedSkill: 'survival',
  trainingCost: 45,
  maxLevel: 100,
  specializations: [
    {
      name: "Pisteur Expert",
      description: "Suit traces jusqu'à 24h. Jamais ne perd une piste.",
      levelRequired: 25,
      bonus: "Pistage parfait"
    },
    {
      name: "Chasseur de Gros Gibier",
      description: "Spécialisation créatures grandes (ours, cerfs, sangliers).",
      levelRequired: 30,
      bonus: "+2 récoltes gros gibier"
    },
    {
      name: "Chasseur de Dragons",
      description: "Peut traquer et tuer dragons. Trophées légendaires.",
      levelRequired: 80,
      bonus: "Chasse draconique"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "+30% rendement viandes" },
    { level: 25, bonus: "Dépeçage rapide (30sec → 5sec)" },
    { level: 40, bonus: "+50% qualité peaux" },
    { level: 50, bonus: "Récolte trophées rares (cornes, dents)" },
    { level: 75, bonus: "Chasse silencieuse (créatures ne fuient pas)" },
    { level: 100, bonus: "Chasse légendaire (wyrms, béhémoths)" }
  ],
  tools: [
    { name: "Arc de Chasse", cost: 20, description: "Arme distance silencieuse" },
    { name: "Pièges à Gibier", cost: 10, description: "Capture animaux vivants" },
    { name: "Kit de Dépeçage", cost: 15, description: "Récolte viande et peaux" }
  ]
};

export const SKINNING: ProfessionDefinition = {
  type: 'skinning',
  name: "Dépeçage",
  category: 'gathering',
  description: "L'art de récupérer peaux, cuirs et écailles sur créatures tuées. Les dépeçeurs experts peuvent récupérer organes, os et composants magiques.",
  primaryStat: 'dex',
  associatedSkill: 'survival',
  trainingCost: 35,
  maxLevel: 100,
  specializations: [
    {
      name: "Écorcheur Expert",
      description: "Peaux récoltées parfaites (qualité +20%).",
      levelRequired: 25,
      bonus: "Qualité peaux +20%"
    },
    {
      name: "Récupérateur d'Organes",
      description: "Récolte cœurs, yeux, glandes (composants alchimie).",
      levelRequired: 35,
      bonus: "Récolte organes"
    },
    {
      name: "Chasseur d'Essences",
      description: "Extrait essences magiques de créatures enchantées.",
      levelRequired: 65,
      bonus: "Extraction essences"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "+40% rendement cuirs" },
    { level: 25, bonus: "Récolte écailles (reptiles/dragons)" },
    { level: 40, bonus: "+2 cuirs par créature" },
    { level: 50, bonus: "Récolte os et cornes" },
    { level: 75, bonus: "Récolte composants magiques rares" },
    { level: 100, bonus: "Récolte sang de dragon (encre légendaire)" }
  ],
  tools: [
    { name: "Couteau de Dépeçage", cost: 8, description: "Découpe peaux proprement" },
    { name: "Kit de Chirurgie", cost: 40, description: "Extrait organes intacts" },
    { name: "Lame d'Essence", cost: 350, description: "Coupe liens magiques, extrait essences" }
  ]
};

export const LOGGING: ProfessionDefinition = {
  type: 'logging',
  name: "Bûcheronnage",
  category: 'gathering',
  description: "L'art d'abattre arbres et récupérer bois de qualité. Les bûcherons fournissent bois de construction, planches et bois rares pour crafting.",
  primaryStat: 'str',
  associatedSkill: 'survival',
  trainingCost: 25,
  maxLevel: 100,
  specializations: [
    {
      name: "Forestier",
      description: "Détecte arbres de qualité. +30% rendement bois.",
      levelRequired: 20,
      bonus: "+30% rendement"
    },
    {
      name: "Arboriste Magique",
      description: "Peut couper bois d'arbres enchantés (sylphe, tréant mort).",
      levelRequired: 45,
      bonus: "Bois magique"
    },
    {
      name: "Gardien des Forêts",
      description: "Replante arbre après coupe (karma +50 Rangers).",
      levelRequired: 60,
      bonus: "Sylviculture durable"
    }
  ],
  levelBonuses: [
    { level: 10, bonus: "+35% rendement bois commun" },
    { level: 25, bonus: "Abattage rapide (1 min → 15 sec)" },
    { level: 40, bonus: "+50% chance bois rare (chêne, ébène)" },
    { level: 50, bonus: "Récolte sève et résine" },
    { level: 75, bonus: "Coupe bois ancien (ironwood)" },
    { level: 100, bonus: "Récolte bois sacré (arbre-monde, éternel)" }
  ],
  tools: [
    { name: "Hache de Bûcheron", cost: 10, description: "Abat arbres moyens" },
    { name: "Hache Renforcée", cost: 50, description: "+50% vitesse, durabilité 2x" },
    { name: "Hache Runique", cost: 280, description: "Coupe bois magique, jamais ne casse" }
  ]
};

// ============================================================================
// SERVICE & SPECIALIZED PROFESSIONS
// ============================================================================

export const ARCHITECTURE: ProfessionDefinition = {
  type: 'architecture',
  name: "Architecture",
  category: 'crafting',
  description: "Conception et construction de bâtiments, fortifications et structures complexes. Les architectes combinent art et ingénierie pour créer des édifices durables.",
  primaryStat: 'int',
  associatedSkill: 'architecture',
  trainingCost: 200,
  maxLevel: 100,
  specializations: [
    { name: "Architecte Militaire", description: "Fortifications et structures défensives", levelRequired: 40, bonus: "Fortifications +30% résistance" },
    { name: "Urbaniste", description: "Planification de villes et quartiers", levelRequired: 60, bonus: "Efficacité urbaine +20%" }
  ],
  levelBonuses: [
    { level: 10, bonus: "Coût construction -10%" },
    { level: 25, bonus: "Vitesse construction +15%" },
    { level: 50, bonus: "Structures complexes" },
    { level: 75, bonus: "Architecture monumentale" }
  ],
  tools: [
    { name: "Planche à dessin", cost: 50, description: "Outil de base pour les plans" },
    { name: "Kit d'architecte", cost: 300, description: "Ensemble complet d'outils de précision" }
  ]
};

export const ENGINEERING: ProfessionDefinition = {
  type: 'engineering',
  name: "Ingénierie",
  category: 'crafting',
  description: "Création de mécanismes complexes, machines et inventions. Les ingénieurs maîtrisent physique et mécanique pour créer des appareils révolutionnaires.",
  primaryStat: 'int',
  associatedSkill: 'engineering',
  trainingCost: 180,
  maxLevel: 100,
  specializations: [
    { name: "Ingénieur de Siège", description: "Machines de guerre et engins de siège", levelRequired: 35, bonus: "Engins +25% puissance" },
    { name: "Horloger", description: "Mécanismes précis et automates", levelRequired: 50, bonus: "Mécanismes +20% fiabilité" }
  ],
  levelBonuses: [
    { level: 10, bonus: "Mécanismes de base" },
    { level: 25, bonus: "Machines complexes" },
    { level: 50, bonus: "Automates simples" },
    { level: 75, bonus: "Dispositifs magico-technologiques" }
  ],
  tools: [
    { name: "Outils d'ingénieur", cost: 75, description: "Ensemble de base pour mécaniciens" },
    { name: "Atelier portable", cost: 250, description: "Station de travail mobile" }
  ]
};

export const CARTOGRAPHY: ProfessionDefinition = {
  type: 'cartography',
  name: "Cartographie",
  category: 'crafting',
  description: "Création de cartes détaillées et navigation. Les cartographes documentent routes, points d'intérêt et dangers. Les maîtres créent des cartes magiques.",
  primaryStat: 'wis',
  associatedSkill: 'cartography',
  trainingCost: 120,
  maxLevel: 100,
  specializations: [
    { name: "Cartographe Maritime", description: "Cartes maritimes et navigation", levelRequired: 30, bonus: "Navigation +20% précision" },
    { name: "Cartographe Souterrain", description: "Cartes de donjons et souterrains", levelRequired: 40, bonus: "Donjons +25% détails" }
  ],
  levelBonuses: [
    { level: 10, bonus: "Cartes de base" },
    { level: 25, bonus: "Cartes détaillées" },
    { level: 50, bonus: "Cartes magiques simples" },
    { level: 75, bonus: "Cartes prophétiques" }
  ],
  tools: [
    { name: "Kit de cartographe", cost: 60, description: "Outils de base pour cartographier" },
    { name: "Boussole magique", cost: 200, description: "Boussole avec propriétés magiques" }
  ]
};

export const MUSIC: ProfessionDefinition = {
  type: 'music',
  name: "Musique",
  category: 'crafting',
  description: "Composition et interprétation musicale. Les musiciens créent des mélodies qui inspirent, soignent ou enchantent. Les maîtres composent des oeuvres légendaires.",
  primaryStat: 'cha',
  associatedSkill: 'music',
  trainingCost: 100,
  maxLevel: 100,
  specializations: [
    { name: "Barde", description: "Musique narrative et chants épiques", levelRequired: 25, bonus: "Inspiration +20% efficacité" },
    { name: "Compositeur", description: "Oeuvres musicales complexes", levelRequired: 40, bonus: "Oeuvres magiques +25% puissance" }
  ],
  levelBonuses: [
    { level: 10, bonus: "Instruments de base" },
    { level: 25, bonus: "Effets émotionnels" },
    { level: 50, bonus: "Musique curative" },
    { level: 75, bonus: "Composition légendaire" }
  ],
  tools: [
    { name: "Instrument de musique", cost: 40, description: "Instrument de base" },
    { name: "Instrument magique", cost: 300, description: "Instrument avec propriétés magiques" }
  ]
};

export const MEDICINE: ProfessionDefinition = {
  type: 'medicine',
  name: "Médecine",
  category: 'crafting',
  description: "Diagnostic et traitement des maladies et blessures. Les médecins étudient anatomie et remèdes pour soigner les afflictions.",
  primaryStat: 'wis',
  associatedSkill: 'medicine',
  trainingCost: 150,
  maxLevel: 100,
  specializations: [
    { name: "Chirurgien", description: "Interventions médicales invasives", levelRequired: 35, bonus: "Chirurgie +25% succès" },
    { name: "Herboriste Médical", description: "Pharmacologie et remèdes naturels", levelRequired: 25, bonus: "Potions médicinales +20% efficacité" }
  ],
  levelBonuses: [
    { level: 10, bonus: "Soins de base améliorés" },
    { level: 25, bonus: "Diagnostic avancé" },
    { level: 50, bonus: "Potions complexes" },
    { level: 75, bonus: "Traitement maladies magiques" }
  ],
  tools: [
    { name: "Kit médical", cost: 80, description: "Outils de base pour médecin" },
    { name: "Laboratoire alchimique", cost: 400, description: "Équipement pour potions avancées" }
  ]
};

export const COMMERCE: ProfessionDefinition = {
  type: 'commerce',
  name: "Commerce",
  category: 'crafting',
  description: "Négociation, vente et gestion d'entreprises. Les commerçants maîtrisent l'art de la négociation et établissent des réseaux commerciaux.",
  primaryStat: 'cha',
  associatedSkill: 'commerce',
  trainingCost: 90,
  maxLevel: 100,
  specializations: [
    { name: "Négociateur", description: "Négociation et diplomatie commerciale", levelRequired: 30, bonus: "Négociation +25% efficacité" },
    { name: "Maître de Caravane", description: "Organisation de routes commerciales", levelRequired: 40, bonus: "Commerce +20% profit" }
  ],
  levelBonuses: [
    { level: 10, bonus: "Prix améliorés de 10%" },
    { level: 25, bonus: "Réseaux commerciaux" },
    { level: 50, bonus: "Caravanes commerciales" },
    { level: 75, bonus: "Influence économique" }
  ],
  tools: [
    { name: "Balance commerciale", cost: 30, description: "Outil pour peser et évaluer" },
    { name: "Registre de commerce", cost: 50, description: "Registre pour transactions" }
  ]
};

export const AGRICULTURE: ProfessionDefinition = {
  type: 'agriculture',
  name: "Agriculture",
  category: 'gathering',
  description: "Culture de plantes et gestion de fermes. Les agriculteurs font pousser des récoltes. Les maîtres cultivent des plantes rares et magiques.",
  primaryStat: 'wis',
  associatedSkill: 'agriculture',
  trainingCost: 70,
  maxLevel: 100,
  specializations: [
    { name: "Herboriste Agricole", description: "Plantes médicinales et rares", levelRequired: 35, bonus: "Plantes rares +30% rendement" },
    { name: "Viticulteur", description: "Culture de vignes et production de vin", levelRequired: 25, bonus: "Vins +25% valeur" }
  ],
  levelBonuses: [
    { level: 10, bonus: "Rendement +10%" },
    { level: 25, bonus: "Cultures saisonnières" },
    { level: 50, bonus: "Plantes magiques" },
    { level: 75, bonus: "Optimisation des récoltes" }
  ],
  tools: [
    { name: "Outils d'agriculteur", cost: 40, description: "Ensemble de base pour agriculture" },
    { name: "Irrigation améliorée", cost: 150, description: "Système d'irrigation avancé" }
  ]
};

export const ANIMAL_HUSBANDRY: ProfessionDefinition = {
  type: 'animal-husbandry',
  name: "Élevage",
  category: 'gathering',
  description: "Élevage d'animaux domestiques et production de ressources animales. Les éleveurs s'occupent de bétail, montures et animaux de compagnie.",
  primaryStat: 'wis',
  associatedSkill: 'animal-husbandry',
  trainingCost: 80,
  maxLevel: 100,
  specializations: [
    { name: "Éleveur de Montures", description: "Montures et animaux de guerre", levelRequired: 30, bonus: "Montures +25% performance" },
    { name: "Éleveur Magique", description: "Créatures magiques rares", levelRequired: 50, bonus: "Créatures magiques +30% rendement" }
  ],
  levelBonuses: [
    { level: 10, bonus: "Animaux de base" },
    { level: 25, bonus: "Montures simples" },
    { level: 50, bonus: "Créatures exotiques" },
    { level: 75, bonus: "Élevage avancé" }
  ],
  tools: [
    { name: "Équipement d'élevage", cost: 50, description: "Outils de base pour éleveur" },
    { name: "Enclos amélioré", cost: 200, description: "Installation pour créatures spéciales" }
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const ALL_PROFESSIONS: ProfessionDefinition[] = [
  // Crafting
  SMITHING,
  ALCHEMY,
  ENCHANTING,
  COOKING,
  TAILORING,
  LEATHERWORKING,
  JEWELCRAFTING,
  INSCRIPTION,
  ARCHITECTURE,
  ENGINEERING,
  CARTOGRAPHY,
  MUSIC,
  MEDICINE,
  COMMERCE,
  // Gathering
  MINING,
  HERBALISM,
  FISHING,
  HUNTING,
  SKINNING,
  LOGGING,
  AGRICULTURE,
  ANIMAL_HUSBANDRY
];

export const PROFESSIONS_BY_TYPE: Record<ProfessionType, ProfessionDefinition> = ALL_PROFESSIONS.reduce((acc, prof) => {
  acc[prof.type] = prof;
  return acc;
}, {} as Record<ProfessionType, ProfessionDefinition>);

export const CRAFTING_PROFESSIONS = ALL_PROFESSIONS.filter(p => p.category === 'crafting');
export const GATHERING_PROFESSIONS = ALL_PROFESSIONS.filter(p => p.category === 'gathering');

/**
 * Calcule l'XP requise pour atteindre un niveau
 */
export function getXPForLevel(level: number): number {
  // Formule exponentielle : level^2 * 100
  return Math.floor(Math.pow(level, 2) * 100);
}

/**
 * Calcule le niveau actuel basé sur l'XP
 */
export function getLevelFromXP(xp: number): number {
  let level = 1;
  while (getXPForLevel(level + 1) <= xp && level < 100) {
    level++;
  }
  return level;
}

/**
 * Trouve une profession par son type
 */
export function getProfession(type: ProfessionType): ProfessionDefinition | undefined {
  return PROFESSIONS_BY_TYPE[type];
}

/**
 * Vérifie si un joueur peut apprendre une nouvelle profession
 */
export function canLearnProfession(currentProfessions: number, maxProfessions: number = 2): boolean {
  return currentProfessions < maxProfessions;
}
