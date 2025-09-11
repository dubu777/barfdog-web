import { useEffect, useRef, useState } from "react";

interface UseStickyTabScrollProps {
  stickyOffset: number;
  behavior?: 'smooth' | 'auto';
}

export default function useStickyTabScroll({ stickyOffset, behavior = 'smooth' }: UseStickyTabScrollProps) {
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
      container.scrollTo({ top: targetPosition, behavior });
      container?.addEventListener("scrollend", finishScrolling);

    } else {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - stickyOffset;
      window.scrollTo({ top: targetPosition, behavior });
      window.addEventListener("scrollend", finishScrolling);
    }
  };
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    
    // 스크롤 이벤트로 현재 활성 섹션 감지 (더 안정적)
    const handleScroll = () => {
      if (isClickScrolling.current) return;
      
      // 컨테이너가 있으면 컨테이너 기준, 없으면 window 기준
      const scrollTop = container ? container.scrollTop : window.scrollY;
      let currentActiveIndex = 0;
      
      // 각 섹션을 확인하여 현재 보이는 섹션 찾기
      tabContentRefs.current.forEach((el, index) => {
        if (el) {
          let sectionTop;
          
          if (container) {
            // 컨테이너 기준으로 계산
            sectionTop = el.offsetTop - container.offsetTop - stickyOffset;
          } else {
            // window 기준으로 계산
            sectionTop = el.offsetTop - stickyOffset;
          }
          
          // 현재 스크롤 위치가 섹션 범위 내에 있으면 해당 섹션이 활성화
          if (scrollTop >= sectionTop - 50) { // 50px 여유를 둠
            currentActiveIndex = index;
          }
        }
      });
      
      setActiveIndex(currentActiveIndex);
    };

    // 스크롤 이벤트 리스너 등록 (컨테이너 또는 window)
    const scrollTarget = container || window;
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    
    // 초기 상태 설정
    handleScroll();

    // MutationObserver: DOM 변경 감지 (HTML 콘텐츠 삽입 등)
    let mutationObserver: MutationObserver;
    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        // DOM 변경 후 스크롤 위치 재계산
        setTimeout(handleScroll, 100);
      });
      
      tabContentRefs.current.forEach(el => {
        if (el) {
          mutationObserver.observe(el, {
            childList: true,
            subtree: true,
            attributes: true
          });
        }
      });
    }

    // ResizeObserver: 요소 크기 변경 감지
    let resizeObserver: ResizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        setTimeout(handleScroll, 100);
      });
      
      tabContentRefs.current.forEach(el => {
        if (el) resizeObserver.observe(el);
      });
    }

    // HTML 콘텐츠 로드 완료 시 스크롤 위치 재계산
    const handleContentLoaded = () => {
      setTimeout(handleScroll, 100);
    };

    window.addEventListener("resize", handleScroll);
    window.addEventListener("contentLoaded", handleContentLoaded);

    return () => {
      // 스크롤 이벤트 리스너 제거 (컨테이너 또는 window)
      const scrollTarget = container || window;
      scrollTarget.removeEventListener('scroll', handleScroll);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("contentLoaded", handleContentLoaded);
    };
  }, [stickyOffset]);

  return { 
    tabContentRefs,
    activeIndex,
    handleTabClick,
    scrollContainerRef,
  };
}