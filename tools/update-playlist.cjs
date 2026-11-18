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
    let tracks;
    try{
      const response=await fetch(endpoint,{signal:AbortSignal.timeout(20000),cache:'no-store'});
      if(!response.ok)throw Error('HTTP '+response.status);
      tracks=await response.json();
    }catch(error){
      if(process.platform!=='win32')throw error;
      // Local Windows builds can use the owner's existing SOCKS proxy.
      const output=require('child_process').execFileSync('pwsh.exe',['-NoProfile','-Command',"$ErrorActionPreference='Stop'; $r=Invoke-RestMethod -Uri $env:JOPOLIS_PLAYLIST_URL -Proxy 'socks5://127.0.0.1:7897' -TimeoutSec 20; ConvertTo-Json -InputObject @($r) -Depth 10 -Compress"],{env:{...process.env,JOPOLIS_PLAYLIST_URL:endpoint.href},encoding:'utf8',timeout:25000,windowsHide:true});
      tracks=JSON.parse(output.replace(/^\uFEFF/,''));
    }
    if(!Array.isArray(tracks)||!tracks.length||tracks.some(t=>!t.url||!(t.name||t.title)))throw Error('Invalid tracks');
    fs.mkdirSync(path.dirname(target),{recursive:true});
    fs.writeFileSync(target,JSON.stringify({playlist_id:id,updated_at:new Date().toISOString(),tracks},null,2)+'\n');
    console.log('Music snapshot updated: '+tracks.length+' tracks.');
  }catch(error){console.log('Music snapshot: live service unavailable; retaining the last published data.');}
})();
