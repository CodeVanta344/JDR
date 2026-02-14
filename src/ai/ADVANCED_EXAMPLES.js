// ==========================================
// GMEngine - Exemples d'utilisation des systèmes avancés
// ==========================================

import { GMEngine } from './GMEngine.js';

// ===== INITIALISATION =====
const gmEngine = new GMEngine({
  enableEvents: true,
  enableKarma: true,
  enableNPCPersonality: true
});

console.log('✅ GMEngine initialisé avec tous les systèmes avancés');

// ==========================================
// EXEMPLE 1 : Scénario d'arrivée dans une ville
// ==========================================

async function example1_ArrivalInCity() {
  console.log('\n===== EXEMPLE 1 : Arrivée dans une ville =====\n');

  // Contexte
  const context = {
    location: 'city',
    weather: 'clear',
    hour: 14
  };

  // Générer des événements d'arrivée
  const events = gmEngine.generateRandomEvents(context);
  
  console.log('🎲 Événements générés :');
  events.forEach(event => {
    console.log(`- ${event.narrative || event.title}`);
  });

  // Créer le marchand de la ville
  const merchant = gmEngine.createNPC('npc_balthazar', 'Balthazar le Colporteur', 'merchant');
  console.log(`\n✅ PNJ créé : ${merchant.name} (archétype: ${merchant.archetype})`);

  // Saluer le marchand
  const greeting = gmEngine.interactWithNPC('npc_balthazar', {
    type: 'greeting',
    action: 'salut',
    emotionalImpact: { joy: 10 },
    relationshipChange: 5
  });

  console.log(`\n💬 ${greeting.text}`);
  console.log(`Humeur : ${greeting.mood} | Relation : ${greeting.relationshipScore}`);

  // Acheter quelque chose
  const trade = gmEngine.interactWithNPC('npc_balthazar', {
    type: 'trade',
    action: 'buy',
    item: 'potion de soin',
    emotionalImpact: { joy: 15 },
    relationshipChange: 10
  });

  console.log(`\n💬 ${trade.text}`);
  console.log(`Relation après achat : ${trade.relationshipScore}`);
}

// ==========================================
// EXEMPLE 2 : Combat et conséquences
// ==========================================

async function example2_CombatAndKarma() {
  console.log('\n===== EXEMPLE 2 : Combat et Karma =====\n');

  // Action 1 : Tuer un gobelin
  console.log('⚔️ Le joueur tue un gobelin');
  const result1 = gmEngine.recordKarmaAction('kill_enemy', {
    enemyType: 'goblin',
    location: 'forest'
  });

  console.log('\nImpact :');
  result1.impact.narrative.forEach(msg => console.log(`- ${msg}`));
  console.log(`Karma : +${result1.impact.karma}`);

  // Action 2 : Aider un voyageur
  console.log('\n💚 Le joueur aide un voyageur en détresse');
  const result2 = gmEngine.recordKarmaAction('help_npc', {
    npcType: 'traveler',
    location: 'road'
  });

  result2.impact.narrative.forEach(msg => console.log(`- ${msg}`));
  console.log(`Karma : +${result2.impact.karma}`);

  // Action 3 : Voler dans une boutique
  console.log('\n💰 Le joueur tente de voler');
  const result3 = gmEngine.recordKarmaAction('steal', {
    target: 'shop',
    location: 'city'
  });

  result3.impact.narrative.forEach(msg => console.log(`- ${msg}`));
  console.log(`Karma : ${result3.impact.karma}`);

  // Afficher le rapport de karma
  const stats = gmEngine.getStats();
  const karmaReport = stats.karmaReport;

  console.log('\n📊 Rapport de réputation :');
  console.log(`Alignement : ${karmaReport.alignment.alignment} (${karmaReport.alignment.description})`);
  console.log(`Prime totale : ${karmaReport.totalBounty} po`);
  
  console.log('\nFactions :');
  karmaReport.factions.forEach(f => {
    if (f.reputation !== 0) {
      console.log(`- ${f.name} : ${f.reputation} (${f.attitude})`);
    }
  });
}

// ==========================================
// EXEMPLE 3 : Événement mondial - Festival
// ==========================================

async function example3_WorldEvent() {
  console.log('\n===== EXEMPLE 3 : Événement Mondial =====\n');

  // Forcer un événement mondial (normalement 2% de chance)
  const festivalEvent = {
    type: 'world_event',
    eventId: 'festival',
    name: 'Festival de la Moisson',
    description: 'Les villes célèbrent l\'abondance ! Musique, danse et marchandises à prix réduits.',
    duration: 48,
    effects: { shop_discount: 15, morale: +20, quests_available: +3, xp_gain: +10 },
    announcement: '📯 Des hérauts annoncent le début du Festival de la Moisson !',
    startTime: Date.now()
  };

  gmEngine.eventGenerator.activeWorldEvents.push(festivalEvent);

  console.log('🎉 Événement activé : Festival de la Moisson');
  console.log(festivalEvent.announcement);
  console.log(`\nEffets :`);
  console.log(`- Réduction boutiques : -${festivalEvent.effects.shop_discount}%`);
  console.log(`- Bonus moral : +${festivalEvent.effects.morale}`);
  console.log(`- Quêtes supplémentaires : +${festivalEvent.effects.quests_available}`);
  console.log(`- Bonus XP : +${festivalEvent.effects.xp_gain}%`);

  // Récupérer les effets actifs
  const activeEffects = gmEngine.getActiveEventEffects();
  console.log('\n🌟 Effets actifs globaux :');
  Object.keys(activeEffects).forEach(key => {
    if (activeEffects[key] !== 0) {
      console.log(`- ${key} : ${activeEffects[key]}`);
    }
  });

  // Simuler un achat pendant le festival
  console.log('\n💰 Le joueur achète une épée (100 po normalement)');
  const basePrice = 100;
  const discountedPrice = basePrice * (1 - activeEffects.shop_discount / 100);
  console.log(`Prix avec réduction festival : ${discountedPrice} po`);
  console.log(`Économie : ${basePrice - discountedPrice} po !`);
}

// ==========================================
// EXEMPLE 4 : Évolution d'un PNJ
// ==========================================

async function example4_NPCEvolution() {
  console.log('\n===== EXEMPLE 4 : Évolution d\'un PNJ =====\n');

  // Créer un garde
  const guard = gmEngine.createNPC('npc_aldric', 'Capitaine Aldric', 'guard');
  console.log(`✅ PNJ créé : ${guard.name}`);
  console.log(`Traits initiaux : Loyauté=${guard.traits.loyalty}, Courage=${guard.traits.courage}`);

  // Interaction 1 : Salut froid
  console.log('\n--- Interaction 1 : Première rencontre ---');
  const interaction1 = gmEngine.interactWithNPC('npc_aldric', {
    type: 'greeting',
    action: 'salut',
    emotionalImpact: { neutral: 5 },
    relationshipChange: 0
  });
  console.log(interaction1.text);
  console.log(`Relation : ${interaction1.relationshipScore} | Humeur : ${interaction1.mood}`);

  // Interaction 2 : Aider le garde (combat)
  console.log('\n--- Interaction 2 : Vous aidez le garde en combat ---');
  const interaction2 = gmEngine.interactWithNPC('npc_aldric', {
    type: 'quest',
    action: 'complete',
    emotionalImpact: { joy: 20, trust: 30 },
    relationshipChange: 25
  });
  console.log(interaction2.text);
  console.log(`Relation : ${interaction2.relationshipScore} | Humeur : ${interaction2.mood}`);

  // Interaction 3 : Offrir un cadeau
  console.log('\n--- Interaction 3 : Vous offrez une épée au garde ---');
  const interaction3 = gmEngine.interactWithNPC('npc_aldric', {
    type: 'gift',
    action: 'offrir épée',
    emotionalImpact: { joy: 25, trust: 15 },
    relationshipChange: 20
  });
  console.log(interaction3.text);
  console.log(`Relation : ${interaction3.relationshipScore} | Humeur : ${interaction3.mood}`);

  // Interaction 4 : Demander une faveur
  console.log('\n--- Interaction 4 : Vous demandez une faveur ---');
  const interaction4 = gmEngine.interactWithNPC('npc_aldric', {
    type: 'dialogue',
    topic: 'faveur',
    action: 'demander aide',
    emotionalImpact: { anticipation: 10 },
    relationshipChange: 5
  });
  console.log(interaction4.text);
  console.log(`Relation finale : ${interaction4.relationshipScore} | Humeur : ${interaction4.mood}`);

  // Profil final
  const profile = gmEngine.npcPersonalitySystem.getProfile('npc_aldric');
  console.log('\n📊 Profil final du PNJ :');
  console.log(`Nom : ${profile.name}`);
  console.log(`Archétype : ${profile.archetype}`);
  console.log(`Relation : ${profile.relationshipScore} (${profile.relationshipScore > 75 ? 'Allié' : profile.relationshipScore > 40 ? 'Ami' : 'Neutre'})`);
  console.log(`Humeur dominante : ${profile.mood}`);
  console.log(`Interactions totales : ${profile.totalInteractions}`);
}

// ==========================================
// EXEMPLE 5 : Tempête et danger
// ==========================================

async function example5_StormEvent() {
  console.log('\n===== EXEMPLE 5 : Tempête dangereuse =====\n');

  // Forcer un changement météo vers tempête
  const stormEvent = gmEngine.eventGenerator.generateWeatherChange('clear');
  
  // Simuler plusieurs transitions vers tempête
  let weather = 'clear';
  console.log('☀️ Météo initiale : Clair');

  // Clear -> Cloudy
  weather = 'cloudy';
  console.log('\n☁️ Le ciel se couvre...');

  // Cloudy -> Rain
  weather = 'rain';
  console.log('🌧️ La pluie commence à tomber...');

  // Rain -> Storm
  weather = 'storm';
  const storm = gmEngine.eventGenerator.weatherTypes.storm;
  console.log('\n⛈️ TEMPÊTE !');
  console.log(storm.description);
  console.log('\nEffets :');
  console.log(`- Visibilité : ${storm.effects.visibility}`);
  console.log(`- Voyage : ${storm.effects.travel}`);
  console.log(`- Moral : ${storm.effects.morale}`);
  console.log(`- Danger : +${storm.effects.danger}`);

  // Rencontre dangereuse
  console.log('\n🚨 Une rencontre aléatoire apparaît !');
  const encounter = gmEngine.eventGenerator.generateRandomEncounter({ location: 'wilderness' });
  console.log(encounter.narrative);
  console.log(`Danger : ${encounter.danger}`);
  console.log(`Récompense potentielle : ${encounter.reward}`);
}

// ==========================================
// EXEMPLE 6 : Système de rumeurs
// ==========================================

async function example6_Rumors() {
  console.log('\n===== EXEMPLE 6 : Système de rumeurs =====\n');

  // Créer un aubergiste
  const innkeeper = gmEngine.createNPC('npc_martha', 'Martha l\'Aubergiste', 'innkeeper');
  console.log(`Vous entrez dans l'auberge de ${innkeeper.name}.\n`);

  // Saluer
  const greeting = gmEngine.interactWithNPC('npc_martha', {
    type: 'greeting',
    action: 'salut',
    emotionalImpact: { joy: 10 },
    relationshipChange: 3
  });
  console.log(greeting.text);

  // Demander des rumeurs locales
  console.log('\n🗣️ Vous demandez : "Quoi de neuf dans le coin ?"');
  const localRumor = gmEngine.getRumor('local');
  console.log(`Martha : "Oh, tu sais... ${localRumor}"`);

  // Rumeur régionale
  console.log('\n🗣️ "Et dans la région ?"');
  const regionalRumor = gmEngine.getRumor('regional');
  console.log(`Martha : "J'ai entendu dire que ${regionalRumor}"`);

  // Rumeur légendaire
  console.log('\n🗣️ "Des légendes ?"');
  const legendaryRumor = gmEngine.getRumor('legendary');
  console.log(`Martha baisse la voix : "${legendaryRumor}"`);

  // Encore 3 rumeurs locales
  console.log('\n📰 Autres nouvelles locales :');
  for (let i = 0; i < 3; i++) {
    const rumor = gmEngine.getRumor('local');
    console.log(`- ${rumor}`);
  }
}

// ==========================================
// EXEMPLE 7 : Conséquences à long terme
// ==========================================

async function example7_LongTermConsequences() {
  console.log('\n===== EXEMPLE 7 : Conséquences à long terme =====\n');

  console.log('📜 Scénario : Le joueur a commis plusieurs crimes...\n');

  // Crime 1 : Tuer un innocent
  console.log('⚔️ Action 1 : Tuer un marchand innocent');
  const crime1 = gmEngine.recordKarmaAction('kill_innocent', { location: 'city' });
  crime1.impact.narrative.forEach(msg => console.log(`- ${msg}`));

  // Crime 2 : Voler plusieurs fois
  console.log('\n💰 Action 2 : Vol à répétition');
  gmEngine.recordKarmaAction('steal', { target: 'shop' });
  gmEngine.recordKarmaAction('steal', { target: 'maison' });
  gmEngine.recordKarmaAction('steal', { target: 'église' });

  // Crime 3 : Profaner un temple
  console.log('\n🔥 Action 3 : Profaner un temple');
  const crime3 = gmEngine.recordKarmaAction('desecrate_temple', { location: 'city' });
  crime3.impact.narrative.forEach(msg => console.log(`- ${msg}`));

  // Rapport final
  const stats = gmEngine.getStats();
  const karmaReport = stats.karmaReport;

  console.log('\n📊 CONSÉQUENCES :');
  console.log(`Alignement : ${karmaReport.alignment.alignment} (${karmaReport.alignment.description})`);
  console.log(`Prime totale : ${karmaReport.totalBounty} po`);
  
  console.log('\n💀 Primes actives :');
  karmaReport.activeBounties.forEach(bounty => {
    console.log(`- ${bounty.amount} po (${bounty.reason}) - émis par ${bounty.issuer}`);
  });

  console.log('\n⚔️ Factions hostiles :');
  karmaReport.factions.forEach(f => {
    if (f.attitude === 'hostile') {
      console.log(`- ${f.name} : ${f.reputation} (HOSTILE)`);
    }
  });

  console.log('\n🚨 Effets in-game :');
  console.log('- Les gardes attaquent à vue');
  console.log('- Les marchands refusent de vous servir');
  console.log('- L\'Église envoie des paladins à vos trousses');
  console.log('- Impossible d\'entrer dans les villes légalement');
  console.log('- Seule la Guilde des Voleurs vous accepte encore');
}

// ==========================================
// EXÉCUTION DES EXEMPLES
// ==========================================

async function runAllExamples() {
  try {
    await example1_ArrivalInCity();
    await example2_CombatAndKarma();
    await example3_WorldEvent();
    await example4_NPCEvolution();
    await example5_StormEvent();
    await example6_Rumors();
    await example7_LongTermConsequences();

    // Statistiques finales
    console.log('\n\n===== STATISTIQUES FINALES =====\n');
    const stats = gmEngine.getStats();
    console.log(`Actions totales : ${stats.totalActions}`);
    console.log(`Règles : ${stats.ruleBasedPercentage}`);
    console.log(`LLM : ${stats.llmPercentage}`);
    console.log(`Temps moyen : ${stats.averageResponseTime}`);
    console.log(`Économies estimées : $${stats.estimatedCostSavings.toFixed(2)}`);
    console.log(`Événements actifs : ${stats.activeEvents.length}`);
    console.log(`PNJ créés : ${stats.npcCount}`);

    console.log('\n✅ Tous les exemples ont été exécutés avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution des exemples :', error);
  }
}

// Export pour utilisation externe
export {
  example1_ArrivalInCity,
  example2_CombatAndKarma,
  example3_WorldEvent,
  example4_NPCEvolution,
  example5_StormEvent,
  example6_Rumors,
  example7_LongTermConsequences,
  runAllExamples
};

// Exécuter si lancé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples();
}
