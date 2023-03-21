<script setup>
import CateItem from './CateItem.vue';
import { data } from '../../../utils/catesandtags.data';

const emits = defineEmits(["clickItem"]);
</script>

<template>
  <div class="group-cate">
    <CateItem v-for="(cate, i) in data.cate" :key="i" v-bind="cate" @click-item="emits('clickItem')" />
  </div>
</template>

<style scoped lang="less">
.group-cate {
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
}
</style>