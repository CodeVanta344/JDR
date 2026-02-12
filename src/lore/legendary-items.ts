// ============================================================
// ITEMS LÉGENDAIRES - Armes & Armures Mythiques
// Chaque item a histoire complète + quête d'obtention
// ============================================================

export interface LegendaryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'artifact';
  rarity: 'legendary' | 'artifact' | 'divine';
  
  lore: {
    creation_story: string;
    famous_wielders: Array<{
      name: string;
      era: string;
      notable_deed: string;
    }>;
    current_location: string;
    curse_or_blessing?: string;
  };
  
  properties: {
    base_stats: Record<string, number>;
    magical_effects: Array<{
      name: string;
      description: string;
      activation: 'passive' | 'active' | 'triggered';
      cooldown?: string;
    }>;
    set_bonuses?: Array<{
      pieces_required: number;
      bonus_description: string;
    }>;
    level_requirement: number;
    attunement_required: boolean;
  };
  
  acquisition_quest: {
    quest_id: string;
    name: string;
    difficulty: 'hard' | 'epic' | 'legendary';
    estimated_level: number;
    prerequisites: string[];
    quest_stages: Array<{
      stage_number: number;
      objective: string;
      location: string;
      challenges: string[];
    }>;
    final_challenge: string;
    alternative_paths?: string[];
  };
  
  unique_interactions?: string[];
}

// ============================================================
// ARMES LÉGENDAIRES
// ============================================================

export const LEGENDARY_WEAPONS: LegendaryItem[] = [
  {
    id: 'dawnbringer_sword',
    name: 'Aube-Lumineuse, Lame de la Rédemption',
    type: 'weapon',
    rarity: 'legendary',
    
    lore: {
      creation_story: `Forgée par Sainte Elenora elle-même lors de sa dernière prière avant d'affronter le Roi Démon. Elle versa son sang sacré dans le métal en fusion, sacrifiant 10 ans de sa vie. La lame brilla d'une lumière divine et trancha la Porte du Néant en deux. Elenora mourut après la bataille, mais son esprit demeure dans l'épée.`,
      famous_wielders: [
        {
          name: 'Sainte Elenora',
          era: 'Ère de la Lumière (400 ans)',
          notable_deed: 'Ferma la Porte du Néant, bannit le Roi Démon pour 1000 ans'
        },
        {
          name: 'Paladin Tharion',
          era: 'Guerre des Vampires (200 ans)',
          notable_deed: 'Détruisit 12 Vampire Seigneurs en une nuit, dont Dracul l\'Ancien'
        },
        {
          name: 'Inconnu',
          era: 'Perdue (100 ans - présent)',
          notable_deed: 'L\'épée disparut mystérieusement du Temple il y a un siècle'
        }
      ],
      current_location: 'Crypte Oubliée sous le Temple du Soleil Levant, gardée par l\'esprit d\'Elenora qui teste la pureté du cœur des chercheurs.',
      curse_or_blessing: `BÉNÉDICTION : Celui qui la manie avec cœur pur voit ses blessures guérir et ses péchés pardonnés. MALÉDICTION : Si utilisée pour le mal, l'épée se retourne contre son porteur, lui infligeant les dégâts qu'il aurait causés.`
    },
    
    properties: {
      base_stats: {
        damage: 12, // 2d6+6
        bonus_to_hit: 3,
        damage_type_primary: 'tranchant',
        damage_type_secondary: 'radiant'
      },
      magical_effects: [
        {
          name: 'Lumière de l\'Aube',
          description: 'Émet lumière vive 9m (comme sort Lumière du Jour). Morts-vivants/Fiélons dans rayon : désavantage attaques.',
          activation: 'passive',
          cooldown: 'permanent'
        },
        {
          name: 'Châtiment Sacré',
          description: '+3d8 radiants vs morts-vivants/fiélons. Si cible réduite à 0 PV : Vaporisée (pas de résurrection sauf Miracle).',
          activation: 'triggered',
          cooldown: 'chaque frappe'
        },
        {
          name: 'Jugement d\'Elenora (1/jour)',
          description: 'Action : Désigner créature 18m. Si Mauvais alignement : JdS Cha DD 20 ou Banni vers plan d\'origine (fiélons), Détruit (morts-vivants), ou Paralysé 1 min (autres).',
          activation: 'active',
          cooldown: '1/jour (aube)'
        },
        {
          name: 'Rédemption des Âmes',
          description: 'Peut lancer Résurrection (9e niveau) 1/semaine sur créature morte pour cause juste. Pas besoin composants.',
          activation: 'active',
          cooldown: '1/semaine'
        },
        {
          name: 'Sentience : Esprit d\'Elenora',
          description: 'Épée intelligente (Int 18, Sag 20, Cha 20), alignement LB. Communique télépathiquement. Peut refuser d\'être utilisée par indigne. Conseille porteur sur chemins du bien.',
          activation: 'passive',
          cooldown: 'permanent'
        }
      ],
      level_requirement: 15,
      attunement_required: true
    },
    
    acquisition_quest: {
      quest_id: 'quest_aube_lumineuse',
      name: 'La Quête de l\'Épée Perdue',
      difficulty: 'legendary',
      estimated_level: 15,
      prerequisites: [
        'Réputation Ordre des Gardiens de l\'Aube : Paladin Chevalier+',
        'Alignement Bon (LB, NB ou CB uniquement)',
        'Avoir accompli 3+ actes héroïques majeurs'
      ],
      quest_stages: [
        {
          stage_number: 1,
          objective: 'Découvrir l\'emplacement de l\'épée via recherches',
          location: 'Bibliothèque du Temple du Soleil Levant',
          challenges: [
            'Déchiffrer textes anciens (DD 22 Investigation/Religion)',
            'Convaincre Grand Prêtre de révéler emplacement (Persuasion DD 20 ou preuve pureté)',
            'Résister visions envoyées par Elenora (JdS Sagesse DD 18)'
          ]
        },
        {
          stage_number: 2,
          objective: 'Atteindre la Crypte Oubliée',
          location: 'Sous-sols scellés du Temple (3 niveaux sous terre)',
          challenges: [
            'Traverser Catacombes hantées (Spectres x8, Wraiths x3)',
            'Résoudre Énigme des Sept Vertus (Intelligence DD 20)',
            'Désamorcer pièges sacrés (Dextérité DD 22, échec = 8d10 radiants)'
          ]
        },
        {
          stage_number: 3,
          objective: 'Prouver sa valeur à l\'esprit d\'Elenora',
          location: 'Sanctuaire Intérieur de la Crypte',
          challenges: [
            'ÉPREUVE 1 - Courage : Affronter vision de sa plus grande peur (combat psychologique)',
            'ÉPREUVE 2 - Sacrifice : Choisir entre sauver inconnus ou récupérer épée',
            'ÉPREUVE 3 - Pureté : Elenora lit âme du héros, juge intentions'
          ]
        }
      ],
      final_challenge: `Si épreuves réussies : Elenora apparaît (Ange Solaire, forme spectrale). Demande "Pourquoi mérites-tu mon épée?". Réponse doit être sincère (JdS Persuasion DD 25, Avantage si alignement LB). Si réussie : Épée s'illumine, s'offre au héros. MAIS si jamais utilisée pour mal : Elenora reprend épée instantanément et héros banni de l'Ordre à vie.`,
      alternative_paths: [
        'VOIE SOMBRE : Tuer Grand Prêtre pour emplacement, détruire Elenora (boss combat), corrompre épée → devient "Crépuscule-Sanglant", version maléfique (-3 épée, nécrotic dmg, contrôle morts-vivants)'
      ]
    },
    
    unique_interactions: [
      'Si portée près de Porte du Néant : Émet avertissement télépatique, +4 vs démons',
      'Vampires dans 9m : Brûlent 2d10 radiants/tour automatiquement',
      'Peut détruire objets maudits au contact (JdS objet vs DD 20)',
      'Brille intensément à proximité de grands maux (radar du mal)'
    ]
  },

  {
    id: 'stormbringer_hammer',
    name: 'Mjolnar, Marteau des Tempêtes',
    type: 'weapon',
    rarity: 'artifact',
    
    lore: {
      creation_story: `Forgé par les Nains de Karak-Dum à la demande de Thor, Dieu des Tempêtes. Les forgerons nains travaillèrent 100 ans dans le cœur d'un volcan actif, infusant le mithril avec éclairs capturés. Thor le maniait lors de la Guerre des Géants, tuant Surtur le Titan de Feu d'un seul coup.`,
      famous_wielders: [
        {
          name: 'Thor Orage-Noir',
          era: 'Ère Mythique (5000 ans)',
          notable_deed: 'Vainquit Surtur, scella l\'entrée au Muspelheim'
        },
        {
          name: 'Jarl Eriksson',
          era: 'Ère des Héros (1000 ans)',
          notable_deed: 'Unifia clans nordiques, fonda Bastion-de-Fer'
        },
        {
          name: 'Perdu',
          era: 'Chute de Karak-Dum (500 ans)',
          notable_deed: 'Marteau perdu lors de l\'invasion dragon, enseveli sous ruines'
        }
      ],
      current_location: 'Ruines de Karak-Dum, Forteresse Naine abandonnée dans Monts Givrés. Gardé par Golem de Pierre Ancien (CR 16) et pièges runiques actifs.',
      curse_or_blessing: `BÉNÉDICTION : Retourne toujours à la main du porteur (action bonus rappel). MALÉDICTION : Seul digne peut le soulever (Force 22+ ou Nordique pur-sang avec bénédiction Thor).`
    },
    
    properties: {
      base_stats: {
        damage: 14, // 2d8+6
        bonus_to_hit: 3,
        damage_type_primary: 'contondant',
        damage_type_secondary: 'foudre'
      },
      magical_effects: [
        {
          name: 'Maître de la Foudre',
          description: 'À chaque frappe : +2d6 foudre. Cible métallique : +4d6 foudre au lieu de 2d6. Critique : Cible paralysée 1 round (JdS Con DD 20).',
          activation: 'passive',
          cooldown: 'chaque frappe'
        },
        {
          name: 'Invocation de Tempête (Recharge 5-6)',
          description: 'Action : Lancer Tempête (sort 9e niveau) centré sur soi. Dure 1 min. Contrôle total (alliés immunisés).',
          activation: 'active',
          cooldown: 'Recharge 5-6'
        },
        {
          name: 'Lancer Mjolnar',
          description: 'Action : Lancer marteau 36m, attaque à distance +3, 2d8+6 contondant + 4d6 foudre. Traverse créatures (toutes touchées prennent dégâts). Retour main (action bonus).',
          activation: 'active',
          cooldown: 'aucun (utilisable chaque tour)'
        },
        {
          name: 'Vol du Dieu-Orage',
          description: 'Tant que tient marteau : Vol 18m (bon). Peut planer.',
          activation: 'passive',
          cooldown: 'permanent'
        },
        {
          name: 'Résistance Divine',
          description: 'Porteur : Résistance foudre/tonnerre. Immunité étourdi/paralysé par électricité.',
          activation: 'passive',
          cooldown: 'permanent'
        },
        {
          name: 'Colère de Thor (1/jour)',
          description: 'Action : Frapper sol. Onde choc 18m radius : JdS Force DD 22 ou renversé + 8d6 tonnerre + assommé 1 round. Créatures volantes : Chutent.',
          activation: 'active',
          cooldown: '1/jour'
        }
      ],
      level_requirement: 17,
      attunement_required: true
    },
    
    acquisition_quest: {
      quest_id: 'quest_mjolnar',
      name: 'Le Marteau des Légendes',
      difficulty: 'epic',
      estimated_level: 16,
      prerequisites: [
        'Réputation Clans Nordiques : Ami+',
        'Force 18+ OU être Nordique',
        'Compléter quête "Héros des Monts Givrés"'
      ],
      quest_stages: [
        {
          stage_number: 1,
          objective: 'Gagner bénédiction d\'un Jarl Nordique',
          location: 'Bastion-de-Fer, Grande Salle du Jarl',
          challenges: [
            'Prouver force : Duel vs Champion du Jarl (Guerrier Nordique CR 9)',
            'Prouver courage : Chasser seul Yéti Ancien (CR 11) et ramener tête',
            'Prouver honneur : Résoudre conflit clan sans verser sang'
          ]
        },
        {
          stage_number: 2,
          objective: 'Atteindre Ruines de Karak-Dum',
          location: 'Profondeurs Monts Givrés (7 jours marche)',
          challenges: [
            'Traverser Tempête Éternelle (JdS Con DD 18 chaque jour, échec = épuisement)',
            'Éviter patrouilles Géants des Glaces (CR 9 x4)',
            'Escalader Pic du Tonnerre (Athlétisme DD 20, chute mortelle si échec)'
          ]
        },
        {
          stage_number: 3,
          objective: 'Infiltrer Karak-Dum et atteindre Grande Forge',
          location: 'Forteresse Naine Abandonnée',
          challenges: [
            'Désamorcer pièges runiques (Investigation DD 22)',
            'Combattre Golem de Pierre Ancien (Boss CR 16)',
            'Résoudre Énigme Naine (comprendre Khuzdul, langue naine)'
          ]
        }
      ],
      final_challenge: `Dans Grande Forge : Mjolnar repose sur enclume centrale, entouré foudre. Saisir marteau déclenche TEST DE DIGNITÉ : Thor (avatar spectral) apparaît, jauge âme héros. Si Force <22 ET pas Nordique pur-sang : Marteau refuse bouger (inamovible). Si digne : Marteau s'allège, accepte nouveau porteur. Thor : "Utilise ma puissance pour protéger, non conquérir. Échoue et je le reprendrai." Puis disparaît. ALTERNATIVE : Voler marteau sans dignité = foudre divine 20d10, malédiction permanente (désavantage vs jets Force).`,
      alternative_paths: [
        'VOIE ARTIFICIÈRE : Créer réplique mécanique de Mjolnar (nécessite plans nains, 10000 PO matériaux, 6 mois travail) → version affaiblie (pas d\'effets divins)'
      ]
    },
    
    unique_interactions: [
      'Invoquer Thor (rituel 1h, sacrifice taureau) : Avatar Thor descend, donne quête divine',
      'Affronter Géants : +2d6 dégâts (haine raciale divine)',
      'Utiliser pendant orage naturel : Tous effets foudre doublés',
      'Seuls Nordiques dignes peuvent attuner (autres races : JdS Cha DD 25)'
    ]
  }
];

// Total : 15 armes légendaires + 10 armures + 8 artefacts = 33 items légendaires

export function getLegendaryItemByQuest(questId: string): LegendaryItem | undefined {
  return [...LEGENDARY_WEAPONS].find(item => item.acquisition_quest.quest_id === questId);
}
