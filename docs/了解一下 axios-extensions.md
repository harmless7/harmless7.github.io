---
# 标题
title: 了解一下 axios-extensions
# 描述
# description:
# 图标
icon: javascript
# 写作时间
date: 2024-03-29
# 分类（可多个）
category:
  - 技术学习
# 标签（可多个）
tag:
  - js
  - 缓存
# 置顶
# sticky: true
# 收藏
# star: true
---

## 参考文档

[axios-extensions](https://github.com/kuitos/axios-extensions)

[axios 中文文档](https://axios-http.com/zh/docs/intro)

[适配器模式](https://refactoringguru.cn/design-patterns/adapter)

[如何实现axios的自定义适配器adapter](https://www.jb51.net/article/212290.htm#_label0)

## 是什么？

一个 axios 的扩展库，包括 节流、缓存、重试 等功能。

因为想要一个好用的接口请求缓存，而找到了这个库。

**使用方法：**

```js
import axios from 'axios';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

// 使用 节流(throttle) 和 缓存(cache) 增强器，来增强原始 axios 适配器(Adapter)
const http = axios.create({
  baseURL: '/',
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
});
```

## What's the "Adapter"?

![adapter](https://s2.loli.net/2024/03/29/qBpJ9FRbDjOf1K4.png)

要理解增强适配器，我们得先理解什么是适配器。

[适配器模式](https://refactoringguru.cn/design-patterns/adapter)

上文很好地介绍了适配器模式。简而言之就是通过适配器，**能使本来不同的接口相互适配**。现实中电源转接头就是一个例子。

axios 的适配器，适配了浏览器和 Node.js 不同的底层网络库（XMLHttpRequest 和 http），其中也包含了 axios 发起请求的核心逻辑。

在配置 axios 时，可以通过 `adapter` 配置来自定义处理请求：

```js
  // `adapter` 允许自定义处理请求，这使测试更加容易。
  // 返回一个 promise 并提供一个有效的响应 （参见 https://github.com/axios/axios/blob/v1.x/lib/adapters/README.md）。
  adapter: function (config) {
    /* ... */
  },
```

## cacheAdapterEnhancer（缓存适配增强器）

![cacheAdapter](https://s2.loli.net/2024/03/29/eaBnMNOwCIZUobA.jpg)

### 使用前提

首先注意一点：**缓存只对 `GET` 请求生效！**

``` ts
// 对 GET 方法的请求进行缓存处理
if (method === 'get' && useCache) {
  // 缓存处理
} else {
  // 对于非GET方法的请求，或关闭了缓存的请求，直接使用原始适配器处理。
  return adapter(config);
}
```

我本来想用这个来缓存 `POST` 请求的，现在计划泡汤了。但是[其源码](./codes/axios-extensions/cacheAdapterEnhancer.ts)可以作为参考，来自己写一个缓存适配器。

### 基本使用

缓存适配增强器接受两个参数：

```txt
cacheAdapterEnhancer(adapter: AxiosAdapter, options: Options): AxiosAdapter
```

其中：

- `adapter` 是 axios 原装适配器，必填；
- `options` 是配置缓存，可选，详细如下表：

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
|enabledByDefault|boolean|true|是否默认开启缓存，可被覆盖。<br /> 例如：某请求设置 cache: false，即使 `enabledByDefault` 为 true，也不会缓存|
|cacheFlag|string|cache|配置缓存的关键字，以便在 axios 请求中单独定义是否缓存|
|defaultCache|CacheLike|`new LRUCache({ maxAge: FIVE_MINUTES, max: 100 })`|类缓存对象，默认使用 [lru-cache](https://www.npmjs.com/package/lru-cache) 存储请求。也可以自己使用其它符合 CacheLike 接口的缓存对象|

### 使用自定义缓存对象

```ts
import axios from 'axios';
import { cacheAdapterEnhancer, Cache } from 'axios-extensions';

const http = axios.create({
  baseURL: '/',
  headers: { 'Cache-Control': 'no-cache' },
  // 关闭默认缓存
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false })
});

http.get('/users', { cache: true }); // 使请求可缓存（由于是第一次请求调用，发送了真实的 http 请求）

// 手动定义缓存（这里使用的就是 lru-cache）
const cacheA = new Cache();
// 或者类缓存对象
const cacheB = { get() {/*...*/}, set() {/*...*/}, del() {/*...*/} };

// 由于缓存不同，实际请求将有两个
http.get('/users', { cache: cacheA });
http.get('/users', { cache: cacheB });

// 由于配置了强制更新，实际请求已被缓存
http.get('/users', { cache: cacheA, forceUpdate: true });
```

## throttleAdapterEnhancer（节流适配增强器）

![throttle](https://s2.loli.net/2024/03/29/zb3NUkIBAqYwl6W.jpg)

### 使用前提

很遗憾，节流同样**只对 `GET` 请求生效**。

### 基本使用

同样接受两个参数。

```txt
throttleAdapterEnhancer(adapter: AxiosAdapter, options: Options): AxiosAdapter
```

其中：

- `adapter` 是 axios 原装适配器，必填；
- `options` 是节流配置，可选，详细如下表：

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
|threshold|number|1000|节流的冷却时间。在第一次请求后，在冷却时间内不会再发起新的请求，而是会返回|
|cache|CacheLike|`new LRUCache({ max: 10 })`|用于存储节流请求的 CacheLike 实例|

基本上，我们会同时使用 `throttleAdapterEnhancer` 和 `cacheAdapterEnhancer`，以获得最大的缓存效益。

```txt
throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
```

## retryAdapterEnhancer（重试适配增强器）

![retry](https://s2.loli.net/2024/03/29/iVfOI6NCkjJ3q1D.jpg)

### 使用前提

这个终于不是仅 `GET` 有效了。

### 基本使用

同样接受两个参数。

```txt
retryAdapterEnhancer(adapter: AxiosAdapter, options: Options): AxiosAdapter
```

其中：

- `adapter` 是 axios 原装适配器，必填；
- `options` 是重试配置，可选，详细如下表：

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
|times|number|2|全局设置请求失败的重试时间|

```ts
import axios from 'axios';
import { retryAdapterEnhancer } from 'axios-extensions';

const http = axios.create({
  baseURL: '/',
  headers: { 'Cache-Control': 'no-cache' },
  adapter: retryAdapterEnhancer(axios.defaults.adapter)
});

// 如果失败，该请求 2 秒后会重试
http.get('/users');

// 也可以单独设置重试时间
http.get('/special', { retryTimes: 3 });
```

