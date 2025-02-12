---
title: "JAVA 中的 Mybatis"
description: "小胖鸟帮你控制数据库"
publishDate: "2025-02-11"
---

## intro

持久层框架，用于基于且简化 JDBC 开发。

## quick start

1. 引入依赖：

    在 idea 中创建项目时选择的依赖：

    ![mybatis-idea-create](https://s2.loli.net/2025/02/11/aDxGpMriIFv3zTg.jpg)

2. 配置 Mybatis

    在 `src/resources/application.properties` （spring boot 核心配置文件）中配置数据库的连接信息：

    ```bash
    # 配置数据库的连接信息
    spring.datasource.url=jdbc:mysql://localhost:3306/harmless-jdbc
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    spring.datasource.username=root
    spring.datasource.password=harmless
    ```

3. 创建 mybatis 的持久层接口

    创建以 `XxxMapper` 命名的接口，放置于与入口类同级的 `/mapper/` （或 `/dao`）目录下：

    ```java
    @Mapper // 运行时将自动创建一个实现类对象（代理对象），并放入 Ioc 容器
    public interface UserMapper {
    /**
     * 查询所有用户
     */
    @Select("SELECT * FROM user")
        public List<User> findAll();
    }
    ```

    为接口添加 `@Mapper` 注解，为方法添加 `@Select(sql)` 查询注解。

4. 在测试类中测试查询方法

    ```java
    @SpringBootTest // 该注释会在调用测试方法时拉起 Spring Boot，从而建立 Ioc 容器
    class LearnBatisApplicationTests {
        private final UserMapper userMapper;

        @Autowired // 通过依赖注入获取 Mapper 对象
        public LearnBatisApplicationTests(UserMapper userMapper) {
            this.userMapper = userMapper;
        }

        @Test
        public void testFindAll() {
            List<User> userList = this.userMapper.findAll();

            userList.forEach(System.out::println);
        }
    }
    ```

### mybatis 辅助配置

控制台打印 SQL 日志：

```bash
# mybatis 配置
# 将日志输出到控制台
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

## CRUD

编写 SQL 时的标识符：

|符号|说明|场景|优缺点|例子|
|---|---|---|---|---|
|`#{...}`|占位符。执行时会替换为 `?`，生成预编译 SQL|参数值传递|安全、性能高|`"DELETE FROM user WHERE id = #{id}"`|
|`${...}`|拼接符。直接拼入 SQL，可能会被注入|表名、字段名动态设置|不安全、性能低|`"SELECT * FROM ${table}"`|

### 增

```java
@Mapper
public Interface UserMapper {
    /**
     * 插入用户
     */
    @Insert("INSERT INTO user(username, password, name, age) VALUES(#{username}, #{password}, #{name}, #{age})")
    public void insert(User user);
}
```

### 删

```java
@Mapper
public Interface UserMapper {
    /**
     * 根据id删除用户
     */
    @Delete("DELETE FROM user WHERE id = #{id}")
    public Integer deleteById(Integer id);
}
```

### 改

```java
@Mapper
public Interface UserMapper {
    /**
     * 更新用户
     */
    @Update("UPDATE user SET username=#{username}, password=#{password}, name=#{name}, age=#{age} WHERE id = #{id}")
    public void update(User user);
}
```

### 查

```java
@Mapper
public Interface UserMapper {
    /**
     * 查询所有用户
     */
    @Select("SELECT * FROM user")
    public List<User> findAll();

    /**
     * 根据用户名和密码查询用户
     */
    @Select("SELECT * FROM user WHERE username=#{username} AND password=#{password}")
    public User findUserByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
}
```

> Spring Boot 官方脚手架构建时，可以省略 @Param。因为它接口编译时会保留方法形参名

## XML 映射

### XML 配置方法

使用 XML 文件配置 SQL 语句。

![batis_sql_xml](https://s2.loli.net/2025/02/12/kWu5nfVL9eSrv7Z.jpg)

1. 同名同包：XML 文件名与 Mapper 接口名一致，并且在相同包下。

    > 例：
    >
    > `src/main/java` 下 `net.harmless.mapper.UserMapper.java` 
    >
    > 对应
    >
    > `src/main/resources` 下 `net/harmless/mapper/UserMapper.xml`

    这是默认规范，但是是可配置的。详见下。

2. namespace：XML 文件的 namespace 与 Mapper 接口全限定名一致。
3. id：XML 文件中 sql 语句的 id 和 Mapper 接口中的方法名一致，并且返回类型一致。

Mapper XML 文件的基本结构：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="net.harmless.learnmybatis.mapper.UserMapper">
    <select id="findAll" type="net.harmless.learnmybatis.pojo.User">
    </select>
</mapper>
```

### 什么时候使用 XML 映射？

> 使用注解来映射简单语句会使代码显得更加简洁，但对于稍微复杂一点的语句，Java 注解不仅力不从心，还会让本就复杂的 SQL 语句更加混乱不堪。 因此，如果你需要做一些很复杂的操作，最好用 XML 来映射语句。
>
> 选择何种方式来配置映射，以及是否应该要统一映射语句定义的形式，完全取决于你和你的团队。 换句话说，永远不要拘泥于一种方式，你可以很轻松地在基于注解和 XML 的语句映射方式间自由移植和切换。

总结：简单 SQL 用注释完成，复杂的建议使用 XML 来完成。

### 配置 XML 映射位置

上面提到，XML 文件需要遵循同包同名的规范。但是这个是可以手动调整的：

```bash
# 指定 XML 映射配置文件的位置
mybatis.mapper-locations=classpath:mapper/*.xml
```

`classpath`：`java` 和 `resources` 编译后，会放在同一个目录下，也即 `classpath` （类路径）。

### IDEA 插件

插件搜索 MyBatisX，安装。能够快捷跳转 XML 配置文件与接口位置。

## refer

[Mybatis Home](https://mybatis.org/mybatis-3/zh_CN/index.html)

[黑马程序员 JavaWeb - Mybatis](https://www.bilibili.com/video/BV1yGydYEE3H?spm_id_from=333.788.player.switch&vd_source=cbb9bae25f5ac9e51f8ff965eb794230&p=65)

[javase docs - DataSource](https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/javax/sql/DataSource.html)

[Druid 连接池](https://github.com/alibaba/druid/wiki/%E9%A6%96%E9%A1%B5)