---
typora-copy-images-to: "./如何为Windows-PC搭配自己的声音方案.assets"
short_id: "fe309eb9"
title: 如何为Windows搭配自己喜欢的声音方案
tags:
  - Windows
  - 客制化
  - Sound
categories:
  - 文章
  - 电脑美化
thumbnail: "/managed-assets/articles/fe309eb9/%E5%A6%82%E4%BD%95%E4%B8%BAWindows-PC%E6%90%AD%E9%85%8D%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88.assets/legacy/images/Lonely%20Cat-head.jpg"
excerpt: 分析Windows系统的默认声音方案，利用替换文件的方式快速更改系统声音。
abbrlink: 8968
date: '2024-12-17 03:01:12'
---

## 基本介绍

Windows 10的默认声音方案听起来很闷，我更喜欢Windows 8和Windows 7的声音方案。修改后另存为声音方案，发现无法找到声音方案的配置文件（Everything也搜不出来）应该是通过注册表之类的方式保存了声音方案。（如果能提取出来的话我直接把配置文件发出来就可以了）声音方案不可另外保存相当于无法被随时应用。由此我想到了一个比较常见的办法，通过修改文件名来替换原本的声音方案！这样就能既快速又方便的使用自己的声音方案啦！



## 结构分析

### Windows 11 专业版

<audio controls preload="metadata" data-title="Windows 11 示例音效" src="/managed-assets/articles/fe309eb9/%E5%A6%82%E4%BD%95%E4%B8%BAWindows-PC%E6%90%AD%E9%85%8D%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88.assets/legacy/sounds/Win%2011/Windows%20Foreground.wav"></audio>





<div class="demo-tabs"><div role="tablist" aria-label="Win11SoundsConfig"><button id="import-tab-1-button-0" role="tab" aria-selected="true" aria-controls="import-tab-1-panel-0">总览</button><button id="import-tab-1-button-1" role="tab" aria-selected="false" aria-controls="import-tab-1-panel-1" tabindex="-1">Windows</button><button id="import-tab-1-button-2" role="tab" aria-selected="false" aria-controls="import-tab-1-panel-2" tabindex="-1">文件资源管理器</button><button id="import-tab-1-button-3" role="tab" aria-selected="false" aria-controls="import-tab-1-panel-3" tabindex="-1">Windows 语音识别</button></div><div id="import-tab-1-panel-0" role="tabpanel" aria-labelledby="import-tab-1-button-0"><p><img src="/managed-assets/articles/fe309eb9/%E5%A6%82%E4%BD%95%E4%B8%BAWindows-PC%E6%90%AD%E9%85%8D%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88.assets/legacy/images/%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88%E7%BB%93%E6%9E%84/Win11/Windows11.png" alt="Windows_Windows 11.png"></p>
</div><div id="import-tab-1-panel-1" role="tabpanel" aria-labelledby="import-tab-1-button-1" hidden><p><img src="/managed-assets/articles/fe309eb9/%E5%A6%82%E4%BD%95%E4%B8%BAWindows-PC%E6%90%AD%E9%85%8D%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88.assets/legacy/images/%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88%E7%BB%93%E6%9E%84/Win11/Windows.png" alt="Windows_Windows.png"></p>
</div><div id="import-tab-1-panel-2" role="tabpanel" aria-labelledby="import-tab-1-button-2" hidden><p><img src="/managed-assets/articles/fe309eb9/%E5%A6%82%E4%BD%95%E4%B8%BAWindows-PC%E6%90%AD%E9%85%8D%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88.assets/legacy/images/%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88%E7%BB%93%E6%9E%84/Win11/%E6%96%87%E4%BB%B6%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E5%99%A8.png" alt="Windows_文件资源管理器.png"></p>
</div><div id="import-tab-1-panel-3" role="tabpanel" aria-labelledby="import-tab-1-button-3" hidden><p><img src="/managed-assets/articles/fe309eb9/%E5%A6%82%E4%BD%95%E4%B8%BAWindows-PC%E6%90%AD%E9%85%8D%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88.assets/legacy/images/%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88%E7%BB%93%E6%9E%84/Win11/%E8%AF%AD%E9%9F%B3%E8%AF%86%E5%88%AB.png" alt="Windows_Windows 语音识别.png"></p>
</div></div>





> 数据取自Windows 11 专业版 24H2 版本 26100.1742
>
> 体验 Windows Feature Experience Pack 1000.26100.18.0

从图上可以看出Windows 11的默认声音方案由三部分组成，其中还有很多单个文件被多处使用的情况存在，即使是简体中文版系统，也有英文名称的音频文件，对应结构如下表所示：

| 文件                               | 用途                                           |
| ---------------------------------- | ---------------------------------------------- |
| Windows Proximity Notification.wav | NFP完成                                        |
| Windows Proximity Connection.wav   | NFP连接                                        |
| Windows 用户账户控制.wav           | Windows 用户账户控制                           |
| Windows Foreground.wav             | 关键性停止，电池严重短缺警报                   |
| Windows Notify Messaging.wav       | 即时消息通知，新短信通知                       |
| Windows Background.wav             | 感叹号，星号，电池不足警报，系统通知，默认响声 |
| Windows Notify Email.wav           | 新传真通知，新邮件通知，桌面邮件通知           |
| Windows Notify Calendar.wav        | 日历提醒                                       |
| Windows Message Nudge.wav          | 消息闪屏振动                                   |
| Windows 硬件删除.wav               | 设备中断连接                                   |
| Windows 硬件故障.wav               | 设备未能连接                                   |
| Windows 硬件插入.wav               | 设备连接                                       |
| Windows Notify System Generic.wav  | 通知                                           |
| 语音关闭.wav                       | 关闭                                           |
| 语音打开.wav                       | 启用                                           |
| 语音歧义消除.wav                   | 消除歧义号码，消除歧义面板                     |
| 语音睡眠.wav                       | 睡眠                                           |
| 语音误识别.wav                     | 误识别                                         |

- 当我们需要替换整个声音方案的时候可以将文件命名成对应的然后置入`C:\Windows\Media\`目录下（不额外创建文件夹）即可

- 如果提示需要足够的管理员权限才可进行操作，可以将以下这段代码保存为`获取超级管理员权限.reg`文件，并`右键-合并`注册表。

  ```ini
  Windows Registry Editor Version 5.00
  [HKEY_CLASSES_ROOT\*\shell\runas]
  @="获取超级管理员权限"
  "NoWorkingDirectory"=""
  [HKEY_CLASSES_ROOT\*\shell\runas\command]
  @="cmd.exe /c takeown /f \"%1\" && icacls \"%1\" /grant administrators:F"
  "IsolatedCommand"="cmd.exe /c takeown /f \"%1\" && icacls \"%1\" /grant administrators:F"
  [HKEY_CLASSES_ROOT\exefile\shell\runas2]
  @="获取超级管理员权限"
  "NoWorkingDirectory"=""
  [HKEY_CLASSES_ROOT\exefile\shell\runas2\command]
  @="cmd.exe /c takeown /f \"%1\" && icacls \"%1\" /grant administrators:F"
  "IsolatedCommand"="cmd.exe /c takeown /f \"%1\" && icacls \"%1\" /grant administrators:F"

  [HKEY_CLASSES_ROOT\Directory\shell\runas]
  @="获取超级管理员权限"
  "NoWorkingDirectory"=""
  [HKEY_CLASSES_ROOT\Directory\shell\runas\command]
  @="cmd.exe /c takeown /f \"%1\" /r /d y && icacls \"%1\" /grant administrators:F /t"
  "IsolatedCommand"="cmd.exe /c takeown /f \"%1\" /r /d y && icacls \"%1\" /grant administrators:F /t"
  ```

- 如果之后**不想要该功能存在于右键菜单中**，可以将以下这段代码保存为`取消超级管理员权限.reg`文件，并`右键-合并`注册表。

  ```ini
  Windows Registry Editor Version 5.00
  [-HKEY_CLASSES_ROOT\*\shell\runas]
  [-HKEY_CLASSES_ROOT\Directory\shell\runas]
  [-HKEY_CLASSES_ROOT\dllfile\shell]
  [-HKEY_CLASSES_ROOT\Drive\shell\runas]
  [-HKEY_CLASSES_ROOT\exefile\shell\runas]
  [HKEY_CLASSES_ROOT\exefile\shell\runas]
  "HasLUAShield"=""
  [HKEY_CLASSES_ROOT\exefile\shell\runas\command]
  @="\"%1\" %*"
  "IsolatedCommand"="\"%1\" %*"
  ```

- 如果需要给额外的项目添加声音方案，也可以进入`设置-个性化-主题-声音`中进行修改，修改完成后点击`确定`即可。

- 使用于Windows11的声音方案也同样**适用于Windows10**（这两个系统的声音方案结构和对应文件名**完全相同**）



### Windows 7 专业版

<audio controls preload="metadata" data-title="Windows 7 示例音效" src="/managed-assets/articles/fe309eb9/%E5%A6%82%E4%BD%95%E4%B8%BAWindows-PC%E6%90%AD%E9%85%8D%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88.assets/legacy/sounds/Win%207/Windows%20Notify.wav"></audio>





<div class="demo-tabs"><div role="tablist" aria-label="Win7SoundsConfig"><button id="import-tab-2-button-0" role="tab" aria-selected="true" aria-controls="import-tab-2-panel-0">总览</button><button id="import-tab-2-button-1" role="tab" aria-selected="false" aria-controls="import-tab-2-panel-1" tabindex="-1">Windows</button><button id="import-tab-2-button-2" role="tab" aria-selected="false" aria-controls="import-tab-2-panel-2" tabindex="-1">文件资源管理器</button><button id="import-tab-2-button-3" role="tab" aria-selected="false" aria-controls="import-tab-2-panel-3" tabindex="-1">Windows 语音识别</button></div><div id="import-tab-2-panel-0" role="tabpanel" aria-labelledby="import-tab-2-button-0"><p><img src="/managed-assets/articles/fe309eb9/%E5%A6%82%E4%BD%95%E4%B8%BAWindows-PC%E6%90%AD%E9%85%8D%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88.assets/legacy/images/%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88%E7%BB%93%E6%9E%84/Win7/Windows7.png" alt="Windows_Windows 7.png"></p>
</div><div id="import-tab-2-panel-1" role="tabpanel" aria-labelledby="import-tab-2-button-1" hidden><p><img src="/managed-assets/articles/fe309eb9/%E5%A6%82%E4%BD%95%E4%B8%BAWindows-PC%E6%90%AD%E9%85%8D%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88.assets/legacy/images/%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88%E7%BB%93%E6%9E%84/Win7/Windows.png" alt="Windows_Windows.png"></p>
</div><div id="import-tab-2-panel-2" role="tabpanel" aria-labelledby="import-tab-2-button-2" hidden><p><img src="/managed-assets/articles/fe309eb9/%E5%A6%82%E4%BD%95%E4%B8%BAWindows-PC%E6%90%AD%E9%85%8D%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88.assets/legacy/images/%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88%E7%BB%93%E6%9E%84/Win7/Windows%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E5%99%A8.png" alt="Windows_文件资源管理器.png"></p>
</div><div id="import-tab-2-panel-3" role="tabpanel" aria-labelledby="import-tab-2-button-3" hidden><p><img src="/managed-assets/articles/fe309eb9/%E5%A6%82%E4%BD%95%E4%B8%BAWindows-PC%E6%90%AD%E9%85%8D%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88.assets/legacy/images/%E5%A3%B0%E9%9F%B3%E6%96%B9%E6%A1%88%E7%BB%93%E6%9E%84/Win7/Windows%E8%AF%AD%E9%9F%B3%E8%AF%86%E5%88%AB.png" alt="Windows_Windows 语音识别.png"></p>
</div></div>





> 数据取自Windows 7 专业版 6.1.7601
>
> 内部版本7601 Server Pack 1



## 横向文件名对比

**通过重命名成目标文件名来替换音频**（想要在Windows10上使用Windows7的声音方案需要额外添加项目）

| 中文(Win7/WinXP)               | 英文（Win8/Win8.1/Win10/Win11) |
| ------------------------------ | ------------------------------ |
| Windows 电池电量严重不足而停止 | Windows Foreground             |
| Windows 感叹号                 | Windows Background             |
| Windows 通知                   | Windows Notify System Generic  |

- 由于多项内容在新版系统中被合并，所以早期版本的音频数量与后期不一致。
