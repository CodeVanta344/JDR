/**
 * SessionManager — pure session CRUD functions extracted from App.jsx.
 *
 * Every function receives a `deps` object with the Supabase client and the
 * current profile, performs the database operation, and returns the relevant
 * data.  React state updates remain in App.jsx through thin wrappers.
 */

/** @typedef {import('./types').Profile} Profile */
/** @typedef {import('./types').Session} Session */
/** @typedef {import('./types').Player}  Player  */

import { supabase } from '../supabaseClient';

// ─── helpers ────────────────────────────────────────────────────────────────

const pushSessionURL = (sessionId) => {
    window.history.pushState({}, '', `?s=${sessionId}`);
};

const clearSessionURL = () => {
    window.history.pushState({}, '', window.location.pathname);
};

// ─── public API ─────────────────────────────────────────────────────────────

/**
 * Create a new multiplayer session.
 * @returns {{ session: object }} The created session row.
 */
export async function createSession(profile) {
    const newSessionId = crypto.randomUUID();
    const { data, error } = await supabase
        .from('sessions')
        .insert({
            id: newSessionId,
            host_id: profile.id,
            is_started: false,
            active: true,
            current_location: 'Inconnue',
        })
        .select()
        .single();

    if (error) throw error;
    pushSessionURL(newSessionId);
    return { session: data };
}

/**
 * Create and immediately start a quick-start session.
 * @returns {{ session: object, player: object|null }}
 */
export async function quickStartSession(profile) {
    const newSessionId = crypto.randomUUID();
    const { data, error } = await supabase
        .from('sessions')
        .insert({
            id: newSessionId,
            host_id: profile.id,
            is_started: true,
            active: true,
            current_location: 'Inconnue',
        })
        .select()
        .single();

    if (error) throw error;
    pushSessionURL(newSessionId);

    // Create player immediately
    const { data: playerData } = await supabase
        .from('players')
        .upsert(
            {
                session_id: newSessionId,
                user_id: profile.id,
                name: profile.name || 'Voyageur',
                is_host: true,
                is_ready: false,
            },
            { onConflict: 'session_id,user_id' },
        )
        .select()
        .single();

    return { session: data, player: playerData };
}

/**
 * Create a solo adventure session (not started, triggers character creation).
 * Sets `window.pendingQuickStart` so the lobby auto-starts.
 * @returns {{ session: object, player: object|null }}
 */
export async function soloAdventure(profile) {
    const newSessionId = crypto.randomUUID();
    const { data, error } = await supabase
        .from('sessions')
        .insert({
            id: newSessionId,
            host_id: profile.id,
            is_started: false,
            active: true,
            current_location: 'Inconnue',
        })
        .select()
        .single();

    if (error) throw error;
    pushSessionURL(newSessionId);

    const { data: playerData } = await supabase
        .from('players')
        .upsert(
            {
                session_id: newSessionId,
                user_id: profile.id,
                name: profile.name || 'Voyageur',
                is_host: true,
                is_ready: false,
            },
            { onConflict: 'session_id,user_id' },
        )
        .select()
        .single();

    if (playerData) {
        window.pendingQuickStart = true;
    }

    return { session: data, player: playerData };
}

/**
 * Create a solo session with custom character creation.
 * @returns {{ session: object }}
 */
export async function soloCustomSession(profile) {
    const newSessionId = crypto.randomUUID();
    const { data, error } = await supabase
        .from('sessions')
        .insert({
            id: newSessionId,
            host_id: profile.id,
            is_started: false,
            active: true,
            current_location: 'Inconnue',
        })
        .select()
        .single();

    if (error) throw error;
    pushSessionURL(newSessionId);
    return { session: data };
}

/**
 * Join an existing session by ID.
 * @returns {{ session: object|null }} null if not found.
 */
export async function joinSession(sessionId) {
    const { data: sessionData } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .maybeSingle();

    if (sessionData) {
        pushSessionURL(sessionId);
    }
    return { session: sessionData ?? null };
}

/**
 * Leave the current session. If host, deactivates it.
 */
export async function leaveSession(session, profile) {
    if (!session?.id) return;

    if (session.host_id === profile?.id) {
        await supabase.from('sessions').update({ active: false }).eq('id', session.id);
    }
    clearSessionURL();
}

/**
 * Toggle the ready state of the current player.
 * @returns {{ is_ready: boolean }} the new ready state.
 */
export async function toggleReady(character) {
    if (!character?.id) return { is_ready: character?.is_ready ?? false };
    const newReady = !character.is_ready;
    await supabase.from('players').update({ is_ready: newReady }).eq('id', character.id);
    return { is_ready: newReady };
}

/**
 * Delete a session and its related data (messages, players).
 */
export async function deleteSession(sessionId) {
    await supabase.from('messages').delete().eq('session_id', sessionId);
    await supabase.from('players').delete().eq('session_id', sessionId);
    await supabase.from('sessions').delete().eq('id', sessionId);
}

/**
 * Delete a saved game from world_state.
 */
export async function deleteSave(saveId) {
    await supabase.from('world_state').delete().eq('key', saveId);
}

/**
 * Load a saved game: restores the session (not started) and its players/messages.
 * Returns the data needed to hydrate state, or null on failure.
 * @returns {{ session: object, players: object[], savedPlayer: object|null, isSolo: boolean } | null}
 */
export async function loadGame(sessionId, profile, fetchSession) {
    sessionStorage.setItem('loading_save_' + sessionId, 'true');

    try {
        const { data } = await supabase
            .from('world_state')
            .select('value')
            .eq('key', `save_${sessionId}`)
            .maybeSingle();

        if (!data?.value) {
            sessionStorage.removeItem('loading_save_' + sessionId);
            return null;
        }

        const saveData = data.value;

        // Restore session as NOT started (to go to SessionHub)
        await supabase.from('sessions').upsert({
            id: sessionId,
            host_id: profile.id,
            is_started: false,
            active: true,
            current_location: saveData.players?.[0]?.current_location || 'Inconnue',
        });

        // Restore all players
        for (const player of saveData.players || []) {
            await supabase.from('players').upsert({
                ...player,
                session_id: sessionId,
                is_ready: false,
            });
        }

        // Restore messages (filter START_ADVENTURE_TRIGGERED markers)
        if (saveData.messages?.length > 0) {
            await supabase.from('messages').delete().eq('session_id', sessionId);
            const messagesToInsert = saveData.messages
                .filter((m) => !m.content?.includes('START_ADVENTURE_TRIGGERED'))
                .map((m) => ({
                    session_id: sessionId,
                    role: m.role,
                    content: m.content,
                    player_id: m.player_id,
                    created_at: m.created_at,
                }));
            await supabase.from('messages').insert(messagesToInsert);
        }

        pushSessionURL(sessionId);

        const sessionObj = await fetchSession(sessionId);
        const loadedPlayers = saveData.players || [];
        const savedPlayer = loadedPlayers.find((p) => p.user_id === profile.id) || null;
        const isSolo =
            loadedPlayers.length === 1 && loadedPlayers[0]?.user_id === profile?.id;

        sessionStorage.removeItem('loading_save_' + sessionId);

        return { session: sessionObj, players: loadedPlayers, savedPlayer, isSolo };
    } catch (err) {
        console.error('Load game error:', err);
        sessionStorage.removeItem('loading_save_' + sessionId);
        return null;
    }
}
