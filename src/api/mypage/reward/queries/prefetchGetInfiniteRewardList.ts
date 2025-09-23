import { QueryClient } from "@tanstack/react-query";
import { getRewardList } from "@/api/mypage/reward/reward";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";

export async function prefetchGetInfiniteRewardList(
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      queryKeys.MYPAGE.BASE, 
      queryKeys.MYPAGE.REWARD.BASE, 
      queryKeys.MYPAGE.REWARD.GET_REWARD_LIST
    ],
    queryFn: async ({ pageParam = 0 }) =>
      await getRewardList({
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
