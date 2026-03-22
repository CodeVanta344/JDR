/**
 * DM Assistant Service — Claude Code CLI via Supabase Broker
 *
 * Architecture sécurisée :
 * 1. Le client envoie une requête dans la table ai_requests (Supabase)
 * 2. Le serveur local du MJ (gm-server/) écoute et traite via Claude Code CLI
 * 3. La réponse est écrite dans ai_requests, le client la reçoit via Realtime
 *
 * → Aucune clé API exposée, tout passe par le forfait Claude Code du MJ
 */

import { createClient } from '@supabase/supabase-js';

// Types
export interface NPCParams {
  location: string;
  role: string;
  plotHook?: string;
  personality?: string;
  level?: number;
}

export interface NPC {
  name: string;
  age: number;
  appearance: string;
  backstory: string;
  secrets: string[];
  dialogue_samples: string[];
  quest_hooks: string[];
  stats?: { hp: number; atk: number; ac: number };
}

export interface CombatParams {
  party: Array<{ class: string; level: number; name: string }>;
  location: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'deadly';
  narrative_context?: string;
}

export interface Encounter {
  enemies: Array<{
    name: string; hp: number; max_hp: number; atk: number;
    ac: number; id: string; cr: number; abilities?: string[];
  }>;
  terrain: { features: string[]; ambient: string };
  plot_twist?: string;
  loot: Array<{ item: string; value?: number; use?: string; crafting?: string }>;
}

export interface PlotTwistParams {
  context: string;
  recentEvents: string[];
  partyLevel: number;
}

// ============================================================================
// SERVICE — envoie les requêtes via Supabase, le GM Server répond via Claude CLI
// ============================================================================

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';
const REQUEST_TIMEOUT = 60000; // 60s max pour une réponse

class DMAssistant {
  private supabase: ReturnType<typeof createClient> | null = null;
  private loreContext: string = '';
  private available: boolean = false;

  constructor() {
    if (SUPABASE_URL && SUPABASE_KEY) {
      this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      this.available = true;
      console.log('🤖 DM Assistant connecté — Claude Code CLI via GM Server');
    } else {
      console.warn('⚠️ DM Assistant désactivé — Supabase non configuré');
    }
  }

  /**
   * Envoie une requête AI et attend la réponse via Realtime
   */
  private async sendRequest(type: string, payload: any): Promise<any> {
    if (!this.supabase) throw new Error('DM Assistant non disponible');

    // 1. Insérer la requête
    const { data: request, error: insertError } = await this.supabase
      .from('ai_requests')
      .insert({
        request_type: type,
        request_payload: payload,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError || !request) {
      throw new Error(`Erreur envoi requête: ${insertError?.message || 'unknown'}`);
    }

    const requestId = request.id;

    // 2. Attendre la réponse via polling (+ realtime en bonus)
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      let resolved = false;

      // Subscribe to realtime changes for this specific request
      const channel = this.supabase!
        .channel(`ai-response-${requestId}`)
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'ai_requests',
          filter: `id=eq.${requestId}`,
        }, (payload: any) => {
          if (resolved) return;
          const { status, response_payload, error_message } = payload.new;
          if (status === 'completed' && response_payload) {
            resolved = true;
            channel.unsubscribe();
            resolve(response_payload);
          } else if (status === 'error') {
            resolved = true;
            channel.unsubscribe();
            reject(new Error(error_message || 'AI request failed'));
          }
        })
        .subscribe();

      // Fallback polling (au cas où Realtime ne marche pas)
      const pollInterval = setInterval(async () => {
        if (resolved) { clearInterval(pollInterval); return; }

        // Timeout check
        if (Date.now() - startTime > REQUEST_TIMEOUT) {
          resolved = true;
          clearInterval(pollInterval);
          channel.unsubscribe();
          reject(new Error('Timeout: le GM Server ne répond pas. Vérifiez qu\'il est lancé (cd gm-server && npm start)'));
          return;
        }

        const { data } = await this.supabase!
          .from('ai_requests')
          .select('status, response_payload, error_message')
          .eq('id', requestId)
          .single();

        if (!data || resolved) return;

        if (data.status === 'completed' && data.response_payload) {
          resolved = true;
          clearInterval(pollInterval);
          channel.unsubscribe();
          resolve(data.response_payload);
        } else if (data.status === 'error') {
          resolved = true;
          clearInterval(pollInterval);
          channel.unsubscribe();
          reject(new Error(data.error_message || 'AI request failed'));
        }
      }, 2000);
    });
  }

  async loadLoreContext(lore: any): Promise<void> {
    try {
      this.loreContext = JSON.stringify({
        locations: lore.locations,
        classes: lore.classes,
        factions: lore.factions,
      }).slice(0, 10000);
    } catch (err) {
      console.error('Erreur chargement lore:', err);
    }
  }

  async generateNPC(params: NPCParams): Promise<NPC> {
    const result = await this.sendRequest('npc-gen', {
      message: `Génère un PNJ pour "${params.location}", rôle "${params.role}", niveau ${params.level || 1}. Lore: ${this.loreContext.slice(0, 5000)}`,
      ...params,
    });
    console.log('✅ NPC généré:', result.name);
    return result;
  }

  async improveCombat(params: CombatParams): Promise<Encounter> {
    const result = await this.sendRequest('combat-gen', {
      message: `Crée un combat ${params.difficulty} à ${params.location} pour: ${params.party.map(p => `${p.name} (${p.class} Niv.${p.level})`).join(', ')}. Contexte: ${params.narrative_context || 'standard'}`,
      ...params,
    });
    console.log('✅ Combat généré:', result.enemies?.length, 'ennemis');
    return result;
  }

  async suggestPlotTwist(params: PlotTwistParams): Promise<string> {
    const result = await this.sendRequest('plot-twist', {
      message: `Contexte: ${params.context}. Événements: ${params.recentEvents.join(', ')}. Niveau: ${params.partyLevel}`,
      ...params,
    });
    return result.narrative || result;
  }

  async chat(userMessage: string): Promise<string> {
    const result = await this.sendRequest('chat', {
      message: userMessage,
      loreContext: this.loreContext.slice(0, 5000),
    });
    return result.narrative || (typeof result === 'string' ? result : JSON.stringify(result));
  }

  /**
   * Envoie une action joueur au Game Master AI
   */
  async processPlayerAction(sessionId: string, playerId: string, action: string, history: any[] = [], lore: any = {}): Promise<any> {
    const result = await this.sendRequest('game-master', {
      message: action,
      sessionId,
      playerId,
      history: history.slice(-10), // Derniers 10 messages
      lore: typeof lore === 'string' ? lore : JSON.stringify(lore).slice(0, 8000),
    });
    return result;
  }

  isAvailable(): boolean {
    return this.available;
  }
}

export const dmAssistant = new DMAssistant();
