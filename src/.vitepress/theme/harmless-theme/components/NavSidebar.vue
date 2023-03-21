<template>
  <div class="nav-sidebar" :class="{ show }">
    <div class="item" v-for="item in theme.nav" :key="item.text" :class="{ open: openTexts.has(item.text) }">
      <NavLinkItem :item="item" @click="toggleParentItem(item)" />
      <div v-if="item.items" class="child">
        <div class="child-wrap">
          <NavLinkItem v-for="item in item.items" :key="item.text" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useData } from "vitepress";
import NavLinkItem from './NavLinkItem.vue';
import NavLinkDropdown from "./NavLinkDropdown.vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:show"]);

const { theme } = useData();

const openTexts = ref(new Set());
function toggleParentItem(info) {
  if (!info.items) return
  if (openTexts.value.has(info.text)) {
    openTexts.value.delete(info.text);
  } else {
    openTexts.value.add(info.text);
  }
};
</script>

<style scoped lang="less">
.nav-sidebar {
  position: fixed;
  top: var(--header-height);
  left: 0;
  height: calc(100vh - var(--header-height));
  width: 0;
  background: var(--bg-color-container);
  box-shadow: var(--shadow-1);
  display: flex;
  flex-flow: column nowrap;
  gap: 0.4rem;
  padding: 1rem 0;
  overflow: hidden;
  transition: width 120ms ease-in-out;
  &.show {
    width: 230px;
    @media (min-width: 768px) {
      width: 0px;
    }
  }
  .item {
    padding: 0 1rem;
    white-space: nowrap;
  }
  .nav-link-item {
    height: 40px;
    padding: 0 1rem;
    border-radius: var(--radius-default);
  }
}

.child {
  padding-left: 1.5rem;
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 120ms ease-in-out;
  .child-wrap {
    overflow: hidden;
  }
}
.open {
  .child {
    grid-template-rows: 1fr;
  }
  :deep(.button-arrow) {
    transform: rotate(180deg);
  }
}
</style>