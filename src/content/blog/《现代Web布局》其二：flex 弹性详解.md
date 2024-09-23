---
title: '《现代Web布局》其二：flex 弹性详解'
description: 'none'
pubDate: '2022-12-12'
---

第 4~8 节，介绍了

1. flex 子元素的伸缩原理
2. flex 属性(flex-grow, flex-shrink, flex-basis)
3. 元素初始尺寸的计算方式

<!-- more -->

## 参考内容

[稀土掘金——现代 Web 布局](https://juejin.cn/book/7161370789680250917)

[MDN——控制 Flex 子元素在主轴上的比例](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax)

[MDN——flex-basis](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)

[MDN——flex-grow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)

[MDN——flex-shrink](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)

## flex 子元素在主轴上的伸缩

flex 布局的精髓，就在于它能够控制子元素在主轴上的尺寸和伸缩性。（所以被称为弹性布局）

这个伸缩性使用 `flex-grow`, `flex-shrink` 和 `flex-basis` 来控制。

而这三个属性，通常合写为 `flex` 属性。

### 基础概念

#### 正负自由空间（或可用空间, positive and negative free space）

flex 子元素的伸缩，本质上是对 flex 容器正负自由空间的分配。

自由空间的计算如图所示：

![positive free space](https://s2.loli.net/2022/12/09/3CkRxIDefuKsyU8.jpg)

上图计算出的自由空间是正数，即 正自由空间。

![negative free space](https://s2.loli.net/2022/12/09/4YhbTaj38yFt7oV.jpg)

以此类推，也会出现 负自由空间，计算方式也是一样的。

> 注：上图漏掉了 `gap` 属性，计算自由空间时也要减去 flex 子元素之间的 `gap` 宽度。

### flex-basis 属性

`flex-basis` 属性对 flexbox 中，对 Flex 子元素尺寸起 **决定性** 的作用。

它可以**在任何空间分配之前**，初始化 flex 子元素的尺寸。

> `flex-basis` 比 `height` 和 `width` 具有更高的优先级。（除了值为 `auto` 时）

它有几个需要注意的值：

#### `flex-basis: auto`（默认值）

- 如果为子元素设置了绝对值（如 `width: 200px`），那么 `flex-basis` 的值就为绝对值；

- 如果未设置绝对值，那么 `flex-basis` 的值为 `max-content`；

#### `flex-basis: content`

- 无论有没有设置绝对值，它都以子元素内容大小为准。

    （但是支持的浏览器较少，可以把 `height` 和 `width` 设为 `auto` 来达成同样的效果。）

#### `flex-basis: 0`

- 意味着完全忽略 flex 子元素的尺寸，它的所有空间都可以被抢占。

### flex-grow 属性

指定了 flex **增长值**，决定了当 正自由空间 分配时，flex 子元素相对于它的兄弟元素的增长程度。

### flex-shrink 属性

指定了 flex **缩小值**，决定了当 负自由空间 分配时，flex 子元素相对于它的兄弟元素的收缩程度。

看起来和 `flex-grow` 简直一模一样，那么为什么不把这两个属性合并起来呢？

因为 `flex-shrink` 有个特点：在缩小时 flexbox 会阻止子元素的尺寸缩小到 0，最小只到 `min-content`。

### flex 属性

`flex-grow`, `flex-shrink`, `flex-basis` 三个属性的简写。

下面来整理一下它常用的几种值：

#### `flex:initial` (`flex: 0 1 auto`) (默认值)

![flex: initial](https://s2.loli.net/2022/12/09/mLeYsU48VZ9pTuk.webp)

子元素不会成长，只会收缩。

#### `flex: auto` (`flex: 1 1 auto`)

![flex: auto](https://s2.loli.net/2022/12/09/TSxHyDf6dRmZ2iA.webp)

所有子元素均为弹性的，它们将均分正负自由空间（但不意味着均分后它们等宽）

#### `flex: 1` (`flex: 1 1 0`)

![flex: 1](https://s2.loli.net/2022/12/09/9zcTv2BZKHJNp1g.webp)

让每一个子元素变成弹性的，并且忽略自身基础尺寸，来让所有子元素等尺寸。

但是实际上上图的第一个子元素 "Alonglonglongword" 还是要更长一点。

需要为它设置 `min-width: 0` 才能正真均分，原因在[文末](#关于-min-width-0-的意义)解释。

#### `flex: none` (`flex: 0 0 auto`)

![flex: none](https://s2.loli.net/2022/12/09/jnJHGpS6ClhY1VX.webp)

相当于消除子元素的弹性。

#### `flex: <positive-number>` (`flex-basis: <positive-number>`)

为它设定一个带单位的绝对值，相当于在设置 `flex-basis`。

### 子元素的初始尺寸，是如何计算出来的？

#### 第一步：计算 `flex-basis` 的值

> content → width → flex-basis

含义是：

1. 如果 flex 子元素未指定 `flex-basis` 的值，那么去参考 `width` 属性；

2. 如果 flex 子元素连 `width` 都未指定，那么去参考 `content(内容计算宽度)`。

#### 第二步：考虑 `min-*` 和 `max-*` 的影响

参考以下逻辑：

```js
let size = null; // 尺寸初始值

if (basis < min) size = min; // 最小值
else if (basis > max) size = max; // 最大值
else if (min > max) size = min; // 当大小冲突，min 的权重高于 max
```

### 关于 `min-width: 0` 的意义

[上文](#flex-1-flex-1-1-0)设置 `flex-basis: 0` 后，初始化尺寸不为 0 的原因，在这里可以解释了。

W3C 中规定：

> 主轴上 flex 子元素设置 `overflow: visible` 时，**若 flex 子元素未设置最小尺寸 (min-size)，将会指定为一个自动的最小尺寸 (min-content)**。

这就导致 `flex-basis: 0` 被 `min-content` 覆盖。

因此，在需要**子元素初始尺寸为 0 时，最好同时设置 `flex-basis: 0` 和 `min-width: 0`**。

