---
title: "了解一些 iconify"
description: "最现代的图标解决方案，替代 iconfont 的新方案"
publishDate: "2024-10-14 15:15:02"
---

## 优势

iconify 最大的卖点：[avoid vendor lock-in](https://iconify.design/docs/articles/vendor-lock-in)（避免厂商锁定）。

大多数图标集都有自己的图标组件或带有样式表的字体。

而为了能够尽可能灵活，iconify 选择**直接嵌入 svg 文件**。

iconify 有官方的 api 和 compoent，但不强制使用，可以本体化部署及实现。

所以它本质上还是一套庞大的 svg 图标库，及其相关的社区支持。

## 如何开始？

- 程序员使用：[浏览或搜索可用图标集](https://icon-sets.iconify.design/)，选择任何图标，您将看到代码示例。
- 设计师使用：[Figma](https://iconify.design/docs/design/figma/) 和 [Sketch](https://iconify.design/docs/design/sketch/) 中有插件可用。其他平台中，可以在[图标集](https://icon-sets.iconify.design/)中复制/粘贴 SVG。

## 概念

### 图标名

为了使图标易于使用，无论其来源如何，所有图标都遵循相同的命名约定。

图标名可以使用 `a-z`、`0-9`、`-`。但不能使用连续的连字符，例： `--`。

### 图标颜色

图标有两种类型：

- 硬编码调色板图标：<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="#eceff1" d="m20.1 16.2l.1 2.3l-1.6 3l-2.5 4.9l-.5 4.1l1.8 5.8l4.1 2.3h6.2l5.8-4.4l2.6-6.9l-6-7.3l-1.7-4.1z"/><path fill="#263238" d="M34.3 21.9c-1.6-2.3-2.9-3.7-3.6-6.6s.2-2.1-.4-4.6c-.3-1.3-.8-2.2-1.3-2.9c-.6-.7-1.3-1.1-1.7-1.2c-.9-.5-3-1.3-5.6.1c-2.7 1.4-2.4 4.4-1.9 10.5c0 .4-.1.9-.3 1.3c-.4.9-1.1 1.7-1.7 2.4c-.7 1-1.4 2-1.9 3.1c-1.2 2.3-2.3 5.2-2 6.3c.5-.1 6.8 9.5 6.8 9.7c.4-.1 2.1-.1 3.6-.1c2.1-.1 3.3-.2 5 .2c0-.3-.1-.6-.1-.9c0-.6.1-1.1.2-1.8c.1-.5.2-1 .3-1.6c-1 .9-2.8 1.9-4.5 2.2c-1.5.3-4-.2-5.2-1.7c.1 0 .3 0 .4-.1c.3-.1.6-.2.7-.4c.3-.5.1-1-.1-1.3s-1.7-1.4-2.4-2s-1.1-.9-1.5-1.3l-.8-.8c-.2-.2-.3-.4-.4-.5c-.2-.5-.3-1.1-.2-1.9c.1-1.1.5-2 1-3c.2-.4.7-1.2.7-1.2s-1.7 4.2-.8 5.5c0 0 .1-1.3.5-2.6c.3-.9.8-2.2 1.4-2.9s2.1-3.3 2.2-4.9c0-.7.1-1.4.1-1.9c-.4-.4 6.6-1.4 7-.3c.1.4 1.5 4 2.3 5.9c.4.9.9 1.7 1.2 2.7c.3 1.1.5 2.6.5 4.1c0 .3 0 .8-.1 1.3c.2 0 4.1-4.2-.5-7.7c0 0 2.8 1.3 2.9 3.9c.1 2.1-.8 3.8-1 4.1c.1 0 2.1.9 2.2.9c.4 0 1.2-.3 1.2-.3c.1-.3.4-1.1.4-1.4c.7-2.3-1-6-2.6-8.3"/><g fill="#eceff1" transform="translate(0 -2)"><ellipse cx="21.6" cy="15.3" rx="1.3" ry="2"/><ellipse cx="26.1" cy="15.2" rx="1.7" ry="2.3"/></g><g fill="#212121" transform="translate(0 -2)"><ellipse cx="21.7" cy="15.5" rx="1.2" ry=".7" transform="rotate(-97.204 21.677 15.542)"/><ellipse cx="26" cy="15.6" rx="1" ry="1.3"/></g><path fill="#ffc107" d="M39.3 35.6c-.4-.2-1.1-.5-1.7-1.4c-.3-.5-.2-1.9-.7-2.5c-.3-.4-.7-.2-.8-.2c-.9.2-3 1.6-4.4 0c-.2-.2-.5-.5-1-.5s-.7.2-.9.6s-.2.7-.2 1.7c0 .8 0 1.7-.1 2.4c-.2 1.7-.5 2.7-.5 3.7c0 1.1.3 1.8.7 2.1c.3.3.8.5 1.9.5s1.8-.4 2.5-1.1c.5-.5.9-.7 2.3-1.7c1.1-.7 2.8-1.6 3.1-1.9c.2-.2.5-.3.5-.9c0-.5-.4-.7-.7-.8m-20.1.3c-1-1.6-1.1-1.9-1.8-2.9c-.6-1-1.9-2.9-2.7-2.9c-.6 0-.9.3-1.3.7s-.8 1.3-1.5 1.8c-.6.5-2.3.4-2.7 1s.4 1.5.4 3c0 .6-.5 1-.6 1.4c-.1.5-.2.8 0 1.2c.4.6.9.8 4.3 1.5c1.8.4 3.5 1.4 4.6 1.5s3 0 3-2.7c.1-1.6-.8-2-1.7-3.6m1.9-18.1c-.6-.4-1.1-.8-1.1-1.4s.4-.8 1-1.3c.1-.1 1.2-1.1 2.3-1.1s2.4.7 2.9.9c.9.2 1.8.4 1.7 1.1c-.1 1-.2 1.2-1.2 1.7c-.7.2-2 1.3-2.9 1.3c-.4 0-1 0-1.4-.1c-.3-.1-.8-.6-1.3-1.1"/><path fill="#634703" d="M20.9 17c.2.2.5.4.8.5c.2.1.5.2.5.2h.9c.5 0 1.2-.2 1.9-.6c.7-.3.8-.5 1.3-.7c.5-.3 1-.6.8-.7s-.4 0-1.1.4c-.6.4-1.1.6-1.7.9c-.3.1-.7.3-1 .3h-.9c-.3 0-.5-.1-.8-.2c-.2-.1-.3-.2-.4-.2c-.2-.1-.6-.5-.8-.6c0 0-.2 0-.1.1zm3-2.2c.1.2.3.2.4.3s.2.1.2.1c.1-.1 0-.3-.1-.3c0-.2-.5-.2-.5-.1m-1.6.2c0 .1.2.2.2.1c.1-.1.2-.2.3-.2c.2-.1.1-.2-.2-.2c-.2.1-.2.2-.3.3"/><path fill="#455a64" d="M32 32.7v.3c.2.4.7.5 1.1.5c.6 0 1.2-.4 1.5-.8c0-.1.1-.2.2-.3c.2-.3.3-.5.4-.6c0 0-.1-.1-.1-.2c-.1-.2-.4-.4-.8-.5c-.3-.1-.8-.2-1-.2c-.9-.1-1.4.2-1.7.5c0 0 .1 0 .1.1c.2.2.3.4.3.7c.1.2 0 .3 0 .5"/></svg>
- 单调图标：<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52M7 15.25a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5m10 0a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5"/></svg>

前者不能改颜色，后者可以修改。

## 使用

### 在 css 中使用

🔣 原理：

- 将 svg 设置为 `background-image`：
  - ⭕️ 推荐使用！
  - 用 `width` 和 `height` 控制大小
  - 用 `color` （`background: currentColor`） 来设置单色图标的颜色

  ```css
  <!-- 多色图标 -- >
  .background-demo {
    display: inline-block;
    width: 32px;
    height: 32px;
    background-image: url("https://api.iconify.design/fluent-emoji-flat/alarm-clock.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  <!-- 单色图标 -- >
  .background-demo-2 {
    display: inline-block;
    width: 10em;
    height: 10em;
    --svg: url("data:image/svg+xml,...");
    background-color: currentColor;
    mask-image: var(--svg);
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
    color: red;
  }
  ```

- 将 svg 设置为伪元素的 `content`：
  - ❌️ 不推荐使用
  - 不能用 CSS 改宽高和颜色
  - 使用[公共 API](https://api.iconify.design)，后接参数进行设置（本质上是修改了 svg）

  ```css
  .content-demo::after {
    content: url("https://api.iconify.design/bi/bell-fill.svg?height=32&color=gray");
  }
  ```

✳️ 优缺点：

- 优点
  - 没有重复
  - 没有深 DOM 树
  - SVG 中的脚本不会被执行
- 缺点
  - 不能调整图标内的元素
  - CSS 会引入所有图标，不管你是否使用

🛠️ 工具：

- [Iconify API](https://iconify.design/docs/usage/css/no-code/)，通过接口获取 svg 或 css 数据，可使用公共的也可自己部署
- [TailwindCSS 中使用](https://iconify.design/docs/usage/css/tailwind/)
- [UnoCss 中使用](https://iconify.design/docs/usage/css/unocss/)
- [Iconify Utils 生成 CSS](https://iconify.design/docs/usage/css/utils/)，本质是一个 Nodejs 的包，可以根据图标名获取相关图标数据，然后用来生成本地的 CSS 文件

### 在 html 中使用

🔣 原理：

原理？html 中本来就支持 `<svg>`  标签。

当然，你也可以使用 `<img>` 或者 `<picture>` 标签，但没法改颜色。

✳️ 优缺点：

- 优点
  - 最大的自由度，可以改图标内细节
- 缺点
  - 每个图标有多个条目
  - 深 DOM 树，且体积大
  - 安全问题：使用第三方 svg 里面可能有脚本

🛠️ 工具：

- 组件
  - [Unplugin Icons](https://iconify.design/docs/usage/svg/unplugin/)：支持 `Vue`、`React` 等框架，[示例](https://github.com/unplugin/unplugin-icons/tree/main/examples)
  - [Astro Icon](https://iconify.design/docs/usage/svg/astro/)
- 函数
  - 即使用 [Iconify Utils 获取图标的 SVG 数据](https://iconify.design/docs/usage/svg/utils/)
- 不想写代码，那就在 [官方图标集](https://icon-sets.iconify.design/) 或 [Anthony Fu](https://icones.js.org/) 的网站里直接找 SVG 复制来用吧

### 按需图标

Iconify 生态中有一组接口：[Iconify API](https://iconify.design/docs/api/)，可以用来按需加载图标数据。

🔣 原理：

![theory](https://s2.loli.net/2024/10/14/GRt1Tiu3xU65LsV.jpg)

✳️ 优缺点：

- 优点
  - 用起来很简单
  - 尺寸小，因为按需加载
  - 可以多个可定制主题一起使用，而开发者无需关心哪些主题
  - 图标只在浏览器加载，而非在服务器呈现
- 缺点
  - 无法离线使用
  - 图标不会立即渲染。虽然有缓存，但还是有几毫秒延迟

📦️ 组件（`Web Component`）：

官方主推 `Web Component`。虽然也有热门框架的专用组件，但后续将停止维护。

Usage is simple:

```html
<iconify-icon icon="mdi:home"></iconify-icon>
```

https://iconify.design/docs/icon-components/#ui-frameworks
