---
title: "了解一下 CSS 中的 @property 语句"
description: "一种更高级的 CSS 变量"
publishDate: "2024-12-23"
---

# 概述

`@property` 可以在 CSS 中*创建*自定义属性。

CSS 中，已经有使用 `--*` 形式定义的变量。`@property` 作为其加强版，多了几个设置：

```css
@property --property-name {
  syntax: "<color>";
  inherits: false;
  initial-value: #c0ffee;
}
```

- 🔍 类型校验（`syntax`）：可以限制变量可以被赋值的类型。（CSS 版的 TypeScript 了属于是）
- 🌐 继承控制（`inherits`）：决定该属性是否随父元素继承。
- 🎛️ 默认值（`initial-value`）

## 类型校验

```css
syntax: "<color>"; /* 接收一个颜色值 */

syntax: "<length> | <percentage>"; /* 接收长度或百分比参数，但是二者之间不进行计算合并 */

syntax: "small | medium | large"; /* 接收这些参数值之一作为自定义标识符 */

syntax: "*"; /* 任何有效字符 */
```

### 允许的类型

|name|description|sample|
|---|---|---|
|`<angle>`|以度（degrees）、百分度（gradians）、弧度（radians）或圈数（turns）表示的角度值。|45deg|
|`<basic-shape>`|用于 clip-path、shape-outside 和 offset-path 属性的形状。|inset(22% 12% 15px 35px)|
|`<blend-mode>`|描述当元素重叠时，颜色应当如何呈现。|[详见](https://developer.mozilla.org/zh-CN/docs/Web/CSS/blend-mode)|
|`<color>`|表示一个颜色。颜色可以包括一个 alpha 通道透明度值，来表明颜色如何与背景色混合（composite）。|red|
|`<custom-ident>`|指用户自定义字符串标识符。|[详见](https://developer.mozilla.org/zh-CN/docs/Web/CSS/custom-ident)|
|`<filter-function>`|代表可以改变输入图像外观的图形效果。它可以用于filter 和 backdrop-filter 属性。|[详见](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function)|
|`<flex>`|表示了网格（grid）容器中的一段可变长度。于 grid-template-columns、grid-template-rows 及相关属性中使用。|1fr 60px|
|`<frequency>`|表示频率维度，例如语音的音高。目前它未在任何 CSS 属性中被使用。|无|
|`<gradient>`| 是 `<image>` 的一种特殊类型，包含两种或多种颜色的过渡转变。|linear-gradient(#f69d3c, #3f87a6)|
|`<image>`|描述的是 2D 图形。可能表示成如下几种类型：1. 一个图像被引用为 CSS `<url>` 数据类型使用 url() 方法；2. 一个 CSS `<gradient>`; 3. 页面的一个部分，定义在 `element()` 方法中；|url(test.jpg)|
|`<integer>`|是一种特殊的 `<number>` 类型，它表示一个整数。整数可用于许多 CSS 属性和描述符，例如 column-count、counter-increment、grid-column、grid-row、z-index 属性和 range 描述符。|123|
|`<length>`|表示距离值。许多 CSS 属性会用到长度，比如 width、margin、padding、border-width、font-size 和 text-shadow。|10px|
|`<number>`|表示整数或者是带有小数部分的数字。|12.2|
|`<percentage>`|表述一个百分比值。许多 CSS 属性 可以取百分比值，经常用以根据父对象来确定大小。百分比值由一个<number>具体数值后跟着%符号构成。就像其他在 css 里的单位一样，在%和数值之间是不允许有空格的。|100%|
|`<position>`|表示用于设置相对于元素盒子的位置的 2 维空间中的坐标。它被用于 background-position 和 offset-anchor 属性。|[详见](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position_value)|
|`<ratio>`|用于在媒体查询中描述纵横比，表示两个无单位值之间的比例关系。|16/9|
|`<resolution>`|用于描述媒体查询中的 resolution，表示输出设备的像素密度，即分辨率。|300dpi|
|`<shape-box>`|定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装。|[详见](https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-outside)|
|`<single-transition-timing-function>`|表示描述某数值变化速率的数学函数。|[详见](https://developer.mozilla.org/zh-CN/docs/Web/CSS/easing-function)|
|`<string>`|表示一串字符的数据类型，它被用在众多 CSS 属性中，例如content、font-family、和quotes。|"该字符串用双引号括起来。"|
|`<time>`|表达了以秒（s）或毫秒（ms）为单位的时间的值。于animation、transition及相关属性中使用。|250ms|
|`<transform-function>`|用于对元素的显示做变换。通常，这种变换可以由矩阵表示，并且可以使用每个点上的矩阵乘法来确定所得到的图像。|rotate(360deg)|
|`<url>`|指向资源的指针。资源可以是图像、视频、CSS 文件、字体文件、SVG 特性等。|url(https://picsum.photos/300)|

### 继承

![inherits](https://s2.loli.net/2024/12/23/ruZkhFnlIHvC5Qp.jpg)

要注意并不是*父节点使用了变量，不会影响到子节点*，而是**父节点覆盖了变量，不会影响到子节点**。

# 使用例

## 渐变色平滑动画

css 中是无法直接建立对渐变色的平滑过渡的。

![failure](https://s2.loli.net/2024/12/23/PvDfV5aLQxred3p.gif)

```css
@keyframes bg {
  from {
    background: linear-gradient(#2392b1, #6bd3ec);
  }
  to {
    background: linear-gradient(#fdafbc, #fec2a0);
  }
}

.colorful {
  animation: bg 1s infinite;
}
```

其原因是 `linear-gradient` 在 css 中，更接近于按图片处理。无法对其中的八进制颜色值添加渐变效果。

那么将其中的颜色值拆出来成变量，再对其添加动画呢？

```css
root {
  --start-color: #2392b1;
  --end-color: #6bd3ec;
}

@keyframes bg {
  from {
    --start-color: #2392b1;
    --end-color: #6bd3ec;
  }
  to {
    --start-color: #fdafbc;
    --end-color: #fec2a0;
  }
}

.colorful {
  background: linear-gradient(var(--start-color), var(--end-color));
  animation: bg 1s infinite;
}
```

很遗憾也不行，普通变量不支持动画。其效果也会像上面那张动图一样。

但是，用 `@property` 来定义变量，就能够支持动画：

![success](https://s2.loli.net/2024/12/23/LnqBpVxj6Mgmw8H.gif)

```css
@property --start-color {
  syntax: "<color>";
  inherits: true;
  initial-value: #2392b1;
}

@property --end-color {
  syntax: "<color>";
  inherits: true;
  initial-value: #6bd3ec;
}

@keyframes bg {
  from {
    --start-color: #2392b1;
    --end-color: #6bd3ec;
  }
  to {
    --start-color: #fdafbc;
    --end-color: #fec2a0;
  }
}

.colorful {
  background: linear-gradient(var(--start-color), var(--end-color));
  animation: bg 1s infinite;
}
```

## 动画计数器

由上例可知 `@property` 对动画有支持，那么可以设置一个“万能”的动画计数器。

```css
@property --seed {
  syntax: "<integer>";
  inherits: false;
  initial-value: 0;
}

@keyframes seed {
  from { --seed: 0 }
  to { --seed: 100 }
}

.block1 {
  transform: rotate(calc(var(--seed) * 1.8deg));
  animation: seed 1s infinite;
}

.block2 {
  opacity: calc(var(--seed) / 100);
  animation: seed 1s infinite;
}

.block3 {
  transform: scale(calc(var(--seed) / 100));
  animation: seed 1s infinite;
}
```

定义 `--seed` 来表示动画进度，效果如下：

![seed](https://s2.loli.net/2024/12/23/pa4QCGZYtdAiVW1.gif)

# reference

[MDN-@property](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@property)

[MDN-CSS 基本数据类型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Types)

[bilibili-CSS @property 规则 2 分钟速览](https://www.bilibili.com/video/BV1Yv6MYpEc4/?vd_source=cbb9bae25f5ac9e51f8ff965eb794230)
