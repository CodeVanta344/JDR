/**
 * LIVRE DU MAÎTRE DU JEU - Aethelgard
 * ACTE IV : La Guerre des Sceaux (Niveaux 12-16)
 * Guerre ouverte, héroïsme, leadership et rédemption
 */

import type { BookChapter, BookAct } from './gm-book-data';

// ============================================================================
// ACTE IV - LA GUERRE DES SCEAUX
// ============================================================================

export const ACT_4: BookAct = {
  id: 'act-4',
  actNumber: 4,
  title: "La Guerre des Sceaux",
  subtitle: "Le monde retient son souffle avant la tempête finale",
  synopsis: "La guerre ouverte éclate entre les forces d'Aethelgard et le Cercle des Cendres. Les héros, désormais des figures de légende, doivent mener des missions critiques pour rassembler les composants du Grand Rituel capable de restaurer les sceaux primordiaux. Ils voyageront dans les profondeurs des Monts Cœur-de-Fer, traverseront les Terres Brûlées hantées par les morts, et tenteront l'impossible : unir des factions rivales sous une seule bannière. Chaque Archon du Cercle tombé rapproche le monde du salut - ou de la destruction.",
  levelRange: "12-16",
  themes: ['guerre', 'héroïsme', 'leadership', 'rédemption', 'sacrifice'],
  actIntro: {
    text: `Le temps des murmures est révolu. Le temps des lames est venu.

Aux quatre coins d'Aethelgard, les armées se mettent en marche. Les bannières du Cercle des Cendres - un œil de flamme sur fond noir - flottent sur des colonnes de morts-vivants, de fanatiques et de créatures arrachées aux cauchemars des Anciens. Les sceaux primordiaux qui maintenaient l'équilibre du monde se brisent un à un, et chaque rupture libère une vague de magie corrompue qui déforme la réalité.

Mais Aethelgard ne plie pas. Pas encore.

Sol-Aureus se hérisse de défenses. Les forges tournent jour et nuit. Les prêtres de Solarius bénissent les lames pendant que les mages de la Guilde tissent des protections sur les murailles. Et au cœur de cette tempête, des héros se dressent - des êtres dont les noms sont déjà murmurés dans les tavernes et les temples, dont les exploits nourrissent l'espoir d'un peuple au bord du gouffre.

Le Grand Rituel existe. Un moyen de restaurer les sceaux, de refermer les brèches, de repousser les Anciens dans leur sommeil éternel. Mais ses composants sont dispersés aux confins du monde connu, gardés par des périls que même les plus braves hésitent à affronter.

Il n'y a plus de choix. Il n'y a que le devoir, le courage, et l'espoir fragile qu'un monde brisé peut encore être réparé.`,
    mood: "Épique, grave, porteur d'espoir dans les ténèbres",
    music: "Thème orchestral martial, cuivres héroïques, chœur en crescendo, percussions de guerre",
  },
  chapters: [],
};

// ============================================================================
// CHAPITRE 8 : LA FORGE DU MONDE
// ============================================================================

const CHAPTER_8: BookChapter = {
  id: 'ch-4-8',
  actNumber: 4,
  chapterNumber: 8,
  title: "La Forge du Monde",
  subtitle: "Dans les entrailles des Monts Cœur-de-Fer",
  summary: "Les héros voyagent jusqu'aux Monts Cœur-de-Fer pour trouver le premier composant du Grand Rituel : l'Enclume Primordiale, un artefact nain forgé à l'aube du monde. Ils doivent gagner la confiance du Roi Thrain Forge-Flamme, affronter les horreurs des mines profondes, et vaincre le dragon de cristal Vyraxithon qui garde l'artefact dans la Forge Originelle.",
  levelRange: "12-13",
  themes: ['exploration souterraine', 'alliance', 'épreuve de valeur', 'héritage ancien'],
  chapterIntro: {
    text: `Les Monts Cœur-de-Fer se dressent devant vous comme les crocs d'un titan endormi. Leurs sommets percent les nuages, couronnés de neige éternelle que le soleil teinte de rose et d'or. Mais c'est sous la surface que bat le vrai cœur de ces montagnes - un réseau de mines, de halls et de forges creusé par les nains depuis des millénaires.

Forgefer, la cité souterraine, est la plus grande réalisation du peuple nain. Taillée dans le roc vif, illuminée par des rivières de lave canalisées et des cristaux luminescents, elle s'étend sur sept niveaux qui plongent jusqu'aux racines mêmes du monde.

C'est ici que se trouve l'Enclume Primordiale - le premier artefact jamais forgé, dit-on, sur l'enclume des dieux eux-mêmes. Et c'est ici que le Roi Thrain Forge-Flamme règne d'une main de fer sur un peuple fier et méfiant envers les étrangers.

La route sera longue. L'accueil sera froid. Et ce qui attend dans les profondeurs n'a pas vu la lumière du soleil depuis des éons.`,
    mood: "Majestueux, souterrain, tension croissante",
    music: "Thème nain, cors et enclumes, résonance de cavernes profondes",
  },
  chapterConclusion: {
    text: `L'Enclume Primordiale pulse dans son étui protecteur, irradiant une chaleur douce qui traverse le métal et le cuir. Vous sentez son pouvoir - ancien, stable, inébranlable comme la pierre des montagnes elles-mêmes.

Le Roi Thrain se tient devant les portes de Forgefer, sa garde d'honneur rangée derrière lui. Pour la première fois depuis votre arrivée, quelque chose qui ressemble à un sourire traverse son visage de granit.

« Vous avez prouvé votre valeur dans le feu et les ténèbres. Forgefer se souviendra. Quand viendra le temps de la bataille finale, les haches naines répondront à l'appel. »

Il frappe le sol de son marteau de guerre. Trois fois. Le son résonne dans les halls comme le battement d'un cœur gigantesque, et trois mille voix naines répondent d'un cri de guerre qui fait trembler la montagne.

Vous avez le premier composant. Il en reste deux. Et la guerre n'attend pas.`,
    mood: "Triomphant, alliance scellée, urgence renouvelée",
    music: "Hymne nain triomphal, chœur de basses, enclumes rythmiques",
  },
  rewards: { xp: 18000, gold: "3 500 po + gemmes d'une valeur de 2 000 po", items: ["Enclume Primordiale (composant du Grand Rituel)", "Hache de Thrain (arme légendaire naine +2)", "Armure de Cœur-de-Fer (armure lourde résistante au feu)", "Anneau de la Forge (résistance au feu, avantage en Forge)"] },
  scenes: [
    // --- Scène 1 : Les Portes de Forgefer ---
    {
      id: 'scene-4-8-1',
      sceneNumber: 1,
      title: "Les Portes de Forgefer",
      type: 'social',
      location: "Entrée principale de Forgefer, Monts Cœur-de-Fer",
      locationId: 'forgefer',
      estimatedMinutes: 30,
      readAloud: {
        text: `Après six jours de marche dans les cols venteux des Monts Cœur-de-Fer, le sentier s'élargit soudain devant une paroi de roche lisse et verticale. Rien ne la distingue du reste de la montagne - jusqu'à ce que vous remarquiez les runes.

Elles sont gravées à même la pierre, si profondes qu'elles semblent avoir été là avant la montagne elle-même. Des runes naines, mais d'un style archaïque que même les érudits peineraient à déchiffrer. Elles luisent d'un rouge sombre, comme des braises sous la cendre.

Un cor retentit - un son grave et profond qui fait vibrer vos os. La paroi tremble, et deux battants de pierre massive pivotent lentement vers l'intérieur, révélant un hall d'entrée taillé dans le roc. Des colonnes sculptées de scènes de bataille et de forge s'élèvent vers un plafond perdu dans l'obscurité. Des braseros de fer forgé projettent une lumière orangée qui danse sur les murs.

Deux rangées de gardes nains en armure complète vous font face, immobiles comme des statues. Leurs haches reposent au sol, mais leurs yeux sont alertes. Au centre, un nain plus grand que les autres - ce qui reste relatif - s'avance. Sa barbe tressée est noire comme le jais, retenue par des anneaux d'or. Son armure porte le symbole de la maison royale : un marteau frappant une enclume au-dessus d'une flamme.

« Étrangers aux Portes de Forgefer, » dit-il d'une voix qui résonne comme un gong. « Déclinez vos noms, votre lignée et votre motif. Le Roi Thrain ne reçoit pas les vagabonds. »`,
        mood: "Imposant, cérémoniel, méfiance polie",
        music: "Cors nains, écho de pierre, crépitement de braseros",
      },
      gmNotes: [
        { type: 'info', text: "Le Capitaine Borin Bouclier-de-Roc est le gardien des portes. Il est loyal au roi mais pas hostile - simplement protocolaire. Les nains respectent la franchise et le courage ; la flatterie les irrite." },
        { type: 'warning', text: "Si les joueurs tentent de forcer l'entrée ou d'être irrespectueux, les 24 gardes (HP 65, ATK 14, AC 18 chacun) attaquent sans hésitation. Les portes se referment et des pièges de lave s'activent. NE PAS combattre ici." },
        { type: 'tip', text: "Les nains respectent : les guerriers (montrer des cicatrices), les forgerons (parler de métaux), les buveurs (accepter un défi de boisson). Ils méprisent : la magie arcane non liée à la forge, la diplomatie 'huileuse', et quiconque insulte leur bière." },
        { type: 'secret', text: "Borin sait que le roi est inquiet. Des tremblements secouent les mines profondes. Quelque chose s'éveille dans les niveaux inférieurs. Si les joueurs mentionnent les sceaux ou le Grand Rituel, Borin les mène directement au roi." },
        { type: 'lore', text: "Forgefer est la plus ancienne cité naine encore habitée. Fondée il y a 4 000 ans par Durin Première-Flamme, elle a survécu à trois guerres, deux invasions de dragons et la chute d'Ashka. Les nains ont un dicton : 'La montagne se souvient quand le monde oublie.'" },
      ],
      npcs: [
        {
          name: "Capitaine Borin Bouclier-de-Roc",
          role: "Gardien des Portes de Forgefer",
          personality: "Strict, protocolaire, mais cache un humour bourru. Loyal au roi jusqu'à la mort. Respecte ceux qui se montrent dignes.",
          appearance: "Nain trapu même pour un nain. Barbe noire tressée avec des anneaux d'or. Armure complète ornée du blason royal. Cicatrice qui traverse le nez. Hache à double tranchant dans le dos.",
          secret: "Son frère cadet est descendu dans les mines profondes il y a un mois et n'est jamais remonté. Borin cache sa peur derrière le protocole.",
          dialogues: {
            greeting: "« Étrangers aux Portes. Noms et motif. Et si vous me dites que vous êtes des 'aventuriers en quête de gloire', faites demi-tour tout de suite. On a assez de problèmes sans ajouter des touristes. »",
            info: "« Forgefer va bien. Les forges tournent, la bière coule, le roi règne. Tout va parfaitement bien. ... Bon, d'accord, rien ne va. Les mines tremblent, les mineurs remontent en courant, et le roi n'a pas souri depuis trois lunes. Mais ce sont NOS problèmes. »",
            quest: "« Vous voulez voir le roi ? Le Roi Thrain Forge-Flamme ne reçoit pas n'importe qui. Prouvez que vous méritez son temps. Il y a un problème au Niveau Quatre - des créatures qui remontent des profondeurs. Réglez ça, et je vous mène au trône. »",
            farewell: "« Que la pierre sous vos pieds soit solide et votre acier trempé. C'est une bénédiction naine. Ne la gaspillez pas. »",
          },
          stats: { hp: 85, atk: 16, ac: 19 },
        },
      ],
      choices: [
        {
          id: 'choice-4-8-1-entry',
          prompt: "Comment les héros se présentent-ils aux portes de Forgefer ?",
          options: [
            {
              label: "Avec franchise et honneur",
              description: "Déclarer ouvertement leur mission, le danger qui menace Aethelgard, et leur besoin de l'Enclume Primordiale.",
              consequence: "Borin est impressionné par leur franchise. Il les mène au roi avec une escorte d'honneur. +2 réputation naine.",
              nextScene: 'scene-4-8-2',
              reputationChange: [{ faction: 'Nains de Forgefer', amount: 2 }],
            },
            {
              label: "En démontrant leur valeur",
              description: "Proposer un duel ou un défi pour prouver qu'ils méritent audience.",
              consequence: "Borin accepte un duel à mains nues. Victoire = respect immédiat. Défaite honorable = respect quand même.",
              nextScene: 'scene-4-8-2',
              skillCheck: { skill: 'Athlétisme', dc: 55, success: "Borin tombe sur un genou, sourit pour la première fois. « Pas mal. Pas mal du tout. Suivez-moi, le roi voudra vous voir. »", failure: "Borin vous met au sol en trois coups. Mais il vous tend la main. « Vous avez du cran. C'est ce qui compte chez nous. Venez. »" },
              reputationChange: [{ faction: 'Nains de Forgefer', amount: 1 }],
            },
            {
              label: "En invoquant d'anciennes alliances",
              description: "Mentionner les traités entre Sol-Aureus et Forgefer, ou invoquer le nom de la Reine Elara.",
              consequence: "Jet de Persuasion ou Histoire. Les traités existent mais sont poussiéreux. Borin est sceptique mais obligé de transmettre.",
              nextScene: 'scene-4-8-2',
              skillCheck: { skill: 'Histoire', dc: 50, success: "Vous citez le Traité de la Flamme et de l'Or, signé il y a 200 ans. Borin hausse un sourcil impressionné. « Quelqu'un qui connaît ses classiques. Rare chez les gens de la surface. »", failure: "Vous mélangez les dates et les noms. Borin soupire. « Les diplomates de la surface... Allez, entrez avant de vous embarrasser davantage. »" },
            },
          ],
        },
      ],
      nextScenes: ['scene-4-8-2'],
      mapMovement: { from: 'monts-coeur-de-fer', to: 'forgefer' },
    },

    // --- Scène 2 : L'Audience du Roi Thrain ---
    {
      id: 'scene-4-8-2',
      sceneNumber: 2,
      title: "Le Trône sous la Montagne",
      type: 'social',
      location: "Salle du Trône de Forgefer",
      locationId: 'forgefer',
      estimatedMinutes: 35,
      readAloud: {
        text: `La Salle du Trône de Forgefer est un spectacle qui coupe le souffle.

Taillée dans une caverne naturelle si vaste que son plafond se perd dans l'obscurité, la salle s'étend sur une centaine de mètres. Des colonnes de basalte poli, chacune sculptée de l'histoire d'un roi nain, soutiennent la voûte. Entre elles, des cascades de lave contrôlée tombent dans des canaux de pierre avec un grondement sourd et constant, baignant l'espace d'une lumière rouge-orangée qui fait scintiller les veines de métal dans les murs.

Au fond, sur une estrade de pierre noire, se dresse le Trône de Fer-et-Flamme. Forgé d'un seul bloc de métal météorique, il brille d'une lueur interne, comme si le feu qui l'a créé ne s'était jamais éteint. Des runes ancestrales courent sur ses accoudoirs et son dossier, pulsant doucement au rythme d'un battement invisible.

Et sur ce trône, le Roi Thrain Forge-Flamme attend.

C'est un nain d'âge moyen - ce qui, pour un nain, signifie au moins deux siècles. Sa barbe couleur de cuivre est tressée en une seule natte épaisse qui descend jusqu'à sa ceinture, retenue par des fermoirs de mithril. Ses yeux, d'un ambre intense, brûlent avec l'éclat d'une forge. Sa couronne est simple - un bandeau de fer noir incrusté d'un unique rubis qui pulse comme un cœur.

Il ne se lève pas. Il ne sourit pas. Il vous regarde comme un forgeron examine un minerai brut : cherchant ce qui vaut la peine d'être raffiné, et ce qui n'est que scorie.

« Parlez, » dit-il. Un seul mot. Sa voix gronde comme un éboulement lointain.`,
        mood: "Majestueux, intimidant, épreuve de caractère",
        music: "Thème royal nain, basses profondes, grondement volcanique distant",
      },
      gmNotes: [
        { type: 'info', text: "Thrain est un roi pragmatique. Il sait que les sceaux se brisent - ses propres sismologues ont détecté les perturbations. Mais il ne donnera pas l'Enclume Primordiale à des inconnus. Il veut des preuves de valeur ET une alliance qui profite à Forgefer." },
        { type: 'warning', text: "Thrain déteste la flatterie et les promesses vagues. Les joueurs qui tentent de le manipuler perdent immédiatement son respect (-3 réputation). Seule l'honnêteté fonctionne." },
        { type: 'secret', text: "Thrain a un problème qu'il ne peut résoudre seul : un dragon de cristal, Vyraxithon, s'est installé dans la Forge Originelle au Niveau Sept, le plus profond. Le dragon bloque l'accès à l'Enclume. Thrain a perdu cinquante guerriers en tentant de le déloger." },
        { type: 'tip', text: "Laissez les joueurs faire leur pitch. Thrain les interrompra avec des questions directes. « Qu'est-ce qui m'empêche de garder l'Enclume et de sceller mes portes ? » est sa question clé. La bonne réponse : parce que les sceaux brisés menacent aussi les nains." },
        { type: 'lore', text: "Le Trône de Fer-et-Flamme est forgé du même métal que l'Enclume Primordiale - du fer météorique tombé il y a 10 000 ans. La légende dit que le trône et l'enclume sont frère et sœur, forgés ensemble par Durin Première-Flamme avec le feu du cœur du monde." },
      ],
      npcs: [
        {
          name: "Roi Thrain Forge-Flamme",
          role: "Roi de Forgefer, Seigneur des Monts Cœur-de-Fer",
          personality: "Têtu comme le granit, honorable comme l'acier. Parle peu mais chaque mot compte. Aime son peuple plus que sa couronne. Cache une peur profonde pour l'avenir de Forgefer derrière une façade de force.",
          appearance: "Nain massif, deux siècles, barbe de cuivre en une seule tresse avec fermoirs de mithril. Yeux ambre brûlants. Couronne de fer noir avec rubis pulsant. Mains calleuses de forgeron - il forge encore chaque semaine.",
          secret: "Sa fille unique, Brenna, a été pétrifiée par la magie du dragon. Elle se trouve dans la Forge Originelle, transformée en statue de cristal. Thrain n'a parlé de cela à personne hors de sa garde rapprochée.",
          dialogues: {
            greeting: "« Vous avez franchi mes portes. Cela signifie que Borin vous juge dignes d'un regard. Prouvez-lui qu'il n'a pas eu tort. »",
            info: "« L'Enclume Primordiale est le cœur de Forgefer. Elle a forgé les premières armes, les premiers outils, les premières protections de mon peuple. Vous me demandez de vous donner notre âme. Donnez-moi une raison. Une seule, mais qu'elle soit bonne. »",
            quest: "« Voici mon marché. Un dragon de cristal occupe la Forge Originelle depuis six lunes. Mes guerriers ne peuvent le vaincre - sa peau renvoie nos haches et son souffle change la chair en pierre. Tuez le dragon, ou convainquez-le de partir, et l'Enclume est à vous. Échouez, et vos os rejoindront ceux de mes cinquante braves. »",
            farewell: "« La montagne jugera. Elle juge toujours. »",
          },
          stats: { hp: 150, atk: 22, ac: 22 },
        },
        {
          name: "Conseillère Magda Rune-de-Fer",
          role: "Première Conseillère et Runiste royale",
          personality: "Analytique, méfiante envers les étrangers, mais fascinée par la magie des sceaux. Secrètement inquiète que Forgefer ne survive pas seule.",
          appearance: "Naine âgée, cheveux blancs tressés avec des fils de cuivre. Robe de forge grise ornée de runes lumineuses. Lunettes épaisses cerclées de fer. Mains tachées d'encre et de suie.",
          secret: "A étudié les sceaux en secret. Sait que l'Enclume seule ne suffira pas - il faut un forgeron capable de manier le feu primordial. Elle croit que l'un des héros pourrait être ce forgeron.",
          dialogues: {
            greeting: "« Des gens de la surface qui comprennent la valeur des sceaux. Intéressant. La plupart de vos semblables pensent que la magie ancienne est un conte pour enfants. »",
            info: "« Mes instruments détectent les perturbations depuis huit mois. Les sceaux ne se brisent pas au hasard - ils sont attaqués. Quelqu'un connaît leur emplacement et leur faiblesse. Et ce quelqu'un se rapproche de Forgefer. »",
            quest: "« Si vous affrontez le dragon, prenez ceci. » *Elle tend un cristal bleu.* « C'est un résonateur runique. Il analysera la magie du dragon pendant le combat. Si nous comprenons comment Vyraxithon cristallise la chair, nous pourrons inverser le processus. »",
            farewell: "« La connaissance est la forge de l'esprit. Ne l'oubliez jamais. »",
          },
          stats: { hp: 70, atk: 18, ac: 17 },
        },
      ],
      choices: [
        {
          id: 'choice-4-8-2-negotiate',
          prompt: "Comment les héros convainquent-ils le Roi Thrain ?",
          options: [
            {
              label: "Par la vérité nue",
              description: "Expliquer la situation des sceaux, la menace du Cercle, et le fait que Forgefer tombera aussi si le monde sombre.",
              consequence: "Thrain respecte la franchise. Il propose le marché du dragon. Alliance conditionnelle.",
              nextScene: 'scene-4-8-3',
              skillCheck: { skill: 'Persuasion', dc: 55, success: "Thrain frappe l'accoudoir de son trône. « Enfin quelqu'un qui parle sans détour. J'accepte de vous écouter. Mais les mots ne forgent pas l'acier - vos actes le feront. »", failure: "Thrain reste de marbre. « Des mots. Beaux, mais creux. Montrez-moi des actes et je vous écouterai. Le dragon attend. »" },
              reputationChange: [{ faction: 'Nains de Forgefer', amount: 2 }],
            },
            {
              label: "Par un serment de sang",
              description: "Proposer un serment nain de fraternité d'armes - engagement sacré aux yeux des nains.",
              consequence: "Geste audacieux. Thrain est surpris qu'un étranger connaisse ce rite. Lien de confiance immédiat.",
              nextScene: 'scene-4-8-3',
              skillCheck: { skill: 'Religion', dc: 60, success: "Thrain se lève pour la première fois. « Vous connaissez le Serment du Fer et du Sang. Rares sont les gens de la surface qui honorent nos traditions. Frère d'armes, je vous entends. »", failure: "Vous mélangez les mots du rituel. Les gardes ricanent. Thrain lève la main pour les faire taire. « L'intention était juste, même si les mots étaient faux. Réessayez quand vous aurez prouvé que votre acier vaut votre parole. »" },
              reputationChange: [{ faction: 'Nains de Forgefer', amount: 3 }],
            },
            {
              label: "En offrant quelque chose en retour",
              description: "Promettre l'aide de Sol-Aureus pour reconstruire les routes commerciales, fournir des ressources, ou partager des connaissances magiques.",
              consequence: "Thrain est un pragmatique. Une offre concrète l'intéresse plus que des beaux discours.",
              nextScene: 'scene-4-8-3',
              skillCheck: { skill: 'Persuasion', dc: 50, success: "Thrain penche la tête. « Voilà une proposition qui a du poids. L'or et les traités, je connais. Mettez ça par écrit et nous discuterons des détails après que vous aurez réglé mon problème de dragon. »", failure: "Thrain renifle. « Des promesses de la surface. J'en ai un tiroir plein, toutes aussi inutiles. Prouvez d'abord votre valeur, et nous négocierons ensuite. »" },
              reputationChange: [{ faction: 'Nains de Forgefer', amount: 1 }],
            },
          ],
        },
      ],
      skillChecks: [
        { skill: 'Perspicacité', dc: 55, success: "Vous percevez une ombre de douleur dans les yeux de Thrain quand il mentionne la Forge Originelle. Ce n'est pas seulement une question de dragon et de fierté. Quelque chose de personnel le ronge.", failure: "Le visage de Thrain est un masque de granit. Impossible de lire quoi que ce soit au-delà de la méfiance calculée." },
      ],
      nextScenes: ['scene-4-8-3'],
      previousScene: 'scene-4-8-1',
    },

    // --- Scène 3 : Les Mines Profondes ---
    {
      id: 'scene-4-8-3',
      sceneNumber: 3,
      title: "Descente dans les Ténèbres",
      type: 'exploration',
      location: "Mines profondes de Forgefer, Niveaux 4 à 6",
      locationId: 'forgefer-mines',
      estimatedMinutes: 40,
      readAloud: {
        text: `L'ascenseur de mine grince et gémit en descendant dans les entrailles de la montagne. Les parois du puits défilent - d'abord de la pierre brute, puis des veines de fer, puis d'argent, puis de métaux que vous ne reconnaissez pas, qui brillent de couleurs impossibles dans la lumière de vos torches.

Le Niveau Quatre sent le soufre et la peur. Les galeries autrefois ordonnées sont maintenant parsemées d'outils abandonnés, de chariots renversés et de cristaux qui n'étaient pas là il y a six mois. Des formations translucides, pointues comme des lances, poussent des murs et du plafond comme une maladie de la pierre.

Votre guide, un vieux mineur nommé Grundar, s'arrête devant une galerie plus large que les autres. La lumière de sa lanterne se reflète sur une centaine de surfaces cristallines, créant un kaléidoscope désorientant.

« C'est ici que ça a commencé, » murmure-t-il. « D'abord les cristaux. Puis les sons - un chant, comme du verre qui vibre. Puis les créatures sont venues. Des choses faites de cristal et de roche vivante. Et quand on les tue, elles... repoussent. »

Un son résonne dans les profondeurs. Un chant aigu, presque beau, qui fait vibrer les cristaux autour de vous. Grundar pâlit.

« Il sait que vous êtes là. »`,
        mood: "Claustrophobe, merveilleux sombre, danger croissant",
        music: "Résonance cristalline, gouttes d'eau, grondement lointain, chant aigu inquiétant",
      },
      gmNotes: [
        { type: 'info', text: "Les mines profondes sont un dungeon en trois parties : Niveau 4 (créatures cristallines mineures), Niveau 5 (pièges naturels et magie du dragon), Niveau 6 (gardiens majeurs). La Forge Originelle est au Niveau 7." },
        { type: 'warning', text: "La magie du dragon de cristal imprègne les mines. Tout sort de feu est amplifié (dégâts x1.5) mais a 25% de chance de faire exploser un cristal proche (3d8 dégâts perforants, zone de 3m). Prévenez les lanceurs de sorts." },
        { type: 'secret', text: "Les cristaux ne sont pas naturels. Ils sont le résultat du souffle de Vyraxithon qui transforme la pierre en cristal vivant. Certains cristaux contiennent des nains pétrifiés - les cinquante guerriers que Thrain a envoyés. Un sort de Restauration supérieure pourrait théoriquement les libérer." },
        { type: 'tip', text: "Grundar le mineur est un excellent guide mais pas un combattant. Il connaît des passages secrets et des raccourcis. Si les joueurs le protègent, il peut réduire le nombre de rencontres de moitié. S'il meurt, les joueurs doivent naviguer seuls." },
        { type: 'lore', text: "Les Monts Cœur-de-Fer tirent leur nom du noyau de fer météorique enfoui dans leurs profondeurs. Ce fer est vivant dans un sens magique - il résonne avec les émotions et la volonté. Les meilleurs artefacts nains sont forgés de ce métal, mais il est extrêmement difficile à travailler." },
      ],
      npcs: [
        {
          name: "Grundar Main-Sûre",
          role: "Vieux mineur et guide des profondeurs",
          personality: "Courageux malgré sa peur. Parle aux pierres comme à de vieilles amies. Connaît chaque fissure des six premiers niveaux.",
          appearance: "Nain âgé, barbe grise couverte de poussière de roche. Un œil de verre (perdu dans un éboulement). Lanterne à huile ancestrale qui ne s'éteint jamais.",
          secret: "Son fils est l'un des guerriers pétrifiés au Niveau 6. Il n'en parle pas, mais c'est la vraie raison pour laquelle il s'est porté volontaire comme guide.",
          dialogues: {
            greeting: "« Vous êtes les fous que le roi envoie en bas ? Bien. J'aime les fous. Les gens sensés ne descendent plus ici depuis des mois. »",
            info: "« Le dragon a changé les mines. La pierre chante maintenant. Et pas des berceuses - des chants de guerre. Les cristaux poussent plus vite chaque semaine. Si on ne fait rien, dans un an, Forgefer sera une cage de verre. »",
            quest: "« Au Niveau Six, il y a... il y a des statues. Des statues qui ressemblent à nos guerriers. Si vous avez un moyen de les libérer... s'il vous plaît. L'un d'eux est... c'est mon garçon. »",
            farewell: "« Que la pierre vous porte et que le cristal ne vous prenne pas. »",
          },
          stats: { hp: 45, atk: 10, ac: 15 },
        },
      ],
      encounter: {
        name: "Gardiens Cristallins des Mines",
        enemies: [
          { name: "Golem de Cristal", hp: 95, atk: 16, ac: 17, cr: 7, abilities: ["Résonance - inflige 2d6 dégâts sonores aux créatures à 3m", "Reconstitution - se régénère de 10 HP par tour tant que des cristaux sont proches", "Éclat aveuglant - flash lumineux, Sauvegarde CON CD 14 ou aveuglé 1 tour"] },
          { name: "Nuée de Cristaux Animés", hp: 60, atk: 14, ac: 15, cr: 5, abilities: ["Essaim - occupe l'espace d'autres créatures", "Mille coupures - 4d6 dégâts tranchants en zone", "Reformage - se divise en deux nuées à 50% HP"] },
          { name: "Sentinelle Pétrifiée", hp: 120, atk: 18, ac: 19, cr: 8, abilities: ["Regard pétrifiant - Sauvegarde CON CD 15 ou ralenti", "Frappe de cristal - 3d10+5 dégâts contondants", "Carapace réfléchissante - renvoie 50% des dégâts de sorts"] },
        ],
        terrain: ["Cristaux instables (terrain difficile)", "Crevasses profondes (chute de 6m si raté DEX CD 12)", "Veines de lave (2d6 dégâts feu au contact)", "Zones de résonance (désavantage sur concentration)"],
        tactics: "Les golems protègent les nuées qui harcèlent les arrières. La sentinelle reste en retrait et utilise son regard pétrifiant. Si les cristaux proches sont détruits, les golems perdent leur régénération. La sentinelle charge en dernier recours.",
        loot: ["Fragment de Cristal Vivant (composant magique, valeur 500 po)", "Cœur de Golem (rubis magique, 800 po)", "Poudre de cristal (10 doses, composant alchimique)", "Carte des mines profondes (avantage sur navigation aux niveaux 5-6)"],
      },
      skillChecks: [
        { skill: 'Survie', dc: 50, success: "Vous repérez les signes de passage des créatures cristallines : des éraflures sur la pierre, des éclats de cristal frais. Vous pouvez les éviter ou préparer une embuscade.", failure: "Les galeries se ressemblent toutes. Vous tournez en rond pendant une heure avant de retrouver votre chemin, perdant du temps et des ressources." },
        { skill: 'Arcanes', dc: 55, success: "Les cristaux sont saturés de magie draconique. Vous identifiez la fréquence de résonance - en la reproduisant, vous pouvez faire éclater les cristaux ou les calmer.", failure: "La magie des cristaux vous échappe. Leur structure est alien, comme rien de ce que vous avez étudié. Prudence." },
      ],
      nextScenes: ['scene-4-8-4'],
      previousScene: 'scene-4-8-2',
      mapMovement: { from: 'forgefer', to: 'forgefer-mines' },
    },

    // --- Scène 4 : La Forge Originelle ---
    {
      id: 'scene-4-8-4',
      sceneNumber: 4,
      title: "Vyraxithon, le Dragon de Cristal",
      type: 'combat',
      location: "La Forge Originelle, Niveau 7 de Forgefer",
      locationId: 'forge-originelle',
      estimatedMinutes: 60,
      readAloud: {
        text: `Le Niveau Sept n'est pas une mine. C'est un sanctuaire.

La galerie s'ouvre sur une caverne si immense qu'elle possède son propre climat - des nuages de vapeur flottent sous la voûte, illuminés par en dessous par un lac de magma en fusion qui occupe le centre de l'espace. La chaleur est un mur physique. L'air ondule et danse.

Au centre du lac de lave, sur un îlot de roche noire, se dresse l'Enclume Primordiale. Même à cette distance, vous sentez son pouvoir - une vibration profonde qui résonne dans vos os, dans votre sang, dans le métal de vos armes. L'enclume est d'un noir absolu, si dense qu'elle semble absorber la lumière. Des runes d'or pur courent sur ses flancs, pulsant au rythme du magma.

Mais entre vous et l'enclume...

Le dragon déploie ses ailes.

Vyraxithon est un cauchemar de beauté. Son corps est fait de cristal vivant - transparent, prismatique, reflétant la lumière du magma en un millier de couleurs. Chaque écaille est un joyau parfait. Ses yeux sont deux saphirs massifs qui brillent d'une intelligence ancienne et froide. Quand il ouvre la gueule, ce n'est pas du feu qui en sort - c'est un souffle de cristallisation pure, un vent qui transforme tout ce qu'il touche en verre éternel.

Autour de lui, les restes pétrifiés des guerriers nains se dressent comme une forêt de statues tragiques. Et parmi eux, une jeune naine en armure de princesse, figée dans un geste de défi, son marteau de guerre levé pour une frappe qui ne viendra jamais.

« Mortels, » dit le dragon, et sa voix est le son de mille carillons de cristal. « Vous venez pour l'Enclume. Comme les autres avant vous. Regardez-les. Admirez leur perfection éternelle. Souhaitez-vous les rejoindre dans l'immobilité ? »`,
        mood: "Épique, terrifiant, beauté mortelle",
        music: "Thème de dragon, chœur cristallin, grondement de lave, cordes tendues",
      },
      gmNotes: [
        { type: 'info', text: "Vyraxithon est un dragon ancien de cristal (CR 14). Il n'est pas fondamentalement mauvais - il est un gardien autoproclamé de la Forge Originelle qu'il considère comme le plus grand trésor du monde. Il peut être combattu OU raisonné." },
        { type: 'warning', text: "Combat direct : extrêmement difficile pour un groupe de niveau 12-13. Le souffle de cristallisation est un one-shot potentiel (Sauvegarde CON CD 18 ou pétrification). Encouragez les joueurs à chercher des solutions alternatives ou combinées." },
        { type: 'secret', text: "Vyraxithon est lié à la Forge Originelle par un ancien pacte. Il ne peut pas quitter la caverne. Il garde l'Enclume non par cupidité, mais parce qu'il a juré de la protéger il y a 3 000 ans. Si les joueurs découvrent cela, ils peuvent négocier : prendre l'Enclume avec la promesse de la rapporter." },
        { type: 'tip', text: "La fille pétrifiée de Thrain est un levier émotionnel ET pratique. Si les joueurs utilisent le résonateur de Magda pour comprendre la pétrification, ils peuvent proposer un marché : libérer Brenna en échange de l'Enclume. Vyraxithon respecte le courage et la créativité." },
        { type: 'lore', text: "Les dragons de cristal sont les plus rares de tous les dragons. Ils naissent dans les veines de magie pure de la terre et leur souffle ne détruit pas - il préserve. Vyraxithon considère la pétrification comme un cadeau : une éternité de perfection. Il ne comprend pas pourquoi les mortels la refusent." },
      ],
      npcs: [
        {
          name: "Vyraxithon, le Dragon de Cristal",
          role: "Gardien de la Forge Originelle",
          personality: "Ancien, patient, philosophe à sa manière. Ne considère pas la pétrification comme un acte cruel mais comme un don d'éternité. Respecte le courage et l'intelligence. Méprise la cupidité.",
          appearance: "Dragon de taille adulte, corps entièrement fait de cristal vivant prismatique. Ailes translucides qui projettent des arcs-en-ciel. Yeux de saphir. Voix comme un carillon dans une cathédrale.",
          secret: "Vyraxithon est fatigué. Trois mille ans de solitude dans cette caverne l'ont usé. Une partie de lui souhaite que quelqu'un le libère de son serment - mais il ne l'admettra jamais directement.",
          dialogues: {
            greeting: "« Trois mille ans, et vous êtes les premiers à descendre si bas sans trembler. Ou du moins, à ne pas trembler visiblement. Je suis Vyraxithon. Et ceci est ma demeure. »",
            info: "« L'Enclume est la première œuvre de la première forge. Elle porte en elle la mémoire du monde tel qu'il était avant que les mortels ne le brisent. Je l'ai gardée quand les nains ont oublié sa vraie valeur. Je la garderai quand vous serez poussière. »",
            quest: "« Vous me proposez un marché ? Intéressant. Les derniers qui ont essayé m'ont offert de l'or. De l'or ! À un dragon de cristal ! ... Très bien. Convainquez-moi que vous méritez l'Enclume. Pas avec des armes. Avec des mots. Ou des actes. Ou les deux. »",
            farewell: "« Le cristal se souvient. Quand le monde oubliera votre nom, les murs de cette caverne le murmureront encore. C'est ma bénédiction. Ou ma malédiction. Selon le point de vue. »",
          },
          stats: { hp: 250, atk: 24, ac: 20 },
        },
      ],
      encounter: {
        name: "Vyraxithon, Dragon de Cristal",
        enemies: [
          { name: "Vyraxithon", hp: 250, atk: 24, ac: 20, cr: 14, abilities: ["Souffle de Cristallisation - cône de 18m, Sauvegarde CON CD 18, échec = pétrification progressive (ralenti au 1er échec, paralysé au 2e, pétrifié au 3e)", "Ailes Prismatiques - réfraction de la lumière, 50% d'échec des sorts à distance", "Queue Balayante - 3d8+6 contondant, repousse de 4m", "Résonance Cristalline - tous les cristaux dans 30m explosent, 6d6 perforant zone", "Régénération Cristalline - récupère 15 HP/tour près de cristaux"] },
          { name: "Gardien Cristallin (x2)", hp: 80, atk: 15, ac: 18, cr: 6, abilities: ["Bouclier vivant - peut absorber les dégâts destinés à Vyraxithon", "Frappe de quartz - 2d10+4 contondant"] },
        ],
        terrain: ["Lac de magma (10d10 dégâts feu, mort instantanée si immergé)", "Ponts de pierre étroits (1m50 de large, au-dessus du magma)", "Cristaux explosifs (DEX CD 14 ou 3d8 perforants quand brisés)", "Colonnes de roche (couverture, mais le dragon peut les abattre)", "Îlot central avec l'Enclume (terrain stable mais exposé)"],
        tactics: "Vyraxithon commence par son souffle depuis une position surélevée, puis utilise les cristaux pour piéger les joueurs. Les gardiens bloquent les ponts. Si blessé à 50%, il utilise Résonance pour faire exploser tous les cristaux et se repositionne. Combat aérien possible au-dessus du magma. Le dragon préfère pétrifier plutôt que tuer.",
        loot: ["Enclume Primordiale (composant du Grand Rituel)", "Écaille de Cristal de Vyraxithon (x5, composant légendaire, 1000 po chaque)", "Cœur de Dragon Cristallin (si tué - permet de forger un objet légendaire)", "Larme de Cristal (si négocié - guérit toute pétrification)"],
      },
      choices: [
        {
          id: 'choice-4-8-4-dragon',
          prompt: "Comment les héros affrontent-ils Vyraxithon ?",
          options: [
            {
              label: "Combat frontal",
              description: "Affronter le dragon avec armes et magie. Direct, dangereux, mais décisif.",
              consequence: "Combat CR 14. Très difficile mais possible. Si Vyraxithon est tué, Thrain est reconnaissant mais Magda pleure - le dragon était le dernier gardien de la forge.",
              nextScene: 'scene-4-8-5',
            },
            {
              label: "Négociation et échange",
              description: "Proposer un marché : prendre l'Enclume temporairement avec serment de la rapporter, ou offrir au dragon quelque chose qu'il désire.",
              consequence: "Jet de Persuasion CD 60. Si les joueurs mentionnent la fatigue de Vyraxithon ou proposent de le libérer de son serment, CD réduit à 50.",
              nextScene: 'scene-4-8-5',
              skillCheck: { skill: 'Persuasion', dc: 60, success: "Vyraxithon ferme les yeux un long moment. « Trois mille ans... Peut-être est-il temps de faire confiance aux mortels. Prenez l'Enclume. Sauvez le monde. Et quand ce sera fini, rapportez-la. C'est un pacte de cristal - incassable. »", failure: "« Vos mots sont jolis. Mais les mots sont fragiles, comme le verre. Montrez-moi quelque chose de plus solide. » Le dragon n'attaque pas, mais ne cède pas non plus. Il faudra trouver un autre levier." },
              reputationChange: [{ faction: 'Nains de Forgefer', amount: 2 }],
            },
            {
              label: "Libérer Brenna",
              description: "Utiliser le résonateur de Magda pour comprendre et inverser la pétrification de la fille de Thrain. Montrer au dragon que la pétrification n'est pas un don.",
              consequence: "Jet d'Arcanes CD 55 pour utiliser le résonateur. Si réussi, Brenna est libérée. Vyraxithon est profondément troublé - cela remet en question sa vision du monde.",
              nextScene: 'scene-4-8-5',
              skillCheck: { skill: 'Arcanes', dc: 55, success: "Le cristal autour de Brenna craque, se fissure, et explose en une pluie de poussière scintillante. La jeune naine tombe à genoux, toussant, vivante. Vyraxithon recule, ses yeux de saphir écarquillés. « Elle... elle pleure. Je ne savais pas que l'éternité pouvait faire pleurer. »", failure: "Le résonateur vibre mais ne parvient pas à briser l'emprise cristalline. Brenna reste pétrifiée. Mais la tentative impressionne le dragon. « Vous essayez de sauver plutôt que de prendre. Intéressant. Peut-être méritez-vous une seconde chance. »" },
              reputationChange: [{ faction: 'Nains de Forgefer', amount: 5 }],
            },
          ],
        },
      ],
      nextScenes: ['scene-4-8-5'],
      previousScene: 'scene-4-8-3',
      mapMovement: { from: 'forgefer-mines', to: 'forge-originelle' },
    },

    // --- Scène 5 : L'Alliance de Fer ---
    {
      id: 'scene-4-8-5',
      sceneNumber: 5,
      title: "L'Alliance de Fer et de Flamme",
      type: 'social',
      location: "Grande Salle de Forgefer",
      locationId: 'forgefer',
      estimatedMinutes: 20,
      readAloud: {
        text: `Le retour à la surface est un triomphe.

Les nouvelles ont précédé votre ascension - les tambours nains, ce réseau de communication qui parcourt les murs de Forgefer comme des artères, ont transmis le message de niveau en niveau. « L'Enclume est libre. Les héros remontent. »

Quand l'ascenseur crache votre groupe épuisé, couvert de poussière cristalline et de sueur, la Grande Salle est pleine. Trois mille nains se tiennent en silence, formant une haie d'honneur de l'ascenseur jusqu'au trône. Aucun ne parle. Aucun ne bouge. Le seul son est le crépitement des torches et le battement de votre propre cœur.

Le Roi Thrain attend devant son trône. Pas assis. Debout. Et pour la première fois, vous voyez ce qui ressemble à de l'émotion sur son visage de granit. Ses yeux brillent d'une lumière qui n'a rien à voir avec la forge.

Si Brenna est à vos côtés - si vous avez réussi l'impossible et l'avez libérée de son prison de cristal - alors les larmes coulent ouvertement sur les joues du roi. Des larmes qu'il n'essuie pas. Des larmes dont il ne s'excuse pas.

Il s'avance. Il prend vos mains dans les siennes - des mains de forgeron, calleuses et puissantes.

« Forgefer a une dette, » dit-il. Et sa voix ne gronde plus comme un éboulement. Elle tremble comme la flamme d'une bougie dans le vent. « Une dette qui ne sera pas oubliée tant que la pierre tiendra et que le feu brûlera. »

Il se tourne vers son peuple et lève son marteau de guerre.

« Que les forges s'allument ! Que les haches se trempent ! Quand ces héros appelleront, Forgefer répondra ! »

Le rugissement de trois mille nains fait trembler la montagne.`,
        mood: "Triomphant, émouvant, alliance forgée dans l'épreuve",
        music: "Hymne nain triomphal, chœur puissant, enclumes en rythme, cors de victoire",
      },
      gmNotes: [
        { type: 'info', text: "Cette scène est une récompense narrative. Pas de combat, pas de défi - juste le résultat de leur courage. Laissez les joueurs savourer le moment. Décrivez la fête qui suit si le temps le permet." },
        { type: 'tip', text: "Si Brenna a été libérée, la récompense est amplifiée : Thrain donne aussi la Hache de Thrain (arme légendaire familiale) et jure une alliance inconditionnelle. Si Brenna est encore pétrifiée, l'alliance est conditionnelle et teintée de tristesse." },
        { type: 'secret', text: "Magda prend les joueurs à part après la cérémonie. Elle a analysé les données du résonateur. Le souffle du dragon utilise la même fréquence magique que les sceaux primordiaux. Les dragons de cristal étaient peut-être les gardiens originels des sceaux. Cette information sera cruciale à l'Acte V." },
        { type: 'lore', text: "La fête naine de la Victoire dure traditionnellement sept jours. Elle inclut des concours de forge, des duels amicaux, des chants épiques de 400 couplets, et une consommation de bière qui défie les lois de la physique." },
      ],
      loot: ["Enclume Primordiale (composant du Grand Rituel)", "Hache de Thrain (hache d'armes +2, +1d6 dégâts de feu, avantage contre dragons)", "Armure de Cœur-de-Fer (armure lourde, résistance feu, +1 AC)", "Anneau de la Forge (résistance feu, avantage sur jets d'Artisanat/Forge)", "3 500 po en lingots de mithril et gemmes"],
      nextScenes: ['scene-4-9-1'],
      previousScene: 'scene-4-8-4',
      mapMovement: { from: 'forge-originelle', to: 'forgefer' },
    },
  ],
};

// ============================================================================
// CHAPITRE 9 : LES TERRES BRÛLÉES
// ============================================================================

const CHAPTER_9: BookChapter = {
  id: 'ch-4-9',
  actNumber: 4,
  chapterNumber: 9,
  title: "Les Terres Brûlées",
  subtitle: "Dans les cendres de l'empire maudit",
  summary: "Les héros s'aventurent dans les Terres Brûlées, vestige désolé de l'ancien Empire Ashka, pour trouver le deuxième composant du Grand Rituel : le Nexus d'Ashka, un cristal de contrôle magique enfoui dans les ruines de l'ancienne capitale. Ils affrontent des tempêtes de cendres, des armées de morts-vivants, et l'Archon Vexor, nécromancien du Cercle des Cendres qui a élu domicile dans les ruines.",
  levelRange: "13-14",
  themes: ['survie', 'horreur', 'confrontation', 'mémoire des morts'],
  chapterIntro: {
    text: `Rien ne vous a préparé aux Terres Brûlées.

Les cartes les montrent comme une zone grise, hachurée, avec la mention « désert de cendres - inhabité ». Mais les cartes ne capturent pas l'horreur de ce lieu. Elles ne montrent pas le ciel perpétuellement couvert de nuages de poussière noire. Elles ne décrivent pas le silence - ce silence total, absolu, qui pèse sur vos épaules comme une chape de plomb, parce qu'ici, rien ne vit. Rien ne chante. Rien ne bouge.

Sauf les morts.

L'Empire Ashka est tombé il y a cent vingt ans, mais la terre se souvient. Le sol est une croûte de cendre compacte, fendue par endroits, révélant en dessous du verre noir fondu par la puissance de la magie qui a rasé cet empire. Des ruines émergent de la poussière comme des os sortant d'une plaie - tours brisées, arches effondrées, routes pavées menant nulle part.

Et partout, omniprésente, la cendre. Elle tombe du ciel en flocons noirs paresseux. Elle s'accumule dans chaque creux, chaque fissure. Elle couvre vos vêtements, vos cheveux, votre peau. Elle a un goût de fer et de regret.

Quelque part dans cet enfer gris, au cœur des ruines de la capitale Ashka, le Nexus attend. Et avec lui, l'Archon Vexor et ses légions de morts.`,
    mood: "Désolation, horreur tranquille, mélancolie profonde",
    music: "Vent sifflant, silence pesant, notes dissonantes isolées, murmures lointains",
  },
  chapterConclusion: {
    text: `Le Nexus d'Ashka pulse entre vos mains, et vous comprenez soudain pourquoi l'Empire a été si puissant - et pourquoi il est tombé. Ce cristal contient la mémoire de mille ans de magie, condensée en un seul point de lumière violette.

Derrière vous, les ruines de la capitale s'effondrent lentement. Sans le pouvoir de Vexor pour les maintenir, les derniers vestiges de l'Empire d'Ashka retournent à la poussière. C'est une fin. Pas une fin heureuse - il n'y a rien d'heureux dans les Terres Brûlées - mais une fin nécessaire.

Les morts-vivants se sont effondrés quand Vexor est tombé. Des milliers de corps, enfin libérés de leur servitude, reposent sur le sol de cendres. Peut-être, après un siècle d'errance, trouveront-ils enfin la paix.

Vous avez deux composants sur trois. Le chemin du retour sera long. Et les nouvelles qui vous attendent ne seront pas bonnes.

Mais pour l'instant, dans ce désert de mort et de mémoire, vous êtes vivants. Et cela suffit.`,
    mood: "Victoire amère, repos mélancolique, urgence qui couve",
    music: "Thème mineur résolu, violoncelle solo, vent qui se calme",
  },
  rewards: { xp: 22000, gold: "4 000 po en artefacts ashkans", items: ["Nexus d'Ashka (composant du Grand Rituel)", "Bâton de Vexor (bâton de nécromancie +2, converti en bâton de restauration)", "Cape des Cendres (résistance nécrotique, invisibilité dans les ténèbres 1/jour)", "Grimoire des Morts (contient 5 sorts de nécromancie/restauration niv. 4-6)"] },
  scenes: [
    // --- Scène 1 : La Traversée des Cendres ---
    {
      id: 'scene-4-9-1',
      sceneNumber: 1,
      title: "La Marche Grise",
      type: 'exploration',
      location: "Frontière des Terres Brûlées",
      locationId: 'terres-brulees-frontiere',
      estimatedMinutes: 30,
      readAloud: {
        text: `La ligne est nette. Presque chirurgicale.

D'un côté, l'herbe. Les arbres. La vie. De l'autre, rien. Un désert plat de cendre grise qui s'étend jusqu'à l'horizon. La transition se fait en un pas - littéralement. Un pas, et vous quittez le monde des vivants pour entrer dans le cimetière le plus vaste jamais créé.

Le premier jour est le pire. Non pas à cause du danger - il viendra plus tard - mais à cause du silence. Vos pas ne font aucun bruit sur la cendre compactée. Le vent souffle, mais il ne porte aucun son de vie. Pas d'oiseaux. Pas d'insectes. Pas même le craquement d'une brindille sous une patte. Le silence est si total qu'il devient un son en soi - un bourdonnement grave, continu, qui s'installe dans votre crâne et refuse de partir.

Le deuxième jour, les tempêtes de cendres commencent.

Elles naissent sans prévenir - un mur gris à l'horizon qui approche avec une rapidité terrifiante. En quelques minutes, la visibilité tombe à zéro. La cendre fouette le visage, s'infiltre dans les yeux, la bouche, les poumons. Respirer devient un combat. Voir devient un souvenir.

Et dans la tempête, vous entendez les voix. Des murmures. Des gémissements. Des appels. Les fantômes des millions de morts ashkans qui n'ont jamais trouvé le repos, condamnés à errer dans les cendres de leur empire pour l'éternité.

« Revenez... ne nous laissez pas... »`,
        mood: "Désolation apocalyptique, survie, horreur psychologique",
        music: "Vent de cendres, murmures spectraux, silence oppressant, battement de cœur sourd",
      },
      gmNotes: [
        { type: 'info', text: "La traversée des Terres Brûlées est un défi de survie. Chaque jour de marche nécessite : eau (double consommation à cause de la chaleur et de la cendre), protection respiratoire (tissu humide = -2 perception), et résistance mentale." },
        { type: 'warning', text: "Les tempêtes de cendres imposent : visibilité nulle, 1d4 dégâts nécrotiques/heure d'exposition, et un jet de Sagesse CD 50 pour résister aux murmures des fantômes. Échec = 1 niveau d'épuisement psychique." },
        { type: 'secret', text: "Les fantômes ne sont pas hostiles - ils sont perdus. Un prêtre ou paladin qui canalise de l'énergie positive peut les apaiser temporairement, créant une zone de calme dans la tempête (rayon de 10m, 1 heure)." },
        { type: 'tip', text: "Faites sentir la désolation. Décrivez des détails macabres : un jouet d'enfant à moitié fondu, une épée plantée dans le sol avec un squelette encore agrippé, des fondations de maisons formant un quadrillage de rues fantômes." },
        { type: 'lore', text: "L'Empire d'Ashka a été détruit par sa propre magie. Quand le dernier empereur, Ashka le Terrible, a tenté d'invoquer un Ancien pour gagner la guerre contre l'Alliance, le rituel a implosé. L'explosion magique a vitrifié tout dans un rayon de 200 kilomètres et tué quinze millions de personnes en un instant." },
      ],
      skillChecks: [
        { skill: 'Survie', dc: 55, success: "Vous trouvez des repères dans le paysage mort : des formations de verre fondu qui pointent vers le sud, des courants de cendres qui indiquent la direction des ruines. Vous gagnez un jour de voyage.", failure: "Le désert se ressemble partout. Vous perdez un jour entier à marcher en cercle avant de réaliser votre erreur grâce à la position du soleil à travers les nuages de cendres." },
        { skill: 'Sagesse (Sauvegarde)', dc: 50, success: "Les murmures des morts glissent sur votre esprit comme de l'eau sur la pierre. Vous entendez leurs appels, mais vous comprenez qu'ils sont des échos, pas des ordres.", failure: "Les voix s'infiltrent. Vous vous surprenez à répondre, à tourner la tête, à chercher des visages dans la cendre. Le doute s'installe. L'épuisement mental commence." },
      ],
      encounter: {
        name: "Tempête Spectrale",
        enemies: [
          { name: "Nuée Spectrale de Cendres", hp: 75, atk: 14, ac: 14, cr: 6, abilities: ["Intangible - résistance aux dégâts physiques non magiques", "Toucher Glacial - 3d6 nécrotique + 1d4 dégâts de Sagesse", "Lamentation - tous à 10m, Sauvegarde SAG CD 14 ou effrayé"] },
          { name: "Marcheur de Cendres (x4)", hp: 40, atk: 12, ac: 12, cr: 3, abilities: ["Griffes de cendre - 2d6+3 nécrotique", "Explosion de cendres - à la mort, nuage aveuglant 3m"] },
        ],
        terrain: ["Tempête de cendres (visibilité 3m)", "Sol instable (terrain difficile partout)", "Fosses de verre vitrifié cachées sous la cendre (DEX CD 13 ou 2d6 perforants)", "Poches de gaz toxique (CON CD 14 ou empoisonné 1 minute)"],
        tactics: "La nuée spectrale enveloppe le groupe pendant que les marcheurs attaquent en tenaille. La tempête de cendres protège les morts-vivants (avantage sur les attaques) et gêne les vivants (désavantage). Si la nuée est dissipée, les marcheurs fuient.",
        loot: ["Éclat d'Âme Ashkan (gemme, 300 po, composant pour sorts de divination)", "Poussière de Fantôme (5 doses, composant alchimique)", "Médaillon d'un noble ashkan (200 po, indice sur l'emplacement du Nexus)"],
      },
      nextScenes: ['scene-4-9-2'],
      previousScene: 'scene-4-8-5',
      mapMovement: { from: 'forgefer', to: 'terres-brulees-frontiere' },
    },

    // --- Scène 2 : Les Ruines de la Capitale ---
    {
      id: 'scene-4-9-2',
      sceneNumber: 2,
      title: "Les Ruines d'Ashka-Nour",
      type: 'exploration',
      location: "Ruines de la Capitale Ashka, Terres Brûlées",
      locationId: 'ashka-nour-ruines',
      estimatedMinutes: 35,
      readAloud: {
        text: `Ashka-Nour était autrefois la plus grande cité du monde connu. Deux millions d'âmes vivaient entre ses murs de basalte noir, dans des tours qui touchaient les nuages, le long d'avenues pavées de marbre sombre veiné d'or.

Aujourd'hui, ce n'est qu'un squelette.

Les tours sont des moignons brisés, leurs sommets arrachés par l'explosion qui a tué l'empire. Les avenues sont des tranchées de verre fondu, lisses et noires, qui reflètent un ciel de cendres comme des miroirs sombres. Les bâtiments ne sont que des coquilles vides, leurs murs rongés par un siècle de vent abrasif, leurs intérieurs exposés comme des blessures ouvertes.

Mais ce qui vous glace le sang, ce ne sont pas les ruines. Ce sont les ombres.

Sur chaque mur encore debout, sur chaque surface de verre, des silhouettes sont gravées. Des ombres permanentes, brûlées dans la pierre par le flash de l'explosion finale. Des familles prises dans leur quotidien. Un boulanger devant son four. Des enfants jouant à la balle. Un soldat au garde-à-vous. Figés pour l'éternité dans leurs derniers gestes, leurs dernières pensées, leurs derniers souffles.

Quinze millions de fantômes silencieux vous regardent passer.

Et au centre de la ville morte, une lumière verte pulse. Le Nexus. Et les morts qui le gardent.`,
        mood: "Horreur mémorielle, grandeur déchue, recueillement forcé",
        music: "Silence presque total, notes de piano isolées, vent qui gémit dans les ruines",
      },
      gmNotes: [
        { type: 'info', text: "Ashka-Nour est un immense dungeon urbain en ruines. Les joueurs peuvent explorer librement, mais le temps presse - plus ils restent, plus les morts-vivants de Vexor convergent vers eux." },
        { type: 'warning', text: "La magie nécrotique sature les ruines. Les sorts de guérison fonctionnent à 50% d'efficacité. Les sorts nécrotiques sont amplifiés (dégâts x1.5). Les morts-vivants se régénèrent si non détruits par énergie positive ou feu." },
        { type: 'secret', text: "Le Nexus est dans la Tour Impériale, au centre de la ville. Mais la tour est protégée par un champ de force nécrotique alimenté par trois pylônes dispersés dans la ville. Les joueurs doivent désactiver les trois pylônes avant de pouvoir entrer." },
        { type: 'tip', text: "Rendez les ruines personnelles. Les joueurs trouvent des journaux, des lettres d'amour, des jouets. Les gens d'Ashka n'étaient pas tous des monstres - la plupart étaient des civils ordinaires tués par la folie de leur empereur. Nuance morale importante." },
        { type: 'lore', text: "L'explosion qui a détruit Ashka-Nour est connue comme le Jour de Cendres. Les historiens estiment que la puissance libérée était équivalente à mille sorts de Souhait déclenchés simultanément. Le cratère au centre de la ville fait 3 kilomètres de diamètre. Le Nexus se trouve au fond." },
      ],
      npcs: [
        {
          name: "Fantôme de la Bibliothécaire Nassira",
          role: "Esprit lié aux ruines de la Grande Bibliothèque",
          personality: "Triste mais lucide. Contrairement aux autres fantômes, elle a conservé sa raison. Souhaite aider les vivants à empêcher une nouvelle catastrophe.",
          appearance: "Silhouette translucide d'une femme d'âge moyen en robes de lettrée. Des livres fantomatiques flottent autour d'elle. Ses yeux sont les seuls éléments solides - deux perles de lumière dorée.",
          secret: "Nassira était la gardienne du Nexus avant la chute. Elle connaît la séquence d'activation et peut guider les héros pour l'extraire sans déclencher les défenses résiduelles.",
          dialogues: {
            greeting: "« Des vivants. Des vivants qui n'ont pas encore fui. Soit vous êtes très courageux, soit vous ne comprenez pas encore où vous êtes. Dans les deux cas, approchez. J'ai attendu longtemps quelqu'un qui m'écoute. »",
            info: "« Le Nexus est le cœur du réseau de magie de l'Empire. Ashka le Terrible l'utilisait pour drainer la force vitale de ses sujets et alimenter ses sorts. Quand il a tenté le Grand Rituel Inversé, le Nexus a implosé. La puissance est toujours là - piégée, condensée, en attente. Le nécromancien qui occupe la Tour Impériale essaie de la réveiller. »",
            quest: "« Il y a trois pylônes de garde - des ancres nécrotiques que le nouveau venu a installées pour protéger la Tour. Je peux vous montrer où ils sont. Détruisez-les, et la voie sera libre. Mais hâtez-vous. Chaque heure qui passe, le nécromancien renforce ses défenses. »",
            farewell: "« Je ne peux pas quitter ces ruines. Mais quand le Nexus sera libéré, peut-être que moi aussi, je pourrai enfin... partir. Bonne chance, vivants. Le monde a besoin que vous réussissiez. »",
          },
        },
      ],
      choices: [
        {
          id: 'choice-4-9-2-approach',
          prompt: "Comment les héros approchent-ils la Tour Impériale ?",
          options: [
            {
              label: "Désactiver les trois pylônes",
              description: "Suivre les indications de Nassira pour trouver et détruire les pylônes nécrotiques. Méthodique mais prend du temps.",
              consequence: "3 mini-encounters (CD 12 chacun). Chaque pylône détruit affaiblit les défenses de la tour et réduit le nombre de morts-vivants de Vexor de 33%.",
              nextScene: 'scene-4-9-3',
              skillCheck: { skill: 'Arcanes', dc: 50, success: "Vous identifiez la fréquence magique des pylônes et les désactivez efficacement. Chaque pylône se dissout en poussière noire. Les morts-vivants proches s'effondrent comme des marionnettes coupées.", failure: "Vous détruisez les pylônes par la force brute. Ça fonctionne, mais chaque destruction libère une onde de choc nécrotique (3d6 nécrotique, zone de 10m). Douloureux mais efficace." },
            },
            {
              label: "Assaut frontal",
              description: "Forcer le passage directement vers la Tour Impériale, à travers les légions de morts-vivants.",
              consequence: "Combat épique mais brutal. Les pylônes intacts rendent Vexor plus puissant (+2 AC, +20 HP, sorts amplifiés).",
              nextScene: 'scene-4-9-3',
            },
            {
              label: "Infiltration souterraine",
              description: "Utiliser les anciens tunnels de service sous la ville pour atteindre la tour par en dessous.",
              consequence: "Jet de Discrétion de groupe CD 55. Permet d'éviter les légions mais mène à un gardien souterrain unique.",
              nextScene: 'scene-4-9-3',
              skillCheck: { skill: 'Discrétion', dc: 55, success: "Les tunnels sont intacts et déserts - les morts-vivants ne pensent pas à regarder en bas. Vous émergez dans les sous-sols de la Tour, derrière les défenses principales.", failure: "Un éboulement vous force à remonter en surface en plein territoire ennemi. L'effet de surprise est perdu, et une patrouille de morts-vivants donne l'alerte." },
            },
          ],
        },
      ],
      skillChecks: [
        { skill: 'Investigation', dc: 50, success: "Dans les ruines de la bibliothèque, vous trouvez un journal ashkan décrivant les faiblesses du Nexus. L'artefact peut être éteint en prononçant le Mot de Fermeture en ashkan archaïque. Le journal contient le mot.", failure: "Les ruines ne livrent que cendres et regrets. Pas d'information exploitable sur le Nexus." },
        { skill: 'Religion', dc: 50, success: "Vous sentez les lignes de force nécrotique qui convergent vers la Tour. En les analysant, vous pouvez prédire les mouvements des patrouilles de morts-vivants et les éviter.", failure: "La magie nécrotique ambiante brouille vos sens spirituels. Tout ce que vous percevez est un mur de mort et de souffrance." },
      ],
      nextScenes: ['scene-4-9-3'],
      previousScene: 'scene-4-9-1',
      mapMovement: { from: 'terres-brulees-frontiere', to: 'ashka-nour-ruines' },
    },

    // --- Scène 3 : L'Archon Vexor ---
    {
      id: 'scene-4-9-3',
      sceneNumber: 3,
      title: "Le Seigneur des Morts",
      type: 'combat',
      location: "Tour Impériale, Ashka-Nour",
      locationId: 'tour-imperiale',
      estimatedMinutes: 60,
      readAloud: {
        text: `La Tour Impériale est un tombeau vertical.

Autrefois la plus haute structure d'Aethelgard - trente étages de basalte noir, d'or et de cristal ashkan - elle n'en compte plus que douze. Le sommet a été arraché par l'explosion, laissant la tour ouverte sur le ciel de cendres comme une plaie béante.

À l'intérieur, la mort a été transformée en art macabre. Les murs sont tapissés d'ossements disposés en motifs géométriques complexes - des mandala de tibias et de crânes, des fresques de côtes et de vertèbres. Des chandeliers de fémurs brûlent d'une flamme verte qui ne réchauffe pas. L'air est si froid que votre souffle forme des cristaux.

Au dernier étage - la salle du trône impérial, ouverte sur le ciel - Vexor vous attend.

Il ne ressemble pas à ce que vous attendiez. Pas de robe noire en lambeaux, pas de squelette ricanant. L'Archon Vexor est un homme jeune, presque beau, en armure de cuir noir parfaitement ajustée. Ses cheveux sont blancs comme la neige, ses yeux d'un violet profond, son sourire patient et sincère. Il a l'air d'un érudit, pas d'un monstre.

Mais derrière lui, dans un cercle de runes vertes, le Nexus d'Ashka flotte dans les airs, pulsant d'une énergie malsaine. Et de chaque côté, des centaines de morts-vivants se tiennent en rangs parfaits - soldats, mages, chevaliers, tous en armure ashkane corrodée, tous avec des yeux verts luisants fixés sur vous.

« Ah, enfin, » dit Vexor en se levant de son trône d'os. Sa voix est douce, cultivée, presque chaleureuse. « J'espérais que le Cercle enverrait quelqu'un d'intéressant à combattre. Mais c'est encore mieux - ce sont les fameux héros d'Aethelgard. Je suis honoré. Vraiment. »

Il incline la tête avec une politesse parfaite.

« Maintenant, discutons. Ou combattons. Selon votre préférence. J'ai l'éternité devant moi, après tout. »`,
        mood: "Confrontation finale du chapitre, tension extrême, villain charismatique",
        music: "Thème de villain, cordes menaçantes, chœur nécrotique, battement sourd",
      },
      gmNotes: [
        { type: 'info', text: "Vexor est l'Archon le plus dangereux rencontré jusqu'ici (CR 15). C'est un nécromancien de génie qui ne se bat pas seul - ses légions sont son arme principale. Le combat direct est un dernier recours pour lui." },
        { type: 'warning', text: "Si les trois pylônes sont intacts, Vexor est CR 17 (HP +40, AC +2, sorts +2 niveaux). Si les trois pylônes sont détruits, il est CR 13. L'approche des joueurs aux scènes précédentes a un impact MAJEUR ici." },
        { type: 'secret', text: "Vexor n'est pas un fanatique du Cercle. Il a rejoint pour accéder à la magie des sceaux et ressusciter sa femme, morte de maladie. Si les joueurs découvrent cela (Perspicacité CD 55 ou fouiller ses quartiers), ils peuvent tenter de le retourner. Vexor est haïssable mais tragique." },
        { type: 'tip', text: "Le Nexus est la clé. Si un joueur parvient à atteindre le Nexus et prononce le Mot de Fermeture (trouvé dans les ruines), tous les morts-vivants de Vexor s'effondrent immédiatement. Vexor doit alors combattre seul." },
        { type: 'lore', text: "Vexor était autrefois un guérisseur réputé de Sol-Aureus. Il a basculé dans la nécromancie après la mort de sa femme, convaincu que la frontière entre la vie et la mort n'est qu'un mur qu'on peut abattre. Le Cercle des Cendres lui a promis les moyens de le faire." },
      ],
      npcs: [
        {
          name: "Archon Vexor",
          role: "Archon du Cercle des Cendres, Seigneur des Morts-Vivants",
          personality: "Poli, érudit, sincèrement convaincu que ce qu'il fait est juste. Ne se voit pas comme un méchant mais comme un visionnaire. Tragiquement aveuglé par le chagrin.",
          appearance: "Humain, la trentaine, cheveux blancs prématurés, yeux violets luminescents. Armure de cuir noir sur des vêtements d'érudit. Un médaillon d'argent autour du cou - le portrait de sa femme défunte.",
          secret: "Sa femme, Ilena, est morte de la Fièvre Noire il y a cinq ans. Vexor a cherché un remède dans la magie curative, puis dans l'alchimie, puis dans la nécromancie. Chaque échec l'a poussé plus loin dans les ténèbres. Le médaillon est son ancrage à l'humanité.",
          dialogues: {
            greeting: "« Bienvenue dans mon humble demeure. Je m'excuse pour le décor - les précédents occupants avaient des goûts... osseux. Mais asseyez-vous. J'insiste. Nous sommes tous des êtres civilisés, n'est-ce pas ? »",
            info: "« Le Cercle des Cendres n'est pas ce que vous croyez. Nous ne voulons pas détruire le monde. Nous voulons le transcender. Les sceaux ne protègent pas - ils emprisonnent. Imaginez un monde sans mort, sans maladie, sans perte. C'est ce que les Anciens offraient avant d'être enfermés. »",
            quest: "« Je vous propose un marché. Prenez le Nexus. Faites votre rituel. Sauvez vos sceaux. Tout ce que je demande en échange, c'est une seule chose : le secret de la résurrection véritable. Pas la nécromancie - la vraie résurrection. Celle que vos prêtres gardent pour eux. J'ai perdu quelqu'un, voyez-vous. Et je ferai n'importe quoi pour la ramener. N'importe quoi. »",
            farewell: "« Si vous refusez... alors nous n'avons plus rien à nous dire. Et c'est dommage. J'aurais préféré que cette nuit se termine autrement. »",
          },
          stats: { hp: 180, atk: 20, ac: 18 },
        },
      ],
      encounter: {
        name: "L'Archon Vexor et ses Légions",
        enemies: [
          { name: "Archon Vexor", hp: 180, atk: 20, ac: 18, cr: 15, abilities: ["Drain de Vie - toucher, 4d8 nécrotique, Vexor récupère la moitié en HP", "Mot de Mort - cible unique, Sauvegarde CON CD 17, échec = 10d6 nécrotique", "Armée des Morts - invoque 1d4+2 squelettes ou zombies par tour", "Bouclier Nécrotique - absorbe 30 dégâts, se recharge quand un allié mort-vivant est détruit", "Emprise Spectrale - paralyse une cible, Sauvegarde SAG CD 17, 1 tour"] },
          { name: "Chevalier Mort Ashkan (x2)", hp: 90, atk: 17, ac: 18, cr: 8, abilities: ["Lame Maudite - 2d8+5 tranchant + 2d6 nécrotique", "Aura de Terreur - 3m, Sauvegarde SAG CD 15 ou effrayé", "Incassable - se relève avec 1 HP une fois par combat"] },
          { name: "Mage Spectral Ashkan", hp: 65, atk: 18, ac: 15, cr: 7, abilities: ["Rayon Nécrotique - 4d6 nécrotique à distance", "Contre-sort (niveau 5)", "Disparition spectrale - devient intangible 1 tour"] },
          { name: "Horde de Squelettes (x20)", hp: 13, atk: 8, ac: 13, cr: 0.25, abilities: ["Attaque de masse - +2 ATK par squelette adjacent"] },
        ],
        terrain: ["Trône d'os (couverture pour Vexor)", "Cercle du Nexus (zone anti-magie pour les vivants, amplification pour les morts-vivants)", "Escaliers effondrés (accès difficile aux niveaux supérieurs)", "Ouverture vers le ciel (permet les sorts à longue portée mais aussi la fuite)", "Piliers d'os (couverture destructible, 20 HP chacun)"],
        tactics: "Vexor reste en arrière, protégé par les chevaliers morts. Il utilise Armée des Morts pour submerger le groupe pendant que le mage spectral neutralise les lanceurs de sorts. La horde de squelettes sert de chair à canon. Vexor n'utilise Mot de Mort qu'en dernier recours. Si les joueurs atteignent le Nexus, Vexor panique et abandonne sa stratégie pour un combat désespéré.",
        loot: ["Nexus d'Ashka (composant du Grand Rituel)", "Bâton de Vexor (bâton +2, 3 charges de Mot de Mort/jour)", "Cape des Cendres (résistance nécrotique, invisibilité dans les ténèbres 1/jour)", "Médaillon d'Ilena (portrait, catalyseur émotionnel - avantage contre la nécromancie)", "Grimoire des Morts (5 sorts niv. 4-6)", "4 000 po en artefacts ashkans anciens"],
      },
      choices: [
        {
          id: 'choice-4-9-3-vexor',
          prompt: "Comment les héros gèrent-ils Vexor ?",
          options: [
            {
              label: "Combat sans merci",
              description: "Refuser le marché de Vexor et l'affronter avec toute la puissance du groupe.",
              consequence: "Combat CR 15 (ou CR 13/17 selon les pylônes). Vexor meurt en murmurant le nom de sa femme. Victoire nette mais sans rédemption.",
              nextScene: 'scene-4-9-4',
            },
            {
              label: "Tenter la rédemption",
              description: "Utiliser la tragédie de Vexor contre lui. Le convaincre qu'Ilena n'aurait pas voulu cela.",
              consequence: "Jet de Persuasion CD 65 (CD 55 si le médaillon est mentionné). Succès = Vexor se rend et donne le Nexus. Échec = combat, mais Vexor est déstabilisé (-2 ATK, -2 AC).",
              nextScene: 'scene-4-9-4',
              skillCheck: { skill: 'Persuasion', dc: 65, success: "Vexor s'effondre. Les larmes coulent sur ses joues tandis que ses morts-vivants tombent un à un. « Ilena... pardonne-moi. Pardonnez-moi tous. Je voulais juste... je voulais juste la revoir. » Il tend le médaillon et le Nexus.", failure: "Les mots le touchent - vous le voyez hésiter, trembler. Mais la rage et le chagrin reprennent le dessus. « NON ! Vous ne comprenez pas ! Personne ne comprend ! » Le combat commence, mais ses yeux sont pleins de larmes." },
              reputationChange: [{ faction: 'Sol-Aureus', amount: 3 }],
            },
            {
              label: "Désactiver le Nexus directement",
              description: "Pendant que le groupe occupe Vexor, un personnage tente d'atteindre le Nexus et de prononcer le Mot de Fermeture.",
              consequence: "Nécessite une diversion réussie (combat partiel) ET un jet d'Arcanes CD 55 pour activer le Mot de Fermeture. Si réussi, tous les morts-vivants tombent et Vexor est seul.",
              nextScene: 'scene-4-9-4',
              skillCheck: { skill: 'Arcanes', dc: 55, success: "Le mot ashkan résonne dans la tour comme un gong de cristal. Le Nexus clignote, puis s'éteint. Chaque mort-vivant dans un rayon d'un kilomètre s'effondre en poussière. Vexor hurle de rage, seul au milieu de ses cendres.", failure: "Le Mot est mal prononcé. Le Nexus crache une décharge d'énergie nécrotique (4d6 à tous dans 5m). Vexor rit. « L'ashkan archaïque est une langue difficile, n'est-ce pas ? »" },
            },
          ],
        },
      ],
      nextScenes: ['scene-4-9-4'],
      previousScene: 'scene-4-9-2',
      mapMovement: { from: 'ashka-nour-ruines', to: 'tour-imperiale' },
    },

    // --- Scène 4 : Le Repos des Morts ---
    {
      id: 'scene-4-9-4',
      sceneNumber: 4,
      title: "Cendres et Mémoire",
      type: 'rest',
      location: "Ruines d'Ashka-Nour, après la bataille",
      locationId: 'ashka-nour-ruines',
      estimatedMinutes: 20,
      readAloud: {
        text: `Le silence qui suit la bataille n'est pas le même que celui des Terres Brûlées. Ce silence-là est lourd de mort et de souffrance. Celui-ci est léger. Presque paisible.

Les morts-vivants sont tombés. Des milliers de corps jonchent les rues de cendres d'Ashka-Nour, enfin immobiles, enfin libérés de la servitude nécrotique qui les maintenait entre les mondes. La lumière verte qui pulsait dans la Tour Impériale s'est éteinte, remplacée par la lueur naturelle - grise, triste, mais réelle - du ciel au-dessus des Terres Brûlées.

Le fantôme de Nassira la bibliothécaire apparaît une dernière fois. Elle est translucide, à peine visible, mais elle sourit. Pour la première fois en un siècle, elle sourit.

« Le Nexus est libre. Et moi aussi, enfin. Merci, vivants. Merci de vous être souvenus de nous. »

Elle se dissipe comme de la fumée dans le vent, et avec elle, les derniers murmures qui hantaient les ruines s'éteignent. Les morts d'Ashka-Nour trouvent enfin le repos.

Si Vexor a survécu - s'il a été racheté plutôt que tué - il se tient à l'écart, le médaillon de sa femme serré dans son poing, le regard perdu sur les ruines de tout ce qu'il a construit et de tout ce qu'il a perdu.

Le vent souffle doucement sur les Terres Brûlées. Pour la première fois, il ne porte pas de voix.

Il ne porte que le silence. Un vrai silence. Le silence de la paix.`,
        mood: "Mélancolie apaisée, repos mérité, réflexion",
        music: "Violoncelle solo, notes claires de harpe, silence naturel",
      },
      gmNotes: [
        { type: 'info', text: "Scène de repos et de transition. Repos long possible. Les joueurs récupèrent toutes leurs ressources. C'est le calme entre deux tempêtes." },
        { type: 'tip', text: "Si Vexor est vivant et racheté, il peut devenir un allié précieux. Sa connaissance de la nécromancie et du Cercle des Cendres est inestimable. Il connaît l'identité et les faiblesses des autres Archons." },
        { type: 'secret', text: "Pendant le repos, un messager ailé arrive de Sol-Aureus. Le Cercle des Cendres a lancé une offensive majeure. Plusieurs villes frontières sont tombées. La Reine Elara convoque un conseil de guerre. Le troisième composant devra attendre - la politique et la guerre appellent en premier." },
        { type: 'lore', text: "Avec la chute de Vexor, les Terres Brûlées commenceront lentement à guérir. Dans quelques décennies, l'herbe repoussera. Dans quelques siècles, des forêts. La terre se souvient de ce qu'elle était, et elle veut y revenir." },
      ],
      nextScenes: ['scene-4-10-1'],
      previousScene: 'scene-4-9-3',
    },
  ],
};

// ============================================================================
// CHAPITRE 10 : L'ALLIANCE IMPOSSIBLE
// ============================================================================

const CHAPTER_10: BookChapter = {
  id: 'ch-4-10',
  actNumber: 4,
  chapterNumber: 10,
  title: "L'Alliance Impossible",
  subtitle: "Unir ceux qui refusent d'être unis",
  summary: "Les héros retournent à Sol-Aureus pour un défi d'un autre genre : la diplomatie. Ils doivent convaincre le Syndicat de l'Ombre de rejoindre l'alliance, obtenir les connaissances cruciales de la Guilde des Arcanes, organiser un grand conseil de guerre, et préparer la coalition finale avant l'assaut du Cercle des Cendres. Politique, trahison, et espoir se mêlent.",
  levelRange: "14-16",
  themes: ['diplomatie', 'intrigue', 'unité', 'préparation à la guerre'],
  chapterIntro: {
    text: `Sol-Aureus n'est plus la Cité Dorée que vous avez quittée.

Les murailles sont renforcées de contreforts de terre et de bois. Des balistes hérissent chaque tour. Les rues autrefois joyeuses et bruyantes sont silencieuses, parcourues par des patrouilles militaires et des civils aux visages tendus. Les tavernes sont à moitié vides - ou à moitié pleines de soldats qui boivent pour oublier.

La guerre est là. Pas aux portes, pas encore, mais dans l'air. Dans les yeux des gens. Dans le bruit constant des forges qui produisent des armes au lieu de casseroles. Dans les listes de noms affichées sur les murs du temple - les morts des batailles frontalières, plus longues chaque semaine.

Mais il y a aussi de l'espoir. Votre retour, avec deux composants du Grand Rituel, a rallumé une flamme. Les gens murmurent vos noms dans les rues. Les soldats se redressent quand vous passez. Les enfants jouent à être vous.

La Reine Elara vous attend au Palais Royal. Et avec elle, une salle pleine de visages qui ne s'aiment pas, ne se font pas confiance, et devront pourtant se battre ensemble si le monde doit survivre.

Le plus grand combat de votre vie ne se fera pas avec des épées. Il se fera avec des mots.`,
    mood: "Politique tendue, espoir fragile, poids de la responsabilité",
    music: "Thème de Sol-Aureus assombri, cordes tendues, trompettes militaires au loin",
  },
  chapterConclusion: {
    text: `Le Grand Conseil de Guerre est terminé. Les bannières de sept factions différentes flottent côte à côte dans la grande salle du Palais Royal - un spectacle que personne n'aurait cru possible il y a un mois.

Les nains de Forgefer. Les mages de la Guilde des Arcanes. Les agents du Syndicat de l'Ombre. Les chevaliers de l'Aube d'Argent. L'armée royale de Sol-Aureus. Les Gardiens d'Émeraude. Et si Vexor a été racheté, même un ancien ennemi devenu allié.

La Reine Elara se lève. Sa voix ne tremble pas.

« Le Cercle des Cendres croit que la division est notre faiblesse. Aujourd'hui, nous leur prouvons qu'elle est notre force. Sept factions, sept visions du monde, sept manières de se battre - unies par un seul objectif : que le monde survive à demain. »

Elle tire son épée et la lève vers le plafond. Une à une, les autres lames se joignent à la sienne. Le son du métal contre le métal résonne comme un serment.

Dehors, les forges de Sol-Aureus brûlent plus fort que jamais. Les armées se rassemblent. Les mages préparent le Grand Rituel. Et quelque part dans l'ombre, le Cercle des Cendres observe, et tremble.

La guerre finale approche. Et pour la première fois, le monde est prêt.`,
    mood: "Triomphant, unitaire, prêt pour la bataille finale",
    music: "Thème héroïque principal, tous instruments, chœur de victoire, crescendo final",
  },
  rewards: { xp: 20000, gold: "5 000 po + équipement militaire", items: ["Troisième composant du Grand Rituel (révélé par la Guilde)", "Réseau d'espions du Syndicat (avantage sur renseignement)", "Bénédiction de la Coalition (avantage aux jets de moral en bataille)", "Carte stratégique du Cercle des Cendres (volée par le Syndicat)"] },
  scenes: [
    // --- Scène 1 : Le Syndicat de l'Ombre ---
    {
      id: 'scene-4-10-1',
      sceneNumber: 1,
      title: "Dans l'Ombre de la Cité",
      type: 'social',
      location: "Quartier Bas de Sol-Aureus, repaire du Syndicat",
      locationId: 'sol-aureus-quartier-bas',
      estimatedMinutes: 40,
      readAloud: {
        text: `Le Quartier Bas de Sol-Aureus n'apparaît sur aucune carte officielle. C'est un labyrinthe de ruelles étroites, de passages couverts et de caves interconnectées qui s'étend sous le quartier des marchands comme un système nerveux parallèle. Ici, les règles de la surface ne s'appliquent pas. L'or parle plus fort que les lois, et le silence s'achète.

Votre contact - une gamine d'une douzaine d'années aux yeux trop vieux pour son visage - vous guide à travers un dédale de tunnels humides, de portes dérobées et de mots de passe murmurés dans des grilles. Trois fois, vous jurez avoir fait demi-tour. Trois fois, vous arrivez dans un endroit nouveau.

Finalement, la gamine s'arrête devant une porte anonyme dans un mur de brique. Elle frappe trois coups, pause, deux coups, pause, un coup. La porte s'ouvre sur une salle qui n'a aucun droit d'exister : vaste, luxueuse, éclairée par des lanternes de verre coloré. Des tapis moelleux, des meubles de bois sombre, des étagères de livres. C'est le salon d'un noble transplanté dans un égout.

Au centre de la salle, dans un fauteuil qui ressemble à un trône discret, une silhouette vous attend. Vous ne pouvez pas la décrire. Non pas parce qu'elle est dans l'ombre - l'éclairage est bon. Mais votre regard glisse sur cette personne comme l'eau sur une pierre polie. Homme ? Femme ? Âge ? Race ? Impossible à déterminer. C'est comme si votre cerveau refusait de retenir les détails.

Une voix s'élève. Ni grave ni aiguë. Ni chaude ni froide. Neutre comme un miroir.

« Héros d'Aethelgard. Vainqueurs du dragon. Destructeurs de l'Archon. Votre réputation vous précède. Et les réputations, dans mon monde, sont la monnaie la plus dangereuse. Asseyez-vous. Parlons affaires. »`,
        mood: "Intrigue, danger élégant, jeu d'échecs verbal",
        music: "Jazz sombre, contrebasse, notes feutrées, silence calculé",
      },
      gmNotes: [
        { type: 'info', text: "L'Ombre est le leader du Syndicat de l'Ombre, le réseau criminel le plus puissant d'Aethelgard. Personne ne connaît son identité. Il/elle utilise une magie d'aversion qui empêche de mémoriser ses traits. Le Syndicat est crucial pour l'effort de guerre : réseau d'espions, contrebande d'armes, sabotage derrière les lignes ennemies." },
        { type: 'warning', text: "NE JAMAIS laisser les joueurs attaquer L'Ombre. Premièrement, elle est entourée de 40 assassins invisibles (pas une exagération). Deuxièmement, le Syndicat se retournerait contre Sol-Aureus. Troisièmement, L'Ombre a des informations vitales. C'est une scène SOCIALE." },
        { type: 'secret', text: "L'Ombre a une raison personnelle de vouloir la chute du Cercle : le Cercle a détruit le réseau sud du Syndicat, tué 200 agents, et pris le contrôle des routes de contrebande des Terres Brûlées. La guerre du Cercle est mauvaise pour les affaires." },
        { type: 'tip', text: "L'Ombre respecte trois choses : l'intelligence, la franchise sur les motifs (pas la franchise morale), et la valeur d'un marché. Ne pas essayer de bluffer - L'Ombre est un maître bluffeur qui détecte les mensonges. Proposer un marché concret." },
        { type: 'lore', text: "Le Syndicat de l'Ombre existe depuis 300 ans. Chaque leader prend le nom de 'L'Ombre'. Personne ne sait combien il y en a eu. Le Syndicat ne vole pas les pauvres, ne tue pas les innocents (en théorie), et ne trahit jamais un contrat signé. Ce sont des criminels, mais des criminels avec un code." },
      ],
      npcs: [
        {
          name: "L'Ombre",
          role: "Leader du Syndicat de l'Ombre",
          personality: "Impossible à cerner. Tour à tour amusé, menaçant, philosophe, pragmatique. Chaque mot est pesé. Chaque silence est une arme. Ne révèle jamais plus que nécessaire.",
          appearance: "Indescriptible. La magie d'aversion empêche de retenir ses traits. Silhouette dans un fauteuil. Une voix neutre. Des mains gantées de soie noire. C'est tout ce que l'esprit accepte de retenir.",
          secret: "L'Ombre actuelle est la première Ombre à être née dans le Syndicat - enfant de deux agents. Elle (car c'est une femme, bien que personne ne le sache) considère le Syndicat comme sa famille et Aethelgard comme son terrain de jeu. Elle protège les deux.",
          dialogues: {
            greeting: "« Trois questions avant que nous commencions. Première : savez-vous combien de mes agents vous ont suivi depuis les portes de la ville ? Non ? Douze. Deuxième : savez-vous combien sont dans cette pièce en ce moment ? Non ? Suffisamment. Troisième : savez-vous ce que je veux ? Ah, enfin une bonne question. »",
            info: "« Le Cercle des Cendres est mauvais pour les affaires. Leurs morts-vivants ne consomment rien, ne paient rien, ne négocient rien. Un monde gouverné par le Cercle est un monde sans commerce, sans désir, sans vice. En d'autres termes, un monde sans raison d'être pour moi. Nos intérêts sont alignés. Pour l'instant. »",
            quest: "« Mon prix est simple. Quand cette guerre sera finie - et elle sera finie, d'une manière ou d'une autre - le Syndicat obtient une amnistie royale. Pas la légalité, non. L'immunité. Pendant dix ans. Pas d'enquêtes, pas de raids, pas de procès. En échange, vous aurez mes espions, mes routes, mes saboteurs, et une information que personne d'autre ne possède. »",
            farewell: "« Un plaisir de faire affaires. Ne cherchez pas à me retrouver - c'est moi qui vous trouverai. Et ne vous inquiétez pas pour la gamine qui vous a guidés. Elle sera devant votre auberge demain matin. Elle sera votre contact. Son nom est Pluie. Ne lui offrez pas de bonbons. Elle préfère les pièces d'or. »",
          },
          stats: { hp: 120, atk: 22, ac: 22 },
        },
      ],
      choices: [
        {
          id: 'choice-4-10-1-ombre',
          prompt: "Comment les héros négocient-ils avec L'Ombre ?",
          options: [
            {
              label: "Accepter le marché tel quel",
              description: "Dix ans d'amnistie en échange du soutien total du Syndicat. Pragmatique mais moralement discutable.",
              consequence: "Le Syndicat rejoint pleinement la coalition. Réseau d'espions, saboteurs, et information cruciale obtenue. La Reine Elara sera contrariée mais comprendra.",
              nextScene: 'scene-4-10-2',
              reputationChange: [{ faction: 'Syndicat de l\'Ombre', amount: 5 }, { faction: 'Sol-Aureus', amount: -1 }],
            },
            {
              label: "Négocier les termes",
              description: "Proposer une amnistie de cinq ans au lieu de dix, ou ajouter des conditions (pas de meurtres, pas de traite).",
              consequence: "Jet de Persuasion CD 60. L'Ombre respecte la négociation. Compromis = alliance solide avec des limites.",
              nextScene: 'scene-4-10-2',
              skillCheck: { skill: 'Persuasion', dc: 60, success: "L'Ombre reste silencieuse un long moment. « Cinq ans. Pas de traite d'êtres. Pas d'assassinats politiques. Le reste est négociable. Vous êtes plus malins que je ne le pensais. J'aime ça. Marché conclu. »", failure: "« Vous marchandez avec L'Ombre du Syndicat comme on marchande avec un poissonnier. Charmant. Dix ans. Non négociable. Prenez ou laissez. » Le prix ne baisse pas, mais la porte reste ouverte." },
              reputationChange: [{ faction: 'Syndicat de l\'Ombre', amount: 3 }, { faction: 'Sol-Aureus', amount: 1 }],
            },
            {
              label: "Appel à l'honneur caché",
              description: "Tenter de toucher la part de L'Ombre qui protège Aethelgard, pas seulement ses affaires.",
              consequence: "Jet de Perspicacité CD 55 pour trouver la corde sensible, puis Persuasion CD 55. Le plus risqué mais le plus récompensant.",
              nextScene: 'scene-4-10-2',
              skillCheck: { skill: 'Perspicacité', dc: 55, success: "Vous percevez une fissure dans la façade parfaite de L'Ombre. Un micro-tremblement dans la voix quand les enfants du quartier sont mentionnés. Une pause trop longue quand on parle des civils morts aux frontières. L'Ombre n'est pas qu'un criminel. L'Ombre est un protecteur.", failure: "L'Ombre est un mur lisse. Aucune émotion ne filtre. Le masque est parfait. Vous revenez à une négociation classique." },
              reputationChange: [{ faction: 'Syndicat de l\'Ombre', amount: 4 }, { faction: 'Sol-Aureus', amount: 2 }],
            },
          ],
        },
      ],
      skillChecks: [
        { skill: 'Perception', dc: 60, success: "Vous repérez trois des assassins cachés de L'Ombre. Leurs positions suggèrent un plan d'évacuation, pas un plan d'attaque. L'Ombre ne prévoit pas de vous tuer - elle prévoit de fuir si les choses tournent mal. Elle a plus à perdre qu'elle ne le montre.", failure: "La pièce semble vide à part L'Ombre et vous. Mais les poils de votre nuque ne se couchent pas. Vous êtes observés. C'est certain." },
      ],
      nextScenes: ['scene-4-10-2'],
      previousScene: 'scene-4-9-4',
      mapMovement: { from: 'ashka-nour-ruines', to: 'sol-aureus-quartier-bas' },
    },

    // --- Scène 2 : La Guilde des Arcanes ---
    {
      id: 'scene-4-10-2',
      sceneNumber: 2,
      title: "Les Secrets de la Tour",
      type: 'revelation',
      location: "Tour des Arcanes, Sol-Aureus",
      locationId: 'tour-des-arcanes',
      estimatedMinutes: 35,
      readAloud: {
        text: `La Tour des Arcanes est le bâtiment le plus étrange de Sol-Aureus. Vue de l'extérieur, c'est une spirale impossible de cristal et de métal qui défie les lois de la géométrie - certains angles n'existent pas en trois dimensions, et le regard glisse sur certaines surfaces comme si elles n'étaient pas tout à fait là.

À l'intérieur, c'est pire.

Les escaliers montent et descendent simultanément. Les couloirs changent de longueur selon la direction. Une porte peut mener au même endroit qu'une autre porte à un étage différent. Les apprentis portent des boussoles spéciales qui indiquent « la direction que vous vouliez prendre » au lieu du nord.

L'Archimage Vaelith vous reçoit au sommet de la Tour, dans une salle circulaire dont les murs sont faits de pur cristal enchevêtré. À travers eux, vous pouvez voir tout Sol-Aureus - chaque rue, chaque maison, chaque personne. C'est magnifique et terrifiant.

Vaelith est une haute elfe d'un âge incalculable. Sa peau est d'un bleu pâle, presque luminescente. Ses yeux - sans pupille, d'un blanc nacré - voient des choses que les yeux normaux ne perçoivent pas. Ses cheveux argentés flottent autour de sa tête comme s'ils étaient sous l'eau, défiant la gravité avec une nonchalance qui ne s'enseigne pas.

Elle ne se lève pas quand vous entrez. Elle est assise en tailleur à un mètre du sol, entourée de livres ouverts qui flottent en orbite autour d'elle comme des planètes autour d'un soleil. Ses doigts tracent des runes dans l'air - des signes lumineux qui persistent quelques secondes avant de se dissoudre.

« J'ai lu les rapports. Le dragon de cristal. Le nécromancien. Les composants. Impressionnant. Mais incomplet. » Elle lève les yeux. « Vous avez deux pièces d'un puzzle de trois. Devinez où se trouve la troisième. »

Elle pointe vers le bas. Vers les profondeurs de la Tour. Vers les archives interdites que personne n'a ouvertes depuis des siècles.

« Sous nos pieds. Depuis le début. »`,
        mood: "Mystère académique, révélation majeure, vertige intellectuel",
        music: "Thème de la Guilde, harpe cristalline, résonance magique, chœur éthéré",
      },
      gmNotes: [
        { type: 'info', text: "Grande révélation : le troisième composant du Grand Rituel est le Cœur de Cristal, enfermé dans les archives scellées sous la Tour des Arcanes. La Guilde le gardait sans savoir ce que c'était - un artefact 'trop dangereux pour être étudié' scellé par les fondateurs il y a 800 ans." },
        { type: 'warning', text: "Vaelith est une alliée, mais elle a ses propres conditions. Elle veut que la Guilde soit impliquée dans le Grand Rituel - pas seulement en tant que fournisseur de composant, mais en tant que participant. La Guilde veut étudier le processus. Certains joueurs pourraient trouver cela suspect." },
        { type: 'secret', text: "Vaelith sait plus qu'elle ne dit. Les fondateurs de la Guilde étaient d'anciens mages ashkans qui ont fui avant la chute. Ils ont emporté le Cœur de Cristal pour le soustraire à l'empereur. La Guilde est née pour protéger cet artefact. Tout le reste - l'enseignement, la recherche - est venu après." },
        { type: 'tip', text: "Les archives scellées sont protégées par des défenses magiques anciennes. Vaelith peut les ouvrir, mais elle a besoin de l'aide des héros car les protections nécessitent 'un cœur pur, une volonté de fer, et un sang qui a connu le feu'. Autrement dit, quelqu'un qui a affronté un dragon." },
        { type: 'lore', text: "Le Cœur de Cristal est le complément parfait de l'Enclume Primordiale et du Nexus d'Ashka. L'Enclume forge, le Nexus canalise, et le Cœur stabilise. Ensemble, ils peuvent recréer la magie originelle des sceaux primordiaux." },
      ],
      npcs: [
        {
          name: "Archimage Vaelith",
          role: "Directrice de la Guilde des Arcanes",
          personality: "Brillante au point d'en être agaçante. Parle en énigmes par habitude, pas par malice. Profondément dévouée à la connaissance et à la protection du monde. Cache une angoisse existentielle sous un masque d'assurance académique.",
          appearance: "Haute elfe, peau bleu pâle luminescente, yeux blancs nacrés sans pupille. Cheveux argentés en apesanteur. Robes de soie indigo couvertes de runes mouvantes. Doigts tachés d'encre de toutes les couleurs.",
          secret: "Vaelith sait que le Grand Rituel a un prix. Quelqu'un devra servir de conduit pour la magie des trois composants. Ce conduit sera transformé - pas tué, mais changé à jamais. Elle cherche un volontaire sans le dire ouvertement.",
          dialogues: {
            greeting: "« Vous dégagez une aura fascinante. Du fer météorique, de la cendre nécrotique, et quelque chose d'ancien. Vous avez touché des artefacts que la plupart des mages ne voient qu'en rêve. Asseyez-vous - ou flottez, si vous préférez. »",
            info: "« Le Grand Rituel n'est pas un sort. C'est une symphonie. L'Enclume est le rythme - stable, inébranlable. Le Nexus est la mélodie - puissante, complexe. Et le Cœur de Cristal est l'harmonie - ce qui lie les deux et les rend plus que la somme de leurs parties. Sans les trois, le rituel n'est qu'un bruit. »",
            quest: "« Les archives scellées sont protégées par des défenses que je ne peux pas désactiver seule. Les fondateurs étaient paranoïaques - avec raison. Il faut quelqu'un qui a été touché par le feu primordial pour passer les gardiens. Le souffle d'un dragon de cristal, par exemple. Quelle heureuse coïncidence. »",
            farewell: "« Le savoir est la lumière. Mais toute lumière projette une ombre. N'oubliez pas de regarder dans l'ombre aussi. C'est là que se cachent les vérités inconfortables. »",
          },
          stats: { hp: 110, atk: 24, ac: 19 },
        },
      ],
      choices: [
        {
          id: 'choice-4-10-2-guilde',
          prompt: "Comment les héros réagissent-ils à la révélation de Vaelith ?",
          options: [
            {
              label: "Descendre immédiatement dans les archives",
              description: "Le temps presse. Récupérer le Cœur de Cristal maintenant.",
              consequence: "Mini-dungeon dans les archives. Pièges magiques, gardiens élémentaires, et une épreuve de volonté pour atteindre le Cœur.",
              nextScene: 'scene-4-10-3',
            },
            {
              label: "Exiger la vérité complète à Vaelith",
              description: "Elle cache quelque chose. Le prix du rituel, les secrets de la Guilde.",
              consequence: "Jet de Persuasion ou Intimidation CD 55. Vaelith révèle le prix du Grand Rituel (le conduit) et l'origine ashkane de la Guilde.",
              nextScene: 'scene-4-10-3',
              skillCheck: { skill: 'Persuasion', dc: 55, success: "Vaelith soupire. Pour la première fois, elle a l'air fatiguée. Vieille. « Vous avez raison. Il y a un prix. Le Grand Rituel nécessite un conduit vivant. Quelqu'un qui canalise le pouvoir des trois composants à travers son corps. Ce conduit sera... transformé. Pas mort. Mais plus vraiment mortel non plus. C'est le prix. Et je ne sais pas comment le réduire. »", failure: "Vaelith sourit poliment. « Je vous ai dit tout ce que vous avez besoin de savoir. Pour l'instant. Le reste viendra quand vous serez prêts à l'entendre. Faites-moi confiance. » Son sourire ne rassure personne." },
              reputationChange: [{ faction: 'Guilde des Arcanes', amount: -1 }],
            },
            {
              label: "Proposer une alliance formelle",
              description: "Offrir à la Guilde un siège au conseil de guerre et un rôle central dans le Grand Rituel.",
              consequence: "Vaelith accepte avec enthousiasme. La Guilde mobilise ses meilleurs mages pour le rituel. Alliance renforcée.",
              nextScene: 'scene-4-10-3',
              reputationChange: [{ faction: 'Guilde des Arcanes', amount: 3 }],
            },
          ],
        },
      ],
      nextScenes: ['scene-4-10-3'],
      previousScene: 'scene-4-10-1',
      mapMovement: { from: 'sol-aureus-quartier-bas', to: 'tour-des-arcanes' },
    },

    // --- Scène 3 : Le Conseil de Guerre ---
    {
      id: 'scene-4-10-3',
      sceneNumber: 3,
      title: "Le Grand Conseil de Guerre",
      type: 'social',
      location: "Grande Salle du Conseil, Palais Royal de Sol-Aureus",
      locationId: 'palais-royal',
      estimatedMinutes: 45,
      readAloud: {
        text: `La Grande Salle du Conseil du Palais Royal n'a pas vu autant de monde depuis le couronnement de la Reine Elara. Peut-être même jamais.

Autour de la table massive - une dalle de marbre blanc veinée d'or en forme d'étoile à sept branches - se tiennent les représentants de chaque faction d'Aethelgard. Et entre eux, la tension est si épaisse qu'on pourrait la trancher à la hache.

Au nord de la table, la Reine Elara, en armure de cérémonie, le visage grave. À ses côtés, le Général Marcus, mâchoire carrée, cicatrices, regard de rapace. Derrière eux, les bannières royales de Sol-Aureus.

À l'est, le Roi Thrain Forge-Flamme, ses bras croisés sur sa cuirasse, entouré de ses gardes d'honneur. Il regarde les humains avec une méfiance polie qui ne trompe personne.

Au sud, l'Archimage Vaelith flotte légèrement au-dessus de sa chaise, entourée de glyphes lumineux. Les soldats la regardent avec un mélange de respect et de malaise.

À l'ouest, une chaise vide. Ou pas. L'Ombre est là, quelque part. Vous le savez parce que la chaise est tiède et qu'un verre de vin se vide tout seul.

Et entre eux tous, dispersés autour de la table, les commandants des Gardiens d'Émeraude, les paladins de l'Aube d'Argent, et vous. Les héros. Ceux qui doivent transformer cette poudre explosive de personnalités en une arme cohérente.

Le Général Marcus pose ses poings sur la table. Sa voix est celle d'un homme habitué à donner des ordres et à être obéi.

« Voici la situation. Le Cercle des Cendres a pris quatre villes frontalières. Leurs armées marchent vers le Val Doré. Nous avons peut-être six semaines avant qu'ils n'atteignent Sol-Aureus. Six semaines pour préparer le Grand Rituel, unifier nos forces, et contre-attaquer. Je ne vais pas vous mentir : les probabilités sont contre nous. Mais les probabilités ne connaissent pas les nains. Ni les mages. Ni les... » Il jette un regard vers la chaise apparemment vide. « ...nos autres alliés. Alors voici le plan. Si plan il y a. »`,
        mood: "Tension politique, enjeux maximaux, personnalités fortes",
        music: "Thème de guerre, tambours militaires sourds, cordes tendues, cuivres retenus",
      },
      gmNotes: [
        { type: 'info', text: "Le conseil de guerre est la scène sociale culminante de l'Acte IV. Chaque faction a ses propres priorités et les joueurs doivent arbitrer les conflits. C'est un test de leadership et de diplomatie." },
        { type: 'warning', text: "Les conflits inter-factions sont réels : Thrain méprise la magie non-naine, Vaelith considère les soldats comme des brutes, L'Ombre irrite tout le monde par son existence même, Marcus veut un commandement unifié (sous lui), et les paladins veulent détruire le Syndicat. Sans intervention des joueurs, le conseil dégénère." },
        { type: 'secret', text: "Un espion du Cercle est présent dans l'entourage du Général Marcus : son aide de camp, Lieutenant Cassius. Il transmettra tout ce qui se dit ici. Les joueurs peuvent le démasquer (Perspicacité CD 60 ou Investigation dans ses quartiers)." },
        { type: 'tip', text: "Donnez à chaque joueur un rôle : un médiateur entre les factions, un stratège militaire, un diplomate, un enquêteur (pour l'espion). Chaque résolution de conflit réussie renforce la coalition et améliore les chances à l'Acte V." },
        { type: 'lore', text: "La dernière fois qu'Aethelgard a formé une coalition similaire, c'était pour renverser l'Empire Ashka il y a 120 ans. Cette coalition a mis vingt ans à se former. Les héros doivent faire la même chose en six semaines." },
      ],
      npcs: [
        {
          name: "Général Marcus Fer-de-Lance",
          role: "Commandant suprême des armées de Sol-Aureus",
          personality: "Pragmatique, direct, sans patience pour la politique. Soldat né, stratège brillant, diplomate désastreux. Respecte la compétence, méprise l'inaction.",
          appearance: "Humain, la cinquantaine, cheveux gris coupés court. Mâchoire carrée, nez cassé deux fois. Armure de plate fonctionnelle sans ornement. Épée longue au côté, toujours. Même au conseil.",
          secret: "Marcus sait que Sol-Aureus ne peut pas gagner seule. Il a calculé les pertes. Sans la coalition, c'est l'extermination. Il jouera n'importe quel jeu politique pour maintenir l'alliance, même s'il déteste ça.",
          dialogues: {
            greeting: "« Pas de discours. Pas de cérémonies. On a six semaines et assez de problèmes pour remplir un siècle. Qu'est-ce que chacun apporte à la table ? Concrètement. »",
            info: "« Le Cercle a cinquante mille combattants. Vingt mille morts-vivants, quinze mille fanatiques humains, dix mille créatures invoquées, et cinq mille Archons et leurs élites. En face, nous avons... moins. Beaucoup moins. Qualité contre quantité. C'est notre seule chance. »",
            quest: "« J'ai besoin de trois choses : du temps pour préparer les défenses, des éclaireurs pour surveiller l'avancée ennemie, et quelqu'un capable de mener un raid derrière les lignes pour ralentir leur marche. Devinez qui je regarde. »",
            farewell: "« On se revoit à l'aube. Et chaque aube après, jusqu'à ce qu'on gagne ou qu'on meure. Dormez bien. C'est un ordre. »",
          },
          stats: { hp: 130, atk: 20, ac: 20 },
        },
      ],
      choices: [
        {
          id: 'choice-4-10-3-council',
          prompt: "Comment les héros gèrent-ils les tensions du conseil ?",
          options: [
            {
              label: "Médiation active",
              description: "Intervenir à chaque conflit, proposer des compromis, maintenir le dialogue.",
              consequence: "Jet de Persuasion CD 55. Succès = tous les conflits sont résolus, coalition solide. Échec partiel = certaines tensions persistent mais le conseil aboutit.",
              nextScene: 'scene-4-10-4',
              skillCheck: { skill: 'Persuasion', dc: 55, success: "Votre patience et votre diplomatie portent leurs fruits. Un par un, les ego se calment, les priorités s'alignent. Même Thrain et Vaelith trouvent un terrain d'entente sur la stratégie magique. La coalition est solide.", failure: "Malgré vos efforts, Thrain et L'Ombre refusent de se parler directement. La coalition existe, mais avec des fissures. Chaque faction coopérera, mais pas avec enthousiasme. C'est le mieux que vous puissiez obtenir." },
              reputationChange: [{ faction: 'Sol-Aureus', amount: 3 }, { faction: 'Guilde des Arcanes', amount: 1 }],
            },
            {
              label: "Discours inspirant",
              description: "Prendre la parole pour rappeler à tous ce qui est en jeu. Pas de la politique - de l'émotion brute.",
              consequence: "Jet de Charisme brut CD 60. Un discours qui marque l'histoire. Ou un moment gênant.",
              nextScene: 'scene-4-10-4',
              skillCheck: { skill: 'Persuasion', dc: 60, success: "Vos mots résonnent dans la salle comme un coup de tonnerre. Le silence qui suit n'est pas de la gêne - c'est du respect. Même L'Ombre applaudit lentement. « Bien dit, héros. Très bien dit. » La coalition se forge dans cet instant, scellée par vos paroles.", failure: "Votre discours est sincère mais maladroit. Les mots ne viennent pas comme vous le souhaitiez. Mais la sincérité a son propre pouvoir. Le conseil continue, et vos actions passées parlent plus fort que vos mots." },
              reputationChange: [{ faction: 'Sol-Aureus', amount: 4 }, { faction: 'Nains de Forgefer', amount: 2 }, { faction: 'Guilde des Arcanes', amount: 2 }],
            },
            {
              label: "Démasquer l'espion",
              description: "Concentrer les efforts sur la sécurité du conseil. Trouver et exposer le traître.",
              consequence: "Jet de Perspicacité CD 60 puis Investigation CD 55. Démasquer Cassius unit les factions contre un ennemi commun.",
              nextScene: 'scene-4-10-4',
              skillCheck: { skill: 'Perspicacité', dc: 60, success: "Le Lieutenant Cassius transpire. Ses yeux bougent trop vite. Sa main gauche tremble imperceptiblement quand Marcus révèle les positions des troupes. Quand vous l'accusez, il tente de fuir. L'Ombre, qui l'avait repéré depuis le début, le plaque au sol. « Je me demandais quand vous alliez le voir. »", failure: "Rien ne sort de l'ordinaire. Tout le monde est nerveux, tout le monde transpire. S'il y a un traître, il est meilleur que vous à ce jeu." },
              reputationChange: [{ faction: 'Sol-Aureus', amount: 2 }],
            },
          ],
        },
      ],
      skillChecks: [
        { skill: 'Histoire', dc: 50, success: "Vous citez les précédents historiques de coalitions réussies, y compris les stratégies qui ont fonctionné contre l'Empire Ashka. Les commandants sont impressionnés par votre érudition.", failure: "L'histoire n'est pas votre fort. Mais vous vous rattrapez avec du bon sens et de l'expérience de terrain." },
      ],
      nextScenes: ['scene-4-10-4'],
      previousScene: 'scene-4-10-2',
      mapMovement: { from: 'tour-des-arcanes', to: 'palais-royal' },
    },

    // --- Scène 4 : L'Aube de la Guerre ---
    {
      id: 'scene-4-10-4',
      sceneNumber: 4,
      title: "Veillée d'Armes",
      type: 'transition',
      location: "Remparts de Sol-Aureus, à l'aube",
      locationId: 'sol-aureus',
      estimatedMinutes: 20,
      readAloud: {
        text: `C'est l'aube du dernier jour de paix.

Vous êtes sur les remparts de Sol-Aureus, face à l'est. Le soleil se lève lentement, peignant le ciel de nuances de rose et d'or qui semblent cruellement belles pour un monde au bord de la guerre. En contrebas, la ville s'éveille - mais pas comme avant. Pas avec le bruit des marchands et des enfants. Avec le bruit des forges, des ordres criés, des bottes sur le pavé.

Les armées se rassemblent. Sur la grande place devant le palais, les bannières flottent côte à côte pour la première fois de l'histoire :

Le marteau et l'enclume de Forgefer, en argent sur fond rouge sombre.
L'étoile cristalline de la Guilde des Arcanes, en bleu sur fond blanc.
Le soleil et l'épée de Sol-Aureus, en or sur fond azur.
Le chêne couronné des Gardiens d'Émeraude, en vert sur fond brun.
L'aube d'argent des Paladins, en blanc sur fond argent.
Et quelque part, invisible mais présente, l'ombre du Syndicat qui ne porte pas de bannière mais porte le poids du monde dans ses secrets.

Le Général Marcus passe les troupes en revue. Le Roi Thrain inspecte les défenses avec un œil critique de forgeron. Vaelith et ses mages tissent les dernières protections sur les murailles. L'Ombre... est quelque part. Faisant ce que L'Ombre fait.

Et vous êtes là, sur ces remparts, entre la lumière de l'aube et l'ombre de ce qui vient. Héros. Commandants. Porteurs d'espoir.

Quelqu'un s'approche. C'est un enfant - un garçon d'une dizaine d'années, pieds nus, joues sales. Il vous regarde avec des yeux énormes, pleins de cette foi absolue que seuls les enfants possèdent.

« Vous allez gagner, hein ? » demande-t-il. Ce n'est pas vraiment une question.

Le soleil se lève. La guerre attend.

Et tout ce qui reste entre le monde et les ténèbres, c'est vous.`,
        mood: "Calme avant la tempête, beauté poignante, poids du destin",
        music: "Aube orchestrale, cordes lentes, hautbois mélancolique, montée progressive vers l'espoir",
      },
      gmNotes: [
        { type: 'info', text: "Scène de transition émotionnelle. Pas de mécanique, pas de jets de dés. C'est le moment pour les joueurs de réfléchir, de parler entre eux, de préparer leurs personnages émotionnellement pour l'Acte V." },
        { type: 'tip', text: "Demandez à chaque joueur ce que son personnage fait la nuit avant la bataille. Écrit-il une lettre ? Prie-t-il ? S'entraîne-t-il ? Boit-il ? Ces moments de calme sont souvent les plus mémorables de la campagne." },
        { type: 'secret', text: "Pendant la nuit, Vaelith cherche un des héros en privé. Elle révèle le prix du Grand Rituel à celui qui lui semble le plus capable de le supporter. Le conduit sera transformé - immortel, mais détaché de l'humanité. C'est la graine de l'Acte V." },
        { type: 'lore', text: "La tradition de Sol-Aureus veut que la nuit avant une bataille, les cloches du Grand Temple de Solarius sonnent sans interruption de minuit à l'aube. Chaque coup est dédié aux morts à venir. Cette nuit, les cloches sonneront sept mille fois." },
      ],
      loot: ["Bénédiction de la Coalition (+1 à tous les jets de sauvegarde jusqu'à la fin de l'Acte V)", "Trois potions de soins supérieurs (offertes par la Guilde)", "Rune de Rappel (téléportation unique vers Sol-Aureus, offerte par Vaelith)", "Lettre scellée de la Reine Elara (sauf-conduit universel dans tout Aethelgard)"],
      nextScenes: ['scene-5-11-1'],
      previousScene: 'scene-4-10-3',
    },
  ],
};

// ============================================================================
// EXPORT
// ============================================================================

export const ACT_4_CHAPTERS: BookChapter[] = [CHAPTER_8, CHAPTER_9, CHAPTER_10];

ACT_4.chapters = ACT_4_CHAPTERS;
