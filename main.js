/**
 * TROPICAL BLUSH — Theme Toggle & Scroll Reveal
 * Shared across all portfolio pages.
 */

(function () {
    'use strict';

    // Analytics Configuration
    const UMAMI_URL = 'https://cloud.umami.is/script.js';
    const UMAMI_ID = 'e1a3a238-2e74-465e-a2d7-bca1da3af50e';

    // Initialize Analytics
    function initAnalytics() {
        if (document.querySelector('script[data-website-id="' + UMAMI_ID + '"]')) return;
        
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = UMAMI_URL;
        script.setAttribute('data-website-id', UMAMI_ID);
        document.head.appendChild(script);
    }

    /**
     * Track a custom event
     * @param {string} name - Event name
     * @param {object} [data] - Optional metadata
     */
    window.trackEvent = function(name, data) {
        if (window.umami && typeof window.umami.track === 'function') {
            window.umami.track(name, data);
        } else {
            // Fallback for when Umami is blocked or not yet loaded
            console.debug(`[Analytics] Event: ${name}`, data);
        }
    };

    initAnalytics();

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

        // Auto-bind analytics events
        document.addEventListener('click', function (e) {
            const target = e.target.closest('[data-analytics-event]');
            if (target) {
                const eventName = target.getAttribute('data-analytics-event');
                const eventData = target.getAttribute('data-analytics-data');
                let data = {};
                try {
                    if (eventData) data = JSON.parse(eventData);
                } catch (err) {}
                
                window.trackEvent(eventName, data);
            }
        });
    });
})();

