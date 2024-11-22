---
title: Hexo主题启用带API解析全局播放器
date: 2024-11-22 01:45:54
tags:
  - "Hexo"
  - "Hexo-theme"
thumbnail: images/qjbfq-head.png
excerpt: 为了能有更方便的播放器体验，我重构了网站……
---

## 实现逻辑

![](images/插件植入主题步骤.jpg)

## 重构前的准备

1. 先 [Fork EvanNotFound/hexo-theme-redefine](https://github.com/EvanNotFound/hexo-theme-redefine/fork)
2. 通过Git Clone到本地路径。
3. 本文档中的`%theme%`为你克隆到本地的原始主题文件目录`hexo-theme-redefine\`

## 调整主题文件

1. 按照 [为Hexo-Redefine主题启用MetingJs By.秋水](https://blog.qiusyan.top/posts/21658) 的步骤修改或添加主题文件。

2. 右击右侧超链接，将链接另存为[Meting.min.js](https://fastly.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js)。

3. 将`Meting.min.js`放入`%theme%\source\build\js\libs\`路径下。

4. 在`%theme%\layout\components\plugins\`中新建`meting_js_only.ejs`文件，内容为以下代码：

   ```html
   <%- renderJS('js/libs/APlayer.min.js') %>
   <%- renderJS('js/libs/Meting.min.js') %>
   ```

5. 仍在此目录下新建`meting.ejs`文件，内容为以下代码：

   ```html
   <div id="meting-container"></div>
   <%- renderJS('js/plugins/meting.js') %>
   ```

6. 在`%theme%\source\build\js\plugins\`目录下新建`meting.js`文件，内容如下：

   ```javascript
   // 从主题配置中获取 meting 配置
   const metingConfig = theme.plugins.meting;
   console.log('Meting Config:', metingConfig);
   
   // 初始化播放器配置的函数
   function initMetingPlayer() {
       // 检查必选参数
       if (!metingConfig.id || !metingConfig.server || !metingConfig.type) {
           console.error('Missing required parameters:', {
               id: metingConfig.id,
               server: metingConfig.server,
               type: metingConfig.type
           });
           return;
       }
   
       // 创建 meting-js 元素
       const metingElement = document.createElement('meting-js');
       
       // 设置必选属性
       metingElement.setAttribute('server', metingConfig.server);
       metingElement.setAttribute('type', metingConfig.type);
       metingElement.setAttribute('id', metingConfig.id);
   
       // 根据播放器类型设置 fixed 或 mini
       if (metingConfig.playerType === 'fixed') {
           metingElement.setAttribute('fixed', 'true');
       } else if (metingConfig.playerType === 'mini') {
           metingElement.setAttribute('mini', 'true');
       }
   
       // 设置其他可选属性
       if (metingConfig.autoplay !== undefined) {
           metingElement.setAttribute('autoplay', metingConfig.autoplay);
       }
       if (metingConfig.theme !== undefined) {
           metingElement.setAttribute('theme', metingConfig.theme);
       }
       if (metingConfig.loop !== undefined) {
           metingElement.setAttribute('loop', metingConfig.loop);
       }
       if (metingConfig.order !== undefined) {
           metingElement.setAttribute('order', metingConfig.order);
       }
       if (metingConfig.preload !== undefined) {
           metingElement.setAttribute('preload', metingConfig.preload);
       }
       if (metingConfig.volume !== undefined) {
           metingElement.setAttribute('volume', metingConfig.volume);
       }
       if (metingConfig.mutex !== undefined) {
           metingElement.setAttribute('mutex', metingConfig.mutex);
       }
       if (metingConfig.lrcType !== undefined) {
           metingElement.setAttribute('lrc-type', metingConfig.lrcType);
       }
       if (metingConfig.listFolded !== undefined) {
           metingElement.setAttribute('list-folded', metingConfig.listFolded);
       }
       if (metingConfig.listMaxHeight !== undefined) {
           metingElement.setAttribute('list-max-height', metingConfig.listMaxHeight);
       }
       if (metingConfig.storageName !== undefined) {
           metingElement.setAttribute('storage-name', metingConfig.storageName);
       }
   
       // 获取并清空 meting-container 容器
       const apContainer = document.getElementById('meting-container');
       if (apContainer) {
           apContainer.innerHTML = '';
           // 将 meting-js 元素添加到容器中
           apContainer.appendChild(metingElement);
       }
   
       console.log('Created meting element:', metingElement.outerHTML);
   }
   
   // 确保 DOM 加载完成后再执行初始化
   if (document.readyState === 'loading') {
       document.addEventListener('DOMContentLoaded', initMetingPlayer);
   } else {
       initMetingPlayer();
   }
   ```

7. 找到`%theme%\layout\layout.ejs`，在`<body>···</body>`中注入以下代码：

   ```html
   	<% if (theme.plugins.meting.enable) { %>
   		<%- partial('components/plugins/meting_js_only') %>
   	<% } %>
   	<% if (theme.plugins.meting.global_sticky_enable) { %>
   		<%- partial('components/plugins/meting') %>
   	<% } %>
   ```

   - 代码注入后长这个样子就是正常的

   ```html
   <!DOCTYPE html>
   <html lang="<%= config.language %>">
   <%- partial('components/header/head') %>
   
   <body>
   	<%- body %>
   	<%- partial('components/scripts') %>
   	<% if (theme.plugins.aplayer.enable) { %>
   	<%- partial('components/plugins/aplayer') %>
   	<% } %>
   	<% if (theme.plugins.meting.enable) { %>
   		<%- partial('components/plugins/meting_js_only') %>
   	<% } %>
   	<% if (theme.plugins.meting.global_sticky_enable) { %>
   		<%- partial('components/plugins/meting') %>
   	<% } %>
   </body>
   
   </html>
   ```

8. 到这里所有修改都已经完成，请将修改好的`hexo-theme-redefine`使用Git提交到你`Fork`出来的原始主题中。

   ```bash
   # 如果是通过“git clone”下来的仓库，则不需要此步骤来重新关联远程仓库
   $ git remote add origin git@github.com:Ataidawa/hexo-theme-redefine.git
   $ git add .
   $ git commit -m "feat: 注入了带API解析功能的播放器插件"
   $ git push -u origin main
   ```


## 导入主题

1. 将修改好的`hexo-theme-redefine`主题导入到网站下`%WebSite%\themes\`目录下

2. 将文件夹名从`hexo-theme-redefine`改为`redefine`

3. 由于`Json`文件无法使用注释，所以请在`package.json`文件中删去以下内容

   ```json
       "hexo-theme-redefine": "^2.8.1",
   ```

4. 删除`package-lock.json`中的以下内容

   ```json
           "hexo-theme-redefine": "^2.8.1",
   ```

   ```json
   "node_modules/hexo-theme-redefine": {
         "version": "2.8.1",
         "resolved": "https://registry.npmmirror.com/hexo-theme-redefine/-/hexo-theme-redefine-2.8.1.tgz",
         "integrity": "sha512-w1NAOZaQRaf9Lt4GHAGwfhC1YnIXfP8zL7jkqVH5carw7gnHCXXWkIowzR6vRdZpIe5or/GE08PbDCjx1Q19iw==",
         "license": "GPL-3.0"
       },
   ```

5. 在`%WebSite%\node_modules\`中找到`hexo-theme-redefine\`主题文件夹并删除。

6. 在`Git Bash`中执行`npm install`补全依赖。

## 启用插件

1. 找到主题的`_config.yml`文件，如果使用的是类似`Hexo-theme-redefine`的主题，则配置文件为`_config.redefine.yml`。

2. 查询配置文件中的`plugins:`字段，将以下代码注入：

   ```yaml
   meting: # MetingJs相关配置
     enable: true # 是否全局注入Aplayer.js与Meting.js
     global_sticky_enable: false # 是否启用全局吸底，不启用的话下面的配置项无效
     id: '1926144232' # 歌曲ID / 歌单ID / 专辑ID
     server: 'netease' # 音乐平台
     type: 'song' # ID对应的类型
     playerType: 'fixed' # 吸底 / 迷你 | fixed & mini 
     preload: 'auto' 
     loop: 'all'
     theme: '#4586F3'
   ```

3. 注入完成后`plugins`部分应为这个样子

   ```yaml
   # PLUGINS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/plugins
   plugins:
     # RSS feed. Requires hexo-generator-feed (npm i hexo-generator-feed). See https://github.com/hexojs/hexo-generator-feed
     feed:
       enable: false # Whether to enable
     # Aplayer. See https://github.com/DIYgod/APlayer
     aplayer:
       enable: false # Whether to enable
       type: fixed # fixed, mini
       audios:
   #      - name: # audio name
   #        artist: # audio artist
   #        url: # audio url
   #        cover: # audio cover url
   #        lrc: # audio cover lrc
         # .... you can add more audios here
     meting: # MetingJs相关配置
       enable: true # 是否全局注入Aplayer.js与Meting.js
       global_sticky_enable: true # 是否启用全局吸底，不启用的话下面的配置项无效
       id: '12894279890' # 歌曲ID / 歌单ID / 专辑ID
       server: 'netease' # 音乐平台
       type: 'playlist' # ID对应的类型
       playerType: 'fixed' # 吸底 / 迷你 | fixed & mini 
       preload: 'auto' 
       loop: 'all'
       theme: '#43A047'
     # Mermaid JS. Requires hexo-filter-mermaid-diagrams (npm i hexo-filter-mermaid-diagrams). See https://mermaid.js.org/
     mermaid:
       enable: false # enable mermaid or not
       version: "9.3.0" # default v9.3.0
   # PLUGINS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   ```



## 后期维护

1. 调整完成将站点`Git push`上`Github Pages`
2. 如果后续原始主题更新，IDE大概率会提示文件冲突，请注意需要**保留**`layout.ejs`文件中我们自己添加的代码。