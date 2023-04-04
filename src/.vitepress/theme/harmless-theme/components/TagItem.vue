<script setup>
import { computed } from 'vue';
import { useTag } from '../composables/tag';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  num: {
    type: [String, Number],
    default: ""
  },
});
const emits = defineEmits(["click-item"]);

const icons = {
  "icon-bug": [ "bug", "BUG", "Bug", "故障", "debug", "DEBUG" ],
  "icon-douyin": [ "抖音" ],
  "icon-bilibili": [ "逼站", "b站", "bilibili" ],
  "icon-zhihu": [ "知乎" ],
  "icon-qq": [ "QQ", "qq", "鹅厂", "企鹅" ],
  "icon-git": [ "git", "GIT" ],
  "icon-regexp": [ "正则", "正则表达式", "regexp" ],
  "icon-eslint": [ "eslint" ],
  "icon-stylelint": [ "stylelint" ],
  "icon-davinci": [ "达芬奇", "davinci" ],
  "icon-food": [ "食物", "美食" ],
  "icon-drink": [ "饮品", "饮料" ],
  "icon-music": [ "音乐", "专辑" ],
  "icon-game": [ "游戏" ],
  "icon-phl": [ "哲学" ],
  "icon-movie": [ "电影", "视频", "动画" ],
  "icon-github": [ "github", "gayhub" ],
  "icon-javascript": [ "js", "JS", "JavaScript", "javascript" ],
  "icon-css": [ "css", "CSS", "css3", "CSS5" ],
  "icon-html": [ "html", "HTML", "hmlt5", "HTML5" ],
  "icon-frown": [ "失落", "伤心", "失望", "难受", "难过", "消极" ],
  "icon-meh": [ "平淡", "无感", "中立" ],
  "icon-smile": [ "开心", "快乐", "高兴", "积极", "微笑" ],
  "icon-message": [ "消息", "短信" ],
  "icon-read": [ "阅读", "读书", "读书笔记", "阅读笔记", "读后感" ],
  "icon-vue": [ "VUE", "vue", "Vue" ],
  "icon-linux": [ "linux", "Linux", "LINUX" ],
  "icon-java": [ "Java", "java", "JAVA" ],
  "icon-photoshop": [ "ps", "PS", "Ps", "photoshop", "PHOTOSHOP", "Photoshop" ],
  "icon-code": [ "code", "编码", "代码" ],
  "icon-palette": [ "设计", "色彩", "配色" ],
  "icon-wand": [ "魔术", "魔法" ],
  "icon-flash": [ "闪电", "快速" ],
  "icon-heart": [ "爱", "心", "喜欢", "推荐" ],
  "icon-leaf": [ "叶子", "自然", "美景" ],
  "icon-moon": [ "月亮", "夜晚", "夜间", "夜空" ],
  "icon-planet": [ "科幻", "宇宙" ],
  "icon-quote": [ "转载", "引用" ],
  "icon-school": [ "学校", "学习", "考试" ],
  "icon-star": [ "精选", "精品", "收藏" ],
  "icon-article": [ "文章", "编辑", "改写" ],
  "icon-tool": [ "工具" ],
  "icon-computer": [ "计算机", "计算机基础" ],
  "icon-famous": [ "名著" ],
  "icon-FR": [ "法国" ],
  "icon-EG": [ "诶及" ],
  "icon-JP": [ "日本" ],
  "icon-AU": [ "澳大利亚" ],
  "icon-RU": [ "俄罗斯" ],
  "icon-IN": [ "印度" ],
  "icon-IT": [ "意大利" ],
  "icon-BR": [ "巴西" ],
  "icon-US": [ "美国" ],
  "icon-UK": [ "英国" ],
  "icon-CN": [ "中国" ],
};

const icon = computed(() => {
  for (let key in icons) {
    let arr = icons[key];
    if (arr.includes(props.name)) return key;
  }
  return false;
});

const { goPage } = useTag();
</script>

<template>
  <div class="tag-item" @click="goPage(name);emits('click-item')">
    <i v-if="icon" class="iconfont icon" :class="icon"></i>
    <div class="name">{{ name }}</div>
    <div class="num">{{ num }}</div>
  </div>
</template>

<style scoped>
.tag-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color-component);
  color: var(--text-color-primary);
  padding: 5px 10px;
  border-radius: var(--radius-default);
  cursor: pointer;
  gap: 5px;
  position: relative;
}
.tag-item:hover {
  background: var(--bg-color-component-hover);
}
.tag-item:active {
  background: var(--bg-color-component-active);
}
.tag-item .icon {
  width: 1.2rem;
  height: 1.2rem;
  fill: var(--brand-color);
  font-size: 16px;
  color: var(--text-color-primary);
  /* color: var(--text-color-secondary); */
}
.num {
  font-size: 0.7rem;
  margin-left: 0.4rem;
  color: var(--text-color-secondary);
}
</style>