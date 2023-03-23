---
# 标题
title: 《现代Web布局》其八：grid 创意布局
# 描述
description: 搞点骚的。 
# 图标
icon: css
# 写作时间
date: 2023-02-21
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

`grid` 是一种二维布局，很适合搭建各种复杂的页面布局。

### 案例1：斜切大图杂志布局

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

### 案例2：画报、漫画排版

![浪客行](https://s2.loli.net/2023/03/23/4YzFHJOqSW3e2dZ.gif)

这个案例没有特别的难点，但是在分析轨道数上给了我一点启示：

![标题超出](https://s2.loli.net/2023/03/23/8GdIJoN4vxsrhAy.jpg)

如上图，`title` 部分覆盖了部分图片，只使用 `grid-template-areas` 划区域没法达成覆盖，而使用网格线来标记可读性又太差。

不如换个思路，通过调整 `title` 的样式使其跳出网格。

**这样在规划网格轨道时，不需要太在意细微的凹凸。**
