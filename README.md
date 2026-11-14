# 周城栋 · 个人站

**日常维护统一使用 [`网站管理/先看这里.md`](网站管理/先看这里.md)。**
文章、作品、相册、友链、首页简介、求职状态、Logo、配色、播放器和素材都集中在这个文件夹；Hexo 启动／生成时自动同步。下文涉及 source/ 的旧维护说明，以统一入口手册为准。

## 当前界面更新

视觉规范统一入口：`source/css/design-system.css`；说明见 `docs/design-system.md`。新增页面：`/albums/` 相册簿（`source/_data/albums.yml` 维护图片和说明）、`/friends/` 友链（`source/_data/friends.yml` 维护真实链接、头像与简介）。相册当前为明确标注的占位预览。

音乐配置位于 `source/_data/music.yml`，填写网易云歌单 URL 和兼容 Meting 的 JSON 接口。全站播放器支持拖动、位置记忆、隐藏与恢复。文章内嵌格式：`<div class="music-inline" data-music-player data-playlist="https://music.163.com/playlist?id=歌单ID"></div>`。内嵌与全站播放器互斥，不自动播放；公共接口及歌曲授权可能影响实际播放。换页会重新加载播放器，位置和隐藏状态保留，播放不跨页续接。

采用 Hexo + Frame 的 Codex客制化 1.0.0，视觉向 Google Material 风格统一，覆盖样式位于 `source/css/codex.css`。
作品集标签在 `/work/` 原地筛选，旧分类链接保留兼容。
北京时间通过 `Intl.DateTimeFormat` 的 `Asia/Shanghai` 时区转换，依赖访问者设备时钟，无需联网获取；首次访问每天 07:00–19:00 浅色，其余时段深色。图标按钮仅切换浅色/深色，手动选择保存在浏览器。左上角标志路径在 `_config.frame.yml` 的 `logo_image.image_path` 配置，当前使用临时 SVG 标志，待替换用户文件。
联系方式在 `source/_data/footer.yml` 填写，版权位于联系方式图标下方；不再需要独立联系页面。
首页肖像桌面为 200px、手机为 120px；作品入口保持方形预览。
作品详情保持电脑左图右文、手机先文字后图片。
生成后运行 `node tests/check-apple.cjs` 检查时间边界、手动切换、筛选与页脚结构。
以下旧说明中的标签跳转规则，以本节为准。

Hexo 7 + Frame 主题。作品集优先的个人站，部署在 GitHub Pages。

## 本地跑起来

```bash
npm install
npx hexo server -p 4000
```

打开 http://localhost:4000

## 页面结构

```
/                       首页：简介（求职）→ 作品集大入口 → 文章列表
/work/                  作品集：5 个类目 tag 按钮 + 全部作品网格
/categories/<slug>/     某个类目的作品展示（最里层的内容页）
/posts/<slug>/          单个作品 / 单篇文章
/notes/                 全部文章（只含「文章」分类，菜单里叫「文章」）
/archives/              全站归档（作品 + 文章混排，菜单里没挂，需要时再加）
```

首页不放五个类目的平铺列表，只放一个「作品集」大入口（标题 + 项目数 + 五个类目各一张封面拼成的一排缩览图），整块可点。点进去是 tag 按钮页，点 tag 直接到类目内容页，中间不再多一层。

## 响应式

版心宽度按屏幕分档，不是固定值：

| 屏幕宽度 | 版心 |
|---|---|
| ≥1400px | 1200px |
| 1100–1399px | 1040px |
| 900–1099px | 880px |
| 689–899px | 720px |
| ≤688px | 100%（左右各 20px 内边距） |

手机上额外做的调整：Hero 改成文字在上、图片在下；作品集缩览图变成可横向滑动的图片条；tag 按钮和作品网格改成两列；类目页的信息和图片改成上下堆叠。正文页单独限制在 780px，保证阅读行长。

改这些在 `source/css/custom.css`，按注释里的编号找。

## 目录说明

```
_config.yml            站点配置（标题、网址、分类映射）
_config.frame.yml      主题配置（首页简介、菜单、页脚）★ 主要改这里
source/_posts/         作品和文章，一个 md 一个条目
source/_data/portfolio.yml   作品集大类（首页顺序）
source/images/         图片
source/css/custom.css  自定义样式（版心宽度、响应式、各区块样式）
themes/frame/          Frame 主题（尽量别改，改了升级会覆盖）
docs/                  内容清单、预览截图
scripts/               占位图生成脚本
```

## 加一个作品

1. 在 `source/_posts/` 新建 `英文文件名.md`
2. front-matter 里 `categories` 写作品集大类名（要和 `portfolio.yml` 里的 `name` 一致）
3. `featured_image` 指向 4:5 的图
4. 正文按「背景 / 问题 / 做法 / 结果」四段写

详细模板见 `docs/content-spec.md`。

## 常用命令

```bash
npx hexo clean       # 清缓存
npx hexo generate    # 生成静态文件到 public/
npx hexo server      # 本地预览
npx hexo new post "标题"   # 新建文章
```

## 发布到 GitHub Pages

仓库：`Ataidawa/Ataidawa.github.io`

```bash
npm install hexo-deployer-git --save
```

在 `_config.yml` 里把 deploy 段改成：

```yaml
deploy:
  type: git
  repo: https://github.com/Ataidawa/Ataidawa.github.io.git
  branch: gh-pages
  message: "site update"
```

然后：

```bash
npx hexo clean && npx hexo generate && npx hexo deploy
```

首次部署会要求输入 GitHub 用户名和 token。

## 注意

- `themes/frame/_config.yml` 里的 `menu` 和 `profile.links` 已经清空成 `{}`，配置统一放在根目录 `_config.frame.yml`，因为 Hexo 对主题配置是**深合并**，主题里留着旧键会和新键叠在一起
- 字体已本地化：`themes/frame/layout/partials/head.ejs` 里原来的 Google Fonts `@import` 已删掉，改为 `custom.css` 顶部用 `@font-face` 加载 `source/fonts/` 下的 Inter 和 Roboto Mono；中文走系统字体（PingFang SC / 微软雅黑 / 思源黑体），国内打开不会卡字体
- `<meta name="viewport">` 去掉了 `maximum-scale` / `minimum-scale`，保留双指缩放
- `_archive/` 里是废弃的旧仓库 git 目录和 Hexo 自带的示例文章，可以删
- 占位图在 `source/images/`，全是 SVG，换成真实图片时注意保持 4:5
