---
title: "了解一下 Shadow DOM"
description: "影子 DOM（Shadow DOM）允许你将一个 DOM 树附加到一个元素上，并且使该树的内部对于在页面中运行的 JavaScript 和 CSS 是隐藏的。"
publishDate: "2025-01-17"
---

## 概述

![浏览器控制台中的影子 DOM](https://s2.loli.net/2025/01/17/rcj4LektaTKwGDE.jpg)

Q: Shadow DOM 是什么？
A：是一种特殊的 DOM 树，它*依附于一个常规的 DOM 元素上*。

Q：Shadow DOM 有什么特性？
A：它不受外部的 js 及 css 影响。可以理解为一个隔离沙箱。

Q：Shadow DOM 有什么用？
A：与外部的隔离性，意味它很适合用来封装组件。它是 `Web Component` 的基础。

一些需要了解的基本术语：

- shadow host（影子宿主）：影子 DOM 附加到的**常规 DOM 节点**。
- shadow tree（影子树）：影子 DOM 内部的 DOM 树。
- shadow boundary（影子边界）：影子 DOM 终止，常规 DOM 开始的地方。
- shadow root（影子根）：影子树的根节点。

## 创建

需要对宿主 DOM 调用 [`attachShadow()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow) 方法来创建影子根实例。

### `attachShadow`

`attachShadow()` 接受一个参数来设置 shadow root，是一个 `ShadowRootInit` 字典，它包含两个字段：

- `mode`（必填）

  字符串类型，可选值为：`'open'` 和 `'close'`。

  代表是否允许在外部使用 js 来访问 Shadow DOM 内部。

  ```js
  element.attachShadow({ mode: "open" });
  element.shadowRoot; // 返回一个 ShadowRoot 对象

  element.attachShadow({ mode: "closed" });
  element.shadowRoot; // 返回 null
  ```

- `delegatesFocus`

  布尔类型。默认值为 `false`。

  它的作用有点类似 `<label>`：当 shadow DOM 中不可聚焦的位置被点击后，焦点是否会自动转移到 shadow DOM 内部的第一个可聚焦元素（如 `<input>`、`<textarea>` 等）。

  ```js
  const shadow = shadowHost.attachShadow({
    mode: "open",
    delegatesFocus: true,
  });
  shadow.innerHTML = `<span>我是不可聚焦元素</span> <input type="text" placeholder="我是可聚焦元素" />`;
  // 当 delegatesFocus 为 true，点击 span 元素就会选中 input，反之不会。
  ```

### 例子

```html
<div id="host"></div>
```

```js
// 创建影子 DOM
const host = document.querySelector("#host");
const shadow = host.attachShadow({ mode: "open" });

// 向影子 DOM 中添加元素，与普通 DOM 处理方式一致
const span = document.createElement("span");
span.textContent = "我在影子 DOM 中";
shadow.appendChild(span);
```

## 为影子 DOM 添加样式

影子 DOM 添加样式有几种方法：

- 编程式：使用 `CSSStyleSheet` 创建，可复用
- 声明式：使用 `<template>` 声明，或者直接在内容中写 `<style>`，不可复用

### 编程式

1. 创建一个空的 [`CSSStyleSheet`](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet) 对象
2. 使用 [`CSSStyleSheet.replace()`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/replace) 或 [`CSSStyleSheet.replaceSync()`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/replaceSync) 设置其内容
3. 通过将其赋给 [`ShadowRoot.adoptedStyleSheets`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/adoptedStyleSheets) 来添加到影子根

```js
// 创建影子 DOM
const host = document.querySelector("#host");
const shadow = host.attachShadow({ mode: "open" });

// 1. 创建一个样式表对象
const sheet = new CSSStyleSheet();

// 2. 为样式表设置内容
sheet.replaceSync("span { color: red; border: 2px dotted black;}");

// 3. 添加给影子根
shadow.adoptedStyleSheets = [sheet];
```

### 声明式

```html
<template id="my-element">
  <style>
    span {
      color: red;
    }
  </style>
  <span>影子 DOM 内容</span>
</template>

<div id="host"></div>
```

```js
const host = document.querySelector("#host");
const shadow = host.attachShadow({ mode: "open" });

const template = document.getElementById("my-element");
shadow.appendChild(template.content);
```

或者更直接一点：

```js
const host = document.querySelector("#host");
const shadow = host.attachShadow({ mode: "open" });

const style = document.createElement("style");
style.innerHTML = `
  .test {
    color: red;
  }
`;
shadow.appendChild(style);
```

## Refer

[MDN - 使用影子 DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_shadow_DOM)

[MDN - Element.attachShadow()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow)
