<script setup>
import PostList from "./PostList.vue";
import GroupTag from "./GroupTag.vue";
import GroupCate from "./GroupCate.vue";
import Pagination from "../../components/Pagination.vue";
import { data } from "../../../utils/posts.data";
import { ref, computed, nextTick } from "vue";
import { useUrlSearchParams } from '@vueuse/core';

const searchData = useUrlSearchParams("history");

const cate = ref(searchData.cate);
const tag = ref(searchData.tag);
const page = ref(Number(searchData.page || 1));

function changeSearch() {
  nextTick(() => {
    location.reload();
  });
}

const limit = ref(10);
const list = computed(() => {
  let res = data;
  if (cate.value) {
    res = data.filter(item => item.data?.category?.includes(cate.value));
  }
  if (tag.value) {
    res = data.filter(item => item.data?.tag?.includes(tag.value));
  }
  return res || [];
});
const total = computed(() => list.value.length);
</script>

<template>
  <div class="layout-page">
    <div class="search">
      <div v-if="cate">
        <h5>{{ cate }}</h5>
        <GroupCate @click-item="changeSearch"/>
      </div>
      <div v-if="tag">
        <h5>{{ tag }}</h5>
        <GroupTag @click-item="changeSearch" />
      </div>
    </div>
    <PostList :list="list?.slice((page - 1) * limit, page * limit)" />
    <ClientOnly>
      <Pagination v-model="page" :limit="limit" :total="total" />
    </ClientOnly>
  </div>
</template>

<style scoped lang="less">
.layout-page {
  min-height: calc(100vh - var(--header-height));
  padding-bottom: 100px;
  box-sizing: border-box;
  .search {
    padding: 20px 0;
    h5 {
      font-size: 30px;
      font-weight: 600;
      margin: 0 0 20px 0;
    }
    .group-cate {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      grid-auto-rows: 40px;
    }
    .group-tag {

    }
  }
  .pagination {
    margin-top: 50px;
  }
}
</style>