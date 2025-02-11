---
title: "JAVA 中的 JDBC"
description: "Java DataBase Connectivity"
publishDate: "2025-02-11"
---

## intro

JDBC: Java Database Connectivity

Java 内置的操作关系型数据库的一套 API。

MyBatis、MyBatisPlus、SpringDataJPA 都是基于 JDBC 的封装。

![intro](https://s2.loli.net/2025/02/11/GZsCWNujTREwreI.jpg)

## quick start

安装 mysql 依赖：

```xml
<!-- https://mvnrepository.com/artifact/com.mysql/mysql-connector-j -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>9.2.0</version>
</dependency>
```

最小实现：

```java
@Test
public void testUpdate() throws ClassNotFoundException, SQLException {
    Connection connection = null;
    Statement statement = null;
    try {
        // 1. 注册驱动
        Class.forName("com.mysql.cj.jdbc.Driver");

        // 2. 获取数据库连接
        String url = "jdbc:mysql://localhost:3306/harmless_jdbc";
        String username = "root";
        String password = "harmless";
        connection = DriverManager.getConnection(url, username, password);

        // 3. 获取 SQL 语句执行对象
        statement = connection.createStatement();

        // 4. 执行 SQL 语句
        int i = statement.executeUpdate("update user set age = 25 where id = 1");
        System.out.println("影响的记录数为：" + i);
    } finally {
        // 5. 释放资源
        if (statement != null) {
            statement.close();
        }
        if (connection != null) {
            connection.close();
        }
    }
}
```

1. `Class.forName("com.mysql.cj.jdbc.Driver")`

    这行代码会加载 MySQL 的 JDBC 驱动，并执行驱动类的静态初始化代码，从而将驱动注册到 `DriverManager` 中。

2. `getConnection()` 获得 `Connection` 对象，得到与数据库的连接。

    `url`：前缀 `jdbc:mysql://` 是固定的，中间部分为数据库地址（`localhost:3306`），后缀为库名（`harmless_jdbc`）。

3. `createStatement()` 获得 `Statement` （语句）对象，用于执行 SQL 语句。

## query demo

```java
public void testQuery() {
    // 使用 try-with-resources 自动关闭资源（JAVA 7+）
    try (
        Connection connection = null;
        PreparedStatement preparedStatement = null;
    ) {
        // 第 1、2 步同上

        // 3. 获取 SQL 语句执行对象
        String sql = "SELECT id, username, password, name, age FROM User WHERE username = ? AND password = ?"; // 预编译 sql 语句
        preparedStatement = connection.prepareStatement(sql);

        // 4. 执行 SQL 语句
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            User user = new User(
                resultSet.getInt("id"),
                resultSet.getString("username"),
                resultSet.getString("password"),
                resultSet.getString("name"),
                resultSet.getInt("age")
            );
            System.out.println(user);
        }
    } catch(SQLException e) {
        e.printStackTrace();
    }
}
```

`PrepareStatement` 使用预编译 SQL，应优先使用。它相较于 `Statement` 有两大优势：
    - 效率更高（预编译 SQL 具有缓存，命中缓存的语句会跳过 检查 → 优化 → 编译 的过程）
    - 安全性更好（防止 SQL 注入）

`ResultSet` 用户封装查询结果的结果集。

## refer

[黑马程序员 JavaWeb - JDBC](https://www.bilibili.com/video/BV1yGydYEE3H?spm_id_from=333.788.player.switch&vd_source=cbb9bae25f5ac9e51f8ff965eb794230&p=62)

[mvn - mysql-connector-j](https://mvnrepository.com/artifact/com.mysql/mysql-connector-j)

[java docs - DriverManager](https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/DriverManager.html)

[java docs - Connection](https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/Connection.html)

[java docs - Statement](https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/Statement.html)
