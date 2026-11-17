(function () {
  var cards = '.work-entry,.work-grid-item,.album-photo,.friend-card,.marked-card,.home-album-grid>a,.blog-row';
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var fine = matchMedia('(hover:hover) and (pointer:fine)');
  function init() {
    document.querySelectorAll(cards).forEach(function (card) {
      if (card.dataset.siteMotion) return;
      card.dataset.siteMotion = 'true';
      card.classList.add('motion-card');
    });
    document.querySelectorAll('.main a[href],.footer a[href]').forEach(function (a) {
      if (a.matches(cards + ',.hero-link,.tag-btn,.section-more,.back-link,.post-more,.footer-ic,.image-zoom,.cover-sheet') || a.querySelector('img,svg') || a.closest('.article-outline')) return;
      a.classList.add('motion-link');
    });
  }
  var active = null, frame = 0, rx = 0, ry = 0, tx = 0, ty = 0;
  function step() {
    if (!active || !active.isConnected) { frame = 0; return; }
    rx += (tx - rx) * .2; ry += (ty - ry) * .2;
    active.style.setProperty('--motion-rx', rx.toFixed(3) + 'deg');
    active.style.setProperty('--motion-ry', ry.toFixed(3) + 'deg');
    if (Math.abs(tx-rx) + Math.abs(ty-ry) > .015) frame = requestAnimationFrame(step);
    else frame = 0;
  }
  function reset() {
    cancelAnimationFrame(frame); frame = 0;
    if (active) { active.style.removeProperty('--motion-rx'); active.style.removeProperty('--motion-ry'); active.classList.remove('is-pointer-active'); }
    active = null; rx = ry = tx = ty = 0;
  }
  document.addEventListener('pointermove', function (e) {
    if (reduced.matches || !fine.matches || e.pointerType === 'touch') return;
    var card = e.target.closest(cards);
    if (card !== active) { reset(); active = card; if (active) active.classList.add('is-pointer-active'); }
    if (card) {
      var r = card.getBoundingClientRect();
      tx = -(Math.max(-.5, Math.min(.5, (e.clientY-r.top)/r.height-.5))) * 6;
      ty = (Math.max(-.5, Math.min(.5, (e.clientX-r.left)/r.width-.5))) * 8;
      if (!frame) frame = requestAnimationFrame(step);
    }
    var link = e.target.closest('.motion-link');
    if (link) { var rect = link.getBoundingClientRect(); link.style.setProperty('--underline-origin', ((e.clientX-rect.left)/(rect.width||1)*100) + '%'); }
  }, {passive:true});
  document.addEventListener('pointerout', function(e) { if (!e.relatedTarget) reset(); });
  reduced.addEventListener('change', reset); fine.addEventListener('change', reset);
  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('jopolis:navigate', function(){ reset(); init(); });
})();
