---
short_id: "75ef4c84"
title: 网站操作手册：内容与设置的统一入口
date: 2026-11-15 11:00:00
updated: 2026-11-15
categories:
  - 文章
tags:
  - 操作指南
---

所有日常维护文件都放在项目根目录的 **网站管理** 文件夹。Hexo 启动或生成时会读取这些文件，源目录里的对应文件是自动副本。

## 快速找到操作位置

| 想做什么 | 编辑哪里 |
| --- | --- |
| 发文章 | 网站管理/文章/*.md |
| 加作品 | 网站管理/作品/*.md |
| 管理作品类别 | 网站管理/作品/分类.yml |
| 管理相册簿 | 网站管理/相册/相册.yml |
| 添加友链 | 网站管理/友链/友链.yml |
| 改首页简介与求职状态 | 网站管理/设置/首页.yml |
| 改 Logo | 网站管理/素材/logo.svg |
| 改全站色系与圆角 | 网站管理/设置/配色与外观.css |
| 改全局播放器歌单 | 网站管理/设置/播放器.yml |
| 改联系方式 | 网站管理/设置/页脚.yml |

## 添加文章 Markdown

在“文章”文件夹新建英文文件名的 Markdown。文件开头填写标题、日期、分类，分类必须为“文章”。下面的标题“文章标题”和正文可自由替换。

```yaml
---
title: 文章标题
date: 2026-11-15 12:00:00
categories:
  - 文章
tags:
  - 设计
---
```

分隔线后写正常 Markdown：段落、二级标题、列表、图片、代码块等。英文文件名决定默认文章地址，例如 `my-note.md` 对应 `/posts/my-note/`。文章与作品不要使用相同文件名。

## 添加作品集内容

在“作品”文件夹新建 Markdown。类别使用“作品/分类.yml”中的名称。封面推荐保持原有 4:5 构图，首页缩览会裁成方形。作品正文按背景、问题、做法、结果组织。

```yaml
---
title: 新作品标题
date: 2026-11-15 12:00:00
categories:
  - 主图设计
featured_image: /managed-assets/my-project.jpg
---
```

把 `my-project.jpg` 放进“素材”文件夹。网页地址写 `/managed-assets/my-project.jpg`，不要写电脑磁盘路径。

## 添加相册照片

编辑“相册/相册.yml”，照片实际文件放在“素材”。`placeholder` 为 true 表示占位预览，换真实照片后设为 false。

```yaml
- title: 日常观察
  description: 城市、色彩与设计灵感。
  placeholder: false
  photos:
    - image: /managed-assets/city.jpg
      caption: 杭州的一次散步
```

## 添加友链

在“友链/友链.yml”末尾增加一组。备注可以用 `|` 写多行。头像不填写时显示名称首字。

```yaml
- name: 朋友的名字
  url: https://example.com
  avatar: /managed-assets/friend.jpg
  description: |
    这里写我的备注
    或者对方的网站签名
```

## 修改首页与求职状态

编辑“设置/首页.yml”。`profile.status` 选择固定状态，`profile.specialty` 填写方向，`title` 是姓名，`role` 是职位与城市，`body` 是多段介绍，`image` 是头像地址。

```yaml
profile:
  status: available
  specialty: 电商视觉设计
  title: 周城栋
  role: 电商视觉设计师 · 杭州
  body: |
    第一段介绍。
    第二段介绍。
  image: /managed-assets/my-photo.jpg
  links:
    查看作品: /work/
    查看文章: /notes/
logo_image:
  enable: true
  image_path: /managed-assets/logo.svg
```

## 更换 Logo 与配色

直接替换“素材/logo.svg”即可更新 Logo。若使用 PNG，放入“素材”并修改 `logo_image.image_path`。现有 Logo 深色时会反白，建议保留单色标志。

“设置/配色与外观.css”顶部集中列出颜色与圆角变量。浅色改 `:root`，深色改 `[data-theme="dark"]`。常改的是 `--accent`、`--on-accent`、`--selected`、`--hover`、`--bg`、`--surface`。改变强调色时应同时检查强调色上的文字对比度。

圆角使用 `--radius-card`、`--radius-panel`、`--radius-control` 等变量。不要批量替换正文里出现的所有 px 数字。

## 更换音乐歌单

编辑“设置/播放器.yml”，替换 `playlist` 的网易云链接；`enabled` 控制是否显示。`api` 是兼容 Meting 的解析服务接口，接口失效才需要更换。

```yaml
enabled: true
playlist: https://music.163.com/playlist?id=17851162134
api: https://api.injahow.cn/meting/
```

歌曲版权、接口可用性会影响播放，部分音源只能试听。文章内音乐使用独立的链接参数，调用同一个全局播放器。

## 预览与删除

保存后运行 `npm run build`，再刷新本地网页，或重启预览服务。管理文件夹目前不会被预览服务自动监听。修改不会自动推送 GitHub。

删除管理文件夹中的文章或作品后，下一次生成会删除对应自动副本。图片等素材不会自动删除，避免误删仍被其他内容引用的文件。

[控件写法手册](/posts/component-guide/) · [网站设计规范](/posts/design-guide/)

## 首页状态灯

修改“设置/首页.yml”中的 `profile.status` 选择固定状态，`profile.specialty` 单独填写方向，不再编辑整段 badge 文字。

| status 参数 | 固定文字 | 状态灯 |
| --- | --- | --- |
| seeking | 求职中 | 蓝色 |
| available | 开放合作 | 绿色 |
| employed | 在职 | 琥珀色 |
| unavailable | 暂不接单 | 灰色 |

例如 `status: available` 配合 `specialty: 品牌视觉设计`，显示“开放合作 · 品牌视觉设计”。方向留空只显示状态。修改后重新生成或重启预览服务。

## 首页预览与同步说明

首页会自动选取相册中前 3 张照片、友链中前 2 项作为局部展示，调整相册或友链文件中的顺序即可改变展示内容。相册图片保留大图预览，友链跳转新窗口。

目前首页导航、页面布局、脚本属于程序部分，不在首页参数文件中调整。`首页.yml` 只提供简介、状态、头像、Logo 和首页操作链接，避免将参数入口与程序结构混淆。配色文件是完整 CSS，优先只改顶部变量；同一变量后文再次赋值时，以最后生效规则为准。

## 全站字体

本站统一采用本地 Noto Sans SC 可变字体，支持 100–900 字重。正文 400、控件 500、标题 600、强调 700；代码区域保留等宽字体。修改“设置/配色与外观.css”末尾的 `--font-sans` 和 `--weight-*` 可以统一调整。

字体文件与授权位于“素材/fonts/noto-sans-sc/”。字体使用 SIL OFL 1.1，支持商业项目的使用与网页嵌入，分发时保留 OFL.txt，不将字体文件单独出售。已转换为 31 个 WOFF2 Unicode 字符包，总计约 9.45 MB（原 TTF 17.77 MB），浏览器按需下载，通常只需其中少量分包。保留全部 30,890 个字符与 100–900 可变字重，使用 font-display:swap。原始 TTF 仅作维护备份，不发布到网站。

### 字库覆盖与生僻字

当前实际文件的 Unicode 映射实测为 30,890 个字符，其中 CJK 区间约 27,778 个字符；不是覆盖全部 Unicode 汉字的字库。抽查“龘、靐、齉、𰻞”有字形，“𠮷”没有。缺字会依次使用系统回退字体；目标设备也缺字时仍可能显示方框。MiSans 主库与 MiSans L3 扩展库需分别比较，不能直接把整个字库家族与单个字体文件作等量比较。大量姓名、古籍生僻字的使用场景需要再搭配授权允许网页分发的扩展字库。

## 品牌名称与图标

“设置/首页.yml”的 `site.title` 控制标签页站点名称，`site.author` 控制页脚署名，`profile.title` 控制首页名称。当前站点标题与页脚署名为 Jopolis.，首页姓名为周城栋。`favicon` 指向“素材/favicon.svg”，Logo 指向“素材/logo.svg”；更换浏览器图标后可增加 URL 版本参数避免旧缓存。

控件投影采用强调色的低透明度衍生色；黑色背景遮罩与图片文字可读性阴影属于独立用途，不作为控件投影处理。

### Logo 与姓名分开设置

左上角使用取景框＋Jopolis. 字标，加载后每约 12 秒自动播放一次短 glitch 效果，不依赖悬停；减少动态效果时停用。首页姓名 `profile.title` 为“周城栋”，标签页站点名 `site.title` 仍为“Jopolis.”，两者互不影响。标签页小图标采用相同的取景框＋J，并独立配置。

Logo 自动 glitch 的间隔在“设置/配色与外观.css”末尾 `brand-ambient-glitch 12s` 中调整，数字越大越安静。减少动态效果时停止自动动画。

## 自动短链接

新文章和作品保存后，首次生成会在 Markdown 开头写入 `short_id`（8 位十六进制 ID），正式地址为 `/p/ID/`。修改标题不影响地址；重命名文件时保留 short_id 即可，复制文章作为新内容时请删除复制来的 short_id，让系统重新生成。重复 ID 会阻止构建，避免覆盖页面。

旧的 `/posts/文件名/` 路径继续生成完整页面，已有分享和手册链接可继续使用；旧站 abbrlink 数字地址若需要全部兼容，需额外导入旧站 ID 对照表，当前没有自动猜测旧 ID。

源码在 main 分支，GitHub Actions 从 main 构建并部署 Pages；gh-pages 保留静态发布快照。修改源码后应提交 main，Pages 设置中的 Source 使用 GitHub Actions。

## 歌单内容更新

网易云歌单增删歌曲后，全局播放器自动重新获取，不再提供手动刷新或恢复默认位置按钮。页面可见时每 5 分钟检查一次；返回页面或展开列表时，距离上次同步超过 1 分钟也会检查。刷新时保留当前音源、播放状态和进度；若当前歌曲已从歌单删除，会暂时保留在本次播放队列，让它正常播放完。

浏览器请求绕过本地 HTTP 缓存，但第三方 Meting 服务仍可能缓存上游数据，因此不能保证网易云更改后立即同步。若仍是旧列表，应检查实时元数据服务或等待上游缓存更新。

### 歌单实时元数据接口

默认列表接口已改为 `https://ataidawa-github-io.vercel.app/api/playlist`，对应仓库的 `api/playlist.js`。它在 Vercel 读取网易云当前歌单，不缓存列表，解决第三方 Meting 的列表陈旧问题；音频 URL 仍由原 Meting 服务解析。接口是公开元数据接口，不需要填写密码或密钥。

GitHub Pages 为纯静态站，会跨域调用这个 Vercel 接口，因此其可用性仍依赖 Vercel 和网易云。将来迁移 EdgeOne 时需要同时迁移此函数或更换等价元数据服务，仅上传 public 不包含服务端函数。音频本身的版权与可播放性不受此修改改变。

播放器在首次歌单加载成功前隐藏，成功后淡入；上次主动隐藏时只显示音乐入口。初次失败每 30 秒后台重试，不弹出空白控件。保留拖动和位置记忆，移除恢复位置与手动刷新按钮。


### WOFF2 字体文件维护

入口仍为 `网站管理/素材/fonts/noto-sans-sc/`：`font.css` 声明分包范围，`woff2/` 存放字体，`subsets.json` 记录覆盖和大小，`OFL.txt` 保留授权。正常写文章无需重新生成，生僻字包也会按需加载。不要单独删除分包。

只有替换字体源文件或重新优化分组时才需要运行 `tools/build_font_subsets.py`。需要 Python 与 fonttools、brotli、zopfli（本地依赖放在 `.runtime/font-tools`）。脚本验证所有原有字符和可变字重轴。运行后再执行正常网站构建。


## 旧站内容迁移后的维护

原有 7 篇文章和《随笔记 · 2024—2025》已经整理到 `网站管理/文章/`。原发布日期和 abbrlink 均保留；日常分享使用自动生成的 `/p/xxxxxxxx/`，旧的 `/posts/数字.html`、`/posts/数字/` 与 `/数字/` 同时兼容。旧 `/essays/`、`/masonry/`、`/links/` 分别兼容随笔汇总、相册和友链。

文章与相册使用的旧图片、声音和早期播放器作品集中在 `素材/legacy/`。相册修改 `相册/相册.yml`，友链修改 `友链/友链.yml`；友链的 `category` 保存旧站分组。外站头像失效时自动显示名字首字。

迁移范围与清理记录见 `网站管理/导入记录.md`。根目录“待整理”在导入完成后已删除。旧教程标记为历史记录，当前网站维护请使用本手册。


### 手机端播放器与备用歌单

播放器先读取同站点 `素材/music/playlist.json`，数据准备好后显示；再在后台请求实时歌单。国内网络无法连接 Vercel 时，仍可显示最近发布的歌单。实时接口恢复后会尝试更新，后台刷新不会重置当前播放进度。实际音频仍依赖外部音源。

`npm run build` 会先运行 `tools/update-playlist.cjs`，尝试更新备用歌单；接口失败时保留现有数据并继续构建。更改歌单仍修改 `设置/播放器.yml` 后构建。兼容了不支持 AbortSignal.timeout 的移动浏览器。
