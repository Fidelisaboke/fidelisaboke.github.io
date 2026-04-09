/**
 * Interactive Developer Terminal
 * A fake CLI for exploring Fidel Isaboke's portfolio.
 */

(function () {
    'use strict';

    const HISTORY_KEY = 'terminal-history';
    const VISITED_KEY = 'terminal-visited';
    const PROMPT = 'fidel@portfolio:~$ ';

    const ASCII_BANNER = `
  -----------------------------------------------
  FIDEL ISABOKE | Full Stack Developer & AI Engineer
  -----------------------------------------------
`;

    const WELCOME_MSG = "\nWelcome to my interactive terminal. Type 'help' to get started.\n";

    // ── Command Registry ──────────────────────────────────────────

    const commands = {

        help: () => {
            return [
                '',
                '  Available Commands:',
                '  ──────────────────────────────────────────────',
                '  about            Who I am',
                '  skills           My tech stack',
                '  projects         Featured work',
                '  certifications   Credentials & badges',
                '  contact          How to reach me',
                '  cv               Open my resume (new tab)',
                '  theme [d/l]      Toggle or set the site theme',
                '  history          Show command history',
                '  whoami           Who are you?',
                '  date             Current date & time',
                '  echo [text]      Echo your input',
                '  clear            Clear the terminal',
                '  secret           ???',
                '  help             Show this list',
                '',
            ].join('\n');
        },

        about: () => {
            return [
                '',
                '  ╭──────────────────────────────────────────────╮',
                '  │  Fidel Isaboke                               │',
                '  │  Full Stack Developer & AI Engineer           │',
                '  ╰──────────────────────────────────────────────╯',
                '',
                '  Informatics & Computer Science graduate from',
                '  Strathmore University with 3+ years of experience',
                '  in web development. I build AI agents with LangChain',
                '  and deploy full-stack production systems.',
                '',
                '  → <a href="about.html">Visit the About page</a>',
                '',
            ].join('\n');
        },

        skills: () => {
            return [
                '',
                '  ┌─ Languages ──────────────────────────────────┐',
                '  │  Python · JavaScript · TypeScript · Java      │',
                '  └──────────────────────────────────────────────┘',
                '  ┌─ Frameworks ─────────────────────────────────┐',
                '  │  React · Next.js · FastAPI · Django · Flask   │',
                '  └──────────────────────────────────────────────┘',
                '  ┌─ AI / ML ───────────────────────────────────-┐',
                '  │  LangChain · LangGraph · Scikit-Learn         │',
                '  └──────────────────────────────────────────────┘',
                '  ┌─ Tools ──────────────────────────────────────┐',
                '  │  Git · Docker · PostgreSQL · MongoDB          │',
                '  └──────────────────────────────────────────────┘',
                '',
            ].join('\n');
        },

        projects: () => {
            return [
                '',
                '  Projects',
                '  ──────────────────────────────────────────────',
                '  Slideia          AI slides generator           <a href="https://slideia.vercel.app" target="_blank">↗ Demo</a>  <a href="https://github.com/Fidelisaboke/slideia" target="_blank">↗ GitHub</a>',
                '  Zerra Code Rev.  Socratic AI code reviewer     <a href="https://github.com/apps/zerra-edtech-ai-code-reviewer" target="_blank">↗ App</a>',
                '  CreditExplain    Self-RAG for compliance       <a href="https://github.com/Fidelisaboke/CreditExplain" target="_blank">↗ GitHub</a>',
                '  Robust NIDS      Adversarial ML defence        <a href="https://github.com/Fidelisaboke/robust-nids" target="_blank">↗ GitHub</a>',
                '',
                '  → <a href="projects.html">View all projects</a>',
                '',
            ].join('\n');
        },

        certifications: () => {
            return [
                '',
                '  Certifications',
                '  ──────────────────────────────────────────────',
                '  Introduction to AI Agents      NSK.AI · 2025',
                '  Software Architecture          Safaricom · 2024',
                '  Python Essentials 2             Cisco · 2024',
                '  CCNA: Switching & Routing       Cisco · 2023',
                '  Python Essentials 1             Cisco · 2023',
                '  CCNA: Intro to Networks         Cisco · 2023',
                '',
                '  → <a href="about.html#certifications">View certificates</a>',
                '',
            ].join('\n');
        },

        contact: () => {
            return [
                '',
                '  Get in Touch',
                '  ──────────────────────────────────────────────',
                '  GitHub     <a href="https://github.com/Fidelisaboke" target="_blank">github.com/Fidelisaboke</a>',
                '  LinkedIn   <a href="https://www.linkedin.com/in/fidel-isaboke-57aba3263/" target="_blank">linkedin.com/in/fidel-isaboke</a>',
                '',
                '  → <a href="contact.html">Contact page</a>',
                '',
            ].join('\n');
        },

        cv: () => {
            if (window.trackEvent) {
                window.trackEvent('Download CV', { location: 'terminal' });
            }
            window.open('docs/fidel-isaboke-cv.pdf', '_blank');
            return '\n  Opening resume in a new tab...\n';
        },

        theme: (args) => {
            const arg = (args[0] || '').toLowerCase();
            let next;

            if (arg === 'd' || arg === 'dark') {
                next = 'dark';
            } else if (arg === 'l' || arg === 'light') {
                next = 'light';
            } else {
                const current = document.documentElement.getAttribute('data-theme');
                next = current === 'dark' ? 'light' : 'dark';
            }

            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('portfolio-theme', next);
            return `\n  Theme set to ${next}.\n`;
        },

        whoami: () => {
            return '\n  visitor@fidel-portfolio\n';
        },

        date: () => {
            return '\n  ' + new Date().toString() + '\n';
        },

        echo: (args) => {
            return '\n  ' + (args.join(' ') || '') + '\n';
        },

        clear: () => {
            return '__CLEAR__';
        },

        history: () => {
            const hist = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
            if (hist.length === 0) return '\n  No command history yet.\n';
            const lines = hist.map((cmd, i) => `  ${String(i + 1).padStart(4)}  ${cmd}`);
            return '\n' + lines.join('\n') + '\n';
        },

        secret: () => {
            return [
                '',
                '  You found something...',
                '  There are hidden surprises in this terminal.',
                '  Try the Konami code (↑↑↓↓←→←→BA) sometime...',
                '',
            ].join('\n');
        },

        sudo: () => {
            return '\n  Nice try. You don\'t have root access here.\n';
        },
    };

    // ── Terminal Engine ───────────────────────────────────────────

    let commandHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    let historyIndex = -1;

    function saveHistory() {
        // Keep last 50 commands
        const trimmed = commandHistory.slice(-50);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    }

    function executeCommand(input) {
        const trimmed = input.trim();
        if (!trimmed) return '';

        // Store in history
        commandHistory.push(trimmed);
        historyIndex = -1;
        saveHistory();

        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (commands[cmd]) {
            if (window.trackEvent) {
                window.trackEvent('Terminal Command', { command: cmd, args: args.join(' ') });
            }
            return commands[cmd](args);
        }

        return `\n  Command not found: ${cmd}. Type 'help' for available commands.\n`;
    }

    // ── Typewriter Effect ─────────────────────────────────────────

    function typeWriter(element, text, speed) {
        return new Promise((resolve) => {
            let i = 0;
            function tick() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    scrollToBottom();
                    setTimeout(tick, speed);
                } else {
                    resolve();
                }
            }
            tick();
        });
    }

    function scrollToBottom() {
        const output = document.getElementById('terminal-output');
        if (output) output.scrollTop = output.scrollHeight;
    }

    // ── Output Rendering ──────────────────────────────────────────

    function appendOutput(html, className) {
        const output = document.getElementById('terminal-output');
        const line = document.createElement('div');
        line.className = 'terminal-line' + (className ? ' ' + className : '');
        line.innerHTML = html;
        output.appendChild(line);
        scrollToBottom();
    }

    function appendPromptLine(input) {
        appendOutput(
            '<span class="terminal-prompt">' + PROMPT + '</span>' +
            '<span class="terminal-cmd">' + escapeHtml(input) + '</span>',
            'terminal-input-echo'
        );
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ── Initialisation ────────────────────────────────────────────

    document.addEventListener('DOMContentLoaded', async function () {
        const output = document.getElementById('terminal-output');
        const input = document.getElementById('terminal-input');
        if (!output || !input) return;

        // Welcome sequence
        const hasVisited = localStorage.getItem(VISITED_KEY);

        if (!hasVisited) {
            // First visit: typewriter effect
            const bannerEl = document.createElement('pre');
            bannerEl.className = 'terminal-line ascii-art';
            output.appendChild(bannerEl);
            await typeWriter(bannerEl, ASCII_BANNER, 8);

            const welcomeEl = document.createElement('div');
            welcomeEl.className = 'terminal-line terminal-welcome';
            output.appendChild(welcomeEl);
            await typeWriter(welcomeEl, WELCOME_MSG, 20);

            localStorage.setItem(VISITED_KEY, 'true');
        } else {
            // Return visit: instant render
            const bannerEl = document.createElement('pre');
            bannerEl.className = 'terminal-line ascii-art';
            bannerEl.textContent = ASCII_BANNER;
            output.appendChild(bannerEl);

            appendOutput(WELCOME_MSG, 'terminal-welcome');
        }

        input.focus();

        // Click anywhere in terminal to focus input
        document.querySelector('.terminal-container').addEventListener('click', () => {
            input.focus();
        });

        // Handle input
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const val = input.value;
                appendPromptLine(val);

                const result = executeCommand(val);

                if (result === '__CLEAR__') {
                    output.innerHTML = '';
                } else if (result) {
                    appendOutput(result, 'terminal-result');
                }

                input.value = '';
                scrollToBottom();
            }

            // Tab auto-completion
            if (e.key === 'Tab') {
                e.preventDefault();
                const val = input.value.trim().toLowerCase();
                if (!val) return;

                const matches = Object.keys(commands).filter(c => c.startsWith(val));
                if (matches.length === 1) {
                    input.value = matches[0];
                } else if (matches.length > 1) {
                    // Show hints if multiple matches
                    appendPromptLine(val);
                    appendOutput('  ' + matches.join('  '), 'terminal-result');
                }
            }

            // Arrow up: previous command
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (commandHistory.length === 0) return;
                if (historyIndex === -1) {
                    historyIndex = commandHistory.length - 1;
                } else if (historyIndex > 0) {
                    historyIndex--;
                }
                input.value = commandHistory[historyIndex] || '';
            }

            // Arrow down: next command
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex === -1) return;
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[historyIndex] || '';
                } else {
                    historyIndex = -1;
                    input.value = '';
                }
            }
        });
    });

    // ── Konami Code Detection ─────────────────────────────────────

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateHackerMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateHackerMode() {
        const terminal = document.querySelector('.terminal-container');
        if (!terminal) return;

        terminal.classList.toggle('konami-mode');
        
        if (terminal.classList.contains('konami-mode')) {
            appendOutput('\n  [SYSTEM] Easter egg activated. Welcome to the Matrix.\n', 'terminal-welcome');
            console.log('Matrix mode engaged.');
        }
    }
})();
