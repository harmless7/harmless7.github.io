---
title: 'Stylus'
description: ''
pubDate: '2024-09-27'
---

# CSS 预处理器 Stylus 学习笔记

## 为什么是 Stylus?
两大同行 ```Sass``` 和 ```Less```。

Sass 2007 年诞生，属于最强大最成熟的预处理器。而 Less 2009 年出现，更贴近 css 语法。

咱们的主角 ```Stylus``` 直到 2010 年才诞生，但是人气完全无法与两个同行相提并论。

它的语法有点像是两位前辈的融合，这使得它**自由度很高**，并且写出来的代码非常**简洁**。

当然最重要的原因是，~~**我喜欢新的**~~ **CSS 需要一个超级英雄来拯救**。

## 选择器
### 简化一切符号
* 使用缩进（两个空格）来替代 ```{``` 和 ```}```
* ```;``` 和 ```:``` 可以选择不写

``` Stylus 不再有你懒得写的东西（可能）
// 极致简化
body
  color white

// 留点冒号
body
  color: white

// 一次多个（甚至逗号都可以不要，但推荐留着吧）
textarea,
input,
  border 1px solid red
```

### 父级引用
#### 常规用法
##### 使用伪类
多亏了 ```&```，```:active``` 与 ```::before``` 等伪类，将不再与它们的父亲分离：
``` stylus
.father
  &:active // 等效于 .father:active
  &::before // 等效于 .father::before
```

##### 拼接选择器名
还能这么用：
``` stylus
.user
  &-name // 等效于 .user-name
  & .age // 等效于 .user .age
```

#### 精准找爹（跨级找爹）
如果有元素，它不找爹，而是找爹的爹，或者爹的爹的爹的爹...请不要去 &&&&...

##### 绝对找爹
请使用 ```^[N..M]```，N 和 M 代表父节点层级下标（根节点为0），它会将 N~M 之间的选择器都拼起来。

你也可以使用 ```^[N]```，它等效于 ```^[0..N]```。
``` stylus
.zero // 0 级父亲
  & .one // 1 级父亲
    & .two // 2 级父亲
      ^[1]:active // 等同于 .zero .one:active
      ^[1..2]:hover // 等同于 .one .two:hover
  & .wang // 1 级...王舅舅，是找不到的
```

##### 相对找爹
如果指定下标还是太难看了，还可以通过相对位置定位：
``` stylus
.zero // 0 级父亲
  & .one // 1 级父亲
    & .two // 2 级父亲
      ../:active // 等效于 .zero .one:active
      ../../:hover // 等效于 .zero:hover
```

### selector() bif
感觉用不上，以后用上再补充

### 消除歧义
暂时用不上，以后用上再补充

## 变量
### 常规使用
``` stylus
$font-size = 14px
$font-stack = "微软雅黑", Arial, sans-serif
$empty = () // 定义空变量不能用 null，必须用 空括号
body
  font $font-size $empty $font-stack

// 编译为：
body {
  font: 14px "微软雅黑", Arial, sans-serif;
}
```
### 我懒得定义变量怎么办？
#### 属性查找
Stylus 允许你偷这个懒，直接用 ```@``` 来查找属性：
``` stylus
// 偷懒前
#logo
  position: absolute
  top: 50%
  left: 50%
  width: w = 150px
  height: h = 80px
  margin-left: -(w / 2)
  margin-top: -(h / 2)

// 偷懒后
#logo
  position: absolute
  top: 50%
  left: 50%
  width: 150px
  height: 80px
  margin-left: -(@width / 2)
  margin-top: -(@height / 2)
```

#### 属性查找默认值
为了防止它找不到属性，我们还可以用 ```unless``` 给个默认值：
``` stylus
position()
  position: arguments
  z-index: 1 unless @z-index

#logo
  z-index: 20
  position: absolute // 这里能正常取到 z-index: 20

#logo2
  position: absolute // 这里因为找不到属性，z-index: 1
```

## 插值
用插值 ```{}``` 写活属性名 和 选择器名
### 属性名
``` stylus
vendor(prop, args)
  -webkit-{prop} args
  -moz-{prop} args
  {prop} args

border-radius()
  vendor('border-radius', arguments)

button
  border-radius 1px 2px / 3px 4px

编译后：
button {
  -webkit-border-radius: 1px 2px / 3px 4px;
  -moz-border-radius: 1px 2px / 3px 4px;
  border-radius: 1px 2px / 3px 4px;
}
```
### 选择器名
``` stylus
table
  for row in 1 2 3 4 5
    tr:nth-child({row})
      height: 10px * row

// 定义后使用
mySelectors = "#foo, #bar, #baz"
{mySelectors}
  background white
```

## 运算符
略过，运算符哪里都是大同小异的，只要注意几个地方

在属性值中使用 ```/``` 运算符时，**必须** 用括号括起来，否则 / 运算符将被作为字面意思（即“斜线”）解释（以支持 CSS 的 line-height 属性）：
``` stylus
font 14px/1.5 // ×
font (14px/1.5) // √
```

## 函数
### 基础使用
函数定义与混入（mixins）一致，但是有返回值：
``` stylus
add(a, b = a) // 这里是可以有默认值的
  return a + b

body
  padding add(10px, 5) // padding: 15px;
```

### 命名参数
``` stylus
subtract(a, b)
  return a - b

subtract(b: 10, a: 25) // 省得你记不清参数顺序
```

### 或者干脆不写死参数
使用 ```arguments``` 获取所有参数
``` stylus
sum()
  n = 0
  for num in arguments
    n = n + num

sum(1, 2, 3, 4, 5)
// => 15
```

### 内置参数
这里整理一些可能会用到的，更多可能会用到的还得看文档：
[stylus 内置函数](https://www.stylus-lang.cn/docs/bifs.html)
###### 透明度 ```alpha(color[, value])```
``` stylus
alpha(#fff) // 1
alpha(#fff, 0.5) // rgba(255, 255, 255, 0.5)
```

###### 检查是深色还是浅色 ```dark(color)``` & ```light(color)```
``` stylus
dark(white) // false
light(#00FF40) // true
```

###### 获取文件名 ```basename(path[, ext])```
``` stylus
basename('images/test/foo.png')
// => "foo.png"

basename('images/foo.png', '.png') // 传入后缀，去掉后缀
// => "foo"
```

###### 获取目录名 ```dirname(path)```
``` stylus
dirname('images/test/foo.png')
// => "images/test"
```

###### 获取后缀 ```extname(path)```
``` stylus
extname("image/test/foo.png")
// => ".png"
```