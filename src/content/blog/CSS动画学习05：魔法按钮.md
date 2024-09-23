---
title: 'CSS动画学习05：魔法按钮'
description: 'Lorem ipsum dolor sit amet'
pubDate: '2023-06-23'
heroImage: '/blog-placeholder-2.jpg'
---

学习自 [Magic Button Hover Effects Animation Using HTML & CSS —— Bedimcode
](https://www.youtube.com/watch?v=vrt9o-O_JOo)

<!-- more -->

## 效果图

![效果图](https://s2.loli.net/2023/06/23/E1XbWx8SkJ6Yl5r.gif)

这效果第一眼就抓住了我，决定久违地写一篇 CSS 动画学习笔记。

## 实现思路

假3D和光效很唬人，然而实际上这里并没有用到什么新东西，是个纯 css 操作 dom 的小动画。

1. 绘制按钮本体 `.button`，并为其添加 `hover` 位移；
2. 使用 `::after` 为按钮绘制阴影，并在按钮 `hover` 时位移，造成立体按钮的错觉；
3. 按钮内使用两个 `div` 来绘制反射光效；
4. 按钮内绝对定位隐藏的几何图形 `img`，并在 `hover` 时位移显示；
5. 点击按钮时，位移按钮本体，造成例题点击的错觉。

### 绘制按钮

::: code-group

```html
<a href="#" class="button">
  <div class="button__content">
    <!-- 按钮的内容... -->
  </div>
</a>
```

```css
/* 按钮最外层 */
.button {
  position: relative;
  transition: transform .4s;
}
.button:hover {
  transform: rotate(-4deg) scale(1.1);
}

/* 按钮主体样式 */
.button__content {
  position: relative;
  background: linear-gradient(90deg, hsl(48, 100%, 50%) 0%, hsl(28, 100%, 54%, 100%));
  padding: 1.25rem 3rem;
  border-radius: 4rem;
  border: 3px solid hsl(225, 15%, 6%);
  color: hsl(225, 15%, 6%);
  display: flex;
  align-items: center;
  column-gap: .5rem;
  overflow: hidden;
  transition: transform .1s;
}
```

:::

### 绘制阴影

```css
.button::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: var(--gradient-color);
  border-radius: 4rem;
  border: 3px solid var(--black-color);
  box-sizing: border-box;
  transition: transform .3s;
}
.button:hover::before {
  transform: translate(-.5rem, .5rem);
}
```

### 反光光效

实际上在按钮内部添加了两个 `div` 及其 `:after` 伪元素，来模拟反光光效。

::: code-group

```html
<a href="#" class="button">
  <div class="button__content">
    <!-- 按钮的内容... -->

    <div class="button__reflection-1"></div>
    <div class="button__reflection-2"></div>
  </div>
</a>
```

```css
/* reflection shapes 反射形状 */
.button__reflection-1,
.button__reflection-2 {
  width: 8px;
  height: 120px;
  background-color: hsla(48, 30%, 95%, .3);
  rotate: 30deg;
  position: absolute;
  inset: 0;
  top: 0;
  left: -180%;
  margin: auto;
  transition: left .6s cubic-bezier(.2, .5, .2, 1.2);
}

.button__reflection-1::after {
  content: "";
  width: 26px;
  height: 100%;
  background-color: hsla(48, 30%, 95%, .3);
  position: absolute;
  top: -1rem;
  left: 1.25rem;
}

.button__reflection-2::after {
  content: "";
  width: 40px;
  height: 100%;
  background-color: hsla(48, 30%, 95%, .3);
  position: absolute;
  top: -1rem;
  left: .8rem;
}
```

:::

![光效](https://s2.loli.net/2023/06/23/dpVUOW24ofBDbXY.gif)

这里的难点其实是怎么模拟光效比较像。为了更明显地观察，我给光效条染了颜色。

### 几何图形

这里实在乏善可陈，简单的图形可以直接使用 `svg` 绘制。

注意在 `hover` 前将这些图形的 `opacity: 0`，隐藏住即可。

### 点击按钮

这一步是我自己加的。因为知道原理只是两个图层的假立体，我大失所望。

那么加假点击同样很简单，对按钮向阴影稍微位移，显得像是按钮变瘪了。再调整一下光效的位置，搞定。

## 总结

好的动画效果并不一定要很厉害的技术，有时重要的是美感、创意和巧思。
