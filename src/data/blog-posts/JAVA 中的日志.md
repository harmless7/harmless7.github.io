---
title: "JAVA 中的日志"
description: "正经 JAVA 谁写日记啊？你写吗？"
publishDate: "2025-02-13"
---

## intro

日志框架：

- JUL(java.util.logging)：JavaSE 官方日志框架。配置简单、不灵活、性能差。

- Log4j：早期流行日志框架。

- **LogBack**：基于 Log4j 升级而来。提供更多功能，且性能更好。

日志规范：

- Slf4j(Simple Logging Facade for Java)：简单日志门面。提供一组日志操作的标准接口及抽象类，允许使用不同的日志框架。

## quick start

1. 引入 [logback 依赖](https://mvnrepository.com/artifact/ch.qos.logback/logback-classic)。（spring boot 默认依赖了 logback）

2. 配置文件 `/resources/logback.xml`

    [官方基础配置模板](https://logback.qos.ch/manual/configuration.html) 如下：

    ```xml
    <configuration>
      <!-- 输出位置：控制台输出 -->
      <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- 编码器类型（class），默认为 ch.qos.logback.classic.encoder.PatternLayoutEncoder -->
        <encoder>
          <!-- 格式化输出：%d 代表日期，%thread 代表线程名，%-5level：级别从左显示 5 个字符宽度；%logger{50}：最长 50 个字符（超出.切割） -->
          <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg %n</pattern>
        </encoder>
      </appender>

      <!-- 日志输出级别 -->
      <root level="debug">
        <appender-ref ref="STDOUT" />
      </root>
    </configuration>
    ```

3. 定义日志记录对象 Logger，记录日志

    ```java
    // 定义日志记录对象 Logger
    private static final Logger log = LoggerFactory.getLogger(LogTest.class); // 传入当前类字节码文件

    @Test
    public void testLog() {
        log.debug("开始计算"); // 调用方法记录日志
        int sum = 0;
        int[] nums = {1, 3, 5, 7, 9};
        for (int num : nums) {
            sum += num;
        }
        log.debug("结束计算，结果为：{}", sum); // 调用方法记录日志，logback 可以使用 {} 作为占位符
    }
    ```

    如果使用了 `lombok`，可以简化掉 Logger 的定义，在**类**上使用 `@Slf4j`：

    ```java
    @Slf4j // 注释后，可使用的变量也叫 log
    class LogTest {
        // 省去定义 logger
        // private static final Logger log = LoggerFactory.getLogger(LogTest.class);

        @Test
        public void testLog() { /* 同上 */ }
    }
    ```

## logback.xml

可配置输出格式、位置、日志开关等。

### 输出位置

```xml
<!-- 控制台 -->
<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
  <encoder>
    <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg %n</pattern>
  </encoder>
</appender>

<!-- 系统文件 -->
<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
  <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
    <!-- 日志文件名，%i 表示序号 -->
    <FileNamePattern>D:/harmless-%d{yyyy-MM-dd}-%i.log</FileNamePattern>
    <!-- 最多保留历史日志文件数量 -->
    <MaxHistory>30</MaxHistory>
    <!-- 最大文件大小，超过这个大小会触发滚动到新文件，默认为 10MB -->
    <maxFileSize>10MB</maxFileSize>
  </rollingPolicy>
  <encoder>
    <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg %n</pattern>
  </encoder>
</appender>

<!-- 日志输出级别 -->
<root level="ALL">
  <appender-ref ref="STDOUT" />
  <appender-ref ref="FILE" />
</root>
```

### 输出级别

错误级别表（越下面越严重）：

|级别|说明|记录方式|
|---|---|---|
|`trace`|追踪，记录程序运行轨迹|`log.trace("...")`|
|`debug`|调试，记录程序调试过程中的信息，实际应用中一般将其视为最低级别|`log.debug("...")`|
|`info`|记录一般信息，描述运行的关键事件，如：网络操作、io 操作|`log.info("...")`|
|`warn`|警告信息，记录潜在有害情况|`log.warn("...")`|
|`error`|错误信息|`log.error("...")`|

xml 中的配置项 `level` 表示：**严重程度 >= level 的日志才会输出**。

可配置项：各级别名 | `all` （全部输出） | `off`（关闭所有输出）

```xml
<root level="info">
  <!-- ... -->
</root>
```

> 单独定义某个模块的日志输出级别，可在 `application.yml` 中设置：
>
> ```yml
> logging:
>   level:
>     # 事务管理日志级别定义为：debug
>     org.springframework.jdbc.support.JdbcTransactionManager: debug
> ```

## spring-logback.xml

这是 Spring Boot 推荐的 Logback 配置文件，专为 Spring Boot 环境设计。

spring-logback.xml 使得你可以使用 Spring 的 application.properties 或 application.yml 文件中的配置。

可以做到生产环境与开发环境分开配置日志目录，通过 spring 配置文件设置 `logging.file.path` ：

```yml
# log
logging:
  file:
    path: ./logs # 开发环境
    # path: /var/log/my-app # 生产环境
```

然后在 logback.xml 中配置：

```xml
<configuration>
    <!-- 动态获取日志目录 -->
    <springProperty scope="context" name="LOG_DIR" source="logging.file.path" defaultValue="./logs" />

    <!-- 文件输出 -->
    <appender name="ROLLING_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- 日志文件名，%i 表示序号 -->
            <FileNamePattern>${LOG_DIR}/%d{yyyy-MM-dd}-%i.log</FileNamePattern>
            <!-- 最多保留历史日志文件数量 -->
            <MaxHistory>30</MaxHistory>
            <!-- 最大文件大小，超过这个大小会触发滚动到新文件，默认为 10MB -->
            <maxFileSize>10MB</maxFileSize>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- 日志输出级别 -->
    <root level="info">
        <appender-ref ref="ROLLING_FILE" />
    </root>
</configuration>
```

## refer

[黑马程序员 javaweb - 日志技术](https://www.bilibili.com/video/BV1yGydYEE3H/?spm_id_from=333.788.player.switch&vd_source=cbb9bae25f5ac9e51f8ff965eb794230&p=84)

[Logback - Home](https://logback.qos.ch/index.html)

[Slf4j - Home](https://www.slf4j.org/)
