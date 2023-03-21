import { computed } from "vue";
import { useRouter, withBase } from "vitepress";

export function useTag() {
  const router = useRouter();

  function goPage(name) {
    router.go(`/posts?tag=${name}`);
  }

  return {
    goPage,
  }
}