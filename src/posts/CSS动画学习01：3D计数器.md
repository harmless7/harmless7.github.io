---
# 标题
title: CSS动画学习01：3D计数器
# 描述
# description:
# 图标
icon: css
# 写作时间
date: 2022-10-27
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

学习自 [哔哩哔哩 15 - 3D 计数器 (HTML+CSS) —— 创客界的一根葱](https://www.bilibili.com/video/BV1kd4y1z7Dr)

<!-- more -->

## 效果图

![效果图](https://s2.loli.net/2022/12/08/TFN8p9snAH3Cqou.gif)

## 实现思路

1. 先学会用 html & css 画出一个 3D 立方体
2. 再弄出五个这样的立方体
3. 添加 hover 旋转效果

### 画 3D 立方体

众所周知立方体有六个面，那么我们就先写出六个正方形。

``` text
<ul>
  <li>1</li>
  <li>2</li>
  ...
  <li>6</li>
</ul>
```

``` css
li {
  width: 100px;
  height: 100px;
  ...
}
```

![堆砌正方形](https://s2.loli.net/2022/12/08/1zVcXdvIxuCZ7ef.jpg)

他们需要在 3d 空间中组装出立方体，我们使用 ```position: absolute``` 将它们堆砌到同一个位置。

接下来，将整个 `ul` 变为 3d 空间：

``` css
/* transform-style */
/* 设置元素的子元素是位于 3D 空间中还是平面中。 */

/* flat：平面 */
/* preserve-3d：3D 空间 */
ul {
  transform-style: preserve-3d;
}
```

然后你会发现页面没有任何变化，正方形依然堆叠在一起。

为什么呢？因为画面没有旋转，你看到的是 3D 空间的正视图，所以与之前毫无变化。

![构建3D空间](https://s2.loli.net/2022/12/08/toZwqXAFbK6JdWr.jpg)

我们可以给画面旋转一定角度，来更好地观察 3D 视角。

``` css
ul {
  ...
  transform: rotateX(30deg) routateY(10deg);
}
```

> 关于空间中的旋转角度，可以参考文章：
> [《巧用左手判断CSS中transform：rotate旋转方向》](https://blog.csdn.net/Romu_lus/article/details/104579657)

![旋转画布](https://s2.loli.net/2022/12/08/pZS9HvBtxjnqNT5.gif)

接下来是最麻烦的一步：将 6 个面旋转位移至指定的位置：

![构建立方体](https://s2.loli.net/2022/12/08/GEVhN6SCQYsdmv4.gif)

方法并不唯一，但是要注意理解 3D 空间内坐标和位置的关系，多试几次就能掌握。以下是一个例子:

```css
li:nth-child(1) {
  transform: rotateX(0) translateZ(50px);
}
li:nth-child(2) {
  transform: rotateX(90deg) translateZ(50px);
}
li:nth-child(3) {
  transform: rotateX(180deg) translateZ(50px);
}
li:nth-child(4) {
  transform: rotateX(270deg) translateZ(50px);
}
li:nth-child(5) {
  transform: rotateY(90deg) translateZ(50px);
}
li:nth-child(1) {
  transform: rotateY(90deg) translateZ(-50px);
}
```

### 正方体 × 5

理论上直接复制粘贴 ```ul``` 的代码 5 次，然后给它们之间一个间距就好：

```html
<div class=box>
  <ul>...</ul>
  <ul>...</ul>
  <ul>...</ul>
  <ul>...</ul>
  <ul>...</ul>
</div>
```

``` css
.box {
  display: flex;
  gap: 10px;
}
```

![错误堆叠](https://s2.loli.net/2022/12/08/KedrjnLsaoXVT82.jpg)

额...还记得刚才的 ```transform-style: preserve-3d``` 吗？

由于多个 ul 并没有在一个 3d 环境下，这里需要在外层也设置一个：

```css
.box {
  ...
  transform-style: preserve-3d;
  transform: rotateY(30deg) rotateX(10deg);
}
.ul {
  ...
  /* 视角旋转也给到外层，而不是每个立方体内旋转 */
  /* transform: rotateY(30deg) rotateX(10deg); */

  /* 给ul设置一个宽高，将 ul 的体积撑开 */
  width: 100px;
  height: 100px;
}
```

![并列立方体](https://s2.loli.net/2022/12/08/LbgByzC65XmU9IQ.jpg)

成功

### 转起来

```css
.ul {
  transition: all 0.5s ease-in-out;
}
.box:hover ul {
  transform: rotateX(-180deg);
}
```

这步就很简单了，对每个 ```ul``` 设置动画时间与延迟就可以实现不同步旋转。当然纵向旋转也是可以的：

![最终效果](https://s2.loli.net/2022/12/08/AimgVTw1QK8RodI.gif)

## 总结

不算复杂的效果，当时能很好地帮助学习 css 中的 3d 效果。
