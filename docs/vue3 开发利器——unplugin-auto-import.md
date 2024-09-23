---
# 标题
title: vue3 开发利器——unplugin-auto-import
# 描述
# description:
# 图标
icon: vue
# 写作时间
date: 2022-11-30
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

```import { ref } from "vue"```？狗都不写！

<!-- more -->

## 这玩意儿是干啥的？

还记得 Vue 3 的组合式 API 语法吗？如果有印象，那你肯定对以下代码有着刻入 DNA 般的熟悉：

```js
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
```

刚开始写觉得没什么，但是后来渐渐发现，这玩意儿几乎每个页面都有啊！

每次都要写，哪怕是复制粘贴都会非常繁琐。并且每一个 ```<script setup>``` 下面都顶着一大坨 ```import```，看着也十分难受。

本文介绍的 ```unplugin-auto-import``` 就是为了解决这个问题而诞生的。

```unplugin-auto-import``` 官方简介：

> 为 Vite、Webpack、Rollup 和 esbuild 按需自动导入 API。支持 TypeScript。由 unplugin 提供技术支持。

## 文档

[有什么问题当然还是优先看官方文档 —— NPM unplugin-auto-import
](https://www.npmjs.com/package/unplugin-auto-import)

## 安装

```base
npm i -D unplugin-auto-import
```

由于目前最常用的还是 ```vite``` 或 ```webpack```，就只贴一下这两个打包工具的引入方式：

- vite:

  ```js
  // vite.config.ts
  import AutoImport from 'unplugin-auto-import/vite'

  export default defineConfig({
    plugins: [
      AutoImport({ /* options */ }),
    ],
  })
  ```

- webpack:

  ```js
    // webpack.config.js
    module.exports = {
      /* ... */
      plugins: [
        require('unplugin-auto-import/webpack')({ /* options */ }),
      ],
    }
  ```

## 设置

写在上图 ```options``` 位置的配置项，具体可以有如下参数：

### include

规定可自动引入的文件后缀。

使用正则表达可引入后缀，多条正则用数组包裹。

```js
include: [
  /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
  /\.vue$/, /\.vue\?vue/, // .vue
  /\.md$/, // .md
],
```

### imports

全局引入 npm 包。

分为 预设 和 自定义。

```js
imports: [
  // 预设
  'vue',
  'vue-router',
  // 自定义
  {
    '@vueuse/core': [
      // 预设命名引入
      'useMouse', // 等同 import { useMouse } from '@vueuse/core',
      // 使用别名
      ['useFetch', 'useMyFetch'], // 等同 import { useFetch as useMyFetch } from '@vueuse/core',
    ],
    'axios': [
      // 默认引入
      ['default', 'axios'], // import { default as axios } from 'axios',
    ],
    '[包名]': [
      '[引入变量名]',
      // 别名
      ['[需引入变量名]', '[你需要的别名]'],
    ],
  },
],
```

### dirs

自动引入自定义的 js 包。

**默认情况下，它只扫描目录下的一层模块**（即无法自动引入更深层级的包）。

```js
dirs: [
  './utils/api', // 我常用来避免写 import api from '@/utils/api';
  // './hooks',
  // './composables' // 只引入根模块，即 /composables/index.js
  // './composables/**', // 引入目录下所有嵌套模块
  // ...
],
```

### dts

生成相应的.d.ts文件的文件路径。

当 "typescript "被安装在本地时，默认为 ```"./auto-imports.d.ts"```。

设置`false`来禁用。

```js
dts:'./auto-imports.d.ts'
// dts:'src/auto-imports.d.ts' // 2023-04-18 生成到 src 下才起效
```

### vueTemplate

在 Vue 的 Template 中也自动引入

详见 [这里](https://github.com/unjs/unimport/pull/15) and [这里](https://github.com/unjs/unimport/pull/72)

```js
vueTemplate: false
```

### resolvers

自定义解析器，与 `unplugin-vue-components` 兼容。（下一篇文章再做介绍）

[详见](https://github.com/antfu/unplugin-auto-import/pull/23/)

```js
resolvers: [
  /* ... */
],
```

### eslintrc

自动引入会引起 ```eslint``` 检查报错，添加这个选项来避免。

它会生成相应的.eslintrc-auto-import.json文件。

[eslint globals 文档](https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals)

```js
eslintrc: {
  enabled: false, // Default `false`
  filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
  globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
},
```

## 总结

以后都给我用这玩意儿写项目，不准每个页面疯狂地 ```import``` 了。
