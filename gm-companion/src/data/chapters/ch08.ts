/**
 * CHAPITRE 8 : LE CŒUR DE LA SYLVE (Niveau 9-10)
 * 6 scènes — Voyage vers le Cœur, épreuves de la Sylve, découverte d'Yggvan,
 *             rituel de renouvellement (combat de défense), révélations,
 *             trahison de Syrana
 *
 * THÈME CENTRAL : Connexion à la nature primordiale. Le Sceau est
 * renouvelé — première VRAIE victoire. Mais la trahison de Syrana
 * brise la confiance.
 */
import type { NarrativeScene, NarrativeChapter, SideQuest, RandomEncounter, RandomTable } from './types';

// ============================================================================
// SCÈNES PRINCIPALES
// ============================================================================

const CH8_SCENES: NarrativeScene[] = [
  // ────────────────────────────────────────────
  // SCÈNE 1 — LE SENTIER DES ESPRITS
  // ────────────────────────────────────────────
  {
    id: 'ch8_s1_sentier', chapterId: 'ch8', sceneNumber: 1,
    title: 'Le Sentier des Esprits', type: 'exploration',
    readAloud: `Faelorn s'arrête devant un mur de lianes anciennes. Il lève une main — et les lianes s'écartent comme un rideau vivant, révélant un sentier que la lumière n'a pas touché depuis des siècles.

"Le Sentier des Esprits," murmure-t-il. "Aucun mortel n'y a marché depuis Elara elle-même. La forêt nous teste maintenant — elle doit décider si vous êtes dignes de voir le Cœur."

Le chemin est étroit, recouvert de mousse phosphorescente. Des champignons géants émettent une douce lumière bleutée. L'air est lourd d'une magie ancienne — chaque respiration vous remplit d'une énergie vibrante et étrange. Des silhouettes se dessinent entre les arbres : ni elfes, ni bêtes, mais des esprits de la forêt, des formes translucides qui vous observent en silence.

Un cerf spectral se tient au milieu du sentier. Ses bois sont en lumière pure. Il vous fixe — puis s'enfonce dans les bois. Faelorn hoche la tête. "Il nous guide. Suivez-le."`,
    gmNotes: `VOYAGE MYSTIQUE — 3 épreuves avant d'atteindre Yggvan.

LE SENTIER DES ESPRITS : Le Cœur de la Sylve est protégé par trois épreuves imposées par la forêt elle-même. Elles testent le caractère, pas la force. Chaque épreuve est dirigée vers UN joueur en particulier (rotation) — les autres peuvent aider, mais c'est un test personnel.

LE CERF SPECTRAL (Guide) : Il apparaît et disparaît pour guider le groupe. S'ils le perdent de vue (Survie DC 14 pour retrouver la trace), ils errent pendant 1d4 heures (Constitution DC 12 ou 1 niveau d'épuisement).

AMBIANCE : Tout ici est VIVANT. Les arbres se déplacent lentement. Le sol pulse. Les sons sont étouffés — sauf les battements de cœur des joueurs. Lysandra est visiblement émue — c'est un lieu sacré pour les elfes, et elle n'a jamais eu le droit d'y entrer.

FAELORN : C'est la première fois depuis longtemps qu'il est ici. Il est solennel, presque révérencieux. Il parle moins, et quand il le fait, c'est en Sylvestre ancien.`,
    dialogues: [
      {
        npcId: 'npc_faelorn', npcName: 'Faelorn',
        lines: [
          { trigger: 'Entrée du Sentier', text: `*Voix basse, presque liturgique.* La Sylve est une mère. Elle protège ses enfants — y compris de ceux qui viennent avec de bonnes intentions mais des pieds lourds. Marchez doucement. La terre ici sent vos pensées.`, tone: 'révérencieux' },
          { trigger: 'Cerf spectral', text: `Yravel. Le Cerf de Lumière. Il ne guide que ceux que la forêt accepte. *Pause.* Le fait qu'il soit apparu... c'est un bon signe. Ne le décevons pas.`, tone: 'soulagé-respectueux' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Émerveillement', text: `*Touchant l'écorce d'un arbre géant, les yeux brillants.* Les anciens disaient que le Cœur de la Sylve est l'endroit où le monde a été rêvé le premier jour. L'endroit où le premier arbre a poussé, où le premier oiseau a chanté. *Sourire tremblant.* Je pensais que c'étaient des histoires.`, tone: 'émerveillement' },
          { trigger: 'Début du sentier', text: `*Regardant autour d'elle.* On m'a dit que le Sentier des Esprits choisit ses voyageurs. Tous ceux qui ont essayé sans permission se sont retrouvés au point de départ, marchant en cercle pendant des jours. *Elle regarde les joueurs.* Restez concentrés. La forêt parle — écoutez.`, tone: 'avertissement-respectueux' }
        ]
      }
    ],
    objectives: [
      { description: 'Suivre le Cerf de Lumière à travers le Sentier des Esprits', type: 'explore', optional: false },
      { description: 'Réussir les trois épreuves de la forêt', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Épreuve 1 réussie', nextScene: 'ch8_s2_epreuves', label: '→ Les Trois Épreuves' }
    ],
    skillChecks: [
      { skill: 'Survie', dc: 14, success: 'Vous retrouvez les traces lumineuses du cerf spectral.', failure: 'Vous errez dans la forêt vivante pendant 1d4 heures.' },
      { skill: 'Nature', dc: 13, success: 'Les esprits de la forêt vous observent avec curiosité — pas d\'hostilité.', failure: '' },
      { skill: 'Arcanes', dc: 15, success: 'La magie ici est primordiale — pas tissée par des mortels mais par la création elle-même.', failure: '' }
    ],
    estimatedMinutes: 15, mood: 'sacré-mystique',
    music: 'Sentier mystique — harpe elfique, bruissements, chant d\'oiseaux impossibles', location: 'Sylve d\'Émeraude — Sentier des Esprits'
  },

  // ────────────────────────────────────────────
  // SCÈNE 2 — LES TROIS ÉPREUVES
  // ────────────────────────────────────────────
  {
    id: 'ch8_s2_epreuves', chapterId: 'ch8', sceneNumber: 2,
    title: 'Les Trois Épreuves', type: 'choice',
    readAloud: `Le sentier s'ouvre sur une clairière circulaire. Trois chemins en partent, chacun marqué par un symbole gravé dans l'écorce d'un arbre ancien :
— Une RACINE (gravée à gauche)
— Un CŒUR (gravé au centre)
— Un ŒIL (gravé à droite)

Faelorn s'agenouille. "La Racine teste votre vérité. Le Cœur teste votre compassion. L'Œil teste votre perception. Chacun doit être traversé. La forêt veut savoir qui vous êtes."`,
    gmNotes: `TROIS ÉPREUVES — une par chemin. Chaque joueur peut tenter UNE épreuve. L'ordre n'importe pas. Les trois doivent être réussies pour accéder au Cœur.

═══════════════════════════════════════════
ÉPREUVE DE LA RACINE (Vérité) :
═══════════════════════════════════════════
Le joueur entre dans un passage souterrain. Au centre, un miroir d'eau. Le joueur voit son reflet — mais le reflet parle. Il pose UNE question à laquelle le joueur DOIT répondre honnêtement. Le MJ choisit la question basée sur le backstory du personnage :
• "Quel est le pire mensonge que tu aies jamais dit ?"
• "Qui as-tu abandonné ?"
• "De quoi as-tu le plus honte ?"

MÉCANIQUE : Pas de jet. C'est un moment de RP pur. Si le joueur ment (Insight du MJ), le reflet se fige et le miroir se brise — ce joueur prend 3d6 psychique et le chemin se ferme.

Si le joueur est honnête : le reflet sourit, hoche la tête, et disparaît. La Racine s'illumine. Le joueur gagne INSPIRATION.

═══════════════════════════════════════════
ÉPREUVE DU CŒUR (Compassion) :
═══════════════════════════════════════════
Le joueur entre dans une clairière où un louveteau blessé gémit, la patte prise dans un piège de fer. Le piège est rouillé et ne peut être ouvert par la force (pas de jet de Force possible — les mâchoires refusent de bouger). La seule façon de le libérer est de PRENDRE LA BLESSURE SUR SOI.

MÉCANIQUE : Le joueur doit volontairement accepter de transférer la douleur. En le faisant (déclaration en RP), le piège s'ouvre et le joueur prend 3d6 dégâts nécrotiques (qui ne peuvent pas être soignés avant le repos long). Le louveteau est libre et se transforme en un esprit de loup qui rejoint temporairement le groupe.

Si le joueur essaie de forcer le piège ou refuse : le louveteau meurt, le chemin se ferme, et le joueur ne gagne pas l'épreuve. Le groupe devra trouver un autre moyen (Faelorn peut intervenir, mais "cela l'affaiblit pour le rituel").

═══════════════════════════════════════════
ÉPREUVE DE L'ŒIL (Perception) :
═══════════════════════════════════════════
Le joueur entre dans une salle d'illusions. Dix copies de Faelorn apparaissent, toutes identiques. Elles parlent toutes, disant des choses contradictoires. Le joueur doit identifier le VRAI Faelorn.

MÉCANIQUE : Investigation ou Intuition DC 16. MAIS : le joueur peut poser UNE question à tous les Faelorn. Les faux ne peuvent pas mentir — ils répondent par des vérités trompeuses. Le vrai Faelorn répond simplement, avec sa voix réelle. Si le joueur a passé du temps à connaître Faelorn (RP dans les chapitres précédents), avantage au jet.

Si le joueur échoue : les copies disparaissent et le joueur est renvoyé au départ — il peut réessayer (une seule fois).`,
    dialogues: [
      {
        npcId: 'npc_faelorn', npcName: 'Faelorn',
        lines: [
          { trigger: 'Explication', text: `Je ne peux pas vous aider là-dedans. Les épreuves sont entre vous et la forêt. *Il recule.* Mais je peux vous dire ceci : la forêt ne cherche pas la perfection. Elle cherche la sincérité.`, tone: 'encourageant' },
          { trigger: 'Si une épreuve échoue', text: `*Visage grave.* La forêt a entendu un mensonge. Ou un cœur fermé. Ou des yeux aveugles. *Pause.* Il y a peut-être une autre chance. Mais chaque échec coûte quelque chose.`, tone: 'sérieux' }
        ]
      }
    ],
    objectives: [
      { description: 'Épreuve de la Racine — répondre honnêtement au miroir', type: 'social', optional: false },
      { description: 'Épreuve du Cœur — libérer le louveteau en acceptant la douleur', type: 'special', optional: false },
      { description: 'Épreuve de l\'Œil — identifier le vrai Faelorn', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Les 3 épreuves réussies', nextScene: 'ch8_s3_yggvan', label: '→ L\'Arbre-Monde Yggvan' }
    ],
    skillChecks: [
      { skill: 'Investigation ou Intuition', dc: 16, success: 'Vous identifiez le vrai Faelorn.', failure: 'Les copies disparaissent — vous êtes renvoyé au départ (1 nouvel essai).', criticalSuccess: 'Vous identifiez le vrai Faelorn ET percevez un message caché de la forêt : coordonnées du Cristal d\'Etoile.' }
    ],
    estimatedMinutes: 25, mood: 'test-sacré-intime',
    music: 'Épreuves — silence, battements de cœur, murmures de vent', location: 'Sylve d\'Émeraude — Clairière des Épreuves'
  },

  // ────────────────────────────────────────────
  // SCÈNE 3 — L'ARBRE-MONDE YGGVAN
  // ────────────────────────────────────────────
  {
    id: 'ch8_s3_yggvan', chapterId: 'ch8', sceneNumber: 3,
    title: 'L\'Arbre-Monde', type: 'exploration',
    readAloud: `Le sentier débouche — et le monde change.

Yggvan, l'Arbre-Monde, le Premier Arbre. Il n'y a pas de mots assez grands. Son tronc fait trois cents mètres de diamètre — une montagne vivante d'écorce dorée, de mousse émeraude, de racines qui plongent dans la terre comme des rivières. Ses branches, si haut qu'elles se perdent dans la brume, soutiennent un dôme de feuillage qui cache le ciel. La lumière qui filtre est verte, dorée, presque liquide.

Le Sceau de la Sylve Profonde brille au cœur des racines — un médaillon de lumière enchâssé dans l'écorce vivante. Mais les racines les plus proches du Sceau sont noires, comme brûlées de l'intérieur. Et l'arbre gémit — un son grave et sourd, comme un cœur malade.

Un Treant se dresse devant vous — si ancien que sa peau est pierre, ses branches sont des chênes entiers, et ses yeux sont des lacs de sève ambrine. Il attendait.

"Vous êtes venus," dit Oakenheart. Sa voix est le craquement de mille branches. "Il était temps."`,
    gmNotes: `SCÈNE DE RÉVÉLATION MAJEURE.

OAKENHEART (Treant Ancien, CR 9 — non hostile) :
• Il est le gardien des Sceaux depuis leur création. Il a 3000 ans.
• Il connu PERSONNELLEMENT les Sept Héros.
• Il n'attaque que si les joueurs agressent Yggvan.

CE QU'IL RÉVÈLE :
1. LES SCEAUX VIEILLISSENT : Ils ont été posés pour 150 ans. 120 ont passé. La magie s'effrite naturellement. Le Culte du Miroir n'a fait qu'accélérer ce que le temps aurait fait de toute façon.

2. LE SEPTIÈME HÉROS : Malachor le Traître était un des Sept. Il a posé les Sceaux AVEC les autres — c'est pourquoi il sait comment les briser. Oakenheart l'a vu toucher le Sceau avec "une lumière fausse, comme un feu peint". Oakenheart n'a rien dit. Sa honte est éternelle.

3. LE SCEAU PEUT ÊTRE RENOUVELÉ : Pas réparé — renouvelé. Un rituel dans les racines d'Yggvan, combinant le pouvoir nain (le Marteau de Thogrund) et elfique (le chant de la Sylve). Le seul problème : le rituel est "bruyant" dans le plan magique — il attirera les créatures d'ombre.

4. TEASER POUR PLUS TARD : Oakenheart mentionne que le Miroir Brisé n'est pas un symbole — c'est un OBJET. Et il est sous la Tour de Sombrelune.

MOMENT AVEC LE MARTEAU : Si les joueurs ont le Marteau de Thogrund, Oakenheart demande à le voir. Il touche le manche — et le Marteau VIBRE. "La terre et l'arbre se reconnaissent. Ce marteau a été forgé dans les racines d'Yggvan — le nain qui l'a forgé ne le savait pas, mais le métal venait d'ici."

RP MOMENT : Lysandra pleure. C'est le lieu le plus sacré du monde elfique, et elle n'avait jamais cru qu'elle le verrait. Laissez un moment de silence pour ça.`,
    dialogues: [
      {
        npcId: 'npc_oakenheart', npcName: 'Oakenheart (Treant Ancien)',
        lines: [
          { trigger: 'Arrivée', text: `*Ses yeux s'ouvrent lentement, comme le lever du soleil.* Vous êtes venus. La terre m'avait prévenu. Elle sent vos pas depuis le col de Torment. *Il regarde chacun des joueurs.* Je vois... un forgeron. Un chercheur. Un guerrier. Et quelque chose de vieux — plus vieux que moi. *Pause.* Bienvenue au Cœur.`, tone: 'ancienne-sagesse' },
          { trigger: 'Le Sceau', text: `Le Sceau... vieillit. Comme tout ce qui vit. Les Sept Héros l'ont posé pour 150 cycles solaires. Nous en sommes... au 120ème. La magie s'effrite. Les verrous rouillent. Et les ombres sentent la faiblesse. *Il touche les racines noires.* La corruption vient de l'intérieur — le temps, pas le Culte.`, tone: 'grave' },
          { trigger: 'Le rituel', text: `Je peux guider le renouvellement. Mais le rituel est long... et bruyant. Il chantera dans les veines de la terre. Et les ombres viendront, attirées par la lumière. Vous devrez me protéger. Protéger l'Arbre. Protéger le Sceau. *Il les regarde.* Pouvez-vous tenir ?`, tone: 'solennel' },
          { trigger: 'Les Sept', text: `J'ai connu les Sept. J'étais vieux quand ils étaient jeunes. Le Traître... *les branches frémissent* ... je l'ai senti quand il a posé sa main sur le Sceau. Sa lumière était... fausse. Comme un feu peint sur une toile. Mais je n'ai rien dit. *Les feuilles tremblent.* Ma honte est éternelle.`, tone: 'remords-profond' },
          { trigger: 'Marteau de Thogrund', text: `*Il touche le manche du Marteau. L'arbre entier vibre.* La terre et l'arbre se reconnaissent. Ce marteau a été forgé dans les racines d'Yggvan — le nain qui l'a forgé ne le savait pas, mais le métal venait d'ici. *Oakenheart sourit pour la première fois en mille ans.* Les enfants de la pierre et les enfants de la sève, réunis.`, tone: 'émerveillé' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'En voyant Yggvan', text: `*Elle tombe à genoux. Les larmes coulent sans bruit.* C'est... c'est réel. *D'une voix brisée.* On nous disait que c'était un mythe — un conte pour les à-mots. Mais il est là. Le Premier Arbre. Le Cœur de tout. *Elle rit et pleure en même temps.* Il est là.`, tone: 'émerveillement-sacré' }
        ]
      }
    ],
    objectives: [
      { description: 'Atteindre le cœur de la Sylve et l\'Arbre-Monde Yggvan', type: 'explore', optional: false },
      { description: 'Parler à Oakenheart et comprendre l\'affaiblissement naturel des Sceaux', type: 'talk', optional: false },
      { description: 'Se préparer pour le rituel de renouvellement', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Rituel prêt à commencer', nextScene: 'ch8_s4_rituel', label: '→ Le Rituel de l\'Arbre' }
    ],
    estimatedMinutes: 15, mood: 'sacré-ancien-révélation',
    music: 'Arbre-Monde — basses profondes, bruissements, chant de la terre', location: 'Sylve d\'Émeraude — Cœur, Yggvan'
  },

  // ────────────────────────────────────────────
  // SCÈNE 4 — LE RITUEL (COMBAT DE DÉFENSE)
  // ────────────────────────────────────────────
  {
    id: 'ch8_s4_rituel', chapterId: 'ch8', sceneNumber: 4,
    title: 'Le Chant des Racines', type: 'combat',
    readAloud: `Oakenheart commence le rituel. Ses branches s'enfoncent dans le sol et le monde vibre. Une lumière dorée émane de ses racines, se propageant dans celles d'Yggvan. Le sol tremble. L'air crépite de magie. Et le Sceau commence à briller — plus fort, plus clair.

Un guerrier nain pose le Marteau de Thogrund sur l'écorce de la racine principale. Le métal chante — une note pure, cristalline, qui se mêle au chant d'Oakenheart. Terre et arbre. Pierre et sève. Les deux magies s'entrelacent en spirales de lumière dorée et verte.

Puis les ombres arrivent.

Elles émergent du sol, des arbres, de l'air lui-même. Des créatures d'ombre de toutes tailles — des rejetons, des démons, des spectres — convergeant vers la source de lumière comme des papillons de nuit vers une flamme. Mais ces papillons ont des griffes.

"TENEZ !" rugit Oakenheart. "Le rituel a besoin de cinq chants complets ! NE LES LAISSEZ PAS ME TOUCHER !"`,
    gmNotes: `COMBAT DE DÉFENSE (5 rounds) — Le plus grand combat du chapitre.
═══════════════════════════════════════

TERRAIN :
• Oakenheart est au centre, immobile, canalisant le rituel. Rayon de 10ft.
• 4 racines géantes divisent la zone en 4 "couloirs" naturels — les joueurs peuvent se positionner.
• Le sol est couvert de mousse lumineuse — si une créature d'ombre marche dessus, elle prend 1d4 radiant.
• Le dôme de Yggvan fournit lumière vive (les créatures d'ombre sont désavantagées sur les attaques).

VAGUES :
Round 1 : 4x Rejeton d'Ombre (CR 1/2) — viennent des 4 couloirs.
Round 2 : 2x Démon d'Ombre (CR 3) — viennent du sud et de l'est.
Round 3 : 6x Ombre (CR 1/2) + 1x Spectre (CR 1) — swarm, submersion.
Round 4 : 1x Démon d'Ombre Majeur (CR 5) + 2x Rejetons — le Majeur charge Oakenheart en priorité.
Round 5 : Boss — Horreur d'Ombre (CR 7)

HORREUR D'OMBRE (Boss du chapitre) :
• AC 16 (ombre condensée)
• HP 95 (13d10+26)
• Vitesse 40ft, vol 30ft (planant)
• FOR 16 DEX 18 CON 14 INT 10 SAG 12 CHA 8
• TENTACULES (Multiattaque : 3) : +7, portée 15ft, 2d8+4 nécrotique
• AURA DE PEUR (DC 15, rayon 30ft) : JDS Sagesse ou effrayé 1 round
• DRAIN DE VIE : Si une tentacule touche, la cible fait JDS Constitution DC 14 ou perd 1d4 HP max jusqu'au repos long.
• RÉSISTANCE aux dégâts non-magiques et nécrotiques
• VULNÉRABILITÉ aux dégâts radieux

PROTECTION D'OAKENHEART : S'il est touché 3 fois, le rituel est interrompu et doit recommencer (ajoutez 2 rounds de plus). S'il est touché 6 fois, le rituel échoue — Faelorn peut le reprendre mais le Sceau sera plus faible.

AIDE DES ELFES : 8 archers elfiques aux côtés des joueurs. Chaque round, ils font 2d6 dégâts totaux distribués sur les créatures les plus faibles (décidé par le MJ). Ils ne gèrent PAS les grosses menaces.

LE MARTEAU : Si un joueur utilise le Marteau de Thogrund pour frapper une créature d'ombre, +2d6 radiant en bonus. Le Marteau résonne avec le rituel.`,
    dialogues: [
      {
        npcId: 'npc_oakenheart', npcName: 'Oakenheart',
        lines: [
          { trigger: 'Début round 3', text: `*Voix tendue, le rituel le consume.* Le troisième chant... *crack* ...les racines tiennent ! Encore deux ! NE LES LAISSEZ PAS PASSER !`, tone: 'effort-désespéré' },
          { trigger: 'Round 5 — Horreur arrive', text: `*Un rugissement.* LA GRANDE OMBRE ! *Oakenheart craque.* Elle vient du Miroir lui-même ! La prison de Malachor se fissure pour l'envoyer ! DÉTRUISEZ-LA !`, tone: 'terreur-urgence' }
        ]
      }
    ],
    objectives: [
      { description: 'Protéger Oakenheart pendant 5 rounds de rituel', type: 'combat', optional: false },
      { description: 'Repousser les vagues de créatures d\'ombre', type: 'combat', optional: false },
      { description: 'Vaincre l\'Horreur d\'Ombre (round 5)', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Rituel réussi', nextScene: 'ch8_s5_renouveau', label: '→ L\'Aube Dorée' }
    ],
    encounters: ['Vagues progressives (CR 1/2 → CR 7)', 'Boss : Horreur d\'Ombre (CR 7)'],
    estimatedMinutes: 30, mood: 'combat-défense-sacré',
    music: 'Rituel — chant elfique montant, percussions d\'ombre, crescendo round 5', location: 'Sylve d\'Émeraude — Racines d\'Yggvan'
  },

  // ────────────────────────────────────────────
  // SCÈNE 5 — L'AUBE DORÉE (Victoire)
  // ────────────────────────────────────────────
  {
    id: 'ch8_s5_renouveau', chapterId: 'ch8', sceneNumber: 5,
    title: 'L\'Aube Dorée', type: 'narration',
    readAloud: `Le cinquième chant d'Oakenheart résonne dans les profondeurs de la terre. Le Sceau de la Sylve Profonde explose de lumière — une colonne dorée qui traverse la canopée et perce les nuages. Yggvan entier s'illumine : chaque feuille, chaque branche, chaque racine irradie une lumière dorée qui repousse les ombres comme le soleil dissipe la brume.

Les créatures d'ombre se désintègrent en hurlant. La forêt entière chante — un chœur de millions de feuilles, de milliers d'oiseaux, d'une vie entière qui célèbre sa survie.

Le sol tremble une dernière fois — et soudain, là où les racines étaient noires, des pousses vertes jaillissent. Des fleurs impossibles s'ouvrent — des lys de lumière, des roses d'émeraude, des orchidées qui brillent comme des étoiles tombées.

Oakenheart se redresse lentement. "Le Sceau est renouvelé. Plus fort qu'avant. Car il porte maintenant la marque de deux peuples unis — la pierre et la sève. Comme il aurait toujours dû l'être."

Lysandra tombe à genoux, les larmes aux yeux. "La Sylve est sauvée."

C'est votre première vraie victoire depuis que tout a commencé.`,
    gmNotes: `SCÈNE DE VICTOIRE ET RÉVÉLATION.

LE SCEAU EST RENOUVELÉ : C'est le Sceau le plus fort des sept maintenant — parce qu'il combine la magie naine et elfique. C'est aussi un refuge stratégique pour l'Alliance.

CE QU'OAKENHEART PARTAGE (après le rituel, quand tout est calme) :
• Le Miroir Brisé n'est pas un symbole — c'est la PRISON de Malachor, le Septième Héros devenu démon. Il existe dans un espace entre les mondes.
• Malachi, son héritier, cherche à libérer Malachor en brisant les Sceaux. Le Miroir est sous la Tour de Sombrelune.
• Si les Sceaux tombent, le Miroir s'ouvre. Si le Miroir s'ouvre, Malachor revient — et le monde retourne à l'Ère des Cendres. DÉFINITIVEMENT.

ÉTAT DES SCEAUX (récapitulatif pour les joueurs) :
1. Sceau de la Forêt — Stabilisé (Ch1-2)
2. Sceau de la Pierre — Protégé par les nains (Ch4-5)
3. Sceau du Lac — BRISÉ (Ch6) — fragments récupérés
4. Sceau de la Sylve Profonde — RENOUVELÉ, le plus fort (Ch8)
5-7. Trois autres Sceaux — statut inconnu, probablement menacés

RÉCOMPENSES À DISTRIBUER :
• Bénédiction d'Yggvan : avantage permanent aux JDS contre ombre
• Branche Vivante d'Yggvan : focus magique +2, bonus +1d6 radiant 1/jour
• Le loup-esprit (de l'épreuve du Cœur) reste — familier temporaire, dure jusqu'à la fin du chapitre
• Inspiration pour chaque joueur

RP : Laissez les joueurs savourer. C'est peut-être le dernier moment de paix avant Sombrelune.`,
    dialogues: [
      {
        npcId: 'npc_oakenheart', npcName: 'Oakenheart',
        lines: [
          { trigger: 'Le Miroir', text: `Le Miroir Brisé... n'est pas seulement un symbole. C'est la prison de Malachor — le Septième Héros. Celui qui a trahi. Les Six autres l'ont emprisonné DANS le Miroir. Il existe dans un espace entre les mondes. Et Malachi, son héritier, cherche à l'en libérer.`, tone: 'grave-apocalyptique' },
          { trigger: 'Sombrelune', text: `Le Miroir est gardé sous la Tour de Sombrelune — la forteresse que Malachi a construite à l'exacte confluence des Sept Sceaux. Si les Sceaux tombent, le Miroir s'ouvre. Si le Miroir s'ouvre...  Malachor revient. Et le monde retourne à l'Ère des Cendres. *Pause.* Définitivement, cette fois.`, tone: 'apocalyptique' },
          { trigger: 'Remerciements', text: `*Oakenheart pose une branche-main sur la tête du joueur le plus proche.* La terre vous remercie. L'arbre vous remercie. Et moi... un vieil arbre qui a fait trop d'erreurs... je vous remercie. *La main se retire.* Allez. Le monde a encore besoin de vous.`, tone: 'gratitude-paternelle' }
        ]
      },
      {
        npcId: 'npc_faelorn', npcName: 'Faelorn',
        lines: [
          { trigger: 'Après le rituel', text: `*Regardant le Sceau renouvelé, souriant.* Je n'avais jamais vu autant de lumière ici. *Il se tourne vers les joueurs.* Les Sept Héros ont posé les Sceaux seuls. Vous, vous les renforcez ensemble. Nains, elfes, humains. C'est peut-être CELA, la vraie magie.`, tone: 'espoir-philosophique' }
        ]
      }
    ],
    objectives: [
      { description: 'Célébrer le renouvellement du Sceau', type: 'special', optional: false },
      { description: 'Apprendre la vérité sur le Miroir Brisé et Malachor', type: 'talk', optional: false }
    ],
    transitions: [
      { condition: 'Révélations complètes', nextScene: 'ch8_s6_trahison', label: '→ La Trahison' }
    ],
    loot: [
      'Sceau de la Sylve Profonde (renouvelé — point de force stratégique)',
      'Bénédiction d\'Yggvan (avantage permanent JDS contre ombre)',
      'Branche Vivante d\'Yggvan (focus magique +2, +1d6 radiant 1/jour)',
      'Loup-esprit (familier temporaire si épreuve du Cœur réussie)'
    ],
    estimatedMinutes: 12, mood: 'victoire-sacrée-paix',
    music: 'Renaissance — chœurs elfiques, lumière dorée, espoir pur', location: 'Sylve d\'Émeraude — Yggvan illuminé'
  },

  // ────────────────────────────────────────────
  // SCÈNE 6 — LA TRAHISON DE SYRANA
  // ────────────────────────────────────────────
  {
    id: 'ch8_s6_trahison', chapterId: 'ch8', sceneNumber: 6,
    title: 'L\'Ombre dans la Lumière', type: 'narration',
    readAloud: `La célébration se fane quand un cor elfique retentit — un signal d'alarme.

Un éclaireur arrive en courant, blessé, une flèche noire dans l'épaule. "Le Conseil — attaque au Haut-Pavillon — la Conseillère Syrana —" Il s'effondre.

Faelorn pâlit. "Syrana ? Qu'est-ce que —"

Les nouvelles arrivent par fragments, portées par des messagers terrifiés. Pendant que vous étiez au Cœur de la Sylve, Syrana — Maître de la Guerre elfique, membre du Conseil de Faelorn, alliée de confiance depuis le début — a frappé. Elle a ouvert les portes du côté nord de la cité sylvestre aux forces du Culte du Miroir. Vingt guerriers elfiques sont morts. Les archives du Savoir Ancien — les textes qui contenaient les plans de construction des Sceaux originaux — ont été volées.

Et Syrana a disparu.

Faelorn ne dit rien. Pendant un long moment, il reste immobile. Puis, d'une voix que personne ne lui a jamais entendue — froide, brisée — il dit :

"Elle était ma sœur d'âme. Je lui aurais confié ma vie. Je LUI AI confié ma vie."

Il regarde les joueurs. "Ils ont les plans. Ils savent maintenant comment briser TOUS les Sceaux. Le temps que nous avions gagné... vient de fondre."`,
    gmNotes: `TWIST MAJEUR — La trahison de Syrana.

QUI EST SYRANA :
• Elfe, 350 ans, Maître de la Guerre du Conseil
• Compagne de longue date de Faelorn — ils ont combattu ensemble pendant 200 ans
• Les joueurs l'ont peut-être rencontrée au Ch7 — elle était présente aux réunions, compétente, fiable
• Elle est une "Réflexion" du Culte — une taupe de longue date

CE QU'ELLE A VOLÉ :
• Les Archives du Savoir Ancien — les plans de construction originaux des Sept Sceaux
• Avec ces plans, le Culte peut briser les Sceaux restants en JOURS au lieu de SEMAINES
• C'est une course contre la montre maintenant

IMPACT SUR FAELORN : C'est dévastateur. Faelorn perd confiance en son propre jugement. Il se reproche de ne pas avoir vu les signes. C'est un moment de vulnérabilité pour un PNJ qui a toujours été le "sage compétent". Les joueurs doivent maintenant LE soutenir, pas l'inverse.

CONSÉQUENCES :
• Le délai avant que Malachi puisse frapper est réduit de 3 semaines à ~1 semaine
• Les joueurs doivent accélérer — le Conseil de Guerre (Ch9) devient URGENT
• Syrana devient un antagoniste récurrent — elle apparaîtra à Sombrelune (Ch11)

NOTE RP : Ne faites PAS de Syrana un villain caricatural. Elle croit sincèrement que Malachor est la SOLUTION, pas le problème — elle pense que le monde a besoin d'être "purifié" pour être reconstruit. Sa trahison vient d'une conviction, pas de la cruauté.`,
    dialogues: [
      {
        npcId: 'npc_faelorn', npcName: 'Faelorn',
        lines: [
          { trigger: 'Annonce de la trahison', text: `*Silence complet. Ses mains tremblent.* Syrana... non. Pas elle.  *Il s'assied. Lentement. Comme si ses jambes ne le tenaient plus.* Elle était ma sœur d'âme. Trois cents ans. Trois cents ans et je n'ai rien vu.`, tone: 'brisé' },
          { trigger: 'Plan d\'action', text: `*Après un long moment, il se relève. Sa voix est froide — pas de colère, juste... du vide.* Les Archives sont perdues. Malachi sait maintenant comment atteindre chaque Sceau. *Il regarde les joueurs.* On n'a plus le temps de réfléchir. Le Conseil de Guerre — Sol-Aureus — immédiatement. On ne peut plus se battre seuls. Nains, elfes, humains — tout le monde ensemble, ou tout le monde mort.`, tone: 'résolution-froide' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Trahison', text: `*Sous le choc.* Syrana... je la connaissais. J'ai COMBATTU sous ses ordres. *Sa main serre son arc si fort que ses jointures blanchissent.* Quand on la retrouvera... *Elle ne finit pas sa phrase.* Allons à Sol-Aureus. Il n'y a plus de temps.`, tone: 'rage-froide' }
        ]
      }
    ],
    objectives: [
      { description: 'Apprendre la trahison de Syrana et ses conséquences', type: 'special', optional: false },
      { description: 'Soutenir Faelorn dans ce moment de crise', type: 'social', optional: true },
      { description: 'Décider de la marche à suivre — direction Sol-Aureus pour le Conseil de Guerre', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 8 — Direction Sol-Aureus', nextScene: 'ch9_s1_preparations', label: '→ Ch.9 : Le Conseil de Guerre' }
    ],
    estimatedMinutes: 15, mood: 'trahison-choc-urgence',
    music: 'Silence, puis deuil — cordes brisées, un cor elfique qui sonne le glas', location: 'Sylve d\'Émeraude — Cité Sylvestre'
  }
];

// ============================================================================
// QUÊTES SECONDAIRES DU CHAPITRE 8
// ============================================================================

const CH8_SIDE_QUESTS: SideQuest[] = [
  {
    id: 'sq_ch8_cristal_etoile',
    title: 'Le Cristal d\'Étoile',
    description: 'Un cristal de mana pure est caché dans la canopée d\'Yggvan — accessible uniquement via un chemin d\'escalade dans les branches supérieures.',
    giver: 'Oakenheart',
    hookText: '"Les branches supérieures d\'Yggvan gardent un joyau de lumière pure. Peu ont la force de l\'atteindre."',
    objectives: [
      'Escalader les branches d\'Yggvan (3 jets d\'Athlétisme DC 14, chute = 3d6 contondant)',
      'Traverser le Nid des Faucons-Tempête (2 créatures CR 3, peuvent être soumises avec Dressage DC 16)',
      'Récupérer le Cristal d\'Étoile dans la Couronne de l\'Arbre'
    ],
    reward: 'Cristal d\'Étoile (+2 jets de sorts, recharge 1d4 emplacements de sorts 1/semaine)',
    estimatedMinutes: 20,
    difficulty: 'difficile',
    activeChapters: ['ch8']
  },
  {
    id: 'sq_ch8_fantome_elara',
    title: 'L\'Écho d\'Elara',
    description: 'Le spectre d\'Elara (la fondatrice elfique des Sept Héros) apparaît dans les racines d\'Yggvan. Elle a un message — et une mise en garde.',
    giver: 'Elara (spectre)',
    hookText: '"*Un écho de voix elfique résonne dans les racines.* Écoutez... le septième n\'est pas ce que vous croyez..."',
    objectives: [
      'Trouver le sanctuaire d\'Elara dans les racines profondes (Perception DC 15)',
      'Communiquer avec le spectre (Arcanes DC 14 pour stabiliser la connexion)',
      'Écouter la mise en garde d\'Elara sur Malachor'
    ],
    reward: 'Info capitale : la faiblesse de Malachor (sa connexion au Miroir peut être coupée par un Sceau renouvelé utilisé comme ancre). Amulette d\'Elara (+1 CA contre créatures d\'ombre).',
    consequenceIfIgnored: 'Les joueurs ne découvrent la faiblesse de Malachor qu\'au Ch11 — en plein combat final.',
    estimatedMinutes: 15,
    difficulty: 'moyen',
    activeChapters: ['ch8']
  }
];

// ============================================================================
// TABLE — RENCONTRES ALÉATOIRES (Sylve Profonde)
// ============================================================================

const CH8_ENCOUNTER_TABLE: RandomTable = {
  id: 'rt_ch8_sylve_profonde',
  title: 'Rencontres dans la Sylve Profonde',
  type: 'encounter',
  region: 'Sylve d\'Émeraude — Cœur',
  entries: [
    {
      d20Range: '1-4',
      description: 'Esprits Danseurs — Des formes de lumière verte dansent entre les arbres. Pas hostiles. Si un joueur danse avec eux (Performance DC 12), il récupère 2d8 HP et inspiration.',
      gmNotes: 'Pur RP. Moment de beauté dans le danger.'
    },
    {
      d20Range: '5-8',
      description: 'Araignée Sylvestre Géante — Une araignée dorée de 3m qui tisse des toiles entre les branches. Pas hostile sauf si provoquée. Sa soie vaut 200 PO si récoltée proprement.',
      difficulty: 'moyen',
      creatures: ['1x Araignée Géante (CR 1) — variante dorée, venin paralysant 1 round'],
      loot: ['Soie Sylvestre (200 PO, composant pour armure magique)']
    },
    {
      d20Range: '9-12',
      description: 'Dryade Curieuse — Elle apparaît et pose des questions personnelles aux joueurs. Si on répond honnêtement, elle offre un fruit de guérison (2d8+4 HP).',
      gmNotes: 'RP. La dryade jauge les intentions du groupe.'
    },
    {
      d20Range: '13-16',
      description: 'Ombre Rampante — Une créature d\'ombre qui s\'est infiltrée dans la Sylve. Elle attaque par surprise depuis les branches.',
      difficulty: 'moyen',
      creatures: ['1x Ombre Rampante (CR 2 — comme Ombre mais avec escalade 40ft et embuscade)'],
      gmNotes: 'Signe que la corruption atteint même le Cœur.'
    },
    {
      d20Range: '17-20',
      description: 'Source de Lumière — Une nappe d\'eau magique dans une clairière. Boire restaure tous les HP et supprime 1 niveau d\'épuisement. Utilisable une seule fois par personne.',
      loot: ['Fiole de Lumière Liquide (si remplie — soigne 4d8 HP, 1 dose)']
    }
  ]
};

// ============================================================================
// EXPORT
// ============================================================================

export const CHAPTER_8: NarrativeChapter = {
  id: 'ch8', number: 8, title: 'Le Cœur de la Sylve',
  subtitle: 'Les épreuves de la forêt, le renouvellement du Sceau, et la trahison de Syrana',
  summary: `Voyage mystique à travers le Sentier des Esprits avec trois épreuves personnelles (Vérité, Compassion, Perception). Découverte de l'Arbre-Monde Yggvan et d'Oakenheart le Treant Ancien. Combat de défense pour protéger le rituel de renouvellement du Sceau (5 vagues, boss Horreur d'Ombre CR 7). Révélation sur le Miroir Brisé / prison de Malachor. Trahison de Syrana — urgence accrue pour le Conseil de Guerre.`,
  suggestedLevel: 9, region: 'Sylve d\'Émeraude — Cœur, Yggvan',
  themes: ['Sacré', 'Épreuves personnelles', 'Combat de défense', 'Révélation majeure', 'Trahison', 'Alliance nains-elfes'],
  scenes: CH8_SCENES,
  chapterSideQuests: CH8_SIDE_QUESTS,
  randomTables: [CH8_ENCOUNTER_TABLE],
  previousChapter: 'ch7', nextChapter: 'ch9'
};
