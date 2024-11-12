# 任务 04 、文生图进阶：深入掌握prompt的写作技巧

## 一、任务概述

文生图是一种通过文字描述生成图像的技术，它可以让创作者快速将想象中的场景或物体呈现出来，是一种非常有趣和有用的创作工具。

本任务通过案例展示了文生图技术在以下方面的进阶应用：

1. 使用prompt的基本内容与语法技巧来控制图像生成的效果
2. 保存和调用自己的prompt模板来复用和分享自己的prompt
3. 使用prompt常用插件来增加图像生成的多样性和灵活性

本任务使用了STABLE DIFFUSION这个强大的AI绘画工具，它可以根据输入的文字描述生成高分辨率、高质量、高多样性的图像。因此，利用不同的prompt，可以生成不同效果的图像，本次任务会讨论如何利用prompt控制图像效果细节、prompt模板的保存和调用以及几个常用的prompt插件的使用。

**任务案例：**

- 一位女性宇航员在太空舱里

  ![image-20231025053011059](images/image-20231025053011059.png)

- 一位魔法师手持闪电锁链

  ![image-20231025052610947](images/image-20231025052610947.png)

## 二、任务目标

1. 通过案例说明文生图技术可以通过使用prompt的基本内容与语法技巧来控制图像生成的效果
2. 通过案例说明文生图技术可以通过保存和调用自己的prompt模板来复用和分享自己的prompt
3. 通过案例说明文生图技术可以通过使用prompt常用插件来增加图像生成的多样性和灵活性

## 三、任务步骤

### step 01、文生图技术使用prompt的基本内容与语法技巧

#### 1）了解prompt

##### （1）什么是prompt？

prompt是指输入给AI绘画工具STABLE DIFFUSION的文字描述，它可以配合不同的大模型生成对应内容的图片。prompt通常由一个或多个单词或短语组成，可以使用逗号，括号，冒号等标点符号进行分隔。STABLE DIFFUSION的prompt分为正向和反向prompt，前者用来控制我们希望看到的内容，后者则用来控制我们不希望看到的内容。

##### （2）prompt有什么作用？

prompt有以下作用：

- 可以定义出图的基本内容
- 可以调整出图的细节和效果
- 可以避免图中出现不需要的内容

#### 2）正向的prompt

理论上，正向的prompt可以接受任意STABLE DIFFUSION能够识别的内容（主要是英文单词、少量的中文、日文单词以及一些表情符号等），为了能更好地控制生成的图像，正向的prompt通常会包含以下内容： 

画质、画风、构图、主体描述、背景及其他信息

##### （1）画质

用来控制出图的质量，常用的画质控制词有masterpiece（杰作）、best quality（最佳画质）、hyper quality（超级画质）、extremely detailed（超多细节）、8k wallpaper（8k分辨率壁纸）等。这些画质控制词比较通用，在写实风格和卡通风格中均可运用，在写实或摄影风格中，这种差异会更加明显。

![img](images/prompt_matrix-0025-2002724447-1girl, upper body, _best quality, ultra-detailed, masterpiece, finely detail, highres, 8k wallpaper_.png)

##### （2）画风

用来控制出图的风格，往往需要配合大模型进行使用，以下是几种常用风格的prompt

- 写实照片风格：realistic, RAW photo, soft lighting, film grain, high detailed skin, natural skin texture

  真实的,RAW胶片,柔和灯光,胶片颗粒,高细节的皮肤,自然的皮肤纹理

- 二次元风格：Anime、Comic、Game CG

  动漫,漫画,游戏CG

- 插画风格：Painting、Illustration、drawing

  绘画,插画,绘图

- Q版：chibi

  Q版

##### （3）构图

 用来控制出图的的镜头和视角，比如强调景深，物体位置等，常见的构图用prompt包括close-up（特写）、upper body（上半身像）、cowboy shot（牛仔镜头，包括上半身及膝盖上部分）、full body（全身像）、 from front（前视角）、from behind（后视角）、from side（侧视角）、from above（俯视视角）（注：也可用high angle 高视角代替）、low view （低视角）、from below（仰视视角）等                                                                                                 

##### （4）主体描述

用来控制出图的主体内容及主体细节，如人物对象、身份、年龄、皮肤、身材、脸型、头发、表情、衣着、动作等，这部分内容可以使用常用的英文单词。

下面是一个简单的范例： 1girl, blond hair, blue dress, smile（一个女孩，金色头发，蓝色裙子，微笑）

##### （5）背景及其他信息

用来控制出图的背景元素、环境、主题、场景等。

下面是一个简单的范例：castle,fountain,dusk,rainbow（城堡，泳池，黄昏，彩虹）

#### 3）反向的prompt

反向prompt用来控制不希望出现在图中的内容，一般是比较通用的，如色情、暴力、血腥、不正确的解剖结构、较低的画质等。

下面是一个针对人物角色的通用反向prompt：

```stable diffusion
NFSW,nude, naked, porn,(worst quality, low quality:1.4), (worst quality:1.1), (low quality:1.4:1.1),（bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime）lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurrypolar,bad body,bad proportions,gross proportions,text,error,missing fingers, missing arms,missing legs, extra digit, extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands, cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality, normal quality,blurry,ugly,duplicate,morbid,mutilated,out of frame, body out of frame
```

> NSFW, 裸体,裸露,色情,(最差画质，低画质:1.4)，(fuze:1.4)，(最差画质:1.1)，(最差画质:1.4:1.1)，(bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime)低画质，糟糕解剖，糟糕手，文字，错误，缺手指，多手指，少手指，裁剪，最差画质，低画质，多手指，少手指，裁剪，最差画质，低画质，正常画质，jpeg伪影，签名，水印，用户名，模糊极，糟糕的身体，糟糕的比例，粗比例，文字，错误，缺手指，缺胳膊，缺腿，多余的手指，多余的手指，更少的手指，多余的四肢，多余的手臂，多余的腿，畸形的四肢，融合的手指，太多的手指，长脖子，对眼，变异的手，剪短的，画得不好的手，画得不好的脸，突变，变形，最差的质量，低质量，正常质量，模糊，丑陋，重复，病态，残缺，框外，身体框外

#### 4）prompt的语法技巧

在STABLE DIFFUSION中，prompt的书写需要遵循一定的语法规则，其次，利用prompt的一些书写技巧，可以有效控制画面的效果

##### （1）prompt的书写规则

- prompt之间用英文逗号进行分隔
- prompt可以换行
- prompt的默认权重为1，但越靠前的prompt权重越高
- prompt的长度并非越长越好

##### （2）prompt的语法技巧

- prompt权重设置

  - ()的使用

    ()用来增加选中prompt的权重，一层()增加10%的权重，可以多个()嵌套使用

  - []的使用

    []用来减少选中prompt的权重，一层[]减少10%的权重，可以多个[]嵌套使用

  - :的使用

    使用()+:的形式，写成(prompt:权重)的形式，比直接嵌套使用()和[]更加方便，这里的权重建议设置在0.3~1.5之间

- prompt的生效时间控制 [:]

  使用[prompt:0-1的数值]可以控制制定prompt的生效时间（即从何时开始进行渲染）

- prompt的交替采样

  使用[prompt1 | prompt2] 或 [prompt1 : prompt2]可以交替使用pormpt1与prompt2进行采样，得到混合的效果

### step 02、文生图技术保存和调用自己的prompt模板

#### 1）了解prompt模板

prompt模板是指将自己常用的prompt保存到文件中，以便于在需要时直接调用，简化prompt的书写。STABLE DIFUSSION中，prompt会保存在根目录的style.csv文件中，以便后续进行调用

#### 2）文生图技术保存和调用自己的prompt模板的具体应用

##### （1）保存自己的prompt模板

可以使用以下步骤来保存自己的prompt模板：

- 在STABLE DIFFUSION中输入并生成自己想要保存的prompt。
- 点击"将当前提示词存储为预设样式"按钮，弹出保存对话框。
- 输入模板名称，点击"确定"。

![image-20231024162140872](images/image-20231024162140872.png)

![image-20231024162218669](images/image-20231024162218669.png)

##### （2）调用自己的prompt模板

可以使用以下步骤来调用自己的prompt模板：

- 在STABLE DIFFUSION中点击"预设样式"下拉列表，在其中选中需要加载的模板。
- 如果需要在该模板基础上进行修改，可以点击"将所选提示词插入到当前提示词之后"按钮，即可将模板的内容插入到正向和反向prompt对话框中。

![image-20231024163005911](images/image-20231024163005911.png)

![image-20231024163120041](images/image-20231024163120041.png)

（3）prompt模板的修改与删除

如果需要对原有的prompt模版进行修改或删除，可以定位到STABLE DIFFUSION目录下的style.csv文件，该文件是纯文本文件，可以用记事本开启，如下图所示：

![image-20231024163759361](images/image-20231024163759361.png)

![image-20231024164359364](images/image-20231024164359364.png)

开启该文件后，针对不需要的模板，删除该行数据，然后在STABLE DIFFUSION中prompt模版载入处刷新即可。

![image-20231024164438947](images/image-20231024164438947.png)

### step 03、文生图技术使用的prompt常用插件

prompt常用插件是指一些可以与prompt配合使用的小工具，它们可以提供一些额外的功能或效果，从而增强prompt的表现力和灵活性。针对STABLE DIFUSSION的prompt插件不知凡几，这里重点为大家介绍两个非常强大的prompt插件：One Button Prompt和sd-webui-prompt-all-in-one

#### 1）One Button Prompt （一键生成提示词）

One Button Prompt是一款能自动生成和填写prompt的插件，可以在给出基本主题信息的前提下，对该主题信息进行拓展，自动生成复杂的prompt并进而生成丰富多彩的图像，是prompt小白及懒人的福音。

##### （1）One Button Prompt安装

- 手动安装

  将OneButtonPrompt-main.zip文件复制到STABLE DIFFUSION文件夹下的extensions文件夹中，并解压，然后重启STABLE DIFFUSION即可。

![image-20231024202620095](images/image-20231024202620095.png)

##### （2）One Button Prompt使用

- 开启One Button Prompt

在STABLE DIFFUSION"文生图"选项卡中找到左下方的"脚本"下拉列表，选中其中的"One Button Prompt"选项开启One Button Prompt

![image-20231024203150588](images/image-20231024203150588.png)

![image-20231024203220091](images/image-20231024203220091.png)

- One Button Prompt主界面

![image-20231024224522054](images/image-20231024224522054.png)

- 使用One Button Prompt构建基于特定主题的Prompt
  - 设定随机性参数
  - 设定主题类型
  - 设定艺术风格
  - 设定图像种类
  - 设定主题关键词
  - 设定主题服装
  - 设定附加prompt
- 使用One Button Prompt生成更具随机性的Prompt

![image-20231024225157183](images/image-20231024225157183.png)

#### 2）sd-webui-prompt-all-in-one（一体化提示词）

##### （1）sd-webui-prompt-all-in-one安装

- 将sd-webui-prompt-all-in-one-main.zip文件复制到STABLE DIFFUSION文件夹下的extensions文件夹中，并解压，然后重启STABLE DIFFUSION即可。

![image-20231024225616122](images/image-20231024225616122.png)

- 首次载入sd-webui-prompt-all-in-one插件时，会检查所需的python模块是否都已安装完成，如果没有安装完成则会弹出如下窗口，点击"安装"按钮即可

![image-20231024225856722](images/image-20231024225856722.png)

![image-20231024230032731](images/image-20231024230032731.png)

##### （2）sd-webui-prompt-all-in-one配置

- 语言设置

  ![image-20231025043951565](images/image-20231025043951565.png)

- 翻译接口等设置

  ![image-20231025044050487](images/image-20231025044050487.png)

##### （3）sd-webui-prompt-all-in-one使用

- prompt自动翻译：用中文书写，翻译为英文

  ![image-20231025045009074](images/image-20231025045009074.png)

  ![image-20231025045151345](images/image-20231025045151345.png)

- 提示词选取与编辑

  ![image-20231025045356376](images/image-20231025045356376.png)

### step 04、综合案例

#### 1）一位女性宇航员在太空舱里

![image-20231025053011059](images/image-20231025053011059.png)

~~~
masterpiece,best quality,huge filesize,Volumetric Lighting,realistic,a female pilot,spacecraft,outer_space
Negative prompt: lowres,bad anatomy,bad hands,text,error,missing fingers,extra digit,fewer digits,cropped,worst quality,low quality,normal quality,jpeg artifacts,signature,watermark,username,blurry,Multiple people,
Steps: 20, Sampler: Euler a, CFG scale: 7, Seed: 1756288871, Size: 768x512, Model hash: e4a30e4607, Model: 6 亚洲写实摄影_混合 majicmixRealistic_v6, Clip skip: 2, ENSD: 31337, Version: v1.4.0
~~~

#### 2）一位魔法师手持闪电锁链

![image-20231025052610947](images/image-20231025052610947.png)

~~~
masterpiece,high quality,science fiction,incredibly absurdres,Volumetric Lighting,realistic,1 female magician,(detailed light), ((lightning in hand)),lightning surrounds,(((lightning chain))),holding_arrow,magic robe,
Negative prompt: NSFW,nude,porn,(worst quality:2),(low quality:2),(normal quality:2),lowres,normal quality,((monochrome)),((grayscale)),skin spots,acnes,skin blemishes,age spot,(ugly:1.331),(duplicate:1.331),(morbid:1.21),(mutilated:1.21),(tranny:1.331),mutated hands,(poorly drawn hands:1.5),blurry,(bad anatomy:1.21),(bad proportions:1.331),extra limbs,(disfigured:1.331),(missing arms:1.331),(extra legs:1.331),(fused fingers:1.5),(too many fingers:1.5),(unclear eyes:1.331),lowers,bad hands,missing fingers,extra digit,bad hands,missing fingers,(((extra arms and legs))),
Steps: 20, Sampler: Euler a, CFG scale: 7, Seed: 1892970013, Size: 512x768, Model hash: 847da9eead, Model: 8 超现实主义_protogenX58RebuiltScifi_protogenX58, Clip skip: 2, ENSD: 31337, Version: v1.4.0
~~~

## 四、任务总结

通过这次任务，我们可以更好地掌握文生图技术在创作领域中的应用，以及如何利用prompt来发挥自己的创造力和表达力。我们也可以通过保存和调用自己的prompt模板来管理自己的创意，并与其他人进行交流和分享。我们还可以通过使用不同的prompt常用插件来丰富和灵活地生成不同风格和效果的图像，从而提升自己的创作水平。

