# Stable Diffusion AI 绘画课程笔记

- 云实验**5分钟10个积点**，从**开机**开始计算消耗。密码是`51atstudy.VNC`，除了任务“**SD AI 绘画环境提供**”提供了Stable Diffusion，其他实验未提供，想要实操请启动该任务的实验。



## 基本认知

Stable Diffusion是一种基于深度学习的文本到图像生成模型，由Stability AI、CompVis（LMU Munich）和Runway联合开发。这种模型可以根据输入的文本描述生成高质量的图像，在计算机视觉和生成艺术领域具有重要应用。

- 模型架构：Stable Diffusion模型是基于**扩散模型（Diffusion Models）**构建的，这类模型通过逐步去噪（denoising）的过程从随机噪声中生成图像。

- 特点和优势：
  - **高质量图像生成**：相比于传统的生成对抗网络（GANs）和变分自编码器（VAEs），扩散模型能够生成更加清晰和逼真的图像。
  - **灵活性和控制性**：可以通过输入不同的文本描述来控制生成的图像内容。
  - **可本地化部署**：Stable Diffusion的本地化部署可以提供更高的安全性、灵活性和控制权，对于有特定需求的企业和个人用户来说，这是一种具有重要价值的选择。
  - **开源和可扩展性**：Stable Diffusion是开源的，研究人员和开发者可以基于此模型进行进一步的研究和应用开发。

- 商业化价值：
  - 模特换装
  - 游戏角色与图标设计
  - 电商海报与产品宣传



## 本地化安装与配置

- 系统配置要求

|    名称    | 最低配置  |            建议配置            |
| :--------: | :-------: | :----------------------------: |
| 显卡 - GPU | GTX1050Ti | RTX3060Ti以上（包括RTX3060Ti） |
| 内存 - RAM |    8GB    |              16GB              |

- 其他要求
	- 至少需要20GB可用存储空间
	- 需要保持网络连接用于下载模型和更新插件等内容
	- 操作系统支持Windows、Linux和MacOS

- 安装与部署
  - 第一个Stable Diffusion的WebUI版[由EmpireMediaScience制作的A1111-Web-UI](https://github.com/EmpireMediaScience/A1111-Web-UI-Installer/releases/)，现在已经过时，制作者本人推荐使用[LykosAI制作的StabilityMatrix](https://github.com/LykosAI/StabilityMatrix/releases)，我们推荐使用的是[来自B站大佬秋葉aaaki制作的绘世启动器](https://www.bilibili.com/video/BV1ne4y1V7QU)。
  - 下载绘世后直接解压文件夹即可。
- 设置与启动
  - 网络设置："高级选项" - "网络设置" - "监听设置"，记录监听地址和监听端口。如果Stable Diffusion部署在云端，要启用`开放远程连接`。
  - 版本设置："版本管理" -"切换"，学习过程中请使用版本1.5.1或1.5.2，因为从1.6开始界面变化比较大。
  - 启动："一键启动"



## 云平台使用

[智星云平台](https://www.ai-galaxy.cn/)

- 优点
  - 价格便宜
  - 容易上手
  - 磁盘空间足
- 缺点
  - 文件传输不便
  - 数据无法长期保存

使用步骤：

1. 登录智星云
2. "算力市场" - "场景"：`AIGC`
3. "租期"：`按分钟计费`，如果是商业用途更推荐`按天数计费`
4. "镜像"：`秋叶 sd webui`
5. 选择显卡版本、GPU数量和性能模式
6. "创建实例"
7. "连接方式"：`windows远程桌面（推荐）`
8. 点击`rdp登录文件下载`并复制`密码`
9. 打开`.rdp`文件，并粘贴密码，可勾选`记住我的凭据`



## WebUI界面

![初识SD界面](.\imgs\认识SD界面-01.jpg)

- 通过修改URL来修改界面配色

	> http://IP:Port/***?_theme=dark*** -> http://IP:Port/***?_theme=light*** 

- Stable Diffusion 模型：不同的模型对不同内容做了优化，我们可以使用`anything`模型，这是基础的自带模型。

- 外挂VAE模型：Lora模型等，在这里选择开启其他模型。

- 功能区：文生图、图生图、后期处理、PNG图片信息、模型融合等功能在本区域选择。

- 文生图：

	- 提示词：正向提示词，在图像中希望看到的内容。示例：[杰作]masterpiece, [最佳品质]best quality, [1个女孩]1girl, [金发]blonde hair, [蓝眼睛]blue eyes, [红裙子]red dress, [上半身]upper body……

	- 反向词：反向提示词，在图像中不想看到的内容。示例：NSFW

		> NSFW 是 "Not Safe For Work" 的缩写，通常用于标识那些在工作场所不适合查看的内容。这些内容通常包括但不限于以下几种类型：色情、暴力、亵渎、粗俗语言、政治敏感和其他不适合工作环境的内容（毒品、犯罪、极端主义……）

	- 预设样式：除了反向词以外，也可以通过该功能去规避一些内容。

	- 生成：按下该按钮后会开始生成图像，生成的图像在`图像生成`区域中呈现。

	- 总批次数：通过调整批次数，使一段提示词可以生成多张图像。

- 生成的图片在：`Stable Diffusion\outputs\`中，假设是文生图功能生成的图片，在`txt2Img-images`文件夹中



## Stable Diffusion界面详解

### Stable Diffusion模型

大模型（checkpoint）也叫底模型或者主模型（Base model），以`.safetensors`作为拓展名。该项决定了生成图像的风格，根据要求选择对应的模型。推荐从[C站](https://civitai.com/)和[哩布哩布AI](https://liblib-api.vibrou.com/)中获取，除此之外还有[Hugging Face](https://huggingface.co/models)。使用Checkpoint需要与基础模型版本对应，目前我们使用的是`SD 1.5`，所以需要下载基于SD1.5训练的checkpoint大模型。

![](.\imgs\C站.jpg)

大模型文件下载完成后，需要将`.safetensors`文件放在`Stable Diffusion\models\Stable-diffusion`目录下即可，为了防止模型过多后大模型混乱，可以在放置前建立文件夹，例如`Stable Diffusion\models\Stable-diffusion\Draw-2D`在`Draw-2D`文件夹内放置2D风格的大模型。

大模型不要贪多，`摄影`、`写实玄幻`、`写实游戏`、`动漫`、`Q版`、`日式`等每个风格种类的模型找1-2个即可。

![](.\imgs\大模型.png)



### LoRA模型

LoRA实际上是在底模的基础上处理控制细节，例如对服装进行微调，或者用二次元风格Checkpoint搭配国风LoRA得到国风二次元画面等。

[安装与配置]: #####什么是LoRA技术？



### HypernetWork模型

与LoRA模型相差不多，增加生图的差异性效果。



### ControlNet模型

可以帮助我们进行姿势的调整，简笔画风格等具有非常多的功能。通过调整Controlnet模型和参数，尽可能保持主体形状，在ControlNet视图中将主体轮廓清晰地呈现出来。除此之外，ControlNet也用于控制主体姿势。

#### 安装ControlNet模型

1. 在Stable Diffusion功能区中点击`扩展`按钮
2. 点击`可下载`按钮然后点击`加载扩展列表`
3. 搜索`sd-webui-controlnet`找到后点击`安装`
4. 安装完成后前往Controlnet官网下载预处理模型和控图模型。
5. 预处理模型放置在`Stable-Diffusion\extensions\sd-webui-controlnet\annotator\`目录下
6. 控图模型放置在`Stable-Diffusion\extensions\sd-webui-controlnet\models\`目录下

#### 使用CotrolNet

1. 勾选`启用`,`低显存模式`（显存高于4GB则不勾选）`完美像素模式（自动适应分辨率）`，`允许预览`
1. 在`Control Type`中选择需要的预处理类型
1. 在`预处理器`中选择预处理模型
1. 在`模型`中选择与预处理器对应的控图模型
1. 在`预处理器`与`模型`之间有一个按钮:boom:，在选择好预处理器和模型之后可点击预览处理效果（需要先打开`允许预览`）
6. 以下为参数部分（不同的处理类型选项会发生变化）
   - `控制权重`：即ControlNet权重
   - `引导介入步数`：即从x步开始controlnet参与控制生图
   - `引导终止步数`：即到x步为止controlnet不再参与控制生图
   - `Control Mode`：代表的是ControlNet与提示词的比重，`均衡`ControlNet与提示词权重相平，`更注重提示词`提示词权重更高，`更倾向于让ControlNet自由发挥`ControlNet权重更高
   - `缩放模式`：一般直接使用`比例裁剪后缩放`，由于已启用`完美像素模式`故可以不关注此项。
   - `回送`：用于迭代ControlNet模型，将渲染好的结果送回CtrolNet中，几乎不怎么用得到。

#### Control Type

- 轮廓控制类：**Canny（硬边缘，最常用）**、MLSD（直线，常用于处理建筑）、**Lineart（线稿）**、**SoftEdge（软边缘）**、Scribble（涂鸦）、Seg（语义分割`进阶`）
- 景深与光影类：**深度**、Normal（法线贴图）
- 人物姿势类：**OpenPose**
- 重绘相关：Shuffle、Tile（矩形放大）、局部重绘、IP2P、Reference、T2IA

#### 补充

- `Lineart`+`Roop`能够很好对图片人物的面部特征进行还原。
- `MLSD`只会检测直线，曲线会被忽略。`MLSD Value Theshold`会检测线条的笔直程度，数值越大保留的信息会越少；`MLSD Distance Theshold`会检测线条的长短，数值越大要求的线条越长，保留的细节越少。通常只调整`MLSD Distance Theshold`控制细节。
- 景深处理通常使用`Depth_Leres++`预处理器，该处理器擅长处理人物景深，想要处理复杂景深效果`建筑类`可以使用`Depth_Midas`
- `OpenPose`中有很多不同的预处理器，可以根据中文提示选择。
- 通过`Shuffle`预处理器可以得到图像的色彩风格，如果发现原本建筑的外观受到参考图的影响，可以调大`引导介入步数`，若效果不明显了可以调大`ControlNet权重`，如果还是会影响建筑外观可以增加ControlNet使用`MLSD`处理器保护轮廓。



### 外挂VAE模型

辅助大模型控制出图效果，暂时只用`鲜艳4 840000E`，该VAE模型属于"万金油"，给哪个大模型都可以使用。VAE的主要作用就是提升画面饱和度、对比度和色彩纯度，使画面更加鲜艳。因为VAE文件极小所以大部分Checkpoint模型会自带VAE。该模型存放在`Stable Diffusion\models\VAE\`目录下



### CLIP终止层数

主要用于处理Prompt与生成图片之间的关系，不建议调为0或太大，通常使用2即可。值越大，关联性越低。



### 迭代步数（Steps）

理论上迭代步数越高图像越精细，想要看出变化效果可以通过`X/Y/Z图表`脚本进行对比。



### 采样方法（Sampler）

不同的采样方法得到的最终结果会有差异。

- Euler：最简单，最快速的采样方法。使用Euler和Euler a方法最好迭代步数在30步以内。
- Euler a：在Euler的基础上做了改进，超过30步后画面效果不会有很明显的改善，通常迭代步数设定在20步左右。
- DPM++：需要追求好效果的选择，步数需要增加40-50步，画面会更精细。

### 面部修复

针对写实风的/照片的人脸，通常用于小分辨率图像修复人脸崩坏。一般不建议使用，建议通过调整图像尺寸精细面部绘制。



### 平铺图（Tiling）

制作背景、游戏场景等重复内容时才需要启用。



### 高分辨率修复（Hires. fix）

可以在当前分辨率的基础上提升清晰度，用于写实风画面时`放大算法`推荐使用`4x-UltraSharp`,放大倍数选2，其他可以不进行调整。需要考虑GPU是否能够承受，不推荐使用，推荐在`后期处理`功能中实现放大。



### 提示词引导系数 （CFG Scale）

与`CLIP终止层数`相似，用于控制提示词和图像的匹配程度，增加他的词会让图像与提示词更加匹配，当值过大时会导致图像色彩过曝。通常设置不超过10。



### 单批数量

一次同时生成多少张图片，需要考虑显存压力。显存不够大请使用`总批次数`功能。



### 总批次数

一张一张依次生成，达到要求张数时停止，使用总批次数不会爆显存。



### 随机数种子 （Seed）

当值为`-1`时，代表每次生成时使用的种子都不同。我们可以在图像预览区找到Seed值并复制过来，也可以通过点击:recycle:按钮直接获取上一张图的种子用于复现结果。



## Stable Diffusion 基本操作

### 文生图

#### 选择模型

在Stable DIffusion中，模型决定了图像最基本的风格，需要什么样的图像，就选择通过什么样的模型生成。有的模型可以生成不同风格的图像，例如Stable Diffusion自带的`anything`模型，此模型既可以绘制写实风格也可以绘制二次元风格。除此之外，绝大部分模型用于绘制固定的风格。



#### 网络下载大模型使用方法

将示例图片的综合信息粘贴入文生图的正向提示词输入框内，点击:arrow_lower_left:快捷读取参数功能，**注意：**提示词中如果要求了使用的模型，**请手动在`Stable DIffusion 模型`处更换为对应的模型**。



#### 提示词(Prompt)

##### 提示词(Prompt)书写规范

建议使用英文的单词、***词组（推荐）***、短句进行书写，用英文逗号`,`进行分隔。书写的提示词会以Tag的形式传给大模型。



##### 提示词（Prompt）写作技巧

Prompt是指人机交互的指令，用于告诉Stable Diffusion我们究竟想要得到什么。推荐采用单词+短语的书写风格进行描述，提示词之间使用英文逗号进行风格。理论上来说，正向提示词可以接受英文单词、少量的中文、日文单词以及一些表情符号，为了更好地控制生成的图像，正向提示词应包含以下内容：

> 画质+画风+构图+主体描述+背景（+其他信息）

1. **画质**

   用来控制出图的质量。这些画质控制词十分通用，在写实风格与卡通风格中都可以运用，在写实与摄影风格会明显展示差异。

   - ***常用的画质控制词***

     | English            | 中文         |
     | ------------------ | ------------ |
     | Masterpiece        | 杰作         |
     | Best quality       | 最佳画质     |
     | Hyper quality      | 超级画质     |
     | Extremely detailed | 超多细节     |
     | 8K wallpaper       | 8k分辨率壁纸 |

     

2. **画风**

   用来控制出图的风格，配合大模型进行使用。

   - ***写实照片风格***

     | English              | 中文           |
     | :------------------- | :------------- |
     | Realistic            | 真实的         |
     | RAW photo            | RAW胶片        |
     | Soft lighting        | 柔和灯光       |
     | Film grain           | 胶片颗粒       |
     | High detailed skin   | 高细节皮肤     |
     | Natural skin texture | 自然段皮肤纹理 |

   - ***写实照片风格***

     | English              | 中文           |
     | -------------------- | -------------- |
     | Anime                | 动漫           |
     | Comic                | 漫画           |
     | Game CG              | 游戏CG         |
     | Natural skin texture | 自然段皮肤纹理 |

   -  ***插画风格***

     | English      | 中文 |
     | ------------ | ---- |
     | Painting     | 绘画 |
     | Illustration | 插画 |
     | Drawing      | 绘图 |

   - **Q版**

     | English | 中文 |
     | ------- | ---- |
     | Chibi   | Q版  |

3. **构图**

   用于控制出图的镜头和视角，比如强调景深、物体位置等，

   - ***常见的构图***

     | English            | 中文                                 |
     | ------------------ | ------------------------------------ |
     | Close-up           | 特写                                 |
     | Upper body         | 上半身像                             |
     | Cowboy shot        | 牛仔镜头（包含上半身及膝盖以上部分） |
     | Full body          | 全身像                               |
     | From front         | 前视角                               |
     | From behind        | 后视角                               |
     | From side          | 侧视角                               |
     | From above         | 俯视视角                             |
     | High angle         | 高视角(与 俯视视角 相同)             |
     | Low view           | 低视角                               |
     | From below         | 仰视视角                             |
     | Bilateral symmetry | 左右对称                             |

4. **主体描述**

   用于控制出图的主体内容以及主体细节，如人物对象、身份、年龄、皮肤、身材、脸型、头发、表情、衣着、动作等。这部分内容可以使用常用的英文单词。如：`1boy, shota, black hair, short hair, red eyes`(1个男孩，正太、黑发、短发、红色眼睛)。

   主体描述提示词太长效果也不会很好，部分细节调整可以通过插件完成控制。

5. **背景及其他信息**

   用于控制出图的背景元素、环境、主题、场景等。例如：`castle, fountain, dusk, rainbow`(城堡、泳池、黄昏、彩虹)



##### 反向提示词（Negative Prompt）

反向提示词是控制不希望出现在图片中的内容，一般较为通用，如：色情、暴力、血腥、不正确的解剖结构、较低画质等。下面给出一段针对人物绘画的反向提示词。

> NFSW,nude, naked, porn,(worst quality, low quality:1.4), (worst quality:1.1), (low quality:1.4:1.1), （bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime）lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurrypolar,bad body,bad proportions,gross proportions,text,error,missing fingers, missing arms,missing legs, extra digit, extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands, cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality, normal quality,blurry,ugly,duplicate,morbid,mutilated,out of frame, body out of frame



##### 语法技巧

- 优先级

  1. 在Prompt中越靠前的单词、词组和短语优先级越高，优先级越高画面中的成分越重。

  2. 除了优先级，也可以通过**权重**控制画面

  	1. **`()`**

  		- 快捷键：`Ctrl+Up`，选中单词或短语后每按下1次会**增加10%**的权重。

  		- 快捷键：`Ctrl+Down`选中单词或短语后每按下一次会**减少10%**的权重。

  		- `(flowers)`：在原有的基础上为`flowers`(花)增加10%的权重。可以重复嵌套，每嵌套一层都增加10%。

  		- `(flowers:1.3)`：在原有的基础上为`flowers`(花)增加30%的权重，默认权重为1，推荐设置`0.5`到`1.5`之间，不建议过高，影响画面构成。

  		- 如何查看权重对画面产生的影响
  			- 将`(flowers:1.5)`更改为`(flowers:num)`，**num**在这里用作变量名，
  			- 使用`X/Y/Z 图表`功能，将`X轴类型`更改为`Prompt S/R`(提示词搜索/替换)，注意变量名**大小写敏感**
  			- `X轴值`为`变量名, 值1, 值2, 值3……`即`num, 0.8, 0.9, 1.3, 1.4, 1.5`

  	2. 生效时间控制

  		- **`[:]`**

  		- `[flowers:5]`：设置`flowers`元素，在**迭代步数的第5步**时开始生成。

  		- `[flowers:0.2]`：设置`flowers`元素在**生成过程中的20%位置**开始生成。(因此取值范围在`0`到`1`之间)

  		- 想要查看生效时间对画面产生的影响通过`提示词搜索/替换`功能即可。

  	3. 交替采样

  	  - `[|]`或`[:]`
  	  	- `[bird|cat]`：使`bird`和`cat`交替渲染，得到**鸟特征多一点的结果**或**猫特征多一点的结果**。
  	  	- `[bird:cat:0.9]`：使`bird`和`cat`交替渲染，**但在生成过程中的90%的位置才开始渲染猫的成分**，最后得到更具有鸟特征的结果。(因此取值范围在`0`到`1`之间)
  	  	- 想要查看交替采样对画面产生的影响通过`提示词搜索/替换`功能即可。




##### 提示词模板

提示词模板是指将自己常用的prompt保存到文件中，以便于在需要时直接使用，简化prompt的书写。Stable Diffusion默认会将模板保存在`Stable Diffusion\style.csv`文件中。

- 模板使用方式

  1. 在`预设样式`处选择提示词模板。
  2. 点击 :clipboard:将所选的预设样式插入到当前提示词之后。
  3. 调整提示词内容，移除不需要的提示词。

- 模板制作方式

  1. 编辑好提示词内容。
  2. 点击:floppy_disk:将当前提示词存储为预设样式。​
  3. 在弹出的窗口中输入样式名称。

- 修改或删除模板

  1. 打开`stable Diffusion\style.csv`文件（建议先对当前状态的`style.csv`进行备份）

     文件内容如下表所示，`name`为样式名称，`prompt`为正向提示词，`negative_prompt`为负向提示词

     | name       | prompt                     | negative_prompt                                              |
     | ---------- | -------------------------- | ------------------------------------------------------------ |
     | None       |                            |                                                              |
     | 基础起手式 | masterpiece, best quality, | lowres, bad anatomy, bad hands, text, error, missing fingers, extra  digit, fewer digits, cropped, worst quality, low quality, normal quality,  jpeg artifacts, signature, watermark, username, blurry |

  2. 想要移除某个提示词模板，选中所在行删除即可。

  3. 想要修改提示词模板内容，编辑prompt和negative_prompt单元格即可。

  4. 编辑完成后回到Stable Diffusion WebUI界面，点击`预览样式`的:arrows_counterclockwise:刷新按钮

  5. 模板修改/删除完成。



##### 提示词构建工具

- [元素法典——Novel AI 元素魔法全收录](https://docs.qq.com/doc/DWHl3am5Zb05QbGVs)

	由“[元素法典制作委员会](https://space.bilibili.com/1981251194)”制作，征集网友投稿，没事的时候可以看看。

- [Danbooru 标签超市](https://tags.novelai.dev/)

	由“[wfjsw ](https://github.com/wfjsw)”制作，覆盖面非常广！目前(2022-12-08)共收录 3135 个标签，共 1444 个标签有配图。 共收录 21 组预设标签、22 个嵌入模型、2 个超网络模型。

- [魔咒百科词典](https://aitag.top/)

	由“[波西BrackRat](https://space.bilibili.com/12391388)”制作

- [Stable Diffusion Prompt Book](https://openart.ai/promptbook)

	国外网站，“OpenArt”管理，最后一次更新2022-11-13，已下载[PDF](.\accessories\Stable Diffusion Prompt Book From OpenArt 11-13.pdf)

- [Stable Diffusion Prompts](http://sd.firstool.online/)

	SD提示词生成器

	

#### LoRA和Embedding模型

文生图使用的大模型`checkpoint`可以对出图的效果、风格等进行控制，但单纯的大模型存在不足，主要有以下几个方面：

- 训练和生成速度慢

- 内存消耗大

- 文字描述的理解和表达能力有限

  

##### 什么是LoRA技术？

LoRA是一种利用低秩矩阵分解来加速模型训练和生成的技术，这是微软研究人员为了解决大语言模型微调而开发的一项技术，它的基本思想是在不改变原始模型的情况下，只训练一部分的权重矩阵从而实现模型的快速适应和优化。LoRA可用于以下场景：

- 画面质量改进（细节调整方向）

- 风格\美学控制（不同画师）

- 特定人物（名人或虚拟人物）

- 衣物或物品（汉服、唐装等）

- 场景设置（建筑等）

  


##### 什么是Embedding技术？

Embedding嵌入技术是一种将文字描述转换为高维向量的技术，可以将Embedding视作编译好的prompt模板且重心在negative_prompt（反向提示词）中，最常用的Embedding包括`EasyNegative`、`BadHand`等，主要用于控制负面效果。



##### LoRA与Embedding的获取方式

与大模型相同，可以从[C站](https://civitai.com/)和[哩布哩布AI](https://liblib-api.vibrou.com/)中获取。打开筛选器，在`Model types`（模型类型）中选择`LoRA`和`Embedding`即可。（如果已经勾选了`Checkpoint`模型请去掉）在`哩布哩布AI`中，`Embedding`模型叫做`Textual Inversion`请注意筛选。



##### LoRA与Embedding模型的安装

1. 打开`Stable Diffusion`根目录
   - 将LoRA模型放入`Stable Diffusion\models\Lora\`目录下
   - 将Embedding模型放入`Stable Diffusion\embeddings\`目录下
2. 点击模型旁边的:arrows_counterclockwise:按钮或直接重启Stable Diffusion WebUI



##### 如何调用LoRA模型

在`文生图`功能中写好正向提示词后，点击:flower_playing_cards: 显示/隐藏扩展模型按钮，在展开的扩展模型界面选择`LoRA`板块，单击需要调用的LoRA模型，即可将LoRA模型加入到正向的Prompt中，此时正向提示词末尾会追加如下一段代码：

```xml
<lora:真IP设计动物版:1>
```

> `lora:`代表这是LoRA模型，`真IP设计动物版`代表模型的名称（部分模型还会有版本名称）,`:1`代表LoRA对应的权重，通常都在0到1之间，可以根据出图效果自行设置。

LoRA模型会有自己对应的效果最好的大模型，在下载LoRA模型时也要注意自己是否拥有对应的大模型，例如`真IP设计动物版`的LoRA模型，对应的是`X潮玩`，大模型文件需要放在`Stable Diffusion\models\Stable-diffusion\`目录下。



### 图生图

用已经存在的图像生成新的图像。

#### 反推提示词

通过已经存在的图片推测提示词，当图像比较复杂时，反推的时间也会变长。以下是操作步骤：

1. 假设图片由`文生图`功能提供，可直接点击图像预览区的`发送到图生图`

2. 如果自己准备的图片，可手动切换到`图生图`选项卡，然后上传图片

3. 在prompt位置的右边，有`CLIP反推`和`DeepBooru反推`按钮

  - CLIP反推：反推出来的提示词更接近书写风格，一段完整的语句,**推荐用于写实风格图像。**例如下面这段：

  	 a naked woman holding a stick in a dark alleyway with a bicycle in the background and a building in the background, 

  - DeepBooru反推：反推出来的提示词更接近程序的风格，以Tag的方式呈现，**推荐用于二次元动漫风格图像。**例如下面这段：

  	> 1boy,ass,back tattoo,black hair,blood,blood on face,blood on hands,blood on weapon,blurry,blurry background,blurry foreground,bruise,cuts,depth of field,dripping,from behind,greyscale,holding,holding weapon,injury,looking at viewer,looking back,male focus,monochrome,nude,pool,short hair,solo,standing,tattoo,wading,water,weapon,wet,wet hair,

4. 提示词生成完成后可点击`生成`按钮，检查是否与原图类似。



#### 涂鸦

通过对图形的处理，间接让Stable Diffusion明白用户想要的效果。通过对图像中一部分的内容进行涂抹搭配提示词让stable Diffusion局部重绘。通常涂鸦工具加载会出现问题，可以尝试直接上传至局部重绘功能，也可直接使用涂鸦工具。用户也可以将图片在其他软件处涂鸦完成后通过`上传重绘蒙版`的方式，也能被正确识别。



#### 局部重绘

通过涂抹想要重绘的位置加上内容描述提示词，请先将`重绘幅度`调制0.5左右，再根据画面实际情况细调，最后得到满意的结果。



#### 与PhotoShop协同工作

1. 假设我要的素材**需要纯色的背景而SD无法正确生成**，可以将SD生成的结果导入PS中，利用`套索`/`钢笔`等工具勾勒主体轮廓从而达到去除原图背景的目的。
2. **通过线稿生成完整图像**。可以将线稿上传至PS，给主体添加边缘蒙版（防止上色的时候溢出区域）。通过正片叠底的方式给材质上色，颜色最好与材质颜色相近，也考虑光照效果暗的地方颜色深一些，亮的地方颜色浅一些。绘制完成后上传到SD的`图生图`功能区，并写好提示词（是什么东西，有什么材质，什么地方由什么构成等）。注意一下`重绘幅度`，推荐在0.4左右。 
3. **单张的图像不理想**，可以将多张图复制给PS，利用`钢笔`工具勾出每张图中想保留的部分，用`蒙版`的方式保留下来。得到的结果有瑕疵可以在完成后通过`图生图`功能再次优化，记得降低`重绘幅度`，推荐在0.1左右。如果还不满意，可以再复制给PS，利用第一步的主体边缘蒙版，通过画笔涂抹调整形成合适的新蒙版。
4. 也可以通过[Poe](https://poe.com/)（次数制度，每天大概生成100张）和[Microsoft Designer 的图像创建器](https://www.bing.com/images/create)（积点制度，每天大概10积点）生成图像然后导入PS或者SD优化结果，使其更符合自己的预期。



#### 保持角色一致性

- 使用九宫格生图

  1. 高质量画质 + 提示词`(a character sheet of a woman from different angles with a grey background:1.2), red hair, eyes open, black leather jacket`+<LoRA模型(细节调整 add_detail):0.8>

     > 提示词翻译：(一张从不同角度拍摄的女性人物表，灰色背景:提高20%权重)，红色头发，睁着眼睛，黑色皮衣

  2. 生成分辨率设为`1536×1536`，提高迭代步数（大约30步左右）

  3. 打开ControlNet模型设置:

     - 添加“人物姿势”图并勾选`完美像素模式`和`允许预览`，控制类型选择`OpenPose`(姿态)，预处理器选择`openpose_faceonly`(OpenPose仅脸部)。
  
       ![](.\imgs\人物姿势.png)
     - 添加“网格”图并勾选`完美像素模式`和`允许预览`，控制类型选择`Lineart`(线稿)，预处理器可以随意选择，这里选择了`lineart_realistic`(写实线稿提取)。
  
       ![](.\imgs\九宫格.png)
  
  4. 将生成的图片发送给`后期处理`板块，缩放比例设为`2`，Upscaler 1和Upscaler 2都选择`4x-UltraSharp`



- 使用“名字”生图

  1. 高质量画质 + 提示词`1 asian girl, (Cystal Cheng:1.5), wearing gorgeous full-body silver armor, upper_body, teen, black hair, black eyes, freckles, Contour Lighting, Volumetric Lighting, Cinematic Lighting, blurred background`

     > 提示词翻译：1个亚洲女孩，(Cystal Cheng“虚拟的名字”:提高50%权重)，身穿华丽的全身银色盔甲，上半身，少女，黑色头发，黑色眼睛，雀斑，轮廓照明，体积照明，电影照明，模糊背景

  2. 反向提示词`Euphorbiaceae species`

     > 提示词翻译：欧美人种

  3. 迭代步数提高至30步左右

     

- 训练LoRA模型

  1. 先选出理想的图片（例如：面部特征一致且都为上半身图像）
  
  2. 找到`训练`功能区，打开`图像预处理`选项卡
     - 该功能并不能直接训练LoRA，通常用于训练Embedding
  
  3. 设定`源目录`，即选出的图片所在目录，例如：`D:\Ataida\Pictures\LoRA Pictures`
  
  4. 设定`目标目录`，即输出的目录，例如`D:\Ataida\Desktop\LoRA Output`
  
  5. 按照原始图像设定分辨率，例如：`宽度`为512，`高度`为512
  
  6. 选中`使用 Deepbooru 生成标签`
     - 不选择`使用 BLIP 生成标签（自然语言）`是因为我们需要对生成的标签进行删减处，使其只有外貌特征的描述词，自然语言不容易处理。
  
  7. 选中`自动面部焦点剪裁`
     - 如果不全是面部细节的图片，可以通过这个功能采集面部
  
  8. 点击`预处理`
  
  9. 当显示`Preprocessing finished.`则代表预处理完成。
  
  10. 前往`目标目录`，处理每张图对应的`文本文件`，从`文本文件`中删除提示词内与图像不相符的内容以及不需要的描述（例如服装上的细节）
  
  11. 处理完成后，下载[`LoRA训练包`](https://www.bilibili.com/read/cv31254871)
  
  12. 在`LoRA训练`-`新手`界面中
  
      1. `训练用模型`-`pretrained_model_name_or_path`，点击右侧:file_folder:按钮，选择训练LoRA所基于的底模，**注意：路径不支持中文​**
      2. `数据集设置`-`train_data_dir`，点击右侧:file_folder:按钮，选择我们处理好的提示词和图片所在的文件夹
      3. `数据集设置`-`resolution`，设置好分辨率，按原始图片的尺寸设置即可
      4. `保存设置`-`output_name`，设置LoRA模型的名称
      5. `保存设置`-`output_dir`，设置LoRA模型的保存位置
      6. `保存设置`-`save_every_n_epochs`，轮次最大的效果不一定最好，假设训练10轮，那就每2轮保存一次模型，最后去对比哪个效果最好。
      7. `训练相关参数`-`train_batch_size`，训练的轮次越多，批次越大，文件也会越大，LoRA的效果越好，但非常花时间。
  
  13. SD`文生图`功能中，利用`X/Y/Z plot`脚本对比同一批的每一个LoRA模型哪个效果最好,假设5个Lora模型需要对比效果，可按下图设置
  
      > X轴类型：Prompt S/R	X轴值：INDEX, 2, 4, 6, 8, 10
      >
      > Y轴类型：Prompt S/R	Y轴值：WEIGHT, 0.2, 0.4, 0.6, 0.8, 1
      >
      > 注：INDEX变量用于切换LoRA模型，WEIGHT用于切换模型权重，LoRA公式为``<lora:LoRAtest-INDEX:WEiGHT>``
  
  14. 一般LoRA权重给`0.6`至`0.8`左右，面部的相似程度还需要自行比较。



#### 模特换装

- 主要利用`图生图`的`局部重绘`功能，用假人替换为真人模特，将假人试衣的图片导入PS。

  1. 使用`魔棒`工具选中假人的身体部分，`Shift+单击`加选，`Alt+单击`减选。

  2. 将选区赋给蒙版，检查模特的身体部分是否完全被选中。如果边缘不理想，利用画笔工具涂抹蒙版直到展示出假人模特外露的身体，调整不需要非常精确，但需要只有假人模特的身体，不要出现背景或衣着装饰。(画笔描绘蒙版的颜色：黑色隐藏，白色显示，灰色半透明)

  3. 调整好之后，将黑白蒙版复制到新的图层，检查白色的区域是否完整并导出PNG

  4. 打开SD的`上传重绘蒙版`功能，将原始图像和蒙版图像上传。

  5. 在`重绘尺寸`处点击:triangular_ruler:，让SD读取图像尺寸​。

  6. `蒙版模式`选择`重绘蒙版内容`

  7. `重绘区域`选择`仅蒙版区域`

     - `整张图片`：不只是蒙版区域，也会影响到蒙版周围的区域，整体融合情况会更好。
     - `仅蒙版区域`：精细程度会更高。

  8. 正常给出高画质+提示词、采样方法与迭代步数。注意真人形象会受背景影响，例如与背景相似的发色，假人特征的穿着等。

     > 1 girl, (blond long hair:1.4), red eyes, 

  9. `重绘幅度`，先改为`0.5`再根据实际效果调整数值。

  10. 效果不理想时，使用ControlNet进行控制

      1. 勾选`启用`、`上传独立的控制图像`、`完美像素模式`和`允许预览`
      2. `控制类型`选择`OpenPose`（姿态）
      3. `预处理器`选择`openpose_full`（全身）

  11. 仍然不理想，请尝试切换`Stable Diffusion 模型`

  12. 最后可以保存多张部分符合需求的图片，导入PS拼出符合预期的结果。

      1. 将选择好的“头”的图片导入PS，框选头的区域，删除其他区域。
         - 利用蒙版扣出“头”
         - 使用仿制图章涂抹脖子，使其不突兀呈现，过渡自然。
         - 没有满意的“头”可以在**图像拼合完成后**，通过`局部重绘`涂鸦头部区域，让SD重新生成。
      2. 将选择好的“手”的图片导入PS
         - 如果实在没有好的手部，可以考虑调整ControlNet的Pose数据（在`预处理结果预览`处点击`编辑`，编辑完成后点击`发送姿势到ControlNet`
         - ControlNet效果不好也可以选择给模特穿上手套（关闭ControlNet）。
      3. 将选择好的“鞋”的图片导入PS（可以调大重绘幅度生成新的图片）
         - 扣出鞋子的轮廓



## 脚本

### X/Y/Z 图表(X/Y/Z plot)

方便进行各种设定和参数的对比

**使用方法**：

1. 在"脚本"处选择"X/Y/Z 图表"（X/Y/Z plot）
2. 设置XYZ其中两个的轴类型，假设想要研究的是`采样方法与迭代步数对图像效果的影响`
   1. 将`X轴类型`设定为`采样方法`，`X轴值`设定为`Euler`、`LMS`、`Heun`、`DPM2`……可按下右侧黄色方块按钮一键全选
   2. 将`Y轴类型`设定为`Steps`（迭代步数），`Y轴值`设定为`1`、`5`、`10`、`20`……
   3. 不要设置太多`X轴值`和`Y轴值`，因为会进行相乘操作，假设XY轴值各有3个，则会跑9张图。
3. 设置好后回到页面顶部，点击`生成`按钮

**呈现效果**：

![XYZ结果](.\imgs\XYZ.png)



### 提示词矩阵(Prompt matrix)

用竖线分隔符(|)将提示词分成若干部分，脚本将为它们每个可能的组合创建一个图像（始终保留提示的第一部分，使用相同的种子）

注意网格图边距需要设置一定大小，让两张图中间有一定尺寸的边界线。

![](.\imgs\Prompt matrix-1.jpg)

如上图所示分隔提示词，再按下图所示设置脚本。

![](.\imgs\Prompt matrix.jpg)

**呈现效果**：

![](.\imgs\Prompt matrix-2.png)



## 插件

在`功能区`找到`拓展`面板。在`可下载`中点击`加载扩展列表`，找到自己想要的插件后点击`安装`即可。也可以在`绘世启动器-版本管理-安装新拓展`中安装插件。如果在线下载遇到困难，也可以找到离线包解压到`stable diffusion\extensions\`目录下，解压完成后请**重启Stable Diffusion WebUI让插件生效**。



### 一键生成提示词(One Button Prompt)

一款能自动生成和填写prompt的插件，能在给出基本信息的前提下，对该主题进行拓展并自动生成复杂的提示词。下载地址：[GitHub - AIrjen/OneButtonPrompt](https://github.com/AIrjen/OneButtonPrompt)

**使用方法**：

1. 在`脚本`处找到`One Button Prompt(一键生成提示词)`



#### 一体化提示词(sd-webui-prompt-all-in-one)

该插件与WebUI集成，不需要单独安装插件。下载地址：[GitHub - Physton/sd-webui-prompt-all-in-one:](https://github.com/Physton/sd-webui-prompt-all-in-one)

**使用方法**：

1. 使用中文编写提示词后，点击提示词下方的`translate`图标，一键全部翻译成英文。

2. 提示词会以`Tag`的形式在输入框下方展示，鼠标悬停在tag上可以修改提示词权重

3. 双击`Tag`可以隐藏提示词，单击`Tag`可以修改提示词内容。

4. 提示词输入框下方有很多tag集合，按照需求点选自己想要的词。

5. ChatGPT如果不使用API，也可以通过给出的预设训练一个简单的Prompt助手。

   > StableDiffusion是一款利用深度学习的文生图模型，支持通过使用提示词来产生新的图像，描述要包含或省略的元素。
   > 我在这里引入StableDiffusion算法中的Prompt概念，又被称为提示符。
   > 下面的prompt是用来指导AI绘画模型创作图像的。它们包含了图像的各种细节，如人物的外观、背景、颜色和光线效果，以及图像的主题和风格。这些prompt的格式经常包含括号内的加权数字，用于指定某些细节的重要性或强调。例如，"(masterpiece:1.5)"表示作品质量是非常重要的，多个括号也有类似作用。此外，如果使用中括号，如"{blue hair:white hair:0.3}"，这代表将蓝发和白发加以融合，蓝发占比为0.3。
   > 以下是用prompt帮助AI模型生成图像的例子：masterpiece,(bestquality),highlydetailed,ultra-detailed,cold,solo,(1girl),(detailedeyes),(shinegoldeneyes),(longliverhair),expressionless,(long sleeves),(puffy sleeves),(white wings),shinehalo,(heavymetal:1.2),(metaljewelry),cross-lacedfootwear (chain),(Whitedoves:1.2)
   >
   > 仿照例子，给出一套详细描述以下内容的prompt。直接开始给出prompt不需要用自然语言描述：



### maple的tag选择器（maple-from-fall-and-flower）

帮我们提供了学习他人Tag设计的工具，可以借助这种方式快速生成足够美观的画面。这个插件帮助我们不借助外来网站和文档快速完成Tag创建。



### 快速上色器（Inpaint Anything）

可以快速生成蒙版



### 换脸（roop）



## 实际运用

### 生成游戏图标

1. 通过文生图生成`主体+纯黑色背景`的图片（例如宝箱+纯黑色背景）
2. 将图片导入PS，移除主体之外的内容，扣除黑色背景并保留主体轮廓。
   - 利用蒙版工具，保留主体内容
   - 在蒙版中使用黑白画笔调整边缘
   - 合并图层后导出透明背景的PNG
3. 将图片导入ControlNet，使用Canny模型，调整参数保护主体姿态
4. 如果已经拥有线稿，可以使用PS给图片上色，使用与目标材质相似的颜色方便处理。可以使用深色简单处理一下光影效果。
5. 上色完成后利用蒙版扣出外轮廓。
6. 利用图生图功能，添加合适的描述多生成几张结果，取出其中效果好的地方最后拼成一张不错的结果。
7. 想要做同系列内容，需要保留种子和参数，利用ControlNet中的Canny保留物品外观轮廓，修改提示词中的颜色与细节描述即可。



### 生成游戏角色

1. 主要使用文生图功能描述外观
2. 重点放在面部细节，给人留下深刻的印象
3. 使用Roop换脸插件保持角色一致性，通过[ #### 保持角色一致性 ]的内容处理角色。
4. 使用`DPM++ 2M SDE Karras`迭代器迭代30-50步优化结果
5. 炼制LoRA模型保持角色一致性



### 更换服装模特

利用`Inpaint Anything`来处理图片

1. 在SD中切换到`Inpaint Anything`选项卡
2. 将原图置入`Input Image`
3. 设置`Segment Anything 模型`，其中含有`h`代表的是大模型；`l`代表的是中等模型；`b`代表的是小模型。模型越大则蒙版绘制越精准，解析速度也越慢。
4. 尽量选择工作量最少的改变方式，如只更改面部特征等。
5. 在蒙版预览区使用`涂鸦`笔点击想要创建蒙版的区域然后点击`Create Mask`
6. 在左侧找到`仅蒙版`选项卡，点击`获取遮罩`，最后点击`发送到图生图重绘`，在提示词区域描绘模特面部特征，以及其他需要被改变的地方。
7. 检查手部、服装是否存在问题，在PS中进行调整修复。
8. 想要调整背景的话要进入`Inpaint Anything`选项卡，重新生成一下蒙版，使用涂鸦工具选择背景部分蒙版即可，记得不要有遗漏角落，如果背景被人物隔开，需要左右两边都点一次。
9. 如果插件处理不理想，也可以单独下载遮罩，在PS中通过填充不同的颜色修复遮罩。
10. 使用`上传重绘蒙版`功能上传处理好的蒙版，并编写描述背景的提示词。



### 无中生有模特试装

1. 将原本半人假模特的图片扩展到`3:4`左右,不要让图片纵横比太大
2. 在PS中给半身假人移除支撑架部分。
3. 利用`Inpaint Anything`获取遮罩，点选容易选择的服装部分
4. 在`图生图`功能中描写人物细节的提示词，在`蒙版模式`中选择`重绘非蒙版内容`。
5. 人物生成效果不理想可以使用ControlNet的`OpenPose`处理器，使用`dw_openpose_full`（二阶蒸馏 - 全身姿态估计）预处理器来生成全身姿态。



### 电商宣传海报

1. 在PS中新建画板，使用一半尺寸方便Stable Diffusion进行生成，在画板上绘制LOGO图案。
2. 在Stable Diffusion中利用提示词绘制背景
3. 添加ControlNet置入PS中做好的Logo，使用`Canny`（硬边缘）处理器（如果白底黑色Logo需要使用带Invert的预处理器）
4. 添加ControlNet使用`Deepth`（深度）处理器让Logo融入背景
5. 生成的海报不够精致的话可以考虑添加电商用的LoRA模型（例如 3D梦幻场景）
6. 选择满意的结果后将图片置入`后期处理`功能中，放大至原来的两倍
7. 将图片保存下来，传回PS中添加文字和处理细节。



### 电商产品海报

1. 在PS中选中商品背景填充黑色，商品主体填充白色使其成为蒙版，也可以在`Inpaint Anything`中制作蒙版。
1. 在Stable Diffusion`文生图`中描绘画面背景。
1. 在Stable Diffusion中添加ControlNet，`Canny`处理器加载产品原图，通过调整Thershold阈值，尽量在轮廓清晰的情况下保留产品材质纹理。
1. 产品看上去没有厚度可以添加ControlNet，`Deepth`处理器。
1. 记得预留其他元素的区域，不要将产品占满画面。
1. 效果还是不行的话可以先关闭ControlNet，生成展示画面和背景。
1. 通过PS将产品调整好大小放在画面的合适位置中，去除背景导出白底产品图。
1. 利用SD的`图生图`功能，保留背景的提示词。
1. 添加ControlNet，`Canny`处理器加载导出的白底图片，保证产品外观和纹理。
1. 添加ControlNet，`Deepth`处理器加载导出的白底图片，生成产品厚度。
1. 选择好结果通过`后期处理`放大图片尺寸，再导入PS中修复。
1. 一部分一部分地处理产品，利用图层混合模式得到最好的结果。



### 老照片修复

1. 将老照片导入PS
2. 先截取拉正要处理的人像部分。
3. 然后使用仿制图章工具修复照片中的破损或污渍。
4. 修复照片的网纹情况
   1. 先将照片`去色`。
   2. 复制去色后的照片添加`反相`效果。
   3. 将反相结果的图层的混合模式改为`线性光`
   4. 给反相图层添加`滤镜`-`高反差保留`，参数大约设置在`1`左右，网纹效果几乎不可见。
5. 将PS导出的照片导入SD的图生图功能中，使用较低的`重绘幅度`尝试去除图片中的污渍与杂质。
6. `将图片发送到后期处理`，如果原图尺寸就已经很大了可以考虑不再放大，通过调整`GFPGAN 强度`来刻画人物面部细节。
7. 再将处理好面部的图片发送回`图生图`，使用`局部重绘`功能，绘制头发，并填写相应的提示词产生头发纹理。
8. 如果有生成效果不好的细节，可以传给PS处理。
9. 再次`发送到 重绘`制作人物的服装遮罩，（如果衣领较大可以先处理衣领）
10. 衣服效果不好可以通过`滤镜`-`USM 锐化`和`色阶`功能对衣服单独调整。
11. 可以给整张图片加一点点`智能锐化`处理头发的纹理。
12. 传给Stable Diffusion的`后期处理`功能中做一点放大，让整个画面色彩平衡并拥有细节。



### 生成皮克斯风格的数字人形象

1. 先利用皮克斯风格大模型生成图像，可以不用在意面部情况。
2. 四肢和背景符合要求后通过Roop换脸插件替换图像面部。
3. 利用ControlNet更改角色姿势。



### 线稿上色

1. 在`文生图`选项卡中，添加ControlNet，置入线稿图片
2. 在ControlNet中使用`Lineart`+`Canny`搭配带有颜色描述的提示词效果最好。
3. 如果想要修改某些地方的颜色，可以通过`Inpaint Anything`插件，通过蒙版重绘的方式修改与提示词来完成。
4. 效果不理想的话也可以尝试在PS中完成颜色调整。
   - 将想要修改的地方创建一层蒙版
   - 图层模式改为`线性光`
   - 新增图层样式`颜色叠加`来完成色彩的修改
   - 将PS中调整好的图像提交给图生图柔化过渡边缘。
