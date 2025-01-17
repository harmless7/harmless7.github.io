---
title: '数学常数 e 究竟是什么？'
description: '补习一下数学常识'
publishDate: '2024-04-29'
---

# 数学常数 e 究竟是什么

## 参考

[An Intuitive Guide To Exponential Functions & e – BetterExplained](https://betterexplained.com/articles/an-intuitive-guide-to-exponential-functions-e/)

[［顺手译好文］指数函数和e的直观理解（第01修订版） - 简书 (jianshu.com)](https://www.jianshu.com/p/d5b8d94aeed1)

[数学常数e的含义 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2011/07/mathematical_constant_e.html)

[自然常数_百度百科 (baidu.com)](https://baike.baidu.com/item/%E8%87%AA%E7%84%B6%E5%B8%B8%E6%95%B0/1298918?fromtitle=e&fromid=4734540&fr=aladdin)

[72法则_百度百科 (baidu.com)](https://baike.baidu.com/item/72%E6%B3%95%E5%88%99/963132?fr=ge_ala)

[高利贷利滚利，多久会翻倍？你必须知道的“72法则”_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1LX4y1j7Tp/?spm_id_from=333.337.search-card.all.click&vd_source=cbb9bae25f5ac9e51f8ff965eb794230)

## 基础概念

e，一个你常常在数学公式中能看到的符号。

它有很多名称 **自然常数**，**欧拉数**，**纳皮尔常数**。

和 π 类似，它也是一个 *无限不循环小数*，它的值大约为：**2.718281828459**。

## e 的意义

说 e 是“一个近似 2.71828...” 的数，无异于说 π 是“一个近似 3.14159...” 的数。非常正确，但让人难以理解。

**π** 是所有圆的周长和其半径的比值。它是所有圆周的固有基本比例。它影响了圆、球、圆柱等的周长、面积、体积和表面积的计算。π很重要，它告诉我们所有的圆都是相关的，更不必说三角函数（sin，cos，tan）都是从圆导出的。

类似地，我们可以这样理解 e：

**e 是所有持续增长过程，共享的基本增长率**。

## 举个栗子：如何制造一个 e

### 1. 利滚利:moneybag:

现在假如张三找你借了 1 块钱，年利率为 100%。

那么第一年结束时，他需要还 2 块钱；

而到了第二年结束时，第一年的利息也产生了新的利息，他需要还 4 块钱。

<img title="超级高利贷" src="https://s2.loli.net/2024/04/29/QWJVKUts2SGCXim.webp" alt="第三个月利息" data-align="inline">

以此类推，第 n 年后，他总共要还 2^n 块钱。公式长这样：

![](https://s2.loli.net/2024/04/29/BboGqFewhMZkzUr.webp)

这个公式还能换一种写法，更直观地体现出 100% 的利息：

![](https://s2.loli.net/2024/04/29/4GTjntO3ka2P67X.webp)

更进一步，增长率我们也替换为变量，来考虑各种利率的情况（比如 25%, 50%, 200% 等等）。那么新公式就能改成：

![](https://s2.loli.net/2024/04/29/DSP9O6LlIoz4pdH.webp)

return 就代表了回报率（增长率）。

### 2. 加快利滚利:chart_with_upwards_trend:

现在让咱们贪婪一点，年利率保持 100% 不变，但计算利息的频次从一年缩短为半年。

那么一年以后你会赚多少钱呢？

在半年的时候，你会提前获得一半的利息，这时共获利 1.5 元。

![](https://s2.loli.net/2024/04/29/jYuNHQVG3J5ihO4.webp)

但是当到了一年的时候，你仍然只能得到 2 元吗？

错了！你忘了计算半年时多出来的 0.5 元利息了，它也要利滚利，生成自己的利息。

![](https://s2.loli.net/2024/04/29/1ofMFQJ2dVpLjGE.webp)

所以正确答案是一年后，连本带利共 2.25 元。比按年结算多出了 0.25 元。

让我们回到公式，如何表达两个半年 50% 的增长：

![](https://s2.loli.net/2024/04/29/BtFNTaOcHZ5mwdL.webp)

### 3. faster!:pickup_truck:

更进一步！现在你尝到了频繁计算复利的甜头。让我们改为每个季度计算利息一次。

![](https://s2.loli.net/2024/04/29/TNoGwDZxnKtudlk.webp)

![](https://s2.loli.net/2024/04/29/2najbKXkvgTRO8d.webp)

总收益变得更大了。

### 4. fastest!:airplane:

那么，如果每天、每小时、每秒、乃至每一瞬间都计算一次利息，不是时就可以把利息滚到无限大，从此实现财富自由了呢？

| n         | (1 + 100% / n)^n |
|:--------- | ---------------- |
| 1         | 2                |
| 2         | 2.25             |
| 3         | 2.37             |
| 5         | 2.488            |
| 10        | 2.5937           |
| 100       | 2.7048           |
| 1,000     | 2.7169           |
| 10,000    | 2.71814          |
| 100,000   | 2.718268         |
| 1,000,000 | 2.7182804        |
| ...       | ...              |

很遗憾，不行。

但你会发现当间隔足够小以后，最后的总额无限趋近于 **e** 的值...我们成功地制造了e。

由此，也就得出了数学中表达 e 的公式：

![](https://s2.loli.net/2024/04/29/srP9jmiJYRh3SeC.webp)

这个极限最终会收敛于一个值，这个已经被证明过。正如你所见，不管我们把时间分的多么多么的短，我们得到的总回报最终停留在了2.718附近。

## 可是 e 有什么用呢？

现在我们知道，数字 e（2.718...） 是一个周期以 100% 的复合增长率增长的最大结果。

但是这个数有什么用呢？

### 当增长基数改变？

依然用借款来举例，假设年利率 100%，且持续复利（虽然现实中不可能这样）。

我们一开始有 1 元，那么一年后我们连本带息能得到 e 元。

如果我们一开始有 2 元，但复利的条件没有变化，那么一年后我们能得到 2e 元。

以此类推，如果有 114.514 元，一年最终也会变成 114.514e 元。

### 当增长率改变？

如果增长率不是 100%，而是 50%，e 还能起作用吗？

看回公式，50% 的单位时间内的复合增长率是这样的：

![](https://s2.loli.net/2024/04/30/UvwIZiEhxHb2tGm.webp)

记住 50% 是这段时间内的*总回报率*，n 是为了获得复合增长而将这个过程*分割的次数*。

如果我们取 n = 50，我们可以把整段增长分为 50 次，每一段都增长了 1%。

![](https://s2.loli.net/2024/04/30/wRO9N3q7ZSFazbH.webp)

为了探究 50% 增长率与 e（100% 增长率） 的关系，我们用同样的方法处理 e。

我们假定 100% 增长的情况下，n = 100 （将增长分割为 100 段）。公式如下：

![](https://s2.loli.net/2024/04/30/ui8IxEoKyLPAks1.webp)

似乎有些关系了。

![](https://s2.loli.net/2024/04/30/HLy8AQCwqacrYif.webp)

- 在 100% 增长率的情况下，近似等于以 1% 的增长重复了 100 次；（左）

- 在 50% 增长率的情况下，近似等于以 1% 的增长重复了 50 次；（右）

它们的区别只在于，50% 增长的段数比 100% 少了一半：

![](https://s2.loli.net/2024/04/30/T4izG5A83svtPJW.webp)

因此我们可以认为，在单位时间内，增长率 r 的最大复合增长为：e^r。

- 50% 增长率的最大复合增长为 e^0.5

- 300% 增长率的最大复合增长为 e^3

- 0.1% 增长率的最大复合增长为 e^0.01

由此可得出不同增长率下，表示最大复合增长的公式：

![](https://s2.loli.net/2024/04/30/EAro6h7aBsOH2kF.webp)

### 当增长时间改变？

假设我们用 300% 的增长率，连续增长了 2 年。

那么可以认为是用第二年的增长，去乘第一年的增长：

![](https://s2.loli.net/2024/04/30/yx4abkeQu31ERIF.webp)

抽象一下：

![](https://s2.loli.net/2024/04/30/tuFeqK43xDnH6U9.webp)

因此也可以得到，2 年 300% 的增长，等同于 3 年 200% 的增长。

time 可以代表增长的时间，而 rate 代表增长的效率。

### 意义

只要系统以指数形式持续增长，e 就会出现：人口、放射性衰变、利息计算等等。即使是不平滑增长的锯齿状系统，也可以用 e 来近似。

就像每个数字都可以看作是 1（基本单位）的缩放版，每个圆都可以看作是单位圆（半径 1）的缩放版，每个增长率都可以看作是 e（单位增长，完全复合）的缩放版。

因此，e 并不是一个晦涩难懂、看似随机的数字。

e 所代表的理念是，**所有持续增长的系统，都是一个共同增长率（e）的缩放版本。**

## 一些例子

这里就列举参考原文的一些好例子，外加一个阮一峰大神提到的[72法则](https://baike.baidu.com/item/72%E6%B3%95%E5%88%99/963132?fr=ge_ala)。

### 例1：魔法水晶

假设你有 300kg 魔法水晶，它们每时每刻都在以 100% 速度增长，那么 10 天后你会有多少水晶？

300 * e^10 ≈ 6607939.73 kg

### 例2：最大利率

设我的银行账户中有120元，利息是5%。银行很慷慨，并且想要给我最可能大的复合增长率，十年后我有多少钱？

120 * e^(0.05 * 10) ≈ 197.84 元

### 例3：半衰期

一种放射性物质，其每年的连续复合衰变率是100%，问10kg的该物质经过3年后还剩多少？

10 * e^(-1 * 3) ≈ 0.498 kg

### 例4： 72 法则

72法则是金融学上的一种概念，用于估算投资本金翻倍所需的时间。

具体来说，它基于一个假设：以 1% 的复利来计息，本金在大约72年后会翻倍。

e^(0.01 * t) = 2

t ≈ 69.315

我们可以将 69.315 近似为 72。（之所以选用72，是因为它有较多因数，容易被整除，更方便计算。）

用这个 72 我们能快速估算增长翻倍的时间。

例：假设年增长率为20%，那么需要多少年才能翻一番？

答：72÷20=3.6年