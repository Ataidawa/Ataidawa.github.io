# 在Github Pages上利用Hexo Theme快速搭建个人博客

## 前期准备

1. [GitHub 账号](https://github.com)
2. [Hexo  | Keep 主题](https://keep-docs.xpoet.cn/)

3. [Git](https://git-scm.com/)
4. [Node.js](https://nodejs.org/zh-cn)

## 安装Node.js

一切保持默认即可，可以更换安装位置。



## 配置Git

```bash
git config --global user.name "Ataidawa"
git config --global user.email "ataida2391@outlook.com"
git config --global https.proxy socks5://127.0.0.1:7897
ssh-keygen -t rsa -b 4096 -C "ataida2391@outlook.com"
```

- 配置识别名

- 配置识别邮箱

- 配置程序代理

- 生成SSH密钥

  1. 打开`%homepath%\.ssh\id_rsa.pub`
  2. 复制`id_rsa.pub`中的内容，将其贴入`Github > Settings > SSH and GPG keys > New SSH key`
  3. 点击`Add SSH key`完成添加

- 测试SSH连接

  ```bash
  ssh -T git@github.com
  ```

  首次测试会询问是否信任连接，输入`yes`后回车，出现以下内容即代表连接正常

  > Hi Ataidawa! You've successfully authenticated, but GitHub does not provide shell access.



## 配置Github远程仓库

1. ` + Create new... > New Repository`创建新的仓库
2. 设置`Repository name`为`Ataidawa.github.io`
   - 第一段为你的UserName
   - 大小写要与账户名统一
3. 其他项保持默认
4. 点击`Create repository`



## 安装Hexo与主题

1. 在想要存放博客源文件的地方打开`Git Bash`

   ```bash
   npm install -g hexo-cli
   ```

2. 等待安装完成后建立`Hexo`

   ```bash
   hexo init /d/BlogWebsite
   ```

   - init 后面追加的是工作路径，可以更改成你自己的位置

3. 等待建立完成后安装Hexo主题（我用Keep举例）

   ```bash
   cd /d/BlogWebsite
   npm install hexo-theme-keep
   ```

4. 主题安装完成后，修改`_config.yml`文件，以下列出修改项

   ```yaml
   theme: keep
   language: zh-CN
   url: https://Ataidawa.github.io
   title: "懒事阁"
   description: "一边摸鱼一边学习的日常记录本！这里放的是我学习中碰到的各种“坑”与“救命手册”，还有一些不一定马上用得上的小技能笔记。"
   ```



## 生成静态页面并上传Github

1. `_config.yml`修改完成后需要生成静态页面

   ```bash
   hexo generate
   ```

2. 生成完静态页面后可以使用这句代码进行本地预览

   ```bash
   hexo server
   ```

3. 更新内容后需要重新生成静态页面

   ```bash
   hexo clean
   hexo generate
   hexo server
   ```

   

4. aaa



