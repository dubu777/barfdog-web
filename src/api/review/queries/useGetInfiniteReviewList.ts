import { queryKeys } from "@/constants";
import { ReviewList } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviewList } from "../review";

// 리뷰 목록 조회 (무한 스크롤 적용)
export function useGetInfiniteReviewList() {
  return useInfiniteQuery<ReviewList>({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST],
    queryFn: async ({ pageParam = 0 }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      const data = await getReviewList({ page: pageNumber, size: 20 });
      return data;
    },
    getNextPageParam: (lastPage) => {
			if (!lastPage) return undefined;

			const currentPage = lastPage?.pagination?.page ?? 0;
			const totalPages = lastPage?.pagination?.totalPages ?? 0;

			const nextPage = currentPage + 1;
			return nextPage < totalPages ? nextPage : undefined;
		},
    initialPageParam: 0,
  })
}