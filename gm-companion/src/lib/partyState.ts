export interface PlayerCharacter {
  id: string;
  name: string;
  race: string;
  className: string;
  level: number;
  hp: number;
  maxHp: number;
  ac: number;
  passivePerception: number;
  initiativeBonus: number;
}

const STORAGE_KEY = 'aethelgard_party_state';

export function getParty(): PlayerCharacter[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as PlayerCharacter[];
  } catch {
    return [];
  }
}

export function saveParty(party: PlayerCharacter[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(party));
}

export function addCharacter(character: Omit<PlayerCharacter, 'id'>): PlayerCharacter {
  const party = getParty();
  const newChar: PlayerCharacter = {
    ...character,
    id: `pc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  };
  party.push(newChar);
  saveParty(party);
  return newChar;
}

export function updateCharacter(id: string, updates: Partial<PlayerCharacter>): void {
  const party = getParty();
  const index = party.findIndex(c => c.id === id);
  if (index !== -1) {
    party[index] = { ...party[index], ...updates };
    saveParty(party);
  }
}

export function deleteCharacter(id: string): void {
  const party = getParty();
  const filtered = party.filter(c => c.id !== id);
  saveParty(filtered);
}
