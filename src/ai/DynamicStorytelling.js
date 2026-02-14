/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    📖 DYNAMIC STORYTELLING v4.0                          ║
 * ║                  Procedural Narrative Engine                             ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * MISSION: Générer des histoires procédurales complexes avec des arcs narratifs,
 *          des twists, des personnages récurrents et une cohérence narrative.
 *          Chaque partie est unique et s'adapte aux choix des joueurs.
 * 
 * CAPACITÉS:
 * - Génération d'arcs narratifs (3-5 actes)
 * - Personnages récurrents avec évolution
 * - Twists et rebondissements
 * - Cohérence narrative et continuité
 * - Branches narratives multiples
 * - Climax et résolutions
 */

export class DynamicStorytelling {
  constructor(config = {}) {
    this.config = {
      enabled: config.enabled ?? true,
      maxActiveStories: config.maxActiveStories ?? 5,
      maxRecurringCharacters: config.maxRecurringCharacters ?? 20,
      twistProbability: config.twistProbability ?? 0.15,
      enableCoherence: config.enableCoherence ?? true,
      minActsPerStory: config.minActsPerStory ?? 3,
      maxActsPerStory: config.maxActsPerStory ?? 5,
      ...config
    };

    // Histoires actives
    this.activeStories = new Map(); // storyId → Story
    this.completedStories = [];
    
    // Personnages récurrents
    this.recurringCharacters = new Map(); // characterId → Character
    
    // Arcs narratifs
    this.narrativeThreads = new Map(); // threadId → Thread
    
    // Mémoire narrative
    this.narrativeMemory = {
      events: [], // Événements importants
      decisions: [], // Choix du joueur
      consequences: [] // Conséquences des choix
    };

    // Statistiques
    this.stats = {
      storiesGenerated: 0,
      storiesCompleted: 0,
      twistsGenerated: 0,
      charactersCreated: 0,
      avgStoryDuration: 0
    };

    console.log('[Dynamic Storytelling] 📖 Initialized - Narrative engine ready');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 1: STORY GENERATION
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Génère une nouvelle histoire
   * @param {Object} context - Contexte (niveau joueur, localisation, etc.)
   * @returns {Object} Histoire générée
   */
  generateStory(context = {}) {
    if (this.activeStories.size >= this.config.maxActiveStories) {
      console.warn('[Dynamic Storytelling] Max active stories reached');
      return null;
    }

    const storyId = `story_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // Sélection du thème
    const theme = this._selectTheme(context);
    
    // Génération de l'arc narratif
    const acts = this._generateActs(theme, context);
    
    // Sélection/création de personnages
    const characters = this._selectCharacters(theme, context);

    const story = {
      id: storyId,
      title: this._generateTitle(theme),
      theme,
      acts,
      characters,
      currentAct: 0,
      status: 'active',
      startedAt: Date.now(),
      context: { ...context },
      playerChoices: [],
      twists: [],
      metadata: {
        difficulty: context.difficulty || 'medium',
        estimatedDuration: acts.length * 30 // minutes
      }
    };

    this.activeStories.set(storyId, story);
    this.stats.storiesGenerated++;

    console.log(`[Dynamic Storytelling] 📚 Generated story: "${story.title}" (${acts.length} acts)`);

    return story;
  }

  /**
   * Sélectionne un thème narratif
   */
  _selectTheme(context) {
    const themes = [
      {
        name: 'revenge',
        weight: 1.0,
        tags: ['dark', 'personal', 'emotional'],
        archetypes: ['wronged_hero', 'villain', 'mentor']
      },
      {
        name: 'redemption',
        weight: 0.8,
        tags: ['heroic', 'moral', 'transformative'],
        archetypes: ['fallen_hero', 'innocent', 'guide']
      },
      {
        name: 'discovery',
        weight: 1.2,
        tags: ['mystery', 'exploration', 'knowledge'],
        archetypes: ['seeker', 'guardian', 'sage']
      },
      {
        name: 'survival',
        weight: 0.9,
        tags: ['tense', 'desperate', 'primal'],
        archetypes: ['survivor', 'hunter', 'protector']
      },
      {
        name: 'conquest',
        weight: 0.7,
        tags: ['war', 'power', 'ambition'],
        archetypes: ['warlord', 'general', 'king']
      },
      {
        name: 'forbidden_love',
        weight: 0.5,
        tags: ['romantic', 'tragic', 'social'],
        archetypes: ['lover', 'rival', 'family']
      },
      {
        name: 'prophecy',
        weight: 0.6,
        tags: ['epic', 'destiny', 'mystical'],
        archetypes: ['chosen_one', 'prophet', 'herald']
      },
      {
        name: 'betrayal',
        weight: 0.9,
        tags: ['dark', 'political', 'shocking'],
        archetypes: ['traitor', 'loyal_friend', 'victim']
      }
    ];

    // Ajustement des poids selon le contexte
    themes.forEach(theme => {
      if (context.playerLevel > 10 && theme.tags.includes('epic')) {
        theme.weight *= 1.5;
      }
      if (context.recentTheme === theme.name) {
        theme.weight *= 0.3; // Éviter la répétition
      }
    });

    // Sélection pondérée
    const totalWeight = themes.reduce((sum, t) => sum + t.weight, 0);
    let random = Math.random() * totalWeight;

    for (const theme of themes) {
      random -= theme.weight;
      if (random <= 0) {
        return theme;
      }
    }

    return themes[0];
  }

  /**
   * Génère les actes de l'histoire
   */
  _generateActs(theme, context) {
    const actCount = Math.floor(
      Math.random() * (this.config.maxActsPerStory - this.config.minActsPerStory + 1)
    ) + this.config.minActsPerStory;

    const acts = [];
    const actTemplates = this._getActTemplates(theme.name);

    for (let i = 0; i < actCount; i++) {
      const actType = i === 0 ? 'introduction' :
                     i === actCount - 1 ? 'climax' :
                     i === actCount - 2 ? 'rising_action' : 'development';

      const template = actTemplates[actType] || actTemplates.development;

      acts.push({
        actNumber: i + 1,
        type: actType,
        title: template.title,
        description: template.description,
        objectives: this._generateObjectives(template, context),
        events: [],
        twistChance: i > 0 ? this.config.twistProbability * (i / actCount) : 0,
        completed: false,
        startedAt: null
      });
    }

    return acts;
  }

  /**
   * Obtient les templates d'actes pour un thème
   */
  _getActTemplates(themeName) {
    const templates = {
      revenge: {
        introduction: {
          title: 'La Tragédie',
          description: 'Découverte de la trahison ou de la perte',
          objectives: ['discover_truth', 'gather_information', 'find_first_clue']
        },
        development: {
          title: 'La Traque',
          description: 'Poursuite des responsables',
          objectives: ['track_enemy', 'gain_strength', 'uncover_conspiracy']
        },
        rising_action: {
          title: 'Le Confrontation',
          description: 'Face à face avec l\'ennemi',
          objectives: ['prepare_battle', 'rally_allies', 'final_preparation']
        },
        climax: {
          title: 'La Vengeance',
          description: 'Moment de vérité et choix final',
          objectives: ['defeat_enemy', 'make_choice', 'face_consequences']
        }
      },
      discovery: {
        introduction: {
          title: 'Le Mystère',
          description: 'Une énigme intrigante apparaît',
          objectives: ['encounter_mystery', 'find_clue', 'meet_informant']
        },
        development: {
          title: 'L\'Investigation',
          description: 'Recherche de la vérité',
          objectives: ['explore_location', 'solve_puzzle', 'gather_evidence']
        },
        rising_action: {
          title: 'La Révélation',
          description: 'La vérité commence à émerger',
          objectives: ['uncover_secret', 'face_guardian', 'obtain_key']
        },
        climax: {
          title: 'La Découverte',
          description: 'Le secret est révélé',
          objectives: ['reach_goal', 'understand_truth', 'decide_fate']
        }
      },
      betrayal: {
        introduction: {
          title: 'La Confiance',
          description: 'Établissement de relations',
          objectives: ['meet_ally', 'build_trust', 'work_together']
        },
        development: {
          title: 'Les Doutes',
          description: 'Indices inquiétants',
          objectives: ['notice_signs', 'investigate_suspicions', 'question_loyalty']
        },
        rising_action: {
          title: 'La Trahison',
          description: 'La vérité éclate',
          objectives: ['witness_betrayal', 'survive_ambush', 'escape_trap']
        },
        climax: {
          title: 'Le Jugement',
          description: 'Confrontation finale',
          objectives: ['confront_traitor', 'make_judgment', 'restore_balance']
        }
      }
    };

    return templates[themeName] || templates.discovery;
  }

  /**
   * Génère les objectifs d'un acte
   */
  _generateObjectives(template, context) {
    return template.objectives.map((objType, index) => ({
      id: `obj_${Date.now()}_${index}`,
      type: objType,
      description: this._getObjectiveDescription(objType),
      status: 'pending',
      optional: index > 2 // Les objectifs après le 3ème sont optionnels
    }));
  }

  /**
   * Obtient la description d'un objectif
   */
  _getObjectiveDescription(type) {
    const descriptions = {
      discover_truth: 'Découvrir la vérité sur les événements',
      gather_information: 'Rassembler des informations',
      find_first_clue: 'Trouver le premier indice',
      track_enemy: 'Traquer l\'ennemi',
      gain_strength: 'Devenir plus fort',
      uncover_conspiracy: 'Dévoiler le complot',
      prepare_battle: 'Se préparer pour la bataille',
      rally_allies: 'Rallier des alliés',
      defeat_enemy: 'Vaincre l\'ennemi',
      make_choice: 'Faire un choix crucial',
      encounter_mystery: 'Rencontrer le mystère',
      find_clue: 'Trouver un indice',
      explore_location: 'Explorer un lieu',
      solve_puzzle: 'Résoudre une énigme',
      uncover_secret: 'Découvrir un secret',
      meet_ally: 'Rencontrer un allié',
      build_trust: 'Construire la confiance',
      notice_signs: 'Remarquer les signes',
      witness_betrayal: 'Assister à la trahison',
      confront_traitor: 'Affronter le traître'
    };

    return descriptions[type] || 'Accomplir l\'objectif';
  }

  /**
   * Génère un titre pour l'histoire
   */
  _generateTitle(theme) {
    const titlePrefixes = {
      revenge: ['La Vengeance de', 'Le Retour de', 'La Colère de'],
      redemption: ['La Rédemption de', 'Le Salut de', 'L\'Espoir de'],
      discovery: ['Le Mystère de', 'Les Secrets de', 'La Découverte de'],
      survival: ['La Survie à', 'L\'Épreuve de', 'Le Défi de'],
      conquest: ['La Conquête de', 'La Campagne de', 'La Guerre de'],
      forbidden_love: ['L\'Amour Interdit à', 'La Romance de', 'Le Destin de'],
      prophecy: ['La Prophétie de', 'Le Destin de', 'L\'Élue de'],
      betrayal: ['La Trahison de', 'Le Complot de', 'La Chute de']
    };

    const locations = [
      'Havrenoir', 'Bois des Ombres', 'Citadelle des Cendres',
      'Cryptes Oubliées', 'Tour du Savoir Perdu', 'Vallée des Échos',
      'Sanctuaire Écarlate', 'Forteresse Brisée'
    ];

    const prefixes = titlePrefixes[theme.name] || titlePrefixes.discovery;
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    return `${prefix} ${location}`;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2: CHARACTER MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Sélectionne ou crée des personnages pour l'histoire
   */
  _selectCharacters(theme, context) {
    const characters = [];
    const archetypes = theme.archetypes;

    // Personnages récurrents (30% de chance)
    const recurringPool = Array.from(this.recurringCharacters.values())
      .filter(c => c.availableFor.includes(theme.name));

    archetypes.forEach(archetype => {
      const useRecurring = recurringPool.length > 0 && Math.random() < 0.3;

      if (useRecurring) {
        const character = recurringPool[Math.floor(Math.random() * recurringPool.length)];
        character.appearances++;
        character.lastAppearance = Date.now();
        characters.push({
          id: character.id,
          name: character.name,
          archetype,
          isRecurring: true,
          relationship: character.relationshipWithPlayer || 'neutral'
        });
      } else {
        // Nouveau personnage
        const newCharacter = this._createCharacter(archetype, theme);
        characters.push(newCharacter);

        // Chance de devenir récurrent (20%)
        if (Math.random() < 0.2 && this.recurringCharacters.size < this.config.maxRecurringCharacters) {
          this.recurringCharacters.set(newCharacter.id, {
            ...newCharacter,
            appearances: 1,
            firstAppearance: Date.now(),
            lastAppearance: Date.now(),
            availableFor: [theme.name],
            relationshipWithPlayer: 'neutral',
            storyline: []
          });
          this.stats.charactersCreated++;
        }
      }
    });

    return characters;
  }

  /**
   * Crée un nouveau personnage
   */
  _createCharacter(archetype, theme) {
    const names = {
      male: ['Aldric', 'Theron', 'Kaelen', 'Valorin', 'Mordren', 'Severin'],
      female: ['Elara', 'Lyanna', 'Seraphine', 'Morgana', 'Isolde', 'Vespera'],
      neutral: ['Raven', 'Shadow', 'Sage', 'Oracle', 'Herald', 'Wanderer']
    };

    const gender = ['male', 'female', 'neutral'][Math.floor(Math.random() * 3)];
    const name = names[gender][Math.floor(Math.random() * names[gender].length)];

    const titles = {
      wronged_hero: ['le Vengeur', 'l\'Exilé', 'le Parjuré'],
      villain: ['le Sombre', 'le Cruel', 'le Despote'],
      mentor: ['le Sage', 'le Guide', 'l\'Ancien'],
      seeker: ['l\'Explorateur', 'le Chercheur', 'le Curieux'],
      traitor: ['le Perfide', 'le Masqué', 'le Fourbe']
    };

    const title = titles[archetype] ?
      titles[archetype][Math.floor(Math.random() * titles[archetype].length)] :
      'le Mystérieux';

    return {
      id: `char_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: `${name} ${title}`,
      archetype,
      isRecurring: false,
      relationship: 'neutral',
      traits: this._generateCharacterTraits(archetype),
      motivation: this._generateMotivation(archetype, theme)
    };
  }

  /**
   * Génère les traits d'un personnage
   */
  _generateCharacterTraits(archetype) {
    const traitPool = {
      wronged_hero: ['determined', 'haunted', 'skilled'],
      villain: ['ruthless', 'cunning', 'powerful'],
      mentor: ['wise', 'patient', 'mysterious'],
      seeker: ['curious', 'brave', 'intelligent'],
      traitor: ['deceptive', 'ambitious', 'charismatic']
    };

    const pool = traitPool[archetype] || ['neutral', 'mysterious', 'capable'];
    return pool.slice(0, 2);
  }

  /**
   * Génère la motivation d'un personnage
   */
  _generateMotivation(archetype, theme) {
    const motivations = {
      wronged_hero: 'Cherche à venger un tort passé',
      villain: 'Poursuit le pouvoir absolu',
      mentor: 'Guide ceux qui sont dignes',
      seeker: 'Recherche une vérité cachée',
      traitor: 'Trahit pour un but secret'
    };

    return motivations[archetype] || 'A ses propres raisons';
  }

  /**
   * Fait évoluer un personnage récurrent
   */
  evolveCharacter(characterId, event) {
    const character = this.recurringCharacters.get(characterId);
    if (!character) return;

    character.storyline.push({
      event,
      timestamp: Date.now()
    });

    // Évolution de la relation
    if (event.type === 'helped_player') {
      character.relationshipWithPlayer = 'friendly';
    } else if (event.type === 'betrayed_player') {
      character.relationshipWithPlayer = 'hostile';
    }

    // Évolution des traits
    if (character.storyline.length > 5) {
      // Après plusieurs apparitions, le personnage peut changer
      character.traits.push('experienced');
    }

    console.log(`[Dynamic Storytelling] 🎭 ${character.name} evolved`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3: STORY PROGRESSION
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Progresse une histoire
   * @param {string} storyId - ID de l'histoire
   * @param {Object} playerAction - Action du joueur
   * @returns {Object} Événement narratif généré
   */
  progressStory(storyId, playerAction) {
    const story = this.activeStories.get(storyId);
    if (!story || story.status !== 'active') {
      return null;
    }

    const currentAct = story.acts[story.currentAct];
    if (!currentAct.startedAt) {
      currentAct.startedAt = Date.now();
    }

    // Enregistre le choix du joueur
    story.playerChoices.push({
      action: playerAction,
      actNumber: story.currentAct + 1,
      timestamp: Date.now()
    });

    // Génère l'événement narratif
    const event = this._generateNarrativeEvent(story, currentAct, playerAction);
    currentAct.events.push(event);

    // Vérifie si un twist doit se produire
    if (Math.random() < currentAct.twistChance) {
      const twist = this._generateTwist(story, currentAct);
      if (twist) {
        event.twist = twist;
        story.twists.push(twist);
        this.stats.twistsGenerated++;
      }
    }

    // Vérifie la progression des objectifs
    this._updateObjectives(currentAct, playerAction);

    // Vérifie si l'acte est terminé
    if (this._isActCompleted(currentAct)) {
      this._completeAct(story, currentAct);
    }

    // Enregistre dans la mémoire narrative
    this._recordInMemory(event);

    return event;
  }

  /**
   * Génère un événement narratif
   */
  _generateNarrativeEvent(story, act, playerAction) {
    const eventTypes = {
      discovery: [
        'Vous découvrez un indice crucial',
        'Un secret ancien est révélé',
        'La vérité commence à émerger'
      ],
      confrontation: [
        'Une confrontation devient inévitable',
        'Les tensions montent',
        'Un conflit éclate'
      ],
      revelation: [
        'Une révélation change tout',
        'La situation n\'est pas ce qu\'elle semblait',
        'Un nouveau mystère apparaît'
      ],
      consequence: [
        'Vos actions ont des conséquences',
        'Le destin se réaligne',
        'Le monde réagit à vos choix'
      ]
    };

    const typePool = eventTypes[playerAction.type] || eventTypes.discovery;
    const description = typePool[Math.floor(Math.random() * typePool.length)];

    return {
      id: `event_${Date.now()}`,
      type: playerAction.type || 'general',
      description,
      characters: this._getInvolvedCharacters(story, playerAction),
      impact: this._calculateImpact(playerAction),
      timestamp: Date.now()
    };
  }

  /**
   * Génère un twist narratif
   */
  _generateTwist(story, act) {
    const twistTypes = [
      {
        type: 'betrayal',
        description: 'Un allié se révèle être un ennemi',
        effect: () => {
          const ally = story.characters.find(c => c.relationship === 'friendly');
          if (ally) {
            ally.relationship = 'hostile';
            return `${ally.name} vous trahit!`;
          }
          return null;
        }
      },
      {
        type: 'hidden_identity',
        description: 'L\'identité réelle d\'un personnage est révélée',
        effect: () => {
          const character = story.characters[Math.floor(Math.random() * story.characters.length)];
          return `${character.name} n'est pas celui/celle que vous pensiez!`;
        }
      },
      {
        type: 'false_enemy',
        description: 'L\'ennemi était en fait un allié',
        effect: () => {
          const enemy = story.characters.find(c => c.relationship === 'hostile');
          if (enemy) {
            enemy.relationship = 'friendly';
            return `${enemy.name} était de votre côté depuis le début!`;
          }
          return null;
        }
      },
      {
        type: 'hidden_agenda',
        description: 'Le véritable objectif est différent',
        effect: () => {
          return 'La quête que vous poursuivez cache un dessein plus grand!';
        }
      }
    ];

    const twist = twistTypes[Math.floor(Math.random() * twistTypes.length)];
    const effectResult = twist.effect();

    if (!effectResult) return null;

    return {
      type: twist.type,
      description: twist.description,
      revelation: effectResult,
      actNumber: story.currentAct + 1,
      timestamp: Date.now()
    };
  }

  /**
   * Obtient les personnages impliqués dans une action
   */
  _getInvolvedCharacters(story, action) {
    if (action.targetCharacterId) {
      const character = story.characters.find(c => c.id === action.targetCharacterId);
      return character ? [character.name] : [];
    }
    // Par défaut, implique les personnages principaux
    return story.characters.slice(0, 2).map(c => c.name);
  }

  /**
   * Calcule l'impact d'une action
   */
  _calculateImpact(action) {
    const impacts = {
      combat: 0.8,
      dialogue: 0.5,
      exploration: 0.3,
      decision: 1.0
    };

    return impacts[action.type] || 0.5;
  }

  /**
   * Met à jour les objectifs
   */
  _updateObjectives(act, action) {
    act.objectives.forEach(obj => {
      if (obj.status === 'pending' && this._isObjectiveMet(obj, action)) {
        obj.status = 'completed';
        console.log(`[Dynamic Storytelling] ✅ Objective completed: ${obj.description}`);
      }
    });
  }

  /**
   * Vérifie si un objectif est rempli
   */
  _isObjectiveMet(objective, action) {
    // Logique simplifiée - peut être étendue
    if (action.completedObjectiveId === objective.id) {
      return true;
    }
    return false;
  }

  /**
   * Vérifie si un acte est terminé
   */
  _isActCompleted(act) {
    const mandatoryObjectives = act.objectives.filter(o => !o.optional);
    return mandatoryObjectives.every(o => o.status === 'completed');
  }

  /**
   * Termine un acte
   */
  _completeAct(story, act) {
    act.completed = true;
    act.completedAt = Date.now();

    console.log(`[Dynamic Storytelling] 📜 Act ${act.actNumber} completed: ${act.title}`);

    // Passe à l'acte suivant
    story.currentAct++;

    if (story.currentAct >= story.acts.length) {
      // Histoire terminée
      this._completeStory(story);
    } else {
      // Démarre l'acte suivant
      const nextAct = story.acts[story.currentAct];
      console.log(`[Dynamic Storytelling] 📖 Starting Act ${nextAct.actNumber}: ${nextAct.title}`);
    }
  }

  /**
   * Termine une histoire
   */
  _completeStory(story) {
    story.status = 'completed';
    story.completedAt = Date.now();
    story.duration = story.completedAt - story.startedAt;

    // Statistiques
    this.stats.storiesCompleted++;
    this.stats.avgStoryDuration = 
      (this.stats.avgStoryDuration * (this.stats.storiesCompleted - 1) + story.duration) / 
      this.stats.storiesCompleted;

    // Archive
    this.completedStories.push(story);
    this.activeStories.delete(story.id);

    console.log(`[Dynamic Storytelling] 🎬 Story completed: "${story.title}" (${story.acts.length} acts, ${(story.duration / 60000).toFixed(1)} min)`);

    // Génère un épilogue
    const epilogue = this._generateEpilogue(story);
    story.epilogue = epilogue;

    return epilogue;
  }

  /**
   * Génère un épilogue
   */
  _generateEpilogue(story) {
    const theme = story.theme.name;
    const choices = story.playerChoices.length;
    const twists = story.twists.length;

    const epilogues = {
      revenge: [
        'La vengeance est accomplie, mais à quel prix?',
        'Le sang a coulé, mais la paix est-elle retrouvée?'
      ],
      redemption: [
        'Une nouvelle vie commence, lavée des péchés passés',
        'Le salut est trouvé, le chemin s\'éclaire'
      ],
      discovery: [
        'La vérité est révélée, le mystère résolu',
        'La connaissance acquise change tout'
      ],
      betrayal: [
        'La confiance est brisée, mais la leçon est apprise',
        'Le traître est démasqué, l\'ordre restauré'
      ]
    };

    const pool = epilogues[theme] || epilogues.discovery;
    const text = pool[Math.floor(Math.random() * pool.length)];

    return {
      text,
      statistics: {
        choicesMade: choices,
        twistsEncountered: twists,
        charactersInvolved: story.characters.length
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 4: NARRATIVE MEMORY & COHERENCE
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Enregistre un événement dans la mémoire narrative
   */
  _recordInMemory(event) {
    if (!this.config.enableCoherence) return;

    this.narrativeMemory.events.push({
      ...event,
      timestamp: Date.now()
    });

    // Limite la mémoire aux 100 derniers événements
    if (this.narrativeMemory.events.length > 100) {
      this.narrativeMemory.events.shift();
    }
  }

  /**
   * Enregistre une décision du joueur
   */
  recordDecision(decision) {
    this.narrativeMemory.decisions.push({
      ...decision,
      timestamp: Date.now()
    });

    if (this.narrativeMemory.decisions.length > 50) {
      this.narrativeMemory.decisions.shift();
    }
  }

  /**
   * Enregistre une conséquence
   */
  recordConsequence(decision, consequence) {
    this.narrativeMemory.consequences.push({
      decision,
      consequence,
      timestamp: Date.now()
    });

    if (this.narrativeMemory.consequences.length > 50) {
      this.narrativeMemory.consequences.shift();
    }
  }

  /**
   * Vérifie la cohérence narrative
   */
  checkCoherence(newEvent) {
    if (!this.config.enableCoherence) return true;

    // Vérifie les contradictions avec les événements passés
    const recentEvents = this.narrativeMemory.events.slice(-10);

    for (const pastEvent of recentEvents) {
      if (this._isContradictory(pastEvent, newEvent)) {
        console.warn(`[Dynamic Storytelling] ⚠️ Narrative contradiction detected`);
        return false;
      }
    }

    return true;
  }

  /**
   * Vérifie si deux événements sont contradictoires
   */
  _isContradictory(event1, event2) {
    // Logique simplifiée - peut être étendue
    if (event1.type === 'character_death' && event2.type === 'character_appearance') {
      if (event1.characterId === event2.characterId) {
        return true;
      }
    }
    return false;
  }

  /**
   * Obtient le contexte narratif actuel
   */
  getNarrativeContext() {
    const recentEvents = this.narrativeMemory.events.slice(-5);
    const recentDecisions = this.narrativeMemory.decisions.slice(-3);
    const activeStoryIds = Array.from(this.activeStories.keys());

    return {
      recentEvents,
      recentDecisions,
      activeStories: activeStoryIds.length,
      recurringCharacters: Array.from(this.recurringCharacters.values())
        .filter(c => c.appearances > 2)
        .map(c => ({ name: c.name, appearances: c.appearances }))
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 5: UTILITIES & STATS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Obtient une histoire active
   */
  getStory(storyId) {
    return this.activeStories.get(storyId);
  }

  /**
   * Obtient toutes les histoires actives
   */
  getActiveStories() {
    return Array.from(this.activeStories.values());
  }

  /**
   * Obtient les personnages récurrents
   */
  getRecurringCharacters() {
    return Array.from(this.recurringCharacters.values())
      .sort((a, b) => b.appearances - a.appearances);
  }

  /**
   * Obtient les statistiques
   */
  getStats() {
    return {
      ...this.stats,
      activeStories: this.activeStories.size,
      recurringCharacters: this.recurringCharacters.size,
      memorySize: this.narrativeMemory.events.length,
      predictionAccuracy: this.stats.predictions?.correct / Math.max(1, this.stats.predictions?.total) || 0
    };
  }

  /**
   * Génère un résumé d'histoire
   */
  generateStorySummary(storyId) {
    const story = this.activeStories.get(storyId) || 
                  this.completedStories.find(s => s.id === storyId);

    if (!story) return null;

    const completedActs = story.acts.filter(a => a.completed).length;

    return {
      title: story.title,
      theme: story.theme.name,
      progress: `${completedActs}/${story.acts.length} actes`,
      characters: story.characters.map(c => c.name),
      twists: story.twists.length,
      duration: story.completedAt ? 
        `${((story.completedAt - story.startedAt) / 60000).toFixed(1)} min` :
        'En cours',
      status: story.status
    };
  }

  /**
   * Réinitialise le système
   */
  reset() {
    this.activeStories.clear();
    this.completedStories = [];
    this.recurringCharacters.clear();
    this.narrativeThreads.clear();
    this.narrativeMemory = {
      events: [],
      decisions: [],
      consequences: []
    };
    this.stats = {
      storiesGenerated: 0,
      storiesCompleted: 0,
      twistsGenerated: 0,
      charactersCreated: 0,
      avgStoryDuration: 0
    };

    console.log('[Dynamic Storytelling] 🔄 Reset complete');
  }
}

export default DynamicStorytelling;
