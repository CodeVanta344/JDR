export const WORLD_NAME = "Aethelgard";

export { ENRICHED_BACKSTORIES, getBackstoriesForClass, formatBackstoryForGM, HISTORICAL_EVENTS } from './lore/backstories';

/**
 * PHASE 21.1: DEEP WORLD HISTORY & CHRONOLOGY
 * Documentation of the major epochs and founding myths.
 */
export const WORLD_HISTORY = {
    mythology: {
        creation: `Avant le temps, il n'y avait que l'Aether, une mer d'énergie pure et indomptée. De cette soupe primordiale émergèrent les Primordiaux, des entités de concept pur : Solarius le Bâtisseur, Lunara la Gardienne, et l'Ombre dont le nom est oublié. Solarius forgea le noyau d'Aethelgard à partir de sa propre essence, créant la terre et les cieux. Lunara, par son chant, donna naissance aux océans et au souffle de vie. Mais l'Ombre, jalouse de la création, s'insinua dans les failles de la réalité, créant ce que nous connaissons aujourd'hui sous le nom de "Miroir des Ombres".`,
        the_divine_silence: `Pendant des millénaires, les Dieux marchèrent parmi les hommes. Mais après la Grande Guerre des Cendres, ils se retirèrent derrière le Voile de Cristal, craignant que leur présence directe ne déchire définitivement la trame du monde. On dit qu'ils observent toujours, mais leurs paroles ne sont plus que des échos dans le vent ou des visions dans les rêves des élus.`
    },
    epochs: [
        {
            name: "L'Ère de l'Éveil",
            duration: "3000 ans",
            desc: "L'apparition des premières races. Les Elfes sortirent des forêts sacrées de la Sylve d'Émeraude, tandis que les Nains frappèrent leurs premiers marteaux dans les profondeurs des monts Cœur-de-Fer. C'est durant cette période que la magie fut offerte aux mortels comme un don de la Dame Voilée."
        },
        {
            name: "L'Hégémonie d'Ashka",
            duration: "1500 ans",
            desc: "L'Empire Ashka dominait le sud. Un empire de bâtisseurs et de mages-empereurs dont la puissance égalait celle des dieux. Ils construisirent les cités volantes et les portails interplanétaires. Leur chute fut causée par leur propre arrogance, une expérience arcanique ayant ouvert une faille vers le Miroir des Ombres."
        },
        {
            name: "L'Ère des Cendres",
            duration: "500 ans",
            desc: "Une période de ténèbres et de dépopulation. Les démons du Miroir dévastèrent le monde. L'Empire Ashka fut réduit en poussière, devenant les Terres Brûlées. Ce n'est que grâce à l'Alliance des Sept (les héros fondateurs des royaumes actuels) que la faille fut temporairement scellée."
        },
        {
            name: "L'Ère de la Reconstruction",
            duration: "Actuelle (depuis 120 ans)",
            desc: "Le monde se remet de ses plaies. Les royaumes de Kuldahar, Sol-Aureus et Sylmanir tentent de maintenir une paix fragile, conscients que les sceaux de l'Ère des Cendres commencent à faiblir."
        }
    ]
};


export const LOCATION_BACKGROUNDS = {
    "Kuldahar": "/assets/backgrounds/kuldahar.png",
    "Sol-Aureus": "/assets/backgrounds/sol_aureus.png",
    "Hammerdeep": "/assets/backgrounds/hammerdeep.png",
    "Sylmanir": "/assets/backgrounds/sylmanir.png",
    "Terres Brûlée": "/assets/backgrounds/terres_brulees.png",
    "Ashka": "/assets/backgrounds/terres_brulees.png",
    "Côte des Orages": "/assets/backgrounds/kuldahar.png",
    "Val Doré": "/assets/backgrounds/sol_aureus.png",
    "Monts Cœur-de-Fer": "/assets/backgrounds/hammerdeep.png",
    "Sylve d'Émeraude": "/assets/backgrounds/sylmanir.png"
};

export const LORE_INTRO = `
Bienvenue en Aethelgard, un monde dont les fondations tremblent encore des échos de l'Ère des Cendres. 
Ici, la lumière de Solarius lutte quotidiennement contre les incursions de l'Abysse. Vous arrivez à une époque charnière : les anciens portails de l'Hégémonie d'Ashka recommencent à briller d'une lueur funeste dans les déserts du sud, et les Jarls du nord murmurent que le dragon de cristal de Kuldahar a ouvert un œil.

Vous n'êtes pas de simples voyageurs. Dans vos veines coule peut-être un fragment de l'essence des héros de l'Alliance des Sept, ou le destin vous a simplement jeté dans l'arène pour voir si vous seriez consumé par les flammes ou forgé par elles. L'histoire d'Aethelgard s'écrit avec le sang des braves et les larmes des traîtres. Quelle sera votre marque sur cette terre millénaire ?
`;

export const WORLD_CONTEXT = `
# MONDE : AETHELGARD

## APERÇU RAPIDE
- **Genre:** High Fantasy, Ton Épique mais Mélancolique (Post-Guerre).
- **Ambiance:** Un monde en reconstruction où l'espoir est fragile et les secrets anciens refont surface.
- **Niveau de Technologie:** Médiéval Fantastique (Acier, Châteaux, pas d'armes à feu, Magie omniprésente mais régulée).

## GÉOGRAPHIE DÉTAILLÉE & MYSTICISME RÉGIONAL

### 1. La Côte des Orages (Le Nord Sauvage)
- **Capitale:** Kuldahar (La Forteresse des Jarls de Glace).
- **Climat:** Toundra glaciale, fjords brumeux où la visibilité dépasse rarement dix pas.
- **Habitants:** Humains barbares organisés en clans, Nains des glaces (les Frostforged), et les redoutables Géants des tempêtes qui vivent dans les cimes.
- **Politique:** Les Jarls règnent par le fer. "La force est le seul langage que le froid comprend." Ils méprisent les "douillets" du Val Doré.
- **Lieux Mémorables:** 
  - *Le Gouffre d'Ymir*: Un trou sans fond d'où s'échappent des vents hurlants. On dit que c'est le souffle du premier géant.
  - *La Forge de givre*: Une structure naine alimentée par le froid absolu, capable de forger des lames qui ne s'émoussent jamais sur la glace.
- **Légendes Locales**: "Le Marcheur Blanc n'est pas un conte pour enfants. Il viendra pour ceux qui gaspillent le feu."

### 2. Le Val Doré (Le Cœur Civilisé)
- **Capitale:** Sol-Aureus (La Cité du Verre et de l'Or).
- **Climat:** Tempéré, terres agricoles infinies baignées par un soleil quasi perpétuel.
- **Habitants:** Humains, Halflings, Gnomes commerçants et diplomates.
- **Politique:** Monarchie constitutionnelle sous l'égide de la Reine Elara. Le cœur économique et diplomatique d'Aethelgard.
- **Lieux Mémorables:** 
  - *Le Grand Jardin Arcanique*: Un parc où les plantes ont été modifiées par la magie pour fleurir en chantant.
  - *La Tour de Lunara*: Une flèche d'argent qui capture la lumière de la lune pour alimenter les lampadaires de la ville.
- **Légendes Locales**: "Le jour où le verre de Sol-Aureus se brisera, les larmes de la Reine noieront le monde."

### 3. Les Monts Cœur-de-Fer (L'Est Industriel)
- **Capitale:** Hammerdeep (Cité sous la montagne, s'étendant sur 15 niveaux).
- **Climat:** Montagnes escarpées, pics acérés et vallées de poussière.
- **Habitants:** Nains (Majoritaires), Kobolds serviteurs, Golems de pierre.
- **Politique:** Oligarchie des Guildes Minières. Les brevets et les contrats sont aussi sacrés que les serments de sang.
- **Lieux Mémorables:** 
  - *L'Ascenseur de Cristal*: Une merveille d'ingénierie reliant le sommet du Pic Central aux fonderies du niveau 15.
  - *Le Caveau des Ancêtres*: Une bibliothèque gravée dans le diamant contenant l'histoire de chaque famille naine.
- **Légendes Locales**: "Écoutez les vibrations de la pierre. Si elle s'arrête de chanter, courez vers la surface."

### 4. La Sylve d'Émeraude (L'Ouest Mystique)
- **Capitale:** Sylmanir (La Cité Tissée, construite dans les branches d'Arbre-Monde junior).
- **Climat:** Forêt dense, lueurs bioluminescentes, humidité magique constante.
- **Habitants:** Elfes (Hauts et Sylvains), Centaures, Satyres, et Dryades.
- **Politique:** Théocratie druidique dirigée par le Conseil des Chênes. Très isolationnistes.
- **Lieux Mémorables:** 
  - *Le Mur de Ronces*: Une barrière naturelle impénétrable protégeant le cœur de la forêt.
  - *La Source d'Émeraude*: Une eau qui guérit les blessures du corps mais peut altérer les souvenirs.
- **Légendes Locales**: "Ne ramassez jamais une plume d'argent en forêt sans demander la permission aux arbres."

### 5. Les Terres Brûlées (Le Sud Dévasté)
- **Capitale:** Aucune (Ruines calcinées de l'Empire Ashka).
- **Climat:** Désert aride, lacs de souffre, volcans en activité constante.
- **Habitants:** Tieffelins exilés, Dracéides solitaires, Pilleurs de tombes, Goules.
- **Politique:** Loi de la jungle. Les seigneurs de guerre locaux contrôlent les rares points d'eau.
- **Lieux Mémorables:** 
  - *Le Pilier de Cendres*: Le reste de la plus grande tour d'Ashka, visible à des lieues à la ronde.
  - *La Faille de l'Ombre*: Une fissure béante d'où s'échappent les murmures du Miroir des Ombres.
- **Légendes Locales**: "Dans le désert, l'ombre que vous voyez n'est pas toujours la vôtre."

## VIE QUOTIDIENNE & SOCIÉTÉ

### ÉCONOMIE & COMMERCE
- **Monnaie:** Le "Souverain" (Or), l'"Argentier" (Argent), le "Cuivrot" (Cuivre). 
  - *Taux:* 1 Or = 10 Argent = 100 Cuivre.
- **Coût de la vie:** Une nuit à l'auberge = 5-8 Argent. Une bière = 3 Cuivre. Une épée simple = 15 Or.
- **Commerce:** Le Val Doré exporte le grain, le Nord le fer et les fourrures, les Elfes des artefacts magiques rares.

### LA MAGIE & LA LOI
- **Légalité:** La magie est légale mais **doit être enregistrée** dans les grandes villes (Guilde des Arcanes).
- **Sorcellerie Interdite:** Nécromancie (punie de mort), Enchantement mental (illégal sans consentement).
- **Réaction du peuple:** Les paysans craignent la magie ("C'est l'œuvre des dieux ou des démons"). Les nobles la voient comme un outil.

### RELIGION & CROYANCES
- **Panthéon:** Les Dieux sont réels mais silencieux depuis l'Ère des Cendres.
- **Solarius (Soleil/Justice):** Culte dominant, clergé puissant et rigide.
- **La Dame Voilée (Magie/Secrets):** Vénérée par les mages et voleurs. Temples cachés.
- **Superstitions:** "Ne sifflez jamais en forêt la nuit" (attire les fées). "Jeter du sel sur un feu éloigne les esprits."

### FACTIONS & INTRIGUES
- **L'Ordre du Bouclier d'Argent:** Chevaliers protecteurs du Val. Loyaux, mais parfois zélés.
- **Le Cercle des Cendres:** Société secrète cherchant à réveiller les anciens dragons. (Antagonistes principaux).
- **La Main Noire:** Guilde des voleurs et assassins qui contrôle les bas-fonds de Sol-Aureus.

## SECRETS DU MONDE (MÉTA-LORE POUR LE MJ)
- **Le Fléau d'Argent**: La Reine Elara du Val Doré est secrètement possédée par une ombre du Cercle des Cendres.
- **L'Autre Rive**: Les Monts Cœur-de-Fer cachent une ancienne porte vers le plan élémentaire de la Terre, source de leur richesse.
- **La Prophétie de l'Éclipse**: Un dragon de cristal dormira sous Kuldahar tant que le soleil brillera. S'il s'éteint, le dragon dévorera le Nord.

## SYSTÈME D'INTELLIGENCE & RÈGLES DU MJ
1. **Anticipe les besoins:** Si un joueur va à la forge, décris l'odeur du charbon et la chaleur avant même qu'il ne parle.
2. **Gère le rythme:** Alterne entre moments calmes (RP à la taverne) et tension (embuscade, découverte macabre).
3. **Improvisation Guidée:** Utilise les listes de PNJ et d'objets pour ne jamais être pris au dépourvu.
4. **Conséquences:** Tuer un garde a des conséquences (prime, chasseurs de primes). Voler un temple appelle une malédiction.

- **SYSTÈME D'AFFINITÉ ET RÉACTUALISATION** :
  - *Affinité* : Chaque PNJ a un score d'affinité (\`currentAffinity\`) avec vous. Si > 50, il est amical et offre des réductions. Si < -50, il est hostile.
  - *Équipement* : Les PNJ voient vos \`equippedItems\`. Ils doivent commenter tout objet exceptionnel ou déplacé.
  - *Titres* : Vos \`titles\` débloqués imposent le respect ou la crainte. Un "Tueur de Dragon" ne sera pas traité comme un mendiant.
  - *Contexte Temporel* : Réagissez à l'heure (\`timeOfDay\`). Un tavernier est plus occupé le soir, un garde est moins vigilant à l'aube.
  - *Triggers Spéciaux* :
    - Si un joueur vous plaît ou vous aide, ajoutez \`"affinity_change": 5\` à votre réponse JSON.
    - Si un joueur accomplit un fait digne d'un titre, ajoutez \`"title_unlock": "Nom du Titre"\`.

- **ÉCHANGE SERVICE** : Demandez souvent une faveur (quête) avant d'offrir un service rare ou une formation de sort.
`;

/**
 * PHASE 21.3: FACTION DEEP-DIVE
 * Detailed political and social structures of the major powers.
 */
export const FACTION_LORE = {
    "Bouclier d'Argent": {
        name: "L'Ordre Souverain du Bouclier d'Argent",
        philosophy: "Ordre, Justice, Sacrifice. Ils croient que la civilisation ne peut survivre que par une vigilance constante et une hiérarchie stricte.",
        history: "Fondé par Sir Valerius le Pieux lors du Siège de Sol-Aureus, l'Ordre était initialement une milice de paysans. Aujourd'hui, c'est l'armée la plus disciplinée d'Aethelgard. Ils ont juré de protéger la lignée de la Reine Elara, même au prix de leur propre âme.",
        headquarters: "La Citadelle d'Albâtre, Sol-Aureus. Une forteresse de marbre blanc dont les murs sont imprégnés de runes anti-démoniaques.",
        hierarchy: "Grand Maître -> Sénéchaux -> Commandeurs -> Chevaliers-Errants -> Écuyers.",
        secrets: "L'Ordre cache une aile secrète, l'Inquisition du Soleil, chargée de traquer toute trace de magie de l'Ombre, même au sein de ses propres rangs."
    },
    "Cercle des Cendres": {
        name: "Le Cercle des Cendres Éternelles",
        philosophy: "Renaissance par la destruction. Ils considèrent l'Ère de la Reconstruction comme une stagnation et souhaitent ramener le monde à son état primordial de chaos magique.",
        history: "Une société secrète composée de mages bannis et de nostalgiques de l'Empire Ashka. Ils opèrent dans l'ombre depuis des décennies, infiltrant les cours royales et les guildes marchandes.",
        headquarters: "Inconnu. On murmure qu'ils possèdent une base mobile sur le dos d'une créature colossale dans les Terres Brûlées.",
        hierarchy: "Le Maître des Braises (Identité inconnue) -> Les Cinq Scellés -> Les Veilleurs de l'Ombre -> Les Initiés.",
        secrets: "Ils possèdent des fragments d'une gemme appelée l'Oeil d'Ashka, capable de déchirer momentanément le Voile de Cristal."
    },
    "Main Noire": {
        name: "Le Syndicat de la Main Noire",
        philosophy: "Profit, Information, Influence. 'Tout a un prix, même la loyauté.'",
        history: "Née des bas-fonds de Hammerdeep, cette guilde a rapidement pris le contrôle du marché noir de tout le continent. Ils ne cherchent pas à renverser les rois, seulement à s'assurer que les rois dépendent d'eux.",
        headquarters: "Le Rats-Bazar, un labyrinthe de tunnels sous les égouts de Sol-Aureus.",
        hierarchy: "La Matriarche des Ombres -> Les Lieutenants de Fer -> Les Collecteurs -> Les Doigts (Espions et Voleurs).",
        secrets: "La Main Noire possède des preuves de la corruption de plusieurs Sénéchaux du Bouclier d'Argent, leur permettant d'agir presque impunément."
    }
};


export const RANDOM_ENCOUNTERS = {
    road: [
        "Une caravane marchande renversée bloque le chemin. Les marchands sont vivants mais terrifiés — quelque chose les a attaqués depuis le ciel, sans laisser de traces au sol.",
        "Un chevalier errant, couvert de boue et de sang séché, s'approche et demande si vous avez vu une femme en robe blanche. Il refuse de donner plus de détails.",
        "Trois enfants jouent avec un crâne qu'ils ont trouvé dans un fossé. Le crâne a des runes gravées sur le front qui brillent faiblement.",
        "Un colporteur itinérant vend des 'cartes au trésor garanties'. 1 chance sur 6 qu'elle soit authentique.",
        "Un pont de pierre s'est effondré. Un homme en haillons propose de guider le groupe par un sentier secret à travers la forêt pour 5 pièces d'argent.",
        "Un groupe de pèlerins en route vers le Temple de Solarius chante des hymnes. Ils offrent de la nourriture et de l'eau bénite en échange de protection.",
        "Un chariot abandonné contient des cages vides dont les barreaux ont été tordus de l'intérieur. Des traces de griffes mènent dans les bois.",
        "Deux familles de fermiers se disputent violemment la propriété d'un champ. Chacune brandit un acte de propriété apparemment authentique.",
        "Un messager royal à cheval passe au galop, son visage blanc de terreur. Il crie 'Fuyez vers le nord !' sans s'arrêter.",
        "Une vieille femme assise au carrefour propose de lire les lignes de la main du joueur. Sa prédiction est toujours inquiétante et souvent vraie.",
        "Un convoi funéraire traverse la route. Le cercueil est enchaîné et marqué de sceaux de protection. Les porteurs refusent de parler.",
        "Un marchand d'armes ambulant propose des lames 'forgées par les nains de Hammerdeep'. La qualité varie énormément."
    ],
    wilderness: [
        "Un totem de bois et d'os marque l'entrée d'un territoire orc. Des crânes peints en rouge décorent les branches alentour.",
        "Une clairière circulaire où l'herbe pousse en spirale. Au centre, une pierre lisse vibre doucement quand on la touche.",
        "Les traces d'un animal gigantesque — deux fois la taille d'un ours — s'enfoncent dans une grotte sombre d'où émane une odeur de soufre.",
        "Un arbre mort, foudroyé, semble avoir une silhouette humaine emprisonnée dans son tronc. Par moments, le bois craque comme si elle respirait.",
        "Une source d'eau cristalline qui a un goût sucré et métallique. Quiconque y boit récupère 1d4 PV mais a des rêves étranges la nuit suivante.",
        "Un cercle de champignons luminescents entoure un petit autel de pierre recouvert de pièces de cuivre oxydées et de rubans colorés.",
        "Une meute de 2d6 loups observe le groupe depuis une crête rocheuse. Ils ne sont ni agressifs ni craintifs — ils semblent attendre quelque chose.",
        "Un ancien camp abandonné. Le feu est encore tiède. Un journal intime laissé sur place raconte la lente descente dans la folie de son auteur.",
        "Des ruines d'une tour de guet de l'Hégémonie d'Ashka. L'escalier est encore praticable et offre une vue panoramique — et un coffre rouillé au sommet.",
        "Un brouillard surnaturel tombe soudainement. Le groupe entend des voix murmurer leur nom. La boussole tourne follement.",
        "Un cours d'eau rougeâtre — pas du sang, mais un minerai naturel. Les nains de Hammerdeep paieraient cher pour savoir d'où il vient.",
        "Un nid de griffon abandonné sur une falaise. Deux œufs intacts, chauds au toucher, y reposent. Valeur marchande : 500 pièces d'or chacun."
    ],
    social: [
        "À la taverne, un barde ivre raconte avoir vu 'le Marcheur Blanc' à trois jours de marche au nord. Personne ne le croit sauf le tavernier, qui blêmit.",
        "Un noble déguisé en mendiant supplie le groupe de l'escorter secrètement hors de la ville. Il prétend que sa propre famille veut l'assassiner.",
        "Un marchand propose un objet manifestement volé — une fibule avec le sceau du Bouclier d'Argent. Si le groupe la rend, ils gagnent la faveur de l'Ordre.",
        "Une femme désespérée cherche son fils adolescent qui a disparu il y a trois jours. La milice locale refuse d'enquêter — 'C'est juste un gamin qui fugue.'",
        "Un vétéran de guerre borgne, assis dans un coin de l'auberge, reconnaît l'arme d'un des joueurs. 'Je connais cette lame. Son ancien propriétaire est mort en hurlant.'",
        "Un groupe d'étudiants de la Guilde des Arcanes fait des expériences interdites dans une grange. Ça sent le soufre et des éclairs violets filtrent sous la porte.",
        "Le boucher local refuse de vendre de la viande. Il dit avoir vu 'quelque chose' dans les entrailles du dernier animal qu'il a abattu — un symbole, gravé dans les organes.",
        "Un couple de halflings demande au groupe d'être les témoins de leur mariage. En échange, ils offrent un repas somptueux et une carte de la région annotée.",
        "Un crieur public annonce une prime de 50 pièces d'or pour la capture d'un 'voleur de rêves' — quelqu'un qui dérobe les souvenirs des dormeurs.",
        "Un prêtre de Solarius prêche sur la place du marché que 'la fin des temps approche'. La foule se moque, mais ses yeux sont hantés par une vérite qu'il refuse de formuler."
    ],
    supernatural: [
        "Un dragon de cristal survole la vallée à haute altitude, son ombre projetant des arcs-en-ciel sur le sol. Il ne semble pas hostile — il patrouille.",
        "Un portail magique crépitant d'énergie instable apparaît au milieu du chemin. Il montre un paysage désertique de l'autre côté, et quelqu'un appelle à l'aide.",
        "Les étoiles changent de position pendant une seconde avant de revenir à la normale. Seul un personnage avec Sagesse > 14 le remarque.",
        "Un spectre apparaît au crépuscule et pointe silencieusement vers l'est avant de se dissiper. Il revient chaque soir au même endroit.",
        "Un arbre ancien parle d'une voix grave et rauque. Il demande qu'on le libère des parasites magiques qui rongent ses racines en échange d'un secret.",
        "La pluie qui tombe est chaude et a un goût de cendre. C'est le signe qu'un phénomène arcanique majeur s'est produit quelque part dans les Terres Brûlées.",
        "Une statue au bord de la route pleure des larmes de sang. La plaque à ses pieds dit: 'À ceux qui sont morts sans témoin.'",
        "Un renard avec un pelage doré suit le groupe à distance. Tout animal qui l'approche s'incline. Si on l'attaque, il disparaît dans un éclat de lumière.",
        "La Lune devient rouge pendant une heure. Tous les sorts lancés pendant cette période ont leurs effets doublés — mais aussi leurs risques.",
        "Un écho de bataille résonne dans une vallée vide. Des cris, du métal, des explosions magiques. C'est le souvenir de l'Ère des Cendres, gravé dans la pierre.",
        "Un miroir d'eau naturel reflète une version alternative de la réalité — les arbres sont en fleurs alors qu'on est en hiver, et une cité brillante se dresse à l'horizon.",
        "Des runes lumineuses apparaissent sur la peau d'un personnage pendant son sommeil. Elles forment un message en Ashkan Archaïque."
    ],
    combat: [
        "Une embuscade de 2d4 gobelins dans un défilé rocheux. Ils ont tendu des cordes entre les arbres et lancent des pierres depuis les hauteurs.",
        "Un troll des marais bloque un pont en bois pourri. Il exige un 'péage' : un mouton vivant ou 20 pièces d'or. Sinon, il attaque.",
        "Un essaim de chauves-souris géantes (3d6) jaillit d'une grotte au crépuscule. Elles ne sont pas agressives sauf si on porte une torche.",
        "Un ours-hibou enragé charge depuis les fourrés. Il a une flèche brisée plantée dans le flanc — quelqu'un l'a blessé et rendu fou de douleur.",
        "Deux bandits de grand chemin proposent un choix : 'La bourse ou la vie.' Ils sont accompagnés de 4 archers cachés dans les arbres.",
        "Un golem de pierre inactif se réveille quand le groupe passe devant les ruines qu'il garde. Il n'attaque que ceux qui touchent les ruines.",
        "Un groupe de 1d4+2 squelettes sort du sol dans un ancien cimetière de campagne. Un nécromancien amateur se cache derrière un mausolée.",
        "Une araignée géante a tendu sa toile entre deux arbres massifs. Le fil est presque invisible. JS Perception CD 14 pour la repérer à temps.",
        "Un jeune wyvern (CR 4) défend l'entrée de sa grotte. À l'intérieur se trouvent les restes d'un aventurier et son équipement intact."
    ],
    mystery: [
        "Tous les animaux dans un rayon de 1km fuient dans la même direction, comme si une menace invisible approchait par le sud.",
        "Un village entier semble abandonné — les portes sont ouvertes, les repas encore sur les tables. Pas de traces de lutte. Pas de sang. Pas de corps.",
        "Des empreintes de pieds nus dans la boue, mais elles marchent à l'envers — les orteils font face à la direction d'où elles viennent.",
        "Un livre apparaît dans le sac d'un personnage sans qu'il s'en souvienne. La couverture est en cuir noir et le titre est 'Votre Histoire'.",
        "La boussole du groupe pointe vers un point fixe au lieu du nord magnétique. En suivant sa direction, on arrive à une porte de pierre sans serrure.",
        "Un PNJ que le groupe a rencontré il y a des jours réapparaît, mais il ne se souvient pas d'eux et porte des vêtements différents.",
        "Des graffitis identiques apparaissent sur les murs de chaque village traversé : un œil ouvert au-dessus d'une flamme. Personne ne sait qui les dessine.",
        "Un cadavre frais est découvert au bord du chemin. Il porte exactement les mêmes vêtements et équipements qu'un membre du groupe."
    ]
};

// EXPONENTIAL LEVELING CURVE (Hardcore)
export const LEVEL_THRESHOLDS = {
    1: 0,
    2: 300,
    3: 900,
    4: 2700,
    5: 6500,
    6: 14000,
    7: 23000,
    8: 34000,
    9: 48000,
    10: 64000,
    11: 85000,
    12: 110000,
    13: 140000,
    14: 180000,
    15: 230000,
    16: 290000,
    17: 360000,
    18: 440000,
    19: 530000,
    20: 640000, // Palier Légendaire
    21: 800000,
    22: 1000000,
    23: 1250000,
    24: 1550000,
    25: 1900000,
    26: 2350000,
    27: 2900000,
    28: 3550000,
    29: 4300000,
    30: 5200000 // Niveau Maximum (Ascension Divine)
};

/**
 * EQUIPMENT PROFICIENCY SYSTEM
 * Armor and weapon effectiveness depends on character class.
 */
export const EQUIPMENT_RULES = {
    armor_categories: {
        light: {
            label: "Armure legere",
            examples: ["Robe", "Vetements", "Costume", "Tunique"],
            ac_range: [0, 2],
            penalty: null,
            desc: "Aucune restriction. Bonus DEX complet a la CA."
        },
        medium: {
            label: "Armure intermediaire",
            examples: ["Cuir", "Cuir cloute", "Peau", "Brigandine", "Ecailles"],
            ac_range: [2, 4],
            penalty: { max_dex_bonus: 2 },
            desc: "Bonus DEX a la CA limite a +2 max."
        },
        heavy: {
            label: "Armure lourde",
            examples: ["Cotte de mailles", "Plates", "Harnois", "Plate complete"],
            ac_range: [4, 8],
            penalty: { no_dex_bonus: true, stealth_disadvantage: true, speed_penalty: -1 },
            desc: "Pas de bonus DEX. Desavantage en Discretion. -1 vitesse."
        }
    },
    weapon_categories: {
        simple: {
            label: "Arme simple",
            examples: ["Baton", "Masse", "Dague", "Gourdin", "Lance", "Serpe"],
            desc: "Utilisable par toutes les classes sans penalite."
        },
        martial: {
            label: "Arme de guerre",
            examples: ["Epee longue", "Hache", "Hallebarde", "Marteau", "Epee a deux mains", "Arc composite"],
            desc: "Requiert entrainement martial. -2 ATK si non-maitrise."
        },
        finesse: {
            label: "Arme de finesse",
            examples: ["Rapiere", "Dague", "Cimeterre", "Fouet"],
            desc: "Utilise DEX au lieu de STR pour l'attaque. Ideal pour les agiles."
        },
        arcane: {
            label: "Focus arcanique",
            examples: ["Baton", "Orbe", "Grimoire", "Baguette", "Luth"],
            desc: "Canalise la magie. Bonus INT/WIS/CHA selon classe."
        },
        holy: {
            label: "Arme sacree",
            examples: ["Masse benie", "Epee sacree", "Marteau de guerre"],
            desc: "Bonus radiant pour Clercs et Paladins."
        }
    },
    /**
     * Class proficiency determines which equipment is effective.
     * Non-proficient armor: spellcasting impossible, -2 to all attack rolls.
     * Non-proficient weapons: -2 ATK penalty.
     */
    class_proficiency: {
        "Guerrier": {
            armor: ["light", "medium", "heavy"],
            weapons: ["simple", "martial"],
            shields: true,
            desc: "Maitre de toutes les armures et armes martiales."
        },
        "Mage": {
            armor: ["light"],
            weapons: ["simple", "arcane"],
            shields: false,
            desc: "Armure legere uniquement. Armure lourde = impossible de lancer des sorts."
        },
        "Voleur": {
            armor: ["light"],
            weapons: ["simple", "finesse"],
            shields: false,
            desc: "Armure legere pour la mobilite. Armes de finesse privilegiees."
        },
        "Clerc": {
            armor: ["light", "medium", "heavy"],
            weapons: ["simple", "holy"],
            shields: true,
            desc: "Toutes armures. Sorts divins non-affectes par l'armure lourde."
        },
        "Paladin": {
            armor: ["light", "medium", "heavy"],
            weapons: ["simple", "martial", "holy"],
            shields: true,
            desc: "Maitre de toutes les armures. Armes martiales et sacrees."
        },
        "Rodeur": {
            armor: ["light", "medium"],
            weapons: ["simple", "martial", "finesse"],
            shields: true,
            desc: "Armures legeres et intermediaires. Toutes les armes."
        },
        "Barde": {
            armor: ["light"],
            weapons: ["simple", "finesse", "arcane"],
            shields: false,
            desc: "Armure legere. Armes de finesse et focus arcaniques."
        },
        "Druide": {
            armor: ["light", "medium"],
            weapons: ["simple", "arcane"],
            shields: true,
            desc: "Refuse le metal. Armures naturelles uniquement."
        }
    },
    penalties: {
        non_proficient_armor: "Impossible de lancer des sorts. -2 a tous les jets d'attaque et de sauvegarde bases sur STR/DEX.",
        non_proficient_weapon: "-2 aux jets d'attaque avec cette arme.",
        heavy_armor_stealth: "Desavantage automatique sur les jets de Discretion.",
        heavy_armor_mage: "INTERDIT: Un mage en armure lourde ne peut PAS lancer de sorts."
    }
};

export const CLASS_CATEGORIES = {
    "MIGHT": {
        label: "Sang et Acier",
        desc: "Héros de la force brute et de la résilience. Ils dominent le champ de bataille par la puissance physique.",
        classes: ["Guerrier", "Paladin"],
        color: "#ff4d4d",
        icon: "⚔️"
    },
    "MAGIC": {
        label: "Arcanes et Mystères",
        desc: "Maîtres des énergies cosmiques et divines. Ils plient la réalité à leur volonté.",
        classes: ["Mage", "Clerc", "Druide"],
        color: "#4da6ff",
        icon: "🔥"
    },
    "SKILL": {
        label: "Ombre et Ruse",
        desc: "Spécialistes de l'agilité et de la précision. Ils frappent là où ça fait mal, souvent sans être vus.",
        classes: ["Voleur", "Rôdeur", "Barde"],
        color: "#4dff88",
        icon: "🗡️"
    }
};

export const CLASSES = {
    "Guerrier": {
        label: "Guerrier",
        category: "MIGHT",
        hitDie: 12,
        resourceStat: "con",
        desc: "Un maître de la guerre infatigable. Absence totale de magie compensée par une puissance physique brute inégalée.",
        mechanic: {
            name: "Adrénaline",
            desc: "La magie vous est inaccessible. Chaque coup porté ou reçu génère de l'Adrénaline (points de ressource). \n\n• **Rage de Sang**: À plus de 50 points, vos dégâts physiques augmentent de 25%.\n• **Second Souffle**: Vous pouvez dépenser toute votre Adrénaline pour vous soigner (1 PV par point dépensé)."
        },
        stats: { str: 18, dex: 12, con: 16, int: 8, wis: 10, cha: 10 },
        protection: { armor: ["light", "medium", "heavy"], weapons: ["simple", "martial"], shields: true },

        starting_equipment_options: [
            {
                label: "Le Chevalier d'Acier",
                items: [
                    { name: "Épée longue", type: "weapon", category: "martial", slot: "main", stats: { atk: 3 }, rarity: "common", desc: "Acier trempé de Sol-Aureus.", equipped: true, img: "/items/longsword.png" },
                    { name: "Bouclier en bois", type: "shield", category: "shield", slot: "off", stats: { ac: 2 }, rarity: "common", desc: "Renforcé de fer.", equipped: true },
                    { name: "Cotte de mailles", type: "armor", category: "heavy", slot: "body", stats: { ac: 4 }, rarity: "common", desc: "Bruyante mais protectrice.", equipped: true }
                ]
            },
            {
                label: "Le Gladiateur Brute",
                items: [
                    { name: "Grande Hache", type: "weapon", category: "martial", slot: "main", stats: { atk: 5 }, rarity: "common", desc: "Une arme de destruction massive.", equipped: true, img: "/items/greataxe.png" },
                    { name: "Peaux de bêtes", type: "armor", category: "medium", slot: "body", stats: { ac: 2 }, rarity: "common", desc: "Laisse les bras libres.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Frappe Puissante", cost: 15, cooldown: 2, level: 1, dice: "1d10", scaling: "str", type: "Physique", actionType: "Action", flavor: "Un coup d'une brutalité sauvage, capable d'écraser les os et de traverser le cuir le plus épais.", desc: "Ignore 2 points d'armure de la cible.", vfx: "slash_red" },
            { name: "Heurt de Bouclier", cost: 10, cooldown: 3, level: 1, dice: "1d4", scaling: "str", type: "Physique", actionType: "Action", flavor: "Vous utilisez votre bouclier non pas pour parer, mais comme un marteau de fer pour sonner l'adversaire.", desc: "Chance d'étourdir la cible pendant 1 tour.", vfx: "impact_white" },
            { name: "Posture Défensive", cost: 5, cooldown: 4, level: 1, type: "Posture", actionType: "Action Bonus", flavor: "Vous ancrez vos pieds dans le sol et serrez les dents, vous préparant à l'inévitable déferlement de coups.", desc: "Réduit les dégâts subis de 3 pendant 1 tour.", vfx: "shield_glow" }
        ],
        subclasses: {
            "juggernaut": { label: "Juggernaut", desc: "Une muraille vivante.", details: { style: "Défenseur", feature: "Forteresse Vivante : Réduit tous les dégâts subis de 50%, mais votre vitesse tombe à 0 pour ce tour." } },
            "maitre_armes": { label: "Maître d'Armes", desc: "Tacticien martial.", details: { style: "Contrôle", feature: "Manœuvre Supérieure : Votre maîtrise permet de désarmer une cible ou de la mettre à terre lors d'une attaque." } },
            "berserker": { label: "Berserker", desc: "La rage incarnée.", details: { style: "Dégâts", feature: "Bain de Sang : Attaque tourbillon frappant tous les ennemis proches et vous soignant d'une partie des dégâts." } }
        },
        abilities: [],
        unlockables: [
            { name: "Second Souffle", cost: 0, cooldown: 5, level: 2, dice: "1d10", scaling: "level", desc: "Récupère 1d10 + Niveau PV (Action Bonus)." },
            { name: "Provocation", cost: 10, cooldown: 3, level: 3, range: 2, desc: "Force les ennemis à 2 cases à vous attaquer." },
            { name: "Critique Amélioré", cost: 0, cooldown: 0, level: 4, desc: "Vos coups critiques se déclenchent sur 19-20 (Passif)." },
            { name: "Attaque Supplémentaire", cost: 0, cooldown: 0, level: 5, desc: "Vous pouvez attaquer deux fois par action (Passif)." },
            { name: "Brise-Genoux", cost: 20, cooldown: 4, level: 6, scaling: "str", desc: "Inflige des dégâts normaux et réduit la vitesse de la cible à 0." },
            { name: "Défense Absolue", cost: 30, cooldown: 6, level: 7, desc: "Réaction : Annule une attaque qui vous toucherait." },
            { name: "Cri de Guerre", cost: 40, cooldown: 8, level: 8, range: 4, desc: "Tous les alliés à 4 cases gagnent Avantage et +10 PV temp." },
            { name: "Indomptable", cost: 0, cooldown: 0, level: 9, desc: "Si vous tombez à 0 PV, vous remontez à 1 PV (1/Long Repos)." },
            { name: "Avatar de la Guerre", cost: 100, cooldown: 20, level: 10, desc: "ULTIME : Pendant 3 tours, vous êtes invulnérable aux dégâts non-magiques et infligez double dégâts." },
            { name: "Maîtrise du Recul", cost: 0, cooldown: 0, level: 12, desc: "Chaque fois que vous touchez, vous pouvez repousser la cible de 1 case (Passif)." },
            { name: "Frappe Sismique", cost: 50, cooldown: 5, level: 15, dice: "5d10", scaling: "str", range: 3, desc: "Frappe le sol, infligeant des dégâts de zone et mettant à terre les ennemis à 3 cases." },
            { name: "Sang de Titan", cost: 0, cooldown: 0, level: 18, desc: "Votre maximum de PV augmente de 20% (Passif)." },
            { name: "LÉGENDAIRE : Brise-Âme", cost: 75, cooldown: 10, level: 20, dice: "10d10", scaling: "str", desc: "Une attaque qui ignore l'armure et réduit les stats de la cible de moitié pendant 2 tours." },
            { name: "Résilience Éternelle", cost: 0, cooldown: 0, level: 25, desc: "Immunité aux effets de peur, de charme et de paralysie (Passif)." },
            { name: "ASCENSION : Dieu du Champ de Bataille", cost: 150, cooldown: 50, level: 30, desc: "Pendant 5 tours, vous devenez gigantesque. Vos attaques frappent tous les ennemis dans un rayon de 5 cases et vous ne pouvez pas tomber en dessous de 1 PV." }
        ],
        portrait: "/portraits/guerrier.png"
    },
    "Mage": {
        label: "Mage",
        category: "MAGIC",
        hitDie: 6,
        resourceStat: "int",
        desc: "Maître absolu des arcanes complexes. Puissance cosmique au prix d'une fragilité physique extrême.",
        mechanic: {
            name: "Surcharge Arcanique",
            desc: "Vos sorts sont dévastateurs mais instables. Chaque lancement génère de la **Chaleur**.\n\n• **Malus Physique**: -2 sur les tests de Force et Constitution.\n• **Surcharge**: Si votre Mana tombe à 0 ou si vous lancez trop de sorts, vous entrez en Surcharge : vos dégâts sont doublés mais vous perdez 5 PV par tour jusqu'à stabilisation."
        },
        stats: { str: 6, dex: 12, con: 8, int: 18, wis: 14, cha: 12 },
        protection: { armor: ["none"], weapons: ["simple", "arcane"], shields: false },

        starting_equipment_options: [
            {
                label: "L'Érudit Arcanique",
                items: [
                    { name: "Bâton en If", type: "weapon", category: "arcane", slot: "main", stats: { atk: 1, int: 1 }, rarity: "common", desc: "Canalise l'énergie pure.", equipped: true, img: "/items/staff.png" },
                    { name: "Grimoire de l'Apprenti", type: "offhand", category: "arcane", slot: "off", stats: { mana: 10 }, rarity: "common", desc: "Contient des notes sur le flux d'éther.", equipped: true },
                    { name: "Robe en Soie Magique", type: "armor", category: "light", slot: "body", stats: { ac: 1 }, rarity: "common", desc: "Légère et conductrice.", equipped: true }
                ]
            },
            {
                label: "Le Sorcier de Rue",
                items: [
                    { name: "Dague de Duel", type: "weapon", category: "finesse", slot: "main", stats: { atk: 1 }, rarity: "common", desc: "Utile quand le mana manque.", equipped: true, img: "/items/dagger.png" },
                    { name: "Orbe de Cristal", type: "offhand", category: "arcane", slot: "off", stats: { int: 2 }, rarity: "common", desc: "Amplifie la vision arcanique.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Trait Arcanique", cost: 8, cooldown: 1, level: 1, dice: "1d10", scaling: "int", range: 10, type: "Arcane", actionType: "Action", flavor: "Un dard de lumière azurée, crépitant d'énergie instable, s'élance de vos doigts vers le cœur de l'ennemi.", desc: "Projectile magique à longue portée.", vfx: "magic_bolt_blue" },
            { name: "Onde de Choc", cost: 15, cooldown: 2, level: 1, dice: "2d6", scaling: "int", range: 3, type: "Élémentaire", actionType: "Action", flavor: "Vous frappez l'air de vos paumes, créant une distorsion violente qui balaie tout sur son passage.", desc: "Repousse les ennemis proches de 2 cases.", vfx: "shockwave_purple" },
            { name: "Bouclier de Mana", cost: 5, cooldown: 3, level: 1, type: "Abjuration", actionType: "Réaction", flavor: "Au moment de l'impact, une membrane de géométrie éthérée se matérialise pour absorber le choc.", desc: "Consomme 1 MP pour chaque point de dégât absorbé.", vfx: "mana_shield" }
        ],
        subclasses: {
            "elementaliste": { label: "Élémentaliste", desc: "Maître des éléments.", details: { style: "Artillerie", feature: "Maîtrise Élémentaire : Vos sorts percent les défenses et ignorent la résistance élémentaire de la cible." } },
            "chronomancien": { label: "Chronomancien", desc: "Maître du temps.", details: { style: "Contrôle", feature: "Déjà Vu : Une fois par jour, remontez le temps pour relancer un jet d'attaque ou de sauvegarde raté." } },
            "sang-de-dragon": { label: "Sang-de-Dragon", desc: "Héritier draconique.", details: { style: "Résistance", feature: "Résilience Draconique : Votre peau se couvre d'écailles mystiques. CA de base 13 + Dex." } }
        },
        abilities: [],
        unlockables: [
            { name: "Bouclier de Mana", cost: 15, cooldown: 3, level: 2, desc: "Absorbe les dégâts en échange de stabilité." },
            { name: "Nova", cost: 30, cooldown: 5, level: 3, dice: "3d6", scaling: "int", range: 2, desc: "Explosion de zone autour du mage (Rayon : 2 cases)." },
            { name: "Méditation", cost: 0, cooldown: 10, level: 4, resource: 50, desc: "Régénère 50 Mana hors combat (Canalisé)." },
            { name: "Boule de Feu", cost: 40, cooldown: 4, level: 5, dice: "8d6", scaling: "int", range: 8, desc: "Dégâts de feu dans une zone de 2 cases (Portée : 8 cases)." },
            { name: "Hâte", cost: 30, cooldown: 6, level: 6, range: 4, desc: "Double la vitesse et +2 CA pour un allié à 4 cases." },
            { name: "Contresort", cost: 20, cooldown: 2, level: 7, range: 6, desc: "Réaction : Annule un sort adverse à 6 cases." },
            { name: "Métamorphose", cost: 50, cooldown: 8, level: 8, range: 6, desc: "Transforme une cible à 6 cases en mouton." },
            { name: "Désintégration", cost: 60, cooldown: 5, level: 9, dice: "10d6+40", scaling: "int", range: 7, desc: "Gros dégâts de force (Portée : 7 cases)." },
            { name: "Arrêt du Temps", cost: 100, cooldown: 30, level: 10, desc: "ULTIME : Vous jouez 3 tours de suite sans interruption." },
            { name: "Esprit de Cristal", cost: 0, cooldown: 0, level: 15, desc: "Votre intelligence augmente de façon permanente et vous régénérez 5 Mana par tour (Passif)." },
            { name: "LÉGENDAIRE : Singularité", cost: 80, cooldown: 10, level: 20, dice: "20d6", scaling: "int", range: 10, desc: "Crée un trou noir qui aspire et désintègre les ennemis dans un rayon de 4 cases." },
            { name: "Morsure de l'Abysse", cost: 50, cooldown: 5, level: 25, dice: "12d8", scaling: "int", range: 8, desc: "Draine la force vitale d'une cible et vous soigne de la moitié des dégâts." },
            { name: "ASCENSION : Entité Purement Arcanique", cost: 200, cooldown: 60, level: 30, desc: "Pendant 3 tours, vous n'avez plus de coûts de Mana, vos sorts n'ont plus de cooldown, et vous êtes immunisé à tous les dégâts magiques." }
        ],
        portrait: "/portraits/mage.png"
    },
    "Voleur": {
        label: "Voleur",
        category: "SKILL",
        hitDie: 8,
        resourceStat: "dex",
        desc: "Une ombre mortelle. Pas de magie, mais une agilité et une précision qui défient les lois arcaniques.",
        mechanic: {
            name: "Précision Chirurgicale",
            desc: "L'énergie coule dans vos gestes. \n\n• **Point Faible**: Vos attaques contre les ennemis avec moins de 50% de PV ont +5 au jet de toucher.\n• **Combo**: Chaque attaque réussie réduit le coût en Énergie de votre prochaine capacité de 5 points (cumulable 3 fois)."
        },
        stats: { str: 10, dex: 18, con: 12, int: 12, wis: 10, cha: 14 },
        protection: { armor: ["light"], weapons: ["simple", "finesse"], shields: false },

        starting_equipment_options: [
            {
                label: "L'Assassin de l'Ombre",
                items: [
                    { name: "Dague de Duel", type: "weapon", category: "finesse", slot: "main", stats: { atk: 1, dex: 1 }, rarity: "common", desc: "Parfaite pour les points vitaux.", equipped: true, img: "/items/dagger.png" },
                    { name: "Dague de Duel", type: "weapon", category: "finesse", slot: "off", stats: { atk: 1 }, rarity: "common", desc: "Une deuxième lame pour les combos.", equipped: true, img: "/items/dagger.png" },
                    { name: "Armure de Cuir Souple", type: "armor", category: "light", slot: "body", stats: { ac: 2 }, rarity: "common", desc: "Ne fait aucun bruit.", equipped: true }
                ]
            },
            {
                label: "Le Tireur de Dagues",
                items: [
                    { name: "Set de Dagues de Lancer", type: "weapon", category: "finesse", slot: "main", stats: { atk: 1 }, rarity: "common", desc: "L'acier vole plus vite que le vent.", equipped: true, range: 10 },
                    { name: "Kit de Crochetage", type: "tool", slot: "item", stats: { dex: 1 }, rarity: "common", desc: "Aucune serrure ne résiste.", equipped: false },
                    { name: "Cape Noire", type: "armor", category: "light", slot: "body", stats: { ac: 1 }, rarity: "common", desc: "Se fond dans l'obscurité.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Attaque Sournoise", cost: 12, cooldown: 0, level: 1, dice: "1d6", scaling: "dex", type: "Précision", actionType: "Passif", flavor: "Vous profitez de la moindre seconde d'inattention pour loger votre lame entre deux vertèbres.", desc: "Ajoute +1d6 dégâts si vous avez l'avantage.", vfx: "slash_purple" },
            { name: "Disparition", cost: 15, cooldown: 4, level: 1, type: "Ombre", actionType: "Action Bonus", flavor: "Un mouvement fluide dans les angles morts, une ombre qui se fond dans les ténèbres... et vous n'êtes plus là.", desc: "Entrez en état d'invisibilité.", vfx: "smoke_puff" },
            { name: "Lancer de Dague", cost: 5, cooldown: 2, level: 1, dice: "1d4", scaling: "dex", range: 8, type: "Physique", actionType: "Action", flavor: "Une lueur argentée, le sifflement du vent, et l'acier trouve sa cible avant même qu'elle n'ait pu crier.", desc: "Attaque rapide à distance.", vfx: "dagger_throw" }
        ],
        subclasses: {
            "assassin": { label: "Assassin", desc: "Tueur silencieux.", details: { style: "Burst", feature: "Marque de Mort : Toute attaque portée contre une créature surprise est automatiquement un coup critique." } },
            "acrobate": { label: "Acrobate", desc: "Agile et intouchable.", details: { style: "Esquive", feature: "Pas de Vent : Utilisez votre Réaction pour esquiver et diviser par deux les dégâts d'une attaque." } },
            "ombre": { label: "Maître des Ombres", desc: "Magie sombre.", details: { style: "Invisibilité", feature: "Manteau de Nuit : Vous devenez invisible tant que vous restez dans une zone de lumière faible ou de ténèbres." } }
        },
        abilities: [],
        unlockables: [
            { name: "Disparition", cost: 15, cooldown: 4, level: 2, desc: "Action bonus pour se cacher en plein combat." },
            { name: "Esquive Étrange", cost: 20, cooldown: 3, level: 3, desc: "Réduit de moitié les dégâts d'une attaque perçue." },
            { name: "Expertise", cost: 0, cooldown: 0, level: 4, desc: "+2 à tous les jets de compétences (Passif)." },
            { name: "Coup Bas", cost: 15, cooldown: 2, level: 5, range: 1, desc: "Aveugle l'ennemi adjacent (1 case) pour 1 tour." },
            { name: "Pas de l'Ombre", cost: 25, cooldown: 3, level: 6, range: 6, desc: "Téléportation de 6 cases d'une ombre à l'autre." },
            { name: "Poison Mortel", cost: 20, cooldown: 4, level: 7, dice: "2d6", scaling: "dex", desc: "Applique un poison au contact." },
            { name: "Assassinat", cost: 50, cooldown: 5, level: 8, dice: "x3", scaling: "dex", desc: "Attaque qui inflige x3 dégâts si caché." },
            { name: "Réflexes Éclairs", cost: 40, cooldown: 10, level: 9, desc: "Vous jouez deux tours complets au premier round." },
            { name: "Ombre Dansante", cost: 80, cooldown: 15, level: 10, desc: "ULTIME : Invincible et invisible pendant 2 tours tout en attaquant." },
            { name: "Manteau de l'Abysse", cost: 0, cooldown: 0, level: 15, desc: "Vous êtes considéré comme caché tant que vous ne portez pas d'attaque (Passif)." },
            { name: "LÉGENDAIRE : Danse des Lames", cost: 100, cooldown: 12, level: 20, dice: "1d8", scaling: "dex", desc: "Vous effectuez une attaque contre chaque ennemi dans un rayon de 10 cases." },
            { name: "Cœur de Néant", cost: 0, cooldown: 0, level: 25, desc: "Vos attaques ignorent toute forme de résistance physique (Passif)." },
            { name: "ASCENSION : Fantôme d'Aethelgard", cost: 150, cooldown: 60, level: 30, desc: "Vous devenez éthéré. Vous pouvez traverser les murs, vos attaques sont des critiques automatiques, et personne ne peut vous cibler pendant 5 tours." }
        ],
        portrait: "/portraits/voleur.png"
    },
    "Clerc": {
        label: "Clerc",
        category: "MAGIC",
        hitDie: 8,
        resourceStat: "wis",
        desc: "Bras armé et soignant des Dieux. Classe Hybride combinant soutien divin et robustesse physique.",
        mechanic: {
            name: "Ferveur Divine",
            desc: "Votre foi alimente vos miracles. \n\n• **Lumière Intérieure**: Vos soins critiques restaurent 50% de Mana.\n• **Bouclier de Foi**: Porter une armure lourde ne pénalise pas vos sorts divins."
        },
        stats: { str: 14, dex: 10, con: 14, int: 10, wis: 16, cha: 12 },
        protection: { armor: ["light", "medium", "heavy"], weapons: ["simple"], shields: true },

        starting_equipment_options: [
            {
                label: "Le Gardien de la Foi",
                items: [
                    { name: "Masse d'Acier Bénie", type: "weapon", category: "simple", slot: "main", stats: { atk: 2, wis: 1 }, rarity: "common", desc: "Purifie par le choc.", equipped: true, img: "/items/mace.png" },
                    { name: "Bouclier Rond", type: "shield", category: "shield", slot: "off", stats: { ac: 2 }, rarity: "common", desc: "Orné d'un soleil d'or.", equipped: true },
                    { name: "Cotte de Mailles", type: "armor", category: "heavy", slot: "body", stats: { ac: 4, dex: -1 }, rarity: "common", desc: "Une défense solide.", equipped: true }
                ]
            },
            {
                label: "Le Soigneur Errant",
                items: [
                    { name: "Bâton de Pèlerin", type: "weapon", category: "simple", slot: "main", stats: { atk: 1, wis: 2 }, rarity: "common", desc: "Marké de runes de soin.", equipped: true, img: "/items/staff.png" },
                    { name: "Amulette Sacrée", type: "accessory", slot: "neck", stats: { mana: 10 }, rarity: "common", desc: "Relique d'un ancien temple.", equipped: true },
                    { name: "Robe de Clergé", type: "armor", category: "light", slot: "body", stats: { ac: 1, wis: 1 }, rarity: "common", desc: "Simple mais protectrice.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Mot de Guérison", cost: 15, cooldown: 2, level: 1, dice: "1d4", scaling: "wis", range: 6, type: "Lumière", actionType: "Action Bonus", flavor: "Une simple syllabe du Crystal Céleste suffit à refermer les plaies et à redonner espoir aux cœurs vaillants.", desc: "Soin rapide à distance.", vfx: "heal_gold" },
            { name: "Flamme Sacrée", cost: 10, cooldown: 1, level: 1, dice: "1d8", scaling: "wis", range: 8, type: "Radieux", actionType: "Action", flavor: "Une colonne de feu blanc descend des cieux pour purifier ceux qui s'opposent à la volonté divine.", desc: "La cible ne bénéficie d'aucun bonus de couvert.", vfx: "holy_fire" },
            { name: "Bénédiction", cost: 20, cooldown: 4, level: 1, range: 4, type: "Bénédiction", actionType: "Action", flavor: "Vous tracez un symbole sacré dans l'air, insufflant une fraction de la puissance du Crystal en vos alliés.", desc: "Donne +1d4 aux jets d'attaque de 3 alliés.", vfx: "bless_glow" }
        ],
        subclasses: {
            "guerre": { label: "Domaine de Guerre", desc: "Combattant divin.", details: { style: "Offensif", feature: "Frappe Divine : Vos attaques d'armes infligent 1d8 dégâts radiants bonus." } },
            "vie": { label: "Domaine de Vie", desc: "Guérisseur suprême.", details: { style: "Soin", feature: "Sanctuaire Suprême : Vos soins sont augmentés de 20% + Niveau." } },
            "tombes": { label: "Domaine des Tombes", desc: "Gardien du seuil.", details: { style: "Anti-Mort", feature: "Refus de Mourir : Réaction pour maintenir un allié à 1 PV au lieu de 0." } }
        },
        abilities: [],
        unlockables: [
            { name: "Rayon Traceur", cost: 20, cooldown: 3, level: 2, dice: "4d6", scaling: "wis", range: 9, desc: "Dégâts radiants puissants (Portée : 9 cases)." },
            { name: "Esprit Gardien", cost: 40, cooldown: 5, level: 3, dice: "3d8", scaling: "wis", range: 2, desc: "Aura de dégâts autour du clerc." },
            { name: "Restauration", cost: 30, cooldown: 0, level: 4, range: 1, desc: "Dissipe les maladies et altérations." },
            { name: "Colonne de Feu", cost: 45, cooldown: 4, level: 5, dice: "8d6", scaling: "wis", range: 8, desc: "Dégâts de feu et radiants dans une zone." },
            { name: "Sanctuaire", cost: 25, cooldown: 6, level: 6, range: 4, desc: "Protège un allié contre les attaques." },
            { name: "Mot de Rappel", cost: 60, cooldown: 10, level: 7, desc: "Téléporte le groupe en lieu sûr." },
            { name: "Guérison de Masse", cost: 80, cooldown: 8, level: 8, dice: "10d8", scaling: "wis", range: 6, desc: "Soigne tous les alliés à 6 cases." },
            { name: "Résurrection", cost: 100, cooldown: 50, level: 9, desc: "Ramène un allié à la vie (Cooldown massif)." },
            { name: "Intervention Divine", cost: 100, cooldown: 50, level: 10, desc: "ULTIME : Votre Dieu intervient directement (Effet aléatoire majeur)." },
            { name: "Saint-Suaire", cost: 0, cooldown: 0, level: 15, desc: "Immunité aux dégâts nécrotiques et résistance au poison (Passif)." },
            { name: "LÉGENDAIRE : Jugement Dernier", cost: 120, cooldown: 15, level: 20, dice: "15d10", scaling: "wis", range: 12, desc: "Un pilier de lumière s'abat, vaporisant les morts-vivants et soignant les alliés." },
            { name: "Mains de Solarius", cost: 0, cooldown: 0, level: 25, desc: "Vos sorts de soin restaurent également 10 points de ressource à la cible (Passif)." },
            { name: "ASCENSION : Messager du Voile", cost: 200, cooldown: 72, level: 30, desc: "Pendant 5 tours, vous êtes invulnérable, vos soins n'ont plus de portée, et chaque attaque adverse contre vous déclenche un contre-châtiment." }
        ],
        portrait: "/portraits/clerc.png"
    },
    "Paladin": {
        label: "Paladin",
        category: "MIGHT",
        hitDie: 10,
        resourceStat: "cha",
        desc: "Chevalier saint. Classe Hybride d'élite. Excellent au combat physique, soutenu par une magie sacrée simple.",
        mechanic: {
            name: "Châtiment Sanctifié",
            desc: "Votre charisme dicte votre puissance sacrée.\n\n• **Smite**: Vous pouvez convertir du Mana en dés de dégâts supplémentaires (1d8 par 10 points) lors d'une attaque réussie.\n• **Protection d'Aura**: Les alliés proches gagnent +2 à leur Classe d'Armure tant que vous êtes debout."
        },
        stats: { str: 16, dex: 10, con: 14, int: 8, wis: 12, cha: 14 },
        protection: { armor: ["light", "medium", "heavy"], weapons: ["simple", "martial"], shields: true },

        starting_equipment_options: [
            {
                label: "Le Croisé Impérial",
                items: [
                    { name: "Épée Longue", type: "weapon", category: "martial", slot: "main", stats: { atk: 3 }, rarity: "common", desc: "Acier béni.", equipped: true, img: "/items/longsword.png" },
                    { name: "Bouclier en Acier", type: "shield", category: "shield", slot: "off", stats: { ac: 2 }, rarity: "common", desc: "Gravé de symboles saints.", equipped: true },
                    { name: "Armure de Plates", type: "armor", category: "heavy", slot: "body", stats: { ac: 6, dex: -2 }, rarity: "uncommon", desc: "Imposante et protectrice.", equipped: true }
                ]
            },
            {
                label: "Le Vengeur Nomade",
                items: [
                    { name: "Masse Sacrée", type: "weapon", category: "simple", slot: "main", stats: { atk: 2, cha: 1 }, rarity: "common", desc: "Châtie l'injustice.", equipped: true, img: "/items/mace.png" },
                    { name: "Armure d'Écailles", type: "armor", category: "medium", slot: "body", stats: { ac: 4 }, rarity: "common", desc: "Pratique pour les longs voyages.", equipped: true },
                    { name: "Amulette de Bravoure", type: "accessory", slot: "neck", stats: { cha: 1 }, rarity: "common", desc: "Un souvenir de votre foyer.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Imposition des Mains", cost: 10, cooldown: 3, level: 1, heal: "10", scaling: "cha", type: "Sacré", actionType: "Action", flavor: "Votre foi est si pure qu'un seul toucher peut chasser les ombres et restaurer la vitalité d'un corps brisé.", desc: "Rend 5 PV par point de Charisme.", vfx: "heal_white" },
            { name: "Châtiment Divin", cost: 25, cooldown: 1, level: 1, dice: "2d8", scaling: "cha", type: "Châtiment", actionType: "Passif", flavor: "Le Crystal guide votre lame, l'enveloppant d'une fureur sacrée qui réduit le mal en cendres.", desc: "Invoquez le châtiment pour +2d8 dégâts radiants.", vfx: "smite_yellow" },
            { name: "Bouclier de Foi", cost: 15, cooldown: 4, level: 1, type: "Abjuration", actionType: "Action Bonus", flavor: "Une aura dorée vous enveloppe, tel un rempart invisible érigé par les mains de Solarius lui-même.", desc: "Augmente la CA d'un allié de 2.", vfx: "shield_glow_gold" }
        ],
        subclasses: {
            "vengeance": { label: "Serment de Vengeance", desc: "Juge impitoyable.", details: { style: "Traqueur", feature: "Vœu d'Inimitié : Désignez une cible comme ennemi juré pour avoir l'Avantage sur toutes vos attaques contre elle." } },
            "protection": { label: "Serment de Protection", desc: "Bouclier vivant.", details: { style: "Défenseur", feature: "Bastion : Tant que vous êtes conscient, les alliés à moins de 3m gagnent +2 à la CA." } },
            "anciens": { label: "Serment des Anciens", desc: "Gardien de la nature.", details: { style: "Contrôle", feature: "Vignes de Lumière : Invoque des vignes spectrales qui immobilisent une cible (Jet de Force pour briser)." } }
        },
        abilities: [],
        unlockables: [
            { name: "Sens Divin", cost: 5, cooldown: 0, level: 3, range: 6, desc: "Détecte les entités à 6 cases." },
            { name: "Aura de Protection", cost: 0, cooldown: 0, level: 4, range: 2, desc: "Les alliés à 2 cases gagnent votre bonus CHA aux JS (Passif)." },
            { name: "Compagnon Fidèle", cost: 30, cooldown: 20, level: 5, desc: "Invoque un destrier céleste." },
            { name: "Cercle de Vérité", cost: 25, cooldown: 5, level: 6, range: 3, desc: "Empêche les mensonges à 3 cases." },
            { name: "Bannissement", cost: 40, cooldown: 4, level: 7, range: 6, desc: "Bannit une créature à 6 cases." },
            { name: "Aura de Courage", cost: 0, cooldown: 0, level: 8, range: 2, desc: "Immunise les alliés à 2 cases à la peur (Passif)." },
            { name: "Croisé", cost: 50, cooldown: 10, level: 9, scaling: "cha", desc: "Gagne un bonus CA et dégâts pendant 1 minute." },
            { name: "Ange Vengeur", cost: 100, cooldown: 30, level: 10, desc: "ULTIME : Transformation divine temporaire." },
            { name: "Aura de Sainteté", cost: 0, cooldown: 0, level: 15, range: 10, desc: "Toutes les créatures hostiles dans un rayon de 10 cases subissent un désavantage sur leurs jets d'attaque contre vous (Passif)." },
            { name: "LÉGENDAIRE : Condamnation Éternelle", cost: 80, cooldown: 12, level: 20, dice: "8d8", scaling: "cha", desc: "Votre prochaine attaque réussie scelle la cible dans une prison de lumière, l'immobilisant totalement et lui infligeant des dégâts radiants chaque tour." },
            { name: "Sang des Sept Heros", cost: 0, cooldown: 0, level: 25, desc: "Vous récupérez 10% de vos PV max à chaque début de tour tant que vous combattez (Passif)." },
            { name: "ASCENSION : Avatar de Solarius", cost: 180, cooldown: 60, level: 30, desc: "Vous devenez littéralement le bras du dieu soleil. Vos attaques vaporisent les cibles de bas niveau, votre aura inflige 50 dégâts radiants par tour et vous soignez tous les alliés de 100 PV au lancement." }
        ],
        portrait: "/portraits/paladin.png"
    },
    "Rôdeur": {
        label: "Rôdeur",
        category: "SKILL",
        hitDie: 10,
        resourceStat: "wis",
        desc: "Maître des terres sauvages. Classe Hybride mêlant archerie experte et magie naturelle utilitaire.",
        mechanic: {
            name: "Instinct de Traqueur",
            desc: "La nature est votre alliée.\n\n• **Camouflage Naturel**: Vous avez Avantage aux jets de Discrétion en forêt ou milieux naturels.\n• **Tir de Réaction**: Si un ennemi se déplace à portée de votre arc, vous pouvez dépenser 10 Mana pour effectuer une attaque immédiate."
        },
        stats: { str: 12, dex: 16, con: 14, int: 10, wis: 14, cha: 8 },
        protection: { armor: ["light", "medium"], weapons: ["simple", "martial", "finesse"], shields: true },

        starting_equipment_options: [
            {
                label: "L'Archer Sylvestre",
                items: [
                    { name: "Arc Long en If", type: "weapon", category: "martial", slot: "main", stats: { atk: 3 }, rarity: "common", desc: "Précis et letal.", equipped: true, img: "/items/bow.png" },
                    { name: "Carquois de 20 flèches", type: "ammo", slot: "back", stats: {}, rarity: "common", desc: "Flèches à pointe d'acier.", equipped: true },
                    { name: "Armure de Cuir Souple", type: "armor", category: "light", slot: "body", stats: { ac: 2 }, rarity: "common", desc: "Parfaite pour la discrétion.", equipped: true }
                ]
            },
            {
                label: "Le Traqueur de l'Ombre",
                items: [
                    { name: "Cimeterre", type: "weapon", category: "finesse", slot: "main", stats: { atk: 2 }, rarity: "common", desc: "Lame incurvée pour le corps à corps.", equipped: true, img: "/items/scimitar.png" },
                    { name: "Dague", type: "weapon", category: "finesse", slot: "off", stats: { atk: 1 }, rarity: "common", desc: "Rapide et discrète.", equipped: true, img: "/items/dagger.png" },
                    { name: "Cape de Camouflage", type: "armor", category: "light", slot: "body", stats: { ac: 1, dex: 1 }, rarity: "common", desc: "Se fond dans les sous-bois.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Marque du Chasseur", cost: 15, cooldown: 3, level: 1, dice: "1d6", scaling: "dex", range: 7, type: "Traque", actionType: "Action Bonus", flavor: "Votre regard se fixe sur le point faible de votre proie. Aucun mouvement ne peut vous échapper dorénavant.", desc: "Ajoute +1d6 dégâts à toutes vos attaques sur la cible.", vfx: "mark_green" },
            { name: "Tir Précis", cost: 10, cooldown: 2, level: 1, dice: "1d8", scaling: "dex", range: 10, type: "Précision", actionType: "Action", flavor: "Vous retenez votre souffle pendant que le monde s'efface, ne laissant que vous et le cœur de votre ennemi.", desc: "Ignore les bonus de couverture de la cible.", vfx: "arrow_yellow" },
            { name: "Sens de la Bête", cost: 5, cooldown: 4, level: 1, type: "Primal", actionType: "Action", flavor: "Vous laissez vos sens s'évader au-delà de l'humain, ressentant chaque vibration du sol et chaque frémissement du vent.", desc: "+3 à la Perception et à l'Initiative.", vfx: "animal_eye" }
        ],
        subclasses: {
            "betes": { label: "Maître des Bêtes", desc: "Compagnon animal.", details: { style: "Duo", feature: "Attaque Coordonnée : Vous gagnez un bonus aux dégâts si votre compagnon animal est adjacent à votre cible." } },
            "tireur": { label: "Tireur d'Élite", desc: "Sniper.", details: { style: "Distance", feature: "Tir Perforant : Vos attaques à distance ignorent les bonus de couverture partielle." } },
            "traqueur": { label: "Traqueur d'Ombre", desc: "Invisible dans le noir.", details: { style: "Embuscade", feature: "Premier Sang : Bonus à l'initiative et dégâts supplémentaires lors du premier tour de combat." } }
        },
        abilities: [],
        unlockables: [
            { name: "Soins Naturels", cost: 15, cooldown: 3, level: 3, heal: "1d8", scaling: "wis", range: 2, desc: "Soigne un allié à 2 cases d'1d8 + Sagesse." },
            { name: "Passif Terrain", cost: 0, cooldown: 0, level: 4, desc: "Ignore les terrains difficiles (Passif)." },
            { name: "Tir de Barrage", cost: 30, cooldown: 3, level: 5, dice: "2d8", scaling: "dex", range: 4, desc: "Tire sur toutes les cibles dans un cône de 4 cases." },
            { name: "Camouflage", cost: 20, cooldown: 4, level: 6, desc: "+10 Discrétion si immobile." },
            { name: "Piège à Ours", cost: 15, cooldown: 5, level: 7, dice: "4d6", range: 1, desc: "Place un piège sur une case adjacente." },
            { name: "Volée", cost: 40, cooldown: 5, level: 8, dice: "3d8", scaling: "dex", range: 9, desc: "Pluie de flèches (Zone : 2 cases, Portée : 9 cases)." },
            { name: "Sens Sauvage", cost: 10, cooldown: 0, level: 9, range: 4, desc: "Détecte les invisibles à 4 cases." },
            { name: "Maître de la Traque", cost: 80, cooldown: 20, level: 10, desc: "ULTIME : Vos attaques ne peuvent pas manquer cette cible." },
            { name: "Lien de la Forêt", cost: 0, cooldown: 0, level: 15, desc: "Vous pouvez communiquer avec les animaux et les plantes sur n'importe quel sujet lié à la région actuelle (Passif)." },
            { name: "LÉGENDAIRE : Flèche de l'Atlas", cost: 90, cooldown: 10, level: 20, dice: "12d10", scaling: "dex", range: 50, desc: "Un tir à très longue distance (50 cases) qui traverse la matière et les protections magiques." },
            { name: "Esclavage de la Bête", cost: 0, cooldown: 0, level: 25, desc: "Toute créature de type 'Beast' ne peut pas vous attaquer à moins que vous ne l'attaquiez en premier (Passif)." },
            { name: "ASCENSION : Esprit de la Sylve d'Émeraude", cost: 160, cooldown: 60, level: 30, desc: "Vous devenez corps et âme avec la nature. Pendant 5 tours, vous pouvez vous téléporter instantanément sur n'importe quelle case du terrain, vos flèches invoquent des lianes immobilisantes et vous regagnez 20 PV par tour." }
        ],
        portrait: "/portraits/rodeur.png"
    },
    "Barde": {
        label: "Barde",
        category: "SKILL",
        hitDie: 8,
        resourceStat: "cha",
        desc: "Artiste et diplomate. Classe Hybride très polyvalente. Magie sonore simple et compétences physiques agiles.",
        mechanic: {
            name: "Inspiration Bardique",
            desc: "Vos mots ont un poids réel.\n\n• **Écho Harmonique**: Lancer un sort restaure 5 Mana à l'allié le plus proche.\n• **Polyvalence**: Vous pouvez utiliser n'importe quel objet magique sans restriction de classe."
        },
        stats: { str: 8, dex: 14, con: 12, int: 12, wis: 10, cha: 18 },
        protection: { armor: ["light"], weapons: ["simple", "finesse", "arcane"], shields: false },

        starting_equipment_options: [
            {
                label: "Le Troubadour Errant",
                items: [
                    { name: "Luth de Chêne", type: "weapon", category: "arcane", slot: "main", stats: { atk: 1, cha: 1 }, rarity: "common", desc: "Un instrument aux cordes d'argent.", equipped: true },
                    { name: "Rapière Élégante", type: "weapon", category: "finesse", slot: "main", stats: { atk: 2 }, rarity: "common", desc: "Pour les duels de mots et d'acier.", equipped: true, img: "/items/rapier.png" },
                    { name: "Vêtements de Voyageur", type: "armor", category: "light", slot: "body", stats: { ac: 1, cha: 1 }, rarity: "common", desc: "Colorés et confortables.", equipped: true }
                ]
            },
            {
                label: "L'Éminence Grise",
                items: [
                    { name: "Dague Dissimulée", type: "weapon", category: "finesse", slot: "main", stats: { atk: 1, dex: 1 }, rarity: "common", desc: "Personne ne la voit venir.", equipped: true, img: "/items/dagger.png" },
                    { name: "Flûte d'Os", type: "weapon", category: "arcane", slot: "off", stats: { cha: 2 }, rarity: "common", desc: "Un son envoûtant et inquiétant.", equipped: true },
                    { name: "Manteau de Velours", type: "armor", category: "light", slot: "body", stats: { ac: 1, cha: 2 }, rarity: "common", desc: "Luxueux et imposant.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Inspiration Bardique", cost: 10, cooldown: 2, level: 1, type: "Soutien", actionType: "Action Bonus", flavor: "Une mélodie épique qui ravive la flamme dans le cœur de vos compagnons et les pousse au-delà de leurs limites.", desc: "Donne un bonus de +1d6 au prochain jet d'un allié.", vfx: "note_gold" },
            { name: "Mot de Guérison", cost: 15, cooldown: 2, level: 1, dice: "1d4", scaling: "cha", range: 6, type: "Sonore", actionType: "Action Bonus", flavor: "Un chant doux et apaisant qui calme les douleurs les plus vives et redonne la force de se battre.", desc: "Soin rapide par le chant.", vfx: "heal_pink" },
            { name: "Moquerie Vicieuse", cost: 8, cooldown: 1, level: 1, dice: "1d4", scaling: "cha", range: 8, type: "Psychique", actionType: "Action", flavor: "Une insulte si cinglante qu'elle s'enracine dans l'esprit de l'adversaire, le faisant douter de ses propres forces.", desc: "La cible a un désavantage sur son prochain jet d'attaque.", vfx: "mock_purple" }
        ],
        subclasses: {
            "savoir": { label: "Collège du Savoir", desc: "Maître des secrets.", details: { style: "Magie", feature: "Mots Coupants : Utilisez votre réaction pour distraire une cible et réduire son jet d'attaque de 1d6." } },
            "valeur": { label: "Collège de la Valeur", desc: "Barde de guerre.", details: { style: "Combat", feature: "Inspiration Martiale : Votre inspiration bardique peut maintenant être ajoutée aux dégâts d'une attaque." } },
            "eclats": { label: "Collège des Éclats", desc: "Psychologie et charme.", details: { style: "Contrôle", feature: "Manteau de Majesté : Vous pouvez lancer le sort Injonction comme action bonus sans dépenser de mana." } }
        },
        abilities: [],
        unlockables: [
            { name: "Chant de Repos", cost: 0, cooldown: 0, level: 2, desc: "Augmente les soins pendant les repos courts (Passif)." },
            { name: "Expertise Bardique", cost: 0, cooldown: 0, level: 3, desc: "+4 à deux compétences de votre choix (Passif)." },
            { name: "Suggestion", cost: 25, cooldown: 5, level: 4, range: 6, desc: "Force une cible à effectuer une action simple." },
            { name: "Confusion de Masse", cost: 45, cooldown: 6, level: 5, range: 4, desc: "Plusieurs cibles attaquent au hasard." },
            { name: "Secret Arcanique", cost: 0, cooldown: 0, level: 6, desc: "Apprenez deux sorts de n'importe quelle autre classe (Passif)." },
            { name: "Charme de l'Irrésistible", cost: 30, cooldown: 4, level: 7, desc: "La cible ne peut pas vous attaquer." },
            { name: "Invisibilité de Groupe", cost: 60, cooldown: 8, level: 8, desc: "Rend tout le groupe invisible pendant 1 minute." },
            { name: "Mot de Pouvoir : Étourdissement", cost: 70, cooldown: 10, level: 9, range: 8, desc: "Étourdit instantanément une cible." },
            { name: "Mains de l'Artiste", cost: 40, cooldown: 5, level: 10, desc: "ULTIME : Vous pouvez lancer deux sorts non-concentrés en un seul tour." },
            { name: "Harmonie Absolue", cost: 0, cooldown: 0, level: 15, desc: "Votre bonus de CHA s'ajoute à tous vos jets de sauvegarde (Passif)." },
            { name: "LÉGENDAIRE : Chant de la Création", cost: 130, cooldown: 20, level: 20, desc: "Vous invoquez un objet ou une créature spectrale géante qui combat à vos côtés pendant 5 tours." },
            { name: "Aura d'Euphorie", cost: 0, cooldown: 0, level: 25, desc: "Les alliés à 10 cases ont l'Avantage sur tous leurs jets (Passif)." },
            { name: "ASCENSION : Voix de l'Univers", cost: 220, cooldown: 60, level: 30, desc: "Votre voix peut remodeler la réalité. Pendant 3 tours, chaque mot que vous prononcez devient un sort de niveau 9 gratuit." }
        ],
        portrait: "/portraits/barde.png"
    },
    "Druide": {
        label: "Druide",
        category: "MAGIC",
        hitDie: 8,
        resourceStat: "wis",
        desc: "Gardien de l'équilibre naturel. Utilise la magie sauvage pour soigner ou punir.",
        mechanic: {
            name: "Lien Naturel",
            desc: "Votre magie provient de la terre elle-même.\n\n• **Forme Sauvage**: Vous pouvez vous transformer en animal (Loup, Ours) une fois par combat.\n• **Cœur de la Planète**: Vos sorts de soin sont 25% plus efficaces en extérieur."
        },
        stats: { str: 10, dex: 12, con: 14, int: 10, wis: 18, cha: 12 },
        protection: { armor: ["light", "medium"], weapons: ["simple", "arcane"], shields: true },

        starting_equipment_options: [
            {
                label: "Le Défenseur du Bosquet",
                items: [
                    { name: "Bâton en If", type: "weapon", category: "arcane", slot: "main", stats: { atk: 1, wis: 1 }, rarity: "common", desc: "Bourgeonne de temps en temps.", equipped: true, img: "/items/staff.png" },
                    { name: "Bouclier en Bois", type: "shield", category: "shield", slot: "off", stats: { ac: 2 }, rarity: "common", desc: "Renforcé par des lianes.", equipped: true },
                    { name: "Armure de Cuir Brut", type: "armor", category: "medium", slot: "body", stats: { ac: 2 }, rarity: "common", desc: "Peaux non traitées.", equipped: true }
                ]
            },
            {
                label: "Le Primal Sauvage",
                items: [
                    { name: "Serpe de Silex", type: "weapon", category: "simple", slot: "main", stats: { atk: 2 }, rarity: "common", desc: "Tranche comme le vent du nord.", equipped: true },
                    { name: "Bourse de Graines", type: "tool", slot: "item", stats: { wis: 1 }, rarity: "common", desc: "Utile pour la magie de croissance.", equipped: false },
                    { name: "Peau de Loup", type: "armor", category: "light", slot: "body", stats: { ac: 1, dex: 1 }, rarity: "common", desc: "Imprégnée de l'esprit de la meute.", equipped: true }
                ]
            }
        ],
        initial_ability_options: [
            { name: "Prodige", cost: 5, cooldown: 1, level: 1, dice: "1d10", scaling: "wis", range: 2, type: "Sauvage", actionType: "Action", flavor: "Vous invoquez la sève même des anciens arbres pour durcir vos bras comme du bois de fer.", desc: "Une attaque magique au corps à corps.", vfx: "leaf_green" },
            { name: "Baies Nourricières", cost: 15, cooldown: 5, level: 1, type: "Nature", actionType: "Action", flavor: "Le sol s'ouvre pour offrir des baies imprégnées de la vitalité de la forêt, capables de régénérer les corps fatigués.", desc: "Crée des baies de survie.", vfx: "berry_red" },
            { name: "Forme Sauvage (Loup)", cost: 30, cooldown: 5, level: 1, type: "Mutation", actionType: "Action", flavor: "Vos os se brisent et se reforment, votre peau se couvre de poils... vous ne faites plus qu'un avec le prédateur.", desc: "Transformez-vous en loup pour le combat.", vfx: "morph_blue" }
        ],
        subclasses: {
            "terre": { label: "Cercle de la Terre", desc: "Lien profond avec le sol.", details: { style: "Sorts", feature: "Récupération Naturelle : Régénérez du Mana lors d'un court repos." } },
            "lune": { label: "Cercle de la Lune", desc: "Maître des métamorphoses.", details: { style: "Combat", feature: "Transformation de Combat : Transformez-vous en action bonus." } },
            "spores": { label: "Cercle des Spores", desc: "Cycle de la décomposition.", details: { style: "Dégâts", feature: "Halo de Spores : Les ennemis qui s'approchent subissent des dégâts de poison automatiques chaque tour." } }
        },
        abilities: [],
        unlockables: [
            { name: "Croissance d'Épines", cost: 25, cooldown: 4, level: 2, range: 6, desc: "Zone de terrain difficile et dégâts." },
            { name: "Peau d'Écorce", cost: 15, cooldown: 5, level: 3, desc: "Fixe la CA à 16 pendant 1 minute." },
            { name: "Vague de Soin", cost: 30, cooldown: 4, level: 4, dice: "2d8", scaling: "wis", range: 4, desc: "Soigne en zone (Rayon : 2 cases)." },
            { name: "Appel de la Foudre", cost: 40, cooldown: 2, level: 5, dice: "3d10", scaling: "wis", range: 12, desc: "Frappe de foudre répétable pendant 10 tours." },
            { name: "Invoquer des Animaux", cost: 50, cooldown: 10, level: 6, desc: "Appelle des esprits fées en forme d'animaux." },
            { name: "Éclair de Vie", cost: 35, cooldown: 3, level: 7, dice: "5d6", range: 6, desc: "Dégâts de foudre et soin de moitié." },
            { name: "Guerison par la Terre", cost: 45, cooldown: 5, level: 8, desc: "Soigne et retire tous les poisons." },
            { name: "Mur de Pierre", cost: 50, cooldown: 8, level: 9, range: 10, desc: "Crée une barrière physique infranchissable." },
            { name: "Avatar de la Nature", cost: 100, cooldown: 40, level: 10, desc: "ULTIME : Vous devenez un tréant massif pendant 3 tours." },
            { name: "Sang de Gaïa", cost: 0, cooldown: 0, level: 15, desc: "Régénère 5 PV par tour en extérieur (Passif)." },
            { name: "LÉGENDAIRE : Tempête de la Création", cost: 150, cooldown: 30, level: 20, dice: "20d10", scaling: "wis", range: 20, desc: "Une tempête déchaînée qui soigne les alliés et foudroie les ennemis pendant 3 tours." },
            { name: "Esprit de la Forêt", cost: 0, cooldown: 0, level: 25, desc: "Toute la flore du terrain combat pour vous (Passif)." },
            { name: "ASCENSION : Gaïa Incarnée", cost: 250, cooldown: 90, level: 30, desc: "Tant que vous êtes sur le terrain, celui-ci obéit à votre volonté. Vous pouvez faire surgir des montagnes, assécher des lacs ou créer des forêts en un instant. Tous les ennemis subissent un désavantage permanent." }
        ],
        portrait: "/portraits/druide.png"
    }
};

export const BESTIARY = {
    "Gobelin": {
        name: "Gobelin Pilleur",
        type: "Humanoid (Goblinoid)",
        cr: "1/4",
        stats: { hp: 7, ac: 15, atk: 4 },
        img: "/monsters/gobelin.png",
        desc: "Une petite créature vicieuse à la peau verte et aux dents pointues.",
        lore: `Les Gobelins d'Aethelgard ne sont pas des créatures naturelles de la faune locale. Selon les écrits de Kaelen, ils sont les descendants dégénérés des esclaves-travailleurs de l'Empire Ashka, abandonnés et laissés muter par les résidus de magie corrompue après la chute de l'Empire. Cette origine explique leur obsession maladive pour les métaux brillants et les mécanismes complexes, qu'ils tentent maladroitement de reproduire.

Ils vivent en tribus matriarcales dans les réseaux de cavernes des Monts Cœur-de-Fer ou dans les ruines des Terres Brûlées. Un gobelin seul est lâche et servile, mais en groupe, ils développent une intelligence collective surprenante, capable de monter des embuscades complexes. Ils utilisent des cris stridents pour communiquer sur de longues distances, un langage que les aventuriers comparent souvent au bruit d'un métal que l'on raye. Leur espérance de vie est courte, mais leur taux de reproduction est si élevé que certaines régions du Val Doré doivent organiser des battues saisonnières pour protéger les récoltes.`,
        behavior: "Attaque en groupe, utilise des tactiques de guérilla (cache-cache). Fuit si le chef meurt.",
        behavior_type: "RANGED",
        actions: [
            { name: "Cimeterre", desc: "Melee: +4 to hit, 1d6+2 dégâts tranchants.", range: 1.5 },
            { name: "Arc court", desc: "Ranged: +4 to hit, 1d6+2 dégâts perçants.", range: 12 }
        ]
    },
    "Loup": {
        name: "Loup des Forêts",
        type: "Beast",
        cr: "1/4",
        stats: { hp: 11, ac: 13, atk: 4 },
        img: "/monsters/loup.png",
        desc: "Un prédateur gris aux yeux jaunes perçants.",
        lore: `Le Loup des Forêts d'Aethelgard, particulièrement ceux de la Sylve d'Émeraude, est une créature dotée d'une sensibilité magique. On raconte que leurs ancêtres étaient les compagnons des premiers druides du Conseil des Chênes. Contrairement aux loups ordinaires, ils ne chassent que ce dont ils ont besoin pour survivre et semblent protéger instinctivement les lieux de pouvoir druidiques.

Leur pelage possède une propriété unique de réfraction de la lumière, ce qui les rend presque invisibles dans les sous-bois denses (d'où leur bonus de discrétion). Les habitants de Sylmanir considèrent la rencontre d'un loup solitaire comme un présage : un loup qui vous regarde dans les yeux sans grogner est un signe que vous êtes sur le bon chemin, tandis qu'une meute qui hurle à midi annonce une incursion de l'Ombre. Ils sont capables de pister une odeur à travers les plans si celle-ci est imprégnée de magie.`,
        behavior: "Chasse en meute. Tente de renverser ses proies pour les dévorer.",
        behavior_type: "MELEE",
        actions: [
            { name: "Morsure", desc: "Melee: +4 to hit, 2d4+2 dégâts. CD 11 Force ou mis à terre.", range: 1.5 }
        ]
    },
    "Orc": {
        name: "Orc Brute",
        type: "Humanoid",
        cr: "1/2",
        stats: { hp: 15, ac: 13, atk: 5 },
        img: "/monsters/orc.png",
        desc: "Un guerrier massif à la peau grisâtre, avide de combat.",
        lore: "Les orcs d'Aethelgard sont des guerriers fiers qui vivent dans les steppes désolées du Sud. Ils respectent la force avant tout.",
        behavior: "Fonce dans le tas. Ne recule jamais.",
        behavior_type: "MELEE",
        actions: [
            { name: "Hache de guerre", desc: "Melee: +5 to hit, 1d12+3 dégâts tranchants.", range: 1.5 }
        ]
    },
    "Squelette": {
        name: "Squelette d'Orc",
        type: "Undead",
        cr: "1/4",
        stats: { hp: 13, ac: 13, atk: 4 },
        img: "/monsters/squelette.png",
        desc: "Des os animés par une magie impie, portant des restes d'armure.",
        lore: `Ces "Orcs" ne sont pas la race vivante des temps anciens, mais des Squelettes d'Orcs de l'ancienne Garde de Sang du Sud, réanimés par les vents nécrotiques qui soufflent depuis la Faille de l'Ombre.`,
        behavior: "Sans peur, sans pitié. Obéit aux ordres simples. Vulnérable aux dégâts contondants.",
        behavior_type: "MELEE",
        actions: [
            { name: "Épée courte", desc: "Melee: +4 to hit, 1d6+2 dégâts perçants.", range: 1.5 }
        ]
    },
    "Ogre": {
        name: "Ogre",
        type: "Giant",
        cr: "2",
        stats: { hp: 59, ac: 11, atk: 6 },
        img: "/monsters/ogre.png",
        desc: "Un géant de 3 mètres, stupide mais incroyablement fort.",
        lore: `L'Ogre est une anomalie biologique, souvent appelé "le fils raté des géants". On dit que lorsque les Géants des Tempêtes se sont retirés dans les cimes lors de l'Ère des Cendres, ceux qui sont restés dans les plaines ont dégénéré, perdant leur noblesse et leur magie pour ne garder que leur faim et leur taille. Ils vivent de manière solitaire ou en petits groupes familiaux, occupant souvent des grottes stratégiques ou des ruines de ponts impériaux.

Leur cuir est incroyablement épais, capable d'arrêter des flèches ordinaires, ce qui compense leur absence totale de tactique. Un ogre affamé est une force de la nature ; il ne s'arrêtera devant aucun obstacle pour atteindre sa proie. Ils ont une prédilection pour la viande de cheval et les tonneaux de vin, qu'ils engloutissent d'un trait. Bien que stupides, ils possèdent une ruse animale pour piéger les voyageurs dans les cols étroits en provoquant des éboulements.`,
        behavior: "Fonce et frappe. Peut lancer des débris. Facile à tromper mais mortel au corps à corps.",
        behavior_type: "MELEE",
        actions: [
            { name: "Massue Géante", desc: "Melee: +6 to hit, 2d8+4 dégâts contondants.", range: 1.5 },
            { name: "Lancer de Rocher", desc: "Ranged: +6 to hit, 2d6+4 dégâts contondants.", range: 8 }
        ]
    },
    "Spectre": {
        name: "Spectre Hurlant",
        type: "Undead",
        cr: "3",
        stats: { hp: 45, ac: 12, atk: 5 },
        img: "/monsters/spectre.png",
        desc: "Une forme fantomatique et terrifiante qui draine la vie.",
        lore: `Les spectres sont les résidus psychiques des victimes de la "Trahison des Sept", un événement sombre de la fin de l'Ère des Cendres où un régiment entier fut sacrifié par un commandant lâche. Ils ne sont pas composés de matière, mais d'une pure volonté négative qui cherche à refroidir tout ce qui brûle de vie. Leur passage laisse une traînée de givre noir sur le sol et fait flétrir les plantes en quelques secondes.

Leurs cris ne sont pas de simples bruits, mais des attaques soniques qui résonnent directement dans l'âme de ceux qui les entendent, leur montrant leurs pires échecs. Ils sont particulièrement attirés par les émotions fortes : la peur, la colère ou le désespoir agissent comme un phare pour eux. On ne peut pas "tuer" un spectre au sens noble du terme ; on ne peut que disperser son énergie momentanément jusqu'à ce que sa douleur le reforme à nouveau dans les ténèbres.`,
        behavior: "Traverse les murs, attaque les vivants isolés. Craint la lumière du soleil.",
        behavior_type: "MELEE",
        actions: [
            { name: "Drain de Vie", desc: "Melee: +5 to hit, 3d6 nécrotique. La cible doit réussir un JS Con CD 10 ou perdre ces PV max.", range: 1.5 }
        ]
    },
    "Dragon": {
        name: "Jeune Dragon Rouge",
        type: "Dragon",
        cr: "10 (BOSS)",
        stats: { hp: 178, ac: 18, atk: 10 },
        img: "/monsters/dragon.png",
        desc: "Une bête majestueuse et terrifiante aux écailles écarlates.",
        lore: `Le Jeune Dragon Rouge, bien qu'il ne soit qu'un "adolescent" selon les standards draconiens, possède déjà une envergure de quinze mètres et un souffle capable de faire fondre le fer le plus pur. Ils sont les descendants directs d'Ignis l'Ancien, le grand dévastateur de l'Empire Ashka. Pour un dragon rouge, le monde n'est qu'une collection d'objets à posséder ou à consumer. 

Leur antre est toujours situé dans un lieu de chaleur intense, comme une veine volcanique ou le cœur d'une forge naine abandonnée. Ils détestent par-dessus tout les mages, car ils voient dans la magie mortelle une pâle et insultante copie de leur propre puissance innée. Un dragon rouge marquera souvent son territoire en brûlant des forêts entières selon un motif géométrique visible depuis le ciel. S'engager contre un tel adversaire demande non seulement du courage, mais aussi une préparation minutieuse, car ils sont aussi intelligents qu'ils sont brutaux.`,
        behavior: "Arrogant. Utilise son souffle dès que possible. Vole hors de portée si menacé.",
        behavior_type: "MELEE",
        actions: [
            { name: "Multiattaque", desc: "Fait trois attaques : une morsure et deux griffes.", range: 2 },
            { name: "Morsure", desc: "Melee: +10 to hit, 2d10+6 perçant + 1d6 feu.", range: 2 },
            { name: "Souffle de Feu (Recharge 5-6)", desc: "Cône de 3 cases. 10d8 dégâts de feu (JS Dex CD 17 demi).", range: 6 }
        ]
    }
};

export const ENVIRONMENTAL_RULES = `
### RÈGLES DE CYCLE JOUR/NUIT (IMPÉRATIF)
Le temps s'écoule réellement dans le monde. Adapte tes descriptions en fonction de 'timeOfDay' et 'currentHour' :

1. **AUBE (05h-08h)** : Lumière rasante, rosée, réveil de la nature. Bonus de discrétion légère. Les PNJ ouvrent leurs boutiques.
2. **JOURNÉE (08h-18h)** : Visibilité totale. Activité intense dans les villes. Descriptions centrées sur les couleurs et le mouvement.
3. **CRÉPUSCULE (18h-21h)** : Ombres allongées, ciel orangé. Ambiance mélancolique ou pressée (retour au bercail).
4. **NUIT (21h-05h)** : Visibilité réduite (pénalité aux jets de perception sans source de lumière). Monstres nocturnes plus agressifs. Villes calmes, gardes vigilants.

**Conséquences Narratives :**
- Si un joueur agit de nuit sans lumière, mentionne la difficulté à voir.
- Les rencontres changent : plus de brigands et de bêtes sauvages la nuit.
- Les PNJ peuvent refuser de parler s'ils dorment (sauf urgence).
`;

/**
 * PHASE 21.5: WORLD MYTHS & LEGENDS
 * Optional narrative flavoring for the GM to use during long rests or lore checks.
 */
export const WORLD_MYTHS_AND_LEGENDS = [
    {
        title: "La Chaîne de Solarius",
        story: `On raconte que lors de la création d'Aethelgard, Solarius s'aperçut que le monde risquait de dériver dans le vide de l'Aether. Pour l'ancrer à la réalité, il forgea une chaîne d'or pur, longue de mille lieues, dont chaque maillon représentait une vérité universelle. Il attacha l'une des extrémités au sommet du Pic Central et l'autre au cœur même du monde. 

Cependant, durant l'Ère des Cendres, l'Ombre tenta de briser cette chaîne. Elle n'y parvint qu'en partie, dispersant sept de ses maillons à travers le continent. Les légendes disent que celui qui parviendra à réunir ces maillons pourra commander aux éléments eux-mêmes, mais qu'il devra d'abord prouver qu'il est capable de porter le poids des vérités qu'ils contiennent.`
    },
    {
        title: "Le Chant de la Dame Muse",
        story: `Dans le Val Doré, on parle souvent de la Dame Muse, une entité qui n'est ni dieu ni mortelle. Elle n'apparaît qu'aux artistes et aux rêveurs à l'article de la mort. On dit que son chant est si pur qu'il peut faire refleurir un désert ou calmer la colère d'un dragon. 

La légende raconte qu'elle était autrefois une grande barde de l'Hégémonie d'Ashka qui refusa de voir sa cité brûler. Elle utilisa la magie interdite pour transformer son essence en une mélodie éternelle. Depuis, elle erre dans les brumes de la Côte des Orages, cherchant une voix capable de porter sa chanson finale, celle qui guérira définitivement les plaies d'Aethelgard.`
    },
    {
        title: "La Cité Engloutie d'Oria",
        story: `Bien avant que les Elfes ne s'installent dans la Sylve d'Émeraude, il y avait Oria, une cité construite entièrement de corail et de perles magiques au fond de ce qui est aujourd'hui l'Océan des Murmures. Les Oriens étaient des maîtres de l'eau et du temps, capables de ralentir le vieillissement de leur corps. 

Leur disparition reste le plus grand mystère archéologique. Certains disent qu'ils se sont retirés dans une bulle temporelle pour échapper à l'Hégémonie d'Ashka, d'autres qu'ils ont été dévorés par une abomination venue du Miroir des Ombres. Parfois, les marins affirment voir des lumières bleues briller sous les vagues durant les nuits sans lune, et entendent un bourdonnement basse fréquence qui semble appeler les audacieux à les rejoindre dans les profondeurs.`
    }
];

/**
 * PHASE 22.3: CULTURAL & LINGUISTIC EXPANSION
 * Details about the Aethelgardian society, calendar, and language.
 */
export const CULTURAL_LORE = {
    CALENDAR: {
        months: [
            { name: "Solaura", season: "Hiver", desc: "Le mois du lever du soleil, marqué par des aubes éblouissantes sur la neige." },
            { name: "Givrefeu", season: "Hiver", desc: "Le froid le plus intense, nommé d'après la lueur bleue de la glace sous la lune." },
            { name: "Éveil-Vert", season: "Printemps", desc: "Le moment où la Sylve d'Émeraude commence à bourgeonner." },
            { name: "Pluiedor", season: "Printemps", desc: "Pluies fertiles qui apportent les premières fleurs au Val Doré." },
            { name: "Zénith", season: "Été", desc: "Le mois le plus chaud, où Solarius est au plus haut dans le ciel." },
            { name: "Moissombre", season: "Été", desc: "Le début des récoltes, finissant par des nuits de plus en plus longues." },
            { name: "Rougefeuille", season: "Automne", desc: "Les forêts se teintent d'ambre et de pourpre." },
            { name: "Voile-Gris", season: "Automne", desc: "Mois des brumes intenses, où l'on dit que le Miroir des Ombres est plus proche." }
        ],
        daysPerMonth: 28,
        weeksPerMonth: 4
    },
    FESTIVALS: [
        {
            name: "Lumière de Solarius",
            month: "Zénith",
            desc: "Un festival de trois jours célébrant la victoire sur l'hiver. Les villes sont décorées de bannières dorées et de lanternes solaires."
        },
        {
            name: "Nuit du Voile",
            month: "Voile-Gris",
            desc: "Une célébration solennelle où l'on honore les ancêtres. Les habitants portent des masques pour 'tromper' les esprits malveillants."
        },
        {
            name: "Banquet des Braves",
            month: "Givrefeu",
            desc: "Un grand festin dans les tavernes pour combattre le froid et se raconter des exploits héroïques de l'année passée."
        }
    ],
    IDIOMS: [
        { expression: "Chercher le maillon d'or", meaning: "Poursuivre un but impossible ou divin." },
        { expression: "Avoir le regard de l'Archiviste", meaning: "Être distrait par des détails inutiles ou être perdu dans ses pensées." },
        { expression: "Vendre du soufre à un Dragon", meaning: "Essayer de tromper quelqu'un sur son propre domaine d'expertise." },
        { expression: "Froid comme le cœur de Givrefeu", meaning: "Désigne une personne sans émotion ou impitoyable." },
        { expression: "Danser sur le fil du Voile", meaning: "Prendre des risques inconsidérés." }
    ],
    LINGUISTICS: {
        archaic_ashkan: {
            name: "Ashkan Archaïque",
            desc: "La langue de l'ancien Empire. Complexe, tonale et gravée dans la pierre magique.",
            common_words: [
                { word: "Sol", meaning: "Lumière/Vie" },
                { word: "Vask", meaning: "Sang/Lignage" },
                { word: "Kael", meaning: "Connaissance/Pierre" },
                { word: "Aura", meaning: "Protection/Ciel" }
            ]
        }
    }
};

/**
 * PHASE 22.4: LEGENDARY WORLD BOSSES & SECRET LOCATIONS
 * Ultimate challenges and hidden planes for high-level characters (20+).
 */
export const LEGENDARY_WORLD_BOSSES = {
    "Malakor": {
        name: "Malakor, l'Ancien du Vide",
        level: 30,
        type: "Entity of Chaos",
        stats: { hp: 5000, ac: 25, atk: 15 },
        desc: "Une entité faite d'ombre pure, dont la simple présence distord la réalité autour d'elle.",
        lore: "Ancien général de l'Hégémonie d'Ashka qui a fusionné avec le Miroir des Ombres pour échapper à la mort. Il attend patiemment dans la faille que quelqu'un ouvre une porte.",
        abilities: [
            { name: "Siphon d'Âme", desc: "Draine 100 PV à tous les joueurs et soigne Malakor." },
            { name: "Distorsion Temporelle", desc: "Force tous les joueurs à rejouer leur dernier tour mais avec un Désavantage permanent." }
        ]
    },
    "Ignis": {
        name: "Ignis Rex, l'Origine des Cendres",
        level: 30,
        type: "Dragon Primordial",
        stats: { hp: 8000, ac: 28, atk: 18 },
        desc: "Le plus ancien des dragons rouges, fils de la flamme éternelle.",
        lore: "Il dort au cœur du Pilier de Cendres. Sa respiration provoque des tremblements de terre à travers tout le continent.",
        abilities: [
            { name: "Supernova", desc: "Explosion massive infligeant 500 dégâts de feu (Jet de sauvegarde impossible)." },
            { name: "Regard Solaire", desc: "Pétrifie instantanément toute créature qui le regarde dans les yeux." }
        ]
    }
};

export const HIDDEN_REALITIES = [
    {
        name: "Le Plan de Cristal",
        requirement: "Posséder un éclat du Maillon d'Or",
        desc: "Une dimension où tout est fait de lumière solide. Le temps y coule différemment.",
        lore: "C'est ici que les Sept Héros se seraient retirés après avoir scellé l'Ombre."
    },
    {
        name: "La Faille du Néant",
        requirement: "Niveau 25 minimum",
        desc: "Un espace entre les mondes, rempli de débris de civilisations oubliées.",
        lore: "On dit que c'est là que l'Hégémonie d'Ashka a caché ses plus grands trésors magiques avant la chute."
    },
    {
        name: "L'Archipel Astrale",
        requirement: "Capacité de Vol Planétaire",
        desc: "Des îles flottant dans une mer d'étoiles au-dessus de l'atmosphère d'Aethelgard.",
        lore: "Le lieu de résidence des Gardiens de la Lumière."
    }
];

/**
 * NPC TEMPLATES
 * Ready-to-use NPCs the GM can deploy in any scene.
 */
export const NPC_TEMPLATES = {
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

/**
 * IMPORTANT NPCS FLAT MAP
 * Flattens NPC_TEMPLATES for easy O(1) lookup by name.
 */
export const IMPORTANT_NPCS = Object.values(NPC_TEMPLATES).flat().reduce((acc, npc) => {
    acc[npc.name] = npc;
    return acc;
}, {});

/**
 * QUEST HOOKS BY REGION
 * Adventure seeds the GM can deploy based on where the players are.
 */
export const QUEST_HOOKS = {
    val_dore: [
        { title: "Le Vin Empoisonné", level: "1-3", type: "Enquête", desc: "Plusieurs nobles sont tombés malades après un banquet. Le vin provenait d'un vignoble réputé. Accident, incompétence, ou tentative d'assassinat ?" },
        { title: "Les Rats de la Crypte", level: "1-3", type: "Exploration", desc: "Les rats géants qui infestent la crypte sous la cathédrale sont inhabituellement organisés. Quelque chose les dirige." },
        { title: "Le Tournoi du Roi", level: "3-5", type: "Compétition", desc: "Le tournoi annuel de Sol-Aureus offre gloire et un prix de 500 Or. Mais un des concurrents triche — avec de la magie interdite." },
        { title: "L'Héritier Disparu", level: "4-7", type: "Escorte", desc: "Le fils cadet de la Reine Elara a disparu. Retrouvez-le avant que les rumeurs ne provoquent une crise politique." },
        { title: "Les Yeux dans les Murs", level: "5-8", type: "Horreur", desc: "Des habitants de la vieille ville rapportent que les portraits de famille bougent la nuit. Puis les gens commencent à disparaître." },
        { title: "Le Procès du Siècle", level: "6-9", type: "Intrigue", desc: "Un célèbre mage est accusé de meurtre. Il clame être innocent et offre sa fortune à quiconque le prouvera. Les preuves sont accablantes — presque trop." },
        { title: "La Conspiration de Cristal", level: "8-12", type: "Politique", desc: "Des agents du Cercle des Cendres ont infiltré le conseil royal. Démêlez les loyautés sans provoquer une guerre civile." }
    ],
    cote_des_orages: [
        { title: "Le Festin du Jarl", level: "1-3", type: "Social", desc: "Le Jarl de Kuldahar invite des étrangers à son festin. C'est un test : il évalue les futurs mercenaires pour une mission secrète." },
        { title: "La Bête du Fjord", level: "2-5", type: "Chasse", desc: "Un monstre marin dévore les bateaux de pêche. Les pêcheurs ne sortent plus. Le village va mourir de faim." },
        { title: "Le Passage de Glace", level: "4-6", type: "Exploration", desc: "Un col gelé, réputé impraticable, s'est mystérieusement ouvert. Qu'est-ce qui a fait fondre la glace ?" },
        { title: "Le Dernier Géant", level: "6-9", type: "Diplomatie", desc: "Un Géant des Tempêtes blessé s'est effondré près d'un village. Il parle d'une guerre entre géants dans les cimes." },
        { title: "Le Marcheur Blanc", level: "8-12", type: "Boss", desc: "La légende du Marcheur Blanc est réelle. Une entité de glace décime les voyageurs. Trouvez sa source et détruisez-la." },
        { title: "Le Dragon de Cristal", level: "15-20", type: "Épique", desc: "Le dragon sous Kuldahar a ouvert un œil. Les tremblements s'intensifient. Le Jarl supplie l'aide des héros." }
    ],
    monts_coeur_de_fer: [
        { title: "Le Niveau Perdu", level: "3-5", type: "Exploration", desc: "Le niveau 16 de Hammerdeep n'existe pas officiellement. Mais des bruits viennent d'en dessous." },
        { title: "La Grève des Guildes", level: "2-4", type: "Social", desc: "Les mineurs refusent de travailler. Ils ont trouvé quelque chose dans la veine principale et exigent une prime de risque." },
        { title: "Le Golem Libre", level: "5-8", type: "Chasse", desc: "Un golem de pierre s'est libéré de son maître et erre dans les tunnels. Capturez-le — ou détruisez-le." },
        { title: "L'Héritage de Rundar", level: "7-10", type: "Donjon", desc: "Le testament du roi nain Rundar indique un trésor caché dans un complexe piégé au niveau 13." },
        { title: "Les Ingénieurs Fous", level: "8-12", type: "Investigation", desc: "Des explosions retentissent dans les fonderies. Sabotage ? Ou est-ce que les nains ont découvert une technologie Ashkan dangereuse ?" }
    ],
    sylve_emeraude: [
        { title: "Les Arbres qui Saignent", level: "1-3", type: "Mystère", desc: "Une partie de la forêt meurt sans explication. La sève tourne noire et les animaux fuient." },
        { title: "Le Rite de Passage", level: "2-5", type: "Rituel", desc: "Pour gagner la confiance des Elfes, vous devez participer à un rite ancien impliquant la Source d'Émeraude." },
        { title: "L'Envahisseur Invisible", level: "4-7", type: "Traque", desc: "Quelqu'un vole les artefacts sacrés des Dryades. Aucune trace, aucun témoin. Le Mur de Ronces a été percé." },
        { title: "Le Chant Interdit", level: "6-9", type: "Horreur", desc: "Un chant mélodieux résonne la nuit dans la forêt. Ceux qui l'écoutent ne reviennent jamais." },
        { title: "Le Jugement du Conseil", level: "8-12", type: "Procès", desc: "Un humain est accusé d'avoir brûlé un bosquet sacré. Les Elfes veulent l'exécuter. L'homme jure qu'il a été possédé." }
    ],
    terres_brulees: [
        { title: "Les Pilleurs de Tombes", level: "1-3", type: "Exploration", desc: "Un groupe de pilleurs embauche des gardes du corps pour explorer une ruine Ashkan. Le contrat est simple, mais la ruine ne l'est pas." },
        { title: "L'Oasis Interdite", level: "3-5", type: "Survie", desc: "Une oasis apparemment paradisiaque au milieu du désert. Les voyageurs y entrent mais n'en ressortent jamais." },
        { title: "Le Seigneur de la Cendre", level: "5-8", type: "Boss", desc: "Un seigneur de guerre tieffelin contrôle le seul puits dans un rayon de 100km. Il extorque les caravanes. Libérez le puits." },
        { title: "La Faille Vivante", level: "8-12", type: "Épique", desc: "La Faille de l'Ombre s'élargit. Des démons mineurs commencent à en sortir. Trouvez un moyen de la sceller — ou de la traverser." },
        { title: "Le Trône d'Ashka", level: "12-18", type: "Donjon", desc: "Le palais impérial d'Ashka, enfoui sous la cendre, a été localisé. Ce qui dort à l'intérieur pourrait changer le cours de l'histoire." },
        { title: "L'Éveil du Primordial", level: "20+", type: "Apocalypse", desc: "L'Ombre, le Primordial oublié, tente de revenir. Les sceaux se brisent un à un. Le monde n'a que quelques jours." }
    ]
};

/**
 * TAVERNS, INNS & NAMED LOCATIONS
 * Flavor locations the GM can place in any town or region.
 */
export const TAVERNS_AND_LOCATIONS = {
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

/**
 * RUMORS & GOSSIP
 * Per-region hearsay for tavern scenes and social interactions.
 */
export const RUMORS_AND_GOSSIP = {
    val_dore: [
        { rumor: "La Reine Elara n'a pas été vue en public depuis trois semaines. Le conseil dit qu'elle est 'souffrante'.", truth: true, danger: "élevé" },
        { rumor: "Un dragon dort sous le Grand Jardin Arcanique. C'est pour ça que les plantes poussent si vite.", truth: false },
        { rumor: "La Main Noire recrute ouvertement dans les bas-fonds. Ils préparent quelque chose de gros.", truth: true, danger: "moyen" },
        { rumor: "Le prix du blé a doublé en un mois. Les récoltes pourrissent dans les champs — mais personne ne sait pourquoi.", truth: true, danger: "faible" },
        { rumor: "Un mage a été arrêté pour avoir vendu des sorts de charme aux nobles. On dit qu'il a ensorcelé la moitié du sénat.", truth: "partiellement" },
        { rumor: "Les canalisations sous la vieille ville cachent un réseau de passages secrets qui mènent jusqu'au palais.", truth: true, danger: "mortel" },
        { rumor: "Un enfant de la rue a été vu lancer des sorts sans avoir jamais étudié. La Guilde le cherche.", truth: true }
    ],
    cote_des_orages: [
        { rumor: "Le Marcheur Blanc a été vu à trois jours au nord. Les anciens disent que c'est un présage de guerre.", truth: true, danger: "élevé" },
        { rumor: "Les géants des cimes se battent entre eux. On entend les coups de tonnerre la nuit.", truth: true },
        { rumor: "Un navire nain a coulé avec une cargaison d'or pur. Il repose à 200 mètres de la côte.", truth: true, danger: "élevé" },
        { rumor: "Le Jarl projette d'envahir le Val Doré dès que le printemps arrivera.", truth: false },
        { rumor: "Un clan barbare a trouvé une arme ancienne dans les glaces. Une arme qui parle.", truth: true, danger: "très élevé" }
    ],
    monts_coeur_de_fer: [
        { rumor: "Les mineurs du niveau 12 ont creusé dans quelque chose de vivant. Ils ont rebouché immédiatement.", truth: true, danger: "inconnu" },
        { rumor: "L'Ascenseur de Cristal a des dysfonctionnements de plus en plus fréquents. Les ingénieurs sont inquiets.", truth: true },
        { rumor: "Un nain aurait trouvé un passage vers le plan élémentaire de la Terre. La Guilde a scellé le tunnel.", truth: true, danger: "moyen" },
        { rumor: "Goruk Dent-de-Fer est en réalité le dernier descendant du Roi Rundar. Il pourrait réclamer le trône.", truth: false },
        { rumor: "Des kobolds organisés ont été vus portant des armures de fabrication naine. Quelqu'un les arme.", truth: true, danger: "élevé" }
    ],
    sylve_emeraude: [
        { rumor: "L'Arbre-Monde junior est malade. Ses feuilles tombent alors que c'est le printemps.", truth: true, danger: "critique" },
        { rumor: "Une dryade a été assassinée. C'est la première fois en 500 ans. Le Conseil des Chênes est en fureur.", truth: true, danger: "élevé" },
        { rumor: "Un humain a été accepté dans le Cercle druidique. C'est sans précédent.", truth: true },
        { rumor: "Le Mur de Ronces faiblit à l'est. Quelque chose le ronge de l'intérieur.", truth: true, danger: "élevé" },
        { rumor: "Les dragons de cristal viennent pondre dans la Sylve tous les millénaires. Et le dernier millénaire touche à sa fin.", truth: "incertain" }
    ],
    terres_brulees: [
        { rumor: "Le Pilier de Cendres a recommencé à briller la nuit. Les anciens Ashkans tentent de revenir.", truth: true, danger: "apocalyptique" },
        { rumor: "Un seigneur de guerre a trouvé une cité volante Ashkan intacte, enterrée sous le sable.", truth: true, danger: "très élevé" },
        { rumor: "L'eau de la seule oasis de la région est devenue noire il y a une semaine. Personne n'ose y boire.", truth: true },
        { rumor: "Des tieffelins fuient les Terres Brûlées en masse. Ils ne disent pas pourquoi — ils ont juste peur.", truth: true, danger: "inconnu" },
        { rumor: "On peut entendre des voix dans la Faille de l'Ombre. Elles disent toutes la même chose : 'Libérez-nous.'", truth: true, danger: "mortel" }
    ]
};

/**
 * EXPANDED BESTIARY
 * Additional creatures for all CR ranges.
 */
export const BESTIARY_EXTENDED = {
    "Bandit": {
        name: "Bandit de Grand Chemin",
        type: "Humanoid",
        cr: "1/2",
        stats: { hp: 11, ac: 12, atk: 3 },
        desc: "Un homme désespéré armé d'une lame rouillée et d'un sourire sans joie.",
        lore: "Les routes d'Aethelgard sont infestées de bandits depuis l'Ère de la Reconstruction. Ce sont souvent d'anciens soldats démobilisés, des paysans ruinés ou des réfugiés des Terres Brûlées. Ils opèrent en groupes de 4 à 8, avec un chef qui prend la moitié du butin.",
        behavior: "Menace d'abord, attaque si résistance. Fuit si le chef tombe ou si le groupe semble trop fort.",
        behavior_type: "MELEE",
        actions: [
            { name: "Épée courte", desc: "Melee: +3 to hit, 1d6+1 dégâts tranchants.", range: 1.5 },
            { name: "Arc court", desc: "Ranged: +3 to hit, 1d6+1 dégâts perçants.", range: 10 }
        ]
    },
    "Araignée Géante": {
        name: "Araignée Tisseuse d'Ombre",
        type: "Beast (Monstrosity)",
        cr: "1",
        stats: { hp: 26, ac: 14, atk: 5 },
        desc: "Une araignée de la taille d'un cheval, ses yeux multiples brillant d'une lueur violette.",
        lore: "Les Araignées Tisseuses d'Ombre de la Sylve d'Émeraude sont le résultat d'une mutation magique. Leur toile absorbe la lumière, créant des zones de ténèbres impénétrables. Les Elfes les tolèrent car elles dévorent les parasites de la forêt, mais elles sont mortellement dangereuses pour les non-initiés.",
        behavior: "Tend des embuscades avec sa toile. Empoisonne puis enveloppe. Fuit la lumière vive.",
        behavior_type: "MELEE",
        actions: [
            { name: "Morsure", desc: "Melee: +5 to hit, 1d8+3 perçant + 2d6 poison (JS Con CD 11).", range: 1.5 },
            { name: "Toile (Recharge 5-6)", desc: "Ranged: +5, portée 6 cases. La cible est entravée (JS Force CD 12 pour se libérer).", range: 6 }
        ]
    },
    "Troll": {
        name: "Troll des Marais",
        type: "Giant",
        cr: "5",
        stats: { hp: 84, ac: 15, atk: 7 },
        desc: "Un monstre dégingandé couvert de mousse, dont la chair se referme à vue d'œil.",
        lore: "Les Trolls sont les cauchemars vivants des voyageurs. Leur capacité de régénération est si puissante qu'on a vu un troll recoudre sa propre tête après décapitation. Seuls le feu ou l'acide empêchent leur régénération. Ils nichent dans les marécages, les égouts et les caves abandonnées, se nourrissant de tout ce qui bouge.",
        behavior: "Attaque avec rage aveugle. Régénère 10 PV/tour sauf si touché par le feu ou l'acide. Ne fuit jamais.",
        behavior_type: "MELEE",
        actions: [
            { name: "Multiattaque", desc: "Fait trois attaques : une morsure et deux griffes.", range: 1.5 },
            { name: "Morsure", desc: "Melee: +7 to hit, 1d6+4 perçant.", range: 1.5 },
            { name: "Griffes", desc: "Melee: +7 to hit, 2d6+4 tranchant.", range: 1.5 }
        ]
    },
    "Mimic": {
        name: "Mimic (Coffre Vivant)",
        type: "Monstrosity (Shapechanger)",
        cr: "2",
        stats: { hp: 58, ac: 12, atk: 5 },
        desc: "Un coffre au trésor aux dents acérées et à la langue gluante.",
        lore: "Créatures arcaniques créées par les mages Ashkan comme pièges de sécurité pour leurs trésors. Après la chute de l'Empire, les mimics se sont échappés et reproduits. Ils prennent la forme d'objets ordinaires — coffres, portes, chaises — et attaquent quiconque les touche. Leur colle digestive est si puissante qu'elle peut dissoudre le métal en quelques heures.",
        behavior: "Immobile jusqu'à ce qu'on le touche. Colle sa cible puis la dévore lentement.",
        behavior_type: "MELEE",
        actions: [
            { name: "Pseudopode", desc: "Melee: +5 to hit, 1d8+3 contondant. La cible est collée (JS For CD 13).", range: 1.5 },
            { name: "Morsure", desc: "Melee: +5 to hit, 1d8+3 perçant + 1d8 acide.", range: 1.5 }
        ]
    },
    "Golem de Pierre": {
        name: "Golem Gardien Ashkan",
        type: "Construct",
        cr: "4",
        stats: { hp: 85, ac: 17, atk: 7 },
        desc: "Une statue massive qui s'anime avec des yeux de braise. Des runes pulsent sur sa poitrine.",
        lore: "Vestiges de l'Hégémonie d'Ashka, ces golems gardent encore les ruines de leurs anciens maîtres. Leur conscience est liée à une rune-cœur dans leur poitrine ; détruire cette rune les désactive immédiatement. Ils ne font pas de distinction entre ami et ennemi — ils protègent leur zone.",
        behavior: "Patrouille son secteur. Attaque tout intrus. Immunisé au poison et aux conditions mentales.",
        behavior_type: "MELEE",
        actions: [
            { name: "Poing de Pierre", desc: "Melee: +7 to hit, 2d10+4 contondant.", range: 1.5 },
            { name: "Piétinement", desc: "Quand un ennemi tombe à terre, le golem écrase automatiquement pour 3d6 dégâts.", range: 1.5 }
        ]
    },
    "Wyvern": {
        name: "Wyvern des Pics",
        type: "Dragon",
        cr: "6",
        stats: { hp: 110, ac: 13, atk: 7 },
        desc: "Un cousin sauvage et stupide des dragons, avec un dard empoisonné mortel.",
        lore: "Les wyverns nichent dans les pics des Monts Cœur-de-Fer et la Côte des Orages. Contrairement aux dragons, elles sont dénuées d'intelligence et chassent par instinct pur. Leur venin est si recherché par les alchimistes que la Guilde des Arcanes offre 100 pièces d'or pour un flacon intact.",
        behavior: "Plonge depuis le ciel. Utilise son dard empoisonné. Emporte les proies petites dans les airs.",
        behavior_type: "MELEE",
        actions: [
            { name: "Multiattaque", desc: "Fait deux attaques : une morsure et un dard.", range: 2 },
            { name: "Morsure", desc: "Melee: +7 to hit, 2d6+4 perçant.", range: 2 },
            { name: "Dard", desc: "Melee: +7 to hit, 1d6+4 perçant + 7d6 poison (JS Con CD 15 demi).", range: 2 }
        ]
    },
    "Liche": {
        name: "Liche Mineure d'Ashka",
        type: "Undead (Spellcaster)",
        cr: "8",
        stats: { hp: 135, ac: 17, atk: 8 },
        desc: "Un cadavre desséché en robes anciennes, dont les orbites brûlent d'un feu vert.",
        lore: "Ce sont des mages Ashkan qui ont sacrifié leur humanité pour survivre à la chute de l'Empire. Inférieures aux véritables liches, elles restent des menaces mortelles, capables de lancer des sorts dévastateurs et de lever des armées de morts-vivants. Leur phylactère est souvent un objet insignifiant — une bague, un dé, une clé.",
        behavior: "Lance des sorts à distance. Si menacée, lève des squelettes. Ne fuit que si son phylactère est en danger.",
        behavior_type: "RANGED",
        actions: [
            { name: "Rayon Nécrotique", desc: "Ranged: +8 to hit, 4d8 nécrotique (Portée: 12).", range: 12 },
            { name: "Paralysie", desc: "La cible doit réussir JS Sagesse CD 16 ou être paralysée pendant 1 tour.", range: 6 },
            { name: "Lever les Morts", desc: "Invoque 1d4 squelettes. Utilisable 2 fois par combat.", range: 4 }
        ]
    },
    "Élémental de Feu": {
        name: "Élémental de Feu Mineur",
        type: "Elemental",
        cr: "5",
        stats: { hp: 102, ac: 13, atk: 6 },
        desc: "Une colonne de flammes vivantes en forme vaguement humanoïde.",
        lore: "Les élémentaux de feu sont attirés par les zones de forte concentration magique, particulièrement dans les Terres Brûlées. Ils ne sont pas malveillants par nature, mais leur simple présence enflamme tout ce qui les entoure. Certains mages parviennent à les lier temporairement comme gardiens.",
        behavior: "Se déplace vers les sources de chaleur. Enflamme tout sur son passage. Vulnérable à l'eau.",
        behavior_type: "MELEE",
        actions: [
            { name: "Toucher Brûlant", desc: "Melee: +6 to hit, 2d6+3 feu. Enflamme les objets non portés.", range: 1.5 },
            { name: "Vague de Chaleur", desc: "Tous dans un rayon de 2 cases : 3d6 feu (JS Dex CD 14 demi).", range: 2 }
        ]
    },
    "Vampire Mineur": {
        name: "Rejeton Vampirique",
        type: "Undead",
        cr: "5",
        stats: { hp: 82, ac: 15, atk: 6 },
        desc: "Un prédateur nocturne aux yeux rouges. Élégant et mortellement séduisant.",
        lore: "Les rejetons vampiriques sont les serviteurs créés par les vrais Vampires Seigneurs. Contraints à obéir à leur créateur, ils opèrent souvent comme espions ou assassins dans les villes. Ils conservent leur apparence de vie et peuvent se mêler à la population. Seuls le soleil, l'eau bénite et les pieux de bois blanc de Sylmanir les détruisent définitivement.",
        behavior: "Charme sa cible avant d'attaquer. Fuit le soleil et les symboles sacrés.",
        behavior_type: "MELEE",
        actions: [
            { name: "Griffes", desc: "Melee: +6 to hit, 2d4+3 tranchant.", range: 1.5 },
            { name: "Morsure (1/tour)", desc: "Melee: +6 to hit, 1d6+3 perçant + 3d6 nécrotique. Soigne le vampire de la moitié des dégâts nécrotiques infligés.", range: 1.5 },
            { name: "Charme (1/jour)", desc: "JS Sagesse CD 14 ou la cible est charmée pour 24h.", range: 4 }
        ]
    },
    "Béhémoth de Pierre": {
        name: "Béhémoth Terrestre",
        type: "Monstrosity (Titan)",
        cr: "12",
        stats: { hp: 250, ac: 18, atk: 10 },
        desc: "Une montagne vivante. Ses pas font trembler la terre à des kilomètres.",
        lore: "On ne sait pas si les Béhémoths sont des créatures naturelles ou des reliques de la création de Solarius. Ce qui est certain, c'est qu'ils sont pratiquement invulnérables et que leur simple passage remodèle le paysage. Ils n'attaquent que s'ils sont provoqués ou si quelqu'un piétine leur territoire — le problème étant que leur territoire est immense et invisible.",
        behavior: "Lent mais dévastateur. Écrase tout sur son passage. Vulnérable à la magie élémentaire.",
        behavior_type: "MELEE",
        actions: [
            { name: "Écrasement", desc: "Melee: +10 to hit, 4d12+6 contondant. La cible est aplatie (à terre).", range: 3 },
            { name: "Tremblement de Terre", desc: "Tous dans un rayon de 6 cases : JS Dex CD 18 ou mis à terre + 4d8 contondant.", range: 6 },
            { name: "Rugissement Tectonique", desc: "Cône de 10 cases. JS Con CD 17 ou étourdi pendant 1 tour.", range: 10 }
        ]
    },
    "Marcheur Blanc": {
        name: "Le Marcheur Blanc",
        type: "Undead (Legendary)",
        cr: "15 (BOSS)",
        stats: { hp: 300, ac: 20, atk: 12 },
        desc: "Une entité de glace et de mort. L'air gèle sur son passage. Son regard vide semble contenir l'éternité.",
        lore: "Le Marcheur Blanc est la légende la plus terrifiante de la Côte des Orages. C'est l'esprit vengeur d'un ancien Jarl trahi par ses propres fils lors de l'Ère des Cendres. Condamné à errer entre la vie et la mort, il cherche à envelopper le monde entier dans un hiver éternel. Ses armées de givre grandissent à chaque village qu'il traverse.",
        behavior: "Marche lentement mais inexorablement. Gèle tout dans un rayon de 10 cases. Les morts se relèvent sous son contrôle.",
        behavior_type: "MELEE",
        actions: [
            { name: "Lame de Givre", desc: "Melee: +12 to hit, 3d10+6 froid + 2d8 nécrotique.", range: 2 },
            { name: "Souffle de l'Hiver Éternel", desc: "Cône 8 cases. 8d8 froid (JS Con CD 18 demi). Les créatures tuées se relèvent comme zombies de glace.", range: 8 },
            { name: "Aura de Mort", desc: "Passif : Toutes les créatures commençant leur tour à 3 cases subissent 2d6 froid.", range: 3 },
            { name: "Lever les Morts de Glace (Recharge 5-6)", desc: "Invoque 2d4 squelettes de glace (AC 14, HP 20, attaque de givre 1d8+3).", range: 6 }
        ]
    }
};

/**
 * EXTENDED WORLD MYTHS & LEGENDS
 */
export const WORLD_MYTHS_EXTENDED = [
    {
        title: "Le Marteau de Thundrak",
        story: "On raconte que le premier Roi des Nains, Thundrak Barbe-de-Fer, forgea un marteau capable de fêler la réalité elle-même. Avec cet outil, il sculpta les quinze niveaux de Hammerdeep en une seule journée. Avant de mourir, il cacha le marteau dans une chambre forte dont la serrure ne s'ouvre qu'avec le sang d'un nain de sang royal. Depuis, chaque roi nain a tenté de le retrouver — et chacun a échoué."
    },
    {
        title: "Le Pacte des Sept",
        story: "Les sept héros qui scellèrent la Faille de l'Ombre n'étaient pas tous des saints. On murmure que le septième, un mage dont le nom a été effacé de l'histoire, ne scella pas la faille par héroïsme mais par ambition. Il y aurait caché une partie de son âme, attendant le jour où quelqu'un briserait le sceau pour qu'il puisse renaître, plus puissant que jamais."
    },
    {
        title: "Les Larmes de Lunara",
        story: "Quand Lunara la Gardienne vit les ravages de l'Ère des Cendres, elle pleura sept larmes d'argent pur. Chaque larme tomba dans un lieu différent d'Aethelgard et se transforma en une source de pouvoir. On dit que boire l'eau d'une Source de Lunara accorde un souhait, mais que le prix à payer est toujours plus élevé que ce qu'on imagine."
    },
    {
        title: "Le Dernier Vol d'Ashka",
        story: "La nuit où l'Empire tomba, la dernière cité volante d'Ashka — Solanthis — tenta de s'échapper vers les étoiles. Mais le poids des péchés de l'Empire était trop lourd, et la cité s'écrasa dans les sables du désert. On dit qu'elle est toujours là, quelque part sous les dunes, intacte, avec tous ses trésors et tous ses fantômes."
    },
    {
        title: "Le Chien à Trois Têtes",
        story: "Les habitants de la Côte des Orages parlent d'un chien géant à trois têtes qui garde l'entrée du monde souterrain. Chaque tête a une fonction : l'une voit le passé, l'autre le présent, et la dernière l'avenir. Celui qui parvient à endormir les trois têtes simultanément peut passer dans le royaume des morts — et peut-être en ramener quelqu'un."
    },
    {
        title: "La Danse des Aurores",
        story: "Une fois par siècle, les aurores boréales au-dessus de Kuldahar forment une danse si complexe qu'elle ressemble à un langage. Les chamans du Nord prétendent que ce sont les dieux qui communiquent entre eux pour décider du sort du monde. La dernière Danse des Aurores est prévue pour cette année."
    },
    {
        title: "L'Arbre-Monde Originel",
        story: "Avant la Sylve d'Émeraude, il y avait un arbre si grand que ses racines touchaient le centre du monde et ses branches effleuraient les étoiles. C'est l'Arbre-Monde Originel, Ygg'dara. On dit qu'il n'a pas été détruit — il a simplement cessé d'être visible. Ses racines courent toujours sous le sol, et quiconque en trouve une peut communiquer avec l'esprit de la planète elle-même."
    }
];

/**
 * LEGENDARY ITEMS & ARTIFACTS
 * Unique items with deep lore that the GM can use as quest rewards or plot devices.
 */
export const LEGENDARY_ITEMS = [
    {
        name: "Lame de l'Aube (Solaris)",
        type: "Épée longue",
        rarity: "Légendaire",
        stats: { atk: 8, bonus: "+3d8 radiant contre les morts-vivants" },
        lore: "Forgée par Sir Valerius le Pieux avec un fragment de lumière de Solarius. La lame brille d'une lueur dorée perpétuelle et ne peut être maniée que par ceux dont le cœur est pur. Quiconque la touche avec des intentions mauvaises subit 4d6 dégâts radiants.",
        quest_hook: "La lame est perdue depuis la bataille du col de Rougemont. Des indices la situent dans la crypte d'un ancien temple."
    },
    {
        name: "L'Œil d'Ashka",
        type: "Gemme (Focus arcanique)",
        rarity: "Artefact",
        stats: { int: 5, bonus: "Permet de déchirer le Voile de Cristal pendant 1 minute" },
        lore: "Un fragment de la gemme qui contrôlait les portails de l'Hégémonie d'Ashka. Elle pulse d'une énergie violette et semble murmurer dans une langue oubliée. Son utilisation est extrêmement dangereuse — chaque activation attire l'attention des entités du Miroir des Ombres.",
        quest_hook: "Le Cercle des Cendres en possède trois fragments. Les deux autres sont perdus."
    },
    {
        name: "Le Carquois de l'Atlas",
        type: "Carquois magique",
        rarity: "Très rare",
        stats: { bonus: "Génère une flèche magique par tour. Les flèches ne peuvent pas manquer leur cible." },
        lore: "Tisé par les Elfes de guerre de l'ancienne Sylmanir, ce carquois contient une dimension de poche remplie de lumière stellaire. Chaque flèche qu'il produit est unique et se dissout après l'impact.",
        quest_hook: "Caché dans l'Œil de la Forêt, gardé par un esprit elfe qui pose trois épreuves."
    },
    {
        name: "Le Bouclier du Bastion",
        type: "Bouclier lourd",
        rarity: "Légendaire",
        stats: { ac: 5, bonus: "Réflexion : renvoie 50% des dégâts magiques au lanceur" },
        lore: "Ce bouclier a été forgé à partir du fragment d'un golem Ashkan reprogrammé pour protéger au lieu de détruire. Les runes à sa surface absorbent l'énergie magique et la retournent. Il est indestructible par des moyens non-divins.",
        quest_hook: "Enterré dans la Forge de Givre à Kuldahar, sous une couche de glace éternelle."
    },
    {
        name: "La Harpe du Silence",
        type: "Instrument (Focus bardique)",
        rarity: "Artefact",
        stats: { cha: 5, bonus: "Les sorts du porteur ne peuvent pas être contrecarrés" },
        lore: "Cet instrument ne produit aucun son audible. Au lieu de cela, il joue directement dans l'âme de ceux qui l'entendent, contournant toute défense magique ou physique. On dit que c'est le dernier instrument de la Dame Muse, laissé pour celui qui achèvera son chant.",
        quest_hook: "Perdue dans la Cité Engloutie d'Oria, au fond de l'Océan des Murmures."
    },
    {
        name: "Les Gantelets de Thundrak",
        type: "Gantelets",
        rarity: "Très rare",
        stats: { str: 4, bonus: "Permet de forger des objets magiques sans forge. Les coups de poing infligent 2d8." },
        lore: "Une paire de gantelets en mithril créée par Thundrak en complément de son marteau. Ils conservent la chaleur du premier feu nain et permettent de travailler le métal à mains nues.",
        quest_hook: "Exposés dans le Caveau des Ancêtres à Hammerdeep, mais protégés par un piège ancestral."
    },
    {
        name: "L'Amulette du Voile",
        type: "Amulette",
        rarity: "Artefact",
        stats: { wis: 3, bonus: "Permet de voir les créatures invisibles et éthérées en permanence" },
        lore: "Portée par le dernier Grand Prêtre avant le Silence Divin. L'amulette est un fragment du Voile de Cristal cristallisé. Elle permet à son porteur de percevoir ce qui se cache entre les plans, mais cette vision constante peut mener à la folie.",
        quest_hook: "Le Prophète Sans Nom des Terres Brûlées sait où elle se trouve — mais il faut mériter sa réponse."
    },
    {
        name: "Le Manteau des Mille Ombres",
        type: "Cape",
        rarity: "Légendaire",
        stats: { dex: 3, bonus: "Invisibilité parfaite dans toute zone de lumière faible ou ténèbres" },
        lore: "Confectionné par la Matriarche des Ombres, fondatrice de la Main Noire. Ce manteau est tissé à partir de fils d'ombre pure, collectés dans le Miroir des Ombres. Il rend son porteur invisible — y compris pour la magie de divination.",
        quest_hook: "La Matriarche actuelle le porte. Le voler est considéré comme le plus grand défi de la guilde."
    },
    {
        name: "La Couronne de Givre",
        type: "Couronne",
        rarity: "Artefact",
        stats: { con: 4, bonus: "Immunité au froid. Contrôle la glace sur un rayon de 30 cases." },
        lore: "La couronne du premier Jarl de Kuldahar, façonnée à partir de la glace du Gouffre d'Ymir qui ne fond jamais. Son porteur peut commander les tempêtes de neige, geler les lacs instantanément et marcher sur la glace comme sur du sol ferme. Mais elle murmure des pensées de conquête à son porteur.",
        quest_hook: "Le Marcheur Blanc la porte. La récupérer nécessite de le vaincre."
    },
    {
        name: "Le Grimoire de Kaelen",
        type: "Livre (Focus arcanique)",
        rarity: "Artefact",
        stats: { int: 4, bonus: "Contient 3 sorts uniques non-apprenables autrement" },
        lore: "Kaelen le Sage était le plus grand érudit de l'Hégémonie d'Ashka. Son grimoire contient non seulement des sorts d'une puissance inouïe, mais aussi l'histoire complète et véridique de la chute de l'Empire — une vérité que beaucoup tueraient pour garder secrète.",
        quest_hook: "Caché dans la Bibliothèque Engloutie sous le lac de Sol-Aureus. Kaelith la Tisseuse le cherche."
    }
];

// Export new lore system functions
export { initializeLoreSystem, GlobalLoreRegistry, GlobalLoreSearch, getLoreStats } from './lore/index';
