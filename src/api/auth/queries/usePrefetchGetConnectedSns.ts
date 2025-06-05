import { QueryClient } from "@tanstack/react-query";
import { SnSProvider } from "@/types";
import { getConnectedSns } from "@/api/auth/auth";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetConnectedSns(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<SnSProvider | null>({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_CONNECTED_SNS],
		queryFn: () => getConnectedSns(ssrAxios),
	})
}