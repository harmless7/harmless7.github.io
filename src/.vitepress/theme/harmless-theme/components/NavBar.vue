<template>
  <header class="nav-bar">
    <!-- 侧边导航 -->
    <NavSidebar v-model:show="openSideBar" />
    <NavSidebarToggle v-model="openSideBar" />
    <!-- 标题 -->
    <NavBarTitle />
    <!-- 导航链接 -->
    <NavLink />
    <!-- 昼夜切换 -->
    <NavThemeTabs />
  </header>
</template>

<script setup>
import { ref } from 'vue';
import NavSidebarToggle from './NavSidebarToggle.vue';
import NavSidebar from './NavSidebar.vue';
import NavBarTitle from './NavBarTitle.vue';
import NavLink from './NavLink.vue';
import NavThemeTabs from './NavThemeTabs.vue';

const openSideBar = ref(false);
</script>

<style scoped lang="less">

.nav-bar {
  --navbar-bg: var(--bg-color-container);
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--z-index-navbar);
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr) 60px;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid var;
  padding: 0 2.5rem;
  box-sizing: border-box;
  height: var(--header-height);
  background-color: var(--navbar-bg);
  box-shadow: var(--shadow-inset-bottom);
  transition: grid-grid-template-columns 120ms ease-in-out;
  .nav-sidebar-toggle {
    grid-column: 1;
    width: 0;
    transition: width 120ms ease-in-out;
    @media (max-width: 768px) {
      width: 40px;
    }
  }
  .nav-sidebar {
    grid-row: 2;
  }
  .nav-bar-title {
    grid-row: 1;
    grid-column: 2;
    @media (max-width: 768px) {
      grid-column: 2 / span 3;
    }
  }
  .nav-link {
    justify-self: end;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .nav-theme-tabs {
    grid-row: 1;
    grid-column: 4;
  }
}
</style>