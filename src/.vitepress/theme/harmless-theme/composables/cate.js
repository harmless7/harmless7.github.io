import { computed } from "vue";
import { useRouter, withBase } from "vitepress";

export function useCate() {
  const router = useRouter();

  function goPage(name) {
    router.go(`/posts?cate=${name}`);
  }

  return {
    goPage,
  }
}