import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getReferralRewardList } from "@/api/mypage/inviteFriends/inviteFriends";
import { prefetchInfiniteQuery } from "@/utils/api/infiniteQueryConfig";

export async function prefetchGetReferralRewardList(
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  return await prefetchInfiniteQuery(queryClient, {
    queryKey: [
      queryKeys.MYPAGE.BASE, 
      queryKeys.MYPAGE.REWARD.BASE, 
      queryKeys.MYPAGE.REWARD.GET_REFERRAL_REWARD_LIST
    ],
    queryFn: async ({ pageParam, instance }) =>
      await getReferralRewardList({
        pageParam,
        instance
      }),
  }, ssrAxios);
}
