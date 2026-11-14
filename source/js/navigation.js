(function () {
  var button = document.getElementById('menu-btn');
  var nav = document.getElementById('site-navigation');
  var backdrop = document.createElement('button');
  backdrop.className = 'nav-backdrop';
  backdrop.type = 'button';
  backdrop.setAttribute('aria-label', '关闭导航');
  backdrop.tabIndex = -1;
  document.body.appendChild(backdrop);
  backdrop.addEventListener('click', close);
  function close() {
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', '展开导航');
  }
  button.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    document.body.classList.toggle('nav-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? '收起导航' : '展开导航');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { close(); button.focus(); }
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.header')) close(); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
  matchMedia('(min-width: 689px)').addEventListener('change', close);
  // External destinations preserve the portfolio; internal navigation stays in this tab.
  document.querySelectorAll('a[href]').forEach(function (link) {
    var url = new URL(link.href, location.href);
    if (/^https?:$/.test(url.protocol) && (url.origin !== location.origin || /\/posts\//.test(url.pathname))) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
})();
