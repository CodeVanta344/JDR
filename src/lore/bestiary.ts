/**
 * Bestiary Module
 * Extracted creature data for Aethelgard
 */

// Type definitions
export type BehaviorType = "MELEE" | "RANGED";

export interface CreatureStats {
    hp: number;
    ac: number;
    atk: number;
}

export interface CreatureAction {
    name: string;
    desc: string;
    range: number;
}

export interface Creature {
    name: string;
    type: string;
    cr: string;
    stats: CreatureStats;
    desc: string;
    lore: string;
    behavior: string;
    behavior_type: BehaviorType;
    actions: CreatureAction[];
}

export interface Ability {
    name: string;
    desc: string;
}

export interface LegendaryBoss {
    name: string;
    level: number;
    type: string;
    stats: CreatureStats;
    desc: string;
    lore: string;
    abilities: Ability[];
}

export type Bestiary = Record<string, Creature>;
export type LegendaryBosses = Record<string, LegendaryBoss>;

// Base Bestiary - Core creatures
export const BESTIARY: Bestiary = {
    "Gobelin": {
        name: "Gobelin Pilleur",
        type: "Humanoid (Goblinoid)",
        cr: "1/4",
        stats: { hp: 7, ac: 15, atk: 4 },
        desc: "Une petite créature vicieuse à la peau verte et aux dents pointues.",
        lore: `Les Gobelins d'Aethelgard ne sont pas des créatures naturelles de la faune locale. Selon les écrits de Kaelen, ils sont les descendants dégénérés des esclaves-travailleurs de l'Empire Ashka, abandonnés et laissés muter par les résidus de magie corrompue après la chute de l'Empire. Cette origine explique leur obsession maladive pour les métaux brillants et les mécanismes complexes, qu'ils tentent maladroitement de reproduire.

Ils vivent en tribus matriarcales dans les réseaux de cavernes des Monts Cœur-de-Fer ou dans les ruines des Terres Brûlées. Un gobelin seul est lâche et servile, mais en groupe, ils développent une intelligence collective surprenante, capable de monter des embuscades complexes. Ils utilisent des cris stridents pour communiquer sur de longues distances, un langage que les aventuriers comparent souvent au bruit d'un métal que l'on raye. Leur espérance de vie est courte, mais leur taux de reproduction est si élevé que certaines régions du Val Doré doivent organiser des battues saisonnières pour protéger les récoltes.`,
        behavior: "Attaque en groupe, utilise des tactiques de guérilla (cache-cache). Fuit si le chef meurt.",
        behavior_type: "RANGED",
        actions: [
            { name: "Cimeterre", desc: "Melee: +4 to hit, 1d6+2 dégâts tranchants.", range: 1.5 },
            { name: "Arc court", desc: "Ranged: +4 to hit, 1d6+2 dégâts perçants.", range: 12 }
        ]
    },
    "Loup": {
        name: "Loup des Forêts",
        type: "Beast",
        cr: "1/4",
        stats: { hp: 11, ac: 13, atk: 4 },
        desc: "Un prédateur gris aux yeux jaunes perçants.",
        lore: `Le Loup des Forêts d'Aethelgard, particulièrement ceux de la Sylve d'Émeraude, est une créature dotée d'une sensibilité magique. On raconte que leurs ancêtres étaient les compagnons des premiers druides du Conseil des Chênes. Contrairement aux loups ordinaires, ils ne chassent que ce dont ils ont besoin pour survivre et semblent protéger instinctivement les lieux de pouvoir druidiques.

Leur pelage possède une propriété unique de réfraction de la lumière, ce qui les rend presque invisibles dans les sous-bois denses (d'où leur bonus de discrétion). Les habitants de Sylmanir considèrent la rencontre d'un loup solitaire comme un présage : un loup qui vous regarde dans les yeux sans grogner est un signe que vous êtes sur le bon chemin, tandis qu'une meute qui hurle à midi annonce une incursion de l'Ombre. Ils sont capables de pister une odeur à travers les plans si celle-ci est imprégnée de magie.`,
        behavior: "Chasse en meute. Tente de renverser ses proies pour les dévorer.",
        behavior_type: "MELEE",
        actions: [
            { name: "Morsure", desc: "Melee: +4 to hit, 2d4+2 dégâts. CD 11 Force ou mis à terre.", range: 1.5 }
        ]
    },
    "Orc": {
        name: "Orc Brute",
        type: "Humanoid",
        cr: "1/2",
        stats: { hp: 15, ac: 13, atk: 5 },
        desc: "Un guerrier massif à la peau grisâtre, avide de combat.",
        lore: "Les orcs d'Aethelgard sont des guerriers fiers qui vivent dans les steppes désolées du Sud. Ils respectent la force avant tout.",
        behavior: "Fonce dans le tas. Ne recule jamais.",
        behavior_type: "MELEE",
        actions: [
            { name: "Hache de guerre", desc: "Melee: +5 to hit, 1d12+3 dégâts tranchants.", range: 1.5 }
        ]
    },
    "Squelette": {
        name: "Squelette d'Orc",
        type: "Undead",
        cr: "1/4",
        stats: { hp: 13, ac: 13, atk: 4 },
        desc: "Des os animés par une magie impie, portant des restes d'armure.",
        lore: `Ces "Orcs" ne sont pas la race vivante des temps anciens, mais des Squelettes d'Orcs de l'ancienne Garde de Sang du Sud, réanimés par les vents nécrotiques qui soufflent depuis la Faille de l'Ombre.`,
        behavior: "Sans peur, sans pitié. Obéit aux ordres simples. Vulnérable aux dégâts contondants.",
        behavior_type: "MELEE",
        actions: [
            { name: "Épée courte", desc: "Melee: +4 to hit, 1d6+2 dégâts perçants.", range: 1.5 }
        ]
    },
    "Ogre": {
        name: "Ogre",
        type: "Giant",
        cr: "2",
        stats: { hp: 59, ac: 11, atk: 6 },
        desc: "Un géant de 3 mètres, stupide mais incroyablement fort.",
        lore: `L'Ogre est une anomalie biologique, souvent appelé "le fils raté des géants". On dit que lorsque les Géants des Tempêtes se sont retirés dans les cimes lors de l'Ère des Cendres, ceux qui sont restés dans les plaines ont dégénéré, perdant leur noblesse et leur magie pour ne garder que leur faim et leur taille. Ils vivent de manière solitaire ou en petits groupes familiaux, occupant souvent des grottes stratégiques ou des ruines de ponts impériaux.

Leur cuir est incroyablement épais, capable d'arrêter des flèches ordinaires, ce qui compense leur absence totale de tactique. Un ogre affamé est une force de la nature ; il ne s'arrêtera devant aucun obstacle pour atteindre sa proie. Ils ont une prédilection pour la viande de cheval et les tonneaux de vin, qu'ils engloutissent d'un trait. Bien que stupides, ils possèdent une ruse animale pour piéger les voyageurs dans les cols étroits en provoquant des éboulements.`,
        behavior: "Fonce et frappe. Peut lancer des débris. Facile à tromper mais mortel au corps à corps.",
        behavior_type: "MELEE",
        actions: [
            { name: "Massue Géante", desc: "Melee: +6 to hit, 2d8+4 dégâts contondants.", range: 1.5 },
            { name: "Lancer de Rocher", desc: "Ranged: +6 to hit, 2d6+4 dégâts contondants.", range: 8 }
        ]
    },
    "Spectre": {
        name: "Spectre Hurlant",
        type: "Undead",
        cr: "3",
        stats: { hp: 45, ac: 12, atk: 5 },
        desc: "Une forme fantomatique et terrifiante qui draine la vie.",
        lore: `Les spectres sont les résidus psychiques des victimes de la "Trahison des Sept", un événement sombre de la fin de l'Ère des Cendres où un régiment entier fut sacrifié par un commandant lâche. Ils ne sont pas composés de matière, mais d'une pure volonté négative qui cherche à refroidir tout ce qui brûle de vie. Leur passage laisse une traînée de givre noir sur le sol et fait flétrir les plantes en quelques secondes.

Leurs cris ne sont pas de simples bruits, mais des attaques soniques qui résonnent directement dans l'âme de ceux qui les entendent, leur montrant leurs pires échecs. Ils sont particulièrement attirés par les émotions fortes : la peur, la colère ou le désespoir agissent comme un phare pour eux. On ne peut pas "tuer" un spectre au sens noble du terme ; on ne peut que disperser son énergie momentanément jusqu'à ce que sa douleur le reforme à nouveau dans les ténèbres.`,
        behavior: "Traverse les murs, attaque les vivants isolés. Craint la lumière du soleil.",
        behavior_type: "MELEE",
        actions: [
            { name: "Drain de Vie", desc: "Melee: +5 to hit, 3d6 nécrotique. La cible doit réussir un JS Con CD 10 ou perdre ces PV max.", range: 1.5 }
        ]
    },
    "Dragon": {
        name: "Jeune Dragon Rouge",
        type: "Dragon",
        cr: "10 (BOSS)",
        stats: { hp: 178, ac: 18, atk: 10 },
        desc: "Une bête majestueuse et terrifiante aux écailles écarlates.",
        lore: `Le Jeune Dragon Rouge, bien qu'il ne soit qu'un "adolescent" selon les standards draconiens, possède déjà une envergure de quinze mètres et un souffle capable de faire fondre le fer le plus pur. Ils sont les descendants directs d'Ignis l'Ancien, le grand dévastateur de l'Empire Ashka. Pour un dragon rouge, le monde n'est qu'une collection d'objets à posséder ou à consumer. 

Leur antre est toujours situé dans un lieu de chaleur intense, comme une veine volcanique ou le cœur d'une forge naine abandonnée. Ils détestent par-dessus tout les mages, car ils voient dans la magie mortelle une pâle et insultante copie de leur propre puissance innée. Un dragon rouge marquera souvent son territoire en brûlant des forêts entières selon un motif géométrique visible depuis le ciel. S'engager contre un tel adversaire demande non seulement du courage, mais aussi une préparation minutieuse, car ils sont aussi intelligents qu'ils sont brutaux.`,
        behavior: "Arrogant. Utilise son souffle dès que possible. Vole hors de portée si menacé.",
        behavior_type: "MELEE",
        actions: [
            { name: "Multiattaque", desc: "Fait trois attaques : une morsure et deux griffes.", range: 2 },
            { name: "Morsure", desc: "Melee: +10 to hit, 2d10+6 perçant + 1d6 feu.", range: 2 },
            { name: "Souffle de Feu (Recharge 5-6)", desc: "Cône de 3 cases. 10d8 dégâts de feu (JS Dex CD 17 demi).", range: 6 }
        ]
    }
};

// Extended Bestiary - Additional creatures
export const BESTIARY_EXTENDED: Bestiary = {
    "Bandit": {
        name: "Bandit de Grand Chemin",
        type: "Humanoid",
        cr: "1/2",
        stats: { hp: 11, ac: 12, atk: 3 },
        desc: "Un homme désespéré armé d'une lame rouillée et d'un sourire sans joie.",
        lore: "Les routes d'Aethelgard sont infestées de bandits depuis l'Ère de la Reconstruction. Ce sont souvent d'anciens soldats démobilisés, des paysans ruinés ou des réfugiés des Terres Brûlées. Ils opèrent en groupes de 4 à 8, avec un chef qui prend la moitié du butin.",
        behavior: "Menace d'abord, attaque si résistance. Fuit si le chef tombe ou si le groupe semble trop fort.",
        behavior_type: "MELEE",
        actions: [
            { name: "Épée courte", desc: "Melee: +3 to hit, 1d6+1 dégâts tranchants.", range: 1.5 },
            { name: "Arc court", desc: "Ranged: +3 to hit, 1d6+1 dégâts perçants.", range: 10 }
        ]
    },
    "Araignée Géante": {
        name: "Araignée Tisseuse d'Ombre",
        type: "Beast (Monstrosity)",
        cr: "1",
        stats: { hp: 26, ac: 14, atk: 5 },
        desc: "Une araignée de la taille d'un cheval, ses yeux multiples brillant d'une lueur violette.",
        lore: "Les Araignées Tisseuses d'Ombre de la Sylve d'Émeraude sont le résultat d'une mutation magique. Leur toile absorbe la lumière, créant des zones de ténèbres impénétrables. Les Elfes les tolèrent car elles dévorent les parasites de la forêt, mais elles sont mortellement dangereuses pour les non-initiés.",
        behavior: "Tend des embuscades avec sa toile. Empoisonne puis enveloppe. Fuit la lumière vive.",
        behavior_type: "MELEE",
        actions: [
            { name: "Morsure", desc: "Melee: +5 to hit, 1d8+3 perçant + 2d6 poison (JS Con CD 11).", range: 1.5 },
            { name: "Toile (Recharge 5-6)", desc: "Ranged: +5, portée 6 cases. La cible est entravée (JS Force CD 12 pour se libérer).", range: 6 }
        ]
    },
    "Troll": {
        name: "Troll des Marais",
        type: "Giant",
        cr: "5",
        stats: { hp: 84, ac: 15, atk: 7 },
        desc: "Un monstre dégingandé couvert de mousse, dont la chair se referme à vue d'œil.",
        lore: "Les Trolls sont les cauchemars vivants des voyageurs. Leur capacité de régénération est si puissante qu'on a vu un troll recoudre sa propre tête après décapitation. Seuls le feu ou l'acide empêchent leur régénération. Ils nichent dans les marécages, les égouts et les caves abandonnées, se nourrissant de tout ce qui bouge.",
        behavior: "Attaque avec rage aveugle. Régénère 10 PV/tour sauf si touché par le feu ou l'acide. Ne fuit jamais.",
        behavior_type: "MELEE",
        actions: [
            { name: "Multiattaque", desc: "Fait trois attaques : une morsure et deux griffes.", range: 1.5 },
            { name: "Morsure", desc: "Melee: +7 to hit, 1d6+4 perçant.", range: 1.5 },
            { name: "Griffes", desc: "Melee: +7 to hit, 2d6+4 tranchant.", range: 1.5 }
        ]
    },
    "Mimic": {
        name: "Mimic (Coffre Vivant)",
        type: "Monstrosity (Shapechanger)",
        cr: "2",
        stats: { hp: 58, ac: 12, atk: 5 },
        desc: "Un coffre au trésor aux dents acérées et à la langue gluante.",
        lore: "Créatures arcaniques créées par les mages Ashkan comme pièges de sécurité pour leurs trésors. Après la chute de l'Empire, les mimics se sont échappés et reproduits. Ils prennent la forme d'objets ordinaires — coffres, portes, chaises — et attaquent quiconque les touche. Leur colle digestive est si puissante qu'elle peut dissoudre le métal en quelques heures.",
        behavior: "Immobile jusqu'à ce qu'on le touche. Colle sa cible puis la dévore lentement.",
        behavior_type: "MELEE",
        actions: [
            { name: "Pseudopode", desc: "Melee: +5 to hit, 1d8+3 contondant. La cible est collée (JS For CD 13).", range: 1.5 },
            { name: "Morsure", desc: "Melee: +5 to hit, 1d8+3 perçant + 1d8 acide.", range: 1.5 }
        ]
    },
    "Golem de Pierre": {
        name: "Golem Gardien Ashkan",
        type: "Construct",
        cr: "4",
        stats: { hp: 85, ac: 17, atk: 7 },
        desc: "Une statue massive qui s'anime avec des yeux de braise. Des runes pulsent sur sa poitrine.",
        lore: "Vestiges de l'Hégémonie d'Ashka, ces golems gardent encore les ruines de leurs anciens maîtres. Leur conscience est liée à une rune-cœur dans leur poitrine ; détruire cette rune les désactive immédiatement. Ils ne font pas de distinction entre ami et ennemi — ils protègent leur zone.",
        behavior: "Patrouille son secteur. Attaque tout intrus. Immunisé au poison et aux conditions mentales.",
        behavior_type: "MELEE",
        actions: [
            { name: "Poing de Pierre", desc: "Melee: +7 to hit, 2d10+4 contondant.", range: 1.5 },
            { name: "Piétinement", desc: "Quand un ennemi tombe à terre, le golem écrase automatiquement pour 3d6 dégâts.", range: 1.5 }
        ]
    },
    "Wyvern": {
        name: "Wyvern des Pics",
        type: "Dragon",
        cr: "6",
        stats: { hp: 110, ac: 13, atk: 7 },
        desc: "Un cousin sauvage et stupide des dragons, avec un dard empoisonné mortel.",
        lore: "Les wyverns nichent dans les pics des Monts Cœur-de-Fer et la Côte des Orages. Contrairement aux dragons, elles sont dénuées d'intelligence et chassent par instinct pur. Leur venin est si recherché par les alchimistes que la Guilde des Arcanes offre 100 pièces d'or pour un flacon intact.",
        behavior: "Plonge depuis le ciel. Utilise son dard empoisonné. Emporte les proies petites dans les airs.",
        behavior_type: "MELEE",
        actions: [
            { name: "Multiattaque", desc: "Fait deux attaques : une morsure et un dard.", range: 2 },
            { name: "Morsure", desc: "Melee: +7 to hit, 2d6+4 perçant.", range: 2 },
            { name: "Dard", desc: "Melee: +7 to hit, 1d6+4 perçant + 7d6 poison (JS Con CD 15 demi).", range: 2 }
        ]
    },
    "Liche": {
        name: "Liche Mineure d'Ashka",
        type: "Undead (Spellcaster)",
        cr: "8",
        stats: { hp: 135, ac: 17, atk: 8 },
        desc: "Un cadavre desséché en robes anciennes, dont les orbites brûlent d'un feu vert.",
        lore: "Ce sont des mages Ashkan qui ont sacrifié leur humanité pour survivre à la chute de l'Empire. Inférieures aux véritables liches, elles restent des menaces mortelles, capables de lancer des sorts dévastateurs et de lever des armées de morts-vivants. Leur phylactère est souvent un objet insignifiant — une bague, un dé, une clé.",
        behavior: "Lance des sorts à distance. Si menacée, lève des squelettes. Ne fuit que si son phylactère est en danger.",
        behavior_type: "RANGED",
        actions: [
            { name: "Rayon Nécrotique", desc: "Ranged: +8 to hit, 4d8 nécrotique (Portée: 12).", range: 12 },
            { name: "Paralysie", desc: "La cible doit réussir JS Sagesse CD 16 ou être paralysée pendant 1 tour.", range: 6 },
            { name: "Lever les Morts", desc: "Invoque 1d4 squelettes. Utilisable 2 fois par combat.", range: 4 }
        ]
    },
    "Élémental de Feu": {
        name: "Élémental de Feu Mineur",
        type: "Elemental",
        cr: "5",
        stats: { hp: 102, ac: 13, atk: 6 },
        desc: "Une colonne de flammes vivantes en forme vaguement humanoïde.",
        lore: "Les élémentaux de feu sont attirés par les zones de forte concentration magique, particulièrement dans les Terres Brûlées. Ils ne sont pas malveillants par nature, mais leur simple présence enflamme tout ce qui les entoure. Certains mages parviennent à les lier temporairement comme gardiens.",
        behavior: "Se déplace vers les sources de chaleur. Enflamme tout sur son passage. Vulnérable à l'eau.",
        behavior_type: "MELEE",
        actions: [
            { name: "Toucher Brûlant", desc: "Melee: +6 to hit, 2d6+3 feu. Enflamme les objets non portés.", range: 1.5 },
            { name: "Vague de Chaleur", desc: "Tous dans un rayon de 2 cases : 3d6 feu (JS Dex CD 14 demi).", range: 2 }
        ]
    },
    "Vampire Mineur": {
        name: "Rejeton Vampirique",
        type: "Undead",
        cr: "5",
        stats: { hp: 82, ac: 15, atk: 6 },
        desc: "Un prédateur nocturne aux yeux rouges. Élégant et mortellement séduisant.",
        lore: "Les rejetons vampiriques sont les serviteurs créés par les vrais Vampires Seigneurs. Contraints à obéir à leur créateur, ils opèrent souvent comme espions ou assassins dans les villes. Ils conservent leur apparence de vie et peuvent se mêler à la population. Seuls le soleil, l'eau bénite et les pieux de bois blanc de Sylmanir les détruisent définitivement.",
        behavior: "Charme sa cible avant d'attaquer. Fuit le soleil et les symboles sacrés.",
        behavior_type: "MELEE",
        actions: [
            { name: "Griffes", desc: "Melee: +6 to hit, 2d4+3 tranchant.", range: 1.5 },
            { name: "Morsure (1/tour)", desc: "Melee: +6 to hit, 1d6+3 perçant + 3d6 nécrotique. Soigne le vampire de la moitié des dégâts nécrotiques infligés.", range: 1.5 },
            { name: "Charme (1/jour)", desc: "JS Sagesse CD 14 ou la cible est charmée pour 24h.", range: 4 }
        ]
    },
    "Béhémoth de Pierre": {
        name: "Béhémoth Terrestre",
        type: "Monstrosity (Titan)",
        cr: "12",
        stats: { hp: 250, ac: 18, atk: 10 },
        desc: "Une montagne vivante. Ses pas font trembler la terre à des kilomètres.",
        lore: "On ne sait pas si les Béhémoths sont des créatures naturelles ou des reliques de la création de Solarius. Ce qui est certain, c'est qu'ils sont pratiquement invulnérables et que leur simple passage remodèle le paysage. Ils n'attaquent que s'ils sont provoqués ou si quelqu'un piétine leur territoire — le problème étant que leur territoire est immense et invisible.",
        behavior: "Lent mais dévastateur. Écrase tout sur son passage. Vulnérable à la magie élémentaire.",
        behavior_type: "MELEE",
        actions: [
            { name: "Écrasement", desc: "Melee: +10 to hit, 4d12+6 contondant. La cible est aplatie (à terre).", range: 3 },
            { name: "Tremblement de Terre", desc: "Tous dans un rayon de 6 cases : JS Dex CD 18 ou mis à terre + 4d8 contondant.", range: 6 },
            { name: "Rugissement Tectonique", desc: "Cône de 10 cases. JS Con CD 17 ou étourdi pendant 1 tour.", range: 10 }
        ]
    },
    "Marcheur Blanc": {
        name: "Le Marcheur Blanc",
        type: "Undead (Legendary)",
        cr: "15 (BOSS)",
        stats: { hp: 300, ac: 20, atk: 12 },
        desc: "Une entité de glace et de mort. L'air gèle sur son passage. Son regard vide semble contenir l'éternité.",
        lore: "Le Marcheur Blanc est la légende la plus terrifiante de la Côte des Orages. C'est l'esprit vengeur d'un ancien Jarl trahi par ses propres fils lors de l'Ère des Cendres. Condamné à errer entre la vie et la mort, il cherche à envelopper le monde entier dans un hiver éternel. Ses armées de givre grandissent à chaque village qu'il traverse.",
        behavior: "Marche lentement mais inexorablement. Gèle tout dans un rayon de 10 cases. Les morts se relèvent sous son contrôle.",
        behavior_type: "MELEE",
        actions: [
            { name: "Lame de Givre", desc: "Melee: +12 to hit, 3d10+6 froid + 2d8 nécrotique.", range: 2 },
            { name: "Souffle de l'Hiver Éternel", desc: "Cône 8 cases. 8d8 froid (JS Con CD 18 demi). Les créatures tuées se relèvent comme zombies de glace.", range: 8 },
            { name: "Aura de Mort", desc: "Passif : Toutes les créatures commençant leur tour à 3 cases subissent 2d6 froid.", range: 3 },
            { name: "Lever les Morts de Glace (Recharge 5-6)", desc: "Invoque 2d4 squelettes de glace (AC 14, HP 20, attaque de givre 1d8+3).", range: 6 }
        ]
    }
};
