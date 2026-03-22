/**
 * Script pour réduire les traits/skills des options LifePath à 1 seul par option
 * Usage: node scripts/normalize-lifepath-effects.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIFEPATH_DIR = path.join(__dirname, '../src/lore/character-creation/lifepath');

// Fonction pour traiter un fichier
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Pattern pour trouver mechanical_traits avec plusieurs entrées
  // mechanical_traits: [{...}, {...}, {...}]
  const traitsPattern = /mechanical_traits:\s*\[([^\]]*)\]/g;
  
  content = content.replace(traitsPattern, (match, innerContent) => {
    // Compter combien d'objets dans le tableau
    const objectMatches = innerContent.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
    if (objectMatches && objectMatches.length > 1) {
      modified = true;
      // Garder seulement le premier trait
      return `mechanical_traits: [${objectMatches[0]}]`;
    }
    return match;
  });

  // Pattern pour trouver skills avec plusieurs entrées
  const skillsPattern = /skills:\s*\[([^\]]*)\]/g;
  
  content = content.replace(skillsPattern, (match, innerContent) => {
    // Compter combien d'objets dans le tableau
    const objectMatches = innerContent.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
    if (objectMatches && objectMatches.length > 1) {
      modified = true;
      // Garder seulement le premier skill
      return `skills: [${objectMatches[0]}]`;
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Modified: ${filePath}`);
    return true;
  }
  return false;
}

// Fonction récursive pour parcourir les dossiers
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let modifiedCount = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      modifiedCount += processDirectory(fullPath);
    } else if (file.endsWith('.ts')) {
      if (processFile(fullPath)) {
        modifiedCount++;
      }
    }
  }

  return modifiedCount;
}

// Exécution
console.log('Normalizing LifePath effects...\n');
const modified = processDirectory(LIFEPATH_DIR);
console.log(`\n${modified} files modified.`);
