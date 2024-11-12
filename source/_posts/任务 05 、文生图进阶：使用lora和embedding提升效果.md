# 任务 05 、文生图进阶：使用lora和embedding提升效果

## 一、任务概述

文生图是一种通过文字描述生成图像的技术，它可以让创作者快速将想象中的场景或物体呈现出来，是一种非常有趣和有用的创作工具。

本任务通过案例展示了文生图技术在以下方面的进阶应用：

1. 使用LoRA（低秩适应）技术来提高出图的画质，调整图像的风格，增强图像的细节。
2. 使用Embedding（文本嵌入）技术来提高模型对文字描述的理解和表达能力，提高生成图像的质量和准确性。

本任务使用了Stable Diffusion这个强大的AI绘画工具，它可以根据输入的文字描述生成高分辨率、高质量、高多样性的图像，同时，利用LoRA技术，可以在不改变原始模型的情况下，只训练一部分的权重矩阵，从而实现模型的快速适应和优化。利用Embedding技术，可以将文字描述转换为高维向量，从而提高模型的语义理解和图像生成能力。

**任务案例：**

- LoRA效果

换脸

![image-20231117065208808](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117065208808.png)

换风格

![image-20231117065237991](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117065237991.png)

换服装

![image-20231117065304298](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117065304298.png)

添加细节

![image-20231117065326609](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117065326609.png)

- Embedding效果

提升图像质量

![image-20231117065423243](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117065423243.png)

## 二、任务目标

1. 了解LoRA和Embedding技术对文生图效果的提升原理
2. 通过案例说明LoRA和Embedding技术的使用

## 三、任务步骤

### step 01、LoRA和Embedding技术的原理和作用

#### 1）文生图技术大模型（checkpoint）的不足

文生图技术使用大模型（checkpoint）可以对出图的效果、风格等进行控制，但单纯的大模型也存在一些不足，主要有以下几个方面：

- 训练和生成速度慢：由于文生图技术需要处理大量的数据和参数，训练和生成的过程往往需要消耗很多的时间和计算资源，这对于创作者来说是不太友好的。
- 内存消耗大：由于文生图技术需要加载大型的模型和权重，内存的消耗也很大，这对于一些设备的性能和容量来说是一个限制。
- 文字描述的理解和表达能力有限：由于文字描述的语义和语法的复杂性，模型往往难以准确地理解和表达文字描述的意图和细节，这可能导致利用prompt生成的图像与期望的效果有差距，或者出现一些不合理或不自然的现象。

#### 2）LoRA和Embedding技术的原理和作用

##### （1）什么是LoRA技术？

LoRA（低秩适应）技术是一种利用低秩矩阵分解来加速模型训练和生成的技术，这是微软的研究人员为了解决大语言模型微调而开发的一项技术。它的基本思想是，在不改变原始模型的情况下，只训练一部分的权重矩阵，从而实现模型的快速适应和优化。

说人话：就是大模型(checkpoint)太大（往往是以多少G计算），训练非常消耗算力，就算是微调也需要花费很多时间精力，且对GPU要求很高，对于普通使用者来说难以实现。微软的研究人员发现，当要实现图像效果微调时，无需对整个大模型进行处理，只需要针对其中的一小部分进行调整即可，这对于训练的要求降低了很多（只需要10张图片即可），同时，基于大模型训练出来的lora体积较小（一般不超过500m），易于下载。但要注意一个问题，Lora是在大模型基础上训练出来的，因此不同的Lora也有自己适配的大模型，两者搭配的效果更佳。

Lora可以用于以下场景

- 画面质量改进（细节调整类）
- 风格/美学控制（画师类)
- 特定人物（名人或虚拟人物)
- 衣物或物品（汉服、唐服等)
- 场景设置（建筑等)

##### （2）什么是Embedding技术？

Embedding（嵌入）技术是一种将文字描述转换为高维向量的技术。其实，可以将Embedding视为编译好的prompt模版，特别是反向prompt。最常用的Embedding包括EasyNegative/BadHand等，主要用来对负面效果进行控制。

### step 02、LoRA和Embedding技术的下载、安装配置与管理

#### 1）LoRA和Embedding文件的下载

以哩布哩布（https://www.liblib.art/）为例，下载LoRa和Embedding文件的步骤如下：

- 首先筛选模型类型

LoRA直接选择LORA类型模型，Embedding选择Textual Inversion(文本嵌入)即可。

![image-20231116065436891](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231116065436891.png)

- 在模型页面下载

![image-20231116065945888](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231116065945888.png)

![image-20231116070223587](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231116070223587.png)

#### 2）LoRA和Embedding模型文件的安装配置

下载好的LoRA模型文件需要放在Stable Diffusion安装目录下的models\Lora文件夹下，Embedding模型文件需要放在Stable Diffusion安装目录下的embeddings文件夹下，才能被Stable Diffusion自动识别。为方便管理，建议大家采用子文件夹的形式进行分类，并添加对应的缩略图，方便在调用时了解模型的基本效果。

![image-20231117035631261](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117035631261.png)

![image-20231117035951867](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117035951867.png)

### step 03、使用LoRA改善图像效果

#### 1）如何调用LoRA模型

在"文生图"界面中，书写好正向Prompt后，通过"显示/隐藏扩展模型"开启扩展模型部分窗体，然后选中Lora选项卡展开安装好的LoRA模型，找到需要调用的LoRA模型单击，即可将LoRA模型加入到正向Prompt中，生成如下的语法结构：

~~~prompt
<lora:Gal_Gadotv3:1>
~~~

其中第一部分`lora:`表示这是一个LoRA模型，第二部分`Gal_Gadotv3:`表示这个LoRA模型的名称和版本信息，第三部分`1`表示使用LoRA的权重，该权重一般设置在0~1之间，可以根据出图的效果自行设置。设置好后生成图像即可。

#### 2）各种不同LoRA模型的效果

- 人物类LoRA

人物：盖尔加朵

设置如下

~~~Prompt
Portrait of gldot as a beautiful female model,georgia fowler,beautiful face,with short dark brown hair,in cyberpunk city at night. She is wearing a leather jacket,black jeans,dramatic lighting,(police badge:1.2),<lora:Gal_Gadotv3:1>,masterpiece,high quality,8k wallpaper,extremely detailed,hyper quality,, masterpiece, high quality, 8k wallpaper,extremely detailed,hyper quality,
Negative prompt: anime,cartoon,penis,fake,drawing,illustration,boring,3d render,long neck,out of frame,extra fingers,mutated hands,((monochrome)),((poorly drawn hands)),3DCG,cgstation,((flat chested)),red eyes,multiple subjects,extra heads,close up,man asian,text,watermarks,logo,lowres,bad anatomy,bad hands,text,error,missing fingers,extra digit,fewer digits,cropped,worst quality,low quality,normal quality,jpeg artifacts,signature,watermark,username,blurry,3d,extra fingers,(((mutated hands and fingers))),NFSW,nude,naked,porn,(worst quality, low quality:1.4),(worst quality:1.1),(low quality:1.4:1.1),(bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime）lowres,bad anatomy,bad hands,text,error,missing fingers,extra digit,fewer digits,cropped,worst quality,low quality,extra digit,fewer digits,cropped,worst quality,low quality,normal quality,jpeg artifacts,signature,watermark,username,blurrypolar,bad body,bad proportions,gross proportions,text,error,missing fingers,missing arms,missing legs,extra digit,extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands,cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality,normal quality,blurry,ugly,duplicate,morbid,mutilated,out of frame,body out of frame,,, NFSW,nude, naked, porn,(worst quality, low quality:1.4), (worst quality:1.1), (low quality:1.4:1.1),（bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime）lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurrypolar,bad body,bad proportions,gross proportions,text,error,missing fingers, missing arms,missing legs, extra digit, extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands, cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality, normal quality,blurry,ugly,duplicate,morbid,mutilated,out of frame, body out of frame
Steps: 30, Sampler: Euler a, CFG scale: 6, Seed: 1037776403, Size: 350x500, Model hash: ef76aa2332, Model: 10 其他_realisticVisionV51_v51VAE, Denoising strength: 0.6, ENSD: 31337, Hires upscale: 2, Hires upscaler: 4x-UltraSharp, Lora hashes: "Gal_Gadotv3: 93441e22c3a9", Version: v1.4.0
~~~

<img src="%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117042738650.png" alt="image-20231117042738650" style="zoom:80%;" /><img src="%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117042912667.png" alt="image-20231117042912667" style="zoom:80%;" />

左图为不使用LoRA的效果，右图为使用LoRA的效果。

- 风格类LoRA

绘画风格：线稿

设置如下

~~~Prompt
a princess in a gorgeous dress,<lora:(风格)线稿3.0animeLineartMangaLike_v30MangaLike:1>,, masterpiece, high quality, 8k wallpaper,extremely detailed,hyper quality,
Negative prompt: NFSW,nude, naked, porn,(worst quality, low quality:1.4), (worst quality:1.1), (low quality:1.4:1.1),（bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime）lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurrypolar,bad body,bad proportions,gross proportions,text,error,missing fingers, missing arms,missing legs, extra digit, extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands, cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality, normal quality,blurry,ugly,duplicate,morbid,mutilated,out of frame, body out of frame
Steps: 30, Sampler: Euler a, CFG scale: 6, Seed: 4120105390, Size: 400x600, Model hash: e883bd0d16, Model: 3 二次元_hotsource_animeV1, Clip skip: 2, ENSD: 31337, Lora hashes: "(风格)线稿3.0animeLineartMangaLike_v30MangaLike: 9b0c9beb764d", Version: v1.4.0
~~~

![image-20231117044533607](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117044533607.png)![image-20231117044438023](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117044438023.png)

左图为不使用LoRA的效果，右图为使用LoRA的效果。

- 服装类LoRA

服装：汉服

设置如下

~~~
a young girl in a long dress,whole body,simple background,<lora:hanfu29.1:1>,, masterpiece, high quality, 8k wallpaper,extremely detailed,hyper quality,
Negative prompt: NFSW,nude, naked, porn,(worst quality, low quality:1.4), (worst quality:1.1), (low quality:1.4:1.1),（bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime）lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurrypolar,bad body,bad proportions,gross proportions,text,error,missing fingers, missing arms,missing legs, extra digit, extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands, cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality, normal quality,blurry,ugly,duplicate,morbid,mutilated,out of frame, body out of frame
Steps: 30, Sampler: Euler a, CFG scale: 6, Seed: 2383351713, Size: 400x600, Model hash: e4a30e4607, Model: 6 亚洲写实摄影_混合 majicmixRealistic_v6, Denoising strength: 0.6, Clip skip: 2, ENSD: 31337, Hires upscale: 2, Hires upscaler: 4x-UltraSharp, Lora hashes: "hanfu29.1: d44b45bdb32d", Version: v1.4.0
~~~

<img src="%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117045527481.png" alt="image-20231117045527481" style="zoom:80%;" /><img src="%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117045539528.png" alt="image-20231117045539528" style="zoom:80%;" />

左图为不使用LoRA的效果，右图为使用LoRA的效果。

- 细节类LoRA

添加图像细节

设置如下

~~~
a young girl,looking at viewer,upper body,<lora:(优化)细节调整add_detail:2>,, masterpiece, high quality, 8k wallpaper,extremely detailed,hyper quality,
Negative prompt: NFSW,nude, naked, porn,(worst quality, low quality:1.4), (worst quality:1.1), (low quality:1.4:1.1),（bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime）lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurrypolar,bad body,bad proportions,gross proportions,text,error,missing fingers, missing arms,missing legs, extra digit, extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands, cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality, normal quality,blurry,ugly,duplicate,morbid,mutilated,out of frame, body out of frame
Steps: 30, Sampler: Euler a, CFG scale: 6, Seed: 2383351713, Size: 400x600, Model hash: e4a30e4607, Model: 6 亚洲写实摄影_混合 majicmixRealistic_v6, Clip skip: 2, ENSD: 31337, Lora hashes: "(优化)细节调整add_detail: 7c6bad76eb54", Version: v1.4.0
~~~

![image-20231117050036007](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117050036007.png)![image-20231117050047849](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117050047849.png)

左图为不使用LoRA的效果，右图为使用LoRA的效果。

#### 3）LoRA模型使用技巧

使用LoRA时，很多时候需要对LoRA进行不同权重效果的观察。如果通过设置不同参数一次次进行抽卡效率很低，此时可以借助StableDiffusion的脚本"X/Y/Z图表"进行多权重效果对比测试，可以快速高效地帮助我们确定效果出色的LoRA权重。该操作具体使用如下：

首先在正向Prompt中书写好内容，对于LoRA的权重，用一个变量num代替，如下

~~~
a young girl,looking at viewer,upper body,<lora:(优化)细节调整add_detail:num>,
~~~

然后打开"脚本"，选择"X/Y/Z 图表"选项，在下方的X轴类型中选择"Prompt S/R"(提示词搜索替换)选项，该选项会搜索Prompt中的变量，再以指定的数字代替，在右侧的"X轴值"中填入以下内容

~~~
num,0,0.1,0.2,0.4,0.6,0.8,1,1.5,2
~~~

该操作表示用0~2的数字依次代替num进行渲染，并观察对比的效果。

![image-20231117064644158](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117064644158.png)

![image-20231117064718830](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117064718830.png)

设置好后进行生成，可以得到如下图像

![image-20231117064744066](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117064744066.png)

通过图像中LoRA权重的变化与图像效果比较可以发现，权重为0.8~1.5时与原始图像基本一致，且细节提升较多。

### step 04、使用使用Embedding改善图像效果

#### 1）如何调用Embedding模型

在"文生图"界面中，书写好Prompt后，通过"显示/隐藏扩展模型"开启扩展模型部分窗体，然后选中嵌入式(T.I. Embedding)选项卡展开安装好的EmbeddingA模型，找到需要调用的Embedding模型单击，即可将Embedding模型加入到Prompt中，生成如下的语法结构：

~~~prompt
badhandv4-AnimeIllustDiffusion_badhandv4,
~~~

该词一般就是Embedding模型的文件名，注意是针对正向效果还是针对负向效果设置，需要放在正向/负向Prompt中，设置好后生成图像即可。

#### 2）常用Embedding模型的使用

- 正向Embedding

细节增强

~~~
highly detailed photo of a woman,skindetail,female focus,hairdetail,long hair,, masterpiece, high quality, 8k wallpaper,extremely detailed,hyper quality,
Negative prompt: SkinDetailNeg,nsfwEM,bad-hands-5 badhandsv5-neg,sexualized body,large breasts,huge breasts,kid,child,((anime)),tiling,duplication,signature,text,bad hands,error,missing fingers,extra digit,fewer digits,cropped,signature,[out of frame],extra fingers,mutated hands,((poorly drawn hands)),((poorly drawn face)),(((deformed))),((bad anatomy)),((extra limbs)),cloned face,extra limbs,(malformed limbs),((missing arms)),((missing legs)),(((extra arms))),(((extra legs))),mutated hands,(fused fingers),(too many fingers),(((long neck))),, NFSW,nude, naked, porn,(worst quality, low quality:1.4), (worst quality:1.1), (low quality:1.4:1.1),（bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime）lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurrypolar,bad body,bad proportions,gross proportions,text,error,missing fingers, missing arms,missing legs, extra digit, extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands, cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality, normal quality,blurry,ugly,duplicate,morbid,mutilated,out of frame, body out of frame
Steps: 35, Sampler: DPM++ 2M Karras, CFG scale: 7, Seed: 1415501894, Size: 400x600, Model hash: ef76aa2332, Model: 10 其他_realisticVisionV51_v51VAE, Denoising strength: 0.4, Hires upscale: 2, Hires upscaler: 4x-UltraSharp, Version: v1.4.0

~~~

<img src="%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117061118247.png" alt="image-20231117061118247" style="zoom:80%;" /><img src="%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/image-20231117061150960.png" alt="image-20231117061150960" style="zoom:80%;" />

- 反向Embedding

![img](%E4%BB%BB%E5%8A%A1%2005%20%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E4%BD%BF%E7%94%A8lora%E5%92%8Cembedding%E6%8F%90%E5%8D%87%E6%95%88%E6%9E%9C.assets/212048-1024x859.jpg)

## 四、任务总结

在Stable Diffusion中，除了使用大模型控制图像的风格和效果之外，还可以通过其他模型对图像的效果进行微调。LoRA和Embedding都能起到这样的作用，但二者的原理和使用也存在一定的差异。LoRA通过在图像生成的层面中添加内容来进行图像效果的改变，而Embedding更注重通过Prompt告诉Stable Diffusion如何进行更细微的控制，如果能合理使用这两种方法，可以对提高出图的质量起到巨大的作用。