// Run after a clean Hexo build. Catch asset and migration regressions.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');
let checked=0;
function inspect(dir){
  for(const item of fs.readdirSync(dir,{withFileTypes:true})){
    const file=path.join(dir,item.name);
    if(item.isDirectory()){inspect(file);continue;}
    if(!file.endsWith('.html'))continue;
    const document=new JSDOM(fs.readFileSync(file,'utf8')).window.document;
    for(const el of document.querySelectorAll('img[src],audio[src],source[src],iframe[src]')){
      const src=el.getAttribute('src');
      if(!src.startsWith('/')||src.startsWith('//'))continue;
      const target=path.join('public',decodeURIComponent(src.split('?')[0]));
      assert(fs.existsSync(target),`${file}: missing ${src}`);checked++;
    }
    for(const tab of document.querySelectorAll('[role=tab]')){
      assert(document.getElementById(tab.getAttribute('aria-controls')),`${file}: tab without panel`);
    }
  }
}
inspect('public');
for(const id of [16985,40770,10986,3334,8968,996,35675]){
  const html=fs.readFileSync(`public/posts/${id}.html`,'utf8');
  assert(html.includes('class="post-content"')||html.includes('class="post-body"')||html.includes('id="post"'));
}
for(const route of ['links','masonry','essays'])assert(fs.existsSync(`public/${route}/index.html`));
assert(!fs.existsSync('public/managed-assets/fonts/noto-sans-sc/NotoSansSC-Variable.ttf'));
console.log(`Passed: ${checked} local media references, imported tabs, historical URLs and WOFF2 publishing.`);
