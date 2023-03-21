<script setup>
import { ref } from "vue";
import { withBase } from "vitepress";
import PostListItem from "./PostListItem.vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => ([]),
  },
});
</script>

<template>
  <div class="post-list">
    <PostListItem v-for="(item, i) in list" :key="i" :item="item" />
  </div>
</template>


<style scoped>
.post-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
@media screen and (max-width: 1536px) {
  .post-list {
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
  }
}
</style>