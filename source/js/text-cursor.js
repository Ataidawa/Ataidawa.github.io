(function () {
  function ready() {
    var media = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    var circle = document.createElement('div');
    circle.className = 'text-cursor';
    circle.setAttribute('aria-hidden', 'true');
    document.body.appendChild(circle);
    var minimum=12,baseSize=12,diameter=12,sizeFrame=0,previousX=0,previousY=0,previousTime=0,speed=0,lastMove=0;
    function measureMinimum(){var sizes=Array.from(document.querySelectorAll('p,small,span,a,button,h1,h2,h3,td')).filter(function(el){return !el.closest('.text-cursor')&&el.getClientRects().length&&el.textContent.trim();}).map(function(el){return parseFloat(getComputedStyle(el).fontSize);}).filter(function(n){return isFinite(n)&&n>0;});minimum=Math.max(10,sizes.length?Math.min.apply(null,sizes):12);baseSize=Math.max(baseSize,minimum);diameter=Math.max(diameter,minimum);circle.style.setProperty('--cursor-scale',diameter/56);}
    measureMinimum();document.addEventListener('jopolis:navigate',measureMinimum);window.addEventListener('resize',measureMinimum);
    function animateSize(now){var decayed=speed*Math.exp(-Math.max(0,now-lastMove-20)/90),maximum=Math.max(baseSize,Math.min(224,baseSize*1.6+24)),target=baseSize+(maximum-baseSize)*(1-Math.exp(-decayed/1.3));diameter+=(target-diameter)*.19;diameter=Math.max(minimum,diameter);circle.style.setProperty('--cursor-scale',diameter/56);if(Math.abs(diameter-baseSize)>.12||now-lastMove<200)sizeFrame=requestAnimationFrame(animateSize);else{diameter=baseSize;circle.style.setProperty('--cursor-scale',baseSize/56);sizeFrame=0;}}
    function hide() { circle.classList.remove('is-visible');cancelAnimationFrame(sizeFrame);sizeFrame=0;previousTime=0;speed=0;baseSize=minimum;diameter=minimum;circle.style.setProperty('--cursor-scale',minimum/56); }
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
          var matches=r.width > 0 && x >= r.left - 12 && x <= r.right + 12 && y >= r.top - 10 && y <= r.bottom + 10;if(matches){var font=parseFloat(getComputedStyle(node.parentElement).fontSize)||minimum;var visual=r.height>0?r.height*.82:font*.9;baseSize=Math.max(minimum,Math.min(font*1.05,visual));}return matches;
        });
      });
      return found;
    }
    var pending = false, x = 0, y = 0;
    document.addEventListener('pointermove', function (e) {
      var now=performance.now();if(previousTime){var dt=Math.max(8,now-previousTime),distance=Math.hypot(e.clientX-previousX,e.clientY-previousY);speed=speed*.6+Math.min(8,distance/dt)*.4;}previousX=e.clientX;previousY=e.clientY;previousTime=now;lastMove=now;
      x = e.clientX; y = e.clientY;
      if (!media.matches || e.pointerType !== 'mouse') { hide(); return; }
      if(!sizeFrame)sizeFrame=requestAnimationFrame(animateSize);
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        var modal=document.querySelector('.image-viewer[open]');var parent=modal||document.body;if(circle.parentNode!==parent)parent.appendChild(circle);
        circle.style.left = x + 'px'; circle.style.top = y + 'px';
        var onText=nearText(x,y);if(!onText)baseSize=minimum;circle.classList.toggle('is-visible',onText);
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
