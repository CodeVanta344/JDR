/**
 * MessageManager — pure data transformations for the game-master message flow.
 *
 * Extracts the payload-building and response-classification logic from
 * App.jsx's handleSubmit so that App.jsx only orchestrates React state.
 */

/** @typedef {import('./types').Player}      Player      */
/** @typedef {import('./types').Message}     Message     */
/** @typedef {import('./types').Challenge}   Challenge   */
/** @typedef {import('./types').LoreModules} LoreModules */
/** @typedef {import('./types').GamePhase}   GamePhase   */

// ─── payload builder ────────────────────────────────────────────────────────

/**
 * Build the request body sent to the `game-master` edge function.
 *
 * @param {object} params
 * @param {string} params.content       — player message text
 * @param {object[]} params.messages    — current message history
 * @param {string} params.tempId        — optimistic message ID to exclude
 * @param {string} params.sessionId
 * @param {string} params.playerId
 * @param {string} params.gamePhase     — INTRO | EXPLORATION | DRAMA
 * @param {number} params.gameTime
 * @param {string} params.timeLabel
 * @param {object} params.weather
 * @param {object} params.character     — full player record
 * @param {object} params.chronicle     — world chronicle array
 * @param {object} params.loreModules   — { WORLD_CONTEXT, ENVIRONMENTAL_RULES, BESTIARY, … }
 * @returns {object} body for supabase.functions.invoke('game-master', { body })
 */
export function buildGameMasterPayload({
    content,
    messages,
    tempId,
    sessionId,
    playerId,
    gamePhase,
    gameTime,
    timeLabel,
    weather,
    character,
    chronicle,
    loreModules,
}) {
    const {
        WORLD_CONTEXT,
        ENVIRONMENTAL_RULES,
        BESTIARY,
        BESTIARY_EXTENDED,
        CLASSES,
        NPC_TEMPLATES,
        QUEST_HOOKS,
        TAVERNS_AND_LOCATIONS,
        RUMORS_AND_GOSSIP,
        RANDOM_ENCOUNTERS,
        WORLD_MYTHS_EXTENDED,
        LEGENDARY_ITEMS,
        FACTION_LORE,
    } = loreModules;

    return {
        action: content,
        history: messages
            .filter(
                (m) =>
                    m.id !== 'temp-intro' &&
                    m.id !== tempId &&
                    !m.content?.startsWith('(MÉMOIRE:'),
            )
            .slice(-15)
            .map((m) => ({ role: m.role, content: m.content })),
        sessionId,
        playerId,
        gamePhase,
        context: 'WORLD_INTERACTION',
        gameTime,
        timeLabel,
        weather,
        playerProfile: {
            name: character.name,
            class: character.class,
            level: character.level,
            stats: character.stats,
            inventory: character.inventory,
            backstory: character.backstory_gm_context,
        },
        codex_data: {
            visited_npcs: character.visited_npcs || [],
            discovered_locations: character.discovered_locations || [],
            active_quests: character.active_quests || [],
            discovered_secrets: character.discovered_secrets || [],
            important_events: character.important_events || [],
            discovered_visuals: character.discovered_visuals || [],
        },
        challenge_guidance: {
            require_roll_for: [
                'actions dangereuses (sauter un précipice, escalader, désamorcer)',
                'tentatives difficiles (crocheter une serrure complexe, négocier avec un PNJ hostile)',
                'découvertes cachées (pièges, passages secrets, objets dissimulés)',
                'connaissances spécifiques (histoire ancienne, magie complexe)',
            ],
            no_roll_for: [
                'lire un panneau, un livre, ou tout texte visible',
                "observer un environnement évident (portes, fenêtres, meubles)",
                "actions triviales (marcher, s'asseoir, ouvrir une porte non verrouillée)",
                'interagir avec des objets accessibles (prendre une torche, boire à une fontaine)',
                'parler à un PNJ amical ou neutre',
            ],
            note: 'Les actions simples d\'observation ne nécessitent PAS de jet de perception. Un panneau en bois est LISIBLE sans jet.',
            interaction_guidance:
                "QUAND l'intention du joueur est vague ou ambiguë (ex: 'je veux aller voir les marchands', 'je parle au PNJ', 'je fouille la pièce'), tu DOIS poser une question pour clarifier CE qu'il veut faire exactement. Exemples: 'Que cherches-tu chez les marchands ?' / 'Tu veux acheter, vendre ou juste regarder ?' / 'Qu'as-tu envie de demander à ce marchand ?'",
        },
        lore: {
            context: `${WORLD_CONTEXT}\n\n${ENVIRONMENTAL_RULES}`,
            bestiary: { ...BESTIARY, ...BESTIARY_EXTENDED },
            classes: CLASSES,
            chronicle,
            npcs: NPC_TEMPLATES,
            quests: QUEST_HOOKS,
            locations: TAVERNS_AND_LOCATIONS,
            rumors: RUMORS_AND_GOSSIP,
            encounters: RANDOM_ENCOUNTERS,
            myths: WORLD_MYTHS_EXTENDED,
            legendaryItems: LEGENDARY_ITEMS,
            factions: FACTION_LORE,
        },
    };
}

// ─── challenge classifier ───────────────────────────────────────────────────

const TRIVIAL_KEYWORDS = [
    'panneau', 'lire', 'écrit', 'signe', 'affiche', 'inscription',
    'observer', 'regarder', 'voir', 'regarde', 'observe',
];

/**
 * Determine whether an AI-generated challenge is trivial and should be
 * auto-resolved (e.g. reading a sign = no dice roll needed).
 *
 * @param {object} challenge — the challenge object from the AI response
 * @param {string} playerInput — the original player text
 * @returns {boolean}
 */
export function isTrivialChallenge(challenge, playerInput) {
    const label = (challenge.label ?? '').toLowerCase();
    const stat = (challenge.stat ?? '').toLowerCase();

    const matchesTrivial = TRIVIAL_KEYWORDS.some(
        (kw) => label.includes(kw) || playerInput.toLowerCase().includes(kw),
    );
    return matchesTrivial && (stat === 'perception' || stat === 'intelligence');
}

/**
 * Validate that player input is meaningful enough to warrant a challenge.
 * Rejects gibberish, empty text, and strings with no alphabetic characters.
 *
 * @param {string} input
 * @returns {boolean}
 */
export function isValidChallengeInput(input) {
    return (
        !!input &&
        input.length >= 3 &&
        /[a-zA-Z]/.test(input) &&
        !/^[^a-zA-Z]*$/.test(input)
    );
}

// ─── game phase progression ─────────────────────────────────────────────────

/**
 * Determine the next game phase based on message count.
 *
 * @param {string} currentPhase — INTRO | EXPLORATION | DRAMA
 * @param {number} messageCount
 * @returns {string|null} new phase if changed, null if unchanged
 */
export function resolveNextPhase(currentPhase, messageCount) {
    if (currentPhase === 'INTRO' && messageCount > 10) return 'EXPLORATION';
    if (currentPhase === 'EXPLORATION' && messageCount > 35) return 'DRAMA';
    return null;
}
