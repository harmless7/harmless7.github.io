# emmit 快捷键

## html

---

### 语法

```
基础结构：! + tab
子代：>
兄弟：+
父代：^
重复：*
成组：()
ID：#
Class：.
属性：[]
```

### 例子

1. 生成列表

   ```html
   ul>li*5
   
   <ul>
   	<li></li>
   	<li></li>
   	<li></li>
   	<li></li>
   	<li></li>
   </ul>
   ```

   

2. 多个 input 输入框

   ```html
   input[type=text]*3
   
   <input type="text">
   <input type="text">
   <input type="text">
   ```

   

3. 常见页面结构

   ```html
   (div.head>div.nav)+(div.content>div.left-container+div.right-container>div.news>div.news-list.news-wrapper>div.news-single*3)+(div.footer)
   
   <div class="head">
   	<div class="nav"></div>
   </div>
   <div class="content">
   	<div class="left-container">
   	</div>
   	<div class="right-container">
   		<div class="news">
   			<div class="news-list news-wrapper">
   				<div class="news-single"></div>
   				<div class="news-single"></div>
   				<div class="news-single"></div>
   			</div>
   		</div>
   	</div>
   </div>
   <div class="footer></div>
   
   ```

4. 自增数字

   ```html
   ul>li.item$*3
   
   <ul>
   	<li class="item1"></li>
   	<li class="item2"></li>
   	<li class="item3"></li>
   </ul>
   
   ul>li.item$$$*3
   
   <ul>
   	<li class="item001"></li>
   	<li class="item002"></li>
   	<li class="item003"></li>
   </ul>
   ```

5. 标签内的文字

   ```html
   span{click me! come on!}
   
   <span>click me! come on!</span>
   ```

   

## CSS

---

### 语法

```css
w30 + tab  =>  width:30px
h30 + tab  =>  height:30px
mg30 + tab  =>  margin:30px
pd30 + tab  =>  padding:30px
lh12px + tab  =>  line-height:12px
bg + tab  =>  background
bgc + tab  =>  background-color
```

