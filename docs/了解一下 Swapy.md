---
# 标题
title: 了解一下 Swapy
# 描述
# description:
# 图标
icon: javascript
# 写作时间
date: 2024-08-26
# 分类（可多个）
category:
  - 技术学习
# 标签（可多个）
tag:
  - 工具
  - javascript
# 置顶
# sticky: true
# 收藏
# star: true
---

![效果](https://s2.loli.net/2024/08/27/VvurfhXC6RJIgmG.gif)

## 参考

- [Swapy 主页](https://swapy.xyz/)

- [Swapy Vue Demo](https://github.com/TahaSh/swapy/blob/main/examples/vue/App.vue)

## 简介

一个相当简洁的拖动库，简洁到没有任何多余的功能。官方文档甚至只有一页。

## 安装

```bash
pnpm install swapy
```

## 最简使用

先熟悉两个基本概念：

- 插槽 `slots`：可以放置拖动元素的区域，使用 `data-swapy-slot="xxx"` 标识。
- 拖动项 `items`：可以拖动的元素，使用 `data-swopy-item="xxx"` 标识。

拖动项可在插槽中自由拖动，交换位置。

```html
<div class="container">
  <div class="slot" data-swapy-slot="1">
    <div class="item" data-swapy-item="a">拖动项 a 中的一些内容</div>
  </div>
  <div class="slot" data-swapy-slot="2">
    <div class="item" data-swapy-item="b">拖动项 b 中的一些内容</div>
  </div>
  <div class="slot" data-swapy-slot="3">
    <div class="item" data-swapy-item="c">拖动项 c 中的一些内容</div>
  </div>
</div>
```

然后再对外层元素进行初始化：

```js
import { createSwapy } from "swapy";

const container = document.querySelector(".container");
const swapy = createSwapy(container, {
  animation: "dynamic", // 或者使用 "spring" （弹性动画）或 "none" （无动画）
});

// 可以在合适的时机启用或禁用拖动功能
// swapy.enable(true || false)
```

## 拖动把手

有时需要限制，让拖动项中只有某个元素可拖动。

可为元素添加 `data-swapy-handle` 属性，其他的区域将不能拖动。

```html
<div class="slot" data-swapy-slot="2">
  <div class="item" data-swapy-item="b">
    <p data-swapy-handle>拖动把手：只能通过我来拖动整块元素</p>
    拖动项 b 中的一些内容
  </div>
</div>
```

## 当前插槽高亮

swapy 会为当前即将被放置的 channel 添加 `data-swapy-highlighted` 属性。可以使用 CSS 为其添加属性：

```css
[data-swapy-highlighted] {
  background: #6666aa;
}
```

## 事件监听与位置持久化

使用 `onSwap` 监听拖动事件，函数返回一个只包含 `data` 属性的对象。

```js
swapy.onSwap((event) => {
  console.log(event.data.object);
  console.log(event.data.array);
  console.log(event.data.map);

  // event.data.object:
  // {
  //   'foo': 'a',
  //   'bar': 'b',
  //   'baz': 'c'
  // }

  // event.data.array:
  // [
  //   { slot: 'foo', item: 'a' },
  //   { slot: 'bar', item: 'b' },
  //   { slot: 'baz', item: 'c' }
  // ]

  // event.data.map:
  // Map(3) {
  // 'foo' => 'a',
  // 'bar' => 'b',
  // 'baz' => 'c'
  // }
});
```

它会以 `map`、`array`、`object` 三种形式来返回插槽与拖动项之间的对应关系。

此时就可以将位置信息持久化到存储中：

```js
swapy.onSwap(({ data }) => {
  // 存储到本地缓存，当然你也可以存到别的什么地方
  localStorage.setItem("slotItem", JSON.stringify(data.object));
});
```

此后对应地需要写活最初的 html 代码，让它根据存储顺序渲染拖动项，此处便不赘述了。
