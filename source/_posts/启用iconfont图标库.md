---
typora-copy-images-to: "./启用iconfont图标库.assets"
short_id: "6117f170"
title: 如何在redefine中启用iconfont图标库
categories:
  - 文章
  - 主题改造
tags:
  - Hexo
  - Hexo-theme
  - Hexo-redefine-theme
  - iconfont
thumbnail: "/managed-assets/articles/6117f170/%E5%90%AF%E7%94%A8iconfont%E5%9B%BE%E6%A0%87%E5%BA%93.assets/legacy/images/dsftbk-head.png"
excerpt: 比起Font Awesome，我选择更适合中国宝宝体质的Iconfont！
abbrlink: 10986
date: '2024-11-27 04:07:21'
---

<aside class="demo-note warning"><strong>历史记录</strong><p>本文记录的是 2024 年旧版 Redefine 主题的配置过程，保留原始写作时间与代码。当前本站使用 Frame 定制主题，维护请查看<a href="/posts/website-operation-guide/">网站操作手册</a>。</p></aside>





<aside class="demo-note warning"><strong>提示</strong><p>本文章的处理方法是基于<code>Hexo-redefine-theme</code>版本<code>2.8.1</code>修改的。在其他版本中不保证完全生效，请自行测试。</p>
</aside>



## 注意事项

1. 本文档参考了 [Butterfly 文檔(六) 進階教程 | Butterfly](https://butterfly.js.org/posts/4073eda) ，本博客不清晰的地方可以看这篇教程。
2. 本文档参考了 [插入自定义代码 | Hexo Theme Redefine Docs](https://redefine-docs.ohevan.com/zh/inject) 的功能。
3. 需要修改主题底层文件，可以按照 [Hexo主题启用带API解析全局播放器](/posts/3334.html) 这篇文档重构网站，用于在主题更新时保留自己做的改变。
4. 可以提前备份主题文件，防止修改出现异常。

## 操作步骤

### 获取在线链接

1. [注册](https://www.iconfont.cn/register)或[登录](https://www.iconfont.cn/login)阿里巴巴矢量图标库（IconFont）。

2. 登录后在`资源管理-我的项目`中`新建项目`。

   ![新建项目](/managed-assets/articles/6117f170/%E5%90%AF%E7%94%A8iconfont%E5%9B%BE%E6%A0%87%E5%BA%93.assets/legacy/images/%E6%96%B0%E5%BB%BA%E9%A1%B9%E7%9B%AE.png)

3. 项目信息随便填，自己清楚就好。

   ![项目信息](/managed-assets/articles/6117f170/%E5%90%AF%E7%94%A8iconfont%E5%9B%BE%E6%A0%87%E5%BA%93.assets/legacy/images/%E9%A1%B9%E7%9B%AE%E4%BF%A1%E6%81%AF.png)

4. 接下来我们在iconfont中搜索想要加入的图标，点击` 添加入库`

   ![添加入库](/managed-assets/articles/6117f170/%E5%90%AF%E7%94%A8iconfont%E5%9B%BE%E6%A0%87%E5%BA%93.assets/legacy/images/%E6%B7%BB%E5%8A%A0%E5%85%A5%E5%BA%93.png)

5. 此时右上角的购物车图标会有一个红色的角标非常显眼，点击购物车图标，点击`添加至项目`

   ![加入项目](/managed-assets/articles/6117f170/%E5%90%AF%E7%94%A8iconfont%E5%9B%BE%E6%A0%87%E5%BA%93.assets/legacy/images/%E5%8A%A0%E5%85%A5%E9%A1%B9%E7%9B%AE.png)

6. 回到`资源管理-我的项目`中，在项目中即可看到我们刚刚添加的图标。请将类型从`Unicode`切换为`Font class`然后点击 `查看在线链接`

   ![获取在线链接](/managed-assets/articles/6117f170/%E5%90%AF%E7%94%A8iconfont%E5%9B%BE%E6%A0%87%E5%BA%93.assets/legacy/images/%E8%8E%B7%E5%8F%96%E5%9C%A8%E7%BA%BF%E9%93%BE%E6%8E%A5.png)

7. 第一次生成会没有在线链接，我们需要点击  `🔄暂无代码，点击生成`

8. 到这里我们就能得到一段类似这个格式的样式引用地址

   ```http
   //at.alicdn.com/t/c/font_?_?.css
   ```

   - `?`为通配符，每个人都不一样



### 插入自定义代码

1. 打开站点下的`_config.redefine.yml`文件，找到`inject`部分。默认是这个样子的：

   ```yaml
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
   ```

2. 按照要求，我们需要先启用`inject`功能，并将在线链接传入`head`部分

   ```yaml
   # INJECT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start
   # Docs: https://redefine-docs.ohevan.com/inject
   inject:
     # Whether to enable inject
     enable: true
     # Inject custom head html code
     head:
       - <link rel="stylesheet" href="//at.alicdn.com/t/c/font_?_?.css">
       -
     # Inject custom footer html code
     footer:
       -
       -
   # INJECT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end
   ```

   - 不改变类型，将在线链接传到`href`参数中即可。



### 修复`social.links`的显示异常问题

- 由于redefine主题中`social.links`是由`home-banner.ejs`文件处理的。他和iconfont提供的在线样式有**重叠**，造成了两个样式同时发挥着作用出现下图的情况：

  ![样式异常](/managed-assets/articles/6117f170/%E5%90%AF%E7%94%A8iconfont%E5%9B%BE%E6%A0%87%E5%BA%93.assets/legacy/images/%E6%A0%B7%E5%BC%8F%E5%BC%82%E5%B8%B8.png)

  ```css
  /* IconFont在线地址所提供的样式 */
  @font-face {
    font-family: "iconfont"; /* Project id ? */
    src: url('//at.alicdn.com/t/c/font_?_?.woff2?t=?') format('woff2'),
         url('//at.alicdn.com/t/c/font_?_?.woff?t=?') format('woff'),
         url('//at.alicdn.com/t/c/font_?_?.ttf?t=?') format('truetype');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-finka:before {
    content: "\e604";
  }

  .icon-coolapk:before {
    content: "\e7f2";
  }
  ```

  ![F12](/managed-assets/articles/6117f170/%E5%90%AF%E7%94%A8iconfont%E5%9B%BE%E6%A0%87%E5%BA%93.assets/legacy/images/%E9%85%8D%E7%BD%AE%E4%BC%9A%E7%94%9F%E6%88%90%E4%B8%80%E4%B8%AA%E9%95%BF%E6%96%B9%E5%BD%A2.png)

- 所以我们需要在`home-banner.ejs`中添加判断逻辑。

1. 找到处理`social_links`的部分代码，在最后的`else`**（文件第79行）**前添加一条`else if`用于判断是否使用了阿里图标库。

   ```js
   <!-- 次格式可能会引起两种嵌套存在，如icon的css中写了content后可能会存在!important，建议修改 -->
   else if(key.includes("icon-")) { %>
       <a target="_blank" href="<%- theme.home_banner.social_links.links[key] %>">
           <span class="social-contact-item <%= key %>">
           </span>
       </a>
   <% }
   ```

## 使用方式

在想要使用iconfont图标的位置使用`iconfont iconfont-name`的格式引用图标即可。如以下例子：

- 导航栏中的项目

```yaml
navbar:
  home:
    path: /
    icon: iconfont icon-home
```

- 社交链接中的项目

```yaml
iconfont icon-coolapk: https://www.coolapk.com/u/2949284
```

- 文章中的按钮

```markdown
{% btn regular::翻咔::https://www.finkapp.cn/user/finka-h-I8-wlxOJs::iconfont icon-finka %}
```

---



<aside class="demo-note "><strong>提示</strong><p>这个问题是我滴好对象帮我解决的，本人只是简单记录了处理过程，没有谈到更加原理性的内容。大家可以去看看他的博客~ <a href="https://aaronhumm-cmm.github.io/">捏捏太一の小博客</a></p>
</aside>
