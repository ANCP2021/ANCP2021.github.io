/**
 * Experience page - View toggle (Summary vs Detailed) with fade transition
 */
(function() {
    const FADE_DURATION_MS = 400;

    function initExperienceToggle() {
        const toggle = document.getElementById('experience-view-toggle');
        const shortView = document.getElementById('experience-short-view');
        const longView = document.getElementById('experience-long-view');
        const wrapper = document.querySelector('.experience-views-wrapper');

        if (!toggle || !shortView || !longView || !wrapper) return;

        const STORAGE_KEY = 'experience-view-mode';
        const MODE_SHORT = 'short';
        const MODE_LONG = 'long';

        function getSavedMode() {
            return localStorage.getItem(STORAGE_KEY) || MODE_LONG;
        }

        function setWrapperHeight(view) {
            if (view) {
                wrapper.style.height = view.offsetHeight + 'px';
            } else {
                wrapper.style.height = '';
            }
        }

        function setView(mode, skipTransition) {
            const isShort = mode === MODE_SHORT;
            const outgoing = isShort ? longView : shortView;
            const incoming = isShort ? shortView : longView;

            if (skipTransition) {
                shortView.classList.toggle('experience-view-active', isShort);
                longView.classList.toggle('experience-view-active', !isShort);
                setWrapperHeight(incoming);
                toggle.setAttribute('aria-pressed', isShort ? 'true' : 'false');
                toggle.classList.toggle('view-toggle-summary', isShort);
                toggle.disabled = false;
                return;
            }

            toggle.disabled = true;

            // Step 1: Lock wrapper height, then fade out current view
            setWrapperHeight(outgoing);
            outgoing.classList.remove('experience-view-active');

            outgoing.addEventListener('transitionend', function onFadeOut() {
                outgoing.removeEventListener('transitionend', onFadeOut);

                // Step 2: Swap to new view and fade in
                setWrapperHeight(incoming);
                incoming.classList.add('experience-view-active');

                incoming.addEventListener('transitionend', function onFadeIn() {
                    incoming.removeEventListener('transitionend', onFadeIn);
                    setWrapperHeight(incoming);
                    toggle.disabled = false;
                }, { once: true });
            }, { once: true });
        }

        function toggleView() {
            const current = getSavedMode();
            const next = current === MODE_LONG ? MODE_SHORT : MODE_LONG;
            localStorage.setItem(STORAGE_KEY, next);
            toggle.setAttribute('aria-pressed', next === MODE_SHORT ? 'true' : 'false');
            toggle.classList.toggle('view-toggle-summary', next === MODE_SHORT);
            setView(next, false);
        }

        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!toggle.disabled) toggleView();
        });

        // Allow clicking labels to toggle
        const labels = document.querySelectorAll('.view-toggle-label');
        labels.forEach(function(label) {
            label.addEventListener('click', function(e) {
                e.preventDefault();
                if (!toggle.disabled) toggleView();
            });
        });

        // Initialize from saved preference (no transition on load)
        setView(getSavedMode(), true);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExperienceToggle);
    } else {
        initExperienceToggle();
    }
})();
