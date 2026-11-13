(function () {
  // 主题脚本在 <head> 里加载，此时 body 还没解析，等 DOM 就绪再取节点
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    // ---------- 北京时间 ----------
    var clock = document.getElementById('footer-clock');

    var clockFormat = new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
    function tick() { if (clock) clock.textContent = clockFormat.format(new Date()); }
    tick();
    setInterval(tick, 1000);

    // ---------- 轻提示 ----------
    var toastEl = null;
    var toastTimer = null;

    function toast(msg) {
      if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.className = 'site-toast';
        document.body.appendChild(toastEl);
      }
      toastEl.textContent = msg;
      toastEl.classList.add('is-on');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toastEl.classList.remove('is-on');
      }, 1800);
    }

    // ---------- 复制 ----------
    function copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }
      return new Promise(function (resolve, reject) {
        try {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.position = 'fixed';
          ta.style.top = '-1000px';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }

    // ---------- 联系图标 ----------
    var icons = document.querySelectorAll('.footer-ic');
    Array.prototype.forEach.call(icons, function (a) {
      a.addEventListener('click', function (e) {
        var key = a.getAttribute('data-key');
        var name = a.getAttribute('data-name') || '联系方式';
        var val = (a.getAttribute('data-copy') || '').trim();

        // 邮箱 / 电话：直接走 mailto、tel，没有值就提示
        if (key === 'email' || key === 'phone') {
          if (!val) {
            e.preventDefault();
            toast('还没填' + name);
          }
          return;
        }

        // QQ / 微信：只复制，不展示号码
        e.preventDefault();
        if (!val) {
          toast('还没填' + name);
          return;
        }
        copyText(val).then(function () {
          toast(name + ' 已复制');
        }, function () {
          toast('复制失败，换个方式联系吧');
        });
      });
    });
  });
})();
