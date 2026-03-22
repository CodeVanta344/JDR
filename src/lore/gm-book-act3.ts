/**
 * ACTE 3 - LES OMBRES GRANDISSENT
 * Niveaux 8-12
 * Thèmes : sacrifice, trahison, choix impossibles, ténèbres
 * Le Cercle des Cendres lance une offensive coordonnée.
 * Un Sceau Majeur est brisé, libérant une horreur ancienne.
 * Les factions se déchirent. Les joueurs doivent choisir qui sauver.
 */

import type { BookChapter, BookAct } from './gm-book-data';

// ============================================================================
// CHAPITRE 5 : LA TRAHISON DE L'AUBE
// ============================================================================

const CHAPTER_5: BookChapter = {
  id: 'ch-3-5',
  actNumber: 3,
  chapterNumber: 5,
  title: "La Trahison de l'Aube",
  subtitle: "Quand la lumière cache les ombres",
  summary: "Les héros sont envoyés dans la Sylve d'Émeraude pour protéger l'Arbre-Monde Yggdrasylve, dont les racines ancrent un Sceau Majeur. Mais au cœur de la forêt, ils découvrent que la corruption ne vient pas du Cercle des Cendres seul — quelqu'un au sein de l'Aube d'Argent les a trahis. L'Archon Séraphina, infiltrée depuis des années, orchestre l'empoisonnement de l'Arbre-Monde.",
  levelRange: "8-9",
  themes: ['trahison', 'nature corrompue', 'loyauté brisée', 'devoir contre amitié'],
  chapterIntro: {
    text: `La Sylve d'Émeraude s'étend devant vous comme un océan de feuillages, aussi ancienne que la pierre des montagnes et plus profonde que tous les donjons que vous avez jamais explorés. Les arbres ici ne sont pas simplement grands — ils sont colossaux, leurs troncs larges comme des tours, leurs branches tissant une canopée si dense que la lumière du soleil n'atteint le sol que par de rares percées dorées.

On vous a dit que l'Arbre-Monde, Yggdrasylve, était malade. Que ses feuilles tombaient hors saison, que sa sève noircissait, que les animaux fuyaient son ombre. La Commandeure Isolde de l'Aube d'Argent vous a personnellement confié cette mission : « Allez dans la Sylve. Trouvez ce qui ronge Yggdrasylve. Protégez-le à tout prix — car si l'Arbre-Monde tombe, le Sceau de Terre se brisera, et ce qui dort dessous se réveillera. »

Ce qu'elle ne vous a pas dit, c'est que la menace viendrait de l'intérieur même de votre camp.

Le voyage depuis Sol-Aureus a pris quatre jours. Quatre jours de routes de plus en plus sauvages, de villages de plus en plus rares, et de forêts de plus en plus sombres. Et maintenant, debout à la lisière de la Sylve d'Émeraude, vous comprenez pourquoi les elfes l'appellent « le Premier Bois » — c'est un endroit qui existait avant les routes, avant les villes, avant les noms.

La forêt vous attend. Elle ne semble pas particulièrement accueillante.`,
    mood: "Appréhension solennelle, grandeur naturelle menacée",
    music: "Thème forestier majestueux mais teinté de dissonances, cordes graves, flûtes elfiques lointaines",
  },
  scenes: [
    // --- Scène 1 : L'Entrée de la Sylve ---
    {
      id: 'scene-3-5-1',
      sceneNumber: 1,
      title: "Le Seuil Verdoyant",
      type: 'exploration',
      location: "Lisière de la Sylve d'Émeraude",
      locationId: 'sylve-emeraude',
      estimatedMinutes: 25,
      readAloud: {
        text: `Le sentier s'enfonce dans la Sylve comme une rivière dans la terre. Les premiers pas sous la canopée sont un choc sensoriel : la lumière change, passant du blanc du soleil à un vert tamisé, presque liquide. L'air devient plus frais, plus humide, chargé de l'odeur de mousse, de terre noire et de résine.

Les arbres ici sont immenses — des chênes-sentinelles dont les troncs font dix mètres de diamètre, couverts d'une mousse phosphorescente qui pulse doucement dans la pénombre. Leurs racines s'entrelacent au-dessus du sol comme des serpents pétrifiés, créant un labyrinthe naturel où le moindre pas doit être calculé.

Mais quelque chose ne va pas. Vous le sentez avant de le voir. Les oiseaux ne chantent pas. Les insectes sont silencieux. La forêt retient son souffle, et dans ce silence, vous percevez autre chose — une vibration basse, presque subsonique, qui monte des racines sous vos pieds. Comme un gémissement. Comme si la terre elle-même souffrait.

Et puis vous les voyez : les feuilles. En plein cœur de l'été, les feuilles tombent. Pas jaunes, pas brunes — noires. Elles tombent en tourbillonnant lentement, laissant derrière elles des traînées de cendre dans l'air immobile. Là où elles touchent le sol, l'herbe se flétrit et meurt.

Un éclaireur elfique émerge d'entre les arbres sans un bruit. Son visage est un masque de gravité.

« Vous êtes ceux que l'Aube d'Argent a envoyés ? Suivez-moi. Le Gardien-Premier vous attend. Et hâtez-vous — Yggdrasylve n'a plus beaucoup de temps. »`,
        mood: "Émerveillement qui vire à l'inquiétude, beauté blessée",
        music: "Sons forestiers sans animaux, vibration basse sourde, vent dans les branches mortes",
      },
      gmNotes: [
        { type: 'info', text: "La corruption d'Yggdrasylve est visible partout : feuilles noires, sève sombre, animaux absents. Les joueurs doivent comprendre l'urgence de la situation." },
        { type: 'warning', text: "La forêt elle-même est devenue dangereuse. Les racines corrompues peuvent s'animer (utilisez les stats de Lianes Animées : HP 30, ATK 12, AC 13, CR 2). Une rencontre aléatoire est possible si les joueurs quittent le sentier." },
        { type: 'secret', text: "L'éclaireur, Thalion, a remarqué des traces étranges près du camp de l'Aube d'Argent — des allées et venues nocturnes d'un des officiers. Il n'ose pas en parler directement mais peut être persuadé (Persuasion CD 55)." },
        { type: 'lore', text: "La Sylve d'Émeraude est le plus ancien écosystème d'Aethelgard. L'Arbre-Monde Yggdrasylve a été planté par les Premiers Elfes il y a 10 000 ans. Ses racines plongent si profondément dans la terre qu'elles touchent les fondations du Sceau de Terre, l'un des cinq Sceaux qui emprisonnent les entités de l'Ère d'Ashka." },
        { type: 'tip', text: "Si un joueur est druide, rôdeur ou a un lien avec la nature, décrivez la douleur de la forêt comme un cri silencieux qu'il perçoit physiquement. Jet de Sagesse CD 40 pour ne pas être submergé par l'émotion." },
      ],
      npcs: [
        {
          name: "Thalion Feuille-d'Aube",
          role: "Éclaireur des Gardiens d'Émeraude",
          personality: "Silencieux, vigilant, profondément troublé par la maladie de la forêt. Loyal mais méfiant envers les étrangers.",
          appearance: "Elfe sylvain, la peau cuivrée, cheveux verts tressés avec des feuilles. Armure de cuir renforcée de bois vivant. Arc long gravé de runes. Yeux dorés cernés par le manque de sommeil.",
          secret: "A vu la Commandeure-Adjointe Séraphina quitter le camp en pleine nuit, trois fois cette semaine. Elle allait vers les racines profondes de l'Arbre-Monde.",
          dialogues: {
            greeting: "« Vous avez de la chance d'être arrivés par le sentier du nord. Le sentier sud est... infesté. Les arbres y bougent maintenant, et pas de la bonne manière. »",
            info: "« L'Arbre-Monde saigne. Sa sève noire coule des racines depuis deux semaines. Le Gardien-Premier Elyndor a essayé tous les rituels de purification. Rien ne fonctionne. C'est comme si le poison venait de l'intérieur même de l'arbre. Comme si quelqu'un le nourrissait de l'intérieur. »",
            quest: "« Il y a... quelque chose que j'ai vu. La nuit. Des mouvements dans le camp. Mais je ne suis qu'un éclaireur. Qui m'écouterait ? Si vous avez du temps, parlez-moi au feu de camp ce soir. Quand les oreilles indiscrètes dorment. »",
            farewell: "« Marchez dans les pas des racines. Si le sol vibre sous vos pieds, ne bougez plus — attendez que ça passe. La forêt distingue encore les amis des ennemis. Pour l'instant. »",
          },
          stats: { hp: 52, atk: 14, ac: 16 },
        },
      ],
      skillChecks: [
        { skill: 'Nature', dc: 45, success: "La corruption n'est pas naturelle — ni maladie, ni parasite. C'est de la magie noire, appliquée directement aux racines profondes. Quelqu'un empoisonne l'Arbre-Monde méthodiquement.", failure: "L'arbre est malade, c'est évident. La cause exacte vous échappe." },
        { skill: 'Perception', dc: 50, success: "Parmi les feuilles tombées, certaines portent des marques — de minuscules runes gravées dans le noir de leur surface. Quelqu'un a inscrit des malédictions sur les feuilles elles-mêmes.", failure: "Les feuilles noires tombent, identiques dans leur décrépitude. Rien de particulier." },
        { skill: 'Arcanes', dc: 55, success: "La vibration dans le sol est un écho magique — le Sceau de Terre sous Yggdrasylve est en train de se fissurer. Il tient encore, mais les fractures se multiplient. À ce rythme, il cèdera dans quelques jours.", failure: "Il y a de la magie partout dans cette forêt. Difficile d'isoler quoi que ce soit de spécifique." },
      ],
      choices: [
        {
          id: 'choice-sylve-entry',
          prompt: "Comment les personnages abordent-ils la Sylve ?",
          options: [
            {
              label: "Suivre Thalion directement",
              description: "Se rendre au camp des Gardiens d'Émeraude sans détour.",
              consequence: "Arrivée rapide au camp. Rencontre avec le Gardien-Premier Elyndor et briefing complet.",
              nextScene: 'scene-3-5-2',
            },
            {
              label: "Explorer la zone corrompue d'abord",
              description: "Enquêter sur les feuilles noires et la corruption avant de rejoindre le camp.",
              consequence: "Découverte de traces suspectes menant à un autel caché dans les racines. Jet d'Investigation CD 50.",
              nextScene: 'scene-3-5-2',
              skillCheck: { skill: 'Investigation', dc: 50, success: "Vous trouvez un petit autel dissimulé entre les racines — encens noir, runes du Cercle des Cendres, et une fiole de poison encore tiède. Quelqu'un est venu récemment.", failure: "La corruption semble uniforme, difficile d'en trouver la source depuis la surface." },
            },
            {
              label: "Chercher les animaux en fuite",
              description: "Pister les animaux pour comprendre ce qui les a chassés.",
              consequence: "Les animaux fuient vers le nord. Leur piste contourne une zone précise : le bosquet des Racines Anciennes, là où le Sceau est le plus proche de la surface.",
              nextScene: 'scene-3-5-2',
              skillCheck: { skill: 'Survie', dc: 45, success: "Les animaux fuient une zone précise. Pas la corruption en général — un endroit en particulier. Les Racines Anciennes, au cœur de la Sylve.", failure: "Les traces d'animaux sont chaotiques. La panique les a dispersés dans toutes les directions." },
            },
          ],
        },
      ],
      nextScenes: ['scene-3-5-2'],
      mapMovement: { from: 'road-west', to: 'sylve-emeraude' },
    },

    // --- Scène 2 : Le Camp des Gardiens ---
    {
      id: 'scene-3-5-2',
      sceneNumber: 2,
      title: "Le Conseil du Gardien-Premier",
      type: 'social',
      location: "Camp des Gardiens d'Émeraude, Clairière de la Lune",
      locationId: 'sylve-emeraude-camp',
      estimatedMinutes: 30,
      readAloud: {
        text: `Le camp des Gardiens d'Émeraude est niché dans une clairière naturelle où la canopée s'ouvre juste assez pour laisser passer un cercle de ciel. Des habitations sont taillées dans les troncs eux-mêmes, avec des fenêtres de sève cristallisée et des portes de bois vivant. Des lanternes de mousse phosphorescente pendent aux branches basses, projetant une lumière douce et verte.

Mais la beauté du lieu est ternie par l'angoisse de ses habitants. Des elfes en armure de bois patrouillent en silence, le visage fermé. Des druides en robes terreuses sont agenouillés autour d'un bassin de sève noire, murmurant des incantations qui semblent n'avoir aucun effet. Un groupe de blessés est allongé à l'ombre — pas blessés par des armes, mais par la forêt elle-même, des brûlures de sève corrompue sur la peau.

Au centre du camp, sur un trône de racines vivantes, se tient le Gardien-Premier Elyndor. C'est un elfe ancien — vraiment ancien, de ceux dont l'âge se mesure en siècles. Son visage est sculpté par le temps en une expression de patience infinie, mais ses yeux trahissent une douleur profonde. L'Arbre-Monde est malade, et pour lui, c'est comme regarder sa propre mère mourir.

À ses côtés, une femme en armure argentée — la Commandeure-Adjointe Séraphina de l'Aube d'Argent. Elle a été envoyée en avance pour coordonner la défense. Son sourire est chaleureux, professionnel. Ses yeux bleus sont d'une sincérité parfaite.

Trop parfaite.

« Bienvenue, héros de Sol-Aureus, » dit Elyndor d'une voix qui résonne comme le vent dans les branches. « Pardonnez la froideur de notre accueil. En d'autres temps, il y aurait eu des chants et du vin de feuille. Aujourd'hui, il n'y a que l'urgence. Asseyez-vous. Écoutez. Le temps presse. »`,
        mood: "Gravité elfique, beauté mourante, tension diplomatique",
        music: "Chœurs elfiques mélancoliques, harpes, vent dans les feuilles mortes",
      },
      gmNotes: [
        { type: 'info', text: "C'est la scène de briefing de l'Acte 3. Elyndor explique la situation : l'Arbre-Monde est empoisonné depuis les racines. Les rituels druidiques échouent. Il soupçonne une magie étrangère — ashkane — qui agit depuis les profondeurs." },
        { type: 'warning', text: "Séraphina est la traîtresse. Elle joue son rôle à la perfection. Insight DC 60 pour sentir que quelque chose cloche — un léger décalage dans ses réactions, un sourire trop rapide. Ne la révélez PAS trop tôt." },
        { type: 'secret', text: "Séraphina est l'Archon Séraphina du Cercle des Cendres. Elle a infiltré l'Aube d'Argent il y a cinq ans. Sa mission : affaiblir le Sceau de Terre en empoisonnant Yggdrasylve, puis déclencher la rupture au moment voulu par Malachar." },
        { type: 'tip', text: "Faites interagir Séraphina avec les PJ de manière amicale et utile. Elle offre de l'aide, partage des informations (vraies mélangées à de faux indices), et se rend indispensable. Plus les joueurs lui font confiance, plus la trahison sera douloureuse." },
        { type: 'lore', text: "Les Gardiens d'Émeraude sont un ordre druidique millénaire chargé de protéger la Sylve et l'Arbre-Monde. Le Gardien-Premier est à la fois chef spirituel et militaire. Elyndor occupe ce poste depuis 400 ans." },
      ],
      npcs: [
        {
          name: "Gardien-Premier Elyndor",
          role: "Chef des Gardiens d'Émeraude",
          personality: "Sage, patient, profondément lié à la forêt. Souffre physiquement de la maladie de l'Arbre-Monde. Désespéré mais ne le montre pas.",
          appearance: "Elfe ancien, peau couleur d'écorce, cheveux blancs comme des racines aériennes. Yeux vert émeraude voilés de douleur. Robe de druide tissée de mousse vivante, maintenant partiellement flétrie.",
          secret: "Il sait que si l'Arbre-Monde meurt, il mourra aussi — leur vie est liée par un ancien pacte. Il ne l'a dit à personne.",
          dialogues: {
            greeting: "« Chaque heure qui passe, je sens les racines faiblir un peu plus. Vous êtes notre dernier espoir, et je ne dis pas cela à la légère — en huit cents ans, je n'ai jamais prononcé ces mots. »",
            info: "« Le poison remonte depuis les Racines Profondes — les tunnels souterrains où les racines d'Yggdrasylve plongent jusqu'au Sceau de Terre. Personne n'y descend — c'est un lieu sacré et dangereux. Mais quelqu'un y va. La nuit. J'ai senti des pas là où aucun pied elfique ne devrait fouler. »",
            quest: "« Descendez dans les Racines Profondes. Trouvez la source du poison. Purifiez-la si vous le pouvez, détruisez-la sinon. Je vous donnerai un Cœur de Sève — le dernier — pour nourrir l'Arbre-Monde le temps que vous agissiez. Mais le Cœur ne tiendra que deux jours. »",
            farewell: "« Que les racines vous portent et que la canopée vous protège. Et soyez prudents là-dessous — les profondeurs de la Sylve ont leurs propres gardiens, et ils ne sont plus tous sains d'esprit. »",
          },
          stats: { hp: 85, atk: 16, ac: 17 },
        },
        {
          name: "Commandeure-Adjointe Séraphina",
          role: "Officier de l'Aube d'Argent (traîtresse)",
          personality: "En surface : compétente, chaleureuse, dévouée. En réalité : calculatrice, fanatique du Cercle des Cendres, convaincue que briser les Sceaux est nécessaire pour « libérer le monde ».",
          appearance: "Humaine, la trentaine, cheveux blond cendré tressés en couronne. Armure d'argent gravée du soleil de l'Aube. Yeux bleu glacier. Cicatrice fine sur la joue gauche — « souvenir d'un démon mineur », dit-elle.",
          secret: "L'Archon Séraphina du Cercle des Cendres. Elle empoisonne les racines chaque nuit avec un artefact caché — la Fiole de Cendre Éternelle. La cicatrice sur sa joue est la marque rituelle du Cercle.",
          dialogues: {
            greeting: "« Enfin, du renfort ! Je commençais à penser que l'Aube nous avait oubliés ici. Je suis Séraphina — j'assure la liaison entre l'Aube et les Gardiens. Tout ce que je peux faire pour vous aider, demandez. »",
            info: "« J'ai patrouillé les environs chaque nuit. Il y a des traces de passage au sud de la Sylve — des empreintes lourdes, pas elfiques. Peut-être des agents du Cercle des Cendres ? J'ai envoyé un rapport à la Commandeure Isolde, mais la réponse tarde. Les routes ne sont plus sûres. »",
            quest: "« Je connais un chemin plus sûr vers les Racines Profondes. Laissez-moi vous y guider — j'y suis descendue la semaine dernière pour évaluer la situation. C'est dangereux, mais faisable avec un guide. »",
            farewell: "« Reposez-vous cette nuit. Demain sera éprouvant. Je veillerai sur le camp — c'est le moins que je puisse faire. »",
          },
          stats: { hp: 95, atk: 19, ac: 19 },
        },
      ],
      choices: [
        {
          id: 'choice-camp-trust',
          prompt: "Comment les personnages réagissent-ils aux informations du camp ?",
          options: [
            {
              label: "Faire confiance à Séraphina",
              description: "Accepter son aide et son chemin vers les Racines Profondes.",
              consequence: "Séraphina les mène par un chemin détourné qui traverse une zone d'embuscade prédisposée. Elle les « sauve » héroïquement pour cimenter leur confiance.",
              nextScene: 'scene-3-5-3',
            },
            {
              label: "Enquêter discrètement au camp",
              description: "Rester une nuit pour observer et enquêter avant de descendre.",
              consequence: "Jet de Discrétion CD 55 pour surveiller le camp la nuit. Possibilité de voir Séraphina se faufiler vers les racines.",
              nextScene: 'scene-3-5-3',
              skillCheck: { skill: 'Discrétion', dc: 55, success: "Vers deux heures du matin, une silhouette quitte le camp. L'armure d'argent brille faiblement sous la lune. Séraphina, seule, se dirige vers les Racines Profondes.", failure: "La nuit est calme. Peut-être trop calme. Mais rien d'anormal ne se produit — du moins, rien que vous voyiez." },
              reputationChange: [{ faction: 'Gardiens d\'Émeraude', amount: 5 }],
            },
            {
              label: "Parler à Thalion au feu de camp",
              description: "Retrouver l'éclaireur en privé pour écouter ses soupçons.",
              consequence: "Thalion révèle qu'il a vu Séraphina quitter le camp trois nuits de suite. Il a peur de l'accuser sans preuve — c'est une officière de l'Aube.",
              nextScene: 'scene-3-5-3',
              reputationChange: [{ faction: 'Gardiens d\'Émeraude', amount: 10 }],
            },
          ],
        },
      ],
      nextScenes: ['scene-3-5-3'],
      previousScene: 'scene-3-5-1',
    },

    // --- Scène 3 : Les Racines Profondes ---
    {
      id: 'scene-3-5-3',
      sceneNumber: 3,
      title: "Les Racines Profondes",
      type: 'exploration',
      location: "Tunnels sous Yggdrasylve, Racines Profondes",
      locationId: 'sylve-racines-profondes',
      estimatedMinutes: 40,
      readAloud: {
        text: `La descente dans les Racines Profondes commence par un escalier taillé dans le bois vivant de l'Arbre-Monde lui-même. Les marches sont douces, polies par des siècles de pas druidiques, et sous vos pieds, le bois pulse faiblement — le battement de cœur lent et laborieux d'Yggdrasylve.

Plus vous descendez, plus le monde change. Les murs de terre font place à un entrelacs de racines massives, certaines aussi épaisses qu'un homme est grand, qui forment des tunnels organiques baignés d'une lumière verdâtre. La sève coule le long des parois comme du sang dans des veines — mais ici, en profondeur, elle est noire. Épaisse comme du goudron, elle suinte des blessures dans le bois et forme des flaques sombres sur le sol.

L'odeur est écœurante : terre humide, pourriture végétale, et quelque chose d'autre — une odeur chimique, presque métallique, qui n'a rien de naturel.

Les tunnels se ramifient dans toutes les directions, mais vous sentez un courant d'air froid venir d'en dessous. La corruption s'intensifie à mesure que vous descendez : les racines se tordent en formes agonisantes, des pustules de sève noire éclatent silencieusement en projetant une brume fétide, et le sol lui-même semble respirer — montant et descendant imperceptiblement.

Et puis vous entendez les murmures. Pas des voix — pas encore. Un chuchotement continu, comme mille feuilles froissées simultanément, qui semble venir des racines elles-mêmes. Elles parlent. Elles souffrent. Et elles essaient de vous dire quelque chose.`,
        mood: "Descente aux enfers naturels, claustrophobie organique, horreur végétale",
        music: "Drones graves, craquements de bois, suintements, murmures subliminaux",
      },
      gmNotes: [
        { type: 'info', text: "Les Racines Profondes sont un mini-donjon en 3 salles. Salle 1 : les tunnels principaux (exploration + piège). Salle 2 : la chambre du Sceau (combat). Salle 3 : l'autel de corruption (révélation + confrontation)." },
        { type: 'warning', text: "L'air est toxique dans les zones les plus corrompues. Constitution CD 45 toutes les 10 minutes ou 2d6 dégâts de poison. Les druides et rôdeurs ont l'avantage sur ce jet." },
        { type: 'secret', text: "Si Séraphina accompagne le groupe, elle les guide « par sécurité » loin de la preuve directe de sa trahison. Elle invente des raisons de prendre des détours. Insight CD 55 pour remarquer qu'elle semble savoir exactement où elle va, y compris dans les zones qui devraient être inexplorées." },
        { type: 'tip', text: "Les murmures des racines peuvent être compris avec un sort de Communication avec les Plantes ou un jet de Nature CD 60. Le message est : « Elle vient chaque nuit. L'argent cache le noir. La sève pleure. » Indice cryptique pointant vers Séraphina." },
        { type: 'lore', text: "Les Racines Profondes sont le lieu le plus sacré de la Sylve. Seuls les Gardiens-Premiers y descendaient jadis, une fois par siècle, pour renouveler le Sceau de Terre. La magie ici est ancienne, primordiale — bien plus puissante que tout ce que la Guilde des Arcanes connaît." },
      ],
      encounter: {
        name: "Gardiens Corrompus des Racines",
        enemies: [
          { name: "Treant Corrompu", hp: 95, atk: 18, ac: 16, cr: 5, abilities: ["Piétinement (3d8+4)", "Racines Enserantes (CD 55 Force, entravé)", "Sève Noire (2d6 poison au contact)", "Vulnérable au feu"] },
          { name: "Nuée de Spores Toxiques", hp: 45, atk: 14, ac: 13, cr: 3, abilities: ["Nuage Empoisonné (zone 3m, 2d8 poison)", "Résistance aux armes physiques", "Vulnérable au vent et au feu"] },
          { name: "Racine Animée", hp: 55, atk: 15, ac: 14, cr: 3, abilities: ["Constriction (2d8+3)", "Régénération (10 HP/tour si enracinée)", "Enterrement (traîne une cible sous terre)"] },
          { name: "Racine Animée", hp: 55, atk: 15, ac: 14, cr: 3, abilities: ["Constriction (2d8+3)", "Régénération (10 HP/tour si enracinée)", "Enterrement (traîne une cible sous terre)"] },
        ],
        terrain: ["Racines enchevêtrées (terrain difficile)", "Flaques de sève noire (2d6 poison si traversées)", "Plafond bas (désavantage armes longues)", "Zones de spores (obscurcissement partiel)"],
        tactics: "Le Treant charge le combattant le plus visible. Les Racines Animées tentent d'isoler les lanceurs de sorts en les traînant sous terre. La Nuée de Spores se positionne pour affecter un maximum de cibles. Si Séraphina est présente, elle « combat » héroïquement mais rate curieusement ses coups les plus importants (Insight CD 50 pour remarquer).",
        loot: ["Sève d'Yggdrasylve purifiée (3 doses, chacune soigne 4d8+5)", "Bois-Cœur pétrifié (composant de sort rare, valeur 200 PO)", "Graine de l'Arbre-Monde (artefact mineur — plantée, elle crée un arbre-sentinelle en 24h)"],
      },
      skillChecks: [
        { skill: 'Survie', dc: 50, success: "Vous trouvez le chemin le plus sûr à travers les racines, évitant les zones les plus corrompues. Le groupe ne subit pas les dégâts de poison environnementaux.", failure: "Les tunnels se ressemblent tous. Vous errez dans une zone corrompue — Constitution CD 45 ou 2d6 poison." },
        { skill: 'Arcanes', dc: 55, success: "Le Sceau de Terre est en dessous. Vous percevez sa magie — affaiblie, fracturée, mais encore intacte. Il tient, mais à peine. Un dernier choc pourrait le briser.", failure: "La magie ici est trop ancienne, trop dense. Impossible de distinguer quoi que ce soit de précis." },
      ],
      nextScenes: ['scene-3-5-4'],
      previousScene: 'scene-3-5-2',
      mapMovement: { from: 'sylve-emeraude-camp', to: 'sylve-racines-profondes' },
    },

    // --- Scène 4 : La Révélation ---
    {
      id: 'scene-3-5-4',
      sceneNumber: 4,
      title: "Le Masque Tombe",
      type: 'revelation',
      location: "Chambre du Sceau de Terre, sous Yggdrasylve",
      locationId: 'sylve-chambre-sceau',
      estimatedMinutes: 35,
      readAloud: {
        text: `La descente finale s'ouvre sur une caverne immense — si grande que votre lumière ne touche pas les murs. Le sol est un entrelacs de racines blanches, les racines les plus anciennes d'Yggdrasylve, et en leur centre, incrusté dans la roche mère, brille faiblement un cercle de runes d'un bleu mourant.

Le Sceau de Terre.

C'est plus grand que vous ne l'imaginiez — vingt mètres de diamètre, chaque rune haute comme un homme, gravée dans une pierre qui n'existe nulle part ailleurs dans le monde. Et il est en train de mourir. Les runes clignotent comme des bougies dans le vent. Des fissures noires serpentent entre elles, suintant une brume sombre qui rampe sur le sol.

Mais ce qui vous arrête net, c'est ce que vous voyez au centre du Sceau.

Un autel. Un autel qui n'a rien à faire ici — noir, anguleux, fait d'une pierre volcanique étrangère à la forêt. Dessus, une fiole de cristal noir pulse d'une lumière malsaine, déversant un filet continu de liquide sombre dans les fissures du Sceau. C'est la source du poison.

Et devant l'autel, prise en flagrant délit, se tient Séraphina.

Son armure d'argent est ouverte, révélant en dessous un plastron noir gravé du symbole du Cercle des Cendres — l'œil ouvert cerclé de flammes. Ses mains, couvertes de sève noire, tiennent encore la Fiole de Cendre Éternelle.

Pendant un instant, personne ne bouge. Puis Séraphina sourit. Pas le sourire chaleureux de la Commandeure-Adjointe. Un sourire froid, libéré, presque soulagé.

« Eh bien, » dit-elle d'une voix qui a perdu toute chaleur, « je suppose que les masques ne servent plus à rien. Vous êtes arrivés plus vite que prévu. Mais il est trop tard — le Sceau est fracturé. Un dernier coup et il cède. La question est : allez-vous me laisser finir, ou allez-vous me forcer à vous tuer d'abord ? »`,
        mood: "Choc de la trahison, tension maximale, choix impossible",
        music: "Silence brutal, puis thème sombre et martial, percussions de guerre",
      },
      gmNotes: [
        { type: 'info', text: "C'est LE moment pivot du chapitre. La trahison de Séraphina change tout — elle était un visage ami, et maintenant elle est l'ennemie. Laissez les joueurs accuser le coup." },
        { type: 'warning', text: "Séraphina est un boss redoutable (HP 95, ATK 19, AC 19, CR 8). Elle a la Fiole de Cendre Éternelle qui lui donne des pouvoirs supplémentaires. Ne la rendez pas facile à battre — c'est un combat mémorable." },
        { type: 'secret', text: "La Fiole peut être détruite (HP 20, AC 15, vulnérable à la magie sacrée), ce qui affaiblit considérablement Séraphina et arrête le poison. Mais la détruire libère une explosion de magie nécrotique (6d6 dans un rayon de 5m)." },
        { type: 'tip', text: "Si les joueurs veulent parlementer, Séraphina est prête à parler. Elle croit sincèrement que briser les Sceaux est nécessaire — que les entités emprisonnées ne sont pas maléfiques, mais des « forces naturelles » qui ont été enfermées par des tyrans. C'est faux, mais elle y croit. Le dialogue rend le combat plus personnel." },
        { type: 'lore', text: "La Fiole de Cendre Éternelle est un artefact du Cercle des Cendres forgé à partir des cendres du Premier Feu — le cataclysme qui a mis fin à l'Ère d'Ashka. Elle contient une fraction du pouvoir destructeur original, capable de corrompre n'importe quelle magie de scellement." },
      ],
      npcs: [
        {
          name: "Archon Séraphina (révélée)",
          role: "Archon du Cercle des Cendres / Traîtresse",
          personality: "Fanatique calme. Ne se considère pas comme une méchante — elle pense libérer le monde. Respecte les héros mais ne reculera pas.",
          appearance: "L'armure d'argent est ouverte sur le plastron noir du Cercle. Les yeux bleus sont maintenant striés de veines noires — effet de la Fiole. Ses cheveux blonds sont défaits, encadrant un visage qui ne sourit plus avec chaleur mais avec une certitude terrifiante.",
          secret: "Elle a un moyen d'évasion — un Mot de Rappel pré-lancé qui la téléporte au quartier général du Cercle si elle tombe sous 20 HP. Elle reviendra au Chapitre 7.",
          dialogues: {
            greeting: "« Ne me regardez pas comme ça. Je ne suis pas un monstre. Je suis la seule personne dans cette pièce qui voit la vérité. Les Sceaux sont des prisons injustes. Ce qui est enfermé en dessous mérite d'être libre. »",
            info: "« L'Aube d'Argent est aveugle. Ils gardent des cages dont ils ne comprennent même pas le mécanisme. Malachar, lui, comprend. Il a vu au-delà des Sceaux. Et ce qu'il a vu... ce n'est pas le mal. C'est la puissance brute, enchaînée par la peur. »",
            quest: "« Laissez-moi terminer. Un seul coup de plus et le Sceau cède. Ce qui est dessous n'est pas un démon — c'est un Gardien originel, emprisonné par les tyrans d'Ashka. Aidez-moi, et vous serez du côté de la liberté. »",
            farewell: "« Nous nous reverrons. Le Cercle ne s'arrête pas avec moi. Les Sceaux tomberont, un par un. C'est inévitable. La seule question est combien de sang il faudra verser d'ici là. »",
          },
          stats: { hp: 95, atk: 19, ac: 19 },
        },
      ],
      encounter: {
        name: "Confrontation avec l'Archon Séraphina",
        enemies: [
          { name: "Archon Séraphina", hp: 95, atk: 19, ac: 19, cr: 8, abilities: ["Frappe Sacrée Corrompue (3d8+5 nécrotique)", "Bouclier de Cendres (réaction, +5 AC)", "Mot de Pouvoir : Douleur (CD 60 Sagesse, 4d8 psychiques)", "Aura de Corruption (1d6 nécrotique à quiconque dans 3m)", "Mot de Rappel (fuite sous 20 HP)"] },
          { name: "Élémentaire de Sève Noire", hp: 65, atk: 16, ac: 14, cr: 4, abilities: ["Étreinte Goudronneuse (entravé, 2d8 poison/tour)", "Division (à 30 HP, se sépare en deux élémentaires de 30 HP)", "Immunité poison"] },
          { name: "Élémentaire de Sève Noire", hp: 65, atk: 16, ac: 14, cr: 4, abilities: ["Étreinte Goudronneuse (entravé, 2d8 poison/tour)", "Division (à 30 HP, se sépare en deux élémentaires de 30 HP)", "Immunité poison"] },
        ],
        terrain: ["Sceau au sol (terrain sacré — sorts de guérison renforcés +50%)", "Fissures du Sceau (terrain dangereux, 1d6 force si traversées)", "Autel du Cercle (couverture 3/4, source de corruption)", "Racines blanches (terrain difficile mais les druides les ignorent)"],
        tactics: "Séraphina engage le combattant le plus fort pour le fixer. Les Élémentaires ciblent les soigneurs. Si Séraphina tombe sous 20 HP, elle utilise son Mot de Rappel pour fuir en lançant : « Nous nous reverrons. » Si la Fiole est détruite en premier, Séraphina perd son Aura de Corruption et son Bouclier de Cendres.",
        loot: ["Fiole de Cendre Éternelle (si non détruite — artefact maudit, puissant mais corrupteur)", "Armure d'Argent de l'Aube (enchantée, AC 18, brisée moralement — la restaurer est une quête en soi)", "Sceau de l'Archon (médaillon, permet de localiser d'autres agents du Cercle dans un rayon de 100m)", "300 PO en gemmes noires"],
      },
      choices: [
        {
          id: 'choice-seraphina-confrontation',
          prompt: "Face à Séraphina révélée, que font les personnages ?",
          options: [
            {
              label: "L'attaquer immédiatement",
              description: "Pas de discussion — elle a trahi l'Aube et empoisonné l'Arbre-Monde.",
              consequence: "Combat direct. Séraphina est prête — elle invoque les Élémentaires de Sève Noire. L'avantage de la surprise est perdu.",
              nextScene: 'scene-3-5-5',
            },
            {
              label: "Tenter de la raisonner",
              description: "Essayer de la convaincre d'arrêter avant qu'il ne soit trop tard.",
              consequence: "Jet de Persuasion CD 65. Échec : elle attaque. Succès : elle hésite un instant — round surprise pour les PJ.",
              nextScene: 'scene-3-5-5',
              skillCheck: { skill: 'Persuasion', dc: 65, success: "Les mots touchent une corde. Séraphina hésite — ses yeux vacillent. Juste un instant. Un instant qui vous donne l'avantage.", failure: "« Vos mots sont ceux d'un monde aveugle. » Elle lève son épée. Le combat commence." },
            },
            {
              label: "Détruire la Fiole d'abord",
              description: "Se concentrer sur la Fiole de Cendre Éternelle pour arrêter le poison.",
              consequence: "Jet d'Athlétisme CD 50 pour atteindre l'autel. La Fiole a 20 HP et AC 15. Sa destruction provoque une explosion (6d6 nécrotique, CD 50 Dextérité pour moitié) mais affaiblit Séraphina.",
              nextScene: 'scene-3-5-5',
              skillCheck: { skill: 'Athlétisme', dc: 50, success: "Vous foncez vers l'autel, esquivant Séraphina. Vos mains trouvent la Fiole — le cristal noir pulse de malveillance sous vos doigts.", failure: "Séraphina bloque votre passage. « Pas si vite. » Le combat commence, la Fiole intacte." },
            },
          ],
        },
      ],
      nextScenes: ['scene-3-5-5'],
      previousScene: 'scene-3-5-3',
    },

    // --- Scène 5 : Les Conséquences ---
    {
      id: 'scene-3-5-5',
      sceneNumber: 5,
      title: "Cicatrices dans le Bois",
      type: 'choice',
      location: "Chambre du Sceau / Camp des Gardiens",
      locationId: 'sylve-emeraude-camp',
      estimatedMinutes: 25,
      readAloud: {
        text: `Le silence qui suit le combat est assourdissant.

Séraphina a disparu — téléportée ou abattue, selon vos choix. Mais les dégâts sont faits. Le Sceau de Terre est fissuré, affaibli, ses runes bleutées clignotant comme des étoiles mourantes. Il tient encore, mais il ne faudrait pas grand-chose pour le briser complètement.

L'Arbre-Monde au-dessus de vous gémit — un son profond, viscéral, qui résonne dans vos os. Les racines blanches frémissent, et lentement, la sève noire commence à refluer. Le poison s'arrête. Mais le mal est fait : des années de corruption ont laissé des cicatrices que même la magie druidique la plus puissante ne pourra effacer complètement.

Quand vous remontez à la surface, le camp des Gardiens est en émoi. La nouvelle de la trahison de Séraphina se répand comme un feu de forêt. Elyndor vous attend, le visage marqué par une douleur nouvelle — pas la maladie de l'Arbre-Monde, mais la blessure de la confiance brisée.

« L'Aube d'Argent... infiltrée par le Cercle, » murmure-t-il. « Si nous ne pouvons pas faire confiance à nos alliés, en qui croire ? »

La question reste suspendue dans l'air de la forêt, lourde de réponses que personne ne veut entendre.

Il y a une décision à prendre. Le Sceau de Terre est affaibli mais intact. Pour le renforcer, il faudrait un sacrifice : le Cœur de Sève d'Elyndor, la dernière graine-mère d'Yggdrasylve. L'utiliser sauverait le Sceau pour des décennies — mais l'Arbre-Monde ne pourra jamais se régénérer complètement. Ou bien, garder le Cœur de Sève pour soigner l'Arbre-Monde, et espérer que le Sceau tienne assez longtemps pour trouver une autre solution.

Sauver le Sceau ou sauver l'Arbre. Vous ne pouvez pas faire les deux.`,
        mood: "Amertume de la victoire, poids des conséquences, choix déchirant",
        music: "Thème mélancolique, violoncelle solo, vent dans les branches",
      },
      gmNotes: [
        { type: 'info', text: "C'est le choix majeur du Chapitre 5. Aucune option n'est « bonne » — les deux ont des conséquences durables qui affecteront le reste de la campagne." },
        { type: 'warning', text: "Si les joueurs cherchent une troisième option, laissez-les essayer mais rendez-la très difficile (CD 70+ sur le check le plus pertinent). Le thème de l'Acte 3 est le sacrifice — il doit y avoir un prix." },
        { type: 'tip', text: "Elyndor ne presse pas les héros. Il leur expose les options et les laisse décider. Mais s'ils choisissent de sauver le Sceau au détriment de l'Arbre, il pleure silencieusement — sa vie est liée à l'Arbre-Monde." },
        { type: 'secret', text: "Si Séraphina s'est échappée, elle rapporte l'état du Sceau à Malachar. L'Archon principal ajuste ses plans — le Sceau de Mer devient la cible prioritaire (Chapitre 6)." },
      ],
      choices: [
        {
          id: 'choice-seal-or-tree',
          prompt: "Le Cœur de Sève : renforcer le Sceau ou soigner l'Arbre-Monde ?",
          options: [
            {
              label: "Renforcer le Sceau de Terre",
              description: "Utiliser le Cœur de Sève pour sceller les fissures. L'Arbre-Monde survivra mais ne se remettra jamais complètement.",
              consequence: "Le Sceau de Terre est restauré pour 50 ans. Mais Yggdrasylve est définitivement affaibli — la Sylve rétrécira, les Gardiens perdront une partie de leur pouvoir. Elyndor vieillit de plusieurs siècles en quelques secondes, affaibli mais vivant.",
              nextScene: 'scene-3-6-1',
              reputationChange: [
                { faction: 'Aube d\'Argent', amount: 15 },
                { faction: 'Gardiens d\'Émeraude', amount: -10 },
              ],
            },
            {
              label: "Soigner l'Arbre-Monde",
              description: "Utiliser le Cœur de Sève pour purifier Yggdrasylve. Le Sceau restera fissuré mais l'Arbre sera sauvé.",
              consequence: "Yggdrasylve refleurit en quelques heures, plus fort qu'avant. Mais le Sceau reste fragile — il pourrait céder si le Cercle frappe à nouveau. Elyndor retrouve sa vigueur et jure de protéger le Sceau par d'autres moyens.",
              nextScene: 'scene-3-6-1',
              reputationChange: [
                { faction: 'Aube d\'Argent', amount: -5 },
                { faction: 'Gardiens d\'Émeraude', amount: 20 },
              ],
            },
            {
              label: "Tenter de faire les deux (risqué)",
              description: "Diviser le Cœur de Sève. Résultat incertain.",
              consequence: "Jet d'Arcanes CD 70. Succès : les deux sont partiellement sauvés (Sceau renforcé 10 ans, Arbre partiellement soigné). Échec : le Cœur est gaspillé, ni le Sceau ni l'Arbre ne sont aidés. Échec critique : le Sceau se fissure davantage.",
              nextScene: 'scene-3-6-1',
              skillCheck: { skill: 'Arcanes', dc: 70, success: "Le Cœur se divise dans un éclat de lumière verte. Les deux moitiés trouvent leur cible — imparfaitement, mais suffisamment. Le Sceau se stabilise. L'Arbre respire.", failure: "Le Cœur se brise. L'énergie se dissipe dans l'air comme une promesse non tenue. Ni le Sceau ni l'Arbre ne reçoivent rien. Le sacrifice est vain." },
            },
          ],
        },
      ],
      loot: ["Bénédiction d'Yggdrasylve (bonus permanent +2 aux jets de sauvegarde contre le poison et la corruption)", "Branche de l'Arbre-Monde (focalisateur druidique rare, +2 aux sorts de nature)", "200 PO en gemmes d'émeraude offertes par les Gardiens"],
      nextScenes: ['scene-3-6-1'],
      previousScene: 'scene-3-5-4',
    },
  ],
  chapterConclusion: {
    text: `La trahison de Séraphina laisse des cicatrices plus profondes que n'importe quelle blessure physique. L'Aube d'Argent est ébranlée — si une Commandeure-Adjointe était une espionne du Cercle, qui d'autre ? La confiance, cette monnaie invisible qui cimentait l'alliance, est dévaluée.

Les Gardiens d'Émeraude pansent les blessures de la Sylve, mais le monde a changé. Que le Sceau ait été renforcé ou que l'Arbre ait été sauvé, les conséquences se feront sentir pendant longtemps. Et au loin, dans l'ombre, Malachar sourit. Car la Sylve n'était qu'une distraction.

Le vrai coup est déjà en marche, sur la Côte des Orages, où le Sceau de Mer dort sous les vagues.`,
    mood: "Amertume, méfiance naissante, transition vers la menace maritime",
  },
  rewards: { xp: 2500, gold: "500-800 PO", items: ["Sceau de l'Archon", "Branche de l'Arbre-Monde", "Bénédiction d'Yggdrasylve"] },
};

// ============================================================================
// CHAPITRE 6 : LA MER NOIRE
// ============================================================================

const CHAPTER_6: BookChapter = {
  id: 'ch-3-6',
  actNumber: 3,
  chapterNumber: 6,
  title: "La Mer Noire",
  subtitle: "Ce qui dort sous les vagues",
  summary: "Le Sceau de Mer se brise sur la Côte des Orages. Un temple noyé remonte des profondeurs. Les héros doivent affronter des horreurs marines, naviguer dans un conflit entre pêcheurs et pirates, et plonger dans les ruines sous-marines pour empêcher la libération complète de l'entité scellée. La mer elle-même devient l'ennemie.",
  levelRange: "9-10",
  themes: ['horreur marine', 'combat naval', 'exploration sous-marine', 'sacrifice des innocents'],
  chapterIntro: {
    text: `Le messager est arrivé à cheval, couvert de sel et d'écume, les yeux fous d'une terreur qu'il n'arrivait pas à mettre en mots. Il a fallu trois verres de brandy et une heure de patience avant qu'il puisse articuler une phrase cohérente.

« La mer... la mer s'est ouverte. »

Les rapports qui suivent sont fragmentaires, contradictoires, et unanimement terrifiants. Sur la Côte des Orages, le village de Port-Brisé a été englouti par une vague de vingt mètres — une vague venue de nulle part, par temps calme. Les survivants parlent de lumières dans l'eau, de tentacules grands comme des mâts de navire, et d'un son — un chant grave, inhumain, qui résonne encore dans leurs crânes.

Et puis, le rapport le plus inquiétant : au large de Port-Brisé, là où la mer faisait soixante mètres de profondeur, quelque chose est remonté. Un temple. Un temple de pierre noire, couvert d'algues millénaires et de runes ashkanes, qui émerge de l'eau comme un cadavre gonflé remontant à la surface.

Le Sceau de Mer est brisé.

Le voyage vers la côte est ponctué par des signes de plus en plus alarmants : rivières qui coulent à l'envers, pluies de poissons morts, marées aberrantes. La nature elle-même semble déréglée, comme si l'océan avait perdu la raison.

Quand vous atteignez enfin les falaises surplombant la Côte des Orages, le spectacle qui s'offre à vous coupe le souffle — et pas de la bonne manière.`,
    mood: "Horreur cosmique maritime, urgence désespérée",
    music: "Thème océanique sombre, cuivres graves, corne de brume, vent de tempête",
  },
  scenes: [
    // --- Scène 1 : La Côte Dévastée ---
    {
      id: 'scene-3-6-1',
      sceneNumber: 1,
      title: "Port-Brisé",
      type: 'narration',
      location: "Village de Port-Brisé, Côte des Orages",
      locationId: 'cote-des-orages',
      estimatedMinutes: 25,
      readAloud: {
        text: `Port-Brisé porte bien son nom, maintenant.

Le village — autrefois une communauté prospère de pêcheurs et de marchands — n'est plus qu'un champ de ruines détrempé. Les maisons sont renversées, leurs fondations arrachées par la vague. Des bateaux gisent dans les rues, portés à des centaines de mètres de la côte. L'odeur de sel, de poisson mort et de bois pourri est omniprésente, épaisse, nauséabonde.

Les survivants sont regroupés sur les hauteurs, dans un camp de fortune fait de voiles de bateaux et de planches récupérées. Quelques centaines de personnes — des familles brisées, des enfants qui ne pleurent plus, des vieillards qui fixent la mer avec une terreur muette. Un feu brûle au centre, entouré de gens qui ne cherchent pas la chaleur mais la lumière. La nuit, personne ne veut être dans le noir.

Et au large, visible depuis les falaises, le Temple Noyé se dresse au-dessus des vagues. C'est un bâtiment impossible — des colonnes de pierre noire couvertes de bernacles et d'algues, un dôme craquelé d'où filtrent des lueurs verdâtres, et des escaliers qui plongent dans l'eau sombre. Il est à la fois magnifique et profondément, viscéralement, dérangeant. Comme un œil qui se serait ouvert au fond de l'océan.

La mer autour du temple est différente. Plus sombre. Plus lourde. Et de temps en temps, quelque chose bouge sous la surface — quelque chose d'immense, dont la silhouette fait trois fois la taille du plus grand navire du port.

Un vieil homme s'approche de vous. Le chef du village, Capitaine Gorvald, la soixantaine, un homme brisé par un océan qu'il pensait connaître.

« Vous êtes venus. Bien. Parce que ça empire. Chaque nuit, le chant est plus fort. Et chaque matin, la marée monte un peu plus haut. »`,
        mood: "Désolation côtière, terreur des profondeurs, désespoir des survivants",
        music: "Vagues lourdes, vent sifflant, grincements de bois, silence entrecoupé de sanglots lointains",
      },
      gmNotes: [
        { type: 'info', text: "Port-Brisé est la base d'opérations pour ce chapitre. Les joueurs doivent comprendre l'ampleur du désastre, établir des contacts locaux, et préparer une expédition vers le Temple Noyé." },
        { type: 'warning', text: "Le chant du Temple est audible la nuit. Sagesse CD 40 pour résister à l'attirance. Échec : le personnage se réveille au bord de l'eau, sans souvenir de s'y être rendu." },
        { type: 'secret', text: "Le Syndicat de l'Ombre a un contact ici — la contrebandière Maris « Lame-Salée ». Elle possède le seul navire assez solide pour atteindre le Temple. Elle veut quelque chose en échange : un coffre dans le Temple, contenant un artefact qu'elle doit livrer à l'Ombre." },
        { type: 'tip', text: "Introduisez Gorvald comme un homme compétent brisé par les événements. Ses informations sont précieuses : horaires des marées, courants, comportement de la créature sous-marine. Il a perdu sa fille dans la vague." },
        { type: 'lore', text: "Le Temple Noyé est un sanctuaire ashkan dédié à Thalassor, l'Entité Marine — une créature primordiale scellée sous l'océan il y a 3 000 ans. Le Sceau de Mer était maintenu par le Temple lui-même, mais le Cercle des Cendres a trouvé le moyen de l'inverser — le Temple est devenu la clé qui ouvre sa propre serrure." },
      ],
      npcs: [
        {
          name: "Capitaine Gorvald",
          role: "Chef de Port-Brisé / Guide maritime",
          personality: "Vieux loup de mer brisé par la perte. Pragmatique, courageux, mais hanté. Refuse de montrer sa douleur devant ses gens.",
          appearance: "Humain, la soixantaine, peau tannée par le sel, barbe blanche, un œil couvert d'un bandeau (blessure de la vague). Manteau de capitaine déchiré, mains calleuses qui tremblent quand il regarde la mer.",
          secret: "Sa fille, Éléna, n'est pas morte dans la vague — elle a été attirée dans le Temple par le chant. Il le sait, mais n'ose pas y aller seul.",
          dialogues: {
            greeting: "« Pas de protocole, pas de politesse. On n'a plus le temps. Vous voyez cette chose au large ? Chaque nuit, elle grandit. Et la mer obéit à... à ce qu'il y a dedans. »",
            info: "« Le chant a commencé il y a trois semaines. D'abord, juste la nuit. Maintenant, même le jour, si vous tendez l'oreille. Les pêcheurs les plus proches du large... ils changent. Leurs yeux deviennent vitreux. Ils parlent d'une voix dans l'eau. Ma fille Éléna... elle a été la première. »",
            quest: "« Il faut atteindre ce temple. Il faut le détruire, le refermer, je ne sais pas — mais il faut faire quelque chose. Le problème, c'est l'eau autour. Elle est... mauvaise. Et la créature qui rôde dessous. Il vous faut un navire solide et quelqu'un qui connaît ces eaux. Maris Lame-Salée a les deux. Je ne l'aime pas, mais elle est votre meilleure chance. »",
            farewell: "« Si vous trouvez ma fille... dites-lui que son père l'attend. S'il vous plaît. Dites-lui de revenir. »",
          },
          stats: { hp: 40, atk: 11, ac: 13 },
        },
        {
          name: "Maris « Lame-Salée »",
          role: "Contrebandière / Capitaine du Marée-Noire",
          personality: "Cynique, pragmatique, mais avec un code d'honneur de pirate. Ne fait rien gratuitement mais ne trahit jamais un accord.",
          appearance: "Humaine, la quarantaine, peau sombre, cheveux noirs tressés avec des perles de nacre. Cicatrice de tentacule sur l'avant-bras gauche. Cuir marin, pistolet à silex, coutelas courbe.",
          secret: "Agent du Syndicat de l'Ombre. Le coffre dans le Temple contient un fragment de la Carte des Sceaux — une relique que l'Ombre veut pour ses propres raisons, pas nécessairement mauvaises.",
          dialogues: {
            greeting: "« Eh bien, eh bien. Des héros. Ça faisait longtemps que j'en avais pas vu. La dernière fois, ils sont morts. Vous, vous avez l'air un peu plus solides. Peut-être. »",
            info: "« Mon navire, le Marée-Noire, est le seul à avoir approché le Temple et à en être revenu. L'eau autour est... épaisse. Comme de l'huile. Et en dessous, il y a quelque chose. Quelque chose qui n'est pas un poisson, pas un kraken — quelque chose de bien pire. J'ai vu son œil. Un seul œil, grand comme ma coque. »",
            quest: "« Je vous y emmène. Gratuitement même, parce que cette chose menace mon business. Mais il y a un coffre dans le Temple — marqué d'un serpent de mer. Ce coffre est à moi. Pas de questions, pas de discussion. Le reste, vous pouvez le brûler. On a un accord ? »",
            farewell: "« Marée haute à l'aube. Soyez sur le quai. Si vous êtes en retard, je pars sans vous. Non, je plaisante. Mais soyez à l'heure quand même. »",
          },
          stats: { hp: 65, atk: 16, ac: 15 },
        },
      ],
      choices: [
        {
          id: 'choice-port-brise',
          prompt: "Comment les personnages préparent-ils l'expédition au Temple ?",
          options: [
            {
              label: "Négocier avec Maris",
              description: "Accepter son marché pour le coffre en échange du transport.",
              consequence: "Accord conclu. Maris prépare le Marée-Noire pour l'aube. Elle est efficace et professionnelle.",
              nextScene: 'scene-3-6-2',
            },
            {
              label: "Trouver un autre moyen",
              description: "Chercher un bateau ou un passage alternatif vers le Temple.",
              consequence: "Jet d'Investigation CD 55. Succès : un tunnel côtier mène à une grotte reliée au Temple par un passage sous-marin. Dangereux mais indépendant de Maris. Échec : perte d'un jour de recherche infructueuse.",
              nextScene: 'scene-3-6-2',
              skillCheck: { skill: 'Investigation', dc: 55, success: "Un vieux pêcheur vous parle d'un passage sous les falaises. Dangereux, étroit, et partiellement inondé. Mais faisable.", failure: "Aucune alternative viable. Le Marée-Noire de Maris reste la seule option réaliste." },
            },
            {
              label: "Aider les survivants d'abord",
              description: "Stabiliser le camp avant de partir. Soigner les blessés, organiser les défenses.",
              consequence: "Retard d'un jour mais +15 réputation avec la côte. Les survivants fournissent des potions et des informations supplémentaires. Le chant du Temple s'intensifie pendant ce temps.",
              reputationChange: [{ faction: 'Peuple de la Côte', amount: 15 }],
              nextScene: 'scene-3-6-2',
            },
          ],
        },
      ],
      nextScenes: ['scene-3-6-2'],
      previousScene: 'scene-3-5-5',
      mapMovement: { from: 'sylve-emeraude', to: 'cote-des-orages' },
    },

    // --- Scène 2 : La Traversée ---
    {
      id: 'scene-3-6-2',
      sceneNumber: 2,
      title: "Eaux Mortes",
      type: 'combat',
      location: "En mer, approche du Temple Noyé",
      locationId: 'cote-des-orages-mer',
      estimatedMinutes: 35,
      readAloud: {
        text: `Le Marée-Noire quitte le port au lever du soleil, mais le soleil lui-même semble réticent, voilé par une brume grise qui refuse de se dissiper. La mer est calme — trop calme. Pas une vague, pas un courant. L'eau est lisse comme du verre noir, et en dessous de cette surface immobile, des formes sombres se déplacent.

Maris tient la barre avec une tension visible dans chaque muscle. Son équipage — cinq marins endurcis — travaille en silence, les yeux fixés sur l'eau. Personne ne parle. Le seul son est le grincement de la coque et le clapotis anormal de la mer contre le bois.

À mi-chemin, l'eau change. Elle devient plus épaisse, plus sombre — presque noire, avec une consistance huileuse qui laisse des traces iridescentes sur la coque. L'odeur est celle d'un fond marin retourné : algues mortes, sel concentré, et quelque chose de plus ancien, de plus organique, comme le souffle d'une créature qui dort depuis des millénaires.

Et puis la mer se met à bouger.

Pas des vagues — des ondulations profondes, comme si quelque chose d'immense se retournait loin en dessous. Le navire tangue. Les mâts grincent. Un marin hurle et pointe du doigt : à tribord, un tentacule — non, pas un tentacule, un bras — aussi large que le navire, couvert de ventouses irisées et de runes lumineuses gravées dans la chair même de la créature, émerge de l'eau dans une gerbe d'écume noire.

Maris hurle un ordre. Les voiles claquent. Le Marée-Noire s'incline dangereusement.

La bataille pour atteindre le Temple commence.`,
        mood: "Terreur maritime, combat naval contre l'impossible",
        music: "Percussions de combat naval, cuivres de guerre, vagues de tempête, cris de marins",
      },
      gmNotes: [
        { type: 'info', text: "Combat naval ! Les joueurs doivent défendre le navire contre les appendices de Thalassor tout en naviguant vers le Temple. Le but n'est pas de tuer la créature (impossible) mais de survivre à la traversée." },
        { type: 'warning', text: "Le Marée-Noire a 150 HP. Si le navire tombe à 0, les joueurs sont à l'eau — et Thalassor est en dessous. Chaque round, un tentacule attaque le navire (ATK 20, 3d10 dégâts au navire). Les joueurs peuvent attaquer les tentacules pour les repousser." },
        { type: 'tip', text: "Maris est une alliée compétente dans ce combat. Elle dirige les manœuvres du navire et peut donner des bonus tactiques (+2 ATK pour un tour si les joueurs suivent ses ordres). Ses marins combattent aussi (HP 25 chacun)." },
        { type: 'secret', text: "Les runes sur les tentacules sont des fragments du Sceau de Mer brisé. Un joueur qui lit les runes (Arcanes CD 60) comprend que le Sceau n'est pas complètement brisé — il reste un fragment au cœur du Temple. S'il est activé, le Sceau peut être partiellement restauré." },
        { type: 'lore', text: "Thalassor n'est pas un monstre — c'est une entité primordiale, une incarnation de l'océan profond. Il n'est ni bon ni mauvais dans un sens humain. Mais il est immense, affamé, et il ne fait pas la distinction entre un navire et un poisson." },
      ],
      encounter: {
        name: "La Traversée de Thalassor",
        enemies: [
          { name: "Tentacule de Thalassor (×3)", hp: 60, atk: 20, ac: 16, cr: 6, abilities: ["Frappe de Tentacule (3d10 contondant au navire ou 2d10 à une créature)", "Saisie (CD 55 Force, agrippé et traîné vers l'eau)", "Régénération (15 HP/tour si dans l'eau)"] },
          { name: "Nuée de Poissons Abyssaux", hp: 40, atk: 13, ac: 12, cr: 2, abilities: ["Morsure en Nuée (3d6 perforant)", "Nuage de Sang (obscurcit l'eau)", "Résistance aux dégâts de zone"] },
          { name: "Élémentaire d'Eau Corrompue", hp: 75, atk: 17, ac: 15, cr: 5, abilities: ["Vague Déferlante (cone 6m, CD 50 Force ou renversé)", "Forme Liquide (traverse les interstices)", "Absorption d'Eau (se soigne de 2d8 en absorbant l'eau de mer)"] },
        ],
        terrain: ["Pont du navire (instable, Acrobaties CD 35 pour les actions de mouvement)", "Bastingages (couverture 1/2)", "Mâts (hauteur, avantage pour les attaques à distance)", "Eau noire (tomber à l'eau = danger mortel, 2d6 acide/tour + risque de Saisie par tentacule)"],
        tactics: "Les tentacules alternent entre frapper le navire et saisir des personnes. L'Élémentaire monte à bord par le flanc. La Nuée attaque quiconque s'approche du bastingage. Objectif : survivre 5 rounds pour atteindre le Temple. Chaque tentacule détruit réduit les dégâts au navire.",
        loot: ["Écaille de Thalassor (matériau d'armure, AC +1 dans l'eau)", "Perle Noire des Profondeurs (valeur 150 PO, composant de sort aquatique)", "Fragment de rune du Sceau de Mer"],
      },
      skillChecks: [
        { skill: 'Athlétisme', dc: 50, success: "Vous agrippez un tentacule et le frappez au point faible — la base ventousée. Il se rétracte dans un spasme de douleur.", failure: "Le tentacule vous envoie glisser sur le pont. Vous percutez le mât. 2d6 dégâts contondants." },
        { skill: 'Acrobaties', dc: 45, success: "Vous gardez l'équilibre malgré le tangage, trouvant vos appuis avec une grâce surprenante sur ce pont chaotique.", failure: "Le pont se dérobe sous vos pieds. Vous tombez à plat, perdant votre action ce tour." },
      ],
      nextScenes: ['scene-3-6-3'],
      previousScene: 'scene-3-6-1',
    },

    // --- Scène 3 : Le Temple Noyé ---
    {
      id: 'scene-3-6-3',
      sceneNumber: 3,
      title: "Le Temple Englouti",
      type: 'exploration',
      location: "Temple Noyé de Thalassor",
      locationId: 'temple-noye',
      estimatedMinutes: 45,
      readAloud: {
        text: `Le Marée-Noire s'amarre aux colonnes brisées du Temple, la coque gémissant contre la pierre ancienne. De près, le Temple est encore plus impressionnant — et plus terrifiant — que vu depuis la côte.

Les colonnes font vingt mètres de haut, taillées dans un basalte noir veiné de nacre qui irise sous la lumière grise. Des bas-reliefs couvrent chaque surface : des scènes de créatures marines enroulées autour de la terre, des vagues dévorant des cités, et au centre de chaque tableau, un œil — un seul œil immense, ouvert, qui semble vous suivre du regard.

Le dôme central est partiellement effondré, offrant une entrée par le haut. En dessous, le Temple plonge sous la surface de l'eau. Les escaliers descendent dans une obscurité verdâtre où l'eau de mer clapote contre les marches inférieures. Des bulles montent des profondeurs à intervalles réguliers, comme la respiration d'un être vivant.

L'air est saturé de sel et de magie ancienne. Vos enchantements de protection crépitent et s'affaiblissent — la magie ici est différente, plus vieille, hostile aux sorts modernes. Les murs eux-mêmes suintent une énergie qui fait vibrer vos dents.

Au centre de la salle principale, à moitié submergé, se dresse un autel de corail noir. Dessus, un cercle de runes — le fragment du Sceau de Mer. Il brille faiblement, pulsant au rythme de la chose qui bouge en dessous. C'est la dernière ancre. Le dernier verrou.

Et au fond du Temple, dans l'eau noire, deux lumières s'allument. Pas des lanternes. Des yeux. Immenses, luminescents, d'un vert maladif. Ils vous regardent. Et vous entendez la voix — pas avec vos oreilles, mais directement dans votre crâne.

« Des insectes sur ma porte. Curieux. »`,
        mood: "Horreur lovecraftienne, temple alien, face à l'incompréhensible",
        music: "Résonance sous-marine, échos métalliques, murmures dans une langue inconnue, basse continue oppressante",
      },
      gmNotes: [
        { type: 'info', text: "Le Temple est un donjon en 3 zones. Zone 1 : la salle principale (ci-dessus). Zone 2 : les galeries submergées (nécessitent Respiration Aquatique ou équivalent). Zone 3 : la chambre du Sceau dans les profondeurs." },
        { type: 'warning', text: "Thalassor est partiellement éveillé. Il peut communiquer télépathiquement et tenter de corrompre les joueurs. Sagesse CD 55 pour résister à ses suggestions. Il n'attaque pas directement dans le Temple — pas encore." },
        { type: 'secret', text: "Le coffre de Maris est dans la Zone 2. Il contient un Fragment de la Carte des Sceaux — un artefact qui montre l'emplacement de tous les Sceaux restants. Si les joueurs le donnent à Maris, le Syndicat de l'Ombre obtient une information cruciale. S'ils le gardent, Maris est furieuse mais ne se bat pas." },
        { type: 'tip', text: "La fille de Gorvald, Éléna, est vivante dans la Zone 2, sous l'emprise du chant de Thalassor. La sauver est possible (Dissipation de la Magie CD 55 ou Persuasion CD 60 pour « la réveiller ») mais ralentit l'exploration." },
        { type: 'lore', text: "Thalassor n'est pas maléfique — il est indifférent. Pour lui, les humains sont des organismes insignifiants. Sa « libération » ne serait pas une invasion mais un retour à un état naturel : l'océan reprenant les terres côtières, les créatures marines dominant les surface. C'est la fin de la civilisation côtière, pas du monde." },
      ],
      npcs: [
        {
          name: "Éléna Gorvald",
          role: "Fille du capitaine, sous emprise de Thalassor",
          personality: "Sous l'emprise : calme, distante, parle avec la voix de Thalassor. Libérée : terrifiée, confuse, mais courageuse.",
          appearance: "Humaine, vingt ans, cheveux bruns emmêlés d'algues, peau pâle comme de la craie. Yeux vitreux qui brillent d'un vert marin. Pieds nus, robe de pêcheuse trempée.",
          secret: "Sous l'emprise, Éléna a appris des choses de Thalassor. Elle connaît la faiblesse du Sceau : un chant inverse — le chant de Scellement que les Ashkans utilisaient — peut le renforcer.",
          dialogues: {
            greeting: "« (Sous emprise) Il vous attendait. Il attend depuis si longtemps. L'eau est patiente, mais même la patience a une fin. (Libérée) Où... où est-ce que je suis ? Papa ? Où est mon père ? »",
            info: "« (Sous emprise) Le Sceau est une cruauté. Imaginez — emprisonné dans le noir, sous le poids de l'océan, pendant trois mille ans. Vous aussi, vous chanteriez pour être libre. (Libérée) Il y a un chant. Il me l'a appris malgré lui. Le chant qui a créé le Sceau. Je peux... je crois que je peux le chanter. »",
            quest: "« (Libérée) Je connais le chant. Mais il faut être au cœur du Sceau pour que ça fonctionne. Tout au fond. Là où l'eau est noire et l'air n'existe plus. Et il faudra que quelqu'un reste pour chanter jusqu'à la fin. Quelqu'un qui ne pourra peut-être pas remonter à temps. »",
            farewell: "« (Libérée) Dites à mon père que je l'aime. Quoi qu'il arrive. »",
          },
        },
      ],
      skillChecks: [
        { skill: 'Arcanes', dc: 60, success: "Le fragment du Sceau peut être réactivé. Il faut une source de magie pure et un ancrage — quelqu'un ou quelque chose qui reste en contact avec le Sceau pendant l'activation, servant de conduit.", failure: "Les runes sont dans une langue magique que vous ne pouvez pas déchiffrer complètement. Des fragments, des échos, mais pas la clé." },
        { skill: 'Religion', dc: 55, success: "Le Temple était un lieu de culte ET un verrou. Les Ashkans adoraient Thalassor — et c'est cette adoration qui alimentait le Sceau. L'ironie ultime : la créature était emprisonnée par la dévotion de ses propres fidèles.", failure: "Le Temple est ancien. Sacré, peut-être. Au-delà de ça, impossible d'en dire plus." },
        { skill: 'Perception', dc: 50, success: "Vous remarquez un chemin à travers les galeries submergées — des bulles d'air piégées dans la pierre forment des poches respirables tous les dix mètres. Dangereux mais praticable.", failure: "Les galeries sont noires et inondées. Sans magie de respiration aquatique, c'est du suicide." },
      ],
      choices: [
        {
          id: 'choice-temple',
          prompt: "Comment les personnages explorent-ils le Temple ?",
          options: [
            {
              label: "Plonger vers le Sceau",
              description: "Descendre directement vers la chambre du Sceau dans les profondeurs.",
              consequence: "Traversée des galeries submergées. Constitution CD 45 pour retenir son souffle (si pas de magie). Rencontre avec les gardiens du Temple en route.",
              nextScene: 'scene-3-6-4',
            },
            {
              label: "Chercher Éléna d'abord",
              description: "Explorer les galeries latérales pour trouver la fille de Gorvald.",
              consequence: "Éléna est dans la Zone 2. La libérer (Dissipation CD 55) prend du temps mais elle révèle le chant de Scellement — un atout crucial pour la scène finale.",
              nextScene: 'scene-3-6-4',
              skillCheck: { skill: 'Investigation', dc: 50, success: "Vous trouvez Éléna dans une alcôve de corail, les yeux vitreux, chantant doucement en ashkan. Elle est vivante, mais pas vraiment là.", failure: "Les galeries sont un labyrinthe. Vous perdez du temps précieux avant de retrouver votre chemin." },
            },
            {
              label: "Récupérer le coffre de Maris",
              description: "Trouver le coffre du Syndicat de l'Ombre comme promis.",
              consequence: "Le coffre est gardé par un piège ashkan (Dextérité CD 55 pour éviter, 4d8 dégâts de force). Contient le Fragment de la Carte des Sceaux — un objet de grande valeur stratégique.",
              nextScene: 'scene-3-6-4',
            },
          ],
        },
      ],
      nextScenes: ['scene-3-6-4'],
      previousScene: 'scene-3-6-2',
      mapMovement: { from: 'cote-des-orages-mer', to: 'temple-noye' },
    },

    // --- Scène 4 : Le Choix des Profondeurs ---
    {
      id: 'scene-3-6-4',
      sceneNumber: 4,
      title: "Le Chant et le Silence",
      type: 'choice',
      location: "Chambre profonde du Sceau de Mer",
      locationId: 'temple-noye-profondeurs',
      estimatedMinutes: 40,
      readAloud: {
        text: `La chambre du Sceau est au fond de tout. Sous le Temple, sous l'océan, dans un endroit où la lumière du soleil n'a jamais pénétré et ne pénétrera jamais.

C'est une caverne sphérique, parfaitement ronde, taillée dans le corail noir et la roche volcanique. Le sol est un cercle de runes bleutées — le Sceau de Mer, ou ce qu'il en reste. Les runes clignotent, s'éteignent, se rallument dans un rythme erratique comme un cœur qui fibrille. Des fissures noires traversent le cercle, et de ces fissures monte une eau qui n'est pas de l'eau — plus épaisse, plus sombre, presque vivante.

L'air ici est lourd, humide, saturé de sel et de magie. Chaque respiration a un goût de métal et de mer. Et le chant est omniprésent — pas le murmure distant de la surface, mais un grondement de basse continue qui vibre dans vos os, dans vos dents, dans votre crâne.

La voix de Thalassor est ici, partout, sans direction.

« Trois mille ans dans le noir. Savez-vous ce que c'est ? Non. Vous ne pouvez pas. Vos vies sont des étincelles — si brèves que je ne les vois même pas s'allumer avant qu'elles ne s'éteignent. Mais j'ai senti vos pas sur ma porte. Curieux. Courageux, même. Ou inconscients. »

Le Sceau tremble. Une fissure s'élargit avec un craquement qui résonne dans toute la chambre.

« Un choix s'offre à vous, insectes. Sceller à nouveau cette porte — si vous le pouvez — et ajouter votre petite vie au prix. Ou l'ouvrir, et apprendre ce que signifie vraiment la liberté. L'océan est vaste. Il y a de la place pour tout le monde. Même pour vous. »

C'est un mensonge, bien sûr. Ou peut-être pas. Avec Thalassor, impossible de distinguer la vérité du piège. Mais le Sceau s'effrite, et le temps de la réflexion est un luxe que vous n'avez plus.`,
        mood: "Confrontation avec l'incompréhensible, sacrifice ultime, claustrophobie des profondeurs",
        music: "Basses profondes, chant grégorien inversé, battement de cœur amplifié, silence puis tempête",
      },
      gmNotes: [
        { type: 'info', text: "C'est le climax du Chapitre 6. Les joueurs doivent choisir comment gérer le Sceau. Chaque option a un coût. Le thème est le sacrifice." },
        { type: 'warning', text: "Si les joueurs n'ont pas libéré Éléna, ils n'ont pas accès au Chant de Scellement. Le Sceau peut être renforcé autrement (sacrifice magique direct, Arcanes CD 65 + perte permanente d'un emplacement de sort) mais c'est plus difficile et plus coûteux." },
        { type: 'secret', text: "Thalassor ne ment pas complètement — sa libération ne détruirait pas le monde. Mais les côtes seraient englouties, des milliers mourraient, et la mer deviendrait un territoire hostile aux mortels. Ce n'est pas l'apocalypse, mais c'est un cataclysme." },
        { type: 'tip', text: "Si Éléna est présente et volontaire pour chanter, laissez les joueurs tenter de trouver un moyen de la sauver AUSSI. Mais le Chant exige un ancrage physique au Sceau pendant toute sa durée — quiconque chante sera exposé à la magie brute du Sceau et de Thalassor. Dégâts : 3d10 nécrotiques par round pendant 5 rounds." },
      ],
      encounter: {
        name: "Les Derniers Gardiens du Sceau",
        enemies: [
          { name: "Profond Ancien", hp: 85, atk: 18, ac: 17, cr: 7, abilities: ["Lance d'Eau (portée 10m, 2d10+4 perforant)", "Appel des Profondeurs (invoque 1d4 Profonds Mineurs)", "Carapace de Corail (résistance aux dégâts physiques)", "Regard Hypnotique (CD 55 Sagesse, charmé 1 round)"] },
          { name: "Profond Mineur (×4)", hp: 35, atk: 13, ac: 14, cr: 2, abilities: ["Griffes (2d6+3 tranchant)", "Respiration Aquatique", "Tactique de Meute (+2 ATK si allié adjacent)"] },
          { name: "Hydre de Corail Noir", hp: 110, atk: 20, ac: 15, cr: 8, abilities: ["Attaques Multiples (3 morsures, 2d8+5 chacune)", "Régénération de Tête (1 nouvelle tête si non cautérisée par le feu)", "Souffle Corrosif (cône 5m, 4d8 acide, CD 55 Dextérité moitié)", "Résistance à la magie de froid"] },
        ],
        terrain: ["Sol du Sceau (terrain sacré instable)", "Fissures (2d6 force si traversées)", "Eau montante (monte d'un niveau chaque 3 rounds)", "Colonnes de corail (couverture 3/4)", "Obscurité au-delà du Sceau (désavantage sur les attaques à distance)"],
        tactics: "Le Profond Ancien reste en arrière et invoque des renforts pendant que l'Hydre charge. Les Mineurs encerclent et utilisent leur tactique de meute. L'eau monte progressivement — en 15 rounds, la chambre est complètement inondée. Combat à chronométrer.",
        loot: ["Trident du Profond Ancien (arme +2, dégâts bonus en environnement aquatique)", "Cœur de Corail Noir (composant d'artefact, lié au Sceau de Mer)", "Perle de Respiration Aquatique (1 heure de respiration sous l'eau, 3 charges)", "500 PO en trésors marins (ambre gris, perles, nacre ancienne)"],
      },
      choices: [
        {
          id: 'choice-seal-mer',
          prompt: "Comment restaurer le Sceau de Mer ?",
          options: [
            {
              label: "Éléna chante le Chant de Scellement",
              description: "Éléna se porte volontaire. Elle connaît le chant. Mais elle devra rester au cœur du Sceau.",
              consequence: "Le Sceau est restauré puissamment. Éléna subit 3d10 nécrotiques × 5 rounds. Avec des soins massifs, elle peut survivre (Constitution CD 55 final). Sans soins suffisants, elle meurt en héroïne. Gorvald sera soit infiniment reconnaissant, soit dévasté.",
              nextScene: 'scene-3-7-1',
              skillCheck: { skill: 'Médecine', dc: 55, success: "Vos soins maintiennent Éléna en vie pendant le rituel. Elle s'effondre à la dernière note, mais elle respire. À peine.", failure: "Éléna chante jusqu'au bout. La dernière note s'éteint avec son dernier souffle. Le Sceau brille d'un bleu pur. Le prix est payé." },
              reputationChange: [{ faction: 'Peuple de la Côte', amount: 20 }],
            },
            {
              label: "Un PJ se sacrifie comme ancrage",
              description: "Un personnage joueur chante à la place d'Éléna (ou sans elle si elle n'a pas été trouvée).",
              consequence: "Le Sceau est restauré. Le PJ subit 3d10 nécrotiques × 5 rounds et perd 2 points de Constitution de manière permanente. Héroïque mais coûteux. L'Aube d'Argent les honorera comme héros.",
              nextScene: 'scene-3-7-1',
              reputationChange: [
                { faction: 'Aube d\'Argent', amount: 20 },
                { faction: 'Peuple de la Côte', amount: 15 },
              ],
            },
            {
              label: "Solution magique de force",
              description: "Injecter de la magie brute dans le Sceau. Pas de sacrifice humain, mais résultat inférieur.",
              consequence: "Jet d'Arcanes CD 65. Succès : le Sceau est partiellement restauré (tiendra 5-10 ans). Chaque lanceur de sorts qui participe perd son plus haut emplacement de sort de manière permanente. Échec : le Sceau se stabilise à peine. Thalassor reste agité.",
              nextScene: 'scene-3-7-1',
              skillCheck: { skill: 'Arcanes', dc: 65, success: "La magie afflue dans les runes. Le Sceau brille — pas aussi fort qu'avant, mais il tient. Pour combien de temps, personne ne sait.", failure: "La magie se disperse dans l'eau. Le Sceau tient, mais tout juste. Le prochain coup pourrait le briser définitivement." },
            },
            {
              label: "Négocier avec Thalassor",
              description: "Tenter de parlementer avec l'entité. Dangereux et imprévisible.",
              consequence: "Jet de Persuasion CD 70. Succès : Thalassor accepte de dormir encore, à condition qu'on lui offre une « ancre de rêve » — un objet magique puissant qu'il gardera. Le Sceau tient. Échec : Thalassor rit et fracture le Sceau davantage. Les côtes souffriront.",
              nextScene: 'scene-3-7-1',
              skillCheck: { skill: 'Persuasion', dc: 70, success: "« ...Intéressant. Un insecte qui parle. Très bien. Donnez-moi un rêve à savourer pendant les prochains siècles, et je refermerai les yeux. Pour un temps. »", failure: "Le rire de Thalassor résonne dans vos crânes comme un raz-de-marée mental. « Amusant. Non. » Le Sceau craque davantage." },
            },
          ],
        },
      ],
      loot: ["Bénédiction de la Mer (résistance permanente aux dégâts de froid)", "Fragment du Sceau de Mer (artefact, permet de détecter les perturbations des Sceaux)"],
      nextScenes: ['scene-3-7-1'],
      previousScene: 'scene-3-6-3',
    },
  ],
  chapterConclusion: {
    text: `La mer se calme. Lentement, comme un animal qui se rendort, les vagues reprennent leur rythme normal. Le Temple Noyé s'enfonce à nouveau sous les flots, les colonnes noires disparaissant une à une dans l'écume.

Sur le pont du Marée-Noire, personne ne parle. Les survivants regardent le Temple sombrer avec un mélange de soulagement et de terreur — la terreur de ceux qui ont vu quelque chose de si grand, de si ancien, que leur esprit ne peut pas le contenir complètement.

Le retour à Port-Brisé est silencieux. Gorvald attend sur les ruines du quai. Son visage, quand il voit — ou ne voit pas — sa fille, dit tout ce qu'il y a à dire.

La victoire a un goût de sel et de cendres. Et au loin, porté par le vent de mer, un message arrive de Sol-Aureus. Urgent. Désespéré.

La capitale est attaquée.`,
    mood: "Soulagement amer, transition vers l'urgence, course contre la montre",
  },
  rewards: { xp: 3500, gold: "800-1200 PO", items: ["Trident du Profond Ancien", "Perle de Respiration Aquatique", "Fragment du Sceau de Mer", "Bénédiction de la Mer"] },
};

// ============================================================================
// CHAPITRE 7 : LE POINT DE NON-RETOUR
// ============================================================================

const CHAPTER_7: BookChapter = {
  id: 'ch-3-7',
  actNumber: 3,
  chapterNumber: 7,
  title: "Le Point de Non-Retour",
  subtitle: "Quand les murs tombent",
  summary: "Sol-Aureus est assiégée par les forces du Cercle des Cendres. Les héros doivent organiser la défense de la ville, évacuer les civils, et affronter l'Archon Malachar lui-même dans un combat épique au cœur de la cité. Un allié PJ meurt. Rien ne sera plus jamais pareil.",
  levelRange: "10-12",
  themes: ['siège', 'sacrifice suprême', 'perte irréparable', 'héroïsme désespéré'],
  chapterIntro: {
    text: `Vous sentez la fumée avant de voir la ville.

La route vers Sol-Aureus, habituellement encombrée de marchands, de pèlerins et de voyageurs, est déserte. Non — pas déserte. Envahie. Mais dans l'autre sens. Un flot humain coule depuis la capitale, des familles chargées de ballots, des enfants en pleurs, des vieillards portés par leurs proches. Des réfugiés. Des milliers.

Et au-dessus de la ligne d'horizon, là où les dômes dorés de Sol-Aureus devraient briller sous le soleil couchant, une colonne de fumée noire s'élève, si massive qu'elle obscurcit le ciel. Par instants, des éclairs de lumière verte percent la fumée — pas des éclairs naturels. De la magie. De la magie de guerre.

Un cavalier de la Garde Royale, blessé, l'armure noircie, s'arrête en vous reconnaissant. Son cheval est au bord de l'effondrement.

« Le Cercle des Cendres... ils sont venus en force. Des centaines. Avec des créatures — des choses que je n'ai jamais vues. Ils ont brisé les portes du nord à l'aube. Le Capitaine-Général Marcus tient le Quartier du Temple, mais il ne tiendra plus longtemps. Et il y a... quelqu'un. Un homme en noir. Il a traversé nos lignes comme si nous n'existions pas. Il se dirige vers le Grand Temple. Vers le Sceau sous Sol-Aureus. »

L'Archon Malachar est venu en personne.

Le moment que vous redoutiez est arrivé. Sol-Aureus tombe. Et vous êtes tout ce qui reste entre la ville et l'anéantissement.`,
    mood: "Urgence absolue, apocalypse en cours, dernière ligne de défense",
    music: "Tambours de guerre, cuivres héroïques et tragiques, sons de bataille lointains, cloches d'alarme",
  },
  scenes: [
    // --- Scène 1 : Les Portes Brisées ---
    {
      id: 'scene-3-7-1',
      sceneNumber: 1,
      title: "Les Portes Brisées",
      type: 'choice',
      location: "Portes Nord de Sol-Aureus",
      locationId: 'sol-aureus-portes-nord',
      estimatedMinutes: 30,
      readAloud: {
        text: `Les Portes du Matin — ces mêmes portes par lesquelles vous êtes entrés à Sol-Aureus pour la première fois, il y a ce qui semble une éternité — ne sont plus. Les battants de chêne renforcé gisent en morceaux, arrachés de leurs gonds par une force colossale. Les runes de protection gravées dans la pierre sont éteintes, noircies, comme si quelqu'un avait soufflé leur flamme.

Au-delà, Sol-Aureus brûle.

Le Quartier des Marchands est en flammes. Les étals que vous aviez admirés sont des squelettes carbonisés. Les rues où les enfants couraient sont jonchées de débris, de sang, et de silhouettes immobiles que vous refusez de regarder de trop près. La fumée est si épaisse qu'elle réduit la visibilité à quelques dizaines de mètres.

Des combats font rage partout — des escouades de la Garde Royale s'accrochent à chaque carrefour, à chaque barricade improvisée, face à des vagues d'assaillants en robes noires portant le symbole de l'œil de flammes. Les Cultistes du Cercle. Mais il n'y a pas que des humains : parmi eux, des créatures d'ombre, des élémentaires corrompus, et des morts-vivants que la magie ashkane a arrachés au repos.

Un sergent de la Garde, le visage couvert de suie et de sang, vous reconnaît et court vers vous.

« Par Solarius, vous voilà ! Le Capitaine-Général a établi un QG au Temple. Les civils sont encore piégés dans le Quartier Bas — les routes d'évacuation sont coupées. Et le Haut-Mage Theron... il a été vu pour la dernière fois à la Tour des Arcanes, qui est assiégée. On a besoin de vous partout à la fois. Qu'est-ce qu'on fait ? »

La question est un poids sur vos épaules. La ville tombe autour de vous. Vous ne pouvez pas être partout. Des gens vont mourir, quoi que vous fassiez.

La seule question est : combien, et lesquels.`,
        mood: "Chaos de la bataille, choix impossibles, le monde s'effondre",
        music: "Thème de siège, percussions martiales, cris de bataille, crépitement des flammes, cloches en glas",
      },
      gmNotes: [
        { type: 'info', text: "C'est la scène de triage. Les joueurs doivent choisir leurs priorités. Trois objectifs, pas assez de temps pour tous. Ce choix définit le reste du chapitre et a des conséquences permanentes." },
        { type: 'warning', text: "Chaque objectif ignoré a des conséquences : Civils ignorés = morts civiles (lourd sur la conscience). Tour des Arcanes ignorée = Theron meurt. QG du Temple ignoré = Marcus est submergé et le Sceau est exposé." },
        { type: 'secret', text: "Malachar est au Grand Temple. Quel que soit le choix des joueurs, la confrontation finale a lieu là-bas. Les autres objectifs déterminent qui survit pour les aider dans cette confrontation." },
        { type: 'tip', text: "Si le groupe veut se séparer, laissez-les ! Ça crée une tension narrative incroyable. Faites des allers-retours entre les sous-groupes, en coupant à des moments de tension maximale." },
        { type: 'lore', text: "Sol-Aureus n'a pas été assiégée depuis la Guerre des Cendres, il y a 300 ans. Les défenses magiques ont été négligées — personne ne pensait qu'elles seraient nécessaires à nouveau. Le Cercle a exploité cette complaisance." },
      ],
      npcs: [
        {
          name: "Sergent Dorval",
          role: "Garde des Portes (le même que l'Acte 1)",
          personality: "Épuisé, blessé, mais toujours debout. Son fils, qu'il cherchait depuis le début, a été retrouvé — parmi les cultistes du Cercle.",
          appearance: "Méconnaissable par rapport à l'homme fatigué mais professionnel de l'Acte 1. Armure cabossée, moustache à moitié brûlée, bras gauche en écharpe. Mais les yeux sont les mêmes — déterminés.",
          secret: "Son fils, converti par le Cercle, commande une escouade de cultistes dans le Quartier Bas. Dorval le sait. Il ne peut pas se résoudre à l'affronter.",
          dialogues: {
            greeting: "« Vous vous souvenez de moi ? Les Portes du Matin. 'Noms, origines, motif de la visite.' C'était il y a quoi — quelques mois ? On dirait une autre vie. »",
            info: "« Le Cercle a frappé à l'aube. Pas une attaque — un assaut coordonné. Portes du nord, portes de l'est, et quelque chose qui est sorti des égouts. Comme s'ils connaissaient chaque point faible. On a perdu le Quartier des Marchands en deux heures. Le Quartier Noble tient, mais pas pour longtemps. »",
            quest: "« Mon fils... mon fils est avec eux. Je l'ai vu. En robe noire, l'œil de flammes sur la poitrine. Je... je n'arrive pas à... Si vous le croisez, essayez de... Non. Faites ce que vous devez faire. C'est tout. »",
            farewell: "« Allez. Je tiens cette barricade. Tant qu'il me reste un bras, ils ne passeront pas. »",
          },
          stats: { hp: 38, atk: 12, ac: 15 },
        },
      ],
      choices: [
        {
          id: 'choice-siege-priority',
          prompt: "Où les héros concentrent-ils leurs efforts ?",
          options: [
            {
              label: "Sauver les civils du Quartier Bas",
              description: "Ouvrir une route d'évacuation pour des centaines de civils piégés.",
              consequence: "Route ouverte, ~400 civils sauvés. Mais la Tour des Arcanes tombe — Theron est grièvement blessé et perd ses pouvoirs. Et Marcus reçoit des renforts du Cercle au Temple qu'il ne peut pas repousser seul.",
              nextScene: 'scene-3-7-2',
              reputationChange: [
                { faction: 'Peuple de Sol-Aureus', amount: 25 },
                { faction: 'Guilde des Arcanes', amount: -15 },
              ],
            },
            {
              label: "Secourir la Tour des Arcanes",
              description: "Briser le siège de la Tour et sauver le Haut-Mage Theron.",
              consequence: "Theron est sauvé et apporte un soutien magique crucial. Mais les civils du Quartier Bas subissent de lourdes pertes (~150 morts). Marcus tient bon mais est blessé.",
              nextScene: 'scene-3-7-2',
              reputationChange: [
                { faction: 'Guilde des Arcanes', amount: 20 },
                { faction: 'Peuple de Sol-Aureus', amount: -10 },
              ],
            },
            {
              label: "Foncer vers le Temple",
              description: "Rejoindre Marcus et empêcher Malachar d'atteindre le Sceau sous Sol-Aureus.",
              consequence: "Arrivée au Temple avant que Malachar ne brise les défenses. Mais les civils et la Tour sont livrés à eux-mêmes. Pertes humaines et magiques significatives.",
              nextScene: 'scene-3-7-3',
              reputationChange: [
                { faction: 'Aube d\'Argent', amount: 15 },
                { faction: 'Peuple de Sol-Aureus', amount: -15 },
              ],
            },
            {
              label: "Se séparer",
              description: "Diviser le groupe pour couvrir plusieurs objectifs.",
              consequence: "Chaque sous-groupe est plus faible. Les combats sont plus difficiles (ennemis identiques, moins de joueurs). Mais plus d'objectifs sont atteints. Le MJ gère les groupes en alternance.",
              nextScene: 'scene-3-7-2',
            },
          ],
        },
      ],
      nextScenes: ['scene-3-7-2', 'scene-3-7-3'],
      previousScene: 'scene-3-6-4',
      mapMovement: { from: 'cote-des-orages', to: 'sol-aureus' },
    },

    // --- Scène 2 : Dans les Rues en Flammes ---
    {
      id: 'scene-3-7-2',
      sceneNumber: 2,
      title: "Le Prix du Devoir",
      type: 'combat',
      location: "Rues de Sol-Aureus en flammes",
      locationId: 'sol-aureus-rues',
      estimatedMinutes: 40,
      readAloud: {
        text: `Les rues de Sol-Aureus sont devenues un enfer. La fumée rend l'air irrespirable. Les bâtiments s'effondrent autour de vous dans des gerbes d'étincelles, projetant des débris brûlants. Le sol est jonché de gravats, de sang et de souvenirs — un étal de jouets renversé, un livre ouvert dont les pages brûlent une à une, un portrait de famille brisé dans son cadre.

Les combats sont partout. Des escouades de la Garde se battent dos au mur, littéralement, contre des cultistes qui avancent avec la ferveur des fanatiques. Des sorts fusent — lumière contre ombre, or contre vert, espoir contre désespoir. Les cris des blessés se mêlent aux ordres aboyés et au grondement des flammes.

Vous foncez à travers ce chaos, votre objectif en tête, quand une barricade de cultistes vous barre la route. Ils sont une dizaine, en robes noires, menés par un officier du Cercle dont les mains crépitent d'énergie nécrotique. Derrière eux, la route vers votre objectif.

L'officier vous voit et sourit — le sourire d'un homme qui croit avoir déjà gagné.

« Les héros de l'Aube d'Argent. Le Maître nous avait prévenus. Il a dit : 'Ils viendront. Ils essaieront. Ils échoueront.' Et je suis là pour m'assurer que sa prophétie se réalise. »

Il lève les mains. L'ombre sous ses pieds s'anime.

Le combat pour Sol-Aureus commence vraiment.`,
        mood: "Combat urbain féroce, héroïsme dans le chaos, chaque mètre gagné compte",
        music: "Thème de bataille intense, orchestre complet, chœurs martiaux, crescendo",
      },
      gmNotes: [
        { type: 'info', text: "Combat de rue intense. L'environnement est aussi dangereux que les ennemis. Les bâtiments s'effondrent, le feu se propage, les civils paniqués traversent la zone de combat." },
        { type: 'warning', text: "Les civils sont un enjeu moral. Chaque sort de zone risque de toucher des innocents. Soyez explicites : « Votre boule de feu couvrirait la barricade... mais aussi le groupe de réfugiés qui court derrière. »" },
        { type: 'secret', text: "Le fils de Dorval, Julien, est parmi les cultistes de ce groupe. Il porte un masque. Si un joueur l'arrache (Athlétisme CD 45), il reconnaît le jeune homme — et Julien hésite, pétrifié, entre sa foi dans le Cercle et le souvenir de son père." },
        { type: 'tip', text: "Ce combat doit être intense mais pas trop long — 5-7 rounds maximum. Le chapitre doit garder son rythme. Faites en sorte que les joueurs sentent qu'ils perdent du temps ici, que chaque round de combat est un round où Malachar avance vers le Sceau." },
      ],
      encounter: {
        name: "Barricade du Cercle des Cendres",
        enemies: [
          { name: "Officier du Cercle", hp: 78, atk: 17, ac: 17, cr: 6, abilities: ["Rayon Nécrotique (3d8+4 nécrotique, portée 20m)", "Bouclier d'Ombre (réaction, absorbe 20 dégâts)", "Mot de Peur (CD 55 Sagesse, effrayé 1 round)", "Invocation d'Ombre (invoque 1 Ombre de Combat au round 3)"] },
          { name: "Cultiste d'Élite (×4)", hp: 45, atk: 14, ac: 15, cr: 3, abilities: ["Épée Maudite (2d8+3 tranchant + 1d6 nécrotique)", "Fanatisme (avantage contre la peur)", "Sacrifice (quand meurt, explode en énergie nécrotique, 2d6 dans 2m)"] },
          { name: "Ombre de Combat", hp: 50, atk: 16, ac: 15, cr: 4, abilities: ["Toucher Drainant (2d8+4 nécrotique, -1 Force temporaire)", "Intangible (résistance dégâts physiques non magiques)", "Fusion d'Ombres (invisible dans l'obscurité totale)"] },
          { name: "Golem de Cendres", hp: 90, atk: 19, ac: 16, cr: 5, abilities: ["Poings de Cendre (3d8+5 contondant)", "Explosion de Cendres (quand tombe à 0 HP, 4d6 feu dans 5m)", "Absorption de Feu (les sorts de feu le soignent)", "Immunité au poison et aux effets mentaux"] },
        ],
        terrain: ["Barricade de meubles (couverture 3/4)", "Bâtiments en flammes (2d6 feu si adjacents, effondrement possible round 4)", "Gravats (terrain difficile)", "Civils en fuite (zone de civils — sorts de zone interdits moralement)", "Fumée épaisse (obscurcissement léger partout)"],
        tactics: "L'Officier reste derrière la barricade et lance des sorts. Les Cultistes chargent en formation. Le Golem de Cendres avance lentement vers les soigneurs. L'Ombre de Combat apparaît au round 3 et attaque par les flancs. Au round 4, un bâtiment s'effondre sur le flanc droit (Dextérité CD 45 pour éviter, 3d8 contondants).",
        loot: ["Bâton de l'Officier du Cercle (focalisateur nécrotique, +2 aux sorts de nécromancie)", "Médaillon du Cercle (permet de comprendre les communications chiffrées du Cercle)", "150 PO en butin de guerre"],
      },
      skillChecks: [
        { skill: 'Persuasion', dc: 55, success: "Julien Dorval arrache son masque. Les larmes coulent. « Je... je ne voulais pas... ils ont dit que le monde serait meilleur... » Il dépose les armes. Un cultiste de moins, et une rédemption possible.", failure: "Le masque tombe mais Julien, le regard vide, lève son épée. La corruption du Cercle est trop profonde. Il devra être neutralisé." },
        { skill: 'Intimidation', dc: 50, success: "Votre cri de guerre résonne dans la rue, amplifié par les murs. Deux cultistes lâchent leurs armes et fuient. L'Officier blêmit visiblement.", failure: "Les fanatiques ne connaissent pas la peur. Votre tentative d'intimidation ne fait que les amuser." },
      ],
      nextScenes: ['scene-3-7-3'],
      previousScene: 'scene-3-7-1',
    },

    // --- Scène 3 : Le Grand Temple ---
    {
      id: 'scene-3-7-3',
      sceneNumber: 3,
      title: "Au Cœur de la Tempête",
      type: 'social',
      location: "Grand Temple de Solarius, Sol-Aureus",
      locationId: 'sol-aureus-temple',
      estimatedMinutes: 25,
      readAloud: {
        text: `Le Grand Temple de Solarius se dresse au cœur de Sol-Aureus comme un dernier bastion d'espoir dans un océan de flammes. Son dôme doré est terni par la suie mais intact, ses murs de pierre blanche résistent encore aux assauts. La place devant le Temple est une ligne de front : barricades de la Garde d'un côté, vagues de cultistes de l'autre, et entre les deux, un no man's land jonché de corps.

À l'intérieur, le Temple est devenu un hôpital de campagne, un refuge et un quartier général. Des centaines de civils sont entassés dans la nef, des blessés alignés entre les bancs de prière, des enfants qui pleurent, des prêtres qui prient avec une ferveur désespérée. L'air sent l'encens, le sang et la peur.

Le Capitaine-Général Marcus est au fond, devant l'autel, penché sur une carte de la ville. Il est blessé — une entaille profonde au flanc qu'il ignore avec la discipline d'un vieux soldat. Son armure de cérémonie est cabossée, couverte de sang — pas tout le sien. Quand il vous voit, quelque chose passe dans ses yeux. Du soulagement. De l'espoir. Et de la peur, aussi.

« Vous êtes vivants. Bien. Parce que j'ai besoin de vous pour quelque chose que je ne peux demander à personne d'autre. »

Il pointe la carte. Son doigt tremble légèrement.

« Malachar est en dessous. Dans les catacombes, sous le Temple. Il cherche le Sceau de Sol-Aureus — le Sceau Central, le plus important de tous. S'il le brise, les autres Sceaux affaiblis céderont en chaîne. Et ce qui dort en dessous se réveillera. Tout ce qui dort en dessous. »

Il vous regarde, un par un.

« Je ne peux pas y aller. Je dois tenir le Temple. Les civils comptent sur la Garde. Mais quelqu'un doit descendre et arrêter Malachar. Quelqu'un doit... »

Il ne finit pas sa phrase. Il n'en a pas besoin.`,
        mood: "Calme avant la tempête finale, gravité absolue, dernières instructions",
        music: "Chœurs de temple, cordes tendues, silence dramatique, battement de cœur",
      },
      gmNotes: [
        { type: 'info', text: "Scène de briefing avant le boss final de l'Acte 3. Marcus donne les dernières informations et les joueurs se préparent. C'est le moment de se soigner, de se préparer, de dire ce qui doit être dit." },
        { type: 'warning', text: "Un allié PNJ important va mourir dans la scène suivante. Si les joueurs sont attachés à Marcus, Theron, Brok, ou un autre PNJ récurrent, préparez sa mort. La mort doit être significative et émotionnelle, pas aléatoire." },
        { type: 'secret', text: "Les catacombes sous le Temple sont un labyrinthe ashkan. Malachar les connaît — il a la Carte complète des Sceaux. Les joueurs entrent en terrain ennemi." },
        { type: 'tip', text: "Laissez les joueurs avoir un moment calme ici. Une conversation avec un PNJ cher, un échange de regards, une promesse. Ces moments de calme rendent le chaos qui suit plus percutant." },
        { type: 'lore', text: "Le Sceau Central sous Sol-Aureus est le plus ancien et le plus puissant. Il a été créé par les cinq peuples originels d'Aethelgard après la chute d'Ashka. Le briser libérerait non pas une entité, mais toutes — une cascade d'événements qui mettrait fin à l'ère actuelle." },
      ],
      npcs: [
        {
          name: "Capitaine-Général Marcus",
          role: "Commandant de la défense de Sol-Aureus",
          personality: "Épuisé mais inébranlable. Sait qu'il va probablement mourir ici. L'accepte avec la sérénité d'un homme qui a fait la paix avec lui-même.",
          appearance: "Vieilli de dix ans en une journée. Armure cabossée, sang séché sur le flanc, mais le dos droit et le regard d'acier. La main sur la poignée de son épée, pas par réflexe — par habitude de toute une vie.",
          secret: "Marcus sait qu'il ne survivra pas à cette bataille. Il a écrit une lettre pour sa famille, cachée dans son armure. Si les joueurs la trouvent après sa mort, elle dit simplement : « J'ai tenu la ligne. »",
          dialogues: {
            greeting: "« Pas le temps pour les rapports détaillés. Résumez. Ce que vous avez vu, ce que vous savez, en trente secondes. »",
            info: "« Malachar a traversé nos lignes comme un fantôme. Mes meilleurs hommes n'ont même pas pu l'approcher. C'est un niveau de puissance que je n'ai jamais vu. Vous êtes les seuls que je connaisse qui aient une chance — même mince — de le ralentir. »",
            quest: "« Descendez dans les catacombes. Trouvez Malachar. Empêchez-le de briser le Sceau Central. Et si vous ne pouvez pas l'empêcher... retardez-le. Donnez-moi le temps d'évacuer le Temple. Chaque minute compte. »",
            farewell: "« C'est un honneur de vous avoir connus. Maintenant allez. Et ne regardez pas en arrière. »",
          },
          stats: { hp: 75, atk: 18, ac: 20 },
        },
      ],
      choices: [
        {
          id: 'choice-preparation',
          prompt: "Comment les héros se préparent-ils avant de descendre ?",
          options: [
            {
              label: "Se soigner et se préparer",
              description: "Prendre le temps de se soigner, préparer des sorts, et planifier.",
              consequence: "Repos court : récupération de ressources. Mais Malachar gagne du temps — quand les héros arrivent, il est plus avancé dans le rituel.",
              nextScene: 'scene-3-7-4',
            },
            {
              label: "Foncer immédiatement",
              description: "Pas de repos, pas de préparation. Chaque seconde compte.",
              consequence: "Les héros arrivent avant que Malachar ne commence le rituel. Ils le surprennent en train de préparer l'autel. Avantage tactique, mais ressources limitées.",
              nextScene: 'scene-3-7-4',
            },
            {
              label: "Chercher des alliés",
              description: "Convaincre des PNJ de les accompagner dans les catacombes.",
              consequence: "Selon les choix précédents : Theron (s'il a été sauvé), Brok (qui se porte volontaire), un chevalier de l'Aube. Un allié supplémentaire — mais le MJ doit choisir qui mourra dans la confrontation.",
              nextScene: 'scene-3-7-4',
              skillCheck: { skill: 'Persuasion', dc: 45, success: "Un allié accepte de vous accompagner. Ses yeux disent qu'il sait ce que ça signifie. Il vient quand même.", failure: "Personne ne peut être épargné de la défense. Vous descendrez seuls." },
            },
          ],
        },
      ],
      nextScenes: ['scene-3-7-4'],
      previousScene: 'scene-3-7-2',
    },

    // --- Scène 4 : La Confrontation ---
    {
      id: 'scene-3-7-4',
      sceneNumber: 4,
      title: "Face à l'Archon",
      type: 'combat',
      location: "Catacombes sous le Grand Temple, Chambre du Sceau Central",
      locationId: 'sol-aureus-catacombes',
      estimatedMinutes: 50,
      readAloud: {
        text: `Les catacombes sous le Grand Temple sont plus anciennes que la ville elle-même. Les murs ne sont pas de pierre — ils sont de métal noir, gravé de runes qui pulsent d'une lumière malade, verte et violette. L'air est glacial, chargé d'une énergie qui fait dresser chaque poil de votre corps. C'est la magie brute de l'Ère d'Ashka, non diluée par les siècles, aussi puissante et dangereuse qu'au premier jour.

Le chemin vers la Chambre du Sceau est un couloir unique, long et droit, bordé de statues de Gardiens anciens dont les yeux de pierre semblent vous suivre. Au bout, une porte ouverte — ouverte de force, les serrures magiques fondues.

Et au-delà de la porte, la Chambre du Sceau Central.

C'est immense. Un dôme parfait de métal noir, couvert de runes de la base au sommet. Le sol est un cercle complexe de symboles imbriqués — le Sceau lui-même, le plus grand et le plus ancien de tous. Il brille encore, mais faiblement, comme une bougie dans un ouragan.

Au centre du Sceau, Malachar.

L'Archon du Cercle des Cendres est exactement ce que les cauchemars promettaient. Grand, mince, enveloppé dans une robe noire qui semble faite d'ombre vivante. Son visage est pâle comme la mort, ses yeux sont deux brasiers de flamme verte, et quand il parle, sa voix résonne avec l'écho de choses anciennes et terribles.

Il est en train de dessiner des runes de rupture sur le Sceau avec un bâton qui brille d'une lumière noire. Derrière lui, l'air tremble, et à travers les fissures du Sceau, des formes se pressent — des ombres, des murmures, des promesses de destruction.

Il s'arrête quand vous entrez. Il se retourne lentement. Et il sourit.

« Ah. Les héros. Enfin. J'espérais que vous viendriez. Pas parce que vous pouvez m'arrêter — vous ne pouvez pas. Mais parce que je voulais que quelqu'un comprenne pourquoi je fais cela. Ce qui est scellé ici n'aurait jamais dû être enfermé. Les Ashkans ont commis un crime contre la nature elle-même. Et moi, je rectifie ce crime. »

Il lève son bâton. L'air crépite.

« Mais d'abord, montrez-moi ce que vaut l'espoir. »`,
        mood: "Boss final de l'Acte, terreur et détermination, tout est en jeu",
        music: "Thème du méchant principal, orchestre complet, chœurs sinistres, crescendo vers le combat",
      },
      gmNotes: [
        { type: 'info', text: "COMBAT FINAL DE L'ACTE 3. Malachar est un ennemi de niveau supérieur — les joueurs ne peuvent probablement pas le tuer. L'objectif est de l'empêcher de briser le Sceau et de le forcer à se retirer. Il a un plan de sortie." },
        { type: 'warning', text: "C'est ici qu'un allié PNJ doit mourir. Choisissez le PNJ le plus significatif émotionnellement. Sa mort doit protéger les PJ ou le Sceau — pas être gratuite. Exemples : Marcus qui s'interpose devant un sort mortel, Theron qui canalise le Sceau au prix de sa vie, Brok qui retient un passage." },
        { type: 'secret', text: "Malachar n'est pas complètement fou. Il croit sincèrement que les entités scellées sont des forces naturelles emprisonnées injustement. Il a tort — les entités sont destructrices — mais sa conviction est réelle. S'il est poussé dans ses retranchements, il révèle qu'il a vu « au-delà des Sceaux » et que ce qu'il a vu l'a convaincu." },
        { type: 'tip', text: "Le combat doit être épique, long (8-12 rounds), et rythme avec des phases. Phase 1 : Malachar seul. Phase 2 : il invoque des renforts. Phase 3 : il commence le rituel de rupture, les joueurs doivent l'interrompre tout en combattant. Un PNJ allié se sacrifie pendant la Phase 3." },
        { type: 'lore', text: "L'Archon Malachar était autrefois un érudit de la Guilde des Arcanes. Il a découvert les Sceaux, étudié leur fonctionnement, et fini par communiquer avec les entités scellées. Ce qu'elles lui ont montré l'a changé. Il a fondé le Cercle des Cendres il y a 30 ans avec un seul but : briser tous les Sceaux." },
      ],
      encounter: {
        name: "L'Archon Malachar",
        enemies: [
          { name: "Archon Malachar", hp: 180, atk: 22, ac: 20, cr: 13, abilities: ["Rayon de Destruction (4d10+6 force, portée 30m)", "Onde de Ténèbres (sphère 6m, CD 60 Constitution, 5d8 nécrotique + aveuglé)", "Bouclier de l'Ancien (réaction, annule un sort de niveau 4 ou moins)", "Mot de Pouvoir : Agonie (CD 62 Sagesse, incapacité 1 round)", "Rituel de Rupture (action, inflige 30 dégâts au Sceau — le Sceau a 100 HP)", "Phase d'Ombre (bonus, se téléporte de 10m)", "Légendaire : 3 actions légendaires par round"] },
          { name: "Chevalier de l'Ombre (×2, phase 2)", hp: 70, atk: 18, ac: 18, cr: 5, abilities: ["Lame d'Ombre (3d8+5 nécrotique)", "Absorption de Vie (se soigne de la moitié des dégâts infligés)", "Bouclier de Ténèbres (avantage sur les jets de sauvegarde vs lumière)"] },
          { name: "Manifestation du Sceau Brisé (phase 3)", hp: 100, atk: 20, ac: 14, cr: 7, abilities: ["Tentacules de Vide (4 attaques, 2d8+4 chacune)", "Cri du Vide (CD 55 Sagesse, 3d10 psychiques à toutes les créatures dans 10m)", "Régénération 15 HP/tour", "Vulnérable à la magie de scellement/sacrée"] },
        ],
        terrain: ["Sceau au sol (zone magique instable, les sorts échouent sur un 1-3 au d20)", "Runes de pouvoir (4 points cardinaux — activer une rune avec Arcanes CD 55 inflige 3d10 force à Malachar)", "Colonnes de métal noir (couverture 3/4)", "Fissures dimensionnelles (terrain dangereux, 2d8 force si traversées)", "Zone du Rituel (centre, Malachar y revient toujours pour continuer le rituel)"],
        tactics: "Phase 1 (rounds 1-3) : Malachar teste les joueurs. Il utilise ses sorts offensifs mais pas le Rituel. Phase 2 (round 4) : Il invoque les Chevaliers de l'Ombre et commence à utiliser le Rituel de Rupture. Phase 3 (round 8 ou Sceau < 40 HP) : La Manifestation émerge des fissures. Malachar se concentre sur le Rituel. Le PNJ allié se sacrifie pour bloquer la Manifestation ou protéger un PJ d'un coup fatal. Si le Sceau tombe à 0, catastrophe — Malachar triomphe partiellement avant d'être repoussé par l'explosion de magie.",
        loot: ["Bâton de l'Archon (artefact majeur, +3 aux sorts de destruction, mais murmure des tentations)", "Cape d'Ombre Vivante (AC +2, avantage en Discrétion, mais veut se nourrir de lumière)", "Grimoire du Cercle des Cendres (contient des informations sur les Sceaux restants)", "Anneau de Scellement (permet de restaurer partiellement un Sceau, une utilisation)", "1000 PO en gemmes et composants de sorts"],
      },
      choices: [
        {
          id: 'choice-malachar',
          prompt: "Comment les héros affrontent-ils Malachar ?",
          options: [
            {
              label: "Combat frontal total",
              description: "Concentrer toute la puissance du groupe sur Malachar.",
              consequence: "Malachar est repoussé mais le combat est brutal. Le PNJ allié meurt en protégeant un PJ d'un sort mortel. Le Sceau survit, fissuré mais intact.",
              nextScene: 'scene-3-7-5',
            },
            {
              label: "Protéger le Sceau en priorité",
              description: "Se concentrer sur l'interception du Rituel et la défense du Sceau.",
              consequence: "Le Sceau est mieux protégé, mais Malachar fait plus de dégâts aux PJ. Le PNJ allié meurt en activant une rune de défense. Malachar se retire, frustré mais pas vaincu.",
              nextScene: 'scene-3-7-5',
            },
            {
              label: "Activer les Runes de Pouvoir",
              description: "Utiliser le Sceau lui-même comme arme contre Malachar.",
              consequence: "Chaque rune activée (Arcanes CD 55, 4 runes) inflige 3d10 à Malachar et renforce le Sceau. Mais activer les 4 runes déclenche une onde de choc — le PNJ allié est pris dans l'explosion finale et meurt en souriant, sachant que le Sceau est sauvé.",
              nextScene: 'scene-3-7-5',
              skillCheck: { skill: 'Arcanes', dc: 55, success: "La rune s'illumine d'un bleu aveuglant. L'énergie frappe Malachar comme un poing divin. Il recule en grondant de douleur.", failure: "La rune crépite mais s'éteint. Le Sceau est trop endommagé pour répondre à cette tentative." },
            },
            {
              label: "Parlementer avec Malachar",
              description: "Tenter de le convaincre d'arrêter, ou au moins de gagner du temps.",
              consequence: "Persuasion CD 70 pour gagner 2 rounds sans combat (le Rituel continue mais plus lentement). Insight CD 60 révèle que Malachar doute — brièvement. Impossible de le convaincre d'arrêter, mais possible de planter une graine de doute qui sera exploitée dans un Acte futur.",
              nextScene: 'scene-3-7-5',
              skillCheck: { skill: 'Persuasion', dc: 70, success: "Malachar s'arrête. Ses mains tremblent. « Vous ne savez rien de ce que j'ai vu. Rien de ce que j'ai perdu. » Il y a de la douleur dans sa voix. Pas du jeu d'acteur — de la vraie douleur. Deux rounds gagnés.", failure: "« Des mots. Toujours des mots. Pendant que le monde étouffe sous ses chaînes. » Il reprend le Rituel avec une vigueur renouvelée." },
            },
          ],
        },
      ],
      nextScenes: ['scene-3-7-5'],
      previousScene: 'scene-3-7-3',
      mapMovement: { from: 'sol-aureus-temple', to: 'sol-aureus-catacombes' },
    },

    // --- Scène 5 : L'Aube Sanglante ---
    {
      id: 'scene-3-7-5',
      sceneNumber: 5,
      title: "L'Aube Sanglante",
      type: 'narration',
      location: "Sol-Aureus, après la bataille",
      locationId: 'sol-aureus',
      estimatedMinutes: 20,
      readAloud: {
        text: `Malachar est parti. Pas vaincu — retiré. Son dernier regard avant de disparaître dans une fissure dimensionnelle n'était pas celui d'un homme battu. C'était celui d'un homme qui a appris quelque chose, qui a ajusté ses plans, qui reviendra plus fort.

Mais pour l'instant, il est parti. Et le Sceau Central tient.

La remontée vers le Temple est un brouillard de fatigue et de douleur. Vos muscles brûlent. Vos réserves magiques sont à sec. Et derrière vous, vous portez — ou vous laissez — le corps de celui qui n'est pas remonté.

Quand vous émergez dans le Grand Temple, la lumière de l'aube filtre à travers les vitraux brisés. Dehors, les bruits de combat se sont tus. Le Cercle des Cendres s'est retiré avec son maître — pas en déroute, en retraite ordonnée. Ils ont obtenu ce qu'ils voulaient : la démonstration de leur puissance, la peur dans les yeux du peuple, et l'assurance que les Sceaux sont vulnérables.

Sol-Aureus, la Cité Dorée, n'est plus dorée. Elle est grise de cendres, noire de fumée, rouge de sang. Le Quartier des Marchands est détruit. Les Portes du Nord sont en ruines. Le dôme du Temple porte les cicatrices de sorts de guerre. Et partout, des gens pleurent — les blessés, les endeuillés, les orphelins.

Le Capitaine-Général Marcus — s'il a survécu — regarde les ruines de sa ville avec un visage de pierre. Mais ses mains tremblent.

On dépose le corps de votre allié tombé au pied de l'autel de Solarius. Les prêtres commencent les prières. La lumière de l'aube tombe sur le visage immobile — et pendant un instant, il semble presque en paix.

Presque.

Autour de vous, la ville blessée commence à compter ses morts. Les chiffres arrivent au compte-gouttes, chacun un coup de poing : trente dans le Quartier des Marchands. Cinquante au Quartier Bas. Douze gardes à la barricade des Portes du Nord. Des noms. Des visages. Des gens que vous avez croisés, avec qui vous avez parlé, pour qui vous vous êtes battus.

Et ce n'est que le début.

Car au loin, porté par le vent de l'est, résonne un son que personne ne veut entendre. Un son grave, profond, qui vient de partout et de nulle part.

Le chant des Sceaux qui se fissurent.

L'Acte 3 se termine. Les ombres ont grandi. Et elles ne sont pas près de reculer.`,
        mood: "Deuil, coût de la victoire, fin d'une ère, détermination naissante",
        music: "Requiem lent, violoncelles et violons, chœurs funèbres qui se transforment progressivement en un thème de résolution sombre",
      },
      gmNotes: [
        { type: 'info', text: "Scène de conclusion de l'Acte 3. Pas de combat, pas de choix mécanique — juste le poids des conséquences. Laissez les joueurs assimiler ce qui s'est passé." },
        { type: 'tip', text: "Nommez le PNJ tombé. Rappelez ses mots, ses gestes, sa personnalité. Les joueurs doivent sentir son absence. Si c'est Marcus, décrivez le vide au QG. Si c'est Brok, décrivez le Sanglier Doré sans propriétaire. Si c'est Theron, décrivez le silence de la Tour des Arcanes." },
        { type: 'warning', text: "Ne minimisez pas les pertes. Le monde a changé. Les joueurs doivent comprendre que l'Acte 4 sera encore plus sombre. Mais laissez aussi une lueur d'espoir — ils ont tenu. Le Sceau a tenu. Et tant qu'il y a des héros pour se battre, tout n'est pas perdu." },
        { type: 'secret', text: "Malachar a laissé un message gravé dans le mur de la Chambre du Sceau : « Le cinquième Sceau est la clé. Trouvez-le avant moi — ou ne le trouvez pas. Le résultat sera le même. » Indice pour l'Acte 4." },
        { type: 'lore', text: "Dans l'histoire d'Aethelgard, cet événement sera connu comme la « Nuit des Cendres » — le jour où Sol-Aureus a failli tomber. Les bardes en feront des chansons. Les historiens en débattront. Mais pour ceux qui y étaient, ce ne sera jamais qu'une nuit de sang et de feu." },
      ],
      loot: ["Médaille de Sol-Aureus (honneur suprême de la ville, avantage sur toutes les interactions sociales à Sol-Aureus)", "Testament de l'Allié Tombé (objet personnel, bonus de +2 à un jet par jour quand on agit selon ses valeurs)", "Accès permanent aux ressources de la Garde Royale et de la Guilde des Arcanes"],
      nextScenes: ['scene-4-8-1'],
      previousScene: 'scene-3-7-4',
    },
  ],
  chapterConclusion: {
    text: `Sol-Aureus survivra. La ville est blessée, pas morte. Les murs seront reconstruits, les morts pleurés, les cicatrices portées avec la fierté douloureuse de ceux qui ont survécu à l'impensable.

Mais le monde a changé. Le Cercle des Cendres a montré sa puissance. Les Sceaux, que tous croyaient éternels, sont mortels. Et l'Archon Malachar est toujours en vie, quelque part, avec ses plans et sa conviction terrifiante.

Les héros sont debout, mais ils portent des poids nouveaux. Le poids de ceux qu'ils n'ont pas pu sauver. Le poids de la trahison. Le poids d'un ami perdu. Et le poids de la certitude que ce n'est pas fini — que le pire est encore à venir.

L'aube se lève sur Sol-Aureus. Sanglante, mais elle se lève.

Fin de l'Acte 3 : Les Ombres Grandissent.`,
    mood: "Conclusion de l'Acte — deuil, résilience, promesse de combats à venir",
  },
  rewards: { xp: 5000, gold: "1500-2000 PO", items: ["Bâton de l'Archon", "Cape d'Ombre Vivante", "Grimoire du Cercle des Cendres", "Anneau de Scellement", "Médaille de Sol-Aureus"] },
};

// ============================================================================
// EXPORT ACT 3
// ============================================================================

export const ACT_3_CHAPTERS: BookChapter[] = [CHAPTER_5, CHAPTER_6, CHAPTER_7];

export const ACT_3: BookAct = {
  id: 'act-3',
  actNumber: 3,
  title: "Les Ombres Grandissent",
  subtitle: "Sacrifice, Trahison et Choix Impossibles",
  synopsis: `L'Acte 3 marque le basculement de la campagne. Le Cercle des Cendres passe à l'offensive, et les héros découvrent que le mal ne vient pas seulement de l'extérieur — il s'est infiltré au cœur même de leurs alliés. La trahison de Séraphina au sein de l'Aube d'Argent brise la confiance entre les factions. Le Sceau de Mer se brise, libérant une horreur ancienne. Et Sol-Aureus, le bastion de la civilisation, est assiégée. Les joueurs sont confrontés à des choix impossibles : qui sauver quand on ne peut pas sauver tout le monde ? Que sacrifier pour préserver l'essentiel ? Et jusqu'où aller quand l'ennemi ne recule devant rien ?`,
  levelRange: "8-12",
  themes: ['sacrifice', 'trahison', 'choix impossibles', 'ténèbres grandissantes', 'perte'],
  chapters: ACT_3_CHAPTERS,
  actIntro: {
    text: `Les victoires de l'Acte 2 semblent déjà lointaines. Le monde s'assombrit, littéralement — les jours raccourcissent, les nuits sont plus profondes, et même le soleil semble voilé par une brume que personne ne peut expliquer.

Les rapports affluent de toutes les régions : la Sylve d'Émeraude se meurt. La Côte des Orages est frappée par des tempêtes surnaturelles. Des tremblements de terre secouent les fondations de Sol-Aureus. Les Sceaux, ces verrous millénaires qui maintenaient le monde en équilibre, se fissurent les uns après les autres.

Et le Cercle des Cendres ne se cache plus. Ses agents sont partout — dans les villes, dans les forêts, dans les institutions mêmes qui devaient protéger le monde. La paranoïa s'installe. Qui peut-on encore croire ? Qui est encore digne de confiance ?

Pour les héros, l'heure n'est plus à l'exploration prudente ou aux enquêtes subtiles. C'est la guerre. Une guerre contre le temps, contre l'obscurité, et parfois contre ceux qu'ils appelaient amis.

L'Acte 3 commence. Les ombres grandissent. Et elles ont faim.`,
    mood: "Bascule vers les ténèbres, urgence croissante, perte d'innocence",
    music: "Thème principal en mineur, cuivres graves, percussions de marche, chœurs d'avertissement",
  },
};
