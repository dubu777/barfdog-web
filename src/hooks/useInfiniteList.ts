// src/hooks/useInfiniteList.ts
import { useState, useEffect, useRef, RefObject } from "react";

interface InfiniteListOptions {
  /** 한 번에 보여줄 항목 개수 */
  pageSize?: number;
  /** IntersectionObserver 의 rootMargin */
  rootMargin?: string;
}

/**
 * 리스트를 받아, 무한 스크롤을 위한
 *  - visibleList: 현재 화면에 보여줄 항목
 *  - sentinelRef: 하단 스크롤 감지용 ref
 */
export function useInfiniteList<T>(
  list: T[],
  { pageSize = 10, rootMargin = "200px" }: InfiniteListOptions = {}
): [T[], RefObject<HTMLDivElement>] {
  const [count, setCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // list 가 바뀌면 슬라이스 카운트도 초기화
  useEffect(() => {
    setCount(pageSize);
  }, [list, pageSize]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && count < list.length) {
          setCount((c) => Math.min(c + pageSize, list.length));
        }
      },
      { rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [count, list.length, pageSize, rootMargin]);

  return [list.slice(0, count), sentinelRef];
}