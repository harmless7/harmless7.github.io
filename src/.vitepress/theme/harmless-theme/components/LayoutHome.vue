<script setup>
import HomeBrand from './HomeBrand.vue';
import HomeSign from './HomeSign.vue';
import HomeMaster from './HomeMaster.vue';
import HomeTag from './HomeTag.vue';
import HomeCate from './HomeCate.vue';
import PostList from "./PostList.vue";
import Pagination from "../../components/Pagination.vue";
import { data } from "../../../utils/posts.data";
import { ref, computed } from 'vue';

const page = ref(Number(new URL(window.location.href).searchParams.get("page") || 1));
const limit = ref(10);
const list = computed(() => {
  return data.slice((page.value - 1) * limit.value, page.value * limit.value);
});
</script>

<template>
  <div class="layout-home">
    <div class="brand">
      <HomeBrand />
    </div>
    <div class="sign">
      <HomeSign />
    </div>
    <div class="list">
      <PostList :list="list" />
      <Pagination v-model="page" :limit="limit" :total="data.length" />
    </div>
    <div class="master">
      <HomeMaster />
    </div>
    <div class="cate">
      <HomeCate />
    </div>
    <div class="tag">
      <HomeTag />
    </div>
  </div>
</template>

<style scoped lang="less">
.layout-home {
  --gutter: 10px;
  display: grid;
  grid-template:
    "brand sign sign" auto
    "list list master" auto
    "list list cate" auto
    "list list tag" auto
    "list list ..." 1fr
    / minmax(0, 10fr) 3fr 3.18fr;
  gap: var(--gutter);
  padding: var(--gutter) 0;
}
@media screen and (max-width: 768px) {
  .layout-home {
    grid-template:
      "brand" auto
      "list" 1fr
      / minmax(0, 1fr);
  }
  .sign, .master, .tag, .cate {
    display: none;
  }
}
.layout-home > .brand, .sign, .master, .tag, .cate {
  border-radius: var(--radius-large);
  border: 1px solid var(--component-border);
  overflow: hidden;
  transition: all 120ms ease-in-out;
}
.layout-home > .brand:hover {
  border-color: transparent;
}
.brand {
  grid-area: brand;
}
.sign {
  grid-area: sign;
}
.list {
  grid-area: list;
  cursor: pointer;
  .pagination {
    padding: 30px 0;
  }
}
.master {
  grid-area: master;
}
.tag {
  grid-area: tag;
}
.cate {
  grid-area: cate;
}
</style>