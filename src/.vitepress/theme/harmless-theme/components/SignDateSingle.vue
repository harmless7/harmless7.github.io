<script setup>
import dayjs from 'dayjs';
import { ref, computed, onMounted } from 'vue';
import { useElementHover, useElementBounding } from "@vueuse/core";
import yearData from "../../../../sign/2023";

const props = defineProps({
  date: {
    type: String,
    default: "",
  },
});

const singleRef = ref(null);
const { left, top } = useElementBounding(singleRef);
const isHover = useElementHover(singleRef);

const djDate = computed(() => dayjs(props.date));

const show = ref(false);
onMounted(() => {
  show.value = true;
});

const info = computed(() => yearData?.[props.date] || false);
const level = computed(() => {
  return Math.min(3, Object.keys(info.value)?.length || 0);
});

const singleClass = computed(() => ({
  before: djDate.value.isBefore(dayjs()),
  today: djDate.value.isSame(dayjs(), "day"),
}));
</script>

<template>
  <div class="sign-date-single" ref="singleRef" v-if="show">
    <div class="date-single" :class="singleClass, `level-${level}`" />
    <Teleport to="#popup-wrapper">
      <div class="date-popup" v-if="isHover">
        <p class="date">{{ date }}</p>
        <div v-if="info" class="date-work">
          <p v-if="info.sport">
            运动<span v-if="typeof info.sport === 'string'">：{{ info.sport }}</span>
          </p>
          <p v-if="info.read">
            阅读<span v-if="typeof info.read === 'string'">：{{ info.read }}</span>
          </p>
          <p v-if="info.another">
            <span v-if="typeof info.another === 'string'">{{ info.another }}</span>
          </p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="less">
.sign-date-single {
  position: relative;
  cursor: initial;
}
.date-single {
  height: 10px;
  width: 10px;
  background: var(--bg-color-component);
  border-radius: var(--radius-default);
  border: 1px solid var(--text-color-disabled);
  transition: all 120ms ease-in-out;
  &.before {
    border-color: transparent;
  }
  &.today {
    // border: 2px solid var(--success-color-5);
    background: var(--success-color-5);
  }
  &:hover {
    transform: scale(1.4);
    box-shadow: var(--shadow-3);
  }
}
.date-popup {
  position: fixed;
  opacity: 1;
  min-width: 120px;
  background: var(--bg-color-container);
  padding: 10px;
  font-size: 12px;
  cursor: initial;
  position: fixed;
  left: v-bind("left + 10 + 'px'");
  top: v-bind("top + 10 + 'px'");
  box-shadow: var(--shadow-1);
  display: flex;
  flex-flow: column;
  gap: 5px;
  p {
    padding: 0;
    margin: 0;
  }
  .date {
    font-size: 14px;
    font-weight: 600;
  }
  .date-work {
    display: flex;
    gap: 5px;
    p {
      background: var(--brand-color);
      padding: 2px 4px;
      border-radius: var(--radius-default);
      color: var(--text-color-anti);
    }
  }
}
.level-1 {
  background: var(--brand-color-5);
}
.level-2 {
  background: var(--brand-color-6);
}
.level-3 {
  background: var(--brand-color-7);
}
</style>