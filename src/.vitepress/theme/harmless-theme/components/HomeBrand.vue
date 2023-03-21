<script setup>
import { ref } from 'vue';
import { withBase } from 'vitepress';
import { usePost } from '../composables/post';
import { data } from '../../../utils/posts.data';
import IconRight from "./icon/iconRight.vue";

const posts = usePost();

const rows = ref(2);
const list = ref([
  { icon: "/images/icon_css3.svg", bg: "#2C51DB" },
  { icon: "/images/icon_html5.svg", bg: "#E9572B" },
  { icon: "/images/icon_javascript.svg", bg: "#F7CB4F" },
  { icon: "/images/icon_github.svg", bg: "#161B22" },
  { icon: "/images/icon_photoshop.svg", bg: "#4082c3" },
  { icon: "/images/icon_linux.svg" },
  { icon: "/images/icon_git.svg", bg: "#DF5B40" },
  { icon: "/images/icon_vue.svg", bg: "#2F8460" },
  { icon: "/images/icon_arknights.png", bg: "#0E0E0E" },
  { icon: "/images/icon_fgo.png", bg: "#6593CC" },
  { icon: "/images/icon_davinci.svg", bg: "#262626" },
  { icon: "/images/icon_switch.svg", bg: "#E70013" },
  { icon: "/images/icon_steam.svg", bg: "linear-gradient(#07172A,#0B84B5)" },
  { icon: "/images/icon_php.svg", bg: "#787DB0" },
  { icon: "/images/icon_music.svg", bg: "#DAC9A6" },
  { icon: "/images/icon_bilibili.svg", bg: "#EC5D85" },
  { icon: "/images/icon_anki.png", bg: "white" },
  { icon: "/logo_w.svg", bg: "var(--brand-color)" },
]);
</script>

<template>
  <div class="home-brand">
    <div class="home-brand-title">
      <p>嚎啕入荒原</p>
      <p>狂呼暴风雨</p>
      <span>harmless blog</span>
    </div>
    <div class="home-brand-wrap">
      <div class="icons-wrap">
        <template v-for="replay of 2">
          <div class="icon-column" v-for="colIndex of Math.ceil(list.length / rows)" :key="colIndex">
            <div
              class="icon"
              v-for="(item, i) in list.slice((colIndex - 1) * rows, (colIndex - 1) * rows + rows)"
              :key="i"
              :style="{background: item?.bg || 'white'}"
            >
              <img :src="withBase(item.icon)" />
            </div>
          </div>
        </template>
      </div>
    </div>
    <a class="brand-hover" @click="posts.goDetail(data[Math.ceil(Math.random()*data.length)]?.file)">
      <p class="text">随便逛逛</p>
      <IconRight class="icon text" />
    </a>
  </div>
</template>

<style scoped>
@keyframes rowup {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(-50%);
  }
}
.home-brand {
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
  height: 100%;
  background: var(--bg-color-container);
  position: relative;
}
.home-brand:active {
  opacity: 0.8;
}
.home-brand-title {
  position: absolute;
  top: 2rem;
  left: 1.5rem;
  color: var(--text-color-primary);
  line-height: 1.2;
}
.home-brand-title p {
  margin: 0;
  font-weight: 600;
  font-size: 2.3rem;
}
.home-brand-title span {
  display: block;
  font-weight: 400;
  font-size: 0.9rem;
  margin-top: 1rem;
}
.home-brand-wrap {
  --icon-size: 120px;
  --gutter: 10px;
  /* align-self: end; */
  transform-origin: 0% 50%;
  transform: translateY(300px) rotate(-20deg);
}
.icons-wrap {
  display: flex;
  flex-flow: row nowrap;
  gap: var(--gutter);
  animation: rowup 60s linear infinite;
}
.icon-column {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gutter);
}
.icon-column .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: 30px;
  background: var(--bg-color-secondarycontainer);
  box-shadow: var(--shadow-3);
}
.icon-column .icon img {
  width: calc(var(--icon-size) - 50px);
}
.icon-column .icon:nth-child(2) {
  transform: translateX(calc(var(--icon-size) / -2));
}
.icon-column .icon:nth-child(3) {
  transform: translateX(var(--icon-size));
}
.brand-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  padding-left: 2rem;
  background: var(--brand-color-op);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  transition: all 200ms ease-in-out;
  background-size: 200%;
  cursor: pointer;
}
.home-brand:hover .brand-hover {
  opacity: 1;
}
.brand-hover > * {
  transform: translateX(-150px);
  transition: all 200ms ease-in-out;
}
.home-brand:hover .brand-hover > * {
  transform: translateX(0px);
}
.brand-hover p {
  margin: 0;
  font-size: 4.5rem;
  font-weight: 600;
  color: var(--font-white-1);
  margin-top: 30px;
}
.brand-hover .icon {
  background: transparent;
  height: 5rem;
  width: 5rem;
  color: var(--font-white-3);
  position: relative;
  left: -5px;
}
</style>