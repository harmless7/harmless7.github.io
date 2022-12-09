---
# 标题
title: 《现代Web布局》4~8
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
sticky: true
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


[控制 Flex 子元素在主轴上的比例](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax)

第 4~8 节，介绍了

<!-- more -->

## 参考内容

[稀土掘金——现代 Web 布局](https://juejin.cn/book/7161370789680250917)

[MDN——控制 Flex 子元素在主轴上的比例](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax)

[MDN——flex-basis](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)

[MDN——flex-grow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)

[MDN——flex-shrink](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)

## flex 子元素在主轴上的伸缩

flex 布局的精髓，就在于它能够控制子元素在主轴上的尺寸和伸缩性。（所以被称为弹性布局）

这个伸缩性使用 `flex-grow`, `flex-shrink` 和 `flex-basis` 来控制。

而这三个属性，通常合写为 `flex` 属性。

### 基础概念

#### 正负自由空间（或可用空间, positive and negative free space）

flex 子元素的伸缩，本质上是对 flex 容器正负自由空间的分配。

自由空间的计算如图所示：

![positive free space](https://s2.loli.net/2022/12/09/3CkRxIDefuKsyU8.jpg)

上图计算出的自由空间是正数，即 正自由空间。

![negative free space](https://s2.loli.net/2022/12/09/4YhbTaj38yFt7oV.jpg)

以此类推，也会出现 负自由空间，计算方式也是一样的。
