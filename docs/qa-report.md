# 改版独立回归验收报告

- 验收时间：2026-11-14
- 验收人：编程专家（执行侧，独立回归）
- 站点根目录：`D:\Github_Website`
- 本地预览：`http://localhost:4100/`（验收时使用 4100 端口）
- 验收范围：本轮改版（首页大入口 / work 页 tag 化 / 类目页摘要 / 响应式），不涉及设计方向、主题选型、部署。

---

## 一、总结论

**构建干净，改版目标全部达成，未发现必须返工的阻断性问题。** 有 3 个「建议观察项」需你（设计主导侧）定夺，均非阻断。

---

## 二、构建与环境

| 项目 | 结果 | 结论 |
| --- | --- | --- |
| `npx hexo clean` | 无报错 | ✅ |
| `npx hexo generate` | 133 files generated in 241ms，无报错、无警告 | ✅ |
| public 文件数 | 133 | ✅（与预期一致） |
| 本地服务 | 4100 端口监听正常 | ✅ |

---

## 三、逐页验收

### 1. 首页 `/`

| 检查项 | 结果 |
| --- | --- |
| Hero 求职向（badge/姓名/角色/3 段简介/3 个入口） | ✅ 完整渲染，链接正确（查看作品→#work，全部文章→/archives/，联系我→mailto） |
| 作品集大入口整块可点 | ✅ `<a class="work-entry" href="/work/">` 包裹整个区块 |
| 五张缩略图全部出现 | ✅ main-01/detail-01/store-01/kv-01/brand-01，每类各取一张 featured_image |
| 文案「5 个类目 · 11 个项目」 | ✅ 数值正确 |
| 文章紧凑列表 | ✅ 3 篇（分类「文章」），日期/标题/箭头齐全，hover 变 accent |

### 2. 作品集页 `/work/`

| 检查项 | 结果 |
| --- | --- |
| page-head 标题+副标题 | ✅「5 个类目 · 11 个项目」 |
| 五个 tag 按钮及项目数 | ✅ 3 / 2 / 2 / 2 / 2（主图设计3、详情页2、店铺视觉2、活动KV2、品牌与包装2） |
| tag 直达类目页 | ✅ 链接指向 `/categories/main-image/` 等，路径正确 |
| 「全部作品」网格 | ✅ 11 张、4 列（1440 宽度下 4 列） |

### 3. 归档页 `/archives/`

| 检查项 | 结果 |
| --- | --- |
| 归档列表 | ✅ 按年份分组，日期/标题正确 |

> ⚠️ 观察项 A：归档页会列出**全部 14 篇**（作品 + 文章混排）。而首页「全部文章 →」指向 `/archives/`，用户点「全部文章」会看到作品也混在里面。是否需要一个「只含文章分类」的列表页，由你定夺。

### 4. 类目页 `/categories/main-image/`（及 notes/detail-page/campaign-kv/store-visual/brand-package）

| 检查项 | 结果 |
| --- | --- |
| page-head「共 3 个项目」 | ✅ 数值正确 |
| 正文摘要（strip_html 后取 78 字） | ✅ 截断自然，末尾带省略号，无明显难看截断 |
| 「查看项目 →」 | ✅ 每条都有，指向文章页 |
| 残留多余横线 | ✅ 无。`.h-line-secondary` 有样式定义，且 `.post-gallery-list .h-line-secondary:last-child{display:none}` 正确隐藏最后一条 |
| 所有类目页 HTTP | ✅ 5 个类目页全部 200 |

### 5. 文章页 `/posts/*`

| 检查项 | 结果 |
| --- | --- |
| 标题/标签/日期/头图 | ✅ 正常 |
| 正文渲染 | ✅ markdown 标题、列表、段落正常 |

---

## 四、响应式验收（截图实测）

截图方式：Edge headless `--window-size=1440,H`（桌面）；390 宽度用 iframe 包裹 + 截外层（规避 Edge 492px 最小窗口）。截图存放于 `.runtime/qa-shots/`。

| 视口 | 页面 | 结果 |
| --- | --- | --- |
| 1440 | 首页 | ✅ 左右两栏正常、五缩略图完整、无溢出 |
| 1440 | /work/ | ✅ 5 tag + 4 列网格，无溢出 |
| 1440 | 类目页 | ✅ 左文右图，无残留横线 |
| 650 | 类目页 | ✅ 未被挤成窄条（.post-img 宽度覆盖仅在 min-width:689px 生效，验证通过） |
| 390 | 首页 | ✅ hero 纵向、缩略图横向滑动、无溢出 |
| 390 | /work/ | ✅ tag 两列、作品网格两列、无溢出 |
| 390 | 类目页 | ✅ 图文上下堆叠、无溢出 |

结论：协作方强调的「类目页宽度覆盖只在 min-width:689px 生效」这一坑已正确规避，650/390 下均无窄条与溢出。

---

## 五、建议观察项（非阻断，待设计主导侧定夺）

1. **观察项 A｜归档页混排**：`/archives/` 列出全部文章+作品（14 篇），首页「全部文章 →」指向它。建议新增「仅文章分类」的列表入口，或让归档页只展示文章分类。
2. **观察项 B｜字体走外网 CDN**：`head.ejs` 用 `@import url('https://fonts.googleapis.com/...Inter/Noto+Sans+SC/Roboto+Mono...')`。国内访问 Google Fonts 可能不稳定，且中文回退到系统字体后视觉会变。若要字体内聚，建议后续改为本地字体或 @fontsource。此项不影响当前验收，仅提示。
3. **观察项 C｜viewport 禁缩放**：`head.ejs` 设置 `maximum-scale=1.0, minimum-scale=1.0`，等于禁用了用户双指缩放。对无障碍（a11y）不友好，建议去掉这两个字段（仅保留 `width=device-width, initial-scale=1.0`）。这是 Frame 主题默认行为，非本轮引入。

---

## 六、边界确认

本报告仅验收、未改动任何代码/主题/内容，未执行部署、未删除文件。截图与临时 wrapper 位于 `.runtime/qa-shots/`，可随时清理。

---

## 七、复验结论（3 个观察项处理后的回归）

复验时间：2026-11-14（同轮）。结论：**3 个观察项均已正确处理，无回归，全部通过。**

### 1. 构建
`npx hexo clean + generate` 无报错无警告，public **134 文件**（较上轮 +1，新增 `/notes/`），符合预期。

### 2. /notes/ 页面（观察项 A）
- 桌面 1440：标题「文章」+ 描述「…共 3 篇」正常，三行文章列表（日期｜标题｜→）正常，**列表行右边缘与上方分隔线左右完全对齐**（`.blog-list-page` 已无 max-width，上轮右边缘错位已修复）。✅
- 手机 390：列表正常，无横向溢出。✅
- 说明：桌面截图中「→」箭头未显示属正常，`blog-arrow` 默认 `opacity:0`，仅在 hover 时浮现。

### 3. 字体本地化（观察项 B）
- `head.ejs` 中 Google Fonts `@import` 段已删除，`viewport` 注释保留。✅
- `custom.css` 顶部新增 `@font-face`：Inter（weight 100–900）、Roboto Mono（100–700），字体栈为 Inter + PingFang SC/Hiragino/微软雅黑/思源黑体/Noto，代码用 Roboto Mono。✅
- 全站 public HTML/CSS/JS 中 `fonts.googleapis` / `googleapis` / `fonts.gstatic` 残留 **0**。✅
- 字体文件 `/fonts/inter/Inter.ttf`、`/fonts/roboto_mono/RobotoMono-VariableFont_wght.ttf` 均 200。✅

### 4. viewport 缩放（观察项 C）
`head.ejs` viewport 已改为 `width=device-width, initial-scale=1.0`，`maximum-scale`/`minimum-scale` 已移除，双指缩放恢复。✅

### 5. 全站回归
- 菜单现在为 **首页 / 作品集 / 文章** 三项（`_config.frame.yml`），无多余的 Home/Archive/Gallery。✅
- 首页大入口整块可点、5 张缩略图、「5 类目 · 11 项目」均正常。✅
- `/work/` 五个 tag 项目数 3/2/2/2/2 正确，直达类目页。✅
- 1440 / 390 下无横向溢出。✅

**复验总结论：通过，无阻断问题，无需返工。**
