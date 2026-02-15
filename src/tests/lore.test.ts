import { describe, it, expect } from 'vitest';
import { CLASSES, CLASS_CATEGORIES } from '../lore/classes';
import { BESTIARY, BESTIARY_EXTENDED } from '../lore/bestiary';
import { NPC_TEMPLATES } from '../lore/npcs';
import { QUEST_HOOKS, RUMORS_AND_GOSSIP } from '../lore/quests';
import { LEGENDARY_ITEMS } from '../lore/items';
import { WORLD_HISTORY, FACTION_LORE } from '../lore/world';
import { getTimeOfDay, CULTURAL_LORE } from '../lore/culture';

describe('Classes Lore', () => {
  it('should have 8 playable classes', () => {
    expect(Object.keys(CLASSES).length).toBe(8);
  });

  it('should have all required class properties', () => {
    Object.values(CLASSES).forEach(cls => {
      expect(cls).toHaveProperty('label');
      expect(cls).toHaveProperty('hitDie');
      expect(cls).toHaveProperty('resourceStat');
      expect(cls).toHaveProperty('desc');
      expect(cls).toHaveProperty('abilities');
      expect(cls).toHaveProperty('subclasses');
    });
  });

  it('should have at least 2 subclasses per class', () => {
    Object.values(CLASSES).forEach(cls => {
      const subclassCount = Object.keys(cls.subclasses).length;
      expect(subclassCount).toBeGreaterThanOrEqual(2);
    });
  });

  it('should have starting abilities with required fields', () => {
    Object.values(CLASSES).forEach(cls => {
      cls.initial_ability_options.forEach(ability => {
        expect(ability).toHaveProperty('name');
        expect(ability).toHaveProperty('desc');
        expect(ability).toHaveProperty('level');
        expect(ability).toHaveProperty('cost');
        expect(ability).toHaveProperty('cooldown');
      });
    });
  });
});

describe('Bestiary Lore', () => {
  it('should have base bestiary creatures', () => {
    expect(Object.keys(BESTIARY).length).toBeGreaterThan(0);
  });

  it('should have extended bestiary creatures', () => {
    expect(Object.keys(BESTIARY_EXTENDED).length).toBeGreaterThan(0);
  });

  it('should have required creature properties', () => {
    const allCreatures = BESTIARY_EXTENDED.ALL_CREATURES || [];
    allCreatures.forEach(creature => {
      expect(creature).toHaveProperty('name');
      expect(creature).toHaveProperty('stats');
      expect(creature.stats).toHaveProperty('hp');
      expect(creature.stats).toHaveProperty('ac');
      expect(creature.stats).toHaveProperty('atk');
      expect(creature).toHaveProperty('actions');
    });
  });
});

describe('NPC Templates', () => {
  it('should have merchant templates', () => {
    expect(NPC_TEMPLATES.merchants.general.length).toBeGreaterThan(0);
  });

  it('should have tavernkeeper templates', () => {
    expect(NPC_TEMPLATES.merchants.general.length).toBeGreaterThan(0);
  });

  it('should have quest giver templates', () => {
    expect(NPC_TEMPLATES.questgivers.main.length).toBeGreaterThan(0);
  });

  it('should have NPC templates with required properties', () => {
    NPC_TEMPLATES.merchants.general.forEach((npc: any) => {
      expect(npc).toHaveProperty('name');
      expect(npc).toHaveProperty('title');
      expect(npc).toHaveProperty('role');
    });
  });
});

describe('Quest Hooks', () => {
  it('should have quests functions', () => {
    expect(QUEST_HOOKS).toHaveProperty('getAllQuests');
    expect(QUEST_HOOKS).toHaveProperty('getQuestsByGiver');
    expect(QUEST_HOOKS).toHaveProperty('getNextQuestInChain');
  });

  it('should have quest hooks with required properties', () => {
    const allQuests = QUEST_HOOKS.getAllQuests();
    allQuests.forEach((quest: any) => {
      expect(quest).toHaveProperty('title');
      expect(quest).toHaveProperty('type');
      expect(quest).toHaveProperty('description');
    });
  });
});

describe('Rumors', () => {
  it('should have rumors for regions', () => {
    expect(Object.keys(RUMORS_AND_GOSSIP).length).toBeGreaterThan(0);
  });

  it('should have rumors with truth property', () => {
    Object.values(RUMORS_AND_GOSSIP).forEach(region => {
      region.forEach(rumor => {
        expect(rumor).toHaveProperty('rumor');
        expect(rumor).toHaveProperty('truth');
      });
    });
  });
});

describe('Legendary Items', () => {
  it('should have legendary items', () => {
    expect(LEGENDARY_ITEMS.length).toBeGreaterThan(0);
  });

  it('should have items with required properties', () => {
    LEGENDARY_ITEMS.forEach(item => {
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('type');
      expect(item).toHaveProperty('rarity');
      expect(item).toHaveProperty('stats');
      expect(item).toHaveProperty('lore');
    });
  });
});

describe('World History', () => {
  it('should have mythology', () => {
    expect(WORLD_HISTORY.mythology).toHaveProperty('creation');
    expect(WORLD_HISTORY.mythology).toHaveProperty('the_divine_silence');
  });

  it('should have historical epochs', () => {
    expect(WORLD_HISTORY.epochs.length).toBeGreaterThan(0);
    WORLD_HISTORY.epochs.forEach(epoch => {
      expect(epoch).toHaveProperty('name');
      expect(epoch).toHaveProperty('duration');
      expect(epoch).toHaveProperty('desc');
    });
  });
});

describe('Factions', () => {
  it('should have major factions', () => {
    expect(FACTION_LORE).toHaveProperty("Bouclier d'Argent");
    expect(FACTION_LORE).toHaveProperty("Cercle des Cendres");
    expect(FACTION_LORE).toHaveProperty("Main Noire");
  });

  it('should have faction details', () => {
    Object.values(FACTION_LORE).forEach(faction => {
      expect(faction).toHaveProperty('name');
      expect(faction).toHaveProperty('philosophy');
      expect(faction).toHaveProperty('history');
      expect(faction).toHaveProperty('headquarters');
      expect(faction).toHaveProperty('secrets');
    });
  });
});

describe('Cultural Lore', () => {
  it('should have calendar with months', () => {
    expect(CULTURAL_LORE.CALENDAR.months.length).toBe(8);
  });

  it('should have festivals', () => {
    expect(CULTURAL_LORE.FESTIVALS.length).toBeGreaterThan(0);
  });

  it('should have idioms', () => {
    expect(CULTURAL_LORE.IDIOMS.length).toBeGreaterThan(0);
  });
});

describe('Time of Day', () => {
  it('should return correct time periods', () => {
    expect(getTimeOfDay(6)).toBe('aube');
    expect(getTimeOfDay(12)).toBe('jour');
    expect(getTimeOfDay(19)).toBe('crépuscule');
    expect(getTimeOfDay(23)).toBe('nuit');
    expect(getTimeOfDay(3)).toBe('nuit');
  });
});
