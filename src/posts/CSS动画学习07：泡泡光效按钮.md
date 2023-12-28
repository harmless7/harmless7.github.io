---
# 标题
title: CSS动画学习07：泡泡光效按钮
# 描述
# description:
# 图标
icon: css
# 写作时间
date: 2023-12-28
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

学习自 [cssfx](https://cssfx.netlify.app/)

<!-- more -->

## 效果图

![效果图](https://s2.loli.net/2023/12/28/haYDcIX3pQgdSbE.gif)

[codepen 线上展示地址](https://codepen.io/khwfsslg-the-reactor/pen/gOEpLXV)

## 实现思路

1. 写个按钮。

    按钮设置 `position: relative`、`z-index: 1` 及 `overflow: hidden`。

2. 写个泡泡光效。

    使用 `::before` 绘制一个圆形来当泡泡。使用 `position: absolute` 定位到泡泡膨胀的起始位置

3. 写动画

    使用 `transform` & `transition` 来完成泡泡从小变大的动画，占满整个按钮。

### 绘制按钮

![button](https://s2.loli.net/2023/12/28/MAQorWILwg7NFZE.jpg)

::: code-group

```html
<div class="btn">click me!</div>
```

```css
.btn {
  /* 其它略...重点是下面三个属性 */
  position: relative;
  overflow: hidden;
  z-index: 1;
}
```

:::

### 绘制泡泡光效

以从中间开始扩散的光效为例：

![bubble](https://s2.loli.net/2023/12/28/cSk19Vnj3QH6Ds8.jpg)

```css
.btn::before {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #19c2eb;
  /* 确保不会盖过文字 */
  z-index: -1;
  /* 居中到按钮中心 */
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate3d(-50%, -50%, 0);
}
```

然后我们需要多加一个 `scale3d(0, 0, 0)`，将初始状态下的泡泡光效缩小到不可见。（因为初始状态下没有泡泡）

```css
.btn::before {
  /* 其他略 */
  transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 0);
}
```

### 为泡泡添加动画

```css
.btn::before {
  transition: transform 300ms ease-in-out;
}
/* 这里以 hover 触发为例，其他方式同理 */
.btn:hover::before {
  /* 圆心位置不变，圆等比例放大 */
  transform: translate3d(-50%, -50%, 0) scale3d(15, 15, 15);
}
```

![finished](https://s2.loli.net/2023/12/28/TlPW8LYq1JagOSD.gif)

完成。
