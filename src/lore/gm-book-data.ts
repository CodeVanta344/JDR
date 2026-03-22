/**
 * LIVRE DU MAÎTRE DU JEU - Aethelgard
 * Campagne complète structurée en 5 Actes, 25+ Scènes
 * Format : Texte à lire à voix haute + Notes MJ + Choix + Transitions
 */

import { ACT_1_EXTRA_CHAPTERS, ACT_2_EXTRA_CHAPTERS } from './gm-book-act1-2-expansion';
import { ACT_3_CHAPTERS } from './gm-book-act3';
import { ACT_4_CHAPTERS } from './gm-book-act4';
import { ACT_5_CHAPTERS } from './gm-book-act5';

// Wave 1 Expansion - Scene Expansions
import { ACT_1_SCENES_EXPANSION } from './gm-book-act1-scenes-expansion';
import { ACT_2_SCENES_EXPANSION } from './gm-book-act2-scenes-expansion';
import { ACT_3_EXPANSION_SCENES } from './gm-book-act3-scenes-expansion';
import { ACT_4_EXPANSION_SCENES } from './gm-book-act4-scenes-expansion';
import { ACT_5_EXPANSION_SCENES } from './gm-book-act5-scenes-expansion';

// Wave 1 Expansion - Dungeons
import { DUNGEON_CATACOMBES } from './dungeon-catacombes-solaureus';
import { DUNGEON_MINES } from './dungeon-mines-coeurfer';
import { DUNGEON_RACINES } from './dungeon-racines-yggdrasylve';
import { DUNGEON_TEMPLE } from './dungeon-temple-englouti';
import { DUNGEON_NEXUS } from './dungeon-nexus-sceaux';

// ============================================================================
// TYPES
// ============================================================================

export interface ReadAloudText {
  text: string;
  mood?: string;
  music?: string;
}

export interface GMNote {
  type: 'info' | 'warning' | 'secret' | 'tip' | 'lore';
  text: string;
}

export interface SceneNPC {
  name: string;
  role: string;
  personality: string;
  appearance: string;
  secret?: string;
  dialogues: {
    greeting: string;
    info: string;
    quest?: string;
    farewell: string;
  };
  stats?: { hp: number; atk: number; ac: number };
}

export interface SceneChoice {
  id: string;
  prompt: string;
  options: Array<{
    label: string;
    description: string;
    consequence: string;
    nextScene?: string;
    skillCheck?: { skill: string; dc: number; success: string; failure: string };
    reputationChange?: Array<{ faction: string; amount: number }>;
  }>;
}

export interface SceneEncounter {
  name: string;
  enemies: Array<{ name: string; hp: number; atk: number; ac: number; cr: number; abilities?: string[] }>;
  terrain: string[];
  tactics: string;
  loot: string[];
}

export interface BookScene {
  id: string;
  sceneNumber: number;
  title: string;
  type: 'narration' | 'exploration' | 'combat' | 'social' | 'choice' | 'transition' | 'revelation' | 'rest';
  location: string;
  locationId: string;
  estimatedMinutes: number;
  readAloud: ReadAloudText;
  gmNotes: GMNote[];
  npcs?: SceneNPC[];
  choices?: SceneChoice[];
  encounter?: SceneEncounter;
  skillChecks?: Array<{ skill: string; dc: number; success: string; failure: string }>;
  loot?: string[];
  nextScenes: string[]; // IDs possibles
  previousScene?: string;
  mapMovement?: { from: string; to: string; path?: string[] };
}

export interface BookChapter {
  id: string;
  actNumber: number;
  chapterNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  levelRange: string;
  themes: string[];
  scenes: BookScene[];
  chapterIntro: ReadAloudText;
  chapterConclusion: ReadAloudText;
  rewards: { xp: number; gold: string; items?: string[] };
}

export interface BookAct {
  id: string;
  actNumber: number;
  title: string;
  subtitle: string;
  synopsis: string;
  levelRange: string;
  themes: string[];
  chapters: BookChapter[];
  actIntro: ReadAloudText;
}

export interface GMBook {
  title: string;
  subtitle: string;
  version: string;
  introduction: ReadAloudText;
  worldPrimer: string;
  acts: BookAct[];
  appendices: {
    randomTables: Record<string, string[]>;
    quickNPCs: SceneNPC[];
    ambiances: string[];
    rumors: string[];
    complications: string[];
  };
}

// ============================================================================
// APPENDICES - TABLES ALÉATOIRES & OUTILS MJ
// ============================================================================

const RANDOM_RUMORS: string[] = [
  "On dit que les mines de Hammerdeep ont percé quelque chose... quelque chose qui ne devrait pas être dérangé.",
  "Le Haut-Prêtre Valerius aurait des visions de plus en plus sombres. Il ne dort plus depuis des semaines.",
  "Des marchands ont vu des lumières dans les Terres Brûlées. Pas des feux de camp - des colonnes de lumière verte.",
  "La Guilde des Arcanes a interdit l'accès au troisième sous-sol de la Tour. Personne ne sait pourquoi.",
  "L'Ombre, le chef du Syndicat, cherche quelqu'un. Pas pour le tuer - pour le protéger. Étrange, non ?",
  "Les elfes de la Sylve ont fermé leurs frontières. Même les marchands accrédités sont refoulés.",
  "Un dragon de cristal a été vu au-dessus des Monts Cœur-de-Fer. Premier aperçu en cinquante ans.",
  "La reine Elara a annulé le Tournoi de Solarius. Officiellement pour 'raisons budgétaires'. Personne n'y croit.",
  "Des pêcheurs de la Côte des Orages remontent des artefacts dans leurs filets. Des choses anciennes. Dangereuses.",
  "Le vieux cimetière de Sol-Aureus... les gardiens refusent d'y travailler la nuit. Ils disent entendre des coups sous la terre.",
  "Un groupe d'aventuriers est entré dans le Manoir Blackwood il y a un mois. Personne n'est ressorti.",
  "La Ligue des Marchands augmente ses prix de protection. Soit les routes deviennent plus dangereuses, soit ils deviennent plus gourmands.",
  "On raconte qu'un ancien Seau existe sous Sol-Aureus même. Dans les catacombes oubliées sous le Grand Temple.",
  "Les nains de Forgefer refusent de vendre certains minerais. Ils parlent d'un 'métal qui chante' trouvé dans les profondeurs.",
  "Un barde aveugle parcourt les tavernes du Val Doré. Il chante toujours la même chanson - un avertissement en ashkan archaïque.",
  "Les récoltes dans le Val Doré sont exceptionnelles cette année. Trop exceptionnelles. Les druides sont inquiets.",
  "Quelqu'un grave des yeux ouverts sur les murs de chaque ville. Toujours le même symbole. Toujours la nuit.",
  "Le pont vers les Terres Gelées s'est effondré. Accident naturel, disent les ingénieurs. Les soldats ne sont pas d'accord.",
  "Un enfant de Sol-Aureus parle dans son sommeil en ashkan archaïque. Il n'a jamais appris cette langue.",
  "Les Gardiens d'Émeraude ont planté de nouveaux arbres autour de l'Arbre-Monde. Des arbres-sentinelles. Ils se préparent à quelque chose.",
];

const RANDOM_COMPLICATIONS: string[] = [
  "Un PNJ allié est secrètement un espion du Cercle des Cendres.",
  "L'objet de quête est un piège - il libère une malédiction quand il est touché.",
  "Un rival aventurier poursuit le même objectif et arrive toujours un pas avant le groupe.",
  "Le donneur de quête a menti sur la récompense. Il n'a pas d'or - seulement une information cruciale.",
  "Un membre du groupe est reconnu comme 'l'Élu' par un culte local. Ils ne le laisseront pas partir.",
  "La route prévue est bloquée par un éboulement. Le détour passe par un territoire dangereux.",
  "L'ennemi principal s'avère être un parent/ancien ami d'un personnage joueur.",
  "Un allié puissant offre son aide... mais demande quelque chose de moralement douteux en retour.",
  "Le temps se détériore brutalement - tempête magique, les sorts fonctionnent de manière imprévisible.",
  "Un tiers parti intervient : ni ami ni ennemi, mais avec ses propres objectifs qui compliquent tout.",
  "L'objectif de la quête est vivant et supplie qu'on ne le rapporte pas au donneur de quête.",
  "Le village qui devait servir de refuge a été attaqué pendant l'absence du groupe.",
  "Un sort ou objet magique dysfonctionne au pire moment possible.",
  "Les gardes locaux ont un mandat d'arrêt contre un membre du groupe (à tort ou à raison).",
  "L'ennemi propose une trêve et des informations en échange de sa liberté.",
];

const RANDOM_AMBIANCES: string[] = [
  "Un silence pesant tombe sur la forêt. Même le vent retient son souffle. Puis, au loin, un hurlement de loup solitaire brise le silence comme du verre.",
  "La brume monte du sol en volutes paresseuses, transformant chaque arbre en silhouette menaçante. L'humidité colle à la peau comme une toile d'araignée.",
  "Le ciel se teinte d'un violet profond, strié de nuages couleur cuivre. L'air sent l'ozone et la terre mouillée. Un orage approche.",
  "Des lucioles dansent entre les branches basses, créant une constellation mouvante de lumières dorées. Le sous-bois ressemble à un ciel étoilé renversé.",
  "Le vent porte une odeur de fumée de bois et de pain frais. Quelque part devant, un village. La civilisation. Un répit.",
  "Les ombres s'allongent démesurément alors que le soleil disparaît derrière les montagnes. La température chute de dix degrés en quelques minutes.",
  "Le sol tremble imperceptiblement sous vos pieds - un rythme régulier, comme un cœur gigantesque battant dans les profondeurs de la terre.",
  "La pluie commence doucement, presque tendrement, avant de se transformer en un rideau d'eau impénétrable. Le monde disparaît à dix pas.",
  "Les étoiles brillent avec une intensité inhabituelle. Les constellations semblent... différentes. Comme si le ciel avait légèrement bougé pendant la nuit.",
  "L'air est si chaud qu'il ondule visiblement au-dessus du sol. Chaque respiration brûle la gorge. La sueur sèche avant même de couler.",
  "Un brouillard bas rampe le long du sol comme un être vivant, s'enroulant autour des chevilles. Au-dessus, le ciel est parfaitement dégagé.",
  "Le crépuscule baigne le paysage d'une lumière dorée irréelle. Pendant quelques minutes, tout semble fait d'or et de miel.",
  "La neige tombe en gros flocons silencieux, étouffant tous les sons. Le monde devient un tableau en noir et blanc.",
  "L'aube peint le ciel de rose et d'orange. Les oiseaux chantent, ignorants des dangers qui rôdent. La beauté du monde persiste malgré tout.",
  "La lune est rouge ce soir. Les anciens appellent ça la 'Lune du Chasseur'. Les prédateurs sont plus audacieux sous cette lumière sanglante.",
];

const QUICK_NPCS: SceneNPC[] = [
  {
    name: "Brok Mâchoire-de-Fer",
    role: "Tavernier / Informateur",
    personality: "Bourru mais loyal. Ancien mercenaire reconverti. Cache un cœur d'or sous une carapace rugueuse.",
    appearance: "Humain massif, la cinquantaine, bras comme des troncs d'arbre. Cicatrice qui part de l'oreille gauche au menton. Tablier de cuir taché de bière et de sauce.",
    secret: "Ancien membre du Syndicat de l'Ombre. A quitté après avoir refusé d'assassiner un enfant. L'Ombre le laisse tranquille... pour l'instant.",
    dialogues: {
      greeting: "« Entrez, asseyez-vous, commandez. Mais si vous cherchez des ennuis, la porte est derrière vous. »",
      info: "« J'entends des choses, oui. Les murs ont des oreilles dans cette ville, et les miennes sont plus grandes que la plupart. Qu'est-ce que vous voulez savoir ? »",
      quest: "« Y'a un problème dans ma cave. Non, pas des rats - quelque chose de plus gros. J'ai entendu des bruits de grattement. Ça vient d'en dessous. Bien en dessous. »",
      farewell: "« Revenez en un seul morceau. C'est mauvais pour les affaires quand mes clients meurent. »",
    },
    stats: { hp: 45, atk: 12, ac: 14 },
  },
  {
    name: "Élise Doigts-d'Argent",
    role: "Voleuse / Guide",
    personality: "Sarcastique, vive d'esprit, toujours un plan de secours. Loyale une fois la confiance gagnée.",
    appearance: "Demi-elfe, la trentaine, cheveux noirs coupés court. Yeux verts perçants. Vêtements sombres pratiques, au moins six poches visibles, probablement vingt cachées.",
    secret: "Fille illégitime d'un noble du Val Doré. N'a jamais réclamé son héritage. Préfère sa liberté à un titre.",
    dialogues: {
      greeting: "« Vous avez l'air de gens qui ont besoin de quelqu'un pour les empêcher de se faire tuer. Ça tombe bien, c'est ma spécialité. »",
      info: "« Information, c'est la monnaie la plus précieuse. Et contrairement à l'or, elle ne fait pas de bruit quand on marche. Combien vous offrez ? »",
      quest: "« Je connais un passage sous les murs. Personne d'autre ne le connaît. Mais ça va vous coûter plus que de l'or - j'ai besoin d'un service en retour. »",
      farewell: "« Si je ne suis pas au point de rendez-vous, partez sans moi. Ça voudra dire que je suis morte ou que j'ai trouvé mieux. Probablement les deux. »",
    },
    stats: { hp: 30, atk: 15, ac: 16 },
  },
  {
    name: "Frère Aldwin",
    role: "Prêtre de Solarius / Guérisseur",
    personality: "Doux, patient, mais d'une détermination inflexible face au mal. Cache un passé violent.",
    appearance: "Humain, la quarantaine, crâne rasé, robe blanche et dorée du clergé de Solarius. Mains couvertes de cicatrices de brûlure. Regard bienveillant mais hanté.",
    secret: "Ancien soldat qui a participé au massacre de Lisière. Porte sa culpabilité comme un fardeau. A rejoint Solarius pour expier.",
    dialogues: {
      greeting: "« Que la lumière de Solarius vous guide, voyageurs. Êtes-vous blessés ? Fatigués ? Le temple est ouvert à tous. »",
      info: "« Les ténèbres grandissent, amis. Je le sens dans mes prières - la lumière de Solarius faiblit. Pas en puissance, mais... en portée. Comme si quelque chose la bloquait. »",
      quest: "« Des fidèles disparaissent. Trois ce mois-ci. La Garde ne fait rien. Si vous avez du courage et de la compassion, j'aurais besoin de votre aide. »",
      farewell: "« Que Solarius veille sur vos pas. Et si la nuit vous semble trop sombre... souvenez-vous que l'aube vient toujours. »",
    },
    stats: { hp: 35, atk: 8, ac: 16 },
  },
  {
    name: "Grimjaw le Borgne",
    role: "Mercenaire / Rival potentiel",
    personality: "Arrogant, compétitif, mais respecte la force. Peut devenir allié ou ennemi selon les actions du groupe.",
    appearance: "Demi-orc, la trentaine, un œil couvert d'un bandeau de cuir. Armure de plaques cabossée mais bien entretenue. Grande hache dans le dos.",
    secret: "Cherche désespérément l'Œil d'Ashka - pas pour le pouvoir, mais parce qu'il croit que c'est le seul moyen de sauver son clan mourant.",
    dialogues: {
      greeting: "« Tiens, des aventuriers. Vous avez l'air presque compétents. Presque. »",
      info: "« Je traque quelque chose depuis des mois. Si nos chemins se croisent, soit on s'entraide, soit un de nous deux ne se relèvera pas. À vous de choisir. »",
      quest: "« J'ai besoin de bras forts et de cerveaux... enfin, au moins de bras forts. Il y a un contrat sur une créature dans les marais. Trop gros pour moi seul. On partage le butin ? »",
      farewell: "« La prochaine fois qu'on se voit, j'espère que ce sera comme alliés. Sinon... bonne chance. Vous en aurez besoin. »",
    },
    stats: { hp: 60, atk: 16, ac: 18 },
  },
  {
    name: "Maestra Selyne",
    role: "Archimage / Mentor mystérieux",
    personality: "Énigmatique, parle en métaphores, teste constamment les gens. Bienveillante mais manipulatrice.",
    appearance: "Elfe, apparence de 40 ans (vraiment 400+). Cheveux argentés, yeux violet profond. Robe de soie bleu nuit constellée d'étoiles qui bougent lentement.",
    secret: "Dernière survivante du Conseil des Sept qui a scellé les Anciens il y a 500 ans. Sent les sceaux faiblir.",
    dialogues: {
      greeting: "« Ah, vous voilà enfin. Non, nous ne nous sommes jamais rencontrés. Mais je vous attendais quand même. Le destin a parfois un sens de l'humour douteux. »",
      info: "« Ce que vous cherchez n'est pas ce dont vous avez besoin. Ce dont vous avez besoin n'est pas ce que vous trouverez. Mais ce que vous trouverez... changera tout. Cryptique ? Oui. Vrai ? Absolument. »",
      quest: "« Apportez-moi la pierre de lune du Sanctuaire des Murmures. Non, je ne vous dirai pas pourquoi. Oui, c'est dangereux. Considérez ça comme un examen d'entrée. »",
      farewell: "« Le fil du destin est tendu. Ne le coupez pas. Ne le tirez pas. Suivez-le simplement, et il vous mènera où vous devez être. Ou pas. Les fils ont la fâcheuse habitude de s'emmêler. »",
    },
    stats: { hp: 80, atk: 22, ac: 20 },
  },
];

// ============================================================================
// ACTE I - L'ÉVEIL DES OMBRES
// ============================================================================

const ACT_1: BookAct = {
  id: 'act-1',
  actNumber: 1,
  title: "L'Éveil des Ombres",
  subtitle: "Le monde bascule dans l'incertitude",
  synopsis: "Les personnages arrivent à Sol-Aureus, la capitale dorée d'Aethelgard. Ce qui commence comme une aventure banale dans une taverne se transforme rapidement en une spirale d'événements inquiétants : disparitions mystérieuses, sceaux anciens qui craquent, et des ombres qui murmurent des noms oubliés. L'Acte I pose les fondations de la campagne, présente le monde et ses factions, et lance les personnages sur le chemin du destin.",
  levelRange: "1-4",
  themes: ['découverte', 'mystère', 'choix moraux', 'alliances'],
  actIntro: {
    text: `Le monde d'Aethelgard respire encore, mais son souffle est devenu rauque.

Cent vingt ans ont passé depuis la chute de l'Hégémonie d'Ashka, l'empire de magie noire qui a régné par la terreur pendant quinze siècles. Les Terres Brûlées au sud témoignent encore de sa destruction - un désert de cendres et de verre fondu où rien ne pousse, où les fantômes de millions de morts hurlent quand le vent souffle du mauvais côté.

Mais le reste du monde se reconstruit. Sol-Aureus, la Cité Dorée, brille de nouveau. Les marchands commercent, les bardes chantent, les enfants jouent dans les rues pavées. Le roi Aldric III règne avec sagesse, l'Aube d'Argent veille, et la Guilde des Arcanes étudie la magie avec prudence et méthode.

En surface, tout va bien.

En dessous... les sceaux craquent.`,
    mood: "Mélancolie teintée d'espoir, tension sous-jacente",
    music: "Thème orchestral lent, cordes mineures avec notes de hautbois",
  },
  chapters: [
    // --- CHAPITRE 1 : SOL-AUREUS ---
    {
      id: 'ch-1-1',
      actNumber: 1,
      chapterNumber: 1,
      title: "La Cité Dorée",
      subtitle: "Bienvenue à Sol-Aureus",
      summary: "Les personnages arrivent à Sol-Aureus et découvrent la capitale. Ils s'installent au Sanglier Doré, rencontrent des PNJ clés, et entendent les premières rumeurs inquiétantes.",
      levelRange: "1-2",
      themes: ['exploration urbaine', 'contacts', 'rumeurs'],
      chapterIntro: {
        text: `Sol-Aureus se dévoile au détour de la colline comme un joyau posé dans un écrin de verdure. Les murailles de pierre blanche captent la lumière du soleil couchant et la renvoient en éclats dorés - c'est de là que la cité tire son nom.

Devant vous, la route pavée descend en courbe douce vers les Portes du Matin, l'entrée principale de la capitale. Une file de marchands, de pèlerins et de voyageurs attend patiemment son tour. Les gardes en tabard bleu et or vérifient les laissez-passer avec une efficacité bureaucratique.

Au loin, dominant la ville, trois structures se disputent le ciel : la Tour des Arcanes, spirale de cristal et de métal qui défie la géométrie ; le Grand Temple de Solarius, dôme doré massif d'où émanent des rayons de lumière même la nuit ; et le Palais Royal, forteresse élégante aux murs blancs et aux tours fines.

Bienvenue à Sol-Aureus, Cité Dorée, cœur battant d'Aethelgard.`,
        mood: "Émerveillement, fourmillement de vie",
        music: "Thème de cité médiévale, flûtes joyeuses, foule en fond",
      },
      scenes: [
        {
          id: 'scene-1-1-1',
          sceneNumber: 1,
          title: "Les Portes du Matin",
          type: 'narration',
          location: "Portes du Matin, Sol-Aureus",
          locationId: 'sol-aureus',
          estimatedMinutes: 15,
          readAloud: {
            text: `La file avance lentement. Devant vous, un marchand halfling se dispute avec un garde à propos de taxes sur les « fromages artisanaux » - l'odeur suggère que le terme « arme biologique » serait plus approprié.

Quand vient votre tour, un garde fatigué lève les yeux de son registre. C'est un homme trapu, la trentaine, avec une moustache qui a vu des jours meilleurs.

« Noms, origines, motif de la visite. Et si vous transportez des armes enchantées, déclarez-les maintenant ou la Guilde des Arcanes vous fera passer un mauvais quart d'heure. »

Il trempe sa plume dans l'encrier, prêt à écrire.`,
            mood: "Quotidien, léger humour, introduction douce",
            music: "Bruits de foule, chevaux, marchands",
          },
          gmNotes: [
            { type: 'info', text: "Cette scène permet aux joueurs de se présenter in-game. Laissez-les décrire leurs personnages et inventer leur raison d'être à Sol-Aureus." },
            { type: 'tip', text: "Le garde, Sergent Dorval, est un bon premier contact. Il peut donner des directions, recommander le Sanglier Doré comme auberge abordable, et mentionner que 'les temps sont bizarres ces derniers jours'." },
            { type: 'secret', text: "Si un joueur a un passé criminel ou est recherché, le garde pourrait reconnaître un visage sur un avis de recherche - tension immédiate mais gérable." },
            { type: 'lore', text: "Les Portes du Matin sont les plus anciennes de la ville, construites il y a 800 ans. Les pierres portent des runes de protection gravées par les premiers mages de la Guilde. Elles brillent faiblement la nuit." },
          ],
          npcs: [
            {
              name: "Sergent Dorval",
              role: "Garde des Portes",
              personality: "Fatigué mais professionnel. Humour sec. A vu trop de choses pour être impressionné.",
              appearance: "Trapu, moustache tombante, tabard bleu et or froissé. Encre sur les doigts.",
              secret: "Son fils a disparu il y a deux semaines. La Garde dit qu'il a 'déserté'. Dorval n'y croit pas.",
              dialogues: {
                greeting: "« Noms, origines, motif de la visite. Non, je ne veux pas entendre votre histoire de vie. »",
                info: "« Sol-Aureus est sûre. Enfin, relativement. Évitez le Quartier Bas la nuit, ne regardez pas les mages de la Tour dans les yeux, et pour l'amour de Solarius, ne touchez pas aux statues du Jardin du Roi. Elles mordent. Non, je ne plaisante pas. »",
                farewell: "« Bienvenue à Sol-Aureus. Essayez de ne rien casser. »",
              },
            },
          ],
          choices: [
            {
              id: 'choice-entry',
              prompt: "Comment les personnages entrent-ils dans la ville ?",
              options: [
                {
                  label: "Honnêtement",
                  description: "Déclarer identité et motif. Simple et direct.",
                  consequence: "Entrée sans problème. +1 réputation tacite avec la Garde Royale.",
                  nextScene: 'scene-1-1-2',
                },
                {
                  label: "En cachant quelque chose",
                  description: "Identité fictive ou motif inventé.",
                  consequence: "Jet de Tromperie CD 40. Succès : entrée discrète. Échec : le garde note le nom fictif - problèmes possibles plus tard.",
                  nextScene: 'scene-1-1-2',
                  skillCheck: { skill: 'Tromperie', dc: 40, success: "Le garde note sans sourciller. Vous êtes dans la place.", failure: "Le garde plisse les yeux. 'Mouais. Bienvenue.' Il fait signe à un collègue qui vous suit du regard." },
                },
                {
                  label: "Par un autre chemin",
                  description: "Chercher une entrée alternative (mur, égout, etc.)",
                  consequence: "Jet d'Athlétisme CD 50 ou Discrétion CD 45. Mène à une entrée par les toits ou les égouts - mais risque de rencontre dans les bas-fonds.",
                  nextScene: 'scene-1-1-2',
                  skillCheck: { skill: 'Discrétion', dc: 45, success: "Vous vous glissez dans la ville par un passage oublié. Vous débouchez dans le Quartier Bas.", failure: "Un garde de ronde vous repère. 'Hé ! Arrêtez-vous !' Course-poursuite dans les ruelles." },
                },
              ],
            },
          ],
          nextScenes: ['scene-1-1-2'],
          mapMovement: { from: 'road-south', to: 'sol-aureus' },
        },
        {
          id: 'scene-1-1-2',
          sceneNumber: 2,
          title: "Le Sanglier Doré",
          type: 'social',
          location: "Le Sanglier Doré, Quartier des Marchands",
          locationId: 'sol-aureus',
          estimatedMinutes: 25,
          readAloud: {
            text: `Le Sanglier Doré est exactement ce à quoi vous vous attendiez - et en même temps, pas du tout.

La façade est celle d'une taverne classique : enseigne en fer forgé représentant un sanglier couronné, fenêtres aux vitres épaisses d'où filtrent une lumière ambrée et des éclats de rire. Mais quand vous poussez la porte, c'est un mur de chaleur, de bruit et d'odeurs qui vous frappe.

La salle principale est vaste. Des poutres massives soutiennent un plafond noirci par des décennies de fumée de cheminée. Un feu crépite dans un âtre assez grand pour y rôtir un bœuf entier - et c'est exactement ce qui est en train de se passer. L'odeur de viande grillée, d'herbes et de pain frais vous fait saliver malgré vous.

Le comptoir en chêne massif est poli par des milliers de coudes. Derrière, un homme imposant - Brok, le tavernier - essuie un verre avec un torchon qui a probablement connu des jours meilleurs, il y a très longtemps.

La salle est pleine : marchands qui négocient dans les coins, soldats qui boivent bruyamment, un barde qui accorde son luth sur une petite scène, et dans l'ombre, des silhouettes qui observent sans être observées.

Brok lève les yeux, vous jauge en une seconde, et grogne :

« Vous voulez une table, une chambre, ou les deux ? Et ne touchez pas au ragoût du mardi - c'est du mardi d'il y a trois semaines. »`,
            mood: "Chaleureux mais vivant, mélange de confort et de tension sous-jacente",
            music: "Taverne médiévale, luth en fond, brouhaha, feu qui crépite",
          },
          gmNotes: [
            { type: 'info', text: "Le Sanglier Doré est le hub central de l'Acte I. Les joueurs y reviendront souvent. Prenez le temps de le rendre vivant et mémorable." },
            { type: 'tip', text: "Distribuez 2-3 rumeurs de la table aléatoire aux joueurs via les PNJ de la taverne. Au moins une doit mentionner les disparitions." },
            { type: 'warning', text: "Si les joueurs cherchent la bagarre, Brok est un ancien mercenaire (HP 45, ATK 12). Il ne se bat pas seul - quatre habitués sont des vétérans qui le soutiennent." },
            { type: 'secret', text: "Dans un coin sombre, un homme encapuchonné (Agent du Cercle des Cendres) observe les nouveaux arrivants. Il ne fera rien ce soir - il observe et rapporte." },
            { type: 'lore', text: "Le Sanglier Doré existe depuis 80 ans. Le premier propriétaire, Garth 'Groin-d'Or', a tué un sanglier géant qui terrorisait le quartier. La tête empaillée au-dessus de la cheminée est celle de la bête." },
          ],
          npcs: [
            {
              name: "Brok Mâchoire-de-Fer",
              role: "Tavernier",
              personality: "Bourru, protecteur, entend tout",
              appearance: "Humain massif, cicatrice à la mâchoire, tablier de cuir",
              secret: "Ancien membre du Syndicat de l'Ombre. Le quitter lui a coûté deux doigts de la main gauche.",
              dialogues: {
                greeting: "« Asseyez-vous. Première tournée à moitié prix pour les nouveaux. Après, c'est plein tarif. »",
                info: "« Des disparitions ? Ouais, j'en ai entendu parler. Le fils du Sergent Dorval, deux apprentis de la Guilde des Arcanes, et un prêtre du Temple. La Garde dit que c'est pas lié. Moi je dis que la Garde est aveugle. »",
                quest: "« Ma cave... Y'a un problème. Des bruits la nuit. Et hier matin, trois tonneaux de bière avaient disparu. Pas volés - l'escalier était barricadé de l'intérieur. Quelque chose vient d'en dessous. »",
                farewell: "« Vos chambres sont en haut. Évitez la 7 - le plancher grince et le fantôme de Garth aime pas être réveillé. Je plaisante. Peut-être. »",
              },
              stats: { hp: 45, atk: 12, ac: 14 },
            },
            {
              name: "Vieux Sam",
              role: "Informateur / Lanceur de quête",
              personality: "Nerveux, paranoïaque, mais sincère",
              appearance: "Humain âgé, vêtements usés mais propres. Mains qui tremblent. Yeux qui balaient constamment la salle.",
              secret: "A vu quelque chose dans les égouts - une porte ancienne qui n'existait pas avant. Avec des runes qui brillent.",
              dialogues: {
                greeting: "« Vous... vous êtes des aventuriers, hein ? Ça se voit. Vous avez cette... cette chose dans le regard. Approchez. Plus près. J'ai quelque chose à vous montrer. »",
                info: "« Trois semaines que ça dure. D'abord les rats sont partis. TOUS les rats. Puis les bruits ont commencé. Et puis... les gens ont disparu. Mais personne ne m'écoute. 'C'est le vieux Sam, il raconte des histoires.' Mais cette fois, c'est vrai. JE L'AI VU. »",
                quest: "« Dans les égouts, sous le Quartier du Temple. Il y a une porte. Une porte qui n'existait pas il y a un mois. Avec des runes... des runes comme celles de l'Ère d'Ashka. Je suis trop vieux pour y retourner. Mais vous... »",
                farewell: "« Faites attention là-dessous. Et si vous voyez une lumière verte... courez. COUREZ. »",
              },
            },
            {
              name: "Lyanna la Barde",
              role: "Barde itinérante / Source d'information",
              personality: "Charismatique, observatrice, collectionneuse d'histoires",
              appearance: "Demi-elfe, la vingtaine, cheveux roux, yeux noisette. Luth ouvragé avec des incrustations d'argent.",
              dialogues: {
                greeting: "« Des visages nouveaux ! Asseyez-vous, asseyez-vous. Je paie ma tournée en histoires - et les vôtres valent sûrement quelques verres. »",
                info: "« Je voyage beaucoup. Et partout, c'est la même chose : des gens nerveux, des nuits plus longues, et cette sensation... comme si le monde retenait son souffle avant un orage. La dernière fois que les bardes ont chanté ce genre d'ambiance, c'était avant la Guerre des Cendres. Mais c'est sûrement une coïncidence. »",
                farewell: "« Si vous faites quelque chose de mémorable, je le mettrai en chanson. Si vous mourez bêtement, aussi. La postérité ne fait pas de distinction. »",
              },
            },
          ],
          skillChecks: [
            { skill: 'Perception', dc: 35, success: "Vous remarquez l'homme encapuchonné dans le coin qui vous observe. Il détourne le regard quand vos yeux se croisent.", failure: "La taverne est bruyante et chaleureuse. Rien ne semble sortir de l'ordinaire." },
            { skill: 'Intuition', dc: 40, success: "Le Vieux Sam est sincèrement terrifié. Ce n'est pas un homme qui cherche l'attention - il a vu quelque chose qui l'a brisé.", failure: "Difficile de dire si Sam est un vieil homme sénile ou s'il dit la vérité." },
          ],
          choices: [
            {
              id: 'choice-tavern',
              prompt: "Que font les personnages au Sanglier Doré ?",
              options: [
                {
                  label: "Écouter les rumeurs",
                  description: "Se mêler aux conversations, acheter des verres, tendre l'oreille.",
                  consequence: "Obtenez 2-3 rumeurs. Jet de Persuasion CD 30 pour des infos plus précises sur les disparitions.",
                  nextScene: 'scene-1-1-3',
                },
                {
                  label: "Parler au Vieux Sam",
                  description: "S'approcher du vieil homme nerveux et écouter son histoire.",
                  consequence: "Sam révèle l'existence de la porte ancienne dans les égouts. Première piste concrète.",
                  nextScene: 'scene-1-1-3',
                },
                {
                  label: "Explorer la cave de Brok",
                  description: "Accepter la quête de Brok et descendre dans la cave.",
                  consequence: "Mini-donjon : cave -> tunnel oublié -> première rencontre avec des ombres mineures.",
                  nextScene: 'scene-1-1-cellar',
                },
                {
                  label: "Explorer la ville d'abord",
                  description: "Sortir et découvrir Sol-Aureus avant de s'engager.",
                  consequence: "Exploration libre : marché, temple, guilde, quartiers. Collecte d'indices et de contacts.",
                  nextScene: 'scene-1-1-city',
                },
              ],
            },
          ],
          nextScenes: ['scene-1-1-3', 'scene-1-1-cellar', 'scene-1-1-city'],
        },
        {
          id: 'scene-1-1-cellar',
          sceneNumber: 3,
          title: "Sous le Sanglier Doré",
          type: 'exploration',
          location: "Cave du Sanglier Doré",
          locationId: 'sol-aureus',
          estimatedMinutes: 30,
          readAloud: {
            text: `L'escalier de la cave grince sous vos pieds. L'odeur de bière renversée et de bois humide vous enveloppe. La lumière de votre torche danse sur des rangées de tonneaux, certains si vieux que les cerclages de fer ont rouillé jusqu'à devenir bruns.

Brok avait raison : trois tonneaux sont vides. Pas percés - vidés. Et il y a des traces humides sur le sol de pierre, comme si quelque chose de mouillé avait rampé entre les rangées.

Les traces mènent au fond de la cave, vers un mur de briques. Sauf que... le mur n'est plus tout à fait un mur. Les briques du bas ont été déplacées, révélant un trou noir d'où monte un courant d'air froid et une odeur de terre et de pierre ancienne.

Le trou est assez large pour qu'une personne s'y glisse. Au-delà, dans l'obscurité, vous entendez un bruit : tap... tap... tap... Régulier. Méthodique. Comme quelqu'un qui frappe sur de la pierre.`,
            mood: "Tension montante, claustrophobie naissante",
            music: "Silence, gouttes d'eau, écho lointain",
          },
          gmNotes: [
            { type: 'info', text: "Ce passage mène aux anciens tunnels sous Sol-Aureus, bien plus vieux que la ville. C'est la première exposition aux vestiges de l'Ère d'Ashka." },
            { type: 'warning', text: "2 Ombres Mineures (CR 1/2 chacune) gardent le passage. HP 15, ATK 8, AC 12. Vulnérables au feu et à la lumière divine." },
            { type: 'secret', text: "Au bout du tunnel : un fragment de mur couvert de runes ashkanes. Un œil ouvert gravé dans la pierre, identique aux graffitis en ville. Ce n'est pas un tag - c'est un ancien symbole de surveillance." },
            { type: 'lore', text: "Ces tunnels faisaient partie du réseau de surveillance de l'Hégémonie d'Ashka. Des 'Yeux de l'Empire' - des postes d'observation magiques cachés dans les murs, les caves, les fondations. La plupart ont été détruits. Celui-ci se réactive." },
          ],
          encounter: {
            name: "Ombres dans la Cave",
            enemies: [
              { name: "Ombre Mineure", hp: 15, atk: 8, ac: 12, cr: 0.5, abilities: ["Intangible (résistance dégâts physiques)", "Toucher Glacial (1d6+2 nécrotique)"] },
              { name: "Ombre Mineure", hp: 15, atk: 8, ac: 12, cr: 0.5, abilities: ["Intangible (résistance dégâts physiques)", "Toucher Glacial (1d6+2 nécrotique)"] },
            ],
            terrain: ["Tonneaux (couverture 1/2)", "Sol mouillé (risque glissade)", "Espace étroit (-10 aux armes lourdes)", "Obscurité totale sans source de lumière"],
            tactics: "Les ombres fuient la lumière directe. Elles attaquent par surprise depuis les murs, se glissant entre les tonneaux. Si réduites à moins de 5 HP, elles fuient dans le tunnel.",
            loot: ["Fragment de rune luisante (valeur : 5 PO, mais un mage l'estimerait à beaucoup plus)", "Médaillon ancien en bronze (symbole de l'œil ouvert)"],
          },
          skillChecks: [
            { skill: 'Investigation', dc: 35, success: "Les traces mènent non pas VERS le tunnel, mais EN SORTENT. Quelque chose est sorti de sous la ville.", failure: "Les traces sont confuses dans l'humidité." },
            { skill: 'Arcanes', dc: 45, success: "Les runes sur le mur sont du proto-ashkan. Elles ne sont pas décoratives - c'est un système de surveillance. Et il est en train de se rallumer.", failure: "Des runes anciennes. Impossibles à déchiffrer sans aide." },
            { skill: 'Histoire', dc: 40, success: "Le symbole de l'œil ouvert est celui des 'Veilleurs d'Ashka' - un réseau d'espionnage magique de l'ancien empire.", failure: "Le symbole ne vous dit rien de précis." },
          ],
          nextScenes: ['scene-1-1-3'],
          previousScene: 'scene-1-1-2',
          mapMovement: { from: 'sol-aureus', to: 'sol-aureus-underground' },
        },
        {
          id: 'scene-1-1-city',
          sceneNumber: 4,
          title: "Les Rues de Sol-Aureus",
          type: 'exploration',
          location: "Sol-Aureus - Quartiers divers",
          locationId: 'sol-aureus',
          estimatedMinutes: 30,
          readAloud: {
            text: `Sol-Aureus s'étale devant vous, un labyrinthe vivant de rues pavées, de places ombragées et de bâtiments qui vont du modeste au majestueux.

Le Quartier des Marchands bourdonne d'activité : étals colorés débordant de fruits, de tissus, d'épices venues de contrées lointaines. Des crieurs annoncent des ventes aux enchères, des enfants courent entre les jambes des passants, et l'odeur omniprésente de pain frais se mêle à celle des épices.

Plus haut, le Quartier Noble s'isole derrière des grilles ouvragées et des jardins impeccables. Les maisons sont en pierre blanche, les toits en tuiles bleues, et des gardes privés veillent à chaque coin de rue.

Le Quartier du Temple, dominé par le dôme doré de Solarius, respire la sérénité. Des moines en robe blanche balaient les marches, et une file de fidèles attend pour la prière du soir.

Et en contrebas, le Quartier Bas vit à son propre rythme : ruelles étroites, tavernes louches, murs couverts de graffitis. C'est ici que bat le vrai cœur de la ville - sale, bruyant, et honnête dans sa malhonnêteté.

Où allez-vous ?`,
            mood: "Exploration libre, cité vivante et contrastée",
            music: "Sons urbains médiévaux, cloches, cris de marchands",
          },
          gmNotes: [
            { type: 'info', text: "Scène d'exploration libre. Les joueurs choisissent où aller. Chaque quartier offre des rencontres et des indices différents." },
            { type: 'tip', text: "Marché : Rumeurs de marchands, objets à acheter. Temple : Info sur les disparitions de fidèles, bénédiction. Guilde des Arcanes : Info sur les perturbations magiques. Quartier Bas : Contacts criminels, la Main Noire." },
            { type: 'secret', text: "Dans le Quartier Bas, les symboles de l'œil ouvert sont partout. Les habitants pensent que c'est un gang. C'est bien plus ancien que ça." },
          ],
          choices: [
            {
              id: 'choice-explore',
              prompt: "Quel quartier explorent-ils ?",
              options: [
                { label: "Le Marché", description: "Achats, rumeurs, contact avec la Ligue des Marchands", consequence: "Rencontrent Aldric le Marchand. Rumeur sur caravanes attaquées au sud.", nextScene: 'scene-1-1-3' },
                { label: "Le Temple de Solarius", description: "Prière, soins, info sur les disparitions", consequence: "Rencontrent Frère Aldwin. Apprennent que 3 fidèles ont disparu après les prières du soir.", nextScene: 'scene-1-1-3' },
                { label: "La Tour des Arcanes", description: "Magie, recherche, perturbations", consequence: "Les mages sont nerveux. 'Perturbations dans le Weave.' Accès restreint au 3e sous-sol.", nextScene: 'scene-1-1-3' },
                { label: "Le Quartier Bas", description: "Contacts criminels, information clandestine", consequence: "Rencontrent Élise Doigts-d'Argent. Le Syndicat sait quelque chose sur les disparitions mais veut un service d'abord.", nextScene: 'scene-1-1-3' },
              ],
            },
          ],
          nextScenes: ['scene-1-1-3'],
          previousScene: 'scene-1-1-2',
        },
        {
          id: 'scene-1-1-3',
          sceneNumber: 5,
          title: "La Nuit Tombe",
          type: 'revelation',
          location: "Sol-Aureus, de nuit",
          locationId: 'sol-aureus',
          estimatedMinutes: 20,
          readAloud: {
            text: `La nuit tombe sur Sol-Aureus, mais ce soir, elle semble tomber plus lourdement que d'habitude.

Les lanternes magiques des rues principales s'allument comme chaque soir, projetant leur lumière bleutée sur les pavés. Mais dans les ruelles secondaires, certaines s'éteignent. Clac. Clac. Clac. Une à une, comme des yeux qui se ferment.

En retournant au Sanglier Doré, vous passez devant le Mur des Disparus - un pan de mur près du poste de garde où sont affichés les avis de recherche. Il y en a beaucoup. Trop. Des visages vous regardent depuis le papier jauni : jeunes, vieux, riches, pauvres. Aucun lien apparent entre eux.

Sauf un détail.

En bas de chaque avis, quelqu'un a griffonné au charbon le même symbole : un œil ouvert.

Ce soir, quand vous vous couchez dans vos chambres du Sanglier Doré, le sommeil tarde à venir. Et quand il arrive enfin, il apporte des rêves étranges : des couloirs de pierre noire, une porte scellée qui pulse comme un cœur, et une voix - ancienne, immense, patiente - qui murmure un seul mot :

« Bientôt. »

Vous vous réveillez en sueur, le mot encore sur les lèvres. Par la fenêtre, les premières lueurs de l'aube percent un ciel d'un violet inhabituel.

Une nouvelle journée commence à Sol-Aureus. Quelque chose a changé. Vous ne savez pas encore quoi, mais vous le sentez dans vos os.`,
            mood: "Inquiétude grandissante, premier contact avec le surnaturel",
            music: "Ambiance nocturne tendue, cordes graves, silence soudain",
          },
          gmNotes: [
            { type: 'info', text: "Le rêve est partagé par TOUS les personnages. C'est le premier signe que les sceaux faiblissent - les Anciens commencent à 'pousser' depuis l'autre côté." },
            { type: 'secret', text: "Le mot 'Bientôt' est en ashkan archaïque. Un personnage qui connaît cette langue le reconnaît automatiquement." },
            { type: 'warning', text: "Fin du Chapitre 1. Les personnages devraient avoir : au moins 1 contact PNJ, connaissance des disparitions, peut-être l'exploration de la cave, et le rêve partagé. S'il manque des éléments, ajoutez une matinée d'exploration avant de passer au Chapitre 2." },
            { type: 'tip', text: "Transition vers le Chapitre 2 : Le lendemain matin, Brok les réveille. 'Y'a quelqu'un qui vous cherche. Un homme de la Garde Royale. Il dit que c'est urgent.'" },
          ],
          nextScenes: ['scene-1-2-1'],
          previousScene: 'scene-1-1-2',
        },
      ],
      chapterConclusion: {
        text: "Les personnages se sont installés à Sol-Aureus et ont touché du doigt un mystère plus grand qu'eux. Les disparitions, les symboles, les rêves - tout converge vers quelque chose d'ancien qui se réveille sous leurs pieds.",
        mood: "Transition, anticipation",
      },
      rewards: { xp: 150, gold: "50-100 PO (quête cave de Brok + trouvailles)" },
    },

    // --- CHAPITRE 2 : SOUS LA SURFACE ---
    {
      id: 'ch-1-2',
      actNumber: 1,
      chapterNumber: 2,
      title: "Sous la Surface",
      subtitle: "Les Égouts et les Secrets",
      summary: "La Garde Royale recrute les personnages pour enquêter sur les disparitions. L'investigation les mène dans les égouts de Sol-Aureus, où ils découvrent un réseau de tunnels ashkans et un premier sceau brisé. Premier vrai donjon.",
      levelRange: "2-3",
      themes: ['investigation', 'exploration souterraine', 'révélations'],
      chapterIntro: {
        text: `Le matin venu, le monde semble normal - marchands, gardes, enfants en route vers l'école. Mais vous savez que sous cette normalité, quelque chose remue.

Brok vous attendait au pied de l'escalier, les bras croisés, l'air encore plus renfrogné que d'habitude. « Y'a un type en armure qui veut vous voir. Il attend dehors. Il a l'air important et pressé - la combinaison que je déteste le plus. »

Dehors, un officier de la Garde Royale en armure polie vous attend, flanqué de deux soldats. Son tabard porte le blason du Capitaine-Général Marcus.

« Je suis le Lieutenant Kael. Le Capitaine-Général vous convoque au Palais. Immédiatement. Il dit que vous avez posé les bonnes questions hier, et qu'il a besoin de gens qui posent des questions. Venez. »`,
        mood: "Urgence professionnelle, gravité",
        music: "Tambours militaires doux, tension",
      },
      scenes: [
        {
          id: 'scene-1-2-1',
          sceneNumber: 1,
          title: "Le Palais Royal",
          type: 'social',
          location: "Palais Royal, Salle du Conseil",
          locationId: 'sol-aureus-palace',
          estimatedMinutes: 20,
          readAloud: {
            text: `Le Palais Royal de Sol-Aureus est une forteresse déguisée en œuvre d'art. Derrière les colonnes de marbre et les vitraux colorés, les murs font deux mètres d'épaisseur et les gardes sont partout.

Le Lieutenant Kael vous conduit à travers des couloirs ornés de tapisseries représentant les grandes batailles d'Aethelgard - la Chute d'Ashka, la Défense de Sol-Aureus, la Bataille des Cinq Ponts. Les héros sur les tapisseries sont nobles et triomphants. La réalité, vous le devinez, était plus sanglante.

La Salle du Conseil est une pièce circulaire dominée par une grande table de chêne en forme de bouclier. Autour de la table, trois personnes :

Le Capitaine-Général Marcus - un homme dur, la cinquantaine, le regard d'acier d'un vétéran qui a survécu à plus de batailles qu'il ne peut les compter.

Le Haut-Mage Theron - vieux, très vieux, avec une barbe qui touche la table et des yeux qui brillent d'intelligence derrière des lunettes épaisses comme des fonds de bouteille.

Et une femme que vous ne connaissez pas - Maestra Selyne, robe bleu nuit, expression indéchiffrable, qui vous regarde comme si elle lisait votre âme.

Marcus parle le premier : « Asseyez-vous. Ce que je vais vous dire ne quitte pas cette pièce. Sol-Aureus a un problème, et la Garde n'est pas suffisante pour le résoudre. »`,
            mood: "Solennité, gravité, le poids du monde sur les épaules",
            music: "Thème royal sombre, cordes et cuivres",
          },
          gmNotes: [
            { type: 'info', text: "C'est la scène de briefing principal. Les 3 PNJ donnent chacun une perspective : Marcus (militaire/pragmatique), Theron (magique/analytique), Selyne (mystique/prophétique)." },
            { type: 'secret', text: "Selyne sait EXACTEMENT ce qui se passe (les sceaux faiblissent) mais ne le dit pas encore. Elle teste les personnages." },
            { type: 'tip', text: "Récompense de la mission : 200 PO par personne + accès aux ressources de la Garde. Négociable." },
          ],
          npcs: [
            {
              name: "Capitaine-Général Marcus",
              role: "Chef militaire",
              personality: "Direct, pragmatique, loyal au roi. Ne supporte pas la politique.",
              appearance: "La cinquantaine, cheveux gris acier, mâchoire carrée. Armure de cérémonie qu'il porte comme un costume inconfortable.",
              dialogues: {
                greeting: "« Pas de titres, pas de protocole. On n'a pas le temps. »",
                info: "« 47 disparitions en trois mois. Pas des vagabonds - des artisans, des soldats, un mage. Aucun corps. Aucune rançon. Aucun témoin. Ma Garde patrouille, mais quand on ne sait pas ce qu'on cherche... »",
                quest: "« Je vous donne accès aux égouts, à mes rapports, et à 200 pièces d'or par tête. Trouvez-moi ce qui se passe sous ma ville. »",
                farewell: "« Revenez vivants et avec des réponses. C'est un ordre. »",
              },
              stats: { hp: 75, atk: 18, ac: 20 },
            },
            {
              name: "Haut-Mage Theron",
              role: "Chef de la Guilde des Arcanes",
              personality: "Intellectuel, distrait, mais remarquablement perceptif quand il se concentre.",
              appearance: "Très âgé, barbe blanche immense, lunettes épaisses, robe violette couverte de taches d'encre et de brûlures d'acide.",
              dialogues: {
                greeting: "« Ah, les voilà. Oui, oui. Asseyez-vous. Non, pas là - ce siège est pour mon... enfin, il est pris. Virtuellement. »",
                info: "« Le Weave - le tissu de magie qui sous-tend la réalité - montre des perturbations. Comme des rides sur un étang. Quelque chose pousse depuis l'autre côté. Depuis les couches anciennes de magie, celles que nous avons scellées après la chute d'Ashka. »",
                quest: "« Si vous trouvez des inscriptions anciennes, des artefacts, quoi que ce soit d'ashkan - ne touchez rien. Notez tout. Revenez me voir. C'est d'une importance capitale. »",
                farewell: "« Soyez prudents avec ce que vous trouverez. La magie ashkane n'est pas morte. Elle dort. Et elle rêve de se réveiller. »",
              },
            },
          ],
          choices: [
            {
              id: 'choice-mission',
              prompt: "Les personnages acceptent-ils la mission ?",
              options: [
                { label: "Accepter", description: "Prendre la mission officielle", consequence: "200 PO d'avance, insignes d'enquêteur temporaire, accès aux rapports de la Garde.", nextScene: 'scene-1-2-2' },
                { label: "Négocier", description: "Demander plus de ressources/informations", consequence: "Jet de Persuasion CD 45. Succès : +50 PO + 2 potions de soin + guide dans les égouts. Échec : Marcus s'impatiente mais maintient l'offre.", nextScene: 'scene-1-2-2', skillCheck: { skill: 'Persuasion', dc: 45, success: "Marcus hoche la tête. 'Vous avez du cran. J'aime ça.' Bonus accordé.", failure: "Marcus plisse les yeux. 'C'est tout ce que j'ai à offrir. Prenez-le ou laissez-le.'" } },
                { label: "Refuser", description: "Décliner et poursuivre de manière indépendante", consequence: "Selyne sourit. 'Vous refuserez, et pourtant vous irez quand même. Le destin n'accepte pas les démissions.' Les joueurs finiront par enquêter de toute façon - le mystère est trop attirant.", nextScene: 'scene-1-1-city' },
              ],
            },
          ],
          nextScenes: ['scene-1-2-2'],
          previousScene: 'scene-1-1-3',
          mapMovement: { from: 'sol-aureus', to: 'sol-aureus-palace' },
        },
        {
          id: 'scene-1-2-2',
          sceneNumber: 2,
          title: "Dans les Entrailles de Sol-Aureus",
          type: 'exploration',
          location: "Égouts de Sol-Aureus",
          locationId: 'sol-aureus-sewers',
          estimatedMinutes: 40,
          readAloud: {
            text: `L'entrée des égouts se trouve sous un pont de pierre dans le Quartier Bas. Un garde soulève la grille de fer rouillé, et une bouffée d'air vicié vous frappe au visage.

« Bienvenue en enfer, » marmonne-t-il en vous tendant une lanterne. « Gardez la gauche, évitez le canal central, et si vous entendez des cliquetis... ce sont les rats. Probablement. »

Les égouts de Sol-Aureus sont un labyrinthe de voûtes en pierre, de canaux d'eau sombre et de passerelles glissantes. Construits il y a des siècles, ils forment une ville sous la ville - certains passages sont assez larges pour y faire passer un chariot, d'autres si étroits qu'il faut se glisser de profil.

Au début, c'est ce à quoi vous vous attendiez : murs suintants, odeur nauséabonde, rats qui fuient votre lumière. Mais plus vous avancez, plus les choses changent.

Les murs deviennent plus anciens. La pierre lisse des égouts cède la place à des blocs massifs, jointés avec une précision que les bâtisseurs modernes ne peuvent plus reproduire. Des runes apparaissent - à peine visibles, gravées dans la pierre, mais quand votre lumière les touche, elles émettent une lueur verdâtre fugace.

Vous n'êtes plus dans les égouts.

Vous êtes dans quelque chose de beaucoup, beaucoup plus ancien.`,
            mood: "Exploration tendue, descente progressive dans l'horreur",
            music: "Gouttes d'eau, écho, grondement lointain, silence inquiétant",
          },
          gmNotes: [
            { type: 'info', text: "Ce donjon a 3 zones : Égouts modernes → Tunnels de transition → Complexe ashkan. La difficulté augmente progressivement." },
            { type: 'warning', text: "Zone 2 : 4 Rats Géants (CR 1/4) + 1 Slime Gris (CR 1). Zone 3 : 2 Ombres (CR 1) + piège à runes (1d10 nécrotique, CD 40 Perception pour repérer)." },
            { type: 'secret', text: "La zone ashkane contient un Sceau Mineur - un cercle de runes au sol, fissuré. C'est par cette fissure que les ombres s'infiltrent. Les joueurs ne peuvent pas le réparer, mais ils peuvent le documenter pour Theron." },
            { type: 'lore', text: "Le complexe ashkan est un ancien poste de surveillance + centre de rituel mineur. Les Ashkans avaient un réseau de ces postes sous chaque ville majeure. Sol-Aureus en comptait 12. Celui-ci est le premier à se réactiver." },
            { type: 'tip', text: "Si les joueurs prennent le temps de fouiller : journal d'un Veilleur ashkan, 500 ans d'âge, détaillant les rotations de garde et mentionnant 'le Grand Sceau sous le Temple'. Indice crucial pour la suite." },
          ],
          encounter: {
            name: "Le Gardien du Sceau",
            enemies: [
              { name: "Ombre d'Ashka", hp: 25, atk: 10, ac: 13, cr: 1, abilities: ["Résistance aux dégâts physiques", "Toucher Glacial (1d8+3 nécrotique)", "Cri d'Outre-Tombe (CD 35 Sagesse ou Effrayé 1 round)"] },
              { name: "Ombre d'Ashka", hp: 25, atk: 10, ac: 13, cr: 1, abilities: ["Résistance aux dégâts physiques", "Toucher Glacial (1d8+3 nécrotique)", "Cri d'Outre-Tombe (CD 35 Sagesse ou Effrayé 1 round)"] },
            ],
            terrain: ["Cercle de runes (zone de magie instable)", "Piliers de pierre (couverture)", "Sol fissuré (terrain difficile)", "Lueur verdâtre des runes (éclairage faible)"],
            tactics: "Les ombres émergent du sceau fissuré quand les joueurs s'approchent. Elles défendent le sceau instinctivement. Vulnérables à la lumière divine et au feu.",
            loot: ["Journal du Veilleur Ashkan (artefact narratif)", "Éclat de sceau (gemme craquelée, valeur 25 PO, intérêt magique immense)", "120 PO en pièces ashkanes anciennes"],
          },
          nextScenes: ['scene-1-2-3'],
          previousScene: 'scene-1-2-1',
          mapMovement: { from: 'sol-aureus', to: 'sol-aureus-sewers' },
        },
        {
          id: 'scene-1-2-3',
          sceneNumber: 3,
          title: "Rapport au Palais",
          type: 'social',
          location: "Palais Royal",
          locationId: 'sol-aureus-palace',
          estimatedMinutes: 15,
          readAloud: {
            text: `Quand vous remontez à la surface, la lumière du jour vous brûle les yeux. Vous êtes couverts de poussière, de toiles d'araignée et de substances que vous préférez ne pas identifier.

Au Palais, l'accueil est différent cette fois. On vous fait entrer immédiatement. Marcus, Theron et Selyne sont déjà là, comme s'ils vous attendaient.

Quand vous montrez l'éclat de sceau et le journal, la réaction est... intense.

Theron pâlit visiblement. Ses mains tremblent quand il prend le journal. « Par les sept sphères... c'est authentique. Un journal de Veilleur. Premier Cercle. »

Marcus serre les poings. « Qu'est-ce que ça signifie concrètement, Theron ? En mots simples. »

Theron lève les yeux du journal. Pour la première fois depuis que vous le connaissez, il n'a pas l'air distrait. Il a l'air terrifié.

« Ça signifie que les Sceaux qui retiennent les forces ashkanes depuis 500 ans... sont en train de céder. Et Sol-Aureus est construite au-dessus du plus grand d'entre eux. »

Le silence dans la salle est total.

Selyne, qui n'a pas dit un mot, sourit. Un sourire triste, comme quelqu'un qui voit une prophétie se réaliser. « Et maintenant, » dit-elle doucement, « le vrai voyage commence. »`,
            mood: "Révélation, gravité, point de non-retour",
            music: "Crescendo dramatique, silence, puis thème mélancolique",
          },
          gmNotes: [
            { type: 'info', text: "Fin du Chapitre 2 et de l'Acte I, Phase 1. Les joueurs ont maintenant l'enjeu principal de la campagne." },
            { type: 'tip', text: "Distribuez les récompenses : XP, or, et surtout l'accès aux ressources du Palais. Les personnages sont maintenant des agents semi-officiels." },
            { type: 'secret', text: "Selyne sait que les PJ sont les 'Élus' - les seuls capables de restaurer les sceaux car ils ont été touchés par le rêve partagé. Elle ne le révélera que dans l'Acte II." },
          ],
          choices: [
            {
              id: 'choice-next-step',
              prompt: "Que proposent les personnages ?",
              options: [
                { label: "Enquêter sur les autres sceaux", description: "Chercher les 11 autres postes ashkans sous Sol-Aureus", consequence: "Mène au Chapitre 3 : exploration systématique des souterrains. Plus de donjons, plus de révélations.", nextScene: 'scene-1-3-1' },
                { label: "Chercher des alliés", description: "Recruter de l'aide : factions, mercenaires, experts", consequence: "Mène à des quêtes secondaires de faction. Bouclier d'Argent, Guilde des Arcanes, même le Syndicat.", nextScene: 'scene-1-3-1' },
                { label: "Aller aux Terres Brûlées", description: "Se rendre directement à la source du problème", consequence: "Trop tôt ! Selyne les prévient : 'Vous n'êtes pas prêts. Pas encore. Le désert ne pardonne pas l'impatience.' Mais s'ils insistent... quête suicidaire optionnelle.", nextScene: 'scene-1-3-1' },
              ],
            },
          ],
          nextScenes: ['scene-1-3-1'],
          previousScene: 'scene-1-2-2',
          mapMovement: { from: 'sol-aureus-sewers', to: 'sol-aureus-palace' },
        },
      ],
      chapterConclusion: {
        text: "Le voile est levé. Sol-Aureus n'est pas seulement une belle cité - c'est un bouchon sur une bouteille de cauchemars, et le bouchon est en train de sauter. Les personnages sont désormais au cœur d'un mystère qui menace le monde entier.",
        mood: "Gravité, détermination naissante",
      },
      rewards: { xp: 400, gold: "200-300 PO", items: ["Journal du Veilleur Ashkan", "Éclat de Sceau", "Insignes d'enquêteur royal"] },
    },
    ...ACT_1_EXTRA_CHAPTERS,
    {
      id: 'ch-1-bonus',
      title: "Scènes d'Exploration",
      scenes: ACT_1_SCENES_EXPANSION,
    } as BookChapter,
    DUNGEON_CATACOMBES,
  ],
};

// ============================================================================
// ACTE II - LES ROUTES D'AETHELGARD (Placeholder structuré)
// ============================================================================

const ACT_2: BookAct = {
  id: 'act-2',
  actNumber: 2,
  title: "Les Routes d'Aethelgard",
  subtitle: "Le monde s'ouvre, les menaces se multiplient",
  synopsis: "Les personnages quittent Sol-Aureus pour explorer Aethelgard. Chaque région cache un Sceau Majeur qu'il faut sécuriser. L'Acte II est le plus ouvert : les joueurs choisissent leur route, leurs alliances, et l'ordre dans lequel ils affrontent les menaces. Le Cercle des Cendres se manifeste ouvertement.",
  levelRange: "4-8",
  themes: ['voyage', 'exploration', 'alliances', 'escalade'],
  actIntro: {
    text: `La route s'étend devant vous, ruban de terre battue serpentant à travers les collines du Val Doré. Sol-Aureus rétrécit dans votre dos, ses tours dorées s'amenuisant jusqu'à n'être plus que des éclats de lumière à l'horizon.

Le monde d'Aethelgard s'ouvre comme un livre dont on tourne les pages pour la première fois. Cinq régions, cinq sceaux, cinq défis. Le Cercle des Cendres a une longueur d'avance, mais vous avez quelque chose qu'ils n'ont pas : le choix.

Par où commencez-vous ?`,
    mood: "Liberté, aventure, horizon ouvert",
    music: "Thème de voyage épique, flûtes et cordes",
  },
  chapters: [
    {
      id: 'ch-2-1',
      actNumber: 2,
      chapterNumber: 3,
      title: "Les Monts Cœur-de-Fer",
      subtitle: "Le Sceau des Profondeurs",
      summary: "Le sceau nain est menacé par les forages profonds de Hammerdeep. Les nains refusent de croire au danger. Il faut les convaincre tout en combattant les horreurs qui remontent des mines.",
      levelRange: "4-6",
      themes: ['diplomatie naine', 'horreur souterraine', 'obstination vs sagesse'],
      chapterIntro: {
        text: `Les Monts Cœur-de-Fer se dressent comme une muraille de granit et de glace. La route qui y mène est raide, froide, et fréquentée par des chariots de minerai tirés par des bœufs aussi massifs que têtus.

Hammerdeep, la cité naine, n'est pas visible depuis la surface - seulement ses portes, deux battants d'acier de vingt mètres de haut, gravés de scènes de forge et de bataille. Le bruit de marteaux résonne depuis l'intérieur comme un cœur gigantesque. Celui de la montagne elle-même.

Les nains de Cœur-de-Fer sont fiers, travailleurs, et profondément méfiants envers les étrangers. Surtout les étrangers qui prétendent que leur montagne abrite une menace ancienne.`,
        mood: "Majesté brute, tension culturelle",
        music: "Percussions profondes, enclumes, chœur grave",
      },
      scenes: [
        {
          id: 'scene-2-1-1',
          sceneNumber: 1,
          title: "Les Portes de Hammerdeep",
          type: 'social',
          location: "Hammerdeep, entrée",
          locationId: 'hammerdeep',
          estimatedMinutes: 20,
          readAloud: {
            text: `Les portes de Hammerdeep s'ouvrent avec un grondement de tonnerre, révélant un spectacle qui coupe le souffle.

L'intérieur de la montagne a été évidé sur des centaines de mètres de hauteur. Des plateformes de pierre et de métal s'étagent le long des parois, reliées par des ponts suspendus et des ascenseurs à vapeur. Des milliers de lumières - lanternes, forges, cristaux lumineux - transforment la caverne en un ciel étoilé inversé.

Au centre, suspendu au-dessus d'un gouffre sans fond, un palais de pierre et d'acier scintille : la Forge Royale, siège du Roi Thorin Poing-de-Fer.

Le bruit est assourdissant. Le clang-clang-clang de dix mille marteaux sur dix mille enclumes, le rugissement des forges, les cris des ouvriers, le grondement des chariots de minerai sur les rails. C'est comme être à l'intérieur d'une machine vivante.

Un nain trapu, couvert de suie, vous barre le passage. « Humains. Toujours au mauvais endroit au mauvais moment. Qu'est-ce que vous voulez ? »`,
            mood: "Émerveillement industriel, fierté naine",
          },
          gmNotes: [
            { type: 'info', text: "Les nains sont accueillants mais méfiants. Parler du Sceau sans preuves les agacera. Il faut gagner leur respect d'abord." },
            { type: 'tip', text: "Trois façons de gagner la confiance des nains : 1) Aider à résoudre un problème minier, 2) Impressionner le Maître Forgeron avec des connaissances, 3) Boire un nain sous la table (Constitution CD 55)." },
            { type: 'secret', text: "Le Roi Thorin sait que quelque chose ne va pas dans les mines profondes. Des mineurs disparaissent. Mais admettre un problème serait 'montrer de la faiblesse' aux yeux des clans." },
          ],
          choices: [
            {
              id: 'choice-dwarf-entry',
              prompt: "Comment abordent-ils les nains ?",
              options: [
                { label: "Diplomatie officielle", description: "Montrer les insignes royaux et demander audience avec le Roi Thorin.", consequence: "Audience accordée dans 3 jours. En attendant, liberté d'explorer. Mais les nains les surveillent.", nextScene: 'scene-2-1-2' },
                { label: "Par la base", description: "Se mêler aux mineurs et ouvriers, gagner la confiance par le travail.", consequence: "Plus lent mais plus efficace. En quelques jours de travail aux mines, les nains s'ouvrent et parlent des 'bruits d'en bas'.", nextScene: 'scene-2-1-2' },
                { label: "Prouver sa valeur", description: "Défier un nain en combat amical, en forge, ou en boisson.", consequence: "Le plus rapide. Un défi gagné = respect immédiat. Accès au Roi en 1 jour.", nextScene: 'scene-2-1-2' },
              ],
            },
          ],
          nextScenes: ['scene-2-1-2'],
          mapMovement: { from: 'sol-aureus', to: 'hammerdeep', path: ['val-dore-road', 'mountain-pass'] },
        },
        {
          id: 'scene-2-1-2',
          sceneNumber: 2,
          title: "Les Mines Profondes",
          type: 'exploration',
          location: "Hammerdeep, Niveau 12",
          locationId: 'hammerdeep-mines',
          estimatedMinutes: 45,
          readAloud: {
            text: `Le Niveau 12 est le plus profond de Hammerdeep. Les nains l'appellent « le Murmure » - parce que c'est le dernier endroit où vous entendez encore le bruit des forges au-dessus. En dessous, il n'y a que le silence.

Et quelque chose d'autre.

L'ascenseur de mine grince en descendant. La lumière des cristaux se fait plus rare. L'air devient lourd, chargé d'une odeur métallique qui n'est pas celle du fer ou du cuivre - c'est quelque chose de plus ancien. De plus fondamental.

Quand l'ascenseur s'arrête, vous émergez dans une caverne naturelle immense. Le plafond disparaît dans l'obscurité. Le sol est jonché de rails abandonnés, de chariots renversés, et d'outils laissés en place, comme si les mineurs avaient tout lâché et couru.

Au fond de la caverne, là où la roche fait place à quelque chose de plus sombre et de plus lisse, un symbole gigantesque est gravé dans le sol. Un cercle de runes ashkanes de dix mètres de diamètre, pulsant d'une lumière vert-noir maladive.

Le Sceau des Profondeurs.

Et il est fissuré. Profondément.

De la fissure principale, une brume sombre s'élève en volutes paresseuses, et dans cette brume, des formes bougent. Pas des ombres - quelque chose de plus substantiel. De plus affamé.`,
            mood: "Horreur souterraine, vertige des profondeurs",
            music: "Bourdonnement grave, silence oppressant, craquements de pierre",
          },
          gmNotes: [
            { type: 'warning', text: "Boss : Gardien de Pierre Corrompu (CR 5). HP 80, ATK 14, AC 17. Immunité poison. Résistance physique. Attaques : Poing de Pierre (2d10+5), Souffle de Cendres (cône 6m, 3d6 nécrotique, CD 45 Constitution)." },
            { type: 'info', text: "Le Sceau ne peut pas être réparé ici. Il faut un rituel qui nécessite un composant de chaque région. Ce sceau-ci nécessite du 'Fer Stellaire' - un métal nain légendaire." },
            { type: 'secret', text: "Le Roi Thorin possède le dernier lingot de Fer Stellaire. Il refusera de le donner... sauf si on lui montre la vérité de ses propres yeux." },
          ],
          encounter: {
            name: "Le Gardien Corrompu",
            enemies: [
              { name: "Gardien de Pierre Corrompu", hp: 80, atk: 14, ac: 17, cr: 5, abilities: ["Immunité : Poison, Psychique", "Résistance : Dégâts physiques non-magiques", "Poing de Pierre (2d10+5 contondant)", "Souffle de Cendres (cône 6m, 3d6 nécrotique, CD 45 CON)", "Régénération de Pierre (récupère 5 HP/round tant qu'il touche le sol)"] },
              { name: "Ombre d'Ashka", hp: 25, atk: 10, ac: 13, cr: 1 },
              { name: "Ombre d'Ashka", hp: 25, atk: 10, ac: 13, cr: 1 },
            ],
            terrain: ["Rails de mine (terrain difficile)", "Chariots renversés (couverture)", "Cercle de runes (zone instable : sorts sauvages possibles)", "Piliers de soutien (destructibles - risque d'éboulement)"],
            tactics: "Le Gardien protège le Sceau. Les Ombres harcèlent les flancs. Couper le Gardien du sol (le soulever, le pousser sur les rails) stoppe sa régénération.",
            loot: ["Cœur de Pierre (composant de forge légendaire, 500 PO)", "2 gemmes d'ombre (50 PO chacune)", "Plan des tunnels ashkans sous Hammerdeep"],
          },
          nextScenes: ['scene-2-1-3'],
          mapMovement: { from: 'hammerdeep', to: 'hammerdeep-mines' },
        },
        {
          id: 'scene-2-1-3',
          sceneNumber: 3,
          title: "Le Choix du Roi",
          type: 'choice',
          location: "Forge Royale de Hammerdeep",
          locationId: 'hammerdeep',
          estimatedMinutes: 20,
          readAloud: {
            text: `Vous ramenez le Roi Thorin au Niveau 12. Il marche en silence, sa hache de cérémonie sur l'épaule. Quand il voit le Sceau, il s'arrête net.

Pendant une longue minute, le roi nain le plus têtu d'Aethelgard ne dit rien. Puis, lentement, il pose sa hache et s'agenouille devant le Sceau. Il passe ses doigts calleux sur les fissures.

« Mon grand-père m'avait averti, » murmure-t-il. « Il disait que la montagne était plus qu'une montagne. Qu'elle gardait quelque chose. Je pensais que c'étaient des contes de vieillard. »

Il se relève. Ses yeux, d'ordinaire durs comme le granit, brillent d'une émotion que vous n'avez jamais vue chez un nain : la peur.

« Vous avez votre Fer Stellaire, » dit-il. « Tout ce que Hammerdeep a à offrir. Mes forgerons, mes guerriers, mes tunnels. Réparez ça. Réparez ça avant que ma montagne ne devienne un tombeau. »`,
            mood: "Émotion brute, alliance forgée dans la vérité",
            music: "Thème nain émouvant, chorale grave",
          },
          gmNotes: [
            { type: 'info', text: "Fin du chapitre Hammerdeep. Les joueurs ont maintenant l'alliance naine et le Fer Stellaire (composant pour le rituel de réparation des sceaux)." },
            { type: 'tip', text: "Si les joueurs veulent rester pour explorer davantage : quêtes secondaires dans les mines, forger des équipements nains, ou même descendre plus profondément (danger extrême)." },
          ],
          nextScenes: ['scene-2-2-1', 'scene-2-3-1', 'scene-2-4-1'],
          previousScene: 'scene-2-1-2',
          choices: [
            {
              id: 'choice-next-region',
              prompt: "Où vont-ils ensuite ?",
              options: [
                { label: "La Sylve d'Émeraude", description: "Le Sceau de la Forêt, gardé par les elfes et les druides", consequence: "Chapitre 4 : Intrigues elfiques, nature corrompue, Arbre-Monde menacé", nextScene: 'scene-2-2-1' },
                { label: "La Côte des Orages", description: "Le Sceau de la Mer, dans un temple englouti", consequence: "Chapitre 5 : Navigation, pirates, temple sous-marin, krakens", nextScene: 'scene-2-3-1' },
                { label: "Retour à Sol-Aureus", description: "Rapporter au Palais et se préparer", consequence: "Repos, ravitaillement, nouvelles inquiétantes : le Cercle des Cendres a frappé ailleurs", nextScene: 'scene-2-4-1' },
              ],
            },
          ],
          mapMovement: { from: 'hammerdeep-mines', to: 'hammerdeep' },
        },
      ],
      chapterConclusion: {
        text: "L'alliance avec les nains est scellée dans la pierre et le fer. Mais chaque jour qui passe, les Sceaux s'affaiblissent. Quatre régions restent à explorer, et le Cercle des Cendres ne dort jamais.",
        mood: "Victoire amère, course contre la montre",
      },
      rewards: { xp: 800, gold: "500-800 PO", items: ["Lingot de Fer Stellaire", "Cœur de Pierre", "Alliance de Hammerdeep (anneau)"] },
    },
    ...ACT_2_EXTRA_CHAPTERS,
    {
      id: 'ch-2-bonus',
      title: "Scènes d'Exploration",
      scenes: ACT_2_SCENES_EXPANSION,
    } as BookChapter,
    DUNGEON_MINES,
  ],
};

// ============================================================================
// ACTES III-V (Structure)
// ============================================================================

const ACT_3: BookAct = {
  id: 'act-3',
  actNumber: 3,
  title: "Les Ombres Grandissent",
  subtitle: "Le Cercle des Cendres frappe",
  synopsis: "Le Cercle des Cendres lance une offensive coordonnée. Un Sceau Majeur est brisé, libérant une horreur. Les factions se déchirent. Les personnages doivent choisir qui sauver et qui sacrifier. L'Acte III est le plus sombre de la campagne.",
  levelRange: "8-12",
  themes: ['sacrifice', 'trahison', 'choix impossibles', 'ténèbres'],
  actIntro: {
    text: `Le ciel au-dessus des Terres Brûlées est en feu.

Non pas le feu orange du crépuscule, mais un feu vert maladif qui pulse comme un cœur monstrueux. Les nouvelles arrivent de partout à la fois : le Sceau de la Mer est tombé. Le temple englouti s'est effondré. La mer elle-même est devenue noire sur un kilomètre autour.

Quelque chose est sorti. Quelque chose d'ancien et d'affamé.

Et le Cercle des Cendres n'est plus dans l'ombre. Ils marchent au grand jour désormais, bannières de cendres déployées, réclamant le retour de l'Hégémonie comme si c'était une libération et non un esclavage.

Le monde bascule.

Que faites-vous quand l'ombre est partout ?

Vous brillez plus fort.`,
    mood: "Désespoir combatif, heure la plus sombre",
    music: "Thème épique sombre, chœur latin, cuivres menaçants",
  },
  chapters: [
    ...ACT_3_CHAPTERS,
    {
      id: 'ch-3-bonus',
      title: "Scènes d'Exploration",
      scenes: ACT_3_EXPANSION_SCENES,
    } as BookChapter,
    DUNGEON_RACINES,
  ],
};

const ACT_4: BookAct = {
  id: 'act-4',
  actNumber: 4,
  title: "La Guerre des Sceaux",
  subtitle: "Le monde se bat pour survivre",
  synopsis: "Guerre ouverte entre les forces coalisées d'Aethelgard et le Cercle des Cendres. Les personnages mènent des missions critiques : rassembler les composants du Grand Rituel, convaincre les dernières factions neutres, et affronter les Archons du Cercle un par un.",
  levelRange: "12-16",
  themes: ['guerre', 'héroïsme', 'leadership', 'rédemption'],
  actIntro: {
    text: `La guerre est là.

Pas la guerre propre des livres d'histoire - pas de charges glorieuses ni de discours héroïques. La vraie guerre. Celle des villages en feu, des réfugiés sur les routes, des soldats épuisés qui tiennent des lignes qui ne devraient pas tenir.

Mais ils tiennent. Parce que vous tenez.

Le Grand Rituel est votre seule chance. Cinq composants, un de chaque région, forgés ensemble dans la Flamme Primordiale sous Sol-Aureus. Si vous réussissez, les Sceaux seront restaurés - plus forts qu'avant. Si vous échouez...

Ne pensez pas à l'échec. Pas maintenant.`,
    mood: "Détermination héroïque, poids du monde",
    music: "Marche militaire épique, trompettes, tambours",
  },
  chapters: [
    ...ACT_4_CHAPTERS,
    {
      id: 'ch-4-bonus',
      title: "Scènes d'Exploration",
      scenes: ACT_4_EXPANSION_SCENES,
    } as BookChapter,
    DUNGEON_TEMPLE,
  ],
};

const ACT_5: BookAct = {
  id: 'act-5',
  actNumber: 5,
  title: "L'Aube Nouvelle",
  subtitle: "Le dernier combat pour Aethelgard",
  synopsis: "Le Grand Rituel, la confrontation finale avec l'Archon Malachar et l'entité derrière les Sceaux, et les conséquences des choix des personnages tout au long de la campagne. Multiples fins possibles selon les alliances, sacrifices et décisions.",
  levelRange: "16-20",
  themes: ['sacrifice ultime', 'héritage', 'espoir', 'fin et commencement'],
  actIntro: {
    text: `Vous vous tenez devant la porte la plus ancienne du monde.

Derrière vous, une armée. Vos alliés, vos amis, les gens que vous avez sauvés et ceux que vous n'avez pas pu sauver mais qui se battent quand même. Nains, elfes, humains, même quelques anciens ennemis qui ont compris, trop tard, que certaines menaces dépassent les rivalités.

Devant vous, les Terres Brûlées. Et au centre, là où l'Hégémonie d'Ashka avait son cœur noir, le Nexus des Sceaux. Un point où tous les sceaux convergent, où la barrière entre le monde et... l'Autre... est la plus fine.

C'est là que tout se termine.

Ou que tout recommence.

Vous avez porté le poids du monde sur vos épaules depuis Sol-Aureus. Depuis la cave d'une taverne, depuis les égouts, depuis le premier rêve partagé. Ce poids ne disparaîtra pas. Mais aujourd'hui, vous êtes assez forts pour le porter.

Aujourd'hui, vous êtes des héros.

Ou vous mourrez en essayant de l'être. Ce qui, franchement, est la même chose.`,
    mood: "Fin de voyage, culmination épique, mélancolie et détermination",
    music: "Thème principal en crescendo, orchestre complet, chœur",
  },
  chapters: [
    ...ACT_5_CHAPTERS,
    {
      id: 'ch-5-bonus',
      title: "Scènes d'Exploration",
      scenes: ACT_5_EXPANSION_SCENES,
    } as BookChapter,
    DUNGEON_NEXUS,
  ],
};

// ============================================================================
// LIVRE COMPLET
// ============================================================================

export const GM_BOOK: GMBook = {
  title: "Chroniques d'Aethelgard",
  subtitle: "Campagne complète pour le Maître du Jeu",
  version: "1.0",
  introduction: {
    text: `Bienvenue, Maître du Jeu.

Ce livre est votre guide à travers les Chroniques d'Aethelgard - une campagne de jeu de rôle épique qui mènera vos joueurs du niveau 1 au niveau 20 à travers un monde riche, dangereux et plein de merveilles.

Ce livre n'est PAS un script. C'est une carte.

Vos joueurs sont les explorateurs. Ils choisiront leur route, leurs alliés, leurs combats. Ce livre vous donne les outils pour les accompagner quelle que soit la direction qu'ils prennent. Chaque scène propose des choix, des embranchements, des alternatives. Si vos joueurs font quelque chose d'inattendu (et ils le feront), improvisez avec confiance. Le monde est assez riche pour absorber n'importe quelle folie.

STRUCTURE :
- Acte I : L'Éveil des Ombres (Niv. 1-4) - Sol-Aureus, premiers mystères
- Acte II : Les Routes d'Aethelgard (Niv. 4-8) - Exploration du monde, alliances
- Acte III : Les Ombres Grandissent (Niv. 8-12) - Escalade, trahisons, sacrifices
- Acte IV : La Guerre des Sceaux (Niv. 12-16) - Guerre ouverte, missions critiques
- Acte V : L'Aube Nouvelle (Niv. 16-20) - Confrontation finale, multiples fins

Bonne chance. Vos joueurs en auront besoin. Vous aussi.`,
    mood: "Complicité MJ, enthousiasme contenu",
  },
  worldPrimer: `AETHELGARD EN BREF

Le monde d'Aethelgard est un continent de high fantasy classique marqué par un passé sombre. L'Hégémonie d'Ashka, un empire de magie noire, a dominé le monde pendant 1500 ans avant d'être renversée il y a 120 ans. Le monde se reconstruit, mais les cicatrices sont profondes.

5 RÉGIONS :
- Val Doré (Centre) : Prairies fertiles, Sol-Aureus la capitale, cœur politique
- Monts Cœur-de-Fer (Est) : Montagnes naines, Hammerdeep, forges et mines
- Sylve d'Émeraude (Ouest) : Forêt ancienne, elfes, druides, Arbre-Monde
- Côte des Orages (Nord) : Fjords, pêcheurs, temples anciens, tempêtes
- Terres Brûlées (Sud) : Désert de cendres, ruines ashkanes, danger extrême

FACTIONS MAJEURES :
- L'Aube d'Argent : Chevaliers paladins, protecteurs du royaume
- Le Cercle des Cendres : Cultistes voulant restaurer l'Hégémonie d'Ashka
- La Guilde des Arcanes : Mages régulés, gardiens du savoir magique
- Le Syndicat de l'Ombre : Réseau criminel, mais avec ses propres règles
- Le Culte de Solarius : Religion dominante, lumière et justice

L'ENJEU :
Les Sceaux qui retiennent les forces ashkanes depuis 500 ans faiblissent. Le Cercle des Cendres veut les briser. Les héros doivent les restaurer. Simple ? Non. Rien ne l'est jamais.`,
  acts: [ACT_1, ACT_2, ACT_3, ACT_4, ACT_5],
  appendices: {
    randomTables: {
      rumors: RANDOM_RUMORS,
      complications: RANDOM_COMPLICATIONS,
      ambiances: RANDOM_AMBIANCES,
    },
    quickNPCs: QUICK_NPCS,
    ambiances: RANDOM_AMBIANCES,
    rumors: RANDOM_RUMORS,
    complications: RANDOM_COMPLICATIONS,
  },
};

// ============================================================================
// MAP DATA - Positions des lieux pour la carte interactive
// ============================================================================

export interface MapLocation {
  id: string;
  name: string;
  type: 'capital' | 'city' | 'town' | 'village' | 'dungeon' | 'landmark' | 'fortress' | 'special' | 'wilderness';
  region: string;
  x: number; // % position sur la carte (0-100)
  y: number; // % position sur la carte (0-100)
  description: string;
  dangerLevel: 'safe' | 'low' | 'medium' | 'high' | 'extreme';
  level: string;
  services?: string[];
  connectedTo: string[];
  icon: string;
}

export interface MapRegion {
  id: string;
  name: string;
  color: string;
  points: Array<{ x: number; y: number }>;  // Polygon points (%)
  description: string;
}

export interface MapPath {
  id: string;
  from: string;
  to: string;
  type: 'road' | 'trail' | 'sea' | 'mountain' | 'underground';
  dangerLevel: 'safe' | 'low' | 'medium' | 'high';
  travelDays: number;
}

export const MAP_REGIONS: MapRegion[] = [
  {
    id: 'val-dore',
    name: 'Val Doré',
    color: '#d4af37',
    points: [{ x: 30, y: 30 }, { x: 65, y: 25 }, { x: 70, y: 55 }, { x: 55, y: 70 }, { x: 25, y: 65 }],
    description: 'Prairies fertiles, collines douces, cœur politique et économique d\'Aethelgard',
  },
  {
    id: 'monts-coeur-de-fer',
    name: 'Monts Cœur-de-Fer',
    color: '#8b7355',
    points: [{ x: 65, y: 10 }, { x: 95, y: 15 }, { x: 95, y: 50 }, { x: 70, y: 55 }, { x: 65, y: 25 }],
    description: 'Montagnes massives, forges naines, mines profondes, neiges éternelles',
  },
  {
    id: 'sylve-emeraude',
    name: 'Sylve d\'Émeraude',
    color: '#2d7d46',
    points: [{ x: 5, y: 20 }, { x: 30, y: 30 }, { x: 25, y: 65 }, { x: 5, y: 60 }],
    description: 'Forêt ancienne et magique, territoire elfique, Arbre-Monde sacré',
  },
  {
    id: 'cote-des-orages',
    name: 'Côte des Orages',
    color: '#4a86c8',
    points: [{ x: 5, y: 5 }, { x: 65, y: 5 }, { x: 65, y: 10 }, { x: 30, y: 20 }, { x: 5, y: 20 }],
    description: 'Fjords battus par les tempêtes, ports de pêche, temples enfouis',
  },
  {
    id: 'terres-brulees',
    name: 'Terres Brûlées',
    color: '#8b3a3a',
    points: [{ x: 25, y: 65 }, { x: 55, y: 70 }, { x: 70, y: 55 }, { x: 95, y: 60 }, { x: 95, y: 95 }, { x: 5, y: 95 }, { x: 5, y: 70 }],
    description: 'Désert de cendres et de verre, ruines de l\'Hégémonie d\'Ashka, danger extrême',
  },
];

export const MAP_LOCATIONS: MapLocation[] = [
  // Val Doré
  { id: 'sol-aureus', name: 'Sol-Aureus', type: 'capital', region: 'val-dore', x: 48, y: 40, description: 'Capitale dorée d\'Aethelgard, 150 000 habitants', dangerLevel: 'safe', level: '1+', services: ['auberge', 'forge', 'temple', 'guilde', 'marché', 'banque'], connectedTo: ['carrefour', 'combrelac', 'hammerdeep', 'havre-du-bois', 'guet-frontiere'], icon: '👑' },
  { id: 'carrefour', name: 'Carrefour', type: 'town', region: 'val-dore', x: 42, y: 52, description: 'Hub commercial, croisement de 4 routes majeures', dangerLevel: 'safe', level: '1+', services: ['auberge', 'marché'], connectedTo: ['sol-aureus', 'combrelac', 'marais-sale'], icon: '🏘️' },
  { id: 'combrelac', name: 'Combrelac', type: 'town', region: 'val-dore', x: 38, y: 45, description: 'Village lacustre paisible, agriculture', dangerLevel: 'safe', level: '1+', services: ['auberge'], connectedTo: ['sol-aureus', 'carrefour'], icon: '🏘️' },
  // Monts Cœur-de-Fer
  { id: 'hammerdeep', name: 'Hammerdeep', type: 'city', region: 'monts-coeur-de-fer', x: 78, y: 30, description: 'Cité naine, 50 000 habitants, forges légendaires', dangerLevel: 'safe', level: '3+', services: ['auberge', 'forge', 'marché', 'banque'], connectedTo: ['sol-aureus', 'camp-mineurs', 'grottes-cristal'], icon: '⛏️' },
  { id: 'camp-mineurs', name: 'Camp des Mineurs', type: 'town', region: 'monts-coeur-de-fer', x: 85, y: 22, description: 'Campement minier en altitude', dangerLevel: 'low', level: '3+', services: ['auberge'], connectedTo: ['hammerdeep'], icon: '🏘️' },
  { id: 'grottes-cristal', name: 'Grottes de Cristal', type: 'dungeon', region: 'monts-coeur-de-fer', x: 82, y: 42, description: 'Cavernes d\'élémentaires de terre, cristaux magiques', dangerLevel: 'medium', level: '6+', connectedTo: ['hammerdeep'], icon: '💎' },
  { id: 'forteresse-celeste', name: 'Forteresse Céleste', type: 'fortress', region: 'monts-coeur-de-fer', x: 90, y: 18, description: 'Tour de mage au sommet d\'une montagne', dangerLevel: 'low', level: '5+', connectedTo: ['hammerdeep'], icon: '🏰' },
  // Sylve d'Émeraude
  { id: 'havre-du-bois', name: 'Havre-du-Bois', type: 'village', region: 'sylve-emeraude', x: 18, y: 38, description: 'Village druide dans les arbres, 500 habitants', dangerLevel: 'safe', level: '2+', services: ['auberge', 'herboriste'], connectedTo: ['sol-aureus', 'arbre-monde', 'foret-emeraude'], icon: '🏡' },
  { id: 'arbre-monde', name: 'Arbre-Monde Yggdrasil', type: 'special', region: 'sylve-emeraude', x: 12, y: 45, description: 'Nexus de magie naturelle, sacré pour les elfes', dangerLevel: 'low', level: '5+', connectedTo: ['havre-du-bois', 'foret-emeraude'], icon: '🌳' },
  { id: 'foret-emeraude', name: 'Forêt d\'Émeraude', type: 'wilderness', region: 'sylve-emeraude', x: 15, y: 50, description: 'Forêt ancienne et magique, fées et créatures sylvestres', dangerLevel: 'medium', level: '5+', connectedTo: ['havre-du-bois', 'arbre-monde'], icon: '🌲' },
  // Côte des Orages
  { id: 'port-azur', name: 'Port d\'Azur', type: 'city', region: 'cote-des-orages', x: 25, y: 12, description: 'Port majeur, 80 000 habitants, commerce maritime', dangerLevel: 'safe', level: '2+', services: ['auberge', 'forge', 'temple', 'marché', 'port'], connectedTo: ['guet-frontiere', 'sol-aureus'], icon: '⚓' },
  { id: 'guet-frontiere', name: 'Guet-Frontière', type: 'fortress', region: 'cote-des-orages', x: 40, y: 15, description: 'Avant-poste militaire nord, 1500 soldats', dangerLevel: 'low', level: '3+', services: ['auberge', 'forge'], connectedTo: ['sol-aureus', 'port-azur', 'terres-gelees'], icon: '🏰' },
  { id: 'terres-gelees', name: 'Terres Gelées', type: 'wilderness', region: 'cote-des-orages', x: 52, y: 8, description: 'Toundra glaciale, danger mortel', dangerLevel: 'extreme', level: '18+', connectedTo: ['guet-frontiere'], icon: '❄️' },
  // Terres Brûlées
  { id: 'nexus-portails', name: 'Nexus des Portails', type: 'special', region: 'terres-brulees', x: 50, y: 82, description: 'Croisement planaire, portails instables', dangerLevel: 'extreme', level: '18+', connectedTo: ['desert-sans-fin', 'forteresse-ombre'], icon: '🌀' },
  { id: 'desert-sans-fin', name: 'Désert Sans Fin', type: 'wilderness', region: 'terres-brulees', x: 60, y: 78, description: 'Désert post-Ashka, verre fondu et cendres', dangerLevel: 'high', level: '12+', connectedTo: ['nexus-portails', 'temple-ancien'], icon: '🏜️' },
  { id: 'forteresse-ombre', name: 'Forteresse d\'Ombre', type: 'dungeon', region: 'terres-brulees', x: 40, y: 75, description: 'Ruine infestée de morts-vivants', dangerLevel: 'high', level: '8+', connectedTo: ['carrefour', 'nexus-portails'], icon: '💀' },
  { id: 'temple-ancien', name: 'Temple Ancien', type: 'dungeon', region: 'terres-brulees', x: 70, y: 85, description: 'Ruine désertique, momies et pièges', dangerLevel: 'high', level: '10+', connectedTo: ['desert-sans-fin'], icon: '🏛️' },
  { id: 'marais-sale', name: 'Marais-Salé', type: 'village', region: 'terres-brulees', x: 35, y: 68, description: 'Village de marais, 800 habitants, atmosphère lugubre', dangerLevel: 'medium', level: '4+', services: ['auberge'], connectedTo: ['carrefour', 'forteresse-ombre', 'manoir-blackwood'], icon: '🏚️' },
  { id: 'manoir-blackwood', name: 'Manoir Blackwood', type: 'dungeon', region: 'terres-brulees', x: 28, y: 72, description: 'Manoir hanté dans les marais', dangerLevel: 'medium', level: '7+', connectedTo: ['marais-sale'], icon: '🏚️' },
  // Dragonspine
  { id: 'dragonspine', name: 'Échine du Dragon', type: 'wilderness', region: 'monts-coeur-de-fer', x: 75, y: 48, description: 'Pics infestés de dragons, extrêmement dangereux', dangerLevel: 'extreme', level: '15+', connectedTo: ['hammerdeep', 'grottes-cristal'], icon: '🐉' },

  // === EXPANSION: Val Doré ===
  { id: 'pontdore', name: 'Pont-Doré', type: 'town', region: 'val-dore', x: 52, y: 35, description: 'Ville-pont enjambant la Rivière d\'Or, hub commercial secondaire', dangerLevel: 'safe', level: '1+', services: ['auberge', 'marché'], connectedTo: ['sol-aureus', 'abbaye-solarius'], icon: '🌉' },
  { id: 'village-orval', name: 'Village d\'Orval', type: 'village', region: 'val-dore', x: 55, y: 45, description: 'Village viticole, célèbre pour son vin doré', dangerLevel: 'safe', level: '1+', services: ['auberge'], connectedTo: ['sol-aureus', 'pontdore'], icon: '🏡' },
  { id: 'ferme-deux-rivieres', name: 'Ferme des Deux-Rivières', type: 'village', region: 'val-dore', x: 45, y: 48, description: 'Exploitation agricole prospère au confluent', dangerLevel: 'safe', level: '1+', connectedTo: ['carrefour', 'combrelac'], icon: '🌾' },
  { id: 'abbaye-solarius', name: 'Abbaye de Solarius', type: 'special', region: 'val-dore', x: 58, y: 30, description: 'Monastère fortifié dédié au dieu solaire, bibliothèque sacrée', dangerLevel: 'safe', level: '2+', services: ['temple', 'herboriste'], connectedTo: ['pontdore', 'sol-aureus'], icon: '☀️' },
  { id: 'ruines-pont-ancien', name: 'Ruines du Pont-Ancien', type: 'dungeon', region: 'val-dore', x: 40, y: 38, description: 'Vestiges d\'un pont Ashkan, repaire de bandits et spectres', dangerLevel: 'medium', level: '3+', connectedTo: ['combrelac', 'sol-aureus'], icon: '🏚️' },
  { id: 'tour-arcanes', name: 'Tour des Arcanes', type: 'special', region: 'val-dore', x: 50, y: 38, description: 'Tour de la Guilde des Arcanes, centre d\'études magiques', dangerLevel: 'safe', level: '1+', services: ['guilde'], connectedTo: ['sol-aureus'], icon: '🔮' },
  { id: 'catacombes-sol-aureus', name: 'Catacombes de Sol-Aureus', type: 'dungeon', region: 'val-dore', x: 47, y: 42, description: 'Réseau souterrain sous la capitale, cryptes anciennes et passages secrets', dangerLevel: 'medium', level: '2+', connectedTo: ['sol-aureus'], icon: '💀' },
  { id: 'quartier-bas', name: 'Quartier Bas', type: 'town', region: 'val-dore', x: 46, y: 39, description: 'Bas-fonds de Sol-Aureus, pauvreté et criminalité', dangerLevel: 'low', level: '1+', connectedTo: ['sol-aureus'], icon: '🏚️' },
  { id: 'moulin-valombre', name: 'Moulin de Valombre', type: 'village', region: 'val-dore', x: 35, y: 42, description: 'Moulin isolé près d\'un bois sombre, rumeurs de hantise', dangerLevel: 'low', level: '2+', connectedTo: ['combrelac', 'carrefour'], icon: '🏡' },

  // === EXPANSION: Monts Cœur-de-Fer ===
  { id: 'forgefer', name: 'Forgefer', type: 'town', region: 'monts-coeur-de-fer', x: 82, y: 25, description: 'Avant-poste nain, forges mineures et taverne de mineurs', dangerLevel: 'safe', level: '4+', services: ['auberge', 'forge'], connectedTo: ['hammerdeep', 'camp-mineurs'], icon: '🔨' },
  { id: 'col-dragon', name: 'Col du Dragon', type: 'wilderness', region: 'monts-coeur-de-fer', x: 88, y: 35, description: 'Passage montagneux gardé par un dragon ancien', dangerLevel: 'high', level: '10+', connectedTo: ['hammerdeep', 'dragonspine'], icon: '🐲' },
  { id: 'mines-mithral', name: 'Mines de Mithral', type: 'dungeon', region: 'monts-coeur-de-fer', x: 92, y: 28, description: 'Mines profondes de mithral, créatures des ténèbres', dangerLevel: 'high', level: '8+', connectedTo: ['camp-mineurs', 'forgefer'], icon: '⛏️' },
  { id: 'temple-forge', name: 'Temple de la Forge', type: 'special', region: 'monts-coeur-de-fer', x: 80, y: 38, description: 'Sanctuaire nain dédié à Terragos, rituels de forge sacrée', dangerLevel: 'low', level: '5+', connectedTo: ['hammerdeep', 'grottes-cristal'], icon: '🔥' },
  { id: 'karak-zhul', name: 'Karak-Zhul', type: 'dungeon', region: 'monts-coeur-de-fer', x: 95, y: 40, description: 'Mines perdues du roi fou Durin, trésor légendaire', dangerLevel: 'high', level: '6+', connectedTo: ['mines-mithral', 'dragonspine'], icon: '💎' },
  { id: 'pont-du-vide', name: 'Pont du Vide', type: 'landmark', region: 'monts-coeur-de-fer', x: 85, y: 45, description: 'Pont naturel de pierre au-dessus d\'un gouffre sans fond', dangerLevel: 'medium', level: '5+', connectedTo: ['grottes-cristal', 'dragonspine'], icon: '🌉' },

  // === EXPANSION: Sylve d'Émeraude ===
  { id: 'clairiere-anciens', name: 'Clairière des Anciens', type: 'special', region: 'sylve-emeraude', x: 8, y: 42, description: 'Cercle de menhirs elfiques, lieu de conseil et de rituels', dangerLevel: 'safe', level: '5+', connectedTo: ['arbre-monde', 'havre-du-bois'], icon: '🗿' },
  { id: 'village-feuillevent', name: 'Feuillevent', type: 'village', region: 'sylve-emeraude', x: 20, y: 48, description: 'Village elfique dans les canopées, architecture vivante', dangerLevel: 'safe', level: '4+', services: ['herboriste'], connectedTo: ['havre-du-bois', 'foret-emeraude'], icon: '🍃' },
  { id: 'bosquet-corrompu', name: 'Bosquet Corrompu', type: 'dungeon', region: 'sylve-emeraude', x: 10, y: 55, description: 'Zone de forêt pourrie par la corruption des Sceaux brisés', dangerLevel: 'high', level: '8+', connectedTo: ['foret-emeraude', 'arbre-monde'], icon: '🕸️' },
  { id: 'lac-miroir', name: 'Lac Miroir', type: 'landmark', region: 'sylve-emeraude', x: 22, y: 42, description: 'Lac parfaitement immobile reflétant le futur, lieu sacré', dangerLevel: 'low', level: '3+', connectedTo: ['havre-du-bois', 'clairiere-anciens'], icon: '🪞' },
  { id: 'ruines-elfiques', name: 'Ruines Elfiques', type: 'dungeon', region: 'sylve-emeraude', x: 5, y: 52, description: 'Vestiges d\'une cité elfique millénaire, gardiens endormis', dangerLevel: 'medium', level: '6+', connectedTo: ['bosquet-corrompu', 'clairiere-anciens'], icon: '🏛️' },
  { id: 'source-eternelle', name: 'Source Éternelle', type: 'special', region: 'sylve-emeraude', x: 15, y: 35, description: 'Source magique de guérison, gardée par un esprit de l\'eau', dangerLevel: 'low', level: '4+', connectedTo: ['havre-du-bois', 'lac-miroir'], icon: '💧' },

  // === EXPANSION: Côte des Orages ===
  { id: 'port-tempete', name: 'Port-Tempête', type: 'city', region: 'cote-des-orages', x: 30, y: 8, description: 'Cité libre des pirates et marchands, 60 000 habitants', dangerLevel: 'low', level: '3+', services: ['auberge', 'forge', 'marché', 'port'], connectedTo: ['port-azur', 'baie-naufrageurs', 'iles-pirates'], icon: '🌊' },
  { id: 'baie-naufrageurs', name: 'Baie des Naufrageurs', type: 'dungeon', region: 'cote-des-orages', x: 18, y: 15, description: 'Cimetière de navires, épaves hantées par les noyés', dangerLevel: 'high', level: '8+', connectedTo: ['port-tempete', 'phare-abandonne'], icon: '⚓' },
  { id: 'phare-abandonne', name: 'Phare Abandonné', type: 'dungeon', region: 'cote-des-orages', x: 12, y: 10, description: 'Phare maudit sur une falaise, gardien spectral', dangerLevel: 'medium', level: '6+', connectedTo: ['baie-naufrageurs'], icon: '🏮' },
  { id: 'temple-englouti', name: 'Temple Englouti', type: 'dungeon', region: 'cote-des-orages', x: 35, y: 5, description: 'Temple sous-marin de Marethys, Sceau de la Mer', dangerLevel: 'extreme', level: '12+', connectedTo: ['port-tempete'], icon: '🏛️' },
  { id: 'iles-pirates', name: 'Îles des Pirates', type: 'town', region: 'cote-des-orages', x: 8, y: 18, description: 'Archipel de repaires pirates, marchés noirs et trésors cachés', dangerLevel: 'medium', level: '5+', services: ['auberge', 'marché'], connectedTo: ['port-tempete', 'baie-naufrageurs'], icon: '🏴‍☠️' },
  { id: 'village-brisants', name: 'Village des Brisants', type: 'village', region: 'cote-des-orages', x: 22, y: 20, description: 'Village de pêcheurs sur les falaises, attaques de créatures marines', dangerLevel: 'low', level: '3+', services: ['auberge'], connectedTo: ['port-azur', 'port-tempete'], icon: '🐟' },
  { id: 'recifs-chantants', name: 'Récifs Chantants', type: 'landmark', region: 'cote-des-orages', x: 15, y: 5, description: 'Formation rocheuse d\'où émanent des chants de sirènes', dangerLevel: 'high', level: '10+', connectedTo: ['temple-englouti', 'phare-abandonne'], icon: '🧜' },
  { id: 'fort-des-vagues', name: 'Fort des Vagues', type: 'fortress', region: 'cote-des-orages', x: 45, y: 10, description: 'Forteresse côtière défendant l\'entrée de la baie', dangerLevel: 'low', level: '4+', services: ['forge'], connectedTo: ['guet-frontiere', 'port-azur'], icon: '🏰' },

  // === EXPANSION: Terres Brûlées ===
  { id: 'nexus-sceaux', name: 'Nexus des Sceaux', type: 'special', region: 'terres-brulees', x: 55, y: 90, description: 'Point de convergence des cinq Sceaux, donjon final de la campagne', dangerLevel: 'extreme', level: '18+', connectedTo: ['nexus-portails', 'desert-sans-fin', 'citadelle-ashka'], icon: '✨' },
  { id: 'citadelle-ashka', name: 'Citadelle d\'Ashka', type: 'dungeon', region: 'terres-brulees', x: 65, y: 88, description: 'Ruines titanesques de l\'ancienne capitale Ashkan, épicentre de la Chute', dangerLevel: 'extreme', level: '16+', connectedTo: ['nexus-sceaux', 'desert-sans-fin'], icon: '🏰' },
  { id: 'desert-verre', name: 'Désert de Verre', type: 'wilderness', region: 'terres-brulees', x: 50, y: 72, description: 'Sable vitrifié par l\'ancienne catastrophe, reflets aveuglants', dangerLevel: 'high', level: '10+', connectedTo: ['forteresse-ombre', 'oasis-ombre'], icon: '🔶' },
  { id: 'oasis-ombre', name: 'Oasis de l\'Ombre', type: 'village', region: 'terres-brulees', x: 55, y: 68, description: 'Seul point d\'eau des Terres Brûlées, camp de résistants', dangerLevel: 'medium', level: '8+', services: ['auberge'], connectedTo: ['desert-verre', 'desert-sans-fin'], icon: '🌴' },
  { id: 'camp-resistance', name: 'Camp de la Résistance', type: 'fortress', region: 'terres-brulees', x: 45, y: 65, description: 'Base secrète des combattants contre le Cercle des Cendres', dangerLevel: 'medium', level: '8+', services: ['forge', 'herboriste'], connectedTo: ['oasis-ombre', 'forteresse-ombre'], icon: '⚔️' },
  { id: 'tour-ossements', name: 'Tour des Ossements', type: 'dungeon', region: 'terres-brulees', x: 75, y: 80, description: 'Tour construite en os, repaire de Vexor le nécromancien', dangerLevel: 'extreme', level: '14+', connectedTo: ['citadelle-ashka', 'temple-ancien'], icon: '💀' },
  { id: 'champ-cendres', name: 'Champ de Cendres', type: 'wilderness', region: 'terres-brulees', x: 58, y: 75, description: 'Plaine de cendres perpétuelles, spectres et revenants', dangerLevel: 'high', level: '12+', connectedTo: ['desert-verre', 'nexus-portails'], icon: '🌫️' },
  { id: 'passe-noire', name: 'Passe Noire', type: 'landmark', region: 'terres-brulees', x: 48, y: 60, description: 'Défilé étroit menant aux Terres Brûlées, dernier avant-poste', dangerLevel: 'medium', level: '6+', connectedTo: ['carrefour', 'camp-resistance', 'desert-verre'], icon: '⛰️' },
];

export const MAP_PATHS: MapPath[] = [
  { id: 'path-sol-carrefour', from: 'sol-aureus', to: 'carrefour', type: 'road', dangerLevel: 'safe', travelDays: 1 },
  { id: 'path-sol-combrelac', from: 'sol-aureus', to: 'combrelac', type: 'road', dangerLevel: 'safe', travelDays: 0.5 },
  { id: 'path-sol-hammerdeep', from: 'sol-aureus', to: 'hammerdeep', type: 'road', dangerLevel: 'low', travelDays: 4 },
  { id: 'path-sol-havre', from: 'sol-aureus', to: 'havre-du-bois', type: 'trail', dangerLevel: 'low', travelDays: 3 },
  { id: 'path-sol-guet', from: 'sol-aureus', to: 'guet-frontiere', type: 'road', dangerLevel: 'low', travelDays: 5 },
  { id: 'path-guet-port', from: 'guet-frontiere', to: 'port-azur', type: 'road', dangerLevel: 'low', travelDays: 3 },
  { id: 'path-guet-gelees', from: 'guet-frontiere', to: 'terres-gelees', type: 'trail', dangerLevel: 'high', travelDays: 7 },
  { id: 'path-hammer-camp', from: 'hammerdeep', to: 'camp-mineurs', type: 'trail', dangerLevel: 'low', travelDays: 1 },
  { id: 'path-hammer-grottes', from: 'hammerdeep', to: 'grottes-cristal', type: 'trail', dangerLevel: 'medium', travelDays: 2 },
  { id: 'path-havre-arbre', from: 'havre-du-bois', to: 'arbre-monde', type: 'trail', dangerLevel: 'low', travelDays: 2 },
  { id: 'path-carrefour-marais', from: 'carrefour', to: 'marais-sale', type: 'road', dangerLevel: 'medium', travelDays: 3 },
  { id: 'path-marais-forteresse', from: 'marais-sale', to: 'forteresse-ombre', type: 'trail', dangerLevel: 'high', travelDays: 2 },
  { id: 'path-marais-blackwood', from: 'marais-sale', to: 'manoir-blackwood', type: 'trail', dangerLevel: 'medium', travelDays: 1 },
  { id: 'path-forteresse-nexus', from: 'forteresse-ombre', to: 'nexus-portails', type: 'trail', dangerLevel: 'extreme', travelDays: 5 },
  { id: 'path-nexus-desert', from: 'nexus-portails', to: 'desert-sans-fin', type: 'trail', dangerLevel: 'extreme', travelDays: 3 },
  { id: 'path-desert-temple', from: 'desert-sans-fin', to: 'temple-ancien', type: 'trail', dangerLevel: 'high', travelDays: 4 },
  { id: 'path-hammer-dragon', from: 'hammerdeep', to: 'dragonspine', type: 'mountain', dangerLevel: 'extreme', travelDays: 6 },
  { id: 'path-hammer-celeste', from: 'hammerdeep', to: 'forteresse-celeste', type: 'mountain', dangerLevel: 'low', travelDays: 3 },
  // === EXPANSION PATHS: Val Doré ===
  { id: 'path-sol-pontdore', from: 'sol-aureus', to: 'pontdore', type: 'road', dangerLevel: 'safe', travelDays: 0.5 },
  { id: 'path-pontdore-abbaye', from: 'pontdore', to: 'abbaye-solarius', type: 'road', dangerLevel: 'safe', travelDays: 1 },
  { id: 'path-sol-orval', from: 'sol-aureus', to: 'village-orval', type: 'road', dangerLevel: 'safe', travelDays: 1 },
  { id: 'path-carrefour-ferme', from: 'carrefour', to: 'ferme-deux-rivieres', type: 'road', dangerLevel: 'safe', travelDays: 0.5 },
  { id: 'path-combrelac-ruines', from: 'combrelac', to: 'ruines-pont-ancien', type: 'trail', dangerLevel: 'medium', travelDays: 1 },
  { id: 'path-combrelac-moulin', from: 'combrelac', to: 'moulin-valombre', type: 'trail', dangerLevel: 'low', travelDays: 1 },
  { id: 'path-sol-catacombes', from: 'sol-aureus', to: 'catacombes-sol-aureus', type: 'underground', dangerLevel: 'medium', travelDays: 0 },
  // === EXPANSION PATHS: Monts Cœur-de-Fer ===
  { id: 'path-hammer-forgefer', from: 'hammerdeep', to: 'forgefer', type: 'road', dangerLevel: 'safe', travelDays: 1 },
  { id: 'path-forgefer-mines', from: 'forgefer', to: 'mines-mithral', type: 'trail', dangerLevel: 'high', travelDays: 2 },
  { id: 'path-hammer-temple-forge', from: 'hammerdeep', to: 'temple-forge', type: 'road', dangerLevel: 'low', travelDays: 1 },
  { id: 'path-dragon-col', from: 'dragonspine', to: 'col-dragon', type: 'mountain', dangerLevel: 'high', travelDays: 2 },
  { id: 'path-mines-karak', from: 'mines-mithral', to: 'karak-zhul', type: 'underground', dangerLevel: 'high', travelDays: 3 },
  { id: 'path-grottes-pont', from: 'grottes-cristal', to: 'pont-du-vide', type: 'trail', dangerLevel: 'medium', travelDays: 1 },
  // === EXPANSION PATHS: Sylve d'Émeraude ===
  { id: 'path-arbre-clairiere', from: 'arbre-monde', to: 'clairiere-anciens', type: 'trail', dangerLevel: 'low', travelDays: 1 },
  { id: 'path-havre-feuillevent', from: 'havre-du-bois', to: 'village-feuillevent', type: 'trail', dangerLevel: 'safe', travelDays: 1 },
  { id: 'path-foret-bosquet', from: 'foret-emeraude', to: 'bosquet-corrompu', type: 'trail', dangerLevel: 'high', travelDays: 2 },
  { id: 'path-havre-lac', from: 'havre-du-bois', to: 'lac-miroir', type: 'trail', dangerLevel: 'low', travelDays: 1 },
  { id: 'path-bosquet-ruines', from: 'bosquet-corrompu', to: 'ruines-elfiques', type: 'trail', dangerLevel: 'medium', travelDays: 1 },
  { id: 'path-havre-source', from: 'havre-du-bois', to: 'source-eternelle', type: 'trail', dangerLevel: 'low', travelDays: 1 },
  // === EXPANSION PATHS: Côte des Orages ===
  { id: 'path-port-tempete', from: 'port-azur', to: 'port-tempete', type: 'road', dangerLevel: 'low', travelDays: 2 },
  { id: 'path-tempete-baie', from: 'port-tempete', to: 'baie-naufrageurs', type: 'sea', dangerLevel: 'high', travelDays: 1 },
  { id: 'path-baie-phare', from: 'baie-naufrageurs', to: 'phare-abandonne', type: 'trail', dangerLevel: 'medium', travelDays: 0.5 },
  { id: 'path-tempete-temple', from: 'port-tempete', to: 'temple-englouti', type: 'sea', dangerLevel: 'extreme', travelDays: 3 },
  { id: 'path-tempete-iles', from: 'port-tempete', to: 'iles-pirates', type: 'sea', dangerLevel: 'medium', travelDays: 2 },
  { id: 'path-port-brisants', from: 'port-azur', to: 'village-brisants', type: 'road', dangerLevel: 'low', travelDays: 1 },
  { id: 'path-phare-recifs', from: 'phare-abandonne', to: 'recifs-chantants', type: 'sea', dangerLevel: 'high', travelDays: 1 },
  { id: 'path-guet-fort', from: 'guet-frontiere', to: 'fort-des-vagues', type: 'road', dangerLevel: 'low', travelDays: 1 },
  // === EXPANSION PATHS: Terres Brûlées ===
  { id: 'path-carrefour-passe', from: 'carrefour', to: 'passe-noire', type: 'road', dangerLevel: 'medium', travelDays: 3 },
  { id: 'path-passe-camp', from: 'passe-noire', to: 'camp-resistance', type: 'trail', dangerLevel: 'medium', travelDays: 2 },
  { id: 'path-passe-verre', from: 'passe-noire', to: 'desert-verre', type: 'trail', dangerLevel: 'high', travelDays: 3 },
  { id: 'path-verre-oasis', from: 'desert-verre', to: 'oasis-ombre', type: 'trail', dangerLevel: 'high', travelDays: 2 },
  { id: 'path-camp-oasis', from: 'camp-resistance', to: 'oasis-ombre', type: 'trail', dangerLevel: 'medium', travelDays: 1 },
  { id: 'path-nexus-sceaux', from: 'nexus-portails', to: 'nexus-sceaux', type: 'trail', dangerLevel: 'extreme', travelDays: 2 },
  { id: 'path-desert-citadelle', from: 'desert-sans-fin', to: 'citadelle-ashka', type: 'trail', dangerLevel: 'extreme', travelDays: 4 },
  { id: 'path-citadelle-nexus', from: 'citadelle-ashka', to: 'nexus-sceaux', type: 'trail', dangerLevel: 'extreme', travelDays: 2 },
  { id: 'path-temple-tour', from: 'temple-ancien', to: 'tour-ossements', type: 'trail', dangerLevel: 'extreme', travelDays: 3 },
  { id: 'path-verre-cendres', from: 'desert-verre', to: 'champ-cendres', type: 'trail', dangerLevel: 'high', travelDays: 2 },
  { id: 'path-cendres-nexus', from: 'champ-cendres', to: 'nexus-portails', type: 'trail', dangerLevel: 'extreme', travelDays: 3 },
];

// Helper pour trouver une scène par ID
export function findScene(sceneId: string): BookScene | undefined {
  for (const act of GM_BOOK.acts) {
    for (const chapter of act.chapters) {
      for (const scene of chapter.scenes) {
        if (scene.id === sceneId) return scene;
      }
    }
  }
  return undefined;
}

// Helper pour trouver un chapitre par ID
export function findChapter(chapterId: string): BookChapter | undefined {
  for (const act of GM_BOOK.acts) {
    for (const chapter of act.chapters) {
      if (chapter.id === chapterId) return chapter;
    }
  }
  return undefined;
}

// Helper pour tous les scenes dans l'ordre
export function getAllScenes(): BookScene[] {
  const scenes: BookScene[] = [];
  for (const act of GM_BOOK.acts) {
    for (const chapter of act.chapters) {
      scenes.push(...chapter.scenes);
    }
  }
  return scenes;
}
