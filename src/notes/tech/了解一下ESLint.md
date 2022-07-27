---
# 标题
title: 了解一下ESLint
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
date: 2022-07-26
# 分类（可多个）
category:
  - 学习笔记
  - 前端
# 标签（可多个）
tag:
  - 前端
  - 工具
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

ESLint 究极基础。看了一天的视频，依然只学了个皮毛。

<!-- more -->

## 作用

- 保持一致
- 减少不必要 git 提交
- 避免低级错误
- *编译时检查语法，而不是等JS引擎运行时才检查*

## 包

> 需要注意的是：ESLint 有两个工具，一个是 **模块包**，一个是 VSCode 的**扩展工具**。

1. ESLint 包

    安装方式：通过 npm 或 yarn 进行 全局 或项目安装

    ```base
    npm i eslint -D
    ```

2. VSCode 中的 ESLint 扩展工具

    安装方式：VSCode 搜索安装

## 初始化

### 创建目录

- 创建一个测试文件夹
- 初始化项目：

```base
npm init -y
```

### ESLint 安装

1. ```npm i eslint -D```
2. 注意查看安装结果：```node_modules``` 中生成了以下文件：

    ```text
    node_modules
    ├─.bin
    │  └─eslint.cmd // 脚本
    ├─@eslint // 配置文件格式相关
    ├─eslint
    ├─eslint-scope
    ├─eslint-utils
    ├─espree
    └─eslint-visitor-keys
    ```

- **.bin/eslint.cmd** 脚本文件，内部通过 nodejs 执行 eslint运行包 的代码
- **@eslint包** 用来规范 eslint配置文件
- eslint开头的包 是 eslint运行包，包含 eslint 代码

### 生成 ESLint 配置文件

> 可以配置一个独立的 **.eslintrc.\*(.js|.json|.yaml)** 文件，或者直接在 package.json 文件里的 eslintConfig 字段指定配置，ESLint 会查找和自动读取它们。

1. 执行 ```node_modules/.bin``` 文件夹里的 eslint 脚本来创建配置文件

    - 完整路径：```./node_modules/.bin/eslint --init```
    - 也可以用 npx 来执行 **（推荐）**：```npx selint --init```

2. 运行时会对具体初始化选项进行询问：

    ```base
    √ 你想如何使用 ESLint？
    √ How would you like to use ESLint?
    √ 项目中你使用哪种模块类型？（ESM/commonjs）
    √ What type of modules does your project use?
    √ 你的项目使用哪种框架？
    √ Which framework does your project use?
    √ 是否使用 TypeScript？
    √ Does your project use TypeScript?
    √ 你的代码运行在什么环境？（node/浏览器）
    √ Where does your code run?
    √ 你想怎么定义规范？
    √ How would you like to define a style for your project?
    √ 你想使用哪种流行规范？
    √ Which style guide do you want to follow?
    √ 你的配置文件使用什么格式？
    √ What format do you want your config file to be in?
    ```

3. 生成配置文件

## 进行语法检查

```base
npx eslint .\src\index.js
```

即可在命令行显示语法检查结果。

## 配置文件

首先贴一个初始化配置文件范例：

```javascript
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
  }
}
```

### globals 节点

> 当访问当前源文件内未定义的变量时，no-undef 规则将发出警告。在 globals 中定义这些全局变量，这样就不会发出警告了。

```javascript
globals: {
  "_": true, // 可以读取，可以修改
  "$": false, // 可以读取，不能修改
}
```

### env 节点

> 一个环境定义了一组预定义的全局变量。

```javascript
env: {
  browser: true,
  commonjs: true,
  es2021: true,
}
```

- 由于 ESLint 一半不允许使用 **未在页面内声明的成员**
- 而开发中常会用到一些环境自带的 api，例如：`window` (浏览器)、`__dirname` (nodejs)、`WeakRef` (es2021)等
- 所以要告诉 eslint，**当前代码是运行在哪些环境中**，这样来避免报错

### extends 节点

```javascript
extends: [
  "standard", // "或者写成 eslint-config-standard"
  // "eslint:all", // 这个是内置规范：全开
],
```

- 配置使用 **内置规范** 或者 **第三方规范**
- 如果使用第三方规范，需要先 npm 安装
- 配置 extends 时，可以省略 `eslint-config-`

### parserOptions 节点

> 指定你想要支持的 JavaScript 语言选项。
> 默认情况下，ESLint 支持 ECMAScript 5 语法。你可以覆盖该设置，以启用对 ECMAScript 其它版本和 JSX 的支持。

```javascript
parserOptions: [
  "ecmaVersion": 12,
],
```

- ESLint 解析器 解析代码时，指定 **用哪个版本的 js**
- 但是解析器不负责全局变量，比如你想用 ES6 的 `Set` 类型，还必须在 `env` 中配置

### rules 节点

```javascript
rules: {
  "semi": 1, // "or warn"
},
```

- 配置单条的规范。可以覆盖 `extend` 中的配置值。

> 要改变一个规则设置，你必须将规则 ID 设置为下列值之一：\
> "off" 或 0 - 关闭规则\
> "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)\
> "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

## 检查语法的规则

### 本质

- 就是 **【函数】**
- 通过查看源码：
  - eslint 内置 285 个规则，每条规则都是一个 **create 函数**
  - 在进行语法检查时，会将代码传入这些函数内做检查

### ESLint 内置的语法规范

- ESLint 安装时，就已经准备了 280 多个规范函数
- 具体分为 7 类
  - Possible Errors (可能出现的错误) - no-console...
  - Best Practices (最佳实践) - no-global-assign...
  - Strict Mode (严格模式) - strict
  - Variables (变量) - no-delete-var...
  - Node.js and CommonJS - callback-return...
  - Stylistic Issues (格式) - no-mixed-spaces-and-tabs...
  - ECMAScript 6 (ES6) - constructor-super...

### 自定义语法规范

略，你个菜鸡还想用自己的规范？到那步也不用看这篇了。

## 语法规范包类型

- **ESLint 内置规范包**: eslint-all (全用！) / eslint-recommended (56 条)
- **标准规范包**: eslint-config-standard (200+ 条，本质也是第三方)
- **各种第三方包**: google/airbnb/facebook

严格程度： all > airbnb-base > standard > recommended

## 如何与 Vue 一同使用

不像原先的 Vue Cli 脚手架，可以在创建 Vue 项目时傻瓜封装好 ESLint。

Vite 现在只能手动配置 ESLint，但好在也并不是很复杂。

1. 在项目中安装 ESLint （`pnpm i eslint -D`）
2. 初始化 ESLint 配置 （`npx eslint --init`）
3. **安装Vite-plugin-eslint**

    有了个这包，vite 才能在 dev 时去主动检查代码

4. 配置 vite.config.js 文件

    ```javascript
    import { defineConfig } from 'vite';
    import vue from '@vitejs/plugin-vue';
    import eslint from 'vite-plugin-eslint';

    export default defineConfig({
      plugins: [
        vue(),
        eslint(), // 这里是关键
      ],
    });
    ```

欧了。

## 如何使用 VSCode 扩展

文档：[VSCode ESLint 使用文档（英文）](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint#settings-options)

### 安装

在 VSCode 应用商店中搜索 ESLint，点击安装即可。

### 配置

配置项详见上面的使用文档，这里贴一下最常用的**保存自动修正**

```json
// settings.json

"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
},
```
