---
short_id: "99477ac1"
title: 部署指南：GitHub Pages、EdgeOne 与部署邮件说明
date: 2026-11-15 12:00:00
categories:
  - 文章
tags:
  - 操作指南
---

本站当前已由 GitHub Actions 构建并发布到 GitHub Pages。想增加国内访问入口，可以再将同一个 main 源码分支导入腾讯 EdgeOne Pages（部分国际页面已使用 Makers 名称），两个平台同步使用同一份内容。

## 先分清分支

- `main`：Hexo 源码、主题和“网站管理”文件夹，托管平台应从这里构建。
- `gh-pages`：已生成的静态文件快照，里面没有完整的 npm 构建环境，不要让它执行 Hexo 构建命令。

GitHub Pages 的自动发布由 `.github/workflows/pages.yml` 完成。更新 main 后，先到 Actions 查看 Build and deploy Jopolis 是否成功。

## 免费域名与访问预期

EdgeOne 提供免费计划及平台默认子域名，但默认子域名不是你独立拥有的域名，也不能承诺国内各运营商长期稳定或快速。免费计划没有可用性 SLA。正式分享前应使用手机流量与宽带分别测试。

若使用中国大陆节点，平台对自定义域名有备案要求。没有已备案域名时，先按控制台当前允许的区域使用默认域名试运行；不要将免费默认域名等同于已备案自有域名的大陆加速。长期品牌经营建议最终使用自有域名，域名注册通常需要费用。

官方依据：[免费计划与额度](https://pages.edgeone.ai/pricing) · [域名与区域说明](https://pages.edgeone.ai/document/domain-overview)。套餐和入口可能调整，以控制台为准。

## 没有账号：从注册开始

1. 中国大陆用户先打开 [腾讯云中国站](https://cloud.tencent.com/) 注册或登录，再进入 [EdgeOne Pages 中国站](https://edgeone.cloud.tencent.com/pages/) 或 [EdgeOne 控制台](https://console.cloud.tencent.com/edgeone/)。若注册区号只有香港、澳门、台湾，说明进入了国际站，应返回中国站，不要填写与本人不符的地区。涉及实名、验证码、协议或支付信息的步骤由你本人完成。
2. 创建项目，选择“导入 Git 仓库”。连接 GitHub，优先只授权 `Ataidawa/Ataidawa.github.io` 这个仓库。
3. 选择仓库和 **main** 分支，不选 gh-pages 或 Dependabot 分支。
4. 按下表填写构建配置并部署。仓库根目录已提供 `edgeone.json`，仍建议核对控制台实际识别值。

| 配置 | 填写值 |
| --- | --- |
| 框架 | Hexo；没有时选 Other／其他 |
| 项目根目录 | ./ |
| 安装命令 | npm ci |
| 构建命令 | npm run build |
| 输出目录 | public |
| Node.js | 22 |
| 生产分支 | main |

5. 等待构建成功，打开平台分配的 HTTPS 默认地址。
6. 测试首页、作品、相册、大图、字体、手机布局和播放器。音乐解析服务独立于页面托管，页面能打开不代表每首音乐都能播放。

官方构建说明：[Build Guide](https://pages.edgeone.ai/document/build-guide)。

## 后续如何同步更新

修改“网站管理”文件夹后，将改动提交并推送到 main。GitHub Pages 与 EdgeOne 的 Git 集成分别触发构建，通常不需要手动上传 public。

如果只是本地预览、没有 push，则线上不会更新。GitHub Actions 成功不代表 EdgeOne 构建也成功，两个控制台应分别检查。

主站 `_config.yml` 的 url 目前仍是 GitHub Pages 地址。先把 EdgeOne 作为镜像访问测试；确定长期主域名后，再统一调整 url 和站点分享地址，避免多个站点的标准链接混乱。

## Vercel 邮件为什么报错

旧 Vercel 项目仍连接着仓库，会尝试为分支与 PR 创建预览。`gh-pages` 是静态分支，没有 Hexo 构建依赖，执行 `hexo generate` 因此可能报 exit 127。它与 GitHub Pages 是两套独立部署。

仓库中的 `vercel.json` 已明确构建参数，并仅允许 main 的 Git 部署。若继续使用 Vercel，在项目 Settings 中确认生产分支 main、安装 npm ci、构建 npm run build、输出 public。

如果以后不再使用 Vercel，可到该项目 Settings → Git 断开仓库连接，阻止后续自动预览；不需要删除 GitHub 仓库或关闭 Pages。邮件通知开关只控制收信，不修复构建配置。旧部署、旧评论与旧邮件不会因为新配置而消失。

官方说明：[Vercel Git 部署配置](https://vercel.com/docs/project-configuration/git-configuration)。

## GitHub 横幅和 Dependabot 邮件

“gh-pages had recent pushes / Compare & pull request”是创建 PR 的建议，不是错误。不要把静态发布文件合并回 main 源码。

Dependabot 会提出依赖升级，例如 Hexo 7 → 8，这是主版本变化，应检查兼容性后再决定是否合并。关闭旧 PR 会发送一次状态通知。仓库当前按周检查并分组更新，没有自动合并。

只想减少邮件时，可以按 GitHub 个人通知偏好选择退订某条 PR 线程或调整 Watch，仍建议保留真正部署失败的提醒。

## 短链接分享

文章正式地址使用 `/p/8位ID/`，ID 保存在 Markdown 的 short_id 中，修改标题不改变地址。旧 `/posts/英文文件名/` 地址继续可用。旧站曾用的数字 abbrlink 不会被凭空还原，需要旧 ID 与文章对应表才能迁移。
