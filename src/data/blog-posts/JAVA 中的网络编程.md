---
title: "JAVA 中的网络编程"
publishDate: "2024-10-12 17:23:37"
description: "关于一些计算机网络中的基础知识，"
tags: ["JAVA", "网络"]
---

## 计算机网络基础

### 软件架构

- C/S：Client / Server （客户端 / 服务器）
- B/S：Browser / Server （浏览器 / 服务器）

### 网络编程三要素

- IP：设备在网络中的唯一标识
- 端口：程序在设备中的唯一标识
- 协议：数据在网络中传输的规则

#### IP（Internet Protocal）

- ipv4：32 位二进制，8 位一组，共 4 组，点分十进制（xxx.xxx.xxx.xxx）
- ipv6：128 位二进制，16 位一组，共 8 组，冒分十六进制（xxx:xxx:xxx:xxx:xxx:xxx:xxx:xxx）

##### IPv4

回环地址（本机地址）：127.0.0.1

```md
127.0.0.1
01111111 00000000 00000000 00000001
```

私网 IP：192.168.x.x

```md
192.168.x.x
11000000 10101000 xxxxxxxx xxxxxxxx
```

组播地址：224.0.0.0 ~ 239.255.255.255

> 其中 224.0.0.0 ~ 224.0.0.255 为预留的组播地址

```md
224.0.0.0
11100000 00000000 00000000 00000000

224.255.255.255
11100000 11111111 11111111 11111111

224.0.0.255
11100000 00000000 00000000 11111111
```

广播地址：255.255.255.255

```md
255.255.255.255
11111111 11111111 11111111 11111111
```

#### 端口

取值范围 0 ~ 65535，但是 0 ~ 1023 往往被一些知名软件使用。

我们自己的使用 1024 后面的端口。

#### 协议

##### UDP

面向无连接，不可靠，高效率。

##### TCP

面向连接，可靠，低效率。

## 管理 ip 地址的类：InetAddress

即 Internet Address，文档：[java.net.InetAddress](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/InetAddress.html)

创建不能 `new` 来实例化，需要调用静态方法：

```java
InetAddress in = InetAddress.getByName("192.168.1.100");
// 也可以使用主机名：getByName("my-computer-name");
```

## 使用 UDP

需要使用到的类：

- 发送 / 接受器：

  - 单播：[`DatagramSocket`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramSocket.html)
  - 组播 / 广播：[`MulticastSocket`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/MulticastSocket.html)

- 数据包：[`DatagramPacket`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramPacket.html)

### UDP 发送数据

🔴 重要方法：

- [`public void send(DatagramPacket p)`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramSocket.html#send(java.net.DatagramPacket)>)

单播例子：

```java
// 1. 创建发送器
DatagramSocket ds = new DatagramSocket();

// 2. 创建数据包
// 发送数据：只支持字节数组
String str = "mostly harmless";
byte[] bytes = str.getBytes();
// 发送目标：使用 InetAddress 类
InetAddress address = InetAddress.getByName("127.0.0.1");
int port = 4396;
DatagramPacket dp = new DatagramPacket(bytes, bytes.length, address, port);

// 3. 发送
ds.send(dp);

// 4. 释放资源
ds.close();
```

组播 / 广播例子：

```java
// 1. 创建发射器
MulticaseSocket ms = new MulticaseSocket();

// 2. 创建数据包
String str = "mostly harmless";
byte[] bytes = str.getBytes();
InetAddress address = InetAddress.getByName("224.0.0.1"); // 这里得用组播地址，广播则 255.255.255.255
int port = 4396;
DatagramPacket dp = new DatagramPacket(bytes, bytes.length, address, part);

// 3. 发送
ms.send(dp);

// 4. 释放
ms.close();
```

### UDP 接受数据

🔴 重要方法：

- [`public void receive(DatagramPacket p)`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramSocket.html#receive(java.net.DatagramPacket)>)
- [`public byte[] getData()`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramPacket.html#getData()>)
- [`public byte[] getLength()`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramPacket.html#getLength()>)
- [`public byte[] getAddress()`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramPacket.html#getAddress()>)
- [`public byte[] getPort()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramPacket.html#getLengthgetPort))

单播例子：

```java
// 1. 创建接收器（注意要填端口）
DatagramSocket ds = new DatagramSocket(4396);

// 2. 创建数据包
// 创建一个容器来放数据
byte[] bytes = new byte[1024];
DatagramPacket dp = new DatagramPacket(bytes, bytes.length);
ds.receive(dp);

// 3. 解析数据包
byte[] data = dp.getData();
int len = dp.getLength();
InetAddress address = dp.getAddress();
int port = dp.getPort();

System.out.println("receive data:" + new String(data, 0, length));
System.out.println("receive data from:" + address + ":" + port);

// 4. 释放资源
ds.close();
```

组播 / 广播例子：

```java
// 1. 创建接收器（注意要填端口）
MulticaseSocket ms = new MulticaseSocket(4396);

// 2. 将当前本机添加到 224.0.0.1 这一组分组当中
InetAddress address = InetAddresss.getByName("224.0.0.1"); // 这里得用组播地址，广播则 255.255.255.255
ms.joinGroup(address);

// 2. 创建数据包
// 创建一个容器来放数据
byte[] bytes = new byte[1024];
DatagramPacket dp = new DatagramPacket(bytes, bytes.length);
ms.receive(dp);

// 3. 解析数据包
byte[] data = dp.getData();
int len = dp.getLength();
InetAddress address = dp.getAddress();
int port = dp.getPort();

System.out.println("receive data:" + new String(data, 0, length));
System.out.println("receive data from:" + address + ":" + port);

// 4. 释放资源
ms.close();
```

## 使用 TCP

需要使用到的类：

- 服务端：[`Socket`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/Socket.html)
- 接收端：[`ServerSocket`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/ServerSocket.html)

### 客户端

1. 创建客户端 Socket 对象与指定服务端连接

   `Socket(String host, int port)`

2. 获取*输出流*，写数据

   `OutputStream getOutputStream()`

3. 释放资源

   `void close()`

例：

```java
// 1. 创建 Socket
Socket socket = new Socket("127.0.0.1", 10000);

// 2. 从通道中获取输出流
OutputStream os = socket.getOutputStream();
os.write("你好".getBytes());

// 3. 释放
socket.close(); // 会自动关闭内部的流
```

> 需要先运行服务端，否则 socket 会报错

### 服务端

1. 创建服务端 ServerSocket 对象

   `ServerSocket(int port)`

2. 监听客户端连接，返回一个 Socket 对象

   `Scoket accept()`

3. 获取*输入流*，读数据，并把数据显示在控制台

   `InputStream getInputStream()`

4. 释放资源

   `void close()`

```java
// 1. 创建 Server Socket
ServerSocket ss = new ServerSocket(10000);

// 2. 监听客户端连接
Socket socket = ss.accept();

// 3. 从通道获取输入流
InputStream is = socket.getInputStream();
InputStreamReader isr = new InputStreamReader(is); // 转换流，防止中文乱码
BufferedReader br = new BufferedReader(isr); // 缓冲流，提高读取效率
int b;
while ((b = br.read()) != -1) {
  System.out.print((char) b);
}

// 4. 释放资源
socket.close(); // 会自动关闭内部的流
ss.close();
```

### 一些其他细节

客户端写出结束标记：
[shutdownOutput()](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/Socket.html#shutdownOutput())

<!-- [shutdownInput()](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/Socket.html#shutdownInput()) -->