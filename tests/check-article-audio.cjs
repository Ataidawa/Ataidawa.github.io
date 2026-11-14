const fs=require('node:fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
(async()=>{
 const dom=new JSDOM(fs.readFileSync('public/posts/8968.html','utf8'),{runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
 const audios=[...w.document.querySelectorAll('.post-content audio')];assert.equal(audios.length,2);
 audios.forEach(a=>{let paused=true;Object.defineProperty(a,'paused',{get:()=>paused});Object.defineProperty(a,'duration',{value:2});a.play=()=>{paused=false;a.dispatchEvent(new w.Event('play'));return Promise.resolve();};a.pause=()=>{paused=true;a.dispatchEvent(new w.Event('pause'));};});
 w.eval(fs.readFileSync('source/js/article-audio.js','utf8'));await new Promise(r=>setTimeout(r,20));
 const cards=[...w.document.querySelectorAll('.article-audio')];assert.equal(cards.length,2);assert.equal(audios[0].controls,false);
 cards[0].querySelector('.clip-play').click();assert.equal(audios[0].paused,false);
 const seek=cards[0].querySelector('input');seek.value=50;seek.dispatchEvent(new w.Event('input'));assert.equal(audios[0].currentTime,1);assert.equal(cards[0].querySelector('.clip-time').textContent,'0:01 / 0:02');
 assert.equal(cards[0].querySelector('.clip-mute'),null);
 cards[1].querySelector('.clip-play').click();assert.equal(audios[0].paused,true);assert.equal(audios[1].paused,false);
 w.document.dispatchEvent(new w.Event('jopolis:navigate'));assert.equal(w.document.querySelectorAll('.article-audio').length,2);
 dom.window.close();console.log('Passed: article audio play/pause, seeking, playback exclusion and repeated initialization.');
})().catch(e=>{console.error(e);process.exitCode=1;});
