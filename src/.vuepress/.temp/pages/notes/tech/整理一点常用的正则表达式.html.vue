<template><div><p>正则什么的有在搞吗？</p>
<!-- more -->
<h2 id="数字校验" tabindex="-1"><a class="header-anchor" href="#数字校验" aria-hidden="true">#</a> 数字校验</h2>
<table>
<thead>
<tr>
<th>描述</th>
<th>正则表达式</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>数字</td>
<td><code v-pre>^[0-9]*$</code> 或 <code v-pre>^\d*$</code></td>
<td></td>
</tr>
<tr>
<td>n位数字</td>
<td><code v-pre>^\d{n}$</code></td>
<td></td>
</tr>
<tr>
<td>至少n位连续数字</td>
<td><code v-pre>^\d{n,}$</code></td>
<td></td>
</tr>
<tr>
<td>n~m位连续数字</td>
<td><code v-pre>^\d{n,m}$</code></td>
<td></td>
</tr>
<tr>
<td>整数</td>
<td><code v-pre>^(-?[1-9]\d*)$</code></td>
<td>非 0 开头，正数或负数，调整前面的 <code v-pre>-</code> 和 <code v-pre>?</code> 得到正/负整数</td>
</tr>
<tr>
<td>非正整数</td>
<td><code v-pre>^((-[1-9]\d*)|0)$</code></td>
<td>即负整数 或 0</td>
</tr>
<tr>
<td>浮点数</td>
<td><code v-pre>^-?(?:[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0\.0+|0)$</code></td>
<td>分为四种情况：<code v-pre>非0数.数字</code> 或 <code v-pre>0.非0数</code> 或 <code v-pre>0.0</code> 或 <code v-pre>0</code></td>
</tr>
<tr>
<td>仅一位小数</td>
<td><code v-pre>^-?(?:0|[1-9][0-9]*)\.[0-9]{1}$</code></td>
<td></td>
</tr>
<tr>
<td>最多两位小数</td>
<td><code v-pre>^-?(?:0|[1-9][0-9]*)\.[0-9]{1,2}$</code></td>
<td></td>
</tr>
<tr>
<td>连续重复数字</td>
<td><code v-pre>^(\d)\1+$</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="字符校验" tabindex="-1"><a class="header-anchor" href="#字符校验" aria-hidden="true">#</a> 字符校验</h2>
<table>
<thead>
<tr>
<th>描述</th>
<th>正则表达式</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>中文</td>
<td><code v-pre>^[\u4E00-\u9FA5]+$</code></td>
<td></td>
</tr>
<tr>
<td>全角字符</td>
<td><code v-pre>^[\uFF00-\uFFFF]+$</code></td>
<td></td>
</tr>
<tr>
<td>半角字符</td>
<td><code v-pre>^[\u0000-\u00FF]+$</code></td>
<td></td>
</tr>
<tr>
<td>英文字符串（大写）</td>
<td><code v-pre>^[A-Z]+$</code></td>
<td></td>
</tr>
<tr>
<td>英文字符串（小写）</td>
<td><code v-pre>^[a-z]+$</code></td>
<td></td>
</tr>
<tr>
<td>英文字符串（不区分大小写）</td>
<td><code v-pre>^[A-Za-z]+$</code></td>
<td></td>
</tr>
<tr>
<td>中文和数字</td>
<td><code v-pre>^(?:[\u4E00-\u9FA5]{0,}|\d)+$</code> 或 <code v-pre>^[\u4E00-\u9FA5\d]+$</code></td>
<td></td>
</tr>
<tr>
<td>英文和数字</td>
<td><code v-pre>^[A-Za-z0-9]+$</code></td>
<td></td>
</tr>
<tr>
<td>英文、数字和下划线</td>
<td><code v-pre>^\w+$</code></td>
<td></td>
</tr>
<tr>
<td>中文、英文、数字和下划线</td>
<td><code v-pre>^[\u4E00-\u9FA5\w]+$</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="日期和时间校验" tabindex="-1"><a class="header-anchor" href="#日期和时间校验" aria-hidden="true">#</a> 日期和时间校验</h2>
<table>
<thead>
<tr>
<th>描述</th>
<th>正则表达式</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>日期(弱校验，例如:2022-06-12)</td>
<td><code v-pre>^\d{1,4}-(?:1[0-2]|0?[1-9])-(?:0?[1-9]|[1-2]\d|30|31)$</code></td>
<td></td>
</tr>
<tr>
<td>日期(严格校验，考虑平闰年)</td>
<td><code v-pre>^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$</code></td>
<td></td>
</tr>
<tr>
<td>时间(12小时制)</td>
<td><code v-pre>^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$</code></td>
<td></td>
</tr>
<tr>
<td>时间(24小时制)</td>
<td><code v-pre>^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$</code></td>
<td></td>
</tr>
<tr>
<td>日期+时间</td>
<td><code v-pre>^(\d{1,4}-(?:1[0-2]|0?[1-9])-(?:0?[1-9]|[1-2]\d|30|31)) ((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)$</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="日常生活相关" tabindex="-1"><a class="header-anchor" href="#日常生活相关" aria-hidden="true">#</a> 日常生活相关</h2>
<table>
<thead>
<tr>
<th>描述</th>
<th>正则表达式</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>中文名</td>
<td><code v-pre>^[\u4E00-\u9FA5·]{2,16}$</code></td>
<td></td>
</tr>
<tr>
<td>英文名</td>
<td><code v-pre>^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$</code></td>
<td></td>
</tr>
<tr>
<td>车牌号</td>
<td><code v-pre>^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$</code></td>
<td>不含新能源</td>
</tr>
<tr>
<td>车牌号</td>
<td><code v-pre>^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:(?:[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])|(?:(?:\d{5}[A-HJK])|(?:[A-HJK][A-HJ-NP-Z0-9][0-9]{4})))$</code></td>
<td>包含新能源</td>
</tr>
<tr>
<td>火车车次</td>
<td><code v-pre>^[GCDZTSPKXLY1-9]\d{1,4}$</code></td>
<td>例如：G1234</td>
</tr>
<tr>
<td>手机号</td>
<td><code v-pre>^(?:(?:\+|00)86)?1[3-9]\d{9}$</code></td>
<td>弱匹配</td>
</tr>
<tr>
<td>手机号</td>
<td><code v-pre>^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$</code></td>
<td>严格匹配</td>
</tr>
<tr>
<td>固话号码</td>
<td><code v-pre>^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$</code></td>
<td></td>
</tr>
<tr>
<td>手机IMEI码</td>
<td><code v-pre>^\d{15,17}$</code></td>
<td>一般是15位</td>
</tr>
<tr>
<td>邮编</td>
<td><code v-pre>^(?:0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$</code></td>
<td>例如：211100</td>
</tr>
<tr>
<td>统一社会信用代码</td>
<td><code v-pre>^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$</code></td>
<td></td>
</tr>
<tr>
<td>身份证号码(1代)</td>
<td><code v-pre>^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$</code></td>
<td>15位数字</td>
</tr>
<tr>
<td>身份证号码(2代)</td>
<td><code v-pre>^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[0-9Xx]$</code></td>
<td>18位数字</td>
</tr>
<tr>
<td>QQ号</td>
<td><code v-pre>^[1-9][0-9]{4,}$</code></td>
<td>一般是5到10位</td>
</tr>
<tr>
<td>微信号</td>
<td><code v-pre>^[a-zA-Z][-_a-zA-Z0-9]{5,19}$</code></td>
<td>一般6~20位，字母开头，可包含字母、数字、-、_，不含特殊字符</td>
</tr>
<tr>
<td>股票代码</td>
<td><code v-pre>^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$</code></td>
<td>A股，例如：600519</td>
</tr>
<tr>
<td>银行卡卡号</td>
<td><code v-pre>^[1-9]{1}(?:\d{15}|\d{18})$</code></td>
<td>一般为19位</td>
</tr>
</tbody>
</table>
</div></template>
