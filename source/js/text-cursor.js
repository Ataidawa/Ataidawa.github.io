(function () {
  function ready() {
    var media = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    var circle = document.createElement('div');
    circle.className = 'text-cursor';
    circle.setAttribute('aria-hidden', 'true');
    document.body.appendChild(circle);
    function hide() { circle.classList.remove('is-visible'); }
    // Test actual text rectangles, rather than the full width of paragraph blocks.
    function nearText(x, y) {
      var controlSelector='button,a,input,textarea,select,summary,[role="button"]';
      var target=document.elementFromPoint(x,y);
      if(target && target.closest(controlSelector))return false;
      var nodes = new Set();
      [[0,0],[-12,0],[12,0],[0,-10],[0,10]].forEach(function (offset) {
        var element = document.elementFromPoint(x + offset[0], y + offset[1]);
        if (!element || element.closest('svg, img, input, textarea, .nav-backdrop') || element.closest(controlSelector)) return;
        var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        var node;
        while ((node = walker.nextNode())) {
          if (node.textContent.trim() && !node.parentElement.closest(controlSelector)) nodes.add(node);
          if (nodes.size > 150) break;
        }
      });
      var found = false;
      nodes.forEach(function (node) {
        if (found) return;
        var range = document.createRange();
        range.selectNodeContents(node);
        found = Array.from(range.getClientRects()).some(function (r) {
          return r.width > 0 && x >= r.left - 12 && x <= r.right + 12 && y >= r.top - 10 && y <= r.bottom + 10;
        });
      });
      return found;
    }
    var pending = false, x = 0, y = 0;
    document.addEventListener('pointermove', function (e) {
      x = e.clientX; y = e.clientY;
      if (!media.matches || e.pointerType !== 'mouse') { hide(); return; }
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        var modal=document.querySelector('.image-viewer[open]');var parent=modal||document.body;if(circle.parentNode!==parent)parent.appendChild(circle);
        circle.style.left = x + 'px'; circle.style.top = y + 'px';
        circle.classList.toggle('is-visible', nearText(x, y));
      });
    }, {passive:true});
    document.documentElement.addEventListener('pointerleave', hide);
    document.addEventListener('jopolis:viewer-close',function(){hide();document.body.appendChild(circle);});
    window.addEventListener('blur', hide);
    window.addEventListener('scroll', hide, {passive:true});
    media.addEventListener('change', hide);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
