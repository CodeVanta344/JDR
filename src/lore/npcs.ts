/**
 * NPC TEMPLATES
 * Ready-to-use NPCs the GM can deploy in any scene.
 */

// Type definitions
export interface Quest {
    title: string;
    desc: string;
    reward: string;
    level: string;
}

export interface Merchant {
    name: string;
    role: string;
    region: string;
    personality: string;
    appearance: string;
    greeting: string;
    secret: string;
    quests: string[];
    inventory_type: string;
    affinity_trigger: string;
}

export interface Tavernkeeper {
    name: string;
    tavern: string;
    region: string;
    personality: string;
    appearance: string;
    greeting: string;
    rumors: string[];
    secret: string;
}

export interface QuestGiver {
    name: string;
    role: string;
    region: string;
    personality: string;
    appearance: string;
    quests: Quest[];
}

export interface Guard {
    name: string;
    region: string;
    personality: string;
    greeting: string;
}

export interface Outcast {
    name: string;
    role: string;
    region: string;
    personality: string;
    appearance: string;
    greeting: string;
    knowledge?: string[];
    hire_cost?: string;
}

export interface NPCTemplates {
    merchants: Merchant[];
    tavernkeepers: Tavernkeeper[];
    quest_givers: QuestGiver[];
    guards: Guard[];
    outcasts: Outcast[];
}

export const NPC_TEMPLATES: NPCTemplates = {
    merchants: [
        {
            name: "Varn le Balafré",
            role: "Marchand d'armes itinérant",
            region: "Val Doré",
            personality: "Bourru mais honnête. Déteste les voleurs. Respecte les guerriers.",
            appearance: "Cicatrice en travers du visage, bras gauche mécanique (prothèse naine), tablier de cuir épais.",
            greeting: "Approchez, approchez. Pas de camelote ici — que du bon acier. Touchez avec les yeux d'abord.",
            secret: "Il forge secrètement des lames pour la résistance contre le Cercle des Cendres.",
            quests: ["Retrouver un lot d'armes volé par des gobelins", "Livrer une commande secrète à un contact à Hammerdeep"],
            inventory_type: "weapons",
            affinity_trigger: "Montrer du respect pour l'artisanat ou raconter un exploit au combat"
        },
        {
            name: "Miriel Plume-d'Or",
            role: "Herboriste et alchimiste",
            region: "Sylve d'Émeraude",
            personality: "Douce et mystérieuse. Parle aux plantes. Semble toujours savoir ce dont vous avez besoin.",
            appearance: "Cheveux argentés tressés avec des fleurs, yeux verts lumineux, robe de lin teintée de vert.",
            greeting: "Oh, vous avez l'air fatigué... et blessé, aussi. Intérieurement, je veux dire. Laissez-moi voir ce que j'ai...",
            secret: "Elle est une ancienne druidesse du Cercle de la Lune, exilée pour avoir utilisé des spores interdites.",
            quests: ["Cueillir de l'Aconit de Lune dans les Monts Cœur-de-Fer", "Trouver un antidote pour un village empoisonné"],
            inventory_type: "potions",
            affinity_trigger: "Montrer du respect pour la nature ou offrir une plante rare"
        },
        {
            name: "Goruk Dent-de-Fer",
            role: "Forgeron nain",
            region: "Monts Cœur-de-Fer",
            personality: "Perfectionniste obsessionnel. Ne vend que ce qu'il considère comme digne. Méprise le travail médiocre.",
            appearance: "Nain trapu, barbe rousse tressée en chaînes, mains noires de suie, iris dorés.",
            greeting: "*regarde votre équipement avec dégoût* Qui vous a vendu ça ? Un gobelin aveugle ?",
            secret: "Il cherche le Marteau de Thundrak, un outil légendaire capable de forger de l'adamantium.",
            quests: ["Rapporter du minerai d'étoile tombé dans les Terres Brûlées", "Tester une armure expérimentale en combat réel"],
            inventory_type: "armor_weapons",
            affinity_trigger: "Lui apporter un matériau rare ou critiquer intelligemment un équipement"
        },
        {
            name: "Silène la Voilée",
            role: "Marchande d'objets magiques",
            region: "Sol-Aureus",
            personality: "Énigmatique. Parle en métaphores. Ne dit jamais un prix — elle propose des échanges.",
            appearance: "Voile pourpre couvrant le bas du visage, bijoux en améthyste, boutique minuscule et encombrée.",
            greeting: "Vous ne m'avez pas trouvée par hasard. Personne ne trouve ma boutique par hasard.",
            secret: "Elle est un avatar mineur de la Dame Voilée, testant les mortels qui croisent son chemin.",
            quests: ["Retrouver un miroir brisé dont les éclats se sont dispersés dans 3 régions", "Porter un message à quelqu'un qui est mort il y a 50 ans"],
            inventory_type: "magic_items",
            affinity_trigger: "Résoudre une de ses énigmes ou lui offrir un souvenir personnel chargé d'émotion"
        }
    ],
    tavernkeepers: [
        {
            name: "Bram Tonnelier",
            tavern: "Le Sanglier Doré",
            region: "Val Doré",
            personality: "Jovial, bavard, curieux. Connaît tous les potins de la ville. Protecteur envers ses habitués.",
            appearance: "Homme massif, moustache en guidon, tablier toujours taché de bière, rire tonitruant.",
            greeting: "Bienvenue au Sanglier ! Prenez place, la première pinte est offerte si vous avez une bonne histoire !",
            rumors: ["On dit que la garde royale recrute — mais seulement ceux qui savent tenir leur langue.", "Le vieux moulin au sud a été racheté par quelqu'un que personne n'a jamais vu."],
            secret: "Il est un ancien agent de la Main Noire qui a pris sa retraite après avoir trahi un contrat."
        },
        {
            name: "Helga Poing-de-Pierre",
            tavern: "La Forge et la Pinte",
            region: "Monts Cœur-de-Fer",
            personality: "Naine directe, ne supporte pas les plaintes, mais se bat pour ses clients si nécessaire.",
            appearance: "Naine musclée, cheveux noirs coupés court, cicatrice sur la mâchoire, sert les bières d'une main.",
            greeting: "On s'assoit, on commande, on paie. Si vous cherchez des ennuis, la porte est derrière vous. Si vous cherchez une aventure, parlez au borgne du coin.",
            rumors: ["Les mineurs du niveau 12 ont trouvé quelque chose qu'ils refusent de décrire.", "Un nain a disparu dans les tunnels inférieurs il y a une semaine. Personne n'ose aller vérifier."],
            secret: "Elle protège secrètement l'entrée d'un tunnel menant au temple perdu des nains ancestraux."
        },
        {
            name: "Lysandre Murmure-d'Étoile",
            tavern: "L'Auberge de la Brume Éternelle",
            region: "Côte des Orages",
            personality: "Calme, philosophe, mélancolique. Sert en silence mais observe tout.",
            appearance: "Homme élancé aux yeux gris, cheveux blancs malgré sa jeunesse, voix basse.",
            greeting: "*pose une chope sans un mot, attend que vous parliez en premier*",
            rumors: ["Les pêcheurs ont remonté un coffre scellé par de la magie. Personne n'a pu l'ouvrir.", "Le Jarl prépare une expédition vers le Gouffre d'Ymir. Il cherche des volontaires... ou des sacrifices."],
            secret: "C'est un chronomancien qui a vécu plusieurs vies. Il peut donner des indices cryptiques sur le futur."
        }
    ],
    quest_givers: [
        {
            name: "Capitaine Aldric Fervent",
            role: "Commandeur du Bouclier d'Argent",
            region: "Sol-Aureus",
            personality: "Droit, intransigeant, honorable. Juge les gens sur leurs actes, pas sur leurs paroles.",
            appearance: "Armure d'argent polie, cape bleue, mâchoire carrée, regard perçant.",
            quests: [
                { title: "La Patrouille Disparue", desc: "Une escouade de 5 chevaliers a disparu en patrouillant les routes du sud. Retrouvez-les.", reward: "100 Or + Faveur de l'Ordre", level: "3-5" },
                { title: "Le Stigmate du Corbeau", desc: "Des villageois ont été retrouvés avec un symbole gravé dans la peau. Enquêtez sur cette marque et trouvez le responsable.", reward: "200 Or + Armure du Bouclier", level: "5-8" },
                { title: "Les Ombres dans la Lumière", desc: "L'Ordre suspecte qu'un de ses propres Sénéchaux est infiltré par le Cercle des Cendres. Prouvez-le sans éveiller les soupçons.", reward: "500 Or + Titre de Chevalier Honoraire", level: "8-12" }
            ]
        },
        {
            name: "Kaelith la Tisseuse",
            role: "Archiviste de la Guilde des Arcanes",
            region: "Sol-Aureus",
            personality: "Brillante, distraite, passionnée. Oublie de manger quand elle lit. Fascination pour les anomalies magiques.",
            appearance: "Elfe aux lunettes trop grandes, cheveux indigo en désordre, doigts tachés d'encre, robes couvertes de notes.",
            quests: [
                { title: "L'Anomalie de Pluiedor", desc: "Un champ près du Val Doré fait pousser des cristaux au lieu du blé depuis la dernière pleine lune. Prenez des échantillons.", reward: "75 Or + Potion rare", level: "1-3" },
                { title: "Les Écritures Mouvantes", desc: "Un texte ancien change de contenu chaque nuit. Trouvez la source de cet enchantement dans les ruines au nord de la Sylve.", reward: "150 Or + Grimoire de sort", level: "4-6" },
                { title: "La Bibliothèque Engloutie", desc: "Un tremblement de terre a révélé une structure Ashkan sous le lac. Plongez et récupérez les Archives de Kaelen le Sage.", reward: "400 Or + Accès aux archives secrètes", level: "7-10" }
            ]
        },
        {
            name: "Dame Iskara",
            role: "Informatrice de la Main Noire",
            region: "Partout",
            personality: "Charmeuse, manipulatrice, pragmatique. Toujours un coup d'avance. Ne fait jamais confiance gratuitement.",
            appearance: "Varie à chaque rencontre. On la reconnaît à son parfum de jasmin noir et à sa bague en onyx.",
            quests: [
                { title: "La Livraison Discrète", desc: "Portez ce paquet scellé à un contact dans les bas-fonds de Hammerdeep. Ne l'ouvrez pas.", reward: "50 Or + Faveur de la Main Noire", level: "1-4" },
                { title: "Le Chantage", desc: "Récupérez des documents compromettants dans le bureau d'un sénateur. Un travail propre, pas de victimes.", reward: "200 Or + Information capitale", level: "4-7" },
                { title: "L'Extraction", desc: "Un de nos agents est prisonnier dans la Citadelle d'Albâtre. Sortez-le discrètement. Si vous êtes pris, nous ne vous connaissons pas.", reward: "500 Or + Identité alternative complète", level: "8-15" }
            ]
        }
    ],
    guards: [
        { name: "Gareth le Vigilant", region: "Sol-Aureus", personality: "Strict mais juste", greeting: "Halte. Déclarez vos armes et votre raison de visite." },
        { name: "Tormund Casse-Crâne", region: "Kuldahar", personality: "Méfiant envers les étrangers, respecte la force", greeting: "Les étrangers ne passent que si un Jarl se porte garant. Ou s'ils prouvent leur valeur." },
        { name: "Fynn Plume-Grise", region: "Hammerdeep", personality: "Corruptible pour le bon prix", greeting: "Le passage est réservé aux membres de la Guilde. Mais les clés, ça se négocie..." }
    ],
    outcasts: [
        {
            name: "Le Prophète Sans Nom",
            role: "Ermite mystique",
            region: "Terres Brûlées",
            personality: "Cryptique, visionnaire, effrayant. Dit des vérités que personne ne veut entendre.",
            appearance: "Enveloppé dans des bandages noircis, yeux blancs sans pupilles, voix rauque.",
            greeting: "Vous êtes venu chercher des réponses. Mais êtes-vous prêt pour les questions ?",
            knowledge: ["L'emplacement approximatif d'un fragment du Maillon d'Or", "La véritable identité du Maître des Braises", "Le moyen de communiquer avec les Primordiaux"]
        },
        {
            name: "Zara la Rouge",
            role: "Mercenaire indépendante",
            region: "Itinérante",
            personality: "Sarcastique, loyale une fois qu'on l'a payée. Respecte le code d'honneur des mercenaires.",
            appearance: "Cheveux rouges vif, armure de cuir clouté, deux cimeterres croisés dans le dos.",
            greeting: "Si vous avez de l'or et un ennemi, on a des choses à se dire. Sinon, vous me faites perdre mon temps.",
            hire_cost: "10 Or/jour + part du butin"
        }
    ]
};
