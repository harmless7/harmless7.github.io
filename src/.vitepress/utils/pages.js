import { globby } from "globby";
import matter from "gray-matter";
import fs from "fs/promises";

export async function getPosts() {
  const paths = await globby(["src/posts/**/**.md"]);
  let posts = await Promise.all(
    paths.map(async (item) => {
      // 获取 .md 文件内容
      const mdContent = await fs.readFile(item, "utf-8");
      // 获取 .md 的 mrontMatter
      const { data } = matter(mdContent);
      // 修改日期
      data.date = new Intl.DateTimeFormat('zh-CN').format(new Date(data.date));
      // 去除路径中的目录地址
      item = item.replace("src/", "");
      return {
        frontMatter: data,
        relativePath: item,
        regularPath: `/${item.replace(".md", ".html")}`,
      }
    })
  );
  posts = posts.sort((a, b) => {
    return new Date(b.frontMatter.date) > new Date(a.frontMatter.date) ? 1 : -1;
  })
  return posts;
}