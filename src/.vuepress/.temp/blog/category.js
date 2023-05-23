export const categoryMap = {"category":{"/":{"path":"/category/","map":{"观后感":{"path":"/category/%E8%A7%82%E5%90%8E%E6%84%9F/","keys":["v-460ec310"]},"动画片":{"path":"/category/%E5%8A%A8%E7%94%BB%E7%89%87/","keys":["v-460ec310"]},"学习笔记":{"path":"/category/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/","keys":["v-cb2a2dea","v-29c75ecf","v-d77ac87a"]},"前端":{"path":"/category/%E5%89%8D%E7%AB%AF/","keys":["v-4316af3c","v-cb2a2dea","v-29c75ecf","v-d77ac87a"]},"读书笔记":{"path":"/category/%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/","keys":["v-4316af3c","v-2bfa2064","v-7e83c987"]}}}},"tag":{"/":{"path":"/tag/","map":{"赛博朋克":{"path":"/tag/%E8%B5%9B%E5%8D%9A%E6%9C%8B%E5%85%8B/","keys":["v-460ec310"]},"科幻":{"path":"/tag/%E7%A7%91%E5%B9%BB/","keys":["v-460ec310"]},"热血":{"path":"/tag/%E7%83%AD%E8%A1%80/","keys":["v-460ec310"]},"前端":{"path":"/tag/%E5%89%8D%E7%AB%AF/","keys":["v-4316af3c","v-cb2a2dea","v-29c75ecf","v-d77ac87a"]},"工具":{"path":"/tag/%E5%B7%A5%E5%85%B7/","keys":["v-cb2a2dea","v-29c75ecf","v-d77ac87a"]},"css":{"path":"/tag/css/","keys":["v-29c75ecf"]},"javascript":{"path":"/tag/javascript/","keys":["v-4316af3c","v-d77ac87a"]},"计算机基础":{"path":"/tag/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/","keys":["v-2bfa2064","v-7e83c987"]},"git":{"path":"/tag/git/","keys":["v-2bfa2064"]},"正则表达式":{"path":"/tag/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F/","keys":["v-cb2a2dea"]}}}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogCategory) {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  })
}
