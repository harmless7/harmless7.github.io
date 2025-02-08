---
title: "了解一下 WebComponent 自定义元素"
description: "论要如何在原生 JS 中自定义标签"
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

    // super() 的返回值是对当前元素的引用
    // self = super();

    // 在这里 this 指向本自定义元素的 Dom
  }
}
```

有一些注意事项：

- 无参数的 `super()` 必须是构造函数中第一个语句。

- 构造函数内部的 `return` 语句必须非常小心使用，除非它是一个简单的提前返回（例如 `return` 或 `return this`）。否则，不能在构造函数中出现 `return` 语句。

- 通常应尽可能将工作推迟到 `connectedCallback` 中，特别是涉及获取资源或渲染的工作。

  然而，请注意，`connectedCallback` 可能会被调用多次，因此，任何真正只需要执行一次的初始化工作都需要有一个防护机制，以防止它被执行多次。

- 一般而言，构造函数应该用于设置初始状态和默认值，并设置事件监听器以及可能的阴影根（shadow root）。

    以官方实例中的 [`editable-list`](https://github.com/mdn/web-components-examples/blob/main/editable-list/main.js) 构造函数为例：

    ```js
    constructor() {
      // 建立原型链
      super();

      // 附加影子树，并且返回影子根的引用
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: 'open' });

      // 创建一个 editable-list 组件的容器
      const editableListContainer = document.createElement('div');

      // 通过 getters 获取属性
      const title = this.title;
      const addItemText = this.addItemText;
      const listItems = this.items;

      // 为了更易读，给我们的容器添加类名
      editableListContainer.classList.add('editable-list');

      // 为组件编写 html
      editableListContainer.innerHTML = `
        <style>
          li, div > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .icon {
            background-color: #fff;
            border: none;
            cursor: pointer;
            float: right;
            font-size: 1.8rem;
          }
        </style>
        <h3>${title}</h3>
        <ul class="item-list">
          ${listItems.map(item => `
            <li>${item}
              <button class="editable-list-remove-item icon">&ominus;</button>
            </li>
          `).join('')}
        </ul>
        <div>
          <label>${addItemText}</label>
          <input class="add-new-list-item-input" type="text">
          <button class="editable-list-add-item icon">&oplus;</button>
        </div>
      `;

      // 绑定事件
      this.addListItem = this.addListItem.bind(this);
      this.handleRemoveItemListeners = this.handleRemoveItemListeners.bind(this);
      this.removeListItem = this.removeListItem.bind(this);

      // 将容器添加到影子 DOM 中
      shadow.appendChild(editableListContainer);
    }
    ```

### 生命周期回调

- `connectedCallback`：当自定义元素第一次被连接到文档 DOM 时被调用。

- `disconnectedCallback`：当自定义元素与文档 DOM 断开连接时被调用。

- `adoptedCallback`：当自定义元素被移动到新文档时被调用。

- `attributeChangedCallback`：当自定义元素的一个属性被增加、移除或更改时被调用。

### 属性

不同于类似 Vue 的组件属性，可以使用各种类型。

**自定义元素属性在 HTML 中，只能使用字符串类型。**

因此在使用非字符串类型的属性时，需要通过自定义组件内的 getter 和 setter 来解析和设置。

```html
<my-customer-element
  total="4396"
  list="[{ id: 1, name: '张三' }, { id: 2, name: '李四' }]"
></my-customer-element>
```

```js
class MyCustomerElement extends HTMLElement {
  contructor() {
    super();

    console.log(`total: ${this.total}`);
    for (const item of this.list) {
      console.log(`item${item.id}: ${item.name}`);
    }
  }

  // 处理数字属性
  get total() {
    return Number(this.getAttribute("total"));
  }

  set total(val) {
    this.setAttribute("total", String(val));
  }

  // 处理 json 对象属性
  get dataJson() {
    return JSON.parse(this.getAttribute("list"));
  }

  set dataJson(val) {
    this.setAttribute("list", JSON.stringfiy(val))
  }
}
```

### 响应属性变化

类中可以定义一个名为 `observedAttributes` 的静态属性，里面存放*需要变更通知的属性名*。

然后使用生命周期中的 `attributeChangedCallback` 来监听属性变化，该回调接受三个参数：

- 发生变化的属性名（需在 `observedAttributes` 中定义）
- 旧的值
- 新的值

```js
class customElement extends HTMLElement {
  static observedAttributes = ["size"];
  // or
  // get static observedAttributes() {
  //   return ["size"];
  // }

  attributeChangedCallback(name, old, val) {
    console.log(`属性 ${name} 已由 ${old} 变更为 ${val}。`);
  }
}
```

> 要注意：**属性被首次解析时也会触发** `attributeChangedCallback`！类似于 Vue 的 `Watch` 中的 `immediate` 配置。

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

[web.dev - 自定义元素最佳实践](https://web.dev/articles/custom-elements-best-practices?hl=zh-cn)