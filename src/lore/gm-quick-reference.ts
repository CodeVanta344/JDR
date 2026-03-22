/**
 * GM Quick Reference - R\u00e9f\u00e9rence rapide pour le Ma\u00eetre du Jeu
 * Contient r\u00e8gles, tables al\u00e9atoires, ambiances, musique et improvisation
 */

// ============================================================================
// TYPES
// ============================================================================

export interface QuickRef {
  id: string;
  category: string;
  title: string;
  content: string;
}

// ============================================================================
// DATA
// ============================================================================

export const GM_QUICK_REFERENCE: QuickRef[] = [
  // =========================================================================
  // REGLES - R\u00e9sum\u00e9 des r\u00e8gles
  // =========================================================================
  {
    id: 'regles-d100',
    category: 'regles',
    title: 'Syst\u00e8me d100',
    content:
      'Jet de comp\u00e9tence : lancez 1d100. R\u00e9sultat \u2264 CD = Succ\u00e8s. ' +
      'R\u00e9sultat > CD = \u00c9chec. 01-05 = R\u00e9ussite Critique (double effet). ' +
      '96-100 = \u00c9chec Critique (cons\u00e9quence n\u00e9gative suppl\u00e9mentaire). ' +
      'Bonus de comp\u00e9tence : ajout\u00e9 au CD, pas au jet.',
  },
  {
    id: 'regles-stats',
    category: 'regles',
    title: 'Caract\u00e9ristiques',
    content:
      'FOR (Force) \u2014 m\u00eal\u00e9e, port, enfoncer. ' +
      'DEX (Dext\u00e9rit\u00e9) \u2014 esquive, discr\u00e9tion, tir. ' +
      'CON (Constitution) \u2014 PV, endurance, r\u00e9sistance. ' +
      'INT (Intelligence) \u2014 savoir, arcanes, enqu\u00eate. ' +
      'SAG (Sagesse) \u2014 perception, volont\u00e9, survie. ' +
      'CHA (Charisme) \u2014 persuasion, intimidation, leadership. ' +
      'Chaque stat va de 20 \u00e0 80. CD de base = stat concern\u00e9e.',
  },
  {
    id: 'regles-combat',
    category: 'regles',
    title: 'Combat',
    content:
      'Initiative : 1d100 + DEX. Plus haut agit en premier. ' +
      'Attaque m\u00eal\u00e9e : 1d100 vs CD = FOR ou DEX de l\u2019attaquant. ' +
      'Attaque distance : 1d100 vs CD = DEX de l\u2019attaquant. ' +
      'D\u00e9g\u00e2ts : selon arme, soustraits de la CA puis des PV. ' +
      'CA (Classe d\u2019Armure) : r\u00e9duit les d\u00e9g\u00e2ts re\u00e7us. ' +
      'Actions par tour : 1 action + 1 d\u00e9placement + 1 action bonus (si disponible).',
  },
  {
    id: 'regles-repos',
    category: 'regles',
    title: 'Repos et R\u00e9cup\u00e9ration',
    content:
      'Repos court (1h) : r\u00e9cup\u00e8re 25% des PV max, 1 utilisation de comp\u00e9tence. ' +
      'Repos long (8h) : r\u00e9cup\u00e8re tous les PV, toutes les comp\u00e9tences. ' +
      'Repos en lieu s\u00fbr : bonus +10% PV suppl\u00e9mentaires. ' +
      'Repos interrompu : aucun b\u00e9n\u00e9fice si combat durant le repos.',
  },
  {
    id: 'regles-mort',
    category: 'regles',
    title: 'Mort et Inconscience',
    content:
      '0 PV = inconscient. Jet de mort chaque tour : 1d100 vs CD 50. ' +
      '3 succ\u00e8s = stabilis\u00e9 (1 PV). 3 \u00e9checs = mort. ' +
      'Un alli\u00e9 peut stabiliser avec un jet de Premiers Soins (CD 40). ' +
      'R\u00e9ussite critique sur jet de mort : le personnage revient avec 5 PV. ' +
      '\u00c9chec critique : compte comme 2 \u00e9checs.',
  },
  {
    id: 'regles-niveau',
    category: 'regles',
    title: 'Progression et Niveau',
    content:
      'XP gagn\u00e9e par sc\u00e8ne compl\u00e9t\u00e9e, combat, RP, exploration. ' +
      'Niveaux 1-10. Chaque niveau : +5 PV, +2 \u00e0 une stat, 1 nouveau talent. ' +
      'Jalons majeurs (fin d\u2019acte) : niveau automatique + r\u00e9compense sp\u00e9ciale. ' +
      'Multi-classage possible au niveau 4+ avec qu\u00eate narrative.',
  },

  // =========================================================================
  // TABLES - Tables al\u00e9atoires
  // =========================================================================
  {
    id: 'tables-rencontres',
    category: 'tables',
    title: 'Rencontres Al\u00e9atoires',
    content:
      '01-15 : Rien, voyage calme. ' +
      '16-25 : Marchands ambulants (prix +20%). ' +
      '26-35 : Patrouille de la Garde Royale (v\u00e9rifie les papiers). ' +
      '36-45 : Animaux sauvages (1d4 loups ou 1 ours). ' +
      '46-55 : Voyageurs en d\u00e9tresse (pi\u00e8ge ou v\u00e9ritable aide). ' +
      '56-65 : Bandits de grand chemin (1d6, cherchent l\u2019or). ' +
      '66-75 : Ph\u00e9nom\u00e8ne magique (faille de Sceau, aurore anormale). ' +
      '76-85 : Cr\u00e9ature corrompue (1 aberration mineure). ' +
      '86-95 : PNJ notable (alli\u00e9 potentiel ou rival). ' +
      '96-100 : \u00c9v\u00e9nement majeur (tremblement, portail, apparition).',
  },
  {
    id: 'tables-meteo',
    category: 'tables',
    title: 'M\u00e9t\u00e9o du Jour',
    content:
      '01-20 : Ciel d\u00e9gag\u00e9, soleil radieux. ' +
      '21-35 : Nuageux, vent l\u00e9ger. ' +
      '36-50 : Bruine fine, brouillard au sol. ' +
      '51-65 : Pluie battante (-10 aux jets de perception). ' +
      '66-75 : Orage violent (-15 perception, risque de foudre). ' +
      '76-85 : Chaleur \u00e9touffante (-10 endurance en armure lourde). ' +
      '86-92 : Froid mordant (-10 DEX sans v\u00eatements chauds). ' +
      '93-97 : Temp\u00eate de sable/neige (visibilit\u00e9 nulle). ' +
      '98-100 : Ph\u00e9nom\u00e8ne surnaturel (pluie de cendres, brouillard violet, neige dor\u00e9e).',
  },
  {
    id: 'tables-noms',
    category: 'tables',
    title: 'G\u00e9n\u00e9rateur de Noms',
    content:
      'Humains : Aldric, Elara, Theron, Isolde, Gavric, Lysandra, Bram, Celia, Dorin, Maren. ' +
      'Elfes : Aelindra, Thalion, Sylvaris, Nimue, Faelen, Arianwen, Lothir, Elowen. ' +
      'Nains : Thorek, Brunhild, Durak, Helga, Grimjaw, Sigrun, Balin, Hilda. ' +
      'Orques : Grokash, Sharka, Murgol, Razka, Thulk, Vashna. ' +
      'Lieux : Le Creux du Loup, La Pierre Fendue, Les Marches Grises, Le Val Sombre, La Tour Bris\u00e9e.',
  },
  {
    id: 'tables-rumeurs',
    category: 'tables',
    title: 'Rumeurs de Taverne',
    content:
      '1. "On dit que les Catacombes de Sol-Aureus cachent un tr\u00e9sor oubli\u00e9 des Anciens." ' +
      '2. "Un dragon a \u00e9t\u00e9 aper\u00e7u au-dessus des Monts Cendres. \u00c7a n\u2019augure rien de bon." ' +
      '3. "La Guilde des Arcanes fait des exp\u00e9riences sur les failles de Sceau en secret." ' +
      '4. "Le Syndicat de l\u2019Ombre recrute. Ils paient bien, mais on ne quitte jamais." ' +
      '5. "Les Gardiens d\u2019\u00c9meraude ont trouv\u00e9 une for\u00eat enti\u00e8re p\u00e9trifi\u00e9e pr\u00e8s d\u2019Yggdrasylve." ' +
      '6. "Un Sceau a faibli cette nuit. Le ciel \u00e9tait rouge pendant une heure." ' +
      '7. "Le Prince Corval pr\u00e9pare un coup d\u2019\u00e9tat, c\u2019est s\u00fbr." ' +
      '8. "Des morts-vivants ont \u00e9t\u00e9 vus sur la route de Karak-Zhul. \u00c9vitez ce chemin."',
  },
  {
    id: 'tables-tresors',
    category: 'tables',
    title: 'Tr\u00e9sors Al\u00e9atoires',
    content:
      '01-20 : Pi\u00e8ces (2d20 pi\u00e8ces d\u2019or). ' +
      '21-35 : Potion de soin (r\u00e9cup\u00e8re 2d10 PV). ' +
      '36-45 : Gemme pr\u00e9cieuse (valeur 50-200 po). ' +
      '46-55 : Parchemin de sort (niveau 1-3). ' +
      '56-65 : Arme de qualit\u00e9 (+5 aux d\u00e9g\u00e2ts). ' +
      '66-75 : Armure renforc\u00e9e (+2 CA). ' +
      '76-85 : Objet magique mineur (amulette, anneau, baguette). ' +
      '86-92 : Relique de faction (valeur politique). ' +
      '93-97 : Artefact rare (pouvoir unique, 1 utilisation/jour). ' +
      '98-100 : Fragment de Sceau (tr\u00e8s rare, li\u00e9 \u00e0 la qu\u00eate principale).',
  },

  // =========================================================================
  // AMBIANCE - Descriptions d'ambiance pr\u00e9-\u00e9crites
  // =========================================================================
  {
    id: 'ambiance-taverne',
    category: 'ambiance',
    title: 'Taverne',
    content:
      'L\u2019air est charg\u00e9 de fum\u00e9e de pipe et d\u2019odeurs de rago\u00fbt. ' +
      'Des rires gras s\u2019\u00e9l\u00e8vent d\u2019une table o\u00f9 des nains jouent aux d\u00e9s. ' +
      'Le feu cr\u00e9pite dans l\u2019\u00e2tre, projetant des ombres dansantes sur les murs de bois sombre. ' +
      'Un barde gratte les cordes de son luth, une m\u00e9lodie m\u00e9lancolique qui parle de h\u00e9ros oubli\u00e9s. ' +
      'Le tavernier, un homme massif au tablier tach\u00e9, essuie des chopes d\u2019un air distrait.',
  },
  {
    id: 'ambiance-foret',
    category: 'ambiance',
    title: 'For\u00eat',
    content:
      'La canop\u00e9e filtre la lumi\u00e8re en rayons dor\u00e9s qui percent le feuillage dense. ' +
      'Le sol est un tapis de mousse et de feuilles mortes qui \u00e9touffe vos pas. ' +
      'Des chants d\u2019oiseaux invisibles r\u00e9sonnent entre les troncs centenaires. ' +
      'Une brume l\u00e9g\u00e8re s\u2019accroche aux racines noueuses, donnant \u00e0 l\u2019endroit un air f\u00e9\u00e9rique. ' +
      'Par endroits, l\u2019\u00e9corce des arbres porte d\u2019\u00e9tranges marques, comme des runes oubli\u00e9es.',
  },
  {
    id: 'ambiance-donjon',
    category: 'ambiance',
    title: 'Donjon',
    content:
      'Les murs suintent d\u2019humidit\u00e9. L\u2019air est froid, charg\u00e9 d\u2019une odeur de terre et de moisissure. ' +
      'Vos torches projettent des ombres grotesques sur la pierre taill\u00e9e. ' +
      'Un courant d\u2019air glacial venu d\u2019en bas fait vaciller les flammes. ' +
      'Le silence est oppressant, bris\u00e9 seulement par le goutte-\u00e0-goutte r\u00e9gulier de l\u2019eau. ' +
      'Des toiles d\u2019araign\u00e9es \u00e9paisses drapent les colonnes, certaines assez grandes pour pi\u00e9ger un homme.',
  },
  {
    id: 'ambiance-ville',
    category: 'ambiance',
    title: 'Ville',
    content:
      'Les rues pav\u00e9es bourdonnent d\u2019activit\u00e9. Des marchands crient leurs prix, des enfants courent entre les \u00e9tals. ' +
      'L\u2019odeur du pain frais se m\u00eale \u00e0 celle, moins agr\u00e9able, des caniveaux. ' +
      'Des gardes en armure patrouillent par deux, l\u2019air s\u00e9v\u00e8re. ' +
      'Au loin, les cloches du temple sonnent l\u2019heure. ' +
      'Des banni\u00e8res aux couleurs de la cit\u00e9 flottent au vent depuis les tours de guet.',
  },
  {
    id: 'ambiance-mer',
    category: 'ambiance',
    title: 'Mer et C\u00f4te',
    content:
      'Les vagues se brisent sur les rochers dans un fracas r\u00e9gulier et hypnotique. ' +
      'L\u2019air sal\u00e9 vous pique les narines et le vent marin plaque vos v\u00eatements contre vous. ' +
      'Des mouettes tournent en criant au-dessus des m\u00e2ts des navires \u00e0 quai. ' +
      'Le port sent le poisson, le goudron et l\u2019aventure. ' +
      'Au large, un navire aux voiles sombres fend les flots vers l\u2019horizon brumeaux.',
  },
  {
    id: 'ambiance-montagne',
    category: 'ambiance',
    title: 'Montagne',
    content:
      'Le sentier grimpe entre des rochers escarp\u00e9s. L\u2019air se rar\u00e9fie, chaque pas co\u00fbte un effort. ' +
      'Le vent hurle dans les d\u00e9fil\u00e9s, portant des flocons de neige qui piquent la peau. ' +
      'En contrebas, la vall\u00e9e s\u2019\u00e9tend comme une carte en miniature. ' +
      'Des aigles planent dans les courants ascendants, ma\u00eetres silencieux de ces hauteurs. ' +
      'La roche ici est vein\u00e9e de cristaux qui scintillent sous le soleil p\u00e2le.',
  },
  {
    id: 'ambiance-nuit',
    category: 'ambiance',
    title: 'Nuit et Campement',
    content:
      'Les \u00e9toiles parsem\u00e8nt le ciel comme des diamants sur du velours noir. ' +
      'Le feu de camp cr\u00e9pite, cercle de lumi\u00e8re fragile dans l\u2019obscurit\u00e9 immense. ' +
      'Des bruits nocturnes \u2014 hululements, craquements, bruissements \u2014 rappellent que la nuit appartient aux pr\u00e9dateurs. ' +
      'Les ombres au-del\u00e0 du cercle de lumi\u00e8re semblent bouger, jouer des tours \u00e0 vos sens fatigu\u00e9s. ' +
      'La ros\u00e9e commence \u00e0 perler sur les couvertures.',
  },
  {
    id: 'ambiance-tempete',
    category: 'ambiance',
    title: 'Temp\u00eate',
    content:
      'Le ciel est devenu une masse noire et mena\u00e7ante. Le tonnerre gronde comme la col\u00e8re des dieux. ' +
      'Des \u00e9clairs d\u00e9chirent les nuages, illuminant bri\u00e8vement le paysage d\u2019une lumi\u00e8re blafarde. ' +
      'La pluie tombe en rideaux si denses que la visibilit\u00e9 se r\u00e9duit \u00e0 quelques m\u00e8tres. ' +
      'Le vent hurle, arrachant des branches et projetant des d\u00e9bris. ' +
      'Quelque chose dans cette temp\u00eate semble\u2026 surnaturel. Comme si le Sceau lui-m\u00eame tremblait.',
  },

  // =========================================================================
  // MUSIQUE - Suggestions de playlists
  // =========================================================================
  {
    id: 'musique-exploration',
    category: 'musique',
    title: 'Exploration et Voyage',
    content:
      'Ambiance calme, instruments acoustiques, rythme mod\u00e9r\u00e9. ' +
      'Suggestions : Skyrim OST "Secunda", "Far Horizons". ' +
      'The Witcher 3 "The Fields of Ard Skellig". ' +
      'Lord of the Rings "The Shire" (Howard Shore). ' +
      'Baldur\u2019s Gate 3 "Down by the River". ' +
      'Rechercher : "D&D exploration ambient music" sur YouTube.',
  },
  {
    id: 'musique-combat',
    category: 'musique',
    title: 'Combat',
    content:
      'Rythme rapide, percussions intenses, cuivres puissants. ' +
      'Suggestions : The Witcher 3 "Steel for Humans", "Silver for Monsters". ' +
      'Dark Souls III "Abyss Watchers". ' +
      'Baldur\u2019s Gate 3 "Battle Music". ' +
      'Two Steps From Hell "Victory", "Heart of Courage". ' +
      'Rechercher : "epic battle RPG music" sur YouTube.',
  },
  {
    id: 'musique-taverne',
    category: 'musique',
    title: 'Taverne et Ville',
    content:
      'Luth, fl\u00fbte, percussions l\u00e9g\u00e8res, ambiance joyeuse ou m\u00e9lancolique. ' +
      'Suggestions : The Witcher 3 taverne tracks. ' +
      'Baldur\u2019s Gate 3 "Bard Songs". ' +
      'Fable OST musiques de village. ' +
      'Medieval tavern music compilations (Bardcore). ' +
      'Rechercher : "medieval tavern music" ou "bardcore playlist" sur YouTube.',
  },
  {
    id: 'musique-mystere',
    category: 'musique',
    title: 'Myst\u00e8re et Tension',
    content:
      'Cordes dissonantes, silences, sons ambiants inqui\u00e9tants. ' +
      'Suggestions : Bloodborne OST "Omen". ' +
      'Dark Souls "Firelink Shrine". ' +
      'Darkest Dungeon "Explore" tracks. ' +
      'Amnesia: The Dark Descent ambiance. ' +
      'Rechercher : "dark mystery RPG ambient" sur YouTube.',
  },
  {
    id: 'musique-boss',
    category: 'musique',
    title: 'Combat de Boss',
    content:
      'Orchestral \u00e9pique, ch\u0153urs, mont\u00e9e en puissance. ' +
      'Suggestions : Dark Souls III "Soul of Cinder". ' +
      'Final Fantasy "One-Winged Angel", "Shadowbringers". ' +
      'God of War "Memories of Mother". ' +
      'Two Steps From Hell "Protectors of the Earth". ' +
      'Rechercher : "epic boss fight music orchestral" sur YouTube.',
  },
  {
    id: 'musique-emotionnel',
    category: 'musique',
    title: 'Moments \u00c9motionnels',
    content:
      'Piano, cordes douces, voix \u00e9th\u00e9r\u00e9es, rythme lent. ' +
      'Suggestions : Ori and the Blind Forest "Light of Nibel". ' +
      'Journey OST "Apotheosis". ' +
      'The Last of Us "The Path". ' +
      'Baldur\u2019s Gate 3 "I Want to Live". ' +
      'Rechercher : "emotional RPG music" ou "sad fantasy music" sur YouTube.',
  },
  {
    id: 'musique-donjon',
    category: 'musique',
    title: 'Donjon et Exploration Souterraine',
    content:
      'Sons cave, \u00e9chos, ambiance oppressante, rares notes de musique. ' +
      'Suggestions : Diablo II "Catacombs". ' +
      'Dark Souls "The Catacombs". ' +
      'Darkest Dungeon "Combat in the Ruins". ' +
      'Pillars of Eternity dungeon tracks. ' +
      'Rechercher : "dungeon crawl ambient dark fantasy" sur YouTube.',
  },

  // =========================================================================
  // IMPROVISATION - Phrases d'accroche et outils d'impro
  // =========================================================================
  {
    id: 'impro-pnj-accroches',
    category: 'improvisation',
    title: 'Accroches de PNJ',
    content:
      '"H\u00e9, vous l\u00e0 ! Vous avez une t\u00eate d\u2019aventuriers. J\u2019ai un travail pour des gens comme vous." ' +
      '"Ne vous approchez pas des ruines au nord. Ceux qui y vont\u2026 ne reviennent pas tous." ' +
      '"Je cherche ma fille. Elle a disparu il y a trois jours. La garde s\u2019en fiche." ' +
      '"Vous voulez un conseil gratuit ? Quittez cette ville avant la prochaine lune noire." ' +
      '"*chuchote* Je sais qui a vol\u00e9 la relique du temple. Mais \u00e7a vous co\u00fbtera." ' +
      '"Encore des \u00e9trangers\u2026 La derni\u00e8re bande a mis le feu \u00e0 la grange. Vous \u00eates pr\u00e9venus."',
  },
  {
    id: 'impro-quetes',
    category: 'improvisation',
    title: 'Qu\u00eates Improvis\u00e9es',
    content:
      'Escorte : Prot\u00e9ger un marchand sur une route dangereuse (2-3 rencontres). ' +
      'Enqu\u00eate : Un meurtre myst\u00e9rieux dans une auberge, 3 suspects, chacun ment sur un point. ' +
      'Sauvetage : Des villageois pi\u00e9g\u00e9s dans une mine effondr\u00e9e, le temps presse. ' +
      'Chasse : Une b\u00eate terrifiante r\u00f4de, il faut la traquer, la trouver, la vaincre ou la raisonner. ' +
      'Diplomatie : Deux factions au bord de la guerre, le groupe doit n\u00e9gocier la paix. ' +
      'R\u00e9cup\u00e9ration : Un objet vol\u00e9 est dans le repaire d\u2019un gang, infiltration ou assaut frontal.',
  },
  {
    id: 'impro-evenements',
    category: 'improvisation',
    title: '\u00c9v\u00e9nements Inattendus',
    content:
      'Un tremblement de terre r\u00e9v\u00e8le l\u2019entr\u00e9e d\u2019une grotte inconnue juste \u00e0 c\u00f4t\u00e9 du groupe. ' +
      'Un messager essouffl\u00e9 apporte une lettre urgente : un alli\u00e9 est en danger. ' +
      'Un Sceau proche pulse bri\u00e8vement \u2014 tous ressentent une vague de malaise. ' +
      'Un voleur \u00e0 la tire s\u2019enfuit avec la bourse d\u2019un PJ \u2014 poursuite dans les rues ! ' +
      'Le ciel prend une couleur impossible pendant quelques minutes, puis redevient normal. ' +
      'Un animal bless\u00e9 s\u2019approche du groupe, il porte un collier avec un message crypt\u00e9.',
  },
  {
    id: 'impro-descriptions',
    category: 'improvisation',
    title: 'Descriptions Sensorielles',
    content:
      'Vue : "La lumi\u00e8re rasante dessine des ombres allong\u00e9es sur les dalles fissur\u00e9es." ' +
      'Son : "Un chant lointain, presque inaudible, semble venir des murs eux-m\u00eames." ' +
      'Odeur : "L\u2019air porte un m\u00e9lange d\u2019encens br\u00fbl\u00e9 et de fer rouill\u00e9." ' +
      'Toucher : "La surface est \u00e9tonnamment ti\u00e8de sous vos doigts, comme si elle respirait." ' +
      'Go\u00fbt : "L\u2019eau a un arri\u00e8re-go\u00fbt m\u00e9tallique, \u00e0 peine perceptible mais d\u00e9rangeant."',
  },
  {
    id: 'impro-complications',
    category: 'improvisation',
    title: 'Complications de Sc\u00e8ne',
    content:
      'Trahison : Un alli\u00e9 r\u00e9v\u00e8le ses vraies intentions au pire moment. ' +
      'Renfort ennemi : Des renforts arrivent pendant le combat \u2014 il faut finir vite ou fuir. ' +
      'Dilemme moral : Sauver le tr\u00e9sor ou sauver l\u2019otage ? Le temps ne permet qu\u2019un choix. ' +
      'Environnement hostile : Le sol s\u2019effondre, le feu se propage, l\u2019eau monte. ' +
      'Malentendu : Les "ennemis" sont en fait des victimes d\u00e9guis\u00e9es ou ensorcel\u00e9es. ' +
      'Retournement : L\u2019objet de la qu\u00eate n\u2019est pas ce qu\u2019on croyait.',
  },
  {
    id: 'impro-recompenses',
    category: 'improvisation',
    title: 'R\u00e9compenses Narratives',
    content:
      'Un PNJ offre l\u2019hospitalit\u00e9 gratuite et des informations pr\u00e9cieuses. ' +
      'Le groupe gagne la confiance d\u2019une faction : acc\u00e8s \u00e0 leurs ressources et contacts. ' +
      'Un artisan propose de forger un objet sur mesure en remerciement. ' +
      'Une propri\u00e9t\u00e9 est offerte : maison, boutique, ou petit navire. ' +
      'Un titre honorifique est d\u00e9cern\u00e9 : ouverture de portes sociales et politiques. ' +
      'Un ancien secret est r\u00e9v\u00e9l\u00e9 : indice sur la qu\u00eate principale ou le pass\u00e9 d\u2019un PJ.',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getQuickRefByCategory(category: string): QuickRef[] {
  return GM_QUICK_REFERENCE.filter(ref => ref.category === category);
}

export function getQuickRefCategories(): { id: string; label: string; icon: string }[] {
  return [
    { id: 'regles', label: 'R\u00e8gles', icon: '\ud83d\udcd6' },
    { id: 'tables', label: 'Tables Al\u00e9atoires', icon: '\ud83c\udfb2' },
    { id: 'ambiance', label: 'Ambiance', icon: '\ud83c\udf19' },
    { id: 'musique', label: 'Musique', icon: '\ud83c\udfb5' },
    { id: 'improvisation', label: 'Improvisation', icon: '\ud83c\udfad' },
  ];
}

export function searchQuickRef(query: string): QuickRef[] {
  const lower = query.toLowerCase();
  return GM_QUICK_REFERENCE.filter(
    ref =>
      ref.title.toLowerCase().includes(lower) ||
      ref.content.toLowerCase().includes(lower) ||
      ref.category.toLowerCase().includes(lower)
  );
}
