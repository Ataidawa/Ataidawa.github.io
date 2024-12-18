---
title: 如何为Windows搭配自己喜欢的声音方案
tags:
  - Windows
  - 客制化
  - Sound
categories:
  - 电脑美化
thumbnail: images/Lonely Cat-head.jpg
excerpt: 分析Windows系统的默认声音方案，利用替换文件的方式快速更改系统声音。
abbrlink: 8968
date: 2024-12-17 03:01:12
---

## 基本介绍

Windows 10的默认声音方案听起来很闷，我更喜欢Windows 8和Windows 7的声音方案。修改后另存为声音方案，发现无法找到声音方案的配置文件（Everything也搜不出来）应该是通过注册表之类的方式保存了声音方案。（如果能提取出来的话我直接把配置文件发出来就可以了）声音方案不可另外保存相当于无法被随时应用。由此我想到了一个比较常见的办法，通过修改文件名来替换原本的声音方案！这样就能既快速又方便的使用自己的声音方案啦！



## 结构分析

### Windows 11 专业版 

> <audio controls src="\sounds\Win 11\Windows Foreground.wav"></audio>



{% tabs Win11SoundsConfig %}

<!-- tab 总览 -->

![Windows_Windows 11.png](images\声音方案结构\Win11\Windows11.png)

<!-- endtab -->
<!-- tab Windows -->

![Windows_Windows.png](images\声音方案结构\Win11\Windows.png)

<!-- endtab -->

<!-- tab 文件资源管理器 -->

![Windows_文件资源管理器.png](images\声音方案结构\Win11\文件资源管理器.png)

<!-- endtab -->

<!-- tab Windows 语音识别 -->

![Windows_Windows 语音识别.png](images\声音方案结构\Win11\语音识别.png)

<!-- endtab -->

{% endtabs %}



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

> <audio controls src="\sounds\Win 7\Windows Notify.wav"></audio>



{% tabs Win7SoundsConfig %}

<!-- tab 总览 -->

![Windows_Windows 7.png](images\声音方案结构\Win7\Windows7.png)

<!-- endtab -->
<!-- tab Windows -->

![Windows_Windows.png](images\声音方案结构\Win7\Windows.png)

<!-- endtab -->

<!-- tab 文件资源管理器 -->

![Windows_文件资源管理器.png](images\声音方案结构\Win7\Windows资源管理器.png)

<!-- endtab -->

<!-- tab Windows 语音识别 -->

![Windows_Windows 语音识别.png](images\声音方案结构\Win7\Windows语音识别.png)

<!-- endtab -->

{% endtabs %}



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
