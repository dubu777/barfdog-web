import { QueryClient } from "@tanstack/react-query";
import { getRewardList } from "@/api/mypage/reward/reward";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";

export async function prefetchGetRewardList(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery({
		queryKey: [queryKeys.REWARD.BASE, queryKeys.REWARD.GET_REWARD_LIST],
		queryFn: async () => {
			const data = await getRewardList({ pageParam: 0, size: 5, instance: ssrAxios });
			return {
				pages: [data],
				pageParams: [0],
			};
		},
	});
}