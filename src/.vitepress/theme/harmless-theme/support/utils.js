import { useData, withBase } from "vitepress";
// import { useData } from "../composables/data";
import { isExternal, PATHNAME_PROTOCOL_RE } from "../../shared.js";
export { isExternal, isActive } from "../../shared.js";

/**
 * 节流/防抖
 * @param {Function} fn 待 节流/防抖 函数
 * @param {Number} delay 延迟时间
 * @returns 处理后的函数
 */
export function throttleAndDebounce(fn, delay) {
  let timeoutId;
  let called = false;
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (!called) {
      fn();
      called = true;
      setTimeout(() => {
        called = false;
      }, delay);
    } else {
      timeoutId = setTimeout(fn, delay);
    }
  };
}

/**
 * 确保路径前面加上斜杠
 * @param {String} path 路径
 * @returns 一定有斜杠的路径
 */
export function ensureStartingSlash(path) {
  return /^\//.test(path) ? path : `/${path}`;
}

/**
 * 标准化链接
 * @param {String} url 链接
 * @returns 经过标准化的链接
 */
export function normalizeLink(url) {
  if (isExternal(url)) {
    return url.replace(PATHNAME_PROTOCOL_RE, "");
  }
  const { site } = useData();
  const { pathname, search, hash } = new URL(url, "http://example.com");
  const normalizedPath =
    pathname.endsWith("/") || pathname.endsWith(".html")
      ? url
      : url.replace(
          /(?:(^\.+)\/)?.*$/,
          `$1${pathname.replace(
            /(\.md)?$/,
            site.value.cleanUrls ? "" : ".html"
          )}${search}${hash}`
        );
  return withBase(normalizedPath);
}
