---
title: "了解一下 JAVA 中的 reflect"
description: "反射的概念及其使用"
publishDate: "2025-01-22"
---

## 概述

一种元编程手段。通过反射能获取并控制类的构造方法、成员变量、成员方法。

## 获取 class 对象

- Class.forName

  ```java
  Class class = Class.forName("com.harmless.myreflect.Student");
  ```

- 类名.class

  ```java
  Class class = Student.class;
  ```

- 对象.getClass

  ```java
  Student s = new Student();
  Class class = s.getClass();
  ```

## 利用反射获取构造方法

获取：

```java
Class class = Class.forName("com.harmless.myreflect.Student");

// 多个
Constructor[] cons = class.getConstructors(); // 获取所有 public 构造方法
Constructor[] cons = class.getDeclaredConstructors(); // 获取所有构造方法
// for (Constructor con : cons) {
//   System.out.println(con);
// }

// 单个
Constructor con = class.getConstructor();
Constructor con = class.getDeclaredConstructor();
// 携带参数来获取指定构造函数
// 参数需要与构造方法定义的类型一致
// 例：这里就会匹配到 private Student(String name, int age) 的构造方法
Constructor con = class.getDeclaredConstructor(String.class, int.class);
```

使用：

- `Constructor.getModifiers()`: 获取修饰符，返回一个 `int`

- `Constructor.newInstance()`：使用构造，直接创建对象。

  私有对象无法直接创建，可以先用 `Constructor.setAccessible(true)` 强行授权，也叫做“暴力反射”

## 利用反射获取成员变量

获取：

```java
Class class = Class.forName("com.harmless.myreflect.Student");

// 多个
Fields[] fields = class.getFields(); // 获取所有 public 成员变量
Fields[] fields = class.getDeclaredFieldss(); // 获取所有成员变量
// for (Fields field : fields) {
//   System.out.println(field);
// }

// 单个
Fields con = class.getFields("name");
Fields con = class.getDeclaredFields("age");
```

使用：

- `Field.getModifiers()`：获取修饰符，返回一个 `int`

- `Field.getName()`：获取字段名

- `Field.getType()`：获取变量类型，返回一个 `Class<?>`

- `Field.get()`：获取字段赋值。需传入一个 Field 的所属对象

- `Field.set()`：设置字段值。需传入所属对象以及需赋值

## 利用反射获取成员方法

获取：

```java
Class class = Class.forName("com.harmless.myreflect.Student");

// 多个
Methods[] methods = class.getMethods(); // 获取所有 public 成员方法（包含父类）
Methods[] methods = class.getDeclaredMethodss(); // 获取所有成员方法（不包含父类）
// for (Methods method : methods) {
//   System.out.println(method);
// }

// 单个
Methods con = class.getMethods("eat", String.class, int.class); // 第一个参数是名字，后面的参数是方法的形参
Methods con = class.getDeclaredMethods("age", String.class);
```

使用：

- `Method.getModifiers()`：获取修饰符，返回一个 `int`

- `Method.getName()`：获取方法名

- `Method.getParameters()`：获取方法形参，返回 `Parameter[]`

- `Method.getExceptionTypes()`：获取方法异常，返回 `Class[]`

- `Method.invoke()`：运行方法，参数一是所属类的对象，后续参数作为方法的形参
