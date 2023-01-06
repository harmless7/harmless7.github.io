---
# 标题
title: 《现代Web布局》其五：grid 自动定位
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
date: 2023-01-06
# 分类（可多个）
category:
  - 读书笔记
  - 前端
# 标签（可多个）
tag:
  - css
  - 前端
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

梳理 grid 布局的使用。

<!-- more -->

## 参考内容

[稀土掘金——现代Web布局，定义一个网格布局](https://juejin.cn/book/7161370789680250917/section/7161623971073359902)

[MDN——网格模板区域](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Grid_Template_Areas)

[MDN——CSS网格布局中的自动定位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Auto-placement_in_CSS_Grid_Layout)

[MDN——grid-template](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template)

[MDN——grid-auto-flow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-flow)

## 自动定位 和 `grid-auto-flow`

`grid` 子元素，可以用属性将它定义到容器中的某个区域。

但如果不使用属性定位，它也会自动填充进区域中。

填充原则：**依次填充每一行，必要时添加新行（隐式轨道）。**

我们可以使用 `grid-auto-flow` 来控制流的方向。

### 按行和按列

![grid-auto-flow-1](https://s2.loli.net/2023/01/06/JszU6aY2dVP1IMC.jpg)

- `grid-auto-flow: row`：自动填充行，必要时添加行
- `grid-auto-flow: columns`：自动填充列，必要时添加列

### `dense` (密集) 和 `sparse` (稀疏)

![dense](https://s2.loli.net/2023/01/06/EKFXBpZ86PvJ9gk.jpg)

子元素有时会占据多个单元格，这可能会导致留出空隙。

`sparse`(默认值) 属性，会无视空隙继续往后面自动定位元素。

而 `dense` 属性，能让后来的元素尝试去填补之前留下的空隙。（但同时也可能导致原来出现的次序被打乱）

> `dense` `sparse` 可以与 `row` `column` 同时使用：
>
> ```css
> .demo {
>   grid-auto-flow: row dense;
> }
> ```

## 究极简写

[上文](./%E3%80%8A%E7%8E%B0%E4%BB%A3Web%E5%B8%83%E5%B1%80%E3%80%8B%E5%85%B6%E5%9B%9B%EF%BC%9Agrid%20%E5%B8%83%E5%B1%80%E5%9F%BA%E7%A1%80.md) 介绍了 grid 布局的相关基础概念，包括：

- 容器
- 轨道
- 线
- 单元
- 区域
- 间距（沟槽）

用于设置 grid 布局的属性繁多，但基本可以说，最终都是为划定 **区域** 而服务。因为 划分区域 = 规划布局空间。

使用 `grid-template` 和 `grid` 属性，几乎可以将布局所需的信息，一次性定义完毕。

### `grid-template`

#### 第一种用法，同时设置行列轨道

![grid-template-1](https://s2.loli.net/2023/01/06/VULrG4qNEMCjdfR.jpg)

使用 `/` 分隔两串轨道列表，左边的代表 `grid-template-rows`，右边的代表 `grid-template-columns`。

#### 第二种用法，设置轨道 + 区域命名 + 行网格线命名

![grid-template-2](https://s2.loli.net/2023/01/06/GHlfnriEON1IPtY.jpg)

相对用法一，`/` 右边一致，但左边更复杂了。

在 `grid-template-rows` 的基础上，融合了 `grid-areas` & 行网格线的命名。

### `grid`
