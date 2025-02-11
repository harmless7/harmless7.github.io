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

## 数据库连接池

## XML 映射配置

## refer

[Mybatis Home](https://mybatis.org/mybatis-3/zh_CN/index.html)

[黑马程序员 JavaWeb - Mybatis](https://www.bilibili.com/video/BV1yGydYEE3H?spm_id_from=333.788.player.switch&vd_source=cbb9bae25f5ac9e51f8ff965eb794230&p=65)
