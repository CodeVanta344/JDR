// ============================================================
// STATUTS SOCIAUX À LA NAISSANCE - 10 OPTIONS
// Détermine position sociale de la famille
// ============================================================

import type { LifeChoice } from '../../../../types/lore';

export const SOCIAL_STATUSES: LifeChoice[] = [
  {
    id: 'birth_status_nobility',
    stage: 'birth',
    category: 'status',
    label: 'Sang Noble',
    desc: 'Héritier d\'une lignée aristocratique ancienne, élevé dans l\'opulence et les devoirs dynastiques.',
    detailed_lore: {
      backstory: 'Votre famille porte un nom connu depuis des générations. Terres, titres et alliances matrimoniales tissent votre destinée avant même votre naissance. Vous avez grandi entouré de domestiques, tuteurs privés et courtisans calculateurs.',
      defining_moment: 'À votre majorité, votre père vous a remis l\'anneau sigillaire familial en disant : "Ce sceau ouvre plus de portes que cent épées. Ne le déshonore jamais."',
      worldview_shaped: 'Le pouvoir vient du sang et du devoir. Les roturiers méritent protection, mais ne peuvent comprendre le poids des responsabilités nobles.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { charisma: 4, intelligence: 2 },  // Ancien: CHA+2, INT+1
      mechanical_traits: [
        {
          name: 'Privilège Aristocratique',
          desc: '+5 Persuasion avec nobles/autorités, avantage jets sociaux cour royale',
          effect: '+5 Persuasion (Nobles)',  // Ancien: +2 × 2.5 = +5
          game_effect: 'Avantage social politique, accès privilégié décisions royales'
        },
        {
          name: 'Héritage Prestigieux',
          desc: 'Commence avec 1000 PO supplémentaires + obligations familiales (quêtes dynastiques)',
          effect: '+1000 PO',  // Ancien: +200 × 5 = +1000
          game_effect: 'Richesse substantielle mais attentes familiales élevées'
        },
        {
          name: 'Éducation Supérieure',
          desc: '+1d20 aux jets Connaissance (Histoire/Noblesse/Étiquette)',
          effect: '+1d20 Connaissance (spécialisée)',
          game_effect: 'Bonus d100 culture aristocratique et protocole'
        }
      ],
      reputation: [
        { factionId: 'noblesse', delta: 8, reason: 'Membre de l\'aristocratie' },
        { factionId: 'peuple', delta: -3, reason: 'Perçu comme privilégié' },
        { factionId: 'guildes_marchandes', delta: 3, reason: 'Crédit commercial familial' }
      ],
      items: [
        { itemId: 'signet_ring', quantity: 1, reason: 'Sceau familial (armoiries reconnues)' },
        { itemId: 'fine_clothes', quantity: 3, reason: 'Garde-robe noble (tenues formelles)' },
        { itemId: 'gold_coins', quantity: 1000, reason: 'Avance substantielle sur héritage' },
        { itemId: 'letter_of_credit', quantity: 1, reason: 'Crédit auprès banques royales' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 5, reason: 'Éducation courtisane poussée' },  // Ancien: +2 × 2.5 = +5
        { skillId: 'knowledge_nobility', bonus: 5, reason: 'Généalogie, héraldique, protocole' },  // Ancien: +2 × 2.5 = +5
        { skillId: 'insight', bonus: 3, reason: 'Déchiffrer intrigues de cour' }  // Nouveau bonus d100
      ],
      languages: ['Commun', 'Langue Noble', 'Langue des Cours'],  // +1 langue
      tags: ['noble', 'wealthy', 'privileged', 'political', 'educated']
    },
    social_impacts: {
      npc_reactions: {
        'nobles': 'Respect immédiat (+8 disposition) ou rivalité selon faction',
        'paysans': 'Déférence forcée, parfois ressentiment caché',
        'marchands': 'Opportunisme, offres avantageuses',
        'bandits': 'Cible prioritaire rançon',
        'gardes': 'Laxisme, laisser-passer tacite (+5 Intimidation/Persuasion)'
      },
      first_impression: '« Seigneur/Dame, votre présence nous honore. Que puis-je faire pour votre lignée ? » (courbette respectueuse)'
    },
    tags: ['noble', 'wealthy', 'privileged'],
    incompatible_with: ['birth_status_esclave', 'birth_status_orphelin', 'birth_status_paria']
  },

  {
    id: 'birth_status_merchant',
    stage: 'birth',
    category: 'status',
    label: 'Famille Marchande Prospère',
    desc: 'Né dans une famille de commerçants fortunés, entouré de caravanes et de comptes de ledger.',
    detailed_lore: {
      backstory: 'Votre famille a bâti sa fortune sur trois générations de commerce : épices, textiles, armes... L\'argent coule, mais la noblesse vous méprise toujours. Vous avez appris très jeune que chaque conversation est une négociation.',
      defining_moment: 'À quinze ans, votre père vous a envoyé négocier seul un contrat avec la Guilde des Forgerons. Vous avez rapporté 20% de profit en plus que prévu.',
      worldview_shaped: 'Tout est question de valeur et de timing. L\'honneur ne nourrit pas les familles. L\'or achète liberté et respect.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { intelligence: 2, charisma: 2 },  // Ancien: INT+1, CHA+1
      mechanical_traits: [
        {
          name: 'Sens du Commerce',
          desc: '+8 Persuasion (marchandage), prix d\'achat réduits de 15%, +5% ventes',
          effect: '+8 Persuasion (Commerce)',  // Ancien: +3 × 2.5 arrondi = +8
          game_effect: 'Avantage économique majeur, réseau marchand'
        },
        {
          name: 'Réseau Commercial',
          desc: 'Contacts dans 5 villes majeures, accès entrepôts/caravanes',
          effect: 'Réseau marchand actif',
          game_effect: 'Transport marchandises gratuit, info marchés en temps réel'
        }
      ],
      reputation: [
        { factionId: 'guildes_marchandes', delta: 6, reason: 'Famille connue et respectée' },
        { factionId: 'noblesse', delta: -2, reason: 'Nouveaux riches sans titre' },
        { factionId: 'peuple', delta: 2, reason: 'Employeur local' }
      ],
      items: [
        { itemId: 'merchant_ledger', quantity: 1, reason: 'Registre familial (contacts +100)' },
        { itemId: 'gold_coins', quantity: 1000, reason: 'Capital commercial' },  // Ancien: 200 × 5
        { itemId: 'trade_goods', quantity: 5, reason: 'Stock marchandises variées' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 8, reason: 'Négociations quotidiennes intensives' },  // Ancien: +3 × 2.5
        { skillId: 'insight', bonus: 5, reason: 'Détecter menteurs et opportunistes' },  // Ancien: +2 × 2.5
        { skillId: 'appraisal', bonus: 5, reason: 'Évaluation valeur instantanée' }  // Nouveau d100
      ],
      languages: ['Commun', 'Langue Marchande', 'Langue Étrangère (au choix)'],  // +1 langue
      tags: ['merchant', 'wealthy', 'pragmatic', 'urban', 'networked']
    },
    social_impacts: {
      npc_reactions: {
        'marchands': 'Confiance professionnelle (+6 disposition)',
        'nobles': 'Dédain poli mais intéressés par vos contacts',
        'paysans': 'Envie mêlée de respect (vous créez emplois)',
        'voleurs': 'Intérêt marchand, possible protection racket',
        'guildes': 'Portes ouvertes, accès privilégié'
      },
      first_impression: '« Ah, un négociant de la famille [Nom] ! Voyons si nous pouvons trouver un arrangement mutuellement profitable. » (poignée de main calculatrice)'
    },
    tags: ['merchant', 'wealthy', 'pragmatic'],
    incompatible_with: ['birth_status_esclave', 'birth_status_paria', 'birth_status_hermit']
  },

  {
    id: 'birth_status_artisan',
    stage: 'birth',
    category: 'status',
    label: 'Lignée Artisanale Respectée',
    desc: 'Issu d\'une famille de maîtres artisans dont le savoir-faire se transmet depuis quatre générations.',
    detailed_lore: {
      backstory: 'Votre grand-père était Maître Forgeron/Charpentier/Tailleur (selon métier). Votre père a perfectionné l\'art. Vous avez grandi avec l\'odeur du métal chaud, du bois fraîchement scié ou de la teinture. Chaque objet créé porte la marque familiale.',
      defining_moment: 'À treize ans, vous avez fabriqué votre première pièce digne de la marque familiale. Votre père l\'a montrée à toute la guilde avec fierté.',
      worldview_shaped: 'Un travail bien fait est sa propre récompense. Les mains créent ce que l\'esprit conçoit. Le talent se gagne, pas par la naissance, mais par la sueur.'
    },
    effects: {
      stats: { dexterity: 2, intelligence: 2 },  // ×2
      mechanical_traits: [
        {
          name: 'Maître Héritier',
          desc: '+5 à un métier d\'artisanat au choix, outils de maître offerts, +10% qualité crafting',
          effect: '+5 Crafting (spécialité)',  // ×2.5
          game_effect: 'Bonus crafting spécialisé + qualité supérieure'
        }
      ],
      reputation: [
        { factionId: 'guilde_artisans', delta: 5, reason: 'Fils/Fille de Maître' }
      ],
      items: [
        { itemId: 'masterwork_tools', quantity: 1, reason: 'Héritage familial (qualité exceptionnelle)' },
        { itemId: 'crafting_manual', quantity: 1, reason: 'Recueil techniques secrètes' },
        { itemId: 'raw_materials', quantity: 3, reason: 'Stock matériaux premium' }
      ],
      skills: [
        { skillId: 'crafting_choice', bonus: 5, reason: 'Apprentissage familial intensif' },  // ×2.5
        { skillId: 'appraisal', bonus: 3, reason: 'Évaluation matériaux expertise' }  // ×2.5
      ],
      languages: ['Commun', 'Langue du Métier'],
      tags: ['artisan', 'skilled', 'urban', 'practical', 'craftsman']
    },
    social_impacts: {
      npc_reactions: {
        'artisans': 'Respect professionnel immédiat (+5 disposition)',
        'nobles': 'Indifférence polie (sauf si besoin équipement)',
        'aventuriers': 'Intérêt commercial (équipement de qualité)',
        'marchands': 'Respect mutuel, affaires possibles'
      },
      first_impression: '« Votre famille fait du magnifique travail. Pourriez-vous me créer quelque chose ? »'
    },
    tags: ['artisan', 'skilled', 'urban'],
    incompatible_with: ['birth_status_esclave', 'birth_status_nobility']
  },

  {
    id: 'birth_status_paysan',
    stage: 'birth',
    category: 'status',
    label: 'Humble Paysannerie',
    desc: 'Né dans les champs, où chaque repas est une victoire et chaque hiver une épreuve.',
    detailed_lore: {
      backstory: 'Votre famille cultive la même terre depuis six générations. Vous n\'avez jamais connu l\'abondance, mais jamais manqué du nécessaire non plus. Les saisons rythment votre vie : semailles, moissons, repos hivernal.',
      defining_moment: 'Une année de sécheresse a détruit la récolte. Votre village a survécu grâce à l\'entraide. Vous avez appris que la communauté vaut plus que l\'or.',
      worldview_shaped: 'La terre ne ment pas. Le travail honnête nourrit le corps et l\'âme. Les nobles parlent, les paysans font.'
    },
    effects: {
      stats: { constitution: 4 },  // ×2
      mechanical_traits: [
        {
          name: 'Robustesse Paysanne',
          desc: '+25 PV maximum, résistance faim/soif, endurance marathonienne',
          effect: '+25 HP',  // ×5
          game_effect: 'Endurance exceptionnelle, survie prolongée conditions dures'
        }
      ],
      reputation: [
        { factionId: 'peuple', delta: 5, reason: 'Authentiquement issu du peuple' }
      ],
      items: [
        { itemId: 'wooden_tool', quantity: 1, reason: 'Outil agricole familial usé' },
        { itemId: 'dried_rations', quantity: 5, reason: 'Provisions rustiques' }
      ],
      skills: [
        { skillId: 'survival', bonus: 5, reason: 'Vie rurale difficile quotidienne' },  // ×2.5
        { skillId: 'animal_handling', bonus: 3, reason: 'Bétail familial depuis enfance' },  // ×2.5
        { skillId: 'farming', bonus: 5, reason: 'Expertise agriculture' }
      ],
      languages: ['Commun', 'Dialecte Rural'],
      tags: ['rural', 'humble', 'resilient', 'commoner', 'hardy']
    },
    social_impacts: {
      npc_reactions: {
        'paysans': 'Fraternité immédiate',
        'nobles': 'Mépris ou pitié',
        'citadins': 'Condescendance'
      },
      first_impression: '« Un paysan ? Au moins, tu connais la valeur du travail. »'
    },
    tags: ['rural', 'humble', 'resilient'],
    incompatible_with: ['birth_status_nobility']
  },

  {
    id: 'birth_status_clerc',
    stage: 'birth',
    category: 'status',
    label: 'Famille Cléricale Dévouée',
    desc: 'Élevé dans l\'ombre d\'un temple, baigné de prières et de rituels sacrés.',
    detailed_lore: {
      backstory: 'Votre mère/père était prêtre/prêtresse d\'un dieu majeur. Vous avez grandi entre encens et psaumes, assistant aux rites dès l\'enfance. La foi imprègne chaque instant de votre vie.',
      defining_moment: 'Lors d\'une cérémonie, une lumière divine a touché votre front. Le Grand Prêtre a murmuré : "Les dieux ont des plans pour toi."',
      worldview_shaped: 'La foi guide, la raison suit. Le divin transcende le mortel. Servir les dieux, c\'est servir l\'humanité.'
    },
    effects: {
      stats: { wisdom: 4, charisma: 2 },  // ×2
      mechanical_traits: [
        {
          name: 'Béni des Dieux',
          desc: '+5 Religion, +3 Médecine, +1d20 jets sorts divins',
          effect: '+5 Religion, +3 Médecine',  // ×2.5
          game_effect: 'Synergie cléric/paladin, bonus lanceur divin'
        }
      ],
      reputation: [
        { factionId: 'eglises', delta: 6, reason: 'Famille sacerdotale reconnue' },
        { factionId: 'cultes_interdits', delta: -5, reason: 'Ennemi doctrinaire orthodoxe' }
      ],
      items: [
        { itemId: 'holy_symbol', quantity: 1, reason: 'Symbole familial béni' },
        { itemId: 'prayer_book', quantity: 1, reason: 'Livre prières annotées générations' },
        { itemId: 'blessed_water', quantity: 3, reason: 'Eau bénite réserve temple' }
      ],
      skills: [
        { skillId: 'religion', bonus: 5, reason: 'Éducation théologique approfondie' },  // ×2.5
        { skillId: 'medicine', bonus: 3, reason: 'Soins malades pèlerins quotidiens' },  // ×2.5
        { skillId: 'insight', bonus: 3, reason: 'Lecture âmes confessions' }
      ],
      languages: ['Commun', 'Langue Sacrée', 'Langue Ancienne'],
      tags: ['religious', 'devout', 'educated', 'spiritual', 'healer']
    },
    social_impacts: {
      npc_reactions: {
        'croyants': 'Respect pieux immédiat (+6 disposition)',
        'athées': 'Méfiance intellectuelle',
        'hérétiques': 'Hostilité doctrinale',
        'malades': 'Espoir (vous êtes guérisseur potentiel)'
      },
      first_impression: '« Que les dieux vous gardent, enfant béni de la foi. Votre lignée sacerdotale honore notre temple. »'
    },
    tags: ['religious', 'devout', 'educated'],
    incompatible_with: ['birth_status_paria', 'birth_status_criminel', 'birth_status_heretique']
  },

  {
    id: 'birth_status_orphelin',
    stage: 'birth',
    category: 'status',
    label: 'Orphelin des Rues',
    desc: 'Abandonné ou orphelin très jeune, élevé par les rues impitoyables de la ville.',
    detailed_lore: {
      backstory: 'Vous ne connaissez pas vos parents. Peut-être sont-ils morts de peste, peut-être vous ont-ils abandonnés. Vous avez survécu en mendiant, volant et dormant sous les ponts. La guilde des voleurs ou une bande de gamins des rues sont votre seule famille.',
      defining_moment: 'À dix ans, vous avez volé un pain. Le boulanger vous a attrapé... puis nourri. "Personne ne devrait voler pour manger", a-t-il dit.',
      worldview_shaped: 'Personne ne te fait de cadeaux. La loi protège les riches, pas les faibles. La survie justifie tout.'
    },
    effects: {
      stats: { dexterity: 4, constitution: 2 },  // ×2
      stats_penalty: { charisma: 2 },  // Pénalité sociale ×2
      mechanical_traits: [
        {
          name: 'Instinct de Survie Urbaine',
          desc: '+8 Discrétion, +5 Escamotage, sens danger urbain, +1d20 éviter embuscades',
          effect: '+8 Stealth, +5 Sleight of Hand',  // ×2.5
          game_effect: 'Maître infiltration urbaine + pickpocket expert'
        },
        {
          name: 'Cicatrices des Rues',
          desc: 'Résistance faim/froid, dort n\'importe où, détecte mensonges (survie)',
          effect: 'Endurance urbaine',
          game_effect: 'Avantage survie ville, détection pièges sociaux'
        }
      ],
      reputation: [
        { factionId: 'guilde_voleurs', delta: 3, reason: 'Reconnu ancien des rues respecté' },
        { factionId: 'autorites', delta: -2, reason: 'Suspect par défaut profil criminel' },
        { factionId: 'orphelins', delta: 5, reason: 'Héros pour autres démunis' }
      ],
      items: [
        { itemId: 'lockpicks', quantity: 1, reason: 'Outils survie volés/gagnés' },
        { itemId: 'street_map', quantity: 1, reason: 'Carte mentale ruelles/égouts' }
      ],
      skills: [
        { skillId: 'stealth', bonus: 8, reason: 'Éviter gardes patrouilles quotidiennes' },  // ×2.5
        { skillId: 'sleight_of_hand', bonus: 5, reason: 'Vol tire survie depuis enfance' },  // ×2.5
        { skillId: 'perception', bonus: 5, reason: 'Vigilance permanente danger rue' }
      ],
      languages: ['Commun', 'Argot des Rues', 'Langage Signes Voleurs'],
      tags: ['orphan', 'street', 'survivor', 'outcast', 'rogue']
    },
    social_impacts: {
      npc_reactions: {
        'gardes': 'Suspicion',
        'nobles': 'Dégoût',
        'autres_orphelins': 'Solidarité',
        'voleurs': 'Reconnaissance'
      },
      first_impression: '« Un orphelin ? Garde tes poches, il pourrait les délester. »'
    },
    tags: ['orphan', 'street', 'survivor'],
    incompatible_with: ['birth_status_nobility', 'birth_status_merchant']
  },

  {
    id: 'birth_status_esclave',
    stage: 'birth',
    category: 'status',
    label: 'Esclave Affranchi',
    desc: 'Né dans les chaînes puis libéré par révolte, maître clément ou fuite héroïque. Les cicatrices demeurent mais forgent une volonté d\'acier.',
    detailed_lore: {
      backstory: 'Vous êtes né propriété légale d\'un maître. Fouets, travaux forcés et humiliations rythmaient vos jours. Peut-être étiez-vous esclave dans les mines de fer de Karag-Mor, domestique dans une villa marchande d\'Astralyss, ou gladiateur dans les arènes de Tyr-Valdor. Un événement pivot (révolte, testament d\'affranchissement, fuite audacieuse) vous a libéré. Mais les marques des chaînes (physiques et mentales) restent visibles.',
      defining_moment: 'Le jour où vos chaînes ont été brisées, vous avez vu le ciel libre pour la première fois depuis des années. Vous avez juré sur votre sang : "Plus jamais je ne m\'agenouillerai devant personne. Ma vie m\'appartient désormais."',
      worldview_shaped: 'La liberté est le plus précieux des trésors, valant plus que tout l\'or du monde. Aucune vie n\'appartient à une autre. Les puissants qui exploitent les faibles méritent défiance éternelle. Vous portez la cause abolitionniste comme bannière sacrée.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { wisdom: 4, constitution: 2 },  // Ancien: WIL+2 CON+1 → WIS+4 CON+2
      stats_penalty: { charisma: 2 },  // Ancien: CHA-1 → CHA-2 (cicatrices stigmatisantes)
      mechanical_traits: [
        {
          name: 'Volonté Indomptable',
          desc: '+5 Athlétisme, avantage jets sauvegarde contre charme/terreur/domination mentale, ignore 1 niveau épuisement',
          effect: '+5 Athletics',  // ×2.5
          game_effect: 'Résistance mentale légendaire + endurance exceptionnelle travaux forcés'
        },
        {
          name: 'Marqué par les Chaînes',
          desc: 'Cicatrices visibles (poignets, dos, chevilles), -5 Persuasion avec nobles/autorités, +5 Intimidation (regard hanté)',
          effect: '-5 Persuasion (nobles), +5 Intimidation',
          game_effect: 'Malus social aristocratie compensé rage visible'
        },
        {
          name: 'Libérateur Né',
          desc: '+1d20 aux jets pour libérer prisonniers/esclaves ou affronter esclavagistes, avantage détecter pièges/chaînes',
          effect: '+1d20 Libération',
          game_effect: 'Bonus d100 missions abolitionnistes + instinct sécurité'
        }
      ],
      reputation: [
        { factionId: 'abolitionnistes', delta: 10, reason: 'Ancien esclave devenu symbole vivant' },
        { factionId: 'esclavagistes', delta: -15, reason: 'Fugitif recherché, récompense possible' },
        { factionId: 'gladiateurs', delta: 5, reason: 'Respect frères d\'armes arènes (si applicable)' },
        { factionId: 'esclaves_actuels', delta: 8, reason: 'Héros inspirant espoir de liberté' }
      ],
      items: [
        { itemId: 'broken_shackle_iron', quantity: 1, reason: 'Chaîne brisée portée en collier (symbole liberté conquise)' },
        { itemId: 'whip_scars_map', quantity: 1, reason: 'Carte corporelle cicatrices (récit visuel souffrance)' },
        { itemId: 'freedom_token', quantity: 1, reason: 'Papiers d\'affranchissement (précieux, falsifiés ou légitimes)' }
      ],
      skills: [
        { skillId: 'athletics', bonus: 5, reason: 'Travaux forcés quotidiens développent force brute' },  // ×2.5
        { skillId: 'intimidation', bonus: 5, reason: 'Rage contenue + regard ayant vu l\'enfer' },  // ×2.5
        { skillId: 'survival', bonus: 3, reason: 'Survivre rations minimales, environnements hostiles' }
      ],
      gold: 0,  // Commence sans ressources (ancien: implicite 0)
      languages: ['Commun', 'Langue Esclavagiste (ancien maître)', 'Code Gladiateurs (si arènes)'],  // +2 langues
      tags: ['former_slave', 'survivor', 'vengeful', 'scarred', 'abolitionist', 'free']
    },
    social_impacts: {
      npc_reactions: {
        'abolitionnistes': 'Compassion profonde (+10 disposition)',
        'nobles': 'Mépris ou gêne malaise (-8 disposition)',
        'esclaves_actuels': 'Espoir vibrant, vénération (+12 disposition)',
        'esclavagistes': 'Hostilité meurtrière, arrestation immédiate (-20 disposition)',
        'citoyens_libres': 'Pitié mêlée peur stigmates (-3 disposition)',
        'gladiateurs': 'Solidarité fraternelle arènes (+7 disposition)'
      },
      first_impression: '« Ces marques aux poignets... Tu étais esclave ? Les dieux te protègent maintenant. Ne retourne jamais là-bas. »',
      long_term_perception: 'Symbole vivant de résilience humaine. Certains te voient héros abolitionniste, d\'autres fugitif dangereux. Rares sont ceux indifférents.'
    },
    tags: ['former_slave', 'survivor', 'vengeful', 'abolitionist'],
    incompatible_with: ['birth_status_nobility', 'birth_status_merchant', 'birth_status_clerc']
  },

  {
    id: 'birth_status_batard',
    stage: 'birth',
    category: 'status',
    label: 'Bâtard Noble (Non Reconnu)',
    desc: 'Sang noble mais nom refusé. Fruit d\'une liaison illégitime, vous portez l\'héritage aristocratique dans vos veines mais vivez dans l\'ombre du château.',
    detailed_lore: {
      backstory: 'Votre mère (servante, courtisane, fille d\'aubergiste) ou votre père était noble, mais vous êtes né hors mariage sacré. Vous avez grandi dans l\'ombre d\'un château, sachant qui vous êtes vraiment, mais jamais reconnu officiellement. Peut-être votre parent noble vous a-t-il aidé discrètement (éducation secrète, argent anonyme), ou au contraire nié farouchement votre existence par peur du scandale. Vous voyiez vos demi-frères légitimes recevoir titres et terres tandis que vous restiez invisible.',
      defining_moment: 'Lors d\'un banquet royal, vous avez servi vin à votre parent géniteur noble. Vos yeux se sont croisés un instant—il/elle vous a reconnu(e), vous avez vu la gêne traverser son visage... puis il/elle a détourné les yeux et ri bruyamment avec ses enfants légitimes comme si vous n\'existiez pas.',
      worldview_shaped: 'Le sang ne suffit pas, seul le nom compte dans ce monde hypocrite. Je dois prouver ma valeur par mes actes héroïques, pas par ma lignée contestée. Peut-être qu\'un jour, mon parent me reconnaîtra... ou je surpasserai sa gloire et rendrai son rejet pathétique.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { charisma: 2, wisdom: 2 },  // Ancien: CHA+1 WIL+1 → CHA+2 WIS+2 (charme naturel + clairvoyance douloureuse)
      mechanical_traits: [
        {
          name: 'Héritage Contesté',
          desc: '+3 Persuasion/Intimidation avec nobles (ambiguïté intrigante), +5 Insight détecter hypocrisie, mais désavantage héritages/testaments',
          effect: '+3 Persuasion, +5 Insight',  // ×2.5
          game_effect: 'Ambiguïté sociale fascinante mais juridiquement fragile'
        },
        {
          name: 'Fierté Blessée',
          desc: 'Avantage jets pour prouver sa valeur (concours, duels d\'honneur, exploits publics), +1d20 impressionner nobles',
          effect: '+1d20 Prouver Valeur',
          game_effect: 'Bonus d100 quêtes reconnaissance publique'
        },
        {
          name: 'Éducation Secrète',
          desc: '+3 Knowledge (Histoire/Étiquette Noble), lecture/écriture, manières aristocratiques (accès discret bibliothèques)',
          effect: '+3 Knowledge (Noblesse)',
          game_effect: 'Culture noble sans privilèges officiels'
        }
      ],
      reputation: [
        { factionId: 'noblesse', delta: -5, reason: 'Bâtard connu, scandale ambulant' },
        { factionId: 'peuple', delta: 4, reason: 'Perçu victime injustice aristocratique' },
        { factionId: 'batards_nobles', delta: 7, reason: 'Solidarité fraternelle avec autres non-reconnus' },
        { factionId: 'herauts', delta: -3, reason: 'Problème généalogique embarrassant' }
      ],
      items: [
        { itemId: 'mothers_locket_noble', quantity: 1, reason: 'Médaillon maternel contenant portrait miniature parent noble (seul lien tangible)' },
        { itemId: 'unsigned_letter', quantity: 1, reason: 'Lettre non signée d\'un parent anonyme (reconnaissance implicite, jamais avouée)' },
        { itemId: 'bastard_sigil', quantity: 1, reason: 'Blason familial avec barre sinistre (héraldique bâtarde)' }
      ],
      skills: [
        { skillId: 'persuasion', bonus: 3, reason: 'Besoin constant prouver sa valeur, charme compensatoire' },  // ×2.5
        { skillId: 'insight', bonus: 5, reason: 'Détecter mensonges, hypocrisie courtisane, faux-semblants nobles' },  // ×2.5
        { skillId: 'deception', bonus: 3, reason: 'Cacher honte, feindre indifférence aux rejets répétés' }
      ],
      gold: 500,  // Ancien: implicite moyen → +500 PO (héritage secret modeste)
      languages: ['Commun', 'Langue Noble (dialecte courtisan)', 'Latin Héraldique (partiel)'],  // +2 langues
      tags: ['bastard', 'noble_blood', 'outcast', 'ambitious', 'wounded_pride', 'unrecognized']
    },
    social_impacts: {
      npc_reactions: {
        'nobles': 'Gêne palpable ou mépris ouvert (-6 disposition)',
        'roturiers': 'Sympathie pour victime système (-4 disposition)',
        'autres_batards': 'Solidarité immédiate fraternelle (+10 disposition)',
        'herauts': 'Irritation professionnelle problème lignée (-4 disposition)',
        'courtisans': 'Curiosité malsaine, potentiel scandale (+2 disposition)',
        'parent_noble': 'Malaise écrasant, fuite conversation (variable)'
      },
      first_impression: '« Un bâtard noble ? Le sang pur coule en toi, mais pas le nom qui compte. Quel dommage... ou quelle opportunité. »',
      long_term_perception: 'Énigme sociale vivante. Certains admirent ta résilience, d\'autres jubilent de ton humiliation permanente. Ton existence même interroge fondements aristocratiques.'
    },
    tags: ['bastard', 'noble_blood', 'outcast', 'ambitious'],
    incompatible_with: ['birth_status_nobility', 'birth_status_peasant']
  },

  {
    id: 'birth_status_criminel',
    stage: 'birth',
    category: 'status',
    label: 'Famille Criminelle Notoire',
    desc: 'Né dans une lignée de hors-la-loi célèbres : bandits de grand chemin, contrebandiers, empoisonneurs ou assassins. La loi te traque par ton nom de famille.',
    detailed_lore: {
      backstory: 'Votre famille n\'est pas de celles qu\'on présente aux autorités. Père voleur de grand chemin légendaire, mère empoisonneuse réputée, oncle contrebandier contrôlant ports clandestins, tante maîtresse-assassin de la Guilde des Ombres... Vous avez grandi entre coups fourrés, marchandages nocturnes avec la pègre et fuites précipitées devant milices. Vos premières leçons furent crocheter serrures, détecter pièges et mentir avec conviction. Le nom de votre famille ouvre portes souterraines mais attire regards suspects gardes.',
      defining_moment: 'À douze ans, vous avez participé à votre premier "coup" (cambriolage manoir noble, contrebande armes, ou élimination témoin gênant). Après succès, votre père/mère vous a remis dague familiale gravée et dit : "Tu es des nôtres maintenant. Bienvenue dans la famille. Que la loi tremble à notre nom."',
      worldview_shaped: 'Les lois protègent riches et puissants, pas nous. Survivre nécessite enfreindre règles arbitraires. La loyauté familiale prime sur morale hypocrite société. L\'honneur des voleurs existe vraiment—parole donnée entre criminels vaut plus que serments nobles.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { dexterity: 2, intelligence: 2 },  // Ancien: DEX+1 INT+1 → DEX+2 INT+2 (agilité + ruse stratégique)
      mechanical_traits: [
        {
          name: 'Contacts Obscurs',
          desc: 'Accès réseau criminel (guildes voleurs, contrebandiers, receleurs), +5 Investigation (monde souterrain), réduction 25% prix marché noir',
          effect: '+5 Investigation (criminel)',  // ×2.5
          game_effect: 'Avantage informations illicites + commerce clandestin'
        },
        {
          name: 'Entraînement Familial Précoce',
          desc: '+5 Stealth, +5 Deception, maîtrise outils voleur (lockpicks, disguise kit), connaissance codes pègre',
          effect: '+5 Stealth, +5 Deception',  // ×2.5
          game_effect: 'Compétences criminelles héritées depuis enfance'
        },
        {
          name: 'Nom Maudit',
          desc: '-8 disposition autorités/gardes (arrestation préventive possible), +1d20 échapper poursuites si préparation',
          effect: '+1d20 Évasion',
          game_effect: 'Malus légal compensé expertise fuite'
        }
      ],
      reputation: [
        { factionId: 'guilde_voleurs', delta: 8, reason: 'Nom familial respecté/redouté pègre' },
        { factionId: 'autorites', delta: -12, reason: 'Famille recherchée, récompenses actives' },
        { factionId: 'contrebandiers', delta: 6, reason: 'Connexions commerciales établies' },
        { factionId: 'assassins', delta: 5, reason: 'Liens professionnels Guilde Ombres (si applicable)' },
        { factionId: 'citoyens_honnetes', delta: -5, reason: 'Peur rumeurs familiales violentes' }
      ],
      items: [
        { itemId: 'fathers_dagger_notched', quantity: 1, reason: 'Dague paternelle gravée symbole familial, 7 encoches (victimes)' },
        { itemId: 'thieves_tools_heirloom', quantity: 1, reason: 'Outils voleur qualité supérieure (héritage maternel)' },
        { itemId: 'fence_contact_list', quantity: 1, reason: 'Liste codée receleurs fiables 5 villes majeures' },
        { itemId: 'poison_vial_sample', quantity: 1, reason: 'Fiole poison paralysant (recette familiale secrète)' }
      ],
      skills: [
        { skillId: 'stealth', bonus: 5, reason: 'Éviter patrouilles depuis adolescence' },  // ×2.5
        { skillId: 'deception', bonus: 5, reason: 'Mensonge vital survie quotidienne' },  // ×2.5
        { skillId: 'sleight_of_hand', bonus: 3, reason: 'Pickpocket, escamotage preuves' },
        { skillId: 'investigation', bonus: 5, reason: 'Repérer cibles, faiblesses sécurité' }
      ],
      gold: 750,  // Ancien: implicite moyen → +750 PO (butin familial partagé)
      languages: ['Commun', 'Cant des Voleurs', 'Code Contrebandiers'],  // +2 langues
      tags: ['criminal', 'outlaw', 'connections', 'hunted', 'family_legacy', 'notorious']
    },
    social_impacts: {
      npc_reactions: {
        'gardes': 'Arrestation préventive ou surveillance constante (-15 disposition)',
        'voleurs': 'Respect craintif ou rivalité jalouse (+8 disposition)',
        'citoyens_honnetes': 'Peur palpable, évitement physique (-7 disposition)',
        'nobles': 'Dégoût absolu, demande expulsion (-10 disposition)',
        'receleurs': 'Affaires privilégiées, crédit commercial (+12 disposition)',
        'assassins': 'Reconnaissance professionnelle (si lignée assassins, +9 disposition)'
      },
      first_impression: '« Ton nom... J\'ai entendu parler de ta famille. Les gardes te recherchent. Fais attention à toi... ou aux autres. »',
      long_term_perception: 'Héritage criminel double tranchant. Portes pègre ouvertes, mais vie légale presque impossible. Certains admirent audace familiale, plupart te craignent.'
    },
    tags: ['criminal', 'outlaw', 'connections', 'hunted'],
    incompatible_with: ['birth_status_nobility', 'birth_status_clerc', 'birth_status_guard']
  },

  {
    id: 'birth_status_paria',
    stage: 'birth',
    category: 'status',
    label: 'Paria Maudit',
    desc: 'Né sous malédiction ancestrale ou mauvais présage céleste. Intouchable social rejeté universellement, survivant aux marges civilisation par volonté indomptable.',
    detailed_lore: {
      backstory: 'Votre famille porte malédiction ancestrale (génocide oublié, pacte démoniaque ancien, trahison divine) ou votre naissance fut marquée mauvais présage (éclipse totale, comète rouge, cri corbeaux). Villages entiers vous chassent à coups pierres. Même mendiants vous évitent comme pestiférés. Prêtres refusent vous bénir. Guildes rejettent candidature. Vous survivez aux marges civilisation : forêts maudites, ruines hantées, cimetières abandonnés. Votre seule compagnie : animaux sauvages, esprits errands, ou rares parias similaires.',
      defining_moment: 'Enfant affamé, vous avez tenté jouer avec autres enfants village. Parents horrifiés les ont rappelés violemment criant : "Ne touche JAMAIS le maudit ! Son ombre porte mort !" Vous avez compris ce jour-là que monde ne vous verrait jamais comme humain.',
      worldview_shaped: 'Le monde me rejette comme déchet. Je ne lui dois rien—ni obéissance, ni pitié, ni allégeance. Ma seule loyauté va aux rares âmes assez courageuses (ou désespérées) pour me voir comme personne, pas symbole malheur. Si société veut monstre, peut-être deviendrai-je celui qu\'ils craignent.'
    },
    effects: {
      // ========== STATS D100 (×2) ==========
      stats: { wisdom: 4 },  // Ancien: WIL+2 → WIS+4 (résilience mentale extrême solitude)
      stats_penalty: { charisma: 4 },  // Ancien: CHA-2 → CHA-4 (aura maudite repoussante)
      mechanical_traits: [
        {
          name: 'Esprit Endurci par Rejet',
          desc: 'Immunité effets psychologiques sociaux (charme, terreur sociale, manipulation émotionnelle), +8 Perception détecter mensonges/pièges sociaux, avantage jets Volonté',
          effect: '+8 Perception',  // ×2.5
          game_effect: 'Résistance mentale légendaire forgée souffrance'
        },
        {
          name: 'Aura de Malédiction Palpable',
          desc: '-10 jets sociaux (Persuasion/Deception/Performance), mais +5 Intimidation (peur instinctive), +5 Survival (vie marginale), animaux tolèrent présence',
          effect: '-10 Social, +5 Intimidation, +5 Survival',  // ×2.5
          game_effect: 'Pénalité sociale massive compensée survie + terreur inspirée'
        },
        {
          name: 'Résilience du Paria',
          desc: '+1d20 résister maladies/poisons (système immunitaire renforcé vie insalubre), ignore 1 niveau épuisement, régénération HP +2 repos courts',
          effect: '+1d20 Résistance Afflictions',
          game_effect: 'Bonus d100 endurance extrême conditions hostiles'
        }
      ],
      reputation: [
        { factionId: 'tous_npcs', delta: -10, reason: 'Paria universel, superstition malédiction' },
        { factionId: 'autres_parias', delta: 12, reason: 'Solidarité fraternelle rares marginaux' },
        { factionId: 'cultistes_malediction', delta: 8, reason: 'Intérêt rituel malédiction ancienne (dangereux)' },
        { factionId: 'druides_sauvages', delta: 3, reason: 'Respect survie nature hostile' },
        { factionId: 'inquisition', delta: -8, reason: 'Suspicion hérésie/pacte démoniaque' }
      ],
      items: [
        { itemId: 'cursed_amulet_fragment', quantity: 1, reason: 'Fragment amulette familiale maudite (origine malédiction)' },
        { itemId: 'hermit_rags', quantity: 1, reason: 'Haillons ermite rapiécés (seuls vêtements possédés)' },
        { itemId: 'wild_animal_companion', quantity: 1, reason: 'Corbeau/loup solitaire compagnon (seul être tolérant présence)' }
      ],
      skills: [
        { skillId: 'intimidation', bonus: 5, reason: 'Seul moyen interaction : inspirer peur primal' },  // ×2.5
        { skillId: 'survival', bonus: 5, reason: 'Vie marginale forêts/ruines depuis enfance' },  // ×2.5
        { skillId: 'perception', bonus: 8, reason: 'Vigilance permanente hostilité environnante' },  // ×2.5
        { skillId: 'animal_handling', bonus: 3, reason: 'Seuls alliés possibles : créatures sauvages' }
      ],
      gold: 0,  // Commence sans ressources (rejet commercial total)
      languages: ['Commun', 'Langage Bestial (rudimentaire)', 'Dialecte Parias (signes silencieux)'],  // +2 langues
      tags: ['outcast', 'cursed', 'isolated', 'feared', 'pariah', 'survivor_extreme', 'untouchable']
    },
    social_impacts: {
      npc_reactions: {
        'tous_citoyens': 'Peur viscérale, rejet immédiat, évitement physique (-12 disposition)',
        'gardes': 'Ordre expulsion ville sous 24h (-10 disposition)',
        'nobles': 'Dégoût absolu, refus contact visuel (-15 disposition)',
        'prêtres': 'Refus sacrements, exorcisme tenté (variable -8 à -12)',
        'autres_parias': 'Solidarité rare mais profonde (+15 disposition)',
        'cultistes': 'Fascination morbide pouvoir malédiction (+8 disposition)',
        'druides': 'Respect étrange résilience surnaturelle (+5 disposition)',
        'animaux_sauvages': 'Tolérance inhabituelle, pas fuite instinctive (+7 disposition)'
      },
      first_impression: '« Recule ! Ne le touche JAMAIS, il porte malheur incarné ! Éloigne-toi ou sa malédiction te consumera aussi ! »',
      long_term_perception: 'Symbole vivant peur superstitieuse. Certains te voient victime tragique, plupart symbole malheur à fuir. Rares âmes courageuses découvrent humanité sous aura maudite.'
    },
    tags: ['outcast', 'cursed', 'isolated', 'feared'],
    incompatible_with: ['birth_status_nobility', 'birth_status_clerc', 'birth_status_merchant', 'birth_status_guard']
  }
];
