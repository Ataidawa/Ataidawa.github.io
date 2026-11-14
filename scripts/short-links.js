// Canonical short URLs with full-page legacy routes (no dependency or network).
hexo.extend.generator.register('legacy-post-links',function(locals){
  const seen=new Set();
  return locals.posts.toArray().map(function(post){
    const id=String(post.short_id||'');
    if(!/^[a-f0-9]{8}$/.test(id)||seen.has(id))throw new Error('Invalid or duplicate short_id: '+id);
    seen.add(id);post.__post=true;
    return {path:'posts/'+post.slug+'/index.html',layout:['post','page','index'],data:post};
  });
});
