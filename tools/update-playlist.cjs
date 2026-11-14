// A failed remote lookup must never block publishing an existing snapshot.
const fs=require('node:fs'),path=require('node:path'),yaml=require('js-yaml');
(async()=>{
  const root=path.resolve(__dirname,'..');
  const config=yaml.load(fs.readFileSync(path.join(root,'网站管理/设置/播放器.yml'),'utf8'));
  if(!config.enabled)return;
  const id=(String(config.playlist).match(/[?&]id=(\d+)/)||[])[1];
  if(!id||/song(?:[/?#]|$)/.test(config.playlist))return;
  const target=path.join(root,'网站管理/素材/music/playlist.json');
  try{
    const endpoint=new URL(config.api);
    endpoint.search=new URLSearchParams({server:'netease',type:'playlist',id,_refresh:String(Date.now())});
    const response=await fetch(endpoint,{signal:AbortSignal.timeout(5000),cache:'no-store'});
    if(!response.ok)throw Error('HTTP '+response.status);
    const tracks=await response.json();
    if(!Array.isArray(tracks)||!tracks.length||tracks.some(t=>!t.url||!(t.name||t.title)))throw Error('Invalid tracks');
    fs.mkdirSync(path.dirname(target),{recursive:true});
    fs.writeFileSync(target,JSON.stringify({playlist_id:id,updated_at:new Date().toISOString(),tracks},null,2)+'\n');
    console.log('Music snapshot updated: '+tracks.length+' tracks.');
  }catch(error){console.log('Music snapshot: live service unavailable; retaining the last published data.');}
})();
