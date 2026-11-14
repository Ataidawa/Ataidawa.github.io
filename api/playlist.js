// Public metadata only. Audio still resolves through the configured Meting service.
module.exports=async function(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','no-store, max-age=0');
  if(req.method==='OPTIONS')return res.status(204).end();
  const id=String(req.query.id||''),type=String(req.query.type||'playlist');
  if(!/^\d{1,20}$/.test(id)||!['playlist','song'].includes(type))return res.status(400).json({error:'Invalid music request'});
  async function read(path){const r=await fetch('https://music.163.com'+path,{headers:{Referer:'https://music.163.com/','User-Agent':'Mozilla/5.0'},cache:'no-store',signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error('Music metadata unavailable');const data=await r.json();if(data.code!==200)throw Error('Music metadata unavailable');return data;}
  try{
    let tracks;
    if(type==='song'){const data=await read('/api/song/detail/?ids='+encodeURIComponent('['+id+']'));tracks=data.songs;}
    else{
      const data=await read('/api/v6/playlist/detail?id='+id+'&n=1000&t='+Date.now());
      if(!data.playlist)throw Error('Playlist unavailable');
      const ids=(data.playlist.trackIds||[]).map(t=>t.id);
      tracks=data.playlist.tracks||[];
      const map=new Map(tracks.map(t=>[String(t.id),t]));
      const missing=ids.filter(i=>!map.has(String(i)));
      for(let i=0;i<missing.length;i+=100){const extra=await read('/api/song/detail/?ids='+encodeURIComponent(JSON.stringify(missing.slice(i,i+100))));(extra.songs||[]).forEach(t=>map.set(String(t.id),t));}
      if(ids.length)tracks=ids.map(i=>map.get(String(i))).filter(Boolean);
    }
    if(!tracks||!tracks.length)return res.status(404).json({error:'No accessible tracks'});
    res.status(200).json(tracks.map(t=>({id:String(t.id),name:t.name,artist:(t.ar||t.artists||[]).map(a=>a.name).join(' / '),pic:(t.al||t.album||{}).picUrl,url:'https://api.injahow.cn/meting/?server=netease&type=url&id='+t.id,duration:t.dt||t.duration})));
  }catch(e){res.status(502).json({error:'Music metadata service unavailable; retry later'});}
};
