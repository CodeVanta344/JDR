/**
 * GUIDE NARRATIF — Actes 1 & 2 : Expansion complète
 * Scènes détaillées pour les chapitres ch-1-1 à ch-1-4 (Acte 1) et ch-2-3 à ch-2-6 (Acte 2)
 *
 * Contenu : textes à lire à voix haute, notes MJ, dialogues PNJ,
 * objectifs, transitions, jets de compétence, rencontres, butin.
 */

import type { NarrativeScene } from './narrative-guide-data';

// ============================================================================
// ACTE 1 — LES OMBRES DE L'ÂGE D'OR
// ============================================================================

// --------------------------------------------------------------------------
// Chapitre 1-1 : La Cité Dorée (ch-1-1)
// --------------------------------------------------------------------------

const CH_1_1_SCENES: NarrativeScene[] = [
  {
    id: 'act1_ch1_s1_arrival',
    chapterId: 'ch-1-1',
    sceneNumber: 1,
    title: 'Les Portes du Matin',
    type: 'narration',
    readAloud: `La route pavée serpente à travers les collines dorées du Val, bordée de champs de blé mûr et de vergers croulant sous les fruits. Le soleil décline, et c'est à ce moment précis que Sol-Aureus se révèle : une couronne de pierre blanche posée sur la dernière colline, dont les murailles captent la lumière mourante et la transforment en or pur.

Devant les Portes du Matin — deux battants de chêne cerclés de bronze, hauts de quinze mètres — une file de voyageurs patiente dans la poussière du soir. Des marchands halflings discutent prix avec des gardes fatigués, des pèlerins en robe safran psalmodient des prières à Solarius, et un chariot de foin bloque la moitié du passage tandis que son propriétaire se dispute avec un bœuf récalcitrant.

L'air porte des odeurs de pain chaud, de fumier et d'épices exotiques. Au-dessus de la porte, gravée dans la pierre, une inscription en lettres d'or proclame : « Que la lumière guide ceux qui entrent et protège ceux qui demeurent. » Les runes de protection anciennes qui encadrent l'inscription pulsent doucement d'un bleu opalescent.

Quand vient votre tour, un sergent moustachu, les doigts tachés d'encre, lève des yeux fatigués depuis son registre. « Noms, origines, motif de la visite. Et si vous transportez des armes enchantées, déclarez-les maintenant. La Guilde des Arcanes a l'humour chatouilleux ces temps-ci. »`,
    gmNotes: `Cette scène d'ouverture donne le ton de la campagne. Laissez les joueurs décrire leurs personnages et leur raison d'être à Sol-Aureus. Le Sergent Dorval est un premier contact utile : il peut mentionner le Sanglier Doré comme auberge abordable, prévenir que "les temps sont bizarres" sans en dire plus, et noter un détail sur chaque PJ (utile plus tard). Si un joueur a un passé criminel, Dorval pourrait hésiter devant un avis de recherche — tension légère mais pas bloquante. Objectif : que les joueurs se sentent ACCUEILLIS dans le monde avant que les ennuis ne commencent. Gardez un rythme détendu.`,
    dialogues: [
      {
        npcId: 'npc_dorval',
        npcName: 'Sergent Dorval',
        lines: [
          { trigger: 'Accueil standard', text: `Bienvenue à Sol-Aureus. Noms, origines, motif — dans cet ordre, s'il vous plaît. Non, je n'ai pas besoin de votre histoire de vie, juste les faits.`, tone: 'fatigué-professionnel' },
          { trigger: 'Demande de directions', text: `Pour dormir ? Le Sanglier Doré, rue des Tonneliers, quartier du Marché. Dites à Brok que Dorval vous envoie, il vous fera un prix. Enfin, peut-être. Ça dépend de son humeur et de la qualité de la bière du jour.`, tone: 'serviable' },
          { trigger: 'Rumeurs / temps bizarres', text: `*Il baisse la voix.* Entre nous... évitez le Quartier Bas la nuit. On a eu des disparitions. Officiellement c'est « des fugues ». Officieusement... personne ne fugue en laissant ses chaussures et son dîner sur la table. Mais vous n'avez rien entendu, hein.`, tone: 'conspirateur' },
          { trigger: 'Armes enchantées', text: `Si vous avez des armes enchantées, déclarez-les. Le Haut-Mage Theron a décrété un recensement magique il y a deux mois. Personne ne sait pourquoi, mais les mages qui ne déclarent pas finissent convoqués à la Tour des Arcanes. Et personne ne veut ça.`, tone: 'avertissement' },
        ],
      },
    ],
    objectives: [
      { description: 'Entrer dans Sol-Aureus par les Portes du Matin', type: 'explore', optional: false },
      { description: 'Se présenter au Sergent Dorval', type: 'talk', optional: false },
      { description: 'Obtenir des indications vers le Sanglier Doré', type: 'talk', optional: true },
      { description: 'Recueillir une première rumeur sur les disparitions', type: 'investigate', optional: true },
    ],
    transitions: [
      { condition: 'Les PJ entrent dans la ville normalement', nextScene: 'act1_ch1_s2_city_walk', label: '→ Traversée de la ville' },
      { condition: 'Un PJ tente une entrée discrète', nextScene: 'act1_ch1_s2_city_walk', label: '→ Passage par le Quartier Bas', alternative: 'act1_ch1_s2_city_walk' },
    ],
    skillChecks: [
      { skill: 'Tromperie', dc: 40, success: 'Dorval note l\'identité fictive sans sourciller. Vous êtes dans la place.', failure: 'Dorval plisse les yeux. Il note quelque chose dans la marge du registre — un petit symbole. Pas bon signe.' },
      { skill: 'Perception', dc: 30, success: 'Vous remarquez que les runes de protection au-dessus de la porte clignotent de manière irrégulière — comme un battement de cœur arythmique. Ce n\'est pas normal.', failure: 'Rien de particulier ne retient votre attention.' },
    ],
    estimatedMinutes: 15,
    mood: 'émerveillement-quotidien',
    music: 'Thème de cité médiévale — flûtes, foule, chevaux',
    location: 'Sol-Aureus — Portes du Matin',
  },
  {
    id: 'act1_ch1_s2_city_walk',
    chapterId: 'ch-1-1',
    sceneNumber: 2,
    title: 'La Traversée de Sol-Aureus',
    type: 'exploration',
    readAloud: `Sol-Aureus se déploie autour de vous comme un livre d'images vivant. La rue principale — la Via Solaris — est une artère large et pavée de dalles blanches, bordée de bâtiments aux façades peintes de fresques représentant les légendes d'Aethelgard. Des enseignes de fer forgé grincent doucement dans la brise du soir.

Le Quartier du Marché bourdonne encore d'activité malgré l'heure tardive. Des marchands démontent leurs étals tandis que d'autres — ceux de la nuit — commencent à installer les leurs. L'odeur des épices se mêle à celle du cuir, de la cire d'abeille et des fleurs fraîches. Un barde halfling joue du luth assis sur une fontaine en forme de griffon, sa musique se perdant dans le brouhaha ambiant.

Au loin, trois silhouettes dominent le paysage urbain : la Tour des Arcanes, spirale de cristal et d'acier qui défie les lois de l'architecture ; le Grand Temple de Solarius, dont le dôme doré rayonne d'une lumière propre ; et le Palais Royal, élégant et fortifié, drapé dans les bannières bleu et or de la Couronne.

Un crieur public, juché sur une caisse, proclame les nouvelles du jour : augmentation des taxes portuaires, tournoi de Solarius annulé « pour raisons budgétaires », et un avis de recherche pour un chat roux répondant au nom de « Général Moustache », perdu dans le quartier des Nobles. Récompense : cinq pièces d'argent.`,
    gmNotes: `Scène libre d'exploration. Laissez les joueurs flâner et absorber l'atmosphère. Quelques points d'intérêt à signaler s'ils demandent : la boutique d'Élise Doigts-d'Argent (achats/vente), le panneau d'affichage de la place (quêtes secondaires), un attroupement autour d'un prédicateur qui annonce la fin du monde (foreshadowing). Le chat « Général Moustache » est une quête secondaire amusante — il est dans les égouts et trouvable au Chapitre 1-2. L'annulation du tournoi est un indice : la Reine détourne les fonds vers les défenses. Gardez un œil sur ce qui intéresse les joueurs pour adapter les hooks futurs.`,
    dialogues: [
      {
        npcId: 'npc_barde_halfling',
        npcName: 'Pippin Pied-Léger',
        lines: [
          { trigger: 'Musique / conversation', text: `Ah, de nouveaux visages ! Bienvenue, bienvenue ! Pippin Pied-Léger, barde itinérant, à votre service. Vous voulez une chanson ? Je connais « La Ballade du Dragon Rouillé », « L'Hymne des Sept Héros »... ou, si vous êtes d'humeur sombre, « Les Ombres sous Sol-Aureus ». *Il baisse la voix.* Celle-là, c'est ma composition récente. Personne ne veut l'entendre. Ça me dit que j'ai touché juste.`, tone: 'jovial-mystérieux' },
          { trigger: 'Les Ombres sous Sol-Aureus', text: `*Il pince une corde grave.* C'est une chanson sur ce que tout le monde murmure et personne ne dit à voix haute. Les gens disparaissent, ami. Pas les vagabonds — des gens bien. Et la nuit, si vous tendez l'oreille au Quartier Bas... vous entendez des bruits. Sous la terre. Comme si quelque chose respirait.`, tone: 'sombre' },
        ],
      },
      {
        npcId: 'npc_predicateur',
        npcName: 'Frère Cassiel',
        lines: [
          { trigger: 'Discours public', text: `Repentez-vous ! Les signes sont là ! Les étoiles tremblent, les ombres dansent à rebours, et les anciens mots reviennent ! L'Ère des Cendres n'est pas finie — elle n'a fait que dormir ! Les Sceaux craquent, mes frères ! Les Sceaux craquent et personne ne veut voir !`, tone: 'fanatique' },
          { trigger: 'Conversation privée', text: `*Ses yeux deviennent soudain lucides.* Vous me prenez pour un fou ? Tant mieux. Les fous disent la vérité parce que personne ne les écoute. J'étais prêtre au Grand Temple avant. Jusqu'à ce que je voie les visions. Le Haut-Prêtre Valerius les voit aussi, mais lui, il se tait. Allez lui demander pourquoi.`, tone: 'amer-lucide' },
        ],
      },
    ],
    objectives: [
      { description: 'Traverser Sol-Aureus et découvrir la ville', type: 'explore', optional: false },
      { description: 'Trouver le Sanglier Doré', type: 'explore', optional: false },
      { description: 'Écouter les rumeurs du crieur public', type: 'investigate', optional: true },
      { description: 'Parler au barde Pippin', type: 'talk', optional: true },
      { description: 'Écouter le prédicateur Frère Cassiel', type: 'talk', optional: true },
    ],
    transitions: [
      { condition: 'Les PJ arrivent au Sanglier Doré', nextScene: 'act1_ch1_s3_tavern', label: '→ Le Sanglier Doré' },
    ],
    estimatedMinutes: 20,
    mood: 'vie-urbaine',
    music: 'Marché médiéval — luth, conversations, cloches',
    location: 'Sol-Aureus — Via Solaris et Quartier du Marché',
  },
  {
    id: 'act1_ch1_s3_tavern',
    chapterId: 'ch-1-1',
    sceneNumber: 3,
    title: 'Le Sanglier Doré',
    type: 'dialogue',
    readAloud: `L'enseigne du Sanglier Doré — un sanglier joufflu peint à l'or fin — grince au-dessus d'une porte de chêne épaisse. En poussant le battant, une vague de chaleur, de bruit et d'odeurs vous enveloppe.

La salle commune est vaste et accueillante. Des poutres sombres soutiennent un plafond bas, décorées de boucliers cabossés et d'armes rouillées — trophées d'une vie antérieure. Un feu crépite dans une cheminée assez grande pour y rôtir un bœuf entier. Les tables sont occupées par un mélange éclectique de clients : des artisans qui discutent, des mercenaires qui boivent en silence, un couple d'elfes qui jouent aux échecs avec une concentration meurtrière, et un nain ronflant dans un coin, sa chope encore à la main.

Derrière le comptoir, un colosse humain aux bras comme des troncs d'arbre essuie un verre avec un chiffon douteux. Brok Mâchoire-de-Fer — le patron. Sa cicatrice, qui court de l'oreille gauche au menton, se plisse quand il sourit. Et il sourit en vous voyant entrer.

« Nouveaux en ville, hein ? Ça se voit à vos bottes propres. Entrez, asseyez-vous. La bière est bonne, le ragoût est meilleur, et les chambres sont presque propres. Qu'est-ce que je vous sers ? »`,
    gmNotes: `Le Sanglier Doré est le hub social du début de campagne. Brok est un ancien mercenaire reconverti — il sait se battre et il connaît tout le monde. Il ne parle pas de son passé dans le Syndicat de l'Ombre sauf si on le pousse. Sa cave est infestée depuis quelques jours (quête secondaire qui sert d'introduction au donjon des égouts). Le nain qui dort est Grimjaw, un prospecteur qui a des informations sur les mines de Hammerdeep (foreshadowing Acte 2). Encouragez les joueurs à s'installer, à interagir avec les clients, et à manger un ragoût virtuel. Moments de calme avant la tempête.`,
    dialogues: [
      {
        npcId: 'npc_brok',
        npcName: 'Brok Mâchoire-de-Fer',
        lines: [
          { trigger: 'Accueil', text: `La bière, c'est 2 pièces de cuivre. Le ragoût, 5. Une chambre pour la nuit, 1 pièce d'argent, petit-déjeuner compris. Et non, le petit-déjeuner n'est pas négociable — c'est des œufs et du pain. Pas de la cuisine elfique.`, tone: 'bourru-amical' },
          { trigger: 'Rumeurs', text: `*Il se penche.* Vous voulez des rumeurs ? J'en ai pour tous les goûts. La Tour des Arcanes a recruté trente mages supplémentaires le mois dernier — personne ne sait pourquoi. Le tournoi de Solarius est annulé — officiellement c'est le budget, officieusement, les soldats sont déployés ailleurs. Et... *il hésite.* Y'a des bruits dans ma cave. Pas des rats. Quelque chose de plus gros. Ça vient d'en dessous.`, tone: 'conspirateur' },
          { trigger: 'La cave', text: `Trois nuits de suite. Des grattements, des coups. Mon chat refuse d'y descendre, et croyez-moi, ce chat n'a peur de rien — il a tué un blaireau la semaine dernière. Si vous êtes du genre aventurier... j'offre le gîte et le couvert pendant une semaine à qui règle ce problème. Plus une bourse de 20 pièces d'or.`, tone: 'sérieux' },
        ],
      },
      {
        npcId: 'npc_grimjaw',
        npcName: 'Grimjaw le Prospecteur',
        lines: [
          { trigger: 'Le réveiller', text: `*Il sursaute, renversant sa chope.* Hein ? Quoi ? Non, je dormais pas, je réfléchissais ! *Il se frotte les yeux.* Grimjaw, prospecteur indépendant. Buveur professionnel. Qu'est-ce que vous voulez ?`, tone: 'bougon' },
          { trigger: 'Hammerdeep / Les mines', text: `*Son regard se fait distant.* J'ai quitté Hammerdeep il y a six mois. Les mines profondes... y'a quelque chose qui ne va pas là-dessous. Le Niveau 12, ils l'ont fermé. Officiellement pour « maintenance structurelle ». Mais j'ai parlé aux mineurs... ils ont trouvé quelque chose. Quelque chose qui bouge dans le noir. Et le Roi Thorin refuse d'en parler.`, tone: 'grave-éméché' },
        ],
      },
    ],
    objectives: [
      { description: 'S\'installer au Sanglier Doré', type: 'explore', optional: false },
      { description: 'Discuter avec Brok et apprendre les rumeurs', type: 'talk', optional: false },
      { description: 'Accepter la quête de la cave (optionnel)', type: 'talk', optional: true },
      { description: 'Parler à Grimjaw le prospecteur nain', type: 'talk', optional: true },
    ],
    transitions: [
      { condition: 'Les PJ acceptent d\'explorer la cave de Brok', nextScene: 'act1_ch1_s4_cellar', label: '→ La Cave du Sanglier Doré' },
      { condition: 'Les PJ se couchent et attendent le matin', nextScene: 'act1_ch2_s1_recruitment', label: '→ Chapitre 1-2 : Convocation par la Garde' },
    ],
    estimatedMinutes: 20,
    mood: 'chaleur-mystère',
    music: 'Taverne médiévale — luth, conversations, feu de cheminée',
    location: 'Sol-Aureus — Le Sanglier Doré',
  },
  {
    id: 'act1_ch1_s4_cellar',
    chapterId: 'ch-1-1',
    sceneNumber: 4,
    title: 'La Cave du Sanglier Doré',
    type: 'combat',
    readAloud: `L'escalier de pierre descend en colimaçon dans l'obscurité. Brok vous tend une lanterne en grimaçant : « La cave fait trois salles. Tonneaux dans la première, réserves sèches dans la deuxième, et la troisième... bah, personne n'y va. C'est juste un cul-de-sac. Enfin, c'était juste un cul-de-sac. »

La première salle sent le vin et le moisi. Des tonneaux s'alignent contre les murs, certains renversés, leur contenu répandu sur les dalles. Des griffures profondes marquent le bois — pas des marques de rat.

Dans la deuxième salle, les étagères de provisions sont dévastées. De la farine éparpillée, des sacs éventrés, et au sol... des empreintes. Pas humaines. Trois doigts, chacun terminé par une griffe. Les traces mènent vers le fond de la cave, là où le mur de pierre présente une fissure — une ouverture récente, comme si quelque chose avait forcé son passage depuis l'autre côté.

De l'autre côté du trou, l'air est froid et humide. L'odeur change : pierre ancienne, moisissure millénaire, et une pointe de soufre. Vous n'êtes plus dans la cave de Brok. Vous êtes dans quelque chose de beaucoup plus vieux.`,
    gmNotes: `COMBAT : 2 Rejetons d'Ombre (CR 1/2 chacun) + 1 Rôdeur d'Ombre (CR 1). Les rejetons attaquent de front pendant que le rôdeur se cache dans l'obscurité et frappe par surprise. Lumière = avantage pour les PJ. Ce combat est un tutoriel — si les PJ sont en difficulté, faites fuir les créatures vers les égouts après 3 rounds. Après le combat, la fissure mène à un tunnel ashkan ancien avec des runes effacées sur les murs. Un jet d'Arcanes DC 25 révèle que ces runes étaient des protections... qui ont été neutralisées. C'est le premier fil qui mène au chapitre suivant.`,
    dialogues: [],
    objectives: [
      { description: 'Explorer la cave et trouver la source des bruits', type: 'explore', optional: false },
      { description: 'Vaincre les créatures d\'ombre', type: 'combat', optional: false },
      { description: 'Examiner le tunnel ashkan derrière la fissure', type: 'investigate', optional: false },
    ],
    transitions: [
      { condition: 'Combat terminé, tunnel découvert', nextScene: 'act1_ch1_s5_report_brok', label: '→ Rapport à Brok' },
    ],
    skillChecks: [
      { skill: 'Perception', dc: 25, success: 'Vous repérez le Rôdeur d\'Ombre tapi au plafond avant qu\'il ne frappe — pas de surprise.', failure: 'Le Rôdeur surgit du plafond — les créatures ont la surprise au premier round.' },
      { skill: 'Arcanes', dc: 25, success: 'Les runes sur les murs du tunnel sont de l\'ashkan ancien — des sceaux de protection. Ils ont été méthodiquement désactivés. Ce n\'est pas un accident.', failure: 'Les runes sont trop effacées pour être lues.' },
      { skill: 'Survie', dc: 20, success: 'Les empreintes à trois griffes sont fraîches — moins de 24 heures. Les créatures viennent des profondeurs et remontent régulièrement.', failure: 'Impossible de dater les empreintes.' },
    ],
    encounters: ['2x Rejeton d\'Ombre (CR 1/2)', '1x Rôdeur d\'Ombre (CR 1)'],
    loot: ['Essence d\'Ombre x2 (composant alchimique)', 'Fragment de rune ashkane (objet de quête)'],
    estimatedMinutes: 25,
    mood: 'tension-horreur',
    music: 'Souterrain — gouttes d\'eau, grondements lointains',
    location: 'Sol-Aureus — Cave du Sanglier Doré / Tunnel Ashkan',
  },
  {
    id: 'act1_ch1_s5_report_brok',
    chapterId: 'ch-1-1',
    sceneNumber: 5,
    title: 'Fin de soirée au Sanglier Doré',
    type: 'dialogue',
    readAloud: `Vous remontez de la cave, couverts de poussière et de sang noir qui s'évapore au contact de la lumière comme de la brume matinale. Brok vous attend en haut des marches, les bras croisés, la mâchoire serrée.

En voyant le sang d'ombre sur vos armes, il pâlit — chose remarquable pour un homme qui a survécu à vingt ans de mercenariat. Il écoute votre rapport en silence, puis verrouille la porte de la cave avec un cadenas qu'il sort d'un tiroir.

« Des créatures d'ombre. Dans MA cave. » Il se sert un verre de quelque chose de fort et le vide d'un trait. « Demain matin, première heure, je préviens la Garde. Vous, vous devriez y aller aussi. Le Capitaine-Général Marcus... il cherche des gens comme vous. Des gens qui ne tournent pas les talons quand les ombres deviennent réelles. »

Il pousse vers vous une bourse de cuir et une clé. « Vingt pièces d'or, comme promis. Et la chambre du fond — la meilleure. Avec un verrou solide. Cette nuit, je vous conseille de dormir avec une lumière allumée. »`,
    gmNotes: `Fin du chapitre 1-1. Brok est désormais un allié fidèle — il offrira toujours le gîte et le couvert gratuitement. Sa mention du Capitaine-Général Marcus est le hook vers le chapitre 1-2. Si les PJ n'ont pas exploré la cave, Brok les convoque le lendemain matin en urgence (les bruits ont empiré) — le chapitre 1-2 peut commencer en parallèle. Distribuez XP et laissez les joueurs faire un repos long. Pendant la nuit, décrivez des rêves troublants : des yeux rouges dans l'obscurité, des murmures dans une langue inconnue, la sensation d'être observé. Foreshadowing subtil.`,
    dialogues: [
      {
        npcId: 'npc_brok',
        npcName: 'Brok Mâchoire-de-Fer',
        lines: [
          { trigger: 'Réaction au rapport', text: `*Il regarde le sang noir qui s'évapore de vos vêtements.* J'ai vu beaucoup de choses dans ma vie. Des trolls, des bandits, un dragon une fois — de loin. Mais des créatures d'ombre... ça, c'est autre chose. C'est de la magie ancienne. De la mauvaise magie ancienne.`, tone: 'inquiet' },
          { trigger: 'Le Capitaine-Général', text: `Marcus est un type bien. Dur, mais droit. Si quelqu'un peut faire quelque chose pour cette ville, c'est lui. Dites-lui que Brok vous envoie. Et... ne mentionnez pas mon ancien métier. C'est du passé.`, tone: 'sérieux' },
          { trigger: 'Passé de Brok (si poussé)', text: `*Long silence.* J'étais quelqu'un d'autre, avant. Quelqu'un que j'aime pas me rappeler. Le Syndicat de l'Ombre... on croit qu'on contrôle les ombres quand on travaille pour eux. En réalité, ce sont les ombres qui vous contrôlent. J'ai quitté quand j'ai compris ça. *Il serre les poings.* Et maintenant, les ombres viennent me retrouver dans ma propre cave. Y'a une ironie là-dedans.`, tone: 'amer' },
        ],
      },
    ],
    objectives: [
      { description: 'Faire un rapport à Brok', type: 'talk', optional: false },
      { description: 'Recevoir la récompense', type: 'special', optional: false },
      { description: 'Apprendre l\'existence du Capitaine-Général Marcus', type: 'talk', optional: false },
    ],
    transitions: [
      { condition: 'Repos long terminé — FIN DU CHAPITRE 1-1', nextScene: 'act1_ch2_s1_recruitment', label: '→ Chapitre 1-2 : Sous la Surface' },
    ],
    loot: ['20 PO', 'Chambre gratuite au Sanglier Doré (permanent)', 'Clé de la meilleure chambre'],
    estimatedMinutes: 10,
    mood: 'conclusion-inquiète',
    music: 'Nuit calme — crépitements de feu, silence',
    location: 'Sol-Aureus — Le Sanglier Doré',
  },
];

// --------------------------------------------------------------------------
// Chapitre 1-2 : Sous la Surface (ch-1-2)
// --------------------------------------------------------------------------

const CH_1_2_SCENES: NarrativeScene[] = [
  {
    id: 'act1_ch2_s1_recruitment',
    chapterId: 'ch-1-2',
    sceneNumber: 1,
    title: 'La Convocation du Capitaine-Général',
    type: 'dialogue',
    readAloud: `Le matin arrive trop vite. La lumière du soleil filtre à travers les volets, mais elle semble plus pâle que la veille — comme si un voile invisible s'était posé sur Sol-Aureus pendant la nuit.

À peine descendus dans la salle commune, vous trouvez Brok en grande discussion avec un officier de la Garde Royale en armure polie. Le Lieutenant Kael — un homme mince, le regard vif, le type du soldat qui pense autant qu'il se bat — se tourne vers vous en vous voyant.

« Vous êtes les aventuriers qui ont nettoyé la cave ? Impressionnant. Le Capitaine-Général Marcus vous attend au Palais Royal. Immédiatement. Il dit que vous avez trouvé quelque chose qu'il cherche depuis des semaines. Prenez vos affaires — on ne reviendra peut-être pas ici ce soir. »

Sa main repose sur le pommeau de son épée — pas menaçant, mais... prêt. Comme un homme qui sait que le danger n'est jamais loin.`,
    gmNotes: `Le Lieutenant Kael est un PNJ récurrent — futur allié ou rival selon les choix des joueurs. Il est efficace, loyal, mais légèrement envieux des aventuriers (lui est coincé dans la hiérarchie militaire). Au Palais, la scène de briefing réunit trois figures : Marcus (pragmatique), le Haut-Mage Theron (académique), et Maestra Selyne (mystique). Chacun donne une perspective différente sur la menace. La récompense proposée est de 200 PO par personne + insignes d'enquêteur temporaire. Négociable avec Persuasion DC 45.`,
    dialogues: [
      {
        npcId: 'npc_kael',
        npcName: 'Lieutenant Kael',
        lines: [
          { trigger: 'Sur la route du Palais', text: `Quarante-sept disparitions en trois mois. Pas des vagabonds — des artisans, un soldat, même un mage de la Guilde. Aucun corps. Aucune rançon. La Garde patrouille, mais on ne sait pas ce qu'on cherche. Le Général espère que vous, si.`, tone: 'professionnel' },
          { trigger: 'Sur Marcus', text: `Le Capitaine-Général est le meilleur soldat que j'aie jamais servi. Dur mais juste. Il ne dort plus depuis un mois — cette affaire le ronge. Ne le faites pas attendre.`, tone: 'respectueux' },
        ],
      },
      {
        npcId: 'npc_marcus',
        npcName: 'Capitaine-Général Marcus',
        lines: [
          { trigger: 'Accueil au Palais', text: `*Un homme dur, la cinquantaine, le regard d'acier.* Pas de titres, pas de protocole. On n'a pas le temps. Asseyez-vous. Ce que vous avez trouvé dans cette cave confirme ce que je redoute depuis des semaines : quelque chose remonte des profondeurs de Sol-Aureus.`, tone: 'grave' },
          { trigger: 'La mission', text: `Les égouts de Sol-Aureus cachent un réseau de tunnels bien plus anciens — des vestiges ashkans. C'est de là que viennent vos créatures d'ombre. Votre mission : descendre, cartographier, identifier la source. Et si possible... l'arrêter.`, tone: 'autoritaire' },
          { trigger: 'Équipement', text: `*Il ouvre un coffre.* Torches enchantées, potions de soin, carte des égouts — elle date mais le réseau principal n'a pas changé. Et ces insignes. Avec ça, chaque garde de la ville vous aidera. Ne les perdez pas.`, tone: 'expéditif' },
        ],
      },
      {
        npcId: 'npc_theron',
        npcName: 'Haut-Mage Theron',
        lines: [
          { trigger: 'Analyse magique', text: `*Il ajuste ses lunettes épaisses.* Le Weave — le tissu de magie — montre des perturbations sous Sol-Aureus. Comme des vagues concentriques. Quelque chose pousse depuis les couches anciennes de magie, celles que nous avons scellées après la chute d'Ashka. Si vous trouvez des inscriptions ashkanes, ne touchez rien. Notez tout. Revenez me voir.`, tone: 'professorial' },
        ],
      },
      {
        npcId: 'npc_selyne',
        npcName: 'Maestra Selyne',
        lines: [
          { trigger: 'Prophétie', text: `*Ses yeux violets semblent voir au-delà de vous.* Les fils du destin convergent. Ce que vous trouverez en dessous changera votre compréhension du monde. Les anciens sceaux... *elle s'arrête.* Vous n'êtes pas prêts pour la vérité entière. Pas encore. Mais vous le serez. C'est pour cela que vous êtes ici.`, tone: 'mystique' },
        ],
      },
    ],
    objectives: [
      { description: 'Se rendre au Palais Royal avec le Lieutenant Kael', type: 'explore', optional: false },
      { description: 'Recevoir le briefing du Capitaine-Général Marcus', type: 'talk', optional: false },
      { description: 'Accepter la mission d\'exploration des égouts', type: 'talk', optional: false },
      { description: 'Consulter le Haut-Mage Theron pour des informations supplémentaires', type: 'talk', optional: true },
    ],
    transitions: [
      { condition: 'Mission acceptée, PJ prêts à descendre', nextScene: 'act1_ch2_s2_sewers_entry', label: '→ Descente dans les égouts' },
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 45, success: 'Marcus hoche la tête. « Vous avez du cran. » +50 PO d\'avance, 2 potions de soin supplémentaires, et Kael vous accompagne.', failure: 'Marcus fronce les sourcils. « C\'est tout ce que j\'ai. À prendre ou à laisser. »' },
      { skill: 'Perspicacité', dc: 35, success: 'Selyne en sait bien plus qu\'elle ne dit. Elle teste les PJ — elle sait exactement ce qui se passe sous Sol-Aureus.', failure: 'Selyne reste indéchiffrable.' },
    ],
    loot: ['3x Torches Enchantées', '2x Potions de Soin', 'Carte des Égouts', 'Insignes d\'Enquêteur Temporaire'],
    estimatedMinutes: 20,
    mood: 'gravité-mission',
    music: 'Thème royal sombre — cordes, cuivres, tambours lointains',
    location: 'Sol-Aureus — Palais Royal, Salle du Conseil',
  },
  {
    id: 'act1_ch2_s2_sewers_entry',
    chapterId: 'ch-1-2',
    sceneNumber: 2,
    title: 'La Descente',
    type: 'exploration',
    readAloud: `L'accès aux égouts se fait par une grille de fer dans une ruelle derrière le Grand Temple. Deux gardes soulèvent la plaque avec effort — le métal grince comme s'il protestait. Un escalier de pierre plonge dans une obscurité qui semble plus épaisse que la normale, plus... vivante.

L'odeur vous frappe d'abord : eau stagnante, moisissure, et cette pointe métallique que vous reconnaissez maintenant — l'odeur des créatures d'ombre. Vos torches enchantées projettent une lumière bleutée sur les murs de brique couverts de mousse et de champignons phosphorescents.

Le réseau d'égouts de Sol-Aureus est un labyrinthe de tunnels voûtés, de canaux d'eau brunâtre, et de passerelles glissantes. L'eau vous arrive aux chevilles, froide et désagréable. Des rats fuient la lumière dans un concert de couinements. C'est presque rassurant — les rats fuient AUSSI les créatures d'ombre. Leur présence signifie que cette zone est encore « sûre ».

Mais au bout d'un moment, les rats disparaissent. Le silence tombe comme un couvercle. Et dans l'eau trouble, vos reflets commencent à... bouger indépendamment de vous.`,
    gmNotes: `L'exploration des égouts se fait en trois phases : zone sûre (rats, champignons, graffitis — ambiance), zone de transition (silence, anomalies d'ombre, traces de combat — tension), et zone profonde (tunnels ashkans, runes, Sceau). Préparez trois jets de Navigation DC 30 pour ne pas se perdre. Échec = 1h supplémentaire + rencontre aléatoire. La découverte clé est un campement abandonné d'explorateurs précédents — des notes éparpillées mentionnent « les yeux dans le mur » et « les runes qui saignent ». L'un des explorateurs est mort sur place — squelette avec un journal partiellement lisible.`,
    dialogues: [],
    objectives: [
      { description: 'Naviguer dans le réseau d\'égouts vers les tunnels profonds', type: 'explore', optional: false },
      { description: 'Découvrir le campement abandonné des explorateurs', type: 'investigate', optional: false },
      { description: 'Récupérer le journal de l\'explorateur mort', type: 'collect', optional: true },
    ],
    transitions: [
      { condition: 'Arrivée dans les tunnels ashkans', nextScene: 'act1_ch2_s3_ashkan_tunnels', label: '→ Les Tunnels Ashkans' },
    ],
    skillChecks: [
      { skill: 'Navigation', dc: 30, success: 'Vous trouvez le chemin efficacement. Les marques de griffe sur les murs servent de fil conducteur vers la source.', failure: 'Vous tournez en rond pendant une heure. Jet de rencontre aléatoire.' },
      { skill: 'Investigation', dc: 25, success: 'Le journal de l\'explorateur mort révèle que cinq personnes sont descendues il y a trois semaines. Seul l\'auteur a survécu assez longtemps pour écrire. Le dernier mot est « Sceau ».', failure: 'Le journal est trop endommagé par l\'humidité. Quelques mots isolés : « ombre », « profond », « trop tard ».' },
      { skill: 'Perception', dc: 30, success: 'Vous remarquez que vos reflets dans l\'eau bougent avec un léger décalage — comme si l\'ombre avait sa propre volonté.', failure: 'L\'eau trouble ne révèle rien de particulier.' },
    ],
    loot: ['Journal de l\'Explorateur (objet de quête)', 'Dague en argent +1 (sur le squelette)', '15 PO'],
    estimatedMinutes: 25,
    mood: 'tension-claustrophobie',
    music: 'Souterrain — gouttes d\'eau, échos, silence oppressant',
    location: 'Sol-Aureus — Égouts principaux',
  },
  {
    id: 'act1_ch2_s3_ashkan_tunnels',
    chapterId: 'ch-1-2',
    sceneNumber: 3,
    title: 'Les Tunnels Ashkans',
    type: 'combat',
    readAloud: `Les briques des égouts cèdent soudain la place à de la pierre noire polie, lisse comme du verre. Les tunnels changent de géométrie — les arcs deviennent plus aigus, les proportions plus étranges, comme si les constructeurs n'étaient pas tout à fait humains. Des runes couvrent chaque surface, gravées avec une précision surnaturelle. La plupart sont éteintes et inertes, mais certaines pulsent encore d'une lueur vert-noir maladive.

Au centre d'une salle circulaire, un cercle de runes de dix mètres de diamètre est gravé dans le sol. C'est un Sceau — ou plutôt, c'était un Sceau. De profondes fissures le lacèrent, et de ces fissures s'élève une brume noire qui rampe le long du sol comme un être vivant. La température chute de dix degrés.

Et dans cette brume, des formes se matérialisent. D'abord translucides, puis de plus en plus solides. Des silhouettes humanoïdes d'encre pure, avec des yeux comme des braises rouges. Quatre d'entre elles. Et derrière elles, quelque chose de plus grand. De plus vieux. Un Gardien Corrompu — une créature massive de pierre et d'ombre, ses yeux anciens brûlant d'une rage millénaire.

Il ouvre une gueule de basalte et rugit. Les murs tremblent. Les runes s'éteignent.

Le combat commence.`,
    gmNotes: `COMBAT MAJEUR. Phase 1 : 4 Démons d'Ombre (CR 1 chacun) attaquent en meute — 2 de front, 2 par les flancs. Phase 2 (round 3) : Le Gardien Corrompu (CR 4, HP 68, ATK +6, AC 16) entre en jeu. Il est lent mais dévastateur. Ses attaques Poing de Pierre (2d8+4) et Souffle de Cendres (cône 6m, 2d8 nécrotique, CD 40 Constitution) sont redoutables. FAIBLESSE : lumière radieuse. Les torches enchantées donnent un avantage aux jets d'attaque contre les Démons. Un sort de Lumière ciblé sur le Gardien lui inflige Désavantage pendant 1 round. Si les PJ ont la Rune de Théodore, elle explose en lumière radieuse (3d6 à toutes les créatures d'ombre dans 6m). Après le combat, examiner le Sceau révèle des marques de ciseau récentes — sabotage délibéré. Un médaillon cultiste est coincé dans une fissure du Sceau.`,
    dialogues: [],
    objectives: [
      { description: 'Vaincre les 4 Démons d\'Ombre', type: 'combat', optional: false },
      { description: 'Vaincre le Gardien Corrompu', type: 'combat', optional: false },
      { description: 'Examiner le Sceau brisé', type: 'investigate', optional: false },
      { description: 'Récupérer le médaillon cultiste', type: 'collect', optional: false },
    ],
    transitions: [
      { condition: 'Victoire et Sceau examiné', nextScene: 'act1_ch2_s4_return', label: '→ Retour à la surface' },
    ],
    skillChecks: [
      { skill: 'Investigation', dc: 35, success: 'Les fissures du Sceau montrent des marques d\'outils. Ce n\'est pas de l\'usure naturelle — quelqu\'un a méthodiquement affaibli le Sceau. Le médaillon porte le symbole d\'un œil ouvert dans un cercle de flammes.', failure: 'Le Sceau est brisé, mais vous ne pouvez pas déterminer comment.' },
      { skill: 'Arcanes', dc: 30, success: 'Le Sceau contenait une magie immensément puissante — de la magie de confinement de niveau divin. Sa rupture a créé une faille vers le Plan d\'Ombre. La faille est petite mais elle grandit.', failure: 'L\'énergie résiduelle est trop chaotique pour être analysée.' },
    ],
    encounters: ['4x Démon d\'Ombre (CR 1)', '1x Gardien Corrompu (CR 4)'],
    loot: ['Médaillon Cultiste (objet de quête)', 'Essence d\'Ombre x4', 'Fragment de Pierre du Gardien (composant)', 'Épée du Gardien Brisée (peut être reforgée)'],
    estimatedMinutes: 35,
    mood: 'horreur-combat-épique',
    music: 'Combat souterrain — percussions, chœurs graves, grondements',
    location: 'Sol-Aureus — Tunnels Ashkans, Salle du Sceau',
  },
  {
    id: 'act1_ch2_s4_return',
    chapterId: 'ch-1-2',
    sceneNumber: 4,
    title: 'Rapport au Palais',
    type: 'dialogue',
    readAloud: `La lumière du jour n'a jamais été aussi belle. Vous émergez des égouts, couverts de crasse, de sang noir et de poussière ashkane, les yeux plissés contre un soleil qui semble presque trop brillant après ces heures dans les ténèbres.

Les gardes à la sortie reculent en voyant le sang d'ombre qui s'évapore de vos armes. L'un d'eux vomit. L'autre vous escorte directement au Palais.

Le Capitaine-Général Marcus vous attend dans la Salle du Conseil, debout, les mains à plat sur la table. Quand il voit le médaillon cultiste — cet œil ouvert dans un cercle de flammes — son visage se ferme comme une porte de coffre-fort.

« Un Sceau brisé. Un culte organisé. Des créatures d'ombre dans les fondations de ma ville. » Il se tourne vers la fenêtre, regardant Sol-Aureus baignée de soleil, si belle, si ignorante du danger sous ses pieds. « La Reine doit être informée. Et vous... vous venez de devenir bien plus importants que des chasseurs de rats. »`,
    gmNotes: `Conclusion du chapitre 1-2. Marcus est visiblement affecté — c'est la première fois que les PJ le voient montrer de l'émotion. Il confisque le médaillon cultiste pour analyse mais laisse les PJ garder le reste. La récompense : 200 PO par personne + titre officiel de « Sentinelles de Sol-Aureus ». Selyne apparaît brièvement et murmure : « Le premier fil est tiré. La tapisserie commence à se défaire. » Elle disparaît avant qu'on puisse l'interroger. Le hook vers les chapitres suivants : Marcus mentionne que d'autres sites de Sceaux existent à travers Aethelgard et que le culte (le Cercle des Cendres) est probablement actif ailleurs. Repos long, montée de niveau possible.`,
    dialogues: [
      {
        npcId: 'npc_marcus',
        npcName: 'Capitaine-Général Marcus',
        lines: [
          { trigger: 'Réception du rapport', text: `*Il retourne le médaillon dans ses mains.* L'Œil de Cendres. C'est le symbole du Cercle des Cendres — un culte qu'on croyait éteint depuis la fin de l'Ère des Cendres. S'ils sont actifs sous Sol-Aureus... *Il frappe la table du poing.* Sous ma ville ! Combien de temps ? Depuis combien de temps creusent-ils sous nos pieds ?`, tone: 'fureur-contenue' },
          { trigger: 'La suite', text: `*Il se calme.* Écoutez. Ce que vous avez découvert change tout. Il y a cinq Sceaux anciens à travers Aethelgard. Si le Cercle des Cendres en a brisé un ici... ils visent probablement les autres. La Reine sera informée ce soir. Reposez-vous. Demain, nous parlerons de ce qui vient ensuite. Parce que cette affaire est bien plus grande qu'une ville.`, tone: 'résigné-déterminé' },
          { trigger: 'Récompense', text: `*Il pousse une bourse lourde vers vous.* Deux cents pièces d'or chacun. Et le titre de Sentinelles de Sol-Aureus. Ça vous ouvrira des portes dans tout le royaume. Vous l'avez mérité. *Pause.* Et je crains que vous en aurez besoin.`, tone: 'respectueux' },
        ],
      },
    ],
    objectives: [
      { description: 'Rapporter les découvertes au Capitaine-Général Marcus', type: 'talk', optional: false },
      { description: 'Remettre le médaillon cultiste', type: 'special', optional: false },
      { description: 'Recevoir la récompense et le titre de Sentinelles', type: 'special', optional: false },
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 1-2', nextScene: 'act1_ch3_s1_shadows_begin', label: '→ Chapitre 1-3 : Les Ombres de Sol-Aureus' },
    ],
    loot: ['200 PO par personnage', 'Titre : Sentinelles de Sol-Aureus', '+15 Réputation Couronne'],
    estimatedMinutes: 15,
    mood: 'révélation-transition',
    music: 'Thème grave — violoncelle, révélation',
    location: 'Sol-Aureus — Palais Royal',
  },
];

// --------------------------------------------------------------------------
// Chapitre 1-3 : Les Ombres de Sol-Aureus (ch-1-3) — NOUVEAU
// --------------------------------------------------------------------------

const CH_1_3_SCENES: NarrativeScene[] = [
  {
    id: 'act1_ch3_s1_shadows_begin',
    chapterId: 'ch-1-3',
    sceneNumber: 1,
    title: 'L\'Enquête dans les Quartiers Nobles',
    type: 'exploration',
    readAloud: `Trois jours passent. Sol-Aureus continue de briller sous le soleil, mais pour vous qui savez ce qui grouille sous ses pavés, cette beauté a quelque chose de fragile — comme un miroir qui ne sait pas encore qu'il est fissuré.

La Reine Elara a été informée. En réponse, elle a confié aux Sentinelles — vous — une mission discrète : identifier les agents du Cercle des Cendres infiltrés dans la ville. Car si un Sceau a été brisé sous Sol-Aureus, quelqu'un au sein même de la cité a permis aux cultistes d'opérer en toute impunité.

Votre contact est Lysandra Voile-de-Nuit, maîtresse espionne de la Couronne, qui vous attend dans un salon privé de l'Aile des Ombres — une section du Palais dont les gardes eux-mêmes ignorent l'existence.

La pièce est sobre : une table, des chaises, et un mur entier couvert de fils rouges reliant des portraits, des notes et des cartes. Lysandra — cheveux argentés, yeux violets, expression de chat qui a repéré une souris — ne se lève pas quand vous entrez.

« Fermez la porte. Asseyez-vous. Et oubliez tout ce que vous pensez savoir sur Sol-Aureus. Cette ville est un nid de serpents, et nous allons identifier les plus venimeux. »`,
    gmNotes: `Chapitre d'investigation urbaine. Lysandra donne trois pistes : Lord Aldric (noble fréquentant des cercles occultes), la Comtesse Morgaine (dettes avec des créanciers douteux), et Dame Celeste (disparue deux semaines sans explication). Les PJ peuvent enquêter dans l'ordre qu'ils veulent. Dame Celeste est la coupable — mais les indices doivent mener naturellement à elle. Lord Aldric est un occultiste amateur inoffensif. La Comtesse Morgaine est endettée auprès du Syndicat de l'Ombre (lien avec le passé de Brok). Chaque piste offre 1-2 scènes d'enquête avec des jets sociaux et d'investigation. L'infiltration d'un gala noble (scène 2) est le moment fort de ce chapitre.`,
    dialogues: [
      {
        npcId: 'npc_lysandra',
        npcName: 'Lysandra Voile-de-Nuit',
        lines: [
          { trigger: 'Briefing', text: `Le Cercle des Cendres n'a pas brisé ce Sceau seul. Il leur fallait des informations — plans des égouts, horaires de patrouille, accès aux tunnels ashkans. Quelqu'un dans la haute société de Sol-Aureus les a aidés. J'ai réduit la liste à trois suspects. Votre travail : trouver le traître avant qu'il ne s'enfuie ou ne frappe à nouveau.`, tone: 'calculatrice' },
          { trigger: 'Les suspects', text: `Lord Aldric Valmont — vieux noble excentrique, collectionneur d'artefacts ashkans. Il organise des « séances » dans son manoir. La Comtesse Morgaine de Lys — endettée jusqu'au cou, prête à vendre sa mère pour rembourser ses créanciers. Et Dame Celeste Aube-d'Or — conseillère de la Reine, disparue pendant deux semaines le mois dernier. Personne ne sait où elle était.`, tone: 'analytique' },
          { trigger: 'Méthodes', text: `Discrétion absolue. Ce sont des nobles — si vous les accusez sans preuve irréfutable, c'est nous qui finirons au cachot. Infiltrez, observez, trouvez la preuve. Et ne faites confiance à personne — même les innocents ont des secrets qu'ils préfèrent garder.`, tone: 'avertissement' },
        ],
      },
    ],
    objectives: [
      { description: 'Recevoir le briefing de Lysandra', type: 'talk', optional: false },
      { description: 'Choisir une première piste d\'enquête', type: 'choice', optional: false },
      { description: 'Explorer le mur d\'indices de Lysandra', type: 'investigate', optional: true },
    ],
    transitions: [
      { condition: 'Enquête sur Lord Aldric', nextScene: 'act1_ch3_s2_gala', label: '→ Le Gala des Nobles' },
      { condition: 'Enquête sur la Comtesse Morgaine', nextScene: 'act1_ch3_s2_gala', label: '→ Le Gala des Nobles' },
      { condition: 'Enquête sur Dame Celeste', nextScene: 'act1_ch3_s2_gala', label: '→ Le Gala des Nobles' },
    ],
    estimatedMinutes: 15,
    mood: 'intrigue-espionnage',
    music: 'Espionnage — cordes tendues, notes basses, silence',
    location: 'Sol-Aureus — Palais Royal, Aile des Ombres',
  },
  {
    id: 'act1_ch3_s2_gala',
    chapterId: 'ch-1-3',
    sceneNumber: 2,
    title: 'Le Grand Gala de Solarius',
    type: 'dialogue',
    readAloud: `Le Manoir Valmont brille de mille feux dans la nuit de Sol-Aureus. Des lanternes enchantées flottent dans les jardins, projetant des motifs de lumière dorée sur les haies taillées en forme de griffons et de licornes. Des carrosses déposent un flot continu de nobles en tenues somptueuses — soie, velours, bijoux qui scintillent comme des constellations terrestres.

Grâce aux invitations fournies par Lysandra, vous entrez dans le grand hall. Le plafond magique reproduit le ciel nocturne en temps réel — les étoiles brillent, les constellations tournent lentement, et une lune argentée diffuse une lumière douce. Un orchestre invisible joue une valse mélancolique. Des serveurs fantômes — littéralement transparents — circulent avec des plateaux de mets exquis et de coupes de vin qui change de couleur à chaque gorgée.

Lord Aldric, leur hôte, accueille ses invités avec une excentricité étudiée — robe violet foncé brodée de symboles ésotériques, monocle en cristal, et un perroquet mécanique sur l'épaule qui répète les derniers mots de chaque phrase.

Dans la foule, vous repérez vos cibles : la Comtesse Morgaine, souriante et nerveuse, qui discute avec un homme en noir que personne ne semble connaître ; et Dame Celeste, sereine et magnifique, qui observe la salle depuis un balcon intérieur avec l'air de quelqu'un qui joue aux échecs avec des pièces vivantes.`,
    gmNotes: `Scène sociale complexe — les joueurs doivent enquêter sur les trois suspects tout en maintenant leur couverture. Chaque suspect offre une interaction unique. Lord Aldric : jet de Tromperie DC 35 pour infiltrer son « cercle intérieur » dans la bibliothèque (il montre sa collection ashkane — impressionnante mais inoffensive). Comtesse Morgaine : l'homme en noir est un agent du Syndicat qui la fait chanter ; jet de Discrétion DC 40 pour espionner leur conversation (elle doit de l'argent, pas liée au Cercle des Cendres). Dame Celeste : la plus dangereuse. Jet de Perspicacité DC 45 pour remarquer qu'elle porte une bague avec le symbole de l'Œil — le même que le médaillon cultiste. Si confrontée, elle sourit et dit : « Quelle jolie théorie. Prouvez-le. » L'indice clé est dans la bibliothèque d'Aldric : un livre manquant dans la collection — le « Codex des Sceaux ». Celeste l'a emprunté et jamais rendu.`,
    dialogues: [
      {
        npcId: 'npc_aldric',
        npcName: 'Lord Aldric Valmont',
        lines: [
          { trigger: 'Accueil', text: `Bienvenue, bienvenue ! *Le perroquet mécanique croasse : « Bienvenue ! »* Vous aimez les mystères anciens ? Bien sûr que oui, tout le monde aime les mystères anciens. Venez, venez — j'ai quelque chose dans ma bibliothèque privée qui va vous fasciner. Un véritable artefact ashkan !`, tone: 'excentrique-enthousiaste' },
          { trigger: 'Collection ashkane', text: `*Il déverrouille une vitrine avec révérence.* Regardez : une tablette de commandement ashkane. Authentique ! Gravée il y a trois mille ans par les Maîtres des Sceaux eux-mêmes. Elle ne fait rien, bien sûr — la magie est morte depuis longtemps. Mais la beauté de l'artisanat... *Il soupire de bonheur.*`, tone: 'passionné' },
          { trigger: 'Livre manquant', text: `*Son visage se rembrunit.* Le Codex des Sceaux ? Oui, il manque. Je l'ai prêté à Dame Celeste il y a trois mois. Elle m'a dit qu'elle faisait des recherches pour la Reine. Je l'ai redemandé deux fois — elle dit qu'elle « n'a pas fini ». Étrange, pour un livre de référence académique, non ?`, tone: 'perplexe' },
        ],
      },
      {
        npcId: 'npc_celeste',
        npcName: 'Dame Celeste Aube-d\'Or',
        lines: [
          { trigger: 'Approche polie', text: `*Elle vous regarde du haut de son balcon, un verre de vin blanc à la main. Un sourire froid.* Ah, les fameux Sentinelles. On parle beaucoup de vous au Palais. De petits héros qui chassent les ombres dans les égouts. Charmant. Dites-moi — avez-vous trouvé ce que vous cherchiez en dessous ?`, tone: 'condescendante' },
          { trigger: 'Confrontation directe', text: `*Ses yeux se durcissent imperceptiblement.* Vous m'accusez de quoi, exactement ? D'être cultivée ? De m'intéresser à l'histoire ashkane ? *Elle fait tourner sa bague — l'Œil de Cendres.* C'est un bijou de famille. Chaque noble de Sol-Aureus en a un. Vérifiez si vous ne me croyez pas. *Elle ment — et elle sait que vous le savez.*`, tone: 'glaciale' },
        ],
      },
    ],
    objectives: [
      { description: 'Infiltrer le gala et maintenir sa couverture', type: 'explore', optional: false },
      { description: 'Enquêter sur les trois suspects', type: 'investigate', optional: false },
      { description: 'Découvrir l\'indice du Codex des Sceaux manquant', type: 'investigate', optional: false },
      { description: 'Identifier Dame Celeste comme agent du Cercle des Cendres', type: 'investigate', optional: false },
    ],
    transitions: [
      { condition: 'Indice du Codex découvert + bague de Celeste remarquée', nextScene: 'act1_ch3_s3_celeste_manor', label: '→ Le Manoir de Celeste' },
    ],
    skillChecks: [
      { skill: 'Perspicacité', dc: 45, success: 'La bague de Celeste porte le symbole de l\'Œil de Cendres — identique au médaillon trouvé sous le Sceau.', failure: 'Celeste semble simplement être une noble hautaine. Rien de suspect.' },
      { skill: 'Tromperie', dc: 35, success: 'Vous gagnez la confiance d\'Aldric et accédez à sa bibliothèque privée. Le Codex des Sceaux manque à l\'inventaire.', failure: 'Aldric est soupçonneux. Il vous montre la collection mais vous surveille de près.' },
      { skill: 'Discrétion', dc: 40, success: 'Vous espionnez la conversation de Morgaine avec l\'homme en noir : elle doit 5000 PO au Syndicat. Pas liée au Cercle.', failure: 'Morgaine vous repère et la conversation s\'interrompt.' },
    ],
    estimatedMinutes: 30,
    mood: 'intrigue-luxe',
    music: 'Bal masqué — orchestre, valse, murmures',
    location: 'Sol-Aureus — Manoir Valmont',
  },
  {
    id: 'act1_ch3_s3_celeste_manor',
    chapterId: 'ch-1-3',
    sceneNumber: 3,
    title: 'Le Manoir de Dame Celeste',
    type: 'exploration',
    readAloud: `Le manoir de Dame Celeste Aube-d'Or se dresse dans le Quartier des Nobles, derrière un mur d'enceinte couvert de lierre. De l'extérieur, c'est une élégante demeure de pierre blanche aux volets bleu nuit — rien de menaçant. Mais Lysandra a confirmé vos soupçons : Celeste est la taupe du Cercle des Cendres.

Cette nuit, le manoir est silencieux. Celeste est au gala — vous avez deux heures, peut-être trois, avant qu'elle ne rentre. Les gardes ? Deux en façade, un dans le jardin. Curieusement peu pour une noble de son rang.

Le mur d'enceinte fait trois mètres de haut. Le lierre offre des prises. La porte de service, à l'arrière, est verrouillée mais pas enchantée. Et une fenêtre du premier étage, celle du bureau de Celeste, est entrouverte — comme une invitation.

Ou un piège.`,
    gmNotes: `Mission d'infiltration nocturne. Le manoir a trois niveaux d'accès : extérieur (gardes, mur), intérieur public (serviteurs, salons — peu d'intérêt), et bureau privé + cave secrète (les preuves). Le bureau de Celeste contient le Codex des Sceaux volé, des correspondances chiffrées avec le Cercle des Cendres, et une carte montrant les emplacements des 5 Sceaux à travers Aethelgard. La cave secrète (accès par une trappe cachée sous le tapis) contient un autel d'ombre avec des composants rituels — preuve irréfutable. PIÈGE : la fenêtre entrouverte EST un piège. Un glyphe d'alarme silencieuse prévient Celeste si on passe par là. Jet d'Arcanes DC 35 pour le détecter. Si déclenché, Celeste rentre plus tôt (réduit le temps à 30 minutes) et les PJ risquent une confrontation.`,
    dialogues: [],
    objectives: [
      { description: 'Infiltrer le manoir de Dame Celeste', type: 'explore', optional: false },
      { description: 'Trouver le bureau privé de Celeste', type: 'explore', optional: false },
      { description: 'Récupérer le Codex des Sceaux et les correspondances', type: 'collect', optional: false },
      { description: 'Découvrir la cave secrète et l\'autel d\'ombre', type: 'investigate', optional: true },
    ],
    transitions: [
      { condition: 'Preuves récupérées, sortie discrète', nextScene: 'act1_ch3_s4_confrontation', label: '→ Confrontation avec Celeste' },
      { condition: 'Alarme déclenchée, Celeste arrive', nextScene: 'act1_ch3_s4_confrontation', label: '→ Confrontation directe' },
    ],
    skillChecks: [
      { skill: 'Discrétion', dc: 35, success: 'Vous contournez les gardes sans être repéré et accédez au jardin arrière.', failure: 'Un garde vous repère. Il faut le neutraliser silencieusement ou fuir.' },
      { skill: 'Crochetage', dc: 30, success: 'La porte de service s\'ouvre sans un bruit.', failure: 'La serrure résiste. Vous perdez du temps précieux.' },
      { skill: 'Arcanes', dc: 35, success: 'Vous détectez le glyphe d\'alarme sur la fenêtre. Contournable en entrant par ailleurs.', failure: 'Vous passez par la fenêtre et déclenchez l\'alarme silencieuse. Celeste est prévenue.' },
      { skill: 'Investigation', dc: 30, success: 'Sous le tapis du bureau, une trappe mène à une cave secrète contenant un autel dédié aux Scellés.', failure: 'Le bureau contient le Codex et les lettres, mais la cave reste cachée.' },
    ],
    loot: ['Codex des Sceaux (artefact de quête majeur)', 'Correspondances chiffrées du Cercle des Cendres', 'Carte des 5 Sceaux d\'Aethelgard', 'Composants rituels d\'ombre'],
    estimatedMinutes: 25,
    mood: 'tension-infiltration',
    music: 'Infiltration — silence, craquements, battements de cœur',
    location: 'Sol-Aureus — Manoir de Dame Celeste',
  },
  {
    id: 'act1_ch3_s4_confrontation',
    chapterId: 'ch-1-3',
    sceneNumber: 4,
    title: 'La Chute de Dame Celeste',
    type: 'choice',
    readAloud: `Les preuves sont accablantes. Le Codex des Sceaux annoté de la main de Celeste, les lettres codées au Cercle des Cendres, la carte marquée des cinq Sceaux — c'est la fin de sa double vie.

Lysandra organise l'arrestation à l'aube. Les gardes de la Couronne encerclent le manoir. Le Capitaine-Général Marcus dirige l'opération en personne, le visage de marbre.

Dame Celeste sort de son manoir en robe de chambre, les cheveux défaits, mais le regard aussi tranchant qu'une lame. Elle ne fuit pas. Elle ne supplie pas. Elle regarde Marcus droit dans les yeux et sourit.

« Vous arrivez trop tard, Général. Le premier Sceau est brisé. Le deuxième l'est déjà aussi — à Hammerdeep, dans les profondeurs que vos précieux nains refusent d'explorer. Et les trois autres... eh bien, le Cercle a ses agents partout. Vous ne pouvez pas tous les trouver. Pas à temps. »

Elle se tourne vers vous. « Vous croyez avoir gagné ? Vous n'avez fait qu'effleurer la surface. L'Ombre ne dort plus. Et quand elle se réveillera complètement... »

Marcus ordonne aux gardes de l'emmener. Celeste rit tandis qu'on lui passe les fers. Un rire qui résonne dans la rue silencieuse comme une prophétie.`,
    gmNotes: `Moment de choix moral : les PJ peuvent interroger Celeste avant qu'elle soit emmenée. Elle est prête à négocier des informations contre une promesse de clémence. Ce qu'elle sait : les noms de deux autres agents du Cercle (un à Hammerdeep, un dans la Sylve d'Émeraude), l'identité du chef local du Cercle (un certain « Malachi »), et le fait que le Sceau de Hammerdeep est en danger imminent. Les PJ peuvent aussi laisser Marcus l'interroger (moins d'informations, mais pas de compromis moral). Le chapitre se termine sur la révélation que la menace est bien plus vaste que Sol-Aureus — c'est le hook vers le Chapitre 1-4 et l'Acte 2.`,
    dialogues: [
      {
        npcId: 'npc_celeste',
        npcName: 'Dame Celeste Aube-d\'Or',
        lines: [
          { trigger: 'Interrogatoire', text: `*En chaînes, elle reste digne.* Vous voulez des réponses ? Tout a un prix. La clémence contre des noms. C'est simple. Le Cercle des Cendres a des agents dans chaque région d'Aethelgard. Je connais deux d'entre eux. Et je connais le nom de celui qui tire les ficelles ici — Malachi. Il est ancien. Très ancien. Et il ne travaille pas seul.`, tone: 'négociatrice' },
          { trigger: 'Les Sceaux', text: `Cinq Sceaux, posés par l'Alliance des Sept après la Grande Guerre pour emprisonner les Scellés — les seigneurs de l'Ombre. Le Cercle des Cendres veut les libérer. Pas par folie — par nécessité. Le monde que vous connaissez est bâti sur un mensonge. L'Alliance n'a pas « sauvé » le monde — elle a enchaîné la moitié de la réalité. Les Scellés ne sont pas des démons. Ce sont... *elle hésite.* Demandez à Malachi. Si vous le trouvez vivant.`, tone: 'prophétique' },
        ],
      },
      {
        npcId: 'npc_marcus',
        npcName: 'Capitaine-Général Marcus',
        lines: [
          { trigger: 'Après l\'arrestation', text: `*Il regarde le manoir de Celeste avec dégoût.* Une conseillère de la Reine. Sous notre nez. Pendant des mois. *Il se tourne vers vous.* Vous avez bien travaillé. Mais ce qu'elle a dit... les autres Sceaux, Hammerdeep... je crains que votre travail ne fasse que commencer.`, tone: 'sombre-reconnaissant' },
        ],
      },
    ],
    objectives: [
      { description: 'Assister à l\'arrestation de Dame Celeste', type: 'special', optional: false },
      { description: 'Choisir d\'interroger Celeste ou de laisser Marcus s\'en charger', type: 'choice', optional: false },
      { description: 'Obtenir des informations sur les autres Sceaux menacés', type: 'talk', optional: true },
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 1-3', nextScene: 'act1_ch4_s1_queens_charge', label: '→ Chapitre 1-4 : Le Premier Sceau' },
    ],
    loot: ['Bague de l\'Œil de Cendres (objet de quête)', 'Informations sur Malachi', '+25 Réputation Couronne'],
    estimatedMinutes: 15,
    mood: 'révélation-victoire-amère',
    music: 'Arrestation — tambours, tension, résolution',
    location: 'Sol-Aureus — Quartier des Nobles',
  },
];

// --------------------------------------------------------------------------
// Chapitre 1-4 : Le Premier Sceau (ch-1-4) — NOUVEAU
// --------------------------------------------------------------------------

const CH_1_4_SCENES: NarrativeScene[] = [
  {
    id: 'act1_ch4_s1_queens_charge',
    chapterId: 'ch-1-4',
    sceneNumber: 1,
    title: 'La Mission de la Reine',
    type: 'dialogue',
    readAloud: `La Salle du Trône de Sol-Aureus n'a jamais semblé aussi imposante. Les colonnes de marbre blanc s'élèvent vers un plafond peint de scènes célestes — les Sept Héros de l'Alliance scellant les Scellés dans leurs prisons éternelles. Sous ces peintures dorées, l'ironie est cruelle : ce qu'elles célèbrent est en train de se défaire.

La Reine Elara siège sur le trône de cristal, couronne simple sur des cheveux noirs, robe bleu nuit brodée d'étoiles d'argent. Elle est jeune — à peine trente ans — mais ses yeux portent le poids d'un monde qui vacille.

À ses côtés, le Capitaine-Général Marcus, Lysandra, le Haut-Mage Theron, et le Grand Prêtre Alduin forment un demi-cercle grave. Sur la table devant eux, la carte des cinq Sceaux trouvée chez Celeste, annotée de points rouges inquiétants.

La Reine se lève. Sa voix est claire, posée, et porte sans effort dans la grande salle.

« Sentinelles. Ce que vous avez découvert sous notre ville et dans les salons de nos nobles a confirmé nos pires craintes. Les Sceaux antiques — les verrous qui maintiennent l'Ombre emprisonnée — sont attaqués. Le Cercle des Cendres opère à travers tout Aethelgard. Et nous n'avons pas le luxe du temps. »`,
    gmNotes: `Scène pivot de l'acte. La Reine confie officiellement aux PJ la mission de protéger les Sceaux restants. Elle offre : un sceau royal (accès diplomatique partout), des fonds (500 PO de départ + lettres de crédit), des chevaux, et une escorte militaire optionnelle (les PJ peuvent refuser l'escorte pour plus de discrétion). Le Grand Prêtre Alduin révèle que chaque Sceau nécessite un « Gardien » lié à la terre locale : les nains à Hammerdeep, les elfes dans la Sylve, etc. Si les Gardiens sont corrompus ou morts, le Sceau s'affaiblit. Le Haut-Mage Theron donne un artefact de détection : la Boussole des Sceaux, qui vibre en présence de magie de Sceau (fonctionne comme un détecteur). Premier objectif : Hammerdeep, car Celeste a dit que ce Sceau est en danger imminent.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'La mission', text: `Cinq Sceaux. Cinq régions. Le Cercle des Cendres veut les briser tous. Si un seul Scellé se libère, c'est une catastrophe. Si les cinq se libèrent... *elle ne finit pas la phrase.* Je vous confie la mission la plus importante de ce règne : trouvez les Sceaux, protégez-les, et arrêtez le Cercle. Vous aurez mon autorité, mes ressources, et ma confiance. Ne me décevez pas.`, tone: 'royale-sincère' },
          { trigger: 'Pourquoi eux', text: `*Un sourire triste.* Parce que mes chevaliers sont politiques, mes espions sont compromis, et mes alliés sont lointains. Vous, vous avez déjà prouvé votre valeur dans l'obscurité. Et surtout... vous n'êtes liés à aucune faction. Vous pouvez aller là où je ne peux pas envoyer mes gens. Considérez-vous comme mes mains dans l'ombre.`, tone: 'confiante' },
        ],
      },
      {
        npcId: 'npc_alduin',
        npcName: 'Grand Prêtre Alduin',
        lines: [
          { trigger: 'Les Gardiens des Sceaux', text: `Chaque Sceau est lié à un Gardien — un protecteur choisi par la terre elle-même. À Hammerdeep, c'est le Forgeron Ancestral, un titre porté par le plus ancien maître-forgeron nain. Dans la Sylve d'Émeraude, c'est l'Archidruide de l'Arbre-Monde. Si ces Gardiens sont corrompus, affaiblis ou morts... le Sceau perd sa cohésion. C'est ce que le Cercle exploite.`, tone: 'solennel' },
        ],
      },
    ],
    objectives: [
      { description: 'Recevoir la mission officielle de la Reine Elara', type: 'talk', optional: false },
      { description: 'Obtenir le Sceau Royal et les ressources', type: 'collect', optional: false },
      { description: 'Apprendre le fonctionnement des Sceaux et des Gardiens', type: 'talk', optional: false },
      { description: 'Décider de la première destination (Hammerdeep recommandé)', type: 'choice', optional: false },
    ],
    transitions: [
      { condition: 'Mission acceptée, direction Hammerdeep', nextScene: 'act1_ch4_s2_road_to_mountains', label: '→ Route vers les Monts Cœur-de-Fer' },
    ],
    loot: ['Sceau Royal (accès diplomatique)', '500 PO', 'Boussole des Sceaux (artefact)', 'Lettres de crédit royales', '2x Chevaux de guerre légers'],
    estimatedMinutes: 20,
    mood: 'solennité-poids-du-monde',
    music: 'Thème royal épique — cuivres, cordes, chœur',
    location: 'Sol-Aureus — Palais Royal, Salle du Trône',
  },
  {
    id: 'act1_ch4_s2_road_to_mountains',
    chapterId: 'ch-1-4',
    sceneNumber: 2,
    title: 'La Route des Montagnes',
    type: 'exploration',
    readAloud: `Sol-Aureus rétrécit dans votre dos, ses tours dorées s'amenuisant jusqu'à n'être plus que des éclats de lumière à l'horizon. Devant vous, la route s'étire à travers le Val Doré — un paysage de collines douces, de champs de blé et de villages paisibles qui ignorent encore la tempête qui approche.

Les trois premiers jours de voyage sont calmes. Le Val Doré porte bien son nom : les collines ondulent sous le soleil comme une mer de blé et de fleurs sauvages. Des bergers vous saluent, des marchands partagent leurs feux de camp, et le monde semble normal. Presque trop normal.

Au quatrième jour, le paysage change. Les collines se dressent, deviennent des contreforts rocheux. Les arbres se raréfient, remplacés par des pins tordus par le vent. L'air se refroidit. Et au loin, comme une muraille de granit et de glace, les Monts Cœur-de-Fer barrent l'horizon.

C'est au col du Marteau-Brisé, passage obligé vers Hammerdeep, que les ennuis commencent. La route est bloquée par un éboulement récent — des rochers de la taille d'une maison obstruent le passage. Et dans les décombres, des traces de griffes. Pas celles d'un animal. Des griffes de pierre.`,
    gmNotes: `Voyage de 5 jours. Jours 1-3 : ambiance paisible, rencontres sociales (marchands, pèlerins). Jour 4 : changement d'atmosphère, premier signe (un berger raconte que ses moutons refusent de paître près des montagnes). Jour 5 : l'éboulement au col. C'est l'œuvre d'un Golem de Pierre mineur — un éclat du Gardien Corrompu de Hammerdeep qui a « fui » vers la surface. Combat optionnel si les PJ choisissent de dégager le passage par la force. Sinon, un chemin de contournement existe (Survie DC 35, +4h de marche). La Boussole des Sceaux commence à vibrer faiblement à l'approche des montagnes — confirmation que le Sceau de Hammerdeep est en danger.`,
    dialogues: [
      {
        npcId: 'npc_berger',
        npcName: 'Vieux Berger Hakan',
        lines: [
          { trigger: 'Les montagnes', text: `*Il tire sur sa pipe, le regard vers les Monts.* Mes bêtes refusent d'aller plus loin. Même le chien — et ce chien n'a peur de rien. Y'a quelque chose qui remue dans la montagne. La nuit, on entend des grondements. Pas du tonnerre — ça vient d'en dessous. Comme si la montagne elle-même avait mal au ventre.`, tone: 'inquiet-résigné' },
        ],
      },
    ],
    objectives: [
      { description: 'Voyager de Sol-Aureus aux Monts Cœur-de-Fer (5 jours)', type: 'explore', optional: false },
      { description: 'Franchir le col du Marteau-Brisé', type: 'explore', optional: false },
      { description: 'Vaincre ou contourner le Golem de Pierre au col', type: 'combat', optional: false },
    ],
    transitions: [
      { condition: 'Col franchi', nextScene: 'act1_ch4_s3_hammerdeep_gates', label: '→ Les Portes de Hammerdeep' },
    ],
    skillChecks: [
      { skill: 'Survie', dc: 35, success: 'Vous trouvez un chemin de contournement à travers les rochers — plus long mais sûr.', failure: 'Pas de chemin alternatif visible. Il faut passer par l\'éboulement.' },
      { skill: 'Athlétisme', dc: 30, success: 'Vous escaladez les rochers et dégagez un passage en 2 heures.', failure: 'Un rocher glisse — jet de Dextérité DC 25 ou 2d6 dégâts contondants.' },
    ],
    encounters: ['1x Golem de Pierre Mineur (CR 3) — optionnel'],
    estimatedMinutes: 20,
    mood: 'voyage-pressentiment',
    music: 'Voyage — flûtes, vent, percussions lointaines',
    location: 'Val Doré → Col du Marteau-Brisé',
  },
  {
    id: 'act1_ch4_s3_hammerdeep_gates',
    chapterId: 'ch-1-4',
    sceneNumber: 3,
    title: 'Les Portes de Hammerdeep',
    type: 'dialogue',
    readAloud: `Les Portes de Hammerdeep se dressent devant vous — deux battants d'acier de vingt mètres de haut, gravés de scènes de forge et de bataille avec un détail si fin que chaque guerrier a un visage distinct. Le bruit de marteaux résonne de l'intérieur comme le pouls d'un cœur gigantesque. La montagne elle-même semble vivante.

Deux sentinelles naines en armure de plaques d'acier bleu vous barrent le passage. Leur regard est aussi accueillant qu'un mur de brique. Le plus grand — ce qui, pour un nain, reste relatif — croise les bras sur une poitrine large comme un tonneau.

« Halte. Les Portes de Hammerdeep n'ouvrent pas aux étrangers sans raison. Noms, clan d'affiliation ou lettre d'accréditation. Pas de lettre, pas d'entrée. Les temps sont durs — on n'accepte plus les touristes. »

Derrière lui, les portes sont entrouvertes — juste assez pour laisser passer les chariots de minerai. De l'intérieur s'échappent une chaleur de forge, une lueur orangée, et le grondement assourdissant de dix mille marteaux sur dix mille enclumes.`,
    gmNotes: `Les nains sont méfiants mais pas hostiles. Le Sceau Royal de la Reine Elara suffit pour une entrée officielle (audience avec le Roi Thorin en 1 jour). Sans sceau, il faut convaincre les gardes — Persuasion DC 40, ou trouver un autre moyen (mentionner Grimjaw le prospecteur donne +5 au jet). Le Roi Thorin Poing-de-Fer sait que quelque chose ne va pas dans les mines profondes mais refuse de l'admettre publiquement — faiblesse inacceptable devant les clans. L'agent du Cercle des Cendres à Hammerdeep est le Maître-Ingénieur Durgan, qui supervise les forages profonds et a délibérément orienté les tunnels vers le Sceau. Les PJ devront gagner la confiance des nains avant de pouvoir accéder aux mines profondes.`,
    dialogues: [
      {
        npcId: 'npc_garde_nain',
        npcName: 'Capitaine Brenna Bouclier-de-Fer',
        lines: [
          { trigger: 'Accueil', text: `Pas de lettre, pas d'entrée. C'est la loi de Hammerdeep depuis trois cents ans. *Elle regarde le Sceau Royal.* Hmm. Un sceau de la reine humaine. Ça a du poids... chez les humains. Ici, c'est le Roi Thorin qui décide. Mais ça vous ouvre la porte. Entrez. Et ne touchez à rien dans les forges — les nains n'aiment pas quand on touche leurs outils.`, tone: 'bourrue-pragmatique' },
          { trigger: 'Situation des mines', text: `*Elle hésite, regarde autour d'elle.* Officiellement, tout va bien. Officieusement... le Niveau 12 est fermé depuis un mois. « Maintenance structurelle », qu'ils disent. Mais j'ai vu les mineurs qui en sont remontés. Ils ne dormaient plus. Certains ne parlaient plus. Et un... *elle baisse la voix.* Un ne projetait plus d'ombre.`, tone: 'inquiète-discrète' },
        ],
      },
    ],
    objectives: [
      { description: 'Entrer dans Hammerdeep', type: 'explore', optional: false },
      { description: 'Obtenir une audience avec le Roi Thorin', type: 'talk', optional: false },
      { description: 'Recueillir des informations sur la situation des mines', type: 'investigate', optional: true },
    ],
    transitions: [
      { condition: 'Entrée accordée, audience prévue', nextScene: 'act1_ch4_s4_throne_room', label: '→ Audience avec le Roi Thorin' },
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 40, success: 'Les gardes vous laissent entrer avec une escorte. L\'audience est dans 24h.', failure: 'Les gardes refusent. Il faut trouver un autre moyen (Grimjaw, diplomatie via marchands nains, etc.).' },
    ],
    estimatedMinutes: 15,
    mood: 'majesté-méfiance',
    music: 'Nain — enclumes, percussions profondes, chœur grave',
    location: 'Monts Cœur-de-Fer — Portes de Hammerdeep',
  },
  {
    id: 'act1_ch4_s4_throne_room',
    chapterId: 'ch-1-4',
    sceneNumber: 4,
    title: 'Le Roi sous la Montagne',
    type: 'choice',
    readAloud: `La Forge Royale de Hammerdeep est suspendue au centre de la caverne principale, reliée aux parois par quatre ponts d'acier massifs. C'est à la fois un palais, une forge, et un temple — car pour les nains de Cœur-de-Fer, ces trois concepts sont indissociables.

Le Roi Thorin Poing-de-Fer vous reçoit dans la Salle des Enclumes, assis sur un trône taillé dans un seul bloc de fer météorique. C'est un nain imposant même selon les standards nains — large, massif, avec une barbe tressée de fils d'argent et des yeux aussi durs que l'acier qu'il forge. Sur ses genoux repose un marteau de guerre couvert de runes — Brise-Montagne, l'arme légendaire de sa lignée.

Autour de lui, les chefs de clan occupent des sièges de pierre en demi-cercle. Leurs regards oscillent entre méfiance et curiosité. Le Maître-Ingénieur Durgan — un nain mince pour sa race, au regard fuyant — se tient en retrait, les mains croisées derrière le dos.

Le Roi parle avec la subtilité d'un marteau sur une enclume.

« Des humains. Envoyés par leur reine. Pour nous dire que notre montagne est en danger. » Il sourit — un sourire qui n'a rien de chaleureux. « Hammerdeep tient debout depuis mille ans. Elle tiendra mille de plus. Mais... *il lève une main pour faire taire les murmures des clans.* ...je suis un roi, pas un imbécile. Parlez. Et soyez convaincants. »`,
    gmNotes: `Scène de diplomatie cruciale. Thorin SAIT que quelque chose ne va pas mais ne peut pas l'admettre devant les clans sans preuve. Les PJ doivent le convaincre de leur donner accès aux mines profondes. Trois approches : 1) Preuve directe (montrer le médaillon du Cercle, le Codex des Sceaux — Persuasion DC 40, avantage si preuves multiples), 2) Défi d'honneur (défier un champion nain pour gagner le droit d'explorer — combat non-létal), 3) Passer par Durgan (le traître — il acceptera de les guider « pour prouver que tout va bien »... et les mènera dans un piège). Si Durgan est présent et que les PJ mentionnent le Cercle des Cendres, il pâlit imperceptiblement (Perspicacité DC 40). FIN DE L'ACTE 1 : les PJ obtiennent l'accès aux mines, ce qui lance directement l'Acte 2, Chapitre 2-3.`,
    dialogues: [
      {
        npcId: 'npc_thorin',
        npcName: 'Roi Thorin Poing-de-Fer',
        lines: [
          { trigger: 'Réaction aux preuves', text: `*Il examine le médaillon du Cercle, le Codex, les lettres. Son visage se durcit progressivement.* Un Sceau sous Sol-Aureus. Un culte qui opère dans l'ombre. Et vous pensez qu'ils sont aussi chez nous. *Long silence.* Le Niveau 12 est fermé depuis un mois. J'ai perdu six mineurs. Six nains de Cœur-de-Fer — et personne ne disparaît dans MA montagne sans que je le sache. *Il frappe le bras du trône.* Vous aurez votre accès. Mais vous descendez avec mes guerriers. Et si vous avez tort... vous repartirez par la porte. Si vous avez raison... que les dieux nous protègent tous.`, tone: 'fureur-royale' },
          { trigger: 'Sur Durgan (si soupçonné)', text: `*Ses yeux se plissent.* Durgan ? Mon Maître-Ingénieur ? L'homme qui a conçu les forages du Niveau 12 ? *Pause.* Il a insisté pour forer vers le nord. J'ai trouvé ça étrange — le meilleur minerai est à l'est. Mais il a dit que les veines profondes... *Son regard se durcit.* Amenez-le-moi. Maintenant.`, tone: 'réalisation-froide' },
        ],
      },
      {
        npcId: 'npc_durgan',
        npcName: 'Maître-Ingénieur Durgan',
        lines: [
          { trigger: 'Façade amicale', text: `*Il sourit, trop facilement.* Des étrangers dans Hammerdeep ! Quelle surprise. Le Niveau 12 ? Oh, simple maintenance. Les tunnels sont vieux, les supports fatiguent. Rien d'inquiétant. Si vous voulez, je peux vous faire visiter les niveaux supérieurs — les forges sont magnifiques à cette heure.`, tone: 'faussement-aimable' },
          { trigger: 'Confrontation', text: `*Son masque tombe. Ses yeux deviennent vides, comme si quelque chose d'autre regardait à travers eux.* Vous ne comprenez pas. Le Sceau ne doit pas être réparé. Il doit être OUVERT. Ce qui est emprisonné en dessous n'est pas un monstre — c'est un dieu. Et les dieux, on ne les enchaîne pas éternellement. *Il porte la main à un pendentif caché sous sa chemise — l'Œil de Cendres.*`, tone: 'fanatique' },
        ],
      },
    ],
    objectives: [
      { description: 'Convaincre le Roi Thorin de donner accès aux mines profondes', type: 'talk', optional: false },
      { description: 'Identifier le Maître-Ingénieur Durgan comme agent du Cercle', type: 'investigate', optional: true },
      { description: 'Préparer l\'expédition vers le Niveau 12', type: 'special', optional: false },
    ],
    transitions: [
      { condition: 'Accès obtenu — FIN DE L\'ACTE 1', nextScene: 'act2_ch3_s1_deep_mines', label: '→ ACTE 2 — Chapitre 2-3 : Les Monts Cœur-de-Fer' },
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 40, success: 'Thorin est convaincu. Il ordonne l\'ouverture du Niveau 12 et détache 4 guerriers d\'élite pour escorter le groupe.', failure: 'Thorin n\'est pas convaincu. Il faut trouver un autre angle — défi d\'honneur ou enquête supplémentaire.' },
      { skill: 'Perspicacité', dc: 40, success: 'Quand le Cercle des Cendres est mentionné, Durgan pâlit et ses mains tremblent. Il cache quelque chose.', failure: 'Durgan semble aussi surpris que les autres. Rien de suspect.' },
    ],
    loot: ['Escorte de 4 Guerriers d\'Élite Nains', 'Carte détaillée des Niveaux 1-12 de Hammerdeep', 'Hache naine en acier stellaire +1 (cadeau de Thorin)'],
    estimatedMinutes: 25,
    mood: 'diplomatie-tension',
    music: 'Nain royal — percussions lourdes, chœur, enclumes',
    location: 'Hammerdeep — Forge Royale, Salle des Enclumes',
  },
];

// ============================================================================
// ACTE 2 — LA QUÊTE DES SCEAUX
// ============================================================================

// --------------------------------------------------------------------------
// Chapitre 2-3 : Les Monts Cœur-de-Fer (ch-2-3)
// --------------------------------------------------------------------------

const CH_2_3_SCENES: NarrativeScene[] = [
  {
    id: 'act2_ch3_s1_deep_mines',
    chapterId: 'ch-2-3',
    sceneNumber: 1,
    title: 'La Descente vers le Niveau 12',
    type: 'exploration',
    readAloud: `L'ascenseur de mine grince et gémit en descendant dans les entrailles de la montagne. Chaque niveau qui défile est plus sombre, plus silencieux que le précédent. Au Niveau 6, les bruits de forge s'estompent. Au Niveau 9, même la lumière des cristaux se raréfie. Au Niveau 11, le silence est si profond que vous entendez votre propre sang pulser dans vos oreilles.

L'ascenseur s'arrête au Niveau 12 avec un grincement qui résonne comme un cri dans le vide. Les portes s'ouvrent sur une caverne naturelle immense — le plafond se perd dans l'obscurité, et les murs suintent d'une humidité glaciale qui n'a rien de naturel.

Le sol est jonché de rails abandonnés, de chariots renversés, d'outils laissés en place comme si les mineurs avaient tout lâché dans un instant de panique absolue. Des casques, des gamelles, une paire de bottes — les signes d'une fuite précipitée. Et dans la poussière, des empreintes. Pas seulement des bottes naines — des griffes. Des griffes à trois doigts, profondes, qui entaillent la roche comme du beurre.

La Boussole des Sceaux dans votre poche vibre si fort qu'elle en est douloureuse. Le Sceau est proche. Et il souffre.`,
    gmNotes: `Exploration en trois zones. Zone 1 — Camp abandonné : indices sur ce qui s'est passé (journal de mineur, outils marqués de runes de protection hâtives). Zone 2 — Tunnels de forage de Durgan : les tunnels sont orientés droit vers le Sceau. Jet de Mines/Nature DC 30 révèle que cette direction est géologiquement absurde — pas de minerai ici. C'est du sabotage délibéré. Zone 3 — La Caverne du Sceau (scène suivante). Les 4 guerriers nains qui escortent le groupe sont nerveux mais disciplinés. Leur chef, Thane Korrin, est un vétéran silencieux qui commence à réaliser l'ampleur du danger. Rencontre possible : 2 Ombres Rampantes (CR 2) qui attaquent dans les tunnels de forage — les guerriers nains aident au combat.`,
    dialogues: [
      {
        npcId: 'npc_korrin',
        npcName: 'Thane Korrin',
        lines: [
          { trigger: 'Dans l\'ascenseur', text: `*Il caresse le manche de sa hache.* Le Niveau 12. Les anciens l'appelaient « le Murmure ». C'est le dernier endroit où on entend encore les forges au-dessus. En dessous, il n'y a que le silence de la pierre. Et maintenant... *il tend l'oreille.* Autre chose que le silence.`, tone: 'grave' },
          { trigger: 'Découverte des tunnels de Durgan', text: `*Il examine la direction des tunnels, puis sa boussole de mineur.* Nord-nord-ouest. Il n'y a RIEN de valeur dans cette direction. Pas de fer, pas de cuivre, pas même du charbon. Durgan a foré trois cents mètres de roche pour... quoi ? *Son visage se durcit.* Pour atteindre quelque chose. Quelque chose que la montagne protégeait.`, tone: 'réalisation-froide' },
        ],
      },
    ],
    objectives: [
      { description: 'Descendre au Niveau 12 et explorer le camp abandonné', type: 'explore', optional: false },
      { description: 'Découvrir les tunnels de forage suspects de Durgan', type: 'investigate', optional: false },
      { description: 'Atteindre la Caverne du Sceau', type: 'explore', optional: false },
    ],
    transitions: [
      { condition: 'Arrivée à la Caverne du Sceau', nextScene: 'act2_ch3_s2_seal_battle', label: '→ Le Sceau des Profondeurs' },
    ],
    skillChecks: [
      { skill: 'Investigation', dc: 30, success: 'Le journal d\'un mineur décrit des « murmures qui viennent des murs » et des « ombres qui marchent seules ». Le dernier mot est : « Fuyez. »', failure: 'Le journal est trop endommagé pour être lu.' },
      { skill: 'Nature', dc: 30, success: 'La direction des tunnels de Durgan est géologiquement absurde. Il n\'y a aucune raison minière de forer ici.', failure: 'Les tunnels semblent normaux pour un non-spécialiste.' },
    ],
    encounters: ['2x Ombre Rampante (CR 2) — dans les tunnels'],
    loot: ['Journal du Mineur disparu', 'Pic de mineur nain en acier stellaire', '30 PO en pépites d\'or'],
    estimatedMinutes: 25,
    mood: 'claustrophobie-horreur',
    music: 'Mine profonde — silence, craquements de pierre, bourdonnement grave',
    location: 'Hammerdeep — Niveau 12, Le Murmure',
  },
  {
    id: 'act2_ch3_s2_seal_battle',
    chapterId: 'ch-2-3',
    sceneNumber: 2,
    title: 'Le Sceau des Profondeurs',
    type: 'combat',
    readAloud: `La caverne s'ouvre comme une cathédrale souterraine. Le plafond s'arque à cinquante mètres au-dessus de vous, soutenu par des colonnes naturelles de basalte noir. Et au centre, gravé dans le sol avec une précision surnaturelle, le Sceau des Profondeurs.

C'est un cercle de runes de quinze mètres de diamètre, autrefois d'un bleu étincelant, maintenant strié de fissures vert-noir qui pulsent comme des veines malades. La lumière du Sceau est arythmique — un cœur qui bat de travers. De chaque fissure s'élève une brume d'encre qui rampe le long du sol et s'enroule autour des colonnes comme des tentacules.

Devant le Sceau, une silhouette massive. Un Gardien de Pierre — autrefois protecteur sacré du Sceau, maintenant corrompu par l'ombre qui s'infiltre. Son corps de basalte est veiné de lignes noires, ses yeux anciens brûlent d'un vert maladif, et de sa bouche coule une fumée d'ombre. À ses pieds, trois Démons d'Ombre plus grands que ceux de Sol-Aureus — plus solides, plus affamés.

Le Gardien Corrompu lève un poing de pierre et rugit. Le son est celui de la montagne elle-même qui hurle de douleur. Les murs tremblent. Des stalactites se détachent du plafond.

Thane Korrin lève sa hache et crie un mot nain ancien — un cri de guerre qui n'a pas été entendu depuis des générations.

Le combat pour le Sceau des Profondeurs commence.`,
    gmNotes: `COMBAT MAJEUR DE L'ACTE 2. Phase 1 : 3 Démons d'Ombre Majeurs (CR 3 chacun) + le Gardien de Pierre Corrompu (CR 6, HP 95, ATK +8, AC 17, Résistances physiques, Immunité poison). Le Gardien utilise Poing de Pierre (2d10+6), Souffle de Cendres Noires (cône 9m, 4d6 nécrotique, CD 45 CON), et peut invoquer 2 Ombres Mineures par round (max 4 actives). Phase 2 (Gardien à 50% HP) : il se lie au Sceau et commence à l'absorber. Les PJ ont 5 rounds pour le vaincre ou le Sceau se brise définitivement. TACTIQUE : la Boussole des Sceaux peut être utilisée comme focus pour un rituel de renforcement (Arcanes DC 35, 1 action, donne Vulnérabilité radieuse au Gardien pendant 3 rounds). Les guerriers nains combattent les Démons, laissant le Gardien aux PJ. Thane Korrin tombe au round 4 si les PJ ne le protègent pas — sa mort est un moment narratif puissant mais évitable.`,
    dialogues: [],
    objectives: [
      { description: 'Vaincre le Gardien de Pierre Corrompu', type: 'combat', optional: false },
      { description: 'Empêcher le Gardien d\'absorber le Sceau', type: 'combat', optional: false },
      { description: 'Protéger Thane Korrin et les guerriers nains', type: 'combat', optional: true },
      { description: 'Stabiliser le Sceau des Profondeurs', type: 'special', optional: false },
    ],
    transitions: [
      { condition: 'Victoire — Sceau stabilisé', nextScene: 'act2_ch3_s3_aftermath', label: '→ Les Cendres de la Victoire' },
    ],
    skillChecks: [
      { skill: 'Arcanes', dc: 35, success: 'La Boussole des Sceaux canalise l\'énergie résiduelle du Sceau. Le Gardien Corrompu subit la Vulnérabilité radieuse pendant 3 rounds.', failure: 'La Boussole vibre mais l\'énergie est trop chaotique. Pas d\'effet.' },
      { skill: 'Médecine', dc: 30, success: 'Thane Korrin est stabilisé après un coup critique du Gardien. Il survivra.', failure: 'Korrin est inconscient et en train de mourir. 3 jets de mort.' },
    ],
    encounters: ['3x Démon d\'Ombre Majeur (CR 3)', '1x Gardien de Pierre Corrompu (CR 6)', 'Invocations : jusqu\'à 4x Ombre Mineure (CR 1/4)'],
    loot: ['Cœur du Gardien (composant légendaire)', 'Éclat de Sceau Stabilisé', 'Essence d\'Ombre Concentrée x3'],
    estimatedMinutes: 40,
    mood: 'combat-épique-désespoir',
    music: 'Combat épique — percussions, chœur, tremblements',
    location: 'Hammerdeep — Caverne du Sceau des Profondeurs',
  },
  {
    id: 'act2_ch3_s3_aftermath',
    chapterId: 'ch-2-3',
    sceneNumber: 3,
    title: 'Les Cendres de la Victoire',
    type: 'dialogue',
    readAloud: `Le silence qui suit le combat est assourdissant. La poussière retombe lentement dans la caverne dévastée. Le Gardien de Pierre gît en morceaux fumants, la corruption d'ombre se dissipant comme de la brume au soleil. Le Sceau des Profondeurs pulse encore — faiblement, irrégulièrement, mais il pulse. Il tient. Pour l'instant.

Les guerriers nains comptent leurs blessés. Deux sur quatre sont debout. Thane Korrin, si vous l'avez protégé, s'appuie sur sa hache, le visage couvert de sang noir, et regarde le Sceau avec des yeux qui ont vu la vérité.

La remontée est lente. Chaque niveau qui passe ramène un peu de lumière, un peu de bruit, un peu de normalité. Quand vous émergez dans la grande caverne de Hammerdeep, le bruit des marteaux n'a jamais été aussi réconfortant.

Le Roi Thorin vous attend. Son visage est de pierre — une pierre qui a appris l'humilité.`,
    gmNotes: `Résolution du chapitre nain. Thorin reconnaît publiquement la menace — un acte de courage politique immense pour un roi nain. Il ordonne le scellement du Niveau 12, l'arrestation de Durgan (s'il n'a pas été neutralisé plus tôt), et offre l'aide naine pour la suite de la quête. Récompenses : 500 PO, une arme ou armure naine forgée sur mesure par personnage, et le titre de « Ami de Cœur-de-Fer » (avantage aux jets sociaux avec tous les nains). Le Sceau est stabilisé mais pas réparé — il faudra du Fer Stellaire pour le restaurer complètement, et Thorin possède le dernier lingot. Il accepte de le confier aux PJ quand ils seront prêts pour le rituel final. Hook vers les chapitres suivants : la Boussole des Sceaux pointe maintenant vers l'ouest — la Sylve d'Émeraude.`,
    dialogues: [
      {
        npcId: 'npc_thorin',
        npcName: 'Roi Thorin Poing-de-Fer',
        lines: [
          { trigger: 'Retour', text: `*Il regarde les guerriers blessés, puis vous.* Vous aviez raison. Et j'avais tort. *Pause.* Ce sont les six mots les plus difficiles qu'un roi nain puisse prononcer. Mais la vérité est la vérité. Durgan nous a trahis. Le Sceau de ma montagne est en danger. Et sans vous... *il ne finit pas.*`, tone: 'humble-royal' },
          { trigger: 'Récompenses et suite', text: `Le Niveau 12 sera scellé et gardé. Mes meilleurs forgerons créeront des armes pour vous — acier stellaire, le meilleur de Hammerdeep. Et le dernier lingot de Fer Stellaire... *il le sort d'un coffre.* Il est à vous quand vous en aurez besoin. Pour le rituel de restauration des Sceaux. Allez. Protégez les autres. Hammerdeep a une dette envers vous.`, tone: 'solennel' },
        ],
      },
    ],
    objectives: [
      { description: 'Remonter à la surface et faire rapport au Roi Thorin', type: 'talk', optional: false },
      { description: 'Recevoir les récompenses naines', type: 'special', optional: false },
      { description: 'Obtenir le Lingot de Fer Stellaire', type: 'collect', optional: false },
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 2-3', nextScene: 'act2_ch5_s1_emerald_border', label: '→ Chapitre 2-5 : La Sylve d\'Émeraude' },
    ],
    loot: ['500 PO', 'Arme ou Armure en Acier Stellaire +1 (1 par PJ)', 'Titre : Ami de Cœur-de-Fer', 'Lingot de Fer Stellaire (composant de quête)', '+30 Réputation Nains'],
    estimatedMinutes: 15,
    mood: 'victoire-solennelle',
    music: 'Nain triomphal — enclumes, chœur, percussions majestueuses',
    location: 'Hammerdeep — Grande Caverne',
  },
];

// --------------------------------------------------------------------------
// Chapitre 2-5 : La Sylve d'Émeraude (ch-2-5) — NOUVEAU
// --------------------------------------------------------------------------

const CH_2_5_SCENES: NarrativeScene[] = [
  {
    id: 'act2_ch5_s1_emerald_border',
    chapterId: 'ch-2-5',
    sceneNumber: 1,
    title: 'La Lisière de la Sylve',
    type: 'narration',
    readAloud: `Le voyage depuis Hammerdeep prend six jours. Les montagnes cèdent la place aux collines, puis aux plaines, et enfin à un horizon vert si intense qu'il semble irréel. La Sylve d'Émeraude ne commence pas graduellement — elle surgit. Un instant, vous êtes sur une route de terre battue bordée de champs ; l'instant d'après, un mur de végétation se dresse devant vous, si dense et si haut qu'il bloque le soleil.

Les arbres de la Sylve sont anciens — certains ont des troncs si larges qu'il faudrait vingt personnes main dans la main pour en faire le tour. Leurs branches forment un dais continu, un plafond vivant de feuilles émeraude et dorées à travers lequel la lumière filtre en rayons obliques, créant des colonnes de lumière dans la brume matinale.

Et les arbres sont vivants. Pas au sens botanique — au sens profond. Ils murmurent. Un frémissement constant de feuilles et de branches qui ressemble à une conversation chuchotée dans une langue oubliée. Quand vous posez la main sur l'écorce, vous sentez un battement. Lent. Régulier. Un pouls végétal vieux de mille ans.

À la lisière, un sentier s'enfonce dans la pénombre verte. Et sur le sentier, immobile comme une statue, un elfe vous attend. Grand, mince, le visage ageless, des yeux vert forêt qui semblent vous connaître depuis toujours. Il porte une armure de bois vivant — littéralement — des branches et des feuilles tressées qui se meuvent lentement comme si elles respiraient.

« Nous vous attendions, Sentinelles. L'Arbre-Monde souffre. Suivez-moi. »`,
    gmNotes: `Changement d'ambiance radical après Hammerdeep. La Sylve d'Émeraude est un lieu de beauté et de magie naturelle — mais sous la surface, la corruption s'installe. L'elfe est Aelindra, Gardienne des Sentiers, qui guide les visiteurs autorisés. Les elfes savent déjà que les PJ arrivent — l'Arbre-Monde « voit » à travers toute la forêt. Le problème ici est différent : l'Archidruide Sylvanis, Gardien du Sceau elfique, est en train de mourir empoisonné par une corruption lente. Les Gardiens d'Émeraude (druides-guerriers elfes) sont divisés : certains veulent accepter l'aide extérieure, d'autres considèrent que c'est une affaire elfique. L'agent du Cercle des Cendres ici est plus subtil — pas un traître infiltré, mais un esprit ancien corrompu qui murmure à travers les racines de l'Arbre-Monde.`,
    dialogues: [
      {
        npcId: 'npc_aelindra',
        npcName: 'Aelindra, Gardienne des Sentiers',
        lines: [
          { trigger: 'Accueil', text: `L'Arbre-Monde a vu votre approche il y a trois jours. Vos pas résonnent dans le réseau racinaire comme des battements de tambour. Vous portez l'odeur de la pierre et du feu — Hammerdeep. Et sous cette odeur... l'ombre. Vous l'avez combattue. *Elle hoche la tête.* Bien. Nous en avons besoin ici aussi.`, tone: 'sereine-urgente' },
          { trigger: 'L\'Arbre-Monde', text: `L'Arbre-Monde est le cœur de la Sylve. Ses racines s'étendent sous toute la forêt — chaque arbre, chaque buisson, chaque brin d'herbe est connecté à lui. Le Sceau elfique est tissé dans ses racines. Quand l'Arbre souffre, le Sceau s'affaiblit. Et en ce moment... *elle touche une branche proche, qui noircit sous ses doigts.* Il souffre beaucoup.`, tone: 'triste' },
        ],
      },
    ],
    objectives: [
      { description: 'Entrer dans la Sylve d\'Émeraude', type: 'explore', optional: false },
      { description: 'Suivre Aelindra vers l\'Arbre-Monde', type: 'explore', optional: false },
      { description: 'Apprendre la nature de la menace elfique', type: 'talk', optional: false },
    ],
    transitions: [
      { condition: 'Arrivée au Bosquet Sacré', nextScene: 'act2_ch5_s2_world_tree', label: '→ L\'Arbre-Monde' },
    ],
    skillChecks: [
      { skill: 'Nature', dc: 25, success: 'Les feuilles qui noircissent ne sont pas malades — elles sont corrompues par une magie d\'ombre qui s\'infiltre par les racines. C\'est le même type de corruption que celle des Sceaux.', failure: 'Les arbres semblent malades mais vous ne pouvez pas identifier la cause.' },
    ],
    estimatedMinutes: 15,
    mood: 'émerveillement-inquiétude',
    music: 'Forêt elfique — harpe, vent dans les feuilles, chants d\'oiseaux',
    location: 'Sylve d\'Émeraude — Lisière ouest',
  },
  {
    id: 'act2_ch5_s2_world_tree',
    chapterId: 'ch-2-5',
    sceneNumber: 2,
    title: 'L\'Arbre-Monde',
    type: 'dialogue',
    readAloud: `Rien ne vous a préparé à la vue de l'Arbre-Monde. C'est... un monde en soi. Son tronc fait deux cents mètres de diamètre — une montagne de bois vivant qui s'élève si haut que sa cime se perd dans les nuages. Ses branches principales, chacune aussi large qu'un fleuve, portent des plateformes de bois sculpté où des elfes vivent, travaillent et prient. Des escaliers en spirale s'enroulent autour du tronc comme des lianes, éclairés par des lanternes de sève luisante.

Mais la beauté est ternie par la maladie. Des veines noires rampent le long de l'écorce, pulsant faiblement d'une lueur malsaine. Les feuilles les plus basses sont grises, mortes. Et à la base du tronc, dans une grotte formée par les racines géantes, un vieil elfe est allongé sur un lit de mousse. C'est l'Archidruide Sylvanis — le Gardien du Sceau.

Il est pâle comme la lune, les yeux cernés de noir, et quand il respire, les veines sombres de l'Arbre pulsent au même rythme. Il est lié à l'Arbre. Et l'Arbre est lié au Sceau. Et les trois sont en train de mourir ensemble.

Autour de lui, des druides aux visages graves maintiennent un rituel de guérison permanent — un chant continu, un flux de magie verte qui lutte contre la corruption noire. Mais c'est une bataille d'usure qu'ils sont en train de perdre.`,
    gmNotes: `Scène émotionnelle clé. Sylvanis est mourant mais lucide. Il peut communiquer par bribes — chaque mot lui coûte de l'énergie. Ce qu'il sait : la corruption vient d'en dessous, des racines les plus profondes de l'Arbre-Monde, là où un esprit ancien — Nocthrael, un serviteur des Scellés emprisonné dans les racines il y a mille ans — s'est éveillé et empoisonne l'Arbre de l'intérieur. Le Sceau est dans les racines profondes, tissé dans le bois même de l'Arbre. Pour le sauver, il faut descendre dans le Cœur-Racine, affronter Nocthrael, et purifier la source de corruption. Les Gardiens d'Émeraude sont divisés : la Commandante Vaelith veut accepter l'aide des PJ, le Sage Eryndor refuse toute intervention extérieure dans les affaires elfiques.`,
    dialogues: [
      {
        npcId: 'npc_sylvanis',
        npcName: 'Archidruide Sylvanis',
        lines: [
          { trigger: 'Premiers mots', text: `*Sa voix est un murmure de feuilles mortes.* Sentinelles... l'Arbre vous a montrés en rêve. Vous portez la lumière du Sceau nain... du fer et du feu... *Il tousse — de la sève noire.* Écoutez. Dans mes racines. Quelque chose... murmure. Quelque chose d'ancien. Il promet la liberté aux arbres... mais c'est un mensonge. Il les dévore de l'intérieur.`, tone: 'mourant-lucide' },
          { trigger: 'Nocthrael', text: `*Ses yeux s'écarquillent.* Nocthrael. L'Alliance des Sept l'a emprisonné dans les racines comme... punition. Un gardien devenu prisonnier. Mais les fissures dans les Sceaux... elles l'ont réveillé. Il corrompt l'Arbre. Il corrompt le Sceau. Il me corrompt. *Une larme verte coule.* Descendez dans le Cœur-Racine. Trouvez-le. Arrêtez-le. Avant que je ne devienne... son instrument.`, tone: 'désespéré' },
        ],
      },
      {
        npcId: 'npc_vaelith',
        npcName: 'Commandante Vaelith des Gardiens d\'Émeraude',
        lines: [
          { trigger: 'Briefing', text: `Le Cœur-Racine est le réseau de tunnels formés par les racines principales de l'Arbre-Monde. C'est un labyrinthe vivant — les racines bougent, les chemins changent. Nous vous guiderons jusqu'à l'entrée, mais au-delà... nous ne pouvons pas vous accompagner. Les Gardiens doivent maintenir le rituel de guérison, ou l'Archidruide mourra avant que vous ne reveniez.`, tone: 'militaire-émue' },
        ],
      },
    ],
    objectives: [
      { description: 'Atteindre l\'Arbre-Monde et évaluer la situation', type: 'explore', optional: false },
      { description: 'Parler à l\'Archidruide Sylvanis', type: 'talk', optional: false },
      { description: 'Apprendre l\'existence de Nocthrael', type: 'talk', optional: false },
      { description: 'Convaincre les Gardiens d\'Émeraude de les laisser descendre', type: 'talk', optional: false },
    ],
    transitions: [
      { condition: 'Permission obtenue, direction le Cœur-Racine', nextScene: 'act2_ch5_s3_root_heart', label: '→ Le Cœur-Racine' },
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 35, success: 'Le Sage Eryndor accepte à contrecœur. « Si l\'Arbre-Monde meurt à cause de vous, aucune forêt d\'Aethelgard ne vous abritera plus jamais. »', failure: 'Eryndor refuse. Il faut passer par Vaelith, ce qui crée une tension politique elfique.' },
      { skill: 'Médecine', dc: 35, success: 'La corruption de Sylvanis est identique à celle du Sceau de Hammerdeep. Même source, même méthode. Le Cercle des Cendres utilise un schéma.', failure: 'La corruption est d\'origine magique, mais sa nature exacte vous échappe.' },
    ],
    estimatedMinutes: 20,
    mood: 'émerveillement-désespoir',
    music: 'Elfique sombre — harpe mineure, chants funèbres, vent',
    location: 'Sylve d\'Émeraude — Bosquet Sacré de l\'Arbre-Monde',
  },
  {
    id: 'act2_ch5_s3_root_heart',
    chapterId: 'ch-2-5',
    sceneNumber: 3,
    title: 'Le Cœur-Racine',
    type: 'combat',
    readAloud: `L'entrée du Cœur-Racine est une faille entre deux racines géantes, chacune aussi large qu'un tunnel de mine. L'intérieur est un monde à part : des tunnels de bois vivant, pulsant d'une lueur verte, les parois couvertes de motifs organiques qui changent lentement comme les nervures d'une feuille.

Plus vous descendez, plus la corruption est visible. Les parois vertes cèdent la place à un bois noir et suintant. La lumière naturelle s'éteint, remplacée par une phosphorescence malsaine. L'air sent la terre mouillée et la pourriture — pas la pourriture naturelle de la forêt, mais quelque chose d'artificiel, de forcé.

Au cœur du réseau racinaire, dans une chambre formée par l'entrelacement de mille racines, vous le trouvez. Nocthrael.

Il ne ressemble pas à un démon. Il ressemble à un elfe — un elfe d'une beauté terrifiante, les cheveux de jais, la peau pâle comme la lune d'hiver, les yeux entièrement noirs. Il est assis au centre de la chambre, les jambes croisées, les mains posées sur deux racines maîtresses. De ses paumes, la corruption noire coule dans le bois comme du poison dans des veines.

Il ouvre les yeux. Et sourit.

« Ah. Les petits héros de la Reine. Je me demandais quand vous viendriez. Asseyez-vous. Nous avons tant à nous dire avant que je ne doive vous tuer. »`,
    gmNotes: `BOSS DU CHAPITRE — Nocthrael (CR 7). Ancien serviteur elfique des Scellés, emprisonné ici il y a mille ans. Il est charmeur, intelligent, et sincèrement convaincu que les Scellés doivent être libérés. Phase de dialogue AVANT le combat : il tente de corrompre les PJ avec des vérités partielles (« L'Alliance des Sept n'étaient pas des héros — ils ont enchaîné la moitié de la réalité par peur »). Jets de Sagesse DC 35 pour résister à sa persuasion surnaturelle. COMBAT : Nocthrael utilise des sorts d'ombre + contrôle des racines corrompues. Phase 1 : Sort + racines animées (tentacules, 2d6 contondant, grappin). Phase 2 (50% HP) : il fusionne partiellement avec l'Arbre, gagnant Régénération 10/round mais devenant Vulnérable au feu et à la magie radieuse. Si les PJ versent la sève de l'Arbre-Monde (fournie par Vaelith) sur les racines corrompues, Nocthrael perd sa connexion et sa régénération.`,
    dialogues: [
      {
        npcId: 'npc_nocthrael',
        npcName: 'Nocthrael',
        lines: [
          { trigger: 'Avant le combat', text: `*Il parle avec une douceur hypnotique.* Vous pensez que je suis le méchant de cette histoire ? Je suis un prisonnier. Enfermé dans ces racines depuis mille ans par des « héros » qui avaient peur de ce qu'ils ne comprenaient pas. Les Scellés ne sont pas des démons — ce sont les anciens maîtres de ce monde. Et ce monde leur a été volé.`, tone: 'séducteur' },
          { trigger: 'Provocation', text: `*Son sourire se durcit.* Assez parlé. Vous êtes venus purifier les racines ? Essayez. Mais sachez que chaque coup que vous me porterez, l'Arbre le ressentira aussi. Nous sommes liés, lui et moi. Vous ne pouvez pas me tuer sans le blesser. *Il rit.* C'est le problème avec les héros — ils n'aiment pas les choix difficiles.`, tone: 'menaçant' },
        ],
      },
    ],
    objectives: [
      { description: 'Atteindre le cœur du réseau racinaire', type: 'explore', optional: false },
      { description: 'Confronter Nocthrael', type: 'combat', optional: false },
      { description: 'Purifier les racines corrompues avec la sève de l\'Arbre-Monde', type: 'special', optional: false },
      { description: 'Vaincre Nocthrael sans détruire le Sceau', type: 'combat', optional: false },
    ],
    transitions: [
      { condition: 'Nocthrael vaincu, racines purifiées', nextScene: 'act2_ch5_s4_healing', label: '→ La Guérison de l\'Arbre-Monde' },
    ],
    skillChecks: [
      { skill: 'Sagesse', dc: 35, success: 'Vous résistez au charme surnaturel de Nocthrael. Ses paroles sont séduisantes mais vous percevez le mensonge sous la vérité partielle.', failure: 'Désavantage aux jets d\'attaque contre Nocthrael pendant le premier round — ses mots vous ont troublé.' },
      { skill: 'Arcanes', dc: 35, success: 'La sève de l\'Arbre-Monde, versée sur les racines, brise la connexion de Nocthrael. Sa régénération cesse.', failure: 'La sève semble agir mais pas assez. Nocthrael conserve sa régénération réduite (5/round).' },
    ],
    encounters: ['1x Nocthrael (CR 7)', '4x Racine Corrompue Animée (CR 1)'],
    loot: ['Essence de Nocthrael (composant légendaire)', 'Bois-Cœur de l\'Arbre-Monde (composant de quête pour Sceau)', 'Dague elfique ancienne de Nocthrael'],
    estimatedMinutes: 40,
    mood: 'horreur-beauté-combat',
    music: 'Combat elfique — chœur dramatique, percussions organiques, harpe sinistre',
    location: 'Sylve d\'Émeraude — Cœur-Racine de l\'Arbre-Monde',
  },
  {
    id: 'act2_ch5_s4_healing',
    chapterId: 'ch-2-5',
    sceneNumber: 4,
    title: 'La Guérison de l\'Arbre-Monde',
    type: 'transition',
    readAloud: `Nocthrael tombe. Son corps se dissout en une fumée noire qui est aspirée par les racines — non pas pour les corrompre, mais pour être digérée. L'Arbre-Monde reprend ce qui lui a été volé.

La transformation est immédiate et spectaculaire. Les veines noires sur les racines s'éclaircissent, passant du noir au gris, puis au vert. La lumière naturelle revient — d'abord faible, puis éclatante, comme un lever de soleil dans les entrailles de la terre. Les racines pulsent d'une énergie retrouvée, et dans cette pulsation, vous sentez le Sceau se raffermir.

En remontant, la forêt elle-même semble célébrer. Les feuilles mortes tombent et sont remplacées en temps réel par de nouvelles pousses d'un vert éclatant. Des fleurs s'ouvrent au passage, des oiseaux chantent des mélodies que personne n'a entendues depuis un millénaire, et la lumière qui filtre à travers le dais est d'un or si pur qu'il semble solide.

À la surface, l'Archidruide Sylvanis s'est redressé. La couleur est revenue sur ses joues. Il regarde ses mains, puis l'Arbre-Monde, puis vous. Et pour la première fois depuis des semaines, il sourit.`,
    gmNotes: `Moment de triomphe et de récompense. Sylvanis est sauvé et le Sceau elfique est stabilisé. Les elfes célèbrent avec un festin sous les étoiles — ambiance magique, lumières de lucioles, musique elfique. Récompenses : 400 PO en gemmes émeraude, un arc ou bâton elfique enchanté par personnage, le titre de « Protecteurs de la Sylve », et un allié permanent en Commandante Vaelith. Sylvanis offre le Bois-Cœur — composant nécessaire pour le rituel de restauration des Sceaux. Il confie aussi une prophétie : « Les Cités Libres sont le prochain nœud du fil. Le commerce y cache plus que des marchandises — il cache un Sceau dans les fondations du port. Et le Cercle y a un agent plus ancien et plus puissant que tous ceux que vous avez rencontrés. » Hook vers le chapitre 2-6.`,
    dialogues: [
      {
        npcId: 'npc_sylvanis',
        npcName: 'Archidruide Sylvanis',
        lines: [
          { trigger: 'Gratitude', text: `*Il touche l'écorce de l'Arbre-Monde avec révérence.* Vous avez sauvé plus qu'un arbre. Vous avez sauvé la mémoire vivante de la Sylve — chaque souvenir d'elfe qui a vécu sous ces branches depuis mille ans vit dans ces racines. *Il se tourne vers vous.* L'Arbre-Monde a un cadeau pour vous. Tendez vos mains.`, tone: 'reconnaissant' },
          { trigger: 'Prophétie', text: `*Ses yeux se voilent de vert.* Je vois... de l'eau salée. Des navires. Une cité bâtie sur le commerce et le mensonge. Les Cités Libres. Le Sceau y est ancien — plus ancien que la ville elle-même, enfoui dans les fondations du Grand Port. Et celui qui le garde... n'est plus celui qu'il était. L'Ombre a des racines là aussi. Plus profondes. Plus anciennes. Soyez prudents.`, tone: 'prophétique' },
        ],
      },
    ],
    objectives: [
      { description: 'Assister à la guérison de l\'Arbre-Monde', type: 'special', optional: false },
      { description: 'Recevoir les récompenses elfiques', type: 'special', optional: false },
      { description: 'Écouter la prophétie de Sylvanis sur les Cités Libres', type: 'talk', optional: false },
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 2-5', nextScene: 'act2_ch6_s1_free_cities_arrival', label: '→ Chapitre 2-6 : Les Cités Libres' },
    ],
    loot: ['400 PO en gemmes émeraude', 'Arc ou Bâton elfique enchanté +1 (1 par PJ)', 'Titre : Protecteurs de la Sylve', 'Bois-Cœur de l\'Arbre-Monde (composant de quête)', '+30 Réputation Elfes'],
    estimatedMinutes: 15,
    mood: 'triomphe-beauté',
    music: 'Elfique triomphal — harpe majeure, chœur, lumière',
    location: 'Sylve d\'Émeraude — Bosquet Sacré',
  },
];

// --------------------------------------------------------------------------
// Chapitre 2-6 : Les Cités Libres (ch-2-6) — NOUVEAU
// --------------------------------------------------------------------------

const CH_2_6_SCENES: NarrativeScene[] = [
  {
    id: 'act2_ch6_s1_free_cities_arrival',
    chapterId: 'ch-2-6',
    sceneNumber: 1,
    title: 'Le Port de Havrelibre',
    type: 'narration',
    readAloud: `Après les profondeurs de Hammerdeep et le silence sacré de la Sylve, les Cités Libres sont un choc sensoriel. Havrelibre — la plus grande des cinq cités — est un chaos magnifique de bruit, de couleur et d'odeur.

Le Grand Port s'étend sur trois kilomètres de quais encombrés de navires venus de tous les horizons. Des galions marchands aux voiles de soie côtoient des barges de pêche cabossées, des drakkars nordiques et des caravelles exotiques aux coques peintes de motifs flamboyants. L'air sent le sel, le poisson, le goudron, les épices, et un soupçon de magie — car à Havrelibre, tout se vend, même l'impossible.

Les rues sont un labyrinthe de marchés permanents, de tavernes ouvertes jour et nuit, de temples à tous les dieux imaginables, et de bâtiments qui défient l'urbanisme avec une joyeuse anarchie. Des gnomes vendent des automates miniatures à côté d'un troll qui propose des massages, un tiefling tient un stand de « prophéties garanties ou remboursées », et quelque part, un orchestre improvisé joue une mélodie qui change de genre musical à chaque mesure.

La Boussole des Sceaux vibre faiblement, pointant vers les fondations du Grand Port. Quelque part sous cette ville de commerce et de chaos, un Sceau attend. Et le Cercle des Cendres aussi.`,
    gmNotes: `Les Cités Libres offrent un contraste total avec les zones précédentes. Ici, pas de roi, pas de hiérarchie claire — le pouvoir est entre les mains du Conseil des Cinq, cinq marchands-princes qui gouvernent par le commerce et la diplomatie. Le Sceau est sous le Grand Port, dans un complexe souterrain ashkan transformé en entrepôts par les marchands (sans connaître sa vraie nature). L'agent du Cercle ici est le Maître Portuaire Varen — un homme que personne ne soupçonne car il est aimé de tous. Il contrôle les accès aux entrepôts souterrains et a lentement érodé le Sceau en détournant les flux magiques. L'enquête ici est plus politique et sociale — il faut naviguer les factions marchandes pour accéder aux souterrains.`,
    dialogues: [],
    objectives: [
      { description: 'Arriver à Havrelibre et découvrir les Cités Libres', type: 'explore', optional: false },
      { description: 'Localiser la direction du Sceau avec la Boussole', type: 'investigate', optional: false },
      { description: 'Trouver un contact local', type: 'talk', optional: false },
    ],
    transitions: [
      { condition: 'Exploration initiale terminée', nextScene: 'act2_ch6_s2_underport', label: '→ Les Entrepôts du Grand Port' },
    ],
    skillChecks: [
      { skill: 'Perception', dc: 25, success: 'Vous remarquez que les fondations du Grand Port sont bâties sur des pierres bien plus anciennes que le reste — des pierres noires ashkanes, partiellement dissimulées par le mortier.', failure: 'La ville semble simplement vieille et mal entretenue.' },
    ],
    estimatedMinutes: 15,
    mood: 'chaos-vivant',
    music: 'Port — mouettes, vagues, marchands, musique éclectique',
    location: 'Cités Libres — Havrelibre, Grand Port',
  },
  {
    id: 'act2_ch6_s2_underport',
    chapterId: 'ch-2-6',
    sceneNumber: 2,
    title: 'Les Entrailles du Grand Port',
    type: 'exploration',
    readAloud: `L'accès aux entrepôts souterrains du Grand Port nécessite un laissez-passer du Maître Portuaire — ou de la créativité. Les niveaux supérieurs sont un réseau de caves à vin, de réserves de marchandises et de coffres-forts de marchands. L'air sent le sel, le bois et la fortune.

Mais plus bas, sous les entrepôts légitimes, la construction change. Les murs de brique et de bois cèdent la place à la pierre noire ashkane — lisse, gravée de runes éteintes, avec cette géométrie étrange qui tord légèrement la perspective. Vous êtes dans un temple ashkan, transformé en cave à vin par des marchands ignorants. Des tonneaux de rhum reposent sur des autels sacrificiels. Des caisses de soie sont empilées sur des cercles rituels.

Et tout au fond, derrière une porte scellée par une rune qui pulse encore faiblement, la Boussole des Sceaux s'affole. Le Sceau des Marées est ici — un cercle de runes marines, gravé dans du corail fossilisé, autrefois bleu azur, maintenant strié de lignes noires comme les précédents.

Mais celui-ci est différent. Il n'est pas gardé par un démon ou un esprit corrompu. Il est gardé par un homme. Le Maître Portuaire Varen, assis à côté du Sceau, une lanterne à la main, qui vous attendait.

« Je me demandais combien de temps il vous faudrait. Bienvenue dans mon bureau. Le vrai. »`,
    gmNotes: `Révélation et confrontation. Varen n'est pas un fanatique — c'est un pragmatique. Il a découvert le Sceau par accident il y a dix ans et a été contacté par le Cercle des Cendres. Il croit sincèrement que briser les Sceaux est nécessaire pour sauver le monde (les Scellés, selon le Cercle, maintenaient un équilibre que l'Alliance a rompu). C'est le premier adversaire qui offre un argument cohérent. CHOIX MORAL : Varen propose un marché — il arrête d'affaiblir le Sceau si les PJ l'écoutent et enquêtent sur ce que les Scellés sont vraiment (sa quête personnelle). Si les PJ refusent, combat. Si les PJ acceptent, ils gagnent un allié ambigu mais l'information qu'il possède est cruciale pour l'Acte 3. COMBAT (si refus) : Varen (CR 5, roublard/mage) + 2 Gardes Portuaires corrompus (CR 3) + le Sceau commence à se fissurer (5 rounds avant rupture). OBJECTIF ALTERNATIF : convaincre Varen par la diplomatie (Persuasion DC 45 + argument convaincant basé sur ce que les PJ ont appris dans les chapitres précédents).`,
    dialogues: [
      {
        npcId: 'npc_varen',
        npcName: 'Maître Portuaire Varen',
        lines: [
          { trigger: 'Accueil', text: `*Il reste assis, détendu, comme s'il recevait des amis.* Ne me regardez pas comme ça. Je ne suis pas un monstre. Je suis un homme qui a trouvé une vérité dérangeante et qui a eu le courage d'agir. Les Sceaux ne protègent pas le monde — ils l'emprisonnent. Et nous, nous vivons dans la prison sans le savoir.`, tone: 'calme-convaincu' },
          { trigger: 'Son argument', text: `Vous avez combattu des démons d'ombre, des gardiens corrompus, des esprits millénaires. Mais avez-vous demandé POURQUOI ils sont emprisonnés ? L'Alliance des Sept n'étaient pas des saints — c'étaient des conquérants. Les Scellés gouvernaient ce monde avant eux. L'Alliance les a enfermés et a réécrit l'histoire. *Il sort un livre — un grimoire ancien.* Lisez ça. Puis dites-moi si je suis le méchant.`, tone: 'professoral' },
          { trigger: 'Confrontation violente', text: `*Il soupire.* J'espérais mieux. *Il se lève, et l'ombre autour de lui s'épaissit.* Très bien. Si vous ne voulez pas écouter, nous ferons ça à la manière traditionnelle. Mais rappelez-vous : je vous ai offert la paix. C'est vous qui avez choisi la guerre.`, tone: 'résigné-dangereux' },
        ],
      },
    ],
    objectives: [
      { description: 'Descendre dans les souterrains ashkans sous le Grand Port', type: 'explore', optional: false },
      { description: 'Trouver le Sceau des Marées', type: 'investigate', optional: false },
      { description: 'Confronter le Maître Portuaire Varen', type: 'choice', optional: false },
      { description: 'Stabiliser ou protéger le Sceau des Marées', type: 'special', optional: false },
    ],
    transitions: [
      { condition: 'Combat gagné ou accord négocié', nextScene: 'act2_ch6_s3_resolution', label: '→ Le Prix de la Vérité' },
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 45, success: 'Varen est ébranlé par vos arguments. Il accepte de cesser son sabotage et de partager ses informations sur le Cercle en échange d\'une enquête sur la véritable nature des Scellés.', failure: 'Varen secoue la tête. « Vous êtes aveugles. Comme tous les autres. » Le combat commence.' },
      { skill: 'Histoire', dc: 35, success: 'Le grimoire de Varen contient des fragments authentiques de l\'ère pré-Alliance. Certaines affirmations sont vérifiables — l\'histoire est plus complexe que ce qu\'on enseigne.', failure: 'Le grimoire est trop ancien et cryptique pour être vérifié rapidement.' },
    ],
    encounters: ['1x Maître Portuaire Varen (CR 5) — si combat', '2x Garde Portuaire Corrompu (CR 3) — si combat'],
    loot: ['Grimoire Ashkan des Origines (artefact de lore)', 'Clé des Entrepôts Portuaires', 'Fragment de Corail du Sceau des Marées (composant de quête)'],
    estimatedMinutes: 35,
    mood: 'dilemme-moral',
    music: 'Souterrain maritime — eau, échos, tension',
    location: 'Cités Libres — Souterrains Ashkans du Grand Port',
  },
  {
    id: 'act2_ch6_s3_resolution',
    chapterId: 'ch-2-6',
    sceneNumber: 3,
    title: 'Le Prix de la Vérité',
    type: 'choice',
    readAloud: `Que Varen soit un allié réticent ou un ennemi vaincu, le Sceau des Marées est stabilisé. Mais cette victoire a un goût différent des précédentes. Les certitudes se fissurent comme les Sceaux eux-mêmes.

De retour à la surface, Havrelibre continue son ballet frénétique de commerce et de vie, indifférente aux drames qui se jouent sous ses pavés. Le soleil se couche sur le Grand Port, peignant les voiles des navires en orange et pourpre.

Le Conseil des Cinq vous reçoit dans la Salle des Négoces — une pièce ronde où cinq trônes de bois précieux font face à un bassin central rempli d'eau de mer. Les cinq marchands-princes écoutent votre rapport avec des expressions allant de l'incrédulité à la terreur.

Le plus vieux d'entre eux, le Prince-Marchand Arkelos — un homme sec comme un parchemin, aux yeux vifs comme un renard — parle le premier.

« Trois Sceaux stabilisés. Deux encore en danger. Et un culte millénaire qui opère dans l'ombre. » Il se penche en avant. « Que faut-il pour finir ce travail ? »`,
    gmNotes: `Conclusion de l'Acte 2. Les PJ ont stabilisé trois Sceaux sur cinq (Sol-Aureus, Hammerdeep, Sylve + Cités Libres = 4 si on compte le premier). Récompenses d'Havrelibre : 600 PO, un objet magique rare au choix dans le Bazar Enchanté, et le titre de « Protecteurs des Routes » (avantage commercial partout). La grande révélation de fin d'acte : les informations de Varen (ou trouvées dans le grimoire) suggèrent que la vérité sur les Scellés n'est pas aussi simple que « monstres enfermés par des héros ». C'est le fil qui mènera à l'Acte 3. Les deux Sceaux restants sont dans les Terres Brûlées et les Îles du Crépuscule — territoires bien plus dangereux. Le Cercle des Cendres, ayant perdu trois agents, va devenir plus agressif et désespéré. Le mystérieux Malachi est toujours en liberté. FIN DE L'ACTE 2.`,
    dialogues: [
      {
        npcId: 'npc_arkelos',
        npcName: 'Prince-Marchand Arkelos',
        lines: [
          { trigger: 'Récompense', text: `Les Cités Libres paient leurs dettes. *Il claque des doigts — un coffre est apporté.* Six cents pièces d'or. Un accès illimité au Bazar Enchanté — choisissez un objet, n'importe lequel. Et le titre de Protecteurs des Routes. Mes caravanes vous transporteront gratuitement n'importe où dans Aethelgard. *Il marque une pause.* Et si vous avez besoin de navires... je connais quelqu'un.`, tone: 'professionnel' },
          { trigger: 'La suite', text: `*Il tapote la table.* Deux Sceaux restants. Les Terres Brûlées et les Îles du Crépuscule. Les deux endroits les plus dangereux d'Aethelgard. Mes espions rapportent que le Cercle des Cendres concentre ses forces là-bas — ils savent que vous venez. *Sourire.* C'est comme dans le commerce : plus on approche du deal final, plus les enjeux montent.`, tone: 'pragmatique' },
        ],
      },
    ],
    objectives: [
      { description: 'Stabiliser le Sceau des Marées', type: 'special', optional: false },
      { description: 'Faire un rapport au Conseil des Cinq', type: 'talk', optional: false },
      { description: 'Recevoir les récompenses d\'Havrelibre', type: 'special', optional: false },
      { description: 'Réfléchir aux révélations de Varen sur les Scellés', type: 'special', optional: true },
    ],
    transitions: [
      { condition: 'FIN DE L\'ACTE 2', nextScene: 'act3_ch1_burned_lands', label: '→ ACTE 3 — Les Terres Brûlées' },
    ],
    loot: ['600 PO', 'Objet magique rare au choix (Bazar Enchanté)', 'Titre : Protecteurs des Routes', 'Transport gratuit via caravanes marchandes', '+25 Réputation Cités Libres'],
    estimatedMinutes: 15,
    mood: 'conclusion-doute',
    music: 'Port au crépuscule — vagues, mouettes, mélancolie',
    location: 'Cités Libres — Havrelibre, Salle des Négoces',
  },
];

// ============================================================================
// EXPORTS
// ============================================================================

export const NARRATIVE_SCENES_ACT1: NarrativeScene[] = [
  ...CH_1_1_SCENES,
  ...CH_1_2_SCENES,
  ...CH_1_3_SCENES,
  ...CH_1_4_SCENES,
];

export const NARRATIVE_SCENES_ACT2: NarrativeScene[] = [
  ...CH_2_3_SCENES,
  ...CH_2_5_SCENES,
  ...CH_2_6_SCENES,
];
