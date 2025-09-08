import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getInfinitePromotionList } from "@/api/mypage/promotion/promotion";

export async function prefetchGetInfinitePromotionList(
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      queryKeys.MYPAGE.BASE,
      queryKeys.MYPAGE.PROMOTION.BASE,
      queryKeys.MYPAGE.PROMOTION.GET_PROMOTION_LIST,
    ],
    queryFn: async ({ pageParam = 0 }) =>
      await getInfinitePromotionList({
        pageParam,
        instance: ssrAxios
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.page ?? 0;
      const totalPages = lastPage.page.totalPages ?? 0;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
  });
}
