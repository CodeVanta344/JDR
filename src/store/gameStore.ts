import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { 
  Character, Session, Message, GameTime, Weather, 
  CombatState, NPC, Merchant, Loot, Quest, Note, 
  Transaction, Challenge, Profile, WorldEvent 
} from '../types';

// === GAME STORE ===
interface GameState {
  // Core
  profile: Profile | null;
  session: Session | null;
  character: Character | null;
  players: Character[];
  messages: Message[];
  
  // World State
  gameTime: GameTime;
  weather: Weather;
  chronicle: WorldEvent[];
  
  // Connection
  onlineUsers: string[];
  connStatus: 'connecting' | 'connected' | 'polling' | 'offline';
  realTimeSync: boolean;
  
  // UI State
  loading: boolean;
  gamePhase: 'INTRO' | 'EXPLORATION' | 'DRAMA';
  adventureStarted: boolean;
  
  // Combat
  combatMode: boolean;
  combatEnemies: any[];
  syncedCombatState: CombatState | null;
  pendingCombat: any;
  
  // Modals & Interactions
  activeNPC: NPC | null;
  activeMerchant: Merchant | null;
  activeLoot: Loot | null;
  activeChallenge: Challenge | null;
  pendingTransaction: Transaction | null;
  showLevelUp: boolean;
  showSettings: boolean;
  showHelper: boolean;
  
  // NPC & Helper
  npcConversations: Record<string, Message[]>;
  helperMessages: Message[];
  affinities: Record<string, number>;
  titles: string[];
  
  // Media
  sceneImage: string | null;
  audioEnabled: boolean;
  audioVolume: number;
  lastSFX: { type: string; t: number } | null;
  activeVFX: { type: string; x: number; y: number; color: string; t: number } | null;
  tension: number;
  
  // Typing
  typingUsers: string[];
  
  // Quests
  quests: Quest[];
  
  // Notes
  notes: Note[];
  
  // Actions
  setProfile: (profile: Profile | null) => void;
  setSession: (session: Session | null) => void;
  setCharacter: (character: Character | null) => void;
  setPlayers: (players: Character[]) => void;
  updatePlayer: (playerId: string, updates: Partial<Character>) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setGameTime: (time: GameTime) => void;
  setWeather: (weather: Weather) => void;
  addToChronicle: (event: WorldEvent) => void;
  setChronicle: (chronicle: WorldEvent[]) => void;
  setOnlineUsers: (users: string[]) => void;
  setConnStatus: (status: 'connecting' | 'connected' | 'polling' | 'offline') => void;
  setRealTimeSync: (sync: boolean) => void;
  setLoading: (loading: boolean) => void;
  setGamePhase: (phase: 'INTRO' | 'EXPLORATION' | 'DRAMA') => void;
  setAdventureStarted: (started: boolean) => void;
  setCombatMode: (mode: boolean) => void;
  setCombatEnemies: (enemies: any[]) => void;
  setSyncedCombatState: (state: CombatState | null) => void;
  setPendingCombat: (combat: any) => void;
  setActiveNPC: (npc: NPC | null) => void;
  setActiveMerchant: (merchant: Merchant | null) => void;
  setActiveLoot: (loot: Loot | null) => void;
  setActiveChallenge: (challenge: Challenge | null) => void;
  setPendingTransaction: (transaction: Transaction | null) => void;
  setShowLevelUp: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;
  setShowHelper: (show: boolean) => void;
  setNpcConversations: (conversations: Record<string, Message[]>) => void;
  addNpcMessage: (npcName: string, message: Message) => void;
  setHelperMessages: (messages: Message[]) => void;
  addHelperMessage: (message: Message) => void;
  setAffinities: (affinities: Record<string, number>) => void;
  updateAffinity: (npcName: string, change: number) => void;
  setTitles: (titles: string[]) => void;
  addTitle: (title: string) => void;
  setSceneImage: (url: string | null) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setAudioVolume: (volume: number) => void;
  setLastSFX: (sfx: { type: string; t: number } | null) => void;
  setActiveVFX: (vfx: { type: string; x: number; y: number; color: string; t: number } | null) => void;
  setTension: (tension: number) => void;
  setTypingUsers: (users: string[]) => void;
  setQuests: (quests: Quest[]) => void;
  addQuest: (quest: Quest) => void;
  updateQuest: (questId: string, updates: Partial<Quest>) => void;
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNote: (noteId: string, updates: Partial<Note>) => void;
  deleteNote: (noteId: string) => void;
  reset: () => void;
}

const initialState = {
  profile: null,
  session: null,
  character: null,
  players: [],
  messages: [],
  gameTime: { hour: 12, minute: 0, day: 1 },
  weather: 'clear' as Weather,
  chronicle: [],
  onlineUsers: [],
  connStatus: 'connecting' as const,
  realTimeSync: false,
  loading: false,
  gamePhase: 'INTRO' as const,
  adventureStarted: false,
  combatMode: false,
  combatEnemies: [],
  syncedCombatState: null,
  pendingCombat: null,
  activeNPC: null,
  activeMerchant: null,
  activeLoot: null,
  activeChallenge: null,
  pendingTransaction: null,
  showLevelUp: false,
  showSettings: false,
  showHelper: false,
  npcConversations: {},
  helperMessages: [],
  affinities: {},
  titles: [],
  sceneImage: null,
  audioEnabled: false,
  audioVolume: 0.5,
  lastSFX: null,
  activeVFX: null,
  tension: 0,
  typingUsers: [],
  quests: [],
  notes: [],
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setProfile: (profile) => set({ profile }),
      setSession: (session) => set({ session }),
      setCharacter: (character) => set({ character }),
      setPlayers: (players) => set({ players }),
      updatePlayer: (playerId, updates) => set((state) => ({
        players: state.players.map(p => p.id === playerId ? { ...p, ...updates } : p),
        character: state.character?.id === playerId ? { ...state.character, ...updates } : state.character,
      })),
      addMessage: (message) => set((state) => ({
        messages: state.messages.some(m => m.id === message.id) 
          ? state.messages 
          : [...state.messages, message]
      })),
      setMessages: (messages) => set({ messages }),
      setGameTime: (gameTime) => set({ gameTime }),
      setWeather: (weather) => set({ weather }),
      addToChronicle: (event) => set((state) => ({
        chronicle: [...state.chronicle, event]
      })),
      setChronicle: (chronicle) => set({ chronicle }),
      setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
      setConnStatus: (connStatus) => set({ connStatus }),
      setRealTimeSync: (realTimeSync) => set({ realTimeSync }),
      setLoading: (loading) => set({ loading }),
      setGamePhase: (gamePhase) => set({ gamePhase }),
      setAdventureStarted: (adventureStarted) => set({ adventureStarted }),
      setCombatMode: (combatMode) => set({ combatMode }),
      setCombatEnemies: (combatEnemies) => set({ combatEnemies }),
      setSyncedCombatState: (syncedCombatState) => set({ syncedCombatState }),
      setPendingCombat: (pendingCombat) => set({ pendingCombat }),
      setActiveNPC: (activeNPC) => set({ activeNPC }),
      setActiveMerchant: (activeMerchant) => set({ activeMerchant }),
      setActiveLoot: (activeLoot) => set({ activeLoot }),
      setActiveChallenge: (activeChallenge) => set({ activeChallenge }),
      setPendingTransaction: (pendingTransaction) => set({ pendingTransaction }),
      setShowLevelUp: (showLevelUp) => set({ showLevelUp }),
      setShowSettings: (showSettings) => set({ showSettings }),
      setShowHelper: (showHelper) => set({ showHelper }),
      setNpcConversations: (npcConversations) => set({ npcConversations }),
      addNpcMessage: (npcName, message) => set((state) => ({
        npcConversations: {
          ...state.npcConversations,
          [npcName]: [...(state.npcConversations[npcName] || []), message]
        }
      })),
      setHelperMessages: (helperMessages) => set({ helperMessages }),
      addHelperMessage: (message) => set((state) => ({
        helperMessages: [...state.helperMessages, message]
      })),
      setAffinities: (affinities) => set({ affinities }),
      updateAffinity: (npcName, change) => set((state) => ({
        affinities: {
          ...state.affinities,
          [npcName]: Math.max(-100, Math.min(100, (state.affinities[npcName] || 0) + change))
        }
      })),
      setTitles: (titles) => set({ titles }),
      addTitle: (title) => set((state) => ({
        titles: state.titles.includes(title) ? state.titles : [...state.titles, title]
      })),
      setSceneImage: (sceneImage) => set({ sceneImage }),
      setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
      setAudioVolume: (audioVolume) => set({ audioVolume }),
      setLastSFX: (lastSFX) => set({ lastSFX }),
      setActiveVFX: (activeVFX) => set({ activeVFX }),
      setTension: (tension) => set({ tension }),
      setTypingUsers: (typingUsers) => set({ typingUsers }),
      setQuests: (quests) => set({ quests }),
      addQuest: (quest) => set((state) => ({
        quests: [...state.quests, quest]
      })),
      updateQuest: (questId, updates) => set((state) => ({
        quests: state.quests.map(q => q.id === questId ? { ...q, ...updates } : q)
      })),
      setNotes: (notes) => set({ notes }),
      addNote: (note) => set((state) => ({
        notes: [...state.notes, note]
      })),
      updateNote: (noteId, updates) => set((state) => ({
        notes: state.notes.map(n => n.id === noteId ? { ...n, ...updates } : n)
      })),
      deleteNote: (noteId) => set((state) => ({
        notes: state.notes.filter(n => n.id !== noteId)
      })),
      reset: () => set(initialState),
    }),
    {
      name: 'jdr-game-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
        audioEnabled: state.audioEnabled,
        audioVolume: state.audioVolume,
        notes: state.notes,
      }),
    }
  )
);
