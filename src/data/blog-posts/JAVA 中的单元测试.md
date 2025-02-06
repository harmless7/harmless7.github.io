---
title: "JAVA 中的单元测试"
description: "Unit test on JAVA"
publishDate: "2025-02-06"
---

## Why do we need unit test?

1. main 方法与源代码未分开，难维护
2. 一个方法测试失败，会影响后面的方法
3. 无法自动化测试，得到测试报告

## JUnit

Junit 作为 JAVA 最热门的单元测试依赖，我们主要学习它。

### 添加依赖

在 Maven 中搜索 JUnit，会出现以下几个包：

- JUnit：通常指整个 JUnit 框架，包括 JUnit 4 及以前的版本，以及 JUnit 5（由多个模块组成）。

- JUnit Jupiter API：仅包含测试声明相关的内容，不包含执行测试的引擎。适用于编写测试代码，但单独依赖它无法运行测试。

- JUnit Jupiter Engine：这是 JUnit 5 的测试运行引擎，支持运行基于 JUnit Jupiter API 编写的测试。

- **JUnit Jupiter (Aggregator)**：这是一个聚合依赖（Aggregator），它同时包含 junit-jupiter-api 和 junit-jupiter-engine，以及 junit-jupiter-params（用于参数化测试）。

一般要使用 JUnit 5 进行测试，通常直接依赖 `JUnit Jupiter（Aggregator）` 即可，不需要分别引入 API 和 Engine。

[mvnrepository - junit-jupiter](https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter)

### 基础使用

引入依赖后，可在 `test` 目录下编写单元测试代码。

1. `test` 目录下的 `java` 中创建包

2. 包内创建测试类

    测试类命名规范：`XxxTest`，例如：`UserServiceTest`

3. 测试类内部编写测试方法

    - 命名规范：`testXxxxx`
    - 必须使用 `public` 及 `void` 修饰符
    - 在上方添加 `@Test` 注释

    ```java
    package net.harmless;

    import org.junit.Test;

    /**
     * 用户服务测试类
     */
    public class UserServiceTest {
        @Test
        public void testGetAge() {
            StudentService studentService = new StudentService();
            int age = studentService.getAge();
            String name = studentService.getName();
            System.out.println(age);
            System.out.println(name);
        }
    }
    ```

### 断言

通过 `Assertions` 类的方法，来对结果与预期结果进行比较。

|断言方法|描述|
|---|---|
|`Assertions.assertEquals(Object exp, Object act, String msg)`|检查两个值是否相等|
|`Assertions.assertNotEquals(Object unexp, Object act, String msg)`|检查两个值是否不相等|
|`Assertions.assertNull(Object act, String msg)`|检查对象是否为 null|
|`Assertions.assertNotNull(Object act, String msg)`|检查对象是否非 null|
|`Assertions.assertTrue(Boolean condition, String msg)`|检查条件是否为 true|
|`Assertions.assertFalse(Boolean condition, String msg)`|检查条件是否为 false|
|`Assertions.assertThrows(Class expType, Executable exec, String msg)`|检查程序抛出的异常是否符合预期|

> 最后的 msg 参数为断言检查不通过时的提示信息，非必填。

例：

```java
@Test
public void testGetNameById() {
    Assertions.assertThrows(IllegalArgumentException.class, () -> {
        // getNameById 在 id 为 null 时会抛出 IllegalArgumentException 异常
        new StudentService().getNameById(null);
    }, "未传入 id 时抛出异常类型错误");
}
```

### 注解

注解能够增强测试方法的功能。

|注解|说明|备注|
|---|---|---|
|`@Test`|测试类中的方法用它修饰才能成为测试方法，才能启动执行|单元测试|
|`@ParameterizedTest`|参数化测试的注解（可以让单个测试运行多次，每次运行时仅参数不同）|*用了该注解，就不需要 @Test 注解了*，必须和 `@ValueSource` 配合使用|
|`@ValueSource`|参数化测试的参数来源，赋予测试方法参数|与 `@ParameterizedTest` 配合使用|
|`@DisplayName`|指定测试类、测试方法显示的名称（默认为类名、方法名）||
|`@BeforeEach`|用来修饰一个实例方法，该方法会在*每一个*测试方法执行之前执行一次|初始化资源（准备工作）|
|`@AfterEach`|用来修饰一个实例方法，该方法会在*每一个*测试方法执行之后执行一次|释放资源（清理工作）|
|`@BeforeAll`|用来修饰一个*静态方法*，该方法会在所有测试方法执行之前，*只执行一次*|初始化资源（准备工作）|
|`@AfterAll`|用来修饰一个*静态方法*，该方法会在所有测试方法执行之前，*只执行一次*|释放资源（清理工作）|

以*参数化测试注解*为例：

```java
@DisplayName("学生服务测试类")
public class StudentServiceTest {
    @DisplayName("测试通过 id 获取学生姓名方法")
    @ParameterizedTest
    @ValueSource(ints = { 1, 2, 3, 4, 5 })
    // ValueSource 支持的所有数组： shorts | bytes | ints | longs | floats | doubles | chars | booleans | strings | classes
    public void testGetNameById(int id) {
        StudentService studentService = new StudentService();
        String name = studentService.getNameById(id);
        Assertions.assertNotNull(name, "未获取到名称");
    }
}
```

单元测试会根据数组中的 id 多次调用测试方法，结果如下：

![junit_parameterized_test_result](https://s2.loli.net/2025/02/06/7pOKdVDSqXgP3Fa.jpg)

上图中我在被测试函数中，添加了 id == 3 时返回 null 的逻辑。所以 3 是报错的，但不会阻塞后续其他参数的测试。

## 企业开发规范

做单元测试时，尽可能考虑所有可能性，特别是边界值。

idea 中可以使用 “使用覆盖率运行xxx”，可以在测试的同时，统计测试的覆盖率。

覆盖率统计如下图：

![idea_test_coverage](https://s2.loli.net/2025/02/06/1oGmMHTxs4Ufh2K.jpg)

包含了各个类的 类覆盖率、方法覆盖率、行覆盖率 等信息。

> 默认的覆盖率统计针对整个项目，如果要设置为指定的包/类，可以在：
>
> 运行/配置设置（顶部执行箭头左边，点击类名的下拉里） → 代码覆盖率 中调整

## refer

[mvnrepository - junit-jupiter](https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter)

[junit.org - user-guide](https://junit.org/junit5/docs/current/user-guide/#overview)

[黑马程序员 - JAVA Web：单元测试](https://www.bilibili.com/video/BV1yGydYEE3H?vd_source=cbb9bae25f5ac9e51f8ff965eb794230&spm_id_from=333.788.videopod.episodes&p=35)
