/* ===================================
   Needway Nutrition — Theme Toggle
   =================================== */

const ThemeManager = (() => {
    const STORAGE_KEY = 'needway-theme';

    function init() {
        const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
        applyTheme(saved);
        renderFixedToggle();
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('theme-light');
        } else {
            document.body.classList.remove('theme-light');
        }
        localStorage.setItem(STORAGE_KEY, theme);
        updateToggleIcon();
    }

    function toggle() {
        const current = localStorage.getItem(STORAGE_KEY) || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    }

    function renderFixedToggle() {
        if (document.getElementById('themeToggleFixed')) return;
        const btn = document.createElement('button');
        btn.id = 'themeToggleFixed';
        btn.setAttribute('aria-label', 'Alternar tema');
        btn.onclick = toggle;
        btn.style.cssText = `
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 999;
            width: 48px;
            height: 48px;
            border: 2px solid var(--glass-border);
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        btn.innerHTML = '<span class="theme-toggle__icon">🌙</span>';
        btn.onmouseenter = () => { btn.style.transform = 'translateY(-50%) scale(1.1)'; btn.style.borderColor = 'var(--primary)'; };
        btn.onmouseleave = () => { btn.style.transform = 'translateY(-50%) scale(1)'; btn.style.borderColor = 'var(--glass-border)'; };
        document.body.appendChild(btn);
        updateToggleIcon();
    }

    function updateToggleIcon() {
        const isDark = !document.body.classList.contains('theme-light');
        document.querySelectorAll('.theme-toggle__icon').forEach(icon => {
            icon.textContent = isDark ? '🌙' : '☀️';
        });
    }

    return { init, toggle };
})();

// Initialize theme as early as possible
document.addEventListener('DOMContentLoaded', ThemeManager.init);
