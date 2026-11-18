(function(){
 var observer;
 function init(){
  if(observer)observer.disconnect();
  var cover=document.querySelector('.portfolio-cover');
  function show(visible){
   document.body.classList.toggle('cover-nav-visible',visible);
   var header=document.querySelector('.header');if(header)header.inert=!!cover&&!visible;
   ['site-navigation','menu-btn','theme-toggle'].forEach(function(id){var el=document.getElementById(id);if(el)el.inert=!!cover&&!visible;});
   if(cover&&!visible){document.body.classList.remove('nav-open');var nav=document.getElementById('site-navigation');if(nav)nav.classList.remove('is-open');var button=document.getElementById('menu-btn');if(button)button.setAttribute('aria-expanded','false');}
  }
  if(!cover){show(true);return;}
  show(cover.getBoundingClientRect().bottom<=0);
  if('IntersectionObserver' in window){observer=new IntersectionObserver(function(entries){show(!entries[0].isIntersecting);},{threshold:0});observer.observe(cover);}
 }
 document.addEventListener('click',function(e){if(e.target.closest('.cover-theme-toggle')){var button=document.getElementById('theme-toggle');if(button)button.click();}});
 document.addEventListener('DOMContentLoaded',init);document.addEventListener('jopolis:navigate',init);
})();
