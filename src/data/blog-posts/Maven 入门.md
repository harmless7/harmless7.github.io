---
title: "Maven 入门"
description: "Apache Maven 学习笔记"
publishDate: "2025-02-05"
---

## Maven is what?

![maven_intro](https://s2.loli.net/2025/02/05/Wwrjb7POxSLpf45.jpg)

一个管理和构建 JAVA 项目的工具。

## Why use Maven?

- 依赖管理：方便快捷的管理项目依赖的资源（jar 包）
- 项目构建：标准化的跨平台的自动化项目构建方式
- 统一的项目结构：提供标准、统一的项目结构

## 下载 & 配置

下载地址: [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)

1. 下载并解压 `apache-maven-x.x.x-bin.zip`
2. 配置本地仓库地址：修改 /conf/settings.xml 中的 `<localRepository>` 为一个指定目录

   ```xml
   <localRepository>E:\apache-maven-3.9.9\mvn_repo</localRepository>
   ```

   > 如不修改，默认的本地仓库地址在用户家目录下的 `/.m2/`

3. 配置阿里云私服：修改 /conf/settings.xml 中的 `<mirrors>` 标签，为其添加一个子标签：

   ```xml
   <mirrors>
     <mirror>
       <id>aliyun-maven</id>
       <name>aliyun maven</name>
       <url>https://maven.aliyun.com/nexus/content/groups/public/</url>
       <mirrorOf>central</mirrorOf>
     </mirror>
   </mirrors>
   ```

4. 配置环境变量：`MAVEN_HOME` 为 maven 的解压目录，并将其 `bin` 目录添加入 PATH 环境变量

   > 可在控制台输入 `mvn -v` 来检验是否成功

## 命令行创建

根据官网 [getting-started-guide](https://maven.apache.org/guides/getting-started/index.html) 中的示例，在命令行中输入以下命令：

```bash
mvn archetype:generate -DgroupId="net.harmless" -DartifactId="harmless-app" -DarchetypeArtifactId="maven-archetype-quickstart" -DarchetypeVersion="1.5" -DinteractiveMode="false"
```

即可在目录下创建一个 maven 项目文件。

命令参数含义如下：

- DgroupId：组织名
- DartifactId：项目名
- DarchetypeArtifactId：生成模板

## 标准 Maven 目录

![maven_basic_dir](https://s2.loli.net/2025/02/06/CfdlytSq2pXGK9x.jpg)

`pom.xml` 意为项目对象模型（project object model），内含项目信息及依赖信息，即 maven 项目的配置（可以理解为 Node.js 中的 `package.json`）。

## Maven 坐标

用于定义 Maven 资源的唯一标识。类似 npm 中包不能重名。

由三项组成：

- groupId：所属的组织机构名称（通常是域名反写）
- artifactId: 项目名称（通常是模块名）
- version: 版本号
  - SNAPSHOT：功能不稳定、开发中，即快照版本
  - RELEASE: 稳定、停止更新，可以用于发行的版本（若不带标识，默认为该标识）

> 在 [https://mvnrepository.com](https://mvnrepository.com) 可查看所有可依赖的坐标

## 依赖管理

### 基础配置

```xml
<dependencies>
  <dependency>
    <groupId>org.example</groupId>
    <artifactId>example-module</artifactId>
    <version>1.0.0</version>
  </dependency>
</dependencies>
```

1. 在 `pow.xml` 中编写 `<dependencies>` 标签
2. 在 `<dependencies>` 标签中，使用 `<dependency>` 填写坐标
3. 点击刷新，引入新加入的坐标
   ![maven_dependencies](https://s2.loli.net/2025/02/05/xYlqhtLs2u49DiI.jpg)

### 依赖范围

使用 `<scope>` 标签来指定依赖包的适用范围，有以下几种值：

- compile（默认）：编译及运行时都需要
- provided：仅编译时需要
- runtime：仅运行时需要
- test：仅在测试时需要（不会打包到 jar 包中）
- system：表示这个包存在于指定的本地路径中，不会再去搜寻远程仓库
    system 范围必须添加 `<systemPath>` 标签来指定本地位置，例：
    ```xml
    <scope>system</scope>
    <!-- ${basedir} 表示当前项目根路径 -->
    <systemPath>${basedir}/lib/example-3.0.1.jar</systemPath>
    ```
- import：详见下 *父子工程-依赖继承*
    
    在 `dependencyManagement` 中使用，导入其他 pom 文件中的依赖，但是不会实际引入依赖，只是用来管理依赖的版本号


### 依赖冲突 & 排除依赖

和 npm 一样，依赖具有传递关系。但是如果不同的包依赖了同一个包的不同版本，就会产生依赖冲突。

为避免依赖冲突，maven 采用 *最短路径优先* 和 *先声明优先* 来解决。

你也可以手动解决冲突问题：

1. 在父项目中依赖，使用 `<exclustion>` 来排除不想要的传递依赖。

    如下例，引入 `example-module` 时将不会自动引入 `example-exclusion-module`：

    ```xml
    <dependencies>
      <dependency>
        <!-- 定位信息略 -->

        <!-- 要排除的依赖 -->
        <exclusions>
          <exclusion>
            <groupId>org.example-exclusion</groupId>
            <artifactId>example-exclusion-module</artifactId>
            <!-- 不需要指定版本号 -->
          </exclusion>
        </exclusions>
      </dependency>
    </dependencies>
    ```

2. 在子项目中，使用 `<optional>` 来使依赖可选。

    如下例，在子项目中设定某依赖可选，父项目就不一定会传递依赖该包：

    ```xml
    <dependencies>
      <dependency>
        <!-- 定位信息略 -->

        <!-- 当前项目被引入时，此关联依赖是可选的 -->
        <optional>true</optional>
      </dependency>
    </dependencies>
    ```

## 生命周期（life cycle）

Maven 的生命周期抽象了项目构建的全过程，内含数十个*阶段（phase）*，可分为 3 套：

- clean：清理工作
- default: 核心工作，编译、测试、打包、安装、部署等
- site：上线工作，生成报告、发布站点等

三套内含各自的阶段：

![maven_lifecycle_phase](https://s2.loli.net/2025/02/05/y2Vb9IjMDA3NhSP.jpg)

> **在同一套阶段中**：阶段是顺序执行的，且后面的阶段依赖前面的阶段。
>
> 如运行 `install`，将依次运行 `compire`、`test`、`package`、`install`

### 常用阶段

- clean：清除上次编译构建的文件（`target` 文件夹）

- validate：检验 `pom.xml` 是否正确
- compile：编译
- test：单元测试
- package: 将编译后文件打包为 .jar 或 .war 等
- verify：检验打包的结果是否正确，是否符合规则（如集成测试）
- install：安装项目到本地仓库
- deploy：将本地 jar 包上传到私服仓库中

- site：生成项目的站点文档，会生成一个 `site` 文件夹

### 运行

在项目根目录下进入命令行，使用 `mvn 阶段名` 即可运行生命周期。例如：

```bash
mvn clean

# 也可以执行多个
mvn clean install
```

> 在 IDEA 中，可以通过右侧 maven 面板中的生命周期，双击阶段以运行。

> 本质上，生命周期阶段是在调用 maven 的插件，详见 [plugins](https://maven.apache.org/plugins/index.html)。可以说 maven 底层相当于一个*插件执行框架*。

## 父子工程

大型项目往往会拆分为多个模块，此时父级项目和子级模块都可以使用 maven。它们之间就会构成父子工程。

### 父工程

使用 `<packaging>` 标签，可选项为：

- `jar`：打包为 .jar
- `war`：打包为 .war
- `pom`：作为一个父级工程

这里我们选择 `pom`。

然后删除 `src` 目录，在目录下创建子 maven 模块。

### 子工程

生成的子工程配置文件中，`<parent>` 标签记录了父工程的坐标信息

子工程的 `<groupId>` 会省略，继承父工程。

### 聚合

idea 中，父项目的 pom 会自动多出 `<modules>` 及 `<module>` 标签，来记录子工程：

```xml
<modules>
  <module>child-a</module>
  <module>child-b</module>
  <module>child-c</module>
</modules>
```

当在父项目中执行生命周期，所有子节点也会运行。

### 变量

在父工程中使用 `<properties>` 可以定义变量，供自己和子工程使用。例如：

```xml
<properties>
  <spring.version>6.1.11</spring.version>
</properties>
```

在子工程中使用：

```xml
<!-- ... -->
  <version>${spring.version}</version>
<!-- ... -->
```

### 依赖继承

默认子工程会无条件继承所有父工程的依赖。

如果想在父工程中定义不会被自动继承的依赖，使用 `<dependencyManagement>` 标签，例如：

```xml
<dependencyManagement>
  <depandencies>
    <depandency>
      <groupId>com.example</groupId>
      <artifactId>example-module</artifactId>
      <version>1.1.0</version>
    </depandency>
  </depandencies>
</dependencyManagement>
```

此时子工程将不会自动继承 example-module 依赖，除非在子工程中显式依赖它。

> 注意：子工程显式依赖时，不能填写 `<version>`。


## IDEA 中使用

### 全局配置 Maven

idea 欢迎界面 → 自定义 → 所有设置

1. 配置 Maven 路径

   ![global_setting_step_1](https://s2.loli.net/2025/02/05/n4pbMZ86eyFduOX.jpg)

2. 配置 Maven JRE 版本

   ![global_setting_step_2](https://s2.loli.net/2025/02/05/inSyGBQhgdHMmU7.jpg)

3. 配置编译器版本

   ![global_setting_step_3](https://s2.loli.net/2025/02/05/iP4zZvUh2xkjLKd.jpg)

### 创建

创建项目或新建模块时可选 `Maven` 选项，选中即可创建。

### 导入

1. 文件 → 项目结构 → 模块 → +（加号） → 导入模块 → 选择要导入 Maven 项目的 `pom.xml` 文件

2. 右侧 Maven 面板 → +（加号）→ 选择要导入 Maven 项目的 `pom.xml` 文件

> 导入前，最好把 Maven 项目文件拷贝到项目目录下再导入

## refer

[Maven 官网](https://maven.apache.org/index.html)

[黑马程序员 - JAVA Web：Maven-课程介绍](https://www.bilibili.com/video/BV1yGydYEE3H?vd_source=cbb9bae25f5ac9e51f8ff965eb794230&spm_id_from=333.788.videopod.episodes&p=31)

[GeekHour - 一小时 Maven 教程](https://www.bilibili.com/video/BV1uApMeWErY/?spm_id_from=333.337.search-card.all.click&vd_source=cbb9bae25f5ac9e51f8ff965eb794230)

依赖 lombok 导致的问题： `java: java.lang.NoSuchFieldError: Class com.sun.tools.javac.tree.JCTree$JCImport does not have`，可见[这里](https://blog.csdn.net/weixin_36829761/article/details/136287081)

1. 删除插件

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <!-- ... -->
</plugin>
```

2. 加版本号

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.32</version>
    <scope>provided</scope>
</dependency>
```

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.8.1</version>
    <configuration>
        <source>17</source>
        <target>17</target>
        <encoding>UTF-8</encoding>
        <!-- 这里是新加的 -->
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>1.18.32</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```
