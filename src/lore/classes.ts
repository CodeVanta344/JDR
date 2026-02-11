// Types
export interface ClassCategory {
    label: string;
    desc: string;
    classes: string[];
    color: string;
    icon: string;
}

export interface Stats {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

export interface Mechanic {
    name: string;
    desc: string;
}

export interface Protection {
    armor: string[];
    weapons: string[];
    shields: boolean;
}

export interface BackstoryOption {
    id: string;
    label: string;
    desc: string;
    stats: Partial<Stats>;
}

export interface ItemStats {
    atk?: number;
    ac?: number;
    int?: number;
    dex?: number;
    wis?: number;
    cha?: number;
    mana?: number;
}

export interface StartingEquipmentItem {
    name: string;
    type: string;
    category?: string;
    slot: string;
    stats: ItemStats;
    rarity: string;
    desc: string;
    equipped: boolean;
    img?: string;
    range?: number;
}

export interface StartingEquipmentOption {
    label: string;
    items: StartingEquipmentItem[];
}

export interface Ability {
    name: string;
    cost: number;
    cooldown: number;
    level: number;
    dice?: string;
    scaling?: string;
    type?: string;
    actionType?: string;
    flavor?: string;
    desc?: string;
    vfx?: string;
    range?: number;
    heal?: string;
    resource?: number;
}

export interface SubclassDetails {
    style: string;
    feature: string;
}

export interface Subclass {
    label: string;
    desc: string;
    details: SubclassDetails;
}

export interface Class {
    label: string;
    category: string;
    hitDie: number;
    resourceStat: string;
    desc: string;
    mechanic: Mechanic;
    stats: Stats;
    protection: Protection;
    backstory_options: BackstoryOption[];
    starting_equipment_options: StartingEquipmentOption[];
    initial_ability_options: Ability[];
    subclasses: Record<string, Subclass>;
    abilities: any[];
    unlockables: Ability[];
    portrait: string;
}

export const CLASS_CATEGORIES: Record<string, ClassCategory> = {
    "MIGHT": {
        label: "Sang et Acier",
        desc: "Héros de la force brute et de la résilience. Ils dominent le champ de bataille par la puissance physique.",
        classes: ["Guerrier", "Paladin"],
        color: "#ff4d4d",
        icon: "⚔️"
    },
    "MAGIC": {
        label: "Arcanes et Mystères",
        desc: "Maîtres des énergies cosmiques et divines. Ils plient la réalité à leur volonté.",
        classes: ["Mage", "Clerc", "Druide"],
        color: "#4da6ff",
        icon: "🔥"
    },
    "SKILL": {
        label: "Ombre et Ruse",
        desc: "Spécialistes de l'agilité et de la précision. Ils frappent là où ça fait mal, souvent sans être vus.",
        classes: ["Voleur", "Rôdeur", "Barde"],
        color: "#4dff88",
        icon: "🗡️"
    }
};

export const CLASSES: Record<string, Class> = {
    "Guerrier": {
        label: "Guerrier",
        category: "MIGHT",
        hitDie: 12,
        resourceStat: "con",
        desc: "Un maître de la guerre infatigable. Absence totale de magie compensée par une puissance physique brute inégalée.",
        mechanic: {
            name: "Adrénaline",
            desc: "La magie vous est inaccessible. Chaque coup porté ou reçu génère de l'Adrénaline (points de ressource). \n\n• **Rage de Sang**: À plus de 50 points, vos dégâts physiques augmentent de 25%.\n• **Second Souffle**: Vous pouvez dépenser toute votre Adrénaline pour vous soigner (1 PV par point dépensé)."
        },
        stats: { str: 18, dex: 12, con: 16, int: 8, wis: 10, cha: 10 },
        protection: { armor: ["light", "medium", "heavy"], weapons: ["simple", "martial"], shields: true },
        backstory_options: [
            { id: "soldat", label: "Vétéran de la Garde d'Or", desc: "Vous avez servi dans l'armée régulière de Sol-Aureus avant d'être congédié sans solde. Vous cherchez une raison de continuer à porter l'acier.", stats: { str: 2, int: -2 } },
            { id: "gladiateur", label: "Briseur de Chaînes", desc: "Évadé des fosses de combat de l'Empire Ashka, vous ne connaissez que la violence comme langage, mais aspirez à une liberté chèrement acquise.", stats: { con: 2, cha: -2 } },
            { id: "mercenaire", label: "Lame à Louer", desc: "Votre honneur a un prix. Vous avez parcouru Aethelgard sous tous les climats, protégeant des caravanes pour quelques pièces de cuivre.", stats: { str: 2, wis: -2 } }
        ],
        starting_equipment_options: [
            {
                label: "Le Chevalier d'Acier",
                items: [
                    { name: "Épée longue", type: "weapon", category: "martial", slot: "main", stats: { atk: 3 }, rarity: "common", desc: "Acier trempé de Sol-Aureus.", equipped: true, img: "/items/longsword.png" },
                    { name: "Bouclier en bois", type: "shield", category: "shield", slot: "off", stats: { ac: 2 }, rarity: "common", desc: "Renforcé de fer.", equipped: true },
                    { name: "Cotte de mailles", type: "armor", category: "heavy", slot: "body", stats: { ac: 4 }, rarity: "common", desc: "Bruyante mais protectrice.", equipped: true }
                ]
            },
            {
                label: "Le Gladiateur Brute",
                items: [
                    { name: "Grande Hache", type: "weapon", category: "martial", slot: "main", stats: { atk: 5 }, rarity: "common", desc: "Une arme de destruction massive.", equipped: true, img: "/items/greataxe.png" },
                    { name: "Peaux de bêtes", type: "armor", category: "medium", slot: "body", stats: { ac: 2 }, rarity: "common", desc: "Laisse les bras libres.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Frappe Puissante", cost: 15, cooldown: 2, level: 1, dice: "1d10", scaling: "str", type: "Physique", actionType: "Action", flavor: "Un coup d'une brutalité sauvage, capable d'écraser les os et de traverser le cuir le plus épais.", desc: "Ignore 2 points d'armure de la cible.", vfx: "slash_red" },
            { name: "Heurt de Bouclier", cost: 10, cooldown: 3, level: 1, dice: "1d4", scaling: "str", type: "Physique", actionType: "Action", flavor: "Vous utilisez votre bouclier non pas pour parer, mais comme un marteau de fer pour sonner l'adversaire.", desc: "Chance d'étourdir la cible pendant 1 tour.", vfx: "impact_white" },
            { name: "Posture Défensive", cost: 5, cooldown: 4, level: 1, type: "Posture", actionType: "Action Bonus", flavor: "Vous ancrez vos pieds dans le sol et serrez les dents, vous préparant à l'inévitable déferlement de coups.", desc: "Réduit les dégâts subis de 3 pendant 1 tour.", vfx: "shield_glow" }
        ],
        subclasses: {
            "juggernaut": { label: "Juggernaut", desc: "Une muraille vivante.", details: { style: "Défenseur", feature: "Forteresse Vivante : Réduit tous les dégâts subis de 50%, mais votre vitesse tombe à 0 pour ce tour." } },
            "maitre_armes": { label: "Maître d'Armes", desc: "Tacticien martial.", details: { style: "Contrôle", feature: "Manœuvre Supérieure : Votre maîtrise permet de désarmer une cible ou de la mettre à terre lors d'une attaque." } },
            "berserker": { label: "Berserker", desc: "La rage incarnée.", details: { style: "Dégâts", feature: "Bain de Sang : Attaque tourbillon frappant tous les ennemis proches et vous soignant d'une partie des dégâts." } }
        },
        abilities: [],
        unlockables: [
            { name: "Second Souffle", cost: 0, cooldown: 5, level: 2, dice: "1d10", scaling: "level", desc: "Récupère 1d10 + Niveau PV (Action Bonus)." },
            { name: "Provocation", cost: 10, cooldown: 3, level: 3, range: 2, desc: "Force les ennemis à 2 cases à vous attaquer." },
            { name: "Critique Amélioré", cost: 0, cooldown: 0, level: 4, desc: "Vos coups critiques se déclenchent sur 19-20 (Passif)." },
            { name: "Attaque Supplémentaire", cost: 0, cooldown: 0, level: 5, desc: "Vous pouvez attaquer deux fois par action (Passif)." },
            { name: "Brise-Genoux", cost: 20, cooldown: 4, level: 6, scaling: "str", desc: "Inflige des dégâts normaux et réduit la vitesse de la cible à 0." },
            { name: "Défense Absolue", cost: 30, cooldown: 6, level: 7, desc: "Réaction : Annule une attaque qui vous toucherait." },
            { name: "Cri de Guerre", cost: 40, cooldown: 8, level: 8, range: 4, desc: "Tous les alliés à 4 cases gagnent Avantage et +10 PV temp." },
            { name: "Indomptable", cost: 0, cooldown: 0, level: 9, desc: "Si vous tombez à 0 PV, vous remontez à 1 PV (1/Long Repos)." },
            { name: "Avatar de la Guerre", cost: 100, cooldown: 20, level: 10, desc: "ULTIME : Pendant 3 tours, vous êtes invulnérable aux dégâts non-magiques et infligez double dégâts." },
            { name: "Maîtrise du Recul", cost: 0, cooldown: 0, level: 12, desc: "Chaque fois que vous touchez, vous pouvez repousser la cible de 1 case (Passif)." },
            { name: "Frappe Sismique", cost: 50, cooldown: 5, level: 15, dice: "5d10", scaling: "str", range: 3, desc: "Frappe le sol, infligeant des dégâts de zone et mettant à terre les ennemis à 3 cases." },
            { name: "Sang de Titan", cost: 0, cooldown: 0, level: 18, desc: "Votre maximum de PV augmente de 20% (Passif)." },
            { name: "LÉGENDAIRE : Brise-Âme", cost: 75, cooldown: 10, level: 20, dice: "10d10", scaling: "str", desc: "Une attaque qui ignore l'armure et réduit les stats de la cible de moitié pendant 2 tours." },
            { name: "Résilience Éternelle", cost: 0, cooldown: 0, level: 25, desc: "Immunité aux effets de peur, de charme et de paralysie (Passif)." },
            { name: "ASCENSION : Dieu du Champ de Bataille", cost: 150, cooldown: 50, level: 30, desc: "Pendant 5 tours, vous devenez gigantesque. Vos attaques frappent tous les ennemis dans un rayon de 5 cases et vous ne pouvez pas tomber en dessous de 1 PV." }
        ],
        portrait: "/portraits/guerrier.png"
    },
    "Mage": {
        label: "Mage",
        category: "MAGIC",
        hitDie: 6,
        resourceStat: "int",
        desc: "Maître absolu des arcanes complexes. Puissance cosmique au prix d'une fragilité physique extrême.",
        mechanic: {
            name: "Surcharge Arcanique",
            desc: "Vos sorts sont dévastateurs mais instables. Chaque lancement génère de la **Chaleur**.\n\n• **Malus Physique**: -2 sur les tests de Force et Constitution.\n• **Surcharge**: Si votre Mana tombe à 0 ou si vous lancez trop de sorts, vous entrez en Surcharge : vos dégâts sont doublés mais vous perdez 5 PV par tour jusqu'à stabilisation."
        },
        stats: { str: 6, dex: 12, con: 8, int: 18, wis: 14, cha: 12 },
        protection: { armor: ["none"], weapons: ["simple", "arcane"], shields: false },
        backstory_options: [
            { id: "apprenti", label: "Banni de l'Académie", desc: "Vos recherches sur la Surcharge Arcanique ont été jugées trop dangereuses. On vous a retiré vos titres, mais pas votre savoir.", stats: { int: 2, con: -2 } },
            { id: "heritier", label: "Dernier Sang-pur", desc: "Vous descendez d'une lignée de mages d'avant l'Ère des Cendres. Les échos de vos ancêtres vous guident vers les ruines oubliées.", stats: { wis: 2, str: -2 } },
            { id: "autodidacte", label: "Sorcier des Terres Brûlées", desc: "Vous avez appris la magie seul, en observant les tempêtes d'éther. Votre pouvoir est sauvage, imprévisible et pur.", stats: { int: 2, cha: -2 } }
        ],
        starting_equipment_options: [
            {
                label: "L'Érudit Arcanique",
                items: [
                    { name: "Bâton en If", type: "weapon", category: "arcane", slot: "main", stats: { atk: 1, int: 1 }, rarity: "common", desc: "Canalise l'énergie pure.", equipped: true, img: "/items/staff.png" },
                    { name: "Grimoire de l'Apprenti", type: "offhand", category: "arcane", slot: "off", stats: { mana: 10 }, rarity: "common", desc: "Contient des notes sur le flux d'éther.", equipped: true },
                    { name: "Robe en Soie Magique", type: "armor", category: "light", slot: "body", stats: { ac: 1 }, rarity: "common", desc: "Légère et conductrice.", equipped: true }
                ]
            },
            {
                label: "Le Sorcier de Rue",
                items: [
                    { name: "Dague de Duel", type: "weapon", category: "finesse", slot: "main", stats: { atk: 1 }, rarity: "common", desc: "Utile quand le mana manque.", equipped: true, img: "/items/dagger.png" },
                    { name: "Orbe de Cristal", type: "offhand", category: "arcane", slot: "off", stats: { int: 2 }, rarity: "common", desc: "Amplifie la vision arcanique.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Trait Arcanique", cost: 8, cooldown: 0, level: 1, dice: "1d10", scaling: "int", range: 10, type: "Arcane", actionType: "Action", flavor: "Un dard de lumière azurée, crépitant d'énergie instable, s'élance de vos doigts vers le cœur de l'ennemi.", desc: "Projectile magique à longue portée.", vfx: "magic_bolt_blue" },
            { name: "Onde de Choc", cost: 15, cooldown: 2, level: 1, dice: "2d6", scaling: "int", range: 3, type: "Élémentaire", actionType: "Action", flavor: "Vous frappez l'air de vos paumes, créant une distorsion violente qui balaie tout sur son passage.", desc: "Repousse les ennemis proches de 2 cases.", vfx: "shockwave_purple" },
            { name: "Bouclier de Mana", cost: 5, cooldown: 3, level: 1, type: "Abjuration", actionType: "Réaction", flavor: "Au moment de l'impact, une membrane de géométrie éthérée se matérialise pour absorber le choc.", desc: "Consomme 1 MP pour chaque point de dégât absorbé.", vfx: "mana_shield" }
        ],
        subclasses: {
            "elementaliste": { label: "Élémentaliste", desc: "Maître des éléments.", details: { style: "Artillerie", feature: "Maîtrise Élémentaire : Vos sorts percent les défenses et ignorent la résistance élémentaire de la cible." } },
            "chronomancien": { label: "Chronomancien", desc: "Maître du temps.", details: { style: "Contrôle", feature: "Déjà Vu : Une fois par jour, remontez le temps pour relancer un jet d'attaque ou de sauvegarde raté." } },
            "sang-de-dragon": { label: "Sang-de-Dragon", desc: "Héritier draconique.", details: { style: "Résistance", feature: "Résilience Draconique : Votre peau se couvre d'écailles mystiques. CA de base 13 + Dex." } }
        },
        abilities: [],
        unlockables: [
            { name: "Bouclier de Mana", cost: 15, cooldown: 3, level: 2, desc: "Absorbe les dégâts en échange de stabilité." },
            { name: "Nova", cost: 30, cooldown: 5, level: 3, dice: "3d6", scaling: "int", range: 2, desc: "Explosion de zone autour du mage (Rayon : 2 cases)." },
            { name: "Méditation", cost: 0, cooldown: 10, level: 4, resource: 50, desc: "Régénère 50 Mana hors combat (Canalisé)." },
            { name: "Boule de Feu", cost: 40, cooldown: 4, level: 5, dice: "8d6", scaling: "int", range: 8, desc: "Dégâts de feu dans une zone de 2 cases (Portée : 8 cases)." },
            { name: "Hâte", cost: 30, cooldown: 6, level: 6, range: 4, desc: "Double la vitesse et +2 CA pour un allié à 4 cases." },
            { name: "Contresort", cost: 20, cooldown: 2, level: 7, range: 6, desc: "Réaction : Annule un sort adverse à 6 cases." },
            { name: "Métamorphose", cost: 50, cooldown: 8, level: 8, range: 6, desc: "Transforme une cible à 6 cases en mouton." },
            { name: "Désintégration", cost: 60, cooldown: 5, level: 9, dice: "10d6+40", scaling: "int", range: 7, desc: "Gros dégâts de force (Portée : 7 cases)." },
            { name: "Arrêt du Temps", cost: 100, cooldown: 30, level: 10, desc: "ULTIME : Vous jouez 3 tours de suite sans interruption." },
            { name: "Esprit de Cristal", cost: 0, cooldown: 0, level: 15, desc: "Votre intelligence augmente de façon permanente et vous régénérez 5 Mana par tour (Passif)." },
            { name: "LÉGENDAIRE : Singularité", cost: 80, cooldown: 10, level: 20, dice: "20d6", scaling: "int", range: 10, desc: "Crée un trou noir qui aspire et désintègre les ennemis dans un rayon de 4 cases." },
            { name: "Morsure de l'Abysse", cost: 50, cooldown: 5, level: 25, dice: "12d8", scaling: "int", range: 8, desc: "Draine la force vitale d'une cible et vous soigne de la moitié des dégâts." },
            { name: "ASCENSION : Entité Purement Arcanique", cost: 200, cooldown: 60, level: 30, desc: "Pendant 3 tours, vous n'avez plus de coûts de Mana, vos sorts n'ont plus de cooldown, et vous êtes immunisé à tous les dégâts magiques." }
        ],
        portrait: "/portraits/mage.png"
    },
    "Voleur": {
        label: "Voleur",
        category: "SKILL",
        hitDie: 8,
        resourceStat: "dex",
        desc: "Une ombre mortelle. Pas de magie, mais une agilité et une précision qui défient les lois arcaniques.",
        mechanic: {
            name: "Précision Chirurgicale",
            desc: "L'énergie coule dans vos gestes. \n\n• **Point Faible**: Vos attaques contre les ennemis avec moins de 50% de PV ont +5 au jet de toucher.\n• **Combo**: Chaque attaque réussie réduit le coût en Énergie de votre prochaine capacité de 5 points (cumulable 3 fois)."
        },
        stats: { str: 10, dex: 18, con: 12, int: 12, wis: 10, cha: 14 },
        protection: { armor: ["light"], weapons: ["simple", "finesse"], shields: false },
        backstory_options: [
            { id: "orphelin", label: "Ombre des Bas-fonds", desc: "Né dans la misère de la Cité Haute, vous avez survécu en volant ceux qui ignoraient votre existence. La discrétion est votre seule amie.", stats: { dex: 2, cha: -2 } },
            { id: "espion", label: "Agent Délaissé", desc: "Vous travailliez pour une puissance étrangère avant que votre réseau ne soit démantelé. Vous êtes maintenant un fantôme cherchant un nouveau but.", stats: { int: 2, str: -2 } },
            { id: "noblesse", label: "Gentleman Cambrioleur", desc: "Issu d'une famille déchue, vous volez pour restaurer votre nom ou simplement pour prouver que vous êtes le meilleur.", stats: { cha: 2, con: -2 } }
        ],
        starting_equipment_options: [
            {
                label: "L'Assassin de l'Ombre",
                items: [
                    { name: "Dague de Duel", type: "weapon", category: "finesse", slot: "main", stats: { atk: 1, dex: 1 }, rarity: "common", desc: "Parfaite pour les points vitaux.", equipped: true, img: "/items/dagger.png" },
                    { name: "Dague de Duel", type: "weapon", category: "finesse", slot: "off", stats: { atk: 1 }, rarity: "common", desc: "Une deuxième lame pour les combos.", equipped: true, img: "/items/dagger.png" },
                    { name: "Armure de Cuir Souple", type: "armor", category: "light", slot: "body", stats: { ac: 2 }, rarity: "common", desc: "Ne fait aucun bruit.", equipped: true }
                ]
            },
            {
                label: "Le Tireur de Dagues",
                items: [
                    { name: "Set de Dagues de Lancer", type: "weapon", category: "finesse", slot: "main", stats: { atk: 1 }, rarity: "common", desc: "L'acier vole plus vite que le vent.", equipped: true, range: 10 },
                    { name: "Kit de Crochetage", type: "tool", slot: "item", stats: { dex: 1 }, rarity: "common", desc: "Aucune serrure ne résiste.", equipped: false },
                    { name: "Cape Noire", type: "armor", category: "light", slot: "body", stats: { ac: 1 }, rarity: "common", desc: "Se fond dans l'obscurité.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Attaque Sournoise", cost: 12, cooldown: 0, level: 1, dice: "1d6", scaling: "dex", type: "Précision", actionType: "Passif", flavor: "Vous profitez de la moindre seconde d'inattention pour loger votre lame entre deux vertèbres.", desc: "Ajoute +1d6 dégâts si vous avez l'avantage.", vfx: "slash_purple" },
            { name: "Disparition", cost: 15, cooldown: 4, level: 1, type: "Ombre", actionType: "Action Bonus", flavor: "Un mouvement fluide dans les angles morts, une ombre qui se fond dans les ténèbres... et vous n'êtes plus là.", desc: "Entrez en état d'invisibilité.", vfx: "smoke_puff" },
            { name: "Lancer de Dague", cost: 5, cooldown: 0, level: 1, dice: "1d4", scaling: "dex", range: 8, type: "Physique", actionType: "Action", flavor: "Une lueur argentée, le sifflement du vent, et l'acier trouve sa cible avant même qu'elle n'ait pu crier.", desc: "Attaque rapide à distance.", vfx: "dagger_throw" }
        ],
        subclasses: {
            "assassin": { label: "Assassin", desc: "Tueur silencieux.", details: { style: "Burst", feature: "Marque de Mort : Toute attaque portée contre une créature surprise est automatiquement un coup critique." } },
            "acrobate": { label: "Acrobate", desc: "Agile et intouchable.", details: { style: "Esquive", feature: "Pas de Vent : Utilisez votre Réaction pour esquiver et diviser par deux les dégâts d'une attaque." } },
            "ombre": { label: "Maître des Ombres", desc: "Magie sombre.", details: { style: "Invisibilité", feature: "Manteau de Nuit : Vous devenez invisible tant que vous restez dans une zone de lumière faible ou de ténèbres." } }
        },
        abilities: [],
        unlockables: [
            { name: "Disparition", cost: 15, cooldown: 4, level: 2, desc: "Action bonus pour se cacher en plein combat." },
            { name: "Esquive Étrange", cost: 20, cooldown: 3, level: 3, desc: "Réduit de moitié les dégâts d'une attaque perçue." },
            { name: "Expertise", cost: 0, cooldown: 0, level: 4, desc: "+2 à tous les jets de compétences (Passif)." },
            { name: "Coup Bas", cost: 15, cooldown: 2, range: 1, desc: "Aveugle l'ennemi adjacent (1 case) pour 1 tour." },
            { name: "Pas de l'Ombre", cost: 25, cooldown: 3, level: 6, range: 6, desc: "Téléportation de 6 cases d'une ombre à l'autre." },
            { name: "Poison Mortel", cost: 20, cooldown: 4, level: 7, dice: "2d6", scaling: "dex", desc: "Applique un poison au contact." },
            { name: "Assassinat", cost: 50, cooldown: 5, level: 8, dice: "x3", scaling: "dex", desc: "Attaque qui inflige x3 dégâts si caché." },
            { name: "Réflexes Éclairs", cost: 40, cooldown: 10, level: 9, desc: "Vous jouez deux tours complets au premier round." },
            { name: "Ombre Dansante", cost: 80, cooldown: 15, level: 10, desc: "ULTIME : Invincible et invisible pendant 2 tours tout en attaquant." },
            { name: "Manteau de l'Abysse", cost: 0, cooldown: 0, level: 15, desc: "Vous êtes considéré comme caché tant que vous ne portez pas d'attaque (Passif)." },
            { name: "LÉGENDAIRE : Danse des Lames", cost: 100, cooldown: 12, level: 20, dice: "1d8", scaling: "dex", desc: "Vous effectuez une attaque contre chaque ennemi dans un rayon de 10 cases." },
            { name: "Cœur de Néant", cost: 0, cooldown: 0, level: 25, desc: "Vos attaques ignorent toute forme de résistance physique (Passif)." },
            { name: "ASCENSION : Fantôme d'Aethelgard", cost: 150, cooldown: 60, level: 30, desc: "Vous devenez éthéré. Vous pouvez traverser les murs, vos attaques sont des critiques automatiques, et personne ne peut vous cibler pendant 5 tours." }
        ],
        portrait: "/portraits/voleur.png"
    },
    "Clerc": {
        label: "Clerc",
        category: "MAGIC",
        hitDie: 8,
        resourceStat: "wis",
        desc: "Bras armé et soignant des Dieux. Classe Hybride combinant soutien divin et robustesse physique.",
        mechanic: {
            name: "Ferveur Divine",
            desc: "Votre foi alimente vos miracles. \n\n• **Lumière Intérieure**: Vos soins critiques restaurent 50% de Mana.\n• **Bouclier de Foi**: Porter une armure lourde ne pénalise pas vos sorts divins."
        },
        stats: { str: 14, dex: 10, con: 14, int: 10, wis: 16, cha: 12 },
        protection: { armor: ["light", "medium", "heavy"], weapons: ["simple"], shields: true },
        backstory_options: [
            { id: "missionnaire", label: "Voix de la Lumière", desc: "Vous parcourez les terres désolées pour apporter l'espoir là où règnent les ombres.", stats: { wis: 2, str: -2 } },
            { id: "inquisiteur", label: "Marteau des Hérétiques", desc: "Vous traquez les cultistes de l'Ombre avec une dévotion absolue.", stats: { wis: 2, dex: -2 } },
            { id: "ermite", label: "Gardien des Écritures", desc: "Vous avez passé des décennies à méditer sur les anciens textes du Crystal.", stats: { int: 2, cha: -2 } }
        ],
        starting_equipment_options: [
            {
                label: "Le Gardien de la Foi",
                items: [
                    { name: "Masse d'Acier Bénie", type: "weapon", category: "simple", slot: "main", stats: { atk: 2, wis: 1 }, rarity: "common", desc: "Purifie par le choc.", equipped: true, img: "/items/mace.png" },
                    { name: "Bouclier Rond", type: "shield", category: "shield", slot: "off", stats: { ac: 2 }, rarity: "common", desc: "Orné d'un soleil d'or.", equipped: true },
                    { name: "Cotte de Mailles", type: "armor", category: "heavy", slot: "body", stats: { ac: 4, dex: -1 }, rarity: "common", desc: "Une défense solide.", equipped: true }
                ]
            },
            {
                label: "Le Soigneur Errant",
                items: [
                    { name: "Bâton de Pèlerin", type: "weapon", category: "simple", slot: "main", stats: { atk: 1, wis: 2 }, rarity: "common", desc: "Marké de runes de soin.", equipped: true, img: "/items/staff.png" },
                    { name: "Amulette Sacrée", type: "accessory", slot: "neck", stats: { mana: 10 }, rarity: "common", desc: "Relique d'un ancien temple.", equipped: true },
                    { name: "Robe de Clergé", type: "armor", category: "light", slot: "body", stats: { ac: 1, wis: 1 }, rarity: "common", desc: "Simple mais protectrice.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Mot de Guérison", cost: 15, cooldown: 2, level: 1, dice: "1d4", scaling: "wis", range: 6, type: "Lumière", actionType: "Action Bonus", flavor: "Une simple syllabe du Crystal Céleste suffit à refermer les plaies et à redonner espoir aux cœurs vaillants.", desc: "Soin rapide à distance.", vfx: "heal_gold" },
            { name: "Flamme Sacrée", cost: 10, cooldown: 0, level: 1, dice: "1d8", scaling: "wis", range: 8, type: "Radieux", actionType: "Action", flavor: "Une colonne de feu blanc descend des cieux pour purifier ceux qui s'opposent à la volonté divine.", desc: "La cible ne bénéficie d'aucun bonus de couvert.", vfx: "holy_fire" },
            { name: "Bénédiction", cost: 20, cooldown: 4, level: 1, range: 4, type: "Bénédiction", actionType: "Action", flavor: "Vous tracez un symbole sacré dans l'air, insufflant une fraction de la puissance du Crystal en vos alliés.", desc: "Donne +1d4 aux jets d'attaque de 3 alliés.", vfx: "bless_glow" }
        ],
        subclasses: {
            "guerre": { label: "Domaine de Guerre", desc: "Combattant divin.", details: { style: "Offensif", feature: "Frappe Divine : Vos attaques d'armes infligent 1d8 dégâts radiants bonus." } },
            "vie": { label: "Domaine de Vie", desc: "Guérisseur suprême.", details: { style: "Soin", feature: "Sanctuaire Suprême : Vos soins sont augmentés de 20% + Niveau." } },
            "tombes": { label: "Domaine des Tombes", desc: "Gardien du seuil.", details: { style: "Anti-Mort", feature: "Refus de Mourir : Réaction pour maintenir un allié à 1 PV au lieu de 0." } }
        },
        abilities: [],
        unlockables: [
            { name: "Rayon Traceur", cost: 20, cooldown: 3, level: 2, dice: "4d6", scaling: "wis", range: 9, desc: "Dégâts radiants puissants (Portée : 9 cases)." },
            { name: "Esprit Gardien", cost: 40, cooldown: 5, level: 3, dice: "3d8", scaling: "wis", range: 2, desc: "Aura de dégâts autour du clerc." },
            { name: "Restauration", cost: 30, cooldown: 0, level: 4, range: 1, desc: "Dissipe les maladies et altérations." },
            { name: "Colonne de Feu", cost: 45, cooldown: 4, level: 5, dice: "8d6", scaling: "wis", range: 8, desc: "Dégâts de feu et radiants dans une zone." },
            { name: "Sanctuaire", cost: 25, cooldown: 6, level: 6, range: 4, desc: "Protège un allié contre les attaques." },
            { name: "Mot de Rappel", cost: 60, cooldown: 10, level: 7, desc: "Téléporte le groupe en lieu sûr." },
            { name: "Guérison de Masse", cost: 80, cooldown: 8, level: 8, dice: "10d8", scaling: "wis", range: 6, desc: "Soigne tous les alliés à 6 cases." },
            { name: "Résurrection", cost: 100, cooldown: 0, level: 9, desc: "Ramène un allié à la vie." },
            { name: "Intervention Divine", cost: 100, cooldown: 50, level: 10, desc: "ULTIME : Votre Dieu intervient directement (Effet aléatoire majeur)." },
            { name: "Saint-Suaire", cost: 0, cooldown: 0, level: 15, desc: "Immunité aux dégâts nécrotiques et résistance au poison (Passif)." },
            { name: "LÉGENDAIRE : Jugement Dernier", cost: 120, cooldown: 15, level: 20, dice: "15d10", scaling: "wis", range: 12, desc: "Un pilier de lumière s'abat, vaporisant les morts-vivants et soignant les alliés." },
            { name: "Mains de Solarius", cost: 0, cooldown: 0, level: 25, desc: "Vos sorts de soin restaurent également 10 points de ressource à la cible (Passif)." },
            { name: "ASCENSION : Messager du Voile", cost: 200, cooldown: 72, level: 30, desc: "Pendant 5 tours, vous êtes invulnérable, vos soins n'ont plus de portée, et chaque attaque adverse contre vous déclenche un contre-châtiment." }
        ],
        portrait: "/portraits/clerc.png"
    },
    "Paladin": {
        label: "Paladin",
        category: "MIGHT",
        hitDie: 10,
        resourceStat: "cha",
        desc: "Chevalier saint. Classe Hybride d'élite. Excellent au combat physique, soutenu par une magie sacrée simple.",
        mechanic: {
            name: "Châtiment Sanctifié",
            desc: "Votre charisme dicte votre puissance sacrée.\n\n• **Smite**: Vous pouvez convertir du Mana en dés de dégâts supplémentaires (1d8 par 10 points) lors d'une attaque réussie.\n• **Protection d'Aura**: Les alliés proches gagnent +2 à leur Classe d'Armure tant que vous êtes debout."
        },
        stats: { str: 16, dex: 10, con: 14, int: 8, wis: 12, cha: 14 },
        protection: { armor: ["light", "medium", "heavy"], weapons: ["simple", "martial"], shields: true },
        backstory_options: [
            { id: "errant", label: "Chevalier de la Route", desc: "Sans domaine ni seigneur, vous suivez votre code d'honneur personnel pour protéger les faibles et les opprimés.", stats: { con: 2, int: -2 } },
            { id: "vengeur", label: "Scalp de l'Injustice", desc: "Votre famille a été massacrée par des pillards. Vous avez prêté un serment de sang pour ne jamais laisser un tel crime impuni.", stats: { str: 2, cha: -2 } },
            { id: "templier", label: "Garde du Temple Sacré", desc: "Ancien défenseur d'un lieu saint maintenant en ruines, vous cherchez à purifier le monde pour restaurer la glory de votre dieu.", stats: { wis: 2, dex: -2 } }
        ],
        starting_equipment_options: [
            {
                label: "Le Croisé Impérial",
                items: [
                    { name: "Épée Longue", type: "weapon", category: "martial", slot: "main", stats: { atk: 3 }, rarity: "common", desc: "Acier béni.", equipped: true, img: "/items/longsword.png" },
                    { name: "Bouclier en Acier", type: "shield", category: "shield", slot: "off", stats: { ac: 2 }, rarity: "common", desc: "Gravé de symboles saints.", equipped: true },
                    { name: "Armure de Plates", type: "armor", category: "heavy", slot: "body", stats: { ac: 6, dex: -2 }, rarity: "uncommon", desc: "Imposante et protectrice.", equipped: true }
                ]
            },
            {
                label: "Le Vengeur Nomade",
                items: [
                    { name: "Masse Sacrée", type: "weapon", category: "simple", slot: "main", stats: { atk: 2, cha: 1 }, rarity: "common", desc: "Châtie l'injustice.", equipped: true, img: "/items/mace.png" },
                    { name: "Armure d'Écailles", type: "armor", category: "medium", slot: "body", stats: { ac: 4 }, rarity: "common", desc: "Pratique pour les longs voyages.", equipped: true },
                    { name: "Amulette de Bravoure", type: "accessory", slot: "neck", stats: { cha: 1 }, rarity: "common", desc: "Un souvenir de votre foyer.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Imposition des Mains", cost: 10, cooldown: 3, level: 1, heal: "10", scaling: "cha", type: "Sacré", actionType: "Action", flavor: "Votre foi est si pure qu'un seul toucher peut chasser les ombres et restaurer la vitalité d'un corps brisé.", desc: "Rend 5 PV par point de Charisme.", vfx: "heal_white" },
            { name: "Châtiment Divin", cost: 25, cooldown: 0, level: 1, dice: "2d8", scaling: "cha", type: "Châtiment", actionType: "Passif", flavor: "Le Crystal guide votre lame, l'enveloppant d'une fureur sacrée qui réduit le mal en cendres.", desc: "Invoquez le châtiment pour +2d8 dégâts radiants.", vfx: "smite_yellow" },
            { name: "Bouclier de Foi", cost: 15, cooldown: 4, level: 1, type: "Abjuration", actionType: "Action Bonus", flavor: "Une aura dorée vous enveloppe, tel un rempart invisible érigé par les mains de Solarius lui-même.", desc: "Augmente la CA d'un allié de 2.", vfx: "shield_glow_gold" }
        ],
        subclasses: {
            "vengeance": { label: "Serment de Vengeance", desc: "Juge impitoyable.", details: { style: "Traqueur", feature: "Vœu d'Inimitié : Désignez une cible comme ennemi juré pour avoir l'Avantage sur toutes vos attaques contre elle." } },
            "protection": { label: "Serment de Protection", desc: "Bouclier vivant.", details: { style: "Défenseur", feature: "Bastion : Tant que vous êtes conscient, les alliés à moins de 3m gagnent +2 à la CA." } },
            "anciens": { label: "Serment des Anciens", desc: "Gardien de la nature.", details: { style: "Contrôle", feature: "Vignes de Lumière : Invoque des vignes spectrales qui immobilisent une cible (Jet de Force pour briser)." } }
        },
        abilities: [],
        unlockables: [
            { name: "Sens Divin", cost: 5, cooldown: 0, level: 3, range: 6, desc: "Détecte les entités à 6 cases." },
            { name: "Aura de Protection", cost: 0, cooldown: 0, level: 4, range: 2, desc: "Les alliés à 2 cases gagnent votre bonus CHA aux JS (Passif)." },
            { name: "Compagnon Fidèle", cost: 30, cooldown: 20, level: 5, desc: "Invoque un destrier céleste." },
            { name: "Cercle de Vérité", cost: 25, cooldown: 5, level: 6, range: 3, desc: "Empêche les mensonges à 3 cases." },
            { name: "Bannissement", cost: 40, cooldown: 4, level: 7, range: 6, desc: "Bannit une créature à 6 cases." },
            { name: "Aura de Courage", cost: 0, cooldown: 0, level: 8, range: 2, desc: "Immunise les alliés à 2 cases à la peur (Passif)." },
            { name: "Croisé", cost: 50, cooldown: 10, level: 9, scaling: "cha", desc: "Gagne un bonus CA et dégâts pendant 1 minute." },
            { name: "Ange Vengeur", cost: 100, cooldown: 30, level: 10, desc: "ULTIME : Transformation divine temporaire." },
            { name: "Aura de Sainteté", cost: 0, cooldown: 0, level: 15, range: 10, desc: "Toutes les créatures hostiles dans un rayon de 10 cases subissent un désavantage sur leurs jets d'attaque contre vous (Passif)." },
            { name: "LÉGENDAIRE : Condamnation Éternelle", cost: 80, cooldown: 12, level: 20, dice: "8d8", scaling: "cha", desc: "Votre prochaine attaque réussie scelle la cible dans une prison de lumière, l'immobilisant totalement et lui infligeant des dégâts radiants chaque tour." },
            { name: "Sang des Sept Heros", cost: 0, cooldown: 0, level: 25, desc: "Vous récupérez 10% de vos PV max à chaque début de tour tant que vous combattez (Passif)." },
            { name: "ASCENSION : Avatar de Solarius", cost: 180, cooldown: 60, level: 30, desc: "Vous devenez littéralement le bras du dieu soleil. Vos attaques vaporisent les cibles de bas niveau, votre aura inflige 50 dégâts radiants par tour et vous soignez tous les alliés de 100 PV au lancement." }
        ],
        portrait: "/portraits/paladin.png"
    },
    "Rôdeur": {
        label: "Rôdeur",
        category: "SKILL",
        hitDie: 10,
        resourceStat: "wis",
        desc: "Maître des terres sauvages. Classe Hybride mêlant archerie experte et magie naturelle utilitaire.",
        mechanic: {
            name: "Instinct de Traqueur",
            desc: "La nature est votre alliée.\n\n• **Camouflage Naturel**: Vous avez Avantage aux jets de Discrétion en forêt ou milieux naturels.\n• **Tir de Réaction**: Si un ennemi se déplace à portée de votre arc, vous pouvez dépenser 10 Mana pour effectuer une attaque immédiate."
        },
        stats: { str: 12, dex: 16, con: 14, int: 10, wis: 14, cha: 8 },
        protection: { armor: ["light", "medium"], weapons: ["simple", "martial", "finesse"], shields: true },
        backstory_options: [
            { id: "chasseur", label: "Traqueur de Monstres", desc: "Les créatures de la nuit n'ont aucun secret pour vous. Vous vivez pour la chasse, et votre arc ne manque jamais sa cible.", stats: { dex: 2, cha: -2 } },
            { id: "guide", label: "Sentinelle des Confins", desc: "Vous connaissez les passages secrets à travers les Monts Cœur-de-Fer. Vous avez guidé bien des voyageurs vers la sécurité.", stats: { wis: 2, con: -2 } },
            { id: "exile", label: "Enfant de la Sylve", desc: "Banni de votre forêt natale pour un crime que vous n'avez pas commis, vous cherchez un nouveau territoire à protéger.", stats: { dex: 2, str: -2 } }
        ],
        starting_equipment_options: [
            {
                label: "L'Archer Sylvestre",
                items: [
                    { name: "Arc Long en If", type: "weapon", category: "martial", slot: "main", stats: { atk: 3 }, rarity: "common", desc: "Précis et letal.", equipped: true, img: "/items/bow.png" },
                    { name: "Carquois de 20 flèches", type: "ammo", slot: "back", stats: {}, rarity: "common", desc: "Flèches à pointe d'acier.", equipped: true },
                    { name: "Armure de Cuir Souple", type: "armor", category: "light", slot: "body", stats: { ac: 2 }, rarity: "common", desc: "Parfaite pour la discrétion.", equipped: true }
                ]
            },
            {
                label: "Le Traqueur de l'Ombre",
                items: [
                    { name: "Cimeterre", type: "weapon", category: "finesse", slot: "main", stats: { atk: 2 }, rarity: "common", desc: "Lame incurvée pour le corps à corps.", equipped: true, img: "/items/scimitar.png" },
                    { name: "Dague", type: "weapon", category: "finesse", slot: "off", stats: { atk: 1 }, rarity: "common", desc: "Rapide et discrète.", equipped: true, img: "/items/dagger.png" },
                    { name: "Cape de Camouflage", type: "armor", category: "light", slot: "body", stats: { ac: 1, dex: 1 }, rarity: "common", desc: "Se fond dans les sous-bois.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Marque du Chasseur", cost: 15, cooldown: 3, level: 1, dice: "1d6", scaling: "dex", range: 7, type: "Traque", actionType: "Action Bonus", flavor: "Votre regard se fixe sur le point faible de votre proie. Aucun mouvement ne peut vous échapper dorénavant.", desc: "Ajoute +1d6 dégâts à toutes vos attaques sur la cible.", vfx: "mark_green" },
            { name: "Tir Précis", cost: 10, cooldown: 0, level: 1, dice: "1d8", scaling: "dex", range: 10, type: "Précision", actionType: "Action", flavor: "Vous retenez votre souffle pendant que le monde s'efface, ne laissant que vous et le cœur de votre ennemi.", desc: "Ignore les bonus de couverture de la cible.", vfx: "arrow_yellow" },
            { name: "Sens de la Bête", cost: 5, cooldown: 4, level: 1, type: "Primal", actionType: "Action", flavor: "Vous laissez vos sens s'évader au-delà de l'humain, ressentant chaque vibration du sol et chaque frémissement du vent.", desc: "+3 à la Perception et à l'Initiative.", vfx: "animal_eye" }
        ],
        subclasses: {
            "betes": { label: "Maître des Bêtes", desc: "Compagnon animal.", details: { style: "Duo", feature: "Attaque Coordonnée : Vous gagnez un bonus aux dégâts si votre compagnon animal est adjacent à votre cible." } },
            "tireur": { label: "Tireur d'Élite", desc: "Sniper.", details: { style: "Distance", feature: "Tir Perforant : Vos attaques à distance ignorent les bonus de couverture partielle." } },
            "traqueur": { label: "Traqueur d'Ombre", desc: "Invisible dans le noir.", details: { style: "Embuscade", feature: "Premier Sang : Bonus à l'initiative et dégâts supplémentaires lors du premier tour de combat." } }
        },
        abilities: [],
        unlockables: [
            { name: "Soins Naturels", cost: 15, cooldown: 3, level: 3, heal: "1d8", scaling: "wis", range: 2, desc: "Soigne un allié à 2 cases d'1d8 + Sagesse." },
            { name: "Passif Terrain", cost: 0, cooldown: 0, level: 4, desc: "Ignore les terrains difficiles (Passif)." },
            { name: "Tir de Barrage", cost: 30, cooldown: 3, level: 5, dice: "2d8", scaling: "dex", range: 4, desc: "Tire sur toutes les cibles dans un cône de 4 cases." },
            { name: "Camouflage", cost: 20, cooldown: 4, level: 6, desc: "+10 Discrétion si immobile." },
            { name: "Piège à Ours", cost: 15, cooldown: 5, level: 7, dice: "4d6", range: 1, desc: "Place un piège sur une case adjacente." },
            { name: "Volée", cost: 40, cooldown: 5, level: 8, dice: "3d8", scaling: "dex", range: 9, desc: "Pluie de flèches (Zone : 2 cases, Portée : 9 cases)." },
            { name: "Sens Sauvage", cost: 10, cooldown: 0, level: 9, range: 4, desc: "Détecte les invisibles à 4 cases." },
            { name: "Maître de la Traque", cost: 80, cooldown: 20, level: 10, desc: "ULTIME : Vos attaques ne peuvent pas manquer cette cible." },
            { name: "Lien de la Forêt", cost: 0, cooldown: 0, level: 15, desc: "Vous pouvez communiquer avec les animaux et les plantes sur n'importe quel sujet lié à la région actuelle (Passif)." },
            { name: "LÉGENDAIRE : Flèche de l'Atlas", cost: 90, cooldown: 10, level: 20, dice: "12d10", scaling: "dex", range: 50, desc: "Un tir à très longue distance (50 cases) qui traverse la matière et les protections magiques." },
            { name: "Esclavage de la Bête", cost: 0, cooldown: 0, level: 25, desc: "Toute créature de type 'Beast' ne peut pas vous attaquer à moins que vous ne l'attaquiez en premier (Passif)." },
            { name: "ASCENSION : Esprit de la Sylve d'Émeraude", cost: 160, cooldown: 60, level: 30, desc: "Vous devenez corps et âme avec la nature. Pendant 5 tours, vous pouvez vous téléporter instantanément sur n'importe quelle case du terrain, vos flèches invoquent des lianes immobilisantes et vous regagnez 20 PV par tour." }
        ],
        portrait: "/portraits/rodeur.png"
    },
    "Barde": {
        label: "Barde",
        category: "SKILL",
        hitDie: 8,
        resourceStat: "cha",
        desc: "Artiste et diplomate. Classe Hybride très polyvalente. Magie sonore simple et compétences physiques agiles.",
        mechanic: {
            name: "Inspiration Bardique",
            desc: "Vos mots ont un poids réel.\n\n• **Écho Harmonique**: Lancer un sort restaure 5 Mana à l'allié le plus proche.\n• **Polyvalence**: Vous pouvez utiliser n'importe quel objet magique sans restriction de classe."
        },
        stats: { str: 8, dex: 14, con: 12, int: 12, wis: 10, cha: 18 },
        protection: { armor: ["light"], weapons: ["simple", "finesse", "arcane"], shields: false },
        backstory_options: [
            { id: "menestrel", label: "Chanteur de Légendes", desc: "Vous colportez les histoires de héros disparus. Chaque taverne est une scène pour vos récits épiques.", stats: { cha: 2, wis: -2 } },
            { id: "informateur", label: "Oreille de la Cour", desc: "La musique n'est qu'une couverture pour votre véritable métier : collecter des secrets et manipuler les puissants.", stats: { cha: 2, str: -2 } },
            { id: "pelerin", label: "Voyageur de l'Écho", desc: "Vous cherchez la 'Note Primordiale', le son qui aurait créé le monde. Votre quête vous mène vers les lieux les plus étranges.", stats: { wis: 2, con: -2 } }
        ],
        starting_equipment_options: [
            {
                label: "Le Troubadour Errant",
                items: [
                    { name: "Luth de Chêne", type: "weapon", category: "arcane", slot: "main", stats: { atk: 1, cha: 1 }, rarity: "common", desc: "Un instrument aux cordes d'argent.", equipped: true },
                    { name: "Rapière Élégante", type: "weapon", category: "finesse", slot: "main", stats: { atk: 2 }, rarity: "common", desc: "Pour les duels de mots et d'acier.", equipped: true, img: "/items/rapier.png" },
                    { name: "Vêtements de Voyageur", type: "armor", category: "light", slot: "body", stats: { ac: 1, cha: 1 }, rarity: "common", desc: "Colorés et confortables.", equipped: true }
                ]
            },
            {
                label: "L'Éminence Grise",
                items: [
                    { name: "Dague Dissimulée", type: "weapon", category: "finesse", slot: "main", stats: { atk: 1, dex: 1 }, rarity: "common", desc: "Personne ne la voit venir.", equipped: true, img: "/items/dagger.png" },
                    { name: "Flûte d'Os", type: "weapon", category: "arcane", slot: "off", stats: { cha: 2 }, rarity: "common", desc: "Un son envoûtant et inquiétant.", equipped: true },
                    { name: "Manteau de Velours", type: "armor", category: "light", slot: "body", stats: { ac: 1, cha: 2 }, rarity: "common", desc: "Luxueux et imposant.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Inspiration Bardique", cost: 10, cooldown: 2, level: 1, type: "Soutien", actionType: "Action Bonus", flavor: "Une mélodie épique qui ravive la flamme dans le cœur de vos compagnons et les pousse au-delà de leurs limites.", desc: "Donne un bonus de +1d6 au prochain jet d'un allié.", vfx: "note_gold" },
            { name: "Mot de Guérison", cost: 15, cooldown: 2, level: 1, dice: "1d4", scaling: "cha", range: 6, type: "Sonore", actionType: "Action Bonus", flavor: "Un chant doux et apaisant qui calme les douleurs les plus vives et redonne la force de se battre.", desc: "Soin rapide par le chant.", vfx: "heal_pink" },
            { name: "Moquerie Vicieuse", cost: 8, cooldown: 0, level: 1, dice: "1d4", scaling: "cha", range: 8, type: "Psychique", actionType: "Action", flavor: "Une insulte si cinglante qu'elle s'enracine dans l'esprit de l'adversaire, le faisant douter de ses propres forces.", desc: "La cible a un désavantage sur son prochain jet d'attaque.", vfx: "mock_purple" }
        ],
        subclasses: {
            "savoir": { label: "Collège du Savoir", desc: "Maître des secrets.", details: { style: "Magie", feature: "Mots Coupants : Utilisez votre réaction pour distraire une cible et réduire son jet d'attaque de 1d6." } },
            "valeur": { label: "Collège de la Valeur", desc: "Barde de guerre.", details: { style: "Combat", feature: "Inspiration Martiale : Votre inspiration bardique peut maintenant être ajoutée aux dégâts d'une attaque." } },
            "eclats": { label: "Collège des Éclats", desc: "Psychologie et charme.", details: { style: "Contrôle", feature: "Manteau de Majesté : Vous pouvez lancer le sort Injonction comme action bonus sans dépenser de mana." } }
        },
        abilities: [],
        unlockables: [
            { name: "Chant de Repos", cost: 0, cooldown: 0, level: 2, desc: "Augmente les soins pendant les repos courts (Passif)." },
            { name: "Expertise Bardique", cost: 0, cooldown: 0, level: 3, desc: "+4 à deux compétences de votre choix (Passif)." },
            { name: "Suggestion", cost: 25, cooldown: 5, level: 4, range: 6, desc: "Force une cible à effectuer une action simple." },
            { name: "Confusion de Masse", cost: 45, cooldown: 6, level: 5, range: 4, desc: "Plusieurs cibles attaquent au hasard." },
            { name: "Secret Arcanique", cost: 0, cooldown: 0, level: 6, desc: "Apprenez deux sorts de n'importe quelle autre classe (Passif)." },
            { name: "Charme de l'Irrésistible", cost: 30, cooldown: 4, level: 7, desc: "La cible ne peut pas vous attaquer." },
            { name: "Invisibilité de Groupe", cost: 60, cooldown: 8, level: 8, desc: "Rend tout le groupe invisible pendant 1 minute." },
            { name: "Mot de Pouvoir : Étourdissement", cost: 70, cooldown: 10, level: 9, range: 8, desc: "Étourdit instantanément une cible." },
            { name: "Mains de l'Artiste", cost: 40, cooldown: 5, level: 10, desc: "ULTIME : Vous pouvez lancer deux sorts non-concentrés en un seul tour." },
            { name: "Harmonie Absolue", cost: 0, cooldown: 0, level: 15, desc: "Votre bonus de CHA s'ajoute à tous vos jets de sauvegarde (Passif)." },
            { name: "LÉGENDAIRE : Chant de la Création", cost: 130, cooldown: 20, level: 20, desc: "Vous invoquez un objet ou une créature spectrale géante qui combat à vos côtés pendant 5 tours." },
            { name: "Aura d'Euphorie", cost: 0, cooldown: 0, level: 25, desc: "Les alliés à 10 cases ont l'Avantage sur tous leurs jets (Passif)." },
            { name: "ASCENSION : Voix de l'Univers", cost: 220, cooldown: 60, level: 30, desc: "Votre voix peut remodeler la réalité. Pendant 3 tours, chaque mot que vous prononcez devient un sort de niveau 9 gratuit." }
        ],
        portrait: "/portraits/barde.png"
    },
    "Druide": {
        label: "Druide",
        category: "MAGIC",
        hitDie: 8,
        resourceStat: "wis",
        desc: "Gardien de l'équilibre naturel. Utilise la magie sauvage pour soigner ou punir.",
        mechanic: {
            name: "Lien Naturel",
            desc: "Votre magie provient de la terre elle-même.\n\n• **Forme Sauvage**: Vous pouvez vous transformer en animal (Loup, Ours) une fois par combat.\n• **Cœur de la Planète**: Vos sorts de soin sont 25% plus efficaces en extérieur."
        },
        stats: { str: 10, dex: 12, con: 14, int: 10, wis: 18, cha: 12 },
        protection: { armor: ["light", "medium"], weapons: ["simple", "arcane"], shields: true },
        backstory_options: [
            { id: "ermite", label: "Gardien du Bosquet", desc: "Vous avez passé des vies entières loin de la civilisation, protégeant un lieu de pouvoir naturel contre la corruption.", stats: { wis: 2, str: -2 } },
            { id: "exile", label: "Esprit de la Meute", desc: "Élevé par les loups dans la Sylve d'Émeraude, vous comprenez le langage des bêtes mieux que celui des hommes.", stats: { con: 2, int: -2 } },
            { id: "cercle", label: "Initié du Cercle de Pierre", desc: "Membre d'une ancienne hiérarchie druidique, vous cherchez à maintenir l'équilibre entre la vie et la mort.", stats: { wis: 2, cha: -2 } }
        ],
        starting_equipment_options: [
            {
                label: "Le Défenseur du Bosquet",
                items: [
                    { name: "Bâton en If", type: "weapon", category: "arcane", slot: "main", stats: { atk: 1, wis: 1 }, rarity: "common", desc: "Bourgeonne de temps en temps.", equipped: true, img: "/items/staff.png" },
                    { name: "Bouclier en Bois", type: "shield", category: "shield", slot: "off", stats: { ac: 2 }, rarity: "common", desc: "Renforcé par des lianes.", equipped: true },
                    { name: "Armure de Cuir Brut", type: "armor", category: "medium", slot: "body", stats: { ac: 2 }, rarity: "common", desc: "Peaux non traitées.", equipped: true }
                ]
            },
            {
                label: "Le Primal Sauvage",
                items: [
                    { name: "Serpe de Silex", type: "weapon", category: "simple", slot: "main", stats: { atk: 2 }, rarity: "common", desc: "Tranche comme le vent du nord.", equipped: true },
                    { name: "Bourse de Graines", type: "tool", slot: "item", stats: { wis: 1 }, rarity: "common", desc: "Utile pour la magie de croissance.", equipped: false },
                    { name: "Peau de Loup", type: "armor", category: "light", slot: "body", stats: { ac: 1, dex: 1 }, rarity: "common", desc: "Imprégnée de l'esprit de la meute.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Prodige", cost: 5, cooldown: 0, level: 1, dice: "1d10", scaling: "wis", range: 2, type: "Sauvage", actionType: "Action", flavor: "Vous invoquez la sève même des anciens arbres pour durcir vos bras comme du bois de fer.", desc: "Une attaque magique au corps à corps.", vfx: "leaf_green" },
            { name: "Baies Nourricières", cost: 15, cooldown: 0, level: 1, type: "Nature", actionType: "Action", flavor: "Le sol s'ouvre pour offrir des baies imprégnées de la vitalité de la forêt, capables de régénérer les corps fatigués.", desc: "Crée des baies de survie.", vfx: "berry_red" },
            { name: "Forme Sauvage (Loup)", cost: 30, cooldown: 5, level: 1, type: "Mutation", actionType: "Action", flavor: "Vos os se brisent et se reforment, votre peau se couvre de poils... vous ne faites plus qu'un avec le prédateur.", desc: "Transformez-vous en loup pour le combat.", vfx: "morph_blue" }
        ],
        subclasses: {
            "terre": { label: "Cercle de la Terre", desc: "Lien profond avec le sol.", details: { style: "Sorts", feature: "Récupération Naturelle : Régénérez du Mana lors d'un court repos." } },
            "lune": { label: "Cercle de la Lune", desc: "Maître des métamorphoses.", details: { style: "Combat", feature: "Transformation de Combat : Transformez-vous en action bonus." } },
            "spores": { label: "Cercle des Spores", desc: "Cycle de la décomposition.", details: { style: "Dégâts", feature: "Halo de Spores : Les ennemis qui s'approchent subissent des dégâts de poison automatiques chaque tour." } }
        },
        abilities: [],
        unlockables: [
            { name: "Croissance d'Épines", cost: 25, cooldown: 4, level: 2, range: 6, desc: "Zone de terrain difficile et dégâts." },
            { name: "Peau d'Écorce", cost: 15, cooldown: 5, level: 3, desc: "Fixe la CA à 16 pendant 1 minute." },
            { name: "Vague de Soin", cost: 30, cooldown: 4, level: 4, dice: "2d8", scaling: "wis", range: 4, desc: "Soigne en zone (Rayon : 2 cases)." },
            { name: "Appel de la Foudre", cost: 40, cooldown: 2, level: 5, dice: "3d10", scaling: "wis", range: 12, desc: "Frappe de foudre répétable pendant 10 tours." },
            { name: "Invoquer des Animaux", cost: 50, cooldown: 10, level: 6, desc: "Appelle des esprits fées en forme d'animaux." },
            { name: "Éclair de Vie", cost: 35, cooldown: 3, level: 7, dice: "5d6", range: 6, desc: "Dégâts de foudre et soin de moitié." },
            { name: "Guerison par la Terre", cost: 45, cooldown: 5, level: 8, desc: "Soigne et retire tous les poisons." },
            { name: "Mur de Pierre", cost: 50, cooldown: 8, level: 9, range: 10, desc: "Crée une barrière physique infranchissable." },
            { name: "Avatar de la Nature", cost: 100, cooldown: 40, level: 10, desc: "ULTIME : Vous devenez un tréant massif pendant 3 tours." },
            { name: "Sang de Gaïa", cost: 0, cooldown: 0, level: 15, desc: "Régénère 5 PV par tour en extérieur (Passif)." },
            { name: "LÉGENDAIRE : Tempête de la Création", cost: 150, cooldown: 30, level: 20, dice: "20d10", scaling: "wis", range: 20, desc: "Une tempête déchaînée qui soigne les alliés et foudroie les ennemis pendant 3 tours." },
            { name: "Esprit de la Forêt", cost: 0, cooldown: 0, level: 25, desc: "Toute la flore du terrain combat pour vous (Passif)." },
            { name: "ASCENSION : Gaïa Incarnée", cost: 250, cooldown: 90, level: 30, desc: "Tant que vous êtes sur le terrain, celui-ci obéit à votre volonté. Vous pouvez faire surgir des montagnes, assécher des lacs ou créer des forêts en un instant. Tous les ennemis subissent un désavantage permanent." }
        ],
        portrait: "/portraits/druide.png"
    }
};
