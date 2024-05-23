import fs from "node:fs";
import parseFrontmatter from "gray-matter";

export default {
  watch: ["src/posts/**.md"],
  load(watchedFiles) {
    let res = {
      cate: [],
      tag: [],
    };
    watchedFiles
      .forEach(file => {
        const content = fs.readFileSync(file, "utf-8");
        const { data: { tag: tags, category: cates } } = parseFrontmatter(content);
        for (let tag of tags || []) {
          let index = res.tag.findIndex(item => item.name === tag);
          if (index === -1) {
            res.tag.push({ name: tag, num: 1 });
          } else {
            res.tag[index].num++;
          }
        }
        for (let cate of cates) {
          let index = res.cate.findIndex(item => item.name === cate);
          if (index === -1) {
            res.cate.push({ name: cate, num: 1 });
          } else {
            res.cate[index].num++;
          }
        }
      });
    res.tag.sort((a, b) => b.num - a.num);
    res.cate.sort((a, b) => b.num - a.num);
    return res;
  }
}
