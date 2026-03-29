/**
 * theme.js — Solarized theme+  toggle. Created by a Claude session
 *
 * Usage: <script src="js/theme.js" defer></script>
 *
 * Requires in HTML:
 *   <html data-theme="dark">           ← fallback before JS runs
 *   <div class="theme-toggle" ...>
 *     <div class="toggle-track"><div class="toggle-thumb"></div></div>
 *     <span class="toggle-icon" id="toggle-icon"></span>
 *     <span id="toggle-label"></span>
 *   </div>
 *
 * The IIFE at the top runs synchronously (before defer kicks in for the rest)
 * only if you also add this inline <script> in <head> — see template.html.
 * Without it the page still works, but may flash the wrong theme briefly.
 */

/* ── Apply stored / OS preference before first paint ── */
(function () {
  document.documentElement.classList.add('no-transition');
  const stored   = localStorage.getItem('sol-theme');
  const osPrefers = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = stored || osPrefers;
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('no-transition');
  });
})();

/* ── Toggle logic ── */
function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('sol-theme', next);
  _updateToggleUI(next);
}

function _updateToggleUI(theme) {
  const icon  = document.getElementById('toggle-icon');
  const label = document.getElementById('toggle-label');
  if (!icon || !label) return;
  icon.textContent  = theme === 'dark' ? '☀️' : '🌙';
  label.textContent = theme === 'dark' ? 'Light' : 'Dark';
}

/* ── Wire up after DOM ready ── */
document.addEventListener('DOMContentLoaded', function () {
  _updateToggleUI(document.documentElement.dataset.theme);

  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', toggleTheme);
  btn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme(); }
  });
});
