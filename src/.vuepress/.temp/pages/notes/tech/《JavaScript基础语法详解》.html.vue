<template><div><p>希望 js 不会成为下一个 “世界上最好的语言”。</p>
<!-- more -->
<h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识" aria-hidden="true">#</a> 基础知识</h2>
<h3 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h3>
<h4 id="number类型" tabindex="-1"><a class="header-anchor" href="#number类型" aria-hidden="true">#</a> Number类型</h4>
<h5 id="数字分隔线" tabindex="-1"><a class="header-anchor" href="#数字分隔线" aria-hidden="true">#</a> 数字分隔线</h5>
<p>如果要表示的数字位数过长，或者需要按特定位数进行分组，可以用下划线分隔：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">1000_0000_0000</span> <span class="token comment">// 整数</span>
<span class="token number">22.4211_3677_7478</span> <span class="token comment">// 小数</span>
<span class="token number">0b1100_0010_1101</span> <span class="token comment">// 二进制</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="特殊数字" tabindex="-1"><a class="header-anchor" href="#特殊数字" aria-hidden="true">#</a> 特殊数字</h5>
<p>判断计算结果是不是 <code v-pre>NaN</code>，可以使用 JavaScript 全局对象中的 <code v-pre>isNaN()</code> 或者 <code v-pre>Number.isNaN()</code> 方法。</p>
<h4 id="null-与-undefined-类型" tabindex="-1"><a class="header-anchor" href="#null-与-undefined-类型" aria-hidden="true">#</a> Null 与 Undefined 类型</h4>
<p>如果想让一个变量代表的是空值，就应该使用 null，这表示变量是已定义的，只不过它的值是空白。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> inputValue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>nullValue<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
<span class="token keyword">typeof</span> nullValue<span class="token punctuation">;</span> <span class="token comment">// "object" (null 本质上还是一种对象)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当定义一个变量但没有赋值时，这个变量的值就是 undefined。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> num<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
<span class="token keyword">typeof</span> num<span class="token punctuation">;</span> <span class="token comment">// "undefined"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>常见的产生 undefined 的情况</p>
<ol>
<li>未赋值的变量</li>
<li>没有返回值的函数</li>
<li>访问对象中没有的属性和访问数组中没有的元素</li>
</ol>
</blockquote>
<h4 id="symbol-类型" tabindex="-1"><a class="header-anchor" href="#symbol-类型" aria-hidden="true">#</a> Symbol 类型</h4>
<p>本质是一种<strong>值不会重复</strong>的数据类型。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">"a symbol"</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">"a symbol"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

<span class="token comment">// 可用作对象的属性，防止对象被篡改</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> prop <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">"prop"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"value"</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span><span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">"prop"</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用全局符号注册表，可以用相同字符串，获取同一条 Symbol.
使用方法是 <code v-pre>Symbol.for()</code>，如果没有会创建，有了会返回。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> prop <span class="token operator">=</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">"prop"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"value"</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">"prop"</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "value"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h2>
<h3 id="逻辑运算符" tabindex="-1"><a class="header-anchor" href="#逻辑运算符" aria-hidden="true">#</a> 逻辑运算符</h3>
<ol>
<li><strong>逻辑运算符返回的并不是布尔类型的值，而是返回最后一个参与计算的表达式的值</strong>。</li>
<li>逻辑与、逻辑或 有短路特性：如果遇到一个假值，则整个逻辑表达式的结果就确定为不成立了，所以会直接返回假值表达式的结果。</li>
</ol>
<p>利用这些特性</p>
<p>可以使用<strong>与逻辑</strong>与来避免因为使用未定义的值而报错：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj<span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>a<span class="token punctuation">;</span> <span class="token comment">// 类型错误：不能访问 undefined 中的 a 属性</span>
obj <span class="token operator">&amp;&amp;</span> obj<span class="token punctuation">.</span>a<span class="token punctuation">;</span> <span class="token comment">// 无报错，返回 undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用<strong>或逻辑</strong>来给空值设置默认值：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> desc <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
desc <span class="token operator">||</span> <span class="token string">'暂无简介'</span><span class="token punctuation">;</span> <span class="token comment">// 暂无简介</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="空值合并-nullish-coalescing-运算符" tabindex="-1"><a class="header-anchor" href="#空值合并-nullish-coalescing-运算符" aria-hidden="true">#</a> 空值合并（Nullish Coalescing）运算符</h3>
<p>ES2020 规范中定义，使用 <code v-pre>??</code> 表示。</p>
<p>只有当左侧操作数为 <code v-pre>null</code> 或 <code v-pre>undefined</code> 时，才会使用右侧操作数的值，否则返回左侧操作数的值：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">""</span> <span class="token operator">??</span> <span class="token number">10</span> <span class="token comment">// ""</span>
<span class="token boolean">false</span> <span class="token operator">??</span> <span class="token string">"no"</span> <span class="token comment">// false</span>
<span class="token keyword">null</span> <span class="token operator">??</span> <span class="token number">10</span> <span class="token comment">// 10</span>
<span class="token keyword">undefined</span> <span class="token operator">??</span> <span class="token string">"empty"</span> <span class="token comment">// "empty"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="流程控制" tabindex="-1"><a class="header-anchor" href="#流程控制" aria-hidden="true">#</a> 流程控制</h2>
<h3 id="label-语句" tabindex="-1"><a class="header-anchor" href="#label-语句" aria-hidden="true">#</a> label 语句</h3>
<p>用于给循环或代码块添加一个标签，后便可以使用 <code v-pre>break label</code> 直接退出指定标签处的循环或代码块，或者使用 <code v-pre>continue label</code> 继续。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">label</span> <span class="token operator">:</span><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 或</span>
<span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token comment">// 代码块</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">outer</span><span class="token operator">:</span> <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">8</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">===</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">break</span> outer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i <span class="token operator">+</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
