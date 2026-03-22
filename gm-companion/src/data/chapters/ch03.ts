/**
 * CHAPITRE 3 : L'ÎLE DE SOMBRETERRE (Niveau 4-5)
 * 6 scènes — Voyage maritime, enquête sur l'île, suspects multiples
 */
import type { NarrativeScene, NarrativeChapter } from './types';

const CH3_SCENES: NarrativeScene[] = [
  {
    id: 'ch3_s1_ile', chapterId: 'ch3', sceneNumber: 1,
    title: 'Le Port de Brume', type: 'exploration',
    readAloud: `Le message de Malachi, écrit d'une encre qui sentait la cérémonie et le sacrifice, mentionnait l'Île de Sombreterre — un nom que même Lysandra, avec ses archives elfiques millénaires, ne prononçait qu'à mi-voix. Un rocher isolé au large de la côte nord, connu pour son monastère abandonné et ses légendes de fantômes. Seul le port de Brume-sur-Mer offre un passage.

Le village est exactement ce que son nom promet. Un brouillard permanent s'accroche aux maisons de pierre basse comme un linceul humide, étouffant les sons et les couleurs. Les bâtisses — des cubes de granit gris coiffés d'ardoises noires — s'agrippent à la falaise comme des crustacés sur un rocher battu par les vagues. L'air sent le sel, le poisson séché, le goudron de calfatage et cette odeur indéfinissable de misère maritime — un mélange de bois pourri et d'algues en décomposition.

Des filets de pêche pendent aux fenêtres comme des toiles d'araignées géantes. Mais chose inhabituelle en pleine saison : plusieurs bateaux sont tirés au sec sur la grève, leurs coques retournées vers le ciel gris. Personne ne pêche. Les volets sont entrouverts — juste assez pour qu'un œil méfiant vous suive le long de la rue principale, qui n'est qu'un chemin de boue durcie par le sel. Un chat noir détale devant vos pas. Un enfant vous observe depuis un seuil avant d'être tiré à l'intérieur par une main adulte.

Au bout du quai — des planches grises, gonflées d'humidité, qui craquent sous vos bottes — une taverne se dresse comme le dernier bastion de la vie dans ce village fantomatique. Des murs de bois noirci par des décennies d'embruns salins, un toit d'ardoise où pousse de la mousse, et une enseigne en fer forgé rouillé qui grince dans le vent : "L'Ancre Perdue". La lumière chaude d'un feu de cheminée filtre à travers les vitres embuées. C'est le seul endroit qui semble ouvert. Et le seul qui semble vivant.`,
    gmNotes: `Village de Brume-sur-Mer : les pêcheurs ont peur. Trois bateaux qui se sont approchés de l'Île de Sombreterre ces dernières semaines ont subi des avaries inexplicables (coques percées, voiles déchirées par un vent impossible). La tavernière Morna est la seule qui peut les aider — son frère, le Capitaine Dorek, est le seul marin assez courageux (ou assez ivre) pour faire la traversée. Persuasion DC 12 ou un paiement de 200 PO. Morna mentionne aussi qu'un "homme en noir" a pris un bateau il y a sept jours — il est allé vers l'île et n'est pas revenu.`,
    dialogues: [
      {
        npcId: 'npc_morna', npcName: 'Morna la Tavernière',
        lines: [
          { trigger: 'L\'île', text: `*Elle sert de la bière trouble.* Sombreterre ? Personne n'y va. Plus maintenant. *Elle baisse la voix.* Trois bateaux abîmés en deux semaines. Le vieux Kael dit que la mer elle-même refuse qu'on approche. Comme si quelque chose dans l'île repoussait les vivants.`, tone: 'nerveuse' },
          { trigger: 'L\'homme en noir', text: `Il y a sept jours. Grand, maigre, capuche. Il a payé mon frère Dorek trois fois le prix normal pour la traversée. Dorek l'a déposé et... il l'a attendu toute la nuit. Il n'est jamais revenu. Dorek dit que quand il a posé le pied sur le quai, *elle hésite* les mouettes se sont tues. Toutes. En même temps.`, tone: 'effrayée' },
          { trigger: 'Passage', text: `Dorek peut vous emmener. C'est un ivrogne mais c'est le meilleur marin de la côte. Il sera au bar demain matin. *Elle vous regarde.* Vous n'avez pas peur ? Bien. Mais emportez du sel et du fer froid. Les vieilles protections sont parfois les meilleures.`, tone: 'pragmatique' }
        ]
      },
      {
        npcId: 'npc_dorek', npcName: 'Capitaine Dorek',
        lines: [
          { trigger: 'La traversée', text: `*Un homme tanné, la barbe sel et poivre, les yeux rougis par l'alcool et les embruns.* Sombreterre ? Ouais, j'y retourne. Pourquoi pas. La dernière fois, j'ai senti quelque chose de bizarre — la mer était chaude autour de l'île. En plein hiver. *Il vide sa chope.* 200 pièces. Et je vous attends sur le bateau. Si vous n'êtes pas revenus au coucher du soleil, je pars sans vous.`, tone: 'bourru' },
          { trigger: 'Le monastère', text: `Le Monastère de l'Éclipse — c'est comme ça que l'appelaient les moines. Abandonné depuis cinquante ans. Les derniers moines sont partis quand les "voix" ont commencé. Pas des fantômes, non. Des chuchotements qui venaient du sol. De sous le monastère. *Il commande une autre bière.* Les murs sont encore debout. C'est le sous-sol qui m'inquiète.`, tone: 'sinistre' }
        ]
      }
    ],
    objectives: [
      { description: 'Trouver un passage vers l\'Île de Sombreterre', type: 'explore', optional: false },
      { description: 'Négocier avec le Capitaine Dorek', type: 'talk', optional: false },
      { description: 'Recueillir les rumeurs sur l\'île', type: 'talk', optional: true }
    ],
    transitions: [
      { condition: 'Passage négocié', nextScene: 'ch3_s2_traversee', label: '→ Traversée maritime' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 12, success: 'Dorek accepte pour 100 PO au lieu de 200 — vos exploits à Sol-Aureus l\'impressionnent.', failure: 'Dorek maintient son prix : 200 PO, pas un cuivre de moins.' }
    ],
    estimatedMinutes: 10, mood: 'brume-méfiance',
    music: 'Côte battue — vent, mouettes, vagues', location: 'Brume-sur-Mer — L\'Ancre Perdue'
  },
  // Nouvelle scène : Traversée
  {
    id: 'ch3_s2_traversee', chapterId: 'ch3', sceneNumber: 2,
    title: 'La Mer Morte', type: 'exploration',
    readAloud: `Le bateau de Dorek — un sloop de pêche trapu nommé La Veuve Noire — quitte le quai de Brume-sur-Mer dans un clapotis mélancolique. Le vent de nord-est gonfle la voile rapiècée et pousse le navire vers le large. La côte s'éloigne derrière vous, les maisons grises du village disparaissant dans la brume comme des souvenirs qu'on préfère oublier.

La première heure est normale — une mer gris-bleu, de la houle régulière, des mouettes qui suivent le bateau en criant. Dorek barre d'une main, une bouteille dans l'autre. Puis, à mi-chemin, quelque chose change.

C'est d'abord la couleur. L'eau passe du gris-bleu à un gris-vert trouble, puis à un noir d'encre — un noir si profond que la surface de la mer ressemble à un miroir d'obsidienne. La température chute de plusieurs degrés en quelques minutes — votre souffle forme de la buée. Le vent tombe complètement. D'un coup. Comme si quelqu'un avait fermé une porte. Les voiles pendent, mortes, et le bateau n'avance plus que par l'élan acquis, glissant sur une eau étrangement lisse, huileuse, qui ne produit presque aucune vague. Pas de clapotis contre la coque — un silence liquide, contre-nature.

Les mouettes ont disparu. Vous n'avez pas remarqué à quel moment elles sont parties. Mais le ciel au-dessus de vous est vide — pas un oiseau, pas un nuage. Juste un plafond gris, uniforme, comme du plomb fondu.

Dorek pâlit. Sa bouteille pend, oubliée. "C'est nouveau, ça. La dernière fois, l'eau était chaude. Là, elle est... morte." Il crache par-dessus bord. Le crachat ne s'enfonce pas. Il flotte, immobile, à la surface, comme posé sur du verre.

L'Île de Sombreterre apparaît dans la brume — non pas progressivement, mais d'un coup, comme si la brume elle-même était un rideau qu'on avait tiré. Une masse noire et verticale : des falaises de basalte, lisses comme des lames, couronnées par les ruines anguleuses du monastère. Aucun oiseau ne survole l'île. Aucune vague ne se brise sur ses rochers. Le silence est total — total et délibéré, comme si l'île elle-même retenait son souffle.`,
    gmNotes: `Traversée tendue avec un possible combat. Perception DC 14 pour remarquer des formes sous l'eau — des morts-vivants aquatiques qui rôdent mais n'attaquent pas encore. Si les joueurs regardent par-dessus bord, ils voient des visages pâles juste sous la surface — d'anciens marins noyés, animés par la magie du Sceau profané. Ces noyés attaquent au retour (Ch3 fin) si le Sceau n'est pas purifié. Pour l'instant, ils observent seulement. Nature DC 12 : les poissons sont morts — il n'y a AUCUNE vie marine dans cette zone. C'est une mer stérile. Le quai de l'île est en pierre noire, glissant, mais intact. Des marques de griffes sur les pierres.`,
    dialogues: [
      {
        npcId: 'npc_dorek', npcName: 'Capitaine Dorek',
        lines: [
          { trigger: 'Inquiétude', text: `*Il fixe l'eau noire.* En trente ans de mer, j'ai jamais vu ça. L'eau est morte. Pas de courant, pas de houle, pas de vie. *Il crache par-dessus bord et regarde le crachat flotter, immobile.* Même le sel ne se dissout pas normalement. C'est pas naturel.`, tone: 'perturbé' },
          { trigger: 'Le quai', text: `*En accostant.* Le quai est intact — c'est déjà ça. Je vous attends ici. Jusqu'au coucher du soleil. *Il pose la main sur une amulette.* Après... je pars. Avec ou sans vous. C'est pas de la lâcheté — c'est de la survie.`, tone: 'ferme' }
        ]
      }
    ],
    objectives: [
      { description: 'Traverser la mer morte jusqu\'à l\'île', type: 'travel', optional: false },
      { description: 'Observer les anomalies marines', type: 'investigate', optional: true }
    ],
    transitions: [
      { condition: 'Débarquement sur l\'île', nextScene: 'ch3_s3_monastere', label: '→ Le Monastère de l\'Éclipse' }
    ],
    skillChecks: [
      { skill: 'Perception', dc: 14, success: 'Sous la surface de l\'eau noire, des visages pâles vous observent — des morts-vivants aquatiques, immobiles, qui suivent le bateau comme des requins.', failure: 'L\'eau est si sombre que vous ne voyez rien sous la surface.' }
    ],
    estimatedMinutes: 8, mood: 'oppression-maritime',
    music: 'Mer morte — silence, coque qui grince', location: 'Détroit de Sombreterre'
  },
  {
    id: 'ch3_s3_monastere', chapterId: 'ch3', sceneNumber: 3,
    title: 'Le Monastère de l\'Éclipse', type: 'exploration',
    readAloud: `Le Monastère de l'Éclipse surplombe l'île comme une couronne de pierre noire sur un crâne de basalte. Ses murs sont intacts — épais comme des fortifications, construits pour durer mille ans et y parvenant presque. Mais la vie les a désertés. Le lierre mort s'accroche aux fenêtres brisées en guirlandes funèbres, et la grande porte de chêne — autrefois gravée d'un soleil radieux, maintenant noirci par les intempéries — pend sur un seul gond avec un grincement régulier que le vent anime comme un métronome lugubre.

À l'intérieur, le temps s'est arrêté au milieu d'un geste. Des livres de prières sont ouverts sur les lutrins, les pages jaunes par le temps mais encore lisibles — des passages sur la lumière et la protection, soulignés à l'encre rouge. Dans le réfectoire, la vaisselle est posée sur la grande table de chêne comme si les moines s'étaient levés au milieu d'un repas et n'étaient jamais revenus. Des bols de soupe pétrifiée, des cuillères en étain posées à côté. L'air est sec, figé, et sent la poussière millénaire et le parchemin moisi. Chaque surface est recouverte d'un linceul gris — une couche de poussière si épaisse et si uniforme qu'elle ressemble à de la neige sale. Vos pas laissent des empreintes dans ce tapis de silence.

Mais il y a d'autres empreintes. Récentes. Des bottes à semelles fines — pas des moines, pas des marins. Quelqu'un est venu ici avant vous. Récemment.

Au fond du réfectoire, derrière une porte à demi cachée par un rayonnage effondré, un escalier en spirale s'enfonce dans l'obscurité. Ses marches de pierre sont usées en leur centre par des siècles de pas monastiques. Et d'en bas — des profondeurs de la roche même — monte un bourdonnement grave, continu, qui fait vibrer la pierre sous vos pieds et trembler la flamme de vos torches. Ce n'est pas un son naturel. C'est le battement d'un cœur malade, enterré sous une montagne de silence.`,
    gmNotes: `Exploration du monastère : plusieurs indices. 1) Le journal du Père Abbot Silas (Investigation DC 11) raconte la descente progressive dans la folie — les moines entendaient des voix la nuit, puis voyaient des ombres, puis les plus faibles d'esprit ont commencé à marcher vers le sous-sol dans un état somnambulique. 2) Un mur effondré révèle une alcôve secrète avec des symboles identiques à ceux trouvés dans les égouts (Perception DC 14). 3) La cuisine contient un cadavre frais — le cultiste envoyé par Malachi (l'homme en noir du récit de Morna). Il est mort d'épuisement magique, sa main crispée sur un parchemin inachevé adressé à Malachi. C'est un rapport sur un "troisième suspect" — un traître dans l'Alliance des Sept dont l'identité est effacée. Cet indice plante une graine pour l'arc narratif global.`,
    dialogues: [],
    objectives: [
      { description: 'Explorer le monastère abandonné', type: 'explore', optional: false },
      { description: 'Trouver le journal du Père Silas', type: 'investigate', optional: false },
      { description: 'Examiner le cadavre du cultiste et son rapport inachevé', type: 'investigate', optional: false },
      { description: 'Localiser l\'entrée du sous-sol', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Descente dans le sous-sol', nextScene: 'ch3_s4_sous_sol', label: '→ Les catacombes sous le monastère' }
    ],
    skillChecks: [
      { skill: 'Investigation', dc: 11, success: 'Le journal du Père Silas décrit en détail la progression de la corruption : voix, ombres, somnambulisme, folie.', failure: 'Les livres sont illisibles — le temps et l\'humidité ont effacé la plupart du texte.' },
      { skill: 'Perception', dc: 14, success: 'Derrière un mur partiellement effondré, une alcôve secrète contient des symboles de Sceau et un petit autel profané.', failure: 'Les murs semblent normaux, bien que vieux et fissurés.' },
      { skill: 'Médecine', dc: 12, success: 'Le cultiste est mort d\'épuisement magique — il a lancé trop de sorts en trop peu de temps. Son corps est littéralement vidé de vie.', failure: 'Le corps est froid et rigide. La cause de la mort n\'est pas évidente.' }
    ],
    loot: ['Journal du Père Silas', 'Rapport inachevé du cultiste (indice : traître dans l\'Alliance)', 'Clé des catacombes'],
    estimatedMinutes: 15, mood: 'horreur-exploration',
    music: 'Monastère — silence pesant, craquements, vent dans les couloirs', location: 'Île de Sombreterre — Monastère de l\'Éclipse'
  },
  {
    id: 'ch3_s4_sous_sol', chapterId: 'ch3', sceneNumber: 4,
    title: 'Les Catacombes Oubliées', type: 'combat',
    readAloud: `L'escalier en spirale s'enfonce dans la roche vivante de l'île — une descète de cent marches qui semble durer une éternité. Les murs passent de la pierre taillée du monastère à la roche brute, noire, veineuse, qui suinte une humidité glaciale. L'air est de plus en plus froid à chaque marche — pas un froid d'hiver, un froid de tombe, de terre profonde, de lieu où le soleil n'a jamais pénétré. L'odeur est celle des os secs et de la terre ancienne, mêlée à une note doucâtre, écœurante, qui colle à la gorge.

Des niches creusées dans les parois à intervalles réguliers contiennent des cercueils de pierre — des sarcophages de granit gravés de prières aux défunts. Chaque couvercle est ouvert. Chaque cercueil est vide. La poussière d'os sur les rebords témoigne d'une désertion récente — les morts sont partis. Les morts marchent.

Le bourdonnement est une présence physique ici. Il ne vibre plus seulement dans vos dents mais dans vos os, dans votre poitrine, dans la base de votre crâne. Il fait trembler la flamme de vos torches en un staccato nerveux. Et il porte avec lui des murmures — des fragments de prières inversées, des mots sacrés prononcés à l'ENVERS, qui rampent dans vos oreilles comme des insectes.

Au bout du corridor, la catacombe s'ouvre en une salle circulaire, vaste, haute de plafond, dont les murs sont couverts de fresques pâlies représentant des scènes de prière et de bénédiction. Le Sceau de Sombreterre — gravé à même le sol de la caverne en un cercle d'entrelacs complexes — irradie une lumière bleutée malade, vacillante, comme une chandelle sur le point de mourir.

Et autour du Sceau, les cercueils vides ont retrouvé leurs occupants. Une douzaine de squelettes de moines se tiennent debout en cercle autour de la lumière mourante. Immobiles. Silencieux. Leurs robes de bure sont en lambeaux, leurs os jaunes et fissurés. Mais leurs mâchoires sont ouvertes — grand ouvertes — dans un cri silencieux éternel, un hurlement figé dans la mort qui ne sort jamais.

Au centre du cercle, au-dessus du Sceau, une forme flotte dans l'air. Un spectre. Translucide, luminescent d'une lueur bleuâtre, portant encore les vestiges d'une robe d'abbé et d'un crucifix de prière. Le Père Silas. Ses yeux sont deux puits de ténèbres absolues — pas d'iris, pas de blanc, juste le noir, le vide, le néant. Et quand son regard tombe sur vous, vous sentez le froid vous transpercer jusqu'aux os.`,
    gmNotes: `COMBAT : Spectre du Père Silas (CR 3, mais résistance aux armes non-magiques) + 8 Squelettes (CR 1/4). Le Spectre est piégé — il n'est pas hostile par nature mais la corruption du Sceau l'a rendu fou. Si les joueurs tentent Religion DC 15 ou Persuasion DC 16, ils peuvent apaiser le spectre temporairement et apprendre que le Sceau a été saboté "par un des Sept — un traître parmi les héros fondateurs". C'est un indice majeur. Combat classique sinon. Après le combat, même logique que Ch2 : purifier le Sceau (Religion DC 13 ou retirer les composants du rituel de sabotage). Le Sceau est sauvé mais fissuré.`,
    dialogues: [
      {
        npcId: 'npc_spectre_silas', npcName: 'Spectre du Père Silas',
        lines: [
          { trigger: 'Apaisé', text: `*Sa voix résonne comme un écho dans une cathédrale.* Vous... n'êtes pas les ombres. Je... me souviens. J'étais gardien. Le Sceau était ma charge. Et puis... il est venu. Un des Sept. Un HÉROS. Et il a trahi. *L'image vacille.* Le traître... portait le Sceau du... *L'image se dissipe dans un hurlement.*`, tone: 'désespéré' },
          { trigger: 'Hostile', text: `*Un hurlement glacial.* PERSONNE NE TOUCHE AU SCEAU ! JE SUIS SON GARDIEN ! MON ÂME Y EST LIÉE ! *Des tentacules d'ombre jaillissent.* PARTEZ OU MOUREZ AVEC MOI !`, tone: 'fureur' }
        ]
      }
    ],
    objectives: [
      { description: 'Descendre dans les catacombes', type: 'explore', optional: false },
      { description: 'Vaincre ou apaiser le Spectre du Père Silas', type: 'combat', optional: false },
      { description: 'Purifier le Sceau de Sombreterre', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Sceau stabilisé', nextScene: 'ch3_s5_revelation', label: '→ Révélation et retour' }
    ],
    encounters: ['Spectre du Père Silas (CR 3)', '8x Squelette (CR 1/4)'],
    skillChecks: [
      { skill: 'Religion', dc: 15, success: 'Vous apaisez le spectre avec une prière ancienne — il vous parle du traître avant de disparaître.', failure: 'Le spectre ne répond qu\'à la violence.' },
      { skill: 'Religion', dc: 13, success: 'Le rituel de purification stabilise le Sceau — la lumière bleue redevient dorée.', failure: 'La purification échoue — il faudra retirer physiquement les composants du sabotage.' }
    ],
    loot: ['Fragment de Sceau #2', 'Amulette du Père Silas (Protection contre les morts-vivants, 1/jour)'],
    estimatedMinutes: 25, mood: 'combat-sacré',
    music: 'Catacombes — chœurs fantomatiques, percussion rituelle', location: 'Île de Sombreterre — Catacombes'
  },
  // Nouvelle scène : Révélation
  {
    id: 'ch3_s5_revelation', chapterId: 'ch3', sceneNumber: 5,
    title: 'Le Traître de l\'Alliance', type: 'dialogue',
    readAloud: `Le Sceau pulse faiblement dans la lumière revenue — une pulsation dorée, fragile, comme le battement d'un cœur qui a failli s'arrêter mais refuse de mourir. Les mots du spectre résonnent encore dans le silence des catacombes, comme un écho qui refuse de s'éteindre : "Un des Sept. Un traître."

En remontant l'escalier en spirale — chaque marche vous rapprochant de l'air libre comme une résurrection lente — vous passez devant l'alcôve secrète du monastère. Un détail, cette fois, arrête votre regard. Sur le mur du fond, derrière les symboles de Sceau que vous aviez déjà remarqués, une fresque à moitié effacée par le temps et l'humidité couvre toute la paroi.

Elle représente les Sept Héros de l'Alliance. Sept figures disséminées en cercle — un humain en armure, un nain portant un marteau, une elfe enchâssée de lumière, un halfling tenant un livre, un demi-orc couvert de runes, une gnome entourée de flammes, et une septième figure. Les six premières sont peintes avec dévotion, leurs visages détaillés, leurs expressions héroïques et résolues. Les mains levées, unies, scellant l'Ombre.

Mais la septième figure. Son visage a été gratté. Effacé avec acharnement — pas par l'érosion du temps, mais par des ongles, par une lame, par une main déterminée à détruire cette image. Il ne reste que les vêtements — une robe sombre — et un détail intouche : une broche épinglée sur la poitrine. Une broche en forme de miroir. Un miroir brisé.

Lysandra s'approche de la fresque. Sa main se lève vers la broche du miroir, puis se fige dans l'air, comme si toucher l'image pouvait la brûler. Son visage pâlit au-delà de pâleur elfique — un blanc de cendre, de choc.

"Le symbole du culte," murmure-t-elle. "Le Miroir Brisé. C'est... c'est le symbole d'un des Sept." Elle se tourne vers vous. Ses yeux sont immenses, humides, comme ceux de quelqu'un dont le monde vient de basculer sur son axe. "Le culte de Malachi ne cherche pas seulement à briser les Sceaux. Il vénère un des héros fondateurs. Un héros qui a trahi."`,
    gmNotes: `Révélation narrative majeure : le culte du Miroir Brisé trouve son origine dans la trahison d'un des Sept Héros qui ont posé les Sceaux. L'identité complète du traître n'est pas encore révélée — elle sera dévoilée progressivement. Pour l'instant, les joueurs savent que le symbole du culte est celui d'un des Sept. Cette information sera cruciale pour convaincre des alliés sceptiques dans les chapitres suivants. Lysandra est choquée — dans la culture elfique, les Sept Héros sont des figures sacrées. Qu'un d'entre eux soit un traître est impensable.`,
    dialogues: [
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Choc', text: `Ce n'est pas possible. Les Sept Héros sont des légendes. Des saints. Mon peuple raconte leurs histoires aux enfants pour leur apprendre le courage et le sacrifice. *Elle fixe la fresque.* Et l'un d'eux était... corrompu depuis le début ?`, tone: 'choquée-incrédule' },
          { trigger: 'Implications', text: `*Elle réfléchit.* Si un des Sept a trahi... il connaît les faiblesses de chaque Sceau. Il sait exactement comment les briser. Les outils, les rituels, les emplacements. *Ses yeux s'écarquillent.* Malachi ne cherche pas à tâtons — il suit un PLAN. Un plan vieux de 120 ans.`, tone: 'réalisation-horrifiée' }
        ]
      }
    ],
    objectives: [
      { description: 'Découvrir la fresque des Sept et le symbole du traître', type: 'investigate', optional: false },
      { description: 'Comprendre les implications avec Lysandra', type: 'talk', optional: false }
    ],
    transitions: [
      { condition: 'Retour au bateau', nextScene: 'ch3_s6_retour', label: '→ Retour mouvementé' }
    ],
    estimatedMinutes: 8, mood: 'révélation-choc',
    music: 'Mystère — cordes tendues, révélation', location: 'Île de Sombreterre — Monastère, Alcôve secrète'
  },
  {
    id: 'ch3_s6_retour', chapterId: 'ch3', sceneNumber: 6,
    title: 'La Fuite de Sombreterre', type: 'combat',
    readAloud: `Le soleil descend derrière le rideau de brume comme une pièce d'or qu'on laisse tomber dans l'eau trouble. La lumière prend une teinte orange sale, cuivrée, qui ne réchauffe rien. Vous dévalez le sentier de basalte vers le quai où La Veuve Noire attend, ses amarres tendues par le courant. Dorek est sur le pont, nerveux, les yeux rivés sur la mer noire. Son coutelas est déjà tiré.

"Montez ! Vite ! La mer est en train de..."

Il n'a pas le temps de finir sa phrase. L'eau noire autour du quai commence à bouger. Pas des vagues — des mouvements. Verticaux. Comme si quelque chose remontait du fond. D'abord des bulles d'un gaz nauséabond qui crèvent à la surface avec un bruit mouillé. Puis des mains. Des mains pâles et gonflées, aux doigts écartés, aux ongles noirs, qui percent la surface de l'eau comme des plantes qui germent dans un cauchemar. Des visages suivent — des visages de noyés, les yeux ouverts et blancs, la peau grise boursoufflée, la bouche ouverte sur de l'eau noire qui ne cesse de couler.

Les marins perdus. Les moines disparus. Les morts de l'île. Ils remontent des profondeurs par dizaines, s'accrochant au quai avec des mains que la mort n'a pas raidi, aux amarres avec des doigts qui ne tremblent plus, à la coque du bateau avec des ongles qui crissent sur le bois comme des clous sur une ardoise.

Dorek tire son coutelas d'un geste qui a la précision de trente ans de mer. Son visage est un masque de terreur contenue. "Je SAVAIS que cette île finirait par me tuer ! Montez à bord et DÉFENDEZ le bateau pendant que je largue les amarres ! VITE !"`,
    gmNotes: `Combat de retraite : les joueurs doivent embarquer et défendre le bateau pendant que Dorek manœuvre pour partir. 8 Zombies Aquatiques (CR 1/4) qui grimpent à bord chaque round (2 par round). Les joueurs ont 4 rounds pour nettoyer le pont et couper les amarres. Si le combat dure plus de 4 rounds, un Zombie Ogre Aquatique (CR 2) émerge. Dorek peut aider (il attaque avec avantage depuis son bateau) mais il prend des dégâts. Si Dorek tombe à 0 PV, un joueur doit manœuvrer le bateau (Véhicules Aquatiques DC 12). C'est une scène d'action intense pour finir le chapitre sur un moment palpitant.`,
    dialogues: [],
    objectives: [
      { description: 'Embarquer sur le bateau', type: 'explore', optional: false },
      { description: 'Défendre le bateau contre les morts-vivants', type: 'combat', optional: false },
      { description: 'S\'échapper de Sombreterre', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Évasion réussie — FIN DU CHAPITRE 3', nextScene: 'ch4_s1_hammerdeep', label: '→ Ch.4 : Les Forges d\'Hammerdeep' }
    ],
    encounters: ['8x Zombie Aquatique (CR 1/4)', '1x Zombie Ogre Aquatique (CR 2 — optionnel)'],
    loot: ['Fragment de Sceau #2 (confirmé)', '250 PO (trésor du monastère)', 'Respect du Capitaine Dorek (allié futur)'],
    estimatedMinutes: 20, mood: 'fuite-panique',
    music: 'Urgence maritime — tambours, vagues, cris', location: 'Île de Sombreterre — Quai'
  }
];

// ── Stat Blocks ──────────────────────────────────────────────────────
const CH3_STAT_BLOCKS: Record<string, import('./types').StatBlock> = {
  spectre_silas: {
    name: 'Spectre du Père Silas', cr: '3', ac: 12, hp: 45,
    speed: '0 ft., vol 50 ft. (vol stationnaire)',
    abilities: { str: 1, dex: 14, con: 11, int: 10, wis: 10, cha: 17 },
    attacks: [
      { name: 'Drain de vie', bonus: '+5', damage: '3d6 nécrotique', notes: 'La cible doit réussir un JDS Constitution DC 13 ou voir son max PV réduit du montant des dégâts.' },
      { name: 'Cri spectral (recharge 5-6)', bonus: '', damage: '2d8 psychique', notes: 'Cône de 30 pieds, JDS Sagesse DC 13 ou effrayé pour 1 minute.' }
    ],
    specialAbilities: [
      'Incorporel : peut traverser créatures et objets solides. Subit 1d10 force si termine son tour dans un objet.',
      'Résistance aux dégâts : acide, feu, foudre, tonnerre ; contondant, perforant, tranchant d\'armes non-magiques.',
      'Immunité aux dégâts : froid, nécrotique, poison.',
      'Vulnérabilité : dégâts radiants (dégâts doublés).',
      'Sensibilité à la lumière du soleil : désavantage aux jets d\'attaque et de Perception (vue) en lumière directe.'
    ],
    weakness: 'Radiant — un symbole sacré présenté avec Religion DC 13 le repousse de 30 pieds pour 1 round.'
  },
  zombie_aquatique: {
    name: 'Zombie Aquatique', cr: '1/4', ac: 8, hp: 22,
    speed: '20 ft., nage 30 ft.',
    abilities: { str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5 },
    attacks: [
      { name: 'Coup', bonus: '+3', damage: '1d6+1 contondant', notes: '' },
      { name: 'Étreinte noyante', bonus: '+3', damage: '1d4+1 contondant', notes: 'Cible agrippée (évasion DC 11). Au début de chaque tour de la cible agrippée : 1d4 dégâts de suffocation.' }
    ],
    specialAbilities: [
      'Résilience de zombie : quand réduit à 0 PV, JDS Constitution DC 5 + dégâts reçus. Réussite : tombe à 1 PV. Ne fonctionne pas contre dégâts radiants ou coups critiques.',
      'Amphibie : respire air et eau.',
      'Peau gorgée d\'eau : vulnérable au froid (les dégâts de froid le gèlent, vitesse réduite à 0 pendant 1 round).'
    ],
    weakness: 'Froid et radiant. Les zombies aquatiques gèlent en cas de dégâts de froid.'
  },
  zombie_ogre_aquatique: {
    name: 'Zombie Ogre Aquatique', cr: '2', ac: 8, hp: 59,
    speed: '30 ft., nage 30 ft.',
    abilities: { str: 19, dex: 6, con: 18, int: 3, wis: 6, cha: 5 },
    attacks: [
      { name: 'Écrasement', bonus: '+6', damage: '2d8+4 contondant', notes: '' },
      { name: 'Vague de boue (recharge 5-6)', bonus: '', damage: '2d6 contondant', notes: 'Ligne de 15 pieds, JDS Dextérité DC 14 ou renversé à terre.' }
    ],
    specialAbilities: [
      'Résilience de zombie : JDS Con DC 5 + dégâts pour rester à 1 PV.',
      'Amphibie.',
      'Puanteur abyssale : toute créature qui commence son tour à 5 pieds doit réussir un JDS Con DC 12 ou être empoisonnée jusqu\'au début de son prochain tour.'
    ],
    weakness: 'Froid et radiant. Lent et prévisible — les joueurs agiles peuvent l\'esquiver.'
  }
};

// ── Room Descriptions ────────────────────────────────────────────────
const CH3_ROOMS: import('./types').RoomDescription[] = [
  {
    id: 'brume_ancre_perdue', name: 'L\'Ancre Perdue',
    readAloud: 'Taverne humide de Brume-sur-Mer. Murs de bois noirci, lanternes à huile de baleine, sol couvert de sciure et de sel. Odeur de poisson et de bière rance. Un comptoir de chêne massif, des tables basses, un feu de tourbe dans l\'âtre.',
    gmNotes: 'Comptoir : Morna cache une arbalète dessous. Carte marine au mur montre l\'île de Sombreterre avec une croix rouge. Chambres à l\'étage : 2 PO la nuit. Sous le plancher de la cave : cache de contrebande (100 PO en marchandises, Perception DC 16).',
    exits: [{ direction: 'Sud', targetRoomId: 'quai_brume', description: 'Porte battante vers le quai' }],
    dimensions: '12m × 8m', lighting: 'faible'
  },
  {
    id: 'monastere_refectoire', name: 'Réfectoire du Monastère',
    readAloud: 'Grande salle voûtée aux murs de pierre grise. Table commune en chêne noirci pour 40 moines. Vaisselle intacte sous la poussière — bols, cuillères, cruches de vin pétrifiées. Lutrin avec un livre de prières ouvert. Fresques murales pâlies montrant les Sept Héros.',
    gmNotes: 'Chandelier géant (fer forgé, 20 bougies). Nourriture pétrifiée sur la table. Alcôve secrète derrière un panneau de bois pourri (Perception DC 14) — symboles du Sceau et petit autel profané.',
    exits: [
      { direction: 'Nord-Est', targetRoomId: 'catacombes', description: 'Escalier en spirale vers les catacombes' },
      { direction: 'Ouest', targetRoomId: 'chapelle', description: 'Couloir vers la chapelle' }
    ],
    dimensions: '15m × 10m', lighting: 'aucun'
  },
  {
    id: 'catacombes', name: 'Catacombes de Sombreterre',
    readAloud: 'Salle circulaire creusée dans la roche volcanique. 12 niches dans les murs contiennent des cercueils de pierre ouverts. Le plafond est bas, l\'air glacial. Au centre, un cercle de runes pulsant d\'une lumière bleue maladive — le Sceau de Sombreterre.',
    gmNotes: 'Sceau au sol (4 m diamètre, gravé dans le basalte). Pilier central avec des chaînes rouillées. Flaques d\'eau noire stagnante. Sous une dalle : coffret scellé avec les derniers écrits du Père Silas (Investigation DC 13) — le saboteur utilisait un "outil en forme de miroir".',
    exits: [{ direction: 'Haut', targetRoomId: 'monastere_refectoire', description: 'Escalier en spirale vers le réfectoire' }],
    dimensions: '10m diamètre', lighting: 'magique',
    creatures: ['8× Squelettes de moines', 'Spectre du Père Silas (apparaît après purification)']
  }
];

// ── Side Quests ──────────────────────────────────────────────────────
const CH3_SIDE_QUESTS: import('./types').SideQuest[] = [
  {
    id: 'sq_marins_disparus',
    title: 'Les Marins Disparus',
    description: 'Trois pêcheurs de Brume-sur-Mer ont disparu en approchant de l\'île. Leurs familles supplient les aventuriers de les retrouver — vivants ou morts.',
    giver: 'Vieille Agatha (mère du marin Kael)',
    reward: '150 PO + Filet enchanté de Kael (avantage pour capturer créatures aquatiques taille M)',
    objectives: [
      'Parler à Agatha au bout du quai de Brume-sur-Mer',
      'Chercher les bateaux échoués sur la côte est (Survie DC 12)',
      'Trouver les corps dans une grotte sous-marine (Athlétisme DC 13) — transformés en zombies aquatiques',
      'Purifier ou détruire les corps, rapporter les effets personnels aux familles'
    ],
    consequenceIfIgnored: 'Agatha maudit les aventuriers (malus de -1 aux JDS Sagesse dans la région pendant 24h — superstition locale).',
    estimatedMinutes: 45,
    difficulty: 'moyen'
  },
  {
    id: 'sq_grimoire_silas',
    title: 'Le Grimoire du Père Silas',
    description: 'Le journal du Père Silas mentionne un grimoire caché qu\'il a protégé pour "le jour où des héros viendraient". Rituels de protection contre les morts-vivants.',
    giver: 'Indice dans le journal du Père Silas (Investigation DC 14)',
    reward: 'Grimoire de Protection Monastique (1/jour : cercle de protection 10 pieds, morts-vivants Sagesse DC 14 pour entrer)',
    objectives: [
      'Trouver l\'indice dans le journal de Silas',
      'Comprendre que ça désigne la chapelle du monastère (Investigation DC 12)',
      'Fouiller sous l\'autel de la chapelle (Force DC 10)',
      'Récupérer le grimoire (piège de glyphe : Perception DC 13, Arcanes DC 12, sinon 2d6 radieux)'
    ],
    consequenceIfIgnored: 'Le grimoire reste perdu. Pas de cercle de protection pour les chapitres suivants.',
    estimatedMinutes: 30,
    difficulty: 'moyen'
  }
];

// ── Random Encounter Table ───────────────────────────────────────────
const CH3_RANDOM_ENCOUNTERS: import('./types').RandomEncounter[] = [
  { d20Range: '1-4', description: 'Brouillard Vivant — brume épaisse pendant 10 min. Perception DC 12 ou perte de 30 minutes.', difficulty: 'facile', loot: ['Aucun'] },
  { d20Range: '5-8', description: 'Crabes Géants (2) — CR 1/4. Défendent un nid sur le rivage. Agressifs si on approche à 10 pieds.', difficulty: 'facile', creatures: ['Crabe Géant', 'Crabe Géant'], loot: ['Carapace de crabe géant (50 PO, composant alchimique)'] },
  { d20Range: '9-12', description: 'Murmures des Moines — chants spectraux. Sagesse DC 13 ou charmé (marche vers les catacombes 1 round).', difficulty: 'moyen', loot: ['Aucun (mais indique la direction des catacombes)'] },
  { d20Range: '13-16', description: 'Squelettes Errants (3) — CR 1/4. Patrouillent les couloirs. Ignorent ceux portant un symbole sacré.', difficulty: 'moyen', creatures: ['Squelette', 'Squelette', 'Squelette'], loot: ['Sainte relique rouillée (10 PO)', 'Clé de cellule monastique'] },
  { d20Range: '17-20', description: 'Ombre Errante (1) — CR 1/2. Moine piégé entre les mondes. Persuasion DC 14 = passage secret vers les catacombes.', difficulty: 'difficile', creatures: ['Ombre'], loot: ['Médaillon du moine (+1 JDS contre la Peur, repos long)'] }
];

export const CHAPTER_3: NarrativeChapter = {
  id: 'ch3', number: 3, title: 'L\'Île de Sombreterre',
  subtitle: 'Monastère hanté et révélation du traître',
  summary: 'Voyage vers l\'Île de Sombreterre pour purifier un Sceau dans les catacombes d\'un monastère abandonné. Révélation : le culte est lié à un traître parmi les Sept Héros.',
  suggestedLevel: 4, region: 'Brume-sur-Mer → Île de Sombreterre',
  themes: ['Horreur', 'Mystère', 'Révélation', 'Morts-vivants'],
  scenes: CH3_SCENES, previousChapter: 'ch2', nextChapter: 'ch4',
  sideQuests: CH3_SIDE_QUESTS,
  randomEncounters: CH3_RANDOM_ENCOUNTERS,
  statBlocks: CH3_STAT_BLOCKS,
  roomDescriptions: CH3_ROOMS
};
