const fs=require('fs'),path=require('path'),yaml=require('js-yaml'),classify=require('./bookmark-category.cjs');
async function main(){
 const value=process.argv[2];if(!value)throw Error('用法：npm run bookmark -- https://example.com/');
 const url=new URL(value);if(!/^https?:$/.test(url.protocol)||url.username||url.password)throw Error('请输入不含账号密码的 HTTP(S) 网址');
 const file=path.join(__dirname,'../网站管理/收藏/网站.yml');const bookmarks=yaml.load(fs.readFileSync(file,'utf8'))||[];
 const key=s=>{const u=new URL(s);u.hash='';return u.href.replace(/\/$/,'');};
 if(bookmarks.some(b=>key(b.url)===key(url.href))){console.log('该网址已收藏，无需重复添加。');return;}
 let html='';try{const response=await fetch(url,{signal:AbortSignal.timeout(10000)});if(response.status===404||response.status===410)throw Error('网址已失效（'+response.status+'），未添加');if(response.ok)html=(await response.text()).slice(0,500000);}catch(e){if(/网址已失效/.test(e.message))throw e;console.log('未能读取页面，将根据网址判断；请之后补充名称和说明。');}
 const decode=s=>s.replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').trim();
 const title=decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1]||'');
 let description='';for(const tag of html.match(/<meta\b[^>]*>/gi)||[]){if(/name\s*=\s*["']description["']/i.test(tag))description=decode((tag.match(/content\s*=\s*["']([^"']*)["']/i)||[])[1]||'');}
 const bookmark={name:title||url.hostname,url:url.href,description:description||'说明待补充。'};bookmark.category=classify(bookmark);bookmark.tags=[bookmark.category];
 bookmarks.push(bookmark);fs.writeFileSync(file,yaml.dump(bookmarks,{lineWidth:120,noRefs:true}));console.log('已收藏：'+bookmark.name+' → '+bookmark.category+'。确认内容后再同步发布。');
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
