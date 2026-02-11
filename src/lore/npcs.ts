/**
 * NPC TEMPLATES - EXTENSIVE DATABASE
 * Rich, varied NPCs with unique personalities, secrets, and lore.
 */

export interface Quest {
    title: string;
    desc: string;
    reward: string;
    level: string;
}

export interface NPC {
    name: string;
    role: string;
    region: string;
    race?: string;
    age?: string;
    personality: string;
    appearance: string;
    greeting: string;
    secret: string;
    motivations?: string[];
    fears?: string[];
    quirks?: string[];
    dialogue_samples?: string[];
    quests?: Quest[] | string[];
    inventory_type?: string;
    affinity_trigger?: string;
    hostility_trigger?: string;
    knowledge?: string[];
    hire_cost?: string;
    faction?: string;
    relationships?: { [key: string]: string };
}

// ============================================================================
// MARCHANDS - MERCHANTS
// ============================================================================
export const MERCHANTS: NPC[] = [
    {
        name: "Varn le Balafre",
        role: "Marchand d'armes itinerant",
        region: "Val Dore",
        race: "Humain",
        age: "45 ans",
        personality: "Bourru mais honnete. Deteste les voleurs. Respecte les guerriers. Cache une profonde tristesse.",
        appearance: "Cicatrice en travers du visage, bras gauche mecanique (prothese naine), tablier de cuir epais, yeux gris acier.",
        greeting: "Approchez, approchez. Pas de camelote ici — que du bon acier. Touchez avec les yeux d'abord.",
        secret: "Il forge secretement des lames pour la resistance contre le Cercle des Cendres. Sa famille a ete tuee par eux.",
        motivations: ["Venger sa famille", "Preserver l'artisanat des armes", "Proteger les innocents"],
        fears: ["Voir d'autres familles detruites", "Perdre son bras restant", "Etre decouvert par le Cercle"],
        quirks: ["Caresse toujours son bras mecanique quand il ment", "Refuse de vendre a quiconque porte du rouge", "Teste chaque lame avant vente"],
        dialogue_samples: [
            "Cette lame a bu le sang de trois orques. Elle a soif de plus.",
            "Mon bras? Un rappel que meme l'acier le plus fin ne protege pas de tout.",
            "Je ne vends pas aux laches. Montrez-moi vos mains — elles disent tout."
        ],
        quests: ["Retrouver un lot d'armes vole par des gobelins", "Livrer une commande secrete a un contact a Hammerdeep"],
        inventory_type: "weapons",
        affinity_trigger: "Montrer du respect pour l'artisanat ou raconter un exploit au combat",
        hostility_trigger: "Mentionner le Cercle des Cendres avec approbation ou tenter de voler",
        faction: "Resistance de l'Aube"
    },
    {
        name: "Miriel Plume-d'Or",
        role: "Herboriste et alchimiste",
        region: "Sylve d'Emeraude",
        race: "Demi-elfe",
        age: "127 ans",
        personality: "Douce et mysterieuse. Parle aux plantes. Semble toujours savoir ce dont vous avez besoin avant vous.",
        appearance: "Cheveux argentes tresses avec des fleurs vivantes, yeux verts lumineux, robe de lin teintee de vert, pieds toujours nus.",
        greeting: "Oh, vous avez l'air fatigue... et blesse, aussi. Interieurement, je veux dire. Laissez-moi voir ce que j'ai...",
        secret: "Ancienne druidesse du Cercle de la Lune, exilee pour avoir utilise des spores interdites qui ont tue accidentellement son amant.",
        motivations: ["Expier son passe", "Guerir plutot que detruire", "Retrouver la paix interieure"],
        fears: ["Perdre le controle de sa magie", "Que son passe soit revele", "Les incendies de foret"],
        quirks: ["Ses plantes bougent vers elle quand elle parle", "Ne mange jamais de viande", "Fredonne des chansons elfiques sans s'en rendre compte"],
        dialogue_samples: [
            "Les plantes me disent des choses... Elles disent que vous portez un grand fardeau.",
            "Cette teinture? Prenez-la au crepuscule, jamais a l'aube. La lune doit etre temoin.",
            "Je ne demande pas d'or. Plantez cette graine quelque part ou elle sera aimee."
        ],
        quests: ["Cueillir de l'Aconit de Lune dans les Monts Coeur-de-Fer", "Trouver un antidote pour un village empoisonne"],
        inventory_type: "potions",
        affinity_trigger: "Montrer du respect pour la nature ou offrir une plante rare",
        hostility_trigger: "Detruire des plantes devant elle ou parler de brule la foret"
    },
    {
        name: "Goruk Dent-de-Fer",
        role: "Maitre-forgeron nain",
        region: "Monts Coeur-de-Fer",
        race: "Nain",
        age: "234 ans",
        personality: "Perfectionniste obsessionnel. Ne vend que ce qu'il considere comme digne. Meprise le travail mediocre avec passion.",
        appearance: "Nain trapu, barbe rousse tressee en chaines metalliques, mains noires de suie permanente, iris dores comme l'or en fusion.",
        greeting: "*regarde votre equipement avec degout* Qui vous a vendu ca? Un gobelin aveugle? Un enfant humain?",
        secret: "Il cherche le Marteau de Thundrak, un outil legendaire capable de forger de l'adamantium. Son pere est mort en le cherchant.",
        motivations: ["Creer l'arme parfaite", "Honorer la memoire de son pere", "Surpasser tous les forgerons vivants"],
        fears: ["Produire une arme defectueuse", "Perdre la vue a cause des flammes", "Mourir sans avoir forge son chef-d'oeuvre"],
        quirks: ["Insulte l'equipement de tous les clients", "Travaille 20 heures par jour", "Parle a ses enclumes comme a des amis"],
        dialogue_samples: [
            "Vous voulez du travail rapide, allez voir les humains. Vous voulez du travail BIEN fait, attendez.",
            "Cette epee? Elle a pris trois mois. Chaque molecule de metal a ete convaincue de cooperer.",
            "Mon pere disait: 'Un nain qui hate son travail insulte ses ancetres.' Je ne les insulte pas."
        ],
        quests: ["Rapporter du minerai d'etoile tombe dans les Terres Brulees", "Tester une armure experimentale en combat reel"],
        inventory_type: "armor_weapons",
        affinity_trigger: "Lui apporter un materiau rare ou critiquer intelligemment un equipement",
        hostility_trigger: "Suggerer qu'un forgeron humain est meilleur",
        faction: "Guilde des Forgerons de Fer-Profond"
    },
    {
        name: "Silene la Voilee",
        role: "Marchande d'objets magiques",
        region: "Sol-Aureus",
        race: "???",
        age: "Inconnue",
        personality: "Enigmatique au plus haut point. Parle en metaphores. Ne dit jamais un prix — elle propose des echanges de valeur egale.",
        appearance: "Voile pourpre couvrant le bas du visage, bijoux en amethyste qui semblent flotter, boutique minuscule qu'on ne trouve jamais deux fois au meme endroit.",
        greeting: "Vous ne m'avez pas trouvee par hasard. Personne ne trouve ma boutique par hasard. Qu'avez-vous a echanger?",
        secret: "Avatar mineur de la Dame Voilee, deesse du destin. Elle teste les mortels qui croisent son chemin pour des raisons divines.",
        motivations: ["Observer les mortels", "Tisser les fils du destin", "Collecter les souvenirs charges d'emotion"],
        fears: ["L'oubli total", "Le chaos primordial", "Les dieux de la destruction"],
        quirks: ["Sa boutique change de lieu chaque nuit", "Elle connait le nom des clients avant qu'ils ne se presentent", "Ses prix sont toujours des echanges symboliques"],
        dialogue_samples: [
            "Cet anneau? Il coute... un regret sincere. Un que vous portez depuis longtemps.",
            "Je vois trois chemins devant vous. Deux menent a la gloire. Un a la verite. Ils ne sont pas les memes.",
            "Revenez quand la lune sera pleine. J'aurai ce que vous cherchez vraiment."
        ],
        quests: ["Retrouver un miroir brise dont les eclats se sont disperses dans 3 regions", "Porter un message a quelqu'un qui est mort il y a 50 ans"],
        inventory_type: "magic_items",
        affinity_trigger: "Resoudre une de ses enigmes ou lui offrir un souvenir personnel charge d'emotion"
    },
    {
        name: "Kessa Sombrefil",
        role: "Marchande de poisons et d'antidotes",
        region: "Hammerdeep",
        race: "Humaine",
        age: "34 ans",
        personality: "Professionnelle, amorale, extremement intelligente. Ne juge jamais ses clients. La discretion est son commerce.",
        appearance: "Cheveux noirs courts, cicatrices de brulures chimiques sur les bras, toujours gantee, yeux noisette calculateurs.",
        greeting: "Bienvenue. Je vends des solutions. Pas de questions posees, pas de questions repondues. Qu'est-ce qui vous ennuie?",
        secret: "Ancienne empoisonneuse royale du royaume voisin. Elle a fui apres avoir refuse d'empoisonner un enfant.",
        motivations: ["Survivre", "Ne jamais reprendre ses anciennes fonctions", "Aider ceux qui fuient comme elle a fui"],
        fears: ["Etre retrouvee par ses anciens employeurs", "Empoisonner un innocent par erreur", "La torture"],
        quirks: ["Goute tous ses produits pour prouver leur non-letalite", "Garde toujours 3 antidotes sur elle", "Ne mange jamais dans un restaurant"],
        dialogue_samples: [
            "Le prix depend de la cible. Plus elle est importante, plus c'est cher. Question de risque.",
            "Ceci? Paralysie temporaire, 6 heures, sans sequelles. Parfait pour une discussion... privee.",
            "Je ne vends pas la mort aux enfants. C'est ma seule regle."
        ],
        inventory_type: "poisons_antidotes",
        affinity_trigger: "Montrer qu'on a aussi fui quelque chose",
        hostility_trigger: "Mentionner le Royaume de Valdris",
        faction: "Main Noire (contact occasionnel)"
    },
    {
        name: "Baldo Rondebourse",
        role: "Preteur sur gages et antiquaire",
        region: "Val Dore",
        race: "Halfelin",
        age: "67 ans",
        personality: "Cupide mais juste. Connait la valeur de tout. Adore les histoires derriere les objets plus que les objets eux-memes.",
        appearance: "Petit meme pour un halfelin, lunettes epaisses, gilet borde d'or, doigts agiles et taches d'encre.",
        greeting: "Oh oh! Des clients! Entrez, entrez! Qu'avez-vous a me montrer? Chaque objet a une histoire, et j'adore les histoires!",
        secret: "Il possede une carte menant a un tresor pirate, mais est trop vieux et peureux pour y aller lui-meme.",
        motivations: ["Accumuler des richesses", "Entendre des histoires fascinantes", "Laisser un heritage a ses 12 enfants"],
        fears: ["Le vol", "Mourir dans la pauvrete", "Les aventures dangereuses"],
        quirks: ["Evalue tout en or a voix haute", "Raconte l'histoire de chaque objet de sa boutique", "Offre toujours du the"],
        dialogue_samples: [
            "Cette montre? 50 pieces d'or. Mais si vous me racontez ou vous l'avez trouvee, 45.",
            "J'ai eu cette epee d'un chevalier qui avait tout perdu au jeu. Tragique, vraiment. 200 pieces.",
            "Mon grand-pere disait: 'L'or va et vient, mais les bonnes histoires restent.'"
        ],
        inventory_type: "misc_antiques",
        affinity_trigger: "Raconter une histoire captivante sur un objet"
    },
    {
        name: "Thalia Main-de-Soie",
        role: "Couturiere et tailleuse de luxe",
        region: "Sol-Aureus",
        race: "Humaine",
        age: "52 ans",
        personality: "Hautaine avec les rustres, chaleureuse avec les raffines. Snob assumee. Artiste dans l'ame.",
        appearance: "Elegante, cheveux gris coiffes en chignon parfait, lunettes en or, doigts fins ornes de des a coudre en argent.",
        greeting: "*vous examine de haut en bas* Hmm. Du potentiel. Beaucoup de travail, mais du potentiel.",
        secret: "Elle coud des messages codes dans les vetements des membres de la Resistance. Chaque motif est une information.",
        motivations: ["Creer la beaute", "Soutenir la resistance discretement", "Former la prochaine generation de couturiers"],
        fears: ["La vulgarite vestimentaire", "Etre decouverte", "Perdre la vue"],
        quirks: ["Refuse de toucher des vetements mal entretenus", "Cite des philosophes sur l'elegance", "Garde toujours une aiguille cachee comme arme"],
        dialogue_samples: [
            "Le vetement fait l'homme? Non. Le vetement REVELE l'homme.",
            "Cette cape? Elle appartenait a une comtesse. Les taches de sang ont ete enlevees, bien sur.",
            "Je ne fais pas de 'rapide et pas cher'. Je fais de l'art portable."
        ],
        inventory_type: "clothing_noble",
        affinity_trigger: "Montrer une appreciation sincere pour la mode ou les arts",
        hostility_trigger: "Porter des vetements sales ou dechires dans sa boutique"
    },
    {
        name: "Ragnar Ecorce-de-Chene",
        role: "Vendeur de betes et dresseur",
        region: "Sylve d'Emeraude",
        race: "Humain (sang nordique)",
        age: "41 ans",
        personality: "Rude avec les humains, tendre avec les animaux. Juge les gens selon comment ils traitent les betes.",
        appearance: "Geant barbu, cheveux blonds nattés, cicatrices de griffes sur les bras, toujours accompagne d'au moins 3 animaux.",
        greeting: "*un loup vous renifle* Doucement, Croc. *vous regarde* Il vous aime pas. Ca veut dire quoi pour vous?",
        secret: "Il peut reellement parler aux animaux grace a une benediction druidique. Il ne le dit a personne.",
        motivations: ["Proteger les animaux des cruels", "Trouver des maitres dignes pour ses betes", "Liberer les animaux maltraites"],
        fears: ["Voir des animaux souffrir", "Les braconniers", "Les cages trop petites"],
        quirks: ["Dort dehors avec ses animaux", "Ne serre jamais la main (les animaux n'aiment pas)", "Nourrit ses betes avant de manger lui-meme"],
        dialogue_samples: [
            "Ce faucon? Il a choisi 3 maitres avant. Ils sont tous morts. Interesses?",
            "Les animaux ne mentent jamais. Si ma louve grogne, c'est que vous avez quelque chose a cacher.",
            "500 pieces pour le cheval. 50 de plus si vous me promettez de jamais utiliser d'eperons."
        ],
        inventory_type: "mounts_pets",
        affinity_trigger: "Montrer de la gentillesse envers un animal",
        hostility_trigger: "Maltraiter un animal ou parler de chasse sportive"
    }
];

// ============================================================================
// TAVERNIERS - TAVERNKEEPERS
// ============================================================================
export const TAVERNKEEPERS: NPC[] = [
    {
        name: "Bram Tonnelier",
        role: "Tavernier du Sanglier Dore",
        region: "Val Dore",
        race: "Humain",
        age: "54 ans",
        personality: "Jovial, bavard, curieux. Connait tous les potins de la ville. Protecteur envers ses habitues comme un pere.",
        appearance: "Homme massif, moustache en guidon impressionnante, tablier toujours tache de biere, rire tonitruant.",
        greeting: "Bienvenue au Sanglier! Prenez place, la premiere pinte est offerte si vous avez une bonne histoire!",
        secret: "Ancien agent de la Main Noire qui a trahi un contrat pour sauver une famille. Il vit cache depuis.",
        motivations: ["Proteger ses clients", "Oublier son passe", "Collecter des histoires"],
        fears: ["Que la Main Noire le retrouve", "Perdre sa taverne", "Le silence dans son etablissement"],
        quirks: ["N'oublie jamais le nom d'un client", "Raconte toujours des blagues terribles", "Cache des armes sous chaque table"],
        dialogue_samples: [
            "Encore une! Et celle-la est sur la maison parce que cette histoire m'a fait pleurer de rire!",
            "Vous voyez ce type au coin? Ne lui parlez jamais de sa femme. Croyez-moi.",
            "Ma biere? Recette secrete de ma grand-mere. Elle a vecu jusqu'a 90 ans. Coincidence? Je pense pas."
        ]
    },
    {
        name: "Helga Poing-de-Pierre",
        role: "Tenanciere de La Forge et la Pinte",
        region: "Monts Coeur-de-Fer",
        race: "Naine",
        age: "178 ans",
        personality: "Directe comme une hache. Ne supporte pas les plaintes. Mais se bat pour ses clients si necessaire.",
        appearance: "Naine musclee, cheveux noirs coupes court, cicatrice sur la machoire, sert les bieres d'une seule main.",
        greeting: "On s'assoit, on commande, on paie. Problemes? La porte. Aventures? Le borgne du coin.",
        secret: "Elle protege l'entree d'un tunnel menant au temple perdu des nains ancestraux sous sa cave.",
        motivations: ["Garder le secret du temple", "Maintenir l'honneur nain", "Servir la meilleure biere des montagnes"],
        fears: ["Que le temple soit profane", "La honte", "Les elfes pretentieux"],
        quirks: ["Ecrase les chopes sur sa tete pour impressionner", "Chante des chants nains quand elle est ivre", "Respecte uniquement ceux qui peuvent boire autant qu'elle"],
        dialogue_samples: [
            "Vous avez l'air d'avoir soif. Ou d'avoir des ennuis. C'est souvent la meme chose.",
            "Cette biere a 200 ans d'age. Plus vieille que la plupart de vos ancetres humains.",
            "Un elfe m'a dit un jour que ma biere etait 'acceptable'. Il est reparti par la fenetre."
        ]
    },
    {
        name: "Lysandre Murmure-d'Etoile",
        role: "Aubergiste de la Brume Eternelle",
        region: "Cote des Orages",
        race: "Humain (?)",
        age: "Apparait 30 ans (bien plus vieux)",
        personality: "Calme, philosophe, melancolique. Sert en silence mais observe tout. Semble porter le poids de plusieurs vies.",
        appearance: "Homme elance aux yeux gris tempete, cheveux blancs malgre sa jeunesse apparente, voix aussi basse que le ressac.",
        greeting: "*pose une chope sans un mot, attend que vous parliez en premier*",
        secret: "Chronomancien qui a vecu plusieurs vies. Chaque boucle temporelle laisse une trace. Il cherche a briser le cycle.",
        motivations: ["Briser sa malediction temporelle", "Aider ceux qui ont perdu leur chemin", "Comprendre le temps"],
        fears: ["Revivre les memes erreurs", "Oublier qui il etait vraiment", "L'eternite"],
        quirks: ["Finit les phrases des autres avant qu'ils ne parlent", "Regarde souvent par la fenetre comme s'il attendait quelqu'un", "Ne dort jamais"],
        dialogue_samples: [
            "Vous allez me poser une question sur le Jarl. La reponse est non, mais vous devriez quand meme essayer.",
            "J'ai vu ce coucher de soleil... plusieurs fois. Il est toujours aussi beau.",
            "Le temps est une spirale, pas une ligne. Nous nous recroiserons. Nous nous sommes deja recroises."
        ]
    },
    {
        name: "Rosalind Trois-Doigts",
        role: "Gerante du Rat Borgne",
        region: "Hammerdeep",
        race: "Humaine",
        age: "61 ans",
        personality: "Maternelle avec les desesperes, impitoyable avec les tricheurs. A vu trop pour etre choquee par quoi que ce soit.",
        appearance: "Femme robuste, trois doigts a la main gauche, cheveux gris en chignon serre, tablier cache plusieurs couteaux.",
        greeting: "Entre, petit. T'as l'air d'avoir besoin d'un repas chaud et d'un endroit ou personne pose de questions.",
        secret: "Elle dirige un reseau d'exfiltration pour les esclaves en fuite. Sa cave mene aux egouts et a la liberte.",
        motivations: ["Sauver les opprimes", "Punir les esclavagistes", "Donner une seconde chance"],
        fears: ["Que son reseau soit decouvert", "Perdre plus de doigts", "L'esclavage"],
        quirks: ["Appelle tout le monde 'petit' ou 'petite'", "Sert des portions enormes aux maigres", "Connait le nom de chaque enfant du quartier"],
        dialogue_samples: [
            "Mange d'abord, parle ensuite. Personne reflechit bien le ventre vide.",
            "Mes doigts? Un marchand d'esclaves les voulait comme avertissement. Il a eu pire en retour.",
            "Dans cette taverne, y'a deux regles: on paie sa note et on touche pas aux gamins."
        ]
    },
    {
        name: "Elowen Chant-du-Vent",
        role: "Proprietaire de L'Arbre Susurrant",
        region: "Sylve d'Emeraude",
        race: "Elfe sylvestre",
        age: "342 ans",
        personality: "Sereine, sage, parfois condescendante sans le vouloir. Voit les humains comme des enfants charmants mais ephemeres.",
        appearance: "Grande elfe aux cheveux vert-mousse, oreilles ornees de feuilles, yeux ambre, sa taverne est litteralement DANS un arbre geant.",
        greeting: "Bienvenue, voyageurs ephemeres. L'arbre vous accueille. Vos soucis resteront a la porte.",
        secret: "L'arbre qui abrite sa taverne est son frere, transforme par une malediction il y a 200 ans. Elle cherche a le sauver.",
        motivations: ["Sauver son frere", "Preserver la foret", "Eduquer les jeunes races"],
        fears: ["Les bucherous", "Le feu", "Voir son frere mourir arbre"],
        quirks: ["Parle a l'arbre comme a une personne (car c'en est une)", "Sert des boissons a base de seve et de rosee", "Ses clients doivent retirer leurs chaussures"],
        dialogue_samples: [
            "Vous les humains, toujours si presses. La seve coule lentement, vous savez.",
            "Mon frere dit que vous avez bon coeur. Il sent ces choses. Je lui fais confiance.",
            "Cette liqueur a 150 ans. Pour vous, c'est une antiquite. Pour moi, c'est du millesime recent."
        ]
    }
];

// ============================================================================
// QUEST GIVERS - DONNEURS DE QUETES
// ============================================================================
export const QUEST_GIVERS: NPC[] = [
    {
        name: "Capitaine Aldric Fervent",
        role: "Commandeur du Bouclier d'Argent",
        region: "Sol-Aureus",
        race: "Humain",
        age: "47 ans",
        personality: "Droit, intransigeant, honorable jusqu'a la rigidite. Juge les gens sur leurs actes, jamais sur leurs paroles.",
        appearance: "Armure d'argent polie comme miroir, cape bleue immaculee, machoire carree, regard percant qui semble voir les mensonges.",
        greeting: "Vous etes la pour servir ou pour parler? Je n'ai pas de temps pour le second.",
        secret: "Son fils a rejoint le Cercle des Cendres. Il le traque en secret, dechire entre devoir et amour paternel.",
        quests: [
            { title: "La Patrouille Disparue", desc: "5 chevaliers disparus au sud. Retrouvez-les ou leurs corps.", reward: "100 Or + Faveur de l'Ordre", level: "3-5" },
            { title: "Le Stigmate du Corbeau", desc: "Des villageois marques d'un symbole grave dans la peau. Trouvez le coupable.", reward: "200 Or + Armure du Bouclier", level: "5-8" }
        ]
    },
    {
        name: "Kaelith la Tisseuse",
        role: "Archiviste de la Guilde des Arcanes",
        region: "Sol-Aureus",
        race: "Elfe",
        age: "189 ans",
        personality: "Brillante, extremement distraite, passionnee. Oublie de manger pendant des jours quand elle lit.",
        appearance: "Elfe aux lunettes trop grandes, cheveux indigo en desordre total, doigts taches d'encre permanente, robes couvertes de notes.",
        greeting: "Oh! Des visiteurs! Attendez, je... ou ai-je mis ce livre? Peu importe. Vous cherchez quelque chose de fascinant, j'espere?",
        secret: "Elle a accidentellement ouvert un portail vers un autre plan il y a 50 ans. Elle le garde ferme par la force de sa volonte.",
        quests: [
            { title: "L'Anomalie de Pluiedor", desc: "Un champ fait pousser des cristaux depuis la pleine lune. Echantillons requis.", reward: "75 Or + Potion rare", level: "1-3" },
            { title: "Les Ecritures Mouvantes", desc: "Un texte change chaque nuit. Trouvez la source.", reward: "150 Or + Grimoire", level: "4-6" }
        ]
    },
    {
        name: "Dame Iskara",
        role: "Informatrice de la Main Noire",
        region: "Partout et nulle part",
        race: "Inconnue (change d'apparence)",
        age: "???",
        personality: "Charmeuse, manipulatrice, pragmatique. Toujours trois coups d'avance. Ne fait jamais confiance gratuitement.",
        appearance: "Varie a chaque rencontre. On la reconnait a son parfum de jasmin noir et sa bague en onyx, toujours presentes.",
        greeting: "Vous me cherchiez? Ou peut-etre que je vous cherchais. La frontiere est floue dans notre metier.",
        secret: "Elle est en realite trois soeurs jumelles qui partagent la meme identite. Personne ne sait qu'elles sont trois.",
        quests: [
            { title: "La Livraison Discrete", desc: "Portez ce paquet. Ne l'ouvrez pas. Ne posez pas de questions.", reward: "50 Or + Faveur", level: "1-4" },
            { title: "Le Chantage", desc: "Documents compromettants a recuperer. Travail propre exige.", reward: "200 Or + Info capitale", level: "4-7" }
        ]
    },
    {
        name: "Vieux Torgen",
        role: "Ermite des montagnes",
        region: "Monts Coeur-de-Fer",
        race: "Nain",
        age: "412 ans",
        personality: "Grognon, sarcastique, secretement bienveillant. Teste ceux qui le trouvent avant de les aider.",
        appearance: "Nain antique, barbe blanche trainant par terre, yeux encore vifs comme des diamants, appuye sur un baton sculpte de runes.",
        greeting: "Encore des jeunes qui veulent des 'quetes heroiques'. Pfah. Vous savez meme pas lacer vos bottes correctement.",
        secret: "Dernier gardien d'un depot d'armes naines legendaires. Il cherche des successeurs dignes.",
        quests: [
            { title: "L'Epreuve de la Pierre", desc: "Survivez une nuit dans la Caverne des Echos sans magie ni arme.", reward: "Enseignement + Carte", level: "2-4" },
            { title: "Le Coeur de la Montagne", desc: "Rapportez un cristal du noyau du volcan dormant. Attention: il se reveille.", reward: "Arme legendaire", level: "8-12" }
        ]
    },
    {
        name: "Mere Thessaly",
        role: "Grande Pretresse du Temple de l'Aube",
        region: "Val Dore",
        race: "Humaine",
        age: "68 ans",
        personality: "Compatissante mais ferme. Croit en la redemption. Refuse de condamner sans comprendre.",
        appearance: "Femme agee aux yeux d'un bleu celeste, cheveux blancs sous un voile dore, mains ridees mais fermes.",
        greeting: "Mon enfant. Que votre lumiere vous guide jusqu'a moi. Comment puis-je eclairer votre chemin?",
        secret: "Elle a commis un meurtre dans sa jeunesse pour proteger son frere. Elle expie chaque jour depuis 45 ans.",
        quests: [
            { title: "Les Ames Errantes", desc: "Le cimetiere est hante. Liberez les esprits qui ne trouvent pas le repos.", reward: "Benediction + 80 Or", level: "3-5" },
            { title: "Le Sanctuaire Profane", desc: "Des cultistes ont souille notre ancien temple au nord. Purifiez-le.", reward: "Relique sainte + 250 Or", level: "6-9" }
        ]
    }
];

// ============================================================================
// VAGABONDS ET VOYAGEURS
// ============================================================================
export const WANDERERS: NPC[] = [
    {
        name: "Le Prophete Sans Nom",
        role: "Ermite mystique",
        region: "Terres Brulees",
        race: "Inconnu (peut-etre plus humain)",
        age: "???",
        personality: "Cryptique, visionnaire, effrayant. Dit des verites que personne ne veut entendre. Jamais menaçant.",
        appearance: "Enveloppe dans des bandages noircis, yeux blancs sans pupilles, voix rauque comme le vent du desert.",
        greeting: "Vous etes venu chercher des reponses. Mais etes-vous pret pour les questions qu'elles ameneront?",
        secret: "Il a vu la fin du monde. Pas une fois. Plusieurs fois. Il essaie d'en empecher la prochaine.",
        knowledge: ["Emplacement d'un fragment du Maillon d'Or", "Vraie identite du Maitre des Braises", "Moyen de contacter les Primordiaux"],
        motivations: ["Empecher l'apocalypse", "Transmettre la verite", "Trouver la paix finale"],
        dialogue_samples: [
            "Le feu viendra. Pas celui des torches. Celui qui brule les ames.",
            "Vous mourrez... mais pas aujourd'hui. Pas de cette mort.",
            "Trois questions, trois verites. Mais chaque verite a un prix. Payez-vous en regrets ou en sang?"
        ]
    },
    {
        name: "Zara la Rouge",
        role: "Mercenaire independante",
        region: "Itinerante",
        race: "Humaine",
        age: "29 ans",
        personality: "Sarcastique, loyale une fois payee. Code d'honneur strict. Ne tue pas d'enfants ni de non-combattants.",
        appearance: "Cheveux rouges vif comme le feu, armure de cuir cloute usee mais entretenue, deux cimeterres croises dans le dos.",
        greeting: "Or et ennemi. Si vous avez les deux, on discute. Sinon, vous perdez mon temps, et mon temps vaut cher.",
        secret: "Elle cherche l'homme qui a massacre son village. Elle a un nom, une cicatrice, rien d'autre.",
        hire_cost: "10 Or/jour + part du butin",
        motivations: ["Vengeance", "Honorer son code", "Amasser assez pour disparaitre"],
        dialogue_samples: [
            "Mon prix? Negoce pas. Je baisse pas, tu montes pas. C'est une offre, pas une discussion.",
            "J'ai tue 47 hommes. Chacun le meritait. Le 48eme sera celui que je cherche.",
            "Loyaute, ca se paie. Une fois payee, je meurs avant de trahir. C'est dans le contrat."
        ]
    },
    {
        name: "Pippin Malchance",
        role: "Barde itinerant",
        region: "Partout ou il y a un public",
        race: "Halfelin",
        age: "34 ans",
        personality: "Optimiste malgre tout, malchanceux de façon comique, talent musical reel. Les ennuis le suivent.",
        appearance: "Petit halfelin aux cheveux bruns en bataille, luth fissure mais melodieux, vetements colores mais rapiecés.",
        greeting: "Oh merveilleux! Un public! Attendez que je... *trebuche* ...que je me releve et je vous chante l'histoire la plus tragiquement drole que vous ayez jamais entendue!",
        secret: "Sa malchance est en fait une malediction d'un sorcier dont il a seduit la fille. La malediction protege aussi de la mort.",
        motivations: ["Lever sa malediction", "Ecrire la chanson parfaite", "Trouver l'amour (encore)"],
        quirks: ["Tombe toujours au pire moment", "Ses chansons deviennent vraies parfois", "Allergique aux chats (il en croise partout)"],
        dialogue_samples: [
            "Cette cicatrice? Un dragon. Celle-la? Un escalier. Devinez laquelle a fait le plus mal.",
            "J'ai compose une ballade pour une princesse une fois. Elle m'a fait jeter aux oubliettes. Mais elle a fredonne l'air en le faisant!",
            "Ma mere disait: 'Pippin, tu attires les ennuis.' Elle avait tort. Les ennuis m'ADORENT."
        ]
    },
    {
        name: "Grimshaw le Collecteur",
        role: "Chasseur de primes et recuperateur",
        region: "Partout ou il y a une prime",
        race: "Demi-orque",
        age: "38 ans",
        personality: "Professionnel, laconique, etonnamment cultive. Lit de la poesie entre deux contrats.",
        appearance: "Demi-orque imposant, machoire inferieure avec petites defenses, armure de plaques noire, carnet de notes toujours sur lui.",
        greeting: "Vous n'etes pas sur ma liste. Bien. J'aimerais que ca reste ainsi. Que voulez-vous?",
        secret: "Il ecrit de la poesie sous un pseudonyme. Ses oeuvres sont celebres dans les cercles litteraires de Sol-Aureus.",
        motivations: ["Payer ses dettes de sang", "Publier son recueil de poemes", "Prouver qu'un orque peut etre plus qu'un monstre"],
        dialogue_samples: [
            "Ma proie est un homme. Il a une famille. Je lui laisserai dire adieu. C'est plus que ce qu'il a laisse a ses victimes.",
            "'La mort est un poeme sans rime, une chanson sans fin.' C'est de moi. Non, je plaisante. C'est de Valorian.",
            "Vous me jugez sur mes crocs. Je vous juge sur vos actes. Un de nous deux a raison."
        ]
    },
    {
        name: "Soeur Petale",
        role: "Pelerine mendiante",
        region: "Routes et chemins",
        race: "Humaine",
        age: "23 ans (parait 40)",
        personality: "Humble, sage au-dela de son age, silencieusement observatrice. Parle peu mais chaque mot compte.",
        appearance: "Robe de bure rapiecee, pieds nus meme en hiver, visage prematurement vieilli, yeux d'une profondeur troublante.",
        greeting: "*incline la tete en silence, tend un bol vide, puis sourit avec une bonte infinie*",
        secret: "Elle a ete ressuscitee d'entre les morts. Ce qu'elle a vu de l'autre cote l'a changee. Elle cherche les ames perdues.",
        motivations: ["Guider les ames vers la paix", "Comprendre pourquoi elle est revenue", "Aider sans attendre de retour"],
        quirks: ["Ne mange qu'une fois par jour", "Les animaux viennent vers elle spontanement", "Ne possede rien qu'elle ne puisse donner"],
        dialogue_samples: [
            "*touche votre main* Votre ame est lourde. Ce n'est pas un fardeau que vous devez porter seul.",
            "J'ai vu la mort. Elle n'est pas la fin. C'est... une porte. Certains la traversent, d'autres reviennent.",
            "Une piece pour manger? Non. Gardez-la. Quelqu'un en aura plus besoin que moi aujourd'hui. Vous le saurez."
        ]
    }
];

// ============================================================================
// NOBLES ET POLITICIENS
// ============================================================================
export const NOBLES: NPC[] = [
    {
        name: "Duc Aldren Valcourt",
        role: "Duc des Terres de l'Ouest",
        region: "Val Dore",
        race: "Humain",
        age: "52 ans",
        personality: "Pragmatique, froid, mais pas cruel. Voit les gens comme des pieces sur un echiquier. Respecte la competence.",
        appearance: "Cheveux gris acier, barbe taillee avec precision, vetements sobres mais d'un cout obscene, bague familiale imposante.",
        greeting: "Votre reputation vous precede. Ou votre absence de reputation, selon le cas. Parlez vite, mon temps est precieux.",
        secret: "Il finance secretement les deux camps du conflit politique pour en tirer profit quelle que soit l'issue.",
        motivations: ["Accroitre son pouvoir", "Proteger sa lignee", "Survivre au jeu politique"],
        dialogue_samples: [
            "La morale est un luxe des pauvres. Les riches ont des interets.",
            "Je pourrais vous faire executer. Je pourrais aussi vous enrichir. La difference? Ce que vous m'apportez.",
            "Mon pere disait: 'La loyaute s'achete, la trahison aussi. Connais le prix des deux.'"
        ]
    },
    {
        name: "Comtesse Isolde Ravenswood",
        role: "Mecene des arts et conspiratrice",
        region: "Sol-Aureus",
        race: "Humaine",
        age: "44 ans",
        personality: "Charismatique, cultivee, dangereusement intelligente. Collecte les secrets comme d'autres collectent l'art.",
        appearance: "Elegance devastatrice, cheveux auburn, robes changeantes selon l'occasion, eventail cache une lame.",
        greeting: "Oh, mais vous etes FASCINANT. Asseyez-vous, prenez du vin, et racontez-moi tout sur... vous.",
        secret: "Elle dirige un reseau d'espionnage qui vend des informations au plus offrant. Meme le roi est un client.",
        motivations: ["L'information est le pouvoir", "Ne jamais etre surprise", "Venger son mari assassine (par elle-meme)"],
        dialogue_samples: [
            "Les secrets sont la seule vraie monnaie. L'or s'epuise. Les secrets... se multiplient.",
            "Je sais des choses sur vous. Non, ne paniquez pas. Tout le monde a des secrets. Je les respecte.",
            "Mon cher mari est mort il y a cinq ans. Tragique. *sourire* Vraiment, vraiment tragique."
        ]
    },
    {
        name: "Prince Dorian Lumenis",
        role: "Heritier dechu du trone de l'Est",
        region: "Exile, souvent Sol-Aureus",
        race: "Humain",
        age: "27 ans",
        personality: "Charmant, amer, alcoolique. Ancien heros maintenant brise. Eclairs de grandeur entre les bouteilles.",
        appearance: "Beaute fanee, vetements autrefois royaux maintenant fripes, yeux bleu royal voiles par l'alcool, cicatrice au front.",
        greeting: "*leve son verre* A l'heroisme. Il ne sert a rien si on survit assez longtemps pour voir le resultat.",
        secret: "Il n'a pas fui son royaume - il a ete exile car il a decouvert que son pere avait empoisonne sa mere.",
        motivations: ["Noyer sa douleur", "Retrouver son honneur", "Reprendre son trone (peut-etre)"],
        dialogue_samples: [
            "Prince? Ancien prince. Maintenant juste un homme avec un titre inutile et une soif immense.",
            "J'ai sauve mon royaume une fois. Ils m'ont remercie en me bannissant. C'est comique, non?",
            "Vous voulez un conseil royal? Ne soyez jamais assez honnete pour decouvrir les secrets de votre famille."
        ]
    }
];

// ============================================================================
// CRIMINELS ET HORS-LA-LOI
// ============================================================================
export const CRIMINALS: NPC[] = [
    {
        name: "Vipere",
        role: "Chef de la Guilde des Voleurs de Hammerdeep",
        region: "Hammerdeep",
        race: "Humain (probablement)",
        age: "Inconnu",
        personality: "Paranoiaque, juste selon son propre code, protecteur de ses gens. Ne pardonne jamais une trahison.",
        appearance: "Jamais vu sans masque. Voix deformee. Vetements qui changent. Peut-etre un homme, peut-etre une femme.",
        greeting: "Vous connaissez mon nom. C'est soit bon, soit tres mauvais pour vous. On va voir lequel.",
        secret: "C'est en fait un noble de haute lignee qui dirige les voleurs la nuit et le Parlement le jour.",
        motivations: ["Proteger sa double vie", "Controler les criminels pour limiter le chaos", "Venger une injustice ancienne"],
        dialogue_samples: [
            "La loi est pour ceux qui peuvent se la payer. Nous sommes la justice des autres.",
            "Trahir la Guilde? Un seul a essaye. On l'a retrouve... partout.",
            "Je ne vole pas les pauvres. Quel interet? Les riches ont assez pour partager. On les aide."
        ]
    },
    {
        name: "Marna la Douce",
        role: "Reine des receleurs",
        region: "Val Dore",
        race: "Halfeline",
        age: "48 ans",
        personality: "Grand-mere adorable en surface, calculatrice impitoyable en dessous. Adore les sucreries et les profits.",
        appearance: "Petite halfeline ronde, toujours en train de tricoter, maison qui sent les biscuits, yeux qui voient tout.",
        greeting: "Oh, des visiteurs! Asseyez-vous, prenez un gateau, et montrez-moi ce que vous avez a vendre, mes cheris.",
        secret: "Elle a tue son mari il y a 30 ans quand il a voulu arreter. Elle en parle avec nostalgie.",
        motivations: ["L'argent", "La tranquillite", "Choyer ses petits-enfants voleurs"],
        dialogue_samples: [
            "Ce bijou? 20 pieces. Non, ne discutez pas, je sais d'ou il vient. 20 ou vous partez.",
            "Mon mari? Oh, il est mort. Paisiblement. Dans son sommeil. *sourire* Je m'en suis assuree.",
            "Un biscuit? Recipe de ma mere. Le secret c'est beaucoup de beurre. Et l'absence de temoins."
        ]
    },
    {
        name: "Corbeau Rouge",
        role: "Assassin legendaire",
        region: "Inconnu",
        race: "Elfe noir (?)",
        age: "Inconnu",
        personality: "Professionnel a l'extreme, code d'honneur strict, philosophe de la mort. Ne tue jamais sans raison.",
        appearance: "Ombre plus qu'un corps, masque de corbeau rouge, silence absolu, yeux qui brillent dans le noir.",
        greeting: "Vous me voyez. C'est soit que je le veux, soit que vous allez mourir. Dans ce cas, c'est le premier.",
        secret: "Il etait un paladin de l'ordre divin. Un dieu l'a trahi. Maintenant il tue ceux que les dieux protegent.",
        motivations: ["Punir les dieux a travers leurs champions", "Trouver un adversaire digne", "Peut-etre la redemption"],
        dialogue_samples: [
            "La mort n'est pas une punition. C'est une liberation. Je suis genereux.",
            "On m'a demande de vous tuer. J'ai decline. Vous n'etiez pas assez interessant.",
            "Un dieu m'a pris tout. Je lui prends ses fideles, un par un. C'est juste."
        ]
    }
];

// ============================================================================
// ARTISANS ET GENS DU PEUPLE
// ============================================================================
export const COMMONERS: NPC[] = [
    {
        name: "Tomas le Meunier",
        role: "Meunier du village",
        region: "Val Dore",
        race: "Humain",
        age: "45 ans",
        personality: "Simple, honnete, protecteur de son village. Cache une colere sourde contre les nobles.",
        appearance: "Homme trapu couvert de farine, mains calleuses, sourire franc, muscles d'un travailleur.",
        greeting: "Bonjour, voyageur. Besoin de farine? D'un repas? D'un endroit pour dormir? On a tout ca.",
        secret: "Il cache des refugies recherches par le Seigneur local dans les souterrains de son moulin.",
        dialogue_samples: [
            "Le Seigneur? Il prend la moitie de ce qu'on produit. On survit avec l'autre moitie. A peine.",
            "Mon moulin tourne depuis 200 ans. Mon arriere-grand-pere l'a construit. Je le leguerai a mon fils.",
            "Y'a des etrangers qui passent parfois. Je pose pas de questions. Ils posent pas de questions."
        ]
    },
    {
        name: "Elara Mainpreste",
        role: "Guerisseuse de village",
        region: "Sylve d'Emeraude",
        race: "Humaine",
        age: "35 ans",
        personality: "Devouee, fatiguee, competente. N'a pas dormi une nuit complete depuis des annees.",
        appearance: "Femme mince aux cernes profondes, mains douces mais fermes, toujours une sacoche d'herbes.",
        greeting: "Blessure? Maladie? Malédiction? *soupir* Montrez-moi, et pour l'amour des dieux, dites-moi la verite.",
        secret: "Elle soigne aussi les bannis et les creatures de la foret. Le village ne sait pas.",
        dialogue_samples: [
            "Je ne suis pas mage. Juste quelqu'un qui connait les plantes et n'a pas peur du sang.",
            "Le pretre dit que je fais l'oeuvre des dieux. Moi je dis que les dieux pourraient aider un peu.",
            "Dormir? *rit amerement* Les bebes naissent la nuit. Les fievres aussi. Je dormirai quand je serai morte."
        ]
    },
    {
        name: "Gaspard Rouleloin",
        role: "Charretier et messager",
        region: "Routes du royaume",
        race: "Humain",
        age: "58 ans",
        personality: "Bavard infatigable, connait toutes les routes, memoire des potins impressionnante.",
        appearance: "Vieil homme sec, chapeau deforme, charrette brinquebalante tiree par Rosette, sa jument fidele.",
        greeting: "Oh oh! Des passagers? Montez, montez! La route est longue et j'ai des histoires a raconter!",
        secret: "Il transporte secretement des messages codes pour la resistance dans les roues de sa charrette.",
        dialogue_samples: [
            "Cette route? Elle m'a vu passer 3000 fois. Elle me reconnait, j'vous jure.",
            "Le Duc? *crache* Ses taxes ont tue mon frere. Mais j'dis rien. J'suis qu'un vieux charretier, pas vrai?",
            "Rosette et moi, on voyage ensemble depuis 20 ans. Elle est plus fiable que ma femme. Dites pas que j'ai dit ca."
        ]
    }
];

// ============================================================================
// CREATURES INTELLIGENTES ET ETRES SURNATURELS
// ============================================================================
export const SUPERNATURAL: NPC[] = [
    {
        name: "Murmure",
        role: "Fantome du vieux chateau",
        region: "Ruines de Valdren",
        race: "Esprit",
        age: "Mort il y a 400 ans",
        personality: "Melancolique, cryptique, solitaire. Cherche quelqu'un qui ecoutera son histoire avant de pouvoir partir.",
        appearance: "Silhouette translucide d'une jeune femme, robe d'epoque, visage triste mais beau, pleure des larmes de lumiere.",
        greeting: "*apparait doucement* Vous me voyez. C'est... rare. Les autres passent a travers moi. Littéralement.",
        secret: "Elle n'est pas morte de maladie comme le disent les chroniques. Elle a ete assassinee par son fiance.",
        motivations: ["Que la verite soit connue", "Trouver le repos", "Proteger le chateau de ceux qui l'ont tuee"],
        dialogue_samples: [
            "400 ans. Savez-vous ce que c'est d'attendre 400 ans que quelqu'un vous ecoute?",
            "Mon fiance m'aimait. Ou je le croyais. L'amour et le poison ont le meme gout dans le vin.",
            "Je ne peux pas partir. Pas tant que mon histoire meurt avec moi. Ecoutez-vous?"
        ]
    },
    {
        name: "Krolk le Penseur",
        role: "Troll philosophe",
        region: "Pont du Desespoir",
        race: "Troll",
        age: "243 ans",
        personality: "Etonnamment intelligent, pose des enigmes, vegetarien, refuse de manger les voyageurs pensants.",
        appearance: "Troll massif mais pose, lunettes artisanales, livre toujours a portee, jardin de champignons sous son pont.",
        greeting: "Arretez. Avant de traverser, une question: qu'est-ce qui est plus lourd, un kilo de plumes ou un kilo de culpabilite?",
        secret: "Il etait un erudit humain transforme par un sorcier. Il a trouve la paix dans cette forme.",
        motivations: ["Apprendre", "Dialoguer", "Prouver que les trolls peuvent penser"],
        dialogue_samples: [
            "Manger les voyageurs? Barbare. Je prefere les champignons. Moins de remords, meilleur gout.",
            "Mon cousin mange des chevaliers. Moi je lis Platon. Qui est le monstre vraiment?",
            "Une enigme pour passer? Non, une CONVERSATION. L'enigme c'est pour les trolls stupides."
        ]
    },
    {
        name: "La Dame du Lac Argent",
        role: "Esprit aquatique ancien",
        region: "Lac Argent",
        race: "Esprit elementaire",
        age: "Aussi vieux que le lac",
        personality: "Sereine, sage, capricieuse parfois. Aide ceux qu'elle juge dignes, noie les autres.",
        appearance: "Femme d'eau liquide, traits changeants mais toujours beaux, yeux de saphir, voix comme une cascade.",
        greeting: "*emerge lentement* Vous troublez mes eaux. Interessant. Les mortels osent rarement me deranger.",
        secret: "Elle garde au fond du lac l'epee d'un roi antique. Elle attend le digne successeur.",
        motivations: ["Proteger le lac", "Trouver le digne heritier de l'epee", "Punir les pollueurs"],
        dialogue_samples: [
            "Le temps passe differemment dans les profondeurs. Votre 'urgence' m'amuse.",
            "Des heros m'ont demande l'epee. Ils dorment maintenant. Au fond. Avec les poissons.",
            "Vous semblez... presque digne. Revenez quand vous aurez fait une action vraiment pure."
        ]
    },
    {
        name: "Vex",
        role: "Diablotin contractuel",
        region: "Invoque partout",
        race: "Diablotin",
        age: "3000 ans (parait eternellement 12 ans)",
        personality: "Irritant, sarcastique, honnete (obligatoirement), adore les clauses cachees.",
        appearance: "Petit diablotin rouge, toujours en costume de notaire, lunettes, plume et contrat en main, queue agitee.",
        greeting: "Un client! Enfin! Vous savez combien c'est ENNUYEUX l'enfer? Qu'est-ce que vous voulez vendre?",
        secret: "Il cherche secretement un contrat qui le libererait de son service demoniaque.",
        motivations: ["Collecter des ames (c'est son travail)", "Trouver une echappatoire", "S'amuser aux depens des mortels"],
        dialogue_samples: [
            "Votre ame? Bof, standard. Offrez-moi quelque chose d'original. Votre sens du gout peut-etre?",
            "Lire avant de signer? ENFIN quelqu'un d'intelligent! Ca ruine tout le plaisir mais bravo.",
            "Je DOIS dire la verite. C'est dans mon contrat. Donc oui, ce deal est mauvais pour vous. Mais vous allez signer quand meme?"
        ]
    }
];

// ============================================================================
// ENFANTS ET ORPHELINS
// ============================================================================
export const CHILDREN: NPC[] = [
    {
        name: "Petit Theo",
        role: "Gamin des rues",
        region: "Hammerdeep",
        race: "Humain",
        age: "10 ans",
        personality: "Malin, debrouillard, coeur d'or cache sous une carapace. Chef d'une bande d'orphelins.",
        appearance: "Petit, crasseux, yeux vifs, habits trop grands, sourire espiegle.",
        greeting: "Hey! Vous avez l'air perdus. 5 pieces et j'vous guide. 10 et j'vous protege. Des moi.",
        secret: "Il sait ou se cache l'entree secrete du tresor de la Guilde. Il attend le bon moment.",
        dialogue_samples: [
            "Parents? Morts. Ou partis. C'est pareil quand t'as faim.",
            "Mes gars? On est six. On partage tout. C'est la regle. Meme les coups.",
            "Je sais des choses. Cette ruelle? Dangereuse apres minuit. Celle-la? Sûre. 2 pieces l'info."
        ]
    },
    {
        name: "Lily Fleur-de-Cendres",
        role: "Orpheline mysterieuse",
        region: "Terres Brulees (en fuite)",
        race: "Humaine (?)",
        age: "8 ans",
        personality: "Silencieuse, etrange, voit des choses que les autres ne voient pas. Innocente mais inquietante.",
        appearance: "Petite fille pale, cheveux blancs anormaux, yeux trop grands et trop sages, peluche usee.",
        greeting: "*vous regarde fixement* Le monsieur derriere vous dit de pas vous approcher. Mais il est mechant.",
        secret: "Elle est nee pendant un rituel rate. Elle voit les morts et ils la suivent.",
        dialogue_samples: [
            "Ma maman est la-bas. *pointe le vide* Elle dit qu'elle est desolee.",
            "Vous allez mourir. Mais pas aujourd'hui. Le monsieur gris l'a dit. Il sait ces choses.",
            "J'aime pas dormir. Les morts parlent trop fort la nuit."
        ]
    }
];

// ============================================================================
// EXPORT GLOBAL
// ============================================================================
export const NPC_TEMPLATES = {
    merchants: MERCHANTS,
    tavernkeepers: TAVERNKEEPERS,
    quest_givers: QUEST_GIVERS,
    wanderers: WANDERERS,
    nobles: NOBLES,
    criminals: CRIMINALS,
    commoners: COMMONERS,
    supernatural: SUPERNATURAL,
    children: CHILDREN
};

// Helper pour obtenir un PNJ aleatoire d'une categorie
export const getRandomNPC = (category: keyof typeof NPC_TEMPLATES): NPC => {
    const list = NPC_TEMPLATES[category];
    return list[Math.floor(Math.random() * list.length)];
};

// Helper pour obtenir un PNJ par region
export const getNPCsByRegion = (region: string): NPC[] => {
    const allNPCs = [
        ...MERCHANTS, ...TAVERNKEEPERS, ...QUEST_GIVERS,
        ...WANDERERS, ...NOBLES, ...CRIMINALS,
        ...COMMONERS, ...SUPERNATURAL, ...CHILDREN
    ];
    return allNPCs.filter(npc => 
        npc.region.toLowerCase().includes(region.toLowerCase()) ||
        npc.region === "Partout" ||
        npc.region.includes("Itinerant")
    );
};

// Helper pour chercher un PNJ par nom
export const findNPCByName = (name: string): NPC | undefined => {
    const allNPCs = [
        ...MERCHANTS, ...TAVERNKEEPERS, ...QUEST_GIVERS,
        ...WANDERERS, ...NOBLES, ...CRIMINALS,
        ...COMMONERS, ...SUPERNATURAL, ...CHILDREN
    ];
    return allNPCs.find(npc => 
        npc.name.toLowerCase().includes(name.toLowerCase())
    );
};
