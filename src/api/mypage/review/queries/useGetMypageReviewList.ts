import { ReviewListType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getMypageReviewList } from "@/api/mypage/review/review";

export function useGetMypageReviewList(type: ReviewListType) {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.MYPAGE.BASE,
      queryKeys.MYPAGE.REVIEW.BASE,
      queryKeys.MYPAGE.REVIEW.GET_MYPAGE_REVIEW_LIST,
      type
    ],
    queryFn: async ({
      pageParam = 0
    }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      return await getMypageReviewList({
        type,
        pageParam: pageNumber,
      });
    },
    getNextPageParam: (lastPage) => {
			if (!lastPage) return undefined;

			const currentPage = lastPage?.page?.page ?? 0;
			const totalPages = lastPage?.page?.totalPages ?? 0;

			const nextPage = currentPage + 1;
			return nextPage < totalPages ? nextPage : undefined;
		},
		initialPageParam: 0,
  })
}