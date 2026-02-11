import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '../store/gameStore';
import type { Quest, Note, Character } from '../types';

describe('gameStore', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });

  describe('profile management', () => {
    it('should set and clear profile', () => {
      const profile = { id: '1', name: 'Test Player' };
      useGameStore.getState().setProfile(profile);
      expect(useGameStore.getState().profile).toEqual(profile);

      useGameStore.getState().setProfile(null);
      expect(useGameStore.getState().profile).toBeNull();
    });
  });

  describe('character management', () => {
    it('should set character', () => {
      const character = {
        id: '1',
        user_id: 'u1',
        session_id: 's1',
        name: 'Test Hero',
        hp: 20,
        max_hp: 20,
        level: 1,
        xp: 0,
        gold: 100,
      } as Character;

      useGameStore.getState().setCharacter(character);
      expect(useGameStore.getState().character).toEqual(character);
    });
  });

  describe('message management', () => {
    it('should add messages without duplicates', () => {
      const message1 = {
        id: 'm1',
        session_id: 's1',
        role: 'user' as const,
        content: 'Hello',
      };

      useGameStore.getState().addMessage(message1);
      useGameStore.getState().addMessage(message1);

      expect(useGameStore.getState().messages.length).toBe(1);
    });

    it('should set messages array', () => {
      const messages = [
        { id: 'm1', session_id: 's1', role: 'user' as const, content: 'Hello' },
        { id: 'm2', session_id: 's1', role: 'assistant' as const, content: 'Hi!' },
      ];

      useGameStore.getState().setMessages(messages);
      expect(useGameStore.getState().messages).toEqual(messages);
    });
  });

  describe('quest management', () => {
    it('should add quest', () => {
      const quest: Quest = {
        id: 'q1',
        title: 'Test Quest',
        description: 'A test quest',
        status: 'active',
      };

      useGameStore.getState().addQuest(quest);
      expect(useGameStore.getState().quests).toContainEqual(quest);
    });

    it('should update quest', () => {
      const quest: Quest = {
        id: 'q1',
        title: 'Test Quest',
        description: 'A test quest',
        status: 'active',
      };

      useGameStore.getState().addQuest(quest);
      useGameStore.getState().updateQuest('q1', { status: 'completed' });

      const updated = useGameStore.getState().quests.find(q => q.id === 'q1');
      expect(updated?.status).toBe('completed');
    });
  });

  describe('notes management', () => {
    it('should add note', () => {
      const note: Note = {
        id: 'n1',
        title: 'Test Note',
        content: 'Note content',
        category: 'general',
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      useGameStore.getState().addNote(note);
      expect(useGameStore.getState().notes).toContainEqual(note);
    });

    it('should update note', () => {
      const note: Note = {
        id: 'n1',
        title: 'Test Note',
        content: 'Note content',
        category: 'general',
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      useGameStore.getState().addNote(note);
      useGameStore.getState().updateNote('n1', { pinned: true });

      const updated = useGameStore.getState().notes.find(n => n.id === 'n1');
      expect(updated?.pinned).toBe(true);
    });

    it('should delete note', () => {
      const note: Note = {
        id: 'n1',
        title: 'Test Note',
        content: 'Note content',
        category: 'general',
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      useGameStore.getState().addNote(note);
      useGameStore.getState().deleteNote('n1');

      expect(useGameStore.getState().notes).not.toContainEqual(note);
    });
  });

  describe('affinity system', () => {
    it('should update affinity', () => {
      useGameStore.getState().updateAffinity('TestNPC', 10);
      expect(useGameStore.getState().affinities['TestNPC']).toBe(10);

      useGameStore.getState().updateAffinity('TestNPC', 5);
      expect(useGameStore.getState().affinities['TestNPC']).toBe(15);
    });

    it('should cap affinity at 100', () => {
      useGameStore.getState().updateAffinity('TestNPC', 150);
      expect(useGameStore.getState().affinities['TestNPC']).toBe(100);
    });

    it('should cap affinity at -100', () => {
      useGameStore.getState().updateAffinity('TestNPC', -150);
      expect(useGameStore.getState().affinities['TestNPC']).toBe(-100);
    });
  });

  describe('title system', () => {
    it('should add title', () => {
      useGameStore.getState().addTitle('Dragon Slayer');
      expect(useGameStore.getState().titles).toContain('Dragon Slayer');
    });

    it('should not add duplicate titles', () => {
      useGameStore.getState().addTitle('Dragon Slayer');
      useGameStore.getState().addTitle('Dragon Slayer');
      expect(useGameStore.getState().titles.filter(t => t === 'Dragon Slayer').length).toBe(1);
    });
  });

  describe('game time', () => {
    it('should set game time', () => {
      useGameStore.getState().setGameTime({ hour: 18, minute: 30, day: 5 });
      expect(useGameStore.getState().gameTime).toEqual({ hour: 18, minute: 30, day: 5 });
    });
  });

  describe('weather', () => {
    it('should set weather', () => {
      useGameStore.getState().setWeather('storm');
      expect(useGameStore.getState().weather).toBe('storm');
    });
  });

  describe('reset', () => {
    it('should reset all state', () => {
      useGameStore.getState().setProfile({ id: '1', name: 'Test' });
      useGameStore.getState().addTitle('Test Title');
      useGameStore.getState().setWeather('rain');

      useGameStore.getState().reset();

      expect(useGameStore.getState().profile).toBeNull();
      expect(useGameStore.getState().titles).toEqual([]);
      expect(useGameStore.getState().weather).toBe('clear');
    });
  });
});
