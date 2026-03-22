/**
 * GUIDE NARRATIF — ACTE 5 : L'AUBE NOUVELLE
 * Chapitres 11-13, Niveaux 16-20
 * Le grand finale de la campagne Les Sceaux Brisés
 */

import type { NarrativeScene } from './narrative-guide-data';

// ============================================================================
// CHAPITRE 11 : LA MARCHE DES HÉROS (Niveau 16-17)
// ============================================================================

const CH11_SCENES: NarrativeScene[] = [
  {
    id: 'ch11_s1_rassemblement',
    chapterId: 'ch11',
    sceneNumber: 1,
    title: 'Le Rassemblement des Bannières',
    type: 'narration',
    readAloud: `L'aube se lève sur la plaine de Val-Espoir, et le monde entier semble y avoir répondu.

Des milliers de feux de camp scintillent dans la brume matinale comme des étoiles tombées du ciel. Les bannières claquent dans le vent — le Soleil d'Or de Sol-Aureus aux côtés du Marteau de Hammerdeep, les branches entrelacées de Sylvandis près des voiles bleues de la Ligue Maritime. Des bannières que personne n'aurait cru voir côte à côte, unies pour la première — et peut-être la dernière — fois.

Vous vous tenez sur la colline de commandement, entourés de ceux qui sont devenus bien plus que des alliés. Le Général Marcus vérifie ses cartes d'un air grave. La Reine Elara, en armure d'apparat, observe ses troupes avec une fierté mêlée d'angoisse. Et partout, des visages familiers — des gens que vous avez sauvés, aidés, parfois perdus et retrouvés au fil de cette longue route.

Au sud, l'horizon est noir. Les Terres Brûlées attendent, comme une plaie ouverte dans le monde. Et au-delà, quelque part dans cette désolation, le Nexus des Sceaux.

C'est l'heure.`,
    gmNotes: `C'est l'ouverture de l'acte final. Prenez votre temps. Laissez les joueurs absorber l'ampleur de ce moment — tout ce qu'ils ont fait dans les actes précédents converge ici. Chaque alliance forgée, chaque faction ralliée se traduit par des unités présentes sur le champ. Si les joueurs ont échoué à rallier certaines factions, leur absence est visible et commentée.

Faites le tour des PNJ importants — chacun a un mot pour les héros. C'est le dernier moment de paix avant la tempête. Laissez les joueurs interagir librement, dire ce qu'ils veulent dire. Certains ne reviendront pas.

Mécaniquement, évaluez la Force de l'Alliance selon les actes précédents :
- Toutes les factions ralliées : Armée Complète (bonus aux jets de guerre)
- 3-4 factions : Armée Suffisante (pas de modificateur)
- Moins de 3 : Armée Fragile (malus, pertes lourdes en route)`,
    dialogues: [
      {
        npcId: 'npc_general_marcus',
        npcName: 'Général Marcus',
        lines: [
          { trigger: 'Stratégie', text: `*Il pointe la carte étalée sur la table de commandement.* La Marche prendra quatre jours à travers les Cendres. Nous avançons en trois colonnes — nains au centre, cavalerie sur les flancs, mages en arrière-garde. Les éclaireurs elfes ouvrent la route. *Il lève les yeux vers vous.* Mais nous savons tous que les plans ne survivent pas au premier contact avec l'ennemi. C'est pourquoi vous serez notre fer de lance.`, tone: 'déterminé' },
          { trigger: 'Adieu', text: `*Il serre votre main, longuement.* Quand je vous ai recrutés dans cette taverne... un groupe d'aventuriers pour nettoyer des égouts. *Il rit doucement.* Si on m'avait dit que vous mèneriez un jour la plus grande armée qu'Aethelgard ait jamais vue... J'aurais dit que la bière de Brok était trop forte. *Son regard se durcit.* Faites honneur à tous ceux qui ne sont plus là pour marcher avec nous.`, tone: 'ému' }
        ]
      },
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Avant la marche', text: `*Elle se tient droite dans son armure, mais ses yeux trahissent l'ampleur du fardeau.* J'ai relu les chroniques de la Grande Guerre hier soir. L'Alliance des Sept avait mis un an à rassembler ses forces. Nous, nous l'avons fait en quelques mois. *Elle vous regarde.* Grâce à vous. Chaque porte que vous avez ouverte, chaque main que vous avez tendue — c'est tout cela qui se tient ici aujourd'hui.`, tone: 'reconnaissante' },
          { trigger: 'Promesse', text: `*Sa voix baisse.* Je ne vous demanderai pas de revenir vivants. Ce serait insulter votre intelligence. Mais je vous demande ceci : quoi qu'il arrive au-delà de ces cendres, n'oubliez pas pourquoi vous vous battez. Pas pour une couronne. Pas pour de l'or. Pour chaque enfant qui s'endort ce soir sans savoir que le monde est en danger. Pour le droit d'avoir un lendemain.`, tone: 'solennelle' }
        ]
      }
    ],
    objectives: [
      { description: 'Assister au rassemblement de l\'armée alliée', type: 'explore', optional: false },
      { description: 'Faire le tour des alliés et PNJ importants', type: 'talk', optional: false },
      { description: 'Évaluer la force de l\'alliance selon les choix passés', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Les héros donnent le signal du départ', nextScene: 'ch11_s2_discours', label: '→ Le discours avant la marche' }
    ],
    estimatedMinutes: 25,
    mood: 'épique, mélancolique',
    music: 'Orchestre — thème principal en mineur, cuivres lointains, chœur discret',
    location: 'Plaine de Val-Espoir — Campement de l\'Alliance'
  },
  {
    id: 'ch11_s2_discours',
    chapterId: 'ch11',
    sceneNumber: 2,
    title: 'Le Discours du Héros',
    type: 'choice',
    readAloud: `L'armée est rassemblée. Des milliers de visages se tournent vers la colline où vous vous tenez. Le silence tombe, lourd et solennel, brisé seulement par le claquement des bannières dans le vent.

La Reine Elara s'avance, mais elle se retourne vers vous et, d'un geste simple, vous cède la parole. Ce n'est pas son discours à prononcer. C'est le vôtre.

Des milliers d'yeux vous fixent. Des guerriers nains aux barbes tressées de fer, des archers elfes au regard millénaire, des paysans en armure de fortune qui ont pris les armes pour la première fois, des mages dont les mains crépitent d'énergie. Tous attendent vos mots.

Le vent se calme. Le monde retient son souffle.`,
    gmNotes: `C'est LE moment pour les joueurs de briller en roleplay. Laissez-les composer leur discours. Chaque joueur peut contribuer. Ne les pressez pas — c'est un moment fondateur.

Si les joueurs sont intimidés, proposez-leur des amorces :
- "Qu'est-ce que vos personnages diraient à des gens qui vont peut-être mourir ?"
- "Quel souvenir de votre aventure résume pourquoi vous vous battez ?"

Mécaniquement, le discours affecte le moral de l'armée :
- Discours inspirant (Persuasion DC 18 ou bon RP) : Moral Exalté — bonus de +2 aux jets de guerre
- Discours correct : Moral Stable — pas de modificateur
- Discours raté ou absent : Moral Fragile — malus de -1

Bonus : si les joueurs mentionnent des alliés tombés ou des victoires passées, accordez l'Inspiration à tout le groupe.`,
    dialogues: [
      {
        npcId: 'npc_army_reaction',
        npcName: 'Réaction de l\'Armée',
        lines: [
          { trigger: 'Discours réussi', text: `Un silence. Puis un rugissement. Des milliers de voix s'élèvent comme un tonnerre — martelant leurs boucliers, frappant le sol de leurs bottes, hurlant votre nom. Le son roule sur la plaine comme une vague, et pendant un instant, la terreur des Terres Brûlées semble... petite.`, tone: 'exalté' },
          { trigger: 'Discours moyen', text: `Des hochements de tête, des murmures d'approbation. Les soldats se redressent, échangent des regards déterminés. Ce n'est pas de l'euphorie, mais c'est de la résolution. Ça suffira.`, tone: 'stoïque' },
          { trigger: 'Pas de discours', text: `Le silence se prolonge, gênant. La Reine Elara finit par prendre la parole elle-même, avec des mots nobles mais impersonnels. Les soldats obéissent, mais leurs yeux cherchent les héros, et n'y trouvent pas la flamme qu'ils espéraient.`, tone: 'déçu' }
        ]
      }
    ],
    objectives: [
      { description: 'Prononcer un discours devant l\'armée alliée', type: 'special', optional: false },
      { description: 'Inspirer les troupes (Persuasion DC 18 ou bon roleplay)', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Le discours est terminé', nextScene: 'ch11_s3_marche', label: '→ La Marche commence' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 18, success: 'L\'armée rugit — Moral Exalté. +2 aux jets de guerre pour toute la campagne finale.', failure: 'Les troupes sont résolues mais pas galvanisées. Moral Stable.' },
      { skill: 'Intimidation', dc: 16, success: 'Vous ne les inspirez pas par l\'espoir mais par la peur de l\'alternative. Efficace. Moral Stable+.', failure: 'Le ton martial tombe à plat devant des civils armés.' },
      { skill: 'Représentation', dc: 15, success: 'Un chant, un poème, un cri de guerre — l\'art touche là où les mots échouent. Moral Exalté.', failure: 'Belle tentative, mais la peur l\'emporte sur l\'art.' }
    ],
    estimatedMinutes: 20,
    mood: 'épique, solennel',
    music: 'Silence puis crescendo orchestral selon le discours',
    location: 'Plaine de Val-Espoir — Colline de Commandement'
  },
  {
    id: 'ch11_s3_marche',
    chapterId: 'ch11',
    sceneNumber: 3,
    title: 'Les Cendres d\'Ashka',
    type: 'exploration',
    readAloud: `La Marche commence.

Pendant deux jours, l'armée traverse des terres de plus en plus désolées. L'herbe cède la place à une terre grise et craquelée. Les arbres deviennent des squelettes calcinés, figés dans des postures de supplication. Le ciel lui-même change — passant du bleu au gris, puis à un orange maladif, comme un coucher de soleil permanent.

Le troisième jour, vous atteignez la Lisière des Cendres. Le sol est noir, vitrifié par un feu ancien qui a brûlé si intensément qu'il a transformé la terre en verre sombre. Rien ne pousse. Rien ne vit. L'air est sec et porte une odeur de soufre et de métal brûlé.

Et pourtant, quelque chose bouge dans les cendres. Des silhouettes, loin à l'horizon, qui observent la colonne. Des éclaireurs de l'ennemi. Malachar sait que vous venez.`,
    gmNotes: `La Marche est l'occasion de scènes de camp mémorables. Chaque soir, proposez des rencontres avec les PNJ :

SOIR 1 — Le Feu de Camp des Souvenirs :
Les compagnons partagent des souvenirs. Laissez chaque joueur raconter un moment marquant de la campagne. Accordez l'Inspiration pour les meilleurs moments de RP.

SOIR 2 — Les Lettres :
Des soldats écrivent des lettres à leurs proches. Un jeune soldat demande à un PJ de promettre de livrer la sienne s'il ne revient pas. Moment émotionnel puissant.

SOIR 3 — La Veille des Armes :
Traditions d'avant-bataille. Les nains chantent. Les elfes méditent. La Reine Elara fait le tour des feux. Dernière nuit avant le combat.

Rencontres aléatoires pendant la Marche (1d6 par jour) :
1-2 : Rien — la désolation elle-même est oppressante
3-4 : Embuscade mineure — Ombres Errantes (6x CR 8)
5 : Piège de terrain — Geyser de Cendres (Dex DC 16, 8d6 feu)
6 : Rencontre spéciale — Fantôme d'Ashka (PNJ pacifique, donne des informations sur le Nexus)`,
    dialogues: [
      {
        npcId: 'npc_soldat_jeune',
        npcName: 'Ewen, Jeune Soldat',
        lines: [
          { trigger: 'La lettre', text: `*Un jeune homme blond, à peine vingt ans, s'approche timidement de votre feu.* Excusez-moi... Vous êtes bien les héros ? Ceux qui ont tout commencé à Sol-Aureus ? *Il tend une enveloppe pliée.* Ma mère tient la boulangerie de la Rue Haute. Si je... enfin, si jamais... vous pourriez lui donner ça ? *Ses mains tremblent.* Elle s'appelle Marta. Dites-lui que j'ai pas eu peur.`, tone: 'tremblant' },
          { trigger: 'Encouragement', text: `*Ses yeux s'illuminent.* Vous croyez vraiment ? *Il serre la lettre contre lui.* Mon père était soldat. Il disait que le courage, c'est pas de ne pas avoir peur — c'est de marcher quand même. *Il se redresse.* Je marcherai. Pour elle. Pour tout le monde. *Il salue maladroitement et s'éloigne.*`, tone: 'déterminé' }
        ]
      },
      {
        npcId: 'npc_fantome_ashka',
        npcName: 'Spectre d\'Ashka',
        lines: [
          { trigger: 'Apparition', text: `*Une silhouette translucide émerge des cendres — une femme en armure ancienne, le visage grave.* Vous marchez sur les os de mon peuple. *Elle regarde l'armée.* L'Hégémonie d'Ashka n'a pas toujours été un empire de ténèbres, vous savez. Nous étions des bâtisseurs. Des rêveurs. Avant que Lui ne vienne.`, tone: 'mélancolique' },
          { trigger: 'Le Nexus', text: `Le Nexus est au cœur de ce qui était notre capitale — Ashka-Prime. Les Sceaux y convergent car c'est là que la barrière a été tissée pour la première fois. *Ses yeux brillent.* Mais prenez garde : le Nexus n'est pas qu'un lieu. C'est un être. Les murs vivent. Les couloirs pensent. Et au centre... au centre, il y a la Porte. La Porte qu'on n'aurait jamais dû ouvrir.`, tone: 'avertissement' }
        ]
      }
    ],
    objectives: [
      { description: 'Traverser les Terres Brûlées avec l\'armée (4 jours)', type: 'explore', optional: false },
      { description: 'Gérer les embuscades et dangers du terrain', type: 'combat', optional: false },
      { description: 'Vivre les scènes de camp avec les PNJ', type: 'talk', optional: true },
      { description: 'Rencontrer le Spectre d\'Ashka (aléatoire)', type: 'talk', optional: true }
    ],
    transitions: [
      { condition: 'L\'armée atteint la Barrière de Cendres', nextScene: 'ch11_s4_embuscade', label: '→ Embuscade aux Portes' },
      { condition: 'Les joueurs explorent en éclaireurs', nextScene: 'ch11_s4_embuscade', label: '→ L\'ennemi frappe' }
    ],
    skillChecks: [
      { skill: 'Survie', dc: 16, success: 'Vous trouvez un chemin sûr à travers les geysers de cendres — l\'armée évite les pertes.', failure: 'L\'avant-garde déclenche un geyser. 2d6 soldats blessés. Le moral baisse.' },
      { skill: 'Perception', dc: 18, success: 'Vous repérez les éclaireurs ennemis à temps — l\'embuscade est anticipée.', failure: 'Les silhouettes disparaissent avant que vous puissiez les identifier.' },
      { skill: 'Histoire', dc: 14, success: 'Vous reconnaissez les ruines d\'Ashka-Prime au loin. Les récits anciens correspondent à ce que vous voyez.', failure: 'Les Terres Brûlées sont un paysage sans repères. L\'orientation est difficile.' }
    ],
    encounters: ['6x Ombre Errante (CR 8)', 'Geyser de Cendres (piège, Dex DC 16, 8d6 feu)'],
    estimatedMinutes: 40,
    mood: 'désolation, fraternité',
    music: 'Marche militaire lente, percussions sourdes, vent',
    location: 'Terres Brûlées — Route vers Ashka-Prime'
  },
  {
    id: 'ch11_s4_embuscade',
    chapterId: 'ch11',
    sceneNumber: 4,
    title: 'L\'Embuscade du Col de Cendres',
    type: 'combat',
    readAloud: `Le Col de Cendres est le seul passage à travers la chaîne de montagnes vitrifiées qui entoure Ashka-Prime. Un défilé étroit, bordé de falaises de verre noir, où l'armée doit avancer en colonne serrée.

C'est exactement le piège que Malachar a préparé.

Le premier signe est un tremblement. Le sol vibre sous vos pieds. Puis les falaises s'animent — des dizaines de créatures d'ombre se détachent de la roche comme si le verre noir accouchait de cauchemars. En haut des crêtes, des silhouettes encapuchonnées — les derniers cultistes de Malachar — entament des incantations.

Et là, au bout du col, une forme massive bloque le passage. Un Colosse de Cendres — un golem forgé dans les ruines de l'ancienne Ashka, haut de dix mètres, ses yeux brûlant d'un feu violet. La voix de Malachar résonne, amplifiée par la magie, venue de partout et de nulle part :

"Vous avez fait un long chemin pour mourir, héros. Mais personne ne passe les Portes d'Ashka sans mon consentement."`,
    gmNotes: `COMBAT MAJEUR — Bataille du Col de Cendres

C'est un combat de guerre à grande échelle. Les PJ ne combattent pas seuls — l'armée se bat autour d'eux. Utilisez le système simplifié :

Phase 1 — L'Embuscade :
- 4x Ombre de Guerre (CR 12) attaquent les flancs
- 3x Cultiste d'Élite (CR 10) lancent des sorts depuis les crêtes
- Les PJ doivent protéger l'armée et neutraliser les menaces clés

Phase 2 — Le Colosse :
- Colosse de Cendres (CR 17) bloque le passage
- Points faibles : les runes sur ses genoux et son torse (Investigation DC 16)
- L'armée ne peut pas avancer tant qu'il tient

Phase 3 — La Percée :
- Une fois le Colosse vaincu, l'armée charge à travers le col
- Les PJ doivent couvrir la retraite ou mener la charge

Pertes de l'armée selon la performance :
- Victoire rapide (< 5 rounds) : Pertes légères
- Victoire normale (5-8 rounds) : Pertes modérées
- Victoire difficile (> 8 rounds) : Pertes lourdes

Si la Reine Elara est présente, elle combat aux premières lignes. Jet de destin : sur un 1 naturel lors d'un jet de guerre, elle est grièvement blessée (ceci prépare un moment émotionnel potentiel).`,
    dialogues: [
      {
        npcId: 'npc_malachar_voice',
        npcName: 'Voix de l\'Archon Malachar',
        lines: [
          { trigger: 'Provocation', text: `*La voix résonne dans le col, froide et teintée de mépris.* J'ai marché dans les Terres Brûlées avant que vous ne sachiez tenir une épée. J'ai vu ce qui attend derrière les Sceaux. Vous pensez les restaurer ? Vous ne comprenez même pas ce que vous protégez. *Un rire amer.* Faites demi-tour. C'est le dernier acte de miséricorde que je vous offrirai.`, tone: 'menaçant' },
          { trigger: 'Si défié', text: `De la bravoure ? Ou de l'ignorance ? *La voix se fait plus douce, presque triste.* J'étais comme vous, autrefois. Un héros. Un porteur d'espoir. Et puis j'ai vu la vérité. *Silence.* Nous en reparlerons. Si vous survivez.`, tone: 'mélancolique' }
        ]
      },
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'En combat', text: `*Elle lève son épée, sa voix portant au-dessus du chaos.* Tenez la ligne ! Pour Aethelgard ! Pour chaque aube que nous avons encore à voir ! *Elle charge vers les ombres, sa lame brillant d'une lumière dorée.*`, tone: 'héroïque' },
          { trigger: 'Si blessée', text: `*Elle tombe à genoux, une entaille sombre au flanc. Elle repousse ceux qui veulent l'aider.* Ce n'est rien... Continuez ! Le col doit être franchi ! *Son regard vous trouve.* Ne vous arrêtez pas pour moi. Jamais. C'est un ordre royal.`, tone: 'déterminée, souffrante' }
        ]
      }
    ],
    objectives: [
      { description: 'Survivre à l\'embuscade dans le Col de Cendres', type: 'combat', optional: false },
      { description: 'Détruire le Colosse de Cendres pour ouvrir le passage', type: 'combat', optional: false },
      { description: 'Protéger l\'armée et la Reine Elara', type: 'combat', optional: false },
      { description: 'Neutraliser les cultistes sur les crêtes', type: 'combat', optional: true }
    ],
    transitions: [
      { condition: 'Le Colosse est détruit et le col franchi', nextScene: 'ch11_s5_camp_final', label: '→ Le dernier campement' },
      { condition: 'La Reine est grièvement blessée', nextScene: 'ch11_s5_camp_final', label: '→ Le dernier campement (urgence médicale)', alternative: 'ch11_s5_camp_final' }
    ],
    skillChecks: [
      { skill: 'Investigation', dc: 16, success: 'Vous repérez les runes vulnérables sur le Colosse — les attaques ciblées infligent le double de dégâts.', failure: 'Le Colosse semble indestructible. Il faudra le frapper partout et prier.' },
      { skill: 'Athlétisme', dc: 17, success: 'Vous escaladez les falaises pour atteindre les cultistes sur les crêtes.', failure: 'Le verre noir est tranchant et glissant. 3d6 dégâts tranchants.' },
      { skill: 'Arcanes', dc: 18, success: 'Vous identifiez le sort de contrôle du Colosse. Le dissiper (DC 20) le désactive immédiatement.', failure: 'La magie du Colosse est trop ancienne et trop étrangère pour être analysée.' }
    ],
    encounters: ['Colosse de Cendres (CR 17)', '4x Ombre de Guerre (CR 12)', '3x Cultiste d\'Élite (CR 10)'],
    loot: ['Cœur du Colosse (composant légendaire)', 'Bâton de Cultiste (arme +2, nécromancie)'],
    estimatedMinutes: 45,
    mood: 'chaos, héroïsme',
    music: 'Bataille épique — percussions intenses, cuivres, chœur',
    location: 'Col de Cendres — Défilé de Verre Noir'
  },
  {
    id: 'ch11_s5_camp_final',
    chapterId: 'ch11',
    sceneNumber: 5,
    title: 'La Dernière Nuit',
    type: 'dialogue',
    readAloud: `Le col est franchi. L'armée établit son dernier campement à l'ombre des ruines d'Ashka-Prime, dont les tours brisées se découpent contre un ciel violet strié d'éclairs silencieux.

Demain, vous entrerez dans le Nexus.

Ce soir, le camp est étrangement silencieux. Pas de chants, pas de beuveries d'avant-bataille. Juste le crépitement des feux et le murmure des prières. Chacun sait ce que demain signifie. Chacun fait ses adieux à sa manière.

La lune, à travers les nuages de cendres, projette une lumière argentée qui rend tout irréel — comme si le monde lui-même savait que c'est peut-être sa dernière nuit sous cette forme.

Vos compagnons sont là, autour du feu. Tous ceux qui ont survécu jusqu'ici. Et dans leurs yeux, vous lisez la même chose que dans les vôtres : de la peur, de la détermination, et quelque chose qui ressemble à de la gratitude.`,
    gmNotes: `C'EST LA SCÈNE LA PLUS IMPORTANTE DE L'ACTE SUR LE PLAN ÉMOTIONNEL.

Prenez tout le temps nécessaire. Cette scène peut durer 30 minutes ou 2 heures selon le groupe. C'est ici que les joueurs disent au revoir à leurs personnages — certains ne survivront peut-être pas demain.

Structure suggérée :
1. Tour de table — Chaque PJ peut aller voir un PNJ ou un compagnon
2. Confessions — Les PNJ partagent des secrets, des regrets, des espoirs
3. Promesses — Les PJ peuvent faire des promesses, des serments, des déclarations
4. Le Silence — Un moment où tout le monde regarde le feu en silence

PNJ disponibles pour des scènes d'adieu :
- Reine Elara (si encore valide) : Parle de l'après, de ce qu'elle fera si on survit
- Général Marcus : Révèle qu'il a une fille qu'il n'a pas vue depuis 3 ans
- Théodore (s'il est venu) : A peur mais refuse de partir. "Les livres ne servent à rien si personne ne survit pour les lire."
- Tout PNJ récurrent des actes précédents

IMPORTANT : Si un joueur exprime l'intention de se sacrifier demain, notez-le. Cela influencera les fins disponibles.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Devant le feu', text: `*Elle a ôté son armure et porte une simple robe. Sans la couronne, sans l'apparat, elle a l'air jeune. Terriblement jeune.* Vous savez ce qui me manquera le plus si... *Elle s'interrompt.* Les matins. Ce moment juste après l'aube où le monde est encore silencieux et où tout semble possible. *Elle sourit.* C'est pour ça que je me bats, je crois. Pour les matins.`, tone: 'intime' },
          { trigger: 'L\'après', text: `Si nous gagnons... *Elle rit doucement.* Quelle question étrange. "Si." Quand nous gagnerons, je veux reconstruire. Pas juste les murs et les routes — les ponts entre les peuples. Cette alliance... elle ne doit pas mourir avec la guerre. *Son regard se fait intense.* Et vous ? Qu'est-ce que vous ferez, quand tout sera fini ? Vous pourrez enfin vous reposer.`, tone: 'espoir' }
        ]
      },
      {
        npcId: 'npc_general_marcus',
        npcName: 'Général Marcus',
        lines: [
          { trigger: 'Confession', text: `*Il est assis seul, une petite miniature dans la main. Il la range vite en vous voyant, puis hésite, et la ressort.* Ma fille. Lena. Elle a sept ans. Je ne l'ai pas vue depuis trois ans. *Sa voix se brise légèrement.* Sa mère m'envoie des lettres. Lena dessine des chevaliers. Elle pense que son père est un héros. *Long silence.* J'espère ne pas la décevoir demain.`, tone: 'vulnérable' },
          { trigger: 'Promesse', text: `*Il vous regarde longuement.* Si je tombe demain... je ne vous demande pas de me venger ou de dire des belles choses sur ma tombe. Je vous demande juste de lui ramener ça. *Il vous tend la miniature.* Et de lui dire que le dernier mot que j'ai prononcé était son nom. Même si c'est faux. *Sourire triste.* Un père a le droit à un mensonge.`, tone: 'solennel' }
        ]
      },
      {
        npcId: 'npc_theodore',
        npcName: 'Théodore le Bibliothécaire',
        lines: [
          { trigger: 'Peur et courage', text: `*Le gnome est recroquevillé dans une couverture, ses grandes lunettes embuées.* Je suis absolument terrifié. Mes mains n'ont pas arrêté de trembler depuis le col. *Il tend ses mains — elles tremblent effectivement.* Mais vous savez quoi ? J'ai passé ma vie entière dans les livres à lire les exploits des autres. Cette fois, je suis DANS l'histoire. Et c'est... *Il cherche le mot.* ...magnifique. Terrifiant et magnifique.`, tone: 'nerveux mais sincère' },
          { trigger: 'Les Sceaux', text: `*Son ton change, plus grave.* J'ai étudié les Sceaux toute ma vie. Et il y a quelque chose que je ne vous ai jamais dit. Les Sceaux ne sont pas que des barrières. Ce sont des... promesses. Des serments magiques liés à la volonté de ceux qui les ont forgés. Demain, quand vous serez au Nexus... ce n'est pas juste de la puissance dont vous aurez besoin. C'est de la conviction. Les Sceaux répondent au cœur, pas aux incantations.`, tone: 'grave' }
        ]
      }
    ],
    objectives: [
      { description: 'Vivre la dernière nuit avant le Nexus', type: 'talk', optional: false },
      { description: 'Faire ses adieux aux PNJ', type: 'talk', optional: false },
      { description: 'Se préparer mentalement et matériellement pour le lendemain', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'L\'aube arrive — les héros se lèvent pour le combat final', nextScene: 'ch12_s1_porte_nexus', label: '→ Chapitre 12 : Le Nexus des Sceaux' }
    ],
    estimatedMinutes: 45,
    mood: 'mélancolie, intimité, adieu',
    music: 'Piano solo, violoncelle — thèmes des personnages en medley lent',
    location: 'Ruines d\'Ashka-Prime — Dernier Campement'
  }
];

// ============================================================================
// CHAPITRE 12 : LE NEXUS DES SCEAUX (Niveau 18-19)
// ============================================================================

const CH12_SCENES: NarrativeScene[] = [
  {
    id: 'ch12_s1_porte_nexus',
    chapterId: 'ch12',
    sceneNumber: 1,
    title: 'La Porte du Nexus',
    type: 'exploration',
    readAloud: `Au cœur des ruines d'Ashka-Prime, là où aucun vent ne souffle et où même les cendres refusent de tomber, se dresse la Porte du Nexus.

Ce n'est pas une porte au sens ordinaire. C'est une déchirure dans la réalité — un arc de pierre noire haut de trente mètres, gravé de milliers de runes qui pulsent en alternance, certaines brillant d'or, d'autres d'un violet maladif. La moitié des runes sont éteintes. Les Sceaux brisés.

L'air autour de la Porte est épais, presque liquide. Des murmures s'en échappent — pas des voix, mais des concepts, des émotions brutes : peur, faim, curiosité, une intelligence vaste et ancienne qui presse contre la barrière comme un océan contre une digue fissurée.

L'armée s'arrête. Personne ne peut entrer ici sauf vous. C'est le sanctuaire intérieur — seuls ceux qui portent la marque des Sceaux, ceux qui les ont touchés au cours de leur quête, peuvent franchir le seuil.

La Reine Elara pose une main sur votre épaule. Le Général Marcus vous salue. Théodore vous tend un dernier parchemin. Et puis vous faites un pas en avant, et le monde se referme derrière vous.`,
    gmNotes: `C'est l'entrée dans le donjon final. À partir d'ici, les PJ sont seuls — pas d'armée, pas de PNJ alliés (sauf s'ils ont un compagnon PNJ fidèle qui a la marque des Sceaux).

La Porte du Nexus est un point de non-retour narratif. Insistez sur la gravité du moment. Les adieux avec les PNJ à l'extérieur doivent être brefs mais poignants — ils ont déjà été faits la nuit dernière.

Le Nexus est un lieu vivant. Décrivez-le comme un organisme : les murs pulsent, les couloirs se déplacent, la gravité change. C'est l'ancien cœur de l'Hégémonie d'Ashka, un endroit où la magie a été poussée si loin qu'elle a déformé la réalité de manière permanente.

Structure du donjon :
- Salle 1 : L'Épreuve des Souvenirs (puzzle)
- Salle 2 : La Galerie des Gardiens (combat)
- Salle 3 : Le Cœur du Nexus (boss final)`,
    dialogues: [
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Dernier adieu', text: `*Elle retire un médaillon de son cou — le Sceau Royal de Sol-Aureus.* Prenez-le. Ce n'est pas pour la chance — c'est pour que vous vous souveniez de ce que vous défendez. *Sa voix tremble à peine.* Chaque personne derrière cette armée. Chaque enfant dans chaque ville. Ils comptent sur vous. *Elle se redresse.* Et moi aussi. Allez. Et revenez.`, tone: 'émue mais forte' }
        ]
      },
      {
        npcId: 'npc_nexus_voice',
        npcName: 'Le Nexus',
        lines: [
          { trigger: 'Entrée', text: `*En franchissant la Porte, une vibration parcourt vos os. Ce n'est pas un son — c'est une présence. Le Nexus vous reconnaît. Les runes sur vos corps (les marques laissées par chaque Sceau touché) s'illuminent en résonance avec celles de la Porte. Pendant un instant, vous percevez tout : chaque Sceau, chaque fissure, chaque fil de magie qui maintient le monde en un seul morceau. Et vous sentez à quel point c'est fragile.*`, tone: 'cosmique' }
        ]
      }
    ],
    objectives: [
      { description: 'Franchir la Porte du Nexus', type: 'special', optional: false },
      { description: 'Recevoir les derniers adieux des alliés', type: 'talk', optional: true },
      { description: 'S\'adapter à l\'environnement du Nexus', type: 'explore', optional: false }
    ],
    transitions: [
      { condition: 'Les héros entrent dans le Nexus', nextScene: 'ch12_s2_epreuve_souvenirs', label: '→ L\'Épreuve des Souvenirs' }
    ],
    loot: ['Médaillon Royal de Sol-Aureus (avantage aux jets de Sagesse dans le Nexus)'],
    estimatedMinutes: 15,
    mood: 'solennel, mystique',
    music: 'Drone grave, voix éthérées, silence oppressant',
    location: 'Ashka-Prime — Porte du Nexus'
  },
  {
    id: 'ch12_s2_epreuve_souvenirs',
    chapterId: 'ch12',
    sceneNumber: 2,
    title: 'L\'Épreuve des Souvenirs',
    type: 'choice',
    readAloud: `Le premier couloir du Nexus s'ouvre sur une salle immense et impossible — les murs sont faits de miroirs, mais ils ne reflètent pas le présent. Ils reflètent le passé.

Dans chaque miroir, vous voyez un moment de votre quête. La taverne du Dragon Rouillé. Le premier Sceau brisé. Les visages de ceux que vous avez perdus. Les choix que vous avez faits — et ceux que vous avez refusé de faire.

Au centre de la salle, un autel de cristal sur lequel reposent des fragments de Sceau — un pour chaque Sceau que vous avez restauré ou touché. Ils pulsent faiblement, attendant d'être assemblés.

Mais les miroirs ne font pas que montrer — ils questionnent. Des voix en émergent, des voix familières, des voix de morts et de vivants, et elles posent toutes la même question :

"Est-ce que ça en valait la peine ?"`,
    gmNotes: `PUZZLE ÉMOTIONNEL — L'Épreuve des Souvenirs

Ce n'est pas un puzzle mécanique — c'est un puzzle de roleplay. Les miroirs posent des questions sur les choix de la campagne, et les réponses SINCÈRES des joueurs assemblent les fragments.

Pour chaque miroir, présentez un choix passé et demandez au joueur concerné :
1. "Referais-tu le même choix ?" — Honnêteté requise (Perspicacité DC 0 — le Nexus détecte les mensonges)
2. "Quel prix as-tu payé ?" — Le joueur doit nommer ce qu'il a perdu
3. "Que ferais-tu différemment ?" — Pas de bonne réponse, juste de la sincérité

Chaque réponse sincère fait briller un fragment. Les réponses évasives ou mensongères font trembler la salle et infligent 2d10 dégâts psychiques.

Si TOUS les fragments sont activés : passage ouvert + bonus pour le combat final
Si la majorité : passage ouvert, pas de bonus
Si moins de la moitié : passage ouvert mais les PJ commencent le combat suivant avec un niveau d'épuisement

IMPORTANT : C'est l'occasion de revisiter les moments forts de toute la campagne. Adaptez les miroirs aux choix réels de votre groupe.`,
    dialogues: [
      {
        npcId: 'npc_miroir_premier_sceau',
        npcName: 'Miroir du Premier Sceau',
        lines: [
          { trigger: 'Vision', text: `*Le miroir ondule et vous montre les égouts de Sol-Aureus. Le premier combat. Les yeux rouges dans le noir. Et cette question, ce moment où vous auriez pu reculer, refermer la grille, retourner à votre vie d'avant.* Vous avez choisi d'avancer. *La voix du miroir est neutre, sans jugement.* Ce premier pas a conduit à des milliers d'autres. À la joie et à la douleur. À la gloire et au deuil. Connaissant tout cela... avanceriez-vous encore ?`, tone: 'neutre, profond' }
        ]
      },
      {
        npcId: 'npc_miroir_sacrifice',
        npcName: 'Miroir du Sacrifice',
        lines: [
          { trigger: 'Vision', text: `*Le miroir montre le moment le plus douloureux de la campagne — un allié perdu, un village sacrifié, un choix impossible.* Tu te souviens de ce moment. *La voix est douce, presque compatissante.* Le poids ne diminue pas, n'est-ce pas ? Il ne diminuera jamais. Mais dis-moi... ce poids, le porterais-tu encore ? Ou le poserais-tu si tu le pouvais ?`, tone: 'compassion' }
        ]
      }
    ],
    objectives: [
      { description: 'Affronter les miroirs et répondre honnêtement', type: 'special', optional: false },
      { description: 'Assembler les fragments de Sceau', type: 'special', optional: false },
      { description: 'Chaque PJ doit confronter un souvenir personnel', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Tous les fragments assemblés (réponses sincères)', nextScene: 'ch12_s3_galerie_gardiens', label: '→ La Galerie des Gardiens (bonus actif)' },
      { condition: 'Majorité des fragments assemblés', nextScene: 'ch12_s3_galerie_gardiens', label: '→ La Galerie des Gardiens' },
      { condition: 'Moins de la moitié', nextScene: 'ch12_s3_galerie_gardiens', label: '→ La Galerie des Gardiens (épuisement)', alternative: 'ch12_s3_galerie_gardiens' }
    ],
    skillChecks: [
      { skill: 'Perspicacité', dc: 0, success: 'Le Nexus reconnaît la sincérité de votre réponse. Un fragment s\'illumine.', failure: 'Le Nexus détecte le mensonge. La salle tremble. 2d10 dégâts psychiques.' }
    ],
    estimatedMinutes: 30,
    mood: 'introspection, nostalgie',
    music: 'Thèmes musicaux des actes précédents en fragments, harpe, échos',
    location: 'Nexus des Sceaux — Salle des Miroirs'
  },
  {
    id: 'ch12_s3_galerie_gardiens',
    chapterId: 'ch12',
    sceneNumber: 3,
    title: 'La Galerie des Gardiens',
    type: 'combat',
    readAloud: `Au-delà de la Salle des Miroirs, un escalier de lumière solidifiée descend dans les profondeurs du Nexus. Vous débouchez dans une galerie titanesque — une cathédrale souterraine dont les colonnes sont des Sceaux eux-mêmes, des piliers de magie cristallisée hauts de cinquante mètres, chacun gravé de runes d'une langue que même Théodore n'aurait pas pu lire.

Sept colonnes. Sept Sceaux. Certaines brillent encore d'un éclat doré. D'autres sont fissurées, leur lumière vacillante. Et deux sont complètement éteintes — des piliers de pierre morte dans lesquels des veines de corruption violette pulsent comme un poison.

Au pied de chaque colonne se tient une statue de gardien — des chevaliers de pierre d'une époque révolue, les derniers défenseurs de l'Alliance des Sept. Ils dorment depuis des millénaires.

Et au bout de la galerie, debout entre les colonnes éteintes, une silhouette vous attend. Pas une statue. Un homme.

L'Archon Malachar.

Il est plus petit que vous ne l'imaginiez. Un homme d'une cinquantaine d'années, les cheveux argentés, portant une armure ancienne par-dessus des robes de mage usées. Son visage est creusé par la fatigue et... est-ce de la tristesse ?

"Enfin", dit-il. Et dans ce seul mot, il y a du soulagement.`,
    gmNotes: `COMBAT BOSS — L'Archon Malachar (Multi-Phases)

Malachar n'attaque PAS immédiatement. Il PARLE d'abord. C'est crucial pour son arc narratif — il est un héros déchu, pas un monstre. Laissez le dialogue se dérouler avant le combat.

Son histoire : Malachar était un Gardien des Sceaux, il y a 200 ans. Il a découvert que les Sceaux ne contenaient pas que l'Ombre — ils contenaient l'Entité, un être cosmique. Et les Sceaux s'affaiblissaient naturellement. Il a essayé de les renforcer et a échoué. Désespéré, il a conclu que la seule solution était de CONTRÔLER la brèche plutôt que de la colmater — en devenant le gardien de la Porte lui-même, fusionné avec la corruption. Il a brisé certains Sceaux intentionnellement pour rediriger l'énergie vers les autres. Un acte monstrueux fait par amour du monde.

Les joueurs peuvent tenter de le raisonner (Persuasion DC 25). Succès : il se bat avec moins de conviction (désavantage à certaines attaques). Échec : il est trop loin.

PHASE 1 — Le Chevalier Déchu (CR 18)
Malachar au corps à corps. Épée et magie. Combat noble, presque triste. Il salue avant de frapper. Quand réduit à 50% PV :

PHASE 2 — L'Archon (CR 20)
Il absorbe la corruption des piliers éteints. Transformation : armure noire, yeux violets, pouvoir décuplé. Il perd sa retenue. Sorts dévastateurs + invocations d'ombres. Quand réduit à 25% PV :

PHASE 3 — Le Vaisseau (CR 22)
L'Entité prend partiellement le contrôle. Malachar lutte contre elle en même temps qu'il combat les PJ. Des moments de lucidité où il AIDE les PJ ("Frappez maintenant ! Pendant qu'elle me lâche !"). Vaincre cette phase ne tue pas nécessairement Malachar — elle brise le lien avec l'Entité.

Pendant toutes les phases, les Gardiens de Pierre peuvent être réveillés (Arcanes DC 20 par colonne). Chaque gardien réveillé aide pendant 3 rounds puis s'effondre.`,
    dialogues: [
      {
        npcId: 'npc_malachar',
        npcName: 'Archon Malachar',
        lines: [
          { trigger: 'Première parole', text: `*Il vous observe avec des yeux qui ont vu des siècles.* Vous êtes venus. Bien sûr que vous êtes venus. Les héros viennent toujours. *Il soupire.* Je me demandais... combien de temps ça prendrait cette fois.`, tone: 'las' },
          { trigger: 'Son histoire', text: `Vous voulez comprendre ? *Il rit amèrement.* J'étais le plus fervent défenseur des Sceaux. Le meilleur Gardien de ma génération. Et c'est moi qui ai découvert la vérité : les Sceaux ne tiendront pas. Pas indéfiniment. Pas même un millénaire de plus. *Son regard se perd.* J'ai tout essayé. Tout. Et quand j'ai compris qu'on ne pouvait pas renforcer les Sceaux de l'extérieur, j'ai décidé de le faire de l'intérieur. En ouvrant la porte. En affrontant l'Entité. En devenant le verrou moi-même.`, tone: 'désespéré, sincère' },
          { trigger: 'Défi', text: `Me combattre ? *Ses mains crépitent d'énergie sombre.* Vous pensez que j'ai envie de ça ? Vous pensez que je voulais devenir ÇA ? *Il montre les veines violettes sur ses bras.* Chaque jour, elle grignote un peu plus de moi. L'Entité. Elle murmure. Elle promet. Et un jour je ne serai plus assez fort pour résister. *Il lève son épée.* Alors oui. Combattez-moi. Et si je tombe... faites ce que je n'ai pas pu faire. Restaurez les Sceaux. Mais sachez ceci : ils ne tiendront pas éternellement. Rien ne tient éternellement.`, tone: 'tragique' },
          { trigger: 'Phase 2 — Transformation', text: `*La corruption se répand sur son armure comme de l'encre vivante. Sa voix se dédouble — la sienne et une autre, plus profonde, plus ancienne.* Non... pas encore... JE CONTRÔLE ENCORE... *Son corps se tord.* Fuyez. Fuyez pendant que je la retiens. *Mais ses mains se lèvent malgré lui, chargées d'énergie destructrice.* TROP TARD.`, tone: 'luttant, double voix' },
          { trigger: 'Phase 3 — L\'Entité parle', text: `*La voix de Malachar disparaît, remplacée par quelque chose d'immense et de glacial.* Petits mortels. Vous construisez des murs et les appelez "sceaux". Vous créez des cages et les appelez "protection". Savez-vous seulement CE QUE vous enfermez ? *Un rire qui fait vibrer les colonnes.* Je ne suis pas votre ennemi. Je suis votre RÉPONSE. À la fin. À l'oubli. À la mort de votre monde qui viendra, Sceaux ou pas.`, tone: 'cosmique, alien' },
          { trigger: 'Lucidité de Malachar (Phase 3)', text: `*Un instant de clarté — les yeux de Malachar redeviennent humains.* MAINTENANT ! Frappez maintenant ! Elle... elle ne peut pas maintenir le contrôle et se défendre en même temps ! *Ses mains tremblent.* Et quand ce sera fini... ne me pleurez pas. Je ne le mérite pas. Mais protégez... ce que j'ai essayé de protéger. *Ses yeux se revoilent.* Le monde...`, tone: 'désespéré, lucide' }
        ]
      }
    ],
    objectives: [
      { description: 'Confronter l\'Archon Malachar', type: 'combat', optional: false },
      { description: 'Survivre aux trois phases du combat', type: 'combat', optional: false },
      { description: 'Tenter de raisonner Malachar (Persuasion DC 25)', type: 'talk', optional: true },
      { description: 'Réveiller les Gardiens de Pierre (Arcanes DC 20)', type: 'special', optional: true }
    ],
    transitions: [
      { condition: 'Malachar est vaincu (tué ou libéré de l\'Entité)', nextScene: 'ch12_s4_grand_rituel', label: '→ Le Grand Rituel' },
      { condition: 'Malachar est raisonné + vaincu', nextScene: 'ch12_s4_grand_rituel', label: '→ Le Grand Rituel (Malachar allié)', alternative: 'ch12_s4_grand_rituel' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 25, success: 'Malachar entend vos mots. Des larmes coulent. "Peut-être... peut-être qu\'il y a un autre chemin." Il combat avec désavantage en Phase 1.', failure: '"Les mots... les mots ne changent rien. J\'ai parlé pendant deux cents ans. C\'est l\'heure des actes."' },
      { skill: 'Arcanes', dc: 20, success: 'Vous éveillez un Gardien de Pierre ! Il se bat à vos côtés pendant 3 rounds.', failure: 'La statue reste inerte. Sa magie est trop ancienne pour répondre.' },
      { skill: 'Religion', dc: 18, success: 'Vous invoquez le serment originel de l\'Alliance des Sept. Les colonnes brillent — Malachar recule, touché par la mémoire de ce qu\'il était.', failure: 'Les mots sont justes mais le pouvoir ne vient pas. Les Sceaux sont trop affaiblis.' }
    ],
    encounters: ['Archon Malachar Phase 1 (CR 18)', 'Archon Malachar Phase 2 (CR 20)', 'Archon Malachar/Entité Phase 3 (CR 22)'],
    loot: ['Lame de l\'Archon (arme légendaire, +3)', 'Fragment de Nexus (composant pour le Grand Rituel)'],
    estimatedMinutes: 60,
    mood: 'tragique, épique, catharsis',
    music: 'Phase 1 : Combat noble, cordes et piano. Phase 2 : Orchestre chaotique. Phase 3 : Chœur et orgue, thème principal distordu',
    location: 'Nexus des Sceaux — Galerie des Gardiens'
  },
  {
    id: 'ch12_s4_grand_rituel',
    chapterId: 'ch12',
    sceneNumber: 4,
    title: 'Le Grand Rituel',
    type: 'choice',
    readAloud: `Malachar est à terre. L'Entité se retire dans un hurlement silencieux qui fait craquer les colonnes. Et au centre de la Galerie, là où les sept colonnes convergent, un cercle de lumière s'ouvre dans le sol — le Cœur du Nexus.

C'est ici que les Sceaux ont été forgés il y a des millénaires. C'est ici qu'ils doivent être restaurés.

Le cercle pulse d'une lumière dorée, attendant. Les fragments de Sceau que vous portez vibrent en résonance, tirant vers le centre comme des aiguilles vers le nord. L'air est chargé d'une énergie si dense qu'elle est presque visible — des fils de lumière qui connectent chaque colonne au cercle central.

Mais quelque chose résiste. Derrière la Porte — la vraie Porte, celle que Malachar a ouverte — l'Entité presse. Vous la sentez : immense, patiente, curieuse. Pas malveillante, pas vraiment. Juste... affamée. Affamée de réalité. Affamée d'exister dans votre monde.

Le Rituel doit être accompli. Mais il y a un prix. Il y a toujours un prix.`,
    gmNotes: `LE GRAND RITUEL — Le Choix Final

C'est le pivot de l'acte final. Les joueurs doivent choisir comment restaurer les Sceaux. Chaque option mène à une fin différente :

OPTION A — Le Rituel Classique :
Restaurer les Sceaux exactement comme l'Alliance des Sept l'a fait. Nécessite un ancrage — quelqu'un doit se lier aux Sceaux comme gardien. Si un PJ se porte volontaire, c'est le Sacrifice (Fin Douce-Amère). Si Malachar est vivant et raisonné, il peut reprendre ce rôle (Fin Parfaite variante).
- Jets requis : Arcanes DC 22, Religion DC 20, Constitution DC 18 (pour l'ancrage)

OPTION B — Le Rituel Renforcé :
Utiliser le Cœur du Colosse et d'autres composants rares pour forger des Sceaux PERMANENTS. Pas besoin de gardien. Mais nécessite un sacrifice de puissance — chaque PJ perd définitivement 2 niveaux (réduction permanente). Fin Parfaite.
- Jets requis : Arcanes DC 25, les 4 PJ doivent réussir Constitution DC 20 simultanément

OPTION C — Parler à l'Entité :
Si les PJ ont découvert assez de lore (indice du Spectre d'Ashka, notes de Théodore, paroles de Malachar), ils peuvent tenter de COMMUNIQUER avec l'Entité. C'est la fin Secrète. L'Entité n'est pas un démon — c'est un être d'un autre plan qui a été piégé par les Sceaux originaux, et son "invasion" est en réalité une tentative de RETOUR chez elle. L'aider à partir scelle la brèche définitivement.
- Jets requis : Persuasion DC 28 (ou bon RP), Arcanes DC 22

OPTION D — Détruire le Nexus :
Si les PJ échouent à tout le reste. Effondrer le Nexus sur l'Entité. Les Sceaux sont détruits mais l'Entité est ensevelie. Solution temporaire — elle reviendra dans des siècles. Fin Sombre.
- Jets requis : Force DC 20 (physiquement casser les colonnes)

Laissez les joueurs débattre. C'est LEUR choix. Ne les guidez pas vers une option.`,
    dialogues: [
      {
        npcId: 'npc_entite',
        npcName: 'L\'Entité',
        lines: [
          { trigger: 'Contact', text: `*Ce n'est pas une voix. C'est une sensation — comme plonger dans un océan de pensée. Des images déferlent : des étoiles qui naissent et meurent, des mondes qui tournent, un voyage immense à travers le vide, et puis... un mur. Les Sceaux. Vue de l'autre côté, la barrière n'est pas une protection — c'est une prison.* ENFERMÉ. DEPUIS SI LONGTEMPS. PAS VOULU BLESSER. VOULU RENTRER. MAISON. LOIN.`, tone: 'alien, triste, immense' },
          { trigger: 'Si les PJ écoutent', text: `*Les images changent. Un lieu de lumière pure, sans forme, sans matière — juste de l'énergie et de la conscience. Le foyer de l'Entité. Elle a été attirée dans votre monde par les expériences magiques d'Ashka, piégée quand ils ont forgé les Sceaux en panique.* PORTE. OUVRIR PORTE. PAS DANS VOTRE DIRECTION. DANS LA MIENNE. RENTRER. TOUT SERA RÉPARÉ. PROMESSE.`, tone: 'suppliant, immense' },
          { trigger: 'Si les PJ refusent', text: `*Un tremblement. De la tristesse, immense comme un continent.* ENCORE ENFERMÉ. ENCORE SEUL. *Puis une résignation ancienne.* COMPRENDS. PEUR. NATUREL. PEUR DE L'INCONNU. *Un silence.* ATTENDRAI. COMME TOUJOURS. PEUT-ÊTRE... UN JOUR... QUELQU'UN COMPRENDRA.`, tone: 'résigné, infini' }
        ]
      },
      {
        npcId: 'npc_malachar_mourant',
        npcName: 'Malachar (s\'il est vivant)',
        lines: [
          { trigger: 'Conseil', text: `*Il est à genoux, libéré de la corruption mais brisé.* J'ai passé deux cents ans à essayer de comprendre. Je n'ai réussi qu'à tout empirer. *Il lève les yeux.* Mais vous... vous avez quelque chose que je n'avais pas. Vous n'êtes pas seuls. *Il regarde vos compagnons.* Le Rituel demande un ancrage ? Laissez-moi. C'est mon rôle depuis le début. C'est tout ce que je peux faire pour réparer... *Il s'interrompt, la gorge serrée.* ...tout le mal que j'ai causé.`, tone: 'brisé, résolu' },
          { trigger: 'Si les PJ parlent à l\'Entité', text: `*Ses yeux s'écarquillent.* Vous... vous l'entendez ? Vraiment ? *Il écoute.* Deux cents ans. Deux cents ans et je n'ai jamais pensé à... simplement écouter. *Un rire incrédule.* C'est ça, la différence entre un héros et un idiot avec de bonnes intentions. Le héros écoute d'abord.`, tone: 'ébahi, admiratif' }
        ]
      }
    ],
    objectives: [
      { description: 'Choisir comment accomplir le Grand Rituel', type: 'special', optional: false },
      { description: 'Accomplir le Rituel selon l\'option choisie', type: 'special', optional: false },
      { description: 'Communiquer avec l\'Entité (option secrète)', type: 'talk', optional: true },
      { description: 'Accepter le prix du Rituel', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Rituel Classique avec sacrifice PJ', nextScene: 'ch13_s1_fin_douce_amere', label: '→ Fin Douce-Amère' },
      { condition: 'Rituel Renforcé réussi ou Malachar se sacrifie', nextScene: 'ch13_s1_fin_parfaite', label: '→ Fin Parfaite' },
      { condition: 'Communication avec l\'Entité réussie', nextScene: 'ch13_s1_fin_secrete', label: '→ Fin Secrète' },
      { condition: 'Nexus détruit', nextScene: 'ch13_s1_fin_sombre', label: '→ Fin Sombre' }
    ],
    skillChecks: [
      { skill: 'Arcanes', dc: 22, success: 'Les Sceaux répondent à votre magie. Le Rituel peut commencer.', failure: 'L\'énergie vous échappe. Vous pouvez réessayer mais chaque échec fait trembler le Nexus.' },
      { skill: 'Religion', dc: 20, success: 'Vous canalisez la foi de l\'Alliance des Sept. Les colonnes s\'illuminent.', failure: 'Le lien sacré est trop faible. Il manque quelque chose — de la conviction, peut-être.' },
      { skill: 'Persuasion', dc: 28, success: 'L\'Entité vous comprend. Un chemin de lumière s\'ouvre — non pas vers votre monde, mais vers le sien. La Porte peut s\'ouvrir dans l\'autre sens.', failure: 'L\'Entité est trop étrangère. La communication échoue. Elle n\'est pas hostile, juste... incompréhensible.' },
      { skill: 'Constitution', dc: 18, success: 'Votre corps absorbe le choc de l\'ancrage. Douloureux mais supportable.', failure: 'L\'ancrage vous submerge. 6d10 dégâts nécrotiques et un niveau d\'épuisement.' }
    ],
    estimatedMinutes: 40,
    mood: 'choix déchirant, cosmique',
    music: 'Orgue et chœur, silence entre les notes, vibrations basses',
    location: 'Nexus des Sceaux — Cœur du Nexus'
  }
];

// ============================================================================
// CHAPITRE 13 : ÉPILOGUE — L'AUBE SE LÈVE (Niveau 20)
// ============================================================================

const CH13_SCENES: NarrativeScene[] = [
  {
    id: 'ch13_s1_fin_parfaite',
    chapterId: 'ch13',
    sceneNumber: 1,
    title: 'Fin Parfaite — L\'Aube Dorée',
    type: 'narration',
    readAloud: `Les Sceaux se referment.

C'est d'abord un son — un accord grave et profond qui résonne dans chaque pierre, chaque os, chaque atome du monde. Puis la lumière. Une lumière dorée qui jaillit des sept colonnes, monte en spirale vers le plafond du Nexus, traverse la roche et la terre, et s'élève dans le ciel d'Aethelgard comme un pilier d'or visible depuis chaque coin du continent.

Les Terres Brûlées frémissent. Sous vos pieds, le verre noir craque, et de chaque fissure jaillit... de l'herbe. Verte. Vivante. En quelques minutes, un millénaire de désolation commence à guérir. Les arbres calcinés bourgeonnent. L'air se purifie. Le ciel passe du gris à un bleu éclatant.

Dehors, l'armée hurle de joie. Des soldats tombent à genoux. D'autres pleurent. La Reine Elara lève les yeux vers le pilier de lumière et ses larmes brillent comme de l'or.

Vous émergez du Nexus, couverts de poussière et de lumière. Et quand l'armée vous voit, le silence se fait. Puis un nom. Votre nom. Scandé par des milliers de voix. De plus en plus fort. Jusqu'à ce que le monde entier semble le crier.

C'est fini.

L'Aube Nouvelle se lève sur Aethelgard. Et elle est belle.`,
    gmNotes: `LA FIN PARFAITE — Les Sceaux sont restaurés sans sacrifice de PJ.

Cette fin se produit si :
- Les PJ ont utilisé le Rituel Renforcé (sacrifice de niveaux, pas de mort)
- OU Malachar raisonné s'est sacrifié comme ancrage

C'est la fin la plus "heureuse". Tous les PJ survivent. Le monde est sauvé. Mais ne la rendez pas simpliste — il y a eu des pertes, des sacrifices le long du chemin. Les PNJ morts restent morts. Le prix a été payé par d'autres.

Laissez les joueurs savourer ce moment. Décrivez les réactions de chaque PNJ survivant. Puis passez aux épilogue individuels.

Si Malachar s'est sacrifié : ajoutez une scène où on aperçoit brièvement sa silhouette dans les colonnes de lumière — il sourit. Pour la première fois en deux cents ans, il est en paix.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Victoire', text: `*Elle marche vers vous, les joues striées de larmes, et pose les deux mains sur vos épaules. Pas comme une reine à ses sujets — comme une amie.* Vous l'avez fait. *Sa voix se brise.* Je ne sais pas comment vous remercier. Aucun titre, aucun trésor ne sera assez. *Elle rit à travers ses larmes.* Mais on va essayer quand même.`, tone: 'joie, émotion' }
        ]
      },
      {
        npcId: 'npc_general_marcus',
        npcName: 'Général Marcus',
        lines: [
          { trigger: 'Après la victoire', text: `*Il se tient au garde-à-vous et vous salue — un salut impeccable, comme s'il saluait des généraux.* Je retire tout ce que j'ai dit sur les aventuriers. *Ses yeux brillent.* Vous êtes les meilleurs soldats que j'aie jamais commandés. Et les pires pour obéir aux ordres. *Sourire.* C'est probablement pour ça que vous avez réussi.`, tone: 'fier, ému' }
        ]
      }
    ],
    objectives: [
      { description: 'Assister à la restauration des Sceaux et la guérison du monde', type: 'special', optional: false },
      { description: 'Recevoir les acclamations de l\'armée et des alliés', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Scène de célébration terminée', nextScene: 'ch13_s5_epilogues', label: '→ Épilogues individuels' }
    ],
    estimatedMinutes: 15,
    mood: 'triomphe, émotion, lumière',
    music: 'Thème principal en majeur, orchestre complet, chœur triomphant',
    location: 'Ashka-Prime — Sortie du Nexus'
  },
  {
    id: 'ch13_s1_fin_douce_amere',
    chapterId: 'ch13',
    sceneNumber: 1,
    title: 'Fin Douce-Amère — Le Prix de l\'Aube',
    type: 'narration',
    readAloud: `Les Sceaux se referment. Mais cette fois, ils emportent quelqu'un avec eux.

La lumière jaillit des colonnes — dorée, magnifique, salvatrice — mais elle emporte aussi votre compagnon. Celui qui s'est offert comme ancrage. Son corps brille, devient translucide, et pendant un instant vous le voyez tel qu'il est vraiment — non pas un mortel, mais un pilier de lumière, une fondation vivante sur laquelle le monde entier repose.

Il vous regarde. Il sourit. Et dans ce sourire, il n'y a pas de regret.

"Protégez ce que j'ai aimé", dit-il. Ou peut-être le pensez-vous seulement. Et puis il est parti — dissous dans la lumière des Sceaux, devenu une partie du monde lui-même.

Dehors, le même miracle se produit : les Terres Brûlées guérissent, le ciel s'éclaircit, l'armée rugit de joie. Mais quand vous émergez du Nexus, il manque quelqu'un. Et cette absence est un gouffre que toute la lumière du monde ne peut combler.

La Reine Elara vous voit sortir. Elle compte. Elle comprend. Et la joie dans ses yeux se mêle à une douleur que vous portez désormais ensemble.

L'Aube se lève. Elle est belle. Mais elle a un prix.`,
    gmNotes: `LA FIN DOUCE-AMÈRE — Un PJ s'est sacrifié comme ancrage.

C'est la fin la plus émotionnellement puissante. Ne la précipitez pas.

Le PJ sacrifié a le droit à une dernière scène :
1. Un dernier regard vers ses compagnons
2. Un dernier mot (pas plus de deux phrases — la brièveté renforce l'impact)
3. La transformation — décrivez-la comme belle, pas comme une mort

Le PJ n'est pas "mort" au sens strict — il EST les Sceaux maintenant. Les autres PJ peuvent le sentir dans le vent, dans la lumière du matin, dans le murmure des arbres. Il est partout et nulle part.

Pour le joueur : rassurez-le. Ce sacrifice est le point culminant de l'arc de son personnage. C'est la chose la plus héroïque qu'un personnage puisse faire. Et lors de l'épilogue, les autres PJ peuvent "lui parler" à travers les Sceaux — il écoute, même s'il ne peut pas répondre.

Si plusieurs joueurs voulaient se sacrifier, seul un peut servir d'ancrage. Les autres ont été retenus par leurs compagnons.`,
    dialogues: [
      {
        npcId: 'npc_pj_sacrifie',
        npcName: 'Le Héros Sacrifié',
        lines: [
          { trigger: 'Derniers mots', text: `*La lumière l'enveloppe. Il lève une main vers ses compagnons — pas un adieu, juste un "attendez".* Ne soyez pas tristes. *Sa voix résonne, de plus en plus lointaine.* Je ne pars pas vraiment. Je serai dans chaque lever de soleil. Dans chaque Sceau qui tient. Dans chaque jour de paix. *Un sourire lumineux.* Vivez. C'est tout ce que je demande. Vivez assez pour nous deux.`, tone: 'serein, lumineux' }
        ]
      },
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Le deuil', text: `*Elle ne dit rien pendant un long moment. Puis elle s'agenouille là où le héros a disparu et pose sa main sur le sol.* Le monde ne saura jamais vraiment ce qui s'est passé ici. Mais moi, je sais. Et je jure que son nom sera gravé dans chaque pierre de chaque monument que nous bâtirons. *Sa voix se durcit.* Son sacrifice ne sera pas oublié. Jamais. Je m'en porte garante.`, tone: 'deuil, serment' }
        ]
      }
    ],
    objectives: [
      { description: 'Assister au sacrifice et à la restauration des Sceaux', type: 'special', optional: false },
      { description: 'Faire ses adieux au héros sacrifié', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Le deuil est traversé', nextScene: 'ch13_s5_epilogues', label: '→ Épilogues individuels' }
    ],
    estimatedMinutes: 20,
    mood: 'deuil, beauté, sacrifice',
    music: 'Thème principal en mineur, piano seul puis orchestre, fin en majeur — triste mais beau',
    location: 'Nexus des Sceaux / Ashka-Prime'
  },
  {
    id: 'ch13_s1_fin_sombre',
    chapterId: 'ch13',
    sceneNumber: 1,
    title: 'Fin Sombre — Les Cendres qui Demeurent',
    type: 'narration',
    readAloud: `Le Nexus s'effondre.

C'est votre seule option. Les Sceaux ne peuvent pas être restaurés — pas comme ça, pas maintenant. Alors vous faites la seule chose qui reste : vous abattez les colonnes une par une. La pierre se fissure, la magie se disperse, et le Nexus tout entier gronde comme un animal blessé.

L'Entité hurle — pas de douleur mais de frustration. Des tonnes de roche enchantée s'écrasent entre elle et votre monde, bouchant la brèche non pas avec de la magie, mais avec de la force brute. C'est temporaire. Vous le savez. Elle le sait.

Vous courez. Les couloirs s'effondrent autour de vous. La poussière et les débris vous aveuglent. Et quand vous émergez enfin, haletants, couverts de gravats, c'est pour découvrir que les Terres Brûlées sont toujours brûlées. Le ciel est toujours gris. Rien n'a guéri.

Mais rien n'a empiré non plus.

L'armée vous accueille avec soulagement, mais sans triomphe. Ils voient le ciel. Ils comprennent. Ce n'est pas une victoire. C'est un sursis.

La Reine Elara vous regarde avec des yeux qui ont vieilli de dix ans en une heure.

"Combien de temps ?" demande-t-elle.

"Je ne sais pas", répondez-vous. Et c'est la vérité la plus terrifiante que vous ayez jamais prononcée.`,
    gmNotes: `LA FIN SOMBRE — Le Nexus est détruit, pas restauré.

Cette fin se produit si :
- Les PJ ont échoué aux jets du Rituel et n'avaient pas de plan B
- Les PJ ont choisi de détruire le Nexus par désespoir
- Les PJ n'avaient pas assez de Sceaux restaurés pour le Rituel Classique

Ce n'est PAS un échec total — les PJ ont survécu et l'Entité est contenue (temporairement). Mais le monde est changé :
- Les Terres Brûlées ne guérissent pas
- Des poches de corruption restent actives dans le monde
- Les Sceaux n'existent plus — la prochaine génération devra trouver une autre solution

C'est une fin douce-amère sombre. Les héros ont fait ce qu'ils pouvaient avec ce qu'ils avaient. Le monde survit, mais il est marqué. Et la menace n'est pas éliminée — juste retardée.

Tonalité : réaliste, sobre, mature. Pas désespérée — il y a encore de l'espoir. Mais cet espoir est fragile et lointain.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara',
        lines: [
          { trigger: 'Le sursis', text: `*Elle regarde le ciel gris, longuement.* Ce n'est pas ce que nous espérions. *Elle se tourne vers vous.* Mais c'est ce que nous avons. Et c'est plus que ce que nous aurions eu sans vous. *Elle prend une inspiration.* Nous avons du temps. Du temps pour apprendre, pour se préparer, pour trouver une vraie solution. *Son regard se fait acier.* Et cette fois, nous ne serons pas pris au dépourvu.`, tone: 'résignée mais déterminée' }
        ]
      },
      {
        npcId: 'npc_general_marcus',
        npcName: 'Général Marcus',
        lines: [
          { trigger: 'Réalisme', text: `*Il crache la poussière du Nexus.* Ce n'est pas la victoire qu'on voulait. Mais c'est celle qu'on a. *Il regarde ses soldats — fatigués, blessés, mais vivants.* Ramenons ces gens chez eux. Qu'ils voient leurs familles. Et demain... demain on recommence à construire. Des murs plus solides. Des alliances plus fortes. On aura besoin de vous. Le monde aura besoin de vous. Encore.`, tone: 'pragmatique, las' }
        ]
      }
    ],
    objectives: [
      { description: 'S\'échapper du Nexus qui s\'effondre', type: 'explore', optional: false },
      { description: 'Accepter le sursis imparfait', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Le deuil de la victoire parfaite est fait', nextScene: 'ch13_s5_epilogues', label: '→ Épilogues individuels (variante sombre)' }
    ],
    skillChecks: [
      { skill: 'Athlétisme', dc: 16, success: 'Vous évitez les éboulements et sortez du Nexus sans blessure majeure.', failure: 'Un pan de mur vous frappe — 4d10 dégâts contondants, mais vous sortez vivant.' },
      { skill: 'Dextérité (sauvegarde)', dc: 18, success: 'Vous esquivez les débris et aidez un compagnon à sortir.', failure: 'Un pilier vous frôle — 3d8 dégâts et Entravé pendant 1 round.' }
    ],
    estimatedMinutes: 15,
    mood: 'amertume, résolution, survie',
    music: 'Cordes graves, pas de résolution harmonique, fin en suspension',
    location: 'Nexus des Sceaux (en effondrement) / Ashka-Prime'
  },
  {
    id: 'ch13_s1_fin_secrete',
    chapterId: 'ch13',
    sceneNumber: 1,
    title: 'Fin Secrète — La Porte qui S\'Ouvre dans l\'Autre Sens',
    type: 'narration',
    readAloud: `Vous faites ce que personne n'a jamais fait en mille ans.

Vous écoutez.

L'Entité est là, immense et terrifiée, pressée contre une porte qu'elle n'a jamais voulu franchir. Et quand vous tendez la main — non pas avec une arme, non pas avec un sort, mais avec de la compréhension — quelque chose d'extraordinaire se produit.

Les Sceaux ne se ferment pas. Ils s'OUVRENT. Mais pas vers votre monde — vers l'autre côté. Vers le lieu d'où l'Entité vient. Un passage inverse, une voie de retour.

L'Entité hésite. Vous sentez sa peur — et si c'était un piège ? Et si sa maison n'existait plus ? Deux mille ans d'enfermement, deux mille ans de solitude, et maintenant... une porte.

Puis elle passe. Comme un fleuve qui retrouve son lit, comme un oiseau qu'on libère, l'Entité traverse la Porte dans un rush de lumière et d'émotion pure. Et à travers le lien que vous partagez pendant une fraction de seconde, vous voyez son monde — un lieu de lumière vivante, de pensée cristallisée, d'une beauté si radicalement différente de la vôtre qu'elle en est presque incompréhensible.

Et puis la Porte se referme. Doucement. Naturellement. Sans Sceaux. Sans magie. Sans gardien. Parce qu'il n'y a plus rien à retenir.

Le silence qui suit est le plus profond que le monde ait jamais connu. Et dans ce silence, les Terres Brûlées commencent à guérir — non pas avec la violence d'une magie imposée, mais avec la douceur d'une blessure qui cicatrise enfin.

Dehors, l'armée ne comprend pas ce qui s'est passé. Ils voient la lumière, la guérison, l'herbe qui pousse. Ils pensent que vous avez restauré les Sceaux. Que vous avez vaincu le monstre. Mais vous savez la vérité.

Il n'y avait pas de monstre. Il n'y en a jamais eu. Juste un être perdu, loin de chez lui, qui voulait rentrer.

Et c'est peut-être la plus grande victoire de toutes : celle qui ne nécessite aucune épée.`,
    gmNotes: `LA FIN SECRÈTE — L'Entité est renvoyée chez elle.

C'est la "vraie" fin, la plus thématiquement riche. Elle ne peut être atteinte que si les PJ ont :
1. Parlé au Spectre d'Ashka (Ch11)
2. Écouté les notes de Théodore sur les Sceaux
3. Entendu l'histoire complète de Malachar
4. Réussi à communiquer avec l'Entité (Persuasion DC 28)

Thème central : le vrai héroïsme n'est pas toujours de frapper plus fort — c'est parfois de comprendre.

Cette fin change la nature de TOUTE la campagne rétrospectivement. Les Sceaux n'étaient pas une protection — c'était une prison. Les "invasions d'ombre" étaient les tentatives désespérées d'un être piégé. Les cultistes de Malachar étaient en partie manipulés par l'énergie de l'Entité, mais aussi par leur propre peur et incompréhension.

C'est une fin qui récompense les joueurs qui ont prêté attention au lore, qui ont posé des questions, qui ont cherché à comprendre plutôt qu'à vaincre.

L'Entité, en partant, laisse un "cadeau" : la guérison des Terres Brûlées est plus profonde et plus rapide que dans les autres fins. Des artefacts ashka enfouis remontent à la surface. Et chaque PJ ressent une paix profonde — comme si le monde lui-même disait merci.`,
    dialogues: [
      {
        npcId: 'npc_entite_adieu',
        npcName: 'L\'Entité (adieu)',
        lines: [
          { trigger: 'Départ', text: `*Ce n'est pas des mots. C'est un flot de gratitude si vaste qu'il vous coupe le souffle. Des images : votre visage, vu à travers des yeux qui perçoivent la lumière différemment. Vous êtes beaux, réalisez-vous. Pour l'Entité, les mortels sont d'une beauté terrible — fragiles, éphémères, et pourtant capables de compassion envers l'inconnu.* MERCI. PAS DE MOT SUFFISANT. ALORS : CADEAU. SOUVENIR. *Une chaleur envahit votre poitrine. Quelque chose a changé en vous. Quelque chose de permanent et de lumineux.*`, tone: 'gratitude cosmique' }
        ]
      },
      {
        npcId: 'npc_malachar_fin_secrete',
        npcName: 'Malachar (s\'il est vivant)',
        lines: [
          { trigger: 'Révélation', text: `*Il tombe à genoux, les yeux écarquillés, des larmes coulant librement.* Deux cents ans. Deux cents ans à la combattre. À me haïr. À haïr ce que je devenais. Et tout ce temps... *Il rit et pleure en même temps.* ...tout ce temps, elle voulait juste rentrer chez elle. *Il couvre son visage de ses mains.* Qu'est-ce que j'ai fait ? Qu'est-ce que nous avons TOUS fait ?`, tone: 'effondré, libéré' }
        ]
      }
    ],
    objectives: [
      { description: 'Ouvrir la Porte dans l\'autre sens pour l\'Entité', type: 'special', optional: false },
      { description: 'Assister au départ de l\'Entité', type: 'special', optional: false },
      { description: 'Comprendre la véritable nature des Sceaux', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'L\'Entité est partie, la Porte est refermée', nextScene: 'ch13_s5_epilogues', label: '→ Épilogues individuels (variante secrète)' }
    ],
    estimatedMinutes: 20,
    mood: 'émerveillement, compassion, paix profonde',
    music: 'Chœur céleste, harpe, silence lumineux, résolution en majeur parfait',
    location: 'Nexus des Sceaux — Cœur du Nexus'
  },
  {
    id: 'ch13_s5_epilogues',
    chapterId: 'ch13',
    sceneNumber: 5,
    title: 'Épilogues — Ce qui Reste Après',
    type: 'narration',
    readAloud: `Les semaines passent. Puis les mois.

Le monde guérit. Pas d'un coup — pas comme dans les contes — mais lentement, obstinément, comme tout ce qui vaut la peine de guérir.

L'Alliance tient. Contre toute attente, les factions qui ont combattu ensemble décident de rester ensemble. La Reine Elara fonde le Conseil des Peuples — nains, elfes, humains, tous assis à la même table. Le Général Marcus y est nommé Maréchal de la Paix, un titre qu'il porte avec une gêne touchante.

Le premier matin, six mois après la Bataille du Nexus, un cerf est aperçu dans les Terres Brûlées. Il broute de l'herbe nouvelle, au milieu de ce qui était un désert de cendres. Un éclaireur le dessine. Le dessin est encadré au Palais de Sol-Aureus, avec une plaque qui dit simplement : "L'Aube Nouvelle."

Et vous ? Vous qui avez porté le monde sur vos épaules depuis cette nuit dans la taverne du Dragon Rouillé... que faites-vous, maintenant que le monde n'a plus besoin de héros ?`,
    gmNotes: `LES ÉPILOGUES — Un par PNJ et un par PJ.

C'est la dernière scène de la campagne. Prenez-la au sérieux. Chaque joueur a le droit de raconter ce que son personnage fait après l'aventure. C'est leur moment — ne les pressez pas.

Structure :
1. Épilogues PNJ (vous les narrez)
2. Épilogues PJ (les joueurs les racontent, vous les aidez)
3. La scène finale

ÉPILOGUES PNJ (adaptez selon la fin choisie) :

Reine Elara : Fonde le Conseil des Peuples. Règne avec sagesse. Ne se marie jamais — "Mon cœur appartient au royaume." Visite chaque année le lieu où les héros ont combattu.

Général Marcus : Retrouve sa fille Lena. Prend sa retraite de l'armée. Ouvre une école de combat pour orphelins. Pleure à chaque remise de diplôme.

Théodore : Écrit un livre de 3000 pages sur l'aventure. Personne ne le lit en entier. Mais le résumé de 20 pages devient le manuel d'histoire standard. Il est furieux.

Brok le Tavernier : Le Dragon Rouillé devient le lieu de pèlerinage le plus célèbre d'Aethelgard. Brok refuse de changer quoi que ce soit. "C'est une taverne, pas un musée." Son ragoût de sanglier est désormais légendaire.

Ewen (le jeune soldat) : Survit. Rentre chez lui. Sa mère ne lit jamais la lettre — il la lui raconte de vive voix. Il devient garde royal. Des années plus tard, il racontera l'histoire à ses enfants, et ils ne le croiront pas.

Si Malachar a survécu (Fin Secrète ou raisonné) : S'exile volontairement. Voyage le monde en réparant ce qu'il a brisé. On le voit parfois aux carrefours, aidant des voyageurs. Il ne dit jamais son nom.

ÉPILOGUES PJ :
Demandez à chaque joueur : "Que fait ton personnage maintenant ?" Laissez-les raconter. Aidez-les si besoin. C'est leur histoire — respectez-la.

LA SCÈNE FINALE :
Quelle que soit la fin, terminez sur la même image : le Dragon Rouillé. Brok qui essuie un verre. Un groupe de jeunes aventuriers qui entre. Un vieil homme au fond de la salle qui raconte des histoires de héros.

Le cycle continue. L'aventure ne meurt jamais vraiment.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara',
        npcName: 'Reine Elara (épilogue)',
        lines: [
          { trigger: 'Des années plus tard', text: `*Lors de la cérémonie du premier anniversaire, devant le monument aux héros.* Il y a un an, le monde était au bord du gouffre. Aujourd'hui, un cerf broute dans les Terres Brûlées. Ce n'est pas grâce à moi. Ce n'est pas grâce à l'armée. C'est grâce à une poignée de gens qui, un soir, dans une taverne, ont décidé que le monde valait la peine d'être sauvé. *Elle regarde dans votre direction.* Et qui avaient raison.`, tone: 'reconnaissance, solennité' }
        ]
      },
      {
        npcId: 'npc_general_marcus',
        npcName: 'Général Marcus (épilogue)',
        lines: [
          { trigger: 'Retraite', text: `*Assis sur un banc, sa fille Lena sur les genoux, devant son école de combat.* Tu vois ces gens qui s'entraînent ? Un jour, le monde aura encore besoin de héros. Et quand ce jour viendra, ils seront prêts. *Lena lève les yeux.* "Comme toi, papa ?" *Long silence.* Non, ma puce. Comme eux. *Il regarde dans la direction de Sol-Aureus.* Comme les meilleurs que j'aie jamais connus.`, tone: 'tendre, nostalgique' }
        ]
      },
      {
        npcId: 'npc_theodore',
        npcName: 'Théodore (épilogue)',
        lines: [
          { trigger: 'Le livre', text: `*Dans sa bibliothèque, entouré de piles de manuscrits.* Trois mille deux cent quarante-sept pages ! Et ces éditeurs veulent un "résumé" ! *Il ajuste ses lunettes.* Un résumé ! On ne résume pas une épopée ! On ne résume pas l'histoire des gens les plus extraordinaires qui aient jamais— *Un assistant entre.* "Maître Théodore, le résumé de vingt pages s'est vendu à 50 000 exemplaires." *Silence.* ...Je hais le monde.`, tone: 'indigné puis résigné' }
        ]
      },
      {
        npcId: 'npc_brok',
        npcName: 'Brok le Tavernier (épilogue)',
        lines: [
          { trigger: 'Retour aux sources', text: `*Il essuie un verre, comme toujours. La taverne est bondée — des touristes, des pèlerins, des aventuriers en herbe.* Hé, vous êtes revenus ! *Son sourire n'a pas changé.* La même table ? Le ragoût est le même qu'avant. La bière aussi. Ici, rien ne change. *Il baisse la voix.* C'est pour ça que vous revenez, pas vrai ? Parce que dans un monde qui a failli finir... c'est bon de savoir qu'il y a un endroit où le ragoût sera toujours le même.`, tone: 'chaleureux, immuable' }
        ]
      }
    ],
    objectives: [
      { description: 'Vivre les épilogues de chaque PNJ', type: 'special', optional: false },
      { description: 'Chaque joueur raconte l\'épilogue de son personnage', type: 'special', optional: false },
      { description: 'Scène finale au Dragon Rouillé', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DE LA CAMPAGNE', nextScene: 'fin', label: '→ FIN — Les Sceaux Brisés' }
    ],
    estimatedMinutes: 45,
    mood: 'nostalgie, satisfaction, cycle éternel',
    music: 'Thème de la taverne du Chapitre 1, puis thème principal en version acoustique douce, fin en silence',
    location: 'Multiples lieux / Sol-Aureus — Le Dragon Rouillé'
  },
  {
    id: 'ch13_s6_scene_finale',
    chapterId: 'ch13',
    sceneNumber: 6,
    title: 'La Dernière Page',
    type: 'narration',
    readAloud: `Des années ont passé.

La porte du Dragon Rouillé grince en s'ouvrant sur une salle enfumée baignée d'une lumière ambrée. L'odeur du ragoût de sanglier se mêle à celle de la bière d'orge. Un vieux tavernier — le fils de Brok, qui lui ressemble trait pour trait — essuie un verre en sifflotant.

Au fond de la salle, près de la cheminée, un groupe de jeunes gens s'installe nerveusement. Ils portent des armes neuves et des armures trop grandes. L'un d'eux regarde autour de lui avec des yeux écarquillés — c'est sa première taverne.

Sur le mur, au-dessus de la cheminée, un portrait. Vos visages. En dessous, une plaque : "Ici commença l'aventure des Héros de l'Aube."

Un vieil homme au fond de la salle — certains disent que c'est Ewen, le jeune soldat, devenu vieux — fait signe aux jeunes aventuriers d'approcher.

"Asseyez-vous. J'ai une histoire à vous raconter. Ça commence ici même, il y a bien longtemps. Par une nuit où les ombres rampaient dans les égouts et où un vieux mineur disait avoir vu des yeux rouges..."

Il sourit.

"Vous allez adorer."

FIN`,
    gmNotes: `LA TOUTE DERNIÈRE SCÈNE.

Lisez ce texte lentement. C'est le miroir parfait de la scène d'ouverture du Chapitre 1. La taverne. Le vieil homme qui raconte des histoires. De jeunes aventuriers qui écoutent. Le cycle de l'héroïsme qui recommence.

Après avoir lu, faites un silence. Puis dites aux joueurs :

"C'est la fin de l'histoire des [noms des PJ]. Mais l'histoire d'Aethelgard continue. Merci d'avoir joué."

Et puis laissez le silence faire le reste.

Félicitations, MJ. Vous avez mené une campagne entière jusqu'à son terme. C'est un exploit rare et précieux. Soyez fier.`,
    dialogues: [
      {
        npcId: 'npc_ewen_vieux',
        npcName: 'Le Vieux Conteur (Ewen)',
        lines: [
          { trigger: 'L\'histoire', text: `*Il s'installe dans son fauteuil, celui qui est toujours réservé pour lui, et regarde les jeunes avec des yeux qui brillent.* Vous voulez savoir comment ça a vraiment commencé ? Pas la version des livres de Théodore — la vraie version. Celle avec le ragoût de Brok et le vieux Sam et ses yeux rouges dans les égouts. *Il rit.* Commandez une bière. Ça va prendre un moment.`, tone: 'malicieux, nostalgique' }
        ]
      }
    ],
    objectives: [
      { description: 'Écouter la dernière narration', type: 'special', optional: false },
      { description: 'Fin de la campagne', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DÉFINITIVE', nextScene: 'fin', label: '→ FIN DES SCEAUX BRISÉS' }
    ],
    estimatedMinutes: 10,
    mood: 'cercle complet, nostalgie, sourire',
    music: 'Taverne médiévale — luth, conversations — identique au Chapitre 1',
    location: 'Sol-Aureus — Le Dragon Rouillé (des années plus tard)'
  }
];

// ============================================================================
// EXPORT
// ============================================================================

export const NARRATIVE_SCENES_ACT5: NarrativeScene[] = [
  ...CH11_SCENES,
  ...CH12_SCENES,
  ...CH13_SCENES,
];
