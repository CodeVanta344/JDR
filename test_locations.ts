
import { BIRTH_LOCATIONS } from './src/lore/character-creation/lifepath/birth/locations';

console.log(`Total locations: ${BIRTH_LOCATIONS.length}`);
BIRTH_LOCATIONS.forEach(loc => {
    console.log(`- ${loc.label} (${loc.subCategory})`);
});
