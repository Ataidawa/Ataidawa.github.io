---
title: 懒事屋 - Ataida's Blog Website - 辅助手册
date: 2024-11-14 18:46:00
tags:
  - "Hexo"
  - "hexo-theme"
  - "Github Pages"
---

## 基本介绍和要点

#### 为了防止日后自己遗忘与更好地帮助别人制作个人网站，在此写一份ReadMe指导。

1. 本网站基于[hexo](https://github.com/hexojs/hexo-deployer-git)框架 
2. 基于[redefine](https://github.com/EvanNotFound/hexo-theme-redefine)做了修改
3. 一定要将三个官方文档结合着看
   - [GitHub Pages 快速入门](https://docs.github.com/zh/pages/quickstart)
   - [文档 | Hexo](https://hexo.io/zh-cn/docs/)
   - [快速开始 | Hexo Theme Redefine Docs](https://redefine-docs.ohevan.com/zh/getting-started)
4. 比起官方文档提到的内容，还有很多功能我没有成功实现。
5. 我搭建时使用的是Windows 10系统，使用Linux与MacOS的同志只可参考。



## 基本操作

1. 第一步一定要有一个状态正常的Github账号。

2. 本地下载好[Git](https://git-scm.com/downloads/win)和[Node.js](https://nodejs.org/zh-cn)一路默认安装即可（可以修改安装位置）。

3. 桌面空白处右键`Open Git Bash Here`配置Git。

   ```bash
   $ git config --global user.name "UserName"  # 配置用户名
   $ git config --global user.email "UserEmail"  # 配置用户邮箱
   $ git config --global https.proxy https://IP:Port  # （可选）配置代理
   $ ssh-keygen -t rsa -b 4096 -C "UserEmail"  # 生成SSH Key
   ```

4. 复制`%homepath%\用户名\.ssh\id_rsa.pub`文件中的内容。

5. 访问[Add new SSH key](https://github.com/settings/ssh/new)(访问的是Github>Settings>SSH>Add)`Title`随便取，`Key type`不变，`Key`为`id_rsa.pub`文件中的内容。

6. 执行这句指令测试SSH是否连通。（首次测试需要输入一次`yes`）

   ```bash
   $ ssh -T git@github.com
   ```

7. [创建新仓库](https://github.com/new)

   - `Repository name`为`UserName.github.io`(用户名大小写要相同)
   - Github Pages要求仓库为`Public`模式
   - `License`可以选择`None`、`MIT`、`GNU General Public License v3.0`（按照主题制作者的许可证来）
   - 创建完成后进入`Settings`在左侧导航中找到`Pages`，右侧找到`Build and deployment`将`Source`修改为`GitHub Actions`



## 安装框架与主题

1. 在本地选择合适的位置（例如`D:\Website\Blog\`)使用这句命令创建`Hexo基本框架`

   ```bash
   $ npm install hexo-cli -g
   ```

   - 要求`Blog`文件夹为空
   - 可能会有较长时间的等待，请不要进行其他操作

2. 使用该命令（二选一执行）正式新建站点

   ```bash
   $ hexo init  # 将打开Git Bash的位置设定为工作目录
   $ hexo init D:\Website\Blog  # 手动设定工作目录
   ```

3. 安装主题(可以使用git克隆也可以使用npm下载) 推荐使用npm

   ```bash
   $ npm install hexo-theme-redefine@latest
   ```

4. 修改`_config.yml`以启用主题

   ```yaml
   theme: redefine
   ```

   - 一般`_config.yml`中有`theme`，修改其值就可以
   - 如果文件中出现`remote_theme`请删除，他与`theme`不能并存

5. 在根目录新建`_config.redefine.yml`文件，并填入模板代码

   ```yaml
   # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # THEME REDEFINE CONFIGURATION FILE V2
   # BY EVANNOTFOUND
   # GITHUB: https://github.com/EvanNotFound/hexo-theme-redefine
   # DOCUMENTATION: https://redefine-docs.ohevan.com
   # DEMO: https://redefine.ohevan.com
   # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # BASIC INFORMATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/basic/info
   info:
     # Site title
     title: Theme Redefine
     # Site subtitle
     subtitle: Redefine Your Hexo Journey.
     # Author name
     author: The Redefine Team
     # Site URL
     url: https://redefine.ohevan.com
   # BASIC INFORMATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # IMAGE CONFIGURATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/basic/defaults
   defaults:
     # Favicon
     favicon: /images/redefine-favicon.svg
     # Site logo
     logo: 
     # Site avatar
     avatar: /images/redefine-avatar.svg
   # IMAGE CONFIGURATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # COLORS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/basic/colors
   colors:
     #Primary color
     primary: "#A31F34"
     # Secondary color (TBD)
     secondary:
     # Default theme mode initial value (will be overwritten by prefer-color-scheme)
     default_mode: light # light, dark
   # COLORS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # SITE CUSTOMIZATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/basic/global
   global:
     # Custom global fonts
     fonts:
       # Chinese fonts
       chinese: 
         enable: false # Whether to enable custom chinese fonts
         family:  # Font family
         url:  # Font URL to CSS file
       # English fonts
       english: 
         enable: false # Whether to enable custom english fonts
         family:  # Font family
         url:  # Font URL to CSS file
       # Custom title fonts (navbar, sidebar)
       title:
         enable: false # Whether to enable custom title fonts
         family:  # Font family
         url:  # Font URL to CSS file
     # Content max width
     content_max_width: 1000px
     # Sidebar width
     sidebar_width: 210px
     # Effects on mouse hover
     hover:
       shadow: true # shadow effect
       scale: false # scale effect
     # Scroll progress
     scroll_progress:
       bar: false # progress bar
       percentage: true # percentage
     # Website counter
     website_counter:
       url: https://cn.vercount.one/js # counter API URL (no need to change)
       enable: true # enable website counter or not
       site_pv: true # site page view
       site_uv: true # site unique visitor
       post_pv: true # post page view
     # Whether to enable single page experience (using swup). See https://swup.js.org/. similar to pjax
     single_page: true
     # Whether to enable Preloader.
     preloader:
       enable: false
       custom_message: # Custom message. If empty, the site title will be displayed
     # Whether to enable open graph
     open_graph: true
     # Google Analytics
     google_analytics:
       enable: false # Whether to enable Google Analytics
       id:  # Google Analytics Measurement ID
   # SITE CUSTOMIZATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
       
   
   # FONTAWESOME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/basic/fontawesome
   fontawesome: # Pro v6.2.1
     # Thin version
     thin: false
     # Light version
     light: false
     # Duotone version
     duotone: false
     # Sharp Solid version
     sharp_solid: false
   # FONTAWESOME <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # HOME BANNER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/home/home_banner
   home_banner:
     # Whether to enable home banner
     enable: true
     # style of home banner
     style: fixed # static or fixed
     # Home banner image
     image: 
       light: /images/wallhaven-wqery6-light.webp # light mode
       dark: /images/wallhaven-wqery6-dark.webp # dark mode
     # Home banner title
     title: Theme Redefine
     # Home banner subtitle
     subtitle:
       text: [] # subtitle text, array
       hitokoto:  # 一言配置
         enable: false # Whether to enable hitokoto
         show_author: false # Whether to show author
         api: https://v1.hitokoto.cn # API URL, can add types, see https://developer.hitokoto.cn/sentence/#%E5%8F%A5%E5%AD%90%E7%B1%BB%E5%9E%8B-%E5%8F%82%E6%95%B0
       typing_speed: 100 # Typing speed (ms)
       backing_speed: 80 # Backing speed (ms)
       starting_delay: 500 # Start delay (ms)
       backing_delay: 1500 # Backing delay (ms)
       loop: true # Whether to loop
       smart_backspace: true # Whether to smart backspace
     # Color of home banner text
     text_color: 
       light: "#fff" # light mode
       dark: "#d1d1b6" # dark mode
     # Specific style of the text
     text_style: 
       # Title font size
       title_size: 2.8rem
       # Subtitle font size
       subtitle_size: 1.5rem
       # Line height between title and subtitle
       line_height: 1.2
     # Home banner custom font
     custom_font: 
       # Whether to enable custom font
       enable: false
       # Font family
       family: 
       # URL to font CSS file
       url:
     # Home banner social links
     social_links:
       # Whether to enable
       enable: false
       # Social links style
       style: default # default, reverse, center
       # Social links
       links:
         github:  # your GitHub URL
         instagram: # your Instagram URL
         zhihu:  # your ZhiHu URL
         twitter:  # your twitter URL
         email:  # your email
         # ...... # you can add more
       # Social links with QRcode drawers
       qrs:
         weixin:  # your Wechat QRcode image URL
         # ...... # you can add more
   # HOME BANNER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # NAVIGATION BAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/home/navbar
   navbar:
     # Auto hide navbar
     auto_hide: false
     # Navbar background color
     color:
       left: "#f78736" #left side 
       right: "#367df7"  #right side
       transparency: 35 #percent (10-99)
     # Navbar width (usually no need to modify)
     width:
       home: 1200px #home page
       pages: 1000px #other pages
     # Navbar links
     links:
       Home: 
         path: / 
         icon: fa-regular fa-house # can be empty
       # Archives: 
       #   path: /archives 
       #   icon: fa-regular fa-archive # can be empty
       # Status: 
       #   path: https://status.ohevan.com/
       #   icon: fa-regular fa-chart-bar
       # About: 
       #   icon: fa-regular fa-user
       #   submenus:
       #     Me: /about
       #     Github: https://github.com/EvanNotFound/hexo-theme-redefine
       #     Blog: https://ohevan.com
       #     Friends: /friends
       # Links: 
       #   icon: fa-regular fa-link
       #   submenus:
       #     Link1: /link1
       #     Link2: /link2
       #     Link3: /link3
       # ...... # you can add more
     # Navbar search (local search). Requires hexo-generator-searchdb (npm i hexo-generator-searchdb). See https://github.com/theme-next/hexo-generator-searchdb
     search:
       # Whether to enable
       enable: false
       # Preload search data when the page loads
       preload: true
   # NAVIGATION BAR <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # HOME PAGE ARTICLE SETTINGS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/home/home
   home:
     # Sidebar settings
     sidebar:
       enable: true # Whether to enable sidebar
       position: left # Sidebar position. left, right
       first_item: menu # First item in sidebar. menu, info
       announcement: # Announcement text
       show_on_mobile: true # Whether to show sidebar navigation on mobile sheet menu
       links:
         # Archives: 
         #   path: /archives 
         #   icon: fa-regular fa-archive # can be empty
         # Tags: 
         #   path: /tags 
         #   icon: fa-regular fa-tags # can be empty
         # Categories: 
         #   path: /categories 
         #   icon: fa-regular fa-folder # can be empty
         # ...... # you can add more
     # Article date format
     article_date_format: auto # auto, relative, YYYY-MM-DD, YYYY-MM-DD HH:mm:ss etc.
     # Article excerpt length
     excerpt_length: 200 # Max length of article excerpt
     # Article categories visibility
     categories:
       enable: true  # Whether to enable
       limit: 3 # Max number of categories to display
     # Article tags visibility
     tags:
       enable: true  # Whether to enable
       limit: 3  # Max number of tags to display
   # HOME PAGE ARTICLE SETTINGS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # ARTICLE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/posts/articles
   articles:
     # Set the styles of the article
     style:
       font_size: 16px # Font size
       line_height: 1.5 # Line height
       image_border_radius: 14px # image border radius
       image_alignment: center # image alignment. left, center
       image_caption: false # Whether to display image caption
       link_icon: true # Whether to display link icon
       title_alignment: left # Title alignment. left, center
       headings_top_spacing: # Top spacing for headings from h1-h6
         h1: 3.2rem
         h2: 2.4rem
         h3: 1.9rem
         h4: 1.6rem
         h5: 1.4rem
         h6: 1.3rem
     # Word count. Requires hexo-wordcount (npm install hexo-wordcount). See https://github.com/willin/hexo-wordcount
     word_count:
       enable: true # Whether to enable
       count: true # Whether to display word count
       min2read: true # Whether to display reading time
     # Author label
     author_label: 
       enable: true # Whether to enable
       auto: false # Whether to automatically add author label, e.g. Lv1, Lv2, Lv3...
       list: []
     # Code block settings
     code_block:
       copy: true # Whether to enable code block copy button
       style: mac # mac | simple
       highlight_theme: # Color scheme for highlightjs code highlighting. For preview, see https://highlightjs.org/examples
         light: github # light mode theme, support: github, atom-one-light, default
         dark: vs2015 # dark mode theme, support: github-dark, monokai-sublime, vs2015, night-owl, atom-one-dark, nord, tokyo-night-dark, a11y-dark, agate
       font: # Custom font
         enable: false # Whether to enable
         family: # Font family
         url: # Font URL to CSS file
     # Table of contents settings
     toc:
       enable: true # Whether to enable TOC
       max_depth: 3 # TOC depth
       number: false # Whether to add number to TOC automatically
       expand: true # Whether to expand TOC
       init_open: true # Open toc by default
     # Whether to enable copyright notice
     copyright:
       enable: true # Whether to enable
       default: cc_by_nc_sa # Default license, can be cc_by_nc_sa, cc_by_nd, cc_by_nc, cc_by_sa, cc_by, all_rights_reserved, public_domain
     # Whether to enable lazyload for images
     lazyload: true
     # Article recommendation. Requires nodejieba (npm install nodejieba). Transplanted from hexo-theme-volantis.
     recommendation:
       # Whether to enable article recommendation
       enable: false
       # Article recommendation title
       title: 推荐阅读
       # Max number of articles to display
       limit: 3
       # Max number of articles to display mobile
       mobile_limit: 2
       # Placeholder image
       placeholder: /images/wallhaven-wqery6-light.webp
       # Skip directory
       skip_dirs: []
   # ARTICLE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # COMMENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/posts/comment
   comment:
     # Whether to enable comment
     enable: true
     # Comment system
     system: waline # waline, gitalk, twikoo, giscus
     # System configuration
     config:
       # Waline comment system. See https://waline.js.org/
       waline:
         serverUrl: https://example.example.com # Waline server URL. e.g. https://example.example.com
         lang: zh-CN # Waline language. e.g. zh-CN, en-US. See https://waline.js.org/guide/client/i18n.html
         emoji: [] # Waline emojis, see https://waline.js.org/guide/features/emoji.html
         recaptchaV3Key: # Google reCAPTCHA v3 key. See https://waline.js.org/reference/client/props.html#recaptchav3key
         turnstileKey: # Turnstile key. See https://waline.js.org/reference/client/props.html#turnstilekey
         reaction: false # Waline reaction. See https://waline.js.org/reference/client/props.html#reaction
       # Gitalk comment system. See https://github.com/gitalk/gitalk
       gitalk:
         clientID: # GitHub Application Client ID
         clientSecret: # GitHub Application Client Secret
         repo: # GitHub repository
         owner: # GitHub repository owner
         proxy: # GitHub repository proxy
       # Twikoo comment system. See https://twikoo.js.org/
       twikoo:
         version: 1.6.10 # Twikoo version, do not modify if you dont know what it is
         server_url: # Twikoo server URL. e.g. https://example.example.com
         region: # Twikoo region. can be empty
       # Giscus comment system. See https://giscus.app/
       giscus:
         repo: # Github repository name e.g. EvanNotFound/hexo-theme-redefine
         repo_id: # Github repository id
         category: # Github discussion category
         category_id: # Github discussion category id
         mapping: pathname # Which value to use as the unique identifier for the page. e.g. pathname, url, title, og:title. DO NOT USE og:title WITH PJAX ENABLED since pjax will not update og:title when the page changes
         strict: 0 # Whether to enable strict mode. e.g. 0, 1
         reactions_enabled: 1 # Whether to enable reactions. e.g. 0, 1
         emit_metadata: 0 # Whether to emit metadata. e.g. 0, 1
         lang: en # Giscus language. e.g. en, zh-CN, zh-TW
         input_position: bottom # Place the comment box above/below the comments. e.g. top, bottom
         loading: lazy # Load the comments lazily
   # COMMENT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # FOOTER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/footer
   footer:
     # Show website running time
     runtime: true # show website running time or not
     # Icon in footer, write fontawesome icon code here
     icon: '<i class="fa-solid fa-heart fa-beat" style="--fa-animation-duration: 0.5s; color: #f54545"></i>'
     # The start time of the website, format: YYYY/MM/DD HH:mm:ss
     start: 2022/8/17 11:45:14
     # Site statistics
     statistics: true # show site statistics or not (total articles, total words)
     # Footer message
     customize:
     # ICP record number. See https://beian.miit.gov.cn/
     icp:
       enable: false # Whether to enable
       number: # ICP record number
       url: # ICP record url
   # FOOTER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # INJECT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/inject
   inject:
     # Whether to enable inject
     enable: false
     # Inject custom head html code
     head: 
       -
       -
     # Inject custom footer html code
     footer:
       -
       -
   # INJECT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
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
         - name: # audio name
           artist: # audio artist
           url: # audio url
           cover: # audio cover url
           lrc: # audio cover lrc
   #      - name: # audio name
   #        artist: # audio artist
   #        url: # audio url
   #        cover: # audio cover url
   #        lrc: # audio cover lrc
         # .... you can add more audios here
     # Mermaid JS. Requires hexo-filter-mermaid-diagrams (npm i hexo-filter-mermaid-diagrams). See https://mermaid.js.org/
     mermaid:
       enable: false # enable mermaid or not
       version: "9.3.0" # default v9.3.0
   # PLUGINS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # PAGE TEMPLATES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/page_templates
   page_templates:
     # Friend Links page column number
     friends_column: 2
     # Tags page style
     tags_style: blur # blur, cloud
   # PAGE TEMPLATES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   
   # CDN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/cdn
   cdn:
     # Whether to enable CDN
     enable: false
     # CDN Provider
     provider: npmmirror # npmmirror, zstatic, sustech, cdnjs, jsdelivr, unpkg, custom
     # Custom CDN URL
     # format example: https://cdn.custom.com/hexo-theme-redefine/${version}/source/${path}
     # The ${path} must leads to the root of the "source" folder of the theme
     custom_url: 
   # CDN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   
   # DEVELOPER MODE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/developer
   developer:
     # Whether to enable developer mode (only for developers who want to modify the theme source code, not for ordinary users)
     enable: false
   # DEVELOPER MODE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   ```

   - 英文好的话可以直接看文件内的注释，不好的话看主题官网[Hexo Theme Redefine Docs](https://redefine-docs.ohevan.com/zh/basic)
   - 按照需求修改键值对



## 预览与推送

```bash
$ hexo generate  # 生成静态页面
$ hexo server  # 启动服务器
# 访问 https://localhost:4000 检查完成后执行下面这句命令
$ hexo clean  # 清除缓存(db.json与public/内的静态页面)
```

1. 检查页面无问题后可以开始推送到Github仓库中

2. 前面我们已经配置好了Git与Github的SSH连接，现在前往远程仓库复制SSH地址

3. 在本地站点使用`Git Bash`中执行这几句命令

   ```bash
   $ git init  # 创建Git工作目录
   $ git add .  # 添加目录中的所有文件
   $ git commit -m "第一次推送"  # 填写提交描述
   $ git remote add origin git@github.com:UserName/UserName.github.io.git  # 关联远程仓库
   $ git push -u origin main  # 推送到main分支（也可以是master\gh-pages）
   ```

   - 分支可以是`main`、`master`或`gh-pages`，现在已无硬性要求

   - 如果Git显示默认分支为`master`，可以使用这句指令切换（创建）分支

     ```bash
     $ git branch main
     ```

     



## 配置Github Actions

1. 先记录本地`node.js`版本号

   ```bash
   $ node --version
   ```

   > 输出：v22.11.0

2. 在`.github/workflows/`中创建`pages.yml`文件

   ```yaml
   name: Pages
   
   on:
     push:
       branches:
         - main # default branch
   
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
           with:
             token: ${{ secrets.GITHUB_TOKEN }}
             # If your repository depends on submodule, please see: https://github.com/actions/checkout
             submodules: recursive
         - name: Use Node.js 22.11.0
           uses: actions/setup-node@v4
           with:
             # Examples: 20, 18.19, >=16.20.2, lts/Iron, lts/Hydrogen, *, latest, current, node
             # Ref: https://github.com/actions/setup-node#supported-version-syntax
             node-version: "22.11.0"
         - name: Cache NPM dependencies
           uses: actions/cache@v4
           with:
             path: node_modules
             key: ${{ runner.OS }}-npm-cache
             restore-keys: |
               ${{ runner.OS }}-npm-cache
         - name: Install Dependencies
           run: npm install
         - name: Build
           run: npm run build
         - name: Upload Pages artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./public
     deploy:
       needs: build
       permissions:
         pages: write
         id-token: write
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

   - 如果远程仓库分支名不为`main`，请修改文件第6行代表`default branch`的`main`为你的分支名

## 网站使用方法

1. 如何攥写博客请查阅[写作指南 | Hexo Theme Redefine Docs](https://redefine-docs.ohevan.com/zh/tips)

2. 攥写博客在`website\source\`目录下进行

3. 图片文件请在`source\`目录下创建文件夹存放，攥写博客插入图片时填写相对路径。

4. 该主题在文章开头不适合使用一级标题，请使用`fornt-matter`中的`title`键值对。(输入`---`后回车即可创建文件标头)

   ```markdown
   ---
   title: 博客建立帮助文档
   date: 2024-11-14 18:46:00
   tags:
     - "Hexo"
     - "hexo-theme"
     - "Github Pages"
   ---
   ```



### 感谢您看到这里，官方文档各有缺陷，遇到问题一定要多文档结合检查，祝您一切顺利！

