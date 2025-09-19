import { QueryClient } from "@tanstack/react-query";
import { InviteRewardList } from "@/types";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getInviteRewardList } from "@/api/mypage/inviteFriends/inviteFriends";

export async function prefetchGetInviteRewardList(queryClient: QueryClient, page: number) {
	const ssrAxios = createSSRRequest();
	return queryClient.prefetchQuery<InviteRewardList>({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.REWARD.BASE, queryKeys.MYPAGE.REWARD.GET_INVITE_REWARD_LIST, page],
		queryFn: () => getInviteRewardList({ pageParam: page, instance: ssrAxios	 }),
	})
}