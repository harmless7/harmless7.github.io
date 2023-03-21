import harmlessTheme from "./harmless-theme";
// import NotePageList from "./components/NotePageList.vue";

export default {
  ...harmlessTheme,
  enhanceApp({ app }) {
    // 全局组件
    // app.component("NotePageList", NotePageList); // 笔记列表
  },
};
