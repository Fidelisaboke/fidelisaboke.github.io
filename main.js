/**
 * Main script
 * Shared across all portfolio pages.
 */

(function () {
    'use strict';

    // --- Configuration ---
    const UMAMI_URL = 'https://cloud.umami.is/script.js';
    const UMAMI_ID = 'e1a3a238-2e74-465e-a2d7-bca1da3af50e';
    const EMAILJS_PUBLIC_KEY = 'knjG5w1LOJAZ5Nf2D';
    const EMAILJS_SERVICE_ID = 'service_ejoijxc';
    const EMAILJS_TEMPLATE_ID = 'template_3621udf';

    // --- Analytics ---
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

    // --- Toast System ---
    function showToast(message, type = 'info') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
            error: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
        };

        toast.innerHTML = `
            ${icons[type] || icons.info}
            <div class="toast-content">${message}</div>
        `;

        container.appendChild(toast);

        // Auto-remove
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // --- Scroll Progress ---
    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            bar.style.width = scrolled + "%";
        });
    }

    // --- Contact Form ---
    async function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Load EmailJS SDK dynamically if not present
        if (!window.emailjs) {
            await new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
                script.onload = resolve;
                document.head.appendChild(script);
            });
            window.emailjs.init(EMAILJS_PUBLIC_KEY);
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Loading state
            btn.disabled = true;
            btn.classList.add('btn-loading');

            window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
                .then(() => {
                    showToast('Message sent successfully!', 'success');
                    form.reset();
                    window.trackEvent('Contact Form Success');
                })
                .catch((err) => {
                    console.error('EmailJS Error:', err);
                    showToast('Failed to send message. Please try again.', 'error');
                    window.trackEvent('Contact Form Error');
                })
                .finally(() => {
                    btn.disabled = false;
                    btn.classList.remove('btn-loading');
                    btn.innerHTML = originalText;
                });
        });
    }

    // --- Initialization ---
    initAnalytics();

    // Theme logic
    const STORAGE_KEY = 'portfolio-theme';
    function getPreferredTheme() {
        return localStorage.getItem(STORAGE_KEY) || 'dark';
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
        initScrollProgress();
        initContactForm();

        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                const current = document.documentElement.getAttribute('data-theme');
                applyTheme(current === 'dark' ? 'light' : 'dark');
            });
        }

        // Scroll Reveal
        const reveals = document.querySelectorAll('.reveal, .stagger');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(el => observer.observe(el));

        // Global Analytics Binder
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-analytics-event]');
            if (target) {
                const name = target.getAttribute('data-analytics-event');
                const rawData = target.getAttribute('data-analytics-data');
                let data = {};
                try { if (rawData) data = JSON.parse(rawData); } catch (err) {}
                window.trackEvent(name, data);
            }
        });
    });
})();


