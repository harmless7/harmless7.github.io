<template>
  <div class="nav-theme-tabs" @click="toggleMode">
    <div class="tabs-block" :style="`left: ${mode === 'light' ? '2px' : '50%'}`" />
    <div class="item" :class="{ active: mode === 'light' }">
      <IconLight class="icon light" />
    </div>
    <div class="item" :class="{ active: mode === 'dark' }">
      <IconDark class="icon dark" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import IconLight from './icon/IconLight.vue';
import IconDark from './icon/IconDark.vue';

const mode = ref("light");
function changeMode(val) {
  mode.value = val;
  localStorage.setItem("theme-mode", val);
  document.documentElement.setAttribute("theme-mode", val);
  if (val === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
function toggleMode() {
  changeMode(mode.value === "light" ? "dark" : "light");
}
onMounted(() => {
  changeMode(localStorage.getItem("theme-mode") || "light");
});

</script>

<style scoped lang="less">
.nav-theme-tabs {
  min-width: 60px;
  width: 100%;
  height: 32px;
  padding: 2px;
  box-sizing: border-box;
  border-radius: var(--radius-default);
  background: var(--bg-color-component);
  position: relative;
  display: flex;
  justify-content: space-between;
  .tabs-block {
    background-color: var(--bg-color-tab-select);
    box-shadow: rgba(0, 0, 0, 15%) 0px 2px 4px;
    position: absolute;
    height: calc(100% - 4px);
    transition: all var(--anim-time-fn-easing) var(--anim-duration-moderate);
    border-radius: var(--radius-default);
    // width: 28px;
    width: calc(50% - 2px);
    transition: all 0.2s linear 0s;
  }
  .item {
    width: 50%;
    height: 28px;
    padding: 4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    color: var(--text-color-disabled);
    position: relative;
    cursor: pointer;
    &:hover:not(.active) {
      color: var(--text-color-secondary);
    }
    .icon {
      width: 16px;
      height: 16px;
      pointer-events: none;
    }
    &.active {
      .light {
        color: rgb(255, 189, 46);
      }
    }
    &.active {
      .dark {
        color: rgb(255, 255, 255);
      }
    }
  }
}
</style>