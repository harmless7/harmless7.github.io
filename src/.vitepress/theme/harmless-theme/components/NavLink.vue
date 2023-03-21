<template>
  <nav class="nav-link">
    <template v-if="theme.nav">
      <div class="item" v-for="item in theme.nav" :key="item.text">
        <NavLinkItem v-if="!item.items" :item="item" />
        <NavLinkDropdown v-else :item="item">
          <NavLinkItem :item="item" />
        </NavLinkDropdown>
      </div>
    </template>
  </nav>
</template>

<script setup>
import { useData } from "vitepress";
import NavLinkItem from "./NavLinkItem.vue";
import NavLinkDropdown from "./NavLinkDropdown.vue";

const { theme } = useData();
</script>

<style scoped>
.nav-link {
  border-bottom: 1px solid var(--border-level-1-color);
}
.item .nav-link-item {
  padding: 5px 10px;
  border-radius: var(--radius-default);
}
@media (min-width: 768px) {
  .nav-link {
    display: flex;
    align-items: center;
    border-bottom: 0;
    gap: 1rem;
  }
}
</style>