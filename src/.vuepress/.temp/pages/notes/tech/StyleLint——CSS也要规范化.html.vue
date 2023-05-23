<template><div><p>既然 ESLint 都有了，StyleLint 也不能少。</p>
<!-- more -->
<h2 id="为什么-css-也要规范化" tabindex="-1"><a class="header-anchor" href="#为什么-css-也要规范化" aria-hidden="true">#</a> 为什么 CSS 也要规范化</h2>
<p>一般来说，因为语法复杂度并不高，CSS 代码不会很乱。</p>
<p>那么为什还需要一个专门的规范工具呢？</p>
<p>因为除了格式，<strong>顺序</strong> 同样很重要。</p>
<h3 id="顺序" tabindex="-1"><a class="header-anchor" href="#顺序" aria-hidden="true">#</a> 顺序？</h3>
<p>是的，CSS 是有一个推荐顺序的。好的顺序不仅易于查看，而且能优化网页加载的性能。</p>
<p>具体顺序如下：</p>
<ol>
<li>定位属性：position display float left top right bottom overflow clear z-index</li>
<li>自身属性：width height padding border margin background</li>
<li>文字样式：font-family font-size font-style font-weight font-varient color</li>
<li>文本属性：text-align vertical-align text-wrap text-transform text-indent text-decoration letter-spacing word-spacing white-space text-overflow</li>
<li>CSS3 中的新增属性：content box-shadow border-radius transform</li>
</ol>
<p>这样可以减少浏览器的 <strong><code v-pre>reflow</code>（回流）</strong>，提升渲染 dom 的性能。</p>
<p>等等...什么是回流？</p>
<h3 id="reflow-回流" tabindex="-1"><a class="header-anchor" href="#reflow-回流" aria-hidden="true">#</a> <code v-pre>reflow</code> 回流？</h3>
<p>这与浏览器的渲染流程有关。</p>
<p>（详情可以看 <a href="https://blog.csdn.net/zxl1990_ok/article/details/121364430" target="_blank" rel="noopener noreferrer">浏览器的回流与重绘 (Reflow &amp; Repaint)<ExternalLinkIcon/></a> 这篇文章）</p>
<p>简单来说就是一个元素改变尺寸、位置之类的属性时，牵一发动全身，浏览器需要重新渲染与其相关的元素，甚至是整个文档。</p>
<p>另外还有一个概念叫 <strong><code v-pre>repaint</code>（重绘）</strong>，指的是修改除位置尺寸属性时，消耗较小的重绘页面的行为。</p>
<h3 id="我的理解" tabindex="-1"><a class="header-anchor" href="#我的理解" aria-hidden="true">#</a> 我的理解</h3>
<p>将定位属性写在最前面，浏览器读到的时候就直接 回流 了。</p>
<p>如果不写在最前面，浏览器先处理其他的属性，然后读到定位属性，还是要重新画，这样浪费了性能。</p>
<p>大概率是不对的，没有找到很易懂的大佬文章。以后加深了对浏览器的理解回来修改这段。</p>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<p>回到正题，先贴一个官方文档：<a href="https://stylelint.io/" target="_blank" rel="noopener noreferrer">StyleLint 文档<ExternalLinkIcon/></a></p>
<ol>
<li>
<p>安装 <code v-pre>StyleLint</code> 以及 <code v-pre>stylelint-config-standard</code> （标准配置包）</p>
<div class="language-base ext-base line-numbers-mode"><pre v-pre class="language-base"><code>pnpm i -D stylelint stylelint-config-standard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>在项目根目录下创建 <code v-pre>.stylelintrc.json</code> 配置文件</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// .stylelintrc.json</span>

<span class="token comment">// 类似 ESLint，需要在配置文件中声明使用了什么规则包，以下是两个官方包</span>
<span class="token punctuation">{</span>
  <span class="token comment">// "extends": "stylelint-config-recommended " // 只避免错误的规则</span>
  <span class="token property">"extends"</span><span class="token operator">:</span> <span class="token string">"stylelint-config-standard"</span> <span class="token comment">// 推荐，包含了 Google Airbnb 等样式指南</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>安装结束。</p>
<h2 id="检错-纠错" tabindex="-1"><a class="header-anchor" href="#检错-纠错" aria-hidden="true">#</a> 检错 &amp; 纠错</h2>
<p>检错</p>
<div class="language-base ext-base line-numbers-mode"><pre v-pre class="language-base"><code>npx stylelint &quot;**/*.css&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>纠错</p>
<div class="language-base ext-base line-numbers-mode"><pre v-pre class="language-base"><code>npx stylelint &quot;**/*.css&quot; --fix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然，你也可以配置一个 npm 命令</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// package.json</span>

<span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">"lint:css"</span><span class="token operator">:</span> <span class="token string">"stylelint **/*.{vue,css,sass,scss,less} --fix"</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="排序扩展" tabindex="-1"><a class="header-anchor" href="#排序扩展" aria-hidden="true">#</a> 排序扩展</h2>
<p>基础安装后的 StyleLint 并没有顺序检测功能，需要安装一个扩展：<code v-pre>stylelint-order</code>。</p>
<div class="language-base ext-base line-numbers-mode"><pre v-pre class="language-base"><code>pnpm i stylelint-order -D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成后，在 <code v-pre>.stylelintrc.json</code> 文件中配置：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// .stylelintrc.json</span>

<span class="token punctuation">{</span>
  <span class="token property">"plugins"</span><span class="token operator">:</span> <span class="token string">"stylelint-order"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是不同于 ESLint，这里仅仅配置 <code v-pre>plugins</code> 还不够。</p>
<p>StyleLint 要求添加插件后，在 <code v-pre>rules</code> 中配置插件。</p>
<p><code v-pre>stylelint-order</code> 文档里是这么写的：</p>
<blockquote>
<p>将 stylelint-order 添加到您的 Stylelint 配置 <code v-pre>plugins</code> 数组中，然后将您需要的规则添加到 <code v-pre>rules</code> 列表中。 stylelint-order 中的所有规则都需要使用 order 命名空间。</p>
</blockquote>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// .stylelintrc.json</span>

<span class="token punctuation">{</span>
  <span class="token property">"plugins"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"stylelint-order"</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"rules"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// order/order 指定声明块中内容的顺序</span>
    <span class="token comment">// 这里指定 自定义属性 放在 CSS 声明 前面</span>
    <span class="token comment">// 详细见 https://github.com/hudochenkov/stylelint-order/blob/HEAD/rules/order/README.md#examples</span>
    <span class="token property">"order/order"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"custom-properties"</span><span class="token punctuation">,</span>
      <span class="token string">"declarations"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// order/properties-order 指定声明块中属性的顺序</span>
    <span class="token property">"order/properties-order"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"width"</span><span class="token punctuation">,</span>
      <span class="token string">"height"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// properties-alphabetical-order 指定声明块中，属性的字母顺序</span>
    <span class="token property">"properties-alphabetical-order"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我懒，不想自己配排序的规则，那么就只能用个现成的：<code v-pre>stylelint-config-recess-order</code></p>
<p>在 <code v-pre>stylelint-order</code> 文档中提到的三个包这个最热，就它了。</p>
<p><a href="https://www.npmjs.com/package/stylelint-config-recess-order" target="_blank" rel="noopener noreferrer">stylelint-config-recess-order 文档<ExternalLinkIcon/></a></p>
<div class="language-base ext-base line-numbers-mode"><pre v-pre class="language-base"><code>pnpm i stylelint-config-recess-order -D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置如下：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// .stylelintrc.json</span>

<span class="token punctuation">{</span>
  <span class="token property">"extends"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"stylelint-config-recess-order"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"rules"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在此处添加和覆盖其它规则</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会发现它甚至不需要配置 <code v-pre>stylelint-order</code> 的 <code v-pre>plugins</code> 即可使用，都已经封装好了。</p>
<h2 id="如何与-vue-一同使用" tabindex="-1"><a class="header-anchor" href="#如何与-vue-一同使用" aria-hidden="true">#</a> 如何与 Vue 一同使用？</h2>
<p>使用 <code v-pre>stylelint-config-html</code> 来添加对 Vue 的支持。</p>
<p><a href="https://github.com/ota-meshi/stylelint-config-html" target="_blank" rel="noopener noreferrer">stylelint-config-html 文档<ExternalLinkIcon/></a></p>
<p>安装：</p>
<div class="language-base ext-base line-numbers-mode"><pre v-pre class="language-base"><code>pnpm install --save-dev postcss-html stylelint-config-html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里需要使用 postcss-html，相关知识等后面再补</p>
<p>配置：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// .stylelintrc.json</span>

<span class="token punctuation">{</span>
  <span class="token property">"extends"</span><span class="token operator">:</span> <span class="token string">"stylelint-config-html/vue"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="再加上预处理器" tabindex="-1"><a class="header-anchor" href="#再加上预处理器" aria-hidden="true">#</a> 再加上预处理器？</h2>
<p><a href="https://www.npmjs.com/package/stylelint-scss" target="_blank" rel="noopener noreferrer">stylelint-scss 文档<ExternalLinkIcon/></a></p>
<p>安装：</p>
<div class="language-base ext-base line-numbers-mode"><pre v-pre class="language-base"><code>pnpm i stylelint-scss
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// .stylelintrc.json</span>

<span class="token punctuation">{</span>
  <span class="token property">"plugins"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"stylelint-scss"</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="封盘" tabindex="-1"><a class="header-anchor" href="#封盘" aria-hidden="true">#</a> 封盘</h2>
<p>写着写着感觉还有很多前置需要补充，暂且搁置。</p>
</div></template>
