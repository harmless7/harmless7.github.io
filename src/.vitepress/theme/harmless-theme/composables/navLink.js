import { computed } from "vue";
import { useRoute, withBase } from "vitepress";
import { isExternal as isExternalCheck } from "../utils";

export function useNavLink(item) {
  const route = useRoute();
  const isExternal = isExternalCheck(item.value.link);
  const isParent = Boolean(item.value.items);
  const props = computed(() => {
    // 判断选中状态
    const routePath = normalizePath(`/${route.data.relativePath}`);
    let active = null;
    if (item.value.items) {
      active = false
    } else if (item.value.activeMatch) {
      active = new RegExp(item.value.activeMatch).test(routePath);
    } else {
      const itemPath = normalizePath(withBase(item.value.link || ""));
      active = itemPath === "/"
        ? itemPath === routePath
        : routePath?.startsWith(itemPath);
    }
    // 跳转路由
    let href = null;
    if (isExternal) href = item.value.link;
    else if (!isParent) href = withBase(item.value.link || "");

    return {
      class: {
        active,
        isExternal,
      },
      href,
      target: item.value.target || isExternal ? "_blank" : null,
      rel: item.value.rel || (isExternal || isParent) ? "noopener noreferrer" : null,
      "aria-label": item.value.ariaLabel,
    };
  });
  return {
    props,
    isExternal,
    isParent,
  };
}

/**
 * 路径格式化
 * @param {String} path nav路径
 * @returns 格式化后的路径
 */
function normalizePath(path) {
  return path
    .replace(/#.*$/, '')
    .replace(/\?.*$/, '')
    .replace(/\.(html|md)$/, '')
    .replace(/\/index$/, '/');
}