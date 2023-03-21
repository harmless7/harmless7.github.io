<template>
  <div class="nav-sidebar-toggle" :class="{ open }" @click="open = !open">
    <i /><i /><i />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:modelValue"]);

const open = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val)
});
</script>

<style scoped lang="less">
.nav-sidebar-toggle {
  --btn-size: 2.5rem;
  --line-height: 3px;
  height: var(--btn-size);
  width: var(--btn-size);
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-default);
  cursor: pointer;
  &:hover {
    background-color: var(--bg-color-container-hover);
  }
  &:active, &.open {
    background-color: var(--bg-color-container-active);
  }
  > i {
    --trans-time: 100ms
    position: absolute;
    content: "";
    display: block;
    width: calc(100% - 1rem);
    height: var(--line-height);
    background-color: var(--text-color-secondary);
    border-radius: var(--radius-default);
    transition:
      transform var(--trans-time) ease-in-out,
      top var(--trans-time) ease-in-out var(--trans-time),
      opacity var(--trans-time) ease-in-out var(--trans-time);
    &:nth-child(1) {
      top: calc(var(--btn-size) / 4 - var(--line-height) * 3 / 4);
    }
    &:nth-child(3) {
      top: calc(var(--btn-size) / 4 * 3 - var(--line-height) / 4);
    }
  }
  &.open {
    > i {
      transition:
        top var(--trans-time) ease-in-out,
        transform var(--trans-time) ease-in-out var(--trans-time),
        opacity 0s ease-in-out var(--trans-time);
      &:nth-child(1) {
        top: calc(var(--btn-size) / 2 - var(--line-height) / 2);
        transform: rotate(45deg);
      }
      &:nth-child(3) {
        top: calc(var(--btn-size) / 2 - var(--line-height) / 2);
        transform: rotate(-45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
    }
  }
}
</style>