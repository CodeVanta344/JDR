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
            pnj_reactions: "Les nobles vous accueillent comme l'un des leurs (+2 Diplomatie), mais le peuple vous regarde avec dédain ou crainte (-2 Intimidation).",
            reputation_bonus: { "Noblesse": 15, "Basse-Fosse": -10 }
        },
        gm_hooks: "Le personnage a une dette de sang ou une promesse de mariage oubliée qui resurgira.",
        personal_secrets: "Votre famille cache une ascendance illégitime qui pourrait vous coûter votre titre.",
        roleplay_hooks: [
            "Refusez systématiquement de dormir dans une auberge de bas étage.",
            "Utilisez toujours votre titre complet lors des présentations officielles."
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
            pnj_reactions: "Les criminels et mendiants vous font confiance (+2 Psychologie), la garde urbaine vous suit systématiquement du regard (-2 Discrétion en ville).",
            reputation_bonus: { "Bas-fonds": 20, "Garde Royale": -15 }
        },
        gm_hooks: "Le personnage connaît l'entrée d'un réseau de tunnels secrets sous la ville principale.",
        personal_secrets: "Vous avez volé un objet sans importance apparente qui se révèle être une clé de coffre-fort national.",
        roleplay_hooks: [
            "Vérifiez toujours vos poches quand vous croisez un étranger.",
            "Instinctivement, asseyez-vous dos au mur dans les tavernes."
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
            pnj_reactions: "Les animaux et esprits naturels ne vous attaquent qu'en cas de légitime défense. Les citadins vous trouvent étrange et imprévisible.",
            reputation_bonus: { "Peuple Elfe": 10, "Guilde des Marchands": -5 }
        },
        gm_hooks: "Le personnage porte en lui une graine d'Arbre-Monde qui réagit à la corruption arcanique.",
        personal_secrets: "Vous avez passé un pacte avec une dryade pour protéger un lieu qui n'existe plus.",
        roleplay_hooks: [
            "Parlez aux plantes comme si elles pouvaient répondre (et peut-être le font-elles).",
            "Sentez-vous visiblement mal à l'aise dans les grandes cités de pierre."
        ],
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop"
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
            pnj_reactions: "Les autres survivants du feu vous reconnaissent à votre odeur ou vos cicatrices (+2 Persuasion avec eux).",
            reputation_bonus: { "Communauté des Réfugiés": 15 }
        },
        gm_hooks: "L'incendie n'était pas un accident, mais une expérience ratée d'un mage encore en activité.",
        personal_secrets: "C'est votre maladresse avec un artefact trouvé qui a déclenché l'étincelle initiale.",
        roleplay_hooks: [
            "Éteignez toujours les bougies avant de quitter une pièce.",
            "Paniquez légèrement si vous êtes enfermé dans un endroit étroit sans issue visible."
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
            reputation_bonus: { "Académie de Magie": 10 }
        },
        gm_hooks: "Le Maître a disparu en vous laissant un livre codé que vous n'avez jamais réussi à ouvrir.",
        personal_secrets: "Vous avez lu une page interdite qui a brûlé vos rétines... et votre âme.",
        roleplay_hooks: [
            "Corrigez les fautes de syntaxe de vos compagnons.",
            "Prenez des notes compulsives sur chaque nouvelle créature croisée."
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
            pnj_reactions: "Les êtres magiques ressentent une aura familière autour de vous. Les prêtres vous regardent avec suspicion (peur de la 'possession').",
            reputation_bonus: { "Peuple Féerique": 20, "Inquisition": -10 }
        },
        gm_hooks: "Vous avez 'oublié' le nom de votre ravisseur, mais lui ne vous a pas oublié.",
        personal_secrets: "Vous n'êtes pas revenu seul ; un esprit farceur vit dans votre ombre.",
        roleplay_hooks: [
            "Distrayez-vous facilement par des objets brillants ou colorés.",
            "Avez parfois des conversations avec des personnes invisibles."
        ],
        img: "https://images.unsplash.com/photo-1528114039593-4366cc08227d?q=80&w=1000&auto=format&fit=crop"
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
            pnj_reactions: "Les soldats vous saluent machinalement. Les criminels évitent votre regard franc.",
            reputation_bonus: { "Légion d'Acier": 15, "Syndicat de l'Ombre": -10 }
        },
        gm_hooks: "Vous avez désobéi à un ordre criminel d'un supérieur, vous êtes un 'déserteur de conscience'.",
        personal_secrets: "Le sang sur vos mains lors de votre premier duel n'était pas celui d'un ennemi, mais d'un ami.",
        roleplay_hooks: [
            "Entretenez vos armes méticuleusement chaque soir.",
            "Utilisez des termes militaires pour décrire des situations simples."
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
            pnj_reactions: "Vous connaissez les signes secrets des voleurs. Les marchands serrent leur bourse en vous voyant.",
            reputation_bonus: { "Guilde des Voleurs": 20, "Commerce Local": -15 }
        },
        gm_hooks: "Le chef de la guilde a 'placé' un espion dans votre futur groupe d'aventuriers.",
        personal_secrets: "Vous n'avez jamais volé pour l'argent, mais pour l'adrénaline de ne pas être vu.",
        roleplay_hooks: [
            "Ne donnez jamais votre vrai nom à un inconnu.",
            "Observez toujours les sorties de secours en entrant dans un bâtiment."
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
            pnj_reactions: "Les gens du peuple vous pensent fou ou maudit. Les ermites et chamans vous respectent.",
            reputation_bonus: { "Cercle des Anciens": 15, "Cour Noble": -20 }
        },
        gm_hooks: "La 'solitude' n'était pas totale ; vous parlez à une voix que vous seul entendez.",
        personal_secrets: "Vous avez découvert une ruine ancienne qui ne devrait pas exister sur les cartes.",
        roleplay_hooks: [
            "Soyez franc au point d'être impoli.",
            "Préférez dormir à la belle étoile plutôt que dans une chambre étouffante."
        ],
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop"
    }
];
