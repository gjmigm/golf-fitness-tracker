// Golf Fitness Tracker — Session State Management
// All workout session data is stored in localStorage.

const State = (function () {
  'use strict';

  const STORAGE_KEY = 'golf-workouts-sessions';

  // ─── Internal helpers ──────────────────────────────────────────────────

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { sessions: [] };
      return JSON.parse(raw);
    } catch (e) {
      console.warn('State: failed to load from localStorage', e);
      return { sessions: [] };
    }
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('State: failed to save to localStorage', e);
    }
  }

  // ─── Public API ────────────────────────────────────────────────────────

  /**
   * Start a new session for the given workout.
   * Returns the new session's unique ID (string).
   */
  function startSession(workoutId) {
    const data = load();
    const sessionId = String(Date.now());
    const session = {
      id: sessionId,
      workoutId: workoutId,
      date: new Date().toISOString(),
      exercises: {}
    };
    data.sessions.push(session);
    save(data);
    return sessionId;
  }

  /**
   * Save exercise state for a session.
   * update: { completed?: boolean, weight?: number|null }
   * Merges with existing data — only provided keys are overwritten.
   */
  function saveExercise(sessionId, exerciseKey, update) {
    const data = load();
    const session = data.sessions.find(s => s.id === sessionId);
    if (!session) return;

    const existing = session.exercises[exerciseKey] || {};
    session.exercises[exerciseKey] = Object.assign({}, existing, update);
    save(data);
  }

  /**
   * Get a single session by ID.
   * Returns the session object or null.
   */
  function getSession(sessionId) {
    const data = load();
    return data.sessions.find(s => s.id === sessionId) || null;
  }

  /**
   * Get all sessions for a given workoutId, newest first.
   */
  function getSessionsForWorkout(workoutId) {
    const data = load();
    return data.sessions
      .filter(s => s.workoutId === workoutId)
      .slice()
      .reverse();
  }

  /**
   * Get the weight values from the most recent session for a workout.
   * Returns an object: { exerciseKey: weight (number) }
   * Only includes entries where a weight was actually recorded.
   */
  function getLastWeights(workoutId) {
    const sessions = getSessionsForWorkout(workoutId);
    if (sessions.length === 0) return {};

    const last = sessions[0]; // newest first
    const weights = {};
    for (const [key, val] of Object.entries(last.exercises)) {
      if (val.weight != null && val.weight !== '') {
        weights[key] = val.weight;
      }
    }
    return weights;
  }

  /**
   * Delete a specific session by ID.
   */
  function deleteSession(sessionId) {
    const data = load();
    data.sessions = data.sessions.filter(s => s.id !== sessionId);
    save(data);
  }

  return {
    startSession,
    saveExercise,
    getSession,
    getSessionsForWorkout,
    getLastWeights,
    deleteSession
  };

})();
