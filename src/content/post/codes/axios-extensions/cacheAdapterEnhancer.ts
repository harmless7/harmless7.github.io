/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2017-10-12
 */

import { AxiosAdapter, AxiosPromise } from 'axios';
import LRUCache from 'lru-cache';
import buildSortedURL from './utils/buildSortedURL';
import isCacheLike, { ICacheLike } from './utils/isCacheLike';

declare module 'axios' {
	interface AxiosRequestConfig {
		forceUpdate?: boolean;
		cache?: boolean | ICacheLike<any>;
	}
}

const FIVE_MINUTES = 1000 * 60 * 5;
const CAPACITY = 100;

export type Options = {
	enabledByDefault?: boolean,
	cacheFlag?: string,
	defaultCache?: ICacheLike<AxiosPromise>,
};

/**
 * 为Axios适配器添加缓存功能的增强器。
 * @param adapter 原始的Axios适配器。
 * @param options 配置选项，包括是否默认启用缓存、缓存标志、默认缓存实例。
 * @returns 返回一个经过缓存增强的Axios适配器。
 */
export default function cacheAdapterEnhancer(adapter: AxiosAdapter, options: Options = {}): AxiosAdapter {

	const {
		// 默认启用缓存状态，缓存标志名称，以及默认缓存实例（使用LRUCache，具有超时和容量限制）。
		enabledByDefault = true,
		cacheFlag = 'cache',
		defaultCache = new LRUCache({ ttl: FIVE_MINUTES, max: CAPACITY }),
	} = options;

	// 返回一个配置处理器
	return config => {

		const { url, method, params, paramsSerializer, forceUpdate } = config;
		// 确定当前请求是否使用缓存，优先使用请求中指定的缓存标志，若无则使用默认设置。
		const useCache = ((config as any)[cacheFlag] !== void 0 && (config as any)[cacheFlag] !== null)
			? (config as any)[cacheFlag]
			: enabledByDefault;

		// 对GET方法的请求进行缓存处理
		if (method === 'get' && useCache) {

			// 判断是否使用了自定义缓存，是则使用自定义缓存，否则使用默认缓存。
			const cache: ICacheLike<AxiosPromise> = isCacheLike(useCache) ? useCache : defaultCache;

			// 根据URL和参数构建缓存索引。
			const index = buildSortedURL(url, params, paramsSerializer);

			// 尝试从缓存获取响应承诺
			let responsePromise = cache.get(index);

			// 如果缓存不存在或强制更新，则重新发起请求。
			if (!responsePromise || forceUpdate) {

				responsePromise = (async () => {

					try {
						// 发起请求并捕获结果。
						return await adapter(config);
					} catch (reason) {
						// 请求失败时，从缓存中删除该请求的记录。
						'delete' in cache ? cache.delete(index) : cache.del(index);
						throw reason;
					}

				})();

				// 将新请求的承诺存入缓存作为占位符。
				cache.set(index, responsePromise);

				return responsePromise;
			}

			// 如果开启了日志记录，输出缓存命中的信息。
			if (process.env.LOGGER_LEVEL === 'info') {
				console.info(`[axios-extensions] request cached by cache adapter --> url: ${index}`);
			}

			return responsePromise;
		}

		// 对于非GET方法的请求，或关闭了缓存的请求，直接使用原始适配器处理。
		return adapter(config);
	};
}
