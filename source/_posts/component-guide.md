---
typora-copy-images-to: "./component-guide.assets"
short_id: "4acc5b24"
title: 文章控件手册：复制这些示例即可使用
date: 2026-11-15 11:05:00
updated: 2026-11-17
categories:
  - 文章
tags:
  - 操作指南
  - 控件
---

将下列代码写入“网站管理/文章”或“网站管理/作品”的 Markdown 正文。HTML 示例前后空一行，缩进不要超过三个空格。所有控件继承当前主题，不需要分别写颜色。

## 图片与大图预览

文章专用图片放在当前 Markdown 旁边的 `.assets` 文件夹，使用相对路径；全站共享图片仍可放“网站管理/素材”。正文示例：

```markdown
![图片说明](文章名.assets/my-photo.jpg)
```

正文图片自动启用点击大图、滚轮缩放、拖动，点击空白或 Esc 退出。作品封面在 front-matter 的 `featured_image` 设置。

## 提示块

默认信息块使用蓝色，`success` 为绿色、`warning` 为提醒、`danger` 为重要。标题自动加入对应图标。

```html
<aside class="demo-note"><strong>信息</strong><p>补充说明。</p></aside>
<aside class="demo-note success"><strong>已完成</strong><p>完成情况。</p></aside>
<aside class="demo-note warning"><strong>注意</strong><p>注意事项。</p></aside>
<aside class="demo-note danger"><strong>重要</strong><p>重要信息。</p></aside>
```

## 折叠内容

```html
<details class="demo-fold">
<summary>展开查看详情</summary>
<p>这里写需要折叠的说明。</p>
</details>
```

## 选项卡

每组的 ID 必须唯一。`aria-controls` 指向对应内容 ID，`aria-labelledby` 指向对应按钮 ID。

```html
<div class="demo-tabs">
<div role="tablist" aria-label="项目阶段">
<button id="project-a" role="tab" aria-selected="true" aria-controls="panel-a">调研</button>
<button id="project-b" role="tab" aria-selected="false" aria-controls="panel-b" tabindex="-1">设计</button>
</div>
<div id="panel-a" role="tabpanel" aria-labelledby="project-a"><p>调研内容。</p></div>
<div id="panel-b" role="tabpanel" aria-labelledby="project-b" hidden><p>设计内容。</p></div>
</div>
```

## 按钮与链接

```html
<a class="hero-link hero-link-primary" href="/work/">查看作品</a>
<a class="hero-link" href="/notes/">查看文章</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">外部网站</a>
```

主要操作使用填充按钮，次要操作使用描边。普通正文链接有下划线动效，不要给它套按钮样式。

## 单曲与歌单

使用网易云单曲或歌单链接。无需手动写入音频直链，不会自动播放；点击后调用全局播放器。全站播放器必须在“设置/播放器.yml”中启用。

```html
<div class="music-inline" data-music-player data-playlist="https://music.163.com/song?id=3956911" data-title="播放这首歌曲"></div>
<div class="music-inline" data-music-player data-playlist="https://music.163.com/playlist?id=17851162134"></div>
```

单曲卡片自动获取封面、名称和作者。读取短音源时显示试听标记，实际时长以接口返回为准。

## 表格、列表与代码

```markdown
| 名称 | 说明 |
| --- | --- |
| 主图 | 强调识别 |
| 详情页 | 强调理解 |

1. 第一步
2. 第二步

- 要点一
- 要点二
```

代码块使用三连反引号起止，在开头反引号后标记语言，例如 css、javascript、html。会自动生成固定复制按钮，双击行内代码可以直接复制。表格横向空间不足时可滚动。

## 文章目录与功能边界

文章二、三级标题会自动生成目录，作品不显示目录。无需手动填写锚点，写 `## 二级标题` 或 `### 三级标题` 即可。

目前没有接入数学公式、Mermaid 和 Redefine 的专属标签语法。本站采用上面的 HTML 控件写法。

[打开实际效果演示](/posts/theme-demo/) · [网站操作手册](/posts/website-operation-guide/)

## 当前交互细节

- 单曲卡片自动显示封面、歌曲名和作者，试听标记与歌名同排；点击切换播放／暂停，并同步全局状态。
- 全局播放器支持隐藏、恢复、拖动与位置记忆；播放列表覆盖展开，不移动控件。封面内部仅绘制已播放的白色弧线。
- 首页、作品集、文章列表、相册和友链的局部导航保留播放进度；刷新整页或打开详情新标签不是同一音频会话。
- 目录只在文章出现，点击章节定位；桌面正文与目录整体居中，目录按钮固定，小屏目录内只有条目区滚动。
- 复制按钮固定在代码窗口右上，不随代码滚动；图标与对钩同线宽切换。行内代码双击直接复制，气泡短距离上飘消失。
- 默认文字选中色随深浅色主题变化；按钮、链接不使用反色文字光标。


## 音效与录音播放器

使用普通 HTML 音频即可，页面会自动增强为网站风格的播放器；未运行 JavaScript 时保留原生控件。音效、采访、录音都适用，不需要接入全局歌单。

```html
<audio controls preload="metadata" data-title="现场录音" src="文章名.assets/录音.m4a"></audio>
```

提供播放／暂停、播放进度和时间显示，时间会自动读取音频元数据。播放一段录音会暂停其他录音和全局音乐。建议 WAV 用于短音效，较长录音用常见的 MP3 或 M4A 文件；具体格式支持取决于浏览器。

## 2026-11-17：共用卡片与链接交互

作品、文章列表、相册、友链和网站收藏由全站交互脚本自动识别，无需在每个页面再写鼠标动画。新增组件请复用现有 `.work-grid-item`、`.blog-row`、`.album-photo`、`.friend-card` 或 `.marked-card` 结构；共用动效由 `site-motion.js` 和 `site-motion.css` 维护。普通文字超链接保留细下划线展开反馈，键盘访问保留焦点提示。

图片放大按钮的波纹必须放在 `position:relative` 且裁切溢出的图片容器内，坐标按按钮实际尺寸计算，避免波纹出现在文字区域。大图模式仍使用直角图片。

收藏 favicon 使用 `partials/bookmark-icon.ejs` 共用组件；本地图标懒加载，缺失或加载失败时退回名称首字。图标不参与照片的大图与多尺寸生成流程。

收藏卡片与友链卡片共用相同圆角、浅色提亮和柔和主题色阴影，轻微上浮并根据鼠标位置倾斜；卡片标题不额外加下划线。普通文字超链接统一沿用文章中的蓝色文字、从指针位置展开的 240ms 细下划线动画，不给整块卡片套文字链接效果。
`n高亮底纹与下划线动画互斥。卡片和胶囊按钮无下划线；纯文字链接展开下划线但不增加底纹。手机封面改用自适应高度、单列布局和收敛的卡片宽度，避免矮屏裁切。
