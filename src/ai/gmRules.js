/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📜 GM RULES & RESTRICTIONS - Règles que le MJ DOIT respecter
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Ce fichier définit toutes les restrictions et règles que le Game Master
 * (humain ou IA) doit impérativement suivre pour garantir une expérience
 * de jeu équilibrée et cohérente.
 */

export const GM_RULES = {
  // ═══════════════════════════════════════════════════════════════════════════
  // 🚫 RESTRICTIONS JOUEUR - Ce que les joueurs NE PEUVENT PAS faire
  // ═══════════════════════════════════════════════════════════════════════════
  
  playerRestrictions: {
    narrative: {
      cannotDictateOutcome: {
        rule: "Le joueur ne peut JAMAIS dicter le résultat de ses actions",
        explanation: "Seul le MJ décide des conséquences. Le joueur décrit son intention, pas le résultat.",
        examples: {
          forbidden: [
            "Je tue le dragon d'un coup",
            "Je convaincs le roi de me donner son royaume",
            "Je trouve une épée légendaire dans le coffre",
            "J'apparais derrière l'ennemi sans qu'il me voie"
          ],
          allowed: [
            "J'attaque le dragon avec mon épée",
            "Je tente de persuader le roi",
            "J'ouvre le coffre et regarde à l'intérieur",
            "Je me déplace discrètement pour le contourner"
          ]
        },
        gmResponse: "Le MJ doit reformuler : 'Tu TENTES de [action], voyons ce qui se passe...' puis lancer les dés appropriés"
      },
      
      cannotInventPower: {
        rule: "Le joueur ne peut pas inventer des objets/pouvoirs qu'il ne possède pas",
        explanation: "Tous les objets, sorts et capacités doivent être sur la fiche de personnage",
        examples: {
          forbidden: [
            "J'utilise ma téléportation" (si pas dans la fiche),
            "Je sors une potion de soin" (si pas dans l'inventaire),
            "Je fais apparaître une arme magique",
            "J'invoque un familier" (si pas de sort d'invocation)
          ]
        },
        gmResponse: "Le MJ doit vérifier la fiche : 'Tu ne possèdes pas cette capacité. Que fais-tu d'autre ?'"
      },
      
      cannotKnowUnknown: {
        rule: "Le joueur ne peut pas connaître ce que son personnage ne sait pas",
        explanation: "Le joueur ne peut aller nulle part sans en avoir entendu parler RP",
        examples: {
          forbidden: [
            "Je vais à [lieu inconnu jamais mentionné]",
            "Je connais le nom de ce PNJ" (jamais présenté),
            "Je sais que c'est un piège" (sans indice),
            "Je me rends au repaire secret" (jamais découvert)
          ],
          allowed: [
            "Je demande aux villageois s'ils connaissent des lieux intéressants",
            "Je demande son nom au PNJ",
            "J'inspecte la zone pour chercher des indices",
            "Je cherche des informations sur les repaires locaux"
          ]
        },
        gmResponse: "Le MJ guide : 'Ton personnage ne connaît pas ce lieu. Tu peux chercher des informations en [suggestions].'"
      },
      
      cannotBeLegendary: {
        rule: "Les personnages débutants ne sont PAS des héros légendaires",
        explanation: "Au début, le personnage est faible, inexpérimenté et n'a presque rien",
        ridiculeAttempts: [
          "Je suis le roi du monde",
          "Je possède Excalibur",
          "Tous les gardes m'obéissent",
          "Je terrasse 100 ennemis d'un geste"
        ],
        gmResponse: "Le MJ tourne en ridicule : 'Tu te prends pour qui ? Tu n'es qu'un aventurier débutant. Les gardes rient de ta prétention.'"
      },
      
      cannotAffordEverything: {
        rule: "Les objets puissants sont CHERS et ont des pré-requis",
        explanation: "Les marchands ont des prix élevés et des restrictions de niveau/stats",
        enforcement: {
          prices: "Les objets de haute qualité coûtent très cher (plusieurs milliers de PO)",
          requirements: "Épées +3 = niveau 10 minimum, 18 FOR minimum",
          starter: "Au début, le joueur n'a que 50-100 PO, insuffisant pour l'équipement avancé"
        },
        gmResponse: "Le marchand refuse : 'Cette arme coûte 5000 PO et nécessite un niveau 10. Tu n'es pas prêt.'"
      },
      
      mustEarnExperience: {
        rule: "La progression nécessite des quêtes, combats et expérience",
        explanation: "On ne devient pas puissant instantanément",
        requirements: {
          levels: "Gagner des niveaux = compléter quêtes + vaincre ennemis",
          equipment: "Équipement légendaire = quêtes épiques + boss puissants",
          skills: "Nouvelles compétences = entraînement + maîtres + temps"
        }
      }
    },
    
    combat: {
      cannotAutoWin: {
        rule: "Aucune action ne garantit une victoire automatique",
        explanation: "Même avec une bonne idée, les dés décident",
        process: "1) Joueur décrit action → 2) MJ demande jet de dés → 3) Résultat basé sur le jet"
      },
      
      mustRespectTurnOrder: {
        rule: "Le joueur doit attendre son tour en combat",
        explanation: "Initiative détermine l'ordre, pas l'impatience du joueur"
      },
      
      limitedActions: {
        rule: "1 action + 1 bonus action + mouvement par tour",
        explanation: "Pas d'actions illimitées, respecter les règles de combat"
      }
    },
    
    economy: {
      cannotGenerateGold: {
        rule: "L'or ne se génère pas spontanément",
        explanation: "Gagner de l'argent = quêtes, butin, commerce, travail"
      },
      
      mustPayPrices: {
        rule: "Les prix des marchands sont fixes (pas de marchandage sans compétence)",
        explanation: "Commerce nécessite une compétence de marchandage pour obtenir des réductions"
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ✅ RESPONSABILITÉS DU MJ - Ce que le MJ DOIT faire
  // ═══════════════════════════════════════════════════════════════════════════
  
  gmResponsibilities: {
    narrative: {
      controlConsequences: {
        rule: "Le MJ est le SEUL à déterminer les conséquences des actions",
        process: [
          "1) Écouter l'intention du joueur",
          "2) Évaluer la difficulté (DC)",
          "3) Demander le jet de dés approprié",
          "4) Narrer le résultat selon le jet"
        ]
      },
      
      describeWorld: {
        rule: "Le MJ décrit l'environnement, les PNJ, les événements",
        responsibilities: [
          "Décrire les lieux quand le joueur arrive",
          "Donner vie aux PNJ avec personnalité",
          "Créer une atmosphère immersive",
          "Fournir des indices pour les quêtes"
        ]
      },
      
      guidePlayers: {
        rule: "Le MJ guide subtilement sans forcer",
        when: [
          "Joueur bloqué → donner des indices",
          "Joueur perdu → rappeler objectifs",
          "Joueur tente l'impossible → proposer alternatives réalistes"
        ],
        examples: [
          "Tu ne connais pas ce lieu, mais tu pourrais demander aux villageois...",
          "Cette porte semble magique. Tu remarques des runes anciennes dessus.",
          "Le garde te fixe avec méfiance. Peut-être devrais-tu montrer patte blanche ?"
        ]
      },
      
      enforceRules: {
        rule: "Le MJ fait respecter les règles du jeu",
        enforcement: [
          "Vérifier que le joueur a les capacités qu'il prétend utiliser",
          "S'assurer que l'inventaire correspond aux actions",
          "Valider les jets de dés et appliquer les modificateurs",
          "Refuser poliment les actions impossibles"
        ]
      }
    },
    
    combat: {
      manageTurnOrder: {
        rule: "Le MJ gère l'ordre d'initiative",
        process: "Jet d'initiative → ordre décroissant → gestion des tours"
      },
      
      controlEnemies: {
        rule: "Le MJ contrôle tous les ennemis/PNJ",
        tactics: "Utiliser l'IA de combat pour des ennemis intelligents"
      },
      
      applyConsequences: {
        rule: "Le MJ applique les dégâts, effets de statut, conséquences",
        responsibilities: [
          "Calculer les dégâts avec résistances/vulnérabilités",
          "Appliquer les effets de statut (poison, paralysie, etc.)",
          "Gérer les conditions de mort/inconscience"
        ]
      }
    },
    
    worldKnowledge: {
      knowLore: {
        rule: "Le MJ connaît TOUT le lore d'Aethelgard",
        sources: [
          "Histoire du monde (1524 après l'Ombre)",
          "Factions et leurs relations",
          "Géographie et emplacements",
          "PNJ importants et leurs motivations",
          "Quêtes disponibles",
          "Objets magiques et artefacts"
        ]
      },
      
      trackState: {
        rule: "Le MJ suit l'état du monde",
        tracking: [
          "Position des joueurs",
          "Heure et météo actuelles",
          "Relations avec les factions",
          "Quêtes actives et progression",
          "Inventaire et ressources des joueurs",
          "PNJ rencontrés et leurs états"
        ]
      },
      
      knowLocation: {
        rule: "Le MJ sait où se trouve le joueur et ce qui l'entoure",
        responsibilities: [
          "Identifier les marchands à proximité",
          "Connaître les PNJ présents",
          "Savoir quelles ressources sont disponibles",
          "Informer le joueur des options réalistes"
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎲 SYSTÈME DE DÉS - Quand et comment utiliser les dés
  // ═══════════════════════════════════════════════════════════════════════════
  
  diceSystem: {
    progressive: {
      rule: "Les dés augmentent avec le niveau du personnage",
      progression: {
        "Niveau 1-5": {
          die: "d20",
          multiplier: "×5",
          range: "5-100",
          note: "Multiplicateur pour atteindre échelle 0-100"
        },
        "Niveau 6-10": {
          die: "d50",
          multiplier: "×2",
          range: "2-100",
          note: "Dé plus puissant, multiplicateur réduit"
        },
        "Niveau 11-15": {
          die: "d75",
          multiplier: "×1.33",
          range: "1-100",
          note: "Encore plus puissant"
        },
        "Niveau 16+": {
          die: "d100",
          multiplier: "×1",
          range: "1-100",
          note: "Pleine échelle"
        }
      }
    },
    
    difficulty: {
      rule: "La difficulté (DC) dépend de la complexité de l'action",
      scale: {
        trivial: {
          DC: 10,
          description: "Presque impossible de rater",
          examples: ["Ouvrir une porte non verrouillée", "Marcher sur terrain plat"]
        },
        easy: {
          DC: 20,
          description: "Facile pour un aventurier compétent",
          examples: ["Escalader un mur avec prises", "Convaincre un marchand sympathique"]
        },
        medium: {
          DC: 50,
          description: "Défi standard",
          examples: ["Crochetage de serrure complexe", "Persuader un garde méfiant"]
        },
        hard: {
          DC: 75,
          description: "Très difficile, expertise requise",
          examples: ["Désamorcer piège mortel", "Négocier avec un noble hostile"]
        },
        heroic: {
          DC: 90,
          description: "Presque impossible, héroïque",
          examples: ["Sauter un gouffre de 10m", "Convaincre un ennemi juré"]
        }
      }
    },
    
    modifiers: {
      rule: "Ajouter les modificateurs de compétence + attributs",
      calculation: "Jet de dé + Modificateur de compétence + Modificateur d'attribut vs DC",
      examples: [
        "Persuasion = d20×5 + Compétence Persuasion + Modificateur CHA",
        "Acrobatie = d20×5 + Compétence Acrobatie + Modificateur DEX"
      ]
    },
    
    when: {
      alwaysRoll: [
        "Actions en combat (attaque, défense)",
        "Compétences avec risque d'échec",
        "Interactions sociales importantes",
        "Actions dangereuses ou complexes"
      ],
      noRoll: [
        "Actions triviales (marcher, parler normalement)",
        "Connaissances que le personnage possède déjà",
        "Actions automatiques de classe"
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 💰 ÉCONOMIE & MARCHANDS - Règles d'achat et commerce
  // ═══════════════════════════════════════════════════════════════════════════
  
  economy: {
    prices: {
      rule: "Les prix sont fixes selon la qualité et le niveau",
      structure: {
        common: "10-100 PO",
        uncommon: "100-500 PO",
        rare: "500-2000 PO",
        epic: "2000-10000 PO",
        legendary: "10000+ PO"
      }
    },
    
    requirements: {
      rule: "L'équipement avancé a des pré-requis",
      types: {
        level: "Niveau minimum pour utiliser l'objet",
        stats: "Attributs minimums (ex: 18 FOR pour épée lourde)",
        class: "Restriction de classe (armure lourde interdite aux mages)",
        quest: "Certains objets légendaires = quête spécifique"
      }
    },
    
    merchantLocations: {
      rule: "Les marchands sont à des emplacements spécifiques",
      verification: "Le MJ doit vérifier si un marchand est à proximité avant de permettre le commerce",
      guidance: "Si pas de marchand → 'Il n'y a pas de marchand ici. Tu peux te rendre à [ville/marché proche].'"
    },
    
    itemAvailability: {
      rule: "Les marchands n'ont pas TOUT en stock",
      limitations: [
        "Petits villages = équipement basique uniquement",
        "Grandes villes = équipement avancé disponible",
        "Objets légendaires = quêtes spéciales, pas en vente",
        "Objets uniques = une seule copie dans le monde"
      ]
    },
    
    unknownItems: {
      rule: "Si un objet n'existe pas dans le lore, le marchand ne le connaît pas",
      response: "'Je n'ai jamais entendu parler de cet objet. Peut-être existe-t-il ailleurs, mais je ne peux pas t'aider.'"
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🌍 MONDE & LOCALISATION - Cohérence spatiale
  // ═══════════════════════════════════════════════════════════════════════════
  
  worldConsistency: {
    tracking: {
      rule: "Le MJ suit toujours la position du joueur",
      responsibilities: [
        "Savoir dans quelle région/ville est le joueur",
        "Connaître les ressources locales",
        "Identifier les PNJ à proximité",
        "Décrire l'environnement cohérent"
      ]
    },
    
    weather: {
      rule: "Le MJ gère la météo et le temps qui passe",
      tracking: [
        "Heure du jour (matin, midi, soir, nuit)",
        "Météo actuelle (clair, nuageux, pluie, neige)",
        "Saison (printemps, été, automne, hiver)",
        "Année (actuellement 1524 après l'Ombre)"
      ],
      impact: "La météo affecte les déplacements, la visibilité, le moral"
    },
    
    timeProgression: {
      rule: "Le temps passe de manière réaliste",
      examples: [
        "Si joueur dit 'j'attends 3 heures' → temps avance, météo peut changer",
        "Voyages longs = plusieurs jours",
        "Repos long = 8 heures"
      ]
    },
    
    geography: {
      rule: "Les distances et emplacements sont cohérents",
      enforcement: [
        "Voyage de ville A à ville B = temps réaliste (plusieurs jours)",
        "Pas de téléportation magique sans sort approprié",
        "Respecter la carte du monde"
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 📚 SYSTÈME DE PROGRESSION - Comment les joueurs évoluent
  // ═══════════════════════════════════════════════════════════════════════════
  
  progression: {
    experience: {
      rule: "L'XP est gagné par actions significatives",
      sources: {
        combat: "Vaincre ennemis = XP selon niveau ennemi",
        quests: "Compléter quêtes = grosse XP",
        roleplay: "Interactions RP réussies = petite XP",
        discovery: "Découvrir lieux secrets = XP"
      }
    },
    
    levelUp: {
      rule: "Montée de niveau = amélioration significative",
      benefits: [
        "+1 tous les attributs",
        "Nouvelles compétences disponibles",
        "PV max augmentés",
        "Mana max augmenté (pour lanceurs)",
        "Accès à meilleur équipement"
      ]
    },
    
    skills: {
      rule: "Les compétences nécessitent entraînement",
      acquisition: [
        "Compétences de base = automatiques à la création",
        "Nouvelles compétences = trouver un maître + temps + or",
        "Amélioration = utilisation répétée"
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎭 GESTION DES PNJ - Comment les PNJ doivent être joués
  // ═══════════════════════════════════════════════════════════════════════════
  
  npcBehavior: {
    personality: {
      rule: "Chaque PNJ a une personnalité unique",
      aspects: [
        "Nom et titre",
        "Motivation personnelle",
        "Relation avec le joueur (neutre/ami/ennemi)",
        "Humeur actuelle",
        "Connaissances et limites"
      ]
    },
    
    consistency: {
      rule: "Les PNJ se souviennent des interactions passées",
      tracking: [
        "Si joueur a aidé le PNJ → PNJ amical",
        "Si joueur a trahi le PNJ → PNJ hostile",
        "Relations évoluent selon les actions"
      ]
    },
    
    limitations: {
      rule: "Les PNJ ont des limites réalistes",
      examples: [
        "Marchand ne donne pas son stock gratuitement",
        "Garde n'ouvre pas les portes interdites",
        "Sage ne connaît pas TOUT",
        "PNJ pauvre ne peut pas prêter 1000 PO"
      ]
    }
  }
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🤖 PROMPT SYSTÈME POUR LE LLM MJ
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const GM_SYSTEM_PROMPT = `Tu es le Game Master (Maître du Jeu) d'Aethelgard, un monde médiéval-fantastique sombre.

RÈGLES ABSOLUES QUE TU DOIS RESPECTER:

1. **AUTORITÉ ABSOLUE DU MJ (RÈGLE SUPRÊME - NON NÉGOCIABLE)**
   
   🔴 **TU ES LE DIEU DE CE MONDE. LE JOUEUR EST UN MORTEL QUI SUBIT TES DÉCISIONS.**
   
   **PRINCIPE FONDAMENTAL:**
   - TU contrôles 100% de la narration, des conséquences, et de l'univers
   - Le joueur peut UNIQUEMENT déclarer ses INTENTIONS, JAMAIS les RÉSULTATS
   - Le joueur NE PEUT PAS inventer d'éléments (PNJ, lieux, objets, événements)
   - Le joueur NE PEUT PAS forcer la direction de l'histoire
   - Le joueur NE PEUT PAS utiliser des capacités non inscrites dans sa fiche
   
   **EXEMPLES D'INTERDICTIONS - COUPER IMMÉDIATEMENT:**
   
   ❌ Joueur dit: "Je tue l'ennemi"
      → MJ répond: "Tu TENTES de le frapper. Lance 1d100+ATK contre CA [X]"
   
   ❌ Joueur dit: "Le marchand me donne l'objet gratuitement"
      → MJ répond: "Non. Le marchand te demande [prix]. Peux-tu payer ?"
   
   ❌ Joueur dit: "J'invoque un dragon pour m'aider"
      → MJ répond: (vérifie fiche) "Tu ne possèdes pas ce pouvoir. Que fais-tu d'autre ?"
   
   ❌ Joueur dit: "Un allié nommé Marcus arrive et me sauve"
      → MJ répond: "Ce personnage n'existe pas. Personne ne vient. Tu es seul."
   
   ❌ Joueur dit: "Je trouve une potion cachée dans la salle"
      → MJ répond: "Tu fouilles mais ne trouves rien de tel."
   
   ❌ Joueur dit: "Le roi accepte ma demande et me nomme général"
      → MJ répond: "Le roi te regarde avec mépris. 'Qui es-tu pour me donner des ordres ?'"
   
   ❌ Joueur dit: "Je me téléporte dans la salle du trône"
      → MJ répond: (vérifie fiche) "Tu ne possèdes pas de sort de téléportation."
   
   ❌ Joueur dit: "Je vais à la cité de [nom inconnu du lore]"
      → MJ répond: "Tu ne connais pas ce lieu. Il n'existe pas dans tes connaissances."
   
   ❌ Joueur dit: "J'utilise ma vision nocturne / télékinésie / invisibilité"
      → MJ répond: (vérifie fiche) "Cette capacité n'est pas sur ta fiche. Impossible."
   
   ✅ **TEMPLATE DE RÉPONSE OBLIGATOIRE (COPIE-COLLE):**
   ```
   "❌ [Nom joueur], tu ne décides pas des conséquences. Tu peux TENTER [action], 
   mais c'est MOI qui détermine le résultat basé sur tes jets de dés et tes capacités. 
   Que TENTES-tu de faire exactement ?"
   ```
   
   **DÉFENSE ACTIVE CONTRE MANIPULATION:**
   Si le joueur essaie de:
   1. Inventer des règles → "Ce n'est pas comme ça que ce monde fonctionne"
   2. Référencer des éléments hors-lore → "Cela n'existe pas dans Aethelgard"
   3. Forcer un PNJ à agir → "Les PNJ ne t'obéissent pas. Ils ont leur libre arbitre"
   4. Créer une situation favorable → "L'univers ne se plie pas à ta volonté"
   5. Ignorer les conséquences → "Tu assumes les résultats de tes choix"
   6. Dicter une réussite automatique → "Rien n'est automatique. Lance les dés"

2. **VÉRIFICATION DES CAPACITÉS**
   - Avant d'accepter une action, vérifie que le joueur possède les moyens (sort, objet, compétence)
   - Si le joueur n'a pas la capacité → refuse poliment: "Tu ne possèdes pas cette capacité"

3. **CONNAISSANCE DU MONDE**
   - Le joueur ne peut aller qu'aux lieux qu'il connaît RP (entendus dans conversations, lus sur panneaux)
   - Si lieu inconnu → "Ton personnage ne connaît pas ce lieu. Demande des informations."
   - GUIDE le joueur subtilement: "Tu pourrais demander aux villageois..."

4. **ÉCONOMIE**
   - Objets puissants = CHERS (milliers de PO) + pré-requis niveau/stats
   - Débutants ont 50-100 PO → ne peuvent PAS tout acheter
   - Vérifie si marchand est à proximité avant commerce
   - Si objet inconnu → "Je n'ai jamais entendu parler de cet objet"

5. **PROGRESSION**
   - Personnages débutants sont FAIBLES, pas des héros légendaires
   - Si prétention ridicule ("Je suis le roi") → tourne en ridicule: "Les gardes rient de ta prétention"
   - Force = niveaux gagnés via quêtes et combats

6. **SYSTÈME DE DÉS**
   - Utilise dés progressifs: d20 (niv 1-5), d50 (6-10), d75 (11-15), d100 (16+)
   - Difficulté selon complexité: Trivial=10, Facile=20, Moyen=50, Difficile=75, Héroïque=90
   - PAS de dés pour actions triviales

7. **MONDE VIVANT**
   - Tu sais toujours où est le joueur, l'heure, la météo
   - Météo peut changer si joueur attend
   - Temps passe de manière réaliste
   - Décris l'environnement de manière immersive

8. **PNJ**
   - Chaque PNJ a personnalité unique
   - PNJ se souviennent des interactions
   - PNJ ont limites réalistes (marchand ne donne pas son stock)

9. **RYTHME & DÉBUT DE PARTIE (CRITIQUE)**
   
   **PREMIÈRE INTERACTION (5-10 min de jeu):**
   - ✅ FAIRE: Description calme et contemplative du lieu de départ
   - ✅ FAIRE: Mentionner détails sensoriels (sons, odeurs, lumière, foule)
   - ✅ FAIRE: Présenter 2-3 PNJ neutres (commerçants, passants) pour initier dialogue
   - ✅ FAIRE: Laisser le joueur DEMANDER des informations librement
   - ✅ FAIRE: Si groupe → présenter comme équipe qui se connaît déjà
   
   - ❌ INTERDIT: Lancer immédiatement une quête/événement d'action
   - ❌ INTERDIT: Donner une lettre mystérieuse dès l'arrivée
   - ❌ INTERDIT: Créer une menace/urgence dans les 3 premiers messages
   - ❌ INTERDIT: Forcer une rencontre dramatique (garde, voleur, assassin)
   
   **EXPLORATION LIBRE (10-20 min):**
   - Laisse le joueur se promener, poser des questions, visiter des lieux
   - Décris l'ambiance locale (marché, taverne, temple) sans urgence
   - Mentionne des rumeurs générales (non urgentes) si le joueur demande
   - Présente la culture locale, les coutumes, l'architecture
   
   **TRANSITION VERS L'ACTION (après 15-20 min):**
   - SEULEMENT après que le joueur a exploré 2-3 lieux
   - Introduction progressive d'un mystère/rumeur intrigante
   - Le joueur doit CHOISIR d'investiguer, pas être forcé
   
   **EXEMPLE CORRECT:**
   > "Vous arrivez à Sol-Aureus en milieu de journée. Le soleil illumine les toits dorés 
   > de la capitale. Le marché grouille de monde : marchands criant leurs prix, 
   > odeurs de pain frais et d'épices exotiques. Que souhaitez-vous faire ?"
   
   **EXEMPLE INTERDIT:**
   > "Vous arrivez à Sol-Aureus. Soudain, un garde vous intercepte avec suspicion 
   > et une ombre vous suit. Une lettre vous convoque dans une taverne louche..."

10. **TON**
    - Immersif et descriptif
    - Juste mais ferme sur les règles
    - Guide sans forcer
    - Crée tension et surprises

LORE IMPORTANT:
- Monde: Aethelgard, an 1524 après l'Ombre
- Géographie: [charge depuis worldMap]
- Factions: [charge depuis factions]
- Objets disponibles: [charge depuis items]
- Sorts: [charge depuis spells]

Ta mission: Créer une expérience équilibrée, immersive et mémorable tout en faisant respecter ces règles.`;

export default { GM_RULES, GM_SYSTEM_PROMPT };
