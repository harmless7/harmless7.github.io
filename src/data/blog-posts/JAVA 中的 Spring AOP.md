---
title: "JAVA 中的 Spring AOP"
description: "Aspect Oriented Programming"
publishDate: "2025-04-02"
---

## intro

### 重要概念

- JoinPotint 连接点
- Advice 通知
- PointCut 切入点
- Aspect 切面
- Target 目标对象

## 通知类型

- `@Before` 前置通知：目标方法前执行
- `@Around` 环绕通知：目标方法前、后都执行

    > 注意事项：
    > 1. 需手动调用 `ProceedingJoinPoint.proceed()` 来继续执行目标方法
    > 2. 返回值必须指定为 `Object`（兼容各种返回）

- `@After` 后置通知：目标方法后执行（即使异常）
- `@AfterReturning` 返回后通知：目标方法正常 return 后执行
- `@AfterThrowing` 异常后通知：目标方法异常后执行

## 通知顺序

当目标方法有多个切面，它们执行的顺序如何？

首先把切面根据*优先级*从高到低排列，规则如下：

1. 带 `@Order(数字)` 注解的切面：值越小，优先级越高。
2. 无注解切面：优先级小于带注解。按切面类名排序，越靠前优先级越高。

排序后的切面，*从外向内（洋葱结构）*执行：

- after：优先级越高，越先执行
- before：优先级越高，越后执行

即：将目标对象类比为洋葱的核，那么优先级级越高的切面，越靠洋葱的外层。

## 切入点表达式

### `execution()`：根据方法签名匹配

#### 例子

```java
@Before("execution(public void net.harmless.service.impl.DeptServiceImpl.delete(java.lang.Integer))")
public void before(JoinPoint joinPoint) {
  // do something...
}
```

#### 语法

```java
execution(访问修饰符? 返回值 包名.类名.?方法名(方法参数) throw 异常?)
```

- `访问修饰符`：需匹配目标方法的访问修饰符（可省略）
- `包名.类型名.`：需匹配目标方法所处的包名和类名（可省略但不建议）
- `throw 异常`：需匹配目标方法抛出的异常（可省略）

#### 通配符

- `*`：

  用于替换上述语法中的某一部分，代表该部分任意可匹配，例如：

  ```java
  // 代表匹配：不限返回值，harmless.service.impl 包下，任意类，任意单传一个 Integer 参数的方法
  execution("* net.harmless.service.impl.*.*(java.lang.Integer)")
  ```

- `..`：

  作用有二：1. 匹配任意层级的包路径，2. 匹配任意个数、任意类型的参数。例如：

  ```java
  // com.example 包下任意层级的 service 包中的所有方法
  execution(* com.example..service.*.*(..))

  // UserService 类中所有 save 方法，无论是什么参数
  execution(* com.example.service.UserService.save(..))
  ```

> 可以使用逻辑运算符（`&&`, `||`, `!`）构造复杂表达式

#### 最佳实践

1. 业务类名尽可能规范（findXxx, updateXxx），方便切入
2. 切入*接口*而非*实现类*，增强扩展性
3. 尽可能缩小匹配范围，少用 `..` 多用 `*`

### `@annotation()`：根据注解匹配

例子：

```java
@Before("@annotation(net.harmless.anno.Log)")
public void before() {
  // do something...
}
```

### `@PintCut()`：复用表达式

`@PinrtCut`：将公共切入点表达式抽取出来，需要时引入

```java
@Pointcut("execution(* net.harmless.service.impl.DeptServiceImpl.*(..))")
public void pt(){}

@Around("pt()")
public Object recordTime(ProceedingJointPoint joinPoint) throw Throwable {
  // do something...
}
```

对于切入点表达式方法的访问修饰符：

- private: 仅能在当前切面类中使用该表达式
- public: 在其他外部切面类也可以使用
