/* ===================================
   Needway Nutrition — Theme Toggle
   =================================== */

const ThemeManager = (() => {
    const STORAGE_KEY = 'needway-theme';

    function init() {
        const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
        applyTheme(saved);
        renderToggle();
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

    function renderToggle() {
        // Insert toggle button into all headers
        document.querySelectorAll('.header__actions').forEach(actions => {
            if (actions.querySelector('.theme-toggle')) return;
            const btn = document.createElement('button');
            btn.className = 'header__action theme-toggle';
            btn.setAttribute('aria-label', 'Alternar tema');
            btn.onclick = toggle;
            btn.innerHTML = '<span class="header__action-icon theme-toggle__icon">🌙</span>';
            actions.insertBefore(btn, actions.firstChild);
        });
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
