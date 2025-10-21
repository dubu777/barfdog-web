import { ReviewListType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getMypageReviewList } from "@/api/mypage/review/review";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetInfiniteMypageReviewList(type: ReviewListType) {
  return useInfiniteQuery(createInfiniteQueryConfig({
    queryKey: [
      queryKeys.MYPAGE.BASE,
      queryKeys.MYPAGE.REVIEW.BASE,
      queryKeys.MYPAGE.REVIEW.GET_MYPAGE_REVIEW_LIST,
      type
    ],
    queryFn: async ({ pageParam }) => {
      return await getMypageReviewList({ 
        type,
        pageParam,
      });
    },
  }));
}