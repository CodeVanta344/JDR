// ============================================================
// API CENTRALISÉE - CHARACTER CREATION
// Point d'entrée unique pour tous les composants UI
// ============================================================

// ===== LIFEPATH =====
export {
  accumulateEffects,
  isLifepathComplete,
  getAllBirthLocations,
  getAllSocialStatuses,
  getAllOmens,
  getAllFamilies,
  getAllEducations,
  getAllTraumas,
  getAllTrainings,
  getAllExploits,
  getAllEncounters,
  getAllProfessions,
  getAllMotivations,
  getAllConnections,
  preloadNextStage
} from './lifepath/index';

// ===== CLASSES =====
export async function getClassExpanded(classId: string) {
  const module = await import('./classes/index');
  return module.getClassById?.(classId);
}

export async function getAllClassesExpanded() {
  const module = await import('./classes/index');
  return module.ALL_CLASSES || [];
}

// ===== SPÉCIALISATIONS =====
export async function getSpecializationsByClass(classId: string) {
  const module = await import('./specializations/index');
  return module.getSpecsByClass?.(classId) || [];
}

// ===== COMPÉTENCES/SORTS =====
export async function getAllAbilities() {
  const module = await import('./abilities/index');
  return module.ALL_ABILITIES || [];
}

export async function getAbilityById(abilityId: string) {
  const module = await import('./abilities/index');
  return module.getAbilityById?.(abilityId);
}

// ===== ÉQUIPEMENTS =====
export async function getAllLegendaryItems() {
  const module = await import('./equipment/index');
  return module.LEGENDARY_ITEMS || [];
}

export async function getAllArmorSets() {
  const module = await import('./equipment/index');
  return module.ARMOR_SETS || [];
}

// ===== PÉDAGOGIE =====
export async function getTooltipForTerm(term: string) {
  const module = await import('./pedagogy/glossary');
  return module.GLOSSARY_TERMS?.[term.toLowerCase()];
}

export async function getAllGuides() {
  const module = await import('./pedagogy/guides');
  return module.GUIDES || {};
}

// ===== VALIDATION =====
export async function getCompatibilityWarnings(selection: any, classId?: string) {
  const module = await import('./validation/compatibility');
  return module.evaluateCompatibility?.(selection, classId) || [];
}

export async function getCompatibilityRules() {
  const module = await import('./validation/compatibility');
  return module.COMPATIBILITY_RULES || [];
}
