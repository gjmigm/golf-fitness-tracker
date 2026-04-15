// Golf Fitness Tracker — Exercise Modal

(function () {
  'use strict';

  const backdrop  = document.getElementById('modal-backdrop');
  const modal     = document.getElementById('exercise-modal');
  const nameEl    = document.getElementById('modal-exercise-name');
  const videoEl   = document.getElementById('modal-video');
  const noVideoEl = document.getElementById('modal-no-video');
  const descEl    = document.getElementById('modal-description');
  const cuesWrap  = document.getElementById('modal-cues-wrap');
  const cuesList  = document.getElementById('modal-cues-list');
  const closeBtn  = document.getElementById('modal-close-btn');

  let isOpen = false;

  // ─── Open ────────────────────────────────────────────────────────────────
  window.showModal = function (exerciseKey) {
    const ex = APP_DATA.exercises[exerciseKey];
    if (!ex) return;

    // Populate
    nameEl.textContent = ex.name;
    descEl.textContent = ex.description;

    // Video or fallback
    if (ex.youtubeId && ex.youtubeId.length > 0) {
      videoEl.src = `https://www.youtube.com/embed/${ex.youtubeId}?rel=0&modestbranding=1`;
      videoEl.style.display = 'block';
      noVideoEl.style.display = 'none';
    } else {
      videoEl.src = '';
      videoEl.style.display = 'none';
      noVideoEl.style.display = 'flex';
    }

    // Cues
    if (ex.cues && ex.cues.length > 0) {
      cuesList.innerHTML = ex.cues.map(cue => `<li>${cue}</li>`).join('');
      cuesWrap.style.display = 'block';
    } else {
      cuesWrap.style.display = 'none';
    }

    // Scroll modal body to top
    modal.querySelector('.modal-body').scrollTop = 0;

    // Open
    backdrop.classList.add('is-open');
    modal.classList.add('is-open');
    isOpen = true;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  // ─── Close ───────────────────────────────────────────────────────────────
  function closeModal() {
    if (!isOpen) return;

    // CRITICAL: clear iframe src to stop audio playback in background
    videoEl.src = '';

    backdrop.classList.remove('is-open');
    modal.classList.remove('is-open');
    isOpen = false;

    document.body.style.overflow = '';
  }

  // Close triggers
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // ─── Drag to Dismiss ─────────────────────────────────────────────────────
  let dragStartY = 0;
  let dragCurrentY = 0;
  let isDragging = false;

  const dragHandle = document.getElementById('modal-drag-handle');

  dragHandle.addEventListener('touchstart', function (e) {
    dragStartY = e.touches[0].clientY;
    dragCurrentY = dragStartY;
    isDragging = true;
    modal.style.transition = 'none';
  }, { passive: true });

  dragHandle.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    dragCurrentY = e.touches[0].clientY;
    const delta = Math.max(0, dragCurrentY - dragStartY);
    modal.style.transform = `translateY(${delta}px)`;
  }, { passive: true });

  dragHandle.addEventListener('touchend', function () {
    if (!isDragging) return;
    isDragging = false;
    modal.style.transition = '';

    const delta = dragCurrentY - dragStartY;
    if (delta > 80) {
      modal.style.transform = '';
      closeModal();
    } else {
      modal.style.transform = '';
    }
  });

  // ─── Keyboard dismiss ────────────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closeModal();
  });

})();
