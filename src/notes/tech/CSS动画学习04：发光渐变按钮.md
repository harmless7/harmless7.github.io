---
# 标题
title: CSS动画学习04：发光渐变按钮
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
date: 2022-11-29
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

学习自 [Glowing Button Hover Animation using CSS —— CODE WITH HOSSEIN](https://www.youtube.com/watch?v=EVkbLO649cY)

<!-- more -->

## 效果图

![效果图](https://raw.githubusercontent.com/harmless7/blogImgHost/main/202212081147820.gif?token=ASN72AE6LOUSB7BQ7XPNWM3DSFPJ2)

纯 css 实现，针不戳。

## 实现思路

1. 画个按钮
2. 添加 hover 后的彩虹色
3. 添加 hover 后的外发光效果
4. 动起来，流光溢彩！

### 画个按钮

这篇文章，所有 ```html``` 全部略过。

如果哪天你连 ```button``` 都不会用了...也没有复习这篇文章的意义了。

```css
button {
  cursor: pointer;
  position: relative;
  padding: 22px 46px;
  font-size: 28px;
  text-transform: uppercase;
  color: #fff;
  background: rgba(255, 255, 255, .1);
  border: 3px solid rgba(255, 255, 255, .2);
  border-radius: 18px;
  /* 赞美 得意黑，开源精神值得敬佩 */
  font-family: "SmileySans";
}
```

![朴实无华一按钮](https://raw.githubusercontent.com/harmless7/blogImgHost/main/202212081147157.jpg?token=ASN72AAQGKKHTC5HKJ2VO7DDSFPKC)

> 知识补充：```text-transform```
>
> 看教程时候看到的属性，用途是控制显示文本的大小写。（当然了，中文对中文来说没用）
>
> 包括以下属性：
>
> - capitalize: 首字母大写
> - uppercase: 全大写
> - lowercase: 全小写
> - ```full-width: 将字母写在一个正方形内，使它们能够与通常的东亚文字（如中文或日文）对齐。```
>
> 感觉还挺有用的，答应我，下次不要再傻乎乎地用 js 转大小写了。

### 来点渐变

```css
button:hover {
  z-index: 1;
  border-color: transparent;
  background: linear-gradient(90deg, #f9d923, #00a19d, #0c87b7, #cb49ff, #ff6666, #f9d923);
  background-size: 400%;
  box-shadow: 0 0 15px rgb(2,4,24);
}
```

![渐变按钮](https://raw.githubusercontent.com/harmless7/blogImgHost/main/202212081147813.jpg?token=ASN72ACOGODJCLUGPBOPVXTDSFPKI)

> ```border-color: transparent;```！下次要 hover 隐藏边框的时候，不要再把 ```border-width``` 设为 1px 了！现在你学会了更聪明的办法。

### 外发光

```css
button:before {
  content: "";
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  background: inherit;
  filter: blur(36px);
  z-index: -1;
  opacity: 0;
  transition: 0.4s ease-out;
}

button:hover::before {
  opacity: 1;
}
```

![渐变按钮](https://raw.githubusercontent.com/harmless7/blogImgHost/main/202212081147549.jpg?token=ASN72AF3ZXUAZGYUVFTYBB3DSFPKM)


这里有几个需要注意的地方

- ```left```, ```right```, ```top```, ```bottom``` 全部都设置为了 -1，这使得 ```:before``` 的大小都稍微大出了按钮一点点。

  如果不这样做，模糊后的色彩不会出现在按钮周围。
  
  原理暂且不明，但是以后实现类似效果时要牢记这个技巧。
- ```background: inherite;``` 继承了背景色，也会继承等会要加的背景动画，这使得外发光颜色始终与按钮同步。
- ```filter: blur();``` 模糊，数值越大，延展出去的色彩越多。

以后有需要外发光的效果，这个是一个很好的参考。

### rgb, yes! 流光溢彩!

最后，只需要让 ```background-position``` 移动，就能实现渐变效果。

```css
button:hover {
  ...
  animation: glow 12s forwards linear infinite alternate;
}

@keyframes glow {
  from {
    background-position: 0%;
  }
  to {
    background-position: 400%;
  }
}
```

> ```forwards```，动画执行完后停留在最后一帧
> ```infinite```，动画无限循环播放
> ```alternate```，动画反向播放

结束。

## 总结

虽然很炫酷，但是实际上没有那么多页面需要你放一个那么 **炫彩** 的按钮来喧宾夺主。

主要还是学习它的实现思路：

使用 ```background-position``` 移动背景，也能实现动画效果；

```:before``` 和 ```:after``` 伪类的属性可以完全跟随父元素，即使父元素有动画；

外发光的实现方式；

```infinite``` + ```alternate``` 循环往复播放动画；

简单但实用。
