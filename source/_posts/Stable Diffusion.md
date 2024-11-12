# Stable Diffusion 安装与配置

## 本地安装与部署

1. 系统配置要求



| 要求配置   | 最低配置  | 建议配置                   |
| ---------- | --------- | -------------------------- |
| 显卡 - GPU | GTX1050Ti | RTX3060Ti（以上）          |
| 内存 - RAM | 8GB       | 16GB硬盘空间：20GB（以上） |

- 网络连接：需要

- 操作系统：Windows、Linux、MacOS本地部署

1. 下载[Stable Diffusion整合包 - bilibili@秋葉aaaki](https://www.bilibili.com/video/BV1iM4y1y7oA/)
2. 打开`sd-webui-aki`中的`A绘世启动器`
   - `高级选项`
     1. `生成引擎`选择自己的独立显卡
     2. `显存优化`选择适合独立显卡的方案
     3. 关闭`使用共享显存`

1. 启动

   1. 在`一键启动`选项卡中点击右下角`一键启动`按钮

      

## 远程安装

1. 推荐使用[智星云 (ai-galaxy.cn)](https://gpu.ai-galaxy.cn/store)
2. 登录后，进入`算力市场`页面
3. `场景`选择`AIGC`
4. `镜像`选择`秋叶 sd webui`
5. 选择合适的方案
6. 机器启动完成后，`连接方式`中点击`windows远程桌面`
7. 点击`rdp登录文件下载`，得到`.rdp`文件后复制一下`密码`
8. 执行`.rdp`文件，粘贴`密码`完成远程桌面连接
9. 云服务器设置
   - 绘世启动器设置页找到`高级选项`
     1. 在`网络设置`-`监听设置`中启用`开放远程连接`
10. 工作完成后记得回到`智星云`-`控制台`中`结束租用`停止计费。

## 沙箱

1. 在学掌门课程中找到`SD AI 绘画环境提供`
2. 云实验**5分钟10个积点**，从**开机**开始计算消耗。密码是`51atstudy.VNC` （注意：区分大小写），除了任务“**SD AI 绘画环境提供**”提供了Stable Diffusion，其他实验未提供，想要实操请启动该任务的实验。
3. 沙箱已经提前配置好软件，启动后找到网页右上角的菜单
4. 点击`公网地址`，复制地址和端口使用`IP:Port`格式利用本地浏览器访问即可。
5. 工作完成后也记得在菜单中`关闭环境`停止计费



# 文生图基本操作

## 认识文生图界面

![](D:\Ataida\Desktop\学习笔记\imgs\文生图界面.png)

## 文生图工作流程

1. 在`Stable Diffusion 模型`中选择自己要用的大模型。
2. 选择搭配的`外挂VAE模型`，通常使用含有“840000”的那个。
3. 在`提示词`区域输入正向提示词（Prompt 想要），`反向词`区域输入反向提示词（Negative Prompt 不想要）。
4. 设置参数（采样方法、迭代步数、宽度、高度、种子等）
5. 点击`生成`按钮生成图像。

## 注意事项

- `采样方法`与`迭代步数`与大模型息息相关，可以在下载大模型的页面参考设置。

- 分辨率最小就是`512×512`了，不建议调整更小，想要放大图像一般不使用`高清修复`，会在`后期处理`面板中放大。
- 提示词引导系数通常设定不超过10，过大的CFG不会带来更好的效果
- 想要一次生成多张图像请调整`总批次数`，调整`单批次数`容易爆显存



## 选择合适的模型和参数

`Stable Diffusion 模型`指的是Checkpoint大模型也叫底模，控制画面核心的画质画风效果。通常文件较大，在[Civitai | Share your models](https://civitai.com/models)、[LiblibAI·哩布哩布AI - 中国领先的AI创作平台](https://www.liblib.art/)和[Models - Hugging Face](https://huggingface.co/models)都可以进行下载，其中“Hugging Face”没有提供预览，没有前两个网站方便，大模型文件后缀名为`.safetensors`。下载好的大模型放在`\sd-webui-aki\models\Stable-diffusion\`目录下即可，可以按模型的风格建立文件夹后再放入文件，例如`\sd-webui-aki\models\Stable-diffusion\Anime_Style\dreamshaper_8.safetensors`。



## Prompt 写作技巧

prompt是输入给绘图工具的文字描述，它可以配合不同的大模型生成对应内容的图片，prompt通常由一个或多个单词、短语组成，可以使用英文半角逗号、括号和冒号等标点符号进行分割。在Stable Diffusion中，prompt分为正向（prompt）和反向（Negative prompt）。

- 作用
  - 定义图片的基本内容
  - 调整图片的细节效果
  - 避免图片中出现不需要的内容

### 正向Prompt

理论上来说，正向prompt可以接受任意SD能够识别的内容（英文单词、少量中文、日文单词以及部分表情符号等），为了更好的控制生成的图像，正向Prompt通常包含以下内容:

```
画质+画风+构图+主体描述+背景+其他信息
```

示例：

```
prompt:masterpiece, best quality, hyper quality, extremely detailed, 8k wallpaper, realistic, RAW photo, soft lighting, film grain, high detailed skin, natural skin texture, upper body, 1 girl, blonde hair, blue eyes, red dress
negative prompt: NSFW
```



# 图生图基本操作

## 重绘幅度

负责处理新生图像与原图的相似程度

## 脚本

### X/Y/Z Plot



## 插件

### One Button Prompt

### Prompt-All-In-One

