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

##### 查询参数获取

1. 使用 `HttpServletRequest` 获取请求对象

   方法传参可以获取 [`HttpServletRequest`](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServletResponse.html) 对象，内含所有请求报文信息：

   ```java
   // DELETE /depts?id=1
   @DeleteMapping("/depts")
   public void delete(HttpServletRequest req) {
       // 获取请求方法
       String method = req.getMethod();

       // 获取请求头
       String contentType = req.getHeader("Content-type");

       // 获取请求路径
       String url = req.getRequestURL();

       // 获取请求传参
       String idStr = req.getParameter("id");
       Integer id = Integer.valueOf(idStr);
   }
   ```

2. 使用 `@RequestParam` 注解（推荐）

   ```java
   // DELETE /depts?id=1
   @DeleteMapping("/depts")
   public void delete(@RequestParam("id") Integer id) {
       System.out.println(id);
   }
   ```

   > 添加了 @RequestParam 注解，该参数在请求时必填。若不传会 400 报错

   `@RequestParam` 的一些配置：

   - `@RequestParam(required = false)` 使得参数非必填
   - `@RequestParam(defaultValue = '1')` 未传入时的默认值

   `@DateTimeFormat` 注解可以用来指定日期时间格式：

   ```java
   public void demo(@DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endEntryDate) {}
   ```

3. 如果请求参数名和形参名相同，则可省略 `@RequestParam` （推荐，2 的特殊情况）

   ```java
   // DELETE /depts?id=1
   @DeleteMapping("/depts")
   public void delete(Integer id) {
       System.out.println(id);
   }
   ```

##### 路径参数获取

使用 `@PathVariable` 注释来获取路径参数

```java
// 形参名与路径参数不同名的情况
@GetMapping("/users/{id}")
public Result getUserById(@PathVariable("id") Integer deptId) {
    User user = userService.findById(deptId);
    return user != null ? Result.success(user) : Result.error("未找到对应记录");
}

// 当形参名与路径参数同名，可以不写注解括号内容
@GetMapping("/users/{id}")
public Result getUserById(@PathVariable Integer id) {
    User user = userService.findById(id);
    return user != null ? Result.success(user) : Result.error("未找到对应记录");
}
```

##### application/json 传参

使用一个对象直接获取参数，前提条件：

- 请求头包含 Content-Type: application/json。
- 对象类有与 JSON 字段对应的 getter/setter。

```java
// 假设请求传参：{ name: '张三' }
@PostMapping("/create")
public Result createUser(@RequestBody User user) {
    // 将 JSON 自动反序列化为 User 对象
    return Result.success(user.getUsername());
}
```

#### 构建响应报文信息

1. 使用 [`HttpServletResponse`](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServletResponse.html) 构建响应报文

   ```java
   @RequestMapping("/demo")
   public void demo(HttpServletRequest req, HttpServletResponse resp) {
       resp.getWriter().write("Hello World!"); // 需要用流输出
   }
   ```

2. 方法直接返回

   ```java
   @RequestMapping("/demo")
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

**控制器层 / 表现层：**

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

**持久层 / 数据访问层：**

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

IoC（Inversion of Control） 控制反转 能够解决这个问题：

![csd-3](https://s2.loli.net/2025/02/10/4CIp13KluLxtW5Y.jpg)

不在各层直接控制下一层对象，将这个控制权抽离给 IoC 容器来执行。（图中半透明虚线）

然后将容器中的实例，按需要注入给各层。即为 DI（Dependency Injection）依赖注入。（图中实体虚线）

### 在 Spring 中的实现

#### @Component

沿用上面 User 的例子。要将各实现类控制翻转，只需使用 `@Component` 注解：

```java
@Component // 或 @Service
class UserServiceImpl implements UserService {
    // ...
}
```

```java
@Component // 或 @Repository
class UserDaoImpl implements UserDao {
    // ...
}
```

除了 `@Compoent` 注解，还有几个衍生注解能更好地表述标注类属于哪个层级：

| Ioc 注解      | 说明                     | 位置                                                    |
| ------------- | ------------------------ | ------------------------------------------------------- |
| `@Component`  | 声明 bean 对象的基础注解 | 类不属于三层模型中时使用                                |
| `@Controller` | `@Component` 的衍生注解  | 标注在表现层（控制类层）上，已被 `@RestController` 包含 |
| `@Service`    | `@Component` 的衍生注解  | 标注在服务层（业务逻辑层）上                            |
| `@Repository` | `@Component` 的衍生注解  | 标注在数据访问层上（由于和 mabatis 整合，用得少）       |

被标注的类在 SpringBoot 中就会自动实例化 _bean 对象_，放入容器中管理。

bean 对象的命名，默认为类名的小驼峰写法。如果要自定义可以使用 `@Component("beanObjName")` 来定义。

> 需注意。并非使用了上述注解就一定会自动实例化。
>
> 自动实例化 bean 对象，依赖于 `@ScanComponent` 注解对类注解进行扫描。
>
> SpringBoot 中不用手动扫描，是因为启动类中的 `@SpringBootApplication` 已经默认包含，会去**扫描启动类所在包及其子包**。

#### @Autowired

可以使用 `@Autowired` 注解完成对 bean 对象的依赖注入。

常见方式有三：

1. 属性注入：

   ```java
   class UserController {
       @Autowired
       private final UserService userService;
   }
   ```

   - 隐藏了类之间的依赖关系
   - 可能会破坏类的封装性

2. 构造函数注入（推荐）：

   ```java
   class UserController {
       private final UserService userService;

       @Autowired // 只有这个构造函数时，注解可省略
       public UserController(UserService userService) {
           this.userService = userService;
       }
   }
   ```

   - 较繁琐

3. setter 注入：

   ```java
   class UserController {
       private final UserService userService;

       @Autowired
       public void setUserService(UserService userService) {
           this.userService = userService;
       }
   }
   ```

#### bean 对象类型重复问题

`@Autowired` 会根据 bean **对象的类型**，自动识别该注入哪个对象。但是当有重复类型的 bean 对象时就会报错。

一般有三种解决方法：

1. 设置控制反转类的优先级 `@Primary`

   ```java
   @Primary // 该类会优先生成 bean 对象
   @Service
   public class UserServiceImpl implements UserService {
       // ...
   }
   ```

2. 使用 `@Autowired` + `@Qualifier` 注明要注入的 bean 对象名

   ```java
   @RestController
   public class UserController {
       @Autowired
       @Qualifier("userControllerImpl");
       private final UserService userService;
   }
   ```

3. 使用 `@Resource` 注明要注入的 bean 对象名

   ```java
   @RestController
   public class UserController {
       @Resource(name = "userControllerImpl");
       private final UserService userService;
   }
   ```

> @Resource 和 @Autowired 都可以依赖注入，但有区别：
>
> @Resource：JavaEE 标准，按名称注入
>
> @Autowired：Spring 标准，按类型注入

## 配置文件

可以用的配置方式：

- properties

  `src/main/resources/application.properties`

  ```bash
  spring.datasource.driver-class-name=com.mysql.jdbc.Driver
  spring.datasource.url=jdbc:mysql://localhost:3306/web01
  spring.datasource.username=root
  spring.datasource.password=123456
  ```

- yaml / yml（更简洁，推荐）

  `src/main/resources/application.yml`

  ```yml
  spring:
    datasource:
      driver-class-name: com.mysql.jdbc.Driver
      url: jdbc:mysql://localhost:3306/web01
      username: root
      password: 123456
  ```

  - 数值前必须有空格
  - 不能用 tab，缩进必须空格（数量不规定）
  - 注释使用 `#`

关于 yml 的一些语法：

```yml
# 对象 / Map
user:
  name: Tom
  age: 18
  gender: 男

# 数组 / List / Set
colors:
  - red
  - green
  - blue

# 0123
number: '0123'

# 八进制的 123
number: 0123
```

## 分页查询插件 PageHelper

[mvn - pagehelper-spring-boot-starter](https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper-spring-boot-starter)

1. 引入依赖

   ```xml
   <!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper-spring-boot-starter -->
   <dependency>
       <groupId>com.github.pagehelper</groupId>
       <artifactId>pagehelper-spring-boot-starter</artifactId>
       <version>2.1.0</version>
   </dependency>
   ```

2. 定义 Mapper 接口的查询方法（无需考虑分页）

3. 在 Service 方法中实现分页查询

   ```java
   @Override
   public PageResult<Emp> page(Integer page, Integer pageSize) {
       // 设置分页参数
       PageHelper.startPage(page, pageSize);
       // 查询（必须紧接着设置分页参数）
       List<Emp> rows = this.empMapper.list();
       // 解析查询结果
       Page<Emp> p = (Page<Emp>) rows;
       return new PageResult<Emp>(p.getTotal(), p.getResult());
   }
   ```

很神奇，问了下 gpt 它的相关原理：

1. PageHelper 的分页原理
   会通过 MyBatis 的拦截器机制修改 SQL 查询，在 SQL 中动态添加 LIMIT 或类似的分页条件。

2. 为什么能转换为 `Page<Emp>`
   实际上，在 Mapper 返回的已经是一个 Page 对象了，只是你往往定义为 List。所以需要在逻辑层再强转一下。

Page 对象实现了 List 接口，但扩展了更多分页相关的方法，因此可以直接转换为 `Page<Emp>` 对象。

> 使用 PageHelper，SQL 语句结尾不能加分号

## 事务处理

sql 语句写法：

```sql
-- 开启事务
START TRANSACTION;

-- 操作
-- ...

-- 提交事务
COMMIT;

-- 回滚
ROLLBACK;
```

Spring 事务管理：

`@Transactional` 注解，可以将当前方法交给 spring 进行事务管理。

应当放置在业务层（service）的方法/类/接口上：

方法（推荐）：

```java
@Transactional
@Override
public void save(Emp emp) {
    // 1. 保存员工
    empMapper.insert(emp);
    int i = 1 / 0;

    // 2. 保存工作经历
    Integer empId = emp.getId();
    List<EmpExpr> exprList = emp
}
```

类：

```java
// 整个类都实行事务控制
@Transactional
@Service
public class EmpServiceImpl implements EmpService {}
```

接口：

```java
// 所有实现类都实行事务控制
@Transactional
public interface EmpService {}
```

### `rollbackFor` - 扩展回滚条件

`@Transactional` 默认出现 `RuntimeException`（运行时异常） 才会进行回滚。

如果要指定其它异常情况也回滚，可以使用 `rollbackFor` 属性：

```java
@Transactional(rollbackFor = {Exception.class}) // 所有异常都会回滚
@Override
public void save(Emp emp) {
    // ...
}
```

### `propagation` - 控制事务传播行为

事务传播行为：当**一个事务方法被另一个事务方法调用**时，**被调用方法**应该如何进行事务控制。

|属性值|含义|
|---|---|
|**REQUIRED**|【默认值】需要事务，有则加入，无则创建新事物|
|**REQUIRES_NEW**|需要新事物，无论有无，总是创建新事物（适用于记录日志，即无论主 SQL 是否成功，日志新增 SQL 都正常执行）|
|SUPPORTS|支持事务，有则加入，无则在无事务状态中运行|
|NOT_SUPPORTED|不支持事务，在无事务状态下运行，如果当前存在已有事务，则挂起当前事务|
|MANDATORY|必须有事务，否则报异常|
|NEVER|必须没事务，否则抛异常|
|...|...|

```java
@Transactional(propagetion = Propagation.REQUIRES_NEW)
@Override
public void insertLog(EmpLog empLog) {
    empLogMapper.insert(empLog);
}
```

## 使用 properties 配置项

有时需要在代码中使用配置文件的配置项，例如：

```yml
# 阿里云
aliyun:
  oss:
    endpoint: https://oss-cn-shenzhen.aliyuncs.com
    bucketName: harmless-java-web
    region: cn-shenzhen
```

在类中有两种使用方式：

- 单条使用：`@Value`

    ```java
    @Value("${aliyun.oss.endpoint}")
    private final String endpoint;
    ```

- 批量使用：定义 java bean 类，并添加 `@ConfigurationProperties` 注解

    ```java
    @Data
    @Component
    @ConfigurationProperties(prefix = "aliyun.oss")
    public class AliyunOSSProperties {
        private String endpoint;
        private String bucketName;
        private String region;
    }
    ```

    然后在需要使用的地方直接依赖注入

    ```java
    private final AliyunOSSProperties aliyunOSSProperties;

    @Autowired
    public AliyunOSS(AliyunOSSProperties aliyunOSSProperties) {
        this.aliyunOSSProperties = aliyunOSSProperties;
        log.info("endpoint: {}", aliyunOSSProperties.getEndpoint());
    }
    ```

## 全局异常处理器

想要捕获并规范化全局报错，又要避免每个 CSD 层级都加入大量的 try catch 语句。

可以在 Controller 层构造一个全局异常处理器：

```java
package net.harmless.controller;

import lombok.extern.slf4j.Slf4j;
import net.harmless.pojo.Result;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public Result handleException(Exception e) {
        log.error("发生错误：{}", e.getMessage());
        return Result.error(e.getMessage());
    }

    // 优先捕获更精确的异常
    // 如果是 DuplicateKeyException 就会执行这里，而非上面那个方法
    @ExceptionHandler
    public Result handleDuplicateKeyException(DuplicateKeyException e) {
        log.error("发生错误：{}", e.getMessage());
        String msg = e.getMessage();
        int i = msg.indexOf("Duplicate entry");
        String s = msg.substring(i).split(" ")[2];
        return Result.error(s + "已存在");
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

[PageHelper - HowToUse](https://github.com/pagehelper/Mybatis-PageHelper/blob/master/wikis/zh/HowToUse.md)
