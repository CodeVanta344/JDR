/**
 * REGIONAL RANDOM ENCOUNTER TABLES
 * 5 tables d20 — une par région majeure d'Aethelgard.
 * Utilisées pour les voyages entre chapitres ou pour remplir les temps morts.
 */
import type { RandomEncounter } from './types';

export interface RegionalTable {
  regionId: string;
  regionName: string;
  description: string;
  frequency: string; // quand lancer
  encounters: RandomEncounter[];
}

// ────────────────────────────────────────────────────────────────────
// 1. Plaines Centrales (ch1–ch3 routes)
// ────────────────────────────────────────────────────────────────────
export const TABLE_PLAINES: RegionalTable = {
  regionId: 'plaines_centrales',
  regionName: 'Plaines Centrales d\'Aethelgard',
  description: 'Terres agricoles entre Sol-Aureus et Corvale. Routes fréquentées mais de plus en plus dangereuses.',
  frequency: '1 jet par demi-journée de voyage',
  encounters: [
    { d20Range: '1-3', description: 'Rien — voyage calme. Les PJ peuvent RP, dormir, ou préparer des sorts.', difficulty: 'facile', loot: [] },
    { d20Range: '4-5', description: 'Marchands ambulants (groupe de 3). Vendent potions de soins (50 PO), rations (5 PO), nouvelles fraîches. Si Persuasion DC 12 : réduction de 20%.', difficulty: 'facile', loot: ['Provisions disponibles à l\'achat'] },
    { d20Range: '6-7', description: 'Paysans en fuite — 6 familles fuient vers Sol-Aureus. Témoins d\'attaques cultistes. Histoire DC 11 → infos sur les routes des cultistes.', difficulty: 'facile', loot: ['Informations tactiques'] },
    { d20Range: '8-9', description: 'Bandits de grand chemin (4, CR 1/2 chacun). "La bourse ou la vie !" Intimidation DC 13 → ils fuient sans combat. Sinon : combat rapide.', difficulty: 'facile', creatures: ['Bandit ×4'], loot: ['60 PO', 'Épée courte', 'Carte au trésor (piège)'] },
    { d20Range: '10-11', description: 'Patrouille royale (6 gardes, 1 capitaine). Vérifie les identités. Si les PJ ont une lettre de Sol-Aureus : libre passage + 2 potions de soins gratuites. Sinon : Persuasion DC 13 ou retard de 2 heures.', difficulty: 'facile', creatures: ['Garde royal ×6', 'Capitaine'], loot: ['2 potions de soins si lettre présentée'] },
    { d20Range: '12-13', description: 'Ferme brûlée fraîchement — personne n\'a survécu. Investigation DC 12 : marques rituelles cultistes. Nature DC 10 : traces mènent vers le nord-est. Un chat miraculé miaule dans les décombres.', difficulty: 'facile', loot: ['30 PO cachées sous l\'âtre', 'Chat familier potentiel'] },
    { d20Range: '14-15', description: 'Goules errantes (3, CR 1 chacune) — vestiges de Corvale. Émergent du sol au crépuscule. Si tuées : Arcanes DC 12 → la corruption s\'étend bien au-delà de Corvale.', difficulty: 'moyen', creatures: ['Goule ×3'], loot: ['Bijoux oxydés (45 PO)', '1 potion de soins sur un cadavre'] },
    { d20Range: '16-17', description: 'Ermite prophète — un vieil homme dans une grotte marmonne des prophéties. Sagesse DC 14 → une prophétie sur le prochain chapitre (indice utile). Religion DC 12 → c\'est un ancien prêtre de l\'Ordre de l\'Aube.', difficulty: 'facile', loot: ['Prophétie (avantage à un jet dans le prochain chapitre)', 'Bénédiction mineure (+1 PV temporaire)'] },
    { d20Range: '18-19', description: 'Griffon blessé — une flèche cultiste dans l\'aile. Dressage DC 14 et Médecine DC 12 → un allié griffon pour 1d4 jours (vol 80 ft., CR 2, attaque griffe +5/1d8+3). Si raté : le griffon attaque puis s\'enfuit.', difficulty: 'moyen', creatures: ['Griffon blessé'], loot: ['Monture aérienne temporaire si apprivoisé', 'Plume de griffon (40 PO)'] },
    { d20Range: '20', description: 'Rencontre fortuite : un allié majeur de la campagne (PNJ de lore-npcs.ts) croise la route des PJ. Scène de RP importante + cadeau (arme magique mineure ou info critique pour les 2 prochains chapitres).', difficulty: 'facile', loot: ['Arme magique +1 ou information critique'] }
  ]
};

// ────────────────────────────────────────────────────────────────────
// 2. Montagnes d'Acier (ch4–ch5)
// ────────────────────────────────────────────────────────────────────
export const TABLE_MONTAGNES: RegionalTable = {
  regionId: 'montagnes_acier',
  regionName: 'Montagnes d\'Acier',
  description: 'Pics escarpés, mines naines, sentiers étroits, créatures adaptées au froid et à l\'altitude.',
  frequency: '1 jet par demi-journée de voyage en montagne',
  encounters: [
    { d20Range: '1-2', description: 'Rien — les montagnes sont silencieuses. Trop silencieuses.', difficulty: 'facile', loot: [] },
    { d20Range: '3-4', description: 'Tempête de neige — visibilité 5 pieds, vitesse divisée par 2 pendant 1d6 heures. Survie DC 12 pour trouver un abri, sinon JDS Con DC 10/heure → épuisement.', difficulty: 'moyen', loot: [] },
    { d20Range: '5-6', description: 'Éboulement — JDS Dextérité DC 13 ou 3d6 contondant + bloqué (Athlétisme DC 14 pour se dégager). Perception DC 13 → esquive automatique.', difficulty: 'moyen', loot: ['Gemmes dans les débris (30 PO si cherchées)'] },
    { d20Range: '7-8', description: 'Meute de loups des neiges (6, CR 1/4). Encerclement tactique. Nature DC 11 → jeter de la viande les repousse sans combat.', difficulty: 'facile', creatures: ['Loup ×6'], loot: ['Fourrures (20 PO chacune)'] },
    { d20Range: '9-10', description: 'Prospecteur nain solitaire, Galbin, perdu depuis 3 jours. Survie DC 10 pour le guider. En échange : 50 PO et un morceau de mithral brut (vaut 100 PO à Hammerdeep).', difficulty: 'facile', loot: ['50 PO', 'Mithral brut (100 PO)'] },
    { d20Range: '11-12', description: 'Yéti (1, CR 3) — territorial. Si les PJ ne fuient pas ou ne lancent pas de feu, il attaque. Si un PJ parle Géant : Persuasion DC 16 → il les laisse passer.', difficulty: 'difficile', creatures: ['Yéti'], loot: ['Fourrure de yéti (200 PO)', 'Crâne runique (composant)'] },
    { d20Range: '13-14', description: 'Mine abandonnée — entrée cachée (Perception DC 12). Intérieur : 3 salles, 1 piège (fosse, Perception DC 13, 2d6 contondant), 1 élémentaire de terre mineur (CR 2), trésor : 100 PO + gemme rouge (75 PO).', difficulty: 'moyen', creatures: ['Élémentaire de terre mineur'], loot: ['100 PO', 'Gemme rouge (75 PO)'] },
    { d20Range: '15-16', description: 'Aigle géant — survole les PJ. Si un PJ lui offre de la nourriture (viande), il peut être monté 1 journée (vol 80 ft.). Nature DC 14 pour l\'apprivoiser.', difficulty: 'facile', creatures: ['Aigle géant'], loot: ['Transport aérien 1 jour'] },
    { d20Range: '17-18', description: 'Patrouille naine (4 guerriers, 1 ranger). Amicale si les PJ viennent d\'Hammerdeep. Donne des rations et un raccourci (-3 heures). Sinon : interrogatoire (Persuasion DC 12).', difficulty: 'facile', loot: ['Rations naines (3 jours)', 'Raccourci'] },
    { d20Range: '19-20', description: 'Source thermale magique — baigner dedans 1 heure → guérison de tous les niveaux d\'épuisement + 2d6 PV temporaires pour 24h. Un esprit de l\'eau offre une énigme : la résoudre (Intelligence DC 15) → 1 parchemin de sort niveau 3 au choix.', difficulty: 'facile', loot: ['Guérison épuisement', '2d6 PV temporaires', 'Parchemin niveau 3 si énigme résolue'] }
  ]
};

// ────────────────────────────────────────────────────────────────────
// 3. Plaines de Cendres (ch5–ch6, ch10)
// ────────────────────────────────────────────────────────────────────
export const TABLE_PLAINES_CENDRES: RegionalTable = {
  regionId: 'plaines_cendres',
  regionName: 'Plaines de Cendres',
  description: 'Terres dévastées par la corruption. Tout est gris, mort, hostile. L\'eau est rare et contaminée.',
  frequency: '1 jet toutes les 4 heures de voyage',
  encounters: [
    { d20Range: '1-2', description: 'Silence absolu — même le vent se tait. Test moral pour les personnages sensibles (JDS Sagesse DC 10 ou 1d4 psychique).', difficulty: 'facile', loot: [] },
    { d20Range: '3-4', description: 'Cendrestorm — tempête de cendres, visibilité 0. Survie DC 13 ou le groupe se perd (+4 heures de marche). JDS Con DC 11 → 1d4 nécrotique (cendres maudites).', difficulty: 'moyen', loot: [] },
    { d20Range: '5-6', description: 'Ruines d\'un village — Investigation DC 11 → journal d\'un habitant décrivant l\'arrivée du culte. Fouille : 50 PO cachées, 1 potion de soins sous un plancher.', difficulty: 'facile', loot: ['50 PO', '1 potion de soins', 'Journal (lore)'] },
    { d20Range: '7-8', description: 'Zombies errants (6, CR 1/4) — les anciens habitants du village. Lents mais nombreux. Radiant = dégâts doublés.', difficulty: 'facile', creatures: ['Zombie ×6'], loot: ['Bijoux ternis (30 PO)'] },
    { d20Range: '9-10', description: 'Nécromancien cultiste isolé (CR 3) avec 4 squelettes (CR 1/4). Tente de fuir si en danger. Capturer vivant → infos sur les défenses de la Tour.', difficulty: 'moyen', creatures: ['Nécromancien', 'Squelette ×4'], loot: ['Baguette de rayons funestes (3 charges)', '80 PO', 'Carte de la Tour'] },
    { d20Range: '11-12', description: 'Terre fissurée — le sol s\'effondre sous un PJ aléatoire. JDS Dextérité DC 13 ou chute de 10 pieds (1d6 contondant). En bas : grotte avec 100 PO de cristaux + 1 champignon curatif (2d8 PV).', difficulty: 'moyen', loot: ['100 PO en cristaux', 'Champignon curatif (2d8 PV)'] },
    { d20Range: '13-14', description: 'Source d\'eau. Contamination ? Nature DC 12 → non, c\'est propre. Si bue : repos court bénéfique (+dé de vie bonus). Survie DC 14 → remplir les gourdes pour 3 jours.', difficulty: 'facile', loot: ['Eau propre (rare ici)'] },
    { d20Range: '15-16', description: 'Ombre chasseuse (1, CR 3) — se camoufle dans les cendres. Perception DC 15 pour la repérer. Attaque surprise si non vue. Immunités physiques non-magiques.', difficulty: 'difficile', creatures: ['Ombre'], loot: ['Essence d\'ombre (200 PO, composant rare)'] },
    { d20Range: '17-18', description: 'Réfugiés — petit groupe (8 civils, 2 gardes blessés). Demandent de l\'eau et de la protection. Si aidés : +2 diplomatie au prochain conseil.', difficulty: 'facile', loot: ['Gratitude (bonus diplomatie)'] },
    { d20Range: '19-20', description: 'Phénomène rare : un arbre vivant dans les cendres, brillant de lumière dorée. Religion DC 14 → vestige d\'un ancien Sceau de protection. Méditer dessous (1 heure) → bénédiction (avantage à tous les JDS contre nécrotique pendant 24h).', difficulty: 'facile', loot: ['Bénédiction anti-nécrotique (24h)', 'Graine de l\'Arbre (composant pour restaurer les Sceaux)'] }
  ]
};

// ────────────────────────────────────────────────────────────────────
// 4. Sylve d'Émeraude (ch7–ch8)
// ────────────────────────────────────────────────────────────────────
export const TABLE_SYLVE: RegionalTable = {
  regionId: 'sylve_emeraude',
  regionName: 'Sylve d\'Émeraude',
  description: 'Forêt ancestrale des elfes. Magique, vivante, dangereuse pour les non-invités. Fées, esprits, et corruptions cachées.',
  frequency: '1 jet par demi-journée',
  encounters: [
    { d20Range: '1-3', description: 'Rien — la forêt est paisible. Les arbres semblent murmurer des bénédictions. Les PJ récupèrent 1d4 PV passivement.', difficulty: 'facile', loot: ['1d4 PV récupérés'] },
    { d20Range: '4-5', description: 'Feux follets (3, CR 2) — tentent d\'attirer les PJ hors du sentier. Sagesse DC 14 pour résister. Si suivis : perdu pendant 1d4 heures + embuscade d\'araignée de phase.', difficulty: 'moyen', creatures: ['Feu follet ×3'], loot: [] },
    { d20Range: '6-7', description: 'Clairière aux champignons lumineux — 5 types, chacun avec un effet. Nature DC 13 pour identifier : curatif (2d6 PV), poison (2d6 poison), hallucinogène (1 heure vision Double Vue), somnifère (JDS Con DC 12 ou dort 1h), énergisant (+2 initiative 4h).', difficulty: 'facile', loot: ['Champignons au choix'] },
    { d20Range: '8-9', description: 'Centaures en patrouille (2, CR 2). Non hostiles si les PJ ont l\'approbation elfique. Informent sur la région. Si hostiles : combattent. Dressage DC 15 → alliés temporaires.', difficulty: 'moyen', creatures: ['Centaure ×2'], loot: ['Informations sur les sentiers'] },
    { d20Range: '10-11', description: 'Ruine elfique ancienne — Perception DC 12. Investigation DC 14 → salle cachée avec un parchemin de sort elfique ancien (Bénédiction de la Forêt : avantage aux JDS Nature/Survie 24h + communication avec les plantes 1h).', difficulty: 'facile', loot: ['Parchemin de Bénédiction de la Forêt'] },
    { d20Range: '12-13', description: 'Ours-hibou (1, CR 3). Protège ses petits. Si les PJ s\'approchent : grondement. Dressage DC 16 → le calmer. Nature DC 12 → contourner le nid. Sinon : combat.', difficulty: 'difficile', creatures: ['Ours-hibou'], loot: ['Plumes d\'ours-hibou (50 PO)'] },
    { d20Range: '14-15', description: 'Esprit forestier — propose un pacte. Si le PJ accepte de planter un arbre dans un lieu dévasté (Plaines de Cendres), il reçoit un charme : une fois, peut appeler des racines pour entraver un ennemi (JDS Force DC 15 ou entravé 1 minute).', difficulty: 'facile', loot: ['Charme d\'Entrave Végétale (1 utilisation)'] },
    { d20Range: '16-17', description: 'Araignées de phase (2, CR 3) — tendent une embuscade dans les arbres. Perception DC 15 pour les toiles éthérées. Si non détectées : attaque surprise.', difficulty: 'difficile', creatures: ['Araignée de phase ×2'], loot: ['Soie de phase (200 PO chacune)'] },
    { d20Range: '18-19', description: 'Dryade (CR 1) — charme un PJ pour protéger son arbre. Sagesse DC 14 pour résister. Si les PJ aident à purifier la corruption d\'un ruisseau voisin (Nature DC 12), elle offre une faveur : une fois, peut guérir un PJ de toutes ses conditions (poison, maladie, malédiction).', difficulty: 'moyen', creatures: ['Dryade'], loot: ['Faveur de Dryade (guérison totale, 1 utilisation)'] },
    { d20Range: '20', description: 'Licorne — apparaît furtivement. Si un PJ a un alignement bon et approche respectueusement (Dressage DC 18 ou just being genuinely good), la licorne touche de sa corne : guérison totale + PV max pendant 24h + 1 utilisation de Détection du mal et du bien.', difficulty: 'facile', creatures: ['Licorne'], loot: ['Guérison totale + PV max + Détection du mal'] }
  ]
};

// ────────────────────────────────────────────────────────────────────
// 5. Terres Sombres (ch10–ch11 approche de la Tour)
// ────────────────────────────────────────────────────────────────────
export const TABLE_TERRES_SOMBRES: RegionalTable = {
  regionId: 'terres_sombres',
  regionName: 'Terres Sombres — Approche de Sombrelune',
  description: 'Zone de corruption totale autour de la Tour. Le ciel est en permanence couvert de nuages violets. Les morts marchent.',
  frequency: '1 jet toutes les 2 heures (zone très active)',
  encounters: [
    { d20Range: '1-2', description: 'Pause dans la corruption — un cercle de protection ancien tient encore. Repos possible (30 min = repos court sûr). Mais le cercle se fissure — 1d4 heures avant collapse.', difficulty: 'facile', loot: ['Repos court sûr'] },
    { d20Range: '3-4', description: 'Brume nécrotique — JDS Constitution DC 12 au début de chaque round passé dans la brume. Raté = 1d6 nécrotique. La brume dure 10 minutes ou jusqu\'à vent magique.', difficulty: 'moyen', loot: [] },
    { d20Range: '5-6', description: 'Patrouille de squelettes (8, CR 1/4) avec 1 squelette capitaine (CR 2). Marchent en formation. Discrétion DC 13 collective pour les éviter.', difficulty: 'moyen', creatures: ['Squelette ×8', 'Squelette capitaine'], loot: ['Armes rouillées', '1 potion de soins sur le capitaine'] },
    { d20Range: '7-8', description: 'Fantôme allié — l\'esprit d\'un ancien héros guide les PJ vers un raccourci (-1 heure). Religion DC 12 pour communiquer. Il/elle partage un souvenir de la dernière Guerre contre Malachor.', difficulty: 'facile', creatures: ['Fantôme bienveillant'], loot: ['Raccourci', 'Lore historique'] },
    { d20Range: '9-10', description: 'Revenant (1, CR 5) — un ancien soldat qui cherche vengeance contre Malachi. Non hostile si les PJ partagent le même objectif. Peut combattre à leurs côtés pendant 1 combat.', difficulty: 'difficile', creatures: ['Revenant'], loot: ['Allié temporaire pour 1 combat'] },
    { d20Range: '11-12', description: 'Faille dans le Voile — le plan des morts est visible pendant 1 minute. Chaque PJ voit un être cher décédé. JDS Sagesse DC 14 ou effrayé 1 minute. Si réussi : inspiration (avantage à 1 jet dans les 24h).', difficulty: 'moyen', loot: ['Inspiration si JDS réussi'] },
    { d20Range: '13-14', description: 'Nid de goules (6, CR 1 + 1 Ghast CR 2). La tanière contient des restes de soldats. Fouille : 150 PO, carte de la Tour (avantage Perception dans la Tour), 1 arme magique +1 glaive.', difficulty: 'difficile', creatures: ['Goule ×6', 'Ghast'], loot: ['150 PO', 'Carte de la Tour', 'Glaive +1'] },
    { d20Range: '15-16', description: 'Cristal nécrotique exposé — source de la corruption locale. Le détruire (CA 15, 30 PV) crée une zone sûre de 100m pour 1d4 heures. Explosion à la destruction : 3d6 nécrotique, 15 pieds, JDS Dex DC 14.', difficulty: 'moyen', loot: ['Zone sûre temporaire', 'Fragment de cristal (100 PO, composant)'] },
    { d20Range: '17-18', description: 'Nécromancien déserteur — veut négocier sa vie contre des infos sur les défenses de la Tour. Perspicacité DC 13 : il dit vrai. Infos : porte secrète, rotation des gardes, point faible de Malachi.', difficulty: 'facile', creatures: ['Nécromancien déserteur'], loot: ['Informations critiques sur la Tour'] },
    { d20Range: '19-20', description: 'Cadeau des anciens — une arme des Sept Héros originaux est trouvée fichée dans un rocher, pulsant de lumière. Force DC 18 ou Charisme DC 15 pour l\'extraire. Arme légendaire : +2, +1d6 radiant, lumière vive 30 pieds à volonté.', difficulty: 'facile', loot: ['Arme légendaire des Sept Héros (+2, +1d6 radiant)'] }
  ]
};

// ────────────────────────────────────────────────────────────────────
// Export index
// ────────────────────────────────────────────────────────────────────
export const ALL_REGIONAL_TABLES: RegionalTable[] = [
  TABLE_PLAINES,
  TABLE_MONTAGNES,
  TABLE_PLAINES_CENDRES,
  TABLE_SYLVE,
  TABLE_TERRES_SOMBRES
];
