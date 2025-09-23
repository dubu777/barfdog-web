import { QueryClient } from "@tanstack/react-query";
import { SnsProvider } from "@/types";
import { getConnectedSns } from "@/api/auth/auth";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetConnectedSns(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<SnsProvider | null>({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.COMMON.BASE, queryKeys.MYPAGE.COMMON.GET_CONNECTED_SNS],
		queryFn: () => getConnectedSns(ssrAxios),
	})
}
