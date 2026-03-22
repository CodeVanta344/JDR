/**
 * LORE — FACTIONS D'AETHELGARD
 *
 * Organisations, ordres, guildes et cultes.
 * Objectifs, leaders, relations, et comment elles interagissent avec les PJ.
 */

export interface Faction {
  id: string;
  name: string;
  type: 'kingdom' | 'guild' | 'cult' | 'order' | 'tribe' | 'council';
  /** Slogan ou devise */
  motto?: string;
  leader: string;
  /** Description courte (2-3 phrases) */
  shortDescription: string;
  /** Description complète pour le MJ */
  fullDescription: string;
  /** Objectif principal */
  goal: string;
  /** Objectif secret (MJ uniquement) */
  secretGoal?: string;
  /** Forces militaires / ressources */
  resources: string;
  /** Attitude envers les PJ au début */
  initialDisposition: 'allié' | 'neutre' | 'méfiant' | 'hostile';
  /** Comment les PJ peuvent améliorer la relation */
  howToAlly?: string;
  /** Comment les PJ peuvent empirer la relation */
  howToAntagonize?: string;
  /** Relations avec les autres factions */
  relations: { factionId: string; nature: string }[];
  /** Chapitres où cette faction est centrale */
  relevantChapters: string[];
  /** PNJ membres notables */
  notableMembers: string[];
}

export const FACTIONS: Faction[] = [
  // ============================
  // LA COURONNE DE SOL-AUREUS
  // ============================
  {
    id: 'fac_crown', name: 'La Couronne de Sol-Aureus', type: 'kingdom',
    motto: 'Lumière et Justice',
    leader: 'Reine Elara Solaris III',
    shortDescription: 'Le royaume humain dominant d\'Aethelgard. Puissant mais isolé diplomatiquement.',
    goal: 'Protéger Sol-Aureus et restaurer les alliances d\'antan.',
    resources: '4 000 soldats, Garde Royale d\'élite (200), Académie Arcane (30 mages de guerre), trésor royal conséquent.',
    initialDisposition: 'allié',
    relevantChapters: ['ch1', 'ch2', 'ch3', 'ch9', 'ch11'],
    notableMembers: ['Reine Elara', 'Général Marcus', 'Théodore', 'Grand Prêtre Alduin'],
    howToAlly: 'Accomplir les missions royales, sauver des Sceaux, rapporter des renseignements sur le Culte.',
    howToAntagonize: 'Trahir la confiance royale, voler au trésor, insulter la Reine en public.',
    relations: [
      { factionId: 'fac_hammerdeep', nature: 'Tendue — les nains n\'ont pas renouvelé le traité commercial depuis 20 ans.' },
      { factionId: 'fac_sylve', nature: 'Froide — les elfes ont coupé les ponts il y a 30 ans.' },
      { factionId: 'fac_cult', nature: 'Hostile — la Couronne traque le Culte mais ne mesure pas encore l\'ampleur de la menace.' },
      { factionId: 'fac_guild', nature: 'Symbiotique — la Guilde finance la Couronne en échange de protections commerciales.' },
      { factionId: 'fac_sentinels', nature: 'Patronage — la Couronne finance secrètement l\'Ordre mais nie tout lien officiel.' }
    ],
    fullDescription: `La Couronne de Sol-Aureus est le plus grand pouvoir politique d'Aethelgard. Fondée il y a 800 ans par le roi Aurelius Ier (qui a trouvé le Cœur du Soleil), la dynastie Solaris règne depuis 12 générations.

La Reine Elara est la dirigeante actuelle — une femme pragmatique de 42 ans, veuve depuis 5 ans (son mari, le Roi Consort Aldric, est mort d'une maladie mystérieuse — NOTE MJ : c'était un empoisonnement par le Culte). Elle gouverne seule avec le soutien du Conseil des Nobles (12 seigneurs).

PROBLÈMES INTERNES :
• Le Duc Verlan (membre du Conseil) complote pour déstabiliser Elara. Il n'est pas du Culte — il est juste ambitieux et pense que la Reine est trop faible.
• L'armée est éparpillée : 50% aux frontières, 30% en patrouilles routières, 20% en garnison à Sol-Aureus. Pas assez d'hommes pour lancer une offensive.
• Le trésor s'épuise — les routes commerciales vers les nains sont perturbées et les taxes elfiques ne rentrent plus.

RELATION AVEC LES JOUEURS :
La Reine est le principal PATRON des joueurs. Elle leur donne des missions, des ressources et une légitimité. Si les joueurs la trahissent, ils perdent cet appui et doivent agir en indépendants.`
  },

  // ============================
  // LE THANE DE HAMMERDEEP
  // ============================
  {
    id: 'fac_hammerdeep', name: 'Le Conseil des Clans de Hammerdeep', type: 'council',
    motto: 'La Pierre Endure',
    leader: 'Thane Durinn Marteau-Profond',
    shortDescription: 'Les nains sont isolationnistes et méfiants. Leurs forges sont inégalées.',
    goal: 'Protéger Hammerdeep et garder le mithril hors des mains étrangères.',
    secretGoal: 'Le Thane sait que les Anciennes Mines cachent un danger et craint que les autres peuples ne l\'exploitent.',
    resources: '8 000 guerriers (tous les nains adultes sont entraînés), mithril en abondance, golems de pierre (20), fortifications imprenables.',
    initialDisposition: 'méfiant',
    relevantChapters: ['ch4', 'ch5', 'ch6', 'ch9', 'ch11'],
    notableMembers: ['Thane Durinn', 'Borin fils du Thane', 'Maître Forgeron Korgan', 'Capitaine Brunhild', 'Grinbar le Tavernier'],
    howToAlly: 'Accomplir le Défi du Marteau (Ch4), protéger la Forge de Thogrund (Ch5), montrer du respect pour les traditions naines.',
    howToAntagonize: 'Voler du mithril, manquer de respect au Thane, entrer dans les Anciennes Mines sans permission.',
    relations: [
      { factionId: 'fac_crown', nature: 'Tendue — les nains reprochent aux humains d\'avoir "oublié" la dette de la Guerre de l\'Ombre.' },
      { factionId: 'fac_sylve', nature: 'Méfiante — les nains et les elfes ne se comprennent pas culturellement.' },
      { factionId: 'fac_cult', nature: 'Ignorance — les nains ne savent pas que le Culte existe (jusqu\'au Ch5).' },
      { factionId: 'fac_guild', nature: 'Commerciale — la Guilde achète du mithril, les nains vendent, mais les tarifs sont contestés.' }
    ],
    fullDescription: `Hammerdeep est gouvernée par le Conseil des 7 Clans, présidé par le Thane. Le système est semi-démocratique : le Thane est élu par les chefs de clan et gouverne à vie (ou jusqu'à abdication).

Le Thane Durinn a 180 ans (vieux pour un nain). Vétéran de la Guerre de l'Ombre, il porte les cicatrices — physiques et mentales — de cette époque. Il est sage mais fatigué. Il sait que le monde va mal mais espère que "ce n'est pas encore son problème".

SON FILS BORIN est l'opposé : jeune (60 ans), fougueux, il veut que les nains reprennent leur place dans le monde. Il soutient secrètement les joueurs même quand son père hésite.

LE DÉFI DU MARTEAU (Ch4) : Pour gagner le respect des nains, les joueurs doivent accomplir un défi rituel — une série de 3 épreuves (force, endurance, savoir-forge) devant le Conseil des Clans. C'est un événement social majeur avec des enjeux diplomatiques.

CONFLIT INTERNE : Le clan Hache-de-Fer (milieu belliqueux) veut ouvrir les Anciennes Mines pour exploiter le mithril profond. Le clan Gardiens-de-Mine (milieu conservateur) refuse — ils gardent le secret de ce qui a été scellé en bas. Ce conflit peut éclater pendant le séjour des joueurs.`
  },

  // ============================
  // LE CONSEIL DE LA SYLVE
  // ============================
  {
    id: 'fac_sylve', name: 'Le Conseil de la Sylve d\'Émeraude', type: 'council',
    motto: 'Les Racines se Souviennent',
    leader: 'Haut Seigneur Thalion',
    shortDescription: 'Les elfes sont divisés entre tradition et renouveau. Leur magie est ancienne et puissante.',
    goal: 'Préserver la Sylve d\'Émeraude et l\'héritage elfique.',
    secretGoal: 'Thalion (empoisonné par Syrana) pousse vers un isolationnisme total qui servira les plans du Culte.',
    resources: '3 000 archers d\'élite, magie naturelle puissante, défenses magiques de la Sylve, connexion à l\'Arbre-Monde.',
    initialDisposition: 'méfiant',
    relevantChapters: ['ch7', 'ch8', 'ch9', 'ch11'],
    notableMembers: ['Haut Seigneur Thalion', 'Dame Aethel', 'Lysandra', 'Archidruide Faelorn', 'Syrana (espionne)'],
    howToAlly: 'Démasquer Syrana (Ch7), guérir Thalion du poison, accomplir le rituel à l\'Arbre-Monde (Ch8).',
    howToAntagonize: 'Manquer de respect aux arbres, utiliser le feu dans la Sylve, traiter les elfes de "peuples lents".',
    relations: [
      { factionId: 'fac_crown', nature: 'Froide — les elfes considèrent les humains comme éphémères et inconstants.' },
      { factionId: 'fac_hammerdeep', nature: 'Distante — les elfes et les nains n\'ont rien en commun culturellement.' },
      { factionId: 'fac_cult', nature: 'Infiltrée — Syrana manipule le Conseil de l\'intérieur.' }
    ],
    fullDescription: `Le Conseil de la Sylve est composé de 9 Anciens, chacun représentant un aspect de la vie elfique (guerre, sagesse, nature, art, commerce, loi, mémoire, rêve, mort). Le Haut Seigneur préside.

Thalion a 600 ans. Il a vécu la Guerre de l'Ombre comme jeune guerrier et en garde un traumatisme profond. Son hostilité envers les "peuples courts" a été AMPLIFIÉE par l'empoisonnement subtil de Syrana — une toxine d'ombre qui exacerbe les émotions négatives (peur, méfiance, colère).

DAME AETHEL est la voix de la raison — 400 ans, ancienne diplomate, elle a vécu parmi les humains pendant 50 ans. Elle soutient Lysandra et les joueurs mais doit agir discrètement pour ne pas provoquer une crise politique.

L'ARC ELFIQUE (Ch7-8) est essentiellement politique : les joueurs doivent naviguer entre les factions, démasquer Syrana, guérir Thalion, et convaincre le Conseil de rejoindre l'Alliance. C'est du RP pur — peu de combat, beaucoup de diplomatie.`
  },

  // ============================
  // LE CULTE DU MIROIR BRISÉ
  // ============================
  {
    id: 'fac_cult', name: 'Le Culte du Miroir Brisé', type: 'cult',
    motto: 'Dans le Reflet, la Vérité',
    leader: 'Malachi, descendant de Malachor',
    shortDescription: 'Culte secret cherchant à briser les Sceaux et libérer Ombréus.',
    goal: 'Briser les Sept Sceaux et activer le Miroir de l\'Ombre.',
    secretGoal: 'Malachi veut négocier l\'immortalité avec Ombréus. Les cultistes de base croient en une "renaissance" du monde.',
    resources: '~500 fanatiques, dizaines de morts-vivants, 4 lieutenants, créatures d\'ombre invoquées, réseau d\'espions.',
    initialDisposition: 'hostile',
    relevantChapters: ['ch1', 'ch3', 'ch6', 'ch7', 'ch10', 'ch11'],
    notableMembers: ['Malachi', 'Voss (Ch2)', 'Syrana (Ch7)', 'Gorvan (Ch6)', 'Alorn (Ch10)'],
    howToAlly: 'Impossible — le Culte est fondamentalement hostile. Un joueur pourrait être tenté par un pacte, mais c\'est un piège.',
    howToAntagonize: 'Exister. Les joueurs sont les ennemis naturels du Culte.',
    relations: [
      { factionId: 'fac_crown', nature: 'Guerre secrète — le Culte infiltre Sol-Aureus par les Bas-Fonds.' },
      { factionId: 'fac_sylve', nature: 'Infiltration — Syrana manipule le Conseil elfique.' },
      { factionId: 'fac_hammerdeep', nature: 'Neutre — le Culte n\'a pas encore pénétré Hammerdeep (les nains sont trop méfiants).' }
    ],
    fullDescription: `Le Culte du Miroir Brisé a été fondé par Malachi il y a 5 ans. Il recrute via deux canaux :
1. LES BAS-FONDS — promesse d'immortalité aux désespérés (criminels, malades, orphelins).
2. L'ACADÉMIQUE — Malachi publie anonymement des traités sur "la nature bienveillante de l'Ombre" qui séduisent les érudits naïfs.

STRUCTURE :
• MALACHI (le Maître) — NE se montre JAMAIS en personne avant Ch11. Les cultistes de bas rang ne connaissent même pas son visage. Il communique par des lettres scellées au symbole du Miroir.
• LES QUATRE OMBRES (lieutenants) — Voss, Syrana, Gorvan, Alorn. Chacun opère indépendamment dans sa région.
• LES RÉFLEXIONS (sous-officiers) — ~30 cultistes de rang moyen qui dirigent les cellules locales.
• LES ÉCLATS (recrues) — ~500 fanatiques. La plupart ne savent pas qu'ils servent Ombréus — on leur a dit que le Miroir était un "portail de renaissance".

SYMBOLE : Cercle brisé avec un œil central. Tatoué au poignet gauche (recrues), dans la paume (sous-officiers), sur la poitrine (lieutenants). Malachi a le symbole sur le visage.

RITUEL DE CORRUPTION : Pour briser un Sceau, le Culte plante un Cristal Noir (fragment du Plan Ombre) dans le support du Sceau et récite une incantation de 7 jours. L'incantation inverse la "chanson de scellement" des Sept Héros.`
  },

  // ============================
  // LA GUILDE DES MARCHANDS
  // ============================
  {
    id: 'fac_guild', name: 'La Guilde des Marchands d\'Aethelgard', type: 'guild',
    motto: 'L\'Or Ouvre Toutes les Portes',
    leader: 'Maître Guilde Valeska Tornheim',
    shortDescription: 'Réseau commercial puissant. Neutre politiquement, motivé par le profit.',
    goal: 'Maintenir les routes commerciales ouvertes et les profits élevés.',
    secretGoal: 'Valeska sait que le Culte perturbe le commerce mais hésite entre le combattre (coûteux) et l\'ignorer (risqué).',
    resources: 'Richesse immense, réseau d\'informateurs, caravanes armées (500 gardes), relais commerciaux dans chaque ville.',
    initialDisposition: 'neutre',
    relevantChapters: ['ch3', 'ch4', 'ch9'],
    notableMembers: ['Valeska Tornheim', 'Pip l\'Alchimiste (membre)', 'Réseau d\'informateurs'],
    howToAlly: 'Protéger des caravanes, apporter des informations commerciales, payer les dettes.',
    howToAntagonize: 'Voler aux marchands, perturber le commerce, refuser de payer.',
    relations: [
      { factionId: 'fac_crown', nature: 'Symbiotique mais tendue — la Guilde veut moins de taxes.' },
      { factionId: 'fac_hammerdeep', nature: 'Commerciale — principal acheteur de mithril.' },
      { factionId: 'fac_cult', nature: 'Ignorance officielle, inquiétude privée.' }
    ],
    fullDescription: `La Guilde contrôle 70% du commerce d'Aethelgard. Caravanes, navires marchands, relais — tout passe par la Guilde. Valeska Tornheim (55 ans, humaine, ancienne aventurière) a pris le contrôle il y a 10 ans en rachetant les parts de l'ancien Maître.

UTILITÉ POUR LES JOUEURS : La Guilde peut fournir des informations (son réseau d'informateurs est meilleur que celui de la Couronne), du transport (accès à des caravanes sécurisées), et du financement (prêts à intérêt). Mais tout a un prix.

QUÊTE SECONDAIRE POSSIBLE : La Guilde demande aux joueurs de protéger une caravane vers Hammerdeep (Ch4) — l'occasion de faire du RP de voyage et de rencontrer des marchands hauts en couleur.`
  },

  // ============================
  // L'ORDRE DES SENTINELLES
  // ============================
  {
    id: 'fac_sentinels', name: 'L\'Ordre des Sentinelles des Sceaux', type: 'order',
    motto: 'Veille Éternelle',
    leader: 'Commandeur (poste vacant depuis 40 ans)',
    shortDescription: 'Ordre ancien voué à la protection des Sceaux. Presque éteint.',
    goal: 'Protéger les Sept Sceaux contre toute tentative de corruption.',
    resources: '5 membres actifs connus, archives secrètes à Sol-Aureus, armes enchantées anti-ombre.',
    initialDisposition: 'allié',
    relevantChapters: ['ch3', 'ch9', 'ch11'],
    notableMembers: ['Théodore (archiviste, dernier Sentinelle actif à Sol-Aureus)', 'Beren l\'Ermite (retiré dans la Forêt)'],
    howToAlly: 'Accepter le Titre de Sentinelle (Ch2), accomplir les missions de protection des Sceaux.',
    relations: [
      { factionId: 'fac_crown', nature: 'Patronage secret — la Reine finance l\'Ordre mais ne veut pas que cela se sache.' },
      { factionId: 'fac_cult', nature: 'Ennemis jurés — l\'Ordre existe POUR contrer ce que le Culte fait.' }
    ],
    fullDescription: `L'Ordre des Sentinelles fut fondé par les Sept Héros après le rituel de scellement. Sa mission : veiller sur les Sceaux pour l'éternité. Pendant 80 ans, l'Ordre fut puissant — 200 membres, des postes de garde à chaque Sceau.

Puis le monde oublia. La Guerre de l'Ombre devint une histoire, puis une légende. Le recrutement tarit. Les postes de garde furent abandonnés. Le dernier Commandeur mourut il y a 40 ans sans successeur.

Aujourd'hui, l'Ordre se résume à une poignée de vieux érudits et d'ermites qui maintiennent la flamme. Théodore, le bibliothécaire de l'Académie Arcane, est le dernier Sentinelle actif de Sol-Aureus. C'est lui qui a donné l'alerte — sans être écouté.

LES JOUEURS SONT LES NOUVEAUX SENTINELLES. Le Titre que la Reine leur décerne (Ch2) est réel — et avec lui vient l'accès aux archives secrètes de l'Ordre (informations sur les Sceaux, cartes des sanctuaires, procédures de renforcement).`
  }
];
