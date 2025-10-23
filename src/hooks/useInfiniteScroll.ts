import { useInView } from "react-intersection-observer";
/**
 * 무한 스크롤 스크롤 감지용 ref
 *
 * @param {Object} hasNextPage - 다음 페이지 존재 여부
 * @param {Object} isFetchingNextPage - 다음 페이지 로딩 여부
 * @param {Function} fetchNextPage - 다음 페이지 로딩 함수
 * 
 * @returns {RefObject} 무한 스크롤 스크롤 감지용 ref
 */
export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
}) {
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return ref;
}
