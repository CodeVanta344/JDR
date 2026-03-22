/**
 * ACTE 3 - EXPANSION DES SCENES
 * Nouvelles scènes pour les Chapitres 5, 6 et 7
 * 13 scènes additionnelles pour enrichir l'expérience de jeu
 */

import type { BookScene } from './gm-book-data';

// ============================================================================
// CHAPITRE 5 : LA TRAHISON DE L'AUBE — Scènes additionnelles
// ============================================================================

const scene_3_5_dawn_camp: BookScene = {
  id: 'scene-3-5-dawn-camp',
  sceneNumber: 101,
  title: "Le Camp de l'Aube d'Argent",
  type: 'social',
  location: "Camp militaire de l'Aube d'Argent, orée de la Sylve d'Émeraude",
  locationId: 'sylve-emeraude-camp',
  estimatedMinutes: 35,
  readAloud: {
    text: `Le camp de l'Aube d'Argent se dresse comme un îlot d'ordre au milieu du chaos végétal de la Sylve. Des rangées de tentes blanches immaculées sont disposées en cercles concentriques autour d'un pavillon central où flotte la bannière argentée. Des paladins en armure rutilante s'entraînent dans un enclos de terre battue, le claquement de leurs lames résonnant comme un pouls régulier dans l'air matinal.

L'odeur du fer chaud et de l'huile de polissage se mêle à celle des pins environnants. Un forgeron de campagne martèle une lame sur une enclume portable, les étincelles dansant comme des lucioles dans l'ombre de la canopée. Des écuyers courent entre les tentes, portant des messages, des seaux d'eau, des plateaux de nourriture.

Au centre de l'enclos d'entraînement, un cercle est dessiné à la craie blanche. C'est l'Arène de l'Aube — la tradition veut que tout visiteur puisse défier un chevalier en duel amical pour tester sa valeur. Plusieurs paladins vous regardent avec un mélange de curiosité et de respect prudent. Ils ont entendu parler de vous.

Un vétéran au visage buriné s'approche. Il porte une cicatrice qui traverse son crâne chauve d'une oreille à l'autre. Son sourire est celui d'un homme qui a vu trop de batailles pour être impressionné par quoi que ce soit — et pourtant, il vous tend la main.

« Capitaine Aldric, de la Troisième Compagnie. On nous a dit de vous attendre. Bienvenue au camp — si vous voulez croiser le fer, l'arène est ouverte. Sinon, venez boire un coup. Les deux sont des tests, ici. »`,
    mood: "Camaraderie militaire, honneur, calme trompeur avant la tempête",
    music: "Percussions martiales légères, fifres, bruits de camp, forge en fond",
  },
  gmNotes: [
    { type: 'info', text: "Cette scène permet aux joueurs de s'immerger dans la vie du camp, de forger des liens avec les paladins, et de récolter des rumeurs avant la trahison. Plus ils s'attachent à ces gens, plus la trahison de Séraphina sera dévastatrice." },
    { type: 'tip', text: "Proposez un duel amical dans l'arène. C'est un excellent moyen de tester les capacités de combat des PJ sans conséquence, et le paladin adverse peut devenir un allié ou un rival récurrent." },
    { type: 'warning', text: "Parmi les soldats, quelques-uns sont des agents dormants du Cercle des Cendres, recrutés par Séraphina. Ils ne feront rien pour l'instant — mais ils seront activés lors de la trahison." },
    { type: 'secret', text: "Le Capitaine Aldric a des doutes sur Séraphina. Pas de preuve — juste un instinct de vétéran. Si un PJ l'interroge avec insistance (Persuasion CD 50), il lâchera : 'Elle est trop parfaite. En trente ans de service, j'ai jamais vu quelqu'un d'aussi... impeccable. Et ça me fout les jetons.'" },
    { type: 'lore', text: "L'Aube d'Argent est un ordre de paladins fondé après la première Guerre des Cendres. Leur serment les lie à la protection des innocents et à la chasse des forces obscures. Le duel amical est un rite de bienvenue — refuser est considéré comme un signe de faiblesse ou de méfiance." },
  ],
  npcs: [
    {
      name: "Capitaine Aldric",
      role: "Vétéran de l'Aube d'Argent",
      personality: "Pragmatique, bourru, loyal jusqu'à la moelle. Cache une intelligence tactique redoutable derrière un masque de soldat simple.",
      appearance: "Humain massif, la cinquantaine, crâne rasé traversé d'une cicatrice impressionnante. Armure cabossée mais propre. Mains comme des battoirs, regard perçant sous des sourcils broussailleux.",
      secret: "Aldric a servi avec le père de Séraphina. Il sait que le vrai père de Séraphina est mort il y a dix ans — ce qui rend impossible certaines anecdotes qu'elle raconte. Il n'a pas encore fait le lien.",
      dialogues: {
        greeting: "« Ah, les fameux héros. Z'êtes plus petits que dans les histoires. Mais bon, c'est toujours comme ça. Venez, je vous fais visiter. Et gardez vos affaires — mes gars sont honnêtes, mais les écureuils de cette forêt sont des voleurs nés. »",
        info: "« Le camp tourne bien, on peut pas se plaindre. La Commandeure-Adjointe Séraphina gère la logistique d'une main de fer. Trop bien, même, si vous voulez mon avis. Mais personne le veut, mon avis, alors je la ferme et je fais mon boulot. »",
        quest: "« Si vous voulez vous rendre utiles, on a un problème au périmètre sud. Les sentinelles entendent des bruits la nuit — pas des bêtes, pas des elfes. Quelque chose d'autre. Personne veut y aller seul. Vous, par contre, vous avez l'air du genre à aimer les mauvaises idées. »",
        farewell: "« Faites gaffe à vous là-bas. Et si vous croisez un truc bizarre... revenez d'abord. Mourir en héros, c'est surfait. Vivre en malin, c'est mieux. »",
      },
      stats: { hp: 72, atk: 15, ac: 18 },
    },
    {
      name: "Soeur Lilianne",
      role: "Prêtresse-guérisseuse du camp",
      personality: "Douce, compatissante, mais épuisée. Travaille jour et nuit pour soigner les blessés de la corruption de la Sylve. Cache une volonté d'acier sous un extérieur fragile.",
      appearance: "Halfeline d'âge mûr, cheveux gris en chignon serré, mains tachées d'onguents. Robe blanche de l'Aube, maculée de vert — la sève corrompue. Yeux fatigués mais lumineux.",
      secret: "Elle a remarqué que les blessures de corruption empirent toujours après les visites nocturnes de Séraphina à l'infirmerie. Elle croit que c'est une coïncidence. Ce n'en est pas une.",
      dialogues: {
        greeting: "« Oh, du monde. Excusez le désordre — on manque de bandages, de potions, de lits et de sommeil. Mais pas de patients, ça non. Entrez, entrez. »",
        info: "« Ces blessures ne sont pas normales. La sève corrompue brûle la peau, oui, mais elle devrait guérir avec un sort de restauration basique. Sauf que ça ne marche pas. C'est comme si la corruption s'adaptait à nos soins. Comme si quelqu'un... non, c'est absurde. Oubliez. »",
        quest: "« Si vous avez du temps et un cœur, j'aurais besoin d'herbe-de-lune. Ça pousse dans les clairières au nord, là où la corruption n'a pas encore atteint. Trois poignées suffiraient à soulager mes patients pour une semaine. »",
        farewell: "« Que la lumière vous accompagne. Et revenez entiers — j'ai assez de patients comme ça. »",
      },
      stats: { hp: 35, atk: 5, ac: 12 },
    },
  ],
  skillChecks: [
    { skill: 'Athlétisme', dc: 45, success: "Vous remportez le duel amical contre le paladin. Le camp vous acclame — vous avez gagné leur respect.", failure: "Le paladin vous met au tapis proprement. Pas de honte — il fait ça depuis vingt ans. Le camp vous respecte pour avoir essayé." },
    { skill: 'Perspicacité', dc: 50, success: "En observant le camp, vous remarquez que certains soldats évitent le regard de Séraphina. Pas par respect — par peur. Quelque chose cloche.", failure: "Le camp semble fonctionner normalement. L'Aube d'Argent est un ordre bien rodé." },
    { skill: 'Investigation', dc: 55, success: "Près de la tente de Séraphina, vous trouvez des traces de cendres noires inhabituelles. Elles ne correspondent à aucun feu de camp.", failure: "Vous ne trouvez rien d'anormal. Le camp est impeccable — trop impeccable, peut-être." },
  ],
  choices: [
    {
      id: 'choice-dawn-camp-activity',
      prompt: "Comment les personnages passent-ils leur temps au camp ?",
      options: [
        {
          label: "Participer au duel dans l'arène",
          description: "Accepter le défi d'un paladin pour un combat amical.",
          consequence: "Le duel attire l'attention du camp. Le résultat détermine le respect initial des paladins. Séraphina observe depuis l'ombre, évaluant les forces des héros.",
          nextScene: 'scene-3-5-spy',
          reputationChange: [{ faction: "Aube d'Argent", amount: 10 }],
        },
        {
          label: "Aider Soeur Lilianne à l'infirmerie",
          description: "Soigner les blessés et enquêter sur la corruption.",
          consequence: "En soignant les patients, les héros découvrent que la corruption s'aggrave selon un cycle nocturne. Lilianne partage ses soupçons.",
          nextScene: 'scene-3-5-spy',
          skillCheck: { skill: 'Médecine', dc: 45, success: "Vous identifiez un résidu alchimique dans les blessures — ce n'est pas une corruption naturelle. Quelqu'un accélère le processus.", failure: "Les blessures sont étranges, mais votre expertise ne suffit pas à en déterminer la cause exacte." },
          reputationChange: [{ faction: "Aube d'Argent", amount: 5 }, { faction: "Gardiens d'Émeraude", amount: 5 }],
        },
        {
          label: "Écouter les rumeurs au feu de camp",
          description: "Se mêler aux soldats le soir pour récolter des informations.",
          consequence: "Les soldats parlent librement après quelques chopes. Rumeurs de disparitions nocturnes, de lumières étranges près des racines, et d'un soldat qui jure avoir vu Séraphina parler à un corbeau noir.",
          nextScene: 'scene-3-5-spy',
          reputationChange: [{ faction: "Aube d'Argent", amount: 5 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-3-5-spy', 'scene-3-5-2'],
  previousScene: 'scene-3-5-1',
};

const scene_3_5_spy: BookScene = {
  id: 'scene-3-5-spy',
  sceneNumber: 102,
  title: "L'Ombre dans l'Aube",
  type: 'exploration',
  location: "Camp de l'Aube d'Argent, de nuit",
  locationId: 'sylve-emeraude-camp',
  estimatedMinutes: 30,
  readAloud: {
    text: `La nuit tombe sur le camp comme un voile de velours noir. Les lanternes de mousse s'atténuent, et les feux de camp projettent des ombres dansantes sur les tentes blanches. La forêt, si vivante le jour, prend une tout autre allure dans l'obscurité — chaque bruissement devient une menace, chaque craquement un pas furtif.

Les sentinelles font leur ronde, leurs armures cliquetant doucement. La plupart des soldats dorment, épuisés par l'entraînement et l'anxiété. Mais vous, vous veillez. Quelque chose dans les rumeurs de la journée vous a mis en alerte. Quelque chose qui ne colle pas.

Vers la deuxième heure du matin, un mouvement. Une silhouette quitte la tente de commandement — pas par l'entrée principale, mais par un pan soulevé à l'arrière. La lumière de la lune accroche un reflet argenté. Une armure. Celle de Séraphina.

Elle se déplace avec une grâce presque surnaturelle, évitant les sentinelles comme si elle connaissait leur circuit par cœur — ce qui, bien sûr, est le cas, puisque c'est elle qui l'a établi. Elle longe la lisière du camp, puis s'enfonce dans la forêt, en direction du sud. Vers les Racines Profondes.

Le silence retombe. Le choix est vôtre : la suivre, ou attendre et voir ce qu'elle ramène.`,
    mood: "Suspense nocturne, espionnage, tension croissante",
    music: "Silence tendu, cordes graves pizzicato, souffle de vent, pas furtifs",
  },
  gmNotes: [
    { type: 'info', text: "C'est la scène clé qui permet aux joueurs de commencer à assembler le puzzle de la trahison. Séraphina se rend aux Racines Profondes pour administrer une nouvelle dose de poison à l'Arbre-Monde." },
    { type: 'warning', text: "Si les joueurs la suivent et se font repérer, Séraphina a un plan de couverture : elle dira qu'elle enquêtait seule sur les bruits suspects au périmètre sud. Persuasion CD 60 pour la croire, CD 45 pour sentir le mensonge." },
    { type: 'tip', text: "Utilisez des jets de Discrétion en opposition avec la Perception de Séraphina (score de 65). Faites monter la tension : chaque bruit, chaque branche qui craque, est un moment de suspense." },
    { type: 'secret', text: "Dans les Racines Profondes, Séraphina utilise la Fiole de Cendre Éternelle pour verser un poison ashkane directement sur les racines principales. Le rituel prend exactement treize minutes. Si les joueurs la voient faire, la trahison est révélée — mais Séraphina est une combattante redoutable et tentera de fuir." },
  ],
  npcs: [
    {
      name: "Commandeure-Adjointe Séraphina (en mission secrète)",
      role: "Traîtresse du Cercle des Cendres",
      personality: "Concentrée, froide, calculatrice. Loin de la façade chaleureuse du jour, son vrai visage apparaît — celui d'une fanatique déterminée.",
      appearance: "Armure argentée assombrie par un enchantement d'ombre. Visage fermé, yeux brillant d'une lueur verdâtre dans le noir. La Fiole de Cendre Éternelle pend à sa ceinture, émettant une faible pulsation malsaine.",
      dialogues: {
        greeting: "« Oh. Vous. Je... je faisais une ronde supplémentaire. Le périmètre sud, vous vous souvenez ? Les bruits dont Aldric parlait. Je voulais vérifier par moi-même. »",
        info: "« Qu'est-ce que vous faites debout à cette heure ? Vous devriez dormir — demain sera long. La descente dans les Racines Profondes n'est pas une promenade. »",
        quest: "« Retournez au camp. Je gère la situation. C'est un ordre — enfin, une suggestion appuyée. La forêt la nuit n'est pas un endroit pour des héros fatigués. »",
        farewell: "« ... Vous n'allez pas lâcher l'affaire, n'est-ce pas ? (soupir) Très bien. Mais si vous répétez à quiconque que j'étais dehors... les gens pourraient se poser des questions. Et les questions, en temps de guerre, ça tue. »",
      },
      stats: { hp: 95, atk: 19, ac: 19 },
    },
  ],
  skillChecks: [
    { skill: 'Discrétion', dc: 55, success: "Vous la suivez sans être détecté, glissant d'ombre en ombre. Séraphina ne soupçonne rien. Vous la voyez descendre dans l'entrée des Racines Profondes.", failure: "Une branche craque sous votre pied. Séraphina se fige, tend l'oreille, puis se retourne lentement. Son sourire est glacial." },
    { skill: 'Perception', dc: 50, success: "Dans la lumière de la lune, vous apercevez un objet à sa ceinture — une fiole qui pulse d'une lumière malsaine, verdâtre. Ce n'est certainement pas un équipement standard de l'Aube d'Argent.", failure: "La nuit est trop sombre pour distinguer les détails. Séraphina n'est qu'une silhouette argentée dans les ténèbres." },
    { skill: 'Arcanes', dc: 50, success: "La magie que dégage cette fiole est une signature ashkane — la même corruption qui empoisonne l'Arbre-Monde. Ce n'est pas une coïncidence.", failure: "Vous sentez une perturbation magique, mais impossible d'en déterminer la nature exacte dans l'obscurité." },
  ],
  choices: [
    {
      id: 'choice-follow-seraphina',
      prompt: "Que faites-vous après avoir repéré Séraphina ?",
      options: [
        {
          label: "La suivre jusqu'aux Racines Profondes",
          description: "Continuer la filature en silence pour voir ce qu'elle fait exactement.",
          consequence: "Vous descendez dans les tunnels de racines à sa suite. Si la Discrétion réussit, vous la voyez verser le poison sur les racines de l'Arbre-Monde. Preuve irréfutable.",
          nextScene: 'scene-3-5-flashback',
          skillCheck: { skill: 'Discrétion', dc: 60, success: "Tapis dans l'ombre d'une racine géante, vous la voyez agenouillée, murmurant en ashkane ancien, versant le contenu de la fiole sur les racines tremblantes de Yggdrasylve. La trahison est confirmée.", failure: "Un écho trahit votre position. Séraphina se redresse, la fiole à la main, et son masque tombe. 'Dommage. Vous étiez sympathiques.'" },
        },
        {
          label: "Revenir au camp et alerter Elyndor",
          description: "Ne pas prendre de risque et informer le Gardien-Premier.",
          consequence: "Elyndor prend l'information au sérieux mais demande des preuves avant d'accuser un officier de l'Aube. Il propose de tendre un piège la nuit suivante.",
          nextScene: 'scene-3-5-flashback',
          reputationChange: [{ faction: "Gardiens d'Émeraude", amount: 15 }],
        },
        {
          label: "La confronter directement",
          description: "L'interpeller dans la forêt, seul à seul.",
          consequence: "Séraphina tente d'abord de mentir, puis de négocier, et enfin de se battre si elle est acculée. Combat potentiel dans l'obscurité de la Sylve.",
          nextScene: 'scene-3-5-flashback',
          skillCheck: { skill: 'Intimidation', dc: 55, success: "Séraphina hésite. Pour la première fois, une fissure apparaît dans sa façade. Elle murmure : 'Vous ne comprenez pas... les Sceaux doivent tomber. Pour le bien de tous.'", failure: "Séraphina rit doucement. 'Vous pensez me faire peur ? J'ai affronté des choses que vous ne pouvez même pas imaginer.' Elle dégaine son épée." },
        },
      ],
    },
  ],
  nextScenes: ['scene-3-5-flashback', 'scene-3-5-3'],
  previousScene: 'scene-3-5-dawn-camp',
};

const scene_3_5_flashback: BookScene = {
  id: 'scene-3-5-flashback',
  sceneNumber: 103,
  title: "Le Jour Où l'Aube S'est Éteinte",
  type: 'narration',
  location: "Flashback — Temple de l'Aube d'Argent, cinq ans plus tôt",
  locationId: 'sol-aureus',
  estimatedMinutes: 20,
  readAloud: {
    text: `Le monde se brouille. Que ce soit un rêve, une vision, ou un sort, le présent s'efface et le passé prend sa place. Vous êtes spectateurs d'un souvenir qui ne vous appartient pas.

Cinq ans plus tôt. Le Temple de l'Aube d'Argent, à Sol-Aureus. La salle d'initiation est baignée d'une lumière dorée qui tombe des vitraux représentant les Seize Vertus. Des rangs de paladins en armure de cérémonie se tiennent au garde-à-vous.

Au centre de la salle, une femme s'agenouille. Jeune, blonde, les yeux brûlant de ferveur. Séraphina. Mais pas celle que vous connaissez — cette Séraphina-là n'a pas encore de masque. Son visage est un champ de bataille entre le doute et la détermination.

Derrière elle, invisible aux paladins, un homme se tient dans l'ombre d'un pilier. Grand, enveloppé de cendres qui bougent comme des êtres vivants. Ses yeux verts flamboient dans l'obscurité. Archon Malachar. Il regarde la scène avec une expression qui ressemble — contre toute attente — à de la compassion.

Le Grand Maître de l'Aube pose son épée sur l'épaule de Séraphina. « Par la lumière et l'acier, je te sacre Chevalière de l'Aube. Que ta lame soit juste, que ton cœur soit pur, que ton serment soit éternel. »

Et dans l'ombre, les lèvres de Malachar forment des mots silencieux : « Un autre serment d'abord. Un serment de cendres. »

La vision se brise comme du verre.`,
    mood: "Tragédie silencieuse, révélation amère, passé qui éclaire le présent",
    music: "Chœur sacré qui se distord lentement, notes dissonantes croissantes, silence brutal à la fin",
  },
  gmNotes: [
    { type: 'info', text: "Cette scène est purement narrative — pas de jets de dés, pas de choix mécaniques. Elle sert à humaniser Séraphina et à montrer qu'elle n'est pas simplement 'méchante' mais une personne complexe piégée par ses convictions." },
    { type: 'tip', text: "Lisez cette scène lentement, avec gravité. La vision peut être déclenchée par un contact psychique avec l'Arbre-Monde, par un artefact, ou simplement comme un rêve partagé. L'important est l'impact émotionnel." },
    { type: 'secret', text: "Séraphina a été recrutée par Malachar avant même son initiation. Elle était une orpheline de guerre que le Cercle a élevée. Pour elle, le Cercle est sa vraie famille. L'Aube n'a jamais été qu'un masque." },
    { type: 'lore', text: "L'initiation de l'Aube d'Argent est un rituel sacré qui lie magiquement le paladin à son serment. Le fait que Séraphina ait pu prêter un faux serment sans que la magie le détecte signifie que le Cercle possède des contre-sorts extrêmement puissants — ou que la conviction de Séraphina est si profonde que la magie elle-même ne peut la distinguer d'une vraie foi." },
  ],
  npcs: [
    {
      name: "Séraphina (dans la vision, cinq ans plus tôt)",
      role: "Recrue de l'Aube / Agent du Cercle",
      personality: "Jeune, tiraillée, terrifiée mais résolue. Croit sincèrement que ce qu'elle fait est juste — que briser les Sceaux libérera le monde d'une prison millénaire.",
      appearance: "Plus jeune, plus vulnérable. Pas encore la façade polie de la commandeure. Des cernes, des ongles rongés, un tremblement dans les mains qu'elle cache en les serrant.",
      dialogues: {
        greeting: "« (murmure, à elle-même) C'est pour le bien de tous. Malachar a dit... il a dit que le monde est une cage. Que les Sceaux nous emprisonnent autant qu'ils emprisonnent l'Entité. »",
        info: "« (murmure) Ils sont gentils. Les paladins. Le Grand Maître m'a appelée 'ma fille'. Personne ne m'a jamais appelée comme ça. ... Ce n'est pas juste. Rien de tout ça n'est juste. »",
        quest: "« (murmure, les yeux fermés) Un jour, ils comprendront. Quand les chaînes tomberont, quand le monde respirera enfin... ils comprendront que j'ai fait le bon choix. Ils me pardonneront. N'est-ce pas ? »",
        farewell: "« (ouvre les yeux, essuie une larme, se compose un sourire parfait) ... Prête. »",
      },
    },
  ],
  choices: [
    {
      id: 'choice-flashback-reaction',
      prompt: "Comment les personnages réagissent-ils à cette vision ?",
      options: [
        {
          label: "Compassion — comprendre Séraphina",
          description: "Voir en elle une victime autant qu'une traîtresse.",
          consequence: "Les PJ gagnent un bonus de +10 aux jets de Persuasion pour tenter de la ramener du bon côté lors de la confrontation finale avec elle. Certains PNJ approuvent cette sagesse.",
          nextScene: 'scene-3-5-aftermath-choice',
          reputationChange: [{ faction: "Gardiens d'Émeraude", amount: 5 }],
        },
        {
          label: "Colère — la trahison est inexcusable",
          description: "Peu importe ses raisons, elle a trahi ceux qui lui faisaient confiance.",
          consequence: "Les PJ gagnent un bonus de +10 aux jets d'Intimidation contre les agents du Cercle. L'Aube d'Argent respecte cette fermeté.",
          nextScene: 'scene-3-5-aftermath-choice',
          reputationChange: [{ faction: "Aube d'Argent", amount: 10 }],
        },
        {
          label: "Analyse froide — utiliser cette information",
          description: "Mettre l'émotion de côté et exploiter ce que la vision a révélé.",
          consequence: "Les PJ identifient que le Cercle recrute des orphelins et des marginaux — une information stratégique. La Guilde des Arcanes est impressionnée par cette déduction.",
          nextScene: 'scene-3-5-aftermath-choice',
          reputationChange: [{ faction: "Guilde des Arcanes", amount: 10 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-3-5-aftermath-choice'],
  previousScene: 'scene-3-5-spy',
};

const scene_3_5_aftermath_choice: BookScene = {
  id: 'scene-3-5-aftermath-choice',
  sceneNumber: 104,
  title: "Les Cendres de la Confiance",
  type: 'choice',
  location: "Camp de l'Aube d'Argent, après la révélation",
  locationId: 'sylve-emeraude-camp',
  estimatedMinutes: 30,
  readAloud: {
    text: `Le camp ne sera plus jamais le même.

La nouvelle de la trahison de Séraphina se répand comme un incendie dans les herbes sèches. Les visages changent — la confiance s'éteint dans les yeux des paladins, remplacée par le doute, la colère, la peur. Si l'un des leurs pouvait être une traîtresse, alors qui d'autre ? Le voisin ? L'ami ? Le frère d'armes ?

Le Capitaine Aldric a rassemblé ses hommes dans le silence le plus lourd que vous ayez jamais entendu. Trois soldats, ceux que Séraphina avait recrutés comme agents dormants, ont été arrêtés. Ils ne nient rien — ils pleurent. L'un d'eux a vingt ans à peine.

Le Gardien-Premier Elyndor est assis sur son trône de racines, le visage dans les mains. Autour de lui, les druides chuchotent. Dehors, les paladins de l'Aube oscillent entre la honte et la rage.

Et maintenant, tout le monde vous regarde. Parce que vous avez découvert la vérité. Parce que dans le chaos de la trahison, les gens ont besoin de quelqu'un à qui se raccrocher. De quelqu'un qui sait quoi faire.

Le problème, c'est que vous ne savez pas forcément quoi faire non plus.

Trois voix s'élèvent, chacune portant une direction différente. Aldric veut pourchasser Séraphina. Elyndor veut sauver l'Arbre-Monde en priorité. Et Soeur Lilianne supplie de ne pas oublier les blessés qui ont besoin de soins immédiats.

Vous ne pouvez pas tout faire. Pas assez de temps. Pas assez de bras. Pas assez d'espoir.

Choisissez.`,
    mood: "Deuil collectif, poids du commandement, choix impossible",
    music: "Cordes lentes et graves, hautbois mélancolique, silences lourds, pas de percussions",
  },
  gmNotes: [
    { type: 'info', text: "C'est un moment charnière de l'Acte 3. Le choix des joueurs ici détermine non seulement la suite immédiate, mais aussi quels alliés et ressources ils auront pour la suite de la campagne." },
    { type: 'warning', text: "Quel que soit le choix, il y aura des conséquences négatives. C'est le point. L'Acte 3 est celui des choix impossibles. Ne laissez pas les joueurs trouver une solution parfaite — il n'y en a pas." },
    { type: 'tip', text: "Laissez les joueurs débattre entre eux. Ce genre de désaccord entre PJ est de l'or narratif. N'intervenez que si le débat tourne en rond ou devient toxique." },
    { type: 'secret', text: "Si les joueurs se séparent pour couvrir plusieurs objectifs, chaque groupe est affaibli. Séraphina l'a prévu — sa fuite est piégée, et les soins de l'Arbre-Monde nécessitent une force magique considérable." },
  ],
  npcs: [
    {
      name: "Capitaine Aldric (en colère)",
      role: "Partisan de la poursuite",
      personality: "Furieux, blessé dans son honneur. Sa loyauté envers l'Aube le pousse à vouloir effacer cette tache à tout prix.",
      appearance: "Les veines du cou gonflées, les poings serrés. Les yeux rouges — pas de larmes, de rage contenue.",
      dialogues: {
        greeting: "« On la retrouve. On la ramène. Et on lui fait un procès devant toute l'Aube pour que le monde sache que la trahison a un prix. »",
        info: "« Elle ne peut pas être loin. La forêt est dense, mais mes pisteurs connaissent chaque sentier. Si on part maintenant, on la rattrape avant l'aube. »",
        quest: "« Donnez-moi dix hommes et une heure d'avance. Je vous la ramène enchaînée. Ce que vous faites d'elle après, c'est votre affaire. »",
        farewell: "« Si vous ne la poursuivez pas... je le ferai seul. Un homme a le droit de venger son honneur. »",
      },
      stats: { hp: 72, atk: 15, ac: 18 },
    },
  ],
  choices: [
    {
      id: 'choice-aftermath-direction',
      prompt: "Quelle priorité les héros choisissent-ils ?",
      options: [
        {
          label: "Pourchasser Séraphina",
          description: "Envoyer des forces à la poursuite de la traîtresse avant qu'elle ne rejoigne le Cercle.",
          consequence: "La poursuite mène à un combat dans la Sylve profonde. Séraphina est capturée ou s'échappe de justesse, mais l'Arbre-Monde continue de dépérir sans soins. Les blessés souffrent.",
          nextScene: 'scene-3-5-4',
          reputationChange: [{ faction: "Aube d'Argent", amount: 15 }, { faction: "Gardiens d'Émeraude", amount: -10 }],
        },
        {
          label: "Sauver l'Arbre-Monde",
          description: "Concentrer toutes les ressources sur la purification du poison dans les Racines Profondes.",
          consequence: "Le rituel de purification est long et éprouvant, mais l'Arbre-Monde est stabilisé. Séraphina s'échappe avec des informations cruciales sur les défenses alliées.",
          nextScene: 'scene-3-5-4',
          reputationChange: [{ faction: "Gardiens d'Émeraude", amount: 20 }, { faction: "Aube d'Argent", amount: -5 }],
        },
        {
          label: "Soigner les blessés et fortifier le camp",
          description: "Prioriser les vivants et se préparer à une éventuelle attaque du Cercle.",
          consequence: "Les blessés sont sauvés et le camp est renforcé. L'Arbre-Monde s'affaiblit encore, et Séraphina fuit. Mais les soldats sont reconnaissants — et leur loyauté sera cruciale plus tard.",
          nextScene: 'scene-3-5-4',
          reputationChange: [{ faction: "Aube d'Argent", amount: 10 }, { faction: "Gardiens d'Émeraude", amount: -5 }],
        },
        {
          label: "Tenter de tout faire — diviser les forces",
          description: "Envoyer des groupes séparés sur chaque objectif.",
          consequence: "Chaque objectif est partiellement accompli, aucun totalement. Des pertes dans chaque groupe. C'est la pire option mécaniquement, mais elle montre un cœur généreux.",
          nextScene: 'scene-3-5-4',
          skillCheck: { skill: 'Commandement', dc: 60, success: "Par miracle et coordination, les trois groupes accomplissent l'essentiel. C'est un exploit de leadership qui sera raconté pendant des années.", failure: "Les forces sont trop dispersées. Chaque groupe échoue partiellement. Des vies sont perdues qui auraient pu être sauvées." },
        },
      ],
    },
  ],
  nextScenes: ['scene-3-5-4', 'scene-3-6-1'],
  previousScene: 'scene-3-5-flashback',
};

// ============================================================================
// CHAPITRE 6 : LA MER NOIRE — Scènes additionnelles
// ============================================================================

const scene_3_6_port_explore: BookScene = {
  id: 'scene-3-6-port-explore',
  sceneNumber: 105,
  title: "Les Ruelles de Port-Brisé",
  type: 'exploration',
  location: "Port-Brisé, quartier des marins",
  locationId: 'port-brise',
  estimatedMinutes: 35,
  readAloud: {
    text: `Port-Brisé porte bien son nom. La ville semble avoir été assemblée à partir des épaves de mille navires, chaque bâtiment fait de planches récupérées, de voiles tendues en guise de murs, et de mâts reconvertis en poteaux de soutien. L'air sent le sel, le goudron et le poisson fumé. Des mouettes crient au-dessus de toits en pente, se disputant les restes jetés par les fenêtres.

Le port lui-même est un chaos organisé — des dizaines de navires de toutes tailles s'entassent le long de quais de bois grinçant. Des dockers chargent et déchargent des caisses, des tonneaux et des créatures marines dont vous préférez ne pas connaître le nom. Un ivrogne chante une chanson sur un kraken et une sirène qui ne finit pas bien pour le kraken.

La taverne principale, « Le Léviathan Pendu », domine la place du port. Son enseigne représente un monstre marin suspendu par la queue, l'air vaguement offensé. À l'intérieur, la fumée est si épaisse qu'on pourrait la couper au couteau. Des marins, des pêcheurs, des contrebandiers et des aventuriers se mêlent dans un brouhaha permanent.

Au fond de la salle, un vieil homme est assis devant une montagne de cartes marines, un astrolabe dans une main et un verre de rhum dans l'autre. C'est le Cartographe Malten, et si quelqu'un connaît les secrets de la Mer Noire, c'est lui.

Un panneau cloué au mur attire votre attention : « AVIS — Quiconque navigue au-delà du 40e parallèle le fait à ses risques et périls. Le Léviathan ne pardonne pas. — La Guilde des Navigateurs »`,
    mood: "Ambiance portuaire vivante, mystère maritime, danger en filigrane",
    music: "Accordéon de taverne, vagues, cris de mouettes, chanson de marin lointaine",
  },
  gmNotes: [
    { type: 'info', text: "Port-Brisé est la dernière étape avant la traversée de la Mer Noire. Les joueurs doivent trouver un navire, un capitaine, et des informations sur leur destination. Le Cartographe Malten est la clé." },
    { type: 'tip', text: "Faites vivre le port avec des détails sensoriels. Les joueurs de JdR adorent les scènes de taverne — laissez-les explorer, boire, parier, et interagir avec les locaux." },
    { type: 'warning', text: "Le Syndicat a des yeux partout à Port-Brisé. Si les joueurs mentionnent la Mer Noire ou le Sceau de Mer trop ouvertement, l'information remontera au Cercle des Cendres en 24 heures." },
    { type: 'lore', text: "Port-Brisé fut autrefois une ville prospère, avant qu'un tsunami provoqué par un tremblement des Sceaux ne la détruise il y a cinquante ans. Elle a été reconstruite par les survivants à partir des débris — d'où son aspect bricolé. Les habitants sont fiers de leur résilience." },
  ],
  npcs: [
    {
      name: "Cartographe Malten",
      role: "Ancien navigateur, expert de la Mer Noire",
      personality: "Excentrique, brillant, obsédé par les cartes et les légendes marines. Parle en métaphores nautiques. Probablement un peu fou, mais d'une folie utile.",
      appearance: "Vieil homme sec comme du bois flotté, barbe blanche emmêlée, un œil de verre en forme de boussole (il prétend qu'il pointe toujours le nord). Doigts tachés d'encre. Vêtements qui étaient élégants il y a vingt ans.",
      secret: "Malten a navigué jusqu'à l'île où se trouve le Sceau de Mer. Il est le seul à en être revenu vivant. Il n'en parle jamais — mais son œil de verre est le prix qu'il a payé pour ce voyage.",
      dialogues: {
        greeting: "« Mmh ? Des clients ? Je ne vends pas de cartes. Les cartes sont des mensonges à plat que les gens utilisent pour se rassurer. Moi, je vends la vérité. C'est beaucoup plus cher. »",
        info: "« La Mer Noire... (long silence) Vous n'êtes pas les premiers à demander. Mais vous êtes les premiers à ne pas avoir l'air de mentir. La Mer Noire n'est pas noire à cause de la couleur de l'eau. C'est à cause de ce qui vit en dessous. Des choses si anciennes que la mer elle-même les a oubliées. »",
        quest: "« Si vous allez vraiment là-bas, vous aurez besoin de trois choses : un navire qui ne coule pas (plus rare que vous croyez), un capitaine assez fou pour y aller (encore plus rare), et cette carte. (Il pose un parchemin jauni sur la table.) Le prix ? Ramenez-moi quelque chose de l'île. N'importe quoi. Une pierre, un coquillage. La preuve que je n'ai pas rêvé. »",
        farewell: "« Les vieux marins disent que la mer pardonne. C'est faux. La mer se souvient. Bonne chance, étrangers. Vous en aurez besoin. »",
      },
      stats: { hp: 25, atk: 3, ac: 10 },
    },
    {
      name: "Capitaine Reva « Dent-de-Fer »",
      role: "Contrebandière et capitaine du navire Le Chagrin Joyeux",
      personality: "Audacieuse, sarcastique, cupide mais avec un code d'honneur personnel. Rit dans les situations de danger. Crache quand elle est nerveuse.",
      appearance: "Femme musclée, la quarantaine, peau brûlée par le sel et le soleil. Une dent en fer visible quand elle sourit, ce qui est souvent. Chapeau de capitaine usé, bottes qui ont vu trois océans.",
      secret: "Reva a une dette envers le Syndicat qui la ronge. Accepter de naviguer vers la Mer Noire pourrait soit la libérer de cette dette, soit la tuer. Elle hésite.",
      dialogues: {
        greeting: "« Le Chagrin Joyeux est le meilleur navire de ce port. Et le seul dont le capitaine accepterait d'aller dans la Mer Noire. Alors oui, le prix est élevé. Parce que le monopole, c'est mon truc. »",
        info: "« La Mer Noire, c'est pas juste des vagues et du vent. Il y a des courants qui changent de direction sans prévenir, des brouillards qui rendent fou, et quelque chose de gros. Très gros. On l'appelle le Léviathan, mais personne ne sait ce que c'est vraiment. »",
        quest: "« Mon prix : cinq cents pièces d'or, payées d'avance. Et si on trouve un trésor là-bas, je prends vingt pour cent. Non négociable. Bon, peut-être un peu négociable. Mais juste un peu. »",
        farewell: "« Préparez vos estomacs. La Mer Noire donne le mal de mer même aux poissons. »",
      },
      stats: { hp: 55, atk: 14, ac: 15 },
    },
  ],
  skillChecks: [
    { skill: 'Persuasion', dc: 45, success: "Reva accepte de baisser son prix à trois cents pièces d'or. Elle prétend que c'est parce qu'elle vous aime bien. C'est surtout parce qu'elle veut fuir le Syndicat.", failure: "Reva ne bouge pas d'un pouce. Cinq cents pièces d'or, pas une de moins. Business is business." },
    { skill: 'Investigation', dc: 40, success: "En étudiant les cartes de Malten, vous repérez un courant favorable qui pourrait réduire le voyage de deux jours. Cette information sera précieuse.", failure: "Les cartes de Malten sont un labyrinthe de symboles cryptiques. Vous aurez besoin de son aide pour les déchiffrer." },
  ],
  choices: [
    {
      id: 'choice-port-preparation',
      prompt: "Comment les héros se préparent-ils pour la traversée ?",
      options: [
        {
          label: "Recruter un équipage d'élite",
          description: "Passer du temps à trouver les meilleurs marins disponibles.",
          consequence: "L'équipage est compétent et fiable. Bonus aux jets de navigation et de survie en mer. Mais le départ est retardé d'un jour.",
          nextScene: 'scene-3-6-ship-life',
          reputationChange: [{ faction: "Syndicat", amount: 5 }],
        },
        {
          label: "Chercher des informations sur le Léviathan",
          description: "Interroger les vieux marins sur la créature légendaire.",
          consequence: "Des légendes contradictoires, mais un détail commun : le Léviathan évite la lumière. Transporter des lanternes runiques pourrait être la clé.",
          nextScene: 'scene-3-6-ship-life',
        },
        {
          label: "Partir immédiatement",
          description: "Chaque heure perdue est une heure où le Sceau de Mer s'affaiblit.",
          consequence: "Départ rapide, mais équipage hétéroclite et préparation insuffisante. Les difficultés en mer seront plus grandes.",
          nextScene: 'scene-3-6-ship-life',
        },
      ],
    },
  ],
  nextScenes: ['scene-3-6-ship-life'],
  previousScene: 'scene-3-6-1',
};

const scene_3_6_ship_life: BookScene = {
  id: 'scene-3-6-ship-life',
  sceneNumber: 106,
  title: "Le Ventre de la Mer",
  type: 'exploration',
  location: "Le Chagrin Joyeux, en pleine Mer Noire",
  locationId: 'mer-noire',
  estimatedMinutes: 40,
  readAloud: {
    text: `Trois jours en mer. Trois jours de vagues grises, de ciel de plomb, et de cette sensation permanente que quelque chose de vaste et de patient vous observe depuis les profondeurs.

Le Chagrin Joyeux porte bien son nom — c'est un navire qui semble constamment sur le point de couler, et pourtant il avance avec une obstination joyeuse à travers les pires eaux qu'Aethelgard puisse offrir. La coque grince, les voiles claquent, et le chat du bord — un félin borgne nommé « Catastrophe » — reste imperturbablement assis sur la figure de proue, regardant l'horizon avec un mépris souverain.

La vie à bord est un rythme : quarts de veille, repas de biscuits durs et de poisson salé, nettoyage du pont, et ces moments étranges où la mer est si calme que le silence devient oppressant. Le matelot de vigie scanne l'horizon en permanence, mais il ne regarde pas devant — il regarde en bas.

Ce matin, la tempête arrive. Vous la sentez avant de la voir — une chute de pression qui vous bouche les oreilles, un goût métallique dans l'air, et un assombrissement du ciel qui transforme le jour en crépuscule. Reva jure en trois langues et crie des ordres. L'équipage court dans tous les sens.

Et sous la surface de l'eau, très très loin en dessous, quelque chose de lumineux pulse doucement. Comme un cœur qui bat au fond de l'océan.`,
    mood: "Huis clos maritime, tension croissante, immensité hostile",
    music: "Vagues, vent, grincements de bois, cordes tendues comme des nerfs, grondement lointain",
  },
  gmNotes: [
    { type: 'info', text: "Cette scène couvre le voyage en mer et permet plusieurs mini-événements : tempête, moral de l'équipage, et potentiellement une mutinerie si les choses tournent mal." },
    { type: 'tip', text: "La vie à bord est un excellent moment pour du roleplay entre PJ. Posez-leur des questions : que fait votre personnage pendant les quarts de nuit ? Parle-t-il aux marins ? Pêche-t-il ?" },
    { type: 'warning', text: "La tempête est un événement mécanique sérieux. Plusieurs jets seront nécessaires pour la survie du navire. Un échec critique pourrait endommager le navire ou blesser un PJ." },
    { type: 'secret', text: "La lueur sous-marine est le Sceau de Mer. Il pulse plus fort à l'approche de la tempête — les deux phénomènes sont liés. Le Sceau est en train de se fissurer, et chaque fissure libère une onde d'énergie qui perturbe les eaux." },
    { type: 'lore', text: "Les marins d'Aethelgard ont une superstition : chanter pendant une tempête apaise la mer. La chanson traditionnelle est 'Le Dernier Port', qui parle d'un marin qui trouve la paix au fond de l'océan. C'est à la fois beau et sinistre." },
  ],
  npcs: [
    {
      name: "Bosco « Gueule-Douce »",
      role: "Second du Chagrin Joyeux / Potentiel meneur de mutinerie",
      personality: "Superstitieux, rancunier, mais compétent. Déteste cette mission et ne s'en cache pas. Si le moral tombe trop bas, il pourrait retourner l'équipage contre les héros.",
      appearance: "Homme trapu, bras couverts de tatouages maritimes, nez cassé trois fois. Une cicatrice en forme d'ancre sur le front. Mâche constamment du tabac.",
      secret: "Bosco a perdu son frère en mer il y a dix ans. Le navire a été englouti par une vague impossible, près de l'endroit exact où ils naviguent maintenant. Il est terrifié.",
      dialogues: {
        greeting: "« C'est à cause de vous qu'on est dans ce trou à poissons. J'espère que vous le savez. Et j'espère que ce pour quoi on risque nos vies en vaut la peine. »",
        info: "« La mer est pas normale. Les courants changent toutes les heures, la boussole tourne comme une toupie, et hier soir, j'ai vu... non. Oubliez. J'ai rien vu. »",
        quest: "« Si vous voulez éviter une mutinerie, parlez aux gars. Rassurez-les. Mentez s'il le faut. Parce que si un seul de plus vient me dire qu'il a vu des tentacules sous la coque, je fais demi-tour avec ou sans votre permission. »",
        farewell: "« Dites vos prières ce soir. Demain sera pire. C'est toujours pire. »",
      },
      stats: { hp: 48, atk: 12, ac: 14 },
    },
  ],
  skillChecks: [
    { skill: 'Survie', dc: 50, success: "Vous aidez l'équipage à naviguer la tempête avec brio. Les voiles sont ajustées à temps, le cap tenu. Le navire en sort trempé mais intact.", failure: "La tempête vous maltraite. Le mât de misaine craque, un marin est emporté par une vague (il est rattrapé de justesse), et la réserve d'eau douce est contaminée par l'eau de mer." },
    { skill: 'Persuasion', dc: 45, success: "Votre discours galvanise l'équipage. Même Bosco semble impressionné. La mutinerie est évitée, et les marins vous traitent avec un respect nouveau.", failure: "Les marins écoutent poliment, mais la peur reste dans leurs yeux. Bosco murmure dans les coins. La tension monte." },
    { skill: 'Perception', dc: 55, success: "Dans un éclair, vous apercevez quelque chose sous la surface — immense, couvert d'écailles bioluminescentes, se mouvant avec une grâce terrifiante. Le Léviathan. Il ne vous attaque pas. Pas encore. Il observe.", failure: "La mer est un mur opaque de vagues et d'écume. Impossible de voir quoi que ce soit sous la surface." },
  ],
  choices: [
    {
      id: 'choice-ship-crisis',
      prompt: "Comment les héros gèrent-ils la crise à bord ?",
      options: [
        {
          label: "Chanter avec l'équipage",
          description: "Reprendre la tradition maritime et entonner Le Dernier Port pour calmer les esprits.",
          consequence: "Le chant résonne sur les flots. L'équipage se rassemble, la peur recule. Et sous la coque, le Léviathan semble... s'éloigner. La musique a un pouvoir ici.",
          nextScene: 'scene-3-6-island',
          reputationChange: [{ faction: "Syndicat", amount: 5 }],
        },
        {
          label: "Prendre le commandement",
          description: "Imposer votre autorité pour éviter la mutinerie et naviguer la tempête.",
          consequence: "Vous prenez la barre. C'est brutal, efficace, et l'équipage obéit — mais Bosco n'oublie pas. Il se soumettra... pour l'instant.",
          nextScene: 'scene-3-6-island',
          skillCheck: { skill: 'Intimidation', dc: 50, success: "Votre autorité est incontestée. Même Reva vous regarde avec un respect nouveau.", failure: "L'équipage obéit, mais du bout des lèvres. Bosco sourit dans l'ombre. Ce n'est pas fini." },
        },
        {
          label: "Utiliser la magie pour calmer la tempête",
          description: "Canaliser votre pouvoir pour apaiser les eaux.",
          consequence: "La magie fonctionne partiellement — la tempête faiblit. Mais l'utilisation de magie près du Sceau de Mer attire l'attention de ce qui vit en dessous.",
          nextScene: 'scene-3-6-island',
          skillCheck: { skill: 'Arcanes', dc: 55, success: "La tempête s'apaise comme un animal calmé. Les marins vous regardent avec une révérence mêlée de crainte. Mais dans les profondeurs, quelque chose s'éveille.", failure: "La magie est absorbée par les eaux noires. Pire — quelque chose semble répondre. Une vague de nausée magique traverse le navire." },
        },
      ],
    },
  ],
  nextScenes: ['scene-3-6-island', 'scene-3-6-underwater'],
  previousScene: 'scene-3-6-port-explore',
};

const scene_3_6_island: BookScene = {
  id: 'scene-3-6-island',
  sceneNumber: 107,
  title: "L'Île des Premiers",
  type: 'exploration',
  location: "Île sans nom, archipel de la Mer Noire",
  locationId: 'ile-premiers',
  estimatedMinutes: 40,
  readAloud: {
    text: `L'île apparaît dans la brume comme un rêve — ou un piège.

Le Chagrin Joyeux a besoin de réparations après la tempête, et cette île est la seule terre visible à des lieues à la ronde. De loin, elle semble ordinaire : des falaises de basalte noir, une végétation dense et tropicale au sommet, et une plage de sable gris où les vagues meurent dans un murmure.

Mais en approchant, vous voyez les ruines.

Des colonnes de pierre blanche émergent de la jungle, hautes comme des tours, couvertes de lierre et de mousse mais indubitablement artificielles. Des arches brisées enjambent des ravins. Des escaliers taillés dans la roche mènent vers le sommet de l'île, où une structure massive — un temple, peut-être — se dresse contre le ciel gris.

Et partout, des symboles. Gravés dans la pierre, dans les falaises, dans les arbres eux-mêmes. Des cercles concentriques, des spirales, des motifs géométriques qui font mal aux yeux si on les regarde trop longtemps. C'est l'écriture des Premiers — ceux qui étaient là avant les elfes, avant les nains, avant les humains. Avant tout.

L'air sur l'île est différent. Plus lourd. Plus ancien. Vous avez la sensation étrange que chaque pas que vous faites ici a déjà été fait par quelqu'un d'autre, il y a très très longtemps.

Et au sommet de l'escalier principal, à l'entrée du temple, une forme massive est allongée. De la pierre. Du métal. Du cristal. Immobile depuis des millénaires.

Un gardien. Endormi. Pour l'instant.`,
    mood: "Mystère archéologique, grandeur ancienne, danger latent",
    music: "Silence oppressant, vent dans les ruines, bourdonnement basse fréquence, percussions tribales lointaines",
  },
  gmNotes: [
    { type: 'info', text: "L'île est un avant-poste des Premiers — la civilisation qui a créé les Sceaux. Le temple contient des informations cruciales sur le fonctionnement des Sceaux et potentiellement un artefact utile pour le Grand Rituel de l'Acte 4." },
    { type: 'warning', text: "Le gardien est un Golem Primordial. Il s'active si quelqu'un entre dans le temple sans résoudre l'énigme de l'entrée. C'est un combat difficile (CR 12) qui peut être entièrement évité par l'intelligence." },
    { type: 'tip', text: "Faites monter la tension avec les ruines. Chaque inscription, chaque symbole, chaque salle raconte une histoire. Les joueurs curieux seront récompensés par du lore précieux." },
    { type: 'secret', text: "Le temple contient une fresque qui représente le moment de la création des Sceaux. Elle montre clairement que les Sceaux n'enferment pas un démon — mais séparent deux mondes qui étaient autrefois un. C'est un indice majeur pour la révélation de l'Acte 5." },
    { type: 'lore', text: "Les Premiers ne sont ni des dieux ni des mortels. Ils sont ce qui existe entre les deux — des êtres de pure volonté qui ont façonné Aethelgard comme un artisan façonne l'argile. Les Sceaux sont leur dernier legs, un système de sécurité pour un monde qu'ils savaient instable." },
  ],
  npcs: [
    {
      name: "Le Golem Primordial (dormant)",
      role: "Gardien du temple des Premiers",
      personality: "Pas de personnalité au sens humain. Suit un protocole vieux de millénaires. Mais ses réponses suggèrent une intelligence ancienne, presque mélancolique.",
      appearance: "Forme humanoïde de six mètres de haut, faite de pierre blanche veinée de cristal bleu. Des runes couvrent chaque centimètre de sa surface. Ses yeux sont des orbes de lumière éteinte. De la mousse pousse dans ses articulations.",
      dialogues: {
        greeting: "« ... (les yeux s'allument lentement, une voix qui grince comme de la pierre) ... PROTOCOLE... ACTIVÉ. IDENTIFICATION... REQUISE. ÊTES-VOUS... LES SUCCESSEURS ? »",
        info: "« LES PREMIERS... ONT BÂTI. ONT PROTÉGÉ. ONT... ÉCHOUÉ. LE TEMPLE... CONTIENT... LA MÉMOIRE. LA MÉMOIRE... EST FRAGILE. COMME VOUS. »",
        quest: "« RÉSOLVEZ... L'ÉPREUVE. PROUVEZ... LA VALEUR. TROIS QUESTIONS. TROIS VÉRITÉS. UNE PORTE. »",
        farewell: "« ... SI VOUS... SURVIVEZ... DITES AU MONDE... QUE LES PREMIERS... SE SOUVIENNENT. »",
      },
      stats: { hp: 200, atk: 28, ac: 22 },
    },
  ],
  skillChecks: [
    { skill: 'Histoire', dc: 50, success: "Vous reconnaissez certains symboles des Premiers grâce à des textes étudiés à la Guilde des Arcanes. L'île était un observatoire — un lieu pour surveiller les Sceaux.", failure: "Les symboles sont incompréhensibles. Vous sentez qu'ils portent un sens profond, mais il vous échappe." },
    { skill: 'Arcanes', dc: 55, success: "L'énergie qui imprègne l'île n'est ni arcane ni divine — c'est quelque chose de plus ancien. Une magie primordiale, antérieure aux traditions magiques connues. Fascinant et terrifiant.", failure: "L'énergie de l'île interfère avec vos sens magiques. C'est comme essayer de lire sous l'eau." },
    { skill: 'Investigation', dc: 45, success: "En examinant l'entrée du temple, vous trouvez un mécanisme caché — trois disques de pierre qui doivent être alignés selon un motif spécifique. L'énigme du gardien.", failure: "L'entrée semble scellée sans mécanisme apparent. Seule la force ou la magie pourrait l'ouvrir — ce qui réveillerait le gardien." },
  ],
  choices: [
    {
      id: 'choice-island-approach',
      prompt: "Comment les héros abordent-ils le temple ?",
      options: [
        {
          label: "Résoudre l'énigme du gardien",
          description: "Tenter de répondre aux trois questions rituelles pour entrer pacifiquement.",
          consequence: "Le gardien pose trois énigmes philosophiques sur la nature des Sceaux, du sacrifice et de la mémoire. Chaque bonne réponse ouvre un verrou. Trois bonnes réponses ouvrent le temple sans combat.",
          nextScene: 'scene-3-6-underwater',
          skillCheck: { skill: 'Intelligence', dc: 50, success: "Vos réponses résonnent dans le temple comme un écho attendu depuis des millénaires. Le gardien incline sa tête massive et s'écarte. Le temple est ouvert.", failure: "Le gardien secoue la tête. 'RÉPONSE... INSUFFISANTE. MAIS... PAS FAUSSE. ESSAYEZ... ENCORE.' Il vous accorde une seconde chance, plus difficilement." },
        },
        {
          label: "Combattre le gardien",
          description: "Forcer l'entrée et affronter le Golem Primordial.",
          consequence: "Combat difficile contre une créature ancienne. Le gardien est puissant mais lent. La victoire ouvre le temple, mais les fresques intérieures sont endommagées par le combat.",
          nextScene: 'scene-3-6-underwater',
        },
        {
          label: "Contourner le temple par les souterrains",
          description: "Chercher une entrée alternative par les cavernes sous l'île.",
          consequence: "Les cavernes mènent à une salle inférieure du temple, évitant le gardien. Mais les tunnels sont piégés et abritent des créatures marines corrompues.",
          nextScene: 'scene-3-6-underwater',
          skillCheck: { skill: 'Perception', dc: 50, success: "Vous repérez les pièges avant de les déclencher. Le passage est sûr, et vous débouchez dans la bibliothèque secrète du temple.", failure: "Un piège de runes s'active. Dégâts de force (4d8) et alerte : d'autres pièges pourraient suivre." },
        },
      ],
    },
  ],
  loot: ["Fragment de Savoir Primordial (parchemin indestructible contenant un sort oublié)", "Cristal de Mémoire (montre une vision du passé une fois par jour)", "Carte complète des emplacements des Sceaux"],
  nextScenes: ['scene-3-6-underwater', 'scene-3-6-3'],
  previousScene: 'scene-3-6-ship-life',
};

const scene_3_6_underwater: BookScene = {
  id: 'scene-3-6-underwater',
  sceneNumber: 108,
  title: "Les Abysses Lumineux",
  type: 'exploration',
  location: "Fonds marins près du Sceau de Mer",
  locationId: 'abysses-mer-noire',
  estimatedMinutes: 35,
  readAloud: {
    text: `La cloche de plongée descend dans l'obscurité comme une étoile tombant dans un puits sans fond.

C'est une invention de la Guilde des Arcanes — une sphère de verre renforcé et de mithril, enchantée pour recycler l'air et résister à la pression des profondeurs. Elle est juste assez grande pour quatre personnes, si elles ne sont pas claustrophobes. Si elles le sont, c'est un problème.

Les premiers mètres sont familiers — l'eau verte, les poissons curieux, les algues qui dansent dans le courant. Puis la lumière du soleil disparaît, et le monde change. Le vert devient bleu, puis noir. La température chute. Le silence est total, absolu, presque sacré.

Et puis les coraux apparaissent.

Des structures impossibles de lumière vivante — des coraux bioluminescents de toutes les couleurs, bleu électrique, rose vif, vert émeraude, violet profond. Ils forment des arches, des tours, des cathédrales sous-marines d'une beauté à couper le souffle. Des créatures transparentes comme du verre nagent entre les branches, des méduses grandes comme des chars, des poissons dont les écailles projettent des constellations sur les parois de la cloche.

Plus bas encore, le fond de l'océan se révèle. Et là, au centre d'un cratère de corail lumineux, le Sceau de Mer. Un disque de pierre noire d'une centaine de mètres de diamètre, couvert de runes qui pulsent faiblement, comme un cœur malade. Des fissures le traversent, et de chaque fissure s'échappe un filet de lumière verdâtre — la même corruption que celle qui empoisonnait l'Arbre-Monde.

Le Sceau de Mer est en train de mourir. Et autour de lui, attirées par la corruption, des créatures abyssales circulent dans l'ombre. Attendant.`,
    mood: "Émerveillement sous-marin, fragilité face à l'immensité, beauté mortelle",
    music: "Sons subaquatiques, baleines lointaines, synthétiseur éthéré, basses profondes et pulsations",
  },
  gmNotes: [
    { type: 'info', text: "Cette scène est avant tout visuelle et émotionnelle. Les joueurs découvrent la beauté et la fragilité du monde sous-marin d'Aethelgard, tout en constatant l'ampleur des dégâts causés par la corruption des Sceaux." },
    { type: 'warning', text: "La cloche de plongée a une autonomie de 2 heures. Passé ce délai, l'air se raréfie. Utilisez cette contrainte pour créer de la tension." },
    { type: 'tip', text: "Décrivez les profondeurs avec émerveillement avant d'introduire le danger. Le contraste entre la beauté et la menace est l'essence de cette scène." },
    { type: 'secret', text: "Les créatures abyssales ne sont pas hostiles par nature — elles sont corrompues par l'énergie qui fuit du Sceau. Si les héros trouvent un moyen de colmater temporairement les fissures, les créatures se calmeront." },
    { type: 'lore', text: "Le Sceau de Mer est le deuxième plus ancien des cinq Sceaux. Il a été posé au fond de l'océan pour une raison : l'eau est le meilleur isolant contre la magie primordiale. Quand il se brise, les tempêtes ne sont que le début." },
  ],
  npcs: [
    {
      name: "Ondine",
      role: "Esprit aquatique, gardienne informelle du Sceau",
      personality: "Étrangère aux émotions humaines mais curieuse. Communique par images plutôt que par mots. Triste, d'une tristesse qui dure depuis des siècles.",
      appearance: "Silhouette féminine faite d'eau cristalline, constamment en mouvement. Ses traits changent comme des vagues. Des algues luminescentes forment une chevelure qui flotte autour d'elle. Ses yeux sont deux perles abyssales.",
      dialogues: {
        greeting: "« (Des images affluent dans votre esprit : le Sceau intact, brillant de mille feux. Puis le même Sceau, fissuré, sombre. Une question muette : pourquoi ?) »",
        info: "« (Vision : des silhouettes en robes de cendres, versant un liquide noir dans les fissures du Sceau. Le Cercle des Cendres. Ils sont venus ici aussi. La corruption est volontaire.) »",
        quest: "« (Vision : une perle de lumière pure, cachée dans la structure même du Sceau. Le Cœur de Mer. Si vous l'atteignez, si vous le nourrissez de votre énergie vitale, le Sceau peut être stabilisé. Temporairement.) »",
        farewell: "« (Vision : vous, remontant vers la surface, portant quelque chose de lumineux. Et en dessous, les ténèbres qui reculent. Pour un temps.) »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Nature', dc: 50, success: "Vous identifiez les coraux lumineux comme des organismes symbiotiques du Sceau. Ils canalisent son énergie et la redistribuent dans l'océan. Si le Sceau meurt, ils mourront aussi — et avec eux, tout l'écosystème des profondeurs.", failure: "Les coraux sont magnifiques mais leur fonction vous échappe. Ils semblent liés au Sceau, mais comment exactement ?" },
    { skill: 'Arcanes', dc: 55, success: "Les fissures du Sceau émettent une fréquence magique spécifique. Si vous pouvez créer une contre-fréquence, vous pourriez colmater temporairement les brèches. Il faudrait un sort de niveau 5 minimum, modifié.", failure: "La magie du Sceau est trop ancienne, trop différente de ce que vous connaissez. C'est comme essayer de lire une langue dont vous ne connaissez même pas l'alphabet." },
  ],
  choices: [
    {
      id: 'choice-underwater-action',
      prompt: "Que font les héros face au Sceau mourant ?",
      options: [
        {
          label: "Nourrir le Cœur de Mer",
          description: "Sacrifier de l'énergie vitale pour stabiliser le Sceau temporairement.",
          consequence: "Chaque PJ qui contribue perd 2d10 PV maximaux (récupérables après un repos long). Le Sceau est stabilisé pour un mois. Ondine offre un don en remerciement.",
          nextScene: 'scene-3-6-4',
          reputationChange: [{ faction: "Gardiens d'Émeraude", amount: 15 }],
        },
        {
          label: "Collecter des données et remonter",
          description: "Étudier le Sceau et ses fissures pour rapporter des informations à la Guilde des Arcanes.",
          consequence: "Les informations collectées seront cruciales pour le Grand Rituel de l'Acte 4. Le Sceau continue de se dégrader, mais les données permettront une solution permanente.",
          nextScene: 'scene-3-6-4',
          reputationChange: [{ faction: "Guilde des Arcanes", amount: 15 }],
        },
        {
          label: "Affronter les créatures abyssales",
          description: "Éliminer les créatures corrompues qui rôdent autour du Sceau.",
          consequence: "Combat sous-marin dans la cloche de plongée. Victoire difficile, mais les créatures purifiées libèrent une énergie qui renforce légèrement le Sceau.",
          nextScene: 'scene-3-6-4',
        },
      ],
    },
  ],
  encounter: {
    name: "Créatures des Abysses Corrompues",
    enemies: [
      { name: "Léviathan Juvénile", hp: 120, atk: 20, ac: 17, cr: 9, abilities: ["Souffle glacial (cône de 10m, 6d8 froid)", "Constriction (2d10+8 contondant)"] },
      { name: "Méduse Abyssale", hp: 60, atk: 14, ac: 13, cr: 6, abilities: ["Tentacules paralysants (CD 48 Constitution)", "Aura de terreur (CD 45 Sagesse)"] },
      { name: "Essaim de Poissons-Rasoirs", hp: 40, atk: 16, ac: 15, cr: 5, abilities: ["Nuée déchiquetante (3d6 tranchant à tous dans la zone)", "Résistance aux dégâts d'armes"] },
    ],
    terrain: ["Eau profonde (mouvement réduit de moitié)", "Coraux bioluminescents (couverture partielle)", "Courants (jets de Force CD 40 pour ne pas être déplacé)", "Obscurité au-delà de 20m"],
    tactics: "Les créatures attaquent en coordination instinctive. Le Léviathan juvénile charge la cloche de plongée pendant que les méduses paralysent les défenseurs et que l'essaim harcèle les flancs.",
    loot: ["Écaille de Léviathan (composant pour armure magique)", "Perle d'Abyssal (sort de Respiration Aquatique permanent)", "Essence de Corruption Marine (utile pour la recherche sur les Sceaux)"],
  },
  nextScenes: ['scene-3-6-4'],
  previousScene: 'scene-3-6-island',
};

// ============================================================================
// CHAPITRE 7 : LE POINT DE NON-RETOUR — Scènes additionnelles
// ============================================================================

const scene_3_7_refugees: BookScene = {
  id: 'scene-3-7-refugees',
  sceneNumber: 109,
  title: "Les Déplacés de l'Ombre",
  type: 'social',
  location: "Camp de réfugiés aux portes de Sol-Aureus",
  locationId: 'sol-aureus-faubourgs',
  estimatedMinutes: 30,
  readAloud: {
    text: `Ils arrivent par milliers.

Les routes qui mènent à Sol-Aureus sont devenues des rivières humaines — familles entières portant ce qu'elles ont pu sauver, enfants sur les épaules, vieillards traînés dans des charrettes. Des villages entiers vidés par l'avancée du Cercle des Cendres, des fermes abandonnées, des vies brisées en une nuit.

Le camp de réfugiés s'étend sur les plaines devant les murailles comme une ville de toile et de désespoir. Des tentes improvisées, des feux de fortune, des files d'attente pour de l'eau et du pain. L'odeur de trop de gens dans trop peu d'espace — sueur, fumée, maladie. Et partout, les pleurs des enfants.

Un prêtre de Solarius distribue de la soupe, les mains tremblantes. Une guérisseuse halfeline court entre les blessés, incapable de tous les soigner, incapable de s'arrêter. Un soldat de la garde essaie de maintenir l'ordre dans une file de centaines de personnes qui n'ont pas mangé depuis deux jours.

Et quand vous arrivez, quelque chose change. Les murmures. Les regards. Les doigts qui pointent. Les visages qui s'éclairent ou s'assombrissent.

« Les héros. Les héros sont là. »

C'est un fardeau, ce mot. Un poids qui tombe sur vos épaules. Parce que les héros, ça sauve les gens. Et il y a tellement de gens à sauver.`,
    mood: "Urgence humanitaire, empathie, poids de la responsabilité",
    music: "Cordes mélancoliques, flûte plaintive, bruits de foule en fond, silence entre les notes",
  },
  gmNotes: [
    { type: 'info', text: "Cette scène confronte les joueurs à la dimension humaine de la guerre. Pas de monstres, pas de combats — juste des gens qui souffrent et qui ont besoin d'aide. C'est volontairement plus difficile émotionnellement qu'un combat." },
    { type: 'tip', text: "Individualisez les réfugiés. Donnez des noms, des histoires, des visages. Un vieux forgeron qui a perdu sa forge. Une petite fille qui cherche son chat. Un soldat blessé qui refuse les soins parce que 'les civils d'abord'." },
    { type: 'warning', text: "Les joueurs ne peuvent pas sauver tout le monde. C'est le point. S'ils essaient de tout gérer, ils seront épuisés et inefficaces. Ils doivent faire des choix de triage." },
    { type: 'secret', text: "Parmi les réfugiés, un espion du Cercle des Cendres se fait passer pour un fermier blessé. Il cartographie les défenses de Sol-Aureus et les mouvements des héros. Investigation CD 60 pour le repérer." },
  ],
  npcs: [
    {
      name: "Mère Agatha",
      role: "Ancienne du village d'Aubefeuille, porte-parole des réfugiés",
      personality: "Digne, épuisée, inébranlable. Refuse la pitié mais accepte l'aide. A enterré trois de ses cinq enfants en route vers Sol-Aureus.",
      appearance: "Femme âgée, cheveux blancs en désordre, vêtements de paysanne couverts de poussière de route. Le dos droit malgré tout. Des yeux qui ont pleuré tout ce qu'il y avait à pleurer.",
      dialogues: {
        greeting: "« On n'a pas besoin de héros, on a besoin de couvertures. Et de nourriture. Et d'un endroit où dormir qui ne soit pas de la boue. Mais si vous pouvez aussi être des héros, on ne refusera pas. »",
        info: "« Aubefeuille a brûlé en une nuit. Des morts-vivants, des fanatiques en robes noires. Ils n'ont même pas pillé — ils ont juste détruit. Comme si la destruction était le but. Mon mari est resté pour couvrir notre fuite. Il... il n'est pas là. »",
        quest: "« Il y a des enfants malades. Vingt, peut-être trente. La fièvre de cendres, ils appellent ça. La guérisseuse fait ce qu'elle peut, mais elle est seule. Si vous connaissez quelqu'un qui peut aider... »",
        farewell: "« Merci. C'est un mot qui ne suffit pas, mais c'est tout ce que j'ai. Merci. »",
      },
    },
  ],
  skillChecks: [
    { skill: 'Médecine', dc: 45, success: "Vous stabilisez les cas les plus graves. La fièvre de cendres est une maladie magique — un sous-produit de la corruption des Sceaux. Vos soins gagnent du temps, mais il faudra un remède alchimique pour une guérison complète.", failure: "Les symptômes sont au-delà de vos compétences médicales. Vous pouvez soulager la douleur, mais pas guérir la cause." },
    { skill: 'Persuasion', dc: 40, success: "Votre discours rassure les réfugiés. Le calme revient, l'organisation s'améliore. Même les gardes semblent remotivés.", failure: "Les mots sonnent creux face à tant de souffrance. Les gens écoutent poliment, mais la peur reste." },
  ],
  choices: [
    {
      id: 'choice-refugee-triage',
      prompt: "Les ressources sont limitées. Où les héros concentrent-ils leurs efforts ?",
      options: [
        {
          label: "Les enfants malades en priorité",
          description: "Consacrer toutes les ressources médicales aux cas pédiatriques.",
          consequence: "La plupart des enfants survivent. Mais des adultes blessés meurent faute de soins. Les réfugiés comprennent — c'est douloureux, mais logique.",
          nextScene: 'scene-3-7-war-council',
          reputationChange: [{ faction: "Peuple de Sol-Aureus", amount: 15 }],
        },
        {
          label: "Organiser la logistique du camp",
          description: "Mettre en place un système de distribution et de soins efficace.",
          consequence: "Le camp s'organise. Moins de morts, mais le processus est lent et impersonnel. Certains reprochent aux héros de traiter les gens comme des numéros.",
          nextScene: 'scene-3-7-war-council',
          skillCheck: { skill: 'Intelligence', dc: 45, success: "Votre système de triage est brillant. Rationnement équitable, files efficaces, soins prioritaires. Un modèle d'organisation en temps de crise.", failure: "Le système fonctionne, mais mal. Des erreurs de distribution créent des tensions. Certains reçoivent double, d'autres rien." },
        },
        {
          label: "Chercher l'espion du Cercle",
          description: "Se concentrer sur la sécurité plutôt que sur l'humanitaire.",
          consequence: "L'espion est débusqué, mais le temps consacré à la chasse n'a pas été consacré aux soins. Trois réfugiés meurent cette nuit-là.",
          nextScene: 'scene-3-7-war-council',
          skillCheck: { skill: 'Investigation', dc: 60, success: "Un 'fermier' dont les mains n'ont jamais tenu une charrue. Vous l'arrêtez discrètement. Ses informations sur les plans du Cercle sont inestimables.", failure: "Vous interrogez des dizaines de personnes sans résultat. L'espion reste en place, invisible." },
          reputationChange: [{ faction: "Garde Royale", amount: 10 }, { faction: "Peuple de Sol-Aureus", amount: -10 }],
        },
      ],
    },
  ],
  nextScenes: ['scene-3-7-war-council', 'scene-3-7-1'],
  previousScene: 'scene-3-6-4',
};

const scene_3_7_war_council: BookScene = {
  id: 'scene-3-7-war-council',
  sceneNumber: 110,
  title: "La Table des Stratèges",
  type: 'social',
  location: "Salle du Conseil de Guerre, Palais Royal de Sol-Aureus",
  locationId: 'sol-aureus-palais',
  estimatedMinutes: 35,
  readAloud: {
    text: `La Salle du Conseil de Guerre n'a pas été utilisée depuis la dernière grande menace, il y a quarante ans. La poussière a été chassée à la hâte, les torches rallumées, et la grande table de chêne — une carte d'Aethelgard gravée dans sa surface — brille à nouveau sous la lumière des chandelles.

Autour de cette table, les visages les plus puissants d'Aethelgard. Et ils ne sont pas d'accord.

Le Général Marcus, vétéran de cent batailles, veut une défense en profondeur. Trois lignes de fortification devant Sol-Aureus, des pièges, des fossés enflammés. « On les ralentit, on les use, on les brise sur nos murs, » dit-il en posant des figurines d'étain sur la carte.

L'Archimage Vaelith secoue la tête. Elle veut une frappe préemptive — envoyer un corps d'élite détruire le camp de commandement du Cercle avant que leur armée ne soit assemblée. « Couper la tête du serpent, » murmure-t-elle en faisant léviter les figurines du Cercle hors de la carte.

Le Roi Thrain frappe la table du poing. Les nains défendront Forgefer et seulement Forgefer. « Mes gens d'abord. Toujours. Si Sol-Aureus veut notre aide, elle la paiera. En or, en fer, ou en promesses qui valent les deux. »

Et la Reine Elara, au bout de la table, les écoute tous avec cet air de patience infinie des souverains qui savent que la décision finale leur appartient — et qu'elle sera mauvaise, quoi qu'ils choisissent.

Puis elle se tourne vers vous.

« Vous avez vu le Cercle de près. Vous avez combattu ses agents, traversé ses épreuves. Qu'est-ce que vous recommandez ? »

La salle se tait. Tous les regards convergent vers vous.`,
    mood: "Tension politique, poids des décisions stratégiques, enjeux monumentaux",
    music: "Cuivres graves, tambours de guerre lointains, silence tendu entre les notes",
  },
  gmNotes: [
    { type: 'info', text: "Ce conseil de guerre détermine la stratégie défensive de Sol-Aureus pour le siège à venir. Le choix des joueurs aura des conséquences mécaniques sur les scènes de bataille suivantes." },
    { type: 'tip', text: "Faites argumenter les PNJ entre eux avant de demander l'avis des PJ. Les désaccords entre alliés puissants sont un moteur dramatique excellent. Laissez les joueurs prendre parti." },
    { type: 'warning', text: "Aucune stratégie n'est parfaite. Chacune a des avantages et des coûts. Ne laissez pas les joueurs croire qu'il existe un 'bon' choix — seulement des compromis." },
    { type: 'secret', text: "Elara a déjà pris sa décision — elle fera ce que les héros recommandent. Non par faiblesse, mais parce qu'elle croit en leur jugement plus qu'en celui des généraux. C'est un pari énorme." },
  ],
  npcs: [
    {
      name: "Général Marcus",
      role: "Commandant des armées de Sol-Aureus",
      personality: "Méthodique, conservateur, expérimenté. Préfère la certitude d'une défense solide au risque d'une attaque audacieuse.",
      appearance: "Homme de soixante ans, cheveux gris coupés ras, moustache impeccable. Armure de cérémonie couverte de décorations. Regard calme et analytique.",
      dialogues: {
        greeting: "« Héros. Je ne juge pas les gens sur leur réputation — je les juge sur leurs plans. Montrez-moi ce que vous avez. »",
        info: "« L'ennemi a trois fois notre nombre. Mais nous avons les murs, le terrain et la motivation. Un homme qui défend sa maison vaut cinq assaillants. C'est de la mathématique, pas de l'héroïsme. »",
        quest: "« Si vous optez pour ma stratégie, j'aurai besoin de vous sur la première ligne. Les soldats se battent mieux quand ils voient des héros à côté d'eux. C'est de la psychologie, pas de la stratégie. »",
        farewell: "« Quelle que soit la décision, nous nous battrons. C'est la seule chose dont je suis certain. »",
      },
      stats: { hp: 90, atk: 18, ac: 20 },
    },
  ],
  choices: [
    {
      id: 'choice-war-strategy',
      prompt: "Quelle stratégie les héros recommandent-ils ?",
      options: [
        {
          label: "Défense en profondeur (Plan Marcus)",
          description: "Fortifier Sol-Aureus et attendre le siège.",
          consequence: "Les défenses sont renforcées. Les civils sont mieux protégés. Mais l'ennemi choisit le moment et le lieu de l'attaque, et le moral baisse avec l'attente.",
          nextScene: 'scene-3-7-last-stand',
          reputationChange: [{ faction: "Garde Royale", amount: 15 }, { faction: "Guilde des Arcanes", amount: -5 }],
        },
        {
          label: "Frappe préemptive (Plan Vaelith)",
          description: "Envoyer un commando élite détruire le camp du Cercle.",
          consequence: "Mission à haut risque mais à haute récompense. Si elle réussit, l'armée ennemie est désorganisée. Si elle échoue, Sol-Aureus perd ses meilleurs agents.",
          nextScene: 'scene-3-7-last-stand',
          skillCheck: { skill: 'Tactique', dc: 55, success: "La frappe est chirurgicale. Le camp de commandement est détruit, retardant l'offensive du Cercle de deux semaines.", failure: "Le Cercle attendait cette manœuvre. C'est un piège. Le commando est décimé. Seuls les héros reviennent." },
          reputationChange: [{ faction: "Guilde des Arcanes", amount: 15 }, { faction: "Garde Royale", amount: -5 }],
        },
        {
          label: "Alliance totale (négocier avec Thrain)",
          description: "Convaincre les nains de joindre leurs forces en échange de concessions.",
          consequence: "L'armée naine renforce considérablement les défenses, mais les concessions sont coûteuses — politiquement et matériellement.",
          nextScene: 'scene-3-7-last-stand',
          skillCheck: { skill: 'Persuasion', dc: 55, success: "Thrain accepte. 'Vous avez du cran, pour des grandes-gens. Mes haches sont vôtres.' L'alliance est scellée.", failure: "Thrain refuse. 'Les mots, c'est du vent. Montrez-moi des actes.' Il faudra un geste concret pour le convaincre." },
          reputationChange: [{ faction: "Nains de Forgefer", amount: 20 }],
        },
        {
          label: "Plan hybride",
          description: "Combiner défense et frappes ciblées, mais en dispersant les forces.",
          consequence: "Le plan est flexible et adaptatif. Mais il exige une coordination parfaite — un seul maillon faible et tout s'effondre.",
          nextScene: 'scene-3-7-last-stand',
          skillCheck: { skill: 'Commandement', dc: 60, success: "Le plan est exécuté avec une précision remarquable. Les ennemis ne savent jamais d'où viendra le prochain coup.", failure: "La coordination échoue. Des unités se retrouvent au mauvais endroit au mauvais moment. Des pertes inutiles." },
        },
      ],
    },
  ],
  nextScenes: ['scene-3-7-last-stand'],
  previousScene: 'scene-3-7-refugees',
};

const scene_3_7_last_stand: BookScene = {
  id: 'scene-3-7-last-stand',
  sceneNumber: 111,
  title: "L'Heure des Braves",
  type: 'combat',
  location: "Murailles et rues de Sol-Aureus",
  locationId: 'sol-aureus',
  estimatedMinutes: 50,
  readAloud: {
    text: `Ils arrivent avec l'aube, comme un tsunami de chair et d'acier noir.

L'horizon se noircit de silhouettes — des milliers, peut-être des dizaines de milliers. Des morts-vivants en rangs serrés, les yeux vides brillant d'un feu vert. Des fanatiques du Cercle en robes de cendres, chantant des incantations. Et derrière eux, les abominations — des créatures de cauchemar assemblées à partir de corps et de magie noire, trop grandes, trop nombreuses, trop horribles pour être nommées.

Sur les murailles de Sol-Aureus, les défenseurs regardent en silence. Il n'y a plus rien à dire. Chaque prière a été priée, chaque lettre écrite, chaque lame affûtée. Ce qui reste, c'est le courage ou la peur. Et parfois, c'est la même chose.

Le Général Marcus lève son épée. Mille épées se lèvent avec lui.

La première vague frappe les barricades extérieures comme un marteau sur une enclume. Le bruit est assourdissant — métal, os, cris, explosions magiques. Les pièges s'activent : fosses à pieux, huile enflammée, runes explosives. Des dizaines d'ennemis tombent. Des centaines les remplacent.

Les barricades ne tiendront pas longtemps. Ce n'est pas le but. Le but, c'est de gagner du temps. Chaque minute compte. Chaque heure est un miracle.

Et vous êtes là, au cœur de la tempête, la lame au poing, le sort aux lèvres, le cœur battant. Pas parce que vous n'avez pas peur. Parce que vous avez peur, et que vous restez quand même.

C'est ça, l'héroïsme. Pas l'absence de peur. Le refus de fuir.`,
    mood: "Épique désespéré, héroïsme pur, adrénaline et terreur mêlées",
    music: "Orchestre de guerre complet, cuivres en crescendo, chœurs guerriers, percussions martiales, cris de bataille en fond",
  },
  gmNotes: [
    { type: 'info', text: "C'est LA scène de combat de l'Acte 3. Elle doit être massive, chaotique et héroïque. Alternez entre combats personnels des PJ et descriptions panoramiques de la bataille." },
    { type: 'tip', text: "Donnez à chaque PJ un 'moment de gloire' — un ennemi particulier à affronter, un groupe de civils à sauver, un point de défense à tenir seul. Répartissez les moments héroïques équitablement." },
    { type: 'warning', text: "Ce combat est conçu pour être difficile mais pas mortel. Les PJ ne devraient pas mourir ici — mais ils devraient en avoir peur. Utilisez des PNJ alliés qui tombent autour d'eux pour maintenir la tension." },
    { type: 'secret', text: "Le siège est une diversion. Le véritable objectif du Cercle est d'atteindre le Sceau de Pierre sous le Palais Royal pendant que les défenseurs sont occupés. Si les PJ ne le réalisent pas, un PNJ allié (Vaelith ou l'Ombre) leur enverra un message urgent." },
    { type: 'lore', text: "La dernière fois que Sol-Aureus a été assiégée, c'était il y a trois cents ans. À l'époque, la ville avait failli tomber. Les murs portent encore les marques de cette bataille. Cette fois, les enjeux sont infiniment plus grands." },
  ],
  encounter: {
    name: "Siège de Sol-Aureus — Première Vague",
    enemies: [
      { name: "Champion Mort-Vivant", hp: 95, atk: 19, ac: 17, cr: 8, abilities: ["Frappe nécrotique (+3d8 nécrotique)", "Résistance aux dégâts non-magiques", "Aura de terreur CD 45"] },
      { name: "Fanatique du Cercle (x4)", hp: 45, atk: 14, ac: 14, cr: 4, abilities: ["Immolation (se sacrifie pour 8d6 feu dans un rayon de 3m)", "Résistance à la peur"] },
      { name: "Abomination de Cendres", hp: 160, atk: 22, ac: 16, cr: 10, abilities: ["Multiples attaques (3 par tour)", "Régénération (20 PV/tour)", "Aura de corruption (1d8 nécrotique aux créatures à 3m)"] },
      { name: "Nécromancien de Siège", hp: 65, atk: 16, ac: 13, cr: 7, abilities: ["Animation de cadavres", "Rayon d'affaiblissement (CD 50 Constitution)", "Bouclier d'os (réaction, +5 CA)"] },
    ],
    terrain: ["Murailles (avantage sur attaques à distance depuis le haut)", "Barricades (couverture trois-quarts)", "Fosses à pieux (4d10 perforant)", "Huile enflammée (6d6 feu, terrain difficile)"],
    tactics: "Les morts-vivants avancent en vagues pour absorber les pièges. Les fanatiques suivent pour créer des brèches dans les barricades par immolation. Les abominations exploitent les brèches. Les nécromanciens restent en arrière pour ressusciter les tombés.",
    loot: ["Bannière du Cercle Capturée (preuve pour les factions neutres)", "Amulette Nécrotique (peut être étudiée par la Guilde)", "Épée du Champion (arme +2, dégâts nécrotiques)"],
  },
  skillChecks: [
    { skill: 'Commandement', dc: 50, success: "Vos ordres galvanisent les troupes. Les défenseurs tiennent la ligne avec une discipline de fer. Les pertes sont minimisées.", failure: "La confusion règne. Des unités se replient trop tôt, d'autres ne bougent pas assez vite. Des brèches s'ouvrent dans la défense." },
    { skill: 'Perception', dc: 55, success: "Entre deux assauts, vous remarquez un groupe d'agents du Cercle qui se faufile vers les égouts — ils visent le Palais Royal. L'objectif véritable est révélé.", failure: "Le chaos de la bataille masque les mouvements ennemis. Seul un message urgent d'un allié vous alertera de l'infiltration." },
  ],
  choices: [
    {
      id: 'choice-battle-crisis',
      prompt: "Un moment critique : une brèche s'ouvre dans les défenses et des civils sont en danger.",
      options: [
        {
          label: "Défendre les civils",
          description: "Abandonner votre position pour sauver les réfugiés piégés dans le quartier marchand.",
          consequence: "Vous sauvez des dizaines de civils. Mais votre secteur de la muraille tombe, et les soldats qui comptaient sur vous subissent de lourdes pertes.",
          nextScene: 'scene-3-7-sacrifice',
          reputationChange: [{ faction: "Peuple de Sol-Aureus", amount: 20 }, { faction: "Garde Royale", amount: -10 }],
        },
        {
          label: "Tenir la muraille",
          description: "Rester à votre poste et espérer que les réserves atteignent les civils à temps.",
          consequence: "La muraille tient. Votre secteur est une forteresse. Mais les civils du quartier marchand souffrent de lourdes pertes avant l'arrivée des renforts.",
          nextScene: 'scene-3-7-sacrifice',
          reputationChange: [{ faction: "Garde Royale", amount: 15 }, { faction: "Peuple de Sol-Aureus", amount: -10 }],
        },
        {
          label: "Lancer une contre-attaque",
          description: "Prendre l'initiative et charger l'ennemi pour créer une ouverture.",
          consequence: "Votre charge audacieuse désorganise l'assaut ennemi et crée un répit pour les deux fronts. Mais c'est un pari risqué qui pourrait tourner au désastre.",
          nextScene: 'scene-3-7-sacrifice',
          skillCheck: { skill: 'Athlétisme', dc: 55, success: "La charge est légendaire. Vous percez les lignes ennemies, semant le chaos. Les défenseurs reprennent espoir.", failure: "L'ennemi absorbe votre charge et vous encercle. Vous devez vous battre pour votre survie avant de revenir aux lignes alliées." },
        },
      ],
    },
  ],
  nextScenes: ['scene-3-7-sacrifice'],
  previousScene: 'scene-3-7-war-council',
};

const scene_3_7_sacrifice: BookScene = {
  id: 'scene-3-7-sacrifice',
  sceneNumber: 112,
  title: "Le Prix de la Lumière",
  type: 'narration',
  location: "Place Centrale de Sol-Aureus, pendant le siège",
  locationId: 'sol-aureus',
  estimatedMinutes: 25,
  readAloud: {
    text: `Au plus noir de la bataille, quand tout semble perdu, quelqu'un fait le choix que vous n'auriez jamais voulu voir.

La brèche dans les murs est trop large. L'abomination qui l'a créée avance, écrasant les barricades comme du papier. Derrière elle, une marée de morts-vivants déferle. Les défenseurs reculent, et pour la première fois de la bataille, la peur l'emporte sur le courage.

C'est à ce moment qu'il — ou elle — s'avance.

L'un de vos alliés. Celui que vous connaissez depuis le début. Celui qui vous a aidé, qui a ri avec vous, qui s'est battu à vos côtés. Il se retourne une dernière fois, et son regard dit tout ce que les mots ne peuvent pas.

« Allez. Courez. Finissez ce qu'on a commencé. »

Et avant que vous puissiez protester, avant que vous puissiez l'arrêter, la lumière explose.

Un sort de sacrifice. De la magie pure, canalisée à travers un corps mortel, transformée en une détonation de lumière si intense que même les morts-vivants se figent. La brèche se referme — pas avec de la pierre, mais avec de la lumière solidifiée, un mur d'énergie qui tiendra assez longtemps pour que les renforts arrivent.

Quand la lumière s'éteint, il ne reste qu'un cratère. Et au centre du cratère, un objet. Une arme, un bijou, un symbole — quelque chose qui était important pour celui qui l'a porté.

C'est tout ce qui reste.

La bataille continue. Parce que la bataille continue toujours. Mais quelque chose a changé. Dans le cri de guerre des défenseurs, il y a maintenant un nom. Le nom de celui qui n'est plus là.

Et ce nom, comme un sortilège, fait reculer les ténèbres.`,
    mood: "Sacrifice héroïque, deuil en plein combat, beauté tragique",
    music: "Crescendo orchestral, silence brutal, puis reprise avec chœur funèbre transformé en hymne de guerre",
  },
  gmNotes: [
    { type: 'info', text: "C'est le moment le plus émotionnel de l'Acte 3. Un PNJ allié important se sacrifie pour sauver les défenseurs. Le choix du PNJ dépend du MJ et de la relation que les joueurs ont développée avec les personnages." },
    { type: 'tip', text: "Choisissez le PNJ qui aura le plus grand impact émotionnel. C'est celui avec qui les joueurs ont le plus interagi, le plus ri, le plus partagé. Les bons candidats : Aldric, Lilianne, Thalion, ou un PNJ créé spécifiquement pour ce moment." },
    { type: 'warning', text: "Ne rendez PAS ce sacrifice annulable. Pas de résurrection, pas de 'en fait il a survécu'. La mort doit être réelle et définitive pour avoir un impact. Le joueur peut protester — c'est normal. C'est le point." },
    { type: 'secret', text: "Le sort de sacrifice n'était pas prévu. C'est un acte de volonté pure, au-delà de la magie normale. L'énergie libérée est si intense qu'elle crée temporairement une zone de pureté absolue — aucune magie noire ne peut y fonctionner pendant un jour entier." },
    { type: 'lore', text: "Dans la tradition d'Aethelgard, ceux qui se sacrifient pour les autres sont appelés les 'Flammes Éternelles'. Leurs noms sont gravés dans le Hall des Héros au Palais Royal, et une flamme qui ne s'éteint jamais brûle en leur mémoire." },
  ],
  choices: [
    {
      id: 'choice-after-sacrifice',
      prompt: "Comment les héros réagissent-ils au sacrifice ?",
      options: [
        {
          label: "Canaliser la rage",
          description: "Transformer le deuil en fureur guerrière et mener une charge vengeresse.",
          consequence: "La charge est dévastatrice. Les ennemis paient le prix du sang. Les défenseurs suivent, portés par la rage et le chagrin. La deuxième vague est repoussée.",
          nextScene: 'scene-3-7-mourning',
          reputationChange: [{ faction: "Garde Royale", amount: 15 }],
        },
        {
          label: "Prononcer un discours",
          description: "Honorer le sacrifice devant les troupes pour leur donner la force de continuer.",
          consequence: "Les mots résonnent sur les murailles comme un deuxième sort de protection. Les soldats pleurent, mais ils se relèvent. La défense est renforcée par la détermination.",
          nextScene: 'scene-3-7-mourning',
          skillCheck: { skill: 'Persuasion', dc: 45, success: "Votre discours entre dans la légende. Des années plus tard, des gens le réciteront encore. Ce jour-là, il sauve des vies.", failure: "Les mots ne viennent pas facilement. Mais les larmes, oui. Et parfois, les larmes d'un héros sont plus éloquentes que n'importe quel discours." },
          reputationChange: [{ faction: "Peuple de Sol-Aureus", amount: 20 }],
        },
        {
          label: "Récupérer l'objet et poursuivre",
          description: "Prendre ce qui reste de l'allié tombé et continuer le combat en son nom.",
          consequence: "L'objet devient un talisman. Il porte une trace de l'énergie du sacrifice — un bonus permanent de +1 à un jet par jour, tant que le porteur agit selon les valeurs du défunt.",
          nextScene: 'scene-3-7-mourning',
        },
      ],
    },
  ],
  loot: ["Relique du Sacrifice (objet personnel de l'allié tombé, +1 à un jet/jour selon les valeurs du défunt)"],
  nextScenes: ['scene-3-7-mourning'],
  previousScene: 'scene-3-7-last-stand',
};

const scene_3_7_mourning: BookScene = {
  id: 'scene-3-7-mourning',
  sceneNumber: 113,
  title: "L'Aube des Cendres",
  type: 'transition',
  location: "Cimetière des Héros, Sol-Aureus, lendemain du siège",
  locationId: 'sol-aureus',
  estimatedMinutes: 25,
  readAloud: {
    text: `Le silence après la bataille est pire que le bruit.

Sol-Aureus fume. Les murs sont debout — à peine — mais les rues sont jonchées de débris, de flèches brisées, et de choses sur lesquelles personne ne veut marcher. L'odeur de brûlé se mêle à celle, plus douce et plus terrible, des morts qu'on n'a pas encore pu enterrer.

Le Cimetière des Héros, sur la colline à l'est de la ville, a été agrandi pendant la nuit. Des fosses fraîches, des pierres blanches alignées comme des dents dans une mâchoire brisée. Trop de noms. Trop de visages familiers qui ne souriront plus.

La cérémonie est simple. Pas de discours pompeux, pas de fanfares. Un prêtre de Solarius récite les noms des morts, un par un. Chaque nom est une blessure. La liste est longue.

Quand il arrive au nom de votre allié tombé, le prêtre s'arrête. Il vous regarde. Parce que c'est à vous de dire les mots. Parce que personne d'autre ne les connaissait aussi bien.

Le vent souffle sur la colline. La ville blessée s'étend en contrebas, vivante malgré tout. Et au-delà des murs, au-delà de l'horizon, les ténèbres attendent.

Mais ici, maintenant, il n'y a que le souvenir. Et le serment silencieux de ne pas laisser ce sacrifice être vain.

Après la cérémonie, la Reine Elara vous convoque. Elle est debout sur les remparts, regardant le soleil se lever. Elle ne se retourne pas quand vous approchez.

« L'Acte suivant commence, » dit-elle doucement. « Et il sera pire. Êtes-vous prêts ? »

Ce n'est pas vraiment une question.`,
    mood: "Deuil solennel, résilience, transition vers les ténèbres suivantes",
    music: "Requiem aux cordes, flûte solo mélancolique, cloches lointaines, silence final",
  },
  gmNotes: [
    { type: 'info', text: "Scène de transition entre l'Acte 3 et l'Acte 4. C'est le moment de faire le bilan émotionnel et de laisser les joueurs digérer ce qui s'est passé. Pas de mécanique, pas de jets — juste du roleplay et de l'émotion." },
    { type: 'tip', text: "Demandez à chaque joueur ce que son personnage fait pendant la cérémonie. Pleure-t-il ? Se tient-il droit ? S'isole-t-il ? Ces détails construisent les personnages plus que n'importe quel combat." },
    { type: 'warning', text: "Ne précipitez pas cette scène. Le deuil a besoin de temps. Si les joueurs veulent rester silencieux, laissez le silence. Si ils veulent parler, écoutez. C'est LEUR moment." },
    { type: 'lore', text: "La tradition de Sol-Aureus veut que chaque héros tombé reçoive une 'Flamme Éternelle' — une bougie enchantée qui ne s'éteint jamais, posée sur sa tombe. Le cimetière, la nuit, ressemble à un champ d'étoiles tombées." },
    { type: 'secret', text: "Pendant la cérémonie, un corbeau noir se pose sur le mur du cimetière et observe. C'est un familier de Malachar. L'Archon rend hommage, à sa façon, aux morts. Même les ennemis respectent le sacrifice." },
  ],
  choices: [
    {
      id: 'choice-mourning-oath',
      prompt: "Quel serment les héros prononcent-ils sur la tombe de leur allié ?",
      options: [
        {
          label: "Serment de vengeance",
          description: "Jurer de détruire le Cercle des Cendres et Malachar, quel qu'en soit le prix.",
          consequence: "Le serment de vengeance confère une détermination redoutable. +2 aux jets d'attaque contre les agents du Cercle pour tout l'Acte 4. Mais la vengeance obscurcit le jugement...",
          nextScene: 'scene-4-8-1',
          reputationChange: [{ faction: "Aube d'Argent", amount: 10 }],
        },
        {
          label: "Serment de protection",
          description: "Jurer que plus personne ne mourra en vain. Protéger les vivants avant de punir les coupables.",
          consequence: "Le serment de protection renforce les défenses. +2 aux jets de sauvegarde pour protéger des alliés pour tout l'Acte 4. La sagesse a un prix : la vengeance devra attendre.",
          nextScene: 'scene-4-8-1',
          reputationChange: [{ faction: "Peuple de Sol-Aureus", amount: 15 }],
        },
        {
          label: "Serment de mémoire",
          description: "Jurer de se souvenir. De raconter l'histoire. De ne jamais oublier.",
          consequence: "Le serment de mémoire est le plus subtil mais le plus puissant. Les PJ obtiennent l'inspiration permanente — un dé d'inspiration par session, à utiliser quand ils agissent selon les valeurs du défunt.",
          nextScene: 'scene-4-8-1',
        },
      ],
    },
  ],
  nextScenes: ['scene-4-8-1'],
  previousScene: 'scene-3-7-sacrifice',
};

// ============================================================================
// EXPORT
// ============================================================================

export const ACT_3_EXPANSION_SCENES: BookScene[] = [
  // Chapitre 5
  scene_3_5_dawn_camp,
  scene_3_5_spy,
  scene_3_5_flashback,
  scene_3_5_aftermath_choice,
  // Chapitre 6
  scene_3_6_port_explore,
  scene_3_6_ship_life,
  scene_3_6_island,
  scene_3_6_underwater,
  // Chapitre 7
  scene_3_7_refugees,
  scene_3_7_war_council,
  scene_3_7_last_stand,
  scene_3_7_sacrifice,
  scene_3_7_mourning,
];
