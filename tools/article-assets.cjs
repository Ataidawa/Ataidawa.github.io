const fs=require('fs'),path=require('path');
function transformLinks(markdown,resolve){
  const blocks=[];
  const protect=text=>{blocks.push(text);return 'JOPOLISASSETCODE'+(blocks.length-1)+'TOKEN';};
  let text=markdown.replace(/^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^[ \t]*\1[^\n]*$/gm,protect).replace(/`+[^`\n]+`+/g,protect).replace(/<!--[\s\S]*?-->/g,protect);
  text=text.replace(/(!?\[[^\]\n]*\]\(\s*)(<[^>]+>|[^)\n]+)(\))/g,(_,start,value,end)=>{
    const angled=value.startsWith('<');
    const match=angled?value.match(/^<([^>]+)>(.*)$/):value.match(/^(\S+)([\s\S]*)$/);
    if(!match)return start+value+end;
    const target=resolve(match[1]);
    return start+(angled?'<'+target+'>':target)+match[2]+end;
  });
  text=text.replace(/(\b(?:src|href|poster)\s*=\s*)(["'])(.*?)\2/g,(_,key,quote,value)=>key+quote+resolve(value)+quote);
  text=text.replace(/^(\s*\[[^\]\n]+\]:\s*)(\S+)/gm,(_,key,value)=>key+resolve(value));
  text=text.replace(/^(thumbnail|featured_image|cover):[ \t]*(.+)$/gm,(_,key,value)=>{
    const original=value.trim().replace(/^["']|["']$/g,'');
    return key+': '+JSON.stringify(resolve(original));
  });
  return text.replace(/JOPOLISASSETCODE(\d+)TOKEN/g,(_,n)=>blocks[n]);
}
function publishMarkdown(markdown,directory,prefix){
  return transformLinks(markdown,function(value){
    if(!value||/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(value))return value;
    const parts=value.match(/^([^?#]+)(.*)$/);if(!parts)return value;
    let relative;try{relative=decodeURIComponent(parts[1]).replace(/\\/g,'/');}catch(e){throw Error('Invalid asset URL: '+value);}
    const file=path.resolve(directory,relative);
    if(!file.startsWith(path.resolve(directory)+path.sep))throw Error('素材必须位于文章目录内：'+value);
    if(!fs.existsSync(file)||!fs.statSync(file).isFile())throw Error('找不到文章素材：'+file);
    return prefix+path.relative(directory,file).replace(/\\/g,'/').split('/').map(encodeURIComponent).join('/')+parts[2];
  });
}
module.exports={transformLinks,publishMarkdown};
