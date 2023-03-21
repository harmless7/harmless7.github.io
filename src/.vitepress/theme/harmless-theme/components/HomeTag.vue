<script setup>
import groupTag from './groupTag.vue';
</script>

<template>
  <div class="home-tag">
    <h5>标签</h5>
    <div class="tags-wrap">
      <groupTag />
    </div>
  </div>
</template>

<style scoped>
.home-tag {
  padding: 20px;
  background: var(--bg-color-container);
}
h5 {
  font-size: 1.5rem;
  margin: 0 0 20px 0;
}
</style>