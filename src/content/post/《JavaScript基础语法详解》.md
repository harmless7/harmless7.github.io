---
title: "《JavaScript基础语法详解》"
description: "JavaScript Handbook"
publishDate: "2022-09-29"
---

希望 js 不会成为下一个 “世界上最好的语言”。

<!-- more -->

## 基础知识

### 数据类型

#### Number类型

##### 数字分隔线

如果要表示的数字位数过长，或者需要按特定位数进行分组，可以用下划线分隔：

```javascript
1000_0000_0000; // 整数
22.4211_3677_7478; // 小数
0b1100_0010_1101; // 二进制
```

##### 特殊数字

判断计算结果是不是 `NaN`，可以使用 JavaScript 全局对象中的 `isNaN()` 或者 `Number.isNaN()` 方法。

#### Null 与 Undefined 类型

如果想让一个变量代表的是空值，就应该使用 null，这表示变量是已定义的，只不过它的值是空白。

```javascript
const inputValue = null;
console.log(nullValue); // null
typeof nullValue; // "object" (null 本质上还是一种对象)
```

当定义一个变量但没有赋值时，这个变量的值就是 undefined。

```javascript
let num;
console.log(num); // undefined
typeof num; // "undefined"
```

> 常见的产生 undefined 的情况
>
> 1. 未赋值的变量
> 2. 没有返回值的函数
> 3. 访问对象中没有的属性和访问数组中没有的元素

#### Symbol 类型

本质是一种**值不会重复**的数据类型。

```javascript
Symbol("a symbol") === Symbol("a symbol"); // false

// 可用作对象的属性，防止对象被篡改
let obj = {};
let prop = Symbol("prop");
obj[prop] = "value";
console.log(obj[Symbol("prop")]); // undefined
```

使用全局符号注册表，可以用相同字符串，获取同一条 Symbol.
使用方法是 `Symbol.for()`，如果没有会创建，有了会返回。

```javascript
let obj = {};
let prop = Symbol.for("prop");
obj[prop] = "value";
console.log(obj[Symbol.for("prop")]); // "value"
```

## 运算符

### 逻辑运算符

1. **逻辑运算符返回的并不是布尔类型的值，而是返回最后一个参与计算的表达式的值**。
2. 逻辑与、逻辑或 有短路特性：如果遇到一个假值，则整个逻辑表达式的结果就确定为不成立了，所以会直接返回假值表达式的结果。

利用这些特性

可以使用**与逻辑**与来避免因为使用未定义的值而报错：

```javascript
let obj;
obj.a; // 类型错误：不能访问 undefined 中的 a 属性
obj && obj.a; // 无报错，返回 undefined
```

可以使用**或逻辑**来给空值设置默认值：

```javascript
let desc = "";
desc || "暂无简介"; // 暂无简介
```

### 空值合并（Nullish Coalescing）运算符

ES2020 规范中定义，使用 `??` 表示。

只有当左侧操作数为 `null` 或 `undefined` 时，才会使用右侧操作数的值，否则返回左侧操作数的值：

```javascript
"" ?? 10; // ""
false ?? "no"; // false
null ?? 10; // 10
undefined ?? "empty"; // "empty"
```

## 流程控制

### label 语句

用于给循环或代码块添加一个标签，后便可以使用 `break label` 直接退出指定标签处的循环或代码块，或者使用 `continue label` 继续。

```javascript
label :for() {};
// 或
label: {
  // 代码块
}
```

例如：

```javascript
outer: for (let i = 0; i < 10; i++) {
	for (let j = 0; j < 8; j++) {
		if (j === 3) {
			break outer;
		}
		console.log(i + j);
	}
}
```
