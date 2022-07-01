import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "企鹅反应堆",
  description: "mostly harmless",

  base: "/",

  plugins: [
    searchPlugin({}),
  ],

  theme,
});
