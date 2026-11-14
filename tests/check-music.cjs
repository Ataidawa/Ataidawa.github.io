const fs=require('fs'),assert=require('assert'),{JSDOM}=require('jsdom');
(async()=>{
const dom=new JSDOM(fs.readFileSync('public/posts/theme-demo/index.html','utf8'),{runScripts:'outside-only',pretendToBeVisual:true,url:'https://example.com/'}),w=dom.window;
const audios=[];
w.Audio=function(){const a=new w.EventTarget();a.paused=true;a.volume=.75;a.pause=function(){a.paused=true;a.dispatchEvent(new w.Event('pause'));if(a.onpause)a.onpause();};a.play=function(){a.paused=false;a.dispatchEvent(new w.Event('play'));if(a.onplay)a.onplay();return Promise.resolve();};audios.push(a);return a;};
w.fetch=async()=>({ok:true,json:async()=>[{name:'测试歌曲',artist:'测试作者',url:'https://example.com/audio.mp3'}]});
w.AbortSignal.timeout=()=>undefined;
w.eval(fs.readFileSync('source/js/music.js','utf8'));await new Promise(r=>setTimeout(r,10));
await new Promise(r=>setTimeout(r,10));
assert.equal(audios.length,2);assert.equal(w.document.querySelectorAll('.inline-cover').length,1);assert.equal(w.document.querySelector('.music-inline[data-title] strong').textContent,'测试歌曲');
const play=w.document.querySelector('.music-cover');play.click();assert.equal(audios[0].paused,false);
audios[0].pause();await new Promise(r=>setTimeout(r,500));const card=w.document.querySelector('.music-call');const ripple=w.document.createElement('span');ripple.className='button-ripple';card.appendChild(ripple);card.click();await new Promise(r=>setTimeout(r,20));assert.equal(audios[0].paused,false);assert.equal(card.querySelector('.music-card-state').textContent,'Ⅱ');assert.equal(ripple.textContent,'');card.click();await new Promise(r=>setTimeout(r,500));assert.equal(card.querySelector('.music-card-state').textContent,'▶');
// Refresh a changed playlist without resetting the current audio or progress.
play.click();audios[0].currentTime=25;const beforeSrc=audios[0].src;
w.fetch=async()=>({ok:true,json:async()=>[{name:'测试歌曲',artist:'测试作者',url:'https://example.com/new-audio.mp3'},{name:'新增歌曲',artist:'作者',url:'https://example.com/second.mp3'}]});
w.document.querySelector('[data-action=refresh]').click();await new Promise(r=>setTimeout(r,20));assert.equal(w.document.querySelectorAll('.music-list button').length,2);assert.equal(audios[0].currentTime,25);assert.equal(audios[0].src,beforeSrc);assert.equal(audios[0].paused,false);
const toggle=w.document.querySelector('[data-list]');toggle.click();assert.equal(toggle.getAttribute('aria-expanded'),'true');toggle.click();assert.equal(toggle.getAttribute('aria-expanded'),'false');
assert.equal(w.document.querySelector('.music-dock a'),null);
const dock=w.document.querySelector('.music-dock');dock.querySelector('[data-action=hide]').click();assert(dock.hidden);
w.document.querySelector('.music-launcher').click();assert(!dock.hidden);
console.log('Passed: playlist rendering, global/inline playback exclusion, hide and restore.');w.close();
})().catch(e=>{console.error(e);process.exitCode=1;});


