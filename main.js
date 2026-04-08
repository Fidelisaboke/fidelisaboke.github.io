/**
 * TROPICAL BLUSH — Theme Toggle & Scroll Reveal
 * Shared across all portfolio pages.
 */

(function () {
    'use strict';

    // Theme toggle
    const STORAGE_KEY = 'portfolio-theme';

    function getPreferredTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        // Default to dark
        return 'dark';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }

    // Apply immediately to prevent flash of wrong theme
    applyTheme(getPreferredTheme());

    document.addEventListener('DOMContentLoaded', function () {
        // Re-apply after DOM ready
        applyTheme(getPreferredTheme());

        // Bind toggle button
        var toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                var current = document.documentElement.getAttribute('data-theme');
                var next = current === 'dark' ? 'light' : 'dark';
                applyTheme(next);
            });
        }

        // Scroll Reveal
        var reveals = document.querySelectorAll('.reveal, .stagger');
        if (reveals.length === 0) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(function (el) {
            observer.observe(el);
        });
    });
})();
