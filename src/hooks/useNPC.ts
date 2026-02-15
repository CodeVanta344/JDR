import { useCallback, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { NPC_TEMPLATES } from '../lore/npcs';
import type { NPC, Merchant, Message } from '../types';

interface UseNPCOptions {
  onAffinityChange?: (npcName: string, newAffinity: number) => void;
  onTitleUnlock?: (title: string) => void;
}

export const useNPC = ({ onAffinityChange, onTitleUnlock }: UseNPCOptions = {}) => {
  const {
    activeNPC,
    setActiveNPC,
    activeMerchant,
    setActiveMerchant,
    npcConversations,
    addNpcMessage,
    affinities,
    updateAffinity,
    addTitle,
  } = useGameStore();

  const [isLoading, setIsLoading] = useState(false);

  const findNPCByName = useCallback((name: string): any => {
    for (const category of Object.values(NPC_TEMPLATES)) {
      const found = (category as any[]).find((npc: any) => 
        npc.name.toLowerCase() === name.toLowerCase()
      );
      if (found) return found;
    }
    return null;
  }, []);

  const getRandomNPCByRole = useCallback((role: string): any => {
    const roleMap: Record<string, keyof typeof NPC_TEMPLATES> = {
      merchant: 'merchants',
      tavern: 'merchants',
      quest: 'questgivers',
      guard: 'enemies',
      outcast: 'enemies',
    };

    const category = roleMap[role.toLowerCase()];
    if (!category || !NPC_TEMPLATES[category]) return null;

    const npcs = NPC_TEMPLATES[category];
    let npcArray: any[] = [];
    
    if (Array.isArray(npcs)) {
      npcArray = npcs;
    } else if (npcs && typeof npcs === 'object' && 'general' in npcs) {
      npcArray = (npcs as any).general || [];
    }
    
    return npcArray.length > 0 ? npcArray[Math.floor(Math.random() * npcArray.length)] : null;
  }, []);

  const openNPCDialog = useCallback((npc: NPC | string) => {
    const npcData = typeof npc === 'string' ? findNPCByName(npc) : npc;
    if (!npcData) return;

    setActiveNPC(npcData);
    
    if (!npcConversations[npcData.name]) {
      const greeting = npcData.greeting || `Bonjour, voyageur.`;
      addNpcMessage(npcData.name, {
        id: `${Date.now()}`,
        session_id: '',
        role: 'npc',
        content: greeting,
        created_at: new Date().toISOString(),
      });
    }
  }, [findNPCByName, setActiveNPC, npcConversations, addNpcMessage]);

  const closeNPCDialog = useCallback(() => {
    setActiveNPC(null);
  }, [setActiveNPC]);

  const openMerchant = useCallback((merchant: Merchant | string) => {
    const merchantData = typeof merchant === 'string' 
      ? findNPCByName(merchant) as Merchant 
      : merchant;
    if (!merchantData) return;

    setActiveMerchant(merchantData);
    openNPCDialog(merchantData);
  }, [findNPCByName, setActiveMerchant, openNPCDialog]);

  const closeMerchant = useCallback(() => {
    setActiveMerchant(null);
    closeNPCDialog();
  }, [setActiveMerchant, closeNPCDialog]);

  const getAffinity = useCallback((npcName: string): number => {
    return affinities[npcName] || 0;
  }, [affinities]);

  const changeAffinity = useCallback((npcName: string, amount: number) => {
    updateAffinity(npcName, amount);
    const newAffinity = (affinities[npcName] || 0) + amount;
    onAffinityChange?.(npcName, Math.max(-100, Math.min(100, newAffinity)));
  }, [affinities, updateAffinity, onAffinityChange]);

  const getAffinityLevel = useCallback((npcName: string): string => {
    const affinity = getAffinity(npcName);
    if (affinity >= 75) return 'Allié';
    if (affinity >= 50) return 'Ami';
    if (affinity >= 25) return 'Sympathique';
    if (affinity >= -25) return 'Neutre';
    if (affinity >= -50) return 'Méfiant';
    if (affinity >= -75) return 'Hostile';
    return 'Ennemi';
  }, [getAffinity]);

  const unlockTitle = useCallback((title: string) => {
    addTitle(title);
    onTitleUnlock?.(title);
  }, [addTitle, onTitleUnlock]);

  const getNPCConversation = useCallback((npcName: string): Message[] => {
    return npcConversations[npcName] || [];
  }, [npcConversations]);

  const addMessageToConversation = useCallback((npcName: string, content: string, role: 'user' | 'npc' = 'user') => {
    addNpcMessage(npcName, {
      id: `${Date.now()}_${Math.random()}`,
      session_id: '',
      role: role === 'npc' ? 'npc' : 'user',
      content,
      created_at: new Date().toISOString(),
    });
  }, [addNpcMessage]);

  const getAvailableQuests = useCallback((npcName: string): any[] => {
    const npc = findNPCByName(npcName);
    if (!npc || !npc.quests) return [];
    return npc.quests;
  }, [findNPCByName]);

  const getRumors = useCallback((npcName: string): string[] => {
    const npc = findNPCByName(npcName);
    if (!npc || !npc.rumors) return [];
    return npc.rumors;
  }, [findNPCByName]);

  return {
    activeNPC,
    activeMerchant,
    isLoading,
    findNPCByName,
    getRandomNPCByRole,
    openNPCDialog,
    closeNPCDialog,
    openMerchant,
    closeMerchant,
    getAffinity,
    changeAffinity,
    getAffinityLevel,
    unlockTitle,
    getNPCConversation,
    addMessageToConversation,
    getAvailableQuests,
    getRumors,
  };
};
