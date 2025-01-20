---
title: "了解 WebComponent 自定义元素"
description: ""
publishDate: "2025-01-20"
---

自定义元素（custom element）：即由 Web 开发人员定义行为的 HTML 元素，扩展了浏览器中可用的元素集。

## 分类

分为两种：

- **自定义内置元素**

  继承至原有的 HTML 元素，例如 `HTMLImageElement` 或 `HTMLParagraphElement`。

  使用原有元素并加上 `is` 属性来使用，例：

  ```html
  <p is="custom-paragraph-element"></p>
  ```

- **独立自定义元素**

  继承 HTML 元素基类 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement)。

  然后像已有的内置元素一样使用：

  ```html
  <custom-element></custom-element>
  ```

## 如何使用？

1. **编写**：实现自定义组件类，并继承 `HTMLElement` 或其他基类
2. **注册**：使用 [`customElements.define()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define) 将自定义组件注册到登记表

## 编写

### 构造函数

```js
class customElement extends HTMLElement {
  contructor() {
    super();
  }
}
```

有一些注意事项：

- 无参数的 `super()` 必须是构造函数中第一个语句。

- 构造函数内部的 `return` 语句必须非常小心使用，除非它是一个简单的提前返回（例如 `return` 或 `return this`）。否则，不能在构造函数中出现 `return` 语句。

- 通常应尽可能将工作推迟到 `connectedCallback` 中，特别是涉及获取资源或渲染的工作。

  然而，请注意，`connectedCallback` 可能会被调用多次，因此，任何真正只需要执行一次的初始化工作都需要有一个防护机制，以防止它被执行多次。

- 一般而言，构造函数应该用于设置初始状态和默认值，并设置事件监听器以及可能的阴影根（shadow root）。

### 生命周期

- `connectedCallback`：当自定义元素第一次被连接到文档 DOM 时被调用。

- `disconnectedCallback`：当自定义元素与文档 DOM 断开连接时被调用。

- `adoptedCallback`：当自定义元素被移动到新文档时被调用。

- `attributeChangedCallback`：当自定义元素的一个属性被增加、移除或更改时被调用。

## 注册

使用 [`CustomElementRegistry.define()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define) 函数。

[`CustomElementRegistery`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry)（自定义元素登记表）是一个接口，可以注册、获取、更新自定义组件。要获取它的实例可以使用 `window.customElements`。

```js
// 独立自定义元素
customElements.define(
  "custom-element",
  class customElement extends HTMLElement {}
);

// 自定义内置元素
customElements.define(
  "custom-button",
  class customButton extends HTMLButtonElement {},
  { exteds: "button" },
);
```

`define` 的三个参数分别是：

- name (required): 组件名称

- constructor (required): 自定义元素构造器

- options：控制元素如何定义，目前只有一项：

  - `extends`：指定继承哪个已有元素。当*自定义内置元素*时必填，否则会报错。

## refer

[MDN - 使用自定义元素](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_custom_elements)

[MDN - HTMLElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement)

[github - Web Components 案例](https://github.com/mdn/web-components-examples)

[MDN - CustomElementRegistry](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry)

[MDN - CustomElementRegistry.define()](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define)

[HTML 标准：custom-elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements)
