---
# 标题
title: 《现代Web布局》其六：子网格
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
date: 2023-02-14
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

学一个目前没什么卵用的属性。

<!-- more -->

## 兼容性注意

![兼容性](https://s2.loli.net/2023/02/14/21IoryRntdJjPTE.png)

2023-02-14，这个属性可兼容性还 **低的可怜**。了解一下就行，千万不要用于开发。

## 参考内容

[稀土掘金——网格布局中的子网格和嵌套网格](https://juejin.cn/book/7161370789680250917/section/7160657953932967967)

[MDN——子网格](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid)

## 嵌套网格的问题

![嵌套网格](https://s2.loli.net/2023/02/14/JOCav6XcBYjH39n.png)

如图所示，最大的问题在于嵌套网格，无法对齐外层网格线。

各个小网格各自为政，互不关联，造成样式错乱。

## 子网格（`subgrid`）概念

![subgrid](https://s2.loli.net/2023/02/14/OkRpD3aCsTALg8d.png)

> 1. 在 `grid-template-columns`、`grid-template-rows` 或者两者上都设置了 `subgrid` 的值
> 2. 容器本身是 `grid` 或者 `inline-grid`
>
> 嵌套网格就会**使用在父网格上定义的轨道**，而不是创建一个新的轨道列表。

## 意义党的拷问（我们为什么要用子网格）

完全继承了父网格的轨道，意义何在？它解决了什么难以解决的问题吗？

直接使用父网格来排版有什么不好吗？或者干脆使用 `flex`？

我的理解是：

这么写从**逻辑上来说更符合感觉**。各个子网格看似独立，但又遵循统一约束。

## 一些实例

### 卡片组件布局

![subgrid-card](https://s2.loli.net/2023/02/14/2PeKMqwB879CbRJ.jpg)

最典型的就是卡片布局。使用子网格可保证每张卡片结构一致。

如上图，子网格只在横轴上使用了 `subgrid`。在纵轴上依然设定了自己的 `grid-template-columns`。

![另一种卡片](https://s2.loli.net/2023/02/14/1uGpMyFtfV72IqR.jpg)

再尝试一下竖向的卡片，同理。

ASCII 艺术方法依然很有用。

### 品牌页（区）布局

![品牌区](https://s2.loli.net/2023/02/15/UGcFd5EJA38xmrp.png)

没啥好说的，属于网格布局的拿手好戏。

### 照片墙

![照片墙](https://s2.loli.net/2023/02/15/AKVhi36EScXBHsq.png)

照片墙的搭建主要还是利用了前一节课的 `dense` 属性，忘记了记得去复习。

使用子网格有效地避免了，需要考虑外层情况带来的干扰。

### 略

后面感觉罗里吧嗦一大堆全在翻来覆去的讲，这章鸽了。
