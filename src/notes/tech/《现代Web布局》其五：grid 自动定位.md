---
# 标题
title: 《现代Web布局》其五：grid 自动定位
# 短标题
# shortTitle: 
# 描述
# description: 
# 不是文章
# notArticle: true
# 图标
icon: article
# 作者
# author: 基本上无害
# 原创
isOriginal: true
# 写作时间
date: 2023-01-06
# 分类（可多个）
category:
  - 读书笔记
  - 前端
# 标签（可多个）
tag:
  - css
  - 前端
# 置顶
# sticky: true
# 收藏
# star: true
# 不添加至文章列表
# article: false
# 不添加至时间线
# timeline: false
# 预览图（绝对路径）
image: ""
# banner（横幅图片）
banner: ""
---

梳理 grid 布局的使用。

<!-- more -->

## 参考内容

[稀土掘金——现代Web布局，定义一个网格布局](https://juejin.cn/book/7161370789680250917/section/7161623971073359902)

[稀土掘金——现代Web布局，Grid布局的计算](https://juejin.cn/book/7161370789680250917/section/7161624007702216735)

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

## 究极简写

[上文](./%E3%80%8A%E7%8E%B0%E4%BB%A3Web%E5%B8%83%E5%B1%80%E3%80%8B%E5%85%B6%E5%9B%9B%EF%BC%9Agrid%20%E5%B8%83%E5%B1%80%E5%9F%BA%E7%A1%80.md) 介绍了 grid 布局的相关基础概念，包括：

- 容器
- 轨道
- 线
- 单元
- 区域
- 间距（沟槽）

用于设置 grid 布局的属性繁多，但基本可以说，最终都是为划定 **区域** 而服务。因为 划分区域 = 规划布局空间。

使用 `grid-template` 和 `grid` 属性，几乎可以将布局所需的信息，一次性定义完毕。

### `grid-template`

#### 第一种用法，同时设置行列轨道

![grid-template-1](https://s2.loli.net/2023/01/06/VULrG4qNEMCjdfR.jpg)

使用 `/` 分隔两串轨道列表，左边的代表 `grid-template-rows`，右边的代表 `grid-template-columns`。

#### 第二种用法，设置轨道 + 区域命名 + 行网格线命名

![grid-template-2](https://s2.loli.net/2023/01/06/GHlfnriEON1IPtY.jpg)

相对用法一，`/` 右边一致，但左边更复杂了。

在 `grid-template-rows` 的基础上，融合了 `grid-areas` & 行网格线的命名。

### `grid`

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

### 子元素 `margin`

![margin不会溢出](https://s2.loli.net/2023/01/10/LW1dVnDIFlC7S9s.jpg)

子元素中设置 `margin` 并不会参与容器剩余空间的计算，设置的效果类似子元素 `padding`，不会溢出容器。