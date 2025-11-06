import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviewList } from "../review";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

// 리뷰 목록 조회 (무한 스크롤 적용)
export function useGetInfiniteReviewList() {
  return useInfiniteQuery(createInfiniteQueryConfig({
    queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_LIST],
    queryFn: async ({ pageParam }) => {
      return await getReviewList({ 
        page: pageParam,
        size: 20,
      });
    },
  }));
}