---
# 标题
title: CSS动画学习03：卫星环绕loading
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
date: 2022-11-26
# 分类（可多个）
category:
  - 前端
  - 小技巧
# 标签（可多个）
tag:
  - 前端
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

学习自 [【css每日练手】svg + css 实现卫星绕地 loader 动画 —— Sathorizon](https://www.bilibili.com/video/BV1S14y1L7je/?spm_id_from=333.1007.top_right_bar_window_default_collection.content.click)

<!-- more -->

## 效果图

![效果图](./img/scroll-snap.gif)

主要使用 svg 进行绘制，简单但又酷炫的小动画。

## 实现思路

1. 分析画面元素，拆分：地球(earth)、卫星(sat-Satellite)、轨道(orbit)。
2. 绘制地球，使用 circle
3. 绘制轨道，使用 ellipse
4. 绘制卫星并添加运动动画

### 构建各元素标签

```text
<svg class=sat-loading viewBox="0 0 100 100">
  <!-- 地球 -->
  <circle class=earth />
  <!-- 轨道 -->
  <ellipse class="orbit" />
  <!-- 卫星 -->
  <circle class="sat" />
</svg>
```

### 绘制地球

最简单的一个部件，只需要画一个居中空心圆即可：

```css
.sat-loading {
  /* 画面中心位置 */
  --center: 50%;
  /* 地球相关属性 */
  --earth-fill: #0F4C81;
  --earth-r: 10px;
  --earth-stroke: white;
  --earth-stroke-width: 1px;
}
.earth {
  cx: var(--center);
  cy: var(--center);
  r: var(--earth-r);
  fill: var(--earth-fill);
  stroke: var(--earth-stroke);
  stroke-width: var(--earth-stroke-width);
}
```

### 绘制轨道

```css
svg {
  ...
  /* 轨道 */
  --orbit-stroke: white;
  --orbit-stroke-width: 0.2px;
}
.orbit {
  cx: var(--center);
  cy: var(--center);
  rx: 18px;
  ry: 1px;
  fill: none;
  stroke: var(--orbit-stroke);
  stroke-width: var(--orbit-stroke-width);
  /* 令轨道稍微倾斜 */
  transform-origin: center;
  transform: rotate(-10deg);
  /* 使用虚线属性,截去穿过地球的轨道 */
  stroke-dasharray: 50px 20px;
  stroke-dashoffset: 6px;
}
```

> stroke-dasharray：用于设定虚线。可设置 n 个值，然后把这 n 个值重复，每个值依次代表 线段长度、空隙长度、线段长度、空隙长度...
>
> stroke-dashoffset: 用于设定虚线的偏移量。

### 绘制卫星并添加运动动画

由于沿轨道的曲线运动较为复杂，这里可以让卫星沿轨道长轴往复运动，形成沿轨道运动的假象。

```css
svg {
  ...
  /* 卫星 */
  --sat-fill: white;
  --sat-r: 2px;
  /* 卫星运动到左边位置的坐标 */
  --sat-left-x: 33%;
  --sat-left-y: 53%;
  /* 卫星运动到右边位置的坐标 */
  --sat-right-x: 67%;
  --sat-right-y: 47%;
}
.sat {
  cx: var(--sat-left-x);
  cy: var(--sat-left-y);
  r: var(--sat-r);
  fill: var(--sat-fill);
  /* 循环直线运动 */
  animation: sat-play 4000ms ease-in-out infinite;;
}
@keyframes sat-play {
  0% {
    cx: var(--sat-left-x);
    cy: var(--sat-left-y);
  }
  50% {
    cx: var(--sat-right-x);
    cy: var(--sat-right-y);
  }
    100% {
    cx: var(--sat-left-x);
    cy: var(--sat-left-y);
  }
}
```

### 解决最后的瑕疵，使卫星被地球遮挡

由于卫星的图层始终处于地球前面，看起来不像是绕球旋转，

这里的解决方案是复制另一个卫星，放到地球的图层后面，然后一前一后两颗卫星同步运动。

当然光这样还不够，我们不能让前面那颗卫星一直反复略过地球表面。

它应该是飞过一次，然后隐藏起来回到原位，再显形飞过去。为此我们为它添加新的动画：

```text
<circle class="sat front" />
```

```css
/* 从 0% 到 49% 保持可见状态，飞过去 */
/* 然后到达 50% 瞬间隐藏，飞回来 */
@keyframes sat-front {
  49% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.front {
  animation: satplay 4000ms ease-in-out infinite,
  satfront 4000ms linear infinite;
}
```

## 总结

这个效果很简单，但是它作为一个实验性功能并不是很强大。只能应用于对页面展示要求不那么高的时候。

如果需要精细化调整滚动贴合效果，目前还是需要用 js 来实现。
