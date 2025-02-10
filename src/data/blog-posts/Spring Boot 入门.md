---
title: "Spring boot 入门"
description: "进行一个‘春天引导’的学习"
publishDate: "2025-02-07"
---

## intro

[Spring 官网](https://spring.io/)

Spring Boot 是 Spring 家族中的一个子项目。（[所有 Spring 项目](https://spring.io/projects)）

它基于 Spring Framework，并对其进行了抽象，添加了自动化配置。算是对后者的简化，使其更简单、易于上手。

## quick start

1. 创建一个 spring boot 项目

   ![spring_boot_create](https://s2.loli.net/2025/02/07/gB47iLjs2aeH96t.jpg)

   ![spring_boot_create_2](https://s2.loli.net/2025/02/07/lSAqL4wejvx8ank.jpg)

   > 上图中的的服务器 URL: [start.spring.io](https://start.spring.io) 是 spring 官方的脚手架提供网站
   >
   > 如果连接不上，可以使用阿里云的 [start.aliyun.com](https://start.aliyun.com/) 进行替换

   可以发现勾选 `Spring Web` 后，脚手架自动引入了两个依赖：

   - spring-boot-starter-web：包含了 web 开发所需的常见依赖（其中集成了 tomcat，所以能直接运行）
   - spring-boot-starter-test：包含了单元测试所需的常见依赖

   这类以 `spring-boot-starter-*` 为前缀命名的依赖，在 spring 中被叫做起步依赖。所有官方的起步依赖可以在[这里](https://docs.spring.io/spring-boot/docs/3.1.3/reference/htmlsingle/#using.build-systems.starters)查看。

2. 编写一个基础的请求控制器类

   ```java
   package org.example.learnspringboot;

   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RestController;

   @RestController
   public class HelloController {
       @RequestMapping("/hello")
       public String hello(String name) {
           System.out.println("你好！" + name + "！");
           return "你好！" + name + "！";
       }
   }
   ```

   - `@RestController` 标识当前类为*请求控制器类*
   - `@RequestMapping("/xxx")` 将 `/xxx` 的路由请求映射到当前 方法/类 上，路由中的 `query` 参数将作为方法传参

   [Spring Boot - @MappingRequest](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html#mvc-ann-requestmapping-annotation)

3. 浏览器访问 `http://localhost:8080/hello?name=harmless` 即可看到打印

   ```txt
   你好！harmless！
   ```

### 请求控制器类

使用 [@RestController](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/web/bind/annotation/RestController.html) 注释，可以将一个控制器类定义为*请求控制器类*。

特性：

- 将返回值直接写入 HTTP 响应体
- 如果返回值是对象或集合，则自动转为 json 格式
- `@RestController` = `@Controller` + `@ResponseBody`

### 请求控制器方法

#### 获取请求报文信息

首先在方法上使用 `@RequestMapping` 可以将请求映射到控制器方法。

方法传参可以获取 [`HttpServletRequest`](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServletResponse.html) 对象，内含所有请求报文信息：

```java
@RequestMapping("/demo")
public void demo(HttpServletRequest req) {
    // 获取请求方法
    String method = req.getMethod();

    // 获取请求头
    String contentType = req.getHeader("Content-type");

    // 获取请求路径
    String url = req.getRequestURL();

    // 获取请求传参
    String name = req.getParameter("name");
}
```

#### 构建响应报文信息

1. 使用 [`HttpServletResponse`](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServletResponse.html) 构建响应报文

    ```java
    public void demo(HttpServletRequest req, HttpServletResponse resp) {
        resp.getWriter().write("Hello World!"); // 需要用流输出
    }
    ```

2. 方法直接返回（依赖于 `@RequestMapping`，只能在 Spring 中使用）

    ```java
    public ArrayList<User> demo() {
        return new ArrayList<>(
            Arrays.asList(
                new User(1, "张三"),
                new User(2, "李四")
            )
        );
    }
    ```

    返回对象或集合会自动转换为 JSON 数据。

## 三层架构

CSD 即 Controller - Service - DAO(Data access objects)。

![CSD](https://s2.loli.net/2025/02/10/VeqFo6GxPKXzkCr.jpg)

使用三层模型拆分的目录结构：

```bash
project-root/
│── src/
│   ├── main/
│   │   ├── java/net/harmless/
│   │   │   ├── controller/   # 表现层
│   │   │   │   ├── UserController.java
│   │   │   ├── service/      # 业务逻辑层
│   │   │   │   ├── UserService.java
│   │   │   │   ├── impl/     # 业务逻辑层实现
│   │   │   │   │   ├── UserServiceImpl.java
│   │   │   ├── dao/          # 数据访问层
│   │   │   │   ├── UserDao.java
│   │   │   │   ├── impl/     # 数据访问层实现
│   │   │   │   │   ├── UserDaoImpl.java
│   │   │   ├── pojo/        # 实体类（plain ordinary java object）
│   │   │   │   ├── User.java
│   │   │   ├── MainApplication.java # 主应用入口
│── pom.xml  # Maven 依赖（如果使用 Maven）
```

![csd-1](https://s2.loli.net/2025/02/10/wsfgVHvGby9oac1.jpg)

代码示例如下：

**表现层：**

```java
package net.harmless.controller;

import net.harmless.pojo.User;
import net.harmless.service.impl.UserServiceImpl;
import net.harmless.service.UserService;
import java.util.List;

public class UserController {
    private final UserService userService = new UserServiceImpl();

    public void getAllUsers() {
        List<User> users = userService.getAllUsers();
        users.forEach(user -> System.out.println(user.getName()));
    }
}
```

**业务逻辑层：**

```java
package net.harmless.service;

import net.harmless.dao.UserDao;
import net.harmless.dao.impl.UserDaoImpl;
import net.harmless.pojo.User;
import java.util.List;

public class UserServiceImpl implements UserService {
    private final UserDao userDao = new UserDaoImpl();

    @Override
    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }
}
```

```java
package net.harmless.service;

import net.harmless.pojo.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
}

```

**数据访问层：**

```java
package net.harmless.dao;

import net.harmless.pojo.User;
import java.util.Arrays;
import java.util.List;

public class UserDaoImpl implements UserDao {
    @Override
    public List<User> getAllUsers() {
        return Arrays.asList(
            new User(1, "Alice"),
            new User(2, "Bob")
        );
    }
}
```

```java
package net.harmless.dao;

import net.harmless.pojo.User;
import java.util.List;

public interface UserDao {
    List<User> getAllUsers();
}
```

## 控制翻转 & 依赖注入

### IoC & DI 基础概念

三层架构结构清晰，但是会有耦合问题：实例化下一层对象，与本层功能耦合。

举个例子，如果替换数据层，那么服务层也需要调整实例化代码：

![csd-2](https://s2.loli.net/2025/02/10/MzDXNwFuLQhW3sy.jpg)

IoC（Inversion of Control） 控制翻转 能够解决这个问题：

![csd-3](https://s2.loli.net/2025/02/10/4CIp13KluLxtW5Y.jpg)

不在各层直接控制下一层对象，将这个控制权抽离给 IoC 容器来执行。（图中半透明虚线）

然后将容器中的实例，按需要注入给各层。即为 DI（Dependency Injection）依赖注入。（图中实体虚线）

### 在 Spring 中的实现

沿用上面 User 的例子。要将各实现类控制翻转，只需使用 `@Component` 注解：

```java
@Component
class UserServiceImpl implements UserService {
    // ...
}
```

```java
@Component
class UserDaoImpl implements UserDao {
    // ...
}
```

然后需要依赖注入时，只需要对使用处的对象添加 `@Autowired` 注解：

```java
class UserController {
    // 不要直接实例化
    // private final UserService userService = new UserServiceImpl();

    @Autowired
    private final UserService userService;

    public void getAllUsers() {
        List<User> users = userService.getAllUsers();
    }
}
```

```java
@Component
public class UserServiceImpl implements UserService {
    // 不要直接实例化
    // private final UserDao userDao = new UserDaoImpl();

    @Autowired
    private final UserDao userDao;

    @Override
    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }
}
```

## refer

[Spring 官网](https://spring.io/)

[Spring Boot](https://docs.spring.io/spring-boot/index.html)

[黑马程序员 - JAVA Web：Spring Boot](https://www.bilibili.com/video/BV1yGydYEE3H?vd_source=cbb9bae25f5ac9e51f8ff965eb794230&spm_id_from=333.788.player.switch&p=41)

[Interface HttpServletRequest](https://jakarta.ee/specifications/servlet/6.0/apidocs/jakarta.servlet/jakarta/servlet/http/httpservletrequest)

[百度百科 - 控制反转](https://baike.baidu.com/item/%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC/1158025)

[百度百科 - 依赖注入](https://baike.baidu.com/item/%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5?fromModule=lemma_search-box)
