import { Page } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
  hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

  author: {
    name: "基本上无害",
    url: "https://mrhope.site",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  docsDir: "demo/src",

  // navbar
  navbar: navbar,
  navbarLayout: {
    left: ["Brand"],
    // center: ["Links"],
    center: [],
    right: ["Search", "Outlook", "Repo"]
  },
  fullscreen: true, // 全屏
  // 仓库
  repo: "mostly_harmless/mostly_harmless",
  repoLabel: "Gitee",
  repoDisplay: true,
  backToTop: true, // 回到顶部
  // 主题色
  themeColor: {
    cyan: "#0594fa",
    purple: "#834ec2",
    green: "#00a870",
    yellow: "#ebb105",
    orange: "#ed7b2f",
    pink: "#ed49b4",
    red: "#e34d59",
  },

  // sidebar 侧边栏
  sidebar: sidebar,

  // 页脚
  displayFooter: true,
  footer: "",

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    avatar: "/avatar.jpg",
    roundAvatar: true,
    description: "",
    intro: "/intro.html",
    medias: {
      // Baidu: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      // Email: "https://example.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      // GitHub: "https://example.com",
      // Gitlab: "https://example.com",
      // Gmail: "https://example.com",
      // Instagram: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
    },
  },

  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
      filter: (page: Page) => {
        return Boolean(page.filePathRelative) && !page.frontmatter.home && !page.frontmatter.notArticle;
      }
    },

    mdEnhance: {
      // enableAll: true,
      // flowchart: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },

  // 页面元数据
  lastUpdated: false,
  contributors: false,
  editLink: false,
});
