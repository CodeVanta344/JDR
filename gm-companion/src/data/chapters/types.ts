/**
 * Types partagés pour le Guide Narratif
 * Campagne : Les Sceaux du Crépuscule (12 chapitres)
 *
 * Système enrichi pour supporter :
 * - Quêtes secondaires, tables aléatoires, donjons salle-par-salle
 * - Fiches PNJ détaillées, rumeurs, conséquences des choix
 * - Pression temporelle, chemins alternatifs, lore connecté
 */

// ============================================================================
// TYPES — STAT BLOCKS (D&D-style creature/NPC stats)
// ============================================================================

export interface StatBlockAttack {
  name: string;
  bonus: string;
  damage: string;
  notes: string;
}

export interface StatBlock {
  name: string;
  cr: string;
  ac: number;
  hp: number;
  speed: string;
  abilities: { str: number; dex: number; con: number; int: number; wis: number; cha: number };
  attacks: StatBlockAttack[];
  specialAbilities: string[];
  weakness?: string;
  legendary?: string[];
  lairActions?: string[];
}

// ============================================================================
// TYPES DE BASE (existants, conservés)
// ============================================================================

export interface NarrativeDialogue {
  npcId: string;
  npcName: string;
  lines: DialogueLine[];
}

export interface DialogueLine {
  trigger: string;
  text: string;
  tone: string;
  /** Condition optionnelle (ex: "si le joueur a l'objet X") */
  condition?: string;
}

export interface NarrativeTransition {
  condition: string;
  nextScene: string;
  label: string;
  alternative?: string;
}

export interface NarrativeSkillCheck {
  skill: string;
  dc: number;
  success: string;
  failure: string;
  /** Résultat sur réussite critique (nat 20 ou DC+10) */
  criticalSuccess?: string;
  /** Résultat sur échec critique (nat 1) */
  criticalFailure?: string;
}

// ============================================================================
// NOUVEAUX TYPES — QUÊTES SECONDAIRES
// ============================================================================

export interface SideQuest {
  id: string;
  title: string;
  /** Description pour le MJ — contexte, motivation, enjeux */
  description: string;
  /** PNJ qui donne la quête (id ou nom) */
  giver?: string;
  /** Texte à lire quand le PNJ propose la quête */
  hookText?: string;
  /** Objectifs à accomplir */
  objectives: string[];
  /** Récompenses */
  reward: string;
  /** Conséquences si ignorée */
  consequenceIfIgnored?: string;
  /** Durée estimée en minutes de jeu */
  estimatedMinutes: number;
  /** Difficulté globale */
  difficulty: 'facile' | 'moyen' | 'difficile' | 'mortel';
  /** Chapitres pendant lesquels cette quête est active */
  activeChapters?: string[];
}

// ============================================================================
// NOUVEAUX TYPES — RENCONTRES ALÉATOIRES
// ============================================================================

export interface RandomEncounter {
  /** Résultat du d20 (ex: "1-3", "4-6", "17-20") */
  d20Range: string;
  /** Description narrative de la rencontre */
  description: string;
  /** Créatures impliquées (optionnel — pas toutes les rencontres sont des combats) */
  creatures?: string[];
  /** Difficulté du combat (si applicable) */
  difficulty?: 'facile' | 'moyen' | 'difficile' | 'mortel';
  /** Loot potentiel */
  loot?: string[];
  /** Notes MJ spécifiques */
  gmNotes?: string;
}

export interface RandomTable {
  id: string;
  title: string;
  /** Type de table */
  type: 'encounter' | 'weather' | 'event' | 'treasure' | 'rumor';
  /** Région associée */
  region: string;
  entries: RandomEncounter[];
}

// ============================================================================
// NOUVEAUX TYPES — DONJONS / SALLES
// ============================================================================

export interface RoomDescription {
  id: string;
  name: string;
  /** Texte à lire aux joueurs */
  readAloud: string;
  /** Notes privées MJ (secrets, pièges, trésors cachés) */
  gmNotes: string;
  /** Sorties (portes, tunnels, escaliers) avec ids des salles connectées */
  exits: RoomExit[];
  /** Créatures présentes */
  creatures?: string[];
  /** Pièges */
  traps?: TrapDescription[];
  /** Loot trouvable */
  loot?: string[];
  /** Éléments interactifs (leviers, autels, inscriptions) */
  interactables?: Interactable[];
  /** Dimensions approximatives */
  dimensions?: string;
  /** Éclairage */
  lighting?: 'aucun' | 'faible' | 'modéré' | 'vif' | 'magique';
}

export interface RoomExit {
  direction: string;
  targetRoomId: string;
  description: string;
  /** Verrouillée, piégée, secrète ? */
  locked?: boolean;
  lockDC?: number;
  secret?: boolean;
  secretDC?: number;
}

export interface TrapDescription {
  name: string;
  /** DC pour détecter */
  detectionDC: number;
  /** DC pour désamorcer */
  disarmDC: number;
  /** Effet si déclenché */
  effect: string;
  /** Dégâts si applicable */
  damage?: string;
}

export interface Interactable {
  name: string;
  description: string;
  /** Compétence pour interagir */
  skill?: string;
  dc?: number;
  /** Résultat de l'interaction */
  result: string;
}

// ============================================================================
// NOUVEAUX TYPES — PNJ DÉTAILLÉS
// ============================================================================

export interface NPCDetail {
  id: string;
  name: string;
  race: string;
  class?: string;
  level?: number;
  alignment: string;
  /** Description physique (2-3 phrases) */
  appearance: string;
  /** Traits de personnalité */
  personality: string;
  /** Motivation profonde */
  motivation: string;
  /** Secret que les joueurs peuvent découvrir */
  secret?: string;
  /** Voix / tic verbal (aide au RP du MJ) */
  voiceTip?: string;
  /** Relations avec d'autres PNJ */
  relationships?: { npcId: string; npcName: string; nature: string }[];
  /** Référence vers un stat block */
  statBlock?: string;
  /** Lieux où on peut le trouver */
  locations?: string[];
  /** Citations favorites (aide au RP) */
  quotes?: string[];
}

// ============================================================================
// NOUVEAUX TYPES — CONSÉQUENCES & PRESSION
// ============================================================================

export interface Consequence {
  /** Choix qui déclenche cette conséquence */
  trigger: string;
  /** Effet immédiat */
  immediate: string;
  /** Effet à long terme (chapitres plus tard) */
  longTerm?: string;
  /** Chapitre où la conséquence se manifeste */
  manifestsInChapter?: string;
}

export interface TimePressure {
  /** Description narrative de l'urgence */
  description: string;
  /** Nombre de rounds/minutes/jours avant l'échéance */
  deadline: string;
  /** Ce qui se passe si le temps est écoulé */
  failureConsequence: string;
  /** Mécanique (ex: "chaque round, jet de X") */
  mechanic?: string;
}

export interface AlternativePath {
  /** Condition pour emprunter ce chemin */
  condition: string;
  /** Description de ce qui se passe — texte à lire */
  readAloud: string;
  /** Notes MJ */
  gmNotes: string;
  /** Vers quelle scène on se dirige */
  nextScene?: string;
}

// ============================================================================
// TYPE PRINCIPAL — SCÈNE NARRATIVE (ENRICHIE)
// ============================================================================

export interface NarrativeScene {
  id: string;
  chapterId: string;
  sceneNumber: number;
  title: string;
  type: 'narration' | 'combat' | 'exploration' | 'dialogue' | 'choice' | 'transition';

  // --- Contenu narratif ---
  /** Texte à lire à voix haute aux joueurs */
  readAloud: string;
  /** Notes privées pour le MJ */
  gmNotes: string;
  /** Description détaillée de l'environnement (odeurs, sons, textures) */
  environmentDetails?: string;

  // --- PNJ & Dialogues ---
  dialogues: NarrativeDialogue[];
  /** Fiches PNJ détaillées présents dans la scène */
  npcDetails?: NPCDetail[];

  // --- Objectifs & Navigation ---
  objectives: { description: string; type: string; optional: boolean }[];
  transitions: NarrativeTransition[];
  /** Chemins alternatifs si les PJ font quelque chose d'inattendu */
  alternativePaths?: AlternativePath[];

  // --- Mécanique ---
  skillChecks?: NarrativeSkillCheck[];
  encounters?: string[];
  loot?: string[];
  /** Conseils tactiques pour le MJ (positionnement, faiblesses, terrain) */
  tacticalNotes?: string;

  // --- Contenu étendu ---
  /** Quêtes secondaires proposées dans cette scène */
  sideQuests?: SideQuest[];
  /** Table de rencontres aléatoires */
  randomEncounters?: RandomEncounter[];
  /** Descriptions de salle (si la scène est un donjon/bâtiment) */
  rooms?: RoomDescription[];
  /** Rumeurs que les PJ peuvent entendre */
  rumors?: string[];

  // --- Conséquences & Tempo ---
  /** Conséquences à long terme des choix faits ici */
  consequences?: Consequence[];
  /** Mécanique de pression temporelle */
  timePressure?: TimePressure;

  // --- Lore connecté ---
  /** Clés vers des entrées lore (→ modules lore-*.ts) */
  loreEntries?: string[];
  /** Description textuelle de la carte/plan de la zone */
  mapDescription?: string;

  // --- Meta ---
  estimatedMinutes: number;
  mood: string;
  music?: string;
  location: string;
}

// ============================================================================
// TYPE CHAPITRE
// ============================================================================

export interface NarrativeChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  suggestedLevel: number;
  region: string;
  themes: string[];
  scenes: NarrativeScene[];
  previousChapter?: string;
  nextChapter?: string;
  /** Tables aléatoires spécifiques à ce chapitre */
  randomTables?: RandomTable[];
  /** Quêtes secondaires à l'échelle du chapitre (pas liées à une scène) */
  chapterSideQuests?: SideQuest[];
  /** Quêtes secondaires du chapitre (enrichissement) */
  sideQuests?: SideQuest[];
  /** Rencontres aléatoires du chapitre */
  randomEncounters?: RandomEncounter[];
  /** Stat blocks des créatures/boss du chapitre */
  statBlocks?: Record<string, StatBlock>;
  /** Descriptions de salles/lieux clés du chapitre */
  roomDescriptions?: RoomDescription[];
}
