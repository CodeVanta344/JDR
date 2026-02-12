/**
 * LIFEPATH ENRICHI - Système de création de personnage en 4 étapes
 * Chaque choix a des conséquences mécaniques et narratives liées au lore d'Aethelgard
 */

import { MechanicalTrait } from './backstories';

// ============================================================================
// TYPES
// ============================================================================

export interface LifePathStepOption {
    id: string;
    label: string;
    desc: string;
    lore: string; // Citation lore ou contexte historique
    
    // Impacts mécaniques
    stats?: Partial<{ str: number; dex: number; con: number; int: number; wis: number; cha: number }>;
    mechanical_traits: MechanicalTrait[];
    
    // Impacts narratifs
    social_impacts: {
        pnj_reactions: string;
        reputation_bonus: Record<string, number>; // Faction -> Réputation
    };
    gm_hooks: string; // Accroches pour le MJ
    personal_secrets: string; // Secret du personnage
    roleplay_hooks: string[]; // Conseils roleplay
    
    // Items/Compétences
    starting_items?: string[];
    skill_bonuses?: string[]; // Compétences spécifiques
    languages?: string[]; // Langues additionnelles
    
    // Relations
    allies?: string[]; // Alliés potentiels (noms génériques)
    enemies?: string[]; // Ennemis créés
    
    // Visuels
    img?: string;
}

// Étape 1 : Origine géographique et sociale
export interface BirthOrigin extends LifePathStepOption {
    region: 'NORTH' | 'CENTER' | 'EAST' | 'WEST' | 'SOUTH';
    social_class: 'NOBILITY' | 'MERCHANT' | 'COMMON' | 'POOR' | 'OUTCAST';
}

// Étape 2 : Enfance - Événements formateurs
export interface ChildhoodPath extends LifePathStepOption {
    family_type: 'INTACT' | 'BROKEN' | 'ADOPTED' | 'ORPHAN' | 'UNKNOWN';
    formative_event: 'TRAGEDY' | 'DISCOVERY' | 'BETRAYAL' | 'MIRACLE' | 'MUNDANE';
}

// Étape 3 : Adolescence - Formation et mentor
export interface AdolescencePath extends LifePathStepOption {
    training_type: 'MILITARY' | 'ARCANE' | 'RELIGIOUS' | 'CRIMINAL' | 'ARTISAN' | 'WILD';
    mentor_quality: 'LEGENDARY' | 'EXCELLENT' | 'HARSH' | 'CORRUPT' | 'ABSENT';
}

// Étape 4 : Passé adulte - Profession et traumatisme
export interface AdultPast extends LifePathStepOption {
    profession: 'MERCENARY' | 'SCHOLAR' | 'CRIMINAL' | 'ARTISAN' | 'WANDERER' | 'CLERGY';
    faction_affiliation?: string; // Faction liée
    reason_for_adventure: 'REVENGE' | 'REDEMPTION' | 'CURIOSITY' | 'GREED' | 'DUTY' | 'EXILE';
}

// ============================================================================
// ÉTAPE 1 : ORIGINES GÉOGRAPHIQUES ET SOCIALES
// ============================================================================

export const BIRTH_ORIGINS: BirthOrigin[] = [
    // ===== CÔTE DES ORAGES (NORD) =====
    {
        id: 'north_jarl_heir',
        label: '🏔️ Héritier de Jarl',
        region: 'NORTH',
        social_class: 'NOBILITY',
        desc: 'Né dans la grande salle d\'un clan de la Côte des Orages, héritier d\'un lignage de conquérants.',
        lore: '"Le sang des géants coule dans nos veines. Nous ne plions que devant la tempête." - Serment du Clan Hrafn',
        stats: { str: 2, cha: 1, con: -1 },
        mechanical_traits: [
            { name: 'Sang du Nord', type: 'bonus', desc: 'Résistance au froid (dégâts réduits de 3). +2 Intimidation contre non-nordiques.' },
            { name: 'Honneur ou Mort', type: 'penalty', desc: 'Ne peut refuser un duel d\'honneur sans perdre 2 en Charisme pendant 24h.' }
        ],
        social_impacts: {
            pnj_reactions: 'Les Jarls vous voient comme rival ou allié potentiel. Les esclaves baissent les yeux. Les marchands du Sud vous méprisent comme "barbare".',
            reputation_bonus: { 'Jarls de Kuldahar': 20, 'Loups d\'Hiver': 15, 'Noblesse Sol-Aureus': -10, 'Syndicat de l\'Ombre': -5 }
        },
        gm_hooks: 'Votre clan a une dette de sang avec un autre clan. Un frère/sœur aîné cherche à vous éliminer pour sécuriser l\'héritage. Vous possédez un anneau runique de succession.',
        personal_secrets: 'Vous avez secrètement pactisé avec un esprit de tempête pour gagner en force. Vous détestez le froid malgré votre lignage.',
        roleplay_hooks: [
            'Refusez systématiquement de porter des vêtements "douillets" du Sud',
            'Racontez des sagas exagérées de vos ancêtres à chaque feu de camp',
            'Mesurez votre valeur à celle d\'autrui par des concours de force'
        ],
        starting_items: ['Hache de cérémonie gravée', 'Cape en fourrure d\'ours blanc', 'Corne à boire en ivoire'],
        languages: ['Nordique ancien'],
        enemies: ['Clan rival nordique']
    },
    {
        id: 'north_iceforge_smith',
        label: '⚒️ Enfant de la Forge de Givre',
        region: 'NORTH',
        social_class: 'MERCHANT',
        desc: 'Né dans les forges souterraines où l\'on travaille le métal-glace, matériau légendaire du Nord.',
        lore: '"Le fer ordinaire se brise. Seul le métal né de la glace éternelle tient face au Marcheur Blanc." - Maxime des Forgerons',
        stats: { con: 2, str: 1, cha: -1 },
        mechanical_traits: [
            { name: 'Œil du Forgeron', type: 'bonus', desc: '+3 pour identifier la qualité/origine d\'armes et armures. Peut réparer équipement avec matériaux de base.' },
            { name: 'Mains Calleuses', type: 'penalty', desc: '-2 en Dextérité pour tâches fines (crochetage, calligraphie).' }
        ],
        social_impacts: {
            pnj_reactions: 'Les artisans vous respectent. Les guerriers vous demandent des améliorations. Les nobles vous traitent comme fournisseur, pas comme égal.',
            reputation_bonus: { 'Forge Éternelle (Nains)': 15, 'Loups d\'Hiver': 10, 'Guilde des Marchands': 10 }
        },
        gm_hooks: 'Votre maître vous a confié un secret : il existe une veine de métal-étoile (tombé du ciel) sous Kuldahar. Vous portez une amulette qui réagit au métal magique.',
        personal_secrets: 'Vous avez forgé une arme maudite qui a tué son porteur. Vous connaissez l\'emplacement d\'une forge abandonnée des géants.',
        roleplay_hooks: [
            'Examinez compulsivement toute arme que vous croisez',
            'Insistez pour entretenir l\'équipement du groupe chaque soir',
            'Crachez dans le feu "pour bénir la flamme"'
        ],
        starting_items: ['Marteau de forge personnel', 'Lunettes de protection fumées', 'Fragment de métal-glace (curiosité)'],
        skill_bonuses: ['Artisanat (Forge)', 'Connaissances (Minéraux)']
    },
    {
        id: 'north_storm_orphan',
        label: '⛈️ Orphelin de la Tempête',
        region: 'NORTH',
        social_class: 'POOR',
        desc: 'Trouvé bébé dans les décombres d\'un village détruit par une tempête magique, élevé par charité.',
        lore: '"La tempête ne laisse que le fer. Les faibles sont emportés, les forts restent." - Proverbe nordique',
        stats: { con: 2, wis: 1, cha: -1 },
        mechanical_traits: [
            { name: 'Né de la Foudre', type: 'bonus', desc: 'Résistance mineure à l\'électricité (2 dégâts absorbés). Les tempêtes ne vous dérangent jamais.' },
            { name: 'Marqué par le Destin', type: 'penalty', desc: 'Les devins et chamans vous évitent, sentant une "aura d\'orage". -2 Persuasion avec eux.' }
        ],
        social_impacts: {
            pnj_reactions: 'Vu comme porte-malheur ou béni selon les superstitions. Les orphelins et marginaux vous font confiance. Les superstitieux vous fuient.',
            reputation_bonus: { 'Communauté des Réfugiés': 15, 'Loups d\'Hiver': 5, 'Cercle des Anciens': -10 }
        },
        gm_hooks: 'Vous avez des flashs de la nuit de votre abandon : des silhouettes non-humaines et des runes brillantes. Un tatouage de foudre est apparu sur votre dos à 10 ans.',
        personal_secrets: 'Vous n\'êtes pas humain à 100% - vos yeux brillent dans le noir. Vous entendez parfois la voix de la tempête vous appeler.',
        roleplay_hooks: [
            'Restez dehors lors d\'orages pour "sentir la maison"',
            'Êtes mal à l\'aise dans les espaces trop calmes et silencieux',
            'Portez toujours un fragment de bois brûlé par la foudre'
        ],
        starting_items: ['Couverture trouée mais précieuse', 'Amulette étrange (origine inconnue)', 'Bâton de marche gravé de runes primitives'],
        allies: ['Vieux berger qui vous a recueilli']
    },

    // ===== VAL DORÉ (CENTRE) =====
    {
        id: 'center_royal_blood',
        label: '👑 Sang Royal de Sol-Aureus',
        region: 'CENTER',
        social_class: 'NOBILITY',
        desc: 'Né au palais de verre de Sol-Aureus, entouré de courtisans et intrigues politiques.',
        lore: '"Le verre est notre force : transparent, mais tranchant pour qui ose le briser." - Devise de la Maison Royale',
        stats: { cha: 3, int: 1, str: -2 },
        mechanical_traits: [
            { name: 'Maître des Masques', type: 'bonus', desc: '+3 Persuasion/Tromperie en contexte noble. Avantage pour détecter mensonges politiques.' },
            { name: 'Cible de Complots', type: 'penalty', desc: '1 chance sur 6 par session d\'être ciblé par un assassin ou conspiration (événement RP).' }
        ],
        social_impacts: {
            pnj_reactions: 'Reconnu instantanément dans le Val Doré. Mercenaires offrent leurs services. Conspirateurs vous approchent. Le peuple vous admire ou vous méprise.',
            reputation_bonus: { 'Noblesse Sol-Aureus': 25, 'Aube d\'Argent': 15, 'Syndicat de l\'Ombre': -20, 'Bas-fonds': -15 }
        },
        gm_hooks: 'Vous êtes 5e dans la ligne de succession, donc "éliminable". Votre famille cache un scandale : alliance secrète avec un culte interdit. Un demi-frère bâtard cherche reconnaissance.',
        personal_secrets: 'Vous avez assisté à un meurtre au palais et gardé le silence. Vous êtes secrètement amoureux d\'un roturier.',
        roleplay_hooks: [
            'Ne touchez jamais directement l\'argent (domestiques le font)',
            'Analysez chaque conversation comme un jeu d\'échecs politique',
            'Portez toujours un symbole héraldique visible'
        ],
        starting_items: ['Bague à sceau royal', 'Dague cérémoniale en or', 'Lettre de créance (crédit 100 po auprès banques)'],
        languages: ['Langue courtoise', 'Elfique (étiquette)'],
        enemies: ['Conspirateur de cour', 'Rival dans ligne de succession']
    },
    {
        id: 'center_merchant_heir',
        label: '💰 Héritier de Caravane',
        region: 'CENTER',
        social_class: 'MERCHANT',
        desc: 'Né dans une famille de marchands prospères de la Ligue, voyageant entre les cités.',
        lore: '"L\'or n\'a pas d\'odeur, mais il a une loyauté : celle du profit." - Adage de la Ligue des Marchands',
        stats: { int: 2, cha: 1, str: -1 },
        mechanical_traits: [
            { name: 'Nez pour l\'Affaire', type: 'bonus', desc: '+2 pour évaluer valeur objets. Prix marchands réduits de 10%. Peut trouver acheteur pour objets rares.' },
            { name: 'Cupidité Notoire', type: 'penalty', desc: 'Difficile de refuser une opportunité lucrative (jet Sagesse DC 12). Réputation de "radin" (-2 en Charisme avec guerriers).' }
        ],
        social_impacts: {
            pnj_reactions: 'Marchands vous offrent des contrats. Bandits vous ciblent. Nobles vous tolèrent comme "utiles". Contrebandiers vous approchent.',
            reputation_bonus: { 'Ligue des Marchands': 25, 'Syndicat de l\'Ombre': 10, 'Noblesse': -5, 'Loups d\'Hiver': 5 }
        },
        gm_hooks: 'Votre famille a perdu une cargaison précieuse dans les Terres Brûlées - vous devez la retrouver. Vous connaissez l\'emplacement d\'une cache de contrebande. Un concurrent a mis un contrat sur votre famille.',
        personal_secrets: 'Vous avez trafiqué avec des démons pour obtenir un monopole. Vous possédez un registre de tous les pots-de-vin versés aux nobles.',
        roleplay_hooks: [
            'Négociez absolument tout, même dans des situations absurdes',
            'Tenez un registre comptable méticuleux de toutes les dépenses du groupe',
            'Évaluez la richesse des gens avant leur caractère'
        ],
        starting_items: ['Balance de précision portable', 'Lettre de crédit (50 po)', 'Carnet de contacts marchands', 'Gemme d\'appraisal (loupe magique)'],
        skill_bonuses: ['Évaluation', 'Marchandage', 'Connaissances (Commerce)'],
        languages: ['Nain (commerce)', 'Langue des signes marchande']
    },
    {
        id: 'center_farm_born',
        label: '🌾 Né des Champs Dorés',
        region: 'CENTER',
        social_class: 'COMMON',
        desc: 'Élevé dans les fermes infinies du Val Doré, connaissant la dureté du labeur quotidien.',
        lore: '"La terre nourrit qui la respecte. Le blé pousse sur la sueur, pas sur l\'or." - Sagesse paysanne',
        stats: { con: 2, str: 1, int: -1 },
        mechanical_traits: [
            { name: 'Endurance du Laboureur', type: 'bonus', desc: 'Peut faire une marche forcée sans pénalité. +2 jets de Constitution pour efforts prolongés.' },
            { name: 'Naïveté Rurale', type: 'penalty', desc: '-2 Perspicacité en milieu urbain. Vulnérable aux arnaques sophistiquées.' }
        ],
        social_impacts: {
            pnj_reactions: 'Paysans vous font confiance instantanément. Citadins vous prennent pour un naïf. Nobles vous ignorent totalement.',
            reputation_bonus: { 'Communauté Paysanne': 20, 'Noblesse': -10, 'Syndicat de l\'Ombre': 5 }
        },
        gm_hooks: 'Votre famille a été expropriée par un noble corrompu. Vous avez découvert une ruine ancienne sous votre champ. Une récolte maudite a tué vos voisins - vous êtes le seul survivant.',
        personal_secrets: 'Vous avez volé une poule noble pour nourrir votre famille affamée. Un esprit de la terre vous a parlé une fois.',
        roleplay_hooks: [
            'Levez-vous toujours à l\'aube, peu importe où vous dormez',
            'Bénissez chaque repas en remerciant la terre',
            'Êtes fasciné par la "magie" banale de la ville (lanternes, horloges)'
        ],
        starting_items: ['Faucille de famille', 'Sac de graines (porte-bonheur)', 'Pain noir et fromage fermier'],
        skill_bonuses: ['Survie (Agriculture)', 'Dressage (Animaux de ferme)']
    },

    // ===== MONTS CŒUR-DE-FER (EST) =====
    {
        id: 'east_guild_master',
        label: '⚒️ Fils de Maître de Guilde',
        region: 'EAST',
        social_class: 'NOBILITY',
        desc: 'Né dans les halls de Hammerdeep, votre sang porte l\'héritage des plus grands artisans nains.',
        lore: '"La pierre ne ment pas. Le métal ne trahit pas. Seul l\'homme est faible." - Devise de la Forge Éternelle',
        stats: { con: 2, int: 2, dex: -2 },
        mechanical_traits: [
            { name: 'Œil de Maître', type: 'bonus', desc: '+3 pour détecter mécanismes, pièges, qualité de construction. Voit les faiblesses structurelles.' },
            { name: 'Lent comme la Pierre', type: 'penalty', desc: '-10 pieds de vitesse de déplacement (lourdeur culturelle).' }
        ],
        social_impacts: {
            pnj_reactions: 'Nains vous traitent en égal (rare privilège). Humains vous sous-estiment. Gnomes vous jalousent. Gobelins vous craignent.',
            reputation_bonus: { 'Forge Éternelle': 30, 'Guilde Arcanique': 10, 'Loups d\'Hiver': 5, 'Syndicat de l\'Ombre': -10 }
        },
        gm_hooks: 'Vous devez prouver votre valeur en créant un chef-d\'œuvre légendaire. Un brevet crucial a été volé - vous devez le récupérer. Rivalité avec une guilde concurrente.',
        personal_secrets: 'Vous avez secrètement innové une technique interdite qui pourrait révolutionner la forge... ou causer une catastrophe. Vous collectionnez des cristaux "qui chantent".',
        roleplay_hooks: [
            'Critiquez ouvertement tout travail artisanal de qualité inférieure',
            'Refusez catégoriquement d\'utiliser des objets "bâclés"',
            'Mesurez le temps en "fournées" plutôt qu\'en heures'
        ],
        starting_items: ['Marteau de maître gravé', 'Lunettes d\'artisan (loupe intégrée)', 'Livre de brevets de famille', 'Pierre de touche (détecte alliage)'],
        skill_bonuses: ['Artisanat (Forge)', 'Artisanat (Ingénierie)', 'Connaissances (Minéralogie)'],
        languages: ['Nain profond', 'Langage technique des guildes']
    },
    {
        id: 'east_mine_worker',
        label: '⛏️ Enfant des Profondeurs',
        region: 'EAST',
        social_class: 'COMMON',
        desc: 'Né 10 niveaux sous terre, vous n\'avez vu le soleil qu\'à l\'âge de 12 ans.',
        lore: '"Dans le noir, seul le son du pic te dit si tu vis encore." - Chant des mineurs',
        stats: { str: 2, con: 1, cha: -1 },
        mechanical_traits: [
            { name: 'Vision Souterraine', type: 'bonus', desc: 'Vision dans le noir 60 pieds. +2 Perception pour détecter tunnels instables ou gaz.' },
            { name: 'Photosensible', type: 'penalty', desc: 'Désavantage aux jets de Perception en plein soleil sans protection oculaire.' }
        ],
        social_impacts: {
            pnj_reactions: 'Mineurs vous considèrent comme frère. Nains respectent votre dur labeur. Nobles vous voient comme "stock de main-d\'œuvre".',
            reputation_bonus: { 'Mineurs': 20, 'Forge Éternelle': 10, 'Noblesse': -5 }
        },
        gm_hooks: 'Vous avez découvert une veine de minerai inconnu qui "murmure". Un effondrement a tué votre équipe - vous êtes le seul survivant. Vous connaissez des tunnels que même les cartes ignorent.',
        personal_secrets: 'Vous avez pactisé avec un esprit de la pierre pour survivre. Vous possédez un fragment de cristal qui pulse comme un cœur.',
        roleplay_hooks: [
            'Portez toujours une lanterne, même en plein jour',
            'Tapez les murs pour "écouter la pierre"',
            'Mangez lentement, comme si chaque repas pouvait être le dernier'
        ],
        starting_items: ['Pioche de mineur ébréchée', 'Casque avec lampe à huile', 'Corde de sécurité (50 pieds)', 'Poudre absorbante (urgence gaz)'],
        skill_bonuses: ['Connaissance (Géologie)', 'Escalade (Roche)']
    },

    // ===== SYLVE D'ÉMERAUDE (OUEST) =====
    {
        id: 'west_druid_circle',
        label: '🌳 Enfant du Cercle des Chênes',
        region: 'WEST',
        social_class: 'NOBILITY',
        desc: 'Né dans Sylmanir, la Cité Tissée, élevé par le Conseil des Chênes comme futur gardien.',
        lore: '"Les racines se souviennent. Les feuilles chantent. Seul l\'homme oublie." - Enseignement druidique',
        stats: { wis: 3, cha: 1, str: -2 },
        mechanical_traits: [
            { name: 'Parole Sylvestre', type: 'bonus', desc: 'Peut communiquer émotions simples avec plantes/animaux. +2 Dressage et Survie en forêt.' },
            { name: 'Rejet du Métal', type: 'penalty', desc: 'Porter armure/arme métallique provoque malaise (-2 tous jets pendant 1h après retrait).' }
        ],
        social_impacts: {
            pnj_reactions: 'Elfes et druides vous révèrent. Bûcherons et chasseurs vous craignent. Citadins vous trouvent "alien". Animaux vous font confiance.',
            reputation_bonus: { 'Cercle Druidique': 30, 'Peuple Elfe': 20, 'Ligue des Marchands': -10, 'Forge Éternelle': -15 }
        },
        gm_hooks: 'La forêt vous a envoyé en mission : trouver pourquoi la corruption s\'étend. Vous portez une graine d\'Arbre-Monde qui réagit aux failles. Un bûcheron cherche vengeance pour votre "sabotage".',
        personal_secrets: 'Vous avez consommé un fruit de l\'Arbre Interdit qui vous montre les auras de mort. Vous entendez les cris des arbres abattus.',
        roleplay_hooks: [
            'Parlez aux arbres avant d\'entrer dans une forêt',
            'Refusez catégoriquement de brûler du bois vert',
            'Plantez une graine partout où vous restez plus d\'une nuit'
        ],
        starting_items: ['Bâton de druide vivant (repousse des feuilles)', 'Sachet de graines sacrées', 'Robe de mousse tissée', 'Amulette de pierre-lune'],
        skill_bonuses: ['Connaissances (Nature)', 'Survie (Forêt)', 'Dressage'],
        languages: ['Sylvain', 'Druidique (secret)'],
        allies: ['Dryade tutrice', 'Aigle messager']
    },
    {
        id: 'west_elf_outcast',
        label: '🏹 Exilé de Sylmanir',
        region: 'WEST',
        social_class: 'OUTCAST',
        desc: 'Chassé de la Sylve pour un crime contre la nature, vous errez entre deux mondes.',
        lore: '"Celui qui coupe un Arbre-Monde ne retrouvera jamais l\'ombre de la forêt." - Malédiction elfique',
        stats: { dex: 2, con: 1, cha: -2 },
        mechanical_traits: [
            { name: 'Traqueur Silencieux', type: 'bonus', desc: '+3 Discrétion en milieu naturel. Avantage pour pistage.' },
            { name: 'Marqué par l\'Exil', type: 'penalty', desc: 'Animaux sauvages hostiles sauf jet Dressage DC 15. Plantes semblent se recroqueviller.' }
        ],
        social_impacts: {
            pnj_reactions: 'Elfes vous rejettent violemment. Humains vous accueillent avec méfiance. Chasseurs et rangers vous voient comme pair. Druides sentent votre "souillure".',
            reputation_bonus: { 'Peuple Elfe': -30, 'Cercle Druidique': -20, 'Loups d\'Hiver': 15, 'Bas-fonds': 10 }
        },
        gm_hooks: 'Votre crime était en réalité un coup monté. Un artefact volé est caché sur vous. Le Conseil vous a marqué magiquement - ils peuvent vous traquer. Vous cherchez rédemption.',
        personal_secrets: 'Vous n\'avez pas commis le crime dont on vous accuse. Vous avez vu qui l\'a fait - un membre du Conseil. Vous portez une malédiction qui tue lentement les plantes autour de vous.',
        roleplay_hooks: [
            'Évitez tout contact avec d\'autres elfes',
            'Cachez votre visage avec une capuche en forêt',
            'Parlez rarement de votre passé, avec douleur'
        ],
        starting_items: ['Arc long elfique (sans ornements)', 'Cape de camouflage déchirée', 'Flèches marquées d\'exil', 'Médaillon brisé (souvenir)'],
        enemies: ['Chasseurs elfiques envoyés pour vous tuer']
    },

    // ===== TERRES BRÛLÉES (SUD) =====
    {
        id: 'south_ash_survivor',
        label: '🔥 Survivant des Cendres',
        region: 'SOUTH',
        social_class: 'OUTCAST',
        desc: 'Né dans les ruines d\'Ashka, vous avez grandi dans un monde de désolation et démons.',
        lore: '"Dans les Cendres, on n\'apprend pas à vivre. On apprend à ne pas mourir." - Dicton des Terres Brûlées',
        stats: { con: 2, wis: 2, cha: -2 },
        mechanical_traits: [
            { name: 'Endurci par l\'Enfer', type: 'bonus', desc: 'Résistance mineure au feu et poison (3 dégâts absorbés). Avantage contre Peur de démons mineurs.' },
            { name: 'Marqué par les Cendres', type: 'penalty', desc: 'Peau grise et yeux rougeoyants. -3 Charisme en contexte "civilisé". Accusé de corruption démoniaque.' }
        ],
        social_impacts: {
            pnj_reactions: 'Vu comme maudit ou porteur de malheur. Paladins vous scrutent avec suspicion. Nécromanciens vous étudient. Autres survivants vous font confiance.',
            reputation_bonus: { 'Gardiens du Sceau': -15, 'Aube d\'Argent': -20, 'Cercle des Cendres': 15, 'Communauté des Réfugiés': 20 }
        },
        gm_hooks: 'Vous possédez une immunité partielle à une malédiction démoniaque spécifique. Vous entendez les murmures de la Faille la nuit. Un paladin cherche à "vous purifier".',
        personal_secrets: 'Vous avez du sang tieffelin caché. Vous avez mangé de la chair corrompue pour survivre. Un démon vous a épargné une fois - pourquoi ?',
        roleplay_hooks: [
            'Ne dormez jamais sans vérifier les ombres',
            'Portez des amulettes de protection obsessionnellement',
            'Méfiez-vous instinctivement de toute magie'
        ],
        starting_items: ['Dague en obsidienne (tranche la chair démoniaque)', 'Voile anti-cendres', 'Charbon "saint" (absorbe corruption)', 'Cicatrices rituelles visibles'],
        skill_bonuses: ['Survie (Terres désolées)', 'Connaissances (Plans/Démons)'],
        languages: ['Infernal (fragments)'],
        allies: ['Autre survivant des Cendres']
    },
    {
        id: 'south_tiefling_exile',
        label: '😈 Tieffelin Exilé',
        region: 'SOUTH',
        social_class: 'OUTCAST',
        desc: 'Descendant direct de l\'ère démoniaque, vous portez cornes et queue - stigmates de l\'Invasion.',
        lore: '"Nous ne sommes pas nos ancêtres. Mais le monde refuse de l\'oublier." - Lament tieffelin',
        stats: { cha: 2, int: 1, wis: -1 },
        mechanical_traits: [
            { name: 'Héritage Infernal', type: 'bonus', desc: 'Résistance feu (5 dégâts). Peut lancer *Thaumaturgie* à volonté. Vision dans le noir 60 pieds.' },
            { name: 'Stigmate Démoniaque', type: 'penalty', desc: 'Jets de Persuasion avec désavantage contre croyants/paladins. Détecté par *Détection du Mal*.' }
        ],
        social_impacts: {
            pnj_reactions: 'Rejeté violemment par 80% des communautés. Clergé hostile. Autres marginaux (half-orcs, drows) sympathisent. Cultistes corrompus vous approchent.',
            reputation_bonus: { 'Aube d\'Argent': -25, 'Clergé': -20, 'Syndicat de l\'Ombre': 15, 'Cercle des Cendres': 10, 'Bas-fonds': 10 }
        },
        gm_hooks: 'Un culte veut votre sang pour un rituel. Un paladin vous traque pour "nettoyer le monde". Vous avez une connexion involontaire avec la Faille. Un démon ancestral vous réclame.',
        personal_secrets: 'Vous pouvez parfois entendre les pensées démoniaques. Vos émotions extrêmes provoquent des flammes involontaires. Vous êtes secrètement terrifié par votre propre héritage.',
        roleplay_hooks: [
            'Cachez votre visage/cornes sous une capuche constamment',
            'Évitez les temples et sanctuaires',
            'Sursautez quand quelqu\'un prononce "démon"'
        ],
        starting_items: ['Cape avec capuche renforcée', 'Gants longs (cacher griffes)', 'Amulette de "purification" (inutile mais réconfortante)', 'Cicatrices de tentatives d\'exorcisme'],
        languages: ['Infernal'],
        enemies: ['Chasseur de démons', 'Fanatique religieux']
    }
];

// ============================================================================
// ÉTAPE 2 : ENFANCE - STRUCTURE FAMILIALE ET ÉVÉNEMENT FORMATEUR
// ============================================================================

export const CHILDHOOD_PATHS: ChildhoodPath[] = [
    // ===== FAMILLE INTACTE =====
    {
        id: 'childhood_noble_privilege',
        label: '👨‍👩‍👧 Éducation Privilégiée',
        family_type: 'INTACT',
        formative_event: 'MUNDANE',
        desc: 'Élevé dans une famille aimante et stable, avec tuteurs et mentors.',
        lore: '"La meilleure arme d\'un noble est l\'éducation. Un esprit affûté tranche plus profond que l\'acier." - Maxime aristocratique',
        stats: { int: 2, cha: 1 },
        mechanical_traits: [
            { name: 'Éducation Complète', type: 'bonus', desc: '+2 Connaissances (Histoire), +2 Connaissances (Noblesse). Parle/lit 2 langues supplémentaires.' },
            { name: 'Isolé du Réel', type: 'penalty', desc: '-2 Survie. Désavantage pour tâches manuelles (jamais appris).' }
        ],
        social_impacts: {
            pnj_reactions: 'Érudits vous respectent. Classes populaires vous trouvent "hors-sol". Bibliothécaires vous ouvrent sections réservées.',
            reputation_bonus: { 'Académie de Magie': 10, 'Noblesse': 10, 'Classe ouvrière': -10 }
        },
        gm_hooks: 'Un de vos tuteurs était en réalité un espion. Vous possédez un livre rare volé de la bibliothèque royale. Votre famille cache une honte liée à votre éducation.',
        personal_secrets: 'Vous avez secrètement lu des livres interdits sur la nécromancie. Vous détestez votre vie privilégiée et enviez la liberté des pauvres.',
        roleplay_hooks: [
            'Citez constamment des auteurs classiques',
            'Corrigez les erreurs historiques des autres',
            'Êtes fasciné par la "vie simple" du peuple'
        ],
        starting_items: ['Livre relié cuir (classique littéraire)', 'Plume d\'or et encrier portable', 'Lettre de recommandation d\'un tuteur célèbre'],
        skill_bonuses: ['Connaissances (Histoire)', 'Connaissances (Noblesse/Héraldique)'],
        languages: ['2 langues au choix (Elfique, Nain, Céleste, Infernal)']
    },
    {
        id: 'childhood_artisan_apprentice',
        label: '🔨 Apprentissage Familial',
        family_type: 'INTACT',
        formative_event: 'MUNDANE',
        desc: 'Élevé dans l\'atelier familial, apprenant un métier de génération en génération.',
        lore: '"Le sang transmet le savoir. Les mains transmettent l\'âme." - Proverbe artisan',
        stats: { dex: 1, int: 1, con: 1 },
        mechanical_traits: [
            { name: 'Métier de Famille', type: 'bonus', desc: '+3 en un Artisanat au choix (Forge, Alchimie, Couture, Menuiserie, etc.). Peut créer objets simples sans outils.' },
            { name: 'Mains Spécialisées', type: 'penalty', desc: '-1 en Artisanat différent du métier familial (habitudes ancrées).' }
        ],
        social_impacts: {
            pnj_reactions: 'Artisans vous traitent en pair. Guildes vous offrent adhésion. Nobles vous voient comme "utile mais inférieur".',
            reputation_bonus: { 'Guilde des Artisans': 15, 'Forge Éternelle': 10, 'Ligue des Marchands': 10 }
        },
        gm_hooks: 'Votre famille possède un secret de fabrication ancestral. Un concurrent cherche à voler vos techniques. Vous devez créer un chef-d\'œuvre pour honorer votre lignée.',
        personal_secrets: 'Vous avez brisé l\'œuvre de votre père par jalousie. Vous rêvez d\'abandonner le métier pour l\'aventure.',
        roleplay_hooks: [
            'Examinez la qualité de fabrication de tout objet artisanal',
            'Proposez systématiquement de réparer l\'équipement du groupe',
            'Parlez de votre famille avec fierté (ou amertume)'
        ],
        starting_items: ['Outils de maître (métier familial)', 'Tablier de travail usé mais précieux', 'Premier objet fabriqué (qualité médiocre, valeur sentimentale)'],
        skill_bonuses: ['1 Artisanat au choix']
    },

    // ===== FAMILLE BRISÉE =====
    {
        id: 'childhood_parents_war',
        label: '⚔️ Parents Morts à la Guerre',
        family_type: 'BROKEN',
        formative_event: 'TRAGEDY',
        desc: 'Vos parents sont tombés lors d\'un conflit frontalier. Élevé par des proches réticents.',
        lore: '"La guerre ne tue pas que les soldats. Elle assassine les familles." - Épitaphe commune',
        stats: { con: 2, str: 1, cha: -1 },
        mechanical_traits: [
            { name: 'Résilient Émotionnel', type: 'bonus', desc: 'Avantage contre Peur et Charme (habitué à la douleur). +2 Intimidation (regard dur).' },
            { name: 'Problèmes d\'Abandon', type: 'penalty', desc: '-2 Persuasion (difficulté à faire confiance). Si allié tombe K.O., jet Sagesse DC 12 ou rage incontrôlée.' }
        ],
        social_impacts: {
            pnj_reactions: 'Vétérans sympathisent. Orphelins vous voient comme modèle. Politiciens évitent votre regard accusateur.',
            reputation_bonus: { 'Légion d\'Acier': 15, 'Loups d\'Hiver': 10, 'Pacifistes': -10 }
        },
        gm_hooks: 'Vous cherchez l\'officier qui a donné l\'ordre suicidaire. Vous possédez la dernière lettre de votre père, codée. Un général cherche à "compenser" en vous recrutant.',
        personal_secrets: 'Vous ne pleurez jamais - vous avez "oublié comment". Vous portez l\'arme brisée de votre père. Vous détestez secrètement les nobles qui n\'ont jamais combattu.',
        roleplay_hooks: [
            'Ne parlez jamais de vos parents sauf sous alcool',
            'Honorez chaque soldat tombé que vous croisez',
            'Méprisez ouvertement les lâches et déserteurs'
        ],
        starting_items: ['Médaille de guerre des parents', 'Lettre d\'adieu jaunie', 'Épée/arc émoussé (héritage)'],
        allies: ['Vétéran ami de vos parents']
    },
    {
        id: 'childhood_plague',
        label: '💀 Épidémie de la Mort Noire',
        family_type: 'BROKEN',
        formative_event: 'TRAGEDY',
        desc: 'Une maladie magique a décimé votre famille et quartier. Vous êtes l\'un des rares survivants.',
        lore: '"La Mort Noire ne choisit pas. Elle prend tout - sauf les marqués." - Chronique médicale',
        stats: { con: 2, wis: 1, cha: -1 },
        mechanical_traits: [
            { name: 'Immunité Partielle', type: 'bonus', desc: 'Résistance aux maladies naturelles. Avantage jets sauvegarde contre poison/maladie magique.' },
            { name: 'Marqué par la Peste', type: 'penalty', desc: 'Cicatrices/marques noires visibles. -2 Charisme. PNJ superstitieux vous évitent.' }
        ],
        social_impacts: {
            pnj_reactions: 'Médecins vous étudient. Malades vous demandent aide. Superstitieux vous chassent. Prêtres vous bénissent ou exorcisent.',
            reputation_bonus: { 'Guilde des Médecins': 15, 'Clergé': 10, 'Population rurale': -15 }
        },
        gm_hooks: 'La maladie n\'était pas naturelle - c\'était une arme biologique. Vous portez des anticorps précieux. Un nécromancien cherche votre sang. Vous faites des rêves prémonitoires de futures épidémies.',
        personal_secrets: 'Vous avez volé des remèdes pour votre famille, laissant d\'autres mourir. Vous entendez parfois les voix des morts. Vous êtes terrifié par les espaces clos (souvenirs des fosses communes).',
        roleplay_hooks: [
            'Lavez-vous compulsivement les mains',
            'Portez toujours un masque/foulard près du visage',
            'Paniquez légèrement en cas de toux/fièvre chez autrui'
        ],
        starting_items: ['Masque de médecin de peste', 'Fiole de vinaigre antiseptique', 'Liste des morts (souvenir)'],
        skill_bonuses: ['Connaissances (Médecine)', 'Premiers soins']
    },

    // ===== ORPHELIN =====
    {
        id: 'childhood_street_rat',
        label: '🐀 Rat des Rues',
        family_type: 'ORPHAN',
        formative_event: 'MUNDANE',
        desc: 'Livré à vous-même dès l\'âge de 5 ans, la rue a été votre seule école.',
        lore: '"La rue enseigne trois choses : voler, mentir, survivre. Les faibles n\'ont pas de quatrième leçon." - Loi du caniveau',
        stats: { dex: 2, cha: 1, con: 1, int: -1 },
        mechanical_traits: [
            { name: 'Instinct de Survie', type: 'bonus', desc: '+2 Escamotage, +2 Discrétion en milieu urbain. Peut trouver nourriture/abri dans toute ville.' },
            { name: 'Analphabète', type: 'penalty', desc: 'Ne sait pas lire/écrire (sauf apprentissage ultérieur). -2 Connaissances (Érudition).' }
        ],
        social_impacts: {
            pnj_reactions: 'Mendiants et voleurs vous font confiance. Garde urbaine vous surveille. Marchands cachent leurs marchandises. Autres orphelins cherchent protection.',
            reputation_bonus: { 'Syndicat de l\'Ombre': 20, 'Guilde des Voleurs': 15, 'Garde Royale': -20, 'Noblesse': -15 }
        },
        gm_hooks: 'Vous devez une grosse dette à un parrain de la pègre. Vous connaissez les entrées secrètes de la ville. Un marchand vous a autrefois aidé - il est en danger.',
        personal_secrets: 'Vous avez tué quelqu\'un pour survivre (accident ou légitime défense). Vous rêvez d\'une vie "normale" avec une famille. Vous avez un frère/sœur perdu que vous cherchez.',
        roleplay_hooks: [
            'Volez compulsivement des petits objets inutiles',
            'Cachez toujours un peu de nourriture sur vous',
            'Dormez léger, main sur dague, dos au mur'
        ],
        starting_items: ['Dague rouillée (premier vol)', 'Couverture trouée (seule possession)', 'Sifflet de code (communication bande de rue)'],
        allies: ['Ancien camarade de rue'],
        enemies: ['Rival de bande adverse']
    },
    {
        id: 'childhood_temple_foundling',
        label: '⛪ Enfant du Temple',
        family_type: 'ORPHAN',
        formative_event: 'MIRACLE',
        desc: 'Abandonné sur les marches d\'un temple, élevé par les prêtres comme don des dieux.',
        lore: '"Les dieux placent certains enfants où ils sont nécessaires." - Dogme du Clergé',
        stats: { wis: 2, int: 1, str: -1 },
        mechanical_traits: [
            { name: 'Bénédiction Divine', type: 'bonus', desc: '+1 à tous jets de sauvegarde. Peut lancer *Bénédiction* 1/jour (sur soi uniquement).' },
            { name: 'Vœu de Pauvreté', type: 'penalty', desc: 'Possède max 10 po de biens personnels (au-delà = malaise moral). Si plus, -2 jets de Sagesse.' }
        ],
        social_impacts: {
            pnj_reactions: 'Fidèles vous vénèrent comme "béni". Hérétiques vous ciblent. Prêtres vous testent constamment. Pauvres vous demandent miracles.',
            reputation_bonus: { 'Clergé': 25, 'Culte de Solarius': 20, 'Cercle des Cendres': -25, 'Syndicat de l\'Ombre': -15 }
        },
        gm_hooks: 'Vous êtes prophétisé pour accomplir une "grande œuvre". Un symbole divin est apparu sur votre corps à 13 ans. Un culte hérétique cherche à vous corrompre ou tuer.',
        personal_secrets: 'Vous doutez secrètement de votre foi. Vous avez entendu la "voix de Dieu" une fois - ou étiez-vous fou ? Vos véritables parents étaient des hérétiques.',
        roleplay_hooks: [
            'Priez à voix haute avant chaque action importante',
            'Donnez systématiquement l\'aumône aux pauvres',
            'Ne mentez jamais (trouvez des vérités détournées)'
        ],
        starting_items: ['Symbole sacré en bois simple', 'Robe de novice usée', 'Livre de prières (premier cadeau)', 'Pain béni'],
        skill_bonuses: ['Connaissances (Religion)', 'Premiers soins'],
        languages: ['Céleste (prières)']
    },

    // ===== DÉCOUVERTE MAGIQUE =====
    {
        id: 'childhood_wild_magic',
        label: '✨ Éveil Magique Sauvage',
        family_type: 'INTACT',
        formative_event: 'DISCOVERY',
        desc: 'À 8 ans, vos émotions ont déclenché une explosion magique incontrôlée.',
        lore: '"La magie sauvage n\'est pas un don. C\'est une malédiction qui attend de s\'éveiller." - Traité arcanique',
        stats: { int: 2, cha: 1, wis: -1 },
        mechanical_traits: [
            { name: 'Intuition Magique', type: 'bonus', desc: '+3 pour identifier sorts/objets magiques. Sent présence magie 30 pieds.' },
            { name: 'Magie Instable', type: 'penalty', desc: 'Sur 1 naturel en jet de sort, effet aléatoire (table Magie Sauvage). -2 Concentration si émotions fortes.' }
        ],
        social_impacts: {
            pnj_reactions: 'Mages vous recrutent ou vous craignent. Inquisition vous surveille. Gens ordinaires nerveux près de vous. Enfants fascinés.',
            reputation_bonus: { 'Guilde Arcanique': 15, 'Inquisition': -15, 'Population rurale': -10 }
        },
        gm_hooks: 'L\'explosion a blessé quelqu\'un (ami/famille). Un mage noir cherche à exploiter votre instabilité. Vous êtes lié involontairement à un plan élémentaire.',
        personal_secrets: 'Vous avez tué accidentellement votre animal de compagnie. Vous entendez des voix du plan Astral. Vous êtes terrifié par votre propre pouvoir.',
        roleplay_hooks: [
            'Portez des gants "isolants" magiques',
            'Évitez les fortes émotions (colère, peur)',
            'Tenez un journal de tous vos "incidents magiques"'
        ],
        starting_items: ['Gants de contrôle (psychologique)', 'Pierre anti-magie (inerte)', 'Lettre d\'avertissement de l\'Académie'],
        skill_bonuses: ['Connaissances (Arcanes)']
    },

    // ===== TRAHISON =====
    {
        id: 'childhood_mentor_betrayal',
        label: '🗡️ Trahison du Mentor',
        family_type: 'BROKEN',
        formative_event: 'BETRAYAL',
        desc: 'Celui qui vous formait vous a vendu ou trahi pour son profit personnel.',
        lore: '"La plus grande leçon : ne jamais faire confiance complètement." - Maxime amère',
        stats: { wis: 2, int: 1, cha: -1 },
        mechanical_traits: [
            { name: 'Paranoïa Justifiée', type: 'bonus', desc: '+3 Perspicacité (détecter mensonges/intentions). Avantage Initiative (toujours sur garde).' },
            { name: 'Problèmes de Confiance', type: 'penalty', desc: '-2 Persuasion (ton méfiant). Difficulté à accepter aide sincère (jet Sagesse DC 12).' }
        ],
        social_impacts: {
            pnj_reactions: 'Vu comme cynique et distant. Espions vous respectent. Naïfs vous agacent. Autres victimes de trahison sympathisent.',
            reputation_bonus: { 'Syndicat de l\'Ombre': 10, 'Réseau d\'Espionnage': 15, 'Clergé': -10 }
        },
        gm_hooks: 'Votre ancien mentor est toujours vivant - et puissant. Vous cherchez vengeance. Vous possédez des preuves de sa corruption. Il a des alliés qui vous traquent.',
        personal_secrets: 'Vous avez juré de ne jamais refaire confiance - mais vous le voulez désespérément. Vous testez constamment la loyauté de vos alliés. Vous avez tué le mentor (ou échoué à le faire).',
        roleplay_hooks: [
            'Vérifiez toujours les contrats/accords deux fois',
            'Ne tournez jamais complètement le dos à un "ami"',
            'Questionnez les motivations de toute aide offerte'
        ],
        starting_items: ['Dague du mentor (prise lors de la fuite)', 'Lettre de trahison (preuve)', 'Cicatrice visible (souvenir physique)']
    }
];

// ============================================================================
// ÉTAPE 3 : ADOLESCENCE - FORMATION ET MENTOR
// ============================================================================

export const ADOLESCENCE_PATHS: AdolescencePath[] = [
    // ===== FORMATION MILITAIRE =====
    {
        id: 'adol_elite_academy',
        label: '⚔️ Académie des Épées (Élite)',
        training_type: 'MILITARY',
        mentor_quality: 'EXCELLENT',
        desc: 'Formation dans l\'académie militaire d\'élite de Sol-Aureus, sous général légendaire.',
        lore: '"Un soldat sans discipline est un criminel avec une épée." - Devise de l\'Académie',
        stats: { str: 2, con: 1, dex: 1 },
        mechanical_traits: [
            { name: 'Formation Martiale', type: 'bonus', desc: '+1 AC en armure. +2 Tactique/Combat de formation. Maîtrise 1 arme martiale supplémentaire.' },
            { name: 'Rigidité Mentale', type: 'penalty', desc: '-2 Improvisation. Suit ordres même questionnables (jet Sagesse DC 13 pour désobéir ordre direct).' }
        ],
        social_impacts: {
            pnj_reactions: 'Soldats vous saluent. Mercenaires jaloux. Nobles vous respectent. Pacifistes vous jugent.',
            reputation_bonus: { 'Légion d\'Acier': 20, 'Aube d\'Argent': 15, 'Garde Royale': 15, 'Pacifistes': -10 }
        },
        gm_hooks: 'Votre mentor est un héros de guerre - mais cache un crime de guerre. Vous avez un rival d\'académie dangereux. On vous offre un commandement précoce (piège politique ?).',
        personal_secrets: 'Vous avez triché lors de l\'examen final. Vous êtes secrètement pacifiste. Vous avez une romance interdite avec une recrue.',
        roleplay_hooks: [
            'Marchez au pas militaire en permanence',
            'Utilisez grades/protocoles même hors service',
            'Entretenez armes méticuleusement chaque soir'
        ],
        starting_items: ['Diplôme de l\'Académie', 'Épée de cérémonie gravée', 'Uniforme d\'officier', 'Lettre de recommandation du mentor'],
        skill_bonuses: ['Tactique militaire', 'Commandement', 'Histoire militaire'],
        allies: ['Général mentor', 'Camarades de promotion'],
        enemies: ['Rival d\'académie']
    },
    {
        id: 'adol_mercenary_band',
        label: '💰 Bande de Mercenaires',
        training_type: 'MILITARY',
        mentor_quality: 'HARSH',
        desc: 'Formé dans les Loups d\'Hiver, groupe de mercenaires brutaux mais efficaces.',
        lore: '"L\'or n\'a pas de loyauté. Nous non plus." - Credo des Loups d\'Hiver',
        stats: { str: 1, con: 2, cha: 1 },
        mechanical_traits: [
            { name: 'Combat Brutal', type: 'bonus', desc: '+2 dégâts corps-à-corps si ennemi blessé (50% PV). Avantage Intimidation en combat.' },
            { name: 'Sans Honneur', type: 'penalty', desc: '-2 Charisme avec paladins/nobles. Tentation de mercenariat (jet Sagesse DC 12 si offre lucrative).' }
        ],
        social_impacts: {
            pnj_reactions: 'Mercenaires vous accueillent. Soldats réguliers vous méprisent. Citoyens vous craignent. Employeurs potentiels vous courtisent.',
            reputation_bonus: { 'Loups d\'Hiver': 25, 'Légion d\'Acier': -10, 'Syndicat de l\'Ombre': 10, 'Noblesse': -5 }
        },
        gm_hooks: 'Vous devez une dette de sang à la bande. Un ancien contrat revient hanter le groupe. Vous avez déserté - ils vous cherchent. Vous connaissez leurs caches secrètes.',
        personal_secrets: 'Vous avez tué des innocents lors d\'un raid. Vous détestez ce que vous êtes devenu. Vous rêvez de quitter cette vie.',
        roleplay_hooks: [
            'Négociez tout en termes d\'or',
            'Méfiez-vous de toute "cause noble"',
            'Portez toujours une arme cachée'
        ],
        starting_items: ['Insigne des Loups d\'Hiver', 'Épée ébréchée (première victoire)', 'Bourse de paie (20 po)', 'Cicatrices nombreuses'],
        allies: ['Vieux mercenaire mentor'],
        enemies: ['Déserteurs chassés par la bande']
    },

    // ===== FORMATION ARCANIQUE =====
    {
        id: 'adol_magic_academy',
        label: '🔮 Académie Arcanique',
        training_type: 'ARCANE',
        mentor_quality: 'EXCELLENT',
        desc: 'Étudiant à l\'Académie de Magie de Sol-Aureus, temple du savoir mystique.',
        lore: '"La magie n\'est pas un pouvoir. C\'est une science qu\'il faut maîtriser." - Premier Principe Arcanique',
        stats: { int: 3, wis: 1, con: -1 },
        mechanical_traits: [
            { name: 'Formation Arcanique', type: 'bonus', desc: '+2 sorts connus. +3 Connaissances (Arcanes). Accès bibliothèque Académie (recherches).' },
            { name: 'Théoricien Fragile', type: 'penalty', desc: '-1 PV/niveau. -2 Athlétisme (vie sédentaire).' }
        ],
        social_impacts: {
            pnj_reactions: 'Mages vous respectent. Militaires vous trouvent "mou". Paysans vous craignent/admirent. Inquisition vous surveille.',
            reputation_bonus: { 'Guilde Arcanique': 30, 'Académie de Magie': 25, 'Inquisition': -10, 'Classe ouvrière': -5 }
        },
        gm_hooks: 'Vous avez volé un grimoire interdit. Un rival académique complote contre vous. Votre thèse pourrait révolutionner la magie... ou causer une catastrophe.',
        personal_secrets: 'Vous avez tué accidentellement un condisciple lors d\'un duel. Vous pratiquez la nécromancie en secret. Vous êtes un imposteur (pas de vrai talent).',
        roleplay_hooks: [
            'Analysez tout magiquement avant d\'agir',
            'Corrigez les "erreurs arcaniques" des autres lanceurs',
            'Prenez des notes compulsives sur chaque phénomène magique'
        ],
        starting_items: ['Diplôme d\'Académie', 'Baguette d\'apprenti', 'Robe de mage', 'Grimoire personnel (50 pages remplies)', 'Lunettes de lecture'],
        skill_bonuses: ['Connaissances (Arcanes)', 'Langues anciennes', 'Calligraphie magique'],
        languages: ['Draconique', '1 langue planaire au choix'],
        allies: ['Archimage mentor']
    },
    {
        id: 'adol_wild_sorcerer',
        label: '⚡ Sorcier Autodidacte',
        training_type: 'ARCANE',
        mentor_quality: 'ABSENT',
        desc: 'Magie innée développée seul, sans guide formel. Puissant mais dangereux.',
        lore: '"La magie née du sang ne se contrôle pas. Elle explose." - Avertissement des académies',
        stats: { cha: 3, con: 1, int: -1 },
        mechanical_traits: [
            { name: 'Magie Instinctive', type: 'bonus', desc: 'Sorts lancés avec Charisme (innés). +1 DC sorts si émotions fortes. Peut lancer sans composants verbaux.' },
            { name: 'Magie Sauvage', type: 'penalty', desc: 'Sur 1-2 naturel jet de sort, effet Magie Sauvage. -3 Connaissances (Arcanes) théoriques.' }
        ],
        social_impacts: {
            pnj_reactions: 'Mages formels vous méprisent. Gens ordinaires terrifiés. Autres sorciers innés sympathisent. Inquisition vous traque.',
            reputation_bonus: { 'Guilde Arcanique': -15, 'Inquisition': -20, 'Population rurale': -15, 'Cercle des Cendres': 10 }
        },
        gm_hooks: 'Votre pouvoir provient d\'une lignée maudite/bénie. Vous avez causé une catastrophe magique. Un démon/ange s\'intéresse à vous. Vous cherchez un mentor désespérément.',
        personal_secrets: 'Vos pouvoirs viennent d\'un pacte oublié. Vous perdez contrôle sous stress extrême. Vous détruisez accidentellement ce que vous aimez.',
        roleplay_hooks: [
            'Vos sorts changent selon vos émotions (couleur, effet visuel)',
            'Évitez les grandes foules (surcharge sensorielle magique)',
            'Portez des amulettes de "contrôle" (effet placebo)'
        ],
        starting_items: ['Cristal focus (fêlé)', 'Cicatrices de brûlures magiques', 'Journal de manifestations (désorganisé)', 'Objet détruit par accident (souvenir)'],
        enemies: ['Inquisiteur chasseur de mages sauvages']
    },

    // ===== FORMATION RELIGIEUSE =====
    {
        id: 'adol_temple_acolyte',
        label: '⛪ Acolyte du Temple',
        training_type: 'RELIGIOUS',
        mentor_quality: 'EXCELLENT',
        desc: 'Formé dans un temple majeur, destiné à devenir prêtre ou paladin.',
        lore: '"La foi sans action est morte. L\'action sans foi est chaos." - Doctrine cléricale',
        stats: { wis: 3, cha: 1, str: -1 },
        mechanical_traits: [
            { name: 'Faveur Divine', type: 'bonus', desc: '+2 sorts divins connus. Peut canaliser Énergie Divine 1/jour supplémentaire. +2 Connaissances (Religion).' },
            { name: 'Vœux Contraignants', type: 'penalty', desc: 'Doit suivre dogme de sa divinité strictement. Briser vœu = perte pouvoirs divins 24h.' }
        ],
        social_impacts: {
            pnj_reactions: 'Fidèles vous vénèrent. Hérétiques vous défient. Autres clergés jaloux ou alliés. Malades demandent miracles.',
            reputation_bonus: { 'Clergé (alignement similaire)': 25, 'Culte de Solarius': 20, 'Hérétiques': -20, 'Syndicat de l\'Ombre': -10 }
        },
        gm_hooks: 'Vous avez vu un miracle... ou une illusion ? Votre mentor cache un péché terrible. Vous êtes prophétisé pour accomplir une quête sacrée. Un culte rival veut vous corrompre.',
        personal_secrets: 'Vous doutez en secret de votre dieu. Vous avez enfreint un vœu majeur. Vous êtes secrètement attiré par l\'hérésie.',
        roleplay_hooks: [
            'Bénissez chaque repas et arme',
            'Prêchez aux incroyants (gentiment ou non)',
            'Portez symbole sacré visible en permanence'
        ],
        starting_items: ['Symbole sacré en argent', 'Robe de prêtre', 'Livre de prières annoté', 'Eau bénite (3 fioles)', 'Relique mineure'],
        skill_bonuses: ['Connaissances (Religion)', 'Diplomatie', 'Premiers soins'],
        languages: ['Céleste ou Infernal (selon alignement divinité)'],
        allies: ['Grand prêtre mentor']
    },
    {
        id: 'adol_heretic_cult',
        label: '🕯️ Initié d\'un Culte Interdit',
        training_type: 'RELIGIOUS',
        mentor_quality: 'CORRUPT',
        desc: 'Formé dans un culte hérétique, adorant des dieux oubliés ou des entités sombres.',
        lore: '"Les dieux officiels sont des chaînes. Les Anciens offrent la vraie liberté." - Credo hérétique',
        stats: { int: 2, wis: 1, cha: 1, con: -1 },
        mechanical_traits: [
            { name: 'Rites Interdits', type: 'bonus', desc: 'Connaît 1 sort de nécromancie gratuit. +3 Connaissances (Plans/Démons). Peut lancer *Détection de la Magie* à volonté.' },
            { name: 'Marqué par l\'Ombre', type: 'penalty', desc: 'Détecté par *Détection du Mal*. -3 Charisme avec clergé officiel. Cauchemars fréquents (-1 jets si repos perturbé).' }
        ],
        social_impacts: {
            pnj_reactions: 'Clergé vous chasse. Inquisition vous traque. Autres cultistes vous reconnaissent (signes secrets). Âmes damnées vous approchent.',
            reputation_bonus: { 'Cercle des Cendres': 20, 'Cultes interdits': 15, 'Clergé': -30, 'Inquisition': -35, 'Aube d\'Argent': -25 }
        },
        gm_hooks: 'Vous avez une marque cultuelle tatouée (impossible à cacher). Le culte vous traque pour vous ramener. Vous connaissez l\'emplacement du sanctuaire secret. Une entité vous réclame.',
        personal_secrets: 'Vous avez participé à un sacrifice (volontaire ou non). Vous entendez la voix de l\'"Ancien". Vous cherchez rédemption... ou pouvoir ultime.',
        roleplay_hooks: [
            'Priez secrètement à minuit (rituel)',
            'Évitez temples officiels (maux de tête)',
            'Portez symboles hérétiques cachés'
        ],
        starting_items: ['Grimoire du culte (crypté)', 'Dague rituelle', 'Robe noire', 'Marque cultuelle indélébile', 'Composants rituels interdits'],
        enemies: ['Inquisiteur', 'Chasseur de cultistes']
    },

    // ===== FORMATION CRIMINELLE =====
    {
        id: 'adol_thieves_guild',
        label: '🗡️ Guilde des Voleurs',
        training_type: 'CRIMINAL',
        mentor_quality: 'EXCELLENT',
        desc: 'Formé dans l\'élite du Syndicat de l\'Ombre, maître du vol et de l\'espionnage.',
        lore: '"Ce qui est à eux est à nous. Ce qui est à nous reste à nous." - Code des voleurs',
        stats: { dex: 3, int: 1, str: -1 },
        mechanical_traits: [
            { name: 'Maître Voleur', type: 'bonus', desc: '+3 Escamotage, +3 Discrétion, +2 Crochetage. Avantage pour désarmer pièges non-magiques.' },
            { name: 'Dette de Sang', type: 'penalty', desc: 'Doit 10% butin à la Guilde. Refus = contrat d\'assassinat. -2 Persuasion avec autorités (casier connu).' }
        ],
        social_impacts: {
            pnj_reactions: 'Voleurs vous respectent. Gardes vous surveillent. Marchands serrent bourses. Informateurs vous contactent.',
            reputation_bonus: { 'Syndicat de l\'Ombre': 30, 'Guilde des Voleurs': 25, 'Garde Royale': -20, 'Ligue des Marchands': -15 }
        },
        gm_hooks: 'Vous avez volé un artefact que vous ne pouvez revendre. Un contrat impossible vous est proposé. La Guilde a placé un espion dans votre groupe. Vous connaissez les secrets de nobles puissants.',
        personal_secrets: 'Vous avez trahi un camarade pour monter en grade. Vous êtes un informateur double-jeu. Vous rêvez de voler la Guilde elle-même.',
        roleplay_hooks: [
            'Évaluez automatiquement richesse et vulnérabilité des gens',
            'Ne donnez jamais votre vrai nom',
            'Vérifiez toujours les sorties de secours'
        ],
        starting_items: ['Outils de voleur de maître', 'Cape de camouflage', 'Insigne de la Guilde (caché)', 'Carnet de contacts', 'Gants en cuir fin'],
        skill_bonuses: ['Escamotage', 'Crochetage', 'Discrétion', 'Connaissances (Marché noir)'],
        languages: ['Cant (argot des voleurs)'],
        allies: ['Maître voleur mentor'],
        enemies: ['Rival de guilde']
    },
    {
        id: 'adol_assassin_training',
        label: '💀 Formation d\'Assassin',
        training_type: 'CRIMINAL',
        mentor_quality: 'HARSH',
        desc: 'Entraîné dans l\'art du meurtre silencieux et des poisons mortels.',
        lore: '"Tout homme a un prix. Tout homme a une faiblesse. Tout homme meurt." - Maxime des Lames',
        stats: { dex: 2, int: 1, con: 1, cha: -1 },
        mechanical_traits: [
            { name: 'Frappe Mortelle', type: 'bonus', desc: 'Dégâts doublés si attaque surprise et cible ne vous a pas vu. +2 jets avec poison.' },
            { name: 'Âme Froide', type: 'penalty', desc: '-2 tous jets de Charisme (regard vide, aura de mort). Difficulté à exprimer émotions.' }
        ],
        social_impacts: {
            pnj_reactions: 'Gens ordinaires mal à l\'aise près de vous. Criminels vous craignent/respectent. Gardes sentent vous êtes "dangereux". Clients potentiels vous approchent.',
            reputation_bonus: { 'Syndicat de l\'Ombre': 20, 'Guilde des Voleurs': 10, 'Toutes autorités': -25 }
        },
        gm_hooks: 'Vous avez refusé un contrat moral - prix sur votre tête. Votre première victime vous hante. Vous cherchez à sortir de cette vie. Un mentor vengeur vous traque.',
        personal_secrets: 'Vous comptez vos victimes (gravées sur lame). Vous prenez un trophée de chaque cible. Vous détestez ce que vous êtes mais ne savez rien faire d\'autre.',
        roleplay_hooks: [
            'Évaluez instinctivement points vitaux des gens',
            'Évitez contact visuel prolongé',
            'Portez toujours gants (cacher mains tachées métaphoriquement)'
        ],
        starting_items: ['Dague empoisonnée', 'Kit de poison (3 doses)', 'Masque d\'assassin', 'Liste de cibles passées (codée)', 'Cicatrices d\'entraînement brutal'],
        enemies: ['Famille d\'une ancienne victime', 'Maître assassin vengeur']
    },

    // ===== FORMATION ARTISANALE =====
    {
        id: 'adol_master_artisan',
        label: '🔨 Apprenti Artisan (Maître)',
        training_type: 'ARTISAN',
        mentor_quality: 'LEGENDARY',
        desc: 'Formé par un maître légendaire dans un artisanat d\'exception.',
        lore: '"L\'artisanat est prière. Chaque coup de marteau honore les ancêtres." - Sagesse naine',
        stats: { dex: 2, int: 2, con: 1 },
        mechanical_traits: [
            { name: 'Artisan de Légende', type: 'bonus', desc: '+4 en 1 Artisanat au choix. Peut créer objets *chefs-d\'œuvre* (bonus +1 permanent). Réduit temps/coût de 25%.' },
            { name: 'Perfectionniste', type: 'penalty', desc: 'Refuse d\'utiliser objets de qualité inférieure (-2 moral). Prend 50% plus de temps pour toute création.' }
        ],
        social_impacts: {
            pnj_reactions: 'Artisans vous révèrent. Nobles vous commandent œuvres. Guildes vous courtisent. Jaloux vous sabotent.',
            reputation_bonus: { 'Forge Éternelle': 25, 'Guilde des Artisans': 30, 'Ligue des Marchands': 15, 'Noblesse': 10 }
        },
        gm_hooks: 'Vous devez créer votre chef-d\'œuvre de maîtrise. Votre mentor vous a légué un secret de fabrication. Un rival veut voler vos techniques. Une commande royale vous est proposée.',
        personal_secrets: 'Vous avez brisé votre première œuvre par orgueil. Vous rêvez de forger l\'objet ultime. Vous avez tué accidentellement votre mentor (accident d\'atelier).',
        roleplay_hooks: [
            'Inspectez compulsivement qualité de tout équipement',
            'Proposez améliorations non-sollicitées',
            'Parlez à vos créations comme êtres vivants'
        ],
        starting_items: ['Outils de maître (signature gravée)', 'Première œuvre (qualité exceptionnelle)', 'Diplôme de maîtrise', 'Carnet de plans secrets', 'Tablier de maître'],
        skill_bonuses: ['1 Artisanat au choix +4', 'Évaluation (Œuvres d\'art)']
    },

    // ===== FORMATION SAUVAGE =====
    {
        id: 'adol_wild_hermit',
        label: '🌲 Ermite Sauvage',
        training_type: 'WILD',
        mentor_quality: 'ABSENT',
        desc: 'Années passées seul en nature, loin de toute civilisation.',
        lore: '"Les animaux ne mentent pas. Les arbres ne trahissent pas. Seul l\'homme est poison." - Philosophie d\'ermite',
        stats: { wis: 3, con: 2, cha: -2 },
        mechanical_traits: [
            { name: 'Un avec la Nature', type: 'bonus', desc: '+3 Survie. Peut parler avec animaux (empathie). Avantage pistage en milieu naturel. Trouve toujours nourriture/eau.' },
            { name: 'Inadapté Social', type: 'penalty', desc: '-3 Charisme en ville. Mal à l\'aise espaces clos (-2 jets). Ne comprend pas argent/commerce.' }
        ],
        social_impacts: {
            pnj_reactions: 'Vu comme fou ou prophète. Druides respectent. Chasseurs jalousent. Citadins craignent. Animaux font confiance.',
            reputation_bonus: { 'Cercle Druidique': 15, 'Tribus Nomades': 20, 'Toute civilisation': -15 }
        },
        gm_hooks: 'Vous avez vu quelque chose dans la forêt que personne ne croit. Un esprit de la nature vous a donné une quête. Vous cherchez un lieu mythique. La civilisation vous a expulsé (ou vous l\'avez fuie).',
        personal_secrets: 'Vous avez mangé de la chair pour survivre (tabou). Vous parlez à une "voix" que vous seul entendez. Vous préférez animaux aux humains (profondément).',
        roleplay_hooks: [
            'Préférez dormir dehors que dans un lit',
            'Parlez rarement, directement, sans fioritures',
            'Fasciné/dégoûté par objets manufacturés'
        ],
        starting_items: ['Bâton de marche (fidèle compagnon)', 'Peau d\'animal brute', 'Sac d\'herbes/baies', 'Compagnon animal (petit)', 'Amulette d\'os et plumes'],
        skill_bonuses: ['Survie', 'Dressage', 'Connaissance (Nature)', 'Pistage'],
        allies: ['Esprit de la nature (vague)']
    }
];

// ============================================================================
// ÉTAPE 4 : PASSÉ ADULTE - PROFESSION ET TRAUMATISME
// ============================================================================

export const ADULT_PAST: AdultPast[] = [
    // ===== MERCENAIRE =====
    {
        id: 'adult_veteran_merc',
        label: '⚔️ Mercenaire Vétéran',
        profession: 'MERCENARY',
        faction_affiliation: 'Loups d\'Hiver',
        reason_for_adventure: 'GREED',
        desc: '10 ans passés à vendre votre lame au plus offrant. Riche mais vide.',
        lore: '"J\'ai combattu pour 12 rois. Aucun ne méritait ma loyauté. Seul l\'or ne ment pas." - Confession de mercenaire',
        stats: { str: 1, con: 1, cha: 1 },
        mechanical_traits: [
            { name: 'Vétéran Aguerri', type: 'bonus', desc: '+15 PV permanents. +2 Initiative. Immunité Peur de niveau 1.' },
            { name: 'Cynique', type: 'penalty', desc: '-2 jets pour croire causes nobles. Tentation cupidité (jet Sagesse DC 13 si grosse somme offerte).' }
        ],
        social_impacts: {
            pnj_reactions: 'Mercenaires offrent contrats. Idéalistes vous méprisent. Nobles vous embauchent. Pauvres vous craignent.',
            reputation_bonus: { 'Loups d\'Hiver': 30, 'Légion d\'Acier': -10, 'Syndicat de l\'Ombre': 15 }
        },
        gm_hooks: 'Vous cherchez "un dernier gros coup". Ancien employeur veut vous éliminer (savez trop). Vous devez 10 000 po de dettes de jeu. Une victime vous hante.',
        personal_secrets: 'Vous avez massacré innocents lors d\'un raid. Vous donnez secrètement à un orphelinat. Vous rêvez d\'acheter une ferme et tout oublier.',
        roleplay_hooks: [
            'Négociez paiement avant toute aide',
            'Refusez toute mission "pour l\'honneur"',
            'Comptez votre or compulsivement'
        ],
        starting_items: ['Armure de guerre ébréchée', 'Bourse lourde (100 po)', 'Cicatrices innombrables', 'Carte de contrats passés', 'Flasque d\'alcool fort'],
        allies: ['Ancien camarade mercenaire'],
        enemies: ['Employeur trahi', 'Famille de victime']
    },

    // ===== ÉRUDIT =====
    {
        id: 'adult_scholar_cursed',
        label: '📜 Érudit Maudit',
        profession: 'SCHOLAR',
        faction_affiliation: 'Guilde Arcanique',
        reason_for_adventure: 'REDEMPTION',
        desc: 'Vos recherches ont ouvert quelque chose qu\'elles n\'auraient pas dû.',
        lore: '"Le savoir interdit n\'est pas dangereux par accident. Il est interdit pour protéger les fous curieux." - Avertissement ignoré',
        stats: { int: 2, wis: 1, con: -1 },
        mechanical_traits: [
            { name: 'Savoir Absolu', type: 'bonus', desc: '+5 toutes Connaissances. Peut tenter jet Connaissance même sans formation. 1/jour, réussit automatiquement jet Int.' },
            { name: 'Malédiction Arcanique', type: 'penalty', desc: 'Chaque matin, jet Sagesse DC 12 ou cauchemar (-1 jet jusqu\'au repos). Marque maudite visible (brille au clair de lune).' }
        ],
        social_impacts: {
            pnj_reactions: 'Érudits vous questionnent obsessivement. Inquisition vous surveille. Cultistes vous courtisent. Gens ordinaires sentent "quelque chose d\'étrange".',
            reputation_bonus: { 'Guilde Arcanique': 20, 'Cercle des Cendres': 15, 'Inquisition': -20 }
        },
        gm_hooks: 'Vous cherchez à briser votre malédiction. Une entité vous parle la nuit. Vos recherches pourraient sauver/détruire le monde. Académie vous a exilé.',
        personal_secrets: 'Vous avez libéré accidentellement un démon mineur. Vous entendez langues mortes. Vous savez comment ouvrir portails planaires (théoriquement).',
        roleplay_hooks: [
            'Prenez notes compulsives sur tout',
            'Citez obscures références que personne ne connaît',
            'Insomniaque (peur des cauchemars)'
        ],
        starting_items: ['Livre maudit (source du problème)', 'Marque mystique douloureuse', 'Lunettes fumées (cacher yeux changés)', 'Journal de recherches (crypté)', 'Fioles de sédatifs'],
        enemies: ['Entité invoquée', 'Chasseur de mages corrompus']
    },

    // ===== CRIMINEL =====
    {
        id: 'adult_master_thief',
        label: '🗡️ Maître Voleur Retraité',
        profession: 'CRIMINAL',
        faction_affiliation: 'Syndicat de l\'Ombre',
        reason_for_adventure: 'REVENGE',
        desc: 'Le "plus grand casse" a mal tourné. Tous sont morts sauf vous.',
        lore: '"On dit qu\'après le grand coup, on arrête. Mensonge. Il y a toujours un dernier coup." - Loi des voleurs',
        stats: { dex: 2, int: 1, cha: 1 },
        mechanical_traits: [
            { name: 'Maître Incontesté', type: 'bonus', desc: '+4 Escamotage/Discrétion/Crochetage. Peut crocheter serrures magiques (DC +5). Échappe automatiquement entraves normales.' },
            { name: 'Prix sur la Tête', type: 'penalty', desc: 'Recherché dans 3 royaumes (5000 po récompense). 1/session, rencontre chasseur de primes (événement RP).' }
        ],
        social_impacts: {
            pnj_reactions: 'Légende dans le milieu. Gardes ont votre portrait. Nobles ont renforcé sécurité. Jeunes voleurs idolâtrent.',
            reputation_bonus: { 'Syndicat de l\'Ombre': 35, 'Guilde des Voleurs': 30, 'Toutes autorités': -30 }
        },
        gm_hooks: 'Vous cherchez qui a trahi l\'équipe. Un artefact volé est maudit (ne peut s\'en débarrasser). Syndicat veut vous recruter/éliminer. Famille de victimes vous traque.',
        personal_secrets: 'Vous avez trahi votre équipe (ou l\'inverse). Vous possédez la clé d\'un trésor national. Vous tuez uniquement en légitime défense (code personnel).',
        roleplay_hooks: [
            'Analysez automatiquement sécurité de chaque lieu',
            'Volez objets inutiles par réflexe',
            'Portez toujours 3 déguisements dans sac'
        ],
        starting_items: ['Outils de voleur légendaires', 'Masque iconique', 'Artefact volé (maudit)', 'Carnet de caches secrètes', 'Fausse identité complète'],
        enemies: ['Chasseurs de primes (multiples)', 'Garde d\'élite', 'Traître présumé']
    },

    // ===== ARTISAN =====
    {
        id: 'adult_blacksmith',
        label: '⚒️ Forgeron de Village',
        profession: 'ARTISAN',
        faction_affiliation: 'Guilde des Artisans',
        reason_for_adventure: 'DUTY',
        desc: 'Votre village a été détruit. Vous forgez désormais pour protéger les autres.',
        lore: '"Chaque épée que je forge porte le poids de ceux que je n\'ai pas pu sauver." - Serment du forgeron',
        stats: { str: 2, con: 2, int: 1 },
        mechanical_traits: [
            { name: 'Forge de Guerre', type: 'bonus', desc: 'Peut réparer équipement en 10 min (au lieu d\'1h). Armes/armures forgées ont +1 durabilité. +3 Artisanat (Forge).' },
            { name: 'Traumatisme', type: 'penalty', desc: 'Flashbacks si voit incendie/destruction village (jet Sagesse DC 13 ou stunned 1 round). -2 jets si village en danger.' }
        ],
        social_impacts: {
            pnj_reactions: 'Villageois font confiance. Guerriers respectent craft. Nobles commandent armes. Survivants partagent votre douleur.',
            reputation_bonus: { 'Communauté Paysanne': 25, 'Forge Éternelle': 20, 'Légion d\'Acier': 15 }
        },
        gm_hooks: 'Vous cherchez qui a détruit village. Vous devez forger arme légendaire pour honorer les morts. Un survivant vous en veut (pas sauvé famille). Vous avez trouvé métal étrange dans ruines.',
        personal_secrets: 'Vous étiez absent lors de l\'attaque (survivant culpabilité). Vous avez forgé arme qui a tué quelqu\'un de proche. Vous rêvez de vengeance chaque nuit.',
        roleplay_hooks: [
            'Entretenez armes du groupe sans demander',
            'Offrez services gratuitement aux pauvres',
            'Évitez parler du passé (trop douloureux)'
        ],
        starting_items: ['Marteau de forge (arme improvisée)', 'Tablier brûlé (relique)', 'Métal mystérieux (fragment)', 'Liste des morts (portée toujours)', 'Outils de forge portables'],
        allies: ['Survivant du village']
    },

    // ===== VAGABOND =====
    {
        id: 'adult_wanderer',
        label: '🎒 Vagabond Éternel',
        profession: 'WANDERER',
        reason_for_adventure: 'CURIOSITY',
        desc: 'Vous avez voyagé partout, cherchant une vérité insaisissable.',
        lore: '"Je ne cherche pas un lieu. Je cherche une réponse à une question que je ne connais pas encore." - Journal de vagabond',
        stats: { con: 2, wis: 2, str: -1 },
        mechanical_traits: [
            { name: 'Voyageur Expérimenté', type: 'bonus', desc: '+3 Survie. Connaît 1 contact utile dans chaque grande ville. Parle 3 langues supplémentaires. Ignore terrain difficile.' },
            { name: 'Sans Attaches', type: 'penalty', desc: '-2 Charisme pour relations longues (ne reste jamais). Difficulté à accumuler richesse (dépense tout).' }
        ],
        social_impacts: {
            pnj_reactions: 'Aubergistes offrent lit gratuit. Voyageurs partagent rumeurs. Autorités méfiantes (pas de "papiers"). Bardes vous interrogent.',
            reputation_bonus: {}
        },
        gm_hooks: 'Vous cherchez un lieu mythique. Vous collectionnez fragments de carte ancienne. Quelqu\'un de votre passé vous rattrape. Vous possédez indice crucial sans le savoir.',
        personal_secrets: 'Vous fuyez quelque chose (pas quelqu\'un). Vous avez vu "la vérité" une fois (vision mystique). Vous savez que rester quelque part = danger.',
        roleplay_hooks: [
            'Partez toujours avant l\'aube',
            'Ne possédez que ce que vous pouvez porter',
            'Racontez histoires de lieux lointains'
        ],
        starting_items: ['Sac à dos usé (trésor)', 'Carte annotée de multiples mains', 'Souvenirs de 20 villes', 'Bâton de marche fidèle', 'Carnet de voyage (500 pages)'],
        languages: ['3 langues au choix']
    },

    // ===== CLERGÉ =====
    {
        id: 'adult_fallen_priest',
        label: '⛪ Prêtre Déchu',
        profession: 'CLERGY',
        faction_affiliation: 'Culte de Solarius (ancien)',
        reason_for_adventure: 'EXILE',
        desc: 'Vous avez questionné votre foi. Le temple vous a banni.',
        lore: '"Un dieu qui exige obéissance aveugle n\'est pas un dieu. C\'est un tyran." - Derniers mots au temple',
        stats: { wis: 2, cha: 1, int: 1 },
        mechanical_traits: [
            { name: 'Foi Brisée mais Forte', type: 'bonus', desc: 'Garde pouvoirs divins (canalisation). +3 Connaissances (Religion). Peut détecter mensonges dogmatiques.' },
            { name: 'Hérétique', type: 'penalty', desc: '-3 Charisme avec clergé officiel. Accusé de corruption. -2 jets si près temple de son ancienne foi.' }
        ],
        social_impacts: {
            pnj_reactions: 'Fidèles confus. Hérétiques vous accueillent. Inquisition vous traque modérément. Philosophes vous interrogent.',
            reputation_bonus: { 'Ancien culte': -25, 'Cultes alternatifs': 15, 'Inquisition': -15, 'Philosophes': 10 }
        },
        gm_hooks: 'Vous cherchez nouvelle voie spirituelle. Vous possédez preuve de corruption du clergé. Ancien mentor veut vous "sauver". Vous êtes prophétisé (ironiquement).',
        personal_secrets: 'Vous avez vu votre dieu mentir (ou hallucination ?). Vous aimez toujours votre foi (complexe). Vous détestez institution, pas divinité.',
        roleplay_hooks: [
            'Questionnez toute autorité religieuse',
            'Portez symbole sacré caché (nostalgie)',
            'Défendez les opprimés par dogmes'
        ],
        starting_items: ['Robe déchirée', 'Symbole sacré renié', 'Lettre d\'excommunication', 'Écrits hérétiques personnels', 'Cicatrices de flagellation'],
        enemies: ['Ancien mentor', 'Inquisiteur modéré']
    },

    // ===== RAISONS D\'AVENTURE ADDITIONNELLES =====
    {
        id: 'adult_revenge_obsessed',
        label: '🔥 Vengeur Obsédé',
        profession: 'MERCENARY',
        reason_for_adventure: 'REVENGE',
        desc: 'Quelqu\'un a détruit votre vie. Vous le traquerez jusqu\'aux Enfers.',
        lore: '"La vengeance est froide. Elle attend. Elle n\'oublie jamais." - Mantra répété',
        stats: { str: 1, con: 1, wis: 1, cha: -1 },
        mechanical_traits: [
            { name: 'Rage Froide', type: 'bonus', desc: 'Contre votre cible désignée : +3 dégâts, Avantage pistage. Ne fuit jamais combat contre elle.' },
            { name: 'Obsession', type: 'penalty', desc: 'Difficile de penser à autre chose (-2 Perspicacité hors vengeance). Si opportunité vengeance apparaît, jet Sagesse DC 15 pour ne pas tout abandonner.' }
        ],
        social_impacts: {
            pnj_reactions: 'Vu comme dangereux et instable. Autres vengeurs sympathisent. Pacifistes tentent vous dissuader. Mercenaires offrent aide (pour prix).',
            reputation_bonus: { 'Loups d\'Hiver': 10, 'Pacifistes': -15 }
        },
        gm_hooks: 'Votre cible est puissante/protégée. Vous avez sacrifié tout pour cette traque. Autres victimes de votre cible vous contactent. Vengeance = mort certaine mais acceptée.',
        personal_secrets: 'Vous savez que vengeance ne comblera pas vide. Vous avez déjà tué innocents par erreur. Vous êtes terrifié de réussir (après, que reste-t-il ?).',
        roleplay_hooks: [
            'Parlez constamment de votre cible',
            'Entretenez obsessionnellement arme de vengeance',
            'Refusez plaisirs (pas mérité avant vengeance)'
        ],
        starting_items: ['Portrait/description de cible', 'Arme gravée "Pour [Nom]"', 'Journal de traque (indices)', 'Objet relique (souvenir de ce qui fut détruit)'],
        enemies: ['Cible de vengeance + alliés']
    },

    {
        id: 'adult_redemption_seeker',
        label: '🕊️ Chercheur de Rédemption',
        profession: 'WANDERER',
        reason_for_adventure: 'REDEMPTION',
        desc: 'Vous avez commis l\'impardonnable. Vous cherchez à racheter votre âme.',
        lore: '"Je ne peux effacer le passé. Mais je peux mourir en essayant de le compenser." - Vœu solennel',
        stats: { wis: 2, con: 1, cha: 1 },
        mechanical_traits: [
            { name: 'Pénitent', type: 'bonus', desc: 'Avantage jets sauvegarde contre Charme/Peur (accepte sort). +2 Premiers soins (compense mort causée). Peut réussir jet héroïque critique 1/jour.' },
            { name: 'Fardeau du Passé', type: 'penalty', desc: 'Cauchemars fréquents (-1 jet après mauvais repos). -2 Charisme si passé révélé. Difficile de se pardonner (jet Sagesse DC 14 pour accepter récompense non-méritée).' }
        ],
        social_impacts: {
            pnj_reactions: 'Prêtres offrent confession. Victimes similaires empathisent. Juges vous donnent seconde chance. Cyniques vous moquent.',
            reputation_bonus: { 'Clergé': 10, 'Communauté Réfugiés': 15, 'Syndicat de l\'Ombre': -10 }
        },
        gm_hooks: 'Votre crime passé resurgit. Famille de victime apparaît. Vous cherchez moyen de "vraiment" expier. Un saint/sage vous guide. Sacrifice ultime vous est proposé.',
        personal_secrets: 'Vous ne croyez pas rédemption possible (mais essayez quand même). Vous vous punissez secrètement (jeûnes, flagellation). Vous cherchez mort héroïque.',
        roleplay_hooks: [
            'Refusez systématiquement récompenses ("pas mérité")',
            'Prenez tous les risques pour sauver autrui',
            'Confessez votre crime à chaque nouveau compagnon'
        ],
        starting_items: ['Chaînes portées sous vêtements (pénitence)', 'Liste de victimes passées', 'Symbole sacré (espoir)', 'Cicatrices auto-infligées'],
        allies: ['Prêtre compatissant']
    }
];

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Récupère toutes les options pour une étape donnée
 */
export function getOptionsForStep(step: 1 | 2 | 3 | 4): LifePathStepOption[] {
    switch (step) {
        case 1: return BIRTH_ORIGINS;
        case 2: return CHILDHOOD_PATHS;
        case 3: return ADOLESCENCE_PATHS;
        case 4: return ADULT_PAST;
    }
}

/**
 * Calcule les bonus cumulés de tous les choix
 */
export function calculateCumulativeEffects(
    origin: BirthOrigin,
    childhood: ChildhoodPath,
    adolescence: AdolescencePath,
    adult: AdultPast
) {
    const allChoices = [origin, childhood, adolescence, adult];
    
    // Stats cumulées
    const stats = {
        str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0
    };
    
    allChoices.forEach(choice => {
        if (choice.stats) {
            Object.keys(choice.stats).forEach(stat => {
                stats[stat] += choice.stats![stat] || 0;
            });
        }
    });
    
    // Traits mécaniques
    const mechanical_traits: MechanicalTrait[] = [];
    allChoices.forEach(choice => {
        mechanical_traits.push(...choice.mechanical_traits);
    });
    
    // Réputation cumulée
    const reputation: Record<string, number> = {};
    allChoices.forEach(choice => {
        Object.entries(choice.social_impacts.reputation_bonus).forEach(([faction, value]) => {
            reputation[faction] = (reputation[faction] || 0) + value;
        });
    });
    
    // Items de départ
    const starting_items: string[] = [];
    allChoices.forEach(choice => {
        if (choice.starting_items) {
            starting_items.push(...choice.starting_items);
        }
    });
    
    // Langues
    const languages: string[] = [];
    allChoices.forEach(choice => {
        if (choice.languages) {
            languages.push(...choice.languages);
        }
    });
    
    // Alliés et ennemis
    const allies: string[] = [];
    const enemies: string[] = [];
    allChoices.forEach(choice => {
        if (choice.allies) allies.push(...choice.allies);
        if (choice.enemies) enemies.push(...choice.enemies);
    });
    
    return {
        stats,
        mechanical_traits,
        reputation,
        starting_items,
        languages,
        allies,
        enemies,
        narrative_summary: generateNarrativeSummary(origin, childhood, adolescence, adult)
    };
}

/**
 * Génère un résumé narratif complet du parcours de vie
 */
function generateNarrativeSummary(
    origin: BirthOrigin,
    childhood: ChildhoodPath,
    adolescence: AdolescencePath,
    adult: AdultPast
): string {
    return `
**ORIGINE:** ${origin.label} - ${origin.region}
${origin.desc}

**ENFANCE:** ${childhood.label}
${childhood.desc}

**ADOLESCENCE:** ${adolescence.label}
${adolescence.desc}

**PASSÉ ADULTE:** ${adult.label}
${adult.desc}

**RAISON DE L'AVENTURE:** ${adult.reason_for_adventure}
    `.trim();
}
