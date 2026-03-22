/**
 * CHAPITRE 7 : LA SYLVE D'ÉMERAUDE (Niveau 8-9)
 * 5 scènes — Diplomatie elfique, espion, Sceau de la Forêt Profonde
 */
import type { NarrativeScene, NarrativeChapter } from './types';

const CH7_SCENES: NarrativeScene[] = [
  {
    id: 'ch7_s1_sylve', chapterId: 'ch7', sceneNumber: 1,
    title: 'L\'Entrée dans la Sylve', type: 'exploration',
    readAloud: `La Sylve d'Émeraude est tout ce que la Forêt de Murmures n'est plus. Les arbres ici sont immenses — des séquoias enchantés dont les cimes touchent les nuages, leurs troncs larges comme des maisons. La lumière du soleil filtre à travers le feuillage en cascades dorées, illuminant un sous-bois de mousse et de fleurs luminescentes.

Des sentiers invisibles vous guident — Lysandra les suit comme si elle lisait un livre. "Mon peuple a tissé des enchantements dans la forêt. Seuls les elfes et leurs invités peuvent trouver le chemin. Sans guide, vous marcheriez en cercle pendant des jours."

Après quatre heures de marche, les arbres s'écartent et vous découvrez Sylvandell — la cité elfique — construite dans les branches des arbres géants, reliée par des ponts de lierre vivant et des escaliers en spirale dans les troncs. C'est la chose la plus belle que vous ayez jamais vue.`,
    gmNotes: `Arrivée dans le royaume elfique. Contact initial avec les gardes sylvains (qui s'attendent à Lysandra mais sont méfiants envers les non-elfes). RP important : les elfes sont isolationnistes et arrogants — ils ne croient pas que la menace justifie de briser leur isolement. Lysandra doit les convaincre (ou les joueurs doivent impressionner le Conseil).

Le Haut Seigneur Thalion dirige le Conseil — il est respectueux mais sceptique. L'espion du culte est l'intendante Syrana — les joueurs ne le savent pas encore mais des indices sont semés dès cette scène (elle est trop serviable, pose trop de questions).`,
    dialogues: [
      {
        npcId: 'npc_thalion', npcName: 'Haut Seigneur Thalion',
        lines: [
          { trigger: 'Accueil', text: `*Un elfe d'une beauté irréelle, les cheveux d'argent, les yeux de saphir.* Lysandra. Tu reviens avec des... étrangers. Le Conseil avait interdit les contacts avec l'extérieur. *Son regard passe sur les joueurs.* Néanmoins, ces temps sont exceptionnels. Parlez. Qu'avez-vous à dire qui justifie de briser notre solitude ?`, tone: 'froid-poli' },
          { trigger: 'Les preuves', text: `*En examinant les fragments de Sceau et le symbole du Miroir Brisé.* Troublant. Nous avons senti les perturbations, bien sûr. Mais nous pensions que le problème était... extérieur. *Pause.* Vous dites que les Sceaux sont attaqués systématiquement ? Et qu'il y a un espion parmi nous ?`, tone: 'inquiet-masqué' },
          { trigger: 'L\'alliance', text: `*Après délibération.* Le Conseil accepte de vous aider — à une condition. Nous ne rejoindrons pas votre "Alliance" tant que l'espion n'aura pas été démasqué. Trouvez le traître, et les archers de la Sylve marcheront avec vous. Échouez, et nous défendrons nos forêts seuls.`, tone: 'conditionnel' }
        ]
      },
      {
        npcId: 'npc_syrana', npcName: 'Intendante Syrana',
        lines: [
          { trigger: 'Serviable', text: `*Une elfe gracieuse aux yeux noisette.* Je suis Syrana, intendante du Conseil. Je suis à votre disposition pour tout ce dont vous avez besoin pendant votre séjour. Chambres, nourriture, accès aux archives... *Sourire aimable.* Et si vous avez des questions sur la Sylve, n'hésitez pas.`, tone: 'trop-aimable' },
          { trigger: 'Questions indiscrètes', text: `Dites-moi, quels sont vos prochains plans ? Avez-vous d'autres pistes sur le culte ? *En voyant votre méfiance.* Oh, pardonnez-moi. Simple curiosité — je suis responsable de la sécurité des invités, après tout.`, tone: 'espion-subtil' }
        ]
      }
    ],
    objectives: [
      { description: 'Entrer dans la Sylve d\'Émeraude avec Lysandra', type: 'travel', optional: false },
      { description: 'Présenter les preuves au Conseil elfique', type: 'talk', optional: false },
      { description: 'Accepter la mission de démasquer l\'espion', type: 'talk', optional: false }
    ],
    transitions: [
      { condition: 'Mission d\'espionnage acceptée', nextScene: 'ch7_s2_enquete', label: '→ Enquête dans Sylvandell' }
    ],
    skillChecks: [
      { skill: 'Perspicacité', dc: 16, success: 'Syrana est trop curieuse — ses questions semblent innocentes mais elle cherche des informations tactiques.', failure: 'Syrana semble être une elfe aimable et serviable.' }
    ],
    estimatedMinutes: 15, mood: 'émerveillement-méfiance',
    music: 'Elfes — harpe, flûte, nature enchantée', location: 'Sylve d\'Émeraude — Sylvandell'
  },
  {
    id: 'ch7_s2_enquete', chapterId: 'ch7', sceneNumber: 2,
    title: 'Le Masque du Traître', type: 'exploration',
    readAloud: `Démasquer un espion dans une société aussi fermée que celle des elfes sylvains est un défi. Trois suspects émergent rapidement : l'Intendante Syrana, le Maître des Archers Elaran, et le Bibliothécaire Alorn. Chacun avait accès aux informations sensibles, chacun a montré des comportements suspects ces derniers mois.

Lysandra vous guide dans les couloirs de lierre de Sylvandell, partageant ce qu'elle sait de chacun : "Syrana gère la logistique — elle sait tout sur nos défenses. Elaran est notre meilleur combattant mais il a fait des voyages mystérieux. Et Alorn a accès aux archives des Sceaux."

Il faut recueillir des preuves. Fouiller des quartiers. Poser des questions. Et faire attention — l'espion sait que vous le cherchez.`,
    gmNotes: `Enquête en trois temps. Indices pour chaque suspect :
- SYRANA (coupable) : Fouille de ses quartiers (Investigation DC 15) → un cristal de communication dans un compartiment secret. Interrogation d'un garde (Persuasion DC 13) → elle sort la nuit une fois par semaine. Piéger un message (Intelligence check DC 14) → elle transmet des infos au culte via un oiseau messager enchanté.
- ELARAN (innocent — ses "voyages" sont des rendez-vous romantiques avec une humaine dans un village voisin). Perspicacité DC 12 pour voir sa gêne quand on lui pose des questions — il cache un secret personnel, pas une trahison.
- ALORN (innocent — il a copié des textes sur les Sceaux mais c'est par curiosité académique, pas par malveillance). Investigation DC 11 pour voir que ses notes sont purement théoriques.

Si les joueurs accusent le mauvais suspect, conséquences diplomatiques. S'ils accusent Syrana avec des preuves, le Conseil est horrifié mais reconnaissant.`,
    dialogues: [
      {
        npcId: 'npc_elaran', npcName: 'Maître Elaran',
        lines: [
          { trigger: 'Défense', text: `*Un elfe musclé, l'arc dans le dos.* Mes voyages ? *Il rougit — chose rare pour un elfe.* C'est... personnel. Ça n'a rien à voir avec... *Il baisse la voix.* J'ai une amie. Humaine. Dans un village au sud. Le Conseil ne l'approuverait pas. C'est tout.`, tone: 'embarrassé' },
          { trigger: 'Convaincu', text: `Si ça peut prouver mon innocence, interrogez Maia, au village de Chemin-Creux. Elle confirmera mes visites. *Pause.* Et je vous en prie... ne le dites pas au Conseil. Ma vie serait... compliquée.`, tone: 'suppliant' }
        ]
      }
    ],
    objectives: [
      { description: 'Enquêter sur les trois suspects', type: 'investigate', optional: false },
      { description: 'Recueillir des preuves contre l\'espion', type: 'investigate', optional: false },
      { description: 'Identifier Syrana comme le traître', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Preuves rassemblées', nextScene: 'ch7_s3_confrontation', label: '→ Confrontation avec l\'espion' }
    ],
    skillChecks: [
      { skill: 'Investigation', dc: 15, success: 'Dans les quartiers de Syrana : un cristal de communication caché dans un double fond de coffre.', failure: 'Ses quartiers semblent normaux — bien rangés, rien de suspect en surface.' },
      { skill: 'Persuasion', dc: 13, success: 'Un garde confirme que Syrana sort secrètement la nuit — toujours vers le même endroit dans la forêt.', failure: 'Le garde est loyal à Syrana et refuse de parler.' },
      { skill: 'Perspicacité', dc: 12, success: 'Elaran est embarrassé, pas coupable. Son secret est personnel, pas criminel.', failure: 'Elaran semble suspect — ses voyages restent inexpliqués.' }
    ],
    estimatedMinutes: 20, mood: 'enquête-tension',
    music: 'Mystère elfique — cordes tendues, murmures', location: 'Sylve d\'Émeraude — Sylvandell, divers quartiers'
  },
  {
    id: 'ch7_s3_confrontation', chapterId: 'ch7', sceneNumber: 3,
    title: 'La Chute de Syrana', type: 'combat',
    readAloud: `L'accusation est faite devant le Conseil. Syrana écoute les preuves avec un calme glacial — puis son visage change. Le masque tombe. Ses yeux noisette deviennent noirs comme l'encre, et une aura d'ombre l'enveloppe.

"Idiots. Le Maître m'a promis l'immortalité. Ce que vous offrez — la servitude dans une forêt mourante — ne vaut rien en comparaison."

Elle brise son cristal de communication et un cri strident résonne dans toute la cité. À l'extérieur, des explosions : des pièges qu'elle avait placés dans les défenses de Sylvandell s'activent. La forêt tremble. Et Syrana se transforme — la magie d'ombre la recouvre d'une armure noire, des lames d'ombre jaillissent de ses mains.

"Si je tombe, je tombe en brûlant votre monde avec moi."`,
    gmNotes: `COMBAT : Syrana Corrompue (stats de Warlock/Assassin, CR 6 — Armure d'Ombre CA 18, Lames d'Ombre 2d8+4 nécrotique, une fois par combat "Explosion d'Ombre" 20 pieds rayon, DC 15 Dex, 4d6 nécrotique). Elle est accompagnée de 2 Ombres (CR 1/2) invoquées par le cristal brisé. Combat dans la salle du Conseil — espace restreint, possibilité d'utiliser le mobilier elfique comme couvert. Si Syrana est réduite à 0 PV, elle se désintègre dans un flash noir qui détruit la moitié de la salle. Thalion est blessé mais survit. Le combat est intense mais gérable — Syrana sacrifie sa défense pour l'attaque.`,
    dialogues: [
      {
        npcId: 'npc_syrana', npcName: 'Syrana (Corrompue)',
        lines: [
          { trigger: 'Rage', text: `*Ses mains crépitent d'énergie noire.* Vous pensez que votre petite Alliance peut arrêter ce qui vient ? Le Miroir est PRESQUE ouvert ! Trois Sceaux brisés, deux fissurés ! Il ne reste que deux verrous — et le Maître a les CLÉS ! *Elle attaque sauvagement.*`, tone: 'hystérique' },
          { trigger: 'Vaincue', text: `*Se désintégrant.* Vous... ne pouvez pas... le Miroir... s'ouvre... et LUI... reviendra... le Septième... Héros... le Premier... Traître... *Explosion d'ombre.*`, tone: 'derniers-mots' }
        ]
      }
    ],
    objectives: [
      { description: 'Vaincre Syrana Corrompue', type: 'combat', optional: false },
      { description: 'Protéger le Conseil elfique pendant le combat', type: 'combat', optional: false }
    ],
    transitions: [
      { condition: 'Syrana vaincue', nextScene: 'ch7_s4_alliance', label: '→ Alliance elfique' }
    ],
    encounters: ['Syrana Corrompue (CR 6)', '2x Ombre (CR 1/2)'],
    loot: ['Cristal de Communication brisé (preuve)', 'Dague Elfique Enchantée (arme +1, trouvée dans les quartiers de Syrana)'],
    estimatedMinutes: 20, mood: 'combat-trahison',
    music: 'Trahison — cordes violentes, dissonance', location: 'Sylve d\'Émeraude — Salle du Conseil'
  },
  {
    id: 'ch7_s4_alliance', chapterId: 'ch7', sceneNumber: 4,
    title: 'Les Archers de la Sylve', type: 'dialogue',
    readAloud: `Le Conseil est secoué mais intact. Thalion, une entaille sur la joue, se lève des décombres et regarde la marque de brûlure noire là où Syrana s'est désintégrée.

"Elle était parmi nous depuis vingt ans. Vingt ans de trahison sous nos yeux." Son regard se durcit. "Nous avons été aveugles. Et notre aveuglement a mis le monde en danger."

Il se tourne vers vous. Sa voix porte la gravité d'un serment millénaire : "Les archers de la Sylve d'Émeraude marcheront avec votre Alliance. Deux cents arcs. Et les connaissances de nos gardiens des Sceaux. Le temps de l'isolement est terminé."

Lysandra a les larmes aux yeux.`,
    gmNotes: `Scène de résolution diplomatique. Le Conseil est convaincu — 200 archers elfiques rejoignent l'Alliance. Plus important : les gardiens elfiques partagent leur savoir sur la réparation des Sceaux. Avec le Marteau de Thogrund (nain) et les connaissances elfiques, les joueurs ont maintenant les outils pour réparer les Sceaux fissurés et peut-être restaurer celui du Lac.

Thalion mentionne le Sceau de la Sylve Profonde — caché au cœur de la Sylve d'Émeraude — qui semble intact mais "chanté une note fausse" dans les dernières semaines. Lysandra propose de le vérifier avant de partir. C'est le lien vers Ch8.

Moment émotionnel : Lysandra est acceptée comme héroïne par son peuple — chose qu'elle n'aurait jamais cru possible étant donné qu'elle avait bravé le Conseil.`,
    dialogues: [
      {
        npcId: 'npc_thalion', npcName: 'Haut Seigneur Thalion',
        lines: [
          { trigger: 'Alliance', text: `*Il porte une main sur son cœur — geste elfique de sincérité absolue.* Je vous demande pardon. Nous aurions dû écouter plus tôt. La fierté elfique nous a aveuglés. Aujourd'hui, je la mets de côté. Deux cents archers. Nos meilleurs. Et moi-même si nécessaire.`, tone: 'humble' },
          { trigger: 'Les Sceaux', text: `Nos gardiens ont conservé les rituels de réparation. Avec le Marteau nain et nos incantations, nous pouvons restaurer les Sceaux fissurés. Le Sceau brisé d'Ashka sera plus difficile — mais pas impossible. *Il hésite.* Cependant, j'ai une inquiétude. Notre propre Sceau, celui de la Sylve Profonde, me semble... altéré.`, tone: 'préoccupé' }
        ]
      },
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Émotion', text: `*Les larmes coulent librement — pour la première fois, vous la voyez pleurer.* Je suis partie contre leur volonté. J'ai bravé le Conseil. Et maintenant... *Elle rit.* Thalion m'appelle "héroïne". Mon père aurait été fier. *Elle essuie ses yeux.* Mon père... qui est mort quand les ombres ont pris notre village, il y a 80 ans. C'est pour ça que je me bats.`, tone: 'vulnérable-heureuse' }
        ]
      }
    ],
    objectives: [
      { description: 'Obtenir l\'alliance formelle des elfes', type: 'talk', optional: false },
      { description: 'Recevoir le savoir de réparation des Sceaux', type: 'special', optional: false },
      { description: 'Accepter la mission de vérifier le Sceau de la Sylve Profonde', type: 'talk', optional: false }
    ],
    transitions: [
      { condition: 'Alliance scellée — FIN DU CHAPITRE 7', nextScene: 'ch8_s1_profondeurs', label: '→ Ch.8 : Le Cœur de la Sylve' }
    ],
    loot: ['200 archers elfiques (alliés)', 'Rituels de Réparation des Sceaux (objet de quête)', 'Arc de la Sylve (arme +1, portée accrue)'],
    estimatedMinutes: 12, mood: 'diplomatie-émotion',
    music: 'Alliance — chœurs elfiques, cordes majestueuses', location: 'Sylve d\'Émeraude — Salle du Conseil restaurée'
  }
];
// ── Stat Blocks ──────────────────────────────────────────────────────
const CH7_STAT_BLOCKS: Record<string, import('./types').StatBlock> = {
  syrana_corrompue: {
    name: 'Syrana — Forme Corrompue', cr: '6', ac: 16, hp: 110,
    speed: '35 ft.',
    abilities: { str: 12, dex: 18, con: 14, int: 16, wis: 13, cha: 17 },
    attacks: [
      { name: 'Lame d\'ombre (×2)', bonus: '+7', damage: '1d8+4 tranchant + 2d6 nécrotique', notes: '' },
      { name: 'Flèche corruptrice', bonus: '+7', damage: '1d8+4 perforant + 1d8 nécrotique', notes: 'Portée 120 ft. La cible doit réussir JDS Sagesse DC 14 ou être effrayée 1 round.' },
      { name: 'Nuage de ténèbres (recharge 5-6)', bonus: '', damage: '4d6 nécrotique', notes: 'Sphère 20 pieds centrée sur Syrana. JDS Constitution DC 15. Zone de ténèbres magiques 1 round.' }
    ],
    specialAbilities: [
      'Forme ombragée : peut se téléporter dans une ombre à 30 pieds en action bonus.',
      'Vision dans le noir 120 pieds.',
      'Résistance nécrotique.',
      'Aura de corruption : les plantes à 10 pieds se flétrissent. Les sorts de soins dans cette zone ne guérissent que la moitié.'
    ],
    weakness: 'Lumière du soleil / sorts radiants — désavantage à tous ses jets dans une lumière vive. Le sort Lumière du Jour annule sa téléportation d\'ombre.'
  },
  araignee_phase: {
    name: 'Araignée de Phase', cr: '3', ac: 13, hp: 32,
    speed: '30 ft., escalade 30 ft.',
    abilities: { str: 15, dex: 15, con: 12, int: 6, wis: 10, cha: 6 },
    attacks: [
      { name: 'Morsure', bonus: '+4', damage: '1d10+2 perforant + 2d8 poison', notes: 'JDS Con DC 11 ou empoisonné et paralysé 1 minute (relance chaque tour).' }
    ],
    specialAbilities: [
      'Déplacement éthéré : peut passer dans le plan éthéré en action bonus (esquive toutes les attaques pour 1 round).',
      'Toile éthérée : les toiles sont partiellement éthérées, Perception DC 15 pour les voir.',
      'Pattes de soie : escalade les surfaces sans jet de compétence.'
    ],
    weakness: 'Sort Voir l\'invisible ou Détection de la magie révèle les toiles et empêche le déplacement éthéré pendant 1 minute.'
  }
};

// ── Room Descriptions ────────────────────────────────────────────────
const CH7_ROOMS: import('./types').RoomDescription[] = [
  {
    id: 'tribunal_elfique', name: 'Le Tribunal d\'Étoileargent',
    readAloud: 'Une salle ouverte sur la canopée. Les murs sont des troncs vivants entrelacés, le plafond est la voûte des étoiles elle-même. Un cercle de sept trônes de bois blanc entourent un bassin d\'eau argentée qui reflète non pas le ciel, mais les souvenirs.',
    gmNotes: 'Lieu du conseil elfique. Les 7 sièges (1 par ancien). Syrana occupe le 4ème. Le bassin de mémoire peut révéler sa trahison si Arcanes DC 15 ou si les PJ versent l\'Eau de Vérité (obtenue en quête secondaire). 3 archers elfiques gardent chaque entrée.',
    exits: [
      { direction: 'Nord', targetRoomId: 'jardin_souvenirs', description: 'Arche de branches vers le Jardin des Souvenirs' },
      { direction: 'Est', targetRoomId: 'quartiers_anciens', description: 'Passerelle dans les arbres' },
      { direction: 'Sud', targetRoomId: 'place_centrale_sylvandell', description: 'Escalier en spirale descendant' }
    ],
    dimensions: '20m diamètre, à ciel ouvert', lighting: 'magique'
  },
  {
    id: 'jardin_souvenirs', name: 'Le Jardin des Souvenirs',
    readAloud: 'Un jardin secret baigné de lumière lunaire même en plein jour. Chaque plante ici porte un souvenir — toucher une fleur fait revivre un instant du passé. Au centre, un arbre mort aux branches de cristal noir — la Veinemorte, signe de la corruption de Syrana.',
    gmNotes: 'La Veinemorte est la preuve de la trahison de Syrana. Nature DC 13 pour identifier la corruption nécrotique. Si les PJ la montrent au conseil, Syrana est démasquée. Si un PJ touche une fleur : JDS Sagesse DC 12 ou flashback de 1 minute (choisir un souvenir pertinent à l\'histoire du PJ).',
    exits: [{ direction: 'Sud', targetRoomId: 'tribunal_elfique', description: 'Arche retour au tribunal' }],
    dimensions: '15m × 15m', lighting: 'magique',
    interactables: [
      { name: 'Fleur de mémoire', description: 'Toucher une fleur déclenche un flashback', skill: 'Sagesse', dc: 12, result: 'Le PJ revit un moment clé de son passé (le MJ choisit un lien avec la campagne)' },
      { name: 'Veinemorte', description: 'Arbre mort aux branches de cristal noir', skill: 'Nature', dc: 13, result: 'Identifie la corruption nécrotique — preuve contre Syrana' }
    ]
  }
];

// ── Side Quests ──────────────────────────────────────────────────────
const CH7_SIDE_QUESTS: import('./types').SideQuest[] = [
  {
    id: 'sq_arbre_mere',
    title: 'L\'Arbre-Mère Malade',
    description: 'L\'Arbre-Mère de Sylvandell — un chêne millénaire — est en train de mourir. La gardienne Lysara pense que la corruption de Syrana en est la cause, mais elle ne peut accuser sans preuve.',
    giver: 'Gardienne Lysara',
    hookText: '"L\'Arbre-Mère pleure de la sève noire. Quelque chose empoisonne ses racines depuis des mois. Aidez-moi à comprendre avant qu\'il ne soit trop tard."',
    reward: 'Eau de Vérité (révèle les illusions et mensonges, 3 doses) + Bénédiction de l\'Arbre-Mère (avantage JDS Sagesse 24h)',
    objectives: [
      'Examiner les racines de l\'Arbre-Mère (Nature DC 12)',
      'Suivre la corruption jusqu\'à sa source — une fiole brisée enterrée (Investigation DC 14)',
      'Identifier le poison comme étant d\'origine nécrotique (Arcanes DC 13)',
      'Purifier les racines avec un sort de soins ou Nature DC 15',
      'Relier la fiole à Syrana (elle correspond aux fioles de son laboratoire secret)'
    ],
    consequenceIfIgnored: 'L\'Arbre-Mère meurt dans 2 chapitres. Les elfes perdent leur connexion spirituelle. -2 diplomatie elfique future.',
    estimatedMinutes: 50, difficulty: 'moyen'
  },
  {
    id: 'sq_menestrel_perdu',
    title: 'Le Ménestrel Perdu dans les Bois',
    description: 'Un ménestrel humain, Théodore, s\'est aventuré dans la forêt profonde pour composer un chant elfique et n\'est pas revenu. Les araignées de phase l\'ont capturé.',
    giver: 'Garde-frontière Elyndra',
    reward: 'Chanson de Théodore : une ballade magique jouable avec Représentation DC 12, inspire les alliés (+1d4 aux jets, 1 combat/jour)',
    objectives: [
      'Suivre la piste de Théodore (Survie DC 11)',
      'Détruire ou éviter les toiles d\'araignée de phase (Perception DC 15 pour les voir)',
      'Vaincre 2 araignées de phase',
      'Libérer Théodore et le ramener'
    ],
    consequenceIfIgnored: 'Théodore meurt. La nouvelle atteint Sol-Aureus — léger malus diplomatique.',
    estimatedMinutes: 35, difficulty: 'difficile'
  }
];

// ── Random Encounters ────────────────────────────────────────────────
const CH7_RANDOM_ENCOUNTERS: import('./types').RandomEncounter[] = [
  { d20Range: '1-4', description: 'Cerfs lumineux — une harde de cerfs aux bois luminescents traverse la route. Non hostiles. Suivre leur piste mène à une source curative (2d8+4 PV, 1 utilisation).', difficulty: 'facile', loot: ['Source curative si suivis'] },
  { d20Range: '5-8', description: 'Fées espiègles (3) — volent de petits objets. Persuasion DC 13 pour les récupérer et obtenir un indice sur Syrana.', difficulty: 'facile', creatures: ['Lutin', 'Lutin', 'Lutin'], loot: ['Indice optionnel sur la trahison de Syrana'] },
  { d20Range: '9-12', description: 'Sentinelle d\'arbre éveillé (1) — CR 2. Bloque le passage. Répond à un mot de passe en elfique ancien (Histoire DC 14 pour le connaître).', difficulty: 'moyen', creatures: ['Arbre éveillé'], loot: ['Passage vers un raccourci dans la forêt'] },
  { d20Range: '13-16', description: 'Araignée de phase (1) — CR 3. Tend une embuscade depuis le plan éthéré. Perception DC 15 pour la détecter avant.', difficulty: 'difficile', creatures: ['Araignée de phase'], loot: ['Soie de phase (200 PO, composant magique)'] },
  { d20Range: '17-20', description: 'Esprit forestier bienveillant — offre une vision de l\'avenir. Sagesse DC 12 pour interpréter : révèle un danger futur ou un allié potentiel.', difficulty: 'facile', loot: ['Vision prophétique (avantage à un jet dans les 24h)'] }
];

export const CHAPTER_7: NarrativeChapter = {
  id: 'ch7', number: 7, title: 'La Sylve d\'Émeraude',
  subtitle: 'Démasquer l\'espion et forger l\'alliance elfique',
  summary: 'Enquête dans la cité elfique pour démasquer Syrana l\'espionne du culte, combat contre sa forme corrompue, et alliance des archers elfiques.',
  suggestedLevel: 8, region: 'Sylve d\'Émeraude — Sylvandell',
  themes: ['Enquête', 'Diplomatie', 'Trahison', 'Alliance'],
  scenes: CH7_SCENES, previousChapter: 'ch6', nextChapter: 'ch8',
  sideQuests: CH7_SIDE_QUESTS,
  randomEncounters: CH7_RANDOM_ENCOUNTERS,
  statBlocks: CH7_STAT_BLOCKS,
  roomDescriptions: CH7_ROOMS
};
