import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/home",
  // { text: "使用指南", icon: "creative", link: "/guide/" },
  {
    text: "文章",
    icon: "edit",
    prefix: "/posts/",
    link: "/article/"
  },
  {
    text: "主题文档",
    icon: "note",
    link: "https://vuepress-theme-hope.github.io/v2/zh/",
  },
]);
