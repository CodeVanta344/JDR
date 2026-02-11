/**
 * Taverns, Inns, Shops, and Named Locations
 */

// Types
export interface Tavern {
    name: string;
    region: string;
    desc: string;
    price: string;
    specialty: string;
    atmosphere: string;
}

export interface Shop {
    name: string;
    region: string;
    type: string;
    desc: string;
    npc?: string;
}

export interface Landmark {
    name: string;
    region: string;
    desc: string;
}

export interface TavernsAndLocations {
    taverns: Tavern[];
    shops: Shop[];
    landmarks: Landmark[];
}

// Taverns, Inns & Named Locations
export const TAVERNS_AND_LOCATIONS: TavernsAndLocations = {
    taverns: [
        { name: "Le Sanglier Doré", region: "Val Doré", desc: "La taverne la plus populaire de Sol-Aureus. Bière blonde, ragoût cuit au feu de bois, une scène pour les bardes. Ambiance chaleureuse et bruyante.", price: "5 Argent/nuit", specialty: "Hydromel de Solarius (restaure 1 PV)", atmosphere: "Chaude, bruyante, accueillante" },
        { name: "La Forge et la Pinte", region: "Monts Cœur-de-Fer", desc: "Taillée dans la roche à même la montagne. On y sert de la bière noire si épaisse qu'on peut y planter une cuillère. Les nains y forment des alliances commerciales.", price: "3 Argent/nuit", specialty: "Pierre-Ale (avantage au JS Constitution pendant 1h)", atmosphere: "Sombre, enfumée, bruits de marteaux" },
        { name: "L'Auberge de la Brume Éternelle", region: "Côte des Orages", desc: "Un bâtiment en bois flotté perché sur une falaise battue par les vents. Vue spectaculaire sur les fjords quand la brume se lève.", price: "8 Argent/nuit", specialty: "Grog du Nord (résistance au froid pendant 2h)", atmosphere: "Silencieuse, brumeuse, mélancolique" },
        { name: "Le Feuillage d'Argent", region: "Sylve d'Émeraude", desc: "Construite dans un arbre millénaire. Les chambres sont des cocons de mousse suspendus. La nourriture est exclusivement végétale mais divine.", price: "12 Argent/nuit", specialty: "Nectar de Lune (restaure 2d4 PV)", atmosphere: "Sereine, lumière tamisée, chant d'oiseaux" },
        { name: "Le Crâne du Brave", region: "Terres Brûlées", desc: "Un repaire de mercenaires construit dans les côtes d'un squelette de créature titanesque. Pas de loi ici. La bière est tiède et le propriétaire est armé.", price: "2 Argent/nuit (dormir = vos affaires)", specialty: "Piss-de-Dragon (courage liquide, -1 Sagesse pendant 1h)", atmosphere: "Dangereuse, sombre, tendue" },
        { name: "Le Repos du Pèlerin", region: "Val Doré", desc: "Auberge tenue par le clergé de Solarius. Propre, calme, pas d'alcool fort. Les prêtres offrent des soins mineurs aux voyageurs en échange de prières.", price: "Gratuit (donation encouragée)", specialty: "Eau Bénite (anti-mort-vivant)", atmosphere: "Paisible, ordonnée, légèrement austère" }
    ],
    shops: [
        { name: "Armes de Varn", region: "Itinérant", type: "Armes", desc: "Chariot blindé tiré par deux bœufs. Épées, haches, dagues de qualité variable.", npc: "Varn le Balafré" },
        { name: "L'Échoppe aux Merveilles", region: "Sol-Aureus", type: "Objets magiques", desc: "Minuscule boutique coincée entre deux bâtiments. On n'y entre que si on sait où chercher.", npc: "Silène la Voilée" },
        { name: "La Serre de Miriel", region: "Sylve d'Émeraude", type: "Potions & Herbes", desc: "Un jardin-laboratoire en plein air. Les plantes se tournent vers les visiteurs.", npc: "Miriel Plume-d'Or" },
        { name: "Les Forges de la Montagne", region: "Hammerdeep", type: "Armures & Forge", desc: "Chaleur étouffante, bruit constant. Peut fabriquer du sur-mesure en 3 jours.", npc: "Goruk Dent-de-Fer" },
        { name: "Le Bazar du Vieux Pont", region: "Sol-Aureus", type: "Général", desc: "Un marché en plein air où l'on trouve de tout — du grain aux reliques volées. Attention aux pickpockets." }
    ],
    landmarks: [
        { name: "Le Carrefour des Vents", region: "Val Doré", desc: "Croisement de quatre routes majeures. Un panneau indique les distances. Des marchands ambulants y campent souvent. Lieu idéal pour une rencontre." },
        { name: "La Pierre du Serment", region: "Côte des Orages", desc: "Un menhir gravé de runes où les guerriers du Nord prêtent serment. Briser un serment fait ici attire une malédiction." },
        { name: "Le Pont des Soupirs", region: "Sol-Aureus", desc: "Un pont élégant en marbre blanc enjambant la rivière Dorée. Les amoureux y accrochent des rubans. La nuit, on entend des murmures." },
        { name: "La Gueule de l'Enfer", region: "Terres Brûlées", desc: "Un canyon rempli de vapeur sulfurique. Le seul passage direct vers les ruines d'Ashka. Beaucoup y entrent. Peu en reviennent." },
        { name: "L'Œil de la Forêt", region: "Sylve d'Émeraude", desc: "Un lac parfaitement circulaire au cœur de la Sylve. L'eau est si claire qu'on voit le fond à 30 mètres. Les Elfes disent qu'il montre l'avenir à ceux qui méritent de le voir." }
    ]
};
