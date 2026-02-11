// Lore Index - Re-exports all lore modules
export * from './world';
export * from './classes';
export * from './bestiary';
export * from './npcs';
export * from './quests';
export * from './locations';
export * from './encounters';
export * from './items';
export * from './rules';
export * from './culture';
export * from './backstories';
export * from './events';

// Helper to get all creatures from both bestiaries
import { BESTIARY } from './bestiary';
import { BESTIARY_EXTENDED } from './bestiary';

export const getAllCreatures = () => ({
  ...BESTIARY,
  ...BESTIARY_EXTENDED
});

// Helper to get random encounter
import { RANDOM_ENCOUNTERS } from './encounters';

export const getRandomEncounter = (type: keyof typeof RANDOM_ENCOUNTERS): string => {
  const encounters = RANDOM_ENCOUNTERS[type];
  return encounters[Math.floor(Math.random() * encounters.length)];
};

// Helper to find NPC by name
import { NPC_TEMPLATES } from './npcs';

export const findNPC = (name: string) => {
  for (const category of Object.values(NPC_TEMPLATES)) {
    const found = category.find((npc: any) => npc.name === name);
    if (found) return found;
  }
  return null;
};

// Helper to get quest hooks by region
import { QUEST_HOOKS } from './quests';

export const getQuestsByRegion = (region: keyof typeof QUEST_HOOKS) => {
  return QUEST_HOOKS[region] || [];
};

// Helper to get rumors by region
import { RUMORS_AND_GOSSIP } from './quests';

export const getRumorsByRegion = (region: keyof typeof RUMORS_AND_GOSSIP) => {
  return RUMORS_AND_GOSSIP[region] || [];
};
