const fs=require('fs'),assert=require('assert'),{JSDOM}=require('jsdom');
(async()=>{
 const dom=new JSDOM(fs.readFileSync('public/index.html','utf8'),{url:'https://example.com/',runScripts:'outside-only'}),w=dom.window;
 const dock=w.document.querySelector('.music-dock');
 w.scrollTo=()=>{};w.fetch=async()=>({ok:true,text:async()=>fs.readFileSync('public/work/index.html','utf8')});
 w.eval(fs.readFileSync('source/js/page-navigation.js','utf8'));
 const link=[...w.document.querySelectorAll('.hero-link')].find(a=>a.pathname==='/work/');link.click();
 await new Promise(r=>setTimeout(r,20));
 assert.equal(w.location.pathname,'/work/');assert.strictEqual(w.document.querySelector('.music-dock'),dock);assert(w.document.querySelector('[data-filter]'));
 console.log('Passed: same-tab section navigation preserves the player DOM.');w.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
