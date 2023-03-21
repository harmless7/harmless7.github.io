import fs from "node:fs";
import parseFrontmatter from "gray-matter";

export default {
  watch: ["src/posts/**.md"],
  load(watchedFiles) {
    return watchedFiles
      .map(file => {
        const content = fs.readFileSync(file, "utf-8");
        const { data, excerpt } = parseFrontmatter(content);
        return {
          file,
          data,
          excerpt,
        };
      })
      .sort((a, b) => {
        return new Date(b.data.date) > new Date(a.data.date) ? 1 : -1;
      })
  }
}
