<script setup>
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear"
import isLeapYear from "dayjs/plugin/isLeapYear"
import SignDateSingle from "./SignDateSingle.vue";

dayjs.extend(dayOfYear);
dayjs.extend(isLeapYear);

const year = dayjs().year();
const allDateNum = dayjs().isLeapYear() ? 366 : 365;
</script>

<template>
  <div class="home-sign">
    <div class="month-wrap">
      <div class="month-single" v-for="month in 12" :key="month">
        <span>{{ dayjs().month(month - 1).format("MM") }}</span>
        <div class="date-wrap">
          <template
            v-for="item in dayjs()
              .month(month - 1)
              .daysInMonth()"
            :key="item"
          >
            <SignDateSingle :date="dayjs(new Date(year, month - 1, item)).format('YYYY-MM-DD')" />
          </template>
        </div>
      </div>
    </div>
    <div class="total">
      <p>距本月结束还有 <span>{{ dayjs().endOf("month").dayOfYear() - dayjs().dayOfYear() }}</span> 天</p>
      <p>{{ year }} 年已消耗 <span>{{ (dayjs().dayOfYear() / allDateNum * 100).toFixed(2) }} %</span></p>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-sign {
  height: 100%;
  background: var(--bg-color-container);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
p {
  margin: 0;
  font-size: 1rem;
  color: var(--text-color-secondary);
}
.month-wrap {
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  .month-single {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 5px;
    & > span {
      font-size: 12px;
    }
    .date-wrap {
      width: 100%;
      display: grid;
      grid-auto-columns: min-content;
      grid-template-rows: repeat(14, auto);
      grid-auto-flow: column;
      gap: 2px;
    }
  }
}
.total {
  display: flex;
  gap: 20px;
  p {
    font-size: 14px;
    color: var(--text-color-secondary);
  }
  span {
    color: var(--text-color-primary);
    font-weight: 600;
  }
}
</style>
