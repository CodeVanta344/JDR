import { MechanicalTrait } from './backstories';

export interface LifePathOption {
    id: string;
    label: string;
    desc: string;
    lore: string;
    mechanical_traits: MechanicalTrait[];
    stats?: Partial<{ str: number; dex: number; con: number; int: number; wis: number; cha: number }>;
    img?: string;
    // Extreme Detailing Fields
    social_impacts?: {
        pnj_reactions: string; // Describe how NPCs feel (e.g. "Les gardes vous surveillent, les mendiants vous ignorent")
        reputation_bonus?: Record<string, number>;
    };
    gm_hooks?: string; // Narrative hook for the MJ
    personal_secrets?: string; // Secret known to player/MJ
    roleplay_hooks?: string[]; // Tips for the player
}

export interface BirthOrigin extends LifePathOption {
    starting_items?: string[];
}

export interface ChildhoodEvent extends LifePathOption {
    reputation_impact?: Record<string, number>;
}

export interface AdolescencePath extends LifePathOption {
    skill_bonus?: string[];
}

export const BIRTH_ORIGINS: BirthOrigin[] = [
    {
        id: "noble_cradle",
        label: "Berceau de Sang Pur",
        desc: "Né dans le luxe de la haute noblesse de Sol-Aureus.",
        lore: "Vous avez poussé votre premier cri dans une chambre de soie, bercé par les chants des bardes de cour. Chaque désir était un ordre, chaque caprice une directive. Mais les murs d'or sont aussi des prisons.",
        stats: { cha: 2, int: 1 },
        mechanical_traits: [
            { name: "Étiquette Royale", type: "bonus", desc: "Avantage sur les jets de diplomatie avec la noblesse." },
            { name: "Fragilité Privilégiée", type: "penalty", desc: "-1 en jet de sauvegarde de Constitution." }
        ],
        social_impacts: {
            pnj_reactions: "Les nobles vous accueillent comme l'un des leurs (+2 Diplomatie), mais le peuple vous regarde avec dédain ou crainte (-2 Intimidation). Les marchands tentent de vous surcharger, pensant que vous ne comptez pas vos pièces.",
            reputation_bonus: { "Noblesse": 15, "Basse-Fosse": -10, "Guilde des Marchands": -5 }
        },
        gm_hooks: "Le personnage a une dette de sang ou une promesse de mariage oubliée qui resurgira. Sa famille possède un domaine aujourd'hui hanté ou occupé par des rebelles.",
        personal_secrets: "Votre famille cache une ascendance illégitime qui pourrait vous coûter votre titre. Vous avez secrètement aidé un fugitif par simple ennui royal.",
        roleplay_hooks: [
            "Refusez systématiquement de dormir dans une auberge de bas étage.",
            "Utilisez toujours votre titre complet lors des présentations officielles.",
            "Exprimez votre surprise devant le prix 'dérisoire' d'objets du quotidien."
        ],
        starting_items: ["Bourse de soie", "Bague frappée d'un sceau"],
        img: "https://images.unsplash.com/photo-1615527333425-296884601443?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "street_gutter",
        label: "Rive du Caniveau",
        desc: "Né dans la boue et le tumulte des bas-fonds.",
        lore: "Le froid de la pierre et l'odeur du fer rouillé sont vos premiers souvenirs. Vous n'aviez rien, alors vous avez appris à prendre. La ville ne vous a pas accueilli, elle vous a défié de survivre.",
        stats: { dex: 2, con: 1 },
        mechanical_traits: [
            { name: "Instinct de Rat", type: "bonus", desc: "+2 en Initiative dans les zones urbaines." },
            { name: "Méli-mélo Social", type: "penalty", desc: "Désavantage sur les tests de charisme contre la classe moyenne/haute." }
        ],
        social_impacts: {
            pnj_reactions: "Les criminels et mendiants vous font confiance (+2 Psychologie), la garde urbaine vous suit systématiquement du regard (-2 Discrétion en ville). Les taverniers vous demandent de payer d'avance.",
            reputation_bonus: { "Bas-fonds": 20, "Garde Royale": -15, "Clergé": -5 }
        },
        gm_hooks: "Le personnage connaît l'entrée d'un réseau de tunnels secrets sous la ville principale. Il doit une faveur à un parrain de la pègre locale.",
        personal_secrets: "Vous avez volé un objet sans importance apparente qui se révèle être une clé de coffre-fort national. Vous avez accidentellement causé l'arrestation d'un mentor pour sauver votre peau.",
        roleplay_hooks: [
            "Vérifiez toujours vos poches quand vous croisez un étranger.",
            "Instinctivement, asseyez-vous dos au mur dans les tavernes.",
            "Cachez toujours un peu de nourriture sur vous 'au cas où'."
        ],
        img: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "hidden_grove",
        label: "Bosquet de l'Éveil",
        desc: "Né sous la bénédiction d'un Arbre-Monde junior dans la Sylve.",
        lore: "La forêt a chanté pour votre naissance. Les dryades disent que vous avez une lueur de sève dans les yeux. Vous parlez le langage du vent avant celui des hommes.",
        stats: { wis: 2, dex: 1 },
        mechanical_traits: [
            { name: "Communion Sylvestre", type: "bonus", desc: "Vous pouvez ressentir la présence d'esprits naturels à 30m." },
            { name: "Incompréhension Urbaine", type: "penalty", desc: "Désavantage sur les jets d'histoire ou de politique humaine." }
        ],
        social_impacts: {
            pnj_reactions: "Les animaux et esprits naturels ne vous attaquent qu'en cas de légitime défense. Les citadins vous trouvent étrange et imprévisible. Les druides vous voient comme un prodige ou un fardeau.",
            reputation_bonus: { "Peuple Elfe": 10, "Guilde des Marchands": -5, "Cercle Druidique": 15 }
        },
        gm_hooks: "Le personnage porte en lui une graine d'Arbre-Monde qui réagit à la corruption arcanique. La forêt l'a envoyé chercher une 'mélodie perdue'.",
        personal_secrets: "Vous avez passé un pacte avec une dryade pour protéger un lieu qui n'existe plus. Vous avez déjà consommé un fruit défendu qui vous permet de voir les auras de mort.",
        roleplay_hooks: [
            "Parlez aux plantes comme si elles pouvaient répondre (et peut-être le font-elles).",
            "Sentez-vous visiblement mal à l'aise dans les grandes cités de pierre.",
            "Évitez de brûler du bois si ce n'est pas strictement vital."
        ],
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "arcane_lab",
        label: "Forge du Vide",
        desc: "Né dans le sanctuaire stérile d'un laboratoire d'expérimentation arcanique.",
        lore: "Votre premier souffle a été teinté d'ozone et d'énergie résiduelle. Vous n'êtes peut-être pas né de parents, mais de formules. Votre sang brille d'une lueur bleutée sous la lune.",
        stats: { int: 2, con: 1 },
        mechanical_traits: [
            { name: "Résonance Arcanique", type: "bonus", desc: "+2 aux jets pour identifier les objets magiques." },
            { name: "Ancre Instable", type: "penalty", desc: "-2 aux jets de sauvegarde contre les effets de bannissement." }
        ],
        social_impacts: {
            pnj_reactions: "Les mages sont fascinés par votre physiologie (+2 Savoir Arcanique). Les religieux vous voient comme une abomination (+2 Difficulté avec le Clergé).",
            reputation_bonus: { "Académie de Magie": 15, "Inquisition": -20 }
        },
        gm_hooks: "Votre 'créateur' vous recherche pour une 'mise à jour'. Votre corps contient une information codée cruciale pour le Grand Sort.",
        personal_secrets: "Vous entendez parfois la voix du Vide vous murmurer des vérités mathématiques effrayantes.",
        roleplay_hooks: [
            "Analysez tout sous un angle logique et froid.",
            "Portez des gants pour cacher vos veines lumineuses.",
            "Fasciné par les émotions humaines simples que vous ne comprenez pas tout à fait."
        ]
    }
];

export const CHILDHOOD_EVENTS: ChildhoodEvent[] = [
    {
        id: "the_great_fire",
        label: "La Grande Embrasade",
        desc: "Votre quartier a été réduit en cendres lors d'un incendie arcanique.",
        lore: "Le ciel était orange. Les cris étaient étouffés par le rugissement des flammes qui ne s'éteignaient pas à l'eau. Vous avez sauvé ce que vous pouviez, mais l'odeur de fumée ne vous quitte jamais.",
        stats: { con: 1 },
        mechanical_traits: [
            { name: "Cœur de Braise", type: "bonus", desc: "Résistance mineure au feu (2 dégâts absorbés)." },
            { name: "Phobie des Flammes", type: "penalty", desc: "Si vous subissez plus de 10 dégâts de feu, vous êtes effrayé pendant 1 tour." }
        ],
        social_impacts: {
            pnj_reactions: "Les autres survivants du feu vous reconnaissent à votre odeur ou vos cicatrices (+2 Persuasion avec eux). Les pompiers et miliciens locaux vous respectent.",
            reputation_bonus: { "Communauté des Réfugiés": 15, "Ordre du Calice": 5 }
        },
        gm_hooks: "L'incendie n'était pas un accident, mais une expérience ratée d'un mage encore en activité qui cherche à éliminer les témoins.",
        personal_secrets: "C'est votre maladresse avec un artefact trouvé qui a déclenché l'étincelle initiale. Vous avez laissé quelqu'un derrière vous pour sauver une poupée ou un livre.",
        roleplay_hooks: [
            "Éteignez toujours les bougies avant de quitter une pièce.",
            "Paniquez légèrement si vous êtes enfermé dans un endroit étroit sans issue visible.",
            "Possédez une petite cicatrice que vous frottez en cas de stress."
        ],
        img: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "mentored_by_sage",
        label: "L'Ombre du Maître",
        desc: "Un vieux sage ou artisan vous a pris sous son aile.",
        lore: "Pendant que les autres jouaient, vous nettoyiez des parchemins ou triiez des minerais. La discipline était dure, mais la connaissance était votre récompense.",
        stats: { int: 2 },
        mechanical_traits: [
            { name: "Esprit Analytique", type: "bonus", desc: "+2 aux jets d'investigation." },
            { name: "Manque d'Audace", type: "penalty", desc: "-2 aux jets d'athlétisme." }
        ],
        social_impacts: {
            pnj_reactions: "Les érudits et bibliothécaires vous considèrent comme un pair potentiel (+2 Connaissances). Les enfants de votre âge vous trouvaient ennuyeux.",
            reputation_bonus: { "Académie de Magie": 10, "Guilde des Artisans": 10 }
        },
        gm_hooks: "Le Maître a disparu en vous laissant un livre codé que vous n'avez jamais réussi à ouvrir. Il était traqué par une entité planaire.",
        personal_secrets: "Vous avez lu une page interdite qui a brûlé vos rétines... et votre âme. Vous savez où le Maître a caché son trésor le plus dangereux.",
        roleplay_hooks: [
            "Corrigez les fautes de syntaxe de vos compagnons.",
            "Prenez des notes compulsives sur chaque nouvelle créature croisée.",
            "Citez souvent des proverbes obscurs de votre Maître."
        ],
        img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "stolen_by_faeries",
        label: "Enlèvement Féérique",
        desc: "Vous avez disparu pendant 'une nuit' qui a duré trois ans dans le Voile.",
        lore: "Vous vous souvenez de lumières dansantes et de rires cruels. Quand vous êtes revenu, vous étiez plus grand, et le monde semblait... fade, gris, et trop lourd.",
        stats: { cha: 1, wis: 1 },
        mechanical_traits: [
            { name: "Touche Astrale", type: "bonus", desc: "Une fois par jour, vous pouvez devenir invisible pendant 1 round (action bonus)." },
            { name: "Esprit Éthéré", type: "penalty", desc: "-2 en jet de sauvegarde contre le charme (vous voulez y retourner)." }
        ],
        social_impacts: {
            pnj_reactions: "Les êtres magiques ressentent une aura familière autour de vous. Les prêtres vous regardent avec suspicion (peur de la 'possession'). Les enfants vous adorent car vous racontez des histoires impossibles.",
            reputation_bonus: { "Peuple Féerique": 20, "Inquisition": -10, "Cercle des Bardes": 10 }
        },
        gm_hooks: "Vous avez 'oublié' le nom de votre ravisseur, mais lui ne vous a pas oublié. Vous possédez une marque invisible qui brille près des portails féeriques.",
        personal_secrets: "Vous n'êtes pas revenu seul ; un esprit farceur vit dans votre ombre. Vous avez mangé à la table de la Reine d'Été, ce qui vous lie à elle à jamais.",
        roleplay_hooks: [
            "Distrayez-vous facilement par des objets brillants ou colorés.",
            "Avez parfois des conversations avec des personnes invisibles.",
            "Trouvez les lois humaines absurdes par rapport à celles du Voile."
        ],
        img: "https://images.unsplash.com/photo-1528114039593-4366cc08227d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "sold_to_gladiators",
        label: "Sueur et Sable",
        desc: "Vendu comme esclavage-combattant dans les arènes de Kha-Zul.",
        lore: "Le fouet était votre berceuse, le sang votre peinture. Vous avez survécu là où des hommes deux fois plus grands ont péri. Vous regardez le monde comme une série d'angles d'attaque.",
        stats: { str: 1, con: 1 },
        mechanical_traits: [
            { name: "Regard de Tueur", type: "bonus", desc: "+2 aux jets d'Intimidation." },
            { name: "Cicatrices Traumatiques", type: "penalty", desc: "-2 aux jets de Diplomatie (votre présence est oppressante)." }
        ],
        social_impacts: {
            pnj_reactions: "Les mercenaires vous respectent instantanément. Les bourgeois s'écartent avec dégoût et peur. Les anciens esclaves voient en vous un symbole.",
            reputation_bonus: { "Ligues de Mercenaires": 15, "Noblesse": -15, "Résistance des Esclaves": 20 }
        },
        gm_hooks: "Le propriétaire de l'arène a mis un prix sur votre tête pour vous avoir 'fugué'. Un ancien adversaire vous traque pour une revanche.",
        personal_secrets: "Vous avez tué un homme qui ne vous attaquait pas pour obtenir votre liberté. Vous possédez la clé des chaînes de votre ancien mentor.",
        roleplay_hooks: [
            "Évaluez chaque personne sur sa capacité à se battre.",
            "Ne supportez pas que quelqu'un touche vos épaules par surprise.",
            "Crachez souvent pour évacuer le 'goût du sable'."
        ]
    }
];

export const ADOLESCENCE_PATHS: AdolescencePath[] = [
    {
        id: "military_academy",
        label: "Académie des Épées",
        desc: "Formation rigoureuse au sein d'une milice ou d'une garde royale.",
        lore: "Marche, combat, obéissance. Votre corps a été brisé puis reforgé dans l'acier. Vous savez que la force sans discipline n'est que du bruit.",
        stats: { str: 1, con: 1 },
        mechanical_traits: [
            { name: "Posture Militaire", type: "bonus", desc: "+1 à la Classe d'Armure tant que vous portez une armure." },
            { name: "Rigidité Mentale", type: "penalty", desc: "-2 aux jets de tromperie ou de ruse." }
        ],
        social_impacts: {
            pnj_reactions: "Les soldats vous saluent machinalement. Les criminels évitent votre regard franc. Les forgerons vous font des remises par respect pour 'les nôtres'.",
            reputation_bonus: { "Légion d'Acier": 15, "Syndicat de l'Ombre": -10, "Garde Royale": 10 }
        },
        gm_hooks: "Vous avez désobéi à un ordre criminel d'un supérieur, vous êtes un 'déserteur de conscience'. Un dossier militaire sur vos 'capacités spéciales' circule dans les hautes sphères.",
        personal_secrets: "Le sang sur vos mains lors de votre premier duel n'était pas celui d'un ennemi, mais d'un ami. Vous avez volé les plans d'une forteresse avant de partir.",
        roleplay_hooks: [
            "Entretenez vos armes méticuleusement chaque soir.",
            "Utilisez des termes militaires pour décrire des situations simples.",
            "Marchez toujours au pas, même lors d'une promenade tranquille."
        ],
        img: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "thieving_guild",
        label: "L'Apprentissage des Ombres",
        desc: "Vous avez servi d'informateur ou de pickpocket pour un syndicat.",
        lore: "Le silence est votre meilleur ami. Vous avez appris à lire les chiffres sur les bourses et la peur dans les yeux des riches.",
        stats: { dex: 1, int: 1 },
        mechanical_traits: [
            { name: "Pas de Velours", type: "bonus", desc: "+2 en Discrétion." },
            { name: "Dette de Sang", type: "penalty", desc: "Un ancien associé vous traque (Rencontres RP hostiles aléatoires)." }
        ],
        social_impacts: {
            pnj_reactions: "Vous connaissez les signes secrets des voleurs. Les marchands serrent leur bourse en vous voyant. Les agents d'information vous considèrent comme une source fiable.",
            reputation_bonus: { "Guilde des Voleurs": 20, "Commerce Local": -15, "Réseau d'Espionnage": 10 }
        },
        gm_hooks: "Le chef de la guilde a 'placé' un espion dans votre futur groupe d'aventuriers. Vous possédez un secret sur l'un des membres du conseil municipal.",
        personal_secrets: "Vous n'avez jamais volé pour l'argent, mais pour l'adrénaline de ne pas être vu. Vous avez aidé une victime à s'échapper en secret une fois.",
        roleplay_hooks: [
            "Ne donnez jamais votre vrai nom à un inconnu.",
            "Observez toujours les sorties de secours en entrant dans un bâtiment.",
            "Jouez avec une pièce de monnaie entre vos doigts par nervosité."
        ],
        img: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "self_taught_hermit",
        label: "Solitude de l'Ermite",
        desc: "Vous avez passé vos années de formation seul dans la nature ou des ruines.",
        lore: "Pas de maître, pas de règles. Juste vous et les éléments. Vous avez découvert des secrets que les autres ignorent, mais au prix de votre humanité sociale.",
        stats: { wis: 2 },
        mechanical_traits: [
            { name: "Volonté de Fer", type: "bonus", desc: "+2 aux jets de sauvegarde de Sagesse." },
            { name: "Apathie Sociale", type: "penalty", desc: "-2 aux jets de Charisme." }
        ],
        social_impacts: {
            pnj_reactions: "Les gens du peuple vous pensent fou ou maudit. Les ermites et chamans vous respectent. Les animaux errants ont tendance à vous suivre sans raison apparente.",
            reputation_bonus: { "Cercle des Anciens": 15, "Cour Noble": -20, "Tribus Nomades": 10 }
        },
        gm_hooks: "La 'solitude' n'était pas totale ; vous parlez à une voix que vous seul entendez (un ancêtre ? une entité ?). Vous avez vu quelque chose tomber du ciel il y a trois ans.",
        personal_secrets: "Vous avez découvert une ruine ancienne qui ne devrait pas exister sur les cartes. Vous possédez un éclat de cristal qui bat comme un cœur.",
        roleplay_hooks: [
            "Soyez franc au point d'être impoli.",
            "Préférez dormir à la belle étoile plutôt que dans une chambre étouffante.",
            "Ignorez totalement les concepts de monnaie et de propriété privée."
        ],
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "temple_acolyte",
        label: "Sceau du Divin",
        desc: "Élevé dans le silence et la ferveur d'un monastère ou d'un temple.",
        lore: "Les psaumes étaient votre alphabet. Vous avez appris que la chair est faible et que l'esprit est éternel. Mais vous avez aussi vu l'hypocrisie derrière les autels d'or.",
        stats: { wis: 1, cha: 1 },
        mechanical_traits: [
            { name: "Ferveur Divine", type: "bonus", desc: "Avantage sur les jets de sauvegarde contre la peur." },
            { name: "Vœu d'Austérité", type: "penalty", desc: "Si vous dépensez plus de 50 po pour un luxe personnel, vous perdez votre bonus de Ferveur jusqu'au prochain repos long." }
        ],
        social_impacts: {
            pnj_reactions: "Les fidèles vous demandent des bénédictions. Les hérétiques vous provoquent. Le clergé étranger vous voit comme un concurrent ou un allié précieux.",
            reputation_bonus: { "Clergé": 20, "Société Secrète (Occulte)": -15, "Aide aux Pauvres": 15 }
        },
        gm_hooks: "Votre mentor au temple a été assassiné et on vous accuse. Vous portez une relique 'empruntée' qui appartient à un dieu oublié.",
        personal_secrets: "Vous avez douté une fois, et dans ce doute, une ombre est entrée en vous. Vous savez que le Grand Prêtre est un imposteur.",
        roleplay_hooks: [
            "Commencez chaque repas par une prière silencieuse.",
            "Ne mentez jamais, même quand c'est nécessaire (ou trouvez des vérités détournées).",
            "Portez toujours un symbole de foi visible, même si c'est dangereux."
        ]
    }
];
