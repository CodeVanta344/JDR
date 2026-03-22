/**
 * GUIDE NARRATIF — ACTE 4 : LA GUERRE DES SCEAUX
 * Niveaux 12-16 — Guerre ouverte, héroïsme, rassemblement des composants du Grand Rituel
 * Chapitres 8, 9, 10
 */

import type { NarrativeScene } from './narrative-guide-data';

// ============================================================================
// CHAPITRE 8 : LA FORGE DU MONDE (Niveau 12-13)
// Monts Cœur-de-Fer — Mines profondes, forges ancestrales, dragon gardien
// ============================================================================

const ACT4_SCENES: NarrativeScene[] = [
  {
    id: 'ch8_s1_approche_monts',
    chapterId: 'ch8',
    sceneNumber: 1,
    title: 'L\'Ascension des Cimes de Fer',
    type: 'narration',
    readAloud: `Les Monts Cœur-de-Fer se dressent devant vous comme les crocs d'un monde ancien, leurs sommets couronnés de nuages d'orage permanents que strient des éclairs silencieux. Le sentier de pierre taillée par les nains il y a mille ans serpente le long de falaises vertigineuses où le vent hurle avec une fureur bestiale.

À mi-hauteur, vous découvrez les premiers signes de la guerre : des tours de guet naines en ruines, leurs murs de granit noircis par le feu. Des bannières déchirées claquent encore dans le vent — le marteau et l'enclume de Karak-Zhul, la citadelle souterraine du Roi Thrain. Des corps de gobelins jonchent le passage, figés dans la mort depuis des jours. Mais parmi eux, des armures naines brisées. La bataille a été féroce.

Au loin, un cor de guerre résonne dans la montagne — grave, profond, ancien. Les nains savent que vous approchez.`,
    gmNotes: `Cette scène établit l'atmosphère de guerre dans les montagnes. Les joueurs arrivent par le Col des Vents Hurlants, seul accès terrestre à Karak-Zhul. Les tours de guet détruites montrent que le Cercle des Cendres a déjà frappé ici — des raids de gobelins corrompus par l'Ombre. Le cor est celui du Thane Borik, chef de la garde extérieure, qui escortera les joueurs jusqu'à la citadelle. Faites sentir l'altitude : essoufflement, froid mordant, vertiges. Un jet de Constitution DC 13 peut être demandé pour les personnages non habitués à la montagne (1 niveau d'épuisement en cas d'échec).`,
    dialogues: [
      {
        npcId: 'npc_thane_borik',
        npcName: 'Thane Borik Marteau-Tonnerre',
        lines: [
          { trigger: 'Accueil', text: `*Un nain massif en armure de mithral, la barbe tressée de fils d'acier, émerge d'un passage camouflé dans la roche, suivi de vingt guerriers.* Halte ! Vous êtes les envoyés de la Reine Elara ? *Il crache par terre.* On vous attendait il y a trois jours. Trois jours pendant lesquels on a repoussé deux assauts. Suivez-moi, et essayez de ne pas tomber dans le vide.`, tone: 'bourru' },
          { trigger: 'Situation', text: `Karak-Zhul tient bon, mais pour combien de temps ? Les tunnels profonds sont infestés. Des créatures d'ombre remontent par les anciennes galeries que même nos ancêtres avaient condamnées. Et le dragon... *Il secoue la tête.* Pyraxis s'est réveillé. Ça n'était pas arrivé depuis deux siècles. Le Roi Thrain vous expliquera.`, tone: 'sombre' },
          { trigger: 'Le chemin', text: `Restez sur le sentier balisé par les runes bleues. Les rouges, c'est piégé — pour les gobelins. Et si vous voyez une ombre bouger là où il n'y a rien pour la projeter... courez. Vite.`, tone: 'pragmatique' }
        ]
      }
    ],
    objectives: [
      { description: 'Traverser le Col des Vents Hurlants', type: 'explore', optional: false },
      { description: 'Rencontrer le Thane Borik et son escorte', type: 'talk', optional: false },
      { description: 'Observer les signes de bataille récente', type: 'investigate', optional: true }
    ],
    transitions: [
      { condition: 'Les joueurs suivent Borik vers Karak-Zhul', nextScene: 'ch8_s2_karak_zhul', label: '→ Entrée dans Karak-Zhul' },
      { condition: 'Les joueurs veulent explorer les ruines des tours de guet', nextScene: 'ch8_s1b_tours_guet', label: '→ Exploration des tours (optionnel)', alternative: 'ch8_s2_karak_zhul' }
    ],
    skillChecks: [
      { skill: 'Constitution', dc: 13, success: 'L\'altitude ne vous affecte pas — votre endurance impressionne les nains.', failure: 'L\'air raréfié vous essouffle. Vous gagnez 1 niveau d\'épuisement jusqu\'au prochain repos long.' },
      { skill: 'Survie', dc: 14, success: 'Vous repérez des traces fraîches de passage gobelin — une troupe d\'éclaireurs, moins de six heures. Borik ordonne une patrouille.', failure: 'Les traces dans la roche vous échappent.' }
    ],
    estimatedMinutes: 15,
    mood: 'épique-sombre',
    music: 'Montagnes — vents, cors nains lointains, tambours de guerre',
    location: 'Monts Cœur-de-Fer — Col des Vents Hurlants'
  },
  {
    id: 'ch8_s1b_tours_guet',
    chapterId: 'ch8',
    sceneNumber: 1.5,
    title: 'Les Tours en Ruines (Optionnel)',
    type: 'exploration',
    readAloud: `Les tours de guet naines, autrefois fières sentinelles de granit, ne sont plus que des carcasses calcinées. À l'intérieur de la plus grande, des signes de résistance acharnée : des barricades improvisées, des carreaux d'arbalète fichés dans les murs, et sur le sol, tracé dans le sang nain, un message : "Ils viennent d'en bas. Fermez les Portes Profondes."

Parmi les décombres, un journal de bord partiellement brûlé raconte les dernières heures de la garnison — l'arrivée des ombres par les fissures dans la roche, les cris dans la nuit, et un nom répété avec terreur : Pyraxis.`,
    gmNotes: `Cette scène optionnelle donne du contexte sur l'ampleur de l'attaque. Le journal de bord mentionne que les créatures d'ombre sont remontées par des fissures sismiques récentes — provoquées par le réveil de Pyraxis. Un jet d'Investigation DC 16 révèle un compartiment secret contenant un Plan de Défense de Karak-Zhul qui pourra être utile plus tard (avantage sur les jets de stratégie dans la citadelle).`,
    dialogues: [],
    objectives: [
      { description: 'Fouiller les tours de guet en ruines', type: 'explore', optional: false },
      { description: 'Trouver le journal de bord de la garnison', type: 'investigate', optional: false },
      { description: 'Découvrir le compartiment secret', type: 'investigate', optional: true }
    ],
    transitions: [
      { condition: 'Exploration terminée', nextScene: 'ch8_s2_karak_zhul', label: '→ Reprendre la route vers Karak-Zhul' }
    ],
    skillChecks: [
      { skill: 'Investigation', dc: 16, success: 'Vous trouvez un compartiment dissimulé derrière une pierre gravée d\'une rune — il contient les plans de défense de Karak-Zhul.', failure: 'Les décombres ne révèlent rien de plus que la désolation.' },
      { skill: 'Histoire', dc: 14, success: 'Vous reconnaissez les symboles sur les murs : des runes de protection naines, brisées de l\'intérieur. Quelqu\'un — ou quelque chose — a désactivé les défenses magiques avant l\'assaut.', failure: 'Les runes brisées ne vous évoquent rien de précis.' }
    ],
    loot: ['Journal de bord du Capitaine Durnik (brûlé partiellement)', 'Plans de Défense de Karak-Zhul (compartiment secret)'],
    estimatedMinutes: 10,
    mood: 'désolation',
    music: 'Ruines — vent dans les pierres, silence pesant',
    location: 'Monts Cœur-de-Fer — Tours de Guet Extérieures'
  },
  {
    id: 'ch8_s2_karak_zhul',
    chapterId: 'ch8',
    sceneNumber: 2,
    title: 'Le Trône sous la Montagne',
    type: 'dialogue',
    readAloud: `Les Portes de Karak-Zhul sont une merveille d'ingénierie : deux battants de mithral hauts de quinze mètres, gravés de scènes de batailles ancestrales et sertis de gemmes qui pulsent d'une lueur bleutée. Elles s'ouvrent dans un grondement de mécanismes titanesques, révélant un hall immense taillé dans la roche vivante.

Des colonnes de basalte poli soutiennent une voûte si haute qu'elle disparaît dans l'obscurité. Des milliers de lanternes à cristal illuminent la cité souterraine — des forges, des habitations creusées dans la pierre, des ponts enjambant des gouffres insondables. Partout, l'activité fébrile d'un peuple en guerre : des forgerons martèlent nuit et jour, des guerriers s'entraînent dans des arènes taillées dans le roc, des civils transportent des provisions vers les niveaux inférieurs.

Au cœur de la citadelle, la Salle du Trône du Roi Thrain. Un trône de fer météorique sur une estrade de quartz fumé. Et dessus, un nain qui semble taillé dans la même montagne que son royaume — barbe blanche comme la neige, yeux de la couleur du minerai en fusion, et sur ses épaules, le poids visible d'un roi qui sait que son peuple pourrait ne pas survivre à l'hiver.`,
    gmNotes: `Le Roi Thrain est un monarque pragmatique, fier mais pas orgueilleux. Il sait que les nains ne peuvent pas tenir seuls. Sa demande est simple : les joueurs doivent descendre dans les Forges Ancestrales, au niveau le plus profond de Karak-Zhul, pour récupérer le Composant du Grand Rituel — le Cœur de Mithral. Problème : Pyraxis, un dragon rouge ancien qui dort dans les profondeurs depuis deux siècles, s'est réveillé et bloque l'accès. Thrain proposera une alliance militaire complète en échange — les armées naines rejoindront la coalition contre le Cercle des Cendres. Le joueur peut négocier des termes supplémentaires avec Diplomatie DC 18.`,
    dialogues: [
      {
        npcId: 'npc_king_thrain',
        npcName: 'Roi Thrain Forge-d\'Acier',
        lines: [
          { trigger: 'Accueil', text: `*Le roi se lève, appuyé sur un marteau de guerre couvert de runes.* Vous êtes donc les champions d'Elara. *Son regard vous jauge sans concession.* On m'a dit que vous aviez affronté le Cercle des Cendres et survécu. Bien. Vous allez avoir besoin de ce genre de chance ici.`, tone: 'solennel' },
          { trigger: 'La situation', text: `Karak-Zhul est assiégée. Pas de l'extérieur — de l'intérieur. Les tunnels profonds vomissent des horreurs d'ombre depuis que le troisième Sceau s'est affaibli. Et comme si ça ne suffisait pas, Pyraxis s'est réveillé. *Il frappe le sol avec son marteau.* Un dragon rouge ancien, endormi depuis l'Ère des Cendres, dort — dormait — dans la Forge Primordiale. Son réveil a ouvert des fissures dans toute la montagne. C'est par là que les ombres entrent.`, tone: 'grave' },
          { trigger: 'Le Cœur de Mithral', text: `Ce que vous cherchez — ce composant pour votre Grand Rituel — se trouve au cœur de la Forge Primordiale. Le Cœur de Mithral. Un fragment de métal pur, forgé par nos ancêtres dans le feu de la création elle-même. Il est protégé par les défenses de la forge... et maintenant par un dragon furieux. *Sourire sans joie.* Simple, non ?`, tone: 'ironique' },
          { trigger: 'Alliance', text: `*Il se penche en avant.* Si vous me rapportez ce Cœur de Mithral et que vous neutralisez Pyraxis — je ne dis pas le tuer, je dis le neutraliser — les armées de Karak-Zhul marcheront à vos côtés. Vingt mille guerriers nains, les meilleurs forgerons du monde, et assez de mithral pour armer votre coalition. C'est ma parole de roi. Et un nain ne reprend jamais sa parole.`, tone: 'résolu' },
          { trigger: 'Conseils', text: `Pyraxis est ancien, intelligent et orgueilleux. Il ne combat pas comme une bête — il négocie, il manipule, il teste. Nos légendes disent qu'il fut autrefois l'allié de nos ancêtres pendant la Grande Guerre. Peut-être... peut-être que la diplomatie est possible. Peut-être. Mais apportez quand même vos meilleures armes.`, tone: 'pensif' }
        ]
      },
      {
        npcId: 'npc_forge_maitre_hilda',
        npcName: 'Maître-Forge Hilda Braise-Éternelle',
        lines: [
          { trigger: 'Les Forges', text: `*Une naine trapue aux bras couverts de brûlures et de tatouages runiques vous interpelle.* Si vous descendez dans la Forge Primordiale, prenez ces amulettes de résistance au feu. Ça ne vous protégera pas du souffle d'un dragon, mais au moins la chaleur ambiante ne vous cuira pas vivants. La température là-dessous ferait fondre de l'acier ordinaire.`, tone: 'directe' },
          { trigger: 'Le Cœur de Mithral', text: `Le Cœur de Mithral est une merveille. Un bloc de mithral pur, non forgé, baigné dans la chaleur de la terre depuis la naissance du monde. Il résonne avec une fréquence magique unique — c'est pour ça que votre rituel en a besoin. *Elle baisse la voix.* Mais attention : Pyraxis le couve comme un trésor. L'enlever va le rendre furieux.`, tone: 'experte' }
        ]
      }
    ],
    objectives: [
      { description: 'Obtenir audience avec le Roi Thrain', type: 'talk', optional: false },
      { description: 'Négocier les termes de l\'alliance naine', type: 'diplomacy', optional: false },
      { description: 'Se préparer pour la descente dans les Forges Ancestrales', type: 'prepare', optional: false },
      { description: 'Consulter Maître-Forge Hilda pour équipement spécial', type: 'talk', optional: true }
    ],
    transitions: [
      { condition: 'Les joueurs acceptent la mission et se préparent', nextScene: 'ch8_s3_descente_forges', label: '→ Descente dans les Forges Ancestrales' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 18, success: 'Thrain accepte d\'envoyer une avant-garde de 200 guerriers d\'élite immédiatement, sans attendre le Cœur de Mithral. Un gage de bonne foi.', failure: 'Thrain reste ferme : "Le Cœur d\'abord. L\'alliance ensuite. C\'est non négociable."' },
      { skill: 'Histoire', dc: 15, success: 'Vous connaissez les protocoles diplomatiques nains et saluez Thrain selon la tradition. Il vous regarde avec un respect nouveau.', failure: 'Votre salut maladroit fait grimacer les conseillers, mais Thrain laisse passer.' }
    ],
    loot: ['4x Amulettes de Résistance au Feu (avantage jets de sauvegarde vs feu pendant 8h)', 'Carte des Niveaux Profonds de Karak-Zhul'],
    estimatedMinutes: 20,
    mood: 'solennel-épique',
    music: 'Hall nain — enclumes lointaines, chœurs graves, feu de forge',
    location: 'Karak-Zhul — Salle du Trône'
  },
  {
    id: 'ch8_s3_descente_forges',
    chapterId: 'ch8',
    sceneNumber: 3,
    title: 'Les Entrailles de la Montagne',
    type: 'exploration',
    readAloud: `La descente vers les Forges Ancestrales est un voyage dans le temps lui-même. Chaque niveau traversé est plus ancien que le précédent — les gravures murales racontent l'histoire des nains en remontant les âges. Des salles de banquet oubliées, des bibliothèques pétrifiées, des armureries dont les armes n'ont pas été touchées depuis des siècles.

Plus vous descendez, plus la chaleur augmente. L'air devient lourd, chargé de soufre et de vapeurs métalliques. Les murs de pierre transpirent une sueur minérale et des veines de magma visible courent dans la roche comme les artères d'un cœur immense. Le rouge des fournaises remplace peu à peu la lueur bleue des cristaux nains.

Au septième sous-niveau, vous pénétrez dans un tunnel naturel dont les parois sont couvertes de cristaux d'obsidienne. Et là, dans l'obscurité rougeoyante, vous entendez le premier bruit : un souffle. Lent. Régulier. Titanesque. Comme si la montagne elle-même respirait.`,
    gmNotes: `La descente couvre sept sous-niveaux. Utilisez cette exploration pour construire la tension avant la confrontation avec Pyraxis. Au niveau -3, les joueurs rencontrent un groupe de mineurs nains piégés par un éboulement (sauvetage optionnel, Athlétisme DC 16). Au niveau -5, des Ombres Rampantes attaquent (combat mineur, 4x Ombres CR 3). Au niveau -7, l'entrée de la Forge Primordiale. Le souffle est celui de Pyraxis. La chaleur extrême impose un jet de Constitution DC 14 toutes les heures sans amulette de résistance. Avec amulette, pas de jet nécessaire.`,
    dialogues: [
      {
        npcId: 'npc_guide_rurik',
        npcName: 'Rurik l\'Éclaireur',
        lines: [
          { trigger: 'Le chemin', text: `*Un jeune nain nerveux vous guide, sa lanterne tremblant dans sa main.* Personne n'est descendu aussi bas depuis le sommeil de Pyraxis. Les anciens disaient que la Forge Primordiale est là où le feu du monde rencontre la pierre — là où le mithral naît de la terre elle-même. *Il déglutit.* On dit aussi que ceux qui y entrent sans la bénédiction du dragon n'en ressortent jamais.`, tone: 'nerveux' },
          { trigger: 'Les ombres', text: `*Il pointe sa lanterne vers une fissure dans le mur d'où suinte une brume noire.* C'est par là qu'elles viennent. Les fissures. Pyraxis, en se réveillant, a ouvert des dizaines de brèches dans la roche. Et l'Ombre... l'Ombre s'y engouffre comme l'eau dans une coque percée.`, tone: 'effrayé' }
        ]
      }
    ],
    objectives: [
      { description: 'Descendre les sept sous-niveaux jusqu\'à la Forge Primordiale', type: 'explore', optional: false },
      { description: 'Sauver les mineurs piégés au niveau -3', type: 'rescue', optional: true },
      { description: 'Repousser les Ombres Rampantes au niveau -5', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Arrivée au niveau -7', nextScene: 'ch8_s4_pyraxis', label: '→ La Forge Primordiale — Confrontation avec Pyraxis' }
    ],
    skillChecks: [
      { skill: 'Athlétisme', dc: 16, success: 'Vous dégagez les décombres et libérez les trois mineurs piégés. Ils vous remercient et vous indiquent un passage secret vers le niveau -6.', failure: 'Les rochers sont trop lourds. Les mineurs vous crient de continuer sans eux — ils ont des provisions pour deux jours.' },
      { skill: 'Perception', dc: 15, success: 'Vous repérez une embuscade d\'Ombres Rampantes avant qu\'elles ne frappent — pas de surprise.', failure: 'Les ombres surgissent des fissures sans prévenir. Round de surprise pour les ennemis.' },
      { skill: 'Nature', dc: 14, success: 'Vous identifiez les veines de magma instables et évitez un passage dangereux. Gain de temps : arrivée au niveau -7 en 4h au lieu de 6h.', failure: 'Vous empruntez un détour qui rallonge la descente de deux heures.' }
    ],
    encounters: ['4x Ombre Rampante (CR 3)', '1x Élémentaire de Magma (CR 5, optionnel si passage par la galerie sud)'],
    loot: ['Éclats d\'Obsidienne Enchantée (3x, composant alchimique rare)', 'Carte ancienne du réseau de galeries profondes'],
    estimatedMinutes: 30,
    mood: 'tension-croissante',
    music: 'Profondeurs — grondements sourds, gouttes de magma, souffle lointain',
    location: 'Karak-Zhul — Niveaux Profonds (-1 à -7)'
  },
  {
    id: 'ch8_s4_pyraxis',
    chapterId: 'ch8',
    sceneNumber: 4,
    title: 'Le Gardien de la Forge Primordiale',
    type: 'dialogue',
    readAloud: `La Forge Primordiale est une cathédrale de feu.

Un dôme naturel de roche fondue, haut de cent mètres, illuminé par des rivières de magma qui coulent le long des parois en cascades incandescentes. Au centre, une enclume colossale de pierre noire sur laquelle repose un bloc de métal d'un blanc aveuglant — le Cœur de Mithral. Il pulse d'une lumière propre, comme un second soleil prisonnier de la terre.

Et entre vous et le Cœur, enroulé autour de l'enclume comme un serpent autour d'un œuf, dort un dragon. Pyraxis le Rouge. Ses écailles couleur de braise couvrent un corps long de trente mètres. Chaque respiration soulève des vagues de chaleur qui font onduler l'air. Des cicatrices anciennes strient ses flancs — souvenirs de batailles livrées avant la naissance de vos arrière-grands-parents.

Un œil s'ouvre. Doré, fendu, vieux comme le monde. Et une voix résonne dans votre crâne avant même que la gueule ne s'ouvre :

"Je vous attendais."`,
    gmNotes: `SCÈNE CRUCIALE. Pyraxis peut être combattu OU convaincu. Le combat est extrêmement difficile (CR 18, dans son repaire). La diplomatie est possible mais complexe. Pyraxis est un dragon ancien qui respecte la force, l'intelligence et l'honnêteté. Il méprise la flatterie et la faiblesse. Il sait ce qu'est le Cœur de Mithral et pourquoi les joueurs le veulent. Il a trois exigences pour le céder volontairement : 1) Un serment de sang que le Cœur sera utilisé pour le Grand Rituel et rien d'autre (Insight DC 16 pour comprendre que cette demande est sincère), 2) La promesse de fermer les fissures d'ombre qui perturbent son sommeil (les joueurs devront sceller trois brèches dans la forge), 3) Un tribut digne — un objet magique précieux ou un secret ancien. Si les joueurs tentent le combat sans épuiser la diplomatie, Pyraxis se bat avec une fureur terrible. S'ils combattent après un échec diplomatique, il se bat avec tristesse — c'est nuancé.`,
    dialogues: [
      {
        npcId: 'npc_pyraxis',
        npcName: 'Pyraxis le Rouge, Gardien de la Forge',
        lines: [
          { trigger: 'Premier contact', text: `*La voix résonne dans votre esprit, ancienne et profonde comme le grondement d'un volcan.* Mortels. Encore des mortels. Vos pas résonnent dans ma montagne depuis des heures. Vous venez pour le Mithral, évidemment. Comme tous ceux qui descendent ici. *Un rire grave fait trembler le sol.* La question est : êtes-vous plus intelligents que les derniers ?`, tone: 'amusé-menaçant' },
          { trigger: 'Pourquoi il est éveillé', text: `*Pyraxis déploie lentement une aile, révélant des fissures dans la roche d'où suinte de la brume noire.* L'Ombre. Elle s'infiltre dans MA montagne, dans MON sommeil, dans MES rêves. J'ai senti les Sceaux trembler — oui, même dans mon sommeil, je sens ces choses. Et quand le troisième s'est fissuré... *Ses griffes creusent la pierre.* Cela m'a réveillé. Et je n'aime PAS être réveillé.`, tone: 'furieux-contenu' },
          { trigger: 'Négociation', text: `Vous voulez le Cœur de Mithral pour votre Rituel. Je sais ce qu'est le Grand Rituel — j'étais là quand les Sept l'ont conçu, il y a mille ans. *Silence pesant.* Je peux vous le donner. Mais pas gratuitement. Rien dans ce monde n'est gratuit, surtout pas un fragment de la création. Écoutez mes conditions. Toutes. Ensuite, vous déciderez.`, tone: 'grave' },
          { trigger: 'Condition 1 — Le serment', text: `Premièrement : un serment de sang. Vous jurerez sur votre vie que ce Cœur sera utilisé pour restaurer les Sceaux, et pour RIEN d'autre. Pas pour forger des armes, pas pour alimenter vos petites ambitions. Si vous brisez ce serment, le mithral vous consumera de l'intérieur. *Son œil vous fixe.* Ce n'est pas une menace. C'est une propriété du métal.`, tone: 'solennel' },
          { trigger: 'Condition 2 — Les fissures', text: `Deuxièmement : ces fissures d'ombre empoisonnent ma forge. Trois brèches majeures dans les parois. Scellez-les avec votre magie, vos runes, vos prières — je me moque du comment. Je veux pouvoir dormir en paix. *Grondement.* Est-ce trop demander ?`, tone: 'irrité' },
          { trigger: 'Condition 3 — Le tribut', text: `Troisièmement : un tribut. Pas de l'or — j'en ai plus que vos royaumes réunis. Quelque chose de VRAI. Un objet qui a de la valeur pour VOUS. Un secret que vous n'avez jamais partagé. Un sacrifice qui coûte. *Ses yeux se plissent.* Les mortels qui donnent facilement ne méritent rien.`, tone: 'scrutateur' },
          { trigger: 'Acceptation', text: `*Pyraxis incline lentement sa tête massive.* Bien. Vous avez plus de sagesse que je ne l'espérais. Scellez les brèches, offrez votre tribut, et le Cœur est à vous. *Il se déplace, révélant le bloc de mithral étincelant.* Et dites au Roi Thrain que Pyraxis honore encore le pacte ancien. Les nains et le dragon ne sont pas ennemis. Pas encore.`, tone: 'respectueux' },
          { trigger: 'Refus / Combat', text: `*Les yeux du dragon flambent d'un éclat terrible.* Alors vous êtes des voleurs. Comme tous les autres. *Il se dresse sur ses pattes arrière, déployant ses ailes dans toute leur envergure.* Depuis mille ans, j'ai gardé cette forge. Des armées entières ont essayé de me prendre ce qui est mien. *Sa gueule s'ouvre, et une lueur rouge monte de sa gorge.* Elles ont toutes échoué.`, tone: 'furieux' }
        ]
      }
    ],
    objectives: [
      { description: 'Confronter Pyraxis le Rouge', type: 'dialogue', optional: false },
      { description: 'Négocier la cession du Cœur de Mithral (diplomatie)', type: 'diplomacy', optional: false },
      { description: 'OU vaincre Pyraxis en combat (alternative)', type: 'combat', optional: true },
      { description: 'Sceller les trois brèches d\'ombre dans la forge', type: 'special', optional: false },
      { description: 'Offrir un tribut digne au dragon', type: 'choice', optional: false }
    ],
    transitions: [
      { condition: 'Diplomatie réussie — toutes les conditions remplies', nextScene: 'ch8_s5_coeur_mithral', label: '→ Obtention du Cœur de Mithral' },
      { condition: 'Combat — Pyraxis vaincu ou mis en fuite', nextScene: 'ch8_s5_coeur_mithral', label: '→ Prise du Cœur de Mithral' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 20, success: 'Pyraxis reconnaît votre sincérité et réduit ses exigences : il renonce au tribut physique, acceptant votre parole comme tribut suffisant.', failure: 'Pyraxis reste inflexible sur ses trois conditions.' },
      { skill: 'Intuition', dc: 16, success: 'Vous percevez que Pyraxis est sincère — il ne cherche pas à vous piéger. Il veut véritablement que les Sceaux soient restaurés. Il a peur de l\'Ombre.', failure: 'Les intentions du dragon restent insondables.' },
      { skill: 'Arcanes', dc: 17, success: 'Vous savez comment sceller les brèches d\'ombre avec un rituel de warding combiné. Cela prendra une heure par brèche.', failure: 'Le scellement des brèches nécessitera des essais et erreurs — deux heures par brèche.' },
      { skill: 'Intimidation', dc: 22, success: 'Pyraxis rit — un rire sincère. "Du courage ! Enfin !" Il vous respecte davantage, avantage sur la prochaine négociation.', failure: 'Pyraxis vous fixe avec mépris. "Ne menacez pas un dragon dans sa forge, mortel."' }
    ],
    encounters: ['Pyraxis le Rouge (CR 18, combat optionnel)', '3x Fissure d\'Ombre (rituel de scellement, Arcanes DC 17 chacune)'],
    estimatedMinutes: 40,
    mood: 'confrontation-épique',
    music: 'Dragon — grondements titanesques, chœurs graves, chaleur oppressante',
    location: 'Karak-Zhul — Forge Primordiale (Niveau -7)'
  },
  {
    id: 'ch8_s5_coeur_mithral',
    chapterId: 'ch8',
    sceneNumber: 5,
    title: 'Le Premier Composant',
    type: 'narration',
    readAloud: `Le Cœur de Mithral repose dans vos mains — un bloc de métal blanc, lourd et chaud, qui pulse d'une lumière douce comme un battement de cœur. En le touchant, vous ressentez quelque chose d'indéfinissable : une vibration ancienne, comme si le métal lui-même se souvenait de l'époque où le monde fut forgé.

La remontée vers Karak-Zhul se fait dans un silence respectueux. Les nains que vous croisez s'écartent, le regard fixé sur le Cœur, et inclinent la tête — certains murmurent des prières dans leur langue ancienne.

Dans la Salle du Trône, le Roi Thrain se lève à votre approche. Pour la première fois, vous voyez un sourire sur son visage de pierre. Il frappe le sol de son marteau trois fois — et vingt mille voix naines répondent d'un cri de guerre qui fait trembler la montagne entière.

L'alliance est scellée. Le premier composant est en votre possession. La guerre peut commencer.`,
    gmNotes: `Scène de conclusion du Chapitre 8. Moment émotionnel et triomphant. Le Roi Thrain tient parole : l'alliance naine est officielle. Les joueurs gagnent le Cœur de Mithral (premier composant du Grand Rituel) et l'alliance militaire de Karak-Zhul. Si Pyraxis a été convaincu diplomatiquement, il reste un allié potentiel pour la bataille finale (notez-le). Si Pyraxis a été combattu, les nains sont impressionnés mais le dragon ne sera pas disponible plus tard. Distribuez les récompenses et accordez un repos long avant le Chapitre 9.`,
    dialogues: [
      {
        npcId: 'npc_king_thrain',
        npcName: 'Roi Thrain Forge-d\'Acier',
        lines: [
          { trigger: 'Retour triomphant', text: `*Le roi descend de son trône — chose qu'il ne fait jamais — et saisit votre main dans une poigne de fer.* Vous avez fait ce que mes meilleurs guerriers n'ont pas osé tenter. Le Cœur de Mithral est à vous, et ma parole est tenue. *Il se tourne vers ses généraux.* Sonnez le Cor de Mobilisation. Karak-Zhul marche en guerre.`, tone: 'triomphant' },
          { trigger: 'L\'alliance', text: `Vingt mille guerriers. Cinq cents béliers de siège. Et les Forgerons de Guerre — ils vous fabriqueront des armes comme vous n'en avez jamais vu. *Il pose une main sur votre épaule.* Nous ne sommes pas un peuple démonstratif, mais sachez ceci : ce que vous avez fait aujourd'hui sera gravé dans la pierre de cette montagne. Pour toujours.`, tone: 'solennel' }
        ]
      }
    ],
    objectives: [
      { description: 'Rapporter le Cœur de Mithral au Roi Thrain', type: 'talk', optional: false },
      { description: 'Sceller officiellement l\'alliance naine', type: 'diplomacy', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 8 — Alliance naine scellée', nextScene: 'ch9_s1_marche_cendres', label: '→ Chapitre 9 : Les Terres Brûlées' }
    ],
    loot: ['Cœur de Mithral (Composant du Grand Rituel 1/5)', 'Alliance militaire de Karak-Zhul', 'Arme de Mithral au choix (forgée par Hilda, +2, propriété spéciale)', '+30 Réputation Nains de Karak-Zhul'],
    estimatedMinutes: 15,
    mood: 'triomphe',
    music: 'Victoire naine — cors de guerre, enclumes, chœur de vingt mille voix',
    location: 'Karak-Zhul — Salle du Trône'
  },

  // ============================================================================
  // CHAPITRE 9 : LES TERRES BRÛLÉES (Niveau 13-14)
  // Terres Brûlées — Tempêtes de cendres, armées morts-vivants, ruines d'Ashka
  // ============================================================================

  {
    id: 'ch9_s1_marche_cendres',
    chapterId: 'ch9',
    sceneNumber: 1,
    title: 'La Marche dans les Cendres',
    type: 'narration',
    readAloud: `Les Terres Brûlées portent bien leur nom.

Là où s'étendaient autrefois les plaines fertiles d'Ashka — grenier à blé de tout Aethelgard — il ne reste qu'un désert de cendres grises. Le ciel est une voûte de nuages noirs qui n'ont pas laissé passer le soleil depuis des mois. La terre craque sous vos pas comme du verre brisé. Des arbres pétrifiés dressent leurs branches nues vers le ciel comme des mains suppliantes.

Votre colonne de marche avance en silence dans cette désolation. Les éclaireurs rapportent des traces de passage massif — des milliers de pieds, mais pas des pieds vivants. Les empreintes sont irrégulières, traînantes. Des morts qui marchent.

La tempête de cendres arrive sans prévenir. Un mur gris qui dévore l'horizon en quelques minutes. Le vent hurle, chargé de particules brûlantes qui griffent la peau et aveuglent les yeux. Vous ne voyez pas à trois mètres devant vous. Et dans la tempête, entre les rafales, vous entendez des voix. Des murmures. Des appels. Des noms que vous connaissez, prononcés par des bouches qui ne devraient plus parler.`,
    gmNotes: `Les Terres Brûlées sont le territoire de l'Archon Vexor, nécromancien du Cercle des Cendres. Il a transformé toute la région en un champ de mort. Les tempêtes de cendres sont semi-naturelles — amplifiées par la nécromancie de Vexor. Elles réduisent la visibilité à 3m et infligent 1d4 dégâts nécrotiques par heure d'exposition sans protection. Les voix dans la tempête sont un effet psychologique : jet de Sagesse DC 14 ou le personnage est Effrayé pendant 1 minute (première exposition uniquement). La colonne de marche comprend 50 soldats de la coalition et les joueurs. Faites sentir la misère de la guerre : soldats épuisés, moral en berne, provisions qui diminuent.`,
    dialogues: [
      {
        npcId: 'npc_capitaine_lyra',
        npcName: 'Capitaine Lyra Vents-de-Lame',
        lines: [
          { trigger: 'Situation', text: `*Une femme mince en armure légère, le visage couvert d'un foulard contre les cendres.* On a perdu trois éclaireurs ce matin. La tempête les a avalés. *Elle consulte une carte cornée.* Les ruines d'Ashka sont à deux jours de marche, mais si Vexor sait qu'on approche — et il le sait, les morts sont ses yeux — il va nous envoyer ses légions bien avant.`, tone: 'tendue' },
          { trigger: 'Les voix', text: `*Elle serre les mâchoires.* Ne les écoutez pas. C'est de la nécromancie — Vexor utilise les échos des morts pour briser le moral. La moitié de mes hommes ont entendu leur mère, leur sœur, leur enfant mort les appeler. *Pause.* J'ai entendu mon frère. Ça fait six ans qu'il est tombé à la bataille du Pont Noir. *Elle détourne le regard.* Ne les écoutez pas.`, tone: 'dure-ébranlée' }
        ]
      }
    ],
    objectives: [
      { description: 'Traverser les Terres Brûlées en direction des ruines d\'Ashka', type: 'explore', optional: false },
      { description: 'Maintenir le moral de la troupe face aux tempêtes de cendres', type: 'leadership', optional: false },
      { description: 'Résister à l\'influence psychologique des voix', type: 'willpower', optional: false }
    ],
    transitions: [
      { condition: 'La colonne avance malgré la tempête', nextScene: 'ch9_s2_embuscade_morts', label: '→ Embuscade des morts-vivants' }
    ],
    skillChecks: [
      { skill: 'Sagesse', dc: 14, success: 'Les voix glissent sur votre esprit comme l\'eau sur la pierre. Votre calme rassure les soldats proches.', failure: 'Une voix familière vous appelle par votre nom. Vous êtes Effrayé pendant 1 minute et devez résister à l\'envie de suivre la voix dans la tempête.' },
      { skill: 'Survie', dc: 16, success: 'Vous trouvez un réseau de grottes naturelles pour abriter la colonne de la tempête. Repos court possible.', failure: 'Aucun abri en vue. La colonne endure la tempête à découvert.' },
      { skill: 'Charisme (Leadership)', dc: 15, success: 'Votre discours galvanise les troupes. Les soldats reprennent courage et la marche accélère. +2 au moral de la troupe.', failure: 'Vos mots se perdent dans le vent. Le moral reste bas.' }
    ],
    estimatedMinutes: 20,
    mood: 'désolation-oppressante',
    music: 'Terres désolées — vent de cendres, murmures spectraux, pas traînants',
    location: 'Terres Brûlées — Plaines de Cendres'
  },
  {
    id: 'ch9_s2_embuscade_morts',
    chapterId: 'ch9',
    sceneNumber: 2,
    title: 'La Légion des Morts',
    type: 'combat',
    readAloud: `Ils surgissent de la cendre comme des fleurs de cauchemar.

D'abord un, puis dix, puis cent. Des cadavres en armure rouillée, les orbites vides illuminées d'une lueur violette, des armes ébréchées brandies par des mains décharnées. Ils ne crient pas, ne chargent pas — ils avancent. Lentement. Inexorablement. En formation. Une légion de morts parfaitement disciplinée.

Derrière eux, montée sur un destrier squelettique, une silhouette encapuchonnée lève un bâton d'os surmonté d'un crâne qui brille d'un feu noir. C'est un Lieutenant de Vexor — un nécromancien de guerre qui commande les morts par la volonté pure.

Votre colonne est encerclée. Les soldats forment un carré défensif, boucliers levés, lances en avant. Le Capitaine Lyra tire son épée : "Tenez la ligne ! Ils ne ressentent ni peur ni fatigue — mais nous, on a quelque chose qu'ils n'ont pas. On a une raison de se battre !"`,
    gmNotes: `COMBAT TACTIQUE DE GRANDE ÉCHELLE. Ce n'est pas un combat individuel mais une bataille. Les joueurs commandent des unités en plus de combattre personnellement. Structure : 200 morts-vivants (traités en unités de 20, chaque unité = 1 "ennemi" avec HP de groupe), 1 Lieutenant Nécromancien (CR 10), 2 Chevaliers de la Mort (CR 8 chacun). Mécanique spéciale : les joueurs peuvent donner des ordres tactiques (jet de Tactique/Intelligence DC variable). Détruire le Lieutenant disperse 50% des morts-vivants restants (perte de contrôle). Les joueurs doivent choisir : combattre en première ligne (héroïque mais risqué) ou commander depuis l'arrière (stratégique mais les soldats meurent plus vite sans eux au front). C'est un dilemme moral intentionnel.`,
    dialogues: [
      {
        npcId: 'npc_lieutenant_necro',
        npcName: 'Nécromancien Lieutenant Kael',
        lines: [
          { trigger: 'Provocation', text: `*Sa voix résonne, amplifiée par la magie, à travers le champ de cendres.* Les champions d'Elara ! L'Archon Vexor vous attend avec impatience. Il a préparé une place pour vous dans sa légion. *Rire glacial.* Vous combattrez à ses côtés pour l'éternité — que vous le vouliez ou non.`, tone: 'cruel' },
          { trigger: 'Défaite', text: `*Le nécromancien tombe de son destrier, le bâton d'os brisé. Les morts-vivants autour de lui s'effondrent comme des marionnettes coupées de leurs fils.* Vous... ne comprenez pas... L'Archon a des milliers... des milliers d'autres... Ashka tout entière est... son armée... *Il s'éteint.*`, tone: 'agonisant' }
        ]
      }
    ],
    objectives: [
      { description: 'Repousser l\'assaut de la légion mort-vivante', type: 'combat', optional: false },
      { description: 'Éliminer le Lieutenant Nécromancien pour briser le contrôle', type: 'combat', optional: false },
      { description: 'Minimiser les pertes parmi les soldats de la coalition', type: 'strategy', optional: false },
      { description: 'Capturer le bâton d\'os du nécromancien (intelligence sur Vexor)', type: 'collect', optional: true }
    ],
    transitions: [
      { condition: 'Victoire — légion repoussée', nextScene: 'ch9_s3_ruines_ashka', label: '→ Approche des ruines d\'Ashka' }
    ],
    skillChecks: [
      { skill: 'Intelligence (Tactique)', dc: 16, success: 'Votre manœuvre de flanc élimine une unité entière de morts-vivants et ouvre un couloir vers le nécromancien.', failure: 'La ligne tient mais les pertes sont lourdes. Trois soldats tombent.' },
      { skill: 'Charisme (Commandement)', dc: 15, success: 'Vos ordres galvanisent les soldats — leur moral tient malgré la peur. Les unités maintiennent leur formation.', failure: 'Deux unités de soldats paniquent et brisent la formation. Elles doivent être ralliées.' },
      { skill: 'Arcanes', dc: 14, success: 'Vous identifiez le bâton d\'os comme le focus de contrôle. Détruire le bâton suffit — pas besoin de tuer le nécromancien.', failure: 'Vous ne trouvez pas la source du contrôle des morts-vivants.' }
    ],
    encounters: ['10x Unités de Morts-Vivants (20 squelettes/unité, traités comme CR 5 chacune)', '1x Lieutenant Nécromancien Kael (CR 10)', '2x Chevalier de la Mort (CR 8)'],
    loot: ['Bâton d\'Os de Commandement (focus nécromantique, intelligence sur Vexor)', 'Armure du Chevalier de la Mort (armure lourde +1, résistance nécrotique)', '200 PO récupérées sur le champ de bataille'],
    estimatedMinutes: 35,
    mood: 'bataille-désespérée',
    music: 'Bataille — tambours de guerre, cris, métal contre métal, nécromancie',
    location: 'Terres Brûlées — Plaine des Ossements'
  },
  {
    id: 'ch9_s3_ruines_ashka',
    chapterId: 'ch9',
    sceneNumber: 3,
    title: 'Les Ruines d\'Ashka',
    type: 'exploration',
    readAloud: `Ashka. Autrefois la plus belle cité des plaines, réputée pour ses jardins suspendus et ses bibliothèques. Aujourd'hui, un charnier.

Les murs d'enceinte, encore debout par endroits, dessinent le fantôme d'une ville qui abritait cinquante mille âmes. Les rues sont couvertes d'une couche de cendres si épaisse qu'on y enfonce jusqu'aux genoux. Des bâtiments éventrés exposent des intérieurs figés dans l'instant de la catastrophe — des tables mises pour un repas qui n'a jamais été pris, des jouets d'enfants abandonnés dans la poussière.

Au centre de la ville, la Tour de l'Archon s'élève comme un doigt accusateur pointé vers le ciel. Elle n'était pas là avant. C'est une construction nouvelle — os, métal noir et pierre funéraire — érigée par Vexor au-dessus de ce qui était autrefois le Temple de Solarius. De son sommet émane une lueur violette pulsante, et même à cette distance, vous sentez le froid de la mort irradier de ses murs.

C'est là que se trouve le deuxième composant. Et c'est là que Vexor vous attend.`,
    gmNotes: `Les ruines d'Ashka sont un donjon urbain à ciel ouvert. La ville est infestée de morts-vivants errants (pas en légion — des vagabonds spectraux) et de pièges nécromantiques. La Tour de l'Archon est la base de Vexor dans la région. Le composant recherché est le Cristal de Cendres — un fragment de terre calcinée concentrant l'énergie vitale résiduelle de tous ceux qui sont morts ici. Il est dans les fondations du Temple de Solarius, sous la tour. L'approche de la tour peut se faire par trois voies : frontale (combat), souterraine (anciens égouts d'Ashka, Furtivité), ou aérienne (si les joueurs ont des moyens de vol). Laissez-les planifier. Les joueurs peuvent aussi tenter de libérer des âmes piégées dans la ville — chaque groupe d'âmes libéré affaiblit Vexor (-1 à ses jets de sauvegarde, cumulable 3 fois).`,
    dialogues: [
      {
        npcId: 'npc_fantome_ashka',
        npcName: 'Esprit d\'Elena, Prêtresse d\'Ashka',
        lines: [
          { trigger: 'Apparition', text: `*Une forme translucide se matérialise devant vous — une femme en robe de prêtresse, le visage empreint d'une tristesse infinie.* Vous... vous n'êtes pas des morts. *Soulagement visible.* Écoutez-moi, je vous en prie. Vexor nous retient. Des milliers d'âmes, enchaînées à cette terre par sa magie. Nous ne pouvons ni partir ni reposer. Chaque jour qui passe, il nous consume un peu plus pour alimenter sa tour.`, tone: 'suppliante' },
          { trigger: 'Comment aider', text: `Il y a trois autels de Solarius dans la ville — des sanctuaires anciens. Si vous pouvez les purifier, les chaînes nécromantiques se briseront et nous serons libres. Et Vexor... il perdra une partie de son pouvoir. Il se nourrit de nous. Sans nous, il est diminué. *Ses yeux brillent d'espoir.* S'il vous plaît. Quarante-sept mille âmes vous supplient.`, tone: 'désespérée' },
          { trigger: 'La Tour', text: `La tour est bâtie sur les os de notre temple. Le Cristal de Cendres est dans la crypte, sous l'ancien autel principal. Mais Vexor l'a profané — il utilise le cristal comme ancre pour sa nécromancie. *Frisson spectral.* Prenez-le. Emportez-le loin d'ici. C'est tout ce qui reste de la vie d'Ashka.`, tone: 'solennelle' }
        ]
      },
      {
        npcId: 'npc_capitaine_lyra',
        npcName: 'Capitaine Lyra Vents-de-Lame',
        lines: [
          { trigger: 'Plan d\'assaut', text: `*Elle étudie la tour à travers une longue-vue.* Trois options. On passe par la porte — mais c'est ce qu'il attend, et il a au moins cinq cents morts-vivants en garnison. On passe par les égouts — plus discret, mais on ne sait pas ce qu'il y a en bas. Ou on crée une diversion et une équipe réduite s'infiltre. *Elle vous regarde.* C'est votre opération. Qu'est-ce qu'on fait ?`, tone: 'professionnelle' }
        ]
      }
    ],
    objectives: [
      { description: 'Explorer les ruines d\'Ashka et planifier l\'assaut sur la Tour de l\'Archon', type: 'strategy', optional: false },
      { description: 'Purifier les trois autels de Solarius pour libérer les âmes (optionnel mais recommandé)', type: 'special', optional: true },
      { description: 'Choisir une voie d\'approche vers la Tour', type: 'choice', optional: false },
      { description: 'Parler à l\'Esprit d\'Elena pour obtenir des informations', type: 'talk', optional: true }
    ],
    transitions: [
      { condition: 'Approche frontale choisie', nextScene: 'ch9_s4_assaut_tour', label: '→ Assaut frontal de la Tour' },
      { condition: 'Approche souterraine choisie', nextScene: 'ch9_s4_assaut_tour', label: '→ Infiltration par les égouts' },
      { condition: 'Approche par diversion choisie', nextScene: 'ch9_s4_assaut_tour', label: '→ Diversion et infiltration' }
    ],
    skillChecks: [
      { skill: 'Religion', dc: 15, success: 'Vous connaissez le rituel de purification des autels de Solarius. Chaque autel purifié affaiblit Vexor (-1 à ses jets de sauvegarde, cumulable).', failure: 'Les autels semblent profanés au-delà de vos connaissances.' },
      { skill: 'Furtivité', dc: 16, success: 'Vous repérez un accès aux égouts non surveillé. L\'approche souterraine est viable sans alerter la garnison.', failure: 'Les accès que vous trouvez sont tous surveillés par des sentinelles spectrales.' },
      { skill: 'Investigation', dc: 17, success: 'Vous découvrez que la tour a un point faible structurel — les fondations sont celles du temple original. Un sort de Dissipation ciblé pourrait ouvrir une brèche.', failure: 'La tour semble impénétrable sans approche directe.' }
    ],
    estimatedMinutes: 25,
    mood: 'horreur-guerre',
    music: 'Ville morte — silence pesant, murmures spectraux, vent dans les ruines',
    location: 'Terres Brûlées — Ruines d\'Ashka'
  },
  {
    id: 'ch9_s4_assaut_tour',
    chapterId: 'ch9',
    sceneNumber: 4,
    title: 'L\'Archon Vexor',
    type: 'combat',
    readAloud: `Le sommet de la Tour de l'Archon est un cercle de pierre noire à ciel ouvert, battu par les vents chargés de cendres. Des piliers d'ossements soutiennent une coupole d'énergie violette qui crépite et pulse au rythme des incantations de son créateur.

Vexor est là.

Il ne ressemble pas à ce que vous attendiez. Pas un squelette en robe, pas un mort-vivant grimaçant. C'est un homme. Jeune — étonnamment jeune. Pâle comme la craie, les yeux d'un violet profond, vêtu d'une armure de plaques noire ornée de runes funéraires. Il était beau, autrefois. Avant que la nécromancie ne dévore ce qui restait de son humanité.

Il se tient devant un autel où repose le Cristal de Cendres — une pierre translucide grise dans laquelle tourbillonnent des milliers de points lumineux. Les âmes d'Ashka.

"Vous avez traversé mes Terres, vaincu mes légions, et libéré mes provisions." Il sourit — un sourire vide. "Impressionnant. Inutile, mais impressionnant. Savez-vous pourquoi je fais tout cela ? Non, bien sûr que non. Les héros ne posent jamais la bonne question avant de frapper."`,
    gmNotes: `BOSS FIGHT — Archon Vexor, Nécromancien du Cercle des Cendres. CR 15. Vexor est un antagoniste complexe. Il était autrefois un guérisseur d'Ashka qui a perdu sa famille lors de la première vague d'ombre. Sa nécromancie est née du désespoir de vouloir les ramener. Le Cercle des Cendres l'a recruté en lui promettant de restaurer les morts — mensonge, évidemment. Il le sait maintenant mais continue car il n'a plus rien d'autre. Si les joueurs tentent de le raisonner (Persuasion DC 22), il peut être convaincu de cesser le combat — mais pas de les aider. Il laissera le Cristal et partira. En combat, il invoque des vagues de morts-vivants, utilise des sorts nécromantiques de haut niveau, et se soigne en drainant les âmes piégées (si les autels n'ont pas été purifiés, il regagne 30 PV par round). Si les autels ont été purifiés, il ne peut pas se soigner. Phase 2 (sous 50% PV) : il absorbe l'énergie résiduelle et se transforme partiellement en liche — forme spectrale, résistance aux dégâts physiques.`,
    dialogues: [
      {
        npcId: 'npc_archon_vexor',
        npcName: 'Archon Vexor, le Faucheur d\'Ashka',
        lines: [
          { trigger: 'Révélation', text: `J'étais médecin ici. *Il désigne les ruines en contrebas.* Je soignais les malades, je pansais les blessés. Quand l'Ombre est venue, j'ai tout perdu. Ma femme. Mes enfants. Mon monde entier. *Ses yeux flambent de violet.* Le Cercle m'a offert le pouvoir de les ramener. Et j'ai accepté. Parce que quand on a tout perdu, on accepte n'importe quoi.`, tone: 'amer' },
          { trigger: 'Persuasion', text: `*Quelque chose vacille dans son regard.* Vous croyez que je ne sais pas ? Que le Cercle m'a menti ? Que les morts ne reviennent pas — pas vraiment ? *Sa voix se brise.* Je le sais depuis le premier jour. Mais que me reste-t-il ? Redevenir le médecin d'une ville de cendres ? Soigner des fantômes ? *Il serre les poings.* Si vous avez une meilleure réponse, je vous écoute. Sinon... battons-nous et finissons-en.`, tone: 'brisé' },
          { trigger: 'Combat Phase 1', text: `Assez parlé. Vous voulez le Cristal ? *Il lève les mains et l'énergie nécromantique déferle.* Venez le prendre. Mais sachez que chaque mort que je commande était quelqu'un que j'ai aimé. Et ils ne vous laisseront pas m'arrêter.`, tone: 'résolu' },
          { trigger: 'Combat Phase 2', text: `*Son corps se disloque partiellement, devenant translucide, spectral.* Vous ne comprenez pas... la mort n'est pas la fin. C'est juste... un changement d'état. *Sa voix résonne comme un écho.* Laissez-moi vous montrer.`, tone: 'délirant' },
          { trigger: 'Défaite', text: `*Il s'effondre, l'énergie nécromantique se dissipant autour de lui. Pour un instant, il redevient l'homme qu'il était — jeune, fatigué, brisé.* Prenez... le Cristal. Rendez-leur... leur repos. *Il regarde le ciel.* Mara... les enfants... je suis désolé. Je n'ai pas pu...`, tone: 'apaisé-mourant' },
          { trigger: 'Reddition (si persuadé)', text: `*Il s'immobilise. L'énergie nécromantique reflue.* Vous avez raison. *Long silence.* Prenez le Cristal. Libérez les âmes. *Il recule vers le bord de la tour.* Je ne mérite pas votre pitié. Mais peut-être... peut-être que je mérite le repos, moi aussi. *Il disparaît dans les cendres sans un bruit.*`, tone: 'vaincu' }
        ]
      }
    ],
    objectives: [
      { description: 'Affronter ou convaincre l\'Archon Vexor', type: 'combat', optional: false },
      { description: 'Récupérer le Cristal de Cendres', type: 'collect', optional: false },
      { description: 'Libérer les âmes d\'Ashka en retirant le Cristal de l\'autel', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Vexor vaincu ou convaincu, Cristal récupéré', nextScene: 'ch9_s5_liberation_ashka', label: '→ Libération d\'Ashka' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 22, success: 'Vexor s\'arrête. Quelque chose de son humanité refait surface. Il dépose les armes et laisse le Cristal. Pas d\'allié gagné, mais pas de combat non plus.', failure: 'Vexor secoue la tête avec un sourire triste. "Jolis mots. Mais les mots ne ramènent pas les morts." Le combat continue.' },
      { skill: 'Arcanes', dc: 18, success: 'Vous identifiez le lien entre Vexor et les âmes piégées. Briser ce lien (action, Arcanes DC 18 en combat) lui retire sa capacité de régénération.', failure: 'Le flux nécromantique est trop complexe pour être analysé en plein combat.' },
      { skill: 'Médecine', dc: 16, success: 'Vous reconnaissez les signes de la corruption nécromantique sur Vexor — il est en train de se transformer en liche contre sa volonté. Cette information peut être utilisée dans la négociation (+2 au jet de Persuasion).', failure: 'L\'état de Vexor vous échappe.' }
    ],
    encounters: ['Archon Vexor (CR 15, Phase 1 + Phase 2)', '4x Gardien Spectral (CR 6, invoqués par Vexor)', 'Vagues de morts-vivants (environnement, 2d6 squelettes par round pendant 3 rounds)'],
    loot: ['Cristal de Cendres (Composant du Grand Rituel 2/5)', 'Bâton de Vexor (focus arcanique +3, sorts nécromantiques)', 'Grimoire de Nécromancie Avancée (si fouille de la tour)', 'Journal intime de Vexor (lore)'],
    estimatedMinutes: 40,
    mood: 'tragique-épique',
    music: 'Boss nécromancien — chœurs funèbres, orgue, énergie crépitante',
    location: 'Ruines d\'Ashka — Tour de l\'Archon, Sommet'
  },
  {
    id: 'ch9_s5_liberation_ashka',
    chapterId: 'ch9',
    sceneNumber: 5,
    title: 'Le Repos des Morts',
    type: 'narration',
    readAloud: `Quand le Cristal de Cendres quitte l'autel, le monde retient son souffle.

Puis la lumière vient.

Des milliers de points lumineux jaillissent de la terre, des murs, des rues — partout. Les âmes d'Ashka s'élèvent, libérées de leurs chaînes nécromantiques. Elles montent vers le ciel en un pilier de lumière dorée qui perce les nuages noirs pour la première fois depuis des mois. Le soleil touche les ruines, et pendant un instant — juste un instant — vous voyez Ashka telle qu'elle était : vivante, belle, pleine de rires et de musique.

L'Esprit d'Elena flotte devant vous, souriante. Ses lèvres bougent mais aucun son ne sort — elle dit simplement "merci" avant de se dissoudre dans la lumière avec les autres.

Le silence qui suit est immense. Les soldats de votre colonne ôtent leurs casques. Certains pleurent. Le Capitaine Lyra essuie furtivement ses yeux.

Le Cristal de Cendres dans vos mains est chaud. Et quelque part dans sa transparence grise, vous voyez tourbillonner non plus des âmes captives, mais des souvenirs — les derniers cadeaux d'un peuple qui ne sera pas oublié.

Deux composants sur cinq. La guerre continue.`,
    gmNotes: `Scène émotionnelle de conclusion du Chapitre 9. Laissez les joueurs vivre le moment. Si Vexor a été convaincu plutôt que combattu, les âmes libérées lui pardonnent avant de partir — scène encore plus poignante. Le Cristal de Cendres est le deuxième composant du Grand Rituel. La libération d'Ashka est un tournant moral pour la coalition — elle montre que la guerre peut aussi sauver, pas seulement détruire. Le moral des troupes remonte considérablement. Les nuages de cendres commencent à se dissiper sur la région — effet à long terme de la défaite de Vexor. Accordez un repos long et une montée de niveau si approprié.`,
    dialogues: [
      {
        npcId: 'npc_capitaine_lyra',
        npcName: 'Capitaine Lyra Vents-de-Lame',
        lines: [
          { trigger: 'Après la libération', text: `*Elle regarde le pilier de lumière, le visage luisant de larmes qu'elle ne cherche plus à cacher.* Mon frère était là-dedans. Je l'ai senti partir. *Pause.* Il était en paix. *Elle se tourne vers vous.* Ce que vous avez fait aujourd'hui... les histoires ne raconteront pas la moitié de ce que ça signifie. Merci. Pour tous ceux qui ne peuvent plus le dire.`, tone: 'émue' }
        ]
      }
    ],
    objectives: [
      { description: 'Libérer les âmes d\'Ashka en retirant le Cristal de l\'autel nécromantique', type: 'special', optional: false },
      { description: 'Sécuriser le Cristal de Cendres comme deuxième composant du Grand Rituel', type: 'collect', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 9 — Deux composants en main', nextScene: 'ch10_s1_conseil_guerre', label: '→ Chapitre 10 : L\'Alliance Impossible' }
    ],
    loot: ['Cristal de Cendres (Composant du Grand Rituel 2/5 — confirmé)', 'Bénédiction des Âmes d\'Ashka (bonus permanent : +1 aux jets de sauvegarde contre la nécromancie)', '+20 Réputation Coalition, +15 Moral des Troupes'],
    estimatedMinutes: 15,
    mood: 'catharsis-espoir',
    music: 'Libération — chœurs angéliques, lumière, puis silence recueilli',
    location: 'Ruines d\'Ashka — Tour de l\'Archon, puis Ciel d\'Ashka'
  },

  // ============================================================================
  // CHAPITRE 10 : L'ALLIANCE IMPOSSIBLE (Niveau 15-16)
  // Diplomatie, Syndicat de l'Ombre, Conseil de Guerre, Préparations finales
  // ============================================================================

  {
    id: 'ch10_s1_conseil_guerre',
    chapterId: 'ch10',
    sceneNumber: 1,
    title: 'Le Grand Conseil de Guerre',
    type: 'dialogue',
    readAloud: `Sol-Aureus est transformée. La capitale dorée est devenue un campement militaire géant. Des tentes couvrent les plaines au-delà des remparts, des bannières de dizaines de factions claquent dans le vent — le Soleil d'Or de la Couronne, le Marteau de Karak-Zhul, le Croissant d'Argent des Elfes de Sylvandis, les Griffons de la Garde Sauvage.

Dans la Grande Salle du Conseil, autour d'une table couverte de cartes, les dirigeants du monde libre d'Aethelgard sont réunis pour la première fois de l'histoire. Et ils sont en train de se disputer.

La Reine Elara préside, le visage tendu. À sa droite, le Roi Thrain croise les bras, furieux. Face à lui, l'Archimage Sylvara des Elfes tapote la table avec impatience. Le Général Marcus pointe des positions sur la carte en haussant le ton. L'Évêque de Solarius prie silencieusement dans un coin.

L'atmosphère est explosive. Tout le monde veut la victoire. Personne ne s'accorde sur la méthode.`,
    gmNotes: `SCÈNE DE DIPLOMATIE COMPLEXE. Le Conseil de Guerre rassemble toutes les factions alliées, mais elles ne s'entendent pas. Conflits principaux : 1) Thrain veut une offensive directe sur la forteresse du Cercle des Cendres — "Écrasons-les avec la force." 2) Sylvara préconise une approche magique — sceller les brèches d'abord, affaiblir l'ennemi, puis frapper. 3) Marcus veut défendre d'abord — "Consolidons nos lignes avant d'attaquer." 4) L'Évêque insiste sur le Grand Rituel comme priorité absolue. Les joueurs doivent jouer les médiateurs. Chaque faction convaincue d'un plan commun accorde un bonus pour la bataille finale. Si toutes sont unifiées : bonus majeur. Si le conseil échoue : les factions se battent séparément (malus). Il y a aussi un absent notable : le Syndicat de l'Ombre, la guilde criminelle, qui contrôle les réseaux d'espionnage. Sans eux, pas de renseignement sur les mouvements ennemis.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Ouverture', text: `*Elle frappe la table.* Silence ! *Le brouhaha s'éteint.* Nous ne sommes pas ici pour régler nos querelles de voisinage. Le Cercle des Cendres rassemble la plus grande armée d'ombre que ce monde ait jamais vue. Si nous ne nous unissons pas — véritablement — tout ce pour quoi nous nous disputons n'existera plus. *Elle se tourne vers vous.* Vous avez rapporté deux composants du Grand Rituel. Plus que quiconque ici, vous connaissez l'ennemi. Parlez. Nous vous écoutons.`, tone: 'autorité' },
          { trigger: 'Syndicat', text: `*Elle soupire.* Le Syndicat de l'Ombre. Oui, nous avons besoin d'eux. Leurs espions sont les meilleurs d'Aethelgard. Mais leur chef — Dame Nyx — ne traite qu'avec ceux qui parlent son langage. Et son langage, ce n'est ni l'honneur ni la loyauté. C'est le pouvoir et le profit. *Regard appuyé.* Si quelqu'un peut la convaincre, c'est vous.`, tone: 'résignée' }
        ]
      },
      {
        npcId: 'npc_king_thrain',
        npcName: 'Roi Thrain Forge-d\'Acier',
        lines: [
          { trigger: 'Position', text: `*Il frappe la carte du poing.* Assez de palabres ! Mes guerriers sont prêts. Vingt mille nains en armure de mithral, les meilleurs combattants du continent. Je dis qu'on marche sur le Cercle MAINTENANT, avant qu'ils ne soient prêts. Chaque jour qu'on perd en discussions, l'ennemi se renforce.`, tone: 'belliqueux' },
          { trigger: 'Contre-argument', text: `*Grommellement.* La stratégie ? Vous voulez de la stratégie ? Ma stratégie est la même depuis mille ans : un mur de boucliers nains et assez d'acier pour noyer l'ennemi. *Pause.* Mais... *il concède à contrecœur* ...les Ombres ne meurent pas comme les gobelins. Il faudra peut-être... adapter.`, tone: 'réticent' }
        ]
      },
      {
        npcId: 'npc_archimage_sylvara',
        npcName: 'Archimage Sylvara de Sylvandis',
        lines: [
          { trigger: 'Position', text: `*Voix mélodieuse mais tranchante.* La force brute contre l'Ombre, c'est comme frapper l'eau avec un marteau — gratifiant mais inutile. *Regard vers Thrain.* Ce qu'il nous faut, c'est d'abord sceller les brèches dimensionnelles qui permettent à l'Ombre de se régénérer. Sinon, pour chaque mort-vivant abattu, trois autres surgiront.`, tone: 'académique' },
          { trigger: 'Le Rituel', text: `Le Grand Rituel est notre arme décisive. Cinq composants, cinq éléments de la création réunis. Mes mages peuvent préparer le cercle rituel, mais nous avons besoin de temps — et de trois composants supplémentaires. Le Rituel échoue si un seul manque. *Elle vous regarde.* Où en êtes-vous ?`, tone: 'pressante' }
        ]
      },
      {
        npcId: 'npc_general_marcus',
        npcName: 'Général Marcus',
        lines: [
          { trigger: 'Position', text: `*Il pointe la carte.* Nos lignes de défense tiennent, mais elles sont étirées. Si on lance une offensive maintenant, on dégarnit le sud — et le Cercle des Cendres peut frapper nos civils. Je recommande de fortifier d'abord, de rassembler les composants manquants, et de frapper quand nous serons prêts. Pas avant.`, tone: 'méthodique' },
          { trigger: 'Renseignement', text: `*Frustration visible.* Notre plus gros problème ? On est aveugles. Le Cercle bouge et on ne sait pas où ni quand. Sans réseau d'espionnage, on réagit au lieu d'anticiper. *Il baisse la voix.* Le Syndicat de l'Ombre pourrait changer ça. Mais négocier avec des criminels... *Il secoue la tête.* Ce n'est pas mon domaine.`, tone: 'préoccupé' }
        ]
      }
    ],
    objectives: [
      { description: 'Participer au Grand Conseil de Guerre', type: 'diplomacy', optional: false },
      { description: 'Unifier les factions autour d\'un plan de bataille commun', type: 'diplomacy', optional: false },
      { description: 'Identifier le besoin du Syndicat de l\'Ombre comme allié', type: 'strategy', optional: false },
      { description: 'Proposer un plan qui intègre les forces de chaque faction', type: 'leadership', optional: false }
    ],
    transitions: [
      { condition: 'Les joueurs acceptent de recruter le Syndicat de l\'Ombre', nextScene: 'ch10_s2_bas_fonds', label: '→ Négociation avec le Syndicat de l\'Ombre' },
      { condition: 'Les joueurs veulent d\'abord résoudre le conflit Thrain/Sylvara', nextScene: 'ch10_s1b_mediation', label: '→ Médiation entre les factions' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 18, success: 'Votre argument convainc Thrain ET Sylvara de faire des concessions. Le plan combiné — offensive naine protégée par la magie elfique — est adopté.', failure: 'Les factions restent divisées. Thrain et Sylvara se disputent ouvertement. Le conseil s\'enlise.' },
      { skill: 'Perspicacité', dc: 15, success: 'Vous remarquez que Sylvara cache une information — les elfes ont déjà perdu un composant au profit d\'un agent du Cercle. Elle a honte.', failure: 'Les tensions semblent purement stratégiques.' },
      { skill: 'Intelligence (Stratégie)', dc: 17, success: 'Vous proposez un plan en trois phases que même Marcus qualifie de "brillant". Toutes les factions l\'approuvent. +3 au moral de la coalition.', failure: 'Votre plan est jugé trop risqué par Marcus. Il faudra convaincre chaque faction individuellement.' }
    ],
    estimatedMinutes: 25,
    mood: 'tension-politique',
    music: 'Conseil — débats, tensions, tambours lointains de guerre',
    location: 'Sol-Aureus — Grande Salle du Conseil'
  },
  {
    id: 'ch10_s1b_mediation',
    chapterId: 'ch10',
    sceneNumber: 1.5,
    title: 'La Médiation des Factions (Optionnel)',
    type: 'dialogue',
    readAloud: `Le conseil se prolonge dans la nuit. Les bougies fondent, les voix s'échauffent, et la table de guerre ressemble de plus en plus à un champ de bataille. Thrain a renversé sa chope en frappant la table. Sylvara a gelé accidentellement le verre d'eau de Marcus. L'Évêque prie de plus en plus fort.

Il est clair que sans médiateur, cette alliance se brisera avant même que l'ennemi ne frappe.`,
    gmNotes: `Scène de roleplay pur. Les joueurs doivent résoudre trois conflits : 1) Thrain vs Sylvara : offensive vs magie — solution : l'avant-garde naine avec boucliers enchantés par les elfes. 2) Marcus vs Thrain : défense vs attaque — solution : une force de frappe offensive ET une garnison défensive. 3) Le composant perdu des elfes (si découvert) : Sylvara a besoin d'aide pour le récupérer, mais a honte de le demander. Chaque conflit résolu avec succès accorde un bonus cumulatif pour la bataille finale. Si les trois sont résolus : "Alliance Parfaite" — bonus significatif.`,
    dialogues: [
      {
        npcId: 'npc_king_thrain',
        npcName: 'Roi Thrain Forge-d\'Acier',
        lines: [
          { trigger: 'Médiation', text: `*Grognement.* Les oreilles pointues veulent qu'on se cache derrière des boucliers magiques pendant qu'elles chantent des comptines ? Mes ancêtres se retourneraient dans leurs cryptes ! *Pause.* Mais... si vos mages pouvaient enchanter nos boucliers au lieu de remplacer nos bras... *Il caresse sa barbe.* Ça, je pourrais l'accepter.`, tone: 'conciliant-malgré-lui' }
        ]
      },
      {
        npcId: 'npc_archimage_sylvara',
        npcName: 'Archimage Sylvara de Sylvandis',
        lines: [
          { trigger: 'Confession', text: `*En privé, elle baisse sa garde.* Il y a... quelque chose que je n'ai pas dit au conseil. *Silence.* Le troisième composant — la Sève de l'Arbre-Monde — était sous notre garde. Un agent du Cercle l'a volé il y a trois semaines. *Honte visible.* Les elfes de Sylvandis ont failli. Si Thrain l'apprend, il retirera son alliance. Aidez-moi à le récupérer... discrètement.`, tone: 'vulnérable' }
        ]
      }
    ],
    objectives: [
      { description: 'Résoudre le conflit stratégique entre Thrain et Sylvara', type: 'diplomacy', optional: false },
      { description: 'Trouver un compromis entre offensive et défense', type: 'diplomacy', optional: false },
      { description: 'Découvrir le secret de Sylvara concernant le composant perdu', type: 'investigate', optional: true }
    ],
    transitions: [
      { condition: 'Médiations terminées', nextScene: 'ch10_s2_bas_fonds', label: '→ Recruter le Syndicat de l\'Ombre' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 16, success: 'Thrain et Sylvara acceptent le plan hybride : avant-garde naine renforcée par magie elfique. Poignée de main historique.', failure: 'Les deux factions restent méfiantes l\'une envers l\'autre. L\'alliance est fragile.' },
      { skill: 'Perspicacité', dc: 18, success: 'Vous percevez que Sylvara cache un secret douloureux. En privé, elle confesse la perte du composant elfique.', failure: 'Sylvara reste fermée. Son secret reste enfoui — pour l\'instant.' }
    ],
    estimatedMinutes: 20,
    mood: 'tension-diplomatique',
    music: 'Négociations — cordes tendues, silences lourds',
    location: 'Sol-Aureus — Grande Salle du Conseil (nuit)'
  },
  {
    id: 'ch10_s2_bas_fonds',
    chapterId: 'ch10',
    sceneNumber: 2,
    title: 'Les Bas-Fonds de Sol-Aureus',
    type: 'exploration',
    readAloud: `Sous la splendeur dorée de Sol-Aureus existe un autre monde. Les Bas-Fonds — un labyrinthe de ruelles étroites, de tavernes louches et de marchés noirs où l'on vend tout ce que la loi interdit. Ici, la lumière du soleil ne descend jamais. Les lanternes sont rouges, les visages dissimulés, et les conversations chuchotées.

Pour trouver Dame Nyx, chef du Syndicat de l'Ombre, il faut d'abord se faire remarquer — ou plutôt, se faire accepter. Les criminels de Sol-Aureus ne parlent pas aux étrangers. Surtout pas à ceux qui sentent l'héroïsme et la vertu.

Votre contact est un informateur nommé Œil-de-Rat — un halfelin borgne qui traîne au Gobelet Fêlé, la pire taverne des Bas-Fonds. Il peut arranger une rencontre avec Nyx. Pour un prix.`,
    gmNotes: `Les Bas-Fonds sont un mini-donjon social. Les joueurs doivent naviguer le monde criminel sans leurs avantages habituels — la force et la magie attirent l'attention ici, et pas la bonne. Œil-de-Rat demande 500 PO ET un service : éliminer un rival du Syndicat, un trafiquant nommé Croc-de-Fer qui a trahi le code des voleurs. Les joueurs peuvent négocier, trouver une alternative, ou payer. Le Gobelet Fêlé est rempli de personnages dangereux — pickpockets, assassins, contrebandiers. Un jet de Perception DC 14 révèle qu'on les observe depuis qu'ils sont entrés. Plusieurs approches sont possibles pour atteindre Nyx : par Œil-de-Rat, en se faisant recruter comme mercenaires, ou en forçant le passage (déconseillé — le Syndicat disparaît dans l'ombre).`,
    dialogues: [
      {
        npcId: 'npc_oeil_de_rat',
        npcName: 'Œil-de-Rat',
        lines: [
          { trigger: 'Premier contact', text: `*Un halfelin crasseux, un bandeau sur l'œil gauche, vous toise depuis un tabouret trop haut pour lui.* Vous puez la noblesse et l'aventure, vous savez ça ? C'est mauvais pour la santé ici. *Il sirote un liquide verdâtre.* Qu'est-ce que les héros de la Reine viennent faire dans mon trou ?`, tone: 'méfiant-amusé' },
          { trigger: 'Nyx', text: `Dame Nyx ? *Rire nerveux.* Vous voulez voir Dame Nyx ? Comme ça ? *Il regarde autour de lui.* Personne ne "voit" Nyx. Nyx vous voit — si elle le veut. Mais je peux... faciliter les choses. Pour un prix. 500 pièces d'or. Et un service. Croc-de-Fer, le trafiquant du Quartier des Ombres — il doit disparaître. Il a trahi le Syndicat et Nyx le veut mort. Faites ça, et elle vous recevra.`, tone: 'transactionnel' },
          { trigger: 'Négociation', text: `*Sourire tordu.* 300 ? *Il éclate de rire.* Vous savez combien de gens paieraient le triple juste pour connaître le nom de Nyx ? Bon, disons 400. Et le service reste non négociable. Croc-de-Fer ou rien. *Il tend une main poisseuse.* Marché conclu ?`, tone: 'cupide' }
        ]
      }
    ],
    objectives: [
      { description: 'S\'infiltrer dans les Bas-Fonds de Sol-Aureus', type: 'explore', optional: false },
      { description: 'Trouver Œil-de-Rat au Gobelet Fêlé', type: 'talk', optional: false },
      { description: 'Accepter ou négocier les conditions d\'Œil-de-Rat', type: 'diplomacy', optional: false },
      { description: 'Neutraliser Croc-de-Fer (lethal ou non)', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Service accompli et paiement effectué', nextScene: 'ch10_s3_dame_nyx', label: '→ Rencontre avec Dame Nyx' },
      { condition: 'Les joueurs trouvent une approche alternative', nextScene: 'ch10_s3_dame_nyx', label: '→ Approche directe de Nyx' }
    ],
    skillChecks: [
      { skill: 'Discrétion', dc: 15, success: 'Vous vous fondez dans l\'ambiance des Bas-Fonds sans attirer l\'attention. Les criminels vous prennent pour des mercenaires locaux.', failure: 'Votre équipement trop propre et vos manières trop droites vous trahissent. Les regards hostiles se multiplient.' },
      { skill: 'Persuasion', dc: 16, success: 'Œil-de-Rat accepte de baisser le prix à 300 PO. "Pour des héros qui daignent se salir les mains, je fais un effort."', failure: 'Le prix reste à 500 PO. Œil-de-Rat est inflexible.' },
      { skill: 'Intimidation', dc: 18, success: 'Croc-de-Fer se rend sans combat quand il comprend à qui il a affaire. Vous le livrez au Syndicat vivant — Nyx apprécie la retenue.', failure: 'Croc-de-Fer résiste. Combat inévitable dans les ruelles étroites des Bas-Fonds.' },
      { skill: 'Perception', dc: 14, success: 'Vous remarquez que vous êtes suivis depuis votre entrée dans les Bas-Fonds — des agents du Syndicat. Nyx vous teste déjà.', failure: 'Vous ne remarquez pas les ombres qui vous filent.' }
    ],
    encounters: ['Croc-de-Fer (CR 8, bandit chef) + 4x Voyou des Bas-Fonds (CR 3)'],
    loot: ['Sceau d\'accès au repaire du Syndicat', 'Dague de Croc-de-Fer (dague +2, poison paralysant 1/jour)'],
    estimatedMinutes: 25,
    mood: 'noir-urbain',
    music: 'Bas-fonds — jazz sombre, bruits de taverne, murmures',
    location: 'Sol-Aureus — Les Bas-Fonds, Le Gobelet Fêlé'
  },
  {
    id: 'ch10_s3_dame_nyx',
    chapterId: 'ch10',
    sceneNumber: 3,
    title: 'Dame Nyx, Reine des Ombres',
    type: 'dialogue',
    readAloud: `On vous conduit les yeux bandés à travers un dédale de passages secrets avant de déboucher dans une salle souterraine d'un luxe inattendu. Des tapis de soie, des meubles d'ébène, des chandeliers de cristal — le repaire de Dame Nyx est un palais caché sous les égouts.

Elle vous attend, assise sur un fauteuil qui ressemble à un trône. Dame Nyx est une drow — peau d'obsidienne, cheveux d'argent, yeux de rubis. Elle porte une robe de velours noir brodée d'araignées d'argent et un sourire qui ne monte jamais jusqu'aux yeux. Deux assassins encapuchonnés se tiennent dans les ombres derrière elle, immobiles comme des statues.

"Les héros d'Aethelgard." Sa voix est un ronronnement de chat. "Asseyez-vous. On m'a dit que vous aviez des problèmes que l'honneur seul ne peut résoudre. Comme c'est rafraîchissant."`,
    gmNotes: `Dame Nyx est l'antagoniste-alliée la plus complexe de l'acte. Elle est brillante, amorale mais pas mauvaise, et pragmatique au-delà du raisonnable. Elle sait TOUT sur le Cercle des Cendres — son réseau d'espions est le meilleur du continent. Elle acceptera d'aider la coalition, mais ses conditions sont lourdes : 1) Amnistie totale pour le Syndicat après la guerre. 2) Un siège au futur Conseil de la Paix. 3) Le monopole commercial sur trois routes marchandes. Si les joueurs refusent tout, elle propose une alternative : un unique service d'espionnage en échange d'un service futur non spécifié — une "faveur" qu'elle réclamera un jour. C'est un pacte faustien. Nyx ne peut PAS être intimidée (elle a des dossiers sur tout le monde) ni charmée (immunité). Seule la logique et le pragmatisme fonctionnent avec elle.`,
    dialogues: [
      {
        npcId: 'npc_dame_nyx',
        npcName: 'Dame Nyx, Maîtresse du Syndicat de l\'Ombre',
        lines: [
          { trigger: 'Accueil', text: `*Elle fait tourner un verre de vin entre ses doigts.* Avant que vous ne parliez, laissez-moi vous faire gagner du temps. Je sais pourquoi vous êtes là. Vous avez besoin de mes espions. La coalition est aveugle sans renseignement, et le Cercle des Cendres bouge plus vite que vos armées. *Sourire.* Vous avez deux composants sur cinq. L'un vient d'un dragon, l'autre d'un nécromancien brisé. Voyez ? Je sais déjà tout. La question est : que pouvez-vous m'offrir en échange ?`, tone: 'calculatrice' },
          { trigger: 'Conditions', text: `Amnistie. Complète. Pour moi et les miens. Quand cette guerre sera finie et que vous aurez votre monde tout beau tout propre, le Syndicat ne sera plus pourchassé. Deuxièmement, un siège au Conseil de la Paix — oui, les criminels aussi ont leur mot à dire sur l'avenir. Et troisièmement... *Elle pose le verre.* ...le monopole sur les routes marchandes de l'Est. Raisonnable, non ?`, tone: 'business' },
          { trigger: 'Refus', text: `*Elle hausse un sourcil.* Non ? *Silence.* Bien. Alors permettez-moi de vous proposer quelque chose de plus... intime. Un service unique. Toute la puissance de mon réseau, déployée pour votre guerre, sans conditions immédiates. *Pause.* En échange d'une faveur. Une seule. Que je réclamerai quand le moment sera venu. Pas de meurtre, pas de trahison — je ne suis pas un monstre. Juste... un service. Non négociable et non refusable. *Ses yeux de rubis brillent.* Qu'en dites-vous ?`, tone: 'séductrice' },
          { trigger: 'Information gratuite', text: `*Elle rit doucement.* Un geste de bonne foi ? Très bien. Sachez ceci : le Cercle des Cendres prépare un assaut massif sur Sol-Aureus dans trois semaines. Pas les petites escarmouches auxquelles vous êtes habitués — une véritable invasion. Cent mille morts-vivants, trois Archons survivants, et leur maître... *Son sourire disparaît.* Leur maître que personne n'a jamais vu. Trois semaines. C'est tout le temps qu'il vous reste.`, tone: 'sérieuse' },
          { trigger: 'Alliance conclue', text: `*Elle lève son verre.* À notre alliance improbable. *Sourire retrouvé.* Mes meilleurs agents seront à votre disposition dès demain. Cartes des mouvements ennemis, positions des Archons, faiblesses des fortifications du Cercle — vous aurez tout. *Elle se penche en avant.* Et un conseil gratuit : ne faites confiance à personne. Pas même à moi. Surtout pas à moi.`, tone: 'pragmatique' }
        ]
      }
    ],
    objectives: [
      { description: 'Négocier une alliance avec Dame Nyx et le Syndicat de l\'Ombre', type: 'diplomacy', optional: false },
      { description: 'Obtenir les renseignements sur l\'offensive du Cercle des Cendres', type: 'intelligence', optional: false },
      { description: 'Choisir entre les conditions complètes ou la "faveur"', type: 'choice', optional: false }
    ],
    transitions: [
      { condition: 'Alliance avec le Syndicat conclue', nextScene: 'ch10_s4_preparations', label: '→ Préparations de guerre' }
    ],
    skillChecks: [
      { skill: 'Perspicacité', dc: 20, success: 'Vous percevez que Nyx a sincèrement peur du Cercle des Cendres. Son pragmatisme cache une véritable inquiétude pour la survie de son organisation — et du monde. Elle est plus alliée qu\'elle ne le montre.', failure: 'Les motivations de Nyx restent opaques.' },
      { skill: 'Persuasion', dc: 20, success: 'Vous convainquez Nyx de réduire ses demandes : amnistie et un siège d\'observateur au Conseil, mais pas le monopole commercial. Elle accepte avec un sourire admiratif.', failure: 'Nyx ne bouge pas d\'un pouce. "C\'est mon offre. Prenez-la ou laissez-la."' },
      { skill: 'Tromperie', dc: 19, success: 'Vous bluffez en prétendant avoir un réseau d\'espionnage alternatif. Nyx rit et baisse ses prix de 20%. "Enfin quelqu\'un qui parle ma langue."', failure: 'Nyx voit à travers votre bluff immédiatement. "Ne jouez pas à ça avec moi, chéri. C\'est mon métier."' }
    ],
    estimatedMinutes: 25,
    mood: 'intrigue-sombre',
    music: 'Repaire — cordes sombres, silence luxueux, danger latent',
    location: 'Sol-Aureus — Repaire secret du Syndicat de l\'Ombre'
  },
  {
    id: 'ch10_s4_preparations',
    chapterId: 'ch10',
    sceneNumber: 4,
    title: 'Le Crépuscule avant la Tempête',
    type: 'choice',
    readAloud: `Trois semaines. C'est tout le temps qu'il vous reste avant l'assaut du Cercle des Cendres.

Sol-Aureus s'est transformée en forteresse. Les rues dorées résonnent du martèlement des forgerons, du cri des sergents d'entraînement, du grondement des chariots de provisions. Des réfugiés affluent de toutes les régions — des familles entières, les yeux hantés, portant tout ce qu'elles possèdent. Les temples sont pleins à craquer. Les prêtres soignent sans relâche.

Mais au milieu du chaos, il y a aussi de l'espoir. Les bannières de la coalition flottent côte à côte sur les remparts — naines, elfiques, humaines, même le symbole discret du Syndicat de l'Ombre. Pour la première fois de l'histoire d'Aethelgard, toutes les factions sont unies.

Il reste encore tant à faire. Les trois derniers composants du Grand Rituel. Les défenses de la ville à renforcer. Les troupes à entraîner. Les civils à protéger. Et au milieu de tout cela, vous — les piliers sur lesquels tout repose.

Le crépuscule tombe sur Sol-Aureus. Demain, la guerre commence véritablement.`,
    gmNotes: `SCÈNE DE PRÉPARATION — Les joueurs ont trois semaines en jeu (résumées en une session). Ils doivent allouer leur temps entre plusieurs activités cruciales, chacune apportant un bonus ou un malus pour la bataille finale. Activités possibles : 1) Entraîner les troupes (jet de Charisme DC 16 — bonus moral). 2) Renforcer les défenses (jet d'Intelligence DC 17 — bonus défensif). 3) Rechercher les composants manquants (jet d'Investigation DC 18 — indices). 4) Missions personnelles (résolution d'arcs de personnages). 5) Espionnage avec le Syndicat (jet de Sagesse DC 15 — renseignement tactique). Chaque joueur peut choisir 3 activités sur les 5. Les choix ont des conséquences réelles sur l'acte final. C'est aussi le moment pour des scènes de roleplay personnel — dernières conversations avant la bataille, lettres écrites, serments prononcés. Encouragez les moments humains.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Veille de guerre', text: `*Elle vous trouve sur les remparts au coucher du soleil. Sans gardes, sans couronne. Juste une femme regardant sa ville se préparer à la guerre.* Vous savez ce qui me fait le plus peur ? Ce n'est pas de mourir. C'est de survivre et de ne pas avoir fait assez. *Elle se tourne vers vous.* Chaque décision que je prends coûte des vies. Chaque heure perdue est une famille de plus qui ne reverra pas le printemps. *Silence.* Dites-moi que nous allons gagner. Mentez-moi s'il le faut.`, tone: 'vulnérable' },
          { trigger: 'Résolution', text: `*Elle redresse les épaules.* Non. Ne mentez pas. La vérité, c'est que personne ne sait si on va gagner. Mais on va se battre. *Son regard se durcit.* Et s'il faut tomber, on tombera debout, face à l'ennemi, avec nos alliés à nos côtés. C'est tout ce qu'on peut promettre. *Elle vous serre l'épaule.* Merci. Pour tout. Quoi qu'il arrive.`, tone: 'royale-émue' }
        ]
      },
      {
        npcId: 'npc_general_marcus',
        npcName: 'Général Marcus',
        lines: [
          { trigger: 'Derniers préparatifs', text: `*Il est penché sur des cartes depuis trois jours, les yeux rouges.* Les défenses sont aussi solides qu'elles peuvent l'être. Les nains ont renforcé les murs est, les elfes ont posé des wards magiques sur les portes. Le Syndicat surveille les tunnels sous la ville. *Il se redresse.* Ce qui manque, c'est le moral. Les soldats ont besoin de croire qu'on peut gagner. *Il vous regarde.* C'est votre rôle. Pas le mien.`, tone: 'épuisé' }
        ]
      }
    ],
    objectives: [
      { description: 'Allouer le temps de préparation entre les activités stratégiques', type: 'strategy', optional: false },
      { description: 'Entraîner les troupes de la coalition', type: 'leadership', optional: true },
      { description: 'Renforcer les défenses de Sol-Aureus', type: 'strategy', optional: true },
      { description: 'Coordonner l\'espionnage avec le Syndicat', type: 'intelligence', optional: true },
      { description: 'Vivre des moments personnels avant la bataille', type: 'roleplay', optional: true }
    ],
    transitions: [
      { condition: 'Préparations terminées — trois semaines écoulées', nextScene: 'ch10_s5_discours_guerre', label: '→ Veille de la grande bataille' }
    ],
    skillChecks: [
      { skill: 'Charisme (Entraînement)', dc: 16, success: 'Les troupes que vous entraînez gagnent un bonus de moral significatif. Elles tiendront plus longtemps sous pression.', failure: 'Les soldats sont reconnaissants mais le moral reste fragile. La peur de l\'inconnu est plus forte que les mots.' },
      { skill: 'Intelligence (Fortification)', dc: 17, success: 'Vous identifiez un point faible dans les défenses sud et le corrigez. Bonus défensif pour la bataille finale.', failure: 'Les défenses sont standards. Pas de bonus supplémentaire.' },
      { skill: 'Sagesse (Espionnage)', dc: 15, success: 'Le réseau du Syndicat vous transmet la composition exacte de l\'armée ennemie. Vous pouvez préparer des contre-mesures spécifiques.', failure: 'Les informations sont partielles. Vous savez que l\'ennemi approche, mais pas la composition exacte de ses forces.' },
      { skill: 'Investigation (Composants)', dc: 18, success: 'Vous localisez le troisième composant du Grand Rituel. Les deux derniers restent à trouver dans l\'Acte 5.', failure: 'Les pistes sont trop fragmentaires pour localiser les composants manquants dans le temps imparti.' }
    ],
    estimatedMinutes: 30,
    mood: 'calme-avant-tempête',
    music: 'Préparation — cordes mélancoliques, enclumes lointaines, prières',
    location: 'Sol-Aureus — Toute la ville'
  },
  {
    id: 'ch10_s5_discours_guerre',
    chapterId: 'ch10',
    sceneNumber: 5,
    title: 'Le Discours du Dernier Jour',
    type: 'narration',
    readAloud: `L'aube se lève sur Sol-Aureus pour la dernière fois avant la tempête.

Depuis les remparts de la porte principale, vous contemplez le monde que vous allez défendre. Les plaines dorées, les rivières scintillantes, les villages dans le lointain. Et à l'horizon, comme une marée noire qui dévore la ligne de l'aube — l'armée du Cercle des Cendres. Si vaste qu'elle semble ne pas avoir de fin.

Derrière vous, rassemblée sur la grande place de Sol-Aureus, l'armée de la coalition attend. Nains en armure de mithral, elfes en robes de guerre, soldats humains aux visages déterminés, rogues du Syndicat dans les ombres, prêtres de Solarius en prière. Des dizaines de milliers de visages tournés vers vous.

Le silence est assourdissant. Ils attendent. Un mot. Un signe. Une raison de croire que demain existera encore.

C'est à vous de parler.`,
    gmNotes: `MOMENT CLIMACTIQUE DE L'ACTE 4. Les joueurs doivent prononcer un discours de guerre devant l'armée de la coalition. Laissez-les improviser — c'est un moment de roleplay pur. Pas de jet de dé obligatoire. Si un joueur prononce un discours sincère et inspirant, le moral monte automatiquement au maximum. Si les joueurs sont timides, la Reine Elara et Thrain les soutiennent avec quelques mots. Après le discours, les cors de guerre sonnent et l'acte se conclut sur cette image : l'armée de la lumière face à l'armée de l'ombre, prête à se battre pour le monde. C'est la fin de l'Acte 4. L'Acte 5 commencera par la bataille elle-même. Distribuez les récompenses de fin d'acte : montée de niveau, objets légendaires, et les conséquences de tous les choix faits pendant l'acte (alliances, composants, préparations).`,
    dialogues: [
      {
        npcId: 'npc_king_thrain',
        npcName: 'Roi Thrain Forge-d\'Acier',
        lines: [
          { trigger: 'Avant le discours', text: `*Il s'approche de vous, son marteau de guerre sur l'épaule, et pour la première fois, il sourit — un vrai sourire.* Dans mille ans, les nains chanteront ce jour. Le jour où le monde s'est levé ensemble contre les ténèbres. *Il pose un poing sur son cœur.* C'est un honneur de se battre à vos côtés. Un honneur que je n'accorde pas à la légère.`, tone: 'fraternel' }
        ]
      },
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Le moment', text: `*Elle prend votre main.* Le monde entier vous regarde. Pas parce que vous êtes les plus forts ou les plus sages. Mais parce que vous êtes ceux qui n'ont pas abandonné. *Elle lâche votre main et recule d'un pas.* Allez. Donnez-leur une raison de se battre.`, tone: 'confiante' }
        ]
      },
      {
        npcId: 'npc_dame_nyx',
        npcName: 'Dame Nyx',
        lines: [
          { trigger: 'Depuis les ombres', text: `*Vous la trouvez adossée à un pilier, dans l'ombre, les bras croisés.* Pas de discours pour moi. Je ne suis pas du genre héroïque. *Pause.* Mais mes agents sont en position. Chaque tunnel, chaque passage, chaque recoin de cette ville est surveillé. *Sourire en coin.* Si on meurt, au moins on saura pourquoi. Bonne chance, héros. Vous allez en avoir besoin.`, tone: 'sardonic' }
        ]
      },
      {
        npcId: 'npc_general_marcus',
        npcName: 'Général Marcus',
        lines: [
          { trigger: 'Dernier rapport', text: `*Il se tient au garde-à-vous pour la première fois de sa carrière devant vous.* Les défenses sont en place. Les troupes sont prêtes. Les réserves sont stockées. *Il hésite, puis ajoute :* J'ai servi la Couronne pendant trente ans. J'ai vu des batailles, des sièges, des victoires et des défaites. Mais je n'ai jamais vu une armée comme celle-ci. Toutes les races, toutes les factions, ensemble. *Émotion contenue.* Quoi qu'il arrive aujourd'hui, ceci est déjà une victoire.`, tone: 'solennel' }
        ]
      }
    ],
    objectives: [
      { description: 'Prononcer un discours de guerre devant l\'armée de la coalition', type: 'roleplay', optional: false },
      { description: 'Inspirer les troupes pour la bataille à venir', type: 'leadership', optional: false },
      { description: 'FIN DE L\'ACTE 4 — Préparer la transition vers l\'Acte 5', type: 'transition', optional: false }
    ],
    transitions: [
      { condition: 'FIN DE L\'ACTE 4 — La guerre commence', nextScene: 'ch11_s1_bataille_sol_aureus', label: '→ ACTE 5 : Le Crépuscule des Dieux' }
    ],
    skillChecks: [
      { skill: 'Charisme (Discours)', dc: 15, success: 'Votre discours enflamme l\'armée. Un rugissement de quarante mille voix fait trembler les murs de Sol-Aureus. Moral au maximum. Bonus de coalition pour l\'Acte 5.', failure: 'Votre discours est sincère mais maladroit. Le moral reste stable — pas au maximum, mais suffisant. Les autres leaders complètent avec leurs propres mots.' },
      { skill: 'Représentation', dc: 14, success: 'Vous ponctuez votre discours d\'un geste dramatique qui restera dans les légendes. Les bardes composent déjà un chant.', failure: 'Votre présence est solide mais pas légendaire. L\'histoire retiendra vos actes plus que vos mots.' }
    ],
    loot: ['Titre : Champions de la Coalition', 'Bénédiction de Solarius (bonus permanent : +1 à tous les jets de sauvegarde)', 'Arme ou Armure Légendaire au choix (forgée par Hilda avec enchantement elfique)', 'Composants du Grand Rituel : 2/5 confirmés (+ potentiel 3e si Investigation réussie)', '+50 Réputation globale toutes factions'],
    estimatedMinutes: 20,
    mood: 'épique-solennel',
    music: 'Veille de bataille — silence, puis cors de guerre, tambours, chœurs épiques montant en puissance',
    location: 'Sol-Aureus — Remparts de la Porte Principale'
  }
];

// ============================================================================
// EXPORT — Toutes les scènes de l'Acte 4 (Chapitres 8, 9, 10)
// Les scènes sont distinguées par leur chapterId: 'ch8', 'ch9', 'ch10'
// ============================================================================

export const NARRATIVE_SCENES_ACT4: NarrativeScene[] = ACT4_SCENES;
