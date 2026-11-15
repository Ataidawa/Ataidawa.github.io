function initExperience(){
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('has-entered'); observer.unobserve(entry.target); } });
    }, {threshold:0.05});
    document.querySelectorAll('.work-grid-item,.work-entry,.blog-row,.hero,.album-heading,.album-photo,.friend-card,.friends-empty').forEach(function (el) { el.classList.add('will-enter'); observer.observe(el); });
  }
  document.querySelectorAll('.image-viewer').forEach(function(d){d.remove();});
  var dialog = document.createElement('dialog');
  dialog.className = 'image-viewer';
  dialog.setAttribute('aria-label','图片大图预览');
  dialog.innerHTML = '<img alt=""><p></p>';
  document.body.appendChild(dialog);
  var viewerImage=dialog.querySelector('img'),zoom=1,panX=0,panY=0,drag=null,moved=false;
  function transform(){viewerImage.style.transform='translate('+panX+'px,'+panY+'px) scale('+zoom+')';}
  var closing=false;
  function closeViewer(){if(closing)return;closing=true;if(reduced||!viewerImage.animate){dialog.close();closing=false;return;}var a=viewerImage.animate([{opacity:1,scale:'1'},{opacity:0,scale:'.94'}],{duration:150,easing:'ease-in'});a.onfinish=function(){dialog.close();closing=false;};}
  dialog.addEventListener('cancel',function(e){e.preventDefault();closeViewer();});
  function insideImage(x,y){var r=viewerImage.getBoundingClientRect();var nw=viewerImage.naturalWidth,nh=viewerImage.naturalHeight;if(!nw||!nh)return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom;var ratio=Math.min(r.width/nw,r.height/nh);var width=nw*ratio,height=nh*ratio;return x>=r.left+(r.width-width)/2&&x<=r.right-(r.width-width)/2&&y>=r.top+(r.height-height)/2&&y<=r.bottom-(r.height-height)/2;}
  dialog.addEventListener('click',function(e){if(!moved&&!insideImage(e.clientX,e.clientY))closeViewer();moved=false;});
  dialog.addEventListener('wheel',function(e){e.preventDefault();zoom=Math.max(.5,Math.min(6,zoom*Math.exp(-e.deltaY*.0015)));transform();},{passive:false});
  viewerImage.addEventListener('pointerdown',function(e){if(e.button!==0||!insideImage(e.clientX,e.clientY))return;e.preventDefault();drag={x:e.clientX,y:e.clientY,px:panX,py:panY};moved=false;viewerImage.setPointerCapture(e.pointerId);});
  viewerImage.addEventListener('pointermove',function(e){if(!drag)return;panX=drag.px+e.clientX-drag.x;panY=drag.py+e.clientY-drag.y;if(Math.abs(e.clientX-drag.x)+Math.abs(e.clientY-drag.y)>4)moved=true;transform();});
  viewerImage.addEventListener('pointerup',function(){drag=null;});
  viewerImage.addEventListener('pointercancel',function(){drag=null;});
  dialog.addEventListener('close',function(){document.body.classList.remove('viewer-open');});
  document.querySelectorAll('.post-split-media img,.post-content img,.hero-portrait img,.album-image img').forEach(function (img) {
    // Leave images that are already navigation links alone.
    if (img.closest('a')) return;
    var button = document.createElement('button');
    button.type = 'button'; button.className = 'image-zoom';
    button.setAttribute('aria-label','查看大图：' + (img.alt || '图片'));
    img.parentNode.insertBefore(button,img); button.appendChild(img);
    button.addEventListener('click',function () {
      zoom=1;panX=panY=0;transform();
      dialog.querySelector('img').src = img.dataset.full || img.currentSrc || img.src;
      dialog.querySelector('img').alt = img.alt;
      dialog.querySelector('p').textContent = img.alt;
      document.body.classList.add('viewer-open'); dialog.showModal();if(!reduced&&viewerImage.animate)viewerImage.animate([{opacity:0,scale:'.94'},{opacity:1,scale:'1'}],{duration:180,easing:'ease-out'});
    });
  });
  document.querySelectorAll('.demo-tabs').forEach(function (group) {
    var buttons = [...group.querySelectorAll('[role="tab"]')];
    function select(button) {
      buttons.forEach(function (b) { var active=b===button; b.setAttribute('aria-selected',String(active)); b.tabIndex=active?0:-1; var panel=document.getElementById(b.getAttribute('aria-controls'));panel.hidden=!active;if(active&&!reduced&&panel.animate)panel.animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:160,easing:'ease-out'}); });
    }
    buttons.forEach(function (b,i) {
      b.addEventListener('click',function () { select(b); });
      b.addEventListener('keydown',function (e) {
        if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
        e.preventDefault(); var n=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;
        select(buttons[n]); buttons[n].focus();
      });
    });
  });
}
document.addEventListener("DOMContentLoaded",initExperience);
document.addEventListener("jopolis:navigate",initExperience);
