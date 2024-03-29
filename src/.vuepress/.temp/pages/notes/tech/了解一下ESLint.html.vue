<template><div><p>ESLint 究极基础。看了一天的视频，依然只学了个皮毛。</p>
<!-- more -->
<h2 id="作用" tabindex="-1"><a class="header-anchor" href="#作用" aria-hidden="true">#</a> 作用</h2>
<ul>
<li>保持一致</li>
<li>减少不必要 git 提交</li>
<li>避免低级错误</li>
<li><em>编译时检查语法，而不是等JS引擎运行时才检查</em></li>
</ul>
<h2 id="包" tabindex="-1"><a class="header-anchor" href="#包" aria-hidden="true">#</a> 包</h2>
<blockquote>
<p>需要注意的是：ESLint 有两个工具，一个是 <strong>模块包</strong>，一个是 VSCode 的<strong>扩展工具</strong>。</p>
</blockquote>
<ol>
<li>
<p>ESLint 包</p>
<p>安装方式：通过 npm 或 yarn 进行 全局 或项目安装</p>
<div class="language-base ext-base line-numbers-mode"><pre v-pre class="language-base"><code>npm i eslint -D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>VSCode 中的 ESLint 扩展工具</p>
<p>安装方式：VSCode 搜索安装</p>
</li>
</ol>
<h2 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h2>
<h3 id="创建目录" tabindex="-1"><a class="header-anchor" href="#创建目录" aria-hidden="true">#</a> 创建目录</h3>
<ul>
<li>创建一个测试文件夹</li>
<li>初始化项目：</li>
</ul>
<div class="language-base ext-base line-numbers-mode"><pre v-pre class="language-base"><code>npm init -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="eslint-安装" tabindex="-1"><a class="header-anchor" href="#eslint-安装" aria-hidden="true">#</a> ESLint 安装</h3>
<ol>
<li>
<p><code v-pre>npm i eslint -D</code></p>
</li>
<li>
<p>注意查看安装结果：<code v-pre>node_modules</code> 中生成了以下文件：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>node_modules
├─.bin
│  └─eslint.cmd // 脚本
├─@eslint // 配置文件格式相关
├─eslint
├─eslint-scope
├─eslint-utils
├─espree
└─eslint-visitor-keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<ul>
<li><strong>.bin/eslint.cmd</strong> 脚本文件，内部通过 nodejs 执行 eslint运行包 的代码</li>
<li><strong>@eslint包</strong> 用来规范 eslint配置文件</li>
<li>eslint开头的包 是 eslint运行包，包含 eslint 代码</li>
</ul>
<h3 id="生成-eslint-配置文件" tabindex="-1"><a class="header-anchor" href="#生成-eslint-配置文件" aria-hidden="true">#</a> 生成 ESLint 配置文件</h3>
<blockquote>
<p>可以配置一个独立的 <strong>.eslintrc.*(.js|.json|.yaml)</strong> 文件，或者直接在 package.json 文件里的 eslintConfig 字段指定配置，ESLint 会查找和自动读取它们。</p>
</blockquote>
<ol>
<li>
<p>执行 <code v-pre>node_modules/.bin</code> 文件夹里的 eslint 脚本来创建配置文件</p>
<ul>
<li>完整路径：<code v-pre>./node_modules/.bin/eslint --init</code></li>
<li>也可以用 npx 来执行 <strong>（推荐）</strong>：<code v-pre>npx selint --init</code></li>
</ul>
</li>
<li>
<p>运行时会对具体初始化选项进行询问：</p>
<div class="language-base ext-base line-numbers-mode"><pre v-pre class="language-base"><code>√ 你想如何使用 ESLint？
√ How would you like to use ESLint?
√ 项目中你使用哪种模块类型？（ESM/commonjs）
√ What type of modules does your project use?
√ 你的项目使用哪种框架？
√ Which framework does your project use?
√ 是否使用 TypeScript？
√ Does your project use TypeScript?
√ 你的代码运行在什么环境？（node/浏览器）
√ Where does your code run?
√ 你想怎么定义规范？
√ How would you like to define a style for your project?
√ 你想使用哪种流行规范？
√ Which style guide do you want to follow?
√ 你的配置文件使用什么格式？
√ What format do you want your config file to be in?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>生成配置文件</p>
</li>
</ol>
<h2 id="进行语法检查" tabindex="-1"><a class="header-anchor" href="#进行语法检查" aria-hidden="true">#</a> 进行语法检查</h2>
<div class="language-base ext-base line-numbers-mode"><pre v-pre class="language-base"><code>npx eslint .\src\index.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>即可在命令行显示语法检查结果。</p>
<h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h2>
<p>首先贴一个初始化配置文件范例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">commonjs</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">es2021</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">'standard'</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token string">'latest'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="globals-节点" tabindex="-1"><a class="header-anchor" href="#globals-节点" aria-hidden="true">#</a> globals 节点</h3>
<blockquote>
<p>当访问当前源文件内未定义的变量时，no-undef 规则将发出警告。在 globals 中定义这些全局变量，这样就不会发出警告了。</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">globals</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token string-property property">"_"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 可以读取，可以修改</span>
  <span class="token string-property property">"$"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 可以读取，不能修改</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="env-节点" tabindex="-1"><a class="header-anchor" href="#env-节点" aria-hidden="true">#</a> env 节点</h3>
<blockquote>
<p>一个环境定义了一组预定义的全局变量。</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">commonjs</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">es2021</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>由于 ESLint 一半不允许使用 <strong>未在页面内声明的成员</strong></li>
<li>而开发中常会用到一些环境自带的 api，例如：<code v-pre>window</code> (浏览器)、<code v-pre>__dirname</code> (nodejs)、<code v-pre>WeakRef</code> (es2021)等</li>
<li>所以要告诉 eslint，<strong>当前代码是运行在哪些环境中</strong>，这样来避免报错</li>
</ul>
<h3 id="extends-节点" tabindex="-1"><a class="header-anchor" href="#extends-节点" aria-hidden="true">#</a> extends 节点</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token string">"standard"</span><span class="token punctuation">,</span> <span class="token comment">// "或者写成 eslint-config-standard"</span>
  <span class="token comment">// "eslint:all", // 这个是内置规范：全开</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>配置使用 <strong>内置规范</strong> 或者 <strong>第三方规范</strong></li>
<li>如果使用第三方规范，需要先 npm 安装</li>
<li>配置 extends 时，可以省略 <code v-pre>eslint-config-</code></li>
</ul>
<h3 id="parseroptions-节点" tabindex="-1"><a class="header-anchor" href="#parseroptions-节点" aria-hidden="true">#</a> parserOptions 节点</h3>
<blockquote>
<p>指定你想要支持的 JavaScript 语言选项。
默认情况下，ESLint 支持 ECMAScript 5 语法。你可以覆盖该设置，以启用对 ECMAScript 其它版本和 JSX 的支持。</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token string-property property">"ecmaVersion"</span><span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>ESLint 解析器 解析代码时，指定 <strong>用哪个版本的 js</strong></li>
<li>但是解析器不负责全局变量，比如你想用 ES6 的 <code v-pre>Set</code> 类型，还必须在 <code v-pre>env</code> 中配置</li>
</ul>
<h3 id="rules-节点" tabindex="-1"><a class="header-anchor" href="#rules-节点" aria-hidden="true">#</a> rules 节点</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token string-property property">"semi"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// "or warn"</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>配置单条的规范。可以覆盖 <code v-pre>extend</code> 中的配置值。</li>
</ul>
<blockquote>
<p>要改变一个规则设置，你必须将规则 ID 设置为下列值之一：<br>
&quot;off&quot; 或 0 - 关闭规则<br>
&quot;warn&quot; 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)<br>
&quot;error&quot; 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)</p>
</blockquote>
<h2 id="检查语法的规则" tabindex="-1"><a class="header-anchor" href="#检查语法的规则" aria-hidden="true">#</a> 检查语法的规则</h2>
<h3 id="本质" tabindex="-1"><a class="header-anchor" href="#本质" aria-hidden="true">#</a> 本质</h3>
<ul>
<li>就是 <strong>【函数】</strong></li>
<li>通过查看源码：
<ul>
<li>eslint 内置 285 个规则，每条规则都是一个 <strong>create 函数</strong></li>
<li>在进行语法检查时，会将代码传入这些函数内做检查</li>
</ul>
</li>
</ul>
<h3 id="eslint-内置的语法规范" tabindex="-1"><a class="header-anchor" href="#eslint-内置的语法规范" aria-hidden="true">#</a> ESLint 内置的语法规范</h3>
<ul>
<li>ESLint 安装时，就已经准备了 280 多个规范函数</li>
<li>具体分为 7 类
<ul>
<li>Possible Errors (可能出现的错误) - no-console...</li>
<li>Best Practices (最佳实践) - no-global-assign...</li>
<li>Strict Mode (严格模式) - strict</li>
<li>Variables (变量) - no-delete-var...</li>
<li>Node.js and CommonJS - callback-return...</li>
<li>Stylistic Issues (格式) - no-mixed-spaces-and-tabs...</li>
<li>ECMAScript 6 (ES6) - constructor-super...</li>
</ul>
</li>
</ul>
<h3 id="自定义语法规范" tabindex="-1"><a class="header-anchor" href="#自定义语法规范" aria-hidden="true">#</a> 自定义语法规范</h3>
<p>略，你个菜鸡还想用自己的规范？到那步也不用看这篇了。</p>
<h2 id="语法规范包类型" tabindex="-1"><a class="header-anchor" href="#语法规范包类型" aria-hidden="true">#</a> 语法规范包类型</h2>
<ul>
<li><strong>ESLint 内置规范包</strong>: eslint-all (全用！) / eslint-recommended (56 条)</li>
<li><strong>标准规范包</strong>: eslint-config-standard (200+ 条，本质也是第三方)</li>
<li><strong>各种第三方包</strong>: google/airbnb/facebook</li>
</ul>
<p>严格程度： all &gt; airbnb-base &gt; standard &gt; recommended</p>
<h2 id="如何与-vue-一同使用" tabindex="-1"><a class="header-anchor" href="#如何与-vue-一同使用" aria-hidden="true">#</a> 如何与 Vue 一同使用</h2>
<p>不像原先的 Vue Cli 脚手架，可以在创建 Vue 项目时傻瓜封装好 ESLint。</p>
<p>Vite 现在只能手动配置 ESLint，但好在也并不是很复杂。</p>
<ol>
<li>
<p>在项目中安装 ESLint （<code v-pre>pnpm i eslint -D</code>）</p>
</li>
<li>
<p>初始化 ESLint 配置 （<code v-pre>npx eslint --init</code>）</p>
</li>
<li>
<p><strong>安装Vite-plugin-eslint</strong></p>
<p>有了个这包，vite 才能在 dev 时去主动检查代码</p>
</li>
<li>
<p>配置 vite.config.js 文件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vite'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">'@vitejs/plugin-vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> eslint <span class="token keyword">from</span> <span class="token string">'vite-plugin-eslint'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">eslint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 这里是关键</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>欧了。</p>
<h2 id="如何使用-vscode-扩展" tabindex="-1"><a class="header-anchor" href="#如何使用-vscode-扩展" aria-hidden="true">#</a> 如何使用 VSCode 扩展</h2>
<p>文档：<a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint#settings-options" target="_blank" rel="noopener noreferrer">VSCode ESLint 使用文档（英文）<ExternalLinkIcon/></a></p>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<p>在 VSCode 应用商店中搜索 ESLint，点击安装即可。</p>
<h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3>
<p>配置项详见上面的使用文档，这里贴一下最常用的<strong>保存自动修正</strong></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// settings.json</span>

<span class="token property">"editor.codeActionsOnSave"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">"source.fixAll.eslint"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
