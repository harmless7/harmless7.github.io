<template>
  <a class="nav-link-item" v-bind="linkProps">
    {{ item.text }}
    <IconExternal class="icon" v-if="isExternal" />
    <IconArrowDown v-if="isParent" class="icon button-arrow" />
  </a>
</template>

<script setup>
import { toRefs } from 'vue';
import { useNavLink } from "../composables/navLink";
import IconExternal from "./icon/IconExternal.vue";
import IconArrowDown from "./icon/IconArrowDown.vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const propsRefs = toRefs(props);

const { props: linkProps, isExternal, isParent } = useNavLink(propsRefs.item);
</script>

<style scoped lang="less">
.nav-link-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 200ms ease-in-out;
  user-select: none;
  color: var(--text-color-primary);
  &:active {
    background: var(--bg-color-container-active);
  }
  &:hover {
    background: var(--bg-color-container-hover);
  }
  &.active {
    background: var(--brand-color);
    color: white;
  }
  .icon {
    margin-left: auto;
    width: 0.9rem;
    height: 0.9rem;
    fill: var(--text-color-secondary);
  }
  .button-arrow {
    fill: var(--text-color-secondary);
    transition: transform 120ms ease-in-out;
  }
}
</style>