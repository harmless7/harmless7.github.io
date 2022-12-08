---
# 标题
title: 《现代Web布局》
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
date: 2022-12-05
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

[稀土掘金——现代 Web 布局](https://juejin.cn/book/7161370789680250917)

二三十块呢，好好学。

<!-- more -->

## Web 布局演进史

无任何布局 -> 表格布局 -> 浮动、定位布局 -> 框架布局 -> 现代布局 -> 未来布局

## Web 布局技术术语

### 逻辑坐标系

`inline` 轴（内联轴），文本阅读方向。

`block` 轴（块轴），文本换行方向。

|物理属性|逻辑属性(`horizontal-tb`)|逻辑属性(`vertical-lr`)|
|---|---|---|
|x轴(水平轴)|inline轴(内联轴)|block轴(块轴)|
|y轴(垂直轴)|block轴(块轴)|inline轴(内联轴)|

> **注意**，不管是物理坐标系还是逻辑坐标系中，`z` 轴是不变的！

### 容器和容器空间

![新盒子模型](https://s2.loli.net/2022/12/08/64emx2HrKVFu7vf.jpg)

把原先的 `left`、`right` 等方位词，替换成 `start`、`end` 等逻辑词，便于构建不同语言的应用。

按容器内放置内容的多少，有 **可用空间** 和 **不可用空间**。

## Flex 基础

基础已经很熟悉了，写点补充。

1. flex 布局的主轴、侧轴、主轴起始位置、侧轴起始位置，会根据 `direction` 和 `write-mode` 的变化而改变；

2. flex 同样有 `align-content` 和 `place-content`，不要只会用 `align-items` 了；
  
    `place-content` 只在多行的情况下有效。（`flex-wrap` 不为 `nowrap`）

3. `flex-wrap` 还能 `wrap-reverse`，换行会往上方换；

## 对齐方式

[CSS Box Alignment 模块](https://www.w3.org/TR/css-align-3/)，这玩意儿通用于 `flex` 和 `grid` 布局中，所以会发现两边的对齐语法一致。

![对齐模式总结图](https://s2.loli.net/2022/12/08/8G1ERpS9jfl3QiB.jpg)

### 属性分类

属性分为两组：

#### 空间分配属性

- `justify-content`
- `align-content`
- `place-content`

#### 对齐属性

- `align-self`
- `align-items`
- `justify-self` （flex布局中没有）
- `justify-items` （flex布局中没有）

### 理解“空间分配”

内联轴 & 块轴上，轴长度减去项目长度，剩下的就是 **剩余空间**（可能是负值，即内容溢出）。

看似 *对齐* 的操作，都可以用对 **剩余空间** 的分配来解释。

#### 沿主轴分配剩余空间 —— justify-content

|`justify-content` 值|对齐效果（默认ltr）|剩余空间分布|
|---|---|---|
|`start` or `flex-start`|左对齐|集中在右侧|
|`end` or `flex-end`|右对齐|集中在左侧|
|`center`|居中对齐|平分在两端|
|`space-between`|两边贴住边缘，项目间间距相等|均匀地分布在项目间（同一行）|
|`space-evenly`|两边边缘、项目间间距均相等|均匀地分布在项目间 & 项目两端边缘（同一行）|
|`space-around`|类似每个项目设置了 `margin: n 0`|项目间间距 n，项目两端间距 0.5n（同一行）|

#### 沿侧轴分配剩余空间 —— align-content

> 沿侧轴分配空间，又可以看作是 FlexBox 布局中多行（或多列） 的对齐方式

首先，`align-content` 的默认值是 `stretch`，它会 **改变项目的侧轴大小！**（如果你未手动指定项目的 `block-size`）

**拉伸在侧轴上拉伸每一行，占满侧轴**（如果是多行，每行宽度均等），导致侧轴没有剩余空间。

即使你手动为每个项目设定了侧轴方向的大小，行所占大小依然不会改变，如下图：

![侧轴“弹性行”示意](https://s2.loli.net/2022/12/08/7FCpmnEA9ZxgMGd.jpg)

此时，图中虚线部分就产生了剩余空间。

这时，再使用 `align-content` 就能产生效果了，具体表现类似上面的表格，不再赘述。

> 再次提醒，`align-content` 属性只有在 `flex-wrap` 取值为 `wrap` 或 `wrap-reverse` 时才有效！

### 理解“对齐属性”