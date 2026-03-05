/* ===================================
   Needway Nutrition — Theme Toggle
   =================================== */

const ThemeManager = (() => {
    const STORAGE_KEY = 'needway-theme';

    const MOON_SVG = '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    const SUN_SVG = '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

    function init() {
        const saved = localStorage.getItem(STORAGE_KEY) || 'light';
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
            <span class="header__action-icon theme-toggle__icon">${MOON_SVG}</span>
            <span>Tema</span>
        `;
        actions.appendChild(btn);
        updateToggleIcon();
    }

    function updateToggleIcon() {
        const isDark = !document.body.classList.contains('theme-light');
        document.querySelectorAll('.theme-toggle__icon').forEach(icon => {
            icon.innerHTML = isDark ? MOON_SVG : SUN_SVG;
        });
    }

    return { init, toggle };
})();

document.addEventListener('DOMContentLoaded', ThemeManager.init);
