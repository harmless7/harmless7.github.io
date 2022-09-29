---
# 标题
title: StyleLint——CSS也要规范化
# 短标题
# shortTitle: 
# 描述
# description: 
# 不是文章
# notArticle: true
# 图标
icon: article
# 作者
# author: 基本上无害
# 原创
isOriginal: true
# 写作时间
date: 2022-07-27
# 分类（可多个）
category:
  - 学习笔记
  - 前端
# 标签（可多个）
tag:
  - 前端
  - 工具
  - css
# 置顶
# sticky: true
# 收藏
# star: true
# 不添加至文章列表
# article: false
# 不添加至时间线
# timeline: false
# 预览图（绝对路径）
image: ""
# banner（横幅图片）
banner: ""
---

既然 ESLint 都有了，StyleLint 也不能少。

<!-- more -->

## 为什么 CSS 也要规范化

一般来说，因为语法复杂度并不高，CSS 代码不会很乱。

那么为什还需要一个专门的规范工具呢？

因为除了格式，**顺序** 同样很重要。

### 顺序？

是的，CSS 是有一个推荐顺序的。好的顺序不仅易于查看，而且能优化网页加载的性能。

具体顺序如下：

1. 定位属性：position display float left top right bottom overflow clear z-index
2. 自身属性：width height padding border margin background
3. 文字样式：font-family font-size font-style font-weight font-varient color
4. 文本属性：text-align vertical-align text-wrap text-transform text-indent text-decoration letter-spacing word-spacing white-space text-overflow
5. CSS3 中的新增属性：content box-shadow border-radius transform

这样可以减少浏览器的 **`reflow`（回流）**，提升渲染 dom 的性能。

等等...什么是回流？

### `reflow` 回流？

这与浏览器的渲染流程有关。

（详情可以看 [浏览器的回流与重绘 (Reflow & Repaint)](https://blog.csdn.net/zxl1990_ok/article/details/121364430) 这篇文章）

简单来说就是一个元素改变尺寸、位置之类的属性时，牵一发动全身，浏览器需要重新渲染与其相关的元素，甚至是整个文档。

另外还有一个概念叫 **`repaint`（重绘）**，指的是修改除位置尺寸属性时，消耗较小的重绘页面的行为。

### 我的理解

将定位属性写在最前面，浏览器读到的时候就直接 回流 了。

如果不写在最前面，浏览器先处理其他的属性，然后读到定位属性，还是要重新画，这样浪费了性能。

大概率是不对的，没有找到很易懂的大佬文章。以后加深了对浏览器的理解回来修改这段。

## 安装

回到正题，先贴一个官方文档：[StyleLint 文档](https://stylelint.io/)

1. 安装 `StyleLint` 以及 `stylelint-config-standard` （标准配置包）

    ```base
    pnpm i -D stylelint stylelint-config-standard
    ```

2. 在项目根目录下创建 `.stylelintrc.json` 配置文件

    ```json
    // .stylelintrc.json

    // 类似 ESLint，需要在配置文件中声明使用了什么规则包，以下是两个官方包
    {
      // "extends": "stylelint-config-recommended " // 只避免错误的规则
      "extends": "stylelint-config-standard" // 推荐，包含了 Google Airbnb 等样式指南
    }
    ```

安装结束。

## 检错 & 纠错

检错

```base
npx stylelint "**/*.css"
```

纠错

```base
npx stylelint "**/*.css" --fix
```

当然，你也可以配置一个 npm 命令

```json
// package.json

"scripts": {
  "lint:css": "stylelint **/*.{vue,css,sass,scss,less} --fix"
},
```

## 排序扩展

基础安装后的 StyleLint 并没有顺序检测功能，需要安装一个扩展：`stylelint-order`。

```base
pnpm i stylelint-order -D
```

安装完成后，在 `.stylelintrc.json` 文件中配置：

```json
// .stylelintrc.json

{
  "plugins": "stylelint-order"
}
```

但是不同于 ESLint，这里仅仅配置 `plugins` 还不够。

StyleLint 要求添加插件后，在 `rules` 中配置插件。

`stylelint-order` 文档里是这么写的：

> 将 stylelint-order 添加到您的 Stylelint 配置 `plugins` 数组中，然后将您需要的规则添加到 `rules` 列表中。 stylelint-order 中的所有规则都需要使用 order 命名空间。

```json
// .stylelintrc.json

{
  "plugins": [
    "stylelint-order"
  ],
  "rules": {
    // order/order 指定声明块中内容的顺序
    // 这里指定 自定义属性 放在 CSS 声明 前面
    // 详细见 https://github.com/hudochenkov/stylelint-order/blob/HEAD/rules/order/README.md#examples
    "order/order": [
      "custom-properties",
      "declarations"
    ],
    // order/properties-order 指定声明块中属性的顺序
    "order/properties-order": [
      "width",
      "height"
    ],
    // properties-alphabetical-order 指定声明块中，属性的字母顺序
    "properties-alphabetical-order": true,
  }
}
```

但是我懒，不想自己配排序的规则，那么就只能用个现成的：`stylelint-config-recess-order`

在 `stylelint-order` 文档中提到的三个包这个最热，就它了。

[stylelint-config-recess-order 文档](https://www.npmjs.com/package/stylelint-config-recess-order)

```base
pnpm i stylelint-config-recess-order -D
```

配置如下：

```json
// .stylelintrc.json

{
  "extends": ["stylelint-config-recess-order"],
  "rules": {
    // 在此处添加和覆盖其它规则
  },
}
```

你会发现它甚至不需要配置 `stylelint-order` 的 `plugins` 即可使用，都已经封装好了。

## 如何与 Vue 一同使用？

使用 `stylelint-config-html` 来添加对 Vue 的支持。

[stylelint-config-html 文档](https://github.com/ota-meshi/stylelint-config-html)

安装：

```base
pnpm install --save-dev postcss-html stylelint-config-html
```

这里需要使用 postcss-html，相关知识等后面再补

配置：

```json
// .stylelintrc.json

{
  "extends": "stylelint-config-html/vue"
}
```

## 再加上预处理器？

[stylelint-scss 文档](https://www.npmjs.com/package/stylelint-scss)

安装：

```base
pnpm i stylelint-scss
```

配置：

```json
// .stylelintrc.json

{
  "plugins": [
    "stylelint-scss",
  ]
}
```

## 封盘

写着写着感觉还有很多前置需要补充，暂且搁置。
