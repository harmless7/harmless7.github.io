import themeConfig from "./themeConfig";

async function getConfig() {
  return {
    // 站点信息
    title: "企鹅反应堆",
    titleTemplate: false,
    description: "harmless_753 个人站点",
    lang: "zh",
    base: "/",
    // 路由
    // cleanUrls: false,
    // rewrites: {
    //   "source/:page": "destination/:page",
    // },
    // 主题配置
    themeConfig,
  }
}

const config = getConfig();

export default config;
