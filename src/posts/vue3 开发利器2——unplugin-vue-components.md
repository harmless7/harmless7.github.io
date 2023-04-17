---
# 标题
title: vue3 开发利器2——unplugin-vue-components
# 描述
# description:
# 图标
icon: vue
# 写作时间
date: 2023-4-17
# 分类（可多个）
category:
  - 技术学习
# 标签（可多个）
tag:
  - 工具
  - vue
# 置顶
# sticky: true
# 收藏
# star: true
---

拖了半年，才续上的下半截...

## 这玩意儿是干啥的？

Vue的按需组件自动导入。

特点：

- 💚 支持 Vue 2 和 Vue 3 的开箱即用。
- ✨ 同时支持 组件 和 自定义指令。
- ⚡️ 支持 Vite、Webpack、Vue CLI、Rollup、esbuild 等，由 [unplugin](https://github.com/unjs/unplugin) 驱动。
- 🏝 树状结构，只注册你使用的组件。
- 🪐 文件夹名称作为命名空间。
- 🦾 完全支持 TypeScript。
- 🌈 内置常用UI库的[解析器](https://www.npmjs.com/package/unplugin-vue-components#importing-from-ui-libraries)。
- 😃 与 [unplugin-icons](https://github.com/antfu/unplugin-icons) 完美合作。

## 文档

[有什么问题当然还是优先看官方文档 —— NPM unplugin-vue-components](https://www.npmjs.com/package/unplugin-vue-components)

## 安装

```sh
$ npm i unplugin-vue-components -D
```

由于目前最常用的还是 ```vite``` 或 ```webpack```，就只贴一下这两个打包工具的引入方式：

- vite:

  ```js
  // vite.config.ts
  import Components from 'unplugin-vue-components/vite'

  export default defineConfig({
    plugins: [
      Components({ /* options */ }),
    ],
  })
  ```

- webpack:

  ```js
  // webpack.config.js
  module.exports = {
    /* ... */
    plugins: [
      require('unplugin-vue-components/webpack')({ /* options */ }),
    ],
  }
  ```

## 设置

写在上图 ```options``` 位置的配置项，具体可以有如下参数：

```js
Components({
  // 组件所在目录的相对路径
  dirs: ['src/components'],

  // 组件的有效文件扩展名
  extensions: ['vue'],

  // 用于匹配组件文件名的 glob 模式。
  // 当指定时，dirs 和 extensions 选项将被忽略。
  globs: ['src/components/*.{vue}'],

  // 是否搜索子目录
  deep: true,

  // 自定义组件的解析器
  resolvers: [],

  // 生成 components.d.ts 的全局声明，
  // 也可以接受自定义文件名的路径
  // 默认值：true 如果安装了 typescript 包
  dts: false,

  // 允许子目录作为组件的命名空间前缀。
  directoryAsNamespace: false,

  // 折叠同一前缀（区分大小写）的文件夹和组件
  // 防止重复在命名空间组件名称中出现。
  // 当 directoryAsNamespace: true 时生效
  collapseSamePrefixes: false,

  // 忽略命名空间前缀的子目录路径。
  // 当 directoryAsNamespace: true 时生效
  globalNamespaces: [],

  // 指令的自动导入
  // 默认值：true 用于 Vue 3，false 用于 Vue 2
  // 需要 Babel 对 Vue 2 进行转换，出于性能方面的考虑默认禁用。
  // 要安装 Babel，请运行：npm install -D @babel/parser
  directives: true,

  // 解析前转换路径
  importPathTransform: v => v,

  // 允许组件覆盖同名组件
  allowOverrides: false,

  // 转换目标的过滤器
  include: [/.vue$/, /.vue?vue/],
  exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],

  // 项目的 Vue 版本。如果未指定，它将自动检测。
  // 可接受的值：2 | 2.7 | 3
  version: 2.7,

  // 仅在库中提供组件类型（全局注册）
  types: [],
});
```

::: info
注意 在默认情况下，该插件将导入 src/components 路径下的组件。你可以使用 `dirs` 选项来定制它。
:::

## `dts` —— TypeScript 支持

为了获得 TypeScript 对自动导入组件的支持，Vue 3 有一个 [PR](https://github.com/vuejs/core/pull/3399)，扩展了全局组件的接口。目前，[Volar](https://github.com/johnsoncodehk/volar) 已经支持这种用法了。如果你正在使用Volar，你可以按以下方式修改配置来获得支持。

```js
Components({
  dts: true, // 如果安装了 "typescript"，则默认启用。
})
```

::: info
一旦设置完成，将生成一个 `components.d.ts`，并自动更新类型定义。你可以随意将其提交到 git 中，也可以不提交，随你喜欢。
:::

## `types` —— 全局类型注册

一些库可能会注册一些全局组件，供你在任何地方使用（例如 Vue Router 提供了 `<RouterLink>` 和 `<RouterView>`）。由于它们是全局可用的，这个插件不需要导入它们。

然而，那些通常对 TypeScript 不友好，你可能需要手动注册它们的类型。

因此 unplugin-vue-components 提供了一种只为全局组件注册类型的方法。

```js
Components({
  dts: true,
  types: [{
    from: 'vue-router',
    names: ['RouterLink', 'RouterView'],
  }],
})
```

所以 `RouterLink` 和 `RouterView` 将在 `components.d.ts` 中呈现。

默认情况下，unplugin-vue-components 会在工作空间中安装支持的库（例如 `vue-router`）时自动检测。如果你想完全禁用它，你可以传递一个空数组给它：

```js
Components({
  // Disable type only registration
  types: [],
})
```

## 总结

以后都给我用这玩意儿写项目，不准每个页面疯狂地 ```import``` 了。
