---
title: JAVA 中的多线程
description: 换欠债~
icon: java
category:
    - 技术学习
tag:
    - java
    - thread
---

## 概述

### 什么是线程

一个进行中的程序，就会产生一个*进程* `process`，它是系统进行*资源分配*的基本单位。

而一个程序内往往会同时处理多个任务，这些任务由一个个*线程* `thread` 来完成。线程是系统进行*运算调度(执行任务)*的最小单位。

### 并发？并行？

并发：单个 CPU 交替计算多个线程。

并行：多个 CPU 同时进行多个线程。

## JAVA 中多线程的三种实现方式

### 继承 `Thread` 类

[`java.lang.Thread`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html)

自定义线程类，继承 `Thread` 类，并且实现 `public void run()` 方法，在 `run` 内编写线程需执行代码。

```java
class CustomerThread extends Thread {
    @Override
    public void run() {
        // 线程要执行的代码
        for (int i = 0; i < 100; i++) {
            System.out.println(this.getName() + "：" + i);
        }
    }
}
```

实例化自定义线程类后，调用 `start()` 即可开启自定义线程。

```java
CustomerThread ct0 = new CustomerThread();
CustomerThread ct1 = new CustomerThread();

ct0.setName("线程0");
ct1.setName("线程1");

ct0.start();
ct1.start();

// 线程0：0
// 线程1：0
// 线程1：1
// 线程0：1
// 线程0：2
// 线程1：2
// ...
// 线程1：99
// 线程0：99
```

### 实现 `Runnable` 接口

[`java.lang.Runnable`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Runnable.html)

自定义运行（run）类，实现 `Runnable` 接口，并重写 `public void run()` 方法。

```java
class CustomerRun implements Runnable {
    @Override
    public void run() {
        // 线程要执行的代码
        for (int i = 0; i < 100; i++) {
            System.out.println(this.getName() + "：" + i);
        }
    }
}
```

实例化运行（run）类，作为参数去实例化 `Thread` 类，以创建多个线程。

```java
CustomerRun cr = new CustomerRun();

Thread tr0 = new Thread(cr);
Thread tr1 = new Thread(cr);

ct0.setName("线程0");
ct1.setName("线程1");

ct0.start();
ct1.start();

// 结果略...同上
```

### 实现 `Callable` 接口，并用 `Future` 接口接收返回值

[`Callable`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Callable.html)

老样子，实现 `Callable` 接口并重写 `public <V> run()` 方法。

> 注意，`Callable` 接口具有泛型 `V`，即线程要返回的数据类型。继承时记得定义。

```java
class CustomerCallable implements Callable<Integer> {
    @Override
    public Integer run() throws Exception {
        int sum = 0;
        for (int i = 0; i < 100; i++) {
            sum += i;
        }
        return sum;
    }
}
```

实例化自定义的 `Callable` 实例，并用它去创建 `FutureTask` （因为 `Future` 只是一个接口，需要一个实例所以用 `FutureTask`）。

`FutureTask` 将会管理并存储多线程运行的结果。

> 注意，`FutureTask` 同样具有泛型。

下一步，再使用 `FutureTask` 实例创建 `Thread` 对象。并启动。

最后即可从 `FutureTask` 中获取线程返回的结果。

```java
// 自定义 Callable
CustomerCallable cc = new CustomerCallable();

// Future
FutureTask<Integer> ft = new FutureTask<>(cc);

// Thread
Thread tr = new Thread(ft);
tr.start();

// 得到最后的结果
Integer sum = ft.get();
```

## `Thread` 中的常用方法

- `String getName()`

- `void setName()`
    
    设置线程的名字（构造方法也可以传入线程名）

    > 如果没有给线程命名，它也会有默认名字，格式为：`Thread-X`

- `static Thread currentThread()`

    哪条线程执行到这条方法，就返回哪个线程的实例

    JVM 虚拟机启动时，会自动启动 `main` 线程，去调用 `main()` 方法

- `static void sleep(long time)`

    让线程休眠指定*毫秒数*

    时间到了线程就自动继续执行