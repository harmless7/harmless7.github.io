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

## 请求控制器类

使用 [@RestController](https://docs.spring.io/spring-framework/docs/6.2.x/javadoc-api/org/springframework/web/bind/annotation/RestController.html) 注释，可以将一个控制器类定义为*请求控制器类*。

特性：

- 将返回值直接写入 HTTP 响应体
- 如果返回值是对象或集合，则自动转为 json 格式
- `@RestController` = `@Controller` + `@ResponseBody`

## 请求控制器方法

### 获取请求报文信息

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

### 构建响应报文信息

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

## refer

[Spring 官网](https://spring.io/)

[Spring Boot](https://docs.spring.io/spring-boot/index.html)

[黑马程序员 - JAVA Web：Spring Boot](https://www.bilibili.com/video/BV1yGydYEE3H?vd_source=cbb9bae25f5ac9e51f8ff965eb794230&spm_id_from=333.788.player.switch&p=41)

[Interface HttpServletRequest](https://jakarta.ee/specifications/servlet/6.0/apidocs/jakarta.servlet/jakarta/servlet/http/httpservletrequest)
