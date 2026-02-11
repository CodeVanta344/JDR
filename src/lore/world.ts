export const WORLD_NAME = "Aethelgard";

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
