/**
 * Random Encounters by Type
 * Extracted from lore.js - Random encounters for different scenarios
 */

export type RandomEncounterType = 'road' | 'wilderness' | 'social' | 'supernatural' | 'combat' | 'mystery';

export interface RandomEncounters {
  road: string[];
  wilderness: string[];
  social: string[];
  supernatural: string[];
  combat: string[];
  mystery: string[];
}

export const RANDOM_ENCOUNTERS: RandomEncounters = {
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
