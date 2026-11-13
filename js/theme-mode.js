(function () {
  // 主题脚本在 <head> 里加载，此时 body 还没解析，等 DOM 就绪再绑事件
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var btn = document.getElementById('theme-toggle');
    var order = ['auto', 'light', 'dark'];
    var labels = { auto: '自动（北京时间 07:00–19:00 浅色）', light: '强制浅色', dark: '强制深色' };

    function getMode() {
      try { return localStorage.getItem('theme-mode') || 'auto'; } catch (e) { return 'auto'; }
    }
    function setMode(m) {
      try { localStorage.setItem('theme-mode', m); } catch (e) {}
    }
    function refresh() {
      if (window.__themeApply) window.__themeApply();
      if (btn) {
        var m = getMode();
        btn.setAttribute('data-mode', m);
        btn.querySelector('.theme-label').textContent = {auto:'自动',light:'浅色',dark:'深色'}[m] || '自动';
        btn.querySelector('.theme-label').textContent = {auto:'自动',light:'浅色',dark:'深色'}[m] || '自动';
        btn.setAttribute('aria-label', '深浅色：' + labels[m] + '（点击切换）');
        btn.setAttribute('title', labels[m]);
      }
    }

    if (btn) {
      btn.addEventListener('click', function () {
        var m = getMode();
        var next = order[(order.indexOf(m) + 1) % order.length];
        setMode(next);
        refresh();
      });
    }

    window.addEventListener('storage', refresh);
    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('storage', refresh);
    document.addEventListener('visibilitychange', refresh);
    refresh();

    // 自动模式：每分钟重新看一次日出日落
    setInterval(function () {
      if (getMode() === 'auto') refresh();
    }, 60000);
  });
})();
