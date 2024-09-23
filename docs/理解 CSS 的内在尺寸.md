---
# 标题
title: 理解 CSS 的内在尺寸
# 描述
# description:
# 图标
icon: css
# 写作时间
date: 2022-12-07
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

学习自：[(译) CSS min-content、max-content 和 fit-content 属性值介绍](https://juejin.cn/post/6844904065692909576)

彻底搞懂 `min-content`, `max-content`, `fit-content`。

<!-- more -->

## 理解什么是 **内在尺寸**

有内在尺寸就有外在尺寸。

外在尺寸：用精确的值指定元素的尺寸。

```css
div {
  height: 100px;
  inline-size: 20vw;
}
```

内在尺寸：**由元素内部的内容来动态地设定尺寸**。

```css
div {
  inline-size: min-content;
  block-size: max-content;
}
```

需要学习的内在尺寸属性有三个：`min-content`, `max-content`, `fit-content`。

## min-content

一言蔽之：**元素尺寸 = 所有子元素尺寸中最大的**

以一张图来说明：

![min-content](https://s2.loli.net/2022/12/08/dMHXlDspyf1OmW8.jpg)

## max-content

可以理解为子元素比较刚，强撑着父元素大小，不被更外层影响。

![max-content](https://s2.loli.net/2022/12/08/xWsTVEK8QrOplN6.jpg)

## fit-content

重头戏，这个属性是 `min-content` 和 `max-content` 的结合。

> `fit-content` 默许使用 `max-content`；
> 
> 如果 可用空间 < `max-content`，那就使用 可用空间；
> 
> 如果 可用空间 < `min-content`，那就使用 `min-content`。

![fit-content](https://s2.loli.net/2022/12/08/gewxOvzMuaXkV9c.gif)

## 使用案例

### 1. 完全撑开又不越界的 wrapper

假如需要给一张不定大小的图片包一层 wrapper

```html
<div class=wrapper>
  <img src="..." />
  <p>这是一段图片的说明文本</p>
</div>
```

这时需要这层 wrapper 贴合图片大小，我们使用 `max-content`。

![eg1:max-content](https://s2.loli.net/2022/12/08/uTaOY2eIWio4yKG.jpg)

但这样有一个隐患：当图片特别大，或者 wrapper 外层可视范围非常小时，就会出现滚动条。

![eg1:max-content弊端](https://s2.loli.net/2022/12/08/Y72SHWaZRMuwQf5.jpg)

这时候使用 `fit-content` 刚好解决这个问题！

当外层比图片大，wrapper 会使用图片的大小（即 `max-content`）；

当外层比图片小，wrapper 会使用外层的大小（即 可用空间），直至到达 `min-content`；

![eg1:fit-content](https://s2.loli.net/2022/12/08/vrR9Wuc7COBeDzs.jpg)

> **注意！**
> 
> 这里需要把图片的宽度设置为 `width: 100%` 或 `max-width: 100%` ！
> 
> 若不设置图片宽度为比例值，则图片是一个没有弹性的刚体（宽度定死），那么 `min-content` 的值也一直会等于图片宽度。
> 
> 根据 `fit-content` 的原则，若 可用空间 小于 `min-content`，就使用后者。
> 
> 那么图片和 wrapper 就始终不会缩小，依然会出现滚动条。

### 2. 完美下划线

![eg2](https://s2.loli.net/2022/12/08/Je4jxOdHcfqgbB9.jpg)

### 3. fit-content()

这个函数只可以用在 `grad` 布局上，它可以在保留 `fit-content` 特征的同时，为其设定一个最大宽度。
