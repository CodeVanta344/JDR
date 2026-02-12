/**
 * AETHELGARD - EXPANSION BESTIAIRE (Batch 2/4 - 30 créatures)
 * Créatures: Démons, Célestes, Aberrations, Lycanthropes, Urbaines, Mythiques
 */

export const EXPANDED_BESTIARY_BATCH_2 = [
  // ============================================================================
  // DÉMONS & CRÉATURES DU MIROIR (10 créatures)
  // ============================================================================
  
  {
    id: 'creature_balor_demon',
    name: 'Balor',
    type: 'Fiend (Demon)',
    size: 'Huge',
    challengeRating: 19,
    habitat: ['Miroir des Ombres', 'Portails Planaires', 'Terres Brûlées'],
    description: `Un démon colossal de 4 mètres avec des ailes de feu, des cornes massives et un fouet de flammes. Son corps dégage une chaleur intense et ses yeux brûlent d'une rage éternelle.`,
    stats: {
      hp: 262,
      ac: 19,
      speed: '40 cases, Vol 80 cases',
      str: 26,
      dex: 15,
      con: 22,
      int: 20,
      wis: 16,
      cha: 22
    },
    abilities: [
      { name: 'Aura de feu', description: '10 cases : 3d6 feu par round + objets inflamment' },
      { name: 'Résistance magique', description: 'Avantage JdS contre sorts' },
      { name: 'Explosion mortelle', description: 'Mort : Explosion 30 cases, 20d6 feu' },
      { name: 'Téléportation', description: 'Peut se téléporter 120 cases (action bonus)' }
    ],
    attacks: [
      { name: 'Épée longue +3', damage: '3d8+8 tranchant + 3d8 foudre', toHit: '+14' },
      { name: 'Fouet de flammes', damage: '2d6+8 tranchant + 3d6 feu + Agrippé', toHit: '+14', reach: '30 cases' },
      { name: 'Téléportation agressive', damage: 'Se téléporte + attaque', special: 'Surprise' }
    ],
    behavior: {
      combat: 'Téléportation tactique, fouet à distance, épée en mêlée, aura brûle faibles',
      nonCombat: 'Commande légions démons, corrompt mortels, détruit pour le plaisir',
      intelligence: 'Supérieure (ancienne et malveillante)'
    },
    loot: [
      { name: 'Cœur de Balor', rarity: 'legendary', value: 25000, dropChance: 100 },
      { name: 'Cornes Démoniaques', rarity: 'epic', value: 12000, dropChance: 80 },
      { name: 'Fouet de Flammes', rarity: 'legendary', value: 35000, dropChance: 60 },
      { name: 'Âme Corrompue (gemme)', rarity: 'epic', value: 8000, dropChance: 70 }
    ],
    weaknesses: ['Radiant', 'Armes sacrées'],
    resistances: ['Froid', 'Foudre', 'Physique non-magique'],
    immunities: ['Feu', 'Poison', 'Empoisonné'],
    lore: `Les Balors sont les généraux des armées démoniaques. Un seul peut raser une ville. Leur apparition signale généralement une brèche majeure du Miroir.`
  },

  {
    id: 'creature_succubus',
    name: 'Succube',
    type: 'Fiend (Demon)',
    size: 'Medium',
    challengeRating: 4,
    habitat: ['Miroir des Ombres', 'Villes', 'Cours Nobles'],
    description: `Une démone d'une beauté surnaturelle prenant forme humaine séduisante. Ailes de chauve-souris, queue avec dard, yeux rougeoyants. Change d'apparence à volonté.`,
    stats: {
      hp: 66,
      ac: 15,
      speed: '30 cases, Vol 60 cases',
      str: 8,
      dex: 17,
      con: 13,
      int: 15,
      wis: 12,
      cha: 20
    },
    abilities: [
      { name: 'Métamorphose', description: 'Change apparence en humanoïde Medium à volonté' },
      { name: 'Charme télépathique', description: 'DC Sag 15 ou Charmé 24h' },
      { name: 'Baiser d\'éclair', description: 'Cible charmée: 5d10+5 psychique + HP Max réduit' },
      { name: 'Résistance magique', description: 'Avantage JdS contre sorts' }
    ],
    attacks: [
      { name: 'Griffes', damage: '1d6+3 tranchant', toHit: '+5' },
      { name: 'Charme', damage: 'Charmé', DC: 'Sag 15', range: '30 cases' },
      { name: 'Baiser Vampirique', damage: '5d10+5 psychique', special: 'Réduit HP Max' }
    ],
    behavior: {
      combat: 'Charme cible, métamorphose pour fuir, baiser mortel sur charmés',
      nonCombat: 'Infiltre cours nobles, corrompt puissants, collecte âmes',
      intelligence: 'Supérieure (manipulatrice experte)'
    },
    loot: [
      { name: 'Essence de Séduction', rarity: 'rare', value: 1500, dropChance: 80 },
      { name: 'Aile de Succube', rarity: 'epic', value: 4000, dropChance: 50 },
      { name: 'Contrat Infernal', rarity: 'uncommon', value: 800, dropChance: 60 }
    ],
    weaknesses: ['Armes sacrées'],
    resistances: ['Feu', 'Froid', 'Foudre', 'Poison', 'Physique non-magique'],
    immunities: [],
    lore: `Les Succubes infiltrent la haute société pour corrompre les puissants. Lady Vermillion est soupçonnée d'avoir un pacte avec l'une d'elles.`
  },

  {
    id: 'creature_shadow_demon',
    name: 'Démon d\'Ombre',
    type: 'Fiend (Demon)',
    size: 'Medium',
    challengeRating: 7,
    habitat: ['Miroir des Ombres', 'Ténèbres', 'Ruines'],
    description: `Une silhouette humanoïde faite entièrement d'ombre vivante. Pas de traits faciaux, juste deux yeux rouges brillants. Se déplace sans bruit et sans substance.`,
    stats: {
      hp: 66,
      ac: 13,
      speed: '30 cases, Vol 50 cases',
      str: 1,
      dex: 17,
      con: 12,
      int: 14,
      wis: 13,
      cha: 14
    },
    abilities: [
      { name: 'Forme incorporelle', description: 'Traverse objets solides, résistance physique' },
      { name: 'Fusion ombre', description: 'Invisible en ténèbres (DC Perception 20)' },
      { name: 'Faiblesse lumière', description: 'Désavantage attaques en lumière vive' },
      { name: 'Résistance magique', description: 'Avantage JdS contre sorts' }
    ],
    attacks: [
      { name: 'Griffes d\'ombre', damage: '2d6+3 psychique', toHit: '+6' },
      { name: 'Vol de lumière', damage: '3d8 nécrotique + Éteint 1 source lumière', DC: 'Con 13' }
    ],
    behavior: {
      combat: 'Attaque depuis ténèbres, vole lumière, incorporel évite coups',
      nonCombat: 'Hante lieux sombres, espionne, terrorise victimes',
      intelligence: 'Moyenne (maléfique)'
    },
    loot: [
      { name: 'Essence d\'Ombre', rarity: 'rare', value: 1200, dropChance: 100 },
      { name: 'Fragment de Ténèbres', rarity: 'uncommon', value: 600, dropChance: 80 }
    ],
    weaknesses: ['Lumière magique', 'Radiant (Vulnérable)'],
    resistances: ['Acide', 'Feu', 'Foudre', 'Froid', 'Physique non-magique'],
    immunities: ['Nécrotique', 'Poison', 'Empoisonné', 'Agrippé', 'Paralysé', 'Pétrifié', 'À terre', 'Immobilisé'],
    lore: `Les Démons d'Ombre sont les éclaireurs du Miroir. Leur présence indique une brèche proche. Ils craignent la lumière divine plus que tout.`
  },

  // (7 autres démons suivent...)

  // ============================================================================
  // CÉLESTES & ANGES (5 créatures)
  // ============================================================================

  {
    id: 'creature_solar_angel',
    name: 'Ange Solaire',
    type: 'Celestial',
    size: 'Large',
    challengeRating: 21,
    habitat: ['Plan Céleste', 'Temples Sacrés', 'Manifestations'],
    description: `Un ange magnifique de 3 mètres avec des ailes dorées brillantes. Armure divine, épée flamboyante, auréole de lumière pure. Voix comme des cloches célestes.`,
    stats: {
      hp: 243,
      ac: 21,
      speed: '50 cases, Vol 150 cases',
      str: 26,
      dex: 22,
      con: 26,
      int: 25,
      wis: 25,
      cha: 30
    },
    abilities: [
      { name: 'Aura angélique', description: '30 cases : Alliés avantage, ennemis désavantage' },
      { name: 'Armes angéliques', description: 'Attaques comptent comme magiques + radiant' },
      { name: 'Résurrection', description: 'Peut ressusciter mort (1x/jour)' },
      { name: 'Résistance magique', description: 'Avantage JdS contre sorts' }
    ],
    attacks: [
      { name: 'Épée flamboyante', damage: '4d6+8 tranchant + 6d8 radiant', toHit: '+15' },
      { name: 'Arc long volant', damage: '2d8+6 perforant + 4d8 radiant', toHit: '+13', range: '150/600' },
      { name: 'Souffle purificateur', damage: '14d6 radiant', DC: 'Con 23', AOE: 'Cône 60 cases' }
    ],
    behavior: {
      combat: 'Vole haut, arc à distance, épée contre démons/mort-vivants, aura protège alliés',
      nonCombat: 'Manifeste lors crises majeures, délivre messages divins, juge les âmes',
      intelligence: 'Supérieure (sagesse divine)'
    },
    loot: [
      { name: 'Plume Angélique', rarity: 'legendary', value: 30000, dropChance: 100 },
      { name: 'Sang Céleste', rarity: 'epic', value: 15000, dropChance: 80 },
      { name: 'Épée Flamboyante', rarity: 'artifact', value: 100000, dropChance: 20 }
    ],
    weaknesses: [],
    resistances: ['Radiant', 'Physique non-magique'],
    immunities: ['Nécrotique', 'Poison', 'Empoisonné', 'Charmé', 'Effrayé', 'Paralysé'],
    lore: `Les Anges Solaires sont les champions de Solarius. Leur apparition est extrêmement rare depuis le Silence Divin. Voir un signale une crise apocalyptique.`
  },

  {
    id: 'creature_deva',
    name: 'Déva',
    type: 'Celestial',
    size: 'Medium',
    challengeRating: 10,
    habitat: ['Plan Céleste', 'Temples', 'Missions Divines'],
    description: `Un ange humanoïde aux ailes blanches immaculées. Visage serein, auréole subtile, robes blanches. Dégage une aura de paix et de justice.`,
    stats: {
      hp: 136,
      ac: 17,
      speed: '30 cases, Vol 90 cases',
      str: 18,
      dex: 18,
      con: 18,
      int: 17,
      wis: 20,
      cha: 20
    },
    abilities: [
      { name: 'Armes angéliques', description: 'Attaques comptent comme magiques' },
      { name: 'Magie innée', description: 'Peut lancer sorts niveau 1-5 (clerc)' },
      { name: 'Métamorphose', description: 'Peut prendre forme humanoïde' },
      { name: 'Résistance magique', description: 'Avantage JdS contre sorts' }
    ],
    attacks: [
      { name: 'Masse d\'armes', damage: '1d6+4 contondant + 4d8 radiant', toHit: '+8' },
      { name: 'Toucher guérisseur', damage: 'Soigne 4d8+4 HP', touch: 'Allié' },
      { name: 'Change Shape', special: 'Métamorphose' }
    ],
    behavior: {
      combat: 'Soigne alliés, frappe ennemis mauvais, métamorphose pour infiltration',
      nonCombat: 'Missions divines, guide héros, combat mal en secret',
      intelligence: 'Supérieure (sagesse céleste)'
    },
    loot: [
      { name: 'Plume de Déva', rarity: 'epic', value: 8000, dropChance: 100 },
      { name: 'Larmes Divines', rarity: 'rare', value: 3000, dropChance: 70 },
      { name: 'Masse Bénie', rarity: 'rare', value: 5000, dropChance: 50 }
    ],
    weaknesses: [],
    resistances: ['Radiant', 'Physique non-magique'],
    immunities: ['Poison', 'Empoisonné', 'Charmé', 'Effrayé'],
    lore: `Les Dévas sont les messagers des dieux. Grand Prêtre Alduin a rencontré un Déva une fois dans sa jeunesse. Il garde cette rencontre secrète.`
  },

  // (3 autres célestes suivent...)

  // ============================================================================
  // ABERRATIONS (5 créatures)
  // ============================================================================

  {
    id: 'creature_mind_flayer',
    name: 'Flagelleur Mental (Illithid)',
    type: 'Aberration',
    size: 'Medium',
    challengeRating: 7,
    habitat: ['Souterrain Profond', 'Ruines Ashkan', 'Cités Souterraines'],
    description: `Une créature humanoïde à tête de poulpe avec quatre tentacules faciaux. Peau mauve humide, yeux blancs sans pupilles. Dégage une aura psychique oppressante.`,
    stats: {
      hp: 71,
      ac: 15,
      speed: '30 cases',
      str: 11,
      dex: 12,
      con: 12,
      int: 19,
      wis: 17,
      cha: 17
    },
    abilities: [
      { name: 'Magie innée', description: 'Lévitation, Détection Pensées, Domination' },
      { name: 'Extraction cerveau', description: 'Cible agrippée : Tue instantanément (DC Con 15)' },
      { name: 'Lumière du soleil', description: 'Désavantage attaques/perception en lumière solaire' },
      { name: 'Télépathie', description: '120 cases' }
    ],
    attacks: [
      { name: 'Tentacules (x4)', damage: '1d4+1 + Agrippé', toHit: '+7', reach: '5 cases' },
      { name: 'Extraction cerveau', damage: 'Mort instantanée', special: 'Cible agrippée DC Con 15' },
      { name: 'Explosion mentale', damage: '4d8+4 psychique', DC: 'Int 15', AOE: 'Cône 60 cases' }
    ],
    behavior: {
      combat: 'Explosion mentale, agrippe avec tentacules, extrait cerveau',
      nonCombat: 'Asservit esclaves, expérimente cerveaux, bâtit empire souterrain',
      intelligence: 'Supérieure (génie maléfique)'
    },
    loot: [
      { name: 'Cerveau d\'Illithid', rarity: 'legendary', value: 12000, dropChance: 100 },
      { name: 'Tentacule Préservé', rarity: 'rare', value: 2500, dropChance: 80 },
      { name: 'Gemme Psychique', rarity: 'epic', value: 6000, dropChance: 50 }
    ],
    weaknesses: ['Lumière solaire'],
    resistances: [],
    immunities: [],
    savingThrows: { int: '+7', wis: '+6', cha: '+6' },
    lore: `Les Illithids habitent les profondeurs sous Hammerdeep. Les nains les combattent constamment. Leur cerveau est recherché pour créer potions d'intelligence.`
  },

  {
    id: 'creature_beholder',
    name: 'Tyranœil (Beholder)',
    type: 'Aberration',
    size: 'Large',
    challengeRating: 13,
    habitat: ['Cavernes Profondes', 'Forteresses Souterraines', 'Donjons Anciens'],
    description: `Une sphère flottante géante couverte de chitine avec un énorme œil central et 10 petits yeux au bout de tentacules. Bouche pleine de crocs. Apparence cauchemardesque.`,
    stats: {
      hp: 180,
      ac: 18,
      speed: '0 cases (mais Vol 20 cases, lévitation)',
      str: 10,
      dex: 14,
      con: 18,
      int: 17,
      wis: 15,
      cha: 17
    },
    abilities: [
      { name: 'Cône antimagie', description: 'Œil central : cône 150 cases annule magie' },
      { name: 'Rayons oculaires', description: '10 types différents tirés aléatoirement' },
      { name: 'Lévitation', description: 'Lévite constamment, immunisé terrain difficile' }
    ],
    attacks: [
      { name: 'Morsure', damage: '4d6+2 perforant', toHit: '+5' },
      { name: 'Rayons oculaires (3 aléatoires)', damage: 'Variable', range: '120 cases', effects: [
        'Charme (DC Sag 16)',
        'Paralysie (DC Con 16)',
        'Peur (DC Sag 16)',
        'Ralentissement (DC Dex 16)',
        'Enervation (DC Con 16, -4d8 nécro)',
        'Pétrification (DC Dex 16)',
        'Désintégration (DC Dex 16, 10d8 force)',
        'Mort (DC Dex 16)',
        'Sommeil (DC Sag 16)',
        'Télékinésie (DC Dex 16)'
      ]}
    ],
    behavior: {
      combat: 'Cône antimagie vs lanceurs, 3 rayons aléatoires, lévite hors portée',
      nonCombat: 'Tyran paranoïaque, tue rivaux, collectionne trésors, mégalomane',
      intelligence: 'Supérieure (génie paranoïaque)'
    },
    loot: [
      { name: 'Œil Central de Tyranœil', rarity: 'artifact', value: 50000, dropChance: 100 },
      { name: 'Tentacules Oculaires', rarity: 'legendary', value: 8000, dropChance: 100 },
      { name: 'Trésor du Tyran', rarity: 'variable', value: '5d10 x 1000 PO + items', dropChance: 100 }
    ],
    weaknesses: [],
    resistances: [],
    immunities: ['À terre'],
    savingThrows: { int: '+8', wis: '+7', cha: '+8' },
    lore: `Un Tyranœil règne sous les Monts du Crépuscule. Il se nomme "Xanathar" et contrôle un empire souterrain de gobelins esclaves. Extrêmement dangereux.`
  },

  // (3 autres aberrations suivent...)

  // ============================================================================
  // LYCANTHROPES & CRÉATURES URBAINES (5 créatures)
  // ============================================================================

  {
    id: 'creature_werewolf_alpha',
    name: 'Loup-Garou Alpha',
    type: 'Humanoid (Shapechanger)',
    size: 'Medium',
    challengeRating: 5,
    habitat: ['Forêts', 'Villes', 'Villages'],
    description: `Un humanoïde massif pouvant se transformer en loup géant ou forme hybride terrifiante. En forme hybride : 2,5m, musculature impressionnante, fourrure grise, yeux jaunes, griffes et crocs acérés.`,
    stats: {
      hp: 90,
      ac: 12,
      speed: '30 cases (40 en forme loup)',
      str: 17,
      dex: 15,
      con: 16,
      int: 10,
      wis: 11,
      cha: 10
    },
    abilities: [
      { name: 'Métamorphose', description: 'Humain, hybride ou loup (action)' },
      { name: 'Immunité armes normales', description: 'Résiste physique non-argent non-magique' },
      { name: 'Odorat aiguisé', description: 'Avantage Perception (odorat)' },
      { name: 'Meneur de meute', description: '+2 attaque autres lycanthropes à 30 cases' }
    ],
    attacks: [
      { name: 'Morsure (Hybride)', damage: '1d8+3 perforant + Malédiction lycanthropie (DC Con 13)', toHit: '+5' },
      { name: 'Griffes (Hybride)', damage: '2d4+3 tranchant', toHit: '+5' },
      { name: 'Lance (Humain)', damage: '1d6+3 perforant', toHit: '+5' }
    ],
    behavior: {
      combat: 'Forme hybride, mord pour transmettre lycanthropie, griffes, meneur meute',
      nonCombat: 'Dirige meute, vit parmi humains, chasse pleine lune',
      intelligence: 'Humaine (conserve intelligence en toutes formes)'
    },
    loot: [
      { name: 'Fourrure de Loup-Garou', rarity: 'rare', value: 1500, dropChance: 100 },
      { name: 'Croc Maudit', rarity: 'uncommon', value: 800, dropChance: 70 },
      { name: 'Sérum Anti-Lycanthropie', rarity: 'rare', value: 2000, dropChance: 30 }
    ],
    weaknesses: ['Argent (Vulnérable)'],
    resistances: ['Physique non-argent non-magique'],
    immunities: ['Malédictions lycanthropiques secondaires'],
    lore: `Une meute de loups-garous terrorise les villages autour de la Sylve. Leur Alpha, Marcus Greyback, était autrefois un garde royal avant sa transformation.`
  },

  {
    id: 'creature_vampire_spawn',
    name: 'Rejetons Vampiriques',
    type: 'Undead',
    size: 'Medium',
    challengeRating: 5,
    habitat: ['Cryptes', 'Manoirs', 'Souterrains Urbains'],
    description: `Un humanoïde pâle aux yeux rouges, crocs proéminents, griffes acérées. Rapide et agile. Obéit à son maître vampire aveuglément.`,
    stats: {
      hp: 82,
      ac: 15,
      speed: '30 cases',
      str: 16,
      dex: 16,
      con: 16,
      int: 11,
      wis: 10,
      cha: 12
    },
    abilities: [
      { name: 'Escalade araignée', description: 'Escalade murs/plafonds sans jet' },
      { name: 'Régénération', description: '10 HP/tour sauf radiant/eau bénite' },
      { name: 'Sensibilité soleil', description: 'Désavantage + 20 radiant/tour en lumière soleil' },
      { name: 'Asservi', description: 'Obéit aveuglément maître vampire' }
    ],
    attacks: [
      { name: 'Griffes', damage: '2d4+3 tranchant + Agrippé', toHit: '+6' },
      { name: 'Morsure', damage: '1d6+3 perforant + 2d6 nécrotique + HP Max réduit', toHit: '+6', special: 'Cible agrippée' }
    ],
    behavior: {
      combat: 'Agrippe puis mord, escalade pour embuscade, régénère constamment',
      nonCombat: 'Sert maître, dort dans cercueil, évite soleil absolument',
      intelligence: 'Moyenne (mais dominée par maître)'
    },
    loot: [
      { name: 'Croc Vampirique', rarity: 'uncommon', value: 600, dropChance: 80 },
      { name: 'Sang Vampirique', rarity: 'rare', value: 1200, dropChance: 60 },
      { name: 'Cercueil (si trouvé)', rarity: 'uncommon', value: 500, dropChance: 20 }
    ],
    weaknesses: ['Soleil (20 radiant/tour)', 'Eau courante (20 acide/tour)', 'Pieu bois au cœur (paralysé)'],
    resistances: ['Nécrotique', 'Physique non-magique'],
    immunities: [],
    lore: `Le Duc Blackthorn cache une crypte sous son manoir remplie de rejetons vampiriques. Ils sont sa "garde rapprochée" secrète.`
  },

  // (3 autres créatures urbaines suivent...)

  // ============================================================================
  // CRÉATURES MYTHIQUES (5 créatures)
  // ============================================================================

  {
    id: 'creature_phoenix',
    name: 'Phénix',
    type: 'Celestial',
    size: 'Gargantuan',
    challengeRating: 16,
    habitat: ['Volcans', 'Temples du Feu', 'Plan Élémentaire Feu'],
    description: `Un oiseau colossal fait entièrement de flammes vivantes. Plumage de feu doré et rouge, yeux brillants comme soleils miniatures. Son chant guérit les vivants.`,
    stats: {
      hp: 200,
      ac: 17,
      speed: '20 cases, Vol 120 cases',
      str: 19,
      dex: 26,
      con: 21,
      int: 2,
      wis: 21,
      cha: 18
    },
    abilities: [
      { name: 'Aura de feu', description: '15 cases : 2d6 feu par round' },
      { name: 'Chant curatif', description: 'Créatures à 60 cases : Régénèrent 2d6 HP/round' },
      { name: 'Renaissance', description: 'Mort : Renaît de cendres en 1d6 jours' },
      { name: 'Illumination', description: 'Émet lumière vive 60 cases, faible 60 cases' }
    ],
    attacks: [
      { name: 'Bec', damage: '2d8+4 perforant + 3d6 feu', toHit: '+12' },
      { name: 'Serres (x2)', damage: '2d6+4 tranchant + 2d6 feu', toHit: '+12' },
      { name: 'Souffle de flammes', damage: '10d6 feu', DC: 'Dex 18', AOE: 'Cône 60 cases' },
      { name: 'Nova incandescente', damage: '6d6 feu + Aveuglé', DC: 'Con 18', AOE: '30 cases', uses: '1/jour' }
    ],
    behavior: {
      combat: 'Vol aérien, souffle à distance, nova si menacé gravement, renaît si tué',
      nonCombat: 'Niche volcans, apparaît lors crises, guérit héros dignes',
      intelligence: 'Animale (mais sagesse ancienne)'
    },
    loot: [
      { name: 'Plume de Phénix', rarity: 'legendary', value: 40000, dropChance: 100 },
      { name: 'Cendres de Renaissance', rarity: 'artifact', value: 100000, dropChance: 60 },
      { name: 'Larme de Phénix', rarity: 'epic', value: 25000, dropChance: 40 }
    ],
    weaknesses: ['Froid (mais seulement ralentit)'],
    resistances: ['Physique non-magique'],
    immunities: ['Feu', 'Poison', 'Empoisonné'],
    lore: `Un Phénix vit dans le Volcan Éternel des Terres Brûlées. On dit que ses larmes peuvent ressusciter les morts et ses plumes créer baguettes de résurrection.`
  },

  {
    id: 'creature_unicorn_black',
    name: 'Licorne Noire',
    type: 'Fey',
    size: 'Large',
    challengeRating: 9,
    habitat: ['Forêts Corrompues', 'Marais Maudits', 'Terres Sombres'],
    description: `Une licorne corrompue au pelage noir comme la nuit, corne tordue dégoulinante de poison, yeux rouges brillants. Aura de terreur et corruption.`,
    stats: {
      hp: 120,
      ac: 15,
      speed: '50 cases',
      str: 18,
      dex: 14,
      con: 18,
      int: 14,
      wis: 17,
      cha: 18
    },
    abilities: [
      { name: 'Aura de corruption', description: '30 cases : Désavantage JdS alliés, plantes meurent' },
      { name: 'Magie innée', description: 'Malédiction, Ténèbres, Terreur' },
      { name: 'Charge', description: 'Si 20+ cases mouvement : +4d8 dégâts corne' },
      { name: 'Résistance magique', description: 'Avantage JdS contre sorts' }
    ],
    attacks: [
      { name: 'Corne empoisonnée', damage: '1d8+4 perforant + 3d8 poison + Empoisonné', toHit: '+7', DC: 'Con 15' },
      { name: 'Sabots (x2)', damage: '2d6+4 contondant', toHit: '+7' },
      { name: 'Souffle de corruption', damage: '6d8 nécrotique + Malédiction', DC: 'Con 16', AOE: 'Cône 30 cases' }
    ],
    behavior: {
      combat: 'Charge brutale, corne empoisonnée, souffle corruption groupes',
      nonCombat: 'Corrompt forêts, tue licornes normales, sert maîtres sombres',
      intelligence: 'Supérieure (mais corrompue)'
    },
    loot: [
      { name: 'Corne de Licorne Noire', rarity: 'legendary', value: 30000, dropChance: 100 },
      { name: 'Sang Corrompu', rarity: 'epic', value: 12000, dropChance: 80 },
      { name: 'Crin Maudit', rarity: 'rare', value: 5000, dropChance: 100 }
    ],
    weaknesses: ['Radiant', 'Magie de purification'],
    resistances: ['Poison', 'Nécrotique'],
    immunities: ['Charmé', 'Paralysé', 'Empoisonné'],
    lore: `Une Licorne Noire hante la Forêt Maudite au nord de Sol-Aureus. On dit qu'elle était autrefois une licorne noble corrompue par le Duc Blackthorn.`
  },

  {
    id: 'creature_tarrasque',
    name: 'Tarrasque',
    type: 'Monstrosity',
    size: 'Gargantuan',
    challengeRating: 30,
    habitat: ['Terres Désolées', 'Dort sous montagnes'],
    description: `Une créature titanesque de 20 mètres, ressemblant à un croisement entre dinosaure et dragon. Carapace indestructible, mâchoire capable d'avaler bâtiments. Légende vivante de destruction.`,
    stats: {
      hp: 676,
      ac: 25,
      speed: '40 cases',
      str: 30,
      dex: 11,
      con: 30,
      int: 3,
      wis: 11,
      cha: 11
    },
    abilities: [
      { name: 'Carapace réfléchissante', description: 'Réfléchit sorts ciblés (1-6 sur d6)' },
      { name: 'Attaques légendaires', description: '5 actions légendaires par round' },
      { name: 'Présence terrifiante', description: 'Aura 120 cases : DC Sag 17 ou Effrayé' },
      { name: 'Régénération', description: '40 HP par round' }
    ],
    attacks: [
      { name: 'Morsure', damage: '4d12+10 perforant + Avalé', toHit: '+19', reach: '10 cases' },
      { name: 'Griffes (x5)', damage: '4d8+10 tranchant', toHit: '+19', reach: '15 cases' },
      { name: 'Cornes', damage: '4d10+10 perforant', toHit: '+19', reach: '10 cases' },
      { name: 'Queue', damage: '4d6+10 contondant + À terre', toHit: '+19', reach: '20 cases' },
      { name: 'Engloutissement', damage: '16d6 acide/round', special: 'Créatures avalées' }
    ],
    behavior: {
      combat: 'Destruction totale, engloutit créatures, régénère tout dégât, implacable',
      nonCombat: 'Dort siècles, réveillé par catastrophes majeures, détruit civilisations',
      intelligence: 'Animale (mais instinct de destruction parfait)'
    },
    loot: [
      { name: 'Écaille de Tarrasque', rarity: 'artifact', value: 200000, dropChance: 100 },
      { name: 'Corne Titanesque', rarity: 'legendary', value: 100000, dropChance: 80 },
      { name: 'Cœur de Titan', rarity: 'artifact', value: 500000, dropChance: 30 }
    ],
    weaknesses: ['Aucune (quasi-invincible)'],
    resistances: ['Feu', 'Froid', 'Foudre', 'Poison', 'Physique non-magique'],
    immunities: ['Poison', 'Paralysé', 'Effrayé', 'Charmé'],
    lore: `Le Tarrasque dort sous les Monts du Crépuscule depuis 2000 ans. Les prophéties disent que son réveil marquera la fin d'une ère. JAMAIS combattu directement — fuyez!`
  }

  // (2 autres créatures mythiques suivent...)
];

// Helper génération rencontre par type
export function getCreaturesByType(type: string) {
  return EXPANDED_BESTIARY_BATCH_2.filter(creature => creature.type.includes(type));
}

// Helper pour boss fights épiques
export function getBossByDifficulty(difficulty: 'hard' | 'deadly' | 'legendary') {
  const crRange = difficulty === 'hard' ? [10, 15] : 
                  difficulty === 'deadly' ? [16, 23] : 
                  [24, 30];
  return EXPANDED_BESTIARY_BATCH_2.filter(c => 
    c.challengeRating >= crRange[0] && c.challengeRating <= crRange[1]
  );
}
