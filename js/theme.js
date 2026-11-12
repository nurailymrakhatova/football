// Read the saved choice before the page is painted.
(function () {
  function readTheme() {
    try {
      return localStorage.getItem('madrid-theme') === 'dark';
    } catch (error) {
      return false;
    }
  }

  function applyTheme(dark) {
    document.documentElement.classList.toggle('dark-theme', dark);
    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      button.setAttribute('aria-pressed', String(dark));
      const label = button.querySelector('.theme-label');
      label.textContent = dark ? 'Light theme' : 'Dark theme';
      button.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
    });
  }

  applyTheme(readTheme());
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(document.documentElement.classList.contains('dark-theme'));
    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      button.addEventListener('click', function () {
        const dark = !document.documentElement.classList.contains('dark-theme');
        applyTheme(dark);
        try {
          localStorage.setItem('madrid-theme', dark ? 'dark' : 'light');
        } catch (error) {
          // The switch still works if the browser blocks saved preferences.
        }
      });
    });
  });

  // Keep other open pages in step with the same preference.
  window.addEventListener('storage', function (event) {
    if (event.key === 'madrid-theme' || event.key === null) {
      applyTheme(readTheme());
    }
  });
})();
