// ============================================================
// LIFEPATH - CALCUL CUMULATIF & API
// ============================================================

import type {
  LifepathSelection,
  AccumulatedEffects,
  LifeChoice,
  StatKey,
  MechanicalTrait,
  ReputationEffect,
  ItemGrant,
  SkillBonus
} from '../../../types/lore';

// ===== FONCTION CALCUL CUMULATIF =====
export function accumulateEffects(selection: LifepathSelection): AccumulatedEffects {
  // Collecter TOUS les choix (4 phases simplifiées)
  const allChoices: LifeChoice[] = [];

  // Phase 1 - Naissance
  if (selection.birth) allChoices.push(selection.birth);

  // Phase 2 - Enfance
  if (selection.childhood) allChoices.push(selection.childhood);

  // Phase 3 - Adolescence
  if (selection.adolescence) allChoices.push(selection.adolescence);

  // Phase 4 - Jeune Adulte
  if (selection.youngAdult) allChoices.push(selection.youngAdult);

  // Initialiser résultat
  const final_stats: Record<StatKey, number> = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    perception: 0,
    willpower: 0
  };

  const all_traits: MechanicalTrait[] = [];
  const reputation_map = new Map<string, number>();
  const items: ItemGrant[] = [];
  const skills: SkillBonus[] = [];
  const languages = new Set<string>();
  const tags = new Set<string>();

  // Agréger tous les effets
  for (const choice of allChoices) {
    const effects = choice.effects;

    // Stats (bonus)
    for (const [stat, value] of Object.entries(effects.stats)) {
      if (value) {
        final_stats[stat as StatKey] = (final_stats[stat as StatKey] || 0) + value;
      }
    }

    // Stats (malus)
    if (effects.stats_penalty) {
      for (const [stat, value] of Object.entries(effects.stats_penalty)) {
        if (value) {
          final_stats[stat as StatKey] = (final_stats[stat as StatKey] || 0) - value;
        }
      }
    }

    // Traits mécaniques
    all_traits.push(...effects.mechanical_traits);

    // Réputation
    for (const rep of effects.reputation) {
      const current = reputation_map.get(rep.factionId) || 0;
      reputation_map.set(rep.factionId, current + rep.delta);
    }

    // Items
    items.push(...effects.items);

    // Skills
    skills.push(...effects.skills);

    // Languages
    if (effects.languages) {
      effects.languages.forEach(lang => languages.add(lang));
    }

    // Tags
    choice.tags.forEach(tag => tags.add(tag));
  }

  // Générer résumé narratif
  const narrative_summary = generateNarrativeSummary(allChoices);

  return {
    final_stats,
    all_traits,
    reputation_map,
    items,
    skills,
    languages: Array.from(languages),
    narrative_summary,
    tags: Array.from(tags),

    // Choix principaux pour UI (simplifié)
    origin: selection.birth,
    childhood: selection.childhood,
    adolescence: selection.adolescence,
    adult: selection.youngAdult
  };
}

// ===== GÉNÉRATION RÉSUMÉ NARRATIF =====
function generateNarrativeSummary(choices: LifeChoice[]): string {
  const sections: string[] = [];

  // Grouper par stage
  const byStage: Record<string, LifeChoice[]> = {
    birth: [],
    childhood: [],
    adolescence: [],
    youngAdult: []
  };

  for (const choice of choices) {
    byStage[choice.stage].push(choice);
  }

  // Naissance
  if (byStage.birth.length > 0) {
    const labels = byStage.birth.map(c => c.label).join(', ');
    sections.push(`**Naissance :** ${labels}`);

    const moments = byStage.birth
      .filter(c => c.detailed_lore.defining_moment)
      .map(c => c.detailed_lore.defining_moment)
      .join(' ');
    if (moments) sections.push(moments);
  }

  // Enfance
  if (byStage.childhood.length > 0) {
    const labels = byStage.childhood.map(c => c.label).join(', ');
    sections.push(`\n**Enfance :** ${labels}`);

    const worldviews = byStage.childhood
      .filter(c => c.detailed_lore.worldview_shaped)
      .map(c => c.detailed_lore.worldview_shaped)
      .join(' ');
    if (worldviews) sections.push(worldviews);
  }

  // Adolescence
  if (byStage.adolescence.length > 0) {
    const labels = byStage.adolescence.map(c => c.label).join(', ');
    sections.push(`\n**Adolescence :** ${labels}`);
  }

  // Jeune adulte
  if (byStage.youngAdult.length > 0) {
    const labels = byStage.youngAdult.map(c => c.label).join(', ');
    sections.push(`\n**Jeune Adulte :** ${labels}`);
  }

  return sections.join('\n');
}

// ===== HELPER : VÉRIFIER SÉLECTION COMPLÈTE (SIMPLIFIÉ - 4 phases) =====
export function isLifepathComplete(selection: Partial<LifepathSelection>): selection is LifepathSelection {
  return !!(
    selection.birth &&
    selection.childhood &&
    selection.adolescence &&
    selection.youngAdult
  );
}

// ===== EXPORTS GETTERS (à implémenter dans sous-modules) =====
// Ces fonctions seront implémentées dans birth/, childhood/, etc.
export async function getAllBirthLocations() {
  const module = await import('./birth/locations');
  return module.BIRTH_LOCATIONS || [];
}

export async function getAllSocialStatuses() {
  const module = await import('./birth/social-status');
  return module.SOCIAL_STATUSES || [];
}

export async function getAllOmens() {
  const module = await import('./birth/omens');
  return module.OMENS || [];
}

export async function getAllFamilies() {
  const module = await import('./childhood/families');
  return module.FAMILIES || [];
}

export async function getAllEducations() {
  const module = await import('./childhood/education');
  return module.EDUCATIONS || [];
}

export async function getAllTraumas() {
  const module = await import('./childhood/traumas');
  return module.TRAUMAS || [];
}

export async function getAllTrainings() {
  const module = await import('./adolescence/training');
  return module.TRAININGS || [];
}

export async function getAllExploits() {
  const module = await import('./adolescence/exploits');
  return module.EXPLOITS || [];
}

export async function getAllEncounters() {
  const module = await import('./adolescence/encounters');
  return module.ENCOUNTERS || [];
}

export async function getAllProfessions() {
  const module = await import('./young-adult/professions');
  return module.PROFESSIONS || [];
}

export async function getAllMotivations() {
  const module = await import('./young-adult/motivations');
  return module.MOTIVATIONS || [];
}

export async function getAllConnections() {
  const module = await import('./young-adult/connections');
  return module.CONNECTIONS || [];
}

// ===== PRÉCHARGEMENT INTELLIGENT =====
let nextStageCache: Promise<any> | null = null;

export function preloadNextStage(currentStage: string) {
  if (currentStage === 'birth') {
    nextStageCache = Promise.all([
      import('./childhood/families'),
      import('./childhood/education'),
      import('./childhood/traumas')
    ]);
  } else if (currentStage === 'childhood') {
    nextStageCache = Promise.all([
      import('./adolescence/training'),
      import('./adolescence/exploits'),
      import('./adolescence/encounters')
    ]);
  } else if (currentStage === 'adolescence') {
    nextStageCache = Promise.all([
      import('./young-adult/professions'),
      import('./young-adult/motivations'),
      import('./young-adult/connections')
    ]);
  }
}
