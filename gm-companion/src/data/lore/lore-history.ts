/**
 * LORE — HISTOIRE D'AETHELGARD
 *
 * Timeline complète du monde, de la Création au présent.
 * Le MJ peut référencer ces entrées pour enrichir ses descriptions,
 * répondre aux questions des joueurs, ou nourrir les scènes de roleplay.
 */

// ============================================================================
// TYPES LORE
// ============================================================================

export interface LoreEntry {
  id: string;
  title: string;
  /** Catégorie pour filtrage dans l'UI */
  category: 'era' | 'event' | 'legend' | 'prophecy' | 'secret';
  /** Texte complet — le MJ peut le lire ou le paraphraser */
  content: string;
  /** Chapitres où cette entrée est pertinente */
  relevantChapters?: string[];
  /** Niveau de secret : 'public' = les PJ peuvent connaître, 'hidden' = réservé MJ */
  secrecy: 'public' | 'hidden';
}

// ============================================================================
// LES ÉONS — ÈRES DU MONDE
// ============================================================================

export const HISTORY_ENTRIES: LoreEntry[] = [
  // --- ÈRE DE LA CRÉATION ---
  {
    id: 'era_creation', title: 'L\'Éon de la Création', category: 'era',
    secrecy: 'public', relevantChapters: ['ch1', 'ch2'],
    content: `Avant le temps, il n'y avait que le Vide Primordial — une étendue infinie de néant sans forme, sans couleur, sans son. Puis vint la Première Lueur : Solarius, le dieu-soleil, ouvrit ses yeux et le monde naquit de sa lumière. Chaque rayon devint un continent, chaque ombre devint un océan.

Solarius n'était pas seul. D'autres dieux émergèrent du Vide — certains se souviennent de leur naissance, d'autres non. Moradin forgea les montagnes dans son atelier céleste, martelant la roche brute jusqu'à ce qu'elle chante. La Mère-Lune (Sélénia) versa ses larmes dans les vallées, et les rivières naquirent. Sylvanus souffla sur la roche nue et les forêts jaillirent, premières verdures du monde nouveau.

Mais le Vide ne mourut pas entièrement. Au creux du monde, dans les fissures entre les réalités, subsistait une écho du néant originel — le Plan Ombre. Et dans le Plan Ombre, une conscience s'éveilla : Ombréus, le Seigneur des Ombres, né de l'absence de lumière, incarnation du Vide refusant de mourir.

Les dieux créèrent les mortels : les humains de la lumière de Solarius (adaptables, curieux), les nains du marteau de Moradin (endurants, loyaux), les elfes du souffle de Sylvanus (gracieux, éternels), et d'autres peuples encore — halfelins de la joie de la Mère-Lune, gnomes de l'étincelle d'Erathis la tisserande de magie.

Le monde fut nommé Aethelgard — "le Jardin Noble" en langue divine.`
  },
  {
    id: 'era_golden', title: 'L\'Éon Doré (il y a ~3000 ans)', category: 'era',
    secrecy: 'public', relevantChapters: ['ch2', 'ch4'],
    content: `Pendant un millénaire, Aethelgard prospéra. Les trois peuples majeurs bâtirent des civilisations remarquables :

• LES HUMAINS fondèrent les Cités du Soleil le long de la côte méridionale. Sol-Aureus, la capitale, fut construite autour d'un fragment de lumière divine tombé du ciel — le Cœur du Soleil, une gemme qui illumine la ville d'une lueur dorée permanente. Les humains développèrent le commerce, la politique, les arts et une tradition d'érudition magique.

• LES NAINS creusèrent les Forteresses Profondes dans les montagnes du nord. Hammerdeep, la plus grande, s'enfonce sur 22 niveaux sous la montagne du Marteau. Les nains y forgent des armes légendaires et des armures enchantées. Le mithril coule dans leurs mines comme de l'eau dans un ruisseau. Leur société est gouvernée par le Thane — un titre mérité par le combat et le vote des clans.

• LES ELFES plantèrent la Sylve d'Émeraude à l'est, un réseau de cités-arbres reliées par des ponts de lumière. Au cœur de la Sylve, l'Arbre-Monde Yggvan — un chêne millénaire dont les racines plongent dans le Plan Éthéré. Les elfes communient avec les esprits de la nature et pratiquent une magie organique, vivante.

Cette ère vit aussi la fondation de l'Académie Arcane de Sol-Aureus par Erathis elle-même (selon la légende), le Pacte des Trois Hammers entre les clans nains, et la Grande Migration halfeline qui peupla les plaines centrales.

La paix régnait. Mais le Vide attendait.`
  },
  // --- LA GUERRE DE L'OMBRE ---
  {
    id: 'event_shadow_war', title: 'La Guerre de l\'Ombre (il y a ~120 ans)', category: 'event',
    secrecy: 'public', relevantChapters: ['ch1', 'ch2', 'ch3', 'ch11'],
    content: `Ombréus, le Seigneur des Ombres, avait patiemment attendu dans le Plan Ombre pendant des millénaires. Il avait observé les mortels construire, aimer, guerroyer — et il les méprisait. Non par haine, mais par indifférence cosmique. Le Vide voulait simplement revenir à l'état naturel des choses : le néant.

La Guerre de l'Ombre commença quand Ombréus déchira la barrière entre les plans. Des portails d'ombre s'ouvrirent à travers Aethelgard, vomissant des légions de créatures d'ombre :

• LES REJETONS D'OMBRE — formes humanoïdes de ténèbres solides, avec des griffes capables de trancher l'acier et des yeux rouges comme des braises. Niveau d'intelligence : celui d'un loup. Ce sont les fantassins d'Ombréus.

• LES MARCHEURS DE NUIT — créatures plus grandes, plus intelligentes, capables de se fondre dans les ombres naturelles et de posséder temporairement les vivants. Chacun vaut dix soldats.

• LES DÉVOUREURS — rares mais terrifiants. Des entités semi-divines qui peuvent absorber la lumière sur un rayon de 100 mètres. Là où passe un Dévoreur, même les souvenirs s'effacent.

La guerre dura sept ans. Les trois peuples, divisés par des siècles de politique, durent s'unir ou périr. C'est ainsi que naquit l'Alliance des Trois Peuples — un pacte forgé dans le sang et le désespoir.`
  },
  {
    id: 'event_seven_heroes', title: 'Les Sept Héros et le Rituel des Sceaux', category: 'legend',
    secrecy: 'public', relevantChapters: ['ch1', 'ch2', 'ch3', 'ch7', 'ch8', 'ch11'],
    content: `Au plus sombre de la Guerre de l'Ombre, quand tout semblait perdu, sept héros se levèrent — un de chaque peuple majeur, un de chaque tradition — et acceptèrent de sacrifier une part de leur vie pour emprisonner Ombréus.

LES SEPT HÉROS :
1. AELINDRA L'ÉTERNELLE (Elfe, Archimage) — Elle tissa le sortilège de prison dimensionnelle. Son sacrifice : elle perdit sa mémoire de mille ans.
2. THOREK MARTEAU-SACRÉ (Nain, Paladin) — Il forgea les ancres physiques des Sceaux dans le mithril. Son sacrifice : ses mains se pétrifièrent après avoir posé le dernier Sceau.
3. VALORIEN LE JUSTE (Humain, Chevalier) — Il mena l'assaut final contre le dernier portail d'ombre. Son sacrifice : il vieillit de 40 ans en une nuit.
4. MALACHOR LE SAGE (Humain, Érudit) — Il calcula la géométrie du rituel. Son sacrifice : il devint aveugle à toute lumière. (NOTE MJ : Malachor est l'ancêtre du traître. Son descendant Malachi a retourné le savoir familial.)
5. SYLPHAË LA CHANTEUSE (Demi-Elfe, Barde) — Elle chanta l'incantation de scellement pendant 7 jours sans interruption. Son sacrifice : elle perdit sa voix.
6. GRUNDAR LE STOÏQUE (Nain, Guerrier) — Il protégea le cercle rituel contre trois vagues d'assaut d'ombre, seul. Son sacrifice : ses os absorbèrent l'ombre — il souffre de douleurs chroniques.
7. LIORA LA GUÉRISSEUSE (Halfeline, Prêtresse) — Elle maintint les six autres en vie pendant les 7 jours du rituel. Son sacrifice : elle absorba leurs blessures et vieillit au point de devenir centenaire en une semaine.

LIEU DU RITUEL : Le Mont Sombrelune — un pic volcanique éteint au centre exact d'Aethelgard.

LES SCEAUX : Sept verrous magiques ancrés dans des lieux de pouvoir à travers le monde. Chaque Sceau est lié à un élément et à un lieu :
1. Sceau de la Forêt (Sylve d'Émeraude) — Élément : Nature
2. Sceau de la Montagne (Hammerdeep) — Élément : Terre
3. Sceau du Lac (Lac d'Ashka) — Élément : Eau
4. Sceau du Vent (Pic des Aigles) — Élément : Air
5. Sceau du Feu (Forge de Thogrund) — Élément : Feu
6. Sceau de la Lumière (Sol-Aureus) — Élément : Lumière
7. Sceau de l'Ombre (Mont Sombrelune) — Élément : Ombre (paradoxalement, scellé par l'ombre elle-même)

Le rituel fonctionne tant que les sept sceaux tiennent. Si tous sont brisés, Ombréus est libre.`
  },
  {
    id: 'secret_malachor_lineage', title: 'La Lignée de Malachor (Secret MJ)', category: 'secret',
    secrecy: 'hidden', relevantChapters: ['ch3', 'ch6', 'ch10', 'ch11'],
    content: `INFORMATION MJ UNIQUEMENT — Ne jamais révéler directement aux joueurs.

Malachor le Sage — le 4ème des Sept Héros — a survécu au rituel mais est devenu amer. Aveugle, abandonné par les autres héros qui sont retournés à leurs peuples, il s'est isolé dans une tour au nord des Plaines Mortes. Pendant des décennies, il a étudié le Plan Ombre non plus pour le combattre, mais pour le comprendre.

Sa conclusion : les Sceaux sont une prison imparfaite. Un jour, ils céderont. Et quand ils céderont, personne ne sera prêt. Malachor a commencé à croire qu'il valait mieux CONTRÔLER l'ouverture des Sceaux — libérer Ombréus selon ses propres termes — plutôt que d'attendre la catastrophe.

Il a transmis ce savoir à sa lignée :
- MALACHOR → DARIUS (fils, mort il y a 80 ans) → SERANA (petite-fille, morte il y a 40 ans) → MALACHI (arrière-petit-fils, le grand antagoniste actuel)

MALACHI est né il y a 35 ans. Enfant prodige, il a trouvé les journaux de Malachor dans la tour familiale à l'âge de 12 ans. À 20 ans, il maîtrisait la nécromancie. À 25 ans, il a fondé le Culte du Miroir Brisé. À 30 ans, il a commencé à briser les Sceaux.

SA MOTIVATION RÉELLE : Malachi ne veut pas détruire le monde. Il veut ouvrir le Miroir de l'Ombre — un artefact au Mont Sombrelune qui permet de COMMUNIQUER avec Ombréus. Il croit pouvoir négocier avec le Seigneur des Ombres : la liberté d'Ombréus en échange de l'immortalité pour Malachi et son culte. C'est un plan insensé — Ombréus est une force cosmique, pas un partenaire de négociation — mais Malachi est convaincu que son ancêtre avait raison.

IRONIE TRAGIQUE : Malachor lui-même, s'il avait su ce que son descendant ferait, aurait été horrifié. Malachor voulait un contrôle responsable, pas une négociation avec l'apocalypse.`
  },
  // --- L'ÈRE ACTUELLE ---
  {
    id: 'era_current', title: 'L\'Ère de la Paix Fragile (les 120 dernières années)', category: 'era',
    secrecy: 'public', relevantChapters: ['ch1', 'ch3'],
    content: `Après la Guerre de l'Ombre, les trois peuples ont vécu 120 ans de paix relative. Mais "paix" est un grand mot.

TENSION POLITIQUE :
• L'Alliance des Trois Peuples s'est dissoute 30 ans après la guerre. Les nains ont estimé que les humains prenaient trop de place dans le Conseil. Les elfes se sont retirés dans la Sylve, déçus par la "mémoire courte" des humains.
• Sol-Aureus est devenue la puissance dominante, contrôlant les routes commerciales et l'Académie Arcane. La Reine Elara (couronnée il y a 15 ans) tente de reconstruire les ponts diplomatiques.
• Les nains de Hammerdeep sont de plus en plus isolationnistes. Le Thane Durinn est vieux et fatigué — il a combattu lors de la Guerre de l'Ombre quand il était jeune (il a 180 ans).
• Les elfes de la Sylve d'Émeraude sont divisés : les Traditionalistes (dirigés par le Haut Seigneur Thalion) refusent tout contact avec les "peuples courts", tandis que les Progressistes veulent renouer les liens.

SIGNES AVANT-COUREURS :
• Des tremblements magiques ont été détectés il y a 5 ans par l'Académie Arcane. Théodore a lancé l'alerte, mais il a été ignoré — "Encore le vieux Théodore et ses théories alarmistes."
• Des disparitions dans les zones rurales — des fermiers, des bûcherons, des voyageurs. Pas assez pour créer une panique, assez pour alimenter des rumeurs.
• Le Culte du Miroir Brisé recrute dans les bas-fonds des villes humaines, promettant "la vie éternelle" à ceux qui servent le Maître. La plupart des gens considèrent ça comme un culte de fous.

C'EST ICI QUE COMMENCE LA CAMPAGNE — les joueurs entrent en scène au moment où les premiers effets de l'activité de Malachi deviennent visibles.`
  },
  {
    id: 'prophecy_twilight', title: 'La Prophétie du Crépuscule', category: 'prophecy',
    secrecy: 'public', relevantChapters: ['ch1', 'ch8', 'ch11'],
    content: `Gravée sur le socle de la statue de Solarius à Sol-Aureus, cette prophétie est connue de tous les érudits mais considérée par la plupart comme une curiosité historique :

"Quand les Sceaux pleureront et que les Ombres danseront,
Quand le Miroir chantera et que le Sage se réveillera,
Sept à nouveau se lèveront — ou le monde s'effondrera.
Car la Lumière qui scella ne peut seule vaincre ;
Il faut le Cœur de tous les peuples pour que le Soleil survive au Crépuscule."

INTERPRÉTATION (que Théodore peut donner) :
• "Les Sceaux pleureront" = les Sceaux sont attaqués (c'est en cours)
• "Les Ombres danseront" = les créatures d'ombre reviennent (confirmé)
• "Le Miroir chantera" = le Miroir de l'Ombre au Mont Sombrelune sera activé
• "Le Sage se réveillera" = Malachor (ou sa lignée) agit
• "Sept à nouveau se lèveront" = de nouveaux héros doivent émerger (LES JOUEURS)
• "Le Cœur de tous les peuples" = l'Alliance doit être reformée (arc politique)

NOTE MJ : La prophétie ne dit pas que les héros GAGNERONT. Elle dit qu'ils se lèveront. Le résultat dépend des joueurs.`
  },
  {
    id: 'event_cult_mirror', title: 'Le Culte du Miroir Brisé', category: 'event',
    secrecy: 'hidden', relevantChapters: ['ch1', 'ch3', 'ch6', 'ch10', 'ch11'],
    content: `STRUCTURE DU CULTE (Information MJ) :

CHEF : Malachi, arrière-petit-fils de Malachor. Nécromancien de niveau 15+. Il ne se montre jamais en personne avant le Chapitre 11.

LIEUTENANTS CONNUS :
• VOSS LE NÉCROMANCIEN (Ch2) — Chargé de corrompre le Sceau de la Forêt. Fanatique, prêt à mourir.
• SYRANA L'INFILTRATRICE (Ch7) — Espionne elfe infiltrée dans la Sylve d'Émeraude. Manipulatrice, intelligente.
• GORVAN LE SEIGNEUR DE GUERRE (Ch6) — Lieutenant militaire. Ancien mercenaire, il commande les forces d'ombre à Ashka.
• ALORN LE TRAÎTRE (Ch10) — Espion dans les rangs de l'Alliance. Officier humain que les joueurs croient allié.

SOLDATS : Un mélange de fanatiques humains (promesse d'immortalité), de morts-vivants relevés par Malachi, et de créatures d'ombre invoquées par le Miroir.

SYMBOLE : Un cercle brisé en deux avec un œil au centre — le Miroir Brisé. Les membres le tatouent sur leur poignet gauche.

OBJECTIF : Briser les sept Sceaux pour activer le Miroir de l'Ombre et permettre à Malachi de "négocier" avec Ombréus.

PROGRESSION :
• Sceau de la Forêt : ENDOMMAGÉ mais pas brisé (grâce aux joueurs, Ch2)
• Sceau de la Montagne : INTACT (protégé par les nains, Ch4-5)
• Sceau du Lac (Ashka) : BRISÉ par Gorvan (Ch6 — les joueurs arrivent trop tard)
• Sceau du Vent : BRISÉ hors-scène (avant la campagne)
• Sceau du Feu : ENDOMMAGÉ (les joueurs le stabilisent, Ch5)
• Sceau de la Lumière : INTACT (à Sol-Aureus, protégé par la Reine)
• Sceau de l'Ombre : N'EST PAS un sceau au sens classique — c'est le Miroir lui-même`
  },
  {
    id: 'legend_mirror', title: 'Le Miroir de l\'Ombre', category: 'legend',
    secrecy: 'hidden', relevantChapters: ['ch10', 'ch11'],
    content: `INFORMATION MJ — RÉVÉLER PROGRESSIVEMENT

Le Miroir de l'Ombre est un artefact créé PENDANT le rituel de scellement, pas avant. Quand les Sept Héros ont emprisonné Ombréus, l'énergie du rituel a cristallisé un fragment de la conscience d'Ombréus dans un miroir de verre noir sur le Mont Sombrelune.

PROPRIÉTÉS :
• Le Miroir montre "l'autre côté" — le Plan Ombre. Si on le regarde, on voit le reflet inversé du monde : un Aethelgard mort, gris, sans vie.
• Le Miroir "parle" — pas avec des mots, mais avec des émotions. Il projette la mélancolie, le désespoir, la tentation. Quiconque reste trop longtemps devant commence à entendre "la chanson de l'Ombre".
• Le Miroir est un AMPLIFICATEUR. Si on brise les Sceaux, le Miroir canalise la libération d'Ombréus. Si on RENFORCE les Sceaux, le Miroir peut être transformé en prison permanente.

POUR DÉTRUIRE LE MIROIR :
Il faut un sacrifice volontaire similaire à celui des Sept Héros — pas la mort, mais un sacrifice personnel profond. Chaque joueur doit sacrifier quelque chose qui compte pour son personnage. C'est la mécanique du climax final (Ch11).

NOTE MJ : Le Miroir ne peut PAS être détruit par la force brute. Hache, épée, sort de Désintégration — rien ne fonctionne. Seul le sacrifice volontaire le brise.`
  }
];
