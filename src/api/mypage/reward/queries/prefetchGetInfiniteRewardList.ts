import { QueryClient } from "@tanstack/react-query";
import { getRewardList } from "@/api/mypage/reward/reward";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetInfiniteRewardList(
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  return await prefetchInfiniteQuery(queryClient, {
    queryKey: [
      queryKeys.MYPAGE.BASE, 
      queryKeys.MYPAGE.REWARD.BASE, 
      queryKeys.MYPAGE.REWARD.GET_REWARD_LIST
    ],
    queryFn: async ({ pageParam, instance }) =>
      await getRewardList({
        pageParam,
        instance
      }),
  }, ssrAxios);
}
