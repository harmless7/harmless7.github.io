---
# 标题
title: 《现代Web布局》其一：布局及 flex 基础
# 描述
# description:
# 图标
icon: css
# 写作时间
date: 2022-12-05
# 分类（可多个）
category:
  - 读书笔记
# 标签（可多个）
tag:
  - css
# 置顶
# sticky: true
# 收藏
# star: true
---

第 1~4 节，介绍了

1. Web 布局发展史
2. 布局术语
3. Flex 基础
4. Flex 对齐基础

<!-- more -->

## 参考内容

[稀土掘金——现代 Web 布局](https://juejin.cn/book/7161370789680250917)

[MDN——flex 布局的基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)

[MDN——Flex 容器中的对齐方式](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container)

## Web 布局演进史

无任何布局 -> 表格布局 -> 浮动、定位布局 -> 框架布局 -> 现代布局 -> 未来布局

## Web 布局技术术语

### 逻辑坐标系

`inline` 轴（内联轴），文本阅读方向。

`block` 轴（块轴），文本换行方向。

| 物理属性    | 逻辑属性(`horizontal-tb`) | 逻辑属性(`vertical-lr`) |
| ------- | --------------------- | ------------------- |
| x轴(水平轴) | inline轴(内联轴)          | block轴(块轴)          |
| y轴(垂直轴) | block轴(块轴)            | inline轴(内联轴)        |

> **注意**，不管是物理坐标系还是逻辑坐标系中，`z` 轴是不变的！

### 容器和容器空间

![新盒子模型](https://s2.loli.net/2022/12/08/64emx2HrKVFu7vf.jpg)

把原先的 `left`、`right` 等方位词，替换成 `start`、`end` 等逻辑词，便于构建不同语言的应用。

按容器内放置内容的多少，有 **可用空间** 和 **不可用空间**。

## Flex 基础

### 重要概念

1. flexbox 是一种 **一维布局**

2. flexbox 的两根轴线
   
    **主轴** 和 **交叉轴(垂直轴)**，可以使用 `flex-direction` 交换。

3. 起始线和终止线

4. flex 容器和子元素
   
    `display: flex` 的区域被叫做 **flex 容器**(flex-container)，其直系子元素会变成 **flex 子元素**(flex item)

#### flex 容器的一些默认行为

- 元素排成一行（`flex-direction` 属性初始值是 `row`）

- 元素从主轴起始线开始

- **元素不会在主维度度方向拉伸，但是可以缩小**

- **元素被拉伸来填充交叉轴大小**

- `flex-basis` 属性为 `auto`

- `flex-wrap` 属性为 `nowrap`

#### 多行 flex 容器

> 虽然 flexbox 是一维模型，但可以使我们的flex项目应用到多行中。
> 
> 在这样做的时候，**您应该把每一行看作一个新的flex容器。任何空间分布都将在该行上发生，而不影响该空间分布的其他行。**

## flex 容器中的对齐方式

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

主轴 & 垂直轴上，flex 容器尺寸减去 flex 子元素尺寸，剩下的就是 **剩余空间**（可能是负值，即内容溢出）。

空间分配即对容器剩余空间的分配。

#### 沿主轴分配剩余空间 —— justify-content

| `justify-content` 值     | 对齐效果（默认ltr）              | 剩余空间分布                     |
| ----------------------- | ------------------------ | -------------------------- |
| `start` or `flex-start` | 左对齐                      | 集中在右侧                      |
| `end` or `flex-end`     | 右对齐                      | 集中在左侧                      |
| `center`                | 居中对齐                     | 平分在两端                      |
| `space-between`         | 两边贴住边缘，子元素间间距相等          | 均匀地分布在子元素间（同一行）            |
| `space-evenly`          | 两边边缘、子元素间间距均相等           | 均匀地分布在子元素间 & 子元素两端边缘（同一行）  |
| `space-around`          | 类似每个子元素设置了 `margin: n 0` | 子元素间间距 n，子元素两端间距 0.5n（同一行） |

#### 沿垂直轴分配剩余空间 —— align-content

> 沿垂直轴分配空间，又可以看作是 FlexBox 布局中多行（或多列） 的对齐方式

首先，`align-content` 的默认值是 `stretch`，它会 **改变子元素的垂直轴大小！**（如果你未手动指定子元素的 `block-size`）

**拉伸在垂直轴上拉伸每一行，占满垂直轴**（如果是多行，每行宽度均等），导致垂直轴没有剩余空间。

即使你手动为每个子元素设定了垂直轴方向的大小，行所占大小依然不会改变，如下图：

![垂直轴“弹性行”示意](https://s2.loli.net/2022/12/08/7FCpmnEA9ZxgMGd.jpg)

此时，图中虚线部分就产生了剩余空间。

这时，再使用 `align-content` 就能产生效果了，具体表现类似上面的表格，不再赘述。

> 再次提醒，`align-content` 属性只有在 `flex-wrap` 取值为 `wrap` 或 `wrap-reverse` 时才有效！

### 理解“对齐属性”

`flex` 中的对齐属性，只在垂直轴有效。

> 沿垂直轴对齐 Flex 子元素，单行（或单例）以及单个 Flex 子元素的对齐方式

**Flex 容器中的每一行都有自己的主轴和垂直轴方向。**

对齐时，他们的参照不是整个容器，而是当前所在的行。

![align-content 和 align-items 的区别图示](https://s2.loli.net/2022/12/08/umWS5dYvcPpFB9g.jpg)

另外还值得一提的是 `align-seft`：

> 当 `align-self` 碰上了 `align-content` 属性时，只有 `align-content` 属性值为 `stretch` 时，`align-self` 属性的值才有效。

### 那么主轴上要怎么对齐呢？

你已经很熟悉了，使用 `margin: auto`。

### 对齐防溢出

![防溢出图示](https://s2.loli.net/2022/12/08/z4cmeYl3NULq9Ks.webp)

`safe` 属性可以防止数据丢失，但是目前只有火狐支持该特性。

不过可以使用 `margin:auto` 来达到类似的效果。
