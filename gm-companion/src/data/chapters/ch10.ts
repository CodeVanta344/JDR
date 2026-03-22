/**
 * CHAPITRE 10 : LA MARCHE VERS SOMBRELUNE (Niveau 11-12)
 * 6 scènes — Marche des armées (4 jours), embuscade dans le col,
 *             dilemme moral du village, dernier Sceau, arrivée
 *             devant la Tour, veille de bataille
 *
 * THÈME CENTRAL : Escalade. Le monde se meurt à mesure qu'on
 * approche de Sombrelune. Les joueurs doivent garder le moral des
 * troupes et affronter les derniers obstacles.
 */
import type { NarrativeScene, NarrativeChapter, SideQuest, RandomTable } from './types';

// ============================================================================
// SCÈNES PRINCIPALES
// ============================================================================

const CH10_SCENES: NarrativeScene[] = [
  // ────────────────────────────────────────────
  // SCÈNE 1 — LA MARCHE (Jours 1-2)
  // ────────────────────────────────────────────
  {
    id: 'ch10_s1_marche', chapterId: 'ch10', sceneNumber: 1,
    title: 'L\'Armée de la Lumière', type: 'narration',
    readAloud: `L'armée de l'Alliance quitte Sol-Aureus à l'aube. Trois colonnes : les fantassins humains au centre, les haches naines à droite, les archers elfiques à gauche. Des bannières de trois couleurs claquent au vent — or, argent, et émeraude.

Le premier jour est lumineux. Les soldats chantent. Les éclaireurs rapportent des routes dégagées. Tout semble presque... normal.

Le deuxième jour, tout change.

Les arbres sont morts. Pas desséchés — vides. Comme si la vie avait été aspirée du bois. Le sol est gris. Les oiseaux ne chantent plus. Et l'air a un goût — métallique, âcre, comme du sang séché. Les soldats cessent de chanter.

Un corbeau noir se pose sur l'étendard de la Reine. Dans son bec, un parchemin scellé d'un cachet en miroir brisé. Le message de Malachi.`,
    gmNotes: `MARCHE EN DEUX PHASES — Jours 1-2.

JOUR 1 : Marche normale. Le MJ devrait faire quelques interactions RP rapides :
• Un soldat demande aux joueurs un conseil ("Est-ce qu'on va gagner ?")
• Grundar chante un chant nain de guerre — qui dérange les elfes
• Lysandra fait un pari avec un joueur : "Premier arrivé au sommet de cette colline ?"

JOUR 2 : L'environnement change VISIBLEMENT. Les arbres morts, la terre grise — utilisez la description sensorielle : goût de métal, silence total, froid surnaturel. Les chevaux sont nerveux. Un chien de guerre refuse d'avancer.

LE MESSAGE DE MALACHI : Parchemin magique qui résonne avec sa voix quand ouvert. Il propose aux joueurs de "servir le Miroir" en échange de pouvoir et d'immortalité. C'est une tentation narrative — Malachi est sincère, il croit que les joueurs devraient le rejoindre.

MÉANIQUE IMPORTANT : JDS Sagesse DC 14 pour chaque joueur quand ils lisent le message. Échec : une graine de doute s'installe (désavantage au prochain jet de moral en Ch11). Ce n'est pas de la contrainte — c'est la magie de Malachi qui cherche les fissures.

Répondre au message est optionnel. Si les joueurs envoient une réponse (le corbeau attend), Malachi lit tout ce qu'ils écrivent — c'est de l'information que le Culte peut utiliser.`,
    dialogues: [
      {
        npcId: 'npc_malachi_message', npcName: 'Malachi (message)',
        lines: [
          { trigger: 'Le parchemin', text: `*L'oiseau noir dépose un parchemin scellé d'un cachet en miroir brisé. La voix de Malachi résonne quand vous l'ouvrez.* "Sentinelles. J'admire votre obstination. Sincèrement. Mais vous vous battez pour un monde qui ne mérite pas votre sacrifice. Un monde de rois faibles, de préjugés, et de souffrance. Le Miroir offre une renaissance. Pas la destruction — la TRANSFORMATION. Rejoignez-moi. Je vous offre une place à la table du nouveau monde."`, tone: 'séducteur-solennel' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Le message', text: `*Arrachant le parchemin.* Ne l'écoutez pas. C'est ce qu'il FAIT — il trouve le doute et il s'y accroche. *Elle brûle le parchemin.* On ne négocie pas avec celui qui veut détruire le monde.`, tone: 'furieuse' }
        ]
      }
    ],
    objectives: [
      { description: 'Mener l\'armée vers Sombrelune (Jours 1-2)', type: 'travel', optional: false },
      { description: 'Répondre ou ignorer le message de Malachi', type: 'talk', optional: true }
    ],
    transitions: [
      { condition: 'Jour 3 — Col des Lamentations', nextScene: 'ch10_s2_embuscade', label: '→ L\'Embuscade du Col' }
    ],
    skillChecks: [
      { skill: 'Sagesse (JDS)', dc: 14, success: 'Le message de Malachi ne vous affecte pas.', failure: 'Une graine de doute s\'installe (désavantage au prochain jet de moral en Ch11).' }
    ],
    estimatedMinutes: 12, mood: 'marche-dégradation',
    music: 'Marche — tambours, corruption, silence qui s\'installe', location: 'Route vers Sombrelune — Jours 1-2'
  },

  // ────────────────────────────────────────────
  // SCÈNE 2 — L'EMBUSCADE DU COL
  // ────────────────────────────────────────────
  {
    id: 'ch10_s2_embuscade', chapterId: 'ch10', sceneNumber: 2,
    title: 'Le Col des Lamentations', type: 'combat',
    readAloud: `Jour 3. La route traverse le Col des Lamentations — un défilé étroit entre deux falaises de roche noire. Le nom ne ment pas : un vent permanent gémit entre les parois, comme des voix perdues.

L'armée s'étire en file. Les éclaireurs reviennent — nerveux. "Quelque chose dans les roches, Général. Ça ne bouge pas, mais ça OBSERVE."

Le Général Marcus lève le poing. La colonne s'arrête. Silence.

Puis les rochers s'animent.

Des créatures de pierre noire — des Goules de Basalte — jaillissent des falaises en une avalanche de griffes et de mâchoires. Des spectres plongent depuis le ciel. Un cri strident déchire l'air : un Vouivre d'Ombre — une bête ailée de dix mètres, couverte de ténèbres, fond sur l'avant-garde.

"EMBUSCADE ! FORMEZ LES RANGS !"`,
    gmNotes: `COMBAT D'EMBUSCADE — L'armée est attaquée mais les joueurs ont un rôle précis.

TERRAIN :
• Col étroit (30ft de large, 500ft de long)
• Falaises de 50ft de haut de chaque côté
• 3 "goulots" dans le col — les points où l'armée est le plus vulnérable
• L'armée gère les créatures mineures — les joueurs affrontent les menaces principales

LES TROUPES GÈRENT : Les Goules de Basalte (CR 2, ×20) et les Spectres (CR 1, ×8). L'armée les repousse en 4 rounds de combat. Les joueurs NE COMBATTENT PAS cela — background de la scène.

LES JOUEURS AFFRONTENT :
• 1× Vouivre d'Ombre (CR 8) — le boss de la scène
  - AC 17 (écailles d'ombre)
  - HP 110 (13d10+39)
  - Vol 60ft, terrestre 20ft
  - Morsure : +9, 2d10+5 perçant + 2d6 nécrotique
  - Griffes (Multiattaque : 2) : +9, 2d6+5 tranchant
  - SOUFFLE D'OMBRE (Recharge 5-6) : cône 30ft, DC 16 Constitution, 8d6 nécrotique (moitié si réussi)
  - Résistance : non-magique, nécrotique
  - Vulnérabilité : radiant

• 2× Cultiste-Chevalier d'Ombre (CR 5)
  - AC 18 (plaque + ombre)
  - HP 72 (8d10+24)
  - Épée d'ombre : +8, 2d8+4 tranchant + 1d8 nécrotique
  - Aura de Peur (bonus) : créatures alliées dans 10ft gagnent +2 attaque

OBJECTIF SECONDAIRE : Grundar est coincé sous un éboulement (Force DC 17 ou 2 joueurs DC 13 chacun). S'il n'est pas libéré en 3 rounds, il est gravement blessé (réduit pour Ch11).`,
    dialogues: [
      {
        npcId: 'npc_general_marcus', npcName: 'Général Marcus',
        lines: [
          { trigger: 'Embuscade', text: `*Épée tirée, bouclier levé.* FORMATION DE TORTUE ! Première et deuxième lignes, BOUCLIERS ! Archers, contre les falaises ! *Il se tourne vers les joueurs.* La créature volante — c'est pour vous ! Abattez-la avant qu'elle ne ravage mes lignes !`, tone: 'commandement-urgent' }
        ]
      },
      {
        npcId: 'npc_grundar', npcName: 'Grundar',
        lines: [
          { trigger: 'Coincé', text: `*Sous les rochers, voix étouffée.* Par Thogrund... les pierres. Les PIERRES me tiennent ! *Il rit malgré tout.* Un nain coincé par de la ROCHE ! Si je m'en sors, je ne le raconterai JAMAIS.`, tone: 'en-difficulté-humour' }
        ]
      }
    ],
    objectives: [
      { description: 'Vaincre la Vouivre d\'Ombre (CR 8)', type: 'combat', optional: false },
      { description: 'Vaincre les 2 Cultistes-Chevaliers d\'Ombre (CR 5)', type: 'combat', optional: false },
      { description: 'Libérer Grundar de l\'éboulement (Force DC 17)', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Col traversé', nextScene: 'ch10_s3_village', label: '→ Le Village de Cendrier' }
    ],
    encounters: ['Vouivre d\'Ombre (CR 8)', '2× Cultiste-Chevalier d\'Ombre (CR 5)'],
    skillChecks: [
      { skill: 'Force', dc: 17, success: 'Grundar est libéré des éboulis.', failure: 'Grundar est gravement blessé — il boîte pour les prochains chapitres.', criticalSuccess: 'Grundar est libéré indemne et déclenche un éboulement sur les ennemis (+4d6 dégâts à la Vouivre).' }
    ],
    loot: ['Écailles de Vouivre (composant armure magique, valeur 800 PO)', 'Épée d\'Ombre (arme +2, +1d8 nécrotique)'],
    estimatedMinutes: 20, mood: 'embuscade-chaos',
    music: 'Combat surgissant — percussions chaotiques, cris, vent hurlant', location: 'Col des Lamentations'
  },

  // ────────────────────────────────────────────
  // SCÈNE 3 — LE VILLAGE DE CENDRIER
  // ────────────────────────────────────────────
  {
    id: 'ch10_s3_village', chapterId: 'ch10', sceneNumber: 3,
    title: 'Le Dilemme de Cendrier', type: 'choice',
    readAloud: `Après le col, la route traverse les ruines d'un petit village. Cendrier — autrefois un hameau de fermiers. Les maisons sont vides. Les champs sont morts. Et au centre du village, un groupe de survivants.

Trente villageois — femmes, enfants, vieillards — se blottissent autour d'un puits asséché. Ils sont maigres, couverts de crasse, les yeux éteints. Quand ils voient l'armée, certains pleurent de soulagement. D'autres restent figés.

Une femme — Mère Agna, la doyenne — s'avance. "L'armée de l'Alliance. Enfin." Sa voix est comme du sable. "Le Culte est passé il y a trois jours. Ils ont pris nos hommes — tous ceux en âge de porter une arme. Pour les murs de Sombrelune, ils disent. Des esclaves pour les mines d'ombre."

Elle regarde le Général. "Et ils ont laissé CECI." Elle montre un cercle de runes sombres autour du village. "Si quelqu'un essaie de partir, les runes... font mal. Trois enfants sont morts en essayant de fuir."`,
    gmNotes: `DILEMME MORAL — Pas de bonne réponse parfaite.

LA SITUATION :
• 30 villageois piégés par un cercle de runes nécromantiques
• Les runes font 5d8 nécrotique à quiconque traverse le périmètre
• Pour les désactiver : 2 heures de travail par un mage (Arcanes DC 16)
• OU : Force brute — détruire les 6 pylônes de runes (chacun a 50 HP, AC 12, mais chaque destruction envoie une onde de 3d6 nécrotique rayon 20ft)

LE DILEMME :
• OPTION A : S'arrêter 2-3 heures pour sauver les villageois. Cela SIGNIFIE que l'armée perd du temps — le tunnel nain avance sans la couverture de l'armée. Impact : les nains sont détectés 50% plus tôt à Sombrelune.
• OPTION B : Laisser un détachement pour libérer les villageois et continuer avec le gros de l'armée. Impact : perte de 200 soldats (le détachement rejoint plus tard, peut-être trop tard).
• OPTION C : Ignorer les villageois et continuer. Impact : pas de perte de temps, pas de perte de troupes. MAIS : les joueurs reçoivent un point de "Karma Sombre" — au Ch12, un PNJ leur reprochera d'avoir abandonné des innocents.

CE QUE LES JOUEURS NE SAVENT PAS : Les runes sont aussi un piège d'alerte — les désactiver enverra un signal à Sombrelune. Malachi saura que l'armée est dans la zone. Mais NE PAS les désactiver signifie abandonner des innocents.

AUCUNE option n'est parfaite. C'est le but.`,
    dialogues: [
      {
        npcId: 'npc_mere_agna', npcName: 'Mère Agna',
        lines: [
          { trigger: 'Arrivée', text: `*Voix brisée.* Nos hommes... ils les ont pris. Tomas, mon fils — 16 ans. Ils l'ont traîné avec les autres. Vers la Tour. *Elle attrape la main d'un joueur.* S'il vous plaît. Pas pour nous — pour les enfants. Ils meurent ici. La terre est empoisonnée. L'eau est noire. Sauvez au moins les enfants.`, tone: 'désespoir' }
        ]
      },
      {
        npcId: 'npc_general_marcus', npcName: 'Général Marcus',
        lines: [
          { trigger: 'Dilemme', text: `*La mâchoire serrée.* Chaque heure qu'on perd ici, c'est une heure de plus pour Malachi. *Il regarde les villageois.* Mais si on les laisse... *Long silence.* Ce n'est pas ma décision. *Il regarde les joueurs.* C'est la vôtre. Vous avez mérité ce droit.`, tone: 'déchiré' }
        ]
      }
    ],
    objectives: [
      { description: 'Décider du sort du village de Cendrier', type: 'special', optional: false },
      { description: 'Désactiver les runes (Arcanes DC 16, 2h) OU détruire les pylônes OU abandonner', type: 'choice', optional: false }
    ],
    transitions: [
      { condition: 'Choix fait', nextScene: 'ch10_s4_dernier_sceau', label: '→ Le Sceau du Crépuscule' }
    ],
    skillChecks: [
      { skill: 'Arcanes', dc: 16, success: 'Les runes sont désactivées proprement — 2 heures perdues mais pas de signal.', failure: 'Les runes résistent — il faudra les détruire par la force (signal envoyé).', criticalSuccess: 'Vous désactivez les runes ET découvrez un raccourci caché dans les runes — économie de 1 heure.' }
    ],
    estimatedMinutes: 15, mood: 'dilemme-moral-sombre',
    music: 'Silence — vent, pleurs d\'enfants, craquement de bois mort', location: 'Village de Cendrier'
  },

  // ────────────────────────────────────────────
  // SCÈNE 4 — LE SCEAU DU CRÉPUSCULE
  // ────────────────────────────────────────────
  {
    id: 'ch10_s4_dernier_sceau', chapterId: 'ch10', sceneNumber: 4,
    title: 'Le Sceau du Crépuscule', type: 'combat',
    readAloud: `À une journée de marche de Sombrelune, la route traverse un ancien sanctuaire — le Temple du Crépuscule. Six menhirs de pierre grise forment un cercle autour d'une flamme éternelle — ou ce qui devrait être une flamme éternelle. Elle est éteinte. Le Sceau du Crépuscule brille faiblement au sol, entouré de runes de sabotage — le Culte a commencé le travail mais n'a pas fini.

Des cultistes en plein rituel. Et au centre — une silhouette qui vous glace.

Alorn. Le Bibliothécaire de la Sylve d'Émeraude. Celui que vous pensiez innocent. Il n'était pas une victime de Syrana — il était son COMPLICE. Il a quitté la Sylve après sa chute pour rejoindre le Culte directement.

Il lève les yeux. Un sourire froid.

"Ah. Vous m'avez manqué."`,
    gmNotes: `COMBAT + COURSE CONTRE LA MONTRE.

TWIST : Alorn est le second espion. Syrana était le niveau 1, Alorn le niveau 2. Le Culte avait des couches de contingence — une leçon que Malachor a apprise en 3 000 ans de prison.

COMBAT :
• Alorn le Traître (Mage de Guerre Elfique, CR 7)
  - AC 15 (Armure de Mage + Bouclier)
  - HP 66 (12d8+12)
  - +7 aux attaques de sorts
  - SORTS CLÉS : Mur de Force, Image Miroir, Contre-Sort, Éclair, Flétrissement
  - TACTIQUE : Reste derrière un Mur de Force, lance Éclair/Flétrissement, Contre-Sort les sorts de soin. Si le mur tombe, Image Miroir.
  - FAIBLESSE : Il est arrogant — il peut être provoqué (Intimidation DC 15) pour briser sa concentration sur le Mur.

• 8× Cultiste Rituel (CR 1) — chantent autour du Sceau
  - Pas de menace en combat — mais chaque round où au moins 3 chantent, le rituel de sabotage progresse
  - Tuer ou neutraliser les chanteurs = arrêter le rituel

• 2× Élémentaire d'Ombre (CR 5)
  - AC 14, HP 52
  - Slam : +7, 2d8+3 nécrotique
  - ABSORPTION : soigne de la moitié des dégâts nécrotiques subis par les alliés dans 10ft

COURSE CONTRE LA MONTRE : Le rituel de sabotage est à 4 rounds de la complétion quand les joueurs arrivent. Si les joueurs n'interrompent pas le rituel en 4 rounds :
• Religion/Arcanes DC 15 pour interrompre (action, 1 joueur)
• OU tuer au moins 6 des 8 chanteurs
• OU vaincre Alorn (le rituel cesse à sa mort)
Si le rituel aboutit → le Sceau est BRISÉ → 5 sur 7 Sceaux brisés → la situation est quasi-désespérée en Ch11.`,
    dialogues: [
      {
        npcId: 'npc_alorn', npcName: 'Alorn le Traître',
        lines: [
          { trigger: 'Confrontation', text: `*Sourire glacial.* Vous avez cru que c'était fini avec Syrana ? La pauvre fille n'était que le rideau. Moi, j'étais la scène derrière. Le Maître pense en millénaires — pas en semaines. *Il lève les mains.* Et maintenant, le dernier Sceau libre tombe.`, tone: 'condescendant' },
          { trigger: 'Mur de Force brisé', text: `*Pour la première fois, une lueur de peur.* Comment — IMPOSSIBLE. Le Mur était parfait ! *Il recule.* Vous n'êtes pas des aventuriers ordinaires... Malachor avait raison de vous craindre.`, tone: 'panique' },
          { trigger: 'Vaincu', text: `*À genoux.* Peu importe... le Miroir est presque... ouvert. Quatre Sceaux brisés... c'est assez pour le Premier Traître. Malachor... vient... *Il s'effondre.*`, tone: 'mourant-exalté' }
        ]
      }
    ],
    objectives: [
      { description: 'Interrompre le rituel de sabotage en 4 rounds', type: 'special', optional: false },
      { description: 'Vaincre Alorn le Traître (CR 7)', type: 'combat', optional: false },
      { description: 'Neutraliser les Élémentaires d\'Ombre (2× CR 5)', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Sceau sauvé ou brisé', nextScene: 'ch10_s5_vue_tour', label: '→ En vue de la Tour' }
    ],
    encounters: ['Alorn le Traître (CR 7)', '8× Cultiste Rituel (CR 1)', '2× Élémentaire d\'Ombre (CR 5)'],
    skillChecks: [
      { skill: 'Religion/Arcanes', dc: 15, success: 'Le rituel est interrompu — le Sceau est sauvé.', failure: 'Le rituel continue — tuez les chanteurs ou Alorn.' },
      { skill: 'Intimidation', dc: 15, success: 'Alorn perd sa concentration sur le Mur de Force.', failure: 'Alorn rit. Le Mur tient.' }
    ],
    loot: ['Sceau du Crépuscule (sauvé ou non)', 'Bâton d\'Alorn (focus +2, sorts d\'illusion)', '500 PO', 'Journal d\'Alorn (infos sur les défenses de Sombrelune)'],
    estimatedMinutes: 20, mood: 'combat-trahison-course',
    music: 'Rituel interrompu — urgence, dissonance, crescendo', location: 'Temple du Crépuscule'
  },

  // ────────────────────────────────────────────
  // SCÈNE 5 — EN VUE DE SOMBRELUNE
  // ────────────────────────────────────────────
  {
    id: 'ch10_s5_vue_tour', chapterId: 'ch10', sceneNumber: 5,
    title: 'La Tour des Ombres', type: 'narration',
    readAloud: `Au crépuscule du quatrième jour.

Vous la voyez.

La Tour de Sombrelune se dresse à l'horizon comme une lame d'obsidienne plantée dans la terre. Haute de cent mètres, sans fenêtres, sans portes visibles, elle est entourée d'un anneau de désolation — une terre si morte que même la poussière semble ne pas oser se poser.

Autour de la base de la Tour, une armée d'ombre. Des MILLIERS de créatures — rejetons, démons, morts-vivants, cultistes fanatiques — forment un mur vivant entre vous et votre objectif. Des feux noirs brûlent dans des braseros de fer. Des bannières du Miroir Brisé claquent dans un vent qui ne souffle que là-bas.

Et au sommet de la Tour, une lumière — pâle, pulsante, malade. Le Miroir.

L'armée de l'Alliance campe sur la crête qui surplombe la plaine. Quatre mille combattants regardent ce qu'ils vont affronter demain. Le silence est absolu.

Lysandra murmure : "Là-bas. C'est là que tout se joue."`,
    gmNotes: `SCÈNE DE MISE EN PLACE — PAS DE COMBAT.

L'ÉCHELLE DE L'ENNEMI (ce que les joueurs voient) :
• ~2 000 cultistes en formation autour de la base de la Tour
• ~500 créatures d'ombre de taille variée (rejetons, démons)
• ~200 morts-vivants (squelettes et revenants en armure)
• 3 Démons d'Ombre Majeurs (géants de 5m, visibles même à distance)
• La Tour elle-même : 100m de haut, matériau noir inconnu, aucune ouverture visible

LE PLAN (rappel) :
1. À l'aube, les 3 armées lancent l'assaut de diversion
2. Les nains ont creusé un tunnel (entrée à 200m du campement, sortie sous la Tour)
3. Les joueurs entrent par le tunnel pendant la bataille

INFORMATIONS DU TUNNEL (Grundar rapporte) :
• Le tunnel est prêt — 500m de long, stable
• Il débouche dans les sous-sols de la Tour (anciennes catacombes)
• Les elfes ont enchantéales murs pour masquer le son (si Durinn et Faelorn sont réconciliés)
• Si PAS réconciliés : le tunnel n'est pas enchantéé → 50% chance d'être détecté

DERNIÈRE NUIT : Le MJ demande à chaque joueur : "Qu'est-ce que votre personnage fait cette nuit ?" C'est le dernier moment de calme.`,
    dialogues: [
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'La Tour', text: `*Les yeux fixés sur la Tour.* 120 ans depuis que les Sept Héros ont scellé Malachor. 120 ans de paix. Et tout ça se résume à demain. *Elle se tourne.* Quoi qu'il arrive — je suis fière d'avoir marché à vos côtés. Vous êtes les meilleurs compagnons qu'un elfe pourrait souhaiter. *Sourire.* Même si vous mangez comme des barbares.`, tone: 'humour-émotion' }
        ]
      },
      {
        npcId: 'npc_grundar', npcName: 'Grundar',
        lines: [
          { trigger: 'Le tunnel', text: `*Essuyant la terre de ses mains.* C'est fait. 500 mètres de bonne roche, renforcée par les meilleurs maçons de Hammerdeep. Le tunnel débouche dans les vieilles catacombes sous la Tour. *Il regarde les joueurs.* C'est votre route, héros. Nous, on fera assez de bruit pour que personne ne regarde en bas.`, tone: 'fierté-solennité' }
        ]
      },
      {
        npcId: 'npc_general_marcus', npcName: 'Général Marcus',
        lines: [
          { trigger: 'Plan final', text: `*Debout devant la carte, éclairé par une lanterne.* À l'aube, les cors sonneront. L'infanterie humaine prend le centre. Les nains, le flanc gauche. Les elfes, le flanc droit et l'appui aérien. *Il regarde les joueurs.* Quand vous entendrez les cors cesser... c'est que soit nous avons gagné la surface, soit... *Il ne finit pas.* Faites vite là-dessous.`, tone: 'gravité-totale' }
        ]
      }
    ],
    objectives: [
      { description: 'Observer les défenses de Sombrelune', type: 'investigate', optional: false },
      { description: 'Recevoir le rapport du tunnel de Grundar', type: 'talk', optional: false },
      { description: 'Confirmer le plan final avec le Général Marcus', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Repos accompli', nextScene: 'ch10_s6_aube', label: '→ L\'Aube de Fer' }
    ],
    estimatedMinutes: 10, mood: 'veille-bataille-finale',
    music: 'Silence avant la tempête — vent, respiration, battement de cœur', location: 'Crête surplombant Sombrelune'
  },

  // ────────────────────────────────────────────
  // SCÈNE 6 — L'AUBE DE FER
  // ────────────────────────────────────────────
  {
    id: 'ch10_s6_aube', chapterId: 'ch10', sceneNumber: 6,
    title: 'L\'Aube de Fer', type: 'transition',
    readAloud: `L'aube n'est qu'un pâle reflet orange derrière un ciel de cendres. Mais elle est là.

Les cors sonnent.

L'armée de l'Alliance se met en marche — une vague de quatre mille guerriers qui descend la crête vers la plaine de Sombrelune. Les boucliers brillent comme un fleuve d'acier. Les chants de guerre résonnent dans trois langues. Et de l'autre côté de la plaine, les créatures d'ombre hurlent en réponse.

Pendant que les armées s'affrontent, vous descendez dans le tunnel. Grundar vous serre la main à l'entrée. "Par Thogrund et par l'Alliance. Allez-y. Nous tiendrons."

L'obscurité vous avale.

Devant vous, sous la terre, sous la guerre, sous le bruit — le cœur de Sombrelune vous attend. Le Miroir Brisé. Et dans le Miroir, Malachor — le Premier Traître — qui attend depuis 120 ans.

La bataille finale commence.`,
    gmNotes: `SCÈNE DE TRANSITION — FIN DU CHAPITRE 10.

MOMENT CINÉMATIQUE. Pas de mécanique — lecture et gravité.

RÉCAPITULATIF POUR LE MJ (préparer Ch11) :
═══════════════════════════════════════════
CE QUI ATTEND LES JOUEURS DANS LA TOUR :
• Sous-sol 1 : Catacombes (morts-vivants gardiens)
• Sous-sol 2 : Le Sanctuaire de Malachi (salle de commandement)
• Rez-de-chaussée : Syrana (confrontation)
• Étages : Ascension vers le sommet (pièges + créatures)
• Sommet : Le Miroir Brisé + Malachi (boss final)

VARIABLES QUI AFFECTENT LA DIFFICULTÉ :
✓/✗ Le tunnel est-il enchantéé ? (oui si Durinn-Faelorn réconciliés)
✓/✗ Le Sceau du Crépuscule est-il intact ?
✓/✗ Combien d'espions ont été capturés au Ch9 ?
✓/✗ Le village de Cendrier a-t-il été sauvé ?
✓/✗ L'armée est-elle en bon moral ?
✓/✗ Les joueurs ont-ils les objets clés ? (Marteau, Éclat, Branche, Bénédiction)`,
    dialogues: [],
    objectives: [
      { description: 'Entrer dans le tunnel sous Sombrelune', type: 'special', optional: false },
      { description: 'FIN DU CHAPITRE 10 — La bataille finale commence', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 10', nextScene: 'ch11_s1_bataille', label: '→ Ch.11 : La Bataille de Sombrelune' }
    ],
    estimatedMinutes: 5, mood: 'épique-descente-finale',
    music: 'Guerre — cors, tambours, puis silence du tunnel', location: 'Entrée du tunnel → Sous Sombrelune'
  }
];

// ============================================================================
// QUÊTES SECONDAIRES DU CHAPITRE 10
// ============================================================================

const CH10_SIDE_QUESTS: SideQuest[] = [
  {
    id: 'sq_ch10_desertion',
    title: 'Le Déserteur',
    description: 'Un soldat humain — le sergent Hovan — tente de déserter la nuit. Les joueurs le surprennent. Il ne fuit pas par lâcheté — il a une fille malade à Sol-Aureus et veut la revoir avant la fin.',
    giver: 'Rencontre aléatoire (patrouille de nuit)',
    hookText: '"*Surpris, il tombe à genoux.* Je vous en supplie — ma fille. Elsa. Elle a 7 ans. Le prêtre dit qu\'elle ne passera pas l\'hiver. Si je meurs demain, elle mourra seule..."',
    objectives: [
      'Décider du sort d\'Hovan (le laisser partir, le renvoyer aux troupes, l\'aider autrement)',
      'Persuasion DC 13 pour convaincre Marcus de lui accorder un message magique à sa fille',
      'OU Médecine DC 15 + herbes de la Sylve : préparer un remède pour la fille'
    ],
    reward: 'Si aidé : Hovan reste et se bat avec une ferveur de lion (il survit à la bataille — on le retrouve vivant en Ch12). Bonus karma.',
    consequenceIfIgnored: 'Hovan déserte. Découvert le lendemain — exécuté pour désertion devant les troupes. Le moral baisse.',
    estimatedMinutes: 10,
    difficulty: 'facile',
    activeChapters: ['ch10']
  },
  {
    id: 'sq_ch10_relique',
    title: 'La Relique du Septième',
    description: 'Dans les ruines près du Temple du Crépuscule, un passage caché mène à la tombe d\'un des Sept Héros — Seraphiel la Guérisseuse. Son bâton sacré est encore là.',
    giver: 'Découverte (Perception DC 16 en explorant le Temple)',
    hookText: '"*Un escalier de pierre descend sous le Temple. Sur le mur, un nom gravé : SERAPHIEL — CELLE QUI SOIGNE LE MONDE.*"',
    objectives: [
      'Trouver le passage secret (Perception DC 16)',
      'Résoudre l\'énigme de la tombe (3 autels, chacun demande un objet symbolique — une larme, du sang, un rire)',
      'Récupérer le Bâton de Seraphiel'
    ],
    reward: 'Bâton de Seraphiel (+3 soins magiques, 1/jour : Guérison de Masse niveau 5). L\'arme ultime du soigneur du groupe.',
    estimatedMinutes: 20,
    difficulty: 'difficile',
    activeChapters: ['ch10']
  }
];

// ============================================================================
// TABLE — RENCONTRES SUR LA ROUTE
// ============================================================================

const CH10_MARCH_TABLE: RandomTable = {
  id: 'rt_ch10_route_sombrelune',
  title: 'Rencontres sur la Route de Sombrelune',
  type: 'encounter',
  region: 'Terres corrompues vers Sombrelune',
  entries: [
    {
      d20Range: '1-4',
      description: 'Soldat effondré — Un jeune fantassin assis au bord de la route, incapable de continuer. Épuisement + peur. Persuasion DC 12 ou Médecine DC 11 pour le remettre sur pied.',
      gmNotes: 'RP. Le moral des troupes est fragile.'
    },
    {
      d20Range: '5-8',
      description: 'Ombre Errante — Une créature d\'ombre solitaire rôde en périphérie de la marche. Pas dangereuse seule, mais elle signale la position de l\'armée.',
      difficulty: 'facile',
      creatures: ['1× Ombre Errante (CR 1/2)'],
      gmNotes: 'Si tuée discrètement (Discrétion DC 14), pas de signal. Sinon, +1 au compteur d\'alerte de Sombrelune.'
    },
    {
      d20Range: '9-12',
      description: 'Autel Abandonné — Un petit sanctuaire dédié à un des Sept Héros. Si un joueur prie (Religion DC 12), il récupère 2d6 HP et gagne inspiration.',
      loot: ['Médaillon du Héros (valeur sentimentale, +1 moral si porté en bataillle)']
    },
    {
      d20Range: '13-16',
      description: 'Éclaireur ennemi — Un cultiste sur une monture d\'ombre observe l\'armée depuis une crête. S\'il s\'échappe (2 rounds pour l\'atteindre), Sombrelune est prévenue.',
      difficulty: 'moyen',
      creatures: ['1× Éclaireur Cultiste (CR 2) sur Loup d\'Ombre (CR 1)'],
      gmNotes: 'Vitesse de la monture : 50ft. Portée d\'arc : 120ft.'
    },
    {
      d20Range: '17-20',
      description: 'Source Sacrée — Une source d\'eau pure au milieu de la désolation. L\'eau est bénie — en boire restaure tous les HP et supprime 1 malédiction.',
      loot: ['Fiole d\'Eau Bénite (3 doses, +2d6 radiant lancé sur créature d\'ombre)']
    }
  ]
};

// ============================================================================
// EXPORT
// ============================================================================

export const CHAPTER_10: NarrativeChapter = {
  id: 'ch10', number: 10, title: 'La Marche vers Sombrelune',
  subtitle: 'L\'armée avance à travers les terres corrompues vers la bataille finale',
  summary: `Marche de 4 jours à travers des terres de plus en plus corrompues. Message séducteur de Malachi. Embuscade au Col des Lamentations (Vouivre d'Ombre CR 8). Dilemme moral au village de Cendrier. Combat au Temple du Crépuscule pour sauver le dernier Sceau (Alorn le Traître CR 7). Arrivée devant Sombrelune et descente dans le tunnel.`,
  suggestedLevel: 11, region: 'Route vers Sombrelune',
  themes: ['Marche militaire', 'Corruption grandissante', 'Embuscade', 'Dilemme moral', 'Dernier Sceau', 'Veille de bataille'],
  scenes: CH10_SCENES,
  chapterSideQuests: CH10_SIDE_QUESTS,
  randomTables: [CH10_MARCH_TABLE],
  previousChapter: 'ch9', nextChapter: 'ch11'
};
