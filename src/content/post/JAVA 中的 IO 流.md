---
title: "JAVA 中的 IO 流"
description: "差缺补漏了"
publishDate: "2024-06-28 18:22:07"
---

## 概述

### 什么是 IO 流？

IO 即 input（输入）和 output（输出）。

流，用来形容内存中数据传输的过程：像水一般流动。

因此 IO 流也被叫做*输入输出流*。

### IO 流的分类

按照数据的流向，可以分为：**输入流**和**输出流**。

- 输入流：把数据从*其他设备*输入到*内存*。

- 输出流：把数据从*内存*输出到*其他设备*。

按照数据格式，可以分为：**字节流**和**字符流**。

- 字节流：传输以字节为单位。

- 字符流：传输以字符为单位。

![](https://s2.loli.net/2024/06/17/IjJvQpgzW9twlqL.jpg)

### 顶级抽象类

|        | 输入流        | 输出流         |
| ------ | ------------- | -------------- |
| 字节流 | `InputStream` | `OutputStream` |
| 字符流 | `Reader`      | `Writer`       |

## 字节/字符流的顶级抽象类

![](https://s2.loli.net/2024/06/18/tufpArC2Gy4o1Xm.png)

### 字节输入流 [`InputStream`]([InputStream (Java SE 21 & JDK 21) (oracle.com)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/InputStream.html))

- `public abstract int read()` ：用输入流读取数据的下一个字节（返回的数字，是字节在 ASCII 码表中的映射值）
- `public int read(byte[] b)`：用输入流读取一些字节，并尽可能填满指定的字节数组
- `public void close()`：用于关闭流并释放资源

### 字节输出流 [`OutputStream`]([OutputStream (Java SE 21 & JDK 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/OutputStream.html))

- `public abstract void write(int b)`：将指定的字节，写入输出流

- `public void write(byte[] b)`：将指定字节数组中的每一个字节写入该输出流

- `public void write(byte[] b, int off, int len)`：将指定字节数组中，从下标 `off` 到往后数 `len` 个的字节，写入该输出流

- `public void flush()`：刷新输出流，强制写出缓冲区的字节

- `public void close()`：用于关闭流并释放资源

### 字符输入流 [`Reader`]([Reader (Java SE 21 &amp; JDK 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/Reader.html))

- `public int read()`：从输入流读取一个字符

- `public int read(char[] cbuf)`：从输入流中读取一些字符，并将它们存储到字符数组中

- `public void close()`：用于关闭流并释放资源

### 字符输出流 [`Writer`]([Writer (Java SE 21 &amp; JDK 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/Writer.html))

- `void write(int c)`：写入单个字符

- `void write(char[] cbuf)`：写入字符数组

- `abstract void write(char[] cbuf, int off, int len)`：将字符数组从 `off` 下标开始，往后 `len` 个字符写入

- `void write(String str)` ：写入字符串

- `void write(String str, int off, int len)`：将字符串中从 `off` 下标开始，往后 `len` 个字符写入

- `void flush()`：刷新该流的缓冲

- `void close()`：关闭此流，但要先刷新它

## 基本文件操作流

![](https://s2.loli.net/2024/06/18/L2ZrRj8lxcuv1Ys.png)

#### [`FileInputStream`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/FileInputStream.html)

用于从文件中读取字节，读取方式类似于迭代器。每当调用 `read()` 指针就会后移，直至返回 `-1` 表示已经读取不到字节。

示例如下：

```java
// eg.1 循环读取字节
FileInputStream fis1 = new FileInputStream(new File("foo.txt"int ));
int b;
while ((b = fis1.read()) != -1) {
    Systeam.out.println(b);
}
fis1.close();


// eg.2 使用字节数组读取
FileInputStream fis2 = new FileInputStream("foo.txt");
int len;
byte[] b = new byte[2];
while ((len = fis2.read(b)) != -1) {
    // 将数组变成字符串打印
    Systeam.out.println(new String(b, 0, len));
}
fis2.close();
```

#### [`FileOutputStream`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/FileOutputStream.html)

用于向文件中写出字节，示例如下：

```java
// eg.1 写出单字节
FileOutputStream fos1 = new FileOutputStream(newbyte File("foo.txt"));
fos1.write(97);
fos1.write('b');
fos1.write(99);
fos1.close();
// foo.txt -------------> abc

// eg.2 写出字节数组
FileOutputStream fos2 = new FileOutputStream("bar.txt");
bytes[] b = "harmless".getBytes();
fos2.write(b);
fos2.close();
// bar.txt --------------> harmless

// eg.3 写出字节数组中的一部分
FileOutputStream fos3 = new FileOutputStream(new File("233.txt"));
fos3.write("abcde".getBytes(), 2, 2);
fos3.close();
// 233.txt -----------------> cd
```

当该类实例化后，**会将文件内容清空**。如果想要在由内容的文件里续写，需要在构造函数的第二个参数传入 `true`，表示续写：

```java
// public FileOutputStream(File file, boolean append);
FileOutputStream fos = new FileOutputStream("foo.txt", true);
```

#### [`FileReader`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/FileReader.html)

用于从文件中读取字符。读取方式与字节输入类似，通过 `read()` 后移指针。

另外，有两个需要注意的地方：

- 字符编码：默认字符集为 `UTF-8`，但也可以在构造函数中手动指定字符集。

- 字节缓冲区：内存中默认有 8192 字节数组作为缓冲区。程序优先从缓冲区获取数据，如果没有就从文件获取数据到缓冲区。

```java
// eg.1 从文件（UTF-8）中读取字符
// 无参 read() 方法，返回值为字节解码后的十进制
FileReader fr1 = new FileReader("foo.txt");
int b;
while ((b = fr1.read()) != -1) {
    System.out.println((char)b);
}
fr1.close();

// eg.2 使用字符数组读取
// 有参 read(char[] cbuf) 方法，会在内部解码并强转，最后存入数组的是字符
FileReader fr2 = new FileReader("bar.txt");
int len;
char[] cbuf = new char[2];
while ((len = fr2.read(cbuf)) != -1) {
    System.out.println(new String(cbuf));
}
fr2.close();

// eg.3 从 BGK 编码的文件中读取字符
FileReader fr3 = new FileReader("233.txt", Charset.forName("GBK"));
int b;
while ((b = fr3.read()) != -1) {
    System.out.println((char)b);
}
fr3.close();
```

#### [`FileWriter`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/FileWriter.html)

用于向文件中写入字符。它同样也可以指定字符集进行输出。

```java
// eg.1 向文件中写入字符/字符数组
FileWriter fw1 = new FileWriter("foo.txt");
fw1.write('尼');
fw1.write('古');
fw1.write('丁');
fw1.flush(); // 刷新缓冲区
fw1.write('真');
char[] chars = "芙蓉王源".toCharArray();
fw1.write(chars);
fw1.write(chars, 2, 2);
fw1.close();
// foo.txt ----------------------> 尼古丁真芙蓉王源王源

// eg.2 写入字符串/部分字符串
FileWriter fw2 = new FileWriter("bar.txt");
fw2.write("一把十手");
fw2.write("啊米诺斯一得阁拉米诺斯", 0, 4);
fw2.close();
// bar.txt ----------------------> 一把十手啊米诺斯


// eg.3 指定字符集，续写
FileWriter fw3 = new FileWriter("233.txt", Charset.forName("GBK"), true);
// ...略
```

> 关于字符输出流缓冲区
>
> 向文件写入的字符，不会立即进入文件中，而是会先存储到缓冲区（同样默认为 8192 字符数组）。它会在以下几种情况下写入文件：
>
> 1. 当流关闭时
> 2. 当缓冲区存满时
> 3. 当你手动 `flush()` 刷新时

## IO 异常处理

在发生了异常的情况下，关闭流。

### Before JDK 7

~~折磨~~

```java
FileWriter fw = null;
try {
    fw = new FileWriter("fw.txt");
    fw.write("harmless");
} catch (IOException e) {
    e.printStackTrace();
} finally {
    try {
        if (fw != null) {
            fw.close();
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

### JDK 7

在 try 里创建的资源，会自动释放掉。

```java
try (创建流对象语句，如果多个,使用';'隔开) {
    // 读写数据
} catch (IOException e) {
    e.printStackTrace();
}

try ( FileWriter fw = new FileWriter("fw.txt"); ) {
    fw.write("harmless");
} catch (IOException e) {
    e.printStackTrace();
}
```

### JDK 9

避免 `try` 的括号里面太长，允许在 `try-catch` 外面创建，`try` 的括号里只放引用：\*\*\*\*

```java
// 被final修饰的对象
final Resource resource1 = new Resource("resource1");
// 普通对象
Resource resource2 = new Resource("resource2");

// 引入方式：直接引入
try (resource1; resource2) {
    // 使用对象
}
```

## 缓冲流 Buffered

![](https://s2.loli.net/2024/06/19/BHdltDwXJNKFSyT.png)

缓冲流的作用，就是为各种流提供缓冲区，减少 IO 次数，提升读写效率。

- 字节缓冲流

  - [BufferedInputStream ](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/BufferedInputStream.html) - `InputStream`
  - [BufferedOutputStream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/BufferedOutputStream.html) - `OutputStream`

- 字符缓冲流

  - [BufferedWriter](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/BufferedWriter.html) - `Writer`
  - [BufferedReader](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/BufferedReader.html) - `Reader`

缓冲流共四种，它们一一对应四种 IO 顶级抽象类，可以将其视为对基本流的包装。

缓冲流的使用与基本流基本一致，需要记得的是，字符缓冲流有两个比较好用的方法：`newLine()` 和 `readLine()`。

```java
BufferedInputStream bis = new BufferedInputStream(new FileInputStream("foo.txt"));
bis.close();

BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("bar.txt"));
bos.close();

BufferedReader br = new BufferedReader(new FileReader("aaa.txt"));
br.readLine();
br.close();

BufferedWriter bw = new BufferedWriter(new BufferedWriter("bbb.txt"));
bw.newLine();
bw.close();
```

## 转换流

![](https://s2.loli.net/2024/06/19/rtaLC4gymwd7W2A.png)

与缓冲流类似，转换流也是通过包装基本字节流类型 `InputStream` 和 `OutputStream` 来增强。它是将**字节流转换为字符流**的桥梁。

- 字节转换流

  - [InputStreamReader](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/InputStreamReader.html)：将 `InputStream` 包装为 `Reader`
  - [OutputStreamWriter](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/OutputStreamWriter.html)：将 `OutputStream` 包装为 `Writer`

转换流具有字符流的基本特性。

`read()` 及 `write()` 读写的基本单位不再是字节，而变成了字符。

> 虽然 `read()` 返回都是 int 类型，但是含义不同。转换流的 int 是字节在字符集中编码的十进制。

并且转换流可以在构造时指定字符集，以及使用字符流才有的特殊方法 `readLine()` 及 `newLine()`。

```java
// 转换流声明字符集，可以像字符流一样使用 Charset.forName()，也可以直接使用字符集名称字符串

InputStreamReader isr = new InputStreamReader(new FileInputStream("foo.txt"), "UTF-8");
int i = isr.read();
System.out.println((char)i); // 这是字符
String line = isr.readLine();
isr.close();

OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("bar.txt"), "GBK");
osw.write("咿唔".toCharArray());
osw.newLine();
osw.close();
```

## 序列化流（对象操作输出流）

![](https://s2.loli.net/2024/06/28/uLWQRZ6MoTqFd9l.png)

序列化：将对象的信息（数据、属性、类型等），通过某种特定的方式，转换为*字节序列*（所以叫做“序列化”）。序列化后的信息就可以存入文件中，实现*持久化*。

简而言之：**将 JAVA 中的对象写出到文件中**。

使用序列化流，需要包装基本字节流类型：`InputStream` 和 `OutputStream`。

- （字节）序列化流

  - [`ObjectInputStream`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/ObjectInputStream.html)
  - [`ObjectOutputStream`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/ObjectOutputStream.html)

#### 序列化之前的细节

一个对象要想序列化，需满足两个条件:

1. 该类是可序列化的
2. 该类的属性，不能全部都为瞬态属性（实际上，全部为瞬态属性也能成功序列化，只是这样没有意义）

##### `Serializable`（可序列化）

要标记类是一个可序列化的类，必须去实现 `Serializable` 接口。
`Serializable` 接口内不包含任何属性及方法，是一个**标记接口**。

```java
class Student implements Serializable {
    // ...
}
```

不实现此接口的类将不会使任何状态序列化或反序列化，会抛出 `NotSerializableException` 。

##### `transient` （瞬态）

如果不想让一个属性被序列化，需要标注它为瞬态属性，使用 `transient` 关键字修饰。

```java
class Student implements Serializable {
    public transient int age;
}
```

#### ObjectOutputStream

写出对象到文件使用 `writeObject()` 方法。

```java
Student s = new Student("张三", 18, "中国");

ObjectOuputStream oos = new ObjectOutputStream(new FileOutputStream("foo.txt"));
oos.writeObject(s);
oos.close();
```

> 如果你需要将多个对象序列化后存到文件，可以用集合存储。集合实现了 `Serializable` 接口。

#### ObjectInputStream

从文件写入对象，使用 `readObject()` 方法。

```java
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("foo.txt"));
Student s = (Student) ois.readObject();
System.out.println(s);
// >> Student{name = 张三, age = 18, national = 中国}

ois.close();
```

#### 一致性

设想这样一个场景：你将一个对象存入了文件。但是后续需求变更，你对那个类做出了调整，比如增加了参数什么的。

那么从文件取出的对象（旧类），和现在你修改过的类（新类），能够对应上吗？

答案是：不能。

`Serializable` 会为类计算一个 `serialVersionUID`，用来标记类的版本。当你修改了类，它的版本 id 随之发生了变化。

存入文件的对象的版本 id 和类新的版本 id 无法对应时，JAVA 即认为它们不是同一个类。

**解决办法：手动去指定类的版本 id，使其保持不变**。

```java
class Student implements Serializable {
    @Serial
    private static final long serialVersionUID = 114514L;
    // ...more other
}
```

## 打印流

![](https://s2.loli.net/2024/06/28/HepubmdtPrFh1vE.jpg)

顾名思义，打印流用来打印格式化的文本，并且支持各种数据类型（基本数据类型和对象都可以）。适合用来调试或打印日志。

两种打印流都是输入流：

- [PrintStream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/PrintStream.html)：基于字节流，没有 `IOException`
- [PrintWriter](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/PrintWriter.html)：基于字符流，有 `IOException`

它们都有 `print()`，`printf()` 及 `println()` 方法。构造函数可以直接使用 `File` 或文件路径，也可以传入输出流对象。

```java
// PrintStream
PrintStream ps1 = new PrintStream(new File("foo1.txt"));
PrintStream ps2 = new PrintStream(new FileOutputStream("foo2.txt"));

// PrintWriter
PrintWriter pw1 = new PrintWriter("bar1.txt");
PrintWriter pw2 = new PrintWriter(new FileOutputStream("bar2.txt"));
PrintWriter pw3 = new PrintWriter(new FileWriter("bar3.txt"));
```

最经常用的 `System.out` 实际上就是返回了一个 `PrintStream` 对象，只是它默认输出到控制台。

我们可以使用 `System.setOut()` 来修改默认的打印流对象，从而改变打印的流向：

```java
// 创建打印流,指定文件的名称
PrintStream ps = new PrintStream("ps.txt");

// 设置系统的打印流流向,输出到ps.txt
System.setOut(ps);
// 调用系统的打印流,ps.txt中输出97
System.out.println(97);
```

## 压缩流

从 `zip` 压缩文件中，读出和写入的流。

- [ZipInputStream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/zip/ZipInputStream.html)：递归读取 zip 文件，返回 `ZipEntry` 对象。可用于解压缩包。

- [ZipOutputStream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/zip/ZipOutputStream.html)：可以使用 `putNextEntry()` 向 zip 文件中写入 `ZipEntry` 对象。可用于压缩 zip 包。

`getNextEntry()` 和 `putNextEntry()` 有类似迭代器的机制，会返回当前处理的文件 / 文件夹。

在对单个 entry 进行处理后，再使用 `closeEntry()` 关闭 entry，告诉压缩流移动指针到下一个文件。

完整解压压缩示例不写了，日常感觉很难用到。

## Properties

准确来说这个属于集合 Collection 的知识，不过这个类与 io 关系密切。

[Properties](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Properties.html) 是 Java 中用于处理配置文件的工具类，它继承自 `Hashtable` 类，实现了 `Map` 接口。

可以用这个类生成 `.properties` 为拓展名的配置文件，其中每一行代表一个属性或配置项。

例一：获取配置文件的属性

使用 `load()` 方法来读取输入流，可以是 `InputStream` 也可以是 `Reader`。

```java
Properties properties = new Properties();
try (InputStream input = new FileInputStream("config.properties")) {
    // 从输入流中读取属性列表
    properties.load(input);

    // 获取属性值
    String value = properties.getProperty("key");
    System.out.println(value);

    // 获取属性值，若不存在则使用默认值
    String value2 = properties.getProperty("nonexistentKey", "default");
    System.out.println(value2);
} catch (IOException e) {
    e.printStackTrace();
}
```

例二：写出配置

使用 `store()` 来写出输出流，可以是 `OutputStream` 也可以是 `Writer`。

```java
Properties properties = new Properties();
properties.setProperty("foo", "bar");
properties.setProperty("foo2", "bar2");

try (Writer writer = new FileWriter("output.properties")) {
    // 将属性写出到字符输出流
    properties.store(write, "Comments for the output file");
} catch(Exception e) {
    e.printStackTrace();
}
```
