const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const dom=new JSDOM('<main class="main"><a class="work-grid-item" href="/work/">Work</a><a class="friend-card" href="https://example.com/">Friend</a><a class="marked-card" href="https://example.org/">Saved</a><a class="section-more" href="/marked/">More</a><div class="hero-portrait"><button class="image-zoom"><img alt="avatar"></button></div></main>',{runScripts:'outside-only'});
const w=dom.window,d=w.document;let reduced=false,queue=[];
w.matchMedia=q=>({matches:q.includes('reduced-motion')?reduced:true,addEventListener(){}});
w.requestAnimationFrame=fn=>{queue.push(fn);return queue.length;};w.cancelAnimationFrame=()=>{queue=[];};
const flush=()=>{for(let i=0;i<40&&queue.length;i++){const batch=queue;queue=[];batch.forEach(fn=>fn());}};
w.eval(fs.readFileSync('source/js/site-motion.js','utf8'));d.dispatchEvent(new w.Event('DOMContentLoaded'));
assert.equal(d.querySelectorAll('.motion-card').length,3);
assert(d.querySelector('.section-more').classList.contains('motion-link'));
for(const card of d.querySelectorAll('.motion-card')){
 card.getBoundingClientRect=()=>({left:100,top:100,width:200,height:100});
 card.dispatchEvent(new w.MouseEvent('pointermove',{bubbles:true,clientX:290,clientY:110}));flush();
 assert(parseFloat(card.style.getPropertyValue('--motion-rx'))>0);
 assert(parseFloat(card.style.getPropertyValue('--motion-ry'))>0);
 card.dispatchEvent(new w.MouseEvent('pointermove',{bubbles:true,clientX:110,clientY:190}));flush();
 assert(parseFloat(card.style.getPropertyValue('--motion-rx'))<0);
 assert(parseFloat(card.style.getPropertyValue('--motion-ry'))<0);
}
d.dispatchEvent(new w.Event('jopolis:navigate'));assert.equal(d.querySelectorAll('.motion-card').length,3);
assert(!d.querySelector('.is-pointer-active'));
reduced=true;const card=d.querySelector('.motion-card');card.dispatchEvent(new w.MouseEvent('pointermove',{bubbles:true,clientX:290,clientY:110}));assert(!card.style.getPropertyValue('--motion-rx'));reduced=false;
const style=d.createElement('style');style.textContent=fs.readFileSync('source/css/site-motion.css','utf8');d.head.appendChild(style);
const imageButton=d.querySelector('.image-zoom');imageButton.getBoundingClientRect=()=>({left:1400,top:300,width:200,height:200});
Object.defineProperty(imageButton,'offsetWidth',{value:100});Object.defineProperty(imageButton,'offsetHeight',{value:100});
w.eval(fs.readFileSync('source/js/button-feedback.js','utf8'));
imageButton.querySelector('img').dispatchEvent(new w.MouseEvent('pointerdown',{bubbles:true,clientX:1450,clientY:350}));
const ripple=imageButton.querySelector('.button-ripple');assert(ripple);assert.equal(ripple.style.left,'25px');assert.equal(ripple.style.top,'25px');assert.equal(w.getComputedStyle(imageButton).position,'relative');assert.equal(w.getComputedStyle(imageButton).overflow,'hidden');
for(const route of ['','work/','notes/','albums/','friends/','marked/','posts/design-guide/']){const html=fs.readFileSync('public/'+route+'index.html','utf8');assert(html.includes('/css/site-motion.css'));assert(html.includes('/js/site-motion.js'));}
const bookmarks=new JSDOM(fs.readFileSync('public/marked/index.html','utf8')).window.document;
assert(![...bookmarks.querySelectorAll('.marked-card')].some(a=>a.href.includes('fsoufsou.com')));
const icons=bookmarks.querySelectorAll('.marked-initial img');assert(icons.length>300);icons.forEach(img=>{assert(img.getAttribute('src').startsWith('/managed-assets/bookmarks/icons/'));assert(fs.existsSync('public'+img.getAttribute('src')));assert(!img.hasAttribute('data-full'));});
dom.window.close();console.log('Passed: shared tilt directions, reset on navigation, reduced motion, avatar ripple coordinates/clipping, all-page assets and local favicon fallbacks.');
