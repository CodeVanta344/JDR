/**
 * GUIDE NARRATIF — ACTE III : LES OMBRES GRANDISSENT
 * Chapitres 5-7 (Niveaux 8-12)
 * L'acte le plus sombre de la campagne.
 */

import type { NarrativeScene } from './narrative-guide-data';

// ============================================================================
// CHAPITRE 5 : LA TRAHISON DE L'AUBE (Niveau 8-9)
// Sylve d'Émeraude — Arbre-Monde corrompu — Seraphina traîtresse
// ============================================================================

const CH5_SCENES: NarrativeScene[] = [
  {
    id: 'ch5_s1_convocation_emeraude',
    chapterId: 'ch5',
    sceneNumber: 1,
    title: 'L\'Appel de la Sylve',
    type: 'narration',
    readAloud: `Un messager elfique vous trouve à l'aube — un faucon de cristal vivant dont les ailes tintent comme du verre brisé. Il se pose sur votre épaule et une voix résonne dans votre crâne, ancienne et tremblante : "Les racines saignent. L'Arbre pleure. Venez. Vite."

Le voyage vers la Sylve d'Émeraude prend quatre jours, et chaque jour la forêt change. Les premiers arbres que vous croisez sont normaux — chênes massifs, bouleaux argentés. Mais au troisième jour, les troncs se tordent comme des membres brisés. L'écorce suinte une sève noire qui sent le cuivre et la cendre. Des oiseaux morts jonchent le sentier, leurs plumes blanchies comme vidées de couleur.

Au quatrième jour, le silence est total. Pas d'insectes. Pas de vent. Même vos pas semblent étouffés, comme si la forêt elle-même retenait son souffle. Et dans ce silence, un battement sourd — régulier, profond, venant du sol sous vos pieds. Comme un coeur malade qui refuse de s'arrêter.

L'Archon Seraphina vous attend à l'orée de la clairière sacrée. Son armure blanche et or brille encore, mais son visage est tiré, cerné. Elle vous accueille avec un sourire qui ne monte pas jusqu'à ses yeux.`,
    gmNotes: `COACHING ÉMOTIONNEL : C'est le début de l'acte le plus sombre. Le ton doit passer du héroïque au sinistre progressivement. Les joueurs ont connu Seraphina comme alliée fidèle — exploitez cette confiance.

Seraphina joue son rôle à la perfection. Elle est véritablement une agente du Cercle des Cendres depuis le début, mais sa couverture est impeccable. Tout ce qu'elle dit dans cette scène est vrai sauf son inquiétude : elle a elle-même orchestré la corruption de l'Arbre-Monde en y injectant de l'essence d'ombre via les racines souterraines.

SIGNES SUBTILS pour les joueurs attentifs :
- Jet de Perspicacité DC 20 : "Quelque chose dans le sourire de Seraphina ne colle pas — comme un masque parfaitement ajusté."
- Jet de Perception DC 18 : "L'armure de Seraphina a une nouvelle rune gravée à l'intérieur du poignet — vous ne l'aviez jamais remarquée."
- Si un joueur a Détection du Mal : Seraphina est protégée par un Amulette d'Alignement Masqué (objet rare du Cercle).

Ne révélez RIEN encore. Laissez les joueurs douter mais pas confirmer. La trahison doit frapper comme la foudre en scène 4.`,
    dialogues: [
      {
        npcId: 'npc_seraphina',
        npcName: 'Archon Seraphina Lumière-Céleste',
        lines: [
          { trigger: 'Accueil', text: `*Elle serre vos mains, et les siennes tremblent — ou semblent trembler.* Vous êtes venus. Grâce à la Lumière. L'Arbre-Monde est malade et les druides sont impuissants. Quelque chose le dévore de l'intérieur.`, tone: 'inquiet — mais joué' },
          { trigger: 'La corruption', text: `Cela a commencé il y a trois semaines. Une racine noircie. Puis deux. Maintenant, un quart de l'Arbre est touché. La sève noire empoisonne la forêt sur des kilomètres. Les elfes parlent d'une malédiction — mais moi, je pense que c'est lié aux Sceaux. Le Sceau de la Nature est quelque part sous l'Arbre.`, tone: 'grave' },
          { trigger: 'Plan', text: `Le Grand Druide Thalion pense qu'il faut descendre dans le réseau racinaire pour trouver la source de la corruption. Les tunnels sous l'Arbre sont immenses — certains ont cinq mètres de diamètre. Je vous accompagnerai. *Sa main se pose sur son symbole sacré.* Ma lumière nous protégera.`, tone: 'déterminé' },
          { trigger: 'Les elfes', text: `*Baisse la voix.* Les elfes sont... sur la défensive. Ils blâment les "peuples courts" pour cette corruption. Le Sage Elendil est le seul qui accepte notre aide. Les autres nous tolèrent à peine. Soyez diplomatiques.`, tone: 'prudent' }
        ]
      }
    ],
    objectives: [
      { description: 'Atteindre la Sylve d\'Émeraude et observer les signes de corruption', type: 'explore', optional: false },
      { description: 'Rencontrer Seraphina et comprendre la situation', type: 'talk', optional: false },
      { description: 'Remarquer les signes subtils de la duplicité de Seraphina', type: 'investigate', optional: true }
    ],
    transitions: [
      { condition: 'Les joueurs acceptent d\'aider', nextScene: 'ch5_s2_clairiere_sacree', label: '-> Clairière de l\'Arbre-Monde' },
      { condition: 'Les joueurs veulent d\'abord parler aux elfes', nextScene: 'ch5_s1b_conseil_elfique', label: '-> Conseil elfique (optionnel)' }
    ],
    skillChecks: [
      { skill: 'Perspicacité', dc: 20, success: 'Quelque chose dans le comportement de Seraphina sonne faux — un sourire trop travaillé, des mots trop parfaits. Comme une actrice qui joue un rôle depuis trop longtemps.', failure: 'Seraphina semble sincèrement inquiète. Sa dévotion est rassurante dans cette forêt malade.' },
      { skill: 'Nature', dc: 14, success: 'Cette corruption n\'est pas naturelle, ni même magique au sens classique. C\'est de l\'essence d\'ombre pure — la même substance que les Démons d\'Ombre. Quelqu\'un l\'a introduite volontairement.', failure: 'La corruption semble magique, d\'origine inconnue.' },
      { skill: 'Perception', dc: 18, success: 'Vous remarquez une rune gravée à l\'intérieur du poignet de l\'armure de Seraphina — un symbole que vous ne reconnaissez pas, mais qui vous met mal à l\'aise.', failure: 'Rien de particulier ne retient votre attention.' }
    ],
    estimatedMinutes: 20,
    mood: 'sinistre — malaise croissant',
    music: 'Forêt corrompue — cordes dissonantes, craquements de bois, silence oppressant',
    location: 'Sylve d\'Émeraude — Orée de la Clairière Sacrée'
  },
  {
    id: 'ch5_s1b_conseil_elfique',
    chapterId: 'ch5',
    sceneNumber: 1.5,
    title: 'Le Conseil des Feuilles Tombées',
    type: 'dialogue',
    readAloud: `La salle du conseil elfique est une cavité naturelle dans le tronc d'un chêne millénaire. Des racines forment des sièges vivants. La lumière filtre par des ouvertures dans l'écorce, projetant des motifs mouvants sur les murs de bois poli. L'air sent la résine et... quelque chose d'amer. De malade.

Cinq Anciens sont assis en demi-cercle. Leurs visages sont des masques de pierre. Seul le Sage Elendil, au centre, montre un semblant de chaleur — et encore, c'est la chaleur d'un feu mourant. Les autres vous regardent comme on regarde une maladie qui franchit le seuil.

"Vous venez de Sol-Aureus," dit l'Ancienne Lyriel d'une voix qui coupe comme du givre. "Votre ville empeste le fer et l'ambition. Et maintenant notre Arbre meurt. Coïncidence ?"`,
    gmNotes: `Les elfes sont hostiles mais pas irrationnels. L'Ancienne Lyriel est la plus agressive — elle croit sincèrement que la corruption vient des humains. Le Sage Elendil tempère. Le Gardien Faenor est silencieux mais observe les joueurs avec attention.

Si les joueurs sont diplomatiques et réussissent les jets, ils obtiennent une information cruciale de Faenor : il a vu Seraphina seule dans les tunnels racinaires il y a deux semaines, la nuit. Il n'a rien dit car elle est une Archon de l'Aube d'Argent, mais cela le trouble.

Ce détail est l'un des fils que les joueurs peuvent tirer pour deviner la trahison.`,
    dialogues: [
      {
        npcId: 'npc_elendil',
        npcName: 'Sage Elendil',
        lines: [
          { trigger: 'Médiation', text: `*Il lève une main.* Assez, Lyriel. Ces aventuriers ont combattu l'Ombre quand nos propres guerriers hésitaient. Nous avons besoin d'alliés, pas d'ennemis. *Il se tourne vers vous.* Pardonnez-nous. La peur rend amer. L'Arbre est notre coeur. Quand il souffre, nous souffrons.`, tone: 'las mais bienveillant' },
          { trigger: 'L\'Arbre', text: `L'Arbre-Monde Yggdrasil est connecté à chaque être vivant de la Sylve. Sa corruption ne se propage pas seulement dans le bois — elle se propage dans les esprits. Les animaux deviennent agressifs, les fées disparaissent, et certains de nos jeunes druides font des cauchemars si terribles qu'ils refusent de dormir.`, tone: 'grave' }
        ]
      },
      {
        npcId: 'npc_lyriel',
        npcName: 'Ancienne Lyriel',
        lines: [
          { trigger: 'Hostilité', text: `*Ses yeux de jade vous transpercent.* Votre Aube d'Argent. Vos chevaliers en armure brillante. Ils sont venus "protéger" la Sylve il y a un mois. Et un mois plus tard, notre Arbre meurt. Expliquez-moi cela.`, tone: 'accusateur' },
          { trigger: 'Si apaisée', text: `*Long silence.* Je ne vous fais pas confiance. Mais Elendil a raison — nous sommes à court d'options. Faites ce que vous devez faire. Mais si je découvre que l'un de vous a contribué à cette corruption... *Elle ne finit pas sa phrase. Elle n'en a pas besoin.*`, tone: 'menaçant froid' }
        ]
      },
      {
        npcId: 'npc_faenor',
        npcName: 'Gardien Faenor',
        lines: [
          { trigger: 'Après le conseil (en privé)', text: `*Il vous intercepte dans le couloir, vérifie que personne n'écoute.* Il y a quelque chose que je n'ai pas dit au conseil. Il y a deux semaines, j'ai vu votre Archon — Seraphina — dans les tunnels racinaires. Seule. La nuit. *Il hésite.* Je n'ai rien dit parce qu'elle est Archon de l'Aube. Mais... dans cette forêt, la nuit, seule ? Cela ne m'a pas semblé... juste.`, tone: 'troublé, hésitant' }
        ]
      }
    ],
    objectives: [
      { description: 'Obtenir la coopération du Conseil elfique', type: 'talk', optional: false },
      { description: 'Apaiser l\'Ancienne Lyriel', type: 'talk', optional: true },
      { description: 'Apprendre le témoignage du Gardien Faenor sur Seraphina', type: 'investigate', optional: true }
    ],
    transitions: [
      { condition: 'Conseil terminé', nextScene: 'ch5_s2_clairiere_sacree', label: '-> Clairière de l\'Arbre-Monde' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 16, success: 'Lyriel se radoucit. Elle ne vous fait toujours pas confiance, mais elle accepte de vous laisser agir sans interférence.', failure: 'Lyriel reste hostile. Les gardes elfiques vous suivront en permanence, compliquant l\'exploration.' },
      { skill: 'Perspicacité', dc: 15, success: 'Faenor veut clairement dire quelque chose mais se retient. Vous pouvez l\'encourager en privé.', failure: 'Le Gardien Faenor reste impassible et silencieux.' }
    ],
    estimatedMinutes: 15,
    mood: 'tension diplomatique',
    music: 'Elfique sombre — harpe mineure, murmures de feuilles',
    location: 'Sylve d\'Émeraude — Salle du Conseil des Anciens'
  },
  {
    id: 'ch5_s2_clairiere_sacree',
    chapterId: 'ch5',
    sceneNumber: 2,
    title: 'Le Coeur Malade',
    type: 'exploration',
    readAloud: `L'Arbre-Monde Yggdrasil se dresse devant vous et le mot "arbre" ne suffit plus. C'est une cathédrale vivante. Son tronc fait trois cents mètres de diamètre. Ses branches, autrefois couvertes de feuilles d'émeraude, portent maintenant un feuillage marbré de noir — vert et nécrose entremêlés comme les doigts d'un mourant serrant la main de la vie.

La sève noire suinte des crevasses de l'écorce en longs filets visqueux qui s'accumulent en flaques au pied de l'arbre. Là où la sève touche la terre, l'herbe meurt instantanément, laissant des traces de cendre grise. L'air vibre d'une énergie malsaine qui fait bourdonner vos oreilles et trembler vos mains.

Et le battement. Ce battement que vous entendez depuis des heures est assourdissant ici. BOUM. BOUM. BOUM. Ce n'est pas le coeur de l'Arbre. C'est quelque chose d'autre. Quelque chose logé dans ses racines, qui pompe la vie hors de cet être millénaire.

Le Grand Druide Thalion se tient devant une ouverture entre les racines, aussi large qu'une porte de grange. Ses mains tremblent. Ses yeux sont rouges d'avoir pleuré. "C'est par là," murmure-t-il. "La corruption descend. Il faut descendre avec elle."`,
    gmNotes: `AMBIANCE : Insistez sur l'aspect émotionnel. L'Arbre-Monde est vivant, conscient, et il souffre. Les joueurs empathiques ou les druides/rôdeurs peuvent ressentir sa douleur physiquement (nausée, vertige). Ne rendez pas cela mécanique — c'est un être qui agonise.

Le Grand Druide Thalion est brisé. L'Arbre est son lien vital — il le sent mourir. Il sera utile comme guide mais émotionnellement fragile. Si les joueurs l'interrogent sur Seraphina, il la défend : "Elle a été la première à répondre à notre appel. Sa lumière ralentit la corruption."

C'est techniquement vrai — la lumière de Seraphina RALENTIT la corruption en surface. Mais c'est parce qu'elle la concentre vers les racines profondes, là où se trouve le Sceau de la Nature. Machiavélique.

EXPLORATION : Les tunnels racinaires sont un donjon naturel. Trois niveaux de profondeur. Des créatures corrompues (fées ombres, treants infectés, vermine géante) patrouillent. La corruption augmente avec la profondeur.`,
    dialogues: [
      {
        npcId: 'npc_thalion',
        npcName: 'Grand Druide Thalion',
        lines: [
          { trigger: 'Accueil', text: `*Sa voix est un filet.* Vous l'entendez ? Son coeur bat encore. Mais chaque battement est plus faible. Plus lent. *Il pose sa main sur l'écorce et ferme les yeux.* Il a peur. L'Arbre-Monde a peur. En cinq mille ans d'existence, c'est la première fois.`, tone: 'dévasté' },
          { trigger: 'Les tunnels', text: `Les racines d'Yggdrasil plongent à trois cents mètres sous terre. Le premier niveau est encore sain — de la sève claire, des lucioles. Le deuxième est contaminé. Le troisième... *Il frissonne.* Je ne suis pas descendu au troisième. Mes apprentis qui ont essayé ne sont pas revenus les mêmes. L'un d'eux ne parle plus. Les autres font des cauchemars éveillés.`, tone: 'terrifié' },
          { trigger: 'Sur Seraphina', text: `L'Archon Seraphina ? *Son visage s'éclaire légèrement.* Une bénédiction. Elle est arrivée avant tout le monde, a prié trois jours sans dormir. Sa lumière divine ralentit la progression de la corruption en surface. Sans elle, l'Arbre serait déjà mort.`, tone: 'reconnaissant' }
        ]
      }
    ],
    objectives: [
      { description: 'Explorer la clairière sacrée et évaluer l\'état de l\'Arbre-Monde', type: 'explore', optional: false },
      { description: 'Parler au Grand Druide Thalion', type: 'talk', optional: false },
      { description: 'Se préparer pour la descente dans les tunnels racinaires', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Les joueurs descendent dans les tunnels', nextScene: 'ch5_s3_tunnels_racines', label: '-> Tunnels racinaires' }
    ],
    skillChecks: [
      { skill: 'Nature', dc: 16, success: 'La corruption suit un schéma précis — elle ne se propage pas aléatoirement mais suit un chemin, comme si elle était guidée vers un point précis sous l\'Arbre. Quelqu\'un la dirige.', failure: 'La corruption semble chaotique et naturelle, une maladie magique.' },
      { skill: 'Arcanes', dc: 17, success: 'L\'énergie résiduelle dans la sève noire contient des traces de magie divine corrompue — pas juste de l\'ombre, mais de la lumière inversée. Cela ne devrait pas être possible sans un prêtre puissant.', failure: 'L\'énergie est sombre et puissante, d\'origine indéterminée.' },
      { skill: 'Médecine', dc: 14, success: 'L\'Arbre a peut-être encore une semaine. Après, la corruption atteindra le coeur et ce sera irréversible.', failure: 'L\'état est grave mais vous ne pouvez pas estimer le temps restant.' }
    ],
    estimatedMinutes: 15,
    mood: 'désolation — deuil imminent',
    music: 'Organique sombre — battement sourd, craquements de bois, gémissements du vent',
    location: 'Sylve d\'Émeraude — Clairière de l\'Arbre-Monde'
  },
  {
    id: 'ch5_s3_tunnels_racines',
    chapterId: 'ch5',
    sceneNumber: 3,
    title: 'Dans les Veines de la Terre',
    type: 'combat',
    readAloud: `La descente dans les tunnels racinaires est une plongée dans un cauchemar organique. Les murs sont des racines entrelacées, certaines aussi épaisses que votre torse, d'autres fines comme des veines. De la sève claire coule encore au premier niveau, émettant une lueur dorée douce — les derniers signes de vie de l'Arbre.

Mais au deuxième niveau, tout change. La sève devient noire et épaisse. Les racines se tordent en formes grotesques — certaines ressemblent à des visages hurlants, d'autres à des mains griffues. L'air pue la décomposition. Vos torches crachotent comme si l'obscurité elle-même se battait contre la lumière.

Quelque chose bouge dans les ombres. Un treant — autrefois gardien de ces tunnels — se tient devant vous. Son bois est veiné de noir, ses yeux brillent d'un rouge maladif, et de sa bouche béante coule un flot de sève corrompue. Il grogne — un son de bois qui se fend — et charge.

Derrière lui, dans les ténèbres, d'autres formes se meuvent. Des fées autrefois lumineuses, maintenant grises et translucides, flottent en cercle comme des vautours attendant un repas. Leurs rires cristallins sont devenus des grincements métalliques.`,
    gmNotes: `COMBAT EN TROIS VAGUES :
1. Treant corrompu (CR 6) + 2 Fées d'ombre (CR 3) — Premier contact
2. Essaim de vermines des racines (CR 5) — Surgit des murs pendant le combat
3. Gardien racinaire (mini-boss, CR 7) — Bloque l'accès au niveau 3

Seraphina combat aux côtés des joueurs et se montre héroïque — elle utilise des sorts de lumière, soigne les blessés, fait des discours inspirants. C'est voulu : plus elle est aimée, plus la trahison sera douloureuse.

MÉCANIQUE SPÉCIALE : La corruption affecte la magie. Tous les sorts de guérison dans ces tunnels soignent 50% de moins (la corruption absorbe l'énergie vitale). Les sorts d'ombre sont renforcés (+50% dégâts). Informez les joueurs dès le premier sort lancé.

ENVIRONNEMENT :
- Les racines corrompues peuvent être coupées pour créer des barricades
- La sève noire est acide (1d6 dégâts par tour de contact)
- Les tunnels sont étroits — max 2 personnages de front
- Des poches de gaz toxique (DD Con 13 ou empoisonné 1 minute)`,
    dialogues: [
      {
        npcId: 'npc_seraphina',
        npcName: 'Archon Seraphina',
        lines: [
          { trigger: 'Pendant le combat', text: `*Sa lumière explose, repoussant les ombres.* Tenez bon ! La Lumière ne faillit pas ! *Elle soigne un allié blessé.* Je vous couvre — avancez !`, tone: 'héroïque (parfaitement joué)' },
          { trigger: 'Après vague 2', text: `*Essoufflée, une trace de sang noir sur la joue.* C'est pire que je ne pensais. Cette corruption est profonde — elle vient d'en bas, du coeur même du réseau racinaire. Le Sceau de la Nature doit être là-dessous. *Ses yeux brillent d'une intensité que vous n'aviez jamais remarquée.* Il faut continuer.`, tone: 'déterminé — un soupçon trop insistant' },
          { trigger: 'Si un joueur est gravement blessé', text: `*Elle pose ses mains sur la blessure, lumière chaude.* Non. Pas aujourd'hui. Pas tant que je respire. *Le soin est moitié moins efficace que d'habitude.* La corruption interfère avec ma magie. Pardonnez-moi.`, tone: 'protecteur' }
        ]
      }
    ],
    objectives: [
      { description: 'Traverser le deuxième niveau des tunnels racinaires', type: 'explore', optional: false },
      { description: 'Vaincre les créatures corrompues (3 vagues)', type: 'combat', optional: false },
      { description: 'Atteindre l\'accès au troisième niveau', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Les trois vagues vaincues, accès au niveau 3', nextScene: 'ch5_s4_trahison', label: '-> La Trahison' }
    ],
    skillChecks: [
      { skill: 'Survie', dc: 15, success: 'Vous repérez les poches de gaz toxique avant d\'y entrer — les racines mortes à proximité sont un indicateur.', failure: 'Vous entrez dans une poche de gaz. DD Con 13 ou empoisonné pendant 1 minute.' },
      { skill: 'Perception', dc: 16, success: 'Les fées d\'ombre ne sont pas agressives par nature — elles sont terrifiées et attaquent par panique. Il est possible de les calmer avec de la musique ou de la lumière douce.', failure: 'Les fées d\'ombre semblent aussi hostiles que le reste.' },
      { skill: 'Perspicacité', dc: 19, success: 'Seraphina connaît ces tunnels trop bien. Elle anticipe les virages, les impasses, les dangers. Pour quelqu\'un qui prétend n\'y être jamais descendue...', failure: 'Seraphina semble aussi perdue que vous dans ce labyrinthe.' }
    ],
    encounters: ['1x Treant Corrompu (CR 6)', '2x Fée d\'Ombre (CR 3)', '1x Essaim de Vermines Racinaires (CR 5)', '1x Gardien Racinaire (CR 7)'],
    loot: ['Sève de l\'Arbre-Monde (composant légendaire)', 'Coeur de Fée d\'Ombre (x2)'],
    estimatedMinutes: 35,
    mood: 'horreur organique — claustrophobie',
    music: 'Souterrain organique — battements sourds, craquements humides, souffles dans le noir',
    location: 'Sylve d\'Émeraude — Tunnels Racinaires, Niveaux 1-2'
  },
  {
    id: 'ch5_s4_trahison',
    chapterId: 'ch5',
    sceneNumber: 4,
    title: 'Le Masque Tombe',
    type: 'choice',
    readAloud: `Le troisième niveau s'ouvre sur une caverne immense — le coeur racinaire de l'Arbre-Monde. Des racines aussi épaisses que des tours s'entrelacent autour d'un noyau de lumière pulsante : le Sceau de la Nature. C'est un cristal vert émeraude, encastré dans un réseau de racines vivantes qui l'alimentent en énergie vitale depuis des millénaires.

Mais le cristal est fêlé. Des veines noires le parcourent comme des fissures dans un miroir. Et autour de lui, un cercle rituel tracé au sol — non pas avec de la craie ou du sang, mais avec de la lumière solidifiée. De la lumière divine. Votre lumière. La lumière de Seraphina.

Elle se tient devant le Sceau, dos à vous. Son armure brille d'un éclat qui n'est plus blanc et or, mais blanc et noir. Elle retire lentement ses gantelets et les laisse tomber au sol avec un bruit qui résonne comme un glas.

"Vous êtes plus rapides que je ne pensais," dit-elle sans se retourner. Sa voix a changé — plus grave, plus froide, dépouillée de toute chaleur feinte. "J'espérais avoir fini avant votre arrivée. Mais au fond... c'est peut-être mieux ainsi."

Elle se retourne. Son visage est le même — les mêmes traits fins, les mêmes yeux d'ambre — mais l'expression est celle d'une étrangère. D'une ennemie. Elle sourit, et ce sourire est la chose la plus terrifiante que vous ayez jamais vue, parce qu'il est sincère. Pour la première fois depuis que vous la connaissez, Seraphina est sincère.`,
    gmNotes: `LA SCÈNE PIVOT DE L'ACTE III. C'est le moment où tout bascule. Jouez-le lentement, savourez chaque mot. Les joueurs doivent ressentir la trahison dans leurs tripes.

COACHING POUR LE MJ :
- Parlez doucement, pas fort. La trahison est glaciale, pas explosive.
- Maintenez le contact visuel avec chaque joueur quand vous récitez les répliques de Seraphina.
- Si un joueur avait développé un lien fort avec Seraphina (romance, amitié, mentor), adressez-vous directement à ce joueur pour les répliques les plus cruelles.
- Laissez des silences. Le silence après "J'ai choisi de voir" devrait durer au moins 5 secondes.

MÉCANIQUE :
- Seraphina ne combat PAS immédiatement. Elle parle. Elle explique. Elle VEUT qu'ils comprennent.
- Si un joueur attaque impulsivement, Seraphina esquive avec un sort de Bouclier et dit : "Pas encore. Écoutez d'abord. Vous me devez bien cela."
- Le rituel est en cours — le Sceau se fissure lentement. Les joueurs ont environ 10 minutes (temps réel) avant qu'il ne se brise.
- Après le dialogue, Seraphina invoque 2 Chevaliers d'Ombre (CR 6) et s'enfuit par un portail d'ombre.
- Les joueurs doivent choisir : poursuivre Seraphina OU sauver le Sceau. Pas les deux.

SI LES JOUEURS CHOISISSENT LE SCEAU : Jet d'Arcanes DC 18 + Jet de Religion DC 16 (deux joueurs différents). Succès : le Sceau est stabilisé mais reste fragilisé. Échec : le Sceau se brise et la corruption explose.

SI LES JOUEURS POURSUIVENT SERAPHINA : Le portail mène à une embuscade du Cercle des Cendres. 4 Cultistes (CR 4) + Seraphina (boss, CR 9). Mais le Sceau se brise en leur absence.

C'est un choix impossible. C'est voulu. L'Acte III est celui des sacrifices.`,
    dialogues: [
      {
        npcId: 'npc_seraphina_revelee',
        npcName: 'Archon Seraphina (révélée)',
        lines: [
          { trigger: 'Révélation', text: `*Elle retire l'amulette d'alignement masqué de son cou et la laisse tomber. L'aura de sainteté disparaît instantanément, remplacée par... rien. Un vide.* Quatre ans. Quatre ans à sourire, à prier, à guérir vos blessures. Savez-vous ce que c'est, de porter un masque si longtemps qu'on oublie le visage en dessous ?`, tone: 'glacial, intime' },
          { trigger: 'Pourquoi', text: `Pourquoi ? *Un rire bref, sans joie.* Parce que j'ai vu ce que vous refusez de voir. Les Sceaux ne protègent pas le monde — ils l'emprisonnent. L'Hégémonie d'Ashka n'était pas un mal. C'était un ordre. Un sens. Depuis sa chute, le monde se noie dans le chaos et vous appelez ça la liberté.`, tone: 'conviction fanatique' },
          { trigger: 'Les aventuriers', text: `*Son regard se pose sur chaque joueur.* Vous. Vous étiez... *Elle hésite, et pendant une fraction de seconde, quelque chose de vulnérable passe dans ses yeux.* Vous étiez la partie la plus difficile. Vos rires autour du feu. Votre courage stupide. Vos blessures que je guérissais en priant un dieu qui ne m'écoute plus. *Sa voix se durcit.* Mais un monde meilleur exige des sacrifices. Même celui-là.`, tone: 'douloureux puis résolu' },
          { trigger: 'Le choix', text: `*Elle recule vers un portail d'ombre qui s'ouvre derrière elle.* Le Sceau se brise dans dix minutes. Vous pouvez me poursuivre — et laisser la corruption dévorer la forêt. Ou vous pouvez sauver l'Arbre — et me laisser partir. *Sourire cruel.* Choix impossible, n'est-ce pas ? Bienvenue dans mon monde.`, tone: 'sadique calme' },
          { trigger: 'Si un joueur avait un lien personnel', text: `*Elle s'adresse directement au personnage lié.* Toi... tu le savais, n'est-ce pas ? Quelque part, au fond, tu sentais que quelque chose n'allait pas. Mais tu ne voulais pas voir. Parce que la vérité est laide et que le mensonge était si beau. *Pause.* J'ai choisi de voir.`, tone: 'intime, dévastateur' }
        ]
      }
    ],
    objectives: [
      { description: 'Assister à la révélation de Seraphina', type: 'special', optional: false },
      { description: 'CHOIX : Poursuivre Seraphina OU stabiliser le Sceau de la Nature', type: 'choice', optional: false },
      { description: 'Vaincre les Chevaliers d\'Ombre invoqués par Seraphina', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Les joueurs choisissent de stabiliser le Sceau', nextScene: 'ch5_s5a_sauver_sceau', label: '-> Sauver le Sceau (Seraphina s\'échappe)' },
      { condition: 'Les joueurs poursuivent Seraphina', nextScene: 'ch5_s5b_poursuite', label: '-> Poursuite (le Sceau se brise)' }
    ],
    skillChecks: [
      { skill: 'Perspicacité', dc: 14, success: 'Les mots de Seraphina portent une douleur réelle. Elle ne ment plus — pour la première fois, elle dit ce qu\'elle pense vraiment. Et une partie d\'elle regrette.', failure: 'Ses paroles ne sont que manipulation de plus.' },
      { skill: 'Persuasion', dc: 25, success: 'Seraphina hésite. Ses mains tremblent. Pendant un instant terrible, elle semble sur le point de s\'effondrer. Puis elle secoue la tête : "Trop tard. Le rituel est lancé." Mais elle laisse tomber un médaillon — un indice sur la prochaine cible du Cercle.', failure: 'Seraphina est inébranlable dans sa conviction.' }
    ],
    encounters: ['2x Chevalier d\'Ombre (CR 6)'],
    estimatedMinutes: 30,
    mood: 'trahison — effondrement émotionnel',
    music: 'Silence... puis cordes graves, un seul violoncelle, comme un coeur qui se brise lentement',
    location: 'Sylve d\'Émeraude — Coeur Racinaire de l\'Arbre-Monde'
  },
  {
    id: 'ch5_s5a_sauver_sceau',
    chapterId: 'ch5',
    sceneNumber: 5,
    title: 'Le Prix de la Forêt',
    type: 'choice',
    readAloud: `Seraphina disparaît dans le portail d'ombre avec un dernier regard — pas de triomphe, pas de mépris. Quelque chose de plus troublant : de la tristesse. Puis le portail se referme et vous êtes seuls avec un Sceau qui agonise.

Le cristal émeraude vibre si violemment que l'air autour tremble. Les fissures noires s'élargissent, la lumière verte à l'intérieur clignote comme une bougie dans la tempête. Les racines autour du Sceau se contractent convulsivement — l'Arbre-Monde au-dessus de vos têtes pousse un gémissement qui fait trembler la terre.

Vous n'avez pas dix minutes. Vous en avez cinq. Peut-être moins. Le rituel de Seraphina a fait plus de dégâts qu'elle ne l'a laissé paraître.

Le Grand Druide Thalion, qui vous a suivis tremblant de peur, tombe à genoux devant le Sceau. "Je peux le stabiliser," murmure-t-il. "Mais pas seul. J'ai besoin de votre force. De votre lumière. De votre vie."`,
    gmNotes: `RITUEL DE SAUVETAGE — Mécanique :
Trois jets sont nécessaires, de trois joueurs différents :
1. Arcanes DC 18 — Canaliser l'énergie magique dans les fissures
2. Religion DC 16 — Purifier la corruption divine inversée de Seraphina
3. Constitution DC 15 — Résister au drain d'énergie vitale (échec = 2 niveaux d'épuisement)

Thalion fournit le cadre druidique (+2 à tous les jets si les joueurs l'incluent).

CONSÉQUENCES :
- 3 succès : Sceau stabilisé. La corruption recule lentement. L'Arbre survivra.
- 2 succès : Sceau fissuré mais tenant. La corruption s'arrête mais ne recule pas. L'Arbre survivra affaibli.
- 1 succès ou moins : Le Sceau se fissure davantage. La corruption se stabilise mais une zone de la forêt (un tiers) meurt définitivement. L'Arbre perd une branche maîtresse.

DANS TOUS LES CAS : Seraphina s'est échappée. Les joueurs doivent vivre avec ce choix. Rappelez-leur : c'était le bon choix. Le monde a besoin du Sceau plus que de vengeance.`,
    dialogues: [
      {
        npcId: 'npc_thalion',
        npcName: 'Grand Druide Thalion',
        lines: [
          { trigger: 'Le rituel', text: `*Ses mains se posent sur le cristal et il crie — la douleur est immédiate.* La corruption me brûle ! Mais je tiens ! Posez vos mains sur les racines autour du Sceau — canalisez tout ce que vous avez. Magie, foi, force vitale — TOUT. L'Arbre vous entend. Il se bat encore. Aidez-le !`, tone: 'douleur et détermination' },
          { trigger: 'Succès', text: `*La lumière verte du Sceau pulse, puis se stabilise. Thalion s'effondre, épuisé.* C'est... fait. Le Sceau tient. *Des larmes coulent sur ses joues.* Mais la cicatrice restera. L'Arbre se souviendra de cette douleur pendant mille ans. Et moi aussi.`, tone: 'soulagé, brisé' },
          { trigger: 'Échec partiel', text: `*Le cristal se stabilise mais reste zébré de noir.* Non... non, ce n'est pas assez. *Il regarde la caverne trembler.* Le Sceau tient, mais il est fragile. Comme du verre recollé. Le moindre choc pourrait le briser pour de bon. *Sa voix se brise.* Nous avons gagné du temps. Rien de plus.`, tone: 'défait' }
        ]
      }
    ],
    objectives: [
      { description: 'Stabiliser le Sceau de la Nature via le rituel collaboratif', type: 'special', optional: false },
      { description: 'Protéger Thalion pendant le rituel contre les résidus de corruption', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Sceau stabilisé — FIN DU CHAPITRE 5', nextScene: 'ch6_s1_nouvelles_sombres', label: '-> Chapitre 6 : La Mer Noire' }
    ],
    skillChecks: [
      { skill: 'Arcanes', dc: 18, success: 'Votre magie s\'engouffre dans les fissures du Sceau comme de l\'eau comblant des crevasses. Le cristal vibre de reconnaissance.', failure: 'L\'énergie vous échappe, aspirée par la corruption. Vous perdez un emplacement de sort du plus haut niveau.' },
      { skill: 'Religion', dc: 16, success: 'Votre prière brûle la corruption divine de Seraphina. La lumière noire se dissipe en cendres.', failure: 'La corruption divine résiste à votre foi. Le doute semé par la trahison affaiblit votre connexion au divin.' },
      { skill: 'Constitution', dc: 15, success: 'Vous résistez au drain vital. L\'Arbre absorbe votre force sans vous vider.', failure: 'L\'Arbre pompe trop de votre force vitale. 2 niveaux d\'épuisement.' }
    ],
    encounters: ['2x Résidu de Corruption (CR 4) — apparaissent pendant le rituel'],
    estimatedMinutes: 20,
    mood: 'sacrifice héroïque — victoire amère',
    music: 'Chant druidique — voix graves, percussion organique, crescendo lumineux',
    location: 'Sylve d\'Émeraude — Coeur Racinaire'
  },
  {
    id: 'ch5_s5b_poursuite',
    chapterId: 'ch5',
    sceneNumber: 5,
    title: 'La Chasse à la Traîtresse',
    type: 'combat',
    readAloud: `Vous plongez dans le portail d'ombre à la suite de Seraphina. Le monde se retourne comme un gant — froid, noir, silence absolu pendant une fraction de seconde qui semble durer une éternité. Puis vous émergez dans une clairière calcinée, loin de l'Arbre-Monde.

Des cendres flottent dans l'air. Quatre silhouettes encapuchonnées vous attendent en demi-cercle — des Cultistes du Cercle des Cendres, lames dégainées. Au centre, Seraphina a troqué son armure blanche pour une robe de combat gris cendre, bordée de runes noires. Un bâton de lumière inversée pulse dans sa main.

"Courageux," dit-elle. "Stupides, mais courageux."

Derrière vous, le portail se referme. Et dans votre dos, vous sentez un tremblement — distant mais terrible. Le Sceau vient de se briser. Quelque part, l'Arbre-Monde hurle.`,
    gmNotes: `COMBAT DIFFICILE : Seraphina (CR 9, Clerc/Sorcier multiclassé) + 4 Cultistes du Cercle (CR 4).

Seraphina utilise :
- Lumière Inversée (5d8 dégâts nécrotiques, zone 4m)
- Bouclier de Cendres (réaction, +5 CA)
- Mot de Guérison Corrompu (soigne les cultistes, blesse les joueurs à proximité)
- Bannissement (cible un joueur, DD Charisme 17)

IMPORTANT : Seraphina ne se bat PAS à mort. Quand elle tombe à 30% PV, elle utilise un sort de Mot de Rappel pour s'enfuir vers un sanctuaire du Cercle. Les joueurs ne peuvent PAS la tuer ici.

Avant de fuir, elle dit : "Le Sceau est brisé. L'Arbre agonise. Et c'est VOTRE choix qui l'a tué. Pas le mien."

CONSÉQUENCES : Le Sceau de la Nature est brisé. La Sylve d'Émeraude commence à mourir. Un tiers de la forêt sera morte en une semaine. L'Arbre-Monde survit mais est gravement affaibli. Les elfes blâment les joueurs.

C'est une victoire amère dans les deux cas. Bienvenue dans l'Acte III.`,
    dialogues: [
      {
        npcId: 'npc_seraphina_combat',
        npcName: 'Seraphina',
        lines: [
          { trigger: 'Début du combat', text: `*Elle lève son bâton. La lumière qui en émane est blanche mais froide, comme le soleil d'hiver qui ne réchauffe pas.* Vous avez choisi la vengeance. Noble ? Non. Humain. Terriblement, prévisiblement humain. *Les cultistes attaquent.*`, tone: 'mépris mêlé de déception' },
          { trigger: 'À 50% PV', text: `*Du sang coule de sa lèvre. Pour la première fois, la douleur est réelle.* Vous frappez fort. Plus fort qu'avant. La rage vous rend dangereux. *Sourire amer.* Mais la rage ne sauve pas les forêts.`, tone: 'douloureux, provocateur' },
          { trigger: 'Fuite', text: `*Un cercle de lumière noire se forme sous ses pieds.* Le Sceau est brisé. L'Arbre agonise. Et c'est VOTRE choix qui l'a tué. Pas le mien. *Elle disparaît.* Pensez-y. Quand les elfes vous demanderont pourquoi.`, tone: 'victorieux, amer' }
        ]
      }
    ],
    objectives: [
      { description: 'Combattre Seraphina et les Cultistes du Cercle', type: 'combat', optional: false },
      { description: 'Tenter d\'empêcher la fuite de Seraphina (très difficile)', type: 'combat', optional: true }
    ],
    transitions: [
      { condition: 'Combat terminé — Seraphina s\'enfuit — FIN DU CHAPITRE 5', nextScene: 'ch6_s1_nouvelles_sombres', label: '-> Chapitre 6 : La Mer Noire' }
    ],
    skillChecks: [
      { skill: 'Contresort', dc: 19, success: 'Vous bloquez le Mot de Rappel de Seraphina ! Elle est piégée et doit continuer le combat. (Elle utilisera Pas Brumeux + course pour s\'enfuir physiquement.)', failure: 'Le sort est trop puissant. Seraphina disparaît dans un flash de lumière noire.' },
      { skill: 'Athlétisme', dc: 17, success: 'Vous parvenez à tacler un cultiste en fuite, récupérant sur lui un parchemin codé contenant le prochain plan du Cercle.', failure: 'Le cultiste s\'échappe dans les bois.' }
    ],
    encounters: ['1x Seraphina, Archon Déchue (CR 9)', '4x Cultiste du Cercle des Cendres (CR 4)'],
    loot: ['Amulette d\'Alignement Masqué (rare)', 'Parchemin codé du Cercle (si récupéré)'],
    estimatedMinutes: 30,
    mood: 'rage — combat désespéré',
    music: 'Combat épique sombre — cuivres menaçants, percussions urgentes, choeur discordant',
    location: 'Clairière Calcinée — Embuscade du Cercle des Cendres'
  },

  // ============================================================================
  // CHAPITRE 6 : LA MER NOIRE (Niveau 9-10)
  // Côte des Orages — Sceau de la Mer — Combat naval — Temple englouti
  // ============================================================================

  {
    id: 'ch6_s1_nouvelles_sombres',
    chapterId: 'ch6',
    sceneNumber: 1,
    title: 'Nouvelles de Tempête',
    type: 'narration',
    readAloud: `Les nouvelles arrivent comme des coups de marteau, l'un après l'autre, sans répit.

La mer au large de la Côte des Orages est devenue noire. Pas sombre — noire. Comme de l'encre. Sur un kilomètre autour du temple englouti de Maréthys, l'eau a changé de nature. Les poissons remontent morts, le ventre gonflé d'une substance huileuse et sombre. Les filets des pêcheurs reviennent pleins de choses qui ne sont pas des poissons.

Le message du Capitaine Brennan de Port-Tempête est griffonné à la hâte, taché de ce qui pourrait être de l'eau de mer ou des larmes : "Le Sceau de la Mer a cédé. Quelque chose est sorti du temple. Nous avons perdu trois bateaux. Envoyez quelqu'un. N'importe qui. Vite."

Vous lisez ces mots dans une auberge de campagne, quelque part entre la Sylve mourante et la côte en péril. Le monde se fissure de toutes parts, et vous êtes les seuls à tenir du mortier.`,
    gmNotes: `TRANSITION ENTRE CHAPITRES. Laissez les joueurs digérer la trahison de Seraphina avant de les plonger dans la crise suivante. Accordez-leur une nuit de repos, des conversations entre personnages, un moment de calme avant la tempête.

Le Capitaine Brennan est un vieux loup de mer pragmatique. Il ne panique pas facilement — si lui est terrifié, c'est grave.

VOYAGE : Port-Tempête est à 5 jours de voyage. Pendant le trajet, utilisez les rencontres aléatoires pour montrer que le monde se dégrade : des réfugiés fuient la côte, des animaux migrent dans le mauvais sens, le ciel est perpétuellement couvert.

Si les joueurs ont laissé le Sceau de la Nature se briser (ch5_s5b), les rumeurs parlent aussi de la Sylve qui meurt. Ajoutez cette culpabilité au voyage.`,
    dialogues: [
      {
        npcId: 'npc_messager',
        npcName: 'Messager de la Garde Côtière',
        lines: [
          { trigger: 'Le message', text: `*Un gamin de seize ans, trempé, épuisé, les yeux trop grands.* Le Capitaine Brennan m'envoie. La mer... la mer est devenue noire. Pas une tempête. L'eau elle-même. Et les choses qui en sortent... *Il vomit.* Pardon. J'ai couru trois jours. Personne d'autre ne voulait venir.`, tone: 'terreur d\'adolescent' },
          { trigger: 'Détails', text: `*Il tremble.* Des tentacules. Longs comme des navires. Ils ont pris le Marée-Haute d'un seul coup — trente marins. Aspirés. Et les nuits... quelque chose chante sous l'eau. Un chant qui rend fou. Deux de nos veilleurs se sont jetés dans la mer noire en souriant. *Il pleure.* Je veux rentrer chez moi.`, tone: 'traumatisé' }
        ]
      }
    ],
    objectives: [
      { description: 'Recevoir les nouvelles de la Côte des Orages', type: 'special', optional: false },
      { description: 'Se préparer pour le voyage vers Port-Tempête', type: 'explore', optional: false },
      { description: 'Réconforter le messager (optionnel mais humain)', type: 'talk', optional: true }
    ],
    transitions: [
      { condition: 'Départ vers Port-Tempête', nextScene: 'ch6_s2_port_tempete', label: '-> Port-Tempête' }
    ],
    estimatedMinutes: 15,
    mood: 'accablement — le monde se fissure',
    music: 'Vent de mer lointain — cordes basses, grondement d\'orage',
    location: 'Route entre la Sylve d\'Émeraude et la Côte des Orages'
  },
  {
    id: 'ch6_s2_port_tempete',
    chapterId: 'ch6',
    sceneNumber: 2,
    title: 'Port-Tempête Assiégé',
    type: 'exploration',
    readAloud: `Port-Tempête porte bien son nom, mais aujourd'hui la tempête n'est pas dans le ciel — elle est dans la mer. Le port, autrefois animé de navires colorés et de cris de mouettes, est un cimetière naval. Des épaves jonchent le quai. Des mâts brisés dépassent de l'eau comme des os fracturés. L'odeur est insupportable — poisson pourri, sel et cette puanteur de cuivre qu'on associe maintenant à la corruption des Sceaux.

Les habitants se terrent chez eux. Les volets sont fermés. Les rues sont vides sauf pour les gardes côtiers qui patrouillent en groupes de six, visages blafards, arbalètes chargées. Ils ne regardent pas la terre. Ils regardent la mer.

Et la mer les regarde en retour.

À l'horizon, là où l'eau claire rencontre l'eau noire, la ligne de démarcation est nette comme une coupure au couteau. Du côté sain, des vagues normales. Du côté noir, la surface est lisse comme du verre — un miroir d'encre qui ne reflète rien. Pas le ciel. Pas les nuages. Rien.

Le Capitaine Brennan vous attend au bout du quai principal, debout comme un phare dans la grisaille. Un homme massif aux cheveux blancs coupés ras, le visage strié de cicatrices de sel. Il ne dit pas bonjour. Il pointe la mer noire du doigt : "C'est là-dessous. Le temple de Maréthys. Et la chose qui en est sortie."`,
    gmNotes: `Port-Tempête est une ville en état de siège. Pas par une armée — par la mer elle-même. La vie quotidienne s'est effondrée. Les pêcheurs ne peuvent plus pêcher (la mer noire tue tout ce qui y entre). La nourriture va manquer dans deux semaines. Le moral est au plus bas.

Le Capitaine Brennan est un homme qui a vu beaucoup de choses mais qui est clairement dépassé. Il ne panique pas — il est au-delà de la panique, dans cette zone de calme glacial qui précède l'effondrement.

INFORMATIONS À TRANSMETTRE :
- Le temple de Maréthys est un ancien sanctuaire submergé il y a 500 ans lors de la chute de l'Hégémonie
- Le Sceau de la Mer y était gardé par des esprits aquatiques liés par serment
- Trois tentatives de plongée ont échoué : des créatures marines corrompues gardent le temple
- Une entité massive (la "Chose des Profondeurs") a été vue — un léviathan corrompu
- Le vieux Sage de Port-Tempête, Marin Corvell, possède une cloche de plongée enchantée — le seul moyen sûr de descendre

PRÉPARATION NAVALE : Les joueurs doivent réunir :
1. La cloche de plongée de Corvell
2. Un navire assez solide pour traverser la mer noire
3. Des armes ou sorts efficaces sous l'eau`,
    dialogues: [
      {
        npcId: 'npc_brennan',
        npcName: 'Capitaine Brennan',
        lines: [
          { trigger: 'Accueil', text: `*Il vous évalue d'un regard.* Vous êtes ceux de Sol-Aureus. Les briseurs de Sceaux. *Pas un compliment.* On m'a dit que vous aviez de l'expérience avec les saloperies d'ombre. Bien. Parce que ce qui est là-dessous fait passer vos démons d'égout pour des chatons.`, tone: 'rude, direct' },
          { trigger: 'La situation', text: `*Il crache dans la mer.* Trois bateaux perdus. Quatre-vingt-sept marins. Leurs corps n'ont jamais remonté. Et chaque nuit, la mer noire s'étend d'un mètre de plus. Si ça continue, dans un mois, toute la Côte des Orages sera un lac de goudron. Et alors... *Il ne finit pas.*`, tone: 'sombre, fatigué' },
          { trigger: 'Le plan', text: `Le seul moyen d'atteindre le temple, c'est la cloche de plongée du vieux Corvell. C'est un artefact des anciens — protège contre la pression et permet de respirer sous l'eau. Le problème ? Corvell refuse de la donner. Il dit qu'il descendra lui-même. À quatre-vingts ans. *Soupir.* Allez le convaincre, moi il ne m'écoute plus.`, tone: 'exaspéré' },
          { trigger: 'Le léviathan', text: `*Son visage se ferme.* Je l'ai vu. Une fois. La nuit. Des tentacules longs comme mon navire qui ont arraché le Marée-Haute de la surface comme... comme un enfant arrache les ailes d'une mouche. Et des yeux. Des yeux jaunes, gros comme des charriots, dans l'eau noire. Et intelligents. *Il frissonne.* Cette chose pense.`, tone: 'terreur contenue' }
        ]
      },
      {
        npcId: 'npc_corvell',
        npcName: 'Marin Corvell, Sage de Port-Tempête',
        lines: [
          { trigger: 'La cloche', text: `*Un vieil homme sec comme du bois flotté, assis dans un atelier rempli de cartes marines et de maquettes de bateaux.* Ma cloche ? MA cloche ? C'est mon grand-père qui l'a forgée avec les esprits de l'eau ! Elle est vivante, cette cloche. Elle chante quand l'eau est dangereuse. Et vous voulez l'emmener dans CETTE mer ? *Il tape du poing.* J'y vais moi-même ou personne n'y va.`, tone: 'têtu, passionné' },
          { trigger: 'Le convaincre', text: `*Après un long silence.* Cinquante ans que je plonge. J'ai vu le temple de Maréthys quand l'eau était encore claire. C'était... magnifique. Des colonnes de corail, des vitraux d'algues lumineuses. *Sa voix se brise.* Et maintenant c'est un tombeau. *Il vous regarde.* Vous me jurez de la ramener ? La cloche ? Jurez-le.`, tone: 'vulnérable, résigné' },
          { trigger: 'Conseils', text: `*Il déroule une carte marine tachée.* Le temple est à quatre cents mètres de profondeur. La cloche vous protégera de la pression et vous donnera de l'air. Mais dans la mer noire... *Il trace un cercle du doigt.* La visibilité sera nulle. Fiez-vous aux sons. La cloche chantera quand vous approcherez du temple. Et quand vous entendrez un autre chant... celui d'en bas... bouchez-vous les oreilles. Ce chant rend fou.`, tone: 'professoral, inquiet' }
        ]
      }
    ],
    objectives: [
      { description: 'Arriver à Port-Tempête et évaluer la situation', type: 'explore', optional: false },
      { description: 'Rencontrer le Capitaine Brennan', type: 'talk', optional: false },
      { description: 'Obtenir la cloche de plongée de Marin Corvell', type: 'talk', optional: false },
      { description: 'Préparer l\'expédition sous-marine', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Cloche obtenue et navire prêt', nextScene: 'ch6_s3_mer_noire', label: '-> Traversée de la Mer Noire' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 16, success: 'Corvell accepte de vous confier la cloche. Il exige seulement votre parole de la ramener intacte.', failure: 'Corvell refuse. Il faudra trouver un autre moyen (Intimidation DC 18, ou accepter qu\'il vous accompagne — danger pour le PNJ).' },
      { skill: 'Investigation', dc: 14, success: 'En étudiant les cartes de Corvell, vous identifiez un courant sous-marin qui pourrait vous permettre d\'approcher le temple par un angle mort, évitant la zone où le léviathan a été vu.', failure: 'L\'approche directe semble être la seule option.' },
      { skill: 'Nature', dc: 15, success: 'La mer noire n\'est pas de l\'eau contaminée — c\'est de l\'essence d\'ombre liquéfiée. Elle réagit à la vie comme un prédateur. Toute créature vivante qui y entre sera détectée immédiatement.', failure: 'La mer noire vous semble dangereuse mais vous ne comprenez pas exactement pourquoi.' }
    ],
    estimatedMinutes: 25,
    mood: 'désespoir côtier — ville mourante',
    music: 'Port en ruine — vent, vagues anormales, grincements de bois, silence inquiétant',
    location: 'Côte des Orages — Port-Tempête'
  },
  {
    id: 'ch6_s3_mer_noire',
    chapterId: 'ch6',
    sceneNumber: 3,
    title: 'La Traversée Noire',
    type: 'combat',
    readAloud: `Le navire — un sloop de guerre nommé Le Dernier Espoir, et ce nom n'a jamais été si approprié — franchit la ligne entre l'eau claire et l'eau noire. Le changement est instantané et total.

Le son meurt. Les vagues s'arrêtent. La surface devient un miroir d'encre, si lisse que vous pouvez voir vos reflets — sauf que vos reflets ne bougent pas exactement comme vous. Ils ont un décalage. Un retard. Comme s'ils vous observaient au lieu de vous imiter.

L'air devient glacial malgré la saison. Le bois du pont gémit comme si le navire lui-même avait peur. Le Capitaine Brennan, à la barre, a les phalanges blanches à force de serrer. L'équipage — six marins volontaires que vous respecterez à jamais pour leur courage — prie en silence.

Puis le chant commence. Il vient de partout et de nulle part — des profondeurs, de l'air, de l'intérieur de vos crânes. Une mélodie sans paroles, inhumaine, qui promet le repos, l'oubli, la paix du fond de l'océan. Vos pieds se dirigent vers le bastingage avant que vous ne réalisiez que vous bougez.`,
    gmNotes: `COMBAT NAVAL EN DEUX PHASES :

PHASE 1 — LE CHANT :
Tous les personnages doivent faire un jet de Sagesse DC 15 au début de chaque tour. Échec = charmé, se dirige vers le bord pour plonger. Un allié peut utiliser son action pour secouer un charmé (nouveau jet avec avantage).
Le chant dure 3 tours, puis les créatures attaquent.

PHASE 2 — L'ASSAUT :
4x Sirènes des Profondeurs (CR 5) — montent à bord, tentent de tirer les joueurs à l'eau
2x Tentacules du Léviathan (CR 7) — agrippent le navire, essaient de le couler
Le Léviathan lui-même n'apparaît pas encore (Chapitre 6 scène 5)

MÉCANIQUE NAVALE :
- Le navire a 150 PV. À 0, il coule.
- Chaque tentacule fait 20 dégâts/tour au navire si non-contrecarré
- Les joueurs peuvent couper les tentacules (50 PV chacun)
- Brennan maintient le cap mais ne combat pas
- Si un joueur tombe à l'eau noire : 2d8 dégâts nécrotiques/tour + jet de Sagesse DC 16 ou paralysé par le froid et l'obscurité

AMBIANCE : C'est un combat d'horreur maritime. L'ennemi vient d'en-dessous. La mer est l'ennemi. Le navire est leur seul refuge et il est en train de se briser.`,
    dialogues: [
      {
        npcId: 'npc_brennan_combat',
        npcName: 'Capitaine Brennan',
        lines: [
          { trigger: 'Le chant', text: `*Il se mord la lèvre au sang.* Bouchez-vous les oreilles ! Ce chant — c'est le même qu'ont entendu mes hommes avant de se jeter à l'eau ! NE L'ÉCOUTEZ PAS ! *Il attache un marin au mât.* Pensez à quelqu'un que vous aimez. Pensez à pourquoi vous vous battez. Et ne lâchez RIEN !`, tone: 'hurlant contre la tentation' },
          { trigger: 'L\'assaut', text: `*Des tentacules émergent de l'eau noire.* BÂBORD ! TRIBORD ! ILS ARRIVENT DE PARTOUT ! *Il tire la barre de toutes ses forces.* Coupez ces saloperies ! Si le navire coule, on est tous morts ! PERSONNE ne survit dans cette eau !`, tone: 'terreur combative' },
          { trigger: 'Si le navire est endommagé', text: `*Le bois craque.* On prend l'eau ! Colmatez la brèche ou on coule en cinq minutes ! *Il regarde la mer noire avec une haine pure.* Tu ne m'auras pas. Pas aujourd'hui.`, tone: 'défi désespéré' }
        ]
      }
    ],
    objectives: [
      { description: 'Résister au chant des profondeurs', type: 'special', optional: false },
      { description: 'Protéger le navire contre les tentacules du léviathan', type: 'combat', optional: false },
      { description: 'Vaincre les sirènes des profondeurs', type: 'combat', optional: false },
      { description: 'Atteindre le point de plongée au-dessus du temple', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Navire intact, point de plongée atteint', nextScene: 'ch6_s4_temple_englouti', label: '-> Plongée vers le Temple' }
    ],
    skillChecks: [
      { skill: 'Sagesse (contre le chant)', dc: 15, success: 'Le chant glisse sur votre esprit comme l\'eau sur la pierre. Vous restez maître de vos actions.', failure: 'Le chant est si beau, si paisible... vos pieds vous portent vers le bastingage. L\'eau noire vous appelle comme un lit chaud un soir d\'hiver.' },
      { skill: 'Force (couper les tentacules)', dc: 16, success: 'Votre lame tranche le tentacule dans un jaillissement d\'ichor noir. Le moignon se rétracte en convulsant.', failure: 'La chair du tentacule est comme du caoutchouc — votre arme rebondit. Le tentacule serre plus fort.' },
      { skill: 'Athlétisme (colmater les brèches)', dc: 14, success: 'Vous colmatez la brèche avec du bois et de la poix. Le navire tient.', failure: 'L\'eau noire s\'infiltre trop vite. Le navire perd 20 PV supplémentaires.' }
    ],
    encounters: ['4x Sirène des Profondeurs (CR 5)', '2x Tentacule du Léviathan (CR 7)', 'Chant des Profondeurs (effet de zone)'],
    estimatedMinutes: 30,
    mood: 'horreur maritime — combat pour la survie',
    music: 'Maritime sombre — vagues sourdes, craquements de bois, chant inhumain distant, cuivres graves',
    location: 'Côte des Orages — La Mer Noire'
  },
  {
    id: 'ch6_s4_temple_englouti',
    chapterId: 'ch6',
    sceneNumber: 4,
    title: 'Le Temple de Maréthys',
    type: 'exploration',
    readAloud: `La cloche de plongée descend dans l'eau noire et le monde disparaît. La visibilité est nulle — un noir absolu, plus dense que toute obscurité que vous avez connue. Ce n'est pas l'absence de lumière. C'est la présence de quelque chose qui la dévore.

Puis la cloche chante. Un son pur, cristallin, qui repousse les ténèbres dans un rayon de dix mètres. Et dans ce cercle de clarté, vous voyez le temple de Maréthys.

C'était magnifique, autrefois. Des colonnes de corail blanc s'élèvent vers une voûte de roche sculptée. Des mosaïques d'algues lumineuses — mortes maintenant — ornent les murs. Des statues de divinités marines, érodées par les siècles, montent la garde avec des tridents brisés. Le sol est jonché de coquillages qui craquent sous vos pieds comme des os.

Au centre du temple, un autel de nacre. Et au-dessus de l'autel, flottant dans l'eau comme un coeur arraché, le Sceau de la Mer — ou ce qu'il en reste. Le cristal bleu est fendu en deux. De la fissure s'écoule un flux constant d'essence d'ombre qui empoisonne l'océan.

Et derrière l'autel, dans l'ombre que même la cloche ne peut percer, quelque chose respire. Quelque chose d'énorme.`,
    gmNotes: `DONJON SOUS-MARIN. La cloche de Corvell crée une bulle d'air mobile de 5m de rayon. Les joueurs peuvent en sortir mais subissent les effets de la mer noire (2d8 nécrotiques/tour, vision 0).

LE TEMPLE :
- 4 salles : Narthex, Nef, Sanctuaire, Crypte
- Narthex : Statues animées corrompues (2x Gardien de Corail, CR 5) — déclenchées par l'intrusion
- Nef : Puzzle aquatique — réaligner les mosaïques pour ouvrir le passage vers le Sanctuaire (Investigation DC 16 ou Arcanes DC 14)
- Sanctuaire : Le Sceau brisé + la Chose (scène suivante)
- Crypte : Trésor de l'ancien temple + fragments utilisables pour réparer partiellement le Sceau

AMBIANCE SOUS-MARINE : Tout est ralenti, étouffé, oppressant. Les sons sont déformés. Les joueurs se sentent écrasés par la profondeur et l'obscurité. La claustrophobie de la cloche contraste avec l'immensité terrifiante de l'océan noir autour d'eux.

IMPORTANT : La "chose qui respire" est le Léviathan des Abysses. Il ne dort pas — il attend. Il est lié au Sceau brisé et nourri par l'essence d'ombre. C'est le boss de ce chapitre.`,
    dialogues: [
      {
        npcId: 'npc_esprit_eau',
        npcName: 'Esprit Gardien de Maréthys (mourant)',
        lines: [
          { trigger: 'Rencontre', text: `*Une forme translucide se matérialise devant l'autel — un être d'eau pure, mais sale, polluée, agonisante. Sa voix est un gargouillis.* Vous... êtes... venus. Trop... tard. Le Sceau... brisé. Le Gardien... corrompu. Il était... notre protecteur. Maintenant il est... la menace. *L'esprit se dissout partiellement.* La Crypte. Les fragments... de l'ancien Sceau. Ils peuvent... aider. Mais la bête... la bête garde tout.`, tone: 'agonisant, désespéré' },
          { trigger: 'L\'ancien gardien', text: `*L'esprit tremble.* Le Léviathan de Maréthys. Un être sacré. Gardien du temple depuis... mille ans. Le Cercle des Cendres l'a... empoisonné. Injecté l'essence d'ombre dans son sang. Il souffre. Il rage. Il... ne se contrôle plus. *Pause.* Si vous pouvez... le purifier... plutôt que le tuer... le Sceau pourra être restauré. Sinon... tuez-le. C'est... plus miséricordieux.`, tone: 'suppliant' }
        ]
      }
    ],
    objectives: [
      { description: 'Explorer le temple englouti de Maréthys', type: 'explore', optional: false },
      { description: 'Vaincre les gardiens de corail corrompus', type: 'combat', optional: false },
      { description: 'Résoudre le puzzle des mosaïques', type: 'investigate', optional: false },
      { description: 'Trouver l\'Esprit Gardien et apprendre la vérité sur le Léviathan', type: 'talk', optional: false },
      { description: 'Récupérer les fragments de Sceau dans la Crypte', type: 'explore', optional: true }
    ],
    transitions: [
      { condition: 'Accès au Sanctuaire et confrontation imminente', nextScene: 'ch6_s5_leviathan', label: '-> Le Léviathan des Abysses' }
    ],
    skillChecks: [
      { skill: 'Investigation', dc: 16, success: 'Les mosaïques forment un puzzle : réarrangez les motifs marins pour recréer la carte des courants anciens. Le passage vers le Sanctuaire s\'ouvre.', failure: 'Le puzzle vous résiste. Tentez Arcanes DC 14 ou force brute (alertant le Léviathan).' },
      { skill: 'Arcanes', dc: 14, success: 'Vous sentez l\'écho magique du Sceau dans les mosaïques et les réalignez intuitivement.', failure: 'La magie résiduelle est trop faible pour vous guider.' },
      { skill: 'Perception', dc: 17, success: 'Vous entendez un battement de coeur massif venant du Sanctuaire. Régulier. Patient. La bête sait que vous êtes là. Elle attend.', failure: 'Le temple semble silencieux, à part le glouglou de l\'eau noire.' }
    ],
    encounters: ['2x Gardien de Corail Corrompu (CR 5)'],
    loot: ['Fragments de l\'Ancien Sceau de la Mer (x3)', 'Trident de Maréthys (arme rare, +1d6 dégâts de froid sous l\'eau)'],
    estimatedMinutes: 25,
    mood: 'exploration sous-marine — émerveillement corrompu',
    music: 'Abyssal — sons déformés, pressions, échos lointains, chant de baleine inversé',
    location: 'Côte des Orages — Temple Englouti de Maréthys'
  },
  {
    id: 'ch6_s5_leviathan',
    chapterId: 'ch6',
    sceneNumber: 5,
    title: 'Le Gardien Déchu',
    type: 'combat',
    readAloud: `Le Sanctuaire du temple s'ouvre devant vous comme la gueule d'un monstre. Et derrière l'autel brisé, dans les ténèbres que même la cloche hésite à percer, IL est là.

Le Léviathan de Maréthys.

Autrefois, il devait être majestueux — une créature de lumière marine, de corail vivant et d'eau pure. Maintenant, c'est un cauchemar. Son corps fait trente mètres de long, couvert d'une peau qui alterne entre écailles bleues saines et plaques de chitine noire corrompue. Ses yeux — dix, vingt, impossible de les compter — brillent d'un jaune maladif. Des tentacules couverts de ventouses-bouches s'étirent dans toutes les directions, goûtant l'eau, cherchant de la vie à consumer.

Et il souffre. Vous le voyez dans la façon dont son corps se contracte par vagues, dans les gémissements qui font vibrer les murs du temple, dans les larmes de sève noire qui coulent de ses yeux multiples. Ce n'est pas un monstre. C'est un gardien torturé, empoisonné, transformé en arme par ceux qui ont brisé le Sceau qu'il devait protéger.

Il vous voit. Un grondement monte des profondeurs de son être — à mi-chemin entre le rugissement et le sanglot. Puis il charge.`,
    gmNotes: `BOSS FIGHT DU CHAPITRE 6 — Le Léviathan des Abysses (CR 11)

DEUX VOIES DE RÉSOLUTION :
1. COMBAT (tuer le Léviathan) — Plus simple, mais conséquences négatives
2. PURIFICATION (guérir le Léviathan) — Plus difficile, mais conséquences positives

COMBAT CLASSIQUE :
Le Léviathan a 200 PV, CA 17 (zones corrompues CA 14).
Actions :
- Tentacule (x3) : +9, portée 6m, 2d10+5 contondant + 1d8 nécrotique
- Morsure : +10, portée 3m, 3d10+6 perforant (recharge 5-6)
- Chant d'Agonie (recharge 6) : tous dans 20m, DD Sagesse 16 ou effrayé + 3d8 psychique
- Encre d'Ombre : zone de 10m, obscurité magique + 2d6 nécrotique/tour

Phases :
- 100% - 50% : Agressif, utilise tentacules et encre
- 50% - 25% : Désespéré, utilise Chant d'Agonie, commence à fuir
- 25% - 0% : Le Léviathan pleure. Si les joueurs n'ont pas choisi la purification, il se bat jusqu'à la mort.

PURIFICATION (nécessite les fragments de Sceau de la Crypte) :
3 joueurs doivent maintenir chacun un fragment contre le corps du Léviathan pendant 3 tours.
Chaque tour : jet de Constitution DC 16 pour résister à l'essence d'ombre.
Pendant ce temps, le Léviathan se débat — les autres joueurs doivent le maintenir (Athlétisme DC 18 ou sorts d'entrave).
Si les 3 fragments sont maintenus 3 tours : la corruption se dissipe. Le Léviathan redevient un gardien allié.

Si le Léviathan est purifié, il aide à restaurer le Sceau de la Mer (bien que fissuré, il tient). Si tué, le Sceau reste brisé et la mer noire persiste.

COACHING ÉMOTIONNEL : Ce combat doit être triste, pas glorieux. Le Léviathan est une victime. Chaque coup porté devrait faire mal aux joueurs autant qu'à la créature. Décrivez sa douleur, ses pleurs, sa confusion. Rendez-le tragique.`,
    dialogues: [
      {
        npcId: 'npc_leviathan',
        npcName: 'Le Léviathan de Maréthys',
        lines: [
          { trigger: 'Pendant le combat (télépathie fragmentée)', text: `*Des mots se forment dans vos esprits — brisés, incohérents, comme un homme qui se noie essayant de parler.* ...mal... tellement mal... pourquoi... j'étais... gardien... protéger... PROTÉGER ! *Un hurlement psychique.* ...aidez... ou tuez... mais... finissez...`, tone: 'agonie psychique' },
          { trigger: 'Si purification entamée', text: `*Le Léviathan se fige. Les fragments brillent contre sa peau. Sa voix mentale devient plus claire, plus humaine.* La lumière... je me souviens de la lumière... *Ses yeux jaunes vacillent vers le bleu.* ...tenez bon... je vous en supplie... ne lâchez pas...`, tone: 'espoir douloureux' },
          { trigger: 'Si purifié', text: `*Le corps du Léviathan se transforme — la chitine noire tombe comme des écailles mortes, révélant une peau de nacre iridescente. Ses yeux, maintenant d'un bleu profond, vous regardent avec une gratitude infinie.* ...merci. Mille ans de service. Cent ans de tourment. Et vous... vous m'avez rendu à moi-même. *Il s'enroule autour du Sceau fissuré, le protégeant de son corps.* Le Sceau tient. Fragile, mais il tient. Grâce à vous.`, tone: 'gratitude profonde, paix retrouvée' }
        ]
      }
    ],
    objectives: [
      { description: 'Affronter le Léviathan de Maréthys', type: 'combat', optional: false },
      { description: 'CHOIX : Tuer le Léviathan OU le purifier avec les fragments de Sceau', type: 'choice', optional: false },
      { description: 'Stabiliser le Sceau de la Mer (si purification réussie)', type: 'special', optional: true }
    ],
    transitions: [
      { condition: 'Léviathan vaincu ou purifié — FIN DU CHAPITRE 6', nextScene: 'ch7_s1_sol_aureus_siege', label: '-> Chapitre 7 : Le Point de Non-Retour' }
    ],
    skillChecks: [
      { skill: 'Constitution (purification)', dc: 16, success: 'Vous résistez à l\'essence d\'ombre qui brûle vos mains. Le fragment pulse de lumière contre la peau du Léviathan.', failure: 'La douleur est insoutenable. Vous lâchez le fragment. Il faut recommencer ce tour.' },
      { skill: 'Athlétisme (maintenir le Léviathan)', dc: 18, success: 'Vous parvenez à maintenir le Léviathan immobile pendant que vos alliés appliquent les fragments.', failure: 'Le Léviathan se débat violemment. Les porteurs de fragments doivent faire un jet de Dextérité DC 14 ou être projetés.' },
      { skill: 'Religion', dc: 15, success: 'Votre prière amplifie l\'effet des fragments. Les porteurs ont avantage à leur prochain jet de Constitution.', failure: 'Votre prière se perd dans la corruption ambiante.' }
    ],
    encounters: ['1x Léviathan de Maréthys (CR 11)'],
    loot: ['Écaille de Léviathan Purifié (composant légendaire, si purifié)', 'Perle Noire des Abysses (5000 PO, si tué)', 'Bénédiction de Maréthys (avantage permanent aux jets de Natation, si purifié)'],
    estimatedMinutes: 40,
    mood: 'combat tragique — miséricorde ou violence',
    music: 'Boss abyssal — orgue sous-marin, choeur grave, crescendo lors de la purification',
    location: 'Côte des Orages — Sanctuaire du Temple Englouti de Maréthys'
  },

  // ============================================================================
  // CHAPITRE 7 : LE POINT DE NON-RETOUR (Niveau 10-12)
  // Sol-Aureus assiégé — Bataille majeure — Évacuation — Mort d'un allié
  // ============================================================================

  {
    id: 'ch7_s1_sol_aureus_siege',
    chapterId: 'ch7',
    sceneNumber: 1,
    title: 'Le Ciel en Feu',
    type: 'narration',
    readAloud: `Vous les voyez avant de les entendre. Des colonnes de fumée noire s'élèvent au-dessus de Sol-Aureus comme les doigts d'une main gigantesque agrippant le ciel. Puis le son vous atteint — le grondement sourd des catapultes, les cris lointains de milliers de voix mêlées, et par-dessus tout, le rugissement d'une chose qui n'est pas humaine.

Sol-Aureus est en feu.

En approchant par la route du sud, le spectacle est apocalyptique. Les murs dorés de la capitale — ceux qui brillaient comme un joyau au soleil — sont noircis par la suie et zébrés de fissures. Des bannières de cendres flottent sur les collines à l'est : le Cercle des Cendres. Des milliers de soldats en armure noire entourent la ville comme une marée. Et au-dessus d'eux, planant dans la fumée, des ombres ailées — des démons de guerre invoqués par les rituels du Cercle.

La porte sud est encore ouverte — à peine. Des réfugiés s'y engouffrent dans les deux sens : ceux qui fuient et ceux qui reviennent chercher des proches. Des gardes épuisés essaient de maintenir l'ordre. Un sergent vous reconnaît et hurle : "Les héros ! Les héros sont revenus ! OUVREZ LE PASSAGE !"

À l'intérieur, Sol-Aureus est méconnaissable. La belle cité dorée est un champ de bataille. Le quartier marchand brûle. Le temple de Solarius a perdu sa flèche. Et au centre, le Palais Royal brille d'un bouclier magique bleu — le dernier rempart de la Reine Elara.`,
    gmNotes: `LE CLIMAX DE L'ACTE III. Sol-Aureus assiégé est le moment où les joueurs réalisent que le monde peut réellement perdre. Tout ce qu'ils connaissaient, les lieux familiers du Chapitre 1, est en train de brûler.

COACHING ÉMOTIONNEL :
- Décrivez les lieux familiers détruits : le Dragon Rouillé a un mur effondré. L'Académie Arcane est intacte mais cerclée de runes défensives. La Caserne du Soleil Levant sert d'hôpital de campagne.
- Montrez des PNJ connus dans la détresse : Brok le tavernier combat avec un hachoir, Théodore soigne des blessés avec ce qu'il reste de sa magie, le vieux Sam guide les réfugiés.
- Ce n'est pas un combat que les joueurs peuvent gagner seuls. C'est une guerre. Leur rôle est de faire la différence là où cela compte le plus.

BRIEFING DE GUERRE — Le Général Marcus :
La situation est désespérée. Le Cercle a 5000 soldats + créatures d'ombre. Sol-Aureus a 2000 défenseurs. Le bouclier magique du Palais tiendra 48 heures maximum. Après, c'est fini.

TROIS MISSIONS CRITIQUES (les joueurs ne peuvent en choisir que deux sur trois) :
1. Protéger l'évacuation des civils par les tunnels sous la ville
2. Détruire la machine de siège du Cercle (un Bélier d'Ombre qui peut briser les murs)
3. Défendre le Temple de Solarius (sa lumière alimente le bouclier du Palais)

Le choix impossible : la troisième mission non-choisie échoue. Avec des conséquences.`,
    dialogues: [
      {
        npcId: 'npc_general_marcus_siege',
        npcName: 'Général Marcus',
        lines: [
          { trigger: 'Briefing', text: `*Il a vieilli de dix ans en une semaine. Du sang séché sur son armure. Ses yeux sont injectés de sang.* Pas le temps pour les retrouvailles. Le Cercle a frappé il y a trois jours. Cinq mille soldats, des démons d'ombre, et au moins deux Archons. On tient, mais à peine. Le bouclier magique de la Reine nous donne 48 heures. Après... *Il ne finit pas.* J'ai trois missions. Vous ne pouvez pas toutes les faire. Choisissez.`, tone: 'épuisé, brutal d\'efficacité' },
          { trigger: 'Mission Évacuation', text: `Les tunnels sous la ville mènent aux collines nord. C'est notre seule route d'évacuation pour les civils — femmes, enfants, vieillards. Trois mille personnes. Le problème : le Cercle a envoyé des éclaireurs d'ombre dans les tunnels. Si on les neutralise pas, c'est un massacre.`, tone: 'grave' },
          { trigger: 'Mission Bélier', text: `Le Cercle a un Bélier d'Ombre — une machine de siège alimentée par de l'essence d'ombre pure. Un coup et il traverse nos murs comme du papier. Il est positionné au camp est, gardé par un Archon — pas Seraphina, un autre. Si le Bélier frappe, les murs tombent et c'est fini.`, tone: 'urgent' },
          { trigger: 'Mission Temple', text: `Le Temple de Solarius alimente le bouclier magique du Palais. Si le temple tombe, le bouclier tombe. Le Cercle l'a compris — ils concentrent leurs forces sur le quartier du temple. Le Grand Prêtre Alduin tient bon mais il ne tiendra pas éternellement.`, tone: 'désespéré' }
        ]
      },
      {
        npcId: 'npc_queen_elara_siege',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Audience de guerre', text: `*Elle est debout, pas assise. Sa couronne est posée sur la table de guerre, à côté d'une épée. Ses yeux sont durs comme du diamant.* Vous êtes revenus. Je ne l'espérais plus. *Pause.* Seraphina nous a trahis. Je sais. J'aurais dû voir les signes. Ce poids est le mien à porter. Mais maintenant, il y a des gens à sauver. Mes gens. *Sa voix tremble, puis se raffermit.* Que faisons-nous ?`, tone: 'royale brisée, déterminée' },
          { trigger: 'Les civils', text: `*Pour la première fois, la Reine montre une faille.* Il y a des enfants dans les caves du quartier bas. Des familles entières. Si le Cercle entre dans la ville... *Elle ferme les yeux.* Je me battrai jusqu'au dernier souffle. Mais sauvez les enfants d'abord. C'est un ordre. Le seul qui compte vraiment.`, tone: 'vulnérable, maternelle' }
        ]
      }
    ],
    objectives: [
      { description: 'Atteindre Sol-Aureus assiégé', type: 'explore', optional: false },
      { description: 'Recevoir le briefing du Général Marcus', type: 'talk', optional: false },
      { description: 'CHOIX : Choisir DEUX missions sur trois', type: 'choice', optional: false }
    ],
    transitions: [
      { condition: 'Évacuation + Bélier choisis', nextScene: 'ch7_s2_evacuation', label: '-> Évacuation puis Bélier' },
      { condition: 'Évacuation + Temple choisis', nextScene: 'ch7_s2_evacuation', label: '-> Évacuation puis Temple' },
      { condition: 'Bélier + Temple choisis', nextScene: 'ch7_s3_belier', label: '-> Bélier puis Temple' }
    ],
    estimatedMinutes: 20,
    mood: 'apocalypse — effondrement du monde connu',
    music: 'Siège épique — tambours de guerre, cris, craquements de pierre, cuivres graves',
    location: 'Sol-Aureus — Ville Assiégée'
  },
  {
    id: 'ch7_s2_evacuation',
    chapterId: 'ch7',
    sceneNumber: 2,
    title: 'Les Tunnels de l\'Espoir',
    type: 'combat',
    readAloud: `Les tunnels sous Sol-Aureus n'ont jamais été conçus pour trois mille personnes. L'air est étouffant, saturé de poussière et de peur. Des familles entières avancent dans le noir, éclairées par des torches tremblantes. Des enfants pleurent. Des vieillards s'appuient sur les murs. Une femme porte deux bébés dans ses bras en priant à voix basse.

Le Sergent Kira, une femme aux cheveux courts et au regard d'acier, organise la colonne avec une efficacité désespérée : "Avancez ! Pas de bagages ! Vos vies valent plus que vos possessions ! AVANCEZ !"

Puis, des profondeurs du tunnel, un grondement. Des ombres qui bougent contre le flux de lumière. Et des yeux rouges — une douzaine — qui s'allument dans le noir devant vous. Les éclaireurs d'ombre du Cercle ont trouvé les tunnels.

Le Sergent Kira dégaine son épée et se place entre les ombres et les civils. "Protégez la colonne," siffle-t-elle entre ses dents serrées. "Pas un ne passe. PAS UN."`,
    gmNotes: `COMBAT DE PROTECTION — Les joueurs doivent défendre 3000 civils en mouvement.

MÉCANIQUE :
- La colonne avance de 20m par tour
- Le tunnel fait 500m au total
- Les éclaireurs d'ombre attaquent en 3 vagues, à 100m, 250m et 400m
- Les joueurs forment l'arrière-garde

VAGUES :
1. 6x Éclaireur d'Ombre (CR 3) — rapides, essaient de contourner les joueurs pour atteindre les civils
2. 2x Traqueur d'Ombre (CR 6) — invisibles, attaquent les civils les plus faibles
3. 1x Ombre Majeure (CR 8) + 4x Éclaireurs (CR 3) — dernière ligne de défense du Cercle

PERTES CIVILES :
- Si les joueurs gèrent parfaitement : 0 pertes
- Chaque ennemi qui atteint la colonne : 1d10 civils blessés ou tués
- Maximum : si tout échoue, jusqu'à 200 pertes

COACHING : C'est un combat où l'échec a un visage. Chaque ombre qui passe les joueurs tue des gens — décrivez-le. Un vieil homme qui s'effondre. Un enfant qui hurle. Rendez chaque échec personnel et chaque succès vital.

Le Sergent Kira est héroïque mais pas invincible. Si un joueur ne la protège pas spécifiquement lors de la vague 3, elle est gravement blessée.`,
    dialogues: [
      {
        npcId: 'npc_kira',
        npcName: 'Sergent Kira',
        lines: [
          { trigger: 'Avant le combat', text: `*Elle vérifie sa lame, méthodique.* J'ai fait évacuer des villages. Des hameaux. Jamais une capitale. *Regard vers la colonne.* Il y a des enfants là-dedans. Des bébés. *Sa mâchoire se serre.* On les sort de là. Tous. Ou on meurt en essayant. Il n'y a pas de troisième option.`, tone: 'acier pur' },
          { trigger: 'Pendant vague 2 (Traqueurs invisibles)', text: `*Un cri dans la colonne.* INVISIBLES ! Ils sont INVISIBLES ! *Elle lance de la farine dans l'air pour révéler les contours.* Là ! À trois heures ! Frappez les empreintes dans la farine !`, tone: 'tactique sous pression' },
          { trigger: 'Si blessée', text: `*À genoux, une griffe d'ombre dans l'épaule.* C'est... rien. *Elle se relève en grognant.* J'ai vu pire. *Elle n'a pas vu pire.* La colonne avance ? Bien. C'est tout ce qui compte.`, tone: 'bravade douloureuse' }
        ]
      }
    ],
    objectives: [
      { description: 'Protéger la colonne de civils dans les tunnels', type: 'combat', optional: false },
      { description: 'Vaincre les 3 vagues d\'éclaireurs d\'ombre', type: 'combat', optional: false },
      { description: 'Minimiser les pertes civiles', type: 'special', optional: false },
      { description: 'Protéger le Sergent Kira', type: 'combat', optional: true }
    ],
    transitions: [
      { condition: 'Évacuation réussie, direction deuxième mission choisie', nextScene: 'ch7_s3_belier', label: '-> Détruire le Bélier d\'Ombre', alternative: 'ch7_s4_temple_defense' }
    ],
    skillChecks: [
      { skill: 'Perception', dc: 16, success: 'Vous repérez les Traqueurs invisibles grâce aux micro-perturbations dans la poussière. Pas de surprise.', failure: 'Les Traqueurs frappent les civils avant que vous ne puissiez réagir.' },
      { skill: 'Intimidation', dc: 14, success: 'Votre cri de guerre fait reculer un groupe d\'éclaireurs, vous gagnant un tour supplémentaire pour repositionner la défense.', failure: 'Les éclaireurs d\'ombre ne connaissent pas la peur.' },
      { skill: 'Athlétisme', dc: 15, success: 'Vous créez un goulot d\'étranglement en bloquant un passage, forçant les ennemis à vous affronter en file indienne.', failure: 'Les ombres se glissent par les fissures dans les murs, contournant votre position.' }
    ],
    encounters: ['6x Éclaireur d\'Ombre (CR 3)', '2x Traqueur d\'Ombre (CR 6)', '1x Ombre Majeure (CR 8)', '4x Éclaireur d\'Ombre (CR 3)'],
    estimatedMinutes: 30,
    mood: 'protection désespérée — chaque vie compte',
    music: 'Course contre la montre — percussion urgente, pleurs d\'enfants, cris de combat étouffés',
    location: 'Sol-Aureus — Tunnels d\'Évacuation Souterrains'
  },
  {
    id: 'ch7_s3_belier',
    chapterId: 'ch7',
    sceneNumber: 3,
    title: 'Le Bélier d\'Ombre',
    type: 'combat',
    readAloud: `Le camp est du Cercle des Cendres est un cauchemar organisé. Des tentes de cuir noir, des feux de camp qui brûlent vert, des soldats en armure de cendres qui marchent au pas avec une discipline terrifiante. Et au centre, le Bélier d'Ombre.

C'est une abomination d'ingénierie et de magie noire. Un mécanisme de siège haut de dix mètres, fait d'os de créatures gigantesques soudés par de l'essence d'ombre solidifiée. Sa tête est un crâne de dragon — un vrai crâne, arraché à un ancien dragon et rempli d'énergie nécrotique comprimée. Quand il frappera les murs de Sol-Aureus, rien ne tiendra.

L'Archon qui le garde se tient au sommet du Bélier, bras croisés. C'est un colosse en armure noire intégrale — l'Archon Vexor, dit "le Boucher de Fer". Sa réputation le précède : il a rasé trois villages à lui seul lors de la campagne des Terres Brûlées.

Il vous voit approcher et rit. Un rire qui résonne dans son casque comme dans une tombe. "Enfin," dit-il. "Du sport."`,
    gmNotes: `COMBAT DE SABOTAGE + BOSS

OBJECTIF : Détruire le Bélier d'Ombre avant qu'il ne soit utilisé.

LE BÉLIER :
- 300 PV, Vulnérable aux dégâts radieux, Résistant aux dégâts nécrotiques
- Peut être détruit par : attaques directes (long), sabotage des 3 noyaux d'énergie (rapide), ou explosion contrôlée (très rapide mais dangereux)
- Les 3 noyaux sont des cristaux d'ombre enchâssés dans la structure. Chacun a 40 PV.

L'ARCHON VEXOR (CR 10) :
- Guerrier-sorcier. Armure intégrale enchantée. Deux haches d'ombre.
- Actions : Double attaque (+10, 2d12+6 + 1d8 nécrotique), Cri de Terreur (DD Sagesse 17, zone 10m), Pas d'Ombre (téléportation bonus 10m)
- Trait : Fureur du Boucher — quand il tombe sous 50% PV, il gagne une attaque supplémentaire et ses yeux brûlent de rouge.
- Vexor n'est PAS subtil. C'est une force brute, un mur de violence. Il fonce dans le tas.

MÉCANIQUE :
- Les joueurs doivent diviser leurs efforts : certains combattent Vexor, d'autres sabotent le Bélier
- 2d6 Soldats du Cercle (CR 1/2) arrivent en renfort tous les 3 tours
- Le Bélier est programmé pour frapper dans 15 tours (2.5 minutes en jeu). Compte à rebours.

SI LE BÉLIER EST DÉTRUIT : Les murs de Sol-Aureus tiennent. Le siège se prolonge mais la ville ne tombe pas encore.
SI LE BÉLIER FRAPPE : Un pan de mur s'effondre. Le Cercle entre dans la ville. La situation devient critique.`,
    dialogues: [
      {
        npcId: 'npc_vexor',
        npcName: 'Archon Vexor, le Boucher de Fer',
        lines: [
          { trigger: 'Avant le combat', text: `*Il saute du Bélier, atterrissant dans un craquement de métal. Il fait une tête de plus que le plus grand d'entre vous.* Les fameux héros de Sol-Aureus. Seraphina m'a parlé de vous. *Il dégaine ses deux haches.* Elle m'a dit que vous étiez courageux. Moi, je m'en fiche. Courageux ou lâche, ça saigne pareil.`, tone: 'sadique amusé' },
          { trigger: 'Pendant le combat', text: `*Il rit en se battant, chaque coup est une célébration de violence.* OUI ! C'est ÇA que je voulais ! Des adversaires qui se battent ! Pas ces gardes en papier doré ! ENCORE ! FRAPPEZ-MOI ENCORE !`, tone: 'extase de combat' },
          { trigger: 'À 50% PV (Fureur)', text: `*Du sang noir coule de sous son casque. Ses yeux s'embrasent.* Enfin... vous m'avez fait saigner. *Sa voix change, plus grave, plus bestiale.* Maintenant c'est mon tour. *Ses mouvements doublent de vitesse.*`, tone: 'fureur froide' },
          { trigger: 'Vaincu', text: `*À genoux, haches brisées, il rit encore.* Pas mal... pas mal du tout. *Il arrache son casque, révélant un visage couvert de cicatrices rituelles.* Le Bélier n'était que le début. Vous avez gagné une heure. Peut-être deux. *Il crache du sang.* Mais le Maître arrive. Et lui... lui, vous ne l'arrêterez pas.`, tone: 'défi mourant' }
        ]
      }
    ],
    objectives: [
      { description: 'Infiltrer ou attaquer le camp est du Cercle', type: 'combat', optional: false },
      { description: 'Détruire le Bélier d\'Ombre avant qu\'il ne frappe (15 tours)', type: 'special', optional: false },
      { description: 'Vaincre l\'Archon Vexor', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Bélier détruit, Vexor vaincu', nextScene: 'ch7_s5_confrontation', label: '-> Confrontation finale du chapitre' }
    ],
    skillChecks: [
      { skill: 'Discrétion', dc: 17, success: 'Vous approchez le camp sans être détectés. Un tour gratuit pour saboter le Bélier avant que Vexor ne réagisse.', failure: 'Les sentinelles vous repèrent. L\'alarme est donnée. Vexor descend du Bélier immédiatement.' },
      { skill: 'Arcanes', dc: 16, success: 'Vous identifiez les noyaux d\'énergie du Bélier. Chaque noyau détruit réduit ses PV de 100.', failure: 'Le Bélier est complexe. Vous devrez le détruire à la force brute.' },
      { skill: 'Investigation', dc: 15, success: 'Vous trouvez des barils d\'huile d\'alchimiste dans le camp. Allumés sous le Bélier, ils infligent 10d6 dégâts de feu à la machine en 2 tours.', failure: 'Les réserves du camp ne semblent pas exploitables.' }
    ],
    encounters: ['1x Archon Vexor, le Boucher de Fer (CR 10)', '2d6 Soldats du Cercle (CR 1/2, renforts)', '1x Bélier d\'Ombre (objectif de destruction)'],
    loot: ['Hache d\'Ombre de Vexor (arme rare, +2, 1d8 nécrotique supplémentaire)', 'Plans de Bataille du Cercle (révèlent la prochaine cible)', 'Noyau d\'Ombre (composant légendaire)'],
    estimatedMinutes: 35,
    mood: 'action frénétique — contre la montre',
    music: 'Combat épique — percussions massives, cuivres guerriers, compte à rebours tendu',
    location: 'Périphérie de Sol-Aureus — Camp Est du Cercle des Cendres'
  },
  {
    id: 'ch7_s4_temple_defense',
    chapterId: 'ch7',
    sceneNumber: 4,
    title: 'La Dernière Lumière',
    type: 'combat',
    readAloud: `Le Temple de Solarius brûle. Pas complètement — pas encore — mais les flammes noires du Cercle lèchent ses murs blancs comme des langues de serpent. Le vitrail principal, représentant Solarius terrassant l'Ombre, est fissuré — un présage que personne ne veut interpréter.

Le Grand Prêtre Alduin se tient sur les marches du temple, seul, face à une marée d'ennemis. Sa robe blanche est tachée de sang — le sien et celui des autres. Son bâton brille d'une lumière qui faiblit à chaque minute. Autour de lui, les corps de six templiers tombés au combat.

"Le bouclier," halète-t-il en vous voyant. "Le bouclier de la Reine est alimenté par le Coeur du Temple. Si le Coeur tombe, le bouclier tombe. Si le bouclier tombe..." Il n'a pas besoin de finir.

Derrière lui, à travers les portes entrouvertes du temple, vous apercevez le Coeur de Solarius — un soleil miniature suspendu dans l'air, pulsant d'une lumière dorée de plus en plus faible. Et dans les rues autour du temple, les forces du Cercle se rassemblent pour l'assaut final.`,
    gmNotes: `DÉFENSE DE POSITION — 5 vagues, le temple doit tenir.

SI CETTE MISSION N'EST PAS CHOISIE : Le temple tombe. Le bouclier se brise. Le Cercle entre dans le quartier royal. La Reine est évacuée de justesse mais le Palais est perdu. Conséquence massive pour l'Acte IV.

MÉCANIQUE DE DÉFENSE :
- Le Coeur de Solarius a 100 PV
- Les ennemis qui atteignent le Coeur lui infligent des dégâts
- Le Grand Prêtre Alduin aide (soins, bénédictions, lumière) mais est épuisé (50% PV max)
- Les joueurs peuvent utiliser l'architecture du temple (colonnes, bancs, escaliers) comme défense

VAGUES :
1. 8x Cultistes (CR 1) — test
2. 4x Démons d'Ombre (CR 3) + 4x Cultistes — la pression monte
3. 2x Chevaliers d'Ombre (CR 6) — percée
4. 1x Ombre Ecclésiastique (CR 8, clerc d'ombre) + 6x Cultistes — le contraire d'Alduin
5. Boss : Archon Nyxara, Tisseuse d'Ombres (CR 10) — elle veut le Coeur personnellement

ENTRE LES VAGUES : 1 tour de répit pour se soigner, se repositionner, parler.

LE GRAND PRÊTRE ALDUIN : C'est ici que la mort d'un allié peut survenir. Si les joueurs ne le protègent pas activement lors de la vague 5, Alduin se sacrifie pour protéger le Coeur — il canalise toute sa force vitale dans le bouclier, le sauvant mais mourant dans le processus. C'est un moment dévastateur. Jouez-le avec respect.`,
    dialogues: [
      {
        npcId: 'npc_alduin',
        npcName: 'Grand Prêtre Alduin',
        lines: [
          { trigger: 'Accueil', text: `*Il s'appuie sur son bâton, au bord de l'effondrement.* Solarius m'a envoyé un dernier miracle. Vous. *Il essaie de sourire.* Six de mes templiers sont morts. Six. Ce matin, ils priaient. Ce soir, je prie pour eux.`, tone: 'brisé mais debout' },
          { trigger: 'Entre les vagues', text: `*Il soigne vos blessures, ses mains tremblant d'épuisement.* Quand j'ai prononcé mes voeux, on m'a dit que la foi était une armure. *Petit rire amer.* On ne m'a pas dit que l'armure pouvait rouiller. Mes sorts faiblissent. Ma lumière vacille. Mais tant qu'il me reste un souffle, ce temple tient.`, tone: 'vulnérable, déterminé' },
          { trigger: 'Vague 5 — si les joueurs ne peuvent pas le protéger', text: `*Nyxara brise ses défenses. La lame d'ombre s'enfonce dans son flanc. Il tombe à genoux mais ses mains se posent sur le sol du temple.* Non... pas... aujourd'hui. *Sa lumière explose — pas depuis son bâton, depuis son coeur. Son corps entier brille d'un or aveuglant.* La lumière... ne meurt pas. Elle change... de forme. *Le bouclier du temple se renforce brutalement. Le corps d'Alduin s'effondre, un sourire paisible sur ses lèvres.*`, tone: 'sacrifice ultime — sérénité dans la mort' },
          { trigger: 'Si les joueurs le sauvent', text: `*Haletant, soutenu par un joueur, couvert de sang.* Vous... vous m'avez sauvé. *Des larmes coulent.* Je pensais mourir ici. J'étais prêt. *Il regarde le Coeur, toujours brillant.* Mais la lumière brille un jour de plus. Grâce à vous. *Sa voix se brise.* Merci. Du fond de mon âme. Merci.`, tone: 'gratitude absolue' }
        ]
      },
      {
        npcId: 'npc_nyxara',
        npcName: 'Archon Nyxara, Tisseuse d\'Ombres',
        lines: [
          { trigger: 'Apparition', text: `*Elle se matérialise depuis les ombres du temple — une femme d'une beauté glaciale, des yeux entièrement noirs, des mains qui tissent des fils d'obscurité.* Le Coeur de Solarius. Tant de lumière gaspillée pour une foi morte. *Elle tend la main.* Donnez-le moi. Épargnez-vous la souffrance.`, tone: 'séduction ténébreuse' },
          { trigger: 'Combat', text: `*Ses ombres dansent comme des lames.* Seraphina avait raison sur un point : vous êtes obstinés. *Un voile de ténèbres enveloppe le temple.* Mais l'obstination ne protège pas des ténèbres.`, tone: 'mépris élégant' },
          { trigger: 'Vaincue', text: `*Les ombres se dissipent autour d'elle. Elle tombe, une expression de surprise sur son visage.* Impossible... la lumière ne devrait pas être si forte... *Elle regarde le Coeur.* Qu'est-ce qui vous rend si... *Elle ne finit pas. Les ombres l'emportent.*`, tone: 'incrédulité' }
        ]
      }
    ],
    objectives: [
      { description: 'Défendre le Temple de Solarius contre 5 vagues d\'ennemis', type: 'combat', optional: false },
      { description: 'Protéger le Coeur de Solarius (100 PV)', type: 'special', optional: false },
      { description: 'Vaincre l\'Archon Nyxara', type: 'combat', optional: false },
      { description: 'Sauver le Grand Prêtre Alduin (critique !)', type: 'special', optional: true }
    ],
    transitions: [
      { condition: 'Temple défendu, direction confrontation finale', nextScene: 'ch7_s5_confrontation', label: '-> Confrontation finale du chapitre' }
    ],
    skillChecks: [
      { skill: 'Religion', dc: 16, success: 'Vous canalisez la lumière résiduelle du temple dans vos armes. +1d8 dégâts radieux pendant toute la défense.', failure: 'L\'énergie sacrée est trop diffuse pour être canalisée.' },
      { skill: 'Tactique (Intelligence)', dc: 15, success: 'Vous identifiez les points de défense optimaux : les colonnes créent des goulets d\'étranglement, les escaliers offrent un avantage en hauteur.', failure: 'Vous vous battez en terrain ouvert, désavantagé.' },
      { skill: 'Médecine', dc: 14, success: 'Vous stabilisez Alduin entre deux vagues. Il peut lancer un sort supplémentaire pendant la prochaine vague.', failure: 'Alduin continue de se vider de ses forces. Il sera plus faible lors de la vague suivante.' }
    ],
    encounters: ['8x Cultiste (CR 1)', '4x Démon d\'Ombre (CR 3)', '2x Chevalier d\'Ombre (CR 6)', '1x Ombre Ecclésiastique (CR 8)', '1x Archon Nyxara (CR 10)'],
    loot: ['Bénédiction de Solarius (avantage aux jets de Sagesse pendant 24h)', 'Bâton d\'Alduin (si mort — relique, +2 sorts de guérison)', 'Fil d\'Ombre de Nyxara (composant rare)'],
    estimatedMinutes: 40,
    mood: 'défense héroïque — sacrifice et lumière',
    music: 'Sacré sombre — orgue, choeur, progression de l\'obscurité à la lumière, silence lors du sacrifice',
    location: 'Sol-Aureus — Temple de Solarius'
  },
  {
    id: 'ch7_s5_confrontation',
    chapterId: 'ch7',
    sceneNumber: 5,
    title: 'Les Cendres de l\'Aube',
    type: 'narration',
    readAloud: `Le lendemain, le siège est levé — non pas parce que le Cercle a été vaincu, mais parce qu'il a obtenu ce qu'il voulait. Pendant que vous combattiez, pendant que Sol-Aureus brûlait, le Cercle des Cendres a frappé ailleurs. Un messager arrive, titubant, couvert de poussière : le Sceau des Montagnes, à Hammerdeep, a été brisé cette nuit. L'armée du Cercle n'était qu'une distraction.

Le monde bascule.

Vous vous tenez sur les remparts de Sol-Aureus, regardant l'armée du Cercle se retirer en bon ordre. Pas une retraite — un repli stratégique. Ils n'avaient pas besoin de prendre la ville. Ils avaient besoin de vous occuper.

Autour de vous, les ruines fument. Le quartier marchand est détruit. Le mur est a tenu — grâce à vous — mais le mur nord est fragilisé. Et le bilan humain... le Général Marcus vous le donne d'une voix morte : deux cent trente-sept morts. Huit cents blessés. Des familles brisées.

Et le Grand Prêtre Alduin...

Si Alduin est mort, son corps repose dans le temple qu'il a sauvé de sa vie. Des centaines de personnes défilent devant lui, déposant des fleurs de lumière qui ne fanent jamais. La Reine Elara elle-même se tient à genoux devant son corps, en silence.

Le monde est plus sombre aujourd'hui qu'il ne l'a jamais été depuis la chute de l'Hégémonie. Les Sceaux tombent un par un. Le Cercle avance. Des alliés sont morts ou se sont révélés traîtres.

Mais vous êtes toujours debout.

Et parfois, c'est suffisant.`,
    gmNotes: `SCÈNE DE CONCLUSION DE L'ACTE III. Pas de combat. Pas de mécaniques. Juste de l'émotion.

COACHING POUR LE MJ — C'est la scène la plus importante de l'acte :

1. CONSÉQUENCES : Récapitulez TOUTES les conséquences des choix des joueurs :
   - Ch5 : Sceau de la Nature sauvé ou brisé ?
   - Ch6 : Léviathan purifié ou tué ? Sceau de la Mer restauré ou brisé ?
   - Ch7 : Quelles missions ont été choisies ? Pertes civiles ? Alduin vivant ou mort ?
   Chaque choix a des répercussions pour l'Acte IV. Notez-les soigneusement.

2. DEUIL : Si Alduin est mort, donnez aux joueurs le temps de vivre ce deuil. Ne passez pas à la suite trop vite. Laissez les personnages parler, pleurer, être en colère. Le deuil en JDR est un outil narratif puissant.

3. LA MISSION NON-CHOISIE : Rappelez aux joueurs ce qui s'est passé avec la mission qu'ils n'ont pas choisie :
   - Évacuation non-choisie : 300 civils n'ont pas pu fuir. Certains sont morts dans les tunnels.
   - Bélier non-détruit : Le mur est s'est effondré. Le quartier est est occupé par le Cercle.
   - Temple non-défendu : Le bouclier a failli. Le Palais a été endommagé. La Reine a été blessée.

4. RÉCOMPENSES : Malgré tout, les joueurs ont gagné. Ils ont tenu. Distribuez :
   - Niveau supérieur (transition vers Acte IV)
   - Titre : Défenseurs de Sol-Aureus
   - Équipement du Général Marcus (armes améliorées)
   - Réputation massive auprès de toutes les factions alliées

5. L'ACCROCHE VERS L'ACTE IV : Le messager qui annonce la chute de Hammerdeep est l'accroche. La guerre est maintenant ouverte. Plus de missions de héros solitaires — c'est une guerre totale.`,
    dialogues: [
      {
        npcId: 'npc_general_marcus_final',
        npcName: 'Général Marcus',
        lines: [
          { trigger: 'Bilan', text: `*Il est assis pour la première fois depuis que vous le connaissez. Son épée est posée par terre. Ses mains tremblent.* Deux cent trente-sept. C'est le chiffre. *Silence.* Chacun avait un nom. Une famille. Des rêves. *Il vous regarde.* Grâce à vous, le chiffre n'est pas deux mille. Mais ça ne console personne ce soir.`, tone: 'dévasté mais reconnaissant' },
          { trigger: 'La suite', text: `*Il se lève lentement, remet son épée au fourreau.* La guerre est ouverte. Plus de missions secrètes. Plus d'enquêtes dans les égouts. *Sourire fantôme.* Comme le temps passe, hein ? Du Dragon Rouillé à... ça. *Il serre votre épaule.* Reposez-vous. Demain, on planifie la contre-attaque. Parce qu'il y AURA une contre-attaque. Je vous le promets.`, tone: 'résolu' }
        ]
      },
      {
        npcId: 'npc_queen_elara_final',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Discours depuis les remparts', text: `*Elle s'adresse à la ville. Sa voix porte, claire et ferme, malgré les cernes et le bandage à son bras.* Sol-Aureus brûle. Nos murs sont fissurés. Nos amis sont tombés. *Pause.* Mais nous sommes debout. *Sa voix monte.* Ils voulaient nous briser ? Regardez-nous. REGARDEZ-NOUS. Nous sommes encore là. Et tant qu'un seul d'entre nous respire, cette ville ne tombera pas.`, tone: 'royale, féroce, inspirante' },
          { trigger: 'En privé, aux héros', text: `*Elle retire sa couronne et la pose sur la table. Sans elle, elle a l'air jeune. Trop jeune pour porter le poids du monde.* Je suis terrifiée. *Aveu simple, sans artifice.* Chaque nuit, je vois les murs tomber et je ne peux rien faire. Mais le matin, je remets la couronne et je fais semblant d'être courageuse. Parce que c'est ce dont ils ont besoin. *Elle vous regarde.* Vous... vous n'avez pas besoin de faire semblant. Vous ÊTES courageux. Ne l'oubliez jamais.`, tone: 'intime, vulnérable, sincère' }
        ]
      },
      {
        npcId: 'npc_brok_epilogue',
        npcName: 'Brok le Tavernier',
        lines: [
          { trigger: 'Au Dragon Rouillé (un mur manque)', text: `*Il sert de la bière dans des chopes fêlées, dans une taverne dont un mur est en ruines. Mais il sert.* Bah. C'est juste un mur. J'en ai construit un avant, j'en construirai un autre. *Il vous sert une pinte.* Celle-là, c'est gratuit. Pour les héros. *Pause.* Le vieux Sam est en vie. Il guide les réfugiés dans les tunnels. À son âge. *Il renifle.* Ce vieux fou.`, tone: 'résilient, ému' }
        ]
      }
    ],
    objectives: [
      { description: 'Faire le bilan de la bataille de Sol-Aureus', type: 'special', optional: false },
      { description: 'Vivre les conséquences des choix effectués', type: 'special', optional: false },
      { description: 'Se recueillir pour les morts (si Alduin est tombé)', type: 'special', optional: true },
      { description: 'Recevoir le briefing sur la chute de Hammerdeep', type: 'talk', optional: false }
    ],
    transitions: [
      { condition: 'FIN DE L\'ACTE III — Transition vers l\'Acte IV : La Guerre des Sceaux', nextScene: 'ch8_s1_conseil_guerre', label: '-> Acte IV, Chapitre 8 : Conseil de Guerre' }
    ],
    estimatedMinutes: 25,
    mood: 'deuil combatif — victoire amère, espoir fragile',
    music: 'Élégie — piano seul d\'abord, puis cordes, puis cuivres, montée progressive vers l\'espoir',
    location: 'Sol-Aureus — Remparts et Palais Royal'
  }
];

// ============================================================================
// EXPORT
// ============================================================================

export const NARRATIVE_SCENES_ACT3: NarrativeScene[] = CH5_SCENES;
