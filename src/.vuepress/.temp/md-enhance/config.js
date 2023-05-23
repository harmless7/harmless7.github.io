import { defineClientConfig } from "@vuepress/client";
import FlowChart from "D:/coding/harmless7.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart";
import Presentation from "D:/coding/harmless7.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation";
import "D:/coding/harmless7.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("FlowChart", FlowChart);
    app.component("Presentation", Presentation);
    
  }
});