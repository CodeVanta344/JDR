// ═══════════════════════════════════════════════════════════════════════
// 🎯 MÉCANIQUES DES COMPÉTENCES MAÎTRISÉES
// ═══════════════════════════════════════════════════════════════════════
// Ce fichier définit TOUTES les mécaniques de jeu pour chaque compétence

export interface SkillMechanic {
    id: string;
    name: string;
    category: string;
    description: string;
    useCases: string[];
    dcExamples: { difficulty: string; dc: number; example: string }[];
    combatUse?: string;
    craftingRecipes?: string[];
    synergies?: string[];
}

export const SKILL_MECHANICS: Record<string, SkillMechanic> = {
    // ═══════════════════════════════════════════════════════════════
    // 🗡️ COMPÉTENCES DE COMBAT
    // ═══════════════════════════════════════════════════════════════
    
    melee: {
        id: 'melee',
        name: 'Mêlée',
        category: 'Combat',
        description: 'Maîtrise des armes de corps-à-corps (épées, haches, masses)',
        useCases: [
            'Attaques avec armes blanches',
            'Parades et ripostes',
            'Désarmement d\'adversaires',
            'Techniques de combat rapproché'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 30, example: 'Frapper un gobelin immobile' },
            { difficulty: 'Moyen', dc: 50, example: 'Toucher un soldat aguerri' },
            { difficulty: 'Difficile', dc: 70, example: 'Désarmer un maître d\'armes' },
            { difficulty: 'Très difficile', dc: 90, example: 'Parer une attaque mortelle en combat' }
        ],
        combatUse: 'Bonus de +5 aux jets d\'attaque en mêlée. Peut tenter des manœuvres spéciales (désarmement, renversement).',
        synergies: ['athletics (grappling)', 'tactics (combat positioning)']
    },
    
    ranged: {
        id: 'ranged',
        name: 'Distance',
        category: 'Combat',
        description: 'Maîtrise des armes à distance (arcs, arbalètes, armes de jet)',
        useCases: [
            'Tir précis à longue distance',
            'Tir en mouvement',
            'Tir sur cibles mobiles',
            'Fabrication de flèches/carreaux'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Toucher une cible statique à 20m' },
            { difficulty: 'Moyen', dc: 50, example: 'Toucher un ennemi en mouvement' },
            { difficulty: 'Difficile', dc: 75, example: 'Tir acrobatique en sautant' },
            { difficulty: 'Quasi-impossible', dc: 95, example: 'Couper une corde à 100m dans l\'obscurité' }
        ],
        combatUse: 'Bonus de +5 aux jets d\'attaque à distance. Pas de malus pour tir en mouvement.',
        synergies: ['perception (aiming)', 'engineering (ballistics)']
    },
    
    tactics: {
        id: 'tactics',
        name: 'Tactique',
        category: 'Combat',
        description: 'Connaissance des stratégies militaires et positionnement tactique',
        useCases: [
            'Analyse des points faibles ennemis',
            'Préparation d\'embuscades',
            'Commandement de troupes',
            'Identification de tactiques adverses'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 30, example: 'Repérer un désavantage de terrain évident' },
            { difficulty: 'Moyen', dc: 55, example: 'Organiser une formation défensive efficace' },
            { difficulty: 'Difficile', dc: 75, example: 'Anticiper une embuscade ennemie' },
            { difficulty: 'Très difficile', dc: 90, example: 'Déjouer un plan de bataille complexe' }
        ],
        combatUse: 'Permet d\'agir en premier au combat (bonus d\'initiative +3). Peut accorder un bonus d\'attaque (+2) aux alliés 1 fois par combat.',
        synergies: ['history (ancient battles)', 'perception (reconnaissance)']
    },
    
    // ═══════════════════════════════════════════════════════════════
    // 💬 COMPÉTENCES SOCIALES
    // ═══════════════════════════════════════════════════════════════
    
    persuasion: {
        id: 'persuasion',
        name: 'Persuasion',
        category: 'Social',
        description: 'Capacité à convaincre, négocier et influencer autrui de manière honnête',
        useCases: [
            'Négocier des prix avec marchands (-10% à -30%)',
            'Convaincre un garde de vous laisser passer',
            'Recruter des alliés pour une quête',
            'Apaiser une foule hostile'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Convaincre un ami de vous aider' },
            { difficulty: 'Moyen', dc: 50, example: 'Négocier un rabais de 10% chez un marchand' },
            { difficulty: 'Difficile', dc: 70, example: 'Convaincre un noble de financer votre expédition' },
            { difficulty: 'Très difficile', dc: 85, example: 'Faire changer d\'avis un juge sur un verdict' },
            { difficulty: 'Quasi-impossible', dc: 95, example: 'Convaincre un roi d\'annuler une guerre' }
        ],
        combatUse: 'Peut être utilisé pour désamorcer un combat avant qu\'il ne commence (DC 60-80).',
        synergies: ['insight (reading people)', 'history (knowing what motivates cultures)']
    },
    
    intimidation: {
        id: 'intimidation',
        name: 'Intimidation',
        category: 'Social',
        description: 'Inspirer la peur et contraindre par la menace',
        useCases: [
            'Effrayer des ennemis faibles pour qu\'ils fuient',
            'Extorquer des informations',
            'Obtenir un avantage en négociation par la menace',
            'Démoraliser un adversaire avant combat'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 30, example: 'Effrayer un gobelin lâche' },
            { difficulty: 'Moyen', dc: 50, example: 'Faire fuir des bandits mineurs' },
            { difficulty: 'Difficile', dc: 70, example: 'Intimider un chef de guerre' },
            { difficulty: 'Très difficile', dc: 90, example: 'Effrayer un dragon mineur par la seule présence' }
        ],
        combatUse: 'Peut forcer un ennemi de bas niveau (CR < votre niveau) à fuir le combat (DC 60). Malus de -2 moral sur les ennemis intimidés.',
        synergies: ['melee (threatening display)', 'strength (physical intimidation)']
    },
    
    deception: {
        id: 'deception',
        name: 'Tromperie',
        category: 'Social',
        description: 'Mentir, bluffer et tromper de manière convaincante',
        useCases: [
            'Se faire passer pour quelqu\'un d\'autre',
            'Bluffer au jeu ou en négociation',
            'Cacher ses véritables intentions',
            'Créer des fausses preuves'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Mentir à un ivrogne crédule' },
            { difficulty: 'Moyen', dc: 50, example: 'Convaincre un garde que vous êtes un messager officiel' },
            { difficulty: 'Difficile', dc: 75, example: 'Tromper un marchand rusé sur la valeur d\'un objet' },
            { difficulty: 'Très difficile', dc: 90, example: 'Infiltrer un château sous une fausse identité' }
        ],
        combatUse: 'Peut être utilisé pour créer une diversion permettant une attaque surprise (+5 bonus d\'attaque).',
        synergies: ['sleight_of_hand (hiding evidence)', 'performance (acting)']
    },
    
    insight: {
        id: 'insight',
        name: 'Perspicacité',
        category: 'Social',
        description: 'Lire les intentions, détecter les mensonges et comprendre les motivations',
        useCases: [
            'Détecter si quelqu\'un ment',
            'Comprendre les motivations cachées',
            'Anticiper les réactions émotionnelles',
            'Jauger si une situation est dangereuse'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Remarquer qu\'un enfant ment maladroitement' },
            { difficulty: 'Moyen', dc: 50, example: 'Détecter la nervosité d\'un menteur expérimenté' },
            { difficulty: 'Difficile', dc: 75, example: 'Percer les intentions d\'un espion professionnel' },
            { difficulty: 'Très difficile', dc: 90, example: 'Lire les pensées d\'un noble manipulateur' }
        ],
        combatUse: 'Permet de deviner la prochaine action d\'un ennemi (bonus de +2 à la CA contre cet ennemi pendant 1 tour).',
        synergies: ['perception (body language)', 'history (cultural tells)']
    },
    
    animal_handling: {
        id: 'animal_handling',
        name: 'Dressage',
        category: 'Social',
        description: 'Comprendre, calmer et dresser les animaux',
        useCases: [
            'Calmer un cheval effrayé',
            'Dresser un animal de compagnie',
            'Monter une créature sauvage (loup, ours)',
            'Empêcher un animal de vous attaquer'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 20, example: 'Caresser un chien domestique' },
            { difficulty: 'Moyen', dc: 45, example: 'Calmer un cheval de guerre en panique' },
            { difficulty: 'Difficile', dc: 70, example: 'Apprivoiser un loup sauvage' },
            { difficulty: 'Très difficile', dc: 85, example: 'Monter un griffon sans selle' },
            { difficulty: 'Quasi-impossible', dc: 95, example: 'Calmer un dragon enragé' }
        ],
        combatUse: 'Peut ordonner à un animal dressé de combattre à vos côtés (+1 allié temporaire). Peut tenter de rediriger un animal hostile vers vos ennemis (DC 75).',
        synergies: ['survival (tracking animals)', 'nature (animal behavior)']
    },
    
    // ═══════════════════════════════════════════════════════════════
    // 🗺️ COMPÉTENCES D'EXPLORATION
    // ═══════════════════════════════════════════════════════════════
    
    investigation: {
        id: 'investigation',
        name: 'Investigation',
        category: 'Exploration',
        description: 'Rechercher des indices, résoudre des énigmes et analyser des scènes',
        useCases: [
            'Trouver des passages secrets',
            'Déchiffrer des énigmes',
            'Analyser une scène de crime',
            'Découvrir des pièges'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Trouver un objet caché dans un tiroir' },
            { difficulty: 'Moyen', dc: 50, example: 'Découvrir un passage secret évident' },
            { difficulty: 'Difficile', dc: 70, example: 'Déchiffrer un code crypté' },
            { difficulty: 'Très difficile', dc: 90, example: 'Résoudre une énigme ancienne' }
        ],
        combatUse: 'Peut révéler les points faibles d\'un ennemi avant combat (malus de -2 à la CA de l\'ennemi analysé).',
        synergies: ['perception (noticing details)', 'arcana (magical clues)']
    },
    
    perception: {
        id: 'perception',
        name: 'Perception',
        category: 'Exploration',
        description: 'Remarquer des détails, entendre des sons faibles, repérer des dangers',
        useCases: [
            'Détecter une embuscade',
            'Repérer des ennemis cachés',
            'Entendre des conversations lointaines',
            'Remarquer des détails importants'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 20, example: 'Voir un ennemi en terrain dégagé' },
            { difficulty: 'Moyen', dc: 45, example: 'Entendre des pas furtifs derrière une porte' },
            { difficulty: 'Difficile', dc: 70, example: 'Repérer un assassin dissimulé dans l\'ombre' },
            { difficulty: 'Très difficile', dc: 90, example: 'Détecter une créature invisible par le son' }
        ],
        combatUse: 'Bonus d\'initiative (+2). Annule les bonus de Surprise des ennemis si le jet réussit (DC 60).',
        synergies: ['survival (tracking)', 'investigation (analyzing details)']
    },
    
    survival: {
        id: 'survival',
        name: 'Survie',
        category: 'Exploration',
        description: 'Survivre en milieu sauvage, traquer, chasser et s\'orienter',
        useCases: [
            'Trouver de la nourriture et de l\'eau',
            'Traquer une créature',
            'S\'orienter sans carte',
            'Prévoir la météo',
            'Construire un abri'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Trouver de l\'eau dans une forêt' },
            { difficulty: 'Moyen', dc: 50, example: 'Traquer un cerf blessé' },
            { difficulty: 'Difficile', dc: 70, example: 'Survivre 3 jours dans un désert hostile' },
            { difficulty: 'Très difficile', dc: 90, example: 'Traquer un dragon à travers les montagnes' }
        ],
        combatUse: 'Permet de poser des pièges (DC 55) qui infligent 2d10 dégâts. Peut préparer le terrain avant combat pour un avantage tactique.',
        synergies: ['nature (flora/fauna knowledge)', 'animal_handling (hunting)']
    },
    
    stealth: {
        id: 'stealth',
        name: 'Discrétion',
        category: 'Exploration',
        description: 'Se déplacer silencieusement et rester caché',
        useCases: [
            'Se faufiler sans être vu',
            'Pickpocketing',
            'Échapper à des poursuivants',
            'Attaque surprise'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Se cacher dans l\'ombre d\'une ruelle vide' },
            { difficulty: 'Moyen', dc: 50, example: 'Se faufiler dans un couloir gardé' },
            { difficulty: 'Difficile', dc: 75, example: 'Échapper à une patrouille entraînée' },
            { difficulty: 'Très difficile', dc: 90, example: 'Infiltrer une forteresse en plein jour' }
        ],
        combatUse: 'ATTAQUE SOURNOISE : Si l\'ennemi ne vous a pas vu, première attaque inflige +3d6 dégâts. Peut se cacher en combat (DC 60) pour réessayer.',
        synergies: ['acrobatics (silent movement)', 'perception (knowing where to hide)']
    },
    
    athletics: {
        id: 'athletics',
        name: 'Athlétisme',
        category: 'Exploration',
        description: 'Force brute, escalade, natation, sauts et performances physiques',
        useCases: [
            'Escalader un mur ou une falaise',
            'Sauter par-dessus un gouffre',
            'Nager contre un courant',
            'Soulever des objets lourds',
            'Grappling en combat'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 20, example: 'Escalader un mur avec prises évidentes' },
            { difficulty: 'Moyen', dc: 45, example: 'Sauter 3 mètres en longueur' },
            { difficulty: 'Difficile', dc: 70, example: 'Nager dans une rivière tumultueuse' },
            { difficulty: 'Très difficile', dc: 90, example: 'Escalader une falaise glissante sous la pluie' }
        ],
        combatUse: 'Peut GRAPPLER un ennemi (DC 50 + niveau ennemi). Ennemi agrippé ne peut pas se déplacer ni attaquer pendant 1 tour. Peut POUSSER un ennemi (DC 55) pour le faire tomber (1d6 dégâts + malus -2 attaque pendant 1 tour).',
        synergies: ['survival (climbing in wilderness)', 'acrobatics (parkour moves)']
    },
    
    acrobatics: {
        id: 'acrobatics',
        name: 'Acrobatie',
        category: 'Exploration',
        description: 'Équilibre, agilité, esquives et manœuvres acrobatiques',
        useCases: [
            'Éviter les chutes',
            'Marcher sur des surfaces glissantes',
            'Esquives acrobatiques',
            'Déplacements parkour'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Garder l\'équilibre sur une poutre large' },
            { difficulty: 'Moyen', dc: 50, example: 'Effectuer une roulade pour amortir une chute' },
            { difficulty: 'Difficile', dc: 75, example: 'Marcher sur une corde raide en hauteur' },
            { difficulty: 'Quasi-impossible', dc: 95, example: 'Esquiver une volée de flèches en sautant' }
        ],
        combatUse: 'Bonus de +2 à la CA contre attaques de mêlée. Peut tenter une ESQUIVE ACROBATIQUE (DC 65) pour éviter complètement une attaque unique.',
        synergies: ['stealth (silent landings)', 'athletics (jumping)']
    },
    
    // ═══════════════════════════════════════════════════════════════
    // 🔨 COMPÉTENCES D'ARTISANAT
    // ═══════════════════════════════════════════════════════════════
    
    smithing: {
        id: 'smithing',
        name: 'Forge',
        category: 'Artisanat',
        description: 'Forger armes, armures et outils métalliques',
        useCases: [
            'Créer des armes (+1 à +5 selon qualité)',
            'Réparer équipement endommagé',
            'Améliorer armures existantes',
            'Forger des outils spécialisés'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 30, example: 'Réparer une épée ébréchée' },
            { difficulty: 'Moyen', dc: 55, example: 'Forger une épée longue de qualité standard' },
            { difficulty: 'Difficile', dc: 75, example: 'Créer une armure de plaques renforcée (+1 AC)' },
            { difficulty: 'Très difficile', dc: 90, example: 'Forger une épée en mithril (+3 ATK)' }
        ],
        craftingRecipes: [
            'Épée longue (3 lingots fer, DC 50, 2h) → +15 ATK',
            'Armure de plaques (5 lingots acier, DC 70, 8h) → 18 AC',
            'Grande hache (4 lingots fer, DC 55, 3h) → +18 ATK',
            'Épée en mithril (2 lingots mithril, DC 85, 12h) → +25 ATK, léger'
        ],
        combatUse: 'Peut réparer armure endommagée pendant repos long (+5 AC restauré). Armes forgées personnellement ne se brisent jamais.',
        synergies: ['mining (finding ore)', 'engineering (advanced mechanisms)']
    },
    
    alchemy: {
        id: 'alchemy',
        name: 'Alchimie',
        category: 'Artisanat',
        description: 'Créer potions, poisons, élixirs et transmuter matériaux',
        useCases: [
            'Brasser des potions de soin',
            'Créer des poisons mortels',
            'Fabriquer des bombes alchimiques',
            'Identifier substances inconnues'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 30, example: 'Brasser une potion de soin mineure' },
            { difficulty: 'Moyen', dc: 50, example: 'Créer un antidote efficace' },
            { difficulty: 'Difficile', dc: 75, example: 'Fabriquer une bombe alchimique (3d6 dégâts)' },
            { difficulty: 'Très difficile', dc: 90, example: 'Transmuter du plomb en or (temporairement)' }
        ],
        craftingRecipes: [
            'Potion de soin (2 herbes, DC 40, 30min) → +50 PV',
            'Poison paralysant (3 herbes toxiques, DC 60, 1h) → Paralyse 2 tours',
            'Bombe alchimique (1 soufre, 2 salpêtre, DC 70, 2h) → 3d6 zone dégâts',
            'Élixir de force (herbe rare, os de dragon, DC 85, 4h) → +5 FOR pendant 1h'
        ],
        combatUse: 'Peut lancer une BOMBE ALCHIMIQUE (si possédée) : 3d6 dégâts zone 3m. Peut appliquer un POISON sur arme (+2d6 dégâts poison, 3 charges).',
        synergies: ['herbalism (ingredients)', 'arcana (magical reagents)']
    },
    
    enchanting: {
        id: 'enchanting',
        name: 'Enchantement',
        category: 'Artisanat',
        description: 'Infuser objets avec magie, créer artefacts et runes',
        useCases: [
            'Enchanter armes (+dégâts magiques)',
            'Créer objets magiques',
            'Inscrire des runes de protection',
            'Désenchanter objets maudits'
        ],
        dcExamples: [
            { difficulty: 'Moyen', dc: 50, example: 'Enchanter une épée avec +1 feu' },
            { difficulty: 'Difficile', dc: 75, example: 'Créer un anneau de résistance magique' },
            { difficulty: 'Très difficile', dc: 85, example: 'Enchanter une armure avec régénération' },
            { difficulty: 'Quasi-impossible', dc: 95, example: 'Créer un artefact légendaire' }
        ],
        craftingRecipes: [
            'Enchantement +1 (1 essence magique, DC 55, 4h) → +5 ATK ou +2 AC',
            'Rune de feu (1 essence feu, DC 65, 6h) → +2d6 dégâts feu',
            'Amulette de protection (1 gemme, DC 70, 8h) → +3 AC magique',
            'Artefact légendaire (5 essences, 1 âme, DC 95, 24h) → Pouvoir unique'
        ],
        combatUse: 'Les armes enchantées personnellement infligent +1d6 dégâts magiques. Peut DISSIPER une magie hostile (DC 70).',
        synergies: ['arcana (magical theory)', 'smithing (weapon crafting)']
    },
    
    cooking: {
        id: 'cooking',
        name: 'Cuisine',
        category: 'Artisanat',
        description: 'Préparer des repas qui octroient des buffs temporaires',
        useCases: [
            'Cuisiner repas buffs (+stats temporaires)',
            'Préparer rations de voyage (récupération HP)',
            'Créer antidotes alimentaires',
            'Identifier nourriture avariée/empoisonnée'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 20, example: 'Cuisiner un ragoût basique' },
            { difficulty: 'Moyen', dc: 45, example: 'Préparer un repas qui restaure +25 PV' },
            { difficulty: 'Difficile', dc: 70, example: 'Cuisiner un festin qui donne +2 FOR pendant 4h' },
            { difficulty: 'Très difficile', dc: 85, example: 'Créer un plat légendaire (+3 toutes stats, 8h)' }
        ],
        craftingRecipes: [
            'Ragoût nourrissant (viande, légumes, DC 35, 30min) → +25 PV',
            'Pain de guerre (blé, miel, DC 45, 1h) → +2 CON pendant 4h',
            'Festin du héros (viande rare, épices, DC 75, 3h) → +3 toutes stats pendant 6h',
            'Élixir de vie (herbes rares, DC 90, 4h) → Régénération 5 PV/tour pendant 10 tours'
        ],
        combatUse: 'Peut consommer un REPAS PRÉPARÉ pendant repos court pour récupérer +50 PV supplémentaires. Buffs actifs donnent bonus en combat.',
        synergies: ['survival (foraging)', 'nature (edible plants)']
    },
    
    engineering: {
        id: 'engineering',
        name: 'Ingénierie',
        category: 'Artisanat',
        description: 'Concevoir machines, pièges, armes de siège et mécanismes complexes',
        useCases: [
            'Créer pièges mécaniques',
            'Construire armes de siège',
            'Désarmer mécanismes complexes',
            'Réparer appareils mécaniques',
            'Créer automates/golems'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 30, example: 'Réparer une porte avec serrure cassée' },
            { difficulty: 'Moyen', dc: 55, example: 'Construire un piège à flèches (2d6 dégâts)' },
            { difficulty: 'Difficile', dc: 75, example: 'Créer une baliste portable' },
            { difficulty: 'Très difficile', dc: 90, example: 'Concevoir un golem mécanique' },
            { difficulty: 'Quasi-impossible', dc: 95, example: 'Construire une forteresse mobile' }
        ],
        craftingRecipes: [
            'Piège à flèches (bois, métal, DC 50, 2h) → 2d6 dégâts perforants',
            'Baliste (bois, corde, DC 65, 6h) → 4d10 dégâts à distance',
            'Automate gardien (engrenages, cristaux, DC 85, 16h) → Gardien permanent',
            'Mécanisme volant (ailes, moteur, DC 90, 20h) → Vol pendant 1h'
        ],
        combatUse: 'Peut déployer un PIÈGE MÉCANIQUE avant combat (3d6 dégâts, zone 2m). Peut DÉSACTIVER pièges ennemis (DC 65) et les retourner contre eux.',
        synergies: ['smithing (metalworking)', 'arcana (magical circuits)']
    },
    
    leatherworking: {
        id: 'leatherworking',
        name: 'Tannerie',
        category: 'Artisanat',
        description: 'Travailler le cuir pour créer armures légères et objets',
        useCases: [
            'Créer armures de cuir',
            'Fabriquer sacs et sacoches',
            'Réparer équipement en cuir',
            'Créer selles et harnais'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Réparer une sacoche déchirée' },
            { difficulty: 'Moyen', dc: 50, example: 'Créer une armure de cuir clouté (14 AC)' },
            { difficulty: 'Difficile', dc: 70, example: 'Fabriquer une armure en peau de dragon (17 AC)' },
            { difficulty: 'Très difficile', dc: 85, example: 'Créer une cape d\'invisibilité en cuir enchanté' }
        ],
        craftingRecipes: [
            'Armure de cuir (3 peaux, DC 45, 3h) → 12 AC',
            'Armure clouté (5 peaux, clous, DC 60, 5h) → 14 AC',
            'Sac de capacité (cuir, magie, DC 75, 8h) → +20 slots inventaire',
            'Armure draconique (peau de dragon, DC 85, 12h) → 17 AC, résistance feu'
        ],
        combatUse: 'Armures de cuir créées personnellement ne ralentissent pas (pas de malus Discrétion). Peut réparer armure pendant repos court (+3 AC).',
        synergies: ['hunting (getting hides)', 'smithing (adding metal studs)']
    },
    
    carpentry: {
        id: 'carpentry',
        name: 'Menuiserie',
        category: 'Artisanat',
        description: 'Travailler le bois pour créer armes, boucliers, structures',
        useCases: [
            'Créer arcs et arbalètes',
            'Fabriquer boucliers en bois',
            'Construire barricades',
            'Créer meubles et structures'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Créer une lance basique' },
            { difficulty: 'Moyen', dc: 50, example: 'Fabriquer un bouclier en bois (15 AC)' },
            { difficulty: 'Difficile', dc: 70, example: 'Construire un arc long de qualité supérieure' },
            { difficulty: 'Très difficile', dc: 85, example: 'Créer un bâton magique en bois ancien' }
        ],
        craftingRecipes: [
            'Arc court (bois, corde, DC 40, 2h) → +10 ATK distance',
            'Bouclier bois (planches, DC 50, 3h) → +2 AC',
            'Barricade (planches, clous, DC 55, 1h) → Couvert défensif',
            'Bâton mystique (bois ancien, DC 80, 8h) → Canal pour sorts'
        ],
        combatUse: 'Peut créer BARRICADE improvisée (DC 55, 10min) : Couvert donnant +3 AC aux alliés derrière. Boucliers en bois peuvent bloquer 1 attaque entièrement 1 fois.',
        synergies: ['survival (finding good wood)', 'engineering (complex structures)']
    },
    
    // ═══════════════════════════════════════════════════════════════
    // 🌿 COMPÉTENCES DE RÉCOLTE
    // ═══════════════════════════════════════════════════════════════
    
    mining: {
        id: 'mining',
        name: 'Minage',
        category: 'Récolte',
        description: 'Extraire minerais, gemmes et ressources souterraines',
        useCases: [
            'Miner minerais (fer, or, mithril)',
            'Extraire gemmes précieuses',
            'Identifier filons riches',
            'Creuser tunnels'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 20, example: 'Miner du fer dans une mine facile' },
            { difficulty: 'Moyen', dc: 45, example: 'Extraire de l\'or d\'un filon caché' },
            { difficulty: 'Difficile', dc: 70, example: 'Miner du mithril dans des conditions dangereuses' },
            { difficulty: 'Très difficile', dc: 90, example: 'Extraire un diamant parfait sans le briser' }
        ],
        combatUse: 'Peut EFFONDRER un tunnel sur les ennemis (DC 75, 5d10 dégâts zone). Peut créer un PIÈGE D\'ÉBOULEMENT (DC 65).',
        synergies: ['smithing (using ores)', 'engineering (safe tunneling)']
    },
    
    herbalism: {
        id: 'herbalism',
        name: 'Herboristerie',
        category: 'Récolte',
        description: 'Cueillir plantes médicinales et identifier herbes rares',
        useCases: [
            'Récolter herbes médicinales',
            'Identifier plantes toxiques',
            'Créer remèdes simples',
            'Trouver ingrédients alchimiques'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Cueillir des herbes communes' },
            { difficulty: 'Moyen', dc: 50, example: 'Identifier une plante médicinale rare' },
            { difficulty: 'Difficile', dc: 70, example: 'Trouver une fleur magique nocturne' },
            { difficulty: 'Très difficile', dc: 90, example: 'Récolter une plante légendaire sans la tuer' }
        ],
        combatUse: 'Peut utiliser HERBES CURATIVES (si récoltées) pour soigner +25 PV en action bonus. Peut créer un NUAGE TOXIQUE (herbes toxiques, 2d6 dégâts poison zone).',
        synergies: ['alchemy (potion ingredients)', 'nature (plant knowledge)']
    },
    
    fishing: {
        id: 'fishing',
        name: 'Pêche',
        category: 'Récolte',
        description: 'Pêcher poissons et créatures aquatiques',
        useCases: [
            'Pêcher nourriture (poissons)',
            'Capturer créatures aquatiques rares',
            'Identifier espèces dangereuses',
            'Trouver perles et trésors sous-marins'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 20, example: 'Pêcher un poisson commun' },
            { difficulty: 'Moyen', dc: 45, example: 'Capturer un saumon géant' },
            { difficulty: 'Difficile', dc: 70, example: 'Pêcher un poisson magique lumineux' },
            { difficulty: 'Très difficile', dc: 85, example: 'Capturer une sirène (sans la tuer)' }
        ],
        combatUse: 'Peut utiliser FILET DE PÊCHE pour immobiliser un ennemi aquatique (DC 60, 2 tours). Poissons pêchés peuvent être cuisinés pour buffs.',
        synergies: ['survival (knowing waters)', 'cooking (preparing fish)']
    },
    
    hunting: {
        id: 'hunting',
        name: 'Chasse',
        category: 'Récolte',
        description: 'Traquer et chasser animaux sauvages',
        useCases: [
            'Chasser gibier pour nourriture',
            'Traquer créatures dangereuses',
            'Récolter peaux et fourrures',
            'Poser collets et pièges'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Chasser un lapin' },
            { difficulty: 'Moyen', dc: 50, example: 'Traquer un cerf' },
            { difficulty: 'Difficile', dc: 70, example: 'Chasser un ours solitaire' },
            { difficulty: 'Très difficile', dc: 90, example: 'Traquer un griffon dans les montagnes' }
        ],
        combatUse: 'Peut poser un PIÈGE DE CHASSE avant combat (DC 55, 2d8 dégâts + immobilisation 1 tour). Familier avec anatomie animale : +2 dégâts contre bêtes.',
        synergies: ['survival (tracking)', 'leatherworking (processing hides)']
    },
    
    // ═══════════════════════════════════════════════════════════════
    // 📚 COMPÉTENCES DE SAVOIR
    // ═══════════════════════════════════════════════════════════════
    
    arcana: {
        id: 'arcana',
        name: 'Arcanes',
        category: 'Savoir',
        description: 'Connaissance de la magie, sorts, créatures magiques et artefacts',
        useCases: [
            'Identifier sorts lancés',
            'Reconnaître objets magiques',
            'Comprendre runes anciennes',
            'Connaître faiblesses des créatures magiques'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Identifier un sort basique (boule de feu)' },
            { difficulty: 'Moyen', dc: 50, example: 'Reconnaître un objet magique mineur' },
            { difficulty: 'Difficile', dc: 75, example: 'Déchiffrer un grimoire ancien' },
            { difficulty: 'Très difficile', dc: 90, example: 'Comprendre un artefact légendaire' }
        ],
        combatUse: 'Peut identifier FAIBLESSE MAGIQUE d\'un ennemi (DC 65) : Alliés infligent +2d6 dégâts magiques contre cette cible pendant 3 tours. Peut tenter de CONTRESORT (DC 70 + niveau sort).',
        synergies: ['enchanting (magical crafting)', 'history (ancient magic)']
    },
    
    history: {
        id: 'history',
        name: 'Histoire',
        category: 'Savoir',
        description: 'Connaissance de l\'histoire, cultures, légendes et événements passés',
        useCases: [
            'Se souvenir d\'événements historiques',
            'Identifier artefacts anciens',
            'Connaître légendes et mythes',
            'Comprendre cultures disparues'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Se souvenir d\'un roi célèbre' },
            { difficulty: 'Moyen', dc: 50, example: 'Reconnaître un symbole d\'une civilisation perdue' },
            { difficulty: 'Difficile', dc: 75, example: 'Se rappeler d\'une prophétie ancienne pertinente' },
            { difficulty: 'Très difficile', dc: 90, example: 'Connaître le rituel d\'éveil d\'un dieu oublié' }
        ],
        combatUse: 'Peut se souvenir de la TACTIQUE HISTORIQUE d\'une faction ennemie : Accorde bonus de +2 Initiative et +1 AC contre cette faction.',
        synergies: ['arcana (magical history)', 'religion (theological history)']
    },
    
    religion: {
        id: 'religion',
        name: 'Religion',
        category: 'Savoir',
        description: 'Connaissance des dieux, rituels, morts-vivants et plans divins',
        useCases: [
            'Identifier symboles religieux',
            'Connaître rituels divins',
            'Reconnaître créatures célestes/infernales',
            'Comprendre prophéties'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Reconnaître le symbole d\'un dieu majeur' },
            { difficulty: 'Moyen', dc: 50, example: 'Identifier un rituel religieux en cours' },
            { difficulty: 'Difficile', dc: 75, example: 'Connaître la faiblesse d\'un démon' },
            { difficulty: 'Très difficile', dc: 90, example: 'Interpréter une prophétie divine cryptée' }
        ],
        combatUse: 'Connaissance des MORTS-VIVANTS : +3 dégâts contre morts-vivants. Peut BÉNIR une zone (DC 70) : Alliés dans la zone gagnent +2 tous jets pendant 3 tours.',
        synergies: ['history (religious events)', 'arcana (divine magic)']
    },
    
    nature: {
        id: 'nature',
        name: 'Nature',
        category: 'Savoir',
        description: 'Connaissance de la faune, flore, éléments et créatures naturelles',
        useCases: [
            'Identifier plantes et animaux',
            'Connaître comportement des bêtes',
            'Prédire phénomènes naturels',
            'Comprendre écosystèmes'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 20, example: 'Identifier un arbre commun' },
            { difficulty: 'Moyen', dc: 45, example: 'Reconnaître une plante toxique' },
            { difficulty: 'Difficile', dc: 70, example: 'Prédire une tempête imminente' },
            { difficulty: 'Très difficile', dc: 85, example: 'Comprendre le langage des arbres anciens' }
        ],
        combatUse: 'Connaissance des BÊTES : +2 dégâts contre créatures naturelles. Peut invoquer AIDE DE LA NATURE (DC 75) : 1d4 animaux locaux viennent vous aider pendant 3 tours.',
        synergies: ['survival (wilderness knowledge)', 'animal_handling (beast behavior)']
    },
    
    medicine: {
        id: 'medicine',
        name: 'Médecine',
        category: 'Savoir',
        description: 'Connaissance du corps, maladies, blessures et soins',
        useCases: [
            'Stabiliser un allié mourant',
            'Diagnostiquer maladies',
            'Soigner empoisonnements',
            'Effectuer chirurgie de terrain'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Bander une blessure simple' },
            { difficulty: 'Moyen', dc: 50, example: 'Stabiliser un allié à 0 PV' },
            { difficulty: 'Difficile', dc: 70, example: 'Guérir une maladie magique' },
            { difficulty: 'Très difficile', dc: 90, example: 'Ressusciter quelqu\'un mort depuis moins de 1 minute' }
        ],
        combatUse: 'Peut STABILISER un allié à 0 PV en action bonus (DC 50). Pendant repos court, peut soigner +2d6 PV supplémentaires à tous les alliés (DC 60).',
        synergies: ['herbalism (medicinal plants)', 'nature (anatomy knowledge)']
    },
    
    // ═══════════════════════════════════════════════════════════════
    // 🎭 COMPÉTENCES D'ARTS & PERFORMANCE
    // ═══════════════════════════════════════════════════════════════
    
    performance: {
        id: 'performance',
        name: 'Performance',
        category: 'Arts',
        description: 'Chant, danse, musique, théâtre et divertissement',
        useCases: [
            'Gagner de l\'argent en taverne',
            'Distraire des ennemis',
            'Inspirer des alliés',
            'Créer des illusions théâtrales'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Chanter une chanson connue' },
            { difficulty: 'Moyen', dc: 50, example: 'Distraire des gardes avec une danse' },
            { difficulty: 'Difficile', dc: 75, example: 'Inspirer une foule à la révolte' },
            { difficulty: 'Très difficile', dc: 90, example: 'Charmer un dragon avec une ballade épique' }
        ],
        combatUse: 'Peut INSPIRER LES ALLIÉS (1/combat, DC 60) : Tous les alliés gagnent +2 attaque et +5 temp HP pendant 3 tours. Peut DISTRAIRE un ennemi (DC 55) : Cet ennemi a malus de -3 à tous jets pendant 2 tours.',
        synergies: ['deception (acting)', 'persuasion (charisma-based performance)']
    },
    
    sleight_of_hand: {
        id: 'sleight_of_hand',
        name: 'Prestidigitation',
        category: 'Arts',
        description: 'Dextérité manuelle, pickpocket, tours de passe-passe',
        useCases: [
            'Pickpocketing',
            'Crocheter serrures',
            'Tours de cartes/magie',
            'Dissimuler objets'
        ],
        dcExamples: [
            { difficulty: 'Facile', dc: 25, example: 'Pickpocket un ivrogne distrait' },
            { difficulty: 'Moyen', dc: 50, example: 'Crocheter une serrure simple' },
            { difficulty: 'Difficile', dc: 75, example: 'Voler la bourse d\'un garde vigilant' },
            { difficulty: 'Très difficile', dc: 90, example: 'Crocheter un coffre-fort magique' }
        ],
        combatUse: 'Peut DÉROBER un objet d\'un ennemi (potion, arme) en action bonus (DC 65 + niveau ennemi). Peut PLANTER une bombe/poison sur un ennemi sans qu\'il le remarque (DC 70).',
        synergies: ['stealth (hiding actions)', 'deception (misdirection)']
    }
};

// ═══════════════════════════════════════════════════════════════════════
// 🎲 SYSTÈME DE RÉSOLUTION DES COMPÉTENCES
// ═══════════════════════════════════════════════════════════════════════

export interface SkillCheck {
    skillId: string;
    dc: number;
    characterLevel: number;
    skillMastery: number; // 0 = pas maîtrisé, 1-3 = niveaux de maîtrise
    attributeBonus: number; // Modificateur de caractéristique applicable
}

/**
 * Calcule le bonus total pour un jet de compétence
 */
export function calculateSkillBonus(check: SkillCheck): number {
    // Bonus de maîtrise : +5 par niveau de maîtrise
    const masteryBonus = check.skillMastery * 5;
    
    // Bonus de niveau (progression générale)
    const levelBonus = Math.floor(check.characterLevel / 3);
    
    // Bonus total
    return masteryBonus + levelBonus + check.attributeBonus;
}

/**
 * Résout un jet de compétence
 */
export function resolveSkillCheck(check: SkillCheck, diceRoll: number): {
    success: boolean;
    total: number;
    margin: number;
    criticalSuccess: boolean;
    criticalFailure: boolean;
} {
    const bonus = calculateSkillBonus(check);
    const total = diceRoll + bonus;
    const margin = total - check.dc;
    
    return {
        success: total >= check.dc,
        total,
        margin,
        criticalSuccess: margin >= 40, // Succès spectaculaire
        criticalFailure: margin <= -30 // Échec critique
    };
}

/**
 * Obtient les mécaniques d'une compétence
 */
export function getSkillMechanic(skillId: string): SkillMechanic | undefined {
    return SKILL_MECHANICS[skillId];
}

/**
 * Liste toutes les compétences par catégorie
 */
export function getSkillsByCategory(): Record<string, SkillMechanic[]> {
    const categories: Record<string, SkillMechanic[]> = {};
    
    Object.values(SKILL_MECHANICS).forEach(skill => {
        if (!categories[skill.category]) {
            categories[skill.category] = [];
        }
        categories[skill.category].push(skill);
    });
    
    return categories;
}
