/**
 * AETHELGARD - EXPANSION NPCs (Batch 1/3 - 50 personnages)
 * Types: Marchands spécialisés, Artisans légendaires, Figures d'autorité
 */

export const EXPANDED_NPCS_BATCH_1 = [
  // ============================================================================
  // MARCHANDS & ARTISANS LÉGENDAIRES (20 NPCs)
  // ============================================================================
  
  {
    id: 'npc_forgemaster_aldric',
    name: 'Maître-Forgeron Aldric Coeur-de-Fer',
    race: 'Nain',
    class: 'Artisan (Forgeron Niveau 95)',
    age: 347,
    role: 'merchant',
    personality: 'Perfectionniste obsessionnel, grognon mais généreux avec les apprentis',
    location: 'Hammerdeep - Niveau 7 (District des Forges)',
    description: `Un nain à la barbe argentée tressée avec des fils de mithril, les mains couvertes de cicatrices de forge. Ses yeux brillent d'une lueur rouge lorsqu'il examine un métal. Il porte un tablier de cuir de dragon ignifugé et un marteau runique à la ceinture.`,
    backstory: `Aldric est le dernier maître-forgeron formé par Thundrak en personne avant sa disparition. Il a passé 200 ans à perfectionner l'art de forger le mithril vivant — un alliage qui s'adapte à son porteur. Sa forge personnelle, alimentée par un fragment de noyau de volcan, peut atteindre des températures capables de fondre l'adamantine. Il refuse de forger des armes pour ceux qu'il juge indignes et soumet chaque client à un "test de caractère" avant d'accepter une commande.`,
    faction: 'faction_artisans_guilde',
    services: ['forge_weapons', 'forge_armor', 'repair_legendary', 'enchant_metal', 'teach_smithing'],
    inventory: [
      { name: 'Épée en Mithril Vivant', type: 'weapon', rarity: 'legendary', price: 15000, effect: '+5 Force, +5 Dextérité, s\'adapte au style de combat' },
      { name: 'Armure de Plates Runique', type: 'armor', rarity: 'epic', price: 8000, effect: '+10 AC, Résistance Feu/Froid' },
      { name: 'Marteau de Guerre Thundrak', type: 'weapon', rarity: 'artifact', price: 50000, effect: '+10 Force, Éclairs sur coup critique, Indestructible' },
      { name: 'Enclume Portative Enchantée', type: 'tool', rarity: 'rare', price: 2000, effect: 'Permet forge basique en voyage' }
    ],
    questsGiven: ['quest_aldric_masterwork', 'quest_thundrak_hammer_reforge'],
    dialogue: {
      greeting: `*grogne en levant les yeux de son enclume* "Encore un aventurier qui veut une 'arme magique'... Montre-moi tes mains. Si elles sont trop douces, tu n'es pas digne de mes créations."`,
      trade: `"Mon travail ne se paie pas qu'en or. Apporte-moi un défi. Une commande qui me fera repousser mes limites."`,
      quest: `"Tu veux apprendre? Alors va me chercher un fragment d'étoile filante dans les Monts du Crépuscule. Si tu survis, je te montrerai comment forger l'impossible."`,
      farewell: `"N'abîme pas mon œuvre. Si tu reviens avec une lame brisée par négligence, je te brise les rotules."`
    },
    reputation: {
      required: 50,
      faction: 'faction_artisans_guilde'
    },
    tradingTips: `Aldric respecte la persévérance. Revenez plusieurs fois, acceptez ses tests. Il baisse ses prix de 30% après 3 achats réussis.`
  },

  {
    id: 'npc_alchemist_seraphine',
    name: 'Séraphine la Distilleuse',
    race: 'Elfe Noir (exilée)',
    class: 'Alchimiste Niveau 88',
    age: 412,
    role: 'merchant',
    personality: 'Cynique, sarcastique, mais cache un cœur compatissant',
    location: 'Sol-Aureus - Quartier des Ombres (Laboratoire caché)',
    description: `Une elfe noire aux cheveux blancs coupés court, portant des lunettes de protection alchimiques et un masque à gaz sur le côté. Ses mains sont tachées de réactifs colorés et elle sent constamment les herbes et le soufre. Elle porte une sacoche remplie de fioles qui cliquettent à chaque mouvement.`,
    backstory: `Exilée de la Cité Souterraine après avoir refusé de créer une arme biologique pour assassiner la reine elfe, Séraphine s'est installée à Sol-Aureus sous une fausse identité. Son laboratoire secret, caché derrière une librairie de façade, est un trésor de connaissances alchimiques interdites. Elle vend ses potions aux aventuriers pour financer ses recherches sur un antidote universel — son rêve ultime de racheter ses péchés passés. Elle est activement recherchée par la Main Noire qui veut la forcer à travailler pour eux.`,
    faction: 'faction_exiles',
    services: ['brew_potions', 'craft_poisons', 'identify_substances', 'teach_alchemy', 'transmutation'],
    inventory: [
      { name: 'Élixir d\'Invisibilité Majeur', type: 'potion', rarity: 'epic', price: 3000, effect: 'Invisibilité totale 1h, indetectable' },
      { name: 'Poison de Wyverne Concentré', type: 'poison', rarity: 'rare', price: 800, effect: '3d10 dégâts poison, Paralysie (Con DC 18)' },
      { name: 'Philtre de Métamorphose', type: 'potion', rarity: 'legendary', price: 12000, effect: 'Change forme 24h, choix de créature' },
      { name: 'Grenade Alchimique Explosive', type: 'consumable', rarity: 'uncommon', price: 500, effect: '6d6 dégâts feu, rayon 4 cases' },
      { name: 'Antidote Universel', type: 'potion', rarity: 'very rare', price: 5000, effect: 'Soigne tout poison/maladie' }
    ],
    questsGiven: ['quest_seraphine_lab_defense', 'quest_universal_antidote', 'quest_dark_elf_hunters'],
    dialogue: {
      greeting: `*continue de mélanger un liquide verdâtre sans lever les yeux* "Si tu es là pour me dénoncer, la sortie est par là. Sinon, dis-moi ce que tu veux et dépêche-toi, j'ai un distillat qui va exploser dans 3 minutes."`,
      trade: `"Je ne vends qu'à ceux qui ne posent pas de questions. Tu vois quelque chose qui te plaît? Assure-toi de lire l'étiquette. Je ne rembourse pas les accidents mortels."`,
      quest: `*soupire* "La Main Noire m'a retrouvée. Ils ont envoyé des assassins. Si tu veux travailler avec moi, aide-moi à les éliminer... discrètement. Je ne peux pas attirer l'attention de la garde."`,
      farewell: `"Reviens en vie. Tu es un des rares clients qui n'est pas un crétin complet."`
    },
    reputation: {
      required: 0,
      faction: 'faction_exiles'
    },
    tradingTips: `Séraphine vend des items interdits. Complétez sa quête de défense pour débloquer ses produits les plus puissants.`
  },

  {
    id: 'npc_enchanter_valerius',
    name: 'Archimage Valerius l\'Enchanteur',
    race: 'Humain',
    class: 'Mage Niveau 92 (Spécialisation: Enchantement)',
    age: 78,
    role: 'merchant',
    personality: 'Excentrique, théâtral, obsédé par la beauté de la magie',
    location: 'Sol-Aureus - Tour Arcanique Étincelante',
    description: `Un homme élégant aux cheveux gris impeccablement coiffés, portant des robes brodées de runes lumineuses qui changent de couleur selon son humeur. Il parle avec des gestes amples et dramatiques. Ses doigts scintillent de bagues enchantées et il lévite parfois par habitude.`,
    backstory: `Valerius était autrefois le mage de cour de la Reine Elara, mais après avoir enchanté accidentellement la couronne royale pour qu'elle chante des opéras, il a été "poliment invité" à poursuivre ses recherches ailleurs. Sa tour est un labyrinthe de pièces enchantées avec des effets aléatoires — l'une inverse la gravité, une autre ralentit le temps. Il est le seul enchanteur vivant capable de tisser des enchantements à 5 runes, une technique considérée comme impossible par ses pairs.`,
    faction: 'faction_circle_des_arcanes',
    services: ['enchant_items', 'disenchant_items', 'identify_magic', 'teach_enchanting', 'custom_runes'],
    inventory: [
      { name: 'Rune de Puissance Majeure', type: 'enchantment', rarity: 'epic', price: 4000, effect: '+3 à une stat au choix' },
      { name: 'Rune de Flammes Éternelles', type: 'enchantment', rarity: 'rare', price: 2500, effect: 'Arme inflige +2d6 dégâts feu' },
      { name: 'Enchantement de Résilience', type: 'enchantment', rarity: 'very rare', price: 6000, effect: 'Armure +5 AC, régénère 5 HP/tour' },
      { name: 'Kit d\'Enchantement Portable', type: 'tool', rarity: 'uncommon', price: 1500, effect: 'Permet enchantements simples en voyage' }
    ],
    questsGiven: ['quest_valerius_crown_fix', 'quest_five_rune_mastery'],
    dialogue: {
      greeting: `*avec un flourish théâtral* "Bienvenue, bienvenue! Vous entrez dans le sanctuaire de l'art le plus raffiné d'Aethelgard! Dites-moi, êtes-vous ici pour sublimer votre équipement ou simplement admirer mon génie?"`,
      trade: `"Ah, vous avez bon goût! Cette pièce est exceptionnelle. Mais êtes-vous sûr de mériter une telle merveille? Montrez-moi que vous comprenez la BEAUTÉ de la magie!"`,
      quest: `*chuchote dramatiquement* "J'ai un petit problème... La couronne de la Reine chante toujours. Elle veut que je la répare discrètement. Mais j'ai besoin d'une Larme de Licorne pour défaire l'enchantement. Confidentiellement, bien sûr."`,
      farewell: `*s'incline avec grâce* "Que la magie illumine votre chemin, cher aventurier! Et n'oubliez pas : un enchantement mal entretenu est une insulte à l'art!"`
    },
    reputation: {
      required: 30,
      faction: 'faction_circle_des_arcanes'
    },
    tradingTips: `Valerius adore les compliments. Utilisez Charisme/Persuasion (DC 15) pour réduire ses prix de 20%.`
  },

  {
    id: 'npc_chef_marcellus',
    name: 'Chef Marcellus Bonel\'Estomac',
    race: 'Halfling',
    class: 'Cuisinier Légendaire Niveau 90',
    age: 65,
    role: 'merchant',
    personality: 'Passionné, perfectionniste, colérique en cuisine mais jovial avec les clients',
    location: 'Sol-Aureus - Restaurant "L\'Assiette d\'Or"',
    description: `Un halfling rond avec une moustache en guidon cirée, portant une toque de chef immaculée et un tablier taché de sauces exotiques. Il sent les épices rares et porte toujours un couteau de chef en mithril à sa ceinture. Ses yeux pétillent quand il parle de nourriture.`,
    backstory: `Marcellus a voyagé pendant 30 ans à travers Aethelgard pour découvrir tous les ingrédients légendaires. Il a cuisiné pour des rois, des dragons et même un liche (qui n'a rien mangé mais a apprécié le geste). Son restaurant 3 étoiles est réservé des mois à l'avance. Sa spécialité? Le "Festin du Conquérant" — un repas qui donne +10 à toutes les stats pendant 24h mais nécessite 14 ingrédients légendaires. Il cherche désespérément la dernière recette perdue : le Nectar des Dieux, dit capable de ressusciter les morts.`,
    faction: 'faction_artisans_guilde',
    services: ['cook_meals', 'cater_events', 'teach_cooking', 'buff_food'],
    inventory: [
      { name: 'Festin du Conquérant', type: 'food', rarity: 'legendary', price: 10000, effect: '+10 toutes stats 24h' },
      { name: 'Ragoût de Résistance', type: 'food', rarity: 'rare', price: 800, effect: '+5 Con, Résistance poison 8h' },
      { name: 'Soupe Mystique', type: 'food', rarity: 'epic', price: 3000, effect: '+100 MP, Régénération mana x2 12h' },
      { name: 'Pâtisserie de Chance', type: 'food', rarity: 'uncommon', price: 500, effect: '+2 aux jets de dés 4h' },
      { name: 'Café Éveillé', type: 'drink', rarity: 'common', price: 50, effect: 'Immunité sommeil 6h' }
    ],
    questsGiven: ['quest_marcellus_legendary_ingredient', 'quest_nectar_of_gods', 'quest_cook_off_challenge'],
    dialogue: {
      greeting: `*essuie son couteau avec un torchon* "Bienvenue à L'Assiette d'Or! Si vous êtes ici, c'est que vous avez du goût... ou que vous êtes perdu. Qu'est-ce qui vous ferait plaisir aujourd'hui?"`,
      trade: `"Ah, excellent choix! Ce plat nécessite 6 heures de préparation et des ingrédients qui coûtent plus cher que votre armure. Ça vaut CHAQUE pièce d'or, croyez-moi!"`,
      quest: `*baisse la voix* "Je cherche un ingrédient impossible : la Truffe Noire d'Arbre-Monde. On dit qu'elle ne pousse que tous les 100 ans dans la Sylve d'Émeraude. Trouvez-la, et je vous cuisinerai le repas de votre vie. GRATUITEMENT."`,
      farewell: `*sourire chaleureux* "Revenez vite! Et dites à vos amis que Marcellus ne cuisine que l'excellence!"`
    },
    reputation: {
      required: 20,
      faction: 'faction_artisans_guilde'
    },
    tradingTips: `Apportez-lui des ingrédients rares en cadeau. Il offre des réductions et des plats bonus.`
  },

  {
    id: 'npc_tailor_elindra',
    name: 'Elindra Fil-d\'Argent',
    race: 'Elfe',
    class: 'Tailleuse Maîtresse Niveau 82',
    age: 298,
    role: 'merchant',
    personality: 'Élégante, distante, perfectionniste absolue',
    location: 'Sol-Aureus - Boutique "Couture Céleste"',
    description: `Une elfe aux longs cheveux platine, portant une robe de soie enchantée qui change de motif toutes les heures. Ses doigts sont ornés de dés à coudre en or et elle porte des lunettes enchantées qui lui permettent de voir les défauts microscopiques dans les tissus.`,
    backstory: `Elindra est la seule tailleuse vivante capable de tisser des fibres d'Aether pur, créant des vêtements qui offrent des buffs magiques sans enchantement. Ses créations sont portées par la noblesse et les héros célèbres. Elle est obsédée par la symétrie parfaite et a déjà refusé de vendre à un roi parce qu'il avait "une posture asymétrique qui gâcherait son œuvre".`,
    faction: 'faction_artisans_guilde',
    services: ['tailor_clothes', 'repair_cloth_armor', 'enchant_fabrics', 'teach_tailoring'],
    inventory: [
      { name: 'Robe d\'Aether', type: 'armor', rarity: 'legendary', price: 18000, effect: '+8 Intelligence, +8 Sagesse, Lévitation permanente' },
      { name: 'Cape du Voyageur', type: 'cloak', rarity: 'epic', price: 5000, effect: '+5 Dextérité, Vitesse +50%' },
      { name: 'Gants de Précision', type: 'gloves', rarity: 'rare', price: 2000, effect: '+3 Dextérité, Coups critiques +10%' },
      { name: 'Foulard de Charme', type: 'accessory', rarity: 'uncommon', price: 800, effect: '+2 Charisme, Persuasion +5' }
    ],
    questsGiven: ['quest_elindra_aether_silk', 'quest_royal_commission'],
    dialogue: {
      greeting: `*vous jauge d'un regard glacial* "Hmm. Vous avez... du potentiel. Peut-être. Dites-moi, êtes-vous ici pour admirer mon travail ou pour l'acquérir?"`,
      trade: `"Cette pièce est unique. Je ne crée jamais deux fois la même chose. Si vous ne la prenez pas maintenant, quelqu'un d'autre aura cet honneur."`,
      quest: `"J'ai besoin de Soie d'Aether des Terres Brûlées. Les araignées éthérées en produisent, mais elles sont... difficiles. Rapportez-moi 10 bobines intactes et je vous ferai quelque chose d'exceptionnel."`,
      farewell: `*hochement de tête approbateur* "Portez mes créations avec dignité. Elles méritent mieux que d'être tachées de sang de gobelin."`
    },
    reputation: {
      required: 40,
      faction: 'faction_artisans_guilde'
    },
    tradingTips: `Elindra exige un style. Si votre réputation est excellente (>75), elle crée des pièces personnalisées.`
  },

  // ============================================================================
  // JOAILLIERS & EXPERTS EN GEMMES (3 NPCs)
  // ============================================================================

  {
    id: 'npc_jeweler_tharok',
    name: 'Tharok Mains-de-Cristal',
    race: 'Nain',
    class: 'Joaillier Niveau 85',
    age: 289,
    role: 'merchant',
    personality: 'Méticuleux, obsédé par la perfection des gemmes, superstitions nombreuses',
    location: 'Hammerdeep - Niveau 9 (Galerie des Gemmes)',
    description: `Un nain aux doigts étonnamment longs et délicats pour sa race, portant une loupe enchantée sur l'œil droit en permanence. Il manipule les gemmes avec des pinces en mithril et porte un tablier couvert de poussière de cristal scintillante.`,
    backstory: `Tharok a perdu sa main gauche dans un accident de taille de gemme. Un enchanteur lui a forgé une prothèse de cristal vivant qui peut "sentir" les imperfections des pierres. Il est le seul joaillier à avoir taillé un Diamant d'Étoile parfait — une gemme si pure qu'elle capture la lumière stellaire. Il croit que chaque gemme a une âme et refuse de travailler des pierres "malheureuses".`,
    faction: 'faction_artisans_guilde',
    services: ['craft_jewelry', 'cut_gems', 'socket_gems', 'identify_gems'],
    inventory: [
      { name: 'Anneau d\'Étoile', type: 'ring', rarity: 'legendary', price: 20000, effect: '+5 Sagesse, +5 Intelligence, Visions prophétiques 1x/jour' },
      { name: 'Collier de Régénération', type: 'necklace', rarity: 'epic', price: 7000, effect: 'Régénération 10 HP/tour' },
      { name: 'Boucles d\'Oreilles Élémentaires', type: 'earrings', rarity: 'rare', price: 3000, effect: 'Résistance 50% Feu/Froid/Foudre' },
      { name: 'Gemme Brute (Diamant)', type: 'crafting', rarity: 'rare', price: 2000, effect: 'Utilisable pour enchantements' }
    ],
    questsGiven: ['quest_tharok_star_diamond', 'quest_cursed_gemstone'],
    dialogue: {
      greeting: `*examine une gemme avec sa loupe sans lever les yeux* "Chut. Je parle avec elle. ... Bien. Que voulez-vous?"`,
      trade: `*caresse doucement la gemme* "Cette pierre vous a choisi. Je le sens. Ne me demandez pas comment, c'est... une connexion spirituelle."`,
      quest: `*voix tremblante* "Une gemme maudite circule à Sol-Aureus. Elle murmure des mensonges et corrompt son porteur. Je dois la détruire avant qu'elle ne fasse plus de mal. Trouvez-la. S'il vous plaît."`,
      farewell: `"Que les gemmes illuminent votre chemin. Et ne les laissez jamais toucher le sol — ça porte malheur!"`
    },
    reputation: {
      required: 25,
      faction: 'faction_artisans_guilde'
    },
    tradingTips: `Tharok apprécie les gemmes brutes en cadeau. Offrez-en 3 pour débloquer ses services de taille custom.`
  },

  {
    id: 'npc_herborist_nyssa',
    name: 'Nyssa Feuille-de-Lune',
    race: 'Demi-Elfe',
    class: 'Herboriste & Druide Niveau 78',
    age: 142,
    role: 'merchant',
    personality: 'Douce, mystique, parle aux plantes comme à des amis',
    location: 'Sylmanir - Jardin Suspendu',
    description: `Une demi-elfe aux cheveux verts naturels ornés de fleurs vivantes. Ses vêtements sont faits de feuilles tissées et elle dégage un parfum floral constant. Des lianes magiques poussent autour d'elle et réagissent à ses émotions.`,
    backstory: `Nyssa a été élevée par des dryades après que ses parents aient été tués par des bûcherons. Elle a appris à communiquer avec toutes les plantes d'Aethelgard et connaît l'emplacement de chaque herbe rare. Son jardin suspendu contient des spécimens qu'on croyait éteints. Elle vend ses remèdes à prix réduit aux malades et refuse de servir ceux qui ont détruit la nature.`,
    faction: 'faction_gardiens_nature',
    services: ['harvest_herbs', 'brew_remedies', 'identify_plants', 'teach_herbalism'],
    inventory: [
      { name: 'Racine d\'Arbre-Monde', type: 'herb', rarity: 'legendary', price: 15000, effect: 'Ingrédient pour Élixir de Vie' },
      { name: 'Fleur de Lune', type: 'herb', rarity: 'epic', price: 4000, effect: 'Restaure 200 HP, Guérit malédictions' },
      { name: 'Mandragore Hurlante', type: 'herb', rarity: 'rare', price: 1500, effect: 'Ingrédient poison puissant' },
      { name: 'Remède de Nyssa', type: 'potion', rarity: 'uncommon', price: 300, effect: 'Guérit maladies naturelles' }
    ],
    questsGiven: ['quest_nyssa_save_the_grove', 'quest_extinct_flower', 'quest_tree_spirit'],
    dialogue: {
      greeting: `*sourit doucement en arrosant une plante* "Bienvenue dans mon sanctuaire. Les plantes me disent que vous avez un cœur pur... ou peut-être que j'imagine. Que puis-je faire pour vous?"`,
      trade: `*chuchote à une fleur* "Elle dit que tu es digne. Prends-en soin, elle te protégera en retour."`,
      quest: `*larmes aux yeux* "Des bûcherons menacent le Bosquet Sacré. Les anciens arbres crient. Je ne peux pas les protéger seule. Aidez-moi... s'il vous plaît."`,
      farewell: `"Que la nature veille sur vous. Et n'oubliez pas : chaque plante que vous cueillez laisse une trace. Cueillez avec respect."`
    },
    reputation: {
      required: 15,
      faction: 'faction_gardiens_nature'
    },
    tradingTips: `Nyssa offre des réductions aux druides et rangers. Évitez de porter du cuir de dragon devant elle.`
  },

  {
    id: 'npc_scribe_caelan',
    name: 'Archiviste Caelan Vol-de-Plume',
    race: 'Humain',
    class: 'Scribe & Historien Niveau 80',
    age: 54,
    role: 'merchant',
    personality: 'Curieux insatiable, collectionneur obsessionnel, distrait',
    location: 'Sol-Aureus - Grande Bibliothèque',
    description: `Un homme mince avec des lunettes rondes, constamment couvert de taches d'encre. Il porte une plume magique qui écrit automatiquement ses pensées. Ses doigts sont tachés d'encre bleue permanente et il a toujours un livre sous le bras.`,
    backstory: `Caelan a consacré sa vie à documenter l'histoire d'Aethelgard. Il possède la plus grande collection privée de cartes, grimoires et manuscrits anciens. Il cherche désespérément le Codex Perdu d'Ashka — le seul livre qui contient la vérité sur la chute de l'Empire. Certains disent qu'il en sait trop et que des forces obscures veulent le faire taire.`,
    faction: 'faction_cercle_des_sages',
    services: ['copy_scrolls', 'identify_texts', 'translate_languages', 'teach_history', 'create_maps'],
    inventory: [
      { name: 'Grimoire Vierge Enchanté', type: 'book', rarity: 'epic', price: 5000, effect: 'Stocke 100 sorts, jamais plein' },
      { name: 'Carte du Monde Vivante', type: 'map', rarity: 'legendary', price: 25000, effect: 'Se met à jour automatiquement, montre ennemis' },
      { name: 'Parchemin de Téléportation', type: 'scroll', rarity: 'rare', price: 2000, effect: 'Téléportation vers lieu connu 1x' },
      { name: 'Plume de Vérité', type: 'tool', rarity: 'uncommon', price: 800, effect: 'Détecte mensonges quand on écrit' }
    ],
    questsGiven: ['quest_caelan_codex_perdu', 'quest_ancient_manuscript', 'quest_library_heist'],
    dialogue: {
      greeting: `*lève les yeux d'un vieux parchemin* "Oh! Je ne vous avais pas entendu entrer. Désolé, j'étais plongé dans ce texte fascinant sur... attendez, que vouliez-vous déjà?"`,
      trade: `"Ah oui, cette carte! Je l'ai achetée à un marchand qui prétendait qu'elle menait à un trésor. Je n'ai jamais eu le temps de vérifier. Intéressé?"`,
      quest: `*chuchote nerveusement* "J'ai localisé un manuscrit dans les ruines d'Ashka. Mais c'est... dangereux. Des cultistes le gardent. Si vous me le rapportez, je partage tout ce que je découvre. Promis!"`,
      farewell: `"Revenez quand vous voulez! J'ai toujours de nouveaux livres... quelque part dans ce désordre."`
    },
    reputation: {
      required: 10,
      faction: 'faction_cercle_des_sages'
    },
    tradingTips: `Caelan échange des livres rares contre des manuscrits anciens. Apportez-lui des textes d'Ashka.`
  },

  // ============================================================================
  // FIGURES D'AUTORITÉ (15 NPCs)
  // ============================================================================

  {
    id: 'npc_queen_elara',
    name: 'Reine Elara Soleil-d\'Or',
    race: 'Humaine',
    class: 'Noble / Paladin Niveau 75',
    age: 42,
    role: 'authority',
    personality: 'Juste, compatissante, mais impitoyable envers les traîtres',
    location: 'Sol-Aureus - Palais Royal',
    description: `Une femme d'une beauté saisissante, portant une couronne d'or qui brille d'une lumière divine. Elle porte une armure de ceremonie dorée sous sa robe royale et l'épée légendaire "Aube" à sa ceinture. Ses yeux dorés semblent voir à travers les mensonges.`,
    backstory: `Elara a hérité du trône à 25 ans après l'assassinat de son père. Elle a survécu à 12 tentatives d'assassinat et déjoué 4 coups d'État. Elle est aimée du peuple pour sa générosité mais crainte des nobles pour sa clairvoyance politique. Secrètement, elle est une Paladin bénie par Solarius et combat en personne lors des grandes batailles. Elle cherche désespérément un héritier digne, ayant refusé tous les prétendants jusqu'ici.`,
    faction: 'faction_couronne_sol_aureus',
    services: ['royal_audience', 'grant_titles', 'issue_warrants', 'bestow_quests'],
    questsGiven: ['quest_queen_heir_search', 'quest_royal_conspiracy', 'quest_crown_curse'],
    dialogue: {
      greeting: `*voix majestueuse* "Approchez, aventurier. Vous vous tenez devant la Couronne de Sol-Aureus. Parlez avec respect ou partez."`,
      quest: `"Je ne peux faire confiance à personne dans ma cour. Trop de complots, trop de trahisons. J'ai besoin d'yeux extérieurs. Enquêtez sur mes conseillers. Discrètement."`,
      farewell: `"Que Solarius guide vos pas. Et si vous trahissez ma confiance... l'Aube boit le sang des traîtres."`
    },
    reputation: {
      required: 80,
      faction: 'faction_couronne_sol_aureus'
    },
    tradingTips: `Audiences royales uniquement sur rendez-vous. Accomplissez 5 quêtes majeures pour être convoqué.`
  },

  {
    id: 'npc_general_marcus',
    name: 'Général Marcus Ironhand',
    race: 'Humain',
    class: 'Guerrier Niveau 88 (Stratège)',
    age: 58,
    role: 'authority',
    personality: 'Militaire strict, loyal jusqu\'à la mort, pragmatique',
    location: 'Sol-Aureus - Caserne Centrale',
    description: `Un homme imposant avec une cicatrice qui traverse son visage, portant une armure de plates complète marquée de dizaines de batailles. Sa main droite est une prothèse en acier forgé d'où vient son surnom. Il porte toujours son épée et son bouclier, même en dehors des combats.`,
    backstory: `Marcus a perdu sa main lors de la Bataille de Cendreclair en protégeant la Reine Elara. Il a servi sous 3 monarques et survécu à 40 batailles majeures. Il est le stratège militaire le plus brillant d'Aethelgard et forme personnellement l'élite de la garde royale. Malgré son apparence brutale, il est un fin tacticien qui préfère éviter les pertes inutiles.`,
    faction: 'faction_garde_royale',
    services: ['military_training', 'tactical_advice', 'recruit_soldiers', 'issue_commissions'],
    questsGiven: ['quest_marcus_war_preparations', 'quest_traitor_in_ranks', 'quest_lost_battalion'],
    dialogue: {
      greeting: `*salut militaire* "Aventurier. Si tu es ici pour t'enrôler, tu as trouvé le bon endroit. Si tu cherches des ennuis, la sortie est par là."`,
      quest: `"J'ai perdu contact avec un bataillon dans les Terres Brûlées. 50 hommes. Retrouve-les. Morts ou vivants."`,
      farewell: `"Que ton épée reste affûtée et ton bouclier solide. Reviens en vie."`
    },
    reputation: {
      required: 50,
      faction: 'faction_garde_royale'
    },
    tradingTips: `Marcus offre des contrats militaires payés. Entraînement gratuit si vous rejoignez la garde.`
  },

  {
    id: 'npc_jarl_thorgrim',
    name: 'Jarl Thorgrim Tempête-de-Givre',
    race: 'Humain (Nordique)',
    class: 'Barbare Niveau 90',
    age: 52,
    role: 'authority',
    personality: 'Brutal, honorable, respecte seulement la force',
    location: 'Kuldahar - Salle du Trône des Glaces',
    description: `Un colosse de 2,10m aux cheveux et à la barbe blancs tressés avec des os. Il porte une armure de fourrure et de plaques de glace enchantées. La Couronne de Givre est posée sur sa tête, gelant l'air autour de lui. Il porte une hache de guerre à deux mains qui a fendu 1000 crânes.`,
    backstory: `Thorgrim a tué le précédent Jarl en combat singulier à 28 ans et règne depuis avec une poigne de fer. Il a repoussé 3 invasions de géants et négocié une trêve avec les dragons de glace. Il cherche un successeur digne — quelqu'un capable de le vaincre en combat loyal. Secrètement, il est malade et sait que la Couronne de Givre le tue lentement.`,
    faction: 'faction_clans_nord',
    services: ['clan_challenges', 'northmen_contracts', 'grant_raids', 'bestow_nordic_quests'],
    questsGiven: ['quest_thorgrim_succession_challenge', 'quest_giant_raid', 'quest_dragon_negotiation'],
    dialogue: {
      greeting: `*voix qui gronde comme le tonnerre* "HA! Un nouvel arrivant! Viens-tu pour me défier ou pour boire à ma table?!"`,
      quest: `"Les géants préparent une offensive. Leurs tambours résonnent dans les montagnes. Va écraser leur chef. Ramène-moi sa tête et je te couvrirai d'or!"`,
      farewell: `"Que ton sang coule chaud et ton acier froid! Et si tu meurs, meurs debout!"`
    },
    reputation: {
      required: 60,
      faction: 'faction_clans_nord'
    },
    tradingTips: `Gagnez le respect de Thorgrim en duel (non mortel). Victoire = accès à son trésor de guerre.`
  },

  {
    id: 'npc_high_priest_alduin',
    name: 'Grand Prêtre Alduin Voix-de-Lumière',
    race: 'Elfe',
    class: 'Clerc Niveau 85 (Domaine: Lumière)',
    age: 487,
    role: 'authority',
    personality: 'Sage, mystique, hanté par des visions prophétiques',
    location: 'Sol-Aureus - Cathédrale de Solarius',
    description: `Un elfe vénérable aux cheveux blancs immaculés, portant des robes blanches brodées de fils d'or. Ses yeux brillent d'une lumière divine constante et sa voix résonne comme une cloche. Il lévite légèrement au-dessus du sol par habitude.`,
    backstory: `Alduin est le dernier Grand Prêtre ordonné avant le Silence Divin. Il a vu les dieux se retirer et porte ce fardeau depuis 300 ans. Il reçoit encore des visions fragmentaires de Solarius, mais elles sont cryptiques et douloureuses. Il croit qu'un nouvel Élu viendra bientôt — quelqu'un capable de communiquer avec les dieux et de restaurer leur présence.`,
    faction: 'faction_eglise_de_lumiere',
    services: ['bless_items', 'heal_curses', 'grant_divine_quests', 'teach_theology'],
    questsGiven: ['quest_alduin_chosen_one', 'quest_divine_vision', 'quest_temple_purification'],
    dialogue: {
      greeting: `*voix apaisante* "Bienvenue, enfant de lumière. Les dieux m'ont murmuré votre nom dans mes rêves. Vous avez un rôle à jouer dans ce qui vient."`,
      quest: `*tremblement dans la voix* "J'ai vu... une vision. Des ténèbres engloutissent Sol-Aureus. Un artefact sacré doit être récupéré avant qu'il ne tombe entre de mauvaises mains. Solarius compte sur vous."`,
      farewell: `"Que la lumière éternelle vous guide. Et rappelez-vous : même dans les ténèbres les plus profondes, une étincelle suffit."`
    },
    reputation: {
      required: 70,
      faction: 'faction_eglise_de_lumiere'
    },
    tradingTips: `Alduin bénit gratuitement les items des fidèles (réputation >50 requise).`
  },

  {
    id: 'npc_archmage_kaelith',
    name: 'Archimage Kaelith la Tisseuse',
    race: 'Elfe',
    class: 'Mage Niveau 95 (Toutes écoles)',
    age: 612,
    role: 'authority',
    personality: 'Froide, calculatrice, obsédée par l\'accumulation de savoir',
    location: 'Sol-Aureus - Tour du Cercle Arcanique',
    description: `Une elfe éthérée aux cheveux argentés qui flottent constamment comme sous l'eau. Ses yeux brillent d'un violet intense et des runes arcanes dansent autour d'elle. Elle porte des robes qui semblent tissées de magie pure et change de forme selon la lumière.`,
    backstory: `Kaelith est la mage la plus puissante vivante d'Aethelgard. Elle maîtrise toutes les écoles de magie et a écrit 47 grimoires. Elle cherche le Codex Perdu d'Ashka pour déchiffrer les secrets de la magie dimensionnelle. On dit qu'elle a fait un pacte avec une entité du Miroir des Ombres et qu'elle ne vieillit plus. Elle dirige le Cercle Arcanique d'une main de fer et teste personnellement chaque nouveau membre.`,
    faction: 'faction_circle_des_arcanes',
    services: ['teach_advanced_magic', 'research_spells', 'grant_arcane_quests', 'identify_artifacts'],
    questsGiven: ['quest_kaelith_codex_hunt', 'quest_dimensional_rift', 'quest_magic_duel'],
    dialogue: {
      greeting: `*vous fixe avec intensité* "Hmm. Votre aura magique est... intéressante. Dites-moi, avez-vous déjà touché la magie brute de l'Aether?"`,
      quest: `"J'ai besoin de quelqu'un pour récupérer un artefact dans les Terres Brûlées. C'est dangereux, mortel même. Mais si vous réussissez, je vous enseignerai un sort que personne d'autre ne connaît."`,
      farewell: `"N'oubliez jamais : la magie est un outil. Un outil peut construire... ou détruire. Choisissez sagement."`
    },
    reputation: {
      required: 85,
      faction: 'faction_circle_des_arcanes'
    },
    tradingTips: `Kaelith n'accepte que les mages de haut niveau. Apportez-lui des grimoires rares pour gagner ses faveurs.`
  },

  {
    id: 'npc_master_thief_shadow',
    name: 'Maître-Voleur Ombre (vrai nom inconnu)',
    race: 'Inconnu (probablement humain ou elfe noir)',
    class: 'Roublard Niveau 92',
    age: '???',
    role: 'authority',
    personality: 'Mystérieux, imprévisible, loyauté douteuse',
    location: 'Sol-Aureus - Quartier des Ombres (emplacement changeant)',
    description: `Une silhouette encapuchonnée dont le visage est toujours caché. Leur voix est androgyne et distordue par magie. Ils portent le Manteau des Mille Ombres et ne sont jamais vus clairement, même en plein jour. Leur présence est signalée uniquement par une carte à jouer laissée derrière eux.`,
    backstory: `Personne ne connaît l'identité réelle d'Ombre. Ils dirigent la Main Noire, la guilde de voleurs la plus puissante d'Aethelgard. Ils ont volé la Couronne Royale (et l'ont rendue), le Sceptre du Haut Prêtre (rendu aussi) et le Grimoire de Kaelith (rendu... après l'avoir copié). Ils ne volent jamais les pauvres et redistribuent une partie de leur butin. Certains pensent qu'Ombre est en réalité plusieurs personnes partageant le même titre.`,
    faction: 'faction_main_noire',
    services: ['fence_stolen_goods', 'teach_stealth', 'issue_contracts', 'grant_thief_quests'],
    questsGiven: ['quest_ombre_crown_heist', 'quest_infiltrate_noble', 'quest_rival_guild'],
    dialogue: {
      greeting: `*voix distordue* "Ah. Tu as trouvé mon repaire... ou je t'ai laissé me trouver. Qu'est-ce qui t'amène dans les ombres?"`,
      quest: `"J'ai un travail délicat. Infiltre le manoir du Duc Vorenus et récupère son journal intime. Ne le tue pas. Ne sois pas vu. Et ne lis SURTOUT PAS le journal. Compris?"`,
      farewell: `*disparaît dans l'ombre* "Nous ne nous sommes jamais rencontrés. Et si quelqu'un demande... je n'existe pas."`
    },
    reputation: {
      required: 40,
      faction: 'faction_main_noire'
    },
    tradingTips: `Ombre paie généreusement les objets volés. Évitez de poser des questions sur leur identité.`
  },

  {
    id: 'npc_guild_master_orin',
    name: 'Maître de Guilde Orin Pièce-d\'Or',
    race: 'Nain',
    class: 'Expert en Commerce Niveau 80',
    age: 198,
    role: 'authority',
    personality: 'Cupide mais juste, obsédé par les profits, mais loyal envers les membres',
    location: 'Sol-Aureus - Guilde des Marchands',
    description: `Un nain replet portant des vêtements luxueux ornés de pièces d'or cousues. Il porte des bagues à chaque doigt et un monocle en or. Son bureau déborde de contrats, de registres et de coffres-forts enchantés.`,
    backstory: `Orin a bâti la Guilde des Marchands de zéro, transformant une petite association de colporteurs en une organisation puissante contrôlant 60% du commerce d'Aethelgard. Il connaît tous les secrets commerciaux, les routes secrètes et les fournisseurs rares. Il est impitoyable en affaires mais honore toujours ses contrats. Sa devise : "Un contrat rompu est une réputation ruinée."`,
    faction: 'faction_guilde_marchands',
    services: ['trade_licenses', 'merchant_contracts', 'caravan_escorts', 'price_info'],
    questsGiven: ['quest_orin_trade_route', 'quest_smuggling_ring', 'quest_rare_commodity'],
    dialogue: {
      greeting: `*compte des pièces sans lever les yeux* "Temps c'est argent, ami. Dis-moi ce que tu veux et combien tu paies."`,
      quest: `"J'ai besoin d'une caravane escortée vers Hammerdeep. Bandits, monstres, le lot habituel. 2000 pièces d'or à l'arrivée. Intéressé?"`,
      farewell: `"Plaisir de faire affaire. Reviens quand ton bourse est pleine!"`
    },
    reputation: {
      required: 30,
      faction: 'faction_guilde_marchands'
    },
    tradingTips: `Orin offre des licences commerciales (500 PO) qui réduisent les taxes de 50% dans toutes les villes.`
  },

  {
    id: 'npc_judge_veridian',
    name: 'Juge Suprême Veridian Loi-de-Fer',
    race: 'Humain',
    class: 'Inquisiteur Niveau 82',
    age: 61,
    role: 'authority',
    personality: 'Implacable, inflexible, croit en la lettre de la loi',
    location: 'Sol-Aureus - Palais de Justice',
    description: `Un homme austère aux cheveux gris courts, portant une robe de juge noire et un marteau de justice en argent. Ses yeux gris semblent peser votre âme et il ne sourit jamais. Il porte le "Codex de Lois" enchaîné à sa taille.`,
    backstory: `Veridian a condamné son propre frère à mort pour trahison et n'a jamais regretté sa décision. Il croit que la loi est la seule chose qui sépare la civilisation du chaos. Il a survécu à 8 tentatives d'assassinat de criminels qu'il a condamnés. Il est craint et respecté à parts égales. Secrètement, il doute de plus en plus de la loi qu'il applique et se demande si la justice existe vraiment.`,
    faction: 'faction_ordre_juridique',
    services: ['legal_counsel', 'issue_pardons', 'investigate_crimes', 'trial_judgements'],
    questsGiven: ['quest_veridian_corruption_probe', 'quest_false_accusation', 'quest_law_reform'],
    dialogue: {
      greeting: `*voix sévère* "Vous vous tenez devant la loi. Exposez votre requête ou sortez de ma cour."`,
      quest: `"Un noble a été accusé de meurtre. Les preuves sont... suspectes. Enquêtez. Rapportez-moi la vérité, pas ce que vous pensez que je veux entendre."`,
      farewell: `"La loi ne dort jamais. Assurez-vous de rester du bon côté de celle-ci."`
    },
    reputation: {
      required: 50,
      faction: 'faction_ordre_juridique'
    },
    tradingTips: `Veridian peut annuler des mandats d'arrêt... pour un prix exorbitant (10,000+ PO).`
  },

  {
    id: 'npc_ambassador_lysara',
    name: 'Ambassadrice Lysara Chant-d\'Émeraude',
    race: 'Elfe',
    class: 'Diplomate & Barde Niveau 76',
    age: 318,
    role: 'authority',
    personality: 'Charmante, manipulatrice subtile, cache ses vraies intentions',
    location: 'Sol-Aureus - Ambassade Elfique',
    description: `Une elfe d'une beauté envoûtante aux longs cheveux émeraude et aux yeux verts hypnotiques. Elle porte des robes diplomatiques élégantes et un collier enchanté qui amplifie sa voix. Chaque mot qu'elle prononce semble mélodieux et persuasif.`,
    backstory: `Lysara représente la Sylve d'Émeraude à Sol-Aureus depuis 150 ans. Elle a négocié 23 traités de paix, empêché 5 guerres et orchestré la chute de 7 nobles corrompus. Elle utilise son charme et sa magie bardique pour influencer les décisions politiques en faveur de son peuple. Beaucoup la soupçonnent d'être une espionne mais personne n'a jamais pu le prouver.`,
    faction: 'faction_sylve_emeraude',
    services: ['diplomatic_missions', 'translate_languages', 'negotiate_treaties', 'grant_elven_quests'],
    questsGiven: ['quest_lysara_spy_games', 'quest_treaty_sabotage', 'quest_political_marriage'],
    dialogue: {
      greeting: `*sourire ensorcelant* "Bienvenue, cher ami. Que puis-je faire pour vous aujourd'hui? J'espère que vous venez en paix."`,
      quest: `*baisse la voix* "J'ai besoin de quelqu'un de discret. Un noble menace les intérêts de mon peuple. Convaincez-le... diplomatiquement... de changer d'avis."`,
      farewell: `"Ce fut un plaisir. J'espère que nos chemins se recroiseront bientôt."`
    },
    reputation: {
      required: 60,
      faction: 'faction_sylve_emeraude'
    },
    tradingTips: `Lysara offre des contacts diplomatiques. Haute réputation = accès aux ressources elfiques rares.`
  },

  {
    id: 'npc_war_chief_gruumsh',
    name: 'Chef de Guerre Gruumsh Crâne-Brisé',
    race: 'Demi-Orc',
    class: 'Guerrier Niveau 86',
    age: 38,
    role: 'authority',
    personality: 'Brutal mais honorable, respecte la force et le courage',
    location: 'Frontières du Nord - Camp de Guerre Nomade',
    description: `Un demi-orc massif avec des défenses qui dépassent de sa bouche et une cicatrice qui lui a coûté son œil gauche. Il porte une armure de plaques bricolée et une hache géante faite d'os de dragon. Ses tatouages de guerre couvrent tout son corps.`,
    backstory: `Gruumsh a uni 12 tribus orques sous sa bannière par la force et le respect mutuel. Contrairement aux stéréotypes, il interdit le pillage des villages innocents et ne fait la guerre qu'aux ennemis dignes. Il cherche un territoire où son peuple peut vivre en paix sans être chassé. Il est prêt à négocier... ou à se battre jusqu'à la mort si nécessaire.`,
    faction: 'faction_tribus_orques',
    services: ['mercenary_contracts', 'orc_warriors_for_hire', 'combat_training', 'tribal_quests'],
    questsGiven: ['quest_gruumsh_homeland', 'quest_orc_honor', 'quest_challenge_chief'],
    dialogue: {
      greeting: `*grogne* "Toi. Petit. Parler rapide ou partir. Gruumsh pas avoir temps pour faibles."`,
      quest: `"Humains chasser mon peuple. Encore. Gruumsh fatigué de fuir. Aider moi parler avec chef humain. Ou aider moi écraser eux. Toi choisir."`,
      farewell: `*frappe son poing sur sa poitrine* "Toi avoir honneur. Gruumsh se souvenir."`
    },
    reputation: {
      required: 45,
      faction: 'faction_tribus_orques'
    },
    tradingTips: `Gruumsh respecte la force. Battez-le en duel (non mortel) pour gagner son respect et accéder à ses mercenaires.`
  },

  // ============================================================================
  // MENTORS & ENTRAÎNEURS (10 NPCs)
  // ============================================================================

  {
    id: 'npc_blade_master_zhen',
    name: 'Maître-Lame Zhen le Silencieux',
    race: 'Humain',
    class: 'Maître d\'Armes Niveau 90',
    age: 67,
    role: 'trainer',
    personality: 'Calme, philosophe, ne parle que lorsque nécessaire',
    location: 'Sol-Aureus - Dojo de la Lame Parfaite',
    description: `Un homme âgé mais encore agile, aux cheveux gris attachés en queue de cheval. Il porte une simple tunique noire et un katana à la ceinture. Ses mains sont couvertes de callosités et ses yeux semblent toujours évaluer votre posture.`,
    backstory: `Zhen a voyagé pendant 40 ans pour apprendre tous les styles de combat à l'épée. Il a vaincu 100 duellistes sans jamais tuer un seul adversaire. Il croit que la vraie maîtrise de l'épée ne vient pas de la force mais de la discipline mentale. Il accepte seulement les élèves qui peuvent méditer en silence pendant 24h sans bouger.`,
    faction: null,
    services: ['train_sword_fighting', 'teach_techniques', 'sparring_sessions', 'meditation'],
    questsGiven: ['quest_zhen_100_duels', 'quest_perfect_strike', 'quest_inner_peace'],
    dialogue: {
      greeting: `*incline légèrement la tête* "..."`,
      quest: `*après un long silence* "Vous cherchez la force. Je vois ça dans vos yeux. Mais la force sans discipline est chaos. Méditez. Puis revenez."`,
      farewell: `*repose son katana* "La lame parfaite ne se forge pas. Elle se découvre."`
    },
    reputation: {
      required: 0
    },
    tradingTips: `Zhen n'accepte pas l'argent. Montrez votre détermination en complétant ses tests.`
  },

  {
    id: 'npc_archmage_mentor_talion',
    name: 'Archimage Talion Flamme-Éternelle',
    race: 'Elfe',
    class: 'Mage Niveau 88 (École: Évocation)',
    age: 521,
    role: 'trainer',
    personality: 'Passionné, impulsif, fasciné par le feu',
    location: 'Sol-Aureus - Tour de Flamme',
    description: `Un elfe aux cheveux roux flamboyants et aux yeux orange brillants. Ses robes sont constamment entourées de petites flammes inoffensives. Il gesticule avec enthousiasme en parlant et sent légèrement le soufre.`,
    backstory: `Talion est obsédé par la magie du feu depuis qu'il a vu son village natal brûler dans son enfance. Il a consacré sa vie à maîtriser les flammes pour qu'elles servent plutôt que détruisent. Il peut créer des flammes qui brûlent sans consumer, des infernos qui ne blessent que les ennemis, et même des phénix de feu vivants. Il cherche l'Étincelle Primordiale — la première flamme de la création.`,
    faction: 'faction_circle_des_arcanes',
    services: ['teach_evocation', 'fire_spell_mastery', 'elemental_control', 'pyromancy'],
    questsGiven: ['quest_talion_primordial_spark', 'quest_fire_elemental_pact', 'quest_volcano_heart'],
    dialogue: {
      greeting: `*flammes dansent autour de ses mains* "Ah! Un nouvel apprenti! Dis-moi, as-tu déjà senti la chaleur d'un vrai inferno?!"`,
      quest: `"Je cherche l'Étincelle Primordiale. On dit qu'elle brûle au cœur du volcan dans les Terres Brûlées. Si tu me l'apportes, je t'apprendrai à commander les flammes elles-mêmes!"`,
      farewell: `"N'oublie jamais : le feu est vie. Le feu est passion. Le feu est... tout!"`
    },
    reputation: {
      required: 40,
      faction: 'faction_circle_des_arcanes'
    },
    tradingTips: `Talion réduit ses tarifs d'entraînement si vous lui apportez des composants de feu rares.`
  },

  {
    id: 'npc_ranger_mentor_sylwen',
    name: 'Sylwen l\'Ombre-Verte',
    race: 'Elfe des Bois',
    class: 'Rôdeuse Légendaire Niveau 89',
    age: 412,
    role: 'trainer',
    personality: 'Sauvage, farouche, protectrice de la nature',
    location: 'Sylve d\'Émeraude - Camp Caché',
    description: `Une elfe vêtue de cuir vert et de mousse, pratiquement invisible dans la forêt. Elle porte un arc longue portée en bois d'Arbre-Monde et un loup géant l'accompagne partout. Ses cheveux sont ornés de plumes et de feuilles.`,
    backstory: `Sylwen n'a jamais mis les pieds dans une ville. Elle a été élevée par des loups après que ses parents aient été tués par des braconniers. Elle connaît chaque sentier, chaque créature et chaque secret de la Sylve d'Émeraude. Elle traque les braconniers et les bûcherons illégaux avec une efficacité terrifiante. Elle n'enseigne qu'à ceux qui respectent la nature.`,
    faction: 'faction_gardiens_nature',
    services: ['train_survival', 'teach_tracking', 'archery_mastery', 'beast_handling'],
    questsGiven: ['quest_sylwen_poacher_hunt', 'quest_ancient_grove', 'quest_wolf_bond'],
    dialogue: {
      greeting: `*sort de derrière un arbre sans bruit* "Tu fais trop de bruit. Les arbres m'ont prévenue de ta venue il y a une heure."`,
      quest: `"Des braconniers tuent les cerfs sacrés. Trouve-les. Arrête-les. Par tous les moyens nécessaires."`,
      farewell: `*disparaît dans les feuillages* "La forêt se souvient de ceux qui la respectent."`
    },
    reputation: {
      required: 50,
      faction: 'faction_gardiens_nature'
    },
    tradingTips: `Sylwen ne prend pas d'argent. Montrez votre respect pour la nature en complétant ses quêtes.`
  },

  {
    id: 'npc_rogue_mentor_vex',
    name: 'Vex l\'Insaisissable',
    race: 'Halfling',
    class: 'Roublard Niveau 84',
    age: 47,
    role: 'trainer',
    personality: 'Sournois, humoristique, aime les défis',
    location: 'Sol-Aureus - Quartier des Ombres (Taverne "La Pièce Truquée")',
    description: `Un halfling agile aux cheveux noirs ébouriffés, portant une tenue de cuir sombre et des dizaines d'outils de crochetage cachés partout. Il jongle avec des dagues en parlant et disparaît parfois au milieu d'une conversation pour réapparaître derrière vous.`,
    backstory: `Vex a été le protégé d'Ombre et est considéré comme le meilleur crocheteur de serrures vivant. Il a déjà crocheté le coffre royal de Sol-Aureus en 12 secondes (record jamais battu). Il enseigne l'art de la discrétion, du vol à la tire et de l'infiltration. Son credo : "Si on te voit, tu as déjà échoué."`,
    faction: 'faction_main_noire',
    services: ['teach_stealth', 'lockpicking_mastery', 'trap_disarm', 'sleight_of_hand'],
    questsGiven: ['quest_vex_heist_training', 'quest_impossible_lock', 'quest_shadow_dance'],
    dialogue: {
      greeting: `*apparaît soudainement à côté de vous* "Hé! Je t'ai déjà volé ta bourse et rendue sans que tu t'en rendes compte. Impressionné?"`,
      quest: `"Je vais t'apprendre un truc. Vole le médaillon du Juge Veridian. Sans te faire prendre. Si tu réussis, tu es prêt pour le grand jeu."`,
      farewell: `*disparaît en fumée* "Oh, et au fait... vérifie tes poches. *rire lointain*"`
    },
    reputation: {
      required: 35,
      faction: 'faction_main_noire'
    },
    tradingTips: `Vex adore les défis. Défiez-le à des concours de vol pour gagner son respect.`
  },

  {
    id: 'npc_cleric_mentor_sister_mirabel',
    name: 'Sœur Mirabel Cœur-de-Lumière',
    race: 'Humaine',
    class: 'Clerc Niveau 80 (Domaine: Vie)',
    age: 56,
    role: 'trainer',
    personality: 'Compatissante, dévouée, mais stricte sur la discipline spirituelle',
    location: 'Sol-Aureus - Sanctuaire de Guérison',
    description: `Une femme douce aux cheveux gris soigneusement tressés, portant des robes blanches immaculées de l'Église de Lumière. Ses mains brillent d'une aura dorée constante et elle dégage une présence apaisante.`,
    backstory: `Mirabel a consacré sa vie à soigner les malades et les blessés. Elle a survécu à une épidémie magique qui a tué toute sa famille et a juré de ne laisser personne mourir si elle peut l'empêcher. Elle enseigne la magie de guérison et la discipline spirituelle. Elle croit que tout le monde mérite une seconde chance.`,
    faction: 'faction_eglise_de_lumiere',
    services: ['teach_healing', 'divine_magic_training', 'blessings', 'spiritual_guidance'],
    questsGiven: ['quest_mirabel_plague_cure', 'quest_lost_soul', 'quest_divine_test'],
    dialogue: {
      greeting: `*sourire chaleureux* "Bienvenue, mon enfant. Comment puis-je t'aider aujourd'hui? As-tu besoin de soins ou de guidance?"`,
      quest: `"Une maladie étrange se répand dans les bidonvilles. Je fais de mon mieux mais j'ai besoin d'aide. Trouve la source de cette maladie et je t'enseignerai mes techniques de guérison."`,
      farewell: `"Que la lumière te guide. Et souviens-toi : la bonté est la plus grande magie."`
    },
    reputation: {
      required: 20,
      faction: 'faction_eglise_de_lumiere'
    },
    tradingTips: `Mirabel enseigne gratuitement si vous aidez au sanctuaire (soins gratuits pour les pauvres).`
  },

  {
    id: 'npc_barbarian_mentor_krag',
    name: 'Krag Sang-et-Tonnerre',
    race: 'Demi-Orc',
    class: 'Barbare Niveau 87',
    age: 41,
    role: 'trainer',
    personality: 'Brutal, direct, mais surprenamment philosophe',
    location: 'Kuldahar - Arène du Givre',
    description: `Un demi-orc couvert de cicatrices de bataille, portant uniquement un pagne de fourrure et des brassards cloutés. Ses muscles sont massifs et il porte une hache de guerre à deux mains plus grande que la plupart des humains.`,
    backstory: `Krag était autrefois un esclave gladiateur qui a gagné sa liberté en tuant 50 adversaires d'affilée. Il a fondé l'Arène du Givre où les guerriers peuvent tester leur force sans risque de mort. Il enseigne l'art de la rage contrôlée et la survie en milieu hostile. Son credo : "La rage sans contrôle est faiblesse. La rage maîtrisée est pouvoir."`,
    faction: 'faction_clans_nord',
    services: ['train_combat', 'rage_mastery', 'endurance_training', 'gladiator_fights'],
    questsGiven: ['quest_krag_arena_champion', 'quest_rage_ritual', 'quest_beast_hunt'],
    dialogue: {
      greeting: `*rugissement* "HA! Nouveau guerrier! Tu veux apprendre frapper fort? Ou juste mourir vite?!"`,
      quest: `"Survie simple. Tu vas dans toundra. Trois jours. Pas armes. Pas armure. Tuer ours géant avec mains nues. Revenir vivant. Alors Krag enseigner toi."`,
      farewell: `*frappe son poing dans sa paume* "Souvenir : Douleur temporaire. Gloire éternelle!"`
    },
    reputation: {
      required: 45,
      faction: 'faction_clans_nord'
    },
    tradingTips: `Krag respecte seulement la force. Battez 10 adversaires dans son arène pour débloquer son entraînement.`
  },

  {
    id: 'npc_monk_mentor_master_jin',
    name: 'Maître Jin Paume-de-Fer',
    race: 'Humain',
    class: 'Moine Niveau 91',
    age: 72,
    role: 'trainer',
    personality: 'Serein, sage, teste constamment ses élèves',
    location: 'Monts Cœur-de-Fer - Monastère du Sommet Silencieux',
    description: `Un homme chauve aux yeux gris perçants, portant de simples robes orange. Ses mains sont aussi dures que l'acier et il se déplace avec une grâce fluide. Il semble toujours savoir ce que vous allez dire avant que vous ne parliez.`,
    backstory: `Jin a passé 50 ans à méditer et s'entraîner dans les montagnes les plus reculées. Il a atteint l'illumination après avoir survécu à une avalanche et médité sous la neige pendant 7 jours. Il enseigne que le corps et l'esprit ne font qu'un et que la vraie force vient de l'équilibre intérieur.`,
    faction: null,
    services: ['train_unarmed_combat', 'teach_ki_techniques', 'meditation', 'inner_balance'],
    questsGiven: ['quest_jin_enlightenment', 'quest_five_challenges', 'quest_inner_demon'],
    dialogue: {
      greeting: `*sourire paisible* "Tu viens chercher la force. Mais la force que tu cherches n'est pas celle que tu trouveras."`,
      quest: `"Pour apprendre mes techniques, tu dois compléter les Cinq Épreuves. Rapidité, Force, Endurance, Esprit et... Humilité. Es-tu prêt?"`,
      farewell: `"Le chemin vers la maîtrise est long. Ne te presse pas. La hâte est l'ennemie de la perfection."`
    },
    reputation: {
      required: 0
    },
    tradingTips: `Jin n'enseigne qu'aux patients. Revenez chaque jour pendant une semaine pour prouver votre détermination.`
  },

  {
    id: 'npc_druid_mentor_elderwood',
    name: 'Grand Druide Elderwood Racine-Ancienne',
    race: 'Elfe',
    class: 'Druide Niveau 93',
    age: 687,
    role: 'trainer',
    personality: 'Vieux sage, parle lentement, mystérieux',
    location: 'Sylve d\'Émeraude - Cercle Sacré',
    description: `Un elfe si vieux qu'il ressemble presque à un arbre. Sa peau est comme de l'écorce, ses cheveux sont des lianes et de la mousse pousse sur ses épaules. Il se déplace extrêmement lentement et parle avec de longues pauses.`,
    backstory: `Elderwood est le plus ancien druide vivant. Il a vu naître et mourir des empires, survécu à trois tentatives de génocide elfique et protégé la Sylve d'Émeraude pendant 600 ans. Il peut se transformer en n'importe quelle créature et communiquer avec toutes les formes de vie. Il cherche un successeur digne de protéger la forêt après sa mort.`,
    faction: 'faction_gardiens_nature',
    services: ['teach_druidcraft', 'shapeshifting_mastery', 'nature_magic', 'animal_communion'],
    questsGiven: ['quest_elderwood_successor', 'quest_ancient_tree', 'quest_nature_balance'],
    dialogue: {
      greeting: `*longue pause* "...Bienvenue... jeune pousse... Que... cherches-tu... dans ces bois... anciens...?"`,
      quest: `"...La nature... est déséquilibrée... Trouve... la source... de la corruption... Guéris... la terre..."`,
      farewell: `"...Puisses-tu... croître... fort... comme... les racines... des anciens..."`
    },
    reputation: {
      required: 65,
      faction: 'faction_gardiens_nature'
    },
    tradingTips: `Elderwood enseigne seulement à ceux qui ont prouvé leur respect pour la nature (quêtes complétées >5).`
  },

  {
    id: 'npc_paladin_mentor_sir_aldric',
    name: 'Chevalier-Commandeur Sir Aldric Bouclier-Lumineux',
    race: 'Humain',
    class: 'Paladin Niveau 86',
    age: 52,
    role: 'trainer',
    personality: 'Honorable, strict code moral, inflexible sur le bien et le mal',
    location: 'Sol-Aureus - Forteresse de l\'Ordre Radieux',
    description: `Un homme imposant en armure de plates dorée gravée de runes sacrées. Il porte un bouclier avec le symbole de Solarius et une épée longue bénie. Ses yeux brillent d'une lumière divine et il dégage une aura de justice.`,
    backstory: `Sir Aldric est le commandeur de l'Ordre Radieux, l'élite des paladins. Il a combattu dans 30 batailles contre les forces du Miroir des Ombres et n'a jamais reculé. Il croit fermement que le bien triomphera toujours du mal et n'accepte aucun compromis moral. Il cherche des recrues dignes pour renforcer l'Ordre.`,
    faction: 'faction_ordre_radieux',
    services: ['train_paladin_skills', 'teach_divine_smite', 'holy_blessings', 'oath_taking'],
    questsGiven: ['quest_aldric_oath', 'quest_demon_hunt', 'quest_fallen_paladin'],
    dialogue: {
      greeting: `*salut martial* "Que la lumière de Solarius vous guide, voyageur. Êtes-vous ici pour rejoindre la croisade contre les ténèbres?"`,
      quest: `"Un de mes frères a succombé à la corruption. Il doit être arrêté... ou sauvé. C'est une mission difficile. Êtes-vous prêt?"`,
      farewell: `"Que votre lame reste pure et votre foi inébranlable. Pour l'honneur et la lumière!"`
    },
    reputation: {
      required: 55,
      faction: 'faction_ordre_radieux'
    },
    tradingTips: `Aldric ne forme que ceux qui partagent sa vision morale. Évitez les actions maléfiques si vous voulez son entraînement.`
  },

  {
    id: 'npc_necromancer_mentor_mortis',
    name: 'Archimage Nécromancien Mortis Os-Pâle',
    race: 'Humain (Non-mort?)',
    class: 'Nécromancien Niveau 89',
    age: '???',
    role: 'trainer',
    personality: 'Macabre, sarcastique, obsédé par l\'immortalité',
    location: 'Terres Brûlées - Nécropole Oubliée',
    description: `Une silhouette décharnée enveloppée de robes noires déchirées. Son visage est caché sous un masque de crâne et ses mains sont des os visibles. Il est entouré d'esprits spectraux et de mouches mortuaires. Sa voix résonne comme un écho venant d'une tombe.`,
    backstory: `Mortis était autrefois un chercheur brillant qui a étudié la nécromancie pour ressusciter sa femme décédée. Son obsession l'a transformé en quelque chose entre la vie et la mort. Il maîtrise tous les aspects de la magie nécromantique et a créé des armées de morts-vivants. Il enseigne à ceux qui ne craignent pas les tabous.`,
    faction: null,
    services: ['teach_necromancy', 'undead_summoning', 'death_magic', 'soul_manipulation'],
    questsGiven: ['quest_mortis_phylactery', 'quest_forbidden_ritual', 'quest_death_embrace'],
    dialogue: {
      greeting: `*rire grinçant* "Ahhhh... un vivant. Comme c'est... rafraîchissant. Que veux-tu apprendre sur la mort?"`,
      quest: `"Je cherche un Phylactère Ancien dans les catacombes. Rapporte-le et je t'apprendrai à commander les morts eux-mêmes."`,
      farewell: `"N'oublie pas : la mort n'est que le début. *rire d'outre-tombe*"`
    },
    reputation: {
      required: 0
    },
    tradingTips: `Mortis est banni de toutes les villes. Son entraînement vous marquera comme suspect auprès des autorités.`
  },

  // ============================================================================
  // PERSONNAGES D'INTRIGUE (10 NPCs)
  // ============================================================================

  {
    id: 'npc_spy_ravens',
    name: 'Raven le Chuchoteur',
    race: 'Humain',
    class: 'Espion & Assassin Niveau 79',
    age: 34,
    role: 'quest_giver',
    personality: 'Paranoïaque, changeant constamment d\'identité, loyal seulement à l\'argent',
    location: 'Variable (contacts via messages codés)',
    description: `Un visage sans traits marquants — exactement ce qu'un espion veut. Cheveux bruns moyens, taille moyenne, vêtements discrets. Il change d'apparence constamment grâce à des masques magiques. La seule constante : un tatouage d'un corbeau sur son poignet gauche (toujours caché).`,
    backstory: `Personne ne connaît le vrai nom de Raven. Il travaille pour le plus offrant et vend des informations aux nobles, aux guildes et même aux criminels. Il a déjoué 15 tentatives d'assassinat et a lui-même assassiné 23 cibles sans jamais laisser de trace. Il est recherché par tous les gouvernements mais personne ne sait à quoi il ressemble vraiment.`,
    faction: null,
    services: ['information_broker', 'assassination_contracts', 'spy_missions', 'identity_change'],
    questsGiven: ['quest_raven_double_agent', 'quest_information_heist', 'quest_eliminate_target'],
    dialogue: {
      greeting: `*voix distordue par magie* "Vous m'avez trouvé. Impressionnant. Ou peut-être vous ai-je laissé me trouver. Que voulez-vous?"`,
      quest: `"J'ai un contrat. Une cible. Pas de questions. Juste des résultats. 5000 pièces d'or. Intéressé?"`,
      farewell: `*disparaît dans la foule* "Nous ne nous sommes jamais rencontrés. Et si quelqu'un demande... je n'existe pas."`
    },
    reputation: {
      required: 0
    },
    tradingTips: `Raven ne fait confiance à personne. Apportez-lui des preuves de votre discrétion pour débloquer ses services.`
  },

  {
    id: 'npc_noble_corrupt_vorenus',
    name: 'Duc Vorenus Mont-d\'Or',
    race: 'Humain',
    class: 'Noble Corrompu Niveau 35',
    age: 49,
    role: 'antagonist',
    personality: 'Arrogant, cupide, manipulateur',
    location: 'Sol-Aureus - Manoir Mont-d\'Or',
    description: `Un homme obèse portant des vêtements luxueux ornés de pierres précieuses. Il a des doigts boudinés couverts de bagues et un sourire faux permanent. Il sent les parfums coûteux et la corruption.`,
    backstory: `Vorenus a hérité de sa fortune et l'a doublée en exploitant les paysans de ses terres. Il trafique avec la Main Noire, accepte des pots-de-vin et sabote ses rivaux politiques. Il est protégé par sa position mais beaucoup aimeraient le voir tomber. Il cherche à devenir le prochain conseiller de la Reine.`,
    faction: 'faction_noblesse_corrompue',
    services: null,
    questsGiven: ['quest_vorenus_expose', 'quest_blackmail', 'quest_rival_elimination'],
    dialogue: {
      greeting: `*sourire faux* "Ah, un... aventurier. Que puis-je faire pour vous... si vous avez les moyens, bien sûr."`,
      quest: `*chuchote* "J'ai un problème. Un rival politique. Faites-le... disparaître. Je paierai généreusement."`,
      farewell: `"Plaisir de faire affaire. Et rappelez-vous... la discrétion est essentielle."`
    },
    reputation: {
      required: -30
    },
    tradingTips: `Travailler pour Vorenus détruit votre réputation auprès des factions vertueuses. À éviter sauf si vous êtes un personnage maléfique.`
  }

  // Plus de NPCs à suivre dans les prochains batches...
];
