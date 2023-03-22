<template>
  <div class="harmless-theme">
    <NavBar />
    <main>
      <div class="container">
        <LayoutContent />
      </div>
    </main>
  </div>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import LayoutContent from "./LayoutContent.vue";
import { onMounted } from "vue";

onMounted(() => {
  let el = document.createElement("div");
  el.style.zIndex = 2023;
  el.id = "popup-wrapper"
  document.body.append(el);
});
</script>

<style scoped lang="less">
main {
  // padding-top: var(--header-height);
  background: var(--bg-color-page);
}
.container {
  box-sizing: border-box;
  max-width: 1400px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding: 0 1.5rem;
  }
}
</style>