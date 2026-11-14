function initMaterialMotion(){
  document.querySelectorAll('.demo-note').forEach(function(note){var title=note.querySelector('strong');if(!title||title.querySelector('svg'))return;var path=note.classList.contains('success')?'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m7 12 3 3 7-7"/>':note.classList.contains('warning')?'<path d="m12 3 10 18H2Z"/><path d="M12 9v5m0 3v1"/>':note.classList.contains('danger')?'<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 3v1"/>':'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>';title.insertAdjacentHTML('afterbegin','<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+path+'</svg>');});
  document.querySelectorAll('.work-entry-strip').forEach(function(strip){if(strip.parentElement.classList.contains('work-strip-shell'))return;var shell=document.createElement('div');shell.className='work-strip-shell';strip.before(shell);shell.appendChild(strip);function update(){shell.classList.toggle('has-more',strip.scrollWidth-strip.clientWidth-strip.scrollLeft>4);}strip.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(strip);update();});
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('details').forEach(function(details){
    var summary=details.querySelector(':scope > summary');if(!summary)return;
    if(summary.dataset.motionReady)return;summary.dataset.motionReady='true';
    var content=document.createElement('div');content.className='fold-content';
    [...details.childNodes].forEach(function(node){if(node!==summary)content.appendChild(node);});details.appendChild(content);
    summary.addEventListener('click',function(e){
      if(reduced||!content.animate)return;e.preventDefault();e.stopPropagation();
      if(details.motion)return;
      var opening=!details.open;
      if(opening)details.open=true;
      var height=content.scrollHeight;
      details.motion=content.animate([{height:(opening?0:height)+'px',opacity:opening?0:1},{height:(opening?height:0)+'px',opacity:opening?1:0}],{duration:180,easing:'cubic-bezier(.2,0,0,1)'});
      details.motion.onfinish=function(){if(!opening)details.open=false;details.motion=null;};
    });
  });
}
document.addEventListener('DOMContentLoaded',initMaterialMotion);
document.addEventListener('jopolis:navigate',initMaterialMotion);
document.addEventListener('pointerdown',function(e){
  var surface=e.target.closest('.music-dock,.article-outline,.site-nav,.outline-toggle');
  if(!surface||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var r=surface.getBoundingClientRect(),light=document.createElement('span');light.className='material-light';light.setAttribute('aria-hidden','true');light.style.left=(e.clientX-r.left)+'px';light.style.top=(e.clientY-r.top)+'px';surface.appendChild(light);setTimeout(function(){light.remove();},450);
},{passive:true});
