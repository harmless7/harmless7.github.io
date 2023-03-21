<script setup>
import { useData, useRoute } from "vitepress";
import { computed } from "vue";
import { useSidebar } from "../composables/sidebar.js";
import LayoutDocAside from "./LayoutDocAside.vue";
import { usePost } from "../composables/post";
import CateItem from "./CateItem.vue";
import TagItem from "./TagItem.vue";
import dayjs from "dayjs";

const { page } = useData();
const { frontmatter: info } = page.value;

const route = useRoute();
const { hasSidebar, hasAside } = useSidebar();

const pageName = computed(() =>
  route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
);

const { getRandomCover, goDetail } = usePost();

</script>

<template>
  <div
    class="layout-doc"
    :class="{ 'has-sidebar': hasSidebar, 'has-aside': hasAside }"
  >
    <div v-if="hasAside" class="aside">
      <LayoutDocAside></LayoutDocAside>
    </div>

    <div class="content">
      <div class="info">
        <div class="bg-wrap">
          <img v-if="info.cover" :src="info.cover" alt="" class="bg origin-bg">
          <img v-else :src="getRandomCover(info.title)" alt="cover-bg" class="bg" />
        </div>
        <div class="icon">
          <i class="iconfont" :class="`icon-${info?.icon}`"></i>
        </div>
        <div class="title">{{ info?.title }}</div>
        <div class="time">{{ dayjs(info?.date).format("YYYY-MM-DD") }}</div>
        <div class="tag">
          <TagItem v-for="tag in info?.tag" :key="tag" :name="tag" />
        </div>
        <div class="cate">
          <CateItem v-for="cate in info.category" :key="cate" :name="cate" />
        </div>
        <div class="desc">
          {{ info?.description || "无简介" }}
        </div>
      </div>
      
      <Content class="content-wrap" :class="pageName" />
    </div>
  </div>
</template>

<style scoped>
.layout-doc {
  --content-gutter: 40px;
  --doc-top-padding: 40px;
  --doc-bottom-padding: 100px;
  --doc-x-padding: 20px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: start;
  gap: 20px;
  padding-top: var(--doc-top-padding);
  padding-bottom: var(--doc-bottom-padding);
  padding:
    var(--doc-top-padding)
    var(--doc-x-padding)
    var(--doc-bottom-padding)
    var(--doc-x-padding);
}

.content, .aside {
  border-radius: var(--radius-large);
  background: var(--bg-color-container);
  border: 1px solid var(--component-border);
}

.aside {
  order: 2;
  flex-grow: 1;
  width: 100%;
  max-width: 256px;
  position: sticky;
  top: calc(var(--header-height) + var(--doc-top-padding));
  max-height: calc(100vh - var(--doc-bottom-padding) - var(--doc-top-padding));
  min-height: 0px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 20px;
  scrollbar-width: none;
}
.aside::-webkit-scrollbar {
  display: none;
}
@media screen and (max-width: 768px) {
  .aside {
    display: none;
  }
}

.content .info {
  position: relative;
  display: grid;
  grid-template:
    "icon title time" auto
    "tag tag cate" auto
    "desc desc desc" auto
    / auto 1fr auto;
  padding: var(--content-gutter);
  gap: 20px 10px;
  align-items: center;
}
.bg-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  overflow: hidden;
  -webkit-mask : -webkit-gradient(linear, center top, center bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
}
.bg {
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  filter: blur(2px);
}
.icon {
  grid-area: icon;
}
.icon .iconfont {
  font-size: 30px;
}
.title {
  grid-area: title;
  font-size: 1.4rem;
  font-weight: 600;
}
.time {
  grid-area: time;
  color: var(--text-color-secondary);
  justify-self: end;
}
.desc {
  grid-area: desc;
  color: var(--text-color-secondary);
}
.cate {
  grid-area: cate;
}
.cate .cate-item {
  height: 3rem;
  width: 9rem;
  justify-content: center;
}
.tag {
  grid-area: tag;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 5px;
}

.content-wrap {
  padding: 20px var(--content-gutter);
}
</style>
