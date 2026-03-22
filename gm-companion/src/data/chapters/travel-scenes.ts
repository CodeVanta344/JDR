/**
 * TRAVEL & INTERCALARY SCENES
 * 20 scènes de voyage et de temps libre entre les chapitres.
 * Chaque scène est auto-contenue et peut être jouée en 15–45 minutes.
 */
import type { NarrativeScene } from './types';

// ────────────────────────────────────────────────────────────────────
// Entre ch1 et ch2 — Route vers Corvale
// ────────────────────────────────────────────────────────────────────
export const TRAVEL_SCENES_CH1_CH2: NarrativeScene[] = [
  {
    id: 'travel_1_auberge_carrefour', title: 'L\'Auberge du Carrefour',
    type: 'exploration',
    readAloud: 'À la croisée de la route royale et du chemin forestier, l\'Auberge du Carrefour Doré brille comme un phare dans la brume du soir. L\'enseigne grince : un calice d\'or sur fond de chêne. À l\'intérieur, des voyageurs de toutes sortes partagent des nouvelles inquiétantes autour de pintes de bière brune.',
    gmNotes: 'Introduction au mood du monde. 3 rumeurs à distribuer (voir table ci-dessous). L\'aubergiste, Marta, est une ancienne aventurière (Guerrière niv. 5 retirée) qui reconnaît des armes magiques si les PJ en portent. Un marchand itinérant vend des potions (prix ×1.5 car pénurie).',
    hooks: ['Écouter les rumeurs : Perception DC 10 → une rumeur par PJ', 'Le marchand Dorian a un objet rare mais demande un service en échange', 'Un voyageur blessé arrive — il a fui Corvale'],
    decisions: [
      { condition: 'Aider le voyageur blessé', nextScene: 'travel_1b_voyageur', label: 'Soigner et interroger le voyageur' },
      { condition: 'Acheter des provisions', nextScene: 'travel_1c_marchand', label: 'Marchander avec Dorian' },
      { condition: 'Dormir et reprendre la route', nextScene: 'ch2_s1_approche', label: 'Vers Corvale à l\'aube' }
    ],
    estimatedMinutes: 20, mood: 'auberge-chaleureuse',
    music: 'Taverne — luth, rires, crépitement de feu', location: 'Route Royale — Carrefour Doré'
  },
  {
    id: 'travel_1b_voyageur', title: 'Le Voyageur Blessé',
    type: 'social',
    readAloud: 'L\'homme s\'effondre à l\'entrée de l\'auberge. Son manteau est déchiré, ses mains tremblent. "Les morts... les morts marchent à Corvale," murmure-t-il avant de perdre connaissance.',
    gmNotes: 'Le voyageur s\'appelle Hern, fermier de la périphérie de Corvale. Il a vu des morts-vivants à la lisière du village. Médecine DC 10 pour le stabiliser. Investigation DC 12 : des marques de griffes sur son dos correspondent à des goules. Il possède un médaillon en argent avec le symbole de Corvale.',
    hooks: ['Hern peut donner des infos sur les défenses de Corvale', 'Le médaillon ouvre un passage secret dans l\'église de Corvale (utile au ch2)'],
    decisions: [
      { condition: 'Hern stabilisé et interrogé', nextScene: 'ch2_s1_approche', label: 'Vers Corvale avec les informations de Hern' }
    ],
    estimatedMinutes: 15, mood: 'tension-inquiétude',
    music: 'Mystère — violoncelle bas, pas sur le gravier', location: 'Auberge du Carrefour Doré'
  },
  {
    id: 'travel_1c_marchand', title: 'Le Marchand Dorian',
    type: 'social',
    readAloud: 'Dorian déploie sa marchandise sur une table avec la grâce d\'un prestidigitateur. Fioles colorées, herbes séchées, un parchemin jauni. "Tout a un prix, mes amis. Mais les prix changent quand le monde change, n\'est-ce pas ?"',
    gmNotes: 'Dorian vend : 3 potions de soins (60 PO chacune au lieu de 50), 1 antidote (25 PO), 1 huile sacrée contre les morts-vivants (40 PO, +1d6 radiant pour 1 heure). Il veut en échange que les PJ livrent un paquet à Sol-Aureus (quête secondaire qui rapporte 200 PO au ch3). Persuasion DC 13 pour réduire ses prix à la normale.',
    hooks: ['Le paquet contient un message codé pour l\'Archiviste de Sol-Aureus', 'Dorian connaît des raccourcis dans la région (réduit le temps de voyage de 1 jour)'],
    decisions: [
      { condition: 'Affaire conclue', nextScene: 'ch2_s1_approche', label: 'Reprendre la route vers Corvale' }
    ],
    loot: ['Potions de soins (×3)', 'Antidote (×1)', 'Huile sacrée contre morts-vivants (×1)', 'Paquet pour Sol-Aureus'],
    estimatedMinutes: 15, mood: 'commerce-négociation',
    music: 'Marché — pièces tintant, murmures', location: 'Auberge du Carrefour Doré'
  }
];

// ────────────────────────────────────────────────────────────────────
// Entre ch2 et ch3 — Route vers Sol-Aureus
// ────────────────────────────────────────────────────────────────────
export const TRAVEL_SCENES_CH2_CH3: NarrativeScene[] = [
  {
    id: 'travel_2_campement_nuit', title: 'Campement sous les Étoiles',
    type: 'exploration',
    readAloud: 'La route vers Sol-Aureus traverse des collines douces. Le soleil se couche, peignant le ciel en orange et violet. Un torrent chante à proximité — endroit idéal pour un campement.',
    gmNotes: 'Moment de RP libre. Les PJ peuvent pêcher (Survie DC 10 : poisson qui nourrit le groupe), observer les étoiles (Arcanes DC 12 : les constellations sont "fausses" — un signe de la corruption des Sceaux), ou monter la garde (Perception DC 14 pendant la nuit → rencontre aléatoire).',
    hooks: ['Échange de backstory entre PJ', 'Rêves prophétiques si un PJ dort près du torrent (JDS Sagesse DC 14 → vision du Miroir Brisé)'],
    decisions: [
      { condition: 'Nuit passée sans incident', nextScene: 'travel_2b_pont_casse', label: 'Lever du jour — reprendre la route' },
      { condition: 'Rencontre nocturne', nextScene: 'travel_2_encounter_night', label: 'Quelque chose approche...' }
    ],
    estimatedMinutes: 20, mood: 'repos-contemplation',
    music: 'Nuit — grillons, vent léger, crépitement de feu', location: 'Collines d\'Aethelgard'
  },
  {
    id: 'travel_2_encounter_night', title: 'Visite Nocturne',
    type: 'combat',
    readAloud: 'Un hurlement déchire la nuit. Pas des loups — quelque chose de plus guttural. Des yeux brillent dans l\'obscurité au-delà du cercle de lumière de votre feu.',
    gmNotes: '3 goules errantes (CR 1 chacune) — des victimes de la corruption de Corvale qui ont migré. Si les PJ en capturent une vivante, elle murmure le nom "Malachi" avant de se dissoudre. Butins sur les corps : 40 PO en bijoux volés, un journal à moitié lisible (indices sur la route des cultistes).',
    hooks: ['Le journal mentionne un camp cultiste à 2 jours de marche (crochet optionnel)'],
    decisions: [
      { condition: 'Goules vaincues', nextScene: 'travel_2b_pont_casse', label: 'Reprendre la route à l\'aube' }
    ],
    loot: ['40 PO en bijoux', 'Journal de goule (indices cultistes)'],
    estimatedMinutes: 15, mood: 'combat-nocturne',
    music: 'Combat — tambours rapides, cordes dissonantes', location: 'Collines d\'Aethelgard — Camp de nuit'
  },
  {
    id: 'travel_2b_pont_casse', title: 'Le Pont Brisé',
    type: 'exploration',
    readAloud: 'La route mène à un pont de pierre enjambant un ravin profond. Le pont est brisé en son milieu — un trou de 5 mètres sépare les deux moitiés. En bas, 20 mètres plus loin, un torrent violent. De l\'autre côté, des marques de griffes sur la pierre.',
    gmNotes: 'Obstacle technique. Solutions : saut (Athlétisme DC 14, 3d6 contondant si raté + chute dans le torrent), corde (si quelqu\'un traverse d\'abord, les autres peuvent suivre avec Acrobaties DC 10), escalade le long du ravin (Athlétisme DC 13, 30 minutes), ou magie (vol, lévitation, etc.). Les marques de griffes sont celles d\'un troll qui habite sous le pont.',
    hooks: ['Un troll vit sous le pont et attaque si les PJ font du bruit (Discrétion DC 12 collective)', 'Des gemmes brillent dans la paroi du ravin (120 PO si récupérées, Athlétisme DC 15)'],
    decisions: [
      { condition: 'Pont traversé', nextScene: 'ch3_s1_arrivee_solaureus', label: 'Les murs de Sol-Aureus apparaissent à l\'horizon' }
    ],
    estimatedMinutes: 20, mood: 'obstacle-créativité',
    music: 'Vent et eau — torrent, bourrasques, craquements de pierre', location: 'Route de Sol-Aureus — Pont de Karros'
  }
];

// ────────────────────────────────────────────────────────────────────
// Entre ch3 et ch4 — Route vers Hammerdeep
// ────────────────────────────────────────────────────────────────────
export const TRAVEL_SCENES_CH3_CH4: NarrativeScene[] = [
  {
    id: 'travel_3_contreforts_montagne', title: 'Les Contreforts des Montagnes d\'Acier',
    type: 'exploration',
    readAloud: 'La végétation se raréfie à mesure que vous montez dans les contreforts. La roche grise remplace l\'herbe verte. Au loin, les pics enneigés des Montagnes d\'Acier percent les nuages. L\'air devient froid et sec, chargé d\'une odeur de soufre.',
    gmNotes: 'Transition climatique. Les PJ sans vêtements chauds font JDS Constitution DC 10 toutes les 4 heures ou 1 niveau d\'épuisement. Un berger nain, Berek, garde ses chèvres de montagne. Il peut guider les PJ vers l\'entrée d\'Hammerdeep (gagne 4 heures de marche) contre 20 PO ou un service.',
    hooks: ['Berek mentionne des tremblements de terre inhabituels — signe de l\'instabilité du Sceau de la Montagne', 'Des mines abandonnées sur le chemin contiennent des minerais précieux mais sont dangereuses'],
    decisions: [
      { condition: 'Suivre Berek', nextScene: 'travel_3b_mine_abandonnee', label: 'Prendre le raccourci par les mines' },
      { condition: 'Route principale', nextScene: 'ch4_s1_portes', label: 'Les Portes de Fer d\'Hammerdeep' }
    ],
    estimatedMinutes: 15, mood: 'montagne-austère',
    music: 'Montagne — vent sifflant, pierres qui roulent, silence', location: 'Contreforts des Montagnes d\'Acier'
  },
  {
    id: 'travel_3b_mine_abandonnee', title: 'La Mine Abandonnée de Khardum',
    type: 'exploration',
    readAloud: 'L\'entrée de la mine est marquée par un portail nain à moitié effondré. Des pioches rouillées jonchent le sol. Berek s\'arrête net : "Mes ancêtres ont abandonné cet endroit il y a 50 ans. Ils disaient que quelque chose y avait élu domicile."',
    gmNotes: 'Mini-donjon optionnel (3 salles). Salle 1 : éboulement (Athlétisme DC 12 pour dégager). Salle 2 : champignons lumineux toxiques (Nature DC 11 pour les identifier, JDS Constitution DC 12 si inhalés → empoisonné 1h). Salle 3 : un filon de mithral avec un élémentaire de terre mineur (CR 2) qui le garde. Trésor : 150 PO en mithral brut + une gemme de protection (+1 CA temporaire, se brise après 3 coups absorbés).',
    hooks: ['Le mithral peut être offert aux nains d\'Hammerdeep → avantage au jet de diplomatie avec le Thane Durinn'],
    decisions: [
      { condition: 'Mine explorée ou contournée', nextScene: 'ch4_s1_portes', label: 'Les Portes de Fer d\'Hammerdeep' }
    ],
    loot: ['150 PO en mithral brut', 'Gemme de protection (+1 CA, 3 charges)'],
    estimatedMinutes: 30, mood: 'donjon-exploration',
    music: 'Mine — gouttes d\'eau, craquements, écho lointain', location: 'Mine abandonnée de Khardum'
  }
];

// ────────────────────────────────────────────────────────────────────
// Entre ch4 et ch5 — Préparation et départ vers le Col
// ────────────────────────────────────────────────────────────────────
export const TRAVEL_SCENES_CH4_CH5: NarrativeScene[] = [
  {
    id: 'travel_4_festin_nain', title: 'Le Festin de la Victoire Naine',
    type: 'social',
    readAloud: 'Le Thane Durinn ordonne un festin pour célébrer la réparation du Sceau. Les tables croulent sous les plats : sanglier rôti, fromage de montagne, bière naine noire comme la nuit. Les chants résonnent dans la grande salle.',
    gmNotes: 'Scène de RP et de récompense. Chaque PJ peut : participer au concours de boisson (Constitution DC 12, 14, 16 — prix : hache naine +1), lutter au bras de fer (Athlétisme DC 15 vs champion nain — prix : 50 PO et respect), chanter/danser (Représentation DC 12 — les nains adoptent le PJ comme "Frère/Sœur honoraire"). Pendant le festin, le Forge-Maître donne des informations sur le Col des Tempêtes.',
    hooks: ['La Forge-Maître Kelda donne une carte détaillée du Col des Tempêtes (avantage Survie au ch5)', 'Un jeune nain, Grundar, veut rejoindre les PJ (compagnon optionnel : Guerrier niv. 3, tanky mais impulsif)'],
    decisions: [
      { condition: 'Festin terminé', nextScene: 'travel_4b_depart_col', label: 'Le matin suivant — départ vers le Col' }
    ],
    loot: ['Carte du Col des Tempêtes', 'Provisions naines pour 7 jours', 'Hache naine +1 (si concours gagné)'],
    estimatedMinutes: 25, mood: 'célébration',
    music: 'Festin nain — tambours, chants gutturaux, cliquetis de chopes', location: 'Hammerdeep — Grande Salle du Thane'
  },
  {
    id: 'travel_4b_depart_col', title: 'L\'Ascension du Col',
    type: 'exploration',
    readAloud: 'Le chemin monte en lacets serrés. Les arbres deviennent des pins rabougris, puis disparaissent. Le vent forcit. Des nuages noirs s\'amoncellent au-dessus des pics. Le Col des Tempêtes porte bien son nom.',
    gmNotes: 'Transition atmosphérique. 3 défis de voyage : 1) Sentier effondré (Athlétisme DC 11 ou détour de 3 heures). 2) Tempête soudaine (Survie DC 12 pour trouver un abri, sinon JDS Constitution DC 10 → épuisement). 3) Choix de route : plus court (dangereux, col étroit) ou plus long (sûr, +6 heures). Le raccourci est piégé par des cultistes (Perception DC 13 pour repérer les signes).',
    hooks: ['Si les PJ prennent le raccourci et repèrent les signes cultistes, avantage surprise au ch5_s3'],
    decisions: [
      { condition: 'Col atteint', nextScene: 'ch5_s1_col', label: 'Le Col des Tempêtes' }
    ],
    estimatedMinutes: 20, mood: 'ascension-épique',
    music: 'Montagne haute — vent violent, tonnerre lointain', location: 'Montagnes d\'Acier — Versant Est'
  }
];

// ────────────────────────────────────────────────────────────────────
// Entre ch5 et ch6 — Approche des ruines d'Ashka
// ────────────────────────────────────────────────────────────────────
export const TRAVEL_SCENES_CH5_CH6: NarrativeScene[] = [
  {
    id: 'travel_5_plaines_cendres', title: 'Les Plaines de Cendres',
    type: 'exploration',
    readAloud: 'Au pied du Col, le monde change. L\'herbe est grise, le sol est poussière. Des arbres morts se dressent comme des squelettes. Un silence oppressant règne — pas d\'oiseaux, pas d\'insectes. Sur l\'horizon, les ruines d\'Ashka oscillent dans la chaleur.',
    gmNotes: 'Environnement post-apocalyptique. L\'eau est rare — Survie DC 12 pour trouver une source non contaminée. Sinon, l\'eau trouvée est saumâtre (JDS Constitution DC 10 ou empoisonné 1h). Les vestiges de fermes brûlées parsèment le chemin. Un squelette porte un médaillon avec un portrait de famille.',
    hooks: ['Le médaillon réagit si un PJ a le sort Parler aux morts — la victime donne des infos sur les forces cultistes à Ashka', 'Des traces fraîches (Survie DC 11) mènent à un camp de réfugiés caché'],
    decisions: [
      { condition: 'Traversée des plaines', nextScene: 'travel_5b_camp_refugies', label: 'Suivre les traces vers le camp de réfugiés' },
      { condition: 'Aller directement à Ashka', nextScene: 'ch6_s1_assaut', label: 'Approche directe des ruines' }
    ],
    estimatedMinutes: 15, mood: 'désolation',
    music: 'Désolation — vent sec, grincements, silence lourd', location: 'Plaines de Cendres — entre le Col et Ashka'
  },
  {
    id: 'travel_5b_camp_refugies', title: 'Le Camp des Réfugiés de Cendreterre',
    type: 'social',
    readAloud: 'Derrière un amas rocheux, une vingtaine de personnes survivent dans des abris de fortune. Des familles, des vieillards, des enfants. Leur chef, une femme en armure cabossée nommée Capitaine Brenna, lève sa lance à votre approche.',
    gmNotes: 'Les réfugiés sont les survivants d\'Ashka. Brenna était officière de la garnison. Elle sait que : 1) Le culte a établi un rituel au centre des ruines. 2) Les souterrains d\'Ashka offrent un accès furtif. 3) Environ 50 cultistes + 2 officiers + 1 créature invoquée gardent le site. Soigner les réfugiés (Médecine DC 10) → Brenna offre de guider les PJ par les souterrains (avantage surprise au ch6).',
    hooks: ['Brenna peut rejoindre les PJ comme éclaireur (Guerrière niv. 4)', 'Les enfants dessinent des "monstres d\'ombre" — représentations enfantines mais précises des cultistes'],
    decisions: [
      { condition: 'Infos obtenues', nextScene: 'ch6_s1_assaut', label: 'Vers les ruines d\'Ashka avec les infos de Brenna' }
    ],
    estimatedMinutes: 20, mood: 'compassion-détermination',
    music: 'Camp — feu mourant, sanglots étouffés, prière murmurée', location: 'Plaines de Cendres — Camp caché de Cendreterre'
  }
];

// ────────────────────────────────────────────────────────────────────
// Entre ch7 et ch8 — Nuit dans la Sylve
// ────────────────────────────────────────────────────────────────────
export const TRAVEL_SCENES_CH7_CH8: NarrativeScene[] = [
  {
    id: 'travel_7_rituel_elfique', title: 'Le Rituel de Purification',
    type: 'social',
    readAloud: 'Après la chute de Syrana, les elfes organisent un rituel de purification sous la pleine lune. Des lanternes flottent dans les airs, les elfes chantent en cercle autour de l\'Arbre-Mère. La magie coule comme de l\'eau argentée.',
    gmNotes: 'Scène de RP et de connexion avec la culture elfique. Si les PJ participent au rituel (Arcanes ou Religion DC 12), ils gagnent une bénédiction : +1d4 à tous les JDS Sagesse pendant 3 jours. L\'Archidruide Faelen offre un cadeau à chaque PJ : un cristal de Sylvandell (peut lancer Lumière 3 fois/jour, et brille en présence de corruption nécrotique).',
    hooks: ['Faelen révèle que la corruption de Syrana venait d\'un artefact — un éclat du Miroir Brisé. Le Miroir est plus dangereux qu\'on ne le pensait.', 'Un jeune elfe prodige, Liara, demande à accompagner les PJ pour venger son mentor tué par Syrana'],
    decisions: [
      { condition: 'Rituel terminé', nextScene: 'ch8_s1_depart', label: 'L\'aube — départ vers le Cœur de la Sylve' }
    ],
    loot: ['Cristal de Sylvandell (×nombre de PJ)', 'Bénédiction de purification (+1d4 JDS Sagesse, 3 jours)'],
    estimatedMinutes: 20, mood: 'rituel-mystique',
    music: 'Rituel elfique — harpe, voix éthérées, clochettes argentées', location: 'Sylvandell — Bosquet de l\'Arbre-Mère'
  }
];

// ────────────────────────────────────────────────────────────────────
// Entre ch9 et ch10 — Veille d'armes
// ────────────────────────────────────────────────────────────────────
export const TRAVEL_SCENES_CH9_CH10: NarrativeScene[] = [
  {
    id: 'travel_9_veille_armes', title: 'La Veille d\'Armes',
    type: 'social',
    readAloud: 'La nuit avant la marche. Le campement de l\'armée alliée s\'étend sur des kilomètres. Des feux de camp ponctuent l\'obscurité comme des étoiles tombées. Des soldats aiguisent leurs armes. Des prêtres murmurent des prières. L\'air est lourd d\'anxiété et de détermination.',
    gmNotes: 'Dernière soirée de calme avant le climax. Les PJ peuvent : visiter les différents campements (nains : bière et histoires de guerre ; elfes : méditation et tir à l\'arc ; humains : entraînement et chansons). Chaque visite rapporte un bonus pour la bataille finale. Nains : +1 CA pour 1 combat. Elfes : +2 initiative pour 1 combat. Humains : +5 PV temporaires.',
    hooks: ['Le Roi Alderon convoque les PJ en privé pour leur confier une mission spéciale : être la pointe de la lance, la première à entrer dans la Tour', 'Un soldat terrifié déserte — les PJ doivent décider de son sort'],
    decisions: [
      { condition: 'Nuit passée', nextScene: 'ch10_s1_marche', label: 'L\'aube — la marche vers Sombrelune commence' }
    ],
    estimatedMinutes: 25, mood: 'veille-solennelle',
    music: 'Veille — chœurs lointains, flammes, armures qui cliquettent', location: 'Campement de l\'Armée Alliée — Plaines du Crépuscule'
  },
  {
    id: 'travel_9b_dernières_lettres', title: 'Les Dernières Lettres',
    type: 'social',
    readAloud: 'Autour du feu, le silence s\'installe. Quelqu\'un sort un parchemin et une plume. "Au cas où on ne reviendrait pas..." dit un soldat. Bientôt, tout le monde écrit — des lettres à des proches, des testaments, des mots d\'amour jamais prononcés.',
    gmNotes: 'Scène émotionnelle. Demander à chaque joueur : "Qu\'écrit votre personnage, et à qui ?" Pas de jets de dés, juste du RP pur. Cette scène prépare l\'enjeu émotionnel du climax. Si un PJ a écrit une lettre à un PNJ récurrents, cela débloque un moment narratif au ch12 (le destinataire lit la lettre en public).',
    hooks: ['Un compagnon PNJ partage son propre secret / regret', 'Le scribe de l\'armée consigne les noms des volontaires pour la mission suicide'],
    decisions: [
      { condition: 'Lettres écrites', nextScene: 'ch10_s1_marche', label: 'Plus de mots à dire — la marche commence' }
    ],
    estimatedMinutes: 15, mood: 'émotion-intime',
    music: 'Silence — craquement du feu, plume grattant le parchemin', location: 'Campement de l\'Armée Alliée — Feu du groupe'
  }
];

// ────────────────────────────────────────────────────────────────────
// Entre ch6 et ch7 — Route vers la Sylve
// ────────────────────────────────────────────────────────────────────
export const TRAVEL_SCENES_CH6_CH7: NarrativeScene[] = [
  {
    id: 'travel_6_marche_foret', title: 'La Marche vers la Sylve',
    type: 'exploration',
    readAloud: 'Le paysage de désolation cède lentement la place à la verdure. Les premiers arbres apparaissent, timides, puis la forêt s\'épaissit. Les oiseaux reviennent. La lumière filtre à travers une canopée de plus en plus dense. L\'air se charge de senteurs de mousse et de résine.',
    gmNotes: 'Transition de biome (2 jours de marche). Jour 1 : derniers vestiges des Plaines de Cendres, traces de combat anciennes. Jour 2 : forêt vivante, frontière de la Sylve d\'Émeraude. À la frontière, un arbre-signal elfique clignote (Arcanes DC 12 pour comprendre : c\'est un avertissement de ne pas entrer sans permission).',
    hooks: ['Des patrouilles elfiques les observent dès la lisière — ils sont attendus mais testés', 'Une clairière contient un cercle de pierres anciennes — méditer ici (Religion DC 11) accorde une vision du futur'],
    decisions: [
      { condition: 'Frontière de la Sylve atteinte', nextScene: 'ch7_s1_accueil', label: 'Les elfes se montrent' }
    ],
    estimatedMinutes: 15, mood: 'transition-espoir',
    music: 'Forêt — chants d\'oiseaux, feuillage bruissant, ruisseau', location: 'Lisière de la Sylve d\'Émeraude'
  }
];

// ────────────────────────────────────────────────────────────────────
// Entre ch10 et ch11 — Dernière nuit avant la bataille
// ────────────────────────────────────────────────────────────────────
export const TRAVEL_SCENES_CH10_CH11: NarrativeScene[] = [
  {
    id: 'travel_10_campement_sombrelune', title: 'Le Campement Devant la Tour',
    type: 'social',
    readAloud: 'La Tour de Sombrelune se dresse devant vous, noire sur le ciel étoilé. Des éclairs violets parcourent sa surface. L\'armée alliée campe à un kilomètre, hors de portée des projectiles. Demain à l\'aube, l\'assaut commence.',
    gmNotes: 'Dernière scène de préparation. Les PJ peuvent : 1) Planifier l\'assaut avec les généraux (Tactique DC 13 → avantage à la bataille). 2) Enchanter leurs armes avec l\'aide des mages (1 arme par PJ : +1d4 radiant pour 24h). 3) Dormir pour récupérer (repos long). 4) Espionner la Tour (Discrétion DC 16 → découvrir une entrée secrète au sous-sol).',
    hooks: ['La Tour émet un pulse nécrotique à minuit — chaque créature vivante dans un rayon d\'1 km : JDS Constitution DC 10 ou cauchemars (pas de repos long)', 'Un traître potentiel dans les rangs est identifié si Perspicacité DC 15'],
    decisions: [
      { condition: 'Aube', nextScene: 'ch11_s1_assaut', label: 'L\'ASSAUT SUR LA TOUR DE SOMBRELUNE' }
    ],
    estimatedMinutes: 20, mood: 'pré-bataille-tension',
    music: 'Tension — cordes basses, pas de mélodie, battement cardiaque', location: 'Campement de siège — Face à la Tour de Sombrelune'
  }
];

// ────────────────────────────────────────────────────────────────────
// Export aggregator
// ────────────────────────────────────────────────────────────────────
export const ALL_TRAVEL_SCENES = {
  ch1_ch2: TRAVEL_SCENES_CH1_CH2,
  ch2_ch3: TRAVEL_SCENES_CH2_CH3,
  ch3_ch4: TRAVEL_SCENES_CH3_CH4,
  ch4_ch5: TRAVEL_SCENES_CH4_CH5,
  ch5_ch6: TRAVEL_SCENES_CH5_CH6,
  ch6_ch7: TRAVEL_SCENES_CH6_CH7,
  ch7_ch8: TRAVEL_SCENES_CH7_CH8,
  ch9_ch10: TRAVEL_SCENES_CH9_CH10,
  ch10_ch11: TRAVEL_SCENES_CH10_CH11
};
