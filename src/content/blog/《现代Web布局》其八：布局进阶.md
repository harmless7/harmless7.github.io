---
# 标题
title: '《现代Web布局》其八：布局进阶'
description: 'none'
pubDate: '2023-03-24'
---

## 参考内容

[稀土掘金——现代 Web 布局，display:contents 改变 Flexbox 和 Grid 布局模式](https://juejin.cn/book/7161370789680250917/section/7161624465313366046?suid=1908407916041614&source=pc)

## `display: contents` 扁平化文档

`display: contents` 简单来说，就是 **忽略掉元素的标签及样式**。

> “它在文档语义方面有意义，但在视觉呈现上没有意义。”

如果设置给 `grid` 或 `flex` 子元素就会 **“扁平化”**：子元素内部也能受到外层布局影响。

举个栗子：

![display-contents](https://s2.loli.net/2023/03/24/wvRlsrWqp3jJ4Li.png)

::: code-group

```html
<div class="block">
  <div class="title">login</div>
  <!-- 这里的 form 元素在文档语义上很合理，但它有点妨碍布局 -->
  <form>
    <div class="username">
      <label>用户名</label>
      <input type="text">
    </div>
    <div class="password">
      <label>密码</label>
      <input type="text">
    </div>
    <button>登录</button>
  </form>
  <img src="https://picsum.photos/200/100" alt="">
</div>
```

```css{10-12}
.block {
  display: grid;
  grid:
    "title    img" auto
    "username img" auto
    "password img" auto
    "button button" auto
    / 1fr auto;
}
.block form {
  display: contents; /* 将 form 扁平化，里面的元素就可以设置区域了 */
}
.title {
  grid-area: title;
}
.username {
  grid-area: username;
}
.password {
  grid-area: password;
}
img {
  grid-area: img;
}
button {
  grid-area: button;
}
```

:::

