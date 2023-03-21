<script setup>
import { ref, computed, watch } from "vue";
import { useOffsetPagination, useUrlSearchParams } from "@vueuse/core";

const searchData = useUrlSearchParams("history");

const props = defineProps({
  modelValue: {
    type: Number,
    default: null,
  },
  limit: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
});
const emits = defineEmits(["update:modelValue"]);

const currentPage = computed({
  get() {
    return  props.modelValue !== null ? props.modelValue : 1;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

const {
  currentPage: page,
  currentPageSize: limit,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: props.total,
  page: currentPage.value,
  pageSize: props.limit,
});

const rangeStart = computed(() => page.value - 1);
const rangeEnd = computed(() => pageCount.value - page.value);

function jumpPage(num) {
  this.page = num;
}

watch(page, () => {
  let { origin, pathname, search } = new URL(window.location.href);
  let params = new URLSearchParams(search.slice(1));
  params.set("page", page.value);
  window.location.href = `${origin}${pathname}?${params}`;
});
</script>

<template>
  <div class="pagination">
    <div class="prev-btn" v-if="!isFirstPage" @click="prev">
      <i class="iconfont icon-xiangzuo1" />
    </div>
    <ul class="page-numbers">
      <li
        v-if="rangeStart >= 3"
        class="num"
        :class="{ active: num === page }"
        @click="jumpPage(1)"
      >
        1
      </li>
      <li v-if="rangeStart > 3"><i class="iconfont icon-gengduo"></i></li>
      <template v-for="num in pageCount" :key="num">
        <li
          class="num"
          :class="{ active: num === page }"
          @click="jumpPage(num)"
          v-if="Math.abs(page - num) < 3"
        >
          {{ num }}
        </li>
      </template>
      <li v-if="rangeEnd > 3"><i class="iconfont icon-gengduo"></i></li>
      <li
        v-if="rangeEnd >= 3"
        class="num"
        :class="{ active: num === page }"
        @click="jumpPage(pageCount)"
      >
        {{ pageCount }}
      </li>
    </ul>
    <div class="next-btn" v-if="!isLastPage" @click="next">
      <i class="iconfont icon-xiangyou1"></i>
    </div>
  </div>
</template>

<style scoped lang="less">
.pagination {
  display: grid;
  gap: 20px;
  grid-template: 40px / 80px 1fr 80px;
  grid-template-areas: "prev numbers next";
  justify-items: center;
  user-select: none;
  .prev-btn {
    width: 80px;
    grid-area: prev;
  }
  .page-numbers {
    grid-area: numbers;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .next-btn {
    width: 80px;
    grid-area: next;
  }
  .iconfont {
    font-size: 24px;
  }
}
.prev-btn, .next-btn, .num {
  height: 40px;
  width: 40px;
  padding: 10px;
  border-radius: var(--radius-default);
  border: 1px solid var(--border-level-1-color);
  background: var(--bg-color-container);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border-color: var(--brand-color);
    background: var(--bg-color-container-hover);
    box-shadow: var(--shadow-1);
  }
  &:active {
    border-color: var(--brand-color-active);
    background: var(--bg-color-container-active);
  }
  &.active {
    color: var(--text-color-anti);
    background: var(--brand-color);
    border-color: transparent;
    cursor: initial;
  }
}
</style>
