(function(){
  var controller;
  function supported(url){return url.origin===location.origin&&['/','/work/','/notes/','/albums/','/friends/','/marked/'].includes(url.pathname);}
  async function navigate(url,push){
    if(controller)controller.abort();controller=new AbortController();
    try{
      var response=await fetch(url.href,{signal:controller.signal});if(!response.ok)throw Error();
      var doc=new DOMParser().parseFromString(await response.text(),'text/html');var main=doc.querySelector('.main');if(!main)throw Error();
      document.querySelector('.main').replaceWith(main);document.title=doc.title;
      if(push)history.pushState(null,'',url.href);
      document.querySelectorAll('.menu-item').forEach(function(li){li.classList.toggle('menu-item-active',new URL(li.querySelector('a').href).pathname===url.pathname);});
      document.getElementById('site-navigation').classList.remove('is-open');document.body.classList.remove('nav-open');document.getElementById('menu-btn').setAttribute('aria-expanded','false');
      document.querySelectorAll('.main a[href]').forEach(function(a){if(new URL(a.href).pathname.match(/\/(?:posts|p)\//)){a.target='_blank';a.rel='noopener noreferrer';}});
      document.dispatchEvent(new Event('jopolis:navigate'));window.scrollTo(0,0);
    }catch(e){if(e.name!=='AbortError')location.assign(url.href);}
  }
  document.addEventListener('click',function(e){var a=e.target.closest('a[href]');if(!a||a.target==='_blank'||a.hasAttribute('download')||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;var url=new URL(a.href);if(!supported(url)||url.hash)return;e.preventDefault();navigate(url,true);});
  window.addEventListener('popstate',function(){var url=new URL(location.href);if(supported(url))navigate(url,false);else location.reload();});
})();
