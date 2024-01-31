---
# 标题
title: CSS动画学习08：墨滴晕染蒙版效果
# 描述
description: 很酷炫的背景动画
# 图标
icon: css
# 写作时间
date: 2024-01-31 17:58:19
# 分类（可多个）
category:

  - 技术学习
# 标签（可多个）
tag:
  - css
# 置顶
# sticky: true
# 收藏
# star: true
---

学习自 [最酷的 SVG 动画滤镜效果 | 源码下载_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1gN411e7jG/?spm_id_from=333.1007.top_right_bar_window_default_collection.content.click)



## 参考学习资料：

关于 feTurbulence：

[feTurbulence - SVG：可缩放矢量图形 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feTurbulence)

[说说SVG的feTurbulence滤镜 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/366438535)

关于 feDisplacementMap：

[feDisplacementMap - SVG：可缩放矢量图形 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feDisplacementMap)

[深入理解SVG feDisplacementMap滤镜及实际应用 « 张鑫旭-鑫空间-鑫生活 (zhangxinxu.com)](https://www.zhangxinxu.com/wordpress/2017/12/understand-svg-fedisplacementmap-filter/)

关于 gsap：

[Installation | GSAP | Docs & Learning](https://gsap.com/docs/v3/Installation/)

<!-- more -->

## 效果图

![](https://s2.loli.net/2024/01/31/7HdJ4DXwCcAxoSQ.gif)

## 实现思路

这个系列要写 css 动画，本文却使用了 Js 甚至 GSAP。只因为我太中意这个效果了，这次破例标题党一下吧。

可见动效分为背景的墨滴扩散和前景的列表展示。

背景我们使用 svg 绘制一个 “墨滴” 作为图片蒙版，再给图片添加半径变大的动画；前景我们使用 gsap 的 timeline 来完成动画。



效果看似简洁，但还是有很多细节要扣的，大致步骤如下：

1. 在 svg 中通过 `feTurbulence` 和 `fedisplacementMap` 创建一个不规则圆形（墨滴形状）；

2. 使用 “墨滴” 作为图片蒙版；

3. 添加列表 html 结构；

4. 将 “墨滴” 和列表调整至不可见状态，通过 `gsap` 及其 `ScrollTrigger` 工具包来添加它们随滚动而显示的动画。



### 绘制 “墨滴”

![beautiful-mask-2.jpg](https://s2.loli.net/2024/01/31/U14jsOLIKxyotDQ.png)

```html
<section class="content">
  <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMin slice">
    <defs>
      <filter id="displacementFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <circle cx="600" cy="800" r="500" fill="white" style="filter: url(#displacementFilter)" />
    </defs>
  </svg>
</section>
```

很容易联想到 “墨滴” 是由圆形变形而来，因此我们需要一个 `circle`。通过 `filter` 添加滤镜（`filter: url(#displacementFilter)`）来为其添加不规则边缘。



现在来解释这是如何做到的。



#### feTurbulence

我们先看看只有 `feTurbulence` 起效时的效果：

![beautiful-mask-3.jpg](https://s2.loli.net/2024/01/31/LDdCagRKv7WoXb2.jpg)

是不是很像电视机坏掉的波纹？

feturbulence (n. 湍流;紊流;动荡;(空气和水的)涡流;混乱;动乱;骚乱;)。这个滤镜利用 Perlin 噪声函数，专门用于模拟自然纹理。详细可见上方的参考资料。

其参数含义如下：

<!-- 湍流滤镜：模拟自然纹理 -->

- **baseFrequency**：噪声频率（默认值：0，范围：0 ~ 1）。可以理解为数值越大，噪声越密集。可以接受两个值，分别是 横坐标 和 纵坐标 的频率。

- **numOctaves**：八度（默认值：1，取值为正整数）。详细略，可以大致理解为分型图形，数值越大分型越多，细节越多。

- **type**: 柏林函数合成方式（默认值：turbulence，取值 turbulence | fractalNoise）。可以简略理解为前者无模糊，后者有模糊。

- stitchTiles：多个图形是否融合（默认值：noStitch）。

- seed：随机种子。
  
  

然而一些随机噪音纹理，是一些色彩信息，要怎么去让圆形边缘变得不规则呢？



#### feDisplacementMap

```html
<feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
```

displacement (n. 移位;取代;替代;排水量;免职;)。字面意思，这个函数可以让图像的像素进行位移，Map 类似 js 中的 `map()`，代表它会遍历每一个像素进行位移。

而它的位移不是乱移的，它是有备而来。

简单来说，它可以根据一个图像的色彩信息对另一个图像的像素进行位移。

这个概念类似蒙版，只不过蒙版是根据灰度信息来控制不透明度，而这个函数可以通过 rgba 值来控制位移量。

属性如下：

- in：它标识给定过滤器原语的输入。SourceGraphic，SourceAlpha，BackgroundImage，BackgroundAlpha，FillPaint，StrokePaint；以及自定义的滤镜的原始引用(输出的result值)。
  
  **不过我们一般只用 SourceGraphic，代表待处理的图像。**

- in2：它标识给定过滤器原语的第二个输入。它的工作原理与in属性相同。
  
  **一般只用自定义滤镜的引用（输出的result值），表示其它滤镜输出的图像。**

- scale：可理解为位移的幅度。

- xChannelSelector：指示从in2使用哪个颜色通道沿X轴移动‘in’中的像素。R/G/B/A

- yChannelSelector：指示从in2使用哪个颜色通道沿Y轴移动‘in’中的像素。

这里再贴一个公式，可以窥见像素移动的具体规则，详情请看上方参考：

```
P'(x,y) ← P( x + scale * (XC(x,y) - 0.5), y + scale * (YC(x,y) - 0.5))
```

至此就可以理解为什么一个随机的彩色图像，可以形成不规则圆形了。



### 使用“墨滴”作为蒙版

这个很好理解了，代码如下：

```html
<defs>
  <filter id="displacementFilter">
    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
  </filter>
  <mask id="circleMask">
    <circle cx="600" cy="800" r="500" fill="white" style="filter: url(#displacementFilter)" />
  </mask>
</defs>
<image xlink:href="./bg2.jpg" width="100%" height="100%" mask="url(#circleMask)" />
```

![beautiful-mask-4.jpg](https://s2.loli.net/2024/01/31/mdcVKJoLaqtjTs5.jpg)



### 添加列表 html 及样式

![beautiful-mask-5.gif](https://s2.loli.net/2024/01/31/O3lujYtC1qBGmSe.gif)

```html
<ul>
  <li>
    <a href="#">
      <span>弓形集电器</span>
      <p class="date">Some kind of Superstar</p>
      <div class="border"></div>
    </a>
  </li>
  ...
</ul>
```

```css
ul {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  list-style-type: none;
  font-size: clamp(1rem, 2vw, 2rem);
}

ul li a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  text-decoration: none;
  overflow: hidden;
  transition: padding-left 0.3s ease-in-out;
  position: relative;
}

ul li a .border {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid white;
}

ul li a:hover {
  padding-left: 1.5em;
  font-weight: bold;
}
```
