<script setup>
import { useCate } from "../composables/cate";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  num: {
    type: Number,
    default: 0,
  },
});
const emits = defineEmits(["clickItem"]);

const cates = {
  "读书笔记": "/images/生活场景-阅读.svg",
  "技术学习": "/images/生活场景-看电脑.svg",
  "观后感": "/images/生活场景-看电视.svg",
};

const { goPage } = useCate();
</script>

<template>
  <div class="cate-item" @click="goPage(name);emits('clickItem')">
    <img class="img" :src="cates[name]" />
    <div class="name">{{ name }}</div>
    <div class="num" v-if="num">{{ num }}</div>
  </div>
</template>

<style scoped>
.cate-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--component-stroke);
  border-radius: var(--radius-default);
  padding: 10px 20px;
  /* height: 2rem; */
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 120ms ease-in-out;
  user-select: none;
}
.cate-item:hover {
  border-color: var(--brand-color);
}
.cate-item:active {
  opacity: 0.8;
}
.img {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 0;
  transition: transform 240ms ease-in-out;
}
.cate-item:hover .img {
  transform: scale(0.9);
}
.cate-item::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-color-container);
  opacity: 0.8;
  z-index: 1;
  transition: background 240ms ease-in-out;
}
.cate-item:hover::before {
  background: var(--brand-color);
  opacity: 0.4;
}
.name {
  z-index: 1;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 240ms ease-in-out;
}
.cate-item:hover .name {
  font-size: 1.3rem;
  color: var(--text-color-anti);
}
.num {
  z-index: 1;
  color: var(--text-color-secondary);
  font-weight: 600;
  transition: all 240ms ease-in-out;
}
.cate-item:hover .num {
  color: var(--text-color-anti);
}
</style>