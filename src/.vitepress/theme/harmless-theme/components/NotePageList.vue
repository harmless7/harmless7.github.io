<template>
  <div class="note-page-list">
      <div v-for="(item, i) in theme.posts" :key="i">
        <p class="title">{{ item.frontMatter.title }}</p>
        <p class="date">{{ item.frontMatter.date }}</p>
        <ul class="tag-wrap">
          <li v-for="(tag, tagIndex) in item.frontMatter.tag" :key="tagIndex">{{ tag }}</li>
        </ul>
        <ul class="category-wrap">
          <li v-for="(category, categoryIndex) in item.frontMatter.category" :key="categoryIndex">{{ category }}</li>
        </ul>
        <pre>{{ item }}</pre>
      </div>
  </div>
</template>

<script setup>
import { useData } from "vitepress";

const { theme } = useData();
</script>

<style scoped>
.note-page-list {
}
</style>
