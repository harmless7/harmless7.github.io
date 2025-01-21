---
title: "了解一下 WebComponent 模板和插槽"
description: "可复用组件不可缺少的部分：模板&插槽"
publishDate: "2025-01-21"
---

## 概述

很类似 Vue 中的模板和插槽的使用，但语法有所不同。

## 定义

- 使用 `<template>` 定义模板内容

  - 此标签包裹的内容不会出现在 DOM 中。
  - 内部可使用 `<style>` 设置样式，只会在模板内生效。

- 使用 `<slot>` 来设置默认插槽

  - 可在其中添加内容，作为未使用插槽时的默认显示。
  - 添加属性 `name` 可设置具名插槽。

simple example：

```html
<template class="user-info-template">
  <p><slot>defalut name</slot></p>
  <span><slot name="description"></slot></span>
</template>
```

## 使用

尽管没有强绑定，但是模板和插槽通常与自定义元素一起使用。

```js
customElement.define(
  "user-info",
  class UserInfo extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });
      const template = document.querySelector("#user-info-template");
      shadow.appendChild(template.content.cloneNode(true));
    }
  }
);
```

这里要注意的关键点是，我们将模版内容的克隆添加到通过 [`Node.cloneNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode) 方法创建的影子根上，`true` 的意思是深度克隆。

然后在 html 中使用即可：

```html
<user-info>
  基本上无害
  <span slot="description">mostly harmless</span>
</user-info>

<user-info>维特根斯坦</user-info>
```

注意，插槽不能以类似 Vue 中的 `<template slot="description"></template>` 方式使用。

## 在影子 DOM 中，定义插槽样式

需要使用 `::slotted` 伪元素。

```css
::slotted(.demo) {
  color: gray;
}
```

## refer

[MDN - ::slotted()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::slotted)
