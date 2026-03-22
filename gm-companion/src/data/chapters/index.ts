/**
 * Barrel – réexporte tous les chapitres, types, et contenu additionnel
 */
export type {
  NarrativeScene, NarrativeChapter,
  NarrativeDialogue, DialogueLine, NarrativeTransition, NarrativeSkillCheck,
  SideQuest, RandomEncounter, RandomTable,
  RoomDescription, RoomExit, TrapDescription, Interactable,
  NPCDetail, Consequence, TimePressure, AlternativePath,
  StatBlock,
} from './types';

export { CHAPTER_1 } from './ch01';
export { CHAPTER_2 } from './ch02';
export { CHAPTER_3 } from './ch03';
export { CHAPTER_4 } from './ch04';
export { CHAPTER_5 } from './ch05';
export { CHAPTER_6 } from './ch06';
export { CHAPTER_7 } from './ch07';
export { CHAPTER_8 } from './ch08';
export { CHAPTER_9 } from './ch09';
export { CHAPTER_10 } from './ch10';
export { CHAPTER_11 } from './ch11';
export { CHAPTER_12 } from './ch12';

// Contenu intercalaire
export { ALL_TRAVEL_SCENES } from './travel-scenes';
export { ALL_REGIONAL_TABLES } from './regional-tables';
export type { RegionalTable } from './regional-tables';
export { ALL_SIDE_QUESTS } from './side-quests';

// Lore du monde — importer directement depuis '../lore' ou '../lore/lore-*'

import { CHAPTER_1 } from './ch01';
import { CHAPTER_2 } from './ch02';
import { CHAPTER_3 } from './ch03';
import { CHAPTER_4 } from './ch04';
import { CHAPTER_5 } from './ch05';
import { CHAPTER_6 } from './ch06';
import { CHAPTER_7 } from './ch07';
import { CHAPTER_8 } from './ch08';
import { CHAPTER_9 } from './ch09';
import { CHAPTER_10 } from './ch10';
import { CHAPTER_11 } from './ch11';
import { CHAPTER_12 } from './ch12';
import type { NarrativeChapter } from './types';

/** Tous les chapitres, ordonnés */
export const ALL_CHAPTERS: NarrativeChapter[] = [
  CHAPTER_1, CHAPTER_2, CHAPTER_3, CHAPTER_4,
  CHAPTER_5, CHAPTER_6, CHAPTER_7, CHAPTER_8,
  CHAPTER_9, CHAPTER_10, CHAPTER_11, CHAPTER_12,
];

