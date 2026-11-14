// Canonical short URLs with full-page legacy routes (no dependency or network).
hexo.extend.generator.register('legacy-post-links',function(locals){
  const seen=new Set();
  return locals.posts.toArray().flatMap(function(post){
    const id=String(post.short_id||'');
    if(!/^[a-f0-9]{8}$/.test(id)||seen.has(id))throw new Error('Invalid or duplicate short_id: '+id);
    seen.add(id);post.__post=true;
    const paths=['posts/'+post.slug+'/index.html'];
    if(/^\d+$/.test(String(post.abbrlink||''))){
      const old=String(post.abbrlink);
      paths.push('posts/'+old+'.html','posts/'+old+'/index.html',old+'/index.html');
    }
    if(post.slug==='随笔记')paths.push('essays/index.html');
    return paths.map(path=>({path,layout:['post','page','index'],data:post}));
  });
});
hexo.extend.generator.register('legacy-page-links',function(){
  return [{path:'links/index.html',layout:'friends',data:{title:'友链'}},{path:'masonry/index.html',layout:'albums',data:{title:'相册簿'}}];
});
