---
# 标题
title: 《现代Web布局》其三：flex 经典布局
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
date: 2022-12-26
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

一些经典布局在 flex 下的实现，包括：

1. 等高布局
2. 均分列（等分列）布局
3. 圣杯布局
4. Sticky Footer（粘性底部） 布局
5. 百分百无滚动布局
6. 九宫格布局
7. 12 列网格布局
8. 使用不同对齐方式的导航栏
9. 灵活的弹性框

<!-- more -->

## 参考内容

[稀土掘金——现代 Web 布局，使用 flexbox 构建经典布局：10种经典 Web 布局](https://juejin.cn/book/7161370789680250917/section/7161623855054716935?suid=1908407916041614&source=pc)

[MDN——Flexbox 典型用例](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Typical_Use_Cases_of_Flexbox#%E5%AF%BC%E8%88%AA)

## 等高布局

![image.png](https://s2.loli.net/2022/12/26/brVmoEhi2UnBvte.png)

- 每一列的高度由内容决定
- 列高度一致

```css
.wrapper {
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
}

.single {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 300px;
}
```

原理：`align-content` 的默认值是 `stretch`，会让子元素在侧轴方向上拉伸至相同尺寸。

**注意，没法保证自动换行后不同行等高！**

## 均分列（等分列）布局

![image.png](https://s2.loli.net/2022/12/26/RLshc5BZPj7OWiF.png)

- 不确定列数
- 每一列宽度相等
- 多用于手机导航栏

```css
.wrapper {
  display: flex;
}
.single {
  flex: 1; /* 即 flex: 1 1 0 */
  min-width: 0;
}
```

原理：将每一个子元素的初始化尺寸设置为 0，再通过 flex-grow 来均分剩余空间。

详细可参考 [《现代Web布局》其三：flex 弹性详解 # 关于-min-width-0-的意义](./%E3%80%8A%E7%8E%B0%E4%BB%A3Web%E5%B8%83%E5%B1%80%E3%80%8B%E5%85%B6%E4%BA%8C%EF%BC%9Aflex%20%E5%BC%B9%E6%80%A7%E8%AF%A6%E8%A7%A3.md#关于-min-width-0-的意义)

## 圣杯布局

![image.png](https://s2.loli.net/2022/12/26/ECtSYaFIGeP8o71.png)

- 🏆
- 上下宽，中间窄，左右两边有挂耳
- **主内容前置**（html结构中，将主体放在前面，优先加载）

```text
<!-- 页头 -->
<header></header>

<!-- 主体 -->
<main>
  <!-- 页面主内容列 -->
  <article></article>
  <!-- 左侧导航栏 -->
  <aside></aside>
  <!-- 右侧导航栏 -->
  <aside></aside>
</main>

<!-- 页脚 -->
<footer></footer>
```

```css
main {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
}
article {
  flex: 1 1 0;
  min-width: 0;
}
aside:nth-of-type(1) {
  order: -1;
  flex: 0 0 220px;
}
aside:nth-of-type(2) {
  flex: 0 0 320px;
}
```

### 窄屏时响应式

加点 css 媒体查询，保证小屏幕下的正常显示

![1672063514.gif](https://s2.loli.net/2022/12/26/fCblE3SDuLV6jOz.gif)

```css
@media screen and (max-width: 800px) {
  main {
    flex-direction: column; /* 横向改纵向 */
  }
  main aside {
    width: 100%;
    max-width: none !important;
  }
  aside:nth-of-type(1) {
    order: 0;
  }
}
```

## Sticky Footer（粘性底部） 布局

![1672063515.gif](https://s2.loli.net/2022/12/26/S7o59qZFlJAO31d.gif)

- 当内容撑不满一屏时，footer 贴住窗口底部，内容占满剩余区域
- 当内容大于一屏时，footer 被撑出视口范围

```css
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
header, footer {
  flex-shrink: 0; /* 小屏时，不挤压头部和尾部 */
}
main {
  flex-grow: 1;
}
```

### 另一种实现方式

```css
footer {
  margin-top: auto;
}
```

## 百分百无滚动布局

- 多用于弹窗
- 有一个固定尺寸部分
- 其余部分填充满屏幕，溢出会有滚动条

```text
<div class="modal">
  <div class="modal-header"></div>
  <div class="modal-content"></div>
</div>
```

```css
.modal {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.modal-header {
  height: 120px; /* 固定高度值 */
}
.modal-content {
  flex: 1 1 0;
  overflow-y: auto;
}
```

但是这么写在 ios 下会失效，需要嵌套一层来解决这个 bug。（bug原理暂未知）

### 解决 ios 下的滚动失效问题

```text
<div class="modal">
  <div class="modal-header"></div>
  <div class="modal-content"> <!-- 内容滚动外层容器 min-height: 0 -->
    <div class="overflow-container"> <!-- 滚动容器 flex: 1 & overflow-y: auto -->
      <div class="overflow-content"></div> <!-- 内容容器 -->
    </div>
  </div>
</div>
```

```css
.modal-content {
  display: flex;
  flex: 1;
  min-height: 0;
}
.overflow-container {
  flex: 1;
  overflow-y: auto; /* 内容高度超出后，出现滚动条 */
}
```

## 12 列网格布局

- 起源于 960gs 网格布局系统
- 将容器分成 12 列
- 有列宽和列间距

每一列等宽的布局很好写，可以参考上面的 [均分列(等分列)布局](#均分列等分列布局)。

如果要每一列不等宽，可以使用 `flex-grow` 的值来调整它的增长值。

## 九宫格布局

## 使用不同对齐方式的导航栏

## 灵活的弹性框
