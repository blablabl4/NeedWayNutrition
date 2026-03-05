/* ===================================
   Needway Nutrition — Theme Toggle
   =================================== */

const ThemeManager = (() => {
    const STORAGE_KEY = 'needway-theme';

    function init() {
        const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
        applyTheme(saved);
        injectHeaderToggle();
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

    function injectHeaderToggle() {
        if (document.getElementById('themeToggleBtn')) return;
        const actions = document.querySelector('.header__actions');
        if (!actions) return;

        const btn = document.createElement('a');
        btn.id = 'themeToggleBtn';
        btn.href = 'javascript:void(0)';
        btn.className = 'header__action';
        btn.setAttribute('aria-label', 'Alternar tema');
        btn.onclick = (e) => { e.preventDefault(); toggle(); };
        btn.innerHTML = `
            <span class="header__action-icon theme-toggle__icon">🌙</span>
            <span>Tema</span>
        `;
        actions.appendChild(btn);
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

document.addEventListener('DOMContentLoaded', ThemeManager.init);
