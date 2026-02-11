import { generateMap, deckManager } from './src/mapGenerator.js';

// Simulate a long journey to trigger transition
console.log("--- Starting Journey Simulation ---");
deckManager.initRegion('varna');

// Draw all cards to reach transition
for (let i = 0; i < 43; i++) { // 30 exploration + 8 danger + 5 narrative
    deckManager.draw();
}

const transitionMap = generateMap('varna', 12345, 25, 'north');
console.log("Region of transition map:", transitionMap.region);
console.log("Map ID:", transitionMap.id);

// Check for mixed terrain (dirt from Varna and grass from Sylvae)
const terrainTypes = new Set();
transitionMap.terrain.forEach(row => row.forEach(tile => terrainTypes.add(tile)));

console.log("Terrain types found in transition map:", Array.from(terrainTypes));

if (terrainTypes.has('dirt') && terrainTypes.has('grass')) {
    console.log("SUCCESS: Transition map contains mixed terrains!");
} else {
    console.log("WARNING: Transition map only contains:", Array.from(terrainTypes));
}
