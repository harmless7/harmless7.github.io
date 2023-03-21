<script setup>
import { useData } from 'vitepress';
import { ref } from 'vue';

const { site } = useData();

function helloText() {
  const now = new Date();

  const day = now.getDay();
  if ([0, 6].includes(day)) return "周末愉快~"

  const hours = now.getHours();
  if (hours >= 6 && hours <= 12) {
    return "早上好~"
  } else if (hours > 12 && hours <= 14) {
    return "中午好~"
  } else if (hours > 14 && hours <= 18) {
    return "下午好~"
  } else {
    return "晚上好~"
  }
};

const accountList = ref([
  { icon: "qq", href: "tencent://Message/?Uin=384441137" },
  { icon: "github", href: "https://github.com/harmless7" },
  { icon: "douyin", href: "https://www.douyin.com/user/MS4wLjABAAAAR86ai24DAzJj6ayqZMyiMNrLmR6JcI6pYSOy1lypJNlo2wBT0LOAia39mH-bQ8W3" },
  { icon: "bilibili", href: "https://space.bilibili.com/7612381" },
]);
</script>

<template>
  <div class="home-master">
    <p>{{ helloText() }}欢迎来到此站点。</p>
    <p>
      我是
      <span class="author">{{ site.themeConfig.blog.author }}</span>
      ，您可以通过这些方式找到我：
    </p>
    <ul class="icons">
      <a v-for="item in accountList" :key="item.icon" :href="item.href" target="_blank">
        <i class="iconfont" :class="`icon-${item.icon}`" />
      </a>
    </ul>
  </div>
</template>

<style scoped>
.home-master {
  background: var(--bg-color-container);
  padding: 20px;
}
.home-master > p {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-color-primary);
  line-height: 1.5;
}
.home-master > p + p {
  margin-top: 0.7rem;
}
.author {
  color: var(--brand-color);
  font-weight: 600;
}
.icons {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.icons a {
  /* height: 50px; */
  /* width: 50px; */
  /* background: var(--bg-color-component); */
  /* border-radius: var(--radius-round); */
  display: flex;
  align-items: center;
  justify-content: center;
}
.icons .iconfont {
  font-size: 2rem;
  color: var(--text-color-placeholder);
  transition: all 120ms ease-in-out;
}
.icons a:hover .iconfont {
  color: var(--text-color-primary);
}
</style>