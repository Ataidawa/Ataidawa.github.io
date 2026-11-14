const fs=require('node:fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
(async()=>{
  const snapshot=JSON.parse(fs.readFileSync('网站管理/素材/music/playlist.json','utf8'));
  const dom=new JSDOM(fs.readFileSync('public/index.html','utf8'),{runScripts:'outside-only',pretendToBeVisual:true,url:'https://example.com/'}),w=dom.window;
  // Simulate an older mobile browser and an unreachable Vercel endpoint.
  w.AbortSignal.timeout=undefined;
  const requests=[];
  w.fetch=async url=>{requests.push(String(url));if(String(url).includes('/managed-assets/music/playlist.json'))return {ok:true,json:async()=>snapshot};throw new Error('Network unavailable');};
  w.Audio=function(){this.paused=true;this.volume=.75;this.pause=()=>{this.paused=true;};this.play=()=>{this.paused=false;return Promise.resolve();};};
  w.eval(fs.readFileSync('source/js/music.js','utf8'));
  await new Promise(resolve=>setTimeout(resolve,80));
  const dock=w.document.querySelector('.music-dock');
  assert.equal(dock.hidden,false,'The player should appear using same-site metadata');
  assert.equal(dock.querySelectorAll('.music-list button').length,snapshot.tracks.length);
  assert.equal(dock.querySelector('strong').textContent,snapshot.tracks[0].name);
  assert(requests.some(url=>url.includes('/api/playlist')),'Fresh metadata should still be requested in the background');
  dock.querySelector('[data-action=hide]').click();
  assert.equal(w.document.querySelector('.music-launcher').hidden,false);
  w.document.querySelector('.music-launcher').click();assert.equal(dock.hidden,false);
  dom.window.close();
  console.log('Passed: mobile without AbortSignal.timeout and with unreachable Vercel still displays and restores the player.');
})().catch(error=>{console.error(error);process.exitCode=1;});
