#   任务 06 、文生图进阶：探索VAE和Hypernetwork的使用方法

## 一、任务概述

文生图是一种通过文字描述生成图像的技术，它可以让创作者快速将想象中的场景或物体呈现出来，是一种非常有趣和有用的创作工具。

本任务通过案例展示了文生图技术在以下方面的进阶应用：

1. 使用VAE（变分自编码器）技术在生成图像时更好地保持数据的特征和结构。
2. 使用Hypernetwork（超网络）技术来提高模型的灵活性和泛化能力，使得生成的图像更加多样化和逼真。

本任务使用了Stable Diffusion这个强大的AI绘画工具，它可以根据输入的文字描述生成高分辨率、高质量、高多样性的图像，同时，利用VAE技术，可以在不改变原始模型出图的基本图像内容的同时，细微调整图像的色彩与光影效果，从而实现更加美观的图像光影色彩效果。利用Hypernetwork技术，可以与LoRA类似，在在不改变原始模型的情况下，只训练一部分的权重矩阵，从而实现模型的快速适应和优化。

**任务案例：**

- VAE效果

二次元风格

![image-20231119154608940](任务 06、文生图进阶：探索VAE和Hypernetworks的使用方法.assets\image-20231119154608940.png?lastModify=1700403739)

写实风格

![image-20231119153042605](任务 06、文生图进阶：探索VAE和Hypernetworks的使用方法.assets\image-20231119153042605.png?lastModify=1700403739)

![image-20231119151836052](任务 06、文生图进阶：探索VAE和Hypernetworks的使用方法.assets\image-20231119151836052.png?lastModify=1700403739)

- Hypternetwork效果

改变图像风格

![image-20231119163345705](任务 06、文生图进阶：探索VAE和Hypernetworks的使用方法.assets\image-20231119163345705.png?lastModify=1700403739)

## 二、任务目标

1. 了解VAE和Hypernetwork技术对文生图效果的提升原理
2. 通过案例说明VAE和Hypernetwork技术的使用

## 三、任务步骤

### step 01、VAE和Hypernetwork技术的原理和作用

#### 1）VAE和Hypernetwork技术的原理和作用

##### （1）什么是VAE技术？

VAE 的全称是Variational Auto-Encoder，翻译过来是变分自动编码器，本质上是一种训练模型，Stable Diffusion里的VAE主要是模型作者将训练好的模型“解压”的解码工具。VAE的主要作用是用来修正大模型中针对颜色和亮度失真的问题，早期训练的很多大模型在这方面存在颜色发灰，亮度对比不够等缺点，此时就可以用VAE进行修正。而较新的大模型很多已经对颜色亮度的问题做了修正，基本无需VAE的介入了。当然也有通用的VAE模型，可以在现有的基础上再做一些颜色亮度的提升或改变。

VAE模型通常较小，一般在几百兆。

##### （2）什么是Hypernetwork技术？

Hypernetwork 中文名（超网络），最初由stable diffusion 早期使用者 [NovelAI](https://so.csdn.net/so/search?q=NovelAI&spm=1001.2101.3001.7020)开发，它是一个附加到stable diffusion模型的小型神经网络，用于修改其风格。Hypernetwork与LoRA 模型很相似，它们的文件大小相似，通常低于 200MB，都比checkpoint模型小。Hypernetwork的工作方式也与LoRA基本一致，由于LoRA技术的不断成熟，Hypernetwork已经渐渐淡出SD使用者的视线。

### step 02、VAE和Hypernetwork模型的下载、安装配置与管理

#### 1）VAE和Hypernetwork模型的下载

以哩布哩布（https://www.liblib.art/）为例，下载VAE和Hypernetwork模型文件的步骤如下：

- 首先筛选模型类型

VAE需要直接选择Other类型模型，Hypernetwork选择Hypernetwork即可。

![image-20231119224323998](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231119224323998.png)

- 在模型页面下载

![image-20231119224726439](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231119224726439.png)

![image-20231119224635958](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231119224635958.png)

#### 2）VAE和Hypernetwork模型文件的安装配置

下载好的VAE模型文件需要放在Stable Diffusion安装目录下models文件夹的VAE文件夹和hypernetworks文件夹下，才能被Stable Diffusion自动识别。

![image-20231119225102921](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231119225102921.png)

### step 03、使用VAE改善图像效果

#### 1）如何调用VAE模型

在"文生图"界面中，选择好大模型之后，在大模型的右侧"外挂VAE模型"的下拉菜单中，选择对应的VAE模型即可实现对VAE模型的调用，然后按步骤设定好其他信息，生成图像即可。

![image-20231119225439956](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231119225439956.png)

#### 2）各种不同VAE模型的效果

- 卡通类二次元风格

Stable Diffusion自带的Anything基础模型是典型的VAE模型依赖者，按照以下信息生成一幅图像，注意将"外挂VAE模型"设置为"无"

~~~
a pretty little girl,waving a magic wand,pull out a line of sparks,
Steps: 20, Sampler: Euler a, CFG scale: 7, Seed: 1248458945, Size: 600x800, Model hash: 7f96a1a9ca, Model: 10 其他_anything-v5-PrtRE, Clip skip: 2, ENSD: 31337, Version: v1.4.0
~~~

图像效果如下

![image-20231119225815999](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231119225815999.png)

在此基础上，选择`鲜艳4 vaeFtMse840000Ema_v10.safetensors `VAE模型，其他设置不变，再生成一张，效果如下

![image-20231119230107025](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231119230107025.png)

可以发现，两张图在颜色细节、光影层次等方面都有较大的差距，后者明显优于前者。

- 写实风格

新版本的大模型在训练时已经考虑到颜色与光影的情况，对VAE的依赖已逐渐变小。选择如下设置，并比较VAE设置为`无`和`鲜艳4 ·vaeFtMse840000Ema_v10.safetensors`的效果差异，

~~~
a beautiful girl,sitting at the bar table,with 1 martell in front of you,the light shines on her face,close up,, masterpiece, high quality, 8k wallpaper,extremely detailed,hyper quality,
Negative prompt: NFSW,nude, naked, porn,(worst quality, low quality:1.4), (worst quality:1.1), (low quality:1.4:1.1),（bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime）lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurrypolar,bad body,bad proportions,gross proportions,text,error,missing fingers, missing arms,missing legs, extra digit, extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands, cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality, normal quality,blurry,ugly,duplicate,morbid,mutilated,out of frame, body out of frame
Steps: 20, Sampler: Euler a, CFG scale: 7, Seed: 2882146094, Size: 600x800, Model hash: e4a30e4607, Model: 6 亚洲写实摄影_混合 majicmixRealistic_v6, Clip skip: 2, ENSD: 31337, Version: v1.4.0
~~~

图像如下

![image-20231120003454889](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231120003454889.png)

左图是不使用VAE的情况，右图是使用VAE的情况，可以看出，两者有细微的差异，但比起二次元风格的图像，差异已经很小了。

#### 3）VAE模型使用技巧

使用VAE时，有多时候需要对比是否使用某种VAE模型的效果观察。为提高效率，也可以借助StableDiffusion的脚本"X/Y/Z图表"进行不同VAE效果对比测试，可以快速高效地帮助我们确定应使用哪种VAE模型或不使用VAE模型。该操作具体使用如下：

首先设置好大模型，本次案例选择`7 西幻写实_revAnimated_v11`，VAE外挂模型选择`无`，将其他相关信息按以下内容设置好

~~~
a beautiful female wizard,waving a magic wand,pull out a flash of lighting,, masterpiece, high quality, 8k wallpaper,extremely detailed,hyper quality,
Negative prompt: NFSW,nude, naked, porn,(worst quality, low quality:1.4), (worst quality:1.1), (low quality:1.4:1.1),（bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime）lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurrypolar,bad body,bad proportions,gross proportions,text,error,missing fingers, missing arms,missing legs, extra digit, extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands, cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality, normal quality,blurry,ugly,duplicate,morbid,mutilated,out of frame, body out of frame
Steps: 20, Sampler: Euler a, CFG scale: 7, Seed: 219658791, Size: 512x512, Model hash: d725be5d18, Model: 7 西幻写实_revAnimated_v11, Clip skip: 2, ENSD: 31337, Version: v1.4.0
~~~

然后打开"脚本"，选择"X/Y/Z 图表"选项，在下方的X轴类型中选择"VAE"选项，该选项会尝试使用不同的VAE进行图像生成并比较效果。在"X轴值"中选择希望进行效果对比的VAE模型，如下图所示：

![image-20231119231800139](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231119231800139.png)

设置好后生成图像，可以得到如下图像

![image-20231119231908039](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231119231908039.png)

可以通过放大图形进行仔细对比。目前来说，VAE一般无脑选`鲜艳4 vaeFtMse840000Ema_v10.safetensors`即可。

### step 04、使用Hpyernetwork模型

#### 1）如何调用Hpyernetwork模型

在"文生图"界面中，书写好正向Prompt后，通过"显示/隐藏扩展模型"开启扩展模型部分窗体，然后选中"Hypernetworks"选项卡展开安装好的Hpyernetwork模型，找到需要调用的Hpyernetwork模型单击，即可将Hpyernetwork模型加入到正向Prompt中，生成如下的语法结构：

~~~prompt
<hypernet:Toru8pWavenChibi_wavenchibiV10b:1>
~~~

其中第一部分`hypernet`:表示这是一个Hypernetwork模型，第二部分`Toru8pWavenChibi_wavenchibiV10b:`表示这个Hypernetwork模型的名称和版本信息，第三部分`1`表示使用Hypernetwork模型的权重，该权重一般设置在0~1之间，可以根据出图的效果自行设置。设置好后生成图像即可。

#### 2）常用Hypernetwork模型的使用

- 改变图像风格

游戏图标风格生成

~~~
(chibi),cute girl,emoji,looking worried at the camera,fullbody,standing,simple background,
Satin sheen gold intricate hooded cape,belt,glove,hand guard,<hypernet:Toru8pWavenChibi_wavenchibiV10b:num>,, masterpiece, high quality, 8k wallpaper,extremely detailed,hyper quality,
Negative prompt: NFSW,nude, naked, porn,(worst quality, low quality:1.4), (worst quality:1.1), (low quality:1.4:1.1),（bad-hands-5,bad_prompt,bad_prompt_version2,bad-artist,bad-artist-anime）lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurrbwfypolar,bad body,bad proportions,gross proportions,text,error,missing fingers, missing arms,missing legs, extra digit, extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers,too many fingers,long neck,cross-eyed,mutated hands, cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality, normal quality,blurry,ugly,duplicate,morbid,mutilated,out of frame, body out of frame
Steps: 22, Sampler: DPM++ 2M Karras, CFG scale: 8, Seed: 1005560317, Size: 512x768, Model hash: d725be5d18, Model: 7 西幻写实_revAnimated_v11, Clip skip: 2, Version: v1.4.0
~~~

![image-20231119232826239](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231119232826239.png)

左侧为原始图像，右侧为使用了Hypernetwork的图像。可以发现整体风格已经从2.5D渲染风格变为了手绘风格，但同时画面细节部分有较大的变化。也可以利用脚本"X/Y/Z图表"进行多权重效果对比测试，权重为0~1时的各种效果对比如下：

![image-20231119233335847](%E4%BB%BB%E5%8A%A1%2006%E3%80%81%E6%96%87%E7%94%9F%E5%9B%BE%E8%BF%9B%E9%98%B6%EF%BC%9A%E6%8E%A2%E7%B4%A2VAE%E5%92%8CHypernetworks%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.assets/image-20231119233335847.png)

## 四、任务总结

在Stable Diffusion中，除了使用大模型控制图像的风格和效果之外，还可以通过其他模型对图像的效果进行微调。除了LoRA和Embedding之外，VAE和Hypernetwork也能起到这样的作用，VAE像是一个提升饱和度与亮度的滤镜，增加图像的色彩与光感，Hypernetwork类似LoRA，通过在图像层面中添加信息来改变图像，我们在实际操作中要根据结果的需要合理使用各种方法，以便提高出图的质量，得到更符合需求的图像。