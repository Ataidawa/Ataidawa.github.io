(function () {
  function ready() {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', function () {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      window.__themeOverride = next;
      try { localStorage.setItem('theme-mode', next); } catch (e) {}
      var url = new URL(location.href);
      if (url.searchParams.has('theme')) {
        url.searchParams.delete('theme');
        history.replaceState(null, '', url.pathname + url.search + url.hash);
      }
      window.__themeApply();
    });
    window.addEventListener('storage', function () {
      window.__themeOverride = null;
      window.__themeApply();
    });
    document.addEventListener('visibilitychange', window.__themeApply);
    window.__themeApply();
    setInterval(window.__themeApply, 60000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
