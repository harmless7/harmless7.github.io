---
title: "JAVA 中的多线程"
description: "还欠债~"
publishDate: "2024-09-01"
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

### 优先级 Priority

Priority 优先事项

JAVA 使用*抢占式调度*，线程的优先级本质上是：线程抢占到 CPU 的**概率**。

优先级的范围是 `1 ~ 10`，默认值为 `5`。

`Thread` 中有两个方法，用于设置和获取优先级：

- [`public final void setPriority(int newPriority)`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html#setPriority(int)>)
- [`public final int getPriority()`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html#getPriority()>)

### 守护线程 Daemon

守护线程是指在系统运行时，提供一种通用服务的线程。

它的意义就是为其他非守护线程提供服务。当所有非守护线程停止时，它也会停止。

设置守护线程的方法：

[`public final void setDaemon(boolean on)`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html#setDaemon(boolean)>)

它有几个注意事项：

1. `setDaemon()` 必须在 `start()` 之后执行，不能将一个运行中的线程设置为守护线程；

2. 在 `Daemon` 线程中创建的线程，同样是 `Daemon` 的；

3. 守护线程*永远不要*去访问固有资源，如文件、数据库，因为你永远不知道它会在什么时候中断；

### 出让 / 礼让线程 yield

[`public static void yield()`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html#yield()>)

它是一个静态方法，无需创建线程实例调用。

它的作用是：立即停止*当前*线程，并让出 CPU 时间片供所有线程抢占。（不排除当前线程再次抢占到 CPU）

理论上出让线程可以增加并发性，但是结果无法保证。

### 插入线程 join

[`public final void join()`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html#join()>)

在主线程中调用子线程，有可能主线程先结束。

但有时需要子线程先结束（比如主线程依赖子线程运算结果），就可以使用插入线程。

即 `join()` 的作用是：“等待子线程终止”。在 `join()` 方法后面的代码，等到子线程结束了才执行。

## 线程的生命周期

![20200126212037524.png](https://s2.loli.net/2024/07/30/s1IrQK5LxjNYGmM.png)

## 多线程安全问题

由于线程运行的随机性，当多个线程操作同一个资源时，会使操作的结果无法预料。即多线程的安全问题。

要解决安全问题，可以使用：

1. `synchronized` 同步
2. `lock` 锁

### 同步 synchronized

它能让内部的代码，同一时间只由一个线程执行。

#### `synchronized` 代码块

```java
synchronized (Object o) {
    // ... 一些线程操作
}
```

如上所示，`synchronized` 需要传入一个“锁”对象。

锁可以是任何对象。但是**必须是唯一的**。

唯一的意义，就像多个人共用同一把门锁，才能保证同时进门的只有一个人。如果是多个锁就没有意义了。

> 要保证锁的唯一性，有这几个思路：
>
> 1. 继承 `Thread` 创建多线程
>
>    - 可以设置静态 `Object` 属性做锁保证唯一
>    - 可以使用类的字节码文件做锁保证唯一（`synchronized (MyThread.class) {}`，因为同一个类只会编译一个字节码文件）
>
> 2. 实现 `runnable` 或者 `callable` 创建多线程
>
>    - 它们只需要一次实例化就能生成多个线程，使用 `this`（`runnable` 或 `callable` 对象本身） 就满足锁的唯一性了

#### `synchronized` 方法

```java
// 修饰符 synchronized 返回值 方法名(参数) {}

// 例：
private synchronized boolean method() {}
```

将 `synchronized` 关键词添加到方法声明，即可设置同步方法。

这种方式不能像代码块一样自定义锁对象，它默认的锁对象规则如下：

- 如果当前方法是*静态*方法：使用当前类的字节码文件对象

- 如果当前方法是*非静态*方法：使用 `this`

## `lock` 锁

`synchronized` 本质上也是锁，但是它是自动操作的，我们没法直观地看到哪里加上了锁，哪里释放了锁。

我们可以使用 `Lock` 对象，来手动设置锁。

主要使用两种方法：

- `void lock()`: 获得锁
- `void unlock()`：释放锁

> `Lock` 是一个接口，不能直接实例化。我们可以使用 `ReentrantLocak` 来实例化

```java
private static Lock lock = new ReentrantLocak(); // 需要确保各个线程使用的是同一把锁

lock.lock(); // 加锁
// ... do some things
lock.unlock(); // 释放
```

### 死锁

老生常谈，要避免锁的嵌套。

## 生产者和消费者

通过一个信号量来表示资源占用情况，然后线程间通过 `wait()` 及 `notify() / notifyAll()` 进行协作。

例：厨师、食客和桌子。

```java
public class Desk {
    public static int hasFood = 0; // 标识桌子上有几分食物
    public static int count = 10; // 食客能吃掉的总食物量
    public static Object lock = new Object();

    public static void main(String[] args) {
        new Foodie().start();
        new Cook().start();
    }
}

public class Foodie extends Thread {
    @Override
    public void run() {
        while (true) {
            synchronized (Desk.lock) {
                if (Desk.count == 0) {
                    system.out.println("已经吃饱了");
                    break;
                } else {
                    // 判断桌子是否有食物
                    if (Desk.hasFood == 0) {
                        // 没有食物，等待
                        Desk.lock.wait();
                    } else {
                        // 有食物，吃
                        Desk.count--;
                        system.out.println("吃掉一个食物，还有" + Dese.count + "个");
                        Desk.hasFood--;
                        Desk.lock.notifyAll(); // 唤醒所有等待的线程（叫厨师做饭）
                    }
                }
            }
        }
    }
}

public class Cook extends Thread {
    @Override
    public void run() {
        while (true) {
            synchronized (Desk.lock) {
                if (Desk.count == 0) {
                    break;
                } else {
                    if (Desk.hasFood > 0) {
                        // 有食物，休息
                        Desk.lock.wait();
                    } else {
                        // 无食物，做
                        Desk.hasFood++;
                        system.out.println("做了一个食物");
                        Desk.lock.notifyAll(); // 唤醒所有等待的线程（叫食客吃）
                    }
                }
            }
        }
    }
}
```

## 阻塞队列

阻塞队列是线程安全的，可以解决生产者和消费者的问题。

队列实现了四个接口：`Iterable`、`Collection`、`Queue`、`BlockingQueue`。

我们学习两个实现类：

- `ArrayBlockingQueue`：基于数组的阻塞队列（有界）
- `LinkedBlockingQueue`：基于链表的阻塞队列（伪无界，界为 int 的最大值）

队列主要使用两个方法：

- `put()` 向队列中放入数据，如果满了就等着
- `take()` 从队列中取出数据，如果空了就等着

这两个方法中已经添加了锁，无需我们自己加锁。
