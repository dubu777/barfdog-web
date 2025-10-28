import { useRef, useState, useEffect, useCallback } from 'react';

interface UseStickyTabScrollProps {
  stickyOffset: number;
  behavior?: 'smooth' | 'auto';
}

/**
 * - 탭 클릭 시 해당 섹션으로 스크롤 이동
 * - IntersectionObserver로 위/아래 스크롤 모두 감지
 * - 모바일 Chrome/Safari 대응
 */
export default function useStickyTabScroll({
  stickyOffset,
  behavior = 'smooth',
}: UseStickyTabScrollProps) {
  const tabContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isClickScrolling = useRef(false);

  const waitForScrollEnd = () => {
    let lastY = window.scrollY;
    const check = () => {
      const nowY = window.scrollY;
      if (Math.abs(nowY - lastY) < 2) {
        isClickScrolling.current = false;
        return;
      }
      lastY = nowY;
      requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  };

  const handleTabClick = useCallback(
    (index: number) => {
      const target = tabContentRefs.current[index];
      if (!target) return;

      setActiveIndex(index);
      isClickScrolling.current = true;

      const container = scrollContainerRef.current;
      const targetPosition = container
        ? target.offsetTop - container.offsetTop - stickyOffset
        : target.getBoundingClientRect().top + window.scrollY - stickyOffset;

      if (container) {
        container.scrollTo({ top: targetPosition, behavior });
      } else {
        window.scrollTo({ top: targetPosition, behavior });
      }

      waitForScrollEnd(); // 실제 스크롤 종료 감지
    },
    [behavior, stickyOffset]
  );

  /** IntersectionObserver로 현재 섹션 감지 */
  useEffect(() => {
    const container = scrollContainerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) {
          requestAnimationFrame(() => observer.takeRecords());
          return;
        }

        // 화면에 보이는 섹션들
        const visible = entries.filter((e) => e.isIntersecting);

        if (visible.length === 0) return;

        // 위쪽에 가장 가까운 섹션 찾기
        const sorted = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        const firstVisible = sorted[0];
        const index = tabContentRefs.current.findIndex(
          (el) => el === firstVisible.target
        );

        if (index !== -1) {
          setActiveIndex((prev) => (prev !== index ? index : prev));
        }
      },
      {
        root: container || null,
        rootMargin: `-${stickyOffset}px 0px -45% 0px`, // 상단 offset 보정
        threshold: 0.1,
      }
    );

    tabContentRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [stickyOffset]);

  return {
    tabContentRefs,
    activeIndex,
    handleTabClick,
    scrollContainerRef,
  };
}
