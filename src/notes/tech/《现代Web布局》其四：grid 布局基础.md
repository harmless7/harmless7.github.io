---
# 标题
title: 《现代Web布局》其四：grid 布局基础
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
date: 2022-1-6
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

[稀土掘金——现代 Web 布局，Grid 布局的基础知识](https://juejin.cn/book/7161370789680250917/section/7161372229123440648)

[稀土掘金——定义一个网格布局](https://juejin.cn/book/7161370789680250917/section/7161623971073359902)

[稀土掘金——[译] CSS Grid 之列宽自适应：`auto-fill` vs `auto-fit`](https://juejin.cn/post/6844903565463388168)

[MDN——网格布局的基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)

[CSS 网格中基于线的定位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Line-based_Placement_with_CSS_Grid)

[MDN——grid-template-columns](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-columns)

[MDN——minmax()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/minmax)

[MDN-grid-area](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-area)

## 网格容器

元素上声明了 `display: grid` 或 `display: inline-grid` 的，就是一个 **网格容器**。

其直系子元素都将成为 **网格元素**。

## 网格轨道

![轨道](https://s2.loli.net/2023/01/04/L9wXCyWckbh8n3d.jpg)

两条相邻网格线之间的空间。简单来说，就是网格容器中的 **行** 与 **列**。

### 轨道大小

相邻网格线之间的距离，即轨道大小。

### 控制轨道数量与大小

#### 轨道数量

`grid-template-columns` 控制列，`grid-template-rows` 控制行。

它们都支持传入一个空格分隔的 **轨道列表**，例如：`10px 20px 30px`。

根据你传入的参数个数，将生成对应个数的轨道。

#### `fr` 单位

轨道可以使用 `fr` 单位定义其弹性系数。定义了 `fr` 的轨道，会按比例 **分配剩余的可用空间**。

![fr单位](https://s2.loli.net/2023/01/04/Q3o2kC4LPfHVtEj.jpg)

计算方式如上图。

#### `minmax()` 函数

如其名，可以同时设置轨道的最大及最小尺寸。例：`minmax(50px, 1fr)`

> `minmax()` 的最大值可用 `fr` 单位，但最小值暂不行

#### `repeat()` 函数

如果轨道列表需要多次重复几个值，可以使用 `repeat()`。

第一个参数可以是 `number`, `auto-fill` 或 `auto-fit`。

- `number`：重复 number 次
- `auto-fill` & `auto-fit`：自动判断当前轨道能拆成几份

> `auto-fill` 和 `auto-fit` 的区别
>
> 自动判断的前提：容器指定了大小（或最大大小）。
>
> 它们会尽量多地在轨道上塞满列，如果塞不下则自动换行。
>
> 它们之间的区别只会在**当前列宽不够占据整行时**显现，如下图：
>
> ![fill 和 fit 的区别](https://s2.loli.net/2023/01/04/V7pPbJ1CdExFD8w.gif)
>
> - `auto-fill` 如果有剩余空间，则暗中创建一些“空列”来填充剩余部分
> - `auto-fit` 也会先创建“空列”填充，然后**坍缩**这些列，让其他列扩张（当然前提是子元素是弹性的，如果固定宽度则不会扩张）

### 显式和隐式轨道（显示和隐式网格）

用 `grid-template-[columns/rows/area]` 声明的轨道，就叫做 **显式轨道**。

但如果显式轨道不足以容纳子元素，会自动创建新的轨道来进行容纳，这种轨道就叫 **隐式轨道**。

使用 `grid-auto-rows` 和 `grid-auto-columns` 可以控制隐式轨道尺寸。

## 网格线

顾名思义，`grid` 中横向及纵向的线段即网格线。

类似显式和隐式网格，被 `grid-template-[columns/rows/area]` 定义过的网格线是 **显式网格线**，反之为 **隐式网格线**。

![网格线](https://s2.loli.net/2023/01/04/u2vFbrxKtOiN5k1.jpg)

每条网格线都有默认的编号，正方向上（正方向会受到 `writing-mode` 属性影响），从 `1` 开始递增。

反方向上，则从 `-1` 开始递减。

### 网格线命名

在使用 `grid-template-[rows|columns]` 设置轨道列表时，值代表轨道宽度，那么空格就代表网格线。

在空格位置（包括最前面和最后面），设置 `[]` 即可给网格线命名。

`[]` 中可以同时设置多个名称，名称间用空格分隔。

![网格线命名](https://s2.loli.net/2023/01/05/yoanucevRqVrtOs.jpg)

```css
.wrapper {
  grid-template-columns:
    [col1-start] 100px
    [col1-end col2-start] 200px
    [col2-end];
  grid-template-rows:
    [row1-start] 60px
    [row1-end row2-start] 60px
    [row2-end row3-start] 60px
    [row3-end];
}
.single {
  grid-column: col1-start / col2-end;
}
```

### 重名的情况

与直觉不同，网格线是允许重名的：

```css
.demo1 {
  grid-template-columns:
    [col-start] 1fr
    [col-start col-end] 1fr
    [col-start col-end] 1fr
    [col-end];

  /* 或者简单点，写成这样 */
  grid-template-columns: repeat(3, [col-start] 1fr [col-end]);
}
```

因此，在使用命名网格线的时候，需要标上编号，来说明它是第几条：

```css
.demo1-single {
  grid-column: col-start 1 / col-start 2
}
```

### 命名定义隐式网格区域

另外，还可以通过给 4 条网格线命名，变相[给一个区域命名](#命名网格区域ascii-艺术方法)：

![区域命名](https://s2.loli.net/2023/01/05/KweQaRAj5COvLg3.jpg)

```css
.wrapper {
  display: grid;
  grid-template-columns:
    70px
    [demo-start] 70px
    [demo-end];
  grid-template-rows:
    70px
    [demo-start] 70px
    [demo-end];
}
.single {
  grid-area: demo;
}
```

## 网格单元

`grid` 布局中的最小单位，即被网格线分隔而成的单个小格子。

## 网格区域

`grid子元素` 可以跨行列占据多个网格单元，这就会生成一个网格区域。

> 因此，网格区域必定是一个 **矩形**。不会出现一个类似 "L" 形的网格区域。

### 命名网格区域（ASCII 艺术方法）

容器上使用 `grid-template-areas` 来为各区块命名，然后在子元素上使用 `grid-area` 来认领预设好名字的区块。

![区块命名](https://s2.loli.net/2023/01/04/jmZni8zCYrcqoOR.jpg)

在上文已经介绍过通过[网格线命名区域](#命名定义隐式网格区域)的方法。

反之亦然，当命名区域时，也会自动为相应网格线命名。块轴及内联轴上，区域开始位置和结束位置的网格线分别被命名为：

`区域名称-start` 和 `区域名称-end`。

#### 空区域

如果需要空区域，请使用 `.` 来代表（1~n 个均可），例如：

```css
.wrapper {
  grid-template-areas:
    "header header header",
    "... content ...",
    "footer footer footer",
}
```

### 网格线定位

子元素可以设置 `grid-row-[start|end]` 和 `grid-column-[start|end]`，来指定区域位置。

我们简化一点，`grid-row` 和 `grid-column` 可以缩四为二。

```css
.demo1 {
  /* 等价于 grid-row-start: 1; grid-row-end: 3 */
  grid-row: 1 / 3;
  /* 等价于 grid-row-start: 2; grid-row-end: 4 */
  grid-column: 2 / 4;
}
.demo2 {
  /* 网格区域有默认跨度，跨度为 1（只延伸一个轨道） */
  /* 只写一个值，即只指定 grid-row-start */

  /* 等价于 grid-row: 1 / 2; */
  grid-row: 1;
  /* 等价于 grid-column: 2 / 3 */
  grid-column: 2;
}
```

或者更简单一点，使用 `grid-area`。

```css
/* 下例可以达到上图相同的效果 */
.header { arid-area: 1 / 2 / 2 / 4; }
.aside { arid-area: 1 / 1 / -1 / 2; }
.content { arid-area: 2 / 2 / -1 / -1; }
```

> `grid-area` 以网格线为值时，四个值的顺序为：
>
> `grid-row-start` / `grid-column-start` / `grid-row-end` / `grid-column-end`
>
> 即为 上 / 左 / 下 / 右 （逆时针）
>
> 与盒模型属性通常的顺时针方向不同，需要注意。

### 使用 `span` 关键字

除了使用网格线定位，还可以使用 网格线 + 跨越轨道数量 的方法。

```css
.demo3 {
  /* 等价于 grid-row: 1 / 4 */
  grid-row: 1 / span 3;
  /* 等价于 grid-column: 3 / 5 */
  grid-column: span 2 / 5;
}
.demo4 {
  /* 等价于 grid-area: 1 / 3 / 2 / 5 */
  grid-area: 1 / span 2 / span 1 / 5;
}
```

`span` 属性代表区域跨越轨道的数量。

能相对于 起始/结束 线，自动算出对应的 结束/起始 线。

## 网格间距（沟槽） `gap`

和 `flex` 布局的 `gap` 一致，略过。
