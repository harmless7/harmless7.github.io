export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-4316af3c","v-2bfa2064","v-460ec310","v-cb2a2dea","v-29c75ecf","v-d77ac87a","v-7e83c987"]}},"encrypted":{"/":{"path":"/encrypted/","keys":[]}},"slide":{"/":{"path":"/slide/","keys":[]}},"star":{"/":{"path":"/star/","keys":[]}},"timeline":{"/":{"path":"/timeline/","keys":["v-4316af3c","v-2bfa2064","v-460ec310","v-cb2a2dea","v-29c75ecf","v-d77ac87a","v-7e83c987"]}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
