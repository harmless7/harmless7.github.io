<script setup>
import { useData, useRoute } from "vitepress"
// import { useSidebar } from "../composables/sidebar.js"
import LayoutPage from "./LayoutPage.vue"
import LayoutHome from "./LayoutHome.vue"
import LayoutDoc from "./LayoutDoc.vue"
import { inject } from "vue"

const route = useRoute()
const { frontmatter } = useData()
// const { hasSidebar } = useSidebar()

const NotFound = inject("NotFound")
</script>

<template>
  <div
    class="layout-content"
    id="layout-content"
    :class="{
      // 'has-sidebar': hasSidebar,
      'is-home': frontmatter.layout === 'home'
    }"
  >
    <NotFound v-if="route.component === NotFound" />

    <!-- 首页 -->
    <LayoutHome v-else-if="frontmatter.layout === 'home'"></LayoutHome>

    <!-- 展示页 -->
    <LayoutPage v-else-if="frontmatter.layout === 'page'" />

    <!-- 文章详情 -->
    <LayoutDoc v-else>
      <template #doc-footer-before><slot name="doc-footer-before" /></template>
      <template #doc-before><slot name="doc-before" /></template>
      <template #doc-after><slot name="doc-after" /></template>

      <template #aside-top><slot name="aside-top" /></template>
      <template #aside-outline-before><slot name="aside-outline-before" /></template>
      <template #aside-outline-after><slot name="aside-outline-after" /></template>
      <template #aside-ads-before><slot name="aside-ads-before" /></template>
      <template #aside-ads-after><slot name="aside-ads-after" /></template>
      <template #aside-bottom><slot name="aside-bottom" /></template>
    </LayoutDoc>
  </div>
</template>

<style scoped>
.layout-content {
  flex-grow: 1;
  flex-shrink: 0;
  margin: var(--vp-layout-top-height, 0px) auto 0;
  width: 100%;
}

.layout-content.is-home {
  width: 100%;
  max-width: 100%;
}

.layout-content.has-sidebar {
  margin: 0;
}

@media (min-width: 960px) {
  .layout-content {
    /* padding-top: var(--header-height); */
    /* padding: var(--header-height) 0; */
  }

  .layout-content.has-sidebar {
    margin: var(--vp-layout-top-height, 0px) 0 0;
    padding-left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .layout-content.has-sidebar {
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
    padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width));
  }
}
</style>
