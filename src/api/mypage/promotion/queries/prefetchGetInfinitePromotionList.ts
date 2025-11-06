import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getPromotionList } from "@/api/mypage/promotion/promotion";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetInfinitePromotionList(
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  return await prefetchInfiniteQuery(queryClient, {
    queryKey: [
      queryKeys.MYPAGE.BASE,
      queryKeys.MYPAGE.PROMOTION.BASE,
      queryKeys.MYPAGE.PROMOTION.GET_PROMOTION_LIST,
    ],
    queryFn: async ({ pageParam, instance }) =>
      await getPromotionList({
        pageParam,
        instance
      }),
  }, ssrAxios);
}