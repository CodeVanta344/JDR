/**
 * Quest Hooks and Rumors by Region
 */

// Types
export interface QuestHook {
    title: string;
    level: string;
    type: string;
    desc: string;
}

export interface Rumor {
    rumor: string;
    truth: boolean | string;
    danger?: string;
}

export type Region = 'val_dore' | 'cote_des_orages' | 'monts_coeur_de_fer' | 'sylve_emeraude' | 'terres_brulees';

export type QuestHooks = Record<Region, QuestHook[]>;
export type RumorsAndGossip = Record<Region, Rumor[]>;

// Quest Hooks by Region
export const QUEST_HOOKS: QuestHooks = {
    val_dore: [
        { title: "Le Vin Empoisonné", level: "1-3", type: "Enquête", desc: "Plusieurs nobles sont tombés malades après un banquet. Le vin provenait d'un vignoble réputé. Accident, incompétence, ou tentative d'assassinat ?" },
        { title: "Les Rats de la Crypte", level: "1-3", type: "Exploration", desc: "Les rats géants qui infestent la crypte sous la cathédrale sont inhabituellement organisés. Quelque chose les dirige." },
        { title: "Le Tournoi du Roi", level: "3-5", type: "Compétition", desc: "Le tournoi annuel de Sol-Aureus offre gloire et un prix de 500 Or. Mais un des concurrents triche — avec de la magie interdite." },
        { title: "L'Héritier Disparu", level: "4-7", type: "Escorte", desc: "Le fils cadet de la Reine Elara a disparu. Retrouvez-le avant que les rumeurs ne provoquent une crise politique." },
        { title: "Les Yeux dans les Murs", level: "5-8", type: "Horreur", desc: "Des habitants de la vieille ville rapportent que les portraits de famille bougent la nuit. Puis les gens commencent à disparaître." },
        { title: "Le Procès du Siècle", level: "6-9", type: "Intrigue", desc: "Un célèbre mage est accusé de meurtre. Il clame être innocent et offre sa fortune à quiconque le prouvera. Les preuves sont accablantes — presque trop." },
        { title: "La Conspiration de Cristal", level: "8-12", type: "Politique", desc: "Des agents du Cercle des Cendres ont infiltré le conseil royal. Démêlez les loyautés sans provoquer une guerre civile." }
    ],
    cote_des_orages: [
        { title: "Le Festin du Jarl", level: "1-3", type: "Social", desc: "Le Jarl de Kuldahar invite des étrangers à son festin. C'est un test : il évalue les futurs mercenaires pour une mission secrète." },
        { title: "La Bête du Fjord", level: "2-5", type: "Chasse", desc: "Un monstre marin dévore les bateaux de pêche. Les pêcheurs ne sortent plus. Le village va mourir de faim." },
        { title: "Le Passage de Glace", level: "4-6", type: "Exploration", desc: "Un col gelé, réputé impraticable, s'est mystérieusement ouvert. Qu'est-ce qui a fait fondre la glace ?" },
        { title: "Le Dernier Géant", level: "6-9", type: "Diplomatie", desc: "Un Géant des Tempêtes blessé s'est effondré près d'un village. Il parle d'une guerre entre géants dans les cimes." },
        { title: "Le Marcheur Blanc", level: "8-12", type: "Boss", desc: "La légende du Marcheur Blanc est réelle. Une entité de glace décime les voyageurs. Trouvez sa source et détruisez-la." },
        { title: "Le Dragon de Cristal", level: "15-20", type: "Épique", desc: "Le dragon sous Kuldahar a ouvert un œil. Les tremblements s'intensifient. Le Jarl supplie l'aide des héros." }
    ],
    monts_coeur_de_fer: [
        { title: "Le Niveau Perdu", level: "3-5", type: "Exploration", desc: "Le niveau 16 de Hammerdeep n'existe pas officiellement. Mais des bruits viennent d'en dessous." },
        { title: "La Grève des Guildes", level: "2-4", type: "Social", desc: "Les mineurs refusent de travailler. Ils ont trouvé quelque chose dans la veine principale et exigent une prime de risque." },
        { title: "Le Golem Libre", level: "5-8", type: "Chasse", desc: "Un golem de pierre s'est libéré de son maître et erre dans les tunnels. Capturez-le — ou détruisez-le." },
        { title: "L'Héritage de Rundar", level: "7-10", type: "Donjon", desc: "Le testament du roi nain Rundar indique un trésor caché dans un complexe piégé au niveau 13." },
        { title: "Les Ingénieurs Fous", level: "8-12", type: "Investigation", desc: "Des explosions retentissent dans les fonderies. Sabotage ? Ou est-ce que les nains ont découvert une technologie Ashkan dangereuse ?" }
    ],
    sylve_emeraude: [
        { title: "Les Arbres qui Saignent", level: "1-3", type: "Mystère", desc: "Une partie de la forêt meurt sans explication. La sève tourne noire et les animaux fuient." },
        { title: "Le Rite de Passage", level: "2-5", type: "Rituel", desc: "Pour gagner la confiance des Elfes, vous devez participer à un rite ancien impliquant la Source d'Émeraude." },
        { title: "L'Envahisseur Invisible", level: "4-7", type: "Traque", desc: "Quelqu'un vole les artefacts sacrés des Dryades. Aucune trace, aucun témoin. Le Mur de Ronces a été percé." },
        { title: "Le Chant Interdit", level: "6-9", type: "Horreur", desc: "Un chant mélodieux résonne la nuit dans la forêt. Ceux qui l'écoutent ne reviennent jamais." },
        { title: "Le Jugement du Conseil", level: "8-12", type: "Procès", desc: "Un humain est accusé d'avoir brûlé un bosquet sacré. Les Elfes veulent l'exécuter. L'homme jure qu'il a été possédé." }
    ],
    terres_brulees: [
        { title: "Les Pilleurs de Tombes", level: "1-3", type: "Exploration", desc: "Un groupe de pilleurs embauche des gardes du corps pour explorer une ruine Ashkan. Le contrat est simple, mais la ruine ne l'est pas." },
        { title: "L'Oasis Interdite", level: "3-5", type: "Survie", desc: "Une oasis apparemment paradisiaque au milieu du désert. Les voyageurs y entrent mais n'en ressortent jamais." },
        { title: "Le Seigneur de la Cendre", level: "5-8", type: "Boss", desc: "Un seigneur de guerre tieffelin contrôle le seul puits dans un rayon de 100km. Il extorque les caravanes. Libérez le puits." },
        { title: "La Faille Vivante", level: "8-12", type: "Épique", desc: "La Faille de l'Ombre s'élargit. Des démons mineurs commencent à en sortir. Trouvez un moyen de la sceller — ou de la traverser." },
        { title: "Le Trône d'Ashka", level: "12-18", type: "Donjon", desc: "Le palais impérial d'Ashka, enfoui sous la cendre, a été localisé. Ce qui dort à l'intérieur pourrait changer le cours de l'histoire." },
        { title: "L'Éveil du Primordial", level: "20+", type: "Apocalypse", desc: "L'Ombre, le Primordial oublié, tente de revenir. Les sceaux se brisent un à un. Le monde n'a que quelques jours." }
    ]
};

// Rumors and Gossip by Region
export const RUMORS_AND_GOSSIP: RumorsAndGossip = {
    val_dore: [
        { rumor: "La Reine Elara n'a pas été vue en public depuis trois semaines. Le conseil dit qu'elle est 'souffrante'.", truth: true, danger: "élevé" },
        { rumor: "Un dragon dort sous le Grand Jardin Arcanique. C'est pour ça que les plantes poussent si vite.", truth: false },
        { rumor: "La Main Noire recrute ouvertement dans les bas-fonds. Ils préparent quelque chose de gros.", truth: true, danger: "moyen" },
        { rumor: "Le prix du blé a doublé en un mois. Les récoltes pourrissent dans les champs — mais personne ne sait pourquoi.", truth: true, danger: "faible" },
        { rumor: "Un mage a été arrêté pour avoir vendu des sorts de charme aux nobles. On dit qu'il a ensorcelé la moitié du sénat.", truth: "partiellement" },
        { rumor: "Les canalisations sous la vieille ville cachent un réseau de passages secrets qui mènent jusqu'au palais.", truth: true, danger: "mortel" },
        { rumor: "Un enfant de la rue a été vu lancer des sorts sans avoir jamais étudié. La Guilde le cherche.", truth: true }
    ],
    cote_des_orages: [
        { rumor: "Le Marcheur Blanc a été vu à trois jours au nord. Les anciens disent que c'est un présage de guerre.", truth: true, danger: "élevé" },
        { rumor: "Les géants des cimes se battent entre eux. On entend les coups de tonnerre la nuit.", truth: true },
        { rumor: "Un navire nain a coulé avec une cargaison d'or pur. Il repose à 200 mètres de la côte.", truth: true, danger: "élevé" },
        { rumor: "Le Jarl projette d'envahir le Val Doré dès que le printemps arrivera.", truth: false },
        { rumor: "Un clan barbare a trouvé une arme ancienne dans les glaces. Une arme qui parle.", truth: true, danger: "très élevé" }
    ],
    monts_coeur_de_fer: [
        { rumor: "Les mineurs du niveau 12 ont creusé dans quelque chose de vivant. Ils ont rebouché immédiatement.", truth: true, danger: "inconnu" },
        { rumor: "L'Ascenseur de Cristal a des dysfonctionnements de plus en plus fréquents. Les ingénieurs sont inquiets.", truth: true },
        { rumor: "Un nain aurait trouvé un passage vers le plan élémentaire de la Terre. La Guilde a scellé le tunnel.", truth: true, danger: "moyen" },
        { rumor: "Goruk Dent-de-Fer est en réalité le dernier descendant du Roi Rundar. Il pourrait réclamer le trône.", truth: false },
        { rumor: "Des kobolds organisés ont été vus portant des armures de fabrication naine. Quelqu'un les arme.", truth: true, danger: "élevé" }
    ],
    sylve_emeraude: [
        { rumor: "L'Arbre-Monde junior est malade. Ses feuilles tombent alors que c'est le printemps.", truth: true, danger: "critique" },
        { rumor: "Une dryade a été assassinée. C'est la première fois en 500 ans. Le Conseil des Chênes est en fureur.", truth: true, danger: "élevé" },
        { rumor: "Un humain a été accepté dans le Cercle druidique. C'est sans précédent.", truth: true },
        { rumor: "Le Mur de Ronces faiblit à l'est. Quelque chose le ronge de l'intérieur.", truth: true, danger: "élevé" },
        { rumor: "Les dragons de cristal viennent pondre dans la Sylve tous les millénaires. Et le dernier millénaire touche à sa fin.", truth: "incertain" }
    ],
    terres_brulees: [
        { rumor: "Le Pilier de Cendres a recommencé à briller la nuit. Les anciens Ashkans tentent de revenir.", truth: true, danger: "apocalyptique" },
        { rumor: "Un seigneur de guerre a trouvé une cité volante Ashkan intacte, enterrée sous le sable.", truth: true, danger: "très élevé" },
        { rumor: "L'eau de la seule oasis de la région est devenue noire il y a une semaine. Personne n'ose y boire.", truth: true },
        { rumor: "Des tieffelins fuient les Terres Brûlées en masse. Ils ne disent pas pourquoi — ils ont juste peur.", truth: true, danger: "inconnu" },
        { rumor: "On peut entendre des voix dans la Faille de l'Ombre. Elles disent toutes la même chose : 'Libérez-nous.'", truth: true, danger: "mortel" }
    ]
};
