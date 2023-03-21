<script setup>
import GroupCate from './GroupCate.vue';
</script>

<template>
  <div class="home-cate">
    <h5>分类</h5>
    <div class="cates-wrap">
      <GroupCate />
    </div>
  </div>
</template>

<style scoped>
.home-cate {
  padding: 20px;
  background: var(--bg-color-container);
}
h5 {
  font-size: 1.5rem;
  margin: 0 0 20px 0;
}

</style>