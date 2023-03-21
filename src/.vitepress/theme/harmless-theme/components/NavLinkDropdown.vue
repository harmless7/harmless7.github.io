<template>
  <div
    class="nav-link-dropdown"
    :class="{ open }"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <slot></slot>

    <div class="dialog">
      <ul>
        <li class="dialog-item" v-for="item in item.items" :key="item.text">
          <NavLinkItem :item="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vitepress";
import IconArrowDown from "./icon/IconArrowDown.vue";
import NavLinkItem from "./NavLinkItem.vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  }
});

const route = useRoute();

const open = ref(false);

watch(
  () => route.path,
  () => {
    open.value = false;
  },
);

function onMouseOver() {
  open.value = true
}

function onMouseLeave() {
  open.value = false;
}
</script>

<style scoped lang="less">
.nav-link-dropdown {
  position: relative;
  cursor: pointer;
  &.open:deep(.button-arrow) {
    transform: rotate(180deg);
  }
}
.dialog {
  position: absolute;
  top: 32px;
  right: -8px;
  min-width: 128px;
  border-radius: var(--radius-default);
  background: var(--bg-color-container);
  box-shadow: var(--shadow-1);
  display: grid;
  grid-template-rows: 0fr;
  transition: all 120ms ease-in-out 100ms;
  overflow: hidden;
  & > ul {
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
  }
  & .nav-link-item {
    padding: 0.7rem 0.5rem;
  }
}
.open .dialog {
  grid-template-rows: 1fr;
}
</style>