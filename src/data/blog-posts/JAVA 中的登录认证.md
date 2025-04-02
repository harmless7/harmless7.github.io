---
title: "JAVA 中的登录认证"
description: "了解 Cookie, Session, JWT 在 JAVA 中的应用"
publishDate: "2025-03-07"
---

## 什么是会话？

### 生活中的“会话”

在日常生活中，“会话”指的是两人或多人的交流过程，其中包含多次对话，并且通常具备上下文，让对话能够顺畅进行。

例如：

- 甲：我昨天去吃饭了。
- 乙：哪家吃的？
- 甲：有朋小吃。
- 乙：那家确实不错。

在这段对话中，乙能够理解“有朋小吃”指的是甲昨天去的餐馆，这是因为对话双方共享了上下文信息。

但如果没有上下文，对话就可能变得不连贯：

- 甲：有朋小吃
- 乙：？

可见，“上下文”提供了一种**共享的信息基础**，让交流更加顺畅，而不必重复已有的信息。

### 计算机中的“会话”

在计算机网络中，“会话”有着类似的作用。

以 Web 应用为例，浏览器和服务器通常通过 HTTP 协议 进行通信。然而，HTTP 本质上是**无状态（stateless）**的，也就是说，每次请求都是独立的，服务器不会记住之前的请求。

这就像两个人在交流时，每说一句话就会立刻遗忘所有之前的对话内容。

为了让服务器能够记住用户的状态（例如：已登录、购物车中的商品、用户偏好设置等），需要会话管理技术来维护上下文。

## 会话技术的发展

### 🍪 cookie

Cookie 是浏览器**存储在用户本地**的一小段数据（通常是键值对），用于在客户端和服务器之间保持状态。

客户端鉴权后，服务器通过 `Set-Cookie` 响应头通知浏览器存储 cookie。浏览器会自动存储，然后通过 `Cookie` 请求头携带信息。

### 💬 session

Session 是服务器用来跟踪用户状态的一种机制，**存储在服务器**，通常用于维持用户的身份信息。

客户端鉴权后，服务器会生成一个 Session 及其唯一的 SessionId。通过 cookie（或者别的方式） 将 SessionId 发送给客户端。

后续请求中，浏览器会自动携带 Session ID。服务器通过 id 来获得信息。

### 令牌（token）

Token（令牌） 是一种用于身份认证的凭证，通常由服务器在用户登录后生成。**存储在用户本地** 并由客户端在后续请求中携带，以证明自己的身份。

### 优缺点

|对比项|Cookie|Session|Token|
|---|---|---|---|
|存储位置|客户端（浏览器）|服务器端|客户端（如浏览器、移动端）|
|安全性|易被窃取、篡改，需 HttpOnly 和 Secure 保护|更安全，数据存于服务器|需要加密、签名，防止泄露|
|适用场景|轻量级数据存储，如用户偏好|传统 Web 应用，需维护登录状态|分布式系统、RESTful API、移动端|
|跨域支持|❌️|❌️（若依赖 cookie）|⭕️|
|生命周期|受 Expires 或 Max-Age 限制|受 maxInactiveInterval 限制|可自定义有效期，常结合短时效 + 刷新机制|
|使用方式|浏览器自动携带，适用于 Web|需服务器存储，每次请求自动带 session_Id|需手动在请求头中携带，如 `Authorization: Bearer <token>`|

## JSON Web Token（JWT）

JWT（JSON Web Token） 是一种用于 **身份认证和信息传输** 的令牌标准。它以 JSON 格式存储数据，具有 **自包含、无状态、可签名** 的特点，在前后端分离、RESTful API、微服务认证场景中被广泛使用。

### JWT 结构

JWT 由 三部分 组成，使用 `.` 连接：`xxxxx.yyyyy.zzzzz`

三部分分别为：

1. Header 头部

    说明使用的加密算法（如 HMAC、RSA）。

    ```json
    {
      "alg": "HS256",
      "typ": "JWT"
    }
    ```

    然后使用 base64 编码：`eyJhbGciOiAiSFMyNTYiLCJ0eXAiOiAiSldUIn0=`

2. Payload 有效载荷

    存放用户信息和声明（claims），如 userId、exp（过期时间）。

    ```json
    {
      "userId": 123,
      "exp": 1697352000
    }
    ```

    然后使用 base64 编码：`eyJ1c2VySWQiOiAxMjMsImV4cCI6IDE2OTczNTIwMDB9`

    > 常见 claims：
    >
    > - `iss`（Issuser）：签发者
    > - `sub`（Subject）：主题（如用户 ID）
    > - `exp`（Expiration Time）：过期时间（Unix 时间戳）
    > - `iat`（Issued At）：签发时间

3. Signature 签名

    由前两部分的 base64 组合并加密（如 HMAC256）得来。

### auth0/java-jwt

JAVA 中比较热门的 jwt 库。

JWT 工具类示例：

```java
package net.harmless.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Map;

public class JwtUtils {
    // 加密盐
    private  static final String secret = "harmless_secret";
    // 过期时间：7天
    private static final Long expire = 1000 * 60 * 60 * 24 * 7L;

    /**
     * 生成 JWT 令牌
     */
    public static String generateJwt(Map<String, Object> claims) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        JWTCreator.Builder builder = JWT.create();
        builder.withClaim("exp", System.currentTimeMillis() + expire); // 设置过期时间
        claims.forEach((k, v) -> {
            builder.withClaim(k, v.toString());
        });
        return builder.sign(algorithm);
    }

    /**
     * 解析 JWT 令牌
     *
     * @param jwt JWT 令牌
     * @return DecodedJWT 对象，可使用 getClaim 方法获取数据，如果校验不通过会抛出错误
     */
    public static DecodedJWT parseJWT(String jwt) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.require(algorithm).build().verify(jwt);
    }
}

```

## 令牌检验

需在所有鉴权接口前校验 token。

有两种实现方法：`Filter` 过滤器 和 `Interceptor` 拦截器

### Filter 过滤器

依赖于 `jakarata.servlet`，属于 Jakarta EE（原 Java EE） 规范的一部分。

#### 过滤器使用步骤

1. 配置 `Servlet` 支持

    然后还需要去启动类添加 `@ServletComponentScan` 注解，为了让 SpringBoot 支持 Servlet 组件

2. 实现过滤器

    过滤器类需添加 `@WebFilter(urlPatterns = "/*")` 注释

    实现 `jakarta.servlet.Filter` 接口，并重写其所有方法：

    - `init`：创建过滤器实例时执行，只执行一次
    - `doFilter`：请求资源前执行。**可在此选择放行或拦截请求。**
    - `destory`：web 服务器关闭前执行

#### 过滤链

![filter_chain](https://s2.loli.net/2025/03/17/VObdqKzJ4Ug1H68.png)

多个过滤器会形成过滤链。按过滤器名排序先后执行。（如 `AbcFilter` 早于 `DemoFilter` 执行）

#### TokenFilter demo

`Servlet` 支持（在启动类配置）：

```java
    package net.harmless;

    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    import org.springframework.boot.web.servlet.ServletComponentScan;

    @ServletComponentScan // 支持 Servlet 组件
    @SpringBootApplication
    public class HarmlessWebManagementApplication {
        public static void main(String[] args) {
            SpringApplication.run(HarmlessWebManagementApplication.class, args);
        }

    }
```

TokenFilter 过滤器：

```java
package net.harmless.filter;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import net.harmless.utils.JwtUtils;
import org.apache.http.HttpStatus;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebFilter(urlPatterns = "/*")
public class TokenFilter implements Filter {

    // 忽略校验路由
    private static final String[] IGNORE_URLS = {
        "/login"
    };

    /**
     * 设置错误响应
     * @param response
     * @param status
     * @param msg
     * @throws IOException
     */
    private void setErrorResponse(HttpServletResponse response, int status, String msg) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json; charset=UTF-8");
        HashMap<Object, Object> errorMap = new HashMap<>();
        errorMap.put("code", status);
        errorMap.put("msg", msg);

        ObjectMapper objectMapper = new ObjectMapper(); // 用于将 JAVA 对象转为 JSON
        response.getWriter().write(objectMapper.writeValueAsString(errorMap));
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        // 1. 获取请求 url
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        // 2. 判断请求 url 是否是非校验路由，如果是，则直接放行
        for (String url : IGNORE_URLS) {
            if (url.contains(request.getRequestURI())) {
                filterChain.doFilter(servletRequest, servletResponse);
                return;
            }
        }

        // 3. 获取令牌
        String token = request.getHeader("Authorization");

        // 4. 校验令牌
        // 无令牌
        if (token == null || token.isEmpty()) {
            setErrorResponse(response, HttpStatus.SC_UNAUTHORIZED, "未获取到令牌");
            return;
        }
        // 令牌不合法
        try {
            DecodedJWT decodedJWT = JwtUtils.parseJWT(token);
            Map<String, Claim> claims = decodedJWT.getClaims();
            log.info("claims: {}", claims);
        } catch (Exception e){
            setErrorResponse(response, HttpStatus.SC_UNAUTHORIZED, "令牌不合法");
            return;
        }

        // 放行
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
```

### Interceptor 拦截器

Spring 框架提供，用于动态拦截控制器方法的执行。

#### 拦截器使用步骤

1. 定义拦截器

    实现 `HandlerInterceptor` 接口，可选择性实现方法：

    - `preHandle`：访问资源前执行，通过返回 `boolean` 值来决定放行|不放行
    - `postHandle`：放行请求后执行
    - `afterCompletion`：视图渲染完毕后执行（前后端不分离情况下有用）

    > 可为拦截器添加 `@Component`，方便在配置时依赖注入

2. 注册拦截器

    先实现配置类，继承 `WebMvcConfigurer` 接口，并添加 `@Configuration` 注释。

    实现其中 `addInterceptors` 方法来注册拦截器。详见下例。

#### 拦截器路径通配符

需注意路径通配符 `/*` 与 `/**` 的区别：

|拦截路径|含义|例子|
|---|---|---|
|`/*`|一级路径|能匹配 `/depts`, `/emps`|
|`/**`|任意级路径|能匹配 `/depts`, `/depts/1`, `/depts/1/2`|

#### TokenInterceptor demo

定义配置类，并注册拦截器：

```java
// config/WebConfig.java
package net.harmless.config;

import net.harmless.interceptor.TokenInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final TokenInterceptor tokenInterceptor;

    @Autowired
    public WebConfig(TokenInterceptor tokenInterceptor) {
        this.tokenInterceptor = tokenInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        WebMvcConfigurer.super.addInterceptors(registry);
        registry.addInterceptor(tokenInterceptor)
                .addPathPatterns("/**") // 拦截所有路径
                .excludePathPatterns("/login"); // 除外 /login
    }
}
```

TokenInterceptor：

```java
// intercepter/TokenInterceptor.java
package net.harmless.interceptor;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import net.harmless.utils.JwtUtils;
import org.apache.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class TokenInterceptor implements HandlerInterceptor {
    /**
     * 设置错误响应
     */
    private void setErrorResponse(HttpServletResponse response, int status, String msg) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json; charset=UTF-8");
        HashMap<Object, Object> errorMap = new HashMap<>();
        errorMap.put("code", status);
        errorMap.put("msg", msg);

        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(errorMap));
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("Authorization");

        if (token == null || token.isEmpty()) {
            setErrorResponse(response, HttpStatus.SC_UNAUTHORIZED, "未获取到令牌");
            return false;
        }

        try {
            DecodedJWT decodedJWT = JwtUtils.parseJWT(token);
            Map<String, Claim> claims = decodedJWT.getClaims();
            log.info("claims: {}", claims);
        } catch(Exception e) {
            setErrorResponse(response, HttpStatus.SC_UNAUTHORIZED, "令牌不合法");
            return false;
        }

        return true;
    }
}
```

### 过滤器 和 拦截器

- Filter：继承 `Filter` 接口，拦截所有资源，Java Web 原生
- Interceptor：继承 `HandleInterceptor` 接口，拦截 Spring 中的资源，Spring 功能

如果两者同时使用：先 Filter，后 Interceptor。

![filter and interceptor](https://s2.loli.net/2025/04/02/io5T8DufHNUbJCE.png)

## refer

[MDN - Cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)

[jwt - intro](https://jwt.io/introduction#)

[jwt - debugger](https://jwt.io/#debugger-io)

[github - java-jwt](https://github.com/auth0/java-jwt)

[黑马程序员 - JAVA Web：登录功能](https://www.bilibili.com/video/BV1yGydYEE3H?spm_id_from=333.788.videopod.episodes&vd_source=cbb9bae25f5ac9e51f8ff965eb794230&p=120)
