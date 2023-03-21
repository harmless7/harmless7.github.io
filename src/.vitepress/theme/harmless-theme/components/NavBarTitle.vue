<template>
  <a
    class="nav-bar-title"
    href="/"
    :aria-label="`${site.title}, back to home`"
  >
    <div class="logo">
      <img
        v-if="theme.logo"
        :src="theme.logo"
        alt="Logo"
      />
    </div>
    {{ site.title }}
  </a>
</template>

<script setup>
import { withBase, useData } from "vitepress";
const { site, theme, localePath } = useData();
</script>

<style scoped>
.nav-bar-title {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;
  background: -webkit-linear-gradient(315deg, var(--brand-color), var(--brand-color-active));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  gap: 0.4rem;
}
.nav-bar-title:hover {
  text-decoration: none;
}
.logo {
  height: 2rem;
  width: 2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo img {
  height: 100%;
  height: 100%;
  transform: translateX(100px);
  filter: drop-shadow(-100px 0px 0px var(--brand-color));
}
</style>