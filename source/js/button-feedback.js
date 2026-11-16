(function(){
  var selector='.hero-link,.tag-btn,.section-more,.back-link,.footer-ic,.music-call,.music-controls button,.theme-toggle,.copy-code,.motion-card,.friend-card,.image-zoom';
  document.addEventListener('pointerdown',function(e){
    var button=e.target.closest(selector);if(!button||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var r=button.getBoundingClientRect(),width=button.offsetWidth||r.width,height=button.offsetHeight||r.height;
    var x=(e.clientX-r.left)*width/(r.width||1),y=(e.clientY-r.top)*height/(r.height||1);
    button.style.setProperty('--press-x',x+'px');button.style.setProperty('--press-y',y+'px');
    if(button.matches('.music-call'))button.style.setProperty('--fill-radius',Math.hypot(Math.max(x,r.width-x),Math.max(y,r.height-y))+'px');
    var ripple=document.createElement('span');ripple.className='button-ripple';ripple.setAttribute('aria-hidden','true');
    ripple.style.left=x+'px';ripple.style.top=y+'px';ripple.style.width=ripple.style.height=Math.hypot(width,height)*2+'px';
    button.appendChild(ripple);setTimeout(function(){ripple.remove();},550);
  },{passive:true});
})();
