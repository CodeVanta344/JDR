/**
 * EXPANSION - ACTES I & II
 * Chapitres supplémentaires pour la campagne Aethelgard
 * Ch3 & Ch4 (Acte I) + Ch5 & Ch6 (Acte II)
 */

import type { BookChapter } from './gm-book-data';

// ============================================================================
// ACTE I - CHAPITRES ADDITIONNELS
// ============================================================================

export const ACT_1_EXTRA_CHAPTERS: BookChapter[] = [
  // -------------------------------------------------------------------------
  // CHAPITRE 3 : LES OMBRES DE SOL-AUREUS
  // -------------------------------------------------------------------------
  {
    id: 'ch-1-3',
    actNumber: 1,
    chapterNumber: 3,
    title: "Les Ombres de Sol-Aureus",
    subtitle: "L'enquête s'enfonce dans les ténèbres",
    summary: "Le mystère des disparitions s'épaissit. Les héros explorent les catacombes sous Sol-Aureus, découvrent un ancien réseau de tunnels datant de l'Hégémonie d'Ashka, et affrontent un agent mineur du Cercle des Cendres. La vérité commence à émerger — quelque chose de bien plus sombre que de simples enlèvements se trame sous la cité dorée.",
    levelRange: "2-3",
    themes: ['enquête', 'exploration souterraine', 'confrontation', 'secrets anciens'],
    chapterIntro: {
      text: `Les rues de Sol-Aureus brillent toujours sous le soleil. Les marchands crient leurs prix, les enfants courent entre les étals, et les gardes patrouillent avec leur indifférence habituelle.

Mais vous savez désormais que tout cela n'est qu'un masque.

Sous vos pieds, sous les pavés dorés et les fondations séculaires, un réseau de tunnels oubliés pulse comme les veines d'un corps malade. Les disparitions ne sont pas des coïncidences. Le Vieux Sam avait raison — quelque chose se réveille dans les profondeurs.

Et cette nuit, alors que la lune se cache derrière les nuages comme si elle avait peur de voir ce qui va suivre, vous descendez.`,
      mood: "Tension croissante, passage de la lumière aux ténèbres",
      music: "Cordes graves, percussions sourdes comme un battement de cœur souterrain",
    },
    scenes: [
      // --- Scène 1 : L'Enquête dans le Quartier Bas ---
      {
        id: 'scene-1-3-1',
        sceneNumber: 1,
        title: "Murmures dans le Quartier Bas",
        type: 'exploration',
        location: "Quartier Bas, Sol-Aureus",
        locationId: 'sol-aureus',
        estimatedMinutes: 30,
        readAloud: {
          text: `Le Quartier Bas porte bien son nom — non seulement par sa géographie, niché dans un creux naturel au sud-est de la cité, mais par tout ce qu'il représente. Ici, les pavés dorés cèdent la place à de la boue tassée. Les bâtiments se penchent les uns vers les autres comme des ivrognes s'aidant mutuellement à rester debout, et les ruelles sont si étroites que deux personnes ne peuvent s'y croiser sans se frôler.

L'air sent le cuir mouillé, la friture bon marché et quelque chose d'autre — quelque chose de moisi qui monte du sol comme une haleine fétide. Les caniveaux débordent d'une eau noirâtre qui ne coule que lorsqu'elle veut bien.

Partout, des regards. Des silhouettes dans les embrasures de portes. Des rideaux qui bougent aux fenêtres. Le Quartier Bas vous observe — et il n'aime pas ce qu'il voit.

À un carrefour, un vieil homme aveugle joue une mélodie discordante sur un violon à trois cordes. À ses pieds, un panneau griffonné : « Les rats sont partis. Soyez plus malins que les rats. »`,
          mood: "Oppressant, hostile, secrets à chaque coin de rue",
          music: "Ambiance urbaine sombre, violon désaccordé au loin, bruits d'eau qui goutte",
        },
        gmNotes: [
          { type: 'info', text: "Le Quartier Bas est le ventre de Sol-Aureus. C'est ici que vivent les pauvres, les marginaux et ceux qui préfèrent l'ombre à la lumière. La Garde Royale patrouille rarement — le territoire est contrôlé par le Syndicat de l'Ombre." },
          { type: 'tip', text: "Laissez les joueurs mener l'enquête librement. Ils peuvent interroger les habitants (la plupart refusent de parler), chercher des indices visuels (Perception CD 35), ou tenter de gagner la confiance d'un local (Persuasion CD 40 ou un pot-de-vin de 5 pièces d'or)." },
          { type: 'warning', text: "Si les joueurs attirent trop l'attention (armes sorties, magie ostentatoire), 1d4+2 voyous du Syndicat viennent leur 'expliquer les règles du quartier'. Combat évitable par Intimidation CD 45 ou en invoquant le nom de Brok." },
          { type: 'secret', text: "Le violoniste aveugle, 'Cordes-Mortes', est un ancien barde de la cour royale frappé de cécité par un sort. Il sait que les disparus sont emmenés sous terre par des silhouettes portant des masques de cendre. Il ne parlera qu'à quelqu'un qui lui offre un instrument neuf ou le touche avec de la magie curative." },
          { type: 'lore', text: "Le Quartier Bas est construit sur les ruines du vieux Sol-Aureus — la cité telle qu'elle existait sous l'Hégémonie d'Ashka. Les fondations contiennent encore des passages et des salles datant de cette époque sombre. La plupart sont murés. Pas tous." },
        ],
        npcs: [
          {
            name: "Cordes-Mortes",
            role: "Violoniste aveugle / Informateur clé",
            personality: "Cryptique, poétique, brisé par le passé. Parle en métaphores musicales.",
            appearance: "Humain très âgé, yeux laiteux et morts, doigts noueux mais incroyablement agiles sur les cordes. Vêtements autrefois riches, aujourd'hui en lambeaux. Un médaillon de la cour royale caché sous sa chemise.",
            secret: "Ancien barde royal Aldéric le Doré, disgracié et aveuglé il y a 30 ans pour avoir chanté une satire du Grand Prêtre. Sa cécité magique le rend paradoxalement sensible aux perturbations arcaniques — il « voit » les flux de magie noire.",
            dialogues: {
              greeting: "« Une fausse note dans l'harmonie de la ville... Je vous entends. Vos pas sont lourds de questions et vos cœurs résonnent d'inquiétude. Approchez, si l'oreille ne vous fait pas défaut. »",
              info: "« La nuit, quand le silence tombe comme un rideau, j'entends les notes discordantes. Des pas sous la terre, un chœur de gémissements en sourdine, et parfois — parfois — un battement de tambour si grave qu'il fait vibrer les pierres. Les ombres portent des visages de cendre, et elles descendent. Toujours plus profond. »",
              quest: "« Trouvez l'escalier qui chante. Au fond de l'impasse du Pendu, derrière le mur qui pleure. Posez votre main sur la pierre et écoutez. Si vous entendez la mélodie... vous trouverez l'entrée. Et ce qui se cache derrière. »",
              farewell: "« Que vos oreilles soient plus aiguisées que vos épées, là où vous allez. Le son est le dernier sens à mourir dans l'obscurité. »",
            },
          },
          {
            name: "Nessa la Taupe",
            role: "Contrebandière / Guide souterrain",
            personality: "Pragmatique, avare, mais fiable une fois payée. Connaît les souterrains comme sa poche.",
            appearance: "Gnome, la quarantaine, à peine un mètre de haut. Cheveux ternes couverts de poussière de pierre. Lampe frontale bricolée. Bottes renforcées de métal aux semelles usées.",
            secret: "Travaille pour le Syndicat de l'Ombre comme passeuse de marchandises par les tunnels. A découvert de nouveaux passages récemment — des passages qui n'existaient pas il y a un mois. Ça la terrifie.",
            dialogues: {
              greeting: "« Vous cherchez quelque chose en bas ? Tout le monde cherche quelque chose en bas ces temps-ci. La question c'est : est-ce que vous avez de quoi payer le guide ? »",
              info: "« Les tunnels bougent. Je sais, ça a l'air dingue, mais je connais chaque pierre depuis vingt ans, et je vous dis que des passages s'ouvrent tout seuls. Des salles apparaissent là où il n'y avait que de la roche. Comme si la ville se souvenait de quelque chose qu'elle avait oublié. »",
              quest: "« Cinquante pièces d'or et je vous emmène jusqu'au deuxième niveau. Pas plus loin. Au deuxième niveau, j'ai vu des marques sur les murs. Des yeux gravés. Partout. Et depuis, je fais des cauchemars. »",
              farewell: "« Si je ne suis pas au point de rendez-vous dans une heure, ne m'attendez pas. Et ne descendez pas me chercher. »",
            },
            stats: { hp: 22, atk: 8, ac: 15 },
          },
        ],
        skillChecks: [
          { skill: 'Perception', dc: 35, success: "Vous remarquez des traces de pas inhabituelles dans la boue — des empreintes de bottes à semelles lisses, comme celles de rituels cérémoniels, menant vers l'impasse du Pendu.", failure: "Le quartier est un labyrinthe de boue et de misère. Difficile de distinguer quoi que ce soit d'utile dans ce chaos." },
          { skill: 'Persuasion', dc: 40, success: "Un habitant finit par lâcher que son voisin a disparu il y a trois nuits. Sa porte était verrouillée de l'intérieur. Pas de trace de lutte. Juste une odeur de cendre.", failure: "Les habitants se referment comme des huîtres. Personne ne veut parler aux étrangers." },
          { skill: 'Arcanes', dc: 30, success: "Vous détectez de faibles résidus de magie noire dans l'air — de la nécromancie ancienne, pas récente. Comme un écho lointain qui se renforce.", failure: "L'atmosphère est oppressante, mais rien de magiquement notable ne se démarque." },
        ],
        choices: [
          {
            id: 'choice-quartier-bas',
            prompt: "Comment les héros approchent-ils l'enquête dans le Quartier Bas ?",
            options: [
              {
                label: "Interroger Cordes-Mortes",
                description: "Approcher le violoniste aveugle et gagner sa confiance.",
                consequence: "Cordes-Mortes révèle l'emplacement de l'escalier caché. Nécessite un don (instrument ou soin magique) ou un jet de Persuasion CD 35.",
                nextScene: 'scene-1-3-2',
                skillCheck: { skill: 'Persuasion', dc: 35, success: "Le vieil homme sourit. 'Enfin, quelqu'un qui sait écouter.' Il vous indique l'impasse du Pendu.", failure: "Il secoue la tête tristement. 'Votre voix est pressée, pas sincère. Revenez quand vous saurez entendre.' Il se remet à jouer." },
              },
              {
                label: "Engager Nessa la Taupe",
                description: "Payer la gnome pour servir de guide dans les souterrains.",
                consequence: "50 pièces d'or pour un accès direct aux tunnels du deuxième niveau. Nessa connaît les pièges et raccourcis mais refuse d'aller au-delà.",
                nextScene: 'scene-1-3-2',
              },
              {
                label: "Chercher l'entrée seul",
                description: "Explorer les ruelles et caves du Quartier Bas sans aide.",
                consequence: "Investigation CD 40 pour trouver l'entrée. En cas d'échec, le groupe tombe dans une embuscade de 1d4+1 voyous avant de trouver l'accès.",
                nextScene: 'scene-1-3-2',
                skillCheck: { skill: 'Investigation', dc: 40, success: "Après deux heures de recherche, vous trouvez un mur descellé dans une cave abandonnée. Derrière, un escalier en colimaçon descend dans l'obscurité.", failure: "Vous errez dans le labyrinthe du Quartier Bas. Des voyous vous tombent dessus dans une ruelle étroite avant que vous ne trouviez finalement l'accès." },
              },
            ],
          },
        ],
        loot: ["Médaillon de la cour royale (valeur sentimentale, preuve d'identité pour Cordes-Mortes)", "Carte grossière des tunnels du premier niveau (dessinée par Nessa)"],
        nextScenes: ['scene-1-3-2'],
        previousScene: 'scene-1-2-3',
      },

      // --- Scène 2 : Les Catacombes Ashka ---
      {
        id: 'scene-1-3-2',
        sceneNumber: 2,
        title: "Les Catacombes Oubliées",
        type: 'exploration',
        location: "Catacombes sous Sol-Aureus",
        locationId: 'sol-aureus-underground',
        estimatedMinutes: 35,
        readAloud: {
          text: `L'escalier descend en spirale serrée, les marches usées par des milliers de pas anciens. L'air change à mesure que vous vous enfoncez — d'abord frais, puis humide, puis chargé d'une odeur que vous ne pouvez identifier. Quelque chose entre la terre retournée et l'encens brûlé.

Au bas de l'escalier, un couloir s'ouvre devant vous. Et là, vous comprenez.

Ce ne sont pas de simples tunnels. Ce sont des catacombes — un vaste réseau souterrain construit avec une précision qui dépasse tout ce que la Sol-Aureus moderne peut offrir. Les murs sont en pierre noire polie, veinée d'un minéral qui scintille faiblement d'une lueur verdâtre. Des alcôves s'alignent de chaque côté, certaines vides, d'autres contenant des urnes de métal sombre gravées de runes que vous ne connaissez pas.

Le sol est couvert d'une fine couche de poussière de cendre. Et dans cette poussière, des traces de pas récentes. Beaucoup de traces. Toutes allant dans la même direction : plus profond.

Au-dessus de l'entrée du couloir principal, gravé dans la pierre noire en lettres d'un pied de haut, un mot en ashkan archaïque. Même sans connaître la langue, sa signification résonne dans vos os :

« DESCENDEZ. »`,
          mood: "Claustrophobie, émerveillement sombre, terreur latente",
          music: "Drone grave et continu, gouttes d'eau, échos lointains, souffle de vent souterrain",
        },
        gmNotes: [
          { type: 'info', text: "Ces catacombes datent de l'Hégémonie d'Ashka (il y a 120+ ans). Elles servaient de réseau logistique, de laboratoires et de prisons. Sol-Aureus a été construite par-dessus, scellant la plupart des accès. Les sceaux faiblissant, les passages se rouvrent d'eux-mêmes." },
          { type: 'warning', text: "Les catacombes sont vastes. Ne laissez pas les joueurs se perdre (sauf si c'est volontaire). Utilisez des embranchements simples : gauche, droite, tout droit. Les traces de pas mènent toujours dans la bonne direction." },
          { type: 'secret', text: "Les runes sur les urnes sont des sceaux de contention. Chaque urne contient l'essence d'un esclave ashkan — leur force vitale extraite et stockée comme source d'énergie magique. Les urnes intactes sont encore actives. Toucher une urne sans protection inflige 2d6 dégâts nécrotiques." },
          { type: 'tip', text: "C'est le moment d'utiliser les sens des joueurs. Demandez-leur ce qu'ils voient, sentent, entendent. La lueur verte des veines minérales peut être suivie — elle s'intensifie à mesure qu'on approche d'un sceau." },
          { type: 'lore', text: "Le minéral vert dans les murs est de la veinérite — un cristal qui absorbe et stocke l'énergie nécrotique. Les Ashkans l'utilisaient comme source d'énergie et comme matériau de construction. Il est interdit sous peine de mort par la Guilde des Arcanes d'en posséder ou d'en extraire." },
        ],
        skillChecks: [
          { skill: 'Histoire', dc: 35, success: "Vous reconnaissez l'architecture ashkan — les proportions, les angles légèrement incorrects qui désorientent, les murs inclinés vers l'intérieur pour créer un sentiment d'oppression. C'est un design intentionnel de contrôle psychologique.", failure: "L'architecture est étrange et oppressante, mais vous ne pouvez pas l'identifier précisément." },
          { skill: 'Perception', dc: 30, success: "Vous entendez un bourdonnement sourd, presque subliminal, qui vient des murs eux-mêmes. Il pulse selon un rythme régulier — comme un battement de cœur.", failure: "Le silence est assourdissant. Vos propres pas vous semblent trop bruyants." },
          { skill: 'Arcanes', dc: 40, success: "La magie ici est ancienne et corrompue. Vous détectez des lignes de force qui convergent vers un point plus profond — un nœud de puissance nécrotique d'une intensité préoccupante.", failure: "L'air est chargé de magie, mais sa nature vous échappe." },
          { skill: 'Survie', dc: 25, success: "Les traces de pas récentes montrent un passage régulier — au moins une douzaine de personnes sur les dernières semaines. Certaines traces ne reviennent pas.", failure: "Il y a des traces, mais l'interprétation est difficile dans cette poussière de cendre uniforme." },
        ],
        choices: [
          {
            id: 'choice-catacombes',
            prompt: "Le couloir principal se divise en trois passages après une centaine de mètres.",
            options: [
              {
                label: "Suivre les traces de pas (passage central)",
                description: "Le chemin le plus direct, le plus fréquenté, mais aussi le plus surveillé.",
                consequence: "Mène directement vers la salle rituelle. Risque de tomber sur une patrouille du Cercle (Discrétion CD 35 pour l'éviter).",
                nextScene: 'scene-1-3-3',
                skillCheck: { skill: 'Discrétion', dc: 35, success: "Vous progressez silencieusement. Devant, des voix résonnent — une conversation entre deux gardes du Cercle. Vous les entendez sans être vus.", failure: "Un caillou roule sous votre pied. Le son résonne comme un coup de tonnerre dans le silence des catacombes. Quelque part devant, des pas s'arrêtent. Puis accélèrent vers vous." },
              },
              {
                label: "Explorer le passage de gauche (les alcôves)",
                description: "Un passage bordé d'alcôves funéraires. Plus lent mais riche en informations.",
                consequence: "Découverte d'un journal ashkan décrivant le réseau de tunnels et mentionnant un 'Sceau Primordial' sous le Grand Temple. Mais aussi un piège de runes (Perception CD 30 pour le détecter).",
                nextScene: 'scene-1-3-3',
                skillCheck: { skill: 'Perception', dc: 30, success: "Vous repérez des runes au sol qui luisent faiblement — un piège de paralysie. En les contournant, vous trouvez une alcôve cachée contenant un journal ashkan.", failure: "Le piège se déclenche. Jet de sauvegarde Constitution CD 35 ou paralysé pendant 1 minute. Des bruits de pas approchent..." },
              },
              {
                label: "Prendre le passage de droite (les profondeurs)",
                description: "Un passage qui descend encore plus profondément. L'air y est glacial.",
                consequence: "Mène à un ancien laboratoire ashkan contenant des indices sur les expériences nécromantiques et une potion de résistance nécrotique. Mais gardé par un mort-vivant mineur.",
                nextScene: 'scene-1-3-3',
              },
            ],
          },
        ],
        loot: [
          "Journal ashkan (partiellement lisible, mentionne le 'Sceau sous le Temple d'Or')",
          "3 fioles de veinérite liquide (composant de sort, valeur 25 po chacune, illégales)",
          "Potion de résistance nécrotique (si passage de droite)",
        ],
        nextScenes: ['scene-1-3-3'],
        previousScene: 'scene-1-3-1',
        mapMovement: { from: 'sol-aureus', to: 'sol-aureus-underground' },
      },

      // --- Scène 3 : La Salle Rituelle ---
      {
        id: 'scene-1-3-3',
        sceneNumber: 3,
        title: "Le Sanctuaire de Cendre",
        type: 'revelation',
        location: "Sanctuaire caché, Catacombes de Sol-Aureus",
        locationId: 'sol-aureus-underground',
        estimatedMinutes: 25,
        readAloud: {
          text: `Le passage débouche sur une salle circulaire qui vous coupe le souffle — et pas seulement par sa taille.

Le plafond s'élève à dix mètres, soutenu par six colonnes de pierre noire sculptées en forme de silhouettes humaines hurlantes, les bras tendus vers le haut comme pour soutenir le poids du monde. Au centre de la salle, un cercle rituel est gravé dans le sol — un pentagramme inscrit dans trois cercles concentriques, chaque ligne remplie de runes ashkanes qui pulsent d'une lueur verte maladive.

Des bougies noires, des centaines, bordent les murs et le cercle. Leurs flammes sont immobiles — pas un frémissement, comme figées dans le temps.

Et là, au centre du cercle, quelque chose qui n'a aucune raison d'exister : un autel de cristal noir sur lequel repose un masque. Un masque de cendres compressées, moulé sur un visage humain, les yeux ouverts sur un vide qui semble vous regarder.

La salle n'est pas vide. Trois silhouettes en robes grises se tiennent autour du cercle, dos à vous. Elles chantent — un murmure guttural qui fait vibrer l'air et vos dents.

L'une d'elles se retourne.

Sous sa capuche, un masque identique à celui sur l'autel. Des yeux vivants derrière les orbites de cendre.

« Vous êtes en retard, » dit la voix derrière le masque. « Ou en avance. Les prophéties sont toujours si vagues. »`,
          mood: "Horreur sacrée, révélation terrifiante, point de non-retour",
          music: "Chœur grave et dissonant, bourdonnement de basse, silence entre les notes",
        },
        gmNotes: [
          { type: 'info', text: "C'est la première rencontre directe avec des agents du Cercle des Cendres. Ils ne sont pas hostiles immédiatement — ils s'attendaient à ce que quelqu'un vienne. Ils voient les héros comme des pions potentiels, pas des ennemis." },
          { type: 'warning', text: "Ne transformez pas cette scène en combat tout de suite. Laissez le dialogue se développer. L'agent principal (Masque-Gris) est un manipulateur qui veut semer le doute, pas tuer. Si le combat éclate, les deux acolytes fuient et Masque-Gris combat seul." },
          { type: 'secret', text: "Le masque sur l'autel est un fragment de l'Œil d'Ashka — un artefact mineur mais dangereux. Il permet à son porteur de voir à travers les yeux de tout cadavre dans un rayon d'un kilomètre. Le Cercle l'utilise pour surveiller les catacombes." },
          { type: 'tip', text: "Masque-Gris peut révéler (vrai ou faux) : les Sceaux des Anciens faiblissent, le Cercle veut les 'libérer de manière contrôlée', et les héros ont un rôle à jouer. Laissez les joueurs décider s'ils croient cette version." },
          { type: 'lore', text: "Les Cercle des Cendres est un culte qui vénère l'ancienne Hégémonie d'Ashka. Ils croient que les Anciens — les entités scellées lors de la chute de l'empire — ne sont pas des monstres mais des dieux emprisonnés injustement. Leur objectif : briser les sceaux et restaurer 'l'ordre naturel'." },
        ],
        npcs: [
          {
            name: "Masque-Gris",
            role: "Agent du Cercle des Cendres",
            personality: "Calme, éloquent, faussement raisonnable. Croit sincèrement à sa cause. Dangereux par ses mots autant que par sa magie.",
            appearance: "Silhouette mince sous une robe grise cendrée. Masque de cendre compressée qui épouse un visage aux traits fins. Mains gantées de cuir noir. Voix modulée, presque musicale.",
            secret: "Véritable identité : Théon Ashward, ancien professeur de la Guilde des Arcanes. A disparu il y a cinq ans. Considéré comme mort. A rejoint le Cercle après avoir découvert que la Guilde cachait la vérité sur les sceaux.",
            dialogues: {
              greeting: "« Ne soyez pas effrayés. La peur est naturelle face à ce qu'on ne comprend pas. Mais vous êtes ici parce que vous cherchez à comprendre, n'est-ce pas ? C'est un trait admirable. »",
              info: "« Les sceaux faiblissent. Vous le savez, ou vous le sentirez bientôt. La Guilde des Arcanes le sait aussi — et ne fait rien. Pire : elle accélère le processus en tentant de les renforcer avec des méthodes qui ne fonctionnent plus. Nous, nous proposons une alternative. »",
              quest: "« Rejoignez-nous. Non, ne refusez pas si vite. Réfléchissez. Nous ne sommes pas vos ennemis. Les vrais ennemis sont ceux qui préfèrent l'ignorance à la préparation. Quand les sceaux tomberont — et ils tomberont — seuls ceux qui sont prêts survivront. »",
              farewell: "« Nous nous reverrons. Le destin est comme un fleuve — on peut nager contre le courant, mais on arrive toujours à la mer. Emportez le doute, si vous ne voulez pas de la vérité. »",
            },
            stats: { hp: 55, atk: 14, ac: 16 },
          },
        ],
        choices: [
          {
            id: 'choice-sanctuaire',
            prompt: "Face à Masque-Gris et sa proposition, que font les héros ?",
            options: [
              {
                label: "Écouter et négocier",
                description: "Engager le dialogue, poser des questions, chercher des informations.",
                consequence: "Masque-Gris révèle l'existence du Premier Sceau sous le Grand Temple et prévient que le Cercle a déjà commencé à l'affaiblir. Il propose une trêve temporaire.",
                nextScene: 'scene-1-3-4',
                skillCheck: { skill: 'Intuition', dc: 40, success: "Masque-Gris dit en partie la vérité — les sceaux faiblissent vraiment. Mais il ment sur les intentions du Cercle. Ils ne veulent pas 'contrôler' la libération — ils veulent servir ce qui sera libéré.", failure: "Impossible de discerner le vrai du faux. Les mots de Masque-Gris sont un labyrinthe aussi complexe que ces catacombes." },
                reputationChange: [{ faction: 'cercle-des-cendres', amount: 5 }],
              },
              {
                label: "Attaquer",
                description: "Mettre fin à la menace. Épées et sorts.",
                consequence: "Les acolytes fuient immédiatement. Combat contre Masque-Gris seul. Il se bat avec de la magie nécrotique et tente de fuir quand il tombe sous 20 HP.",
                nextScene: 'scene-1-3-4',
                reputationChange: [{ faction: 'cercle-des-cendres', amount: -15 }],
              },
              {
                label: "Bluffer et accepter",
                description: "Feindre l'intérêt pour obtenir plus d'informations avant de trahir le Cercle.",
                consequence: "Tromperie CD 45. Succès : Masque-Gris vous donne un jeton de reconnaissance et l'emplacement d'un autre repaire. Échec : il voit clair dans votre jeu — combat immédiat avec avantage pour l'ennemi.",
                nextScene: 'scene-1-3-4',
                skillCheck: { skill: 'Tromperie', dc: 45, success: "Masque-Gris sourit sous son masque. 'Bienvenue parmi les éveillés.' Il vous remet un jeton en cendre compressée — un laissez-passer dans les cercles inférieurs.", failure: "'Votre cœur bat trop vite pour quelqu'un de sincère.' D'un geste, les bougies s'éteignent. Quand elles se rallument, les acolytes ont disparu et Masque-Gris tient une lame de ténèbres." },
              },
            ],
          },
        ],
        nextScenes: ['scene-1-3-4'],
        previousScene: 'scene-1-3-2',
      },

      // --- Scène 4 : La Confrontation ---
      {
        id: 'scene-1-3-4',
        sceneNumber: 4,
        title: "Remontée et Révélations",
        type: 'combat',
        location: "Catacombes et surface, Sol-Aureus",
        locationId: 'sol-aureus',
        estimatedMinutes: 30,
        readAloud: {
          text: `Que la rencontre avec Masque-Gris se soit terminée par des mots ou par le sang, une vérité reste gravée dans votre esprit comme les runes sur ces murs : les sceaux faiblissent, et le Cercle des Cendres est plus organisé et plus proche qu'on ne le pensait.

Le chemin du retour semble plus court — ou peut-être est-ce l'urgence qui accélère vos pas. Mais au moment où vous atteignez le dernier escalier, celui qui remonte vers le Quartier Bas, un grondement secoue les catacombes.

De la poussière tombe du plafond. Les runes sur les murs clignotent — vert, rouge, vert — comme un avertissement. Et derrière vous, dans les profondeurs, quelque chose hurle.

Pas un cri humain. Pas un cri animal. Un son qui n'a pas de nom, qui résonne dans vos os et fait vibrer vos dents. La pierre sous vos pieds pulse une fois, deux fois, trois fois — comme un cœur qui se réveille.

Puis le silence.

Un silence pire que le cri.

Au-dessus de vous, la trappe vers la surface. Derrière vous, les ténèbres qui attendent.

Et entre les deux, bloquant l'escalier, une créature qui n'existait pas il y a trente secondes. Une silhouette de cendres et d'ombre, vaguement humanoïde, avec des yeux — trop d'yeux — qui brillent d'un vert malade.

Elle ouvre ce qui pourrait être une bouche.

Les murs tremblent.`,
          mood: "Urgence absolue, terreur primale, combat pour la survie",
          music: "Percussions effrénées, cuivres graves, montée en puissance orchestrale",
        },
        gmNotes: [
          { type: 'info', text: "La Sentinelle de Cendre est un gardien mineur laissé par les Ashkans. L'affaiblissement des sceaux l'a réveillée. Elle bloque la sortie — le combat est inévitable. Ce n'est PAS le boss de l'Acte I, juste un avant-goût." },
          { type: 'warning', text: "La Sentinelle est un combat difficile pour un groupe de niveau 2-3. Utilisez son pouvoir de Cri de Cendre avec parcimonie (une seule fois) et permettez aux joueurs de trouver des avantages dans l'environnement (colonnes pour se couvrir, urnes à lancer pour dégâts nécrotiques)." },
          { type: 'tip', text: "Si le groupe est en difficulté, Nessa la Taupe (si engagée) peut activer un passage secret pour permettre une retraite tactique, ou Cordes-Mortes peut apparaître avec un chant qui affaiblit la créature (-2 ATK pendant 3 tours)." },
          { type: 'secret', text: "Si la créature est vaincue, elle laisse un résidu cristallisé — un fragment de l'ancienne énergie ashkan. La Guilde des Arcanes paierait cher pour l'analyser. Le Cercle des Cendres le voudrait aussi. À qui le donner ?" },
        ],
        encounter: {
          name: "La Sentinelle de Cendre",
          enemies: [
            {
              name: "Sentinelle de Cendre",
              hp: 75,
              atk: 14,
              ac: 14,
              cr: 3,
              abilities: [
                "Cri de Cendre (Recharge 5-6) : Cône de 5m, 3d6 dégâts nécrotiques, Sauvegarde Constitution CD 35 pour moitié. Les créatures qui échouent sont aveuglées pendant 1 tour.",
                "Corps Intangible : Résistance aux dégâts physiques non-magiques.",
                "Griffes de l'Oubli : +14 au toucher, 2d8+4 dégâts nécrotiques. La cible doit réussir un jet de Sagesse CD 30 ou être effrayée jusqu'à la fin de son prochain tour.",
                "Régénération Cendrée : Récupère 5 HP au début de chaque tour tant que la veinérite des murs est intacte. Si un joueur détruit un panneau de veinérite, la régénération cesse.",
              ],
            },
          ],
          terrain: [
            "Escalier en colimaçon (terrain difficile, avantage en hauteur)",
            "Colonnes de pierre (couverture partielle, peuvent être renversées avec Athlétisme CD 40 pour 2d10 dégâts de zone)",
            "Urnes ashkanes le long des murs (peuvent être lancées : +STR au toucher, 1d6 contondant + 1d6 nécrotique)",
            "Panneaux de veinérite dans les murs (HP 15, CA 10 — les détruire supprime la régénération de la Sentinelle)",
          ],
          tactics: "La Sentinelle bloque l'escalier et utilise ses griffes au corps à corps. Elle ouvre avec son Cri de Cendre si le groupe est regroupé. Elle ne poursuit pas au-delà de l'escalier — elle est liée aux catacombes. Si les joueurs tentent de fuir dans les profondeurs, elle les laisse passer (sa mission est de garder la sortie).",
          loot: [
            "Résidu cristallisé de cendre (composant rare, valeur 100 po ou échangeable contre une faveur de faction)",
            "Fragment de veinérite pure (50 po, illégal)",
            "Amulette de résistance nécrotique mineure (+2 aux jets de sauvegarde contre la nécromancie)",
          ],
        },
        choices: [
          {
            id: 'choice-apres-combat',
            prompt: "Après le combat, à qui confier les découvertes ?",
            options: [
              {
                label: "La Guilde des Arcanes",
                description: "Rapporter les découvertes aux mages officiels de Sol-Aureus.",
                consequence: "La Guilde prend les informations au sérieux. Récompense de 200 po et accès à un sage pour identifier les objets trouvés. Mais la Guilde impose le secret — les héros ne doivent en parler à personne.",
                nextScene: 'scene-1-4-1',
                reputationChange: [{ faction: 'guilde-des-arcanes', amount: 10 }, { faction: 'cercle-des-cendres', amount: -5 }],
              },
              {
                label: "L'Aube d'Argent",
                description: "Alerter l'ordre des paladins protecteurs d'Aethelgard.",
                consequence: "L'Aube d'Argent mobilise immédiatement une escouade pour sécuriser l'entrée des catacombes. Récompense de 150 po et bénédiction de protection (+1 CA pendant 24h). Mais leur intervention bruyante alerte le Cercle.",
                nextScene: 'scene-1-4-1',
                reputationChange: [{ faction: 'aube-dargent', amount: 15 }, { faction: 'cercle-des-cendres', amount: -10 }],
              },
              {
                label: "Garder le secret",
                description: "Ne faire confiance à personne. Enquêter seuls.",
                consequence: "Aucune aide extérieure mais aucune fuite d'information. Le Cercle ne sait pas que les héros connaissent l'existence du Sceau sous le Grand Temple. Avantage tactique pour le Chapitre 4.",
                nextScene: 'scene-1-4-1',
              },
            ],
          },
        ],
        loot: [
          "Résidu cristallisé de cendre",
          "Fragment de veinérite pure",
          "Amulette de résistance nécrotique mineure",
        ],
        nextScenes: ['scene-1-4-1'],
        previousScene: 'scene-1-3-3',
        mapMovement: { from: 'sol-aureus-underground', to: 'sol-aureus' },
      },
    ],
    chapterConclusion: {
      text: `La lumière du soleil n'a jamais semblé aussi précieuse qu'en cet instant, quand vous émergez des catacombes dans la clarté poussiéreuse du Quartier Bas.

Vous portez avec vous des cicatrices, des réponses, et surtout des questions plus grandes que celles avec lesquelles vous êtes descendus. Le Cercle des Cendres existe, il est là, sous vos pieds, et ses racines s'enfoncent bien plus profondément que quiconque ne l'imagine.

Les sceaux faiblissent. Quelque chose dort sous Sol-Aureus — sous le Grand Temple lui-même.

Et la ville dorée continue de briller, ignorante du gouffre qui s'ouvre sous ses fondations.`,
      mood: "Soulagement teinté d'urgence, le calme avant la tempête",
      music: "Thème de Sol-Aureus mais en mineur, mélancolique et inquiétant",
    },
    rewards: { xp: 800, gold: "200-350 po (selon les choix)", items: ["Amulette de résistance nécrotique mineure", "Journal ashkan", "Jeton du Cercle (si bluff réussi)", "Carte des catacombes de Nessa"] },
  },

  // -------------------------------------------------------------------------
  // CHAPITRE 4 : LE PREMIER SCEAU
  // -------------------------------------------------------------------------
  {
    id: 'ch-1-4',
    actNumber: 1,
    chapterNumber: 4,
    title: "Le Premier Sceau",
    subtitle: "Ce qui dort sous le temple ne dort plus",
    summary: "Les héros trouvent et protègent le Premier Sceau dissimulé sous le Grand Temple de Solarius. Climax de l'Acte I avec un boss fight contre une créature d'ombre invoquée par le Cercle des Cendres. Les révélations sur l'ampleur de la menace propulsent les héros dans un conflit qui dépasse les frontières de Sol-Aureus.",
    levelRange: "3-4",
    themes: ['climax', 'combat de boss', 'révélation', 'choix moraux lourds'],
    chapterIntro: {
      text: `Le temps presse.

Depuis votre retour des catacombes, chaque heure qui passe apporte son lot de mauvais présages. Les prêtres de Solarius signalent des fissures dans le sol du Grand Temple — des fissures qui apparaissent la nuit et se referment à l'aube. Les rêves des devins sont empoisonnés de visions de cendres et de chaînes brisées. Et dans le Quartier Bas, trois nouvelles disparitions.

Mais vous savez ce que personne d'autre ne sait : quelque part sous le Grand Temple de Solarius, le cœur lumineux de Sol-Aureus, se trouve un Sceau — l'un des verrous qui maintiennent prisonnière une horreur ancienne.

Et le Cercle des Cendres veut le briser.

Cette nuit, vous descendez de nouveau. Mais cette fois, ce n'est pas pour explorer.

C'est pour empêcher la fin du monde.`,
      mood: "Urgence solennelle, détermination héroïque, veille de bataille",
      music: "Thème héroïque tendu, cuivres et cordes en montée progressive, tambours de guerre au loin",
    },
    scenes: [
      // --- Scène 1 : Préparatifs et infiltration du Temple ---
      {
        id: 'scene-1-4-1',
        sceneNumber: 1,
        title: "Sous le Dôme Doré",
        type: 'social',
        location: "Grand Temple de Solarius, Sol-Aureus",
        locationId: 'sol-aureus',
        estimatedMinutes: 25,
        readAloud: {
          text: `Le Grand Temple de Solarius domine Sol-Aureus comme un second soleil. Son dôme doré, large de cinquante mètres, capte les derniers rayons du crépuscule et les transforme en une lueur chaude qui baigne les rues alentour d'une lumière réconfortante.

L'intérieur est à la hauteur de l'extérieur. Des colonnes de marbre blanc veiné d'or soutiennent des voûtes peintes de fresques représentant la victoire de Solarius sur les ténèbres. Des centaines de bougies flottent à mi-hauteur grâce à un enchantement permanent, créant une constellation intérieure qui ne s'éteint jamais.

L'air sent l'encens de lotus doré et la cire d'abeille. Des fidèles murmurent des prières dans les chapelles latérales. Des prêtres en robes blanches et dorées glissent entre les rangées de bancs comme des fantômes bienveillants.

Mais ce soir, quelque chose est différent. Les bougies flottantes frémissent. Les fresques au plafond semblent plus sombres, les visages des saints plus inquiets. Et sous vos pieds, à travers le marbre, vous sentez une vibration — subtile, insistante, comme un pouls fiévreux.

Le Haut-Prêtre Valerius vous attend dans la sacristie. Son visage est celui d'un homme qui n'a pas dormi depuis des jours.`,
          mood: "Majesté sacrée troublée par une menace invisible, beauté fragile",
          music: "Orgue d'église avec notes dissonantes occasionnelles, chœur lointain en mineur",
        },
        gmNotes: [
          { type: 'info', text: "Les héros doivent convaincre le Haut-Prêtre Valerius de les laisser accéder aux sous-sols du temple. Valerius sait que quelque chose ne va pas mais refuse de croire à l'existence d'un Sceau ashkan sous SON temple." },
          { type: 'tip', text: "Jouez Valerius comme un homme tiraillé entre la foi et la réalité. Il a des visions de cendre et de ténèbres mais refuse de les accepter. Les joueurs peuvent le convaincre avec des preuves (journal ashkan, résidu cristallisé) ou par la force de la rhétorique." },
          { type: 'warning', text: "Si les joueurs essayent de forcer l'accès sans convaincre Valerius, les Templiers (8 gardes, HP 40, ATK 12, AC 18) interviennent. Un combat dans le temple attirerait aussi l'attention de la Garde Royale en 10 minutes." },
          { type: 'secret', text: "Valerius a un secret : il a trouvé une salle scellée sous le temple il y a trois ans et n'en a parlé à personne. Il a senti la magie noire derrière la porte et a eu trop peur pour l'ouvrir. Sa culpabilité le ronge." },
        ],
        npcs: [
          {
            name: "Haut-Prêtre Valerius",
            role: "Chef du clergé de Solarius à Sol-Aureus",
            personality: "Digne, autoritaire, mais secrètement rongé par le doute et la peur. Sa foi est sincère mais vacillante.",
            appearance: "Humain, la soixantaine, grand et mince. Cheveux gris argent, yeux bleus perçants cernés de fatigue. Robe cérémonielle blanche et or, mitre de soie. Mains qui tremblent légèrement — un détail qu'il tente de dissimuler.",
            secret: "Depuis trois mois, ses prières ne reçoivent plus de réponse. Le silence divin le terrifie plus que tout le reste. Il ne sait pas si Solarius l'a abandonné ou si quelque chose bloque la connexion.",
            dialogues: {
              greeting: "« Vous voilà. On m'a dit que vous aviez des... informations urgentes. Pardonnez le désordre, les nuits sont longues au temple ces temps-ci. Asseyez-vous. »",
              info: "« Des fissures apparaissent dans le sol sanctifié. Mes prêtres font des cauchemars identiques. Les bougies éternelles vacillent pour la première fois en trois cents ans. Et vous me dites qu'il y a un sceau... un sceau ashkan... sous le lieu le plus sacré d'Aethelgard ? Non. Non, c'est impossible. »",
              quest: "« ...Montrez-moi ce journal. ...Par Solarius. Ces runes... Je les ai vues. Sur la porte. La porte que j'ai trouvée il y a trois ans et que je n'ai jamais ouverte. Pardonnez-moi. J'aurais dû... J'ai eu peur. Un prêtre qui a peur. Quelle ironie. Venez. Je vais vous montrer le chemin. »",
              farewell: "« Que Solarius vous protège dans les ténèbres. Et si Sa lumière ne peut pas descendre aussi profond... que votre courage suffise. »",
            },
            stats: { hp: 50, atk: 10, ac: 16 },
          },
          {
            name: "Sœur Méridiane",
            role: "Prêtresse guérisseuse / Soutien",
            personality: "Pragmatique, courageuse, dévouée. Là où Valerius doute, elle agit.",
            appearance: "Humaine, la trentaine, cheveux noirs tressés. Yeux brun chaleureux. Robe blanche simple, sacoche de soins à la ceinture. Cicatrice en forme d'étoile sur la main droite — marque d'un rituel de guérison qui a failli la tuer.",
            secret: "A secrètement exploré les sous-sols du temple seule, il y a deux semaines. A vu la porte que Valerius cache. A senti la magie noire et a reculé, mais a laissé une marque de craie pour retrouver le chemin.",
            dialogues: {
              greeting: "« Si vous êtes ceux que Solarius envoie, vous êtes en retard. Mais mieux vaut tard que jamais. Qu'est-ce que vous avez trouvé en bas ? »",
              info: "« Le Haut-Prêtre est un homme bon mais paralysé par la peur de l'inconnu. Moi, j'ai été en bas. Pas aussi profond que vous, mais assez pour savoir que quelque chose de terrible se prépare. La magie là-dessous est... malade. Corrompue. Comme une plaie infectée sous une peau saine. »",
              quest: "« Je viens avec vous. Non, ce n'est pas une question. Vous aurez besoin d'une guérisseuse. Et franchement, rester ici à prier pendant que le monde s'effondre ne correspond pas à ma définition du service divin. »",
              farewell: "« Solarius dit : 'La lumière ne fuit pas les ténèbres — elle les traverse.' C'est ce que nous allons faire. »",
            },
            stats: { hp: 38, atk: 8, ac: 14 },
          },
        ],
        skillChecks: [
          { skill: 'Persuasion', dc: 35, success: "Valerius cède. 'Vous avez raison. J'ai été aveugle — volontairement aveugle. Il est temps d'ouvrir cette porte.' Il vous tend une clé ancienne qu'il porte autour du cou.", failure: "Valerius hésite encore. Sœur Méridiane intervient : 'Avec tout le respect, Votre Sainteté, le temps du doute est passé.' Elle vous fait signe de la suivre discrètement." },
          { skill: 'Religion', dc: 30, success: "Vous reconnaissez les symboles de protection gravés dans l'architecture du temple — des contre-sceaux conçus pour renforcer un verrou magique en dessous. Le temple a littéralement été construit comme une couche de protection supplémentaire.", failure: "L'architecture du temple est magnifique mais vous ne décelez rien d'inhabituel dans ses symboles." },
        ],
        choices: [
          {
            id: 'choice-temple-entree',
            prompt: "Comment les héros accèdent-ils aux sous-sols du temple ?",
            options: [
              {
                label: "Avec la bénédiction de Valerius",
                description: "Convaincre le Haut-Prêtre de coopérer officiellement.",
                consequence: "Accès officiel, bénédiction de protection (+5 aux sauvegardes contre la nécromancie pendant 1h), et Sœur Méridiane comme alliée. Mais le Cercle des Cendres a des espions au temple — ils sont prévenus.",
                nextScene: 'scene-1-4-2',
                reputationChange: [{ faction: 'temple-solarius', amount: 10 }],
              },
              {
                label: "Discrètement avec Sœur Méridiane",
                description: "Contourner Valerius et utiliser le passage connu de Méridiane.",
                consequence: "Accès discret par un passage latéral. Pas de bénédiction officielle mais le Cercle n'est pas prévenu. Méridiane vous accompagne.",
                nextScene: 'scene-1-4-2',
                skillCheck: { skill: 'Discrétion', dc: 30, success: "Vous vous glissez dans les sous-sols sans être vus. Les couloirs sont vides — les prêtres évitent cette partie du temple la nuit.", failure: "Un novice vous surprend. Méridiane improvise : 'Inspection sanitaire nocturne. Retournez vous coucher.' Le novice obéit, mais il en parlera demain." },
              },
              {
                label: "Par les catacombes ashkanes",
                description: "Utiliser le réseau souterrain découvert au Chapitre 3 pour atteindre le sceau par en dessous.",
                consequence: "Approche par les catacombes — plus dangereux (rencontre possible avec 1d4 morts-vivants mineurs) mais contourne entièrement les défenses du temple et du Cercle. Arrivée directement près du Sceau.",
                nextScene: 'scene-1-4-2',
              },
            ],
          },
        ],
        nextScenes: ['scene-1-4-2'],
        previousScene: 'scene-1-3-4',
      },

      // --- Scène 2 : Descente vers le Sceau ---
      {
        id: 'scene-1-4-2',
        sceneNumber: 2,
        title: "Les Profondeurs Sacrées",
        type: 'exploration',
        location: "Sous-sols du Grand Temple de Solarius",
        locationId: 'sol-aureus-underground',
        estimatedMinutes: 25,
        readAloud: {
          text: `Sous le Grand Temple, la beauté laisse place à l'antiquité brute.

Les premiers niveaux sont des cryptes normales — des tombeaux de hauts-prêtres passés, ornés de fresques pieuses qui s'écaillent avec le temps. L'air est frais et sec, imprégné de résine et de vieux parchemin.

Mais à mesure que vous descendez, les choses changent.

Au troisième sous-sol, les murs de marbre cèdent la place à de la pierre grise non taillée. Au quatrième, cette pierre grise devient noire — la roche ashkan que vous connaissez désormais trop bien. Les runes de Solarius gravées sur les marches brillent d'un or de plus en plus pâle, comme des bougies qui s'épuisent.

Au cinquième niveau, vous trouvez la porte.

Elle est massive — trois mètres de haut, en métal noir veiné de veinérite verte. Pas de serrure, pas de poignée. Juste des runes qui couvrent toute sa surface, certaines ashkanes, d'autres dans un langage que même les érudits parmi vous ne reconnaissent pas. Les runes sont disposées en spirale, convergeant vers un point central où une gemme noire, grosse comme un poing, pulse d'une lueur sombre.

La porte vibre. Pas de manière visible — vous la sentez dans vos os, dans vos dents, dans le fond de votre crâne. Un bourdonnement constant qui dit, sans mots, une seule chose :

NE PASSEZ PAS.

Mais quelqu'un est déjà passé. La porte est entrouverte de quelques centimètres. Et de l'autre côté, une lumière verte pulse au rythme d'un cœur malade.`,
          mood: "Descente inexorable, sacré corrompu, seuil de l'horreur",
          music: "Basses profondes en crescendo, chœur fantomatique, bourdonnement de porte qui pulse",
        },
        gmNotes: [
          { type: 'info', text: "La Porte du Sceau a été partiellement forcée par le Cercle des Cendres. Ils ont réussi à l'entrouvrir mais pas à la franchir complètement — les protections de Solarius les repoussent encore. Ils travaillent à un rituel pour neutraliser ces protections." },
          { type: 'warning', text: "La porte émet une aura de terreur. Tous les personnages doivent réussir un jet de Sagesse CD 30 en la voyant ou subir le statut 'effrayé' pendant 1 minute. Les personnages qui adorent Solarius ont l'avantage sur ce jet." },
          { type: 'secret', text: "La gemme noire au centre de la porte est un Fragment de Sceau — une clé et un verrou à la fois. Si elle est retirée, la porte s'ouvre complètement et le Sceau s'affaiblit de façon permanente. Si elle est renforcée par de la magie divine, le Sceau se renforce temporairement." },
          { type: 'tip', text: "Laissez les joueurs examiner la porte. Un jet d'Arcanes CD 40 révèle que le Sceau est composé de trois couches : une ashkan (qui contient), une divine (qui purifie), et une primordiale (qui endort). Le Cercle a percé la première couche." },
          { type: 'lore', text: "Le Sceau sous Sol-Aureus est l'un des cinq Sceaux Primordiaux créés il y a 500 ans par le Conseil des Sept pour emprisonner les Anciens. Chaque Sceau est un nœud dans une toile de confinement. Briser un seul Sceau affaiblit tous les autres." },
        ],
        skillChecks: [
          { skill: 'Arcanes', dc: 40, success: "Le Sceau est triple : confinement ashkan, purification divine, sommeil primordial. La couche ashkan a été percée. Les deux autres tiennent encore, mais montrent des signes de fatigue. Vous estimez que sans intervention, elles cèderont dans quelques semaines.", failure: "La magie ici est trop ancienne et trop complexe pour être déchiffrée rapidement. Vous sentez le pouvoir mais ne comprenez pas sa structure." },
          { skill: 'Religion', dc: 35, success: "Les runes de Solarius sur les marches sont des prières de confinement — la même prière répétée des milliers de fois, gravée par des générations de prêtres. Certaines ont été grattées récemment. Le Cercle efface les protections.", failure: "Les runes sont trop anciennes pour être lues couramment, même par un érudit religieux." },
          { skill: 'Investigation', dc: 35, success: "La porte a été forcée avec un outil spécifique — vous voyez des marques de levier en métal noir, probablement en veinérite forgée. Quelqu'un a les connaissances et les outils pour manipuler l'architecture ashkan.", failure: "La porte est entrouverte mais vous ne pouvez pas déterminer comment elle a été forcée." },
        ],
        choices: [
          {
            id: 'choice-porte-sceau',
            prompt: "La porte du Sceau est entrouverte. Que font les héros ?",
            options: [
              {
                label: "Traverser la porte",
                description: "Entrer dans la chambre du Sceau pour évaluer la situation.",
                consequence: "Accès direct à la chambre du Sceau. Le Cercle est déjà à l'intérieur, en plein rituel. L'effet de surprise dépend de l'approche choisie précédemment.",
                nextScene: 'scene-1-4-3',
              },
              {
                label: "Renforcer les protections d'abord",
                description: "Utiliser la magie divine ou les connaissances acquises pour renforcer les runes avant d'entrer.",
                consequence: "Jet d'Arcanes ou de Religion CD 40. Succès : la couche divine du Sceau est temporairement renforcée — les créatures d'ombre à l'intérieur subissent un malus de -2 à tous leurs jets. Échec : l'énergie magique perturbée alerte le Cercle.",
                nextScene: 'scene-1-4-3',
                skillCheck: { skill: 'Religion', dc: 40, success: "Les runes de Solarius brillent d'un or renouvelé. Vous sentez une vague de chaleur sacrée traverser la pierre. Le Sceau est renforcé — temporairement.", failure: "Votre tentative produit un flash de lumière dorée qui s'éteint aussitôt. De l'autre côté de la porte, des voix s'arrêtent. Ils savent que vous êtes là." },
              },
              {
                label: "Piéger l'entrée",
                description: "Préparer une embuscade et attirer le Cercle hors de la chambre.",
                consequence: "Piéger la porte avec Outils de voleur CD 35 ou sorts appropriés. Si le Cercle sort, combat dans un couloir étroit (avantageux pour les défenseurs). Sinon, ils continuent le rituel.",
                nextScene: 'scene-1-4-3',
                skillCheck: { skill: 'Discrétion', dc: 35, success: "Vous installez un piège et vous embusquez dans les alcôves latérales. La patience est votre arme.", failure: "Un bruit métallique résonne dans le couloir. L'élément de surprise est compromis." },
              },
            ],
          },
        ],
        nextScenes: ['scene-1-4-3'],
        previousScene: 'scene-1-4-1',
        mapMovement: { from: 'sol-aureus', to: 'sol-aureus-underground' },
      },

      // --- Scène 3 : La Chambre du Sceau - Boss Fight ---
      {
        id: 'scene-1-4-3',
        sceneNumber: 3,
        title: "L'Épreuve du Premier Sceau",
        type: 'combat',
        location: "Chambre du Premier Sceau, sous le Grand Temple",
        locationId: 'sol-aureus-underground',
        estimatedMinutes: 45,
        readAloud: {
          text: `La chambre du Sceau est un cauchemar sacré.

Circulaire, d'un diamètre de vingt mètres, elle semble être le négatif parfait du temple au-dessus. Là où le temple est lumière, marbre et or, la chambre est ténèbres, obsidienne et argent terni. Un dôme inversé — creusé dans la roche plutôt que construit vers le ciel — reflète la structure du dôme doré en une parodie obscure.

Au centre exact, le Sceau.

Vous l'imaginiez comme une porte, un mur, une barrière. C'est autre chose. C'est un trou dans le monde — un disque de trois mètres de diamètre tracé dans l'air à un mètre du sol, rempli d'une substance qui n'est ni liquide, ni solide, ni gazeuse. Elle est noire, absolument noire, d'un noir qui aspire la lumière et le regard. Des chaînes de lumière argentée — cinq chaînes, chacune ancrée à un pilier de cristal disposé en pentagone autour du disque — maintiennent la chose fermée. Deux des chaînes sont brisées. Une troisième émet des craquements audibles.

Autour du Sceau, cinq cultistes du Cercle des Cendres chantent en ashkan archaïque, leurs voix formant une harmonie discordante qui fait saigner l'air. Leurs masques de cendre brillent d'une lueur verte.

Et au-dessus du Sceau, flottant comme un pantin aux fils invisibles, une forme se matérialise. Du disque noir, quelque chose émerge — lentement, inexorablement, comme un noyé remontant des profondeurs.

C'est une silhouette humanoïde composée d'ombre pure. Huit mètres de haut. Des bras trop longs, des doigts comme des lames. Un visage lisse et sans traits — sauf des yeux. Des dizaines d'yeux qui s'ouvrent un par un sur toute sa surface, chacun brillant d'un vert malade.

Le Vorace du Seuil est presque libre.

Les cultistes se retournent vers vous.

« Trop tard, » dit leur leader, un homme en robe écarlate, masque de cendre gravé de runes dorées. « Le Vorace se réveille. Et rien ne peut le rendormir. »

La créature ouvre sa bouche — un gouffre de néant — et hurle.

Le combat commence.`,
          mood: "Épique, apocalyptique à petite échelle, horreur cosmique vs courage mortel",
          music: "Orchestre complet en fortissimo, chœur latin dramatique, percussions de guerre, crescendo constant",
        },
        gmNotes: [
          { type: 'info', text: "C'est LE combat climactique de l'Acte I. Deux objectifs simultanés : vaincre (ou repousser) le Vorace du Seuil ET empêcher les cultistes de briser la troisième chaîne. Si la troisième chaîne se brise, le Vorace gagne en puissance (voir stats alternatives)." },
          { type: 'warning', text: "Le Vorace n'est PAS supposé être tué. Il est repoussé. Quand il tombe à 0 HP, il est aspiré dans le disque et le Sceau se referme temporairement. Si les joueurs essayent de le 'finir', expliquez que la créature est immortelle — seul le Sceau peut la contenir." },
          { type: 'tip', text: "Divisez le combat en phases. Phase 1 : cultistes + Vorace partiellement émergé (3 tours). Phase 2 : le leader active un rituel pour briser la 3e chaîne — les joueurs doivent l'interrompre. Phase 3 : Vorace pleinement actif, combat de survie. Objectif : tenir 5 tours jusqu'à ce que le Sceau se referme naturellement." },
          { type: 'secret', text: "Le leader cultiste est Archon Zael, bras droit du Haut Cercle. C'est un ennemi récurrent — s'il survit ici, il reviendra dans l'Acte III. Si les joueurs le capturent, il peut révéler l'existence des autres Sceaux à travers Aethelgard." },
          { type: 'lore', text: "Le Vorace du Seuil n'est pas un Ancien — c'est un gardien de l'Autre Côté, une créature-sentinelle qui patrouille les frontières entre les mondes. Les Anciens sont infiniment plus puissants. Ce n'est qu'un aperçu de ce qui attend si tous les Sceaux se brisent." },
        ],
        npcs: [
          {
            name: "Archon Zael",
            role: "Lieutenant du Cercle des Cendres / Boss secondaire",
            personality: "Fanatique, éloquent, convaincu de la justesse de sa cause. Prêt à mourir pour libérer les Anciens.",
            appearance: "Humain, la quarantaine, robe écarlate brodée de runes dorées. Masque de cendre orné. Sous le masque, un visage marqué par des brûlures rituelles. Yeux dorés — un signe de corruption par la magie ashkan.",
            secret: "Ancien capitaine de l'Aube d'Argent. A été converti au Cercle après avoir découvert que l'Aube cachait des informations sur la nature réelle des Sceaux. Ses anciens frères d'armes ne savent pas ce qu'il est devenu.",
            dialogues: {
              greeting: "« Héros de pacotille. Vous venez empêcher l'inévitable avec vos petites épées et vos sorts d'apprentis. Admirable. Futile. »",
              info: "« Les Sceaux sont des cages injustes. Ce que vous appelez 'Anciens' sont des dieux emprisonnés par des mortels arrogants. Nous ne détruisons rien — nous libérons. Et ce que nous libérons nous récompensera. »",
              quest: "« Dernière chance. Posez vos armes et rejoignez le bon côté de l'histoire. Quand les Anciens marcheront de nouveau, ceux qui auront aidé à leur libération seront épargnés. Les autres... »",
              farewell: "« Ce n'est que le début. Un Sceau tombe, les autres suivront. Vous ne pouvez pas surveiller cinq Sceaux à la fois. Nous, si. À bientôt, héros. »",
            },
            stats: { hp: 70, atk: 16, ac: 17 },
          },
        ],
        encounter: {
          name: "L'Épreuve du Premier Sceau",
          enemies: [
            {
              name: "Le Vorace du Seuil",
              hp: 120,
              atk: 18,
              ac: 16,
              cr: 5,
              abilities: [
                "Regard du Vide (Recharge 5-6) : Tous les ennemis dans un rayon de 10m doivent réussir un jet de Sagesse CD 40 ou être paralysés de terreur pendant 1 tour.",
                "Griffes Dimensionnelles : Portée 3m, +18 au toucher, 3d8+6 dégâts nécrotiques. Ignore les armures non-magiques.",
                "Absorption d'Ombre : En réaction à un sort de dégâts, absorbe le sort et récupère la moitié des dégâts en HP.",
                "Cri du Seuil (1/combat) : Tous les personnages dans la chambre subissent 4d6 dégâts psychiques et doivent réussir un jet de Constitution CD 35 ou être étourdis pendant 1 tour.",
                "Faiblesse : Les dégâts radiants infligent des dégâts doubles. La lumière divine empêche sa régénération pendant 1 tour.",
              ],
            },
            {
              name: "Archon Zael",
              hp: 70,
              atk: 16,
              ac: 17,
              cr: 4,
              abilities: [
                "Lame de Cendre : +16 au toucher, 2d8+5 dégâts tranchants + 1d6 dégâts de feu nécrotique.",
                "Bouclier de Cendre (Réaction) : +3 CA contre une attaque. Crée un nuage de cendre qui impose un désavantage aux attaques à distance contre lui pendant 1 tour.",
                "Chant de Rupture : Action bonus pour contribuer au rituel de destruction de la chaîne. S'il chante 3 tours consécutifs sans être interrompu, la 3e chaîne se brise.",
                "Parole du Cercle : Peut utiliser une action pour ordonner aux cultistes de se sacrifier (un cultiste meurt, Zael récupère 15 HP et gagne +2 ATK pendant 1 tour).",
              ],
            },
            {
              name: "Cultiste du Cercle des Cendres",
              hp: 20,
              atk: 10,
              ac: 12,
              cr: 1,
              abilities: [
                "Trait de cendre : Portée 15m, +10 au toucher, 1d8+3 dégâts nécrotiques.",
                "Sacrifice : En réaction à la mort, explose en cendre — 1d6 dégâts nécrotiques à tous les personnages dans un rayon de 2m.",
              ],
            },
          ],
          terrain: [
            "Piliers de cristal (5 piliers formant un pentagone autour du Sceau. Chacun HP 30, CA 15. Détruire un pilier brise une chaîne. Protéger les piliers maintient le Sceau.)",
            "Disque du Sceau au centre (terrain dangereux — tout personnage qui touche le disque subit 3d10 dégâts nécrotiques et est repoussé de 3m)",
            "Cercle rituel au sol (donne +2 ATK aux cultistes tant qu'ils sont à l'intérieur)",
            "Colonnes d'obsidienne (couverture partielle, ne peuvent pas être détruites)",
            "Zone de lumière résiduelle (si les runes de Solarius ont été renforcées, zone de 3m de rayon où les morts-vivants subissent 1d6 dégâts radiants par tour)",
          ],
          tactics: "Phase 1 (Tours 1-3) : Le Vorace est partiellement émergé, ne peut utiliser que ses Griffes Dimensionnelles et son Regard. Les cultistes attaquent à distance. Zael chante pour briser la 3e chaîne. Phase 2 (Tour 4+) : Si la 3e chaîne est intacte, le Vorace commence à être aspiré vers le Sceau (-20 HP/tour, essaie de résister). Si la chaîne est brisée, le Vorace émerge complètement et gagne +2 ATK et Cri du Seuil. Zael rejoint le combat au corps à corps. Phase 3 (Après 5 tours) : Le Sceau pulse et aspire le Vorace, qu'il ait été vaincu ou non. Le combat se termine.",
          loot: [
            "Lame de Cendre de Zael (épée longue +1, +1d6 dégâts de feu nécrotique, maudite — murmure des secrets du Cercle au porteur pendant ses rêves)",
            "Fragment de cristal du Sceau (artefact de quête, nécessaire pour comprendre les autres Sceaux)",
            "Médaillon du Haut Cercle (preuve de l'existence du Cercle, ouvre certaines portes dans leurs repaires)",
            "500 pièces d'or en offrandes rituelles",
            "Parchemin de Bouclier Radiant (sort de niveau 3, usage unique)",
          ],
        },
        choices: [
          {
            id: 'choice-premier-sceau',
            prompt: "Le combat fait rage autour du Premier Sceau. Comment les héros gèrent-ils la bataille ?",
            options: [
              {
                label: "Protéger les piliers de cristal",
                description: "Concentrer les efforts sur la défense des chaînes du Sceau pour empêcher sa rupture.",
                consequence: "Les héros se positionnent autour des piliers. Zael est interrompu dans son chant de rupture. La 3e chaîne tient. Le Vorace est aspiré dans le Sceau affaibli mais intact.",
                nextScene: 'scene-1-4-4',
              },
              {
                label: "Éliminer Archon Zael en priorité",
                description: "Concentrer les attaques sur le leader cultiste pour briser la coordination ennemie.",
                consequence: "Zael tombe avant de compléter son chant. Les cultistes paniquent et fuient. Le Vorace, sans soutien rituel, est progressivement réaspiré par le Sceau.",
                nextScene: 'scene-1-4-4',
                reputationChange: [{ faction: 'cercle-des-cendres', amount: -10 }],
              },
              {
                label: "Utiliser la lumière divine contre le Vorace",
                description: "Exploiter la faiblesse du Vorace aux dégâts radiants pour le repousser dans le Sceau.",
                consequence: "Les dégâts radiants infligent des dégâts doubles au Vorace. Combiné avec les prières de Sœur Méridiane (si présente), le Vorace est repoussé plus rapidement. Le Sceau se referme avec force.",
                nextScene: 'scene-1-4-4',
              },
            ],
          },
        ],
        nextScenes: ['scene-1-4-4'],
        previousScene: 'scene-1-4-2',
      },

      // --- Scène 4 : Après la bataille - Révélations ---
      {
        id: 'scene-1-4-4',
        sceneNumber: 4,
        title: "L'Aube après la Nuit",
        type: 'revelation',
        location: "Grand Temple de Solarius, Sol-Aureus",
        locationId: 'sol-aureus',
        estimatedMinutes: 30,
        readAloud: {
          text: `Le Sceau pulse une dernière fois, aspire les restes du Vorace comme une blessure qui se referme, et le silence tombe.

Un vrai silence cette fois. Pas un silence d'attente ou de menace — un silence d'épuisement. Les murs cessent de vibrer. La lueur verte de la veinérite s'éteint progressivement. Les runes de Solarius retrouvent leur éclat doré, pâle mais constant.

Vous êtes debout. Couverts de cendre et de sueur, tremblants d'adrénaline et de fatigue, mais debout.

Le Sceau est intact. Affaibli — les deux chaînes brisées ne se sont pas reformées et la troisième montre des fissures — mais intact. La porte entre les mondes reste fermée. Pour combien de temps, personne ne peut le dire.

Quand vous remontez les escaliers, marche après marche, le monde d'en haut vous accueille comme un rêve presque oublié.

Le Grand Temple baigne dans la lumière de l'aube. Les premiers rayons du soleil traversent les vitraux et peignent le sol de marbre de couleurs impossibles — rouge, or, bleu, violet. Les bougies flottantes brûlent de nouveau avec assurance.

Le Haut-Prêtre Valerius vous attend en haut des marches. Derrière lui, Sœur Méridiane, et — surprise — trois autres visages. Un chevalier en armure argentée de l'Aube d'Argent. Une femme en robe de la Guilde des Arcanes. Et un homme que vous ne reconnaissez pas, vêtu simplement, dont le regard porte le poids de siècles.

Valerius s'agenouille.

« Pardonnez un vieil homme sa lâcheté. Et écoutez — car ce que cet homme a à vous dire changera tout ce que vous croyez savoir sur le monde. »

L'homme en vêtements simples s'avance. Ses yeux sont violets, d'un violet profond et ancien.

« Mon nom est Aldric. Non — pas le roi. L'autre Aldric. Celui qui a aidé à créer les Sceaux il y a cinq cents ans. Il est temps que vous sachiez la vérité. Toute la vérité. »`,
          mood: "Catharsis, émerveillement solennel, ouverture vers l'immensité de la quête",
          music: "Thème principal en majeur, cordes et chœur lumineux, progression héroïque lente et majestueuse",
        },
        gmNotes: [
          { type: 'info', text: "Scène de dénouement de l'Acte I. Aldric l'Ancien (à ne pas confondre avec le roi Aldric III) est l'un des Sept qui ont créé les Sceaux. Il est maintenu en vie par la magie du Sceau lui-même — tant que les Sceaux existent, il vit. C'est un PNJ récurrent pour le reste de la campagne." },
          { type: 'tip', text: "C'est le moment des grandes révélations. Aldric explique : il existe 5 Sceaux à travers Aethelgard. Chacun est gardé (ou l'était) par l'un des Sept. Trois des Sept sont morts. Le Cercle des Cendres vise tous les Sceaux simultanément. Le monde a besoin de champions pour parcourir Aethelgard et protéger les Sceaux restants." },
          { type: 'secret', text: "Aldric ne dit pas tout. Il cache que les Sceaux ne sont pas éternels — même sans le Cercle, ils s'affaiblissent naturellement. Dans cinquante ans, ils auraient cédé de toute façon. Le Cercle ne fait qu'accélérer l'inévitable. La vraie question n'est pas 'comment empêcher les Sceaux de se briser' mais 'que faire quand ils se briseront'." },
          { type: 'lore', text: "Les cinq Sceaux sont situés : 1) Sous Sol-Aureus (protégé, affaibli). 2) Dans la Sylve d'Émeraude, près de l'Arbre-Monde. 3) Dans les Monts Cœur-de-Fer, au plus profond de Forgefer. 4) Sous les ruines marines au large de la Côte des Orages. 5) Au cœur des Terres Brûlées, dans les décombres de l'ancienne capitale ashkan." },
          { type: 'warning', text: "Les joueurs pourraient vouloir rester à Sol-Aureus pour protéger ce Sceau. Aldric leur explique que le Sceau ici est le plus fort — il peut tenir seul. Les autres sont plus vulnérables. La priorité est de vérifier et protéger les Sceaux éloignés." },
        ],
        npcs: [
          {
            name: "Aldric l'Ancien",
            role: "L'un des créateurs des Sceaux / Mentor",
            personality: "Sage, fatigué par les siècles, mélancolique mais déterminé. Parle avec la lenteur de quelqu'un pour qui le temps a perdu sa valeur.",
            appearance: "Apparence d'un homme de 60 ans, mais ses yeux violets trahissent un âge incompréhensible. Vêtements simples de voyageur, aucun insigne. Mains couvertes de cicatrices argentées — les traces de la création des Sceaux. Autour du cou, un pendentif contenant cinq petites gemmes, chacune d'une couleur différente. L'une est éteinte.",
            secret: "Aldric sait que les Sceaux vont inévitablement se briser et cherche secrètement un moyen de vaincre les Anciens plutôt que simplement de les contenir. Il n'a pas de solution, seulement un espoir.",
            dialogues: {
              greeting: "« Je m'excuse pour le secret. Cinq cents ans de prudence créent des habitudes difficiles à briser. Mais le temps des secrets est révolu. Asseyez-vous, s'il vous plaît. Ce que j'ai à dire est long. »",
              info: "« Les Sceaux sont des verrous sur une prison dimensionnelle. Les Anciens — cinq entités d'un pouvoir inimaginable — y sont enfermés depuis la chute de l'Hégémonie d'Ashka. Nous, le Conseil des Sept, avons sacrifié tout ce que nous avions pour les créer. Trois d'entre nous y ont laissé leur vie. Et maintenant, les verrous rouillent. »",
              quest: "« Vous avez protégé un Sceau cette nuit. Mais il en reste quatre, dispersés à travers Aethelgard, et le Cercle des Cendres les cherche tous. J'ai besoin de champions — de personnes assez courageuses ou assez folles — pour parcourir le monde et vérifier chaque Sceau. Commencez par la Sylve d'Émeraude. Les elfes m'envoient des rapports inquiétants. »",
              farewell: "« Prenez ce pendentif. Chaque gemme représente un Sceau. Quand une gemme s'éteint... un Sceau est tombé. Ne laissez pas cette lumière mourir. »",
            },
            stats: { hp: 150, atk: 25, ac: 22 },
          },
        ],
        choices: [
          {
            id: 'choice-destination',
            prompt: "Aldric suggère la Sylve d'Émeraude, mais les héros sont libres de choisir leur prochaine destination.",
            options: [
              {
                label: "La Sylve d'Émeraude",
                description: "Suivre le conseil d'Aldric. Les elfes et l'Arbre-Monde sont en danger.",
                consequence: "Départ vers la Sylve d'Émeraude. Acte II commence par le voyage à travers les terres sauvages. Les Gardiens d'Émeraude attendent.",
                nextScene: 'scene-2-5-1',
                reputationChange: [{ faction: 'gardiens-emeraude', amount: 5 }],
              },
              {
                label: "Les Monts Cœur-de-Fer",
                description: "Les nains de Forgefer et les mines profondes appellent.",
                consequence: "Direction les montagnes. Le Sceau de Forgefer est enterré sous des kilomètres de roche. Les nains ne savent pas ce qu'ils gardent.",
                nextScene: 'scene-2-3-1',
                reputationChange: [{ faction: 'forgefer', amount: 5 }],
              },
              {
                label: "Enquêter davantage à Sol-Aureus",
                description: "Rester en ville pour en apprendre plus sur le Cercle avant de partir.",
                consequence: "Une semaine d'enquête révèle un réseau de contacts du Cercle dans les Cités Libres de la côte. Les héros partent mieux informés mais le Cercle a une semaine d'avance sur les autres Sceaux.",
                nextScene: 'scene-2-6-1',
              },
            ],
          },
        ],
        loot: [
          "Pendentif des Cinq Sceaux (artefact de quête — chaque gemme indique l'état d'un Sceau)",
          "Bénédiction de Solarius (avantage aux jets de sauvegarde contre la nécromancie pendant 7 jours)",
          "Lettre d'introduction d'Aldric (ouvre des portes auprès des factions alliées)",
          "1000 pièces d'or (récompense collective du temple et des factions)",
        ],
        nextScenes: ['scene-2-5-1', 'scene-2-3-1', 'scene-2-6-1'],
        previousScene: 'scene-1-4-3',
        mapMovement: { from: 'sol-aureus-underground', to: 'sol-aureus' },
      },
    ],
    chapterConclusion: {
      text: `L'Acte I s'achève sur le parvis du Grand Temple de Solarius, dans la lumière de l'aube.

Les héros ne sont plus les mêmes qu'à leur arrivée à Sol-Aureus. Ils ont vu ce qui se cache sous la surface dorée du monde. Ils ont combattu les ombres et les ont repoussées — pour l'instant.

Devant eux, Aethelgard s'étend dans toute sa beauté et sa fragilité. Les routes mènent vers les forêts elfiques, les montagnes naines, les mers libres et les déserts de cendres. Quelque part au bout de chaque route, un Sceau attend, fragile et menacé.

Le Cercle des Cendres est en mouvement. Les Anciens rêvent de liberté. Le monde retient son souffle.

Et les héros, armés de courage et de la vérité, partent en quête.

L'aventure ne fait que commencer.`,
      mood: "Héroïque et mélancolique, fin d'un chapitre et début d'une épopée",
      music: "Thème héroïque complet, orchestre et chœur, montée vers un crescendo final puis silence — un seul violon joue les premières notes du thème de voyage",
    },
    rewards: { xp: 1500, gold: "1000 po", items: ["Pendentif des Cinq Sceaux", "Lame de Cendre", "Fragment de cristal du Sceau", "Médaillon du Haut Cercle", "Lettre d'introduction d'Aldric", "Parchemin de Bouclier Radiant"] },
  },
];

// ============================================================================
// ACTE II - CHAPITRES ADDITIONNELS
// ============================================================================

export const ACT_2_EXTRA_CHAPTERS: BookChapter[] = [
  // -------------------------------------------------------------------------
  // CHAPITRE 5 : LA SYLVE D'ÉMERAUDE
  // -------------------------------------------------------------------------
  {
    id: 'ch-2-5',
    actNumber: 2,
    chapterNumber: 5,
    title: "La Sylve d'Émeraude",
    subtitle: "Là où les arbres ont des yeux et les racines ont des mémoires",
    summary: "Les héros traversent la vaste forêt elfique pour atteindre l'Arbre-Monde Yggdrasylve. Ils rencontrent les Gardiens d'Émeraude, naviguent les intrigues politiques elfiques, et découvrent que le Sceau forestier s'affaiblit, corrompant la forêt elle-même. La nature se retourne contre ses protecteurs.",
    levelRange: "4-5",
    themes: ['nature sauvage', 'politique elfique', 'corruption', 'équilibre'],
    chapterIntro: {
      text: `La route vers la Sylve d'Émeraude quitte les terres cultivées du Val Doré pour s'enfoncer dans un paysage de plus en plus sauvage. Les champs cèdent la place aux prairies, les prairies aux collines boisées, et les collines à la muraille végétale qui marque la frontière du plus ancien territoire d'Aethelgard.

La Sylve d'Émeraude.

Vue de loin, c'est un mur de verdure si dense qu'il semble solide — comme si la forêt était un être unique, un organisme géant qui respire et observe. Les arbres les plus hauts dépassent cent mètres. Leurs canopées se chevauchent pour former un toit continu que la lumière du soleil ne traverse qu'en minces lames dorées.

À la lisière, une arche naturelle formée par deux chênes millénaires dont les branches se sont entrelacées marque l'entrée officielle. Des runes elfiques brillent doucement dans l'écorce — non pas gravées, mais poussées comme si les arbres les avaient fait naître d'eux-mêmes.

L'air change dès que vous passez sous l'arche. Plus frais, plus humide, chargé de mille parfums végétaux. Et quelque chose d'autre — une vibration subtile, un bourdonnement de vie qui n'a rien à voir avec les insectes ou les oiseaux.

La forêt vous accueille.

Ou peut-être vous juge-t-elle.`,
      mood: "Émerveillement naturel, immensité vivante, sentiment d'être observé",
      music: "Flûte elfique, harpe, sons de forêt amplifiés, chœur de voix féminines lointaines",
    },
    scenes: [
      // --- Scène 1 : La Lisière Vivante ---
      {
        id: 'scene-2-5-1',
        sceneNumber: 1,
        title: "La Lisière Vivante",
        type: 'exploration',
        location: "Bordure de la Sylve d'Émeraude",
        locationId: 'sylve-emeraude',
        estimatedMinutes: 25,
        readAloud: {
          text: `La forêt ne ressemble à rien de ce que vous avez connu.

Les arbres ici ne sont pas simplement grands — ils sont anciens d'une manière qui se sent dans l'air. Leurs troncs font cinq, dix, parfois vingt mètres de diamètre. L'écorce est striée de motifs qui ressemblent à des visages endormis — des nœuds et des creux qui forment des yeux clos, des bouches entrouvertes, des expressions de paix séculaire.

Le sol est un tapis de mousse épaisse et élastique, ponctué de champignons bioluminescents qui émettent une douce lueur bleutée. Des lianes pendantes forment des rideaux de verdure entre les troncs, et des fleurs inconnues s'ouvrent et se ferment au rythme d'une horloge invisible.

Un sentier existe — non pas taillé mais suggéré, comme si la forêt avait décidé de laisser passer ceux qui marchent avec respect. Les racines s'écartent, les branches se soulèvent, les ronces reculent juste assez.

Mais au-delà du sentier, la forêt est impénétrable. Et dans ses profondeurs, des yeux brillent. Pas hostiles — curieux. Des dizaines de paires d'yeux, verts et dorés, qui vous suivent entre les feuilles.

Puis une voix, cristalline et froide comme l'eau d'une source de montagne :

« Halte. Identifiez-vous, ou la Sylve vous identifiera elle-même. Et la Sylve n'est pas toujours... délicate. »

Une figure descend d'un arbre avec une grâce impossible — sans bruit, sans effort, comme si la gravité était une suggestion qu'elle avait choisi de poliment refuser.`,
          mood: "Majesté naturelle, légère menace, frontière entre deux mondes",
          music: "Ambiance de forêt ancienne, chant d'oiseaux exotiques, craquements de bois vieux",
        },
        gmNotes: [
          { type: 'info', text: "L'éclaireur est Sylvaine Arc-de-Lune, capitaine des Sentinelles de la lisière. Elle est la première ligne de défense elfique et ne laisse passer personne sans vérification. La lettre d'Aldric accélère grandement le processus." },
          { type: 'tip', text: "Si les joueurs ont la lettre d'introduction d'Aldric, Sylvaine la reconnaît immédiatement et change d'attitude — de méfiante à respectueuse. Sans la lettre, il faut un jet de Persuasion CD 45 ou l'invocation du nom d'un Gardien d'Émeraude connu." },
          { type: 'warning', text: "Entrer dans la Sylve sans autorisation déclenche les défenses de la forêt : 1d4 loup-arbres (HP 35, ATK 12, AC 14) surgissent des sous-bois. Sylvaine appelle ses archers (4 éclaireurs, HP 28, ATK 14, AC 16) en renfort." },
          { type: 'secret', text: "Sylvaine cache une inquiétude profonde. La forêt est malade — les arbres-sentinelles de la lisière perdent leurs feuilles hors saison, et les animaux migrent vers l'extérieur de la Sylve. Elle n'en parle pas aux étrangers, mais les joueurs perceptifs peuvent le remarquer." },
          { type: 'lore', text: "La Sylve d'Émeraude est la plus ancienne forêt d'Aethelgard. Les elfes y vivent depuis 3000 ans. L'Arbre-Monde Yggdrasylve en est le cœur — un arbre colossal visible à des kilomètres dont les racines, dit-on, plongent jusqu'au centre du monde." },
        ],
        npcs: [
          {
            name: "Sylvaine Arc-de-Lune",
            role: "Capitaine des Sentinelles / Premier contact elfique",
            personality: "Disciplinée, protectrice, méfiante envers les non-elfes mais honorable. Loyauté absolue envers la Sylve.",
            appearance: "Elfe sylvestre, apparence de 30 ans (réellement 250). Cheveux vert sombre tressés avec des feuilles vivantes. Yeux ambre, taches de rousseur dorées. Armure de cuir vert renforcée d'écorce vivante. Arc long en bois d'if blanc, carquois de flèches à plumes vertes.",
            secret: "Son frère jumeau, Thaelen, est un Gardien d'Émeraude posté près de l'Arbre-Monde. Elle n'a pas eu de nouvelles depuis deux semaines — anormalement long. Son inquiétude personnelle se mêle à son devoir.",
            dialogues: {
              greeting: "« Vous n'êtes pas les premiers étrangers à vouloir entrer ces derniers temps. Mais les derniers qui sont entrés sans permission n'en sont jamais ressortis. La Sylve a ses propres lois. »",
              info: "« L'Arbre-Monde est à trois jours de marche par le Sentier des Cerfs. Deux si vous ne dormez pas, mais je ne le recommande pas — la forêt n'aime pas qu'on la traverse à la hâte. Elle a tendance à... ralentir les impatients. »",
              quest: "« Si vous allez vers l'Arbre-Monde, cherchez mon frère, Thaelen. Il est Gardien posté au Cercle des Racines. Dites-lui que Sylvaine attend. Et dites-lui de répondre à mes messages, par les étoiles. »",
              farewell: "« Marchez avec respect. Ne cueillez rien, ne coupez rien, ne brûlez rien. La Sylve pardonne peu et n'oublie jamais. Bonne route, étrangers. »",
            },
            stats: { hp: 45, atk: 16, ac: 17 },
          },
        ],
        skillChecks: [
          { skill: 'Nature', dc: 30, success: "Vous remarquez que certains arbres de la lisière sont malades — leur écorce est grisâtre, leurs feuilles jaunissent de façon anormale. Quelque chose corrompt la forêt depuis l'intérieur.", failure: "La forêt est belle et imposante. Difficile de juger son état de santé sans expertise." },
          { skill: 'Perception', dc: 35, success: "Les yeux dans les sous-bois appartiennent à des esprits sylvestres — de petites créatures féeriques qui surveillent les visiteurs pour le compte des Gardiens. L'un d'eux vous fait un signe de la main avant de disparaître.", failure: "Vous sentez des regards mais ne parvenez pas à identifier leur source." },
        ],
        choices: [
          {
            id: 'choice-entree-sylve',
            prompt: "Comment les héros entrent-ils dans la Sylve d'Émeraude ?",
            options: [
              {
                label: "Avec la lettre d'Aldric",
                description: "Présenter la lettre d'introduction et demander une escorte.",
                consequence: "Sylvaine reconnaît le sceau d'Aldric et accorde le passage immédiat. Elle assigne un éclaireur pour guider le groupe sur le Sentier des Cerfs.",
                nextScene: 'scene-2-5-2',
                reputationChange: [{ faction: 'gardiens-emeraude', amount: 10 }],
              },
              {
                label: "Par la diplomatie",
                description: "Expliquer la menace du Cercle et l'urgence de la mission.",
                consequence: "Persuasion CD 40. Succès : Sylvaine comprend la gravité et accorde le passage à contrecœur. Échec : elle exige que le groupe attende qu'un Gardien vienne les chercher (1 jour de retard).",
                nextScene: 'scene-2-5-2',
                skillCheck: { skill: 'Persuasion', dc: 40, success: "Sylvaine plisse les yeux. 'Le Cercle des Cendres... j'ai entendu ce nom dans les rapports. Passez. Mais un de mes archers vous accompagne.' ", failure: "'Je n'accorde pas le passage sur la foi de paroles. Attendez ici. J'envoie un message au Cercle des Racines.' Un jour de retard, mais passage accordé." },
              },
              {
                label: "Contourner les sentinelles",
                description: "Trouver un passage alternatif dans la forêt.",
                consequence: "Survie CD 45 pour trouver un passage. La route alternative traverse le Bosquet des Murmures — une zone corrompue par l'affaiblissement du Sceau. Rencontre avec 1d4 esprits corrompus.",
                nextScene: 'scene-2-5-2',
                skillCheck: { skill: 'Survie', dc: 45, success: "Vous trouvez un passage naturel que même les sentinelles ne surveillent pas. Mais la forêt ici est... différente. Les arbres sont tordus, les champignons noirs, et l'air a un goût de cendre.", failure: "La forêt vous repousse littéralement — des racines se dressent, des branches fouettent. Vous êtes ramenés à la lisière, face à une Sylvaine pas du tout amusée." },
              },
            ],
          },
        ],
        nextScenes: ['scene-2-5-2'],
        previousScene: 'scene-1-4-4',
        mapMovement: { from: 'sol-aureus', to: 'sylve-emeraude' },
      },

      // --- Scène 2 : Le Conseil des Branches ---
      {
        id: 'scene-2-5-2',
        sceneNumber: 2,
        title: "Le Conseil des Branches",
        type: 'social',
        location: "Cité arboricole de Vaelindra, Sylve d'Émeraude",
        locationId: 'vaelindra',
        estimatedMinutes: 35,
        readAloud: {
          text: `Après deux jours de marche sous la canopée, le sentier débouche sur quelque chose d'inimaginable.

Vaelindra. La cité dans les arbres.

Construite à cinquante mètres de hauteur dans la canopée d'un bosquet de titans — des arbres si massifs que leurs branches principales ont la largeur de routes —, la cité elfique est un chef-d'œuvre vivant. Des passerelles de bois vivant relient les plates-formes et les habitations, chacune sculptée dans l'arbre lui-même, comme si les elfes avaient convaincu le bois de pousser en forme de maisons, d'escaliers et de ponts.

Des lanternes de sève luminescente éclairent les passages d'une lumière verte et dorée. Des cascades miniatures coulent le long des troncs, alimentant des bassins suspendus où nagent des poissons argentés. Des jardins verticaux débordent de fleurs et d'herbes dont les parfums se mêlent en un bouquet enivrant.

Et partout, des elfes. Des centaines d'elfes qui vivent, travaillent, rient et murmurent dans les branches. Certains vous regardent avec curiosité, d'autres avec hostilité, et la plupart avec une indifférence polie qui suggère que vous n'êtes pas les premiers étrangers à les déranger.

Au centre de Vaelindra, la plus grande plate-forme — le Conseil des Branches — est une salle à ciel ouvert bordée de sièges sculptés dans des branches vivantes. Huit sièges, disposés en cercle. Cinq sont occupés.

L'un des occupants se lève. C'est une elfe d'une beauté terrible — le genre de beauté qui coupe plutôt qu'elle ne réchauffe.

« Bienvenue à Vaelindra. Je suis Archère Verte Isiel, Voix du Conseil. Vous avez vingt minutes pour me convaincre que votre présence dans notre forêt sacrée se justifie. Le temps commence maintenant. »`,
          mood: "Majesté elfique, froideur diplomatique, émerveillement et tension politique",
          music: "Harpe elfique, flûtes doubles, chœur féminin en canon, cascades d'eau en arrière-plan",
        },
        gmNotes: [
          { type: 'info', text: "Le Conseil des Branches gouverne la Sylve. Il est divisé entre isolationnistes (qui veulent fermer totalement les frontières) et interventionnistes (qui reconnaissent la menace globale). Isiel est neutre — elle écoute avant de juger." },
          { type: 'tip', text: "Le défi ici est politique, pas martial. Les joueurs doivent convaincre le Conseil de les laisser approcher l'Arbre-Monde. Chaque argument bien formulé (avec jets de compétence appropriés) fait pencher la balance d'un côté ou de l'autre. Trois succès sur cinq emportent le vote." },
          { type: 'warning', text: "Si les joueurs manquent de respect au Conseil, Isiel met fin à l'audience et les fait escorter hors de la Sylve. La mission peut continuer en mode 'infiltration' mais la difficulté augmente considérablement." },
          { type: 'secret', text: "Le siège vide du Conseil était celui de Thaelen Arc-de-Lune — le frère de Sylvaine et l'un des Gardiens. Il a disparu il y a deux semaines près du Cercle des Racines. Le Conseil cache cette information." },
          { type: 'lore', text: "Les huit sièges du Conseil représentent les huit clans elfiques de la Sylve. Le huitième clan, les Nocturnes, a été exilé il y a 200 ans pour avoir pratiqué la magie de corruption. Leur siège reste vide — mais des rumeurs disent qu'ils n'ont jamais vraiment quitté la forêt." },
        ],
        npcs: [
          {
            name: "Archère Verte Isiel",
            role: "Voix du Conseil / Dirigeante de Vaelindra",
            personality: "Brillante, pragmatique derrière une façade froide. Prend des décisions pour le bien de la Sylve, pas pour plaire. Respecte la force d'argument plus que la force des armes.",
            appearance: "Haute elfe, apparence de 40 ans (réellement 600+). Cheveux argentés coiffés en couronne tressée ornée de feuilles de chêne en argent véritable. Yeux gris-vert, perçants. Robe verte cérémonielle brodée de fils d'or en forme de racines.",
            secret: "Isiel sent l'affaiblissement du Sceau dans ses rêves. Elle voit l'Arbre-Monde mourir, nuit après nuit. Elle n'en a parlé à personne — montrer de la faiblesse devant le Conseil serait fatal à son autorité.",
            dialogues: {
              greeting: "« Vingt minutes. Pas dix-neuf, pas vingt-et-une. La Sylve a sa propre horloge et elle n'attend personne. Parlez. »",
              info: "« La forêt souffre. Oui, nous le savons. Non, nous n'avons pas besoin d'étrangers pour nous le dire. Mais peut-être... avons-nous besoin d'étrangers pour faire ce que notre fierté nous empêche de demander. »",
              quest: "« Le Cercle des Racines est interdit aux non-elfes depuis trois mille ans. Si le Conseil vote en votre faveur, ce sera une première. Vous aurez une escorte et un délai de trois jours. Pas une heure de plus. »",
              farewell: "« Le vote est rendu. Allez voir l'Arbre-Monde. Protégez-le. Et si vous le trahissez... la Sylve n'a pas besoin de soldats pour se venger. Les racines se chargeront de vous. »",
            },
            stats: { hp: 80, atk: 18, ac: 19 },
          },
          {
            name: "Conseiller Ombrefeuille",
            role: "Isolationniste / Opposition",
            personality: "Xénophobe poli, condescendant, traditionnel jusqu'à l'aveuglement. Convaincu que les non-elfes sont la source de tous les problèmes.",
            appearance: "Elfe très ancien, apparence de 70 ans (réellement 900+). Rides profondes, yeux verts pâles, presque translucides. Robe brune foncée de style archaïque. Bâton de marche en bois pétrifié.",
            secret: "Ombrefeuille a été approché par un agent du Cercle des Cendres qui lui a proposé un marché : fermer la Sylve et ne pas interférer en échange de la protection des elfes quand les Anciens se libéreront. Il n'a pas encore accepté. Mais il n'a pas refusé non plus.",
            dialogues: {
              greeting: "« Des humains. Des nains peut-être. Certainement pas des elfes. Depuis quand la Sylve est-elle une auberge ? »",
              info: "« La forêt se guérit elle-même depuis trois millénaires. Elle n'a pas besoin de l'aide de créatures qui vivent moins longtemps que nos arbrisseaux. Nous gérerons nos problèmes. Comme toujours. »",
              farewell: "« Je vote contre. Comme je voterai toujours contre l'intrusion étrangère dans nos terres sacrées. L'histoire me donnera raison. »",
            },
            stats: { hp: 45, atk: 12, ac: 14 },
          },
        ],
        skillChecks: [
          { skill: 'Persuasion', dc: 40, success: "Votre plaidoyer touche le Conseil. Deux conseillers indécis hochent la tête. Isiel note mentalement un point en votre faveur.", failure: "Vos mots glissent sur l'indifférence du Conseil comme l'eau sur la pierre. Ombrefeuille ricane doucement." },
          { skill: 'Histoire', dc: 35, success: "Vous citez le Pacte des Races signé après la chute d'Ashka — un accord d'entraide qui lie tous les peuples d'Aethelgard. Les conseillers échangent des regards. L'argument est juridiquement contraignant.", failure: "Vos connaissances historiques ne sont pas assez précises pour impressionner des elfes qui ont vécu ces événements." },
          { skill: 'Intuition', dc: 40, success: "Vous remarquez qu'Ombrefeuille tremble imperceptiblement quand le Cercle des Cendres est mentionné. Il sait quelque chose. Sa position n'est pas seulement idéologique — elle est motivée par la peur.", failure: "Le Conseil est un bloc impénétrable de neutralité elfique." },
        ],
        choices: [
          {
            id: 'choice-conseil',
            prompt: "Comment convaincre le Conseil des Branches ?",
            options: [
              {
                label: "Appel à l'alliance historique",
                description: "Invoquer le Pacte des Races et l'obligation d'entraide entre les peuples.",
                consequence: "Argument fort auprès des modérés. +1 vote en faveur. Ombrefeuille furieux mais ne peut contester la légitimité du Pacte.",
                nextScene: 'scene-2-5-3',
                reputationChange: [{ faction: 'gardiens-emeraude', amount: 5 }],
              },
              {
                label: "Montrer les preuves",
                description: "Présenter le Fragment de cristal du Sceau, le journal ashkan, et le pendentif d'Aldric.",
                consequence: "Les preuves matérielles parlent d'elles-mêmes. Isiel examine le fragment et pâlit — elle reconnaît l'énergie. +2 votes en faveur.",
                nextScene: 'scene-2-5-3',
                reputationChange: [{ faction: 'gardiens-emeraude', amount: 10 }],
              },
              {
                label: "Démasquer Ombrefeuille",
                description: "Confronter le conseiller sur son contact avec le Cercle (si détecté par Intuition).",
                consequence: "Coup de théâtre. Si les joueurs ont des preuves ou réussissent un jet d'Intimidation CD 45, Ombrefeuille est contraint d'admettre le contact. Le Conseil vote unanimement en faveur des héros. Ombrefeuille est arrêté.",
                nextScene: 'scene-2-5-3',
                skillCheck: { skill: 'Intimidation', dc: 45, success: "Ombrefeuille blêmit. Ses mains tremblent. 'Je... je n'ai rien accepté. Ils m'ont approché, c'est tout. Je...' Les gardes du Conseil l'encadrent.", failure: "Ombrefeuille rit. 'Des accusations sans preuve ? Typique des races éphémères. Cette insulte n'aide pas votre cause.' -1 vote." },
                reputationChange: [{ faction: 'gardiens-emeraude', amount: 15 }],
              },
            ],
          },
        ],
        nextScenes: ['scene-2-5-3'],
        previousScene: 'scene-2-5-1',
      },

      // --- Scène 3 : L'Arbre-Monde Malade ---
      {
        id: 'scene-2-5-3',
        sceneNumber: 3,
        title: "Les Racines du Monde",
        type: 'exploration',
        location: "Cercle des Racines, Yggdrasylve",
        locationId: 'yggdrasylve',
        estimatedMinutes: 30,
        readAloud: {
          text: `Rien ne vous avait préparés à cela.

Yggdrasylve — l'Arbre-Monde — n'est pas un arbre. C'est une montagne de vie. Son tronc fait trois cents mètres de diamètre, sa canopée se perd dans les nuages, et ses racines — visibles au-dessus du sol comme des collines à part entière — s'étendent sur des kilomètres dans toutes les directions.

Il est d'une beauté qui serre le cœur.

Et il est malade.

Le Cercle des Racines — un espace sacré où les plus grandes racines émergent de la terre — devrait être un lieu de pouvoir et de sérénité. Il l'est encore, en partie. La lumière qui filtre entre les racines est dorée et chaude. L'air vibre d'une énergie vitale palpable. Des fleurs impossibles poussent dans les crevasses de l'écorce, chacune unique, chacune d'une beauté à couper le souffle.

Mais entre les fleurs, des taches. Des zones où l'écorce est grise, fissurée, suintante d'une sève noirâtre qui sent la cendre. Des champignons noirs poussent dans les fissures — pas les champignons luminescents de la forêt saine, mais des excroissances maladives, gonflées de pus. Des racines secondaires sont mortes — sèches, cassantes, d'un blanc de cadavre.

Et au centre du Cercle, là où les racines convergent pour plonger dans la terre, un trou. Un trou dans le sol, béant, d'où monte une lueur verte familière.

La lueur du Sceau.

Un elfe est assis au bord du trou, les jambes pendantes dans le vide. Il ne bouge pas quand vous approchez. Il ne bouge pas parce qu'il ne peut pas. Des filaments noirs — comme des racines de corruption — ont poussé à travers ses bras et ses jambes, le clouant au sol.

C'est Thaelen Arc-de-Lune. Et il est en train de mourir.`,
          mood: "Beauté déchirante, corruption visible, urgence vitale",
          music: "Thème elfique en mineur, cordes tremblantes, sons de forêt déformés, battement de cœur lent et irrégulier",
        },
        gmNotes: [
          { type: 'info', text: "Thaelen a été piégé par la corruption du Sceau il y a deux semaines. Il est venu inspecter le Sceau quand les premiers signes de maladie sont apparus, et la corruption l'a attrapé. Il est conscient mais affaibli." },
          { type: 'warning', text: "Libérer Thaelen des filaments noirs nécessite un jet de Médecine CD 40 ou un sort de restauration. Couper les filaments brutalement inflige 3d6 dégâts nécrotiques à Thaelen et déclenche une vague de corruption (1d6 dégâts nécrotiques à tous dans un rayon de 3m)." },
          { type: 'tip', text: "Thaelen peut fournir des informations cruciales : le Sceau sous l'Arbre-Monde est le deuxième plus ancien. Le Cercle des Cendres n'est pas venu ici — la corruption est NATURELLE, causée par l'affaiblissement du Sceau de Sol-Aureus. Les Sceaux sont interconnectés." },
          { type: 'secret', text: "La vraie menace ici n'est pas le Cercle mais l'Arbre-Monde lui-même. Sa maladie le rend agressif — il perçoit toute créature (y compris les héros) comme une menace potentielle et envoie ses défenses naturelles contre eux. Le combat de boss de ce chapitre sera contre un Avatar de l'Arbre, pas contre des cultistes." },
          { type: 'lore', text: "Le Sceau de la Sylve a été créé en symbiose avec Yggdrasylve. L'arbre EST une partie du Sceau — ses racines forment la couche primordiale du confinement. Quand le Sceau s'affaiblit, l'arbre souffre. Et quand l'arbre souffre, la forêt entière en pâtit." },
        ],
        npcs: [
          {
            name: "Thaelen Arc-de-Lune",
            role: "Gardien d'Émeraude piégé / Source d'information",
            personality: "Courageux, stoïque malgré la douleur, pragmatique. Le jumeau de Sylvaine en plus sérieux.",
            appearance: "Elfe sylvestre, mêmes traits que Sylvaine mais masculins. Visage émacié par deux semaines de captivité. Armure de Gardien (cuir vert et écorce vivante) partiellement corrompue — l'écorce est devenue noire par endroits. Filaments noirs traversant ses bras et ses jambes, pulsant au rythme du Sceau.",
            secret: "Thaelen a vu quelque chose dans le trou pendant sa captivité — le Sceau ne contient pas un Ancien ici, mais un fragment de la conscience collective ashkan. Pas une créature mais un souvenir vivant de l'empire déchu. C'est pire d'une certaine manière.",
            dialogues: {
              greeting: "« Vous... je ne peux pas bouger. Les racines noires... elles sont dans mon sang. Aidez-moi. Mais d'abord... écoutez. C'est important. »",
              info: "« Le Sceau ne faiblit pas de l'extérieur. Il pourrit de l'intérieur. Ce qui est contenu ici n'est pas une créature — c'est une mémoire. La mémoire d'Ashka. Et les mémoires veulent être retrouvées. L'arbre absorbe cette mémoire... et elle le transforme. »",
              quest: "« L'Arbre-Monde se défend, mais il ne distingue plus amis et ennemis. Il faut descendre jusqu'au Sceau et le renforcer. Utilisez ceci — mon médaillon de Gardien. Il vous protégera des défenses de l'arbre. Partiellement. »",
              farewell: "« Dites à Sylvaine... dites-lui que je suis désolé de ne pas avoir répondu à ses messages. Et dites-lui que les arbres ont toujours raison. Elle comprendra. »",
            },
            stats: { hp: 15, atk: 0, ac: 10 },
          },
        ],
        skillChecks: [
          { skill: 'Médecine', dc: 40, success: "Vous parvenez à détacher Thaelen des filaments sans aggraver la corruption. Il est faible mais vivant. Les filaments se rétractent dans le sol en sifflant.", failure: "Les filaments résistent. Thaelen gémit de douleur. Vous devrez essayer une autre approche ou utiliser la magie." },
          { skill: 'Nature', dc: 35, success: "La corruption suit les veines d'eau souterraine — l'énergie du Sceau contamine la nappe phréatique qui alimente l'Arbre-Monde. Couper la source est impossible, mais on pourrait purifier les racines avec de la magie divine.", failure: "La maladie de l'arbre est visible mais son origine et sa propagation restent mystérieuses." },
        ],
        choices: [
          {
            id: 'choice-arbre-monde',
            prompt: "Le trou dans le sol mène au Sceau sous l'Arbre-Monde. Thaelen est libéré ou en cours de libération. Que faire ?",
            options: [
              {
                label: "Descendre immédiatement",
                description: "Le temps presse. Chaque minute passée affaiblit davantage l'Arbre-Monde.",
                consequence: "Descente vers le Sceau. L'Avatar de l'Arbre — une créature faite de racines corrompues — attaque immédiatement en percevant des intrus.",
                nextScene: 'scene-2-5-4',
              },
              {
                label: "Préparer des protections",
                description: "Utiliser le médaillon de Thaelen et la magie divine pour se protéger avant de descendre.",
                consequence: "Le médaillon de Thaelen confère une résistance aux dégâts nécrotiques pendant 1h à tout le groupe. Un jet de Religion CD 35 ajoute une bénédiction supplémentaire (+2 aux jets de sauvegarde).",
                nextScene: 'scene-2-5-4',
                skillCheck: { skill: 'Religion', dc: 35, success: "Vous invoquez la protection de Solarius et de la forêt elle-même. Une lueur dorée enveloppe le groupe. Vous êtes prêts.", failure: "Le médaillon de Thaelen fonctionne mais la bénédiction divine échoue — l'énergie de corruption interfère avec la prière." },
              },
              {
                label: "Appeler les Gardiens en renfort",
                description: "Envoyer un message à Vaelindra pour demander l'aide des Gardiens d'Émeraude.",
                consequence: "Délai de 2 heures. Deux Gardiens arrivent en renfort (alliés au combat). Mais la corruption progresse — l'Avatar sera plus puissant.",
                nextScene: 'scene-2-5-4',
              },
            ],
          },
        ],
        loot: [
          "Médaillon de Gardien d'Émeraude (résistance aux dégâts nécrotiques pendant 1h)",
          "Sève purifiée de l'Arbre-Monde (potion de soin supérieure, 4d8+4 HP)",
          "Carte des racines (indique le chemin vers le Sceau sous l'Arbre-Monde)",
        ],
        nextScenes: ['scene-2-5-4'],
        previousScene: 'scene-2-5-2',
        mapMovement: { from: 'vaelindra', to: 'yggdrasylve' },
      },

      // --- Scène 4 : L'Avatar de l'Arbre ---
      {
        id: 'scene-2-5-4',
        sceneNumber: 4,
        title: "Le Cœur Corrompu",
        type: 'combat',
        location: "Chambre racinaire du Sceau, sous Yggdrasylve",
        locationId: 'yggdrasylve',
        estimatedMinutes: 40,
        readAloud: {
          text: `La descente parmi les racines de l'Arbre-Monde est un voyage dans un monde à part.

Les racines forment un réseau de tunnels vivants — des passages qui respirent, qui pulsent, qui se contractent et se dilatent comme les artères d'un corps colossal. La sève coule dans les veines du bois comme du sang doré, illuminant le chemin d'une lumière chaude.

Mais plus vous descendez, plus la lumière dorée cède la place au vert malade. La sève devient noire. Les parois des racines se craquellent, suintant une substance poisseuse qui brûle au toucher. Des nodules de corruption — des tumeurs végétales noires et pulsantes — poussent aux intersections.

Au plus profond, une cavité naturelle s'ouvre. Le Sceau est là — un disque de lumière argentée suspendu entre les racines les plus profondes de l'Arbre-Monde, comme un joyau enchâssé dans un réseau de doigts géants. Trois chaînes de lumière le maintiennent. Toutes les trois sont intactes — mais chacune est enlacée par des filaments noirs qui s'y accrochent comme du lierre.

Et devant le Sceau, une forme se dresse.

C'est l'Arbre-Monde lui-même — ou plutôt, un avatar de sa souffrance. Trois mètres de haut, faite de racines tordues et d'écorce noircie, vaguement humanoïde, avec un visage de bois qui exprime une rage aveugle. De la sève noire coule de ses orbites comme des larmes corrompues.

L'Avatar de Yggdrasylve ne vous reconnaît pas comme des alliés.

Pour lui, vous êtes la maladie.

Les racines autour de vous se tordent et se soulèvent. Le sol tremble. L'Avatar ouvre sa bouche de bois et émet un gémissement — le son d'un arbre millénaire qui souffre.

Le combat qui suit n'est pas contre un ennemi.

C'est contre une forêt qui a peur.`,
          mood: "Tragédie épique, combat contre un allié corrompu, beauté dans la souffrance",
          music: "Orchestre dramatique avec instruments organiques, percussion de bois, chœur elfique en lamentations, crescendo naturel",
        },
        gmNotes: [
          { type: 'info', text: "L'Avatar n'est pas un ennemi à tuer — c'est un allié à guérir. L'objectif est de purifier les filaments noirs sur les chaînes du Sceau (3 filaments, chacun HP 20, CA 12, vulnérable aux dégâts radiants) PENDANT que l'Avatar attaque le groupe. Quand les 3 filaments sont détruits, l'Avatar s'apaise." },
          { type: 'warning', text: "Si les joueurs tuent l'Avatar (le réduisent à 0 HP), l'Arbre-Monde subit un choc — le Sceau s'affaiblit définitivement et la forêt commencera à mourir lentement. C'est un échec moral majeur. Encouragez les alternatives." },
          { type: 'tip', text: "Permettez des jets de Nature CD 30 ou Persuasion CD 40 pour calmer temporairement l'Avatar (il saute un tour). La musique et le chant elfique ont un effet apaisant — un barde peut imposer un désavantage aux attaques de l'Avatar pendant 2 tours avec une Performance CD 35." },
          { type: 'secret', text: "Si les héros purifient les trois filaments ET utilisent de la magie divine ou le médaillon de Thaelen sur le Sceau lui-même, le Sceau se renforce considérablement. Yggdrasylve envoie une vague de gratitude — chaque héros reçoit la Bénédiction de l'Arbre-Monde (un avantage permanent au choix : +1 HP par niveau, vision dans le noir, ou résistance au poison)." },
        ],
        encounter: {
          name: "L'Avatar de Yggdrasylve",
          enemies: [
            {
              name: "Avatar de l'Arbre-Monde",
              hp: 100,
              atk: 16,
              ac: 16,
              cr: 5,
              abilities: [
                "Fouet de Racines : Portée 5m, +16 au toucher, 2d10+4 dégâts contondants. La cible est agrippée (évasion CD 35).",
                "Cri de la Forêt (Recharge 5-6) : Toutes les créatures dans la chambre, jet de Sagesse CD 35. Échec : la tristesse de l'arbre vous submerge, vous êtes incapacité pendant 1 tour (trop triste pour agir).",
                "Régénération Racinaire : Récupère 10 HP par tour tant qu'au moins un filament de corruption est intact.",
                "Éruption de Racines (1/combat) : Le sol explose. Toutes les créatures dans un rayon de 5m : 3d8 dégâts contondants, Sauvegarde Dextérité CD 35 pour moitié. Crée du terrain difficile.",
                "Vulnérabilité : Les dégâts de feu infligent des dégâts doubles mais augmentent la rage de l'Avatar (+2 ATK pendant 2 tours). Les dégâts radiants l'apaisent (-2 ATK pendant 1 tour).",
              ],
            },
            {
              name: "Filament de Corruption",
              hp: 20,
              atk: 8,
              ac: 12,
              cr: 1,
              abilities: [
                "Drain nécrotique (automatique) : Chaque filament intact draine 5 HP du Sceau par tour. Si les trois sont actifs pendant 10 tours, le Sceau cède.",
                "Riposte : Quand un filament est détruit, il explose en énergie nécrotique — 2d6 dégâts nécrotiques à tous dans un rayon de 2m.",
                "Vulnérable aux dégâts radiants (dégâts triplés).",
              ],
            },
          ],
          terrain: [
            "Réseau de racines (terrain difficile dans toute la chambre, sauf les passages principaux)",
            "Plaques de sève dorée (zones de 2m de diamètre qui soignent 1d4 HP par tour si on y reste debout)",
            "Filaments de corruption (3 excroissances noires enlacées autour des chaînes du Sceau, à des positions différentes dans la chambre)",
            "Le Sceau lui-même (zone de lumière argentée, les morts-vivants et la magie noire y sont supprimés)",
          ],
          tactics: "L'Avatar charge le personnage le plus proche et utilise ses fouets de racines pour agripper et éloigner les héros des filaments. Il utilise Cri de la Forêt si plus de 2 personnages sont près d'un filament. L'Avatar ne poursuit pas les personnages qui fuient — il protège les filaments (qu'il perçoit à tort comme ses propres racines). Stratégie optimale : diviser le groupe, certains distraient l'Avatar pendant que les autres détruisent les filaments.",
          loot: [
            "Cœur de Sève Dorée (gemme vivante, composant d'artefact, valeur 500 po)",
            "Branche de l'Arbre-Monde (bois enchanté pour bâton ou arc, +1 aux dégâts de sorts naturels)",
            "Bénédiction de Yggdrasylve (récompense si purification réussie, choix permanent par héros)",
          ],
        },
        choices: [
          {
            id: 'choice-apres-arbre',
            prompt: "Le Sceau est renforcé et l'Avatar apaisé. La Sylve commence à guérir. Quelle est la prochaine étape ?",
            options: [
              {
                label: "Retourner à Vaelindra et planifier",
                description: "Faire un rapport au Conseil et préparer le prochain voyage.",
                consequence: "Le Conseil, reconnaissant, offre une alliance formelle et des ressources pour le voyage suivant. Repos complet et approvisionnement.",
                nextScene: 'scene-2-6-1',
                reputationChange: [{ faction: 'gardiens-emeraude', amount: 20 }],
              },
              {
                label: "Partir directement vers les Cités Libres",
                description: "Le temps presse — direction la côte pour enquêter sur les ruines sous-marines.",
                consequence: "Départ immédiat. Pas de repos complet mais avantage de temps — le Cercle n'a pas encore atteint la côte.",
                nextScene: 'scene-2-6-1',
              },
              {
                label: "Explorer les tunnels racinaires",
                description: "Les racines de l'Arbre-Monde forment un réseau qui connecte toute la forêt. Peut-être mènent-elles à d'autres Sceaux.",
                consequence: "Découverte d'un passage racinaire qui s'étend vers le sud-est, vers la côte. Raccourci naturel qui réduit le temps de voyage de moitié. Mais le passage est étroit et inhabité — pas de repos possible.",
                nextScene: 'scene-2-6-1',
              },
            ],
          },
        ],
        loot: [
          "Cœur de Sève Dorée",
          "Branche de l'Arbre-Monde",
          "Bénédiction de Yggdrasylve",
        ],
        nextScenes: ['scene-2-6-1'],
        previousScene: 'scene-2-5-3',
      },
    ],
    chapterConclusion: {
      text: `L'Arbre-Monde respire de nouveau.

La corruption recule, lentement mais sûrement, chassée par la lumière renouvelée du Sceau. Les racines noircies redeviennent brunes, puis dorées. Les champignons malades se flétrissent et tombent. Des pousses vertes percent la terre corrompue — les premiers signes d'une guérison qui prendra des mois mais qui est, enfin, possible.

Les elfes de la Sylve vous regardent différemment. Pas comme des étrangers — comme des alliés. Peut-être même comme des amis, pour ceux d'entre eux capables d'employer ce mot envers des non-elfes.

Thaelen Arc-de-Lune, soigné par les guérisseurs elfiques, lève une main affaiblie en guise de salut quand vous partez.

Sylvaine est à la lisière. Elle ne dit pas au revoir — elle dit « à bientôt ».

Derrière vous, la Sylve d'Émeraude se referme comme une mère protégeant ses enfants.

Devant vous, la route continue. Vers la côte. Vers les Cités Libres. Vers le prochain Sceau.

Le pendentif d'Aldric pulse doucement à votre cou. Quatre gemmes brillent encore.

Pour combien de temps ?`,
      mood: "Espoir mesuré, beauté retrouvée, conscience de la route à parcourir",
      music: "Thème elfique en majeur, flûte et harpe, transition vers un thème de voyage maritime",
    },
    rewards: { xp: 1200, gold: "400-600 po", items: ["Cœur de Sève Dorée", "Branche de l'Arbre-Monde", "Bénédiction de Yggdrasylve", "Alliance formelle des Gardiens d'Émeraude"] },
  },

  // -------------------------------------------------------------------------
  // CHAPITRE 6 : LES CITÉS LIBRES
  // -------------------------------------------------------------------------
  {
    id: 'ch-2-6',
    actNumber: 2,
    chapterNumber: 6,
    title: "Les Cités Libres",
    subtitle: "Là où l'or parle plus fort que les épées",
    summary: "Les héros atteignent les Cités Libres de la Côte des Orages — un archipel de villes portuaires indépendantes gouvernées par les guildes marchandes. Entre intrigues politiques, guildes de marchands corrompues, pirates, et ruines sous-marines mystérieuses, ils doivent rassembler des renseignements sur les opérations du Cercle des Cendres dans la région tout en survivant à un monde où tout se vend et s'achète — y compris la loyauté.",
    levelRange: "5-6",
    themes: ['intrigue politique', 'commerce et corruption', 'piraterie', 'ruines marines'],
    chapterIntro: {
      text: `La route de la Sylve à la côte traverse des collines balayées par un vent salé qui porte l'odeur de la mer bien avant qu'on ne l'aperçoive. Et quand on l'aperçoit, c'est un choc.

La Côte des Orages porte bien son nom. Des falaises de basalte noir plongent dans une mer gris-bleu perpétuellement agitée. Des vagues hautes de trois mètres se brisent sur les rochers avec une violence qui fait trembler le sol. Au-dessus, un ciel de plomb d'où la foudre frappe si souvent que les arbres de la côte poussent penchés, comme s'ils essayaient de fuir.

Et au milieu de ce chaos, comme des défis lancés à la nature elle-même, les Cités Libres.

Cinq villes portuaires construites dans les baies protégées de la côte, reliées par des routes commerciales maritimes et une rivalité féroce. Chacune gouvernée par un Conseil de Marchands, chacune avec ses propres lois, ses propres monnaies, et ses propres secrets.

La plus grande — Port-Orage — se dresse devant vous comme une mâchoire ouverte. Ses quais s'étendent sur deux kilomètres, hérissés de mâts et de grues. Ses entrepôts débordent de marchandises de tout le continent. Ses rues grouillent de marchands, de marins, de voleurs, d'espions et de tout ce qui existe entre ces catégories.

Un panneau à l'entrée du port résume la philosophie locale :

« À Port-Orage, tout est à vendre. Sauf nos libertés. Celles-là sont hors de prix. »`,
      mood: "Énergie chaotique, opportunité et danger, monde de gris moral",
      music: "Thème portuaire énergique, accordéon et violon de taverne, cris de mouettes, bruit de vagues et de chaînes d'ancre",
    },
    scenes: [
      // --- Scène 1 : Port-Orage ---
      {
        id: 'scene-2-6-1',
        sceneNumber: 1,
        title: "Le Marché des Murmures",
        type: 'social',
        location: "Port-Orage, Cités Libres",
        locationId: 'port-orage',
        estimatedMinutes: 30,
        readAloud: {
          text: `Port-Orage est un assaut sensoriel.

Les quais sont un labyrinthe de caisses empilées, de filets suspendus et de marins qui jurent dans sept langues différentes. L'odeur est un mélange improbable de poisson frais, d'épices exotiques, de goudron et de sel. Des mouettes se battent pour les restes d'un repas de marin, leurs cris couvrant à peine le brouhaha des négociations qui se tiennent à chaque coin de quai.

Plus loin, le Marché des Murmures — le cœur commercial de la cité — occupe une place immense bordée de bâtiments à colombages dont les étages supérieurs se penchent au-dessus de la rue comme des spectateurs au-dessus d'une arène. Des centaines d'étals s'alignent sous des toiles multicolores, vendant de tout : armes, armures, potions, parchemins, curiosités, antiquités, et des choses dont vous ne voulez probablement pas connaître l'origine.

Au centre du marché, une fontaine représentant un kraken enlacé avec un navire sert de point de repère. L'eau qui en jaillit est teintée de cuivre — les marchands y jettent des pièces pour la chance, et un réseau de gamins surveille la fontaine comme des faucons pour récupérer l'or des naïfs.

Vous êtes à peine arrivés qu'un homme en costume extravagant — veste rouge, chapeau à plume, moustache cirée — s'approche avec un sourire qui brille autant que ses bagues.

« Nouveaux en ville ? Excellent ! Je suis Prospero, courtier en tout et n'importe quoi. Informations, contacts, marchandises, protection, alibi — si ça existe, je peux vous le trouver. Premier renseignement gratuit. Les suivants coûtent de l'or, du charme ou des faveurs. Que puis-je pour vous, estimés voyageurs ? »`,
          mood: "Vitalité débordante, opportunisme joyeux, danger caché sous le vernis commercial",
          music: "Musique portuaire animée, accordéon, tambourins, bruits de marché, cloches de navires",
        },
        gmNotes: [
          { type: 'info', text: "Port-Orage est un hub d'information. Les joueurs cherchent des renseignements sur le Cercle des Cendres et les ruines sous-marines. Prospero est un courtier fiable mais cher — il connaît tout le monde et vend des informations au plus offrant." },
          { type: 'tip', text: "Trois pistes disponibles : 1) La Guilde des Plongeurs connaît les ruines sous-marines. 2) Le Capitaine Tempesta, pirate et archéologue amateur, a des cartes des fonds marins. 3) Le Bureau des Ombres (branche locale du Syndicat) surveille les activités du Cercle." },
          { type: 'warning', text: "Le Cercle des Cendres a des agents à Port-Orage. Un informateur, Séraphine la Dorée, se fait passer pour une marchande d'antiquités. Si les joueurs posent trop de questions ouvertement sur le Cercle, elle les identifie et rapporte leur présence." },
          { type: 'secret', text: "Prospero travaille pour trois factions simultanément et ne voit aucune contradiction. Il vendra les informations des joueurs au Cercle si c'est profitable — sauf si les joueurs lui offrent quelque chose de plus précieux que de l'or : un secret sur le Conseil des Marchands." },
          { type: 'lore', text: "Les Cités Libres se sont déclarées indépendantes il y a 200 ans, après la chute d'Ashka. Elles ne reconnaissent aucun roi, aucune guilde et aucun temple comme autorité suprême. Seul le profit gouverne. Cette liberté absolue attire le meilleur et le pire de chaque nation." },
        ],
        npcs: [
          {
            name: "Prospero",
            role: "Courtier en informations / Guide de la ville",
            personality: "Théâtral, charmant, moralement flexible. Loyal à son compte en banque. Mais étonnamment honnête dans ses transactions — sa réputation est son capital.",
            appearance: "Humain, la trentaine, costume rouge vif orné de broderies dorées. Chapeau à large bord avec plume de paon. Moustache cirée en pointes. Bagues à chaque doigt. Sourire permanent qui ne touche jamais ses yeux, lesquels sont d'un brun calculateur.",
            secret: "Prospero est en réalité le troisième fils banni du Seigneur Marchand Valerio. Il a été déshérité pour avoir volé un secret commercial de son père. Il connaît les tunnels sous le palais du Conseil et les utilise pour espionner.",
            dialogues: {
              greeting: "« Ah, le destin est un excellent agent commercial ! Il m'envoie exactement les clients dont j'avais besoin. Prospero, pour vous servir. Ou pour me servir, selon le prix. »",
              info: "« Le Cercle des Cendres ? Oui, je connais ce nom. Il circule dans certains cercles — pardonnez le jeu de mots. Ils achètent des artefacts anciens, recrutent des plongeurs, et dépensent beaucoup d'or sans en gagner. Ce qui veut dire qu'ils ont un mécène très riche. Ou très désespéré. »",
              quest: "« Vous voulez accéder aux ruines sous-marines ? Mmm. Trois options. La Guilde des Plongeurs — officiels, lents, chers. Le Capitaine Tempesta — rapide, dangereuse, imprévisible. Ou moi — je connais quelqu'un qui connaît quelqu'un qui a un sous-marin. Oui, un sous-marin. Gnome. Ne demandez pas. »",
              farewell: "« N'hésitez pas à revenir. Mon bureau est partout et nulle part. Demandez Prospero dans n'importe quelle taverne — et si quelqu'un nie me connaître, c'est que vous avez trouvé la bonne taverne. »",
            },
          },
          {
            name: "Capitaine Tempesta",
            role: "Pirate archéologue / Alliée potentielle",
            personality: "Intrépide, passionnée par l'histoire, méprise l'autorité. Code d'honneur personnel strict mais peu compatible avec la loi.",
            appearance: "Humaine, la quarantaine, peau tannée par le soleil et le sel. Cheveux noirs toujours mouillés, comme si elle sortait constamment de l'eau. Cicatrice en forme d'éclair sur la joue gauche. Manteau de cuir de requin, bottes de plongeuse, cutlass à la hanche et lunettes de plongée autour du cou.",
            secret: "Tempesta a découvert l'entrée des ruines sous-marines il y a six mois. Elle y a plongé seule et a trouvé quelque chose qui l'a terrifiée — des sculptures sur les murs montrant des créatures identiques au Vorace du Seuil. Elle n'est pas retournée depuis, mais elle y pense chaque nuit.",
            dialogues: {
              greeting: "« Vous avez la tête de gens qui cherchent des ennuis sous l'eau. Ça tombe bien, c'est ma spécialité. Tempesta. Pas besoin de nom de famille quand on a un nom pareil. »",
              info: "« Les ruines sont à deux lieues de la côte, par vingt brasses de fond. Construction ancienne — pas humaine, pas elfique, pas naine. Quelque chose de plus vieux. Les murs sont couverts de runes qui brillent dans le noir. Et les poissons évitent l'endroit. Quand les poissons ont peur, moi aussi. »",
              quest: "« Je vous y emmène pour 200 pièces d'or et une part du butin. Et une condition : si on trouve quelque chose de trop dangereux, on remonte. J'ai perdu assez d'équipage dans ma carrière pour savoir quand la mer dit 'non'. »",
              farewell: "« Rendez-vous à l'aube au quai sept. Marée basse. Si vous êtes en retard, je pars sans vous. La mer n'attend personne et moi non plus. »",
            },
            stats: { hp: 55, atk: 15, ac: 16 },
          },
        ],
        skillChecks: [
          { skill: 'Perception', dc: 35, success: "Dans la foule du marché, vous repérez une femme qui vous observe depuis un étal d'antiquités. Quand vos regards se croisent, elle sourit et détourne les yeux. Trop naturellement.", failure: "Le marché est un chaos de stimuli. Impossible de distinguer qui observe qui dans cette fourmilière." },
          { skill: 'Tromperie', dc: 35, success: "Vous parvenez à poser des questions sur le Cercle sans éveiller les soupçons, en vous faisant passer pour des marchands d'artefacts intéressés par l'histoire ashkan.", failure: "Vos questions attirent l'attention. Plusieurs regards se tournent vers vous, et quelqu'un quitte le marché précipitamment." },
        ],
        choices: [
          {
            id: 'choice-port-orage',
            prompt: "Les héros ont identifié trois pistes à Port-Orage. Laquelle suivre en priorité ?",
            options: [
              {
                label: "La Guilde des Plongeurs",
                description: "Approche officielle pour accéder aux ruines sous-marines.",
                consequence: "La Guilde exige un permis (100 po) et impose un guide officiel. Accès légal mais le Cercle sera prévenu de l'expédition via ses contacts dans la bureaucratie de la Guilde.",
                nextScene: 'scene-2-6-2',
              },
              {
                label: "Le Capitaine Tempesta",
                description: "Approche non-officielle, rapide et risquée.",
                consequence: "200 po et une part du butin. Pas de bureaucratie, pas de fuite d'information. Mais Tempesta prend des risques et son navire, le Tonnerre, a connu des jours meilleurs.",
                nextScene: 'scene-2-6-2',
              },
              {
                label: "Le Bureau des Ombres",
                description: "Chercher le Syndicat local pour des renseignements sur le Cercle des Cendres.",
                consequence: "Piste d'espionnage. Le Bureau des Ombres sait que le Cercle a un entrepôt secret au port. L'infiltrer révélerait leurs plans pour les ruines. Mais le Syndicat ne donne rien gratuitement — ils veulent un service en retour.",
                nextScene: 'scene-2-6-2',
              },
            ],
          },
        ],
        nextScenes: ['scene-2-6-2'],
        previousScene: 'scene-2-5-4',
        mapMovement: { from: 'sylve-emeraude', to: 'port-orage' },
      },

      // --- Scène 2 : L'Entrepôt du Cercle ---
      {
        id: 'scene-2-6-2',
        sceneNumber: 2,
        title: "Ombres sur les Quais",
        type: 'exploration',
        location: "Quartier des Entrepôts, Port-Orage",
        locationId: 'port-orage',
        estimatedMinutes: 30,
        readAloud: {
          text: `La nuit tombe sur Port-Orage comme un rideau de velours humide. Les lanternes des rues s'allument une à une, tremblotantes dans le vent marin, projetant des ombres longues entre les bâtiments des quais.

Le quartier des entrepôts est un dédale de hangars massifs, de grues rouillées et de montagnes de caisses empilées. La nuit, il se vide — les dockers rentrent chez eux, les gardes patrouillent au ralenti, et seuls les rats et les contrebandiers restent actifs.

L'entrepôt 17 — identifié par votre source comme la base locale du Cercle des Cendres — se distingue à peine de ses voisins. Un hangar en bois de deux étages, porte en fer rouillé, fenêtres condamnées avec des planches. Un garde en vêtements de marin s'appuie contre le mur, feignant l'ennui. Ses yeux balaient la rue avec une précision militaire.

Derrière l'entrepôt, le quai donne directement sur la mer. Un petit bateau y est amarré — un sloop rapide, peint en noir, sans nom ni pavillon. Prêt à fuir au moindre signe de danger.

L'air sent le goudron, le sel, et quelque chose d'autre. Une odeur qui vous est devenue familière dans les catacombes de Sol-Aureus.

De la cendre.`,
          mood: "Tension nocturne, opération d'infiltration, danger imminent",
          music: "Percussions feutrées, contrebasse, vent marin, grincements de bois et de métal",
        },
        gmNotes: [
          { type: 'info', text: "L'entrepôt 17 est un poste d'opération du Cercle des Cendres. À l'intérieur : 4 agents, des caisses d'artefacts ashkans récupérés des ruines sous-marines, et des cartes détaillées des fonds marins. Le leader local est absent — parti plonger aux ruines." },
          { type: 'tip', text: "Plusieurs approches possibles : infiltration discrète (Discrétion), force brute (combat), diversion (créer un incident sur les quais), ou subterfuge (se faire passer pour des livraison du Cercle). Chaque approche a ses avantages et ses risques." },
          { type: 'warning', text: "Si l'alerte est donnée, le sloop noir fuit avec les documents les plus importants. Un agent à bord a une boule de feu ashkan (3d6 dégâts de feu, portée 30m) qu'il lancera pour couvrir la fuite." },
          { type: 'secret', text: "Parmi les documents dans l'entrepôt : une lettre du Haut Cercle ordonnant de localiser le 'Sceau Marin' et de préparer un rituel de brisure sous-marin. La lettre mentionne un nom — 'L'Architecte' — comme commanditaire principal. C'est la première mention de ce personnage qui sera le grand antagoniste de la campagne." },
        ],
        skillChecks: [
          { skill: 'Discrétion', dc: 35, success: "Vous contournez le garde et trouvez une fenêtre mal condamnée sur le côté est. En retirant deux planches, vous pouvez vous glisser à l'intérieur.", failure: "Une planche craque sous votre pied. Le garde se redresse. 'Qui est là ?' Vous avez trois secondes pour réagir." },
          { skill: 'Crochetage', dc: 40, success: "La serrure de la porte arrière cède silencieusement. L'intérieur est faiblement éclairé par des lanternes sourdes.", failure: "La serrure résiste. Vos outils font un bruit métallique dans le silence de la nuit." },
          { skill: 'Investigation', dc: 30, success: "En fouillant les caisses, vous trouvez des artefacts ashkans soigneusement emballés, des cartes sous-marines annotées en ashkan archaïque, et une lettre scellée portant le symbole du Cercle.", failure: "Des caisses et des caisses de matériel. Difficile de distinguer ce qui est important sans plus de temps." },
        ],
        choices: [
          {
            id: 'choice-entrepot',
            prompt: "Comment les héros gèrent-ils l'entrepôt du Cercle ?",
            options: [
              {
                label: "Infiltration silencieuse",
                description: "Entrer, récupérer les documents, ressortir sans être vus.",
                consequence: "Discrétion CD 35. Succès : tous les documents récupérés, le Cercle ne sait pas qu'ils ont été compromis. Avantage stratégique majeur. Échec : combat à l'intérieur de l'entrepôt.",
                nextScene: 'scene-2-6-3',
                skillCheck: { skill: 'Discrétion', dc: 35, success: "Comme des ombres, vous entrez, copiez les cartes et récupérez la lettre. Les agents du Cercle ne se sont rendu compte de rien.", failure: "Un agent sort d'une pièce annexe et vous voit. 'INTRUS !' hurle-t-il en dégainant une lame enflammée." },
              },
              {
                label: "Assaut direct",
                description: "Éliminer les agents et saisir tout le contenu de l'entrepôt.",
                consequence: "Combat contre 4 agents du Cercle. Le sloop fuit avec un agent et quelques documents. Mais le gros des preuves est récupéré.",
                nextScene: 'scene-2-6-3',
              },
              {
                label: "Piéger et surveiller",
                description: "Marquer l'entrepôt et le sloop, puis suivre les agents jusqu'aux ruines.",
                consequence: "Discrétion CD 30 pour placer des marqueurs sans être vu. Les agents mènent droit aux ruines le lendemain. Avantage : arrivée avec eux. Risque : être découverts pendant le trajet.",
                nextScene: 'scene-2-6-3',
                skillCheck: { skill: 'Discrétion', dc: 30, success: "Des marqueurs arcaniques ou des balises de pistage sont placés sans accroc. Demain, vous les suivrez.", failure: "Le garde remarque quelque chose d'inhabituel sur le sloop. L'alerte est donnée." },
              },
            ],
          },
        ],
        encounter: {
          name: "Agents du Cercle à l'Entrepôt (si combat)",
          enemies: [
            {
              name: "Agent du Cercle des Cendres",
              hp: 35,
              atk: 13,
              ac: 14,
              cr: 2,
              abilities: [
                "Lame de braise : +13 au toucher, 1d8+4 dégâts tranchants + 1d4 dégâts de feu.",
                "Écran de cendre (1/combat) : Crée un nuage de cendre de 3m de rayon. Tous les personnages à l'intérieur sont aveuglés pendant 1 tour.",
              ],
            },
          ],
          terrain: [
            "Caisses empilées (couverture, certaines contiennent des liquides inflammables)",
            "Espace étroit entre les rangées (limité à 2 combattants de front)",
            "Étage supérieur accessible par un escalier (position surélevée, +2 aux attaques à distance)",
            "Porte arrière menant au quai et au sloop (voie de fuite ou de poursuite)",
          ],
          tactics: "Les agents combattent en binôme : deux au corps à corps, deux à distance depuis l'étage. Si deux tombent, les survivants fuient vers le sloop. L'un d'eux a ordre de brûler les documents sensibles si la situation est perdue (action de 1 tour avec une torche).",
          loot: [
            "Cartes des fonds marins annotées (localisation exacte des ruines)",
            "Lettre du Haut Cercle mentionnant 'L'Architecte' et le Sceau Marin",
            "4 potions de respiration aquatique (1h chacune)",
            "250 pièces d'or en fonds opérationnels",
            "Masque de cendre de grade intermédiaire (permet de comprendre l'ashkan archaïque écrit)",
          ],
        },
        loot: [
          "Cartes des fonds marins annotées",
          "Lettre du Haut Cercle",
          "Potions de respiration aquatique (x4)",
          "Masque de cendre intermédiaire",
        ],
        nextScenes: ['scene-2-6-3'],
        previousScene: 'scene-2-6-1',
      },

      // --- Scène 3 : La Cour du Seigneur Marchand ---
      {
        id: 'scene-2-6-3',
        sceneNumber: 3,
        title: "Le Bal des Requins",
        type: 'social',
        location: "Palais du Conseil des Marchands, Port-Orage",
        locationId: 'port-orage',
        estimatedMinutes: 30,
        readAloud: {
          text: `Le Palais du Conseil des Marchands est la preuve vivante qu'avec assez d'argent, on peut construire n'importe quoi n'importe où — y compris un manoir de style impérial sur une falaise battue par les tempêtes.

L'édifice domine le port depuis un promontoire de basalte, ses murs de marbre blanc et gris tachés par le sel mais toujours imposants. Des colonnes corinthiennes encadrent l'entrée, ornées de bas-reliefs représentant des scènes de commerce plutôt que de bataille — des navires, des poignées de main, des coffres débordants d'or. Le message est clair : ici, la richesse est la seule divinité.

Ce soir, le Conseil organise un gala en l'honneur de la Foire du Solstice. La salle de bal est un aquarium de pouvoir : des marchands en soie et en velours circulent entre les buffets chargés de mets exotiques, échangeant des compliments aussi sincères que des pièces en plomb. Des musiciens jouent une valse élégante que personne n'écoute vraiment.

Vous avez été invités — ou vous vous êtes invités — et vous naviguez maintenant dans les eaux les plus dangereuses de Port-Orage : la haute société marchande.

Un serveur vous tend une coupe de vin pétillant.

« Le Seigneur Marchand Valerio vous attend sur la terrasse, » murmure-t-il. « Et entre nous, refusez le homard. Le chef est nouveau. »`,
          mood: "Élégance empoisonnée, danger social, chaque mot est une lame",
          music: "Orchestre de chambre, valse élégante, tintement de verres, conversations feutrées",
        },
        gmNotes: [
          { type: 'info', text: "Le gala est une opportunité de rassembler des renseignements et de nouer des alliances. Trois personnages clés : le Seigneur Marchand Valerio (qui veut utiliser les héros pour ses propres fins), Séraphine la Dorée (agent infiltré du Cercle), et Amiral Korvo (chef des gardes-côtes, potentiel allié militaire)." },
          { type: 'tip', text: "Encouragez le jeu de rôle social. Chaque conversation est un mini-duel d'informations. Les joueurs doivent donner pour recevoir. Les jets de Persuasion, Tromperie et Intuition seront fréquents." },
          { type: 'warning', text: "Séraphine tente d'approcher les héros sous le prétexte de leur vendre des antiquités. Elle cherche à déterminer ce qu'ils savent sur les ruines. Si les héros révèlent trop, le Cercle lance une opération d'urgence sur les ruines cette nuit même." },
          { type: 'secret', text: "Valerio sait que le Cercle opère depuis Port-Orage mais le tolère parce qu'ils paient des taxes et achètent en quantité. Si les héros lui présentent des preuves que le Cercle menace la stabilité des Cités Libres (la lettre de l'entrepôt), il changera de position et offrira un soutien naval." },
        ],
        npcs: [
          {
            name: "Seigneur Marchand Valerio",
            role: "Chef du Conseil des Marchands / Homme de pouvoir",
            personality: "Intelligent, pragmatique, amoral. Chaque interaction est une transaction. Respecte ceux qui jouent bien le jeu.",
            appearance: "Humain, la cinquantaine, corpulent mais pas obèse — la corpulence d'un homme puissant, pas paresseux. Costume bleu marine brodé d'ancres d'argent. Bagues ornées de pierres marines. Regard de requin — amical en surface, calculateur en profondeur.",
            secret: "Son fils cadet, Marco, est secrètement membre du Cercle des Cendres. Valerio l'ignore. Apprendre la vérité serait dévastateur — et pourrait soit le pousser contre le Cercle par vengeance, soit le briser.",
            dialogues: {
              greeting: "« Mes invités d'honneur ! J'ai entendu parler de vos exploits à Sol-Aureus. Les bonnes histoires voyagent vite — surtout quand elles impliquent des héros et des monstres. Excellent pour les affaires touristiques. »",
              info: "« Le Cercle des Cendres ? Des clients comme les autres. Ils achètent, ils paient, ils ne font pas de vagues. C'est tout ce que je demande à quiconque opère dans mes cités. Tant que l'or coule et que les lois du commerce sont respectées... »",
              quest: "« Cependant... si vous aviez des preuves que ces 'clients' préparent quelque chose qui pourrait perturber le commerce — une catastrophe maritime, par exemple — alors mon calcul changerait. Les cataclysmes sont mauvais pour les affaires. Montrez-moi quelque chose de concret, et nous parlerons. »",
              farewell: "« Profitez du gala. Les huîtres sont excellentes — elles viennent de mes propres parcs. Et n'hésitez pas à danser. Dans cette salle, les danses politiques sont obligatoires, mais les vraies danses sont optionnelles et bien plus agréables. »",
            },
            stats: { hp: 30, atk: 6, ac: 12 },
          },
          {
            name: "Séraphine la Dorée",
            role: "Agent du Cercle déguisée en marchande d'antiquités",
            personality: "Séduisante, cultivée, manipulatrice de génie. Chaque sourire est un piège, chaque compliment est un hameçon.",
            appearance: "Humaine, la trentaine, d'une beauté classique délibérément mise en valeur. Robe dorée moulante, bijoux d'ambre et d'obsidienne. Cheveux blonds coiffés en chignon complexe. Un parfum de jasmin et de fumée qui laisse une impression durable.",
            secret: "Séraphine est l'une des 'Voix' du Cercle — un agent de haut rang spécialisé dans l'infiltration sociale. Elle a personnellement recruté trois membres du Conseil des Marchands. Son vrai nom est Ashara Vex.",
            dialogues: {
              greeting: "« Enchantée. Séraphine Doravale, marchande d'antiquités et collectionneuse passionnée. On me dit que vous avez un goût prononcé pour l'aventure. C'est si rare de nos jours, et tellement... séduisant. »",
              info: "« L'histoire ancienne est ma passion. Les artefacts ashkans, en particulier — mal compris, injustement craints. L'Hégémonie n'était pas que ténèbres, vous savez. C'était aussi de l'art, de la science, de la philosophie. Nous avons beaucoup à apprendre d'eux. »",
              farewell: "« J'espère que nous nous reverrons. Les gens intéressants sont si rares à Port-Orage. Prenez ma carte — si vous trouvez des antiquités lors de vos... explorations... je suis toujours acheteuse. »",
            },
            stats: { hp: 45, atk: 14, ac: 15 },
          },
          {
            name: "Amiral Korvo",
            role: "Chef des gardes-côtes / Allié militaire potentiel",
            personality: "Droit, bourru, patriote des Cités Libres. Méprise la corruption mais tolère la politique par nécessité. Un militaire dans un monde de marchands.",
            appearance: "Humain, la cinquantaine, tanné et buriné par trente ans de mer. Uniforme naval noir impeccable, épée de cérémonie au côté. Cheveux gris coupés court, barbe soignée. Mains de marin — larges, calleuses, fermes.",
            secret: "Korvo a perdu un navire patrouilleur près des ruines sous-marines il y a deux mois — disparu avec tout son équipage. Officiellement : naufrage lors d'une tempête. Officieusement : il sait que quelque chose a attaqué le navire par en dessous.",
            dialogues: {
              greeting: "« Pas de discours. Pas de politique. Dites-moi ce que vous savez sur ce qui se passe dans mes eaux et je vous dirai ce que moi je sais. Marché ? »",
              info: "« J'ai perdu le Vigilant il y a deux mois. Vingt-trois marins. Le Conseil dit 'tempête'. Moi je dis qu'aucune tempête ne laisse des traces de griffures sur une coque en chêne de six pouces. Quelque chose vit là-dessous. Et je veux savoir quoi. »",
              quest: "« Si vous plongez vers ces ruines, je peux vous fournir un navire d'escorte et un équipage de marins aguerris. En échange, vous me rapportez ce que vous trouvez là en bas. Tout. Pas de secrets. Mon peuple est en danger et j'ai besoin de réponses. »",
              farewell: "« Bonne chance là-dessous. Et si vous voyez mes marins du Vigilant... ramenez-les chez eux. Morts ou vifs, ils méritent de rentrer au port. »",
            },
            stats: { hp: 60, atk: 14, ac: 17 },
          },
        ],
        skillChecks: [
          { skill: 'Intuition', dc: 40, success: "Séraphine est dangereuse. Chaque question qu'elle pose est calibrée pour extraire de l'information. Sa curiosité pour vos 'explorations' n'est pas celle d'une marchande — c'est celle d'un prédateur.", failure: "Séraphine semble être une marchande charmante avec un intérêt sincère pour l'histoire ancienne." },
          { skill: 'Persuasion', dc: 35, success: "Valerio est convaincu par vos preuves. 'Par les tempêtes... ce n'est plus du commerce, c'est de la subversion. Vous avez mon soutien. Et mes navires.' ", failure: "Valerio reste sceptique. 'Des lettres et des artefacts ne suffisent pas. Apportez-moi un témoin, et nous parlerons.' " },
        ],
        choices: [
          {
            id: 'choice-gala',
            prompt: "Le gala offre plusieurs opportunités simultanées. Que priorisent les héros ?",
            options: [
              {
                label: "Convaincre Valerio",
                description: "Présenter les preuves au Seigneur Marchand pour obtenir son soutien.",
                consequence: "Si les héros ont la lettre de l'entrepôt, Persuasion CD 35 pour convaincre. Succès : soutien naval et ressources. Échec : Valerio reste neutre mais ne s'oppose pas.",
                nextScene: 'scene-2-6-4',
                reputationChange: [{ faction: 'cites-libres', amount: 10 }],
              },
              {
                label: "Piéger Séraphine",
                description: "Retourner la manipulation contre elle pour obtenir des informations sur le Cercle.",
                consequence: "Tromperie CD 45 pour la piéger. Succès : elle révèle (involontairement) la localisation exacte du rituel sous-marin prévu. Échec : elle comprend que vous la testez et disparaît dans la nuit — le Cercle est prévenu.",
                nextScene: 'scene-2-6-4',
                skillCheck: { skill: 'Tromperie', dc: 45, success: "En jouant la carte de l'avidité — « Nous avons trouvé un artefact qui vaut une fortune » — Séraphine laisse échapper : 'Le Cercle paierait dix fois votre prix. La pleine lune, aux coordonnées du Pilier Noyé.' Elle réalise son erreur une seconde trop tard.", failure: "Le sourire de Séraphine se fige. 'Vous êtes plus intéressants que je ne le pensais. Mais pas assez subtils.' Elle disparaît dans la foule du gala." },
              },
              {
                label: "Alliance avec Korvo",
                description: "Proposer une mission conjointe avec les gardes-côtes.",
                consequence: "Korvo accepte sans hésitation si les héros mentionnent les créatures sous-marines. Un navire de guerre et 20 marins sont mis à disposition. Alliance militaire forte mais bruyante — le Cercle saura que les héros ont du renfort.",
                nextScene: 'scene-2-6-4',
                reputationChange: [{ faction: 'cites-libres', amount: 15 }],
              },
            ],
          },
        ],
        nextScenes: ['scene-2-6-4'],
        previousScene: 'scene-2-6-2',
      },

      // --- Scène 4 : Le Pilier Noyé ---
      {
        id: 'scene-2-6-4',
        sceneNumber: 4,
        title: "Le Pilier Noyé",
        type: 'exploration',
        location: "Ruines sous-marines, au large de Port-Orage",
        locationId: 'ruines-marines',
        estimatedMinutes: 35,
        readAloud: {
          text: `Le navire ancre au-dessus d'un néant d'encre.

La mer, habituellement grise et agitée dans cette région, est étrangement calme à cet endroit précis — un cercle d'eau lisse de cent mètres de diamètre, comme un miroir noir au milieu des vagues. Les marins murmurent des prières et refusent de regarder par-dessus le bastingage.

La plongée commence.

Les potions de respiration aquatique font leur effet — l'eau froide de la mer emplit vos poumons mais ne vous étouffe pas. Au contraire, chaque inspiration est une bouffée d'air transformé par la magie. Vous descendez, entourés de bulles silencieuses, dans une obscurité croissante.

À dix brasses, la lumière du soleil devient un souvenir lointain. À vingt brasses, l'obscurité est totale — puis les ruines apparaissent.

Elles brillent.

Un complexe architectural immense, posé sur le fond marin comme une couronne tombée. Des colonnes de pierre blanche veinée de cristal lumineux s'élèvent de vingt mètres, soutenant des arches brisées et des dômes à moitié effondrés. Des runes couvrent chaque surface — pas ashkanes, plus anciennes encore — émettant une lueur bleu pâle qui baigne les ruines d'un clair de lune sous-marin.

Au centre du complexe, intact au milieu de la destruction, un pilier. Unique, monolithique, d'un noir absolu qui aspire la lumière des runes alentour. Dix mètres de haut, lisse comme du verre, gravé d'un seul symbole visible à sa base.

Un œil ouvert.

Le symbole du Cercle des Cendres.

Autour du pilier, des bulles montent du sol en un rideau continu — de l'air chaud, presque brûlant, qui ne devrait pas exister à cette profondeur. Et dans les bulles, des silhouettes. Des ombres qui se déplacent avec une intention que l'eau ne peut pas freiner.

Vous n'êtes pas les premiers à arriver.`,
          mood: "Émerveillement abyssal, horreur lovecraftienne, beauté aliène et danger sous-marin",
          music: "Synthétiseurs sous-marins, échos de sonar, voix déformées par l'eau, basses profondes et constantes",
        },
        gmNotes: [
          { type: 'info', text: "Les ruines sont antérieures à l'Hégémonie d'Ashka — elles datent d'une civilisation oubliée, les Premiers, qui ont construit les fondations sur lesquelles les Sceaux ont été posés. Le Pilier Noyé n'est pas un Sceau mais un point d'accès — une porte vers le réseau souterrain qui relie les cinq Sceaux." },
          { type: 'warning', text: "Le combat sous-marin utilise des règles spéciales : vitesse de déplacement réduite de moitié, les armes tranchantes et contondantes ont un désavantage (résistance de l'eau), les sorts de feu ne fonctionnent pas, les sorts de foudre affectent TOUT dans un rayon de 5m." },
          { type: 'tip', text: "Cette scène est principalement exploratoire avec une touche de combat. Le Cercle est déjà là mais ne cherche pas le conflit — ils essayent d'activer le Pilier pour accéder au réseau. Les héros peuvent observer, interférer, ou les laisser activer le Pilier et les suivre." },
          { type: 'secret', text: "Le Pilier contient un message des Premiers — un avertissement adressé aux générations futures. Il ne peut être lu que par quelqu'un portant le Pendentif des Cinq Sceaux d'Aldric. Le message révèle que les Sceaux ne sont pas des prisons — ce sont des écluses. Les Anciens ne sont pas emprisonnés — ils sont contenus. La différence est cruciale pour la suite de la campagne." },
          { type: 'lore', text: "Les Premiers étaient une civilisation qui existait avant toutes les races actuelles d'Aethelgard. Ils ont construit un réseau mondial de piliers et de nœuds pour canaliser l'énergie dimensionnelle. Quand les Anciens sont venus, les Premiers ont sacrifié leur civilisation pour transformer le réseau en système de confinement. Les Sceaux sont le résultat." },
        ],
        skillChecks: [
          { skill: 'Arcanes', dc: 45, success: "Les runes sur les ruines ne sont ni ashkanes ni elfiques — elles sont dans un langage proto-magique, le langage des Premiers. Vous ne pouvez pas les lire, mais vous comprenez leur fonction : ce sont des amplificateurs, des lentilles qui focalisent l'énergie magique vers le Pilier central.", failure: "Les runes sont incompréhensibles. Leur langage prédède tout ce que vous connaissez." },
          { skill: 'Perception', dc: 35, success: "Vous repérez 3 agents du Cercle autour du Pilier, utilisant des cristaux de veinérite pour essayer d'activer les runes de la base. Un quatrième agent monte la garde près d'une alcôve où un cinquième semble effectuer un rituel.", failure: "Les bulles et la lueur des ruines rendent l'observation difficile. Des silhouettes bougent mais leur nombre et leurs positions sont incertains." },
          { skill: 'Histoire', dc: 50, success: "Une révélation frappe : ces ruines ne sont pas ashkanes — elles sont antérieures. Les Ashkans n'ont pas créé le système des Sceaux, ils l'ont corrompu. Les vrais créateurs étaient les Premiers, une civilisation dont les livres d'histoire ne parlent que par des mythes.", failure: "L'architecture est certainement ancienne, mais son origine exacte vous échappe." },
        ],
        choices: [
          {
            id: 'choice-ruines',
            prompt: "Les agents du Cercle tentent d'activer le Pilier Noyé. Que font les héros ?",
            options: [
              {
                label: "Interférer avec le rituel",
                description: "Attaquer les agents et empêcher l'activation du Pilier.",
                consequence: "Combat sous-marin contre 5 agents. Le Pilier reste inactif. Les héros peuvent l'examiner en paix et, avec le Pendentif d'Aldric, lire le message des Premiers.",
                nextScene: 'scene-2-7-1',
                reputationChange: [{ faction: 'cercle-des-cendres', amount: -15 }],
              },
              {
                label: "Observer et laisser faire",
                description: "Laisser le Cercle activer le Pilier et observer ce qui se passe.",
                consequence: "Le Pilier s'active et projette une carte holographique montrant les cinq Sceaux et le réseau qui les relie. Information précieuse pour les deux camps. Le Cercle part avec cette information — mais les héros l'ont aussi.",
                nextScene: 'scene-2-7-1',
              },
              {
                label: "Utiliser le Pendentif d'Aldric",
                description: "S'approcher du Pilier et utiliser l'artefact pour accéder à son message.",
                consequence: "Le Pendentif résonne avec le Pilier — une connexion instantanée. Le message des Premiers se déverse dans l'esprit du porteur : l'histoire vraie des Sceaux, la nature des Anciens, et un avertissement terrible. Le Cercle est alerté par l'activation et attaque.",
                nextScene: 'scene-2-7-1',
                skillCheck: { skill: 'Arcanes', dc: 35, success: "Le message est clair, complet, et bouleversant. Vous comprenez désormais la véritable nature des Sceaux — et pourquoi les briser serait bien pire que ce que le Cercle imagine.", failure: "Le message est fragmentaire, noyé dans des siècles de dégradation. Vous captez des bribes — 'écluses, pas prisons', 'les Anciens ne sont pas endormis', 'le prix de la rupture est...' — puis la connexion se brise." },
              },
            ],
          },
        ],
        encounter: {
          name: "Agents du Cercle sous-marins (si combat)",
          enemies: [
            {
              name: "Plongeur du Cercle des Cendres",
              hp: 30,
              atk: 12,
              ac: 14,
              cr: 2,
              abilities: [
                "Harponnage : Portée 10m, +12 au toucher, 1d10+3 dégâts perforants (non affecté par le malus sous-marin).",
                "Bombe de veinérite : Lancée, rayon de 3m, 2d6 dégâts nécrotiques, Sauvegarde Constitution CD 30 ou vitesse réduite de moitié pendant 2 tours.",
                "Respiration ashkan : Ne nécessite pas de potion — utilise un appareil ashkan permanent.",
              ],
            },
            {
              name: "Ritualiste du Cercle",
              hp: 40,
              atk: 14,
              ac: 13,
              cr: 3,
              abilities: [
                "Trait de foudre sous-marin : Portée 15m, +14 au toucher, 3d6 dégâts de foudre. ATTENTION : affecte TOUT dans un rayon de 5m autour de la cible (alliés inclus).",
                "Bouclier d'eau : Réaction, dévie une attaque à distance en manipulant les courants.",
                "Activation du Pilier : Si le ritualiste n'est pas interrompu pendant 3 tours, le Pilier s'active de force.",
              ],
            },
          ],
          terrain: [
            "Colonnes brisées (couverture, mais attention aux courants qui déplacent les débris)",
            "Courants marins (zones de 3m où la nage est difficile, Athlétisme CD 25 pour traverser)",
            "Le Pilier Noyé (zone anti-magie dans un rayon de 2m — aucun sort ne fonctionne près du Pilier)",
            "Fond sablonneux (peut être remué pour créer un nuage d'obscurité de 5m)",
          ],
          tactics: "Les plongeurs encerclent et harponnent à distance. Le ritualiste reste près du Pilier et utilise ses sorts de foudre si les héros approchent (attention aux dégâts de zone sous-marins). Les agents tentent de gagner du temps pour l'activation plutôt que de tuer les héros.",
          loot: [
            "Appareil de respiration ashkan (objet rare, respiration sous-marine permanente)",
            "Cristaux de veinérite marine (x3, composants de sort aquatique, valeur 75 po chacun)",
            "Journal du ritualiste (détails sur les plans du Cercle pour les trois prochains mois)",
            "Perle noire des Premiers (artefact de quête, résonne avec les Sceaux)",
          ],
        },
        loot: [
          "Appareil de respiration ashkan",
          "Cristaux de veinérite marine",
          "Journal du ritualiste",
          "Perle noire des Premiers",
        ],
        nextScenes: ['scene-2-7-1'],
        previousScene: 'scene-2-6-3',
        mapMovement: { from: 'port-orage', to: 'ruines-marines' },
      },
    ],
    chapterConclusion: {
      text: `Vous remontez des profondeurs avec le poids d'un monde sur les épaules et le sel de la mer dans les yeux.

Port-Orage vous accueille avec son tumulte habituel — les cris des marchands, le grincement des grues, le claquement des voiles. La ville ne sait pas ce qui dort sous ses eaux. Elle ne sait pas que chaque vague qui frappe ses quais porte l'écho d'une civilisation oubliée et d'une menace immémoriale.

Mais vous savez.

Le Pendentif d'Aldric pulse contre votre poitrine — quatre gemmes brillent encore, mais leur lumière semble plus pâle qu'avant. Comme des bougies dans un courant d'air.

Les Cités Libres vous ont donné des alliés, des ressources, et des réponses. Mais chaque réponse a engendré dix nouvelles questions. Le Cercle des Cendres est partout — dans les ombres de Sol-Aureus, dans les racines de la Sylve, dans les profondeurs de la mer. Et derrière le Cercle, un nom murmure dans chaque lettre et chaque rapport : l'Architecte.

Qui est l'Architecte ?

Que veut-il vraiment ?

Et combien de temps reste-t-il avant que les Sceaux ne cèdent ?

Le vent tourne. La tempête approche.

Et vous êtes debout sur le pont d'un navire, face à l'horizon, avec le destin d'un monde dans vos poches et la détermination de héros dans vos cœurs.

L'Acte II continue.`,
      mood: "Résolution teintée d'inquiétude, l'ampleur de la quête se révèle, détermination",
      music: "Thème maritime héroïque, orchestration complète, transition vers le thème principal de la campagne en crescendo",
    },
    rewards: { xp: 1500, gold: "600-800 po", items: ["Appareil de respiration ashkan", "Perle noire des Premiers", "Alliance navale de Port-Orage", "Journal du ritualiste", "Cartes des fonds marins"] },
  },
];
