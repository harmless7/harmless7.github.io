---
# 标题
title: '《现代Web布局》其七：grid 经典布局'
description: 'none'
pubDate: '2023-02-17'
---

使用 grid，把 flex 经典案例再来一遍。

<!-- more -->

## 参考内容

[稀土掘金——现代 Web 布局，使用 Grid 构建创意性 Web 布局](https://juejin.cn/book/7161370789680250917/section/7161624078397210638?suid=1908407916041614&source=pc)

基本就是把之前写过的 [felx 常见布局](./%E3%80%8A%E7%8E%B0%E4%BB%A3Web%E5%B8%83%E5%B1%80%E3%80%8B%E5%85%B6%E4%B8%89%EF%BC%9Aflex%20%E7%BB%8F%E5%85%B8%E5%B8%83%E5%B1%80.md)再来一次。

## 等高布局

![等高布局](https://s2.loli.net/2023/02/17/ufbSxaGNlFscZOv.png)

使用子网格，能够将每一个卡片内的文本对齐。

## 等分列

类似于 flex 中需要取消元素的 `min-content`，将 `min-width: 0`。

grid 要保证列宽度相等也可以使用 `min-width: 0`。

另外，因为 `1fr` ＝ `minmax(min-content, 1fr)`。

使用 **`minmax(0, 1fr)`**，同样能起到取消最小宽度的作用。

### 响应式均分列

![列均分](https://s2.loli.net/2023/02/17/LQ8tknlHbpJDd74.gif)

一种比较常用的写法：

```css
.wrapper {
  grid-template-columns: repeat(auto-fit, minmax(min(100% - var(--gutter) * 2, var(--min-single-width)), 1fr));
}
```

> 注：存疑，上面那个 `100% - var(--gutter) * 2` 是否真的有作用？我写的 `100%` 似乎也完全一样。

以后使用：

```css
grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min-single-width)), 1fr));
```

### 圣杯布局

![圣杯布局](https://s2.loli.net/2023/02/20/byUWjBZ6NftIJkd.gif)

用 `grid` 写圣杯，比 `flex` 方便太多了：

```css
/* 找准自己的位置 */
.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.sidebar { grid-area: sidebar; }
.footer { grid-area: footer; }

/* mobile (<768px) */
body {
  grid:
    "header" auto
    "nav" minmax(0, 1fr)
    "main" auto
    "sidebar" auto
    "footer" auto;
}
/* tablet (<1024px) */
@media only screen and (min-width: 768px) {
  body {
    grid:
      "header header" auto
      "nav main" minmax(0, 1fr)
      "nav sidebar" auto
      "footer footer" auto
      / 220px 1fr;
  }
}
/* desktop (>1024px) */
@media only screen and (min-width: 1024px) {
  body {
    grid:
      "header header header" auto
      "nav main sidebar" minmax(0, 1fr)
      "footer footer footer" auto
      / 220px minmax(0, 1fr) 220px;
  }
}
```

### 粘性底部布局

![Sticky Footer 布局](https://s2.loli.net/2023/02/20/SY4a6CXuc5h91l2.gif)

```css
body {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  /* 或者 */
  grid-template-rows: min-content auto min-content;
}
```

为什么上例中 `auto` 可以取得和 `minmax(0, 1fr)` 相同的效果？

#### `auto` 具体是怎么处理的？

- 块元素：`auto` = `100%`
- 内联元素：`auto` = `max-content`
- flex 元素：`auto` = `max-content`
  
  （前提是不被 `flex-grow` 和 `flex-shrink` 影响）
- **grid 元素**：

    简单概括下：
      最小值不小于 `min-size` 及 `max-content`，
      最大值占满剩余空间，**但优先度低于 `fr`**。（和 `fr` 混用基本就只能取最小值）

    ![grid auto](https://s2.loli.net/2023/02/20/eG8tHuwx9TkmyqK.jpg)

    > 因此：
    >
    > `1fr` = `minmax(auto, 1fr)` = `minmax(min-content, 1fr)`

### 百分百无滚动布局

![百分百无滚动](https://s2.loli.net/2023/02/20/cbgG7uajmSoDE8x.gif)

```css
body {
  height: 100vh;
  overflow-y: hidden;
  display: grid;
  grid-template-rows: min-content auto min-content;
  /* 或者 */
  grid-template-rows: auto minmax(0, 1fr) auto;
}
.content {
  overflow-y: auto;
}
```

### 12 列网格布局

```css
body {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
}
```

略过，`grid` 本身就是灵活的网格布局，没有必须要搞 12 列的意义。

### 九宫格布局

```css
ul {
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
```

略过，专业对口了属于是。

### 灵活弹性框

略，只要知道 `min-content` 可以使用 `minmax(0, 1fr)` 替代就行。

#### 多行标签省略号截断

![多行截断](https://s2.loli.net/2023/02/20/pkChxmqL7scO5iH.png)

```css
ul {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
li {
  display: inline-block;
}
```

### 高度动画

`transition` 无法完成 `height: auto` 的动画，这里可以使用 `grid-template-rows` 来解决。

::: code-group

```css{2-4,7-8,16}
.box {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows;
}
.box-inner {
  /* 超出隐藏必须整在内层上 */
  overflow: hidden;
}
.content {
  /* border padding 啥的，最好弄在更里面一层 */
  border: 1px solid #666;
  padding: 20px;
}
button:hover ~ .box {
  grid-template-rows: 1fr;
}
```

```html
<button>展开</button>
<div class="box">
  <div class="box-inner">
    <div class="content">
      some words...
    </div>
  </div>
</div>
```

:::

::: info
但是只支持 `fr` 值之间的动画。（不支持从绝对值到 `fr`）
:::

### 创意布局案例一：斜切大图杂志布局

![效果图1](https://s2.loli.net/2023/02/21/mJTcVMzt7L3gQXr.jpg)

![效果动图](https://s2.loli.net/2023/02/21/5uTFc4WmqGEPQA6.gif)

做这个例子时，有几个没接触过的效果：

#### 图片斜切

主要依靠 [`clip-path`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path) 属性。

可以理解为创建了一个蒙版，限制元素的可见范围。

例如上图中的大图裁剪：

```css
figure {
  /* 多边形裁剪 */
  /* 每一组两个数字，分别表示 横坐标 和 纵坐标 */
  clip-path: polygon(
    0 0,
    100% 0,
    65% 100%,
    0 100%
  );
}
```

#### 平行四边形块

如果直接使用 `skewX()` 扭曲 `div` 块，会导致里面的文字也产生变化，可以使用 `::after` 来完成：

```css{7}
h1:after {
  content: "";
  position: absolute;
  inset: 0; /* 等同于 top right bottom left 简写 */
  background: white;
  z-index: -1;
  transform: skewX(-20deg);
  filter: drop-shadow(8px 8px 0 rgb(0 0 0 / 0.5));
}
```

### 创意布局案例二：画报、漫画排版

![浪客行](https://s2.loli.net/2023/03/23/4YzFHJOqSW3e2dZ.gif)

这个案例没有特别的难点，但是在分析轨道数上给了我一点启示：

![标题超出](https://s2.loli.net/2023/03/23/8GdIJoN4vxsrhAy.jpg)

如上图，`title` 部分覆盖了部分图片，只使用 `grid-template-areas` 划区域没法达成覆盖，而使用网格线来标记可读性又太差。

不如换个思路，通过调整 `title` 的样式使其跳出网格。

**这样在规划网格轨道时，不需要太在意细微的凹凸。**
