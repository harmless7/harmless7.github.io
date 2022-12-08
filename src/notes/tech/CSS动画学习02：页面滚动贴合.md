---
# 标题
title: CSS动画学习02：页面滚动贴合
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
date: 2022-10-30
# 分类（可多个）
category:
  - 学习笔记
  - 技术
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

学习自 [哔哩哔哩 2 行 CSS 实现滚动贴合 Scroll Snap 特效 —— 峰华前端工程师](https://www.bilibili.com/video/BV1R3411r79d/?spm_id_from=333.788&vd_source=cbb9bae25f5ac9e51f8ff965eb794230)

<!-- more -->

## 效果图

![效果图](https://raw.githubusercontent.com/harmless7/blogImgHost/main/202212081150196.gif?token=ASN72AE5NDYZD7SYUOX4M53DSFPUI)

这种页面滚动自动贴合的效果，已经广泛应用在各种网站的首页上。

通常要实现这种效果，都需要使用 javascript 来实现。

但是在 css3 中，新添加了 `scroll-snap-type` 属性，使得我们可以通过纯 css + html 的方式来实现这种效果。

## 实现思路

1. 给滚动父元素添加 `scroll-snap-type` 属性
2. 给滚动子元素添加 `scroll-snap-align` 属性

### 1. 添加 scroll-snap-type

首先我们构建一个 html：

```text
<main>
  <section>第一屏</section>
  <section>第二屏</section>
  <section>第三屏</section>
</main>
```

```css
main {
  ...
  height: 100vh;
  overflow: scroll;
  scroll-snap-type: y mandatory;
}
```

详细说一下 `scroll-snap-type` 。

它的参数有两个值：

- 第一个值必填，用于确定它内部需要滚动贴合的方向。

  取值有 `x`, `y`, `both`, `block`, `inline`,

- 第二个值选填，可选值为 `mandatory` 和 `proximity`。

  `mandatory`(强制性的): 滚动结束一定会停在我们指定的位置。

  `proximity`（接近）：只有接近我们指定的位置，才会自动靠过去。（判断是否接近由浏览器自动识别）

2. 添加 `scroll-snap-align`

只需要给子元素添加属性：

```css
section {
  scroll-snap-align: start | end | center;
}
```

这个属性就很好理解了，指定滚动贴合点，是在子元素的 起始处 | 中间 | 结束处。

## 总结

这个效果很简单，但是它作为一个实验性功能并不是很强大。只能应用于对页面展示要求不那么高的时候。

如果需要精细化调整滚动贴合效果，目前还是需要用 js 来实现。
