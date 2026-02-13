/**
 * DM Assistant Service - Claude Opus Integration
 * Remplace GPT-4o-mini pour une narration de qualité supérieure
 */

import Anthropic from '@anthropic-ai/sdk';
import type { Message } from '@anthropic-ai/sdk/resources/messages';

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
  stats?: {
    hp: number;
    atk: number;
    ac: number;
  };
}

export interface CombatParams {
  party: Array<{ class: string; level: number; name: string }>;
  location: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'deadly';
  narrative_context?: string;
}

export interface Encounter {
  enemies: Array<{
    name: string;
    hp: number;
    max_hp: number;
    atk: number;
    ac: number;
    id: string;
    cr: number;
    abilities?: string[];
  }>;
  terrain: {
    features: string[];
    ambient: string;
  };
  plot_twist?: string;
  loot: Array<{
    item: string;
    value?: number;
    use?: string;
    crafting?: string;
  }>;
}

export interface PlotTwistParams {
  context: string;
  recentEvents: string[];
  partyLevel: number;
}

// Configuration
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.warn('⚠️ VITE_ANTHROPIC_API_KEY non configurée - Utilisation du fallback GPT-4o-mini');
}

class DMAssistant {
  private client: Anthropic | null = null;
  private loreContext: string = '';

  constructor() {
    if (ANTHROPIC_API_KEY) {
      this.client = new Anthropic({
        apiKey: ANTHROPIC_API_KEY,
        dangerouslyAllowBrowser: true, // ⚠️ Pour développement uniquement
      });
    }
  }

  /**
   * Charge le contexte lore en mémoire
   */
  async loadLoreContext(lore: any): Promise<void> {
    try {
      this.loreContext = `
MONDE AETHELGARD - LORE COMPLET

## LOCATIONS (40 Birth Locations)
${JSON.stringify(lore.locations || {}, null, 2).slice(0, 15000)}

## CLASSES & COMPÉTENCES
${JSON.stringify(lore.classes || {}, null, 2).slice(0, 5000)}

## BESTIAIRE
${JSON.stringify(lore.bestiary || {}, null, 2).slice(0, 10000)}

## FACTIONS
${JSON.stringify(lore.factions || {}, null, 2).slice(0, 5000)}

## RÈGLES D100
- Stats: ×2 (max 20)
- Skills: ×2.5 (max 100)
- Critique: 95-100 (succès), 1-5 (échec)
- Combat: d100 vs AC/DC
      `.trim();
    } catch (err) {
      console.error('Erreur chargement lore:', err);
    }
  }

  /**
   * Génère un NPC contextuel
   */
  async generateNPC(params: NPCParams): Promise<NPC> {
    if (!this.client) {
      throw new Error('Claude API non initialisée - Vérifiez VITE_ANTHROPIC_API_KEY');
    }

    const prompt = `
Tu es un expert Game Master pour le système JDR d100 Aethelgard (High Fantasy épique).

**CONTEXTE LORE** :
${this.loreContext.slice(0, 20000)}

**TÂCHE** : Génère un PNJ pour la location "${params.location}" avec le rôle "${params.role}".

**CONTRAINTES** :
- Cohérent avec le lore Aethelgard (40 birth locations, factions établies)
- Personnalité distincte (pas de cliché fade)
- 2 secrets minimum (1 personnel, 1 lié à une faction/quête)
- 3 exemples de dialogues (ton, accent, vocabulaire spécifique)
- 2 quest hooks concrets (pas vagues)
- Niveau ${params.level || 1} (stats si combattant : HP = niveau×5, ATK = niveau×2.5, AC = 10+niveau)

**FORMAT JSON STRICT** (pas de markdown, juste le JSON) :
{
  "name": "Nom Prénom",
  "age": 35,
  "appearance": "Description physique 2 phrases (cicatrices, vêtements, posture)",
  "backstory": "Paragraphe 100-150 mots (origine, motivation, secret majeur implicite)",
  "secrets": [
    "Secret personnel exploitable MJ",
    "Secret lié faction/complot"
  ],
  "dialogue_samples": [
    "« Phrase typique accent local »",
    "« Réaction stress/menace »",
    "« Indice subtil secret »"
  ],
  "quest_hooks": [
    "Hook 1: Objectif concret + récompense",
    "Hook 2: Dilemme moral + conséquence"
  ],
  "stats": {
    "hp": 25,
    "atk": 6,
    "ac": 13
  }
}
    `.trim();

    try {
      const message = await this.client.messages.create({
        model: 'claude-opus-4-20250514',
        max_tokens: 2000,
        temperature: 0.8,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = message.content[0];
      if (content.type !== 'text') {
        throw new Error('Réponse Claude invalide');
      }

      // Extraire JSON (parfois Claude entoure de ```json```)
      let jsonStr = content.text.trim();
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```\n?/g, '').replace(/```\n?$/g, '');
      }

      const npc = JSON.parse(jsonStr);
      console.log('✅ NPC généré:', npc.name);
      return npc;
    } catch (err: any) {
      console.error('❌ Erreur génération NPC:', err);
      throw new Error(`Échec génération NPC: ${err.message}`);
    }
  }

  /**
   * Génère un combat improvisé contextuel
   */
  async improveCombat(params: CombatParams): Promise<Encounter> {
    if (!this.client) {
      throw new Error('Claude API non initialisée');
    }

    const avgLevel = Math.round(
      params.party.reduce((sum, p) => sum + p.level, 0) / params.party.length
    );

    const difficultyMultipliers = {
      easy: 0.5,
      medium: 1.0,
      hard: 1.5,
      deadly: 2.0,
    };

    const multiplier = difficultyMultipliers[params.difficulty];

    const prompt = `
Tu es Game Master expert système d100 Aethelgard.

**GROUPE** :
${params.party.map((p) => `- ${p.name} (${p.class} Niv.${p.level})`).join('\n')}
Niveau moyen: ${avgLevel}

**LOCATION** : ${params.location}
**DIFFICULTÉ** : ${params.difficulty}
**CONTEXTE** : ${params.narrative_context || 'Combat standard'}

**LORE BESTIAIRE** :
${this.loreContext.slice(15000, 25000)}

**TÂCHE** : Crée une rencontre de combat équilibrée d100.

**FORMULE ÉQUILIBRAGE** :
- HP ennemi = (avgLevel × 5) × ${multiplier}
- ATK ennemi = (avgLevel × 2.5) × ${multiplier}
- AC ennemi = 10 + avgLevel + Math.floor(${multiplier})
- Nombre ennemis : ${params.difficulty === 'easy' ? '1-2' : params.difficulty === 'medium' ? '2-3' : params.difficulty === 'hard' ? '3-4' : '4-6'}

**TERRAIN** : 3-5 éléments tactiques (cover, hazard, avantage)

**PLOT TWIST** : 30% chance (si contexte narratif riche)

**FORMAT JSON STRICT** :
{
  "enemies": [
    {
      "name": "Nom Créature",
      "hp": 50,
      "max_hp": 50,
      "atk": 12,
      "ac": 15,
      "id": "e1",
      "cr": 3,
      "abilities": ["Capacité spéciale 1", "Capacité 2"]
    }
  ],
  "terrain": {
    "features": ["Élément 1 (mécanique)", "Élément 2", "Élément 3"],
    "ambient": "Description ambiance 1 phrase (lumière, sons, odeurs)"
  },
  "plot_twist": "Twist narratif optionnel ou null",
  "loot": [
    { "item": "Objet 1", "value": 100, "use": "Usage pratique" },
    { "item": "Objet 2", "crafting": "Craft composant X" }
  ]
}
    `.trim();

    try {
      const message = await this.client.messages.create({
        model: 'claude-opus-4-20250514',
        max_tokens: 1500,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = message.content[0];
      if (content.type !== 'text') throw new Error('Réponse invalide');

      let jsonStr = content.text.trim();
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```\n?/g, '').replace(/```\n?$/g, '');
      }

      const encounter = JSON.parse(jsonStr);
      console.log('✅ Combat généré:', encounter.enemies.length, 'ennemis');
      return encounter;
    } catch (err: any) {
      console.error('❌ Erreur génération combat:', err);
      throw new Error(`Échec génération combat: ${err.message}`);
    }
  }

  /**
   * Suggère un plot twist dramatique
   */
  async suggestPlotTwist(params: PlotTwistParams): Promise<string> {
    if (!this.client) {
      throw new Error('Claude API non initialisée');
    }

    const prompt = `
Tu es Game Master créatif système d100 Aethelgard.

**CONTEXTE ACTUEL** :
${params.context}

**ÉVÉNEMENTS RÉCENTS** :
${params.recentEvents.join('\n')}

**NIVEAU GROUPE** : ${params.partyLevel}

**LORE FACTIONS** :
${this.loreContext.slice(25000, 30000)}

**TÂCHE** : Suggère 1 PLOT TWIST impactant qui :
- Révèle un secret caché
- Change la perception d'un PNJ/faction
- Crée un dilemme moral difficile
- Connecte à un élément lore Aethelgard

**FORMAT** : 2-3 phrases concises, pas de markdown.

EXEMPLE : "Le marchand que vous venez de sauver retire discrètement son déguisement—c'est en réalité l'assassin recherché par la Guilde. Il vous supplie : « Ils ont enlevé ma fille... J'ai dû obéir. » Que faites-vous ?"
    `.trim();

    try {
      const message = await this.client.messages.create({
        model: 'claude-opus-4-20250514',
        max_tokens: 300,
        temperature: 0.9,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = message.content[0];
      if (content.type !== 'text') throw new Error('Réponse invalide');

      const twist = content.text.trim();
      console.log('✅ Plot twist généré');
      return twist;
    } catch (err: any) {
      console.error('❌ Erreur génération plot twist:', err);
      throw new Error(`Échec génération twist: ${err.message}`);
    }
  }

  /**
   * Vérifie si l'API est disponible
   */
  isAvailable(): boolean {
    return this.client !== null;
  }
}

// Instance singleton
export const dmAssistant = new DMAssistant();
