const sharp=require('sharp');
const fs=require('fs'),path=require('path'),crypto=require('crypto');
hexo.extend.filter.register('after_generate',async function(){
  const cache=new Map(),cacheDir=path.join(hexo.base_dir,'.runtime/image-cache');
  fs.mkdirSync(cacheDir,{recursive:true});
  async function bytes(route){const stream=hexo.route.get(route);if(!stream)return null;const parts=[];for await(const part of stream)parts.push(Buffer.from(part));return Buffer.concat(parts);}
  async function optimize(url){
    const route=decodeURIComponent(url.split(/[?#]/)[0]).replace(/^\//,'');
    if(cache.has(route))return cache.get(route);
    const job=(async()=>{
      const input=await bytes(route);if(!input)return null;
      const metadata=await sharp(input).metadata();if(metadata.pages>1)return null;
      const hash=crypto.createHash('sha256').update(input).update('webp-v1-88-92').digest('hex').slice(0,20);
      const max=Math.max(metadata.width||0,metadata.height||0),variants=[];
      for(const width of [...new Set([Math.min(640,max),Math.min(1280,max),Math.min(2560,max)])]){
        const name=hash+'-'+width+'.webp',disk=path.join(cacheDir,name);
        if(!fs.existsSync(disk))await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:width>=2560?92:88,effort:5}).toFile(disk);
        const output=fs.readFileSync(disk),info=await sharp(output).metadata();
        hexo.route.set('optimized-images/'+name,output);
        variants.push({url:'/optimized-images/'+name,width:info.width,bytes:output.length});
      }
      return {variants,original:input.length};
    })();cache.set(route,job);return job;
  }
  let saved=0;
  for(const route of hexo.route.list().filter(p=>p.endsWith('.html'))){
    let html=(await bytes(route)).toString('utf8');
    const tags=[...new Set(html.match(/<img\b[^>]*>/gi)||[])];
    for(const tag of tags){
      const match=tag.match(/\bsrc="(\/[^"?#]+\.(?:jpe?g|png|webp))(?:[?#][^"]*)?"/i);
      if(!match||tag.includes('srcset='))continue;
      const image=await optimize(match[1]);if(!image)continue;
      const small=image.variants[0],large=image.variants[image.variants.length-1];
      const sizes=route==='albums/index.html'||route==='index.html'?'(max-width: 688px) 100vw, 300px':'(max-width: 688px) 100vw, (max-width: 1200px) 50vw, 780px';
      const changed=tag.replace(/\bsrc="[^"]*"/,'src="'+small.url+'"').replace(/\s*\/?\>$/,' srcset="'+image.variants.map(v=>v.url+' '+v.width+'w').join(', ')+'" sizes="'+sizes+'" data-full="'+large.url+'" decoding="async">');
      html=html.split(tag).join(changed);saved++;
    }
    hexo.route.set(route,html);
  }
  hexo.log.info('Optimized responsive images: '+saved+' references; originals retained.');
});
