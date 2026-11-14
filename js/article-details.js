function initArticle(){
  var copyIcon='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/></svg>';
  function bubble(el,text){var r=el.getBoundingClientRect(),tip=document.createElement('span');tip.className='copy-bubble';tip.textContent=text;tip.style.left=Math.min(innerWidth-65,Math.max(65,r.left+r.width/2))+'px';tip.style.top=Math.max(30,r.top)+'px';document.body.appendChild(tip);setTimeout(function(){tip.remove();},1400);}
  var checkIcon='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg>';
  function swap(el,icon){el.classList.add('icon-shrink');setTimeout(function(){el.innerHTML=icon;el.classList.remove('icon-shrink');},130);}
  async function copy(text,el,isButton){try{await navigator.clipboard.writeText(text);if(isButton){clearTimeout(el.copyTimer);swap(el,checkIcon);}bubble(el,'已复制');}catch(e){bubble(el,'复制失败');}if(isButton)el.copyTimer=setTimeout(function(){swap(el,copyIcon);},1400);}
  document.querySelectorAll('.post-content figure.highlight,.post-content pre:not(figure pre)').forEach(function(block){
    if(block.closest('.code-shell')||(block.closest('figure')&&block.tagName!=='FIGURE'))return;
    var button=document.createElement('button');button.type='button';button.className='copy-code';button.innerHTML=copyIcon;button.setAttribute('aria-label','复制代码');
    var text=(block.querySelector('.code pre')||block.querySelector('code')||block).textContent;
    button.onclick=function(){copy(text,button,true);};var shell=document.createElement('div');shell.className='code-shell';block.before(shell);shell.append(block,button);
    block.addEventListener('dblclick',function(e){if(e.target!==button)copy(text,button,true);});
  });
  document.querySelectorAll('.post-content p code,.post-content li code').forEach(function(code){
    code.title='双击复制';code.addEventListener('mousedown',function(e){if(e.detail>1)e.preventDefault();});code.addEventListener('dblclick',function(e){e.preventDefault();window.getSelection().removeAllRanges();copy(code.textContent,code,false);});
  });
  document.querySelectorAll('.post-content > table').forEach(function(table){var wrap=document.createElement('div');wrap.className='article-table';table.before(wrap);wrap.appendChild(table);});
  document.querySelectorAll('.post-content a:not(.hero-link):not(.image-zoom)').forEach(function(a){
    a.classList.add('text-link');a.addEventListener('pointerenter',function(e){var r=a.getBoundingClientRect();a.style.setProperty('--underline-origin',((e.clientX-r.left)/r.width*100)+'%');});
  });
}
document.addEventListener("DOMContentLoaded",initArticle);
document.addEventListener("jopolis:navigate",initArticle);
