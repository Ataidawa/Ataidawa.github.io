const rules=[
 ['字体资源',/字体|字库|font|typeface|sans|serif|文楷|普惠体/i],
 ['翻译与文本',/翻译|deepl|youdao|fanyi|translate/i],
 ['办公与文档',/pdf|office|文档编辑|简历|幻灯片|islide|ppt/i],
 ['系统维护',/驱动|系统镜像|刷机|windows|ubuntu|fedora|ventoy|rufus|firpe|winnt|kms/i],
 ['三维与材质',/blender|三维|材质|3d|ambientcg|polyhaven/i],
 ['图像处理',/抠图|图片压缩|图片放大|图像处理|remove\.bg|iloveimg|bigjpg|pixian|upscale/i],
 ['AI 工具',/人工智能|生成式|大模型|chatgpt|gemini|deepseek|comfyui|midjourney|生成图像|ai工具|\bAI\b/i],
 ['部署服务',/vercel|cloudflare|edgeone|域名注册|网站托管|云部署/i],
 ['开发与编程',/编程|开发文档|代码|github|gitlab|python|nodejs|hexo|pypi|jetbrains|程序设计/i],
 ['网络工具',/网络代理|vpn|wireguard|clash|v2ray|sing-box|dns工具/i],
 ['影音工具',/播放器|影音|potplayer|视频转换|音频转换|录屏|字幕工具|ffmpeg/i],
 ['设计工具',/在线设计|图标库|iconfont|remixicon|photopea|配色工具|设计协作/i],
 ['设计资源',/设计素材|灵感|站酷|花瓣|pinterest|mockup|freepik|pexels|unsplash/i],
 ['学习与教程',/教程|课程|学习|知识库|教学/i],
 ['兴趣与娱乐',/游戏|电影|影视|动漫|youtube|bilibili|pixiv/i],
 ['软件与资源',/软件下载|资源分享|软件资源/i],
 ['实用软件',/工具|软件|应用|typora|localsend|beeftext|bandizip/i]
];
module.exports=function classify(bookmark){const text=[bookmark.name,bookmark.url,bookmark.description].filter(Boolean).join(' ');return (rules.find(([,pattern])=>pattern.test(text))||['待分类'])[0];};
