function initOutline(){
  document.querySelectorAll('.article-outline,.outline-toggle').forEach(function(el){el.remove();});
  if(window.outlineCleanup)window.outlineCleanup();
  var article=document.querySelector('#post');if(!article||article.classList.contains('post-split'))return;
  var headings=[...article.querySelectorAll('.post-content h2,.post-content h3')];if(!headings.length)return;
  var panel=document.createElement('aside');panel.className='article-outline';panel.id='article-outline';panel.setAttribute('aria-label','文章目录');
  var label=document.createElement('strong');label.textContent='文章目录';panel.appendChild(label);
  var nav=document.createElement('nav');nav.setAttribute('aria-label','章节跳转');panel.appendChild(nav);
  var used=new Set([...document.querySelectorAll('[id]')].map(function(el){return el.id;}));
  var links=headings.map(function(h,i){if(!h.id){var id='section-'+i;while(used.has(id))id+='-';h.id=id;used.add(id);}var a=document.createElement('a');a.href='#'+encodeURIComponent(h.id);a.textContent=h.textContent;a.className=h.tagName==='H3'?'outline-sub':'';nav.appendChild(a);return a;});
  var button=document.createElement('button');button.type='button';button.className='outline-toggle';button.setAttribute('aria-controls',panel.id);button.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/></svg>';
  document.body.append(panel,button);
  function alignToolbar(){if(!matchMedia('(min-width:689px)').matches){button.style.top='';panel.style.top='';return;}var back=document.querySelector('.back-link');if(!back)return;var y=back.getBoundingClientRect().top+window.scrollY;button.style.top=y+'px';panel.style.top=(y+44+10)+'px';}
  requestAnimationFrame(alignToolbar);window.addEventListener('resize',alignToolbar);
  var open=matchMedia('(min-width:1400px)').matches;
  try{var saved=sessionStorage.getItem('outline-open');if(saved!==null)open=saved==='true';}catch(e){}
  function show(value){open=value;if(open){panel.hidden=false;if(panel.animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches)panel.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:160,easing:'ease-out'});}else panel.hidden=true;button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'隐藏文章目录':'显示文章目录');}
  show(open);button.onclick=function(){show(!open);try{sessionStorage.setItem('outline-open',String(open));}catch(e){}};
  nav.onclick=function(e){var link=e.target.closest('a');if(!link)return;e.preventDefault();var target=document.getElementById(decodeURIComponent(link.hash.slice(1)));if(!target)return;if(matchMedia('(max-width:1399px)').matches)show(false);history.replaceState(null,'',link.hash);requestAnimationFrame(function(){var top=target.getBoundingClientRect().top+window.scrollY-110;window.scrollTo({top:Math.max(0,top),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});};
  function escape(e){if(e.key==='Escape')show(false);}
  document.addEventListener('keydown',escape);
  var pending=false;
  function update(){pending=false;var active=0;headings.forEach(function(h,i){if(h.getBoundingClientRect().top<=150)active=i;});links.forEach(function(a,i){a.classList.toggle('is-current',i===active);if(i===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
  function scroll(){if(!pending){pending=true;requestAnimationFrame(update);}}
  window.addEventListener('scroll',scroll,{passive:true});update();
  window.outlineCleanup=function(){window.removeEventListener('resize',alignToolbar);window.removeEventListener('scroll',scroll);document.removeEventListener('keydown',escape);};
}
document.addEventListener('DOMContentLoaded',initOutline);
document.addEventListener('jopolis:navigate',initOutline);
