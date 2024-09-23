---
# 标题
title: 《现代Web布局》其五：grid 定位、计算及对齐
# 描述
# description:
# 图标
icon: css
# 写作时间
date: 2023-01-06
# 分类（可多个）
category:
  - 读书笔记
# 标签（可多个）
tag:
  - css
# 置顶
# sticky: true
# 收藏
# star: true
---

包含 `grid` 布局的：

- 自动定位
- 轨道尺寸计算
- 属性简写
- 对齐属性

<!-- more -->

## 参考内容

[稀土掘金——现代Web布局，定义一个网格布局](https://juejin.cn/book/7161370789680250917/section/7161623971073359902)

[稀土掘金——现代Web布局，Grid布局的计算](https://juejin.cn/book/7161370789680250917/section/7161624007702216735)

[稀土掘金——现代Web布局，网格项目的放置和层叠](https://juejin.cn/book/7161370789680250917/section/7161623932439625758)

[MDN——网格模板区域](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Grid_Template_Areas)

[MDN——CSS网格布局中的自动定位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Auto-placement_in_CSS_Grid_Layout)

[MDN——grid-template](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template)

[MDN——grid-auto-flow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-flow)

## 自动定位 和 `grid-auto-flow`

`grid` 子元素，可以用属性将它定义到容器中的某个区域。

但如果不使用属性定位，它也会自动填充进区域中。

填充原则：**依次填充每一行，必要时添加新行（隐式轨道）。**

我们可以使用 `grid-auto-flow` 来控制流的方向。

### 按行和按列

![grid-auto-flow-1](https://s2.loli.net/2023/01/06/JszU6aY2dVP1IMC.jpg)

- `grid-auto-flow: row`：自动填充行，必要时添加行
- `grid-auto-flow: columns`：自动填充列，必要时添加列

### `dense` (密集) 和 `sparse` (稀疏)

![dense](https://s2.loli.net/2023/01/06/EKFXBpZ86PvJ9gk.jpg)

子元素有时会占据多个单元格，这可能会导致留出空隙。

`sparse`(默认值) 属性，会无视空隙继续往后面自动定位元素。

而 `dense` 属性，能让后来的元素尝试去填补之前留下的空隙。（但同时也可能导致原来出现的次序被打乱）

> `dense` `sparse` 可以与 `row` `column` 同时使用：
>
> ```css
> .demo {
>   grid-auto-flow: row dense;
> }
> ```

#### `dense` 的适用场景

适用于所有对顺序无所谓，但是需要紧密排列的布局。比如：照片墙。

![照片墙](https://s2.loli.net/2023/01/10/SA9DCqvxFc1GTsM.png)

```css
.wrapper {
  grid-auto-flow: row dense;
}
.single:nth-child(5n+1) {
  grid-area: span 2 / span 2;
}
.single:nth-child(7n+1) {
  grid-row: span 2;
}
.single:nth-child(9n+1) {
  grid-column: span 2;
}
```

#### `sparse` 的适用场景

一个妙用，可以布局有逻辑顺序的页面元素。

![sparse](https://s2.loli.net/2023/01/10/N5VdsceTqHpryaY.jpg)

```css
dl {
  display: grid;
  grid-column: auto 1fr;
}
dt {
  grid-column: 1;
}
dd {
  grid-column: 2;
}
```

### 自动定位的具体流程

1. 对裸露的文本，生成匿名网格
2. 先安置 **定好了区域的子元素**（定好四面八方的线，或使用命名区域）
3. 插入仅定好行位置的子元素（考虑是否 dense）
4. 确定隐式网格的列数
5. 插入剩余的网格子元素（考虑是否 dense）

## Grid 轨道尺寸计算

### 百分比

![百分比的问题](https://s2.loli.net/2023/01/10/uyQMwhfezksKGI3.jpg)

轨道尺寸百分比的取值，是相对于 `grid` 容器的宽度（或者说 `inline-size`）。

如果子元素百分比大于等于 100%，再加上 `gap` 的尺寸，就会溢出容器。

因此，**切勿让所有网格轨道都取百分比值**。

### `fr`

又被称为 **弹性网格轨道**，也就是说，它 **只能用于轨道尺寸**。

#### 计算方式

![fr计算1](https://s2.loli.net/2023/01/10/3VSC7bMLEl5BIqm.jpg)

但是并非所有情况都会如上例这般理想。

#### 特殊情况：如果 `fr` 总数小于 1

![fr计算2](https://s2.loli.net/2023/01/10/m3gwPSZH92rp8kh.jpg)

当所有 `fr` 之和小于 1 时，表现类似于 `flex` 弹性布局。分配完后仍会有剩余空间。

#### 特殊情况：计算后的尺寸，小于 `min-width`

![fr计算3](https://s2.loli.net/2023/01/10/NFisMC2L3qUnT7l.jpg)

**弹性宽度 会迁就 内部尺寸**。

这可能导致子元素，没有计算得到你预想中的宽度。

想要消除 `min-width` 对弹性尺寸的影响，主要有两种方式：

1. `minmax(0, 1fr)`

    > `1fr` 的底层实现逻辑其实就是 `minmax(auto, 1fr)`，意味着 `min=auto`（即 `min-width: min-content`）

    使用 `minmax(0, 1fr)` 来替代 `1fr`，将把最小值从默认的 `min-width` 重置为 `0`。

2. `min-width: 0`

    与 `flex` 布局中类似，在子元素上设置 `min-width: 0` 来使 `min-content=0`。

但是应该注意，取消 `min-content` 的影响后，可能会导致子元素内容溢出，需要额外处理。

### 子元素 `margin`

![margin不会溢出](https://s2.loli.net/2023/01/10/LW1dVnDIFlC7S9s.jpg)

子元素中设置 `margin` 并不会参与容器剩余空间的计算，设置的效果类似子元素 `padding`，不会溢出容器。

## 究极简写

用于设置 grid 布局的属性繁多，为啥不来点简写呢？

### `grid-template`

> [`grid-template`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template) 属性可同时设置以下属性：
>
> - [`grid-template-rows`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-rows)
> - [`grid-template-columns`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-columns)
> - [`grid-template-areas`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas)

#### 第一种用法，同时设置行列轨道

![grid-template-1](https://s2.loli.net/2023/01/06/VULrG4qNEMCjdfR.jpg)

使用 `/` 分隔两串轨道列表，左边的代表 `grid-template-rows`，右边的代表 `grid-template-columns`。

#### 第二种用法，行轨道用 `grid-areas` 设置

![grid-template-2](https://s2.loli.net/2023/01/06/GHlfnriEON1IPtY.jpg)

相对用法一，`/` 右边一致，但左边更复杂了。

除了能使用 `grid-areas` 的“ASCII艺术方法”，还能设置行高（可选），以及给行首尾网格线命名（可选）。

### `grid`

> [`grid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid) 简写方式更进一步，它包含了与隐式轨道相关的属性，所以通过它可以同时设置以下属性：
>
> - [`grid-template-rows`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-rows)
> - [`grid-template-columns`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-columns)
> - [`grid-template-areas`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas)
> - [`grid-auto-rows`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-rows)
> - [`grid-auto-columns`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-columns)
> - [`grid-auto-flow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-flow)

由于 `grid` 属性无法设置 `gap`，会将其设置默认值为 `0`。

#### 第一种用法，当成 `grid-template` 来用

`grid` 属性完全支持 `grid-template` 的用法，详见 [上面](#grid-template)。

#### 第二种用法，设置行或列方向的隐式轨道

![grid属性](https://s2.loli.net/2023/01/11/yseHViNh8bKPSEo.jpg)

`grid: 行属性 / 列属性`

其中 行属性 和 列属性，支持两种写法：

- 显式：即 `grid-template-[columns|rows]` 的属性值
- 隐式：`auto-flow dense(是否紧凑排布，可选) grid-auto-columns(隐式轨道尺寸，可选)`

## 对齐

### 内联轴和块轴

![Axis](https://s2.loli.net/2023/01/12/1RymqATNgMrIcKp.jpg)

`grid` 布局中内联轴和块轴，会受到 `writing-mode` 影响。

- 内联轴：文字行文方向
- 块轴：文字换行方向

### 子元素对齐

子元素在**所处区域内对齐**。

#### 块轴对齐

![block-asix](https://s2.loli.net/2023/01/12/sEv3d4AfakRoINp.jpg)

#### 内联轴对齐

![inline-asix](https://s2.loli.net/2023/01/12/VzaZwmsfGqr9NCY.jpg)

#### 子元素对齐简写

[`place-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-items) = [`align-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) + [`justify-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-items)

[`place-self`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-self) = [`align-self`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-self) + [`justify-self`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-self)

### 轨道对齐

当块轴或内联轴上，容器尺寸 > 所有轨道 & 间距的尺寸，即可对轨道进行对齐。

#### 轨道块轴对齐

![align-content](https://s2.loli.net/2023/01/12/ZkLwav46cThxS8y.jpg)

#### 轨道内联轴对齐

![justify-content](https://s2.loli.net/2023/01/12/28sq3oxfFPIQtkL.jpg)

#### 轨道对齐简写

[`place-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-content) = [`align-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-content) + [`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)

[`place-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-content) = [`align-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-content) + [`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)
