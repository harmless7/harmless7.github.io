import { computed } from "vue";
import { useRouter, withBase } from "vitepress";
import seedrandom from "seedrandom";

export function usePost() {
  const router = useRouter();

  function getRandomCover(title) {
    const rng = seedrandom(title);
    return withBase(`/images/cover_${Math.ceil(rng() * 12)}.svg`);
  }

  function goDetail(filePath) {
    router.go(filePath.replace(/(src|.md)/g, ""));
  }

  return {
    getRandomCover,
    goDetail,
  }
}