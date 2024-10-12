---
title: 'CSS动画学习06：打钩动画'
description: 'Lorem ipsum dolor sit amet'
publishDate: '2023-10-30'
heroImage: '/blog-placeholder-2.jpg'
---

学习自 [[CSS] 打勾动画 —— CodingStartup起码课
](https://www.bilibili.com/video/BV1ME411F7BG/?spm_id_from=333.337.search-card.all.click&vd_source=cbb9bae25f5ac9e51f8ff965eb794230)

<!-- more -->

## 效果图

![效果图](https://s2.loli.net/2023/10/30/ZMY9Np21bCTKtEX.gif)

简单且常见。

## 实现思路

使用 `svg` 绘制圆圈和打钩图形，然后使用 `stroke-array` 和 `stroke-offset` 完成路径动画。

1. svg 绘制图形
2. 设定 `stroke-array` 和 `stroke-offset` 值
3. 添加路径动画

### 绘制图形

![绘制图形](https://s2.loli.net/2023/10/30/Ej4YVOWoeLI3igm.jpg)

```html
<svg height="200px" width="200px">
  <circle r="90px" cy="100px" cx="100px" fill="none" stroke="#68E534" stroke-width="10px" stroke-linecap="round" />
  <polyline fill="none" stroke="#48E534" points="44,107 86.5,142 152,69" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

### 设定 `stroke` 属性

通过 `stroke` 属性来模拟路径动画的原理，在 [CSS动画学习03：卫星环绕loading](./CSS%E5%8A%A8%E7%94%BB%E5%AD%A6%E4%B9%A003%EF%BC%9A%E5%8D%AB%E6%98%9F%E7%8E%AF%E7%BB%95loading.md) 已经介绍过了，此处不再赘述。

我们先为两个图形添加类名，然后使用 css 为圆环添加 `stroke-array`，值等于圆环的周长。

然后我们随便给它一个 `stroke-offset` 属性观察一下效果：

::: code-group

```html
<svg height="200px" width="200px">
  <circle ... class="circle" />
  <polyline ... class="tick" />
</svg>
```

```css
body {
  /* 圆形半径 */
  --circle-r: 90px; 
  /* 圆形周长 */
  --circle-perimeter: calc(90px * 2 * 3.1415);
}
.circle {
  stroke-dasharray: var(--circle-perimeter);
  stroke-dashoffset: 100px;
}
```

:::

![随便的缺口](https://s2.loli.net/2023/10/30/2OsoN6IjXaCpGTf.jpg)

可以看到，设置了 `stroke-offset` 的圆环缺口始于它的 **三点钟方向**，并沿着 **逆时针** 方向扩展。

我们想要路径动画，从圆环的顶部开始。因此我们需要将圆环逆时针旋转 90°。

```html
<svg height="200px" width="200px">
  <circle ... class="circle" transform="rotate(-90, 100, 100)" />
  <polyline ... class="tick" />
</svg>
```

:::info
svg 中 transform 的写法与 css 中还是有区别的，详见 [Rotate](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/transform#rotate)。

当然这里也可以使用 css 的 `transform-origin` 来完成。
:::

旋转后的效果如下：

![旋转后](https://s2.loli.net/2023/10/30/EH6Sc8k3fnDqrPT.jpg)

类似的逻辑，我们为打钩图案添加 `stroke` 属性，并将它们的 `stroke-offset` 都设置为图案总长度（即刚好藏起整个图形）。

```css
.circle {
  stroke-dasharray: var(--circle-perimeter);
  stroke-dashoffset: var(--circle-perimeter);
}
.tick {
  stroke-dasharray: 175px;
  stroke-dashoffset: 175px;
}
```

### 添加路径动画

接下来分别定义圆环和打钩的动画，将 `stroke-offset` 从总长度变化到 0。

```css
@keyframes circle {
  0% {
    stroke-dashoffset: var(--circle-perimeter);
  }
  100% {
    stroke-dashoffset: 0px;
  }
}
@keyframes tick {
  0% {
    stroke-dashoffset: 175;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
```

添加一个 checkbox 用来触发动画：

::: code-group

```html
  <input type="checkbox" />
  <svg height="200px" width="200px">
    <circle ... class="circle" />
    <polyline ... class="tick" />
  </svg>
```

```css
input[type="checkbox"]:checked + svg .circle {
  animation: circle 1s ease-in-out;
  animation-fill-mode: forwards; /* 动画播放完后保持样式 */
}
input[type="checkbox"]:checked + svg .tick {
  animation: tick 1s ease-in-out 700ms; /* 给打钩动画一个延迟，慢于圆环 */
  animation-fill-mode: forwards;
}
```

:::

![大功告成](https://s2.loli.net/2023/10/30/ZMY9Np21bCTKtEX.gif)

完成。
