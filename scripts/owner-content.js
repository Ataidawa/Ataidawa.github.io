// Owner-facing files are authoritative; source/ is the generated Hexo input.
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const owner = path.join(hexo.base_dir, '网站管理');
function copyFile(from, to) {
  const source=path.join(owner,from),target=path.join(hexo.source_dir,to);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  const data=fs.readFileSync(source);
  if(!fs.existsSync(target)||!data.equals(fs.readFileSync(target)))fs.writeFileSync(target,data);
}
function sync() {
  const names=new Set();
  for(const folder of ['文章','作品'])for(const name of fs.readdirSync(path.join(owner,folder))){
    if(!name.endsWith('.md'))continue;
    const original=path.join(owner,folder,name);
    let markdown=fs.readFileSync(original,'utf8');
    if(!/^short_id:/m.test(markdown.split(/\r?\n---/)[0])){
      const id=require('crypto').createHash('sha256').update(name).digest('hex').slice(0,8);
      markdown=markdown.replace(/^---\r?\n/,'---\nshort_id: '+JSON.stringify(id)+'\n');
      fs.writeFileSync(original,markdown);
    }
    if(names.has(name))throw new Error('文章与作品文件名重复：'+name);
    names.add(name);copyFile(folder+'/'+name,'_posts/'+name);
  }
  const manifest=path.join(hexo.base_dir,'.runtime','owner-posts.json');
  const previous=fs.existsSync(manifest)?JSON.parse(fs.readFileSync(manifest,'utf8')):[];
  for(const name of previous){
    if(names.has(name)||path.basename(name)!==name||!name.endsWith('.md'))continue;
    const target=path.resolve(hexo.source_dir,'_posts',name);
    if(path.dirname(target)===path.resolve(hexo.source_dir,'_posts')&&fs.existsSync(target))fs.unlinkSync(target);
  }
  fs.mkdirSync(path.dirname(manifest),{recursive:true});fs.writeFileSync(manifest,JSON.stringify([...names]));
  for(const [from,to] of [['相册/相册.yml','albums.yml'],['友链/友链.yml','friends.yml'],['设置/播放器.yml','music.yml'],['设置/页脚.yml','footer.yml'],['作品/分类.yml','portfolio.yml']])copyFile(from,'_data/'+to);
  copyFile('设置/配色与外观.css','css/design-system.css');
  function assets(dir,relative='') { for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const rel=path.join(relative,entry.name);if(entry.name==='NotoSansSC-Variable.ttf')continue;if(entry.isDirectory())assets(path.join(dir,entry.name),rel);else copyFile(path.join('素材',rel),path.join('managed-assets',rel));} }
  assets(path.join(owner,'素材'));
  // Keep the source font for maintenance without publishing the full TTF.
  const legacyFont=path.join(hexo.source_dir,'managed-assets/fonts/noto-sans-sc/NotoSansSC-Variable.ttf');
  if(fs.existsSync(legacyFont))fs.unlinkSync(legacyFont);
}
sync();
hexo.extend.filter.register('before_generate',async function(){
  sync();
  const settings=yaml.load(fs.readFileSync(path.join(owner,'设置/首页.yml'),'utf8'));
  const {site,...themeSettings}=settings;
  Object.assign(hexo.theme.config,themeSettings);
  if(site)Object.assign(hexo.config,site);
  await hexo.source.process();
});
