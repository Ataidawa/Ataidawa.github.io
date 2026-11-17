// Owner-facing files are authoritative; source/ is the generated Hexo input.
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const {publishMarkdown}=require('../tools/article-assets.cjs');
const owner = path.join(hexo.base_dir, '网站管理');
let syncedAssets;
function copyFile(from, to) {
  const source=path.join(owner,from),target=path.join(hexo.source_dir,to);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  const data=fs.readFileSync(source);
  if(!fs.existsSync(target)||!data.equals(fs.readFileSync(target)))fs.writeFileSync(target,data);
  if(syncedAssets&&to.replace(/\\/g,'/').startsWith('managed-assets/'))syncedAssets.add(to.replace(/\\/g,'/'));
}
function sync() {
  syncedAssets=new Set();
  const names=new Set();
  function entries(folder){const result=[];function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory()&&!item.name.endsWith('.assets'))walk(file);else if(item.isFile()&&item.name.endsWith('.md'))result.push(file);}}walk(path.join(owner,folder));return result;}
  for(const folder of ['文章','作品'])for(const original of entries(folder)){
    const name=path.basename(original);
    let markdown=fs.readFileSync(original,'utf8');
    if(!/^short_id:/m.test(markdown.split(/\r?\n---/)[0])){
      const id=require('crypto').createHash('sha256').update(name).digest('hex').slice(0,8);
      markdown=markdown.replace(/^---\r?\n/,'---\nshort_id: '+JSON.stringify(id)+'\n');
      fs.writeFileSync(original,markdown);
    }
    if(names.has(name))throw new Error('文章与作品文件名重复：'+name);
    names.add(name);
    const directory=path.dirname(original),id=yaml.load(markdown.split(/\r?\n---/)[0].replace(/^---\r?\n/,''),{schema:yaml.JSON_SCHEMA}).short_id;
    if(!/^[a-f0-9]{8}$/.test(String(id)))throw Error('Invalid short_id: '+name);
    const prefix='/managed-assets/articles/'+id+'/';
    const rendered=publishMarkdown(markdown,directory,prefix);
    const target=path.join(hexo.source_dir,'_posts',name);
    fs.mkdirSync(path.dirname(target),{recursive:true});
    if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==rendered)fs.writeFileSync(target,rendered);
    function postAssets(dir,rel=''){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.name.startsWith('.')||/^desktop\.ini$/i.test(entry.name))continue;const item=path.join(dir,entry.name),asset=path.join(rel,entry.name);if(entry.isDirectory())postAssets(item,asset);else if(!entry.name.endsWith('.md'))copyFile(path.relative(owner,item),path.join('managed-assets/articles',String(id),asset));}}
    if(directory!==path.join(owner,folder))postAssets(directory);
  }
  const manifest=path.join(hexo.base_dir,'.runtime','owner-posts.json');
  const previous=fs.existsSync(manifest)?JSON.parse(fs.readFileSync(manifest,'utf8')):[];
  for(const name of previous){
    if(names.has(name)||path.basename(name)!==name||!name.endsWith('.md'))continue;
    const target=path.resolve(hexo.source_dir,'_posts',name);
    if(path.dirname(target)===path.resolve(hexo.source_dir,'_posts')&&fs.existsSync(target))fs.unlinkSync(target);
  }
  fs.mkdirSync(path.dirname(manifest),{recursive:true});fs.writeFileSync(manifest,JSON.stringify([...names]));
  const bookmarkFile=path.join(hexo.base_dir,'网站管理/收藏/网站.yml');
  const bookmarkItems=yaml.load(fs.readFileSync(bookmarkFile,'utf8'))||[];
  let categoriesChanged=false;
  for(const bookmark of bookmarkItems){if(!bookmark.category||bookmark.category==='自动'){bookmark.category=require('../tools/bookmark-category.cjs')(bookmark);categoriesChanged=true;}}
  if(categoriesChanged)fs.writeFileSync(bookmarkFile,yaml.dump(bookmarkItems,{lineWidth:120,noRefs:true}));
  for(const [from,to] of [['收藏/网站.yml','marked.yml'],['相册/相册.yml','albums.yml'],['友链/友链.yml','friends.yml'],['设置/播放器.yml','music.yml'],['设置/页脚.yml','footer.yml'],['作品/分类.yml','portfolio.yml']])copyFile(from,'_data/'+to);
  copyFile('设置/配色与外观.css','css/design-system.css');
  function assets(dir,relative='') { for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const rel=path.join(relative,entry.name);if(entry.name==='NotoSansSC-Variable.ttf')continue;if(entry.isDirectory())assets(path.join(dir,entry.name),rel);else copyFile(path.join('素材',rel),path.join('managed-assets',rel));} }
  assets(path.join(owner,'素材'));
  // Keep the source font for maintenance without publishing the full TTF.
  const legacyFont=path.join(hexo.source_dir,'managed-assets/fonts/noto-sans-sc/NotoSansSC-Variable.ttf');
  if(fs.existsSync(legacyFont))fs.unlinkSync(legacyFont);
  const assetManifest=path.join(hexo.base_dir,'.runtime','owner-assets.json');
  const oldAssets=fs.existsSync(assetManifest)?JSON.parse(fs.readFileSync(assetManifest,'utf8')):[];
  for(const rel of oldAssets){if(syncedAssets.has(rel)||!rel.startsWith('managed-assets/'))continue;const target=path.resolve(hexo.source_dir,rel);if(target.startsWith(path.resolve(hexo.source_dir,'managed-assets')+path.sep)&&fs.existsSync(target)&&fs.statSync(target).isFile())fs.unlinkSync(target);}
  fs.writeFileSync(assetManifest,JSON.stringify([...syncedAssets]));
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
