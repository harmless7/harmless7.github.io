---
# 标题
title: 《现代Web布局》其七：grid 经典布局
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
date: 2023-02-17
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

使用 grid，把 flex 经典案例再来一遍。

<!-- more -->

## 参考内容

[稀土掘金——现代 Web 布局，使用 Grid 构建创意性 Web 布局](https://juejin.cn/book/7161370789680250917/section/7161624078397210638?suid=1908407916041614&source=pc)

基本就是把之前写过的 [felx 常见布局](./%E3%80%8A%E7%8E%B0%E4%BB%A3Web%E5%B8%83%E5%B1%80%E3%80%8B%E5%85%B6%E4%B8%89%EF%BC%9Aflex%20%E7%BB%8F%E5%85%B8%E5%B8%83%E5%B1%80.md)再来一次。

## 等高布局

![等高布局](https://s2.loli.net/2023/02/17/ufbSxaGNlFscZOv.png)

使用子网格，能够将每一个卡片内的文本对齐。

## 等分列

类似于 flex 中需要取消元素的 `min-content`，将 `min-width: 0`。

grid 要保证列宽度相等也可以使用 `min-width: 0`。

另外，因为 `1fr` ＝ `minmax(min-content, 1fr)`。

使用 **`minmax(0, 1fr)`**，同样能起到取消最小宽度的作用。

### 响应式均分列

![列均分](https://s2.loli.net/2023/02/17/LQ8tknlHbpJDd74.gif)

一种比较常用的写法：

```css
.wrapper {
  grid-template-columns: repeat(auto-fit, minmax(min(100% - var(--gutter) * 2, var(--min-single-width)), 1fr));
}
```
