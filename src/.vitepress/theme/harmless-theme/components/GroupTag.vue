<script setup>
import TagItem from './TagItem.vue';
import { data } from '../../../utils/catesandtags.data';

const emits = defineEmits(["click-item"]);
</script>

<template>
  <div class="group-tag">
    <TagItem v-for="(tag, i) in data.tag" :key="i" v-bind="tag" @click-item="emits('click-item')" />
  </div>
</template>

<style scoped lang="less">
.group-tag {
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
}
</style>