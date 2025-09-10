import { useEffect, useRef, useState } from "react";

interface UseStickyTabScrollProps {
  stickyOffset: number;
}

export default function useStickyTabScroll({ stickyOffset }: UseStickyTabScrollProps) {
  const tabContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
 // 클릭으로 스크롤 중인지 여부
  const isClickScrolling = useRef(false);

  /** 탭 클릭 시 해당 섹션으로 스크롤 이동 */
  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    const target = tabContentRefs.current[index];
    if (!target) return;

    isClickScrolling.current = true;
    const container = scrollContainerRef.current;

    const finishScrolling = () => {
      isClickScrolling.current = false;
      container?.removeEventListener("scrollend", finishScrolling);
      window.removeEventListener("scrollend", finishScrolling);
    };


    if (container) {
      const targetPosition = target.offsetTop - container.offsetTop - stickyOffset;
      container.scrollTo({ top: targetPosition, behavior: "smooth" });
      container?.addEventListener("scrollend", finishScrolling);

    } else {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - stickyOffset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      window.addEventListener("scrollend", finishScrolling);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    let observer: IntersectionObserver;

    const initObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          
          if (isClickScrolling.current) return;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = tabContentRefs.current.findIndex(el => el === entry.target);
              if (index !== -1) setActiveIndex(index);
            }
          });
        },
        {
          root: container || null,
          rootMargin: `-${stickyOffset}px 0px 0px 0px`,
          threshold: 0.3,
        }
      );

      tabContentRefs.current.forEach(el => el && observer.observe(el));
    };

    initObserver();

    const handleResize = () => {
      observer.disconnect();
      initObserver();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [stickyOffset]);

  return { 
    tabContentRefs,
    activeIndex,
    handleTabClick,
    scrollContainerRef,
  };
}