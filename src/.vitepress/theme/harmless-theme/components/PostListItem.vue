<script setup>
import { useRouter, withBase } from "vitepress";
import seedrandom from "seedrandom";
import { usePost } from "../composables/post";
import dayjs from "dayjs";
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      data: {
        cover: "",
        category: [],
        title: "",
        date: "",
        tag: [],
        icon: "",
        iconColor: "",
      }
    }),
  },
});

const router = useRouter();

// function getRandomCover() {
//   const rng = seedrandom(props.item?.data.title);
//   return `/images/cover_${Math.ceil(rng() * 12)}.svg`;
// }

// function goDetail() {
//   router.go(props.item.file.replace(/(src|.md)/g, ""));
// }

const { getRandomCover, goDetail } = usePost();

const iconC = computed(() => props.item.data.iconColor || "var(--text-color-primary)");
</script>

<template>
  <div class="post-list-item" @click="goDetail(item.file)">
    <div class="cover">
      <img v-if="item?.data.cover" :src="item?.data.cover" alt="" class="bg origin-bg">
      <img v-else :src="getRandomCover(item.data.title)" alt="cover-bg" class="bg" />
      <i class="icon iconfont" :class="`icon-${item?.data.icon}`" />
    </div>
    <div class="cates">
      <span v-for="cate in item?.data?.category">
        {{ cate }}
      </span>
    </div>
    <div class="title">{{ item?.data.title }}</div>
    <div class="time">{{ dayjs(item?.data.date).format("YYYY-MM-DD") }}</div>
    <div class="tags">
      <span v-for="tag in item?.data?.tag">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.post-list-item {
  --gutter: 20px;
  background: var(--bg-color-container);
  overflow: hidden;
  display: grid;
  grid-template:
    "cover ... ... ..." 0px
    "cover cates cates ..." auto
    "cover title title ..." 1fr
    "cover tags time ..." auto
    "cover ... ... ..." 0px
    / 230px 1fr auto var(--gutter);
  gap: var(--gutter);
  border-radius: var(--radius-large);
  border: 1px solid var(--component-border);
  transition: all 120ms ease-in-out;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .post-list-item {
    grid-template:
      "cover cover cover cover" auto
      "... cates cates ..." auto
      "... title title ..." 1fr
      "... tags time ..." auto
      "... ... ... ..." 0px
      / var(--gutter) 1fr auto var(--gutter);
  }
}
.post-list-item .cover {
  grid-area: cover;
}
.post-list-item .cates {
  grid-area: cates;
}
.post-list-item .title {
  grid-area: title;
}
.post-list-item .tags {
  grid-area: tags;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.post-list-item .tags span {
  display: inline-block;
  flex: none;
}
.post-list-item .time {
  grid-area: time;
}
.post-list-item:hover {
  border-color: var(--brand-color);
  box-shadow: var(--shadow-1);
}
.post-list-item .cover {
  grid-area: cover;
  height: 185.4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.post-list-item .cover .bg {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: all 200ms ease-in-out;
  position: absolute;
}
.origin-bg {
  filter: blur(1px);
}
.post-list-item:hover > .cover .bg {
  transform: scale(1.1);
  filter: blur(2px);
}
.post-list-item .cover .icon {
  position: absolute;
  font-size: 5rem;
  color: v-bind(iconC);
  transition: all 200ms ease-in-out;
}
.post-list-item:hover > .cover .icon {
  transform: scale(1.3);
}
.post-list-item .cates {
  grid-area: cates;
  display: flex;
  gap: 5px;
  color: var(--text-color-secondary);
  font-size: 0.8rem;
}
.post-list-item .title {
  grid-area: title;
  color: var(--text-color-primary);
  font-size: 1.2rem;
  font-weight: 600;
}
.post-list-item .tags {
  grid-area: tags;
  display: flex;
  gap: 15px;
  color: var(--text-color-secondary);
  font-size: 0.8rem;
  line-height: 0.8rem;
}
.post-list-item .tags span::before {
  content: "#";
  color: var(--text-color-disabled);
  margin-right: 3px;
}
.post-list-item .time {
  grid-area: time;
  color: var(--text-color-secondary);
  font-size: 0.8rem;
}

.post-list-item .cates span,
.post-list-item .title,
.post-list-item .tags span {
  cursor: pointer;
  transition: all 120ms ease-in-out;
}
.post-list-item .cates span:hover,
.post-list-item .title:hover,
.post-list-item .tags span:hover {
  color: var(--text-color-link);
}
</style>