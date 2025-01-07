
import { queryKeys } from "@/constants";
import { InviteRewardList, UseSuspenseQueryCustomOptions } from "@/types";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getInviteRewardList } from "@/api/mypage/myPage";

export { useGetInviteRewardList, prefetchGetInviteRewardList };

function useGetInviteRewardList(page: number, queryOptions?: UseSuspenseQueryCustomOptions<InviteRewardList>) {
  return useSuspenseQuery<InviteRewardList>({
    queryKey: [queryKeys.REWARD.BASE, queryKeys.REWARD.GET_INVITE_REWARD_LIST, page],
    queryFn: () => getInviteRewardList(page),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetInviteRewardList(queryClient: QueryClient, page: number) {
  return queryClient.prefetchQuery<InviteRewardList>({
    queryKey: [queryKeys.REWARD.BASE, queryKeys.REWARD.GET_INVITE_REWARD_LIST, page],
    queryFn: () => getInviteRewardList(page),
  })
}