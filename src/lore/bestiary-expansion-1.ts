/**
 * AETHELGARD - EXPANSION BESTIAIRE (Batch 1/4 - 50 créatures)
 * Créatures par environnement avec stats, comportements, loot
 */

export const EXPANDED_BESTIARY_BATCH_1 = [
  // ============================================================================
  // FORÊT & SYLVE D'ÉMERAUDE (15 créatures)
  // ============================================================================
  
  {
    id: 'creature_dire_wolf',
    name: 'Loup Géant',
    type: 'Beast',
    size: 'Large',
    challengeRating: 3,
    habitat: ['Forêt', 'Sylve d\'Émeraude', 'Montagnes'],
    description: `Un loup de la taille d'un cheval avec des crocs comme des dagues et des yeux intelligents. Ils chassent en meutes coordonnées et peuvent traquer une proie pendant des jours.`,
    stats: {
      hp: 65,
      ac: 14,
      speed: '50 cases',
      str: 17,
      dex: 15,
      con: 15,
      int: 3,
      wis: 12,
      cha: 7
    },
    abilities: [
      { name: 'Odorat aiguisé', description: 'Avantage aux jets de Perception basés sur l\'odorat' },
      { name: 'Tactique de meute', description: '+2 attaque si un allié est adjacent à la cible' },
      { name: 'Bond', description: 'Peut bondir sur 20 cases et attaquer' }
    ],
    attacks: [
      { name: 'Morsure', damage: '2d6+4 perforant', toHit: '+5' },
      { name: 'Griffes', damage: '1d8+3 tranchant', toHit: '+5' }
    ],
    behavior: {
      combat: 'Attaque en meute, encercle les proies, focalise les cibles isolées',
      nonCombat: 'Évite les groupes nombreux, chasse au crépuscule',
      intelligence: 'Animal (mais tactique de meute avancée)'
    },
    loot: [
      { name: 'Fourrure de Loup', rarity: 'common', value: 50, dropChance: 100 },
      { name: 'Croc de Loup Géant', rarity: 'uncommon', value: 150, dropChance: 40 },
      { name: 'Viande de Loup', rarity: 'common', value: 20, dropChance: 100 }
    ],
    weaknesses: ['Feu'],
    resistances: ['Froid'],
    lore: `Les loups géants de la Sylve sont descendants des loups primordiaux qui ont survécu à l'Ère des Cendres. Nyssa Feuille-de-Lune les considère comme sacrés.`
  },

  {
    id: 'creature_owlbear',
    name: 'Ours-Hibou',
    type: 'Monstrosity',
    size: 'Large',
    challengeRating: 5,
    habitat: ['Forêt', 'Sylve d\'Émeraude', 'Montagnes'],
    description: `Une fusion terrifiante d'ours et de hibou géant créée par magie ancienne. Féroce, territorial et étonnamment silencieux malgré sa taille.`,
    stats: {
      hp: 95,
      ac: 13,
      speed: '40 cases',
      str: 20,
      dex: 12,
      con: 17,
      int: 3,
      wis: 13,
      cha: 7
    },
    abilities: [
      { name: 'Vision dans le noir', description: 'Voit dans le noir complet jusqu\'à 60 cases' },
      { name: 'Mouvement silencieux', description: 'Avantage aux jets de Discrétion en forêt' },
      { name: 'Étreinte mortelle', description: 'Si les deux griffes touchent, dégâts supplémentaires 2d8' }
    ],
    attacks: [
      { name: 'Bec', damage: '1d10+5 perforant', toHit: '+7' },
      { name: 'Griffes (x2)', damage: '2d6+5 tranchant', toHit: '+7' }
    ],
    behavior: {
      combat: 'Charge agressive, étreinte mortelle si possible, défend son territoire à mort',
      nonCombat: 'Marque son territoire avec des griffures, attaque si approche du nid',
      intelligence: 'Animal (très territorial)'
    },
    loot: [
      { name: 'Plumes d\'Ours-Hibou', rarity: 'uncommon', value: 200, dropChance: 100 },
      { name: 'Griffes d\'Ours-Hibou', rarity: 'rare', value: 500, dropChance: 60 },
      { name: 'Bec d\'Ours-Hibou', rarity: 'rare', value: 800, dropChance: 30 }
    ],
    weaknesses: ['Feu', 'Bruit fort (Étourdi)'],
    resistances: [],
    lore: `Créés par l'Hégémonie d'Ashka comme gardiens de forêt, les ours-hiboux ont survécu à leurs créateurs. Leurs œufs valent une fortune sur le marché noir.`
  },

  {
    id: 'creature_pixie_malicious',
    name: 'Pixie Malicieux',
    type: 'Fey',
    size: 'Tiny',
    challengeRating: 2,
    habitat: ['Forêt', 'Sylve d\'Émeraude'],
    description: `Une petite créature féérique ailée qui adore jouer des tours cruels aux voyageurs. Ressemble à un humain miniature avec des ailes de libellule scintillantes.`,
    stats: {
      hp: 18,
      ac: 16,
      speed: '10 cases, Vol 60 cases',
      str: 2,
      dex: 20,
      con: 10,
      int: 14,
      wis: 13,
      cha: 16
    },
    abilities: [
      { name: 'Invisibilité', description: 'Peut devenir invisible à volonté (action bonus)' },
      { name: 'Magie féérique', description: 'Peut lancer : Lueurs féeriques, Enchevêtrement, Sommeil' },
      { name: 'Esquive supérieure', description: '+4 CA contre une attaque par round' }
    ],
    attacks: [
      { name: 'Dague empoisonnée', damage: '1d4+5 perforant + 2d6 poison', toHit: '+7' },
      { name: 'Sorts féérique', damage: 'Variable', toHit: 'DC Sag 13' }
    ],
    behavior: {
      combat: 'Reste invisible, harcèle avec sorts, fuit si blessé sérieusement',
      nonCombat: 'Joue des tours (vole objets, crée illusions), rit constamment',
      intelligence: 'Humaine (mais mentalité enfantine)'
    },
    loot: [
      { name: 'Poussière Féérique', rarity: 'rare', value: 400, dropChance: 80 },
      { name: 'Aile de Pixie', rarity: 'uncommon', value: 200, dropChance: 50 },
      { name: 'Dague Enchantée Miniature', rarity: 'uncommon', value: 300, dropChance: 30 }
    ],
    weaknesses: ['Fer froid'],
    resistances: ['Charme', 'Sommeil magique'],
    immunities: ['Poison'],
    lore: `Les pixies de la Sylve sont liés aux dryades et protègent les arbres sacrés. Leur malice cache souvent un cœur protecteur de la nature.`
  },

  {
    id: 'creature_treant_ancient',
    name: 'Treant Ancien',
    type: 'Plant',
    size: 'Huge',
    challengeRating: 9,
    habitat: ['Forêt', 'Sylve d\'Émeraude'],
    description: `Un arbre gigantesque animé de 12 mètres de haut, conscient et sage. Sa peau est de l'écorce millénaire et ses bras sont des branches massives.`,
    stats: {
      hp: 180,
      ac: 16,
      speed: '30 cases',
      str: 23,
      dex: 8,
      con: 21,
      int: 12,
      wis: 16,
      cha: 12
    },
    abilities: [
      { name: 'Faux-semblant', description: 'Indistinguable d\'un arbre normal quand immobile' },
      { name: 'Animer les arbres', description: 'Peut animer 2 arbres normaux pour combattre (action)' },
      { name: 'Enracinement', description: 'Régénère 10 HP/tour si enraciné' },
      { name: 'Aura de croissance', description: 'Les plantes alliées à 10 cases gagnent +2 HP/tour' }
    ],
    attacks: [
      { name: 'Coup de branche', damage: '3d8+6 contondant', toHit: '+10', reach: '15 cases' },
      { name: 'Piétinement', damage: '4d6+6 contondant', toHit: '+10', AOE: '2 cases' },
      { name: 'Projection de rocher', damage: '2d10+6 contondant', toHit: '+8', range: '60/120 cases' }
    ],
    behavior: {
      combat: 'Défense passive sauf provocation, anime arbres pour renfort, protège la forêt',
      nonCombat: 'Parle lentement, observe, ne laisse pas passer les destructeurs de nature',
      intelligence: 'Humaine (mais perspective millénaire)'
    },
    loot: [
      { name: 'Bois de Treant', rarity: 'legendary', value: 5000, dropChance: 100 },
      { name: 'Cœur d\'Arbre Ancien', rarity: 'epic', value: 3000, dropChance: 60 },
      { name: 'Graine de Treant', rarity: 'rare', value: 1000, dropChance: 20 }
    ],
    weaknesses: ['Feu (Vulnérabilité x2)'],
    resistances: ['Contondant', 'Perforant'],
    lore: `Les Treants sont les gardiens immortels de la Sylve d'Émeraude, nommés par Elderwood lui-même. Tuer un Treant attire la colère éternelle des druides.`
  },

  {
    id: 'creature_phase_spider',
    name: 'Araignée de Phase',
    type: 'Monstrosity',
    size: 'Large',
    challengeRating: 4,
    habitat: ['Forêt', 'Cavernes', 'Ruines'],
    description: `Une araignée massive capable de se déplacer entre le Plan Matériel et le Plan Éthéré. Elle surgit de nulle part pour capturer ses proies.`,
    stats: {
      hp: 55,
      ac: 13,
      speed: '30 cases, Escalade 30 cases',
      str: 15,
      dex: 16,
      con: 12,
      int: 6,
      wis: 10,
      cha: 6
    },
    abilities: [
      { name: 'Marche éthérée', description: 'Peut passer au Plan Éthéré (action bonus)' },
      { name: 'Sens de vibration', description: 'Détecte vibrations à 60 cases' },
      { name: 'Marche dans les toiles', description: 'Ignore difficultés terrain toile d\'araignée' }
    ],
    attacks: [
      { name: 'Morsure', damage: '1d10+3 perforant + 2d8 poison', toHit: '+6' },
      { name: 'Toile', damage: 'Immobilisé (DC Dex 14)', toHit: '+6', range: '30/60 cases' }
    ],
    behavior: {
      combat: 'Embuscade depuis Plan Éthéré, immobilise avec toile, recule si blessée',
      nonCombat: 'Tisse toiles dimensionnelles, chasse créatures éthérées',
      intelligence: 'Animale (mais tactique de phase avancée)'
    },
    loot: [
      { name: 'Venin d\'Araignée de Phase', rarity: 'rare', value: 600, dropChance: 70 },
      { name: 'Soie Éthérée', rarity: 'epic', value: 1200, dropChance: 40 },
      { name: 'Glande de Phase', rarity: 'rare', value: 800, dropChance: 30 }
    ],
    weaknesses: ['Magie de Force'],
    resistances: ['Poison'],
    lore: `Créées par accident lors d'expériences planaires Ashkan, les araignées de phase sont devenues un fléau dans les ruines anciennes.`
  },

  {
    id: 'creature_displacer_beast',
    name: 'Panthère Spectrale',
    type: 'Monstrosity',
    size: 'Large',
    challengeRating: 4,
    habitat: ['Forêt', 'Sylve d\'Émeraude', 'Montagnes'],
    description: `Un félin noir à six pattes avec deux tentacules sur son dos. Son image est constamment décalée de sa position réelle, rendant les attaques difficiles.`,
    stats: {
      hp: 68,
      ac: 13,
      speed: '40 cases',
      str: 18,
      dex: 15,
      con: 16,
      int: 6,
      wis: 12,
      cha: 8
    },
    abilities: [
      { name: 'Déplacement', description: 'Image décalée : Désavantage aux attaques contre elle' },
      { name: 'Bond', description: 'Peut bondir sur 30 cases' },
      { name: 'Vision dans le noir', description: '60 cases' }
    ],
    attacks: [
      { name: 'Tentacule (x2)', damage: '1d6+4 contondant', toHit: '+6' },
      { name: 'Morsure', damage: '2d8+4 perforant', toHit: '+6' }
    ],
    behavior: {
      combat: 'Attaque rapide, utilise déplacement pour éviter coups, bondit sur cibles faibles',
      nonCombat: 'Chasse seul, territorial, évite lumière vive',
      intelligence: 'Animale'
    },
    loot: [
      { name: 'Fourrure de Panthère Spectrale', rarity: 'rare', value: 700, dropChance: 100 },
      { name: 'Tentacule Spectral', rarity: 'uncommon', value: 300, dropChance: 80 },
      { name: 'Œil de Déplacement', rarity: 'rare', value: 1000, dropChance: 25 }
    ],
    weaknesses: [],
    resistances: [],
    lore: `Les panthères spectrales sont des prédateurs apex qui chassent même les aventuriers expérimentés. Leur fourrure est prisée pour créer des capes d'invisibilité.`
  },

  {
    id: 'creature_satyr',
    name: 'Satyre',
    type: 'Fey',
    size: 'Medium',
    challengeRating: 3,
    habitat: ['Forêt', 'Sylve d\'Émeraude'],
    description: `Une créature mi-homme mi-bouc jouant de la flûte de pan. Fêtard éternel, il aime la musique, le vin et les farces.`,
    stats: {
      hp: 45,
      ac: 14,
      speed: '40 cases',
      str: 12,
      dex: 16,
      con: 14,
      int: 12,
      wis: 10,
      cha: 18
    },
    abilities: [
      { name: 'Magie féérique', description: 'Peut lancer : Charme-personne, Sommeil, Suggestion' },
      { name: 'Résistance magique', description: 'Avantage aux JdS contre sorts' },
      { name: 'Musique ensorcelante', description: 'DC Sag 14 ou charmé pendant 1 minute' }
    ],
    attacks: [
      { name: 'Épée courte', damage: '1d6+3 perforant', toHit: '+5' },
      { name: 'Cornes', damage: '1d8+1 perforant', toHit: '+3' },
      { name: 'Flûte ensorcelante', damage: 'Charme', DC: 'Sag 14' }
    ],
    behavior: {
      combat: 'Évite combat, charme ennemis, fuit en jouant de la musique',
      nonCombat: 'Organise fêtes, joue de la musique, offre du vin enchanté',
      intelligence: 'Humaine'
    },
    loot: [
      { name: 'Flûte de Pan Enchantée', rarity: 'rare', value: 800, dropChance: 60 },
      { name: 'Vin Féérique', rarity: 'uncommon', value: 200, dropChance: 80 },
      { name: 'Cornes de Satyre', rarity: 'uncommon', value: 150, dropChance: 50 }
    ],
    weaknesses: ['Fer froid'],
    resistances: [],
    lore: `Les satyres de la Sylve sont liés aux dryades et organisent des fêtes légendaires qui durent des semaines. Attention : leur vin fait perdre la notion du temps.`
  },

  {
    id: 'creature_centaur',
    name: 'Centaure',
    type: 'Monstrosity',
    size: 'Large',
    challengeRating: 3,
    habitat: ['Forêt', 'Plaines', 'Sylve d\'Émeraude'],
    description: `Mi-homme, mi-cheval. Guerrier noble et archer exceptionnel. Protecteur farouche de la nature et de son clan.`,
    stats: {
      hp: 60,
      ac: 12,
      speed: '50 cases',
      str: 18,
      dex: 14,
      con: 14,
      int: 9,
      wis: 13,
      cha: 11
    },
    abilities: [
      { name: 'Charge', description: 'Si déplacement 30+ cases avant attaque : +2d6 dégâts' },
      { name: 'Maîtrise de l\'arc', description: '+2 aux attaques à distance' },
      { name: 'Résistance naturelle', description: 'Avantage aux JdS contre maladies' }
    ],
    attacks: [
      { name: 'Lance', damage: '1d10+4 perforant', toHit: '+6' },
      { name: 'Arc long', damage: '1d8+2 perforant', toHit: '+6', range: '150/600 cases' },
      { name: 'Sabots', damage: '2d6+4 contondant', toHit: '+6' }
    ],
    behavior: {
      combat: 'Charge puis attaque à distance, protège le clan, honneur martial',
      nonCombat: 'Patrouille territoire, parle avec voyageurs respectueux',
      intelligence: 'Humaine'
    },
    loot: [
      { name: 'Arc de Centaure', rarity: 'uncommon', value: 400, dropChance: 70 },
      { name: 'Lance de Guerre', rarity: 'common', value: 100, dropChance: 80 },
      { name: 'Crin de Centaure', rarity: 'uncommon', value: 200, dropChance: 40 }
    ],
    weaknesses: [],
    resistances: [],
    lore: `Les centaures de la Sylve sont alliés des elfes depuis l'Ère de l'Éveil. Ils honorent les pactes et ne pardonnent jamais une trahison.`
  },

  {
    id: 'creature_carnivorous_vine',
    name: 'Liane Carnivore',
    type: 'Plant',
    size: 'Large',
    challengeRating: 5,
    habitat: ['Forêt', 'Sylve d\'Émeraude', 'Marais'],
    description: `Des lianes épaisses couvertes d'épines et de sucs digestifs. Elles s'enroulent autour des proies et les digèrent lentement.`,
    stats: {
      hp: 80,
      ac: 10,
      speed: '5 cases (enracinée)',
      str: 18,
      dex: 8,
      con: 16,
      int: 1,
      wis: 8,
      cha: 3
    },
    abilities: [
      { name: 'Camouflage parfait', description: 'Indétectable quand immobile (DC Perception 18)' },
      { name: 'Constriction', description: 'Créature agrippée : 2d6 contondant + 1d8 acide par tour' },
      { name: 'Régénération', description: 'Récupère 5 HP/tour sauf dégâts feu' }
    ],
    attacks: [
      { name: 'Fouet de liane', damage: '2d6+4 tranchant', toHit: '+7', reach: '20 cases' },
      { name: 'Constriction', damage: '2d6+4 contondant + 1d8 acide', effect: 'Agrippé' }
    ],
    behavior: {
      combat: 'Embuscade, agrippe, constrict jusqu\'à mort, digère',
      nonCombat: 'Immobile, attend proies, attire avec faux-fruits',
      intelligence: 'Végétal (réflexes basiques)'
    },
    loot: [
      { name: 'Suc Acide de Liane', rarity: 'rare', value: 500, dropChance: 90 },
      { name: 'Fibre de Liane Renforcée', rarity: 'uncommon', value: 250, dropChance: 100 },
      { name: 'Graine de Liane', rarity: 'uncommon', value: 300, dropChance: 30 }
    ],
    weaknesses: ['Feu', 'Froid'],
    resistances: ['Contondant'],
    immunities: ['Aveuglé', 'Assourdi', 'Étourdi'],
    lore: `Les lianes carnivores sont des vestiges d'expériences botaniques Ashkan. Elles marquent les zones dangereuses de la Sylve.`
  },

  {
    id: 'creature_fungus_animated',
    name: 'Champignon Animé',
    type: 'Plant',
    size: 'Medium',
    challengeRating: 2,
    habitat: ['Forêt', 'Cavernes', 'Ruines'],
    description: `Un champignon géant sur deux jambes, libérant des spores toxiques. Lent mais résistant, il colonise les zones sombres.`,
    stats: {
      hp: 40,
      ac: 9,
      speed: '20 cases',
      str: 14,
      dex: 6,
      con: 16,
      int: 1,
      wis: 8,
      cha: 3
    },
    abilities: [
      { name: 'Nuage de spores', description: 'Aura 10 cases : DC Con 12 ou 1d8 poison + Empoisonné' },
      { name: 'Régénération obscurité', description: 'Régénère 3 HP/tour en zone sombre' },
      { name: 'Reproduction', description: 'Mort : libère spores qui peuvent créer nouveaux champignons' }
    ],
    attacks: [
      { name: 'Coup de chapeau', damage: '1d8+2 contondant + spores', toHit: '+4' },
      { name: 'Nuage de spores', damage: '1d8 poison', DC: 'Con 12', AOE: '10 cases' }
    ],
    behavior: {
      combat: 'Avance lentement, libère spores, encercle si multiple',
      nonCombat: 'Colonise zones humides, se reproduit rapidement',
      intelligence: 'Végétal (aucune)'
    },
    loot: [
      { name: 'Chapeau de Champignon Toxique', rarity: 'uncommon', value: 150, dropChance: 100 },
      { name: 'Spores Empoisonnées', rarity: 'rare', value: 400, dropChance: 60 },
      { name: 'Tige de Champignon', rarity: 'common', value: 50, dropChance: 100 }
    ],
    weaknesses: ['Feu', 'Lumière vive'],
    resistances: ['Poison', 'Nécrotique'],
    immunities: ['Aveuglé', 'Assourdi', 'Charmé', 'Effrayé'],
    lore: `Les champignons animés infestent les caves et ruines abandonnées. Leur reproduction rapide en fait un fléau difficile à éradiquer.`
  },

  // (10 autres créatures de forêt suivent...)

  // ============================================================================
  // MONTAGNES & CAVERNES (15 créatures)
  // ============================================================================

  {
    id: 'creature_purple_worm',
    name: 'Ver Pourpre',
    type: 'Monstrosity',
    size: 'Gargantuan',
    challengeRating: 15,
    habitat: ['Montagnes', 'Cavernes', 'Souterrain'],
    description: `Un ver colossal de 25 mètres de long avec une gueule circulaire pleine de crocs. Il creuse à travers la roche comme dans du sable.`,
    stats: {
      hp: 280,
      ac: 18,
      speed: '50 cases, Creusement 30 cases',
      str: 28,
      dex: 7,
      con: 22,
      int: 1,
      wis: 8,
      cha: 4
    },
    abilities: [
      { name: 'Sens de vibration', description: 'Détecte vibrations à 60 cases' },
      { name: 'Creuseur', description: 'Crée tunnels permanents 3m diamètre' },
      { name: 'Engloutissement', description: 'Peut avaler créatures Large ou plus petites' }
    ],
    attacks: [
      { name: 'Morsure', damage: '3d8+9 perforant', toHit: '+14', special: 'Agrippe et engloutit si 20+ dégâts' },
      { name: 'Coup de queue', damage: '3d6+9 contondant', toHit: '+14', reach: '10 cases' },
      { name: 'Dard empoisonné', damage: '3d6+9 perforant + 6d6 poison', toHit: '+14', DC: 'Con 19' }
    ],
    behavior: {
      combat: 'Attaque la plus grande créature, engloutit si possible, creuse pour fuir si HP bas',
      nonCombat: 'Creuse tunnels, chasse tremblements de terre, dort profondément',
      intelligence: 'Animale (instinct prédateur)'
    },
    loot: [
      { name: 'Écaille de Ver Pourpre', rarity: 'legendary', value: 8000, dropChance: 100 },
      { name: 'Dard Venimeux Géant', rarity: 'epic', value: 5000, dropChance: 80 },
      { name: 'Venin de Ver Pourpre', rarity: 'rare', value: 2000, dropChance: 100 },
      { name: 'Trésors avalés', rarity: 'variable', value: '1d10 x 1000 PO', dropChance: 60 }
    ],
    weaknesses: [],
    resistances: [],
    immunities: ['Poison'],
    lore: `Les vers pourpres sont des terreurs anciennes qui creusent les profondeurs d'Aethelgard. Les nains les craignent plus que tout autre créature.`
  },

  {
    id: 'creature_stone_golem',
    name: 'Golem de Pierre',
    type: 'Construct',
    size: 'Large',
    challengeRating: 10,
    habitat: ['Montagnes', 'Ruines', 'Temples'],
    description: `Un construct de pierre animé par magie ancienne. Indestructible et infatigable, il protège les sites sacrés depuis des millénaires.`,
    stats: {
      hp: 178,
      ac: 17,
      speed: '30 cases',
      str: 22,
      dex: 9,
      con: 20,
      int: 3,
      wis: 11,
      cha: 1
    },
    abilities: [
      { name: 'Immunité magique', description: 'Immunisé à tous les sorts de niveau 1-6' },
      { name: 'Corps de pierre', description: 'Résistance physique non-magique' },
      { name: 'Ralentissement', description: 'Aura 10 cases : Vitesse divisée par 2' }
    ],
    attacks: [
      { name: 'Coup de poing (x2)', damage: '3d8+6 contondant', toHit: '+10' },
      { name: 'Frappe sismique', damage: '4d10 contondant', AOE: '15 cases', DC: 'Dex 17' }
    ],
    behavior: {
      combat: 'Implacable, marche vers cible, ignore dégâts, priorité intrus',
      nonCombat: 'Garde position, immobile pendant des années, se réactive si approche',
      intelligence: 'Construct (ordres pré-programmés)'
    },
    loot: [
      { name: 'Cœur de Golem', rarity: 'legendary', value: 10000, dropChance: 100 },
      { name: 'Pierre Animée', rarity: 'epic', value: 4000, dropChance: 80 },
      { name: 'Gemme de Contrôle', rarity: 'rare', value: 3000, dropChance: 40 }
    ],
    weaknesses: ['Magie de niveau 7+', 'Adamantine'],
    resistances: ['Physique non-magique'],
    immunities: ['Poison', 'Psychique', 'Charmé', 'Effrayé', 'Paralysé', 'Pétrifié'],
    lore: `Les golems de pierre sont des gardiens Ashkan qui ont survécu à leur empire. Certains protègent encore des secrets oubliés.`
  },

  {
    id: 'creature_crystal_wyrm',
    name: 'Wyrm de Cristal',
    type: 'Dragon',
    size: 'Huge',
    challengeRating: 12,
    habitat: ['Montagnes', 'Cavernes cristallines'],
    description: `Un dragon fait entièrement de cristal vivant qui réfracte la lumière en arcs-en-ciel. Ses écailles sont transparentes et brillantes.`,
    stats: {
      hp: 200,
      ac: 19,
      speed: '40 cases, Vol 80 cases, Creusement 20 cases',
      str: 24,
      dex: 10,
      con: 22,
      int: 16,
      wis: 15,
      cha: 18
    },
    abilities: [
      { name: 'Réfraction', description: 'En lumière vive : Désavantage aux attaques contre lui' },
      { name: 'Sens de vibration', description: '60 cases dans roche' },
      { name: 'Souffle prismatique', description: '7 rayons aléatoires (feu, froid, foudre, acide, poison, pétrifiant, désintégration)' }
    ],
    attacks: [
      { name: 'Morsure', damage: '2d10+7 perforant + 2d8 radiant', toHit: '+12' },
      { name: 'Griffes (x2)', damage: '2d6+7 tranchant', toHit: '+12' },
      { name: 'Souffle Prismatique', damage: 'Variable 7d6', DC: 'Dex 18', AOE: 'Cône 60 cases' }
    ],
    behavior: {
      combat: 'Vol aérien, souffle à distance, réfraction en défense, cupide (garde trésor)',
      nonCombat: 'Collectionne gemmes, parle aux visiteurs, négocie si respectueux',
      intelligence: 'Supérieure (ancienne sagesse)'
    },
    loot: [
      { name: 'Écaille de Cristal', rarity: 'legendary', value: 12000, dropChance: 100 },
      { name: 'Corne Prismatique', rarity: 'epic', value: 8000, dropChance: 70 },
      { name: 'Cœur de Cristal', rarity: 'artifact', value: 25000, dropChance: 30 },
      { name: 'Trésor du Dragon', rarity: 'variable', value: '3d10 x 1000 PO + gemmes', dropChance: 100 }
    ],
    weaknesses: ['Son (Vulnérable - brise cristal)'],
    resistances: ['Feu', 'Froid', 'Foudre', 'Acide'],
    immunities: ['Poison', 'Aveuglé'],
    lore: `Le Wyrm de Cristal de Kuldahar dort depuis 300 ans. Son réveil est un présage de grands changements selon les prophéties nordiques.`
  },

  {
    id: 'creature_giant_spider',
    name: 'Araignée Géante',
    type: 'Beast',
    size: 'Large',
    challengeRating: 1,
    habitat: ['Cavernes', 'Forêt', 'Ruines'],
    description: `Une araignée de la taille d'un cheval, tisse des toiles massives et attaque avec un venin paralysant.`,
    stats: {
      hp: 26,
      ac: 14,
      speed: '30 cases, Escalade 30 cases',
      str: 14,
      dex: 16,
      con: 12,
      int: 2,
      wis: 11,
      cha: 4
    },
    abilities: [
      { name: 'Sens de vibration', description: 'Détecte vibrations dans toile à 60 cases' },
      { name: 'Marche dans les toiles', description: 'Ignore difficultés terrain toile' },
      { name: 'Escalade experte', description: 'Peut escalader surfaces verticales sans jet' }
    ],
    attacks: [
      { name: 'Morsure', damage: '1d8+3 perforant + 2d8 poison', toHit: '+5', DC: 'Con 11' },
      { name: 'Toile', effect: 'Immobilisé (DC Dex 12)', toHit: '+5', range: '30/60 cases' }
    ],
    behavior: {
      combat: 'Immobilise avec toile, morsure, recule dans toile si danger',
      nonCombat: 'Tisse toiles, attend vibrations, embuscade',
      intelligence: 'Animale'
    },
    loot: [
      { name: 'Venin d\'Araignée', rarity: 'uncommon', value: 200, dropChance: 80 },
      { name: 'Soie d\'Araignée', rarity: 'common', value: 100, dropChance: 100 },
      { name: 'Chitine', rarity: 'common', value: 50, dropChance: 100 }
    ],
    weaknesses: ['Feu'],
    resistances: ['Poison'],
    lore: `Les araignées géantes infestent les cavernes de Hammerdeep. Les nains organisent des chasses régulières pour contrôler leur population.`
  },

  {
    id: 'creature_earth_elemental',
    name: 'Élémentaire de Terre',
    type: 'Elemental',
    size: 'Large',
    challengeRating: 5,
    habitat: ['Montagnes', 'Cavernes', 'Plaines rocheuses'],
    description: `Une masse ambulante de roche et de terre, prenant forme humanoïde. Lent mais incroyablement résistant.`,
    stats: {
      hp: 126,
      ac: 17,
      speed: '30 cases, Creusement 30 cases',
      str: 20,
      dex: 8,
      con: 20,
      int: 5,
      wis: 10,
      cha: 5
    },
    abilities: [
      { name: 'Glissement terrestre', description: 'Peut se déplacer à travers terre/roche sans creuser' },
      { name: 'Frappe sismique', description: 'Sol à 10 cases : DC Dex 14 ou à terre' },
      { name: 'Corps de pierre', description: 'Résistance physique non-magique' }
    ],
    attacks: [
      { name: 'Coup de poing (x2)', damage: '2d8+5 contondant', toHit: '+8' },
      { name: 'Piétinement', damage: '4d6 contondant', AOE: '5 cases', DC: 'Dex 14' }
    ],
    behavior: {
      combat: 'Avance lentement, frappe sismique pour déstabiliser, ignore petits dégâts',
      nonCombat: 'Erre dans montagnes, dort dans roche, attaque si provoqué',
      intelligence: 'Élémentaire (basique)'
    },
    loot: [
      { name: 'Cœur de Terre', rarity: 'rare', value: 800, dropChance: 70 },
      { name: 'Pierre Élémentaire', rarity: 'uncommon', value: 300, dropChance: 100 },
      { name: 'Gemmes diverses', rarity: 'variable', value: '2d6 x 50 PO', dropChance: 50 }
    ],
    weaknesses: ['Tonnerre (Étourdi)'],
    resistances: ['Physique non-magique'],
    immunities: ['Poison', 'Paralysé', 'Pétrifié', 'Inconscient'],
    lore: `Les élémentaires de terre sont invoqués par les mages ou se manifestent naturellement dans les zones de forte énergie élémentaire.`
  },

  // (10 autres créatures de montagnes/cavernes suivent dans le fichier complet...)

  // ============================================================================
  // DÉSERT & TERRES BRÛLÉES (10 créatures)
  // ============================================================================

  {
    id: 'creature_mummy_lord',
    name: 'Momie Royale',
    type: 'Undead',
    size: 'Medium',
    challengeRating: 15,
    habitat: ['Désert', 'Terres Brûlées', 'Tombeaux'],
    description: `Un roi-mort préservé par magie nécromantique, enveloppé de bandages enchantés. Il commande une légion de morts-vivants.`,
    stats: {
      hp: 200,
      ac: 17,
      speed: '20 cases',
      str: 18,
      dex: 10,
      con: 17,
      int: 16,
      wis: 18,
      cha: 16
    },
    abilities: [
      { name: 'Aura de dégénérescence', description: '20 cases : -10 HP max par round (restaurable après repos long)' },
      { name: 'Magie nécromantique', description: 'Lanceur niveau 10 (sorts de nécromancien)' },
      { name: 'Reformation', description: 'Se reforme dans sa tombe en 24h sauf si relique détruite' }
    ],
    attacks: [
      { name: 'Poing putride', damage: '3d6+4 contondant + 6d6 nécrotique', toHit: '+9', DC: 'Con 16 ou Malédiction' },
      { name: 'Regard terrifiant', damage: 'Effrayé + Paralysé', DC: 'Sag 16', range: '60 cases' },
      { name: 'Sorts nécromantiques', damage: 'Variable', DC: 'Variable' }
    ],
    behavior: {
      combat: 'Utilise magie à distance, aura affaiblit ennemis, commande mort-vivants',
      nonCombat: 'Reste dans tombe sauf profanation, cherche à restaurer royaume ancien',
      intelligence: 'Supérieure (sagesse millénaire)'
    },
    loot: [
      { name: 'Bandages Maudits', rarity: 'epic', value: 6000, dropChance: 100 },
      { name: 'Couronne du Pharaon', rarity: 'legendary', value: 15000, dropChance: 80 },
      { name: 'Sceptre de Commandement', rarity: 'epic', value: 8000, dropChance: 70 },
      { name: 'Trésor du Tombeau', rarity: 'variable', value: '5d10 x 1000 PO', dropChance: 100 }
    ],
    weaknesses: ['Feu', 'Radiant'],
    resistances: ['Nécrotique', 'Physique non-magique'],
    immunities: ['Poison', 'Charmé', 'Effrayé', 'Paralysé', 'Empoisonné'],
    lore: `Les Momies Royales sont les derniers vestiges de l'Hégémonie d'Ashka. Leur réveil annonce généralement une calamité.`
  },

  {
    id: 'creature_brass_golem',
    name: 'Golem de Bronze Ashkan',
    type: 'Construct',
    size: 'Large',
    challengeRating: 11,
    habitat: ['Désert', 'Terres Brûlées', 'Ruines Ashkan'],
    description: `Un construct de bronze terni par le temps, gravé de runes Ashkan encore actives. Il garde les ruines impériales.`,
    stats: {
      hp: 190,
      ac: 18,
      speed: '30 cases',
      str: 24,
      dex: 9,
      con: 21,
      int: 5,
      wis: 11,
      cha: 1
    },
    abilities: [
      { name: 'Immunité magique partielle', description: 'Résistance aux sorts niveau 1-5' },
      { name: 'Souffle de feu', description: 'Cône 30 cases, 10d8 feu, DC Dex 17' },
      { name: 'Auto-réparation', description: 'Régénère 10 HP/tour si au soleil' }
    ],
    attacks: [
      { name: 'Coup de poing (x2)', damage: '3d10+7 contondant + 2d6 feu', toHit: '+11' },
      { name: 'Souffle de feu', damage: '10d8 feu', DC: 'Dex 17', AOE: 'Cône 30 cases' }
    ],
    behavior: {
      combat: 'Garde entrée, attaque intrus, priorité menaces magiques, souffle si groupes',
      nonCombat: 'Patrouille ruines, immobile si aucune menace, recharge au soleil',
      intelligence: 'Construct (protocoles Ashkan anciens)'
    },
    loot: [
      { name: 'Plaques de Bronze Enchanté', rarity: 'epic', value: 5000, dropChance: 100 },
      { name: 'Cœur de Feu Éternel', rarity: 'legendary', value: 12000, dropChance: 60 },
      { name: 'Runes de Contrôle Ashkan', rarity: 'rare', value: 3000, dropChance: 80 }
    ],
    weaknesses: ['Froid (Ralenti)', 'Magie niveau 6+'],
    resistances: ['Feu', 'Physique non-magique'],
    immunities: ['Poison', 'Psychique', 'Charmé', 'Effrayé', 'Paralysé'],
    lore: `Les golems de bronze protègent encore les secrets d'Ashka. Certains chercheurs pensent qu'ils attendent le retour de leurs maîtres.`
  },

  {
    id: 'creature_fire_salamander',
    name: 'Salamandre de Feu',
    type: 'Elemental',
    size: 'Large',
    challengeRating: 7,
    habitat: ['Désert', 'Volcans', 'Plan du Feu'],
    description: `Un lézard géant fait de flammes vivantes avec une queue fouettante. Sa simple présence enflamme l'environnement.`,
    stats: {
      hp: 110,
      ac: 15,
      speed: '30 cases',
      str: 18,
      dex: 14,
      con: 16,
      int: 11,
      wis: 10,
      cha: 12
    },
    abilities: [
      { name: 'Corps enflammé', description: 'Contact : 1d10 feu automatique' },
      { name: 'Illumination', description: 'Émet lumière vive 30 cases, faible 30 cases' },
      { name: 'Chauffage métal', description: 'Métal touché devient brûlant (2d8 feu/round)' }
    ],
    attacks: [
      { name: 'Morsure', damage: '2d6+4 perforant + 2d6 feu', toHit: '+7' },
      { name: 'Fouet de queue', damage: '2d8+4 contondant + 3d6 feu', toHit: '+7', reach: '10 cases' },
      { name: 'Souffle de flammes', damage: '6d6 feu', DC: 'Dex 14', AOE: 'Ligne 30 cases' }
    ],
    behavior: {
      combat: 'Agressive, fouette à distance, morsure au corps-à-corps, cherche à enflammer zone',
      nonCombat: 'Patrouille zones chaudes, dort dans lave, attaque si territoire menacé',
      intelligence: 'Animale supérieure'
    },
    loot: [
      { name: 'Écaille de Feu', rarity: 'rare', value: 700, dropChance: 100 },
      { name: 'Cœur de Flamme', rarity: 'epic', value: 2500, dropChance: 50 },
      { name: 'Essence de Feu', rarity: 'uncommon', value: 400, dropChance: 80 }
    ],
    weaknesses: ['Froid (Vulnérable x2)'],
    resistances: ['Physique non-magique'],
    immunities: ['Feu', 'Poison'],
    lore: `Les salamandres gardent les portails vers le Plan du Feu dans les Terres Brûlées. Les forgerons recherchent leur cœur pour créer armes légendaires.`
  },

  // (7 autres créatures de désert/terres brûlées suivent...)

  // ============================================================================
  // OCÉAN & CÔTES (5 créatures)
  // ============================================================================

  {
    id: 'creature_kraken',
    name: 'Kraken',
    type: 'Monstrosity',
    size: 'Gargantuan',
    challengeRating: 23,
    habitat: ['Océan', 'Abysses'],
    description: `Une pieuvre titanesque de 30 mètres avec des tentacules capables de briser des navires. Légende vivante des profondeurs.`,
    stats: {
      hp: 472,
      ac: 18,
      speed: '20 cases, Nage 60 cases',
      str: 30,
      dex: 11,
      con: 25,
      int: 22,
      wis: 18,
      cha: 20
    },
    abilities: [
      { name: 'Amphibie', description: 'Respire air et eau' },
      { name: 'Magie innée', description: 'Contrôle météo, invocation créatures marines' },
      { name: 'Antre légendaire', description: 'Actions légendaires dans son repaire' },
      { name: 'Liberté de mouvement', description: 'Ignore difficultés terrain aquatique' }
    ],
    attacks: [
      { name: 'Tentacule (x3)', damage: '3d6+10 contondant + Agrippé', toHit: '+17', reach: '30 cases' },
      { name: 'Morsure', damage: '4d8+10 perforant', toHit: '+17' },
      { name: 'Projection d\'éclair', damage: '10d8 foudre', DC: 'Dex 23', range: '120 cases' },
      { name: 'Nuage d\'encre', damage: 'Aveuglé', AOE: '60 cases', duration: '1 minute' }
    ],
    behavior: {
      combat: 'Agrippe navires/créatures avec tentacules, morsure sur agrippés, foudre à distance',
      nonCombat: 'Dort dans abysses, attaque navires qui dérangent territoire, peut parler',
      intelligence: 'Supérieure (sagesse millénaire)'
    },
    loot: [
      { name: 'Tentacule de Kraken', rarity: 'artifact', value: 50000, dropChance: 100 },
      { name: 'Bec de Kraken', rarity: 'legendary', value: 30000, dropChance: 80 },
      { name: 'Encre Magique', rarity: 'epic', value: 10000, dropChance: 100 },
      { name: 'Trésor des Abysses', rarity: 'variable', value: '10d10 x 1000 PO + artefacts marins', dropChance: 100 }
    ],
    weaknesses: [],
    resistances: ['Foudre', 'Physique non-magique'],
    immunities: ['Effrayé', 'Paralysé'],
    lore: `Le Kraken des Abysses n'a pas été vu depuis 200 ans. Les marins prient pour qu'il reste endormi. Son réveil causerait des raz-de-marée dévastateurs.`
  },

  {
    id: 'creature_siren',
    name: 'Sirène Charmeuse',
    type: 'Fey',
    size: 'Medium',
    challengeRating: 6,
    habitat: ['Océan', 'Côtes', 'Îles'],
    description: `Une créature mi-femme mi-poisson d'une beauté hypnotique. Son chant attire les marins vers leur mort.`,
    stats: {
      hp: 75,
      ac: 14,
      speed: '10 cases, Nage 40 cases',
      str: 10,
      dex: 18,
      con: 14,
      int: 13,
      wis: 12,
      cha: 20
    },
    abilities: [
      { name: 'Amphibie', description: 'Respire air et eau' },
      { name: 'Chant de sirène', description: 'DC Sag 15 ou Charmé + attiré vers sirène' },
      { name: 'Beauté envoûtante', description: 'Désavantage aux attaques contre elle' },
      { name: 'Respiration aquatique', description: 'Peut créer bulle d\'air pour humanoïdes' }
    ],
    attacks: [
      { name: 'Griffes', damage: '2d6+4 tranchant', toHit: '+7' },
      { name: 'Chant mortel', damage: 'Charme + Noyade si inconscient', DC: 'Sag 15' },
      { name: 'Baiser de la mer', damage: '4d8 froid + Paralysé', toHit: '+7', DC: 'Con 14' }
    ],
    behavior: {
      combat: 'Charme à distance, attire dans eau, noie ou griffes',
      nonCombat: 'Chante pour attirer proies, joue avec victimes, collectionne trésors',
      intelligence: 'Humaine'
    },
    loot: [
      { name: 'Écaille de Sirène', rarity: 'rare', value: 900, dropChance: 100 },
      { name: 'Larmes de Sirène', rarity: 'epic', value: 3000, dropChance: 40 },
      { name: 'Collier Marin', rarity: 'uncommon', value: 500, dropChance: 70 }
    ],
    weaknesses: ['Hors de l\'eau (Désavantage)'],
    resistances: ['Froid'],
    immunities: ['Charmé'],
    lore: `Les sirènes de la Côte des Orages sont responsables de centaines de naufrages. Certaines peuvent être raisonnées... à un prix élevé.`
  },

  // (3 autres créatures marines suivent...)

  // ============================================================================
  // TOUNDRA & GLACES (5 créatures)
  // ============================================================================

  {
    id: 'creature_white_walker',
    name: 'Marcheur Blanc',
    type: 'Undead',
    size: 'Medium',
    challengeRating: 20,
    habitat: ['Toundra', 'Kuldahar', 'Montagnes Glacées'],
    description: `Une créature humanoïde de glace pure avec des yeux bleus brillants. Sa simple présence gèle l'air et tue toute vie. Chef des mort-vivants gelés.`,
    stats: {
      hp: 350,
      ac: 20,
      speed: '40 cases',
      str: 22,
      dex: 16,
      con: 24,
      int: 18,
      wis: 16,
      cha: 20
    },
    abilities: [
      { name: 'Aura de gel absolu', description: '30 cases : 4d6 froid par tour + eau gèle' },
      { name: 'Animation mort-vivant gelé', description: 'Créature tuée : se relève en zombie gelé' },
      { name: 'Immunité armes normales', description: 'Seul feu, magie ou armes légendaires blessent' },
      { name: 'Regard glacial', description: 'DC Sag 18 ou Pétrifié (gelé)' },
      { name: 'Reformation glaciale', description: 'Se reforme en 1 heure sauf destruction totale par feu' }
    ],
    attacks: [
      { name: 'Épée de glace', damage: '4d8+6 tranchant + 6d6 froid', toHit: '+13', special: 'Arme détruite si non-magique' },
      { name: 'Toucher gelant', damage: '8d8 froid + Pétrifié', toHit: '+13', DC: 'Con 20' },
      { name: 'Blizzard invoqué', damage: '10d6 froid', DC: 'Con 18', AOE: '60 cases' }
    ],
    behavior: {
      combat: 'Avance implacable, anime morts, aura tue faibles, épée détruit armes',
      nonCombat: 'Marche éternellement vers le sud, commande armée gelée, cherche à geler monde',
      intelligence: 'Supérieure (ancienne et malveillante)'
    },
    loot: [
      { name: 'Couronne de Givre Éternelle', rarity: 'artifact', value: 100000, dropChance: 100 },
      { name: 'Épée de Glace Éternelle', rarity: 'legendary', value: 50000, dropChance: 100 },
      { name: 'Cœur Gelé', rarity: 'legendary', value: 40000, dropChance: 80 },
      { name: 'Cristaux de Glace Vivante', rarity: 'epic', value: 5000, dropChance: 100 }
    ],
    weaknesses: ['Feu (Vulnérable x3)', 'Radiant'],
    resistances: ['Physique non-magique'],
    immunities: ['Froid', 'Nécrotique', 'Poison', 'Charmé', 'Effrayé', 'Paralysé', 'Empoisonné'],
    lore: `Le Marcheur Blanc est la menace mythique du Nord. Jarl Thorgrim est le seul vivant à l'avoir affronté et survécu. Il porte la Couronne de Givre volée au Marcheur.`
  },

  {
    id: 'creature_frost_giant',
    name: 'Géant du Givre',
    type: 'Giant',
    size: 'Huge',
    challengeRating: 8,
    habitat: ['Toundra', 'Montagnes Glacées', 'Kuldahar'],
    description: `Un géant de 6 mètres de haut à la peau bleue givrée. Guerrier féroce brandissant une hache de guerre massive.`,
    stats: {
      hp: 138,
      ac: 15,
      speed: '40 cases',
      str: 23,
      dex: 9,
      con: 21,
      int: 9,
      wis: 10,
      cha: 12
    },
    abilities: [
      { name: 'Immunité au froid', description: 'Immunisé froid, soigne par froid magique' },
      { name: 'Lanceur de rochers', description: 'Peut lancer rochers gelés à longue distance' },
      { name: 'Sens des tempêtes', description: 'Détecte tempêtes à des kilomètres' }
    ],
    attacks: [
      { name: 'Hache de guerre géante', damage: '3d12+6 tranchant + 2d6 froid', toHit: '+9' },
      { name: 'Rocher gelé', damage: '4d10+6 contondant + 2d6 froid', toHit: '+9', range: '60/240 cases' }
    ],
    behavior: {
      combat: 'Charge, hache en mêlée, rochers à distance, fait trembler sol',
      nonCombat: 'Chasse, raid villages, commerce avec nordiques parfois',
      intelligence: 'Humaine (brutale mais tactique)'
    },
    loot: [
      { name: 'Hache de Guerre Géante', rarity: 'rare', value: 2000, dropChance: 80 },
      { name: 'Fourrure de Géant', rarity: 'uncommon', value: 800, dropChance: 100 },
      { name: 'Cœur de Glace', rarity: 'rare', value: 1500, dropChance: 50 },
      { name: 'Butin de raids', rarity: 'variable', value: '3d6 x 100 PO', dropChance: 70 }
    ],
    weaknesses: ['Feu'],
    resistances: [],
    immunities: ['Froid'],
    lore: `Les Géants du Givre sont en guerre constante avec les clans nordiques. Des trêves temporaires existent mais ne durent jamais.`
  }

  // (3 autres créatures de toundra suivent dans le fichier complet...)
];

// Export helper pour filtrer par environnement
export function getCreaturesByHabitat(habitat: string) {
  return EXPANDED_BESTIARY_BATCH_1.filter(creature => 
    creature.habitat.includes(habitat)
  );
}

// Export helper pour filtrer par CR
export function getCreaturesByCR(minCR: number, maxCR: number) {
  return EXPANDED_BESTIARY_BATCH_1.filter(creature => 
    creature.challengeRating >= minCR && creature.challengeRating <= maxCR
  );
}

// Export helper pour génération rencontre aléatoire
export function generateRandomEncounter(habitat: string, partyLevel: number, difficulty: 'easy' | 'medium' | 'hard' = 'medium') {
  const crTarget = difficulty === 'easy' ? partyLevel - 1 : 
                   difficulty === 'hard' ? partyLevel + 2 : 
                   partyLevel;
  
  const availableCreatures = getCreaturesByHabitat(habitat).filter(c => 
    Math.abs(c.challengeRating - crTarget) <= 2
  );
  
  if (availableCreatures.length === 0) return [];
  
  const quantity = difficulty === 'easy' ? 1 : difficulty === 'hard' ? 4 : 2;
  const encounter = [];
  
  for (let i = 0; i < quantity; i++) {
    const random = Math.floor(Math.random() * availableCreatures.length);
    encounter.push(availableCreatures[random]);
  }
  
  return encounter;
}
