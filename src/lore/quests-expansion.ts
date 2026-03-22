/**
 * AETHELGARD - QUÊTES D'EXPANSION (30+ quêtes secondaires)
 *
 * Organisées par région et type :
 * - Quêtes régionales (Val Doré, Monts Cœur-de-Fer, Sylve d'Émeraude, Côte des Orages, Terres Brûlées)
 * - Quêtes de faction (Aube d'Argent, Guilde des Arcanes, Syndicat de l'Ombre, Gardiens d'Émeraude)
 * - Quêtes personnelles (backstory hooks)
 * - Mystères et enquêtes
 * - Combat et donjons
 *
 * Chaque quête inclut des choix moraux, des conséquences, et des liens optionnels
 * avec l'arc principal des Sceaux / Cercle de Cendres.
 */

import type { QuestDefinition, QuestReward } from './quests';

// ============================================================================
// QUÊTES RÉGIONALES — VAL DORÉ
// ============================================================================

export const QUEST_VALDORE_01: QuestDefinition = {
  id: 'quest_exp_valdore_moisson_maudite',
  name: 'La Moisson Maudite',
  title: 'La Moisson Maudite',
  type: 'side',
  category: 'investigation',
  status: 'not_started',
  level: 3,
  questGiver: 'npc_farmer_gaston',
  location: 'Val Doré - Hameau de Blétendre',
  region: 'Val Doré',
  suggestedLevel: 3,
  summary: `Les récoltes pourrissent en une nuit dans le hameau de Blétendre. Les paysans accusent la sorcière de la colline, mais la vérité est plus sombre.`,
  description: `Depuis deux semaines, les champs de blé de Blétendre noircissent du jour au lendemain. Le fermier Gaston Laborde, doyen du village, supplie quiconque passe d'enquêter. Les villageois accusent Mère Aubépine, une herboriste solitaire vivant sur la colline. En réalité, un fragment de Sceau corrompt la terre depuis un cairn oublié sous les champs. L'herboriste tente désespérément de contenir la corruption avec ses remèdes.`,
  tags: ['investigation', 'moral_choice', 'val_dore', 'corruption', 'seal_link'],
  isRepeatable: false,

  prerequisites: { level: 2 },

  acts: [
    {
      actNumber: 1,
      title: 'Le Blé Noir',
      description: `Enquêter sur la pourriture des récoltes et interroger les villageois.`,
      objectives: [
        { id: 'obj_talk_gaston', description: 'Parler à Gaston Laborde au hameau', type: 'talk', target: 'npc_farmer_gaston', required: true },
        { id: 'obj_examine_fields', description: 'Examiner les champs corrompus (Perception DC 12)', type: 'investigate', target: 'loc_bletendre_fields', required: true },
        { id: 'obj_talk_villagers', description: 'Interroger les villageois sur Mère Aubépine', type: 'talk', quantity: 3, required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'La Sorcière de la Colline',
      description: `Rendre visite à Mère Aubépine et découvrir sa version des faits.`,
      objectives: [
        { id: 'obj_visit_aubepine', description: 'Monter à la chaumière de Mère Aubépine', type: 'explore', target: 'loc_colline_aubepine', required: true },
        { id: 'obj_read_journal', description: 'Lire le journal de recherche d\'Aubépine (Intelligence DC 14)', type: 'investigate', target: 'item_journal_aubepine', required: true }
      ],
      choices: [
        {
          id: 'choice_aubepine',
          prompt: 'Mère Aubépine révèle que la corruption vient du cairn. Que faites-vous ?',
          options: [
            {
              text: 'Aider Aubépine à purifier le cairn ensemble',
              consequence: 'Aubépine devient alliée. Les villageois apprennent la vérité et s\'excusent. +20 réputation Val Doré.',
              reputationChange: [{ faction: 'faction_val_dore', amount: 20 }]
            },
            {
              text: 'Livrer Aubépine aux villageois pour apaiser leur colère',
              consequence: 'Les villageois la chassent. La corruption persiste et empire. Fragment de Sceau reste actif. -30 réputation Gardiens d\'Émeraude.',
              reputationChange: [{ faction: 'faction_gardiens_emeraude', amount: -30 }]
            },
            {
              text: 'Détruire le cairn seul, sans en parler à personne',
              consequence: 'La corruption s\'arrête mais l\'énergie libérée attire des ombres mineures la semaine suivante. Aubépine reste suspecte.',
              reputationChange: [{ faction: 'faction_val_dore', amount: 5 }]
            }
          ]
        }
      ]
    },
    {
      actNumber: 3,
      title: 'Le Cairn Oublié',
      description: `Descendre sous les champs pour affronter la source de corruption.`,
      objectives: [
        { id: 'obj_enter_cairn', description: 'Pénétrer dans le cairn sous les champs', type: 'explore', target: 'loc_cairn_bletendre', required: true },
        { id: 'obj_defeat_corruption', description: 'Vaincre les Lianes d\'Ombre (CR 3)', type: 'kill', target: 'creature_shadow_vines', count: 4, required: true },
        { id: 'obj_purify_fragment', description: 'Purifier ou récupérer le fragment de Sceau', type: 'special', required: true }
      ]
    }
  ],

  rewards: {
    gold: 250,
    experience: 400,
    items: ['item_herbes_aubepine', 'item_fragment_sceau_inerte'],
    reputation: [{ faction: 'faction_val_dore', amount: 15 }],
    titles: ['Ami de Blétendre']
  },

  loreImpact: 'Révèle que des fragments de Sceau corrompent la terre loin des sites principaux. Lien avec l\'arc des Sceaux Brisés.',
  followUpQuests: ['quest_exp_valdore_racines_ombre']
};

export const QUEST_VALDORE_02: QuestDefinition = {
  id: 'quest_exp_valdore_racines_ombre',
  name: 'Les Racines de l\'Ombre',
  title: 'Les Racines de l\'Ombre',
  type: 'side',
  category: 'exploration',
  status: 'not_started',
  level: 5,
  questGiver: 'npc_aubepine',
  location: 'Val Doré - Réseau racinaire souterrain',
  region: 'Val Doré',
  suggestedLevel: 5,
  summary: `Mère Aubépine découvre que les racines des arbres anciens du Val Doré forment un réseau vivant corrompu par l'énergie des Sceaux. Il faut purifier trois nœuds racinaires.`,
  description: `Suite à l'incident de Blétendre, Mère Aubépine a cartographié un réseau racinaire souterrain reliant les plus vieux arbres du Val Doré. Ce réseau, autrefois béni par les druides, est en train de devenir un conduit pour l'énergie noire des Sceaux fissurés. Trois nœuds majeurs doivent être purifiés avant que la corruption ne s'étende aux forêts voisines.`,
  tags: ['exploration', 'druid', 'val_dore', 'corruption', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 4, quests: ['quest_exp_valdore_moisson_maudite'] },
  acts: [
    {
      actNumber: 1,
      title: 'Cartographie Souterraine',
      description: `Explorer le réseau racinaire et localiser les trois nœuds corrompus.`,
      objectives: [
        { id: 'obj_enter_roots', description: 'Descendre dans le réseau racinaire via le Chêne-Mère', type: 'explore', target: 'loc_chene_mere', required: true },
        { id: 'obj_find_nodes', description: 'Localiser les 3 nœuds corrompus (Survie DC 14)', type: 'explore', quantity: 3, required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Purification',
      description: `Purifier chaque nœud en affrontant les gardiens corrompus.`,
      objectives: [
        { id: 'obj_purify_node_1', description: 'Purifier le Nœud du Chêne — Vaincre le Tréant Corrompu (CR 5)', type: 'combat', target: 'creature_corrupt_treant', required: true },
        { id: 'obj_purify_node_2', description: 'Purifier le Nœud du Saule — Résoudre l\'énigme des eaux (Intelligence DC 15)', type: 'special', required: true },
        { id: 'obj_purify_node_3', description: 'Purifier le Nœud de l\'If — Choix moral : détruire ou absorber l\'énergie', type: 'choice', required: true }
      ],
      choices: [
        {
          id: 'choice_if_node',
          prompt: 'Le Nœud de l\'If contient une énergie immense. Que faites-vous ?',
          options: [
            {
              text: 'Détruire l\'énergie — purification complète',
              consequence: 'Le réseau est nettoyé. Mère Aubépine peut restaurer le lien druidique. +15 réputation Gardiens d\'Émeraude.'
            },
            {
              text: 'Absorber l\'énergie — pouvoir personnel',
              consequence: 'Gain de +2 Volonté temporaire (7 jours) mais cauchemars récurrents. Aubépine désapprouve. -10 réputation Gardiens d\'Émeraude.'
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 400,
    experience: 600,
    items: ['item_baton_chene_beni', 'item_essence_racine_ancienne'],
    reputation: [{ faction: 'faction_gardiens_emeraude', amount: 20 }]
  },
  loreImpact: 'Révèle que la corruption des Sceaux se propage via les réseaux naturels d\'Aethelgard.'
};

export const QUEST_VALDORE_03: QuestDefinition = {
  id: 'quest_exp_valdore_vendanges_sang',
  name: 'Les Vendanges de Sang',
  title: 'Les Vendanges de Sang',
  type: 'side',
  category: 'intrigue',
  status: 'not_started',
  level: 6,
  questGiver: 'npc_vigneronne_clara',
  location: 'Val Doré - Domaine de Rougevigne',
  region: 'Val Doré',
  suggestedLevel: 6,
  summary: `Le prestigieux vignoble de Rougevigne produit un vin qui rend les nobles dépendants. La vigneronne Clara soupçonne que son patron utilise du sang de fée dans la recette.`,
  description: `Le Domaine de Rougevigne est célèbre pour son Cru Écarlate, un vin prisé par la noblesse de Sol-Aureus. Clara, ouvrière du domaine, confie que le propriétaire, Lord Thibault de Rougevigne, garde une fée captive dans les caves et mêle son sang au vin. Les nobles deviennent accros et obéissants. Clara veut libérer la fée mais craint les représailles.`,
  tags: ['intrigue', 'moral_choice', 'val_dore', 'fey', 'noble'],
  isRepeatable: false,
  prerequisites: { level: 5 },
  acts: [
    {
      actNumber: 1,
      title: 'Le Cru Écarlate',
      description: `Enquêter sur le vignoble et confirmer les soupçons de Clara.`,
      objectives: [
        { id: 'obj_talk_clara', description: 'Écouter le témoignage de Clara', type: 'talk', target: 'npc_vigneronne_clara', required: true },
        { id: 'obj_infiltrate_cellar', description: 'S\'infiltrer dans les caves du domaine (Discrétion DC 14)', type: 'stealth', target: 'loc_caves_rougevigne', required: true },
        { id: 'obj_find_fairy', description: 'Trouver la fée captive Lilas-des-Brumes', type: 'investigate', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Libération ou Compromis',
      description: `Décider du sort de Lilas-des-Brumes et de Lord Thibault.`,
      objectives: [
        { id: 'obj_confront_thibault', description: 'Confronter Lord Thibault de Rougevigne', type: 'talk', target: 'npc_lord_thibault', required: true }
      ],
      choices: [
        {
          id: 'choice_fairy_fate',
          prompt: 'Lord Thibault offre une fortune pour votre silence. La fée supplie pour sa liberté.',
          options: [
            {
              text: 'Libérer la fée et dénoncer Thibault à la Couronne',
              consequence: 'Lilas est libre et offre une bénédiction féerique. Thibault est arrêté. Nobles furieux (privés de vin). +25 réputation Gardiens d\'Émeraude, -15 réputation Noblesse.',
              reputationChange: [{ faction: 'faction_gardiens_emeraude', amount: 25 }, { faction: 'faction_noblesse', amount: -15 }],
              unlocks: ['quest_exp_valdore_benediction_fee']
            },
            {
              text: 'Accepter le pot-de-vin de Thibault (5000 PO)',
              consequence: 'La fée reste captive. Gain immédiat mais perte morale. Cauchemars récurrents. -30 réputation Gardiens d\'Émeraude.',
              reputationChange: [{ faction: 'faction_gardiens_emeraude', amount: -30 }],
              itemsGained: ['5000_gold']
            },
            {
              text: 'Négocier : Thibault libère la fée mais garde son secret',
              consequence: 'Compromis. Lilas est libre mais ne vous fait pas confiance. Thibault trouve une autre source. Situation non résolue.',
              reputationChange: [{ faction: 'faction_val_dore', amount: 5 }]
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 300,
    experience: 500,
    items: ['item_bouteille_cru_ecarlate'],
    reputation: [{ faction: 'faction_val_dore', amount: 10 }]
  }
};

// ============================================================================
// QUÊTES RÉGIONALES — MONTS CŒUR-DE-FER
// ============================================================================

export const QUEST_MONTS_01: QuestDefinition = {
  id: 'quest_exp_monts_forge_perdue',
  name: 'La Forge Perdue de Durin',
  title: 'La Forge Perdue de Durin',
  type: 'side',
  category: 'exploration',
  status: 'not_started',
  level: 8,
  questGiver: 'npc_forgeron_brom',
  location: 'Monts Cœur-de-Fer - Mines Profondes',
  region: 'Monts Cœur-de-Fer',
  suggestedLevel: 8,
  summary: `Le forgeron Brom a trouvé une carte menant à la légendaire Forge de Durin, un atelier nain perdu depuis la Chute d'Ashka. On dit que la forge peut tremper les métaux dans le feu primordial.`,
  description: `Brom le Marteau-Tonnerre, maître forgeron des Monts, a découvert un parchemin ancien dans un filon de mithril. La carte indique l'emplacement de la Forge de Durin, légendaire atelier du premier roi nain. Cette forge aurait le pouvoir de créer des armes capables de blesser les entités du Miroir des Ombres. Le chemin traverse des galeries effondrées, des nids de vers des roches et un gardien mécanique antique.`,
  tags: ['exploration', 'dungeon', 'monts_coeur_de_fer', 'dwarf', 'crafting', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 7 },
  acts: [
    {
      actNumber: 1,
      title: 'Les Galeries Oubliées',
      description: `Traverser les mines effondrées pour atteindre les niveaux profonds.`,
      objectives: [
        { id: 'obj_get_map', description: 'Obtenir la carte de Brom', type: 'talk', target: 'npc_forgeron_brom', required: true },
        { id: 'obj_navigate_mines', description: 'Naviguer dans les galeries effondrées (Survie DC 15)', type: 'explore', target: 'loc_mines_profondes', required: true },
        { id: 'obj_defeat_rockworms', description: 'Éliminer les Vers des Roches bloquant le passage (CR 6)', type: 'kill', target: 'creature_rockworm', count: 3, required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Gardien de la Forge',
      description: `Affronter ou désactiver le Golem gardien de la Forge de Durin.`,
      objectives: [
        { id: 'obj_reach_forge', description: 'Atteindre l\'antichambre de la Forge', type: 'explore', required: true },
        { id: 'obj_guardian', description: 'Vaincre le Golem de Mithril (CR 8) ou trouver le mot de passe nain', type: 'combat', target: 'creature_mithril_golem', required: true }
      ],
      choices: [
        {
          id: 'choice_forge_use',
          prompt: 'La Forge de Durin est fonctionnelle. Qu\'en faites-vous ?',
          options: [
            {
              text: 'Révéler la forge aux Nains — restauration collective',
              consequence: 'Les Nains reprennent la forge. Accès permanent pour forger des armes anti-ombre. +40 réputation Monts Cœur-de-Fer.',
              reputationChange: [{ faction: 'faction_monts_coeur_fer', amount: 40 }]
            },
            {
              text: 'Garder le secret et utiliser la forge seul',
              consequence: 'Forge une arme légendaire personnelle mais les Nains ne bénéficient pas de la découverte. -20 réputation Monts si découvert.',
              itemsGained: ['item_arme_feu_primordial']
            },
            {
              text: 'Sceller la forge — trop dangereux',
              consequence: 'La forge est scellée. Perte de l\'opportunité. +10 réputation Aube d\'Argent (prudence appréciée).',
              reputationChange: [{ faction: 'faction_aube_argent', amount: 10 }]
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 800,
    experience: 1000,
    items: ['item_lingot_mithril', 'item_plans_forge_durin'],
    reputation: [{ faction: 'faction_monts_coeur_fer', amount: 25 }],
    titles: ['Découvreur de la Forge']
  },
  loreImpact: 'La Forge de Durin peut créer des armes capables de blesser les entités du Miroir — lien direct avec l\'arc des Sceaux.'
};

export const QUEST_MONTS_02: QuestDefinition = {
  id: 'quest_exp_monts_chant_montagne',
  name: 'Le Chant de la Montagne',
  title: 'Le Chant de la Montagne',
  type: 'side',
  category: 'investigation',
  status: 'not_started',
  level: 6,
  questGiver: 'npc_miner_olga',
  location: 'Monts Cœur-de-Fer - Pic du Tonnerre',
  region: 'Monts Cœur-de-Fer',
  suggestedLevel: 6,
  summary: `Les mineurs du Pic du Tonnerre entendent un chant grave résonner dans la roche. Certains deviennent obsédés et creusent sans relâche vers la source, ne dormant plus ni ne mangeant.`,
  description: `Depuis trois semaines, un son grave et mélodieux émane des profondeurs du Pic du Tonnerre. Les mineurs qui l'entendent sont envoûtés et creusent sans repos vers la source. Olga Marteau-de-Fer, contremaître de la mine, a perdu douze ouvriers et supplie qu'on mette fin au phénomène. Le chant provient d'un cristal de résonance ashkan piégé dans la roche — un reliquaire qui amplifie la volonté d'une entité mineure du Miroir des Ombres.`,
  tags: ['investigation', 'horror', 'monts_coeur_de_fer', 'mirror_link', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 5 },
  acts: [
    {
      actNumber: 1,
      title: 'La Mélodie Obsédante',
      description: `Descendre dans la mine et résister au chant.`,
      objectives: [
        { id: 'obj_talk_olga', description: 'S\'entretenir avec Olga sur les disparitions', type: 'talk', target: 'npc_miner_olga', required: true },
        { id: 'obj_resist_song', description: 'Descendre dans la mine en résistant au chant (Volonté DC 14 chaque heure)', type: 'explore', required: true },
        { id: 'obj_find_miners', description: 'Retrouver les mineurs envoûtés', type: 'investigate', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Cristal de Résonance',
      description: `Neutraliser le cristal ashkan.`,
      objectives: [
        { id: 'obj_reach_crystal', description: 'Atteindre la caverne du cristal', type: 'explore', required: true },
        { id: 'obj_destroy_crystal', description: 'Détruire ou sceller le Cristal de Résonance (Arcanes DC 16)', type: 'special', required: true },
        { id: 'obj_save_miners', description: 'Ramener les mineurs envoûtés à la surface', type: 'escort', quantity: 8, required: true }
      ]
    }
  ],
  rewards: {
    gold: 500,
    experience: 700,
    items: ['item_eclat_cristal_resonance'],
    reputation: [{ faction: 'faction_monts_coeur_fer', amount: 20 }]
  },
  loreImpact: 'Les reliquaires ashkans servent de relais aux entités du Miroir. Lien avec l\'histoire de l\'Ère d\'Ashka.'
};

export const QUEST_MONTS_03: QuestDefinition = {
  id: 'quest_exp_monts_roi_sous_montagne',
  name: 'Le Roi sous la Montagne',
  title: 'Le Roi sous la Montagne',
  type: 'side',
  category: 'boss',
  status: 'not_started',
  level: 12,
  questGiver: 'npc_sage_thorin',
  location: 'Monts Cœur-de-Fer - Crypte Royale Profonde',
  region: 'Monts Cœur-de-Fer',
  suggestedLevel: 12,
  summary: `Le dernier roi nain, Durin le Barbe-de-Pierre, ne repose pas en paix. Son esprit refuse de quitter la crypte royale tant que le serment de protéger la montagne n'est pas honoré.`,
  description: `Les séismes s'intensifient dans les Monts et les anciens tunnels s'effondrent. Le sage Thorin Lame-Ancienne croit que l'esprit du roi Durin le Barbe-de-Pierre est furieux car le serment de protection de la montagne a été trahi quand les nains ont abandonné les niveaux profonds. Pour apaiser le roi fantôme, il faut descendre dans la crypte royale, affronter ses gardes spectraux et prouver sa valeur.`,
  tags: ['boss', 'undead', 'monts_coeur_de_fer', 'dwarf_lore', 'honor'],
  isRepeatable: false,
  prerequisites: { level: 10 },
  acts: [
    {
      actNumber: 1,
      title: 'La Descente Royale',
      description: `Naviguer les épreuves menant à la Crypte.`,
      objectives: [
        { id: 'obj_open_royal_gate', description: 'Ouvrir la Porte Royale avec les Runes de Durin (Arcanes DC 16)', type: 'special', required: true },
        { id: 'obj_defeat_spectral_guards', description: 'Vaincre les Gardiens Spectraux Nains (CR 8, x4)', type: 'kill', target: 'creature_spectral_dwarf', count: 4, required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'L\'Épreuve du Roi',
      description: `Affronter l'esprit de Durin le Barbe-de-Pierre.`,
      objectives: [
        { id: 'obj_face_durin', description: 'Affronter ou parlementer avec l\'esprit du Roi Durin (CR 12)', type: 'combat', target: 'creature_ghost_king_durin', required: true }
      ],
      choices: [
        {
          id: 'choice_durin',
          prompt: 'Le Roi Durin vous met à l\'épreuve. Comment prouvez-vous votre valeur ?',
          options: [
            {
              text: 'Combat d\'honneur — vaincre Durin au corps-à-corps',
              consequence: 'Durin respecte la force. Il accorde sa bénédiction guerrière (+2 Force permanent). La montagne se stabilise.'
            },
            {
              text: 'Serment — jurer de protéger les Monts au nom des nains',
              consequence: 'Durin accepte le serment. Titre "Gardien de la Montagne". Devoir de protéger les Monts lors d\'événements futurs.'
            },
            {
              text: 'Sagesse — rappeler à Durin que les vivants doivent trouver leur propre voie',
              consequence: 'Durin est ému. Il consent à reposer enfin. Laisse derrière lui la Couronne de Pierre (artefact légendaire).',
              itemsGained: ['item_couronne_de_pierre']
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 1500,
    experience: 2000,
    items: ['item_benediction_durin'],
    reputation: [{ faction: 'faction_monts_coeur_fer', amount: 40 }],
    titles: ['Champion des Profondeurs']
  }
};

// ============================================================================
// QUÊTES RÉGIONALES — SYLVE D'ÉMERAUDE
// ============================================================================

export const QUEST_SYLVE_01: QuestDefinition = {
  id: 'quest_exp_sylve_larmes_arbre_monde',
  name: 'Les Larmes de l\'Arbre-Monde',
  title: 'Les Larmes de l\'Arbre-Monde',
  type: 'side',
  category: 'exploration',
  status: 'not_started',
  level: 7,
  questGiver: 'npc_druid_elara_feuille',
  location: 'Sylve d\'Émeraude - Clairière du Cœur',
  region: 'Sylve d\'Émeraude',
  suggestedLevel: 7,
  summary: `L'Arbre-Monde Yggdrasylve, cœur sacré de la forêt, pleure de la sève noire. Les druides craignent qu'il soit en train de mourir.`,
  description: `Yggdrasylve, l'arbre colossal au centre de la Sylve d'Émeraude, verse des larmes de sève noire et amère. La druide Elara Feuille-d'Argent explique que cet arbre millénaire est connecté à tous les arbres du continent. S'il meurt, les forêts entières dépériront. La cause : un parasite magique, un ver d'ombre, s'est logé dans ses racines profondes. Mais atteindre les racines signifie traverser le Labyrinthe Racinaire, un dédale vivant qui change constamment.`,
  tags: ['exploration', 'druid', 'sylve_emeraude', 'nature', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 6 },
  acts: [
    {
      actNumber: 1,
      title: 'Le Labyrinthe Racinaire',
      description: `Traverser le dédale vivant sous l'Arbre-Monde.`,
      objectives: [
        { id: 'obj_enter_labyrinth', description: 'Entrer dans le Labyrinthe Racinaire (rituel druidique ou Persuasion DC 16 avec les gardiens)', type: 'special', required: true },
        { id: 'obj_navigate_maze', description: 'Naviguer le labyrinthe changeant (3 tests de Sagesse DC 14)', type: 'explore', required: true },
        { id: 'obj_defeat_thorns', description: 'Vaincre les Ronces Animées corrompues (CR 5, x3)', type: 'kill', target: 'creature_corrupt_thorns', count: 3, required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Ver d\'Ombre',
      description: `Affronter le parasite et sauver l'Arbre-Monde.`,
      objectives: [
        { id: 'obj_find_worm', description: 'Localiser le Ver d\'Ombre dans les racines profondes', type: 'investigate', required: true },
        { id: 'obj_defeat_worm', description: 'Vaincre le Ver d\'Ombre d\'Yggdrasylve (CR 7)', type: 'combat', target: 'creature_shadow_worm', required: true },
        { id: 'obj_heal_tree', description: 'Appliquer le baume druidique sur les racines blessées', type: 'special', required: true }
      ]
    }
  ],
  rewards: {
    gold: 600,
    experience: 900,
    items: ['item_seve_yggdrasylve', 'item_feuille_eternelle'],
    reputation: [{ faction: 'faction_gardiens_emeraude', amount: 30 }],
    titles: ['Guérisseur de l\'Arbre-Monde']
  },
  loreImpact: 'L\'Arbre-Monde est l\'un des ancrages naturels des Sceaux. Sa guérison renforce les barrières contre le Miroir.'
};

export const QUEST_SYLVE_02: QuestDefinition = {
  id: 'quest_exp_sylve_chasse_sauvage',
  name: 'La Chasse Sauvage',
  title: 'La Chasse Sauvage',
  type: 'side',
  category: 'combat',
  status: 'not_started',
  level: 9,
  questGiver: 'npc_ranger_fenris',
  location: 'Sylve d\'Émeraude - Lisière Nord',
  region: 'Sylve d\'Émeraude',
  suggestedLevel: 9,
  summary: `Une meute de loups spectraux dirigée par un seigneur féerique déchu terrorise la lisière de la forêt. Les chasseurs disparaissent un par un.`,
  description: `Le ranger Fenris Loup-Gris rapporte que la Chasse Sauvage, cortège spectral mené par le seigneur féerique déchu Oberon le Banni, chevauche à nouveau dans la Sylve. Oberon fut exilé du royaume féerique pour avoir tenté de fusionner le plan féerique avec le Plan Matériel. Il traque les mortels qui osent pénétrer son territoire. Neuf chasseurs ont disparu ce mois-ci.`,
  tags: ['combat', 'fey', 'sylve_emeraude', 'hunt', 'spectral'],
  isRepeatable: false,
  prerequisites: { level: 8 },
  acts: [
    {
      actNumber: 1,
      title: 'La Piste des Disparus',
      description: `Traquer la Chasse Sauvage et retrouver les chasseurs.`,
      objectives: [
        { id: 'obj_track_hunt', description: 'Suivre les traces de la Chasse Sauvage (Survie DC 16)', type: 'investigate', required: true },
        { id: 'obj_rescue_hunters', description: 'Retrouver au moins 3 chasseurs captifs dans le Bosquet Tordu', type: 'explore', quantity: 3, required: true },
        { id: 'obj_defeat_wolves', description: 'Vaincre les Loups Spectraux éclaireurs (CR 6, x5)', type: 'kill', target: 'creature_spectral_wolf', count: 5, required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Seigneur Banni',
      description: `Affronter Oberon le Banni.`,
      objectives: [
        { id: 'obj_face_oberon', description: 'Confronter Oberon le Banni (CR 10)', type: 'combat', target: 'creature_oberon_banni', required: true }
      ],
      choices: [
        {
          id: 'choice_oberon',
          prompt: 'Oberon, vaincu, demande grâce. Il offre un pacte.',
          options: [
            {
              text: 'Achever Oberon — mettre fin à la Chasse pour toujours',
              consequence: 'La Chasse Sauvage est dissipée. Le bois est sûr. Mais les fées mineures de la forêt perdent leur protecteur.'
            },
            {
              text: 'Accepter son pacte — il cesse la chasse en échange de liberté',
              consequence: 'Oberon jure de ne plus chasser les mortels. Il devient un allié ambigu. Risque de trahison future.'
            },
            {
              text: 'Le renvoyer au royaume féerique pour être jugé',
              consequence: 'Oberon est ramené au tribunal féerique. +30 réputation Gardiens d\'Émeraude. Possibilité de quête dans le Feywild.',
              reputationChange: [{ faction: 'faction_gardiens_emeraude', amount: 30 }],
              unlocks: ['quest_exp_sylve_tribunal_feerie']
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 700,
    experience: 1200,
    items: ['item_cor_chasse_sauvage', 'item_cape_brume_feerique'],
    reputation: [{ faction: 'faction_gardiens_emeraude', amount: 20 }],
    titles: ['Briseur de la Chasse']
  }
};

// ============================================================================
// QUÊTES RÉGIONALES — CÔTE DES ORAGES
// ============================================================================

export const QUEST_COTE_01: QuestDefinition = {
  id: 'quest_exp_cote_navire_fantome',
  name: 'Le Navire Fantôme du Capitaine Verax',
  title: 'Le Navire Fantôme du Capitaine Verax',
  type: 'side',
  category: 'exploration',
  status: 'not_started',
  level: 8,
  questGiver: 'npc_pecheur_marin',
  location: 'Côte des Orages - Port-Tonnerre',
  region: 'Côte des Orages',
  suggestedLevel: 8,
  summary: `Un navire fantôme apparaît chaque nuit de pleine lune dans la baie de Port-Tonnerre. Le pêcheur Marin jure que c'est le vaisseau du légendaire Capitaine Verax, perdu il y a 200 ans.`,
  description: `Le Requiem de Tempête, vaisseau du redouté Capitaine Verax, se manifeste lors des pleines lunes. Verax était un pirate ashkan qui avait conclu un pacte avec une entité marine du Miroir pour devenir invincible sur les mers. Trahi par son équipage, il fut maudit à errer éternellement. Son trésor, dit-on, contient un artefact ashkan d'une puissance considérable. Mais monter à bord signifie affronter un équipage de morts-vivants et le capitaine lui-même.`,
  tags: ['exploration', 'undead', 'cote_orages', 'pirate', 'ashkan_lore', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 7 },
  acts: [
    {
      actNumber: 1,
      title: 'La Pleine Lune',
      description: `Se préparer et aborder le navire fantôme.`,
      objectives: [
        { id: 'obj_wait_moon', description: 'Attendre la pleine lune à Port-Tonnerre', type: 'special', required: true },
        { id: 'obj_board_ship', description: 'Aborder le Requiem de Tempête (Athlétisme DC 14)', type: 'explore', required: true },
        { id: 'obj_defeat_crew', description: 'Vaincre les Marins Spectraux (CR 5, x6)', type: 'kill', target: 'creature_spectral_sailor', count: 6, required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Capitaine Verax',
      description: `Affronter le capitaine maudit et trouver le trésor.`,
      objectives: [
        { id: 'obj_captain_verax', description: 'Vaincre ou libérer le Capitaine Verax (CR 9)', type: 'combat', target: 'creature_captain_verax', required: true },
        { id: 'obj_find_treasure', description: 'Ouvrir le coffre maudit dans la cale (Arcanes DC 16)', type: 'investigate', required: true }
      ],
      choices: [
        {
          id: 'choice_verax',
          prompt: 'Le Capitaine Verax, à genoux, révèle qu\'il veut être libéré de sa malédiction. Il vous offre le trésor si vous brisez le pacte.',
          options: [
            {
              text: 'Briser le pacte — libérer Verax et son équipage',
              consequence: 'Les spectres trouvent enfin le repos. Verax offre sa carte des trésors cachés et l\'artefact ashkan. Le navire sombre pour toujours.'
            },
            {
              text: 'Prendre le trésor sans libérer Verax',
              consequence: 'Vous emportez le coffre mais la malédiction vous marque. -2 Charisme temporaire (30 jours). Verax jure vengeance.'
            },
            {
              text: 'Détruire l\'artefact ashkan pour empêcher quiconque de l\'utiliser',
              consequence: 'L\'artefact est détruit. Le pacte se brise partiellement. Verax erre toujours mais sans pouvoir. +20 réputation Aube d\'Argent.',
              reputationChange: [{ faction: 'faction_aube_argent', amount: 20 }]
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 2000,
    experience: 1100,
    items: ['item_carte_verax', 'item_artefact_ashkan_marin'],
    reputation: [{ faction: 'faction_cote_orages', amount: 25 }],
    titles: ['Chasseur de Fantômes Marins']
  },
  loreImpact: 'L\'artefact ashkan marin est un fragment d\'un rituel plus large lié aux Sceaux originaux.'
};

export const QUEST_COTE_02: QuestDefinition = {
  id: 'quest_exp_cote_leviathan',
  name: 'L\'Éveil du Léviathan',
  title: 'L\'Éveil du Léviathan',
  type: 'side',
  category: 'boss',
  status: 'not_started',
  level: 14,
  questGiver: 'npc_amiral_stormborn',
  location: 'Côte des Orages - Haute Mer',
  region: 'Côte des Orages',
  suggestedLevel: 14,
  summary: `Un léviathan ancien se réveille dans les profondeurs, menaçant de détruire la flotte de la Côte des Orages. L'amiral Stormborn organise une expédition désespérée.`,
  description: `Le Léviathan Thalassarque, endormi depuis l'Ère Primordiale, se réveille. Son réveil est lié à la fissuration du Sceau Marin, l'un des cinq Sceaux majeurs qui retenaient les créatures primordiales. L'amiral Elise Stormborn rassemble les plus grands héros pour une expédition en haute mer. Le léviathan mesure un demi-kilomètre de long et peut engloutir des navires entiers. La seule chance : trouver la Conque de Commandement, artefact qui permettait aux anciens de communiquer avec les créatures primordiales.`,
  tags: ['boss', 'sea', 'cote_orages', 'primordial', 'seal_link', 'epic'],
  isRepeatable: false,
  prerequisites: { level: 12, quests: ['quest_exp_cote_navire_fantome'] },
  acts: [
    {
      actNumber: 1,
      title: 'La Conque de Commandement',
      description: `Retrouver l'artefact dans les ruines sous-marines.`,
      objectives: [
        { id: 'obj_dive_ruins', description: 'Plonger dans les Ruines de Thalassa (respiration aquatique requise)', type: 'explore', required: true },
        { id: 'obj_defeat_guardians', description: 'Vaincre les Élémentaires d\'Eau corrompus (CR 10, x3)', type: 'kill', target: 'creature_corrupt_water_elem', count: 3, required: true },
        { id: 'obj_retrieve_conch', description: 'Récupérer la Conque de Commandement', type: 'collect', target: 'item_conque_commandement', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Face au Léviathan',
      description: `Confronter Thalassarque en haute mer.`,
      objectives: [
        { id: 'obj_sail_out', description: 'Naviguer jusqu\'au territoire du Léviathan', type: 'travel', required: true },
        { id: 'obj_confront_leviathan', description: 'Utiliser la Conque ou combattre Thalassarque (CR 15)', type: 'combat', target: 'creature_thalassarque', required: true }
      ],
      choices: [
        {
          id: 'choice_leviathan',
          prompt: 'La Conque vous permet de communiquer avec Thalassarque. Il souffre car le Sceau Marin le blesse.',
          options: [
            {
              text: 'Apaiser le Léviathan — réparer le Sceau Marin',
              consequence: 'Le Sceau est réparé. Thalassarque retourne dormir. La Côte est sauve. +50 réputation Côte des Orages, renforce un Sceau majeur.',
              reputationChange: [{ faction: 'faction_cote_orages', amount: 50 }]
            },
            {
              text: 'Tuer le Léviathan — éliminer la menace définitivement',
              consequence: 'Thalassarque meurt. Matériaux légendaires récupérés. Mais le Sceau Marin n\'est pas réparé. Conséquences à long terme.',
              itemsGained: ['item_ecaille_leviathan', 'item_coeur_primordial']
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 5000,
    experience: 3000,
    items: ['item_conque_commandement'],
    reputation: [{ faction: 'faction_cote_orages', amount: 40 }],
    titles: ['Dompteur des Profondeurs']
  },
  loreImpact: 'Le Sceau Marin est l\'un des cinq Sceaux majeurs. Son état affecte directement l\'arc principal.'
};

// ============================================================================
// QUÊTES RÉGIONALES — TERRES BRÛLÉES
// ============================================================================

export const QUEST_TERRES_01: QuestDefinition = {
  id: 'quest_exp_terres_cite_cendres',
  name: 'La Cité dans les Cendres',
  title: 'La Cité dans les Cendres',
  type: 'side',
  category: 'exploration',
  status: 'not_started',
  level: 10,
  questGiver: 'npc_nomade_zahra',
  location: 'Terres Brûlées - Désert de Verre',
  region: 'Terres Brûlées',
  suggestedLevel: 10,
  summary: `Une tempête de sable a révélé les ruines d'une cité ashkan, Kael-Ashura, perdue depuis la Chute. Les nomades disent qu'elle renferme les secrets de l'Hégémonie et la vérité sur les Sceaux.`,
  description: `Zahra des Sables-Rouges, guide nomade, rapporte qu'une tempête exceptionnelle a exhumé Kael-Ashura, la cité-bibliothèque de l'Hégémonie d'Ashka. Cette ville contenait les archives de l'empire, y compris les recherches originales sur les Sceaux et le Miroir des Ombres. Mais la cité est protégée par des gardiens automatiques ashkans toujours fonctionnels, des pièges mortels, et peut-être pire : l'ombre d'un archimage ashkan qui refuse de laisser les secrets partir.`,
  tags: ['exploration', 'dungeon', 'terres_brulees', 'ashkan_lore', 'seal_link', 'major'],
  isRepeatable: false,
  prerequisites: { level: 9 },
  acts: [
    {
      actNumber: 1,
      title: 'Le Désert de Verre',
      description: `Traverser le Désert de Verre pour atteindre Kael-Ashura.`,
      objectives: [
        { id: 'obj_hire_zahra', description: 'Engager Zahra comme guide (2000 PO ou service)', type: 'talk', target: 'npc_nomade_zahra', required: true },
        { id: 'obj_cross_desert', description: 'Traverser le Désert de Verre (3 jours, Constitution DC 14/jour)', type: 'travel', required: true },
        { id: 'obj_reach_kael', description: 'Atteindre les portes de Kael-Ashura', type: 'explore', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Les Archives Interdites',
      description: `Explorer la cité-bibliothèque et récupérer les savoirs perdus.`,
      objectives: [
        { id: 'obj_disable_traps', description: 'Désactiver les pièges ashkans de l\'entrée (Arcanes DC 16)', type: 'special', required: true },
        { id: 'obj_defeat_constructs', description: 'Vaincre les Sentinelles Ashkan (CR 8, x4)', type: 'kill', target: 'creature_ashkan_sentinel', count: 4, required: true },
        { id: 'obj_find_archives', description: 'Localiser la Salle des Archives Centrales', type: 'explore', required: true }
      ]
    },
    {
      actNumber: 3,
      title: 'L\'Archimage Éternel',
      description: `Confronter le gardien spectral de Kael-Ashura.`,
      objectives: [
        { id: 'obj_face_archmage', description: 'Confronter l\'Archimage Kael-Zoran (CR 11)', type: 'combat', target: 'creature_archmage_kael_zoran', required: true },
        { id: 'obj_take_scrolls', description: 'Récupérer les Parchemins des Sceaux', type: 'collect', target: 'item_parchemins_sceaux', required: true }
      ],
      choices: [
        {
          id: 'choice_archives',
          prompt: 'L\'Archimage Kael-Zoran offre de partager ses connaissances si vous jurez de ne pas les divulguer au monde.',
          options: [
            {
              text: 'Accepter le pacte de silence — savoir personnel',
              consequence: 'Vous apprenez la vérité sur les Sceaux mais ne pouvez la partager. Gain de connaissances uniques sur le Miroir.',
              itemsGained: ['item_savoir_interdit_sceaux']
            },
            {
              text: 'Refuser et prendre les parchemins par la force',
              consequence: 'Combat contre l\'Archimage. Parchemins récupérés et partagés avec la Guilde des Arcanes. +30 réputation Guilde des Arcanes.',
              reputationChange: [{ faction: 'faction_guilde_arcanes', amount: 30 }]
            },
            {
              text: 'Proposer de sceller à nouveau la cité pour protéger les secrets',
              consequence: 'La cité est rescellée. +20 réputation Aube d\'Argent. Mais les savoirs sont perdus pour cette génération.',
              reputationChange: [{ faction: 'faction_aube_argent', amount: 20 }]
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 3000,
    experience: 2000,
    items: ['item_parchemins_sceaux', 'item_relique_ashkan'],
    reputation: [{ faction: 'faction_terres_brulees', amount: 25 }],
    titles: ['Explorateur de Kael-Ashura']
  },
  loreImpact: 'Révèle la vérité sur la création originale des Sceaux par l\'Hégémonie d\'Ashka.'
};

export const QUEST_TERRES_02: QuestDefinition = {
  id: 'quest_exp_terres_cercle_cendres',
  name: 'Les Cendres qui Murmurent',
  title: 'Les Cendres qui Murmurent',
  type: 'side',
  category: 'investigation',
  status: 'not_started',
  level: 11,
  questGiver: 'npc_inquisitor_val',
  location: 'Terres Brûlées - Ruines de Khael-Morah',
  region: 'Terres Brûlées',
  suggestedLevel: 11,
  summary: `Un inquisiteur de l'Aube d'Argent enquête sur une cellule du Cercle de Cendres opérant dans les ruines de Khael-Morah. Il soupçonne qu'ils tentent de réactiver un ancien autel ashkan.`,
  description: `L'Inquisiteur Valerian de l'Aube d'Argent a repéré des activités suspectes dans les ruines de Khael-Morah, un ancien temple ashkan dédié aux dieux sombres. Des membres du Cercle de Cendres s'y réunissent pour un rituel que Valerian croit lié à l'affaiblissement des Sceaux. Il cherche des alliés pour infiltrer le temple, identifier les meneurs et stopper le rituel avant la prochaine lune noire.`,
  tags: ['investigation', 'stealth', 'terres_brulees', 'cercle_cendres', 'seal_link', 'faction_aube'],
  isRepeatable: false,
  prerequisites: { level: 10 },
  acts: [
    {
      actNumber: 1,
      title: 'Infiltration',
      description: `S'infiltrer dans les ruines et observer le Cercle de Cendres.`,
      objectives: [
        { id: 'obj_meet_valerian', description: 'Retrouver l\'Inquisiteur Valerian au campement caché', type: 'talk', target: 'npc_inquisitor_val', required: true },
        { id: 'obj_infiltrate_ruins', description: 'S\'infiltrer dans Khael-Morah (Discrétion DC 16)', type: 'stealth', target: 'loc_khael_morah', required: true },
        { id: 'obj_observe_ritual', description: 'Observer le rituel du Cercle sans être repéré', type: 'investigate', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'La Lune Noire',
      description: `Intervenir lors du rituel de la lune noire.`,
      objectives: [
        { id: 'obj_stop_ritual', description: 'Interrompre le rituel (combat ou sabotage)', type: 'special', required: true },
        { id: 'obj_defeat_cultists', description: 'Vaincre les Cultistes du Cercle de Cendres (CR 7, x6)', type: 'kill', target: 'creature_ash_cultist', count: 6, required: true },
        { id: 'obj_capture_leader', description: 'Capturer ou éliminer le meneur du rituel', type: 'combat', target: 'npc_ash_circle_leader', required: true }
      ],
      choices: [
        {
          id: 'choice_cultist_leader',
          prompt: 'Le meneur, à terre, révèle qu\'il fait partie du Cercle car les Sceaux doivent tomber pour "libérer ce qui souffre derrière".',
          options: [
            {
              text: 'Le livrer à l\'Inquisition pour interrogatoire',
              consequence: 'L\'Aube d\'Argent obtient des informations cruciales sur le Cercle de Cendres. +25 réputation Aube d\'Argent.',
              reputationChange: [{ faction: 'faction_aube_argent', amount: 25 }]
            },
            {
              text: 'L\'écouter — peut-être dit-il la vérité sur les Sceaux',
              consequence: 'Vous apprenez une perspective troublante : les Sceaux causent de la souffrance à une entité. Dilemme moral pour la suite. -10 réputation Aube d\'Argent.',
              reputationChange: [{ faction: 'faction_aube_argent', amount: -10 }]
            },
            {
              text: 'L\'exécuter sur place — trop dangereux de le laisser vivre',
              consequence: 'Le meneur est mort. Pas d\'informations supplémentaires. L\'Inquisiteur est satisfait mais inquiet de votre froideur.',
              reputationChange: [{ faction: 'faction_aube_argent', amount: 10 }]
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 1500,
    experience: 1800,
    items: ['item_insigne_cercle_cendres', 'item_grimoire_rituel_ashkan'],
    reputation: [{ faction: 'faction_aube_argent', amount: 20 }],
    titles: ['Pourfendeur du Cercle']
  },
  loreImpact: 'Révèle la motivation du Cercle de Cendres : ils croient que l\'Entité derrière les Sceaux souffre et mérite d\'être libérée.'
};

// ============================================================================
// QUÊTES DE FACTION — AUBE D'ARGENT
// ============================================================================

export const QUEST_FACTION_AUBE_01: QuestDefinition = {
  id: 'quest_exp_faction_aube_epreuve',
  name: 'L\'Épreuve de l\'Aube',
  title: 'L\'Épreuve de l\'Aube',
  type: 'faction',
  category: 'decision',
  status: 'not_started',
  level: 5,
  questGiver: 'npc_commander_aurelia',
  location: 'Sol-Aureus - Forteresse de l\'Aube',
  region: 'Sol-Aureus',
  suggestedLevel: 5,
  summary: `Pour rejoindre l'Aube d'Argent, les recrues doivent passer trois épreuves : Force, Sagesse et Sacrifice. L'épreuve du Sacrifice est la plus redoutée.`,
  description: `La Commandante Aurélia Soleil-Levant propose aux aventuriers de rejoindre l'Aube d'Argent, ordre militaire sacré voué à la protection d'Aethelgard contre les menaces du Miroir. L'initiation comprend trois épreuves : combattre un champion de l'ordre, résoudre un dilemme moral sous pression, et faire un sacrifice personnel. Beaucoup échouent à la troisième épreuve.`,
  tags: ['faction', 'aube_argent', 'trial', 'moral_choice'],
  isRepeatable: false,
  prerequisites: { level: 4, reputation: { faction_aube_argent: 20 } },
  acts: [
    {
      actNumber: 1,
      title: 'Épreuve de Force',
      description: `Combattre le champion de l'Aube en duel rituel.`,
      objectives: [
        { id: 'obj_duel_champion', description: 'Vaincre ou tenir 5 rounds contre Sire Gaëtan (CR 6)', type: 'combat', target: 'npc_sir_gaetan', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Épreuve de Sagesse',
      description: `Résoudre un dilemme moral.`,
      objectives: [
        { id: 'obj_moral_trial', description: 'Répondre au dilemme de la Commandante Aurélia', type: 'choice', required: true }
      ],
      choices: [
        {
          id: 'choice_wisdom_trial',
          prompt: 'Un village est attaqué par des démons. Vous pouvez sauver le village OU intercepter un convoi de prisonniers en route vers un sacrifice. Pas le temps pour les deux.',
          options: [
            {
              text: 'Sauver le village — protéger les innocents immédiats',
              consequence: 'Aurélia approuve le choix instinctif. Les prisonniers meurent. La culpabilité pèse.'
            },
            {
              text: 'Intercepter le convoi — sauver ceux qui mourront à coup sûr',
              consequence: 'Aurélia respecte le calcul. Le village souffre mais survit grâce à sa milice.'
            },
            {
              text: 'Diviser les forces — tenter les deux',
              consequence: 'Aurélia admire l\'audace mais prévient que dans la réalité, cela mène souvent à deux échecs.'
            }
          ]
        }
      ]
    },
    {
      actNumber: 3,
      title: 'Épreuve du Sacrifice',
      description: `Renoncer à quelque chose de personnel.`,
      objectives: [
        { id: 'obj_sacrifice', description: 'Faire un sacrifice personnel (objet précieux, lien, ou promesse)', type: 'choice', required: true }
      ],
      choices: [
        {
          id: 'choice_sacrifice',
          prompt: 'L\'Aube demande un sacrifice sincère. Que donnez-vous ?',
          options: [
            {
              text: 'Un objet précieux — votre possession la plus chère',
              consequence: 'L\'objet est consacré à l\'Aube. Perte de l\'item le plus rare de l\'inventaire. Accepté.'
            },
            {
              text: 'Un serment — jurer de toujours placer les innocents avant soi',
              consequence: 'Serment contraignant. En cas de violation, perte de tous les avantages de l\'Aube d\'Argent.'
            },
            {
              text: 'Une vérité — révéler votre plus grand secret à l\'Aube',
              consequence: 'Votre backstory est connue de l\'Aube. Vulnérabilité mais confiance absolue.'
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 0,
    experience: 800,
    items: ['item_insigne_aube_argent', 'item_cape_aube'],
    reputation: [{ faction: 'faction_aube_argent', amount: 40 }],
    titles: ['Sentinelle de l\'Aube']
  }
};

// ============================================================================
// QUÊTES DE FACTION — GUILDE DES ARCANES
// ============================================================================

export const QUEST_FACTION_ARCANES_01: QuestDefinition = {
  id: 'quest_exp_faction_arcanes_these',
  name: 'La Thèse Interdite',
  title: 'La Thèse Interdite',
  type: 'faction',
  category: 'investigation',
  status: 'not_started',
  level: 7,
  questGiver: 'npc_archimage_theron',
  location: 'Sol-Aureus - Tour des Arcanes',
  region: 'Sol-Aureus',
  suggestedLevel: 7,
  summary: `L'Archimage Théron découvre une thèse interdite dans les archives scellées de la Guilde : un traité ashkan sur la manipulation des Sceaux. Quelqu'un l'a consulté récemment.`,
  description: `L'Archimage Théron Plume-de-Feu convoque les aventuriers pour une affaire délicate. Dans les archives les plus sécurisées de la Tour des Arcanes, quelqu'un a consulté le Traité de Kael-Ashura sur la Manipulation des Sceaux, un texte interdit depuis la Chute. Les protections magiques ont été contournées par quelqu'un de l'intérieur. Il faut identifier le traître avant que les connaissances ne servent au Cercle de Cendres.`,
  tags: ['investigation', 'faction', 'guilde_arcanes', 'intrigue', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 6, reputation: { faction_guilde_arcanes: 15 } },
  acts: [
    {
      actNumber: 1,
      title: 'Enquête Interne',
      description: `Interroger les mages suspects et examiner les indices.`,
      objectives: [
        { id: 'obj_examine_archives', description: 'Examiner les archives scellées (Arcanes DC 16)', type: 'investigate', required: true },
        { id: 'obj_interrogate_mages', description: 'Interroger les 5 mages ayant accès aux archives', type: 'talk', quantity: 5, required: true },
        { id: 'obj_find_clue', description: 'Trouver l\'indice magique laissé par le traître (Perception DC 15)', type: 'investigate', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Traître Démasqué',
      description: `Confronter le coupable.`,
      objectives: [
        { id: 'obj_identify_traitor', description: 'Identifier le traître parmi les suspects', type: 'investigate', required: true },
        { id: 'obj_confront_traitor', description: 'Confronter le Mage Lysandre (le traître)', type: 'talk', target: 'npc_mage_lysandre', required: true }
      ],
      choices: [
        {
          id: 'choice_traitor',
          prompt: 'Lysandre révèle qu\'il a copié le traité pour son propre projet : créer de nouveaux Sceaux plus puissants. Ses intentions sont bonnes mais ses méthodes illégales.',
          options: [
            {
              text: 'Le dénoncer au Conseil des Archimages',
              consequence: 'Lysandre est arrêté et banni. La Guilde est en sécurité mais perd un génie. +30 réputation Guilde des Arcanes.',
              reputationChange: [{ faction: 'faction_guilde_arcanes', amount: 30 }]
            },
            {
              text: 'L\'aider secrètement — ses recherches pourraient sauver Aethelgard',
              consequence: 'Vous devenez complice de Lysandre. Accès à des recherches avancées sur les Sceaux. Risque de découverte. -20 réputation Guilde si découvert.',
              unlocks: ['quest_exp_faction_arcanes_nouveaux_sceaux']
            },
            {
              text: 'Détruire la copie et garder le silence',
              consequence: 'Compromis. Lysandre est reconnaissant mais frustré. La menace est neutralisée pour l\'instant.'
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 1000,
    experience: 900,
    items: ['item_grimoire_arcanique_rare'],
    reputation: [{ faction: 'faction_guilde_arcanes', amount: 20 }],
    titles: ['Enquêteur de la Tour']
  },
  loreImpact: 'Révèle qu\'il est théoriquement possible de créer de nouveaux Sceaux — information cruciale pour l\'arc principal.'
};

// ============================================================================
// QUÊTES DE FACTION — SYNDICAT DE L'OMBRE
// ============================================================================

export const QUEST_FACTION_OMBRE_01: QuestDefinition = {
  id: 'quest_exp_faction_ombre_heist',
  name: 'Le Grand Casse du Trésor Royal',
  title: 'Le Grand Casse du Trésor Royal',
  type: 'faction',
  category: 'stealth',
  status: 'not_started',
  level: 9,
  questGiver: 'npc_maitre_voleur_shade',
  location: 'Sol-Aureus - Quartier des Ombres',
  region: 'Sol-Aureus',
  suggestedLevel: 9,
  summary: `Le Syndicat de l'Ombre planifie le casse du siècle : voler un artefact dans le Trésor Royal de Sol-Aureus. Mais l'artefact n'est pas ce qu'il semble.`,
  description: `Le Maître-Voleur Shade propose le contrat le plus audacieux de l'histoire du Syndicat : infiltrer le Trésor Royal et dérober la Pierre de Minuit, un diamant noir de la taille d'un poing. Ce que Shade ne dit pas, c'est que la Pierre de Minuit est en réalité un cristal de focalisation ashkan qui amplifie les pouvoirs des Sceaux. Le Syndicat a été mandaté par un client anonyme — qui pourrait être le Cercle de Cendres.`,
  tags: ['stealth', 'heist', 'faction', 'syndicat_ombre', 'seal_link', 'moral_choice'],
  isRepeatable: false,
  prerequisites: { level: 8, reputation: { faction_syndicat_ombre: 30 } },
  acts: [
    {
      actNumber: 1,
      title: 'La Préparation',
      description: `Planifier le casse et rassembler l'équipe.`,
      objectives: [
        { id: 'obj_meet_shade', description: 'Rencontrer Shade dans le repaire du Syndicat', type: 'talk', target: 'npc_maitre_voleur_shade', required: true },
        { id: 'obj_recruit_team', description: 'Recruter 3 spécialistes (serrurier, illusionniste, acrobate)', type: 'talk', quantity: 3, required: true },
        { id: 'obj_scout_treasury', description: 'Reconnaître le Trésor Royal (obtenir plans)', type: 'stealth', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Casse',
      description: `Exécuter l'infiltration du Trésor Royal.`,
      objectives: [
        { id: 'obj_bypass_guards', description: 'Contourner les gardes royaux (Discrétion DC 18)', type: 'stealth', required: true },
        { id: 'obj_disable_wards', description: 'Désactiver les protections magiques (Arcanes DC 17)', type: 'special', required: true },
        { id: 'obj_steal_stone', description: 'Récupérer la Pierre de Minuit', type: 'collect', target: 'item_pierre_minuit', required: true },
        { id: 'obj_escape', description: 'S\'échapper du palais sans être repéré', type: 'stealth', required: true }
      ]
    },
    {
      actNumber: 3,
      title: 'La Vérité sur la Pierre',
      description: `Découvrir la nature réelle de la Pierre et choisir.`,
      objectives: [
        { id: 'obj_discover_truth', description: 'Apprendre la vraie nature de la Pierre de Minuit', type: 'investigate', required: true }
      ],
      choices: [
        {
          id: 'choice_stone',
          prompt: 'Vous découvrez que la Pierre de Minuit est un cristal ashkan lié aux Sceaux. Le client anonyme est probablement le Cercle de Cendres.',
          options: [
            {
              text: 'Livrer la Pierre au client — un contrat est un contrat',
              consequence: 'Le Cercle de Cendres obtient un outil pour affaiblir les Sceaux. Conséquences désastreuses. +40 réputation Syndicat, -50 réputation Aube d\'Argent.',
              reputationChange: [{ faction: 'faction_syndicat_ombre', amount: 40 }, { faction: 'faction_aube_argent', amount: -50 }]
            },
            {
              text: 'Garder la Pierre et trahir le Syndicat',
              consequence: 'Pierre en votre possession. Le Syndicat vous met un contrat sur la tête. -60 réputation Syndicat.',
              reputationChange: [{ faction: 'faction_syndicat_ombre', amount: -60 }]
            },
            {
              text: 'Remettre la Pierre à l\'Aube d\'Argent pour la protéger',
              consequence: 'L\'Aube d\'Argent sécurise le cristal. +40 réputation Aube. Syndicat furieux mais impressionné par votre audace. -30 réputation Syndicat.',
              reputationChange: [{ faction: 'faction_aube_argent', amount: 40 }, { faction: 'faction_syndicat_ombre', amount: -30 }]
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 5000,
    experience: 1500,
    items: ['item_outils_voleur_maitre'],
    reputation: [{ faction: 'faction_syndicat_ombre', amount: 15 }],
    titles: ['Ombre Parmi les Ombres']
  },
  loreImpact: 'La Pierre de Minuit est un cristal de focalisation ashkan — les Sceaux utilisent ces cristaux comme ancrages.'
};

// ============================================================================
// QUÊTES DE FACTION — GARDIENS D'ÉMERAUDE
// ============================================================================

export const QUEST_FACTION_GARDIENS_01: QuestDefinition = {
  id: 'quest_exp_faction_gardiens_corruption_bois',
  name: 'Le Bois qui Saigne',
  title: 'Le Bois qui Saigne',
  type: 'faction',
  category: 'exploration',
  status: 'not_started',
  level: 6,
  questGiver: 'npc_archidruide_verde',
  location: 'Sylve d\'Émeraude - Bosquet Ancestral',
  region: 'Sylve d\'Émeraude',
  suggestedLevel: 6,
  summary: `L'Archidruide Verde découvre que des arbres anciens saignent de la sève rouge. Une corruption d'origine inconnue se propage dans le bois sacré.`,
  description: `Le Bosquet Ancestral, lieu le plus sacré des Gardiens d'Émeraude, est contaminé. Les arbres millénaires exsudent une sève rouge sang et les animaux fuient la zone. L'Archidruide Verde soupçonne un acte de sabotage car la corruption suit un motif géométrique précis — une rune ashkan tracée à l'échelle de la forêt. Quelqu'un a empoisonné le sol avec de l'essence du Miroir, créant un cercle rituel invisible depuis le sol mais visible du ciel.`,
  tags: ['exploration', 'druid', 'faction', 'gardiens_emeraude', 'sabotage', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 5, reputation: { faction_gardiens_emeraude: 20 } },
  acts: [
    {
      actNumber: 1,
      title: 'La Rune dans la Forêt',
      description: `Cartographier la corruption et identifier le motif.`,
      objectives: [
        { id: 'obj_map_corruption', description: 'Cartographier les arbres corrompus (Survie DC 14)', type: 'investigate', required: true },
        { id: 'obj_identify_rune', description: 'Reconstituer le motif de la rune ashkan (Intelligence DC 16)', type: 'investigate', required: true },
        { id: 'obj_find_source', description: 'Trouver le point d\'injection du poison au centre de la rune', type: 'explore', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Saboteur',
      description: `Trouver le responsable et purifier la forêt.`,
      objectives: [
        { id: 'obj_track_saboteur', description: 'Pister le saboteur depuis le point d\'injection (Survie DC 16)', type: 'investigate', required: true },
        { id: 'obj_confront_saboteur', description: 'Confronter le druide renégat Thorn (ancien Gardien)', type: 'combat', target: 'npc_druide_thorn', required: true },
        { id: 'obj_purify_grove', description: 'Purifier le Bosquet avec le rituel de Verde', type: 'special', required: true }
      ],
      choices: [
        {
          id: 'choice_thorn',
          prompt: 'Thorn révèle qu\'il empoisonne la forêt car les Gardiens refusent d\'écouter : les Sceaux tuent la nature lentement en aspirant l\'énergie vitale du monde.',
          options: [
            {
              text: 'Arrêter Thorn — les Sceaux protègent le monde',
              consequence: 'Thorn est emprisonné. La forêt est purifiée. +30 réputation Gardiens d\'Émeraude.',
              reputationChange: [{ faction: 'faction_gardiens_emeraude', amount: 30 }]
            },
            {
              text: 'Écouter Thorn et enquêter sur ses accusations',
              consequence: 'Vous découvrez que Thorn a partiellement raison : les Sceaux puisent dans la nature. Dilemme moral.',
              unlocks: ['quest_exp_faction_gardiens_verite_sceaux']
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 500,
    experience: 800,
    items: ['item_amulette_bosquet'],
    reputation: [{ faction: 'faction_gardiens_emeraude', amount: 25 }],
    titles: ['Protecteur du Bosquet']
  },
  loreImpact: 'Révèle que les Sceaux ont un coût : ils drainent l\'énergie vitale du monde naturel pour contenir le Miroir.'
};

// ============================================================================
// QUÊTES PERSONNELLES (BACKSTORY HOOKS)
// ============================================================================

export const QUEST_PERSONAL_01: QuestDefinition = {
  id: 'quest_exp_personal_orphelin',
  name: 'Le Visage dans le Miroir',
  title: 'Le Visage dans le Miroir',
  type: 'side',
  category: 'investigation',
  status: 'not_started',
  level: 5,
  questGiver: 'npc_self',
  location: 'Variable - Selon l\'origine du personnage',
  region: 'Variable',
  suggestedLevel: 5,
  summary: `Un personnage orphelin ou au passé mystérieux commence à voir le visage d'un inconnu dans les miroirs. Ce visage semble essayer de communiquer.`,
  description: `Depuis que les Sceaux se fissurent, les miroirs d'Aethelgard deviennent instables. Un personnage au passé trouble voit un visage qui n'est pas le sien dans les reflets — quelqu'un qui lui ressemble mais... différent. Ce double semble piégé de l'autre côté du Miroir des Ombres. Est-ce un parent perdu ? Un alter ego ? Un piège de l'Entité ? La quête mène à la découverte de liens familiaux avec l'ancienne Hégémonie d'Ashka et les créateurs originaux des Sceaux.`,
  tags: ['personal', 'backstory', 'mirror_link', 'investigation', 'emotional'],
  isRepeatable: false,
  prerequisites: { level: 4 },
  acts: [
    {
      actNumber: 1,
      title: 'Les Reflets Menteurs',
      description: `Enquêter sur les apparitions dans les miroirs.`,
      objectives: [
        { id: 'obj_observe_mirrors', description: 'Observer les reflets anormaux dans 3 miroirs différents', type: 'investigate', quantity: 3, required: true },
        { id: 'obj_consult_oracle', description: 'Consulter un oracle ou voyant sur les visions', type: 'talk', required: true },
        { id: 'obj_research_family', description: 'Rechercher ses origines familiales (Archives DC 14)', type: 'investigate', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'De l\'Autre Côté',
      description: `Tenter de communiquer avec le double dans le miroir.`,
      objectives: [
        { id: 'obj_ritual_contact', description: 'Réaliser un rituel de contact avec le reflet (Arcanes DC 16)', type: 'special', required: true },
        { id: 'obj_learn_truth', description: 'Apprendre la vérité sur le double', type: 'investigate', required: true }
      ],
      choices: [
        {
          id: 'choice_mirror_double',
          prompt: 'Le double révèle être un ancêtre piégé dans le Miroir lors de la création des Sceaux. Il demande à être libéré.',
          options: [
            {
              text: 'Tenter de le libérer — il est de votre sang',
              consequence: 'Rituel dangereux. Réussite : ancêtre libéré, devient mentor spectral. Échec : possession temporaire.',
              unlocks: ['quest_exp_personal_heritage_ashkan']
            },
            {
              text: 'Refuser — c\'est peut-être un piège de l\'Entité',
              consequence: 'Le double comprend. Le lien se maintient à distance. Informations occasionnelles sur le Miroir.'
            },
            {
              text: 'Briser tous les miroirs — couper le lien définitivement',
              consequence: 'Le lien est coupé. Paix intérieure mais perte d\'une source d\'information unique sur le Miroir.'
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 200,
    experience: 700,
    items: ['item_eclat_miroir_ancestral'],
    titles: ['Héritier du Miroir']
  },
  loreImpact: 'Révèle que des âmes sont piégées dans le Miroir des Ombres depuis la création des Sceaux.'
};

export const QUEST_PERSONAL_02: QuestDefinition = {
  id: 'quest_exp_personal_dette_sang',
  name: 'La Dette de Sang',
  title: 'La Dette de Sang',
  type: 'side',
  category: 'combat',
  status: 'not_started',
  level: 8,
  questGiver: 'npc_bounty_hunter_kira',
  location: 'Variable',
  region: 'Variable',
  suggestedLevel: 8,
  summary: `Un chasseur de primes nommé Kira traque un personnage pour une dette de sang contractée par un membre de sa famille. La dette est liée à un ancien pacte avec une entité du Miroir.`,
  description: `Kira Lame-Silencieuse apparaît sans prévenir et exige le paiement d'une dette de sang. Un ancêtre du personnage a conclu un pacte avec une entité mineure du Miroir : pouvoir en échange d'un service futur de la lignée. Ce service est désormais requis : l'entité veut que le personnage accomplisse une tâche dans le monde matériel — saboter un Sceau. Refuser provoque la colère de l'entité, qui envoie des chasseurs d'ombre. Accepter compromet l'intégrité morale.`,
  tags: ['personal', 'backstory', 'combat', 'moral_choice', 'mirror_link', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 7 },
  acts: [
    {
      actNumber: 1,
      title: 'Le Chasseur',
      description: `Affronter ou parlementer avec Kira.`,
      objectives: [
        { id: 'obj_face_kira', description: 'Confronter Kira Lame-Silencieuse', type: 'combat', target: 'npc_bounty_hunter_kira', required: true },
        { id: 'obj_learn_debt', description: 'Apprendre les détails de la dette de sang', type: 'talk', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Pacte Ancestral',
      description: `Résoudre la dette d'une manière ou d'une autre.`,
      objectives: [
        { id: 'obj_resolve_debt', description: 'Trouver un moyen de résoudre la dette', type: 'special', required: true }
      ],
      choices: [
        {
          id: 'choice_blood_debt',
          prompt: 'L\'entité du Miroir exige que vous affaiblissiez un Sceau. Comment résolvez-vous la dette ?',
          options: [
            {
              text: 'Obéir — affaiblir le Sceau comme demandé',
              consequence: 'Le Sceau est affaibli. La dette est payée. Kira disparaît. Mais les conséquences sur le monde sont réelles. -40 réputation Aube d\'Argent.'
            },
            {
              text: 'Tromper l\'entité — simuler l\'affaiblissement',
              consequence: 'L\'entité est dupée temporairement. La dette est en sursis. Kira revient dans 30 jours avec des renforts.'
            },
            {
              text: 'Rompre le pacte par un contre-rituel — affronter la colère de l\'entité',
              consequence: 'Combat contre une Ombre Majeure (CR 9). Si victoire, le pacte est brisé pour toujours. Si défaite, le pacte se renforce.'
            },
            {
              text: 'Convaincre Kira de se retourner contre son employeur',
              consequence: 'Kira hésite. Charisme DC 18. Succès : Kira devient alliée. Échec : combat inévitable.'
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 800,
    experience: 1200,
    items: ['item_briseur_de_pacte'],
    titles: ['Affranchi du Miroir']
  }
};

// ============================================================================
// QUÊTES MYSTÈRE / ENQUÊTE
// ============================================================================

export const QUEST_MYSTERY_01: QuestDefinition = {
  id: 'quest_exp_mystery_meurtres_lune',
  name: 'Les Meurtres de la Lune Rouge',
  title: 'Les Meurtres de la Lune Rouge',
  type: 'side',
  category: 'investigation',
  status: 'not_started',
  level: 7,
  questGiver: 'npc_inspecteur_duval',
  location: 'Sol-Aureus - Quartier Marchand',
  region: 'Sol-Aureus',
  suggestedLevel: 7,
  summary: `Un tueur en série frappe Sol-Aureus à chaque lune rouge. Les victimes sont toutes des descendants d'anciennes familles ashkan. L'inspecteur Duval est dépassé.`,
  description: `Cinq meurtres en cinq lunes rouges. Les victimes, apparemment sans lien, sont toutes des descendants de familles qui servaient l'Hégémonie d'Ashka. Le tueur laisse un symbole de Sceau gravé près de chaque corps. L'inspecteur Duval de la Garde Civile de Sol-Aureus admet être dépassé et fait appel à des aventuriers. Le tueur est en réalité un gardien de Sceau devenu fou : il croit que tuer les descendants ashkans renforce les Sceaux avec leur sang.`,
  tags: ['investigation', 'mystery', 'serial_killer', 'sol_aureus', 'ashkan_lore', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 6 },
  acts: [
    {
      actNumber: 1,
      title: 'Les Indices Sanglants',
      description: `Examiner les scènes de crime et identifier le motif.`,
      objectives: [
        { id: 'obj_examine_scenes', description: 'Examiner 3 scènes de crime (Investigation DC 15)', type: 'investigate', quantity: 3, required: true },
        { id: 'obj_identify_pattern', description: 'Identifier le lien ashkan entre les victimes (Histoire DC 16)', type: 'investigate', required: true },
        { id: 'obj_interview_families', description: 'Interroger les familles des victimes', type: 'talk', quantity: 3, required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Gardien Fou',
      description: `Piéger et confronter le tueur.`,
      objectives: [
        { id: 'obj_predict_target', description: 'Prédire la prochaine victime et tendre un piège', type: 'investigate', required: true },
        { id: 'obj_confront_killer', description: 'Confronter Gardien Séraphin (CR 8) lors de la prochaine lune rouge', type: 'combat', target: 'npc_guardian_seraphin', required: true }
      ],
      choices: [
        {
          id: 'choice_mad_guardian',
          prompt: 'Séraphin pleure en se battant. Il croit sincèrement protéger le monde. Son rituel de sang fonctionne partiellement — les Sceaux se renforcent effectivement.',
          options: [
            {
              text: 'L\'arrêter — les meurtres doivent cesser, quelles que soient les conséquences',
              consequence: 'Séraphin est arrêté. Les Sceaux s\'affaiblissent légèrement. Justice rendue.',
              reputationChange: [{ faction: 'faction_crown', amount: 20 }]
            },
            {
              text: 'Chercher une alternative — peut-on renforcer les Sceaux sans tuer ?',
              consequence: 'Séraphin accepte de chercher un autre moyen. Quête de suivi pour trouver un rituel alternatif.',
              unlocks: ['quest_exp_mystery_rituel_alternatif']
            },
            {
              text: 'Le laisser continuer en secret — les Sceaux doivent tenir',
              consequence: 'Les meurtres continuent. Votre conscience pèse. Si découvert : -50 réputation toutes factions. Les Sceaux se renforcent.'
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 1200,
    experience: 1100,
    items: ['item_insigne_enqueteur'],
    reputation: [{ faction: 'faction_crown', amount: 15 }],
    titles: ['Détective de Sol-Aureus']
  },
  loreImpact: 'Révèle que les Sceaux peuvent être renforcés par le sang des descendants ashkans — un savoir dangereux.'
};

export const QUEST_MYSTERY_02: QuestDefinition = {
  id: 'quest_exp_mystery_bibliotheque_vivante',
  name: 'La Bibliothèque Vivante',
  title: 'La Bibliothèque Vivante',
  type: 'side',
  category: 'exploration',
  status: 'not_started',
  level: 10,
  questGiver: 'npc_librarian_iris',
  location: 'Sol-Aureus - Grande Bibliothèque (Sous-sol interdit)',
  region: 'Sol-Aureus',
  suggestedLevel: 10,
  summary: `Les livres du sous-sol interdit de la Grande Bibliothèque se réécrivent seuls. La bibliothécaire Iris découvre que les textes forment une prophétie en cours d'écriture.`,
  description: `Iris Encre-d'Étoile, bibliothécaire en chef, trouve les livres du sous-sol scellé en train de se réécrire. Les pages se couvrent de textes en vieil ashkan qui décrivent des événements présents et futurs. La bibliothèque elle-même semble vivante : les étagères bougent, les escaliers changent, et une entité de savoir — un Lore-Golem créé par les mages ashkans — se réveille pour protéger ses secrets. La prophétie en cours d'écriture concerne la chute finale des Sceaux.`,
  tags: ['exploration', 'mystery', 'library', 'sol_aureus', 'ashkan_lore', 'prophecy', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 9 },
  acts: [
    {
      actNumber: 1,
      title: 'Les Livres Vivants',
      description: `Explorer le sous-sol animé de la bibliothèque.`,
      objectives: [
        { id: 'obj_enter_basement', description: 'Accéder au sous-sol interdit (Arcanes DC 16 ou clé d\'Iris)', type: 'explore', required: true },
        { id: 'obj_navigate_library', description: 'Naviguer la bibliothèque changeante (3 tests d\'Intelligence DC 14)', type: 'explore', required: true },
        { id: 'obj_read_prophecy', description: 'Traduire les textes ashkans (Vieil Ashkan ou Arcanes DC 18)', type: 'investigate', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Lore-Golem',
      description: `Confronter le gardien de la connaissance.`,
      objectives: [
        { id: 'obj_face_golem', description: 'Affronter ou convaincre le Lore-Golem (CR 10)', type: 'combat', target: 'creature_lore_golem', required: true },
        { id: 'obj_complete_prophecy', description: 'Lire la prophétie complète', type: 'investigate', required: true }
      ],
      choices: [
        {
          id: 'choice_prophecy',
          prompt: 'La prophétie révèle deux futurs possibles pour Aethelgard. Le Lore-Golem vous demande de choisir quel futur préserver dans les livres.',
          options: [
            {
              text: 'Préserver le futur lumineux — espoir et reconstruction',
              consequence: 'Les livres se figent sur la version lumineuse. Inspiration pour les générations futures. +20 réputation Guilde des Arcanes.'
            },
            {
              text: 'Préserver le futur sombre — avertissement pour les générations futures',
              consequence: 'Les livres montrent les dangers. Les futurs lecteurs seront mieux préparés. +20 réputation Aube d\'Argent.'
            },
            {
              text: 'Préserver les deux — la vérité est complexe',
              consequence: 'Le Lore-Golem approuve la sagesse. Les deux versions coexistent. La bibliothèque devient un lieu de pèlerinage intellectuel.'
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 1500,
    experience: 1500,
    items: ['item_tome_prophetie_sceaux', 'item_plume_lore_golem'],
    reputation: [{ faction: 'faction_guilde_arcanes', amount: 25 }],
    titles: ['Lecteur des Futurs']
  },
  loreImpact: 'La prophétie de la bibliothèque donne des indices sur le dénouement de l\'arc des Sceaux.'
};

// ============================================================================
// QUÊTES COMBAT / DONJON
// ============================================================================

export const QUEST_COMBAT_01: QuestDefinition = {
  id: 'quest_exp_combat_arene_legendes',
  name: 'L\'Arène des Légendes',
  title: 'L\'Arène des Légendes',
  type: 'side',
  category: 'combat',
  status: 'not_started',
  level: 10,
  questGiver: 'npc_champion_gorath',
  location: 'Monts Cœur-de-Fer - Arène de Forgehall',
  region: 'Monts Cœur-de-Fer',
  suggestedLevel: 10,
  summary: `L'Arène de Forgehall ouvre son tournoi annuel. Les vainqueurs rejoignent le Panthéon des Champions et gagnent le droit de forger une arme légendaire.`,
  description: `Le Champion Gorath Poing-de-Fer invite les meilleurs combattants d'Aethelgard à participer au Tournoi des Légendes à Forgehall. Le tournoi comprend cinq rounds contre des adversaires de plus en plus redoutables, culminant avec un duel contre Gorath lui-même. Le grand prix : le titre de Champion de Forgehall et le droit de forger une arme dans la Flamme Éternelle, fournaise alimentée par le cœur volcanique de la montagne.`,
  tags: ['combat', 'tournament', 'monts_coeur_de_fer', 'arena', 'legendary_item'],
  isRepeatable: false,
  prerequisites: { level: 9 },
  acts: [
    {
      actNumber: 1,
      title: 'Les Éliminatoires',
      description: `Vaincre trois adversaires en combat singulier.`,
      objectives: [
        { id: 'obj_round_1', description: 'Round 1 : Vaincre le Berserker Nain Brunhild (CR 7)', type: 'combat', target: 'npc_fighter_brunhild', required: true },
        { id: 'obj_round_2', description: 'Round 2 : Vaincre le Duelliste Elfe Silvar (CR 8)', type: 'combat', target: 'npc_fighter_silvar', required: true },
        { id: 'obj_round_3', description: 'Round 3 : Vaincre le Mage de Guerre Draven (CR 9)', type: 'combat', target: 'npc_fighter_draven', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'La Finale',
      description: `Affronter le Champion Gorath.`,
      objectives: [
        { id: 'obj_final_gorath', description: 'Vaincre le Champion Gorath Poing-de-Fer (CR 11)', type: 'combat', target: 'npc_champion_gorath', required: true }
      ]
    }
  ],
  rewards: {
    gold: 3000,
    experience: 2000,
    items: ['item_droit_forge_eternelle'],
    reputation: [{ faction: 'faction_monts_coeur_fer', amount: 35 }],
    titles: ['Champion de Forgehall']
  }
};

export const QUEST_COMBAT_02: QuestDefinition = {
  id: 'quest_exp_combat_donjon_miroir',
  name: 'Le Donjon du Miroir Brisé',
  title: 'Le Donjon du Miroir Brisé',
  type: 'side',
  category: 'boss',
  status: 'not_started',
  level: 13,
  questGiver: 'npc_prophet_ezekiel',
  location: 'Terres Brûlées - Faille du Miroir',
  region: 'Terres Brûlées',
  suggestedLevel: 13,
  summary: `Le Prophète Ezekiel a localisé une faille entre le monde matériel et le Miroir des Ombres. Un donjon impossible s'est formé à la jonction des deux plans.`,
  description: `Au cœur des Terres Brûlées, une faille planaire a créé un donjon qui existe simultanément dans le monde matériel et le Miroir des Ombres. Les salles oscillent entre les deux plans, les ennemis sont des reflets déformés, et la réalité elle-même est instable. Au fond du donjon se trouve un Fragment Majeur de Sceau, gardé par un Seigneur d'Ombre — l'une des entités mineures au service de la grande Entité piégée derrière les Sceaux.`,
  tags: ['boss', 'dungeon', 'terres_brulees', 'mirror', 'planar', 'seal_link', 'major'],
  isRepeatable: false,
  prerequisites: { level: 12 },
  acts: [
    {
      actNumber: 1,
      title: 'L\'Entrée Instable',
      description: `Pénétrer dans la faille et traverser les premiers niveaux.`,
      objectives: [
        { id: 'obj_enter_rift', description: 'Stabiliser l\'entrée de la faille (Arcanes DC 17)', type: 'special', required: true },
        { id: 'obj_floor_1', description: 'Traverser le Niveau 1 : Salle des Reflets (pièges et illusions)', type: 'explore', required: true },
        { id: 'obj_floor_2', description: 'Traverser le Niveau 2 : Combattre vos doubles d\'ombre (CR = niveau du joueur)', type: 'combat', required: true }
      ]
    },
    {
      actNumber: 2,
      title: 'Le Seigneur d\'Ombre',
      description: `Affronter le gardien du Fragment de Sceau.`,
      objectives: [
        { id: 'obj_floor_3', description: 'Traverser le Niveau 3 : La Salle de la Vérité (tests mentaux DC 16)', type: 'special', required: true },
        { id: 'obj_shadow_lord', description: 'Vaincre le Seigneur d\'Ombre Nyx (CR 14)', type: 'combat', target: 'creature_shadow_lord_nyx', required: true },
        { id: 'obj_fragment', description: 'Récupérer le Fragment Majeur de Sceau', type: 'collect', target: 'item_fragment_majeur_sceau', required: true }
      ],
      choices: [
        {
          id: 'choice_fragment',
          prompt: 'Le Fragment Majeur pulse d\'énergie. Nyx, vaincu, murmure que l\'Entité souffre derrière les Sceaux et que briser les Sceaux serait un acte de miséricorde.',
          options: [
            {
              text: 'Ramener le Fragment à l\'Aube d\'Argent pour renforcer les Sceaux',
              consequence: 'Les Sceaux sont renforcés. L\'Entité hurle de douleur. +40 réputation Aube d\'Argent.',
              reputationChange: [{ faction: 'faction_aube_argent', amount: 40 }]
            },
            {
              text: 'Détruire le Fragment — affaiblir les Sceaux par compassion',
              consequence: 'Un Sceau s\'affaiblit. L\'Entité remercie dans vos rêves. Conséquences imprévisibles. -30 réputation Aube d\'Argent.',
              reputationChange: [{ faction: 'faction_aube_argent', amount: -30 }]
            },
            {
              text: 'Étudier le Fragment pour comprendre les Sceaux avant de décider',
              consequence: 'Requiert un mage de haut niveau. Le Fragment est volatile. Temps limité avant qu\'il ne se dégrade.',
              unlocks: ['quest_exp_combat_etude_fragment']
            }
          ]
        }
      ]
    }
  ],
  rewards: {
    gold: 4000,
    experience: 3000,
    items: ['item_fragment_majeur_sceau', 'item_eclat_ombre'],
    reputation: [{ faction: 'faction_aube_argent', amount: 20 }],
    titles: ['Marcheur du Miroir']
  },
  loreImpact: 'Le Fragment Majeur est un élément clé de l\'arc des Sceaux. La décision du joueur influence la fin de l\'arc principal.'
};

// ============================================================================
// QUÊTES SUPPLÉMENTAIRES (résumées pour atteindre 30+)
// ============================================================================

export const QUEST_VALDORE_BENEDICTION: QuestDefinition = {
  id: 'quest_exp_valdore_benediction_fee',
  name: 'La Bénédiction de Lilas',
  title: 'La Bénédiction de Lilas',
  type: 'side',
  category: 'diplomacy',
  status: 'not_started',
  level: 7,
  questGiver: 'npc_fairy_lilas',
  location: 'Val Doré - Clairière Féerique',
  region: 'Val Doré',
  suggestedLevel: 7,
  summary: `La fée Lilas-des-Brumes, libérée du vignoble, vous invite dans sa clairière secrète pour une bénédiction féerique. Mais les faveurs des fées ont toujours un prix.`,
  description: `Lilas propose trois bénédictions : vue féerique (voir l'invisible), voix enchanteresse (Charisme +3), ou pas sylvestre (silence total en mouvement). Chaque bénédiction a un inconvénient caché que Lilas ne mentionne pas — car les fées ne mentent jamais mais omettent volontiers.`,
  tags: ['diplomacy', 'fey', 'val_dore', 'blessing'],
  isRepeatable: false,
  prerequisites: { level: 6, quests: ['quest_exp_valdore_vendanges_sang'] },
  acts: [{ actNumber: 1, title: 'Le Choix Féerique', description: 'Choisir parmi les trois bénédictions de Lilas.', objectives: [{ id: 'obj_choose_blessing', description: 'Choisir une bénédiction féerique', type: 'choice', required: true }] }],
  rewards: { gold: 0, experience: 500, items: ['item_benediction_feerique'] }
};

export const QUEST_COTE_CONTREBANDIERS: QuestDefinition = {
  id: 'quest_exp_cote_contrebandiers',
  name: 'Le Réseau des Contrebandiers',
  title: 'Le Réseau des Contrebandiers',
  type: 'side',
  category: 'stealth',
  status: 'not_started',
  level: 5,
  questGiver: 'npc_douanier_pierre',
  location: 'Côte des Orages - Port-Tonnerre',
  region: 'Côte des Orages',
  suggestedLevel: 5,
  summary: `Le douanier Pierre soupçonne qu'un réseau de contrebandiers fait passer des artefacts ashkans interdits par le port. Il offre une prime pour démanteler le réseau.`,
  description: `Des caisses suspectes transitent par Port-Tonnerre, étiquetées comme du poisson séché mais contenant des reliques ashkan. Le réseau est protégé par un noble local corrompu et utilise les tunnels sous les docks. Infiltrer le réseau révèle que les artefacts sont destinés au Cercle de Cendres.`,
  tags: ['stealth', 'intrigue', 'cote_orages', 'smuggling', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 4 },
  acts: [
    { actNumber: 1, title: 'Les Docks Suspects', description: 'Surveiller les docks et identifier les contrebandiers.', objectives: [
      { id: 'obj_stake_out', description: 'Surveiller les docks la nuit (Perception DC 14)', type: 'investigate', required: true },
      { id: 'obj_follow_smuggler', description: 'Filer un contrebandier jusqu\'à l\'entrepôt secret', type: 'stealth', required: true }
    ]},
    { actNumber: 2, title: 'Le Démantèlement', description: 'Infiltrer et démanteler le réseau.', objectives: [
      { id: 'obj_infiltrate_network', description: 'S\'infiltrer dans le réseau (Discrétion DC 15 ou Tromperie DC 16)', type: 'stealth', required: true },
      { id: 'obj_defeat_smugglers', description: 'Vaincre les contrebandiers (CR 4, x5)', type: 'kill', target: 'creature_smuggler', count: 5, required: true },
      { id: 'obj_seize_artifacts', description: 'Saisir les artefacts ashkans', type: 'collect', required: true }
    ]}
  ],
  rewards: { gold: 800, experience: 600, items: ['item_relique_ashkan_mineure'], reputation: [{ faction: 'faction_cote_orages', amount: 15 }], titles: ['Fléau des Contrebandiers'] }
};

export const QUEST_TERRES_OASIS: QuestDefinition = {
  id: 'quest_exp_terres_oasis_perdue',
  name: 'L\'Oasis Perdue d\'Al-Shadira',
  title: 'L\'Oasis Perdue d\'Al-Shadira',
  type: 'side',
  category: 'exploration',
  status: 'not_started',
  level: 8,
  questGiver: 'npc_nomade_rashid',
  location: 'Terres Brûlées - Désert Central',
  region: 'Terres Brûlées',
  suggestedLevel: 8,
  summary: `Le nomade Rashid connaît l'emplacement d'Al-Shadira, une oasis cachée par une illusion ashkan permanente. L'oasis abrite une communauté secrète de descendants ashkans pacifiques.`,
  description: `Al-Shadira est un sanctuaire caché où des descendants de l'Hégémonie vivent en paix, préservant les savoirs ashkans bénéfiques. Ils possèdent des connaissances sur les Sceaux que personne d'autre n'a. Mais l'illusion qui protège l'oasis s'affaiblit et des pillards l'ont repérée. Il faut renforcer la protection ou aider la communauté à se déplacer.`,
  tags: ['exploration', 'ashkan_lore', 'terres_brulees', 'hidden_community', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 7 },
  acts: [
    { actNumber: 1, title: 'Le Chemin Invisible', description: 'Suivre Rashid jusqu\'à l\'oasis cachée.', objectives: [
      { id: 'obj_follow_rashid', description: 'Suivre Rashid à travers le désert (2 jours)', type: 'travel', required: true },
      { id: 'obj_pass_illusion', description: 'Traverser le voile d\'illusion (Sagesse DC 15)', type: 'special', required: true }
    ]},
    { actNumber: 2, title: 'La Défense d\'Al-Shadira', description: 'Aider les habitants face à la menace.', objectives: [
      { id: 'obj_defend_oasis', description: 'Repousser les pillards (CR 6, x8)', type: 'combat', target: 'creature_desert_raider', count: 8, required: true },
      { id: 'obj_reinforce_illusion', description: 'Aider le Sage d\'Al-Shadira à renforcer l\'illusion (Arcanes DC 17)', type: 'special', required: true }
    ]}
  ],
  rewards: { gold: 1000, experience: 1000, items: ['item_savoir_ashkan_pacifique', 'item_eau_oasis_enchantee'], reputation: [{ faction: 'faction_terres_brulees', amount: 20 }], titles: ['Ami d\'Al-Shadira'] },
  loreImpact: 'Les descendants ashkans d\'Al-Shadira connaissent un moyen de réparer les Sceaux sans sacrifices humains.'
};

export const QUEST_FACTION_OMBRE_GUERRE: QuestDefinition = {
  id: 'quest_exp_faction_ombre_guerre_gangs',
  name: 'La Guerre des Ombres',
  title: 'La Guerre des Ombres',
  type: 'faction',
  category: 'intrigue',
  status: 'not_started',
  level: 8,
  questGiver: 'npc_shade_lieutenant',
  location: 'Sol-Aureus - Bas-Quartiers',
  region: 'Sol-Aureus',
  suggestedLevel: 8,
  summary: `Une guerre de territoire éclate entre le Syndicat de l'Ombre et une nouvelle guilde criminelle, les Crocs Rouges. Le Syndicat demande de l'aide pour éliminer la concurrence.`,
  description: `Les Crocs Rouges, organisation criminelle violente, empiètent sur le territoire du Syndicat. Contrairement au Syndicat qui a des règles (pas de civils, pas d'enfants), les Crocs Rouges n'ont aucun scrupule. Le Syndicat demande de l'aide pour les éliminer. Mais en enquêtant, on découvre que les Crocs Rouges sont financés par le Cercle de Cendres pour déstabiliser Sol-Aureus.`,
  tags: ['intrigue', 'faction', 'syndicat_ombre', 'gang_war', 'sol_aureus'],
  isRepeatable: false,
  prerequisites: { level: 7, reputation: { faction_syndicat_ombre: 15 } },
  acts: [
    { actNumber: 1, title: 'Reconnaissance', description: 'Identifier les repaires des Crocs Rouges.', objectives: [
      { id: 'obj_find_hideouts', description: 'Localiser 3 repaires des Crocs Rouges', type: 'investigate', quantity: 3, required: true },
      { id: 'obj_gather_intel', description: 'Identifier le chef des Crocs Rouges', type: 'investigate', required: true }
    ]},
    { actNumber: 2, title: 'L\'Offensive', description: 'Frapper les Crocs Rouges et découvrir leurs commanditaires.', objectives: [
      { id: 'obj_raid_hideout', description: 'Attaquer le repaire principal (CR 7 x6)', type: 'combat', target: 'creature_red_fang', count: 6, required: true },
      { id: 'obj_boss_fight', description: 'Vaincre le chef Griffe-Rouge (CR 9)', type: 'combat', target: 'npc_griffe_rouge', required: true },
      { id: 'obj_find_evidence', description: 'Trouver la preuve du financement par le Cercle de Cendres', type: 'investigate', required: true }
    ]}
  ],
  rewards: { gold: 2000, experience: 1200, items: ['item_lame_crocs_rouges'], reputation: [{ faction: 'faction_syndicat_ombre', amount: 30 }], titles: ['Loup du Syndicat'] },
  loreImpact: 'Confirme que le Cercle de Cendres cherche à déstabiliser les grandes villes pour faciliter ses rituels.'
};

export const QUEST_PERSONAL_MENTOR: QuestDefinition = {
  id: 'quest_exp_personal_mentor_disparu',
  name: 'Le Mentor Disparu',
  title: 'Le Mentor Disparu',
  type: 'side',
  category: 'investigation',
  status: 'not_started',
  level: 6,
  questGiver: 'npc_self',
  location: 'Variable',
  region: 'Variable',
  suggestedLevel: 6,
  summary: `Le mentor ou figure parentale du personnage a mystérieusement disparu. Des indices mènent aux Terres Brûlées, où il enquêtait secrètement sur les Sceaux.`,
  description: `Le mentor du personnage — maître d'armes, professeur de magie, parent adoptif — n'a plus donné de nouvelles depuis trois mois. Sa dernière lettre mentionnait une découverte importante aux Terres Brûlées. En suivant ses traces, le personnage découvre que son mentor faisait partie d'un réseau secret de chercheurs tentant de comprendre les Sceaux. Il a été capturé par le Cercle de Cendres qui l'utilise pour ses connaissances.`,
  tags: ['personal', 'backstory', 'investigation', 'rescue', 'seal_link'],
  isRepeatable: false,
  prerequisites: { level: 5 },
  acts: [
    { actNumber: 1, title: 'La Piste Froide', description: 'Suivre les dernières traces du mentor.', objectives: [
      { id: 'obj_find_letter', description: 'Retrouver la dernière lettre du mentor', type: 'investigate', required: true },
      { id: 'obj_follow_trail', description: 'Suivre sa piste jusqu\'aux Terres Brûlées (Survie DC 15)', type: 'travel', required: true }
    ]},
    { actNumber: 2, title: 'Le Sauvetage', description: 'Infiltrer le camp du Cercle et libérer le mentor.', objectives: [
      { id: 'obj_find_camp', description: 'Localiser le camp du Cercle de Cendres', type: 'explore', required: true },
      { id: 'obj_rescue_mentor', description: 'Libérer le mentor (combat ou infiltration)', type: 'special', required: true },
      { id: 'obj_escape', description: 'S\'échapper du camp avec le mentor', type: 'stealth', required: true }
    ]}
  ],
  rewards: { gold: 500, experience: 800, items: ['item_journal_mentor'], titles: ['Fidèle Disciple'] },
  loreImpact: 'Le journal du mentor contient des informations partielles sur la structure des Sceaux.'
};

// ============================================================================
// EXPORT PRINCIPAL
// ============================================================================

/** Toutes les quêtes d'expansion, accessibles en un seul tableau */
export const EXPANSION_QUESTS: QuestDefinition[] = [
  // Val Doré
  QUEST_VALDORE_01,
  QUEST_VALDORE_02,
  QUEST_VALDORE_03,
  QUEST_VALDORE_BENEDICTION,
  // Monts Cœur-de-Fer
  QUEST_MONTS_01,
  QUEST_MONTS_02,
  QUEST_MONTS_03,
  // Sylve d'Émeraude
  QUEST_SYLVE_01,
  QUEST_SYLVE_02,
  // Côte des Orages
  QUEST_COTE_01,
  QUEST_COTE_02,
  QUEST_COTE_CONTREBANDIERS,
  // Terres Brûlées
  QUEST_TERRES_01,
  QUEST_TERRES_02,
  QUEST_TERRES_OASIS,
  // Factions
  QUEST_FACTION_AUBE_01,
  QUEST_FACTION_ARCANES_01,
  QUEST_FACTION_OMBRE_01,
  QUEST_FACTION_GARDIENS_01,
  QUEST_FACTION_OMBRE_GUERRE,
  // Quêtes personnelles
  QUEST_PERSONAL_01,
  QUEST_PERSONAL_02,
  QUEST_PERSONAL_MENTOR,
  // Mystères
  QUEST_MYSTERY_01,
  QUEST_MYSTERY_02,
  // Combat / Donjon
  QUEST_COMBAT_01,
  QUEST_COMBAT_02,
];

/** Filtrer les quêtes par région */
export function getQuestsByRegion(region: string): QuestDefinition[] {
  return EXPANSION_QUESTS.filter(q => q.region?.toLowerCase().includes(region.toLowerCase()));
}

/** Filtrer les quêtes par catégorie */
export function getQuestsByCategory(category: string): QuestDefinition[] {
  return EXPANSION_QUESTS.filter(q => q.category === category);
}

/** Filtrer les quêtes par tag */
export function getQuestsByTag(tag: string): QuestDefinition[] {
  return EXPANSION_QUESTS.filter(q => q.tags.includes(tag));
}

/** Quêtes liées aux Sceaux */
export function getSealLinkedQuests(): QuestDefinition[] {
  return EXPANSION_QUESTS.filter(q => q.tags.includes('seal_link'));
}

/** Quêtes par niveau suggéré */
export function getQuestsByLevel(minLevel: number, maxLevel: number): QuestDefinition[] {
  return EXPANSION_QUESTS.filter(q => {
    const lvl = q.suggestedLevel ?? q.level;
    return lvl >= minLevel && lvl <= maxLevel;
  });
}
