/**
 * AETHELGARD - EXPANSION NPCs (Batch 2/3 - 30 personnages)
 * Types: Espions, Nobles corrompus, Prophètes, Cultistes, Chasseurs, Tavernes
 */

export const EXPANDED_NPCS_BATCH_2 = [
  // ============================================================================
  // ESPIONS & AGENTS DOUBLES (8 NPCs)
  // ============================================================================
  
  {
    id: 'npc_spy_lysandra',
    name: 'Lysandra Voile-de-Nuit',
    race: 'Demi-Elfe',
    class: 'Roublard/Barde Niveau 77',
    age: 156,
    role: 'spy',
    personality: 'Charmante en surface, calculatrice en dessous, loyauté flexible',
    location: 'Sol-Aureus - Variable (tavernes, bals, marchés)',
    description: `Une demi-elfe élégante aux cheveux noirs de jais et aux yeux violets envoûtants. Elle change d'apparence et d'identité comme on change de vêtements. Porte toujours un pendentif qui semble différent selon l'angle.`,
    backstory: `Lysandra travaille simultanément pour trois factions : la Couronne, la Main Noire et un mystérieux employeur qu'elle ne nomme jamais "le Collectionneur". Elle vend des informations au plus offrant mais manipule subtilement les événements pour favoriser ses propres plans. Elle a déjoué 23 complots, causé 12 guerres mineures et sauvé Sol-Aureus d'une invasion... sans que personne ne sache que c'était elle. Son véritable objectif ? Personne ne le sait, même pas elle certains jours.`,
    faction: null,
    services: ['information_sale', 'rumor_spreading', 'identity_forgery', 'noble_introduction', 'blackmail'],
    inventory: [
      { name: 'Information Sensible (Noble)', rarity: 'rare', price: 2000, effect: 'Révèle secret noble' },
      { name: 'Faux Documents', rarity: 'uncommon', price: 800, effect: 'Identité falsifiée crédible' },
      { name: 'Carte Réseau Espions', rarity: 'epic', price: 5000, effect: 'Contacts dans 10 villes' },
      { name: 'Poison Social', rarity: 'rare', price: 1500, effect: 'Ruine réputation cible' }
    ],
    questsGiven: ['quest_lysandra_triple_agent', 'quest_collector_identity', 'quest_blackmail_duke'],
    dialogue: {
      greeting: `*sourire ensorcelant* "Oh, quelle charmante surprise! J'adore rencontrer de nouvelles... personnes intéressantes. Puis-je vous offrir un verre?"`,
      trade: `*se penche en chuchotant* "Cette information vaut son pesant d'or. Littéralement. Mais pour vous... disons que je peux faire un prix d'ami."`,
      quest: `*voix sérieuse pour une fois* "J'ai un problème. Un vrai. Quelqu'un enquête sur moi. Sur ma VRAIE identité. Trouvez qui c'est et... éliminez le problème. Discrètement."`,
      farewell: `*clin d'œil* "Nous ne nous sommes jamais vus. Mais si vous aviez besoin... vous savez où ne pas me trouver."`
    },
    reputation: {
      required: 0
    },
    tradingTips: `Lysandra adore les secrets. Échangez une information contre une autre pour meilleurs prix. Ne lui faites jamais confiance à 100%.`
  },

  {
    id: 'npc_spy_marcus_shadows',
    name: 'Marcus des Ombres',
    race: 'Humain',
    class: 'Assassin Niveau 81',
    age: 43,
    role: 'spy',
    personality: 'Professionnel froid, pas d\'émotions, contrats avant tout',
    location: 'Variable (contacté via messages codés)',
    description: `Un homme aux traits ordinaires qu'on oublie immédiatement. Vêtements gris, cheveux bruns, taille moyenne. La seule constante : un tatouage d'ombre sur son poignet droit (toujours caché).`,
    backstory: `Marcus est l'un des "Cinq Lames" — les assassins d'élite de la Main Noire. Il a éliminé 127 cibles sans jamais être vu. Il ne pose jamais de questions, n'a aucun remords et respecte toujours ses contrats. Contrairement aux autres assassins, il refuse de tuer les enfants, ce qui lui a valu des problèmes avec certains employeurs. Il cherche secrètement à se racheter en éliminant uniquement les cibles "qui le méritent" mais sa définition de mérite est... flexible.`,
    faction: 'faction_main_noire',
    services: ['assassination_contracts', 'surveillance', 'infiltration', 'evidence_removal'],
    inventory: [
      { name: 'Contrat d\'Assassinat Mineur', rarity: 'uncommon', price: 3000, effect: 'Élimine cible CR 5 ou moins' },
      { name: 'Contrat d\'Assassinat Majeur', rarity: 'rare', price: 15000, effect: 'Élimine cible CR 10 ou moins' },
      { name: 'Surveillance 24h', rarity: 'uncommon', price: 1000, effect: 'Rapport complet cible' },
      { name: 'Poison Indétectable', rarity: 'epic', price: 5000, effect: 'Mort en 24h, semble naturelle' }
    ],
    questsGiven: ['quest_marcus_redemption', 'quest_five_blades', 'quest_perfect_crime'],
    dialogue: {
      greeting: `*voix monotone* "Vous m'avez contacté. J'écoute."`,
      trade: `"Le prix est fixe. Le délai est de 7 jours. Paiement à l'avance. Des questions?"`,
      quest: `"J'ai besoin d'aide. Une première. Ma cible... est un enfant. Je refuse. Mais le client menace de révéler mon identité si je n'obéis pas. Aidez-moi à le neutraliser."`,
      farewell: `"Le contrat sera honoré. Nous ne nous reverrons jamais."`
    },
    reputation: {
      required: -20
    },
    tradingTips: `Marcus respecte le professionnalisme. Soyez direct, payez cash, ne posez pas de questions stupides. Il peut refuser un contrat si cible est innocente.`
  },

  {
    id: 'npc_spy_celeste',
    name: 'Dame Celeste Moonshadow',
    race: 'Elfe',
    class: 'Diplomate/Espion Niveau 74',
    age: 312,
    role: 'spy',
    personality: 'Élégante, manipulatrice subtile, cache agendas multiples',
    location: 'Sol-Aureus - Quartier Noble (Manoir Moonshadow)',
    description: `Une elfe aristocratique d'une beauté froide, portant toujours des robes de haute couture. Ses cheveux argentés sont parfaitement coiffés et elle dégage un parfum de roses blanches. Ses yeux gris semblent lire dans les âmes.`,
    backstory: `Celeste est officiellement une noble elfe fortunée qui organise des bals mondains. En réalité, elle est le maître espion de la Sylve d'Émeraude à Sol-Aureus. Ses bals sont des occasions de récolter secrets et manipuler la noblesse humaine. Elle a orchestré 3 mariages politiques, empêché 2 guerres et placé 15 agents dormants dans la cour royale. Son manoir cache un réseau de tunnels secrets menant partout dans la ville.`,
    faction: 'faction_sylve_emeraude',
    services: ['political_manipulation', 'noble_gatherings', 'matchmaking', 'information_network'],
    inventory: [
      { name: 'Invitation au Bal', rarity: 'uncommon', price: 500, effect: 'Accès cercle noble' },
      { name: 'Réseau de Contacts', rarity: 'rare', price: 3000, effect: 'Introductions nobles puissants' },
      { name: 'Dossier Compromettant', rarity: 'epic', price: 8000, effect: 'Blackmail noble au choix' },
      { name: 'Faveur Politique', rarity: 'legendary', price: 20000, effect: 'Manipule décision royale' }
    ],
    questsGiven: ['quest_celeste_ball_infiltration', 'quest_marriage_sabotage', 'quest_dormant_agents'],
    dialogue: {
      greeting: `*sourire gracieux* "Bienvenue dans mon humble demeure. Puis-je vous offrir du thé? J'ai entendu parler de vous. Rien ne m'échappe dans cette ville."`,
      trade: `"Les faveurs se paient cher à Sol-Aureus. Mais je suis certaine que nous pouvons nous arranger... mutuellement."`,
      quest: `"J'organise un bal dans trois jours. Un noble corrompu y sera présent. Infiltrez-vous, récupérez son journal intime et ressortez sans être vu. Élégance et discrétion, je vous prie."`,
      farewell: `"Ce fut un plaisir. N'oubliez pas : dans les salons, les mots tuent aussi sûrement que les lames."`
    },
    reputation: {
      required: 40,
      faction: 'faction_sylve_emeraude'
    },
    tradingTips: `Celeste apprécie la classe et l'intelligence. Impressionnez-la lors de ses bals pour débloquer ses services les plus puissants.`
  },

  // (5 autres espions/agents suivent...)

  // ============================================================================
  // NOBLES CORROMPUS (7 NPCs)
  // ============================================================================

  {
    id: 'npc_duke_blackthorn',
    name: 'Duc Alistair Blackthorn',
    race: 'Humain',
    class: 'Noble/Sorcier Niveau 45',
    age: 52,
    role: 'antagonist',
    personality: 'Sadique, cupide, obsédé par le pouvoir',
    location: 'Sol-Aureus - Manoir Blackthorn',
    description: `Un homme mince aux cheveux noirs gominés et à la moustache fine. Il porte des vêtements noirs luxueux et un anneau avec un rubis sombre qui pulse faiblement. Ses yeux ont une lueur rougeâtre inquiétante.`,
    backstory: `Blackthorn a vendu son âme à un démon mineur du Miroir des Ombres en échange de pouvoir et de richesse. Il dirige un réseau de trafic d'esclaves, expérimente sur des prisonniers dans ses cachots et complote pour assassiner la Reine Elara. Son manoir est un lieu de débauche et de cruauté. Peu de gens connaissent sa vraie nature car il maintient une façfaçade de noble philanthrope. Il possède un fragment d'un Sceau Brisé qu'il utilise pour invoquer des créatures d'ombre.`,
    faction: 'faction_culte_ombre',
    services: null,
    inventory: null,
    questsGiven: ['quest_blackthorn_expose', 'quest_rescue_prisoners', 'quest_seal_fragment'],
    dialogue: {
      greeting: `*sourire faux* "Ah, un... visiteur. Que me vaut l'honneur de votre présence dans mon humble manoir?"`,
      quest: null,
      farewell: `"Partez. Avant que je ne change d'avis sur votre... utilité."`
    },
    reputation: {
      required: -50
    },
    tradingTips: `NE PAS travailler pour Blackthorn sauf si vous jouez un personnage maléfique. L'exposer rapporte récompenses massives de la Couronne.`
  },

  {
    id: 'npc_lady_vermillion',
    name: 'Lady Scarlett Vermillion',
    race: 'Humaine',
    class: 'Noble/Enchanteuse Niveau 38',
    age: 34,
    role: 'antagonist',
    personality: 'Manipulatrice, séductrice, jalouse pathologique',
    location: 'Sol-Aureus - Manoir Vermillion',
    description: `Une femme d'une beauté fatale aux cheveux roux flamboyants et aux lèvres écarlates. Elle porte toujours du rouge et possède une collection de bijoux enchantés. Son parfum est envoûtant et légèrement hallucinogène.`,
    backstory: `Scarlett utilise la magie d'enchantement pour contrôler secrètement plusieurs nobles influents, incluant trois conseillers royaux. Elle orchestre une guerre civile lente en manipulant les rivalités entre maisons nobles. Son objectif : devenir la femme la plus puissante de Sol-Aureus en contrôlant le trône depuis l'ombre. Elle a déjà causé 7 divorces, 12 duels mortels et 4 suicides. Son manoir cache une collection de portraits de ses victimes.`,
    faction: 'faction_noblesse_corrompue',
    services: null,
    inventory: null,
    questsGiven: ['quest_scarlett_enchantment_break', 'quest_victim_portraits', 'quest_civil_war_prevent'],
    dialogue: {
      greeting: `*voix mielleuse* "Oh, comme vous êtes... intéressant. Entrez donc. J'adore la compagnie des gens... fascinants."`,
      quest: null,
      farewell: `*rire cristallin* "À bientôt, j'espère. Vous êtes déjà dans mes pensées..."`
    },
    reputation: {
      required: -40
    },
    tradingTips: `Scarlett tente d'enchanter tout visiteur (DC Sagesse 16). Résistez et exposez-la pour sauver ses victimes.`
  },

  // (5 autres nobles corrompus suivent...)

  // ============================================================================
  // PROPHÈTES & MYSTIQUES (5 NPCs)
  // ============================================================================

  {
    id: 'npc_prophet_ezekiel',
    name: 'Prophète Ezekiel le Voyant',
    race: 'Humain',
    class: 'Clerc/Oracle Niveau 83',
    age: 71,
    role: 'quest_giver',
    personality: 'Mystique, parle par énigmes, tourmenté par visions',
    location: 'Sol-Aureus - Temple Abandonné du District des Ombres',
    description: `Un vieil homme décharné aux yeux laiteux, aveugle mais "voit" plus que quiconque. Il porte des robes en lambeaux couvertes de symboles prophétiques écrits avec son propre sang. Ses mains tremblent constamment et il marmonne des visions.`,
    backstory: `Ezekiel a reçu le "Don de Prescience" après avoir survécu à une rencontre avec une entité du Miroir des Ombres il y a 40 ans. Depuis, il voit des fragments de futurs possibles dans des visions cauchemardesque qui ne le laissent jamais en paix. Il a prédit 23 catastrophes majeures dont 19 se sont réalisées. La Couronne le consulte secrètement mais le considère fou. Ses prophéties les plus terrifiantes concernent un "Âge des Ombres" à venir où le Miroir engloutirait Aethelgard.`,
    faction: null,
    services: ['prophecy_reading', 'divine_guidance', 'curse_removal', 'future_glimpse'],
    inventory: [
      { name: 'Lecture Prophétique Mineure', rarity: 'uncommon', price: 500, effect: 'Aperçu futur proche (24h)' },
      { name: 'Lecture Prophétique Majeure', rarity: 'rare', price: 3000, effect: 'Vision future lointain (1 mois)' },
      { name: 'Rituel de Clarté', rarity: 'epic', price: 8000, effect: 'Réponse divine à 1 question' },
      { name: 'Talismans de Protection', rarity: 'uncommon', price: 800, effect: '+2 JdS contre divination' }
    ],
    questsGiven: ['quest_ezekiel_vision_truth', 'quest_prevent_prophecy', 'quest_mirror_warning'],
    dialogue: {
      greeting: `*voix tremblante* "Je... je vous ai vu venir. Dans le sang. Dans les flammes. Dans l'ombre qui danse. Pourquoi... pourquoi êtes-vous ici?"`,
      trade: `"Vous voulez voir? Voir ce qui SERA? *rire dément* Attention... certaines vérités détruisent l'esprit..."`,
      quest: `*agrippe votre bras avec force surprenante* "ÉCOUTEZ! J'ai VU! Les Sceaux... ils se brisent! Un par un! Vous devez... vous DEVEZ les arrêter! Sinon... *sanglots* tout est perdu..."`,
      farewell: `*marmonne* "Partez... les ombres vous suivent déjà... je les vois ramper... ramper..."`
    },
    reputation: {
      required: 0
    },
    tradingTips: `Les prophéties d'Ezekiel sont vraies mais cryptiques. Payez bien, notez chaque mot, interprétez soigneusement.`
  },

  {
    id: 'npc_oracle_lunara',
    name: 'Oracle Lunara Étoile-de-Minuit',
    race: 'Elfe',
    class: 'Druide/Oracle Niveau 79',
    age: 521,
    role: 'quest_giver',
    personality: 'Sereine, sage, parle avec les étoiles',
    location: 'Sylve d\'Émeraude - Clairière Sacrée',
    description: `Une elfe éthérée aux cheveux argentés qui brillent faiblement. Ses yeux reflètent les constellations et changent selon la position des étoiles. Elle porte une robe tissée de lumière lunaire et flotte légèrement au-dessus du sol.`,
    backstory: `Lunara est l'Oracle des Étoiles, bénie par Lunara la déesse dont elle porte le nom. Elle peut lire le destin dans les constellations et communiquer avec les esprits stellaires. Tous les 100 ans, elle entre en transe et prononce une Grande Prophétie qui change le cours de l'histoire. Sa dernière prophétie annonçait la chute de l'Hégémonie d'Ashka. Elle prépare actuellement une nouvelle Grande Prophétie et les signes la terrifient.`,
    faction: 'faction_gardiens_nature',
    services: ['star_reading', 'destiny_guidance', 'spiritual_advice', 'constellation_magic'],
    inventory: [
      { name: 'Carte Stellaire Enchantée', rarity: 'rare', price: 2500, effect: 'Révèle destin personnel' },
      { name: 'Potion de Clarté Lunaire', rarity: 'epic', price: 5000, effect: '+5 Sagesse 24h, visions claires' },
      { name: 'Amulette d\'Étoile', rarity: 'legendary', price: 15000, effect: 'Protection divine Lunara' },
      { name: 'Rituel Grande Prophétie', rarity: 'artifact', price: 50000, effect: 'Vision future majeur' }
    ],
    questsGiven: ['quest_lunara_prophecy', 'quest_stellar_alignment', 'quest_goddess_blessing'],
    dialogue: {
      greeting: `*voix mélodieuse* "Les étoiles m'ont murmuré votre nom, voyageur. Elles disent que vous portez un destin lourd."`,
      trade: `"La sagesse des étoiles n'est pas gratuite. Mais pour ceux qui cherchent vraiment la vérité, je trouve toujours un moyen."`,
      quest: `"Les constellations s'alignent de manière inquiétante. La Grande Prophétie approche. Mais je vois... interférence. Quelque chose bloque les étoiles. Aidez-moi à clarifier la vision avant qu'il ne soit trop tard."`,
      farewell: `"Que Lunara guide vos pas. Et souvenez-vous : le futur n'est jamais gravé dans la pierre."`
    },
    reputation: {
      required: 50,
      faction: 'faction_gardiens_nature'
    },
    tradingTips: `Lunara offre guidance gratuite aux druides et rangers. Ses prophéties sont plus claires qu'Ezekiel mais plus coûteuses.`
  },

  // (3 autres prophètes/mystiques suivent...)

  // ============================================================================
  // LEADERS DE CULTES (6 NPCs)
  // ============================================================================

  {
    id: 'npc_cultist_malachi',
    name: 'Grand Prêtre Malachi Voix-d\'Ombre',
    race: 'Humain',
    class: 'Clerc (Domaine: Ombre) Niveau 86',
    age: 58,
    role: 'antagonist',
    personality: 'Fanatique, charismatique, croit sincèrement au retour des Ombres',
    location: 'Terres Brûlées - Temple Caché du Miroir',
    description: `Un homme imposant en robes noires ornées de runes argentées. Son visage est marqué de tatouages d'ombre qui bougent légèrement. Ses yeux sont entièrement noirs sans blanc visible. Il dégage une aura de froid.`,
    backstory: `Malachi dirige le Culte du Miroir Éternel, une secte qui vénère les entités du Miroir des Ombres. Il croit sincèrement que les Ombres apporteront "l'illumination finale" à Aethelgard en consumant toute lumière. Il a converti 500+ fidèles et sabote activement les Sceaux qui retiennent le Miroir. Son temple cache un portail mineur vers le Plan d'Ombre où il puise son pouvoir. Il n'est pas maléfique dans son esprit — il pense sauver le monde.`,
    faction: 'faction_culte_ombre',
    services: null,
    inventory: null,
    questsGiven: ['quest_malachi_conversion_resist', 'quest_temple_infiltration', 'quest_portal_close'],
    dialogue: {
      greeting: `*voix profonde et hypnotique* "Bienvenue, âme perdue. Vous êtes venu chercher l'illumination? Les Ombres vous accueillent."`,
      quest: null,
      farewell: `"Vous reviendrez. Tous reviennent. Les Ombres vous appellent déjà..."`
    },
    reputation: {
      required: -60
    },
    tradingTips: `Malachi tente de convertir tout visiteur. Résistez (DC Sagesse 18) ou rejoignez son culte (alignement change vers Mauvais). L'arrêter est une quête majeure.`
  },

  {
    id: 'npc_cultist_seraphina',
    name: 'Sœur Seraphina la Purificatrice',
    race: 'Humaine',
    class: 'Inquisitrice Niveau 72',
    age: 39,
    role: 'antagonist',
    personality: 'Zélatrice, croit au bien absolu, impitoyable envers "impurs"',
    location: 'Sol-Aureus - Chapelle de la Flamme Pure',
    description: `Une femme sévère aux cheveux blonds coupés courts, portant une armure blanche immaculée. Elle porte un symbole de flamme sacrée et une épée qui brûle d'un feu blanc. Ses yeux brillent d'un fanatisme intense.`,
    backstory: `Seraphina dirige l'Ordre de la Flamme Purificatrice, une secte extrémiste de l'Église de Lumière. Elle croit que tout ce qui n'est pas "pur" (magie arcanique, créatures féeriques, mort-vivants, extraplanaires) doit être détruit. Elle a mené 23 purges sanglantes, brûlé 150+ "sorciers" et détruit 3 villages "contaminés". L'Église officielle l'a excommuniée mais elle ignore l'ordre. Elle cible maintenant les mages du Cercle Arcanique.`,
    faction: 'faction_ordre_flamme_pure',
    services: null,
    inventory: null,
    questsGiven: ['quest_seraphina_stop_purge', 'quest_save_mages', 'quest_excommunication_enforce'],
    dialogue: {
      greeting: `*voix dure* "Montrez-moi vos mains. Pas de marques magiques? Bien. Dites-moi, êtes-vous PUR?"`,
      quest: null,
      farewell: `"Priez pour votre pureté. La Flamme juge tous."`
    },
    reputation: {
      required: -70
    },
    tradingTips: `Seraphina est hostile aux mages/sorciers. L'arrêter sauve des innocents et gagne faveur du Cercle Arcanique.`
  },

  // (4 autres leaders de cultes suivent...)

  // ============================================================================
  // CHASSEURS DE TRÉSORS & AVENTURIERS RIVAUX (4 NPCs)
  // ============================================================================

  {
    id: 'npc_treasure_hunter_drake',
    name: 'Drake "Oeil-de-Faucon" Hawkins',
    race: 'Humain',
    class: 'Ranger/Roublard Niveau 68',
    age: 41,
    role: 'rival',
    personality: 'Arrogant, compétitif, honorable dans les compétitions',
    location: 'Variable (ruines, donjons, sites de trésors)',
    description: `Un homme charismatique aux cheveux bruns en bataille, portant un chapeau de cuir et un long manteau. Il a une cicatrice sur l'œil droit et porte un fouet à sa ceinture. Sourire confiant permanent.`,
    backstory: `Drake est le chasseur de trésors le plus célèbre d'Aethelgard. Il a récupéré 47 artefacts légendaires, survécu à 89 pièges mortels et exploré des ruines que personne n'avait vues depuis l'Ère de l'Éveil. Il respecte les règles du "jeu" : premier arrivé, premier servi, mais pas de sabotage mortel entre chasseurs. Il considère les joueurs comme des rivaux dignes et propose souvent des défis : "Premier à atteindre le trésor le garde."`,
    faction: 'faction_guilde_explorateurs',
    services: ['dungeon_maps', 'trap_detection_training', 'artifact_identification', 'rival_challenges'],
    inventory: [
      { name: 'Carte au Trésor (Authentique)', rarity: 'rare', price: 5000, effect: 'Mène à coffre 10k PO valeur' },
      { name: 'Kit Anti-Pièges Professionnel', rarity: 'epic', price: 3000, effect: '+5 détection/désarmement pièges' },
      { name: 'Grimoire de Ruines', rarity: 'uncommon', price: 1500, effect: 'Infos sur 20 donjons' },
      { name: 'Artefact Mineur', rarity: 'rare', price: 8000, effect: 'Item magique aléatoire' }
    ],
    questsGiven: ['quest_drake_race_to_treasure', 'quest_ancient_map', 'quest_dungeon_alliance'],
    dialogue: {
      greeting: `*sourire en coin* "Tiens tiens, de la nouvelle concurrence! Bienvenue dans le jeu, rookie. Prêt à perdre?"`,
      trade: `"Tu veux des infos? D'accord. Mais si on se croise dans un donjon, que le meilleur gagne!"`,
      quest: `"J'ai un défi pour toi. Il y a un trésor dans les Ruines de Sable. Premier arrivé le garde, perdant paye le gagnant 1000 PO. Marché conclu?"`,
      farewell: `"On se reverra dans les ruines, rival! Et souviens-toi : Drake Hawkins ne perd jamais deux fois!"`
    },
    reputation: {
      required: 30,
      faction: 'faction_guilde_explorateurs'
    },
    tradingTips: `Drake respecte les chasseurs compétents. Battez-le dans 3 défis pour accéder à ses cartes légendaires.`
  },

  // (3 autres chasseurs de trésors suivent...)

  // ============================================================================
  // PERSONNAGES DE TAVERNE (6 NPCs)
  // ============================================================================

  {
    id: 'npc_barkeeper_old_sam',
    name: 'Vieux Sam "Mémoire d\'Acier"',
    race: 'Humain',
    class: 'Roturier/Ex-Aventurier Niveau 42',
    age: 67,
    role: 'innkeeper',
    personality: 'Sage, bon auditeur, mémoire photographique, connaît tous les secrets',
    location: 'Sol-Aureus - Taverne "Le Dragon Rouillé"',
    description: `Un vieil homme robuste à la barbe grise, essuyant constamment des verres. Il a une jambe de bois (perdue face à un dragon) et une collection de cicatrices. Ses yeux pétillent d'intelligence malgré son âge.`,
    backstory: `Sam était autrefois un aventurier légendaire qui a exploré la moitié d'Aethelgard. Après avoir perdu sa jambe, il a ouvert la taverne la plus populaire de Sol-Aureus. Sa vraie valeur? Il se souvient de TOUT ce qu'on lui raconte et peut connecter des informations apparemment sans rapport. La moitié des quêtes commencent par "Sam a mentionné que...". Il est le confident non-officiel de 200+ aventuriers et ne trahit jamais une confidence... sauf si la vie de quelqu'un en dépend.`,
    faction: null,
    services: ['lodging', 'information_hub', 'rumor_mill', 'adventurer_contacts', 'story_sharing'],
    inventory: [
      { name: 'Chambre Privée (1 nuit)', rarity: 'common', price: 50, effect: 'Repos long confortable' },
      { name: 'Chambre Suite (1 nuit)', rarity: 'uncommon', price: 200, effect: 'Repos long + buff +1 stats' },
      { name: 'Informations Locales', rarity: 'uncommon', price: 100, effect: 'Rumeurs actuelles' },
      { name: 'Contact Aventurier', rarity: 'rare', price: 500, effect: 'Introduction à aventurier spécifique' },
      { name: 'Histoire Ancienne', rarity: 'epic', price: 2000, effect: 'Révèle secret historique' }
    ],
    questsGiven: ['quest_sam_old_adventure', 'quest_connect_dots', 'quest_tavern_trouble'],
    dialogue: {
      greeting: `*sourire chaleureux* "Bienvenue au Dragon Rouillé! Premier verre offert pour les nouveaux. Installez-vous et racontez-moi vos aventures."`,
      trade: `"Ah, vous cherchez des infos? *essuie verre* Voyons voir... j'ai peut-être entendu quelque chose qui pourrait vous intéresser..."`,
      quest: `"Tu sais, j'ai entendu trois histoires différentes cette semaine qui... ne collent pas ensemble. Une créature dans les égouts, des gardes disparus, et un marchand qui vend des gemmes trop bon marché. Y a un lien. Trouve-le."`,
      farewell: `"Reviens quand tu veux! Et fais attention là-bas. Le monde est dangereux pour les imprudents."`
    },
    reputation: {
      required: 0
    },
    tradingTips: `Sam apprécie les bons conteurs. Racontez-lui vos aventures (vraies) pour réductions et informations gratuites.`
  },

  {
    id: 'npc_bard_melody',
    name: 'Melody Chant-d\'Or',
    race: 'Halfling',
    class: 'Barde Niveau 65',
    age: 34,
    role: 'bard',
    personality: 'Joyeuse, curieuse, transforme tout en chanson',
    location: 'Sol-Aureus - Taverne "Le Dragon Rouillé"',
    description: `Une halfling énergique aux cheveux bouclés roux, portant des vêtements colorés. Elle joue d'une luth enchantée qui brille légèrement. Son rire est contagieux et elle danse en marchant.`,
    backstory: `Melody est la barde résidente du Dragon Rouillé et la source #1 de propagation de rumeurs à Sol-Aureus. Elle compose des chansons sur les aventures des héros (souvent exagérées) qui deviennent populaires. Chanter avec elle augmente votre réputation mais attention : elle transformera vos échecs en ballades comiques aussi! Elle cache un secret : elle est membre de la Main Noire et utilise ses chansons pour passer des messages codés.`,
    faction: 'faction_main_noire',
    services: ['performance', 'reputation_boost', 'song_composition', 'rumor_spreading', 'coded_messages'],
    inventory: [
      { name: 'Chanson Héroïque', rarity: 'uncommon', price: 500, effect: '+20 réputation Sol-Aureus' },
      { name: 'Ballade Épique', rarity: 'rare', price: 2000, effect: '+50 réputation + renommée' },
      { name: 'Message Codé', rarity: 'uncommon', price: 300, effect: 'Contact Main Noire sécurisé' },
      { name: 'Performance Buffs', rarity: 'uncommon', price: 100, effect: '+2 Charisme 1h' }
    ],
    questsGiven: ['quest_melody_secret_identity', 'quest_song_of_heroes', 'quest_coded_concert'],
    dialogue: {
      greeting: `*accord joyeux de luth* "Bonjour bonjour! Nouveau visage! Tu as des histoires à partager? J'ADORE les histoires!"`,
      trade: `"Tu veux une chanson sur toi? Super! Raconte-moi tes exploits et je les immortaliserai! *rire* Promis, j'exagèrerai juste un peu!"`,
      quest: `*chuchote sérieusement* "Je dois passer un message à... quelqu'un. Mais je suis surveillée. Joue ce morceau *tend partition* à la Taverne du Port. Le bon contact se manifestera."`,
      farewell: `"À bientôt! Et souviens-toi : chaque aventure mérite une chanson!"`
    },
    reputation: {
      required: 10
    },
    tradingTips: `Melody amplifie votre renommée. Accomplissez des exploits puis payez-la pour devenir célèbre. Découvrez son secret Main Noire pour missions spéciales.`
  },

  // (4 autres personnages de taverne suivent dans le fichier complet...)
];

// Helper fonction pour filtrer NPCs par rôle
export function getNPCsByRole(role: string) {
  return EXPANDED_NPCS_BATCH_2.filter(npc => npc.role === role);
}

// Helper fonction pour NPCs disponibles dans une location
export function getNPCsByLocation(location: string) {
  return EXPANDED_NPCS_BATCH_2.filter(npc => 
    npc.location.toLowerCase().includes(location.toLowerCase())
  );
}
