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

127.0.0.1：回环地址（本机地址）

```md
127.0.0.1
01111111 00000000 00000000 00000001
```

192.168.x.x：私网 IP，

```md
192.168.x.x
11000000 10101000 xxxxxxxx xxxxxxxx
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

需要两个类：

- 发送 / 接受器：[`DatagramSocket`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramSocket.html)

- 数据包：[`DatagramPacket`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramPacket.html)

### UDP 发送数据

🔴 重要方法：

- [`public void send(DatagramPacket p)`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramSocket.html#send(java.net.DatagramPacket)>)

```java
// 创建发送器
DatagramSocket ds = new DatagramSocket();

// 创建数据包
// 发送数据：只支持字节数组
String str = "mostly harmless";
byte[] bytes = str.getBytes();
// 发送目标：使用 InetAddress 类
InetAddress address = InetAddress.getByName("127.0.0.1");
int port = 4396;
DatagramPacket dp = new DatagramPacket(bytes, bytes.length, address, port);

// 发送
ds.send(dp);

// 释放资源
ds.close();
```

### UDP 接受数据

🔴 重要方法：

- [`public void receive(DatagramPacket p)`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramSocket.html#receive(java.net.DatagramPacket)>)
- [`public byte[] getData()`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramPacket.html#getData()>)
- [`public byte[] getLength()`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramPacket.html#getLength()>)
- [`public byte[] getAddress()`](<https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramPacket.html#getAddress()>)
- [`public byte[] getPort()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/DatagramPacket.html#getLengthgetPort))

```java
// 创建接收器（注意要填端口）
DatagramSocket ds = new DatagramSocket(4396);

// 创建数据包
// 创建一个容器来放数据
byte[] bytes = new byte[1024];
DatagramPacket dp = new DatagramPacket(bytes, bytes.length);
ds.receive(dp);

// 解析数据包
byte[] data = dp.getData();
int len = dp.getLength();
InetAddress address = dp.getAddress();
int port = dp.getPort();

System.out.println("receive data:" + new String(data, 0, length));
System.out.println("receive data from:" + address + ":" + port);

// 释放资源
ds.close();
```
