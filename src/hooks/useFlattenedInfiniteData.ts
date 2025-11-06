import { useMemo } from "react";
/**
 * 무한 스크롤 데이터 플래튼 훅
 *
 * @param {Object} data - 무한 스크롤 데이터
 * @param {string} pageKey - 페이지 키
 * @param {Object} options - 옵션
 * @param {Function} options.filter - 필터 함수
 * @param {Function} options.sort - 정렬 함수
 * @param {Function} options.map - 매핑 함수
 * 
 * @returns {Array} 플래튼된 데이터
 */
export function useFlattenedInfiniteData<T, PageKey extends string>(
  data: { pages?: Record<PageKey, T[]>[] } | undefined,
  pageKey: PageKey,
  options?: {
    filter?: (item: T) => boolean;
    sort?: (a: T, b: T) => number;
    map?: (item: T) => T;
  }
) {
  return useMemo(() => {
    if (!data?.pages) return [];
    let items = data.pages.flatMap((page) => page[pageKey] || []);
    if (options?.filter) items = items.filter(options.filter);
    if (options?.sort) items = [...items].sort(options.sort);
    if (options?.map) items = items.map(options.map);
    return items ?? [];
  }, [data?.pages, pageKey, options]);
}
