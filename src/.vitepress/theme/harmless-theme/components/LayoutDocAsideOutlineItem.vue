<script setup>
const props = defineProps({
  headers: {
    type: Array,
    default: () => ([]),
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  root: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <ul class="layout-doc-aside-outline-item" :class="root ? 'root' : 'nested'">
    <li v-for="{ children, link, title } in headers">
      <a class="outline-link" :href="link" @click="onClick">{{ title }}</a>
      <LayoutDocAsideOutlineItem :headers="children" :onClick="onClick" />
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
}

ul {
  list-style: none;
}

.nested {
  padding-left: 13px;
}

.outline-link {
  display: block;
  line-height: 28px;
  color: var(--text-color-placeholder);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
}

.outline-link:hover,
.outline-link.active {
  color: var(--text-color-primary);
  font-weight: 600;
  transition: all 250ms;
}

.outline-link.nested {
  padding-left: 13px;
}
</style>