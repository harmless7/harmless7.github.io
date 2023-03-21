<script setup>
import { useData } from "vitepress";
import { ref, computed } from "vue";
import { resolveHeaders, useActiveAnchor } from "../composables/outline";
import LayoutDocAsideOutlineItem from "./LayoutDocAsideOutlineItem.vue";

const { frontmatter, page, theme } = useData();

const headers = computed(() => {
  return resolveHeaders(
    page.value?.headers,
    frontmatter.value.outline ?? theme.value.outline
  );
});
const hasOutline = computed(() => headers.value.length > 0)

const container = ref();
const marker = ref();

useActiveAnchor(container, marker);

function handleClick({ target: el }) {
  const id = '#' + el.href?.split('#')[1];
  const heading = document.querySelector(decodeURIComponent(id));
  heading?.focus();
}
</script>

<template>
  <div class="layout-doc-aside-outline" :class="{ hasOutline }" ref="container">
    <div class="outline-wrap">
      <div class="outline-marker" ref="marker" />
  
      <div class="outline-title">
        {{
          (typeof theme.outline === "object" &&
            !Array.isArray(theme.outline) &&
            theme.outline.label) ||
          theme.outlineTitle ||
          "本页目录"
        }}
      </div>
  
      <nav>
        <LayoutDocAsideOutlineItem :headers="headers" :onClick="handleClick" root />
      </nav>
    </div>
  </div>
</template>

<style scoped>
.layout-doc-aside-outline {
  display: none;
}
.hasOutline {
  display: block;
}

.outline-wrap {
  position: relative;
  /* border-left: 1px solid var(--component-stroke); */
  /* padding-left: 16px; */
  font-size: 13px;
  font-weight: 500;
}

.outline-marker {
  display: none;
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;
  opacity: 0;
  width: 1px;
  height: 18px;
  background-color: var(--brand-color);
  transition: top 0.25s cubic-bezier(0, 1, 0.5, 1), background-color 0.5s, opacity 0.25s;
}

.outline-title {
  letter-spacing: 0.4px;
  line-height: 28px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color-brand);
}
</style>