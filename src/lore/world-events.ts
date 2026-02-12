// ============================================================
// ÉVÉNEMENTS MONDIAUX TRANSFORMATIFS
// Guerres, catastrophes, découvertes qui changent Aethelgard
// ============================================================

export interface WorldEvent {
  id: string;
  name: string;
  category: 'war' | 'catastrophe' | 'discovery' | 'political' | 'divine' | 'planar';
  magnitude: 'local' | 'regional' | 'continental' | 'world-shaking';
  
  trigger_conditions: {
    time_based?: {
      earliest_day: number;
      probability_per_week: number;
    };
    player_actions?: string[];
    prerequisite_events?: string[];
    random_chance?: number;
  };
  
  initial_phase: {
    description: string;
    duration_days: number;
    immediate_effects: WorldEffect[];
    rumors_spreading: string[];
  };
  
  escalation_phases: Array<{
    phase_number: number;
    name: string;
    description: string;
    duration_days: number;
    effects: WorldEffect[];
    player_intervention_options?: Array<{
      action: string;
      difficulty: 'moderate' | 'hard' | 'heroic' | 'impossible';
      success_outcome: string;
      failure_outcome: string;
    }>;
  }>;
  
  resolution: {
    possible_endings: Array<{
      id: string;
      name: string;
      conditions: string;
      permanent_changes: WorldEffect[];
      long_term_consequences: string[];
    }>;
  };
}

export interface WorldEffect {
  type: 'geography' | 'politics' | 'economy' | 'faction' | 'access' | 'population' | 'magic';
  target: string;
  change_description: string;
  mechanical_effect?: string;
  reversible: boolean;
}

// ============================================================
// ÉVÉNEMENTS MAJEURS
// ============================================================

export const WORLD_EVENTS: WorldEvent[] = [
  {
    id: 'event_demon_invasion',
    name: 'La Seconde Invasion Démoniaque',
    category: 'planar',
    magnitude: 'world-shaking',
    
    trigger_conditions: {
      time_based: {
        earliest_day: 365,
        probability_per_week: 0.02
      },
      player_actions: [
        'Ouvrir Porte du Néant corrompue',
        'Tuer tous Gardiens de l\'Aube',
        'Compléter rituel démoniaque majeur'
      ],
      random_chance: 0.05
    },
    
    initial_phase: {
      description: `Des fissures sanglantes apparaissent dans le ciel au-dessus des Terres Maudites du Sud. Des démons mineurs commencent à s'infiltrer. Les Gardiens de l'Aube sonnent l'alarme. Le Conseil des Royaumes convoque session d'urgence. Panique commence à se répandre.`,
      duration_days: 7,
      immediate_effects: [
        {
          type: 'access',
          target: 'Terres Maudites',
          change_description: 'Zone déclarée interdite. Frontières fermées.',
          mechanical_effect: 'Accès restreint, patrouilles renforcées',
          reversible: true
        },
        {
          type: 'economy',
          target: 'Toutes Cités',
          change_description: 'Ruée sur armes et protections magiques',
          mechanical_effect: 'Prix armes/armures +50%, potions +80%',
          reversible: true
        },
        {
          type: 'faction',
          target: 'Ordre des Gardiens de l\'Aube',
          change_description: 'Mobilisation générale, recrutement massif',
          mechanical_effect: 'Réputation gains doublés, quêtes urgentes disponibles',
          reversible: false
        }
      ],
      rumors_spreading: [
        '"Des villageois ont vu des créatures ailées au Sud..."',
        '"Le Temple mobilise tous ses paladins. C\'est grave."',
        '"On dit que c\'est la fin du monde prédite par les prophètes."',
        '"Les démons cherchent quelque chose... un artefact ancien."'
      ]
    },
    
    escalation_phases: [
      {
        phase_number: 1,
        name: 'Escarmouches Démoniaques',
        description: `Des hordes de démons mineurs (Imps, Lemures) attaquent villages frontaliers. Premières victimes civiles. Réfugiés fuient vers le Nord. Armée Royale déployée en défense.`,
        duration_days: 14,
        effects: [
          {
            type: 'population',
            target: 'Villages du Sud',
            change_description: '30% population fuie ou tuée',
            mechanical_effect: 'Services réduits, marchands rares',
            reversible: false
          },
          {
            type: 'access',
            target: 'Route Commerciale Sud',
            change_description: 'Route fermée, commerce paralysé',
            mechanical_effect: 'Impossible voyager vers Sud sans escorte militaire',
            reversible: true
          }
        ],
        player_intervention_options: [
          {
            action: 'Défendre village assiégé (Hamloc)',
            difficulty: 'hard',
            success_outcome: 'Village sauvé, 200 civils épargnés, +50 réputation Conseil, Médaille d\'Honneur',
            failure_outcome: 'Village détruit, survivants maudissent héros, -20 réputation'
          },
          {
            action: 'Infiltrer camp démoniaque, assassiner commandant',
            difficulty: 'heroic',
            success_outcome: 'Invasion ralentie 7 jours, armée gagne temps fortifier, +100 réputation Gardiens',
            failure_outcome: 'Capture, torture, évasion difficile. Démons renforcent sécurité.'
          }
        ]
      },
      
      {
        phase_number: 2,
        name: 'Percée des Seigneurs Démons',
        description: `Trois Seigneurs Démons (CR 18-20) émergent de la Porte : Balthazar l'Embraseur, Lilith l'Enchanteresse, et Moros le Dévoreur. Ils mènent assaut coordonné sur Forteresse de Lumière, dernier rempart. Si elle tombe, chemin vers Aethelmere est ouvert.`,
        duration_days: 21,
        effects: [
          {
            type: 'politics',
            target: 'Conseil des Royaumes',
            change_description: 'Désaccord total. Certains proposent alliance démons, autres guerre totale.',
            mechanical_effect: 'Quêtes conflictuelles apparaissent selon faction soutenue',
            reversible: true
          },
          {
            type: 'magic',
            target: 'Aethelgard',
            change_description: 'Corruption démoniaque affecte sorts. Magie divine renforcée, nécromancie facilitée.',
            mechanical_effect: 'Sorts divins +1 DC, sorts nécrotiques coût -1 slot',
            reversible: true
          },
          {
            type: 'geography',
            target: 'Terres Maudites',
            change_description: 'Terre elle-même corrompt. Végétation meurt, rivières deviennent sang.',
            mechanical_effect: 'Zone hostile : 1d6 dégâts nécrotiques/heure exposition',
            reversible: false
          }
        ],
        player_intervention_options: [
          {
            action: 'Affronter Seigneur Démon en duel (1v1)',
            difficulty: 'impossible',
            success_outcome: 'Seigneur banni 100 ans. Légende vivante. +500 réputation toutes factions Bien.',
            failure_outcome: 'Mort probable. Âme capturée, peut être sauvée par rituel.'
          },
          {
            action: 'Rituel de Fermeture de Porte (requiert 3 artefacts sacrés)',
            difficulty: 'heroic',
            success_outcome: 'Porte scellée, démons coupés renforts. Invasion affaiblie.',
            failure_outcome: 'Rituel raté, Porte s\'agrandit, démons majeurs invoqués'
          },
          {
            action: 'Négocier avec Lilith (trahison potentielle)',
            difficulty: 'moderate',
            success_outcome: 'Lilith propose trêve si lui livrez artefact X. Dilemme moral.',
            failure_outcome: 'Lilith vous charme, vous retournez contre alliés temporairement'
          }
        ]
      },
      
      {
        phase_number: 3,
        name: 'L\'Assaut Final',
        description: `Armée démoniaque (10000+) marche sur Aethelmere. Siège commence. Tous héros d'Aethelgard convergent pour bataille apocalyptique. Destin du monde en jeu.`,
        duration_days: 7,
        effects: [
          {
            type: 'politics',
            target: 'Toutes Nations',
            change_description: 'Unité absolue face ennemi commun. Anciennes rivalités oubliées.',
            mechanical_effect: 'Toutes factions coopèrent, accès universel ressources',
            reversible: false
          },
          {
            type: 'population',
            target: 'Aethelmere',
            change_description: 'Évacuation civils, ville devient forteresse',
            mechanical_effect: 'Tous PNJ non-combattants partis, services indisponibles',
            reversible: true
          }
        ],
        player_intervention_options: [
          {
            action: 'Tenir Porte Sud (combat masse)',
            difficulty: 'heroic',
            success_outcome: 'Héros repousse vague après vague. Armée gagne temps. Victoire coûteuse.',
            failure_outcome: 'Porte tombe, démons infiltrent ville, combat urbain chaotique'
          },
          {
            action: 'Assassiner Roi Démon (chef invasion)',
            difficulty: 'impossible',
            success_outcome: 'Décapitation leadership, armée démoniaque chaos, victoire complète',
            failure_outcome: 'Roi Démon tue héros, prend âme comme trophée'
          }
        ]
      }
    ],
    
    resolution: {
      possible_endings: [
        {
          id: 'ending_heroic_victory',
          name: 'Victoire Héroïque',
          conditions: 'Joueurs tuent Roi Démon OU ferment Porte + gagnent Assaut Final',
          permanent_changes: [
            {
              type: 'geography',
              target: 'Site de la Porte',
              change_description: 'Porte détruite définitivement, cratère sacré créé',
              mechanical_effect: 'Nouveau lieu saint, pèlerinages, bénédictions permanentes',
              reversible: false
            },
            {
              type: 'politics',
              target: 'Conseil des Royaumes',
              change_description: 'Création Alliance Éternelle, toutes nations unies',
              mechanical_effect: 'Voyages inter-nations libres, commerce +50%',
              reversible: false
            },
            {
              type: 'faction',
              target: 'Héros',
              change_description: 'Statues érigées, fête annuelle en l\'honneur des sauveurs',
              mechanical_effect: 'Réputation MAX toutes factions, titres nobles gratuits',
              reversible: false
            }
          ],
          long_term_consequences: [
            'Ère de Paix (50 ans minimum)',
            'Renaissance culturelle et magique',
            'Nouveaux ordres de paladins fondés',
            'Exploration agressive des Enfers pour prévenir futures invasions'
          ]
        },
        
        {
          id: 'ending_pyrrhic_victory',
          name: 'Victoire à la Pyrrhus',
          conditions: 'Invasion repoussée mais héros morts/Aethelmere détruite',
          permanent_changes: [
            {
              type: 'geography',
              target: 'Aethelmere',
              change_description: 'Capitale en ruines, reconstruite comme Nouvelle-Aethelmere 10km Nord',
              mechanical_effect: 'Ancienne ville = zone dangereuse (démons résiduels)',
              reversible: false
            },
            {
              type: 'population',
              target: 'Aethelgard',
              change_description: '40% population perdue, génération décimée',
              mechanical_effect: 'Services réduits partout, prix doublés, main d\'œuvre rare',
              reversible: false
            },
            {
              type: 'politics',
              target: 'Conseil',
              change_description: 'Conseil dissout, régents militaires prennent pouvoir',
              mechanical_effect: 'Loi martiale, libertés réduites, couvre-feu',
              reversible: true
            }
          ],
          long_term_consequences: [
            'Ère de Reconstruction (20 ans)',
            'Méfiance généralisée envers magie',
            'Ordre Puritain anti-démons créé (fanatiques)',
            'Certains démons restent cachés, infiltrés société'
          ]
        },
        
        {
          id: 'ending_dark_age',
          name: 'L\'Âge des Ténèbres',
          conditions: 'Invasion réussit, héros échouent',
          permanent_changes: [
            {
              type: 'politics',
              target: 'Aethelgard',
              change_description: 'Royaumes tombent, Seigneurs Démons règnent',
              mechanical_effect: 'Aethelgard devient Enfer sur Terre, toute résistance clandestine',
              reversible: false
            },
            {
              type: 'geography',
              target: 'Continent Entier',
              change_description: 'Corruption totale, ciel rouge sang permanent',
              mechanical_effect: 'Soleil ne brille plus, sorts divins désavantage',
              reversible: false
            },
            {
              type: 'population',
              target: 'Humanité',
              change_description: 'Humains esclaves, cultives comme bétail',
              mechanical_effect: 'Campagne devient résistance post-apocalyptique',
              reversible: false
            }
          ],
          long_term_consequences: [
            'Campagne post-invasion (Résistance)',
            'Quêtes: Libérer zones, assassiner Seigneurs Démons',
            'Ton dark, survie, espoir fragile',
            'Victoire finale possible après 100+ heures jeu'
          ]
        }
      ]
    }
  },

  {
    id: 'event_dragon_war',
    name: 'La Guerre des Dragons Ressuscités',
    category: 'catastrophe',
    magnitude: 'continental',
    
    trigger_conditions: {
      player_actions: [
        'Tuer 3+ Dragons Anciens',
        'Profaner Cimetière des Dragons',
        'Voler Œufs de Dragon'
      ],
      time_based: {
        earliest_day: 180,
        probability_per_week: 0.01
      }
    },
    
    initial_phase: {
      description: `Les Dragons morts se réveillent. Ignaroth le Balafré, ressuscité en Dracoliche, déclare guerre à toute vie. Les Dragons survivants s'allient contre menace commune... ou rejoignent Ignaroth. Cieux deviennent champ de bataille.`,
      duration_days: 14,
      immediate_effects: [
        {
          type: 'geography',
          target: 'Ciel d\'Aethelgard',
          change_description: 'Dragons patrouillent cieux. Voyages aériens impossibles.',
          mechanical_effect: 'Vol 50%+ altit = attaque dragon (rencontre aléatoire CR 12-20)',
          reversible: true
        },
        {
          type: 'economy',
          target: 'Matériaux Draconiques',
          change_description: 'Écailles/sang dragon prix x10 (guerre)',
          mechanical_effect: 'Items draconiques deviennent quasi-introuvables',
          reversible: true
        }
      ],
      rumors_spreading: [
        '"Un dragon-squelette a attaqué Bastion-de-Fer hier..."',
        '"Les Dragon-Lords tiennent conseil. C\'est du jamais vu."',
        '"On dit qu\'Ignaroth veut tuer tous les mortels qui ont osé tuer dragons."'
      ]
    },
    
    escalation_phases: [
      {
        phase_number: 1,
        name: 'Raids Draconiques',
        description: `Dragons (vivants ET morts-vivants) attaquent villes au hasard. Aucun schéma. Juste destruction. Ignaroth teste défenses mortelles.`,
        duration_days: 30,
        effects: [
          {
            type: 'population',
            target: 'Cités Exposées',
            change_description: '3-5 villes attaquées/semaine, 10-30% pertes',
            mechanical_effect: 'Villes aléatoires deviennent ruines temporairement',
            reversible: true
          }
        ],
        player_intervention_options: [
          {
            action: 'Abattre Dracoliche Mineur',
            difficulty: 'hard',
            success_outcome: 'Dragon détruit, ville sauvée, +Écailles Dracoliche (craft légendaire)',
            failure_outcome: 'Ville rasée, héros blessés gravement'
          },
          {
            action: 'Négocier avec Dragon Métallique Neutre',
            difficulty: 'moderate',
            success_outcome: 'Dragon accepte protéger 1 ville en échange trésor/service',
            failure_outcome: 'Dragon offensé, attaque ou exige tribut exorbitant'
          }
        ]
      }
    ],
    
    resolution: {
      possible_endings: [
        {
          id: 'ending_dragons_pacified',
          name: 'Traité Dragon-Mortel',
          conditions: 'Tuer Ignaroth + négocier paix Dragons survivants',
          permanent_changes: [
            {
              type: 'politics',
              target: 'Relations Dragons',
              change_description: 'Traité signé : Dragons tolèrent mortels, zones exclusion mutuelle',
              mechanical_effect: 'Certaines zones interdites (Territoires Dragon), mais paix',
              reversible: false
            }
          ],
          long_term_consequences: [
            'Dragons deviennent alliés potentiels (quêtes)',
            'Commerce d\'objets draconiques régulé',
            'Nouveaux PNJ dragons (sages, marchands)'
          ]
        }
      ]
    }
  }
];

// ... (20+ événements mondiaux supplémentaires)

export class WorldEventManager {
  private activeEvents: WorldEvent[] = [];
  private completedEvents: Set<string> = new Set();
  
  checkTriggers(currentDay: number, playerActions: string[]): WorldEvent[] {
    const triggered: WorldEvent[] = [];
    
    WORLD_EVENTS.forEach(event => {
      if (this.completedEvents.has(event.id)) return;
      if (this.activeEvents.some(e => e.id === event.id)) return;
      
      // Check conditions
      const cond = event.trigger_conditions;
      
      if (cond.time_based && currentDay >= cond.time_based.earliest_day) {
        if (Math.random() < cond.time_based.probability_per_week / 7) {
          triggered.push(event);
        }
      }
      
      if (cond.player_actions) {
        if (playerActions.some(pa => cond.player_actions!.includes(pa))) {
          triggered.push(event);
        }
      }
    });
    
    return triggered;
  }
  
  progressEvent(eventId: string, daysElapsed: number): void {
    // Logic pour avancer phases événement
  }
}

export const worldEventManager = new WorldEventManager();
