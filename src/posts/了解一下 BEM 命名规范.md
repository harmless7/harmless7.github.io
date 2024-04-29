---
# 标题
title: 了解一下 BEM 命名规范
# 描述
# description:
# 图标
icon: css
# 写作时间
date: 2023-04-30
# 分类（可多个）
category:
  - 技术学习
# 标签（可多个）
tag:
  - css
  - 规范
# 置顶
# sticky: true
# 收藏
# star: true
---

## `BEM` 是什么？

它是一种 CSS 的命名规范。

按照官网的介绍：

> BEM — is a methodology that helps you to create reusable components and code sharing in front‑end development
> 
> （BEM - 是一种方法论，可以帮助你在前端开发中创建可重用的组件和代码共享。）

### B?E?M?

- B: Block（块）
  
  独立的实体，其本身就有意义。
  
  > 例如：
  > `header`, `container`, `menu`, `checkbox`, `input`

- E: Element（元素）
  
  一个区块的一部分，没有独立的意义，在语义上与它的区块相联系。
  
  > 例如：
  > `menu item`, `list item`, `checkbox caption`, `header title`

- M：Modifier（修改器）
  
  一个块或元素上的标志。使用它们来改变外观或行为。
  
  > 例如：
  > `disabled`, `highlighted`, `checked`, `fixed`, `size big`, `color yellow`

## 怎么用？

```sh
block-name__<element-name>--<modifier-name>_<modifier_value>

# 块名__元素名--修改器名_修改器值
```

- 所有实体的命名均使用小写字母，复合词使用 `-` 连接
- Block 与 Element 之间使用双下划线 `__` 连接
- Modifier 与 Block/Element 使用双连接符 `--`连接
- modifier-name 和 modifier-value 之间使用单下划线 `_` 连接

## 示例

![未标题-1.jpg](https://s2.loli.net/2023/04/30/CBGIuOHwehRlJXn.jpg)

::: code-group

```css
.btns {}
.btns__item {}
.btns__item--primary {}
.btns__item--danger {}
.btns__item--dashed {}
```

```less
.btns {
  &__item {
    &--primary {}
    &--dashed {}
  }
}
```

:::

## 参考资料

- [getbem](https://getbem.com/)
- [腾讯规范](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)
- [Element Plus 组件库相关技术揭秘：6. CSS 架构模式之 BEM 在组件库中的实践](https://juejin.cn/post/7165503808217284616)