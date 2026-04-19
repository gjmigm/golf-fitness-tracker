// Golf Fitness Tracker — App Navigation & Rendering

(function () {
  'use strict';

  // ─── View Stack ─────────────────────────────────────────────────────────
  const viewStack = [];

  const views = {
    home:    document.getElementById('view-home'),
    program: document.getElementById('view-program'),
    workout: document.getElementById('view-workout'),
    history: document.getElementById('view-history'),
  };

  // Current session tracking
  let currentSessionId = null;
  let currentWorkoutId = null;

  function showView(viewId, data) {
    if (viewId === 'home')    renderHome();
    if (viewId === 'program') renderProgram(data);
    if (viewId === 'workout') renderWorkout(data);
    if (viewId === 'history') renderHistory(data);

    Object.values(views).forEach(v => v.classList.remove('active', 'slide-in'));
    views[viewId].classList.add('active', 'slide-in');

    viewStack.push({ viewId, data });

    const content = views[viewId].querySelector('.view-content');
    if (content) content.scrollTop = 0;
  }

  function goBack() {
    if (viewStack.length <= 1) return;
    viewStack.pop();
    const prev = viewStack[viewStack.length - 1];

    if (prev.viewId === 'home')    renderHome();
    if (prev.viewId === 'program') renderProgram(prev.data);
    if (prev.viewId === 'workout') renderWorkout(prev.data);
    if (prev.viewId === 'history') renderHistory(prev.data);

    Object.values(views).forEach(v => v.classList.remove('active', 'slide-in'));
    views[prev.viewId].classList.add('active');
  }

  window.addEventListener('popstate', function (e) {
    e.preventDefault();
    goBack();
  });

  history.pushState({ view: 'home' }, '');

  // ─── Back Buttons ────────────────────────────────────────────────────────
  document.getElementById('program-back').addEventListener('click', goBack);
  document.getElementById('workout-back').addEventListener('click', goBack);
  document.getElementById('history-back').addEventListener('click', goBack);

  // ─── Finish Button ───────────────────────────────────────────────────────
  const finishBtn = document.getElementById('finish-btn');
  finishBtn.addEventListener('click', function () {
    if (!currentSessionId) {
      // Nothing was recorded — don't create an empty session
      finishBtn.textContent = 'Nothing recorded';
      finishBtn.classList.add('finish-btn--saved');
      setTimeout(() => {
        finishBtn.textContent = 'Finish Workout ✓';
        finishBtn.classList.remove('finish-btn--saved');
      }, 2000);
      return;
    }
    finishBtn.textContent = 'Workout Saved! ✓';
    finishBtn.classList.add('finish-btn--saved');
    setTimeout(() => {
      finishBtn.textContent = 'Finish Workout ✓';
      finishBtn.classList.remove('finish-btn--saved');
    }, 2000);
  });

  // ─── Home Screen ─────────────────────────────────────────────────────────
  function renderHome() {
    const container = document.getElementById('home-content');
    container.innerHTML = APP_DATA.programs.map(program => `
      <div class="program-card" data-program-id="${program.id}" role="button" tabindex="0">
        <div class="card-main">
          <div class="card-title">${program.title}</div>
          <div class="card-subtitle">${program.subtitle}</div>
        </div>
        <div class="card-meta">${program.workouts.length} workout${program.workouts.length !== 1 ? 's' : ''}</div>
        <svg class="card-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    `).join('');

    container.querySelectorAll('.program-card').forEach(card => {
      const activate = () => showView('program', card.dataset.programId);
      card.addEventListener('click', activate);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });
    });
  }

  // ─── Program Screen ───────────────────────────────────────────────────────
  function renderProgram(programId) {
    const program = APP_DATA.programs.find(p => p.id === programId);
    if (!program) return;

    document.getElementById('program-title').textContent = program.title;
    const container = document.getElementById('program-content');

    container.innerHTML = `
      <p class="program-subtitle-text">${program.subtitle}</p>
      ${program.workouts.map(workout => {
        const sessionCount = State.getSessionsForWorkout(workout.id).length;
        return `
        <div class="workout-card-wrap">
          <div class="workout-card" data-workout-id="${workout.id}" role="button" tabindex="0">
            <div class="card-main">
              <div class="card-title">${workout.label}</div>
              <div class="card-subtitle">${workout.style} · ${countExercises(workout)} exercises</div>
            </div>
            <button class="history-btn" data-workout-id="${workout.id}" aria-label="View history for ${workout.label}">
              History${sessionCount > 0 ? ` (${sessionCount})` : ''}
            </button>
            <svg class="card-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      `}).join('')}
    `;

    // Workout card → start workout
    container.querySelectorAll('.workout-card').forEach(card => {
      const activate = () => showView('workout', card.dataset.workoutId);
      card.addEventListener('click', function (e) {
        // Don't fire if history button was clicked
        if (e.target.closest('.history-btn')) return;
        activate();
      });
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') activate(); });
    });

    // History button → show history view
    container.querySelectorAll('.history-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        showView('history', btn.dataset.workoutId);
      });
    });
  }

  function countExercises(workout) {
    let count = 0;
    workout.sections.forEach(section => {
      if (section.type === 'superset') {
        section.items.forEach(item => { count += item.exercises.length; });
      } else {
        count += section.items.length;
      }
    });
    return count;
  }

  // ─── Workout Screen ───────────────────────────────────────────────────────
  function renderWorkout(workoutId) {
    let workout = null;
    for (const program of APP_DATA.programs) {
      workout = program.workouts.find(w => w.id === workoutId);
      if (workout) break;
    }
    if (!workout) return;

    // Session is created lazily on first interaction, not on open
    currentSessionId = null;
    currentWorkoutId = workoutId;

    // Create session on first checkbox tick or weight entry
    function ensureSession() {
      if (!currentSessionId) {
        currentSessionId = State.startSession(currentWorkoutId);
      }
    }

    // Pre-load weights from last session
    const lastWeights = State.getLastWeights(workoutId);

    document.getElementById('workout-title').textContent = workout.label;

    // Reset finish button
    finishBtn.textContent = 'Finish Workout ✓';
    finishBtn.classList.remove('finish-btn--saved');

    const container = document.getElementById('workout-content');
    const sectionsHtml = workout.sections.map(section => renderSection(section, lastWeights)).join('');
    container.innerHTML = sectionsHtml;

    // ── Bind checkbox interactions ──
    container.querySelectorAll('.exercise-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', function (e) {
        e.stopPropagation();
        const key = this.dataset.exerciseKey;
        const row = this.closest('.exercise-row');
        if (this.checked) {
          row.classList.add('exercise-row--done');
        } else {
          row.classList.remove('exercise-row--done');
        }
        ensureSession();
        State.saveExercise(currentSessionId, key, { completed: this.checked });
      });
    });

    // ── Bind weight input interactions ──
    container.querySelectorAll('.weight-input').forEach(input => {
      input.addEventListener('click', e => e.stopPropagation());
      input.addEventListener('input', function () {
        const key = this.dataset.exerciseKey;
        const val = this.value === '' ? null : parseFloat(this.value);
        ensureSession();
        State.saveExercise(currentSessionId, key, { weight: val });
      });
    });

    // ── Bind exercise row taps → modal ──
    container.querySelectorAll('[data-exercise-key]').forEach(el => {
      if (el.classList.contains('exercise-checkbox') || el.classList.contains('weight-input')) return;
      el.addEventListener('click', function (e) {
        // Don't open modal when clicking checkbox or weight input
        if (e.target.classList.contains('exercise-checkbox') ||
            e.target.classList.contains('weight-input') ||
            e.target.closest('.exercise-checkbox-wrap') ||
            e.target.closest('.weight-input-wrap')) return;
        const key = this.dataset.exerciseKey;
        if (key && APP_DATA.exercises[key]) window.showModal(key);
      });
    });
  }

  function renderSection(section, lastWeights) {
    const isStrength = section.id === 'strength';
    const sectionClass = `section section--${section.id}`;

    let itemsHtml = '';

    if (section.type === 'info') {
      itemsHtml = `
        <div class="info-block">
          <span class="info-icon">⏱</span>
          <div>
            <div class="info-title">Cardio Intervals</div>
            <div class="info-desc">${section.note}</div>
            <div class="info-hint">Choose any cardio: bike, rowing, running, jump rope, etc.</div>
          </div>
        </div>
      `;
    } else if (section.type === 'superset') {
      itemsHtml = section.items.map(item => renderSupersetItem(item, isStrength, lastWeights)).join('');
    } else {
      itemsHtml = section.items.map(item => renderExerciseRow(item, isStrength, lastWeights)).join('');
    }

    return `
      <div class="${sectionClass}">
        <div class="section-header">
          <span class="section-title">${section.title}</span>
          ${section.note ? `<span class="section-note">${section.note}</span>` : ''}
        </div>
        <div class="section-items">
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  function renderExerciseRow(item, isStrength, lastWeights) {
    const ex = APP_DATA.exercises[item.exerciseKey];
    if (!ex) return `<div class="exercise-row exercise-row--missing">${item.exerciseKey}</div>`;

    const hasVideo = ex.youtubeId && ex.youtubeId.length > 0;
    const noteHtml = item.note ? `<span class="exercise-note">${item.note}</span>` : '';
    const lastWeight = lastWeights && lastWeights[item.exerciseKey];

    const weightHtml = isStrength ? `
      <div class="weight-input-wrap" title="Weight used">
        <input
          type="number"
          class="weight-input"
          data-exercise-key="${item.exerciseKey}"
          placeholder="lb"
          min="0"
          step="2.5"
          ${lastWeight != null ? `value="${lastWeight}"` : ''}
          aria-label="Weight for ${ex.name}">
      </div>
    ` : '';

    return `
      <div class="exercise-row" data-exercise-key="${item.exerciseKey}" role="button" tabindex="0" aria-label="${ex.name}">
        <div class="exercise-checkbox-wrap">
          <input type="checkbox" class="exercise-checkbox" data-exercise-key="${item.exerciseKey}" aria-label="Mark ${ex.name} complete">
        </div>
        <div class="exercise-row-text">
          <span class="exercise-name">${ex.name}</span>
          ${noteHtml}
        </div>
        ${weightHtml}
        <div class="exercise-row-right">
          ${hasVideo ? '<span class="video-badge" aria-label="Video available">▶</span>' : '<span class="video-badge video-badge--none" aria-label="Description only">📋</span>'}
          <svg class="exercise-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>
    `;
  }

  function renderSupersetItem(item, isStrength, lastWeights) {
    const exercisesHtml = item.exercises.map((ex, i) => {
      const exData = APP_DATA.exercises[ex.exerciseKey];
      if (!exData) return `<div class="superset-exercise">${ex.exerciseKey}</div>`;
      const hasVideo = exData.youtubeId && exData.youtubeId.length > 0;
      const noteHtml = ex.note ? `<span class="exercise-note">${ex.note}</span>` : '';
      const connectorHtml = i < item.exercises.length - 1 ? '<div class="superset-connector"><span>then</span></div>' : '';
      const lastWeight = lastWeights && lastWeights[ex.exerciseKey];

      // Only strength exercises with no cardio note get a weight input
      // Cardio interval exercises (e.g., "30 sec") don't need weight
      const isCardioEx = ex.note && /sec|min/i.test(ex.note);
      const weightHtml = isStrength && !isCardioEx ? `
        <div class="weight-input-wrap" title="Weight used">
          <input
            type="number"
            class="weight-input"
            data-exercise-key="${ex.exerciseKey}"
            placeholder="lb"
            min="0"
            step="2.5"
            ${lastWeight != null ? `value="${lastWeight}"` : ''}
            aria-label="Weight for ${exData.name}">
        </div>
      ` : '';

      return `
        <div class="superset-exercise exercise-row" data-exercise-key="${ex.exerciseKey}" role="button" tabindex="0" aria-label="${exData.name}">
          <div class="exercise-checkbox-wrap">
            <input type="checkbox" class="exercise-checkbox" data-exercise-key="${ex.exerciseKey}" aria-label="Mark ${exData.name} complete">
          </div>
          <div class="exercise-row-text">
            <span class="exercise-name">${exData.name}</span>
            ${noteHtml}
          </div>
          ${weightHtml}
          <div class="exercise-row-right">
            ${hasVideo ? '<span class="video-badge" aria-label="Video available">▶</span>' : '<span class="video-badge video-badge--none" aria-label="Description only">📋</span>'}
          </div>
        </div>
        ${connectorHtml}
      `;
    }).join('');

    return `
      <div class="superset-block">
        <div class="superset-label">${item.label}</div>
        <div class="superset-exercises">${exercisesHtml}</div>
      </div>
    `;
  }

  // ─── History Screen ───────────────────────────────────────────────────────
  function renderHistory(workoutId) {
    // Find the workout label
    let workoutLabel = 'History';
    for (const program of APP_DATA.programs) {
      const w = program.workouts.find(w => w.id === workoutId);
      if (w) { workoutLabel = `${w.label} — History`; break; }
    }
    document.getElementById('history-title').textContent = workoutLabel;

    const sessions = State.getSessionsForWorkout(workoutId);
    const container = document.getElementById('history-content');

    if (sessions.length === 0) {
      container.innerHTML = `
        <div class="history-empty">
          <span class="history-empty-icon">📋</span>
          <p>No history yet</p>
          <p class="history-empty-sub">Complete a workout to see it here</p>
        </div>
      `;
      return;
    }

    // Count total exercises for the workout
    let totalExercises = 0;
    for (const program of APP_DATA.programs) {
      const w = program.workouts.find(w => w.id === workoutId);
      if (w) { totalExercises = countExercises(w); break; }
    }

    container.innerHTML = sessions.map(session => {
      const date = new Date(session.date);
      const dateStr = date.toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
      });
      const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

      const exEntries = Object.entries(session.exercises);
      const completedCount = exEntries.filter(([, v]) => v.completed).length;

      // Strength exercises with weight recorded
      const weightEntries = exEntries
        .filter(([, v]) => v.weight != null && v.weight !== '')
        .map(([key, v]) => {
          const exName = APP_DATA.exercises[key] ? APP_DATA.exercises[key].name : key;
          return `<li class="history-weight-item${v.completed ? ' history-weight-item--done' : ''}">
            <span class="history-ex-name">${exName}</span>
            <span class="history-ex-weight">${v.weight} lb${v.completed ? ' ✓' : ''}</span>
          </li>`;
        }).join('');

      return `
        <div class="history-session" data-session-id="${session.id}">
          <div class="history-session-header">
            <div class="history-date">${dateStr}</div>
            <div class="history-session-header-right">
              <div class="history-time">${timeStr}</div>
              <button class="delete-session-btn" data-session-id="${session.id}" aria-label="Delete session">🗑</button>
            </div>
          </div>
          <div class="history-completion">
            <span class="history-completion-count">${completedCount} / ${totalExercises}</span>
            <span class="history-completion-label"> exercises completed</span>
          </div>
          ${weightEntries ? `
            <ul class="history-weight-list">
              ${weightEntries}
            </ul>
          ` : '<p class="history-no-weights">No weights recorded</p>'}
        </div>
      `;
    }).join('');

    // ── Bind delete buttons ──
    const pendingDeletes = new Map(); // sessionId → timeoutId

    container.querySelectorAll('.delete-session-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const sessionId = this.dataset.sessionId;

        if (pendingDeletes.has(sessionId)) {
          // Second tap — confirmed, delete it
          clearTimeout(pendingDeletes.get(sessionId));
          pendingDeletes.delete(sessionId);
          State.deleteSession(sessionId);
          renderHistory(workoutId); // re-render in place
        } else {
          // First tap — ask for confirmation
          this.textContent = 'Confirm?';
          this.classList.add('delete-session-btn--confirm');

          const timeoutId = setTimeout(() => {
            // Revert if not confirmed within 3 seconds
            if (this.isConnected) {
              this.textContent = '🗑';
              this.classList.remove('delete-session-btn--confirm');
            }
            pendingDeletes.delete(sessionId);
          }, 3000);

          pendingDeletes.set(sessionId, timeoutId);
        }
      });
    });
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  viewStack.push({ viewId: 'home', data: null });
  renderHome();

})();
